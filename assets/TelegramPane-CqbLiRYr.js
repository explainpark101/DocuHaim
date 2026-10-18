const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-telegram-D8J-ixWE.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-aws-hJDgVEKM.js"])))=>i.map(i=>d[i]);
import { j as e, r as m, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { ab as _, G as p, bb as D, dT as re, dU as ae, dV as z, dW as se, dX as ne, dY as oe, ba as q, dZ as le, d_ as ie, d$ as de, e0 as ce, b4 as H, b3 as E, __tla as __tla_1 } from "./index-Bmhp_ULf.js";
import { aq as xe, ar as me, as as ue, at as pe, au as P, av as V, X as fe, aw as he, ax as ge, ay as be, az as ye, A as je, b as ke, K as we, aA as ve } from "./vendor-lucide-C5jo4V-d.js";
import { s as Ne, g as $, r as Y, m as Se, p as M, a as Te, b as K, c as Z, d as Ce, l as Ee, e as W, f as X, h as Me, i as Ae, j as Le, k as Re, n as ze, o as Ie, __tla as __tla_2 } from "./telegramClient-Dpbg0aSv.js";
import { _ as J } from "./vendor-aws-hJDgVEKM.js";
import { __tla as __tla_3 } from "./bootSplash-CMslVZAf.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-D1Cm_mSM.js";
let ct;
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
  function _e() {
    return e.jsxs("div", {
      className: "flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-6 text-center",
      children: [
        e.jsx(xe, {
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
  function De({ status: t, error: a, loginHint: s, codeViaApp: r, onSubmitCredentials: o, onSubmitField: l, onRequestSms: x, onClose: i }) {
    const [c, h] = m.useState(""), [n, j] = m.useState(""), [k, y] = m.useState(""), [f, w] = m.useState(""), [N, S] = m.useState(""), T = t === "need-credentials", C = t === "need-name", A = T ? "Telegram API \uC790\uACA9 \uC99D\uBA85" : t === "need-phone" ? "\uC804\uD654\uBC88\uD638" : t === "need-code" ? "\uB85C\uADF8\uC778 \uCF54\uB4DC" : C ? "\uC774\uB984" : "2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638";
    return e.jsx(_, {
      isOpen: true,
      contentClassName: "max-w-md max-h-[90vh]",
      onClose: i,
      children: e.jsxs("form", {
        className: "flex min-h-0 flex-1 flex-col",
        onSubmit: (g) => {
          if (g.preventDefault(), T) {
            o(Number(c), n);
            return;
          }
          if (C) {
            l(`${f.trim()}
${N.trim()}`);
            return;
          }
          l(k), y("");
        },
        children: [
          e.jsxs("header", {
            className: "shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsx("h2", {
                className: "text-base font-semibold text-gray-900 dark:text-odp-fgStrong",
                children: A
              }),
              e.jsx("p", {
                className: "mt-1 text-xs text-gray-500 dark:text-odp-muted",
                children: "\uC804\uD654\uBC88\uD638, \uC778\uC99D \uCF54\uB4DC, 2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638\uB294 \uC774 \uD654\uBA74\uC5D0\uC11C \uC785\uB825\uD569\uB2C8\uB2E4. \uB85C\uADF8\uC778\uD558\uBA74 Telegram \uC774\uC6A9 \uC57D\uAD00\uC5D0 \uB3D9\uC758\uD558\uAC8C \uB429\uB2C8\uB2E4."
              })
            ]
          }),
          e.jsxs("div", {
            className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4",
            children: [
              T ? e.jsxs(e.Fragment, {
                children: [
                  e.jsxs("label", {
                    className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                    children: [
                      "api_id",
                      e.jsx("input", {
                        className: "mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                        inputMode: "numeric",
                        autoComplete: "off",
                        value: c,
                        onChange: (g) => h(g.target.value)
                      })
                    ]
                  }),
                  e.jsxs("label", {
                    className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                    children: [
                      "api_hash",
                      e.jsx("input", {
                        className: "mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                        type: "password",
                        autoComplete: "off",
                        value: n,
                        onChange: (g) => j(g.target.value)
                      })
                    ]
                  })
                ]
              }) : C ? e.jsxs(e.Fragment, {
                children: [
                  e.jsxs("label", {
                    className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                    children: [
                      "\uC774\uB984",
                      e.jsx("input", {
                        className: "mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                        autoComplete: "given-name",
                        value: f,
                        onChange: (g) => w(g.target.value)
                      })
                    ]
                  }),
                  e.jsxs("label", {
                    className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                    children: [
                      "\uC131",
                      e.jsx("input", {
                        className: "mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                        autoComplete: "family-name",
                        value: N,
                        onChange: (g) => S(g.target.value)
                      })
                    ]
                  })
                ]
              }) : e.jsxs("label", {
                className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                children: [
                  A,
                  e.jsx("input", {
                    className: "mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                    type: t === "need-password" ? "password" : "text",
                    inputMode: t === "need-phone" ? "tel" : t === "need-code" ? "numeric" : void 0,
                    autoComplete: t === "need-code" ? "one-time-code" : "off",
                    placeholder: t === "need-phone" ? "+821012345678" : void 0,
                    value: k,
                    onChange: (g) => y(g.target.value)
                  })
                ]
              }),
              s ? e.jsx("p", {
                className: "text-xs text-gray-600 dark:text-odp-muted",
                children: s
              }) : null,
              t === "need-code" && r ? e.jsxs(p, {
                type: "button",
                variant: "tertiary",
                onClick: x,
                children: [
                  e.jsx(me, {
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
          }),
          e.jsxs("footer", {
            className: "flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsxs(p, {
                type: "button",
                variant: "secondary",
                onClick: i,
                children: [
                  e.jsx(D, {
                    size: 14
                  }),
                  "\uB2EB\uAE30"
                ]
              }),
              e.jsxs(p, {
                type: "submit",
                variant: "primary",
                children: [
                  T ? e.jsx(ue, {
                    size: 14
                  }) : e.jsx(pe, {
                    size: 14
                  }),
                  "\uACC4\uC18D"
                ]
              })
            ]
          })
        ]
      })
    });
  }
  function Oe({ dialogs: t, activeId: a, onSelect: s }) {
    return e.jsx("div", {
      className: "flex min-h-0 flex-1 flex-col overflow-y-auto",
      children: t.length === 0 ? e.jsx("p", {
        className: "px-3 py-6 text-sm text-gray-500 dark:text-odp-muted",
        children: "\uB300\uD654\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
      }) : t.map((r) => {
        const o = r.id === a;
        return e.jsxs("button", {
          type: "button",
          onClick: () => s(r.id),
          className: `flex w-full items-start gap-2 px-3 py-2.5 text-left ${o ? "bg-sky-50 dark:bg-sky-950/40" : "hover:bg-gray-100 dark:hover:bg-odp-focusBg"}`,
          children: [
            e.jsx("span", {
              className: "mt-0.5 text-sky-700 dark:text-sky-300",
              children: r.isChannel ? e.jsx(P, {
                size: 14
              }) : r.isGroup ? e.jsx(V, {
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
                      children: r.title
                    }),
                    r.unread > 0 ? e.jsx("span", {
                      className: "rounded-full bg-sky-600 px-1.5 text-[10px] text-white",
                      children: r.unread
                    }) : null
                  ]
                }),
                e.jsx("span", {
                  className: "block truncate text-xs text-gray-500 dark:text-odp-muted",
                  children: r.preview || " "
                })
              ]
            })
          ]
        }, r.id);
      })
    });
  }
  const Fe = 500;
  function Pe({ message: t, isMobileLayout: a, onReply: s, onForward: r, onShare: o, onSaveToVault: l, onDownload: x }) {
    const i = m.useRef(null), c = m.useRef(null), h = re(a), [n, j] = m.useState(false), k = (t.text || t.mediaName || "\uBA54\uC2DC\uC9C0").slice(0, 80), y = () => {
      i.current && (clearTimeout(i.current), i.current = null);
    };
    return e.jsxs(ae, {
      title: k,
      subtitle: "Telegram \uBA54\uC2DC\uC9C0",
      isMobileLayout: a,
      ...h ? {
        open: n,
        onOpenChange: j
      } : {},
      contentClassName: "z-100010 min-w-48 rounded-md border border-gray-200 bg-white p-1 text-sm shadow dark:border-odp-borderStrong dark:bg-odp-surface",
      trigger: e.jsxs("div", {
        className: `max-w-[85%] rounded-lg px-3 py-2 text-sm ${t.out ? "ml-auto bg-sky-600 text-white" : "bg-gray-100 text-gray-900 dark:bg-odp-bgSoft dark:text-odp-fg"}`,
        onPointerDown: (f) => {
          !h || f.pointerType === "mouse" || (c.current = {
            x: f.clientX,
            y: f.clientY
          }, y(), i.current = setTimeout(() => {
            ne(), j(true);
          }, Fe));
        },
        onPointerUp: y,
        onPointerCancel: y,
        onPointerMove: (f) => {
          const w = c.current;
          if (!w) return;
          const N = f.clientX - w.x, S = f.clientY - w.y;
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
        e.jsx(z, {
          onSelect: () => s(t),
          children: "\uB2F5\uC7A5"
        }),
        e.jsx(z, {
          onSelect: () => r(t),
          children: "\uB2E4\uB978 \uCC44\uD305\uC73C\uB85C \uC804\uB2EC"
        }),
        e.jsx(se, {}),
        e.jsx(z, {
          onSelect: () => o(t),
          children: "\uB098\uC640\uC758 \uCC44\uD305\uC73C\uB85C \uACF5\uC720"
        }),
        t.hasMedia ? e.jsxs(e.Fragment, {
          children: [
            e.jsx(z, {
              onSelect: () => l(t),
              children: "Vault Tree\uC5D0 \uC800\uC7A5"
            }),
            e.jsx(z, {
              onSelect: () => x(t),
              children: "\uAE30\uAE30\uC5D0 \uB2E4\uC6B4\uB85C\uB4DC"
            })
          ]
        }) : null
      ]
    });
  }
  function Ve({ messages: t, loading: a, hasMore: s, isMobileLayout: r, onLoadOlder: o, onReply: l, onForward: x, onShare: i, onSaveToVault: c, onDownload: h }) {
    return e.jsxs("div", {
      className: "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-3 py-3",
      children: [
        s ? e.jsx("button", {
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
        t.map((n) => e.jsx(Pe, {
          message: n,
          isMobileLayout: r,
          onReply: l,
          onForward: x,
          onShare: i,
          onSaveToVault: c,
          onDownload: h
        }, n.id))
      ]
    });
  }
  function $e({ replyTo: t, disabled: a, onClearReply: s, onSend: r }) {
    const o = m.useRef(null), l = m.useRef(null);
    return m.useEffect(() => oe({
      "telegram-focus-composer": () => {
        var _a;
        (_a = o.current) == null ? void 0 : _a.focus();
      }
    }), []), e.jsxs("form", {
      className: "shrink-0 border-t border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
      onSubmit: (x) => {
        var _a, _b, _c;
        x.preventDefault();
        const i = ((_a = o.current) == null ? void 0 : _a.value) || "", c = ((_c = (_b = l.current) == null ? void 0 : _b.files) == null ? void 0 : _c[0]) ?? null;
        r(i, c), o.current && (o.current.value = ""), l.current && (l.current.value = "");
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
              onClick: s,
              children: [
                e.jsx(fe, {
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
              ref: l,
              type: "file",
              className: "hidden"
            }),
            e.jsxs(p, {
              type: "button",
              variant: "tertiary",
              "aria-label": "\uD30C\uC77C \uCCA8\uBD80",
              disabled: a,
              onClick: () => {
                var _a;
                return (_a = l.current) == null ? void 0 : _a.click();
              },
              children: [
                e.jsx(he, {
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
            e.jsxs(p, {
              type: "submit",
              variant: "primary",
              "aria-label": "\uBCF4\uB0B4\uAE30",
              disabled: a,
              children: [
                e.jsx(ge, {
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
  function Be({ dialogs: t, onClose: a, onPick: s }) {
    return e.jsx(_, {
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
            children: t.map((r) => e.jsxs("button", {
              type: "button",
              className: "flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-odp-focusBg",
              onClick: () => s(r.id),
              children: [
                e.jsx(be, {
                  size: 14
                }),
                e.jsx("span", {
                  className: "truncate",
                  children: r.title
                })
              ]
            }, r.id))
          }),
          e.jsx("footer", {
            className: "flex shrink-0 justify-end border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: e.jsxs(p, {
              type: "button",
              variant: "secondary",
              onClick: a,
              children: [
                e.jsx(D, {
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
  function Ge({ onClose: t, onCreate: a }) {
    const [s, r] = m.useState("group"), [o, l] = m.useState("");
    return e.jsx(_, {
      isOpen: true,
      onClose: t,
      contentClassName: "max-w-md max-h-[90vh]",
      children: e.jsxs("form", {
        className: "flex min-h-0 flex-1 flex-col",
        onSubmit: (x) => {
          x.preventDefault(), a(s, o);
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
                  e.jsxs(p, {
                    type: "button",
                    variant: s === "group" ? "primary" : "secondary",
                    onClick: () => r("group"),
                    children: [
                      e.jsx(V, {
                        size: 14
                      }),
                      "\uADF8\uB8F9"
                    ]
                  }),
                  e.jsxs(p, {
                    type: "button",
                    variant: s === "channel" ? "primary" : "secondary",
                    onClick: () => r("channel"),
                    children: [
                      e.jsx(P, {
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
                    onChange: (x) => l(x.target.value)
                  })
                ]
              })
            ]
          }),
          e.jsxs("footer", {
            className: "flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsxs(p, {
                type: "button",
                variant: "secondary",
                onClick: t,
                children: [
                  e.jsx(D, {
                    size: 14
                  }),
                  "\uB2EB\uAE30"
                ]
              }),
              e.jsxs(p, {
                type: "submit",
                variant: "primary",
                children: [
                  s === "group" ? e.jsx(V, {
                    size: 14
                  }) : e.jsx(P, {
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
  function Q({ node: t, depth: a, selected: s, onSelect: r }) {
    const [o, l] = m.useState(a < 1), x = (t.children || []).filter((c) => c.type === "folder"), i = s === t.path;
    return e.jsxs("div", {
      children: [
        e.jsxs("button", {
          type: "button",
          className: `flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-sm ${i ? "bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100" : "hover:bg-gray-100 dark:hover:bg-odp-focusBg"}`,
          style: {
            paddingLeft: `${a * 12 + 8}px`
          },
          onClick: () => {
            r(t.path), l(true);
          },
          children: [
            e.jsx("span", {
              className: "w-3 shrink-0 text-gray-400",
              children: x.length ? o ? "\u25BE" : "\u25B8" : ""
            }),
            e.jsx(q, {
              size: 14
            }),
            e.jsx("span", {
              className: "min-w-0 truncate",
              children: t.name || "/"
            })
          ]
        }),
        o ? x.map((c) => e.jsx(Q, {
          node: c,
          depth: a + 1,
          selected: s,
          onSelect: r
        }, c.path)) : null
      ]
    });
  }
  function Ue({ tree: t, fileName: a, onClose: s, onConfirm: r }) {
    const [o, l] = m.useState("");
    m.useEffect(() => {
      l("");
    }, [
      a
    ]);
    const x = m.useMemo(() => Array.isArray(t) ? t.filter((i) => i.type === "folder") : [], [
      t
    ]);
    return e.jsx(_, {
      isOpen: true,
      onClose: s,
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
                onClick: () => l(""),
                children: [
                  e.jsx(q, {
                    size: 14
                  }),
                  "\uB8E8\uD2B8"
                ]
              }),
              x.map((i) => e.jsx(Q, {
                node: i,
                depth: 0,
                selected: o,
                onSelect: l
              }, i.path))
            ]
          }),
          e.jsxs("footer", {
            className: "flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsxs(p, {
                type: "button",
                variant: "secondary",
                onClick: s,
                children: [
                  e.jsx(D, {
                    size: 14
                  }),
                  "\uB2EB\uAE30"
                ]
              }),
              e.jsxs(p, {
                type: "button",
                variant: "primary",
                onClick: () => r(o || ""),
                children: [
                  e.jsx(ye, {
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
  function He() {
    return m.useSyncExternalStore(Ne, $, $);
  }
  function ee() {
    const t = K();
    if (!t) throw new Error("Telegram is not connected");
    return t;
  }
  function te(t) {
    const a = Te(t);
    if (!a) throw new Error("Chat not found");
    return a;
  }
  function We(t) {
    if (t instanceof Uint8Array) return t;
    if (typeof t == "string") return new TextEncoder().encode(t);
    throw new Error("Could not download Telegram media");
  }
  async function Xe(t, a, s, r) {
    const o = ee(), l = new Uint8Array(await a.arrayBuffer()), { Buffer: x } = await J(async () => {
      const { Buffer: n } = await import("./vendor-telegram-D8J-ixWE.js").then((j) => j.i);
      return {
        Buffer: n
      };
    }, __vite__mapDeps([0,1,2])), i = await o.sendFile(te(t), {
      file: x.from(l),
      ...s.trim() ? {
        caption: s.trim()
      } : {},
      ...r ? {
        replyTo: r
      } : {},
      forceDocument: !a.type.startsWith("image/"),
      workers: 1
    }), c = Se(t, i);
    if (!c) return;
    const h = $();
    M({
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
  async function B(t, a) {
    var _a, _b;
    const s = ee();
    let r = Y(t, a);
    if (!r) {
      const c = await s.getMessages(te(t), {
        ids: a
      });
      r = Array.isArray(c) ? c[0] : c;
    }
    if (!r) throw new Error("Message not found");
    const o = await s.downloadMedia(r, {}), l = r, x = ((_a = l.file) == null ? void 0 : _a.name) || `telegram-${a}`, i = ((_b = l.file) == null ? void 0 : _b.mimeType) || "application/octet-stream";
    return {
      bytes: We(o),
      name: x,
      mime: i
    };
  }
  async function qe(t, a, s = "") {
    const r = K();
    if (!r) throw new Error("Telegram is not connected");
    const o = a.trim();
    if (!o) throw new Error("Title is required");
    const { Api: l } = await J(async () => {
      const { Api: x } = await import("./vendor-telegram-D8J-ixWE.js").then((i) => i.a);
      return {
        Api: x
      };
    }, __vite__mapDeps([0,1,2]));
    await r.invoke(new l.channels.CreateChannel({
      title: o,
      about: s.trim(),
      megagroup: t === "group",
      broadcast: t === "channel"
    })), await Z();
  }
  async function Ye(t, a, s) {
    const r = [];
    if (s.hasMedia) {
      const i = await B(s.dialogId, s.id), c = new ArrayBuffer(i.bytes.byteLength);
      new Uint8Array(c).set(i.bytes);
      const h = new Blob([
        c
      ], {
        type: i.mime
      });
      r.push(new File([
        h
      ], i.name, {
        type: i.mime
      }));
    }
    const o = Y(s.dialogId, s.id), l = String(s.text || (o == null ? void 0 : o.message) || "").trim(), x = [
      `Telegram \xB7 ${a}`,
      l
    ].filter(Boolean).join(`

`);
    await le(t, {
      body: x,
      files: r
    });
  }
  function Ke(t, a) {
    const s = a.replace(/[\\/]/g, "_").replace(/\s+/g, " ").trim() || "telegram-file", r = t.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
    return r ? `${r}/${s}` : s;
  }
  async function Ze(t, a, s, r) {
    const o = await B(s, r), l = Ke(a, o.name);
    return await ie({
      mode: t.mode,
      getS3Client: t.getS3Client,
      s3Creds: {
        bucket: t.bucket || ""
      },
      localRootHandle: t.localRootHandle ?? null,
      localVaultFsPath: t.localVaultFsPath || "",
      webdavConfig: t.webdavConfig ?? null
    }).writeBytes(l, o.bytes), l;
  }
  const Je = /* @__PURE__ */ new Set([
    "need-credentials",
    "need-phone",
    "need-code",
    "need-password",
    "need-name"
  ]);
  ct = function({ isActive: t = true, isMobileLayout: a = false, storageMode: s = "s3", getS3Client: r, s3Bucket: o, localRootHandle: l = null, localVaultFsPath: x = "", webdavConfig: i = null, tree: c = null, onVaultSaved: h }) {
    const n = He(), { addIndicator: j, updateIndicator: k, removeIndicator: y } = de(), f = ce({
      storageMode: s,
      getS3Client: r ?? null,
      s3Bucket: o ?? null,
      localRootHandle: l,
      webdavConfig: i
    }), [w, N] = m.useState(true), [S, T] = m.useState(null), [C, A] = m.useState(null), [g, O] = m.useState(false), I = a;
    if (m.useEffect(() => {
      !t || !H() || Ce();
    }, [
      t
    ]), m.useEffect(() => {
      if (n.status !== "connecting" && n.status !== "ready") return;
      const d = "telegram-connect";
      if (n.status === "connecting") {
        j({
          id: d,
          type: E.TELEGRAM_CONNECT,
          label: "Telegram \uC5F0\uACB0 \uC911",
          status: "processing"
        });
        return;
      }
      k(d, {
        status: "done",
        label: "Telegram \uC5F0\uACB0\uB428"
      });
      const u = window.setTimeout(() => y(d), 2500);
      return () => window.clearTimeout(u);
    }, [
      n.status,
      j,
      k,
      y
    ]), !H()) return e.jsx(_e, {});
    const F = n.dialogs.find((d) => d.id === n.activeDialogId) || null, G = !I || !w, L = async (d, u, b) => {
      const v = j({
        type: u,
        label: d,
        status: "processing"
      });
      try {
        await b(), k(v, {
          status: "done"
        });
      } catch (R) {
        const U = R instanceof Error ? R.message : "\uC2E4\uD328";
        k(v, {
          status: "error",
          detail: U
        }), M({
          error: U
        });
      } finally {
        window.setTimeout(() => y(v), 4e3);
      }
    };
    return e.jsxs("div", {
      className: "flex min-h-0 min-w-0 flex-1 flex-col",
      children: [
        e.jsxs("header", {
          className: "flex shrink-0 items-center gap-2 border-b border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
          children: [
            I && !w ? e.jsxs(p, {
              type: "button",
              variant: "tertiary",
              "aria-label": "\uB300\uD654 \uBAA9\uB85D",
              onClick: () => N(true),
              children: [
                e.jsx(je, {
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
              children: G && (F == null ? void 0 : F.title) || n.selfName
            }),
            e.jsxs(p, {
              type: "button",
              variant: "tertiary",
              onClick: () => O(true),
              disabled: n.status !== "ready",
              children: [
                e.jsx(ke, {
                  size: 14
                }),
                "\uB9CC\uB4E4\uAE30"
              ]
            }),
            e.jsxs(p, {
              type: "button",
              variant: "tertiary",
              onClick: () => {
                Z();
              },
              disabled: n.status !== "ready",
              children: [
                e.jsx(we, {
                  size: 14
                }),
                "\uC0C8\uB85C\uACE0\uCE68"
              ]
            }),
            e.jsxs(p, {
              type: "button",
              variant: "secondary",
              onClick: () => {
                Ee();
              },
              disabled: n.status === "idle",
              children: [
                e.jsx(ve, {
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
            (!I || w) && e.jsx("div", {
              className: I ? "flex min-h-0 min-w-0 flex-1 flex-col" : "flex w-72 shrink-0 flex-col border-r border-gray-200 dark:border-odp-borderSoft",
              children: e.jsx(Oe, {
                dialogs: n.dialogs,
                activeId: n.activeDialogId,
                onSelect: (d) => {
                  N(false), W(d, false);
                }
              })
            }),
            G ? e.jsxs("div", {
              className: "flex min-h-0 min-w-0 flex-1 flex-col",
              children: [
                e.jsx(Ve, {
                  messages: n.messages,
                  loading: n.messagesLoading,
                  hasMore: n.hasMoreHistory,
                  isMobileLayout: a,
                  onLoadOlder: () => {
                    n.activeDialogId && W(n.activeDialogId, true);
                  },
                  onReply: (d) => X(d),
                  onForward: T,
                  onShare: (d) => {
                    if (!f.ready || !f.ctx || !F) {
                      M({
                        error: "\uB098\uC640\uC758 \uCC44\uD305 \uC800\uC7A5\uC18C\uAC00 \uC900\uBE44\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
                      });
                      return;
                    }
                    L("\uB098\uC640\uC758 \uCC44\uD305\uC73C\uB85C \uACF5\uC720", E.TELEGRAM_DOWNLOAD, async () => {
                      await Ye(f.ctx, F.title, d), M({
                        notice: "\uB098\uC640\uC758 \uCC44\uD305\uC5D0 \uACF5\uC720\uD588\uC2B5\uB2C8\uB2E4."
                      });
                    });
                  },
                  onSaveToVault: A,
                  onDownload: (d) => {
                    L("\uAE30\uAE30\uC5D0 \uB2E4\uC6B4\uB85C\uB4DC", E.TELEGRAM_DOWNLOAD, async () => {
                      const u = await B(d.dialogId, d.id), b = new Blob([
                        u.bytes
                      ], {
                        type: u.mime
                      }), v = URL.createObjectURL(b), R = document.createElement("a");
                      R.href = v, R.download = u.name, R.click(), URL.revokeObjectURL(v);
                    });
                  }
                }),
                e.jsx($e, {
                  replyTo: n.replyTo,
                  disabled: n.status !== "ready" || !n.activeDialogId,
                  onClearReply: () => X(null),
                  onSend: (d, u) => {
                    var _a;
                    const b = n.activeDialogId;
                    if (!b) return;
                    const v = (_a = n.replyTo) == null ? void 0 : _a.id;
                    L("Telegram \uC804\uC1A1", E.TELEGRAM_SEND, async () => {
                      u ? await Xe(b, u, d, v) : await ze(b, d, v);
                    });
                  }
                })
              ]
            }) : null
          ]
        }),
        Je.has(n.status) ? e.jsx(De, {
          status: n.status,
          error: n.error,
          loginHint: n.loginHint,
          codeViaApp: n.codeViaApp,
          onRequestSms: Ae,
          onSubmitCredentials: (d, u) => {
            Re(d, u).catch((b) => {
              M({
                status: "error",
                error: b instanceof Error ? b.message : "\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."
              });
            });
          },
          onSubmitField: Me,
          onClose: () => {
            Le();
          }
        }) : null,
        S ? e.jsx(Be, {
          dialogs: n.dialogs.filter((d) => d.id !== S.dialogId),
          onClose: () => T(null),
          onPick: (d) => {
            const u = S;
            T(null), L("\uC804\uB2EC", E.TELEGRAM_SEND, async () => {
              await Ie(u.dialogId, u.id, d), M({
                notice: "\uC804\uB2EC\uD588\uC2B5\uB2C8\uB2E4."
              });
            });
          }
        }) : null,
        g ? e.jsx(Ge, {
          onClose: () => O(false),
          onCreate: (d, u) => {
            O(false), L(d === "channel" ? "\uCC44\uB110 \uB9CC\uB4E4\uAE30" : "\uADF8\uB8F9 \uB9CC\uB4E4\uAE30", E.TELEGRAM_SYNC, async () => {
              await qe(d, u);
            });
          }
        }) : null,
        C ? e.jsx(Ue, {
          tree: c,
          fileName: C.mediaName || `telegram-${C.id}`,
          onClose: () => A(null),
          onConfirm: (d) => {
            const u = C;
            A(null);
            const b = s === "local" || s === "webdav" || s === "idb" ? s : "s3";
            L("Vault\uC5D0 \uC800\uC7A5", E.TELEGRAM_DOWNLOAD, async () => {
              await Ze({
                mode: b,
                ...r ? {
                  getS3Client: r
                } : {},
                ...o ? {
                  bucket: o
                } : {},
                localRootHandle: l,
                localVaultFsPath: x,
                webdavConfig: i
              }, d, u.dialogId, u.id), await (h == null ? void 0 : h()), M({
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
  ct as default
};
