const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-telegram-D00RM5aC.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-buffer-CTvp1cCp.js","assets/vendor-aws-hJDgVEKM.js"])))=>i.map(i=>d[i]);
import { j as e, r as m, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { ab as B, G as u, b4 as G, dU as xe, dV as me, dW as pe, dX as F, dY as ue, dZ as he, d_ as fe, b3 as se, d$ as ge, e0 as ye, e1 as be, e2 as je, cZ as q, cY as k, __tla as __tla_1 } from "./index-qGWcX3Eh.js";
import { aq as ve, ar as Z, as as ke, at as Ne, au as we, av as Y, aw as K, X as Se, ax as Te, ay as Ce, az as Ae, aA as Le, A as Ee, b as Ie, K as Me, aB as Re } from "./vendor-lucide-DQG_D8MC.js";
import { d as De, __tla as __tla_2 } from "./bootSplash-CNqesnab.js";
import { E as _e, G as Pe, H as J, I as Q, B as ze, F as V, L as $, D as H } from "./vendor-radix-D1Cm_mSM.js";
import { s as Oe, g as W, r as ne, t as le, m as Fe, p as C, a as oe, b as ie, c as Be, l as ee, d as te, e as Ge, f as Ue, h as Ve, i as $e, j as He, k as Ye, n as Ke, o as We, q as Xe, u as qe, v as Ze, __tla as __tla_3 } from "./telegramClient-eT5x9A5Q.js";
import { i as Je } from "./installBrowserBuffer-DKXKH6ya.js";
import { _ as Qe } from "./vendor-aws-hJDgVEKM.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-buffer-CTvp1cCp.js";
let Dt;
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
  function et() {
    return e.jsxs("div", {
      className: "flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-6 text-center",
      children: [
        e.jsx(ve, {
          className: "text-sky-700 dark:text-sky-300",
          size: 28,
          "aria-hidden": true
        }),
        e.jsx("h1", {
          className: "text-lg font-semibold text-gray-900 dark:text-odp-fgStrong",
          children: "Telegram"
        }),
        e.jsx("p", {
          className: "max-w-md text-sm text-gray-600 dark:text-odp-muted",
          children: "\uB370\uC2A4\uD06C\uD1B1 \uB610\uB294 Android \uC571\uC5D0\uC11C\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC6F9 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uC11C\uB294 Telegram \uACC4\uC815\uC5D0 \uC5F0\uACB0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."
        })
      ]
    });
  }
  const ae = "inline-flex flex-1 items-center justify-center gap-1.5 rounded px-2 py-1.5 text-xs font-medium outline-none transition data-[state=inactive]:text-gray-500 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=inactive]:text-odp-muted dark:data-[state=active]:text-white", P = "block text-xs font-semibold text-gray-600 dark:text-odp-muted", z = "mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft", tt = [
    {
      href: "https://telegram.org/tos",
      label: "Telegram \uC774\uC6A9 \uC57D\uAD00"
    },
    {
      href: "https://core.telegram.org/api/terms",
      label: "API \uC774\uC6A9 \uC57D\uAD00"
    }
  ], at = [
    {
      href: "https://my.telegram.org/auth?to=apps",
      label: "my.telegram.org \uB85C\uADF8\uC778"
    },
    {
      href: "https://my.telegram.org/apps",
      label: "API development tools"
    },
    {
      href: "https://core.telegram.org/api/obtaining_api_id",
      label: "API ID \uC548\uB0B4"
    },
    {
      href: "https://core.telegram.org/api/terms",
      label: "API \uC774\uC6A9 \uC57D\uAD00"
    }
  ];
  function rt(t) {
    if (!De()) {
      window.open(t, "_blank", "noopener,noreferrer");
      return;
    }
    xe(t);
  }
  function re({ links: t }) {
    return e.jsx("div", {
      className: "flex flex-col gap-1",
      children: t.map((a) => e.jsxs(u, {
        type: "button",
        variant: "tertiary",
        className: "justify-start px-2",
        onClick: () => rt(a.href),
        children: [
          e.jsx(we, {
            size: 14
          }),
          a.label
        ]
      }, a.href))
    });
  }
  function st({ status: t, error: a, loginHint: n, codeViaApp: s, onSubmitField: o, onSubmitApi: i, onRequestSms: x, onClose: d }) {
    const [c, h] = m.useState(""), [l, N] = m.useState(""), [j, y] = m.useState(""), [f, v] = m.useState("phone"), [w, S] = m.useState(""), [E, I] = m.useState(""), [M, U] = m.useState(""), A = t === "need-name", L = t === "need-phone", R = t === "need-phone" ? "Telegram" : t === "need-code" ? "\uD655\uC778 \uCF54\uB4DC" : A ? "\uC774\uB984" : "2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638", D = e.jsxs("footer", {
      className: "flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
      children: [
        e.jsxs(u, {
          type: "button",
          variant: "secondary",
          onClick: d,
          children: [
            e.jsx(G, {
              size: 14
            }),
            "\uB2EB\uAE30"
          ]
        }),
        e.jsxs(u, {
          type: "submit",
          variant: "primary",
          children: [
            e.jsx(Ne, {
              size: 14
            }),
            "\uACC4\uC18D"
          ]
        })
      ]
    }), g = e.jsxs(e.Fragment, {
      children: [
        A ? e.jsxs(e.Fragment, {
          children: [
            e.jsxs("label", {
              className: P,
              children: [
                "\uC774\uB984",
                e.jsx("input", {
                  className: z,
                  autoComplete: "given-name",
                  value: l,
                  onChange: (r) => N(r.target.value)
                })
              ]
            }),
            e.jsxs("label", {
              className: P,
              children: [
                "\uC131",
                e.jsx("input", {
                  className: z,
                  autoComplete: "family-name",
                  value: j,
                  onChange: (r) => y(r.target.value)
                })
              ]
            })
          ]
        }) : e.jsxs("label", {
          className: P,
          children: [
            t === "need-phone" ? "\uC804\uD654\uBC88\uD638" : R,
            e.jsx("input", {
              className: z,
              type: t === "need-password" ? "password" : "text",
              inputMode: t === "need-phone" ? "tel" : t === "need-code" ? "numeric" : void 0,
              autoComplete: t === "need-code" ? "one-time-code" : "off",
              placeholder: t === "need-phone" ? "+821012345678" : void 0,
              value: c,
              onChange: (r) => h(r.target.value)
            })
          ]
        }),
        t === "need-phone" ? e.jsx(re, {
          links: tt
        }) : null,
        n ? e.jsx("p", {
          className: "text-xs text-gray-600 dark:text-odp-muted",
          children: n
        }) : null,
        t === "need-code" && s ? e.jsxs(u, {
          type: "button",
          variant: "tertiary",
          onClick: x,
          children: [
            e.jsx(Z, {
              size: 14
            }),
            "\uBB38\uC790\uB85C \uB2E4\uC2DC \uBC1B\uAE30"
          ]
        }) : null,
        a ? e.jsx("p", {
          className: "text-xs text-red-600 dark:text-red-300",
          children: a
        }) : null
      ]
    });
    return e.jsx(B, {
      isOpen: true,
      contentClassName: "max-w-md max-h-[90vh]",
      onClose: d,
      children: e.jsxs("div", {
        className: "flex min-h-0 flex-1 flex-col",
        children: [
          e.jsxs("header", {
            className: "shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsx("h2", {
                className: "text-base font-semibold text-gray-900 dark:text-odp-fgStrong",
                children: R
              }),
              e.jsx("p", {
                className: "mt-1 text-xs text-gray-500 dark:text-odp-muted",
                children: L ? "\uBC88\uD638\uB97C \uD655\uC778\uD558\uAC70\uB098, my.telegram.org\uC5D0\uC11C \uBC1B\uC740 API ID\uC640 API Hash\uB97C \uC9C1\uC811 \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uB85C\uADF8\uC778\uD558\uBA74 Telegram \uC774\uC6A9 \uC57D\uAD00\uC5D0 \uB3D9\uC758\uD558\uAC8C \uB429\uB2C8\uB2E4." : "\uD734\uB300\uD3F0 \uBC88\uD638\uB97C \uC785\uB825\uD558\uBA74 Telegram \uC11C\uBC84\uAC00 \uD655\uC778\uD569\uB2C8\uB2E4. \uD655\uC778\uC774 \uB05D\uB098\uBA74 \uC774 \uAE30\uAE30\uC5D0 \uC790\uB3D9\uC73C\uB85C \uC800\uC7A5\uB429\uB2C8\uB2E4. \uB85C\uADF8\uC778\uD558\uBA74 Telegram \uC774\uC6A9 \uC57D\uAD00\uC5D0 \uB3D9\uC758\uD558\uAC8C \uB429\uB2C8\uB2E4."
              })
            ]
          }),
          L ? e.jsxs(_e, {
            value: f,
            onValueChange: (r) => v(r === "api" ? "api" : "phone"),
            className: "flex min-h-0 flex-1 flex-col",
            children: [
              e.jsxs(Pe, {
                className: "mx-6 mt-3 flex shrink-0 gap-1 rounded-md border border-gray-200 p-0.5 dark:border-odp-borderSoft",
                children: [
                  e.jsxs(J, {
                    value: "phone",
                    className: ae,
                    children: [
                      e.jsx(Z, {
                        size: 13,
                        "aria-hidden": true
                      }),
                      "\uC804\uD654\uBC88\uD638"
                    ]
                  }),
                  e.jsxs(J, {
                    value: "api",
                    className: ae,
                    children: [
                      e.jsx(ke, {
                        size: 13,
                        "aria-hidden": true
                      }),
                      "API \uD0A4 \uC785\uB825"
                    ]
                  })
                ]
              }),
              e.jsx(Q, {
                value: "phone",
                className: "flex min-h-0 flex-1 flex-col outline-none",
                children: e.jsxs("form", {
                  className: "flex min-h-0 flex-1 flex-col",
                  onSubmit: (r) => {
                    r.preventDefault(), o(c), h("");
                  },
                  children: [
                    e.jsx("div", {
                      className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4",
                      children: g
                    }),
                    D
                  ]
                })
              }),
              e.jsx(Q, {
                value: "api",
                className: "flex min-h-0 flex-1 flex-col outline-none",
                children: e.jsxs(ze, {
                  className: "flex min-h-0 flex-1 flex-col",
                  onSubmit: (r) => {
                    r.preventDefault(), i({
                      apiId: w,
                      apiHash: E,
                      phone: M
                    });
                  },
                  children: [
                    e.jsxs("div", {
                      className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4",
                      children: [
                        e.jsx("p", {
                          className: "text-xs text-gray-600 dark:text-odp-muted",
                          children: "my.telegram.org\uC758 API development tools\uC5D0 \uC788\uB294 App api_id\uC640 App api_hash\uC785\uB2C8\uB2E4. \uC774 \uAE30\uAE30\uC5D0\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4."
                        }),
                        e.jsx(re, {
                          links: at
                        }),
                        e.jsxs(V, {
                          name: "apiId",
                          className: P,
                          children: [
                            e.jsx($, {
                              children: "API ID"
                            }),
                            e.jsx(H, {
                              asChild: true,
                              children: e.jsx("input", {
                                className: z,
                                inputMode: "numeric",
                                autoComplete: "off",
                                value: w,
                                onChange: (r) => S(r.target.value)
                              })
                            })
                          ]
                        }),
                        e.jsxs(V, {
                          name: "apiHash",
                          className: P,
                          children: [
                            e.jsx($, {
                              children: "API Hash"
                            }),
                            e.jsx(H, {
                              asChild: true,
                              children: e.jsx("input", {
                                className: `${z} font-mono`,
                                autoComplete: "off",
                                spellCheck: false,
                                value: E,
                                onChange: (r) => I(r.target.value)
                              })
                            })
                          ]
                        }),
                        e.jsxs(V, {
                          name: "phone",
                          className: P,
                          children: [
                            e.jsx($, {
                              children: "\uC804\uD654\uBC88\uD638"
                            }),
                            e.jsx(H, {
                              asChild: true,
                              children: e.jsx("input", {
                                className: z,
                                inputMode: "tel",
                                autoComplete: "tel",
                                placeholder: "+821012345678",
                                value: M,
                                onChange: (r) => U(r.target.value)
                              })
                            })
                          ]
                        }),
                        a ? e.jsx("p", {
                          className: "text-xs text-red-600 dark:text-red-300",
                          children: a
                        }) : null
                      ]
                    }),
                    D
                  ]
                })
              })
            ]
          }) : e.jsxs("form", {
            className: "flex min-h-0 flex-1 flex-col",
            onSubmit: (r) => {
              if (r.preventDefault(), A) {
                o(`${l.trim()}
${j.trim()}`);
                return;
              }
              o(c), h("");
            },
            children: [
              e.jsx("div", {
                className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4",
                children: g
              }),
              D
            ]
          })
        ]
      })
    });
  }
  function nt({ dialogs: t, activeId: a, onSelect: n }) {
    return e.jsx("div", {
      className: "flex min-h-0 flex-1 flex-col overflow-y-auto",
      children: t.length === 0 ? e.jsx("p", {
        className: "px-3 py-6 text-sm text-gray-500 dark:text-odp-muted",
        children: "\uB300\uD654\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
      }) : t.map((s) => {
        const o = s.id === a;
        return e.jsxs("button", {
          type: "button",
          onClick: () => n(s.id),
          className: `flex w-full items-start gap-2 px-3 py-2.5 text-left ${o ? "bg-sky-50 dark:bg-sky-950/40" : "hover:bg-gray-100 dark:hover:bg-odp-focusBg"}`,
          children: [
            e.jsx("span", {
              className: "mt-0.5 text-sky-700 dark:text-sky-300",
              children: s.isChannel ? e.jsx(Y, {
                size: 14
              }) : s.isGroup ? e.jsx(K, {
                size: 14
              }) : null
            }),
            e.jsxs("span", {
              className: "min-w-0 flex-1",
              children: [
                e.jsxs("span", {
                  className: "flex items-center gap-2",
                  children: [
                    e.jsx("span", {
                      className: "truncate text-sm font-medium text-gray-900 dark:text-odp-fgStrong",
                      children: s.title
                    }),
                    s.unread > 0 ? e.jsx("span", {
                      className: "rounded-full bg-sky-600 px-1.5 text-[10px] text-white",
                      children: s.unread
                    }) : null
                  ]
                }),
                e.jsx("span", {
                  className: "block truncate text-xs text-gray-500 dark:text-odp-muted",
                  children: s.preview || " "
                })
              ]
            })
          ]
        }, s.id);
      })
    });
  }
  const lt = 500;
  function ot({ message: t, isMobileLayout: a, onReply: n, onForward: s, onShare: o, onSaveToVault: i, onDownload: x }) {
    const d = m.useRef(null), c = m.useRef(null), h = me(a), [l, N] = m.useState(false), j = (t.text || t.mediaName || "\uBA54\uC2DC\uC9C0").slice(0, 80), y = () => {
      d.current && (clearTimeout(d.current), d.current = null);
    };
    return e.jsxs(pe, {
      title: j,
      subtitle: "Telegram \uBA54\uC2DC\uC9C0",
      isMobileLayout: a,
      ...h ? {
        open: l,
        onOpenChange: N
      } : {},
      contentClassName: "z-100010 min-w-48 rounded-md border border-gray-200 bg-white p-1 text-sm shadow dark:border-odp-borderStrong dark:bg-odp-surface",
      trigger: e.jsxs("div", {
        className: `max-w-[85%] rounded-lg px-3 py-2 text-sm ${t.out ? "ml-auto bg-sky-600 text-white" : "bg-gray-100 text-gray-900 dark:bg-odp-bgSoft dark:text-odp-fg"}`,
        onPointerDown: (f) => {
          !h || f.pointerType === "mouse" || (c.current = {
            x: f.clientX,
            y: f.clientY
          }, y(), d.current = setTimeout(() => {
            he(), N(true);
          }, lt));
        },
        onPointerUp: y,
        onPointerCancel: y,
        onPointerMove: (f) => {
          const v = c.current;
          if (!v) return;
          const w = f.clientX - v.x, S = f.clientY - v.y;
          w * w + S * S > 64 && y();
        },
        onContextMenu: (f) => {
          h && f.preventDefault();
        },
        children: [
          t.senderLabel ? e.jsx("div", {
            className: "mb-0.5 text-[11px] opacity-80",
            children: t.senderLabel
          }) : null,
          t.replyToId ? e.jsxs("div", {
            className: "mb-1 text-[11px] opacity-80",
            children: [
              "\uB2F5\uC7A5 #",
              t.replyToId
            ]
          }) : null,
          t.text ? e.jsx("p", {
            className: "whitespace-pre-wrap break-words",
            children: t.text
          }) : null,
          t.hasMedia ? e.jsx("p", {
            className: "mt-1 text-xs opacity-90",
            children: t.mediaName || "\uD30C\uC77C"
          }) : null
        ]
      }),
      children: [
        e.jsx(F, {
          onSelect: () => n(t),
          children: "\uB2F5\uC7A5"
        }),
        e.jsx(F, {
          onSelect: () => s(t),
          children: "\uB2E4\uB978 \uCC44\uD305\uC73C\uB85C \uC804\uB2EC"
        }),
        e.jsx(ue, {}),
        e.jsx(F, {
          onSelect: () => o(t),
          children: "\uB098\uC640\uC758 \uCC44\uD305\uC73C\uB85C \uACF5\uC720"
        }),
        t.hasMedia ? e.jsxs(e.Fragment, {
          children: [
            e.jsx(F, {
              onSelect: () => i(t),
              children: "Vault Tree\uC5D0 \uC800\uC7A5"
            }),
            e.jsx(F, {
              onSelect: () => x(t),
              children: "\uAE30\uAE30\uC5D0 \uB2E4\uC6B4\uB85C\uB4DC"
            })
          ]
        }) : null
      ]
    });
  }
  function it({ messages: t, loading: a, hasMore: n, isMobileLayout: s, onLoadOlder: o, onReply: i, onForward: x, onShare: d, onSaveToVault: c, onDownload: h }) {
    return e.jsxs("div", {
      className: "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-3 py-3",
      children: [
        n ? e.jsx("button", {
          type: "button",
          className: "self-center text-xs text-sky-700 dark:text-sky-300",
          onClick: o,
          disabled: a,
          children: a ? "\uBD88\uB7EC\uC624\uB294 \uC911\u2026" : "\uC774\uC804 \uBA54\uC2DC\uC9C0"
        }) : null,
        t.length === 0 && !a ? e.jsx("p", {
          className: "py-8 text-center text-sm text-gray-500 dark:text-odp-muted",
          children: "\uBA54\uC2DC\uC9C0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
        }) : null,
        t.map((l) => e.jsx(ot, {
          message: l,
          isMobileLayout: s,
          onReply: i,
          onForward: x,
          onShare: d,
          onSaveToVault: c,
          onDownload: h
        }, l.id))
      ]
    });
  }
  function dt({ replyTo: t, disabled: a, onClearReply: n, onSend: s }) {
    const o = m.useRef(null), i = m.useRef(null);
    return m.useEffect(() => fe({
      "telegram-focus-composer": () => {
        var _a;
        (_a = o.current) == null ? void 0 : _a.focus();
      }
    }), []), e.jsxs("form", {
      className: "shrink-0 border-t border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
      onSubmit: (x) => {
        var _a, _b, _c;
        x.preventDefault();
        const d = ((_a = o.current) == null ? void 0 : _a.value) || "", c = ((_c = (_b = i.current) == null ? void 0 : _b.files) == null ? void 0 : _c[0]) ?? null;
        s(d, c), o.current && (o.current.value = ""), i.current && (i.current.value = "");
      },
      children: [
        t ? e.jsxs("div", {
          className: "mb-2 flex items-center justify-between gap-2 rounded bg-sky-50 px-2 py-1 text-xs text-sky-900 dark:bg-sky-950/40 dark:text-sky-100",
          children: [
            e.jsxs("span", {
              className: "min-w-0 truncate",
              children: [
                "\uB2F5\uC7A5: ",
                t.snippet
              ]
            }),
            e.jsxs("button", {
              type: "button",
              className: "inline-flex items-center gap-1",
              "aria-label": "\uB2F5\uC7A5 \uCDE8\uC18C",
              onClick: n,
              children: [
                e.jsx(Se, {
                  size: 14
                }),
                "\uCDE8\uC18C"
              ]
            })
          ]
        }) : null,
        e.jsxs("div", {
          className: "flex items-end gap-2",
          children: [
            e.jsx("input", {
              ref: i,
              type: "file",
              className: "hidden"
            }),
            e.jsxs(u, {
              type: "button",
              variant: "tertiary",
              "aria-label": "\uD30C\uC77C \uCCA8\uBD80",
              disabled: a,
              onClick: () => {
                var _a;
                return (_a = i.current) == null ? void 0 : _a.click();
              },
              children: [
                e.jsx(Te, {
                  size: 16
                }),
                "\uCCA8\uBD80"
              ]
            }),
            e.jsx("textarea", {
              ref: o,
              rows: 2,
              disabled: a,
              placeholder: "\uBA54\uC2DC\uC9C0",
              className: "min-h-10 min-w-0 flex-1 resize-none rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            }),
            e.jsxs(u, {
              type: "submit",
              variant: "primary",
              "aria-label": "\uBCF4\uB0B4\uAE30",
              disabled: a,
              children: [
                e.jsx(Ce, {
                  size: 16
                }),
                "\uBCF4\uB0B4\uAE30"
              ]
            })
          ]
        })
      ]
    });
  }
  function ct({ dialogs: t, onClose: a, onPick: n }) {
    return e.jsx(B, {
      isOpen: true,
      onClose: a,
      contentClassName: "max-w-md max-h-[90vh]",
      children: e.jsxs("div", {
        className: "flex min-h-0 flex-1 flex-col",
        children: [
          e.jsx("header", {
            className: "shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: e.jsx("h2", {
              className: "text-base font-semibold text-gray-900 dark:text-odp-fgStrong",
              children: "\uC804\uB2EC"
            })
          }),
          e.jsx("div", {
            className: "min-h-0 flex-1 overflow-y-auto px-3 py-2",
            children: t.map((s) => e.jsxs("button", {
              type: "button",
              className: "flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-odp-focusBg",
              onClick: () => n(s.id),
              children: [
                e.jsx(Ae, {
                  size: 14
                }),
                e.jsx("span", {
                  className: "truncate",
                  children: s.title
                })
              ]
            }, s.id))
          }),
          e.jsx("footer", {
            className: "flex shrink-0 justify-end border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: e.jsxs(u, {
              type: "button",
              variant: "secondary",
              onClick: a,
              children: [
                e.jsx(G, {
                  size: 14
                }),
                "\uB2EB\uAE30"
              ]
            })
          })
        ]
      })
    });
  }
  function xt({ onClose: t, onCreate: a }) {
    const [n, s] = m.useState("group"), [o, i] = m.useState("");
    return e.jsx(B, {
      isOpen: true,
      onClose: t,
      contentClassName: "max-w-md max-h-[90vh]",
      children: e.jsxs("form", {
        className: "flex min-h-0 flex-1 flex-col",
        onSubmit: (x) => {
          x.preventDefault(), a(n, o);
        },
        children: [
          e.jsx("header", {
            className: "shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: e.jsx("h2", {
              className: "text-base font-semibold text-gray-900 dark:text-odp-fgStrong",
              children: "\uADF8\uB8F9 \uB610\uB294 \uCC44\uB110 \uB9CC\uB4E4\uAE30"
            })
          }),
          e.jsxs("div", {
            className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4",
            children: [
              e.jsxs("div", {
                className: "flex gap-2",
                children: [
                  e.jsxs(u, {
                    type: "button",
                    variant: n === "group" ? "primary" : "secondary",
                    onClick: () => s("group"),
                    children: [
                      e.jsx(K, {
                        size: 14
                      }),
                      "\uADF8\uB8F9"
                    ]
                  }),
                  e.jsxs(u, {
                    type: "button",
                    variant: n === "channel" ? "primary" : "secondary",
                    onClick: () => s("channel"),
                    children: [
                      e.jsx(Y, {
                        size: 14
                      }),
                      "\uCC44\uB110"
                    ]
                  })
                ]
              }),
              e.jsxs("label", {
                className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                children: [
                  "\uC774\uB984",
                  e.jsx("input", {
                    className: "mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                    value: o,
                    onChange: (x) => i(x.target.value)
                  })
                ]
              })
            ]
          }),
          e.jsxs("footer", {
            className: "flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsxs(u, {
                type: "button",
                variant: "secondary",
                onClick: t,
                children: [
                  e.jsx(G, {
                    size: 14
                  }),
                  "\uB2EB\uAE30"
                ]
              }),
              e.jsxs(u, {
                type: "submit",
                variant: "primary",
                children: [
                  n === "group" ? e.jsx(K, {
                    size: 14
                  }) : e.jsx(Y, {
                    size: 14
                  }),
                  "\uB9CC\uB4E4\uAE30"
                ]
              })
            ]
          })
        ]
      })
    });
  }
  function de({ node: t, depth: a, selected: n, onSelect: s }) {
    const [o, i] = m.useState(a < 1), x = (t.children || []).filter((c) => c.type === "folder"), d = n === t.path;
    return e.jsxs("div", {
      children: [
        e.jsxs("button", {
          type: "button",
          className: `flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-sm ${d ? "bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100" : "hover:bg-gray-100 dark:hover:bg-odp-focusBg"}`,
          style: {
            paddingLeft: `${a * 12 + 8}px`
          },
          onClick: () => {
            s(t.path), i(true);
          },
          children: [
            e.jsx("span", {
              className: "w-3 shrink-0 text-gray-400",
              children: x.length ? o ? "\u25BE" : "\u25B8" : ""
            }),
            e.jsx(se, {
              size: 14
            }),
            e.jsx("span", {
              className: "min-w-0 truncate",
              children: t.name || "/"
            })
          ]
        }),
        o ? x.map((c) => e.jsx(de, {
          node: c,
          depth: a + 1,
          selected: n,
          onSelect: s
        }, c.path)) : null
      ]
    });
  }
  function mt({ tree: t, fileName: a, onClose: n, onConfirm: s }) {
    const [o, i] = m.useState("");
    m.useEffect(() => {
      i("");
    }, [
      a
    ]);
    const x = m.useMemo(() => Array.isArray(t) ? t.filter((d) => d.type === "folder") : [], [
      t
    ]);
    return e.jsx(B, {
      isOpen: true,
      onClose: n,
      contentClassName: "max-w-md max-h-[90vh]",
      children: e.jsxs("div", {
        className: "flex min-h-0 flex-1 flex-col",
        children: [
          e.jsxs("header", {
            className: "shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsx("h2", {
                className: "text-base font-semibold text-gray-900 dark:text-odp-fgStrong",
                children: "Vault Tree\uC5D0 \uC800\uC7A5"
              }),
              e.jsx("p", {
                className: "mt-1 truncate text-xs text-gray-500 dark:text-odp-muted",
                children: a
              })
            ]
          }),
          e.jsxs("div", {
            className: "min-h-0 flex-1 overflow-y-auto px-3 py-2",
            children: [
              e.jsxs("button", {
                type: "button",
                className: `mb-1 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm ${o === "" ? "bg-sky-50 dark:bg-sky-950/40" : "hover:bg-gray-100 dark:hover:bg-odp-focusBg"}`,
                onClick: () => i(""),
                children: [
                  e.jsx(se, {
                    size: 14
                  }),
                  "\uB8E8\uD2B8"
                ]
              }),
              x.map((d) => e.jsx(de, {
                node: d,
                depth: 0,
                selected: o,
                onSelect: i
              }, d.path))
            ]
          }),
          e.jsxs("footer", {
            className: "flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsxs(u, {
                type: "button",
                variant: "secondary",
                onClick: n,
                children: [
                  e.jsx(G, {
                    size: 14
                  }),
                  "\uB2EB\uAE30"
                ]
              }),
              e.jsxs(u, {
                type: "button",
                variant: "primary",
                onClick: () => s(o || ""),
                children: [
                  e.jsx(Le, {
                    size: 14
                  }),
                  "\uC800\uC7A5"
                ]
              })
            ]
          })
        ]
      })
    });
  }
  function pt() {
    return m.useSyncExternalStore(Oe, W, W);
  }
  function ce() {
    const t = oe();
    if (!t) throw new Error("Telegram\uC5D0 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
    return t;
  }
  function ut(t) {
    let a;
    if (t instanceof Uint8Array) a = t;
    else if (typeof t == "string") a = new TextEncoder().encode(t);
    else throw new Error("\uD30C\uC77C\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    const n = new Uint8Array(a.byteLength);
    return n.set(a), n;
  }
  async function ht(t, a, n, s) {
    const o = ce(), i = new Uint8Array(await a.arrayBuffer()), x = Je(), d = await o.sendFile(le(t), {
      file: x.from(i),
      ...n.trim() ? {
        caption: n.trim()
      } : {},
      ...s ? {
        replyTo: s
      } : {},
      forceDocument: !a.type.startsWith("image/"),
      workers: 1
    }), c = Fe(t, d);
    if (!c) return;
    const h = W();
    C({
      messages: [
        ...h.messages,
        c
      ],
      replyTo: null,
      dialogs: h.dialogs.map((l) => l.id === t ? {
        ...l,
        preview: c.text || c.mediaName || a.name
      } : l)
    });
  }
  async function X(t, a) {
    var _a, _b;
    const n = ce();
    let s = ne(t, a);
    if (!s) {
      const c = await n.getMessages(le(t), {
        ids: a
      });
      s = Array.isArray(c) ? c[0] : c;
    }
    if (!s) throw new Error("\uBA54\uC2DC\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    const o = await n.downloadMedia(s, {}), i = s, x = ((_a = i.file) == null ? void 0 : _a.name) || `telegram-${a}`, d = ((_b = i.file) == null ? void 0 : _b.mimeType) || "application/octet-stream";
    return {
      bytes: ut(o),
      name: x,
      mime: d
    };
  }
  async function ft(t, a, n = "") {
    const s = oe();
    if (!s) throw new Error("Telegram\uC5D0 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
    const o = a.trim();
    if (!o) throw new Error("\uC81C\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694.");
    const { Api: i } = await Qe(async () => {
      const { Api: x } = await import("./vendor-telegram-D00RM5aC.js").then((d) => d.i);
      return {
        Api: x
      };
    }, __vite__mapDeps([0,1,2,3]));
    await s.invoke(new i.channels.CreateChannel({
      title: o,
      about: n.trim(),
      megagroup: t === "group",
      broadcast: t === "channel"
    })), await ie();
  }
  async function gt(t, a, n) {
    const s = [];
    if (n.hasMedia) {
      const d = await X(n.dialogId, n.id), c = new ArrayBuffer(d.bytes.byteLength);
      new Uint8Array(c).set(d.bytes);
      const h = new Blob([
        c
      ], {
        type: d.mime
      });
      s.push(new File([
        h
      ], d.name, {
        type: d.mime
      }));
    }
    const o = ne(n.dialogId, n.id), i = String(n.text || (o == null ? void 0 : o.message) || "").trim(), x = [
      `Telegram \xB7 ${a}`,
      i
    ].filter(Boolean).join(`

`);
    await ge(t, {
      body: x,
      files: s
    });
  }
  function yt(t, a) {
    const n = a.replace(/[\\/]/g, "_").replace(/\s+/g, " ").trim() || "telegram-file", s = t.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
    return s ? `${s}/${n}` : n;
  }
  async function bt(t, a, n, s) {
    const o = await X(n, s), i = yt(a, o.name);
    return await ye({
      mode: t.mode,
      getS3Client: t.getS3Client,
      s3Creds: {
        bucket: t.bucket || ""
      },
      localRootHandle: t.localRootHandle ?? null,
      localVaultFsPath: t.localVaultFsPath || "",
      webdavConfig: t.webdavConfig ?? null
    }).writeBytes(i, o.bytes), i;
  }
  const jt = /* @__PURE__ */ new Set([
    "need-phone",
    "need-code",
    "need-password",
    "need-name"
  ]);
  Dt = function({ isActive: t = true, isMobileLayout: a = false, storageMode: n = "s3", getS3Client: s, s3Bucket: o, localRootHandle: i = null, localVaultFsPath: x = "", webdavConfig: d = null, tree: c = null, onVaultSaved: h }) {
    const l = pt(), { addIndicator: N, updateIndicator: j, removeIndicator: y } = be(), f = je({
      storageMode: n,
      getS3Client: s ?? null,
      s3Bucket: o ?? null,
      localRootHandle: i,
      webdavConfig: d
    }), [v, w] = m.useState(true), [S, E] = m.useState(null), [I, M] = m.useState(null), [U, A] = m.useState(false), L = a;
    if (m.useEffect(() => {
      !t || !q() || Be();
    }, [
      t
    ]), m.useEffect(() => {
      if (l.status !== "connecting" && l.status !== "ready") return;
      const r = "telegram-connect";
      if (l.status === "connecting") {
        N({
          id: r,
          type: k.TELEGRAM_CONNECT,
          label: "Telegram \uC5F0\uACB0 \uC911",
          status: "processing"
        });
        return;
      }
      j(r, {
        status: "done",
        label: "Telegram \uC5F0\uACB0\uB428"
      });
      const p = window.setTimeout(() => y(r), 2500);
      return () => window.clearTimeout(p);
    }, [
      l.status,
      N,
      j,
      y
    ]), !q()) return e.jsx(et, {});
    const R = l.dialogs.find((r) => r.id === l.activeDialogId) || null, D = !L || !v, g = async (r, p, b) => {
      const T = N({
        type: p,
        label: r,
        status: "processing"
      });
      try {
        await b(), j(T, {
          status: "done"
        });
      } catch (O) {
        const _ = Ye(O, "\uC2E4\uD328");
        j(T, {
          status: "error",
          detail: _
        }), await Ke(O) || C({
          error: _
        });
      } finally {
        window.setTimeout(() => y(T), 4e3);
      }
    };
    return e.jsxs("div", {
      className: "flex min-h-0 min-w-0 flex-1 flex-col",
      children: [
        e.jsxs("header", {
          className: "flex shrink-0 items-center gap-2 border-b border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
          children: [
            L && !v ? e.jsxs(u, {
              type: "button",
              variant: "tertiary",
              "aria-label": "\uB300\uD654 \uBAA9\uB85D",
              onClick: () => w(true),
              children: [
                e.jsx(Ee, {
                  size: 16
                }),
                "\uBAA9\uB85D"
              ]
            }) : e.jsx("h1", {
              className: "text-sm font-semibold text-gray-900 dark:text-odp-fgStrong",
              children: "Telegram"
            }),
            e.jsx("span", {
              className: "min-w-0 flex-1 truncate text-sm text-gray-600 dark:text-odp-muted",
              children: D && (R == null ? void 0 : R.title) || l.selfName
            }),
            e.jsxs(u, {
              type: "button",
              variant: "tertiary",
              onClick: () => A(true),
              disabled: l.status !== "ready",
              children: [
                e.jsx(Ie, {
                  size: 14
                }),
                "\uB9CC\uB4E4\uAE30"
              ]
            }),
            e.jsxs(u, {
              type: "button",
              variant: "tertiary",
              onClick: () => {
                C({
                  error: null
                }), g("\uB300\uD654 \uBAA9\uB85D \uC0C8\uB85C\uACE0\uCE68", k.TELEGRAM_SYNC, async () => {
                  await ie();
                });
              },
              disabled: l.status !== "ready",
              children: [
                e.jsx(Me, {
                  size: 14
                }),
                "\uC0C8\uB85C\uACE0\uCE68"
              ]
            }),
            e.jsxs(u, {
              type: "button",
              variant: "secondary",
              onClick: () => {
                C({
                  error: null
                }), g("Telegram \uB85C\uADF8\uC544\uC6C3", k.TELEGRAM_CONNECT, () => We());
              },
              disabled: l.status === "idle",
              children: [
                e.jsx(Re, {
                  size: 14
                }),
                "\uB85C\uADF8\uC544\uC6C3"
              ]
            })
          ]
        }),
        l.error && (l.status === "error" || l.status === "ready") ? e.jsx("p", {
          className: "shrink-0 bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950/40 dark:text-red-200",
          children: l.error
        }) : null,
        l.notice ? e.jsx("p", {
          className: "shrink-0 px-3 py-1 text-xs text-sky-800 dark:text-sky-200",
          children: l.notice
        }) : null,
        e.jsxs("div", {
          className: "flex min-h-0 flex-1",
          children: [
            (!L || v) && e.jsx("div", {
              className: L ? "flex min-h-0 min-w-0 flex-1 flex-col" : "flex w-72 shrink-0 flex-col border-r border-gray-200 dark:border-odp-borderSoft",
              children: e.jsx(nt, {
                dialogs: l.dialogs,
                activeId: l.activeDialogId,
                onSelect: (r) => {
                  w(false), ee(r, false);
                }
              })
            }),
            D ? e.jsxs("div", {
              className: "flex min-h-0 min-w-0 flex-1 flex-col",
              children: [
                e.jsx(it, {
                  messages: l.messages,
                  loading: l.messagesLoading,
                  hasMore: l.hasMoreHistory,
                  isMobileLayout: a,
                  onLoadOlder: () => {
                    l.activeDialogId && ee(l.activeDialogId, true);
                  },
                  onReply: (r) => te(r),
                  onForward: E,
                  onShare: (r) => {
                    if (!f.ready || !f.ctx || !R) {
                      C({
                        error: "\uB098\uC640\uC758 \uCC44\uD305 \uC800\uC7A5\uC18C\uAC00 \uC900\uBE44\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
                      });
                      return;
                    }
                    g("\uB098\uC640\uC758 \uCC44\uD305\uC73C\uB85C \uACF5\uC720", k.TELEGRAM_DOWNLOAD, async () => {
                      await gt(f.ctx, R.title, r), C({
                        notice: "\uB098\uC640\uC758 \uCC44\uD305\uC5D0 \uACF5\uC720\uD588\uC2B5\uB2C8\uB2E4."
                      });
                    });
                  },
                  onSaveToVault: M,
                  onDownload: (r) => {
                    g("\uAE30\uAE30\uC5D0 \uB2E4\uC6B4\uB85C\uB4DC", k.TELEGRAM_DOWNLOAD, async () => {
                      const p = await X(r.dialogId, r.id), b = new Uint8Array(p.bytes.byteLength);
                      b.set(p.bytes);
                      const T = new Blob([
                        b
                      ], {
                        type: p.mime
                      }), O = URL.createObjectURL(T), _ = document.createElement("a");
                      _.href = O, _.download = p.name, _.click(), URL.revokeObjectURL(O);
                    });
                  }
                }),
                e.jsx(dt, {
                  replyTo: l.replyTo,
                  disabled: l.status !== "ready" || !l.activeDialogId,
                  onClearReply: () => te(null),
                  onSend: (r, p) => {
                    var _a;
                    const b = l.activeDialogId;
                    if (!b) return;
                    const T = (_a = l.replyTo) == null ? void 0 : _a.id;
                    g("Telegram \uC804\uC1A1", k.TELEGRAM_SEND, async () => {
                      p ? await ht(b, p, r, T) : await Xe(b, r, T);
                    });
                  }
                })
              ]
            }) : null
          ]
        }),
        jt.has(l.status) ? e.jsx(st, {
          status: l.status,
          error: l.error,
          loginHint: l.loginHint,
          codeViaApp: l.loginStep === "mtproto" && l.codeViaApp,
          onRequestSms: Ge,
          onSubmitField: (r) => {
            if (l.loginStep === "portal-phone") {
              $e(r);
              return;
            }
            if (l.loginStep === "portal-code") {
              He(r);
              return;
            }
            Ze(r);
          },
          onSubmitApi: (r) => {
            Ve(r);
          },
          onClose: () => {
            Ue();
          }
        }) : null,
        S ? e.jsx(ct, {
          dialogs: l.dialogs.filter((r) => r.id !== S.dialogId),
          onClose: () => E(null),
          onPick: (r) => {
            const p = S;
            E(null), g("\uC804\uB2EC", k.TELEGRAM_SEND, async () => {
              await qe(p.dialogId, p.id, r), C({
                notice: "\uC804\uB2EC\uD588\uC2B5\uB2C8\uB2E4."
              });
            });
          }
        }) : null,
        U ? e.jsx(xt, {
          onClose: () => A(false),
          onCreate: (r, p) => {
            A(false), g(r === "channel" ? "\uCC44\uB110 \uB9CC\uB4E4\uAE30" : "\uADF8\uB8F9 \uB9CC\uB4E4\uAE30", k.TELEGRAM_SYNC, async () => {
              await ft(r, p);
            });
          }
        }) : null,
        I ? e.jsx(mt, {
          tree: c,
          fileName: I.mediaName || `telegram-${I.id}`,
          onClose: () => M(null),
          onConfirm: (r) => {
            const p = I;
            M(null);
            const b = n === "local" || n === "webdav" || n === "idb" ? n : "s3";
            g("Vault\uC5D0 \uC800\uC7A5", k.TELEGRAM_DOWNLOAD, async () => {
              await bt({
                mode: b,
                ...s ? {
                  getS3Client: s
                } : {},
                ...o ? {
                  bucket: o
                } : {},
                localRootHandle: i,
                localVaultFsPath: x,
                webdavConfig: d
              }, r, p.dialogId, p.id), await (h == null ? void 0 : h()), C({
                notice: "Vault\uC5D0 \uC800\uC7A5\uD588\uC2B5\uB2C8\uB2E4."
              });
            });
          }
        }) : null
      ]
    });
  };
});
export {
  __tla,
  Dt as default
};
