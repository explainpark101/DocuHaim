const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/QuizLlmSessionBar-DcZYsJYp.js","assets/vendor-react-BPvvDyqO.js","assets/QuizLlmModelPicker-C08IJFLM.js","assets/OpenAiCompatibleModelSelect-CsiqNDhn.js","assets/geminiClient-pbSziARa.js","assets/vendor-google-genai-BsvcYwA0.js","assets/index-CWHwu_I1.js","assets/vendor-aws-hJDgVEKM.js","assets/vendor-lucide-Bo8me5Pj.js","assets/bootSplash-Z2krRgC9.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-markdown-it-Dg5Isw3B.js","assets/vendor-radix-ClWfNC7b.js","assets/index-B93fYrFN.css","assets/openaiCompatibleClient-IkbPXGDQ.js","assets/localLlmModelAliases-EglLH-3U.js","assets/LlamaCppModelSelect-bL-K8PuL.js","assets/QuizChoiceAnalysisDock-BLtgEqXQ.js","assets/resolveVaultFileNode-DNR-a3o7.js","assets/useDocumentTheme-SBbRz60G.js","assets/useWikiImageHydration-8jChWjyK.js","assets/wikiImageResolver-ELq19oJ8.js","assets/wikiImageSettings-Cji60Ojw.js","assets/mlxVlmGenerateClient-1TJD2Vg6.js"])))=>i.map(i=>d[i]);
import { _ as wr } from "./vendor-aws-hJDgVEKM.js";
import { j as t, r as i, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { A as rn, m as We } from "./vendor-motion-Bv-XITR_.js";
import { jx as Je, jy as Pt, jz as on, ai as an, N as At, T as un, jA as yr, O as _, e$ as ei, f0 as ti, jB as ni, jC as si, jD as ri, jE as os, jF as is, jG as vr, af as as, bE as fn, ca as oi, jH as ii, p as Vn, bC as ai, jI as li, jJ as Kn, jK as Ln, jL as ci, jM as Ye, jN as di, jO as ui, jP as fi, jQ as jr, jR as Xn, jS as mi, jT as Zn, jU as zt, jV as pi, jW as xi, ah as Ee, jX as hi, w as lt, ak as ls, e as cs, i as Sr, bk as Cr, bm as Nr, y as Er, aH as $r, aI as gi, L as Yn, h as st, x as Pr, V as zr, am as Ir, s as Nt, bu as bi, be as Qn, dE as ki, bg as wi, jY as es, al as yi, aj as Vs, f as vi, jZ as ts, j_ as yt, j$ as ji, k0 as vt, k1 as $t, k2 as Et, k3 as Si, k4 as Ci, k5 as Ni, k6 as Ks, k7 as Vt, k8 as Ei, bN as $i, fz as Pi, dk as zi, bQ as Ii, bR as Ri, a1 as Tn, a2 as _n, ax as Dn, k9 as jt, ka as Fn, kb as Mi, kc as Ai, kd as Oi, bO as Li, au as Qi, av as Ti, ke as _i, kf as Di, kg as Fi, kh as qi, ki as Bi, kj as Ui, kk as Gi, kl as Wi, __tla as __tla_1 } from "./index-CWHwu_I1.js";
import { c as Rr, __tla as __tla_2 } from "./bootSplash-Z2krRgC9.js";
import { X as Ve, L as mn, bn as ds, C as Mr, bo as It, a9 as Ji, S as He, x as Xs, y as ns, a3 as Hi, bp as Zs, bq as Vi, K as Ki, J as Xi, br as Zi, N as Yi, a_ as pn, bs as Ar, v as Or, bt as ea, bu as Lr, E as ta, aa as na, m as sa, g as Qr, bv as ra, a as Ys, bw as oa } from "./vendor-lucide-Bo8me5Pj.js";
import { v as us, r as ia } from "./resolveVaultFileNode-DNR-a3o7.js";
import { v as Rt, aj as aa, ak as la, w as Re, x as Me, y as Ae, z as Oe, A as Le, p as ca, q as da, S as ua, t as fa, M as ma, N as pa, O as xa, Q as ha, U as er } from "./vendor-radix-ClWfNC7b.js";
import { u as ga } from "./useDocumentTheme-SBbRz60G.js";
import { u as ba } from "./useWikiImageHydration-8jChWjyK.js";
import { i as ka, g as wa, __tla as __tla_3 } from "./geminiClient-pbSziARa.js";
import { g as tr } from "./openaiCompatibleClient-IkbPXGDQ.js";
import { g as ya } from "./mlxVlmGenerateClient-1TJD2Vg6.js";
let xn, qd;
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
  const Tr = i.createContext({
    hydrationEnabled: true
  });
  function va({ value: e, children: n }) {
    return t.jsx(Tr.Provider, {
      value: e,
      children: n
    });
  }
  function ja() {
    return i.useContext(Tr);
  }
  function _e(e, n = 4) {
    if (e.kind !== "choice") return Je(n);
    const s = (e.options || []).filter((o) => String(o || "").trim()).length, r = Math.max(s, (e.options || []).length);
    return r >= Pt ? Je(r) : Je(n);
  }
  function _r(e, n = 4) {
    const s = Je(n), r = e.length ? e[e.length - 1] : null;
    return r ? r.kind === "subjective" ? {
      kind: "subjective",
      answerStyle: r.answerStyle === "essay" ? "essay" : "short",
      choiceCount: s
    } : {
      kind: "choice",
      answerStyle: "short",
      choiceCount: _e(r, s)
    } : {
      kind: "choice",
      answerStyle: "short",
      choiceCount: s
    };
  }
  function nr(e, n) {
    const s = _r(n, e.choiceCount);
    return {
      ...e,
      choiceCount: s.choiceCount
    };
  }
  function et(e, n) {
    const s = Je(n), r = [
      ...e
    ];
    for (; r.length < s; ) r.push("");
    return r.slice(0, s);
  }
  function Dr() {
    const [e, n] = i.useState(() => on());
    return i.useEffect(() => {
      const s = () => n(on());
      return window.addEventListener(an, s), () => window.removeEventListener(an, s);
    }, []), e;
  }
  const Fr = [
    0.32,
    0.72,
    0,
    1
  ], Sa = {
    duration: 0
  };
  function Ca(e) {
    return e ? {
      type: "spring",
      stiffness: 380,
      damping: 36
    } : {
      type: "tween",
      duration: 0.22,
      ease: Fr
    };
  }
  const Na = Rr() ? {
    type: "tween",
    duration: 0.2,
    ease: Fr
  } : {
    type: "spring",
    stiffness: 420,
    damping: 34
  };
  function Ea(e, n = {}) {
    const { isResizing: s = false, edge: r = "right" } = n, o = n.useLayoutWidthAnim ?? on(), a = s ? Sa : Ca(o);
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
  function $a() {
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
      transition: Na
    };
  }
  function Pa(e, n) {
    return n ?? on() ? {
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
  xn = function({ motionKey: e, open: n, width: s, isResizing: r = false, edge: o = "right", className: a, "aria-label": c, children: d }) {
    const u = Dr(), f = Ea(s, {
      isResizing: r,
      edge: o,
      useLayoutWidthAnim: u
    });
    return t.jsx(rn, {
      initial: false,
      children: n ? u ? t.jsx(We.aside, {
        role: "complementary",
        "aria-label": c,
        className: a,
        initial: f.initial,
        animate: f.animate,
        exit: f.exit,
        transition: f.transition,
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
        initial: f.initial,
        animate: f.animate,
        exit: f.exit,
        transition: f.transition,
        children: d
      }, e) : null
    });
  };
  const za = 360, Ia = un;
  function Ra(e) {
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
  function Ma(e) {
    return e && e.kind === "subjective" ? e.answerStyle === "essay" ? "subjective-essay" : "subjective-short" : "choice";
  }
  function Aa({ open: e, question: n, defaultChoiceCount: s, busy: r = false, onClose: o, onSubmit: a }) {
    const [c, d] = i.useState("choice"), [u, f] = i.useState(s), [m, h] = i.useState(""), { width: g, handleProps: x, isResizing: b } = At({
      storageKey: "quiz-derived-question-dock-width",
      defaultWidth: za,
      minWidth: 280,
      maxWidth: 560,
      edge: "right"
    }), k = i.useMemo(() => n ? _e(n, s) : s, [
      s,
      n
    ]);
    i.useEffect(() => {
      e && (d(Ma(n)), f(k), h(""));
    }, [
      e,
      n,
      k
    ]);
    const { kind: z, answerStyle: S } = Ra(c), $ = (n == null ? void 0 : n.displayLabel) || (n == null ? void 0 : n.id) || "", y = () => {
      a({
        kind: z,
        choiceCount: Je(u),
        ...z === "subjective" ? {
          answerStyle: S
        } : {},
        ...m.trim() ? {
          userPrompt: m.trim()
        } : {}
      });
    }, P = e && n != null;
    return t.jsx(xn, {
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
          t.jsx(Ia, {
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
                    children: t.jsx(Ve, {
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
                      ].map(([v, C]) => {
                        const M = c === v;
                        return t.jsx("button", {
                          type: "button",
                          disabled: r,
                          className: `rounded-lg border px-3 py-1.5 text-xs font-semibold ${M ? "border-violet-500 bg-violet-50 text-violet-900 dark:bg-violet-950/40 dark:text-violet-100" : "border-slate-200 bg-white text-slate-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"}`,
                          onClick: () => d(v),
                          children: C
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
                            onChange: (v) => f(Number(v.target.value) || u),
                            children: Array.from({
                              length: yr - Pt + 1
                            }, (v, C) => Pt + C).map((v) => t.jsxs("option", {
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
                        value: m,
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
                  t.jsx(_, {
                    type: "button",
                    variant: "secondary",
                    size: "sm",
                    className: "flex-1",
                    disabled: r,
                    onClick: o,
                    children: "\uCDE8\uC18C"
                  }),
                  t.jsxs(_, {
                    type: "button",
                    variant: "primary",
                    size: "sm",
                    className: "flex-1",
                    disabled: r,
                    onClick: y,
                    children: [
                      r ? t.jsx(mn, {
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
  const Oa = i.memo(Aa), La = "z-100001 max-w-[min(92vw,420px)] break-all rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", Qa = "flex w-full items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-2 py-1.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100", Ta = "inline-flex max-w-full items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100", _a = "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-violet-400 bg-white outline-none focus-visible:ring-2 focus-visible:ring-violet-400 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600 dark:border-violet-600 dark:bg-odp-bgSoft dark:data-[state=checked]:border-violet-500 dark:data-[state=checked]:bg-violet-500";
  function Da({ path: e, isDock: n, onPreview: s, muted: r }) {
    const o = us(e), a = n ? `min-w-0 flex-1 truncate text-left hover:underline${r ? " opacity-60" : ""}` : `min-w-0 max-w-full truncate hover:underline${r ? " opacity-60" : ""}`, c = s ? t.jsx("button", {
      type: "button",
      className: a,
      onClick: () => s(e),
      children: o
    }) : t.jsx("span", {
      className: a,
      children: o
    });
    return t.jsxs(Re, {
      children: [
        t.jsx(Me, {
          asChild: true,
          children: c
        }),
        t.jsx(Ae, {
          children: t.jsxs(Oe, {
            side: "top",
            sideOffset: 6,
            className: La,
            children: [
              e,
              t.jsx(Le, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function qr({ paths: e, onRemove: n, onOpenPicker: s, onPreview: r, isPathEnabled: o, onToggleEnabled: a, label: c = "\uADFC\uAC70 \uBB38\uC11C", emptyHint: d = "\uC120\uD0DD\uB41C \uADFC\uAC70 \uBB38\uC11C \uC5C6\uC74C", layout: u = "chips" }) {
    const f = u === "dock", m = f && !!a;
    return t.jsx(Rt, {
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
              s ? t.jsx(_, {
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
            className: f ? "flex flex-col gap-1.5" : "flex flex-wrap gap-1.5",
            children: e.map((h) => {
              const g = o ? o(h) : true, x = f ? `${Qa}${g ? "" : " opacity-70"}` : Ta;
              return t.jsxs("li", {
                className: x,
                children: [
                  m ? t.jsx(aa, {
                    className: _a,
                    checked: g,
                    onCheckedChange: (b) => a == null ? void 0 : a(h, b === true),
                    "aria-label": `${h} ${g ? "\uC0AC\uC6A9 \uC911" : "\uC0AC\uC6A9 \uC548 \uD568"}`,
                    children: t.jsx(la, {
                      className: "text-white",
                      children: t.jsx(Mr, {
                        size: 10,
                        strokeWidth: 3
                      })
                    })
                  }) : null,
                  t.jsx(Da, {
                    path: h,
                    isDock: f,
                    onPreview: r,
                    muted: m && !g
                  }),
                  n ? t.jsx("button", {
                    type: "button",
                    "aria-label": `${h} \uC81C\uAC70`,
                    className: f ? "ml-auto shrink-0 rounded-md p-1.5 hover:bg-violet-200/80 dark:hover:bg-violet-900" : "shrink-0 rounded p-0.5 hover:bg-violet-200/80 dark:hover:bg-violet-900",
                    onClick: () => n(h),
                    children: t.jsx(Ve, {
                      size: f ? 14 : 12
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
  function Fa({ text: e, previewId: n, className: s = "", getPresignedUrl: r, currentNotePath: o }) {
    const a = ga(), c = i.useRef(null), d = i.useMemo(() => String(e || ""), [
      e
    ]), u = ja(), f = r ?? u.getPresignedUrl, m = o ?? u.currentNotePath ?? null, h = u.hydrationEnabled !== false;
    return ba(c, d, f, m, {
      enabled: h
    }), t.jsx("div", {
      ref: c,
      className: `quiz-md-preview markdown-content ${s}`,
      children: t.jsx(ei, {
        engineHint: "legacy",
        id: n,
        modelValue: d,
        theme: a === "dark" ? "dark" : "light",
        previewTheme: "default",
        codeTheme: ti,
        language: "ko-KR",
        showCodeRowNumber: false,
        noImgZoomIn: true,
        noMermaid: true,
        iconfontType: void 0,
        sanitize: (g) => g
      })
    });
  }
  const De = i.memo(Fa), qa = /\*\(\s*정답\s*\)\*|\(\s*정답\s*\)|\[\s*정답\s*\]|\*\s*정답\s*\*/;
  function Ba(e) {
    return e.replace(/\*\(\s*정답\s*\)\*/g, "").replace(/\(\s*정답\s*\)/g, "").replace(/\[\s*정답\s*\]/g, "").replace(/\*\s*정답\s*\*/g, "").replace(/\*\*(.*?)\*\*/g, "$1").replace(/__(.*?)__/g, "$1").trim();
  }
  function Ua(e) {
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
  const sr = /\*{0,2}\s*📖\s*모범\s*답안\s*:?\s*\*{0,2}/, rr = /\*{0,2}\s*💡\s*접근\s*Point!?\s*\*{0,2}/, or = /\*{0,2}\s*📖\s*해설\s*:?\s*\*{0,2}/, ln = /\*{0,2}\s*📚\s*근거\s*문서\s*:?\s*\*{0,2}/;
  function Ga(e) {
    const n = e.join(`
`);
    if (!ln.test(n) && !n.includes("\u{1F4DA} \uADFC\uAC70 \uBB38\uC11C")) return;
    const s = n.split(ln)[1] ?? "", r = [];
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
  function Kt(e) {
    return String(e || "").replace(/^\*+\s*/, "").replace(/\s*\*+$/, "").trim();
  }
  function Wa(e) {
    const n = e.join(`
`).trim();
    if (!n) return {
      point: "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.",
      explanation: "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
    };
    let s, r = n;
    if (sr.test(r)) {
      const d = r.split(sr), f = (d[1] || "").trim().split(/(?=\*{0,2}\s*(?:💡\s*접근\s*Point!?|📖\s*해설|📚\s*근거\s*문서))/);
      s = Kt(f[0] || ""), r = [
        d[0],
        ...f.slice(1)
      ].join(`
`).trim();
    }
    r = (r.split(ln)[0] || "").trim();
    let a = "", c = "";
    if (rr.test(r) || or.test(r)) {
      const d = r.split(or), u = d[0] || "";
      c = Kt(d.slice(1).join(`
`)), a = Kt(u.replace(rr, ""));
    } else c = Kt(r);
    return {
      point: a || "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.",
      explanation: c || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",
      ...s ? {
        modelAnswer: s
      } : {}
    };
  }
  const Ja = /^<!--\s*quiz-q-meta\s+([\s\S]*?)-->\s*$/;
  function Ha(e) {
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
  function Ka(e) {
    return /^1\.\s+/.test(e.trim());
  }
  function Xa(e) {
    const n = e.trim();
    return n.startsWith(">") || /^\*\*정답:\*\*/.test(n);
  }
  function sn(e) {
    return e.trim().replace(/^>\s?/, "");
  }
  function Za(e) {
    const n = sn(e);
    return ln.test(n) || n.includes("\u{1F4DA} \uADFC\uAC70 \uBB38\uC11C");
  }
  function Ya(e) {
    return e.trim().startsWith(">");
  }
  function el(e, n) {
    const s = e.trim();
    if (!s || !/^#+/.test(s)) return null;
    const r = s.split(`
`);
    let o = String(n + 1), a = o, c = "", d = null;
    const u = [];
    let f = 1, m;
    const h = [];
    let g = "choice", x, b, k = false, z = false, S = false;
    for (const D of r) {
      const I = D.trim(), q = I.match(Ja);
      if (q == null ? void 0 : q[1]) {
        const E = Ha(q[1]);
        (E == null ? void 0 : E.similarOf) && (b = E.similarOf);
        continue;
      }
      const F = I.match(/^#+\s*(?:🔖\s*)?(\d+(?:-(?:유사|파생)\d+)?)\.?(.*)/);
      if (F) {
        a = (F[1] || "").trim(), o = a;
        const E = Ua((F[2] || "").trim());
        g = E.kind, x = E.answerStyle, c = E.question, k = true, z = true, S = false;
        continue;
      }
      if (!k) continue;
      if (S) {
        if (Ya(I)) {
          h.push(sn(I));
          continue;
        }
        S = false;
      }
      if (z) {
        if (Za(I)) {
          z = false, S = true, h.push(sn(I));
          continue;
        }
        if (Ka(I)) z = false;
        else if (g === "subjective" && Xa(I)) z = false;
        else if (I.startsWith("![")) {
          c = ir(c, I);
          const E = I.match(/!\[.*?\]\((.*?)\)/);
          (E == null ? void 0 : E[1]) && !d && (d = E[1]);
          continue;
        } else {
          if (!I && !c) continue;
          if (z) {
            c = ir(c, I);
            continue;
          }
        }
      }
      if (I.startsWith("![")) {
        const E = I.match(/!\[.*?\]\((.*?)\)/);
        (E == null ? void 0 : E[1]) && (d = E[1]);
        continue;
      }
      const X = I.match(/^\*\*정답:\*\*\s*(.*)$/);
      if (X) {
        m = (X[1] || "").trim();
        continue;
      }
      if (/^\d+\.\s+/.test(I)) {
        const E = I.match(/^(\d+)\.\s+(.*)/);
        if (E) {
          const T = Number.parseInt(E[1] || "0", 10), H = (E[2] || "").trim(), Q = qa.test(H);
          u.push(Ba(H)), Q && (f = T);
        }
        continue;
      }
      I.startsWith(">") && h.push(sn(I));
    }
    const { point: $, explanation: y, modelAnswer: P } = Wa(h), v = Ga(h), C = m || P;
    let M = g, L = x;
    return M === "choice" && u.length === 0 && C && (M = "subjective", L = m ? "short" : "essay"), M === "choice" && u.length === 0 && !C || M === "subjective" && !c || M === "choice" && (!c || u.length === 0) ? null : (b || (b = Va(a)), c = c.trimEnd(), {
      id: o,
      displayLabel: a,
      kind: M,
      question: c,
      image: d,
      point: $,
      explanation: y,
      ...M === "subjective" && L ? {
        answerStyle: L
      } : {},
      ...M === "choice" ? {
        options: u,
        answer: f
      } : {},
      ...M === "subjective" && C ? {
        modelAnswer: C
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
    const { config: n, body: s } = ni(e), { session: r, body: o } = si(s), a = [];
    o.split(/(?=^#+\s*(?:🔖\s*)?\d+)/m).forEach((f, m) => {
      const h = el(f, m);
      h && a.push(h);
    });
    const d = new Set(a.map((f) => f.id)), u = r && d.size > 0 ? ri(r, d, a) : r;
    return {
      config: is(n),
      questions: a,
      session: u && !os(u) ? u : null
    };
  }
  function Xt(e, n) {
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
  function Br(e, n) {
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
  function tl(e) {
    if (!String(e.question || "").trim()) return "\uC9C8\uBB38 \uBCF8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694.";
    if (e.kind === "choice") {
      const n = (e.options || []).map((o) => String(o || "").trim());
      if (n.filter(Boolean).length < 2) return "\uAC1D\uAD00\uC2DD\uC740 \uCD5C\uC18C 2\uAC1C \uC120\uD0DD\uC9C0\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4.";
      const r = e.answer || 0;
      return r < 1 || r > n.length || !n[r - 1] ? "\uC815\uB2F5 \uC120\uD0DD\uC9C0\uB97C \uC9C0\uC815\uD558\uC138\uC694." : null;
    }
    return String(e.modelAnswer || "").trim() ? null : e.answerStyle === "essay" ? "\uBAA8\uBC94 \uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694." : "\uC815\uB2F5\uC744 \uC785\uB825\uD558\uC138\uC694.";
  }
  function nl(e, n) {
    const s = e.kind || "choice", r = e.answerStyle === "essay" ? "essay" : "short", o = s === "choice" ? Je(Math.max(n, (e.options || []).filter(Boolean).length)) : n, a = s === "choice" ? et(e.options || [], o) : [];
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
  function sl({ isOpen: e, onClose: n, styleTemplate: s, initial: r, nextLabel: o, onSubmit: a, onOpenSourcePicker: c, onFixWithAi: d }) {
    const u = !!r, [f, m] = i.useState((r == null ? void 0 : r.kind) || s.kind), [h, g] = i.useState((r == null ? void 0 : r.answerStyle) || s.answerStyle), [x, b] = i.useState(() => r ? _e(r, s.choiceCount) : s.choiceCount), [k, z] = i.useState((r == null ? void 0 : r.question) || ""), [S, $] = i.useState(() => et((r == null ? void 0 : r.options) || [], r ? _e(r, s.choiceCount) : s.choiceCount)), [y, P] = i.useState((r == null ? void 0 : r.answer) || 1), [v, C] = i.useState((r == null ? void 0 : r.modelAnswer) || ""), [M, L] = i.useState((r == null ? void 0 : r.point) || ""), [W, D] = i.useState((r == null ? void 0 : r.explanation) || ""), [I, q] = i.useState((r == null ? void 0 : r.sourcePaths) || []), [F, X] = i.useState(""), [E, T] = i.useState(false), [H, Q] = i.useState(""), [le, $e] = i.useState(false), Z = i.useCallback((O) => {
      const j = Je(O);
      b(j), $((oe) => et(oe, j)), P((oe) => Math.min(Math.max(1, oe), j));
    }, []);
    i.useEffect(() => {
      if (!e) {
        T(false), Q(""), $e(false), X("");
        return;
      }
      if (r) {
        const O = _e(r, s.choiceCount);
        m(r.kind), g(r.answerStyle === "essay" ? "essay" : "short"), b(O), z(r.question || ""), $(et(r.options || [], O)), P(r.answer || 1), C(r.modelAnswer || ""), L(r.point || ""), D(r.explanation || ""), q(r.sourcePaths || []);
      } else m(s.kind), g(s.answerStyle), b(s.choiceCount), z(""), $(et([], s.choiceCount)), P(1), C(""), L(""), D(""), q([]);
      T(false), Q(""), X("");
    }, [
      e,
      r,
      s
    ]);
    const B = i.useMemo(() => {
      const O = {
        kind: f,
        displayLabel: (r == null ? void 0 : r.displayLabel) || o,
        question: k,
        point: M,
        explanation: W,
        sourcePaths: I
      };
      return f === "subjective" ? {
        ...O,
        answerStyle: h,
        modelAnswer: v
      } : {
        ...O,
        options: et(S, x),
        answer: y
      };
    }, [
      f,
      h,
      r == null ? void 0 : r.displayLabel,
      o,
      k,
      S,
      x,
      y,
      v,
      M,
      W,
      I
    ]), J = () => {
      const O = tl(B);
      if (O) {
        X(O);
        return;
      }
      const j = Br(B, o);
      r && (j.id = r.id, j.displayLabel = r.displayLabel), a(j), n();
    }, ee = async () => {
      if (!(!d || le)) {
        X(""), $e(true);
        try {
          const O = await d({
            instructions: H,
            form: B
          });
          if (!O) return;
          const j = nl(O, x);
          m(j.kind), g(j.answerStyle), b(j.choiceCount), z(j.question), $(j.options), P(j.answer), C(j.modelAnswer), L(j.point), D(j.explanation), T(false);
        } catch (O) {
          X((O instanceof Error ? O.message : "") || "\uBB38\uC81C \uACE0\uCE58\uAE30\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
        } finally {
          $e(false);
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
              u && d ? t.jsxs(_, {
                type: "button",
                variant: E ? "primary" : "secondary",
                size: "sm",
                "aria-pressed": E,
                disabled: le,
                onClick: () => T((O) => !O),
                children: [
                  t.jsx(It, {
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
                    value: H,
                    onChange: (O) => Q(O.target.value),
                    disabled: le
                  })
                ]
              }),
              t.jsx("div", {
                className: "flex justify-end",
                children: t.jsxs(_, {
                  type: "button",
                  variant: "primary",
                  size: "sm",
                  disabled: le,
                  onClick: () => {
                    ee();
                  },
                  children: [
                    le ? t.jsx(mn, {
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
              ].map(([O, j]) => {
                const oe = O === "choice" ? f === "choice" : f === "subjective" && h === (O === "subjective-short" ? "short" : "essay");
                return t.jsx("button", {
                  type: "button",
                  className: `rounded-lg border px-3 py-1.5 text-xs font-semibold ${oe ? "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-100" : "border-gray-200 bg-white text-gray-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"}`,
                  onClick: () => {
                    O === "choice" ? m("choice") : (m("subjective"), g(O === "subjective-short" ? "short" : "essay"));
                  },
                  children: j
                }, O);
              }),
              f === "choice" ? t.jsxs("label", {
                className: "ml-auto flex items-center gap-1.5 text-xs text-gray-600 dark:text-odp-muted",
                children: [
                  "\uBCF4\uAE30",
                  t.jsx("select", {
                    className: "rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                    value: x,
                    onChange: (O) => Z(Number(O.target.value) || x),
                    children: Array.from({
                      length: yr - Pt + 1
                    }, (O, j) => Pt + j).map((O) => t.jsxs("option", {
                      value: O,
                      children: [
                        O,
                        "\uC9C0\uC120\uB2E4"
                      ]
                    }, O))
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
                onChange: (O) => z(O.target.value)
              }),
              k.trim() ? t.jsx(De, {
                text: k,
                previewId: "quiz-add-q-preview",
                className: "rounded border border-gray-100 p-2 text-xs dark:border-odp-borderSoft"
              }) : null
            ]
          }),
          f === "choice" ? t.jsxs("div", {
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
              S.map((O, j) => t.jsxs("div", {
                className: "flex items-start gap-2",
                children: [
                  t.jsx("input", {
                    type: "radio",
                    name: "quiz-add-answer",
                    checked: y === j + 1,
                    onChange: () => P(j + 1),
                    className: "mt-2",
                    "aria-label": `${j + 1}\uBC88 \uC815\uB2F5`
                  }),
                  t.jsx("textarea", {
                    className: "min-h-10 flex-1 rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                    value: O,
                    placeholder: `${j + 1}\uBC88`,
                    onChange: (oe) => {
                      const me = [
                        ...S
                      ];
                      me[j] = oe.target.value, $(me);
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
                onChange: (O) => C(O.target.value)
              }) : t.jsx("input", {
                className: "w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                value: v,
                onChange: (O) => C(O.target.value)
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
                value: M,
                onChange: (O) => L(O.target.value)
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
                value: W,
                onChange: (O) => D(O.target.value)
              })
            ]
          }),
          t.jsx(qr, {
            paths: I,
            onRemove: (O) => q((j) => j.filter((oe) => oe !== O)),
            onOpenPicker: () => c(I, (O) => q(O)),
            label: "\uBB38\uD56D \uADFC\uAC70 \uBB38\uC11C (\uC120\uD0DD)"
          }),
          F ? t.jsx("p", {
            className: "text-xs font-medium text-rose-600",
            children: F
          }) : null,
          t.jsxs("div", {
            className: "flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-odp-borderSoft",
            children: [
              t.jsx(_, {
                type: "button",
                variant: "secondary",
                onClick: n,
                disabled: le,
                children: "\uCDE8\uC18C"
              }),
              t.jsxs(_, {
                type: "button",
                variant: "primary",
                onClick: J,
                disabled: le,
                children: [
                  u ? t.jsx(fn, {
                    size: 14
                  }) : t.jsx(oi, {
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
  function rl(e, n) {
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
  function ol(e, n, s) {
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
      questions: rl(e.questions, n.questions)
    };
  }
  const il = `### 1. \uB9F5\uB9AC\uB4C0\uC2A4\uC5D0 \uB300\uD55C \uC124\uBA85\uC73C\uB85C \uAC00\uC7A5 \uC801\uC808\uD55C \uAC83\uC740?

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
  function al({ isOpen: e, onClose: n, current: s, onApply: r }) {
    const [o, a] = i.useState(""), [c, d] = i.useState("append"), [u, f] = i.useState(""), [m, h] = i.useState(false), g = (b = false) => {
      const k = at(o);
      if (!k.questions.length) {
        f("\uD30C\uC2F1\uB41C \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uB9C8\uD06C\uB2E4\uC6B4 \uD615\uC2DD\uC744 \uD655\uC778\uD558\uC138\uC694.");
        return;
      }
      if (c === "replace" && !b) {
        h(true);
        return;
      }
      const z = ol(s, k, {
        mode: c,
        mergeConfig: c === "replace"
      });
      r(z, c), n();
    }, x = (b) => {
      if (!b) return;
      const k = new FileReader();
      k.onload = () => {
        a(String(k.result || "")), f("");
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
                  t.jsxs(_, {
                    type: "button",
                    variant: "secondary",
                    onClick: () => {
                      var _a2;
                      return (_a2 = document.getElementById("quiz-bulk-file")) == null ? void 0 : _a2.click();
                    },
                    children: [
                      t.jsx(ii, {
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
                  t.jsx(_, {
                    type: "button",
                    variant: "tertiary",
                    onClick: () => {
                      a(il), f("");
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
                  a(b.target.value), f("");
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
                  t.jsx(_, {
                    type: "button",
                    variant: "secondary",
                    onClick: n,
                    children: "\uCDE8\uC18C"
                  }),
                  t.jsxs(_, {
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
        t.jsx(Vn, {
          isOpen: m,
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
        if (!(a.path || a.name || "").toLowerCase().endsWith(".md") || n && a.path === n || li(a.path) && n && a.path === n) continue;
        s.push(a);
      }
    };
    return r(e || []), s;
  }
  function ll({ isOpen: e, onClose: n, tree: s, selected: r, excludePath: o, onConfirm: a, onExpandFolder: c, onDropHostChange: d, onRegisterDropPathsMerge: u }) {
    const [f, m] = i.useState(r), [h, g] = i.useState(""), x = i.useMemo(() => Array.isArray(s) ? s : [], [
      s
    ]);
    i.useEffect(() => {
      e && m(r);
    }, [
      e,
      r
    ]);
    const b = i.useCallback((S) => {
      S.length && m(($) => {
        const y = new Set($);
        for (const P of S) y.add(P);
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
      const S = ($) => {
        for (const y of $) {
          if (y.path === h) return y;
          if (y.children) {
            const P = S(y.children);
            if (P) return P;
          }
        }
        return null;
      };
      return ((_a2 = S(x)) == null ? void 0 : _a2.children) || [];
    }, [
      x,
      h
    ]), z = (S) => {
      m(($) => $.includes(S) ? $.filter((y) => y !== S) : [
        ...$,
        S
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
              const S = h.replace(/\/$/, "").split("/").filter(Boolean);
              S.pop(), g(S.length ? `${S.join("/")}/` : "");
            },
            children: "\u2190 \uC0C1\uC704 \uD3F4\uB354"
          }) : null,
          t.jsx("div", {
            ref: d,
            className: "relative min-h-48 flex-1",
            children: t.jsxs("ul", {
              className: "h-full min-h-48 space-y-1 overflow-y-auto rounded-lg border border-gray-200 p-2 dark:border-odp-borderSoft",
              children: [
                k.map((S) => {
                  if (S.type === "folder") return t.jsx("li", {
                    children: t.jsxs("button", {
                      type: "button",
                      className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg",
                      onClick: async () => {
                        await (c == null ? void 0 : c(S)), g(S.path.endsWith("/") ? S.path : `${S.path}/`);
                      },
                      children: [
                        t.jsx(ai, {
                          size: 14
                        }),
                        S.name
                      ]
                    })
                  }, S.path);
                  if (!(S.path || "").toLowerCase().endsWith(".md") || o && S.path === o) return null;
                  const y = f.includes(S.path);
                  return t.jsx("li", {
                    children: t.jsxs("label", {
                      className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg",
                      children: [
                        t.jsx("input", {
                          type: "checkbox",
                          checked: y,
                          onChange: () => z(S.path)
                        }),
                        t.jsx("span", {
                          className: "truncate",
                          children: S.name
                        })
                      ]
                    })
                  }, S.path);
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
              f.length,
              "\uAC1C \uC120\uD0DD\uB428",
              ar(x, o).length ? ` / vault md ${ar(x, o).length}\uAC1C` : ""
            ]
          }),
          t.jsxs("div", {
            className: "flex justify-end gap-2",
            children: [
              t.jsx(_, {
                type: "button",
                variant: "secondary",
                onClick: n,
                children: "\uCDE8\uC18C"
              }),
              t.jsxs(_, {
                type: "button",
                variant: "primary",
                onClick: () => {
                  a(f), n();
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
  function cl(e) {
    switch (e) {
      case "running":
        return t.jsx(mn, {
          size: 13,
          className: "animate-spin text-violet-600 dark:text-violet-300"
        });
      case "done":
        return t.jsx(Mr, {
          size: 13,
          className: "text-emerald-600 dark:text-emerald-400"
        });
      case "error":
        return t.jsx(Ve, {
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
  function Zt({ title: e, body: n }) {
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
  function dl({ step: e }) {
    var _a2, _b, _c2, _d;
    return !!((_a2 = e.systemPrompt) == null ? void 0 : _a2.trim()) || !!((_b = e.llmInstruction) == null ? void 0 : _b.trim()) || !!((_c2 = e.llmResponse) == null ? void 0 : _c2.trim()) || !!((_d = e.error) == null ? void 0 : _d.trim()) ? t.jsxs("div", {
      className: "space-y-2",
      children: [
        t.jsx(Zt, {
          title: "System prompt",
          body: e.systemPrompt || ""
        }),
        t.jsx(Zt, {
          title: "Instruction / input",
          body: e.llmInstruction || ""
        }),
        t.jsx(Zt, {
          title: "Model response / artifact",
          body: e.llmResponse || ""
        }),
        e.error ? t.jsx(Zt, {
          title: "Error",
          body: e.error
        }) : null
      ]
    }) : t.jsx("p", {
      className: "text-[10px] text-slate-400 dark:text-odp-muted",
      children: "\uC800\uC7A5\uB41C \uD504\uB86C\uD504\uD2B8/\uC751\uB2F5 \uC5C6\uC74C"
    });
  }
  function ul({ step: e, showDetail: n }) {
    const s = e.error || e.detail;
    return t.jsxs("li", {
      className: "space-y-1.5 py-0.5",
      children: [
        t.jsxs("div", {
          className: "flex items-start gap-2",
          children: [
            t.jsx("span", {
              className: "mt-0.5 shrink-0",
              children: cl(e.status)
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
          children: t.jsx(dl, {
            step: e
          })
        }) : null
      ]
    });
  }
  function fl({ job: e, detailOpen: n, onToggleDetail: s, onRemove: r }) {
    const o = e.kind === "similar" ? "\uC720\uC0AC\uBB38\uC81C" : e.kind === "derived" ? "\uD30C\uC0DD\uBB38\uC81C" : "\uADFC\uAC70 \uCD9C\uC81C", a = e.kind === "similar" ? t.jsx(It, {
      size: 14,
      className: "shrink-0 text-violet-600 dark:text-violet-300"
    }) : e.kind === "derived" ? t.jsx(ds, {
      size: 14,
      className: "shrink-0 text-violet-600 dark:text-violet-300"
    }) : t.jsx(He, {
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
                  children: t.jsx(Ve, {
                    size: 14
                  })
                }) : null
              ]
            })
          ]
        }),
        t.jsx("div", {
          className: "mb-1.5 flex justify-end",
          children: t.jsxs(_, {
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
          children: e.steps.map((c) => t.jsx(ul, {
            step: c,
            showDetail: n
          }, c.id))
        })
      ]
    });
  }
  function ml({ jobs: e, isOpen: n, size: s, onClose: r, onResize: o, onRemoveJob: a, onClearFinished: c, onUserEngage: d, onPointerEngageChange: u, onFocusEngageChange: f }) {
    const m = i.useRef(null), [h, g] = i.useState({}), x = i.useRef({
      mode: null,
      startX: 0,
      startY: 0,
      startW: 0,
      startH: 0
    }), b = (v) => {
      g((C) => {
        const M = {
          ...C
        };
        return M[v] ? delete M[v] : M[v] = true, M;
      });
    }, k = i.useCallback((v, C) => {
      C.preventDefault(), C.stopPropagation(), x.current = {
        mode: v,
        startX: C.clientX,
        startY: C.clientY,
        startW: s.width,
        startH: s.height
      };
      const M = (W) => {
        const D = x.current;
        if (!D.mode) return;
        const I = D.startX - W.clientX, q = D.startY - W.clientY;
        let F = D.startW, X = D.startH;
        (D.mode === "width" || D.mode === "both") && (F = D.startW + I), (D.mode === "height" || D.mode === "both") && (X = D.startH + q), o({
          width: F,
          height: X
        });
      }, L = () => {
        x.current.mode = null, document.removeEventListener("pointermove", M), document.removeEventListener("pointerup", L);
      };
      document.addEventListener("pointermove", M), document.addEventListener("pointerup", L);
    }, [
      o,
      s.height,
      s.width
    ]), z = e.filter((v) => v.status === "running").length, S = e.filter((v) => v.status === "done").length, $ = e.filter((v) => v.status === "error").length, y = e.some((v) => v.status !== "running"), P = $a();
    return t.jsx(rn, {
      children: n ? t.jsxs(We.div, {
        ref: m,
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
        onFocusCapture: () => f == null ? void 0 : f(true),
        onBlurCapture: (v) => {
          v.currentTarget.contains(v.relatedTarget) || (f == null ? void 0 : f(false));
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
                  t.jsx(He, {
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
                children: t.jsx(Ve, {
                  size: 15
                })
              })
            ]
          }),
          t.jsx("div", {
            className: "shrink-0 border-b border-slate-200/80 px-3 py-1.5 text-[11px] text-slate-600 dark:border-odp-borderSoft dark:text-odp-muted",
            children: e.length === 0 ? "\uC9C4\uD589 \uC911\uC778 \uC0DD\uC131 \uC791\uC5C5\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" : `\uC9C4\uD589 ${z} \xB7 \uC644\uB8CC ${S}${$ > 0 ? ` \xB7 \uC2E4\uD328 ${$}` : ""}`
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
              y ? t.jsxs(_, {
                type: "button",
                variant: "tertiary",
                size: "sm",
                onClick: c,
                children: [
                  t.jsx(Ve, {
                    size: 14
                  }),
                  "\uC644\uB8CC \uD56D\uBAA9 \uBE44\uC6B0\uAE30"
                ]
              }) : null,
              t.jsxs(_, {
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
  const Yt = "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
  function pl({ stopwatch: e, onRequestStart: n }) {
    const { displayMs: s, running: r, started: o, start: a, pause: c, resume: d, stop: u } = e, f = n ?? a;
    return o ? t.jsx(Rt, {
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
            children: Kn(s)
          }),
          r ? t.jsxs(Re, {
            children: [
              t.jsx(Me, {
                asChild: true,
                children: t.jsx(_, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  onClick: c,
                  "aria-label": "\uC77C\uC2DC\uC815\uC9C0",
                  children: t.jsx(Vi, {
                    size: 14
                  })
                })
              }),
              t.jsx(Ae, {
                children: t.jsxs(Oe, {
                  side: "bottom",
                  sideOffset: 6,
                  className: Yt,
                  children: [
                    "\uC77C\uC2DC\uC815\uC9C0",
                    t.jsx(Le, {
                      className: "fill-white dark:fill-odp-surface"
                    })
                  ]
                })
              })
            ]
          }) : t.jsxs(Re, {
            children: [
              t.jsx(Me, {
                asChild: true,
                children: t.jsx(_, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  onClick: d,
                  "aria-label": "\uC7AC\uAC1C",
                  children: t.jsx(Ki, {
                    size: 14
                  })
                })
              }),
              t.jsx(Ae, {
                children: t.jsxs(Oe, {
                  side: "bottom",
                  sideOffset: 6,
                  className: Yt,
                  children: [
                    "\uC7AC\uAC1C",
                    t.jsx(Le, {
                      className: "fill-white dark:fill-odp-surface"
                    })
                  ]
                })
              })
            ]
          }),
          t.jsxs(Re, {
            children: [
              t.jsx(Me, {
                asChild: true,
                children: t.jsx(_, {
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
                children: t.jsxs(Oe, {
                  side: "bottom",
                  sideOffset: 6,
                  className: Yt,
                  children: [
                    "\uC815\uC9C0",
                    t.jsx(Le, {
                      className: "fill-white dark:fill-odp-surface"
                    })
                  ]
                })
              })
            ]
          })
        ]
      })
    }) : t.jsx(Rt, {
      delayDuration: 250,
      skipDelayDuration: 0,
      children: t.jsxs(Re, {
        children: [
          t.jsx(Me, {
            asChild: true,
            children: t.jsxs(_, {
              type: "button",
              variant: "secondary",
              size: "sm",
              onClick: f,
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
            children: t.jsxs(Oe, {
              side: "bottom",
              sideOffset: 6,
              className: Yt,
              children: [
                "\uC2DC\uD5D8 \uC2DC\uAC04 \uCE21\uC815 \uC2DC\uC791",
                t.jsx(Le, {
                  className: "fill-white dark:fill-odp-surface"
                })
              ]
            })
          })
        ]
      })
    });
  }
  function xl({ log: e }) {
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
                    children: ci[d.type]
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
  const hl = "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", gl = "\uC2DC\uD5D8\uC774 \uB05D\uB09C \uB4A4\uC5D0 \uC804\uCCB4 \uCC44\uC810\uC744 \uD574\uC8FC\uC138\uC694";
  function lr({ examInProgress: e, disabled: n, children: s, ...r }) {
    const o = !!n || e, a = t.jsx(_, {
      type: "button",
      ...r,
      disabled: o,
      children: s
    });
    return e ? t.jsxs(Re, {
      children: [
        t.jsx(Me, {
          asChild: true,
          children: t.jsx("span", {
            className: "inline-flex",
            children: a
          })
        }),
        t.jsx(Ae, {
          children: t.jsxs(Oe, {
            side: "top",
            sideOffset: 6,
            className: hl,
            children: [
              gl,
              t.jsx(Le, {
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
  function Ur(e) {
    return e && typeof e == "object" ? e : {};
  }
  function bl(e) {
    if (typeof e == "number" && Number.isFinite(e)) return e;
    if (typeof e == "string" && e.trim()) return e.trim();
    const n = Number(e);
    return Number.isFinite(n) ? n : String(e ?? "").trim();
  }
  function kl(e, n) {
    const s = Ur(e), r = String(s.id || s.name || `var${n + 1}`).trim();
    if (!r) return null;
    const o = String(s.description || s.label || r).trim() || r, a = bl(s.originalValue ?? s.value), c = Number(s.min), d = Number(s.max), u = Number.isFinite(c) ? c : 0, f = Number.isFinite(d) ? d : u, m = Number(s.step), h = Number.isFinite(m) && m > 0 ? m : 1, g = typeof s.unit == "string" && s.unit.trim() ? s.unit.trim() : void 0;
    return {
      id: r,
      description: o,
      originalValue: a,
      min: u,
      max: f,
      step: h,
      ...g ? {
        unit: g
      } : {}
    };
  }
  function Gr(e) {
    const n = Ur(e), s = String(n.coreCategory || n.category || n.topic || "").trim() || "general concept", r = !!(n.isCalculation ?? n.isCalc ?? n.calculation), a = (Array.isArray(n.variables) ? n.variables : []).map((c, d) => kl(c, d)).filter((c) => c != null);
    return {
      coreCategory: s,
      isCalculation: r,
      variables: r ? a : []
    };
  }
  function wl(e, n, s, r) {
    const o = Math.min(e, n), a = Math.max(e, n), c = s > 0 ? s : 1, d = Math.floor((a - o) / c);
    if (d < 0 || d === 0) return o;
    let u = o, f = 0;
    do {
      const m = Math.floor(Math.random() * (d + 1));
      u = o + m * c, f += 1;
    } while (f < 24 && typeof r == "number" && Number.isFinite(r) && u === r && d > 0);
    return u;
  }
  function Wr(e) {
    return e.map((n) => {
      if (typeof n.originalValue == "number" && Number.isFinite(n.originalValue)) {
        const s = wl(n.min, n.max, n.step ?? 1, n.originalValue);
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
  function Jr(e) {
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
  const yl = [
    "\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694.",
    "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694."
  ], vl = [
    "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
  ], jl = 12, Sl = 24;
  function ut(e) {
    const n = String(e || "").trim();
    return !n || n.length < jl ? true : yl.some((s) => n === s);
  }
  function ft(e) {
    const n = String(e || "").trim();
    return !n || n.length < Sl ? true : vl.some((s) => n === s);
  }
  function cn(e) {
    return !ut(String(e.point || "")) && !ft(String(e.explanation || ""));
  }
  function Hr(e) {
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
  function Cl(e) {
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
  function Kr(e) {
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
  function Nl(e) {
    var _a2;
    const n = e.question, s = [];
    e.missingPoint && s.push("point(\uC811\uADFC Point)"), e.missingExplanation && s.push("explanation(\uD574\uC124)");
    let r = "";
    if (n.kind === "choice") {
      const d = n.options || [];
      r = `\uC9C8\uBB38: ${n.question}
\uBCF4\uAE30: ${d.map((u, f) => `${f + 1}. ${u}`).join(" | ")}
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
    const o = ut(e.point || ""), a = ft(e.explanation || ""), c = o || a;
    if (!s && !c) return null;
    const d = `sections-${e.id}`, u = n === d, f = c ? t.jsxs("div", {
      className: "flex justify-end gap-2",
      children: [
        o && a ? t.jsxs(_, {
          type: "button",
          variant: "secondary",
          size: "sm",
          disabled: u,
          onClick: () => r("both"),
          children: [
            t.jsx(He, {
              size: 14
            }),
            u ? "\uC0DD\uC131 \uC911\u2026" : "\uC811\uADFC Point\xB7\uD574\uC124 \uC0DD\uC131"
          ]
        }) : null,
        o && !a ? t.jsxs(_, {
          type: "button",
          variant: "secondary",
          size: "sm",
          disabled: u,
          onClick: () => r("point"),
          children: [
            t.jsx(He, {
              size: 14
            }),
            u ? "\uC0DD\uC131 \uC911\u2026" : "\uC811\uADFC Point \uC0DD\uC131"
          ]
        }) : null,
        a && !o ? t.jsxs(_, {
          type: "button",
          variant: "secondary",
          size: "sm",
          disabled: u,
          onClick: () => r("explanation"),
          children: [
            t.jsx(He, {
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
            }) : t.jsx(De, {
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
            }) : t.jsx(De, {
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
            t.jsx(De, {
              text: e.modelAnswer,
              previewId: `qm-${e.id}`
            })
          ]
        }) : null,
        f
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
        f
      ]
    });
  }
  const $l = "relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-400 data-[state=checked]:border-rose-500 data-[state=checked]:bg-rose-500 data-[state=checked]:text-white border-rose-200 bg-white text-rose-800 hover:bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-100 dark:hover:bg-rose-950/50 dark:data-[state=checked]:border-rose-500 dark:data-[state=checked]:bg-rose-600", Pl = "relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100 dark:hover:bg-emerald-950/50 dark:data-[state=checked]:border-emerald-500 dark:data-[state=checked]:bg-emerald-600";
  function zl({ question: e, focusOption: n, onFocusOptionChange: s, wrongExps: r, busyKey: o, onOpenAnalysisDock: a }) {
    var _a2;
    const c = ((_a2 = e.options) == null ? void 0 : _a2.length) || 0;
    if (c <= 0) return null;
    const d = Ye(e.id, n), u = r[d], f = u !== void 0, m = o === d, h = n === e.answer, g = h ? "\uC815\uB2F5 \uBD84\uC11D" : "\uC624\uB2F5 \uBD84\uC11D", x = h ? "mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/45 dark:text-emerald-100" : "mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100", b = h ? "font-bold text-emerald-800 dark:text-emerald-200" : "font-bold text-rose-800 dark:text-rose-200", k = h ? "text-[11px] font-semibold text-emerald-700 dark:text-emerald-200" : "text-[11px] font-semibold text-rose-700 dark:text-rose-200", z = h ? "text-[11px] text-emerald-700/90 dark:text-emerald-200/80" : "text-[11px] text-rose-700/90 dark:text-rose-200/80", S = h ? "text-[10px] font-medium text-emerald-500 dark:text-emerald-300" : "text-[10px] font-medium text-rose-500 dark:text-rose-300", $ = h ? "bg-emerald-500 dark:bg-emerald-300" : "bg-rose-500 dark:bg-rose-300", y = h ? "ring-emerald-50 dark:ring-emerald-950" : "ring-rose-50 dark:ring-rose-950";
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
            t.jsx(ca, {
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
                const C = v + 1, M = Ye(e.id, C), L = r[M] !== void 0 && String(r[M] || "").trim(), W = C === e.answer, D = W ? Pl : $l;
                return t.jsxs(da, {
                  value: String(C),
                  className: `${D} ${L ? "pr-2 pl-2" : ""}`,
                  "aria-label": `${C}\uBC88${W ? " (\uC815\uB2F5)" : ""}${L ? ", \uBD84\uC11D \uC800\uC7A5\uB428" : ""}`,
                  children: [
                    t.jsx("span", {
                      children: C
                    }),
                    L ? t.jsx("span", {
                      className: `absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ${y}`,
                      "aria-hidden": true
                    }) : null
                  ]
                }, C);
              })
            })
          ]
        }),
        f ? t.jsxs("div", {
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
                m ? t.jsxs("span", {
                  className: `inline-flex items-center gap-1 ${S}`,
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
              children: u ? t.jsx(De, {
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
                t.jsxs(_, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  disabled: m,
                  onClick: () => a(n, "followup"),
                  children: [
                    t.jsx(Zi, {
                      size: 14
                    }),
                    "\uCD94\uAC00\uC9C8\uBB38"
                  ]
                }),
                t.jsxs(_, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  disabled: m,
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
            t.jsxs(_, {
              type: "button",
              variant: "secondary",
              size: "sm",
              disabled: m,
              onClick: () => a(n, "create"),
              children: [
                m ? t.jsx(He, {
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
  function Il({ questionId: e, value: n, onSave: s }) {
    const r = String(n || ""), o = r.trim().length > 0, a = `qmemo-${e}`, [c, d] = i.useState(false), [u, f] = i.useState(""), m = i.useRef(false), h = i.useRef(""), g = i.useRef(r), x = i.useRef(s);
    m.current = c, h.current = u, g.current = r, x.current = s, i.useEffect(() => {
      c || f(r);
    }, [
      r,
      c
    ]), i.useEffect(() => () => {
      if (!m.current) return;
      const S = h.current;
      S !== g.current && x.current(S);
    }, []);
    const b = () => {
      f(""), d(true);
    }, k = () => {
      f(r), d(true);
    }, z = () => {
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
                onChange: (S) => f(S.target.value),
                autoFocus: true
              })
            ]
          }),
          t.jsxs("div", {
            className: "flex flex-wrap gap-1.5",
            children: [
              t.jsx(_, {
                type: "button",
                variant: "primary",
                size: "sm",
                onClick: z,
                children: "\uC800\uC7A5\uD558\uAE30"
              }),
              t.jsx(_, {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: () => {
                  f(r), d(false);
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
            children: t.jsx(De, {
              text: r,
              previewId: a
            })
          }) : null,
          t.jsxs(_, {
            type: "button",
            variant: "secondary",
            size: "sm",
            onClick: o ? k : b,
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
  const Rl = 400;
  function Ml(e, n, s) {
    const [r, o] = i.useState(n), a = i.useRef(n), c = i.useRef(n), d = i.useRef(e), u = i.useRef(s), f = i.useRef(null);
    d.current = e, u.current = s, c.current = r, i.useEffect(() => {
      n !== a.current && (a.current = n, c.current = n, o(n));
    }, [
      n
    ]);
    const m = i.useCallback(() => {
      f.current != null && (clearTimeout(f.current), f.current = null);
      const g = c.current;
      g !== a.current && (a.current = g, u.current(d.current, g));
    }, []), h = i.useCallback((g) => {
      c.current = g, o(g), f.current != null && clearTimeout(f.current), f.current = setTimeout(() => {
        f.current = null, g !== a.current && (a.current = g, u.current(d.current, g));
      }, Rl);
    }, []);
    return i.useEffect(() => () => {
      f.current != null && (clearTimeout(f.current), f.current = null);
      const g = c.current;
      g !== a.current && (a.current = g, u.current(d.current, g));
    }, []), {
      draft: r,
      handleChange: h,
      flush: m
    };
  }
  const rs = "data-quiz-q-track", Al = 0.12;
  function Ol({ scrollRootRef: e, questions: n, running: s, getElapsedMs: r, timeLog: o, onLogChange: a }) {
    const c = i.useRef(o), d = i.useRef(a), u = i.useRef(r), f = i.useRef(n), m = i.useRef(null), h = i.useRef(null), g = i.useRef(/* @__PURE__ */ new Map());
    c.current = o, d.current = a, u.current = r, f.current = n;
    const x = i.useCallback(($) => {
      const y = m.current;
      if (!y) return;
      m.current = null, h.current = null;
      const P = u.current(), v = Math.max(0, P - y.elapsedMs);
      if (v < di) return;
      const C = {
        questionId: y.questionId,
        displayLabel: y.displayLabel,
        at: y.at,
        endedAt: $ ?? (/* @__PURE__ */ new Date()).toISOString(),
        durationMs: v
      }, M = ui(c.current, C);
      d.current(M);
    }, []), b = i.useCallback(($, y) => {
      var _a2;
      ((_a2 = m.current) == null ? void 0 : _a2.questionId) !== $ && (m.current = {
        questionId: $,
        displayLabel: y,
        at: (/* @__PURE__ */ new Date()).toISOString(),
        elapsedMs: u.current()
      }, h.current = $);
    }, []), k = i.useCallback(() => {
      let $ = null, y = 0;
      for (const [P, v] of g.current) v > y && (y = v, $ = P);
      return y >= Al ? $ : null;
    }, []), z = i.useCallback(($) => {
      if (!s || $ === h.current) return;
      if (x(), !$) {
        h.current = null;
        return;
      }
      const y = f.current.find((P) => P.id === $);
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
    const S = n.map(($) => $.id).join("\0");
    i.useEffect(() => {
      const $ = e.current;
      if (!$ || !s) return;
      const y = new Set(f.current.map((C) => C.id));
      g.current = new Map([
        ...g.current.entries()
      ].filter(([C]) => y.has(C)));
      const P = new IntersectionObserver((C) => {
        for (const M of C) {
          const L = M.target.getAttribute(rs);
          L && g.current.set(L, M.intersectionRatio);
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
      return $.querySelectorAll(`[${rs}]`).forEach((C) => P.observe(C)), () => {
        P.disconnect();
      };
    }, [
      e,
      S,
      s,
      z,
      k
    ]);
  }
  const cr = rs;
  function Ll({ question: e, userAnswer: n, isSubmitted: s, isQuestionGraded: r, subjectiveGrade: o, showExplanation: a, wrongExpsForQuestion: c, wrongExpFocusOption: d, questionMemo: u, busyId: f, examInProgress: m, isFresh: h, onClearFresh: g, onAnswerCommit: x, onSelectOption: b, onEditQuestion: k, onGradeChoice: z, onGradeSubjective: S, onRetry: $, onToggleExplanation: y, onSimilar: P, onDerived: v, onGenerateSections: C, onWrongExpFocusChange: M, onOpenAnalysisDock: L, onMemoSave: W }) {
    const D = String(n ?? ""), { draft: I, handleChange: q, flush: F } = Ml(e.id, D, x), X = n !== void 0 && String(n).trim() !== "", E = s || r, { isWrong: T, isCorrect: H, gradeLabel: Q } = i.useMemo(() => {
      let B = false, J = false, ee = null;
      if (e.kind === "choice" && E && X && (J = n === e.answer, B = !J), e.kind === "subjective" && E && (J = (o == null ? void 0 : o.verdict) === "correct", B = (o == null ? void 0 : o.verdict) === "wrong"), E) if (e.kind === "choice") X ? J ? ee = "\uC815\uB2F5" : ee = "\uC624\uB2F5" : ee = "\uBBF8\uCC44\uC810";
      else {
        const O = o == null ? void 0 : o.verdict;
        O === "correct" ? ee = "\uC815\uB2F5" : O === "partial" ? ee = "\uBD80\uBD84\uC815\uB2F5" : O === "wrong" && (ee = "\uC624\uB2F5");
      }
      return {
        isWrong: B,
        isCorrect: J,
        gradeLabel: ee
      };
    }, [
      X,
      E,
      e.answer,
      e.kind,
      o == null ? void 0 : o.verdict,
      n
    ]), le = n, $e = [
      "relative rounded-2xl border bg-white p-5 pr-16 shadow-xs dark:bg-odp-surface",
      E ? H ? "border-emerald-300" : T ? "border-rose-300" : "border-slate-200 dark:border-odp-borderSoft" : "border-slate-200 dark:border-odp-borderSoft",
      e.isGenerated ? "border-purple-300 dark:border-purple-700" : "",
      h ? "ring-2 ring-purple-300/70 dark:ring-purple-500/50" : ""
    ].filter(Boolean).join(" "), Z = t.jsxs(t.Fragment, {
      children: [
        t.jsxs(_, {
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
                  Q ? t.jsx("span", {
                    className: `rounded-md px-2 py-0.5 text-[10px] font-bold ${Q === "\uC815\uB2F5" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200" : Q === "\uC624\uB2F5" ? "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200" : Q === "\uBD80\uBD84\uC815\uB2F5" ? "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200" : "bg-slate-100 text-slate-700 dark:bg-odp-bgSoft dark:text-odp-muted"}`,
                    children: Q
                  }) : null
                ]
              }),
              e.kind === "subjective" ? e.answerStyle === "essay" ? "[\uC8FC\uAD00\uC2DD] " : "[\uB2E8\uB2F5\uD615] " : "",
              t.jsx("span", {
                className: "font-medium",
                children: t.jsx(De, {
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
          children: (e.options || []).map((B, J) => {
            const ee = J + 1, O = le === ee, j = E, oe = e.answer === ee;
            let me = "border-slate-200 bg-white hover:bg-slate-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft";
            return O && !j && (me = "border-blue-500 bg-blue-50 ring-1 ring-blue-500 dark:bg-blue-950/30"), j && oe ? me = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:bg-emerald-950/30" : j && O && !oe && (me = "border-rose-400 bg-rose-50 dark:bg-rose-950/30"), t.jsxs("button", {
              type: "button",
              className: `flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm ${me}`,
              onClick: () => b(e.id, ee),
              children: [
                t.jsx("span", {
                  className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                  children: ee
                }),
                t.jsx("div", {
                  className: "min-w-0 flex-1",
                  children: t.jsx(De, {
                    text: B,
                    previewId: `qo-${e.id}-${ee}`
                  })
                })
              ]
            }, ee);
          })
        }) : t.jsxs("div", {
          className: "space-y-2",
          children: [
            e.answerStyle === "essay" ? t.jsx("textarea", {
              className: "quiz-body-field min-h-24 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft",
              value: I,
              disabled: E,
              onChange: (B) => q(B.target.value),
              onBlur: F,
              placeholder: "\uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694"
            }) : t.jsx("input", {
              className: "quiz-body-field w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft",
              value: I,
              disabled: E,
              onChange: (B) => q(B.target.value),
              onBlur: F,
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
                  children: t.jsx(De, {
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
            E ? t.jsxs(_, {
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
              examInProgress: m,
              size: "sm",
              disabled: !X,
              onClick: () => z(e),
              className: "!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700",
              children: [
                t.jsx(Ar, {
                  size: 14
                }),
                "\uCC44\uC810"
              ]
            }) : t.jsxs(lr, {
              examInProgress: m,
              size: "sm",
              disabled: f === e.id || !I.trim(),
              onClick: () => {
                F(), S(e, I);
              },
              className: "!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700",
              children: [
                t.jsx(He, {
                  size: 14
                }),
                "AI \uCC44\uC810"
              ]
            }),
            t.jsxs(_, {
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
            e.kind === "choice" ? t.jsxs(_, {
              type: "button",
              variant: "secondary",
              size: "sm",
              disabled: f === `sim-${e.id}`,
              onClick: () => P(e),
              children: [
                t.jsx(It, {
                  size: 14
                }),
                "\uC720\uC0AC\uBB38\uC81C"
              ]
            }) : null,
            t.jsxs(_, {
              type: "button",
              variant: "secondary",
              size: "sm",
              disabled: f === `derived-${e.id}`,
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
          busyKey: f,
          showContent: a,
          onGenerate: (B) => C(e, B)
        }) : null,
        E && e.kind === "choice" ? t.jsx(zl, {
          question: e,
          focusOption: d,
          onFocusOptionChange: (B) => M(e.id, B),
          wrongExps: c,
          busyKey: f,
          onOpenAnalysisDock: (B, J) => L(e.id, B, J)
        }) : null,
        t.jsx(Il, {
          questionId: e.id,
          value: u,
          onSave: (B) => W(e.id, B)
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
      className: $e,
      children: Z
    }) : t.jsx("div", {
      id: `q-card-${e.id}`,
      [cr]: e.id,
      className: $e,
      children: Z
    });
  }
  const Ql = i.memo(Ll);
  function Tl(e, n, s, r, o, a) {
    var _a2;
    const c = s[e.id] !== void 0 && String(s[e.id]).trim() !== "", d = !!(a || r[e.id]);
    if (n === "unanswered" && c) return false;
    if (n !== "wrong") return true;
    let u = false;
    return e.kind === "choice" && d && c && (u = s[e.id] !== e.answer), e.kind === "subjective" && d && (u = ((_a2 = o[e.id]) == null ? void 0 : _a2.verdict) === "wrong"), d && u;
  }
  function _l(e, n) {
    const s = e.getBoundingClientRect(), r = n.getBoundingClientRect();
    return Math.max(0, r.top - s.top + e.scrollTop);
  }
  const Dl = i.memo(i.forwardRef(function({ questions: n, filter: s, scrollRef: r, userAnswers: o, graded: a, subjGrades: c, isSubmitted: d, expVisible: u, wrongExpsByQuestion: f, questionMemos: m, freshQuestionIds: h, busyId: g, examInProgress: x, resolveWrongExpFocusOption: b, onAnswerCommit: k, onSelectOption: z, onEditQuestion: S, onGradeChoice: $, onGradeSubjective: y, onRetry: P, onToggleExplanation: v, onSimilar: C, onDerived: M, onGenerateSections: L, onWrongExpFocusChange: W, onOpenAnalysisDock: D, onMemoSave: I, onClearFresh: q }, F) {
    const X = i.useRef(null), E = i.useRef(null), [T, H] = i.useState(0), Q = i.useMemo(() => n.filter((Z) => Tl(Z, s, o, a, c, d)), [
      s,
      a,
      d,
      n,
      c,
      o
    ]), le = i.useRef(Q);
    le.current = Q, i.useLayoutEffect(() => {
      const Z = r.current, B = E.current;
      if (!Z || !B) return;
      const J = () => {
        const j = _l(Z, B);
        H((oe) => Math.abs(oe - j) > 0.5 ? j : oe);
      };
      J();
      const ee = new ResizeObserver(J), O = Z.firstElementChild;
      return O && ee.observe(O), ee.observe(B), window.addEventListener("resize", J), () => {
        ee.disconnect(), window.removeEventListener("resize", J);
      };
    }, [
      r,
      Q.length
    ]);
    const $e = i.useCallback((Z) => {
      var _a2;
      const B = le.current.findIndex((J) => J.id === Z);
      return B < 0 ? false : ((_a2 = X.current) == null ? void 0 : _a2.scrollToIndex(B, {
        align: "center",
        smooth: true
      }), true);
    }, []);
    return i.useImperativeHandle(F, () => ({
      scrollToQuestionId: $e
    }), [
      $e
    ]), Q.length === 0 ? null : t.jsx("div", {
      ref: E,
      children: t.jsx(fi, {
        ref: X,
        scrollRef: r,
        data: Q,
        bufferSize: 800,
        startMargin: T,
        children: (Z) => {
          const B = o[Z.id], J = !!(d || a[Z.id]);
          return t.jsx("div", {
            className: "quiz-question-card pb-4 pt-4",
            children: t.jsx(Ql, {
              question: Z,
              userAnswer: o[Z.id],
              isSubmitted: d,
              isQuestionGraded: J,
              subjectiveGrade: c[Z.id],
              showExplanation: !!u[Z.id],
              wrongExpsForQuestion: f[Z.id] ?? {},
              wrongExpFocusOption: b(Z, typeof B == "number" ? B : void 0),
              questionMemo: m[Z.id] || "",
              busyId: g,
              examInProgress: x,
              isFresh: !!h[Z.id],
              onClearFresh: () => q(Z.id),
              onAnswerCommit: k,
              onSelectOption: z,
              onEditQuestion: S,
              onGradeChoice: $,
              onGradeSubjective: y,
              onRetry: P,
              onToggleExplanation: v,
              onSimilar: C,
              onDerived: M,
              onGenerateSections: L,
              onWrongExpFocusChange: W,
              onOpenAnalysisDock: D,
              onMemoSave: I
            })
          });
        }
      })
    });
  }));
  function Fl({ disabled: e = false, onGenerate: n }) {
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
        t.jsxs(_, {
          type: "button",
          variant: "secondary",
          size: "sm",
          className: "w-full",
          disabled: e,
          onClick: () => {
            n(s);
          },
          children: [
            t.jsx(He, {
              size: 14
            }),
            "\uADFC\uAC70\uB85C \uBB38\uC81C \uCD94\uAC00"
          ]
        })
      ]
    });
  }
  const ql = i.memo(Fl);
  function Bl(e, n) {
    var _a2;
    if (!(n.isSubmitted || !!n.gradedQuestions[e.id])) return false;
    if (e.kind === "choice") {
      const r = n.userAnswers[e.id];
      return r != null && String(r).trim() !== "" && r !== e.answer;
    }
    return ((_a2 = n.subjectiveGrades[e.id]) == null ? void 0 : _a2.verdict) === "wrong";
  }
  function Ul(e) {
    return e.questions.filter((n) => Bl(n, e));
  }
  function Gl(e) {
    return e.map((n, s) => {
      const r = String(s + 1);
      return {
        ...n,
        id: r,
        displayLabel: r
      };
    });
  }
  function Wl(e, n) {
    const s = Ul({
      questions: e.questions,
      userAnswers: n.userAnswers,
      gradedQuestions: n.gradedQuestions,
      isSubmitted: n.isSubmitted,
      subjectiveGrades: n.subjectiveGrades
    });
    if (!s.length) return null;
    const r = Gl(s), o = is({
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
  function Jl(e) {
    return e.toLowerCase().endsWith(Zn) ? e.slice(0, -Zn.length) : e.replace(/\.md$/i, "");
  }
  function dr(e, n) {
    const s = String(e || "").trim().replace(/\\/g, "/"), r = s.lastIndexOf("/"), o = r >= 0 ? s.slice(0, r + 1) : "", a = Jl(mi(s)), c = n != null && n > 1 ? `-\uD2C0\uB9B0\uBB38\uC81C-${n}` : "-\uD2C0\uB9B0\uBB38\uC81C";
    return `${o}${a}${c}${Zn}`;
  }
  async function Hl(e, n) {
    const s = dr(e);
    if (!await n(s)) return s;
    for (let r = 2; r < 100; r += 1) {
      const o = dr(e, r);
      if (!await n(o)) return o;
    }
    throw new Error("\uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uD034\uC988 \uD30C\uC77C \uC774\uB984\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  }
  function dn(e) {
    return e != null && String(e).trim() !== "";
  }
  function qn(e) {
    const n = {};
    for (const s of e.questions) {
      const r = dn(e.userAnswers[s.id]);
      (e.isSubmitted && s.kind === "choice" ? true : !!e.gradedQuestions[s.id]) ? n[s.id] = true : r && (n[s.id] = false);
    }
    return zt({
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
  function ur(e, n) {
    const s = zt(e ?? Xn), r = zt(n ?? Xn);
    return JSON.stringify(s) === JSON.stringify(r);
  }
  function Vl(e) {
    return e != null && !os(e);
  }
  const Kl = 320, Xr = "s3haim_quiz_source_remove_confirm", Xl = un, Zl = (e) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-violet-400",
    e ? "border-violet-500 bg-violet-500 shadow-sm dark:border-violet-500 dark:bg-violet-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), Yl = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function Zr() {
    try {
      return localStorage.getItem(Xr) === "true";
    } catch {
      return false;
    }
  }
  function ec(e) {
    try {
      localStorage.setItem(Xr, String(e));
    } catch {
    }
  }
  function tc({ open: e, docConfig: n, sourcePathUsage: s, busyGenSources: r, onClose: o, onPreview: a, onRemove: c, onToggleEnabled: d, onOpenPicker: u, onGenerateFromTopic: f, onDropHostChange: m }) {
    const [h, g] = i.useState(Zr), { width: x, handleProps: b, isResizing: k } = At({
      storageKey: "quiz-sources-dock-width",
      defaultWidth: Kl,
      minWidth: 240,
      maxWidth: 520,
      edge: "right"
    }), z = i.useCallback((S) => {
      g(S), ec(S);
    }, []);
    return t.jsx(xn, {
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
          t.jsx(Xl, {
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
                    children: t.jsx(Ve, {
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
                  t.jsx(ua, {
                    id: "quiz-source-remove-confirm",
                    className: Zl(h),
                    checked: h,
                    onCheckedChange: z,
                    "aria-label": "\uADFC\uAC70 \uBB38\uC11C \uC0AD\uC81C \uC2DC \uD655\uC778",
                    children: t.jsx(fa, {
                      className: Yl
                    })
                  })
                ]
              })
            ]
          }),
          t.jsxs("div", {
            ref: m,
            className: "relative min-h-0 flex-1 space-y-4 overflow-y-auto p-3",
            children: [
              t.jsx(qr, {
                layout: "dock",
                paths: n.sourcePaths,
                label: "\uC120\uD0DD\uB41C \uBB38\uC11C",
                onPreview: a,
                onRemove: c,
                isPathEnabled: (S) => pi(n, S),
                onToggleEnabled: d,
                onOpenPicker: u
              }),
              t.jsx(ql, {
                disabled: r,
                onGenerate: f
              })
            ]
          })
        ]
      })
    });
  }
  const nc = i.memo(tc), Bn = "h-full min-h-[240px] w-full resize-none border-0 bg-transparent p-3 font-mono text-xs text-slate-800 outline-none dark:text-odp-fgStrong";
  function sc(e) {
    return xi(e);
  }
  function rc({ payload: e, editMode: n, editContent: s, onEditContentChange: r }) {
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
      children: t.jsx(De, {
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
  const oc = un, St = "z-100001 max-w-[min(92vw,420px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
  function ic({ path: e, onClose: n, loadDocument: s, onOpenDocument: r, onOpenInNewTab: o, embedded: a = false, width: c, resizeHandleProps: d, isResizing: u, resizeEdge: f = "right" }) {
    const [m, h] = i.useState(null), [g, x] = i.useState(true), [b, k] = i.useState(""), [z, S] = i.useState(false), [$, y] = i.useState(""), P = At({
      storageKey: a ? void 0 : "vault-document-preview-panel-width",
      defaultWidth: 400,
      minWidth: 280,
      maxWidth: 640,
      edge: f === "left" ? "left" : "right"
    }), v = c ?? P.width, C = d ?? P.handleProps, M = u ?? P.isResizing;
    i.useEffect(() => {
      let I = false, q;
      return x(true), k(""), S(false), (async () => {
        var _a2;
        try {
          const F = await s(e);
          if (I) {
            (_a2 = F == null ? void 0 : F.revoke) == null ? void 0 : _a2.call(F);
            return;
          }
          q = F == null ? void 0 : F.revoke, h(F), y((F == null ? void 0 : F.content) ?? ""), F || k("\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
        } catch (F) {
          I || (h(null), y(""), k(F instanceof Error ? F.message : "\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."));
        } finally {
          I || x(false);
        }
      })(), () => {
        I = true, q == null ? void 0 : q();
      };
    }, [
      e,
      s
    ]);
    const L = i.useCallback(() => {
      S((I) => !I);
    }, []), W = us(e), D = m ? sc(m.currentFile.viewer) : false;
    return t.jsxs("aside", {
      className: `relative flex h-full flex-col overflow-hidden bg-white dark:bg-odp-surface ${a ? "min-w-0" : "shrink-0 border-r border-slate-200 dark:border-odp-borderSoft"}`,
      style: a ? void 0 : {
        width: v
      },
      "aria-label": "\uBB38\uC11C \uBBF8\uB9AC\uBCF4\uAE30",
      children: [
        t.jsx(oc, {
          edge: f,
          handleProps: C,
          isResizing: M,
          visibleOnHover: true,
          label: "\uBBF8\uB9AC\uBCF4\uAE30 \uD328\uB110 \uB108\uBE44 \uC870\uC808"
        }),
        t.jsx("div", {
          className: "flex items-center gap-1 border-b border-slate-200 px-2 py-2 dark:border-odp-borderSoft",
          children: t.jsxs(Rt, {
            delayDuration: 250,
            skipDelayDuration: 0,
            children: [
              t.jsxs(Re, {
                children: [
                  t.jsx(Me, {
                    asChild: true,
                    children: t.jsx("div", {
                      className: "min-w-0 flex-1 truncate px-1 text-xs font-semibold text-slate-800 dark:text-odp-fgStrong",
                      children: W
                    })
                  }),
                  t.jsx(Ae, {
                    children: t.jsxs(Oe, {
                      side: "bottom",
                      sideOffset: 6,
                      className: St,
                      children: [
                        e,
                        t.jsx(Le, {
                          className: "fill-white dark:fill-odp-surface"
                        })
                      ]
                    })
                  })
                ]
              }),
              D ? t.jsxs(Re, {
                children: [
                  t.jsx(Me, {
                    asChild: true,
                    children: t.jsx("button", {
                      type: "button",
                      className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                      "aria-label": z ? "\uBBF8\uB9AC\uBCF4\uAE30 \uBAA8\uB4DC" : "\uD3B8\uC9D1 \uBAA8\uB4DC",
                      onClick: L,
                      children: z ? t.jsx(ta, {
                        size: 15
                      }) : t.jsx(pn, {
                        size: 15
                      })
                    })
                  }),
                  t.jsx(Ae, {
                    children: t.jsxs(Oe, {
                      side: "bottom",
                      sideOffset: 6,
                      className: St,
                      children: [
                        z ? "\uBBF8\uB9AC\uBCF4\uAE30 \uBAA8\uB4DC" : "\uD3B8\uC9D1 \uBAA8\uB4DC",
                        t.jsx(Le, {
                          className: "fill-white dark:fill-odp-surface"
                        })
                      ]
                    })
                  })
                ]
              }) : null,
              o ? t.jsxs(Re, {
                children: [
                  t.jsx(Me, {
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
                    children: t.jsxs(Oe, {
                      side: "bottom",
                      sideOffset: 6,
                      className: St,
                      children: [
                        "\uC0C8 \uD0ED\uC73C\uB85C \uC5F4\uAE30",
                        t.jsx(Le, {
                          className: "fill-white dark:fill-odp-surface"
                        })
                      ]
                    })
                  })
                ]
              }) : null,
              r ? t.jsxs(Re, {
                children: [
                  t.jsx(Me, {
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
                    children: t.jsxs(Oe, {
                      side: "bottom",
                      sideOffset: 6,
                      className: St,
                      children: [
                        "\uC774 \uBB38\uC11C \uC5F4\uAE30",
                        t.jsx(Le, {
                          className: "fill-white dark:fill-odp-surface"
                        })
                      ]
                    })
                  })
                ]
              }) : null,
              t.jsxs(Re, {
                children: [
                  t.jsx(Me, {
                    asChild: true,
                    children: t.jsx("button", {
                      type: "button",
                      className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                      "aria-label": "\uBBF8\uB9AC\uBCF4\uAE30 \uB2EB\uAE30",
                      onClick: n,
                      children: t.jsx(Ve, {
                        size: 15
                      })
                    })
                  }),
                  t.jsx(Ae, {
                    children: t.jsxs(Oe, {
                      side: "bottom",
                      sideOffset: 6,
                      className: St,
                      children: [
                        "\uB2EB\uAE30",
                        t.jsx(Le, {
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
              t.jsx(mn, {
                size: 16,
                className: "animate-spin",
                "aria-hidden": true
              }),
              "\uBD88\uB7EC\uC624\uB294 \uC911\u2026"
            ]
          }) : b ? t.jsx("div", {
            className: "p-4 text-sm text-rose-600 dark:text-rose-400",
            children: b
          }) : m ? t.jsx(rc, {
            payload: m,
            editMode: z,
            editContent: $,
            onEditContentChange: y
          }) : null
        })
      ]
    });
  }
  const ac = 400;
  function lc({ path: e, onClose: n, loadDocument: s, onOpenDocument: r, onOpenInNewTab: o }) {
    const { width: a, handleProps: c, isResizing: d } = At({
      storageKey: "quiz-source-preview-dock-width",
      defaultWidth: ac,
      minWidth: 280,
      maxWidth: 640,
      edge: "left"
    });
    return t.jsx(xn, {
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
        children: t.jsx(ic, {
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
  const cc = i.memo(lc), fr = {
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
  function dc(e) {
    return e ? typeof e.score == "number" && Number.isFinite(e.score) ? Math.min(100, Math.max(0, e.score)) / 100 : e.verdict === "correct" ? 1 : e.verdict === "partial" ? 0.5 : 0 : null;
  }
  function uc(e) {
    var _a2;
    const { question: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a } = e, c = o || r[n.id], d = dn(s[n.id]);
    if (!c) return d ? "ungraded" : null;
    if (n.kind === "choice") return d ? s[n.id] === n.answer ? "correct" : "wrong" : null;
    const u = (_a2 = a[n.id]) == null ? void 0 : _a2.verdict;
    return u === "correct" ? "correct" : u === "partial" ? "partial" : u === "wrong" ? "wrong" : null;
  }
  function fc(e) {
    const { questions: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a } = e;
    let c = 0, d = 0, u = 0, f = 0, m = 0, h = 0;
    for (const b of n) {
      const k = s[b.id] !== void 0 && s[b.id] !== null && String(s[b.id]).trim() !== "";
      if (k && (f += 1), !(o || r[b.id])) continue;
      if (b.kind === "choice") {
        h += 1, s[b.id] === b.answer ? (c += 1, m += 1) : k && (d += 1);
        continue;
      }
      const S = a[b.id], $ = dc(S);
      $ != null && (h += 1, m += $, (S == null ? void 0 : S.verdict) === "correct" ? c += 1 : (S == null ? void 0 : S.verdict) === "partial" ? u += 1 : d += 1);
    }
    const g = n.length, x = g > 0 && h > 0 ? Math.round(m / g * 100) : null;
    return {
      correct: c,
      wrong: d,
      partial: u,
      answered: f,
      total: g,
      scorePercent: x
    };
  }
  const mc = 288, pc = un, xc = [
    "ungraded",
    "correct",
    "partial",
    "wrong"
  ], hc = {
    ungraded: "bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:text-slate-200 dark:ring-slate-600",
    correct: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800",
    partial: "bg-amber-50 text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800",
    wrong: "bg-rose-50 text-rose-800 ring-1 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-800"
  }, gc = "bg-slate-100 text-slate-400 ring-1 ring-transparent dark:bg-odp-bgSoft dark:text-odp-muted";
  function bc({ open: e, questions: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a, onClose: c, onNavigate: d }) {
    const [u, f] = i.useState({
      ungraded: true,
      correct: true,
      partial: true,
      wrong: true
    }), { width: m, handleProps: h, isResizing: g } = At({
      storageKey: "quiz-toc-dock-width",
      defaultWidth: mc,
      minWidth: 220,
      maxWidth: 480,
      edge: "right"
    }), x = i.useCallback((k) => {
      f((z) => ({
        ...z,
        [k]: !z[k]
      }));
    }, []), b = Dr();
    return t.jsx(xn, {
      motionKey: "quiz-toc-dock",
      open: e,
      width: m,
      isResizing: g,
      "aria-label": "\uBB38\uC81C \uBAA9\uCC28",
      className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface",
      children: t.jsxs("div", {
        className: "relative flex h-full min-h-0 flex-col",
        style: {
          width: m
        },
        children: [
          t.jsx(pc, {
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
                    children: t.jsx(Ve, {
                      size: 16
                    })
                  })
                ]
              }),
              t.jsx("div", {
                className: "flex flex-wrap items-center gap-1 px-3 pb-2.5",
                children: xc.map((k) => {
                  const z = u[k];
                  return t.jsxs("button", {
                    type: "button",
                    "aria-pressed": z,
                    "aria-label": `\uBAA9\uCC28 ${mr[k]} ${z ? "\uD45C\uC2DC" : "\uC228\uAE40"}`,
                    className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors ${z ? hc[k] : gc}`,
                    onClick: () => x(k),
                    children: [
                      t.jsx("span", {
                        className: `h-2 w-2 shrink-0 rounded-full ${z ? fr[k] : "bg-slate-300 dark:bg-slate-600"}`,
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
            children: n.map((k, z) => {
              var _a2, _b;
              const S = !!k.similarOf, $ = /-파생\d+$/u.test(String(k.displayLabel || "")) ? "\uD30C\uC0DD\uBB38\uC81C" : "\uC720\uC0AC\uBB38\uC81C", y = uc({
                question: k,
                userAnswers: s,
                gradedQuestions: r,
                isSubmitted: o,
                subjectiveGrades: a
              });
              if (y && !u[y]) return null;
              const P = t.jsxs("button", {
                type: "button",
                className: `flex w-full items-center gap-2 rounded py-1.5 text-left hover:bg-slate-100 dark:hover:bg-odp-focusBg ${S ? "ml-3 border-l-2 border-violet-300 pl-2.5 text-[11px] text-violet-900 dark:border-violet-600 dark:text-violet-200" : "px-2"}`,
                title: S ? `${((_a2 = k.similarOf) == null ? void 0 : _a2.displayLabel) || ((_b = k.similarOf) == null ? void 0 : _b.id)}\uC758 ${$}` : void 0,
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
                      S ? t.jsx("span", {
                        className: "mr-1 text-violet-400 dark:text-violet-500",
                        children: "\u21B3"
                      }) : null,
                      k.displayLabel,
                      ". ",
                      k.question.slice(0, 40)
                    ]
                  })
                ]
              }), v = Pa(z, b);
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
  const kc = i.memo(bc);
  async function Yr(e, n) {
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
  function eo(e) {
    const n = [], s = /* @__PURE__ */ new Set();
    for (const r of e) {
      const o = String(r || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
      !o || s.has(o) || (s.add(o), n.push(o));
    }
    return n;
  }
  function wc(e) {
    return String(e || "").toLowerCase().split(/[^\p{L}\p{N}]+/u).map((n) => n.trim()).filter((n) => n.length >= 2).slice(0, 16);
  }
  function yc(e, n) {
    if (n.length === 0) return 1;
    const s = e.toLowerCase();
    let r = 0;
    for (const o of n) s.includes(o) && (r += 1);
    return r;
  }
  async function hn(e) {
    const n = Ee(), s = e.topK ?? n.ragTopK, r = e.maxChars ?? n.ragMaxChars, o = eo(e.sourcePaths);
    if (o.length === 0) return {
      chunks: [],
      usedFallback: false
    };
    const a = await Yr(o, e.readText);
    if (a.length === 0) return {
      chunks: [],
      usedFallback: true
    };
    const c = wc(e.query), d = [];
    for (const m of a) hi(m.text, 12e3).forEach((g, x) => {
      g.trim() && d.push({
        path: m.path,
        excerpt: g,
        chunkIndex: x,
        score: yc(g, c)
      });
    });
    d.sort((m, h) => (h.score || 0) - (m.score || 0));
    const u = [];
    let f = 0;
    for (const m of d) {
      if (u.length >= s) break;
      if (f + m.excerpt.length > r) {
        const h = r - f;
        if (h < 200) break;
        u.push({
          ...m,
          excerpt: m.excerpt.slice(0, h)
        });
        break;
      }
      u.push(m), f += m.excerpt.length;
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
  async function vc(e, n, s) {
    const r = Ee(), o = Math.max(4e3, s ?? Math.min(r.ragMaxChars, 2e5)), a = eo(e);
    return a.length ? (await Yr(a, n)).map((d) => ({
      path: d.path,
      text: d.text.length > o ? `${d.text.slice(0, o)}

\u2026(truncated)` : d.text
    })) : [];
  }
  function jc(e) {
    return e.kind === "subjective" ? e.answerStyle === "essay" ? "\uC11C\uC220\uD615 \uC8FC\uAD00\uC2DD" : "\uB2E8\uB2F5\uD615 \uC8FC\uAD00\uC2DD" : `${e.choiceCount}\uC9C0\uC120\uB2E4 \uAC1D\uAD00\uC2DD`;
  }
  function Sc(e) {
    return `${Hr(e)}

[\uD30C\uC0DD\uBB38\uD56D \uC0DD\uC131 \u2014 \uCD94\uAC00 \uADDC\uCE59]
- \uC6D0\uBCF8 \uBB38\uD56D\uC758 \uD559\uC2B5 \uBAA9\uD45C\xB7\uD575\uC2EC \uAC1C\uB150\uC744 \uC720\uC9C0\uD558\uB418, \uC9C0\uC815\uB41C **\uCD9C\uC81C \uC720\uD615**\uC5D0 \uB9DE\uB294 \uC0C8 \uBB38\uD56D\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.
- \uAC1D\uAD00\uC2DD \u2194 \uC8FC\uAD00\uC2DD \uBCC0\uD658\uC774 \uC694\uCCAD\uB418\uBA74, \uB3D9\uC77C \uAC1C\uB150\uC744 \uD574\uB2F9 \uC720\uD615\uC5D0 \uB9DE\uAC8C \uC7AC\uAD6C\uC131\uD558\uC138\uC694.
- \uC0AC\uC6A9\uC790 \uCD94\uAC00 \uC694\uAD6C\uC0AC\uD56D\uC774 \uC788\uC73C\uBA74 \uBC18\uB4DC\uC2DC \uBC18\uC601\uD558\uC138\uC694.`;
  }
  function Cc(e) {
    var _a2;
    const n = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), s = String(e.explanation || "").trim(), r = String(e.target.userPrompt || "").trim(), o = jc(e.target), a = e.sourceKind === "subjective" ? e.sourceAnswerStyle === "essay" ? "\uC11C\uC220\uD615 \uC8FC\uAD00\uC2DD" : "\uB2E8\uB2F5\uD615 \uC8FC\uAD00\uC2DD" : `${e.options.length || e.target.choiceCount}\uC9C0\uC120\uB2E4 \uAC1D\uAD00\uC2DD`, c = e.sourceKind === "choice" && e.options.length > 0 ? `\uBCF4\uAE30: ${e.options.map((f, m) => `${m + 1}. ${f}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88
` : "";
    let d;
    if (e.target.kind === "subjective") d = `{"kind":"subjective","answerStyle":"${e.target.answerStyle === "essay" ? "essay" : "short"}","question":"...","modelAnswer":"...","point":"...","explanation":"..."}`;
    else {
      const f = e.target.choiceCount, m = e.targetAnswer ?? 1;
      d = `{"kind":"choice","question":"...","options":[${Array.from({
        length: f
      }, () => '"..."').join(",")}],"answer":${m},"point":"...","explanation":"..."}`;
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
  function Nc(e, n) {
    const s = String(n || "").trim().replace(/-(?:유사|파생)\d+$/u, "") || "1", r = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), o = new RegExp(`^${r}-\uD30C\uC0DD(\\d+)$`);
    let a = 0;
    for (const c of e) {
      const d = String(c.displayLabel || "").match(o);
      (d == null ? void 0 : d[1]) && (a = Math.max(a, Number.parseInt(d[1], 10)));
    }
    return `${s}-\uD30C\uC0DD${a + 1}`;
  }
  const pr = ".quiz", Ec = 96e3;
  function to(e) {
    return String(e || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
  }
  function $c(e) {
    const s = to(e).replace(/\.quiz\.md$/i, "");
    return s ? `${pr}/${s}` : pr;
  }
  function Pc(e) {
    return String(e || "").trim().replace(/[^a-zA-Z0-9._-]+/g, "_") || "log";
  }
  function zc(e, n) {
    return `${$c(e)}/${Pc(n)}.md`;
  }
  function ae(e, n = Ec) {
    const s = String(e || "");
    return s.length <= n ? s : `${s.slice(0, n)}

\u2026 (${s.length - n} characters truncated)`;
  }
  function Un(e, n) {
    const s = ae(n);
    return s.trim() ? `### ${e}

\`\`\`text
${s.replace(/```/g, "`\u200B``")}
\`\`\`
` : "";
  }
  function Ic(e, n) {
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
  function Rc(e, n) {
    const s = [
      "# Quiz generation log",
      "",
      `- quiz file: ${to(n)}`,
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
      ae(e.questionPreview, 4e3),
      "",
      "---",
      ""
    ];
    return e.steps.forEach((r, o) => {
      s.push(Ic(r, o)), s.push("---", "");
    }), `${s.join(`
`).trimEnd()}
`;
  }
  async function Mc(e) {
    const n = zc(e.quizFilePath, e.logKey), s = Rc(e.job, e.quizFilePath);
    return await e.writeText(n, s), n;
  }
  const Ac = /^\d+\.\s*[a-zA-Z]\.\s*/, Oc = /^(?:\(\s*\d+\s*\)|\d+\)|\d+\.)\s*/, Lc = /^[a-zA-Z](?:\)|\.)\s*/, Qc = /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫]\s*/u, Tc = /^[가나다라마바사아자차카타파하](?:\)|\.)\s*/u;
  function _c(e) {
    let n = String(e || "").trim();
    if (!n) return n;
    for (let s = 0; s < 4; s += 1) {
      const r = n;
      if (n = n.replace(Ac, "").replace(Oc, "").replace(Lc, "").replace(Qc, "").replace(Tc, "").trim(), n === r) break;
    }
    return n;
  }
  const en = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uCD9C\uC81C\uC6A9 \uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uAC00\uC785\uB2C8\uB2E4.
\uC8FC\uC5B4\uC9C4 \uC6D0\uBB38\uC5D0\uC11C \uCD9C\uC81C\uC5D0 \uD544\uC694\uD55C \uAC1C\uB150\xB7\uC815\uC758\xB7\uACF5\uC2DD\xB7\uC808\uCC28\xB7\uC0AC\uB840\uB9CC \uC8FC\uC81C\uBCC4\uB85C \uC815\uB9AC\uD558\uC138\uC694.
- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC0AC\uC2E4\uC744 \uB9CC\uB4E4\uC9C0 \uB9C8\uC138\uC694.
- \uC218\uC2DD\uC740 \uC6D0\uBB38 \uD45C\uAE30\uB97C \uC720\uC9C0\uD558\uC138\uC694 ($...$ / $$...$$).
- \uC751\uB2F5\uC740 \uB9C8\uD06C\uB2E4\uC6B4 \uC694\uC57D\uBB38\uB9CC \uC791\uC131\uD558\uC138\uC694. JSON\xB7\uCF54\uB4DC\uD39C\uC2A4\xB7\uC11C\uB450\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.`;
  function Dc(e, n, s) {
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
  function Fc(e) {
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
  async function qc(e, n) {
    var _a2, _b, _c2;
    const s = Ee(), r = Array.isArray(e) ? e : [], o = lt(r, ((_a2 = n == null ? void 0 : n.profileId) == null ? void 0 : _a2.trim()) || s.profileId || ls());
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
    if (o.kind === Er) {
      const c = $r();
      let d = [];
      try {
        const f = await gi(c);
        if (d = Array.isArray(f.models) ? f.models : [], !f.running && !c.selectedModelId && !a) return {
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
    return o.kind === Yn || o.kind === st ? Pr(o) ? o.kind === st && !(o.apiKey || "").trim() ? {
      ready: false,
      message: "EXAONE API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
    } : a ? o.kind === st && zr(a) ? {
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
      message: o.kind === st ? "EXAONE Endpoint\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC81C\uACF5\uC790\uB97C \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694." : "OpenAI \uD638\uD658 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uB610\uB294 AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\uB97C \uD655\uC778\uD558\uC138\uC694."
    } : a ? ((o.apiKey || "").trim(), {
      ready: true,
      profile: o,
      model: a
    }) : {
      ready: false,
      message: "Gemini \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uACE0\uB978 \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
    };
  }
  function Bc(e) {
    const n = String(e || "");
    return /제공자|프로필|모델을 선택|모델이 로드|모델이 준비|API 키|Endpoint URL|AI 도우미에서/i.test(n);
  }
  function Fe(e) {
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
  function Uc(e) {
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
  function tn(e, n) {
    const s = {
      ...e
    };
    return n.signal && (s.signal = n.signal), n.onChunk && (s.onChunk = n.onChunk), s;
  }
  async function je(e) {
    var _a2, _b, _c2;
    const n = Ee(), s = Array.isArray(e.profiles) ? e.profiles : [], r = lt(s, ((_a2 = e.profileId) == null ? void 0 : _a2.trim()) || n.profileId || ls());
    if (!r) throw new Error("AI \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\xB7\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
    const o = (((_b = e.model) == null ? void 0 : _b.trim()) || ((_c2 = n.modelId) == null ? void 0 : _c2.trim()) || cs(r.id, r.kind)).trim(), a = (e.systemPrompt || n.systemPrompt || "").trim(), c = e.instruction.trim(), d = {
      temperature: typeof e.temperature == "number" ? e.temperature : n.temperature
    }, u = {};
    if (e.signal && (u.signal = e.signal), e.onChunk && (u.onChunk = e.onChunk), r.kind === Yn || r.kind === st) {
      if (r.kind === st && zr(o)) throw new Error("EXAONE Tabular\uB294 \uD034\uC988 \uC0DD\uC131\uC5D0 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. K-EXAONE \uCC44\uD305 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      const f = Pr(r);
      if (!f) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return Nt(r.id, o), bi(o), Qn(r.id, () => r.apiKey || "", (m) => tr(tn({
        baseUrl: f,
        apiKey: m,
        model: o,
        instruction: c,
        systemPrompt: a,
        selectedText: "",
        requestOptions: d
      }, u)), {
        allowEmpty: r.kind === Yn,
        missingKeyMessage: r.kind === st ? "EXAONE API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." : "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
      });
    }
    if (r.kind === Er) {
      const f = $r(), m = await ki(f, e.signal ? {
        signal: e.signal
      } : {}), h = (r.baseUrl || m.baseUrl || "").trim();
      if (!h) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      const g = o.trim() || f.selectedModelId || m.models[0] || "";
      if (!g) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      return Nt(r.id, g), Qn(r.id, () => r.apiKey || f.apiKey || "no-key-required", (x) => tr(tn({
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
      const f = Cr(), m = await Nr(f);
      if (!m.running) throw new Error("MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
      const h = o.trim() || f.selectedModelId || m.models[0] || "";
      if (!h) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      return Nt(r.id, h), ya(tn({
        instruction: c,
        systemPrompt: a,
        selectedText: "",
        requestOptions: d
      }, u));
    }
    if (ka(o)) throw new Error("\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    return Nt(r.id, o), wi(o), Qn(r.id, () => r.apiKey || "", (f) => wa(tn({
      apiKey: f,
      model: o,
      instruction: c,
      systemPrompt: a,
      selectedText: "",
      requestOptions: d
    }, u)), {
      missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
    });
  }
  function Mt(e, n, s) {
    const r = e && typeof e == "object" ? e : {};
    if ((r.kind === "subjective" ? "subjective" : (Array.isArray(r.options), "choice")) === "subjective") return {
      kind: "subjective",
      answerStyle: r.answerStyle === "essay" ? "essay" : "short",
      question: String(r.question || "").trim(),
      modelAnswer: String(r.modelAnswer || r.answer || "").trim(),
      point: String(r.point || "\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694."),
      explanation: String(r.explanation || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.")
    };
    const a = Array.isArray(r.options) ? r.options.map((d) => _c(String(d || ""))).slice(0, n) : [];
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
  function qe(e) {
    return e ? {
      signal: e
    } : void 0;
  }
  function fs(e) {
    var _a2, _b;
    const n = {};
    return e.signal && (n.signal = e.signal), e.onChunk && (n.onChunk = e.onChunk), ((_a2 = e.profileId) == null ? void 0 : _a2.trim()) && (n.profileId = e.profileId.trim()), ((_b = e.model) == null ? void 0 : _b.trim()) && (n.model = e.model.trim()), n.signal || n.onChunk || n.profileId || n.model ? n : void 0;
  }
  async function xr(e) {
    const n = Ee(), s = e.question, o = `\uB2E4\uC74C ${s.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615"} \uC8FC\uAD00\uC2DD \uBB38\uD56D\uC758 \uC218\uD5D8\uC790 \uB2F5\uC548\uC744 \uCC44\uC810\uD558\uC138\uC694.

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
{"verdict":"correct"|"partial"|"wrong","score":0,"feedback":"...","rationale":"..."}`, a = await je(Se(e.profiles, o, "\uB2F9\uC2E0\uC740 \uACF5\uC815\uD55C \uC2DC\uD5D8 \uCC44\uC810\uC704\uC6D0\uC785\uB2C8\uB2E4. JSON\uB9CC \uBC18\uD658\uD558\uC138\uC694.", n.gradeTemperature, qe(e.signal)));
    return Uc(Fe(a));
  }
  async function Gc(e) {
    var _a2;
    const n = e.question, s = n.options || [], r = e.selectedOption, o = r === n.answer, a = ((_a2 = e.userInstructions) == null ? void 0 : _a2.trim()) ? `
[\uC218\uD5D8\uC790 \uCD94\uAC00 \uC9C8\uBB38]
${e.userInstructions.trim()}
\uC704 \uC9C8\uBB38\uC5D0\uB3C4 \uB2F5\uBCC0\uD558\uC138\uC694.` : "", d = `${o ? `\uC218\uD5D8\uC790\uAC00 ${r}\uBC88(\uC815\uB2F5)\uC744 \uACE8\uB790\uC2B5\uB2C8\uB2E4. \uC65C \uC815\uB2F5\uC778\uC9C0, \uB2E4\uB978 \uBCF4\uAE30\uAC00 \uC65C \uD2C0\uB838\uB294\uC9C0 \uC124\uBA85\uD558\uC138\uC694.` : `\uC218\uD5D8\uC790\uAC00 ${r}\uBC88\uC744 \uACE8\uB790\uC2B5\uB2C8\uB2E4. \uC65C \uC624\uB2F5\uC778\uC9C0 \uC124\uBA85\uD558\uC138\uC694.`}

[\uBB38\uC81C] ${n.question}
[\uBCF4\uAE30]
${s.map((u, f) => `${f + 1}. ${u}`).join(`
`)}
[\uC815\uB2F5] ${n.answer}\uBC88
[\uC120\uD0DD\uD55C \uBCF4\uAE30] ${r}\uBC88 (${s[r - 1] || ""})
[\uAE30\uC874 \uD574\uC124] ${n.explanation || ""}
${a}

\uC124\uBA85 \uD14D\uC2A4\uD2B8\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
    return je(Se(e.profiles, d, "\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124 \uC791\uC131\uC790\uC785\uB2C8\uB2E4.", 0.5, fs({
      signal: e.signal,
      onChunk: e.onChunk,
      profileId: e.profileId,
      model: e.model
    })));
  }
  async function Wc(e) {
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
    return je(Se(e.profiles, o, "\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124 \uD29C\uD130\uC785\uB2C8\uB2E4. \uBB38\uC81C\uC640 \uAE30\uC874 \uBD84\uC11D \uB0B4\uC6A9\uB9CC \uADFC\uAC70\uB85C \uB2F5\uD558\uC138\uC694.", 0.5, fs({
      signal: e.signal,
      onChunk: e.onChunk,
      profileId: e.profileId,
      model: e.model
    })));
  }
  async function Jc(e) {
    const n = Ee(), s = e.question, r = _e(s, e.config.choiceCount || 4), o = Math.floor(Math.random() * r) + 1, a = (s.options || []).map((C) => String(C || "")), c = s.answer && s.answer >= 1 ? s.answer : 1, d = (C) => {
      var _a2;
      return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, C);
    };
    let u = "";
    const f = e.sourcePaths || [];
    if (f.length > 0 && e.readText) {
      d({
        step: "rag",
        status: "running",
        detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026"
      });
      const { chunks: C } = await hn({
        sourcePaths: f,
        query: `${s.question}
${s.point || ""}`,
        readText: e.readText
      });
      u = gn(C), d({
        step: "rag",
        status: "done",
        detail: C.length > 0 ? `${C.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C",
        llmInstruction: `query: ${s.question}`,
        llmResponse: ae(u || "(no excerpts)")
      });
    }
    const m = n.calcComplexity === "hand" ? "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5]" : "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uACC4\uC0B0\uAE30 \uD544\uC218]", h = Vr({
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
    const x = await je(Se(e.profiles, h, ct, g, qe(e.signal))), b = Gr(Fe(x));
    d({
      step: "analysis",
      status: "done",
      detail: `${b.coreCategory}${b.isCalculation ? " \xB7 \uACC4\uC0B0\uBB38\uC81C" : ""}`,
      llmInstruction: h,
      llmResponse: ae(x),
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
      const C = Wr(b.variables);
      z = Jr(C);
      const M = C.map((L) => `${L.id}=${L.value}${L.unit ? L.unit : ""}`).join(", ");
      d({
        step: "randomize",
        status: "done",
        detail: M,
        llmInstruction: dt(b),
        llmResponse: ae(JSON.stringify({
          samples: C,
          variables: b.variables
        }, null, 2))
      });
    } else d({
      step: "randomize",
      status: "skipped",
      detail: "\uBE44\uACC4\uC0B0 \uBB38\uD56D",
      llmResponse: ae(dt(b))
    });
    const S = Cl({
      question: s.question,
      options: a,
      answer: c,
      point: s.point || "",
      explanation: s.explanation || "",
      choiceCount: r,
      targetAnswer: o,
      complexity: m,
      analysisBlock: k,
      sampledBlock: z,
      ...u ? {
        ragBlock: u
      } : {}
    }), $ = Hr(n.systemPrompt || Ir);
    d({
      step: "generate",
      status: "running",
      detail: "LLM \uBB38\uD56D \uC791\uC131 \uC911\u2026",
      llmInstruction: S,
      systemPrompt: $
    });
    const y = await je(Se(e.profiles, S, $, n.temperature, qe(e.signal))), P = Fe(y);
    d({
      step: "generate",
      status: "done",
      detail: `\uC815\uB2F5 ${o}\uBC88`,
      llmInstruction: S,
      llmResponse: ae(y),
      systemPrompt: $
    });
    let v = Mt(P, r, o);
    if (!cn(v)) {
      const C = ut(v.point), M = ft(v.explanation), L = Kr({
        question: v.question,
        options: v.options || [],
        answer: v.answer || o,
        analysisBlock: k,
        missingPoint: C,
        missingExplanation: M
      });
      d({
        step: "generate",
        status: "running",
        detail: "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC911\u2026",
        llmInstruction: L,
        systemPrompt: $
      });
      const W = await je(Se(e.profiles, L, $, Math.min(n.temperature, 0.8), qe(e.signal))), D = Fe(W), I = D && typeof D == "object" ? D : {};
      C && typeof I.point == "string" && I.point.trim() && (v = {
        ...v,
        point: String(I.point).trim()
      }), M && typeof I.explanation == "string" && I.explanation.trim() && (v = {
        ...v,
        explanation: String(I.explanation).trim()
      }), d({
        step: "generate",
        status: "done",
        detail: cn(v) ? "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC644\uB8CC" : "\uD574\uC124\xB7\uC811\uADFC Point \uC77C\uBD80 \uBCF4\uC644",
        llmInstruction: L,
        llmResponse: ae(W),
        systemPrompt: $
      });
    }
    return {
      ...v,
      isGenerated: true
    };
  }
  async function Hc(e) {
    const n = Ee(), s = e.question, r = _e(s, e.config.choiceCount || 4), o = e.target.kind === "choice" ? Je(e.target.choiceCount) : r, a = e.target.kind === "choice" ? Math.floor(Math.random() * o) + 1 : 1, c = (s.options || []).map((M) => String(M || "")), d = s.answer && s.answer >= 1 ? s.answer : 1, u = (M) => {
      var _a2;
      return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, M);
    };
    let f = "";
    const m = e.sourcePaths || [];
    if (m.length > 0 && e.readText) {
      u({
        step: "rag",
        status: "running",
        detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026"
      });
      const M = [
        s.question,
        s.point || "",
        e.target.userPrompt || ""
      ].filter(Boolean).join(`
`), { chunks: L } = await hn({
        sourcePaths: m,
        query: M,
        readText: e.readText
      });
      f = gn(L), u({
        step: "rag",
        status: "done",
        detail: L.length > 0 ? `${L.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C",
        llmInstruction: `query: ${M}`,
        llmResponse: ae(f || "(no excerpts)")
      });
    }
    const h = n.calcComplexity === "hand" ? "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5]" : "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uACC4\uC0B0\uAE30 \uD544\uC218]", g = Vr({
      question: s.question,
      options: c,
      answer: s.kind === "choice" ? d : 1,
      point: s.point || "",
      explanation: s.explanation || "",
      ...f ? {
        ragBlock: f
      } : {}
    }), x = Math.min(n.temperature, 0.6);
    u({
      step: "analysis",
      status: "running",
      detail: "LLM \uBB38\uD56D \uBD84\uC11D \uC911\u2026",
      llmInstruction: g,
      systemPrompt: ct
    });
    const b = await je(Se(e.profiles, g, ct, x, qe(e.signal))), k = Gr(Fe(b));
    u({
      step: "analysis",
      status: "done",
      detail: `${k.coreCategory}${k.isCalculation ? " \xB7 \uACC4\uC0B0\uBB38\uC81C" : ""}`,
      llmInstruction: g,
      llmResponse: ae(b),
      systemPrompt: ct
    });
    const z = dt(k);
    let S = "";
    if (k.isCalculation && k.variables.length > 0) {
      u({
        step: "randomize",
        status: "running",
        detail: "\uC218\uCE58 \uBCC0\uC218 \uC0D8\uD50C\uB9C1\u2026"
      });
      const M = Wr(k.variables);
      S = Jr(M);
      const L = M.map((W) => `${W.id}=${W.value}${W.unit ? W.unit : ""}`).join(", ");
      u({
        step: "randomize",
        status: "done",
        detail: L,
        llmInstruction: dt(k),
        llmResponse: ae(JSON.stringify({
          samples: M,
          variables: k.variables
        }, null, 2))
      });
    } else u({
      step: "randomize",
      status: "skipped",
      detail: "\uBE44\uACC4\uC0B0 \uBB38\uD56D",
      llmResponse: ae(dt(k))
    });
    const $ = Cc({
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
      sampledBlock: S,
      ...e.target.kind === "choice" ? {
        targetAnswer: a
      } : {},
      ...f ? {
        ragBlock: f
      } : {}
    }), y = Sc(n.systemPrompt || Ir);
    u({
      step: "generate",
      status: "running",
      detail: "\uD30C\uC0DD \uBB38\uD56D \uC791\uC131 \uC911\u2026",
      llmInstruction: $,
      systemPrompt: y
    });
    const P = await je(Se(e.profiles, $, y, n.temperature, qe(e.signal))), v = Fe(P);
    u({
      step: "generate",
      status: "done",
      detail: e.target.kind === "choice" ? `\uC815\uB2F5 ${a}\uBC88 \xB7 ${o}\uC9C0\uC120\uB2E4` : e.target.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615",
      llmInstruction: $,
      llmResponse: ae(P),
      systemPrompt: y
    });
    let C = Mt(v, o, a);
    if (e.target.kind === "subjective" ? C = {
      kind: "subjective",
      answerStyle: e.target.answerStyle === "essay" ? "essay" : "short",
      question: C.question,
      modelAnswer: C.modelAnswer || "",
      point: C.point,
      explanation: C.explanation,
      isGenerated: true
    } : C = {
      kind: "choice",
      question: C.question,
      options: et(C.options || [], o),
      answer: Math.min(o, Math.max(1, C.answer || a)),
      point: C.point,
      explanation: C.explanation,
      isGenerated: true
    }, !cn(C)) {
      const M = ut(C.point), L = ft(C.explanation), W = Kr({
        question: C.question,
        options: C.kind === "choice" ? C.options || [] : [],
        answer: C.kind === "choice" && C.answer ? C.answer : a,
        analysisBlock: z,
        missingPoint: M,
        missingExplanation: L
      });
      u({
        step: "generate",
        status: "running",
        detail: "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC911\u2026",
        llmInstruction: W,
        systemPrompt: y
      });
      const D = await je(Se(e.profiles, W, y, Math.min(n.temperature, 0.8), qe(e.signal))), I = Fe(D), q = I && typeof I == "object" ? I : {};
      M && typeof q.point == "string" && q.point.trim() && (C = {
        ...C,
        point: String(q.point).trim()
      }), L && typeof q.explanation == "string" && q.explanation.trim() && (C = {
        ...C,
        explanation: String(q.explanation).trim()
      }), u({
        step: "generate",
        status: "done",
        detail: cn(C) ? "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC644\uB8CC" : "\uD574\uC124\xB7\uC811\uADFC Point \uC77C\uBD80 \uBCF4\uC644",
        llmInstruction: W,
        llmResponse: ae(D),
        systemPrompt: y
      });
    }
    return {
      ...C,
      isGenerated: true
    };
  }
  const Vc = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124\xB7\uC811\uADFC Point \uC791\uC131\uC790\uC785\uB2C8\uB2E4.
\uC8FC\uC5B4\uC9C4 \uBB38\uD56D\uB9CC \uADFC\uAC70\uB85C \uC811\uADFC Point\uC640 \uD574\uC124\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.
- \uC811\uADFC Point: \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C. \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC.
- \uD574\uC124: \uC815\uB2F5 \uADFC\uAC70\xB7\uD568\uC815\xB7\uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124. \uB9C8\uD06C\uB2E4\uC6B4 \uC0AC\uC6A9 \uAC00\uB2A5.
- placeholder \uBB38\uAD6C\uB098 \uBE48 \uBB38\uC790\uC5F4\uB85C \uCC44\uC6B0\uC9C0 \uB9C8\uC138\uC694.
\uC751\uB2F5\uC740 \uC694\uCCAD\uB41C JSON\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
  async function Kc(e) {
    var _a2;
    const n = Ee(), s = e.question;
    if (!e.missingPoint && !e.missingExplanation) return {};
    let r = "";
    const o = e.sourcePaths || [];
    if (o.length > 0 && e.readText) {
      const m = [
        s.question,
        s.point || "",
        s.explanation || ""
      ].filter(Boolean).join(`
`), { chunks: h } = await hn({
        sourcePaths: o,
        query: m,
        readText: e.readText
      });
      r = gn(h);
    }
    const a = Nl({
      question: s,
      missingPoint: e.missingPoint,
      missingExplanation: e.missingExplanation,
      ...r ? {
        ragBlock: r
      } : {}
    }), c = await je(Se(e.profiles, a, ((_a2 = n.systemPrompt) == null ? void 0 : _a2.trim()) || Vc, Math.min(n.temperature, 0.8), fs({
      signal: e.signal,
      profileId: e.profileId,
      model: e.model
    }))), d = Fe(c), u = d && typeof d == "object" && !Array.isArray(d) ? d : {}, f = {};
    return e.missingPoint && typeof u.point == "string" && u.point.trim() && !ut(u.point) && (f.point = String(u.point).trim()), e.missingExplanation && typeof u.explanation == "string" && u.explanation.trim() && !ft(u.explanation) && (f.explanation = String(u.explanation).trim()), f;
  }
  async function Xc(e) {
    var _a2, _b, _c2, _d;
    const n = Ee(), s = Array.isArray(e.exampleQuestions) ? e.exampleQuestions : [], r = [
      ...s
    ].reverse().find((y) => y.kind === "choice"), o = r ? _e(r, e.config.choiceCount || 4) : e.config.choiceCount || 4, a = Math.min(5, Math.max(1, e.count || 1)), c = e.kind || "choice", d = (e.topic || "").trim(), u = (y) => {
      var _a3;
      return (_a3 = e.onStep) == null ? void 0 : _a3.call(e, y);
    };
    u({
      step: "load_sources",
      status: "running",
      detail: "\uBB38\uC11C \uC77D\uAE30 \uC911\u2026"
    }), (_a2 = e.onProgress) == null ? void 0 : _a2.call(e, "\uADFC\uAC70 \uBB38\uC11C \uB85C\uB4DC \uC911\u2026");
    const f = await vc(e.sourcePaths, e.readText, n.ragMaxChars);
    if (!f.length) throw u({
      step: "load_sources",
      status: "error",
      error: "\uADFC\uAC70 \uBB38\uC11C\uC5D0\uC11C \uB0B4\uC6A9\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."
    }), new Error("\uADFC\uAC70 \uBB38\uC11C\uC5D0\uC11C \uB0B4\uC6A9\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    u({
      step: "load_sources",
      status: "done",
      detail: `${f.length}\uAC1C \uBB38\uC11C`,
      llmResponse: ae(f.map((y) => `- ${y.path} (${y.text.length.toLocaleString()} chars)`).join(`
`))
    });
    const m = Fc(s), h = [];
    let g = "";
    for (let y = 0; y < f.length; y += 1) {
      const P = f[y];
      if (!P) continue;
      if ((_b = e.signal) == null ? void 0 : _b.aborted) throw new DOMException("Aborted", "AbortError");
      const v = `\uBB38\uC11C \uC694\uC57D ${y + 1}/${f.length}: ${P.path}`, C = `[\uCD9C\uC81C \uCC38\uACE0 \uBB38\uD56D \uC608\uC2DC]
\uC81C\uC2DC\uB41C \uBB38\uD56D \uC2A4\uD0C0\uC77C\xB7\uAC1C\uB150 \uBC94\uC704\uB97C \uCC38\uACE0\uD574, \uC544\uB798 \uC6D0\uBB38\uC5D0\uC11C \uCD9C\uC81C\uC5D0 \uD544\uC694\uD55C \uC815\uBCF4\uB9CC \uC8FC\uC81C\uBCC4\uB85C \uC0C1\uC138 \uC694\uC57D\uD558\uC138\uC694.

${m}

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
        llmInstruction: C,
        systemPrompt: en,
        ...g ? {
          llmResponse: g
        } : {}
      }), (_c2 = e.onProgress) == null ? void 0 : _c2.call(e, v);
      const M = await je(Se(e.profiles, C, en, Math.min(n.temperature, 0.7), qe(e.signal))), L = String(M || "").trim();
      L && (h.push({
        path: P.path,
        summary: L
      }), g += `### ${P.path}

${ae(L, 24e3)}

---

`, u({
        step: "summarize",
        status: "running",
        detail: v,
        llmInstruction: C,
        systemPrompt: en,
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
      llmResponse: ae(g),
      systemPrompt: en
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
${m}

JSON \uBC30\uC5F4\uB9CC \uBC18\uD658\uD558\uC138\uC694.`, k = Dc(c, o, a);
    u({
      step: "generate",
      status: "running",
      detail: "LLM \uBB38\uD56D \uC791\uC131 \uC911\u2026",
      llmInstruction: b,
      systemPrompt: k
    });
    const z = await je(Se(e.profiles, b, k, n.temperature, qe(e.signal))), S = Fe(z), $ = Array.isArray(S) ? S : [
      S
    ];
    return u({
      step: "generate",
      status: "done",
      detail: `${Math.min($.length, a)}\uAC1C \uBB38\uD56D`,
      llmInstruction: b,
      llmResponse: ae(z),
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
          ...Mt(v, o, P % o + 1),
          isGenerated: true
        };
      }
      return {
        ...Mt(y, o, P % o + 1),
        isGenerated: true
      };
    });
  }
  const Zc = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uBB38\uD56D \uD3B8\uC9D1\uC790\uC785\uB2C8\uB2E4. \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB294 \uBB38\uD56D\uC744 \uAD50\uC815\xB7\uC7AC\uC791\uC131\uD569\uB2C8\uB2E4.
- \uC0AC\uC2E4 \uAD00\uACC4\uB97C \uBC14\uB85C\uC7A1\uACE0, \uC9C0\uBB38\xB7\uC120\uD0DD\uC9C0\xB7\uC815\uB2F5\xB7\uD574\uC124\uC774 \uC2DC\uD5D8\uC5D0 \uC4F8 \uC218 \uC788\uC744 \uB9CC\uD07C \uC644\uACB0\uB418\uAC8C \uB9CC\uB4DC\uC138\uC694.
- \uC0AC\uC6A9\uC790\uAC00 \uBC29\uD5A5\uC744 \uC81C\uC2DC\uD558\uBA74 \uADF8\uC5D0 \uB9DE\uAC8C \uC8FC\uC81C\xB7\uB09C\uC774\uB3C4\xB7\uD615\uC2DD\uC744 \uC870\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.
- \uADFC\uAC70 \uBC1C\uCDCC\uAC00 \uC788\uC73C\uBA74 \uADF8 \uBC94\uC704 \uC548\uC5D0\uC11C\uB9CC \uC0AC\uC2E4\uC744 \uC0AC\uC6A9\uD558\uC138\uC694. \uC5C6\uB294 \uB0B4\uC6A9\uC744 \uC9C0\uC5B4\uB0B4\uC9C0 \uB9C8\uC138\uC694.
- \uAC1D\uAD00\uC2DD \uC120\uD0DD\uC9C0 \uC548\uC5D0\uC11C\uB294 \uC778\uB77C\uC778 \uC218\uC2DD($...$)\uB9CC \uC0AC\uC6A9\uD558\uC138\uC694.
- \uC751\uB2F5\uC740 JSON \uAC1D\uCCB4 \uD558\uB098\uB9CC \uBC18\uD658\uD558\uC138\uC694. \uB2E4\uB978 \uD14D\uC2A4\uD2B8\xB7\uB9C8\uD06C\uB2E4\uC6B4\xB7\uCF54\uB4DC\uD39C\uC2A4\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.`;
  function Yc(e, n) {
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
  function ed(e) {
    const n = e.config.choiceCount || 4, s = e.question, r = String(e.userInstructions || "").trim(), o = s.kind === "subjective" ? `\uC8FC\uAD00\uC2DD(${s.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615"})\uC744 \uC720\uC9C0\uD558\uC138\uC694. \uC0AC\uC6A9\uC790\uAC00 \uC720\uD615 \uBCC0\uACBD\uC744 \uBA85\uC2DC\uD558\uC9C0 \uC54A\uC558\uB2E4\uBA74 \uAC1D\uAD00\uC2DD\uC73C\uB85C \uBC14\uAFB8\uC9C0 \uB9C8\uC138\uC694.` : `\uAC1D\uAD00\uC2DD ${n}\uC9C0\uC120\uB2E4\uB97C \uC720\uC9C0\uD558\uC138\uC694. options \uAE38\uC774\uB294 \uC815\uD655\uD788 ${n}, answer\uB294 1~${n} \uC815\uC218\uC785\uB2C8\uB2E4.`, a = s.kind === "subjective" ? '{"kind":"subjective","answerStyle":"short"|"essay","question":"...","modelAnswer":"...","point":"...","explanation":"..."}' : `{"kind":"choice","question":"...","options":[${Array.from({
      length: n
    }, () => '"..."').join(",")}],"answer":1,"point":"...","explanation":"..."}`;
    return `\uB2E4\uC74C \uBB38\uD56D\uC740 \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB2E4\uACE0 \uAC04\uC8FC\uB429\uB2C8\uB2E4. \uAD50\uC815\uB41C \uC644\uC131 \uBB38\uD56D\uC744 JSON\uC73C\uB85C \uBC18\uD658\uD558\uC138\uC694.

${Yc(s, n)}

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
  async function td(e) {
    const n = Ee(), s = e.question, r = _e(s, e.config.choiceCount || 4), o = (g) => {
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
    const u = ed({
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
    const f = await je(Se(e.profiles, u, Zc, n.temperature, qe(e.signal))), m = Fe(f), h = m && typeof m == "object" && !Array.isArray(m) ? m : Array.isArray(m) && m[0] ? m[0] : m;
    return o({
      step: "generate",
      status: "done",
      detail: "\uAD50\uC815 \uC644\uB8CC"
    }), Mt(h, r, a);
  }
  function nd(e) {
    const n = Array.from({
      length: e
    }, (s, r) => r);
    for (let s = n.length - 1; s > 0; s -= 1) {
      const r = Math.floor(Math.random() * (s + 1)), o = n[s];
      n[s] = n[r], n[r] = o;
    }
    return n;
  }
  function sd(e) {
    const n = /* @__PURE__ */ new Map();
    for (let s = 0; s < e.length; s += 1) {
      const r = e[s];
      n.set(r + 1, s + 1);
    }
    return n;
  }
  function rd(e, n) {
    if (e.kind !== "choice") return null;
    const s = e.options || [];
    if (s.length < 2) return null;
    const r = n ?? nd(s.length);
    if (r.length !== s.length) return null;
    const o = r.map((f) => s[f] ?? ""), a = Math.max(0, (e.answer ?? 1) - 1), c = r.indexOf(a), d = c >= 0 ? c + 1 : e.answer, u = sd(r);
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
  function od(e, n) {
    if (typeof e != "number" || !Number.isFinite(e)) return e;
    const s = Math.round(e);
    return n.get(s) ?? e;
  }
  function id(e, n) {
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
      const f = u.get(d);
      f != null && (s[Ye(c, f)] = o);
    }
    return s;
  }
  function ad(e, n) {
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
  function ld(e) {
    const n = /* @__PURE__ */ new Map();
    let s = 0;
    const r = e.questions.map((u) => {
      var _a2;
      const f = rd(u, (_a2 = e.permutationByQuestionId) == null ? void 0 : _a2.get(u.id));
      return f ? (n.set(u.id, f.oldToNew), s += 1, f.question) : u;
    }), o = {
      ...e.userAnswers
    };
    for (const u of e.questions) {
      if (u.kind !== "choice") continue;
      const f = n.get(u.id);
      if (!f) continue;
      const m = od(o[u.id], f);
      m !== void 0 && (o[u.id] = m);
    }
    const a = id(e.wrongExps, n), c = ad(e.wrongExpFocus, n), d = es(a);
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
  function cd(e, n, s) {
    const r = s.get(e);
    return r ? r.get(n) ?? null : n;
  }
  function hr(e, n, s) {
    const r = lt(e, n);
    if (!r) return "";
    const o = String(s || "").trim();
    if (o) return o;
    const a = cs(r.id, r.kind).trim();
    return a || vi(r.kind);
  }
  function dd(e) {
    const [n, s] = i.useState(""), [r, o] = i.useState(""), a = i.useCallback(() => {
      var _a2;
      const f = Ee(), h = ((_a2 = lt(e, f.profileId || ls())) == null ? void 0 : _a2.id) ?? "";
      s(h), o(hr(e, h, f.modelId));
    }, [
      e
    ]);
    i.useEffect(() => {
      a();
      const f = () => a();
      return window.addEventListener(an, f), () => window.removeEventListener(an, f);
    }, [
      a
    ]);
    const c = i.useCallback((f) => {
      const m = f.trim();
      s(m), yi(m);
      const h = lt(e, m), g = h ? hr(e, h.id, null) : "";
      o(g), Vs({
        profileId: m || null,
        modelId: g || null
      });
    }, [
      e
    ]), d = i.useCallback((f) => {
      const m = f.trim();
      o(m), Vs({
        modelId: m || null
      });
      const h = lt(e, n);
      h && Nt(h.id, m);
    }, [
      e,
      n
    ]), u = i.useMemo(() => {
      const f = {}, m = n.trim(), h = r.trim();
      return m && (f.profileId = m), h && (f.model = h), f;
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
  const ud = 0.12;
  function gr(e, n, s, r = 0) {
    const [o, a] = i.useState(true), c = i.useRef(true);
    return i.useEffect(() => {
      if (!s) {
        c.current = true, a(true);
        return;
      }
      let d = 0, u = null;
      const f = (x) => {
        c.current !== x && (c.current = x, a(x));
      }, m = () => {
        u == null ? void 0 : u.disconnect();
        const x = e.current, b = n.current;
        !x || !b || (u = new IntersectionObserver(([k]) => {
          k && (cancelAnimationFrame(d), d = requestAnimationFrame(() => {
            f(k.isIntersecting);
          }));
        }, {
          root: x,
          threshold: ud
        }), u.observe(b));
      };
      m();
      const h = e.current, g = typeof ResizeObserver < "u" && h != null ? new ResizeObserver(() => {
        m();
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
  function fd(e) {
    return no(e).map((n) => n.id === "generate" ? {
      ...n,
      label: "\uD30C\uC0DD \uBB38\uD56D \uC0DD\uC131"
    } : n);
  }
  function no(e) {
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
  function md() {
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
  function nn(e, n = 72) {
    const s = String(e || "").replace(/\s+/g, " ").trim();
    return s.length <= n ? s : `${s.slice(0, n - 1)}\u2026`;
  }
  const so = "s3haim_quiz_gen_queue_panel_size", pd = 280, xd = 180, Gn = 380, Wn = 320;
  function ro(e) {
    const n = Math.min(window.innerWidth * 0.92, 720), s = Math.min(window.innerHeight * 0.72, 640);
    return {
      width: Math.min(n, Math.max(pd, Math.round(e.width))),
      height: Math.min(s, Math.max(xd, Math.round(e.height)))
    };
  }
  function hd() {
    try {
      const e = typeof window < "u" ? window.localStorage.getItem(so) : null;
      if (!e) return {
        width: Gn,
        height: Wn
      };
      const n = JSON.parse(e);
      return ro({
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
  function gd(e) {
    try {
      typeof window < "u" && window.localStorage.setItem(so, JSON.stringify(e));
    } catch {
    }
  }
  function bd(e, n) {
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
  function kd() {
    const [e, n] = i.useState([]), s = i.useRef(e);
    s.current = e;
    const [r, o] = i.useState(false), [a, c] = i.useState(() => hd()), d = i.useRef(false), u = i.useRef(false), f = i.useRef(false), m = i.useRef(0), h = i.useCallback((E) => {
      const T = ro(E);
      c(T), gd(T);
    }, []), g = i.useCallback(() => {
      d.current = true;
    }, []), x = i.useCallback((E) => {
      u.current = E;
    }, []), b = i.useCallback((E) => {
      f.current = E;
    }, []), k = i.useCallback(() => u.current || f.current, []), z = i.useCallback(() => {
      d.current = true, o(true);
    }, []), S = i.useCallback(() => {
      d.current = false, u.current = false, f.current = false, o(false);
    }, []), $ = i.useCallback(() => {
      o(true);
    }, []), y = i.useCallback((E) => s.current.find((T) => T.id === E) ?? null, []), P = i.useCallback((E) => {
      const T = Jn(), H = {
        id: T,
        kind: "similar",
        questionLabel: E.displayLabel,
        questionPreview: nn(E.preview),
        status: "running",
        steps: no(E.hasRag),
        createdAt: Date.now()
      };
      return n((Q) => [
        H,
        ...Q
      ]), $(), T;
    }, [
      $
    ]), v = i.useCallback((E) => {
      const T = Jn(), H = {
        id: T,
        kind: "derived",
        questionLabel: E.displayLabel,
        questionPreview: nn(E.preview),
        status: "running",
        steps: fd(E.hasRag),
        createdAt: Date.now()
      };
      return n((Q) => [
        H,
        ...Q
      ]), $(), T;
    }, [
      $
    ]), C = i.useCallback((E) => {
      var _a2;
      const T = Jn(), H = ((_a2 = E.topic) == null ? void 0 : _a2.trim()) || nn(E.preview) || "\uADFC\uAC70 \uAE30\uBC18 \uCD9C\uC81C", Q = {
        id: T,
        kind: "source",
        questionPreview: nn(H),
        status: "running",
        steps: md(),
        createdAt: Date.now()
      };
      return n((le) => [
        Q,
        ...le
      ]), $(), T;
    }, [
      $
    ]), M = i.useCallback((E, T) => {
      n((H) => H.map((Q) => Q.id === E ? bd(Q, T) : Q));
    }, []), L = i.useCallback((E, T) => {
      n((H) => H.map((Q) => Q.id === E ? {
        ...Q,
        logPath: T
      } : Q));
    }, []), W = i.useCallback((E, T) => {
      n((H) => H.map((Q) => Q.id === E ? {
        ...Q,
        resultQuestionId: T
      } : Q));
    }, []), D = i.useCallback((E, T) => {
      n((H) => H.map((Q) => Q.id === E ? {
        ...Q,
        status: "done",
        ...T ? {
          resultLabel: T
        } : {}
      } : Q));
    }, []), I = i.useCallback((E, T) => {
      n((H) => H.map((Q) => Q.id === E ? {
        ...Q,
        status: "error",
        error: T
      } : Q));
    }, []), q = i.useCallback((E) => {
      n((T) => T.filter((H) => H.id !== E));
    }, []), F = i.useCallback(() => {
      n((E) => E.filter((T) => T.status === "running"));
    }, []), X = e.some((E) => E.status === "running");
    return i.useEffect(() => {
      const E = e.filter((Q) => Q.status === "running").length, T = m.current > 0;
      if (m.current = E, !r || !T || E > 0 || d.current || k()) return;
      const H = window.requestAnimationFrame(() => {
        d.current || k() || S();
      });
      return () => window.cancelAnimationFrame(H);
    }, [
      S,
      k,
      e,
      r
    ]), {
      jobs: e,
      panelOpen: r,
      panelSize: a,
      setPanelSize: h,
      openPanel: z,
      closePanel: S,
      setPanelOpen: o,
      markPanelUserEngaged: g,
      markPanelPointerEngaged: x,
      markPanelFocusEngaged: b,
      getJob: y,
      createSimilarJob: P,
      createDerivedJob: v,
      createSourceJob: C,
      updateJobStep: M,
      setJobLogPath: L,
      setJobResultQuestionId: W,
      completeJob: D,
      failJob: I,
      removeJob: q,
      clearFinishedJobs: F,
      hasActiveJobs: X
    };
  }
  function Hn(e, n, s) {
    return !e || s == null ? n : n + Math.max(0, Date.now() - s);
  }
  function wd({ initialLog: e, hydrateKey: n = 0, onLogChange: s }) {
    const [r, o] = i.useState(() => ts(e ?? $t())), [a, c] = i.useState(0), d = i.useRef(null), u = i.useRef(s), f = i.useRef(e);
    u.current = s, f.current = e;
    const m = yt(r), h = r.events.length > 0, g = ji(r), x = vt(r);
    i.useEffect(() => {
      const y = ts(f.current ?? $t());
      o(y), yt(y) ? d.current = Date.now() : d.current = null;
    }, [
      n
    ]), i.useEffect(() => {
      if (!m) return;
      const y = window.setInterval(() => c((P) => P + 1), 200);
      return () => window.clearInterval(y);
    }, [
      m
    ]);
    const b = i.useMemo(() => Hn(m, x, d.current), [
      m,
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
        if (!yt(y)) return y;
        const P = Hn(true, vt(y), d.current);
        d.current = null;
        const v = Et(y, "pause", P);
        return (_a2 = u.current) == null ? void 0 : _a2.call(u, v), v;
      });
    }, []), S = i.useCallback(() => {
      o((y) => {
        var _a2;
        if (yt(y)) return y;
        const P = vt(y);
        d.current = Date.now();
        const v = Et(y, "resume", P);
        return (_a2 = u.current) == null ? void 0 : _a2.call(u, v), v;
      });
    }, []), $ = i.useCallback(() => {
      o((y) => {
        var _a2;
        const P = yt(y) ? Hn(true, vt(y), d.current) : vt(y);
        d.current = null;
        const v = Et(y, "stop", P);
        return (_a2 = u.current) == null ? void 0 : _a2.call(u, v), v;
      });
    }, []);
    return {
      log: r,
      displayMs: b,
      running: m,
      started: h,
      examInProgress: g,
      start: k,
      pause: z,
      resume: S,
      stop: $
    };
  }
  function yd(e) {
    const n = e.lastIndexOf(".");
    return n >= 0 ? e.slice(n + 1).toLowerCase() : "";
  }
  function Ct(e) {
    if (e) try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }
  async function vd({ backend: e, storageType: n, path: s }) {
    var _a2, _b;
    if (!e || !s) return null;
    const r = us(s), o = yd(r), a = [
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
          Ct(g);
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
        revoke: () => Ct(g)
      };
    }
    if (o === "pdf" && e.readBytes) {
      const { body: g, contentLength: x } = await e.readBytes(s), b = g instanceof Uint8Array ? g : new Uint8Array(g), k = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength), z = new Blob([
        k
      ], {
        type: "application/pdf"
      }), S = URL.createObjectURL(z);
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: "pdf",
          objectUrl: S,
          size: x ?? null
        },
        content: "",
        revoke: () => Ct(S)
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
    const u = Ni(s, r);
    if (u) {
      const { text: g, contentLength: x, lastModified: b } = await e.readText(s), k = Ks(g, u.viewer);
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
      const { text: g, contentLength: x, lastModified: b } = await e.readText(s), k = Ks(g, "json");
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
        const k = await Ei(s, g);
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
    const { text: f, contentLength: m, lastModified: h } = await e.readText(s);
    return {
      currentFile: {
        type: n,
        id: s,
        name: r,
        viewer: "raw",
        content: f,
        ...m != null ? {
          size: m
        } : {},
        ...h != null ? {
          lastModified: h
        } : {}
      },
      content: f
    };
  }
  const jd = i.lazy(() => wr(() => import("./QuizLlmSessionBar-DcZYsJYp.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]))), Sd = i.lazy(() => wr(() => import("./QuizChoiceAnalysisDock-BLtgEqXQ.js"), __vite__mapDeps([19,1,6,7,8,9,10,11,12,13,14,15,2,3,4,5,16,17,18,20,21,22,23,24,25])));
  function Cd() {
    return t.jsx("section", {
      "aria-label": "\uD034\uC988 AI \uC81C\uACF5\uC790",
      "aria-busy": true,
      className: "h-[7.5rem] animate-pulse rounded-2xl border border-slate-200 bg-slate-100/80 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60"
    });
  }
  const Nd = 2e4, br = "flex h-6 max-h-6 min-w-0 items-center overflow-hidden", Ed = "z-100010 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", kr = "flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-gray-800 outline-none hover:bg-gray-100 focus:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg dark:focus:bg-odp-focusBg";
  function $d({ content: e, onChange: n, onSave: s, currentFile: r, onResolveWikiImageUrl: o, llmProviderProfiles: a = [], isActiveFile: c = true, isSurfaceLive: d = true, registerToolbar: u, registerFileManagement: f }) {
    const { showToast: m } = $i(), { showAlert: h } = Pi(), g = zi(), x = kd(), { storageMode: b, s3Tree: k, localTree: z, webdavTree: S, idbTree: $, localRootHandle: y, getBackendForType: P, loadLocalFolderChildren: v, loadWebdavFolderChildren: C, loadIdbFolderChildren: M } = Ii(), { openAdvancedSearchFile: L, selectFileRaw: W } = Ri(), D = i.useCallback((l) => {
      g == null ? void 0 : g.openAssist(), m({
        message: l || "AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\xB7\uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
        durationMs: 3500
      });
    }, [
      g,
      m
    ]), I = dd(a), q = i.useCallback(async (l) => {
      const p = await qc(a, {
        ...I.llmOpts,
        ...l
      });
      return p.ready ? true : (D(p.message), false);
    }, [
      a,
      D,
      I.llmOpts
    ]), F = i.useCallback((l, p, w) => {
      const N = (p instanceof Error ? p.message : "") || w;
      if (Bc(N)) {
        D(N);
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
      m({
        message: N,
        durationMs: 4e3
      });
    }, [
      D,
      h,
      m
    ]), X = i.useMemo(() => b === Tn ? z : b === _n ? S : b === Dn ? $ : k, [
      b,
      z,
      S,
      $,
      k
    ]), E = b === Tn ? "local" : b === _n ? "webdav" : b === Dn ? "idb" : "s3", T = E, H = i.useCallback(async (l) => {
      const p = P(E);
      return vd({
        backend: p,
        storageType: T,
        path: l
      });
    }, [
      P,
      E,
      T
    ]), Q = i.useCallback((l) => {
      L(l);
    }, [
      L
    ]), le = i.useCallback(async (l) => {
      const p = await ia(l, {
        storageType: T,
        localTree: z,
        webdavTree: S,
        idbTree: $,
        s3Tree: k,
        localRootHandle: y
      });
      if (p) {
        await W(E, p, {
          background: true
        });
        return;
      }
      L(l);
    }, [
      T,
      z,
      S,
      $,
      k,
      y,
      W,
      E,
      L
    ]), $e = i.useCallback((l) => {
      pt(true), xt(l);
    }, []), Z = i.useCallback(() => {
      pt(false), xt(null);
    }, []), B = i.useCallback(async (l) => {
      const p = P(E);
      if (!(p == null ? void 0 : p.readText)) return null;
      const { text: w } = await p.readText(l);
      return typeof w == "string" ? w : null;
    }, [
      P,
      E
    ]), J = i.useCallback(async (l, p) => {
      const w = r == null ? void 0 : r.id;
      if (!w) return;
      await new Promise((R) => {
        window.setTimeout(R, 0);
      });
      const N = x.getJob(l);
      if (!N) return;
      const A = P(E);
      if (A == null ? void 0 : A.writeText) try {
        const R = await Mc({
          quizFilePath: w,
          logKey: p,
          job: N,
          writeText: (U, G) => A.writeText(U, G, "text/markdown; charset=utf-8")
        });
        x.setJobLogPath(l, R);
      } catch {
      }
    }, [
      r == null ? void 0 : r.id,
      x,
      P,
      E
    ]), ee = i.useCallback((l, p, w) => {
      x.updateJobStep(l, w), J(l, p);
    }, [
      x,
      J
    ]), O = i.useCallback(async (l) => {
      b === Tn ? await (v == null ? void 0 : v(l)) : b === _n ? await (C == null ? void 0 : C(l)) : b === Dn && await (M == null ? void 0 : M(l));
    }, [
      b,
      v,
      C,
      M
    ]), [j, oe] = i.useState(() => at(e)), me = i.useRef(e), bn = i.useRef(false), Ot = i.useRef(false), Qe = i.useRef(null), ue = i.useRef(j);
    ue.current = j;
    const [re, Ke] = i.useState({}), [ce, Be] = i.useState({}), ms = i.useRef(ce);
    ms.current = ce;
    const [oo, Pe] = i.useState({}), [de, kn] = i.useState({}), [Te, ke] = i.useState({}), tt = i.useRef(Te);
    tt.current = Te;
    const [Lt, rt] = i.useState({}), [we, Ue] = i.useState(null), [fe, nt] = i.useState({}), [pe, Qt] = i.useState(false), [wn, mt] = i.useState("all"), [yn, ps] = i.useState(false), [Tt, pt] = i.useState(false), [io, xt] = i.useState(null), [ao, vn] = i.useState(false), [ht, jn] = i.useState(null), [Xe, xe] = i.useState(null), [xs, _t] = i.useState(false), [he, Dt] = i.useState(null), [ot, Sn] = i.useState(null), [hs, Cn] = i.useState(false), [Ge, Ft] = i.useState(null), [lo, qt] = i.useState({}), Nn = i.useRef(null), En = i.useRef(null), Ce = i.useRef(null), gt = i.useRef(null), gs = i.useRef(null), bs = i.useRef(null), [ye, bt] = i.useState(() => $t()), [co, $n] = i.useState(0), ie = wd({
      initialLog: ye,
      hydrateKey: co,
      onLogChange: bt
    }), ks = i.useRef(() => 0);
    ks.current = () => ie.displayMs;
    const uo = i.useMemo(() => j.questions.map((l) => ({
      id: l.id,
      displayLabel: l.displayLabel
    })), [
      j.questions
    ]);
    Ol({
      scrollRootRef: gt,
      questions: uo,
      running: ie.running,
      getElapsedMs: () => ks.current(),
      timeLog: ye,
      onLogChange: bt
    });
    const Ze = i.useCallback(() => qn({
      questions: ue.current.questions,
      userAnswers: re,
      gradedQuestions: ce,
      subjectiveGrades: fe,
      isSubmitted: pe,
      ...Fn(ye) ? {} : {
        timeLog: ye
      },
      wrongChoiceExplanations: es(Te),
      ...jt(de) ? {} : {
        questionMemos: de
      }
    }), [
      re,
      ce,
      fe,
      pe,
      ye,
      Te,
      de
    ]), Bt = i.useCallback(() => {
      if (!Ot.current || !c) return false;
      const l = Ze();
      if (!Vl(l)) return false;
      const p = at(me.current).session;
      if (!ur(l, p)) return true;
      const w = typeof (r == null ? void 0 : r.content) == "string" ? r.content : "";
      if (!w) return true;
      const N = at(w).session;
      return !ur(l, N);
    }, [
      Ze,
      r == null ? void 0 : r.content,
      c
    ]), Ut = i.useCallback((l) => {
      const p = ts(l == null ? void 0 : l.timeLog);
      if (bt(p), $n((N) => N + 1), !l || os(l)) {
        Ke({}), Be({}), Pe({}), ke({}), rt({}), Ue(null), kn({}), nt({}), Qt(false);
        return;
      }
      Ke({
        ...l.userAnswers
      }), Be({
        ...l.gradedQuestions
      }), nt({
        ...l.subjectiveGrades
      }), Qt(l.isSubmitted), ke(Mi(l.wrongChoiceExplanations)), kn({
        ...l.questionMemos ?? {}
      }), rt({}), Ue(null);
      const w = {};
      for (const [N, A] of Object.entries(l.gradedQuestions)) A && (w[N] = true);
      Pe(w);
    }, []), ge = i.useCallback((l, p) => {
      const w = jr(l.config, l.questions, p);
      bn.current = true, me.current = w, n(w);
    }, [
      n
    ]), Gt = i.useCallback(() => {
      if (!Ot.current) return;
      Qe.current != null && (clearTimeout(Qe.current), Qe.current = null);
      const l = Ze();
      ge(ue.current, l);
    }, [
      Ze,
      ge
    ]), it = i.useCallback(async (l) => {
      if (!(!Ee().autoSaveOnAiGenerate || typeof s != "function")) {
        if (l) {
          const p = qn({
            questions: ue.current.questions,
            userAnswers: re,
            gradedQuestions: ce,
            subjectiveGrades: fe,
            isSubmitted: pe,
            ...Fn(ye) ? {} : {
              timeLog: ye
            },
            wrongChoiceExplanations: es(l),
            ...jt(de) ? {} : {
              questionMemos: de
            }
          });
          ge(ue.current, p);
        } else Gt();
        await s(null, {
          skipCoverChangeCheck: true,
          skipSuffixCheck: true,
          contentOverride: me.current
        });
      }
    }, [
      Gt,
      ce,
      pe,
      s,
      ge,
      fe,
      ye,
      re,
      de
    ]);
    i.useEffect(() => {
      if (e === me.current) return;
      if (me.current = e, bn.current) {
        bn.current = false;
        return;
      }
      const l = at(e);
      oe(l), Ut(l.session);
    }, [
      e,
      Ut
    ]), i.useEffect(() => {
      const l = at(me.current);
      Ut(l.session), Ot.current = true;
    }, [
      Ut
    ]), i.useEffect(() => {
      if (!Ot.current) return;
      const l = Ze();
      return Qe.current != null && clearTimeout(Qe.current), Qe.current = setTimeout(() => {
        Qe.current = null, ge(ue.current, l);
      }, Nd), () => {
        Qe.current != null && (clearTimeout(Qe.current), Qe.current = null);
      };
    }, [
      re,
      ce,
      fe,
      pe,
      ye,
      Te,
      de,
      Ze,
      ge
    ]);
    const ws = i.useCallback(async () => {
      const l = Wl(ue.current, {
        questions: ue.current.questions,
        userAnswers: re,
        gradedQuestions: ce,
        isSubmitted: pe,
        subjectiveGrades: fe
      });
      if (!l) {
        m({
          message: "\uCD94\uCD9C\uD560 \uD2C0\uB9B0 \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uCC44\uC810 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
          durationMs: 3500
        });
        return;
      }
      const p = r == null ? void 0 : r.id;
      if (!p) return;
      const w = P(E);
      if (!(w == null ? void 0 : w.writeText)) {
        m({
          message: "\uC800\uC7A5\uC18C\uC5D0 \uC4F8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
          durationMs: 3e3
        });
        return;
      }
      try {
        const N = await Hl(p, async (A) => {
          if (!w.head) return false;
          try {
            return await w.head(A), true;
          } catch {
            return false;
          }
        });
        await w.writeText(N, l.markdown, "text/markdown; charset=utf-8"), await L(N), m({
          message: `\uD2C0\uB9B0 \uBB38\uC81C ${l.questions.length}\uAC1C\uB97C \uC0C8 \uD034\uC988\uB85C \uCD94\uCD9C\uD588\uC2B5\uB2C8\uB2E4.`,
          durationMs: 4e3
        });
      } catch (N) {
        F("\uD2C0\uB9B0\uBB38\uC81C \uCD94\uCD9C", N, "\uD30C\uC77C\uC744 \uC0DD\uC131\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      re,
      ce,
      pe,
      fe,
      r == null ? void 0 : r.id,
      P,
      E,
      L,
      m,
      F
    ]);
    i.useEffect(() => {
      if (!c || Rr()) return;
      const l = (p) => {
        Bt() && (p.preventDefault(), p.returnValue = "");
      };
      return window.addEventListener("beforeunload", l), () => window.removeEventListener("beforeunload", l);
    }, [
      c,
      Bt
    ]);
    const be = i.useCallback((l) => {
      const p = {
        ...l,
        config: nr(l.config, l.questions)
      };
      ue.current = p, oe(p);
      const w = Ze();
      ge(p, w);
    }, [
      Ze,
      ge
    ]), ys = i.useCallback(() => {
      const l = ue.current, p = ld({
        questions: l.questions,
        userAnswers: re,
        wrongExps: Te,
        wrongExpFocus: Lt
      });
      if (p.shuffledQuestionCount <= 0) {
        m({
          message: "\uC120\uD0DD\uC9C0\uAC00 2\uAC1C \uC774\uC0C1\uC778 \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
          durationMs: 2800
        });
        return;
      }
      Ke(p.userAnswers), ke(p.wrongExps), rt(p.wrongExpFocus), Ue((A) => {
        if (!A) return null;
        const R = cd(A.questionId, A.option, p.optionMapsByQuestionId);
        return R == null ? null : {
          ...A,
          option: R
        };
      });
      const w = {
        ...l,
        questions: p.questions,
        config: nr(l.config, p.questions)
      };
      oe(w);
      const N = qn({
        questions: w.questions,
        userAnswers: p.userAnswers,
        gradedQuestions: ce,
        subjectiveGrades: fe,
        isSubmitted: pe,
        ...Fn(ye) ? {} : {
          timeLog: ye
        },
        wrongChoiceExplanations: p.wrongChoiceExplanations,
        ...jt(de) ? {} : {
          questionMemos: de
        }
      });
      ge(w, N), m({
        message: `${p.shuffledQuestionCount}\uAC1C \uBB38\uD56D\uC758 \uC120\uD0DD\uC9C0 \uC21C\uC11C\uB97C \uBCC0\uACBD\uD588\uC2B5\uB2C8\uB2E4.`,
        durationMs: 3200
      });
    }, [
      re,
      Te,
      Lt,
      ce,
      fe,
      pe,
      ye,
      de,
      ge,
      m
    ]);
    i.useEffect(() => {
      if (!(!c || !d || !f)) return f({
        extractWrongQuestions: ws,
        shuffleChoiceOptions: ys,
        hasUnsavedProgress: Bt,
        flushBeforeSave: Gt
      }), () => f(null);
    }, [
      c,
      d,
      f,
      ws,
      ys,
      Bt,
      Gt
    ]);
    const Pn = i.useCallback((l) => {
      const p = ue.current;
      be({
        ...p,
        config: Ai(p.config, l)
      }), xt((w) => w === l ? null : w);
    }, [
      be
    ]), fo = i.useCallback((l, p) => {
      const w = ue.current;
      be({
        ...w,
        config: Oi(w.config, l, p)
      });
    }, [
      be
    ]), mo = i.useCallback((l) => {
      if (Zr()) {
        jn(l);
        return;
      }
      Pn(l);
    }, [
      Pn
    ]), { setQuizSourceDropActive: zn, setQuizSourceDropHost: Wt, handleRegisterQuizSourceDrop: In } = Li(), vs = i.useRef(null), js = i.useRef(null), Ss = i.useRef(null), Cs = i.useRef(null), Ns = i.useRef(Ge);
    Ns.current = Ge;
    const Jt = i.useCallback(() => {
      const l = vs.current ?? js.current;
      Ss.current !== l && (Ss.current = l, Wt(l));
    }, [
      Wt
    ]), po = i.useCallback((l) => {
      vs.current = l, Jt();
    }, [
      Jt
    ]), xo = i.useCallback((l) => {
      js.current = l, Jt();
    }, [
      Jt
    ]);
    i.useEffect(() => () => Wt(null), [
      Wt
    ]);
    const Es = i.useCallback((l, p) => l !== E ? null : Qi(X, p) || Ti(X, p), [
      E,
      X
    ]), $s = (r == null ? void 0 : r.id) || null, Ps = i.useCallback((l) => {
      var _a2;
      if (!l.length) return;
      const p = Ns.current;
      if (p == null ? void 0 : p.onDone) {
        const A = new Set(p.paths);
        for (const R of l) A.add(R);
        p.onDone([
          ...A
        ].sort((R, U) => R.localeCompare(U))), m({
          message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`,
          durationMs: 2500
        });
        return;
      }
      if (p) {
        (_a2 = Cs.current) == null ? void 0 : _a2.call(Cs, l), m({
          message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`,
          durationMs: 2500
        });
        return;
      }
      const w = ue.current, N = [
        .../* @__PURE__ */ new Set([
          ...w.config.sourcePaths,
          ...l
        ])
      ].sort((A, R) => A.localeCompare(R));
      be({
        ...w,
        config: {
          ...w.config,
          sourcePaths: N
        }
      }), m({
        message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`,
        durationMs: 2500
      });
    }, [
      be,
      m
    ]), zs = i.useCallback((l) => {
      const p = _i(l, Es, {
        excludePath: $s
      });
      p.length && Ps(p);
    }, [
      $s,
      Es,
      Ps
    ]);
    i.useEffect(() => (In(zs), () => In(null)), [
      In,
      zs
    ]), i.useEffect(() => (zn(c && d && (!!Ge || Tt)), () => zn(false)), [
      c,
      d,
      Ge,
      Tt,
      zn
    ]);
    const V = i.useMemo(() => fc({
      questions: j.questions,
      userAnswers: re,
      gradedQuestions: ce,
      isSubmitted: pe,
      subjectiveGrades: fe
    }), [
      j.questions,
      re,
      ce,
      pe,
      fe
    ]), Is = c && d && V.total > 0, ho = gr(gt, gs, Is, j.questions.length), go = gr(gt, bs, Is, j.questions.length), bo = i.useMemo(() => _r(j.questions, j.config.choiceCount), [
      j.questions,
      j.config.choiceCount
    ]), Rs = i.useMemo(() => Di(j.config), [
      j.config.sourcePaths,
      j.config.disabledSourcePaths
    ]), ko = i.useMemo(() => {
      const l = {};
      for (const [p, w] of Object.entries(Te)) {
        const N = p.indexOf("_"), A = N >= 0 ? p.slice(0, N) : p, R = l[A] ?? (l[A] = {});
        R[p] = w;
      }
      return l;
    }, [
      Te
    ]), Ht = i.useMemo(() => we && j.questions.find((l) => l.id === we.questionId) || null, [
      we,
      j.questions
    ]), wo = i.useCallback((l, p, w) => {
      Ue({
        questionId: l,
        option: p,
        mode: w
      });
    }, []), ve = a, Ms = i.useCallback(() => {
      Ke({}), Be({}), Pe({}), ke({}), rt({}), Ue(null), nt({}), Qt(false), bt($t()), $n((l) => l + 1), ge(ue.current, zt({
        ...jt(de) ? {} : {
          questionMemos: de
        }
      }));
    }, [
      ge,
      de
    ]), yo = i.useCallback(() => {
      Ke({}), Be({}), Pe({}), ke({}), rt({}), Ue(null), nt({}), Qt(false);
      const l = Et($t(), "start", 0);
      bt(l), $n((p) => p + 1), ge(ue.current, zt({
        timeLog: l,
        ...jt(de) ? {} : {
          questionMemos: de
        }
      }));
    }, [
      ge,
      de
    ]), As = i.useMemo(() => j.questions.some((l) => dn(re[l.id])), [
      j.questions,
      re
    ]), Os = i.useCallback(() => {
      if (As) {
        vn(true);
        return;
      }
      ie.start();
    }, [
      As,
      ie
    ]);
    i.useEffect(() => {
      if (!(!c || !d || !u)) return u(t.jsx(pl, {
        stopwatch: ie,
        onRequestStart: Os
      })), () => u(null);
    }, [
      c,
      d,
      u,
      ie.displayMs,
      ie.running,
      ie.started,
      ie.start,
      ie.pause,
      ie.resume,
      ie.stop,
      Os
    ]);
    const vo = i.useCallback((l) => {
      Be((p) => {
        const w = {
          ...p
        };
        return delete w[l.id], w;
      }), nt((p) => {
        const w = {
          ...p
        };
        return delete w[l.id], w;
      }), Pe((p) => {
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
    }, []), jo = i.useCallback((l, p) => {
      ms.current[l] || Ke((w) => ({
        ...w,
        [l]: p
      }));
    }, []), So = i.useCallback((l) => {
      ie.examInProgress || (Be((p) => ({
        ...p,
        [l.id]: true
      })), Pe((p) => ({
        ...p,
        [l.id]: true
      })));
    }, [
      ie.examInProgress
    ]), Co = i.useCallback(async (l, p) => {
      var _a2;
      if (ie.examInProgress) return;
      const w = String(p ?? re[l.id] ?? "").trim();
      if (!w) {
        m({
          message: "\uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694.",
          durationMs: 2200
        });
        return;
      }
      if (!await q()) return;
      xe(l.id), (_a2 = Ce.current) == null ? void 0 : _a2.abort();
      const N = new AbortController();
      Ce.current = N;
      try {
        const A = await xr({
          profiles: ve,
          question: l,
          userAnswer: w,
          signal: N.signal
        });
        nt((R) => ({
          ...R,
          [l.id]: A
        })), Be((R) => ({
          ...R,
          [l.id]: true
        })), Pe((R) => ({
          ...R,
          [l.id]: true
        })), p !== void 0 && Ke((R) => ({
          ...R,
          [l.id]: p
        })), m({
          message: "\uC8FC\uAD00\uC2DD \uCC44\uC810 \uC644\uB8CC",
          durationMs: 2200
        });
      } catch (A) {
        F("\uCC44\uC810 \uC2E4\uD328", A, "\uCC44\uC810 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, [
      q,
      ve,
      F,
      m,
      ie.examInProgress,
      re
    ]), No = i.useCallback((l, p) => {
      Ke((w) => w[l] === p ? w : {
        ...w,
        [l]: p
      });
    }, []), Eo = i.useCallback((l) => {
      Dt(l), _t(true);
    }, []), $o = i.useCallback((l) => {
      Pe((p) => ({
        ...p,
        [l]: !p[l]
      }));
    }, []), Po = i.useCallback((l) => {
      Sn(l);
    }, []), zo = i.useCallback((l, p) => {
      rt((w) => ({
        ...w,
        [l]: p
      }));
    }, []), Io = i.useCallback((l, p) => {
      kn((w) => {
        if (!p.trim()) {
          const { [l]: A, ...R } = w;
          return R;
        }
        return {
          ...w,
          [l]: p
        };
      });
    }, []), Ro = i.useCallback((l) => {
      qt((p) => {
        if (!p[l]) return p;
        const w = {
          ...p
        };
        return delete w[l], w;
      });
    }, []), kt = i.useCallback((l) => {
      var _a2;
      ((_a2 = Nn.current) == null ? void 0 : _a2.scrollToQuestionId(l)) || (En.current = l);
    }, []);
    i.useEffect(() => {
      var _a2;
      const l = En.current;
      l && ((_a2 = Nn.current) == null ? void 0 : _a2.scrollToQuestionId(l)) && (En.current = null);
    }, [
      j.questions,
      wn,
      re,
      ce,
      pe,
      fe
    ]);
    const Mo = async () => {
      ie.examInProgress && ie.stop();
      const l = j.questions.filter((N) => !(!dn(re[N.id]) || ce[N.id] || N.kind === "subjective" && fe[N.id]));
      if (l.length === 0) {
        m({
          message: "\uCC44\uC810\uD560 \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.",
          durationMs: 2200
        });
        return;
      }
      const p = l.filter((N) => N.kind === "choice"), w = l.filter((N) => N.kind === "subjective");
      if (p.length > 0 && (Be((N) => {
        const A = {
          ...N
        };
        for (const R of p) A[R.id] = true;
        return A;
      }), Pe((N) => {
        const A = {
          ...N
        };
        for (const R of p) A[R.id] = true;
        return A;
      })), w.length > 0) {
        if (!await q()) return;
        for (const N of w) {
          const A = String(re[N.id] || "").trim();
          if (A) try {
            const R = await xr({
              profiles: ve,
              question: N,
              userAnswer: A
            });
            nt((U) => ({
              ...U,
              [N.id]: R
            })), Be((U) => ({
              ...U,
              [N.id]: true
            })), Pe((U) => ({
              ...U,
              [N.id]: true
            }));
          } catch {
          }
        }
      }
      m({
        message: `${l.length}\uAC1C \uD56D\uBAA9 \uCC44\uC810 \uC644\uB8CC`,
        durationMs: 2200
      });
    }, Ls = async (l) => {
      if (!await q()) return;
      xe(`sim-${l.id}`);
      const p = Xt(j.config, l), w = x.createSimilarJob({
        displayLabel: String(l.displayLabel || l.id),
        preview: l.question,
        hasRag: p.length > 0
      }), N = w;
      try {
        const A = await Jc({
          profiles: ve,
          question: l,
          config: j.config,
          sourcePaths: p,
          readText: B,
          onStep: (Y) => ee(w, N, Y)
        }), R = String(l.displayLabel || l.id).split("-\uC720\uC0AC")[0] || "1";
        let U = 0;
        const G = new RegExp(`^${R.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-\uC720\uC0AC(\\d+)$`);
        for (const Y of j.questions) {
          const ze = String(Y.displayLabel).match(G);
          (ze == null ? void 0 : ze[1]) && (U = Math.max(U, Number.parseInt(ze[1], 10)));
        }
        const te = `${R}-\uC720\uC0AC${U + 1}`, ne = {
          ...A,
          id: `gen-${Date.now()}`,
          displayLabel: te,
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
        }), J(w, ne.id);
        const K = j.questions.findIndex((Y) => Y.id === l.id), se = [
          ...j.questions
        ];
        se.splice(K + 1, 0, ne), mt("all"), qt((Y) => ({
          ...Y,
          [ne.id]: true
        })), be({
          ...j,
          questions: se
        }), x.setJobResultQuestionId(w, ne.id), x.updateJobStep(w, {
          step: "finalize",
          status: "done",
          detail: te,
          llmResponse: JSON.stringify(ne, null, 2)
        }), x.completeJob(w, te), J(w, ne.id), m({
          message: `${te} \uC720\uC0AC\uBB38\uC81C \uCD94\uAC00`,
          durationMs: 2500
        }), await it(), window.setTimeout(() => {
          kt(ne.id);
        }, 80);
      } catch (A) {
        const R = (A instanceof Error ? A.message : "") || "\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
        x.failJob(w, R), J(w, N), F("\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", A, "\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Qs = async (l, p) => {
      var _a2;
      const w = I.llmOpts;
      if (!await q(w)) return;
      const N = (p === "point" || p === "both") && ut(l.point || ""), A = (p === "explanation" || p === "both") && ft(l.explanation || "");
      if (!N && !A) {
        m({
          message: "\uC774\uBBF8 \uC811\uADFC Point\uC640 \uD574\uC124\uC774 \uC788\uC2B5\uB2C8\uB2E4.",
          durationMs: 2200
        });
        return;
      }
      const R = `sections-${l.id}`;
      xe(R), (_a2 = Ce.current) == null ? void 0 : _a2.abort();
      const U = new AbortController();
      Ce.current = U;
      try {
        const G = Xt(j.config, l), te = await Kc({
          profiles: ve,
          question: l,
          missingPoint: N,
          missingExplanation: A,
          sourcePaths: G,
          readText: B,
          ...w,
          signal: U.signal
        });
        if (!te.point && !te.explanation) {
          m({
            message: "\uC0DD\uC131\uB41C \uB0B4\uC6A9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
            durationMs: 2500
          });
          return;
        }
        const ne = j.questions.map((se) => se.id !== l.id ? se : {
          ...se,
          ...te.point ? {
            point: te.point
          } : {},
          ...te.explanation ? {
            explanation: te.explanation
          } : {}
        });
        be({
          ...j,
          questions: ne
        }), Pe((se) => ({
          ...se,
          [l.id]: true
        }));
        const K = [];
        te.point && K.push("\uC811\uADFC Point"), te.explanation && K.push("\uD574\uC124"), m({
          message: `${K.join("\xB7")} \uC0DD\uC131 \uC644\uB8CC`,
          durationMs: 2200
        }), await it();
      } catch (G) {
        if (U.signal.aborted) return;
        F("\uC811\uADFC Point\xB7\uD574\uC124 \uC0DD\uC131 \uC2E4\uD328", G, "\uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Ts = async (l, p) => {
      if (!await q()) return;
      xe(`derived-${l.id}`);
      const w = Xt(j.config, l), N = x.createDerivedJob({
        displayLabel: String(l.displayLabel || l.id),
        preview: l.question,
        hasRag: w.length > 0
      }), A = N;
      try {
        const R = await Hc({
          profiles: ve,
          question: l,
          config: j.config,
          target: p,
          sourcePaths: w,
          readText: B,
          onStep: (K) => ee(N, A, K)
        }), U = Nc(j.questions, String(l.displayLabel || l.id)), G = {
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
        }), J(N, G.id);
        const te = j.questions.findIndex((K) => K.id === l.id), ne = [
          ...j.questions
        ];
        ne.splice(te + 1, 0, G), mt("all"), qt((K) => ({
          ...K,
          [G.id]: true
        })), be({
          ...j,
          questions: ne
        }), x.setJobResultQuestionId(N, G.id), x.updateJobStep(N, {
          step: "finalize",
          status: "done",
          detail: U,
          llmResponse: JSON.stringify(G, null, 2)
        }), x.completeJob(N, U), J(N, G.id), Sn(null), m({
          message: `${U} \uD30C\uC0DD\uBB38\uC81C \uCD94\uAC00`,
          durationMs: 2500
        }), await it(), window.setTimeout(() => {
          kt(G.id);
        }, 80);
      } catch (R) {
        const U = (R instanceof Error ? R.message : "") || "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
        x.failJob(N, U), J(N, A), F("\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", R, "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Ao = i.useCallback((l, p) => {
      var _a2;
      const w = Lt[l.id], N = ((_a2 = l.options) == null ? void 0 : _a2.length) || 0;
      return w != null && w >= 1 && w <= N ? w : p != null && p >= 1 && p <= N ? p : 1;
    }, [
      Lt
    ]), _s = async (l, p, w, N = "create") => {
      var _a2, _b;
      const A = p === l.answer, R = I.llmOpts;
      if (N === "followup") {
        const K = String(w || "").trim();
        if (!K) {
          m({
            message: "\uCD94\uAC00 \uC9C8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694.",
            durationMs: 2200
          });
          return;
        }
        if (!await q(R)) return;
        const se = Ye(l.id, p), Y = String(tt.current[se] || "").trim();
        if (!Y) {
          m({
            message: "\uBA3C\uC800 \uBD84\uC11D\uC744 \uC0DD\uC131\uD558\uC138\uC694.",
            durationMs: 2200
          });
          return;
        }
        xe(se), (_a2 = Ce.current) == null ? void 0 : _a2.abort();
        const ze = new AbortController();
        Ce.current = ze;
        const Ne = K.slice(0, 60);
        try {
          const Ie = await Wc({
            profiles: ve,
            question: l,
            selectedOption: p,
            existingAnalysis: Y,
            userQuestion: K,
            ...R,
            signal: ze.signal,
            onChunk: (Xo) => {
              const Zo = Fi(Y, Xo);
              ke((Yo) => ({
                ...Yo,
                [se]: Zo
              }));
            }
          }), wt = qi(Ie, Ne), Ko = Bi(Y, wt, Ne), On = {
            ...tt.current,
            [se]: Ko
          };
          tt.current = On, ke(On), Ue(null), await it(On);
        } catch (Ie) {
          if (ze.signal.aborted) return;
          ke((wt) => ({
            ...wt,
            [se]: Y
          })), F("\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0 \uC2E4\uD328", Ie, "\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0 \uC2E4\uD328");
        } finally {
          xe(null);
        }
        return;
      }
      const U = Ui(w, A);
      if (!await q(R)) return;
      const G = Ye(l.id, p), te = N === "regenerate" ? String(tt.current[G] || "").trim() : "";
      xe(G), N !== "regenerate" && ke((K) => ({
        ...K,
        [G]: ""
      })), (_b = Ce.current) == null ? void 0 : _b.abort();
      const ne = new AbortController();
      Ce.current = ne;
      try {
        const K = await Gc({
          profiles: ve,
          question: l,
          selectedOption: p,
          userInstructions: U,
          ...R,
          signal: ne.signal,
          onChunk: (ze) => {
            const Ne = N === "regenerate" ? Gi(te, ze) : ze;
            ke((Ie) => ({
              ...Ie,
              [G]: Ne
            }));
          }
        }), se = N === "regenerate" ? Wi(te, K) : K, Y = {
          ...tt.current,
          [G]: se
        };
        tt.current = Y, ke(Y), Ue(null), await it(Y);
      } catch (K) {
        if (ne.signal.aborted) return;
        ke((se) => {
          const Y = {
            ...se
          };
          return N === "regenerate" && te ? Y[G] = te : String(Y[G] || "").trim() || delete Y[G], Y;
        }), F("\uC624\uB2F5 \uD574\uC124 \uC2E4\uD328", K, "\uC624\uB2F5 \uD574\uC124 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Ds = async (l) => {
      var _a2, _b, _c2;
      const p = j.config.sourcePaths.length, w = vr(j.config);
      if (!p) {
        pt(true), m({
          message: "\uD30C\uC77C \uADFC\uAC70 \uBB38\uC11C\uB97C \uBA3C\uC800 \uC120\uD0DD\uD558\uC138\uC694.",
          durationMs: 2800
        });
        return;
      }
      if (!w.length) {
        pt(true), m({
          message: "\uC0AC\uC6A9 \uC911\uC778 \uADFC\uAC70 \uBB38\uC11C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uCCB4\uD06C\uBC15\uC2A4\uB85C \uADFC\uAC70\uB97C \uD65C\uC131\uD654\uD558\uC138\uC694.",
          durationMs: 3200
        });
        return;
      }
      if (!await q()) return;
      xe("gen-sources"), (_a2 = Ce.current) == null ? void 0 : _a2.abort();
      const N = new AbortController();
      Ce.current = N;
      const A = x.createSourceJob({
        preview: ((_b = j.questions[0]) == null ? void 0 : _b.question) || "\uADFC\uAC70 \uAE30\uBC18 \uCD9C\uC81C",
        topic: l
      }), R = A;
      try {
        const U = await Xc({
          profiles: ve,
          config: j.config,
          sourcePaths: w,
          topic: l,
          kind: "choice",
          count: 1,
          exampleQuestions: j.questions,
          readText: B,
          signal: N.signal,
          onStep: (Ne) => ee(A, R, Ne)
        });
        if (!U.length) throw new Error("\uC0DD\uC131\uB41C \uBB38\uD56D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
        const G = Number.parseInt(ss(j.questions), 10) || 1, te = Date.now(), ne = U.map((Ne, Ie) => ({
          ...Ne,
          id: `gen-src-${te}-${Ie}`,
          displayLabel: String(G + Ie),
          isGenerated: true,
          ...w.length ? {
            sourcePaths: [
              ...w
            ]
          } : {}
        })), K = (_c2 = ne[0]) == null ? void 0 : _c2.id, se = ne.map((Ne) => Ne.displayLabel).join(", "), Y = K || A;
        x.updateJobStep(A, {
          step: "finalize",
          status: "running",
          detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026"
        }), J(A, Y);
        const ze = [
          ...j.questions,
          ...ne
        ];
        mt("all"), K && qt((Ne) => {
          const Ie = {
            ...Ne
          };
          for (const wt of ne) Ie[wt.id] = true;
          return Ie;
        }), be({
          ...j,
          questions: ze
        }), K && x.setJobResultQuestionId(A, K), x.updateJobStep(A, {
          step: "finalize",
          status: "done",
          detail: se,
          llmResponse: JSON.stringify(ne, null, 2)
        }), x.completeJob(A, se), J(A, Y), m({
          message: `\uADFC\uAC70 \uAE30\uBC18 \uBB38\uC81C ${ne.length}\uAC1C \uCD94\uAC00`,
          durationMs: 2500
        }), await it(), K && window.setTimeout(() => {
          kt(K);
        }, 80);
      } catch (U) {
        if (N.signal.aborted) {
          x.failJob(A, "\uCDE8\uC18C\uB428"), J(A, R);
          return;
        }
        const G = (U instanceof Error ? U.message : "") || "\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
        x.failJob(A, G), J(A, R), F("\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", U, "\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Fs = i.useRef(Ds);
    Fs.current = Ds;
    const Oo = i.useCallback((l) => {
      Fs.current(l);
    }, []), Lo = i.useCallback(async ({ instructions: l, form: p }) => {
      var _a2, _b;
      if (!he || !await q()) return null;
      (_a2 = Ce.current) == null ? void 0 : _a2.abort();
      const w = new AbortController();
      Ce.current = w;
      const N = Br(p, he.displayLabel);
      N.id = he.id, N.displayLabel = he.displayLabel, he.similarOf && (N.similarOf = he.similarOf), he.isGenerated && (N.isGenerated = he.isGenerated);
      const A = Xt(j.config, N);
      try {
        const R = await td({
          profiles: ve,
          question: N,
          config: j.config,
          userInstructions: l,
          sourcePaths: A,
          readText: B,
          signal: w.signal
        }), U = _e(N, j.config.choiceCount), G = {
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
          const te = [
            ...R.options || []
          ];
          G.options = et(te, U), G.answer = R.answer && R.answer >= 1 ? R.answer : 1;
        }
        return m({
          message: "\uBB38\uD56D\uC744 \uAD50\uC815\uD588\uC2B5\uB2C8\uB2E4. \uB0B4\uC6A9\uC744 \uD655\uC778\uD55C \uB4A4 \uC800\uC7A5\uD558\uC138\uC694.",
          durationMs: 3200
        }), G;
      } catch (R) {
        return w.signal.aborted || F("\uBB38\uC81C \uACE0\uCE58\uAE30 \uC2E4\uD328", R, "\uBB38\uC81C \uACE0\uCE58\uAE30 \uC2E4\uD328"), null;
      }
    }, [
      j.config,
      he,
      q,
      ve,
      B,
      F,
      m
    ]), Qo = i.useMemo(() => ({
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
    const Gs = i.useRef(Ht);
    Gs.current = Ht;
    const Rn = i.useRef(we);
    Rn.current = we;
    const Mn = i.useRef(ot);
    Mn.current = ot;
    const Ws = i.useRef(Ts);
    Ws.current = Ts;
    const To = i.useCallback((l) => {
      Bs.current(l);
    }, []), _o = i.useCallback((l, p) => {
      Us.current(l, p);
    }, []), Do = i.useCallback((l) => {
      const p = Gs.current, w = Rn.current;
      !p || !w || qs.current(p, w.option, l, w.mode);
    }, []), Fo = i.useCallback(() => {
      const l = Rn.current;
      if (!l) return;
      const p = Ye(l.questionId, l.option);
      Xe !== p && Ue(null);
    }, [
      Xe
    ]), qo = i.useCallback(() => {
      const l = Mn.current;
      l && Xe === `derived-${l.id}` || Sn(null);
    }, [
      Xe
    ]), Bo = i.useCallback((l) => {
      const p = Mn.current;
      p && Ws.current(p, l);
    }, []), Uo = i.useCallback(() => ps(false), []), Go = i.useCallback((l) => {
      mt("all"), kt(l);
    }, [
      kt
    ]), Wo = i.useCallback(() => {
      Ft({
        paths: ue.current.config.sourcePaths,
        scope: "file"
      });
    }, []), Jo = i.useCallback(() => {
      xt(null);
    }, []);
    if (!c) return t.jsx("div", {
      className: "quiz-pane flex flex-1 items-center justify-center text-sm text-gray-400",
      children: "\uD0ED\uC744 \uC120\uD0DD\uD558\uBA74 \uD034\uC988\uAC00 \uC5F4\uB9BD\uB2C8\uB2E4"
    });
    const An = V.total > 0 ? Math.round(V.answered / V.total * 100) : 0, Js = V.total > 0 && !ho, Hs = V.total > 0 && !go, Ho = ie.examInProgress, Vo = t.jsxs("div", {
      className: "flex items-center gap-1.5 text-xs text-slate-500 dark:text-odp-muted",
      "aria-label": `\uC815\uB2F5 ${V.correct}, \uBD80\uBD84\uC815\uB2F5 ${V.partial}, \uC624\uB2F5 ${V.wrong}`,
      children: [
        t.jsxs("span", {
          children: [
            "\uC815\uB2F5",
            " ",
            t.jsx("span", {
              className: "font-bold tabular-nums text-emerald-600 dark:text-emerald-400",
              children: V.correct
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
              children: V.partial
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
              children: V.wrong
            })
          ]
        })
      ]
    });
    return t.jsx(va, {
      value: Qo,
      children: t.jsx(Rt, {
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
                      t.jsx(ra, {
                        className: "shrink-0 text-blue-600",
                        size: 18
                      }),
                      t.jsx("span", {
                        className: "shrink-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong",
                        children: "\uD034\uC988 \uBAA8\uB4DC"
                      }),
                      V.total > 0 ? t.jsx("div", {
                        className: `${br} flex-1`,
                        "aria-hidden": !Js,
                        children: t.jsx(rn, {
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
                                    children: V.total
                                  }),
                                  "\uBB38\uD56D \uC911",
                                  " ",
                                  t.jsx("span", {
                                    className: "font-semibold text-blue-600 dark:text-blue-400",
                                    children: V.answered
                                  }),
                                  "\uBB38\uD56D \uD480\uC774"
                                ]
                              }),
                              t.jsxs("span", {
                                className: "shrink-0 text-xs font-semibold whitespace-nowrap tabular-nums text-slate-600 dark:text-odp-muted md:hidden",
                                children: [
                                  V.answered,
                                  "/",
                                  V.total
                                ]
                              }),
                              t.jsx("div", {
                                className: "h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-odp-bgSoft",
                                role: "progressbar",
                                "aria-valuenow": V.answered,
                                "aria-valuemin": 0,
                                "aria-valuemax": V.total,
                                "aria-label": `\uD480\uC774 \uC9C4\uD589 ${V.answered} / ${V.total}`,
                                children: t.jsx(We.div, {
                                  className: "h-full rounded-full bg-blue-500",
                                  initial: false,
                                  animate: {
                                    width: `${An}%`
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
                                  An,
                                  "%"
                                ]
                              })
                            ]
                          }, "quiz-header-progress") : null
                        })
                      }) : null
                    ]
                  }),
                  V.total > 0 ? t.jsx("div", {
                    className: `${br} shrink-0`,
                    "aria-hidden": !Hs,
                    children: t.jsx(rn, {
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
                  t.jsxs(ma, {
                    children: [
                      t.jsx(pa, {
                        asChild: true,
                        children: t.jsxs(_, {
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
                      t.jsx(xa, {
                        children: t.jsxs(ha, {
                          className: Ed,
                          sideOffset: 6,
                          align: "start",
                          children: [
                            t.jsxs(er, {
                              className: kr,
                              onSelect: () => {
                                Dt(null), _t(true);
                              },
                              children: [
                                t.jsx(pn, {
                                  size: 14,
                                  "aria-hidden": true
                                }),
                                "\uC9C1\uC811\uCD94\uAC00"
                              ]
                            }),
                            t.jsxs(er, {
                              className: kr,
                              onSelect: () => Cn(true),
                              children: [
                                t.jsx(oa, {
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
                  t.jsxs(_, {
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
                  t.jsxs(_, {
                    type: "button",
                    variant: "primary",
                    size: "sm",
                    onClick: () => {
                      Mo();
                    },
                    children: [
                      t.jsx(Ar, {
                        size: 14
                      }),
                      "\uC804\uCCB4 \uCC44\uC810"
                    ]
                  }),
                  t.jsxs(_, {
                    type: "button",
                    variant: Rs.active > 0 ? "primary" : "secondary",
                    size: "sm",
                    "aria-pressed": Tt,
                    onClick: () => {
                      pt((l) => (l && xt(null), !l));
                    },
                    children: [
                      t.jsx(Lr, {
                        size: 14
                      }),
                      "\uADFC\uAC70"
                    ]
                  }),
                  t.jsx(_, {
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
                    ref: gt,
                    className: "h-full min-h-0 overflow-y-auto px-4 py-4",
                    children: t.jsxs("div", {
                      className: "mx-auto max-w-3xl space-y-4",
                      children: [
                        t.jsx(i.Suspense, {
                          fallback: t.jsx(Cd, {}),
                          children: t.jsx(jd, {
                            profiles: ve,
                            profileId: I.profileId,
                            model: I.model,
                            onProfileIdChange: I.onProfileIdChange,
                            onModelChange: I.onModelChange
                          })
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
                                        V.answered,
                                        " / ",
                                        V.total
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
                                      width: `${An}%`
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
                                          children: V.scorePercent != null ? `${V.scorePercent}\uC810` : "-"
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
                                              children: V.correct
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
                                              children: V.partial
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
                                              children: V.wrong
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
                                    onClick: () => mt(l),
                                    children: p
                                  }, l))
                                })
                              ]
                            }),
                            t.jsx(xl, {
                              log: ye
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
                                t.jsxs(_, {
                                  type: "button",
                                  variant: "primary",
                                  onClick: () => _t(true),
                                  children: [
                                    t.jsx(Ys, {
                                      size: 14
                                    }),
                                    "\uBB38\uC81C \uCD94\uAC00"
                                  ]
                                }),
                                t.jsx(_, {
                                  type: "button",
                                  variant: "secondary",
                                  onClick: () => Cn(true),
                                  children: "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30"
                                })
                              ]
                            })
                          ]
                        }) : null,
                        j.questions.length > 0 ? t.jsx(Dl, {
                          ref: Nn,
                          questions: j.questions,
                          filter: wn,
                          scrollRef: gt,
                          userAnswers: re,
                          graded: ce,
                          subjGrades: fe,
                          isSubmitted: pe,
                          expVisible: oo,
                          wrongExpsByQuestion: ko,
                          questionMemos: de,
                          freshQuestionIds: lo,
                          busyId: Xe,
                          examInProgress: Ho,
                          resolveWrongExpFocusOption: Ao,
                          onAnswerCommit: No,
                          onSelectOption: jo,
                          onEditQuestion: Eo,
                          onGradeChoice: So,
                          onGradeSubjective: Co,
                          onRetry: vo,
                          onToggleExplanation: $o,
                          onSimilar: To,
                          onDerived: Po,
                          onGenerateSections: _o,
                          onWrongExpFocusChange: zo,
                          onOpenAnalysisDock: wo,
                          onMemoSave: Io,
                          onClearFresh: Ro
                        }) : null
                      ]
                    })
                  })
                }),
                t.jsx(Oa, {
                  open: ot != null,
                  question: ot,
                  defaultChoiceCount: j.config.choiceCount || 4,
                  busy: ot != null && Xe === `derived-${ot.id}`,
                  onClose: qo,
                  onSubmit: Bo
                }),
                we ? t.jsx(i.Suspense, {
                  fallback: null,
                  children: t.jsx(Sd, {
                    open: !!Ht,
                    question: Ht,
                    option: we.option ?? null,
                    mode: we.mode ?? "create",
                    existingAnalysis: we.mode === "followup" ? String(Te[Ye(we.questionId, we.option)] || "") : "",
                    llmProfiles: ve,
                    profileId: I.profileId,
                    model: I.model,
                    onProfileIdChange: I.onProfileIdChange,
                    onModelChange: I.onModelChange,
                    busy: Xe === Ye(we.questionId, we.option),
                    onClose: Fo,
                    onGenerate: Do
                  })
                }) : null,
                t.jsx(cc, {
                  path: io,
                  onClose: Jo,
                  loadDocument: H,
                  onOpenDocument: Q,
                  onOpenInNewTab: le
                }),
                t.jsx(nc, {
                  open: Tt,
                  docConfig: j.config,
                  sourcePathUsage: Rs,
                  busyGenSources: Xe === "gen-sources",
                  onClose: Z,
                  onPreview: $e,
                  onRemove: mo,
                  onToggleEnabled: fo,
                  onOpenPicker: Wo,
                  onGenerateFromTopic: Oo,
                  onDropHostChange: xo
                }),
                t.jsx(kc, {
                  open: yn,
                  questions: j.questions,
                  userAnswers: re,
                  gradedQuestions: ce,
                  isSubmitted: pe,
                  subjectiveGrades: fe,
                  onClose: Uo,
                  onNavigate: Go
                })
              ]
            }),
            xs ? t.jsx(sl, {
              isOpen: xs,
              onClose: () => {
                _t(false), Dt(null);
              },
              styleTemplate: bo,
              initial: he,
              nextLabel: ss(j.questions),
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
                }), Dt(null);
              },
              onOpenSourcePicker: (l, p) => Ft({
                paths: l,
                scope: "question",
                onDone: p
              }),
              ...he ? {
                onFixWithAi: Lo
              } : {}
            }) : null,
            hs ? t.jsx(al, {
              isOpen: hs,
              onClose: () => Cn(false),
              current: j,
              onApply: (l, p) => {
                be(l), p === "replace" && Ms(), m({
                  message: `\uBB38\uC81C ${l.questions.length}\uAC1C \uC801\uC6A9`,
                  durationMs: 2500
                });
              }
            }) : null,
            Ge ? t.jsx(ll, {
              isOpen: true,
              onClose: () => Ft(null),
              tree: X,
              selected: Ge.paths,
              excludePath: (r == null ? void 0 : r.id) || null,
              onExpandFolder: O,
              onDropHostChange: po,
              onRegisterDropPathsMerge: (l) => {
                Cs.current = l;
              },
              onConfirm: (l) => {
                Ge.onDone ? Ge.onDone(l) : Ge.scope === "file" && be({
                  ...j,
                  config: {
                    ...j.config,
                    sourcePaths: l
                  }
                }), Ft(null);
              }
            }) : null,
            t.jsx(Vn, {
              isOpen: ao,
              title: "\uC2DC\uD5D8 \uC2DC\uC791",
              message: "\uCD08\uAE30\uD654\uD558\uACE0 \uC2DC\uD5D8\uC744 \uC2DC\uC791\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
              confirmLabel: "\uC2DC\uC791",
              cancelLabel: "\uCDE8\uC18C",
              variant: "danger",
              onConfirm: () => {
                vn(false), yo();
              },
              onCancel: () => vn(false)
            }),
            t.jsx(Vn, {
              isOpen: ht != null,
              title: "\uADFC\uAC70 \uBB38\uC11C \uC81C\uAC70",
              message: ht ? `\u300C${ht}\u300D\uC744(\uB97C) \uD30C\uC77C \uADFC\uAC70\uC5D0\uC11C \uC81C\uAC70\uD560\uAE4C\uC694?` : "",
              confirmLabel: "\uC81C\uAC70",
              cancelLabel: "\uCDE8\uC18C",
              variant: "danger",
              onConfirm: () => {
                ht && Pn(ht), jn(null);
              },
              onCancel: () => jn(null)
            }),
            t.jsx(ml, {
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
                t.jsx(He, {
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
  }
  qd = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: $d
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  xn as Q,
  __tla,
  qd as a
};
