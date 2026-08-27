const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CxSNwP6k.js","assets/vendor-react-kfkzeLNk.js","assets/vendor-md-editor-BDWDGvn8.js","assets/vendor-aws-BG4gQ5qJ.js","assets/vendor-lucide-DL-f4Fg7.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-jUlp7ZOS.js","assets/vendor-radix-DRr4EGX0.js","assets/vendor-google-genai-BXoTgYIl.js","assets/index-DR4miiAX.css"])))=>i.map(i=>d[i]);
import { _ as Fr, __tla as __tla_0 } from "./vendor-md-editor-BDWDGvn8.js";
import { r, j as e, e as Br, u as ca, __tla as __tla_1 } from "./vendor-react-kfkzeLNk.js";
import { at as Tt, au as xa, av as ua, aw as ba, ax as pa, ay as ce, az as ma, aA as Je, aB as sr, aC as nr, aD as or, aE as ga, K as ha, aF as yt, aG as dr, aH as fa, aI as ya, aJ as ka, aK as ja, aL as lr, aM as ir, aN as oe, aO as cr, aP as xr, aQ as va, aR as Na, aS as Sa, aT as wa, aU as ur, aV as br, aW as pt, aX as Ca, aY as Ea, aZ as La, a_ as pr, a$ as Ia, b0 as Ma, b1 as mr, b2 as gr, b3 as je, b4 as Be, b5 as Ve, b6 as Ht, b7 as Oa, b8 as Aa, b9 as Pa, ba as hr, bb as Da, bc as Ta, bd as Vr, be as X, bf as Ie, bg as Ke, bh as et, bi as _a, bj as $r, F as de, bk as fr, bl as za, bm as Ra, bn as Fa, bo as Ba, bp as Va, bq as $a, br as Ua, bs as Ka, bt as Xt, bu as Wa, bv as Ga, bw as qt, bx as Ha, by as Xa, bz as qa, bA as yr, bB as Ya, bC as Qa, bD as _t, bE as Ja, bF as Za, bG as kr, bH as es, bI as ts, bJ as rs, bK as as, bL as ss, bM as ns, bN as jr, bO as os, bP as ds, bQ as kt, bR as ls, bS as zt, bT as is, bU as cs, bV as vr, bW as xs, bX as us, bY as bs, bZ as ps, b_ as ms, b$ as Ur, c0 as gs, c1 as Yt, c2 as hs, c3 as fs, c4 as ys, c5 as ks, c6 as js, c7 as vs, c8 as Ns, c9 as Ss, ca as Rt, cb as Kr, cc as ws, cd as Nr, ce as Cs, cf as Es, cg as Ls, ch as Is, ci as Sr, cj as Ms, ck as Os, cl as As, cm as Ps, cn as Ds, co as Ts, cp as wr, cq as _s, cr as zs, cs as Rs, ct as Fs, cu as Bs, cv as Cr, cw as Vs, cx as $s, cy as Er, cz as Us, cA as Ks, cB as Lr, cC as Ir, cD as Mr, cE as Or, cF as Ar, cG as Ft, cH as Ws, cI as Gs, cJ as Hs, cK as Xs, cL as qs, cM as Ys, cN as Qs, cO as Qe, cP as Js, cQ as Zs, cR as en, cS as tn, cT as mt, cU as rn, cV as an, cW as sn, cX as nn, cY as on, cZ as dn, c_ as gt, c$ as Pr, d0 as ht, d1 as ln, d2 as cn, __tla as __tla_2 } from "./index-CxSNwP6k.js";
import { z as Wr, R as Qt, D as Gr, G as tt, T as xn, J as le, K as ie, N as un, O as jt, X as Hr, Q as bn, L as ge, V as Xr, W as pn, i as mn, Y as gn, Z as hn, _ as fn, $ as yn, a0 as kn } from "./vendor-lucide-DL-f4Fg7.js";
import { T as jn } from "./TableStyleTemplateEditor-C_QTntxI.js";
import { S as Dr } from "./SliderWithScrubInput-B2qoXP-p.js";
import { S as qr, b as Yr, r as Oe, s as be, t as Me, D as vn, v as Nn, w as Sn, x as wn, y as Cn, z as En, h as Ln, B as In, j as Mn, k as On, E as An } from "./vendor-radix-DRr4EGX0.js";
import "./vendor-aws-BG4gQ5qJ.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-jUlp7ZOS.js";
import "./vendor-google-genai-BXoTgYIl.js";
import "./index-DKf8xmDw.js";
let ed;
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
  function me(t) {
    if (t == null || Number.isNaN(t)) return "\uC54C \uC218 \uC5C6\uC74C";
    if (t < 1024) return `${t} B`;
    const a = t / 1024;
    if (a < 1024) return `${a.toFixed(1)} KB`;
    const s = a / 1024;
    return s < 1024 ? `${s.toFixed(1)} MB` : `${(s / 1024).toFixed(1)} GB`;
  }
  function Pn(t) {
    const a = String(t || "").toLowerCase(), s = a.lastIndexOf(".");
    return s <= 0 || s === a.length - 1 ? "(none)" : a.slice(s + 1);
  }
  function Dn(t) {
    const a = String(t || "").replace(/^\/+/, "");
    return a === Tt || a === `${Tt}/` || a.startsWith(`${Tt}/`);
  }
  function Qr(t) {
    var _a2;
    if (t.type === "file") return typeof t.size == "number" && Number.isFinite(t.size) ? t.size : 0;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let a = 0;
    for (const s of t.children) a += Qr(s);
    return a;
  }
  function Jr(t) {
    var _a2;
    if (t.type === "file") return 1;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let a = 0;
    for (const s of t.children) a += Jr(s);
    return a;
  }
  function Tn(t) {
    const a = Array.isArray(t) ? t : [];
    let s = 0, d = 0, n = 0, l = 0, i = 0, c = 0, m = 0;
    const k = /* @__PURE__ */ new Map(), j = (x) => {
      var _a2;
      for (const h of x) {
        if (h.type === "folder") {
          d += 1, ((_a2 = h.children) == null ? void 0 : _a2.length) && j(h.children);
          continue;
        }
        if (h.type !== "file") continue;
        s += 1;
        const L = typeof h.size == "number" && Number.isFinite(h.size), w = L ? h.size : 0;
        L ? w === 0 && (n += 1) : l += 1, i += w;
        const u = h.path || h.name;
        Dn(u) && (c += w, m += 1);
        const P = Pn(h.name), S = k.get(P) ?? {
          count: 0,
          size: 0,
          files: []
        };
        S.count += 1, S.size += w, S.files.push({
          path: u,
          name: h.name,
          size: L ? w : null,
          node: h
        }), k.set(P, S);
      }
    };
    j(a);
    const g = [
      ...k.entries()
    ].map(([x, { count: h, size: L, files: w }]) => ({
      ext: x,
      label: x === "(none)" ? "(\uD655\uC7A5\uC790 \uC5C6\uC74C)" : `.${x}`,
      count: h,
      size: L,
      percent: i > 0 ? L / i * 100 : 0,
      files: [
        ...w
      ].sort((u, P) => (P.size ?? -1) - (u.size ?? -1) || u.path.localeCompare(P.path))
    })).sort((x, h) => h.size - x.size || h.count - x.count || x.label.localeCompare(h.label)), v = [], b = (x, h, L) => {
      var _a2;
      const w = x.filter((u) => u.type === "folder").map((u) => ({
        node: u,
        size: Qr(u),
        fileCount: Jr(u)
      })).sort((u, P) => P.size - u.size || u.node.name.localeCompare(P.node.name));
      for (const { node: u, size: P, fileCount: S } of w) {
        const p = u.path || `${u.name}/`, y = (u.children ?? []).some((M) => M.type === "folder");
        v.push({
          path: p,
          name: u.name,
          depth: h,
          parentPath: L,
          hasChildFolders: y,
          size: P,
          fileCount: S,
          percent: i > 0 ? P / i * 100 : 0
        }), ((_a2 = u.children) == null ? void 0 : _a2.length) && b(u.children, h + 1, p);
      }
    };
    return b(a, 0, null), {
      summary: {
        totalSize: i,
        fileCount: s,
        folderCount: d,
        zeroByteCount: n,
        unknownSizeCount: l,
        indexSize: c,
        indexFileCount: m
      },
      byExtension: g,
      folders: v
    };
  }
  function _n(t) {
    return !t || typeof t != "string" ? "" : t.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
  }
  function zn(t) {
    const a = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), s = [];
    (a ? t.metaKey : t.ctrlKey) && s.push("mod"), t.altKey && s.push("alt"), t.shiftKey && s.push("shift");
    const d = (t.key || "").toLowerCase();
    return !d || d === "shift" || d === "control" || d === "alt" || d === "meta" || (s.push(d), s.length <= 1) ? null : s.join("+");
  }
  function Bt(t) {
    if (!t || typeof t != "string") return "";
    const s = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "Cmd" : "Ctrl";
    return t.toLowerCase().replace(/\bmod\b/g, s).split("+").map((d) => d.trim().charAt(0).toUpperCase() + d.trim().slice(1)).join(" + ");
  }
  function Rn() {
    return {
      id: String(Date.now()) + "-" + Math.random().toString(36).slice(2),
      name: "",
      prefix: "",
      body: "",
      description: ""
    };
  }
  function Fn({ value: t, onChange: a, onSave: s, isSaving: d = false, isLoaded: n = true }) {
    const [l, i] = r.useState(() => t || {
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
      const S = (p) => {
        p.preventDefault(), p.stopPropagation();
        const y = zn(p);
        y && j(y);
      };
      return window.addEventListener("keydown", S, true), () => window.removeEventListener("keydown", S, true);
    }, [
      c
    ]);
    const g = (S) => {
      const p = {
        snippets: S
      };
      i(p), a == null ? void 0 : a(p);
    }, v = () => {
      g([
        ...l.snippets || [],
        Rn()
      ]);
    }, b = (S, p, y) => {
      const M = (l.snippets || []).map((_) => _.id === S ? {
        ..._,
        [p]: y
      } : _);
      g(M);
    }, x = (S) => {
      const p = (l.snippets || []).filter((y) => y.id !== S);
      g(p);
    }, h = (S) => {
      m(S), j(null);
    }, L = () => {
      m(null), j(null);
    }, w = () => {
      !c || !k || (b(c, "prefix", k), L());
    }, u = () => {
      const p = (l.snippets || []).map((R) => {
        const T = (R.prefix || "").trim(), Z = _n(T) || T;
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
      const _ = {
        snippets: p
      };
      i(_), a == null ? void 0 : a(_), s == null ? void 0 : s(_);
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
            P.map((S) => e.jsxs("div", {
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
                          value: S.name || "",
                          onChange: (p) => b(S.id, "name", p.target.value),
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
                              title: S.prefix ? Bt(S.prefix) : "",
                              children: S.prefix ? Bt(S.prefix) : "\uBBF8\uC124\uC815"
                            }),
                            e.jsx("button", {
                              type: "button",
                              className: "shrink-0 px-2 py-1 text-[11px] rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
                              onClick: () => h(S.id),
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
                      value: S.body || "",
                      onChange: (p) => b(S.id, "body", p.target.value),
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
                          value: S.description || "",
                          onChange: (p) => b(S.id, "description", p.target.value),
                          placeholder: "\uC608: TODO \uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC2A4\uB2C8\uD3AB"
                        })
                      ]
                    }),
                    e.jsx("button", {
                      type: "button",
                      className: "mt-4 sm:mt-6 px-2 py-1 text-[11px] text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/40 rounded hover:bg-red-50 dark:hover:bg-red-900/20 whitespace-nowrap",
                      onClick: () => {
                        window.confirm("\uC774 \uC2A4\uB2C8\uD3AB\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?") && x(S.id);
                      },
                      children: "\uC0AD\uC81C"
                    })
                  ]
                })
              ]
            }, S.id))
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
              disabled: d,
              className: "px-3 py-1.5 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition",
              children: d ? "\uC800\uC7A5 \uC911..." : "\uC2A4\uB2C8\uD3AB JSON \uC800\uC7A5"
            })
          ]
        }),
        c != null && e.jsx("div", {
          className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "snippet-shortcut-modal-title",
          onClick: L,
          children: e.jsxs("div", {
            className: "bg-white dark:bg-odp-surface rounded-lg shadow-xl border border-gray-200 dark:border-odp-borderStrong p-5 w-full max-w-sm",
            onClick: (S) => S.stopPropagation(),
            onKeyDown: (S) => S.stopPropagation(),
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
                  children: Bt(k)
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
                    onClick: L,
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
  function Bn() {
    const [t, a] = r.useState([]), [s, d] = r.useState(false), [n, l] = r.useState(false), [i, c] = r.useState(null), [m, k] = r.useState(false), [j, g] = r.useState(null), [v, b] = r.useState(null), x = r.useCallback(async () => {
      c(null);
      try {
        const u = await xa();
        a(u.files), d(true);
      } catch (u) {
        c(u instanceof Error ? u.message : String(u)), d(true);
      }
    }, []);
    r.useEffect(() => {
      x();
    }, [
      x
    ]);
    const h = () => {
      g(null), k(true);
    }, L = (u) => {
      g(u), k(true);
    }, w = async () => {
      if (v) {
        l(true), c(null);
        try {
          const u = await ma(v.id);
          a(u.files), b(null);
        } catch (u) {
          c(u instanceof Error ? u.message : String(u));
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
              children: ua.map((u) => e.jsxs("li", {
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
                  onClick: h,
                  className: "inline-flex items-center gap-1 rounded bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
                  children: [
                    e.jsx(Wr, {
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
                    e.jsx(Qt, {
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
            const P = ba(u.css);
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
                      children: P.map((S) => e.jsx("li", {
                        className: "rounded-full border border-gray-100 bg-gray-50 px-1.5 py-0.5 text-[10px] dark:border-odp-border dark:bg-odp-bg",
                        style: {
                          fontFamily: S
                        },
                        children: S
                      }, S))
                    }) : null
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: n,
                  onClick: () => L(u),
                  className: "inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg",
                  children: [
                    e.jsx(Gr, {
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
                    e.jsx(tt, {
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
        e.jsx(pa, {
          isOpen: m,
          initialFile: j,
          onClose: () => {
            k(false), g(null);
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
  let $e = null, Ue = null;
  function Vn() {
    $e = null, Ue = null;
  }
  async function $n() {
    return Je() ? $e || Ue || (Ue = (async () => {
      try {
        const { invoke: t } = await Fr(async () => {
          const { invoke: s } = await import("./index-CxSNwP6k.js").then(async (m) => {
            await m.__tla;
            return m;
          }).then((d) => d.h_);
          return {
            invoke: s
          };
        }, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])), a = await t("list_system_font_families");
        $e = Array.isArray(a) ? a : [];
      } catch {
        $e = [];
      } finally {
        Ue = null;
      }
      return $e ?? [];
    })(), Ue) : [];
  }
  const Tr = "Paperozi / A2z (\uAE30\uBCF8)";
  function Un() {
    const [t, a] = r.useState(() => sr()), [s, d] = r.useState([]), [n, l] = r.useState(Je()), [i, c] = r.useState(0), m = r.useCallback(async () => {
      if (Je()) {
        l(true);
        try {
          Vn();
          const v = await $n();
          d(v);
        } finally {
          l(false);
        }
      }
    }, []);
    r.useEffect(() => {
      m();
    }, [
      m
    ]), r.useEffect(() => {
      const v = () => a(sr()), b = () => c((x) => x + 1);
      return window.addEventListener(nr, v), window.addEventListener(or, b), () => {
        window.removeEventListener(nr, v), window.removeEventListener(or, b);
      };
    }, []);
    const k = r.useMemo(() => ga(s), [
      s,
      i
    ]), j = (v) => {
      a(v), dr(v);
    }, g = () => {
      a(""), dr("");
    };
    return e.jsxs("div", {
      className: "mb-4 border-b border-gray-200 pb-4 dark:border-odp-borderSoft",
      children: [
        e.jsxs("div", {
          className: "mb-2 flex flex-wrap items-center gap-x-2 gap-y-1",
          children: [
            e.jsx(xn, {
              className: "h-4 w-4 shrink-0 text-gray-500 dark:text-odp-muted",
              "aria-hidden": true
            }),
            e.jsx("h4", {
              className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong",
              children: "\uC571 \uAE00\uAF34"
            })
          ]
        }),
        e.jsxs("p", {
          className: "mb-3 text-[11px] leading-relaxed text-gray-500 dark:text-odp-muted",
          children: [
            "\uC0AC\uC774\uB4DC\uBC14\xB7\uC124\uC815\xB7\uC5D0\uB514\uD130 \uB4F1 \uC571 \uC804\uCCB4 UI\uC5D0 \uC801\uC6A9\uB429\uB2C8\uB2E4. \uC6F9\uD3F0\uD2B8\uB294 \uC124\uC815 \u2192 \uC6F9\uD3F0\uD2B8\uC5D0\uC11C \uCD94\uAC00\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
            Je() ? e.jsxs(e.Fragment, {
              children: [
                " ",
                "\uB370\uC2A4\uD06C\uD1B1 \uC571\uC5D0\uC11C\uB294 \uAE30\uAE30\uC5D0 \uC124\uCE58\uB41C \uAE00\uAF34\uB3C4 \uC120\uD0DD\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
              ]
            }) : null
          ]
        }),
        e.jsxs("label", {
          className: "block",
          children: [
            e.jsx("span", {
              className: "mb-1 block text-xs font-medium text-gray-700 dark:text-odp-fgStrong",
              children: "\uAE00\uAF34"
            }),
            e.jsx(ha, {
              id: "settings-ui-font-family",
              value: t,
              onChange: j,
              options: k,
              placeholder: Tr
            })
          ]
        }),
        e.jsxs("div", {
          className: "mt-3 flex flex-wrap items-center gap-2",
          children: [
            e.jsxs("button", {
              type: "button",
              onClick: g,
              className: "inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
              children: [
                e.jsx(yt, {
                  size: 14,
                  "aria-hidden": true
                }),
                "\uAE30\uBCF8\uAC12\uC73C\uB85C \uBCF5\uC6D0"
              ]
            }),
            Je() ? e.jsxs("button", {
              type: "button",
              onClick: () => {
                m();
              },
              disabled: n,
              className: "inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
              children: [
                e.jsx(yt, {
                  size: 14,
                  "aria-hidden": true
                }),
                n ? "\uC2DC\uC2A4\uD15C \uAE00\uAF34 \uBD88\uB7EC\uC624\uB294 \uC911\u2026" : "\uC2DC\uC2A4\uD15C \uAE00\uAF34 \uC0C8\uB85C\uACE0\uCE68"
              ]
            }) : null
          ]
        }),
        t ? null : e.jsxs("p", {
          className: "mt-2 text-[11px] text-gray-500 dark:text-odp-muted",
          children: [
            "\uD604\uC7AC: ",
            Tr
          ]
        })
      ]
    });
  }
  function Kn() {
    const [t, a] = r.useState([]), [s, d] = r.useState(false), [n, l] = r.useState(false), [i, c] = r.useState(null), [m, k] = r.useState(null), [j, g] = r.useState(false), v = r.useCallback(async () => {
      c(null);
      try {
        const x = await fa();
        a(x.templates), d(true);
      } catch (x) {
        c(x instanceof Error ? x.message : String(x)), a(ya().templates), d(true);
      }
    }, []);
    r.useEffect(() => {
      v();
    }, [
      v
    ]);
    const b = async (x) => {
      l(true), c(null);
      try {
        await ka({
          ...ja,
          templates: x
        }), a(x);
      } catch (h) {
        c(h instanceof Error ? h.message : String(h));
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
                }), g(true);
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
                        k(x), g(true);
                      },
                      children: "\uD3B8\uC9D1"
                    }),
                    e.jsx("button", {
                      type: "button",
                      className: "rounded px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
                      onClick: () => {
                        b(t.filter((h) => h.id !== x.id));
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
        e.jsx(jn, {
          isOpen: j,
          template: m,
          onClose: () => {
            g(false), k(null);
          },
          onSave: (x) => {
            const h = t.filter((L) => L.id !== (m == null ? void 0 : m.id) && L.id !== x.id);
            b([
              ...h,
              x
            ]).then(() => {
              g(false), k(null);
            });
          }
        })
      ]
    });
  }
  const Wn = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), Gn = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function ft({ label: t, description: a, checked: s, onCheckedChange: d, ariaLabel: n }) {
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
        e.jsx(qr, {
          className: Wn(s),
          checked: s,
          onCheckedChange: d,
          "aria-label": n,
          children: e.jsx(Yr, {
            className: Gn
          })
        })
      ]
    });
  }
  function Hn() {
    const [t, a] = r.useState(() => lr());
    return r.useEffect(() => {
      const s = () => a(lr());
      return s(), window.addEventListener(ir, s), () => window.removeEventListener(ir, s);
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
                e.jsx(ft, {
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
                    e.jsx(Dr, {
                      unit: "css",
                      suffix: "px",
                      min: xr,
                      max: cr,
                      step: 0.1,
                      value: t.centerSnapTolerancePx,
                      "aria-label": "\uAC00\uC6B4\uB370 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (s) => va(s)
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              className: "space-y-2 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: [
                e.jsx(ft, {
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
                    e.jsx(Dr, {
                      unit: "css",
                      suffix: "px",
                      min: xr,
                      max: cr,
                      step: 0.1,
                      value: t.objectSnapTolerancePx,
                      "aria-label": "\uAC1C\uCCB4 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (s) => Na(s)
                    })
                  ]
                })
              ]
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(ft, {
                label: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC",
                description: "\uC120\uD0DD\uACFC \uBB34\uAD00\uD558\uAC8C \uBAA8\uB4E0 \uD14D\uC2A4\uD2B8 \uC0C1\uC790\uB97C \uC605\uC740 \uBD89\uC740 \uC2E4\uC120\uC73C\uB85C \uD45C\uC2DC",
                checked: t.textContainerOutlineEnabled,
                onCheckedChange: (s) => oe("settings-cover-text-outline", s),
                ariaLabel: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC"
              })
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(ft, {
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
                Sa,
                "px \xB7 0.1px \uB2E8\uC704"
              ]
            })
          ]
        })
      ]
    });
  }
  function Xn() {
    const [t, a] = r.useState(""), [s, d] = r.useState(""), [n, l] = r.useState(null), [i, c] = r.useState(false);
    r.useEffect(() => {
      const b = () => {
        const h = La();
        a(h), d(h);
      };
      b(), wa().then((h) => {
        a(h.url), d(h.url);
      });
      const x = () => b();
      return window.addEventListener(ur, x), () => window.removeEventListener(ur, x);
    }, []);
    const m = br(t) !== s, k = br(t), j = !!String(t || "").trim() && !k, g = async () => {
      const b = String(t || "").trim();
      if (b && !k) {
        l("https:// \uB85C \uC2DC\uC791\uD558\uB294 Worker \uC8FC\uC18C\uB97C \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      c(true), l(null);
      try {
        const x = await pr(b);
        a(x), d(x), l(x ? `\uC800\uC7A5\uB428 \u2014 ${pt}\uC5D0 \uAE30\uB85D\uD588\uACE0, OG \uC694\uCCAD \uC2DC \uC774 Worker\uB97C \uAC00\uC7A5 \uBA3C\uC800 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.` : `Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${pt}).`);
      } finally {
        c(false);
      }
    }, v = async () => {
      c(true), l(null);
      try {
        a("");
        const b = await pr("");
        d(b), l(`Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${pt}).`);
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
              children: pt
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
              href: Ca,
              target: "_blank",
              rel: "noreferrer noopener",
              className: "inline-block",
              children: e.jsx("img", {
                src: Ea,
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
            a(b.target.value), l(null);
          },
          onKeyDown: (b) => {
            b.key === "Enter" && (b.preventDefault(), g());
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
                g();
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
  function ke({ id: t, title: a, open: s, onOpenChange: d, children: n }) {
    return e.jsxs("section", {
      id: `settings-group-${t}`,
      "aria-labelledby": `settings-group-${t}-title`,
      className: "scroll-mt-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50/80 dark:border-odp-borderStrong dark:bg-odp-surface/80",
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: () => d(!s),
          "aria-expanded": s,
          "aria-controls": `settings-group-${t}-panel`,
          id: `settings-group-${t}-title`,
          className: "flex w-full items-center gap-2 px-4 py-3 text-left transition hover:bg-gray-100/80 dark:hover:bg-odp-focusBg/40",
          children: [
            s ? e.jsx(le, {
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
  function qn({ groups: t, activeSectionId: a, onNavigate: s }) {
    const [d, n] = r.useState(""), l = r.useMemo(() => Ia(t, d), [
      t,
      d
    ]), i = d.trim();
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
                e.jsx(un, {
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
                e.jsx(jt, {
                  size: 13,
                  className: "pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-odp-muted",
                  "aria-hidden": true
                }),
                e.jsx("input", {
                  type: "search",
                  value: d,
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
          children: l.length === 0 ? e.jsx("p", {
            className: "px-2 py-3 text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
            children: i ? `"${i}"\uC5D0 \uB9DE\uB294 \uADF8\uB8F9\xB7\uC139\uC158\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.` : "\uD45C\uC2DC\uD560 \uC124\uC815 \uC5C6\uC74C"
          }) : e.jsx("ul", {
            className: "space-y-3",
            children: l.map((c) => e.jsxs("li", {
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
  const Vt = "size-3.5 rounded-full border border-gray-400 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft", $t = "relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white";
  function Yn(t) {
    return t === Ve ? "Google Gemini" : t === Be ? "MLX-VLM (local)" : "OpenAI \uD638\uD658";
  }
  function Qn() {
    return {
      id: Ta(),
      name: "",
      kind: je,
      baseUrl: "",
      keyInput: "",
      hasStoredKey: false
    };
  }
  function Jn(t) {
    return {
      id: t.id,
      name: t.name,
      kind: t.kind,
      baseUrl: t.baseUrl,
      keyInput: "",
      hasStoredKey: !!t.apiKey.trim()
    };
  }
  function Zn({ profiles: t, onSaveProfiles: a }) {
    const [s, d] = r.useState(true), [n, l] = r.useState(null), [i, c] = r.useState(null), [m, k] = r.useState(null), [j, g] = r.useState(0), [v, b] = r.useState(""), x = r.useMemo(() => i ? t.find((p) => p.id === i) ?? null : null, [
      i,
      t
    ]);
    r.useEffect(() => {
      if (!n) {
        b("");
        return;
      }
      b(Ma(n.id, n.kind) || mr(n.kind));
    }, [
      n == null ? void 0 : n.id,
      n == null ? void 0 : n.kind
    ]);
    const h = r.useCallback((p) => {
      n && (b(p), gr(n.id, p));
    }, [
      n
    ]), L = () => {
      c(null), l(Qn());
    }, w = (p) => {
      c(p.id), l(Jn(p));
    }, u = () => {
      l(null), c(null);
    }, P = () => {
      if (!n) return;
      const p = Da({
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
      const y = n.keyInput.trim() || ((x == null ? void 0 : x.id) === n.id ? x.apiKey : ""), M = {
        id: n.id,
        name: n.name.trim(),
        kind: n.kind,
        baseUrl: n.kind === je ? hr(n.baseUrl) : "",
        apiKey: y
      }, R = t.some((T) => T.id === M.id) ? t.map((T) => T.id === M.id ? M : T) : [
        ...t,
        M
      ];
      a(R), u();
    }, S = () => {
      if (!m) return;
      const p = t.filter((y) => y.id !== m.id);
      a(p), (n == null ? void 0 : n.id) === m.id && u(), k(null);
    };
    return e.jsxs("div", {
      id: "settings-llm-providers",
      tabIndex: -1,
      className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: () => d((p) => !p),
          className: "flex w-full items-center gap-2 text-left",
          "aria-expanded": s,
          children: [
            s ? e.jsx(le, {
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
                          Yn(p.kind),
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
                          e.jsx(Gr, {
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
                          e.jsx(tt, {
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
                      onChange: (p) => l((y) => y && {
                        ...y,
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
                    e.jsxs(Oe, {
                      className: "flex flex-wrap items-center gap-4",
                      value: n.kind,
                      onValueChange: (p) => {
                        if (p !== Ve && p !== je && p !== Be) return;
                        const y = p, M = mr(y);
                        l((_) => _ && (gr(_.id, M), {
                          ..._,
                          kind: y,
                          keyInput: "",
                          hasStoredKey: (x == null ? void 0 : x.kind) === y && !!x.apiKey.trim()
                        })), b(M), g((_) => _ + 1);
                      },
                      "aria-label": "\uC81C\uACF5\uC790 \uC885\uB958",
                      children: [
                        e.jsxs("label", {
                          className: "flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg",
                          children: [
                            e.jsx(be, {
                              value: Ve,
                              className: Vt,
                              children: e.jsx(Me, {
                                className: $t
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
                              className: Vt,
                              children: e.jsx(Me, {
                                className: $t
                              })
                            }),
                            e.jsx("span", {
                              children: "OpenAI \uD638\uD658"
                            })
                          ]
                        }),
                        Ht() ? e.jsxs("label", {
                          className: "flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg",
                          children: [
                            e.jsx(be, {
                              value: Be,
                              className: Vt,
                              children: e.jsx(Me, {
                                className: $t
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
                      onChange: (p) => l((y) => y && {
                        ...y,
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
                      onChange: (p) => l((y) => y && {
                        ...y,
                        keyInput: p.target.value
                      }),
                      placeholder: n.hasStoredKey ? "\uC800\uC7A5\uB428 \u2014 \uBCC0\uACBD \uC2DC \uC0C8 \uD0A4 \uC785\uB825" : n.kind === Ve ? "AI Studio API \uD0A4 \uC785\uB825" : "Bearer \uD1A0\uD070 (\uB85C\uCEEC \uC11C\uBC84\uB294 \uBE44\uC6CC \uB450\uC138\uC694)"
                    })
                  ]
                }),
                e.jsxs("div", {
                  children: [
                    e.jsx("label", {
                      className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                      children: "\uAE30\uBCF8 \uBAA8\uB378"
                    }),
                    n.kind === Ve ? e.jsx(Oa, {
                      getGeminiApiKey: () => n.keyInput.trim() || ((x == null ? void 0 : x.kind) === Ve ? x.apiKey : ""),
                      profileId: n.id,
                      value: v,
                      onChange: h,
                      autoLoad: n.hasStoredKey || !!n.keyInput.trim()
                    }, `${n.id}-${j}`) : n.kind === Be ? e.jsx(Aa, {
                      value: v,
                      onChange: h,
                      autoLoad: true,
                      autoLoadModelOnSelect: false
                    }, `${n.id}-${j}`) : e.jsx(Pa, {
                      getBaseUrl: () => n.baseUrl,
                      getApiKey: () => n.keyInput.trim() || ((x == null ? void 0 : x.kind) === je ? x.apiKey : ""),
                      value: v,
                      onChange: h,
                      autoLoad: !!hr(n.baseUrl)
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
              onClick: L,
              className: "inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs hover:bg-gray-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:hover:bg-odp-focusBg",
              children: [
                e.jsx(Wr, {
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
          onConfirm: S,
          onCancel: () => k(null)
        })
      ]
    });
  }
  function eo({ open: t, extension: a, onOpenChange: s, onOpenFile: d }) {
    const n = (a == null ? void 0 : a.files) ?? [], l = a ? `${a.label} \uD30C\uC77C` : "\uD30C\uC77C \uBAA9\uB85D";
    return e.jsx(vn, {
      open: t,
      onOpenChange: s,
      children: e.jsxs(Nn, {
        children: [
          e.jsx(Sn, {
            className: "fixed inset-0 z-100000 bg-black/40"
          }),
          e.jsxs(wn, {
            className: "fixed top-1/2 left-1/2 z-100001 flex max-h-[min(90vh,40rem)] w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft",
            "aria-describedby": void 0,
            children: [
              e.jsxs("div", {
                className: "flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-odp-borderStrong",
                children: [
                  e.jsxs("div", {
                    className: "min-w-0",
                    children: [
                      e.jsx(Cn, {
                        className: "truncate text-sm font-semibold text-gray-800 dark:text-odp-fgStrong",
                        children: l
                      }),
                      a ? e.jsxs("p", {
                        className: "mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted",
                        children: [
                          a.count.toLocaleString(),
                          "\uAC1C \xB7 ",
                          me(a.size)
                        ]
                      }) : null
                    ]
                  }),
                  e.jsx(En, {
                    asChild: true,
                    children: e.jsx("button", {
                      type: "button",
                      className: "inline-flex shrink-0 items-center justify-center rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-odp-focusBg dark:hover:text-odp-fg",
                      "aria-label": "\uB2EB\uAE30",
                      children: e.jsx(Hr, {
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
                        d(i);
                      },
                      className: "flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition hover:bg-gray-50 dark:hover:bg-odp-focusBg/40",
                      children: [
                        e.jsx(bn, {
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
                          children: me(i.size)
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
  const to = 160;
  function ro(t) {
    return t === "error" ? "text-red-600 dark:text-red-400" : t === "warn" ? "text-amber-700 dark:text-amber-300" : t === "ok" ? "text-emerald-700 dark:text-emerald-300" : "text-gray-600 dark:text-odp-muted";
  }
  function Zr({ logs: t, building: a = false, progress: s = null, className: d = "" }) {
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
      className: `overflow-hidden rounded-md border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft ${d}`,
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
        }) : e.jsx(Vr, {
          ref: n,
          className: "overscroll-contain px-2.5 py-1.5 font-mono text-[10px] leading-relaxed",
          style: {
            height: to
          },
          data: t,
          "aria-live": "polite",
          "aria-relevant": "additions",
          children: (l) => e.jsxs("div", {
            className: `whitespace-pre-wrap break-all ${ro(l.level)}`,
            children: [
              e.jsx("span", {
                className: "text-gray-400 dark:text-odp-muted",
                children: ao(l.at)
              }),
              " ",
              l.message
            ]
          }, l.id)
        })
      ]
    });
  }
  function ao(t) {
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
  function ea({ isOpen: t, info: a, onResume: s, onStartFresh: d, onCancel: n }) {
    const l = (a == null ? void 0 : a.processedFileCount) ?? 0, i = (a == null ? void 0 : a.processedChatCount) ?? 0, c = l + i, m = (a == null ? void 0 : a.updatedAt) && a.updatedAt > 0 ? new Date(a.updatedAt).toLocaleString() : null;
    return e.jsx(ce, {
      isOpen: t,
      title: "\uC911\uC9C0\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8",
      message: c > 0 ? `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778\uC774 \uC788\uC2B5\uB2C8\uB2E4.
\uCC98\uB9AC\uB428: \uD30C\uC77C ${l} \xB7 \uCC44\uD305 day ${i}${m ? `
\uC800\uC7A5 \uC2DC\uAC01: ${m}` : ""}

\uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAE4C\uC694, \uC544\uB2C8\uBA74 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uB9CC\uB4E4\uAE4C\uC694?` : `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4.
\uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAE4C\uC694, \uC544\uB2C8\uBA74 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uB9CC\uB4E4\uAE4C\uC694?`,
      confirmLabel: "\uC774\uC5B4\uC11C \uC0C9\uC778",
      discardLabel: "\uCC98\uC74C\uBD80\uD130",
      cancelLabel: "\uCDE8\uC18C",
      onConfirm: s,
      onDiscard: d,
      onCancel: n
    });
  }
  const Ze = [
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
  ], so = `linear-gradient(90deg, ${Ze.map((t) => `rgb(${t.rgb.join(" ")}) ${(t.t * 100).toFixed(2)}%`).join(", ")})`;
  function _r(t) {
    return Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : 0;
  }
  function Ut(t, a, s) {
    return Math.round(t + (a - t) * s);
  }
  function no(t) {
    const a = _r(t / 100);
    let s = 0;
    for (; s < Ze.length - 2 && a > Ze[s + 1].t; ) s += 1;
    const d = Ze[s], n = Ze[s + 1], l = n.t - d.t || 1, i = _r((a - d.t) / l), c = Ut(d.rgb[0], n.rgb[0], i), m = Ut(d.rgb[1], n.rgb[1], i), k = Ut(d.rgb[2], n.rgb[2], i);
    return `rgb(${c} ${m} ${k})`;
  }
  function zr({ percent: t }) {
    const a = no(t);
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
  function oo() {
    return e.jsxs("div", {
      className: "space-y-0.5",
      "aria-label": "\uC6A9\uB7C9 \uBE44\uC728 \uC0C9\uC0C1 \uBC94\uB840",
      children: [
        e.jsx("div", {
          className: "h-1.5 w-full rounded-full border border-gray-200 dark:border-odp-borderStrong",
          style: {
            backgroundImage: so
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
  function lo(t) {
    return t === Ke ? "Local Haim" : t === et ? "WebDAV Haim" : t === Ie ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function io() {
    return e.jsx("div", {
      className: "flex h-40 min-h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-white text-xs text-gray-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted md:h-full md:min-h-48",
      children: "\uADF8\uB798\uD504 \uC900\uBE44\uC911"
    });
  }
  function co({ depth: t, expandable: a, expanded: s, label: d }) {
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
          children: s ? e.jsx(le, {
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
          children: d
        })
      ]
    });
  }
  function Kt({ columns: t, rows: a, emptyText: s = "\uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", maxHeightClass: d = "max-h-64", legendColumnKey: n = null }) {
    return e.jsx("div", {
      className: `${d} overflow-auto rounded-md border border-gray-200 dark:border-odp-borderStrong`,
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
            children: a.length === 0 ? e.jsx("tr", {
              children: e.jsx("td", {
                colSpan: t.length,
                className: "px-3 py-6 text-center text-gray-500 dark:text-odp-muted",
                children: s
              })
            }) : a.map((l, i) => {
              var _a2, _b, _c, _d;
              const c = typeof l._onClick == "function", m = ((_a2 = l._tree) == null ? void 0 : _a2.expandable) ? l._tree.expanded : void 0, k = (_c = (_b = a[i - 1]) == null ? void 0 : _b._tree) == null ? void 0 : _c.depth, j = (_d = l._tree) == null ? void 0 : _d.depth, g = i > 0 && typeof k == "number" && typeof j == "number" && j < k, v = (b) => {
                var _a3;
                c && (b.key !== "Enter" && b.key !== " " || (b.preventDefault(), (_a3 = l._onClick) == null ? void 0 : _a3.call(l)));
              };
              return e.jsx("tr", {
                onClick: c ? l._onClick : void 0,
                onKeyDown: v,
                tabIndex: c ? 0 : void 0,
                "aria-expanded": m,
                className: `hover:bg-gray-50 dark:hover:bg-odp-focusBg/40 ${c ? "cursor-pointer" : ""}`,
                children: t.map((b) => {
                  const x = b.tree ? l._tree : void 0;
                  return e.jsx("td", {
                    className: `px-3 py-1.5 text-gray-700 dark:text-odp-fg ${g ? "border-t-2 border-gray-300 dark:border-odp-borderStrong" : "border-t border-gray-100 dark:border-odp-borderSoft"} ${b.align === "right" ? "text-right tabular-nums" : ""} ${b.className ?? ""}`,
                    children: x ? e.jsx(co, {
                      depth: x.depth,
                      expandable: x.expandable,
                      expanded: x.expanded,
                      label: x.label
                    }) : l[b.key]
                  }, b.key);
                })
              }, l._key ?? i);
            })
          }),
          n ? e.jsx("tfoot", {
            children: e.jsx("tr", {
              children: t.map((l) => e.jsx("td", {
                className: "sticky bottom-0 border-t border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: l.key === n ? e.jsx(oo, {}) : null
              }, l.key))
            })
          }) : null
        ]
      })
    });
  }
  function xo(t, a) {
    const s = /* @__PURE__ */ new Set(), d = [];
    for (const n of t) (n.parentPath == null || s.has(n.parentPath) && a.has(n.parentPath)) && (d.push(n), s.add(n.path));
    return d;
  }
  function Wt({ title: t, open: a, onToggle: s, children: d }) {
    return e.jsxs("div", {
      className: "rounded-md border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-bgSoft",
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: s,
          "aria-expanded": a,
          className: "flex w-full items-center gap-1.5 px-3 py-2 text-left text-xs font-bold text-gray-700 transition hover:bg-gray-50 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg/40",
          children: [
            a ? e.jsx(le, {
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
              children: e.jsx(io, {})
            }),
            e.jsx("div", {
              className: "min-w-0",
              children: d
            })
          ]
        }) : null
      ]
    });
  }
  function uo({ storageMode: t = Ie, onScanTree: a, canScan: s = true, onOpenFile: d }) {
    const [n, l] = r.useState(false), [i, c] = r.useState(null), [m, k] = r.useState(null), [j, g] = r.useState(() => /* @__PURE__ */ new Set()), [v, b] = r.useState(null), [x, h] = r.useState({
      summary: true,
      extension: false,
      folder: false
    }), [L, w] = r.useState(false), [u, P] = r.useState(() => X.getStatus()), [S, p] = r.useState(false), [y, M] = r.useState(null), [_, R] = r.useState(false);
    r.useEffect(() => X.subscribe(() => {
      P(X.getStatus());
    }), []), r.useEffect(() => {
      X.refreshCheckpointStatus();
    }, []), r.useEffect(() => {
      k(null), c(null), g(/* @__PURE__ */ new Set()), b(null), h({
        summary: true,
        extension: false,
        folder: false
      });
    }, [
      t
    ]);
    const T = (E) => {
      h((q) => ({
        ...q,
        [E]: !q[E]
      }));
    }, Z = (E) => {
      g((q) => {
        const te = new Set(q);
        return te.has(E) ? te.delete(E) : te.add(E), te;
      });
    }, V = async () => {
      if (!(!a || !s || n)) {
        l(true), c(null);
        try {
          const E = await a();
          k(Tn(E)), g(/* @__PURE__ */ new Set()), b(null);
        } catch (E) {
          const q = E instanceof Error ? E.message : String(E);
          c(q || "\uC6A9\uB7C9 \uBD84\uC11D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."), k(null), g(/* @__PURE__ */ new Set()), b(null);
        } finally {
          l(false);
        }
      }
    }, A = (E) => {
      L || u.building || !u.enabled || !u.isolationReady || (w(true), X.rebuild({
        resume: E
      }).finally(() => w(false)));
    }, K = () => {
      L || u.building || !u.enabled || !u.isolationReady || (async () => {
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
    }, $ = m == null ? void 0 : m.summary, se = $ && $.totalSize > 0 ? $.indexSize / $.totalSize * 100 : 0, ee = $ ? [
      {
        label: "\uCD1D \uC6A9\uB7C9",
        value: me($.totalSize)
      },
      {
        label: "\uC0C9\uC778 \uB370\uC774\uD130 (.advanced-search)",
        value: `${me($.indexSize)} \xB7 ${$.indexFileCount.toLocaleString()}\uAC1C \uD30C\uC77C${$.totalSize > 0 ? ` \xB7 ${se.toFixed(1)}%` : ""}`
      },
      {
        label: "\uC0C9\uC778 \uC81C\uC678 \uC6A9\uB7C9",
        value: me(Math.max(0, $.totalSize - $.indexSize))
      },
      {
        label: "\uD30C\uC77C \uC218",
        value: $.fileCount.toLocaleString()
      },
      {
        label: "\uD3F4\uB354 \uC218",
        value: $.folderCount.toLocaleString()
      },
      {
        label: "0 byte \uD30C\uC77C",
        value: $.zeroByteCount.toLocaleString()
      },
      ...$.unknownSizeCount > 0 ? [
        {
          label: "\uD06C\uAE30 \uBBF8\uD655\uC778 \uD30C\uC77C",
          value: $.unknownSizeCount.toLocaleString()
        }
      ] : []
    ] : [], Q = xo((m == null ? void 0 : m.folders) ?? [], j);
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
                      children: lo(t)
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
                  onClick: K,
                  disabled: !s || L || u.building || !u.enabled || !u.isolationReady,
                  className: "inline-flex items-center gap-1.5 rounded border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                  title: u.enabled ? u.isolationReady ? "Advanced Search \uC5ED\uC0C9\uC778\uC744 \uBC31\uADF8\uB77C\uC6B4\uB4DC\uB85C \uC0DD\uC131\uD569\uB2C8\uB2E4" : "\uAC80\uC0C9 \uACA9\uB9AC(COOP/COEP)\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694" : "\uC124\uC815\uC5D0\uC11C \uC5ED\uC0C9\uC778\uC744 \uCF20 \uB4A4 \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",
                  children: [
                    L || u.building ? e.jsx(ge, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(jt, {
                      size: 14
                    }),
                    L || u.building ? typeof u.buildProgress == "number" ? `\uC0C9\uC778 \uC911 ${Math.round(u.buildProgress * 100)}%` : "\uC0C9\uC778 \uC911\u2026" : u.hasCheckpoint ? "\uC0C9\uC778 \uC7AC\uAC1C/\uB2E4\uC2DC \uC2DC\uC791" : u.hasIndex ? "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131" : "\uC5ED\uC0C9\uC778 \uC0DD\uC131"
                  ]
                }),
                u.building ? e.jsxs("button", {
                  type: "button",
                  onClick: re,
                  className: "inline-flex items-center gap-1.5 rounded border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60",
                  title: "\uC0C9\uC778\uC744 \uC911\uC9C0\uD569\uB2C8\uB2E4. \uCCB4\uD06C\uD3EC\uC778\uD2B8\uB294 \uC720\uC9C0\uB418\uC5B4 \uC774\uC5B4\uC11C \uC7AC\uAC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                  children: [
                    e.jsx(Xr, {
                      size: 14
                    }),
                    "\uC911\uC9C0"
                  ]
                }) : null,
                e.jsxs("button", {
                  type: "button",
                  onClick: V,
                  disabled: !s || n || typeof a != "function",
                  className: "inline-flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
                  children: [
                    n ? e.jsx(ge, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(Qt, {
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
        e.jsx(Zr, {
          logs: u.buildLogs || [],
          building: u.building,
          progress: u.buildProgress
        }),
        e.jsx(ea, {
          isOpen: S,
          info: y,
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
          isOpen: _,
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
            e.jsx(Wt, {
              title: "\uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: x.summary,
              onToggle: () => T("summary"),
              children: e.jsx(Kt, {
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
            e.jsx(Wt, {
              title: "\uD30C\uC77C \uD615\uC2DD\uBCC4 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: x.extension,
              onToggle: () => T("extension"),
              children: e.jsx(Kt, {
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
                  size: me(E.size),
                  percent: e.jsx(zr, {
                    percent: E.percent
                  }),
                  _onClick: () => b(E)
                })),
                emptyText: "\uBD84\uC11D\uC744 \uC2DC\uC791\uD558\uBA74 \uD615\uC2DD\uBCC4 \uC6A9\uB7C9\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4.",
                legendColumnKey: "percent"
              })
            }),
            e.jsx(Wt, {
              title: "\uD3F4\uB354\uBCC4 \uC6A9\uB7C9 (Tree Size)",
              open: x.folder,
              onToggle: () => T("folder"),
              children: e.jsx(Kt, {
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
                rows: Q.map((E) => {
                  const q = j.has(E.path);
                  return {
                    _key: E.path,
                    fileCount: E.fileCount.toLocaleString(),
                    size: me(E.size),
                    percent: e.jsx(zr, {
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
        e.jsx(eo, {
          open: v != null,
          extension: v,
          onOpenChange: (E) => {
            E || b(null);
          },
          onOpenFile: async (E) => {
            b(null), await (d == null ? void 0 : d(E));
          }
        })
      ]
    });
  }
  const bo = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), po = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function mo(t) {
    return t === Ke ? "Local Haim" : t === et ? "WebDAV Haim" : t === Ie ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function go({ storageMode: t, canScan: a = false, onScanTree: s, onReadText: d, onReadBytes: n, onDeletePaths: l }) {
    const [i, c] = r.useState(() => _a()), [m, k] = r.useState("notes"), [j, g] = r.useState("trash"), [v, b] = r.useState(false), [x, h] = r.useState(false), [L, w] = r.useState(null), [u, P] = r.useState(null), [S, p] = r.useState(""), [y, M] = r.useState([]), [_, R] = r.useState(() => /* @__PURE__ */ new Set()), [T, Z] = r.useState([]), [V, A] = r.useState(() => /* @__PURE__ */ new Set()), [K, re] = r.useState({}), [$, se] = r.useState(false), [ee, Q] = r.useState([]), [E, q] = r.useState(false), te = r.useRef(null);
    r.useEffect(() => $r((f, I) => {
      f === "settings-orphan-image-auto" && c(I);
    }), []), r.useEffect(() => () => {
      var _a2;
      (_a2 = te.current) == null ? void 0 : _a2.abort();
    }, []);
    const ne = v || x || E, he = async () => {
      var _a2;
      if (!a || !s || !d || ne) return;
      (_a2 = te.current) == null ? void 0 : _a2.abort();
      const f = new AbortController();
      te.current = f, b(true), p(""), w(null);
      try {
        const I = await s();
        if (f.signal.aborted) return;
        const D = fr(I, m), B = za(I), W = /* @__PURE__ */ new Set();
        if (await Ra(B, 6, async (U) => {
          try {
            const Y = await d(U);
            for (const _e of Fa(Y)) W.add(_e);
          } catch {
          }
        }, {
          signal: f.signal,
          onProgress: (U, Y) => w({
            done: U,
            total: Y
          })
        }), f.signal.aborted) return;
        const G = Ba({
          images: D,
          referencedPaths: W
        });
        M(G), R(new Set(G.map((U) => U.path)));
      } catch (I) {
        if ((I == null ? void 0 : I.name) === "AbortError") return;
        p(I instanceof Error ? I.message : String(I));
      } finally {
        b(false), w(null);
      }
    }, Ae = async () => {
      var _a2;
      if (!a || !s || !n || ne) return;
      (_a2 = te.current) == null ? void 0 : _a2.abort();
      const f = new AbortController();
      te.current = f, h(true), p(""), P(null);
      try {
        const I = await s();
        if (f.signal.aborted) return;
        const D = fr(I, m), B = await Va(D, n, {
          signal: f.signal,
          onProgress: (U, Y) => P({
            done: U,
            total: Y
          })
        });
        if (f.signal.aborted) return;
        Z(B);
        const W = {}, G = /* @__PURE__ */ new Set();
        for (const U of B) {
          W[U.hash] = U.keepPath;
          for (const Y of U.files) Y.path !== U.keepPath && G.add(Y.path);
        }
        re(W), A(G);
      } catch (I) {
        if ((I == null ? void 0 : I.name) === "AbortError") return;
        p(I instanceof Error ? I.message : String(I));
      } finally {
        h(false), P(null);
      }
    }, fe = (f) => {
      R((I) => {
        const D = new Set(I);
        return D.has(f) ? D.delete(f) : D.add(f), D;
      });
    }, Pe = (f, I) => {
      const D = K[I];
      f !== D && A((B) => {
        const W = new Set(B);
        return W.has(f) ? W.delete(f) : W.add(f), W;
      });
    }, ve = (f, I) => {
      re((D) => ({
        ...D,
        [f]: I
      })), A((D) => {
        const B = new Set(D), W = T.find((G) => G.hash === f);
        if (!W) return B;
        for (const G of W.files) G.path === I ? B.delete(G.path) : B.add(G.path);
        return B;
      });
    }, xe = (f) => {
      !f.length || !l || (Q(f), se(true));
    }, De = async () => {
      if (!(!l || !ee.length)) {
        q(true), p("");
        try {
          await l(ee, j);
          const f = new Set(ee);
          M((I) => I.filter((D) => !f.has(D.path))), R((I) => {
            const D = new Set(I);
            for (const B of f) D.delete(B);
            return D;
          }), Z((I) => I.map((D) => ({
            ...D,
            files: D.files.filter((B) => !f.has(B.path))
          })).filter((D) => D.files.length >= 2)), A((I) => {
            const D = new Set(I);
            for (const B of f) D.delete(B);
            return D;
          }), se(false), Q([]);
        } catch (f) {
          p(f instanceof Error ? f.message : String(f));
        } finally {
          q(false);
        }
      }
    }, Te = _.size, Ne = V.size, Se = j === "hard";
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
                mo(t),
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
            e.jsx(qr, {
              className: bo(i),
              checked: i,
              onCheckedChange: (f) => oe("settings-orphan-image-auto", f),
              "aria-label": "\uB178\uD2B8 \uC0AD\uC81C \uC2DC \uC774\uBBF8\uC9C0 \uC790\uB3D9 \uC815\uB9AC",
              children: e.jsx(Yr, {
                className: po
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
                e.jsx(Oe, {
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
                    const I = m === f.value;
                    return e.jsx(be, {
                      value: f.value,
                      className: [
                        "rounded-md border-2 px-2.5 py-2 text-left text-xs outline-none transition-all",
                        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                        I ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30" : "border-gray-300 opacity-70 dark:border-odp-borderStrong"
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
                e.jsx(Oe, {
                  className: "flex flex-col gap-1.5",
                  value: j,
                  onValueChange: (f) => g(f),
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
                    const I = j === f.value;
                    return e.jsx(be, {
                      value: f.value,
                      className: [
                        "rounded-md border-2 px-2.5 py-2 text-left text-xs outline-none transition-all",
                        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                        I ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30" : "border-gray-300 opacity-70 dark:border-odp-borderStrong"
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
            e.jsxs(de, {
              type: "button",
              variant: "secondary",
              disabled: !a || ne,
              onClick: () => {
                he();
              },
              children: [
                v ? e.jsx(ge, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(jt, {
                  size: 14
                }),
                "\uBBF8\uC0AC\uC6A9 \uC2A4\uCE94"
              ]
            }),
            e.jsxs(de, {
              type: "button",
              variant: "secondary",
              disabled: !a || ne,
              onClick: () => {
                Ae();
              },
              children: [
                x ? e.jsx(ge, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(pn, {
                  size: 14
                }),
                "\uC911\uBCF5 \uC2A4\uCE94"
              ]
            })
          ]
        }),
        (L || u) && e.jsxs("p", {
          className: "text-[11px] text-gray-500 dark:text-odp-muted",
          children: [
            L ? `Markdown ${L.done}/${L.total}` : null,
            L && u ? " \xB7 " : null,
            u ? `\uD574\uC2DC ${u.done}/${u.total}` : null
          ]
        }),
        S ? e.jsx("p", {
          className: "text-xs text-red-600 dark:text-red-400",
          role: "alert",
          children: S
        }) : null,
        a ? null : e.jsx("p", {
          className: "text-xs text-gray-500 dark:text-odp-muted",
          children: "\uC800\uC7A5\uC18C\uAC00 \uC5F0\uACB0\uB418\uBA74 \uC2A4\uCE94\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
        }),
        y.length > 0 ? e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsxs("div", {
              className: "flex items-center justify-between gap-2",
              children: [
                e.jsxs("h4", {
                  className: "text-xs font-bold text-gray-700 dark:text-odp-fg",
                  children: [
                    "\uBBF8\uC0AC\uC6A9 (",
                    y.length,
                    ")"
                  ]
                }),
                e.jsxs(de, {
                  type: "button",
                  variant: "danger",
                  disabled: Te === 0 || ne,
                  onClick: () => xe([
                    ..._
                  ]),
                  children: [
                    e.jsx(tt, {
                      size: 14
                    }),
                    "\uC120\uD0DD \uC0AD\uC81C (",
                    Te,
                    ")"
                  ]
                })
              ]
            }),
            e.jsx("ul", {
              className: "max-h-56 space-y-1 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter",
              children: y.map((f) => e.jsx("li", {
                children: e.jsxs("label", {
                  className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg",
                  children: [
                    e.jsx("input", {
                      type: "checkbox",
                      className: "mt-0.5",
                      checked: _.has(f.path),
                      onChange: () => fe(f.path)
                    }),
                    e.jsx("span", {
                      className: "min-w-0 flex-1 break-all",
                      children: f.path
                    }),
                    e.jsx("span", {
                      className: "shrink-0 tabular-nums text-gray-500 dark:text-odp-muted",
                      children: me(f.size)
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
                e.jsxs(de, {
                  type: "button",
                  variant: "danger",
                  disabled: Ne === 0 || ne,
                  onClick: () => xe([
                    ...V
                  ]),
                  children: [
                    e.jsx(tt, {
                      size: 14
                    }),
                    "\uC120\uD0DD \uC0AD\uC81C (",
                    Ne,
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
                    me(f.size),
                    " \xB7 ",
                    f.hash.slice(0, 12),
                    "\u2026"
                  ]
                }),
                e.jsx("ul", {
                  className: "space-y-1",
                  children: f.files.map((I) => {
                    const D = K[f.hash] === I.path;
                    return e.jsx("li", {
                      children: e.jsxs("label", {
                        className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg",
                        children: [
                          e.jsx("input", {
                            type: "checkbox",
                            className: "mt-0.5",
                            checked: V.has(I.path),
                            disabled: D,
                            onChange: () => Pe(I.path, f.hash)
                          }),
                          e.jsxs("span", {
                            className: "min-w-0 flex-1 break-all",
                            children: [
                              I.path,
                              D ? e.jsx("span", {
                                className: "ml-1 text-[10px] text-blue-600 dark:text-blue-400",
                                children: "(\uC720\uC9C0)"
                              }) : null
                            ]
                          }),
                          D ? null : e.jsx("button", {
                            type: "button",
                            className: "shrink-0 text-[10px] text-blue-600 underline dark:text-blue-400",
                            onClick: () => ve(f.hash, I.path),
                            children: "\uC774 \uD30C\uC77C \uC720\uC9C0"
                          })
                        ]
                      })
                    }, I.path);
                  })
                })
              ]
            }, f.hash))
          ]
        }) : null,
        e.jsx(ce, {
          isOpen: $,
          title: Se ? "\uC774\uBBF8\uC9C0\uB97C \uC601\uAD6C \uC0AD\uC81C\uD560\uAE4C\uC694?" : "\uC774\uBBF8\uC9C0\uB97C \uD734\uC9C0\uD1B5\uC73C\uB85C \uBCF4\uB0BC\uAE4C\uC694?",
          message: Se ? `${ee.length}\uAC1C \uD30C\uC77C\uC744 \uBCF5\uAD6C\uD560 \uC218 \uC5C6\uC774 \uC0AD\uC81C\uD569\uB2C8\uB2E4.` : `${ee.length}\uAC1C \uD30C\uC77C\uC744 .trash/ \uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.`,
          variant: "danger",
          confirmLabel: Se ? "\uC601\uAD6C \uC0AD\uC81C" : "\uD734\uC9C0\uD1B5\uC73C\uB85C \uC774\uB3D9",
          cancelLabel: "\uCDE8\uC18C",
          confirmDisabled: E,
          onConfirm: () => {
            De();
          },
          onCancel: () => {
            E || (se(false), Q([]));
          }
        })
      ]
    });
  }
  const ho = "\uC554\uD638\uC124\uC815 \uBD88\uB7EC\uC624\uB294 \uC911", fo = [
    {
      value: "off",
      label: "\uC0AC\uC6A9 \uC548 \uD568",
      description: "\uC571\uC744 \uC5F4\uBA74 \uC800\uC7A5\uB41C \uC5F0\uACB0 \uC815\uBCF4\uB97C \uBC14\uB85C \uBD88\uB7EC\uC635\uB2C8\uB2E4.",
      icon: qt
    },
    {
      value: "password",
      label: "\uBE44\uBC00\uBC88\uD638",
      description: "\uC571 \uC785\uC7A5 \uC2DC \uB9C8\uC2A4\uD130 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD569\uB2C8\uB2E4.",
      icon: Ha
    },
    {
      value: "biometric",
      label: "\uC0DD\uCCB4 \uC778\uC99D",
      description: "Touch ID, Windows Hello \uB4F1\uC73C\uB85C \uC571\uC744 \uC7A0\uAE08 \uD574\uC81C\uD569\uB2C8\uB2E4.",
      icon: Xa
    }
  ];
  function yo({ s3Creds: t, webdavConfig: a, onModeChanged: s }) {
    const { lock: d } = $a(), { showToast: n, dismissToast: l } = Ua(), [i, c] = r.useState("off"), [m, k] = r.useState(false), [j, g] = r.useState(false), [v, b] = r.useState(false), [x, h] = r.useState(false), L = Ka(), w = r.useCallback(async (y) => {
      n({
        message: ho,
        icon: "loading",
        durationMs: 0
      });
      try {
        return await y();
      } finally {
        l();
      }
    }, [
      l,
      n
    ]);
    if (r.useEffect(() => {
      if (!Xt()) return;
      let y = false;
      return (async () => {
        try {
          const [M, _] = await w(() => Promise.all([
            Wa(),
            Ga()
          ]));
          if (y) return;
          c(M), k(_);
        } catch {
          y || (c("off"), k(false));
        }
      })(), () => {
        y = true;
      };
    }, [
      w
    ]), !Xt()) return null;
    const u = async (y) => {
      if (!(j || y === i)) {
        g(true);
        try {
          if (y === "off") await w(() => yr(t, a));
          else if (y === "password") {
            b(true);
            return;
          } else await w(() => Ya(t));
          c(y), s == null ? void 0 : s(y);
        } catch (M) {
          if (y === "biometric" && Qa(M)) return;
          alert(_t(M, "\uC785\uC7A5 \uC7A0\uAE08 \uC124\uC815\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
        } finally {
          g(false);
        }
      }
    }, P = async (y) => {
      g(true);
      try {
        await w(() => Ja(y, t, a)), c("password"), s == null ? void 0 : s("password"), b(false);
      } catch (M) {
        alert(_t(M, "\uBE44\uBC00\uBC88\uD638 \uC7A0\uAE08 \uC124\uC815\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        g(false);
      }
    }, S = async () => {
      h(false), g(true);
      try {
        await w(() => yr(t, a)), c("off"), s == null ? void 0 : s("off");
      } catch (y) {
        alert(_t(y, "\uC785\uC7A5 \uC7A0\uAE08 \uD574\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        g(false);
      }
    }, p = () => {
      i === "off" || j || d();
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
                    e.jsx(qt, {
                      size: 16
                    }),
                    "\uC571 \uC785\uC7A5 \uC7A0\uAE08 (Tauri)"
                  ]
                }),
                i !== "off" ? e.jsxs(de, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  className: "shrink-0",
                  disabled: j,
                  onClick: p,
                  "aria-label": "\uC571 \uC7A0\uAE08",
                  children: [
                    e.jsx(qt, {
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
                L,
                "\uB85C \uC7A0\uAE08 \uD574\uC81C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC571\uC744 \uC0C8\uB85C \uCF1C\uAC70\uB098 \uC7A0\uAE08 \uBC84\uD2BC\uC744 \uB20C\uB800\uC744 \uB54C\uB9CC \uC778\uC99D\uC774 \uD544\uC694\uD569\uB2C8\uB2E4."
              ]
            }),
            e.jsx(Oe, {
              value: i,
              onValueChange: (y) => {
                const M = y;
                if (M === "off" && i !== "off") {
                  h(true);
                  return;
                }
                u(M);
              },
              className: "space-y-2",
              disabled: j,
              children: fo.map((y) => {
                const M = y.icon, _ = y.value === "biometric" && !m, R = y.value === "biometric" && m ? L : y.label, T = y.value === "biometric" && m ? `${L}\uB85C \uC571\uC744 \uC7A0\uAE08 \uD574\uC81C\uD569\uB2C8\uB2E4.` : y.description;
                return e.jsxs("label", {
                  className: [
                    "flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition",
                    i === y.value ? "border-blue-400 bg-white shadow-sm dark:border-blue-500 dark:bg-odp-bgSoft" : "border-gray-200 bg-white/70 dark:border-odp-borderStrong dark:bg-odp-surface/60",
                    _ ? "cursor-not-allowed opacity-50" : "hover:border-blue-300"
                  ].join(" "),
                  children: [
                    e.jsx(be, {
                      value: y.value,
                      disabled: _ || j,
                      className: "mt-0.5 h-4 w-4 shrink-0 rounded-full border border-gray-400 bg-white outline-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                      "aria-label": R,
                      children: e.jsx(Me, {
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
                        _ && e.jsx("span", {
                          className: "mt-1 block text-[11px] text-amber-700 dark:text-amber-300",
                          children: "\uC774 \uAE30\uAE30\uC5D0\uC11C\uB294 \uC0DD\uCCB4 \uC778\uC99D\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."
                        })
                      ]
                    })
                  ]
                }, y.value);
              })
            }),
            i !== "off" && e.jsx("p", {
              className: "mt-3 text-[11px] text-gray-500 dark:text-odp-muted",
              children: i === "password" ? "\uBE44\uBC00\uBC88\uD638 \uBAA8\uB4DC\uAC00 \uCF1C\uC838 \uC788\uC2B5\uB2C8\uB2E4. \uC571\uC744 \uB2E4\uC2DC \uC5F4 \uB54C \uBE44\uBC00\uBC88\uD638\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." : `${L} \uBAA8\uB4DC\uAC00 \uCF1C\uC838 \uC788\uC2B5\uB2C8\uB2E4.`
            })
          ]
        }),
        e.jsx(qa, {
          isOpen: v,
          masterPassword: "",
          onCancel: () => {
            b(false);
          },
          onSubmit: (y) => {
            P(y);
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
            S();
          },
          onCancel: () => h(false)
        })
      ]
    });
  }
  function We({ title: t, subtitle: a, open: s, onOpenChange: d, children: n, className: l = "", contentClassName: i = "space-y-3 p-3 pt-0" }) {
    return e.jsxs("div", {
      className: [
        "rounded-md border border-emerald-200/80 bg-white/60 dark:border-emerald-900/40 dark:bg-odp-bgSoft/40",
        l
      ].filter(Boolean).join(" "),
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: () => d(!s),
          "aria-expanded": s,
          className: "flex w-full items-start gap-2 px-3 py-2.5 text-left transition hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20",
          children: [
            s ? e.jsx(le, {
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
  function ko({ settings: t, disabled: a = false, onChange: s }) {
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
              onChange: (d) => s({
                ...t,
                hfToken: d.target.value
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
              onChange: (d) => s({
                ...t,
                adapterPath: d.target.value
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
  const jo = 256;
  function ta({ title: t, subtitle: a, lines: s, emptyHint: d, open: n, onOpenChange: l, onClear: i, clearDisabled: c = false, headerExtra: m, beforeLog: k, className: j = "" }) {
    const g = r.useRef(null), v = r.useRef(true), b = r.useCallback((x) => {
      const h = g.current;
      if (!h) return;
      const L = h.scrollSize, w = h.viewportSize;
      v.current = L - x - w < 24;
    }, []);
    return r.useEffect(() => {
      var _a2;
      !n || s.length === 0 || !v.current || ((_a2 = g.current) == null ? void 0 : _a2.scrollToIndex(s.length - 1, {
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
              onClick: () => l(!n),
              "aria-expanded": n,
              className: "flex min-w-0 flex-1 items-start gap-1.5 text-left",
              children: [
                n ? e.jsx(le, {
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
              children: d
            }) : e.jsx(Vr, {
              ref: g,
              className: "overscroll-contain rounded border border-gray-200 bg-gray-950/95 px-2.5 py-1.5 font-mono text-[10px] leading-relaxed text-emerald-100 dark:border-odp-borderStrong",
              style: {
                height: jo
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
  function vo() {
    const [t, a] = r.useState(() => kr());
    return r.useEffect(() => es(() => a(kr())), []), t;
  }
  function No({ repoId: t, progress: a, aborting: s = false, open: d, onOpenChange: n }) {
    const l = vo(), i = s ? "Aborting\u2026" : (a == null ? void 0 : a.label) || "Preparing\u2026", c = a && a.totalBytes > 0 ? Math.min(100, Math.max(0, Math.round(a.percent))) : null, m = s ? "\uB2E4\uC6B4\uB85C\uB4DC\uB97C \uC911\uB2E8\uD558\uB294 \uC911\u2026" : "hf download / mlx_vlm.convert raw \uCD9C\uB825\uC774 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4.";
    return e.jsx(ta, {
      title: "\uB2E4\uC6B4\uB85C\uB4DC \uB85C\uADF8",
      subtitle: t,
      lines: l,
      emptyHint: m,
      open: d,
      onOpenChange: n,
      onClear: Za,
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
  function So({ models: t, selectedId: a, cacheBytesByModelId: s = {}, disabled: d = false, deleteBusy: n = false, scanBusy: l, isModelInUse: i, onRefresh: c, onSelect: m, onRequestDelete: k }) {
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs("div", {
          className: "mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5",
          children: [
            e.jsx("p", {
              className: "text-[11px] text-gray-500 dark:text-odp-muted",
              children: "\uC11C\uBC84 \uC2DC\uC791 \uC2DC \uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. \uC0AD\uC81C\uB294 Hugging Face \uCE90\uC2DC \uD3F4\uB354\uB97C \uC81C\uAC70\uD569\uB2C8\uB2E4."
            }),
            e.jsxs(de, {
              type: "button",
              variant: "secondary",
              size: "sm",
              disabled: d || l || n,
              onClick: c,
              children: [
                e.jsx(Qt, {
                  size: 14,
                  className: l ? "animate-spin" : ""
                }),
                "Refresh"
              ]
            })
          ]
        }),
        t.length === 0 ? e.jsx("p", {
          className: "text-[11px] text-gray-500 dark:text-odp-muted",
          children: "\uC124\uCE58\uB41C \uBAA8\uB378\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC544\uB798\uC5D0\uC11C Hugging Face \uAC80\uC0C9 \uB610\uB294 URL \uBD99\uC5EC\uB123\uAE30\uB85C \uCD94\uAC00\uD558\uC138\uC694."
        }) : e.jsx(Oe, {
          value: a,
          onValueChange: m,
          className: "max-h-48 space-y-1.5 overflow-y-auto",
          disabled: d || n,
          children: t.map((j) => {
            const g = i(j.id), v = s[j.id] ?? s[j.repoId || ""] ?? 0, b = v > 0 ? ts(v) : j.source === "local" ? null : "\u2014";
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
                      children: e.jsx(Me, {
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
                            g ? " \xB7 \uC11C\uBC84 \uC0AC\uC6A9 \uC911" : ""
                          ]
                        })
                      ]
                    })
                  ]
                }),
                e.jsx(de, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  disabled: d || n || g,
                  onClick: () => k(j),
                  "aria-label": `${j.id} \uC0AD\uC81C`,
                  title: g ? "\uC11C\uBC84\uB97C \uC911\uC9C0\uD55C \uB4A4 \uC0AD\uC81C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." : "\uBAA8\uB378 \uC0AD\uC81C",
                  className: "shrink-0 text-red-700 hover:text-red-800 dark:text-red-300 dark:hover:text-red-200",
                  children: e.jsx(tt, {
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
  function ra({ mode: t, progressLabel: a = "", paste: s = false }) {
    return t === "aborting" ? e.jsxs("span", {
      className: "inline-flex min-w-0 items-center gap-2 transition-none",
      children: [
        e.jsx(ge, {
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
        e.jsx(ge, {
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
        e.jsx(mn, {
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
        s ? e.jsx(gn, {
          size: 14,
          className: "shrink-0",
          "aria-hidden": true
        }) : e.jsx(hn, {
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
  function aa({ hit: t, className: a = "" }) {
    const s = rs(t), d = t.feasibility ?? "unknown", n = t.downloads != null ? `${t.downloads.toLocaleString()} downloads` : null;
    return e.jsxs("div", {
      className: `space-y-0.5 text-[10px] leading-snug ${a}`.trim(),
      children: [
        n ? e.jsx("div", {
          className: "text-gray-500 dark:text-odp-muted",
          children: n
        }) : null,
        s ? e.jsx("div", {
          className: as(d),
          children: s
        }) : e.jsx("div", {
          className: "text-gray-500 dark:text-odp-muted",
          children: "\uC6A9\uB7C9 \uC815\uBCF4 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"
        })
      ]
    });
  }
  function wo({ value: t, onChange: a, error: s, preview: d, previewBusy: n, disabled: l = false, cliAvailable: i, downloadBusy: c, isActiveDownload: m = false, isAborting: k = false, downloadProgressLabel: j = "", isDownloaded: g = false, onDownload: v }) {
    const b = m && !k, x = k ? "aborting" : b ? "downloading" : g ? "downloaded" : "download";
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs("div", {
          className: "flex flex-wrap gap-2",
          children: [
            e.jsx("input", {
              type: "text",
              value: t,
              onChange: (h) => a(h.target.value),
              placeholder: "https://huggingface.co/mlx-community/\u2026 or org/model",
              disabled: l,
              className: "min-w-0 flex-1 rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            }),
            e.jsx(de, {
              type: "button",
              variant: g && !c ? "tertiary" : "secondary",
              size: "sm",
              className: c ? "min-w-38 font-mono tabular-nums transition-none" : g ? "text-emerald-700 transition-none dark:text-emerald-300" : "transition-none",
              disabled: l || !i || k || c && !m || !t.trim(),
              onClick: v,
              children: e.jsx(ra, {
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
        }) : d ? e.jsx("div", {
          className: "mt-2 rounded border border-gray-200 bg-white px-2.5 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
          children: e.jsx(aa, {
            hit: d
          })
        }) : null
      ]
    });
  }
  function Co({ query: t, onQueryChange: a, memoryBudgetLabel: s, results: d, searchBusy: n, searchError: l, disabled: i = false, cliAvailable: c, downloadBusy: m, downloadingRepoId: k = "", abortingRepoId: j = "", downloadProgressLabel: g = "", isModelDownloaded: v, onDownload: b }) {
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
            e.jsx(jt, {
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
        l ? e.jsx("p", {
          className: "mt-1 text-[11px] text-red-600 dark:text-red-400",
          children: l
        }) : null,
        d.length > 0 ? e.jsx("ul", {
          className: "mt-2 max-h-48 space-y-1 overflow-y-auto",
          children: d.map((x) => {
            const h = j === x.id, L = m && k === x.id, w = !L && !h && v(x.id), u = h ? "aborting" : L ? "downloading" : w ? "downloaded" : "download";
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
                    e.jsx(aa, {
                      hit: x
                    })
                  ]
                }),
                e.jsx(de, {
                  type: "button",
                  variant: w ? "tertiary" : "secondary",
                  size: "sm",
                  className: L ? "min-w-[9.5rem] font-mono tabular-nums transition-none" : w ? "text-emerald-700 transition-none dark:text-emerald-300" : "transition-none",
                  disabled: i || !c || h || m && !L,
                  onClick: () => b(x),
                  children: e.jsx(ra, {
                    mode: u,
                    progressLabel: L && !h ? g : ""
                  })
                })
              ]
            }, x.id);
          })
        }) : null
      ]
    });
  }
  function Eo({ settings: t, onSettingsChange: a, cliAvailable: s, serverRunning: d = false, serverLoadedModels: n = [], disabled: l = false }) {
    var _a2, _b;
    const [i, c] = r.useState(t.installedModels), [m, k] = r.useState(false), [j, g] = r.useState(""), [v, b] = r.useState([]), [x, h] = r.useState(false), [L, w] = r.useState(""), [u, P] = r.useState(""), [S, p] = r.useState(""), [y, M] = r.useState(false), [_, R] = r.useState(false), [T, Z] = r.useState(null), [V, A] = r.useState(null), [K, re] = r.useState(null), [$, se] = r.useState(""), ee = r.useRef(""), [Q, E] = r.useState(null), [q, te] = r.useState("RAM \uC815\uBCF4 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"), [ne, he] = r.useState(null), [Ae, fe] = r.useState(false), [Pe, ve] = r.useState(true), [xe, De] = r.useState(false), [Te, Ne] = r.useState(false), [Se, f] = r.useState(true), [I, D] = r.useState({}), B = r.useCallback(async () => {
      k(true);
      try {
        const { settings: N, models: z } = await ss();
        a(N), c(z);
        const F = await ns(z);
        D(F);
      } finally {
        k(false);
      }
    }, [
      a
    ]);
    r.useEffect(() => {
      const N = (z) => {
        var _a3, _b2;
        const F = (_b2 = (_a3 = z.detail) == null ? void 0 : _a3.modelId) == null ? void 0 : _b2.trim();
        ve(true), De(false), Ne(true), f(true), F && (P(gs(F)), p(""));
      };
      return window.addEventListener(jr, N), () => window.removeEventListener(jr, N);
    }, []), r.useEffect(() => {
      os().then((N) => {
        te(ds(N));
      });
    }, []), r.useEffect(() => {
      const N = () => {
        const z = Yt();
        a(z), B();
      };
      return window.addEventListener(kt, N), () => window.removeEventListener(kt, N);
    }, [
      a,
      B
    ]), r.useEffect(() => {
      B();
    }, [
      B
    ]);
    const W = r.useRef(null), G = r.useRef(null);
    r.useEffect(() => {
      const N = j.trim();
      if (!N) {
        b([]), w("");
        return;
      }
      const z = window.setTimeout(() => {
        var _a3;
        (_a3 = W.current) == null ? void 0 : _a3.abort();
        const F = new AbortController();
        W.current = F, h(true), w(""), ls(N, {
          signal: F.signal
        }).then((H) => {
          F.signal.aborted || b(H);
        }).catch((H) => {
          F.signal.aborted || (w(H instanceof Error ? H.message : "Search failed."), b([]));
        }).finally(() => {
          F.signal.aborted || h(false);
        });
      }, 300);
      return () => window.clearTimeout(z);
    }, [
      j
    ]), r.useEffect(() => {
      const N = zt(u);
      if (!N) {
        he(null), fe(false);
        return;
      }
      const z = window.setTimeout(() => {
        var _a3;
        (_a3 = G.current) == null ? void 0 : _a3.abort();
        const F = new AbortController();
        G.current = F, fe(true), is(N, F.signal).then((H) => {
          F.signal.aborted || he(H);
        }).catch(() => {
          F.signal.aborted || he(null);
        }).finally(() => {
          F.signal.aborted || fe(false);
        });
      }, 400);
      return () => window.clearTimeout(z);
    }, [
      u
    ]);
    const U = t.selectedModelId, Y = r.useMemo(() => {
      const N = /* @__PURE__ */ new Set(), z = [];
      for (const F of i) N.has(F.id) || (N.add(F.id), z.push(F));
      return U && !N.has(U) && z.unshift({
        id: U,
        ...U.includes("/") ? {
          repoId: U
        } : {},
        source: "huggingface",
        installedAt: Date.now()
      }), z;
    }, [
      i,
      U
    ]), _e = (N, z) => {
      Ns(N);
      const F = Ss(N, z ?? null), H = vr(N, Y);
      A({
        repoId: N,
        mode: F,
        hit: z ?? null,
        redownload: H
      });
    }, rt = (N, z) => {
      re({
        repoId: N,
        mode: z
      });
    }, at = (N) => {
      if (!$) {
        if (y && (T == null ? void 0 : T.repoId) === N.id) {
          rt(N.id, T.mode);
          return;
        }
        _e(N.id, N);
      }
    }, st = () => {
      if ($) return;
      p("");
      const N = zt(u);
      if (!N) {
        p("Hugging Face model URL or org/model id is invalid.");
        return;
      }
      if (y && (T == null ? void 0 : T.repoId) === N) {
        rt(N, T.mode);
        return;
      }
      _e(N, ne);
    }, vt = async () => {
      if (!V) return;
      const { repoId: N, mode: z, hit: F } = V;
      A(null), M(true), f(true);
      let H = (F == null ? void 0 : F.diskBytes) ?? 0;
      H <= 0 && (H = await hs(N, {
        ...F ? {
          hit: F
        } : {}
      }));
      const it = H > 0 ? fs(0, H) : null;
      Z({
        repoId: N,
        mode: z,
        progress: it
      });
      try {
        const J = await ys(N, {
          mode: z,
          ...F ? {
            hit: F
          } : {},
          ...H > 0 ? {
            expectedTotalBytes: H
          } : {},
          onProgress: (Nt) => {
            ee.current !== N && Z((pe) => !pe || pe.repoId !== N ? pe : {
              ...pe,
              progress: Nt
            });
          }
        });
        a(J), P(""), await B();
      } catch (J) {
        if (ks(J)) {
          await B();
          return;
        }
        alert(J instanceof Error ? J.message : "Download failed.");
      } finally {
        ee.current = "", se(""), M(false), Z(null);
      }
    }, nt = async () => {
      if (!K) return;
      const { repoId: N } = K;
      re(null), ee.current = N, se(N);
      try {
        await js(N);
      } catch (z) {
        ee.current = "", se(""), alert(z instanceof Error ? z.message : "Failed to abort download.");
      }
    }, ze = async () => {
      if (!Q) return;
      const N = Q;
      E(null), R(true);
      try {
        const z = await vs(N.repoId || N.id, {
          serverStatus: {
            running: d,
            loaded: d,
            models: n
          }
        });
        a(z), await B();
      } catch (z) {
        alert(z instanceof Error ? z.message : "Delete failed.");
      } finally {
        R(false);
      }
    }, ot = r.useMemo(() => ({
      running: d,
      loaded: d,
      models: n
    }), [
      d,
      n
    ]), we = r.useCallback((N) => cs(N, t, ot), [
      t,
      ot
    ]), dt = r.useCallback((N) => vr(N, Y), [
      Y
    ]), Ge = V ? V.redownload ? xs(V.repoId, V.mode, V.hit) : us(V.repoId, V.mode, V.hit) : null, He = Q ? bs(Q.id) : null, Ce = K ? ps(K.repoId, K.mode) : null, Ee = zt(u) ?? "", O = !!(y && (T == null ? void 0 : T.repoId) && Ee && T.repoId === Ee), lt = !!($ && Ee && $ === Ee);
    return e.jsxs("div", {
      className: "space-y-2",
      children: [
        e.jsx(We, {
          title: "\uC124\uCE58\uB41C \uBAA8\uB378",
          subtitle: `${Y.length}\uAC1C \xB7 \uC11C\uBC84\uC5D0 \uB85C\uB4DC\uD560 \uBAA8\uB378 \uC120\uD0DD`,
          open: Pe,
          onOpenChange: ve,
          children: e.jsx(So, {
            models: Y,
            selectedId: U,
            cacheBytesByModelId: I,
            disabled: l,
            deleteBusy: _,
            scanBusy: m,
            isModelInUse: we,
            onRefresh: () => {
              B();
            },
            onSelect: (N) => {
              const z = ms(t, N);
              Ur(z), a(z);
            },
            onRequestDelete: E
          })
        }),
        e.jsx(We, {
          title: "Hugging Face \uAC80\uC0C9 (MLX)",
          subtitle: "\uBAA8\uB378 \uC6A9\uB7C9 \xB7 \uC608\uC0C1 RAM \xB7 \uC2E4\uD589 \uAC00\uB2A5\uC131",
          open: xe,
          onOpenChange: De,
          children: e.jsx(Co, {
            query: j,
            onQueryChange: g,
            memoryBudgetLabel: q,
            results: v,
            searchBusy: x,
            searchError: L,
            disabled: l,
            cliAvailable: s,
            downloadBusy: y,
            downloadingRepoId: (T == null ? void 0 : T.repoId) ?? "",
            abortingRepoId: $,
            downloadProgressLabel: ((_a2 = T == null ? void 0 : T.progress) == null ? void 0 : _a2.label) ?? "",
            isModelDownloaded: dt,
            onDownload: at
          })
        }),
        e.jsx(We, {
          title: "URL / repo id \uBD99\uC5EC\uB123\uAE30",
          subtitle: "Hugging Face \uB9C1\uD06C \uB610\uB294 org/model",
          open: Te,
          onOpenChange: Ne,
          children: e.jsx(wo, {
            value: u,
            onChange: (N) => {
              P(N), p("");
            },
            error: S,
            preview: ne,
            previewBusy: Ae,
            disabled: l,
            cliAvailable: s,
            downloadBusy: y,
            isActiveDownload: O,
            isAborting: lt,
            downloadProgressLabel: O ? ((_b = T == null ? void 0 : T.progress) == null ? void 0 : _b.label) ?? "" : "",
            isDownloaded: dt(Ee),
            onDownload: st
          })
        }),
        y && T ? e.jsx(No, {
          repoId: T.repoId,
          progress: T.progress,
          aborting: $ === T.repoId,
          open: Se,
          onOpenChange: f
        }) : null,
        e.jsx(ce, {
          isOpen: !!V,
          title: (Ge == null ? void 0 : Ge.title) || "Download model",
          message: (Ge == null ? void 0 : Ge.message) || "",
          confirmLabel: (V == null ? void 0 : V.redownload) ? V.mode === "convert" ? "Re-convert" : "Redownload" : (V == null ? void 0 : V.mode) === "convert" ? "Convert" : "Download",
          cancelLabel: "Cancel",
          onConfirm: () => {
            vt();
          },
          onCancel: () => A(null)
        }),
        e.jsx(ce, {
          isOpen: !!K,
          title: (Ce == null ? void 0 : Ce.title) || "Abort download",
          message: (Ce == null ? void 0 : Ce.message) || "",
          confirmLabel: "Abort",
          cancelLabel: "Cancel",
          variant: "danger",
          onConfirm: () => {
            nt();
          },
          onCancel: () => re(null)
        }),
        e.jsx(ce, {
          isOpen: !!Q,
          title: (He == null ? void 0 : He.title) || "Delete model",
          message: (He == null ? void 0 : He.message) || "",
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
  function Lo({ busy: t, cliAvailable: a, canStart: s, runtimeLoaded: d, workerRunning: n, loadedModels: l, onStart: i, onStop: c }) {
    const [m, k] = r.useState(false);
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs("div", {
          className: "flex flex-wrap gap-2",
          children: [
            e.jsxs(de, {
              type: "button",
              variant: "primary",
              size: "sm",
              disabled: t || !a || !s || d,
              onClick: () => {
                i();
              },
              children: [
                e.jsx(fn, {
                  size: 14
                }),
                "Load model"
              ]
            }),
            e.jsxs(de, {
              type: "button",
              variant: "secondary",
              size: "sm",
              disabled: t || !n,
              onClick: () => k(true),
              children: [
                e.jsx(Xr, {
                  size: 14
                }),
                "Unload"
              ]
            })
          ]
        }),
        d && l.length > 0 ? e.jsxs("p", {
          className: "text-[11px] text-gray-500 dark:text-odp-muted",
          children: [
            "Loaded in worker: ",
            l.join(", ")
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
  function Io() {
    const [t, a] = r.useState(() => Nr());
    return r.useEffect(() => Kr(() => a(Nr())), []), t;
  }
  function Mo({ serverRunning: t, managedByApp: a, open: s, onOpenChange: d }) {
    const n = Io(), [l, i] = r.useState(() => a || Rt());
    r.useEffect(() => {
      i(a || Rt());
    }, [
      a,
      t
    ]), r.useEffect(() => Kr(() => {
      i(Rt());
    }), []);
    const c = t ? l ? "\uC11C\uBC84 \uB85C\uADF8\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\u2026" : "\uC678\uBD80\uC5D0\uC11C \uC2E4\uD589 \uC911\uC778 \uC11C\uBC84\uB294 \uC774 \uC571\uC5D0\uC11C \uB85C\uADF8\uB97C \uAC00\uC838\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." : "Load model\uC744 \uC2E4\uD589\uD558\uBA74 mlx_vlm.generate worker raw \uCD9C\uB825\uC774 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4.";
    return e.jsx(ta, {
      title: "\uC11C\uBC84 \uB85C\uADF8",
      ...t ? {
        subtitle: l ? "\uC571 \uAD00\uB9AC worker" : "\uC678\uBD80 \uD504\uB85C\uC138\uC2A4"
      } : {},
      lines: n,
      emptyHint: c,
      open: s,
      onOpenChange: d,
      onClear: ws
    });
  }
  const Oo = 250, Ao = "z-100001 max-w-[min(92vw,360px)] rounded-md border border-gray-200 bg-white px-3 py-2.5 text-[11px] leading-relaxed text-gray-700 shadow-md outline-none dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", Po = "inline-flex shrink-0 items-center justify-center rounded-full border border-emerald-300/80 bg-white/80 p-1 text-emerald-800 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:border-emerald-800/60 dark:bg-odp-bgSoft dark:text-emerald-200 dark:hover:bg-emerald-950/40", Gt = "mt-1.5 inline-flex items-center gap-1.5 rounded border border-emerald-300/80 bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-900 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-100 dark:hover:bg-emerald-950/60";
  function Do({ toolkit: t, onRefresh: a }) {
    const [s, d] = r.useState(null), [n, l] = r.useState(""), i = r.useCallback(async (j, g) => {
      d(j), l("");
      try {
        await g({
          onOutput: (v) => {
            l((b) => b + v);
          }
        }), await a();
      } catch (v) {
        const b = v instanceof Error ? v.message : "Install failed.";
        l((x) => `${x}${b}
`);
      } finally {
        d(null);
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
                  className: Gt,
                  disabled: s != null,
                  onClick: () => {
                    i("uv", Cs);
                  },
                  children: [
                    s === "uv" ? e.jsx(ge, {
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
                e.jsx("pre", {
                  className: "mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft",
                  children: `uv tool install mlx-vlm --with jinja2
uv tool install huggingface-hub`
                }),
                e.jsxs("p", {
                  className: "mt-1 text-[10px] text-gray-500 dark:text-odp-muted",
                  children: [
                    "\uCC44\uD305 \uD15C\uD50C\uB9BF\uC6A9 ",
                    e.jsx("code", {
                      className: "rounded px-0.5",
                      children: "jinja2"
                    }),
                    "\uB3C4 \uD568\uAED8 \uC124\uCE58\uD569\uB2C8\uB2E4."
                  ]
                }),
                c && !m ? e.jsxs("button", {
                  type: "button",
                  className: Gt,
                  disabled: s != null,
                  onClick: () => {
                    i("mlx-vlm", Es);
                  },
                  children: [
                    s === "mlx-vlm" ? e.jsx(ge, {
                      size: 12,
                      className: "animate-spin"
                    }) : null,
                    "mlx-vlm \uC124\uCE58"
                  ]
                }) : null,
                c && !k ? e.jsxs("button", {
                  type: "button",
                  className: Gt,
                  disabled: s != null,
                  onClick: () => {
                    i("huggingface-hub", Ls);
                  },
                  children: [
                    s === "huggingface-hub" ? e.jsx(ge, {
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
  function To({ toolkit: t, onRefresh: a }) {
    const [s, d] = r.useState(false), [n, l] = r.useState(false), i = r.useRef(null), c = r.useCallback(() => {
      i.current && (clearTimeout(i.current), i.current = null);
    }, []), m = r.useCallback(() => {
      c(), i.current = setTimeout(() => d(true), Oo);
    }, [
      c
    ]), k = r.useCallback(() => {
      c(), n || d(false);
    }, [
      c,
      n
    ]), j = r.useCallback((b) => {
      d(b), b || l(false);
    }, []), g = r.useCallback(() => {
      c(), l((b) => {
        const x = !b;
        return d(x), x;
      });
    }, [
      c
    ]), v = r.useCallback(() => {
      c(), d(true);
    }, [
      c
    ]);
    return e.jsxs(Ln, {
      open: s,
      onOpenChange: j,
      modal: false,
      children: [
        e.jsx(In, {
          asChild: true,
          children: e.jsx("button", {
            type: "button",
            "aria-label": "MLX-VLM \uC124\uCE58 \uBC29\uBC95",
            "aria-expanded": s,
            "aria-haspopup": "dialog",
            className: Po,
            onMouseEnter: m,
            onMouseLeave: k,
            onFocus: v,
            onClick: g,
            children: e.jsx(yn, {
              size: 14
            })
          })
        }),
        e.jsx(Mn, {
          children: e.jsxs(On, {
            side: "bottom",
            align: "end",
            sideOffset: 6,
            className: Ao,
            onMouseEnter: () => {
              c(), d(true);
            },
            onMouseLeave: k,
            onOpenAutoFocus: (b) => b.preventDefault(),
            children: [
              e.jsx(Do, {
                toolkit: t,
                onRefresh: a
              }),
              e.jsx(An, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function _o({ toolkit: t, cliAvailable: a, cliDetail: s, runtimeLoaded: d, workerRunning: n = false, loadedModel: l, onRefresh: i }) {
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
            e.jsx(To, {
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
                d ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200" : n ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200" : "bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted"
              ].join(" "),
              children: [
                "Runtime:",
                " ",
                d ? `loaded \xB7 ${l}` : n ? "worker running" : "not loaded"
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
  function zo() {
    return e.jsxs("span", {
      className: "flex min-w-0 items-center gap-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
      children: [
        e.jsx(kn, {
          size: 16
        }),
        "MLX-VLM (Tauri macOS)"
      ]
    });
  }
  function Ro() {
    const t = Br(), [a, s] = r.useState(false), [d, n] = r.useState(true), [l, i] = r.useState(true), [c, m] = r.useState(true), [k, j] = r.useState(true), [g, v] = r.useState(() => Yt()), [b, x] = r.useState(null), [h, L] = r.useState(null), [w, u] = r.useState({
      loaded: false,
      workerRunning: false,
      models: [],
      running: false
    }), [P, S] = r.useState(false), p = r.useCallback(async () => {
      const [A, K] = await Promise.all([
        Is(),
        Sr(g)
      ]);
      x(A), L({
        available: A.available,
        ...A.detail ? {
          detail: A.detail
        } : {}
      }), u(K);
    }, [
      g
    ]), y = r.useCallback(async () => {
      S(true), j(true);
      try {
        await Ms(g), Os();
      } catch (A) {
        As(A).suggestRedownload && (Ps(g.selectedModelId), s(true), i(true)), alert(Ds(A, g.selectedModelId));
      } finally {
        await p(), S(false);
      }
    }, [
      p,
      g
    ]), M = r.useCallback(async () => {
      S(true);
      try {
        await Ts(), await p();
      } catch (A) {
        alert(A instanceof Error ? A.message : "Failed to stop MLX-VLM runtime.");
      } finally {
        S(false);
      }
    }, [
      p
    ]);
    if (r.useEffect(() => {
      if (!Ht()) return;
      p();
      const A = window.setInterval(() => {
        Sr(g).then(u);
      }, 5e3);
      return () => window.clearInterval(A);
    }, [
      p,
      g
    ]), r.useEffect(() => {
      w.workerRunning && j(true);
    }, [
      w.workerRunning
    ]), r.useEffect(() => {
      const A = () => v(Yt());
      return window.addEventListener(kt, A), () => window.removeEventListener(kt, A);
    }, []), r.useEffect(() => {
      String(t.hash || "").replace(/^#/, "") === "settings-mlx-vlm" && (s(true), i(true));
    }, [
      t.hash
    ]), r.useEffect(() => {
      const A = (K) => {
        var _a2;
        ((_a2 = K.detail) == null ? void 0 : _a2.sectionId) === "settings-mlx-vlm" && (s(true), i(true));
      };
      return window.addEventListener(wr, A), () => window.removeEventListener(wr, A);
    }, []), !Ht()) return null;
    const _ = (b == null ? void 0 : b.available) === true, R = (b == null ? void 0 : b.hfHubRunnable) === true, T = _ && R, Z = w.models[0] || g.selectedModelId, V = (A) => {
      Ur(A), v(A);
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
            a ? e.jsx(le, {
              size: 16,
              className: "shrink-0 text-gray-500 dark:text-odp-muted"
            }) : e.jsx(ie, {
              size: 16,
              className: "shrink-0 text-gray-500 dark:text-odp-muted"
            }),
            e.jsx(zo, {})
          ]
        }),
        a ? e.jsxs("div", {
          className: "space-y-3 border-t border-emerald-200/80 px-4 pb-4 pt-3 dark:border-emerald-900/40",
          children: [
            e.jsx(_o, {
              toolkit: b,
              cliAvailable: _,
              ...(h == null ? void 0 : h.detail) ? {
                cliDetail: h.detail
              } : {},
              runtimeLoaded: w.loaded,
              loadedModel: Z,
              workerRunning: w.workerRunning,
              onRefresh: p
            }),
            e.jsx(We, {
              title: "\uC5F0\uACB0 \uC124\uC815",
              subtitle: g.hfToken.trim() ? "HF token set" : g.adapterPath.trim() ? "adapter configured" : "optional token / adapter",
              open: d,
              onOpenChange: n,
              children: e.jsx(ko, {
                settings: g,
                disabled: P || w.loaded,
                onChange: V
              })
            }),
            e.jsx(We, {
              title: "\uBAA8\uB378",
              subtitle: "\uC124\uCE58 \xB7 \uAC80\uC0C9 \xB7 \uB2E4\uC6B4\uB85C\uB4DC",
              open: l,
              onOpenChange: i,
              children: e.jsx(Eo, {
                settings: g,
                onSettingsChange: v,
                cliAvailable: T,
                serverRunning: w.loaded,
                serverLoadedModels: w.models,
                disabled: P
              })
            }),
            e.jsxs(We, {
              title: "\uB7F0\uD0C0\uC784",
              subtitle: w.loaded ? `loaded \xB7 ${Z}` : w.workerRunning ? "worker running \xB7 model not loaded" : "not loaded",
              open: c,
              onOpenChange: m,
              children: [
                e.jsx(Lo, {
                  busy: P,
                  cliAvailable: _,
                  canStart: !!g.selectedModelId.trim(),
                  runtimeLoaded: w.loaded,
                  workerRunning: w.workerRunning,
                  loadedModels: w.models,
                  onStart: y,
                  onStop: M
                }),
                e.jsx(Mo, {
                  serverRunning: w.workerRunning,
                  managedByApp: _s(),
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
  function Fo(t, a, s = "") {
    const [d, n] = r.useState(s);
    return r.useEffect(() => {
      const l = t.current;
      if (!l || a.length === 0) return;
      const i = a.map((m) => document.getElementById(m)).filter((m) => !!m);
      if (i.length === 0) return;
      const c = new IntersectionObserver((m) => {
        var _a2;
        const j = (_a2 = m.filter((g) => g.isIntersecting).sort((g, v) => v.intersectionRatio - g.intersectionRatio)[0]) == null ? void 0 : _a2.target;
        (j == null ? void 0 : j.id) && n(j.id);
      }, {
        root: l,
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
    ]), d;
  }
  function Bo(t, a) {
    const s = t.getBoundingClientRect(), d = a.getBoundingClientRect();
    return s.top - d.top + a.scrollTop;
  }
  function Vo(t, a, s) {
    const d = "smooth", n = Number.parseFloat(getComputedStyle(a).scrollMarginTop || "0") || 0, l = Bo(a, t) - n;
    t.scrollTo({
      top: Math.max(0, l),
      behavior: d
    });
  }
  function Rr(t, a, s) {
    return a ? t ? (Vo(t, a), true) : (a.scrollIntoView({
      block: "start",
      behavior: "smooth"
    }), true) : false;
  }
  ed = function({ s3Creds: t, masterPassword: a, onSaveS3Creds: s, onExportCreds: d, onImportClick: n, showHiddenFolders: l, onToggleHiddenFolders: i, showTrashFolder: c = false, onToggleTrashFolder: m, hideRecordingCompanions: k = false, onToggleHideRecordingCompanions: j, treeStickyFolderPathEnabled: g = true, onToggleTreeStickyFolderPath: v, showTreeModifiedDate: b = false, onToggleShowTreeModifiedDate: x, treeHoverExpandSettings: h = nn, onTreeHoverExpandSettingsChange: L, onRequestClose: w, webauthnSupported: u = false, webauthnEnabled: P = false, webauthnStorageOnly: S = false, onEnableWebAuthn: p, onDisableWebAuthn: y, snippetConfig: M, onChangeSnippetConfig: _, onSaveSnippetConfig: R, isSavingSnippets: T = false, snippetConfigLoaded: Z = false, editorType: V, onEditorTypeChange: A, storageMode: K = Ie, onStorageModeChange: re, localFolderName: $ = "", localVaultFsPath: se = "", onOpenLocalFolder: ee, webdavConfig: Q, onSaveWebdavConfig: E, isMobileLayout: q = false, sidebarOpen: te = true, sidebarCollapsed: ne = false, onOpenSidebar: he, onCheckAppUpdate: Ae, isCheckingAppUpdate: fe = false, latestAppBuildId: Pe = "", onScanStorageUsage: ve, canScanStorageUsage: xe = false, onOpenStorageUsageFile: De, onReadUnusedImageText: Te, onReadUnusedImageBytes: Ne, onDeleteUnusedImagePaths: Se }) {
    const [f, I] = r.useState(t), [D, B] = r.useState(""), [W, G] = r.useState(Q ?? {
      endpoint: "",
      username: "",
      password: "",
      basePath: ""
    }), [U, Y] = r.useState(false), [_e, rt] = r.useState(u), [at, st] = r.useState(() => zs()), [vt, nt] = r.useState(() => V ?? Rs()), [ze, ot] = r.useState(() => Fs()), [we, dt] = r.useState(() => Bs()), [Ge, He] = r.useState(() => Cr()), [Ce, Ee] = r.useState(() => Vs()), [O, lt] = r.useState(() => X.getStatus()), [N, z] = r.useState(() => $s()), [F, H] = r.useState(() => Er()), [it, J] = r.useState(false), [Nt, pe] = r.useState(false), [sa, ct] = r.useState(null), [na, St] = r.useState(false), [wt, Ct] = r.useState(true), [xt, Et] = r.useState(() => K === Ke), [ut, Lt] = r.useState(false), [It, Mt] = r.useState(true), [ye, Jt] = r.useState(() => Us(true)), bt = r.useRef(null), Xe = Br(), Zt = ca(), Re = Xt(), er = String(se || "").trim(), oa = String($ || "").trim() || Ks() || "", Ot = Re && er ? er : oa, tr = Re || typeof window < "u" && "showDirectoryPicker" in window;
    r.useEffect(() => $r((o, C) => {
      o === "settings-alt-vim" ? ot(C) : o === "settings-workspace-tabs" ? dt(C) : o === "settings-composer-helper" ? Ee(C) : o === "settings-as-animation" ? z(C) : (o === "settings-as-index" || o === "settings-as-include-other") && lt(X.getStatus());
    }), []), r.useEffect(() => {
      const o = (C) => {
        var _a2;
        const ae = ((_a2 = C == null ? void 0 : C.detail) == null ? void 0 : _a2.mode) ?? Er();
        H(ae);
      };
      return window.addEventListener(Lr, o), () => {
        window.removeEventListener(Lr, o);
      };
    }, []), r.useEffect(() => {
      const o = (C) => {
        var _a2;
        const ae = ((_a2 = C == null ? void 0 : C.detail) == null ? void 0 : _a2.mode) ?? Cr();
        He(ae);
      };
      return window.addEventListener(Ir, o), () => {
        window.removeEventListener(Ir, o);
      };
    }, []), r.useEffect(() => {
      const o = String(Xe.hash || "").replace(/^#/, "");
      if (!o.startsWith("settings-")) return;
      o === "settings-s3" && Ct(true), o === "settings-webdav" && Lt(true), o === "settings-local" && Et(true), o === "settings-imgbb" && Mt(true), o === "settings-mlx-vlm" && Mr(o);
      const C = Or(o);
      C && Jt((Ye) => ({
        ...Ye,
        [C]: true
      }));
      const ae = Ar(o), Fe = o === "settings-mlx-vlm" ? 220 : 80, Le = window.setTimeout(() => {
        var _a2;
        const Ye = document.getElementById(ae);
        if (Ye) {
          Rr(bt.current, Ye);
          try {
            (_a2 = Ye.focus) == null ? void 0 : _a2.call(Ye, {
              preventScroll: true
            });
          } catch {
          }
        }
      }, Fe);
      return () => window.clearTimeout(Le);
    }, [
      Xe.hash,
      Xe.pathname
    ]), r.useEffect(() => X.subscribe(() => {
      lt(X.getStatus());
    }), []), r.useEffect(() => {
      I({
        ...t,
        llmProviderProfiles: Ft(t)
      }), B("");
    }, [
      t
    ]);
    const At = !!((t == null ? void 0 : t.imgbbApiKey) || "").trim(), qe = (o) => {
      const C = o !== void 0 ? o : Ft(f), ae = cn(C), Le = D.trim() || (At ? t.imgbbApiKey : "");
      return {
        ...f,
        llmProviderProfiles: C,
        ...ae,
        imgbbApiKey: Le
      };
    };
    r.useEffect(() => {
      G(Q ?? {
        endpoint: "",
        username: "",
        password: "",
        basePath: ""
      });
    }, [
      Q
    ]), r.useEffect(() => {
      V !== void 0 && nt(V);
    }, [
      V
    ]), r.useEffect(() => {
      let o = false;
      return Ws().then((C) => {
        o || rt(C);
      }), () => {
        o = true;
      };
    }, []);
    const Pt = _e && (a || S), rr = r.useMemo(() => ({
      isDesktopApp: Re,
      showWebAuthnSection: Pt,
      canScanStorageUsage: xe
    }), [
      Re,
      Pt,
      xe
    ]), Dt = r.useMemo(() => Gs(rr), [
      rr
    ]), ar = r.useMemo(() => Dt.flatMap((o) => o.sections.map((C) => C.id)), [
      Dt
    ]), da = Fo(bt, ar, ar[0] || ""), ue = r.useCallback((o, C) => {
      o && Jt((ae) => ({
        ...ae,
        [o]: C
      }));
    }, []), la = r.useCallback((o) => {
      const C = Or(o);
      ue(C, true), o === "settings-s3" && Ct(true), o === "settings-webdav" && Lt(true), o === "settings-local" && Et(true), o === "settings-imgbb" && Mt(true), o === "settings-mlx-vlm" && Mr(o);
      const ae = Ar(o);
      Zt({
        pathname: Xe.pathname,
        hash: `#${o}`
      }, {
        replace: true
      });
      const Fe = o === "settings-mlx-vlm" ? 220 : 120;
      window.setTimeout(() => {
        var _a2;
        const Le = document.getElementById(ae);
        if (Le) {
          Rr(bt.current, Le);
          try {
            (_a2 = Le.focus) == null ? void 0 : _a2.call(Le, {
              preventScroll: true
            });
          } catch {
          }
        }
      }, Fe);
    }, [
      Xe.pathname,
      Zt,
      ue
    ]), ia = !q && ne ? "md:pl-14" : "";
    return e.jsxs("div", {
      className: "flex min-h-0 min-w-0 max-h-full flex-1 flex-col overflow-hidden bg-white dark:bg-odp-bgSofter",
      children: [
        e.jsxs("div", {
          className: `px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-odp-surface flex justify-between items-center gap-3 bg-gray-50 dark:bg-odp-surface shrink-0 transition-[padding] duration-300 ease-in-out ${ia}`,
          children: [
            e.jsxs("div", {
              className: "flex min-w-0 flex-1 items-center gap-2",
              children: [
                q && !te && typeof he == "function" && e.jsx("button", {
                  type: "button",
                  "aria-label": "\uC0AC\uC774\uB4DC\uBC14 \uC5F4\uAE30",
                  onClick: he,
                  className: "inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
                  children: e.jsx(Hs, {
                    size: 22
                  })
                }),
                e.jsxs("h2", {
                  className: "font-bold text-gray-700 dark:text-odp-fgStrong flex min-w-0 items-center gap-2",
                  children: [
                    e.jsx(Xs, {}),
                    " \uC124\uC815 \uBC0F \uC554\uD638\uD654"
                  ]
                })
              ]
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => w == null ? void 0 : w(qe()),
              className: "text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded transition",
              children: e.jsx(Hr, {
                size: 16
              })
            })
          ]
        }),
        e.jsxs("div", {
          className: "flex min-h-0 min-w-0 flex-1",
          children: [
            e.jsx("div", {
              ref: bt,
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
                      e.jsx(yo, {
                        s3Creds: t,
                        webdavConfig: Q
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
                                    value: Ie,
                                    checked: K === Ie,
                                    onChange: () => re == null ? void 0 : re(Ie)
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
                                    value: Ke,
                                    checked: K === Ke,
                                    onChange: () => re == null ? void 0 : re(Ke)
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
                                    value: et,
                                    checked: K === et,
                                    onChange: () => re == null ? void 0 : re(et)
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
                          o.preventDefault(), s(qe());
                        },
                        className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => Ct((o) => !o),
                            className: "flex w-full items-center gap-2 text-left",
                            "aria-expanded": wt,
                            children: [
                              wt ? e.jsx(le, {
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
                          wt ? e.jsxs(e.Fragment, {
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
                                        onChange: (o) => I((C) => ({
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
                                        onChange: (o) => I((C) => ({
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
                                        onChange: (o) => I((C) => ({
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
                                        onChange: (o) => I((C) => ({
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
                                        onChange: (o) => I((C) => ({
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
                                    onClick: () => w == null ? void 0 : w(qe()),
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
                          o.preventDefault(), E == null ? void 0 : E(W);
                        },
                        className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => Lt((o) => !o),
                            className: "flex w-full items-center gap-2 text-left",
                            "aria-expanded": ut,
                            children: [
                              ut ? e.jsx(le, {
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
                              ut ? null : e.jsx("span", {
                                className: "ml-auto text-[11px] font-normal text-gray-400 dark:text-odp-muted",
                                children: "\uC811\uD798"
                              })
                            ]
                          }),
                          ut ? e.jsxs(e.Fragment, {
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
                                        value: W.endpoint,
                                        onChange: (o) => G((C) => ({
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
                                        value: W.username,
                                        onChange: (o) => G((C) => ({
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
                                        value: W.password,
                                        onChange: (o) => G((C) => ({
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
                                        value: W.basePath,
                                        onChange: (o) => G((C) => ({
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
                                        const { createWebdavBackend: o } = await Fr(async () => {
                                          const { createWebdavBackend: ae } = await import("./index-CxSNwP6k.js").then(async (m2) => {
                                            await m2.__tla;
                                            return m2;
                                          }).then((Fe) => Fe.hZ);
                                          return {
                                            createWebdavBackend: ae
                                          };
                                        }, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])), C = o(W);
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
                            onClick: () => Et((o) => !o),
                            className: "flex w-full items-center gap-2 text-left",
                            "aria-expanded": xt,
                            children: [
                              xt ? e.jsx(le, {
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
                              xt ? null : e.jsx("span", {
                                className: "ml-auto text-[11px] font-normal text-gray-400 dark:text-odp-muted",
                                children: "\uC811\uD798"
                              })
                            ]
                          }),
                          xt ? e.jsxs(e.Fragment, {
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
                                    value: Ot || "(\uD3F4\uB354\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC74C)",
                                    "aria-label": Re ? "\uD604\uC7AC \uC5F4\uB9B0 \uB85C\uCEEC \uD3F4\uB354 \uACBD\uB85C" : "\uD604\uC7AC \uC5F4\uB9B0 \uB85C\uCEEC \uD3F4\uB354 \uC774\uB984"
                                  })
                                ]
                              }),
                              tr ? null : e.jsx("p", {
                                className: "text-xs text-amber-700 dark:text-amber-300",
                                children: "\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uD3F4\uB354 \uC120\uD0DD\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Chromium \uACC4\uC5F4 \uBE0C\uB77C\uC6B0\uC800\uB97C \uC0AC\uC6A9\uD574 \uC8FC\uC138\uC694."
                              }),
                              e.jsx("div", {
                                className: "flex justify-end gap-2 pt-2",
                                children: e.jsxs("button", {
                                  type: "button",
                                  disabled: !tr || typeof ee != "function",
                                  onClick: () => ee == null ? void 0 : ee(),
                                  className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                                  children: [
                                    e.jsx(qs, {
                                      size: 16
                                    }),
                                    Ot ? "\uB2E4\uB978 \uD3F4\uB354 \uC5F4\uAE30" : "\uD3F4\uB354 \uC120\uD0DD"
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
                                onClick: d,
                                className: "flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded transition",
                                children: [
                                  e.jsx(Ys, {}),
                                  " S3 \uC5F0\uACB0\uC815\uBCF4 \uB0B4\uBCF4\uB0B4\uAE30"
                                ]
                              }),
                              e.jsxs("button", {
                                onClick: n,
                                className: "flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded transition",
                                children: [
                                  e.jsx(Qs, {}),
                                  " S3 \uC5F0\uACB0\uC815\uBCF4 \uBD88\uB7EC\uC624\uAE30"
                                ]
                              })
                            ]
                          })
                        ]
                      }),
                      Pt && e.jsxs("div", {
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
                            children: S ? "S3 \uC5F0\uACB0 \uC815\uBCF4\uAC00 \uBCF4\uC548 \uD0A4\uB85C\uB9CC \uC554\uD638\uD654\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0 \uC2DC\uC5D0\uB294 \uBE44\uBC00\uBC88\uD638\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4." : "\uC9C0\uBB38, Windows Hello, Touch ID \uB4F1\uC73C\uB85C \uC571 \uC7A0\uAE08 \uD574\uC81C\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0 \uC2DC\uC5D0\uB294 \uBE44\uBC00\uBC88\uD638\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
                          }),
                          S ? e.jsx("p", {
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
                                onClick: () => y == null ? void 0 : y(),
                                className: "text-xs text-red-600 dark:text-red-400 hover:underline",
                                children: "\uC0AC\uC6A9 \uD574\uC81C"
                              })
                            ]
                          }) : e.jsx("div", {
                            className: "flex flex-col gap-2",
                            children: e.jsx("button", {
                              type: "button",
                              disabled: U,
                              onClick: async () => {
                                if (U || !p) return;
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
                              children: U ? "\uB4F1\uB85D \uC911\u2026" : "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uC0AC\uC6A9 (\uB4F1\uB85D)"
                            })
                          })
                        ]
                      }),
                      xe && e.jsx("div", {
                        id: "settings-storage-usage",
                        tabIndex: -1,
                        className: "scroll-mt-4",
                        children: e.jsx(uo, {
                          storageMode: K,
                          onScanTree: ve,
                          canScan: xe,
                          onOpenFile: De
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
                      e.jsx(Zn, {
                        profiles: Ft(f),
                        onSaveProfiles: (o) => {
                          I((C) => ({
                            ...C,
                            llmProviderProfiles: o
                          })), s(qe(o));
                        }
                      }),
                      e.jsx(Ro, {})
                    ]
                  }),
                  e.jsxs(ke, {
                    id: "integrations",
                    title: "\uC678\uBD80 \uC5F0\uB3D9",
                    open: ye.integrations !== false,
                    onOpenChange: (o) => ue("integrations", o),
                    children: [
                      e.jsx(go, {
                        storageMode: K,
                        canScan: xe,
                        onScanTree: ve,
                        onReadText: Te,
                        onReadBytes: Ne,
                        onDeletePaths: Se
                      }),
                      e.jsxs("form", {
                        id: "settings-imgbb",
                        tabIndex: -1,
                        onSubmit: (o) => {
                          if (o.preventDefault(), !D.trim() && !At) {
                            alert("API \uD0A4\uB97C \uC785\uB825\uD558\uC138\uC694.");
                            return;
                          }
                          s(qe());
                        },
                        className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => Mt((o) => !o),
                            className: "flex w-full items-center gap-2 text-left",
                            "aria-expanded": It,
                            children: [
                              It ? e.jsx(le, {
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
                          It ? e.jsxs(e.Fragment, {
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
                                    placeholder: At ? "\uC800\uC7A5\uB428 \u2014 \uBCC0\uACBD \uC2DC \uC0C8 \uD0A4 \uC785\uB825" : "ImgBB API \uD0A4 \uC785\uB825"
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
                      e.jsx(Xn, {})
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
                                    value: Qe,
                                    checked: vt === Qe,
                                    onChange: () => {
                                      nt(Qe), Js(Qe), A == null ? void 0 : A(Qe);
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
                                    value: Zs,
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
                                children: en.map((o) => e.jsxs("label", {
                                  className: "flex items-start gap-2 cursor-pointer",
                                  children: [
                                    e.jsx("input", {
                                      type: "radio",
                                      name: "footnoteDisplayMode",
                                      value: o.value,
                                      checked: F === o.value,
                                      onChange: () => {
                                        tn(o.value), H(o.value);
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
                        children: e.jsx(Fn, {
                          value: M,
                          onChange: _,
                          onSave: R,
                          isSaving: T,
                          isLoaded: Z
                        })
                      }),
                      e.jsx(Kn, {}),
                      e.jsx(Hn, {}),
                      e.jsx(Bn, {})
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
                                oe("settings-as-animation", !N);
                              },
                              className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${N ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                              "aria-pressed": N,
                              "aria-label": "\uC5F4\uAE30/\uB2EB\uAE30 \uC560\uB2C8\uBA54\uC774\uC158",
                              children: e.jsx("span", {
                                className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${N ? "translate-x-4" : "translate-x-0.5"}`
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
                        !mt() && e.jsxs("label", {
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
                        mt() && e.jsx("p", {
                          className: "mt-3 text-[11px] text-gray-500 dark:text-odp-muted",
                          children: "Android \uC571\uC5D0\uC11C\uB294 Lucivy \uC5ED\uC0C9\uC778\uC744 \uC0AC\uC6A9\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uD30C\uC77C\uBA85\xB7\uACBD\uB85C\xB7\uCEE4\uB9E8\uB4DC\uB9CC \uAC80\uC0C9\uD569\uB2C8\uB2E4."
                        }),
                        !mt() && e.jsxs("label", {
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
                        !mt() && e.jsxs(e.Fragment, {
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
                                  disabled: it || !O.enabled || O.building || !O.isolationReady,
                                  onClick: () => {
                                    (async () => {
                                      const o = await X.getRebuildCheckpointInfo();
                                      if (o) {
                                        ct(o), pe(true);
                                        return;
                                      }
                                      if (O.hasIndex) {
                                        St(true);
                                        return;
                                      }
                                      J(true), X.rebuild({
                                        resume: false
                                      }).finally(() => J(false));
                                    })();
                                  },
                                  className: "inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                                  children: [
                                    e.jsx(yt, {
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
                                    e.jsx(rn, {
                                      size: 14
                                    }),
                                    "\uC911\uC9C0"
                                  ]
                                }) : null,
                                e.jsx("button", {
                                  type: "button",
                                  disabled: it || O.building || !O.hasIndex,
                                  onClick: () => {
                                    window.confirm("\uC5ED\uC0C9\uC778 \uCE90\uC2DC(.advanced-search/)\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694? \uC0AD\uC81C \uD6C4\uC5D0\uB294 \u300C\uC0C9\uC778\u300D\uC73C\uB85C \uB2E4\uC2DC \uC0DD\uC131\uD574\uC57C \uD569\uB2C8\uB2E4.") && (J(true), X.clearCache().finally(() => J(false)));
                                  },
                                  className: "inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:bg-odp-bgSoft dark:text-red-300 dark:hover:bg-red-950/30",
                                  children: "\uC5ED\uC0C9\uC778 \uCE90\uC2DC \uC0AD\uC81C"
                                })
                              ]
                            }),
                            e.jsx(ea, {
                              isOpen: Nt,
                              info: sa,
                              onCancel: () => {
                                pe(false), ct(null);
                              },
                              onResume: () => {
                                pe(false), ct(null), J(true), X.rebuild({
                                  resume: true
                                }).finally(() => J(false));
                              },
                              onStartFresh: () => {
                                pe(false), ct(null), J(true), X.rebuild({
                                  resume: false
                                }).finally(() => J(false));
                              }
                            }),
                            e.jsx(ce, {
                              isOpen: na,
                              title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
                              message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
                              confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
                              cancelLabel: "\uCDE8\uC18C",
                              onConfirm: () => {
                                St(false), J(true), X.rebuild({
                                  resume: false
                                }).finally(() => J(false));
                              },
                              onCancel: () => St(false)
                            }),
                            e.jsx(Zr, {
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
                                      oe("settings-workspace-tabs", !we);
                                    },
                                    className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${we ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                    "aria-pressed": we,
                                    "aria-label": "\uD0ED \uAE30\uB2A5",
                                    children: e.jsx("span", {
                                      className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${we ? "translate-x-4" : "translate-x-0.5"}`
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
                              we ? e.jsxs("div", {
                                className: "pl-12 space-y-2",
                                children: [
                                  e.jsx("p", {
                                    className: "text-xs font-medium text-gray-700 dark:text-odp-fg",
                                    children: "\uD0ED \uC790\uB3D9 \uC800\uC7A5 \uC124\uC815"
                                  }),
                                  e.jsx(Oe, {
                                    className: "flex flex-col gap-2",
                                    value: Ge,
                                    onValueChange: (o) => {
                                      o !== "off" && o !== "onFocusChange" && o !== "onWindowChange" || (sn(o), He(o));
                                    },
                                    "aria-label": "\uD0ED \uC790\uB3D9 \uC800\uC7A5",
                                    children: an.map((o) => {
                                      const C = Ge === o.value;
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
                          e.jsx(Un, {}),
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
                                className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${g ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                "aria-pressed": g,
                                "aria-label": "\uD2B8\uB9AC \uD3F4\uB354 \uACBD\uB85C sticky \uD45C\uC2DC",
                                children: e.jsx("span", {
                                  className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${g ? "translate-x-4" : "translate-x-0.5"}`
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
                          typeof L == "function" && e.jsxs("div", {
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
                                        step: h.unit === "ms" ? 1 : 0.1,
                                        value: h.value,
                                        onChange: (o) => {
                                          const C = Number(o.target.value);
                                          L({
                                            ...h,
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
                                    children: e.jsxs(Oe, {
                                      className: "flex items-center gap-3",
                                      value: h.unit,
                                      onValueChange: (o) => {
                                        o !== "s" && o !== "ms" || h.unit !== o && L({
                                          unit: o,
                                          value: on(h.value, h.unit, o)
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
                                              children: e.jsx(Me, {
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
                                              children: e.jsx(Me, {
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
                                      dn(h),
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
                                    value: gt,
                                    checked: at === gt,
                                    onChange: () => {
                                      st(gt), Pr(gt);
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
                                    value: ht,
                                    checked: at === ht,
                                    onChange: () => {
                                      st(ht), Pr(ht);
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
                                oe("settings-composer-helper", !Ce);
                              },
                              className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Ce ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                              "aria-pressed": Ce,
                              "aria-label": "\uC785\uB825\uCC3D \uB2E8\uCD95\uD0A4 \uC548\uB0B4 \uD45C\uC2DC",
                              children: e.jsx("span", {
                                className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Ce ? "translate-x-4" : "translate-x-0.5"}`
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
                                  children: ln() || "\uC54C \uC218 \uC5C6\uC74C"
                                })
                              ]
                            }),
                            Pe ? e.jsxs("div", {
                              className: "flex flex-wrap gap-x-2 gap-y-0.5",
                              children: [
                                e.jsx("dt", {
                                  className: "shrink-0 font-semibold text-gray-700 dark:text-odp-fgStrong",
                                  children: "\uCD5C\uC2E0 \uBC84\uC804"
                                }),
                                e.jsx("dd", {
                                  className: "min-w-0 break-all font-mono",
                                  children: Pe
                                })
                              ]
                            }) : null
                          ]
                        }),
                        e.jsxs("button", {
                          type: "button",
                          onClick: () => Ae == null ? void 0 : Ae(),
                          disabled: fe || typeof Ae != "function",
                          className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-60",
                          children: [
                            e.jsx(yt, {
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
            q ? null : e.jsx(qn, {
              groups: Dt,
              activeSectionId: da,
              onNavigate: la
            })
          ]
        })
      ]
    });
  };
});
export {
  __tla,
  ed as default
};
