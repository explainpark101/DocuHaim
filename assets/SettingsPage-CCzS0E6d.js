const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-siMg0SyX.js","assets/vendor-react-kfkzeLNk.js","assets/vendor-md-editor-DQ2k84v8.js","assets/vendor-aws-DjU81Y0s.js","assets/vendor-lucide-B9iB2q4-.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-9P87yVtW.js","assets/vendor-radix-CyZ5tkEq.js","assets/index-CqNGOs1m.css"])))=>i.map(i=>d[i]);
import { _ as hr, __tla as __tla_0 } from "./vendor-md-editor-DQ2k84v8.js";
import { r, j as e, e as fr, __tla as __tla_1 } from "./vendor-react-kfkzeLNk.js";
import { av as et, aw as yr, ax as kr, ay as jr, az as vr, aA as ie, aB as Nr, aC as Sr, aD as wr, aE as Cr, aF as Er, aG as Nt, aH as St, aI as H, aJ as wt, aK as Ct, aL as Ir, aM as Or, aN as Ar, aO as Lr, aP as Et, aQ as It, aR as Fe, aS as Pr, aT as Dr, aU as _r, aV as Ot, aW as Tr, aX as At, aY as Lt, N as ae, aZ as xe, a3 as Pt, a_ as zr, a$ as Rr, b0 as $r, b1 as F, b2 as ne, b3 as be, b4 as je, b5 as Fr, b6 as Vt, j as ye, b7 as Dt, b8 as Mr, b9 as Br, ba as Kr, bb as Wr, bc as Ur, bd as Gr, be as Vr, bf as Hr, K as ot, bg as Yr, bh as Xr, bi as lt, bj as Jr, bk as qr, bl as Qr, bm as _t, bn as Zr, bo as ea, bp as tt, bq as ta, br as ra, bs as aa, bt as sa, bu as da, bv as Tt, bw as na, bx as oa, by as zt, bz as la, bA as Rt, bB as $t, bC as rt, bD as ia, bE as ca, bF as xa, bG as ba, bH as ua, bI as pa, bJ as fe, bK as ga, bL as ma, bM as ha, bN as fa, bO as Me, bP as Ft, bQ as ya, bR as ka, bS as ja, bT as va, bU as Na, bV as Sa, bW as Be, bX as Mt, bY as Ke, bZ as wa, b_ as Ca, __tla as __tla_2 } from "./index-siMg0SyX.js";
import { G as Ht, R as Yt, J as Xt, K as Ue, N as oe, O as le, X as Jt, Q as Ea, L as Ge, V as qt, W as Ia, Y as Oa } from "./vendor-lucide-B9iB2q4-.js";
import { T as Aa } from "./TableStyleTemplateEditor-CwJ9BQO5.js";
import { S as Bt } from "./SliderWithScrubInput-B2qoXP-p.js";
import { S as Qt, b as Zt, s as ue, t as se, v as ve, D as La, w as Pa, x as Da, y as _a, z as Ta, B as za } from "./vendor-radix-CyZ5tkEq.js";
import { G as Ra, O as $a, __tla as __tla_3 } from "./OpenAiCompatibleModelSelect-DtPJ-zKB.js";
import "./vendor-aws-DjU81Y0s.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-9P87yVtW.js";
import "./index-DKf8xmDw.js";
import "./vendor-google-genai-BXoTgYIl.js";
let _s;
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
  function Z(t) {
    if (t == null || Number.isNaN(t)) return "\uC54C \uC218 \uC5C6\uC74C";
    if (t < 1024) return `${t} B`;
    const s = t / 1024;
    if (s < 1024) return `${s.toFixed(1)} KB`;
    const a = s / 1024;
    return a < 1024 ? `${a.toFixed(1)} MB` : `${(a / 1024).toFixed(1)} GB`;
  }
  function Fa(t) {
    const s = String(t || "").toLowerCase(), a = s.lastIndexOf(".");
    return a <= 0 || a === s.length - 1 ? "(none)" : s.slice(a + 1);
  }
  function Ma(t) {
    const s = String(t || "").replace(/^\/+/, "");
    return s === et || s === `${et}/` || s.startsWith(`${et}/`);
  }
  function er(t) {
    var _a2;
    if (t.type === "file") return typeof t.size == "number" && Number.isFinite(t.size) ? t.size : 0;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let s = 0;
    for (const a of t.children) s += er(a);
    return s;
  }
  function tr(t) {
    var _a2;
    if (t.type === "file") return 1;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let s = 0;
    for (const a of t.children) s += tr(a);
    return s;
  }
  function Ba(t) {
    const s = Array.isArray(t) ? t : [];
    let a = 0, u = 0, n = 0, l = 0, p = 0, f = 0, N = 0;
    const v = /* @__PURE__ */ new Map(), E = (x) => {
      var _a2;
      for (const g of x) {
        if (g.type === "folder") {
          u += 1, ((_a2 = g.children) == null ? void 0 : _a2.length) && E(g.children);
          continue;
        }
        if (g.type !== "file") continue;
        a += 1;
        const S = typeof g.size == "number" && Number.isFinite(g.size), L = S ? g.size : 0;
        S ? L === 0 && (n += 1) : l += 1, p += L;
        const o = g.path || g.name;
        Ma(o) && (f += L, N += 1);
        const P = Fa(g.name), h = v.get(P) ?? {
          count: 0,
          size: 0,
          files: []
        };
        h.count += 1, h.size += L, h.files.push({
          path: o,
          name: g.name,
          size: S ? L : null,
          node: g
        }), v.set(P, h);
      }
    };
    E(s);
    const w = [
      ...v.entries()
    ].map(([x, { count: g, size: S, files: L }]) => ({
      ext: x,
      label: x === "(none)" ? "(\uD655\uC7A5\uC790 \uC5C6\uC74C)" : `.${x}`,
      count: g,
      size: S,
      percent: p > 0 ? S / p * 100 : 0,
      files: [
        ...L
      ].sort((o, P) => (P.size ?? -1) - (o.size ?? -1) || o.path.localeCompare(P.path))
    })).sort((x, g) => g.size - x.size || g.count - x.count || x.label.localeCompare(g.label)), A = [], m = (x, g, S) => {
      var _a2;
      const L = x.filter((o) => o.type === "folder").map((o) => ({
        node: o,
        size: er(o),
        fileCount: tr(o)
      })).sort((o, P) => P.size - o.size || o.node.name.localeCompare(P.node.name));
      for (const { node: o, size: P, fileCount: h } of L) {
        const i = o.path || `${o.name}/`, b = (o.children ?? []).some((I) => I.type === "folder");
        A.push({
          path: i,
          name: o.name,
          depth: g,
          parentPath: S,
          hasChildFolders: b,
          size: P,
          fileCount: h,
          percent: p > 0 ? P / p * 100 : 0
        }), ((_a2 = o.children) == null ? void 0 : _a2.length) && m(o.children, g + 1, i);
      }
    };
    return m(s, 0, null), {
      summary: {
        totalSize: p,
        fileCount: a,
        folderCount: u,
        zeroByteCount: n,
        unknownSizeCount: l,
        indexSize: f,
        indexFileCount: N
      },
      byExtension: w,
      folders: A
    };
  }
  function Ka(t) {
    return !t || typeof t != "string" ? "" : t.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
  }
  function Wa(t) {
    const s = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), a = [];
    (s ? t.metaKey : t.ctrlKey) && a.push("mod"), t.altKey && a.push("alt"), t.shiftKey && a.push("shift");
    const u = (t.key || "").toLowerCase();
    return !u || u === "shift" || u === "control" || u === "alt" || u === "meta" || (a.push(u), a.length <= 1) ? null : a.join("+");
  }
  function at(t) {
    if (!t || typeof t != "string") return "";
    const a = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "Cmd" : "Ctrl";
    return t.toLowerCase().replace(/\bmod\b/g, a).split("+").map((u) => u.trim().charAt(0).toUpperCase() + u.trim().slice(1)).join(" + ");
  }
  function Ua() {
    return {
      id: String(Date.now()) + "-" + Math.random().toString(36).slice(2),
      name: "",
      prefix: "",
      body: "",
      description: ""
    };
  }
  function Ga({ value: t, onChange: s, onSave: a, isSaving: u = false, isLoaded: n = true }) {
    const [l, p] = r.useState(() => t || {
      snippets: []
    }), [f, N] = r.useState(null), [v, E] = r.useState(null);
    r.useEffect(() => {
      p(t || {
        snippets: []
      });
    }, [
      t
    ]), r.useEffect(() => {
      if (!f) return;
      const h = (i) => {
        i.preventDefault(), i.stopPropagation();
        const b = Wa(i);
        b && E(b);
      };
      return window.addEventListener("keydown", h, true), () => window.removeEventListener("keydown", h, true);
    }, [
      f
    ]);
    const w = (h) => {
      const i = {
        snippets: h
      };
      p(i), s == null ? void 0 : s(i);
    }, A = () => {
      w([
        ...l.snippets || [],
        Ua()
      ]);
    }, m = (h, i, b) => {
      const I = (l.snippets || []).map((D) => D.id === h ? {
        ...D,
        [i]: b
      } : D);
      w(I);
    }, x = (h) => {
      const i = (l.snippets || []).filter((b) => b.id !== h);
      w(i);
    }, g = (h) => {
      N(h), E(null);
    }, S = () => {
      N(null), E(null);
    }, L = () => {
      !f || !v || (m(f, "prefix", v), S());
    }, o = () => {
      const i = (l.snippets || []).map((_) => {
        const T = (_.prefix || "").trim(), ee = Ka(T) || T;
        return {
          ..._,
          name: (_.name || "").trim(),
          prefix: ee,
          body: (_.body || "").replace(/\r\n/g, `
`),
          description: (_.description || "").trim()
        };
      });
      if (i.find((_) => !_.prefix || !_.body)) {
        alert("\uAC01 \uC2A4\uB2C8\uD3AB\uC5D0\uB294 \uB2E8\uCD95\uD0A4(shortcut)\uC640 body\uAC00 \uBAA8\uB450 \uD544\uC694\uD569\uB2C8\uB2E4.");
        return;
      }
      const I = /* @__PURE__ */ new Set();
      for (const _ of i) {
        if (I.has(_.prefix)) {
          alert(`\uC911\uBCF5\uB41C \uB2E8\uCD95\uD0A4 "${_.prefix}" \uC774(\uAC00) \uC788\uC2B5\uB2C8\uB2E4. \uAC01 \uB2E8\uCD95\uD0A4\uB294 \uACE0\uC720\uD574\uC57C \uD569\uB2C8\uB2E4.`);
          return;
        }
        I.add(_.prefix);
      }
      const D = {
        snippets: i
      };
      p(D), s == null ? void 0 : s(D), a == null ? void 0 : a(D);
    }, P = l.snippets || [];
    return e.jsxs("section", {
      className: "bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong space-y-4",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx("h3", {
              className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-1",
              children: "\uC2A4\uB2C8\uD3AB \uB2E8\uCD95\uD0A4 \uC124\uC815"
            }),
            e.jsxs("p", {
              className: "text-xs text-gray-600 dark:text-odp-muted",
              children: [
                "\uB2E8\uCD95\uD0A4\uB97C \uB204\uB974\uBA74 \uD574\uB2F9 \uCF54\uB4DC \uC870\uAC01(body)\uC774 \uC5D0\uB514\uD130\uC5D0 \uC0BD\uC785\uB429\uB2C8\uB2E4. \uB2E8\uCD95\uD0A4\uB294 \uC124\uC815\uC5D0\uC11C\uB9CC \uB4F1\uB85D\xB7\uC218\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                e.jsxs("span", {
                  className: "block mt-1",
                  children: [
                    e.jsx("strong", {
                      children: "mod"
                    }),
                    " = Windows\uC5D0\uC11C\uB294 Ctrl, Mac\uC5D0\uC11C\uB294 Cmd\uB85C \uC790\uB3D9 \uC778\uC2DD\uB429\uB2C8\uB2E4. \uC608: mod+shift+k, mod+shift+s",
                    e.jsxs("span", {
                      className: "block mt-1 text-amber-700 dark:text-amber-400",
                      children: [
                        e.jsx("code", {
                          className: "px-1 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]",
                          children: "mod+k"
                        }),
                        "\uB294 Advanced Search(\uC804\uC5ED \uAC80\uC0C9)\uC5D0 \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4."
                      ]
                    })
                  ]
                }),
                "\uC124\uC815\uC740",
                e.jsx("code", {
                  className: "px-1 mx-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]",
                  children: ".settings/snippets.json"
                }),
                "\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4."
              ]
            })
          ]
        }),
        e.jsxs("div", {
          className: "space-y-2",
          children: [
            !n && e.jsx("p", {
              className: "text-xs text-gray-500 dark:text-odp-muted",
              children: "\uC2A4\uB2C8\uD3AB \uC124\uC815\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4\u2026"
            }),
            n && P.length === 0 && e.jsx("p", {
              className: "text-xs text-gray-500 dark:text-odp-muted",
              children: '\uC544\uC9C1 \uB4F1\uB85D\uB41C \uC2A4\uB2C8\uD3AB\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC544\uB798 "\uC2A4\uB2C8\uD3AB \uCD94\uAC00" \uBC84\uD2BC\uC744 \uB20C\uB7EC \uC0C8 \uC2A4\uB2C8\uD3AB\uC744 \uB9CC\uB4E4\uC5B4 \uBCF4\uC138\uC694.'
            }),
            P.map((h) => e.jsxs("div", {
              className: "border border-gray-200 dark:border-odp-borderSoft rounded-md p-3 bg-white dark:bg-odp-bgSoft space-y-2",
              children: [
                e.jsxs("div", {
                  className: "flex flex-col sm:flex-row gap-2",
                  children: [
                    e.jsxs("div", {
                      className: "flex-1 min-w-0",
                      children: [
                        e.jsx("label", {
                          className: "block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-0.5",
                          children: "\uC774\uB984 (\uC120\uD0DD)"
                        }),
                        e.jsx("input", {
                          type: "text",
                          className: "w-full border rounded px-2 py-1 text-xs bg-white dark:bg-odp-bgSofter border-gray-300 dark:border-odp-borderStrong text-gray-800 dark:text-odp-fgStrong",
                          value: h.name || "",
                          onChange: (i) => m(h.id, "name", i.target.value),
                          placeholder: "\uC608: TODO \uBE14\uB85D"
                        })
                      ]
                    }),
                    e.jsxs("div", {
                      className: "w-full sm:w-48",
                      children: [
                        e.jsx("label", {
                          className: "block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-0.5",
                          children: "\uB2E8\uCD95\uD0A4"
                        }),
                        e.jsxs("div", {
                          className: "flex items-center gap-1.5",
                          children: [
                            e.jsx("span", {
                              className: "flex-1 min-w-0 border rounded px-2 py-1 text-xs bg-gray-50 dark:bg-odp-bgSofter border-gray-300 dark:border-odp-borderStrong text-gray-700 dark:text-odp-fgStrong truncate",
                              title: h.prefix ? at(h.prefix) : "",
                              children: h.prefix ? at(h.prefix) : "\uBBF8\uC124\uC815"
                            }),
                            e.jsx("button", {
                              type: "button",
                              className: "shrink-0 px-2 py-1 text-[11px] rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
                              onClick: () => g(h.id),
                              children: "\uD0A4 \uC785\uB825"
                            })
                          ]
                        })
                      ]
                    })
                  ]
                }),
                e.jsxs("div", {
                  children: [
                    e.jsx("label", {
                      className: "block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-0.5",
                      children: "body (\uC0BD\uC785\uB420 \uCF54\uB4DC \uC870\uAC01)"
                    }),
                    e.jsx("textarea", {
                      className: "w-full border rounded px-2 py-1 text-xs bg-white dark:bg-odp-bgSofter border-gray-300 dark:border-odp-borderStrong text-gray-800 dark:text-odp-fgStrong resize-y min-h-[60px]",
                      value: h.body || "",
                      onChange: (i) => m(h.id, "body", i.target.value),
                      placeholder: "\uC608: - [ ] ${1:\uC791\uC5C5 \uB0B4\uC6A9}"
                    })
                  ]
                }),
                e.jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [
                    e.jsxs("div", {
                      className: "flex-1",
                      children: [
                        e.jsx("label", {
                          className: "block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-0.5",
                          children: "\uC124\uBA85 (\uC120\uD0DD)"
                        }),
                        e.jsx("input", {
                          type: "text",
                          className: "w-full border rounded px-2 py-1 text-xs bg-white dark:bg-odp-bgSofter border-gray-300 dark:border-odp-borderStrong text-gray-800 dark:text-odp-fgStrong",
                          value: h.description || "",
                          onChange: (i) => m(h.id, "description", i.target.value),
                          placeholder: "\uC608: TODO \uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC2A4\uB2C8\uD3AB"
                        })
                      ]
                    }),
                    e.jsx("button", {
                      type: "button",
                      className: "mt-4 sm:mt-6 px-2 py-1 text-[11px] text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/40 rounded hover:bg-red-50 dark:hover:bg-red-900/20 whitespace-nowrap",
                      onClick: () => {
                        window.confirm("\uC774 \uC2A4\uB2C8\uD3AB\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?") && x(h.id);
                      },
                      children: "\uC0AD\uC81C"
                    })
                  ]
                })
              ]
            }, h.id))
          ]
        }),
        e.jsxs("div", {
          className: "flex items-center justify-between gap-2 pt-1",
          children: [
            e.jsx("button", {
              type: "button",
              onClick: A,
              className: "px-3 py-1.5 text-xs rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
              children: "\uC2A4\uB2C8\uD3AB \uCD94\uAC00"
            }),
            e.jsx("button", {
              type: "button",
              onClick: o,
              disabled: u,
              className: "px-3 py-1.5 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition",
              children: u ? "\uC800\uC7A5 \uC911..." : "\uC2A4\uB2C8\uD3AB JSON \uC800\uC7A5"
            })
          ]
        }),
        f != null && e.jsx("div", {
          className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "snippet-shortcut-modal-title",
          onClick: S,
          children: e.jsxs("div", {
            className: "bg-white dark:bg-odp-surface rounded-lg shadow-xl border border-gray-200 dark:border-odp-borderStrong p-5 w-full max-w-sm",
            onClick: (h) => h.stopPropagation(),
            onKeyDown: (h) => h.stopPropagation(),
            children: [
              e.jsx("h4", {
                id: "snippet-shortcut-modal-title",
                className: "text-sm font-bold text-gray-800 dark:text-odp-fgStrong mb-2",
                children: "\uB2E8\uCD95\uD0A4 \uC785\uB825"
              }),
              e.jsx("p", {
                className: "text-xs text-gray-600 dark:text-odp-muted mb-3",
                children: "\uC0AC\uC6A9\uD560 \uC870\uD569\uC744 \uD0A4\uBCF4\uB4DC\uB85C \uB20C\uB7EC\uC8FC\uC138\uC694. (Ctrl/Cmd + \uB2E4\uB978 \uD0A4 \uB4F1)"
              }),
              e.jsx("div", {
                className: "mb-4 py-3 px-3 rounded bg-gray-100 dark:bg-odp-bgSoft border border-gray-200 dark:border-odp-borderSoft min-h-10 flex items-center justify-center",
                children: v ? e.jsx("span", {
                  className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                  children: at(v)
                }) : e.jsx("span", {
                  className: "text-xs text-gray-500 dark:text-odp-muted",
                  children: "\uD0A4\uB97C \uB20C\uB7EC\uC8FC\uC138\uC694"
                })
              }),
              e.jsxs("div", {
                className: "flex justify-end gap-2",
                children: [
                  e.jsx("button", {
                    type: "button",
                    onClick: S,
                    className: "px-3 py-1.5 text-xs rounded border border-gray-300 dark:border-odp-borderStrong text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
                    children: "\uCDE8\uC18C"
                  }),
                  e.jsx("button", {
                    type: "button",
                    onClick: L,
                    disabled: !v,
                    className: "px-3 py-1.5 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition",
                    children: "\uD655\uC778"
                  })
                ]
              })
            ]
          })
        })
      ]
    });
  }
  function Va() {
    const [t, s] = r.useState([]), [a, u] = r.useState(false), [n, l] = r.useState(false), [p, f] = r.useState(null), [N, v] = r.useState(false), [E, w] = r.useState(null), [A, m] = r.useState(null), x = r.useCallback(async () => {
      f(null);
      try {
        const o = await yr();
        s(o.files), u(true);
      } catch (o) {
        f(o instanceof Error ? o.message : String(o)), u(true);
      }
    }, []);
    r.useEffect(() => {
      x();
    }, [
      x
    ]);
    const g = () => {
      w(null), v(true);
    }, S = (o) => {
      w(o), v(true);
    }, L = async () => {
      if (A) {
        l(true), f(null);
        try {
          const o = await Nr(A.id);
          s(o.files), m(null);
        } catch (o) {
          f(o instanceof Error ? o.message : String(o));
        } finally {
          l(false);
        }
      }
    };
    return e.jsxs("div", {
      id: "settings-webfonts",
      tabIndex: -1,
      className: "scroll-mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsx("h3", {
          className: "mb-1 text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
          children: "\uC6F9\uD3F0\uD2B8"
        }),
        e.jsxs("p", {
          className: "mb-3 text-xs leading-relaxed text-gray-600 dark:text-odp-muted",
          children: [
            "\uC6F9\uD3F0\uD2B8\uB294 vault\uC758",
            " ",
            e.jsx("code", {
              className: "rounded bg-gray-200/80 px-1 dark:bg-odp-bgSoft",
              children: ".settings/webfonts/"
            }),
            "\uC544\uB798 ",
            e.jsx("strong", {
              children: "\uAC1C\uBCC4 CSS \uD30C\uC77C"
            }),
            "\uB85C \uAD00\uB9AC\uB429\uB2C8\uB2E4. \uC571 \uAE30\uBCF8 \uAE00\uAF34(Paperozi \xB7 A2z \xB7 D2Coding \xB7 KoPub Dotum \xB7 KoPub Batang \xB7 JoseonShinmyeongjo)\uC740 \uBC88\uB4E4\uC5D0 \uD3EC\uD568\uB418\uC5B4 \uD56D\uC0C1 \uC0AC\uC6A9\uD560 \uC218 \uC788\uACE0, \uC0AC\uC6A9\uC790 \uC6F9\uD3F0\uD2B8\uB294 \uCD94\uAC00\xB7\uD3B8\uC9D1\xB7\uC0AD\uC81C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uD55C\uAE00 \uC6F9\uD3F0\uD2B8\uB294",
            " ",
            e.jsx("a", {
              href: "https://noonnu.cc/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
              children: "noonnu.cc"
            }),
            " ",
            "\uB610\uB294",
            " ",
            e.jsx("a", {
              href: "https://fonts.google.com/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
              children: "google fonts"
            }),
            "\uC5D0\uC11C \uCC3E\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
          ]
        }),
        p ? e.jsx("p", {
          className: "mb-2 text-xs text-red-600 dark:text-red-400",
          role: "alert",
          children: p
        }) : null,
        e.jsxs("div", {
          className: "mb-4",
          children: [
            e.jsx("div", {
              className: "mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-odp-muted",
              children: "\uC571 \uAE30\uBCF8 \uAE00\uAF34"
            }),
            e.jsx("ul", {
              className: "space-y-1.5",
              children: kr.map((o) => e.jsxs("li", {
                className: "flex items-center justify-between rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsx("div", {
                        className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                        style: {
                          fontFamily: o.name
                        },
                        children: o.name
                      }),
                      e.jsx("div", {
                        className: "text-[10px] text-gray-400 dark:text-odp-muted",
                        children: "\uBC88\uB4E4 \uB0B4\uC7A5 \xB7 \uC0AD\uC81C \uBD88\uAC00"
                      })
                    ]
                  }),
                  e.jsx("span", {
                    className: "rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600 dark:bg-odp-bg dark:text-odp-muted",
                    children: "built-in"
                  })
                ]
              }, o.id))
            })
          ]
        }),
        e.jsxs("div", {
          className: "mb-2 flex flex-wrap items-center gap-2",
          children: [
            e.jsx("div", {
              className: "text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-odp-muted",
              children: "\uC0AC\uC6A9\uC790 \uC6F9\uD3F0\uD2B8 \uD30C\uC77C"
            }),
            e.jsxs("div", {
              className: "ml-auto flex gap-2",
              children: [
                e.jsxs("button", {
                  type: "button",
                  disabled: !a || n,
                  onClick: g,
                  className: "inline-flex items-center gap-1 rounded bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
                  children: [
                    e.jsx(Ht, {
                      className: "h-3.5 w-3.5",
                      "aria-hidden": true
                    }),
                    "\uC6F9\uD3F0\uD2B8 \uCD94\uAC00"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: n,
                  onClick: () => {
                    x();
                  },
                  className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-fg dark:hover:bg-odp-focusBg",
                  children: [
                    e.jsx(Yt, {
                      className: "h-3.5 w-3.5",
                      "aria-hidden": true
                    }),
                    "\uC0C8\uB85C\uACE0\uCE68"
                  ]
                })
              ]
            })
          ]
        }),
        a ? t.length === 0 ? e.jsx("p", {
          className: "rounded border border-dashed border-gray-200 px-3 py-4 text-center text-xs text-gray-400 dark:border-odp-borderStrong dark:text-odp-muted",
          children: "\uC544\uC9C1 \uCD94\uAC00\uB41C \uC6F9\uD3F0\uD2B8 \uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \u300C\uC6F9\uD3F0\uD2B8 \uCD94\uAC00\u300D\uB85C CSS\uB97C \uC800\uC7A5\uD558\uC138\uC694."
        }) : e.jsx("ul", {
          className: "space-y-2",
          children: t.map((o) => {
            const P = jr(o.css);
            return e.jsxs("li", {
              className: "flex flex-wrap items-center gap-2 rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: [
                e.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    e.jsx("div", {
                      className: "truncate text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                      children: o.name
                    }),
                    e.jsxs("div", {
                      className: "truncate text-[10px] text-gray-400 dark:text-odp-muted",
                      children: [
                        o.filename,
                        P.length ? ` \xB7 ${P.join(", ")}` : ""
                      ]
                    }),
                    P.length > 0 ? e.jsx("ul", {
                      className: "mt-1 flex flex-wrap gap-1",
                      children: P.map((h) => e.jsx("li", {
                        className: "rounded-full border border-gray-100 bg-gray-50 px-1.5 py-0.5 text-[10px] dark:border-odp-border dark:bg-odp-bg",
                        style: {
                          fontFamily: h
                        },
                        children: h
                      }, h))
                    }) : null
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: n,
                  onClick: () => S(o),
                  className: "inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg",
                  children: [
                    e.jsx(Xt, {
                      className: "h-3 w-3",
                      "aria-hidden": true
                    }),
                    "\uD3B8\uC9D1"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: n,
                  onClick: () => m(o),
                  className: "inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40",
                  children: [
                    e.jsx(Ue, {
                      className: "h-3 w-3",
                      "aria-hidden": true
                    }),
                    "\uC0AD\uC81C"
                  ]
                })
              ]
            }, o.id);
          })
        }) : e.jsx("p", {
          className: "text-xs text-gray-500 dark:text-odp-muted",
          children: "\uBD88\uB7EC\uC624\uB294 \uC911\u2026"
        }),
        e.jsx(vr, {
          isOpen: N,
          initialFile: E,
          onClose: () => {
            v(false), w(null);
          },
          onSaved: () => {
            x();
          }
        }),
        e.jsx(ie, {
          isOpen: !!A,
          title: "\uC6F9\uD3F0\uD2B8 \uC0AD\uC81C",
          message: A ? `"${A.name}" (${A.filename}) \uD30C\uC77C\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694\uAE4C\uC694?` : "",
          confirmLabel: "\uC0AD\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: () => {
            L();
          },
          onCancel: () => m(null)
        })
      ]
    });
  }
  function Ha() {
    const [t, s] = r.useState([]), [a, u] = r.useState(false), [n, l] = r.useState(false), [p, f] = r.useState(null), [N, v] = r.useState(null), [E, w] = r.useState(false), A = r.useCallback(async () => {
      f(null);
      try {
        const x = await Sr();
        s(x.templates), u(true);
      } catch (x) {
        f(x instanceof Error ? x.message : String(x)), s(wr().templates), u(true);
      }
    }, []);
    r.useEffect(() => {
      A();
    }, [
      A
    ]);
    const m = async (x) => {
      l(true), f(null);
      try {
        await Cr({
          ...Er,
          templates: x
        }), s(x);
      } catch (g) {
        f(g instanceof Error ? g.message : String(g));
      } finally {
        l(false);
      }
    };
    return e.jsxs("div", {
      id: "settings-table-styles",
      tabIndex: -1,
      className: "scroll-mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsx("h3", {
          className: "mb-1 text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
          children: "\uD45C \uC2A4\uD0C0\uC77C \uD15C\uD50C\uB9BF"
        }),
        e.jsxs("p", {
          className: "mb-3 text-xs leading-relaxed text-gray-600 dark:text-odp-muted",
          children: [
            "haim-table \uAD6C\uC5ED/\uD589\xB7\uC5F4 \uADDC\uCE59 \uD15C\uD50C\uB9BF\uC785\uB2C8\uB2E4. vault\uC758",
            " ",
            e.jsx("code", {
              className: "rounded bg-gray-200/80 px-1 dark:bg-odp-bgSoft",
              children: ".settings/table-styles.yaml"
            }),
            "\uC5D0 \uB3D9\uAE30\uD654\uB429\uB2C8\uB2E4."
          ]
        }),
        p ? e.jsx("p", {
          className: "mb-2 text-xs text-red-600",
          children: p
        }) : null,
        e.jsxs("div", {
          className: "mb-3 flex gap-2",
          children: [
            e.jsx("button", {
              type: "button",
              disabled: !a || n,
              onClick: () => {
                const x = `template-${Date.now().toString(36)}`;
                v({
                  id: x,
                  name: "\uC0C8 \uD15C\uD50C\uB9BF",
                  sections: {},
                  rules: [
                    {
                      rows: "odd",
                      bg: "#f5f5f5"
                    }
                  ]
                }), w(true);
              },
              className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
              children: "\uC0C8 \uD15C\uD50C\uB9BF"
            }),
            e.jsx("button", {
              type: "button",
              disabled: n,
              onClick: () => {
                A();
              },
              className: "rounded bg-gray-100 px-3 py-1.5 text-xs dark:bg-odp-bgSoft",
              children: "\uC0C8\uB85C\uACE0\uCE68"
            })
          ]
        }),
        e.jsxs("ul", {
          className: "space-y-2",
          children: [
            t.map((x) => e.jsxs("li", {
              className: "flex items-center justify-between gap-2 rounded border border-gray-200 bg-white px-3 py-2 text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: [
                e.jsxs("div", {
                  className: "min-w-0",
                  children: [
                    e.jsx("div", {
                      className: "truncate font-medium text-gray-800 dark:text-odp-fg",
                      children: x.name
                    }),
                    e.jsx("div", {
                      className: "truncate text-[10px] text-gray-400",
                      children: x.id
                    })
                  ]
                }),
                e.jsxs("div", {
                  className: "flex shrink-0 gap-1",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      className: "rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-odp-surface",
                      onClick: () => {
                        v(x), w(true);
                      },
                      children: "\uD3B8\uC9D1"
                    }),
                    e.jsx("button", {
                      type: "button",
                      className: "rounded px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
                      onClick: () => {
                        m(t.filter((g) => g.id !== x.id));
                      },
                      children: "\uC0AD\uC81C"
                    })
                  ]
                })
              ]
            }, x.id)),
            a && t.length === 0 ? e.jsx("li", {
              className: "text-xs text-gray-400",
              children: "\uB4F1\uB85D\uB41C \uD15C\uD50C\uB9BF\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
            }) : null
          ]
        }),
        e.jsx(Aa, {
          isOpen: E,
          template: N,
          onClose: () => {
            w(false), v(null);
          },
          onSave: (x) => {
            const g = t.filter((S) => S.id !== (N == null ? void 0 : N.id) && S.id !== x.id);
            m([
              ...g,
              x
            ]).then(() => {
              w(false), v(null);
            });
          }
        })
      ]
    });
  }
  const Ya = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), Xa = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function We({ label: t, description: s, checked: a, onCheckedChange: u, ariaLabel: n }) {
    return e.jsxs("div", {
      className: "flex items-start justify-between gap-3",
      children: [
        e.jsxs("div", {
          className: "min-w-0",
          children: [
            e.jsx("div", {
              className: "text-xs font-semibold text-gray-700 dark:text-odp-fg",
              children: t
            }),
            e.jsx("p", {
              className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
              children: s
            })
          ]
        }),
        e.jsx(Qt, {
          className: Ya(a),
          checked: a,
          onCheckedChange: u,
          "aria-label": n,
          children: e.jsx(Zt, {
            className: Xa
          })
        })
      ]
    });
  }
  function Ja() {
    const [t, s] = r.useState(() => Nt());
    return r.useEffect(() => {
      const a = () => s(Nt());
      return a(), window.addEventListener(St, a), () => window.removeEventListener(St, a);
    }, []), e.jsxs("div", {
      id: "settings-cover",
      tabIndex: -1,
      className: "scroll-mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsx("h3", {
          className: "mb-1 text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
          children: "\uD45C\uC9C0 \uD3B8\uC9D1"
        }),
        e.jsxs("p", {
          className: "mb-3 text-xs leading-relaxed text-gray-600 dark:text-odp-muted",
          children: [
            "\uD45C\uC9C0 \uD3B8\uC9D1\uAE30\uC758 \uC2A4\uB0C5\xB7\uBBF8\uB9AC\uBCF4\uAE30 \uC635\uC158\uC785\uB2C8\uB2E4. Haim vault\uC758",
            " ",
            e.jsx("code", {
              className: "rounded bg-gray-200/80 px-1 dark:bg-odp-bgSoft",
              children: ".settings/cover.json"
            }),
            "\uC5D0 \uB3D9\uAE30\uD654\uB429\uB2C8\uB2E4."
          ]
        }),
        e.jsxs("div", {
          className: "space-y-4",
          children: [
            e.jsxs("div", {
              className: "space-y-2 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: [
                e.jsx(We, {
                  label: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5",
                  description: "\uB4DC\uB798\uADF8 \uC2DC \uD398\uC774\uC9C0 \uAC00\uB85C\xB7\uC138\uB85C \uC911\uC559\uC120\uC5D0 \uB9DE\uCDA4",
                  checked: t.centerSnapEnabled,
                  onCheckedChange: (a) => H("settings-cover-center-snap", a),
                  ariaLabel: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5"
                }),
                e.jsxs("label", {
                  className: "block space-y-1 pt-1",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-400",
                      children: "\uD5C8\uC6A9 \uC624\uCC28"
                    }),
                    e.jsx(Bt, {
                      unit: "css",
                      suffix: "px",
                      min: Ct,
                      max: wt,
                      step: 0.1,
                      value: t.centerSnapTolerancePx,
                      "aria-label": "\uAC00\uC6B4\uB370 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (a) => Ir(a)
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              className: "space-y-2 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: [
                e.jsx(We, {
                  label: "\uAC1C\uCCB4 \uC2A4\uB0C5",
                  description: "\uB2E4\uB978 \uAC1C\uCCB4\uC758 \uD14C\uB450\uB9AC\xB7\uAC00\uC6B4\uB370\uC120\uC5D0 \uB9DE\uCDA4 (\uADF8\uB8F9\uC740 \uD1B5\uC9F8\uB85C)",
                  checked: t.objectSnapEnabled,
                  onCheckedChange: (a) => H("settings-cover-object-snap", a),
                  ariaLabel: "\uAC1C\uCCB4 \uC2A4\uB0C5"
                }),
                e.jsxs("label", {
                  className: "block space-y-1 pt-1",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-400",
                      children: "\uD5C8\uC6A9 \uC624\uCC28"
                    }),
                    e.jsx(Bt, {
                      unit: "css",
                      suffix: "px",
                      min: Ct,
                      max: wt,
                      step: 0.1,
                      value: t.objectSnapTolerancePx,
                      "aria-label": "\uAC1C\uCCB4 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (a) => Or(a)
                    })
                  ]
                })
              ]
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(We, {
                label: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC",
                description: "\uC120\uD0DD\uACFC \uBB34\uAD00\uD558\uAC8C \uBAA8\uB4E0 \uD14D\uC2A4\uD2B8 \uC0C1\uC790\uB97C \uC605\uC740 \uBD89\uC740 \uC2E4\uC120\uC73C\uB85C \uD45C\uC2DC",
                checked: t.textContainerOutlineEnabled,
                onCheckedChange: (a) => H("settings-cover-text-outline", a),
                ariaLabel: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC"
              })
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(We, {
                label: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30",
                description: "\uD14D\uC2A4\uD2B8\xB7\uC774\uBBF8\uC9C0\xB7\uB3C4\uD615 \uC0BD\uC785 \uC2DC \uBC18\uD22C\uBA85 \uACE0\uC2A4\uD2B8 \uBBF8\uB9AC\uBCF4\uAE30",
                checked: t.placePreviewEnabled,
                onCheckedChange: (a) => H("settings-cover-place-preview", a),
                ariaLabel: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30"
              })
            }),
            e.jsxs("p", {
              className: "text-[11px] text-gray-500 dark:text-odp-muted",
              children: [
                "\uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28 \uAE30\uBCF8\uAC12 ",
                Ar,
                "px \xB7 0.1px \uB2E8\uC704"
              ]
            })
          ]
        })
      ]
    });
  }
  function qa() {
    const [t, s] = r.useState(""), [a, u] = r.useState(""), [n, l] = r.useState(null), [p, f] = r.useState(false);
    r.useEffect(() => {
      const m = () => {
        const g = _r();
        s(g), u(g);
      };
      m(), Lr().then((g) => {
        s(g.url), u(g.url);
      });
      const x = () => m();
      return window.addEventListener(Et, x), () => window.removeEventListener(Et, x);
    }, []);
    const N = It(t) !== a, v = It(t), E = !!String(t || "").trim() && !v, w = async () => {
      const m = String(t || "").trim();
      if (m && !v) {
        l("https:// \uB85C \uC2DC\uC791\uD558\uB294 Worker \uC8FC\uC18C\uB97C \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      f(true), l(null);
      try {
        const x = await Ot(m);
        s(x), u(x), l(x ? `\uC800\uC7A5\uB428 \u2014 ${Fe}\uC5D0 \uAE30\uB85D\uD588\uACE0, OG \uC694\uCCAD \uC2DC \uC774 Worker\uB97C \uAC00\uC7A5 \uBA3C\uC800 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.` : `Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${Fe}).`);
      } finally {
        f(false);
      }
    }, A = async () => {
      f(true), l(null);
      try {
        s("");
        const m = await Ot("");
        u(m), l(`Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${Fe}).`);
      } finally {
        f(false);
      }
    };
    return e.jsxs("div", {
      id: "settings-og",
      tabIndex: -1,
      className: "scroll-mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsx("h3", {
          className: "mb-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
          children: "Open Graph Worker"
        }),
        e.jsxs("p", {
          className: "mb-3 text-xs text-gray-600 dark:text-odp-muted",
          children: [
            "Cloudflare",
            " ",
            e.jsx("a", {
              href: "https://cloudflare-experiments.com/docs/experiments/social-preview-inspector",
              target: "_blank",
              rel: "noreferrer noopener",
              className: "text-blue-600 underline-offset-2 hover:underline dark:text-blue-400",
              children: "Social Preview Inspector"
            }),
            "\uB85C OG/Twitter \uBA54\uD0C0\uB97C \uAC00\uC838\uC635\uB2C8\uB2E4. \uC8FC\uC18C\uAC00 \uC788\uC73C\uBA74 Microlink\xB7\uD504\uB85D\uC2DC\xB7opengraph.to \uBCF4\uB2E4 \uBA3C\uC800 \uD638\uCD9C\uD569\uB2C8\uB2E4. Haim vault\uC758",
            " ",
            e.jsx("code", {
              className: "rounded bg-gray-100 px-1 text-[11px] dark:bg-odp-bgSoft",
              children: Fe
            }),
            "\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4. API:",
            " ",
            e.jsx("code", {
              className: "rounded bg-gray-100 px-1 text-[11px] dark:bg-odp-bgSoft",
              children: "GET /inspect?url=\u2026"
            })
          ]
        }),
        e.jsxs("div", {
          className: "mb-3",
          children: [
            e.jsx("a", {
              href: Pr,
              target: "_blank",
              rel: "noreferrer noopener",
              className: "inline-block",
              children: e.jsx("img", {
                src: Dr,
                alt: "Deploy to Cloudflare Workers",
                width: 184,
                height: 39,
                className: "h-[39px] w-[184px]"
              })
            }),
            e.jsxs("p", {
              className: "mt-1.5 text-[11px] text-gray-500 dark:text-odp-muted",
              children: [
                "Deploy \uD6C4 \uB098\uC628",
                " ",
                e.jsx("code", {
                  className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft",
                  children: "*.workers.dev"
                }),
                " ",
                "\uC8FC\uC18C\uB97C \uC544\uB798\uC5D0 \uBD99\uC5EC \uB123\uC73C\uC138\uC694."
              ]
            })
          ]
        }),
        e.jsx("label", {
          className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
          children: "Worker \uC8FC\uC18C"
        }),
        e.jsx("input", {
          type: "url",
          inputMode: "url",
          autoComplete: "off",
          spellCheck: false,
          placeholder: "https://your-worker.workers.dev",
          className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fgStrong",
          value: t,
          disabled: p,
          onChange: (m) => {
            s(m.target.value), l(null);
          },
          onKeyDown: (m) => {
            m.key === "Enter" && (m.preventDefault(), w());
          }
        }),
        E ? e.jsx("p", {
          className: "mt-1 text-[11px] text-red-600 dark:text-red-400",
          children: "https:// \uB610\uB294 http:// \uB85C \uC2DC\uC791\uD558\uB294 \uC720\uD6A8\uD55C URL\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4."
        }) : null,
        e.jsxs("div", {
          className: "mt-3 flex flex-wrap items-center gap-2",
          children: [
            e.jsx("button", {
              type: "button",
              onClick: () => {
                w();
              },
              disabled: p || !N && !E,
              className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
              children: p ? "\uC800\uC7A5 \uC911\u2026" : "\uC800\uC7A5"
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => {
                A();
              },
              disabled: p || !a && !t,
              className: "rounded px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-odp-muted dark:hover:bg-odp-focusBg",
              children: "\uC9C0\uC6B0\uAE30"
            }),
            a ? e.jsxs("span", {
              className: "truncate text-[11px] text-emerald-600 dark:text-emerald-400",
              children: [
                "\uC0AC\uC6A9 \uC911: ",
                a
              ]
            }) : e.jsx("span", {
              className: "text-[11px] text-gray-500 dark:text-odp-muted",
              children: "\uBBF8\uC124\uC815 (\uACF5\uC6A9 \uD3F4\uBC31\uB9CC \uC0AC\uC6A9)"
            })
          ]
        }),
        n ? e.jsx("p", {
          className: "mt-2 text-[11px] text-gray-600 dark:text-odp-muted",
          children: n
        }) : null
      ]
    });
  }
  const Kt = "size-3.5 rounded-full border border-gray-400 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft", Wt = "relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white";
  function Qa(t) {
    return t === xe ? "Google Gemini" : "OpenAI \uD638\uD658";
  }
  function Za() {
    return {
      id: Rr(),
      name: "",
      kind: ae,
      baseUrl: "",
      keyInput: "",
      hasStoredKey: false
    };
  }
  function es(t) {
    return {
      id: t.id,
      name: t.name,
      kind: t.kind,
      baseUrl: t.baseUrl,
      keyInput: "",
      hasStoredKey: !!t.apiKey.trim()
    };
  }
  function ts({ profiles: t, onSaveProfiles: s }) {
    const [a, u] = r.useState(true), [n, l] = r.useState(null), [p, f] = r.useState(null), [N, v] = r.useState(null), [E, w] = r.useState(0), [A, m] = r.useState(""), x = r.useMemo(() => p ? t.find((i) => i.id === p) ?? null : null, [
      p,
      t
    ]);
    r.useEffect(() => {
      if (!n) {
        m("");
        return;
      }
      m(Tr(n.id, n.kind) || At(n.kind));
    }, [
      n == null ? void 0 : n.id,
      n == null ? void 0 : n.kind
    ]);
    const g = r.useCallback((i) => {
      n && (m(i), Lt(n.id, i));
    }, [
      n
    ]), S = () => {
      f(null), l(Za());
    }, L = (i) => {
      f(i.id), l(es(i));
    }, o = () => {
      l(null), f(null);
    }, P = () => {
      if (!n) return;
      const i = zr({
        name: n.name,
        kind: n.kind,
        baseUrl: n.baseUrl,
        apiKey: n.keyInput,
        hasStoredKey: n.hasStoredKey
      });
      if (i) {
        alert(i);
        return;
      }
      const b = n.keyInput.trim() || ((x == null ? void 0 : x.id) === n.id ? x.apiKey : ""), I = {
        id: n.id,
        name: n.name.trim(),
        kind: n.kind,
        baseUrl: n.kind === ae ? Pt(n.baseUrl) : "",
        apiKey: b
      }, _ = t.some((T) => T.id === I.id) ? t.map((T) => T.id === I.id ? I : T) : [
        ...t,
        I
      ];
      s(_), o();
    }, h = () => {
      if (!N) return;
      const i = t.filter((b) => b.id !== N.id);
      s(i), (n == null ? void 0 : n.id) === N.id && o(), v(null);
    };
    return e.jsxs("div", {
      id: "settings-llm-providers",
      tabIndex: -1,
      className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: () => u((i) => !i),
          className: "flex w-full items-center gap-2 text-left",
          "aria-expanded": a,
          children: [
            a ? e.jsx(oe, {
              size: 16,
              className: "shrink-0 text-gray-500 dark:text-odp-muted"
            }) : e.jsx(le, {
              size: 16,
              className: "shrink-0 text-gray-500 dark:text-odp-muted"
            }),
            e.jsx("h3", {
              className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
              children: "AI \uB3C4\uC6B0\uBBF8 \uC81C\uACF5\uC790"
            })
          ]
        }),
        a ? e.jsxs(e.Fragment, {
          children: [
            e.jsxs("p", {
              className: "text-xs text-gray-600 dark:text-odp-muted",
              children: [
                "Gemini\uC640 OpenAI \uD638\uD658 endpoint\uB97C \uC5EC\uB7EC \uAC1C \uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC2E4\uC81C \uC0AC\uC6A9\uD560 \uC81C\uACF5\uC790\uB294 \uC5D0\uB514\uD130 AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uACE0\uB985\uB2C8\uB2E4. API \uD0A4\uB294 \uC5F0\uACB0 \uC815\uBCF4\uC640 \uD568\uAED8 \uC554\uD638\uD654\uB418\uBA70, \uC774 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uD45C\uC2DC\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uC6F9\uC5D0\uC11C\uB294 Gemini \uC694\uCCAD\uC774 Google AI Studio(",
                e.jsx("code", {
                  className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft",
                  children: "generativelanguage.googleapis.com"
                }),
                ")\uB85C \uC9C1\uC811 \uC804\uC1A1\uB429\uB2C8\uB2E4. Tauri \uC571\uC740 \uB124\uC774\uD2F0\uBE0C HTTP\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. OpenAI \uD638\uD658 endpoint\uB294 CORS\uAC00 \uD5C8\uC6A9\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4."
              ]
            }),
            t.length === 0 ? e.jsx("p", {
              className: "text-xs text-gray-500 dark:text-odp-muted",
              children: "\uC800\uC7A5\uB41C \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC544\uB798 \uBC84\uD2BC\uC73C\uB85C \uCD94\uAC00\uD558\uC138\uC694."
            }) : e.jsx("ul", {
              className: "space-y-1.5",
              children: t.map((i) => e.jsxs("li", {
                className: "flex items-center justify-between gap-2 rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: [
                  e.jsxs("div", {
                    className: "min-w-0",
                    children: [
                      e.jsx("div", {
                        className: "truncate text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                        children: i.name
                      }),
                      e.jsxs("div", {
                        className: "truncate text-[11px] text-gray-500 dark:text-odp-muted",
                        children: [
                          Qa(i.kind),
                          i.kind === ae && i.baseUrl ? ` \xB7 ${i.baseUrl}` : ""
                        ]
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "flex shrink-0 items-center gap-1",
                    children: [
                      e.jsxs("button", {
                        type: "button",
                        onClick: () => L(i),
                        className: "inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg",
                        children: [
                          e.jsx(Xt, {
                            className: "h-3 w-3",
                            "aria-hidden": true
                          }),
                          "\uD3B8\uC9D1"
                        ]
                      }),
                      e.jsxs("button", {
                        type: "button",
                        onClick: () => v(i),
                        className: "inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40",
                        children: [
                          e.jsx(Ue, {
                            className: "h-3 w-3",
                            "aria-hidden": true
                          }),
                          "\uC0AD\uC81C"
                        ]
                      })
                    ]
                  })
                ]
              }, i.id))
            }),
            n ? e.jsxs("div", {
              className: "space-y-3 rounded border border-gray-200 bg-white p-3 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: [
                e.jsx("p", {
                  className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong",
                  children: p ? "\uC81C\uACF5\uC790 \uD3B8\uC9D1" : "\uC81C\uACF5\uC790 \uCD94\uAC00"
                }),
                e.jsxs("div", {
                  children: [
                    e.jsx("label", {
                      className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                      children: "\uC774\uB984"
                    }),
                    e.jsx("input", {
                      type: "text",
                      autoComplete: "off",
                      className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bg",
                      value: n.name,
                      onChange: (i) => l((b) => b && {
                        ...b,
                        name: i.target.value
                      }),
                      placeholder: "\uC608: OpenRouter, \uB85C\uCEEC Ollama"
                    })
                  ]
                }),
                e.jsxs("div", {
                  children: [
                    e.jsx("p", {
                      className: "mb-1.5 text-xs font-semibold text-gray-600 dark:text-odp-muted",
                      children: "\uC885\uB958"
                    }),
                    e.jsxs(ue, {
                      className: "flex flex-wrap items-center gap-4",
                      value: n.kind,
                      onValueChange: (i) => {
                        if (i !== xe && i !== ae) return;
                        const b = i, I = At(b);
                        l((D) => D && (Lt(D.id, I), {
                          ...D,
                          kind: b,
                          keyInput: "",
                          hasStoredKey: (x == null ? void 0 : x.kind) === b && !!x.apiKey.trim()
                        })), m(I), w((D) => D + 1);
                      },
                      "aria-label": "\uC81C\uACF5\uC790 \uC885\uB958",
                      children: [
                        e.jsxs("label", {
                          className: "flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg",
                          children: [
                            e.jsx(se, {
                              value: xe,
                              className: Kt,
                              children: e.jsx(ve, {
                                className: Wt
                              })
                            }),
                            e.jsx("span", {
                              children: "Google Gemini"
                            })
                          ]
                        }),
                        e.jsxs("label", {
                          className: "flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg",
                          children: [
                            e.jsx(se, {
                              value: ae,
                              className: Kt,
                              children: e.jsx(ve, {
                                className: Wt
                              })
                            }),
                            e.jsx("span", {
                              children: "OpenAI \uD638\uD658"
                            })
                          ]
                        })
                      ]
                    })
                  ]
                }),
                n.kind === ae ? e.jsxs("div", {
                  children: [
                    e.jsx("label", {
                      className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                      children: "Endpoint URL"
                    }),
                    e.jsx("input", {
                      type: "text",
                      autoComplete: "off",
                      className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bg",
                      value: n.baseUrl,
                      onChange: (i) => l((b) => b && {
                        ...b,
                        baseUrl: i.target.value
                      }),
                      placeholder: "https://api.openai.com/v1"
                    }),
                    e.jsx("p", {
                      className: "mt-1.5 text-[11px] text-gray-500 dark:text-odp-muted",
                      children: "\uC608: https://api.openai.com/v1 , https://openrouter.ai/api/v1 , http://localhost:11434/v1"
                    })
                  ]
                }) : null,
                e.jsxs("div", {
                  children: [
                    e.jsxs("label", {
                      className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                      children: [
                        "API Key",
                        n.kind === ae ? " (\uC120\uD0DD)" : ""
                      ]
                    }),
                    e.jsx("input", {
                      type: "password",
                      autoComplete: "off",
                      className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bg",
                      value: n.keyInput,
                      onChange: (i) => l((b) => b && {
                        ...b,
                        keyInput: i.target.value
                      }),
                      placeholder: n.hasStoredKey ? "\uC800\uC7A5\uB428 \u2014 \uBCC0\uACBD \uC2DC \uC0C8 \uD0A4 \uC785\uB825" : n.kind === xe ? "AI Studio API \uD0A4 \uC785\uB825" : "Bearer \uD1A0\uD070 (\uB85C\uCEEC \uC11C\uBC84\uB294 \uBE44\uC6CC \uB450\uC138\uC694)"
                    })
                  ]
                }),
                e.jsxs("div", {
                  children: [
                    e.jsx("label", {
                      className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                      children: "\uAE30\uBCF8 \uBAA8\uB378"
                    }),
                    n.kind === xe ? e.jsx(Ra, {
                      getGeminiApiKey: () => n.keyInput.trim() || ((x == null ? void 0 : x.kind) === xe ? x.apiKey : ""),
                      profileId: n.id,
                      value: A,
                      onChange: g,
                      autoLoad: n.hasStoredKey || !!n.keyInput.trim()
                    }, `${n.id}-${E}`) : e.jsx($a, {
                      getBaseUrl: () => n.baseUrl,
                      getApiKey: () => n.keyInput.trim() || ((x == null ? void 0 : x.kind) === ae ? x.apiKey : ""),
                      value: A,
                      onChange: g,
                      autoLoad: !!Pt(n.baseUrl)
                    }, `${n.id}-${E}`)
                  ]
                }),
                e.jsxs("div", {
                  className: "flex justify-end gap-2 pt-1",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: o,
                      className: "rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                      children: "\uCDE8\uC18C"
                    }),
                    e.jsx("button", {
                      type: "button",
                      onClick: P,
                      className: "rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700",
                      children: "\uC81C\uACF5\uC790 \uC800\uC7A5"
                    })
                  ]
                })
              ]
            }) : e.jsxs("button", {
              type: "button",
              onClick: S,
              className: "inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs hover:bg-gray-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:hover:bg-odp-focusBg",
              children: [
                e.jsx(Ht, {
                  className: "h-3.5 w-3.5",
                  "aria-hidden": true
                }),
                "\uC81C\uACF5\uC790 \uCD94\uAC00"
              ]
            })
          ]
        }) : e.jsxs("p", {
          className: "text-xs text-gray-500 dark:text-odp-muted",
          children: [
            t.length,
            "\uAC1C \uC800\uC7A5\uB428"
          ]
        }),
        e.jsx(ie, {
          isOpen: !!N,
          title: "\uC81C\uACF5\uC790 \uC0AD\uC81C",
          message: N ? `"${N.name}" \uC81C\uACF5\uC790\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694?` : "",
          confirmLabel: "\uC0AD\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: h,
          onCancel: () => v(null)
        })
      ]
    });
  }
  function rs({ open: t, extension: s, onOpenChange: a, onOpenFile: u }) {
    const n = (s == null ? void 0 : s.files) ?? [], l = s ? `${s.label} \uD30C\uC77C` : "\uD30C\uC77C \uBAA9\uB85D";
    return e.jsx(La, {
      open: t,
      onOpenChange: a,
      children: e.jsxs(Pa, {
        children: [
          e.jsx(Da, {
            className: "fixed inset-0 z-100000 bg-black/40"
          }),
          e.jsxs(_a, {
            className: "fixed top-1/2 left-1/2 z-100001 flex max-h-[min(90vh,40rem)] w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft",
            "aria-describedby": void 0,
            children: [
              e.jsxs("div", {
                className: "flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-odp-borderStrong",
                children: [
                  e.jsxs("div", {
                    className: "min-w-0",
                    children: [
                      e.jsx(Ta, {
                        className: "truncate text-sm font-semibold text-gray-800 dark:text-odp-fgStrong",
                        children: l
                      }),
                      s ? e.jsxs("p", {
                        className: "mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted",
                        children: [
                          s.count.toLocaleString(),
                          "\uAC1C \xB7 ",
                          Z(s.size)
                        ]
                      }) : null
                    ]
                  }),
                  e.jsx(za, {
                    asChild: true,
                    children: e.jsx("button", {
                      type: "button",
                      className: "inline-flex shrink-0 items-center justify-center rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-odp-focusBg dark:hover:text-odp-fg",
                      "aria-label": "\uB2EB\uAE30",
                      children: e.jsx(Jt, {
                        size: 16
                      })
                    })
                  })
                ]
              }),
              e.jsx("div", {
                className: "min-h-0 flex-1 overflow-y-auto",
                children: n.length === 0 ? e.jsx("p", {
                  className: "px-4 py-8 text-center text-xs text-gray-500 dark:text-odp-muted",
                  children: "\uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
                }) : e.jsx("ul", {
                  className: "divide-y divide-gray-100 dark:divide-odp-borderSoft",
                  children: n.map((p) => e.jsx("li", {
                    children: e.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        u(p);
                      },
                      className: "flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition hover:bg-gray-50 dark:hover:bg-odp-focusBg/40",
                      children: [
                        e.jsx(Ea, {
                          size: 14,
                          className: "shrink-0 text-gray-400 dark:text-odp-muted",
                          "aria-hidden": true
                        }),
                        e.jsxs("span", {
                          className: "min-w-0 flex-1",
                          children: [
                            e.jsx("span", {
                              className: "block truncate text-xs font-medium text-gray-800 dark:text-odp-fgStrong",
                              children: p.name
                            }),
                            e.jsx("span", {
                              className: "mt-0.5 block truncate font-mono text-[10px] text-gray-500 dark:text-odp-muted",
                              title: p.path,
                              children: p.path
                            })
                          ]
                        }),
                        e.jsx("span", {
                          className: "shrink-0 tabular-nums text-[11px] text-gray-600 dark:text-odp-muted",
                          children: Z(p.size)
                        })
                      ]
                    })
                  }, p.path))
                })
              })
            ]
          })
        ]
      })
    });
  }
  const as = 160;
  function ss(t) {
    return t === "error" ? "text-red-600 dark:text-red-400" : t === "warn" ? "text-amber-700 dark:text-amber-300" : t === "ok" ? "text-emerald-700 dark:text-emerald-300" : "text-gray-600 dark:text-odp-muted";
  }
  function rr({ logs: t, building: s = false, progress: a = null, className: u = "" }) {
    const n = r.useRef(null);
    return r.useEffect(() => {
      var _a2;
      t.length !== 0 && ((_a2 = n.current) == null ? void 0 : _a2.scrollToIndex(t.length - 1, {
        align: "end"
      }));
    }, [
      t,
      s
    ]), !s && t.length === 0 ? null : e.jsxs("div", {
      className: `overflow-hidden rounded-md border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft ${u}`,
      children: [
        e.jsxs("div", {
          className: "flex items-center justify-between gap-2 border-b border-gray-100 px-2.5 py-1.5 dark:border-odp-borderSoft",
          children: [
            e.jsxs("span", {
              className: "text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong",
              children: [
                "\uC0C9\uC778 \uB85C\uADF8",
                s ? " (\uC2E4\uC2DC\uAC04)" : ""
              ]
            }),
            s && typeof a == "number" ? e.jsxs("span", {
              className: "text-[10px] tabular-nums text-amber-700 dark:text-amber-300",
              children: [
                Math.round(a * 100),
                "%"
              ]
            }) : null
          ]
        }),
        s && typeof a == "number" ? e.jsx("div", {
          className: "h-0.5 w-full bg-gray-100 dark:bg-odp-bg",
          children: e.jsx("div", {
            className: "h-full bg-blue-500 transition-[width] duration-200 ease-out dark:bg-blue-400",
            style: {
              width: `${Math.min(100, Math.max(0, a * 100))}%`
            }
          })
        }) : null,
        t.length === 0 ? e.jsx("p", {
          className: "px-2.5 py-1.5 font-mono text-[10px] text-gray-400 dark:text-odp-muted",
          children: "\uB300\uAE30 \uC911\u2026"
        }) : e.jsx($r, {
          ref: n,
          className: "overscroll-contain px-2.5 py-1.5 font-mono text-[10px] leading-relaxed",
          style: {
            height: as
          },
          data: t,
          "aria-live": "polite",
          "aria-relevant": "additions",
          children: (l) => e.jsxs("div", {
            className: `whitespace-pre-wrap break-all ${ss(l.level)}`,
            children: [
              e.jsx("span", {
                className: "text-gray-400 dark:text-odp-muted",
                children: ds(l.at)
              }),
              " ",
              l.message
            ]
          }, l.id)
        })
      ]
    });
  }
  function ds(t) {
    try {
      return new Date(t).toLocaleTimeString(void 0, {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    } catch {
      return "";
    }
  }
  function ar({ isOpen: t, info: s, onResume: a, onStartFresh: u, onCancel: n }) {
    const l = (s == null ? void 0 : s.processedFileCount) ?? 0, p = (s == null ? void 0 : s.processedChatCount) ?? 0, f = l + p, N = (s == null ? void 0 : s.updatedAt) && s.updatedAt > 0 ? new Date(s.updatedAt).toLocaleString() : null;
    return e.jsx(ie, {
      isOpen: t,
      title: "\uC911\uC9C0\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8",
      message: f > 0 ? `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778\uC774 \uC788\uC2B5\uB2C8\uB2E4.
\uCC98\uB9AC\uB428: \uD30C\uC77C ${l} \xB7 \uCC44\uD305 day ${p}${N ? `
\uC800\uC7A5 \uC2DC\uAC01: ${N}` : ""}

\uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAE4C\uC694, \uC544\uB2C8\uBA74 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uB9CC\uB4E4\uAE4C\uC694?` : `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4.
\uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAE4C\uC694, \uC544\uB2C8\uBA74 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uB9CC\uB4E4\uAE4C\uC694?`,
      confirmLabel: "\uC774\uC5B4\uC11C \uC0C9\uC778",
      discardLabel: "\uCC98\uC74C\uBD80\uD130",
      cancelLabel: "\uCDE8\uC18C",
      onConfirm: a,
      onDiscard: u,
      onCancel: n
    });
  }
  const ke = [
    {
      t: 0,
      rgb: [
        187,
        247,
        208
      ]
    },
    {
      t: 1,
      rgb: [
        255,
        0,
        0
      ]
    }
  ], ns = `linear-gradient(90deg, ${ke.map((t) => `rgb(${t.rgb.join(" ")}) ${(t.t * 100).toFixed(2)}%`).join(", ")})`;
  function Ut(t) {
    return Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : 0;
  }
  function st(t, s, a) {
    return Math.round(t + (s - t) * a);
  }
  function os(t) {
    const s = Ut(t / 100);
    let a = 0;
    for (; a < ke.length - 2 && s > ke[a + 1].t; ) a += 1;
    const u = ke[a], n = ke[a + 1], l = n.t - u.t || 1, p = Ut((s - u.t) / l), f = st(u.rgb[0], n.rgb[0], p), N = st(u.rgb[1], n.rgb[1], p), v = st(u.rgb[2], n.rgb[2], p);
    return `rgb(${f} ${N} ${v})`;
  }
  function Gt({ percent: t }) {
    const s = os(t);
    return e.jsxs("span", {
      className: "inline-flex items-center justify-end gap-1.5",
      children: [
        e.jsx("span", {
          className: "inline-block size-2.5 shrink-0 rounded-full border border-gray-300/80 shadow-sm dark:border-odp-borderStrong",
          style: {
            backgroundColor: s
          },
          title: `\uBE44\uC728 ${t.toFixed(1)}%`,
          "aria-hidden": true
        }),
        e.jsxs("span", {
          children: [
            t.toFixed(1),
            "%"
          ]
        })
      ]
    });
  }
  function ls() {
    return e.jsxs("div", {
      className: "space-y-0.5",
      "aria-label": "\uC6A9\uB7C9 \uBE44\uC728 \uC0C9\uC0C1 \uBC94\uB840",
      children: [
        e.jsx("div", {
          className: "h-1.5 w-full rounded-full border border-gray-200 dark:border-odp-borderStrong",
          style: {
            backgroundImage: ns
          }
        }),
        e.jsxs("div", {
          className: "flex justify-between text-[9px] leading-none text-gray-500 dark:text-odp-muted",
          children: [
            e.jsx("span", {
              children: "\uB0AE\uC74C"
            }),
            e.jsx("span", {
              children: "\uB192\uC74C"
            })
          ]
        })
      ]
    });
  }
  function is(t) {
    return t === be ? "Local Haim" : t === je ? "WebDAV Haim" : t === ne ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function cs() {
    return e.jsx("div", {
      className: "flex h-40 min-h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-white text-xs text-gray-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted md:h-full md:min-h-48",
      children: "\uADF8\uB798\uD504 \uC900\uBE44\uC911"
    });
  }
  function xs({ depth: t, expandable: s, expanded: a, label: u }) {
    return e.jsxs("span", {
      className: "inline-flex min-w-0 items-center gap-0.5 font-mono text-[11px]",
      children: [
        e.jsx("span", {
          className: "inline-block shrink-0",
          style: {
            width: `${t * 12}px`
          },
          "aria-hidden": true
        }),
        s ? e.jsx("span", {
          className: "inline-flex size-4 shrink-0 items-center justify-center text-gray-500 dark:text-odp-muted",
          "aria-hidden": true,
          children: a ? e.jsx(oe, {
            size: 14
          }) : e.jsx(le, {
            size: 14
          })
        }) : e.jsx("span", {
          className: "inline-block size-4 shrink-0",
          "aria-hidden": true
        }),
        e.jsx("span", {
          className: "min-w-0 truncate",
          children: u
        })
      ]
    });
  }
  function dt({ columns: t, rows: s, emptyText: a = "\uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", maxHeightClass: u = "max-h-64", legendColumnKey: n = null }) {
    return e.jsx("div", {
      className: `${u} overflow-auto rounded-md border border-gray-200 dark:border-odp-borderStrong`,
      children: e.jsxs("table", {
        className: "min-w-full border-separate border-spacing-0 text-left text-xs",
        children: [
          e.jsx("thead", {
            className: "text-gray-600 dark:text-odp-muted",
            children: e.jsx("tr", {
              children: t.map((l) => e.jsx("th", {
                className: `sticky top-0 z-10 border-b border-gray-200 bg-gray-100 px-3 py-2 font-semibold whitespace-nowrap dark:border-odp-borderStrong dark:bg-odp-bgSoft ${l.align === "right" ? "text-right" : "text-left"} ${l.className ?? ""}`,
                children: l.header
              }, l.key))
            })
          }),
          e.jsx("tbody", {
            className: "bg-white dark:bg-odp-bgSofter",
            children: s.length === 0 ? e.jsx("tr", {
              children: e.jsx("td", {
                colSpan: t.length,
                className: "px-3 py-6 text-center text-gray-500 dark:text-odp-muted",
                children: a
              })
            }) : s.map((l, p) => {
              var _a2, _b, _c, _d;
              const f = typeof l._onClick == "function", N = ((_a2 = l._tree) == null ? void 0 : _a2.expandable) ? l._tree.expanded : void 0, v = (_c = (_b = s[p - 1]) == null ? void 0 : _b._tree) == null ? void 0 : _c.depth, E = (_d = l._tree) == null ? void 0 : _d.depth, w = p > 0 && typeof v == "number" && typeof E == "number" && E < v, A = (m) => {
                var _a3;
                f && (m.key !== "Enter" && m.key !== " " || (m.preventDefault(), (_a3 = l._onClick) == null ? void 0 : _a3.call(l)));
              };
              return e.jsx("tr", {
                onClick: f ? l._onClick : void 0,
                onKeyDown: A,
                tabIndex: f ? 0 : void 0,
                "aria-expanded": N,
                className: `hover:bg-gray-50 dark:hover:bg-odp-focusBg/40 ${f ? "cursor-pointer" : ""}`,
                children: t.map((m) => {
                  const x = m.tree ? l._tree : void 0;
                  return e.jsx("td", {
                    className: `px-3 py-1.5 text-gray-700 dark:text-odp-fg ${w ? "border-t-2 border-gray-300 dark:border-odp-borderStrong" : "border-t border-gray-100 dark:border-odp-borderSoft"} ${m.align === "right" ? "text-right tabular-nums" : ""} ${m.className ?? ""}`,
                    children: x ? e.jsx(xs, {
                      depth: x.depth,
                      expandable: x.expandable,
                      expanded: x.expanded,
                      label: x.label
                    }) : l[m.key]
                  }, m.key);
                })
              }, l._key ?? p);
            })
          }),
          n ? e.jsx("tfoot", {
            children: e.jsx("tr", {
              children: t.map((l) => e.jsx("td", {
                className: "sticky bottom-0 border-t border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: l.key === n ? e.jsx(ls, {}) : null
              }, l.key))
            })
          }) : null
        ]
      })
    });
  }
  function bs(t, s) {
    const a = /* @__PURE__ */ new Set(), u = [];
    for (const n of t) (n.parentPath == null || a.has(n.parentPath) && s.has(n.parentPath)) && (u.push(n), a.add(n.path));
    return u;
  }
  function nt({ title: t, open: s, onToggle: a, children: u }) {
    return e.jsxs("div", {
      className: "rounded-md border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-bgSoft",
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: a,
          "aria-expanded": s,
          className: "flex w-full items-center gap-1.5 px-3 py-2 text-left text-xs font-bold text-gray-700 transition hover:bg-gray-50 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg/40",
          children: [
            s ? e.jsx(oe, {
              size: 14,
              className: "shrink-0 text-gray-500"
            }) : e.jsx(le, {
              size: 14,
              className: "shrink-0 text-gray-500"
            }),
            e.jsx("span", {
              children: t
            })
          ]
        }),
        s ? e.jsxs("div", {
          className: "grid grid-cols-1 gap-3 border-t border-gray-200 p-3 dark:border-odp-borderStrong md:grid-cols-[minmax(10rem,14rem)_minmax(0,1fr)] md:items-stretch",
          children: [
            e.jsx("div", {
              className: "min-w-0",
              children: e.jsx(cs, {})
            }),
            e.jsx("div", {
              className: "min-w-0",
              children: u
            })
          ]
        }) : null
      ]
    });
  }
  function us({ storageMode: t = ne, onScanTree: s, canScan: a = true, onOpenFile: u }) {
    const [n, l] = r.useState(false), [p, f] = r.useState(null), [N, v] = r.useState(null), [E, w] = r.useState(() => /* @__PURE__ */ new Set()), [A, m] = r.useState(null), [x, g] = r.useState({
      summary: true,
      extension: false,
      folder: false
    }), [S, L] = r.useState(false), [o, P] = r.useState(() => F.getStatus()), [h, i] = r.useState(false), [b, I] = r.useState(null), [D, _] = r.useState(false);
    r.useEffect(() => F.subscribe(() => {
      P(F.getStatus());
    }), []), r.useEffect(() => {
      F.refreshCheckpointStatus();
    }, []), r.useEffect(() => {
      v(null), f(null), w(/* @__PURE__ */ new Set()), m(null), g({
        summary: true,
        extension: false,
        folder: false
      });
    }, [
      t
    ]);
    const T = (k) => {
      g((K) => ({
        ...K,
        [k]: !K[k]
      }));
    }, ee = (k) => {
      w((K) => {
        const W = new Set(K);
        return W.has(k) ? W.delete(k) : W.add(k), W;
      });
    }, Y = async () => {
      if (!(!s || !a || n)) {
        l(true), f(null);
        try {
          const k = await s();
          v(Ba(k)), w(/* @__PURE__ */ new Set()), m(null);
        } catch (k) {
          const K = k instanceof Error ? k.message : String(k);
          f(K || "\uC6A9\uB7C9 \uBD84\uC11D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."), v(null), w(/* @__PURE__ */ new Set()), m(null);
        } finally {
          l(false);
        }
      }
    }, U = (k) => {
      S || o.building || !o.enabled || !o.isolationReady || (L(true), F.rebuild({
        resume: k
      }).finally(() => L(false)));
    }, G = () => {
      S || o.building || !o.enabled || !o.isolationReady || (async () => {
        const k = await F.getRebuildCheckpointInfo();
        if (k) {
          I(k), i(true);
          return;
        }
        if (o.hasIndex) {
          _(true);
          return;
        }
        U(false);
      })();
    }, te = () => {
      F.cancelRebuild();
    }, z = N == null ? void 0 : N.summary, de = z && z.totalSize > 0 ? z.indexSize / z.totalSize * 100 : 0, X = z ? [
      {
        label: "\uCD1D \uC6A9\uB7C9",
        value: Z(z.totalSize)
      },
      {
        label: "\uC0C9\uC778 \uB370\uC774\uD130 (.advanced-search)",
        value: `${Z(z.indexSize)} \xB7 ${z.indexFileCount.toLocaleString()}\uAC1C \uD30C\uC77C${z.totalSize > 0 ? ` \xB7 ${de.toFixed(1)}%` : ""}`
      },
      {
        label: "\uC0C9\uC778 \uC81C\uC678 \uC6A9\uB7C9",
        value: Z(Math.max(0, z.totalSize - z.indexSize))
      },
      {
        label: "\uD30C\uC77C \uC218",
        value: z.fileCount.toLocaleString()
      },
      {
        label: "\uD3F4\uB354 \uC218",
        value: z.folderCount.toLocaleString()
      },
      {
        label: "0 byte \uD30C\uC77C",
        value: z.zeroByteCount.toLocaleString()
      },
      ...z.unknownSizeCount > 0 ? [
        {
          label: "\uD06C\uAE30 \uBBF8\uD655\uC778 \uD30C\uC77C",
          value: z.unknownSizeCount.toLocaleString()
        }
      ] : []
    ] : [], J = bs((N == null ? void 0 : N.folders) ?? [], E);
    return e.jsxs("div", {
      className: "space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsxs("div", {
          className: "flex flex-wrap items-start justify-between gap-3",
          children: [
            e.jsxs("div", {
              className: "min-w-0",
              children: [
                e.jsx("h3", {
                  className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
                  children: "\uC6A9\uB7C9 \uBD84\uC11D"
                }),
                e.jsxs("p", {
                  className: "mt-1 text-xs text-gray-600 dark:text-odp-muted",
                  children: [
                    "\uD604\uC7AC \uC120\uD0DD: ",
                    e.jsx("span", {
                      className: "font-semibold",
                      children: is(t)
                    }),
                    ". \uC804\uCCB4 \uD2B8\uB9AC\uB97C \uC2A4\uCE94\uD574 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9\uC744 \uC9D1\uACC4\uD569\uB2C8\uB2E4."
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              className: "flex flex-wrap items-center gap-2",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: G,
                  disabled: !a || S || o.building || !o.enabled || !o.isolationReady,
                  className: "inline-flex items-center gap-1.5 rounded border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                  title: o.enabled ? o.isolationReady ? "Advanced Search \uC5ED\uC0C9\uC778\uC744 \uBC31\uADF8\uB77C\uC6B4\uB4DC\uB85C \uC0DD\uC131\uD569\uB2C8\uB2E4" : "\uAC80\uC0C9 \uACA9\uB9AC(COOP/COEP)\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694" : "\uC124\uC815\uC5D0\uC11C \uC5ED\uC0C9\uC778\uC744 \uCF20 \uB4A4 \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",
                  children: [
                    S || o.building ? e.jsx(Ge, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(qt, {
                      size: 14
                    }),
                    S || o.building ? typeof o.buildProgress == "number" ? `\uC0C9\uC778 \uC911 ${Math.round(o.buildProgress * 100)}%` : "\uC0C9\uC778 \uC911\u2026" : o.hasCheckpoint ? "\uC0C9\uC778 \uC7AC\uAC1C/\uB2E4\uC2DC \uC2DC\uC791" : o.hasIndex ? "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131" : "\uC5ED\uC0C9\uC778 \uC0DD\uC131"
                  ]
                }),
                o.building ? e.jsxs("button", {
                  type: "button",
                  onClick: te,
                  className: "inline-flex items-center gap-1.5 rounded border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60",
                  title: "\uC0C9\uC778\uC744 \uC911\uC9C0\uD569\uB2C8\uB2E4. \uCCB4\uD06C\uD3EC\uC778\uD2B8\uB294 \uC720\uC9C0\uB418\uC5B4 \uC774\uC5B4\uC11C \uC7AC\uAC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                  children: [
                    e.jsx(Ia, {
                      size: 14
                    }),
                    "\uC911\uC9C0"
                  ]
                }) : null,
                e.jsxs("button", {
                  type: "button",
                  onClick: Y,
                  disabled: !a || n || typeof s != "function",
                  className: "inline-flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
                  children: [
                    n ? e.jsx(Ge, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(Yt, {
                      size: 14
                    }),
                    n ? "\uBD84\uC11D \uC911\u2026" : N ? "\uB2E4\uC2DC \uBD84\uC11D" : "\uBD84\uC11D \uC2DC\uC791"
                  ]
                })
              ]
            })
          ]
        }),
        !a && e.jsx("p", {
          className: "text-xs text-amber-700 dark:text-amber-300",
          children: "\uC120\uD0DD\uD55C \uC800\uC7A5\uC18C\uAC00 \uC544\uC9C1 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC5F0\uACB0 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
        }),
        e.jsx(rr, {
          logs: o.buildLogs || [],
          building: o.building,
          progress: o.buildProgress
        }),
        e.jsx(ar, {
          isOpen: h,
          info: b,
          onCancel: () => {
            i(false), I(null);
          },
          onResume: () => {
            i(false), I(null), U(true);
          },
          onStartFresh: () => {
            i(false), I(null), U(false);
          }
        }),
        e.jsx(ie, {
          isOpen: D,
          title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
          message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
          confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
          cancelLabel: "\uCDE8\uC18C",
          onConfirm: () => {
            _(false), U(false);
          },
          onCancel: () => _(false)
        }),
        p && e.jsx("p", {
          className: "whitespace-pre-wrap text-xs text-red-600 dark:text-red-400",
          children: p
        }),
        e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsx(nt, {
              title: "\uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: x.summary,
              onToggle: () => T("summary"),
              children: e.jsx(dt, {
                columns: [
                  {
                    key: "label",
                    header: "\uD56D\uBAA9"
                  },
                  {
                    key: "value",
                    header: "\uAC12",
                    align: "right"
                  }
                ],
                rows: X.map((k) => ({
                  label: k.label,
                  value: k.value
                })),
                emptyText: "\uBD84\uC11D\uC744 \uC2DC\uC791\uD558\uBA74 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4."
              })
            }),
            e.jsx(nt, {
              title: "\uD30C\uC77C \uD615\uC2DD\uBCC4 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: x.extension,
              onToggle: () => T("extension"),
              children: e.jsx(dt, {
                columns: [
                  {
                    key: "label",
                    header: "\uD655\uC7A5\uC790"
                  },
                  {
                    key: "count",
                    header: "\uD30C\uC77C \uC218",
                    align: "right"
                  },
                  {
                    key: "size",
                    header: "\uC6A9\uB7C9",
                    align: "right"
                  },
                  {
                    key: "percent",
                    header: "\uBE44\uC728",
                    align: "right"
                  }
                ],
                rows: ((N == null ? void 0 : N.byExtension) ?? []).map((k) => ({
                  _key: k.ext,
                  label: k.label,
                  count: k.count.toLocaleString(),
                  size: Z(k.size),
                  percent: e.jsx(Gt, {
                    percent: k.percent
                  }),
                  _onClick: () => m(k)
                })),
                emptyText: "\uBD84\uC11D\uC744 \uC2DC\uC791\uD558\uBA74 \uD615\uC2DD\uBCC4 \uC6A9\uB7C9\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4.",
                legendColumnKey: "percent"
              })
            }),
            e.jsx(nt, {
              title: "\uD3F4\uB354\uBCC4 \uC6A9\uB7C9 (Tree Size)",
              open: x.folder,
              onToggle: () => T("folder"),
              children: e.jsx(dt, {
                maxHeightClass: "max-h-80",
                columns: [
                  {
                    key: "name",
                    header: "\uD3F4\uB354",
                    tree: true
                  },
                  {
                    key: "fileCount",
                    header: "\uD30C\uC77C \uC218",
                    align: "right"
                  },
                  {
                    key: "size",
                    header: "\uC6A9\uB7C9",
                    align: "right"
                  },
                  {
                    key: "percent",
                    header: "\uBE44\uC728",
                    align: "right"
                  }
                ],
                rows: J.map((k) => {
                  const K = E.has(k.path);
                  return {
                    _key: k.path,
                    fileCount: k.fileCount.toLocaleString(),
                    size: Z(k.size),
                    percent: e.jsx(Gt, {
                      percent: k.percent
                    }),
                    ...k.hasChildFolders ? {
                      _onClick: () => ee(k.path)
                    } : {},
                    _tree: {
                      depth: k.depth,
                      expandable: k.hasChildFolders,
                      expanded: K,
                      label: e.jsx("span", {
                        title: k.path,
                        children: k.name
                      })
                    }
                  };
                }),
                emptyText: "\uBD84\uC11D\uC744 \uC2DC\uC791\uD558\uBA74 \uD3F4\uB354\uBCC4 \uC6A9\uB7C9\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4.",
                legendColumnKey: "percent"
              })
            })
          ]
        }),
        e.jsx(rs, {
          open: A != null,
          extension: A,
          onOpenChange: (k) => {
            k || m(null);
          },
          onOpenFile: async (k) => {
            m(null), await (u == null ? void 0 : u(k));
          }
        })
      ]
    });
  }
  const ps = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), gs = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function ms(t) {
    return t === be ? "Local Haim" : t === je ? "WebDAV Haim" : t === ne ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function hs({ storageMode: t, canScan: s = false, onScanTree: a, onReadText: u, onReadBytes: n, onDeletePaths: l }) {
    const [p, f] = r.useState(() => Fr()), [N, v] = r.useState("notes"), [E, w] = r.useState("trash"), [A, m] = r.useState(false), [x, g] = r.useState(false), [S, L] = r.useState(null), [o, P] = r.useState(null), [h, i] = r.useState(""), [b, I] = r.useState([]), [D, _] = r.useState(() => /* @__PURE__ */ new Set()), [T, ee] = r.useState([]), [Y, U] = r.useState(() => /* @__PURE__ */ new Set()), [G, te] = r.useState({}), [z, de] = r.useState(false), [X, J] = r.useState([]), [k, K] = r.useState(false), W = r.useRef(null);
    r.useEffect(() => Vt((c, y) => {
      c === "settings-orphan-image-auto" && f(y);
    }), []), r.useEffect(() => () => {
      var _a2;
      (_a2 = W.current) == null ? void 0 : _a2.abort();
    }, []);
    const re = A || x || k, Ne = async () => {
      var _a2;
      if (!s || !a || !u || re) return;
      (_a2 = W.current) == null ? void 0 : _a2.abort();
      const c = new AbortController();
      W.current = c, m(true), i(""), L(null);
      try {
        const y = await a();
        if (c.signal.aborted) return;
        const O = Dt(y, N), R = Mr(y), $ = /* @__PURE__ */ new Set();
        if (await Br(R, 6, async (B) => {
          try {
            const V = await u(B);
            for (const He of Kr(V)) $.add(He);
          } catch {
          }
        }, {
          signal: c.signal,
          onProgress: (B, V) => L({
            done: B,
            total: V
          })
        }), c.signal.aborted) return;
        const M = Wr({
          images: O,
          referencedPaths: $
        });
        I(M), _(new Set(M.map((B) => B.path)));
      } catch (y) {
        if ((y == null ? void 0 : y.name) === "AbortError") return;
        i(y instanceof Error ? y.message : String(y));
      } finally {
        m(false), L(null);
      }
    }, Se = async () => {
      var _a2;
      if (!s || !a || !n || re) return;
      (_a2 = W.current) == null ? void 0 : _a2.abort();
      const c = new AbortController();
      W.current = c, g(true), i(""), P(null);
      try {
        const y = await a();
        if (c.signal.aborted) return;
        const O = Dt(y, N), R = await Ur(O, n, {
          signal: c.signal,
          onProgress: (B, V) => P({
            done: B,
            total: V
          })
        });
        if (c.signal.aborted) return;
        ee(R);
        const $ = {}, M = /* @__PURE__ */ new Set();
        for (const B of R) {
          $[B.hash] = B.keepPath;
          for (const V of B.files) V.path !== B.keepPath && M.add(V.path);
        }
        te($), U(M);
      } catch (y) {
        if ((y == null ? void 0 : y.name) === "AbortError") return;
        i(y instanceof Error ? y.message : String(y));
      } finally {
        g(false), P(null);
      }
    }, we = (c) => {
      _((y) => {
        const O = new Set(y);
        return O.has(c) ? O.delete(c) : O.add(c), O;
      });
    }, Ce = (c, y) => {
      const O = G[y];
      c !== O && U((R) => {
        const $ = new Set(R);
        return $.has(c) ? $.delete(c) : $.add(c), $;
      });
    }, Ee = (c, y) => {
      te((O) => ({
        ...O,
        [c]: y
      })), U((O) => {
        const R = new Set(O), $ = T.find((M) => M.hash === c);
        if (!$) return R;
        for (const M of $.files) M.path === y ? R.delete(M.path) : R.add(M.path);
        return R;
      });
    }, ce = (c) => {
      !c.length || !l || (J(c), de(true));
    }, Ve = async () => {
      if (!(!l || !X.length)) {
        K(true), i("");
        try {
          await l(X, E);
          const c = new Set(X);
          I((y) => y.filter((O) => !c.has(O.path))), _((y) => {
            const O = new Set(y);
            for (const R of c) O.delete(R);
            return O;
          }), ee((y) => y.map((O) => ({
            ...O,
            files: O.files.filter((R) => !c.has(R.path))
          })).filter((O) => O.files.length >= 2)), U((y) => {
            const O = new Set(y);
            for (const R of c) O.delete(R);
            return O;
          }), de(false), J([]);
        } catch (c) {
          i(c instanceof Error ? c.message : String(c));
        } finally {
          K(false);
        }
      }
    }, Ie = D.size, Oe = Y.size, pe = E === "hard";
    return e.jsxs("div", {
      id: "settings-unused-images",
      tabIndex: -1,
      className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx("h3", {
              className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
              children: "\uBBF8\uC0AC\uC6A9 / \uC911\uBCF5 \uC774\uBBF8\uC9C0"
            }),
            e.jsxs("p", {
              className: "mt-1 text-xs leading-relaxed text-gray-600 dark:text-odp-muted",
              children: [
                ms(t),
                "\uC758 wiki \uC774\uBBF8\uC9C0(",
                e.jsx("code", {
                  className: "rounded bg-gray-200/80 px-1 dark:bg-odp-bgSoft",
                  children: "![[\u2026]]"
                }),
                ") \uCC38\uC870\uB97C \uAE30\uC900\uC73C\uB85C orphan\xB7\uC911\uBCF5\uC744 \uCC3E\uC2B5\uB2C8\uB2E4."
              ]
            })
          ]
        }),
        e.jsxs("div", {
          className: "flex items-start justify-between gap-3 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
          children: [
            e.jsxs("div", {
              className: "min-w-0",
              children: [
                e.jsx("div", {
                  className: "text-xs font-semibold text-gray-700 dark:text-odp-fg",
                  children: "\uB178\uD2B8 \uC0AD\uC81C \uC2DC \uC774\uBBF8\uC9C0 \uC790\uB3D9 \uC815\uB9AC"
                }),
                e.jsxs("p", {
                  className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
                  children: [
                    "\uCF1C\uBA74 \uB178\uD2B8/\uD3F4\uB354 \uC0AD\uC81C \uC2DC companion",
                    " ",
                    e.jsx("code", {
                      className: "rounded bg-gray-100 px-0.5 dark:bg-odp-bgSoft",
                      children: ".images/\u2026"
                    }),
                    " \uB3C4 \uD568\uAED8 \uD734\uC9C0\uD1B5\uC73C\uB85C \uBCF4\uB0C5\uB2C8\uB2E4. \uB044\uBA74 \uC774 \uD654\uBA74\uC5D0\uC11C \uC2A4\uCE94\uD574 \uC0AD\uC81C\uD569\uB2C8\uB2E4."
                  ]
                })
              ]
            }),
            e.jsx(Qt, {
              className: ps(p),
              checked: p,
              onCheckedChange: (c) => H("settings-orphan-image-auto", c),
              "aria-label": "\uB178\uD2B8 \uC0AD\uC81C \uC2DC \uC774\uBBF8\uC9C0 \uC790\uB3D9 \uC815\uB9AC",
              children: e.jsx(Zt, {
                className: gs
              })
            })
          ]
        }),
        e.jsxs("div", {
          className: "grid gap-3 sm:grid-cols-2",
          children: [
            e.jsxs("div", {
              className: "space-y-1.5",
              children: [
                e.jsx("div", {
                  className: "text-[11px] font-semibold text-gray-600 dark:text-odp-muted",
                  children: "\uB300\uC0C1"
                }),
                e.jsx(ue, {
                  className: "flex flex-col gap-1.5",
                  value: N,
                  onValueChange: (c) => v(c),
                  "aria-label": "\uC2A4\uCE94 \uB300\uC0C1",
                  children: [
                    {
                      value: "notes",
                      label: "\uB178\uD2B8\uB9CC (.images/)"
                    },
                    {
                      value: "notes+chat",
                      label: "\uB178\uD2B8 + \uCC44\uD305"
                    }
                  ].map((c) => {
                    const y = N === c.value;
                    return e.jsx(se, {
                      value: c.value,
                      className: [
                        "rounded-md border-2 px-2.5 py-2 text-left text-xs outline-none transition-all",
                        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                        y ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30" : "border-gray-300 opacity-70 dark:border-odp-borderStrong"
                      ].join(" "),
                      children: c.label
                    }, c.value);
                  })
                })
              ]
            }),
            e.jsxs("div", {
              className: "space-y-1.5",
              children: [
                e.jsx("div", {
                  className: "text-[11px] font-semibold text-gray-600 dark:text-odp-muted",
                  children: "\uC0AD\uC81C \uBC29\uC2DD"
                }),
                e.jsx(ue, {
                  className: "flex flex-col gap-1.5",
                  value: E,
                  onValueChange: (c) => w(c),
                  "aria-label": "\uC0AD\uC81C \uBC29\uC2DD",
                  children: [
                    {
                      value: "trash",
                      label: "\uD734\uC9C0\uD1B5\uC73C\uB85C \uC774\uB3D9"
                    },
                    {
                      value: "hard",
                      label: "\uC601\uAD6C \uC0AD\uC81C"
                    }
                  ].map((c) => {
                    const y = E === c.value;
                    return e.jsx(se, {
                      value: c.value,
                      className: [
                        "rounded-md border-2 px-2.5 py-2 text-left text-xs outline-none transition-all",
                        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                        y ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30" : "border-gray-300 opacity-70 dark:border-odp-borderStrong"
                      ].join(" "),
                      children: c.label
                    }, c.value);
                  })
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          className: "flex flex-wrap gap-2",
          children: [
            e.jsxs(ye, {
              type: "button",
              variant: "secondary",
              disabled: !s || re,
              onClick: () => {
                Ne();
              },
              children: [
                A ? e.jsx(Ge, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(qt, {
                  size: 14
                }),
                "\uBBF8\uC0AC\uC6A9 \uC2A4\uCE94"
              ]
            }),
            e.jsxs(ye, {
              type: "button",
              variant: "secondary",
              disabled: !s || re,
              onClick: () => {
                Se();
              },
              children: [
                x ? e.jsx(Ge, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(Oa, {
                  size: 14
                }),
                "\uC911\uBCF5 \uC2A4\uCE94"
              ]
            })
          ]
        }),
        (S || o) && e.jsxs("p", {
          className: "text-[11px] text-gray-500 dark:text-odp-muted",
          children: [
            S ? `Markdown ${S.done}/${S.total}` : null,
            S && o ? " \xB7 " : null,
            o ? `\uD574\uC2DC ${o.done}/${o.total}` : null
          ]
        }),
        h ? e.jsx("p", {
          className: "text-xs text-red-600 dark:text-red-400",
          role: "alert",
          children: h
        }) : null,
        s ? null : e.jsx("p", {
          className: "text-xs text-gray-500 dark:text-odp-muted",
          children: "\uC800\uC7A5\uC18C\uAC00 \uC5F0\uACB0\uB418\uBA74 \uC2A4\uCE94\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
        }),
        b.length > 0 ? e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsxs("div", {
              className: "flex items-center justify-between gap-2",
              children: [
                e.jsxs("h4", {
                  className: "text-xs font-bold text-gray-700 dark:text-odp-fg",
                  children: [
                    "\uBBF8\uC0AC\uC6A9 (",
                    b.length,
                    ")"
                  ]
                }),
                e.jsxs(ye, {
                  type: "button",
                  variant: "danger",
                  disabled: Ie === 0 || re,
                  onClick: () => ce([
                    ...D
                  ]),
                  children: [
                    e.jsx(Ue, {
                      size: 14
                    }),
                    "\uC120\uD0DD \uC0AD\uC81C (",
                    Ie,
                    ")"
                  ]
                })
              ]
            }),
            e.jsx("ul", {
              className: "max-h-56 space-y-1 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter",
              children: b.map((c) => e.jsx("li", {
                children: e.jsxs("label", {
                  className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg",
                  children: [
                    e.jsx("input", {
                      type: "checkbox",
                      className: "mt-0.5",
                      checked: D.has(c.path),
                      onChange: () => we(c.path)
                    }),
                    e.jsx("span", {
                      className: "min-w-0 flex-1 break-all",
                      children: c.path
                    }),
                    e.jsx("span", {
                      className: "shrink-0 tabular-nums text-gray-500 dark:text-odp-muted",
                      children: Z(c.size)
                    })
                  ]
                })
              }, c.path))
            })
          ]
        }) : null,
        T.length > 0 ? e.jsxs("div", {
          className: "space-y-3",
          children: [
            e.jsxs("div", {
              className: "flex items-center justify-between gap-2",
              children: [
                e.jsxs("h4", {
                  className: "text-xs font-bold text-gray-700 dark:text-odp-fg",
                  children: [
                    "\uC911\uBCF5 (",
                    T.length,
                    " \uADF8\uB8F9)"
                  ]
                }),
                e.jsxs(ye, {
                  type: "button",
                  variant: "danger",
                  disabled: Oe === 0 || re,
                  onClick: () => ce([
                    ...Y
                  ]),
                  children: [
                    e.jsx(Ue, {
                      size: 14
                    }),
                    "\uC120\uD0DD \uC0AD\uC81C (",
                    Oe,
                    ")"
                  ]
                })
              ]
            }),
            T.map((c) => e.jsxs("div", {
              className: "space-y-1 rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter",
              children: [
                e.jsxs("div", {
                  className: "text-[10px] text-gray-500 dark:text-odp-muted",
                  children: [
                    Z(c.size),
                    " \xB7 ",
                    c.hash.slice(0, 12),
                    "\u2026"
                  ]
                }),
                e.jsx("ul", {
                  className: "space-y-1",
                  children: c.files.map((y) => {
                    const O = G[c.hash] === y.path;
                    return e.jsx("li", {
                      children: e.jsxs("label", {
                        className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg",
                        children: [
                          e.jsx("input", {
                            type: "checkbox",
                            className: "mt-0.5",
                            checked: Y.has(y.path),
                            disabled: O,
                            onChange: () => Ce(y.path, c.hash)
                          }),
                          e.jsxs("span", {
                            className: "min-w-0 flex-1 break-all",
                            children: [
                              y.path,
                              O ? e.jsx("span", {
                                className: "ml-1 text-[10px] text-blue-600 dark:text-blue-400",
                                children: "(\uC720\uC9C0)"
                              }) : null
                            ]
                          }),
                          O ? null : e.jsx("button", {
                            type: "button",
                            className: "shrink-0 text-[10px] text-blue-600 underline dark:text-blue-400",
                            onClick: () => Ee(c.hash, y.path),
                            children: "\uC774 \uD30C\uC77C \uC720\uC9C0"
                          })
                        ]
                      })
                    }, y.path);
                  })
                })
              ]
            }, c.hash))
          ]
        }) : null,
        e.jsx(ie, {
          isOpen: z,
          title: pe ? "\uC774\uBBF8\uC9C0\uB97C \uC601\uAD6C \uC0AD\uC81C\uD560\uAE4C\uC694?" : "\uC774\uBBF8\uC9C0\uB97C \uD734\uC9C0\uD1B5\uC73C\uB85C \uBCF4\uB0BC\uAE4C\uC694?",
          message: pe ? `${X.length}\uAC1C \uD30C\uC77C\uC744 \uBCF5\uAD6C\uD560 \uC218 \uC5C6\uC774 \uC0AD\uC81C\uD569\uB2C8\uB2E4.` : `${X.length}\uAC1C \uD30C\uC77C\uC744 .trash/ \uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.`,
          variant: "danger",
          confirmLabel: pe ? "\uC601\uAD6C \uC0AD\uC81C" : "\uD734\uC9C0\uD1B5\uC73C\uB85C \uC774\uB3D9",
          cancelLabel: "\uCDE8\uC18C",
          confirmDisabled: k,
          onConfirm: () => {
            Ve();
          },
          onCancel: () => {
            k || (de(false), J([]));
          }
        })
      ]
    });
  }
  const fs = "\uC554\uD638\uC124\uC815 \uBD88\uB7EC\uC624\uB294 \uC911", ys = [
    {
      value: "off",
      label: "\uC0AC\uC6A9 \uC548 \uD568",
      description: "\uC571\uC744 \uC5F4\uBA74 \uC800\uC7A5\uB41C \uC5F0\uACB0 \uC815\uBCF4\uB97C \uBC14\uB85C \uBD88\uB7EC\uC635\uB2C8\uB2E4.",
      icon: lt
    },
    {
      value: "password",
      label: "\uBE44\uBC00\uBC88\uD638",
      description: "\uC571 \uC785\uC7A5 \uC2DC \uB9C8\uC2A4\uD130 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD569\uB2C8\uB2E4.",
      icon: Jr
    },
    {
      value: "biometric",
      label: "\uC0DD\uCCB4 \uC778\uC99D",
      description: "Touch ID, Windows Hello \uB4F1\uC73C\uB85C \uC571\uC744 \uC7A0\uAE08 \uD574\uC81C\uD569\uB2C8\uB2E4.",
      icon: qr
    }
  ];
  function ks({ s3Creds: t, webdavConfig: s, onModeChanged: a }) {
    const { lock: u } = Gr(), { showToast: n, dismissToast: l } = Vr(), [p, f] = r.useState("off"), [N, v] = r.useState(false), [E, w] = r.useState(false), [A, m] = r.useState(false), [x, g] = r.useState(false), S = Hr(), L = r.useCallback(async (b) => {
      n({
        message: fs,
        icon: "loading",
        durationMs: 0
      });
      try {
        return await b();
      } finally {
        l();
      }
    }, [
      l,
      n
    ]);
    if (r.useEffect(() => {
      if (!ot()) return;
      let b = false;
      return (async () => {
        try {
          const [I, D] = await L(() => Promise.all([
            Yr(),
            Xr()
          ]));
          if (b) return;
          f(I), v(D);
        } catch {
          b || (f("off"), v(false));
        }
      })(), () => {
        b = true;
      };
    }, [
      L
    ]), !ot()) return null;
    const o = async (b) => {
      if (!(E || b === p)) {
        w(true);
        try {
          if (b === "off") await L(() => _t(t, s));
          else if (b === "password") {
            m(true);
            return;
          } else await L(() => Zr(t));
          f(b), a == null ? void 0 : a(b);
        } catch (I) {
          if (b === "biometric" && ea(I)) return;
          alert(tt(I, "\uC785\uC7A5 \uC7A0\uAE08 \uC124\uC815\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
        } finally {
          w(false);
        }
      }
    }, P = async (b) => {
      w(true);
      try {
        await L(() => ta(b, t, s)), f("password"), a == null ? void 0 : a("password"), m(false);
      } catch (I) {
        alert(tt(I, "\uBE44\uBC00\uBC88\uD638 \uC7A0\uAE08 \uC124\uC815\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        w(false);
      }
    }, h = async () => {
      g(false), w(true);
      try {
        await L(() => _t(t, s)), f("off"), a == null ? void 0 : a("off");
      } catch (b) {
        alert(tt(b, "\uC785\uC7A5 \uC7A0\uAE08 \uD574\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        w(false);
      }
    }, i = () => {
      p === "off" || E || u();
    };
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs("div", {
          id: "settings-desktop-entry-lock",
          tabIndex: -1,
          className: "scroll-mt-4 rounded-lg border border-blue-200 bg-blue-50/70 p-4 dark:border-blue-900/60 dark:bg-blue-950/30",
          children: [
            e.jsxs("div", {
              className: "mb-1 flex items-start justify-between gap-3",
              children: [
                e.jsxs("h3", {
                  className: "flex min-w-0 items-center gap-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
                  children: [
                    e.jsx(lt, {
                      size: 16
                    }),
                    "\uC571 \uC785\uC7A5 \uC7A0\uAE08 (Tauri)"
                  ]
                }),
                p !== "off" ? e.jsxs(ye, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  className: "shrink-0",
                  disabled: E,
                  onClick: i,
                  "aria-label": "\uC571 \uC7A0\uAE08",
                  children: [
                    e.jsx(lt, {
                      size: 14
                    }),
                    "\uC7A0\uAE08"
                  ]
                }) : null
              ]
            }),
            e.jsxs("p", {
              className: "mb-3 text-xs leading-relaxed text-gray-600 dark:text-odp-muted",
              children: [
                "\uB370\uC2A4\uD06C\uD1B1 \uC571\uC744 \uC5F4 \uB54C \uBE44\uBC00\uBC88\uD638 \uB610\uB294 ",
                S,
                "\uB85C \uC7A0\uAE08 \uD574\uC81C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC571\uC744 \uC0C8\uB85C \uCF1C\uAC70\uB098 \uC7A0\uAE08 \uBC84\uD2BC\uC744 \uB20C\uB800\uC744 \uB54C\uB9CC \uC778\uC99D\uC774 \uD544\uC694\uD569\uB2C8\uB2E4."
              ]
            }),
            e.jsx(ue, {
              value: p,
              onValueChange: (b) => {
                const I = b;
                if (I === "off" && p !== "off") {
                  g(true);
                  return;
                }
                o(I);
              },
              className: "space-y-2",
              disabled: E,
              children: ys.map((b) => {
                const I = b.icon, D = b.value === "biometric" && !N, _ = b.value === "biometric" && N ? S : b.label, T = b.value === "biometric" && N ? `${S}\uB85C \uC571\uC744 \uC7A0\uAE08 \uD574\uC81C\uD569\uB2C8\uB2E4.` : b.description;
                return e.jsxs("label", {
                  className: [
                    "flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition",
                    p === b.value ? "border-blue-400 bg-white shadow-sm dark:border-blue-500 dark:bg-odp-bgSoft" : "border-gray-200 bg-white/70 dark:border-odp-borderStrong dark:bg-odp-surface/60",
                    D ? "cursor-not-allowed opacity-50" : "hover:border-blue-300"
                  ].join(" "),
                  children: [
                    e.jsx(se, {
                      value: b.value,
                      disabled: D || E,
                      className: "mt-0.5 h-4 w-4 shrink-0 rounded-full border border-gray-400 bg-white outline-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                      "aria-label": _,
                      children: e.jsx(ve, {
                        className: "relative flex h-full w-full items-center justify-center after:block after:h-1.5 after:w-1.5 after:rounded-full after:bg-white"
                      })
                    }),
                    e.jsxs("span", {
                      className: "min-w-0 flex-1",
                      children: [
                        e.jsxs("span", {
                          className: "flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-odp-fg",
                          children: [
                            e.jsx(I, {
                              size: 14
                            }),
                            _
                          ]
                        }),
                        e.jsx("span", {
                          className: "mt-0.5 block text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
                          children: T
                        }),
                        D && e.jsx("span", {
                          className: "mt-1 block text-[11px] text-amber-700 dark:text-amber-300",
                          children: "\uC774 \uAE30\uAE30\uC5D0\uC11C\uB294 \uC0DD\uCCB4 \uC778\uC99D\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."
                        })
                      ]
                    })
                  ]
                }, b.value);
              })
            }),
            p !== "off" && e.jsx("p", {
              className: "mt-3 text-[11px] text-gray-500 dark:text-odp-muted",
              children: p === "password" ? "\uBE44\uBC00\uBC88\uD638 \uBAA8\uB4DC\uAC00 \uCF1C\uC838 \uC788\uC2B5\uB2C8\uB2E4. \uC571\uC744 \uB2E4\uC2DC \uC5F4 \uB54C \uBE44\uBC00\uBC88\uD638\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." : `${S} \uBAA8\uB4DC\uAC00 \uCF1C\uC838 \uC788\uC2B5\uB2C8\uB2E4.`
            })
          ]
        }),
        e.jsx(Qr, {
          isOpen: A,
          masterPassword: "",
          onCancel: () => {
            m(false);
          },
          onSubmit: (b) => {
            P(b);
          }
        }),
        e.jsx(ie, {
          isOpen: x,
          title: "\uC785\uC7A5 \uC7A0\uAE08 \uD574\uC81C",
          message: "\uC571 \uC785\uC7A5 \uC7A0\uAE08\uC744 \uB044\uBA74 \uB2E4\uC74C \uC2E4\uD589\uBD80\uD130 \uBE44\uBC00\uBC88\uD638\xB7\uC0DD\uCCB4 \uC778\uC99D \uC5C6\uC774 \uC5F0\uACB0 \uC815\uBCF4\uB97C \uBD88\uB7EC\uC635\uB2C8\uB2E4.",
          confirmLabel: "\uC0AC\uC6A9 \uD574\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: () => {
            h();
          },
          onCancel: () => g(false)
        })
      ]
    });
  }
  _s = function({ s3Creds: t, masterPassword: s, onSaveS3Creds: a, onExportCreds: u, onImportClick: n, showHiddenFolders: l, onToggleHiddenFolders: p, showTrashFolder: f = false, onToggleTrashFolder: N, hideRecordingCompanions: v = false, onToggleHideRecordingCompanions: E, treeStickyFolderPathEnabled: w = true, onToggleTreeStickyFolderPath: A, showTreeModifiedDate: m = false, onToggleShowTreeModifiedDate: x, treeHoverExpandSettings: g = va, onTreeHoverExpandSettingsChange: S, onRequestClose: L, webauthnSupported: o = false, webauthnEnabled: P = false, webauthnStorageOnly: h = false, onEnableWebAuthn: i, onDisableWebAuthn: b, snippetConfig: I, onChangeSnippetConfig: D, onSaveSnippetConfig: _, isSavingSnippets: T = false, snippetConfigLoaded: ee = false, editorType: Y, onEditorTypeChange: U, storageMode: G = ne, onStorageModeChange: te, localFolderName: z = "", localVaultFsPath: de = "", onOpenLocalFolder: X, webdavConfig: J, onSaveWebdavConfig: k, isMobileLayout: K = false, sidebarOpen: W = true, sidebarCollapsed: re = false, onOpenSidebar: Ne, onCheckAppUpdate: Se, isCheckingAppUpdate: we = false, latestAppBuildId: Ce = "", onScanStorageUsage: Ee, canScanStorageUsage: ce = false, onOpenStorageUsageFile: Ve, onReadUnusedImageText: Ie, onReadUnusedImageBytes: Oe, onDeleteUnusedImagePaths: pe }) {
    const [c, y] = r.useState(t), [O, R] = r.useState(""), [$, M] = r.useState(J ?? {
      endpoint: "",
      username: "",
      password: "",
      basePath: ""
    }), [B, V] = r.useState(false), [He, sr] = r.useState(o), [it, ct] = r.useState(() => ra()), [dr, xt] = r.useState(() => Y ?? aa()), [Ae, nr] = r.useState(() => sa()), [ge, or] = r.useState(() => da()), [bt, ut] = r.useState(() => Tt()), [Le, lr] = r.useState(() => na()), [C, pt] = r.useState(() => F.getStatus()), [Pe, ir] = r.useState(() => oa()), [cr, gt] = r.useState(() => zt()), [mt, q] = r.useState(false), [xr, De] = r.useState(false), [br, _e] = r.useState(null), [ur, Ye] = r.useState(false), [Xe, ht] = r.useState(true), [Te, ft] = r.useState(() => G === be), [ze, yt] = r.useState(false), [Je, kt] = r.useState(true), qe = fr(), Re = ot(), jt = String(de || "").trim(), pr = String(z || "").trim() || la() || "", Qe = Re && jt ? jt : pr, vt = Re || typeof window < "u" && "showDirectoryPicker" in window;
    r.useEffect(() => Vt((d, j) => {
      d === "settings-alt-vim" ? nr(j) : d === "settings-workspace-tabs" ? or(j) : d === "settings-composer-helper" ? lr(j) : d === "settings-as-animation" ? ir(j) : (d === "settings-as-index" || d === "settings-as-include-other") && pt(F.getStatus());
    }), []), r.useEffect(() => {
      const d = (j) => {
        var _a2;
        const Q = ((_a2 = j == null ? void 0 : j.detail) == null ? void 0 : _a2.mode) ?? zt();
        gt(Q);
      };
      return window.addEventListener(Rt, d), () => {
        window.removeEventListener(Rt, d);
      };
    }, []), r.useEffect(() => {
      const d = (j) => {
        var _a2;
        const Q = ((_a2 = j == null ? void 0 : j.detail) == null ? void 0 : _a2.mode) ?? Tt();
        ut(Q);
      };
      return window.addEventListener($t, d), () => {
        window.removeEventListener($t, d);
      };
    }, []), r.useEffect(() => {
      const d = String(qe.hash || "").replace(/^#/, "");
      if (!d.startsWith("settings-")) return;
      d === "settings-s3" && ht(true), d === "settings-local" && ft(true), d === "settings-webdav" && yt(true), d === "settings-imgbb" && kt(true);
      const Q = (/* @__PURE__ */ new Set([
        "settings-llm-providers",
        "settings-llm-provider",
        "settings-gemini",
        "settings-openai-compat"
      ])).has(d) ? "settings-llm-providers" : d, $e = window.setTimeout(() => {
        var _a2;
        const he = document.getElementById(Q);
        if (he) {
          he.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
          try {
            (_a2 = he.focus) == null ? void 0 : _a2.call(he, {
              preventScroll: true
            });
          } catch {
          }
        }
      }, 80);
      return () => window.clearTimeout($e);
    }, [
      qe.hash,
      qe.pathname
    ]), r.useEffect(() => F.subscribe(() => {
      pt(F.getStatus());
    }), []), r.useEffect(() => {
      y({
        ...t,
        llmProviderProfiles: rt(t)
      }), R("");
    }, [
      t
    ]);
    const Ze = !!((t == null ? void 0 : t.imgbbApiKey) || "").trim(), me = (d) => {
      const j = d !== void 0 ? d : rt(c), Q = Ca(j), he = O.trim() || (Ze ? t.imgbbApiKey : "");
      return {
        ...c,
        llmProviderProfiles: j,
        ...Q,
        imgbbApiKey: he
      };
    };
    r.useEffect(() => {
      M(J ?? {
        endpoint: "",
        username: "",
        password: "",
        basePath: ""
      });
    }, [
      J
    ]), r.useEffect(() => {
      Y !== void 0 && xt(Y);
    }, [
      Y
    ]), r.useEffect(() => {
      let d = false;
      return ia().then((j) => {
        d || sr(j);
      }), () => {
        d = true;
      };
    }, []);
    const gr = He && (s || h), mr = !K && re ? "md:pl-14" : "";
    return e.jsxs("div", {
      className: "flex-1 flex flex-col bg-white dark:bg-odp-bgSofter min-w-0 max-h-full",
      children: [
        e.jsxs("div", {
          className: `px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-odp-surface flex justify-between items-center gap-3 bg-gray-50 dark:bg-odp-surface shrink-0 transition-[padding] duration-300 ease-in-out ${mr}`,
          children: [
            e.jsxs("div", {
              className: "flex min-w-0 flex-1 items-center gap-2",
              children: [
                K && !W && typeof Ne == "function" && e.jsx("button", {
                  type: "button",
                  "aria-label": "\uC0AC\uC774\uB4DC\uBC14 \uC5F4\uAE30",
                  onClick: Ne,
                  className: "inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
                  children: e.jsx(ca, {
                    size: 22
                  })
                }),
                e.jsxs("h2", {
                  className: "font-bold text-gray-700 dark:text-odp-fgStrong flex min-w-0 items-center gap-2",
                  children: [
                    e.jsx(xa, {}),
                    " \uC124\uC815 \uBC0F \uC554\uD638\uD654"
                  ]
                })
              ]
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => L == null ? void 0 : L(me()),
              className: "text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded transition",
              children: e.jsx(Jt, {
                size: 16
              })
            })
          ]
        }),
        e.jsxs("div", {
          className: "p-6 overflow-y-auto space-y-6 flex-1",
          children: [
            e.jsx(ks, {
              s3Creds: t,
              webdavConfig: J
            }),
            e.jsxs("div", {
              id: "settings-storage",
              tabIndex: -1,
              className: "scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong",
              children: [
                e.jsx("h3", {
                  className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2",
                  children: "\uAE30\uBCF8 \uC800\uC7A5\uC18C \uC120\uD0DD (3\uC911 \uD0DD1)"
                }),
                e.jsx("p", {
                  className: "text-xs text-gray-600 dark:text-odp-muted mb-3",
                  children: "\uC571\uC5D0\uC11C \uAE30\uBCF8\uC73C\uB85C \uB3D9\uC791\uD560 \uC800\uC7A5\uC18C\uB97C \uC120\uD0DD\uD569\uB2C8\uB2E4. \uC120\uD0DD\uC740 \uC800\uC7A5\uB418\uC5B4 \uB2E4\uC74C \uC811\uC18D \uC2DC \uC790\uB3D9 \uBCF5\uC6D0\uB429\uB2C8\uB2E4."
                }),
                e.jsxs("div", {
                  className: "space-y-2 text-xs text-gray-700 dark:text-odp-fg",
                  children: [
                    e.jsxs("label", {
                      className: "flex items-center gap-2 cursor-pointer",
                      children: [
                        e.jsx("input", {
                          type: "radio",
                          name: "storageMode",
                          value: ne,
                          checked: G === ne,
                          onChange: () => te == null ? void 0 : te(ne)
                        }),
                        e.jsx("span", {
                          className: "font-semibold",
                          children: "S3 Haim"
                        })
                      ]
                    }),
                    e.jsxs("label", {
                      className: "flex items-center gap-2 cursor-pointer",
                      children: [
                        e.jsx("input", {
                          type: "radio",
                          name: "storageMode",
                          value: be,
                          checked: G === be,
                          onChange: () => te == null ? void 0 : te(be)
                        }),
                        e.jsx("span", {
                          className: "font-semibold",
                          children: "Local Haim"
                        })
                      ]
                    }),
                    e.jsxs("label", {
                      className: "flex items-center gap-2 cursor-pointer",
                      children: [
                        e.jsx("input", {
                          type: "radio",
                          name: "storageMode",
                          value: je,
                          checked: G === je,
                          onChange: () => te == null ? void 0 : te(je)
                        }),
                        e.jsx("span", {
                          className: "font-semibold",
                          children: "WebDAV Haim"
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            e.jsxs("form", {
              id: "settings-s3",
              tabIndex: -1,
              onSubmit: (d) => {
                d.preventDefault(), a(me());
              },
              className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => ht((d) => !d),
                  className: "flex w-full items-center gap-2 text-left",
                  "aria-expanded": Xe,
                  children: [
                    Xe ? e.jsx(oe, {
                      size: 16,
                      className: "shrink-0 text-gray-500 dark:text-odp-muted"
                    }) : e.jsx(le, {
                      size: 16,
                      className: "shrink-0 text-gray-500 dark:text-odp-muted"
                    }),
                    e.jsx("h3", {
                      className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
                      children: "S3 \uC5F0\uACB0 \uC815\uBCF4"
                    })
                  ]
                }),
                Xe ? e.jsxs(e.Fragment, {
                  children: [
                    e.jsxs("div", {
                      className: "space-y-3",
                      children: [
                        e.jsxs("div", {
                          children: [
                            e.jsx("label", {
                              className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1",
                              children: "Access Key ID"
                            }),
                            e.jsx("input", {
                              type: "text",
                              required: true,
                              className: "w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                              value: c.accessKeyId,
                              onChange: (d) => y((j) => ({
                                ...j,
                                accessKeyId: d.target.value
                              }))
                            })
                          ]
                        }),
                        e.jsxs("div", {
                          children: [
                            e.jsx("label", {
                              className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1",
                              children: "Secret Access Key"
                            }),
                            e.jsx("input", {
                              type: "password",
                              required: true,
                              className: "w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                              value: c.secretAccessKey,
                              onChange: (d) => y((j) => ({
                                ...j,
                                secretAccessKey: d.target.value
                              }))
                            })
                          ]
                        }),
                        e.jsxs("div", {
                          children: [
                            e.jsx("label", {
                              className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1",
                              children: "Region"
                            }),
                            e.jsx("input", {
                              type: "text",
                              required: true,
                              className: "w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                              value: c.region,
                              onChange: (d) => y((j) => ({
                                ...j,
                                region: d.target.value
                              }))
                            })
                          ]
                        }),
                        e.jsxs("div", {
                          children: [
                            e.jsx("label", {
                              className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1",
                              children: "Bucket Name"
                            }),
                            e.jsx("input", {
                              type: "text",
                              required: true,
                              className: "w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                              value: c.bucket,
                              onChange: (d) => y((j) => ({
                                ...j,
                                bucket: d.target.value
                              }))
                            })
                          ]
                        }),
                        e.jsxs("div", {
                          children: [
                            e.jsx("label", {
                              className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1",
                              children: "Endpoint URL (\uC120\uD0DD)"
                            }),
                            e.jsx("input", {
                              type: "text",
                              placeholder: "https://...",
                              className: "w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                              value: c.endpoint || "",
                              onChange: (d) => y((j) => ({
                                ...j,
                                endpoint: d.target.value
                              }))
                            })
                          ]
                        })
                      ]
                    }),
                    e.jsxs("div", {
                      className: "flex justify-end gap-2 pt-2",
                      children: [
                        e.jsx("button", {
                          type: "button",
                          onClick: () => L == null ? void 0 : L(me()),
                          className: "px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition dark:text-odp-muted dark:hover:bg-odp-focusBg",
                          children: "\uCDE8\uC18C"
                        }),
                        e.jsx("button", {
                          type: "submit",
                          className: "px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition",
                          children: "\uC800\uC7A5"
                        })
                      ]
                    })
                  ]
                }) : null
              ]
            }),
            e.jsxs("form", {
              id: "settings-webdav",
              tabIndex: -1,
              onSubmit: (d) => {
                d.preventDefault(), k == null ? void 0 : k($);
              },
              className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => yt((d) => !d),
                  className: "flex w-full items-center gap-2 text-left",
                  "aria-expanded": ze,
                  children: [
                    ze ? e.jsx(oe, {
                      size: 16,
                      className: "shrink-0 text-gray-500 dark:text-odp-muted"
                    }) : e.jsx(le, {
                      size: 16,
                      className: "shrink-0 text-gray-500 dark:text-odp-muted"
                    }),
                    e.jsx("h3", {
                      className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
                      children: "WebDAV \uC5F0\uACB0 \uC815\uBCF4"
                    }),
                    ze ? null : e.jsx("span", {
                      className: "ml-auto text-[11px] font-normal text-gray-400 dark:text-odp-muted",
                      children: "\uC811\uD798"
                    })
                  ]
                }),
                ze ? e.jsxs(e.Fragment, {
                  children: [
                    e.jsxs("div", {
                      className: "space-y-3",
                      children: [
                        e.jsxs("div", {
                          children: [
                            e.jsx("label", {
                              className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1",
                              children: "Endpoint URL"
                            }),
                            e.jsx("input", {
                              type: "text",
                              placeholder: "https://webdav.example.com",
                              className: "w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                              value: $.endpoint,
                              onChange: (d) => M((j) => ({
                                ...j,
                                endpoint: d.target.value
                              }))
                            })
                          ]
                        }),
                        e.jsxs("div", {
                          children: [
                            e.jsx("label", {
                              className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1",
                              children: "Username"
                            }),
                            e.jsx("input", {
                              type: "text",
                              className: "w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                              value: $.username,
                              onChange: (d) => M((j) => ({
                                ...j,
                                username: d.target.value
                              }))
                            })
                          ]
                        }),
                        e.jsxs("div", {
                          children: [
                            e.jsx("label", {
                              className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1",
                              children: "Password"
                            }),
                            e.jsx("input", {
                              type: "password",
                              className: "w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                              value: $.password,
                              onChange: (d) => M((j) => ({
                                ...j,
                                password: d.target.value
                              }))
                            })
                          ]
                        }),
                        e.jsxs("div", {
                          children: [
                            e.jsx("label", {
                              className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1",
                              children: "Base Path (\uC120\uD0DD)"
                            }),
                            e.jsx("input", {
                              type: "text",
                              placeholder: "/remote.php/dav/files/username/",
                              className: "w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                              value: $.basePath,
                              onChange: (d) => M((j) => ({
                                ...j,
                                basePath: d.target.value
                              }))
                            })
                          ]
                        })
                      ]
                    }),
                    e.jsxs("div", {
                      className: "flex justify-end gap-2 pt-2",
                      children: [
                        e.jsx("button", {
                          type: "button",
                          className: "px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition dark:border-odp-borderStrong dark:hover:bg-odp-focusBg",
                          onClick: async () => {
                            try {
                              const { createWebdavBackend: d } = await hr(async () => {
                                const { createWebdavBackend: Q } = await import("./index-siMg0SyX.js").then(async (m2) => {
                                  await m2.__tla;
                                  return m2;
                                }).then(($e) => $e.gs);
                                return {
                                  createWebdavBackend: Q
                                };
                              }, __vite__mapDeps([0,1,2,3,4,5,6,7,8])), j = d($);
                              if (!j.isReady()) {
                                alert("Endpoint\uC640 Username\uC744 \uC785\uB825\uD558\uC138\uC694.");
                                return;
                              }
                              await j.testConnection(), alert("WebDAV \uC5F0\uACB0\uC5D0 \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4.");
                            } catch (d) {
                              alert("WebDAV \uC5F0\uACB0 \uC2E4\uD328: " + ((d == null ? void 0 : d.message) || d) + `

\uBE0C\uB77C\uC6B0\uC800\uC5D0\uC11C \uC0AC\uC6A9\uD558\uB824\uBA74 \uC11C\uBC84 CORS\uAC00 \uD5C8\uC6A9\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4.`);
                            }
                          },
                          children: "\uC5F0\uACB0 \uD14C\uC2A4\uD2B8"
                        }),
                        e.jsx("button", {
                          type: "submit",
                          className: "px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition",
                          children: "WebDAV \uC800\uC7A5"
                        })
                      ]
                    })
                  ]
                }) : null
              ]
            }),
            e.jsxs("div", {
              id: "settings-local",
              tabIndex: -1,
              className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => ft((d) => !d),
                  className: "flex w-full items-center gap-2 text-left",
                  "aria-expanded": Te,
                  children: [
                    Te ? e.jsx(oe, {
                      size: 16,
                      className: "shrink-0 text-gray-500 dark:text-odp-muted"
                    }) : e.jsx(le, {
                      size: 16,
                      className: "shrink-0 text-gray-500 dark:text-odp-muted"
                    }),
                    e.jsx("h3", {
                      className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
                      children: "Local \uC5F0\uACB0 \uC815\uBCF4"
                    }),
                    Te ? null : e.jsx("span", {
                      className: "ml-auto text-[11px] font-normal text-gray-400 dark:text-odp-muted",
                      children: "\uC811\uD798"
                    })
                  ]
                }),
                Te ? e.jsxs(e.Fragment, {
                  children: [
                    e.jsx("p", {
                      className: "text-xs text-gray-600 dark:text-odp-muted",
                      children: Re ? "Local Haim\uC740 OS \uD3F4\uB354 \uC120\uD0DD \uB300\uD654\uC0C1\uC790\uB85C vault \uB8E8\uD2B8\uB97C \uC9C0\uC815\uD569\uB2C8\uB2E4. \uC120\uD0DD\uD55C \uD3F4\uB354\uC758 \uC804\uCCB4 \uACBD\uB85C\uAC00 \uC800\uC7A5\uB418\uBA70, \uC571\uC744 \uB2E4\uC2DC \uC5F4\uBA74 \uAC19\uC740 \uC704\uCE58\uB97C \uBCF5\uC6D0\uD569\uB2C8\uB2E4." : "Local Haim\uC740 \uBE0C\uB77C\uC6B0\uC800 File System Access API\uB85C \uC5F0 \uD3F4\uB354\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uBCF4\uC548\uC0C1 OS \uC804\uCCB4 \uACBD\uB85C\uB294 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC73C\uBA70, \uD3F4\uB354 \uC774\uB984\uC73C\uB85C \uC5F4\uB9B0 \uC704\uCE58\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                    }),
                    e.jsxs("div", {
                      children: [
                        e.jsx("label", {
                          className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                          children: "\uD604\uC7AC \uC5F4\uB9B0 \uD3F4\uB354"
                        }),
                        e.jsx("input", {
                          type: "text",
                          readOnly: true,
                          className: "w-full rounded border px-3 py-2 text-sm text-gray-800 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg",
                          value: Qe || "(\uD3F4\uB354\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC74C)",
                          "aria-label": Re ? "\uD604\uC7AC \uC5F4\uB9B0 \uB85C\uCEEC \uD3F4\uB354 \uACBD\uB85C" : "\uD604\uC7AC \uC5F4\uB9B0 \uB85C\uCEEC \uD3F4\uB354 \uC774\uB984"
                        })
                      ]
                    }),
                    vt ? null : e.jsx("p", {
                      className: "text-xs text-amber-700 dark:text-amber-300",
                      children: "\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uD3F4\uB354 \uC120\uD0DD\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Chromium \uACC4\uC5F4 \uBE0C\uB77C\uC6B0\uC800\uB97C \uC0AC\uC6A9\uD574 \uC8FC\uC138\uC694."
                    }),
                    e.jsx("div", {
                      className: "flex justify-end gap-2 pt-2",
                      children: e.jsxs("button", {
                        type: "button",
                        disabled: !vt || typeof X != "function",
                        onClick: () => X == null ? void 0 : X(),
                        className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                        children: [
                          e.jsx(ba, {
                            size: 16
                          }),
                          Qe ? "\uB2E4\uB978 \uD3F4\uB354 \uC5F4\uAE30" : "\uD3F4\uB354 \uC120\uD0DD"
                        ]
                      })
                    })
                  ]
                }) : null
              ]
            }),
            e.jsxs("div", {
              id: "settings-backup",
              tabIndex: -1,
              className: "scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong",
              children: [
                e.jsx("h3", {
                  className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2",
                  children: "\uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0"
                }),
                e.jsxs("div", {
                  className: "flex gap-2",
                  children: [
                    e.jsxs("button", {
                      onClick: u,
                      className: "flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded transition",
                      children: [
                        e.jsx(ua, {}),
                        " S3 \uC5F0\uACB0\uC815\uBCF4 \uB0B4\uBCF4\uB0B4\uAE30"
                      ]
                    }),
                    e.jsxs("button", {
                      onClick: n,
                      className: "flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded transition",
                      children: [
                        e.jsx(pa, {}),
                        " S3 \uC5F0\uACB0\uC815\uBCF4 \uBD88\uB7EC\uC624\uAE30"
                      ]
                    })
                  ]
                })
              ]
            }),
            gr && e.jsxs("div", {
              id: "settings-webauthn",
              tabIndex: -1,
              className: "scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong",
              children: [
                e.jsx("h3", {
                  className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2",
                  children: "\uC9C0\uBB38 / \uBCF4\uC548 \uD0A4"
                }),
                e.jsx("p", {
                  className: "text-xs text-gray-600 dark:text-odp-muted mb-2",
                  children: h ? "S3 \uC5F0\uACB0 \uC815\uBCF4\uAC00 \uBCF4\uC548 \uD0A4\uB85C\uB9CC \uC554\uD638\uD654\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0 \uC2DC\uC5D0\uB294 \uBE44\uBC00\uBC88\uD638\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4." : "\uC9C0\uBB38, Windows Hello, Touch ID \uB4F1\uC73C\uB85C \uC571 \uC7A0\uAE08 \uD574\uC81C\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0 \uC2DC\uC5D0\uB294 \uBE44\uBC00\uBC88\uD638\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
                }),
                h ? e.jsx("p", {
                  className: "text-xs text-gray-600 dark:text-odp-muted",
                  children: "\uC800\uC7A5\uC18C: \uBCF4\uC548 \uD0A4\uB85C \uBCF4\uD638\uB428"
                }) : P ? e.jsxs("div", {
                  className: "flex items-center gap-2 flex-wrap",
                  children: [
                    e.jsx("span", {
                      className: "text-xs text-gray-700 dark:text-odp-fg",
                      children: "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uC0AC\uC6A9 \uC911"
                    }),
                    e.jsx("button", {
                      type: "button",
                      onClick: () => b == null ? void 0 : b(),
                      className: "text-xs text-red-600 dark:text-red-400 hover:underline",
                      children: "\uC0AC\uC6A9 \uD574\uC81C"
                    })
                  ]
                }) : e.jsx("div", {
                  className: "flex flex-col gap-2",
                  children: e.jsx("button", {
                    type: "button",
                    disabled: B,
                    onClick: async () => {
                      if (B || !i) return;
                      let d;
                      try {
                        d = i(s);
                      } catch (j) {
                        alert((j == null ? void 0 : j.message) || "\uBCF4\uC548 \uD0A4 \uB4F1\uB85D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
                        return;
                      }
                      V(true);
                      try {
                        await d;
                      } catch (j) {
                        alert((j == null ? void 0 : j.message) || "\uBCF4\uC548 \uD0A4 \uB4F1\uB85D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
                      } finally {
                        V(false);
                      }
                    },
                    className: "text-left text-xs py-2 px-3 rounded border border-gray-300 dark:border-odp-borderStrong hover:bg-gray-100 dark:hover:bg-odp-surface transition",
                    "aria-label": "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uB4F1\uB85D",
                    children: B ? "\uB4F1\uB85D \uC911\u2026" : "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uC0AC\uC6A9 (\uB4F1\uB85D)"
                  })
                })
              ]
            }),
            ce && e.jsx("div", {
              id: "settings-storage-usage",
              tabIndex: -1,
              className: "scroll-mt-4",
              children: e.jsx(us, {
                storageMode: G,
                onScanTree: Ee,
                canScan: ce,
                onOpenFile: Ve
              })
            }),
            e.jsx(ts, {
              profiles: rt(c),
              onSaveProfiles: (d) => {
                y((j) => ({
                  ...j,
                  llmProviderProfiles: d
                })), a(me(d));
              }
            }),
            e.jsx(hs, {
              storageMode: G,
              canScan: ce,
              onScanTree: Ee,
              onReadText: Ie,
              onReadBytes: Oe,
              onDeletePaths: pe
            }),
            e.jsxs("form", {
              id: "settings-imgbb",
              tabIndex: -1,
              onSubmit: (d) => {
                if (d.preventDefault(), !O.trim() && !Ze) {
                  alert("API \uD0A4\uB97C \uC785\uB825\uD558\uC138\uC694.");
                  return;
                }
                a(me());
              },
              className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => kt((d) => !d),
                  className: "flex w-full items-center gap-2 text-left",
                  "aria-expanded": Je,
                  children: [
                    Je ? e.jsx(oe, {
                      size: 16,
                      className: "shrink-0 text-gray-500 dark:text-odp-muted"
                    }) : e.jsx(le, {
                      size: 16,
                      className: "shrink-0 text-gray-500 dark:text-odp-muted"
                    }),
                    e.jsx("h3", {
                      className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
                      children: "ImgBB"
                    })
                  ]
                }),
                Je ? e.jsxs(e.Fragment, {
                  children: [
                    e.jsxs("p", {
                      className: "text-xs text-gray-600 dark:text-odp-muted",
                      children: [
                        "ImgBB API \uD0A4\uB294 \uC5F0\uACB0 \uC815\uBCF4\uC640 \uD568\uAED8 \uC554\uD638\uD654\uB418\uC5B4 \uC800\uC7A5\uB429\uB2C8\uB2E4. \uC800\uC7A5\uB41C \uD0A4\uB294 \uC774 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uD45C\uC2DC\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uD0A4\uB294",
                        " ",
                        e.jsx("a", {
                          href: "https://api.imgbb.com/",
                          target: "_blank",
                          rel: "noreferrer",
                          className: "text-blue-600 underline dark:text-blue-400",
                          children: "api.imgbb.com"
                        }),
                        "\uC5D0\uC11C \uBC1C\uAE09\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                      ]
                    }),
                    e.jsxs("div", {
                      children: [
                        e.jsx("label", {
                          className: "block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1",
                          children: "API Key"
                        }),
                        e.jsx("input", {
                          type: "password",
                          autoComplete: "off",
                          className: "w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                          value: O,
                          onChange: (d) => R(d.target.value),
                          placeholder: Ze ? "\uC800\uC7A5\uB428 \u2014 \uBCC0\uACBD \uC2DC \uC0C8 \uD0A4 \uC785\uB825" : "ImgBB API \uD0A4 \uC785\uB825"
                        })
                      ]
                    }),
                    e.jsx("div", {
                      className: "flex justify-end pt-1",
                      children: e.jsx("button", {
                        type: "submit",
                        className: "px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition",
                        children: "API \uD0A4 \uC800\uC7A5"
                      })
                    })
                  ]
                }) : null
              ]
            }),
            e.jsxs("div", {
              id: "settings-editor",
              tabIndex: -1,
              className: "scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong",
              children: [
                e.jsx("h3", {
                  className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2",
                  children: "\uB9C8\uD06C\uB2E4\uC6B4 \uC5D0\uB514\uD130"
                }),
                e.jsx("p", {
                  className: "text-xs text-gray-600 dark:text-odp-muted mb-2",
                  children: ".md \uD30C\uC77C\uC744 \uD3B8\uC9D1\uD560 \uB54C \uC0AC\uC6A9\uD560 \uC5D0\uB514\uD130\uB97C \uACE0\uB985\uB2C8\uB2E4."
                }),
                e.jsxs("div", {
                  className: "space-y-2 text-xs text-gray-700 dark:text-odp-fg",
                  children: [
                    e.jsxs("label", {
                      className: "flex items-start gap-2 cursor-pointer",
                      children: [
                        e.jsx("input", {
                          type: "radio",
                          name: "editorType",
                          value: fe,
                          checked: dr === fe,
                          onChange: () => {
                            xt(fe), ga(fe), U == null ? void 0 : U(fe);
                          },
                          className: "mt-0.5 shrink-0"
                        }),
                        e.jsxs("span", {
                          children: [
                            e.jsx("span", {
                              className: "font-semibold",
                              children: "md-editor-rt"
                            }),
                            e.jsxs("span", {
                              className: "text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5",
                              children: [
                                "\uAE30\uBCF8 \uC5D0\uB514\uD130. \uBBF8\uB9AC\uBCF4\uAE30, \uC704\uD0A4 \uC774\uBBF8\uC9C0 ",
                                e.jsx("code", {
                                  className: "px-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft",
                                  children: "![[path]]"
                                }),
                                " / ",
                                e.jsx("code", {
                                  className: "px-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft",
                                  children: "![[path|w=50%]]"
                                }),
                                ", \uC2A4\uB2C8\uD3AB \uB2E8\uCD95\uD0A4 \uB4F1\uC774 \uC774 \uAD6C\uC131\uC5D0 \uB9DE\uCDB0\uC838 \uC788\uC2B5\uB2C8\uB2E4."
                              ]
                            })
                          ]
                        })
                      ]
                    }),
                    e.jsxs("label", {
                      className: "flex items-start gap-2 cursor-not-allowed opacity-60",
                      children: [
                        e.jsx("input", {
                          type: "radio",
                          name: "editorType",
                          value: ma,
                          checked: false,
                          disabled: true,
                          className: "mt-0.5 shrink-0"
                        }),
                        e.jsxs("span", {
                          children: [
                            e.jsx("span", {
                              className: "font-semibold",
                              children: "novel"
                            }),
                            e.jsx("span", {
                              className: "text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5",
                              children: "\uC900\uBE44\uC911\uC785\uB2C8\uB2E4."
                            })
                          ]
                        })
                      ]
                    })
                  ]
                }),
                e.jsxs("div", {
                  className: "mt-4 pt-4 border-t border-gray-200 dark:border-odp-borderStrong",
                  children: [
                    e.jsxs("p", {
                      className: "text-xs text-gray-600 dark:text-odp-muted mb-3",
                      children: [
                        "\uBB38\uC11C \uC0C1\uB2E8 ",
                        e.jsx("code", {
                          className: "px-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft",
                          children: '<!-- footnotes {"v":1,"enabled":true} -->'
                        }),
                        "(note-cover \uC544\uB798)\uB85C \uBB38\uC11C\uBCC4 \uAC01\uC8FC on/off\uB97C \uC9C0\uC815\uD569\uB2C8\uB2E4. \uC5EC\uAE30\uC11C\uB294 \uBCF8\uBB38 ",
                        e.jsx("code", {
                          className: "px-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft",
                          children: "[^N]"
                        }),
                        " \uD45C\uAE30 \uBC29\uC2DD\uB9CC \uACE0\uB985\uB2C8\uB2E4."
                      ]
                    }),
                    e.jsx("p", {
                      className: "text-xs font-medium text-gray-700 dark:text-odp-fg mb-2",
                      children: "\uAC01\uC8FC \uD45C\uAE30 \uBC29\uC2DD"
                    }),
                    e.jsx("div", {
                      className: "space-y-2 text-xs text-gray-700 dark:text-odp-fg",
                      children: ha.map((d) => e.jsxs("label", {
                        className: "flex items-start gap-2 cursor-pointer",
                        children: [
                          e.jsx("input", {
                            type: "radio",
                            name: "footnoteDisplayMode",
                            value: d.value,
                            checked: cr === d.value,
                            onChange: () => {
                              fa(d.value), gt(d.value);
                            },
                            className: "mt-0.5 shrink-0"
                          }),
                          e.jsxs("span", {
                            children: [
                              e.jsx("span", {
                                className: "font-semibold",
                                children: d.label
                              }),
                              e.jsx("span", {
                                className: "text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5",
                                children: d.description
                              })
                            ]
                          })
                        ]
                      }, d.value))
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              id: "settings-advanced-search",
              tabIndex: -1,
              className: "scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong",
              children: [
                e.jsx("h3", {
                  className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2",
                  children: "Advanced Search"
                }),
                e.jsxs("p", {
                  className: "text-xs text-gray-600 dark:text-odp-muted mb-3",
                  children: [
                    e.jsx("kbd", {
                      className: "px-1 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]",
                      children: "\u2318K"
                    }),
                    " / ",
                    e.jsx("kbd", {
                      className: "px-1 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]",
                      children: "Ctrl+K"
                    }),
                    "\uB85C Spotlight \uAC80\uC0C9\uC744 \uC5FD\uB2C8\uB2E4. \uC5ED\uC0C9\uC778(Lucivy)\uC774 \uCF1C\uC838 \uC788\uC73C\uBA74 \uBB38\uC11C\xB7\uCC44\uD305 \uC800\uC7A5 \uC2DC \uD574\uB2F9 \uD56D\uBAA9\uB9CC \uC99D\uBD84 \uC0C9\uC778\uD558\uACE0, \u300C\uC0C9\uC778\u300D\uC73C\uB85C \uBCFC\uD2B8 \uC804\uCCB4\uB97C \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uB9CC\uB4ED\uB2C8\uB2E4. \uC778\uB371\uC2A4\uB294",
                    " ",
                    e.jsx("code", {
                      className: "text-[11px]",
                      children: ".advanced-search/"
                    }),
                    "(LUCE \uC2A4\uB0C5\uC0F7)\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4."
                  ]
                }),
                e.jsxs("label", {
                  className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: () => {
                        H("settings-as-animation", !Pe);
                      },
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${Pe ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": Pe,
                      "aria-label": "\uC5F4\uAE30/\uB2EB\uAE30 \uC560\uB2C8\uBA54\uC774\uC158",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Pe ? "translate-x-4" : "translate-x-0.5"}`
                      })
                    }),
                    e.jsxs("span", {
                      className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                      children: [
                        "\uC5F4\uAE30/\uB2EB\uAE30 \uC560\uB2C8\uBA54\uC774\uC158 (\uAE30\uBCF8 \uCF1C\uC9D0)",
                        e.jsx("span", {
                          className: "text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5",
                          children: "Spotlight \uD328\uB110\uC774 \uBD80\uB4DC\uB7FD\uAC8C \uB098\uD0C0\uB098\uACE0 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4. \uB044\uBA74 \uC989\uC2DC \uC804\uD658\uB429\uB2C8\uB2E4."
                        })
                      ]
                    })
                  ]
                }),
                !Me() && e.jsxs("label", {
                  className: "mt-3 flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: () => {
                        H("settings-as-index", !C.enabled);
                      },
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${C.enabled ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": C.enabled,
                      "aria-label": "\uC5ED\uC0C9\uC778 \uC0AC\uC6A9",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${C.enabled ? "translate-x-4" : "translate-x-0.5"}`
                      })
                    }),
                    e.jsxs("span", {
                      className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                      children: [
                        "\uC5ED\uC0C9\uC778 \uC0AC\uC6A9 (\uAE30\uBCF8 \uCF1C\uC9D0)",
                        e.jsx("span", {
                          className: "text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5",
                          children: "\uB044\uBA74 \uD30C\uC77C\uBA85\xB7\uACBD\uB85C\uB9CC \uAC80\uC0C9\uD569\uB2C8\uB2E4. \uCF1C\uC838 \uC788\uC73C\uBA74 \uC800\uC7A5 \uC2DC \uD56D\uC0C1 \uC99D\uBD84 \uC0C9\uC778\uD569\uB2C8\uB2E4. \uD3F4\uB354 \uACBD\uB85C(\uC608: notes/\uD68C\uC758)\uB85C\uB3C4 \uCC3E\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                        })
                      ]
                    })
                  ]
                }),
                Me() && e.jsx("p", {
                  className: "mt-3 text-[11px] text-gray-500 dark:text-odp-muted",
                  children: "Android \uC571\uC5D0\uC11C\uB294 Lucivy \uC5ED\uC0C9\uC778\uC744 \uC0AC\uC6A9\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uD30C\uC77C\uBA85\xB7\uACBD\uB85C\xB7\uCEE4\uB9E8\uB4DC\uB9CC \uAC80\uC0C9\uD569\uB2C8\uB2E4."
                }),
                !Me() && e.jsxs("label", {
                  className: "mt-3 flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: () => {
                        H("settings-as-include-other", !C.includeOtherFiles);
                      },
                      disabled: !C.enabled,
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 disabled:opacity-50 ${C.includeOtherFiles ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": C.includeOtherFiles,
                      "aria-label": "\uAE30\uD0C0 \uD30C\uC77C \uC0C9\uC778 \uD3EC\uD568",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${C.includeOtherFiles ? "translate-x-4" : "translate-x-0.5"}`
                      })
                    }),
                    e.jsxs("span", {
                      className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                      children: [
                        "\uAE30\uD0C0 \uD30C\uC77C \uC0C9\uC778 \uD3EC\uD568",
                        e.jsx("span", {
                          className: "text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5",
                          children: "\uAE30\uBCF8\uC740 Markdown\uB9CC\uC785\uB2C8\uB2E4. \uCF1C\uBA74 txt \xB7 json \xB7 html \xB7 svg \xB7 csv \uB4F1\uB3C4 \uBCF8\uBB38 \uC0C9\uC778\uC5D0 \uB123\uC2B5\uB2C8\uB2E4. \uBCC0\uACBD \uD6C4 \u300C\uB2E4\uC2DC \uC0C9\uC778\u300D\uC774 \uD544\uC694\uD569\uB2C8\uB2E4."
                        })
                      ]
                    })
                  ]
                }),
                !Me() && e.jsxs(e.Fragment, {
                  children: [
                    e.jsxs("div", {
                      className: `mt-3 rounded-md border px-3 py-2 text-xs ${C.building ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200" : C.hasIndex ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200" : "border-gray-200 bg-white text-gray-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-muted"}`,
                      children: [
                        C.building ? e.jsxs(e.Fragment, {
                          children: [
                            "\uBC31\uADF8\uB77C\uC6B4\uB4DC \uC0C9\uC778 \uC911",
                            typeof C.buildProgress == "number" ? ` \xB7 ${Math.round(C.buildProgress * 100)}%` : "\u2026"
                          ]
                        }) : C.isolationReady ? C.hasIndex ? e.jsxs(e.Fragment, {
                          children: [
                            "\uC0C9\uC778 \uC788\uC74C \xB7 \uD30C\uC77C ",
                            C.fileCount,
                            " \xB7 \uCC44\uD305",
                            " ",
                            C.chatCount,
                            C.builtAt && C.builtAt !== (/* @__PURE__ */ new Date(0)).toISOString() ? ` \xB7 \uAC31\uC2E0 ${new Date(C.builtAt).toLocaleString()}` : ""
                          ]
                        }) : e.jsx(e.Fragment, {
                          children: "\uC804\uCCB4 \uC0C9\uC778 \uC5C6\uC74C \u2014 \uC800\uC7A5\uD55C \uBB38\uC11C\xB7\uCC44\uD305\uC740 \uC99D\uBD84 \uC0C9\uC778\uB429\uB2C8\uB2E4. \uC544\uB798 \u300C\uC0C9\uC778\u300D\uC73C\uB85C \uBCFC\uD2B8 \uC804\uCCB4\uB97C \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uB9CC\uB4E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                        }) : e.jsx(e.Fragment, {
                          children: "\uAC80\uC0C9 \uC5D4\uC9C4 \uACA9\uB9AC(COOP/COEP)\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD558\uAC70\uB098 SharedArrayBuffer\uB97C \uC9C0\uC6D0\uD558\uB294 \uD658\uACBD\uC5D0\uC11C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694. \uD30C\uC77C\uBA85\xB7\uBC14\uB85C\uAC00\uAE30\uB294 \uACC4\uC18D \uAC80\uC0C9\uB429\uB2C8\uB2E4."
                        }),
                        C.lastError ? ` \xB7 \uC624\uB958: ${C.lastError}` : "",
                        C.hasCheckpoint && !C.building ? ` \xB7 \uC911\uC9C0\uB41C \uCCB4\uD06C\uD3EC\uC778\uD2B8 ${C.checkpointProcessedCount}\uAC1C` : ""
                      ]
                    }),
                    e.jsxs("div", {
                      className: "mt-3 flex flex-wrap gap-2",
                      children: [
                        e.jsxs("button", {
                          type: "button",
                          disabled: mt || !C.enabled || C.building || !C.isolationReady,
                          onClick: () => {
                            (async () => {
                              const d = await F.getRebuildCheckpointInfo();
                              if (d) {
                                _e(d), De(true);
                                return;
                              }
                              if (C.hasIndex) {
                                Ye(true);
                                return;
                              }
                              q(true), F.rebuild({
                                resume: false
                              }).finally(() => q(false));
                            })();
                          },
                          className: "inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                          children: [
                            e.jsx(Ft, {
                              size: 14
                            }),
                            C.hasCheckpoint ? "\uC0C9\uC778 \uC7AC\uAC1C/\uB2E4\uC2DC \uC2DC\uC791" : C.hasIndex ? "\uB2E4\uC2DC \uC0C9\uC778" : "\uC0C9\uC778"
                          ]
                        }),
                        C.building ? e.jsxs("button", {
                          type: "button",
                          onClick: () => F.cancelRebuild(),
                          className: "inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60",
                          title: "\uC0C9\uC778\uC744 \uC911\uC9C0\uD569\uB2C8\uB2E4. \uCCB4\uD06C\uD3EC\uC778\uD2B8\uB294 \uC720\uC9C0\uB418\uC5B4 \uC774\uC5B4\uC11C \uC7AC\uAC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                          children: [
                            e.jsx(ya, {
                              size: 14
                            }),
                            "\uC911\uC9C0"
                          ]
                        }) : null,
                        e.jsx("button", {
                          type: "button",
                          disabled: mt || C.building || !C.hasIndex,
                          onClick: () => {
                            window.confirm("\uC5ED\uC0C9\uC778 \uCE90\uC2DC(.advanced-search/)\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694? \uC0AD\uC81C \uD6C4\uC5D0\uB294 \u300C\uC0C9\uC778\u300D\uC73C\uB85C \uB2E4\uC2DC \uC0DD\uC131\uD574\uC57C \uD569\uB2C8\uB2E4.") && (q(true), F.clearCache().finally(() => q(false)));
                          },
                          className: "inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:bg-odp-bgSoft dark:text-red-300 dark:hover:bg-red-950/30",
                          children: "\uC5ED\uC0C9\uC778 \uCE90\uC2DC \uC0AD\uC81C"
                        })
                      ]
                    }),
                    e.jsx(ar, {
                      isOpen: xr,
                      info: br,
                      onCancel: () => {
                        De(false), _e(null);
                      },
                      onResume: () => {
                        De(false), _e(null), q(true), F.rebuild({
                          resume: true
                        }).finally(() => q(false));
                      },
                      onStartFresh: () => {
                        De(false), _e(null), q(true), F.rebuild({
                          resume: false
                        }).finally(() => q(false));
                      }
                    }),
                    e.jsx(ie, {
                      isOpen: ur,
                      title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
                      message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
                      confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
                      cancelLabel: "\uCDE8\uC18C",
                      onConfirm: () => {
                        Ye(false), q(true), F.rebuild({
                          resume: false
                        }).finally(() => q(false));
                      },
                      onCancel: () => Ye(false)
                    }),
                    e.jsx(rr, {
                      className: "mt-3",
                      logs: C.buildLogs || [],
                      building: C.building,
                      progress: C.buildProgress
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              id: "settings-navigation",
              tabIndex: -1,
              className: "scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong",
              children: [
                e.jsx("h3", {
                  className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2",
                  children: "\uB124\uBE44\uAC8C\uC774\uC158"
                }),
                e.jsx("p", {
                  className: "text-xs text-gray-600 dark:text-odp-muted mb-4",
                  children: "\uD0A4\uBCF4\uB4DC\uB85C \uC5D0\uB514\uD130 \uC548\uC758 \uCEE4\uC11C \uC704\uCE58\uB97C \uC870\uC808\uD558\uAC70\uB098, \uC5F4\uB9B0 \uD30C\uC77C \uC0AC\uC774\uB97C \uC774\uB3D9\uD558\uB294 \uC635\uC158\uC785\uB2C8\uB2E4. \uD0ED \uAE30\uB2A5\uC744 \uCF1C\uBA74 \uC5EC\uB7EC \uD30C\uC77C\uACFC \u300C\uB098\uC640\uC758 \uCC44\uD305\u300D\uC744 \uB3D9\uC2DC\uC5D0 \uC5F4\uC5B4 \uB450\uACE0 \uC804\uD658\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                }),
                e.jsxs("div", {
                  className: "space-y-4",
                  children: [
                    e.jsxs("label", {
                      className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                      children: [
                        e.jsx("button", {
                          type: "button",
                          onClick: () => {
                            H("settings-alt-vim", !Ae);
                          },
                          className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Ae ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                          "aria-pressed": Ae,
                          "aria-label": "Alt+Vim \uCEE4\uC11C \uC774\uB3D9",
                          children: e.jsx("span", {
                            className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Ae ? "translate-x-4" : "translate-x-0.5"}`
                          })
                        }),
                        e.jsxs("span", {
                          className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                          children: [
                            "Alt + H/J/K/L Vim \uCEE4\uC11C \uC774\uB3D9",
                            e.jsx("span", {
                              className: "text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5",
                              children: "md-editor-rt \uD3B8\uC9D1 \uC911 H\xB7L\uC740 \uD55C \uAE00\uC790\uC529, J\xB7K\uB294 \uC704\xB7\uC544\uB798 \uC904\uB85C \uCEE4\uC11C\uB9CC \uC774\uB3D9\uD569\uB2C8\uB2E4. \uC904 \uB2E8\uC704 \uC120\uD0DD\xB7\uC774\uB3D9(Alt+\uD654\uC0B4\uD45C)\uACFC\uB294 \uB2E4\uB985\uB2C8\uB2E4."
                            })
                          ]
                        })
                      ]
                    }),
                    e.jsxs("label", {
                      className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                      children: [
                        e.jsx("button", {
                          type: "button",
                          onClick: () => {
                            H("settings-workspace-tabs", !ge);
                          },
                          className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${ge ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                          "aria-pressed": ge,
                          "aria-label": "\uD0ED \uAE30\uB2A5",
                          children: e.jsx("span", {
                            className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${ge ? "translate-x-4" : "translate-x-0.5"}`
                          })
                        }),
                        e.jsxs("span", {
                          className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                          children: [
                            "\uD0ED \uAE30\uB2A5",
                            e.jsx("span", {
                              className: "text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5",
                              children: "\uC5EC\uB7EC \uD30C\uC77C\uACFC \u300C\uB098\uC640\uC758 \uCC44\uD305\u300D\uC744 \uD0ED\uC73C\uB85C \uB3D9\uC2DC\uC5D0 \uC5F4\uC5B4 \uB458 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uB044\uBA74 \uAE30\uC874\uCC98\uB7FC \uD55C \uBC88\uC5D0 \uD558\uB098\uC758 \uD30C\uC77C(\uB610\uB294 \uCC44\uD305)\uB9CC \uD45C\uC2DC\uD569\uB2C8\uB2E4. Ctrl+W \uB2EB\uAE30 \xB7 Ctrl+Tab / Ctrl+Shift+Tab \uC804\uD658 \xB7 Ctrl+Shift+T \uB2EB\uC740 \uD0ED \uB2E4\uC2DC \uC5F4\uAE30."
                            })
                          ]
                        })
                      ]
                    }),
                    ge ? e.jsxs("div", {
                      className: "pl-12 space-y-2",
                      children: [
                        e.jsx("p", {
                          className: "text-xs font-medium text-gray-700 dark:text-odp-fg",
                          children: "\uD0ED \uC790\uB3D9 \uC800\uC7A5 \uC124\uC815"
                        }),
                        e.jsx(ue, {
                          className: "flex flex-col gap-2",
                          value: bt,
                          onValueChange: (d) => {
                            d !== "off" && d !== "onFocusChange" && d !== "onWindowChange" || (ja(d), ut(d));
                          },
                          "aria-label": "\uD0ED \uC790\uB3D9 \uC800\uC7A5",
                          children: ka.map((d) => {
                            const j = bt === d.value;
                            return e.jsx(se, {
                              value: d.value,
                              className: [
                                "rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200 origin-left w-90",
                                "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                                j ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"
                              ].join(" "),
                              children: e.jsxs("div", {
                                className: j ? "" : "opacity-50",
                                children: [
                                  e.jsx("div", {
                                    className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong",
                                    children: d.label
                                  }),
                                  e.jsx("div", {
                                    className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
                                    children: d.description
                                  })
                                ]
                              })
                            }, d.value);
                          })
                        })
                      ]
                    }) : null
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              id: "settings-display",
              tabIndex: -1,
              className: "scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong",
              children: [
                e.jsx("h3", {
                  className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2",
                  children: "\uD45C\uC2DC \uC635\uC158"
                }),
                e.jsxs("label", {
                  className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: N,
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${f ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": f,
                      "aria-label": "\uC4F0\uB808\uAE30\uD1B5 \uBCF4\uAE30 \uD1A0\uAE00",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${f ? "translate-x-4" : "translate-x-0.5"}`
                      })
                    }),
                    e.jsx("span", {
                      className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                      children: "\uC4F0\uB808\uAE30\uD1B5 \uBCF4\uAE30 (`.trash` \uD3F4\uB354)"
                    })
                  ]
                }),
                e.jsxs("label", {
                  className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: p,
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${l ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": l,
                      "aria-label": "\uC228\uAE40 \uD3F4\uB354 \uBCF4\uAE30 \uD1A0\uAE00",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${l ? "translate-x-4" : "translate-x-0.5"}`
                      })
                    }),
                    e.jsx("span", {
                      className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                      children: "\uC228\uAE40 \uD3F4\uB354 \uBCF4\uAE30 (\uC774\uB984\uC774 `.` \uC73C\uB85C \uC2DC\uC791\uD558\uB294 \uD3F4\uB354, `.trash` \uC81C\uC678)"
                    })
                  ]
                }),
                typeof E == "function" && e.jsxs("label", {
                  className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: E,
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${v ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": v,
                      "aria-label": "\uB179\uC74C\xB7\uD544\uAE30 \uB3D9\uBC18 \uD30C\uC77C \uC228\uAE30\uAE30",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${v ? "translate-x-4" : "translate-x-0.5"}`
                      })
                    }),
                    e.jsx("span", {
                      className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                      children: "\uB179\uC74C\xB7\uD544\uAE30 \uB3D9\uAE30\uD654 \uD30C\uC77C \uC228\uAE30\uAE30 (\uC0AC\uC774\uB4DC\uBC14 \uBAA9\uB85D\xB7\uB179\uC74C UI\xB7\uB3D9\uAE30\uD654 \uBCF4\uAE30\uC5D0\uC11C \uC81C\uC678)"
                    })
                  ]
                }),
                typeof A == "function" && e.jsxs("label", {
                  className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: A,
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${w ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": w,
                      "aria-label": "\uD2B8\uB9AC \uD3F4\uB354 \uACBD\uB85C sticky \uD45C\uC2DC",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${w ? "translate-x-4" : "translate-x-0.5"}`
                      })
                    }),
                    e.jsx("span", {
                      className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                      children: "\uD2B8\uB9AC\uC5D0\uC11C \uC5F4\uB9B0 \uD3F4\uB354 \uACBD\uB85C sticky \uD45C\uC2DC (\uC2A4\uD06C\uB864 \uC2DC \uD604\uC7AC \uACBD\uB85C \uACE0\uC815)"
                    })
                  ]
                }),
                typeof x == "function" && e.jsxs("label", {
                  className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: x,
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${m ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": m,
                      "aria-label": "\uD2B8\uB9AC \uC218\uC815 \uB0A0\uC9DC \uD45C\uC2DC",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${m ? "translate-x-4" : "translate-x-0.5"}`
                      })
                    }),
                    e.jsx("span", {
                      className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                      children: "\uD2B8\uB9AC \uD30C\uC77C\uBA85 \uC544\uB798 \uC218\uC815 \uB0A0\uC9DC \uD45C\uC2DC (yy-MM-dd hh:mm:ss, \uACF5\uAC04\uC5D0 \uB530\uB77C \uCD95\uC57D)"
                    })
                  ]
                }),
                typeof S == "function" && e.jsxs("div", {
                  className: "mt-4 pt-4 border-t border-gray-200 dark:border-odp-borderSoft",
                  children: [
                    e.jsx("p", {
                      className: "text-xs font-semibold text-gray-700 dark:text-odp-fg mb-1",
                      children: "\uC0AC\uC774\uB4DC\uBC14 \uD30C\uC77C \uC774\uB3D9 \uB4DC\uB798\uADF8 \uC2DC \uD3F4\uB354 \uC790\uB3D9 \uD3BC\uCE68 \uB300\uAE30 \uC2DC\uAC04"
                    }),
                    e.jsx("p", {
                      className: "text-[11px] text-gray-500 dark:text-odp-muted mb-3",
                      children: "\uD30C\uC77C\uC744 \uB4DC\uB798\uADF8\uD55C \uCC44\uB85C \uC811\uD78C \uD3F4\uB354 \uC704\uC5D0 \uC62C\uB824\uB450\uBA74, \uC124\uC815\uD55C \uC2DC\uAC04 \uD6C4 \uD574\uB2F9 \uD3F4\uB354\uAC00 \uD3BC\uCCD0\uC9D1\uB2C8\uB2E4. \uAE30\uBCF8 \uB2E8\uC704\uB294 \uCD08(s)\uC785\uB2C8\uB2E4."
                    }),
                    e.jsxs("div", {
                      className: "flex flex-wrap items-center gap-3",
                      children: [
                        e.jsxs("label", {
                          className: "flex items-center gap-2 text-xs text-gray-700 dark:text-odp-fg",
                          children: [
                            e.jsx("span", {
                              className: "sr-only",
                              children: "\uB300\uAE30 \uC2DC\uAC04"
                            }),
                            e.jsx("input", {
                              type: "number",
                              min: 0,
                              step: g.unit === "ms" ? 1 : 0.1,
                              value: g.value,
                              onChange: (d) => {
                                const j = Number(d.target.value);
                                S({
                                  ...g,
                                  value: Number.isFinite(j) && j >= 0 ? j : 0
                                });
                              },
                              className: "w-24 border border-gray-300 dark:border-odp-borderSoft rounded px-2 py-1.5 text-sm bg-white dark:bg-odp-bgSoft text-gray-800 dark:text-odp-fg",
                              "aria-label": "\uD3F4\uB354 \uC790\uB3D9 \uD3BC\uCE68 \uB300\uAE30 \uC2DC\uAC04"
                            })
                          ]
                        }),
                        e.jsx("div", {
                          className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg",
                          children: e.jsxs(ue, {
                            className: "flex items-center gap-3",
                            value: g.unit,
                            onValueChange: (d) => {
                              d !== "s" && d !== "ms" || g.unit !== d && S({
                                unit: d,
                                value: Na(g.value, g.unit, d)
                              });
                            },
                            "aria-label": "\uB300\uAE30 \uC2DC\uAC04 \uB2E8\uC704",
                            children: [
                              e.jsxs("label", {
                                className: "flex items-center gap-1.5 cursor-pointer",
                                children: [
                                  e.jsx(se, {
                                    value: "s",
                                    className: "size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                                    children: e.jsx(ve, {
                                      className: "relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white"
                                    })
                                  }),
                                  e.jsx("span", {
                                    children: "\uCD08 (s)"
                                  })
                                ]
                              }),
                              e.jsxs("label", {
                                className: "flex items-center gap-1.5 cursor-pointer",
                                children: [
                                  e.jsx(se, {
                                    value: "ms",
                                    className: "size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                                    children: e.jsx(ve, {
                                      className: "relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white"
                                    })
                                  }),
                                  e.jsx("span", {
                                    children: "\uBC00\uB9AC\uCD08 (ms)"
                                  })
                                ]
                              })
                            ]
                          })
                        }),
                        e.jsxs("span", {
                          className: "text-[11px] text-gray-500 dark:text-odp-muted",
                          children: [
                            "= ",
                            Sa(g),
                            " ms"
                          ]
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              id: "settings-wiki-image",
              tabIndex: -1,
              className: "scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong",
              children: [
                e.jsx("h3", {
                  className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2",
                  children: "\uC704\uD0A4 \uC774\uBBF8\uC9C0 \uCE90\uC2F1 \uBC29\uC2DD"
                }),
                e.jsxs("p", {
                  className: "text-xs text-gray-600 dark:text-odp-muted mb-2",
                  children: [
                    "md \uBB38\uC11C\uC758 ",
                    e.jsx("code", {
                      className: "px-1 mx-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]",
                      children: "![[path]]"
                    }),
                    " ",
                    "/ ",
                    e.jsx("code", {
                      className: "px-1 mx-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]",
                      children: "![[path|320x200]]"
                    }),
                    " \uC774\uBBF8\uC9C0\uC5D0 \uB300\uD574 \uC5B4\uB5A4 \uBC29\uC2DD\uC73C\uB85C \uCE90\uC2F1\uD560\uC9C0 \uC120\uD0DD\uD569\uB2C8\uB2E4."
                  ]
                }),
                e.jsxs("div", {
                  className: "space-y-1 text-xs text-gray-700 dark:text-odp-fg",
                  children: [
                    e.jsxs("label", {
                      className: "flex items-center gap-2 cursor-pointer",
                      children: [
                        e.jsx("input", {
                          type: "radio",
                          name: "wikiImageCacheMode",
                          value: Be,
                          checked: it === Be,
                          onChange: () => {
                            ct(Be), Mt(Be);
                          }
                        }),
                        e.jsx("span", {
                          className: "font-semibold",
                          children: "Blob \uCE90\uC2DC (\uAD8C\uC7A5)"
                        }),
                        e.jsx("span", {
                          className: "text-[11px] text-gray-500 dark:text-odp-muted",
                          children: "S3\uC5D0\uC11C \uC774\uBBF8\uC9C0\uB97C Blob\uC73C\uB85C \uBC1B\uC544 IndexedDB\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4. \uB9CC\uB8CC \uD6C4\uC5D0\uB3C4 \uB85C\uCEEC\uC5D0\uC11C \uBC14\uB85C \uBD88\uB7EC\uC62C \uC218 \uC788\uC5B4 \uD2B8\uB798\uD53D\uC774 \uC904\uC5B4\uB4ED\uB2C8\uB2E4."
                        })
                      ]
                    }),
                    e.jsxs("label", {
                      className: "flex items-center gap-2 cursor-pointer",
                      children: [
                        e.jsx("input", {
                          type: "radio",
                          name: "wikiImageCacheMode",
                          value: Ke,
                          checked: it === Ke,
                          onChange: () => {
                            ct(Ke), Mt(Ke);
                          }
                        }),
                        e.jsx("span", {
                          className: "font-semibold",
                          children: "Presigned URL \uCE90\uC2DC"
                        }),
                        e.jsx("span", {
                          className: "text-[11px] text-gray-500 dark:text-odp-muted",
                          children: "Presigned URL\uACFC \uB9CC\uB8CC \uC2DC\uAC01\uB9CC \uC800\uC7A5\uD569\uB2C8\uB2E4. Blob\uC740 \uCE90\uC2F1\uD558\uC9C0 \uC54A\uC9C0\uB9CC, URL\uC774 \uC720\uD6A8\uD55C \uB3D9\uC548\uC5D0\uB294 \uC7AC\uC694\uCCAD \uC5C6\uC774 \uBE60\uB974\uAC8C \uD45C\uC2DC\uB429\uB2C8\uB2E4."
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            e.jsx("div", {
              id: "settings-snippets",
              tabIndex: -1,
              className: "scroll-mt-4",
              children: e.jsx(Ga, {
                value: I,
                onChange: D,
                onSave: _,
                isSaving: T,
                isLoaded: ee
              })
            }),
            e.jsx(Ha, {}),
            e.jsx(Ja, {}),
            e.jsx(Va, {}),
            e.jsxs("div", {
              id: "settings-chat",
              tabIndex: -1,
              className: "scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong",
              children: [
                e.jsx("h3", {
                  className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2",
                  children: "\uB098\uC640\uC758 \uCC44\uD305"
                }),
                e.jsx("p", {
                  className: "text-xs text-gray-600 dark:text-odp-muted mb-4",
                  children: "\uCC44\uD305 \uC785\uB825\uCC3D \uC544\uB798 \uB2E8\uCD95\uD0A4 \uC548\uB0B4 \uBB38\uAD6C \uD45C\uC2DC \uC5EC\uBD80\uB97C \uC124\uC815\uD569\uB2C8\uB2E4."
                }),
                e.jsxs("label", {
                  className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: () => {
                        H("settings-composer-helper", !Le);
                      },
                      className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Le ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": Le,
                      "aria-label": "\uC785\uB825\uCC3D \uB2E8\uCD95\uD0A4 \uC548\uB0B4 \uD45C\uC2DC",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Le ? "translate-x-4" : "translate-x-0.5"}`
                      })
                    }),
                    e.jsxs("span", {
                      className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                      children: [
                        "\uC785\uB825\uCC3D \uB2E8\uCD95\uD0A4 \uC548\uB0B4 \uD45C\uC2DC",
                        e.jsx("span", {
                          className: "text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5",
                          children: "\uB044\uBA74 \uC785\uB825\uCC3D \uC544\uB798 helper text\uAC00 \uC228\uACA8\uC9D1\uB2C8\uB2E4. \uCC44\uD305\uC5D0\uC11C X\uB85C \uB2EB\uC740 \uB4A4\uC5D0\uB3C4 \uC5EC\uAE30\uC11C \uB2E4\uC2DC \uCF24 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            e.jsx(qa, {}),
            e.jsxs("div", {
              id: "settings-app-update",
              tabIndex: -1,
              className: "scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong",
              children: [
                e.jsx("h3", {
                  className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2",
                  children: "\uC571 \uC5C5\uB370\uC774\uD2B8"
                }),
                e.jsx("p", {
                  className: "text-xs text-gray-600 dark:text-odp-muted mb-3",
                  children: "\uBC30\uD3EC \uBE4C\uB4DC \uD574\uC2DC\uC640 \uC11C\uBE44\uC2A4 \uC6CC\uCEE4(PWA) \uCE90\uC2DC\uB97C \uD655\uC778\uD574 \uCD5C\uC2E0 \uBC84\uC804\uC774 \uC788\uB294\uC9C0 \uD655\uC778\uD558\uACE0, \uBC14\uB85C \uC801\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                }),
                e.jsxs("dl", {
                  className: "mb-3 space-y-1 text-xs text-gray-600 dark:text-odp-muted",
                  children: [
                    e.jsxs("div", {
                      className: "flex flex-wrap gap-x-2 gap-y-0.5",
                      children: [
                        e.jsx("dt", {
                          className: "shrink-0 font-semibold text-gray-700 dark:text-odp-fgStrong",
                          children: "\uD604\uC7AC \uBC84\uC804"
                        }),
                        e.jsx("dd", {
                          className: "min-w-0 break-all font-mono",
                          children: wa() || "\uC54C \uC218 \uC5C6\uC74C"
                        })
                      ]
                    }),
                    Ce ? e.jsxs("div", {
                      className: "flex flex-wrap gap-x-2 gap-y-0.5",
                      children: [
                        e.jsx("dt", {
                          className: "shrink-0 font-semibold text-gray-700 dark:text-odp-fgStrong",
                          children: "\uCD5C\uC2E0 \uBC84\uC804"
                        }),
                        e.jsx("dd", {
                          className: "min-w-0 break-all font-mono",
                          children: Ce
                        })
                      ]
                    }) : null
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  onClick: () => Se == null ? void 0 : Se(),
                  disabled: we || typeof Se != "function",
                  className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-60",
                  children: [
                    e.jsx(Ft, {
                      size: 16
                    }),
                    we ? "\uCD5C\uC2E0 \uBC84\uC804 \uD655\uC778 \uC911..." : "\uCD5C\uC2E0 \uBC84\uC804 \uD655\uC778 \uBC0F \uC989\uC2DC \uC5C5\uB370\uC774\uD2B8"
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  };
});
export {
  __tla,
  _s as default
};
