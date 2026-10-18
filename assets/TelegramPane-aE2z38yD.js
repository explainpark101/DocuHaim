const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-telegram-D8J-ixWE.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-aws-hJDgVEKM.js"])))=>i.map(i=>d[i]);
import { j as e, r as m, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { ab as F, G as u, b4 as B, dT as me, dU as pe, dV as ue, dW as O, dX as he, dY as fe, dZ as ge, b3 as se, d_ as ye, d$ as be, e0 as je, e1 as ve, co as Y, cn as A, __tla as __tla_1 } from "./index-BP7C--nq.js";
import { aq as ke, ar as Z, as as we, at as Ne, au as Se, av as H, aw as q, X as Te, ax as Ce, ay as Ae, az as Le, aA as Ee, A as Ie, b as Me, K as Re, aB as _e } from "./vendor-lucide-DBE8vF92.js";
import { d as De, __tla as __tla_2 } from "./bootSplash-BM1jVZSP.js";
import { E as Pe, G as ze, H as J, I as Q, B as Oe, F as G, L as $, D as U } from "./vendor-radix-D1Cm_mSM.js";
import { s as Fe, g as K, r as ne, m as Be, p as z, a as Ve, b as oe, c as le, d as Ge, l as $e, e as ee, f as te, h as Ue, i as He, j as qe, k as Ke, n as We, o as Xe, q as Ye, t as Ze, __tla as __tla_3 } from "./telegramClient-B8IuP3yN.js";
import { _ as ie } from "./vendor-aws-hJDgVEKM.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-BSFfF5B5.js";
let Et;
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
  function Je() {
    return e.jsxs("div", {
      className: "flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-6 text-center",
      children: [
        e.jsx(ke, {
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
  const ae = "inline-flex flex-1 items-center justify-center gap-1.5 rounded px-2 py-1.5 text-xs font-medium outline-none transition data-[state=inactive]:text-gray-500 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=inactive]:text-odp-muted dark:data-[state=active]:text-white", D = "block text-xs font-semibold text-gray-600 dark:text-odp-muted", P = "mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft", Qe = [
    {
      href: "https://telegram.org/tos",
      label: "Telegram \uC774\uC6A9 \uC57D\uAD00"
    },
    {
      href: "https://core.telegram.org/api/terms",
      label: "API \uC774\uC6A9 \uC57D\uAD00"
    }
  ], et = [
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
  function tt(t) {
    if (!De()) {
      window.open(t, "_blank", "noopener,noreferrer");
      return;
    }
    me(t);
  }
  function re({ links: t }) {
    return e.jsx("div", {
      className: "flex flex-col gap-1",
      children: t.map((a) => e.jsxs(u, {
        type: "button",
        variant: "tertiary",
        className: "justify-start px-2",
        onClick: () => tt(a.href),
        children: [
          e.jsx(Se, {
            size: 14
          }),
          a.label
        ]
      }, a.href))
    });
  }
  function at({ status: t, error: a, loginHint: o, codeViaApp: s, onSubmitField: l, onSubmitApi: i, onRequestSms: x, onClose: d }) {
    const [c, h] = m.useState(""), [n, g] = m.useState(""), [b, y] = m.useState(""), [f, j] = m.useState("phone"), [N, S] = m.useState(""), [L, E] = m.useState(""), [I, V] = m.useState(""), T = t === "need-name", C = t === "need-phone", M = t === "need-phone" ? "Telegram" : t === "need-code" ? "\uD655\uC778 \uCF54\uB4DC" : T ? "\uC774\uB984" : "2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638", R = e.jsxs("footer", {
      className: "flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
      children: [
        e.jsxs(u, {
          type: "button",
          variant: "secondary",
          onClick: d,
          children: [
            e.jsx(B, {
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
    }), v = e.jsxs(e.Fragment, {
      children: [
        T ? e.jsxs(e.Fragment, {
          children: [
            e.jsxs("label", {
              className: D,
              children: [
                "\uC774\uB984",
                e.jsx("input", {
                  className: P,
                  autoComplete: "given-name",
                  value: n,
                  onChange: (r) => g(r.target.value)
                })
              ]
            }),
            e.jsxs("label", {
              className: D,
              children: [
                "\uC131",
                e.jsx("input", {
                  className: P,
                  autoComplete: "family-name",
                  value: b,
                  onChange: (r) => y(r.target.value)
                })
              ]
            })
          ]
        }) : e.jsxs("label", {
          className: D,
          children: [
            t === "need-phone" ? "\uC804\uD654\uBC88\uD638" : M,
            e.jsx("input", {
              className: P,
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
          links: Qe
        }) : null,
        o ? e.jsx("p", {
          className: "text-xs text-gray-600 dark:text-odp-muted",
          children: o
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
    return e.jsx(F, {
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
                children: M
              }),
              e.jsx("p", {
                className: "mt-1 text-xs text-gray-500 dark:text-odp-muted",
                children: C ? "\uBC88\uD638\uB97C \uD655\uC778\uD558\uAC70\uB098, my.telegram.org\uC5D0\uC11C \uBC1B\uC740 API ID\uC640 API Hash\uB97C \uC9C1\uC811 \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uB85C\uADF8\uC778\uD558\uBA74 Telegram \uC774\uC6A9 \uC57D\uAD00\uC5D0 \uB3D9\uC758\uD558\uAC8C \uB429\uB2C8\uB2E4." : "\uD734\uB300\uD3F0 \uBC88\uD638\uB97C \uC785\uB825\uD558\uBA74 Telegram \uC11C\uBC84\uAC00 \uD655\uC778\uD569\uB2C8\uB2E4. \uD655\uC778\uC774 \uB05D\uB098\uBA74 \uC774 \uAE30\uAE30\uC5D0 \uC790\uB3D9\uC73C\uB85C \uC800\uC7A5\uB429\uB2C8\uB2E4. \uB85C\uADF8\uC778\uD558\uBA74 Telegram \uC774\uC6A9 \uC57D\uAD00\uC5D0 \uB3D9\uC758\uD558\uAC8C \uB429\uB2C8\uB2E4."
              })
            ]
          }),
          C ? e.jsxs(Pe, {
            value: f,
            onValueChange: (r) => j(r === "api" ? "api" : "phone"),
            className: "flex min-h-0 flex-1 flex-col",
            children: [
              e.jsxs(ze, {
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
                      e.jsx(we, {
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
                    r.preventDefault(), l(c), h("");
                  },
                  children: [
                    e.jsx("div", {
                      className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4",
                      children: v
                    }),
                    R
                  ]
                })
              }),
              e.jsx(Q, {
                value: "api",
                className: "flex min-h-0 flex-1 flex-col outline-none",
                children: e.jsxs(Oe, {
                  className: "flex min-h-0 flex-1 flex-col",
                  onSubmit: (r) => {
                    r.preventDefault(), i({
                      apiId: N,
                      apiHash: L,
                      phone: I
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
                          links: et
                        }),
                        e.jsxs(G, {
                          name: "apiId",
                          className: D,
                          children: [
                            e.jsx($, {
                              children: "API ID"
                            }),
                            e.jsx(U, {
                              asChild: true,
                              children: e.jsx("input", {
                                className: P,
                                inputMode: "numeric",
                                autoComplete: "off",
                                value: N,
                                onChange: (r) => S(r.target.value)
                              })
                            })
                          ]
                        }),
                        e.jsxs(G, {
                          name: "apiHash",
                          className: D,
                          children: [
                            e.jsx($, {
                              children: "API Hash"
                            }),
                            e.jsx(U, {
                              asChild: true,
                              children: e.jsx("input", {
                                className: `${P} font-mono`,
                                autoComplete: "off",
                                spellCheck: false,
                                value: L,
                                onChange: (r) => E(r.target.value)
                              })
                            })
                          ]
                        }),
                        e.jsxs(G, {
                          name: "phone",
                          className: D,
                          children: [
                            e.jsx($, {
                              children: "\uC804\uD654\uBC88\uD638"
                            }),
                            e.jsx(U, {
                              asChild: true,
                              children: e.jsx("input", {
                                className: P,
                                inputMode: "tel",
                                autoComplete: "tel",
                                placeholder: "+821012345678",
                                value: I,
                                onChange: (r) => V(r.target.value)
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
                    R
                  ]
                })
              })
            ]
          }) : e.jsxs("form", {
            className: "flex min-h-0 flex-1 flex-col",
            onSubmit: (r) => {
              if (r.preventDefault(), T) {
                l(`${n.trim()}
${b.trim()}`);
                return;
              }
              l(c), h("");
            },
            children: [
              e.jsx("div", {
                className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4",
                children: v
              }),
              R
            ]
          })
        ]
      })
    });
  }
  function rt({ dialogs: t, activeId: a, onSelect: o }) {
    return e.jsx("div", {
      className: "flex min-h-0 flex-1 flex-col overflow-y-auto",
      children: t.length === 0 ? e.jsx("p", {
        className: "px-3 py-6 text-sm text-gray-500 dark:text-odp-muted",
        children: "\uB300\uD654\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
      }) : t.map((s) => {
        const l = s.id === a;
        return e.jsxs("button", {
          type: "button",
          onClick: () => o(s.id),
          className: `flex w-full items-start gap-2 px-3 py-2.5 text-left ${l ? "bg-sky-50 dark:bg-sky-950/40" : "hover:bg-gray-100 dark:hover:bg-odp-focusBg"}`,
          children: [
            e.jsx("span", {
              className: "mt-0.5 text-sky-700 dark:text-sky-300",
              children: s.isChannel ? e.jsx(H, {
                size: 14
              }) : s.isGroup ? e.jsx(q, {
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
  const st = 500;
  function nt({ message: t, isMobileLayout: a, onReply: o, onForward: s, onShare: l, onSaveToVault: i, onDownload: x }) {
    const d = m.useRef(null), c = m.useRef(null), h = pe(a), [n, g] = m.useState(false), b = (t.text || t.mediaName || "\uBA54\uC2DC\uC9C0").slice(0, 80), y = () => {
      d.current && (clearTimeout(d.current), d.current = null);
    };
    return e.jsxs(ue, {
      title: b,
      subtitle: "Telegram \uBA54\uC2DC\uC9C0",
      isMobileLayout: a,
      ...h ? {
        open: n,
        onOpenChange: g
      } : {},
      contentClassName: "z-100010 min-w-48 rounded-md border border-gray-200 bg-white p-1 text-sm shadow dark:border-odp-borderStrong dark:bg-odp-surface",
      trigger: e.jsxs("div", {
        className: `max-w-[85%] rounded-lg px-3 py-2 text-sm ${t.out ? "ml-auto bg-sky-600 text-white" : "bg-gray-100 text-gray-900 dark:bg-odp-bgSoft dark:text-odp-fg"}`,
        onPointerDown: (f) => {
          !h || f.pointerType === "mouse" || (c.current = {
            x: f.clientX,
            y: f.clientY
          }, y(), d.current = setTimeout(() => {
            fe(), g(true);
          }, st));
        },
        onPointerUp: y,
        onPointerCancel: y,
        onPointerMove: (f) => {
          const j = c.current;
          if (!j) return;
          const N = f.clientX - j.x, S = f.clientY - j.y;
          N * N + S * S > 64 && y();
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
        e.jsx(O, {
          onSelect: () => o(t),
          children: "\uB2F5\uC7A5"
        }),
        e.jsx(O, {
          onSelect: () => s(t),
          children: "\uB2E4\uB978 \uCC44\uD305\uC73C\uB85C \uC804\uB2EC"
        }),
        e.jsx(he, {}),
        e.jsx(O, {
          onSelect: () => l(t),
          children: "\uB098\uC640\uC758 \uCC44\uD305\uC73C\uB85C \uACF5\uC720"
        }),
        t.hasMedia ? e.jsxs(e.Fragment, {
          children: [
            e.jsx(O, {
              onSelect: () => i(t),
              children: "Vault Tree\uC5D0 \uC800\uC7A5"
            }),
            e.jsx(O, {
              onSelect: () => x(t),
              children: "\uAE30\uAE30\uC5D0 \uB2E4\uC6B4\uB85C\uB4DC"
            })
          ]
        }) : null
      ]
    });
  }
  function ot({ messages: t, loading: a, hasMore: o, isMobileLayout: s, onLoadOlder: l, onReply: i, onForward: x, onShare: d, onSaveToVault: c, onDownload: h }) {
    return e.jsxs("div", {
      className: "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-3 py-3",
      children: [
        o ? e.jsx("button", {
          type: "button",
          className: "self-center text-xs text-sky-700 dark:text-sky-300",
          onClick: l,
          disabled: a,
          children: a ? "\uBD88\uB7EC\uC624\uB294 \uC911\u2026" : "\uC774\uC804 \uBA54\uC2DC\uC9C0"
        }) : null,
        t.length === 0 && !a ? e.jsx("p", {
          className: "py-8 text-center text-sm text-gray-500 dark:text-odp-muted",
          children: "\uBA54\uC2DC\uC9C0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
        }) : null,
        t.map((n) => e.jsx(nt, {
          message: n,
          isMobileLayout: s,
          onReply: i,
          onForward: x,
          onShare: d,
          onSaveToVault: c,
          onDownload: h
        }, n.id))
      ]
    });
  }
  function lt({ replyTo: t, disabled: a, onClearReply: o, onSend: s }) {
    const l = m.useRef(null), i = m.useRef(null);
    return m.useEffect(() => ge({
      "telegram-focus-composer": () => {
        var _a;
        (_a = l.current) == null ? void 0 : _a.focus();
      }
    }), []), e.jsxs("form", {
      className: "shrink-0 border-t border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
      onSubmit: (x) => {
        var _a, _b, _c;
        x.preventDefault();
        const d = ((_a = l.current) == null ? void 0 : _a.value) || "", c = ((_c = (_b = i.current) == null ? void 0 : _b.files) == null ? void 0 : _c[0]) ?? null;
        s(d, c), l.current && (l.current.value = ""), i.current && (i.current.value = "");
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
              onClick: o,
              children: [
                e.jsx(Te, {
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
                e.jsx(Ce, {
                  size: 16
                }),
                "\uCCA8\uBD80"
              ]
            }),
            e.jsx("textarea", {
              ref: l,
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
                e.jsx(Ae, {
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
  function it({ dialogs: t, onClose: a, onPick: o }) {
    return e.jsx(F, {
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
              onClick: () => o(s.id),
              children: [
                e.jsx(Le, {
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
                e.jsx(B, {
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
  function dt({ onClose: t, onCreate: a }) {
    const [o, s] = m.useState("group"), [l, i] = m.useState("");
    return e.jsx(F, {
      isOpen: true,
      onClose: t,
      contentClassName: "max-w-md max-h-[90vh]",
      children: e.jsxs("form", {
        className: "flex min-h-0 flex-1 flex-col",
        onSubmit: (x) => {
          x.preventDefault(), a(o, l);
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
                    variant: o === "group" ? "primary" : "secondary",
                    onClick: () => s("group"),
                    children: [
                      e.jsx(q, {
                        size: 14
                      }),
                      "\uADF8\uB8F9"
                    ]
                  }),
                  e.jsxs(u, {
                    type: "button",
                    variant: o === "channel" ? "primary" : "secondary",
                    onClick: () => s("channel"),
                    children: [
                      e.jsx(H, {
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
                    value: l,
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
                  e.jsx(B, {
                    size: 14
                  }),
                  "\uB2EB\uAE30"
                ]
              }),
              e.jsxs(u, {
                type: "submit",
                variant: "primary",
                children: [
                  o === "group" ? e.jsx(q, {
                    size: 14
                  }) : e.jsx(H, {
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
  function de({ node: t, depth: a, selected: o, onSelect: s }) {
    const [l, i] = m.useState(a < 1), x = (t.children || []).filter((c) => c.type === "folder"), d = o === t.path;
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
              children: x.length ? l ? "\u25BE" : "\u25B8" : ""
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
        l ? x.map((c) => e.jsx(de, {
          node: c,
          depth: a + 1,
          selected: o,
          onSelect: s
        }, c.path)) : null
      ]
    });
  }
  function ct({ tree: t, fileName: a, onClose: o, onConfirm: s }) {
    const [l, i] = m.useState("");
    m.useEffect(() => {
      i("");
    }, [
      a
    ]);
    const x = m.useMemo(() => Array.isArray(t) ? t.filter((d) => d.type === "folder") : [], [
      t
    ]);
    return e.jsx(F, {
      isOpen: true,
      onClose: o,
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
                className: `mb-1 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm ${l === "" ? "bg-sky-50 dark:bg-sky-950/40" : "hover:bg-gray-100 dark:hover:bg-odp-focusBg"}`,
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
                selected: l,
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
                onClick: o,
                children: [
                  e.jsx(B, {
                    size: 14
                  }),
                  "\uB2EB\uAE30"
                ]
              }),
              e.jsxs(u, {
                type: "button",
                variant: "primary",
                onClick: () => s(l || ""),
                children: [
                  e.jsx(Ee, {
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
  function xt() {
    return m.useSyncExternalStore(Fe, K, K);
  }
  function ce() {
    const t = oe();
    if (!t) throw new Error("Telegram is not connected");
    return t;
  }
  function xe(t) {
    const a = Ve(t);
    if (!a) throw new Error("Chat not found");
    return a;
  }
  function mt(t) {
    if (t instanceof Uint8Array) return t;
    if (typeof t == "string") return new TextEncoder().encode(t);
    throw new Error("Could not download Telegram media");
  }
  async function pt(t, a, o, s) {
    const l = ce(), i = new Uint8Array(await a.arrayBuffer()), { Buffer: x } = await ie(async () => {
      const { Buffer: n } = await import("./vendor-telegram-D8J-ixWE.js").then((g) => g.i);
      return {
        Buffer: n
      };
    }, __vite__mapDeps([0,1,2])), d = await l.sendFile(xe(t), {
      file: x.from(i),
      ...o.trim() ? {
        caption: o.trim()
      } : {},
      ...s ? {
        replyTo: s
      } : {},
      forceDocument: !a.type.startsWith("image/"),
      workers: 1
    }), c = Be(t, d);
    if (!c) return;
    const h = K();
    z({
      messages: [
        ...h.messages,
        c
      ],
      replyTo: null,
      dialogs: h.dialogs.map((n) => n.id === t ? {
        ...n,
        preview: c.text || c.mediaName || a.name
      } : n)
    });
  }
  async function W(t, a) {
    var _a, _b;
    const o = ce();
    let s = ne(t, a);
    if (!s) {
      const c = await o.getMessages(xe(t), {
        ids: a
      });
      s = Array.isArray(c) ? c[0] : c;
    }
    if (!s) throw new Error("Message not found");
    const l = await o.downloadMedia(s, {}), i = s, x = ((_a = i.file) == null ? void 0 : _a.name) || `telegram-${a}`, d = ((_b = i.file) == null ? void 0 : _b.mimeType) || "application/octet-stream";
    return {
      bytes: mt(l),
      name: x,
      mime: d
    };
  }
  async function ut(t, a, o = "") {
    const s = oe();
    if (!s) throw new Error("Telegram is not connected");
    const l = a.trim();
    if (!l) throw new Error("Title is required");
    const { Api: i } = await ie(async () => {
      const { Api: x } = await import("./vendor-telegram-D8J-ixWE.js").then((d) => d.a);
      return {
        Api: x
      };
    }, __vite__mapDeps([0,1,2]));
    await s.invoke(new i.channels.CreateChannel({
      title: l,
      about: o.trim(),
      megagroup: t === "group",
      broadcast: t === "channel"
    })), await le();
  }
  async function ht(t, a, o) {
    const s = [];
    if (o.hasMedia) {
      const d = await W(o.dialogId, o.id), c = new ArrayBuffer(d.bytes.byteLength);
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
    const l = ne(o.dialogId, o.id), i = String(o.text || (l == null ? void 0 : l.message) || "").trim(), x = [
      `Telegram \xB7 ${a}`,
      i
    ].filter(Boolean).join(`

`);
    await ye(t, {
      body: x,
      files: s
    });
  }
  function ft(t, a) {
    const o = a.replace(/[\\/]/g, "_").replace(/\s+/g, " ").trim() || "telegram-file", s = t.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
    return s ? `${s}/${o}` : o;
  }
  async function gt(t, a, o, s) {
    const l = await W(o, s), i = ft(a, l.name);
    return await be({
      mode: t.mode,
      getS3Client: t.getS3Client,
      s3Creds: {
        bucket: t.bucket || ""
      },
      localRootHandle: t.localRootHandle ?? null,
      localVaultFsPath: t.localVaultFsPath || "",
      webdavConfig: t.webdavConfig ?? null
    }).writeBytes(i, l.bytes), i;
  }
  const yt = /* @__PURE__ */ new Set([
    "need-phone",
    "need-code",
    "need-password",
    "need-name"
  ]);
  Et = function({ isActive: t = true, isMobileLayout: a = false, storageMode: o = "s3", getS3Client: s, s3Bucket: l, localRootHandle: i = null, localVaultFsPath: x = "", webdavConfig: d = null, tree: c = null, onVaultSaved: h }) {
    const n = xt(), { addIndicator: g, updateIndicator: b, removeIndicator: y } = je(), f = ve({
      storageMode: o,
      getS3Client: s ?? null,
      s3Bucket: l ?? null,
      localRootHandle: i,
      webdavConfig: d
    }), [j, N] = m.useState(true), [S, L] = m.useState(null), [E, I] = m.useState(null), [V, T] = m.useState(false), C = a;
    if (m.useEffect(() => {
      !t || !Y() || Ge();
    }, [
      t
    ]), m.useEffect(() => {
      if (n.status !== "connecting" && n.status !== "ready") return;
      const r = "telegram-connect";
      if (n.status === "connecting") {
        g({
          id: r,
          type: A.TELEGRAM_CONNECT,
          label: "Telegram \uC5F0\uACB0 \uC911",
          status: "processing"
        });
        return;
      }
      b(r, {
        status: "done",
        label: "Telegram \uC5F0\uACB0\uB428"
      });
      const p = window.setTimeout(() => y(r), 2500);
      return () => window.clearTimeout(p);
    }, [
      n.status,
      g,
      b,
      y
    ]), !Y()) return e.jsx(Je, {});
    const M = n.dialogs.find((r) => r.id === n.activeDialogId) || null, R = !C || !j, v = async (r, p, k) => {
      const w = g({
        type: p,
        label: r,
        status: "processing"
      });
      try {
        await k(), b(w, {
          status: "done"
        });
      } catch (_) {
        const X = _ instanceof Error ? _.message : "\uC2E4\uD328";
        b(w, {
          status: "error",
          detail: X
        }), z({
          error: X
        });
      } finally {
        window.setTimeout(() => y(w), 4e3);
      }
    };
    return e.jsxs("div", {
      className: "flex min-h-0 min-w-0 flex-1 flex-col",
      children: [
        e.jsxs("header", {
          className: "flex shrink-0 items-center gap-2 border-b border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
          children: [
            C && !j ? e.jsxs(u, {
              type: "button",
              variant: "tertiary",
              "aria-label": "\uB300\uD654 \uBAA9\uB85D",
              onClick: () => N(true),
              children: [
                e.jsx(Ie, {
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
              children: R && (M == null ? void 0 : M.title) || n.selfName
            }),
            e.jsxs(u, {
              type: "button",
              variant: "tertiary",
              onClick: () => T(true),
              disabled: n.status !== "ready",
              children: [
                e.jsx(Me, {
                  size: 14
                }),
                "\uB9CC\uB4E4\uAE30"
              ]
            }),
            e.jsxs(u, {
              type: "button",
              variant: "tertiary",
              onClick: () => {
                le();
              },
              disabled: n.status !== "ready",
              children: [
                e.jsx(Re, {
                  size: 14
                }),
                "\uC0C8\uB85C\uACE0\uCE68"
              ]
            }),
            e.jsxs(u, {
              type: "button",
              variant: "secondary",
              onClick: () => {
                $e();
              },
              disabled: n.status === "idle",
              children: [
                e.jsx(_e, {
                  size: 14
                }),
                "\uB85C\uADF8\uC544\uC6C3"
              ]
            })
          ]
        }),
        n.error && n.status === "error" ? e.jsx("p", {
          className: "shrink-0 bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950/40 dark:text-red-200",
          children: n.error
        }) : null,
        n.notice ? e.jsx("p", {
          className: "shrink-0 px-3 py-1 text-xs text-sky-800 dark:text-sky-200",
          children: n.notice
        }) : null,
        e.jsxs("div", {
          className: "flex min-h-0 flex-1",
          children: [
            (!C || j) && e.jsx("div", {
              className: C ? "flex min-h-0 min-w-0 flex-1 flex-col" : "flex w-72 shrink-0 flex-col border-r border-gray-200 dark:border-odp-borderSoft",
              children: e.jsx(rt, {
                dialogs: n.dialogs,
                activeId: n.activeDialogId,
                onSelect: (r) => {
                  N(false), ee(r, false);
                }
              })
            }),
            R ? e.jsxs("div", {
              className: "flex min-h-0 min-w-0 flex-1 flex-col",
              children: [
                e.jsx(ot, {
                  messages: n.messages,
                  loading: n.messagesLoading,
                  hasMore: n.hasMoreHistory,
                  isMobileLayout: a,
                  onLoadOlder: () => {
                    n.activeDialogId && ee(n.activeDialogId, true);
                  },
                  onReply: (r) => te(r),
                  onForward: L,
                  onShare: (r) => {
                    if (!f.ready || !f.ctx || !M) {
                      z({
                        error: "\uB098\uC640\uC758 \uCC44\uD305 \uC800\uC7A5\uC18C\uAC00 \uC900\uBE44\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
                      });
                      return;
                    }
                    v("\uB098\uC640\uC758 \uCC44\uD305\uC73C\uB85C \uACF5\uC720", A.TELEGRAM_DOWNLOAD, async () => {
                      await ht(f.ctx, M.title, r), z({
                        notice: "\uB098\uC640\uC758 \uCC44\uD305\uC5D0 \uACF5\uC720\uD588\uC2B5\uB2C8\uB2E4."
                      });
                    });
                  },
                  onSaveToVault: I,
                  onDownload: (r) => {
                    v("\uAE30\uAE30\uC5D0 \uB2E4\uC6B4\uB85C\uB4DC", A.TELEGRAM_DOWNLOAD, async () => {
                      const p = await W(r.dialogId, r.id), k = new Blob([
                        p.bytes
                      ], {
                        type: p.mime
                      }), w = URL.createObjectURL(k), _ = document.createElement("a");
                      _.href = w, _.download = p.name, _.click(), URL.revokeObjectURL(w);
                    });
                  }
                }),
                e.jsx(lt, {
                  replyTo: n.replyTo,
                  disabled: n.status !== "ready" || !n.activeDialogId,
                  onClearReply: () => te(null),
                  onSend: (r, p) => {
                    var _a;
                    const k = n.activeDialogId;
                    if (!k) return;
                    const w = (_a = n.replyTo) == null ? void 0 : _a.id;
                    v("Telegram \uC804\uC1A1", A.TELEGRAM_SEND, async () => {
                      p ? await pt(k, p, r, w) : await Xe(k, r, w);
                    });
                  }
                })
              ]
            }) : null
          ]
        }),
        yt.has(n.status) ? e.jsx(at, {
          status: n.status,
          error: n.error,
          loginHint: n.loginHint,
          codeViaApp: n.loginStep === "mtproto" && n.codeViaApp,
          onRequestSms: Ue,
          onSubmitField: (r) => {
            if (n.loginStep === "portal-phone") {
              Ke(r);
              return;
            }
            if (n.loginStep === "portal-code") {
              We(r);
              return;
            }
            Ze(r);
          },
          onSubmitApi: (r) => {
            qe(r);
          },
          onClose: () => {
            He();
          }
        }) : null,
        S ? e.jsx(it, {
          dialogs: n.dialogs.filter((r) => r.id !== S.dialogId),
          onClose: () => L(null),
          onPick: (r) => {
            const p = S;
            L(null), v("\uC804\uB2EC", A.TELEGRAM_SEND, async () => {
              await Ye(p.dialogId, p.id, r), z({
                notice: "\uC804\uB2EC\uD588\uC2B5\uB2C8\uB2E4."
              });
            });
          }
        }) : null,
        V ? e.jsx(dt, {
          onClose: () => T(false),
          onCreate: (r, p) => {
            T(false), v(r === "channel" ? "\uCC44\uB110 \uB9CC\uB4E4\uAE30" : "\uADF8\uB8F9 \uB9CC\uB4E4\uAE30", A.TELEGRAM_SYNC, async () => {
              await ut(r, p);
            });
          }
        }) : null,
        E ? e.jsx(ct, {
          tree: c,
          fileName: E.mediaName || `telegram-${E.id}`,
          onClose: () => I(null),
          onConfirm: (r) => {
            const p = E;
            I(null);
            const k = o === "local" || o === "webdav" || o === "idb" ? o : "s3";
            v("Vault\uC5D0 \uC800\uC7A5", A.TELEGRAM_DOWNLOAD, async () => {
              await gt({
                mode: k,
                ...s ? {
                  getS3Client: s
                } : {},
                ...l ? {
                  bucket: l
                } : {},
                localRootHandle: i,
                localVaultFsPath: x,
                webdavConfig: d
              }, r, p.dialogId, p.id), await (h == null ? void 0 : h()), z({
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
  Et as default
};
