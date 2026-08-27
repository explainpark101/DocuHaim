const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-RydzSnnb.js","assets/vendor-react-kfkzeLNk.js","assets/vendor-md-editor-BebLMpT_.js","assets/vendor-aws-BPUgBAdC.js","assets/vendor-lucide-DsWVGDs1.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-9P87yVtW.js","assets/vendor-radix-BWhlk-Y9.js","assets/vendor-google-genai-BXoTgYIl.js","assets/index-BtEdh9W6.css"])))=>i.map(i=>d[i]);
import { _ as ea, __tla as __tla_0 } from "./vendor-md-editor-BebLMpT_.js";
import { r, j as e, e as Mr, u as ta, __tla as __tla_1 } from "./vendor-react-kfkzeLNk.js";
import { at as Ot, au as ra, av as aa, aw as sa, ax as na, ay as ce, az as oa, aA as la, aB as da, aC as ia, aD as ca, aE as rr, aF as ar, aG as oe, aH as sr, aI as nr, aJ as xa, aK as ua, aL as ba, aM as pa, aN as or, aO as lr, aP as ct, aQ as ga, aR as ma, aS as ha, aT as dr, aU as gt, aV as fa, aW as ir, aX as cr, aY as je, aZ as Be, a_ as Fe, a$ as ya, b0 as ka, b1 as ja, b2 as xr, b3 as va, b4 as Na, b5 as Or, b6 as X, b7 as Ee, b8 as Ve, b9 as Je, ba as Sa, bb as Ar, F as le, bc as ur, bd as wa, be as Ca, bf as Ea, bg as Ia, bh as La, bi as Ma, bj as Oa, bk as Aa, bl as Kt, bm as Pa, bn as Da, bo as Ut, bp as Ta, bq as za, br as _a, bs as br, bt as Ra, bu as Ba, bv as At, bw as Fa, bx as Va, by as pr, bz as $a, bA as Ka, bB as Ua, bC as Ga, bD as Ha, bE as Wa, bF as Xa, bG as qa, bH as mt, bI as Ya, bJ as Pt, bK as Ja, bL as Qa, bM as gr, bN as Za, bO as es, bP as ts, bQ as rs, bR as as, bS as Pr, bT as Gt, bU as ss, bV as ns, bW as os, bX as ls, bY as ds, bZ as is, b_ as cs, b$ as xs, c0 as Dt, c1 as Dr, c2 as us, c3 as mr, c4 as bs, c5 as ps, c6 as gs, c7 as ms, c8 as hr, c9 as hs, ca as fs, cb as ys, cc as ks, cd as js, ce as vs, cf as Ns, cg as Ss, ch as fr, ci as ws, cj as Cs, ck as yr, cl as Es, cm as kr, cn as jr, co as Tt, cp as Is, cq as Ls, cr as Ms, cs as Os, ct as As, cu as Ps, cv as qe, cw as Ds, cx as Ts, cy as zs, cz as _s, cA as xt, cB as vr, cC as Rs, cD as Bs, cE as Fs, cF as Vs, cG as $s, cH as Ks, cI as ut, cJ as Nr, cK as bt, cL as Us, cM as Gs, __tla as __tla_2 } from "./index-RydzSnnb.js";
import { z as Tr, R as Wt, D as zr, G as Qe, J as de, K as ie, N as Hs, O as ht, X as _r, Q as Ws, L as me, V as Rr, W as Xs, i as qs, Y as Ys, Z as Js, _ as Qs, $ as Zs, a0 as en } from "./vendor-lucide-DsWVGDs1.js";
import { T as tn } from "./TableStyleTemplateEditor-DvYR2A_i.js";
import { S as Sr } from "./SliderWithScrubInput-B2qoXP-p.js";
import { S as Br, b as Fr, r as Le, s as be, t as Ie, D as rn, v as an, w as sn, x as nn, y as on, z as ln, h as dn, B as cn, j as xn, k as un, E as bn } from "./vendor-radix-BWhlk-Y9.js";
import "./vendor-aws-BPUgBAdC.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-9P87yVtW.js";
import "./vendor-google-genai-BXoTgYIl.js";
import "./index-DKf8xmDw.js";
let Do;
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
  function ge(t) {
    if (t == null || Number.isNaN(t)) return "\uC54C \uC218 \uC5C6\uC74C";
    if (t < 1024) return `${t} B`;
    const a = t / 1024;
    if (a < 1024) return `${a.toFixed(1)} KB`;
    const s = a / 1024;
    return s < 1024 ? `${s.toFixed(1)} MB` : `${(s / 1024).toFixed(1)} GB`;
  }
  function pn(t) {
    const a = String(t || "").toLowerCase(), s = a.lastIndexOf(".");
    return s <= 0 || s === a.length - 1 ? "(none)" : a.slice(s + 1);
  }
  function gn(t) {
    const a = String(t || "").replace(/^\/+/, "");
    return a === Ot || a === `${Ot}/` || a.startsWith(`${Ot}/`);
  }
  function Vr(t) {
    var _a2;
    if (t.type === "file") return typeof t.size == "number" && Number.isFinite(t.size) ? t.size : 0;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let a = 0;
    for (const s of t.children) a += Vr(s);
    return a;
  }
  function $r(t) {
    var _a2;
    if (t.type === "file") return 1;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let a = 0;
    for (const s of t.children) a += $r(s);
    return a;
  }
  function mn(t) {
    const a = Array.isArray(t) ? t : [];
    let s = 0, l = 0, n = 0, d = 0, i = 0, c = 0, m = 0;
    const k = /* @__PURE__ */ new Map(), j = (x) => {
      var _a2;
      for (const g of x) {
        if (g.type === "folder") {
          l += 1, ((_a2 = g.children) == null ? void 0 : _a2.length) && j(g.children);
          continue;
        }
        if (g.type !== "file") continue;
        s += 1;
        const I = typeof g.size == "number" && Number.isFinite(g.size), w = I ? g.size : 0;
        I ? w === 0 && (n += 1) : d += 1, i += w;
        const u = g.path || g.name;
        gn(u) && (c += w, m += 1);
        const P = pn(g.name), N = k.get(P) ?? {
          count: 0,
          size: 0,
          files: []
        };
        N.count += 1, N.size += w, N.files.push({
          path: u,
          name: g.name,
          size: I ? w : null,
          node: g
        }), k.set(P, N);
      }
    };
    j(a);
    const y = [
      ...k.entries()
    ].map(([x, { count: g, size: I, files: w }]) => ({
      ext: x,
      label: x === "(none)" ? "(\uD655\uC7A5\uC790 \uC5C6\uC74C)" : `.${x}`,
      count: g,
      size: I,
      percent: i > 0 ? I / i * 100 : 0,
      files: [
        ...w
      ].sort((u, P) => (P.size ?? -1) - (u.size ?? -1) || u.path.localeCompare(P.path))
    })).sort((x, g) => g.size - x.size || g.count - x.count || x.label.localeCompare(g.label)), v = [], b = (x, g, I) => {
      var _a2;
      const w = x.filter((u) => u.type === "folder").map((u) => ({
        node: u,
        size: Vr(u),
        fileCount: $r(u)
      })).sort((u, P) => P.size - u.size || u.node.name.localeCompare(P.node.name));
      for (const { node: u, size: P, fileCount: N } of w) {
        const p = u.path || `${u.name}/`, h = (u.children ?? []).some((M) => M.type === "folder");
        v.push({
          path: p,
          name: u.name,
          depth: g,
          parentPath: I,
          hasChildFolders: h,
          size: P,
          fileCount: N,
          percent: i > 0 ? P / i * 100 : 0
        }), ((_a2 = u.children) == null ? void 0 : _a2.length) && b(u.children, g + 1, p);
      }
    };
    return b(a, 0, null), {
      summary: {
        totalSize: i,
        fileCount: s,
        folderCount: l,
        zeroByteCount: n,
        unknownSizeCount: d,
        indexSize: c,
        indexFileCount: m
      },
      byExtension: y,
      folders: v
    };
  }
  function hn(t) {
    return !t || typeof t != "string" ? "" : t.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
  }
  function fn(t) {
    const a = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), s = [];
    (a ? t.metaKey : t.ctrlKey) && s.push("mod"), t.altKey && s.push("alt"), t.shiftKey && s.push("shift");
    const l = (t.key || "").toLowerCase();
    return !l || l === "shift" || l === "control" || l === "alt" || l === "meta" || (s.push(l), s.length <= 1) ? null : s.join("+");
  }
  function zt(t) {
    if (!t || typeof t != "string") return "";
    const s = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "Cmd" : "Ctrl";
    return t.toLowerCase().replace(/\bmod\b/g, s).split("+").map((l) => l.trim().charAt(0).toUpperCase() + l.trim().slice(1)).join(" + ");
  }
  function yn() {
    return {
      id: String(Date.now()) + "-" + Math.random().toString(36).slice(2),
      name: "",
      prefix: "",
      body: "",
      description: ""
    };
  }
  function kn({ value: t, onChange: a, onSave: s, isSaving: l = false, isLoaded: n = true }) {
    const [d, i] = r.useState(() => t || {
      snippets: []
    }), [c, m] = r.useState(null), [k, j] = r.useState(null);
    r.useEffect(() => {
      i(t || {
        snippets: []
      });
    }, [
      t
    ]), r.useEffect(() => {
      if (!c) return;
      const N = (p) => {
        p.preventDefault(), p.stopPropagation();
        const h = fn(p);
        h && j(h);
      };
      return window.addEventListener("keydown", N, true), () => window.removeEventListener("keydown", N, true);
    }, [
      c
    ]);
    const y = (N) => {
      const p = {
        snippets: N
      };
      i(p), a == null ? void 0 : a(p);
    }, v = () => {
      y([
        ...d.snippets || [],
        yn()
      ]);
    }, b = (N, p, h) => {
      const M = (d.snippets || []).map((z) => z.id === N ? {
        ...z,
        [p]: h
      } : z);
      y(M);
    }, x = (N) => {
      const p = (d.snippets || []).filter((h) => h.id !== N);
      y(p);
    }, g = (N) => {
      m(N), j(null);
    }, I = () => {
      m(null), j(null);
    }, w = () => {
      !c || !k || (b(c, "prefix", k), I());
    }, u = () => {
      const p = (d.snippets || []).map((R) => {
        const T = (R.prefix || "").trim(), Z = hn(T) || T;
        return {
          ...R,
          name: (R.name || "").trim(),
          prefix: Z,
          body: (R.body || "").replace(/\r\n/g, `
`),
          description: (R.description || "").trim()
        };
      });
      if (p.find((R) => !R.prefix || !R.body)) {
        alert("\uAC01 \uC2A4\uB2C8\uD3AB\uC5D0\uB294 \uB2E8\uCD95\uD0A4(shortcut)\uC640 body\uAC00 \uBAA8\uB450 \uD544\uC694\uD569\uB2C8\uB2E4.");
        return;
      }
      const M = /* @__PURE__ */ new Set();
      for (const R of p) {
        if (M.has(R.prefix)) {
          alert(`\uC911\uBCF5\uB41C \uB2E8\uCD95\uD0A4 "${R.prefix}" \uC774(\uAC00) \uC788\uC2B5\uB2C8\uB2E4. \uAC01 \uB2E8\uCD95\uD0A4\uB294 \uACE0\uC720\uD574\uC57C \uD569\uB2C8\uB2E4.`);
          return;
        }
        M.add(R.prefix);
      }
      const z = {
        snippets: p
      };
      i(z), a == null ? void 0 : a(z), s == null ? void 0 : s(z);
    }, P = d.snippets || [];
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
            P.map((N) => e.jsxs("div", {
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
                          value: N.name || "",
                          onChange: (p) => b(N.id, "name", p.target.value),
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
                              title: N.prefix ? zt(N.prefix) : "",
                              children: N.prefix ? zt(N.prefix) : "\uBBF8\uC124\uC815"
                            }),
                            e.jsx("button", {
                              type: "button",
                              className: "shrink-0 px-2 py-1 text-[11px] rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
                              onClick: () => g(N.id),
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
                      value: N.body || "",
                      onChange: (p) => b(N.id, "body", p.target.value),
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
                          value: N.description || "",
                          onChange: (p) => b(N.id, "description", p.target.value),
                          placeholder: "\uC608: TODO \uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC2A4\uB2C8\uD3AB"
                        })
                      ]
                    }),
                    e.jsx("button", {
                      type: "button",
                      className: "mt-4 sm:mt-6 px-2 py-1 text-[11px] text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/40 rounded hover:bg-red-50 dark:hover:bg-red-900/20 whitespace-nowrap",
                      onClick: () => {
                        window.confirm("\uC774 \uC2A4\uB2C8\uD3AB\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?") && x(N.id);
                      },
                      children: "\uC0AD\uC81C"
                    })
                  ]
                })
              ]
            }, N.id))
          ]
        }),
        e.jsxs("div", {
          className: "flex items-center justify-between gap-2 pt-1",
          children: [
            e.jsx("button", {
              type: "button",
              onClick: v,
              className: "px-3 py-1.5 text-xs rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
              children: "\uC2A4\uB2C8\uD3AB \uCD94\uAC00"
            }),
            e.jsx("button", {
              type: "button",
              onClick: u,
              disabled: l,
              className: "px-3 py-1.5 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition",
              children: l ? "\uC800\uC7A5 \uC911..." : "\uC2A4\uB2C8\uD3AB JSON \uC800\uC7A5"
            })
          ]
        }),
        c != null && e.jsx("div", {
          className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "snippet-shortcut-modal-title",
          onClick: I,
          children: e.jsxs("div", {
            className: "bg-white dark:bg-odp-surface rounded-lg shadow-xl border border-gray-200 dark:border-odp-borderStrong p-5 w-full max-w-sm",
            onClick: (N) => N.stopPropagation(),
            onKeyDown: (N) => N.stopPropagation(),
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
                children: k ? e.jsx("span", {
                  className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                  children: zt(k)
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
                    onClick: I,
                    className: "px-3 py-1.5 text-xs rounded border border-gray-300 dark:border-odp-borderStrong text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
                    children: "\uCDE8\uC18C"
                  }),
                  e.jsx("button", {
                    type: "button",
                    onClick: w,
                    disabled: !k,
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
  function jn() {
    const [t, a] = r.useState([]), [s, l] = r.useState(false), [n, d] = r.useState(false), [i, c] = r.useState(null), [m, k] = r.useState(false), [j, y] = r.useState(null), [v, b] = r.useState(null), x = r.useCallback(async () => {
      c(null);
      try {
        const u = await ra();
        a(u.files), l(true);
      } catch (u) {
        c(u instanceof Error ? u.message : String(u)), l(true);
      }
    }, []);
    r.useEffect(() => {
      x();
    }, [
      x
    ]);
    const g = () => {
      y(null), k(true);
    }, I = (u) => {
      y(u), k(true);
    }, w = async () => {
      if (v) {
        d(true), c(null);
        try {
          const u = await oa(v.id);
          a(u.files), b(null);
        } catch (u) {
          c(u instanceof Error ? u.message : String(u));
        } finally {
          d(false);
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
        i ? e.jsx("p", {
          className: "mb-2 text-xs text-red-600 dark:text-red-400",
          role: "alert",
          children: i
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
              children: aa.map((u) => e.jsxs("li", {
                className: "flex items-center justify-between rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsx("div", {
                        className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                        style: {
                          fontFamily: u.name
                        },
                        children: u.name
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
              }, u.id))
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
                  disabled: !s || n,
                  onClick: g,
                  className: "inline-flex items-center gap-1 rounded bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
                  children: [
                    e.jsx(Tr, {
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
                    e.jsx(Wt, {
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
        s ? t.length === 0 ? e.jsx("p", {
          className: "rounded border border-dashed border-gray-200 px-3 py-4 text-center text-xs text-gray-400 dark:border-odp-borderStrong dark:text-odp-muted",
          children: "\uC544\uC9C1 \uCD94\uAC00\uB41C \uC6F9\uD3F0\uD2B8 \uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \u300C\uC6F9\uD3F0\uD2B8 \uCD94\uAC00\u300D\uB85C CSS\uB97C \uC800\uC7A5\uD558\uC138\uC694."
        }) : e.jsx("ul", {
          className: "space-y-2",
          children: t.map((u) => {
            const P = sa(u.css);
            return e.jsxs("li", {
              className: "flex flex-wrap items-center gap-2 rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: [
                e.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    e.jsx("div", {
                      className: "truncate text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                      children: u.name
                    }),
                    e.jsxs("div", {
                      className: "truncate text-[10px] text-gray-400 dark:text-odp-muted",
                      children: [
                        u.filename,
                        P.length ? ` \xB7 ${P.join(", ")}` : ""
                      ]
                    }),
                    P.length > 0 ? e.jsx("ul", {
                      className: "mt-1 flex flex-wrap gap-1",
                      children: P.map((N) => e.jsx("li", {
                        className: "rounded-full border border-gray-100 bg-gray-50 px-1.5 py-0.5 text-[10px] dark:border-odp-border dark:bg-odp-bg",
                        style: {
                          fontFamily: N
                        },
                        children: N
                      }, N))
                    }) : null
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: n,
                  onClick: () => I(u),
                  className: "inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg",
                  children: [
                    e.jsx(zr, {
                      className: "h-3 w-3",
                      "aria-hidden": true
                    }),
                    "\uD3B8\uC9D1"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: n,
                  onClick: () => b(u),
                  className: "inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40",
                  children: [
                    e.jsx(Qe, {
                      className: "h-3 w-3",
                      "aria-hidden": true
                    }),
                    "\uC0AD\uC81C"
                  ]
                })
              ]
            }, u.id);
          })
        }) : e.jsx("p", {
          className: "text-xs text-gray-500 dark:text-odp-muted",
          children: "\uBD88\uB7EC\uC624\uB294 \uC911\u2026"
        }),
        e.jsx(na, {
          isOpen: m,
          initialFile: j,
          onClose: () => {
            k(false), y(null);
          },
          onSaved: () => {
            x();
          }
        }),
        e.jsx(ce, {
          isOpen: !!v,
          title: "\uC6F9\uD3F0\uD2B8 \uC0AD\uC81C",
          message: v ? `"${v.name}" (${v.filename}) \uD30C\uC77C\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694\uAE4C\uC694?` : "",
          confirmLabel: "\uC0AD\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: () => {
            w();
          },
          onCancel: () => b(null)
        })
      ]
    });
  }
  function vn() {
    const [t, a] = r.useState([]), [s, l] = r.useState(false), [n, d] = r.useState(false), [i, c] = r.useState(null), [m, k] = r.useState(null), [j, y] = r.useState(false), v = r.useCallback(async () => {
      c(null);
      try {
        const x = await la();
        a(x.templates), l(true);
      } catch (x) {
        c(x instanceof Error ? x.message : String(x)), a(da().templates), l(true);
      }
    }, []);
    r.useEffect(() => {
      v();
    }, [
      v
    ]);
    const b = async (x) => {
      d(true), c(null);
      try {
        await ia({
          ...ca,
          templates: x
        }), a(x);
      } catch (g) {
        c(g instanceof Error ? g.message : String(g));
      } finally {
        d(false);
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
        i ? e.jsx("p", {
          className: "mb-2 text-xs text-red-600",
          children: i
        }) : null,
        e.jsxs("div", {
          className: "mb-3 flex gap-2",
          children: [
            e.jsx("button", {
              type: "button",
              disabled: !s || n,
              onClick: () => {
                const x = `template-${Date.now().toString(36)}`;
                k({
                  id: x,
                  name: "\uC0C8 \uD15C\uD50C\uB9BF",
                  sections: {},
                  rules: [
                    {
                      rows: "odd",
                      bg: "#f5f5f5"
                    }
                  ]
                }), y(true);
              },
              className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
              children: "\uC0C8 \uD15C\uD50C\uB9BF"
            }),
            e.jsx("button", {
              type: "button",
              disabled: n,
              onClick: () => {
                v();
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
                        k(x), y(true);
                      },
                      children: "\uD3B8\uC9D1"
                    }),
                    e.jsx("button", {
                      type: "button",
                      className: "rounded px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
                      onClick: () => {
                        b(t.filter((g) => g.id !== x.id));
                      },
                      children: "\uC0AD\uC81C"
                    })
                  ]
                })
              ]
            }, x.id)),
            s && t.length === 0 ? e.jsx("li", {
              className: "text-xs text-gray-400",
              children: "\uB4F1\uB85D\uB41C \uD15C\uD50C\uB9BF\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
            }) : null
          ]
        }),
        e.jsx(tn, {
          isOpen: j,
          template: m,
          onClose: () => {
            y(false), k(null);
          },
          onSave: (x) => {
            const g = t.filter((I) => I.id !== (m == null ? void 0 : m.id) && I.id !== x.id);
            b([
              ...g,
              x
            ]).then(() => {
              y(false), k(null);
            });
          }
        })
      ]
    });
  }
  const Nn = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), Sn = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function pt({ label: t, description: a, checked: s, onCheckedChange: l, ariaLabel: n }) {
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
              children: a
            })
          ]
        }),
        e.jsx(Br, {
          className: Nn(s),
          checked: s,
          onCheckedChange: l,
          "aria-label": n,
          children: e.jsx(Fr, {
            className: Sn
          })
        })
      ]
    });
  }
  function wn() {
    const [t, a] = r.useState(() => rr());
    return r.useEffect(() => {
      const s = () => a(rr());
      return s(), window.addEventListener(ar, s), () => window.removeEventListener(ar, s);
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
                e.jsx(pt, {
                  label: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5",
                  description: "\uB4DC\uB798\uADF8 \uC2DC \uD398\uC774\uC9C0 \uAC00\uB85C\xB7\uC138\uB85C \uC911\uC559\uC120\uC5D0 \uB9DE\uCDA4",
                  checked: t.centerSnapEnabled,
                  onCheckedChange: (s) => oe("settings-cover-center-snap", s),
                  ariaLabel: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5"
                }),
                e.jsxs("label", {
                  className: "block space-y-1 pt-1",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-400",
                      children: "\uD5C8\uC6A9 \uC624\uCC28"
                    }),
                    e.jsx(Sr, {
                      unit: "css",
                      suffix: "px",
                      min: nr,
                      max: sr,
                      step: 0.1,
                      value: t.centerSnapTolerancePx,
                      "aria-label": "\uAC00\uC6B4\uB370 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (s) => xa(s)
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              className: "space-y-2 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: [
                e.jsx(pt, {
                  label: "\uAC1C\uCCB4 \uC2A4\uB0C5",
                  description: "\uB2E4\uB978 \uAC1C\uCCB4\uC758 \uD14C\uB450\uB9AC\xB7\uAC00\uC6B4\uB370\uC120\uC5D0 \uB9DE\uCDA4 (\uADF8\uB8F9\uC740 \uD1B5\uC9F8\uB85C)",
                  checked: t.objectSnapEnabled,
                  onCheckedChange: (s) => oe("settings-cover-object-snap", s),
                  ariaLabel: "\uAC1C\uCCB4 \uC2A4\uB0C5"
                }),
                e.jsxs("label", {
                  className: "block space-y-1 pt-1",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-400",
                      children: "\uD5C8\uC6A9 \uC624\uCC28"
                    }),
                    e.jsx(Sr, {
                      unit: "css",
                      suffix: "px",
                      min: nr,
                      max: sr,
                      step: 0.1,
                      value: t.objectSnapTolerancePx,
                      "aria-label": "\uAC1C\uCCB4 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (s) => ua(s)
                    })
                  ]
                })
              ]
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(pt, {
                label: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC",
                description: "\uC120\uD0DD\uACFC \uBB34\uAD00\uD558\uAC8C \uBAA8\uB4E0 \uD14D\uC2A4\uD2B8 \uC0C1\uC790\uB97C \uC605\uC740 \uBD89\uC740 \uC2E4\uC120\uC73C\uB85C \uD45C\uC2DC",
                checked: t.textContainerOutlineEnabled,
                onCheckedChange: (s) => oe("settings-cover-text-outline", s),
                ariaLabel: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC"
              })
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(pt, {
                label: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30",
                description: "\uD14D\uC2A4\uD2B8\xB7\uC774\uBBF8\uC9C0\xB7\uB3C4\uD615 \uC0BD\uC785 \uC2DC \uBC18\uD22C\uBA85 \uACE0\uC2A4\uD2B8 \uBBF8\uB9AC\uBCF4\uAE30",
                checked: t.placePreviewEnabled,
                onCheckedChange: (s) => oe("settings-cover-place-preview", s),
                ariaLabel: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30"
              })
            }),
            e.jsxs("p", {
              className: "text-[11px] text-gray-500 dark:text-odp-muted",
              children: [
                "\uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28 \uAE30\uBCF8\uAC12 ",
                ba,
                "px \xB7 0.1px \uB2E8\uC704"
              ]
            })
          ]
        })
      ]
    });
  }
  function Cn() {
    const [t, a] = r.useState(""), [s, l] = r.useState(""), [n, d] = r.useState(null), [i, c] = r.useState(false);
    r.useEffect(() => {
      const b = () => {
        const g = ha();
        a(g), l(g);
      };
      b(), pa().then((g) => {
        a(g.url), l(g.url);
      });
      const x = () => b();
      return window.addEventListener(or, x), () => window.removeEventListener(or, x);
    }, []);
    const m = lr(t) !== s, k = lr(t), j = !!String(t || "").trim() && !k, y = async () => {
      const b = String(t || "").trim();
      if (b && !k) {
        d("https:// \uB85C \uC2DC\uC791\uD558\uB294 Worker \uC8FC\uC18C\uB97C \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      c(true), d(null);
      try {
        const x = await dr(b);
        a(x), l(x), d(x ? `\uC800\uC7A5\uB428 \u2014 ${ct}\uC5D0 \uAE30\uB85D\uD588\uACE0, OG \uC694\uCCAD \uC2DC \uC774 Worker\uB97C \uAC00\uC7A5 \uBA3C\uC800 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.` : `Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${ct}).`);
      } finally {
        c(false);
      }
    }, v = async () => {
      c(true), d(null);
      try {
        a("");
        const b = await dr("");
        l(b), d(`Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${ct}).`);
      } finally {
        c(false);
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
              children: ct
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
              href: ga,
              target: "_blank",
              rel: "noreferrer noopener",
              className: "inline-block",
              children: e.jsx("img", {
                src: ma,
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
          disabled: i,
          onChange: (b) => {
            a(b.target.value), d(null);
          },
          onKeyDown: (b) => {
            b.key === "Enter" && (b.preventDefault(), y());
          }
        }),
        j ? e.jsx("p", {
          className: "mt-1 text-[11px] text-red-600 dark:text-red-400",
          children: "https:// \uB610\uB294 http:// \uB85C \uC2DC\uC791\uD558\uB294 \uC720\uD6A8\uD55C URL\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4."
        }) : null,
        e.jsxs("div", {
          className: "mt-3 flex flex-wrap items-center gap-2",
          children: [
            e.jsx("button", {
              type: "button",
              onClick: () => {
                y();
              },
              disabled: i || !m && !j,
              className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
              children: i ? "\uC800\uC7A5 \uC911\u2026" : "\uC800\uC7A5"
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => {
                v();
              },
              disabled: i || !s && !t,
              className: "rounded px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-odp-muted dark:hover:bg-odp-focusBg",
              children: "\uC9C0\uC6B0\uAE30"
            }),
            s ? e.jsxs("span", {
              className: "truncate text-[11px] text-emerald-600 dark:text-emerald-400",
              children: [
                "\uC0AC\uC6A9 \uC911: ",
                s
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
  function ke({ id: t, title: a, open: s, onOpenChange: l, children: n }) {
    return e.jsxs("section", {
      id: `settings-group-${t}`,
      "aria-labelledby": `settings-group-${t}-title`,
      className: "scroll-mt-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50/80 dark:border-odp-borderStrong dark:bg-odp-surface/80",
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: () => l(!s),
          "aria-expanded": s,
          "aria-controls": `settings-group-${t}-panel`,
          id: `settings-group-${t}-title`,
          className: "flex w-full items-center gap-2 px-4 py-3 text-left transition hover:bg-gray-100/80 dark:hover:bg-odp-focusBg/40",
          children: [
            s ? e.jsx(de, {
              size: 16,
              className: "shrink-0 text-gray-500 dark:text-odp-muted"
            }) : e.jsx(ie, {
              size: 16,
              className: "shrink-0 text-gray-500 dark:text-odp-muted"
            }),
            e.jsx("span", {
              className: "text-sm font-bold text-gray-800 dark:text-odp-fgStrong",
              children: a
            })
          ]
        }),
        s ? e.jsx("div", {
          id: `settings-group-${t}-panel`,
          className: "space-y-4 border-t border-gray-200 px-4 pb-4 pt-3 dark:border-odp-borderStrong",
          children: n
        }) : null
      ]
    });
  }
  const Xt = [
    {
      id: "storage-connection",
      title: "\uC800\uC7A5\uC18C \uBC0F \uC5F0\uACB0",
      sections: [
        {
          id: "settings-desktop-entry-lock",
          label: "\uC571 \uC785\uC7A5 \uC7A0\uAE08",
          visible: (t) => t.isDesktopApp
        },
        {
          id: "settings-storage",
          label: "\uAE30\uBCF8 \uC800\uC7A5\uC18C \uC120\uD0DD"
        },
        {
          id: "settings-s3",
          label: "S3 \uC5F0\uACB0 \uC815\uBCF4"
        },
        {
          id: "settings-webdav",
          label: "WebDAV \uC5F0\uACB0 \uC815\uBCF4"
        },
        {
          id: "settings-local",
          label: "Local \uC5F0\uACB0 \uC815\uBCF4"
        },
        {
          id: "settings-backup",
          label: "\uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0"
        },
        {
          id: "settings-webauthn",
          label: "\uC9C0\uBB38 / \uBCF4\uC548 \uD0A4",
          visible: (t) => t.showWebAuthnSection
        },
        {
          id: "settings-storage-usage",
          label: "\uC800\uC7A5\uC18C \uC0AC\uC6A9\uB7C9",
          visible: (t) => t.canScanStorageUsage
        }
      ]
    },
    {
      id: "ai",
      title: "AI",
      sections: [
        {
          id: "settings-llm-providers",
          label: "AI \uB3C4\uC6B0\uBBF8 \uC81C\uACF5\uC790"
        },
        {
          id: "settings-mlx-vlm",
          label: "MLX-VLM",
          visible: () => gt()
        }
      ]
    },
    {
      id: "integrations",
      title: "\uC678\uBD80 \uC5F0\uB3D9",
      sections: [
        {
          id: "settings-unused-images",
          label: "\uBBF8\uC0AC\uC6A9 / \uC911\uBCF5 \uC774\uBBF8\uC9C0"
        },
        {
          id: "settings-imgbb",
          label: "ImgBB"
        },
        {
          id: "settings-og",
          label: "Open Graph Worker"
        }
      ]
    },
    {
      id: "editor-content",
      title: "\uC5D0\uB514\uD130 \uBC0F \uCF58\uD150\uCE20",
      sections: [
        {
          id: "settings-editor",
          label: "\uB9C8\uD06C\uB2E4\uC6B4 \uC5D0\uB514\uD130"
        },
        {
          id: "settings-snippets",
          label: "\uC2A4\uB2C8\uD3AB \uB2E8\uCD95\uD0A4"
        },
        {
          id: "settings-table-styles",
          label: "\uD45C \uC2A4\uD0C0\uC77C"
        },
        {
          id: "settings-cover",
          label: "\uCEE4\uBC84"
        },
        {
          id: "settings-webfonts",
          label: "\uC6F9\uD3F0\uD2B8"
        }
      ]
    },
    {
      id: "search",
      title: "\uAC80\uC0C9",
      sections: [
        {
          id: "settings-advanced-search",
          label: "Advanced Search"
        }
      ]
    },
    {
      id: "ui-navigation",
      title: "UI \uBC0F \uB124\uBE44\uAC8C\uC774\uC158",
      sections: [
        {
          id: "settings-navigation",
          label: "\uB124\uBE44\uAC8C\uC774\uC158"
        },
        {
          id: "settings-display",
          label: "\uD45C\uC2DC \uC635\uC158"
        },
        {
          id: "settings-wiki-image",
          label: "\uC704\uD0A4 \uC774\uBBF8\uC9C0 \uCE90\uC2F1"
        }
      ]
    },
    {
      id: "chat",
      title: "\uCC44\uD305",
      sections: [
        {
          id: "settings-chat",
          label: "\uB098\uC640\uC758 \uCC44\uD305"
        }
      ]
    },
    {
      id: "app",
      title: "\uC571",
      sections: [
        {
          id: "settings-app-update",
          label: "\uC571 \uC5C5\uB370\uC774\uD2B8"
        }
      ]
    }
  ], En = /* @__PURE__ */ new Set([
    "settings-llm-providers",
    "settings-llm-provider",
    "settings-gemini",
    "settings-openai-compat",
    "settings-mlx-vlm"
  ]);
  function In(t) {
    return Xt.map((a) => ({
      ...a,
      sections: a.sections.filter((s) => {
        var _a2;
        return ((_a2 = s.visible) == null ? void 0 : _a2.call(s, t)) !== false;
      })
    })).filter((a) => a.sections.length > 0);
  }
  function wr(t) {
    for (const a of Xt) if (a.sections.some((s) => s.id === t)) return a.id;
    return null;
  }
  const Ht = "s3haim-settings-section-open";
  function Cr(t) {
    typeof window > "u" || window.dispatchEvent(new CustomEvent(Ht, {
      detail: {
        sectionId: t
      }
    }));
  }
  function Er(t) {
    const a = String(t || "").replace(/^#/, "");
    return En.has(a) && a !== "settings-mlx-vlm" ? "settings-llm-providers" : a;
  }
  function Ln(t = true) {
    const a = {};
    for (const s of Xt) a[s.id] = t;
    return a;
  }
  function Mn(t, a) {
    const s = a.trim().toLowerCase();
    if (!s) return t;
    const l = [];
    for (const n of t) {
      const i = n.title.toLowerCase().includes(s) ? n.sections : n.sections.filter((c) => c.label.toLowerCase().includes(s));
      i.length !== 0 && l.push({
        ...n,
        sections: i
      });
    }
    return l;
  }
  function On({ groups: t, activeSectionId: a, onNavigate: s }) {
    const [l, n] = r.useState(""), d = r.useMemo(() => Mn(t, l), [
      t,
      l
    ]), i = l.trim();
    return e.jsxs("aside", {
      "aria-label": "\uC124\uC815 \uBAA9\uCC28",
      className: "hidden w-[min(16rem,28vw)] shrink-0 border-l border-gray-200 bg-gray-50/90 dark:border-odp-borderStrong dark:bg-odp-surface/90 lg:flex lg:flex-col",
      children: [
        e.jsxs("div", {
          className: "border-b border-gray-200 px-3 py-2.5 dark:border-odp-borderStrong",
          children: [
            e.jsxs("div", {
              className: "mb-2 flex items-center gap-2",
              children: [
                e.jsx(Hs, {
                  size: 15,
                  className: "shrink-0 text-gray-500 dark:text-odp-muted"
                }),
                e.jsx("span", {
                  className: "text-xs font-bold text-gray-700 dark:text-odp-fgStrong",
                  children: "\uC124\uC815 \uBAA9\uCC28"
                })
              ]
            }),
            e.jsxs("div", {
              className: "relative",
              children: [
                e.jsx(ht, {
                  size: 13,
                  className: "pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-odp-muted",
                  "aria-hidden": true
                }),
                e.jsx("input", {
                  type: "search",
                  value: l,
                  onChange: (c) => n(c.target.value),
                  placeholder: "\uADF8\uB8F9 \xB7 \uC139\uC158 \uAC80\uC0C9",
                  "aria-label": "\uC124\uC815 \uBAA9\uCC28 \uAC80\uC0C9",
                  className: "w-full rounded-md border border-gray-200 bg-white py-1.5 pl-7 pr-2 text-[11px] text-gray-800 outline-none ring-blue-500/30 placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:placeholder:text-odp-muted dark:focus:border-blue-500"
                })
              ]
            })
          ]
        }),
        e.jsx("nav", {
          className: "flex-1 overflow-y-auto px-2 py-2",
          children: d.length === 0 ? e.jsx("p", {
            className: "px-2 py-3 text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
            children: i ? `"${i}"\uC5D0 \uB9DE\uB294 \uADF8\uB8F9\xB7\uC139\uC158\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.` : "\uD45C\uC2DC\uD560 \uC124\uC815 \uC5C6\uC74C"
          }) : e.jsx("ul", {
            className: "space-y-3",
            children: d.map((c) => e.jsxs("li", {
              children: [
                e.jsx("div", {
                  className: "px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-odp-muted",
                  children: c.title
                }),
                e.jsx("ul", {
                  className: "mt-1 space-y-0.5",
                  children: c.sections.map((m) => {
                    const k = a === m.id;
                    return e.jsx("li", {
                      children: e.jsx("button", {
                        type: "button",
                        onClick: () => s(m.id),
                        "aria-current": k ? "location" : void 0,
                        className: [
                          "w-full rounded-md px-2 py-1.5 text-left text-[11px] leading-snug transition",
                          k ? "bg-blue-100 font-semibold text-blue-900 dark:bg-blue-950/50 dark:text-blue-100" : "text-gray-700 hover:bg-white hover:text-gray-900 dark:text-odp-fg dark:hover:bg-odp-bgSoft dark:hover:text-odp-fgStrong"
                        ].join(" "),
                        children: m.label
                      })
                    }, m.id);
                  })
                })
              ]
            }, c.id))
          })
        })
      ]
    });
  }
  const _t = "size-3.5 rounded-full border border-gray-400 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft", Rt = "relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white";
  function An(t) {
    return t === Fe ? "Google Gemini" : t === Be ? "MLX-VLM (local)" : "OpenAI \uD638\uD658";
  }
  function Pn() {
    return {
      id: Na(),
      name: "",
      kind: je,
      baseUrl: "",
      keyInput: "",
      hasStoredKey: false
    };
  }
  function Dn(t) {
    return {
      id: t.id,
      name: t.name,
      kind: t.kind,
      baseUrl: t.baseUrl,
      keyInput: "",
      hasStoredKey: !!t.apiKey.trim()
    };
  }
  function Tn({ profiles: t, onSaveProfiles: a }) {
    const [s, l] = r.useState(true), [n, d] = r.useState(null), [i, c] = r.useState(null), [m, k] = r.useState(null), [j, y] = r.useState(0), [v, b] = r.useState(""), x = r.useMemo(() => i ? t.find((p) => p.id === i) ?? null : null, [
      i,
      t
    ]);
    r.useEffect(() => {
      if (!n) {
        b("");
        return;
      }
      b(fa(n.id, n.kind) || ir(n.kind));
    }, [
      n == null ? void 0 : n.id,
      n == null ? void 0 : n.kind
    ]);
    const g = r.useCallback((p) => {
      n && (b(p), cr(n.id, p));
    }, [
      n
    ]), I = () => {
      c(null), d(Pn());
    }, w = (p) => {
      c(p.id), d(Dn(p));
    }, u = () => {
      d(null), c(null);
    }, P = () => {
      if (!n) return;
      const p = va({
        name: n.name,
        kind: n.kind,
        baseUrl: n.baseUrl,
        apiKey: n.keyInput,
        hasStoredKey: n.hasStoredKey
      });
      if (p) {
        alert(p);
        return;
      }
      const h = n.keyInput.trim() || ((x == null ? void 0 : x.id) === n.id ? x.apiKey : ""), M = {
        id: n.id,
        name: n.name.trim(),
        kind: n.kind,
        baseUrl: n.kind === je ? xr(n.baseUrl) : "",
        apiKey: h
      }, R = t.some((T) => T.id === M.id) ? t.map((T) => T.id === M.id ? M : T) : [
        ...t,
        M
      ];
      a(R), u();
    }, N = () => {
      if (!m) return;
      const p = t.filter((h) => h.id !== m.id);
      a(p), (n == null ? void 0 : n.id) === m.id && u(), k(null);
    };
    return e.jsxs("div", {
      id: "settings-llm-providers",
      tabIndex: -1,
      className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: () => l((p) => !p),
          className: "flex w-full items-center gap-2 text-left",
          "aria-expanded": s,
          children: [
            s ? e.jsx(de, {
              size: 16,
              className: "shrink-0 text-gray-500 dark:text-odp-muted"
            }) : e.jsx(ie, {
              size: 16,
              className: "shrink-0 text-gray-500 dark:text-odp-muted"
            }),
            e.jsx("h3", {
              className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
              children: "AI \uB3C4\uC6B0\uBBF8 \uC81C\uACF5\uC790"
            })
          ]
        }),
        s ? e.jsxs(e.Fragment, {
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
              children: t.map((p) => e.jsxs("li", {
                className: "flex items-center justify-between gap-2 rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: [
                  e.jsxs("div", {
                    className: "min-w-0",
                    children: [
                      e.jsx("div", {
                        className: "truncate text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                        children: p.name
                      }),
                      e.jsxs("div", {
                        className: "truncate text-[11px] text-gray-500 dark:text-odp-muted",
                        children: [
                          An(p.kind),
                          p.kind === je && p.baseUrl ? ` \xB7 ${p.baseUrl}` : p.kind === Be ? " \xB7 Apple Silicon local" : ""
                        ]
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "flex shrink-0 items-center gap-1",
                    children: [
                      e.jsxs("button", {
                        type: "button",
                        onClick: () => w(p),
                        className: "inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg",
                        children: [
                          e.jsx(zr, {
                            className: "h-3 w-3",
                            "aria-hidden": true
                          }),
                          "\uD3B8\uC9D1"
                        ]
                      }),
                      e.jsxs("button", {
                        type: "button",
                        onClick: () => k(p),
                        className: "inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40",
                        children: [
                          e.jsx(Qe, {
                            className: "h-3 w-3",
                            "aria-hidden": true
                          }),
                          "\uC0AD\uC81C"
                        ]
                      })
                    ]
                  })
                ]
              }, p.id))
            }),
            n ? e.jsxs("div", {
              className: "space-y-3 rounded border border-gray-200 bg-white p-3 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: [
                e.jsx("p", {
                  className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong",
                  children: i ? "\uC81C\uACF5\uC790 \uD3B8\uC9D1" : "\uC81C\uACF5\uC790 \uCD94\uAC00"
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
                      onChange: (p) => d((h) => h && {
                        ...h,
                        name: p.target.value
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
                    e.jsxs(Le, {
                      className: "flex flex-wrap items-center gap-4",
                      value: n.kind,
                      onValueChange: (p) => {
                        if (p !== Fe && p !== je && p !== Be) return;
                        const h = p, M = ir(h);
                        d((z) => z && (cr(z.id, M), {
                          ...z,
                          kind: h,
                          keyInput: "",
                          hasStoredKey: (x == null ? void 0 : x.kind) === h && !!x.apiKey.trim()
                        })), b(M), y((z) => z + 1);
                      },
                      "aria-label": "\uC81C\uACF5\uC790 \uC885\uB958",
                      children: [
                        e.jsxs("label", {
                          className: "flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg",
                          children: [
                            e.jsx(be, {
                              value: Fe,
                              className: _t,
                              children: e.jsx(Ie, {
                                className: Rt
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
                            e.jsx(be, {
                              value: je,
                              className: _t,
                              children: e.jsx(Ie, {
                                className: Rt
                              })
                            }),
                            e.jsx("span", {
                              children: "OpenAI \uD638\uD658"
                            })
                          ]
                        }),
                        gt() ? e.jsxs("label", {
                          className: "flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg",
                          children: [
                            e.jsx(be, {
                              value: Be,
                              className: _t,
                              children: e.jsx(Ie, {
                                className: Rt
                              })
                            }),
                            e.jsx("span", {
                              children: "MLX-VLM (\uB85C\uCEEC, Apple Silicon)"
                            })
                          ]
                        }) : null
                      ]
                    })
                  ]
                }),
                n.kind === Be ? e.jsxs("div", {
                  className: "rounded border border-emerald-200 bg-emerald-50/60 p-2.5 text-[11px] leading-relaxed text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-100",
                  children: [
                    "MLX-VLM \uC11C\uBC84 \uC2DC\uC791\xB7\uBAA8\uB378 \uC124\uCE58\uB294 \uC124\uC815\uC758",
                    " ",
                    e.jsx("a", {
                      href: "#settings-mlx-vlm",
                      className: "underline",
                      children: "MLX-VLM (Tauri macOS)"
                    }),
                    " ",
                    "\uC139\uC158\uC5D0\uC11C \uAD00\uB9AC\uD558\uC138\uC694."
                  ]
                }) : null,
                n.kind === je ? e.jsxs("div", {
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
                      onChange: (p) => d((h) => h && {
                        ...h,
                        baseUrl: p.target.value
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
                        n.kind === je ? " (\uC120\uD0DD)" : ""
                      ]
                    }),
                    e.jsx("input", {
                      type: "password",
                      autoComplete: "off",
                      className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bg",
                      value: n.keyInput,
                      onChange: (p) => d((h) => h && {
                        ...h,
                        keyInput: p.target.value
                      }),
                      placeholder: n.hasStoredKey ? "\uC800\uC7A5\uB428 \u2014 \uBCC0\uACBD \uC2DC \uC0C8 \uD0A4 \uC785\uB825" : n.kind === Fe ? "AI Studio API \uD0A4 \uC785\uB825" : "Bearer \uD1A0\uD070 (\uB85C\uCEEC \uC11C\uBC84\uB294 \uBE44\uC6CC \uB450\uC138\uC694)"
                    })
                  ]
                }),
                e.jsxs("div", {
                  children: [
                    e.jsx("label", {
                      className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                      children: "\uAE30\uBCF8 \uBAA8\uB378"
                    }),
                    n.kind === Fe ? e.jsx(ya, {
                      getGeminiApiKey: () => n.keyInput.trim() || ((x == null ? void 0 : x.kind) === Fe ? x.apiKey : ""),
                      profileId: n.id,
                      value: v,
                      onChange: g,
                      autoLoad: n.hasStoredKey || !!n.keyInput.trim()
                    }, `${n.id}-${j}`) : n.kind === Be ? e.jsx(ka, {
                      value: v,
                      onChange: g,
                      autoLoad: true
                    }, `${n.id}-${j}`) : e.jsx(ja, {
                      getBaseUrl: () => n.baseUrl,
                      getApiKey: () => n.keyInput.trim() || ((x == null ? void 0 : x.kind) === je ? x.apiKey : ""),
                      value: v,
                      onChange: g,
                      autoLoad: !!xr(n.baseUrl)
                    }, `${n.id}-${j}`)
                  ]
                }),
                e.jsxs("div", {
                  className: "flex justify-end gap-2 pt-1",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: u,
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
              onClick: I,
              className: "inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs hover:bg-gray-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:hover:bg-odp-focusBg",
              children: [
                e.jsx(Tr, {
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
        e.jsx(ce, {
          isOpen: !!m,
          title: "\uC81C\uACF5\uC790 \uC0AD\uC81C",
          message: m ? `"${m.name}" \uC81C\uACF5\uC790\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694?` : "",
          confirmLabel: "\uC0AD\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: N,
          onCancel: () => k(null)
        })
      ]
    });
  }
  function zn({ open: t, extension: a, onOpenChange: s, onOpenFile: l }) {
    const n = (a == null ? void 0 : a.files) ?? [], d = a ? `${a.label} \uD30C\uC77C` : "\uD30C\uC77C \uBAA9\uB85D";
    return e.jsx(rn, {
      open: t,
      onOpenChange: s,
      children: e.jsxs(an, {
        children: [
          e.jsx(sn, {
            className: "fixed inset-0 z-100000 bg-black/40"
          }),
          e.jsxs(nn, {
            className: "fixed top-1/2 left-1/2 z-100001 flex max-h-[min(90vh,40rem)] w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft",
            "aria-describedby": void 0,
            children: [
              e.jsxs("div", {
                className: "flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-odp-borderStrong",
                children: [
                  e.jsxs("div", {
                    className: "min-w-0",
                    children: [
                      e.jsx(on, {
                        className: "truncate text-sm font-semibold text-gray-800 dark:text-odp-fgStrong",
                        children: d
                      }),
                      a ? e.jsxs("p", {
                        className: "mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted",
                        children: [
                          a.count.toLocaleString(),
                          "\uAC1C \xB7 ",
                          ge(a.size)
                        ]
                      }) : null
                    ]
                  }),
                  e.jsx(ln, {
                    asChild: true,
                    children: e.jsx("button", {
                      type: "button",
                      className: "inline-flex shrink-0 items-center justify-center rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-odp-focusBg dark:hover:text-odp-fg",
                      "aria-label": "\uB2EB\uAE30",
                      children: e.jsx(_r, {
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
                  children: n.map((i) => e.jsx("li", {
                    children: e.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        l(i);
                      },
                      className: "flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition hover:bg-gray-50 dark:hover:bg-odp-focusBg/40",
                      children: [
                        e.jsx(Ws, {
                          size: 14,
                          className: "shrink-0 text-gray-400 dark:text-odp-muted",
                          "aria-hidden": true
                        }),
                        e.jsxs("span", {
                          className: "min-w-0 flex-1",
                          children: [
                            e.jsx("span", {
                              className: "block truncate text-xs font-medium text-gray-800 dark:text-odp-fgStrong",
                              children: i.name
                            }),
                            e.jsx("span", {
                              className: "mt-0.5 block truncate font-mono text-[10px] text-gray-500 dark:text-odp-muted",
                              title: i.path,
                              children: i.path
                            })
                          ]
                        }),
                        e.jsx("span", {
                          className: "shrink-0 tabular-nums text-[11px] text-gray-600 dark:text-odp-muted",
                          children: ge(i.size)
                        })
                      ]
                    })
                  }, i.path))
                })
              })
            ]
          })
        ]
      })
    });
  }
  const _n = 160;
  function Rn(t) {
    return t === "error" ? "text-red-600 dark:text-red-400" : t === "warn" ? "text-amber-700 dark:text-amber-300" : t === "ok" ? "text-emerald-700 dark:text-emerald-300" : "text-gray-600 dark:text-odp-muted";
  }
  function Kr({ logs: t, building: a = false, progress: s = null, className: l = "" }) {
    const n = r.useRef(null);
    return r.useEffect(() => {
      var _a2;
      t.length !== 0 && ((_a2 = n.current) == null ? void 0 : _a2.scrollToIndex(t.length - 1, {
        align: "end"
      }));
    }, [
      t,
      a
    ]), !a && t.length === 0 ? null : e.jsxs("div", {
      className: `overflow-hidden rounded-md border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft ${l}`,
      children: [
        e.jsxs("div", {
          className: "flex items-center justify-between gap-2 border-b border-gray-100 px-2.5 py-1.5 dark:border-odp-borderSoft",
          children: [
            e.jsxs("span", {
              className: "text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong",
              children: [
                "\uC0C9\uC778 \uB85C\uADF8",
                a ? " (\uC2E4\uC2DC\uAC04)" : ""
              ]
            }),
            a && typeof s == "number" ? e.jsxs("span", {
              className: "text-[10px] tabular-nums text-amber-700 dark:text-amber-300",
              children: [
                Math.round(s * 100),
                "%"
              ]
            }) : null
          ]
        }),
        a && typeof s == "number" ? e.jsx("div", {
          className: "h-0.5 w-full bg-gray-100 dark:bg-odp-bg",
          children: e.jsx("div", {
            className: "h-full bg-blue-500 transition-[width] duration-200 ease-out dark:bg-blue-400",
            style: {
              width: `${Math.min(100, Math.max(0, s * 100))}%`
            }
          })
        }) : null,
        t.length === 0 ? e.jsx("p", {
          className: "px-2.5 py-1.5 font-mono text-[10px] text-gray-400 dark:text-odp-muted",
          children: "\uB300\uAE30 \uC911\u2026"
        }) : e.jsx(Or, {
          ref: n,
          className: "overscroll-contain px-2.5 py-1.5 font-mono text-[10px] leading-relaxed",
          style: {
            height: _n
          },
          data: t,
          "aria-live": "polite",
          "aria-relevant": "additions",
          children: (d) => e.jsxs("div", {
            className: `whitespace-pre-wrap break-all ${Rn(d.level)}`,
            children: [
              e.jsx("span", {
                className: "text-gray-400 dark:text-odp-muted",
                children: Bn(d.at)
              }),
              " ",
              d.message
            ]
          }, d.id)
        })
      ]
    });
  }
  function Bn(t) {
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
  function Ur({ isOpen: t, info: a, onResume: s, onStartFresh: l, onCancel: n }) {
    const d = (a == null ? void 0 : a.processedFileCount) ?? 0, i = (a == null ? void 0 : a.processedChatCount) ?? 0, c = d + i, m = (a == null ? void 0 : a.updatedAt) && a.updatedAt > 0 ? new Date(a.updatedAt).toLocaleString() : null;
    return e.jsx(ce, {
      isOpen: t,
      title: "\uC911\uC9C0\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8",
      message: c > 0 ? `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778\uC774 \uC788\uC2B5\uB2C8\uB2E4.
\uCC98\uB9AC\uB428: \uD30C\uC77C ${d} \xB7 \uCC44\uD305 day ${i}${m ? `
\uC800\uC7A5 \uC2DC\uAC01: ${m}` : ""}

\uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAE4C\uC694, \uC544\uB2C8\uBA74 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uB9CC\uB4E4\uAE4C\uC694?` : `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4.
\uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAE4C\uC694, \uC544\uB2C8\uBA74 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uB9CC\uB4E4\uAE4C\uC694?`,
      confirmLabel: "\uC774\uC5B4\uC11C \uC0C9\uC778",
      discardLabel: "\uCC98\uC74C\uBD80\uD130",
      cancelLabel: "\uCDE8\uC18C",
      onConfirm: s,
      onDiscard: l,
      onCancel: n
    });
  }
  const Ye = [
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
  ], Fn = `linear-gradient(90deg, ${Ye.map((t) => `rgb(${t.rgb.join(" ")}) ${(t.t * 100).toFixed(2)}%`).join(", ")})`;
  function Ir(t) {
    return Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : 0;
  }
  function Bt(t, a, s) {
    return Math.round(t + (a - t) * s);
  }
  function Vn(t) {
    const a = Ir(t / 100);
    let s = 0;
    for (; s < Ye.length - 2 && a > Ye[s + 1].t; ) s += 1;
    const l = Ye[s], n = Ye[s + 1], d = n.t - l.t || 1, i = Ir((a - l.t) / d), c = Bt(l.rgb[0], n.rgb[0], i), m = Bt(l.rgb[1], n.rgb[1], i), k = Bt(l.rgb[2], n.rgb[2], i);
    return `rgb(${c} ${m} ${k})`;
  }
  function Lr({ percent: t }) {
    const a = Vn(t);
    return e.jsxs("span", {
      className: "inline-flex items-center justify-end gap-1.5",
      children: [
        e.jsx("span", {
          className: "inline-block size-2.5 shrink-0 rounded-full border border-gray-300/80 shadow-sm dark:border-odp-borderStrong",
          style: {
            backgroundColor: a
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
  function $n() {
    return e.jsxs("div", {
      className: "space-y-0.5",
      "aria-label": "\uC6A9\uB7C9 \uBE44\uC728 \uC0C9\uC0C1 \uBC94\uB840",
      children: [
        e.jsx("div", {
          className: "h-1.5 w-full rounded-full border border-gray-200 dark:border-odp-borderStrong",
          style: {
            backgroundImage: Fn
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
  function Kn(t) {
    return t === Ve ? "Local Haim" : t === Je ? "WebDAV Haim" : t === Ee ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function Un() {
    return e.jsx("div", {
      className: "flex h-40 min-h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-white text-xs text-gray-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted md:h-full md:min-h-48",
      children: "\uADF8\uB798\uD504 \uC900\uBE44\uC911"
    });
  }
  function Gn({ depth: t, expandable: a, expanded: s, label: l }) {
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
        a ? e.jsx("span", {
          className: "inline-flex size-4 shrink-0 items-center justify-center text-gray-500 dark:text-odp-muted",
          "aria-hidden": true,
          children: s ? e.jsx(de, {
            size: 14
          }) : e.jsx(ie, {
            size: 14
          })
        }) : e.jsx("span", {
          className: "inline-block size-4 shrink-0",
          "aria-hidden": true
        }),
        e.jsx("span", {
          className: "min-w-0 truncate",
          children: l
        })
      ]
    });
  }
  function Ft({ columns: t, rows: a, emptyText: s = "\uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", maxHeightClass: l = "max-h-64", legendColumnKey: n = null }) {
    return e.jsx("div", {
      className: `${l} overflow-auto rounded-md border border-gray-200 dark:border-odp-borderStrong`,
      children: e.jsxs("table", {
        className: "min-w-full border-separate border-spacing-0 text-left text-xs",
        children: [
          e.jsx("thead", {
            className: "text-gray-600 dark:text-odp-muted",
            children: e.jsx("tr", {
              children: t.map((d) => e.jsx("th", {
                className: `sticky top-0 z-10 border-b border-gray-200 bg-gray-100 px-3 py-2 font-semibold whitespace-nowrap dark:border-odp-borderStrong dark:bg-odp-bgSoft ${d.align === "right" ? "text-right" : "text-left"} ${d.className ?? ""}`,
                children: d.header
              }, d.key))
            })
          }),
          e.jsx("tbody", {
            className: "bg-white dark:bg-odp-bgSofter",
            children: a.length === 0 ? e.jsx("tr", {
              children: e.jsx("td", {
                colSpan: t.length,
                className: "px-3 py-6 text-center text-gray-500 dark:text-odp-muted",
                children: s
              })
            }) : a.map((d, i) => {
              var _a2, _b, _c, _d;
              const c = typeof d._onClick == "function", m = ((_a2 = d._tree) == null ? void 0 : _a2.expandable) ? d._tree.expanded : void 0, k = (_c = (_b = a[i - 1]) == null ? void 0 : _b._tree) == null ? void 0 : _c.depth, j = (_d = d._tree) == null ? void 0 : _d.depth, y = i > 0 && typeof k == "number" && typeof j == "number" && j < k, v = (b) => {
                var _a3;
                c && (b.key !== "Enter" && b.key !== " " || (b.preventDefault(), (_a3 = d._onClick) == null ? void 0 : _a3.call(d)));
              };
              return e.jsx("tr", {
                onClick: c ? d._onClick : void 0,
                onKeyDown: v,
                tabIndex: c ? 0 : void 0,
                "aria-expanded": m,
                className: `hover:bg-gray-50 dark:hover:bg-odp-focusBg/40 ${c ? "cursor-pointer" : ""}`,
                children: t.map((b) => {
                  const x = b.tree ? d._tree : void 0;
                  return e.jsx("td", {
                    className: `px-3 py-1.5 text-gray-700 dark:text-odp-fg ${y ? "border-t-2 border-gray-300 dark:border-odp-borderStrong" : "border-t border-gray-100 dark:border-odp-borderSoft"} ${b.align === "right" ? "text-right tabular-nums" : ""} ${b.className ?? ""}`,
                    children: x ? e.jsx(Gn, {
                      depth: x.depth,
                      expandable: x.expandable,
                      expanded: x.expanded,
                      label: x.label
                    }) : d[b.key]
                  }, b.key);
                })
              }, d._key ?? i);
            })
          }),
          n ? e.jsx("tfoot", {
            children: e.jsx("tr", {
              children: t.map((d) => e.jsx("td", {
                className: "sticky bottom-0 border-t border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: d.key === n ? e.jsx($n, {}) : null
              }, d.key))
            })
          }) : null
        ]
      })
    });
  }
  function Hn(t, a) {
    const s = /* @__PURE__ */ new Set(), l = [];
    for (const n of t) (n.parentPath == null || s.has(n.parentPath) && a.has(n.parentPath)) && (l.push(n), s.add(n.path));
    return l;
  }
  function Vt({ title: t, open: a, onToggle: s, children: l }) {
    return e.jsxs("div", {
      className: "rounded-md border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-bgSoft",
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: s,
          "aria-expanded": a,
          className: "flex w-full items-center gap-1.5 px-3 py-2 text-left text-xs font-bold text-gray-700 transition hover:bg-gray-50 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg/40",
          children: [
            a ? e.jsx(de, {
              size: 14,
              className: "shrink-0 text-gray-500"
            }) : e.jsx(ie, {
              size: 14,
              className: "shrink-0 text-gray-500"
            }),
            e.jsx("span", {
              children: t
            })
          ]
        }),
        a ? e.jsxs("div", {
          className: "grid grid-cols-1 gap-3 border-t border-gray-200 p-3 dark:border-odp-borderStrong md:grid-cols-[minmax(10rem,14rem)_minmax(0,1fr)] md:items-stretch",
          children: [
            e.jsx("div", {
              className: "min-w-0",
              children: e.jsx(Un, {})
            }),
            e.jsx("div", {
              className: "min-w-0",
              children: l
            })
          ]
        }) : null
      ]
    });
  }
  function Wn({ storageMode: t = Ee, onScanTree: a, canScan: s = true, onOpenFile: l }) {
    const [n, d] = r.useState(false), [i, c] = r.useState(null), [m, k] = r.useState(null), [j, y] = r.useState(() => /* @__PURE__ */ new Set()), [v, b] = r.useState(null), [x, g] = r.useState({
      summary: true,
      extension: false,
      folder: false
    }), [I, w] = r.useState(false), [u, P] = r.useState(() => X.getStatus()), [N, p] = r.useState(false), [h, M] = r.useState(null), [z, R] = r.useState(false);
    r.useEffect(() => X.subscribe(() => {
      P(X.getStatus());
    }), []), r.useEffect(() => {
      X.refreshCheckpointStatus();
    }, []), r.useEffect(() => {
      k(null), c(null), y(/* @__PURE__ */ new Set()), b(null), g({
        summary: true,
        extension: false,
        folder: false
      });
    }, [
      t
    ]);
    const T = (E) => {
      g((q) => ({
        ...q,
        [E]: !q[E]
      }));
    }, Z = (E) => {
      y((q) => {
        const te = new Set(q);
        return te.has(E) ? te.delete(E) : te.add(E), te;
      });
    }, F = async () => {
      if (!(!a || !s || n)) {
        d(true), c(null);
        try {
          const E = await a();
          k(mn(E)), y(/* @__PURE__ */ new Set()), b(null);
        } catch (E) {
          const q = E instanceof Error ? E.message : String(E);
          c(q || "\uC6A9\uB7C9 \uBD84\uC11D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."), k(null), y(/* @__PURE__ */ new Set()), b(null);
        } finally {
          d(false);
        }
      }
    }, A = (E) => {
      I || u.building || !u.enabled || !u.isolationReady || (w(true), X.rebuild({
        resume: E
      }).finally(() => w(false)));
    }, G = () => {
      I || u.building || !u.enabled || !u.isolationReady || (async () => {
        const E = await X.getRebuildCheckpointInfo();
        if (E) {
          M(E), p(true);
          return;
        }
        if (u.hasIndex) {
          R(true);
          return;
        }
        A(false);
      })();
    }, re = () => {
      X.cancelRebuild();
    }, V = m == null ? void 0 : m.summary, se = V && V.totalSize > 0 ? V.indexSize / V.totalSize * 100 : 0, ee = V ? [
      {
        label: "\uCD1D \uC6A9\uB7C9",
        value: ge(V.totalSize)
      },
      {
        label: "\uC0C9\uC778 \uB370\uC774\uD130 (.advanced-search)",
        value: `${ge(V.indexSize)} \xB7 ${V.indexFileCount.toLocaleString()}\uAC1C \uD30C\uC77C${V.totalSize > 0 ? ` \xB7 ${se.toFixed(1)}%` : ""}`
      },
      {
        label: "\uC0C9\uC778 \uC81C\uC678 \uC6A9\uB7C9",
        value: ge(Math.max(0, V.totalSize - V.indexSize))
      },
      {
        label: "\uD30C\uC77C \uC218",
        value: V.fileCount.toLocaleString()
      },
      {
        label: "\uD3F4\uB354 \uC218",
        value: V.folderCount.toLocaleString()
      },
      {
        label: "0 byte \uD30C\uC77C",
        value: V.zeroByteCount.toLocaleString()
      },
      ...V.unknownSizeCount > 0 ? [
        {
          label: "\uD06C\uAE30 \uBBF8\uD655\uC778 \uD30C\uC77C",
          value: V.unknownSizeCount.toLocaleString()
        }
      ] : []
    ] : [], J = Hn((m == null ? void 0 : m.folders) ?? [], j);
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
                      children: Kn(t)
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
                  disabled: !s || I || u.building || !u.enabled || !u.isolationReady,
                  className: "inline-flex items-center gap-1.5 rounded border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                  title: u.enabled ? u.isolationReady ? "Advanced Search \uC5ED\uC0C9\uC778\uC744 \uBC31\uADF8\uB77C\uC6B4\uB4DC\uB85C \uC0DD\uC131\uD569\uB2C8\uB2E4" : "\uAC80\uC0C9 \uACA9\uB9AC(COOP/COEP)\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694" : "\uC124\uC815\uC5D0\uC11C \uC5ED\uC0C9\uC778\uC744 \uCF20 \uB4A4 \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",
                  children: [
                    I || u.building ? e.jsx(me, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(ht, {
                      size: 14
                    }),
                    I || u.building ? typeof u.buildProgress == "number" ? `\uC0C9\uC778 \uC911 ${Math.round(u.buildProgress * 100)}%` : "\uC0C9\uC778 \uC911\u2026" : u.hasCheckpoint ? "\uC0C9\uC778 \uC7AC\uAC1C/\uB2E4\uC2DC \uC2DC\uC791" : u.hasIndex ? "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131" : "\uC5ED\uC0C9\uC778 \uC0DD\uC131"
                  ]
                }),
                u.building ? e.jsxs("button", {
                  type: "button",
                  onClick: re,
                  className: "inline-flex items-center gap-1.5 rounded border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60",
                  title: "\uC0C9\uC778\uC744 \uC911\uC9C0\uD569\uB2C8\uB2E4. \uCCB4\uD06C\uD3EC\uC778\uD2B8\uB294 \uC720\uC9C0\uB418\uC5B4 \uC774\uC5B4\uC11C \uC7AC\uAC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                  children: [
                    e.jsx(Rr, {
                      size: 14
                    }),
                    "\uC911\uC9C0"
                  ]
                }) : null,
                e.jsxs("button", {
                  type: "button",
                  onClick: F,
                  disabled: !s || n || typeof a != "function",
                  className: "inline-flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
                  children: [
                    n ? e.jsx(me, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(Wt, {
                      size: 14
                    }),
                    n ? "\uBD84\uC11D \uC911\u2026" : m ? "\uB2E4\uC2DC \uBD84\uC11D" : "\uBD84\uC11D \uC2DC\uC791"
                  ]
                })
              ]
            })
          ]
        }),
        !s && e.jsx("p", {
          className: "text-xs text-amber-700 dark:text-amber-300",
          children: "\uC120\uD0DD\uD55C \uC800\uC7A5\uC18C\uAC00 \uC544\uC9C1 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC5F0\uACB0 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
        }),
        e.jsx(Kr, {
          logs: u.buildLogs || [],
          building: u.building,
          progress: u.buildProgress
        }),
        e.jsx(Ur, {
          isOpen: N,
          info: h,
          onCancel: () => {
            p(false), M(null);
          },
          onResume: () => {
            p(false), M(null), A(true);
          },
          onStartFresh: () => {
            p(false), M(null), A(false);
          }
        }),
        e.jsx(ce, {
          isOpen: z,
          title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
          message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
          confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
          cancelLabel: "\uCDE8\uC18C",
          onConfirm: () => {
            R(false), A(false);
          },
          onCancel: () => R(false)
        }),
        i && e.jsx("p", {
          className: "whitespace-pre-wrap text-xs text-red-600 dark:text-red-400",
          children: i
        }),
        e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsx(Vt, {
              title: "\uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: x.summary,
              onToggle: () => T("summary"),
              children: e.jsx(Ft, {
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
                rows: ee.map((E) => ({
                  label: E.label,
                  value: E.value
                })),
                emptyText: "\uBD84\uC11D\uC744 \uC2DC\uC791\uD558\uBA74 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4."
              })
            }),
            e.jsx(Vt, {
              title: "\uD30C\uC77C \uD615\uC2DD\uBCC4 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: x.extension,
              onToggle: () => T("extension"),
              children: e.jsx(Ft, {
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
                rows: ((m == null ? void 0 : m.byExtension) ?? []).map((E) => ({
                  _key: E.ext,
                  label: E.label,
                  count: E.count.toLocaleString(),
                  size: ge(E.size),
                  percent: e.jsx(Lr, {
                    percent: E.percent
                  }),
                  _onClick: () => b(E)
                })),
                emptyText: "\uBD84\uC11D\uC744 \uC2DC\uC791\uD558\uBA74 \uD615\uC2DD\uBCC4 \uC6A9\uB7C9\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4.",
                legendColumnKey: "percent"
              })
            }),
            e.jsx(Vt, {
              title: "\uD3F4\uB354\uBCC4 \uC6A9\uB7C9 (Tree Size)",
              open: x.folder,
              onToggle: () => T("folder"),
              children: e.jsx(Ft, {
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
                rows: J.map((E) => {
                  const q = j.has(E.path);
                  return {
                    _key: E.path,
                    fileCount: E.fileCount.toLocaleString(),
                    size: ge(E.size),
                    percent: e.jsx(Lr, {
                      percent: E.percent
                    }),
                    ...E.hasChildFolders ? {
                      _onClick: () => Z(E.path)
                    } : {},
                    _tree: {
                      depth: E.depth,
                      expandable: E.hasChildFolders,
                      expanded: q,
                      label: e.jsx("span", {
                        title: E.path,
                        children: E.name
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
        e.jsx(zn, {
          open: v != null,
          extension: v,
          onOpenChange: (E) => {
            E || b(null);
          },
          onOpenFile: async (E) => {
            b(null), await (l == null ? void 0 : l(E));
          }
        })
      ]
    });
  }
  const Xn = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), qn = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function Yn(t) {
    return t === Ve ? "Local Haim" : t === Je ? "WebDAV Haim" : t === Ee ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function Jn({ storageMode: t, canScan: a = false, onScanTree: s, onReadText: l, onReadBytes: n, onDeletePaths: d }) {
    const [i, c] = r.useState(() => Sa()), [m, k] = r.useState("notes"), [j, y] = r.useState("trash"), [v, b] = r.useState(false), [x, g] = r.useState(false), [I, w] = r.useState(null), [u, P] = r.useState(null), [N, p] = r.useState(""), [h, M] = r.useState([]), [z, R] = r.useState(() => /* @__PURE__ */ new Set()), [T, Z] = r.useState([]), [F, A] = r.useState(() => /* @__PURE__ */ new Set()), [G, re] = r.useState({}), [V, se] = r.useState(false), [ee, J] = r.useState([]), [E, q] = r.useState(false), te = r.useRef(null);
    r.useEffect(() => Ar((f, L) => {
      f === "settings-orphan-image-auto" && c(L);
    }), []), r.useEffect(() => () => {
      var _a2;
      (_a2 = te.current) == null ? void 0 : _a2.abort();
    }, []);
    const ne = v || x || E, he = async () => {
      var _a2;
      if (!a || !s || !l || ne) return;
      (_a2 = te.current) == null ? void 0 : _a2.abort();
      const f = new AbortController();
      te.current = f, b(true), p(""), w(null);
      try {
        const L = await s();
        if (f.signal.aborted) return;
        const D = ur(L, m), B = wa(L), U = /* @__PURE__ */ new Set();
        if (await Ca(B, 6, async (K) => {
          try {
            const Y = await l(K);
            for (const Te of Ea(Y)) U.add(Te);
          } catch {
          }
        }, {
          signal: f.signal,
          onProgress: (K, Y) => w({
            done: K,
            total: Y
          })
        }), f.signal.aborted) return;
        const H = Ia({
          images: D,
          referencedPaths: U
        });
        M(H), R(new Set(H.map((K) => K.path)));
      } catch (L) {
        if ((L == null ? void 0 : L.name) === "AbortError") return;
        p(L instanceof Error ? L.message : String(L));
      } finally {
        b(false), w(null);
      }
    }, Me = async () => {
      var _a2;
      if (!a || !s || !n || ne) return;
      (_a2 = te.current) == null ? void 0 : _a2.abort();
      const f = new AbortController();
      te.current = f, g(true), p(""), P(null);
      try {
        const L = await s();
        if (f.signal.aborted) return;
        const D = ur(L, m), B = await La(D, n, {
          signal: f.signal,
          onProgress: (K, Y) => P({
            done: K,
            total: Y
          })
        });
        if (f.signal.aborted) return;
        Z(B);
        const U = {}, H = /* @__PURE__ */ new Set();
        for (const K of B) {
          U[K.hash] = K.keepPath;
          for (const Y of K.files) Y.path !== K.keepPath && H.add(Y.path);
        }
        re(U), A(H);
      } catch (L) {
        if ((L == null ? void 0 : L.name) === "AbortError") return;
        p(L instanceof Error ? L.message : String(L));
      } finally {
        g(false), P(null);
      }
    }, fe = (f) => {
      R((L) => {
        const D = new Set(L);
        return D.has(f) ? D.delete(f) : D.add(f), D;
      });
    }, Oe = (f, L) => {
      const D = G[L];
      f !== D && A((B) => {
        const U = new Set(B);
        return U.has(f) ? U.delete(f) : U.add(f), U;
      });
    }, Ae = (f, L) => {
      re((D) => ({
        ...D,
        [f]: L
      })), A((D) => {
        const B = new Set(D), U = T.find((H) => H.hash === f);
        if (!U) return B;
        for (const H of U.files) H.path === L ? B.delete(H.path) : B.add(H.path);
        return B;
      });
    }, xe = (f) => {
      !f.length || !d || (J(f), se(true));
    }, Ke = async () => {
      if (!(!d || !ee.length)) {
        q(true), p("");
        try {
          await d(ee, j);
          const f = new Set(ee);
          M((L) => L.filter((D) => !f.has(D.path))), R((L) => {
            const D = new Set(L);
            for (const B of f) D.delete(B);
            return D;
          }), Z((L) => L.map((D) => ({
            ...D,
            files: D.files.filter((B) => !f.has(B.path))
          })).filter((D) => D.files.length >= 2)), A((L) => {
            const D = new Set(L);
            for (const B of f) D.delete(B);
            return D;
          }), se(false), J([]);
        } catch (f) {
          p(f instanceof Error ? f.message : String(f));
        } finally {
          q(false);
        }
      }
    }, Pe = z.size, De = F.size, ve = j === "hard";
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
                Yn(t),
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
            e.jsx(Br, {
              className: Xn(i),
              checked: i,
              onCheckedChange: (f) => oe("settings-orphan-image-auto", f),
              "aria-label": "\uB178\uD2B8 \uC0AD\uC81C \uC2DC \uC774\uBBF8\uC9C0 \uC790\uB3D9 \uC815\uB9AC",
              children: e.jsx(Fr, {
                className: qn
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
                e.jsx(Le, {
                  className: "flex flex-col gap-1.5",
                  value: m,
                  onValueChange: (f) => k(f),
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
                  ].map((f) => {
                    const L = m === f.value;
                    return e.jsx(be, {
                      value: f.value,
                      className: [
                        "rounded-md border-2 px-2.5 py-2 text-left text-xs outline-none transition-all",
                        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                        L ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30" : "border-gray-300 opacity-70 dark:border-odp-borderStrong"
                      ].join(" "),
                      children: f.label
                    }, f.value);
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
                e.jsx(Le, {
                  className: "flex flex-col gap-1.5",
                  value: j,
                  onValueChange: (f) => y(f),
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
                  ].map((f) => {
                    const L = j === f.value;
                    return e.jsx(be, {
                      value: f.value,
                      className: [
                        "rounded-md border-2 px-2.5 py-2 text-left text-xs outline-none transition-all",
                        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                        L ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30" : "border-gray-300 opacity-70 dark:border-odp-borderStrong"
                      ].join(" "),
                      children: f.label
                    }, f.value);
                  })
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          className: "flex flex-wrap gap-2",
          children: [
            e.jsxs(le, {
              type: "button",
              variant: "secondary",
              disabled: !a || ne,
              onClick: () => {
                he();
              },
              children: [
                v ? e.jsx(me, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(ht, {
                  size: 14
                }),
                "\uBBF8\uC0AC\uC6A9 \uC2A4\uCE94"
              ]
            }),
            e.jsxs(le, {
              type: "button",
              variant: "secondary",
              disabled: !a || ne,
              onClick: () => {
                Me();
              },
              children: [
                x ? e.jsx(me, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(Xs, {
                  size: 14
                }),
                "\uC911\uBCF5 \uC2A4\uCE94"
              ]
            })
          ]
        }),
        (I || u) && e.jsxs("p", {
          className: "text-[11px] text-gray-500 dark:text-odp-muted",
          children: [
            I ? `Markdown ${I.done}/${I.total}` : null,
            I && u ? " \xB7 " : null,
            u ? `\uD574\uC2DC ${u.done}/${u.total}` : null
          ]
        }),
        N ? e.jsx("p", {
          className: "text-xs text-red-600 dark:text-red-400",
          role: "alert",
          children: N
        }) : null,
        a ? null : e.jsx("p", {
          className: "text-xs text-gray-500 dark:text-odp-muted",
          children: "\uC800\uC7A5\uC18C\uAC00 \uC5F0\uACB0\uB418\uBA74 \uC2A4\uCE94\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
        }),
        h.length > 0 ? e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsxs("div", {
              className: "flex items-center justify-between gap-2",
              children: [
                e.jsxs("h4", {
                  className: "text-xs font-bold text-gray-700 dark:text-odp-fg",
                  children: [
                    "\uBBF8\uC0AC\uC6A9 (",
                    h.length,
                    ")"
                  ]
                }),
                e.jsxs(le, {
                  type: "button",
                  variant: "danger",
                  disabled: Pe === 0 || ne,
                  onClick: () => xe([
                    ...z
                  ]),
                  children: [
                    e.jsx(Qe, {
                      size: 14
                    }),
                    "\uC120\uD0DD \uC0AD\uC81C (",
                    Pe,
                    ")"
                  ]
                })
              ]
            }),
            e.jsx("ul", {
              className: "max-h-56 space-y-1 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter",
              children: h.map((f) => e.jsx("li", {
                children: e.jsxs("label", {
                  className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg",
                  children: [
                    e.jsx("input", {
                      type: "checkbox",
                      className: "mt-0.5",
                      checked: z.has(f.path),
                      onChange: () => fe(f.path)
                    }),
                    e.jsx("span", {
                      className: "min-w-0 flex-1 break-all",
                      children: f.path
                    }),
                    e.jsx("span", {
                      className: "shrink-0 tabular-nums text-gray-500 dark:text-odp-muted",
                      children: ge(f.size)
                    })
                  ]
                })
              }, f.path))
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
                e.jsxs(le, {
                  type: "button",
                  variant: "danger",
                  disabled: De === 0 || ne,
                  onClick: () => xe([
                    ...F
                  ]),
                  children: [
                    e.jsx(Qe, {
                      size: 14
                    }),
                    "\uC120\uD0DD \uC0AD\uC81C (",
                    De,
                    ")"
                  ]
                })
              ]
            }),
            T.map((f) => e.jsxs("div", {
              className: "space-y-1 rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter",
              children: [
                e.jsxs("div", {
                  className: "text-[10px] text-gray-500 dark:text-odp-muted",
                  children: [
                    ge(f.size),
                    " \xB7 ",
                    f.hash.slice(0, 12),
                    "\u2026"
                  ]
                }),
                e.jsx("ul", {
                  className: "space-y-1",
                  children: f.files.map((L) => {
                    const D = G[f.hash] === L.path;
                    return e.jsx("li", {
                      children: e.jsxs("label", {
                        className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg",
                        children: [
                          e.jsx("input", {
                            type: "checkbox",
                            className: "mt-0.5",
                            checked: F.has(L.path),
                            disabled: D,
                            onChange: () => Oe(L.path, f.hash)
                          }),
                          e.jsxs("span", {
                            className: "min-w-0 flex-1 break-all",
                            children: [
                              L.path,
                              D ? e.jsx("span", {
                                className: "ml-1 text-[10px] text-blue-600 dark:text-blue-400",
                                children: "(\uC720\uC9C0)"
                              }) : null
                            ]
                          }),
                          D ? null : e.jsx("button", {
                            type: "button",
                            className: "shrink-0 text-[10px] text-blue-600 underline dark:text-blue-400",
                            onClick: () => Ae(f.hash, L.path),
                            children: "\uC774 \uD30C\uC77C \uC720\uC9C0"
                          })
                        ]
                      })
                    }, L.path);
                  })
                })
              ]
            }, f.hash))
          ]
        }) : null,
        e.jsx(ce, {
          isOpen: V,
          title: ve ? "\uC774\uBBF8\uC9C0\uB97C \uC601\uAD6C \uC0AD\uC81C\uD560\uAE4C\uC694?" : "\uC774\uBBF8\uC9C0\uB97C \uD734\uC9C0\uD1B5\uC73C\uB85C \uBCF4\uB0BC\uAE4C\uC694?",
          message: ve ? `${ee.length}\uAC1C \uD30C\uC77C\uC744 \uBCF5\uAD6C\uD560 \uC218 \uC5C6\uC774 \uC0AD\uC81C\uD569\uB2C8\uB2E4.` : `${ee.length}\uAC1C \uD30C\uC77C\uC744 .trash/ \uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.`,
          variant: "danger",
          confirmLabel: ve ? "\uC601\uAD6C \uC0AD\uC81C" : "\uD734\uC9C0\uD1B5\uC73C\uB85C \uC774\uB3D9",
          cancelLabel: "\uCDE8\uC18C",
          confirmDisabled: E,
          onConfirm: () => {
            Ke();
          },
          onCancel: () => {
            E || (se(false), J([]));
          }
        })
      ]
    });
  }
  const Qn = "\uC554\uD638\uC124\uC815 \uBD88\uB7EC\uC624\uB294 \uC911", Zn = [
    {
      value: "off",
      label: "\uC0AC\uC6A9 \uC548 \uD568",
      description: "\uC571\uC744 \uC5F4\uBA74 \uC800\uC7A5\uB41C \uC5F0\uACB0 \uC815\uBCF4\uB97C \uBC14\uB85C \uBD88\uB7EC\uC635\uB2C8\uB2E4.",
      icon: Ut
    },
    {
      value: "password",
      label: "\uBE44\uBC00\uBC88\uD638",
      description: "\uC571 \uC785\uC7A5 \uC2DC \uB9C8\uC2A4\uD130 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD569\uB2C8\uB2E4.",
      icon: Ta
    },
    {
      value: "biometric",
      label: "\uC0DD\uCCB4 \uC778\uC99D",
      description: "Touch ID, Windows Hello \uB4F1\uC73C\uB85C \uC571\uC744 \uC7A0\uAE08 \uD574\uC81C\uD569\uB2C8\uB2E4.",
      icon: za
    }
  ];
  function eo({ s3Creds: t, webdavConfig: a, onModeChanged: s }) {
    const { lock: l } = Ma(), { showToast: n, dismissToast: d } = Oa(), [i, c] = r.useState("off"), [m, k] = r.useState(false), [j, y] = r.useState(false), [v, b] = r.useState(false), [x, g] = r.useState(false), I = Aa(), w = r.useCallback(async (h) => {
      n({
        message: Qn,
        icon: "loading",
        durationMs: 0
      });
      try {
        return await h();
      } finally {
        d();
      }
    }, [
      d,
      n
    ]);
    if (r.useEffect(() => {
      if (!Kt()) return;
      let h = false;
      return (async () => {
        try {
          const [M, z] = await w(() => Promise.all([
            Pa(),
            Da()
          ]));
          if (h) return;
          c(M), k(z);
        } catch {
          h || (c("off"), k(false));
        }
      })(), () => {
        h = true;
      };
    }, [
      w
    ]), !Kt()) return null;
    const u = async (h) => {
      if (!(j || h === i)) {
        y(true);
        try {
          if (h === "off") await w(() => br(t, a));
          else if (h === "password") {
            b(true);
            return;
          } else await w(() => Ra(t));
          c(h), s == null ? void 0 : s(h);
        } catch (M) {
          if (h === "biometric" && Ba(M)) return;
          alert(At(M, "\uC785\uC7A5 \uC7A0\uAE08 \uC124\uC815\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
        } finally {
          y(false);
        }
      }
    }, P = async (h) => {
      y(true);
      try {
        await w(() => Fa(h, t, a)), c("password"), s == null ? void 0 : s("password"), b(false);
      } catch (M) {
        alert(At(M, "\uBE44\uBC00\uBC88\uD638 \uC7A0\uAE08 \uC124\uC815\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        y(false);
      }
    }, N = async () => {
      g(false), y(true);
      try {
        await w(() => br(t, a)), c("off"), s == null ? void 0 : s("off");
      } catch (h) {
        alert(At(h, "\uC785\uC7A5 \uC7A0\uAE08 \uD574\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        y(false);
      }
    }, p = () => {
      i === "off" || j || l();
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
                    e.jsx(Ut, {
                      size: 16
                    }),
                    "\uC571 \uC785\uC7A5 \uC7A0\uAE08 (Tauri)"
                  ]
                }),
                i !== "off" ? e.jsxs(le, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  className: "shrink-0",
                  disabled: j,
                  onClick: p,
                  "aria-label": "\uC571 \uC7A0\uAE08",
                  children: [
                    e.jsx(Ut, {
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
                I,
                "\uB85C \uC7A0\uAE08 \uD574\uC81C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC571\uC744 \uC0C8\uB85C \uCF1C\uAC70\uB098 \uC7A0\uAE08 \uBC84\uD2BC\uC744 \uB20C\uB800\uC744 \uB54C\uB9CC \uC778\uC99D\uC774 \uD544\uC694\uD569\uB2C8\uB2E4."
              ]
            }),
            e.jsx(Le, {
              value: i,
              onValueChange: (h) => {
                const M = h;
                if (M === "off" && i !== "off") {
                  g(true);
                  return;
                }
                u(M);
              },
              className: "space-y-2",
              disabled: j,
              children: Zn.map((h) => {
                const M = h.icon, z = h.value === "biometric" && !m, R = h.value === "biometric" && m ? I : h.label, T = h.value === "biometric" && m ? `${I}\uB85C \uC571\uC744 \uC7A0\uAE08 \uD574\uC81C\uD569\uB2C8\uB2E4.` : h.description;
                return e.jsxs("label", {
                  className: [
                    "flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition",
                    i === h.value ? "border-blue-400 bg-white shadow-sm dark:border-blue-500 dark:bg-odp-bgSoft" : "border-gray-200 bg-white/70 dark:border-odp-borderStrong dark:bg-odp-surface/60",
                    z ? "cursor-not-allowed opacity-50" : "hover:border-blue-300"
                  ].join(" "),
                  children: [
                    e.jsx(be, {
                      value: h.value,
                      disabled: z || j,
                      className: "mt-0.5 h-4 w-4 shrink-0 rounded-full border border-gray-400 bg-white outline-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                      "aria-label": R,
                      children: e.jsx(Ie, {
                        className: "relative flex h-full w-full items-center justify-center after:block after:h-1.5 after:w-1.5 after:rounded-full after:bg-white"
                      })
                    }),
                    e.jsxs("span", {
                      className: "min-w-0 flex-1",
                      children: [
                        e.jsxs("span", {
                          className: "flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-odp-fg",
                          children: [
                            e.jsx(M, {
                              size: 14
                            }),
                            R
                          ]
                        }),
                        e.jsx("span", {
                          className: "mt-0.5 block text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
                          children: T
                        }),
                        z && e.jsx("span", {
                          className: "mt-1 block text-[11px] text-amber-700 dark:text-amber-300",
                          children: "\uC774 \uAE30\uAE30\uC5D0\uC11C\uB294 \uC0DD\uCCB4 \uC778\uC99D\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."
                        })
                      ]
                    })
                  ]
                }, h.value);
              })
            }),
            i !== "off" && e.jsx("p", {
              className: "mt-3 text-[11px] text-gray-500 dark:text-odp-muted",
              children: i === "password" ? "\uBE44\uBC00\uBC88\uD638 \uBAA8\uB4DC\uAC00 \uCF1C\uC838 \uC788\uC2B5\uB2C8\uB2E4. \uC571\uC744 \uB2E4\uC2DC \uC5F4 \uB54C \uBE44\uBC00\uBC88\uD638\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." : `${I} \uBAA8\uB4DC\uAC00 \uCF1C\uC838 \uC788\uC2B5\uB2C8\uB2E4.`
            })
          ]
        }),
        e.jsx(_a, {
          isOpen: v,
          masterPassword: "",
          onCancel: () => {
            b(false);
          },
          onSubmit: (h) => {
            P(h);
          }
        }),
        e.jsx(ce, {
          isOpen: x,
          title: "\uC785\uC7A5 \uC7A0\uAE08 \uD574\uC81C",
          message: "\uC571 \uC785\uC7A5 \uC7A0\uAE08\uC744 \uB044\uBA74 \uB2E4\uC74C \uC2E4\uD589\uBD80\uD130 \uBE44\uBC00\uBC88\uD638\xB7\uC0DD\uCCB4 \uC778\uC99D \uC5C6\uC774 \uC5F0\uACB0 \uC815\uBCF4\uB97C \uBD88\uB7EC\uC635\uB2C8\uB2E4.",
          confirmLabel: "\uC0AC\uC6A9 \uD574\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: () => {
            N();
          },
          onCancel: () => g(false)
        })
      ]
    });
  }
  function $e({ title: t, subtitle: a, open: s, onOpenChange: l, children: n, className: d = "", contentClassName: i = "space-y-3 p-3 pt-0" }) {
    return e.jsxs("div", {
      className: [
        "rounded-md border border-emerald-200/80 bg-white/60 dark:border-emerald-900/40 dark:bg-odp-bgSoft/40",
        d
      ].filter(Boolean).join(" "),
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: () => l(!s),
          "aria-expanded": s,
          className: "flex w-full items-start gap-2 px-3 py-2.5 text-left transition hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20",
          children: [
            s ? e.jsx(de, {
              size: 14,
              className: "mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted"
            }) : e.jsx(ie, {
              size: 14,
              className: "mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted"
            }),
            e.jsxs("span", {
              className: "min-w-0",
              children: [
                e.jsx("span", {
                  className: "block text-xs font-semibold text-gray-800 dark:text-odp-fgStrong",
                  children: t
                }),
                a ? e.jsx("span", {
                  className: "mt-0.5 block text-[10px] leading-snug text-gray-500 dark:text-odp-muted",
                  children: a
                }) : null
              ]
            })
          ]
        }),
        s ? e.jsx("div", {
          className: i,
          children: n
        }) : null
      ]
    });
  }
  function to({ settings: t, disabled: a = false, onChange: s }) {
    return e.jsxs("div", {
      className: "space-y-4",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx("label", {
              className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
              children: "Hugging Face token (optional)"
            }),
            e.jsx("input", {
              type: "password",
              value: t.hfToken,
              disabled: a,
              onChange: (l) => s({
                ...t,
                hfToken: l.target.value
              }),
              placeholder: "hf_\u2026",
              autoComplete: "off",
              spellCheck: false,
              className: "w-full rounded border px-3 py-2 font-mono text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            }),
            e.jsxs("p", {
              className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted",
              children: [
                "Passed as ",
                e.jsx("code", {
                  className: "text-[10px]",
                  children: "HF_TOKEN"
                }),
                " to",
                " ",
                e.jsx("code", {
                  className: "text-[10px]",
                  children: "hf download"
                }),
                ". Improves rate limits; leave empty for anonymous downloads."
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx("label", {
              className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
              children: "Adapter path (optional)"
            }),
            e.jsx("input", {
              type: "text",
              value: t.adapterPath,
              disabled: a,
              onChange: (l) => s({
                ...t,
                adapterPath: l.target.value
              }),
              placeholder: "/path/to/lora-adapter",
              className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            }),
            e.jsx("p", {
              className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted",
              children: "Low-rank adapter weights passed to mlx_vlm.generate when loading the model."
            })
          ]
        })
      ]
    });
  }
  const ro = 256;
  function Gr({ title: t, subtitle: a, lines: s, emptyHint: l, open: n, onOpenChange: d, onClear: i, clearDisabled: c = false, headerExtra: m, beforeLog: k, className: j = "" }) {
    const y = r.useRef(null), v = r.useRef(true), b = r.useCallback((x) => {
      const g = y.current;
      if (!g) return;
      const I = g.scrollSize, w = g.viewportSize;
      v.current = I - x - w < 24;
    }, []);
    return r.useEffect(() => {
      var _a2;
      !n || s.length === 0 || !v.current || ((_a2 = y.current) == null ? void 0 : _a2.scrollToIndex(s.length - 1, {
        align: "end"
      }));
    }, [
      s,
      n
    ]), e.jsxs("div", {
      className: [
        "overflow-hidden rounded border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-bgSoft/40",
        j
      ].filter(Boolean).join(" "),
      children: [
        e.jsxs("div", {
          className: "flex flex-wrap items-start justify-between gap-x-2 gap-y-1 border-b border-gray-100 px-2.5 py-2 dark:border-odp-borderSoft",
          children: [
            e.jsxs("button", {
              type: "button",
              onClick: () => d(!n),
              "aria-expanded": n,
              className: "flex min-w-0 flex-1 items-start gap-1.5 text-left",
              children: [
                n ? e.jsx(de, {
                  size: 14,
                  className: "mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted"
                }) : e.jsx(ie, {
                  size: 14,
                  className: "mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted"
                }),
                e.jsxs("span", {
                  className: "min-w-0",
                  children: [
                    e.jsx("span", {
                      className: "block text-[11px] font-semibold text-gray-700 dark:text-odp-fg",
                      children: t
                    }),
                    a ? e.jsx("span", {
                      className: "mt-0.5 block truncate text-[10px] text-gray-500 dark:text-odp-muted",
                      children: a
                    }) : null
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              className: "flex flex-wrap items-center gap-2",
              children: [
                m,
                i ? e.jsx("button", {
                  type: "button",
                  disabled: c || s.length === 0,
                  onClick: () => {
                    i(), v.current = true;
                  },
                  className: "rounded border border-gray-200 px-2 py-0.5 text-[10px] text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft",
                  children: "Clear"
                }) : null
              ]
            })
          ]
        }),
        n ? e.jsxs("div", {
          className: "space-y-2 p-2.5",
          children: [
            k,
            s.length === 0 ? e.jsx("p", {
              className: "font-mono text-[10px] text-gray-400 dark:text-odp-muted",
              children: l
            }) : e.jsx(Or, {
              ref: y,
              className: "overscroll-contain rounded border border-gray-200 bg-gray-950/95 px-2.5 py-1.5 font-mono text-[10px] leading-relaxed text-emerald-100 dark:border-odp-borderStrong",
              style: {
                height: ro
              },
              data: s,
              onScroll: b,
              "aria-live": "polite",
              "aria-relevant": "additions",
              children: (x) => e.jsx("div", {
                className: [
                  "whitespace-pre-wrap break-all",
                  x.text.startsWith("[error]") ? "text-red-300" : ""
                ].filter(Boolean).join(" "),
                children: x.text
              }, x.id)
            })
          ]
        }) : null
      ]
    });
  }
  function ao() {
    const [t, a] = r.useState(() => pr());
    return r.useEffect(() => $a(() => a(pr())), []), t;
  }
  function so({ repoId: t, progress: a, aborting: s = false, open: l, onOpenChange: n }) {
    const d = ao(), i = s ? "Aborting\u2026" : (a == null ? void 0 : a.label) || "Preparing\u2026", c = a && a.totalBytes > 0 ? Math.min(100, Math.max(0, Math.round(a.percent))) : null, m = s ? "\uB2E4\uC6B4\uB85C\uB4DC\uB97C \uC911\uB2E8\uD558\uB294 \uC911\u2026" : "hf download / mlx_vlm.convert raw \uCD9C\uB825\uC774 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4.";
    return e.jsx(Gr, {
      title: "\uB2E4\uC6B4\uB85C\uB4DC \uB85C\uADF8",
      subtitle: t,
      lines: d,
      emptyHint: m,
      open: l,
      onOpenChange: n,
      onClear: Va,
      headerExtra: c == null ? e.jsx("span", {
        className: "font-mono text-[10px] tabular-nums text-gray-600 dark:text-odp-muted",
        children: i
      }) : null,
      beforeLog: c != null ? e.jsxs("div", {
        className: "space-y-1",
        children: [
          e.jsxs("div", {
            className: "flex items-center justify-between gap-2 text-[10px] tabular-nums text-gray-600 dark:text-odp-muted",
            children: [
              e.jsxs("span", {
                className: "font-semibold text-gray-800 dark:text-odp-fg",
                children: [
                  c,
                  "%"
                ]
              }),
              e.jsx("span", {
                className: "truncate font-mono",
                children: i
              })
            ]
          }),
          e.jsx("div", {
            className: "h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-odp-bgSoft",
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": c,
            "aria-label": "Download progress",
            children: e.jsx("div", {
              className: "h-full rounded-full bg-emerald-500 transition-[width] duration-300 ease-out",
              style: {
                width: `${c}%`
              }
            })
          })
        ]
      }) : null
    });
  }
  function no({ models: t, selectedId: a, cacheBytesByModelId: s = {}, disabled: l = false, deleteBusy: n = false, scanBusy: d, isModelInUse: i, onRefresh: c, onSelect: m, onRequestDelete: k }) {
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs("div", {
          className: "mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5",
          children: [
            e.jsx("p", {
              className: "text-[11px] text-gray-500 dark:text-odp-muted",
              children: "\uC11C\uBC84 \uC2DC\uC791 \uC2DC \uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. \uC0AD\uC81C\uB294 Hugging Face \uCE90\uC2DC \uD3F4\uB354\uB97C \uC81C\uAC70\uD569\uB2C8\uB2E4."
            }),
            e.jsxs(le, {
              type: "button",
              variant: "secondary",
              size: "sm",
              disabled: l || d || n,
              onClick: c,
              children: [
                e.jsx(Wt, {
                  size: 14,
                  className: d ? "animate-spin" : ""
                }),
                "Refresh"
              ]
            })
          ]
        }),
        t.length === 0 ? e.jsx("p", {
          className: "text-[11px] text-gray-500 dark:text-odp-muted",
          children: "\uC124\uCE58\uB41C \uBAA8\uB378\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC544\uB798\uC5D0\uC11C Hugging Face \uAC80\uC0C9 \uB610\uB294 URL \uBD99\uC5EC\uB123\uAE30\uB85C \uCD94\uAC00\uD558\uC138\uC694."
        }) : e.jsx(Le, {
          value: a,
          onValueChange: m,
          className: "max-h-48 space-y-1.5 overflow-y-auto",
          disabled: l || n,
          children: t.map((j) => {
            const y = i(j.id), v = s[j.id] ?? s[j.repoId || ""] ?? 0, b = v > 0 ? Ka(v) : j.source === "local" ? null : "\u2014";
            return e.jsxs("div", {
              className: "flex items-start gap-2 rounded border border-gray-200 bg-white px-2.5 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: [
                e.jsxs("label", {
                  className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2",
                  children: [
                    e.jsx(be, {
                      value: j.id,
                      className: "mt-0.5 size-3.5 shrink-0 rounded-full border border-gray-400 bg-white data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                      "aria-label": j.id,
                      children: e.jsx(Ie, {
                        className: "relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white"
                      })
                    }),
                    e.jsxs("span", {
                      className: "min-w-0 text-[11px] leading-snug text-gray-700 dark:text-odp-fg",
                      children: [
                        e.jsx("span", {
                          className: "block truncate font-medium",
                          children: j.id
                        }),
                        e.jsxs("span", {
                          className: "text-gray-500 dark:text-odp-muted",
                          children: [
                            j.source === "local" ? "local path" : "Hugging Face cache",
                            b ? ` \xB7 ${b}` : "",
                            y ? " \xB7 \uC11C\uBC84 \uC0AC\uC6A9 \uC911" : ""
                          ]
                        })
                      ]
                    })
                  ]
                }),
                e.jsx(le, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  disabled: l || n || y,
                  onClick: () => k(j),
                  "aria-label": `${j.id} \uC0AD\uC81C`,
                  title: y ? "\uC11C\uBC84\uB97C \uC911\uC9C0\uD55C \uB4A4 \uC0AD\uC81C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." : "\uBAA8\uB378 \uC0AD\uC81C",
                  className: "shrink-0 text-red-700 hover:text-red-800 dark:text-red-300 dark:hover:text-red-200",
                  children: e.jsx(Qe, {
                    size: 14
                  })
                })
              ]
            }, j.id);
          })
        })
      ]
    });
  }
  function Hr({ mode: t, progressLabel: a = "", paste: s = false }) {
    return t === "aborting" ? e.jsxs("span", {
      className: "inline-flex min-w-0 items-center gap-2 transition-none",
      children: [
        e.jsx(me, {
          size: 14,
          className: "shrink-0 animate-spin",
          "aria-hidden": true
        }),
        e.jsx("span", {
          children: "Aborting\u2026"
        })
      ]
    }) : t === "downloading" ? e.jsxs("span", {
      className: "inline-flex min-w-0 items-center gap-2 transition-none",
      children: [
        e.jsx(me, {
          size: 14,
          className: "shrink-0 animate-spin",
          "aria-hidden": true
        }),
        e.jsx("span", {
          className: "truncate",
          children: a || "Downloading\u2026"
        })
      ]
    }) : t === "downloaded" ? e.jsxs("span", {
      className: "inline-flex min-w-0 items-center gap-2 transition-none",
      children: [
        e.jsx(qs, {
          size: 14,
          className: "shrink-0",
          "aria-hidden": true
        }),
        e.jsx("span", {
          children: "Downloaded"
        })
      ]
    }) : e.jsxs("span", {
      className: "inline-flex min-w-0 items-center gap-2 transition-none",
      children: [
        s ? e.jsx(Ys, {
          size: 14,
          className: "shrink-0",
          "aria-hidden": true
        }) : e.jsx(Js, {
          size: 14,
          className: "shrink-0",
          "aria-hidden": true
        }),
        e.jsx("span", {
          children: "Download"
        })
      ]
    });
  }
  function Wr({ hit: t, className: a = "" }) {
    const s = Ua(t), l = t.feasibility ?? "unknown", n = t.downloads != null ? `${t.downloads.toLocaleString()} downloads` : null;
    return e.jsxs("div", {
      className: `space-y-0.5 text-[10px] leading-snug ${a}`.trim(),
      children: [
        n ? e.jsx("div", {
          className: "text-gray-500 dark:text-odp-muted",
          children: n
        }) : null,
        s ? e.jsx("div", {
          className: Ga(l),
          children: s
        }) : e.jsx("div", {
          className: "text-gray-500 dark:text-odp-muted",
          children: "\uC6A9\uB7C9 \uC815\uBCF4 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"
        })
      ]
    });
  }
  function oo({ value: t, onChange: a, error: s, preview: l, previewBusy: n, disabled: d = false, cliAvailable: i, downloadBusy: c, isActiveDownload: m = false, isAborting: k = false, downloadProgressLabel: j = "", isDownloaded: y = false, onDownload: v }) {
    const b = m && !k, x = k ? "aborting" : b ? "downloading" : y ? "downloaded" : "download";
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs("div", {
          className: "flex flex-wrap gap-2",
          children: [
            e.jsx("input", {
              type: "text",
              value: t,
              onChange: (g) => a(g.target.value),
              placeholder: "https://huggingface.co/mlx-community/\u2026 or org/model",
              disabled: d,
              className: "min-w-0 flex-1 rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            }),
            e.jsx(le, {
              type: "button",
              variant: y && !c ? "tertiary" : "secondary",
              size: "sm",
              className: c ? "min-w-[9.5rem] font-mono tabular-nums transition-none" : y ? "text-emerald-700 transition-none dark:text-emerald-300" : "transition-none",
              disabled: d || !i || k || c && !m || !t.trim(),
              onClick: v,
              children: e.jsx(Hr, {
                mode: x,
                progressLabel: b ? j : "",
                paste: true
              })
            })
          ]
        }),
        s ? e.jsx("p", {
          className: "mt-1 text-[11px] text-red-600 dark:text-red-400",
          children: s
        }) : null,
        n ? e.jsx("p", {
          className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted",
          children: "\uBAA8\uB378 \uC815\uBCF4 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"
        }) : l ? e.jsx("div", {
          className: "mt-2 rounded border border-gray-200 bg-white px-2.5 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
          children: e.jsx(Wr, {
            hit: l
          })
        }) : null
      ]
    });
  }
  function lo({ query: t, onQueryChange: a, memoryBudgetLabel: s, results: l, searchBusy: n, searchError: d, disabled: i = false, cliAvailable: c, downloadBusy: m, downloadingRepoId: k = "", abortingRepoId: j = "", downloadProgressLabel: y = "", isModelDownloaded: v, onDownload: b }) {
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx("div", {
          className: "mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5",
          children: e.jsx("span", {
            className: "text-[10px] text-gray-500 dark:text-odp-muted",
            children: s
          })
        }),
        e.jsxs("div", {
          className: "relative",
          children: [
            e.jsx(ht, {
              size: 14,
              className: "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400",
              "aria-hidden": true
            }),
            e.jsx("input", {
              type: "search",
              value: t,
              onChange: (x) => a(x.target.value),
              placeholder: "e.g. Llama 3.2 4bit",
              disabled: i,
              className: "w-full rounded border py-2 pl-8 pr-3 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            })
          ]
        }),
        n ? e.jsx("p", {
          className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted",
          children: "Searching\u2026"
        }) : null,
        d ? e.jsx("p", {
          className: "mt-1 text-[11px] text-red-600 dark:text-red-400",
          children: d
        }) : null,
        l.length > 0 ? e.jsx("ul", {
          className: "mt-2 max-h-48 space-y-1 overflow-y-auto",
          children: l.map((x) => {
            const g = j === x.id, I = m && k === x.id, w = !I && !g && v(x.id), u = g ? "aborting" : I ? "downloading" : w ? "downloaded" : "download";
            return e.jsxs("li", {
              className: "flex items-center justify-between gap-2 rounded border border-gray-200 bg-white px-2.5 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: [
                e.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    e.jsx("div", {
                      className: "truncate text-[11px] font-medium text-gray-800 dark:text-odp-fgStrong",
                      children: x.id
                    }),
                    e.jsx(Wr, {
                      hit: x
                    })
                  ]
                }),
                e.jsx(le, {
                  type: "button",
                  variant: w ? "tertiary" : "secondary",
                  size: "sm",
                  className: I ? "min-w-[9.5rem] font-mono tabular-nums transition-none" : w ? "text-emerald-700 transition-none dark:text-emerald-300" : "transition-none",
                  disabled: i || !c || g || m && !I,
                  onClick: () => b(x),
                  children: e.jsx(Hr, {
                    mode: u,
                    progressLabel: I && !g ? y : ""
                  })
                })
              ]
            }, x.id);
          })
        }) : null
      ]
    });
  }
  function io({ settings: t, onSettingsChange: a, cliAvailable: s, serverRunning: l = false, serverLoadedModels: n = [], disabled: d = false }) {
    var _a2, _b;
    const [i, c] = r.useState(t.installedModels), [m, k] = r.useState(false), [j, y] = r.useState(""), [v, b] = r.useState([]), [x, g] = r.useState(false), [I, w] = r.useState(""), [u, P] = r.useState(""), [N, p] = r.useState(""), [h, M] = r.useState(false), [z, R] = r.useState(false), [T, Z] = r.useState(null), [F, A] = r.useState(null), [G, re] = r.useState(null), [V, se] = r.useState(""), ee = r.useRef(""), [J, E] = r.useState(null), [q, te] = r.useState("RAM \uC815\uBCF4 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"), [ne, he] = r.useState(null), [Me, fe] = r.useState(false), [Oe, Ae] = r.useState(true), [xe, Ke] = r.useState(false), [Pe, De] = r.useState(false), [ve, f] = r.useState(true), [L, D] = r.useState({}), B = r.useCallback(async () => {
      k(true);
      try {
        const { settings: S, models: _ } = await Ha();
        a(S), c(_);
        const $ = await Wa(_);
        D($);
      } finally {
        k(false);
      }
    }, [
      a
    ]);
    r.useEffect(() => {
      Xa().then((S) => {
        te(qa(S));
      });
    }, []), r.useEffect(() => {
      const S = () => {
        const _ = Gt();
        a(_), B();
      };
      return window.addEventListener(mt, S), () => window.removeEventListener(mt, S);
    }, [
      a,
      B
    ]), r.useEffect(() => {
      B();
    }, [
      B
    ]);
    const U = r.useRef(null), H = r.useRef(null);
    r.useEffect(() => {
      const S = j.trim();
      if (!S) {
        b([]), w("");
        return;
      }
      const _ = window.setTimeout(() => {
        var _a3;
        (_a3 = U.current) == null ? void 0 : _a3.abort();
        const $ = new AbortController();
        U.current = $, g(true), w(""), Ya(S, {
          signal: $.signal
        }).then((W) => {
          $.signal.aborted || b(W);
        }).catch((W) => {
          $.signal.aborted || (w(W instanceof Error ? W.message : "Search failed."), b([]));
        }).finally(() => {
          $.signal.aborted || g(false);
        });
      }, 300);
      return () => window.clearTimeout(_);
    }, [
      j
    ]), r.useEffect(() => {
      const S = Pt(u);
      if (!S) {
        he(null), fe(false);
        return;
      }
      const _ = window.setTimeout(() => {
        var _a3;
        (_a3 = H.current) == null ? void 0 : _a3.abort();
        const $ = new AbortController();
        H.current = $, fe(true), Ja(S, $.signal).then((W) => {
          $.signal.aborted || he(W);
        }).catch(() => {
          $.signal.aborted || he(null);
        }).finally(() => {
          $.signal.aborted || fe(false);
        });
      }, 400);
      return () => window.clearTimeout(_);
    }, [
      u
    ]);
    const K = t.selectedModelId, Y = r.useMemo(() => {
      const S = /* @__PURE__ */ new Set(), _ = [];
      for (const $ of i) S.has($.id) || (S.add($.id), _.push($));
      return K && !S.has(K) && _.unshift({
        id: K,
        ...K.includes("/") ? {
          repoId: K
        } : {},
        source: "huggingface",
        installedAt: Date.now()
      }), _;
    }, [
      i,
      K
    ]), Te = (S, _) => {
      cs(S);
      const $ = xs(S, _ ?? null), W = gr(S, Y);
      A({
        repoId: S,
        mode: $,
        hit: _ ?? null,
        redownload: W
      });
    }, Ze = (S, _) => {
      re({
        repoId: S,
        mode: _
      });
    }, et = (S) => {
      if (!V) {
        if (h && (T == null ? void 0 : T.repoId) === S.id) {
          Ze(S.id, T.mode);
          return;
        }
        Te(S.id, S);
      }
    }, tt = () => {
      if (V) return;
      p("");
      const S = Pt(u);
      if (!S) {
        p("Hugging Face model URL or org/model id is invalid.");
        return;
      }
      if (h && (T == null ? void 0 : T.repoId) === S) {
        Ze(S, T.mode);
        return;
      }
      Te(S, ne);
    }, ft = async () => {
      if (!F) return;
      const { repoId: S, mode: _, hit: $ } = F;
      A(null), M(true), f(true);
      let W = ($ == null ? void 0 : $.diskBytes) ?? 0;
      W <= 0 && (W = await ss(S, {
        ...$ ? {
          hit: $
        } : {}
      }));
      const ot = W > 0 ? ns(0, W) : null;
      Z({
        repoId: S,
        mode: _,
        progress: ot
      });
      try {
        const Q = await os(S, {
          mode: _,
          ...$ ? {
            hit: $
          } : {},
          ...W > 0 ? {
            expectedTotalBytes: W
          } : {},
          onProgress: (yt) => {
            ee.current !== S && Z((pe) => !pe || pe.repoId !== S ? pe : {
              ...pe,
              progress: yt
            });
          }
        });
        a(Q), P(""), await B();
      } catch (Q) {
        if (ls(Q)) {
          await B();
          return;
        }
        alert(Q instanceof Error ? Q.message : "Download failed.");
      } finally {
        ee.current = "", se(""), M(false), Z(null);
      }
    }, rt = async () => {
      if (!G) return;
      const { repoId: S } = G;
      re(null), ee.current = S, se(S);
      try {
        await ds(S);
      } catch (_) {
        ee.current = "", se(""), alert(_ instanceof Error ? _.message : "Failed to abort download.");
      }
    }, ze = async () => {
      if (!J) return;
      const S = J;
      E(null), R(true);
      try {
        const _ = await is(S.repoId || S.id, {
          serverStatus: {
            running: l,
            loaded: l,
            models: n
          }
        });
        a(_), await B();
      } catch (_) {
        alert(_ instanceof Error ? _.message : "Delete failed.");
      } finally {
        R(false);
      }
    }, at = r.useMemo(() => ({
      running: l,
      loaded: l,
      models: n
    }), [
      l,
      n
    ]), Ne = r.useCallback((S) => Qa(S, t, at), [
      t,
      at
    ]), st = r.useCallback((S) => gr(S, Y), [
      Y
    ]), Ue = F ? F.redownload ? Za(F.repoId, F.mode, F.hit) : es(F.repoId, F.mode, F.hit) : null, Ge = J ? ts(J.id) : null, Se = G ? rs(G.repoId, G.mode) : null, we = Pt(u) ?? "", O = !!(h && (T == null ? void 0 : T.repoId) && we && T.repoId === we), nt = !!(V && we && V === we);
    return e.jsxs("div", {
      className: "space-y-2",
      children: [
        e.jsx($e, {
          title: "\uC124\uCE58\uB41C \uBAA8\uB378",
          subtitle: `${Y.length}\uAC1C \xB7 \uC11C\uBC84\uC5D0 \uB85C\uB4DC\uD560 \uBAA8\uB378 \uC120\uD0DD`,
          open: Oe,
          onOpenChange: Ae,
          children: e.jsx(no, {
            models: Y,
            selectedId: K,
            cacheBytesByModelId: L,
            disabled: d,
            deleteBusy: z,
            scanBusy: m,
            isModelInUse: Ne,
            onRefresh: () => {
              B();
            },
            onSelect: (S) => {
              const _ = as(t, S);
              Pr(_), a(_);
            },
            onRequestDelete: E
          })
        }),
        e.jsx($e, {
          title: "Hugging Face \uAC80\uC0C9 (MLX)",
          subtitle: "\uBAA8\uB378 \uC6A9\uB7C9 \xB7 \uC608\uC0C1 RAM \xB7 \uC2E4\uD589 \uAC00\uB2A5\uC131",
          open: xe,
          onOpenChange: Ke,
          children: e.jsx(lo, {
            query: j,
            onQueryChange: y,
            memoryBudgetLabel: q,
            results: v,
            searchBusy: x,
            searchError: I,
            disabled: d,
            cliAvailable: s,
            downloadBusy: h,
            downloadingRepoId: (T == null ? void 0 : T.repoId) ?? "",
            abortingRepoId: V,
            downloadProgressLabel: ((_a2 = T == null ? void 0 : T.progress) == null ? void 0 : _a2.label) ?? "",
            isModelDownloaded: st,
            onDownload: et
          })
        }),
        e.jsx($e, {
          title: "URL / repo id \uBD99\uC5EC\uB123\uAE30",
          subtitle: "Hugging Face \uB9C1\uD06C \uB610\uB294 org/model",
          open: Pe,
          onOpenChange: De,
          children: e.jsx(oo, {
            value: u,
            onChange: (S) => {
              P(S), p("");
            },
            error: N,
            preview: ne,
            previewBusy: Me,
            disabled: d,
            cliAvailable: s,
            downloadBusy: h,
            isActiveDownload: O,
            isAborting: nt,
            downloadProgressLabel: O ? ((_b = T == null ? void 0 : T.progress) == null ? void 0 : _b.label) ?? "" : "",
            isDownloaded: st(we),
            onDownload: tt
          })
        }),
        h && T ? e.jsx(so, {
          repoId: T.repoId,
          progress: T.progress,
          aborting: V === T.repoId,
          open: ve,
          onOpenChange: f
        }) : null,
        e.jsx(ce, {
          isOpen: !!F,
          title: (Ue == null ? void 0 : Ue.title) || "Download model",
          message: (Ue == null ? void 0 : Ue.message) || "",
          confirmLabel: (F == null ? void 0 : F.redownload) ? F.mode === "convert" ? "Re-convert" : "Redownload" : (F == null ? void 0 : F.mode) === "convert" ? "Convert" : "Download",
          cancelLabel: "Cancel",
          onConfirm: () => {
            ft();
          },
          onCancel: () => A(null)
        }),
        e.jsx(ce, {
          isOpen: !!G,
          title: (Se == null ? void 0 : Se.title) || "Abort download",
          message: (Se == null ? void 0 : Se.message) || "",
          confirmLabel: "Abort",
          cancelLabel: "Cancel",
          variant: "danger",
          onConfirm: () => {
            rt();
          },
          onCancel: () => re(null)
        }),
        e.jsx(ce, {
          isOpen: !!J,
          title: (Ge == null ? void 0 : Ge.title) || "Delete model",
          message: (Ge == null ? void 0 : Ge.message) || "",
          confirmLabel: "Delete",
          cancelLabel: "Cancel",
          variant: "danger",
          onConfirm: () => {
            ze();
          },
          onCancel: () => E(null)
        })
      ]
    });
  }
  function co({ busy: t, cliAvailable: a, canStart: s, runtimeLoaded: l, workerRunning: n, loadedModels: d, onStart: i, onStop: c }) {
    const [m, k] = r.useState(false);
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs("div", {
          className: "flex flex-wrap gap-2",
          children: [
            e.jsxs(le, {
              type: "button",
              variant: "primary",
              size: "sm",
              disabled: t || !a || !s || l,
              onClick: () => {
                i();
              },
              children: [
                e.jsx(Qs, {
                  size: 14
                }),
                "Load model"
              ]
            }),
            e.jsxs(le, {
              type: "button",
              variant: "secondary",
              size: "sm",
              disabled: t || !n,
              onClick: () => k(true),
              children: [
                e.jsx(Rr, {
                  size: 14
                }),
                "Unload"
              ]
            })
          ]
        }),
        l && d.length > 0 ? e.jsxs("p", {
          className: "text-[11px] text-gray-500 dark:text-odp-muted",
          children: [
            "Loaded in worker: ",
            d.join(", ")
          ]
        }) : n ? e.jsx("p", {
          className: "text-[11px] text-amber-700 dark:text-amber-300",
          children: "Worker is running but no model is loaded. Check the server log below or use Unload to stop the worker."
        }) : e.jsx("p", {
          className: "text-[11px] text-gray-500 dark:text-odp-muted",
          children: "Loads the selected model once into a local worker using mlx_vlm.generate. AI Assist calls the worker directly (no HTTP server)."
        }),
        e.jsx(ce, {
          isOpen: m,
          title: "Unload MLX-VLM model",
          message: "Unload the model from the local MLX-VLM worker?",
          confirmLabel: "Unload",
          cancelLabel: "Cancel",
          variant: "danger",
          onConfirm: () => {
            k(false), c();
          },
          onCancel: () => k(false)
        })
      ]
    });
  }
  function xo() {
    const [t, a] = r.useState(() => mr());
    return r.useEffect(() => Dr(() => a(mr())), []), t;
  }
  function uo({ serverRunning: t, managedByApp: a, open: s, onOpenChange: l }) {
    const n = xo(), [d, i] = r.useState(() => a || Dt());
    r.useEffect(() => {
      i(a || Dt());
    }, [
      a,
      t
    ]), r.useEffect(() => Dr(() => {
      i(Dt());
    }), []);
    const c = t ? d ? "\uC11C\uBC84 \uB85C\uADF8\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\u2026" : "\uC678\uBD80\uC5D0\uC11C \uC2E4\uD589 \uC911\uC778 \uC11C\uBC84\uB294 \uC774 \uC571\uC5D0\uC11C \uB85C\uADF8\uB97C \uAC00\uC838\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." : "Load model\uC744 \uC2E4\uD589\uD558\uBA74 mlx_vlm.generate worker raw \uCD9C\uB825\uC774 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4.";
    return e.jsx(Gr, {
      title: "\uC11C\uBC84 \uB85C\uADF8",
      ...t ? {
        subtitle: d ? "\uC571 \uAD00\uB9AC worker" : "\uC678\uBD80 \uD504\uB85C\uC138\uC2A4"
      } : {},
      lines: n,
      emptyHint: c,
      open: s,
      onOpenChange: l,
      onClear: us
    });
  }
  const bo = 250, po = "z-100001 max-w-[min(92vw,360px)] rounded-md border border-gray-200 bg-white px-3 py-2.5 text-[11px] leading-relaxed text-gray-700 shadow-md outline-none dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", go = "inline-flex shrink-0 items-center justify-center rounded-full border border-emerald-300/80 bg-white/80 p-1 text-emerald-800 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:border-emerald-800/60 dark:bg-odp-bgSoft dark:text-emerald-200 dark:hover:bg-emerald-950/40", $t = "mt-1.5 inline-flex items-center gap-1.5 rounded border border-emerald-300/80 bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-900 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-100 dark:hover:bg-emerald-950/60";
  function mo({ toolkit: t, onRefresh: a }) {
    const [s, l] = r.useState(null), [n, d] = r.useState(""), i = r.useCallback(async (j, y) => {
      l(j), d("");
      try {
        await y({
          onOutput: (v) => {
            d((b) => b + v);
          }
        }), await a();
      } catch (v) {
        const b = v instanceof Error ? v.message : "Install failed.";
        d((x) => `${x}${b}
`);
      } finally {
        l(null);
      }
    }, [
      a
    ]), c = (t == null ? void 0 : t.uvAvailable) === true, m = (t == null ? void 0 : t.mlxVlmInstalled) === true, k = (t == null ? void 0 : t.hfHubInstalled) === true;
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx("p", {
          className: "mb-2 font-semibold text-gray-800 dark:text-odp-fgStrong",
          children: "uv + uv tool run"
        }),
        e.jsxs("p", {
          className: "mb-2 text-[10px] text-gray-500 dark:text-odp-muted",
          children: [
            "\uC774 \uC571\uC740 GUI PATH \uB300\uC2E0 ",
            e.jsx("code", {
              className: "rounded px-0.5",
              children: "uv tool run --from \u2026"
            }),
            "\uB85C mlx-vlm / huggingface-hub CLI\uB97C \uC2E4\uD589\uD569\uB2C8\uB2E4."
          ]
        }),
        e.jsxs("ol", {
          className: "list-decimal space-y-2 pl-4",
          children: [
            e.jsxs("li", {
              children: [
                "uv \uC124\uCE58 (Mac)",
                e.jsx("pre", {
                  className: "mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft",
                  children: "curl -LsSf https://astral.sh/uv/install.sh | sh"
                }),
                c ? e.jsxs("p", {
                  className: "mt-1 text-[10px] text-emerald-700 dark:text-emerald-300",
                  children: [
                    "uv ready",
                    (t == null ? void 0 : t.uvPath) ? `: ${t.uvPath}` : ""
                  ]
                }) : e.jsxs("button", {
                  type: "button",
                  className: $t,
                  disabled: s != null,
                  onClick: () => {
                    i("uv", bs);
                  },
                  children: [
                    s === "uv" ? e.jsx(me, {
                      size: 12,
                      className: "animate-spin"
                    }) : null,
                    "uv \uC124\uCE58"
                  ]
                })
              ]
            }),
            e.jsxs("li", {
              children: [
                "PATH \uB4F1\uB85D (",
                e.jsx("code", {
                  className: "rounded px-0.5",
                  children: "~/.zshrc"
                }),
                " \uB4F1, \uD130\uBBF8\uB110\uC6A9)",
                e.jsx("pre", {
                  className: "mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft",
                  children: `export PATH="$HOME/.local/bin:$PATH"
# \uB610\uB294
source "$HOME/.local/bin/env"`
                })
              ]
            }),
            e.jsxs("li", {
              children: [
                "\uB3C4\uAD6C \uC124\uCE58 (\uB85C\uCEEC\uC5D0 \uC5C6\uC744 \uB54C)",
                e.jsxs("pre", {
                  className: "mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft",
                  children: [
                    "uv tool install mlx-vlm",
                    `
`,
                    "uv tool install huggingface-hub"
                  ]
                }),
                c && !m ? e.jsxs("button", {
                  type: "button",
                  className: $t,
                  disabled: s != null,
                  onClick: () => {
                    i("mlx-vlm", ps);
                  },
                  children: [
                    s === "mlx-vlm" ? e.jsx(me, {
                      size: 12,
                      className: "animate-spin"
                    }) : null,
                    "mlx-vlm \uC124\uCE58"
                  ]
                }) : null,
                c && !k ? e.jsxs("button", {
                  type: "button",
                  className: $t,
                  disabled: s != null,
                  onClick: () => {
                    i("huggingface-hub", gs);
                  },
                  children: [
                    s === "huggingface-hub" ? e.jsx(me, {
                      size: 12,
                      className: "animate-spin"
                    }) : null,
                    "huggingface-hub \uC124\uCE58"
                  ]
                }) : null,
                c && m && k ? e.jsx("p", {
                  className: "mt-1 text-[10px] text-emerald-700 dark:text-emerald-300",
                  children: "mlx-vlm \xB7 huggingface-hub installed"
                }) : null
              ]
            }),
            e.jsxs("li", {
              children: [
                "\uC2E4\uD589 \uC608 (\uC571 \uB0B4\uBD80\uC640 \uB3D9\uC77C)",
                e.jsx("pre", {
                  className: "mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft",
                  children: `uv tool run --from mlx-vlm mlx_vlm.generate --help
uv tool run --from huggingface-hub hf download org/model`
                })
              ]
            })
          ]
        }),
        n ? e.jsx("pre", {
          className: "mt-2 max-h-28 overflow-auto rounded bg-gray-100 px-2 py-1 font-mono text-[9px] text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted",
          children: n
        }) : null
      ]
    });
  }
  function ho({ toolkit: t, onRefresh: a }) {
    const [s, l] = r.useState(false), [n, d] = r.useState(false), i = r.useRef(null), c = r.useCallback(() => {
      i.current && (clearTimeout(i.current), i.current = null);
    }, []), m = r.useCallback(() => {
      c(), i.current = setTimeout(() => l(true), bo);
    }, [
      c
    ]), k = r.useCallback(() => {
      c(), n || l(false);
    }, [
      c,
      n
    ]), j = r.useCallback((b) => {
      l(b), b || d(false);
    }, []), y = r.useCallback(() => {
      c(), d((b) => {
        const x = !b;
        return l(x), x;
      });
    }, [
      c
    ]), v = r.useCallback(() => {
      c(), l(true);
    }, [
      c
    ]);
    return e.jsxs(dn, {
      open: s,
      onOpenChange: j,
      modal: false,
      children: [
        e.jsx(cn, {
          asChild: true,
          children: e.jsx("button", {
            type: "button",
            "aria-label": "MLX-VLM \uC124\uCE58 \uBC29\uBC95",
            "aria-expanded": s,
            "aria-haspopup": "dialog",
            className: go,
            onMouseEnter: m,
            onMouseLeave: k,
            onFocus: v,
            onClick: y,
            children: e.jsx(Zs, {
              size: 14
            })
          })
        }),
        e.jsx(xn, {
          children: e.jsxs(un, {
            side: "bottom",
            align: "end",
            sideOffset: 6,
            className: po,
            onMouseEnter: () => {
              c(), l(true);
            },
            onMouseLeave: k,
            onOpenAutoFocus: (b) => b.preventDefault(),
            children: [
              e.jsx(mo, {
                toolkit: t,
                onRefresh: a
              }),
              e.jsx(bn, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function fo({ toolkit: t, cliAvailable: a, cliDetail: s, runtimeLoaded: l, workerRunning: n = false, loadedModel: d, onRefresh: i }) {
    const c = (t == null ? void 0 : t.hfHubRunnable) === true;
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs("div", {
          className: "mb-1 flex items-start justify-between gap-3",
          children: [
            e.jsxs("p", {
              className: "text-xs leading-relaxed text-gray-600 dark:text-odp-muted",
              children: [
                "Apple Silicon\uC5D0\uC11C",
                " ",
                e.jsx("code", {
                  className: "rounded bg-white/80 px-1 dark:bg-odp-bgSoft",
                  children: "uv tool run --from mlx-vlm"
                }),
                "\uC73C\uB85C \uB85C\uCEEC MLX \uBAA8\uB378\uC744 \uC2E4\uD589\uD569\uB2C8\uB2E4. \uCD94\uB860\uC740",
                " ",
                e.jsx("code", {
                  className: "rounded bg-white/80 px-1 dark:bg-odp-bgSoft",
                  children: "mlx_vlm.generate"
                }),
                "\uC6CC\uCEE4\uB97C \uC9C1\uC811 \uD638\uCD9C\uD569\uB2C8\uB2E4. Hugging Face \uBAA8\uB378\uC740",
                " ",
                e.jsx("code", {
                  className: "rounded bg-white/80 px-1 dark:bg-odp-bgSoft",
                  children: "uv tool run --from huggingface-hub hf"
                }),
                "\uB85C \uB2E4\uC6B4\uB85C\uB4DC\uD569\uB2C8\uB2E4."
              ]
            }),
            e.jsx(ho, {
              toolkit: t,
              onRefresh: i
            })
          ]
        }),
        e.jsxs("div", {
          className: "flex flex-wrap items-center gap-2 text-[11px]",
          children: [
            e.jsxs("span", {
              className: [
                "rounded-full px-2 py-0.5 font-medium",
                (t == null ? void 0 : t.uvAvailable) ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" : "bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted"
              ].join(" "),
              children: [
                "uv: ",
                (t == null ? void 0 : t.uvAvailable) ? "ready" : "missing"
              ]
            }),
            e.jsxs("span", {
              className: [
                "rounded-full px-2 py-0.5 font-medium",
                a ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" : "bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted"
              ].join(" "),
              children: [
                "mlx-vlm: ",
                a ? "ready" : "missing"
              ]
            }),
            e.jsxs("span", {
              className: [
                "rounded-full px-2 py-0.5 font-medium",
                c ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" : "bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted"
              ].join(" "),
              children: [
                "hf: ",
                c ? "ready" : "missing"
              ]
            }),
            e.jsxs("span", {
              className: [
                "rounded-full px-2 py-0.5 font-medium",
                l ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200" : n ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200" : "bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted"
              ].join(" "),
              children: [
                "Runtime:",
                " ",
                l ? `loaded \xB7 ${d}` : n ? "worker running" : "not loaded"
              ]
            })
          ]
        }),
        !a && s ? e.jsxs("p", {
          className: "text-[11px] text-amber-700 dark:text-amber-300",
          children: [
            s,
            " \xB7 \uC6B0\uCE21 ",
            e.jsx("span", {
              className: "font-medium",
              children: "?"
            }),
            " \uB3C4\uC6C0\uB9D0\uC5D0\uC11C uv / \uB3C4\uAD6C \uC124\uCE58\uB97C \uC2E4\uD589\uD558\uC138\uC694."
          ]
        }) : a && s ? e.jsx("p", {
          className: "text-[10px] text-gray-500 dark:text-odp-muted",
          children: s
        }) : null
      ]
    });
  }
  function yo() {
    return e.jsxs("span", {
      className: "flex min-w-0 items-center gap-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
      children: [
        e.jsx(en, {
          size: 16
        }),
        "MLX-VLM (Tauri macOS)"
      ]
    });
  }
  function ko() {
    const t = Mr(), [a, s] = r.useState(false), [l, n] = r.useState(true), [d, i] = r.useState(true), [c, m] = r.useState(true), [k, j] = r.useState(true), [y, v] = r.useState(() => Gt()), [b, x] = r.useState(null), [g, I] = r.useState(null), [w, u] = r.useState({
      loaded: false,
      workerRunning: false,
      models: [],
      running: false
    }), [P, N] = r.useState(false), p = r.useCallback(async () => {
      const [A, G] = await Promise.all([
        ms(),
        hr(y)
      ]);
      x(A), I({
        available: A.available,
        ...A.detail ? {
          detail: A.detail
        } : {}
      }), u(G);
    }, [
      y
    ]), h = r.useCallback(async () => {
      N(true), j(true);
      try {
        await hs(y), fs();
      } catch (A) {
        alert(A instanceof Error ? A.message : "Failed to load MLX-VLM model.");
      } finally {
        await p(), N(false);
      }
    }, [
      p,
      y
    ]), M = r.useCallback(async () => {
      N(true);
      try {
        await ys(), await p();
      } catch (A) {
        alert(A instanceof Error ? A.message : "Failed to stop MLX-VLM runtime.");
      } finally {
        N(false);
      }
    }, [
      p
    ]);
    if (r.useEffect(() => {
      if (!gt()) return;
      p();
      const A = window.setInterval(() => {
        hr(y).then(u);
      }, 5e3);
      return () => window.clearInterval(A);
    }, [
      p,
      y
    ]), r.useEffect(() => {
      w.workerRunning && j(true);
    }, [
      w.workerRunning
    ]), r.useEffect(() => {
      const A = () => v(Gt());
      return window.addEventListener(mt, A), () => window.removeEventListener(mt, A);
    }, []), r.useEffect(() => {
      String(t.hash || "").replace(/^#/, "") === "settings-mlx-vlm" && (s(true), i(true));
    }, [
      t.hash
    ]), r.useEffect(() => {
      const A = (G) => {
        var _a2;
        ((_a2 = G.detail) == null ? void 0 : _a2.sectionId) === "settings-mlx-vlm" && (s(true), i(true));
      };
      return window.addEventListener(Ht, A), () => window.removeEventListener(Ht, A);
    }, []), !gt()) return null;
    const z = (b == null ? void 0 : b.available) === true, R = (b == null ? void 0 : b.hfHubRunnable) === true, T = z && R, Z = w.models[0] || y.selectedModelId, F = (A) => {
      Pr(A), v(A);
    };
    return e.jsxs("div", {
      id: "settings-mlx-vlm",
      tabIndex: -1,
      className: "scroll-mt-4 rounded-lg border border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/50 dark:bg-emerald-950/25",
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: () => s((A) => !A),
          "aria-expanded": a,
          className: "flex w-full items-center gap-2 px-4 py-3 text-left transition hover:bg-emerald-100/50 dark:hover:bg-emerald-950/30",
          children: [
            a ? e.jsx(de, {
              size: 16,
              className: "shrink-0 text-gray-500 dark:text-odp-muted"
            }) : e.jsx(ie, {
              size: 16,
              className: "shrink-0 text-gray-500 dark:text-odp-muted"
            }),
            e.jsx(yo, {})
          ]
        }),
        a ? e.jsxs("div", {
          className: "space-y-3 border-t border-emerald-200/80 px-4 pb-4 pt-3 dark:border-emerald-900/40",
          children: [
            e.jsx(fo, {
              toolkit: b,
              cliAvailable: z,
              ...(g == null ? void 0 : g.detail) ? {
                cliDetail: g.detail
              } : {},
              runtimeLoaded: w.loaded,
              loadedModel: Z,
              workerRunning: w.workerRunning,
              onRefresh: p
            }),
            e.jsx($e, {
              title: "\uC5F0\uACB0 \uC124\uC815",
              subtitle: y.hfToken.trim() ? "HF token set" : y.adapterPath.trim() ? "adapter configured" : "optional token / adapter",
              open: l,
              onOpenChange: n,
              children: e.jsx(to, {
                settings: y,
                disabled: P || w.loaded,
                onChange: F
              })
            }),
            e.jsx($e, {
              title: "\uBAA8\uB378",
              subtitle: "\uC124\uCE58 \xB7 \uAC80\uC0C9 \xB7 \uB2E4\uC6B4\uB85C\uB4DC",
              open: d,
              onOpenChange: i,
              children: e.jsx(io, {
                settings: y,
                onSettingsChange: v,
                cliAvailable: T,
                serverRunning: w.loaded,
                serverLoadedModels: w.models,
                disabled: P
              })
            }),
            e.jsxs($e, {
              title: "\uB7F0\uD0C0\uC784",
              subtitle: w.loaded ? `loaded \xB7 ${Z}` : w.workerRunning ? "worker running \xB7 model not loaded" : "not loaded",
              open: c,
              onOpenChange: m,
              children: [
                e.jsx(co, {
                  busy: P,
                  cliAvailable: z,
                  canStart: !!y.selectedModelId.trim(),
                  runtimeLoaded: w.loaded,
                  workerRunning: w.workerRunning,
                  loadedModels: w.models,
                  onStart: h,
                  onStop: M
                }),
                e.jsx(uo, {
                  serverRunning: w.workerRunning,
                  managedByApp: ks(),
                  open: k,
                  onOpenChange: j
                })
              ]
            })
          ]
        }) : null
      ]
    });
  }
  function jo(t, a, s = "") {
    const [l, n] = r.useState(s);
    return r.useEffect(() => {
      const d = t.current;
      if (!d || a.length === 0) return;
      const i = a.map((m) => document.getElementById(m)).filter((m) => !!m);
      if (i.length === 0) return;
      const c = new IntersectionObserver((m) => {
        var _a2;
        const j = (_a2 = m.filter((y) => y.isIntersecting).sort((y, v) => v.intersectionRatio - y.intersectionRatio)[0]) == null ? void 0 : _a2.target;
        (j == null ? void 0 : j.id) && n(j.id);
      }, {
        root: d,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [
          0,
          0.15,
          0.35,
          0.55,
          0.75,
          1
        ]
      });
      for (const m of i) c.observe(m);
      return () => c.disconnect();
    }, [
      t,
      a,
      s
    ]), l;
  }
  Do = function({ s3Creds: t, masterPassword: a, onSaveS3Creds: s, onExportCreds: l, onImportClick: n, showHiddenFolders: d, onToggleHiddenFolders: i, showTrashFolder: c = false, onToggleTrashFolder: m, hideRecordingCompanions: k = false, onToggleHideRecordingCompanions: j, treeStickyFolderPathEnabled: y = true, onToggleTreeStickyFolderPath: v, showTreeModifiedDate: b = false, onToggleShowTreeModifiedDate: x, treeHoverExpandSettings: g = Vs, onTreeHoverExpandSettingsChange: I, onRequestClose: w, webauthnSupported: u = false, webauthnEnabled: P = false, webauthnStorageOnly: N = false, onEnableWebAuthn: p, onDisableWebAuthn: h, snippetConfig: M, onChangeSnippetConfig: z, onSaveSnippetConfig: R, isSavingSnippets: T = false, snippetConfigLoaded: Z = false, editorType: F, onEditorTypeChange: A, storageMode: G = Ee, onStorageModeChange: re, localFolderName: V = "", localVaultFsPath: se = "", onOpenLocalFolder: ee, webdavConfig: J, onSaveWebdavConfig: E, isMobileLayout: q = false, sidebarOpen: te = true, sidebarCollapsed: ne = false, onOpenSidebar: he, onCheckAppUpdate: Me, isCheckingAppUpdate: fe = false, latestAppBuildId: Oe = "", onScanStorageUsage: Ae, canScanStorageUsage: xe = false, onOpenStorageUsageFile: Ke, onReadUnusedImageText: Pe, onReadUnusedImageBytes: De, onDeleteUnusedImagePaths: ve }) {
    const [f, L] = r.useState(t), [D, B] = r.useState(""), [U, H] = r.useState(J ?? {
      endpoint: "",
      username: "",
      password: "",
      basePath: ""
    }), [K, Y] = r.useState(false), [Te, Ze] = r.useState(u), [et, tt] = r.useState(() => js()), [ft, rt] = r.useState(() => F ?? vs()), [ze, at] = r.useState(() => Ns()), [Ne, st] = r.useState(() => Ss()), [Ue, Ge] = r.useState(() => fr()), [Se, we] = r.useState(() => ws()), [O, nt] = r.useState(() => X.getStatus()), [S, _] = r.useState(() => Cs()), [$, W] = r.useState(() => yr()), [ot, Q] = r.useState(false), [yt, pe] = r.useState(false), [Xr, lt] = r.useState(null), [qr, kt] = r.useState(false), [jt, vt] = r.useState(true), [dt, Nt] = r.useState(() => G === Ve), [it, St] = r.useState(false), [wt, Ct] = r.useState(true), [ye, qt] = r.useState(() => Ln(true)), Yt = r.useRef(null), He = Mr(), Jt = ta(), _e = Kt(), Qt = String(se || "").trim(), Yr = String(V || "").trim() || Es() || "", Et = _e && Qt ? Qt : Yr, Zt = _e || typeof window < "u" && "showDirectoryPicker" in window;
    r.useEffect(() => Ar((o, C) => {
      o === "settings-alt-vim" ? at(C) : o === "settings-workspace-tabs" ? st(C) : o === "settings-composer-helper" ? we(C) : o === "settings-as-animation" ? _(C) : (o === "settings-as-index" || o === "settings-as-include-other") && nt(X.getStatus());
    }), []), r.useEffect(() => {
      const o = (C) => {
        var _a2;
        const ae = ((_a2 = C == null ? void 0 : C.detail) == null ? void 0 : _a2.mode) ?? yr();
        W(ae);
      };
      return window.addEventListener(kr, o), () => {
        window.removeEventListener(kr, o);
      };
    }, []), r.useEffect(() => {
      const o = (C) => {
        var _a2;
        const ae = ((_a2 = C == null ? void 0 : C.detail) == null ? void 0 : _a2.mode) ?? fr();
        Ge(ae);
      };
      return window.addEventListener(jr, o), () => {
        window.removeEventListener(jr, o);
      };
    }, []), r.useEffect(() => {
      const o = String(He.hash || "").replace(/^#/, "");
      if (!o.startsWith("settings-")) return;
      o === "settings-s3" && vt(true), o === "settings-webdav" && St(true), o === "settings-local" && Nt(true), o === "settings-imgbb" && Ct(true), o === "settings-mlx-vlm" && Cr(o);
      const C = wr(o);
      C && qt((Xe) => ({
        ...Xe,
        [C]: true
      }));
      const ae = Er(o), Re = o === "settings-mlx-vlm" ? 220 : 80, Ce = window.setTimeout(() => {
        var _a2;
        const Xe = document.getElementById(ae);
        if (Xe) {
          Xe.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
          try {
            (_a2 = Xe.focus) == null ? void 0 : _a2.call(Xe, {
              preventScroll: true
            });
          } catch {
          }
        }
      }, Re);
      return () => window.clearTimeout(Ce);
    }, [
      He.hash,
      He.pathname
    ]), r.useEffect(() => X.subscribe(() => {
      nt(X.getStatus());
    }), []), r.useEffect(() => {
      L({
        ...t,
        llmProviderProfiles: Tt(t)
      }), B("");
    }, [
      t
    ]);
    const It = !!((t == null ? void 0 : t.imgbbApiKey) || "").trim(), We = (o) => {
      const C = o !== void 0 ? o : Tt(f), ae = Gs(C), Ce = D.trim() || (It ? t.imgbbApiKey : "");
      return {
        ...f,
        llmProviderProfiles: C,
        ...ae,
        imgbbApiKey: Ce
      };
    };
    r.useEffect(() => {
      H(J ?? {
        endpoint: "",
        username: "",
        password: "",
        basePath: ""
      });
    }, [
      J
    ]), r.useEffect(() => {
      F !== void 0 && rt(F);
    }, [
      F
    ]), r.useEffect(() => {
      let o = false;
      return Is().then((C) => {
        o || Ze(C);
      }), () => {
        o = true;
      };
    }, []);
    const Lt = Te && (a || N), er = r.useMemo(() => ({
      isDesktopApp: _e,
      showWebAuthnSection: Lt,
      canScanStorageUsage: xe
    }), [
      _e,
      Lt,
      xe
    ]), Mt = r.useMemo(() => In(er), [
      er
    ]), tr = r.useMemo(() => Mt.flatMap((o) => o.sections.map((C) => C.id)), [
      Mt
    ]), Jr = jo(Yt, tr, tr[0] || ""), ue = r.useCallback((o, C) => {
      o && qt((ae) => ({
        ...ae,
        [o]: C
      }));
    }, []), Qr = r.useCallback((o) => {
      const C = wr(o);
      ue(C, true), o === "settings-s3" && vt(true), o === "settings-webdav" && St(true), o === "settings-local" && Nt(true), o === "settings-imgbb" && Ct(true), o === "settings-mlx-vlm" && Cr(o);
      const ae = Er(o);
      Jt({
        pathname: He.pathname,
        hash: `#${o}`
      }, {
        replace: true
      });
      const Re = o === "settings-mlx-vlm" ? 220 : 120;
      window.setTimeout(() => {
        var _a2;
        const Ce = document.getElementById(ae);
        if (Ce) {
          Ce.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
          try {
            (_a2 = Ce.focus) == null ? void 0 : _a2.call(Ce, {
              preventScroll: true
            });
          } catch {
          }
        }
      }, Re);
    }, [
      He.pathname,
      Jt,
      ue
    ]), Zr = !q && ne ? "md:pl-14" : "";
    return e.jsxs("div", {
      className: "flex-1 flex flex-col bg-white dark:bg-odp-bgSofter min-w-0 max-h-full",
      children: [
        e.jsxs("div", {
          className: `px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-odp-surface flex justify-between items-center gap-3 bg-gray-50 dark:bg-odp-surface shrink-0 transition-[padding] duration-300 ease-in-out ${Zr}`,
          children: [
            e.jsxs("div", {
              className: "flex min-w-0 flex-1 items-center gap-2",
              children: [
                q && !te && typeof he == "function" && e.jsx("button", {
                  type: "button",
                  "aria-label": "\uC0AC\uC774\uB4DC\uBC14 \uC5F4\uAE30",
                  onClick: he,
                  className: "inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
                  children: e.jsx(Ls, {
                    size: 22
                  })
                }),
                e.jsxs("h2", {
                  className: "font-bold text-gray-700 dark:text-odp-fgStrong flex min-w-0 items-center gap-2",
                  children: [
                    e.jsx(Ms, {}),
                    " \uC124\uC815 \uBC0F \uC554\uD638\uD654"
                  ]
                })
              ]
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => w == null ? void 0 : w(We()),
              className: "text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded transition",
              children: e.jsx(_r, {
                size: 16
              })
            })
          ]
        }),
        e.jsxs("div", {
          className: "flex min-h-0 min-w-0 flex-1",
          children: [
            e.jsx("div", {
              ref: Yt,
              className: "min-w-0 flex-1 overflow-y-auto p-6",
              children: e.jsxs("div", {
                className: "space-y-4",
                children: [
                  e.jsxs(ke, {
                    id: "storage-connection",
                    title: "\uC800\uC7A5\uC18C \uBC0F \uC5F0\uACB0",
                    open: ye["storage-connection"] !== false,
                    onOpenChange: (o) => ue("storage-connection", o),
                    children: [
                      e.jsx(eo, {
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
                                    value: Ee,
                                    checked: G === Ee,
                                    onChange: () => re == null ? void 0 : re(Ee)
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
                                    value: Ve,
                                    checked: G === Ve,
                                    onChange: () => re == null ? void 0 : re(Ve)
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
                                    value: Je,
                                    checked: G === Je,
                                    onChange: () => re == null ? void 0 : re(Je)
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
                        onSubmit: (o) => {
                          o.preventDefault(), s(We());
                        },
                        className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => vt((o) => !o),
                            className: "flex w-full items-center gap-2 text-left",
                            "aria-expanded": jt,
                            children: [
                              jt ? e.jsx(de, {
                                size: 16,
                                className: "shrink-0 text-gray-500 dark:text-odp-muted"
                              }) : e.jsx(ie, {
                                size: 16,
                                className: "shrink-0 text-gray-500 dark:text-odp-muted"
                              }),
                              e.jsx("h3", {
                                className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
                                children: "S3 \uC5F0\uACB0 \uC815\uBCF4"
                              })
                            ]
                          }),
                          jt ? e.jsxs(e.Fragment, {
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
                                        value: f.accessKeyId,
                                        onChange: (o) => L((C) => ({
                                          ...C,
                                          accessKeyId: o.target.value
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
                                        value: f.secretAccessKey,
                                        onChange: (o) => L((C) => ({
                                          ...C,
                                          secretAccessKey: o.target.value
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
                                        value: f.region,
                                        onChange: (o) => L((C) => ({
                                          ...C,
                                          region: o.target.value
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
                                        value: f.bucket,
                                        onChange: (o) => L((C) => ({
                                          ...C,
                                          bucket: o.target.value
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
                                        value: f.endpoint || "",
                                        onChange: (o) => L((C) => ({
                                          ...C,
                                          endpoint: o.target.value
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
                                    onClick: () => w == null ? void 0 : w(We()),
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
                        onSubmit: (o) => {
                          o.preventDefault(), E == null ? void 0 : E(U);
                        },
                        className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => St((o) => !o),
                            className: "flex w-full items-center gap-2 text-left",
                            "aria-expanded": it,
                            children: [
                              it ? e.jsx(de, {
                                size: 16,
                                className: "shrink-0 text-gray-500 dark:text-odp-muted"
                              }) : e.jsx(ie, {
                                size: 16,
                                className: "shrink-0 text-gray-500 dark:text-odp-muted"
                              }),
                              e.jsx("h3", {
                                className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
                                children: "WebDAV \uC5F0\uACB0 \uC815\uBCF4"
                              }),
                              it ? null : e.jsx("span", {
                                className: "ml-auto text-[11px] font-normal text-gray-400 dark:text-odp-muted",
                                children: "\uC811\uD798"
                              })
                            ]
                          }),
                          it ? e.jsxs(e.Fragment, {
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
                                        value: U.endpoint,
                                        onChange: (o) => H((C) => ({
                                          ...C,
                                          endpoint: o.target.value
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
                                        value: U.username,
                                        onChange: (o) => H((C) => ({
                                          ...C,
                                          username: o.target.value
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
                                        value: U.password,
                                        onChange: (o) => H((C) => ({
                                          ...C,
                                          password: o.target.value
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
                                        value: U.basePath,
                                        onChange: (o) => H((C) => ({
                                          ...C,
                                          basePath: o.target.value
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
                                        const { createWebdavBackend: o } = await ea(async () => {
                                          const { createWebdavBackend: ae } = await import("./index-RydzSnnb.js").then(async (m2) => {
                                            await m2.__tla;
                                            return m2;
                                          }).then((Re) => Re.hH);
                                          return {
                                            createWebdavBackend: ae
                                          };
                                        }, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])), C = o(U);
                                        if (!C.isReady()) {
                                          alert("Endpoint\uC640 Username\uC744 \uC785\uB825\uD558\uC138\uC694.");
                                          return;
                                        }
                                        await C.testConnection(), alert("WebDAV \uC5F0\uACB0\uC5D0 \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4.");
                                      } catch (o) {
                                        alert("WebDAV \uC5F0\uACB0 \uC2E4\uD328: " + ((o == null ? void 0 : o.message) || o) + `

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
                            onClick: () => Nt((o) => !o),
                            className: "flex w-full items-center gap-2 text-left",
                            "aria-expanded": dt,
                            children: [
                              dt ? e.jsx(de, {
                                size: 16,
                                className: "shrink-0 text-gray-500 dark:text-odp-muted"
                              }) : e.jsx(ie, {
                                size: 16,
                                className: "shrink-0 text-gray-500 dark:text-odp-muted"
                              }),
                              e.jsx("h3", {
                                className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
                                children: "Local \uC5F0\uACB0 \uC815\uBCF4"
                              }),
                              dt ? null : e.jsx("span", {
                                className: "ml-auto text-[11px] font-normal text-gray-400 dark:text-odp-muted",
                                children: "\uC811\uD798"
                              })
                            ]
                          }),
                          dt ? e.jsxs(e.Fragment, {
                            children: [
                              e.jsx("p", {
                                className: "text-xs text-gray-600 dark:text-odp-muted",
                                children: _e ? "Local Haim\uC740 OS \uD3F4\uB354 \uC120\uD0DD \uB300\uD654\uC0C1\uC790\uB85C vault \uB8E8\uD2B8\uB97C \uC9C0\uC815\uD569\uB2C8\uB2E4. \uC120\uD0DD\uD55C \uD3F4\uB354\uC758 \uC804\uCCB4 \uACBD\uB85C\uAC00 \uC800\uC7A5\uB418\uBA70, \uC571\uC744 \uB2E4\uC2DC \uC5F4\uBA74 \uAC19\uC740 \uC704\uCE58\uB97C \uBCF5\uC6D0\uD569\uB2C8\uB2E4." : "Local Haim\uC740 \uBE0C\uB77C\uC6B0\uC800 File System Access API\uB85C \uC5F0 \uD3F4\uB354\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uBCF4\uC548\uC0C1 OS \uC804\uCCB4 \uACBD\uB85C\uB294 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC73C\uBA70, \uD3F4\uB354 \uC774\uB984\uC73C\uB85C \uC5F4\uB9B0 \uC704\uCE58\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
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
                                    value: Et || "(\uD3F4\uB354\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC74C)",
                                    "aria-label": _e ? "\uD604\uC7AC \uC5F4\uB9B0 \uB85C\uCEEC \uD3F4\uB354 \uACBD\uB85C" : "\uD604\uC7AC \uC5F4\uB9B0 \uB85C\uCEEC \uD3F4\uB354 \uC774\uB984"
                                  })
                                ]
                              }),
                              Zt ? null : e.jsx("p", {
                                className: "text-xs text-amber-700 dark:text-amber-300",
                                children: "\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uD3F4\uB354 \uC120\uD0DD\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Chromium \uACC4\uC5F4 \uBE0C\uB77C\uC6B0\uC800\uB97C \uC0AC\uC6A9\uD574 \uC8FC\uC138\uC694."
                              }),
                              e.jsx("div", {
                                className: "flex justify-end gap-2 pt-2",
                                children: e.jsxs("button", {
                                  type: "button",
                                  disabled: !Zt || typeof ee != "function",
                                  onClick: () => ee == null ? void 0 : ee(),
                                  className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                                  children: [
                                    e.jsx(Os, {
                                      size: 16
                                    }),
                                    Et ? "\uB2E4\uB978 \uD3F4\uB354 \uC5F4\uAE30" : "\uD3F4\uB354 \uC120\uD0DD"
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
                                onClick: l,
                                className: "flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded transition",
                                children: [
                                  e.jsx(As, {}),
                                  " S3 \uC5F0\uACB0\uC815\uBCF4 \uB0B4\uBCF4\uB0B4\uAE30"
                                ]
                              }),
                              e.jsxs("button", {
                                onClick: n,
                                className: "flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded transition",
                                children: [
                                  e.jsx(Ps, {}),
                                  " S3 \uC5F0\uACB0\uC815\uBCF4 \uBD88\uB7EC\uC624\uAE30"
                                ]
                              })
                            ]
                          })
                        ]
                      }),
                      Lt && e.jsxs("div", {
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
                            children: N ? "S3 \uC5F0\uACB0 \uC815\uBCF4\uAC00 \uBCF4\uC548 \uD0A4\uB85C\uB9CC \uC554\uD638\uD654\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0 \uC2DC\uC5D0\uB294 \uBE44\uBC00\uBC88\uD638\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4." : "\uC9C0\uBB38, Windows Hello, Touch ID \uB4F1\uC73C\uB85C \uC571 \uC7A0\uAE08 \uD574\uC81C\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0 \uC2DC\uC5D0\uB294 \uBE44\uBC00\uBC88\uD638\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
                          }),
                          N ? e.jsx("p", {
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
                                onClick: () => h == null ? void 0 : h(),
                                className: "text-xs text-red-600 dark:text-red-400 hover:underline",
                                children: "\uC0AC\uC6A9 \uD574\uC81C"
                              })
                            ]
                          }) : e.jsx("div", {
                            className: "flex flex-col gap-2",
                            children: e.jsx("button", {
                              type: "button",
                              disabled: K,
                              onClick: async () => {
                                if (K || !p) return;
                                let o;
                                try {
                                  o = p(a);
                                } catch (C) {
                                  alert((C == null ? void 0 : C.message) || "\uBCF4\uC548 \uD0A4 \uB4F1\uB85D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
                                  return;
                                }
                                Y(true);
                                try {
                                  await o;
                                } catch (C) {
                                  alert((C == null ? void 0 : C.message) || "\uBCF4\uC548 \uD0A4 \uB4F1\uB85D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
                                } finally {
                                  Y(false);
                                }
                              },
                              className: "text-left text-xs py-2 px-3 rounded border border-gray-300 dark:border-odp-borderStrong hover:bg-gray-100 dark:hover:bg-odp-surface transition",
                              "aria-label": "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uB4F1\uB85D",
                              children: K ? "\uB4F1\uB85D \uC911\u2026" : "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uC0AC\uC6A9 (\uB4F1\uB85D)"
                            })
                          })
                        ]
                      }),
                      xe && e.jsx("div", {
                        id: "settings-storage-usage",
                        tabIndex: -1,
                        className: "scroll-mt-4",
                        children: e.jsx(Wn, {
                          storageMode: G,
                          onScanTree: Ae,
                          canScan: xe,
                          onOpenFile: Ke
                        })
                      })
                    ]
                  }),
                  e.jsxs(ke, {
                    id: "ai",
                    title: "AI",
                    open: ye.ai !== false,
                    onOpenChange: (o) => ue("ai", o),
                    children: [
                      e.jsx(Tn, {
                        profiles: Tt(f),
                        onSaveProfiles: (o) => {
                          L((C) => ({
                            ...C,
                            llmProviderProfiles: o
                          })), s(We(o));
                        }
                      }),
                      e.jsx(ko, {})
                    ]
                  }),
                  e.jsxs(ke, {
                    id: "integrations",
                    title: "\uC678\uBD80 \uC5F0\uB3D9",
                    open: ye.integrations !== false,
                    onOpenChange: (o) => ue("integrations", o),
                    children: [
                      e.jsx(Jn, {
                        storageMode: G,
                        canScan: xe,
                        onScanTree: Ae,
                        onReadText: Pe,
                        onReadBytes: De,
                        onDeletePaths: ve
                      }),
                      e.jsxs("form", {
                        id: "settings-imgbb",
                        tabIndex: -1,
                        onSubmit: (o) => {
                          if (o.preventDefault(), !D.trim() && !It) {
                            alert("API \uD0A4\uB97C \uC785\uB825\uD558\uC138\uC694.");
                            return;
                          }
                          s(We());
                        },
                        className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => Ct((o) => !o),
                            className: "flex w-full items-center gap-2 text-left",
                            "aria-expanded": wt,
                            children: [
                              wt ? e.jsx(de, {
                                size: 16,
                                className: "shrink-0 text-gray-500 dark:text-odp-muted"
                              }) : e.jsx(ie, {
                                size: 16,
                                className: "shrink-0 text-gray-500 dark:text-odp-muted"
                              }),
                              e.jsx("h3", {
                                className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
                                children: "ImgBB"
                              })
                            ]
                          }),
                          wt ? e.jsxs(e.Fragment, {
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
                                    value: D,
                                    onChange: (o) => B(o.target.value),
                                    placeholder: It ? "\uC800\uC7A5\uB428 \u2014 \uBCC0\uACBD \uC2DC \uC0C8 \uD0A4 \uC785\uB825" : "ImgBB API \uD0A4 \uC785\uB825"
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
                      e.jsx(Cn, {})
                    ]
                  }),
                  e.jsxs(ke, {
                    id: "editor-content",
                    title: "\uC5D0\uB514\uD130 \uBC0F \uCF58\uD150\uCE20",
                    open: ye["editor-content"] !== false,
                    onOpenChange: (o) => ue("editor-content", o),
                    children: [
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
                                    value: qe,
                                    checked: ft === qe,
                                    onChange: () => {
                                      rt(qe), Ds(qe), A == null ? void 0 : A(qe);
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
                                    value: Ts,
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
                                children: zs.map((o) => e.jsxs("label", {
                                  className: "flex items-start gap-2 cursor-pointer",
                                  children: [
                                    e.jsx("input", {
                                      type: "radio",
                                      name: "footnoteDisplayMode",
                                      value: o.value,
                                      checked: $ === o.value,
                                      onChange: () => {
                                        _s(o.value), W(o.value);
                                      },
                                      className: "mt-0.5 shrink-0"
                                    }),
                                    e.jsxs("span", {
                                      children: [
                                        e.jsx("span", {
                                          className: "font-semibold",
                                          children: o.label
                                        }),
                                        e.jsx("span", {
                                          className: "text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5",
                                          children: o.description
                                        })
                                      ]
                                    })
                                  ]
                                }, o.value))
                              })
                            ]
                          })
                        ]
                      }),
                      e.jsx("div", {
                        id: "settings-snippets",
                        tabIndex: -1,
                        className: "scroll-mt-4",
                        children: e.jsx(kn, {
                          value: M,
                          onChange: z,
                          onSave: R,
                          isSaving: T,
                          isLoaded: Z
                        })
                      }),
                      e.jsx(vn, {}),
                      e.jsx(wn, {}),
                      e.jsx(jn, {})
                    ]
                  }),
                  e.jsx(ke, {
                    id: "search",
                    title: "\uAC80\uC0C9",
                    open: ye.search !== false,
                    onOpenChange: (o) => ue("search", o),
                    children: e.jsxs("div", {
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
                                oe("settings-as-animation", !S);
                              },
                              className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${S ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                              "aria-pressed": S,
                              "aria-label": "\uC5F4\uAE30/\uB2EB\uAE30 \uC560\uB2C8\uBA54\uC774\uC158",
                              children: e.jsx("span", {
                                className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${S ? "translate-x-4" : "translate-x-0.5"}`
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
                        !xt() && e.jsxs("label", {
                          className: "mt-3 flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                          children: [
                            e.jsx("button", {
                              type: "button",
                              onClick: () => {
                                oe("settings-as-index", !O.enabled);
                              },
                              className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${O.enabled ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                              "aria-pressed": O.enabled,
                              "aria-label": "\uC5ED\uC0C9\uC778 \uC0AC\uC6A9",
                              children: e.jsx("span", {
                                className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${O.enabled ? "translate-x-4" : "translate-x-0.5"}`
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
                        xt() && e.jsx("p", {
                          className: "mt-3 text-[11px] text-gray-500 dark:text-odp-muted",
                          children: "Android \uC571\uC5D0\uC11C\uB294 Lucivy \uC5ED\uC0C9\uC778\uC744 \uC0AC\uC6A9\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uD30C\uC77C\uBA85\xB7\uACBD\uB85C\xB7\uCEE4\uB9E8\uB4DC\uB9CC \uAC80\uC0C9\uD569\uB2C8\uB2E4."
                        }),
                        !xt() && e.jsxs("label", {
                          className: "mt-3 flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                          children: [
                            e.jsx("button", {
                              type: "button",
                              onClick: () => {
                                oe("settings-as-include-other", !O.includeOtherFiles);
                              },
                              disabled: !O.enabled,
                              className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 disabled:opacity-50 ${O.includeOtherFiles ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                              "aria-pressed": O.includeOtherFiles,
                              "aria-label": "\uAE30\uD0C0 \uD30C\uC77C \uC0C9\uC778 \uD3EC\uD568",
                              children: e.jsx("span", {
                                className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${O.includeOtherFiles ? "translate-x-4" : "translate-x-0.5"}`
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
                        !xt() && e.jsxs(e.Fragment, {
                          children: [
                            e.jsxs("div", {
                              className: `mt-3 rounded-md border px-3 py-2 text-xs ${O.building ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200" : O.hasIndex ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200" : "border-gray-200 bg-white text-gray-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-muted"}`,
                              children: [
                                O.building ? e.jsxs(e.Fragment, {
                                  children: [
                                    "\uBC31\uADF8\uB77C\uC6B4\uB4DC \uC0C9\uC778 \uC911",
                                    typeof O.buildProgress == "number" ? ` \xB7 ${Math.round(O.buildProgress * 100)}%` : "\u2026"
                                  ]
                                }) : O.isolationReady ? O.hasIndex ? e.jsxs(e.Fragment, {
                                  children: [
                                    "\uC0C9\uC778 \uC788\uC74C \xB7 \uD30C\uC77C ",
                                    O.fileCount,
                                    " \xB7 \uCC44\uD305",
                                    " ",
                                    O.chatCount,
                                    O.builtAt && O.builtAt !== (/* @__PURE__ */ new Date(0)).toISOString() ? ` \xB7 \uAC31\uC2E0 ${new Date(O.builtAt).toLocaleString()}` : ""
                                  ]
                                }) : e.jsx(e.Fragment, {
                                  children: "\uC804\uCCB4 \uC0C9\uC778 \uC5C6\uC74C \u2014 \uC800\uC7A5\uD55C \uBB38\uC11C\xB7\uCC44\uD305\uC740 \uC99D\uBD84 \uC0C9\uC778\uB429\uB2C8\uB2E4. \uC544\uB798 \u300C\uC0C9\uC778\u300D\uC73C\uB85C \uBCFC\uD2B8 \uC804\uCCB4\uB97C \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uB9CC\uB4E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                                }) : e.jsx(e.Fragment, {
                                  children: "\uAC80\uC0C9 \uC5D4\uC9C4 \uACA9\uB9AC(COOP/COEP)\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD558\uAC70\uB098 SharedArrayBuffer\uB97C \uC9C0\uC6D0\uD558\uB294 \uD658\uACBD\uC5D0\uC11C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694. \uD30C\uC77C\uBA85\xB7\uBC14\uB85C\uAC00\uAE30\uB294 \uACC4\uC18D \uAC80\uC0C9\uB429\uB2C8\uB2E4."
                                }),
                                O.lastError ? ` \xB7 \uC624\uB958: ${O.lastError}` : "",
                                O.hasCheckpoint && !O.building ? ` \xB7 \uC911\uC9C0\uB41C \uCCB4\uD06C\uD3EC\uC778\uD2B8 ${O.checkpointProcessedCount}\uAC1C` : ""
                              ]
                            }),
                            e.jsxs("div", {
                              className: "mt-3 flex flex-wrap gap-2",
                              children: [
                                e.jsxs("button", {
                                  type: "button",
                                  disabled: ot || !O.enabled || O.building || !O.isolationReady,
                                  onClick: () => {
                                    (async () => {
                                      const o = await X.getRebuildCheckpointInfo();
                                      if (o) {
                                        lt(o), pe(true);
                                        return;
                                      }
                                      if (O.hasIndex) {
                                        kt(true);
                                        return;
                                      }
                                      Q(true), X.rebuild({
                                        resume: false
                                      }).finally(() => Q(false));
                                    })();
                                  },
                                  className: "inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                                  children: [
                                    e.jsx(vr, {
                                      size: 14
                                    }),
                                    O.hasCheckpoint ? "\uC0C9\uC778 \uC7AC\uAC1C/\uB2E4\uC2DC \uC2DC\uC791" : O.hasIndex ? "\uB2E4\uC2DC \uC0C9\uC778" : "\uC0C9\uC778"
                                  ]
                                }),
                                O.building ? e.jsxs("button", {
                                  type: "button",
                                  onClick: () => X.cancelRebuild(),
                                  className: "inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60",
                                  title: "\uC0C9\uC778\uC744 \uC911\uC9C0\uD569\uB2C8\uB2E4. \uCCB4\uD06C\uD3EC\uC778\uD2B8\uB294 \uC720\uC9C0\uB418\uC5B4 \uC774\uC5B4\uC11C \uC7AC\uAC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                                  children: [
                                    e.jsx(Rs, {
                                      size: 14
                                    }),
                                    "\uC911\uC9C0"
                                  ]
                                }) : null,
                                e.jsx("button", {
                                  type: "button",
                                  disabled: ot || O.building || !O.hasIndex,
                                  onClick: () => {
                                    window.confirm("\uC5ED\uC0C9\uC778 \uCE90\uC2DC(.advanced-search/)\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694? \uC0AD\uC81C \uD6C4\uC5D0\uB294 \u300C\uC0C9\uC778\u300D\uC73C\uB85C \uB2E4\uC2DC \uC0DD\uC131\uD574\uC57C \uD569\uB2C8\uB2E4.") && (Q(true), X.clearCache().finally(() => Q(false)));
                                  },
                                  className: "inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:bg-odp-bgSoft dark:text-red-300 dark:hover:bg-red-950/30",
                                  children: "\uC5ED\uC0C9\uC778 \uCE90\uC2DC \uC0AD\uC81C"
                                })
                              ]
                            }),
                            e.jsx(Ur, {
                              isOpen: yt,
                              info: Xr,
                              onCancel: () => {
                                pe(false), lt(null);
                              },
                              onResume: () => {
                                pe(false), lt(null), Q(true), X.rebuild({
                                  resume: true
                                }).finally(() => Q(false));
                              },
                              onStartFresh: () => {
                                pe(false), lt(null), Q(true), X.rebuild({
                                  resume: false
                                }).finally(() => Q(false));
                              }
                            }),
                            e.jsx(ce, {
                              isOpen: qr,
                              title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
                              message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
                              confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
                              cancelLabel: "\uCDE8\uC18C",
                              onConfirm: () => {
                                kt(false), Q(true), X.rebuild({
                                  resume: false
                                }).finally(() => Q(false));
                              },
                              onCancel: () => kt(false)
                            }),
                            e.jsx(Kr, {
                              className: "mt-3",
                              logs: O.buildLogs || [],
                              building: O.building,
                              progress: O.buildProgress
                            })
                          ]
                        })
                      ]
                    })
                  }),
                  e.jsxs(ke, {
                    id: "ui-navigation",
                    title: "UI \uBC0F \uB124\uBE44\uAC8C\uC774\uC158",
                    open: ye["ui-navigation"] !== false,
                    onOpenChange: (o) => ue("ui-navigation", o),
                    children: [
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
                                      oe("settings-alt-vim", !ze);
                                    },
                                    className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${ze ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                    "aria-pressed": ze,
                                    "aria-label": "Alt+Vim \uCEE4\uC11C \uC774\uB3D9",
                                    children: e.jsx("span", {
                                      className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${ze ? "translate-x-4" : "translate-x-0.5"}`
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
                                      oe("settings-workspace-tabs", !Ne);
                                    },
                                    className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Ne ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                    "aria-pressed": Ne,
                                    "aria-label": "\uD0ED \uAE30\uB2A5",
                                    children: e.jsx("span", {
                                      className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Ne ? "translate-x-4" : "translate-x-0.5"}`
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
                              Ne ? e.jsxs("div", {
                                className: "pl-12 space-y-2",
                                children: [
                                  e.jsx("p", {
                                    className: "text-xs font-medium text-gray-700 dark:text-odp-fg",
                                    children: "\uD0ED \uC790\uB3D9 \uC800\uC7A5 \uC124\uC815"
                                  }),
                                  e.jsx(Le, {
                                    className: "flex flex-col gap-2",
                                    value: Ue,
                                    onValueChange: (o) => {
                                      o !== "off" && o !== "onFocusChange" && o !== "onWindowChange" || (Fs(o), Ge(o));
                                    },
                                    "aria-label": "\uD0ED \uC790\uB3D9 \uC800\uC7A5",
                                    children: Bs.map((o) => {
                                      const C = Ue === o.value;
                                      return e.jsx(be, {
                                        value: o.value,
                                        className: [
                                          "rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200 origin-left w-90",
                                          "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                                          C ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"
                                        ].join(" "),
                                        children: e.jsxs("div", {
                                          className: C ? "" : "opacity-50",
                                          children: [
                                            e.jsx("div", {
                                              className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong",
                                              children: o.label
                                            }),
                                            e.jsx("div", {
                                              className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
                                              children: o.description
                                            })
                                          ]
                                        })
                                      }, o.value);
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
                                onClick: m,
                                className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${c ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                "aria-pressed": c,
                                "aria-label": "\uC4F0\uB808\uAE30\uD1B5 \uBCF4\uAE30 \uD1A0\uAE00",
                                children: e.jsx("span", {
                                  className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${c ? "translate-x-4" : "translate-x-0.5"}`
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
                                onClick: i,
                                className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${d ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                "aria-pressed": d,
                                "aria-label": "\uC228\uAE40 \uD3F4\uB354 \uBCF4\uAE30 \uD1A0\uAE00",
                                children: e.jsx("span", {
                                  className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${d ? "translate-x-4" : "translate-x-0.5"}`
                                })
                              }),
                              e.jsx("span", {
                                className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                                children: "\uC228\uAE40 \uD3F4\uB354 \uBCF4\uAE30 (\uC774\uB984\uC774 `.` \uC73C\uB85C \uC2DC\uC791\uD558\uB294 \uD3F4\uB354, `.trash` \uC81C\uC678)"
                              })
                            ]
                          }),
                          typeof j == "function" && e.jsxs("label", {
                            className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                            children: [
                              e.jsx("button", {
                                type: "button",
                                onClick: j,
                                className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${k ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                "aria-pressed": k,
                                "aria-label": "\uB179\uC74C\xB7\uD544\uAE30 \uB3D9\uBC18 \uD30C\uC77C \uC228\uAE30\uAE30",
                                children: e.jsx("span", {
                                  className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${k ? "translate-x-4" : "translate-x-0.5"}`
                                })
                              }),
                              e.jsx("span", {
                                className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                                children: "\uB179\uC74C\xB7\uD544\uAE30 \uB3D9\uAE30\uD654 \uD30C\uC77C \uC228\uAE30\uAE30 (\uC0AC\uC774\uB4DC\uBC14 \uBAA9\uB85D\xB7\uB179\uC74C UI\xB7\uB3D9\uAE30\uD654 \uBCF4\uAE30\uC5D0\uC11C \uC81C\uC678)"
                              })
                            ]
                          }),
                          typeof v == "function" && e.jsxs("label", {
                            className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                            children: [
                              e.jsx("button", {
                                type: "button",
                                onClick: v,
                                className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${y ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                "aria-pressed": y,
                                "aria-label": "\uD2B8\uB9AC \uD3F4\uB354 \uACBD\uB85C sticky \uD45C\uC2DC",
                                children: e.jsx("span", {
                                  className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${y ? "translate-x-4" : "translate-x-0.5"}`
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
                                className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${b ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                "aria-pressed": b,
                                "aria-label": "\uD2B8\uB9AC \uC218\uC815 \uB0A0\uC9DC \uD45C\uC2DC",
                                children: e.jsx("span", {
                                  className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${b ? "translate-x-4" : "translate-x-0.5"}`
                                })
                              }),
                              e.jsx("span", {
                                className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                                children: "\uD2B8\uB9AC \uD30C\uC77C\uBA85 \uC544\uB798 \uC218\uC815 \uB0A0\uC9DC \uD45C\uC2DC (yy-MM-dd hh:mm:ss, \uACF5\uAC04\uC5D0 \uB530\uB77C \uCD95\uC57D)"
                              })
                            ]
                          }),
                          typeof I == "function" && e.jsxs("div", {
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
                                        onChange: (o) => {
                                          const C = Number(o.target.value);
                                          I({
                                            ...g,
                                            value: Number.isFinite(C) && C >= 0 ? C : 0
                                          });
                                        },
                                        className: "w-24 border border-gray-300 dark:border-odp-borderSoft rounded px-2 py-1.5 text-sm bg-white dark:bg-odp-bgSoft text-gray-800 dark:text-odp-fg",
                                        "aria-label": "\uD3F4\uB354 \uC790\uB3D9 \uD3BC\uCE68 \uB300\uAE30 \uC2DC\uAC04"
                                      })
                                    ]
                                  }),
                                  e.jsx("div", {
                                    className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg",
                                    children: e.jsxs(Le, {
                                      className: "flex items-center gap-3",
                                      value: g.unit,
                                      onValueChange: (o) => {
                                        o !== "s" && o !== "ms" || g.unit !== o && I({
                                          unit: o,
                                          value: $s(g.value, g.unit, o)
                                        });
                                      },
                                      "aria-label": "\uB300\uAE30 \uC2DC\uAC04 \uB2E8\uC704",
                                      children: [
                                        e.jsxs("label", {
                                          className: "flex items-center gap-1.5 cursor-pointer",
                                          children: [
                                            e.jsx(be, {
                                              value: "s",
                                              className: "size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                                              children: e.jsx(Ie, {
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
                                            e.jsx(be, {
                                              value: "ms",
                                              className: "size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                                              children: e.jsx(Ie, {
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
                                      Ks(g),
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
                                    value: ut,
                                    checked: et === ut,
                                    onChange: () => {
                                      tt(ut), Nr(ut);
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
                                    value: bt,
                                    checked: et === bt,
                                    onChange: () => {
                                      tt(bt), Nr(bt);
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
                      })
                    ]
                  }),
                  e.jsx(ke, {
                    id: "chat",
                    title: "\uCC44\uD305",
                    open: ye.chat !== false,
                    onOpenChange: (o) => ue("chat", o),
                    children: e.jsxs("div", {
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
                                oe("settings-composer-helper", !Se);
                              },
                              className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Se ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                              "aria-pressed": Se,
                              "aria-label": "\uC785\uB825\uCC3D \uB2E8\uCD95\uD0A4 \uC548\uB0B4 \uD45C\uC2DC",
                              children: e.jsx("span", {
                                className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Se ? "translate-x-4" : "translate-x-0.5"}`
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
                    })
                  }),
                  e.jsx(ke, {
                    id: "app",
                    title: "\uC571",
                    open: ye.app !== false,
                    onOpenChange: (o) => ue("app", o),
                    children: e.jsxs("div", {
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
                                  children: Us() || "\uC54C \uC218 \uC5C6\uC74C"
                                })
                              ]
                            }),
                            Oe ? e.jsxs("div", {
                              className: "flex flex-wrap gap-x-2 gap-y-0.5",
                              children: [
                                e.jsx("dt", {
                                  className: "shrink-0 font-semibold text-gray-700 dark:text-odp-fgStrong",
                                  children: "\uCD5C\uC2E0 \uBC84\uC804"
                                }),
                                e.jsx("dd", {
                                  className: "min-w-0 break-all font-mono",
                                  children: Oe
                                })
                              ]
                            }) : null
                          ]
                        }),
                        e.jsxs("button", {
                          type: "button",
                          onClick: () => Me == null ? void 0 : Me(),
                          disabled: fe || typeof Me != "function",
                          className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-60",
                          children: [
                            e.jsx(vr, {
                              size: 16
                            }),
                            fe ? "\uCD5C\uC2E0 \uBC84\uC804 \uD655\uC778 \uC911..." : "\uCD5C\uC2E0 \uBC84\uC804 \uD655\uC778 \uBC0F \uC989\uC2DC \uC5C5\uB370\uC774\uD2B8"
                          ]
                        })
                      ]
                    })
                  })
                ]
              })
            }),
            q ? null : e.jsx(On, {
              groups: Mt,
              activeSectionId: Jr,
              onNavigate: Qr
            })
          ]
        })
      ]
    });
  };
});
export {
  __tla,
  Do as default
};
