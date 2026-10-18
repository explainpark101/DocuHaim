const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-telegram-D8J-ixWE.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-aws-hJDgVEKM.js"])))=>i.map(i=>d[i]);
import { j as e, r as m, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { ab as R, G as p, b4 as z, dT as re, dU as ae, dV as M, dW as se, dX as ne, dY as oe, b3 as W, dZ as le, d_ as ie, d$ as de, e0 as ce, co as U, cn as v, __tla as __tla_1 } from "./index-PA65OZMG.js";
import { aq as xe, ar as me, as as ue, at as P, au as F, X as pe, av as fe, aw as he, ax as ge, ay as ye, A as be, b as je, K as ke, az as we } from "./vendor-lucide-HhIFgZcf.js";
import { s as ve, g as V, r as X, m as Ne, p as C, a as Se, b as Y, c as K, d as Te, l as Ce, e as H, f as q, h as Ee, i as Me, j as Le, k as Ae, n as Re, o as ze, q as De, __tla as __tla_2 } from "./telegramClient-BwkrZy3O.js";
import { _ as Z } from "./vendor-aws-hJDgVEKM.js";
import { __tla as __tla_3 } from "./bootSplash-BM1jVZSP.js";
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
  function Ie({ status: t, error: s, loginHint: n, codeViaApp: r, onSubmitField: o, onRequestSms: l, onClose: c }) {
    const [i, x] = m.useState(""), [f, a] = m.useState(""), [b, w] = m.useState(""), y = t === "need-name", h = t === "need-phone" ? "\uC804\uD654\uBC88\uD638" : t === "need-code" ? "\uD655\uC778 \uCF54\uB4DC" : y ? "\uC774\uB984" : "2\uB2E8\uACC4 \uBE44\uBC00\uBC88\uD638";
    return e.jsx(R, {
      isOpen: true,
      contentClassName: "max-w-md max-h-[90vh]",
      onClose: c,
      children: e.jsxs("form", {
        className: "flex min-h-0 flex-1 flex-col",
        onSubmit: (g) => {
          if (g.preventDefault(), y) {
            o(`${f.trim()}
${b.trim()}`);
            return;
          }
          o(i), x("");
        },
        children: [
          e.jsxs("header", {
            className: "shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsx("h2", {
                className: "text-base font-semibold text-gray-900 dark:text-odp-fgStrong",
                children: h
              }),
              e.jsx("p", {
                className: "mt-1 text-xs text-gray-500 dark:text-odp-muted",
                children: "\uD734\uB300\uD3F0 \uBC88\uD638\uB97C \uC785\uB825\uD558\uBA74 Telegram \uC11C\uBC84\uAC00 \uD655\uC778\uD569\uB2C8\uB2E4. \uD655\uC778\uC774 \uB05D\uB098\uBA74 \uC774 \uAE30\uAE30\uC5D0 \uC790\uB3D9\uC73C\uB85C \uC800\uC7A5\uB429\uB2C8\uB2E4. \uB85C\uADF8\uC778\uD558\uBA74 Telegram \uC774\uC6A9 \uC57D\uAD00\uC5D0 \uB3D9\uC758\uD558\uAC8C \uB429\uB2C8\uB2E4."
              })
            ]
          }),
          e.jsxs("div", {
            className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4",
            children: [
              y ? e.jsxs(e.Fragment, {
                children: [
                  e.jsxs("label", {
                    className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                    children: [
                      "\uC774\uB984",
                      e.jsx("input", {
                        className: "mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                        autoComplete: "given-name",
                        value: f,
                        onChange: (g) => a(g.target.value)
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
                        value: b,
                        onChange: (g) => w(g.target.value)
                      })
                    ]
                  })
                ]
              }) : e.jsxs("label", {
                className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                children: [
                  h,
                  e.jsx("input", {
                    className: "mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                    type: t === "need-password" ? "password" : "text",
                    inputMode: t === "need-phone" ? "tel" : t === "need-code" ? "numeric" : void 0,
                    autoComplete: t === "need-code" ? "one-time-code" : "off",
                    placeholder: t === "need-phone" ? "+821012345678" : void 0,
                    value: i,
                    onChange: (g) => x(g.target.value)
                  })
                ]
              }),
              n ? e.jsx("p", {
                className: "text-xs text-gray-600 dark:text-odp-muted",
                children: n
              }) : null,
              t === "need-code" && r ? e.jsxs(p, {
                type: "button",
                variant: "tertiary",
                onClick: l,
                children: [
                  e.jsx(me, {
                    size: 14
                  }),
                  "\uBB38\uC790\uB85C \uB2E4\uC2DC \uBC1B\uAE30"
                ]
              }) : null,
              s ? e.jsx("p", {
                className: "text-xs text-red-600 dark:text-red-300",
                children: s
              }) : null
            ]
          }),
          e.jsxs("footer", {
            className: "flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft",
            children: [
              e.jsxs(p, {
                type: "button",
                variant: "secondary",
                onClick: c,
                children: [
                  e.jsx(z, {
                    size: 14
                  }),
                  "\uB2EB\uAE30"
                ]
              }),
              e.jsxs(p, {
                type: "submit",
                variant: "primary",
                children: [
                  e.jsx(ue, {
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
  function Oe({ dialogs: t, activeId: s, onSelect: n }) {
    return e.jsx("div", {
      className: "flex min-h-0 flex-1 flex-col overflow-y-auto",
      children: t.length === 0 ? e.jsx("p", {
        className: "px-3 py-6 text-sm text-gray-500 dark:text-odp-muted",
        children: "\uB300\uD654\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
      }) : t.map((r) => {
        const o = r.id === s;
        return e.jsxs("button", {
          type: "button",
          onClick: () => n(r.id),
          className: `flex w-full items-start gap-2 px-3 py-2.5 text-left ${o ? "bg-sky-50 dark:bg-sky-950/40" : "hover:bg-gray-100 dark:hover:bg-odp-focusBg"}`,
          children: [
            e.jsx("span", {
              className: "mt-0.5 text-sky-700 dark:text-sky-300",
              children: r.isChannel ? e.jsx(P, {
                size: 14
              }) : r.isGroup ? e.jsx(F, {
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
  const Pe = 500;
  function Fe({ message: t, isMobileLayout: s, onReply: n, onForward: r, onShare: o, onSaveToVault: l, onDownload: c }) {
    const i = m.useRef(null), x = m.useRef(null), f = re(s), [a, b] = m.useState(false), w = (t.text || t.mediaName || "\uBA54\uC2DC\uC9C0").slice(0, 80), y = () => {
      i.current && (clearTimeout(i.current), i.current = null);
    };
    return e.jsxs(ae, {
      title: w,
      subtitle: "Telegram \uBA54\uC2DC\uC9C0",
      isMobileLayout: s,
      ...f ? {
        open: a,
        onOpenChange: b
      } : {},
      contentClassName: "z-100010 min-w-48 rounded-md border border-gray-200 bg-white p-1 text-sm shadow dark:border-odp-borderStrong dark:bg-odp-surface",
      trigger: e.jsxs("div", {
        className: `max-w-[85%] rounded-lg px-3 py-2 text-sm ${t.out ? "ml-auto bg-sky-600 text-white" : "bg-gray-100 text-gray-900 dark:bg-odp-bgSoft dark:text-odp-fg"}`,
        onPointerDown: (h) => {
          !f || h.pointerType === "mouse" || (x.current = {
            x: h.clientX,
            y: h.clientY
          }, y(), i.current = setTimeout(() => {
            ne(), b(true);
          }, Pe));
        },
        onPointerUp: y,
        onPointerCancel: y,
        onPointerMove: (h) => {
          const g = x.current;
          if (!g) return;
          const E = h.clientX - g.x, N = h.clientY - g.y;
          E * E + N * N > 64 && y();
        },
        onContextMenu: (h) => {
          f && h.preventDefault();
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
        e.jsx(M, {
          onSelect: () => n(t),
          children: "\uB2F5\uC7A5"
        }),
        e.jsx(M, {
          onSelect: () => r(t),
          children: "\uB2E4\uB978 \uCC44\uD305\uC73C\uB85C \uC804\uB2EC"
        }),
        e.jsx(se, {}),
        e.jsx(M, {
          onSelect: () => o(t),
          children: "\uB098\uC640\uC758 \uCC44\uD305\uC73C\uB85C \uACF5\uC720"
        }),
        t.hasMedia ? e.jsxs(e.Fragment, {
          children: [
            e.jsx(M, {
              onSelect: () => l(t),
              children: "Vault Tree\uC5D0 \uC800\uC7A5"
            }),
            e.jsx(M, {
              onSelect: () => c(t),
              children: "\uAE30\uAE30\uC5D0 \uB2E4\uC6B4\uB85C\uB4DC"
            })
          ]
        }) : null
      ]
    });
  }
  function Ve({ messages: t, loading: s, hasMore: n, isMobileLayout: r, onLoadOlder: o, onReply: l, onForward: c, onShare: i, onSaveToVault: x, onDownload: f }) {
    return e.jsxs("div", {
      className: "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-3 py-3",
      children: [
        n ? e.jsx("button", {
          type: "button",
          className: "self-center text-xs text-sky-700 dark:text-sky-300",
          onClick: o,
          disabled: s,
          children: s ? "\uBD88\uB7EC\uC624\uB294 \uC911\u2026" : "\uC774\uC804 \uBA54\uC2DC\uC9C0"
        }) : null,
        t.length === 0 && !s ? e.jsx("p", {
          className: "py-8 text-center text-sm text-gray-500 dark:text-odp-muted",
          children: "\uBA54\uC2DC\uC9C0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
        }) : null,
        t.map((a) => e.jsx(Fe, {
          message: a,
          isMobileLayout: r,
          onReply: l,
          onForward: c,
          onShare: i,
          onSaveToVault: x,
          onDownload: f
        }, a.id))
      ]
    });
  }
  function $e({ replyTo: t, disabled: s, onClearReply: n, onSend: r }) {
    const o = m.useRef(null), l = m.useRef(null);
    return m.useEffect(() => oe({
      "telegram-focus-composer": () => {
        var _a;
        (_a = o.current) == null ? void 0 : _a.focus();
      }
    }), []), e.jsxs("form", {
      className: "shrink-0 border-t border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
      onSubmit: (c) => {
        var _a, _b, _c;
        c.preventDefault();
        const i = ((_a = o.current) == null ? void 0 : _a.value) || "", x = ((_c = (_b = l.current) == null ? void 0 : _b.files) == null ? void 0 : _c[0]) ?? null;
        r(i, x), o.current && (o.current.value = ""), l.current && (l.current.value = "");
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
                e.jsx(pe, {
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
              disabled: s,
              onClick: () => {
                var _a;
                return (_a = l.current) == null ? void 0 : _a.click();
              },
              children: [
                e.jsx(fe, {
                  size: 16
                }),
                "\uCCA8\uBD80"
              ]
            }),
            e.jsx("textarea", {
              ref: o,
              rows: 2,
              disabled: s,
              placeholder: "\uBA54\uC2DC\uC9C0",
              className: "min-h-10 min-w-0 flex-1 resize-none rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            }),
            e.jsxs(p, {
              type: "submit",
              variant: "primary",
              "aria-label": "\uBCF4\uB0B4\uAE30",
              disabled: s,
              children: [
                e.jsx(he, {
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
  function Be({ dialogs: t, onClose: s, onPick: n }) {
    return e.jsx(R, {
      isOpen: true,
      onClose: s,
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
              onClick: () => n(r.id),
              children: [
                e.jsx(ge, {
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
              onClick: s,
              children: [
                e.jsx(z, {
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
  function Ge({ onClose: t, onCreate: s }) {
    const [n, r] = m.useState("group"), [o, l] = m.useState("");
    return e.jsx(R, {
      isOpen: true,
      onClose: t,
      contentClassName: "max-w-md max-h-[90vh]",
      children: e.jsxs("form", {
        className: "flex min-h-0 flex-1 flex-col",
        onSubmit: (c) => {
          c.preventDefault(), s(n, o);
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
                    variant: n === "group" ? "primary" : "secondary",
                    onClick: () => r("group"),
                    children: [
                      e.jsx(F, {
                        size: 14
                      }),
                      "\uADF8\uB8F9"
                    ]
                  }),
                  e.jsxs(p, {
                    type: "button",
                    variant: n === "channel" ? "primary" : "secondary",
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
                    onChange: (c) => l(c.target.value)
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
                  e.jsx(z, {
                    size: 14
                  }),
                  "\uB2EB\uAE30"
                ]
              }),
              e.jsxs(p, {
                type: "submit",
                variant: "primary",
                children: [
                  n === "group" ? e.jsx(F, {
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
  function J({ node: t, depth: s, selected: n, onSelect: r }) {
    const [o, l] = m.useState(s < 1), c = (t.children || []).filter((x) => x.type === "folder"), i = n === t.path;
    return e.jsxs("div", {
      children: [
        e.jsxs("button", {
          type: "button",
          className: `flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-sm ${i ? "bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100" : "hover:bg-gray-100 dark:hover:bg-odp-focusBg"}`,
          style: {
            paddingLeft: `${s * 12 + 8}px`
          },
          onClick: () => {
            r(t.path), l(true);
          },
          children: [
            e.jsx("span", {
              className: "w-3 shrink-0 text-gray-400",
              children: c.length ? o ? "\u25BE" : "\u25B8" : ""
            }),
            e.jsx(W, {
              size: 14
            }),
            e.jsx("span", {
              className: "min-w-0 truncate",
              children: t.name || "/"
            })
          ]
        }),
        o ? c.map((x) => e.jsx(J, {
          node: x,
          depth: s + 1,
          selected: n,
          onSelect: r
        }, x.path)) : null
      ]
    });
  }
  function Ue({ tree: t, fileName: s, onClose: n, onConfirm: r }) {
    const [o, l] = m.useState("");
    m.useEffect(() => {
      l("");
    }, [
      s
    ]);
    const c = m.useMemo(() => Array.isArray(t) ? t.filter((i) => i.type === "folder") : [], [
      t
    ]);
    return e.jsx(R, {
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
                children: s
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
                  e.jsx(W, {
                    size: 14
                  }),
                  "\uB8E8\uD2B8"
                ]
              }),
              c.map((i) => e.jsx(J, {
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
                onClick: n,
                children: [
                  e.jsx(z, {
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
    return m.useSyncExternalStore(ve, V, V);
  }
  function Q() {
    const t = Y();
    if (!t) throw new Error("Telegram is not connected");
    return t;
  }
  function ee(t) {
    const s = Se(t);
    if (!s) throw new Error("Chat not found");
    return s;
  }
  function qe(t) {
    if (t instanceof Uint8Array) return t;
    if (typeof t == "string") return new TextEncoder().encode(t);
    throw new Error("Could not download Telegram media");
  }
  async function We(t, s, n, r) {
    const o = Q(), l = new Uint8Array(await s.arrayBuffer()), { Buffer: c } = await Z(async () => {
      const { Buffer: a } = await import("./vendor-telegram-D8J-ixWE.js").then((b) => b.i);
      return {
        Buffer: a
      };
    }, __vite__mapDeps([0,1,2])), i = await o.sendFile(ee(t), {
      file: c.from(l),
      ...n.trim() ? {
        caption: n.trim()
      } : {},
      ...r ? {
        replyTo: r
      } : {},
      forceDocument: !s.type.startsWith("image/"),
      workers: 1
    }), x = Ne(t, i);
    if (!x) return;
    const f = V();
    C({
      messages: [
        ...f.messages,
        x
      ],
      replyTo: null,
      dialogs: f.dialogs.map((a) => a.id === t ? {
        ...a,
        preview: x.text || x.mediaName || s.name
      } : a)
    });
  }
  async function $(t, s) {
    var _a, _b;
    const n = Q();
    let r = X(t, s);
    if (!r) {
      const x = await n.getMessages(ee(t), {
        ids: s
      });
      r = Array.isArray(x) ? x[0] : x;
    }
    if (!r) throw new Error("Message not found");
    const o = await n.downloadMedia(r, {}), l = r, c = ((_a = l.file) == null ? void 0 : _a.name) || `telegram-${s}`, i = ((_b = l.file) == null ? void 0 : _b.mimeType) || "application/octet-stream";
    return {
      bytes: qe(o),
      name: c,
      mime: i
    };
  }
  async function Xe(t, s, n = "") {
    const r = Y();
    if (!r) throw new Error("Telegram is not connected");
    const o = s.trim();
    if (!o) throw new Error("Title is required");
    const { Api: l } = await Z(async () => {
      const { Api: c } = await import("./vendor-telegram-D8J-ixWE.js").then((i) => i.a);
      return {
        Api: c
      };
    }, __vite__mapDeps([0,1,2]));
    await r.invoke(new l.channels.CreateChannel({
      title: o,
      about: n.trim(),
      megagroup: t === "group",
      broadcast: t === "channel"
    })), await K();
  }
  async function Ye(t, s, n) {
    const r = [];
    if (n.hasMedia) {
      const i = await $(n.dialogId, n.id), x = new ArrayBuffer(i.bytes.byteLength);
      new Uint8Array(x).set(i.bytes);
      const f = new Blob([
        x
      ], {
        type: i.mime
      });
      r.push(new File([
        f
      ], i.name, {
        type: i.mime
      }));
    }
    const o = X(n.dialogId, n.id), l = String(n.text || (o == null ? void 0 : o.message) || "").trim(), c = [
      `Telegram \xB7 ${s}`,
      l
    ].filter(Boolean).join(`

`);
    await le(t, {
      body: c,
      files: r
    });
  }
  function Ke(t, s) {
    const n = s.replace(/[\\/]/g, "_").replace(/\s+/g, " ").trim() || "telegram-file", r = t.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
    return r ? `${r}/${n}` : n;
  }
  async function Ze(t, s, n, r) {
    const o = await $(n, r), l = Ke(s, o.name);
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
    "need-phone",
    "need-code",
    "need-password",
    "need-name"
  ]);
  ct = function({ isActive: t = true, isMobileLayout: s = false, storageMode: n = "s3", getS3Client: r, s3Bucket: o, localRootHandle: l = null, localVaultFsPath: c = "", webdavConfig: i = null, tree: x = null, onVaultSaved: f }) {
    const a = He(), { addIndicator: b, updateIndicator: w, removeIndicator: y } = de(), h = ce({
      storageMode: n,
      getS3Client: r ?? null,
      s3Bucket: o ?? null,
      localRootHandle: l,
      webdavConfig: i
    }), [g, E] = m.useState(true), [N, D] = m.useState(null), [L, _] = m.useState(null), [te, I] = m.useState(false), A = s;
    if (m.useEffect(() => {
      !t || !U() || Te();
    }, [
      t
    ]), m.useEffect(() => {
      if (a.status !== "connecting" && a.status !== "ready") return;
      const d = "telegram-connect";
      if (a.status === "connecting") {
        b({
          id: d,
          type: v.TELEGRAM_CONNECT,
          label: "Telegram \uC5F0\uACB0 \uC911",
          status: "processing"
        });
        return;
      }
      w(d, {
        status: "done",
        label: "Telegram \uC5F0\uACB0\uB428"
      });
      const u = window.setTimeout(() => y(d), 2500);
      return () => window.clearTimeout(u);
    }, [
      a.status,
      b,
      w,
      y
    ]), !U()) return e.jsx(_e, {});
    const O = a.dialogs.find((d) => d.id === a.activeDialogId) || null, B = !A || !g, S = async (d, u, j) => {
      const k = b({
        type: u,
        label: d,
        status: "processing"
      });
      try {
        await j(), w(k, {
          status: "done"
        });
      } catch (T) {
        const G = T instanceof Error ? T.message : "\uC2E4\uD328";
        w(k, {
          status: "error",
          detail: G
        }), C({
          error: G
        });
      } finally {
        window.setTimeout(() => y(k), 4e3);
      }
    };
    return e.jsxs("div", {
      className: "flex min-h-0 min-w-0 flex-1 flex-col",
      children: [
        e.jsxs("header", {
          className: "flex shrink-0 items-center gap-2 border-b border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
          children: [
            A && !g ? e.jsxs(p, {
              type: "button",
              variant: "tertiary",
              "aria-label": "\uB300\uD654 \uBAA9\uB85D",
              onClick: () => E(true),
              children: [
                e.jsx(be, {
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
              children: B && (O == null ? void 0 : O.title) || a.selfName
            }),
            e.jsxs(p, {
              type: "button",
              variant: "tertiary",
              onClick: () => I(true),
              disabled: a.status !== "ready",
              children: [
                e.jsx(je, {
                  size: 14
                }),
                "\uB9CC\uB4E4\uAE30"
              ]
            }),
            e.jsxs(p, {
              type: "button",
              variant: "tertiary",
              onClick: () => {
                K();
              },
              disabled: a.status !== "ready",
              children: [
                e.jsx(ke, {
                  size: 14
                }),
                "\uC0C8\uB85C\uACE0\uCE68"
              ]
            }),
            e.jsxs(p, {
              type: "button",
              variant: "secondary",
              onClick: () => {
                Ce();
              },
              disabled: a.status === "idle",
              children: [
                e.jsx(we, {
                  size: 14
                }),
                "\uB85C\uADF8\uC544\uC6C3"
              ]
            })
          ]
        }),
        a.error && a.status === "error" ? e.jsx("p", {
          className: "shrink-0 bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950/40 dark:text-red-200",
          children: a.error
        }) : null,
        a.notice ? e.jsx("p", {
          className: "shrink-0 px-3 py-1 text-xs text-sky-800 dark:text-sky-200",
          children: a.notice
        }) : null,
        e.jsxs("div", {
          className: "flex min-h-0 flex-1",
          children: [
            (!A || g) && e.jsx("div", {
              className: A ? "flex min-h-0 min-w-0 flex-1 flex-col" : "flex w-72 shrink-0 flex-col border-r border-gray-200 dark:border-odp-borderSoft",
              children: e.jsx(Oe, {
                dialogs: a.dialogs,
                activeId: a.activeDialogId,
                onSelect: (d) => {
                  E(false), H(d, false);
                }
              })
            }),
            B ? e.jsxs("div", {
              className: "flex min-h-0 min-w-0 flex-1 flex-col",
              children: [
                e.jsx(Ve, {
                  messages: a.messages,
                  loading: a.messagesLoading,
                  hasMore: a.hasMoreHistory,
                  isMobileLayout: s,
                  onLoadOlder: () => {
                    a.activeDialogId && H(a.activeDialogId, true);
                  },
                  onReply: (d) => q(d),
                  onForward: D,
                  onShare: (d) => {
                    if (!h.ready || !h.ctx || !O) {
                      C({
                        error: "\uB098\uC640\uC758 \uCC44\uD305 \uC800\uC7A5\uC18C\uAC00 \uC900\uBE44\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."
                      });
                      return;
                    }
                    S("\uB098\uC640\uC758 \uCC44\uD305\uC73C\uB85C \uACF5\uC720", v.TELEGRAM_DOWNLOAD, async () => {
                      await Ye(h.ctx, O.title, d), C({
                        notice: "\uB098\uC640\uC758 \uCC44\uD305\uC5D0 \uACF5\uC720\uD588\uC2B5\uB2C8\uB2E4."
                      });
                    });
                  },
                  onSaveToVault: _,
                  onDownload: (d) => {
                    S("\uAE30\uAE30\uC5D0 \uB2E4\uC6B4\uB85C\uB4DC", v.TELEGRAM_DOWNLOAD, async () => {
                      const u = await $(d.dialogId, d.id), j = new Blob([
                        u.bytes
                      ], {
                        type: u.mime
                      }), k = URL.createObjectURL(j), T = document.createElement("a");
                      T.href = k, T.download = u.name, T.click(), URL.revokeObjectURL(k);
                    });
                  }
                }),
                e.jsx($e, {
                  replyTo: a.replyTo,
                  disabled: a.status !== "ready" || !a.activeDialogId,
                  onClearReply: () => q(null),
                  onSend: (d, u) => {
                    var _a;
                    const j = a.activeDialogId;
                    if (!j) return;
                    const k = (_a = a.replyTo) == null ? void 0 : _a.id;
                    S("Telegram \uC804\uC1A1", v.TELEGRAM_SEND, async () => {
                      u ? await We(j, u, d, k) : await Re(j, d, k);
                    });
                  }
                })
              ]
            }) : null
          ]
        }),
        Je.has(a.status) ? e.jsx(Ie, {
          status: a.status,
          error: a.error,
          loginHint: a.loginHint,
          codeViaApp: a.loginStep === "mtproto" && a.codeViaApp,
          onRequestSms: Ee,
          onSubmitField: (d) => {
            if (a.loginStep === "portal-phone") {
              Le(d);
              return;
            }
            if (a.loginStep === "portal-code") {
              Ae(d);
              return;
            }
            De(d);
          },
          onClose: () => {
            Me();
          }
        }) : null,
        N ? e.jsx(Be, {
          dialogs: a.dialogs.filter((d) => d.id !== N.dialogId),
          onClose: () => D(null),
          onPick: (d) => {
            const u = N;
            D(null), S("\uC804\uB2EC", v.TELEGRAM_SEND, async () => {
              await ze(u.dialogId, u.id, d), C({
                notice: "\uC804\uB2EC\uD588\uC2B5\uB2C8\uB2E4."
              });
            });
          }
        }) : null,
        te ? e.jsx(Ge, {
          onClose: () => I(false),
          onCreate: (d, u) => {
            I(false), S(d === "channel" ? "\uCC44\uB110 \uB9CC\uB4E4\uAE30" : "\uADF8\uB8F9 \uB9CC\uB4E4\uAE30", v.TELEGRAM_SYNC, async () => {
              await Xe(d, u);
            });
          }
        }) : null,
        L ? e.jsx(Ue, {
          tree: x,
          fileName: L.mediaName || `telegram-${L.id}`,
          onClose: () => _(null),
          onConfirm: (d) => {
            const u = L;
            _(null);
            const j = n === "local" || n === "webdav" || n === "idb" ? n : "s3";
            S("Vault\uC5D0 \uC800\uC7A5", v.TELEGRAM_DOWNLOAD, async () => {
              await Ze({
                mode: j,
                ...r ? {
                  getS3Client: r
                } : {},
                ...o ? {
                  bucket: o
                } : {},
                localRootHandle: l,
                localVaultFsPath: c,
                webdavConfig: i
              }, d, u.dialogId, u.id), await (f == null ? void 0 : f()), C({
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
