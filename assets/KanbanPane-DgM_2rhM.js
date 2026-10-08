const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/NoteEditorSurface-C_-qp0bG.js","assets/vendor-aws-Cvd3RhZI.js","assets/vendor-react-BLJzfvPB.js","assets/index-CSFc8FdZ.js","assets/vendor-lucide--whUmDUa.js","assets/bootSplash-QPCcRCUR.js","assets/core-DhEqZVGG.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-DSEw68MZ.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-radix-4pFcYp0u.js","assets/index-CjruZFNB.css"])))=>i.map(i=>d[i]);
import { _ as nn } from "./vendor-aws-Cvd3RhZI.js";
import { r as s, j as e, __tla as __tla_0 } from "./vendor-react-BLJzfvPB.js";
import { b0 as Be, ae as mt, b1 as pt, b2 as re, G as E, b3 as gt, b4 as st, b5 as rr, b6 as sn, b7 as an, b8 as on, b9 as ln, ba as nr, bb as sr, bc as dn, bd as cn, be as ve, F as un, bf as fn, bg as bn, bh as hn, S as ar, P as or, am as lr, bi as je, bj as xn, bk as dr, bl as mn, bm as pn, bn as gn, bo as yn, aj as kn, ak as at, bp as vn, bq as jn, br as Ce, bs as ot, bt as he, bu as Cn, bv as lt, bw as Nn, bx as wn, by as Sn, bz as dt, bA as In, bB as ir, bC as cr, bD as Dn, bE as ur, bF as ee, bG as Pn, n as fr, bH as br, bI as En, bJ as Ln, bK as An, T as _n, bL as hr, bM as zn, bN as Tn, i as $e, bO as On, bP as Mn, bQ as Rn, bR as xr, bS as Bn, bT as $n, bU as Kn, bV as yt, bW as kt, bX as mr, bY as pr, bZ as Fn, __tla as __tla_1 } from "./index-CSFc8FdZ.js";
import { Z as Wn, O as Xn } from "./index-Dj2EGo58.js";
import { m as Hn, W as Un, X as ut, n as qn, Y as gr, Z as yr, s as Gn, T as kr, a as Vn, _ as Qn, i as Zn, G as vt, L as Yn } from "./vendor-lucide--whUmDUa.js";
import { b as Jn, d as es } from "./vendor-emoji-CK-opFvR.js";
import { u as ts } from "./useDocumentTheme-MCs891MQ.js";
import { e as rs } from "./emojiFrequent-3ksKJv_q.js";
import { h as jt, R as Ir, i as Ct, j as Nt, T as Dr, k as wt, l as St, A as It, P as Pr, C as Er, S as ns, g as ss } from "./vendor-radix-4pFcYp0u.js";
import { r as as } from "./wikiImageResolver-DO8anhS8.js";
import { u as os } from "./useScrollPointerPan-B1F5JFkd.js";
import { r as ls } from "./resolveVaultFileNode-B32fmxCG.js";
import { __tla as __tla_2 } from "./bootSplash-QPCcRCUR.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-DSEw68MZ.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./wikiImageSettings-Cji60Ojw.js";
let ua;
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
  function vr({ isOpen: r, onClose: a, tree: i, selected: d, excludePath: u, onConfirm: c, onExpandFolder: f }) {
    const [o, b] = s.useState(() => Be(d)), [h, x] = s.useState(""), v = s.useMemo(() => Array.isArray(i) ? i : [], [
      i
    ]);
    s.useEffect(() => {
      r && (b(Be(d)), x(""));
    }, [
      r,
      d
    ]);
    const C = s.useMemo(() => new Set(o), [
      o
    ]), S = s.useMemo(() => {
      var _a;
      if (!h) return v;
      const k = (I) => {
        for (const T of I) {
          if (T.path === h) return T;
          if (T.children) {
            const Q = k(T.children);
            if (Q) return Q;
          }
        }
        return null;
      };
      return ((_a = k(v)) == null ? void 0 : _a.children) || [];
    }, [
      v,
      h
    ]), z = (k) => {
      b((I) => I.includes(k) ? I.filter((T) => T !== k) : Be([
        ...I,
        k
      ]));
    };
    return e.jsx(mt, {
      isOpen: r,
      onClose: a,
      contentClassName: "max-w-lg max-h-[90vh]",
      children: e.jsxs("div", {
        className: "flex min-h-0 flex-1 flex-col",
        children: [
          e.jsxs("header", {
            className: "shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsx("h2", {
                className: "text-base font-bold text-gray-900 dark:text-odp-fgStrong",
                children: "\uCE74\uB4DC\uC5D0 vault \uD30C\uC77C \uC5F0\uACB0"
              }),
              e.jsxs("p", {
                className: "mt-1 text-xs text-gray-600 dark:text-odp-muted",
                children: [
                  "\uC5EC\uB7EC \uD30C\uC77C\uC744 \uC120\uD0DD\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uB41C \uACBD\uB85C ",
                  o.length,
                  "\uAC1C."
                ]
              })
            ]
          }),
          e.jsxs("div", {
            className: "min-h-0 flex-1 overflow-y-auto px-6 py-4",
            children: [
              h ? e.jsx("button", {
                type: "button",
                className: "mb-2 inline-flex items-center gap-1 text-left text-xs text-blue-600 hover:underline",
                onClick: () => {
                  const k = h.replace(/\/$/, "").split("/").filter(Boolean);
                  k.pop(), x(k.length ? `${k.join("/")}/` : "");
                },
                children: "\u2190 \uC0C1\uC704 \uD3F4\uB354"
              }) : null,
              e.jsx("ul", {
                className: "min-h-48 space-y-1 rounded-lg border border-gray-200 p-2 dark:border-odp-borderSoft",
                children: S.map((k) => {
                  if (k.type === "folder") return e.jsx("li", {
                    children: e.jsxs("button", {
                      type: "button",
                      className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg",
                      onClick: async () => {
                        await (f == null ? void 0 : f(k)), x(k.path.endsWith("/") ? k.path : `${k.path}/`);
                      },
                      children: [
                        e.jsx(pt, {
                          size: 14
                        }),
                        k.name
                      ]
                    })
                  }, k.path);
                  if (u && k.path === u) return null;
                  const I = C.has(k.path);
                  return e.jsx("li", {
                    children: e.jsxs("button", {
                      type: "button",
                      className: `flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg ${I ? "bg-blue-50 dark:bg-blue-950/40" : ""}`,
                      onClick: () => z(k.path),
                      "aria-pressed": I,
                      children: [
                        e.jsx("span", {
                          className: `flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${I ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300 dark:border-odp-borderStrong"}`,
                          "aria-hidden": true,
                          children: I ? "\u2713" : ""
                        }),
                        e.jsx(Hn, {
                          size: 14
                        }),
                        k.name
                      ]
                    })
                  }, k.path);
                })
              }),
              o.length > 0 ? e.jsxs("div", {
                className: "mt-3 space-y-1",
                children: [
                  e.jsx("p", {
                    className: "text-xs font-medium text-gray-600 dark:text-odp-muted",
                    children: "\uC120\uD0DD\uB428"
                  }),
                  e.jsx("ul", {
                    className: "space-y-1",
                    children: o.map((k) => e.jsxs("li", {
                      className: "flex items-center gap-1",
                      children: [
                        e.jsx("span", {
                          className: "min-w-0 flex-1 truncate text-[11px] text-gray-700 dark:text-odp-fg",
                          children: k
                        }),
                        e.jsx("button", {
                          type: "button",
                          className: "shrink-0 rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-odp-focusBg",
                          "aria-label": `${k} \uC120\uD0DD \uD574\uC81C`,
                          onClick: () => z(k),
                          children: e.jsx(re, {
                            size: 12
                          })
                        })
                      ]
                    }, k))
                  })
                ]
              }) : null
            ]
          }),
          e.jsxs("footer", {
            className: "flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsxs(E, {
                type: "button",
                variant: "secondary",
                onClick: a,
                children: [
                  e.jsx(re, {
                    size: 14
                  }),
                  "\uCDE8\uC18C"
                ]
              }),
              e.jsx(E, {
                type: "button",
                variant: "secondary",
                onClick: () => b([]),
                disabled: o.length === 0,
                children: "\uBAA8\uB450 \uD574\uC81C"
              }),
              e.jsxs(E, {
                type: "button",
                variant: "primary",
                onClick: () => {
                  c(Be(o)), a();
                },
                children: [
                  e.jsx(gt, {
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
  rs();
  function ds({ icon: r, onChange: a }) {
    const [i, d] = s.useState(false), c = ts() === "dark" ? "dark" : "light", f = r ? "\uC5F4 \uC544\uC774\uCF58 \uBCC0\uACBD" : "\uC5F4 \uC544\uC774\uCF58 \uCD94\uAC00";
    return e.jsx(jt, {
      delayDuration: 250,
      skipDelayDuration: 0,
      children: e.jsxs(Ir, {
        open: i,
        onOpenChange: d,
        children: [
          e.jsxs(Ct, {
            children: [
              e.jsx(Nt, {
                asChild: true,
                children: e.jsx(Dr, {
                  asChild: true,
                  children: e.jsx("button", {
                    type: "button",
                    "aria-label": f,
                    "data-kanban-no-pan": "",
                    className: "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-base leading-none text-gray-500 hover:bg-gray-200/80 dark:hover:bg-odp-focusBg",
                    children: r ? e.jsx("span", {
                      "aria-hidden": true,
                      className: "select-none",
                      children: r
                    }) : e.jsx(Un, {
                      size: 14,
                      "aria-hidden": true
                    })
                  })
                })
              }),
              e.jsx(wt, {
                children: e.jsxs(St, {
                  side: "top",
                  sideOffset: 6,
                  className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong",
                  children: [
                    f,
                    e.jsx(It, {
                      className: "fill-white dark:fill-odp-surface"
                    })
                  ]
                })
              })
            ]
          }),
          e.jsx(Pr, {
            children: e.jsxs(Er, {
              side: "bottom",
              align: "start",
              sideOffset: 6,
              className: "z-100010 w-[min(92vw,352px)] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface",
              onOpenAutoFocus: (o) => o.preventDefault(),
              children: [
                i ? e.jsx("div", {
                  className: "emoji-mart-host w-full overflow-hidden [&_em-emoji-picker]:!w-full [&_em-emoji-picker]:!max-w-none [&_em-emoji-picker]:!border-0 [&_em-emoji-picker]:!shadow-none",
                  children: e.jsx(Jn, {
                    data: es,
                    theme: c,
                    locale: "ko",
                    previewPosition: "none",
                    skinTonePosition: "search",
                    searchPosition: "sticky",
                    navPosition: "bottom",
                    dynamicWidth: true,
                    emojiSize: 22,
                    emojiButtonSize: 34,
                    maxFrequentRows: 2,
                    autoFocus: false,
                    onEmojiSelect: (o) => {
                      const b = String((o == null ? void 0 : o.native) || "").trim();
                      b && (a(b), d(false));
                    }
                  })
                }) : null,
                r ? e.jsx("div", {
                  className: "border-t border-gray-100 p-2 dark:border-odp-borderSoft",
                  children: e.jsxs("button", {
                    type: "button",
                    className: "inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
                    onClick: () => {
                      a(null), d(false);
                    },
                    children: [
                      e.jsx(ut, {
                        size: 12,
                        "aria-hidden": true
                      }),
                      "\uC544\uC774\uCF58 \uC9C0\uC6B0\uAE30"
                    ]
                  })
                }) : null
              ]
            })
          })
        ]
      })
    });
  }
  function ft({ path: r, resolveUrl: a, className: i = "", variant: d = "card" }) {
    const [u, c] = s.useState(null), f = d === "column" ? "h-10" : "h-24";
    return s.useEffect(() => {
      let o = false;
      c(null);
      const b = String(r || "").trim();
      return !b || !a ? void 0 : ((async () => {
        try {
          const x = await Promise.resolve(a(b)), v = typeof x == "string" && x.trim() ? x.trim() : await as(b, a);
          o || c(v || null);
        } catch {
          o || c(null);
        }
      })(), () => {
        o = true;
      });
    }, [
      r,
      a
    ]), r ? u ? e.jsx("div", {
      className: `${f} w-full overflow-hidden bg-gray-100 dark:bg-odp-bgSoft ${i}`.trim(),
      children: e.jsx("img", {
        src: u,
        alt: "",
        className: "h-full w-full object-cover",
        draggable: false
      })
    }) : e.jsx("div", {
      className: `${f} w-full animate-pulse bg-gray-200/80 dark:bg-odp-focusBg ${i}`.trim(),
      "aria-hidden": true
    }) : null;
  }
  function Lr({ node: r, depth: a, selected: i, onSelect: d, onExpand: u }) {
    const [c, f] = s.useState(a < 1), o = i === r.path, b = (r.children || []).filter((h) => h.type === "folder");
    return e.jsxs("div", {
      children: [
        e.jsxs("button", {
          type: "button",
          className: `flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-sm ${o ? "bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-200" : "text-gray-800 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg"}`,
          style: {
            paddingLeft: `${a * 12 + 8}px`
          },
          onClick: () => {
            d(r.path), f(true), u == null ? void 0 : u(r);
          },
          children: [
            e.jsx("span", {
              className: "w-3 shrink-0 text-gray-400",
              children: b.length ? c ? "\u25BE" : "\u25B8" : ""
            }),
            e.jsx(pt, {
              size: 14,
              className: "shrink-0 text-gray-500"
            }),
            e.jsx("span", {
              className: "min-w-0 truncate",
              children: r.name || "/"
            })
          ]
        }),
        c ? b.map((h) => e.jsx(Lr, {
          node: h,
          depth: a + 1,
          selected: i,
          onSelect: d,
          ...u ? {
            onExpand: u
          } : {}
        }, h.path)) : null
      ]
    });
  }
  function is({ isOpen: r, onClose: a, tree: i, selected: d, onConfirm: u, onExpandFolder: c }) {
    const [f, o] = s.useState(d);
    s.useEffect(() => {
      r && o(d);
    }, [
      r,
      d
    ]);
    const b = s.useMemo(() => Array.isArray(i) ? i.filter((h) => h.type === "folder") : [], [
      i
    ]);
    return e.jsx(mt, {
      isOpen: r,
      onClose: a,
      contentClassName: "max-w-md max-h-[85vh]",
      children: e.jsxs("div", {
        className: "flex min-h-0 flex-1 flex-col",
        children: [
          e.jsxs("header", {
            className: "shrink-0 border-b border-gray-200 px-5 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsx("h2", {
                className: "text-base font-semibold text-gray-900 dark:text-odp-fgStrong",
                children: "\uC5F4 \uD3F4\uB354 \uC120\uD0DD"
              }),
              e.jsx("p", {
                className: "mt-0.5 text-xs text-gray-500 dark:text-odp-muted",
                children: "\uB178\uD2B8 \uBE60\uB978 \uCD94\uAC00\uC5D0 \uC0AC\uC6A9\uD560 vault \uD3F4\uB354"
              })
            ]
          }),
          e.jsxs("div", {
            className: "min-h-0 flex-1 overflow-y-auto px-3 py-3",
            children: [
              e.jsxs("button", {
                type: "button",
                className: `mb-2 flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-sm ${f === "" || f === "/" ? "bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-200" : "text-gray-800 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg"}`,
                onClick: () => o(""),
                children: [
                  e.jsx(pt, {
                    size: 14
                  }),
                  "\uB8E8\uD2B8"
                ]
              }),
              b.map((h) => e.jsx(Lr, {
                node: h,
                depth: 0,
                selected: f,
                onSelect: o,
                ...c ? {
                  onExpand: c
                } : {}
              }, h.path)),
              b.length === 0 ? e.jsx("p", {
                className: "px-2 py-6 text-center text-sm text-gray-500",
                children: "\uD3F4\uB354\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4"
              }) : null
            ]
          }),
          e.jsxs("footer", {
            className: "flex shrink-0 justify-end gap-2 border-t border-gray-200 px-5 py-3 dark:border-odp-borderSoft",
            children: [
              e.jsxs(E, {
                type: "button",
                variant: "secondary",
                onClick: a,
                children: [
                  e.jsx(re, {
                    size: 14
                  }),
                  "\uCDE8\uC18C"
                ]
              }),
              e.jsx(E, {
                type: "button",
                variant: "secondary",
                onClick: () => {
                  u(null), a();
                },
                children: "\uC5F0\uACB0 \uD574\uC81C"
              }),
              e.jsxs(E, {
                type: "button",
                variant: "primary",
                onClick: () => {
                  u(f === "/" ? "" : f), a();
                },
                children: [
                  e.jsx(gt, {
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
  const cs = "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", us = "border-blue-600 bg-blue-600", fs = "border-gray-300 bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong";
  function oe({ checked: r, onCheckedChange: a, label: i, description: d }) {
    return e.jsxs("div", {
      className: "flex items-start justify-between gap-3 rounded-md border border-white/60 bg-white/80 px-2.5 py-2 dark:border-odp-borderSoft/60 dark:bg-odp-surface/80",
      children: [
        e.jsxs("div", {
          className: "min-w-0",
          children: [
            e.jsx("p", {
              className: "text-xs font-semibold text-gray-800 dark:text-odp-fgStrong",
              children: i
            }),
            e.jsx("p", {
              className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
              children: d
            })
          ]
        }),
        e.jsx(ns, {
          className: `${cs} ${r ? us : fs}`,
          checked: r,
          onCheckedChange: a,
          "aria-label": i,
          children: e.jsx(ss, {
            className: "block size-4 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[18px]"
          })
        })
      ]
    });
  }
  function it({ id: r, label: a, description: i, value: d, cap: u, onChange: c }) {
    return e.jsxs("label", {
      className: "block space-y-1 rounded-md border border-white/60 bg-white/80 px-2.5 py-2 dark:border-odp-borderSoft/60 dark:bg-odp-surface/80",
      children: [
        e.jsx("span", {
          className: "text-xs font-semibold text-gray-800 dark:text-odp-fgStrong",
          children: a
        }),
        e.jsx("p", {
          className: "text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
          children: i
        }),
        e.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            e.jsx("input", {
              id: r,
              type: "number",
              min: 1,
              max: u,
              placeholder: "\uBB34\uC81C\uD55C",
              value: d ?? "",
              className: "w-28 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm tabular-nums dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              onChange: (f) => {
                const o = f.target.value.trim();
                if (!o) {
                  c(null);
                  return;
                }
                const b = Number(o);
                Number.isFinite(b) && c(Math.min(u, Math.max(1, Math.floor(b))));
              }
            }),
            e.jsxs("span", {
              className: "text-[11px] text-gray-400",
              children: [
                "\uBE44\uC6B0\uBA74 \uBB34\uC81C\uD55C (\uCD5C\uB300 ",
                u,
                ")"
              ]
            })
          ]
        })
      ]
    });
  }
  function bs({ isOpen: r, onClose: a, settings: i, onApply: d }) {
    const [u, c] = s.useState(() => st(i));
    s.useEffect(() => {
      r && c(st(i));
    }, [
      r,
      i
    ]);
    const f = (o) => {
      c((b) => ({
        ...b,
        ...o
      }));
    };
    return e.jsx(mt, {
      isOpen: r,
      onClose: a,
      contentClassName: "max-w-lg max-h-[90vh]",
      children: e.jsxs("div", {
        className: "flex min-h-0 flex-1 flex-col",
        children: [
          e.jsxs("header", {
            className: "shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsx("h2", {
                className: "text-base font-semibold text-gray-900 dark:text-odp-fgStrong",
                children: "\uCE78\uBC18 \uBB38\uC11C \uC124\uC815"
              }),
              e.jsx("p", {
                className: "mt-0.5 text-xs text-gray-500 dark:text-odp-muted",
                children: "\uC774 \uBCF4\uB4DC(`.kanban.json`)\uC5D0\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4"
              })
            ]
          }),
          e.jsxs("div", {
            className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4",
            children: [
              e.jsxs("section", {
                className: rr("sky"),
                "aria-label": "\uAE30\uB2A5 \uC2A4\uC704\uCE58",
                children: [
                  e.jsx("h3", {
                    className: "text-sm font-semibold text-gray-800 dark:text-odp-fgStrong",
                    children: "\uAE30\uB2A5"
                  }),
                  e.jsxs("div", {
                    className: "space-y-2",
                    children: [
                      e.jsx(oe, {
                        label: "\uC2A4\uC714\uB808\uC778",
                        description: "\uB808\uC778(\uD589)\uC744 \uD45C\uC2DC\uD558\uACE0 \uCE74\uB4DC\uAC00 \uB808\uC778\xD7\uC5F4 \uC140\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4. \uB044\uBA74 \uCCAB \uB808\uC778\uB9CC \uBCF4\uC785\uB2C8\uB2E4.",
                        checked: u.swimlanesEnabled,
                        onCheckedChange: (o) => f({
                          swimlanesEnabled: o
                        })
                      }),
                      e.jsx(oe, {
                        label: "\uC5F4 \uC544\uC774\uCF58",
                        description: "\uC5F4 \uC81C\uBAA9 \uC55E \uC774\uBAA8\uC9C0 \uC544\uC774\uCF58",
                        checked: u.columnIconsEnabled,
                        onCheckedChange: (o) => f({
                          columnIconsEnabled: o
                        })
                      }),
                      e.jsx(oe, {
                        label: "\uCEE4\uBC84 \uC774\uBBF8\uC9C0",
                        description: "\uC5F4\xB7\uCE74\uB4DC \uCEE4\uBC84 \uACBD\uB85C\uC640 \uC378\uB124\uC77C",
                        checked: u.coversEnabled,
                        onCheckedChange: (o) => f({
                          coversEnabled: o
                        })
                      }),
                      e.jsx(oe, {
                        label: "\uC5F4 \uD3F4\uB354 / \uB178\uD2B8 \uCD94\uAC00",
                        description: "\uC5F4\uC5D0 vault \uD3F4\uB354\uB97C \uC5F0\uACB0\uD558\uACE0 \uB178\uD2B8\uB97C \uBE60\uB974\uAC8C \uB9CC\uB4ED\uB2C8\uB2E4",
                        checked: u.columnFoldersEnabled,
                        onCheckedChange: (o) => f({
                          columnFoldersEnabled: o
                        })
                      }),
                      e.jsx(oe, {
                        label: "\uC5F4 \uC0C9\uC0C1",
                        description: "\uC5F4 \uD5E4\uB354 \uC561\uC13C\uD2B8 \uC0C9",
                        checked: u.columnColorsEnabled,
                        onCheckedChange: (o) => f({
                          columnColorsEnabled: o
                        })
                      }),
                      e.jsx(oe, {
                        label: "\uCE74\uB4DC \uD0DC\uADF8",
                        description: "\uCE74\uB4DC \uD0DC\uADF8 \uD3B8\uC9D1\xB7\uD45C\uC2DC",
                        checked: u.tagsEnabled,
                        onCheckedChange: (o) => f({
                          tagsEnabled: o
                        })
                      }),
                      e.jsx(oe, {
                        label: "\uCE74\uB4DC \uB9C1\uD06C",
                        description: "vault \uD30C\uC77C \uB9C1\uD06C(linkPaths)",
                        checked: u.linksEnabled,
                        onCheckedChange: (o) => f({
                          linksEnabled: o
                        })
                      })
                    ]
                  })
                ]
              }),
              e.jsxs("section", {
                className: rr("violet"),
                "aria-label": "\uAC1C\uC218 \uC81C\uD55C",
                children: [
                  e.jsx("h3", {
                    className: "text-sm font-semibold text-gray-800 dark:text-odp-fgStrong",
                    children: "\uAC1C\uC218 \uC81C\uD55C"
                  }),
                  e.jsxs("div", {
                    className: "space-y-2",
                    children: [
                      e.jsx(it, {
                        id: "kanban-max-lanes",
                        label: "\uCD5C\uB300 \uB808\uC778(\uD589) \uC218",
                        description: "\uC2A4\uC714\uB808\uC778 \uD589 \uAC1C\uC218 \uC0C1\uD55C",
                        value: u.maxLanes,
                        cap: sn,
                        onChange: (o) => f({
                          maxLanes: o
                        })
                      }),
                      e.jsx(it, {
                        id: "kanban-max-columns",
                        label: "\uCD5C\uB300 \uC5F4(\uCEEC\uB7FC) \uC218",
                        description: "\uBCF4\uB4DC \uAC00\uB85C \uC5F4 \uAC1C\uC218 \uC0C1\uD55C",
                        value: u.maxColumns,
                        cap: an,
                        onChange: (o) => f({
                          maxColumns: o
                        })
                      }),
                      e.jsx(it, {
                        id: "kanban-max-cards-cell",
                        label: "\uC140\uB2F9 \uCD5C\uB300 \uCE74\uB4DC \uC218",
                        description: "\uAC01 \uC5F4\xD7\uB808\uC778 \uCEE8\uD14C\uC774\uB108\uC5D0 \uB458 \uC218 \uC788\uB294 \uCE74\uB4DC \uC218",
                        value: u.maxCardsPerCell,
                        cap: on,
                        onChange: (o) => f({
                          maxCardsPerCell: o
                        })
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          e.jsxs("footer", {
            className: "flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsx(E, {
                type: "button",
                variant: "secondary",
                onClick: () => c({
                  ...ln
                }),
                children: "\uAE30\uBCF8\uAC12"
              }),
              e.jsxs(E, {
                type: "button",
                variant: "secondary",
                onClick: a,
                children: [
                  e.jsx(re, {
                    size: 14
                  }),
                  "\uCDE8\uC18C"
                ]
              }),
              e.jsxs(E, {
                type: "button",
                variant: "primary",
                onClick: () => {
                  d(st(u)), a();
                },
                children: [
                  e.jsx(gt, {
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
  const hs = "kanban-col:", Ke = "kanban-coldrop:", xs = "kanban-card:", ms = "kanban-lane:";
  function jr(r) {
    return String(r).startsWith(hs);
  }
  function ps(r) {
    return String(r).startsWith(Ke);
  }
  function Ar(r) {
    return String(r).startsWith(xs);
  }
  function Cr(r) {
    return String(r).startsWith(ms);
  }
  function Fe(r) {
    const a = String(r);
    if (!a.startsWith(Ke)) return null;
    const i = a.slice(Ke.length);
    if (!i) return null;
    const d = i.indexOf(":");
    return d < 0 ? {
      columnId: i,
      laneId: null
    } : {
      columnId: i.slice(0, d),
      laneId: i.slice(d + 1) || null
    };
  }
  function gs(r) {
    return r.left + r.width / 2;
  }
  function Dt(r) {
    return r.top + r.height / 2;
  }
  function ys(r, a) {
    return a >= r.left && a <= r.right;
  }
  function ks(r, a, i) {
    return a >= r.left && a <= r.right && i >= r.top && i <= r.bottom;
  }
  function vs(r, a, i) {
    if (i) {
      const d = `${Ke}${a}:${i}`, u = r.find((c) => String(c.id) === d);
      if (u) return u;
    }
    return r.find((d) => {
      var _a;
      return ((_a = Fe(d.id)) == null ? void 0 : _a.columnId) === a;
    }) ?? null;
  }
  function js(r, a, i, d, u) {
    const c = r.filter((b) => b.id !== u && ps(b.id));
    for (const b of c) {
      const h = a.get(b.id);
      if (h && ks(h, i, d)) return b;
    }
    for (const b of c) {
      const h = a.get(b.id);
      if (h && ys(h, i)) return b;
    }
    let f = null, o = 1 / 0;
    for (const b of c) {
      const h = a.get(b.id);
      if (!h) continue;
      const x = gs(h), v = Dt(h), C = Math.hypot(x - i, v - d);
      C < o && (o = C, f = b);
    }
    return f;
  }
  function Cs(r, a, i, d, u, c) {
    const f = r.filter((C) => {
      if (C.id === c || !Ar(C.id)) return false;
      const S = C.data.current;
      return !((S == null ? void 0 : S.columnId) !== i || d && (S == null ? void 0 : S.laneId) && S.laneId !== d);
    });
    if (f.length === 0) return null;
    const o = f.map((C) => ({
      c: C,
      rect: a.get(C.id)
    })).filter((C) => !!C.rect).sort((C, S) => C.rect.top - S.rect.top);
    if (o.length === 0) return null;
    const b = o[0];
    if (u < b.rect.top) return b.c.id;
    const h = o[o.length - 1];
    if (u > h.rect.bottom) return h.c.id;
    for (const C of o) if (u >= C.rect.top && u <= C.rect.bottom) return C.c.id;
    let x = null, v = 1 / 0;
    for (const C of o) {
      const S = Math.abs(Dt(C.rect) - u);
      S < v && (v = S, x = C.c.id);
    }
    return x;
  }
  function Ns(r, a) {
    return !r || a == null || !Number.isFinite(a) ? false : a > Dt(r);
  }
  function ws(r) {
    const a = r == null ? void 0 : r.lastOverIdRef, i = r == null ? void 0 : r.resolveCellAtPoint;
    return (d) => {
      const { active: u, droppableContainers: c, droppableRects: f, pointerCoordinates: o } = d, b = u.id;
      if (jr(b)) return nr({
        ...d,
        droppableContainers: c.filter((x) => jr(x.id))
      });
      if (Cr(b)) return nr({
        ...d,
        droppableContainers: c.filter((x) => Cr(x.id))
      });
      if (!Ar(b)) return sr(d);
      const h = f;
      if (o) {
        let x = null;
        if (i) {
          const v = i(o.x, o.y);
          (v == null ? void 0 : v.columnId) && (x = vs(c, v.columnId, v.laneId));
        }
        if (x || (x = js(c, h, o.x, o.y, b)), x) {
          const v = Fe(x.id), C = x.data.current, S = (v == null ? void 0 : v.columnId) || (C == null ? void 0 : C.columnId), z = (v == null ? void 0 : v.laneId) || (C == null ? void 0 : C.laneId) || null;
          if (S) {
            const I = Cs(c, h, S, z, o.y, b) ?? x.id;
            return a && (a.current = I), [
              {
                id: I
              }
            ];
          }
        }
      }
      return (a == null ? void 0 : a.current) != null ? [
        {
          id: a.current
        }
      ] : sr({
        ...d,
        droppableContainers: c.filter((x) => x.id !== b)
      });
    };
  }
  const Ss = s.lazy(() => nn(() => import("./NoteEditorSurface-C_-qp0bG.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]))), Is = _n, bt = "kanban-col:", Ds = "kanban-coldrop:", ht = "kanban-card:", xt = "kanban-lane:";
  function _r(r) {
    return `${bt}${r}`;
  }
  function Ps(r, a) {
    return `${Ds}${r}:${a}`;
  }
  function zr(r) {
    return `${ht}${r}`;
  }
  function Tr(r) {
    return `${xt}${r}`;
  }
  function Nr(r, a, i) {
    if (typeof document > "u") return null;
    const d = typeof document.elementsFromPoint == "function" ? document.elementsFromPoint(r, a) : [];
    for (const u of d) {
      if (!(u instanceof Element)) continue;
      const c = u.closest("[data-kanban-cell]");
      if (c instanceof HTMLElement) {
        const f = c.getAttribute("data-kanban-column-id"), o = c.getAttribute("data-kanban-lane-id");
        if (f) return {
          columnId: f,
          laneId: o
        };
      }
    }
    if (i) {
      const u = i.querySelectorAll("[data-kanban-cell]");
      for (const c of u) {
        if (!(c instanceof HTMLElement)) continue;
        const f = c.getBoundingClientRect();
        if (r >= f.left && r <= f.right && a >= f.top && a <= f.bottom) {
          const o = c.getAttribute("data-kanban-column-id"), b = c.getAttribute("data-kanban-lane-id");
          if (o) return {
            columnId: o,
            laneId: b
          };
        }
      }
    }
    return null;
  }
  function ct(r) {
    return r.startsWith(bt) ? r.slice(bt.length) : null;
  }
  function Es(r) {
    var _a;
    return ((_a = Fe(r)) == null ? void 0 : _a.columnId) ?? null;
  }
  function Ls(r) {
    var _a;
    return ((_a = Fe(r)) == null ? void 0 : _a.laneId) ?? null;
  }
  function te(r) {
    return r.startsWith(ht) ? r.slice(ht.length) : null;
  }
  function wr(r) {
    return r.startsWith(xt) ? r.slice(xt.length) : null;
  }
  const As = {
    droppable: {
      strategy: Sn.Always
    }
  }, _s = {
    layoutShiftCompensation: false
  }, Sr = () => null, zs = ({ activatorEvent: r, draggingNodeRect: a, transform: i }) => {
    if (!a || !r) return i;
    const d = r;
    let u = null, c = null;
    if ("clientX" in d && typeof d.clientX == "number" ? (u = d.clientX, c = d.clientY) : "touches" in d && d.touches[0] && (u = d.touches[0].clientX, c = d.touches[0].clientY), u == null || c == null) return i;
    const f = u - a.left, o = c - a.top;
    return {
      ...i,
      x: i.x + f - a.width / 2,
      y: i.y + o - a.height / 2
    };
  }, Ts = [
    zs
  ];
  function Os(r) {
    return r instanceof Element ? !!r.closest([
      "button",
      "input",
      "textarea",
      "select",
      "a",
      '[contenteditable="true"]',
      "[data-kanban-no-pan]",
      "[data-kanban-column-gap-resize]",
      "[data-kanban-card-id]",
      ".haim-editor",
      ".md-editor",
      ".cm-editor"
    ].join(", ")) : true;
  }
  const Ms = 380, Rs = 280, Bs = 720;
  function $s() {
    return e.jsxs("div", {
      className: "flex h-full min-h-0 flex-1 items-center justify-center gap-2 text-xs text-gray-500 dark:text-odp-muted",
      children: [
        e.jsx(Yn, {
          size: 14,
          className: "animate-spin",
          "aria-hidden": true
        }),
        "\uC5D0\uB514\uD130 \uB85C\uB529 \uC911\u2026"
      ]
    });
  }
  function Ks({ column: r, widthPx: a, header: i, children: d, isWidthResizing: u = false, sortableDisabled: c = false }) {
    const { attributes: f, listeners: o, setNodeRef: b, transform: h, transition: x, isDragging: v } = yt({
      id: _r(r.id),
      data: {
        type: "column",
        columnId: r.id
      },
      disabled: c
    }), C = {
      transform: kt.Transform.toString(h),
      transition: u ? void 0 : x,
      opacity: v ? 0.45 : 1,
      width: a
    }, S = r.color || void 0;
    return e.jsxs("div", {
      ref: b,
      style: C,
      "data-kanban-column-id": r.id,
      className: "relative flex max-h-full shrink-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-slate-50/90 dark:border-odp-borderSoft dark:bg-odp-bgSoft/80",
      children: [
        e.jsxs("div", {
          className: "flex shrink-0 items-center gap-1 border-b border-gray-200 px-2 py-1.5 dark:border-odp-borderSoft",
          style: S ? {
            borderTop: `3px solid ${S}`
          } : void 0,
          children: [
            e.jsx("button", {
              type: "button",
              className: "inline-flex cursor-grab touch-none items-center justify-center rounded p-1 text-gray-400 hover:bg-gray-200/80 hover:text-gray-700 active:cursor-grabbing dark:hover:bg-odp-focusBg dark:hover:text-odp-fg",
              "aria-label": "\uC5F4 \uC21C\uC11C \uBCC0\uACBD",
              "data-kanban-no-pan": "",
              ...f,
              ...o,
              children: e.jsx(vt, {
                size: 14
              })
            }),
            i
          ]
        }),
        d
      ]
    });
  }
  function Fs({ columnWidthPx: r, onLiveWidth: a, onCommitWidth: i }) {
    const [d, u] = s.useState(false), c = s.useRef(null), f = s.useRef(r), o = s.useRef(a), b = s.useRef(i);
    o.current = a, b.current = i, s.useEffect(() => {
      if (!d) return;
      const x = (z) => {
        var _a;
        const k = c.current;
        if (!k) return;
        const I = "touches" in z ? (_a = z.touches[0]) == null ? void 0 : _a.clientX : z.clientX;
        if (I == null) return;
        "touches" in z && z.preventDefault();
        const T = Math.min(mr, Math.max(pr, Math.round(k.startWidth + (I - k.startX))));
        f.current = T, o.current(T);
      }, v = () => {
        const z = f.current;
        c.current = null, u(false), b.current(z);
      };
      window.addEventListener("mousemove", x), window.addEventListener("mouseup", v), window.addEventListener("touchmove", x, {
        passive: false
      }), window.addEventListener("touchend", v), window.addEventListener("touchcancel", v);
      const C = document.body.style.cursor, S = document.body.style.userSelect;
      return document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", () => {
        window.removeEventListener("mousemove", x), window.removeEventListener("mouseup", v), window.removeEventListener("touchmove", x), window.removeEventListener("touchend", v), window.removeEventListener("touchcancel", v), document.body.style.cursor = C, document.body.style.userSelect = S;
      };
    }, [
      d
    ]);
    const h = (x) => {
      var _a;
      x.preventDefault(), x.stopPropagation();
      const v = "touches" in x ? (_a = x.touches[0]) == null ? void 0 : _a.clientX : x.clientX;
      v != null && (c.current = {
        startX: v,
        startWidth: r
      }, f.current = r, a(r), u(true));
    };
    return e.jsx("div", {
      className: "group relative flex w-3 shrink-0 items-stretch justify-center self-stretch",
      "data-kanban-column-gap-resize": "",
      children: e.jsx(jt, {
        delayDuration: 400,
        skipDelayDuration: 0,
        children: e.jsxs(Ct, {
          children: [
            e.jsx(Nt, {
              asChild: true,
              children: e.jsx("button", {
                type: "button",
                "aria-label": "\uC5F4 \uB108\uBE44 \uC870\uC808",
                role: "separator",
                "aria-orientation": "vertical",
                "aria-valuenow": Math.round(r),
                "aria-valuemin": pr,
                "aria-valuemax": mr,
                className: `absolute inset-y-2 left-1/2 z-20 w-3 -translate-x-1/2 cursor-col-resize touch-none rounded-full border-0 bg-transparent p-0 transition-colors ${d ? "bg-sky-400/50 dark:bg-sky-500/40" : "hover:bg-sky-300/40 dark:hover:bg-sky-600/35"}`,
                style: {
                  touchAction: "none"
                },
                onMouseDown: h,
                onTouchStart: h,
                children: e.jsx("span", {
                  className: `pointer-events-none absolute inset-y-4 left-1/2 w-0.5 -translate-x-1/2 rounded-full transition-colors ${d ? "bg-sky-500 dark:bg-sky-400" : "bg-transparent group-hover:bg-sky-400/80 dark:group-hover:bg-sky-500/70"}`,
                  "aria-hidden": true
                })
              })
            }),
            e.jsx(wt, {
              children: e.jsxs(St, {
                side: "top",
                sideOffset: 6,
                className: "z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs shadow-md dark:border-odp-borderSoft dark:bg-odp-surface",
                children: [
                  "\uC5F4 \uB108\uBE44 \uC870\uC808",
                  e.jsx(It, {
                    className: "fill-white dark:fill-odp-surface"
                  })
                ]
              })
            })
          ]
        })
      })
    });
  }
  function Ws({ columnId: r, laneId: a, children: i }) {
    const { setNodeRef: d, isOver: u } = Fn({
      id: Ps(r, a),
      data: {
        type: "column-drop",
        columnId: r,
        laneId: a
      }
    });
    return e.jsx("div", {
      ref: d,
      "data-kanban-cell": "",
      "data-kanban-column-id": r,
      "data-kanban-lane-id": a,
      className: `flex min-h-24 flex-1 flex-col gap-2 overflow-y-auto p-2 ${u ? "bg-blue-50/60 dark:bg-blue-950/20" : ""}`,
      children: i
    });
  }
  function Xs({ lane: r, disabled: a = false, children: i }) {
    const { attributes: d, listeners: u, setNodeRef: c, transform: f, transition: o, isDragging: b } = yt({
      id: Tr(r.id),
      data: {
        type: "lane",
        laneId: r.id
      },
      disabled: a
    }), h = {
      transform: kt.Transform.toString(f),
      transition: o,
      opacity: b ? 0.5 : 1
    };
    return e.jsx("div", {
      ref: c,
      style: h,
      className: "flex min-w-0 flex-col gap-1",
      children: e.jsxs("div", {
        className: "flex items-center gap-1 px-1",
        children: [
          e.jsx("button", {
            type: "button",
            className: "inline-flex cursor-grab touch-none items-center justify-center rounded p-1 text-gray-400 hover:bg-gray-200/80 active:cursor-grabbing dark:hover:bg-odp-focusBg",
            "aria-label": "\uB808\uC778 \uC21C\uC11C \uBCC0\uACBD",
            "data-kanban-no-pan": "",
            ...d,
            ...u,
            children: e.jsx(vt, {
              size: 14
            })
          }),
          i
        ]
      })
    });
  }
  function Hs({ card: r, columnId: a, laneId: i, onSelect: d, isSelected: u, searchDimmed: c, searchHit: f, resolveCoverUrl: o, showCover: b = true, showTags: h = true, showLinks: x = true }) {
    const { attributes: v, listeners: C, setNodeRef: S, transform: z, transition: k, isDragging: I } = yt({
      id: zr(r.id),
      data: {
        type: "card",
        cardId: r.id,
        columnId: a,
        laneId: i
      }
    }), T = {
      transform: I ? void 0 : kt.Transform.toString(z),
      transition: I ? void 0 : k,
      opacity: I ? 0 : c ? 0.35 : 1
    };
    return e.jsxs("div", {
      ref: S,
      style: T,
      "data-kanban-card-id": r.id,
      className: `overflow-hidden rounded-md border bg-white shadow-sm dark:bg-odp-surface ${f ? "border-amber-400 ring-1 ring-amber-300/70 dark:border-amber-500" : u ? "border-blue-500 ring-1 ring-blue-400/60 dark:border-blue-400" : "border-gray-200 dark:border-odp-borderSoft"}`,
      children: [
        b && r.coverPath ? e.jsx(ft, {
          path: r.coverPath,
          variant: "card",
          ...o ? {
            resolveUrl: o
          } : {}
        }) : null,
        e.jsxs("div", {
          className: "flex items-start gap-1 p-2",
          children: [
            e.jsx("button", {
              type: "button",
              className: "mt-0.5 inline-flex cursor-grab touch-none items-center justify-center rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 active:cursor-grabbing dark:hover:bg-odp-focusBg",
              "aria-label": "\uCE74\uB4DC \uC774\uB3D9",
              "data-kanban-no-pan": "",
              ...v,
              ...C,
              children: e.jsx(vt, {
                size: 14
              })
            }),
            e.jsxs("button", {
              type: "button",
              className: "min-w-0 flex-1 text-left",
              onClick: d,
              children: [
                e.jsx("div", {
                  className: "truncate text-sm font-medium text-gray-900 dark:text-odp-fgStrong",
                  children: r.title.trim() || "\uC81C\uBAA9 \uC5C6\uC74C"
                }),
                r.body.trim() ? e.jsx("div", {
                  className: "mt-0.5 line-clamp-2 text-xs text-gray-500 dark:text-odp-muted",
                  children: r.body
                }) : null,
                h && r.tags.length > 0 ? e.jsxs("div", {
                  className: "mt-1 flex flex-wrap gap-1",
                  children: [
                    r.tags.slice(0, 4).map((Q) => e.jsx("span", {
                      className: "rounded bg-violet-50 px-1 py-0.5 text-[10px] text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
                      children: Q
                    }, Q)),
                    r.tags.length > 4 ? e.jsxs("span", {
                      className: "text-[10px] text-gray-400",
                      children: [
                        "+",
                        r.tags.length - 4
                      ]
                    }) : null
                  ]
                }) : null,
                x && r.linkPaths.length > 0 ? e.jsx("div", {
                  className: "mt-1 truncate text-[11px] text-blue-600 dark:text-blue-400",
                  children: r.linkPaths.length === 1 ? r.linkPaths[0] : `\uB9C1\uD06C ${r.linkPaths.length}\uAC1C`
                }) : null
              ]
            })
          ]
        })
      ]
    });
  }
  function Us({ card: r }) {
    return e.jsxs("div", {
      className: "w-64 cursor-grabbing rounded-md border border-blue-400 bg-white p-2 shadow-lg dark:bg-odp-surface",
      children: [
        e.jsx("div", {
          className: "truncate text-sm font-medium text-gray-900 dark:text-odp-fgStrong",
          children: r.title.trim() || "\uC81C\uBAA9 \uC5C6\uC74C"
        }),
        r.tags.length > 0 ? e.jsx("div", {
          className: "mt-1 flex flex-wrap gap-1",
          children: r.tags.slice(0, 3).map((a) => e.jsx("span", {
            className: "rounded bg-violet-50 px-1 py-0.5 text-[10px] text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
            children: a
          }, a))
        }) : null
      ]
    });
  }
  ua = function({ content: r, onChange: a, onSave: i, currentFile: d = null, theme: u = "light", isActiveFile: c = true, isSurfaceLive: f = true, registerFileManagement: o, onResolveWikiImageUrl: b }) {
    var _a;
    const { showToast: h } = dn(), { setKanbanCardDropActive: x, setKanbanCardDropHost: v, handleRegisterKanbanCardDrop: C } = cn(), S = s.useRef(null), [z, k] = s.useState(null), I = s.useRef(null), T = s.useRef(null), Q = `${(d == null ? void 0 : d.type) || ""}:${(d == null ? void 0 : d.id) || ""}`, Pt = s.useMemo(() => ve(r), [
      Q
    ]), [j, xe] = s.useState(Pt.document), [Et, Or] = s.useState(Pt.error), [$, We] = s.useState(null), [w, K] = s.useState(null), [Xe, le] = s.useState(""), [Mr, Ne] = s.useState(false), [we, He] = s.useState(null), [de, Se] = s.useState(null), [Ue, qe] = s.useState(null), [Rr, Lt] = s.useState(false), [Br, Ie] = s.useState(false), [$r, De] = s.useState(false), [Pe, Ge] = s.useState(false), [Ee, Ve] = s.useState(""), [Z, ie] = s.useState(0), [ne, Qe] = s.useState(null), [Ze, Ye] = s.useState(null), [Le, Je] = s.useState(null), [Kr, Fr] = s.useState(null), [me, At] = s.useState(null), et = un({
      storageKey: "kanban-card-edit-panel-width",
      defaultWidth: Ms,
      minWidth: Rs,
      maxWidth: Bs,
      edge: "left"
    }), q = s.useRef([]), X = s.useRef(0), G = s.useRef(false), Ae = s.useRef(false), pe = s.useRef(a);
    pe.current = a;
    const A = s.useRef(j);
    A.current = j;
    const { storageMode: se, s3Tree: _e, localTree: ae, webdavTree: ze, idbTree: Te, localRootHandle: Oe, loadLocalFolderChildren: _t, loadWebdavFolderChildren: zt, loadIdbFolderChildren: Tt } = fn(), { selectFileRaw: Ot, openAdvancedSearchFile: Mt } = bn(), { setCreateModalContext: Rt, setCreateModalOpen: Bt } = hn(), ce = s.useMemo(() => se === ar ? ae : se === or ? ze : se === lr ? Te : _e, [
      se,
      ae,
      ze,
      Te,
      _e
    ]), O = se === ar ? "local" : se === or ? "webdav" : se === lr ? "idb" : "s3", $t = O === "local" || O === "webdav" || O === "idb" || O === "s3" ? O : "s3";
    s.useEffect(() => {
      const t = ve(r);
      xe(t.document), Or(t.error), We(null), K(null), le(""), Ne(false), Ge(false), Ve(""), ie(0);
      const n = je(t.document);
      q.current = [
        n
      ], X.current = 0, Ae.current = true, G.current = false;
    }, [
      Q
    ]);
    const N = s.useCallback((t, n) => {
      A.current = t, xe(t);
      const l = je(t);
      if (pe.current(l), (n == null ? void 0 : n.recordUndo) !== false && !G.current && Ae.current) {
        const m = q.current.slice(0, X.current + 1);
        m[m.length - 1] !== l && (m.push(l), m.length > 100 && m.shift(), q.current = m, X.current = m.length - 1);
      }
    }, []), ue = $ && j.cards[$] || null, ge = !!(ue && w) && ue != null && w != null && xn(w, ue), Y = s.useCallback((t) => {
      const n = A.current.cards[t];
      n && (We(t), K(dr(n)), le(""));
    }, []), fe = s.useCallback(() => {
      We(null), K(null), le(""), Ne(false);
    }, []), Wr = s.useCallback(() => {
      if (ge) {
        De(true), Ie(true);
        return;
      }
      fe();
    }, [
      fe,
      ge
    ]), Kt = s.useCallback(() => {
      if (!$ || !w) return;
      const t = mn(A.current, $, {
        title: w.title,
        body: w.body,
        linkPaths: w.linkPaths,
        tags: w.tags,
        coverPath: w.coverPath
      });
      N(t);
      const n = t.cards[$];
      n && K(dr(n)), h({
        message: "\uCE74\uB4DC \uC800\uC7A5\uB428",
        durationMs: 1800
      }), i == null ? void 0 : i();
    }, [
      w,
      N,
      i,
      $,
      h
    ]), D = s.useMemo(() => Pe ? pn(j, Ee) : [], [
      j,
      Pe,
      Ee
    ]), Xr = s.useMemo(() => new Set(D), [
      D
    ]), ye = Pe && Ee.trim().length > 0, Me = s.useCallback(() => {
      Ge(true), requestAnimationFrame(() => {
        var _a2, _b;
        (_a2 = I.current) == null ? void 0 : _a2.focus(), (_b = I.current) == null ? void 0 : _b.select();
      });
    }, []), Ft = s.useCallback(() => {
      Lt(true);
    }, []), Wt = s.useCallback(() => {
      Ge(false), Ve(""), ie(0);
    }, []), tt = s.useCallback((t) => {
      var _a2;
      if (!D.length) return;
      const n = (t % D.length + D.length) % D.length;
      ie(n);
      const l = D[n];
      if (!l) return;
      const g = typeof ((_a2 = globalThis.CSS) == null ? void 0 : _a2.escape) == "function" ? globalThis.CSS.escape(l) : l.replace(/\\/g, "\\\\").replace(/"/g, '\\"'), m = document.querySelector(`[data-kanban-card-id="${g}"]`);
      m instanceof HTMLElement && m.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth"
      });
    }, [
      D
    ]);
    s.useEffect(() => {
      if (!ye) {
        ie(0);
        return;
      }
      Z >= D.length && ie(0);
    }, [
      ye,
      Z,
      D.length
    ]), s.useEffect(() => {
      if (!(!c || !f || !o)) return o({
        openSearch: Me,
        openDocumentSettings: Ft
      }), () => o(null);
    }, [
      c,
      f,
      Ft,
      Me,
      o
    ]), s.useEffect(() => {
      if (!c || !f) return;
      const t = (n) => {
        var _a2, _b;
        if (!(n.metaKey || n.ctrlKey) || n.altKey || n.key.toLowerCase() !== "f") return;
        const g = n.target;
        ((_a2 = g == null ? void 0 : g.closest) == null ? void 0 : _a2.call(g, '.haim-editor, .md-editor, .cm-editor, [contenteditable="true"], textarea, input')) && !((_b = g.closest) == null ? void 0 : _b.call(g, "[data-kanban-board-search]")) || (n.preventDefault(), n.stopPropagation(), Me());
      };
      return window.addEventListener("keydown", t, true), () => window.removeEventListener("keydown", t, true);
    }, [
      c,
      f,
      Me
    ]);
    const Xt = s.useCallback(() => {
      if (X.current <= 0) return false;
      X.current -= 1;
      const t = q.current[X.current];
      if (!t) return false;
      const n = ve(t);
      return G.current = true, xe(n.document), pe.current(t), requestAnimationFrame(() => {
        G.current = false;
      }), true;
    }, []), Ht = s.useCallback(() => {
      if (X.current >= q.current.length - 1) return false;
      X.current += 1;
      const t = q.current[X.current];
      if (!t) return false;
      const n = ve(t);
      return G.current = true, xe(n.document), pe.current(t), requestAnimationFrame(() => {
        G.current = false;
      }), true;
    }, []);
    s.useEffect(() => {
      const t = (n) => {
        var _a2, _b, _c, _d;
        if (!(n.metaKey || n.ctrlKey) || ((_b = (_a2 = n.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, '.haim-editor, .md-editor, .cm-editor, [contenteditable="true"], textarea, input'))) return;
        const m = n.key.toLowerCase();
        m === "z" && !n.shiftKey ? Xt() && (n.preventDefault(), n.stopPropagation(), (_c = n.stopImmediatePropagation) == null ? void 0 : _c.call(n)) : (m === "z" && n.shiftKey || m === "y") && Ht() && (n.preventDefault(), n.stopPropagation(), (_d = n.stopImmediatePropagation) == null ? void 0 : _d.call(n));
      };
      return window.addEventListener("keydown", t, true), () => window.removeEventListener("keydown", t, true);
    }, [
      Xt,
      Ht
    ]), s.useEffect(() => () => {
      q.current = [], X.current = 0, Ae.current = false;
    }, []);
    const Hr = gn(yn(Kn, {
      activationConstraint: {
        distance: 6
      }
    })), Re = s.useRef(null), J = s.useRef(null), ke = s.useRef(null), Ut = s.useCallback((t, n) => Nr(t, n, S.current), []), Ur = s.useMemo(() => ws({
      lastOverIdRef: Re,
      resolveCellAtPoint: Ut
    }), [
      Ut
    ]), qt = !!(ne && te(ne)), qr = s.useCallback(async (t) => {
      const n = await ls(t, {
        storageType: $t,
        localTree: ae,
        webdavTree: ze,
        idbTree: Te,
        s3Tree: _e,
        localRootHandle: Oe
      });
      if (n) {
        await Ot(O, n);
        return;
      }
      Mt == null ? void 0 : Mt(t);
    }, [
      $t,
      ae,
      ze,
      Te,
      _e,
      Oe,
      Ot,
      O,
      Mt
    ]), rt = s.useCallback(async (t) => {
      O === "local" ? await (_t == null ? void 0 : _t(t)) : O === "webdav" ? await (zt == null ? void 0 : zt(t)) : O === "idb" && await (Tt == null ? void 0 : Tt(t));
    }, [
      O,
      _t,
      zt,
      Tt
    ]), Gt = (d == null ? void 0 : d.id) || null, Vt = s.useCallback((t, n) => t !== O ? null : kn(ce, n) || at(ce, n), [
      O,
      ce
    ]), Gr = s.useCallback((t) => {
      S.current = t, k(t), v(t);
    }, [
      v
    ]);
    os(z, c && f && !ne, {
      primaryDrag: true,
      axis: "x",
      shouldIgnorePrimaryTarget: Os
    }), s.useEffect(() => () => v(null), [
      v
    ]);
    const Qt = s.useCallback((t, n) => {
      var _a2;
      const l = vn(t, Vt, {
        excludePath: Gt
      });
      if (!l.length) {
        h({
          message: "\uCD94\uAC00\uD560 \uD30C\uC77C\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",
          durationMs: 2200
        });
        return;
      }
      const g = A.current;
      if (!g.columns.length) return;
      const m = jn(g), p = l.filter((W) => !m.has(W.linkPath));
      if (!p.length) {
        h({
          message: "\uC774\uBBF8 \uC5F0\uACB0\uB41C \uCE74\uB4DC\uC785\uB2C8\uB2E4",
          durationMs: 2200
        });
        return;
      }
      const y = n != null ? Nr(n.clientX, n.clientY, S.current) : null, P = (y == null ? void 0 : y.columnId) && g.columns.some((W) => W.id === y.columnId) && y.columnId || g.columns[0].id, _ = (y == null ? void 0 : y.laneId) && g.lanes.some((W) => W.id === y.laneId) && y.laneId || ((_a2 = g.lanes[0]) == null ? void 0 : _a2.id);
      let L = g, U = null, H = 0, V = false;
      const F = _ || L.lanes[0].id;
      for (const W of p) {
        if (!Ce(L, P, F)) {
          V = true;
          break;
        }
        L = ot(L, P, {
          title: W.title,
          linkPaths: [
            W.linkPath
          ]
        }, F);
        const R = he(L.columns.find((tr) => tr.id === P), F);
        U = R[R.length - 1] || U, H += 1;
      }
      H > 0 ? (N(L), U && Y(U), h({
        message: V ? `\uCE74\uB4DC ${H}\uAC1C \uCD94\uAC00 (\uC140 \uD55C\uB3C4)` : `\uCE74\uB4DC ${H}\uAC1C \uCD94\uAC00`,
        durationMs: 2500
      })) : V && h({
        message: "\uC140\uB2F9 \uCD5C\uB300 \uCE74\uB4DC \uC218\uC5D0 \uB3C4\uB2EC\uD588\uC2B5\uB2C8\uB2E4",
        durationMs: 2200
      });
    }, [
      N,
      Gt,
      Vt,
      Y,
      h
    ]);
    s.useEffect(() => (C(Qt), () => C(null)), [
      C,
      Qt
    ]), s.useEffect(() => (x(c && f), () => x(false)), [
      c,
      f,
      x
    ]);
    const nt = s.useCallback((t, n) => {
      const l = Es(t);
      if (l) return l;
      const g = ct(t);
      if (g) return g;
      const m = te(t);
      return m ? Cn(n, m) : null;
    }, []), Zt = s.useCallback((t, n) => {
      var _a2, _b, _c;
      const l = Ls(t);
      if (l) return l;
      const g = te(t);
      return g ? ((_a2 = lt(n, g)) == null ? void 0 : _a2.laneId) || ((_b = n.cards[g]) == null ? void 0 : _b.laneId) || null : ((_c = n.lanes[0]) == null ? void 0 : _c.id) ?? null;
    }, []), Yt = s.useCallback((t, n, l, g) => {
      var _a2;
      if (!n) return t.length;
      const m = t.indexOf(n);
      if (m < 0) return t.length;
      if (n === g) return m;
      const p = ((_a2 = ke.current) == null ? void 0 : _a2.y) ?? null, y = l && typeof l.top == "number" ? {
        left: l.left ?? 0,
        right: l.right ?? (l.left ?? 0) + (l.width ?? 0),
        top: l.top,
        bottom: l.bottom ?? l.top + (l.height ?? 0),
        width: l.width ?? 0,
        height: l.height ?? 0
      } : null;
      return Ns(y, p) ? m + 1 : m;
    }, []), Vr = (t) => {
      Re.current = null, J.current = je(A.current);
      const n = t.active.rect.current.initial, l = t.activatorEvent;
      l && typeof l.clientX == "number" ? ke.current = {
        x: l.clientX,
        y: l.clientY
      } : n && (ke.current = {
        x: n.left + n.width / 2,
        y: n.top + n.height / 2
      }), Qe(String(t.active.id));
    };
    s.useEffect(() => {
      if (!ne) {
        ke.current = null;
        return;
      }
      const t = (n) => {
        ke.current = {
          x: n.clientX,
          y: n.clientY
        };
      };
      return window.addEventListener("pointermove", t, true), () => window.removeEventListener("pointermove", t, true);
    }, [
      ne
    ]);
    const Qr = (t) => {
      var _a2;
      const { active: n, over: l } = t;
      if (!l) return;
      const g = String(n.id), m = String(l.id), p = te(g);
      if (!p) return;
      const y = A.current, P = lt(y, p), _ = nt(m, y), L = Zt(m, y) || ((_a2 = y.lanes[0]) == null ? void 0 : _a2.id) || null;
      if (!P || !_ || !L) return;
      const U = te(m), H = y.columns.find((R) => R.id === _);
      if (!H) return;
      const V = he(H, L);
      let F = Yt(V, U, l.rect, p);
      if (P.columnId === _ && P.laneId === L) {
        const R = V.indexOf(p);
        if (R < 0 || (R < F && (F -= 1), F = Math.max(0, Math.min(F, V.length - 1)), R === F)) return;
      }
      N(xr(y, p, _, F, L), {
        recordUndo: false
      });
    }, be = () => {
      const t = J.current;
      if (J.current = null, !t || !Ae.current || G.current) return;
      const n = je(A.current);
      if (n === t) return;
      const l = q.current.slice(0, X.current + 1);
      l[l.length - 1] !== t && l.push(t), l[l.length - 1] !== n && l.push(n), l.length > 100 && l.splice(0, l.length - 100), q.current = l, X.current = l.length - 1;
    }, Zr = (t) => {
      var _a2;
      const { active: n, over: l } = t;
      if (Qe(null), Re.current = null, !l) {
        be();
        return;
      }
      const g = String(n.id), m = String(l.id), p = A.current, y = wr(g);
      if (y) {
        J.current = null;
        const B = wr(m);
        B && y !== B && N(Bn(p, y, B));
        return;
      }
      const P = ct(g);
      if (P) {
        J.current = null;
        let B = ct(m);
        B || (B = nt(m, p)), B && P !== B && N($n(p, P, B));
        return;
      }
      const _ = te(g);
      if (!_) {
        J.current = null;
        return;
      }
      const L = lt(p, _), U = nt(m, p), H = Zt(m, p) || ((_a2 = p.lanes[0]) == null ? void 0 : _a2.id) || null;
      if (!L || !U || !H) {
        be();
        return;
      }
      const V = te(m), F = p.columns.find((B) => B.id === U);
      if (!F) {
        be();
        return;
      }
      const W = he(F, H);
      let R = Yt(W, V, l.rect, _);
      if (L.columnId === U && L.laneId === H) {
        const B = W.indexOf(_);
        if (B < 0) {
          be();
          return;
        }
        if (B < R && (R -= 1), R = Math.max(0, Math.min(R, W.length - 1)), B === R) {
          be();
          return;
        }
      }
      N(xr(p, _, U, R, H), {
        recordUndo: false
      }), be();
    }, Yr = () => {
      Qe(null), Re.current = null;
      const t = J.current;
      if (J.current = null, t && t !== je(A.current)) {
        const n = ve(t);
        G.current = true, A.current = n.document, xe(n.document), pe.current(t), requestAnimationFrame(() => {
          G.current = false;
        });
      }
    }, Jt = (() => {
      if (!ne) return null;
      const t = te(ne);
      return t && j.cards[t] || null;
    })(), Jr = j.columns.map((t) => _r(t.id)), M = j.settings, er = M.swimlanesEnabled ? j.lanes : j.lanes.slice(0, 1), en = er.map((t) => Tr(t.id)), tn = s.useCallback((t) => {
      N(Nn(A.current, t));
    }, [
      N
    ]), rn = s.useCallback((t, n) => {
      var _a2;
      if (t.folderPath == null) {
        h({
          message: "\uBA3C\uC800 \uC5F4 \uD3F4\uB354\uB97C \uC5F0\uACB0\uD558\uC138\uC694",
          durationMs: 2500
        });
        return;
      }
      if (!Ce(A.current, t.id, n)) {
        h({
          message: "\uC140\uB2F9 \uCD5C\uB300 \uCE74\uB4DC \uC218\uC5D0 \uB3C4\uB2EC\uD588\uC2B5\uB2C8\uB2E4",
          durationMs: 2200
        });
        return;
      }
      const l = t.folderPath || "";
      let g = null;
      O === "local" && (l ? g = ((_a2 = at(ae, l) || at(ae, `${l}/`)) == null ? void 0 : _a2.handle) || null : g = Oe), Rt({
        storageType: O,
        parentPath: l ? l.endsWith("/") ? l : `${l}/` : "",
        parentDirHandle: g,
        type: "file",
        onCreatedPath: (m) => {
          if (!Ce(A.current, t.id, n)) {
            h({
              message: "\uC140\uB2F9 \uCD5C\uB300 \uCE74\uB4DC \uC218\uC5D0 \uB3C4\uB2EC\uD588\uC2B5\uB2C8\uB2E4",
              durationMs: 2200
            });
            return;
          }
          const p = String(m).split("/").filter(Boolean).pop() || "\uC0C8 \uB178\uD2B8", y = ot(A.current, t.id, {
            title: p,
            linkPaths: [
              m
            ]
          }, n);
          N(y);
          const P = he(y.columns.find((L) => L.id === t.id), n), _ = P[P.length - 1];
          _ && Y(_);
        }
      }), Bt(true);
    }, [
      N,
      Oe,
      ae,
      Y,
      Rt,
      Bt,
      h,
      O
    ]);
    return e.jsxs("div", {
      className: "flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-white dark:bg-odp-surface",
      children: [
        Et ? e.jsx("div", {
          role: "alert",
          className: "shrink-0 border-b border-amber-300 bg-amber-50 px-4 py-2 text-xs text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100",
          children: Et
        }) : null,
        Pe ? e.jsxs("div", {
          "data-kanban-board-search": "",
          className: "flex shrink-0 items-center gap-2 border-b border-gray-200 bg-slate-50 px-3 py-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft/50",
          children: [
            e.jsx(qn, {
              size: 14,
              className: "shrink-0 text-gray-500",
              "aria-hidden": true
            }),
            e.jsx("input", {
              ref: I,
              type: "search",
              value: Ee,
              placeholder: "\uC81C\uBAA9 \xB7 \uBCF8\uBB38 \xB7 \uD0DC\uADF8 \uAC80\uC0C9",
              "aria-label": "\uCE78\uBC18 \uCE74\uB4DC \uAC80\uC0C9",
              className: "min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-surface",
              onChange: (t) => {
                Ve(t.target.value), ie(0);
              },
              onKeyDown: (t) => {
                if (t.key === "Escape") {
                  t.preventDefault(), Wt();
                  return;
                }
                if (t.key === "Enter") {
                  if (t.preventDefault(), !D.length) return;
                  const n = t.shiftKey ? Z - 1 : Z + 1;
                  tt(n);
                  const l = D[(n % D.length + D.length) % D.length];
                  l && Y(l);
                }
              }
            }),
            e.jsx("span", {
              className: "shrink-0 text-xs text-gray-500 tabular-nums",
              children: ye ? D.length ? `${Z + 1}/${D.length}` : "0" : ""
            }),
            e.jsx(E, {
              type: "button",
              variant: "secondary",
              disabled: !D.length,
              onClick: () => tt(Z - 1),
              "aria-label": "\uC774\uC804 \uACB0\uACFC",
              children: "\u2191"
            }),
            e.jsx(E, {
              type: "button",
              variant: "secondary",
              disabled: !D.length,
              onClick: () => tt(Z + 1),
              "aria-label": "\uB2E4\uC74C \uACB0\uACFC",
              children: "\u2193"
            }),
            e.jsx("button", {
              type: "button",
              "aria-label": "\uAC80\uC0C9 \uB2EB\uAE30",
              className: "inline-flex rounded p-1 text-gray-500 hover:bg-gray-200 dark:hover:bg-odp-focusBg",
              onClick: Wt,
              children: e.jsx(re, {
                size: 14
              })
            })
          ]
        }) : null,
        e.jsxs("div", {
          className: "flex min-h-0 flex-1 overflow-hidden",
          children: [
            e.jsx("div", {
              ref: Gr,
              className: "relative min-h-0 min-w-0 flex-1 cursor-grab overflow-auto p-3 active:cursor-grabbing",
              "data-kanban-tree-card-drop-host": "",
              "data-kanban-board-scroll": "",
              children: e.jsxs(wn, {
                sensors: Hr,
                collisionDetection: Ur,
                measuring: As,
                autoScroll: _s,
                modifiers: Ts,
                onDragStart: Vr,
                onDragOver: Qr,
                onDragEnd: Zr,
                onDragCancel: Yr,
                children: [
                  e.jsxs("div", {
                    className: "flex min-h-full min-w-max flex-col gap-3",
                    children: [
                      e.jsx(dt, {
                        items: Jr,
                        strategy: In,
                        children: e.jsxs("div", {
                          className: "flex items-stretch",
                          children: [
                            M.swimlanesEnabled ? e.jsx("div", {
                              className: "w-36 shrink-0 pr-2 pt-2",
                              children: e.jsxs(E, {
                                type: "button",
                                variant: "secondary",
                                className: "w-full",
                                disabled: !cr(j),
                                onClick: () => {
                                  if (!cr(j)) {
                                    h({
                                      message: "\uCD5C\uB300 \uB808\uC778 \uC218\uC5D0 \uB3C4\uB2EC\uD588\uC2B5\uB2C8\uB2E4",
                                      durationMs: 2200
                                    });
                                    return;
                                  }
                                  N(Dn(j));
                                },
                                children: [
                                  e.jsx(ir, {
                                    size: 14
                                  }),
                                  "\uB808\uC778 \uCD94\uAC00"
                                ]
                              })
                            }) : null,
                            j.columns.map((t, n) => {
                              const l = ur(t.width), g = (me == null ? void 0 : me.id) === t.id ? me.width : l, m = n === j.columns.length - 1;
                              return e.jsxs(s.Fragment, {
                                children: [
                                  e.jsx(Ks, {
                                    column: t,
                                    widthPx: g,
                                    isWidthResizing: (me == null ? void 0 : me.id) === t.id,
                                    sortableDisabled: qt,
                                    header: e.jsxs(e.Fragment, {
                                      children: [
                                        M.columnIconsEnabled ? e.jsx(ds, {
                                          icon: t.icon,
                                          onChange: (p) => N(ee(j, t.id, {
                                            icon: p
                                          }))
                                        }) : null,
                                        e.jsx("input", {
                                          type: "text",
                                          value: t.title,
                                          "aria-label": "\uC5F4 \uC774\uB984",
                                          className: "min-w-0 flex-1 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-sm font-semibold text-gray-800 outline-none hover:border-gray-300 focus:border-blue-400 dark:text-odp-fgStrong dark:hover:border-odp-borderSoft",
                                          onChange: (p) => N(ee(j, t.id, {
                                            title: p.target.value
                                          }))
                                        }),
                                        e.jsx("span", {
                                          className: "shrink-0 text-[11px] text-gray-400",
                                          children: Pn(t)
                                        }),
                                        M.coversEnabled ? e.jsx("button", {
                                          type: "button",
                                          "aria-label": "\uC5F4 \uCEE4\uBC84",
                                          className: "inline-flex items-center justify-center rounded p-1 text-gray-500 hover:bg-gray-200/80 dark:hover:bg-odp-focusBg",
                                          onClick: () => Se({
                                            kind: "column",
                                            id: t.id
                                          }),
                                          children: e.jsx(gr, {
                                            size: 14
                                          })
                                        }) : null,
                                        M.columnFoldersEnabled ? e.jsx("button", {
                                          type: "button",
                                          "aria-label": "\uC5F4 \uD3F4\uB354",
                                          className: `inline-flex items-center justify-center rounded p-1 hover:bg-gray-200/80 dark:hover:bg-odp-focusBg ${t.folderPath != null ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500"}`,
                                          onClick: () => He(t.id),
                                          children: e.jsx(yr, {
                                            size: 14
                                          })
                                        }) : null,
                                        M.columnColorsEnabled ? e.jsx(jt, {
                                          delayDuration: 250,
                                          skipDelayDuration: 0,
                                          children: e.jsxs(Ir, {
                                            open: Kr === t.id,
                                            onOpenChange: (p) => Fr(p ? t.id : null),
                                            children: [
                                              e.jsxs(Ct, {
                                                children: [
                                                  e.jsx(Nt, {
                                                    asChild: true,
                                                    children: e.jsx(Dr, {
                                                      asChild: true,
                                                      children: e.jsx("button", {
                                                        type: "button",
                                                        "aria-label": "\uC5F4 \uC0C9\uC0C1",
                                                        className: "inline-flex items-center justify-center rounded p-1 text-gray-500 hover:bg-gray-200/80 dark:hover:bg-odp-focusBg",
                                                        children: e.jsx(Gn, {
                                                          size: 14,
                                                          style: t.color ? {
                                                            color: t.color
                                                          } : void 0
                                                        })
                                                      })
                                                    })
                                                  }),
                                                  e.jsx(wt, {
                                                    children: e.jsxs(St, {
                                                      side: "top",
                                                      sideOffset: 6,
                                                      className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong",
                                                      children: [
                                                        "\uC5F4 \uC0C9\uC0C1",
                                                        e.jsx(It, {
                                                          className: "fill-white dark:fill-odp-surface"
                                                        })
                                                      ]
                                                    })
                                                  })
                                                ]
                                              }),
                                              e.jsx(Pr, {
                                                children: e.jsxs(Er, {
                                                  side: "bottom",
                                                  sideOffset: 6,
                                                  className: "z-100010 w-56 rounded-md border border-gray-200 bg-white p-3 shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface",
                                                  children: [
                                                    e.jsx("div", {
                                                      className: "[&_.react-colorful]:h-32 [&_.react-colorful]:w-full",
                                                      children: e.jsx(Wn, {
                                                        color: t.color || "#64748b",
                                                        onChange: (p) => {
                                                          const y = fr(p.startsWith("#") ? p : `#${p}`);
                                                          N(ee(j, t.id, {
                                                            color: y || null
                                                          }));
                                                        }
                                                      })
                                                    }),
                                                    e.jsx(Xn, {
                                                      prefixed: true,
                                                      color: t.color || "#64748b",
                                                      onChange: (p) => {
                                                        const y = fr(p.startsWith("#") ? p : `#${p}`);
                                                        N(ee(j, t.id, {
                                                          color: y || null
                                                        }));
                                                      },
                                                      className: "mt-2 w-full rounded border border-gray-300 bg-white px-2 py-1 font-mono text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                                                    }),
                                                    e.jsxs(E, {
                                                      type: "button",
                                                      variant: "secondary",
                                                      className: "mt-2 w-full",
                                                      onClick: () => N(ee(j, t.id, {
                                                        color: null
                                                      })),
                                                      children: [
                                                        e.jsx(re, {
                                                          size: 14
                                                        }),
                                                        "\uC0C9\uC0C1 \uC9C0\uC6B0\uAE30"
                                                      ]
                                                    })
                                                  ]
                                                })
                                              })
                                            ]
                                          })
                                        }) : null,
                                        e.jsx("button", {
                                          type: "button",
                                          "aria-label": "\uC5F4 \uC0AD\uC81C",
                                          className: "inline-flex items-center justify-center rounded p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40",
                                          onClick: () => Ye(t.id),
                                          children: e.jsx(kr, {
                                            size: 14
                                          })
                                        })
                                      ]
                                    }),
                                    children: M.coversEnabled && t.coverPath ? e.jsx(ft, {
                                      path: t.coverPath,
                                      variant: "column",
                                      ...b ? {
                                        resolveUrl: b
                                      } : {}
                                    }) : null
                                  }),
                                  e.jsx(Fs, {
                                    columnWidthPx: g,
                                    onLiveWidth: (p) => At({
                                      id: t.id,
                                      width: p
                                    }),
                                    onCommitWidth: (p) => {
                                      At(null), N(ee(A.current, t.id, {
                                        width: p
                                      }));
                                    }
                                  }),
                                  m ? e.jsx("div", {
                                    className: "flex w-40 shrink-0 items-start pl-1 pt-1",
                                    children: e.jsxs(E, {
                                      type: "button",
                                      variant: "secondary",
                                      className: "w-full",
                                      disabled: !br(j),
                                      onClick: () => {
                                        if (!br(j)) {
                                          h({
                                            message: "\uCD5C\uB300 \uC5F4 \uC218\uC5D0 \uB3C4\uB2EC\uD588\uC2B5\uB2C8\uB2E4",
                                            durationMs: 2200
                                          });
                                          return;
                                        }
                                        N(En(j));
                                      },
                                      children: [
                                        e.jsx(ir, {
                                          size: 14
                                        }),
                                        "\uC5F4 \uCD94\uAC00"
                                      ]
                                    })
                                  }) : null
                                ]
                              }, t.id);
                            })
                          ]
                        })
                      }),
                      e.jsx(dt, {
                        items: en,
                        strategy: Sr,
                        children: er.map((t) => e.jsxs("div", {
                          className: "flex items-stretch",
                          children: [
                            M.swimlanesEnabled ? e.jsx("div", {
                              className: "w-36 shrink-0",
                              children: e.jsxs(Xs, {
                                lane: t,
                                disabled: qt,
                                children: [
                                  e.jsx("input", {
                                    type: "text",
                                    value: t.title,
                                    "aria-label": "\uB808\uC778 \uC774\uB984",
                                    className: "min-w-0 flex-1 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-xs font-semibold text-gray-700 outline-none hover:border-gray-300 focus:border-blue-400 dark:text-odp-fgStrong",
                                    onChange: (n) => N(Ln(j, t.id, {
                                      title: n.target.value
                                    }))
                                  }),
                                  j.lanes.length > 1 ? e.jsx("button", {
                                    type: "button",
                                    "aria-label": "\uB808\uC778 \uC0AD\uC81C",
                                    className: "inline-flex rounded p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40",
                                    onClick: () => qe(t.id),
                                    children: e.jsx(kr, {
                                      size: 12
                                    })
                                  }) : null
                                ]
                              })
                            }) : null,
                            j.columns.map((n, l) => {
                              const g = ur(n.width), m = (me == null ? void 0 : me.id) === n.id ? me.width : g, p = he(n, t.id);
                              return e.jsxs(s.Fragment, {
                                children: [
                                  e.jsxs("div", {
                                    style: {
                                      width: m
                                    },
                                    className: "flex shrink-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-slate-50/60 dark:border-odp-borderSoft dark:bg-odp-bgSoft/50",
                                    children: [
                                      e.jsxs("div", {
                                        className: "flex shrink-0 items-center justify-end gap-0.5 border-b border-gray-100 px-1 py-0.5 dark:border-odp-borderSoft",
                                        children: [
                                          e.jsx("button", {
                                            type: "button",
                                            "aria-label": "\uCE74\uB4DC \uCD94\uAC00",
                                            className: "inline-flex rounded p-1 text-gray-500 hover:bg-gray-200/80 dark:hover:bg-odp-focusBg disabled:opacity-40",
                                            disabled: !Ce(j, n.id, t.id),
                                            onClick: () => {
                                              if (!Ce(j, n.id, t.id)) {
                                                h({
                                                  message: "\uC140\uB2F9 \uCD5C\uB300 \uCE74\uB4DC \uC218\uC5D0 \uB3C4\uB2EC\uD588\uC2B5\uB2C8\uB2E4",
                                                  durationMs: 2200
                                                });
                                                return;
                                              }
                                              const y = ot(j, n.id, {
                                                title: "\uC0C8 \uCE74\uB4DC"
                                              }, t.id);
                                              N(y);
                                              const P = he(y.columns.find((L) => L.id === n.id), t.id), _ = P[P.length - 1];
                                              _ && Y(_);
                                            },
                                            children: e.jsx(Vn, {
                                              size: 12
                                            })
                                          }),
                                          M.columnFoldersEnabled && n.folderPath != null ? e.jsx("button", {
                                            type: "button",
                                            "aria-label": "\uB178\uD2B8 \uCD94\uAC00",
                                            className: "inline-flex rounded p-1 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30",
                                            onClick: () => rn(n, t.id),
                                            children: e.jsx(yr, {
                                              size: 12
                                            })
                                          }) : null
                                        ]
                                      }),
                                      e.jsx(Ws, {
                                        columnId: n.id,
                                        laneId: t.id,
                                        children: e.jsx(dt, {
                                          items: p.map(zr),
                                          strategy: Sr,
                                          children: p.map((y) => {
                                            const P = j.cards[y];
                                            return P ? e.jsx(Hs, {
                                              card: P,
                                              columnId: n.id,
                                              laneId: t.id,
                                              isSelected: $ === y,
                                              searchDimmed: ye && !Xr.has(y),
                                              searchHit: ye && D[Z] === y,
                                              ...b ? {
                                                resolveCoverUrl: b
                                              } : {},
                                              showCover: M.coversEnabled,
                                              showTags: M.tagsEnabled,
                                              showLinks: M.linksEnabled,
                                              onSelect: () => {
                                                if (ge && $ && $ !== y) {
                                                  De(false), Ie(true), T.current = y;
                                                  return;
                                                }
                                                Y(y);
                                              }
                                            }, y) : null;
                                          })
                                        })
                                      })
                                    ]
                                  }),
                                  e.jsx("div", {
                                    className: "w-3 shrink-0",
                                    "aria-hidden": true
                                  }),
                                  l === j.columns.length - 1 ? e.jsx("div", {
                                    className: "w-40 shrink-0",
                                    "aria-hidden": true
                                  }) : null
                                ]
                              }, `${t.id}:${n.id}`);
                            })
                          ]
                        }, t.id))
                      })
                    ]
                  }),
                  e.jsx(An, {
                    dropAnimation: null,
                    children: Jt ? e.jsx(Us, {
                      card: Jt
                    }) : null
                  })
                ]
              })
            }),
            ue && w ? e.jsxs("aside", {
              className: "relative flex h-full min-h-0 shrink-0 flex-col border-l border-gray-200 bg-slate-50/50 dark:border-odp-borderSoft dark:bg-odp-bgSoft/40",
              style: {
                width: et.width
              },
              children: [
                e.jsx(Is, {
                  edge: "left",
                  visibleOnHover: true,
                  isResizing: et.isResizing,
                  label: "\uCE74\uB4DC \uD3B8\uC9D1 \uD328\uB110 \uB108\uBE44 \uC870\uC808",
                  handleProps: et.handleProps
                }),
                e.jsxs("header", {
                  className: "flex shrink-0 items-center justify-between gap-2 border-b border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
                  children: [
                    e.jsxs("div", {
                      className: "min-w-0",
                      children: [
                        e.jsx("h3", {
                          className: "text-sm font-semibold text-gray-800 dark:text-odp-fgStrong",
                          children: "\uCE74\uB4DC \uD3B8\uC9D1"
                        }),
                        ge ? e.jsx("p", {
                          className: "text-[11px] text-amber-600 dark:text-amber-400",
                          children: "\uC800\uC7A5\uB418\uC9C0 \uC54A\uC740 \uBCC0\uACBD"
                        }) : null
                      ]
                    }),
                    e.jsx("button", {
                      type: "button",
                      "aria-label": "\uD328\uB110 \uB2EB\uAE30",
                      className: "inline-flex rounded p-1 text-gray-500 hover:bg-gray-200 dark:hover:bg-odp-focusBg",
                      onClick: Wr,
                      children: e.jsx(re, {
                        size: 14
                      })
                    })
                  ]
                }),
                e.jsxs("div", {
                  className: "flex shrink-0 flex-col gap-2 border-b border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
                  children: [
                    e.jsxs("label", {
                      className: "block space-y-1",
                      children: [
                        e.jsx("span", {
                          className: "text-xs font-medium text-gray-600 dark:text-odp-muted",
                          children: "\uC81C\uBAA9"
                        }),
                        e.jsx("input", {
                          type: "text",
                          value: w.title,
                          className: "w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-surface",
                          onChange: (t) => K((n) => n && {
                            ...n,
                            title: t.target.value
                          })
                        })
                      ]
                    }),
                    M.coversEnabled ? e.jsxs("div", {
                      className: "space-y-1",
                      children: [
                        e.jsx("span", {
                          className: "text-xs font-medium text-gray-600 dark:text-odp-muted",
                          children: "\uCEE4\uBC84"
                        }),
                        w.coverPath ? e.jsx(ft, {
                          path: w.coverPath,
                          variant: "card",
                          className: "rounded-md",
                          ...b ? {
                            resolveUrl: b
                          } : {}
                        }) : null,
                        e.jsxs("div", {
                          className: "flex gap-1",
                          children: [
                            e.jsxs(E, {
                              type: "button",
                              variant: "secondary",
                              className: "flex-1",
                              onClick: () => Se({
                                kind: "card",
                                id: $ || ""
                              }),
                              children: [
                                e.jsx(gr, {
                                  size: 14
                                }),
                                w.coverPath ? "\uCEE4\uBC84 \uBCC0\uACBD" : "\uCEE4\uBC84 \uCD94\uAC00"
                              ]
                            }),
                            w.coverPath ? e.jsx(E, {
                              type: "button",
                              variant: "secondary",
                              onClick: () => K((t) => t && {
                                ...t,
                                coverPath: null
                              }),
                              children: e.jsx(re, {
                                size: 14
                              })
                            }) : null
                          ]
                        })
                      ]
                    }) : null,
                    M.tagsEnabled ? e.jsxs("div", {
                      className: "space-y-1.5",
                      children: [
                        e.jsx("span", {
                          className: "text-xs font-medium text-gray-600 dark:text-odp-muted",
                          children: "\uD0DC\uADF8"
                        }),
                        e.jsx("div", {
                          className: "flex flex-wrap gap-1",
                          children: w.tags.map((t) => e.jsxs("span", {
                            className: "inline-flex items-center gap-0.5 rounded-full bg-violet-50 px-2 py-0.5 text-[11px] text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
                            children: [
                              t,
                              e.jsx("button", {
                                type: "button",
                                "aria-label": `${t} \uD0DC\uADF8 \uC81C\uAC70`,
                                className: "rounded p-0.5 hover:bg-violet-100 dark:hover:bg-violet-900/50",
                                onClick: () => K((n) => n && {
                                  ...n,
                                  tags: n.tags.filter((l) => l !== t)
                                }),
                                children: e.jsx(ut, {
                                  size: 10
                                })
                              })
                            ]
                          }, t))
                        }),
                        e.jsxs("div", {
                          className: "flex gap-1.5",
                          children: [
                            e.jsx("input", {
                              type: "text",
                              value: Xe,
                              placeholder: "\uD0DC\uADF8 \uC785\uB825 \uD6C4 Enter",
                              className: "min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-surface",
                              onChange: (t) => le(t.target.value),
                              onKeyDown: (t) => {
                                if (t.key !== "Enter") return;
                                t.preventDefault();
                                const n = hr([
                                  ...w.tags,
                                  Xe
                                ]);
                                K((l) => l && {
                                  ...l,
                                  tags: n
                                }), le("");
                              }
                            }),
                            e.jsx(E, {
                              type: "button",
                              variant: "secondary",
                              "aria-label": "\uD0DC\uADF8 \uCD94\uAC00",
                              onClick: () => {
                                const t = hr([
                                  ...w.tags,
                                  Xe
                                ]);
                                K((n) => n && {
                                  ...n,
                                  tags: t
                                }), le("");
                              },
                              children: e.jsx(Qn, {
                                size: 14
                              })
                            })
                          ]
                        })
                      ]
                    }) : null,
                    M.linksEnabled ? e.jsxs("div", {
                      className: "space-y-1.5",
                      children: [
                        e.jsx("span", {
                          className: "text-xs font-medium text-gray-600 dark:text-odp-muted",
                          children: "Vault \uB9C1\uD06C"
                        }),
                        w.linkPaths.length > 0 ? e.jsx("ul", {
                          className: "space-y-1",
                          children: w.linkPaths.map((t) => e.jsxs("li", {
                            className: "flex items-center gap-1",
                            children: [
                              e.jsx("button", {
                                type: "button",
                                className: "min-w-0 flex-1 truncate rounded border border-blue-200 bg-blue-50 px-2 py-1.5 text-left text-xs text-blue-700 hover:underline dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300",
                                onClick: () => {
                                  qr(t);
                                },
                                children: t
                              }),
                              e.jsx("button", {
                                type: "button",
                                "aria-label": `${t} \uC5F0\uACB0 \uD574\uC81C`,
                                className: "shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-odp-focusBg",
                                onClick: () => K((n) => n && {
                                  ...n,
                                  linkPaths: n.linkPaths.filter((l) => l !== t)
                                }),
                                children: e.jsx(ut, {
                                  size: 12
                                })
                              })
                            ]
                          }, t))
                        }) : e.jsx("p", {
                          className: "text-xs text-gray-400",
                          children: "\uC5F0\uACB0\uB41C \uD30C\uC77C \uC5C6\uC74C"
                        }),
                        e.jsxs(E, {
                          type: "button",
                          variant: "secondary",
                          onClick: () => Ne(true),
                          children: [
                            e.jsx(Zn, {
                              size: 14
                            }),
                            "\uD30C\uC77C \uC5F0\uACB0"
                          ]
                        })
                      ]
                    }) : null
                  ]
                }),
                e.jsxs("div", {
                  className: "flex min-h-0 flex-1 flex-col overflow-hidden",
                  children: [
                    e.jsx("div", {
                      className: "shrink-0 px-3 pt-2 text-xs font-medium text-gray-600 dark:text-odp-muted",
                      children: "\uBCF8\uBB38"
                    }),
                    e.jsx("div", {
                      className: "min-h-0 flex-1 overflow-hidden px-2 pb-2 pt-1",
                      children: e.jsx("div", {
                        className: "kanban-card-md-editor h-full min-h-0 overflow-hidden rounded-md border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-surface [&_.haim-editor]:h-full [&_.md-editor]:h-full [&_.md-editor-content]:min-h-0",
                        children: e.jsx(s.Suspense, {
                          fallback: e.jsx($s, {}),
                          children: e.jsx(Ss, {
                            value: w.body,
                            onChange: (t) => K((n) => n && {
                              ...n,
                              body: t
                            }),
                            onSave: Kt,
                            theme: u,
                            isActiveFile: true,
                            isSurfaceLive: true,
                            ...d ? {
                              currentFile: d
                            } : {},
                            ...b ? {
                              onResolveWikiImageUrl: b
                            } : {}
                          }, ue.id)
                        })
                      })
                    })
                  ]
                }),
                e.jsxs("footer", {
                  className: "flex shrink-0 flex-col gap-2 border-t border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
                  children: [
                    e.jsxs(E, {
                      type: "button",
                      variant: "primary",
                      className: "w-full",
                      disabled: !ge,
                      onClick: Kt,
                      children: [
                        e.jsx(zn, {
                          size: 14
                        }),
                        "\uCE74\uB4DC \uC800\uC7A5"
                      ]
                    }),
                    e.jsxs(E, {
                      type: "button",
                      variant: "danger",
                      className: "w-full",
                      onClick: () => Je(ue.id),
                      children: [
                        e.jsx(Tn, {
                          size: 14
                        }),
                        "\uCE74\uB4DC \uC0AD\uC81C"
                      ]
                    })
                  ]
                })
              ]
            }) : null
          ]
        }),
        e.jsx($e, {
          isOpen: !!Ze,
          title: "\uC5F4 \uC0AD\uC81C",
          message: "\uC774 \uC5F4\uACFC \uC548\uC758 \uCE74\uB4DC\uB97C \uBAA8\uB450 \uC0AD\uC81C\uD560\uAE4C\uC694?",
          variant: "danger",
          confirmLabel: "\uC0AD\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          onConfirm: () => {
            if (!Ze) return;
            const t = On(j, Ze);
            N(t), $ && !Object.prototype.hasOwnProperty.call(t.cards, $) && fe(), Ye(null);
          },
          onCancel: () => Ye(null)
        }),
        e.jsx($e, {
          isOpen: !!Le,
          title: "\uCE74\uB4DC \uC0AD\uC81C",
          message: "\uC774 \uCE74\uB4DC\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694?",
          variant: "danger",
          confirmLabel: "\uC0AD\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          onConfirm: () => {
            Le && (N(Mn(j, Le)), $ === Le && fe(), Je(null));
          },
          onCancel: () => Je(null)
        }),
        e.jsx($e, {
          isOpen: Br,
          title: "\uC800\uC7A5\uB418\uC9C0 \uC54A\uC740 \uBCC0\uACBD",
          message: "\uCE74\uB4DC \uD3B8\uC9D1 \uB0B4\uC6A9\uC744 \uBC84\uB9AC\uACE0 \uACC4\uC18D\uD560\uAE4C\uC694?",
          variant: "danger",
          confirmLabel: "\uBC84\uB9AC\uAE30",
          cancelLabel: "\uACC4\uC18D \uD3B8\uC9D1",
          onConfirm: () => {
            Ie(false);
            const t = T.current;
            if (T.current = null, $r) {
              De(false), fe();
              return;
            }
            if (t) {
              Y(t);
              return;
            }
            fe();
          },
          onCancel: () => {
            Ie(false), De(false), T.current = null;
          }
        }),
        e.jsx(vr, {
          isOpen: Mr && !!($ && w),
          onClose: () => Ne(false),
          tree: ce,
          selected: (w == null ? void 0 : w.linkPaths) || [],
          excludePath: (d == null ? void 0 : d.id) || null,
          onConfirm: (t) => {
            K((n) => n && {
              ...n,
              linkPaths: t
            });
          },
          onExpandFolder: rt
        }),
        e.jsx(vr, {
          isOpen: !!de,
          onClose: () => Se(null),
          tree: ce,
          selected: (de == null ? void 0 : de.kind) === "column" ? (() => {
            const t = j.columns.find((n) => n.id === de.id);
            return (t == null ? void 0 : t.coverPath) ? [
              t.coverPath
            ] : [];
          })() : (w == null ? void 0 : w.coverPath) ? [
            w.coverPath
          ] : [],
          excludePath: (d == null ? void 0 : d.id) || null,
          onConfirm: (t) => {
            const n = t[0] || null;
            de && (de.kind === "column" ? N(ee(A.current, de.id, {
              coverPath: n
            })) : K((l) => l && {
              ...l,
              coverPath: n
            }), Se(null));
          },
          onExpandFolder: rt
        }),
        e.jsx(is, {
          isOpen: !!we,
          onClose: () => He(null),
          tree: ce,
          selected: ((_a = j.columns.find((t) => t.id === we)) == null ? void 0 : _a.folderPath) ?? null,
          onConfirm: (t) => {
            we && (N(ee(A.current, we, {
              folderPath: t
            })), He(null));
          },
          onExpandFolder: rt
        }),
        e.jsx($e, {
          isOpen: !!Ue,
          title: "\uB808\uC778 \uC0AD\uC81C",
          message: "\uC774 \uB808\uC778\uC758 \uCE74\uB4DC\uB294 \uCCAB \uBC88\uC9F8 \uB808\uC778\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4. \uC0AD\uC81C\uD560\uAE4C\uC694?",
          variant: "danger",
          confirmLabel: "\uC0AD\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          onConfirm: () => {
            Ue && (N(Rn(j, Ue)), qe(null));
          },
          onCancel: () => qe(null)
        }),
        e.jsx(bs, {
          isOpen: Rr,
          onClose: () => Lt(false),
          settings: M,
          onApply: tn
        })
      ]
    });
  };
});
export {
  __tla,
  ua as default
};
