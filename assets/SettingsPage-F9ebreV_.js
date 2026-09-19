const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-bQvC9Gon.js","assets/vendor-react-BwEIQNKH.js","assets/vendor-md-editor-D3gQZdJY.js","assets/vendor-aws-u6g9QQ6G.js","assets/vendor-lucide-MLE-4ziu.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-CLW0brs2.js","assets/vendor-radix-DOgSp64j.js","assets/vendor-google-genai-Bp0rxPXM.js","assets/index-lzqj4P6y.css"])))=>i.map(i=>d[i]);
import { _ as Rr, __tla as __tla_0 } from "./vendor-md-editor-D3gQZdJY.js";
import { r as a, j as e, f as ua, u as ba, __tla as __tla_1 } from "./vendor-react-BwEIQNKH.js";
import { aK as jt, aj as pa, aL as ga, aM as ma, aN as ha, at as Ce, aO as fa, aP as ce, aQ as Jt, aR as Qt, aS as Zt, aT as ya, W as ka, aU as at, aV as er, aW as ja, aX as tr, aY as rr, aZ as ar, a_ as Re, a$ as sr, b0 as va, b1 as W, b2 as oe, b3 as Sa, b4 as Na, b5 as wa, b6 as Ca, b7 as Ea, ai as Oa, av as Aa, as as Ta, b8 as Ia, b9 as nr, ba as or, bb as dr, bc as lr, bd as Pa, be as La, bf as _a, bg as Fa, bh as ir, bi as cr, bj as pe, bk as ge, bl as Ye, bm as Da, bn as Ra, bo as za, bp as xr, bq as Ma, br as ur, bs as br, bt as pr, bu as gr, bv as mr, bw as Ba, bx as $a, I as P, by as Ka, Z as Wa, bz as le, S as me, J as Ne, bA as Va, bB as zr, bC as Ha, bD as Ua, ah as Ga, bE as Xa, bF as Fe, bG as Ya, bH as qa, bI as Ja, aA as Qa, bJ as Za, E as he, bK as hr, bL as es, bM as ts, bN as rs, bO as as, bP as ss, bQ as ns, bR as os, bS as ds, bT as Tt, bU as ls, bV as is, bW as It, bX as cs, bY as xs, bZ as us, b_ as fr, b$ as bs, c0 as ps, c1 as vt, c2 as gs, c3 as yr, c4 as ms, c5 as hs, c6 as fs, c7 as Pt, c8 as ys, c9 as st, ca as St, cb as ks, cc as js, cd as vs, ce as Ss, a0 as Ns, cf as ws, cg as Cs, ch as Es, ci as Os, cj as qe, ck as As, cl as Ts, cm as Is, cn as Ps, co as kr, cp as Ls, cq as _s, cr as Fs, cs as jr, ct as Ds, cu as Rs, cv as vr, cw as Sr, cx as Nt, cy as zs, cz as Nr, cA as wr, cB as Je, cC as Ms, cD as Bs, cE as $s, cF as Ks, cG as Ws, cH as Vs, cI as Hs, cJ as Us, cK as Gs, cL as Xs, cM as Cr, cN as Ys, cO as qs, cP as Js, cQ as Qs, cR as Zs, cS as Qe, cT as Er, cU as Ze, cV as en, cW as tn, cX as rn, __tla as __tla_2 } from "./index-bQvC9Gon.js";
import { y as an, G as Dt, H as sn, x as Lt, T as nn, J as on, c as nt, X as Rt, K as dn, L as De, N as Or, O as Mr, Q as Br, V as ln } from "./vendor-lucide-MLE-4ziu.js";
import { d as cn, v as we, w as fe, e as xn, f as un, g as bn, h as pn, A as gn, S as ot, a as dt, D as mn, x as hn, y as fn, z as yn, B as kn, E as jn, G as _t } from "./vendor-radix-DOgSp64j.js";
import { T as vn } from "./TableStyleTemplateEditor-Cysd-KtJ.js";
import { S as Ar } from "./SliderWithScrubInput-BDPuEK9X.js";
import "./vendor-aws-u6g9QQ6G.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-CLW0brs2.js";
import "./vendor-google-genai-Bp0rxPXM.js";
import "./index-T3CnG2ex.js";
let Ho;
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
  function de(t) {
    if (t == null || Number.isNaN(t)) return "\uC54C \uC218 \uC5C6\uC74C";
    if (t < 1024) return `${t} B`;
    const r = t / 1024;
    if (r < 1024) return `${r.toFixed(1)} KB`;
    const s = r / 1024;
    return s < 1024 ? `${s.toFixed(1)} MB` : `${(s / 1024).toFixed(1)} GB`;
  }
  function Sn(t) {
    const r = String(t || "").toLowerCase(), s = r.lastIndexOf(".");
    return s <= 0 || s === r.length - 1 ? "(none)" : r.slice(s + 1);
  }
  function Nn(t) {
    const r = String(t || "").replace(/^\/+/, "");
    return r === jt || r === `${jt}/` || r.startsWith(`${jt}/`);
  }
  function $r(t) {
    var _a2;
    if (t.type === "file") return typeof t.size == "number" && Number.isFinite(t.size) ? t.size : 0;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let r = 0;
    for (const s of t.children) r += $r(s);
    return r;
  }
  function Kr(t) {
    var _a2;
    if (t.type === "file") return 1;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let r = 0;
    for (const s of t.children) r += Kr(s);
    return r;
  }
  function wn(t) {
    const r = Array.isArray(t) ? t : [];
    let s = 0, d = 0, l = 0, i = 0, o = 0, c = 0, p = 0;
    const m = /* @__PURE__ */ new Map(), k = (u) => {
      var _a2;
      for (const h of u) {
        if (h.type === "folder") {
          d += 1, ((_a2 = h.children) == null ? void 0 : _a2.length) && k(h.children);
          continue;
        }
        if (h.type !== "file") continue;
        s += 1;
        const E = typeof h.size == "number" && Number.isFinite(h.size), v = E ? h.size : 0;
        E ? v === 0 && (l += 1) : i += 1, o += v;
        const g = h.path || h.name;
        Nn(g) && (c += v, p += 1);
        const T = Sn(h.name), j = m.get(T) ?? {
          count: 0,
          size: 0,
          files: []
        };
        j.count += 1, j.size += v, j.files.push({
          path: g,
          name: h.name,
          size: E ? v : null,
          node: h
        }), m.set(T, j);
      }
    };
    k(r);
    const x = [
      ...m.entries()
    ].map(([u, { count: h, size: E, files: v }]) => ({
      ext: u,
      label: u === "(none)" ? "(\uD655\uC7A5\uC790 \uC5C6\uC74C)" : `.${u}`,
      count: h,
      size: E,
      percent: o > 0 ? E / o * 100 : 0,
      files: [
        ...v
      ].sort((g, T) => (T.size ?? -1) - (g.size ?? -1) || g.path.localeCompare(T.path))
    })).sort((u, h) => h.size - u.size || h.count - u.count || u.label.localeCompare(h.label)), f = [], b = (u, h, E) => {
      var _a2;
      const v = u.filter((g) => g.type === "folder").map((g) => ({
        node: g,
        size: $r(g),
        fileCount: Kr(g)
      })).sort((g, T) => T.size - g.size || g.node.name.localeCompare(T.node.name));
      for (const { node: g, size: T, fileCount: j } of v) {
        const A = g.path || `${g.name}/`, N = (g.children ?? []).some((_) => _.type === "folder");
        f.push({
          path: A,
          name: g.name,
          depth: h,
          parentPath: E,
          hasChildFolders: N,
          size: T,
          fileCount: j,
          percent: o > 0 ? T / o * 100 : 0
        }), ((_a2 = g.children) == null ? void 0 : _a2.length) && b(g.children, h + 1, A);
      }
    };
    return b(r, 0, null), {
      summary: {
        totalSize: o,
        fileCount: s,
        folderCount: d,
        zeroByteCount: l,
        unknownSizeCount: i,
        indexSize: c,
        indexFileCount: p
      },
      byExtension: x,
      folders: f
    };
  }
  function Cn(t) {
    return !t || typeof t != "string" ? "" : t.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
  }
  function En(t) {
    const r = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), s = [];
    (r ? t.metaKey : t.ctrlKey) && s.push("mod"), t.altKey && s.push("alt"), t.shiftKey && s.push("shift");
    const d = (t.key || "").toLowerCase();
    return !d || d === "shift" || d === "control" || d === "alt" || d === "meta" || (s.push(d), s.length <= 1) ? null : s.join("+");
  }
  function wt(t) {
    if (!t || typeof t != "string") return "";
    const s = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "Cmd" : "Ctrl";
    return t.toLowerCase().replace(/\bmod\b/g, s).split("+").map((d) => d.trim().charAt(0).toUpperCase() + d.trim().slice(1)).join(" + ");
  }
  function On() {
    return {
      id: String(Date.now()) + "-" + Math.random().toString(36).slice(2),
      name: "",
      prefix: "",
      body: "",
      description: ""
    };
  }
  function An({ value: t, onChange: r, onSave: s, isSaving: d = false, isLoaded: l = true }) {
    const [i, o] = a.useState(() => t || {
      snippets: []
    }), [c, p] = a.useState(null), [m, k] = a.useState(null);
    a.useEffect(() => {
      o(t || {
        snippets: []
      });
    }, [
      t
    ]), a.useEffect(() => {
      if (!c) return;
      const j = (A) => {
        A.preventDefault(), A.stopPropagation();
        const N = En(A);
        N && k(N);
      };
      return window.addEventListener("keydown", j, true), () => window.removeEventListener("keydown", j, true);
    }, [
      c
    ]);
    const x = (j) => {
      const A = {
        snippets: j
      };
      o(A), r == null ? void 0 : r(A);
    }, f = () => {
      x([
        ...i.snippets || [],
        On()
      ]);
    }, b = (j, A, N) => {
      const _ = (i.snippets || []).map((D) => D.id === j ? {
        ...D,
        [A]: N
      } : D);
      x(_);
    }, u = (j) => {
      const A = (i.snippets || []).filter((N) => N.id !== j);
      x(A);
    }, h = (j) => {
      p(j), k(null);
    }, E = () => {
      p(null), k(null);
    }, v = () => {
      !c || !m || (b(c, "prefix", m), E());
    }, g = () => {
      const A = (i.snippets || []).map((F) => {
        const B = (F.prefix || "").trim(), Z = Cn(B) || B;
        return {
          ...F,
          name: (F.name || "").trim(),
          prefix: Z,
          body: (F.body || "").replace(/\r\n/g, `
`),
          description: (F.description || "").trim()
        };
      });
      if (A.find((F) => !F.prefix || !F.body)) {
        alert("\uAC01 \uC2A4\uB2C8\uD3AB\uC5D0\uB294 \uB2E8\uCD95\uD0A4(shortcut)\uC640 body\uAC00 \uBAA8\uB450 \uD544\uC694\uD569\uB2C8\uB2E4.");
        return;
      }
      const _ = /* @__PURE__ */ new Set();
      for (const F of A) {
        if (_.has(F.prefix)) {
          alert(`\uC911\uBCF5\uB41C \uB2E8\uCD95\uD0A4 "${F.prefix}" \uC774(\uAC00) \uC788\uC2B5\uB2C8\uB2E4. \uAC01 \uB2E8\uCD95\uD0A4\uB294 \uACE0\uC720\uD574\uC57C \uD569\uB2C8\uB2E4.`);
          return;
        }
        _.add(F.prefix);
      }
      const D = {
        snippets: A
      };
      o(D), r == null ? void 0 : r(D), s == null ? void 0 : s(D);
    }, T = i.snippets || [];
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
            !l && e.jsx("p", {
              className: "text-xs text-gray-500 dark:text-odp-muted",
              children: "\uC2A4\uB2C8\uD3AB \uC124\uC815\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4\u2026"
            }),
            l && T.length === 0 && e.jsx("p", {
              className: "text-xs text-gray-500 dark:text-odp-muted",
              children: '\uC544\uC9C1 \uB4F1\uB85D\uB41C \uC2A4\uB2C8\uD3AB\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC544\uB798 "\uC2A4\uB2C8\uD3AB \uCD94\uAC00" \uBC84\uD2BC\uC744 \uB20C\uB7EC \uC0C8 \uC2A4\uB2C8\uD3AB\uC744 \uB9CC\uB4E4\uC5B4 \uBCF4\uC138\uC694.'
            }),
            T.map((j) => e.jsxs("div", {
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
                          value: j.name || "",
                          onChange: (A) => b(j.id, "name", A.target.value),
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
                              title: j.prefix ? wt(j.prefix) : "",
                              children: j.prefix ? wt(j.prefix) : "\uBBF8\uC124\uC815"
                            }),
                            e.jsx("button", {
                              type: "button",
                              className: "shrink-0 px-2 py-1 text-[11px] rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
                              onClick: () => h(j.id),
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
                      value: j.body || "",
                      onChange: (A) => b(j.id, "body", A.target.value),
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
                          value: j.description || "",
                          onChange: (A) => b(j.id, "description", A.target.value),
                          placeholder: "\uC608: TODO \uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC2A4\uB2C8\uD3AB"
                        })
                      ]
                    }),
                    e.jsx("button", {
                      type: "button",
                      className: "mt-4 sm:mt-6 px-2 py-1 text-[11px] text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/40 rounded hover:bg-red-50 dark:hover:bg-red-900/20 whitespace-nowrap",
                      onClick: () => {
                        window.confirm("\uC774 \uC2A4\uB2C8\uD3AB\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?") && u(j.id);
                      },
                      children: "\uC0AD\uC81C"
                    })
                  ]
                })
              ]
            }, j.id))
          ]
        }),
        e.jsxs("div", {
          className: "flex items-center justify-between gap-2 pt-1",
          children: [
            e.jsx("button", {
              type: "button",
              onClick: f,
              className: "px-3 py-1.5 text-xs rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
              children: "\uC2A4\uB2C8\uD3AB \uCD94\uAC00"
            }),
            e.jsx("button", {
              type: "button",
              onClick: g,
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
          onClick: E,
          children: e.jsxs("div", {
            className: "bg-white dark:bg-odp-surface rounded-lg shadow-xl border border-gray-200 dark:border-odp-borderStrong p-5 w-full max-w-sm",
            onClick: (j) => j.stopPropagation(),
            onKeyDown: (j) => j.stopPropagation(),
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
                children: m ? e.jsx("span", {
                  className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                  children: wt(m)
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
                    onClick: E,
                    className: "px-3 py-1.5 text-xs rounded border border-gray-300 dark:border-odp-borderStrong text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
                    children: "\uCDE8\uC18C"
                  }),
                  e.jsx("button", {
                    type: "button",
                    onClick: v,
                    disabled: !m,
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
  function Tn() {
    const [t, r] = a.useState([]), [s, d] = a.useState(false), [l, i] = a.useState(false), [o, c] = a.useState(null), [p, m] = a.useState(false), [k, x] = a.useState(null), [f, b] = a.useState(null), u = a.useCallback(async () => {
      c(null);
      try {
        const g = await pa();
        r(g.files), d(true);
      } catch (g) {
        c(g instanceof Error ? g.message : String(g)), d(true);
      }
    }, []);
    a.useEffect(() => {
      u();
    }, [
      u
    ]);
    const h = () => {
      x(null), m(true);
    }, E = (g) => {
      x(g), m(true);
    }, v = async () => {
      if (f) {
        i(true), c(null);
        try {
          const g = await fa(f.id);
          r(g.files), b(null);
        } catch (g) {
          c(g instanceof Error ? g.message : String(g));
        } finally {
          i(false);
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
        o ? e.jsx("p", {
          className: "mb-2 text-xs text-red-600 dark:text-red-400",
          role: "alert",
          children: o
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
              children: ga.map((g) => e.jsxs("li", {
                className: "flex items-center justify-between rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsx("div", {
                        className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                        style: {
                          fontFamily: g.name
                        },
                        children: g.name
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
              }, g.id))
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
                  disabled: !s || l,
                  onClick: h,
                  className: "inline-flex items-center gap-1 rounded bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
                  children: [
                    e.jsx(an, {
                      className: "h-3.5 w-3.5",
                      "aria-hidden": true
                    }),
                    "\uC6F9\uD3F0\uD2B8 \uCD94\uAC00"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: l,
                  onClick: () => {
                    u();
                  },
                  className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-fg dark:hover:bg-odp-focusBg",
                  children: [
                    e.jsx(Dt, {
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
          children: t.map((g) => {
            const T = ma(g.css);
            return e.jsxs("li", {
              className: "flex flex-wrap items-center gap-2 rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: [
                e.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    e.jsx("div", {
                      className: "truncate text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                      children: g.name
                    }),
                    e.jsxs("div", {
                      className: "truncate text-[10px] text-gray-400 dark:text-odp-muted",
                      children: [
                        g.filename,
                        T.length ? ` \xB7 ${T.join(", ")}` : ""
                      ]
                    }),
                    T.length > 0 ? e.jsx("ul", {
                      className: "mt-1 flex flex-wrap gap-1",
                      children: T.map((j) => e.jsx("li", {
                        className: "rounded-full border border-gray-100 bg-gray-50 px-1.5 py-0.5 text-[10px] dark:border-odp-border dark:bg-odp-bg",
                        style: {
                          fontFamily: j
                        },
                        children: j
                      }, j))
                    }) : null
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: l,
                  onClick: () => E(g),
                  className: "inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg",
                  children: [
                    e.jsx(sn, {
                      className: "h-3 w-3",
                      "aria-hidden": true
                    }),
                    "\uD3B8\uC9D1"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: l,
                  onClick: () => b(g),
                  className: "inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40",
                  children: [
                    e.jsx(Lt, {
                      className: "h-3 w-3",
                      "aria-hidden": true
                    }),
                    "\uC0AD\uC81C"
                  ]
                })
              ]
            }, g.id);
          })
        }) : e.jsx("p", {
          className: "text-xs text-gray-500 dark:text-odp-muted",
          children: "\uBD88\uB7EC\uC624\uB294 \uC911\u2026"
        }),
        e.jsx(ha, {
          isOpen: p,
          initialFile: k,
          onClose: () => {
            m(false), x(null);
          },
          onSaved: () => {
            u();
          }
        }),
        e.jsx(Ce, {
          isOpen: !!f,
          title: "\uC6F9\uD3F0\uD2B8 \uC0AD\uC81C",
          message: f ? `"${f.name}" (${f.filename}) \uD30C\uC77C\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694\uAE4C\uC694?` : "",
          confirmLabel: "\uC0AD\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: () => {
            v();
          },
          onCancel: () => b(null)
        })
      ]
    });
  }
  let ve = null, Se = null;
  function In() {
    ve = null, Se = null;
  }
  async function Pn() {
    return ce() ? ve || Se || (Se = (async () => {
      try {
        const { invoke: t } = await Rr(async () => {
          const { invoke: s } = await import("./index-bQvC9Gon.js").then(async (m) => {
            await m.__tla;
            return m;
          }).then((d) => d.jB);
          return {
            invoke: s
          };
        }, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])), r = await t("list_system_font_families");
        ve = Array.isArray(r) ? r : [];
      } catch {
        ve = [];
      } finally {
        Se = null;
      }
      return ve ?? [];
    })(), Se) : [];
  }
  const Tr = "Paperozi / A2z (\uAE30\uBCF8)";
  function Ln() {
    const [t, r] = a.useState(() => Jt()), [s, d] = a.useState([]), [l, i] = a.useState(ce()), [o, c] = a.useState(0), p = a.useCallback(async () => {
      if (ce()) {
        i(true);
        try {
          In();
          const f = await Pn();
          d(f);
        } finally {
          i(false);
        }
      }
    }, []);
    a.useEffect(() => {
      p();
    }, [
      p
    ]), a.useEffect(() => {
      const f = () => r(Jt()), b = () => c((u) => u + 1);
      return window.addEventListener(Qt, f), window.addEventListener(Zt, b), () => {
        window.removeEventListener(Qt, f), window.removeEventListener(Zt, b);
      };
    }, []);
    const m = a.useMemo(() => ya(s), [
      s,
      o
    ]), k = (f) => {
      r(f), er(f);
    }, x = () => {
      r(""), er("");
    };
    return e.jsxs("div", {
      className: "mb-4 border-b border-gray-200 pb-4 dark:border-odp-borderSoft",
      children: [
        e.jsxs("div", {
          className: "mb-2 flex flex-wrap items-center gap-x-2 gap-y-1",
          children: [
            e.jsx(nn, {
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
            ce() ? e.jsxs(e.Fragment, {
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
            e.jsx(ka, {
              id: "settings-ui-font-family",
              value: t,
              onChange: k,
              options: m,
              placeholder: Tr
            })
          ]
        }),
        e.jsxs("div", {
          className: "mt-3 flex flex-wrap items-center gap-2",
          children: [
            e.jsxs("button", {
              type: "button",
              onClick: x,
              className: "inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
              children: [
                e.jsx(at, {
                  size: 14,
                  "aria-hidden": true
                }),
                "\uAE30\uBCF8\uAC12\uC73C\uB85C \uBCF5\uC6D0"
              ]
            }),
            ce() ? e.jsxs("button", {
              type: "button",
              onClick: () => {
                p();
              },
              disabled: l,
              className: "inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
              children: [
                e.jsx(at, {
                  size: 14,
                  "aria-hidden": true
                }),
                l ? "\uC2DC\uC2A4\uD15C \uAE00\uAF34 \uBD88\uB7EC\uC624\uB294 \uC911\u2026" : "\uC2DC\uC2A4\uD15C \uAE00\uAF34 \uC0C8\uB85C\uACE0\uCE68"
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
  const _n = "z-100001 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong", Ir = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200",
    t ? "border-blue-500 bg-blue-500 shadow-sm" : "border-gray-300 bg-gray-300 dark:border-odp-borderSoft dark:bg-odp-bgSoft",
    "group-hover:border-blue-400 group-hover:brightness-105"
  ].join(" ");
  function et({ label: t, children: r }) {
    return e.jsxs(xn, {
      children: [
        e.jsx(un, {
          asChild: true,
          children: r
        }),
        e.jsx(bn, {
          children: e.jsxs(pn, {
            side: "bottom",
            sideOffset: 6,
            className: _n,
            children: [
              t,
              e.jsx(gn, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function Fn() {
    const [t, r] = a.useState(() => ja()), [s, d] = a.useState(() => tr()), [l, i] = a.useState(() => rr()), [o, c] = a.useState(() => ar()), [p, m] = a.useState(() => Date.now());
    a.useEffect(() => Re((x, f) => {
      x === "settings-status-bar-clock" ? r(f) : x === "settings-status-bar-clock-date" && d(f);
    }), []), a.useEffect(() => {
      const x = (f) => {
        const b = f.detail;
        i((b == null ? void 0 : b.format) ?? rr()), d(typeof (b == null ? void 0 : b.showDate) == "boolean" ? b.showDate : tr()), c(typeof (b == null ? void 0 : b.customPattern) == "string" ? b.customPattern : ar());
      };
      return window.addEventListener(sr, x), () => {
        window.removeEventListener(sr, x);
      };
    }, []), a.useEffect(() => {
      if (!t) return;
      const x = window.setInterval(() => m(Date.now()), 1e3);
      return () => window.clearInterval(x);
    }, [
      t
    ]);
    const k = va(p, {
      format: l,
      showDate: s,
      customPattern: o
    });
    return e.jsx(cn, {
      delayDuration: 250,
      skipDelayDuration: 0,
      children: e.jsxs("div", {
        className: "mt-4",
        children: [
          e.jsxs("label", {
            className: "group flex cursor-pointer items-center gap-3 text-xs text-gray-700 dark:text-odp-fg",
            children: [
              e.jsx(et, {
                label: "\uC571 \uD558\uB2E8 \uC0C1\uD0DC\uBC14 \uC6B0\uCE21 \uB05D\uC5D0 \uC2DC\uACC4 \uC544\uC774\uCF58\uACFC \uD604\uC7AC \uC2DC\uAC01\uC744 \uD45C\uC2DC\uD569\uB2C8\uB2E4. \uAE30\uBCF8\uAC12: \uCF1C\uC9D0.",
                children: e.jsx("button", {
                  type: "button",
                  onClick: () => W("settings-status-bar-clock", !t),
                  className: Ir(t),
                  "aria-pressed": t,
                  "aria-label": "\uC0C1\uD0DC\uBC14 \uD604\uC7AC \uC2DC\uAC01 \uD45C\uC2DC",
                  children: e.jsx("span", {
                    className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${t ? "translate-x-4" : "translate-x-0.5"}`
                  })
                })
              }),
              e.jsxs("span", {
                className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                children: [
                  "\uC0C1\uD0DC\uBC14 \uC624\uB978\uCABD\uC5D0 \uD604\uC7AC \uC2DC\uAC01 \uD45C\uC2DC",
                  e.jsx("span", {
                    className: "mt-0.5 block text-[11px] text-gray-500 dark:text-odp-muted",
                    children: "\uC571 \uD558\uB2E8 \uC0C1\uD0DC\uBC14 \uC6B0\uCE21 \uB05D\uC5D0 \uC2DC\uACC4 \uC544\uC774\uCF58\uACFC \uB85C\uCEEC \uC2DC\uAC01\uC744 1\uCD08 \uB2E8\uC704\uB85C \uAC31\uC2E0\uD569\uB2C8\uB2E4. (\uAE30\uBCF8\uAC12: \uCF1C\uC9D0)"
                  })
                ]
              })
            ]
          }),
          e.jsx(oe, {
            open: t,
            contentKey: "settings-status-bar-clock-format",
            children: e.jsxs("div", {
              className: "mt-3 space-y-4 pl-12",
              children: [
                e.jsxs("label", {
                  className: "group flex cursor-pointer items-center gap-3 text-xs text-gray-700 dark:text-odp-fg",
                  children: [
                    e.jsx(et, {
                      label: "24H/12H \uD504\uB9AC\uC14B\uC5D0 \uB0A0\uC9DC(yyyy-MM-dd)\uB97C \uC55E\uC5D0 \uBD99\uC785\uB2C8\uB2E4. \uC9C1\uC811 \uC785\uB825 \uD328\uD134\uC5D0\uB294 \uC601\uD5A5 \uC5C6\uC74C. \uAE30\uBCF8\uAC12: \uAEBC\uC9D0.",
                      children: e.jsx("button", {
                        type: "button",
                        onClick: () => W("settings-status-bar-clock-date", !s),
                        className: Ir(s),
                        "aria-pressed": s,
                        "aria-label": "\uC0C1\uD0DC\uBC14 \uC2DC\uACC4 \uB0A0\uC9DC \uD45C\uC2DC",
                        children: e.jsx("span", {
                          className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${s ? "translate-x-4" : "translate-x-0.5"}`
                        })
                      })
                    }),
                    e.jsxs("span", {
                      className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                      children: [
                        "\uB0A0\uC9DC\uB3C4 \uD568\uAED8 \uD45C\uC2DC",
                        e.jsx("span", {
                          className: "mt-0.5 block text-[11px] text-gray-500 dark:text-odp-muted",
                          children: "\uD504\uB9AC\uC14B(24H/12H)\uC5D0 yyyy-MM-dd\uB97C \uBD99\uC785\uB2C8\uB2E4. \uC9C1\uC811 \uC785\uB825 \uD328\uD134\uC5D0\uB294 \uC601\uD5A5\uC744 \uC8FC\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. (\uAE30\uBCF8\uAC12: \uAEBC\uC9D0)"
                        })
                      ]
                    })
                  ]
                }),
                e.jsxs("div", {
                  className: "space-y-2",
                  children: [
                    e.jsx("p", {
                      className: "text-xs font-medium text-gray-700 dark:text-odp-fg",
                      children: "\uC2DC\uAC01 \uD45C\uC2DC \uD615\uC2DD"
                    }),
                    e.jsxs("p", {
                      className: "text-[11px] leading-relaxed text-gray-500 dark:text-odp-muted",
                      children: [
                        "\uD504\uB9AC\uC14B\uC744 \uACE0\uB974\uAC70\uB098 \u300C\uC9C1\uC811 \uC785\uB825\u300D\uC5D0\uC11C \uD328\uD134 \uBB38\uC790\uC5F4\uC744 \uC791\uC131\uD569\uB2C8\uB2E4. \uD328\uD134\uC740 \uC544\uB798 \uD1A0\uD070\uC744 \uC870\uD569\uD558\uBA70, \uADF8 \uC678 \uBB38\uC790\uB294 \uADF8\uB300\uB85C \uD45C\uC2DC\uB429\uB2C8\uB2E4 (\uC608: ",
                        e.jsx("code", {
                          className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft",
                          children: "-"
                        }),
                        ",",
                        " ",
                        e.jsx("code", {
                          className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft",
                          children: ":"
                        }),
                        ",",
                        " ",
                        e.jsx("code", {
                          className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft",
                          children: "/"
                        }),
                        ")."
                      ]
                    }),
                    e.jsx(we, {
                      className: "flex flex-col gap-2",
                      value: l,
                      onValueChange: (x) => {
                        x !== "24h" && x !== "12h" && x !== "custom" || (Na(x), i(x));
                      },
                      "aria-label": "\uC0C1\uD0DC\uBC14 \uC2DC\uACC4 \uD45C\uC2DC \uD615\uC2DD",
                      children: Sa.map((x) => {
                        const f = l === x.value, b = x.value === "24h" ? "24\uC2DC\uAC04\uC81C \uD504\uB9AC\uC14B. \uC608: 15:04:05 (\uB0A0\uC9DC \uCF1C\uBA74 2026-01-15 15:04:05)" : x.value === "12h" ? "12\uC2DC\uAC04\uC81C + AM/PM \uD504\uB9AC\uC14B. \uC608: 03:04:05 PM (\uB0A0\uC9DC \uCF1C\uBA74 \uC55E\uC5D0 yyyy-MM-dd)" : "\uC9C1\uC811 \uD328\uD134 \uC785\uB825. yyyy/MM/dd/HH/hh/mm/ss/A/a \uD1A0\uD070\uC744 \uC870\uD569\uD569\uB2C8\uB2E4.";
                        return e.jsx(et, {
                          label: b,
                          children: e.jsx(fe, {
                            value: x.value,
                            className: [
                              "w-90 origin-left rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200",
                              "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                              f ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"
                            ].join(" "),
                            children: e.jsxs("div", {
                              className: f ? "" : "opacity-50",
                              children: [
                                e.jsx("div", {
                                  className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                                  children: x.label
                                }),
                                e.jsx("div", {
                                  className: "mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted",
                                  children: x.description
                                })
                              ]
                            })
                          })
                        }, x.value);
                      })
                    })
                  ]
                }),
                l === "custom" ? e.jsxs("div", {
                  className: "space-y-3 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/40",
                  children: [
                    e.jsxs("div", {
                      className: "space-y-1.5",
                      children: [
                        e.jsx("p", {
                          className: "text-xs font-medium text-gray-700 dark:text-odp-fg",
                          children: "\uCEE4\uC2A4\uD140 \uD328\uD134"
                        }),
                        e.jsxs("p", {
                          className: "text-[11px] leading-relaxed text-gray-500 dark:text-odp-muted",
                          children: [
                            "\uC544\uB798 \uD1A0\uD070\uC744 \uC6D0\uD558\uB294 \uC21C\uC11C\xB7\uAD6C\uBD84\uC790\uB85C \uC774\uC5B4 \uC801\uC2B5\uB2C8\uB2E4. \uBE48 \uCE78\uC774\uBA74 \uAE30\uBCF8\uAC12",
                            " ",
                            e.jsx("code", {
                              className: "rounded bg-gray-100 px-1 font-mono dark:bg-odp-bgSoft",
                              children: "yyyy-MM-dd HH:mm:ss"
                            }),
                            "\uB85C \uD45C\uC2DC\uB429\uB2C8\uB2E4."
                          ]
                        }),
                        e.jsx(et, {
                          label: "\uC0C1\uD0DC\uBC14\uC5D0 \uADF8\uB300\uB85C \uC801\uC6A9\uD560 \uB0A0\uC9DC/\uC2DC\uAC01 \uD328\uD134\uC785\uB2C8\uB2E4. \uD1A0\uD070 \uD45C\uC640 \uC608\uC2DC\uB97C \uCC38\uACE0\uD558\uC138\uC694.",
                          children: e.jsx("input", {
                            type: "text",
                            value: o,
                            onChange: (x) => {
                              const f = x.target.value;
                              c(f), wa(f);
                            },
                            spellCheck: false,
                            className: "w-full max-w-md rounded border border-gray-300 bg-white px-2.5 py-1.5 font-mono text-xs text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
                            "aria-label": "\uC0C1\uD0DC\uBC14 \uC2DC\uACC4 \uCEE4\uC2A4\uD140 \uD328\uD134",
                            placeholder: "yyyy-MM-dd HH:mm:ss"
                          })
                        })
                      ]
                    }),
                    e.jsx("div", {
                      className: "overflow-x-auto",
                      children: e.jsxs("table", {
                        className: "w-full min-w-[280px] border-collapse text-left text-[11px]",
                        children: [
                          e.jsx("caption", {
                            className: "mb-1.5 caption-top text-left text-[11px] font-medium text-gray-600 dark:text-odp-muted",
                            children: "\uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uD1A0\uD070"
                          }),
                          e.jsx("thead", {
                            children: e.jsxs("tr", {
                              className: "border-b border-gray-200 text-gray-600 dark:border-odp-borderSoft dark:text-odp-muted",
                              children: [
                                e.jsx("th", {
                                  className: "py-1 pr-3 font-semibold",
                                  children: "\uD1A0\uD070"
                                }),
                                e.jsx("th", {
                                  className: "py-1 pr-3 font-semibold",
                                  children: "\uC758\uBBF8"
                                }),
                                e.jsx("th", {
                                  className: "py-1 font-semibold",
                                  children: "\uC608"
                                })
                              ]
                            })
                          }),
                          e.jsx("tbody", {
                            children: Ca.map((x) => e.jsxs("tr", {
                              className: "border-b border-gray-100 text-gray-700 dark:border-odp-borderSoft/60 dark:text-odp-fg",
                              children: [
                                e.jsx("td", {
                                  className: "py-1 pr-3 font-mono font-semibold",
                                  children: x.token
                                }),
                                e.jsx("td", {
                                  className: "py-1 pr-3",
                                  children: x.meaning
                                }),
                                e.jsx("td", {
                                  className: "py-1 font-mono",
                                  children: x.example
                                })
                              ]
                            }, x.token))
                          })
                        ]
                      })
                    }),
                    e.jsxs("div", {
                      children: [
                        e.jsx("p", {
                          className: "mb-1 text-[11px] font-medium text-gray-600 dark:text-odp-muted",
                          children: "\uC791\uC131 \uC608\uC2DC"
                        }),
                        e.jsx("ul", {
                          className: "space-y-1 text-[11px] text-gray-600 dark:text-odp-muted",
                          children: Ea.map((x) => e.jsxs("li", {
                            className: "font-mono",
                            children: [
                              e.jsx("span", {
                                className: "text-gray-800 dark:text-odp-fg",
                                children: x.pattern
                              }),
                              e.jsx("span", {
                                className: "mx-1.5 text-gray-400",
                                children: "\u2192"
                              }),
                              e.jsx("span", {
                                children: x.result
                              })
                            ]
                          }, x.pattern))
                        })
                      ]
                    })
                  ]
                }) : null,
                e.jsxs("p", {
                  className: "text-[11px] text-gray-500 dark:text-odp-muted",
                  children: [
                    "\uBBF8\uB9AC\uBCF4\uAE30:",
                    " ",
                    e.jsx("span", {
                      className: "font-mono text-gray-700 dark:text-odp-fg",
                      children: k
                    })
                  ]
                })
              ]
            })
          })
        ]
      })
    });
  }
  function Dn() {
    const [t, r] = a.useState([]), [s, d] = a.useState(false), [l, i] = a.useState(false), [o, c] = a.useState(null), [p, m] = a.useState(null), [k, x] = a.useState(false), f = a.useCallback(async () => {
      c(null);
      try {
        const u = await Oa();
        r(u.templates), d(true);
      } catch (u) {
        c(u instanceof Error ? u.message : String(u)), r(Aa().templates), d(true);
      }
    }, []);
    a.useEffect(() => {
      f();
    }, [
      f
    ]);
    const b = async (u) => {
      i(true), c(null);
      try {
        await Ta({
          ...Ia,
          templates: u
        }), r(u);
      } catch (h) {
        c(h instanceof Error ? h.message : String(h));
      } finally {
        i(false);
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
        o ? e.jsx("p", {
          className: "mb-2 text-xs text-red-600",
          children: o
        }) : null,
        e.jsxs("div", {
          className: "mb-3 flex gap-2",
          children: [
            e.jsx("button", {
              type: "button",
              disabled: !s || l,
              onClick: () => {
                const u = `template-${Date.now().toString(36)}`;
                m({
                  id: u,
                  name: "\uC0C8 \uD15C\uD50C\uB9BF",
                  sections: {},
                  rules: [
                    {
                      rows: "odd",
                      bg: "#f5f5f5"
                    }
                  ]
                }), x(true);
              },
              className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
              children: "\uC0C8 \uD15C\uD50C\uB9BF"
            }),
            e.jsx("button", {
              type: "button",
              disabled: l,
              onClick: () => {
                f();
              },
              className: "rounded bg-gray-100 px-3 py-1.5 text-xs dark:bg-odp-bgSoft",
              children: "\uC0C8\uB85C\uACE0\uCE68"
            })
          ]
        }),
        e.jsxs("ul", {
          className: "space-y-2",
          children: [
            t.map((u) => e.jsxs("li", {
              className: "flex items-center justify-between gap-2 rounded border border-gray-200 bg-white px-3 py-2 text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: [
                e.jsxs("div", {
                  className: "min-w-0",
                  children: [
                    e.jsx("div", {
                      className: "truncate font-medium text-gray-800 dark:text-odp-fg",
                      children: u.name
                    }),
                    e.jsx("div", {
                      className: "truncate text-[10px] text-gray-400",
                      children: u.id
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
                        m(u), x(true);
                      },
                      children: "\uD3B8\uC9D1"
                    }),
                    e.jsx("button", {
                      type: "button",
                      className: "rounded px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
                      onClick: () => {
                        b(t.filter((h) => h.id !== u.id));
                      },
                      children: "\uC0AD\uC81C"
                    })
                  ]
                })
              ]
            }, u.id)),
            s && t.length === 0 ? e.jsx("li", {
              className: "text-xs text-gray-400",
              children: "\uB4F1\uB85D\uB41C \uD15C\uD50C\uB9BF\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
            }) : null
          ]
        }),
        e.jsx(vn, {
          isOpen: k,
          template: p,
          onClose: () => {
            x(false), m(null);
          },
          onSave: (u) => {
            const h = t.filter((E) => E.id !== (p == null ? void 0 : p.id) && E.id !== u.id);
            b([
              ...h,
              u
            ]).then(() => {
              x(false), m(null);
            });
          }
        })
      ]
    });
  }
  const Rn = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), zn = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function tt({ label: t, description: r, checked: s, onCheckedChange: d, ariaLabel: l }) {
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
              children: r
            })
          ]
        }),
        e.jsx(ot, {
          className: Rn(s),
          checked: s,
          onCheckedChange: d,
          "aria-label": l,
          children: e.jsx(dt, {
            className: zn
          })
        })
      ]
    });
  }
  function Mn() {
    const [t, r] = a.useState(() => nr());
    return a.useEffect(() => {
      const s = () => r(nr());
      return s(), window.addEventListener(or, s), () => window.removeEventListener(or, s);
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
                e.jsx(tt, {
                  label: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5",
                  description: "\uB4DC\uB798\uADF8 \uC2DC \uD398\uC774\uC9C0 \uAC00\uB85C\xB7\uC138\uB85C \uC911\uC559\uC120\uC5D0 \uB9DE\uCDA4",
                  checked: t.centerSnapEnabled,
                  onCheckedChange: (s) => W("settings-cover-center-snap", s),
                  ariaLabel: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5"
                }),
                e.jsxs("label", {
                  className: "block space-y-1 pt-1",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-400",
                      children: "\uD5C8\uC6A9 \uC624\uCC28"
                    }),
                    e.jsx(Ar, {
                      unit: "css",
                      suffix: "px",
                      min: lr,
                      max: dr,
                      step: 0.1,
                      value: t.centerSnapTolerancePx,
                      "aria-label": "\uAC00\uC6B4\uB370 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (s) => Pa(s)
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              className: "space-y-2 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: [
                e.jsx(tt, {
                  label: "\uAC1C\uCCB4 \uC2A4\uB0C5",
                  description: "\uB2E4\uB978 \uAC1C\uCCB4\uC758 \uD14C\uB450\uB9AC\xB7\uAC00\uC6B4\uB370\uC120\uC5D0 \uB9DE\uCDA4 (\uADF8\uB8F9\uC740 \uD1B5\uC9F8\uB85C)",
                  checked: t.objectSnapEnabled,
                  onCheckedChange: (s) => W("settings-cover-object-snap", s),
                  ariaLabel: "\uAC1C\uCCB4 \uC2A4\uB0C5"
                }),
                e.jsxs("label", {
                  className: "block space-y-1 pt-1",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-400",
                      children: "\uD5C8\uC6A9 \uC624\uCC28"
                    }),
                    e.jsx(Ar, {
                      unit: "css",
                      suffix: "px",
                      min: lr,
                      max: dr,
                      step: 0.1,
                      value: t.objectSnapTolerancePx,
                      "aria-label": "\uAC1C\uCCB4 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (s) => La(s)
                    })
                  ]
                })
              ]
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(tt, {
                label: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC",
                description: "\uC120\uD0DD\uACFC \uBB34\uAD00\uD558\uAC8C \uBAA8\uB4E0 \uD14D\uC2A4\uD2B8 \uC0C1\uC790\uB97C \uC605\uC740 \uBD89\uC740 \uC2E4\uC120\uC73C\uB85C \uD45C\uC2DC",
                checked: t.textContainerOutlineEnabled,
                onCheckedChange: (s) => W("settings-cover-text-outline", s),
                ariaLabel: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC"
              })
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(tt, {
                label: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30",
                description: "\uD14D\uC2A4\uD2B8\xB7\uC774\uBBF8\uC9C0\xB7\uB3C4\uD615 \uC0BD\uC785 \uC2DC \uBC18\uD22C\uBA85 \uACE0\uC2A4\uD2B8 \uBBF8\uB9AC\uBCF4\uAE30",
                checked: t.placePreviewEnabled,
                onCheckedChange: (s) => W("settings-cover-place-preview", s),
                ariaLabel: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30"
              })
            }),
            e.jsxs("p", {
              className: "text-[11px] text-gray-500 dark:text-odp-muted",
              children: [
                "\uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28 \uAE30\uBCF8\uAC12 ",
                _a,
                "px \xB7 0.1px \uB2E8\uC704"
              ]
            })
          ]
        })
      ]
    });
  }
  function Bn() {
    const [t, r] = a.useState(""), [s, d] = a.useState(""), [l, i] = a.useState(null), [o, c] = a.useState(false);
    a.useEffect(() => {
      const b = () => {
        const h = za();
        r(h), d(h);
      };
      b(), Fa().then((h) => {
        r(h.url), d(h.url);
      });
      const u = () => b();
      return window.addEventListener(ir, u), () => window.removeEventListener(ir, u);
    }, []);
    const p = cr(t) !== s, m = cr(t), k = !!String(t || "").trim() && !m, x = async () => {
      const b = String(t || "").trim();
      if (b && !m) {
        i("https:// \uB85C \uC2DC\uC791\uD558\uB294 Worker \uC8FC\uC18C\uB97C \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      c(true), i(null);
      try {
        const u = await xr(b);
        r(u), d(u), i(u ? `\uC800\uC7A5\uB428 \u2014 ${Ye}\uC5D0 \uAE30\uB85D\uD588\uACE0, OG \uC694\uCCAD \uC2DC \uC774 Worker\uB97C \uAC00\uC7A5 \uBA3C\uC800 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.` : `Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${Ye}).`);
      } finally {
        c(false);
      }
    }, f = async () => {
      c(true), i(null);
      try {
        r("");
        const b = await xr("");
        d(b), i(`Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${Ye}).`);
      } finally {
        c(false);
      }
    };
    return e.jsxs(pe, {
      id: "settings-og",
      contentKey: "settings-og-worker",
      defaultOpen: false,
      tabIndex: -1,
      className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsx(ge, {
          children: "Open Graph Worker"
        }),
        e.jsx(oe, {
          children: e.jsxs(e.Fragment, {
            children: [
              e.jsxs("p", {
                className: "text-xs text-gray-600 dark:text-odp-muted",
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
                    children: Ye
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
                    href: Da,
                    target: "_blank",
                    rel: "noreferrer noopener",
                    className: "inline-block",
                    children: e.jsx("img", {
                      src: Ra,
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
                disabled: o,
                onChange: (b) => {
                  r(b.target.value), i(null);
                },
                onKeyDown: (b) => {
                  b.key === "Enter" && (b.preventDefault(), x());
                }
              }),
              k ? e.jsx("p", {
                className: "mt-1 text-[11px] text-red-600 dark:text-red-400",
                children: "https:// \uB610\uB294 http:// \uB85C \uC2DC\uC791\uD558\uB294 \uC720\uD6A8\uD55C URL\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4."
              }) : null,
              e.jsxs("div", {
                className: "mt-3 flex flex-wrap items-center gap-2",
                children: [
                  e.jsx("button", {
                    type: "button",
                    onClick: () => {
                      x();
                    },
                    disabled: o || !p && !k,
                    className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                    children: o ? "\uC800\uC7A5 \uC911\u2026" : "\uC800\uC7A5"
                  }),
                  e.jsx("button", {
                    type: "button",
                    onClick: () => {
                      f();
                    },
                    disabled: o || !s && !t,
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
              l ? e.jsx("p", {
                className: "mt-2 text-[11px] text-gray-600 dark:text-odp-muted",
                children: l
              }) : null
            ]
          })
        })
      ]
    });
  }
  function ne({ id: t, title: r, open: s, onOpenChange: d, children: l }) {
    const i = `settings-group-${t}`, o = `${i}-panel`, c = `${i}-title`;
    return e.jsxs(pe, {
      as: "section",
      id: i,
      contentKey: i,
      open: s,
      onOpenChange: d,
      "aria-labelledby": c,
      className: "scroll-mt-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50/80 dark:border-odp-borderStrong dark:bg-odp-surface/80",
      children: [
        e.jsx(ge, {
          id: c,
          controlsId: o,
          titleAs: "span",
          className: "flex w-full items-center gap-2 px-4 py-3 text-left transition hover:bg-gray-100/80 dark:hover:bg-odp-focusBg/40",
          titleClassName: "text-sm font-bold text-gray-800 dark:text-odp-fgStrong",
          children: r
        }),
        e.jsx(oe, {
          children: e.jsx("div", {
            id: o,
            className: "space-y-4 border-t border-gray-200 px-4 pb-4 pt-3 dark:border-odp-borderStrong",
            children: l
          })
        })
      ]
    });
  }
  function $n({ groups: t, activeSectionId: r, onNavigate: s }) {
    const [d, l] = a.useState(""), i = a.useMemo(() => Ma(t, d), [
      t,
      d
    ]), o = d.trim();
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
                e.jsx(on, {
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
                e.jsx(nt, {
                  size: 13,
                  className: "pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-odp-muted",
                  "aria-hidden": true
                }),
                e.jsx("input", {
                  type: "search",
                  value: d,
                  onChange: (c) => l(c.target.value),
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
          children: i.length === 0 ? e.jsx("p", {
            className: "px-2 py-3 text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
            children: o ? `"${o}"\uC5D0 \uB9DE\uB294 \uADF8\uB8F9\xB7\uC139\uC158\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.` : "\uD45C\uC2DC\uD560 \uC124\uC815 \uC5C6\uC74C"
          }) : e.jsx("ul", {
            className: "space-y-3",
            children: i.map((c) => e.jsxs("li", {
              children: [
                e.jsx("div", {
                  className: "px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-odp-muted",
                  children: c.title
                }),
                e.jsx("ul", {
                  className: "mt-1 space-y-0.5",
                  children: c.sections.map((p) => {
                    const m = r === p.id;
                    return e.jsx("li", {
                      children: e.jsx("button", {
                        type: "button",
                        onClick: () => s(p.id),
                        "aria-current": m ? "location" : void 0,
                        className: [
                          "w-full rounded-md px-2 py-1.5 text-left text-[11px] leading-snug transition",
                          m ? "bg-blue-100 font-semibold text-blue-900 dark:bg-blue-950/50 dark:text-blue-100" : "text-gray-700 hover:bg-white hover:text-gray-900 dark:text-odp-fg dark:hover:bg-odp-bgSoft dark:hover:text-odp-fgStrong"
                        ].join(" "),
                        children: p.label
                      })
                    }, p.id);
                  })
                })
              ]
            }, c.id))
          })
        })
      ]
    });
  }
  function Kn() {
    const t = a.useRef(null), [r, s] = a.useState(() => String(ur()));
    a.useEffect(() => {
      const l = (i) => {
        var _a2;
        const c = ((_a2 = i == null ? void 0 : i.detail) == null ? void 0 : _a2.softCap) ?? ur();
        s(String(c));
      };
      return window.addEventListener(br, l), () => {
        window.removeEventListener(br, l);
      };
    }, []), a.useEffect(() => {
      const l = () => {
        var _a2;
        (_a2 = document.getElementById("settings-workspace-pane-soft-cap")) == null ? void 0 : _a2.scrollIntoView({
          behavior: "smooth",
          block: "center"
        }), window.setTimeout(() => {
          var _a3, _b;
          (_a3 = t.current) == null ? void 0 : _a3.focus(), (_b = t.current) == null ? void 0 : _b.select();
        }, 80);
      };
      return window.addEventListener(pr, l), () => {
        window.removeEventListener(pr, l);
      };
    }, []);
    const d = () => {
      const l = Ba($a(r));
      s(String(l));
    };
    return e.jsxs("div", {
      id: "settings-workspace-pane-soft-cap",
      tabIndex: -1,
      className: "scroll-mt-4 space-y-1.5",
      children: [
        e.jsx("label", {
          htmlFor: "workspace-pane-soft-cap-input",
          className: "block text-xs font-medium text-gray-700 dark:text-odp-fg",
          children: "\uBD84\uD560 \uD398\uC778 \uAC1C\uC218 \uC0C1\uD55C"
        }),
        e.jsxs("div", {
          className: "flex flex-wrap items-center gap-2",
          children: [
            e.jsx("input", {
              ref: t,
              id: "workspace-pane-soft-cap-input",
              type: "number",
              inputMode: "numeric",
              min: mr,
              max: gr,
              value: r,
              onChange: (l) => s(l.target.value),
              onBlur: d,
              onKeyDown: (l) => {
                l.key === "Enter" && (l.preventDefault(), d(), l.target.blur());
              },
              className: "w-24 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fgStrong"
            }),
            e.jsxs("span", {
              className: "text-[11px] text-gray-500 dark:text-odp-muted",
              children: [
                mr,
                "\u2013",
                gr
              ]
            })
          ]
        }),
        e.jsx("p", {
          className: "text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
          children: "\uD55C \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC5D0\uC11C \uB3D9\uC2DC\uC5D0 \uC5F4 \uC218 \uC788\uB294 \uBD84\uD560 \uD398\uC778(\uCC3D)\uC758 \uCD5C\uB300 \uAC1C\uC218\uC785\uB2C8\uB2E4. \uAE30\uBCF8\uAC12\uC740 4\uC785\uB2C8\uB2E4."
        })
      ]
    });
  }
  function Wn({ open: t, extension: r, onOpenChange: s, onOpenFile: d }) {
    const l = (r == null ? void 0 : r.files) ?? [], i = r ? `${r.label} \uD30C\uC77C` : "\uD30C\uC77C \uBAA9\uB85D";
    return e.jsx(mn, {
      open: t,
      onOpenChange: s,
      children: e.jsxs(hn, {
        children: [
          e.jsx(fn, {
            className: "fixed inset-0 z-100000 bg-black/40"
          }),
          e.jsxs(yn, {
            className: "fixed top-1/2 left-1/2 z-100001 flex max-h-[min(90vh,40rem)] w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft",
            "aria-describedby": void 0,
            children: [
              e.jsxs("div", {
                className: "flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-odp-borderStrong",
                children: [
                  e.jsxs("div", {
                    className: "min-w-0",
                    children: [
                      e.jsx(kn, {
                        className: "truncate text-sm font-semibold text-gray-800 dark:text-odp-fgStrong",
                        children: i
                      }),
                      r ? e.jsxs("p", {
                        className: "mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted",
                        children: [
                          r.count.toLocaleString(),
                          "\uAC1C \xB7 ",
                          de(r.size)
                        ]
                      }) : null
                    ]
                  }),
                  e.jsx(jn, {
                    asChild: true,
                    children: e.jsx("button", {
                      type: "button",
                      className: "inline-flex shrink-0 items-center justify-center rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-odp-focusBg dark:hover:text-odp-fg",
                      "aria-label": "\uB2EB\uAE30",
                      children: e.jsx(Rt, {
                        size: 16
                      })
                    })
                  })
                ]
              }),
              e.jsx("div", {
                className: "min-h-0 flex-1 overflow-y-auto",
                children: l.length === 0 ? e.jsx("p", {
                  className: "px-4 py-8 text-center text-xs text-gray-500 dark:text-odp-muted",
                  children: "\uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
                }) : e.jsx("ul", {
                  className: "divide-y divide-gray-100 dark:divide-odp-borderSoft",
                  children: l.map((o) => e.jsx("li", {
                    children: e.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        d(o);
                      },
                      className: "flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition hover:bg-gray-50 dark:hover:bg-odp-focusBg/40",
                      children: [
                        e.jsx(dn, {
                          size: 14,
                          className: "shrink-0 text-gray-400 dark:text-odp-muted",
                          "aria-hidden": true
                        }),
                        e.jsxs("span", {
                          className: "min-w-0 flex-1",
                          children: [
                            e.jsx("span", {
                              className: "block truncate text-xs font-medium text-gray-800 dark:text-odp-fgStrong",
                              children: o.name
                            }),
                            e.jsx("span", {
                              className: "mt-0.5 block truncate font-mono text-[10px] text-gray-500 dark:text-odp-muted",
                              title: o.path,
                              children: o.path
                            })
                          ]
                        }),
                        e.jsx("span", {
                          className: "shrink-0 tabular-nums text-[11px] text-gray-600 dark:text-odp-muted",
                          children: de(o.size)
                        })
                      ]
                    })
                  }, o.path))
                })
              })
            ]
          })
        ]
      })
    });
  }
  const Vn = 160, Pr = "settings-as-build-log-auto-scroll", Hn = (t) => [
    "relative inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), Un = "block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[0.875rem]";
  function Gn(t) {
    return t === "error" ? "text-red-600 dark:text-red-400" : t === "warn" ? "text-amber-700 dark:text-amber-300" : t === "ok" ? "text-emerald-700 dark:text-emerald-300" : "text-gray-600 dark:text-odp-muted";
  }
  function Wr({ logs: t, building: r, progress: s, className: d = "" }) {
    const l = a.useRef(null), [i, o] = a.useState(() => t ?? P.getBuildLogs().slice()), [c, p] = a.useState(() => r ?? P.getStatus().building), [m, k] = a.useState(() => s ?? P.getStatus().buildProgress), [x, f] = a.useState(() => Ka()), b = a.useRef(0);
    return a.useEffect(() => {
      t && o(t);
    }, [
      t
    ]), a.useEffect(() => {
      r !== void 0 && p(r);
    }, [
      r
    ]), a.useEffect(() => {
      s !== void 0 && k(s);
    }, [
      s
    ]), a.useEffect(() => Re((u, h) => {
      u === Pr && f(h);
    }), []), a.useEffect(() => {
      if (t) return;
      let u = false;
      const h = async () => {
        const g = ++b.current, T = await P.getBuildLogsAsync();
        u || g !== b.current || o(T);
      };
      h();
      const E = P.subscribeBuildLogs(() => {
        h();
      }), v = P.subscribe(() => {
        const g = P.getStatus();
        p(g.building), k(g.buildProgress);
      });
      return () => {
        u = true, E(), v();
      };
    }, [
      t
    ]), a.useEffect(() => {
      var _a2;
      !x || i.length === 0 || ((_a2 = l.current) == null ? void 0 : _a2.scrollToIndex(i.length - 1, {
        align: "end"
      }));
    }, [
      i,
      c,
      x
    ]), !c && i.length === 0 ? null : e.jsxs("div", {
      className: `overflow-hidden rounded-md border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft ${d}`,
      children: [
        e.jsxs("div", {
          className: "flex items-center justify-between gap-2 border-b border-gray-100 px-2.5 py-1.5 dark:border-odp-borderSoft",
          children: [
            e.jsxs("span", {
              className: "text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong",
              children: [
                "\uC0C9\uC778 \uB85C\uADF8",
                c ? " (\uC2E4\uC2DC\uAC04)" : ""
              ]
            }),
            e.jsxs("div", {
              className: "flex items-center gap-2",
              children: [
                e.jsxs("label", {
                  className: "inline-flex cursor-pointer items-center gap-1.5",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-500 dark:text-odp-muted",
                      children: "\uC790\uB3D9 \uC2A4\uD06C\uB864"
                    }),
                    e.jsx(ot, {
                      checked: x,
                      onCheckedChange: (u) => {
                        W(Pr, u);
                      },
                      className: Hn(x),
                      "aria-label": "\uC0C9\uC778 \uB85C\uADF8 \uC790\uB3D9 \uC2A4\uD06C\uB864",
                      children: e.jsx(dt, {
                        className: Un
                      })
                    })
                  ]
                }),
                c && typeof m == "number" ? e.jsxs("span", {
                  className: "text-[10px] tabular-nums text-amber-700 dark:text-amber-300",
                  children: [
                    Math.round(m * 100),
                    "%"
                  ]
                }) : null
              ]
            })
          ]
        }),
        c && typeof m == "number" ? e.jsx("div", {
          className: "h-0.5 w-full bg-gray-100 dark:bg-odp-bg",
          children: e.jsx("div", {
            className: "h-full bg-blue-500 transition-[width] duration-200 ease-out dark:bg-blue-400",
            style: {
              width: `${Math.min(100, Math.max(0, m * 100))}%`
            }
          })
        }) : null,
        i.length === 0 ? e.jsx("p", {
          className: "px-2.5 py-1.5 font-mono text-[10px] text-gray-400 dark:text-odp-muted",
          children: "\uB300\uAE30 \uC911\u2026"
        }) : e.jsx(Wa, {
          ref: l,
          className: "overscroll-contain px-2.5 py-1.5 font-mono text-[10px] leading-relaxed",
          style: {
            height: Vn
          },
          data: i,
          "aria-live": "polite",
          "aria-relevant": "additions",
          children: (u) => e.jsxs("div", {
            className: `whitespace-pre-wrap break-all ${Gn(u.level)}`,
            children: [
              e.jsx("span", {
                className: "text-gray-400 dark:text-odp-muted",
                children: Xn(u.at)
              }),
              " ",
              u.message
            ]
          }, u.id)
        })
      ]
    });
  }
  function Xn(t) {
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
  function Vr({ isOpen: t, info: r, onResume: s, onStartFresh: d, onCancel: l }) {
    const i = (r == null ? void 0 : r.processedFileCount) ?? 0, o = (r == null ? void 0 : r.processedChatCount) ?? 0, c = i + o, p = (r == null ? void 0 : r.updatedAt) && r.updatedAt > 0 ? new Date(r.updatedAt).toLocaleString() : null;
    return e.jsx(Ce, {
      isOpen: t,
      title: "\uC911\uC9C0\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8",
      message: c > 0 ? `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778\uC774 \uC788\uC2B5\uB2C8\uB2E4.
\uCC98\uB9AC\uB428: \uD30C\uC77C ${i} \xB7 \uCC44\uD305 day ${o}${p ? `
\uC800\uC7A5 \uC2DC\uAC01: ${p}` : ""}

\uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAE4C\uC694, \uC544\uB2C8\uBA74 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uB9CC\uB4E4\uAE4C\uC694?` : `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4.
\uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAE4C\uC694, \uC544\uB2C8\uBA74 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uB9CC\uB4E4\uAE4C\uC694?`,
      confirmLabel: "\uC774\uC5B4\uC11C \uC0C9\uC778",
      discardLabel: "\uCC98\uC74C\uBD80\uD130",
      cancelLabel: "\uCDE8\uC18C",
      onConfirm: s,
      onDiscard: d,
      onCancel: l
    });
  }
  const Yn = 400;
  function Hr() {
    const [t, r] = a.useState(() => P.getStatus()), s = a.useRef(t.building);
    return a.useEffect(() => {
      let d = null, l = false;
      const i = () => {
        const o = P.getStatus();
        s.current = o.building, r(o);
      };
      return P.subscribe(() => {
        const o = P.getStatus(), c = s.current && !o.building;
        if (s.current = o.building, c) {
          d && (clearTimeout(d), d = null), l = false, i();
          return;
        }
        if (d) {
          l = true;
          return;
        }
        i(), d = setTimeout(() => {
          d = null, l && (l = false, i());
        }, Yn);
      });
    }, []), t;
  }
  function lt(t) {
    return t.building && t.indexBuildCancellable;
  }
  function Ft(t) {
    return t.building && !t.indexBuildCancellable;
  }
  function Ur(t) {
    return lt(t);
  }
  function rt(t, r = false) {
    return r || !t.enabled || !t.isolationReady ? false : !lt(t);
  }
  function Gr(t) {
    return lt(t) || Ft(t) ? typeof t.buildProgress == "number" ? `\uC0C9\uC778 \uC911 ${Math.round(t.buildProgress * 100)}%` : "\uC0C9\uC778 \uC911\u2026" : t.hasCheckpoint ? "\uC0C9\uC778 \uC7AC\uAC1C/\uB2E4\uC2DC \uC2DC\uC791" : t.hasIndex ? "\uB2E4\uC2DC \uC0C9\uC778" : "\uC0C9\uC778";
  }
  const _e = [
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
  ], qn = `linear-gradient(90deg, ${_e.map((t) => `rgb(${t.rgb.join(" ")}) ${(t.t * 100).toFixed(2)}%`).join(", ")})`;
  function Lr(t) {
    return Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : 0;
  }
  function Ct(t, r, s) {
    return Math.round(t + (r - t) * s);
  }
  function Jn(t) {
    const r = Lr(t / 100);
    let s = 0;
    for (; s < _e.length - 2 && r > _e[s + 1].t; ) s += 1;
    const d = _e[s], l = _e[s + 1], i = l.t - d.t || 1, o = Lr((r - d.t) / i), c = Ct(d.rgb[0], l.rgb[0], o), p = Ct(d.rgb[1], l.rgb[1], o), m = Ct(d.rgb[2], l.rgb[2], o);
    return `rgb(${c} ${p} ${m})`;
  }
  function _r({ percent: t }) {
    const r = Jn(t);
    return e.jsxs("span", {
      className: "inline-flex items-center justify-end gap-1.5",
      children: [
        e.jsx("span", {
          className: "inline-block size-2.5 shrink-0 rounded-full border border-gray-300/80 shadow-sm dark:border-odp-borderStrong",
          style: {
            backgroundColor: r
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
  function Qn() {
    return e.jsxs("div", {
      className: "space-y-0.5",
      "aria-label": "\uC6A9\uB7C9 \uBE44\uC728 \uC0C9\uC0C1 \uBC94\uB840",
      children: [
        e.jsx("div", {
          className: "h-1.5 w-full rounded-full border border-gray-200 dark:border-odp-borderStrong",
          style: {
            backgroundImage: qn
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
  function Zn(t) {
    return t === me ? "Local Haim" : t === Ne ? "WebDAV Haim" : t === le ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function eo() {
    return e.jsx("div", {
      className: "flex h-40 min-h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-white text-xs text-gray-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted md:h-full md:min-h-48",
      children: "\uADF8\uB798\uD504 \uC900\uBE44\uC911"
    });
  }
  function to({ depth: t, expandable: r, expanded: s, label: d }) {
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
        r ? e.jsx("span", {
          className: "inline-flex size-4 shrink-0 items-center justify-center text-gray-500 dark:text-odp-muted",
          "aria-hidden": true,
          children: s ? e.jsx(Mr, {
            size: 14
          }) : e.jsx(Br, {
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
  function Et({ columns: t, rows: r, emptyText: s = "\uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", maxHeightClass: d = "max-h-64", legendColumnKey: l = null }) {
    return e.jsx("div", {
      className: `${d} overflow-auto rounded-md border border-gray-200 dark:border-odp-borderStrong`,
      children: e.jsxs("table", {
        className: "min-w-full border-separate border-spacing-0 text-left text-xs",
        children: [
          e.jsx("thead", {
            className: "text-gray-600 dark:text-odp-muted",
            children: e.jsx("tr", {
              children: t.map((i) => e.jsx("th", {
                className: `sticky top-0 z-10 border-b border-gray-200 bg-gray-100 px-3 py-2 font-semibold whitespace-nowrap dark:border-odp-borderStrong dark:bg-odp-bgSoft ${i.align === "right" ? "text-right" : "text-left"} ${i.className ?? ""}`,
                children: i.header
              }, i.key))
            })
          }),
          e.jsx("tbody", {
            className: "bg-white dark:bg-odp-bgSofter",
            children: r.length === 0 ? e.jsx("tr", {
              children: e.jsx("td", {
                colSpan: t.length,
                className: "px-3 py-6 text-center text-gray-500 dark:text-odp-muted",
                children: s
              })
            }) : r.map((i, o) => {
              var _a2, _b, _c, _d;
              const c = typeof i._onClick == "function", p = ((_a2 = i._tree) == null ? void 0 : _a2.expandable) ? i._tree.expanded : void 0, m = (_c = (_b = r[o - 1]) == null ? void 0 : _b._tree) == null ? void 0 : _c.depth, k = (_d = i._tree) == null ? void 0 : _d.depth, x = o > 0 && typeof m == "number" && typeof k == "number" && k < m, f = (b) => {
                var _a3;
                c && (b.key !== "Enter" && b.key !== " " || (b.preventDefault(), (_a3 = i._onClick) == null ? void 0 : _a3.call(i)));
              };
              return e.jsx("tr", {
                onClick: c ? i._onClick : void 0,
                onKeyDown: f,
                tabIndex: c ? 0 : void 0,
                "aria-expanded": p,
                className: `hover:bg-gray-50 dark:hover:bg-odp-focusBg/40 ${c ? "cursor-pointer" : ""}`,
                children: t.map((b) => {
                  const u = b.tree ? i._tree : void 0;
                  return e.jsx("td", {
                    className: `px-3 py-1.5 text-gray-700 dark:text-odp-fg ${x ? "border-t-2 border-gray-300 dark:border-odp-borderStrong" : "border-t border-gray-100 dark:border-odp-borderSoft"} ${b.align === "right" ? "text-right tabular-nums" : ""} ${b.className ?? ""}`,
                    children: u ? e.jsx(to, {
                      depth: u.depth,
                      expandable: u.expandable,
                      expanded: u.expanded,
                      label: u.label
                    }) : i[b.key]
                  }, b.key);
                })
              }, i._key ?? o);
            })
          }),
          l ? e.jsx("tfoot", {
            children: e.jsx("tr", {
              children: t.map((i) => e.jsx("td", {
                className: "sticky bottom-0 border-t border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: i.key === l ? e.jsx(Qn, {}) : null
              }, i.key))
            })
          }) : null
        ]
      })
    });
  }
  function ro(t, r) {
    const s = /* @__PURE__ */ new Set(), d = [];
    for (const l of t) (l.parentPath == null || s.has(l.parentPath) && r.has(l.parentPath)) && (d.push(l), s.add(l.path));
    return d;
  }
  function Ot({ title: t, open: r, onToggle: s, children: d }) {
    return e.jsxs(pe, {
      contentKey: t,
      open: r,
      onOpenChange: (l) => {
        l !== r && s();
      },
      className: "rounded-md border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-bgSoft",
      children: [
        e.jsx(ge, {
          titleAs: "span",
          chevronSize: 14,
          className: "flex w-full items-center gap-1.5 px-3 py-2 text-left text-xs font-bold text-gray-700 transition hover:bg-gray-50 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg/40",
          titleClassName: "",
          children: t
        }),
        e.jsx(oe, {
          children: e.jsxs("div", {
            className: "grid grid-cols-1 gap-3 border-t border-gray-200 p-3 dark:border-odp-borderStrong md:grid-cols-[minmax(10rem,14rem)_minmax(0,1fr)] md:items-stretch",
            children: [
              e.jsx("div", {
                className: "min-w-0",
                children: e.jsx(eo, {})
              }),
              e.jsx("div", {
                className: "min-w-0",
                children: d
              })
            ]
          })
        })
      ]
    });
  }
  function ao({ storageMode: t = le, onScanTree: r, canScan: s = true, onOpenFile: d }) {
    const [l, i] = a.useState(false), [o, c] = a.useState(null), [p, m] = a.useState(null), [k, x] = a.useState(() => /* @__PURE__ */ new Set()), [f, b] = a.useState(null), [u, h] = a.useState({
      summary: true,
      extension: false,
      folder: false
    }), [E, v] = a.useState(false), g = Hr(), [T, j] = a.useState(false), [A, N] = a.useState(null), [_, D] = a.useState(false);
    a.useEffect(() => {
      g.building || v(false);
    }, [
      g.building
    ]), a.useEffect(() => {
      P.refreshCheckpointStatus();
    }, []), a.useEffect(() => {
      m(null), c(null), x(/* @__PURE__ */ new Set()), b(null), h({
        summary: true,
        extension: false,
        folder: false
      });
    }, [
      t
    ]);
    const F = (w) => {
      h((V) => ({
        ...V,
        [w]: !V[w]
      }));
    }, B = (w) => {
      x((V) => {
        const X = new Set(V);
        return X.has(w) ? X.delete(w) : X.add(w), X;
      });
    }, Z = async () => {
      if (!(!r || !s || l)) {
        i(true), c(null);
        try {
          const w = await r();
          m(wn(w)), x(/* @__PURE__ */ new Set()), b(null);
        } catch (w) {
          const V = w instanceof Error ? w.message : String(w);
          c(V || "\uC6A9\uB7C9 \uBD84\uC11D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."), m(null), x(/* @__PURE__ */ new Set()), b(null);
        } finally {
          i(false);
        }
      }
    }, R = (w) => {
      rt(g, E) && (v(true), P.rebuild({
        resume: w
      }).finally(() => v(false)));
    }, $ = () => {
      rt(g, E) && (async () => {
        const w = await P.getRebuildCheckpointInfo();
        if (w) {
          N(w), j(true);
          return;
        }
        if (g.hasIndex) {
          D(true);
          return;
        }
        R(false);
      })();
    }, K = () => {
      P.cancelRebuild();
    }, z = p == null ? void 0 : p.summary, Ee = z && z.totalSize > 0 ? z.indexSize / z.totalSize * 100 : 0, xe = z ? [
      {
        label: "\uCD1D \uC6A9\uB7C9",
        value: de(z.totalSize)
      },
      {
        label: "\uC0C9\uC778 \uB370\uC774\uD130 (.advanced-search)",
        value: `${de(z.indexSize)} \xB7 ${z.indexFileCount.toLocaleString()}\uAC1C \uD30C\uC77C${z.totalSize > 0 ? ` \xB7 ${Ee.toFixed(1)}%` : ""}`
      },
      {
        label: "\uC0C9\uC778 \uC81C\uC678 \uC6A9\uB7C9",
        value: de(Math.max(0, z.totalSize - z.indexSize))
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
    ] : [], ee = ro((p == null ? void 0 : p.folders) ?? [], k);
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
                      children: Zn(t)
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
                  onClick: $,
                  disabled: !s || !rt(g, E),
                  className: "inline-flex items-center gap-1.5 rounded border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                  title: g.enabled ? g.isolationReady ? "\uC5ED\uC0C9\uC778\uC744 \uBC31\uADF8\uB77C\uC6B4\uB4DC\uB85C \uC0DD\uC131\uD569\uB2C8\uB2E4" : "\uC6F9\uC5D0\uC11C\uB294 \uAC80\uC0C9 \uACA9\uB9AC(COOP/COEP)\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694" : "\uC124\uC815\uC5D0\uC11C \uC5ED\uC0C9\uC778\uC744 \uCF20 \uB4A4 \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",
                  children: [
                    E || g.building ? e.jsx(De, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(nt, {
                      size: 14
                    }),
                    Gr(g)
                  ]
                }),
                Ur(g) ? e.jsxs("button", {
                  type: "button",
                  onClick: K,
                  className: "inline-flex items-center gap-1.5 rounded border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60",
                  title: "\uC0C9\uC778\uC744 \uC911\uC9C0\uD569\uB2C8\uB2E4. \uCCB4\uD06C\uD3EC\uC778\uD2B8\uB294 \uC720\uC9C0\uB418\uC5B4 \uC774\uC5B4\uC11C \uC7AC\uAC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                  children: [
                    e.jsx(Or, {
                      size: 14
                    }),
                    "\uC911\uC9C0"
                  ]
                }) : g.building ? e.jsxs("button", {
                  type: "button",
                  disabled: true,
                  className: "inline-flex items-center gap-1.5 rounded border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 opacity-50 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200",
                  title: "\uC0C9\uC778\uC774 \uC644\uB8CC\uB418\uC5B4 \uC800\uC7A5 \uC911\uC785\uB2C8\uB2E4.",
                  children: [
                    e.jsx(Or, {
                      size: 14
                    }),
                    "\uC911\uC9C0"
                  ]
                }) : null,
                e.jsxs("button", {
                  type: "button",
                  onClick: Z,
                  disabled: !s || l || typeof r != "function",
                  className: "inline-flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
                  children: [
                    l ? e.jsx(De, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(Dt, {
                      size: 14
                    }),
                    l ? "\uBD84\uC11D \uC911\u2026" : p ? "\uB2E4\uC2DC \uBD84\uC11D" : "\uBD84\uC11D \uC2DC\uC791"
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
        e.jsx(Wr, {}),
        e.jsx(Vr, {
          isOpen: T,
          info: A,
          onCancel: () => {
            j(false), N(null);
          },
          onResume: () => {
            j(false), N(null), R(true);
          },
          onStartFresh: () => {
            j(false), N(null), R(false);
          }
        }),
        e.jsx(Ce, {
          isOpen: _,
          title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
          message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
          confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
          cancelLabel: "\uCDE8\uC18C",
          onConfirm: () => {
            D(false), R(false);
          },
          onCancel: () => D(false)
        }),
        o && e.jsx("p", {
          className: "whitespace-pre-wrap text-xs text-red-600 dark:text-red-400",
          children: o
        }),
        e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsx(Ot, {
              title: "\uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: u.summary,
              onToggle: () => F("summary"),
              children: e.jsx(Et, {
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
                rows: xe.map((w) => ({
                  label: w.label,
                  value: w.value
                })),
                emptyText: "\uBD84\uC11D\uC744 \uC2DC\uC791\uD558\uBA74 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4."
              })
            }),
            e.jsx(Ot, {
              title: "\uD30C\uC77C \uD615\uC2DD\uBCC4 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: u.extension,
              onToggle: () => F("extension"),
              children: e.jsx(Et, {
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
                rows: ((p == null ? void 0 : p.byExtension) ?? []).map((w) => ({
                  _key: w.ext,
                  label: w.label,
                  count: w.count.toLocaleString(),
                  size: de(w.size),
                  percent: e.jsx(_r, {
                    percent: w.percent
                  }),
                  _onClick: () => b(w)
                })),
                emptyText: "\uBD84\uC11D\uC744 \uC2DC\uC791\uD558\uBA74 \uD615\uC2DD\uBCC4 \uC6A9\uB7C9\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4.",
                legendColumnKey: "percent"
              })
            }),
            e.jsx(Ot, {
              title: "\uD3F4\uB354\uBCC4 \uC6A9\uB7C9 (Tree Size)",
              open: u.folder,
              onToggle: () => F("folder"),
              children: e.jsx(Et, {
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
                rows: ee.map((w) => {
                  const V = k.has(w.path);
                  return {
                    _key: w.path,
                    fileCount: w.fileCount.toLocaleString(),
                    size: de(w.size),
                    percent: e.jsx(_r, {
                      percent: w.percent
                    }),
                    ...w.hasChildFolders ? {
                      _onClick: () => B(w.path)
                    } : {},
                    _tree: {
                      depth: w.depth,
                      expandable: w.hasChildFolders,
                      expanded: V,
                      label: e.jsx("span", {
                        title: w.path,
                        children: w.name
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
        e.jsx(Wn, {
          open: f != null,
          extension: f,
          onOpenChange: (w) => {
            w || b(null);
          },
          onOpenFile: async (w) => {
            b(null), await (d == null ? void 0 : d(w));
          }
        })
      ]
    });
  }
  function zt(t) {
    return String(t || "").replace(/^\/+/, "");
  }
  function so(t) {
    const r = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
    for (const [d, l] of t) {
      if (l.kind === "file") {
        r.add(zt(l.path));
        continue;
      }
      const i = Va(d);
      i && s.add(i.dateStr);
    }
    return {
      files: r,
      chatDates: s
    };
  }
  function no(t, r) {
    const s = zt(t);
    if (zr(s)) {
      const d = Ua(s);
      return !!(d && r.chatDates.has(d));
    }
    return r.files.has(s);
  }
  function Fr(t, r, s) {
    let d = 0, l = 0;
    const i = (o) => {
      var _a2;
      if (o.type === "file" && o.path) {
        const c = zt(o.path);
        if (!(zr(c) || Ha(c, s))) return;
        d += 1, no(c, r) && (l += 1);
        return;
      }
      if ((_a2 = o.children) == null ? void 0 : _a2.length) for (const c of o.children) i(c);
    };
    return i(t), {
      indexableCount: d,
      indexedCount: l
    };
  }
  function Dr(t, r) {
    return r <= 0 ? 0 : t / r * 100;
  }
  function Xr(t, r) {
    return r <= 0 ? "\u2014" : t > 0 && t < 0.1 ? "< 0.1%" : `${t.toFixed(1)}%`;
  }
  function oo(t, r, s = {}) {
    const d = Array.isArray(t) ? t : [], l = so(r);
    let i = 0, o = 0;
    const c = [], p = (m, k, x) => {
      var _a2;
      const f = m.filter((b) => b.type === "folder").map((b) => ({
        node: b,
        ...Fr(b, l, s)
      })).sort((b, u) => u.indexableCount - b.indexableCount || b.node.name.localeCompare(u.node.name));
      for (const { node: b, indexableCount: u, indexedCount: h } of f) {
        const E = b.path || `${b.name}/`, v = (b.children ?? []).some((T) => T.type === "folder"), g = Dr(h, u);
        c.push({
          path: E,
          name: b.name,
          depth: k,
          parentPath: x,
          hasChildFolders: v,
          indexableCount: u,
          indexedCount: h,
          percent: g
        }), ((_a2 = b.children) == null ? void 0 : _a2.length) && p(b.children, k + 1, E);
      }
    };
    for (const m of d) {
      const k = Fr(m, l, s);
      i += k.indexableCount, o += k.indexedCount;
    }
    return p(d, 0, null), {
      summary: {
        indexableCount: i,
        indexedCount: o,
        percent: Dr(o, i)
      },
      folders: c
    };
  }
  const lo = `${qa} min-w-[200px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft`;
  function io(t) {
    return t === me ? "Local Haim" : t === Ne ? "WebDAV Haim" : t === le ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function co(t) {
    const r = Math.min(1, Math.max(0, t / 100)), s = Math.round(255 * (1 - r) + 34 * r), d = Math.round(68 * (1 - r) + 197 * r), l = Math.round(68 * (1 - r) + 94 * r);
    return `rgb(${s} ${d} ${l})`;
  }
  function xo(t, r) {
    const s = /* @__PURE__ */ new Set(), d = [];
    for (const l of t) (l.parentPath == null || s.has(l.parentPath) && r.has(l.parentPath)) && (d.push(l), s.add(l.path));
    return d;
  }
  function uo({ percent: t, indexableCount: r, className: s = "" }) {
    const d = r > 0 ? Math.min(100, Math.max(0, t)) : 0;
    return e.jsx("div", {
      className: `h-3 w-28 shrink-0 overflow-hidden rounded-sm bg-gray-900/90 dark:bg-black/50 ${s}`,
      "aria-hidden": true,
      children: e.jsx("div", {
        className: "h-full min-w-0 transition-[width] duration-150",
        style: {
          width: `${d}%`,
          backgroundColor: co(t)
        }
      })
    });
  }
  function bo({ depth: t, expandable: r, expanded: s, label: d }) {
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
        r ? e.jsx("span", {
          className: "inline-flex size-4 shrink-0 items-center justify-center text-gray-500 dark:text-odp-muted",
          "aria-hidden": true,
          children: s ? e.jsx(Mr, {
            size: 14
          }) : e.jsx(Br, {
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
  function po({ row: t, index: r, expanded: s, building: d, indexEnabled: l, onToggle: i, onIndexFolder: o }) {
    const c = Ga(), { contextMenuOpen: p, setContextMenuOpen: m, longPressOpenedRef: k, bindPress: x } = Xa({
      enabled: true,
      coarse: c
    }), f = t.hasChildFolders, b = Fe(t.path), u = l && !d && !b, h = Xr(t.percent, t.indexableCount), E = (g) => {
      f && (g.key !== "Enter" && g.key !== " " || (g.preventDefault(), i(t.path)));
    }, v = e.jsxs("li", {
      className: `flex items-center gap-2 rounded px-1 py-0.5 ${f ? "cursor-pointer hover:bg-white/5 focus-visible:outline-1 focus-visible:outline-blue-400" : ""}`,
      onClick: () => {
        if (c && k.current) {
          k.current = false;
          return;
        }
        f && i(t.path);
      },
      onKeyDown: E,
      tabIndex: f ? 0 : void 0,
      "aria-expanded": f ? s : void 0,
      ...c ? x : {},
      children: [
        e.jsx("span", {
          className: "w-5 shrink-0 text-right tabular-nums text-gray-500",
          children: r + 1
        }),
        e.jsx("span", {
          className: "min-w-0 flex-1 overflow-hidden",
          children: e.jsx(bo, {
            depth: t.depth,
            expandable: t.hasChildFolders,
            expanded: s,
            label: e.jsx("span", {
              title: t.path,
              children: t.name
            })
          })
        }),
        e.jsx("span", {
          className: "w-16 shrink-0 text-right tabular-nums text-gray-400",
          children: t.indexableCount > 0 ? `${t.indexedCount.toLocaleString()}/${t.indexableCount.toLocaleString()}` : "\u2014"
        }),
        e.jsx(uo, {
          percent: t.percent,
          indexableCount: t.indexableCount
        }),
        e.jsx("span", {
          className: "w-12 shrink-0 text-right tabular-nums text-gray-200",
          children: h
        })
      ]
    });
    return e.jsx(Ya, {
      ...c ? {
        open: p,
        onOpenChange: m
      } : {},
      title: t.path.replace(/\/$/, "") || t.name,
      subtitle: "\uD3F4\uB354 \uCEE4\uBC84\uB9AC\uC9C0",
      contentClassName: lo,
      trigger: v,
      children: e.jsxs(Ja, {
        className: Qa,
        disabled: !u,
        onSelect: () => {
          u && o(t.path);
        },
        children: [
          e.jsx(nt, {
            size: 14
          }),
          "\uC774 \uD3F4\uB354 \uC5ED\uC0C9\uC778",
          b ? " (\uC2DC\uC2A4\uD15C \uC81C\uC678)" : ""
        ]
      })
    });
  }
  function go({ storageMode: t = le, onScanTree: r, canScan: s = true, embedded: d = false }) {
    const [l, i] = a.useState(false), [o, c] = a.useState(null), [p, m] = a.useState(null), [k, x] = a.useState(() => /* @__PURE__ */ new Set()), [f, b] = a.useState(0), u = a.useRef(null), h = a.useRef(false), E = a.useRef(false), v = a.useRef(r), g = a.useRef(s);
    a.useEffect(() => {
      v.current = r, g.current = s;
    }, [
      r,
      s
    ]);
    const T = a.useCallback(async () => {
      const R = v.current;
      if (!(!R || !g.current || E.current)) {
        E.current = true, i(true), c(null);
        try {
          const $ = await R();
          m($), x(/* @__PURE__ */ new Set());
        } catch ($) {
          const K = $ instanceof Error ? $.message : String($);
          c(K || "\uD3F4\uB354 \uD2B8\uB9AC\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."), m(null), x(/* @__PURE__ */ new Set());
        } finally {
          E.current = false, i(false);
        }
      }
    }, []);
    a.useEffect(() => P.subscribe(() => {
      if (P.getStatus().building) {
        if (h.current || (h.current = true, T()), u.current) return;
        u.current = setTimeout(() => {
          u.current = null, b(($) => $ + 1);
        }, 500);
        return;
      }
      h.current = false, u.current && (clearTimeout(u.current), u.current = null), b(($) => $ + 1);
    }), [
      T
    ]), a.useEffect(() => {
      P.getStatus().building && (h.current || (h.current = true, T()));
    }, [
      T
    ]), a.useEffect(() => () => {
      u.current && clearTimeout(u.current);
    }, []), a.useEffect(() => {
      m(null), c(null), x(/* @__PURE__ */ new Set()), h.current = false;
    }, [
      t
    ]);
    const j = P.getStatus(), A = a.useMemo(() => p ? oo(p, P.getIndex().docs, {
      includeOtherFiles: j.includeOtherFiles,
      excludedFolders: j.excludedFolders
    }) : null, [
      p,
      f,
      j.includeOtherFiles,
      j.excludedFolders
    ]), N = xo((A == null ? void 0 : A.folders) ?? [], k), _ = (R) => {
      x(($) => {
        const K = new Set($);
        return K.has(R) ? K.delete(R) : K.add(R), K;
      });
    }, D = () => {
      T();
    }, F = a.useCallback((R) => {
      P.rebuild({
        folderPath: R,
        ignoreExcludedFolders: true
      });
    }, []), B = A == null ? void 0 : A.summary, Z = B ? Xr(B.percent, B.indexableCount) : "\u2014";
    return e.jsxs("div", {
      className: d ? "space-y-4 border-t border-gray-200 pt-4 dark:border-odp-borderSoft" : "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsxs("div", {
          className: "flex flex-wrap items-start justify-between gap-3",
          children: [
            e.jsxs("div", {
              className: "min-w-0",
              children: [
                e.jsx("h3", {
                  className: d ? "text-xs font-bold text-gray-700 dark:text-odp-fgStrong" : "text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
                  children: d ? "\uD3F4\uB354\uBCC4 \uCEE4\uBC84\uB9AC\uC9C0" : "\uC5ED\uC0C9\uC778"
                }),
                e.jsxs("p", {
                  className: "mt-1 text-xs text-gray-600 dark:text-odp-muted",
                  children: [
                    "\uD604\uC7AC \uC120\uD0DD: ",
                    e.jsx("span", {
                      className: "font-semibold",
                      children: io(t)
                    }),
                    ". \uD3F4\uB354\uBCC4\uB85C \uC0C9\uC778 \uB300\uC0C1 \uD30C\uC77C \uC911 \uC5ED\uC0C9\uC778\uB41C \uBE44\uC728\uC744 \uD45C\uC2DC\uD569\uB2C8\uB2E4.",
                    j.includeOtherFiles ? " (Markdown + \uAE30\uD0C0 \uD14D\uC2A4\uD2B8 \uD30C\uC77C)" : " (Markdown\uB9CC)",
                    j.building ? " \uC0C9\uC778 \uC2DC\uC791 \uC2DC \uD3F4\uB354 \uD2B8\uB9AC\uB97C \uC790\uB3D9\uC73C\uB85C \uBD88\uB7EC\uC624\uACE0, \uC9C4\uD589\uB3C4\uAC00 \uAC31\uC2E0\uB429\uB2C8\uB2E4." : ""
                  ]
                })
              ]
            }),
            e.jsxs("button", {
              type: "button",
              onClick: D,
              disabled: !s || l || typeof r != "function",
              className: "inline-flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
              children: [
                l ? e.jsx(De, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(Dt, {
                  size: 14
                }),
                l ? "\uBD88\uB7EC\uC624\uB294 \uC911\u2026" : p ? "\uB2E4\uC2DC \uBD88\uB7EC\uC624\uAE30" : "\uD3F4\uB354 \uD2B8\uB9AC \uBD88\uB7EC\uC624\uAE30"
              ]
            })
          ]
        }),
        !s && e.jsx("p", {
          className: "text-xs text-amber-700 dark:text-amber-300",
          children: "\uC120\uD0DD\uD55C \uC800\uC7A5\uC18C\uAC00 \uC544\uC9C1 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC5F0\uACB0 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
        }),
        !j.enabled && e.jsx("p", {
          className: "text-xs text-amber-700 dark:text-amber-300",
          children: "\uC5ED\uC0C9\uC778\uC774 \uAEBC\uC838 \uC788\uC2B5\uB2C8\uB2E4. \uC704\uC5D0\uC11C \uC5ED\uC0C9\uC778\uC744 \uCF20 \uB4A4 \uC0C9\uC778\uC744 \uC0DD\uC131\uD558\uC138\uC694."
        }),
        o ? e.jsx("p", {
          className: "whitespace-pre-wrap text-xs text-red-600 dark:text-red-400",
          children: o
        }) : null,
        B ? e.jsxs("div", {
          className: "rounded-md border border-gray-200 bg-white px-3 py-2 text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft",
          children: [
            e.jsx("span", {
              className: "font-semibold text-gray-700 dark:text-odp-fgStrong",
              children: "\uC804\uCCB4"
            }),
            e.jsx("span", {
              className: "mx-2 text-gray-400",
              children: "|"
            }),
            e.jsxs("span", {
              className: "tabular-nums text-gray-700 dark:text-odp-fg",
              children: [
                B.indexedCount.toLocaleString(),
                " / ",
                B.indexableCount.toLocaleString(),
                " \uD30C\uC77C"
              ]
            }),
            e.jsx("span", {
              className: "mx-2 text-gray-400",
              children: "|"
            }),
            e.jsx("span", {
              className: "font-mono tabular-nums text-gray-700 dark:text-odp-fg",
              children: Z
            })
          ]
        }) : null,
        e.jsx("div", {
          className: "max-h-96 overflow-auto rounded-md border border-gray-800 bg-[#1a1b26] p-2 font-mono text-[11px] text-gray-100 dark:border-gray-700",
          children: N.length === 0 ? e.jsx("p", {
            className: "px-2 py-6 text-center text-gray-500",
            children: l ? "\uD3F4\uB354 \uD2B8\uB9AC\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026" : p ? "\uD45C\uC2DC\uD560 \uD3F4\uB354\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." : j.building ? "\uC0C9\uC778 \uC2DC\uC791\uC5D0 \uB9DE\uCDB0 \uD3F4\uB354 \uD2B8\uB9AC\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026" : "\u300C\uD3F4\uB354 \uD2B8\uB9AC \uBD88\uB7EC\uC624\uAE30\u300D\uB97C \uB204\uB974\uAC70\uB098 \uC0C9\uC778\uC744 \uC2DC\uC791\uD558\uBA74 \uC5ED\uC0C9\uC778 \uD604\uD669\uC744 \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
          }) : e.jsx("ul", {
            className: "space-y-0.5",
            children: N.map((R, $) => e.jsx(po, {
              row: R,
              index: $,
              expanded: k.has(R.path),
              building: j.building,
              indexEnabled: j.enabled,
              onToggle: _,
              onIndexFolder: F
            }, R.path))
          })
        }),
        e.jsx("p", {
          className: "text-[10px] text-gray-500 dark:text-odp-muted",
          children: "\uD3F4\uB354\uB97C \uD074\uB9AD\uD574 \uD558\uC704 \uD3F4\uB354\uB97C \uD3BC\uCE69\uB2C8\uB2E4. \uC6B0\uD074\uB9AD(\uB610\uB294 \uAE38\uAC8C \uB204\uB974\uAE30)\uC73C\uB85C \uD574\uB2F9 \uD3F4\uB354\uB9CC \uC5ED\uC0C9\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4(\uC81C\uC678 \uD3F4\uB354 \uC124\uC815\uC744 \uBB34\uC2DC\uD558\uACE0 \uBCD1\uD569 \uC0C9\uC778). \uCC44\uD305 day \uD30C\uC77C\uC740 \uD574\uB2F9 \uB0A0\uC9DC \uBA54\uC2DC\uC9C0\uAC00 \uD558\uB098\uB77C\uB3C4 \uC0C9\uC778\uB418\uBA74 \uC644\uB8CC\uB85C \uC9D1\uACC4\uD569\uB2C8\uB2E4."
        })
      ]
    });
  }
  const mo = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), ho = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function fo(t) {
    return t === me ? "Local Haim" : t === Ne ? "WebDAV Haim" : t === le ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function yo({ storageMode: t, canScan: r = false, onScanTree: s, onReadText: d, onReadBytes: l, onDeletePaths: i }) {
    const [o, c] = a.useState(() => Za()), [p, m] = a.useState("notes"), [k, x] = a.useState("trash"), [f, b] = a.useState(false), [u, h] = a.useState(false), [E, v] = a.useState(null), [g, T] = a.useState(null), [j, A] = a.useState(""), [N, _] = a.useState([]), [D, F] = a.useState(() => /* @__PURE__ */ new Set()), [B, Z] = a.useState([]), [R, $] = a.useState(() => /* @__PURE__ */ new Set()), [K, z] = a.useState({}), [Ee, xe] = a.useState(false), [ee, w] = a.useState([]), [V, X] = a.useState({}), [Oe, ze] = a.useState(false), ie = a.useRef(null);
    a.useEffect(() => Re((y, C) => {
      y === "settings-orphan-image-auto" && c(C);
    }), []), a.useEffect(() => () => {
      var _a2;
      (_a2 = ie.current) == null ? void 0 : _a2.abort();
    }, []);
    const re = f || u || Oe, Me = async () => {
      var _a2;
      if (!r || !s || !d || re) return;
      (_a2 = ie.current) == null ? void 0 : _a2.abort();
      const y = new AbortController();
      ie.current = y, b(true), A(""), v(null);
      try {
        const C = await s();
        if (y.signal.aborted) return;
        const I = hr(C, p), L = es(C), M = /* @__PURE__ */ new Set();
        if (await ts(L, 6, async (H) => {
          try {
            const q = await d(H);
            for (const Ke of rs(q)) M.add(Ke);
          } catch {
          }
        }, {
          signal: y.signal,
          onProgress: (H, q) => v({
            done: H,
            total: q
          })
        }), y.signal.aborted) return;
        const U = as({
          images: I,
          referencedPaths: M
        });
        _(U), F(new Set(U.map((H) => H.path)));
      } catch (C) {
        if ((C == null ? void 0 : C.name) === "AbortError") return;
        A(C instanceof Error ? C.message : String(C));
      } finally {
        b(false), v(null);
      }
    }, Be = async () => {
      var _a2;
      if (!r || !s || !l || re) return;
      (_a2 = ie.current) == null ? void 0 : _a2.abort();
      const y = new AbortController();
      ie.current = y, h(true), A(""), T(null);
      try {
        const C = await s();
        if (y.signal.aborted) return;
        const I = hr(C, p), L = await ss(I, l, {
          signal: y.signal,
          onProgress: (H, q) => T({
            done: H,
            total: q
          })
        });
        if (y.signal.aborted) return;
        Z(L);
        const M = {}, U = /* @__PURE__ */ new Set();
        for (const H of L) {
          M[H.hash] = H.keepPath;
          for (const q of H.files) q.path !== H.keepPath && U.add(q.path);
        }
        z(M), $(U);
      } catch (C) {
        if ((C == null ? void 0 : C.name) === "AbortError") return;
        A(C instanceof Error ? C.message : String(C));
      } finally {
        h(false), T(null);
      }
    }, ye = (y) => {
      F((C) => {
        const I = new Set(C);
        return I.has(y) ? I.delete(y) : I.add(y), I;
      });
    }, ae = (y, C) => {
      const I = K[C];
      y !== I && $((L) => {
        const M = new Set(L);
        return M.has(y) ? M.delete(y) : M.add(y), M;
      });
    }, it = (y, C) => {
      z((I) => ({
        ...I,
        [y]: C
      })), $((I) => {
        const L = new Set(I), M = B.find((U) => U.hash === y);
        if (!M) return L;
        for (const U of M.files) U.path === C ? L.delete(U.path) : L.add(U.path);
        return L;
      });
    }, ct = () => {
      const y = {};
      for (const C of B) {
        const I = K[C.hash];
        if (I) for (const L of C.files) L.path !== I && R.has(L.path) && (y[L.path] = I);
      }
      return y;
    }, $e = (y, C) => {
      !y.length || !i || (w(y), X(C ?? {}), xe(true));
    }, xt = async () => {
      if (!(!i || !ee.length)) {
        ze(true), A("");
        try {
          const y = Object.keys(V).length ? V : void 0;
          await i(ee, k, y ? {
            pathRemap: y
          } : void 0);
          const C = new Set(ee);
          _((I) => I.filter((L) => !C.has(L.path))), F((I) => {
            const L = new Set(I);
            for (const M of C) L.delete(M);
            return L;
          }), Z((I) => I.map((L) => ({
            ...L,
            files: L.files.filter((M) => !C.has(M.path))
          })).filter((L) => L.files.length >= 2)), $((I) => {
            const L = new Set(I);
            for (const M of C) L.delete(M);
            return L;
          }), xe(false), w([]), X({});
        } catch (y) {
          A(y instanceof Error ? y.message : String(y));
        } finally {
          ze(false);
        }
      }
    }, Y = D.size, te = R.size, ue = k === "hard";
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
                fo(t),
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
            e.jsx(ot, {
              className: mo(o),
              checked: o,
              onCheckedChange: (y) => W("settings-orphan-image-auto", y),
              "aria-label": "\uB178\uD2B8 \uC0AD\uC81C \uC2DC \uC774\uBBF8\uC9C0 \uC790\uB3D9 \uC815\uB9AC",
              children: e.jsx(dt, {
                className: ho
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
                e.jsx(we, {
                  className: "flex flex-col gap-1.5",
                  value: p,
                  onValueChange: (y) => m(y),
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
                  ].map((y) => {
                    const C = p === y.value;
                    return e.jsx(fe, {
                      value: y.value,
                      className: [
                        "rounded-md border-2 px-2.5 py-2 text-left text-xs outline-none transition-all",
                        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                        C ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30" : "border-gray-300 opacity-70 dark:border-odp-borderStrong"
                      ].join(" "),
                      children: y.label
                    }, y.value);
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
                e.jsx(we, {
                  className: "flex flex-col gap-1.5",
                  value: k,
                  onValueChange: (y) => x(y),
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
                  ].map((y) => {
                    const C = k === y.value;
                    return e.jsx(fe, {
                      value: y.value,
                      className: [
                        "rounded-md border-2 px-2.5 py-2 text-left text-xs outline-none transition-all",
                        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                        C ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30" : "border-gray-300 opacity-70 dark:border-odp-borderStrong"
                      ].join(" "),
                      children: y.label
                    }, y.value);
                  })
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          className: "flex flex-wrap gap-2",
          children: [
            e.jsxs(he, {
              type: "button",
              variant: "secondary",
              disabled: !r || re,
              onClick: () => {
                Me();
              },
              children: [
                f ? e.jsx(De, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(nt, {
                  size: 14
                }),
                "\uBBF8\uC0AC\uC6A9 \uC2A4\uCE94"
              ]
            }),
            e.jsxs(he, {
              type: "button",
              variant: "secondary",
              disabled: !r || re,
              onClick: () => {
                Be();
              },
              children: [
                u ? e.jsx(De, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(ln, {
                  size: 14
                }),
                "\uC911\uBCF5 \uC2A4\uCE94"
              ]
            })
          ]
        }),
        (E || g) && e.jsxs("p", {
          className: "text-[11px] text-gray-500 dark:text-odp-muted",
          children: [
            E ? `Markdown ${E.done}/${E.total}` : null,
            E && g ? " \xB7 " : null,
            g ? `\uD574\uC2DC ${g.done}/${g.total}` : null
          ]
        }),
        j ? e.jsx("p", {
          className: "text-xs text-red-600 dark:text-red-400",
          role: "alert",
          children: j
        }) : null,
        r ? null : e.jsx("p", {
          className: "text-xs text-gray-500 dark:text-odp-muted",
          children: "\uC800\uC7A5\uC18C\uAC00 \uC5F0\uACB0\uB418\uBA74 \uC2A4\uCE94\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
        }),
        N.length > 0 ? e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsxs("div", {
              className: "flex items-center justify-between gap-2",
              children: [
                e.jsxs("h4", {
                  className: "text-xs font-bold text-gray-700 dark:text-odp-fg",
                  children: [
                    "\uBBF8\uC0AC\uC6A9 (",
                    N.length,
                    ")"
                  ]
                }),
                e.jsxs(he, {
                  type: "button",
                  variant: "danger",
                  disabled: Y === 0 || re,
                  onClick: () => $e([
                    ...D
                  ]),
                  children: [
                    e.jsx(Lt, {
                      size: 14
                    }),
                    "\uC120\uD0DD \uC0AD\uC81C (",
                    Y,
                    ")"
                  ]
                })
              ]
            }),
            e.jsx("ul", {
              className: "max-h-56 space-y-1 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter",
              children: N.map((y) => e.jsx("li", {
                children: e.jsxs("label", {
                  className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg",
                  children: [
                    e.jsx("input", {
                      type: "checkbox",
                      className: "mt-0.5",
                      checked: D.has(y.path),
                      onChange: () => ye(y.path)
                    }),
                    e.jsx("span", {
                      className: "min-w-0 flex-1 break-all",
                      children: y.path
                    }),
                    e.jsx("span", {
                      className: "shrink-0 tabular-nums text-gray-500 dark:text-odp-muted",
                      children: de(y.size)
                    })
                  ]
                })
              }, y.path))
            })
          ]
        }) : null,
        B.length > 0 ? e.jsxs("div", {
          className: "space-y-3",
          children: [
            e.jsxs("div", {
              className: "flex items-center justify-between gap-2",
              children: [
                e.jsxs("h4", {
                  className: "text-xs font-bold text-gray-700 dark:text-odp-fg",
                  children: [
                    "\uC911\uBCF5 (",
                    B.length,
                    " \uADF8\uB8F9)"
                  ]
                }),
                e.jsxs(he, {
                  type: "button",
                  variant: "danger",
                  disabled: te === 0 || re,
                  onClick: () => $e([
                    ...R
                  ], ct()),
                  children: [
                    e.jsx(Lt, {
                      size: 14
                    }),
                    "\uC120\uD0DD \uC0AD\uC81C (",
                    te,
                    ")"
                  ]
                })
              ]
            }),
            B.map((y) => e.jsxs("div", {
              className: "space-y-1 rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter",
              children: [
                e.jsxs("div", {
                  className: "text-[10px] text-gray-500 dark:text-odp-muted",
                  children: [
                    de(y.size),
                    " \xB7 ",
                    y.hash.slice(0, 12),
                    "\u2026"
                  ]
                }),
                e.jsx("ul", {
                  className: "space-y-1",
                  children: y.files.map((C) => {
                    const I = K[y.hash] === C.path;
                    return e.jsx("li", {
                      children: e.jsxs("label", {
                        className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg",
                        children: [
                          e.jsx("input", {
                            type: "checkbox",
                            className: "mt-0.5",
                            checked: R.has(C.path),
                            disabled: I,
                            onChange: () => ae(C.path, y.hash)
                          }),
                          e.jsxs("span", {
                            className: "min-w-0 flex-1 break-all",
                            children: [
                              C.path,
                              I ? e.jsx("span", {
                                className: "ml-1 text-[10px] text-blue-600 dark:text-blue-400",
                                children: "(\uC720\uC9C0)"
                              }) : null
                            ]
                          }),
                          I ? null : e.jsx("button", {
                            type: "button",
                            className: "shrink-0 text-[10px] text-blue-600 underline dark:text-blue-400",
                            onClick: () => it(y.hash, C.path),
                            children: "\uC774 \uD30C\uC77C \uC720\uC9C0"
                          })
                        ]
                      })
                    }, C.path);
                  })
                })
              ]
            }, y.hash))
          ]
        }) : null,
        e.jsx(Ce, {
          isOpen: Ee,
          title: ue ? "\uC774\uBBF8\uC9C0\uB97C \uC601\uAD6C \uC0AD\uC81C\uD560\uAE4C\uC694?" : "\uC774\uBBF8\uC9C0\uB97C \uD734\uC9C0\uD1B5\uC73C\uB85C \uBCF4\uB0BC\uAE4C\uC694?",
          message: ue ? `${ee.length}\uAC1C \uD30C\uC77C\uC744 \uBCF5\uAD6C\uD560 \uC218 \uC5C6\uC774 \uC0AD\uC81C\uD569\uB2C8\uB2E4.${Object.keys(V).length ? " \uC0AD\uC81C \uB300\uC0C1\uC744 \uCC38\uC870\uD558\uB294 \uBB38\uC11C \uB9C1\uD06C\uB294 \uC720\uC9C0 \uC774\uBBF8\uC9C0\uB85C \uBC14\uB01D\uB2C8\uB2E4." : ""}` : `${ee.length}\uAC1C \uD30C\uC77C\uC744 .trash/ \uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.${Object.keys(V).length ? " \uC0AD\uC81C \uB300\uC0C1\uC744 \uCC38\uC870\uD558\uB294 \uBB38\uC11C \uB9C1\uD06C\uB294 \uC720\uC9C0 \uC774\uBBF8\uC9C0\uB85C \uBC14\uB01D\uB2C8\uB2E4." : ""}`,
          variant: "danger",
          confirmLabel: ue ? "\uC601\uAD6C \uC0AD\uC81C" : "\uD734\uC9C0\uD1B5\uC73C\uB85C \uC774\uB3D9",
          cancelLabel: "\uCDE8\uC18C",
          confirmDisabled: Oe,
          onConfirm: () => {
            xt();
          },
          onCancel: () => {
            Oe || (xe(false), w([]), X({}));
          }
        })
      ]
    });
  }
  const ko = "\uC554\uD638\uC124\uC815 \uBD88\uB7EC\uC624\uB294 \uC911", jo = [
    {
      value: "off",
      label: "\uC0AC\uC6A9 \uC548 \uD568",
      description: "\uC571\uC744 \uC5F4\uBA74 \uC800\uC7A5\uB41C \uC5F0\uACB0 \uC815\uBCF4\uB97C \uBC14\uB85C \uBD88\uB7EC\uC635\uB2C8\uB2E4.",
      icon: It
    },
    {
      value: "password",
      label: "\uBE44\uBC00\uBC88\uD638",
      description: "\uC571 \uC785\uC7A5 \uC2DC \uB9C8\uC2A4\uD130 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD569\uB2C8\uB2E4.",
      icon: cs
    },
    {
      value: "biometric",
      label: "\uC0DD\uCCB4 \uC778\uC99D",
      description: "Touch ID, Windows Hello \uB4F1\uC73C\uB85C \uC571\uC744 \uC7A0\uAE08 \uD574\uC81C\uD569\uB2C8\uB2E4.",
      icon: xs
    }
  ];
  function vo({ s3Creds: t, webdavConfig: r, onModeChanged: s }) {
    const { lock: d } = ns(), { showToast: l, dismissToast: i } = os(), [o, c] = a.useState("off"), [p, m] = a.useState(false), [k, x] = a.useState(false), [f, b] = a.useState(false), [u, h] = a.useState(false), E = ds(), v = a.useCallback(async (N) => {
      l({
        message: ko,
        icon: "loading",
        durationMs: 0
      });
      try {
        return await N();
      } finally {
        i();
      }
    }, [
      i,
      l
    ]);
    if (a.useEffect(() => {
      if (!Tt()) return;
      let N = false;
      return (async () => {
        try {
          const [_, D] = await v(() => Promise.all([
            ls(),
            is()
          ]));
          if (N) return;
          c(_), m(D);
        } catch {
          N || (c("off"), m(false));
        }
      })(), () => {
        N = true;
      };
    }, [
      v
    ]), !Tt()) return null;
    const g = async (N) => {
      if (!(k || N === o)) {
        x(true);
        try {
          if (N === "off") await v(() => fr(t, r));
          else if (N === "password") {
            b(true);
            return;
          } else await v(() => bs(t));
          c(N), s == null ? void 0 : s(N);
        } catch (_) {
          if (N === "biometric" && ps(_)) return;
          alert(vt(_, "\uC785\uC7A5 \uC7A0\uAE08 \uC124\uC815\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
        } finally {
          x(false);
        }
      }
    }, T = async (N) => {
      x(true);
      try {
        await v(() => gs(N, t, r)), c("password"), s == null ? void 0 : s("password"), b(false);
      } catch (_) {
        alert(vt(_, "\uBE44\uBC00\uBC88\uD638 \uC7A0\uAE08 \uC124\uC815\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        x(false);
      }
    }, j = async () => {
      h(false), x(true);
      try {
        await v(() => fr(t, r)), c("off"), s == null ? void 0 : s("off");
      } catch (N) {
        alert(vt(N, "\uC785\uC7A5 \uC7A0\uAE08 \uD574\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        x(false);
      }
    }, A = () => {
      o === "off" || k || d();
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
                    e.jsx(It, {
                      size: 16
                    }),
                    "\uC571 \uC785\uC7A5 \uC7A0\uAE08 (Tauri)"
                  ]
                }),
                o !== "off" ? e.jsxs(he, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  className: "shrink-0",
                  disabled: k,
                  onClick: A,
                  "aria-label": "\uC571 \uC7A0\uAE08",
                  children: [
                    e.jsx(It, {
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
                E,
                "\uB85C \uC7A0\uAE08 \uD574\uC81C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC571\uC744 \uC0C8\uB85C \uCF1C\uAC70\uB098 \uC7A0\uAE08 \uBC84\uD2BC\uC744 \uB20C\uB800\uC744 \uB54C\uB9CC \uC778\uC99D\uC774 \uD544\uC694\uD569\uB2C8\uB2E4."
              ]
            }),
            e.jsx(we, {
              value: o,
              onValueChange: (N) => {
                const _ = N;
                if (_ === "off" && o !== "off") {
                  h(true);
                  return;
                }
                g(_);
              },
              className: "space-y-2",
              disabled: k,
              children: jo.map((N) => {
                const _ = N.icon, D = N.value === "biometric" && !p, F = N.value === "biometric" && p ? E : N.label, B = N.value === "biometric" && p ? `${E}\uB85C \uC571\uC744 \uC7A0\uAE08 \uD574\uC81C\uD569\uB2C8\uB2E4.` : N.description;
                return e.jsxs("label", {
                  className: [
                    "flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition",
                    o === N.value ? "border-blue-400 bg-white shadow-sm dark:border-blue-500 dark:bg-odp-bgSoft" : "border-gray-200 bg-white/70 dark:border-odp-borderStrong dark:bg-odp-surface/60",
                    D ? "cursor-not-allowed opacity-50" : "hover:border-blue-300"
                  ].join(" "),
                  children: [
                    e.jsx(fe, {
                      value: N.value,
                      disabled: D || k,
                      className: "mt-0.5 h-4 w-4 shrink-0 rounded-full border border-gray-400 bg-white outline-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                      "aria-label": F,
                      children: e.jsx(_t, {
                        className: "relative flex h-full w-full items-center justify-center after:block after:h-1.5 after:w-1.5 after:rounded-full after:bg-white"
                      })
                    }),
                    e.jsxs("span", {
                      className: "min-w-0 flex-1",
                      children: [
                        e.jsxs("span", {
                          className: "flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-odp-fg",
                          children: [
                            e.jsx(_, {
                              size: 14
                            }),
                            F
                          ]
                        }),
                        e.jsx("span", {
                          className: "mt-0.5 block text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
                          children: B
                        }),
                        D && e.jsx("span", {
                          className: "mt-1 block text-[11px] text-amber-700 dark:text-amber-300",
                          children: "\uC774 \uAE30\uAE30\uC5D0\uC11C\uB294 \uC0DD\uCCB4 \uC778\uC99D\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."
                        })
                      ]
                    })
                  ]
                }, N.value);
              })
            }),
            o !== "off" && e.jsx("p", {
              className: "mt-3 text-[11px] text-gray-500 dark:text-odp-muted",
              children: o === "password" ? "\uBE44\uBC00\uBC88\uD638 \uBAA8\uB4DC\uAC00 \uCF1C\uC838 \uC788\uC2B5\uB2C8\uB2E4. \uC571\uC744 \uB2E4\uC2DC \uC5F4 \uB54C \uBE44\uBC00\uBC88\uD638\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." : `${E} \uBAA8\uB4DC\uAC00 \uCF1C\uC838 \uC788\uC2B5\uB2C8\uB2E4.`
            })
          ]
        }),
        e.jsx(us, {
          isOpen: f,
          masterPassword: "",
          onCancel: () => {
            b(false);
          },
          onSubmit: (N) => {
            T(N);
          }
        }),
        e.jsx(Ce, {
          isOpen: u,
          title: "\uC785\uC7A5 \uC7A0\uAE08 \uD574\uC81C",
          message: "\uC571 \uC785\uC7A5 \uC7A0\uAE08\uC744 \uB044\uBA74 \uB2E4\uC74C \uC2E4\uD589\uBD80\uD130 \uBE44\uBC00\uBC88\uD638\xB7\uC0DD\uCCB4 \uC778\uC99D \uC5C6\uC774 \uC5F0\uACB0 \uC815\uBCF4\uB97C \uBD88\uB7EC\uC635\uB2C8\uB2E4.",
          confirmLabel: "\uC0AC\uC6A9 \uD574\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: () => {
            j();
          },
          onCancel: () => h(false)
        })
      ]
    });
  }
  const So = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), No = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function wo() {
    const [t, r] = a.useState(() => yr()), [s, d] = a.useState(""), [l, i] = a.useState(false), o = a.useCallback(async () => {
      if (ce()) try {
        d(await ms());
      } catch {
        d("");
      }
    }, []);
    a.useEffect(() => {
      if (ce()) return r(yr()), o(), Re((m, k) => {
        m === "settings-tauri-download-save-dialog" && r(k);
      });
    }, [
      o
    ]);
    const c = a.useCallback(async () => {
      i(true);
      try {
        await hs() && await o();
      } finally {
        i(false);
      }
    }, [
      o
    ]), p = a.useCallback(async () => {
      fs(null), await o();
    }, [
      o
    ]);
    return ce() ? e.jsxs("div", {
      id: "settings-tauri-download",
      tabIndex: -1,
      className: "scroll-mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsxs("h3", {
          className: "mb-2 flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
          children: [
            e.jsx(Pt, {
              size: 16
            }),
            "\uB370\uC2A4\uD06C\uD1B1 \uC571 \uB2E4\uC6B4\uB85C\uB4DC"
          ]
        }),
        e.jsx("p", {
          className: "mb-3 text-xs text-gray-600 dark:text-odp-muted",
          children: "Tauri \uB370\uC2A4\uD06C\uD1B1 \uBE4C\uB4DC\uC5D0\uC11C \uD30C\uC77C\uC744 \uB0B4\uB824\uBC1B\uC744 \uB54C \uC800\uC7A5 \uC704\uCE58\uB97C \uBA3C\uC800 \uD655\uC778\uD558\uAC70\uB098, \uBE60\uB978 \uB2E4\uC6B4\uB85C\uB4DC \uD3F4\uB354\uB85C \uBC14\uB85C \uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC644\uB8CC \uC2DC \uC0C1\uB2E8 \uD1A0\uC2A4\uD2B8\uB85C \uC54C\uB824 \uC90D\uB2C8\uB2E4."
        }),
        e.jsxs("div", {
          className: "flex items-start justify-between gap-3",
          children: [
            e.jsxs("div", {
              className: "min-w-0",
              children: [
                e.jsx("div", {
                  className: "text-xs font-semibold text-gray-700 dark:text-odp-fg",
                  children: "\uB2E4\uC6B4\uB85C\uB4DC \uC704\uCE58 \uC0AC\uC804 \uD655\uC778"
                }),
                e.jsx("p", {
                  className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
                  children: "\uCF1C\uBA74 \uD30C\uC77C\uB9C8\uB2E4 \uC800\uC7A5 \uB300\uD654\uC0C1\uC790\uB97C \uC5F4\uC5B4 \uACBD\uB85C\uC640 \uC774\uB984\uC744 \uD655\uC778\uD569\uB2C8\uB2E4. \uB044\uBA74 \uC544\uB798 \uBE60\uB978 \uB2E4\uC6B4\uB85C\uB4DC \uD3F4\uB354(\uB610\uB294 \uC2DC\uC2A4\uD15C \uB2E4\uC6B4\uB85C\uB4DC \uD3F4\uB354)\uB85C \uBC14\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4. (\uAE30\uBCF8\uAC12: \uCF1C\uC9D0)"
                })
              ]
            }),
            e.jsx(ot, {
              className: So(t),
              checked: t,
              onCheckedChange: (m) => {
                r(m), ys(m), W("settings-tauri-download-save-dialog", m);
              },
              "aria-label": "\uB2E4\uC6B4\uB85C\uB4DC \uC704\uCE58 \uC0AC\uC804 \uD655\uC778",
              children: e.jsx(dt, {
                className: No
              })
            })
          ]
        }),
        t ? null : e.jsxs("div", {
          className: "mt-4 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/40",
          children: [
            e.jsx("div", {
              className: "text-xs font-semibold text-gray-700 dark:text-odp-fg",
              children: "\uBE60\uB978 \uB2E4\uC6B4\uB85C\uB4DC \uD3F4\uB354"
            }),
            e.jsx("p", {
              className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
              children: "Storage API\uCC98\uB7FC \uD3F4\uB354\uB97C \uC9C0\uC815\uD574 \uB450\uBA74 \uD655\uC778 \uC5C6\uC774 \uBC14\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4. \uC9C0\uC815\uD558\uC9C0 \uC54A\uC73C\uBA74 Tauri \uC2DC\uC2A4\uD15C \uB2E4\uC6B4\uB85C\uB4DC \uD3F4\uB354\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
            }),
            e.jsx("p", {
              className: "mt-2 break-all font-mono text-[11px] text-gray-600 dark:text-odp-muted",
              children: s || "\uBD88\uB7EC\uC624\uB294 \uC911\u2026"
            }),
            e.jsxs("div", {
              className: "mt-3 flex flex-wrap gap-2",
              children: [
                e.jsxs(he, {
                  type: "button",
                  variant: "secondary",
                  disabled: l,
                  onClick: () => {
                    c();
                  },
                  children: [
                    e.jsx(st, {
                      size: 14
                    }),
                    "\uD3F4\uB354 \uC9C0\uC815"
                  ]
                }),
                e.jsxs(he, {
                  type: "button",
                  variant: "tertiary",
                  disabled: l,
                  onClick: () => {
                    p();
                  },
                  children: [
                    e.jsx(Pt, {
                      size: 14
                    }),
                    "\uC2DC\uC2A4\uD15C \uB2E4\uC6B4\uB85C\uB4DC \uD3F4\uB354"
                  ]
                })
              ]
            })
          ]
        })
      ]
    }) : null;
  }
  const Co = [
    {
      key: "maxFiles",
      label: "\uD30C\uC77C \uC0C1\uD55C",
      hint: "\uCFFC\uB9AC\uB2F9 \uC77D\uC744 \uB178\uD2B8\xB7\uAE30\uD0C0 \uD30C\uC77C \uC218"
    },
    {
      key: "maxChatDays",
      label: "\uCC44\uD305 day \uC0C1\uD55C",
      hint: "\uCFFC\uB9AC\uB2F9 \uC77D\uC744 \uCC44\uD305 day \uD30C\uC77C \uC218 (\uCD5C\uC2E0\uC21C)"
    },
    {
      key: "maxHits",
      label: "\uD788\uD2B8 \uC0C1\uD55C",
      hint: "\uB77C\uC774\uBE0C \uC2A4\uCE94\uC5D0\uC11C \uBC18\uD658\uD560 \uBCF8\uBB38 \uB9E4\uCE58 \uC218"
    }
  ];
  function Eo({ limits: t, disabled: r = false, onChange: s }) {
    const [d, l] = a.useState(() => ({
      maxFiles: String(t.maxFiles),
      maxChatDays: String(t.maxChatDays),
      maxHits: String(t.maxHits)
    }));
    a.useEffect(() => {
      l({
        maxFiles: String(t.maxFiles),
        maxChatDays: String(t.maxChatDays),
        maxHits: String(t.maxHits)
      });
    }, [
      t.maxFiles,
      t.maxChatDays,
      t.maxHits
    ]);
    const i = (o, c) => {
      const p = Number.parseInt(c.trim(), 10), m = vs({
        ...t,
        [o]: Number.isFinite(p) ? p : t[o]
      });
      l((k) => ({
        ...k,
        [o]: String(m[o])
      })), m[o] !== t[o] && s(m);
    };
    return e.jsxs("div", {
      className: "mt-3 space-y-3 rounded-md border border-gray-200 bg-white px-3 py-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx("p", {
              className: "text-xs font-semibold text-gray-800 dark:text-odp-fgStrong",
              children: "\uB77C\uC774\uBE0C \uC2A4\uCE94 \uC81C\uD55C (\uC6F9 \uD3F4\uBC31)"
            }),
            e.jsxs("p", {
              className: "mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted",
              children: [
                "Lucivy\uB97C \uC4F8 \uC218 \uC5C6\uC744 \uB54C(COOP/COEP \uC5C6\uC74C\xB7\uC0C9\uC778 \uC5C6\uC74C) \uC801\uC6A9\uB429\uB2C8\uB2E4. \uAC12\uC744 \uC62C\uB9AC\uBA74 \uB354 \uB9CE\uC774 \uC77D\uC9C0\uB9CC \uB290\uB824\uC9C8 \uC218 \uC788\uC2B5\uB2C8\uB2E4. -1\uC740 \uC81C\uD55C \uC5C6\uC74C. \uAE30\uBCF8:",
                " ",
                St.maxFiles,
                " /",
                " ",
                St.maxChatDays,
                " / ",
                St.maxHits,
                "."
              ]
            })
          ]
        }),
        e.jsx("div", {
          className: "grid gap-3 sm:grid-cols-3",
          children: Co.map(({ key: o, label: c, hint: p }) => {
            const m = js[o], k = t[o] === ks;
            return e.jsxs("div", {
              children: [
                e.jsxs("label", {
                  className: "mb-1 block text-[11px] font-semibold text-gray-600 dark:text-odp-muted",
                  children: [
                    c,
                    e.jsxs("span", {
                      className: "ml-1 font-normal text-gray-400 dark:text-odp-muted",
                      children: [
                        "(",
                        m.min,
                        "\u2013",
                        m.max,
                        ", -1=\uBB34\uC81C\uD55C)"
                      ]
                    })
                  ]
                }),
                e.jsx("input", {
                  type: "number",
                  inputMode: "numeric",
                  value: d[o],
                  disabled: r,
                  "aria-label": c,
                  onChange: (x) => {
                    l((f) => ({
                      ...f,
                      [o]: x.target.value
                    }));
                  },
                  onBlur: (x) => {
                    i(o, x.target.value);
                  },
                  onKeyDown: (x) => {
                    x.key === "Enter" && x.currentTarget.blur();
                  },
                  className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft disabled:opacity-50"
                }),
                e.jsxs("p", {
                  className: "mt-1 text-[10px] text-gray-500 dark:text-odp-muted",
                  children: [
                    p,
                    k ? " \xB7 \uD604\uC7AC \uBB34\uC81C\uD55C" : ""
                  ]
                })
              ]
            }, o);
          })
        })
      ]
    });
  }
  function Yr(t) {
    return (t == null ? void 0 : t.length) ? t.filter((r) => r.type !== "folder" || !r.path ? false : !Fe(r.path)).map((r) => ({
      ...r,
      children: Yr(r.children)
    })) : [];
  }
  function qr({ node: t, level: r, onSelect: s, selectedPath: d, excludedFolders: l }) {
    const [i, o] = a.useState(r < 2);
    if (t.type !== "folder" || !t.path || Fe(t.path)) return null;
    const c = Cs(t.path), p = d === c, m = Es(c, l), k = `${r * 12 + 8}px`, x = Yr(t.children);
    return e.jsxs("div", {
      children: [
        e.jsx("div", {
          className: `flex items-center justify-between py-1 pr-2 text-sm ${p ? "bg-blue-50 text-blue-700 dark:bg-odp-line dark:text-odp-fgStrong" : "text-gray-700 dark:text-odp-fg"} ${m ? "opacity-40" : "hover:bg-gray-100 dark:hover:bg-odp-bgSoft"}`,
          style: {
            paddingLeft: k
          },
          children: e.jsxs("div", {
            className: "flex min-w-0 items-center gap-1.5",
            children: [
              e.jsx("button", {
                type: "button",
                className: "flex w-4 shrink-0 justify-center text-gray-400 dark:text-gray-500",
                "aria-label": i ? "\uC811\uAE30" : "\uD3BC\uCE58\uAE30",
                onClick: () => o((f) => !f),
                children: i ? "\u25BE" : "\u25B8"
              }),
              e.jsxs("button", {
                type: "button",
                disabled: m,
                onClick: () => s(c),
                className: "flex min-w-0 items-center gap-1 text-left disabled:cursor-not-allowed",
                children: [
                  e.jsx("span", {
                    className: "shrink-0 text-gray-500 dark:text-gray-300",
                    children: e.jsx(st, {
                      size: 14
                    })
                  }),
                  e.jsx("span", {
                    className: "truncate",
                    children: t.name || c || "/"
                  })
                ]
              })
            ]
          })
        }),
        i && x.map((f) => e.jsx(qr, {
          node: f,
          level: r + 1,
          onSelect: s,
          selectedPath: d,
          excludedFolders: l
        }, f.path))
      ]
    });
  }
  function Oo({ folders: t, disabled: r = false, onChange: s, onRequestTree: d, canRequestTree: l = true }) {
    const [i, o] = a.useState(false), [c, p] = a.useState(null), [m, k] = a.useState(false), [x, f] = a.useState(null), [b, u] = a.useState(null);
    a.useEffect(() => {
      i || (u(null), f(null));
    }, [
      i
    ]);
    const h = a.useCallback(async () => {
      if (!(r || typeof d != "function")) {
        o(true), k(true), f(null);
        try {
          const v = await d();
          p(Array.isArray(v) ? v : []);
        } catch (v) {
          p(null), f(v instanceof Error ? v.message : String(v));
        } finally {
          k(false);
        }
      }
    }, [
      r,
      d
    ]), E = () => {
      b && (s(ws(t, b)), o(false));
    };
    return e.jsxs("div", {
      className: "mt-3 space-y-2 rounded-md border border-gray-200 bg-white px-3 py-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx("p", {
              className: "text-xs font-semibold text-gray-800 dark:text-odp-fgStrong",
              children: "\uC5ED\uC0C9\uC778 \uC81C\uC678 \uD3F4\uB354"
            }),
            e.jsx("p", {
              className: "mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted",
              children: "\uC120\uD0DD\uD55C \uD3F4\uB354\uC640 \uADF8 \uD558\uC704 \uD3F4\uB354\xB7\uD30C\uC77C\uC740 \uC5ED\uC0C9\uC778\xB7Live Scan \uBCF8\uBB38 \uAC80\uC0C9\uC5D0\uC11C \uBE60\uC9D1\uB2C8\uB2E4. \uD30C\uC77C\uBA85 \uAC80\uC0C9\uC740 \uADF8\uB300\uB85C\uC785\uB2C8\uB2E4. \uBCC0\uACBD \uD6C4 \u300C\uB2E4\uC2DC \uC0C9\uC778\u300D\uC774 \uD544\uC694\uD569\uB2C8\uB2E4."
            })
          ]
        }),
        t.length === 0 ? e.jsx("p", {
          className: "text-[11px] text-gray-500 dark:text-odp-muted",
          children: "\uC81C\uC678\uB41C \uD3F4\uB354 \uC5C6\uC74C"
        }) : e.jsx("ul", {
          className: "space-y-1",
          children: t.map((v) => e.jsxs("li", {
            className: "flex items-center gap-2 rounded border border-gray-100 bg-gray-50 px-2 py-1.5 text-xs text-gray-800 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg",
            children: [
              e.jsx(st, {
                size: 14,
                className: "shrink-0 text-gray-500"
              }),
              e.jsxs("span", {
                className: "min-w-0 flex-1 truncate font-mono",
                children: [
                  v,
                  "/"
                ]
              }),
              e.jsx("button", {
                type: "button",
                disabled: r,
                "aria-label": `${v} \uC81C\uC678 \uD574\uC81C`,
                onClick: () => s(Ss(t, v)),
                className: "rounded p-0.5 text-gray-500 hover:bg-gray-200 hover:text-gray-800 disabled:opacity-50 dark:hover:bg-odp-bgSoft dark:hover:text-odp-fgStrong",
                children: e.jsx(Rt, {
                  size: 14
                })
              })
            ]
          }, v))
        }),
        e.jsx("button", {
          type: "button",
          disabled: r || !l || typeof d != "function",
          onClick: () => {
            h();
          },
          className: "rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft",
          children: "\uD3F4\uB354 \uCD94\uAC00\u2026"
        }),
        e.jsx(Ns, {
          isOpen: i,
          onClose: () => o(false),
          contentClassName: "max-w-lg max-h-[90vh]",
          children: e.jsxs("div", {
            className: "space-y-3 p-4",
            children: [
              e.jsx("h3", {
                className: "text-sm font-semibold text-gray-900 dark:text-odp-fgStrong",
                children: "\uC5ED\uC0C9\uC778 \uC81C\uC678 \uD3F4\uB354 \uC120\uD0DD"
              }),
              e.jsx("p", {
                className: "text-xs text-gray-600 dark:text-odp-muted",
                children: "\uD3F4\uB354\uB97C \uACE0\uB974\uBA74 \uD558\uC704 \uACBD\uB85C\uB3C4 \uBAA8\uB450 \uC81C\uC678\uB429\uB2C8\uB2E4. \uC774\uBBF8 \uC81C\uC678\uB41C \uD3F4\uB354\uB294 \uC120\uD0DD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."
              }),
              m ? e.jsx("p", {
                className: "text-xs text-gray-500",
                children: "\uD3F4\uB354 \uD2B8\uB9AC \uBD88\uB7EC\uC624\uB294 \uC911\u2026"
              }) : x ? e.jsx("p", {
                className: "text-xs text-red-600 dark:text-red-400",
                children: x
              }) : e.jsxs("div", {
                className: "max-h-[min(50vh,360px)] overflow-auto rounded border border-gray-200 dark:border-odp-borderSoft",
                children: [
                  (c || []).filter((v) => v.type === "folder" && v.path && !Fe(v.path)).map((v) => e.jsx(qr, {
                    node: v,
                    level: 0,
                    onSelect: u,
                    selectedPath: b,
                    excludedFolders: t
                  }, v.path)),
                  (c || []).filter((v) => v.type === "folder" && v.path && !Fe(v.path)).length === 0 ? e.jsx("p", {
                    className: "p-3 text-xs text-gray-500",
                    children: "\uD45C\uC2DC\uD560 \uD3F4\uB354\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
                  }) : null
                ]
              }),
              e.jsxs("div", {
                className: "flex justify-end gap-2",
                children: [
                  e.jsx("button", {
                    type: "button",
                    onClick: () => o(false),
                    className: "rounded border border-gray-300 px-3 py-1.5 text-xs dark:border-odp-borderStrong",
                    children: "\uCDE8\uC18C"
                  }),
                  e.jsx("button", {
                    type: "button",
                    disabled: !b,
                    onClick: E,
                    className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50",
                    children: "\uCD94\uAC00"
                  })
                ]
              })
            ]
          })
        })
      ]
    });
  }
  function Ao({ value: t, disabled: r = false, onChange: s }) {
    const [d, l] = a.useState(String(t));
    a.useEffect(() => {
      l(String(t));
    }, [
      t
    ]);
    const i = (o) => {
      const c = Number.parseInt(o.trim(), 10), p = As(Number.isFinite(c) ? c : t);
      l(String(p)), p !== t && s(p);
    };
    return e.jsxs("div", {
      className: "mt-3 space-y-2 rounded-md border border-gray-200 bg-white px-3 py-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx("p", {
              className: "text-xs font-semibold text-gray-800 dark:text-odp-fgStrong",
              children: "\uCCB4\uD06C\uD3EC\uC778\uD2B8 \uC8FC\uAE30"
            }),
            e.jsxs("p", {
              className: "mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted",
              children: [
                "\uB2E4\uC2DC \uC0C9\uC778 \uC911 N\uAC1C \uD30C\uC77C(\uB610\uB294 \uCC44\uD305 day)\uB9C8\uB2E4 \uC911\uAC04 \uC800\uC7A5\uD569\uB2C8\uB2E4. \uC791\uC744\uC218\uB85D \uC911\uB2E8 \uC2DC \uC190\uC2E4\uC774 \uC801\uACE0, \uD074\uC218\uB85D \uC800\uC7A5 \uC624\uBC84\uD5E4\uB4DC\uAC00 \uC904\uC5B4\uB4ED\uB2C8\uB2E4. \uAE30\uBCF8 ",
                Os,
                "."
              ]
            })
          ]
        }),
        e.jsxs("div", {
          className: "max-w-[12rem]",
          children: [
            e.jsxs("label", {
              className: "mb-1 block text-[11px] font-semibold text-gray-600 dark:text-odp-muted",
              children: [
                "\uD30C\uC77C \uC218\uB9C8\uB2E4",
                e.jsxs("span", {
                  className: "ml-1 font-normal text-gray-400 dark:text-odp-muted",
                  children: [
                    "(",
                    qe.min,
                    "\u2013",
                    qe.max,
                    ")"
                  ]
                })
              ]
            }),
            e.jsx("input", {
              type: "number",
              inputMode: "numeric",
              min: qe.min,
              max: qe.max,
              value: d,
              disabled: r,
              "aria-label": "\uCCB4\uD06C\uD3EC\uC778\uD2B8 \uC8FC\uAE30",
              onChange: (o) => {
                l(o.target.value);
              },
              onBlur: (o) => {
                i(o.target.value);
              },
              onKeyDown: (o) => {
                o.key === "Enter" && o.currentTarget.blur();
              },
              className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft disabled:opacity-50"
            })
          ]
        })
      ]
    });
  }
  function To(t, r, s = "") {
    const [d, l] = a.useState(s);
    return a.useEffect(() => {
      const i = t.current;
      if (!i || r.length === 0) return;
      const o = r.map((p) => document.getElementById(p)).filter((p) => !!p);
      if (o.length === 0) return;
      const c = new IntersectionObserver((p) => {
        var _a2;
        const k = (_a2 = p.filter((x) => x.isIntersecting).sort((x, f) => f.intersectionRatio - x.intersectionRatio)[0]) == null ? void 0 : _a2.target;
        (k == null ? void 0 : k.id) && l(k.id);
      }, {
        root: i,
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
      for (const p of o) c.observe(p);
      return () => c.disconnect();
    }, [
      t,
      r,
      s
    ]), d;
  }
  function Io(t, r) {
    const s = t.getBoundingClientRect(), d = r.getBoundingClientRect();
    return s.top - d.top + r.scrollTop;
  }
  function Po(t, r, s) {
    const d = "smooth", l = Number.parseFloat(getComputedStyle(r).scrollMarginTop || "0") || 0, i = Io(r, t) - l;
    t.scrollTo({
      top: Math.max(0, i),
      behavior: d
    });
  }
  function At(t, r, s) {
    return r ? t ? (Po(t, r), true) : (r.scrollIntoView({
      block: "start",
      behavior: "smooth"
    }), true) : false;
  }
  Ho = function({ s3Creds: t, masterPassword: r, onSaveS3Creds: s, onExportCreds: d, onImportClick: l, showHiddenFolders: i, onToggleHiddenFolders: o, showTrashFolder: c = false, onToggleTrashFolder: p, hideRecordingCompanions: m = false, onToggleHideRecordingCompanions: k, treeStickyFolderPathEnabled: x = true, onToggleTreeStickyFolderPath: f, showTreeModifiedDate: b = false, onToggleShowTreeModifiedDate: u, treeHoverExpandSettings: h = Js, onTreeHoverExpandSettingsChange: E, onRequestClose: v, webauthnSupported: g = false, webauthnEnabled: T = false, webauthnStorageOnly: j = false, onEnableWebAuthn: A, onDisableWebAuthn: N, snippetConfig: _, onChangeSnippetConfig: D, onSaveSnippetConfig: F, isSavingSnippets: B = false, snippetConfigLoaded: Z = false, editorType: R, onEditorTypeChange: $, storageMode: K = le, onStorageModeChange: z, localFolderName: Ee = "", localVaultFsPath: xe = "", onOpenLocalFolder: ee, webdavConfig: w, onSaveWebdavConfig: V, isMobileLayout: X = false, sidebarOpen: Oe = true, sidebarCollapsed: ze = false, onOpenSidebar: ie, onCheckAppUpdate: re, isCheckingAppUpdate: Me = false, latestAppBuildId: Be = "", onScanStorageUsage: ye, canScanStorageUsage: ae = false, onOpenStorageUsageFile: it, onReadUnusedImageText: ct, onReadUnusedImageBytes: $e, onDeleteUnusedImagePaths: xt }) {
    const [Y, te] = a.useState(t), [ue, y] = a.useState(""), [C, I] = a.useState(w ?? {
      endpoint: "",
      username: "",
      password: "",
      basePath: ""
    }), [L, M] = a.useState(false), [U, H] = a.useState(g), [q, Ke] = a.useState(() => Ts()), [We, Jr] = a.useState(() => Is()), [Ae, Qr] = a.useState(() => Ps()), [Mt, Bt] = a.useState(() => kr()), [Ve, Zr] = a.useState(() => Ls()), [He, ea] = a.useState(() => _s()), O = Hr(), [Ue, ta] = a.useState(() => Fs()), [ra, $t] = a.useState(() => jr()), [Kt, J] = a.useState(false), [aa, Ge] = a.useState(false), [sa, Xe] = a.useState(null), [na, ut] = a.useState(false), [oa, bt] = a.useState(true), [Wt, pt] = a.useState(() => K === me), [Vt, gt] = a.useState(false), [da, mt] = a.useState(true), [se, Ht] = a.useState(() => Ds(true)), Te = a.useRef(null), Ie = ua(), Ut = ba(), ke = Tt(), Gt = String(xe || "").trim(), la = String(Ee || "").trim() || Rs() || "", ht = ke && Gt ? Gt : la, Xt = ke || typeof window < "u" && "showDirectoryPicker" in window;
    a.useEffect(() => Re((n, S) => {
      n === "settings-alt-vim" ? Jr(S) : n === "settings-workspace-tabs" ? Qr(S) : n === "settings-composer-helper" ? Zr(S) : n === "settings-composer-autocomplete" ? ea(S) : n === "settings-as-animation" && ta(S);
    }), []), a.useEffect(() => {
      const n = (S) => {
        var _a2;
        const G = ((_a2 = S == null ? void 0 : S.detail) == null ? void 0 : _a2.mode) ?? jr();
        $t(G);
      };
      return window.addEventListener(vr, n), () => {
        window.removeEventListener(vr, n);
      };
    }, []), a.useEffect(() => {
      const n = (S) => {
        var _a2;
        const G = ((_a2 = S == null ? void 0 : S.detail) == null ? void 0 : _a2.mode) ?? kr();
        Bt(G);
      };
      return window.addEventListener(Sr, n), () => {
        window.removeEventListener(Sr, n);
      };
    }, []), a.useEffect(() => {
      const n = String(Ie.hash || "").replace(/^#/, "");
      if (!n.startsWith("settings-")) return;
      n === "settings-s3" && bt(true), n === "settings-webdav" && gt(true), n === "settings-local" && pt(true), n === "settings-imgbb" && mt(true), (n === "settings-mlx-vlm" || n === "settings-llama-cpp") && Nt(n), n === "settings-workspace-pane-soft-cap" && window.setTimeout(() => zs(), 100);
      const S = Nr(n);
      S && Ht((Le) => ({
        ...Le,
        [S]: true
      }));
      const G = wr(n), je = n === "settings-mlx-vlm" || n === "settings-llama-cpp" ? 220 : 80, be = window.setTimeout(() => {
        var _a2;
        const Le = document.getElementById(G);
        if (Le) {
          At(Te.current, Le);
          try {
            (_a2 = Le.focus) == null ? void 0 : _a2.call(Le, {
              preventScroll: true
            });
          } catch {
          }
        }
      }, je);
      return () => window.clearTimeout(be);
    }, [
      Ie.hash,
      Ie.pathname
    ]), a.useEffect(() => {
      O.building || J(false);
    }, [
      O.building
    ]), a.useEffect(() => {
      P.isEnabled() && P.ensureManifestSummary();
    }, []), a.useEffect(() => {
      te({
        ...t,
        llmProviderProfiles: Je(t)
      }), y("");
    }, [
      t
    ]);
    const ft = !!((t == null ? void 0 : t.imgbbApiKey) || "").trim(), Pe = (n) => {
      const S = n !== void 0 ? n : Je(Y), G = rn(S), be = ue.trim() || (ft ? t.imgbbApiKey : "");
      return {
        ...Y,
        llmProviderProfiles: S,
        ...G,
        imgbbApiKey: be
      };
    };
    a.useEffect(() => {
      I(w ?? {
        endpoint: "",
        username: "",
        password: "",
        basePath: ""
      });
    }, [
      w
    ]), a.useEffect(() => {
      let n = false;
      return Ms().then((S) => {
        n || H(S);
      }), () => {
        n = true;
      };
    }, []);
    const yt = U && (r || j), Yt = a.useMemo(() => ({
      isDesktopApp: ke,
      showWebAuthnSection: yt,
      canScanStorageUsage: ae
    }), [
      ke,
      yt,
      ae
    ]), kt = a.useMemo(() => Bs(Yt), [
      Yt
    ]), qt = a.useMemo(() => kt.flatMap((n) => n.sections.map((S) => S.id)), [
      kt
    ]), ia = To(Te, qt, qt[0] || ""), Q = a.useCallback((n, S) => {
      n && Ht((G) => ({
        ...G,
        [n]: S
      }));
    }, []), ca = a.useCallback((n) => {
      const S = Nr(n);
      Q(S, true), n === "settings-s3" && bt(true), n === "settings-webdav" && gt(true), n === "settings-local" && pt(true), n === "settings-imgbb" && mt(true), (n === "settings-mlx-vlm" || n === "settings-llama-cpp") && Nt(n);
      const G = wr(n);
      Ut({
        pathname: Ie.pathname,
        hash: `#${n}`
      }, {
        replace: true
      });
      const je = n === "settings-mlx-vlm" || n === "settings-llama-cpp" ? 220 : 120;
      window.setTimeout(() => {
        var _a2;
        const be = document.getElementById(G);
        if (be) {
          At(Te.current, be);
          try {
            (_a2 = be.focus) == null ? void 0 : _a2.call(be, {
              preventScroll: true
            });
          } catch {
          }
        }
      }, je);
    }, [
      Ie.pathname,
      Ut,
      Q
    ]), xa = !X && ze ? "md:pl-14" : "";
    return e.jsxs("div", {
      className: "flex min-h-0 min-w-0 max-h-full flex-1 flex-col overflow-hidden bg-white dark:bg-odp-bgSofter",
      children: [
        e.jsxs("div", {
          className: `px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-odp-surface flex justify-between items-center gap-3 bg-gray-50 dark:bg-odp-surface shrink-0 transition-[padding] duration-300 ease-in-out ${xa}`,
          children: [
            e.jsxs("div", {
              className: "flex min-w-0 flex-1 items-center gap-2",
              children: [
                X && !Oe && typeof ie == "function" && e.jsx("button", {
                  type: "button",
                  "aria-label": "\uC0AC\uC774\uB4DC\uBC14 \uC5F4\uAE30",
                  onClick: ie,
                  className: "inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
                  children: e.jsx($s, {
                    size: 22
                  })
                }),
                e.jsxs("h2", {
                  className: "font-bold text-gray-700 dark:text-odp-fgStrong flex min-w-0 items-center gap-2",
                  children: [
                    e.jsx(Ks, {}),
                    " \uC124\uC815 \uBC0F \uC554\uD638\uD654"
                  ]
                })
              ]
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => v == null ? void 0 : v(Pe()),
              className: "text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded transition",
              children: e.jsx(Rt, {
                size: 16
              })
            })
          ]
        }),
        e.jsxs("div", {
          className: "flex min-h-0 min-w-0 flex-1",
          children: [
            e.jsx("div", {
              ref: Te,
              className: "min-w-0 flex-1 overflow-y-auto p-6",
              children: e.jsxs("div", {
                className: "space-y-4",
                children: [
                  e.jsxs(ne, {
                    id: "storage-connection",
                    title: "\uC800\uC7A5\uC18C \uBC0F \uC5F0\uACB0",
                    open: se["storage-connection"] !== false,
                    onOpenChange: (n) => Q("storage-connection", n),
                    children: [
                      e.jsx(vo, {
                        s3Creds: t,
                        webdavConfig: w
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
                                    value: le,
                                    checked: K === le,
                                    onChange: () => z == null ? void 0 : z(le)
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
                                    value: me,
                                    checked: K === me,
                                    onChange: () => z == null ? void 0 : z(me)
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
                                    value: Ne,
                                    checked: K === Ne,
                                    onChange: () => z == null ? void 0 : z(Ne)
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
                      e.jsxs(pe, {
                        as: "form",
                        id: "settings-s3",
                        contentKey: "settings-s3-conn",
                        open: oa,
                        onOpenChange: bt,
                        tabIndex: -1,
                        onSubmit: (n) => {
                          n.preventDefault(), s(Pe());
                        },
                        className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsx(ge, {
                            children: "S3 \uC5F0\uACB0 \uC815\uBCF4"
                          }),
                          e.jsx(oe, {
                            children: e.jsxs(e.Fragment, {
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
                                          value: Y.accessKeyId,
                                          onChange: (n) => te((S) => ({
                                            ...S,
                                            accessKeyId: n.target.value
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
                                          value: Y.secretAccessKey,
                                          onChange: (n) => te((S) => ({
                                            ...S,
                                            secretAccessKey: n.target.value
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
                                          value: Y.region,
                                          onChange: (n) => te((S) => ({
                                            ...S,
                                            region: n.target.value
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
                                          value: Y.bucket,
                                          onChange: (n) => te((S) => ({
                                            ...S,
                                            bucket: n.target.value
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
                                          value: Y.endpoint || "",
                                          onChange: (n) => te((S) => ({
                                            ...S,
                                            endpoint: n.target.value
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
                                      onClick: () => v == null ? void 0 : v(Pe()),
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
                            })
                          })
                        ]
                      }),
                      e.jsxs(pe, {
                        as: "form",
                        id: "settings-webdav",
                        contentKey: "settings-webdav-conn",
                        open: Vt,
                        onOpenChange: gt,
                        tabIndex: -1,
                        onSubmit: (n) => {
                          n.preventDefault(), V == null ? void 0 : V(C);
                        },
                        className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsx(ge, {
                            trailing: Vt ? null : e.jsx("span", {
                              className: "ml-auto text-[11px] font-normal text-gray-400 dark:text-odp-muted",
                              children: "\uC811\uD798"
                            }),
                            children: "WebDAV \uC5F0\uACB0 \uC815\uBCF4"
                          }),
                          e.jsx(oe, {
                            children: e.jsxs(e.Fragment, {
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
                                          value: C.endpoint,
                                          onChange: (n) => I((S) => ({
                                            ...S,
                                            endpoint: n.target.value
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
                                          value: C.username,
                                          onChange: (n) => I((S) => ({
                                            ...S,
                                            username: n.target.value
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
                                          value: C.password,
                                          onChange: (n) => I((S) => ({
                                            ...S,
                                            password: n.target.value
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
                                          value: C.basePath,
                                          onChange: (n) => I((S) => ({
                                            ...S,
                                            basePath: n.target.value
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
                                          const { createWebdavBackend: n } = await Rr(async () => {
                                            const { createWebdavBackend: G } = await import("./index-bQvC9Gon.js").then(async (m2) => {
                                              await m2.__tla;
                                              return m2;
                                            }).then((je) => je.jA);
                                            return {
                                              createWebdavBackend: G
                                            };
                                          }, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])), S = n(C);
                                          if (!S.isReady()) {
                                            alert("Endpoint\uC640 Username\uC744 \uC785\uB825\uD558\uC138\uC694.");
                                            return;
                                          }
                                          await S.testConnection(), alert("WebDAV \uC5F0\uACB0\uC5D0 \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4.");
                                        } catch (n) {
                                          alert("WebDAV \uC5F0\uACB0 \uC2E4\uD328: " + ((n == null ? void 0 : n.message) || n) + `

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
                            })
                          })
                        ]
                      }),
                      e.jsxs(pe, {
                        id: "settings-local",
                        contentKey: "settings-local-conn",
                        open: Wt,
                        onOpenChange: pt,
                        tabIndex: -1,
                        className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsx(ge, {
                            trailing: Wt ? null : e.jsx("span", {
                              className: "ml-auto text-[11px] font-normal text-gray-400 dark:text-odp-muted",
                              children: "\uC811\uD798"
                            }),
                            children: "Local \uC5F0\uACB0 \uC815\uBCF4"
                          }),
                          e.jsx(oe, {
                            children: e.jsxs(e.Fragment, {
                              children: [
                                e.jsx("p", {
                                  className: "text-xs text-gray-600 dark:text-odp-muted",
                                  children: ke ? "Local Haim\uC740 OS \uD3F4\uB354 \uC120\uD0DD \uB300\uD654\uC0C1\uC790\uB85C vault \uB8E8\uD2B8\uB97C \uC9C0\uC815\uD569\uB2C8\uB2E4. \uC120\uD0DD\uD55C \uD3F4\uB354\uC758 \uC804\uCCB4 \uACBD\uB85C\uAC00 \uC800\uC7A5\uB418\uBA70, \uC571\uC744 \uB2E4\uC2DC \uC5F4\uBA74 \uAC19\uC740 \uC704\uCE58\uB97C \uBCF5\uC6D0\uD569\uB2C8\uB2E4." : "Local Haim\uC740 \uBE0C\uB77C\uC6B0\uC800 File System Access API\uB85C \uC5F0 \uD3F4\uB354\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uBCF4\uC548\uC0C1 OS \uC804\uCCB4 \uACBD\uB85C\uB294 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC73C\uBA70, \uD3F4\uB354 \uC774\uB984\uC73C\uB85C \uC5F4\uB9B0 \uC704\uCE58\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
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
                                      value: ht || "(\uD3F4\uB354\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC74C)",
                                      "aria-label": ke ? "\uD604\uC7AC \uC5F4\uB9B0 \uB85C\uCEEC \uD3F4\uB354 \uACBD\uB85C" : "\uD604\uC7AC \uC5F4\uB9B0 \uB85C\uCEEC \uD3F4\uB354 \uC774\uB984"
                                    })
                                  ]
                                }),
                                Xt ? null : e.jsx("p", {
                                  className: "text-xs text-amber-700 dark:text-amber-300",
                                  children: "\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uD3F4\uB354 \uC120\uD0DD\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Chromium \uACC4\uC5F4 \uBE0C\uB77C\uC6B0\uC800\uB97C \uC0AC\uC6A9\uD574 \uC8FC\uC138\uC694."
                                }),
                                e.jsx("div", {
                                  className: "flex justify-end gap-2 pt-2",
                                  children: e.jsxs("button", {
                                    type: "button",
                                    disabled: !Xt || typeof ee != "function",
                                    onClick: () => ee == null ? void 0 : ee(),
                                    className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                                    children: [
                                      e.jsx(st, {
                                        size: 16
                                      }),
                                      ht ? "\uB2E4\uB978 \uD3F4\uB354 \uC5F4\uAE30" : "\uD3F4\uB354 \uC120\uD0DD"
                                    ]
                                  })
                                })
                              ]
                            })
                          })
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
                                  e.jsx(Pt, {}),
                                  " S3 \uC5F0\uACB0\uC815\uBCF4 \uB0B4\uBCF4\uB0B4\uAE30"
                                ]
                              }),
                              e.jsxs("button", {
                                onClick: l,
                                className: "flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded transition",
                                children: [
                                  e.jsx(Ws, {}),
                                  " S3 \uC5F0\uACB0\uC815\uBCF4 \uBD88\uB7EC\uC624\uAE30"
                                ]
                              })
                            ]
                          })
                        ]
                      }),
                      yt && e.jsxs("div", {
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
                            children: j ? "S3 \uC5F0\uACB0 \uC815\uBCF4\uAC00 \uBCF4\uC548 \uD0A4\uB85C\uB9CC \uC554\uD638\uD654\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0 \uC2DC\uC5D0\uB294 \uBE44\uBC00\uBC88\uD638\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4." : "\uC9C0\uBB38, Windows Hello, Touch ID \uB4F1\uC73C\uB85C \uC571 \uC7A0\uAE08 \uD574\uC81C\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0 \uC2DC\uC5D0\uB294 \uBE44\uBC00\uBC88\uD638\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
                          }),
                          j ? e.jsx("p", {
                            className: "text-xs text-gray-600 dark:text-odp-muted",
                            children: "\uC800\uC7A5\uC18C: \uBCF4\uC548 \uD0A4\uB85C \uBCF4\uD638\uB428"
                          }) : T ? e.jsxs("div", {
                            className: "flex items-center gap-2 flex-wrap",
                            children: [
                              e.jsx("span", {
                                className: "text-xs text-gray-700 dark:text-odp-fg",
                                children: "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uC0AC\uC6A9 \uC911"
                              }),
                              e.jsx("button", {
                                type: "button",
                                onClick: () => N == null ? void 0 : N(),
                                className: "text-xs text-red-600 dark:text-red-400 hover:underline",
                                children: "\uC0AC\uC6A9 \uD574\uC81C"
                              })
                            ]
                          }) : e.jsx("div", {
                            className: "flex flex-col gap-2",
                            children: e.jsx("button", {
                              type: "button",
                              disabled: L,
                              onClick: async () => {
                                if (L || !A) return;
                                let n;
                                try {
                                  n = A(r);
                                } catch (S) {
                                  alert((S == null ? void 0 : S.message) || "\uBCF4\uC548 \uD0A4 \uB4F1\uB85D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
                                  return;
                                }
                                M(true);
                                try {
                                  await n;
                                } catch (S) {
                                  alert((S == null ? void 0 : S.message) || "\uBCF4\uC548 \uD0A4 \uB4F1\uB85D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
                                } finally {
                                  M(false);
                                }
                              },
                              className: "text-left text-xs py-2 px-3 rounded border border-gray-300 dark:border-odp-borderStrong hover:bg-gray-100 dark:hover:bg-odp-surface transition",
                              "aria-label": "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uB4F1\uB85D",
                              children: L ? "\uB4F1\uB85D \uC911\u2026" : "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uC0AC\uC6A9 (\uB4F1\uB85D)"
                            })
                          })
                        ]
                      }),
                      ae && e.jsx("div", {
                        id: "settings-storage-usage",
                        tabIndex: -1,
                        className: "scroll-mt-4",
                        children: e.jsx(ao, {
                          storageMode: K,
                          onScanTree: ye,
                          canScan: ae,
                          onOpenFile: it
                        })
                      })
                    ]
                  }),
                  e.jsxs(ne, {
                    id: "ai",
                    title: "AI",
                    open: se.ai !== false,
                    onOpenChange: (n) => Q("ai", n),
                    children: [
                      e.jsx(Vs, {
                        profiles: Je(Y),
                        onSaveProfiles: (n) => {
                          te((S) => ({
                            ...S,
                            llmProviderProfiles: n
                          })), s(Pe(n));
                        }
                      }),
                      e.jsx(Hs, {}),
                      e.jsx(Us, {})
                    ]
                  }),
                  e.jsxs(ne, {
                    id: "integrations",
                    title: "\uC678\uBD80 \uC5F0\uB3D9",
                    open: se.integrations !== false,
                    onOpenChange: (n) => Q("integrations", n),
                    children: [
                      e.jsx(yo, {
                        storageMode: K,
                        canScan: ae,
                        onScanTree: ye,
                        onReadText: ct,
                        onReadBytes: $e,
                        onDeletePaths: xt
                      }),
                      e.jsxs(pe, {
                        as: "form",
                        id: "settings-imgbb",
                        contentKey: "settings-imgbb-conn",
                        open: da,
                        onOpenChange: mt,
                        tabIndex: -1,
                        onSubmit: (n) => {
                          if (n.preventDefault(), !ue.trim() && !ft) {
                            alert("API \uD0A4\uB97C \uC785\uB825\uD558\uC138\uC694.");
                            return;
                          }
                          s(Pe());
                        },
                        className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsx(ge, {
                            children: "ImgBB"
                          }),
                          e.jsx(oe, {
                            children: e.jsxs(e.Fragment, {
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
                                      value: ue,
                                      onChange: (n) => y(n.target.value),
                                      placeholder: ft ? "\uC800\uC7A5\uB428 \u2014 \uBCC0\uACBD \uC2DC \uC0C8 \uD0A4 \uC785\uB825" : "ImgBB API \uD0A4 \uC785\uB825"
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
                            })
                          })
                        ]
                      }),
                      e.jsx(Bn, {})
                    ]
                  }),
                  e.jsxs(ne, {
                    id: "editor-content",
                    title: "\uC5D0\uB514\uD130 \uBC0F \uCF58\uD150\uCE20",
                    open: se["editor-content"] !== false,
                    onOpenChange: (n) => Q("editor-content", n),
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
                          e.jsxs("p", {
                            className: "text-xs text-gray-600 dark:text-odp-muted mb-2",
                            children: [
                              ".md \uD30C\uC77C\uC740 ",
                              e.jsx("span", {
                                className: "font-semibold text-gray-700 dark:text-odp-fg",
                                children: "md-editor-rt"
                              }),
                              "\uB85C \uD3B8\uC9D1\uD569\uB2C8\uB2E4. \uBBF8\uB9AC\uBCF4\uAE30, \uC704\uD0A4 \uC774\uBBF8\uC9C0",
                              " ",
                              e.jsx("code", {
                                className: "px-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft",
                                children: "![[path]]"
                              }),
                              " /",
                              " ",
                              e.jsx("code", {
                                className: "px-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft",
                                children: "![[path|w=50%]]"
                              }),
                              ", \uC2A4\uB2C8\uD3AB \uB2E8\uCD95\uD0A4\uAC00 \uC774 \uAD6C\uC131\uC5D0 \uB9DE\uCDB0\uC838 \uC788\uC2B5\uB2C8\uB2E4."
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
                                children: Gs.map((n) => e.jsxs("label", {
                                  className: "flex items-start gap-2 cursor-pointer",
                                  children: [
                                    e.jsx("input", {
                                      type: "radio",
                                      name: "footnoteDisplayMode",
                                      value: n.value,
                                      checked: ra === n.value,
                                      onChange: () => {
                                        Xs(n.value), $t(n.value);
                                      },
                                      className: "mt-0.5 shrink-0"
                                    }),
                                    e.jsxs("span", {
                                      children: [
                                        e.jsx("span", {
                                          className: "font-semibold",
                                          children: n.label
                                        }),
                                        e.jsx("span", {
                                          className: "text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5",
                                          children: n.description
                                        })
                                      ]
                                    })
                                  ]
                                }, n.value))
                              })
                            ]
                          })
                        ]
                      }),
                      e.jsx("div", {
                        id: "settings-snippets",
                        tabIndex: -1,
                        className: "scroll-mt-4",
                        children: e.jsx(An, {
                          value: _,
                          onChange: D,
                          onSave: F,
                          isSaving: B,
                          isLoaded: Z
                        })
                      }),
                      e.jsx(Dn, {}),
                      e.jsx(Mn, {}),
                      e.jsx(Tn, {})
                    ]
                  }),
                  e.jsxs(ne, {
                    id: "search",
                    title: "\uAC80\uC0C9",
                    open: se.search !== false,
                    onOpenChange: (n) => Q("search", n),
                    children: [
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
                              "\uB85C Spotlight \uAC80\uC0C9\uC744 \uC5FD\uB2C8\uB2E4. \uBCF8\uBB38 \uAC80\uC0C9\xB7\uC0C9\uC778 \uC0DD\uC131\uC740 \uC544\uB798",
                              " ",
                              e.jsx("button", {
                                type: "button",
                                className: "underline decoration-dotted underline-offset-2 hover:text-gray-900 dark:hover:text-odp-fgStrong",
                                onClick: () => {
                                  Nt("settings-inverted-index");
                                  const n = document.getElementById("settings-inverted-index");
                                  n && At(Te.current, n);
                                },
                                children: "\uC5ED\uC0C9\uC778"
                              }),
                              " ",
                              "\uC139\uC158\uC5D0\uC11C \uC124\uC815\uD569\uB2C8\uB2E4."
                            ]
                          }),
                          e.jsxs("label", {
                            className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                            children: [
                              e.jsx("button", {
                                type: "button",
                                onClick: () => {
                                  W("settings-as-animation", !Ue);
                                },
                                className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${Ue ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                "aria-pressed": Ue,
                                "aria-label": "\uC5F4\uAE30/\uB2EB\uAE30 \uC560\uB2C8\uBA54\uC774\uC158",
                                children: e.jsx("span", {
                                  className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Ue ? "translate-x-4" : "translate-x-0.5"}`
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
                          })
                        ]
                      }),
                      e.jsxs("div", {
                        id: "settings-inverted-index",
                        tabIndex: -1,
                        className: "scroll-mt-4 space-y-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong",
                        children: [
                          e.jsxs("div", {
                            children: [
                              e.jsx("h3", {
                                className: "text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2",
                                children: "\uC5ED\uC0C9\uC778"
                              }),
                              e.jsxs("p", {
                                className: "text-xs text-gray-600 dark:text-odp-muted",
                                children: [
                                  "Spotlight \uBCF8\uBB38 \uAC80\uC0C9\uC6A9 Lucivy \uC5ED\uC0C9\uC778\uC785\uB2C8\uB2E4. \uBB38\uC11C\xB7\uCC44\uD305 \uC800\uC7A5 \uC2DC \uC99D\uBD84 \uC0C9\uC778\uD558\uACE0, \u300C\uC0C9\uC778\u300D\uC73C\uB85C \uBCFC\uD2B8 \uC804\uCCB4\uB97C \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uB9CC\uB4ED\uB2C8\uB2E4. \uC6F9\uC740 lucivy-wasm(COOP/COEP), Tauri \uC571\uC740 \uB124\uC774\uD2F0\uBE0C Lucivy\uB85C \uB3D9\uC791\uD558\uBA70 \uC778\uB371\uC2A4\uB294",
                                  " ",
                                  e.jsx("code", {
                                    className: "text-[11px]",
                                    children: ".advanced-search/"
                                  }),
                                  "(LUCE \uC2A4\uB0C5\uC0F7)\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4. Lucivy\uB97C \uC4F8 \uC218 \uC5C6\uC73C\uBA74 Live Scan \uD3F4\uBC31\uC774 \uC801\uC6A9\uB429\uB2C8\uB2E4."
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
                                  W("settings-as-index", !O.enabled);
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
                          e.jsxs("label", {
                            className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                            children: [
                              e.jsx("button", {
                                type: "button",
                                onClick: () => {
                                  W("settings-as-include-other", !O.includeOtherFiles);
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
                          e.jsx(Oo, {
                            folders: O.excludedFolders || [],
                            disabled: !O.enabled,
                            canRequestTree: ae,
                            onRequestTree: ye,
                            onChange: (n) => P.setExcludedFolders(n)
                          }),
                          e.jsx(Ao, {
                            value: O.checkpointEvery ?? 5,
                            disabled: !O.enabled,
                            onChange: (n) => P.setCheckpointEvery(n)
                          }),
                          e.jsx(Eo, {
                            limits: O.liveScanLimits,
                            disabled: !O.enabled,
                            onChange: (n) => P.setLiveScanLimits(n)
                          }),
                          e.jsxs("div", {
                            className: `rounded-md border px-3 py-2 text-xs ${O.building ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200" : O.hasIndex ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200" : "border-gray-200 bg-white text-gray-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-muted"}`,
                            children: [
                              lt(O) || Ft(O) ? e.jsxs(e.Fragment, {
                                children: [
                                  Ft(O) ? "\uC5ED\uC0C9\uC778 \uC800\uC7A5 \uC911" : "\uBC31\uADF8\uB77C\uC6B4\uB4DC \uC0C9\uC778 \uC911",
                                  typeof O.buildProgress == "number" ? ` \xB7 ${Math.round(O.buildProgress * 100)}%` : "\u2026"
                                ]
                              }) : O.isolationReady ? O.hasIndex || O.fileCount > 0 || O.chatCount > 0 ? e.jsxs(e.Fragment, {
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
                                children: O.contentSearchMode === "live" ? "\uAC80\uC0C9 \uACA9\uB9AC(COOP/COEP)\uAC00 \uC5C6\uC5B4 Lucivy \uC5ED\uC0C9\uC778\uC740 \uC4F8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. Spotlight\uB294 \uBCFC\uD2B8 \uD30C\uC77C\uC744 \uC9C1\uC811 \uC77D\uC5B4 \uBCF8\uBB38\uC744 \uAC80\uC0C9\uD569\uB2C8\uB2E4(\uB290\uB9B4 \uC218 \uC788\uC74C)." : "\uC6F9\uC5D0\uC11C\uB294 \uAC80\uC0C9 \uC5D4\uC9C4 \uACA9\uB9AC(COOP/COEP)\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD558\uAC70\uB098 SharedArrayBuffer\uB97C \uC9C0\uC6D0\uD558\uB294 \uD658\uACBD\uC5D0\uC11C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694. \uD30C\uC77C\uBA85\xB7\uBC14\uB85C\uAC00\uAE30\uB294 \uACC4\uC18D \uAC80\uC0C9\uB429\uB2C8\uB2E4. Tauri \uC571\uC740 \uB124\uC774\uD2F0\uBE0C \uC5ED\uC0C9\uC778\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
                              }),
                              O.lastError ? ` \xB7 \uC624\uB958: ${O.lastError}` : "",
                              O.hasCheckpoint && !O.building ? ` \xB7 \uC911\uC9C0\uB41C \uCCB4\uD06C\uD3EC\uC778\uD2B8 ${O.checkpointProcessedCount}\uAC1C` : ""
                            ]
                          }),
                          e.jsxs("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                              e.jsxs("button", {
                                type: "button",
                                disabled: !rt(O, Kt),
                                onClick: () => {
                                  (async () => {
                                    const n = await P.getRebuildCheckpointInfo();
                                    if (n) {
                                      Xe(n), Ge(true);
                                      return;
                                    }
                                    if (O.hasIndex) {
                                      ut(true);
                                      return;
                                    }
                                    J(true), P.rebuild({
                                      resume: false
                                    }).finally(() => J(false));
                                  })();
                                },
                                className: "inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                                children: [
                                  e.jsx(at, {
                                    size: 14
                                  }),
                                  Gr(O)
                                ]
                              }),
                              Ur(O) ? e.jsxs("button", {
                                type: "button",
                                onClick: () => P.cancelRebuild(),
                                className: "inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60",
                                title: "\uC0C9\uC778\uC744 \uC911\uC9C0\uD569\uB2C8\uB2E4. \uCCB4\uD06C\uD3EC\uC778\uD2B8\uB294 \uC720\uC9C0\uB418\uC5B4 \uC774\uC5B4\uC11C \uC7AC\uAC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                                children: [
                                  e.jsx(Cr, {
                                    size: 14
                                  }),
                                  "\uC911\uC9C0"
                                ]
                              }) : O.building ? e.jsxs("button", {
                                type: "button",
                                disabled: true,
                                className: "inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900 opacity-50 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200",
                                title: "\uC0C9\uC778\uC774 \uC644\uB8CC\uB418\uC5B4 \uC800\uC7A5 \uC911\uC785\uB2C8\uB2E4.",
                                children: [
                                  e.jsx(Cr, {
                                    size: 14
                                  }),
                                  "\uC911\uC9C0"
                                ]
                              }) : null,
                              e.jsx("button", {
                                type: "button",
                                disabled: Kt || O.building || !O.hasIndex,
                                onClick: () => {
                                  window.confirm("\uC5ED\uC0C9\uC778 \uCE90\uC2DC(.advanced-search/)\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694? \uC0AD\uC81C \uD6C4\uC5D0\uB294 \u300C\uC0C9\uC778\u300D\uC73C\uB85C \uB2E4\uC2DC \uC0DD\uC131\uD574\uC57C \uD569\uB2C8\uB2E4.") && (J(true), P.clearCache().finally(() => J(false)));
                                },
                                className: "inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:bg-odp-bgSoft dark:text-red-300 dark:hover:bg-red-950/30",
                                children: "\uC5ED\uC0C9\uC778 \uCE90\uC2DC \uC0AD\uC81C"
                              })
                            ]
                          }),
                          e.jsx(Vr, {
                            isOpen: aa,
                            info: sa,
                            onCancel: () => {
                              Ge(false), Xe(null);
                            },
                            onResume: () => {
                              Ge(false), Xe(null), J(true), P.rebuild({
                                resume: true
                              }).finally(() => J(false));
                            },
                            onStartFresh: () => {
                              Ge(false), Xe(null), J(true), P.rebuild({
                                resume: false
                              }).finally(() => J(false));
                            }
                          }),
                          e.jsx(Ce, {
                            isOpen: na,
                            title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
                            message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
                            confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
                            cancelLabel: "\uCDE8\uC18C",
                            onConfirm: () => {
                              ut(false), J(true), P.rebuild({
                                resume: false
                              }).finally(() => J(false));
                            },
                            onCancel: () => ut(false)
                          }),
                          e.jsx(Wr, {}),
                          e.jsx(go, {
                            embedded: true,
                            storageMode: K,
                            onScanTree: ye,
                            canScan: ae
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsxs(ne, {
                    id: "ui-navigation",
                    title: "UI \uBC0F \uB124\uBE44\uAC8C\uC774\uC158",
                    open: se["ui-navigation"] !== false,
                    onOpenChange: (n) => Q("ui-navigation", n),
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
                                      W("settings-alt-vim", !We);
                                    },
                                    className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${We ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                    "aria-pressed": We,
                                    "aria-label": "Alt+Vim \uCEE4\uC11C \uC774\uB3D9",
                                    children: e.jsx("span", {
                                      className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${We ? "translate-x-4" : "translate-x-0.5"}`
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
                                      W("settings-workspace-tabs", !Ae);
                                    },
                                    className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Ae ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                    "aria-pressed": Ae,
                                    "aria-label": "\uD0ED \uAE30\uB2A5",
                                    children: e.jsx("span", {
                                      className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Ae ? "translate-x-4" : "translate-x-0.5"}`
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
                              e.jsx(oe, {
                                open: Ae,
                                contentKey: "settings-workspace-tabs-autosave",
                                children: e.jsxs("div", {
                                  className: "pl-12 space-y-2",
                                  children: [
                                    e.jsx("p", {
                                      className: "text-xs font-medium text-gray-700 dark:text-odp-fg",
                                      children: "\uD0ED \uC790\uB3D9 \uC800\uC7A5 \uC124\uC815"
                                    }),
                                    e.jsx(we, {
                                      className: "flex flex-col gap-2",
                                      value: Mt,
                                      onValueChange: (n) => {
                                        n !== "off" && n !== "onFocusChange" && n !== "onWindowChange" || (qs(n), Bt(n));
                                      },
                                      "aria-label": "\uD0ED \uC790\uB3D9 \uC800\uC7A5",
                                      children: Ys.map((n) => {
                                        const S = Mt === n.value;
                                        return e.jsx(fe, {
                                          value: n.value,
                                          className: [
                                            "rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200 origin-left w-90",
                                            "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                                            S ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"
                                          ].join(" "),
                                          children: e.jsxs("div", {
                                            className: S ? "" : "opacity-50",
                                            children: [
                                              e.jsx("div", {
                                                className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong",
                                                children: n.label
                                              }),
                                              e.jsx("div", {
                                                className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
                                                children: n.description
                                              })
                                            ]
                                          })
                                        }, n.value);
                                      })
                                    }),
                                    e.jsx(Kn, {})
                                  ]
                                })
                              })
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
                          e.jsx(Ln, {}),
                          e.jsxs("label", {
                            className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                            children: [
                              e.jsx("button", {
                                type: "button",
                                onClick: p,
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
                                onClick: o,
                                className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${i ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                "aria-pressed": i,
                                "aria-label": "\uC228\uAE40 \uD3F4\uB354 \uBCF4\uAE30 \uD1A0\uAE00",
                                children: e.jsx("span", {
                                  className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${i ? "translate-x-4" : "translate-x-0.5"}`
                                })
                              }),
                              e.jsx("span", {
                                className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                                children: "\uC228\uAE40 \uD3F4\uB354 \uBCF4\uAE30 (\uC774\uB984\uC774 `.` \uC73C\uB85C \uC2DC\uC791\uD558\uB294 \uD3F4\uB354, `.trash` \uC81C\uC678)"
                              })
                            ]
                          }),
                          typeof k == "function" && e.jsxs("label", {
                            className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                            children: [
                              e.jsx("button", {
                                type: "button",
                                onClick: k,
                                className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${m ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                "aria-pressed": m,
                                "aria-label": "\uB179\uC74C\xB7\uD544\uAE30 \uB3D9\uBC18 \uD30C\uC77C \uC228\uAE30\uAE30",
                                children: e.jsx("span", {
                                  className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${m ? "translate-x-4" : "translate-x-0.5"}`
                                })
                              }),
                              e.jsx("span", {
                                className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                                children: "\uB179\uC74C\xB7\uD544\uAE30 \uB3D9\uAE30\uD654 \uD30C\uC77C \uC228\uAE30\uAE30 (\uC0AC\uC774\uB4DC\uBC14 \uBAA9\uB85D\xB7\uB179\uC74C UI\xB7\uB3D9\uAE30\uD654 \uBCF4\uAE30\uC5D0\uC11C \uC81C\uC678)"
                              })
                            ]
                          }),
                          typeof f == "function" && e.jsxs("label", {
                            className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                            children: [
                              e.jsx("button", {
                                type: "button",
                                onClick: f,
                                className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${x ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                "aria-pressed": x,
                                "aria-label": "\uD2B8\uB9AC \uD3F4\uB354 \uACBD\uB85C sticky \uD45C\uC2DC",
                                children: e.jsx("span", {
                                  className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${x ? "translate-x-4" : "translate-x-0.5"}`
                                })
                              }),
                              e.jsx("span", {
                                className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                                children: "\uD2B8\uB9AC\uC5D0\uC11C \uC5F4\uB9B0 \uD3F4\uB354 \uACBD\uB85C sticky \uD45C\uC2DC (\uC2A4\uD06C\uB864 \uC2DC \uD604\uC7AC \uACBD\uB85C \uACE0\uC815)"
                              })
                            ]
                          }),
                          typeof u == "function" && e.jsxs("label", {
                            className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                            children: [
                              e.jsx("button", {
                                type: "button",
                                onClick: u,
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
                          e.jsx(Fn, {}),
                          typeof E == "function" && e.jsxs("div", {
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
                                        onChange: (n) => {
                                          const S = Number(n.target.value);
                                          E({
                                            ...h,
                                            value: Number.isFinite(S) && S >= 0 ? S : 0
                                          });
                                        },
                                        className: "w-24 border border-gray-300 dark:border-odp-borderSoft rounded px-2 py-1.5 text-sm bg-white dark:bg-odp-bgSoft text-gray-800 dark:text-odp-fg",
                                        "aria-label": "\uD3F4\uB354 \uC790\uB3D9 \uD3BC\uCE68 \uB300\uAE30 \uC2DC\uAC04"
                                      })
                                    ]
                                  }),
                                  e.jsx("div", {
                                    className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg",
                                    children: e.jsxs(we, {
                                      className: "flex items-center gap-3",
                                      value: h.unit,
                                      onValueChange: (n) => {
                                        n !== "s" && n !== "ms" || h.unit !== n && E({
                                          unit: n,
                                          value: Qs(h.value, h.unit, n)
                                        });
                                      },
                                      "aria-label": "\uB300\uAE30 \uC2DC\uAC04 \uB2E8\uC704",
                                      children: [
                                        e.jsxs("label", {
                                          className: "flex items-center gap-1.5 cursor-pointer",
                                          children: [
                                            e.jsx(fe, {
                                              value: "s",
                                              className: "size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                                              children: e.jsx(_t, {
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
                                            e.jsx(fe, {
                                              value: "ms",
                                              className: "size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                                              children: e.jsx(_t, {
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
                                      Zs(h),
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
                                    value: Qe,
                                    checked: q === Qe,
                                    onChange: () => {
                                      Ke(Qe), Er(Qe);
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
                                    value: Ze,
                                    checked: q === Ze,
                                    onChange: () => {
                                      Ke(Ze), Er(Ze);
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
                  e.jsx(ne, {
                    id: "chat",
                    title: "\uCC44\uD305",
                    open: se.chat !== false,
                    onOpenChange: (n) => Q("chat", n),
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
                          children: "\uB098\uC640\uC758 \uCC44\uD305 \uC785\uB825\uCC3D \uD45C\uC2DC\xB7\uC790\uB3D9\uC644\uC131 \uC635\uC158\uC785\uB2C8\uB2E4."
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
                                    W("settings-composer-helper", !Ve);
                                  },
                                  className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Ve ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                  "aria-pressed": Ve,
                                  "aria-label": "\uC785\uB825\uCC3D \uB2E8\uCD95\uD0A4 \uC548\uB0B4 \uD45C\uC2DC",
                                  children: e.jsx("span", {
                                    className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Ve ? "translate-x-4" : "translate-x-0.5"}`
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
                            }),
                            e.jsxs("label", {
                              className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                              children: [
                                e.jsx("button", {
                                  type: "button",
                                  onClick: () => {
                                    W("settings-composer-autocomplete", !He);
                                  },
                                  className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${He ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                  "aria-pressed": He,
                                  "aria-label": "\uCC44\uD305 \uC785\uB825 \uC790\uB3D9\uC644\uC131",
                                  children: e.jsx("span", {
                                    className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${He ? "translate-x-4" : "translate-x-0.5"}`
                                  })
                                }),
                                e.jsxs("span", {
                                  className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                                  children: [
                                    "\uCC44\uD305 \uC785\uB825 \uC790\uB3D9\uC644\uC131",
                                    e.jsx("span", {
                                      className: "text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5",
                                      children: "\uB098\uC640\uC758 \uCC44\uD305 md-editor-rt \uC790\uB3D9\uC644\uC131 \uCD94\uCC9C\uC785\uB2C8\uB2E4. \uB178\uD2B8 \uD3B8\uC9D1\uAE30 \uC790\uB3D9\uC644\uC131\uACFC\uB294 \uBCC4\uB3C4\uB85C \uC800\uC7A5\uB429\uB2C8\uB2E4."
                                    })
                                  ]
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    })
                  }),
                  e.jsx(ne, {
                    id: "quiz",
                    title: "\uD034\uC988",
                    open: se.quiz !== false,
                    onOpenChange: (n) => Q("quiz", n),
                    children: e.jsx(en, {
                      llmProviderProfiles: Je(Y)
                    })
                  }),
                  e.jsxs(ne, {
                    id: "app",
                    title: "\uC571",
                    open: se.app !== false,
                    onOpenChange: (n) => Q("app", n),
                    children: [
                      e.jsx(wo, {}),
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
                                    children: tn() || "\uC54C \uC218 \uC5C6\uC74C"
                                  })
                                ]
                              }),
                              Be ? e.jsxs("div", {
                                className: "flex flex-wrap gap-x-2 gap-y-0.5",
                                children: [
                                  e.jsx("dt", {
                                    className: "shrink-0 font-semibold text-gray-700 dark:text-odp-fgStrong",
                                    children: "\uCD5C\uC2E0 \uBC84\uC804"
                                  }),
                                  e.jsx("dd", {
                                    className: "min-w-0 break-all font-mono",
                                    children: Be
                                  })
                                ]
                              }) : null
                            ]
                          }),
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => re == null ? void 0 : re(),
                            disabled: Me || typeof re != "function",
                            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-60",
                            children: [
                              e.jsx(at, {
                                size: 16
                              }),
                              Me ? "\uCD5C\uC2E0 \uBC84\uC804 \uD655\uC778 \uC911..." : "\uCD5C\uC2E0 \uBC84\uC804 \uD655\uC778 \uBC0F \uC989\uC2DC \uC5C5\uB370\uC774\uD2B8"
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            }),
            X ? null : e.jsx($n, {
              groups: kt,
              activeSectionId: ia,
              onNavigate: ca
            })
          ]
        })
      ]
    });
  };
});
export {
  __tla,
  Ho as default
};
