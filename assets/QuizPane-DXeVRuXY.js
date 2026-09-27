import { j as t, r as i, __tla as __tla_0 } from "./vendor-react-BDjpSibw.js";
import { A as mn, m as We } from "./vendor-motion-Djo_xQxQ.js";
import { gZ as Je, g_ as It, g$ as fn, X as pn, t as wr, H as dt, T as Qt, h0 as yr, I as D, bR as Yo, bS as ei, h1 as ti, h2 as ni, h3 as si, h4 as is, h5 as as, h6 as vr, ae as ls, cO as bn, h7 as ri, h8 as oi, j as Xn, fX as ii, h9 as ai, ha as Zn, hb as Fn, hc as li, hd as Ze, he as ci, hf as di, hg as Sr, hh as Yn, hi as ui, hj as es, hk as Rt, hl as mi, W as Ne, hm as fi, p as at, _ as cs, b as ds, e as jr, b4 as Cr, b5 as Nr, q as $r, aq as Pr, ar as pi, L as Er, a0 as zr, s as Nt, b1 as xi, b2 as qn, b3 as hi, b0 as gi, hn as ts, $ as bi, Y as Ks, d as ki, ho as ns, hp as yt, hq as wi, hr as vt, hs as zt, ht as $t, hu as yi, hv as vi, hw as Yt, hx as Si, S as ln, hy as Pt, hz as Et, hA as ji, P as cn, fm as dn, fE as Ci, dX as Ni, aV as $i, hB as Pi, hC as Ei, hD as St, hE as Bn, hF as zi, hG as Ii, hH as Ri, hI as Mi, hJ as Ai, hK as Li, hL as Oi, hM as Qi, hN as Ti, hO as _i, hP as Di, hQ as Fi, __tla as __tla_1 } from "./index-Bi820a2m.js";
import { X as qe, L as kn, b5 as us, y as Ir, b6 as Mt, Z as qi, S as Qe, j as Vs, k as ss, a2 as Bi, b7 as Xs, b8 as Ui, H as Gi, z as Wi, b9 as Ji, J as Hi, a$ as wn, ba as Rr, o as Mr, bb as Ki, bc as Ar, E as Vi, _ as Xi, m as Zi, e as Lr, a7 as Yi, bd as ea, a as Zs, be as ta } from "./vendor-lucide-DgWK5x8G.js";
import { h as At, a3 as na, a4 as sa, i as ze, j as Ie, k as Re, l as Me, A as Ae, b as ra, d as oa, S as ia, g as aa, t as la, u as ca, v as da, w as ua, I as Ys } from "./vendor-radix-qpbG9kXl.js";
import { __tla as __tla_2 } from "./mdEditorConfig-X3ZlxyM4.js";
import { u as ma } from "./useDocumentTheme-BW9djUOW.js";
import { u as fa } from "./useWikiImageHydration-h_4KoYXY.js";
import { Q as Or } from "./QuizLlmModelPicker-xGsz2PVN.js";
import { i as pa, g as er, e as xa, __tla as __tla_3 } from "./OpenAiCompatibleModelSelect-mbWTcRMs.js";
import { g as ha } from "./mlxVlmGenerateClient-BqOxY-Rp.js";
import "./vendor-aws-Cvd3RhZI.js";
import { __tla as __tla_4 } from "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./appMarkdownItPlugins-BRP-7WaU.js";
import { __tla as __tla_5 } from "./vendor-md-editor-CNr2PGSh.js";
import "./vendor-codemirror-CmNIsAMQ.js";
import "./wikiImageResolver-BTpOjDAV.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./noteCoverPlaceholderMarkdownIt-JbOPnRKr.js";
import "./styleResolve-DoqNWjkh.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./LlamaCppModelSelect-DfJhy3RG.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./vendor-google-genai-BsKnVxxv.js";
let ru;
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
  const Qr = i.createContext({
    hydrationEnabled: true
  });
  function ga({ value: e, children: n }) {
    return t.jsx(Qr.Provider, {
      value: e,
      children: n
    });
  }
  function ba() {
    return i.useContext(Qr);
  }
  function Te(e, n = 4) {
    if (e.kind !== "choice") return Je(n);
    const s = (e.options || []).filter((o) => String(o || "").trim()).length, r = Math.max(s, (e.options || []).length);
    return r >= It ? Je(r) : Je(n);
  }
  function Tr(e, n = 4) {
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
  function tr(e, n) {
    const s = Tr(n, e.choiceCount);
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
  function _r() {
    const [e, n] = i.useState(() => fn());
    return i.useEffect(() => {
      const s = () => n(fn());
      return window.addEventListener(pn, s), () => window.removeEventListener(pn, s);
    }, []), e;
  }
  const Dr = [
    0.32,
    0.72,
    0,
    1
  ], ka = {
    duration: 0
  };
  function wa(e) {
    return e ? {
      type: "spring",
      stiffness: 380,
      damping: 36
    } : {
      type: "tween",
      duration: 0.22,
      ease: Dr
    };
  }
  const ya = wr() ? {
    type: "tween",
    duration: 0.2,
    ease: Dr
  } : {
    type: "spring",
    stiffness: 420,
    damping: 34
  };
  function va(e, n = {}) {
    const { isResizing: s = false, edge: r = "right" } = n, o = n.useLayoutWidthAnim ?? fn(), a = s ? ka : wa(o);
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
  function Sa() {
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
      transition: ya
    };
  }
  function ja(e, n) {
    return n ?? fn() ? {
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
  function Tt({ motionKey: e, open: n, width: s, isResizing: r = false, edge: o = "right", className: a, "aria-label": c, children: d }) {
    const m = _r(), u = va(s, {
      isResizing: r,
      edge: o,
      useLayoutWidthAnim: m
    });
    return t.jsx(mn, {
      initial: false,
      children: n ? m ? t.jsx(We.aside, {
        role: "complementary",
        "aria-label": c,
        className: a,
        initial: u.initial,
        animate: u.animate,
        exit: u.exit,
        transition: u.transition,
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
        initial: u.initial,
        animate: u.animate,
        exit: u.exit,
        transition: u.transition,
        children: d
      }, e) : null
    });
  }
  const Ca = 360, Na = Qt;
  function $a(e) {
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
  function Pa(e) {
    return e && e.kind === "subjective" ? e.answerStyle === "essay" ? "subjective-essay" : "subjective-short" : "choice";
  }
  function Ea({ open: e, question: n, defaultChoiceCount: s, busy: r = false, onClose: o, onSubmit: a }) {
    const [c, d] = i.useState("choice"), [m, u] = i.useState(s), [f, p] = i.useState(""), { width: k, handleProps: h, isResizing: y } = dt({
      storageKey: "quiz-derived-question-dock-width",
      defaultWidth: Ca,
      minWidth: 280,
      maxWidth: 560,
      edge: "right"
    }), v = i.useMemo(() => n ? Te(n, s) : s, [
      s,
      n
    ]);
    i.useEffect(() => {
      e && (d(Pa(n)), u(v), p(""));
    }, [
      e,
      n,
      v
    ]);
    const { kind: z, answerStyle: N } = $a(c), $ = (n == null ? void 0 : n.displayLabel) || (n == null ? void 0 : n.id) || "", b = () => {
      a({
        kind: z,
        choiceCount: Je(m),
        ...z === "subjective" ? {
          answerStyle: N
        } : {},
        ...f.trim() ? {
          userPrompt: f.trim()
        } : {}
      });
    }, E = e && n != null;
    return t.jsx(Tt, {
      motionKey: "quiz-derived-question-dock",
      open: E,
      width: k,
      isResizing: y,
      "aria-label": "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131",
      className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-violet-200 bg-white shadow-lg dark:border-violet-900/60 dark:bg-odp-surface",
      children: n != null ? t.jsxs("div", {
        className: "relative h-full min-h-0",
        style: {
          width: k
        },
        children: [
          t.jsx(Na, {
            edge: "left",
            handleProps: h,
            isResizing: y,
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
                      ].map(([w, S]) => {
                        const I = c === w;
                        return t.jsx("button", {
                          type: "button",
                          disabled: r,
                          className: `rounded-lg border px-3 py-1.5 text-xs font-semibold ${I ? "border-violet-500 bg-violet-50 text-violet-900 dark:bg-violet-950/40 dark:text-violet-100" : "border-slate-200 bg-white text-slate-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"}`,
                          onClick: () => d(w),
                          children: S
                        }, w);
                      }),
                      z === "choice" ? t.jsxs("label", {
                        className: "ml-auto flex items-center gap-1.5 text-xs text-slate-600 dark:text-odp-muted",
                        children: [
                          "\uBCF4\uAE30",
                          t.jsx("select", {
                            className: "rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                            value: m,
                            disabled: r,
                            onChange: (w) => u(Number(w.target.value) || m),
                            children: Array.from({
                              length: yr - It + 1
                            }, (w, S) => It + S).map((w) => t.jsxs("option", {
                              value: w,
                              children: [
                                w,
                                "\uC9C0\uC120\uB2E4"
                              ]
                            }, w))
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
                        onChange: (w) => p(w.target.value)
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
                    onClick: b,
                    children: [
                      r ? t.jsx(kn, {
                        size: 14,
                        className: "animate-spin",
                        "aria-hidden": true
                      }) : t.jsx(us, {
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
  const za = i.memo(Ea);
  function Lt(e) {
    const n = String(e || "").trim();
    if (!n) return "";
    const s = n.lastIndexOf("/");
    return s >= 0 ? n.slice(s + 1) : n;
  }
  const Ia = "z-100001 max-w-[min(92vw,420px)] break-all rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", Ra = "flex w-full items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-2 py-1.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100", Ma = "inline-flex max-w-full items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100", Aa = "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-violet-400 bg-white outline-none focus-visible:ring-2 focus-visible:ring-violet-400 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600 dark:border-violet-600 dark:bg-odp-bgSoft dark:data-[state=checked]:border-violet-500 dark:data-[state=checked]:bg-violet-500";
  function La({ path: e, isDock: n, onPreview: s, muted: r }) {
    const o = Lt(e), a = n ? `min-w-0 flex-1 truncate text-left hover:underline${r ? " opacity-60" : ""}` : `min-w-0 max-w-full truncate hover:underline${r ? " opacity-60" : ""}`, c = s ? t.jsx("button", {
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
        t.jsx(Re, {
          children: t.jsxs(Me, {
            side: "top",
            sideOffset: 6,
            className: Ia,
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
  function Fr({ paths: e, onRemove: n, onOpenPicker: s, onPreview: r, isPathEnabled: o, onToggleEnabled: a, label: c = "\uADFC\uAC70 \uBB38\uC11C", emptyHint: d = "\uC120\uD0DD\uB41C \uADFC\uAC70 \uBB38\uC11C \uC5C6\uC74C", layout: m = "chips" }) {
    const u = m === "dock", f = u && !!a;
    return t.jsx(At, {
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
            className: u ? "flex flex-col gap-1.5" : "flex flex-wrap gap-1.5",
            children: e.map((p) => {
              const k = o ? o(p) : true, h = u ? `${Ra}${k ? "" : " opacity-70"}` : Ma;
              return t.jsxs("li", {
                className: h,
                children: [
                  f ? t.jsx(na, {
                    className: Aa,
                    checked: k,
                    onCheckedChange: (y) => a == null ? void 0 : a(p, y === true),
                    "aria-label": `${p} ${k ? "\uC0AC\uC6A9 \uC911" : "\uC0AC\uC6A9 \uC548 \uD568"}`,
                    children: t.jsx(sa, {
                      className: "text-white",
                      children: t.jsx(Ir, {
                        size: 10,
                        strokeWidth: 3
                      })
                    })
                  }) : null,
                  t.jsx(La, {
                    path: p,
                    isDock: u,
                    onPreview: r,
                    muted: f && !k
                  }),
                  n ? t.jsx("button", {
                    type: "button",
                    "aria-label": `${p} \uC81C\uAC70`,
                    className: u ? "ml-auto shrink-0 rounded-md p-1.5 hover:bg-violet-200/80 dark:hover:bg-violet-900" : "shrink-0 rounded p-0.5 hover:bg-violet-200/80 dark:hover:bg-violet-900",
                    onClick: () => n(p),
                    children: t.jsx(qe, {
                      size: u ? 14 : 12
                    })
                  }) : null
                ]
              }, p);
            })
          })
        ]
      })
    });
  }
  function Oa({ text: e, previewId: n, className: s = "", getPresignedUrl: r, currentNotePath: o }) {
    const a = ma(), c = i.useRef(null), d = i.useMemo(() => String(e || ""), [
      e
    ]), m = ba(), u = r ?? m.getPresignedUrl, f = o ?? m.currentNotePath ?? null, p = m.hydrationEnabled !== false;
    return fa(c, d, u, f, {
      enabled: p
    }), t.jsx("div", {
      ref: c,
      className: `quiz-md-preview markdown-content ${s}`,
      children: t.jsx(Yo, {
        id: n,
        modelValue: d,
        theme: a === "dark" ? "dark" : "light",
        previewTheme: "default",
        codeTheme: ei,
        language: "ko-KR",
        showCodeRowNumber: false,
        noImgZoomIn: true,
        iconfontType: void 0,
        sanitize: (k) => k
      })
    });
  }
  const _e = i.memo(Oa), Qa = /\*\(\s*정답\s*\)\*|\(\s*정답\s*\)|\[\s*정답\s*\]|\*\s*정답\s*\*/;
  function Ta(e) {
    return e.replace(/\*\(\s*정답\s*\)\*/g, "").replace(/\(\s*정답\s*\)/g, "").replace(/\[\s*정답\s*\]/g, "").replace(/\*\s*정답\s*\*/g, "").replace(/\*\*(.*?)\*\*/g, "$1").replace(/__(.*?)__/g, "$1").trim();
  }
  function _a(e) {
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
  const nr = /\*{0,2}\s*📖\s*모범\s*답안\s*:?\s*\*{0,2}/, sr = /\*{0,2}\s*💡\s*접근\s*Point!?\s*\*{0,2}/, rr = /\*{0,2}\s*📖\s*해설\s*:?\s*\*{0,2}/, xn = /\*{0,2}\s*📚\s*근거\s*문서\s*:?\s*\*{0,2}/;
  function Da(e) {
    const n = e.join(`
`);
    if (!xn.test(n) && !n.includes("\u{1F4DA} \uADFC\uAC70 \uBB38\uC11C")) return;
    const s = n.split(xn)[1] ?? "", r = [];
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
  function en(e) {
    return String(e || "").replace(/^\*+\s*/, "").replace(/\s*\*+$/, "").trim();
  }
  function Fa(e) {
    const n = e.join(`
`).trim();
    if (!n) return {
      point: "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.",
      explanation: "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
    };
    let s, r = n;
    if (nr.test(r)) {
      const d = r.split(nr), u = (d[1] || "").trim().split(/(?=\*{0,2}\s*(?:💡\s*접근\s*Point!?|📖\s*해설|📚\s*근거\s*문서))/);
      s = en(u[0] || ""), r = [
        d[0],
        ...u.slice(1)
      ].join(`
`).trim();
    }
    r = (r.split(xn)[0] || "").trim();
    let a = "", c = "";
    if (sr.test(r) || rr.test(r)) {
      const d = r.split(rr), m = d[0] || "";
      c = en(d.slice(1).join(`
`)), a = en(m.replace(sr, ""));
    } else c = en(r);
    return {
      point: a || "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.",
      explanation: c || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",
      ...s ? {
        modelAnswer: s
      } : {}
    };
  }
  const qa = /^<!--\s*quiz-q-meta\s+([\s\S]*?)-->\s*$/;
  function Ba(e) {
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
  function Ua(e) {
    var _a2, _b;
    const s = (_b = (_a2 = String(e || "").match(/^(.+)-(?:유사|파생)\d+$/)) == null ? void 0 : _a2[1]) == null ? void 0 : _b.trim();
    if (s) return {
      id: s,
      displayLabel: s
    };
  }
  function or(e, n) {
    return !n && !e ? e : e ? `${e}
${n}` : n;
  }
  function Ga(e) {
    return /^1\.\s+/.test(e.trim());
  }
  function Wa(e) {
    const n = e.trim();
    return n.startsWith(">") || /^\*\*정답:\*\*/.test(n);
  }
  function un(e) {
    return e.trim().replace(/^>\s?/, "");
  }
  function Ja(e) {
    const n = un(e);
    return xn.test(n) || n.includes("\u{1F4DA} \uADFC\uAC70 \uBB38\uC11C");
  }
  function Ha(e) {
    return e.trim().startsWith(">");
  }
  function Ka(e, n) {
    const s = e.trim();
    if (!s || !/^#+/.test(s)) return null;
    const r = s.split(`
`);
    let o = String(n + 1), a = o, c = "", d = null;
    const m = [];
    let u = 1, f;
    const p = [];
    let k = "choice", h, y, v = false, z = false, N = false;
    for (const F of r) {
      const R = F.trim(), _ = R.match(qa);
      if (_ == null ? void 0 : _[1]) {
        const P = Ba(_[1]);
        (P == null ? void 0 : P.similarOf) && (y = P.similarOf);
        continue;
      }
      const q = R.match(/^#+\s*(?:🔖\s*)?(\d+(?:-(?:유사|파생)\d+)?)\.?(.*)/);
      if (q) {
        a = (q[1] || "").trim(), o = a;
        const P = _a((q[2] || "").trim());
        k = P.kind, h = P.answerStyle, c = P.question, v = true, z = true, N = false;
        continue;
      }
      if (!v) continue;
      if (N) {
        if (Ha(R)) {
          p.push(un(R));
          continue;
        }
        N = false;
      }
      if (z) {
        if (Ja(R)) {
          z = false, N = true, p.push(un(R));
          continue;
        }
        if (Ga(R)) z = false;
        else if (k === "subjective" && Wa(R)) z = false;
        else if (R.startsWith("![")) {
          c = or(c, R);
          const P = R.match(/!\[.*?\]\((.*?)\)/);
          (P == null ? void 0 : P[1]) && !d && (d = P[1]);
          continue;
        } else {
          if (!R && !c) continue;
          if (z) {
            c = or(c, R);
            continue;
          }
        }
      }
      if (R.startsWith("![")) {
        const P = R.match(/!\[.*?\]\((.*?)\)/);
        (P == null ? void 0 : P[1]) && (d = P[1]);
        continue;
      }
      const K = R.match(/^\*\*정답:\*\*\s*(.*)$/);
      if (K) {
        f = (K[1] || "").trim();
        continue;
      }
      if (/^\d+\.\s+/.test(R)) {
        const P = R.match(/^(\d+)\.\s+(.*)/);
        if (P) {
          const A = Number.parseInt(P[1] || "0", 10), W = (P[2] || "").trim(), T = Qa.test(W);
          m.push(Ta(W)), T && (u = A);
        }
        continue;
      }
      R.startsWith(">") && p.push(un(R));
    }
    const { point: $, explanation: b, modelAnswer: E } = Fa(p), w = Da(p), S = f || E;
    let I = k, O = h;
    return I === "choice" && m.length === 0 && S && (I = "subjective", O = f ? "short" : "essay"), I === "choice" && m.length === 0 && !S || I === "subjective" && !c || I === "choice" && (!c || m.length === 0) ? null : (y || (y = Ua(a)), c = c.trimEnd(), {
      id: o,
      displayLabel: a,
      kind: I,
      question: c,
      image: d,
      point: $,
      explanation: b,
      ...I === "subjective" && O ? {
        answerStyle: O
      } : {},
      ...I === "choice" ? {
        options: m,
        answer: u
      } : {},
      ...I === "subjective" && S ? {
        modelAnswer: S
      } : {},
      ...w ? {
        sourcePaths: w
      } : {},
      ...y ? {
        similarOf: y,
        isGenerated: true
      } : {}
    });
  }
  function it(e) {
    const { config: n, body: s } = ti(e), { session: r, body: o } = ni(s), a = [];
    o.split(/(?=^#+\s*(?:🔖\s*)?\d+)/m).forEach((u, f) => {
      const p = Ka(u, f);
      p && a.push(p);
    });
    const d = new Set(a.map((u) => u.id)), m = r && d.size > 0 ? si(r, d, a) : r;
    return {
      config: as(n),
      questions: a,
      session: m && !is(m) ? m : null
    };
  }
  function tn(e, n) {
    return (n == null ? void 0 : n.sourcePaths) && n.sourcePaths.length > 0 ? [
      ...n.sourcePaths
    ] : vr(e);
  }
  function rs(e) {
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
  function qr(e, n) {
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
  function Va(e) {
    if (!String(e.question || "").trim()) return "\uC9C8\uBB38 \uBCF8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694.";
    if (e.kind === "choice") {
      const n = (e.options || []).map((o) => String(o || "").trim());
      if (n.filter(Boolean).length < 2) return "\uAC1D\uAD00\uC2DD\uC740 \uCD5C\uC18C 2\uAC1C \uC120\uD0DD\uC9C0\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4.";
      const r = e.answer || 0;
      return r < 1 || r > n.length || !n[r - 1] ? "\uC815\uB2F5 \uC120\uD0DD\uC9C0\uB97C \uC9C0\uC815\uD558\uC138\uC694." : null;
    }
    return String(e.modelAnswer || "").trim() ? null : e.answerStyle === "essay" ? "\uBAA8\uBC94 \uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694." : "\uC815\uB2F5\uC744 \uC785\uB825\uD558\uC138\uC694.";
  }
  function Xa(e, n) {
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
  function Za({ isOpen: e, onClose: n, styleTemplate: s, initial: r, nextLabel: o, onSubmit: a, onOpenSourcePicker: c, onFixWithAi: d }) {
    const m = !!r, [u, f] = i.useState((r == null ? void 0 : r.kind) || s.kind), [p, k] = i.useState((r == null ? void 0 : r.answerStyle) || s.answerStyle), [h, y] = i.useState(() => r ? Te(r, s.choiceCount) : s.choiceCount), [v, z] = i.useState((r == null ? void 0 : r.question) || ""), [N, $] = i.useState(() => Ye((r == null ? void 0 : r.options) || [], r ? Te(r, s.choiceCount) : s.choiceCount)), [b, E] = i.useState((r == null ? void 0 : r.answer) || 1), [w, S] = i.useState((r == null ? void 0 : r.modelAnswer) || ""), [I, O] = i.useState((r == null ? void 0 : r.point) || ""), [B, F] = i.useState((r == null ? void 0 : r.explanation) || ""), [R, _] = i.useState((r == null ? void 0 : r.sourcePaths) || []), [q, K] = i.useState(""), [P, A] = i.useState(false), [W, T] = i.useState(""), [le, He] = i.useState(false), nt = i.useCallback((Q) => {
      const j = Je(Q);
      y(j), $((ce) => Ye(ce, j)), E((ce) => Math.min(Math.max(1, ce), j));
    }, []);
    i.useEffect(() => {
      if (!e) {
        A(false), T(""), He(false), K("");
        return;
      }
      if (r) {
        const Q = Te(r, s.choiceCount);
        f(r.kind), k(r.answerStyle === "essay" ? "essay" : "short"), y(Q), z(r.question || ""), $(Ye(r.options || [], Q)), E(r.answer || 1), S(r.modelAnswer || ""), O(r.point || ""), F(r.explanation || ""), _(r.sourcePaths || []);
      } else f(s.kind), k(s.answerStyle), y(s.choiceCount), z(""), $(Ye([], s.choiceCount)), E(1), S(""), O(""), F(""), _([]);
      A(false), T(""), K("");
    }, [
      e,
      r,
      s
    ]);
    const V = i.useMemo(() => {
      const Q = {
        kind: u,
        displayLabel: (r == null ? void 0 : r.displayLabel) || o,
        question: v,
        point: I,
        explanation: B,
        sourcePaths: R
      };
      return u === "subjective" ? {
        ...Q,
        answerStyle: p,
        modelAnswer: w
      } : {
        ...Q,
        options: Ye(N, h),
        answer: b
      };
    }, [
      u,
      p,
      r == null ? void 0 : r.displayLabel,
      o,
      v,
      N,
      h,
      b,
      w,
      I,
      B,
      R
    ]), Z = () => {
      const Q = Va(V);
      if (Q) {
        K(Q);
        return;
      }
      const j = qr(V, o);
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
          const j = Xa(Q, h);
          f(j.kind), k(j.answerStyle), y(j.choiceCount), z(j.question), $(j.options), E(j.answer), S(j.modelAnswer), O(j.point), F(j.explanation), A(false);
        } catch (Q) {
          K((Q instanceof Error ? Q.message : "") || "\uBB38\uC81C \uACE0\uCE58\uAE30\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
        } finally {
          He(false);
        }
      }
    };
    return t.jsx(ls, {
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
                children: m ? "\uBB38\uC81C \uC218\uC815" : "\uBB38\uC81C \uCD94\uAC00"
              }),
              m && d ? t.jsxs(D, {
                type: "button",
                variant: P ? "primary" : "secondary",
                size: "sm",
                "aria-pressed": P,
                disabled: le,
                onClick: () => A((Q) => !Q),
                children: [
                  t.jsx(Mt, {
                    size: 14
                  }),
                  "\uBB38\uC81C \uACE0\uCE58\uAE30"
                ]
              }) : null
            ]
          }),
          m && P && d ? t.jsxs("div", {
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
                    le ? t.jsx(kn, {
                      size: 14,
                      className: "animate-spin",
                      "aria-hidden": true
                    }) : t.jsx(Mt, {
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
                const ce = Q === "choice" ? u === "choice" : u === "subjective" && p === (Q === "subjective-short" ? "short" : "essay");
                return t.jsx("button", {
                  type: "button",
                  className: `rounded-lg border px-3 py-1.5 text-xs font-semibold ${ce ? "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-100" : "border-gray-200 bg-white text-gray-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"}`,
                  onClick: () => {
                    Q === "choice" ? f("choice") : (f("subjective"), k(Q === "subjective-short" ? "short" : "essay"));
                  },
                  children: j
                }, Q);
              }),
              u === "choice" ? t.jsxs("label", {
                className: "ml-auto flex items-center gap-1.5 text-xs text-gray-600 dark:text-odp-muted",
                children: [
                  "\uBCF4\uAE30",
                  t.jsx("select", {
                    className: "rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                    value: h,
                    onChange: (Q) => nt(Number(Q.target.value) || h),
                    children: Array.from({
                      length: yr - It + 1
                    }, (Q, j) => It + j).map((Q) => t.jsxs("option", {
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
                value: v,
                onChange: (Q) => z(Q.target.value)
              }),
              v.trim() ? t.jsx(_e, {
                text: v,
                previewId: "quiz-add-q-preview",
                className: "rounded border border-gray-100 p-2 text-xs dark:border-odp-borderSoft"
              }) : null
            ]
          }),
          u === "choice" ? t.jsxs("div", {
            className: "space-y-2",
            children: [
              t.jsxs("span", {
                className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong",
                children: [
                  "\uC120\uD0DD\uC9C0 (",
                  h,
                  "\uC9C0\uC120\uB2E4)"
                ]
              }),
              N.map((Q, j) => t.jsxs("div", {
                className: "flex items-start gap-2",
                children: [
                  t.jsx("input", {
                    type: "radio",
                    name: "quiz-add-answer",
                    checked: b === j + 1,
                    onChange: () => E(j + 1),
                    className: "mt-2",
                    "aria-label": `${j + 1}\uBC88 \uC815\uB2F5`
                  }),
                  t.jsx("textarea", {
                    className: "min-h-10 flex-1 rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                    value: Q,
                    placeholder: `${j + 1}\uBC88`,
                    onChange: (ce) => {
                      const fe = [
                        ...N
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
                children: p === "essay" ? "\uBAA8\uBC94 \uB2F5\uC548" : "\uC815\uB2F5"
              }),
              p === "essay" ? t.jsx("textarea", {
                className: "min-h-20 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                value: w,
                onChange: (Q) => S(Q.target.value)
              }) : t.jsx("input", {
                className: "w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                value: w,
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
          t.jsx(Fr, {
            paths: R,
            onRemove: (Q) => _((j) => j.filter((ce) => ce !== Q)),
            onOpenPicker: () => c(R, (Q) => _(Q)),
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
                  m ? t.jsx(bn, {
                    size: 14
                  }) : t.jsx(ri, {
                    size: 14
                  }),
                  m ? "\uC800\uC7A5" : "\uCD94\uAC00"
                ]
              })
            ]
          })
        ]
      })
    });
  }
  function Ya(e, n) {
    const s = [
      ...e
    ];
    let r = Number.parseInt(rs(e), 10) || 1;
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
  function el(e, n, s) {
    return s.mode === "replace" ? {
      config: s.mergeConfig !== false ? as({
        ...e.config,
        ...n.config,
        sourcePaths: n.config.sourcePaths.length > 0 ? n.config.sourcePaths : e.config.sourcePaths
      }) : e.config,
      questions: n.questions.map((o) => ({
        ...o
      }))
    } : {
      config: e.config,
      questions: Ya(e.questions, n.questions)
    };
  }
  const tl = `### 1. \uB9F5\uB9AC\uB4C0\uC2A4\uC5D0 \uB300\uD55C \uC124\uBA85\uC73C\uB85C \uAC00\uC7A5 \uC801\uC808\uD55C \uAC83\uC740?

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
  function nl({ isOpen: e, onClose: n, current: s, onApply: r }) {
    const [o, a] = i.useState(""), [c, d] = i.useState("append"), [m, u] = i.useState(""), [f, p] = i.useState(false), k = (y = false) => {
      const v = it(o);
      if (!v.questions.length) {
        u("\uD30C\uC2F1\uB41C \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uB9C8\uD06C\uB2E4\uC6B4 \uD615\uC2DD\uC744 \uD655\uC778\uD558\uC138\uC694.");
        return;
      }
      if (c === "replace" && !y) {
        p(true);
        return;
      }
      const z = el(s, v, {
        mode: c,
        mergeConfig: c === "replace"
      });
      r(z, c), n();
    }, h = (y) => {
      if (!y) return;
      const v = new FileReader();
      v.onload = () => {
        a(String(v.result || "")), u("");
      }, v.readAsText(y, "UTF-8");
    };
    return t.jsxs(t.Fragment, {
      children: [
        t.jsx(ls, {
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
                      t.jsx(oi, {
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
                    onChange: (y) => {
                      var _a2;
                      return h(((_a2 = y.target.files) == null ? void 0 : _a2[0]) || null);
                    }
                  }),
                  t.jsx(D, {
                    type: "button",
                    variant: "tertiary",
                    onClick: () => {
                      a(tl), u("");
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
                onChange: (y) => {
                  a(y.target.value), u("");
                },
                placeholder: "\uB9C8\uD06C\uB2E4\uC6B4 \uBB38\uC81C \uBAA9\uB85D\uC744 \uBD99\uC5EC\uB123\uC73C\uC138\uC694\u2026"
              }),
              m ? t.jsx("p", {
                className: "text-xs font-medium text-rose-600",
                children: m
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
                    onClick: () => k(false),
                    children: [
                      t.jsx(bn, {
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
        t.jsx(Xn, {
          isOpen: f,
          variant: "danger",
          title: "\uBB38\uD56D \uC804\uCCB4 \uAD50\uCCB4",
          message: "\uAE30\uC874 \uBB38\uD56D\uC744 \uBAA8\uB450 \uC9C0\uC6B0\uACE0 \uBD99\uC5EC\uB123\uC740 \uB0B4\uC6A9\uC73C\uB85C \uAD50\uCCB4\uD560\uAE4C\uC694? \uD480\uC774 \uC9C4\uD589 \uAE30\uB85D\uB3C4 \uCD08\uAE30\uD654\uB429\uB2C8\uB2E4.",
          confirmLabel: "\uAD50\uCCB4",
          cancelLabel: "\uCDE8\uC18C",
          onConfirm: () => {
            p(false), k(true);
          },
          onCancel: () => p(false)
        })
      ]
    });
  }
  function ir(e, n) {
    const s = [], r = (o) => {
      for (const a of o) if (a.type === "folder" && a.children) r(a.children);
      else if (a.type === "file") {
        if (!(a.path || a.name || "").toLowerCase().endsWith(".md") || n && a.path === n || ai(a.path) && n && a.path === n) continue;
        s.push(a);
      }
    };
    return r(e || []), s;
  }
  function sl({ isOpen: e, onClose: n, tree: s, selected: r, excludePath: o, onConfirm: a, onExpandFolder: c, onDropHostChange: d, onRegisterDropPathsMerge: m }) {
    const [u, f] = i.useState(r), [p, k] = i.useState(""), h = i.useMemo(() => Array.isArray(s) ? s : [], [
      s
    ]);
    i.useEffect(() => {
      e && f(r);
    }, [
      e,
      r
    ]);
    const y = i.useCallback((N) => {
      N.length && f(($) => {
        const b = new Set($);
        for (const E of N) b.add(E);
        return [
          ...b
        ].sort((E, w) => E.localeCompare(w));
      });
    }, []);
    i.useEffect(() => (m == null ? void 0 : m(y), () => m == null ? void 0 : m(null)), [
      y,
      m
    ]), i.useEffect(() => () => d == null ? void 0 : d(null), [
      d
    ]);
    const v = i.useMemo(() => {
      var _a2;
      if (!p) return h;
      const N = ($) => {
        for (const b of $) {
          if (b.path === p) return b;
          if (b.children) {
            const E = N(b.children);
            if (E) return E;
          }
        }
        return null;
      };
      return ((_a2 = N(h)) == null ? void 0 : _a2.children) || [];
    }, [
      h,
      p
    ]), z = (N) => {
      f(($) => $.includes(N) ? $.filter((b) => b !== N) : [
        ...$,
        N
      ]);
    };
    return t.jsx(ls, {
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
          p ? t.jsx("button", {
            type: "button",
            className: "text-left text-xs text-blue-600 hover:underline",
            onClick: () => {
              const N = p.replace(/\/$/, "").split("/").filter(Boolean);
              N.pop(), k(N.length ? `${N.join("/")}/` : "");
            },
            children: "\u2190 \uC0C1\uC704 \uD3F4\uB354"
          }) : null,
          t.jsx("div", {
            ref: d,
            className: "relative min-h-48 flex-1",
            children: t.jsxs("ul", {
              className: "h-full min-h-48 space-y-1 overflow-y-auto rounded-lg border border-gray-200 p-2 dark:border-odp-borderSoft",
              children: [
                v.map((N) => {
                  if (N.type === "folder") return t.jsx("li", {
                    children: t.jsxs("button", {
                      type: "button",
                      className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg",
                      onClick: async () => {
                        await (c == null ? void 0 : c(N)), k(N.path.endsWith("/") ? N.path : `${N.path}/`);
                      },
                      children: [
                        t.jsx(ii, {
                          size: 14
                        }),
                        N.name
                      ]
                    })
                  }, N.path);
                  if (!(N.path || "").toLowerCase().endsWith(".md") || o && N.path === o) return null;
                  const b = u.includes(N.path);
                  return t.jsx("li", {
                    children: t.jsxs("label", {
                      className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg",
                      children: [
                        t.jsx("input", {
                          type: "checkbox",
                          checked: b,
                          onChange: () => z(N.path)
                        }),
                        t.jsx("span", {
                          className: "truncate",
                          children: N.name
                        })
                      ]
                    })
                  }, N.path);
                }),
                v.length === 0 ? t.jsx("li", {
                  className: "px-2 py-6 text-center text-xs text-gray-400",
                  children: "\uD56D\uBAA9 \uC5C6\uC74C"
                }) : null
              ]
            })
          }),
          t.jsxs("p", {
            className: "text-[11px] text-gray-500 dark:text-odp-muted",
            children: [
              u.length,
              "\uAC1C \uC120\uD0DD\uB428",
              ir(h, o).length ? ` / vault md ${ir(h, o).length}\uAC1C` : ""
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
                  a(u), n();
                },
                children: [
                  t.jsx(bn, {
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
  function rl(e) {
    switch (e) {
      case "running":
        return t.jsx(kn, {
          size: 13,
          className: "animate-spin text-violet-600 dark:text-violet-300"
        });
      case "done":
        return t.jsx(Ir, {
          size: 13,
          className: "text-emerald-600 dark:text-emerald-400"
        });
      case "error":
        return t.jsx(qe, {
          size: 13,
          className: "text-rose-600 dark:text-rose-400"
        });
      case "skipped":
        return t.jsx(Bi, {
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
  function nn({ title: e, body: n }) {
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
  function ol({ step: e }) {
    var _a2, _b, _c2, _d;
    return !!((_a2 = e.systemPrompt) == null ? void 0 : _a2.trim()) || !!((_b = e.llmInstruction) == null ? void 0 : _b.trim()) || !!((_c2 = e.llmResponse) == null ? void 0 : _c2.trim()) || !!((_d = e.error) == null ? void 0 : _d.trim()) ? t.jsxs("div", {
      className: "space-y-2",
      children: [
        t.jsx(nn, {
          title: "System prompt",
          body: e.systemPrompt || ""
        }),
        t.jsx(nn, {
          title: "Instruction / input",
          body: e.llmInstruction || ""
        }),
        t.jsx(nn, {
          title: "Model response / artifact",
          body: e.llmResponse || ""
        }),
        e.error ? t.jsx(nn, {
          title: "Error",
          body: e.error
        }) : null
      ]
    }) : t.jsx("p", {
      className: "text-[10px] text-slate-400 dark:text-odp-muted",
      children: "\uC800\uC7A5\uB41C \uD504\uB86C\uD504\uD2B8/\uC751\uB2F5 \uC5C6\uC74C"
    });
  }
  function il({ step: e, showDetail: n }) {
    const s = e.error || e.detail;
    return t.jsxs("li", {
      className: "space-y-1.5 py-0.5",
      children: [
        t.jsxs("div", {
          className: "flex items-start gap-2",
          children: [
            t.jsx("span", {
              className: "mt-0.5 shrink-0",
              children: rl(e.status)
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
          children: t.jsx(ol, {
            step: e
          })
        }) : null
      ]
    });
  }
  function al({ job: e, detailOpen: n, onToggleDetail: s, onRemove: r }) {
    const o = e.kind === "similar" ? "\uC720\uC0AC\uBB38\uC81C" : e.kind === "derived" ? "\uD30C\uC0DD\uBB38\uC81C" : "\uADFC\uAC70 \uCD9C\uC81C", a = e.kind === "similar" ? t.jsx(Mt, {
      size: 14,
      className: "shrink-0 text-violet-600 dark:text-violet-300"
    }) : e.kind === "derived" ? t.jsx(us, {
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
                  children: n ? t.jsx(Vs, {
                    size: 14
                  }) : t.jsx(ss, {
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
              n ? t.jsx(Vs, {
                size: 14
              }) : t.jsx(ss, {
                size: 14
              }),
              n ? "\uC811\uAE30" : "\uC790\uC138\uD788 \uBCF4\uAE30"
            ]
          })
        }),
        t.jsx("ul", {
          className: "space-y-0.5 border-t border-slate-100 pt-1.5 dark:border-odp-borderSoft",
          children: e.steps.map((c) => t.jsx(il, {
            step: c,
            showDetail: n
          }, c.id))
        })
      ]
    });
  }
  function ll({ jobs: e, isOpen: n, size: s, onClose: r, onResize: o, onRemoveJob: a, onClearFinished: c, onUserEngage: d, onPointerEngageChange: m, onFocusEngageChange: u }) {
    const f = i.useRef(null), [p, k] = i.useState({}), h = i.useRef({
      mode: null,
      startX: 0,
      startY: 0,
      startW: 0,
      startH: 0
    }), y = (w) => {
      k((S) => {
        const I = {
          ...S
        };
        return I[w] ? delete I[w] : I[w] = true, I;
      });
    }, v = i.useCallback((w, S) => {
      S.preventDefault(), S.stopPropagation(), h.current = {
        mode: w,
        startX: S.clientX,
        startY: S.clientY,
        startW: s.width,
        startH: s.height
      };
      const I = (B) => {
        const F = h.current;
        if (!F.mode) return;
        const R = F.startX - B.clientX, _ = F.startY - B.clientY;
        let q = F.startW, K = F.startH;
        (F.mode === "width" || F.mode === "both") && (q = F.startW + R), (F.mode === "height" || F.mode === "both") && (K = F.startH + _), o({
          width: q,
          height: K
        });
      }, O = () => {
        h.current.mode = null, document.removeEventListener("pointermove", I), document.removeEventListener("pointerup", O);
      };
      document.addEventListener("pointermove", I), document.addEventListener("pointerup", O);
    }, [
      o,
      s.height,
      s.width
    ]), z = e.filter((w) => w.status === "running").length, N = e.filter((w) => w.status === "done").length, $ = e.filter((w) => w.status === "error").length, b = e.some((w) => w.status !== "running"), E = Sa();
    return t.jsx(mn, {
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
        initial: E.initial,
        animate: E.animate,
        exit: E.exit,
        transition: E.transition,
        onMouseEnter: () => m == null ? void 0 : m(true),
        onMouseLeave: () => m == null ? void 0 : m(false),
        onFocusCapture: () => u == null ? void 0 : u(true),
        onBlurCapture: (w) => {
          w.currentTarget.contains(w.relatedTarget) || (u == null ? void 0 : u(false));
        },
        onPointerDown: () => d == null ? void 0 : d(),
        children: [
          t.jsx("div", {
            className: "absolute left-0 top-0 z-20 h-3 w-3 cursor-nwse-resize touch-none",
            "aria-hidden": true,
            onPointerDown: (w) => v("both", w)
          }),
          t.jsx("div", {
            className: "absolute left-0 right-0 top-0 z-10 h-2 cursor-ns-resize touch-none",
            "aria-hidden": true,
            onPointerDown: (w) => v("height", w)
          }),
          t.jsx("div", {
            className: "absolute bottom-0 left-0 top-0 z-10 w-2 cursor-ew-resize touch-none",
            "aria-hidden": true,
            onPointerDown: (w) => v("width", w)
          }),
          t.jsxs("div", {
            className: "flex shrink-0 items-center justify-between gap-2 border-b border-violet-200/70 bg-violet-50/90 px-3 py-2 dark:border-violet-900/40 dark:bg-violet-950/40",
            children: [
              t.jsxs("div", {
                className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-950 dark:text-violet-100",
                children: [
                  t.jsx(qi, {
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
            children: e.length === 0 ? "\uC9C4\uD589 \uC911\uC778 \uC0DD\uC131 \uC791\uC5C5\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" : `\uC9C4\uD589 ${z} \xB7 \uC644\uB8CC ${N}${$ > 0 ? ` \xB7 \uC2E4\uD328 ${$}` : ""}`
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
              children: e.map((w) => t.jsx("li", {
                children: t.jsx(al, {
                  job: w,
                  detailOpen: !!p[w.id],
                  onToggleDetail: () => y(w.id),
                  onRemove: () => a(w.id)
                })
              }, w.id))
            })
          }),
          t.jsxs("div", {
            className: "flex shrink-0 justify-end gap-2 border-t border-slate-200/80 px-3 py-2 dark:border-odp-borderSoft",
            children: [
              b ? t.jsxs(D, {
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
                  t.jsx(bn, {
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
  const sn = "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
  function cl({ stopwatch: e, onRequestStart: n }) {
    const { displayMs: s, running: r, started: o, start: a, pause: c, resume: d, stop: m } = e, u = n ?? a;
    return o ? t.jsx(At, {
      delayDuration: 250,
      skipDelayDuration: 0,
      children: t.jsxs("div", {
        className: "flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 dark:border-odp-borderSoft dark:bg-odp-bgSoft",
        children: [
          t.jsx(Xs, {
            size: 14,
            className: `shrink-0 ${r ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500"}`,
            "aria-hidden": true
          }),
          t.jsx("span", {
            className: `min-w-[3.25rem] font-mono text-sm font-bold tabular-nums ${r ? "text-emerald-700 dark:text-emerald-300" : "text-slate-700 dark:text-odp-fgStrong"}`,
            "aria-live": "polite",
            children: Zn(s)
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
                  children: t.jsx(Ui, {
                    size: 14
                  })
                })
              }),
              t.jsx(Re, {
                children: t.jsxs(Me, {
                  side: "bottom",
                  sideOffset: 6,
                  className: sn,
                  children: [
                    "\uC77C\uC2DC\uC815\uC9C0",
                    t.jsx(Ae, {
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
                  children: t.jsx(Gi, {
                    size: 14
                  })
                })
              }),
              t.jsx(Re, {
                children: t.jsxs(Me, {
                  side: "bottom",
                  sideOffset: 6,
                  className: sn,
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
          t.jsxs(ze, {
            children: [
              t.jsx(Ie, {
                asChild: true,
                children: t.jsx(D, {
                  type: "button",
                  variant: "tertiary",
                  size: "sm",
                  onClick: m,
                  "aria-label": "\uC815\uC9C0",
                  children: t.jsx(Wi, {
                    size: 14
                  })
                })
              }),
              t.jsx(Re, {
                children: t.jsxs(Me, {
                  side: "bottom",
                  sideOffset: 6,
                  className: sn,
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
    }) : t.jsx(At, {
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
              onClick: u,
              children: [
                t.jsx(Xs, {
                  size: 14
                }),
                t.jsx("span", {
                  className: "hidden md:inline",
                  children: "\uC2DC\uD5D8 \uC2A4\uD1B1\uC6CC\uCE58"
                })
              ]
            })
          }),
          t.jsx(Re, {
            children: t.jsxs(Me, {
              side: "bottom",
              sideOffset: 6,
              className: sn,
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
  function dl({ log: e }) {
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
                    children: Fn(d.at)
                  }),
                  " \xB7 ",
                  t.jsx("span", {
                    className: "font-semibold text-slate-700 dark:text-odp-fgStrong",
                    children: li[d.type]
                  }),
                  " \xB7 ",
                  t.jsx("span", {
                    className: "tabular-nums text-blue-600 dark:text-blue-400",
                    children: Zn(d.elapsedMs)
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
                  children: Fn(c.at)
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
                  children: Zn(c.durationMs)
                }),
                t.jsxs("span", {
                  className: "text-slate-400 dark:text-odp-muted",
                  children: [
                    " ",
                    "(~",
                    Fn(c.endedAt),
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
  const ul = "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", ml = "\uC2DC\uD5D8\uC774 \uB05D\uB09C \uB4A4\uC5D0 \uC804\uCCB4 \uCC44\uC810\uC744 \uD574\uC8FC\uC138\uC694";
  function ar({ examInProgress: e, disabled: n, children: s, ...r }) {
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
        t.jsx(Re, {
          children: t.jsxs(Me, {
            side: "top",
            sideOffset: 6,
            className: ul,
            children: [
              ml,
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
  function Br(e) {
    return e && typeof e == "object" ? e : {};
  }
  function fl(e) {
    if (typeof e == "number" && Number.isFinite(e)) return e;
    if (typeof e == "string" && e.trim()) return e.trim();
    const n = Number(e);
    return Number.isFinite(n) ? n : String(e ?? "").trim();
  }
  function pl(e, n) {
    const s = Br(e), r = String(s.id || s.name || `var${n + 1}`).trim();
    if (!r) return null;
    const o = String(s.description || s.label || r).trim() || r, a = fl(s.originalValue ?? s.value), c = Number(s.min), d = Number(s.max), m = Number.isFinite(c) ? c : 0, u = Number.isFinite(d) ? d : m, f = Number(s.step), p = Number.isFinite(f) && f > 0 ? f : 1, k = typeof s.unit == "string" && s.unit.trim() ? s.unit.trim() : void 0;
    return {
      id: r,
      description: o,
      originalValue: a,
      min: m,
      max: u,
      step: p,
      ...k ? {
        unit: k
      } : {}
    };
  }
  function Ur(e) {
    const n = Br(e), s = String(n.coreCategory || n.category || n.topic || "").trim() || "general concept", r = !!(n.isCalculation ?? n.isCalc ?? n.calculation), a = (Array.isArray(n.variables) ? n.variables : []).map((c, d) => pl(c, d)).filter((c) => c != null);
    return {
      coreCategory: s,
      isCalculation: r,
      variables: r ? a : []
    };
  }
  function xl(e, n, s, r) {
    const o = Math.min(e, n), a = Math.max(e, n), c = s > 0 ? s : 1, d = Math.floor((a - o) / c);
    if (d < 0 || d === 0) return o;
    let m = o, u = 0;
    do {
      const f = Math.floor(Math.random() * (d + 1));
      m = o + f * c, u += 1;
    } while (u < 24 && typeof r == "number" && Number.isFinite(r) && m === r && d > 0);
    return m;
  }
  function Gr(e) {
    return e.map((n) => {
      if (typeof n.originalValue == "number" && Number.isFinite(n.originalValue)) {
        const s = xl(n.min, n.max, n.step ?? 1, n.originalValue);
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
  function Wr(e) {
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
  const hl = [
    "\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694.",
    "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694."
  ], gl = [
    "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
  ], bl = 12, kl = 24;
  function ut(e) {
    const n = String(e || "").trim();
    return !n || n.length < bl ? true : hl.some((s) => n === s);
  }
  function mt(e) {
    const n = String(e || "").trim();
    return !n || n.length < kl ? true : gl.some((s) => n === s);
  }
  function hn(e) {
    return !ut(String(e.point || "")) && !mt(String(e.explanation || ""));
  }
  function Jr(e) {
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
  function Hr(e) {
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
  function wl(e) {
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
  function yl(e) {
    var _a2;
    const n = e.question, s = [];
    e.missingPoint && s.push("point(\uC811\uADFC Point)"), e.missingExplanation && s.push("explanation(\uD574\uC124)");
    let r = "";
    if (n.kind === "choice") {
      const d = n.options || [];
      r = `\uC9C8\uBB38: ${n.question}
\uBCF4\uAE30: ${d.map((m, u) => `${u + 1}. ${m}`).join(" | ")}
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
  function vl({ question: e, busyKey: n, showContent: s = true, onGenerate: r }) {
    const o = ut(e.point || ""), a = mt(e.explanation || ""), c = o || a;
    if (!s && !c) return null;
    const d = `sections-${e.id}`, m = n === d, u = c ? t.jsxs("div", {
      className: "flex justify-end gap-2",
      children: [
        o && a ? t.jsxs(D, {
          type: "button",
          variant: "secondary",
          size: "sm",
          disabled: m,
          onClick: () => r("both"),
          children: [
            t.jsx(Qe, {
              size: 14
            }),
            m ? "\uC0DD\uC131 \uC911\u2026" : "\uC811\uADFC Point\xB7\uD574\uC124 \uC0DD\uC131"
          ]
        }) : null,
        o && !a ? t.jsxs(D, {
          type: "button",
          variant: "secondary",
          size: "sm",
          disabled: m,
          onClick: () => r("point"),
          children: [
            t.jsx(Qe, {
              size: 14
            }),
            m ? "\uC0DD\uC131 \uC911\u2026" : "\uC811\uADFC Point \uC0DD\uC131"
          ]
        }) : null,
        a && !o ? t.jsxs(D, {
          type: "button",
          variant: "secondary",
          size: "sm",
          disabled: m,
          onClick: () => r("explanation"),
          children: [
            t.jsx(Qe, {
              size: 14
            }),
            m ? "\uC0DD\uC131 \uC911\u2026" : "\uD574\uC124 \uC0DD\uC131"
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
        u
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
        u
      ]
    });
  }
  const Sl = "relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-400 data-[state=checked]:border-rose-500 data-[state=checked]:bg-rose-500 data-[state=checked]:text-white border-rose-200 bg-white text-rose-800 hover:bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-100 dark:hover:bg-rose-950/50 dark:data-[state=checked]:border-rose-500 dark:data-[state=checked]:bg-rose-600", jl = "relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100 dark:hover:bg-emerald-950/50 dark:data-[state=checked]:border-emerald-500 dark:data-[state=checked]:bg-emerald-600";
  function Cl({ question: e, focusOption: n, onFocusOptionChange: s, wrongExps: r, busyKey: o, onOpenAnalysisDock: a }) {
    var _a2;
    const c = ((_a2 = e.options) == null ? void 0 : _a2.length) || 0;
    if (c <= 0) return null;
    const d = Ze(e.id, n), m = r[d], u = m !== void 0, f = o === d, p = n === e.answer, k = p ? "\uC815\uB2F5 \uBD84\uC11D" : "\uC624\uB2F5 \uBD84\uC11D", h = p ? "mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/45 dark:text-emerald-100" : "mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100", y = p ? "font-bold text-emerald-800 dark:text-emerald-200" : "font-bold text-rose-800 dark:text-rose-200", v = p ? "text-[11px] font-semibold text-emerald-700 dark:text-emerald-200" : "text-[11px] font-semibold text-rose-700 dark:text-rose-200", z = p ? "text-[11px] text-emerald-700/90 dark:text-emerald-200/80" : "text-[11px] text-rose-700/90 dark:text-rose-200/80", N = p ? "text-[10px] font-medium text-emerald-500 dark:text-emerald-300" : "text-[10px] font-medium text-rose-500 dark:text-rose-300", $ = p ? "bg-emerald-500 dark:bg-emerald-300" : "bg-rose-500 dark:bg-rose-300", b = p ? "ring-emerald-50 dark:ring-emerald-950" : "ring-rose-50 dark:ring-rose-950";
    return t.jsxs("div", {
      className: h,
      children: [
        t.jsxs("div", {
          className: "mb-2 flex flex-wrap items-center justify-between gap-2",
          children: [
            t.jsx("div", {
              className: y,
              children: k
            }),
            t.jsx(ra, {
              className: "flex flex-wrap items-center gap-1",
              value: String(n),
              onValueChange: (E) => {
                const w = Number.parseInt(E, 10);
                Number.isFinite(w) && w >= 1 && s(w);
              },
              "aria-label": `${e.displayLabel}\uBC88 \uBCF4\uAE30 \uC120\uD0DD`,
              children: Array.from({
                length: c
              }, (E, w) => {
                const S = w + 1, I = Ze(e.id, S), O = r[I] !== void 0 && String(r[I] || "").trim(), B = S === e.answer, F = B ? jl : Sl;
                return t.jsxs(oa, {
                  value: String(S),
                  className: `${F} ${O ? "pr-2 pl-2" : ""}`,
                  "aria-label": `${S}\uBC88${B ? " (\uC815\uB2F5)" : ""}${O ? ", \uBD84\uC11D \uC800\uC7A5\uB428" : ""}`,
                  children: [
                    t.jsx("span", {
                      children: S
                    }),
                    O ? t.jsx("span", {
                      className: `absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ${b}`,
                      "aria-hidden": true
                    }) : null
                  ]
                }, S);
              })
            })
          ]
        }),
        u ? t.jsxs("div", {
          children: [
            t.jsxs("div", {
              className: "mb-1.5 flex flex-wrap items-center gap-2",
              children: [
                t.jsxs("span", {
                  className: v,
                  children: [
                    n,
                    "\uBC88",
                    p ? " \xB7 \uC815\uB2F5 \uBCF4\uAE30" : " \xB7 \uC624\uB2F5 \uBCF4\uAE30"
                  ]
                }),
                f ? t.jsxs("span", {
                  className: `inline-flex items-center gap-1 ${N}`,
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
              children: m ? t.jsx(_e, {
                text: m,
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
                    t.jsx(Ji, {
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
                    t.jsx(Hi, {
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
                }) : t.jsx(Mt, {
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
  function Nl({ questionId: e, value: n, onSave: s }) {
    const r = String(n || ""), o = r.trim().length > 0, a = `qmemo-${e}`, [c, d] = i.useState(false), [m, u] = i.useState("");
    i.useEffect(() => {
      c || u(r);
    }, [
      r,
      c
    ]);
    const f = () => {
      u(""), d(true);
    }, p = () => {
      u(r), d(true);
    }, k = () => {
      s(m), d(false);
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
                value: m,
                onChange: (h) => u(h.target.value),
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
                onClick: k,
                children: "\uC800\uC7A5\uD558\uAE30"
              }),
              t.jsx(D, {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: () => {
                  u(r), d(false);
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
            onClick: o ? p : f,
            children: [
              t.jsx(wn, {
                size: 14
              }),
              o ? "\uBA54\uBAA8\uC218\uC815" : "\uBA54\uBAA8\uC791\uC131"
            ]
          })
        ]
      })
    });
  }
  const $l = 400;
  function Pl(e, n, s) {
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
    ]), m = i.useCallback((u) => {
      o(u), c.current != null && clearTimeout(c.current), c.current = setTimeout(() => {
        c.current = null, u !== a.current && (a.current = u, s(e, u));
      }, $l);
    }, [
      s,
      e
    ]);
    return i.useEffect(() => () => {
      c.current != null && clearTimeout(c.current);
    }, []), {
      draft: r,
      handleChange: m,
      flush: d
    };
  }
  const os = "data-quiz-q-track", El = 0.12;
  function zl({ scrollRootRef: e, questions: n, running: s, getElapsedMs: r, timeLog: o, onLogChange: a }) {
    const c = i.useRef(o), d = i.useRef(a), m = i.useRef(r), u = i.useRef(n), f = i.useRef(null), p = i.useRef(null), k = i.useRef(/* @__PURE__ */ new Map());
    c.current = o, d.current = a, m.current = r, u.current = n;
    const h = i.useCallback(($) => {
      const b = f.current;
      if (!b) return;
      f.current = null, p.current = null;
      const E = m.current(), w = Math.max(0, E - b.elapsedMs);
      if (w < ci) return;
      const S = {
        questionId: b.questionId,
        displayLabel: b.displayLabel,
        at: b.at,
        endedAt: $ ?? (/* @__PURE__ */ new Date()).toISOString(),
        durationMs: w
      }, I = di(c.current, S);
      d.current(I);
    }, []), y = i.useCallback(($, b) => {
      var _a2;
      ((_a2 = f.current) == null ? void 0 : _a2.questionId) !== $ && (f.current = {
        questionId: $,
        displayLabel: b,
        at: (/* @__PURE__ */ new Date()).toISOString(),
        elapsedMs: m.current()
      }, p.current = $);
    }, []), v = i.useCallback(() => {
      let $ = null, b = 0;
      for (const [E, w] of k.current) w > b && (b = w, $ = E);
      return b >= El ? $ : null;
    }, []), z = i.useCallback(($) => {
      if (!s || $ === p.current) return;
      if (h(), !$) {
        p.current = null;
        return;
      }
      const b = u.current.find((E) => E.id === $);
      b && y(b.id, b.displayLabel);
    }, [
      h,
      s,
      y
    ]);
    i.useEffect(() => {
      if (!s) {
        h(), k.current.clear();
        return;
      }
      z(v());
    }, [
      s,
      h,
      z,
      v
    ]);
    const N = n.map(($) => $.id).join("\0");
    i.useEffect(() => {
      const $ = e.current;
      if (!$ || !s) return;
      const b = new Set(u.current.map((S) => S.id));
      k.current = new Map([
        ...k.current.entries()
      ].filter(([S]) => b.has(S)));
      const E = new IntersectionObserver((S) => {
        for (const I of S) {
          const O = I.target.getAttribute(os);
          O && k.current.set(O, I.intersectionRatio);
        }
        z(v());
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
      return $.querySelectorAll(`[${os}]`).forEach((S) => E.observe(S)), () => {
        E.disconnect();
      };
    }, [
      e,
      N,
      s,
      z,
      v
    ]);
  }
  const lr = os;
  function Il({ question: e, userAnswer: n, isSubmitted: s, isQuestionGraded: r, subjectiveGrade: o, showExplanation: a, wrongExpsForQuestion: c, wrongExpFocusOption: d, questionMemo: m, busyId: u, examInProgress: f, isFresh: p, onClearFresh: k, onAnswerCommit: h, onSelectOption: y, onEditQuestion: v, onGradeChoice: z, onGradeSubjective: N, onRetry: $, onToggleExplanation: b, onSimilar: E, onDerived: w, onGenerateSections: S, onWrongExpFocusChange: I, onOpenAnalysisDock: O, onMemoSave: B }) {
    const F = String(n ?? ""), { draft: R, handleChange: _, flush: q } = Pl(e.id, F, h), K = n !== void 0 && String(n).trim() !== "", P = s || r, { isWrong: A, isCorrect: W, gradeLabel: T } = i.useMemo(() => {
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
      p ? "ring-2 ring-purple-300/70 dark:ring-purple-500/50" : ""
    ].filter(Boolean).join(" "), nt = t.jsxs(t.Fragment, {
      children: [
        t.jsxs(D, {
          type: "button",
          variant: "tertiary",
          size: "sm",
          className: "absolute top-3 right-3 z-10",
          onClick: () => v(e),
          children: [
            t.jsx(wn, {
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
              onClick: () => y(e.id, ne),
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
              value: R,
              disabled: P,
              onChange: (V) => _(V.target.value),
              onBlur: q,
              placeholder: "\uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694"
            }) : t.jsx("input", {
              className: "quiz-body-field w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft",
              value: R,
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
            }) : e.kind === "choice" ? t.jsxs(ar, {
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
            }) : t.jsxs(ar, {
              examInProgress: f,
              size: "sm",
              disabled: u === e.id || !R.trim(),
              onClick: () => {
                q(), N(e, R);
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
              onClick: () => b(e.id),
              children: [
                t.jsx(Ki, {
                  size: 14
                }),
                a ? "\uD574\uC124 \uC811\uAE30" : "\uD574\uC124 \uBCF4\uAE30"
              ]
            }),
            e.kind === "choice" ? t.jsxs(D, {
              type: "button",
              variant: "secondary",
              size: "sm",
              disabled: u === `sim-${e.id}`,
              onClick: () => E(e),
              children: [
                t.jsx(Mt, {
                  size: 14
                }),
                "\uC720\uC0AC\uBB38\uC81C"
              ]
            }) : null,
            t.jsxs(D, {
              type: "button",
              variant: "secondary",
              size: "sm",
              disabled: u === `derived-${e.id}`,
              onClick: () => w(e),
              children: [
                t.jsx(us, {
                  size: 14
                }),
                "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131"
              ]
            })
          ]
        }),
        P ? t.jsx(vl, {
          question: e,
          busyKey: u,
          showContent: a,
          onGenerate: (V) => S(e, V)
        }) : null,
        P && e.kind === "choice" ? t.jsx(Cl, {
          question: e,
          focusOption: d,
          onFocusOptionChange: (V) => I(e.id, V),
          wrongExps: c,
          busyKey: u,
          onOpenAnalysisDock: (V, Z) => O(e.id, V, Z)
        }) : null,
        t.jsx(Nl, {
          questionId: e.id,
          value: m,
          onSave: (V) => B(e.id, V)
        })
      ]
    });
    return p ? t.jsx(We.div, {
      id: `q-card-${e.id}`,
      [lr]: e.id,
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
      onAnimationComplete: k,
      className: He,
      children: nt
    }) : t.jsx("div", {
      id: `q-card-${e.id}`,
      [lr]: e.id,
      className: He,
      children: nt
    });
  }
  const Rl = i.memo(Il), Ml = 12;
  function Al(e, n, s, r, o, a) {
    var _a2;
    const c = s[e.id] !== void 0 && String(s[e.id]).trim() !== "", d = !!(a || r[e.id]);
    if (n === "unanswered" && c) return false;
    if (n !== "wrong") return true;
    let m = false;
    return e.kind === "choice" && d && c && (m = s[e.id] !== e.answer), e.kind === "subjective" && d && (m = ((_a2 = o[e.id]) == null ? void 0 : _a2.verdict) === "wrong"), d && m;
  }
  function cr(e, n, s) {
    const r = document.getElementById(`q-card-${n}`);
    if (!r) return false;
    if (!e) return r.scrollIntoView({
      behavior: s,
      block: "start"
    }), true;
    const o = e.getBoundingClientRect(), a = r.getBoundingClientRect(), c = e.scrollTop + (a.top - o.top) - Ml;
    return e.scrollTo({
      top: Math.max(0, c),
      behavior: s
    }), true;
  }
  const Ll = i.memo(i.forwardRef(function({ questions: n, filter: s, scrollRef: r, userAnswers: o, graded: a, subjGrades: c, isSubmitted: d, expVisible: m, wrongExpsByQuestion: u, questionMemos: f, freshQuestionIds: p, busyId: k, examInProgress: h, resolveWrongExpFocusOption: y, onAnswerCommit: v, onSelectOption: z, onEditQuestion: N, onGradeChoice: $, onGradeSubjective: b, onRetry: E, onToggleExplanation: w, onSimilar: S, onDerived: I, onGenerateSections: O, onWrongExpFocusChange: B, onOpenAnalysisDock: F, onMemoSave: R, onClearFresh: _ }, q) {
    const K = i.useMemo(() => n.filter((A) => Al(A, s, o, a, c, d)), [
      s,
      a,
      d,
      n,
      c,
      o
    ]), P = i.useCallback((A) => {
      if (!K.some((le) => le.id === A)) return false;
      const T = r.current;
      return cr(T, A, "smooth") || requestAnimationFrame(() => {
        cr(T, A, "smooth");
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
        return t.jsx(Rl, {
          question: A,
          userAnswer: o[A.id],
          isSubmitted: d,
          isQuestionGraded: T,
          subjectiveGrade: c[A.id],
          showExplanation: !!m[A.id],
          wrongExpsForQuestion: u[A.id] ?? {},
          wrongExpFocusOption: y(A, typeof W == "number" ? W : void 0),
          questionMemo: f[A.id] || "",
          busyId: k,
          examInProgress: h,
          isFresh: !!p[A.id],
          onClearFresh: () => _(A.id),
          onAnswerCommit: v,
          onSelectOption: z,
          onEditQuestion: N,
          onGradeChoice: $,
          onGradeSubjective: b,
          onRetry: E,
          onToggleExplanation: w,
          onSimilar: S,
          onDerived: I,
          onGenerateSections: O,
          onWrongExpFocusChange: B,
          onOpenAnalysisDock: F,
          onMemoSave: R
        }, A.id);
      })
    });
  })), Ol = 320, Ql = Qt;
  function Tl(e, n) {
    if (n === "followup") return "\uCD94\uAC00 \uC9C8\uBB38";
    const s = e ? "\uC815\uB2F5 \uBD84\uC11D" : "\uC624\uB2F5 \uBD84\uC11D";
    return n === "regenerate" ? `${s} \uC7AC\uC0DD\uC131` : s;
  }
  function _l({ open: e, question: n, option: s, mode: r, existingAnalysis: o = "", llmProfiles: a, profileId: c, model: d, onProfileIdChange: m, onModelChange: u, busy: f, onClose: p, onGenerate: k }) {
    const [h, y] = i.useState(""), { width: v, handleProps: z, isResizing: N } = dt({
      storageKey: "quiz-choice-analysis-dock-width",
      defaultWidth: Ol,
      minWidth: 260,
      maxWidth: 560,
      edge: "right"
    }), $ = n != null && s != null && s === n.answer, b = Tl($, r), E = $ ? "border-emerald-200 dark:border-emerald-900/60" : "border-rose-200 dark:border-rose-900/60", w = $ ? "bg-emerald-50 dark:bg-emerald-950/40" : "bg-rose-50 dark:bg-rose-950/40", S = $ ? "text-emerald-900 dark:text-emerald-100" : "text-rose-900 dark:text-rose-100", I = r === "followup", O = I, B = !f && (!O || h.trim().length > 0);
    i.useEffect(() => {
      e && y("");
    }, [
      e,
      n == null ? void 0 : n.id,
      s,
      r
    ]);
    const F = i.useCallback((_) => {
      f || O && !h.trim() || _.key !== "Enter" || !_.metaKey && !_.ctrlKey || (_.preventDefault(), k(h));
    }, [
      f,
      k,
      h,
      O
    ]), R = e && n != null && s != null;
    return t.jsx(Tt, {
      motionKey: "quiz-choice-analysis-dock",
      open: R,
      width: v,
      isResizing: N,
      "aria-label": b,
      className: `flex h-full shrink-0 flex-col overflow-hidden border-l bg-white shadow-lg dark:bg-odp-surface ${E}`,
      children: n != null && s != null ? t.jsxs("div", {
        className: "relative h-full min-h-0",
        style: {
          width: v
        },
        children: [
          t.jsx(Ql, {
            edge: "left",
            handleProps: z,
            isResizing: N,
            visibleOnHover: true,
            label: "\uBD84\uC11D \uD328\uB110 \uB108\uBE44 \uC870\uC808"
          }),
          t.jsxs("div", {
            className: "flex h-full min-h-0 flex-col",
            children: [
              t.jsxs("div", {
                className: `flex items-center justify-between border-b px-3 py-2.5 ${E}`,
                children: [
                  t.jsx("div", {
                    className: "min-w-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong",
                    children: b
                  }),
                  t.jsx("button", {
                    type: "button",
                    "aria-label": "\uBD84\uC11D \uD328\uB110 \uB2EB\uAE30",
                    className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg",
                    onClick: p,
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
                    className: `rounded-lg px-2.5 py-2 text-[11px] ${w} ${S}`,
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
                  t.jsx(Or, {
                    profiles: a,
                    profileId: c,
                    model: d,
                    onProfileIdChange: m,
                    onModelChange: u,
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
                        value: h,
                        disabled: f,
                        onChange: (_) => y(_.target.value),
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
                className: `flex gap-2 border-t p-3 ${E}`,
                children: [
                  t.jsx(D, {
                    type: "button",
                    variant: "secondary",
                    size: "sm",
                    className: "flex-1",
                    disabled: f,
                    onClick: p,
                    children: "\uCDE8\uC18C"
                  }),
                  t.jsxs(D, {
                    type: "button",
                    variant: "primary",
                    size: "sm",
                    className: "flex-1",
                    disabled: !B,
                    onClick: () => k(h),
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
  const Dl = i.memo(_l);
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
    const r = Gl(s), o = as({
      ...e.config,
      sourcePaths: [
        ...e.config.sourcePaths
      ]
    });
    return {
      markdown: Sr(o, r, Yn),
      questions: r,
      config: o
    };
  }
  function Jl(e) {
    return e.toLowerCase().endsWith(es) ? e.slice(0, -es.length) : e.replace(/\.md$/i, "");
  }
  function dr(e, n) {
    const s = String(e || "").trim().replace(/\\/g, "/"), r = s.lastIndexOf("/"), o = r >= 0 ? s.slice(0, r + 1) : "", a = Jl(ui(s)), c = n != null && n > 1 ? `-\uD2C0\uB9B0\uBB38\uC81C-${n}` : "-\uD2C0\uB9B0\uBB38\uC81C";
    return `${o}${a}${c}${es}`;
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
  function gn(e) {
    return e != null && String(e).trim() !== "";
  }
  function Un(e) {
    const n = {};
    for (const s of e.questions) {
      const r = gn(e.userAnswers[s.id]);
      (e.isSubmitted && s.kind === "choice" ? true : !!e.gradedQuestions[s.id]) ? n[s.id] = true : r && (n[s.id] = false);
    }
    return Rt({
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
    const s = Rt(e ?? Yn), r = Rt(n ?? Yn);
    return JSON.stringify(s) === JSON.stringify(r);
  }
  function Kl(e) {
    return e != null && !is(e);
  }
  const Vl = 320, Vr = "s3haim_quiz_source_remove_confirm", Xl = Qt, Zl = (e) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-violet-400",
    e ? "border-violet-500 bg-violet-500 shadow-sm dark:border-violet-500 dark:bg-violet-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), Yl = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function Xr() {
    try {
      return localStorage.getItem(Vr) === "true";
    } catch {
      return false;
    }
  }
  function ec(e) {
    try {
      localStorage.setItem(Vr, String(e));
    } catch {
    }
  }
  function tc({ open: e, docConfig: n, sourcePathUsage: s, busyGenSources: r, onClose: o, onPreview: a, onRemove: c, onToggleEnabled: d, onOpenPicker: m, onGenerateFromTopic: u, onDropHostChange: f }) {
    const [p, k] = i.useState(Xr), { width: h, handleProps: y, isResizing: v } = dt({
      storageKey: "quiz-sources-dock-width",
      defaultWidth: Vl,
      minWidth: 240,
      maxWidth: 520,
      edge: "right"
    }), z = i.useCallback((N) => {
      k(N), ec(N);
    }, []);
    return t.jsx(Tt, {
      motionKey: "quiz-sources-dock",
      open: e,
      width: h,
      isResizing: v,
      "aria-label": "\uD30C\uC77C \uADFC\uAC70 \uBB38\uC11C",
      className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface",
      children: t.jsxs("div", {
        className: "relative flex h-full min-h-0 flex-col",
        style: {
          width: h
        },
        children: [
          t.jsx(Xl, {
            edge: "left",
            handleProps: y,
            isResizing: v,
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
                      t.jsx(Ar, {
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
                  t.jsx(ia, {
                    id: "quiz-source-remove-confirm",
                    className: Zl(p),
                    checked: p,
                    onCheckedChange: z,
                    "aria-label": "\uADFC\uAC70 \uBB38\uC11C \uC0AD\uC81C \uC2DC \uD655\uC778",
                    children: t.jsx(aa, {
                      className: Yl
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
              t.jsx(Fr, {
                layout: "dock",
                paths: n.sourcePaths,
                label: "\uC120\uD0DD\uB41C \uBB38\uC11C",
                onPreview: a,
                onRemove: c,
                isPathEnabled: (N) => mi(n, N),
                onToggleEnabled: d,
                onOpenPicker: m
              }),
              t.jsx(ql, {
                disabled: r,
                onGenerate: u
              })
            ]
          })
        ]
      })
    });
  }
  const nc = i.memo(tc), sc = /* @__PURE__ */ new Set([
    "markdown",
    "json",
    "html",
    "svg",
    "raw"
  ]), Gn = "h-full min-h-[240px] w-full resize-none border-0 bg-transparent p-3 font-mono text-xs text-slate-800 outline-none dark:text-odp-fgStrong";
  function rc(e) {
    return sc.has(String(e || ""));
  }
  function oc({ payload: e, editMode: n, editContent: s, onEditContentChange: r }) {
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
      className: Gn,
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
      className: Gn,
      value: s,
      onChange: (c) => r(c.target.value),
      spellCheck: false
    }) : t.jsx("iframe", {
      title: e.currentFile.name,
      srcDoc: s,
      sandbox: "",
      className: "h-full min-h-[240px] w-full border-0 bg-white"
    }) : n ? t.jsx("textarea", {
      className: Gn,
      value: s,
      onChange: (c) => r(c.target.value),
      spellCheck: false
    }) : t.jsx("pre", {
      className: "overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-xs text-slate-800 dark:text-odp-fgStrong",
      children: s
    });
  }
  const ic = Qt, jt = "z-100001 max-w-[min(92vw,420px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
  function ac({ path: e, onClose: n, loadDocument: s, onOpenDocument: r, onOpenInNewTab: o, embedded: a = false, width: c, resizeHandleProps: d, isResizing: m, resizeEdge: u = "right" }) {
    const [f, p] = i.useState(null), [k, h] = i.useState(true), [y, v] = i.useState(""), [z, N] = i.useState(false), [$, b] = i.useState(""), E = dt({
      storageKey: a ? void 0 : "vault-document-preview-panel-width",
      defaultWidth: 400,
      minWidth: 280,
      maxWidth: 640,
      edge: u === "left" ? "left" : "right"
    }), w = c ?? E.width, S = d ?? E.handleProps, I = m ?? E.isResizing;
    i.useEffect(() => {
      let R = false, _;
      return h(true), v(""), N(false), (async () => {
        var _a2;
        try {
          const q = await s(e);
          if (R) {
            (_a2 = q == null ? void 0 : q.revoke) == null ? void 0 : _a2.call(q);
            return;
          }
          _ = q == null ? void 0 : q.revoke, p(q), b((q == null ? void 0 : q.content) ?? ""), q || v("\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
        } catch (q) {
          R || (p(null), b(""), v(q instanceof Error ? q.message : "\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."));
        } finally {
          R || h(false);
        }
      })(), () => {
        R = true, _ == null ? void 0 : _();
      };
    }, [
      e,
      s
    ]);
    const O = i.useCallback(() => {
      N((R) => !R);
    }, []), B = Lt(e), F = f ? rc(f.currentFile.viewer) : false;
    return t.jsxs("aside", {
      className: `relative flex h-full flex-col overflow-hidden bg-white dark:bg-odp-surface ${a ? "min-w-0" : "shrink-0 border-r border-slate-200 dark:border-odp-borderSoft"}`,
      style: a ? void 0 : {
        width: w
      },
      "aria-label": "\uBB38\uC11C \uBBF8\uB9AC\uBCF4\uAE30",
      children: [
        t.jsx(ic, {
          edge: u,
          handleProps: S,
          isResizing: I,
          visibleOnHover: true,
          label: "\uBBF8\uB9AC\uBCF4\uAE30 \uD328\uB110 \uB108\uBE44 \uC870\uC808"
        }),
        t.jsx("div", {
          className: "flex items-center gap-1 border-b border-slate-200 px-2 py-2 dark:border-odp-borderSoft",
          children: t.jsxs(At, {
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
                  t.jsx(Re, {
                    children: t.jsxs(Me, {
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
              F ? t.jsxs(ze, {
                children: [
                  t.jsx(Ie, {
                    asChild: true,
                    children: t.jsx("button", {
                      type: "button",
                      className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                      "aria-label": z ? "\uBBF8\uB9AC\uBCF4\uAE30 \uBAA8\uB4DC" : "\uD3B8\uC9D1 \uBAA8\uB4DC",
                      onClick: O,
                      children: z ? t.jsx(Vi, {
                        size: 15
                      }) : t.jsx(wn, {
                        size: 15
                      })
                    })
                  }),
                  t.jsx(Re, {
                    children: t.jsxs(Me, {
                      side: "bottom",
                      sideOffset: 6,
                      className: jt,
                      children: [
                        z ? "\uBBF8\uB9AC\uBCF4\uAE30 \uBAA8\uB4DC" : "\uD3B8\uC9D1 \uBAA8\uB4DC",
                        t.jsx(Ae, {
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
                      children: t.jsx(Xi, {
                        size: 15
                      })
                    })
                  }),
                  t.jsx(Re, {
                    children: t.jsxs(Me, {
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
              r ? t.jsxs(ze, {
                children: [
                  t.jsx(Ie, {
                    asChild: true,
                    children: t.jsx("button", {
                      type: "button",
                      className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                      "aria-label": "\uC774 \uBB38\uC11C \uC5F4\uAE30",
                      onClick: () => r(e),
                      children: t.jsx(Zi, {
                        size: 15
                      })
                    })
                  }),
                  t.jsx(Re, {
                    children: t.jsxs(Me, {
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
                  t.jsx(Re, {
                    children: t.jsxs(Me, {
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
          children: k ? t.jsxs("div", {
            className: "flex h-full items-center justify-center gap-2 p-6 text-xs text-slate-500 dark:text-odp-muted",
            children: [
              t.jsx(kn, {
                size: 16,
                className: "animate-spin",
                "aria-hidden": true
              }),
              "\uBD88\uB7EC\uC624\uB294 \uC911\u2026"
            ]
          }) : y ? t.jsx("div", {
            className: "p-4 text-sm text-rose-600 dark:text-rose-400",
            children: y
          }) : f ? t.jsx(oc, {
            payload: f,
            editMode: z,
            editContent: $,
            onEditContentChange: b
          }) : null
        })
      ]
    });
  }
  const lc = 400;
  function cc({ path: e, onClose: n, loadDocument: s, onOpenDocument: r, onOpenInNewTab: o }) {
    const { width: a, handleProps: c, isResizing: d } = dt({
      storageKey: "quiz-source-preview-dock-width",
      defaultWidth: lc,
      minWidth: 280,
      maxWidth: 640,
      edge: "left"
    });
    return t.jsx(Tt, {
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
        children: t.jsx(ac, {
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
  const dc = i.memo(cc), mr = {
    correct: "bg-emerald-500",
    partial: "bg-amber-500",
    wrong: "bg-rose-500",
    ungraded: "bg-slate-400 dark:bg-slate-500"
  }, fr = {
    correct: "\uC815\uB2F5",
    partial: "\uBD80\uBD84",
    wrong: "\uC624\uB2F5",
    ungraded: "\uBBF8\uCC44\uC810"
  };
  function uc(e) {
    return e ? typeof e.score == "number" && Number.isFinite(e.score) ? Math.min(100, Math.max(0, e.score)) / 100 : e.verdict === "correct" ? 1 : e.verdict === "partial" ? 0.5 : 0 : null;
  }
  function mc(e) {
    var _a2;
    const { question: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a } = e, c = o || r[n.id], d = gn(s[n.id]);
    if (!c) return d ? "ungraded" : null;
    if (n.kind === "choice") return d ? s[n.id] === n.answer ? "correct" : "wrong" : null;
    const m = (_a2 = a[n.id]) == null ? void 0 : _a2.verdict;
    return m === "correct" ? "correct" : m === "partial" ? "partial" : m === "wrong" ? "wrong" : null;
  }
  function fc(e) {
    const { questions: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a } = e;
    let c = 0, d = 0, m = 0, u = 0, f = 0, p = 0;
    for (const y of n) {
      const v = s[y.id] !== void 0 && s[y.id] !== null && String(s[y.id]).trim() !== "";
      if (v && (u += 1), !(o || r[y.id])) continue;
      if (y.kind === "choice") {
        p += 1, s[y.id] === y.answer ? (c += 1, f += 1) : v && (d += 1);
        continue;
      }
      const N = a[y.id], $ = uc(N);
      $ != null && (p += 1, f += $, (N == null ? void 0 : N.verdict) === "correct" ? c += 1 : (N == null ? void 0 : N.verdict) === "partial" ? m += 1 : d += 1);
    }
    const k = n.length, h = k > 0 && p > 0 ? Math.round(f / k * 100) : null;
    return {
      correct: c,
      wrong: d,
      partial: m,
      answered: u,
      total: k,
      scorePercent: h
    };
  }
  const pc = 288, xc = Qt, hc = [
    "ungraded",
    "correct",
    "partial",
    "wrong"
  ], gc = {
    ungraded: "bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:text-slate-200 dark:ring-slate-600",
    correct: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800",
    partial: "bg-amber-50 text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800",
    wrong: "bg-rose-50 text-rose-800 ring-1 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-800"
  }, bc = "bg-slate-100 text-slate-400 ring-1 ring-transparent dark:bg-odp-bgSoft dark:text-odp-muted";
  function kc({ open: e, questions: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a, onClose: c, onNavigate: d }) {
    const [m, u] = i.useState({
      ungraded: true,
      correct: true,
      partial: true,
      wrong: true
    }), { width: f, handleProps: p, isResizing: k } = dt({
      storageKey: "quiz-toc-dock-width",
      defaultWidth: pc,
      minWidth: 220,
      maxWidth: 480,
      edge: "right"
    }), h = i.useCallback((v) => {
      u((z) => ({
        ...z,
        [v]: !z[v]
      }));
    }, []), y = _r();
    return t.jsx(Tt, {
      motionKey: "quiz-toc-dock",
      open: e,
      width: f,
      isResizing: k,
      "aria-label": "\uBB38\uC81C \uBAA9\uCC28",
      className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface",
      children: t.jsxs("div", {
        className: "relative flex h-full min-h-0 flex-col",
        style: {
          width: f
        },
        children: [
          t.jsx(xc, {
            edge: "left",
            handleProps: p,
            isResizing: k,
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
                      t.jsx(Lr, {
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
                children: hc.map((v) => {
                  const z = m[v];
                  return t.jsxs("button", {
                    type: "button",
                    "aria-pressed": z,
                    "aria-label": `\uBAA9\uCC28 ${fr[v]} ${z ? "\uD45C\uC2DC" : "\uC228\uAE40"}`,
                    className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors ${z ? gc[v] : bc}`,
                    onClick: () => h(v),
                    children: [
                      t.jsx("span", {
                        className: `h-2 w-2 shrink-0 rounded-full ${z ? mr[v] : "bg-slate-300 dark:bg-slate-600"}`,
                        "aria-hidden": true
                      }),
                      fr[v]
                    ]
                  }, v);
                })
              })
            ]
          }),
          t.jsx("ul", {
            className: "min-h-0 flex-1 space-y-1 overflow-y-auto p-3 text-xs",
            children: n.map((v, z) => {
              var _a2, _b;
              const N = !!v.similarOf, $ = /-파생\d+$/u.test(String(v.displayLabel || "")) ? "\uD30C\uC0DD\uBB38\uC81C" : "\uC720\uC0AC\uBB38\uC81C", b = mc({
                question: v,
                userAnswers: s,
                gradedQuestions: r,
                isSubmitted: o,
                subjectiveGrades: a
              });
              if (b && !m[b]) return null;
              const E = t.jsxs("button", {
                type: "button",
                className: `flex w-full items-center gap-2 rounded py-1.5 text-left hover:bg-slate-100 dark:hover:bg-odp-focusBg ${N ? "ml-3 border-l-2 border-violet-300 pl-2.5 text-[11px] text-violet-900 dark:border-violet-600 dark:text-violet-200" : "px-2"}`,
                title: N ? `${((_a2 = v.similarOf) == null ? void 0 : _a2.displayLabel) || ((_b = v.similarOf) == null ? void 0 : _b.id)}\uC758 ${$}` : void 0,
                onClick: () => d(v.id),
                children: [
                  t.jsx("span", {
                    className: "flex h-4 w-2 shrink-0 items-center justify-center",
                    "aria-hidden": true,
                    children: b ? t.jsx("span", {
                      className: `h-2 w-2 rounded-full ${mr[b]}`
                    }) : null
                  }),
                  t.jsxs("span", {
                    className: "min-w-0 truncate",
                    children: [
                      N ? t.jsx("span", {
                        className: "mr-1 text-violet-400 dark:text-violet-500",
                        children: "\u21B3"
                      }) : null,
                      v.displayLabel,
                      ". ",
                      v.question.slice(0, 40)
                    ]
                  })
                ]
              }), w = ja(z, y);
              return t.jsx(We.li, {
                initial: w.initial,
                animate: w.animate,
                transition: w.transition,
                children: E
              }, v.id);
            })
          })
        ]
      })
    });
  }
  const wc = i.memo(kc);
  async function Zr(e, n) {
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
  function Yr(e) {
    const n = [], s = /* @__PURE__ */ new Set();
    for (const r of e) {
      const o = String(r || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
      !o || s.has(o) || (s.add(o), n.push(o));
    }
    return n;
  }
  function yc(e) {
    return String(e || "").toLowerCase().split(/[^\p{L}\p{N}]+/u).map((n) => n.trim()).filter((n) => n.length >= 2).slice(0, 16);
  }
  function vc(e, n) {
    if (n.length === 0) return 1;
    const s = e.toLowerCase();
    let r = 0;
    for (const o of n) s.includes(o) && (r += 1);
    return r;
  }
  async function yn(e) {
    const n = Ne(), s = e.topK ?? n.ragTopK, r = e.maxChars ?? n.ragMaxChars, o = Yr(e.sourcePaths);
    if (o.length === 0) return {
      chunks: [],
      usedFallback: false
    };
    const a = await Zr(o, e.readText);
    if (a.length === 0) return {
      chunks: [],
      usedFallback: true
    };
    const c = yc(e.query), d = [];
    for (const f of a) fi(f.text, 12e3).forEach((k, h) => {
      k.trim() && d.push({
        path: f.path,
        excerpt: k,
        chunkIndex: h,
        score: vc(k, c)
      });
    });
    d.sort((f, p) => (p.score || 0) - (f.score || 0));
    const m = [];
    let u = 0;
    for (const f of d) {
      if (m.length >= s) break;
      if (u + f.excerpt.length > r) {
        const p = r - u;
        if (p < 200) break;
        m.push({
          ...f,
          excerpt: f.excerpt.slice(0, p)
        });
        break;
      }
      m.push(f), u += f.excerpt.length;
    }
    return {
      chunks: m,
      usedFallback: true
    };
  }
  function vn(e) {
    return e.length ? e.map((n) => `---
[${n.path}]
${n.excerpt}
`).join(`
`) : "";
  }
  async function Sc(e, n, s) {
    const r = Ne(), o = Math.max(4e3, s ?? Math.min(r.ragMaxChars, 2e5)), a = Yr(e);
    return a.length ? (await Zr(a, n)).map((d) => ({
      path: d.path,
      text: d.text.length > o ? `${d.text.slice(0, o)}

\u2026(truncated)` : d.text
    })) : [];
  }
  function jc(e) {
    return e.kind === "subjective" ? e.answerStyle === "essay" ? "\uC11C\uC220\uD615 \uC8FC\uAD00\uC2DD" : "\uB2E8\uB2F5\uD615 \uC8FC\uAD00\uC2DD" : `${e.choiceCount}\uC9C0\uC120\uB2E4 \uAC1D\uAD00\uC2DD`;
  }
  function Cc(e) {
    return `${Jr(e)}

[\uD30C\uC0DD\uBB38\uD56D \uC0DD\uC131 \u2014 \uCD94\uAC00 \uADDC\uCE59]
- \uC6D0\uBCF8 \uBB38\uD56D\uC758 \uD559\uC2B5 \uBAA9\uD45C\xB7\uD575\uC2EC \uAC1C\uB150\uC744 \uC720\uC9C0\uD558\uB418, \uC9C0\uC815\uB41C **\uCD9C\uC81C \uC720\uD615**\uC5D0 \uB9DE\uB294 \uC0C8 \uBB38\uD56D\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.
- \uAC1D\uAD00\uC2DD \u2194 \uC8FC\uAD00\uC2DD \uBCC0\uD658\uC774 \uC694\uCCAD\uB418\uBA74, \uB3D9\uC77C \uAC1C\uB150\uC744 \uD574\uB2F9 \uC720\uD615\uC5D0 \uB9DE\uAC8C \uC7AC\uAD6C\uC131\uD558\uC138\uC694.
- \uC0AC\uC6A9\uC790 \uCD94\uAC00 \uC694\uAD6C\uC0AC\uD56D\uC774 \uC788\uC73C\uBA74 \uBC18\uB4DC\uC2DC \uBC18\uC601\uD558\uC138\uC694.`;
  }
  function Nc(e) {
    var _a2;
    const n = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), s = String(e.explanation || "").trim(), r = String(e.target.userPrompt || "").trim(), o = jc(e.target), a = e.sourceKind === "subjective" ? e.sourceAnswerStyle === "essay" ? "\uC11C\uC220\uD615 \uC8FC\uAD00\uC2DD" : "\uB2E8\uB2F5\uD615 \uC8FC\uAD00\uC2DD" : `${e.options.length || e.target.choiceCount}\uC9C0\uC120\uB2E4 \uAC1D\uAD00\uC2DD`, c = e.sourceKind === "choice" && e.options.length > 0 ? `\uBCF4\uAE30: ${e.options.map((u, f) => `${f + 1}. ${u}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88
` : "";
    let d;
    if (e.target.kind === "subjective") d = `{"kind":"subjective","answerStyle":"${e.target.answerStyle === "essay" ? "essay" : "short"}","question":"...","modelAnswer":"...","point":"...","explanation":"..."}`;
    else {
      const u = e.target.choiceCount, f = e.targetAnswer ?? 1;
      d = `{"kind":"choice","question":"...","options":[${Array.from({
        length: u
      }, () => '"..."').join(",")}],"answer":${f},"point":"...","explanation":"..."}`;
    }
    const m = e.target.kind === "choice" && e.targetAnswer != null ? `\uC774\uBC88 \uC2E0\uADDC \uBB38\uC81C\uC758 \uC815\uB2F5 \uBC88\uD638\uB294 \uBC18\uB4DC\uC2DC ${e.targetAnswer}\uBC88\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.
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
${m}
[\uD544\uC218 \u2014 point / explanation]
- JSON\uC758 point\uC640 explanation\uC744 \uBC18\uB4DC\uC2DC \uD568\uAED8 \uCC44\uC6B0\uC138\uC694.
- point: \uC2E0\uADDC \uBB38\uD56D\uC758 \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C(1~3\uAC1C \uBD88\uB9BF \uB610\uB294 1~2\uBB38\uC7A5).
- explanation: \uC815\uB2F5 \uADFC\uAC70\uC640 \uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124.
- options \uAC01 \uD56D\uBAA9\uC5D0\uB294 1., a. \uAC19\uC740 \uBC88\uD638\xB7\uAE30\uD638 \uC811\uB450\uC0AC \uC5C6\uC774 \uC120\uD0DD\uC9C0 \uBCF8\uBB38\uB9CC \uC791\uC131\uD558\uC138\uC694.

JSON\uB9CC \uBC18\uD658:
${d}`;
  }
  function $c(e, n) {
    const s = String(n || "").trim().replace(/-(?:유사|파생)\d+$/u, "") || "1", r = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), o = new RegExp(`^${r}-\uD30C\uC0DD(\\d+)$`);
    let a = 0;
    for (const c of e) {
      const d = String(c.displayLabel || "").match(o);
      (d == null ? void 0 : d[1]) && (a = Math.max(a, Number.parseInt(d[1], 10)));
    }
    return `${s}-\uD30C\uC0DD${a + 1}`;
  }
  const pr = ".quiz", Pc = 96e3;
  function eo(e) {
    return String(e || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
  }
  function Ec(e) {
    const s = eo(e).replace(/\.quiz\.md$/i, "");
    return s ? `${pr}/${s}` : pr;
  }
  function zc(e) {
    return String(e || "").trim().replace(/[^a-zA-Z0-9._-]+/g, "_") || "log";
  }
  function Ic(e, n) {
    return `${Ec(e)}/${zc(n)}.md`;
  }
  function oe(e, n = Pc) {
    const s = String(e || "");
    return s.length <= n ? s : `${s.slice(0, n)}

\u2026 (${s.length - n} characters truncated)`;
  }
  function Wn(e, n) {
    const s = oe(n);
    return s.trim() ? `### ${e}

\`\`\`text
${s.replace(/```/g, "`\u200B``")}
\`\`\`
` : "";
  }
  function Rc(e, n) {
    const s = `- status: ${e.status}`, r = e.detail ? `- detail: ${e.detail}` : "", o = e.error ? `- error: ${e.error}` : "", a = [
      `## Step ${n + 1}: ${e.label} (${e.id})`,
      "",
      s,
      r,
      o,
      ""
    ];
    return e.systemPrompt && a.push(Wn("System prompt", e.systemPrompt)), e.llmInstruction && a.push(Wn("Instruction / input", e.llmInstruction)), e.llmResponse && a.push(Wn("Model response / artifact", e.llmResponse)), a.filter(Boolean).join(`
`);
  }
  function Mc(e, n) {
    const s = [
      "# Quiz generation log",
      "",
      `- quiz file: ${eo(n)}`,
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
      s.push(Rc(r, o)), s.push("---", "");
    }), `${s.join(`
`).trimEnd()}
`;
  }
  async function Ac(e) {
    const n = Ic(e.quizFilePath, e.logKey), s = Mc(e.job, e.quizFilePath);
    return await e.writeText(n, s), n;
  }
  const Lc = /^\d+\.\s*[a-zA-Z]\.\s*/, Oc = /^(?:\(\s*\d+\s*\)|\d+\)|\d+\.)\s*/, Qc = /^[a-zA-Z](?:\)|\.)\s*/, Tc = /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫]\s*/u, _c = /^[가나다라마바사아자차카타파하](?:\)|\.)\s*/u;
  function Dc(e) {
    let n = String(e || "").trim();
    if (!n) return n;
    for (let s = 0; s < 4; s += 1) {
      const r = n;
      if (n = n.replace(Lc, "").replace(Oc, "").replace(Qc, "").replace(Tc, "").replace(_c, "").trim(), n === r) break;
    }
    return n;
  }
  const rn = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uCD9C\uC81C\uC6A9 \uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uAC00\uC785\uB2C8\uB2E4.
\uC8FC\uC5B4\uC9C4 \uC6D0\uBB38\uC5D0\uC11C \uCD9C\uC81C\uC5D0 \uD544\uC694\uD55C \uAC1C\uB150\xB7\uC815\uC758\xB7\uACF5\uC2DD\xB7\uC808\uCC28\xB7\uC0AC\uB840\uB9CC \uC8FC\uC81C\uBCC4\uB85C \uC815\uB9AC\uD558\uC138\uC694.
- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC0AC\uC2E4\uC744 \uB9CC\uB4E4\uC9C0 \uB9C8\uC138\uC694.
- \uC218\uC2DD\uC740 \uC6D0\uBB38 \uD45C\uAE30\uB97C \uC720\uC9C0\uD558\uC138\uC694 ($...$ / $$...$$).
- \uC751\uB2F5\uC740 \uB9C8\uD06C\uB2E4\uC6B4 \uC694\uC57D\uBB38\uB9CC \uC791\uC131\uD558\uC138\uC694. JSON\xB7\uCF54\uB4DC\uD39C\uC2A4\xB7\uC11C\uB450\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.`;
  function Fc(e, n, s) {
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
  function qc(e) {
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
  async function Bc(e, n) {
    var _a2, _b, _c2;
    const s = Ne(), r = Array.isArray(e) ? e : [], o = at(r, ((_a2 = n == null ? void 0 : n.profileId) == null ? void 0 : _a2.trim()) || s.profileId || cs());
    if (!o) return {
      ready: false,
      message: "AI \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\xB7\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
    };
    const a = (((_b = n == null ? void 0 : n.model) == null ? void 0 : _b.trim()) || ((_c2 = s.modelId) == null ? void 0 : _c2.trim()) || ds(o.id, o.kind)).trim();
    if (o.kind === jr) {
      const c = Cr(), d = await Nr(c);
      if (!d.running) return {
        ready: false,
        message: "MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
      };
      const m = a || c.selectedModelId || d.models[0] || "";
      return m ? {
        ready: true,
        profile: o,
        model: m
      } : {
        ready: false,
        message: "\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694."
      };
    }
    if (o.kind === $r) {
      const c = Pr();
      let d = [];
      try {
        const u = await pi(c);
        if (d = Array.isArray(u.models) ? u.models : [], !u.running && !c.selectedModelId && !a) return {
          ready: false,
          message: "llama.cpp \uBAA8\uB378\uC774 \uC900\uBE44\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\xB7\uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
        };
      } catch {
        if (!c.selectedModelId && !a) return {
          ready: false,
          message: "llama.cpp \uBAA8\uB378\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694."
        };
      }
      const m = a || c.selectedModelId || d[0] || "";
      return m ? {
        ready: true,
        profile: o,
        model: m
      } : {
        ready: false,
        message: "\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694."
      };
    }
    return o.kind === Er ? (o.baseUrl || "").trim() ? a ? {
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
  function Uc(e) {
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
  function Gc(e) {
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
  function on(e, n) {
    const s = {
      ...e
    };
    return n.signal && (s.signal = n.signal), n.onChunk && (s.onChunk = n.onChunk), s;
  }
  async function ve(e) {
    var _a2, _b, _c2;
    const n = Ne(), s = Array.isArray(e.profiles) ? e.profiles : [], r = at(s, ((_a2 = e.profileId) == null ? void 0 : _a2.trim()) || n.profileId || cs());
    if (!r) throw new Error("AI \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\xB7\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
    const o = (((_b = e.model) == null ? void 0 : _b.trim()) || ((_c2 = n.modelId) == null ? void 0 : _c2.trim()) || ds(r.id, r.kind)).trim(), a = (e.systemPrompt || n.systemPrompt || "").trim(), c = e.instruction.trim(), d = {
      temperature: typeof e.temperature == "number" ? e.temperature : n.temperature
    }, m = {};
    if (e.signal && (m.signal = e.signal), e.onChunk && (m.onChunk = e.onChunk), r.kind === Er) {
      const u = (r.baseUrl || "").trim();
      if (!u) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return Nt(r.id, o), xi(o), qn(r.id, () => r.apiKey || "", (f) => er(on({
        baseUrl: u,
        apiKey: f,
        model: o,
        instruction: c,
        systemPrompt: a,
        selectedText: "",
        requestOptions: d
      }, m)), {
        allowEmpty: true,
        missingKeyMessage: "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
      });
    }
    if (r.kind === $r) {
      const u = Pr(), f = await hi(u, e.signal ? {
        signal: e.signal
      } : {}), p = (r.baseUrl || f.baseUrl || "").trim();
      if (!p) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      const k = o.trim() || u.selectedModelId || f.models[0] || "";
      if (!k) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      return Nt(r.id, k), qn(r.id, () => r.apiKey || u.apiKey || "no-key-required", (h) => er(on({
        baseUrl: p,
        apiKey: h,
        model: k,
        instruction: c,
        systemPrompt: a,
        selectedText: "",
        requestOptions: d
      }, m)), {
        allowEmpty: true,
        missingKeyMessage: "llama.cpp API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
      });
    }
    if (r.kind === jr) {
      const u = Cr(), f = await Nr(u);
      if (!f.running) throw new Error("MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
      const p = o.trim() || u.selectedModelId || f.models[0] || "";
      if (!p) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      return Nt(r.id, p), ha(on({
        instruction: c,
        systemPrompt: a,
        selectedText: "",
        requestOptions: d
      }, m));
    }
    if (pa(o)) throw new Error("\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    return Nt(r.id, o), gi(o), qn(r.id, () => r.apiKey || "", (u) => xa(on({
      apiKey: u,
      model: o,
      instruction: c,
      systemPrompt: a,
      selectedText: "",
      requestOptions: d
    }, m)), {
      missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694."
    });
  }
  function Ot(e, n, s) {
    const r = e && typeof e == "object" ? e : {};
    if ((r.kind === "subjective" ? "subjective" : (Array.isArray(r.options), "choice")) === "subjective") return {
      kind: "subjective",
      answerStyle: r.answerStyle === "essay" ? "essay" : "short",
      question: String(r.question || "").trim(),
      modelAnswer: String(r.modelAnswer || r.answer || "").trim(),
      point: String(r.point || "\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694."),
      explanation: String(r.explanation || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.")
    };
    const a = Array.isArray(r.options) ? r.options.map((d) => Dc(String(d || ""))).slice(0, n) : [];
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
  function ms(e) {
    var _a2, _b;
    const n = {};
    return e.signal && (n.signal = e.signal), e.onChunk && (n.onChunk = e.onChunk), ((_a2 = e.profileId) == null ? void 0 : _a2.trim()) && (n.profileId = e.profileId.trim()), ((_b = e.model) == null ? void 0 : _b.trim()) && (n.model = e.model.trim()), n.signal || n.onChunk || n.profileId || n.model ? n : void 0;
  }
  async function xr(e) {
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
    return Gc(De(a));
  }
  async function Wc(e) {
    var _a2;
    const n = e.question, s = n.options || [], r = e.selectedOption, o = r === n.answer, a = ((_a2 = e.userInstructions) == null ? void 0 : _a2.trim()) ? `
[\uC218\uD5D8\uC790 \uCD94\uAC00 \uC9C8\uBB38]
${e.userInstructions.trim()}
\uC704 \uC9C8\uBB38\uC5D0\uB3C4 \uB2F5\uBCC0\uD558\uC138\uC694.` : "", d = `${o ? `\uC218\uD5D8\uC790\uAC00 ${r}\uBC88(\uC815\uB2F5)\uC744 \uACE8\uB790\uC2B5\uB2C8\uB2E4. \uC65C \uC815\uB2F5\uC778\uC9C0, \uB2E4\uB978 \uBCF4\uAE30\uAC00 \uC65C \uD2C0\uB838\uB294\uC9C0 \uC124\uBA85\uD558\uC138\uC694.` : `\uC218\uD5D8\uC790\uAC00 ${r}\uBC88\uC744 \uACE8\uB790\uC2B5\uB2C8\uB2E4. \uC65C \uC624\uB2F5\uC778\uC9C0 \uC124\uBA85\uD558\uC138\uC694.`}

[\uBB38\uC81C] ${n.question}
[\uBCF4\uAE30]
${s.map((m, u) => `${u + 1}. ${m}`).join(`
`)}
[\uC815\uB2F5] ${n.answer}\uBC88
[\uC120\uD0DD\uD55C \uBCF4\uAE30] ${r}\uBC88 (${s[r - 1] || ""})
[\uAE30\uC874 \uD574\uC124] ${n.explanation || ""}
${a}

\uC124\uBA85 \uD14D\uC2A4\uD2B8\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
    return ve(Se(e.profiles, d, "\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124 \uC791\uC131\uC790\uC785\uB2C8\uB2E4.", 0.5, ms({
      signal: e.signal,
      onChunk: e.onChunk,
      profileId: e.profileId,
      model: e.model
    })));
  }
  async function Jc(e) {
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
    return ve(Se(e.profiles, o, "\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124 \uD29C\uD130\uC785\uB2C8\uB2E4. \uBB38\uC81C\uC640 \uAE30\uC874 \uBD84\uC11D \uB0B4\uC6A9\uB9CC \uADFC\uAC70\uB85C \uB2F5\uD558\uC138\uC694.", 0.5, ms({
      signal: e.signal,
      onChunk: e.onChunk,
      profileId: e.profileId,
      model: e.model
    })));
  }
  async function Hc(e) {
    const n = Ne(), s = e.question, r = Te(s, e.config.choiceCount || 4), o = Math.floor(Math.random() * r) + 1, a = (s.options || []).map((S) => String(S || "")), c = s.answer && s.answer >= 1 ? s.answer : 1, d = (S) => {
      var _a2;
      return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, S);
    };
    let m = "";
    const u = e.sourcePaths || [];
    if (u.length > 0 && e.readText) {
      d({
        step: "rag",
        status: "running",
        detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026"
      });
      const { chunks: S } = await yn({
        sourcePaths: u,
        query: `${s.question}
${s.point || ""}`,
        readText: e.readText
      });
      m = vn(S), d({
        step: "rag",
        status: "done",
        detail: S.length > 0 ? `${S.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C",
        llmInstruction: `query: ${s.question}`,
        llmResponse: oe(m || "(no excerpts)")
      });
    }
    const f = n.calcComplexity === "hand" ? "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5]" : "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uACC4\uC0B0\uAE30 \uD544\uC218]", p = Hr({
      question: s.question,
      options: a,
      answer: c,
      point: s.point || "",
      explanation: s.explanation || "",
      ...m ? {
        ragBlock: m
      } : {}
    }), k = Math.min(n.temperature, 0.6);
    d({
      step: "analysis",
      status: "running",
      detail: "LLM \uBB38\uD56D \uBD84\uC11D \uC911\u2026",
      llmInstruction: p,
      systemPrompt: lt
    });
    const h = await ve(Se(e.profiles, p, lt, k, Fe(e.signal))), y = Ur(De(h));
    d({
      step: "analysis",
      status: "done",
      detail: `${y.coreCategory}${y.isCalculation ? " \xB7 \uACC4\uC0B0\uBB38\uC81C" : ""}`,
      llmInstruction: p,
      llmResponse: oe(h),
      systemPrompt: lt
    });
    const v = ct(y);
    let z = "";
    if (y.isCalculation && y.variables.length > 0) {
      d({
        step: "randomize",
        status: "running",
        detail: "\uC218\uCE58 \uBCC0\uC218 \uC0D8\uD50C\uB9C1\u2026"
      });
      const S = Gr(y.variables);
      z = Wr(S);
      const I = S.map((O) => `${O.id}=${O.value}${O.unit ? O.unit : ""}`).join(", ");
      d({
        step: "randomize",
        status: "done",
        detail: I,
        llmInstruction: ct(y),
        llmResponse: oe(JSON.stringify({
          samples: S,
          variables: y.variables
        }, null, 2))
      });
    } else d({
      step: "randomize",
      status: "skipped",
      detail: "\uBE44\uACC4\uC0B0 \uBB38\uD56D",
      llmResponse: oe(ct(y))
    });
    const N = wl({
      question: s.question,
      options: a,
      answer: c,
      point: s.point || "",
      explanation: s.explanation || "",
      choiceCount: r,
      targetAnswer: o,
      complexity: f,
      analysisBlock: v,
      sampledBlock: z,
      ...m ? {
        ragBlock: m
      } : {}
    }), $ = Jr(n.systemPrompt || zr);
    d({
      step: "generate",
      status: "running",
      detail: "LLM \uBB38\uD56D \uC791\uC131 \uC911\u2026",
      llmInstruction: N,
      systemPrompt: $
    });
    const b = await ve(Se(e.profiles, N, $, n.temperature, Fe(e.signal))), E = De(b);
    d({
      step: "generate",
      status: "done",
      detail: `\uC815\uB2F5 ${o}\uBC88`,
      llmInstruction: N,
      llmResponse: oe(b),
      systemPrompt: $
    });
    let w = Ot(E, r, o);
    if (!hn(w)) {
      const S = ut(w.point), I = mt(w.explanation), O = Kr({
        question: w.question,
        options: w.options || [],
        answer: w.answer || o,
        analysisBlock: v,
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
      const B = await ve(Se(e.profiles, O, $, Math.min(n.temperature, 0.8), Fe(e.signal))), F = De(B), R = F && typeof F == "object" ? F : {};
      S && typeof R.point == "string" && R.point.trim() && (w = {
        ...w,
        point: String(R.point).trim()
      }), I && typeof R.explanation == "string" && R.explanation.trim() && (w = {
        ...w,
        explanation: String(R.explanation).trim()
      }), d({
        step: "generate",
        status: "done",
        detail: hn(w) ? "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC644\uB8CC" : "\uD574\uC124\xB7\uC811\uADFC Point \uC77C\uBD80 \uBCF4\uC644",
        llmInstruction: O,
        llmResponse: oe(B),
        systemPrompt: $
      });
    }
    return {
      ...w,
      isGenerated: true
    };
  }
  async function Kc(e) {
    const n = Ne(), s = e.question, r = Te(s, e.config.choiceCount || 4), o = e.target.kind === "choice" ? Je(e.target.choiceCount) : r, a = e.target.kind === "choice" ? Math.floor(Math.random() * o) + 1 : 1, c = (s.options || []).map((I) => String(I || "")), d = s.answer && s.answer >= 1 ? s.answer : 1, m = (I) => {
      var _a2;
      return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, I);
    };
    let u = "";
    const f = e.sourcePaths || [];
    if (f.length > 0 && e.readText) {
      m({
        step: "rag",
        status: "running",
        detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026"
      });
      const I = [
        s.question,
        s.point || "",
        e.target.userPrompt || ""
      ].filter(Boolean).join(`
`), { chunks: O } = await yn({
        sourcePaths: f,
        query: I,
        readText: e.readText
      });
      u = vn(O), m({
        step: "rag",
        status: "done",
        detail: O.length > 0 ? `${O.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C",
        llmInstruction: `query: ${I}`,
        llmResponse: oe(u || "(no excerpts)")
      });
    }
    const p = n.calcComplexity === "hand" ? "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5]" : "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uACC4\uC0B0\uAE30 \uD544\uC218]", k = Hr({
      question: s.question,
      options: c,
      answer: s.kind === "choice" ? d : 1,
      point: s.point || "",
      explanation: s.explanation || "",
      ...u ? {
        ragBlock: u
      } : {}
    }), h = Math.min(n.temperature, 0.6);
    m({
      step: "analysis",
      status: "running",
      detail: "LLM \uBB38\uD56D \uBD84\uC11D \uC911\u2026",
      llmInstruction: k,
      systemPrompt: lt
    });
    const y = await ve(Se(e.profiles, k, lt, h, Fe(e.signal))), v = Ur(De(y));
    m({
      step: "analysis",
      status: "done",
      detail: `${v.coreCategory}${v.isCalculation ? " \xB7 \uACC4\uC0B0\uBB38\uC81C" : ""}`,
      llmInstruction: k,
      llmResponse: oe(y),
      systemPrompt: lt
    });
    const z = ct(v);
    let N = "";
    if (v.isCalculation && v.variables.length > 0) {
      m({
        step: "randomize",
        status: "running",
        detail: "\uC218\uCE58 \uBCC0\uC218 \uC0D8\uD50C\uB9C1\u2026"
      });
      const I = Gr(v.variables);
      N = Wr(I);
      const O = I.map((B) => `${B.id}=${B.value}${B.unit ? B.unit : ""}`).join(", ");
      m({
        step: "randomize",
        status: "done",
        detail: O,
        llmInstruction: ct(v),
        llmResponse: oe(JSON.stringify({
          samples: I,
          variables: v.variables
        }, null, 2))
      });
    } else m({
      step: "randomize",
      status: "skipped",
      detail: "\uBE44\uACC4\uC0B0 \uBB38\uD56D",
      llmResponse: oe(ct(v))
    });
    const $ = Nc({
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
      complexity: p,
      analysisBlock: z,
      sampledBlock: N,
      ...e.target.kind === "choice" ? {
        targetAnswer: a
      } : {},
      ...u ? {
        ragBlock: u
      } : {}
    }), b = Cc(n.systemPrompt || zr);
    m({
      step: "generate",
      status: "running",
      detail: "\uD30C\uC0DD \uBB38\uD56D \uC791\uC131 \uC911\u2026",
      llmInstruction: $,
      systemPrompt: b
    });
    const E = await ve(Se(e.profiles, $, b, n.temperature, Fe(e.signal))), w = De(E);
    m({
      step: "generate",
      status: "done",
      detail: e.target.kind === "choice" ? `\uC815\uB2F5 ${a}\uBC88 \xB7 ${o}\uC9C0\uC120\uB2E4` : e.target.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615",
      llmInstruction: $,
      llmResponse: oe(E),
      systemPrompt: b
    });
    let S = Ot(w, o, a);
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
    }, !hn(S)) {
      const I = ut(S.point), O = mt(S.explanation), B = Kr({
        question: S.question,
        options: S.kind === "choice" ? S.options || [] : [],
        answer: S.kind === "choice" && S.answer ? S.answer : a,
        analysisBlock: z,
        missingPoint: I,
        missingExplanation: O
      });
      m({
        step: "generate",
        status: "running",
        detail: "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC911\u2026",
        llmInstruction: B,
        systemPrompt: b
      });
      const F = await ve(Se(e.profiles, B, b, Math.min(n.temperature, 0.8), Fe(e.signal))), R = De(F), _ = R && typeof R == "object" ? R : {};
      I && typeof _.point == "string" && _.point.trim() && (S = {
        ...S,
        point: String(_.point).trim()
      }), O && typeof _.explanation == "string" && _.explanation.trim() && (S = {
        ...S,
        explanation: String(_.explanation).trim()
      }), m({
        step: "generate",
        status: "done",
        detail: hn(S) ? "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC644\uB8CC" : "\uD574\uC124\xB7\uC811\uADFC Point \uC77C\uBD80 \uBCF4\uC644",
        llmInstruction: B,
        llmResponse: oe(F),
        systemPrompt: b
      });
    }
    return {
      ...S,
      isGenerated: true
    };
  }
  const Vc = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124\xB7\uC811\uADFC Point \uC791\uC131\uC790\uC785\uB2C8\uB2E4.
\uC8FC\uC5B4\uC9C4 \uBB38\uD56D\uB9CC \uADFC\uAC70\uB85C \uC811\uADFC Point\uC640 \uD574\uC124\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.
- \uC811\uADFC Point: \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C. \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC.
- \uD574\uC124: \uC815\uB2F5 \uADFC\uAC70\xB7\uD568\uC815\xB7\uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124. \uB9C8\uD06C\uB2E4\uC6B4 \uC0AC\uC6A9 \uAC00\uB2A5.
- placeholder \uBB38\uAD6C\uB098 \uBE48 \uBB38\uC790\uC5F4\uB85C \uCC44\uC6B0\uC9C0 \uB9C8\uC138\uC694.
\uC751\uB2F5\uC740 \uC694\uCCAD\uB41C JSON\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
  async function Xc(e) {
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
`), { chunks: p } = await yn({
        sourcePaths: o,
        query: f,
        readText: e.readText
      });
      r = vn(p);
    }
    const a = yl({
      question: s,
      missingPoint: e.missingPoint,
      missingExplanation: e.missingExplanation,
      ...r ? {
        ragBlock: r
      } : {}
    }), c = await ve(Se(e.profiles, a, ((_a2 = n.systemPrompt) == null ? void 0 : _a2.trim()) || Vc, Math.min(n.temperature, 0.8), ms({
      signal: e.signal,
      profileId: e.profileId,
      model: e.model
    }))), d = De(c), m = d && typeof d == "object" && !Array.isArray(d) ? d : {}, u = {};
    return e.missingPoint && typeof m.point == "string" && m.point.trim() && !ut(m.point) && (u.point = String(m.point).trim()), e.missingExplanation && typeof m.explanation == "string" && m.explanation.trim() && !mt(m.explanation) && (u.explanation = String(m.explanation).trim()), u;
  }
  async function Zc(e) {
    var _a2, _b, _c2, _d;
    const n = Ne(), s = Array.isArray(e.exampleQuestions) ? e.exampleQuestions : [], r = [
      ...s
    ].reverse().find((b) => b.kind === "choice"), o = r ? Te(r, e.config.choiceCount || 4) : e.config.choiceCount || 4, a = Math.min(5, Math.max(1, e.count || 1)), c = e.kind || "choice", d = (e.topic || "").trim(), m = (b) => {
      var _a3;
      return (_a3 = e.onStep) == null ? void 0 : _a3.call(e, b);
    };
    m({
      step: "load_sources",
      status: "running",
      detail: "\uBB38\uC11C \uC77D\uAE30 \uC911\u2026"
    }), (_a2 = e.onProgress) == null ? void 0 : _a2.call(e, "\uADFC\uAC70 \uBB38\uC11C \uB85C\uB4DC \uC911\u2026");
    const u = await Sc(e.sourcePaths, e.readText, n.ragMaxChars);
    if (!u.length) throw m({
      step: "load_sources",
      status: "error",
      error: "\uADFC\uAC70 \uBB38\uC11C\uC5D0\uC11C \uB0B4\uC6A9\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."
    }), new Error("\uADFC\uAC70 \uBB38\uC11C\uC5D0\uC11C \uB0B4\uC6A9\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    m({
      step: "load_sources",
      status: "done",
      detail: `${u.length}\uAC1C \uBB38\uC11C`,
      llmResponse: oe(u.map((b) => `- ${b.path} (${b.text.length.toLocaleString()} chars)`).join(`
`))
    });
    const f = qc(s), p = [];
    let k = "";
    for (let b = 0; b < u.length; b += 1) {
      const E = u[b];
      if (!E) continue;
      if ((_b = e.signal) == null ? void 0 : _b.aborted) throw new DOMException("Aborted", "AbortError");
      const w = `\uBB38\uC11C \uC694\uC57D ${b + 1}/${u.length}: ${E.path}`, S = `[\uCD9C\uC81C \uCC38\uACE0 \uBB38\uD56D \uC608\uC2DC]
\uC81C\uC2DC\uB41C \uBB38\uD56D \uC2A4\uD0C0\uC77C\xB7\uAC1C\uB150 \uBC94\uC704\uB97C \uCC38\uACE0\uD574, \uC544\uB798 \uC6D0\uBB38\uC5D0\uC11C \uCD9C\uC81C\uC5D0 \uD544\uC694\uD55C \uC815\uBCF4\uB9CC \uC8FC\uC81C\uBCC4\uB85C \uC0C1\uC138 \uC694\uC57D\uD558\uC138\uC694.

${f}

[\uC0AC\uC6A9\uC790 \uC8FC\uC81C]
${d || "(\uC608\uC2DC \uBB38\uD56D\xB7\uBB38\uC11C \uD575\uC2EC \uAC1C\uB150)"}

[\uADFC\uAC70 \uBB38\uC11C \uACBD\uB85C]
${E.path}

[\uADFC\uAC70 \uBB38\uC11C \uBCF8\uBB38]
${E.text}

\uC704 \uBCF8\uBB38\uC744 \uC8FC\uC81C\uBCC4 \uB9C8\uD06C\uB2E4\uC6B4 \uC694\uC57D\uC73C\uB85C\uB9CC \uC791\uC131\uD558\uC138\uC694.`;
      m({
        step: "summarize",
        status: "running",
        detail: w,
        llmInstruction: S,
        systemPrompt: rn,
        ...k ? {
          llmResponse: k
        } : {}
      }), (_c2 = e.onProgress) == null ? void 0 : _c2.call(e, w);
      const I = await ve(Se(e.profiles, S, rn, Math.min(n.temperature, 0.7), Fe(e.signal))), O = String(I || "").trim();
      O && (p.push({
        path: E.path,
        summary: O
      }), k += `### ${E.path}

${oe(O, 24e3)}

---

`, m({
        step: "summarize",
        status: "running",
        detail: w,
        llmInstruction: S,
        systemPrompt: rn,
        llmResponse: k
      }));
    }
    if (!p.length) throw m({
      step: "summarize",
      status: "error",
      error: "\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."
    }), new Error("\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    m({
      step: "summarize",
      status: "done",
      detail: `${p.length}\uAC1C \uC694\uC57D \uC644\uB8CC`,
      llmResponse: oe(k),
      systemPrompt: rn
    }), (_d = e.onProgress) == null ? void 0 : _d.call(e, "\uC694\uC57D\uBCF8\uC73C\uB85C \uBB38\uD56D \uC0DD\uC131 \uC911\u2026");
    const h = p.map((b, E) => `### \uC694\uC57D\uBCF8 ${E + 1}
\uACBD\uB85C: ${b.path}

${b.summary}`).join(`

---

`), y = `[\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uBCF8 (${p.length}\uAC1C)]
\uC544\uB798 \uC694\uC57D\uBCF8\uB9CC \uC0AC\uC2E4 \uADFC\uAC70\uB85C \uC0AC\uC6A9\uD558\uC138\uC694. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9\uC740 \uC4F0\uC9C0 \uB9C8\uC138\uC694.

${h}

[\uCD9C\uC81C \uC9C0\uC2DC]
\uC8FC\uC81C: ${d || "(\uC694\uC57D\uBCF8\uC758 \uD575\uC2EC \uAC1C\uB150)"}
\uBB38\uD56D \uC720\uD615: ${c === "subjective" ? "\uC8FC\uAD00\uC2DD" : `\uAC1D\uAD00\uC2DD ${o}\uC9C0\uC120\uB2E4`}
\uC0DD\uC131 \uAC1C\uC218: ${a}

\uAE30\uC874 \uBB38\uD56D \uC2A4\uD0C0\uC77C \uCC38\uACE0:
${f}

JSON \uBC30\uC5F4\uB9CC \uBC18\uD658\uD558\uC138\uC694.`, v = Fc(c, o, a);
    m({
      step: "generate",
      status: "running",
      detail: "LLM \uBB38\uD56D \uC791\uC131 \uC911\u2026",
      llmInstruction: y,
      systemPrompt: v
    });
    const z = await ve(Se(e.profiles, y, v, n.temperature, Fe(e.signal))), N = De(z), $ = Array.isArray(N) ? N : [
      N
    ];
    return m({
      step: "generate",
      status: "done",
      detail: `${Math.min($.length, a)}\uAC1C \uBB38\uD56D`,
      llmInstruction: y,
      llmResponse: oe(z),
      systemPrompt: v
    }), $.slice(0, a).map((b, E) => {
      if (c === "subjective") {
        const w = b && typeof b == "object" ? {
          ...b,
          kind: "subjective"
        } : {
          kind: "subjective"
        };
        return {
          ...Ot(w, o, E % o + 1),
          isGenerated: true
        };
      }
      return {
        ...Ot(b, o, E % o + 1),
        isGenerated: true
      };
    });
  }
  const Yc = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uBB38\uD56D \uD3B8\uC9D1\uC790\uC785\uB2C8\uB2E4. \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB294 \uBB38\uD56D\uC744 \uAD50\uC815\xB7\uC7AC\uC791\uC131\uD569\uB2C8\uB2E4.
- \uC0AC\uC2E4 \uAD00\uACC4\uB97C \uBC14\uB85C\uC7A1\uACE0, \uC9C0\uBB38\xB7\uC120\uD0DD\uC9C0\xB7\uC815\uB2F5\xB7\uD574\uC124\uC774 \uC2DC\uD5D8\uC5D0 \uC4F8 \uC218 \uC788\uC744 \uB9CC\uD07C \uC644\uACB0\uB418\uAC8C \uB9CC\uB4DC\uC138\uC694.
- \uC0AC\uC6A9\uC790\uAC00 \uBC29\uD5A5\uC744 \uC81C\uC2DC\uD558\uBA74 \uADF8\uC5D0 \uB9DE\uAC8C \uC8FC\uC81C\xB7\uB09C\uC774\uB3C4\xB7\uD615\uC2DD\uC744 \uC870\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.
- \uADFC\uAC70 \uBC1C\uCDCC\uAC00 \uC788\uC73C\uBA74 \uADF8 \uBC94\uC704 \uC548\uC5D0\uC11C\uB9CC \uC0AC\uC2E4\uC744 \uC0AC\uC6A9\uD558\uC138\uC694. \uC5C6\uB294 \uB0B4\uC6A9\uC744 \uC9C0\uC5B4\uB0B4\uC9C0 \uB9C8\uC138\uC694.
- \uAC1D\uAD00\uC2DD \uC120\uD0DD\uC9C0 \uC548\uC5D0\uC11C\uB294 \uC778\uB77C\uC778 \uC218\uC2DD($...$)\uB9CC \uC0AC\uC6A9\uD558\uC138\uC694.
- \uC751\uB2F5\uC740 JSON \uAC1D\uCCB4 \uD558\uB098\uB9CC \uBC18\uD658\uD558\uC138\uC694. \uB2E4\uB978 \uD14D\uC2A4\uD2B8\xB7\uB9C8\uD06C\uB2E4\uC6B4\xB7\uCF54\uB4DC\uD39C\uC2A4\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.`;
  function ed(e, n) {
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
  function td(e) {
    const n = e.config.choiceCount || 4, s = e.question, r = String(e.userInstructions || "").trim(), o = s.kind === "subjective" ? `\uC8FC\uAD00\uC2DD(${s.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615"})\uC744 \uC720\uC9C0\uD558\uC138\uC694. \uC0AC\uC6A9\uC790\uAC00 \uC720\uD615 \uBCC0\uACBD\uC744 \uBA85\uC2DC\uD558\uC9C0 \uC54A\uC558\uB2E4\uBA74 \uAC1D\uAD00\uC2DD\uC73C\uB85C \uBC14\uAFB8\uC9C0 \uB9C8\uC138\uC694.` : `\uAC1D\uAD00\uC2DD ${n}\uC9C0\uC120\uB2E4\uB97C \uC720\uC9C0\uD558\uC138\uC694. options \uAE38\uC774\uB294 \uC815\uD655\uD788 ${n}, answer\uB294 1~${n} \uC815\uC218\uC785\uB2C8\uB2E4.`, a = s.kind === "subjective" ? '{"kind":"subjective","answerStyle":"short"|"essay","question":"...","modelAnswer":"...","point":"...","explanation":"..."}' : `{"kind":"choice","question":"...","options":[${Array.from({
      length: n
    }, () => '"..."').join(",")}],"answer":1,"point":"...","explanation":"..."}`;
    return `\uB2E4\uC74C \uBB38\uD56D\uC740 \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB2E4\uACE0 \uAC04\uC8FC\uB429\uB2C8\uB2E4. \uAD50\uC815\uB41C \uC644\uC131 \uBB38\uD56D\uC744 JSON\uC73C\uB85C \uBC18\uD658\uD558\uC138\uC694.

${ed(s, n)}

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
  async function nd(e) {
    const n = Ne(), s = e.question, r = Te(s, e.config.choiceCount || 4), o = (k) => {
      var _a2;
      return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, k);
    }, a = s.kind === "choice" && s.answer && s.answer >= 1 ? Math.min(r, s.answer) : 1;
    let c = "";
    const d = e.sourcePaths || [];
    if (d.length > 0 && e.readText) {
      o({
        step: "rag",
        status: "running",
        detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026"
      });
      const k = [
        s.question,
        s.point || "",
        String(e.userInstructions || "").trim()
      ].filter(Boolean).join(`
`), { chunks: h } = await yn({
        sourcePaths: d,
        query: k,
        readText: e.readText
      });
      c = vn(h), o({
        step: "rag",
        status: "done",
        detail: h.length > 0 ? `${h.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C"
      });
    } else o({
      step: "rag",
      status: "skipped",
      detail: "\uADFC\uAC70 \uC5C6\uC74C"
    });
    const m = td({
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
    const u = await ve(Se(e.profiles, m, Yc, n.temperature, Fe(e.signal))), f = De(u), p = f && typeof f == "object" && !Array.isArray(f) ? f : Array.isArray(f) && f[0] ? f[0] : f;
    return o({
      step: "generate",
      status: "done",
      detail: "\uAD50\uC815 \uC644\uB8CC"
    }), Ot(p, r, a);
  }
  function sd(e) {
    const n = Array.from({
      length: e
    }, (s, r) => r);
    for (let s = n.length - 1; s > 0; s -= 1) {
      const r = Math.floor(Math.random() * (s + 1)), o = n[s];
      n[s] = n[r], n[r] = o;
    }
    return n;
  }
  function rd(e) {
    const n = /* @__PURE__ */ new Map();
    for (let s = 0; s < e.length; s += 1) {
      const r = e[s];
      n.set(r + 1, s + 1);
    }
    return n;
  }
  function od(e, n) {
    if (e.kind !== "choice") return null;
    const s = e.options || [];
    if (s.length < 2) return null;
    const r = n ?? sd(s.length);
    if (r.length !== s.length) return null;
    const o = r.map((u) => s[u] ?? ""), a = Math.max(0, (e.answer ?? 1) - 1), c = r.indexOf(a), d = c >= 0 ? c + 1 : e.answer, m = rd(r);
    return {
      question: {
        ...e,
        options: o,
        ...d != null ? {
          answer: d
        } : {}
      },
      oldToNew: m
    };
  }
  function id(e, n) {
    if (typeof e != "number" || !Number.isFinite(e)) return e;
    const s = Math.round(e);
    return n.get(s) ?? e;
  }
  function ad(e, n) {
    const s = {};
    for (const [r, o] of Object.entries(e)) {
      const a = r.lastIndexOf("_");
      if (a <= 0) continue;
      const c = r.slice(0, a), d = Number.parseInt(r.slice(a + 1), 10);
      if (!c || !Number.isFinite(d) || d < 1) continue;
      const m = n.get(c);
      if (!m) {
        s[r] = o;
        continue;
      }
      const u = m.get(d);
      u != null && (s[Ze(c, u)] = o);
    }
    return s;
  }
  function ld(e, n) {
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
  function cd(e) {
    const n = /* @__PURE__ */ new Map();
    let s = 0;
    const r = e.questions.map((m) => {
      var _a2;
      const u = od(m, (_a2 = e.permutationByQuestionId) == null ? void 0 : _a2.get(m.id));
      return u ? (n.set(m.id, u.oldToNew), s += 1, u.question) : m;
    }), o = {
      ...e.userAnswers
    };
    for (const m of e.questions) {
      if (m.kind !== "choice") continue;
      const u = n.get(m.id);
      if (!u) continue;
      const f = id(o[m.id], u);
      f !== void 0 && (o[m.id] = f);
    }
    const a = ad(e.wrongExps, n), c = ld(e.wrongExpFocus, n), d = ts(a);
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
  function dd(e, n, s) {
    const r = s.get(e);
    return r ? r.get(n) ?? null : n;
  }
  function hr(e, n, s) {
    const r = at(e, n);
    if (!r) return "";
    const o = String(s || "").trim();
    if (o) return o;
    const a = ds(r.id, r.kind).trim();
    return a || ki(r.kind);
  }
  function ud(e) {
    const [n, s] = i.useState(""), [r, o] = i.useState(""), a = i.useCallback(() => {
      var _a2;
      const u = Ne(), p = ((_a2 = at(e, u.profileId || cs())) == null ? void 0 : _a2.id) ?? "";
      s(p), o(hr(e, p, u.modelId));
    }, [
      e
    ]);
    i.useEffect(() => {
      a();
      const u = () => a();
      return window.addEventListener(pn, u), () => window.removeEventListener(pn, u);
    }, [
      a
    ]);
    const c = i.useCallback((u) => {
      const f = u.trim();
      s(f), bi(f);
      const p = at(e, f), k = p ? hr(e, p.id, null) : "";
      o(k), Ks({
        profileId: f || null,
        modelId: k || null
      });
    }, [
      e
    ]), d = i.useCallback((u) => {
      const f = u.trim();
      o(f), Ks({
        modelId: f || null
      });
      const p = at(e, n);
      p && Nt(p.id, f);
    }, [
      e,
      n
    ]), m = i.useMemo(() => {
      const u = {}, f = n.trim(), p = r.trim();
      return f && (u.profileId = f), p && (u.model = p), u;
    }, [
      n,
      r
    ]);
    return {
      profileId: n,
      model: r,
      onProfileIdChange: c,
      onModelChange: d,
      llmOpts: m,
      syncFromSettings: a
    };
  }
  const md = 0.12;
  function gr(e, n, s, r = 0) {
    const [o, a] = i.useState(true), c = i.useRef(true);
    return i.useEffect(() => {
      if (!s) {
        c.current = true, a(true);
        return;
      }
      let d = 0, m = null;
      const u = (h) => {
        c.current !== h && (c.current = h, a(h));
      }, f = () => {
        m == null ? void 0 : m.disconnect();
        const h = e.current, y = n.current;
        !h || !y || (m = new IntersectionObserver(([v]) => {
          v && (cancelAnimationFrame(d), d = requestAnimationFrame(() => {
            u(v.isIntersecting);
          }));
        }, {
          root: h,
          threshold: md
        }), m.observe(y));
      };
      f();
      const p = e.current, k = typeof ResizeObserver < "u" && p != null ? new ResizeObserver(() => {
        f();
      }) : null;
      return p != null && (k == null ? void 0 : k.observe(p)), () => {
        cancelAnimationFrame(d), m == null ? void 0 : m.disconnect(), k == null ? void 0 : k.disconnect();
      };
    }, [
      s,
      r,
      e,
      n
    ]), o;
  }
  function fd({ profiles: e, profileId: n, model: s, onProfileIdChange: r, onModelChange: o, busy: a = false }) {
    return t.jsxs("section", {
      "aria-label": "\uD034\uC988 AI \uC81C\uACF5\uC790",
      className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-odp-borderSoft dark:bg-odp-surface",
      children: [
        t.jsxs("div", {
          className: "mb-3 flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-odp-fgStrong",
          children: [
            t.jsx(Yi, {
              size: 14,
              className: "shrink-0 text-violet-600 dark:text-violet-400",
              "aria-hidden": true
            }),
            "AI \uC81C\uACF5\uC790"
          ]
        }),
        t.jsx(Or, {
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
  const pd = i.memo(fd);
  function xd(e) {
    return to(e).map((n) => n.id === "generate" ? {
      ...n,
      label: "\uD30C\uC0DD \uBB38\uD56D \uC0DD\uC131"
    } : n);
  }
  function to(e) {
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
  function hd() {
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
  function an(e, n = 72) {
    const s = String(e || "").replace(/\s+/g, " ").trim();
    return s.length <= n ? s : `${s.slice(0, n - 1)}\u2026`;
  }
  const no = "s3haim_quiz_gen_queue_panel_size", gd = 280, bd = 180, Jn = 380, Hn = 320;
  function so(e) {
    const n = Math.min(window.innerWidth * 0.92, 720), s = Math.min(window.innerHeight * 0.72, 640);
    return {
      width: Math.min(n, Math.max(gd, Math.round(e.width))),
      height: Math.min(s, Math.max(bd, Math.round(e.height)))
    };
  }
  function kd() {
    try {
      const e = typeof window < "u" ? window.localStorage.getItem(no) : null;
      if (!e) return {
        width: Jn,
        height: Hn
      };
      const n = JSON.parse(e);
      return so({
        width: Number(n.width) || Jn,
        height: Number(n.height) || Hn
      });
    } catch {
      return {
        width: Jn,
        height: Hn
      };
    }
  }
  function wd(e) {
    try {
      typeof window < "u" && window.localStorage.setItem(no, JSON.stringify(e));
    } catch {
    }
  }
  function yd(e, n) {
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
  function Kn() {
    return `quiz-gen-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
  function vd() {
    const [e, n] = i.useState([]), s = i.useRef(e);
    s.current = e;
    const [r, o] = i.useState(false), [a, c] = i.useState(() => kd()), d = i.useRef(false), m = i.useRef(false), u = i.useRef(false), f = i.useRef(0), p = i.useCallback((P) => {
      const A = so(P);
      c(A), wd(A);
    }, []), k = i.useCallback(() => {
      d.current = true;
    }, []), h = i.useCallback((P) => {
      m.current = P;
    }, []), y = i.useCallback((P) => {
      u.current = P;
    }, []), v = i.useCallback(() => m.current || u.current, []), z = i.useCallback(() => {
      d.current = true, o(true);
    }, []), N = i.useCallback(() => {
      d.current = false, m.current = false, u.current = false, o(false);
    }, []), $ = i.useCallback(() => {
      o(true);
    }, []), b = i.useCallback((P) => s.current.find((A) => A.id === P) ?? null, []), E = i.useCallback((P) => {
      const A = Kn(), W = {
        id: A,
        kind: "similar",
        questionLabel: P.displayLabel,
        questionPreview: an(P.preview),
        status: "running",
        steps: to(P.hasRag),
        createdAt: Date.now()
      };
      return n((T) => [
        W,
        ...T
      ]), $(), A;
    }, [
      $
    ]), w = i.useCallback((P) => {
      const A = Kn(), W = {
        id: A,
        kind: "derived",
        questionLabel: P.displayLabel,
        questionPreview: an(P.preview),
        status: "running",
        steps: xd(P.hasRag),
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
      const A = Kn(), W = ((_a2 = P.topic) == null ? void 0 : _a2.trim()) || an(P.preview) || "\uADFC\uAC70 \uAE30\uBC18 \uCD9C\uC81C", T = {
        id: A,
        kind: "source",
        questionPreview: an(W),
        status: "running",
        steps: hd(),
        createdAt: Date.now()
      };
      return n((le) => [
        T,
        ...le
      ]), $(), A;
    }, [
      $
    ]), I = i.useCallback((P, A) => {
      n((W) => W.map((T) => T.id === P ? yd(T, A) : T));
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
    }, []), R = i.useCallback((P, A) => {
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
      if (f.current = P, !r || !A || P > 0 || d.current || v()) return;
      const W = window.requestAnimationFrame(() => {
        d.current || v() || N();
      });
      return () => window.cancelAnimationFrame(W);
    }, [
      N,
      v,
      e,
      r
    ]), {
      jobs: e,
      panelOpen: r,
      panelSize: a,
      setPanelSize: p,
      openPanel: z,
      closePanel: N,
      setPanelOpen: o,
      markPanelUserEngaged: k,
      markPanelPointerEngaged: h,
      markPanelFocusEngaged: y,
      getJob: b,
      createSimilarJob: E,
      createDerivedJob: w,
      createSourceJob: S,
      updateJobStep: I,
      setJobLogPath: O,
      setJobResultQuestionId: B,
      completeJob: F,
      failJob: R,
      removeJob: _,
      clearFinishedJobs: q,
      hasActiveJobs: K
    };
  }
  function Vn(e, n, s) {
    return !e || s == null ? n : n + Math.max(0, Date.now() - s);
  }
  function Sd({ initialLog: e, hydrateKey: n = 0, onLogChange: s }) {
    const [r, o] = i.useState(() => ns(e ?? zt())), [a, c] = i.useState(0), d = i.useRef(null), m = i.useRef(s), u = i.useRef(e);
    m.current = s, u.current = e;
    const f = yt(r), p = r.events.length > 0, k = wi(r), h = vt(r);
    i.useEffect(() => {
      const b = ns(u.current ?? zt());
      o(b), yt(b) ? d.current = Date.now() : d.current = null;
    }, [
      n
    ]), i.useEffect(() => {
      if (!f) return;
      const b = window.setInterval(() => c((E) => E + 1), 200);
      return () => window.clearInterval(b);
    }, [
      f
    ]);
    const y = i.useMemo(() => Vn(f, h, d.current), [
      f,
      h,
      a
    ]), v = i.useCallback(() => {
      d.current = Date.now(), o((b) => {
        var _a2;
        const E = $t(b, "start", 0);
        return (_a2 = m.current) == null ? void 0 : _a2.call(m, E), E;
      });
    }, []), z = i.useCallback(() => {
      o((b) => {
        var _a2;
        if (!yt(b)) return b;
        const E = Vn(true, vt(b), d.current);
        d.current = null;
        const w = $t(b, "pause", E);
        return (_a2 = m.current) == null ? void 0 : _a2.call(m, w), w;
      });
    }, []), N = i.useCallback(() => {
      o((b) => {
        var _a2;
        if (yt(b)) return b;
        const E = vt(b);
        d.current = Date.now();
        const w = $t(b, "resume", E);
        return (_a2 = m.current) == null ? void 0 : _a2.call(m, w), w;
      });
    }, []), $ = i.useCallback(() => {
      o((b) => {
        var _a2;
        const E = yt(b) ? Vn(true, vt(b), d.current) : vt(b);
        d.current = null;
        const w = $t(b, "stop", E);
        return (_a2 = m.current) == null ? void 0 : _a2.call(m, w), w;
      });
    }, []);
    return {
      log: r,
      displayMs: y,
      running: f,
      started: p,
      examInProgress: k,
      start: v,
      pause: z,
      resume: N,
      stop: $
    };
  }
  function jd(e) {
    const n = e.lastIndexOf(".");
    return n >= 0 ? e.slice(n + 1).toLowerCase() : "";
  }
  function Ct(e) {
    if (e) try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }
  async function Cd({ backend: e, storageType: n, path: s }) {
    var _a2, _b;
    if (!e || !s) return null;
    const r = Lt(s), o = jd(r), a = [
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
      let p = await e.getObjectUrl(s);
      if (o === "heic" || o === "heif") {
        const h = await ((_a2 = e.readBytes) == null ? void 0 : _a2.call(e, s));
        if (h == null ? void 0 : h.body) {
          Ct(p);
          const y = h.body instanceof Uint8Array ? h.body : new Uint8Array(h.body), v = y.buffer.slice(y.byteOffset, y.byteOffset + y.byteLength);
          p = await vi(new Blob([
            v
          ]), r);
        }
      }
      const k = await ((_b = e.head) == null ? void 0 : _b.call(e, s));
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: "image",
          objectUrl: p,
          size: (k == null ? void 0 : k.contentLength) ?? null
        },
        content: "",
        revoke: () => Ct(p)
      };
    }
    if (o === "pdf" && e.readBytes) {
      const { body: p, contentLength: k } = await e.readBytes(s), h = p instanceof Uint8Array ? p : new Uint8Array(p), y = h.buffer.slice(h.byteOffset, h.byteOffset + h.byteLength), v = new Blob([
        y
      ], {
        type: "application/pdf"
      }), z = URL.createObjectURL(v);
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: "pdf",
          objectUrl: z,
          size: k ?? null
        },
        content: "",
        revoke: () => Ct(z)
      };
    }
    if (d.includes(o) && e.getObjectUrl) {
      const p = await e.getObjectUrl(s);
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: "audio",
          objectUrl: p
        },
        content: "",
        revoke: () => Ct(p)
      };
    }
    if (c.includes(o) && e.getObjectUrl) {
      const p = await e.getObjectUrl(s);
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: "video",
          objectUrl: p
        },
        content: "",
        revoke: () => Ct(p)
      };
    }
    if (!e.readText) return null;
    if (o === "json") {
      const { text: p, contentLength: k, lastModified: h } = await e.readText(s);
      let y = p;
      if (p.length <= 1e5) try {
        y = JSON.stringify(JSON.parse(p), null, 2);
      } catch {
        y = p;
      }
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: "json",
          content: y,
          ...k != null ? {
            size: k
          } : {},
          ...h != null ? {
            lastModified: h
          } : {}
        },
        content: y
      };
    }
    if (o === "html" || o === "htm" || o === "svg") {
      const { text: p, contentLength: k, lastModified: h } = await e.readText(s);
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: o === "svg" ? "svg" : "html",
          content: p,
          ...k != null ? {
            size: k
          } : {},
          ...h != null ? {
            lastModified: h
          } : {}
        },
        content: p
      };
    }
    if (o === "md" || o === "markdown" || o === "" || Yt(s) || Yt(r)) {
      const { text: p, contentLength: k, lastModified: h } = await e.readText(s);
      if (Yt(s) || Yt(r)) {
        const y = await Si(s, p);
        return y.status === "need-password" ? {
          currentFile: {
            type: n,
            id: s,
            name: r,
            viewer: "markdown",
            content: "",
            ...k != null ? {
              size: k
            } : {},
            encMd: true,
            ...h != null ? {
              lastModified: h
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
            content: y.text,
            ...k != null ? {
              size: k
            } : {},
            encMd: true,
            ...h != null ? {
              lastModified: h
            } : {}
          },
          content: y.text
        };
      }
      return {
        currentFile: {
          type: n,
          id: s,
          name: r,
          viewer: "markdown",
          content: p,
          ...k != null ? {
            size: k
          } : {},
          ...h != null ? {
            lastModified: h
          } : {}
        },
        content: p
      };
    }
    const { text: m, contentLength: u, lastModified: f } = await e.readText(s);
    return {
      currentFile: {
        type: n,
        id: s,
        name: r,
        viewer: "raw",
        content: m,
        ...u != null ? {
          size: u
        } : {},
        ...f != null ? {
          lastModified: f
        } : {}
      },
      content: m
    };
  }
  async function Nd(e, n) {
    const s = String(e || "").trim();
    if (!s) return null;
    const { storageType: r, localTree: o, webdavTree: a, idbTree: c, s3Tree: d, localRootHandle: m } = n;
    let u = null;
    return r === ln ? u = Pt(o, s) || Et(o, s) || (m ? await ji(m, s) : null) : r === cn ? u = Pt(a, s) || Et(a, s) : r === dn ? u = Pt(c, s) || Et(c, s) : u = Pt(d, s) || Et(d, s), (u == null ? void 0 : u.type) !== "file" ? {
      type: "file",
      path: s,
      name: Lt(s)
    } : {
      type: "file",
      path: String(u.path || s),
      name: String(u.name || Lt(s)),
      ...u.lastModified != null ? {
        lastModified: u.lastModified
      } : {}
    };
  }
  const $d = 2e4, br = "flex h-6 max-h-6 min-w-0 items-center overflow-hidden", Pd = "z-100010 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", kr = "flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-gray-800 outline-none hover:bg-gray-100 focus:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg dark:focus:bg-odp-focusBg";
  ru = function({ content: e, onChange: n, onSave: s, currentFile: r, onResolveWikiImageUrl: o, llmProviderProfiles: a = [], isActiveFile: c = true, isSurfaceLive: d = true, registerToolbar: m, registerFileManagement: u }) {
    const { showToast: f } = Ci(), { showAlert: p } = Ni(), k = $i(), h = vd(), { storageMode: y, s3Tree: v, localTree: z, webdavTree: N, idbTree: $, localRootHandle: b, getBackendForType: E, loadLocalFolderChildren: w, loadWebdavFolderChildren: S, loadIdbFolderChildren: I } = Pi(), { openAdvancedSearchFile: O, selectFileRaw: B } = Ei(), F = i.useCallback((l) => {
      k == null ? void 0 : k.openAssist(), f({
        message: l || "AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\xB7\uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
        durationMs: 3500
      });
    }, [
      k,
      f
    ]), R = ud(a), _ = i.useCallback(async (l) => {
      const x = await Bc(a, {
        ...R.llmOpts,
        ...l
      });
      return x.ready ? true : (F(x.message), false);
    }, [
      a,
      F,
      R.llmOpts
    ]), q = i.useCallback((l, x, g) => {
      const C = (x instanceof Error ? x.message : "") || g;
      if (Uc(C)) {
        F(C);
        return;
      }
      if (C.length >= 48 || C.includes(`
`)) {
        p({
          title: l,
          message: C
        });
        return;
      }
      f({
        message: C,
        durationMs: 4e3
      });
    }, [
      F,
      p,
      f
    ]), K = i.useMemo(() => y === ln ? z : y === cn ? N : y === dn ? $ : v, [
      y,
      z,
      N,
      $,
      v
    ]), P = y === ln ? "local" : y === cn ? "webdav" : y === dn ? "idb" : "s3", A = P, W = i.useCallback(async (l) => {
      const x = E(P);
      return Cd({
        backend: x,
        storageType: A,
        path: l
      });
    }, [
      E,
      P,
      A
    ]), T = i.useCallback((l) => {
      O(l);
    }, [
      O
    ]), le = i.useCallback(async (l) => {
      const x = await Nd(l, {
        storageType: A,
        localTree: z,
        webdavTree: N,
        idbTree: $,
        s3Tree: v,
        localRootHandle: b
      });
      if (x) {
        await B(P, x, {
          background: true
        });
        return;
      }
      O(l);
    }, [
      A,
      z,
      N,
      $,
      v,
      b,
      B,
      P,
      O
    ]), He = i.useCallback((l) => {
      pt(true), xt(l);
    }, []), nt = i.useCallback(() => {
      pt(false), xt(null);
    }, []), V = i.useCallback(async (l) => {
      const x = E(P);
      if (!(x == null ? void 0 : x.readText)) return null;
      const { text: g } = await x.readText(l);
      return typeof g == "string" ? g : null;
    }, [
      E,
      P
    ]), Z = i.useCallback(async (l, x) => {
      const g = r == null ? void 0 : r.id;
      if (!g) return;
      await new Promise((M) => {
        window.setTimeout(M, 0);
      });
      const C = h.getJob(l);
      if (!C) return;
      const L = E(P);
      if (L == null ? void 0 : L.writeText) try {
        const M = await Ac({
          quizFilePath: g,
          logKey: x,
          job: C,
          writeText: (U, G) => L.writeText(U, G, "text/markdown; charset=utf-8")
        });
        h.setJobLogPath(l, M);
      } catch {
      }
    }, [
      r == null ? void 0 : r.id,
      h,
      E,
      P
    ]), ne = i.useCallback((l, x, g) => {
      h.updateJobStep(l, g), Z(l, x);
    }, [
      h,
      Z
    ]), Q = i.useCallback(async (l) => {
      y === ln ? await (w == null ? void 0 : w(l)) : y === cn ? await (S == null ? void 0 : S(l)) : y === dn && await (I == null ? void 0 : I(l));
    }, [
      y,
      w,
      S,
      I
    ]), [j, ce] = i.useState(() => it(e)), fe = i.useRef(e), Sn = i.useRef(false), _t = i.useRef(false), Le = i.useRef(null), de = i.useRef(j);
    de.current = j;
    const [se, Ke] = i.useState({}), [ie, Be] = i.useState({}), fs = i.useRef(ie);
    fs.current = ie;
    const [ro, $e] = i.useState({}), [ae, jn] = i.useState({}), [Oe, ke] = i.useState({}), et = i.useRef(Oe);
    et.current = Oe;
    const [Dt, st] = i.useState({}), [ue, Ue] = i.useState(null), [me, tt] = i.useState({}), [pe, Ft] = i.useState(false), [Cn, ft] = i.useState("all"), [Nn, ps] = i.useState(false), [qt, pt] = i.useState(false), [oo, xt] = i.useState(null), [io, $n] = i.useState(false), [ht, Pn] = i.useState(null), [Ve, xe] = i.useState(null), [xs, Bt] = i.useState(false), [he, Ut] = i.useState(null), [rt, En] = i.useState(null), [hs, zn] = i.useState(false), [Ge, Gt] = i.useState(null), [ao, Wt] = i.useState({}), In = i.useRef(null), Rn = i.useRef(null), je = i.useRef(null), gt = i.useRef(null), gs = i.useRef(null), bs = i.useRef(null), [we, bt] = i.useState(() => zt()), [lo, Mn] = i.useState(0), re = Sd({
      initialLog: we,
      hydrateKey: lo,
      onLogChange: bt
    }), ks = i.useRef(() => 0);
    ks.current = () => re.displayMs;
    const co = i.useMemo(() => j.questions.map((l) => ({
      id: l.id,
      displayLabel: l.displayLabel
    })), [
      j.questions
    ]);
    zl({
      scrollRootRef: gt,
      questions: co,
      running: re.running,
      getElapsedMs: () => ks.current(),
      timeLog: we,
      onLogChange: bt
    });
    const Xe = i.useCallback(() => Un({
      questions: de.current.questions,
      userAnswers: se,
      gradedQuestions: ie,
      subjectiveGrades: me,
      isSubmitted: pe,
      ...Bn(we) ? {} : {
        timeLog: we
      },
      wrongChoiceExplanations: ts(Oe),
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
    ]), Jt = i.useCallback(() => {
      if (!_t.current || !c) return false;
      const l = Xe();
      if (!Kl(l)) return false;
      const x = it(fe.current).session;
      if (!ur(l, x)) return true;
      const g = typeof (r == null ? void 0 : r.content) == "string" ? r.content : "";
      if (!g) return true;
      const C = it(g).session;
      return !ur(l, C);
    }, [
      Xe,
      r == null ? void 0 : r.content,
      c
    ]), Ht = i.useCallback((l) => {
      const x = ns(l == null ? void 0 : l.timeLog);
      if (bt(x), Mn((C) => C + 1), !l || is(l)) {
        Ke({}), Be({}), $e({}), ke({}), st({}), Ue(null), jn({}), tt({}), Ft(false);
        return;
      }
      Ke({
        ...l.userAnswers
      }), Be({
        ...l.gradedQuestions
      }), tt({
        ...l.subjectiveGrades
      }), Ft(l.isSubmitted), ke(zi(l.wrongChoiceExplanations)), jn({
        ...l.questionMemos ?? {}
      }), st({}), Ue(null);
      const g = {};
      for (const [C, L] of Object.entries(l.gradedQuestions)) L && (g[C] = true);
      $e(g);
    }, []), ge = i.useCallback((l, x) => {
      const g = Sr(l.config, l.questions, x);
      Sn.current = true, fe.current = g, n(g);
    }, [
      n
    ]), Kt = i.useCallback(() => {
      if (!_t.current) return;
      Le.current != null && (clearTimeout(Le.current), Le.current = null);
      const l = Xe();
      ge(de.current, l);
    }, [
      Xe,
      ge
    ]), ot = i.useCallback(async (l) => {
      if (!(!Ne().autoSaveOnAiGenerate || typeof s != "function")) {
        if (l) {
          const x = Un({
            questions: de.current.questions,
            userAnswers: se,
            gradedQuestions: ie,
            subjectiveGrades: me,
            isSubmitted: pe,
            ...Bn(we) ? {} : {
              timeLog: we
            },
            wrongChoiceExplanations: ts(l),
            ...St(ae) ? {} : {
              questionMemos: ae
            }
          });
          ge(de.current, x);
        } else Kt();
        await s(null, {
          skipCoverChangeCheck: true,
          skipSuffixCheck: true,
          contentOverride: fe.current
        });
      }
    }, [
      Kt,
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
      if (fe.current = e, Sn.current) {
        Sn.current = false;
        return;
      }
      const l = it(e);
      ce(l), Ht(l.session);
    }, [
      e,
      Ht
    ]), i.useEffect(() => {
      const l = it(fe.current);
      Ht(l.session), _t.current = true;
    }, [
      Ht
    ]), i.useEffect(() => {
      if (!_t.current) return;
      const l = Xe();
      return Le.current != null && clearTimeout(Le.current), Le.current = setTimeout(() => {
        Le.current = null, ge(de.current, l);
      }, $d), () => {
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
    const ws = i.useCallback(async () => {
      const l = Wl(de.current, {
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
      const x = r == null ? void 0 : r.id;
      if (!x) return;
      const g = E(P);
      if (!(g == null ? void 0 : g.writeText)) {
        f({
          message: "\uC800\uC7A5\uC18C\uC5D0 \uC4F8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
          durationMs: 3e3
        });
        return;
      }
      try {
        const C = await Hl(x, async (L) => {
          if (!g.head) return false;
          try {
            return await g.head(L), true;
          } catch {
            return false;
          }
        });
        await g.writeText(C, l.markdown, "text/markdown; charset=utf-8"), await O(C), f({
          message: `\uD2C0\uB9B0 \uBB38\uC81C ${l.questions.length}\uAC1C\uB97C \uC0C8 \uD034\uC988\uB85C \uCD94\uCD9C\uD588\uC2B5\uB2C8\uB2E4.`,
          durationMs: 4e3
        });
      } catch (C) {
        q("\uD2C0\uB9B0\uBB38\uC81C \uCD94\uCD9C", C, "\uD30C\uC77C\uC744 \uC0DD\uC131\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      }
    }, [
      se,
      ie,
      pe,
      me,
      r == null ? void 0 : r.id,
      E,
      P,
      O,
      f,
      q
    ]);
    i.useEffect(() => {
      if (!c || wr()) return;
      const l = (x) => {
        Jt() && (x.preventDefault(), x.returnValue = "");
      };
      return window.addEventListener("beforeunload", l), () => window.removeEventListener("beforeunload", l);
    }, [
      c,
      Jt
    ]);
    const be = i.useCallback((l) => {
      const x = {
        ...l,
        config: tr(l.config, l.questions)
      };
      de.current = x, ce(x);
      const g = Xe();
      ge(x, g);
    }, [
      Xe,
      ge
    ]), ys = i.useCallback(() => {
      const l = de.current, x = cd({
        questions: l.questions,
        userAnswers: se,
        wrongExps: Oe,
        wrongExpFocus: Dt
      });
      if (x.shuffledQuestionCount <= 0) {
        f({
          message: "\uC120\uD0DD\uC9C0\uAC00 2\uAC1C \uC774\uC0C1\uC778 \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
          durationMs: 2800
        });
        return;
      }
      Ke(x.userAnswers), ke(x.wrongExps), st(x.wrongExpFocus), Ue((L) => {
        if (!L) return null;
        const M = dd(L.questionId, L.option, x.optionMapsByQuestionId);
        return M == null ? null : {
          ...L,
          option: M
        };
      });
      const g = {
        ...l,
        questions: x.questions,
        config: tr(l.config, x.questions)
      };
      ce(g);
      const C = Un({
        questions: g.questions,
        userAnswers: x.userAnswers,
        gradedQuestions: ie,
        subjectiveGrades: me,
        isSubmitted: pe,
        ...Bn(we) ? {} : {
          timeLog: we
        },
        wrongChoiceExplanations: x.wrongChoiceExplanations,
        ...St(ae) ? {} : {
          questionMemos: ae
        }
      });
      ge(g, C), f({
        message: `${x.shuffledQuestionCount}\uAC1C \uBB38\uD56D\uC758 \uC120\uD0DD\uC9C0 \uC21C\uC11C\uB97C \uBCC0\uACBD\uD588\uC2B5\uB2C8\uB2E4.`,
        durationMs: 3200
      });
    }, [
      se,
      Oe,
      Dt,
      ie,
      me,
      pe,
      we,
      ae,
      ge,
      f
    ]);
    i.useEffect(() => {
      if (!(!c || !d || !u)) return u({
        extractWrongQuestions: ws,
        shuffleChoiceOptions: ys,
        hasUnsavedProgress: Jt,
        flushBeforeSave: Kt
      }), () => u(null);
    }, [
      c,
      d,
      u,
      ws,
      ys,
      Jt,
      Kt
    ]);
    const An = i.useCallback((l) => {
      const x = de.current;
      be({
        ...x,
        config: Ii(x.config, l)
      }), xt((g) => g === l ? null : g);
    }, [
      be
    ]), uo = i.useCallback((l, x) => {
      const g = de.current;
      be({
        ...g,
        config: Ri(g.config, l, x)
      });
    }, [
      be
    ]), mo = i.useCallback((l) => {
      if (Xr()) {
        Pn(l);
        return;
      }
      An(l);
    }, [
      An
    ]), { setQuizSourceDropActive: Ln, setQuizSourceDropHost: Vt, handleRegisterQuizSourceDrop: On } = Mi(), vs = i.useRef(null), Ss = i.useRef(null), js = i.useRef(null), Cs = i.useRef(null), Ns = i.useRef(Ge);
    Ns.current = Ge;
    const Xt = i.useCallback(() => {
      const l = vs.current ?? Ss.current;
      js.current !== l && (js.current = l, Vt(l));
    }, [
      Vt
    ]), fo = i.useCallback((l) => {
      vs.current = l, Xt();
    }, [
      Xt
    ]), po = i.useCallback((l) => {
      Ss.current = l, Xt();
    }, [
      Xt
    ]);
    i.useEffect(() => () => Vt(null), [
      Vt
    ]);
    const $s = i.useCallback((l, x) => l !== P ? null : Pt(K, x) || Et(K, x), [
      P,
      K
    ]), Ps = (r == null ? void 0 : r.id) || null, Es = i.useCallback((l) => {
      var _a2;
      if (!l.length) return;
      const x = Ns.current;
      if (x == null ? void 0 : x.onDone) {
        const L = new Set(x.paths);
        for (const M of l) L.add(M);
        x.onDone([
          ...L
        ].sort((M, U) => M.localeCompare(U))), f({
          message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`,
          durationMs: 2500
        });
        return;
      }
      if (x) {
        (_a2 = Cs.current) == null ? void 0 : _a2.call(Cs, l), f({
          message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`,
          durationMs: 2500
        });
        return;
      }
      const g = de.current, C = [
        .../* @__PURE__ */ new Set([
          ...g.config.sourcePaths,
          ...l
        ])
      ].sort((L, M) => L.localeCompare(M));
      be({
        ...g,
        config: {
          ...g.config,
          sourcePaths: C
        }
      }), f({
        message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`,
        durationMs: 2500
      });
    }, [
      be,
      f
    ]), zs = i.useCallback((l) => {
      const x = Ai(l, $s, {
        excludePath: Ps
      });
      x.length && Es(x);
    }, [
      Ps,
      $s,
      Es
    ]);
    i.useEffect(() => (On(zs), () => On(null)), [
      On,
      zs
    ]), i.useEffect(() => (Ln(c && d && (!!Ge || qt)), () => Ln(false)), [
      c,
      d,
      Ge,
      qt,
      Ln
    ]);
    const J = i.useMemo(() => fc({
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
    ]), Is = c && d && J.total > 0, xo = gr(gt, gs, Is, j.questions.length), ho = gr(gt, bs, Is, j.questions.length), go = i.useMemo(() => Tr(j.questions, j.config.choiceCount), [
      j.questions,
      j.config.choiceCount
    ]), Rs = i.useMemo(() => Li(j.config), [
      j.config.sourcePaths,
      j.config.disabledSourcePaths
    ]), bo = i.useMemo(() => {
      const l = {};
      for (const [x, g] of Object.entries(Oe)) {
        const C = x.indexOf("_"), L = C >= 0 ? x.slice(0, C) : x, M = l[L] ?? (l[L] = {});
        M[x] = g;
      }
      return l;
    }, [
      Oe
    ]), Zt = i.useMemo(() => ue && j.questions.find((l) => l.id === ue.questionId) || null, [
      ue,
      j.questions
    ]), ko = i.useCallback((l, x, g) => {
      Ue({
        questionId: l,
        option: x,
        mode: g
      });
    }, []), ye = a, Ms = i.useCallback(() => {
      Ke({}), Be({}), $e({}), ke({}), st({}), Ue(null), tt({}), Ft(false), bt(zt()), Mn((l) => l + 1), ge(de.current, Rt({
        ...St(ae) ? {} : {
          questionMemos: ae
        }
      }));
    }, [
      ge,
      ae
    ]), wo = i.useCallback(() => {
      Ke({}), Be({}), $e({}), ke({}), st({}), Ue(null), tt({}), Ft(false);
      const l = $t(zt(), "start", 0);
      bt(l), Mn((x) => x + 1), ge(de.current, Rt({
        timeLog: l,
        ...St(ae) ? {} : {
          questionMemos: ae
        }
      }));
    }, [
      ge,
      ae
    ]), As = i.useMemo(() => j.questions.some((l) => gn(se[l.id])), [
      j.questions,
      se
    ]), Ls = i.useCallback(() => {
      if (As) {
        $n(true);
        return;
      }
      re.start();
    }, [
      As,
      re
    ]);
    i.useEffect(() => {
      if (!(!c || !d || !m)) return m(t.jsx(cl, {
        stopwatch: re,
        onRequestStart: Ls
      })), () => m(null);
    }, [
      c,
      d,
      m,
      re.displayMs,
      re.running,
      re.started,
      re.start,
      re.pause,
      re.resume,
      re.stop,
      Ls
    ]);
    const yo = i.useCallback((l) => {
      Be((x) => {
        const g = {
          ...x
        };
        return delete g[l.id], g;
      }), tt((x) => {
        const g = {
          ...x
        };
        return delete g[l.id], g;
      }), $e((x) => {
        const g = {
          ...x
        };
        return delete g[l.id], g;
      }), ke((x) => {
        const g = {
          ...x
        };
        for (const C of Object.keys(g)) (C === l.id || C.startsWith(`${l.id}_`)) && delete g[C];
        return g;
      });
    }, []), vo = i.useCallback((l, x) => {
      fs.current[l] || Ke((g) => ({
        ...g,
        [l]: x
      }));
    }, []), So = i.useCallback((l) => {
      re.examInProgress || (Be((x) => ({
        ...x,
        [l.id]: true
      })), $e((x) => ({
        ...x,
        [l.id]: true
      })));
    }, [
      re.examInProgress
    ]), jo = i.useCallback(async (l, x) => {
      var _a2;
      if (re.examInProgress) return;
      const g = String(x ?? se[l.id] ?? "").trim();
      if (!g) {
        f({
          message: "\uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694.",
          durationMs: 2200
        });
        return;
      }
      if (!await _()) return;
      xe(l.id), (_a2 = je.current) == null ? void 0 : _a2.abort();
      const C = new AbortController();
      je.current = C;
      try {
        const L = await xr({
          profiles: ye,
          question: l,
          userAnswer: g,
          signal: C.signal
        });
        tt((M) => ({
          ...M,
          [l.id]: L
        })), Be((M) => ({
          ...M,
          [l.id]: true
        })), $e((M) => ({
          ...M,
          [l.id]: true
        })), x !== void 0 && Ke((M) => ({
          ...M,
          [l.id]: x
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
    ]), Co = i.useCallback((l, x) => {
      Ke((g) => g[l] === x ? g : {
        ...g,
        [l]: x
      });
    }, []), No = i.useCallback((l) => {
      Ut(l), Bt(true);
    }, []), $o = i.useCallback((l) => {
      $e((x) => ({
        ...x,
        [l]: !x[l]
      }));
    }, []), Po = i.useCallback((l) => {
      En(l);
    }, []), Eo = i.useCallback((l, x) => {
      st((g) => ({
        ...g,
        [l]: x
      }));
    }, []), zo = i.useCallback((l, x) => {
      jn((g) => {
        if (!x.trim()) {
          const { [l]: L, ...M } = g;
          return M;
        }
        return {
          ...g,
          [l]: x
        };
      });
    }, []), Io = i.useCallback((l) => {
      Wt((x) => {
        if (!x[l]) return x;
        const g = {
          ...x
        };
        return delete g[l], g;
      });
    }, []), kt = i.useCallback((l) => {
      var _a2;
      ((_a2 = In.current) == null ? void 0 : _a2.scrollToQuestionId(l)) || (Rn.current = l);
    }, []);
    i.useEffect(() => {
      var _a2;
      const l = Rn.current;
      l && ((_a2 = In.current) == null ? void 0 : _a2.scrollToQuestionId(l)) && (Rn.current = null);
    }, [
      j.questions,
      Cn,
      se,
      ie,
      pe,
      me
    ]);
    const Ro = async () => {
      re.examInProgress && re.stop();
      const l = j.questions.filter((C) => !(!gn(se[C.id]) || ie[C.id] || C.kind === "subjective" && me[C.id]));
      if (l.length === 0) {
        f({
          message: "\uCC44\uC810\uD560 \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.",
          durationMs: 2200
        });
        return;
      }
      const x = l.filter((C) => C.kind === "choice"), g = l.filter((C) => C.kind === "subjective");
      if (x.length > 0 && (Be((C) => {
        const L = {
          ...C
        };
        for (const M of x) L[M.id] = true;
        return L;
      }), $e((C) => {
        const L = {
          ...C
        };
        for (const M of x) L[M.id] = true;
        return L;
      })), g.length > 0) {
        if (!await _()) return;
        for (const C of g) {
          const L = String(se[C.id] || "").trim();
          if (L) try {
            const M = await xr({
              profiles: ye,
              question: C,
              userAnswer: L
            });
            tt((U) => ({
              ...U,
              [C.id]: M
            })), Be((U) => ({
              ...U,
              [C.id]: true
            })), $e((U) => ({
              ...U,
              [C.id]: true
            }));
          } catch {
          }
        }
      }
      f({
        message: `${l.length}\uAC1C \uD56D\uBAA9 \uCC44\uC810 \uC644\uB8CC`,
        durationMs: 2200
      });
    }, Os = async (l) => {
      if (!await _()) return;
      xe(`sim-${l.id}`);
      const x = tn(j.config, l), g = h.createSimilarJob({
        displayLabel: String(l.displayLabel || l.id),
        preview: l.question,
        hasRag: x.length > 0
      }), C = g;
      try {
        const L = await Hc({
          profiles: ye,
          question: l,
          config: j.config,
          sourcePaths: x,
          readText: V,
          onStep: (X) => ne(g, C, X)
        }), M = String(l.displayLabel || l.id).split("-\uC720\uC0AC")[0] || "1";
        let U = 0;
        const G = new RegExp(`^${M.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-\uC720\uC0AC(\\d+)$`);
        for (const X of j.questions) {
          const Pe = String(X.displayLabel).match(G);
          (Pe == null ? void 0 : Pe[1]) && (U = Math.max(U, Number.parseInt(Pe[1], 10)));
        }
        const Y = `${M}-\uC720\uC0AC${U + 1}`, ee = {
          ...L,
          id: `gen-${Date.now()}`,
          displayLabel: Y,
          isGenerated: true,
          similarOf: {
            id: l.id,
            displayLabel: String(l.displayLabel || l.id)
          },
          ...x.length ? {
            sourcePaths: x
          } : {}
        };
        h.updateJobStep(g, {
          step: "finalize",
          status: "running",
          detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026"
        }), Z(g, ee.id);
        const H = j.questions.findIndex((X) => X.id === l.id), te = [
          ...j.questions
        ];
        te.splice(H + 1, 0, ee), ft("all"), Wt((X) => ({
          ...X,
          [ee.id]: true
        })), be({
          ...j,
          questions: te
        }), h.setJobResultQuestionId(g, ee.id), h.updateJobStep(g, {
          step: "finalize",
          status: "done",
          detail: Y,
          llmResponse: JSON.stringify(ee, null, 2)
        }), h.completeJob(g, Y), Z(g, ee.id), f({
          message: `${Y} \uC720\uC0AC\uBB38\uC81C \uCD94\uAC00`,
          durationMs: 2500
        }), await ot(), window.setTimeout(() => {
          kt(ee.id);
        }, 80);
      } catch (L) {
        const M = (L instanceof Error ? L.message : "") || "\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
        h.failJob(g, M), Z(g, C), q("\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", L, "\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Qs = async (l, x) => {
      var _a2;
      const g = R.llmOpts;
      if (!await _(g)) return;
      const C = (x === "point" || x === "both") && ut(l.point || ""), L = (x === "explanation" || x === "both") && mt(l.explanation || "");
      if (!C && !L) {
        f({
          message: "\uC774\uBBF8 \uC811\uADFC Point\uC640 \uD574\uC124\uC774 \uC788\uC2B5\uB2C8\uB2E4.",
          durationMs: 2200
        });
        return;
      }
      const M = `sections-${l.id}`;
      xe(M), (_a2 = je.current) == null ? void 0 : _a2.abort();
      const U = new AbortController();
      je.current = U;
      try {
        const G = tn(j.config, l), Y = await Xc({
          profiles: ye,
          question: l,
          missingPoint: C,
          missingExplanation: L,
          sourcePaths: G,
          readText: V,
          ...g,
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
    }, Ts = async (l, x) => {
      if (!await _()) return;
      xe(`derived-${l.id}`);
      const g = tn(j.config, l), C = h.createDerivedJob({
        displayLabel: String(l.displayLabel || l.id),
        preview: l.question,
        hasRag: g.length > 0
      }), L = C;
      try {
        const M = await Kc({
          profiles: ye,
          question: l,
          config: j.config,
          target: x,
          sourcePaths: g,
          readText: V,
          onStep: (H) => ne(C, L, H)
        }), U = $c(j.questions, String(l.displayLabel || l.id)), G = {
          ...M,
          id: `gen-${Date.now()}`,
          displayLabel: U,
          isGenerated: true,
          similarOf: {
            id: l.id,
            displayLabel: String(l.displayLabel || l.id)
          },
          ...g.length ? {
            sourcePaths: g
          } : {}
        };
        h.updateJobStep(C, {
          step: "finalize",
          status: "running",
          detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026"
        }), Z(C, G.id);
        const Y = j.questions.findIndex((H) => H.id === l.id), ee = [
          ...j.questions
        ];
        ee.splice(Y + 1, 0, G), ft("all"), Wt((H) => ({
          ...H,
          [G.id]: true
        })), be({
          ...j,
          questions: ee
        }), h.setJobResultQuestionId(C, G.id), h.updateJobStep(C, {
          step: "finalize",
          status: "done",
          detail: U,
          llmResponse: JSON.stringify(G, null, 2)
        }), h.completeJob(C, U), Z(C, G.id), En(null), f({
          message: `${U} \uD30C\uC0DD\uBB38\uC81C \uCD94\uAC00`,
          durationMs: 2500
        }), await ot(), window.setTimeout(() => {
          kt(G.id);
        }, 80);
      } catch (M) {
        const U = (M instanceof Error ? M.message : "") || "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
        h.failJob(C, U), Z(C, L), q("\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", M, "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Mo = i.useCallback((l, x) => {
      var _a2;
      const g = Dt[l.id], C = ((_a2 = l.options) == null ? void 0 : _a2.length) || 0;
      return g != null && g >= 1 && g <= C ? g : x != null && x >= 1 && x <= C ? x : 1;
    }, [
      Dt
    ]), _s = async (l, x, g, C = "create") => {
      var _a2, _b;
      const L = x === l.answer, M = R.llmOpts;
      if (C === "followup") {
        const H = String(g || "").trim();
        if (!H) {
          f({
            message: "\uCD94\uAC00 \uC9C8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694.",
            durationMs: 2200
          });
          return;
        }
        if (!await _(M)) return;
        const te = Ze(l.id, x), X = String(et.current[te] || "").trim();
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
          const Ee = await Jc({
            profiles: ye,
            question: l,
            selectedOption: x,
            existingAnalysis: X,
            userQuestion: H,
            ...M,
            signal: Pe.signal,
            onChunk: (Vo) => {
              const Xo = Oi(X, Vo);
              ke((Zo) => ({
                ...Zo,
                [te]: Xo
              }));
            }
          }), wt = Qi(Ee, Ce), Ko = Ti(X, wt, Ce), Dn = {
            ...et.current,
            [te]: Ko
          };
          et.current = Dn, ke(Dn), Ue(null), await ot(Dn);
        } catch (Ee) {
          if (Pe.signal.aborted) return;
          ke((wt) => ({
            ...wt,
            [te]: X
          })), q("\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0 \uC2E4\uD328", Ee, "\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0 \uC2E4\uD328");
        } finally {
          xe(null);
        }
        return;
      }
      const U = _i(g, L);
      if (!await _(M)) return;
      const G = Ze(l.id, x), Y = C === "regenerate" ? String(et.current[G] || "").trim() : "";
      xe(G), C !== "regenerate" && ke((H) => ({
        ...H,
        [G]: ""
      })), (_b = je.current) == null ? void 0 : _b.abort();
      const ee = new AbortController();
      je.current = ee;
      try {
        const H = await Wc({
          profiles: ye,
          question: l,
          selectedOption: x,
          userInstructions: U,
          ...M,
          signal: ee.signal,
          onChunk: (Pe) => {
            const Ce = C === "regenerate" ? Di(Y, Pe) : Pe;
            ke((Ee) => ({
              ...Ee,
              [G]: Ce
            }));
          }
        }), te = C === "regenerate" ? Fi(Y, H) : H, X = {
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
          return C === "regenerate" && Y ? X[G] = Y : String(X[G] || "").trim() || delete X[G], X;
        }), q("\uC624\uB2F5 \uD574\uC124 \uC2E4\uD328", H, "\uC624\uB2F5 \uD574\uC124 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Ds = async (l) => {
      var _a2, _b, _c2;
      const x = j.config.sourcePaths.length, g = vr(j.config);
      if (!x) {
        pt(true), f({
          message: "\uD30C\uC77C \uADFC\uAC70 \uBB38\uC11C\uB97C \uBA3C\uC800 \uC120\uD0DD\uD558\uC138\uC694.",
          durationMs: 2800
        });
        return;
      }
      if (!g.length) {
        pt(true), f({
          message: "\uC0AC\uC6A9 \uC911\uC778 \uADFC\uAC70 \uBB38\uC11C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uCCB4\uD06C\uBC15\uC2A4\uB85C \uADFC\uAC70\uB97C \uD65C\uC131\uD654\uD558\uC138\uC694.",
          durationMs: 3200
        });
        return;
      }
      if (!await _()) return;
      xe("gen-sources"), (_a2 = je.current) == null ? void 0 : _a2.abort();
      const C = new AbortController();
      je.current = C;
      const L = h.createSourceJob({
        preview: ((_b = j.questions[0]) == null ? void 0 : _b.question) || "\uADFC\uAC70 \uAE30\uBC18 \uCD9C\uC81C",
        topic: l
      }), M = L;
      try {
        const U = await Zc({
          profiles: ye,
          config: j.config,
          sourcePaths: g,
          topic: l,
          kind: "choice",
          count: 1,
          exampleQuestions: j.questions,
          readText: V,
          signal: C.signal,
          onStep: (Ce) => ne(L, M, Ce)
        });
        if (!U.length) throw new Error("\uC0DD\uC131\uB41C \uBB38\uD56D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
        const G = Number.parseInt(rs(j.questions), 10) || 1, Y = Date.now(), ee = U.map((Ce, Ee) => ({
          ...Ce,
          id: `gen-src-${Y}-${Ee}`,
          displayLabel: String(G + Ee),
          isGenerated: true,
          ...g.length ? {
            sourcePaths: [
              ...g
            ]
          } : {}
        })), H = (_c2 = ee[0]) == null ? void 0 : _c2.id, te = ee.map((Ce) => Ce.displayLabel).join(", "), X = H || L;
        h.updateJobStep(L, {
          step: "finalize",
          status: "running",
          detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026"
        }), Z(L, X);
        const Pe = [
          ...j.questions,
          ...ee
        ];
        ft("all"), H && Wt((Ce) => {
          const Ee = {
            ...Ce
          };
          for (const wt of ee) Ee[wt.id] = true;
          return Ee;
        }), be({
          ...j,
          questions: Pe
        }), H && h.setJobResultQuestionId(L, H), h.updateJobStep(L, {
          step: "finalize",
          status: "done",
          detail: te,
          llmResponse: JSON.stringify(ee, null, 2)
        }), h.completeJob(L, te), Z(L, X), f({
          message: `\uADFC\uAC70 \uAE30\uBC18 \uBB38\uC81C ${ee.length}\uAC1C \uCD94\uAC00`,
          durationMs: 2500
        }), await ot(), H && window.setTimeout(() => {
          kt(H);
        }, 80);
      } catch (U) {
        if (C.signal.aborted) {
          h.failJob(L, "\uCDE8\uC18C\uB428"), Z(L, M);
          return;
        }
        const G = (U instanceof Error ? U.message : "") || "\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
        h.failJob(L, G), Z(L, M), q("\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", U, "\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
      } finally {
        xe(null);
      }
    }, Fs = i.useRef(Ds);
    Fs.current = Ds;
    const Ao = i.useCallback((l) => {
      Fs.current(l);
    }, []), Lo = i.useCallback(async ({ instructions: l, form: x }) => {
      var _a2, _b;
      if (!he || !await _()) return null;
      (_a2 = je.current) == null ? void 0 : _a2.abort();
      const g = new AbortController();
      je.current = g;
      const C = qr(x, he.displayLabel);
      C.id = he.id, C.displayLabel = he.displayLabel, he.similarOf && (C.similarOf = he.similarOf), he.isGenerated && (C.isGenerated = he.isGenerated);
      const L = tn(j.config, C);
      try {
        const M = await nd({
          profiles: ye,
          question: C,
          config: j.config,
          userInstructions: l,
          sourcePaths: L,
          readText: V,
          signal: g.signal
        }), U = Te(C, j.config.choiceCount), G = {
          kind: M.kind,
          displayLabel: he.displayLabel,
          question: M.question,
          point: M.point,
          explanation: M.explanation,
          ...((_b = x.sourcePaths) == null ? void 0 : _b.length) ? {
            sourcePaths: x.sourcePaths
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
        return g.signal.aborted || q("\uBB38\uC81C \uACE0\uCE58\uAE30 \uC2E4\uD328", M, "\uBB38\uC81C \uACE0\uCE58\uAE30 \uC2E4\uD328"), null;
      }
    }, [
      j.config,
      he,
      _,
      ye,
      V,
      q,
      f
    ]), Oo = i.useMemo(() => ({
      getPresignedUrl: o,
      currentNotePath: (r == null ? void 0 : r.id) ?? null,
      hydrationEnabled: d
    }), [
      r == null ? void 0 : r.id,
      d,
      o
    ]), qs = i.useRef(_s);
    qs.current = _s;
    const Bs = i.useRef(Os);
    Bs.current = Os;
    const Us = i.useRef(Qs);
    Us.current = Qs;
    const Gs = i.useRef(Zt);
    Gs.current = Zt;
    const Qn = i.useRef(ue);
    Qn.current = ue;
    const Tn = i.useRef(rt);
    Tn.current = rt;
    const Ws = i.useRef(Ts);
    Ws.current = Ts;
    const Qo = i.useCallback((l) => {
      Bs.current(l);
    }, []), To = i.useCallback((l, x) => {
      Us.current(l, x);
    }, []), _o = i.useCallback((l) => {
      const x = Gs.current, g = Qn.current;
      !x || !g || qs.current(x, g.option, l, g.mode);
    }, []), Do = i.useCallback(() => {
      const l = Qn.current;
      if (!l) return;
      const x = Ze(l.questionId, l.option);
      Ve !== x && Ue(null);
    }, [
      Ve
    ]), Fo = i.useCallback(() => {
      const l = Tn.current;
      l && Ve === `derived-${l.id}` || En(null);
    }, [
      Ve
    ]), qo = i.useCallback((l) => {
      const x = Tn.current;
      x && Ws.current(x, l);
    }, []), Bo = i.useCallback(() => ps(false), []), Uo = i.useCallback((l) => {
      ft("all"), kt(l);
    }, [
      kt
    ]), Go = i.useCallback(() => {
      Gt({
        paths: de.current.config.sourcePaths,
        scope: "file"
      });
    }, []), Wo = i.useCallback(() => {
      xt(null);
    }, []);
    if (!c) return t.jsx("div", {
      className: "quiz-pane flex flex-1 items-center justify-center text-sm text-gray-400",
      children: "\uD0ED\uC744 \uC120\uD0DD\uD558\uBA74 \uD034\uC988\uAC00 \uC5F4\uB9BD\uB2C8\uB2E4"
    });
    const _n = J.total > 0 ? Math.round(J.answered / J.total * 100) : 0, Js = J.total > 0 && !xo, Hs = J.total > 0 && !ho, Jo = re.examInProgress, Ho = t.jsxs("div", {
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
    return t.jsx(ga, {
      value: Oo,
      children: t.jsx(At, {
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
                      t.jsx(ea, {
                        className: "shrink-0 text-blue-600",
                        size: 18
                      }),
                      t.jsx("span", {
                        className: "shrink-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong",
                        children: "\uD034\uC988 \uBAA8\uB4DC"
                      }),
                      J.total > 0 ? t.jsx("div", {
                        className: `${br} flex-1`,
                        "aria-hidden": !Js,
                        children: t.jsx(mn, {
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
                                    width: `${_n}%`
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
                                  _n,
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
                    className: `${br} shrink-0`,
                    "aria-hidden": !Hs,
                    children: t.jsx(mn, {
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
                        children: Ho
                      }, "quiz-header-score") : null
                    })
                  }) : null,
                  t.jsxs(la, {
                    children: [
                      t.jsx(ca, {
                        asChild: true,
                        children: t.jsxs(D, {
                          type: "button",
                          variant: "secondary",
                          size: "sm",
                          children: [
                            t.jsx(Zs, {
                              size: 14
                            }),
                            "\uBB38\uC81C \uCD94\uAC00",
                            t.jsx(ss, {
                              size: 14,
                              className: "opacity-70",
                              "aria-hidden": true
                            })
                          ]
                        })
                      }),
                      t.jsx(da, {
                        children: t.jsxs(ua, {
                          className: Pd,
                          sideOffset: 6,
                          align: "start",
                          children: [
                            t.jsxs(Ys, {
                              className: kr,
                              onSelect: () => {
                                Ut(null), Bt(true);
                              },
                              children: [
                                t.jsx(wn, {
                                  size: 14,
                                  "aria-hidden": true
                                }),
                                "\uC9C1\uC811\uCD94\uAC00"
                              ]
                            }),
                            t.jsxs(Ys, {
                              className: kr,
                              onSelect: () => zn(true),
                              children: [
                                t.jsx(ta, {
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
                    variant: Rs.active > 0 ? "primary" : "secondary",
                    size: "sm",
                    "aria-pressed": qt,
                    onClick: () => {
                      pt((l) => (l && xt(null), !l));
                    },
                    children: [
                      t.jsx(Ar, {
                        size: 14
                      }),
                      "\uADFC\uAC70"
                    ]
                  }),
                  t.jsx(D, {
                    type: "button",
                    variant: Nn ? "primary" : "tertiary",
                    size: "sm",
                    "aria-label": "\uBAA9\uCC28",
                    "aria-pressed": Nn,
                    onClick: () => ps((l) => !l),
                    children: t.jsx(Lr, {
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
                        t.jsx(pd, {
                          profiles: ye,
                          profileId: R.profileId,
                          model: R.model,
                          onProfileIdChange: R.onProfileIdChange,
                          onModelChange: R.onModelChange
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
                                      width: `${_n}%`
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
                                  ].map(([l, x]) => t.jsx("button", {
                                    type: "button",
                                    className: `rounded-lg px-2.5 py-1 font-medium ${Cn === l ? "bg-white shadow-sm dark:bg-odp-surface" : "text-slate-600 dark:text-odp-muted"}`,
                                    onClick: () => ft(l),
                                    children: x
                                  }, l))
                                })
                              ]
                            }),
                            t.jsx(dl, {
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
                                  onClick: () => Bt(true),
                                  children: [
                                    t.jsx(Zs, {
                                      size: 14
                                    }),
                                    "\uBB38\uC81C \uCD94\uAC00"
                                  ]
                                }),
                                t.jsx(D, {
                                  type: "button",
                                  variant: "secondary",
                                  onClick: () => zn(true),
                                  children: "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30"
                                })
                              ]
                            })
                          ]
                        }) : null,
                        j.questions.length > 0 ? t.jsx(Ll, {
                          ref: In,
                          questions: j.questions,
                          filter: Cn,
                          scrollRef: gt,
                          userAnswers: se,
                          graded: ie,
                          subjGrades: me,
                          isSubmitted: pe,
                          expVisible: ro,
                          wrongExpsByQuestion: bo,
                          questionMemos: ae,
                          freshQuestionIds: ao,
                          busyId: Ve,
                          examInProgress: Jo,
                          resolveWrongExpFocusOption: Mo,
                          onAnswerCommit: Co,
                          onSelectOption: vo,
                          onEditQuestion: No,
                          onGradeChoice: So,
                          onGradeSubjective: jo,
                          onRetry: yo,
                          onToggleExplanation: $o,
                          onSimilar: Qo,
                          onDerived: Po,
                          onGenerateSections: To,
                          onWrongExpFocusChange: Eo,
                          onOpenAnalysisDock: ko,
                          onMemoSave: zo,
                          onClearFresh: Io
                        }) : null
                      ]
                    })
                  })
                }),
                t.jsx(za, {
                  open: rt != null,
                  question: rt,
                  defaultChoiceCount: j.config.choiceCount || 4,
                  busy: rt != null && Ve === `derived-${rt.id}`,
                  onClose: Fo,
                  onSubmit: qo
                }),
                t.jsx(Dl, {
                  open: !!(ue && Zt),
                  question: Zt,
                  option: (ue == null ? void 0 : ue.option) ?? null,
                  mode: (ue == null ? void 0 : ue.mode) ?? "create",
                  existingAnalysis: ue && ue.mode === "followup" ? String(Oe[Ze(ue.questionId, ue.option)] || "") : "",
                  llmProfiles: ye,
                  profileId: R.profileId,
                  model: R.model,
                  onProfileIdChange: R.onProfileIdChange,
                  onModelChange: R.onModelChange,
                  busy: ue != null && Ve === Ze(ue.questionId, ue.option),
                  onClose: Do,
                  onGenerate: _o
                }),
                t.jsx(dc, {
                  path: oo,
                  onClose: Wo,
                  loadDocument: W,
                  onOpenDocument: T,
                  onOpenInNewTab: le
                }),
                t.jsx(nc, {
                  open: qt,
                  docConfig: j.config,
                  sourcePathUsage: Rs,
                  busyGenSources: Ve === "gen-sources",
                  onClose: nt,
                  onPreview: He,
                  onRemove: mo,
                  onToggleEnabled: uo,
                  onOpenPicker: Go,
                  onGenerateFromTopic: Ao,
                  onDropHostChange: po
                }),
                t.jsx(wc, {
                  open: Nn,
                  questions: j.questions,
                  userAnswers: se,
                  gradedQuestions: ie,
                  isSubmitted: pe,
                  subjectiveGrades: me,
                  onClose: Bo,
                  onNavigate: Uo
                })
              ]
            }),
            xs ? t.jsx(Za, {
              isOpen: xs,
              onClose: () => {
                Bt(false), Ut(null);
              },
              styleTemplate: go,
              initial: he,
              nextLabel: rs(j.questions),
              onSubmit: (l) => {
                be(he ? {
                  ...j,
                  questions: j.questions.map((x) => x.id === he.id ? l : x)
                } : {
                  ...j,
                  questions: [
                    ...j.questions,
                    l
                  ]
                }), Ut(null);
              },
              onOpenSourcePicker: (l, x) => Gt({
                paths: l,
                scope: "question",
                onDone: x
              }),
              ...he ? {
                onFixWithAi: Lo
              } : {}
            }) : null,
            hs ? t.jsx(nl, {
              isOpen: hs,
              onClose: () => zn(false),
              current: j,
              onApply: (l, x) => {
                be(l), x === "replace" && Ms(), f({
                  message: `\uBB38\uC81C ${l.questions.length}\uAC1C \uC801\uC6A9`,
                  durationMs: 2500
                });
              }
            }) : null,
            Ge ? t.jsx(sl, {
              isOpen: true,
              onClose: () => Gt(null),
              tree: K,
              selected: Ge.paths,
              excludePath: (r == null ? void 0 : r.id) || null,
              onExpandFolder: Q,
              onDropHostChange: fo,
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
                }), Gt(null);
              }
            }) : null,
            t.jsx(Xn, {
              isOpen: io,
              title: "\uC2DC\uD5D8 \uC2DC\uC791",
              message: "\uCD08\uAE30\uD654\uD558\uACE0 \uC2DC\uD5D8\uC744 \uC2DC\uC791\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
              confirmLabel: "\uC2DC\uC791",
              cancelLabel: "\uCDE8\uC18C",
              variant: "danger",
              onConfirm: () => {
                $n(false), wo();
              },
              onCancel: () => $n(false)
            }),
            t.jsx(Xn, {
              isOpen: ht != null,
              title: "\uADFC\uAC70 \uBB38\uC11C \uC81C\uAC70",
              message: ht ? `\u300C${ht}\u300D\uC744(\uB97C) \uD30C\uC77C \uADFC\uAC70\uC5D0\uC11C \uC81C\uAC70\uD560\uAE4C\uC694?` : "",
              confirmLabel: "\uC81C\uAC70",
              cancelLabel: "\uCDE8\uC18C",
              variant: "danger",
              onConfirm: () => {
                ht && An(ht), Pn(null);
              },
              onCancel: () => Pn(null)
            }),
            t.jsx(ll, {
              jobs: h.jobs,
              isOpen: h.panelOpen,
              size: h.panelSize,
              onClose: h.closePanel,
              onResize: h.setPanelSize,
              onRemoveJob: h.removeJob,
              onClearFinished: h.clearFinishedJobs,
              onUserEngage: h.markPanelUserEngaged,
              onPointerEngageChange: h.markPanelPointerEngaged,
              onFocusEngageChange: h.markPanelFocusEngaged
            }),
            !h.panelOpen && h.jobs.length > 0 ? t.jsxs("button", {
              type: "button",
              className: "fixed bottom-4 right-4 z-10049 flex items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-2 text-xs font-semibold text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 dark:border-violet-700/60",
              onClick: h.openPanel,
              onMouseEnter: () => h.markPanelPointerEngaged(true),
              onMouseLeave: () => h.markPanelPointerEngaged(false),
              onFocus: () => h.markPanelFocusEngaged(true),
              onBlur: () => h.markPanelFocusEngaged(false),
              "aria-label": "\uBB38\uC81C \uC0DD\uC131 \uB300\uAE30\uC5F4 \uC5F4\uAE30",
              children: [
                t.jsx(Qe, {
                  size: 14
                }),
                "\uC0DD\uC131 \uB300\uAE30\uC5F4",
                h.hasActiveJobs ? t.jsx("span", {
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
  ru as default
};
