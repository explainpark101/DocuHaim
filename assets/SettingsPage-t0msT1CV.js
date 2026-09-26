const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DgMMigqL.js","assets/vendor-react-BwEIQNKH.js","assets/vendor-md-editor-pmGM35s5.js","assets/vendor-aws-DI8kybWK.js","assets/vendor-lucide-B-9DwWUo.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-CLW0brs2.js","assets/vendor-radix-krusovOJ.js","assets/vendor-google-genai-Bp0rxPXM.js","assets/index-BG-zNNFo.css"])))=>i.map(i=>d[i]);
import { _ as Br, __tla as __tla_0 } from "./vendor-md-editor-pmGM35s5.js";
import { r as s, j as e, f as ga, u as ma, __tla as __tla_1 } from "./vendor-react-BwEIQNKH.js";
import { aK as jt, aj as fa, aL as ha, aM as ya, aN as ka, at as Ce, aO as ja, aP as ce, aQ as Jt, aR as Qt, aS as Zt, aT as va, W as Sa, aU as at, aV as er, aW as Na, aX as tr, aY as rr, aZ as ar, a_ as Re, a$ as sr, b0 as wa, b1 as W, b2 as oe, b3 as Ca, b4 as Ea, b5 as Oa, b6 as Aa, b7 as Pa, ai as Ta, av as _a, as as Ia, b8 as Fa, b9 as nr, ba as or, bb as dr, bc as lr, bd as La, be as Da, bf as Ra, bg as za, bh as ir, bi as cr, bj as ge, bk as me, bl as Ye, bm as Ma, bn as Ba, bo as $a, bp as xr, bq as Ka, br as ur, bs as br, bt as pr, bu as gr, bv as mr, bw as Wa, bx as Va, by as fr, bz as hr, bA as Ha, bB as Ua, I as _, bC as Ga, Z as Xa, bD as le, S as fe, J as we, bE as Ya, bF as $r, bG as qa, bH as Ja, ah as Qa, bI as Za, bJ as Le, bK as es, bL as ts, bM as rs, aA as as, bN as ss, E as he, bO as yr, bP as ns, bQ as os, bR as ds, bS as ls, bT as is, bU as cs, bV as xs, bW as us, bX as Pt, bY as bs, bZ as ps, b_ as Tt, b$ as gs, c0 as ms, c1 as fs, c2 as kr, c3 as hs, c4 as ys, c5 as vt, c6 as ks, c7 as jr, c8 as js, c9 as vs, ca as Ss, cb as _t, cc as Ns, cd as st, ce as St, cf as ws, cg as Cs, ch as Es, ci as Os, a0 as As, cj as Ps, ck as Ts, cl as _s, cm as Is, cn as qe, co as Fs, cp as Ls, cq as Ds, cr as Rs, cs as vr, ct as zs, cu as Ms, cv as Bs, cw as Sr, cx as $s, cy as Ks, cz as Nr, cA as wr, cB as Nt, cC as Ws, cD as Cr, cE as Er, cF as Je, cG as Vs, cH as Hs, cI as Us, cJ as Gs, cK as Xs, cL as Ys, cM as qs, cN as Js, cO as Qs, cP as Zs, cQ as Or, cR as en, cS as tn, cT as rn, cU as an, cV as sn, cW as Qe, cX as Ar, cY as Ze, cZ as nn, c_ as on, c$ as dn, __tla as __tla_2 } from "./index-DgMMigqL.js";
import { y as ln, G as Dt, H as cn, x as It, T as xn, J as un, c as nt, X as Rt, K as bn, L as De, N as Pr, O as Kr, Q as Wr, V as pn } from "./vendor-lucide-B-9DwWUo.js";
import { d as gn, v as ye, w as xe, e as mn, f as fn, g as hn, h as yn, A as kn, S as ot, a as dt, D as jn, x as vn, y as Sn, z as Nn, B as wn, E as Cn, G as Ft } from "./vendor-radix-krusovOJ.js";
import { T as En } from "./TableStyleTemplateEditor-Me6mMqrX.js";
import { S as Tr } from "./SliderWithScrubInput-BDPuEK9X.js";
import "./vendor-aws-DI8kybWK.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-CLW0brs2.js";
import "./vendor-google-genai-Bp0rxPXM.js";
import "./index-T3CnG2ex.js";
let Jo;
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
    const a = r / 1024;
    return a < 1024 ? `${a.toFixed(1)} MB` : `${(a / 1024).toFixed(1)} GB`;
  }
  function On(t) {
    const r = String(t || "").toLowerCase(), a = r.lastIndexOf(".");
    return a <= 0 || a === r.length - 1 ? "(none)" : r.slice(a + 1);
  }
  function An(t) {
    const r = String(t || "").replace(/^\/+/, "");
    return r === jt || r === `${jt}/` || r.startsWith(`${jt}/`);
  }
  function Vr(t) {
    var _a2;
    if (t.type === "file") return typeof t.size == "number" && Number.isFinite(t.size) ? t.size : 0;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let r = 0;
    for (const a of t.children) r += Vr(a);
    return r;
  }
  function Hr(t) {
    var _a2;
    if (t.type === "file") return 1;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let r = 0;
    for (const a of t.children) r += Hr(a);
    return r;
  }
  function Pn(t) {
    const r = Array.isArray(t) ? t : [];
    let a = 0, o = 0, d = 0, i = 0, l = 0, c = 0, p = 0;
    const m = /* @__PURE__ */ new Map(), k = (u) => {
      var _a2;
      for (const f of u) {
        if (f.type === "folder") {
          o += 1, ((_a2 = f.children) == null ? void 0 : _a2.length) && k(f.children);
          continue;
        }
        if (f.type !== "file") continue;
        a += 1;
        const E = typeof f.size == "number" && Number.isFinite(f.size), v = E ? f.size : 0;
        E ? v === 0 && (d += 1) : i += 1, l += v;
        const g = f.path || f.name;
        An(g) && (c += v, p += 1);
        const P = On(f.name), j = m.get(P) ?? {
          count: 0,
          size: 0,
          files: []
        };
        j.count += 1, j.size += v, j.files.push({
          path: g,
          name: f.name,
          size: E ? v : null,
          node: f
        }), m.set(P, j);
      }
    };
    k(r);
    const x = [
      ...m.entries()
    ].map(([u, { count: f, size: E, files: v }]) => ({
      ext: u,
      label: u === "(none)" ? "(\uD655\uC7A5\uC790 \uC5C6\uC74C)" : `.${u}`,
      count: f,
      size: E,
      percent: l > 0 ? E / l * 100 : 0,
      files: [
        ...v
      ].sort((g, P) => (P.size ?? -1) - (g.size ?? -1) || g.path.localeCompare(P.path))
    })).sort((u, f) => f.size - u.size || f.count - u.count || u.label.localeCompare(f.label)), h = [], b = (u, f, E) => {
      var _a2;
      const v = u.filter((g) => g.type === "folder").map((g) => ({
        node: g,
        size: Vr(g),
        fileCount: Hr(g)
      })).sort((g, P) => P.size - g.size || g.node.name.localeCompare(P.node.name));
      for (const { node: g, size: P, fileCount: j } of v) {
        const A = g.path || `${g.name}/`, N = (g.children ?? []).some((F) => F.type === "folder");
        h.push({
          path: A,
          name: g.name,
          depth: f,
          parentPath: E,
          hasChildFolders: N,
          size: P,
          fileCount: j,
          percent: l > 0 ? P / l * 100 : 0
        }), ((_a2 = g.children) == null ? void 0 : _a2.length) && b(g.children, f + 1, A);
      }
    };
    return b(r, 0, null), {
      summary: {
        totalSize: l,
        fileCount: a,
        folderCount: o,
        zeroByteCount: d,
        unknownSizeCount: i,
        indexSize: c,
        indexFileCount: p
      },
      byExtension: x,
      folders: h
    };
  }
  function Tn(t) {
    return !t || typeof t != "string" ? "" : t.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
  }
  function _n(t) {
    const r = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), a = [];
    (r ? t.metaKey : t.ctrlKey) && a.push("mod"), t.altKey && a.push("alt"), t.shiftKey && a.push("shift");
    const o = (t.key || "").toLowerCase();
    return !o || o === "shift" || o === "control" || o === "alt" || o === "meta" || (a.push(o), a.length <= 1) ? null : a.join("+");
  }
  function wt(t) {
    if (!t || typeof t != "string") return "";
    const a = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "Cmd" : "Ctrl";
    return t.toLowerCase().replace(/\bmod\b/g, a).split("+").map((o) => o.trim().charAt(0).toUpperCase() + o.trim().slice(1)).join(" + ");
  }
  function In() {
    return {
      id: String(Date.now()) + "-" + Math.random().toString(36).slice(2),
      name: "",
      prefix: "",
      body: "",
      description: ""
    };
  }
  function Fn({ value: t, onChange: r, onSave: a, isSaving: o = false, isLoaded: d = true }) {
    const [i, l] = s.useState(() => t || {
      snippets: []
    }), [c, p] = s.useState(null), [m, k] = s.useState(null);
    s.useEffect(() => {
      l(t || {
        snippets: []
      });
    }, [
      t
    ]), s.useEffect(() => {
      if (!c) return;
      const j = (A) => {
        A.preventDefault(), A.stopPropagation();
        const N = _n(A);
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
      l(A), r == null ? void 0 : r(A);
    }, h = () => {
      x([
        ...i.snippets || [],
        In()
      ]);
    }, b = (j, A, N) => {
      const F = (i.snippets || []).map((D) => D.id === j ? {
        ...D,
        [A]: N
      } : D);
      x(F);
    }, u = (j) => {
      const A = (i.snippets || []).filter((N) => N.id !== j);
      x(A);
    }, f = (j) => {
      p(j), k(null);
    }, E = () => {
      p(null), k(null);
    }, v = () => {
      !c || !m || (b(c, "prefix", m), E());
    }, g = () => {
      const A = (i.snippets || []).map((L) => {
        const B = (L.prefix || "").trim(), Z = Tn(B) || B;
        return {
          ...L,
          name: (L.name || "").trim(),
          prefix: Z,
          body: (L.body || "").replace(/\r\n/g, `
`),
          description: (L.description || "").trim()
        };
      });
      if (A.find((L) => !L.prefix || !L.body)) {
        alert("\uAC01 \uC2A4\uB2C8\uD3AB\uC5D0\uB294 \uB2E8\uCD95\uD0A4(shortcut)\uC640 body\uAC00 \uBAA8\uB450 \uD544\uC694\uD569\uB2C8\uB2E4.");
        return;
      }
      const F = /* @__PURE__ */ new Set();
      for (const L of A) {
        if (F.has(L.prefix)) {
          alert(`\uC911\uBCF5\uB41C \uB2E8\uCD95\uD0A4 "${L.prefix}" \uC774(\uAC00) \uC788\uC2B5\uB2C8\uB2E4. \uAC01 \uB2E8\uCD95\uD0A4\uB294 \uACE0\uC720\uD574\uC57C \uD569\uB2C8\uB2E4.`);
          return;
        }
        F.add(L.prefix);
      }
      const D = {
        snippets: A
      };
      l(D), r == null ? void 0 : r(D), a == null ? void 0 : a(D);
    }, P = i.snippets || [];
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
            !d && e.jsx("p", {
              className: "text-xs text-gray-500 dark:text-odp-muted",
              children: "\uC2A4\uB2C8\uD3AB \uC124\uC815\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4\u2026"
            }),
            d && P.length === 0 && e.jsx("p", {
              className: "text-xs text-gray-500 dark:text-odp-muted",
              children: '\uC544\uC9C1 \uB4F1\uB85D\uB41C \uC2A4\uB2C8\uD3AB\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC544\uB798 "\uC2A4\uB2C8\uD3AB \uCD94\uAC00" \uBC84\uD2BC\uC744 \uB20C\uB7EC \uC0C8 \uC2A4\uB2C8\uD3AB\uC744 \uB9CC\uB4E4\uC5B4 \uBCF4\uC138\uC694.'
            }),
            P.map((j) => e.jsxs("div", {
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
                              onClick: () => f(j.id),
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
              onClick: h,
              className: "px-3 py-1.5 text-xs rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
              children: "\uC2A4\uB2C8\uD3AB \uCD94\uAC00"
            }),
            e.jsx("button", {
              type: "button",
              onClick: g,
              disabled: o,
              className: "px-3 py-1.5 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition",
              children: o ? "\uC800\uC7A5 \uC911..." : "\uC2A4\uB2C8\uD3AB JSON \uC800\uC7A5"
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
  function Ln() {
    const [t, r] = s.useState([]), [a, o] = s.useState(false), [d, i] = s.useState(false), [l, c] = s.useState(null), [p, m] = s.useState(false), [k, x] = s.useState(null), [h, b] = s.useState(null), u = s.useCallback(async () => {
      c(null);
      try {
        const g = await fa();
        r(g.files), o(true);
      } catch (g) {
        c(g instanceof Error ? g.message : String(g)), o(true);
      }
    }, []);
    s.useEffect(() => {
      u();
    }, [
      u
    ]);
    const f = () => {
      x(null), m(true);
    }, E = (g) => {
      x(g), m(true);
    }, v = async () => {
      if (h) {
        i(true), c(null);
        try {
          const g = await ja(h.id);
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
        l ? e.jsx("p", {
          className: "mb-2 text-xs text-red-600 dark:text-red-400",
          role: "alert",
          children: l
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
              children: ha.map((g) => e.jsxs("li", {
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
                  disabled: !a || d,
                  onClick: f,
                  className: "inline-flex items-center gap-1 rounded bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
                  children: [
                    e.jsx(ln, {
                      className: "h-3.5 w-3.5",
                      "aria-hidden": true
                    }),
                    "\uC6F9\uD3F0\uD2B8 \uCD94\uAC00"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: d,
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
        a ? t.length === 0 ? e.jsx("p", {
          className: "rounded border border-dashed border-gray-200 px-3 py-4 text-center text-xs text-gray-400 dark:border-odp-borderStrong dark:text-odp-muted",
          children: "\uC544\uC9C1 \uCD94\uAC00\uB41C \uC6F9\uD3F0\uD2B8 \uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \u300C\uC6F9\uD3F0\uD2B8 \uCD94\uAC00\u300D\uB85C CSS\uB97C \uC800\uC7A5\uD558\uC138\uC694."
        }) : e.jsx("ul", {
          className: "space-y-2",
          children: t.map((g) => {
            const P = ya(g.css);
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
                        P.length ? ` \xB7 ${P.join(", ")}` : ""
                      ]
                    }),
                    P.length > 0 ? e.jsx("ul", {
                      className: "mt-1 flex flex-wrap gap-1",
                      children: P.map((j) => e.jsx("li", {
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
                  disabled: d,
                  onClick: () => E(g),
                  className: "inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg",
                  children: [
                    e.jsx(cn, {
                      className: "h-3 w-3",
                      "aria-hidden": true
                    }),
                    "\uD3B8\uC9D1"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: d,
                  onClick: () => b(g),
                  className: "inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40",
                  children: [
                    e.jsx(It, {
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
        e.jsx(ka, {
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
          isOpen: !!h,
          title: "\uC6F9\uD3F0\uD2B8 \uC0AD\uC81C",
          message: h ? `"${h.name}" (${h.filename}) \uD30C\uC77C\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694\uAE4C\uC694?` : "",
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
  let Se = null, Ne = null;
  function Dn() {
    Se = null, Ne = null;
  }
  async function Rn() {
    return ce() ? Se || Ne || (Ne = (async () => {
      try {
        const { invoke: t } = await Br(async () => {
          const { invoke: a } = await import("./index-DgMMigqL.js").then(async (m) => {
            await m.__tla;
            return m;
          }).then((o) => o.jF);
          return {
            invoke: a
          };
        }, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])), r = await t("list_system_font_families");
        Se = Array.isArray(r) ? r : [];
      } catch {
        Se = [];
      } finally {
        Ne = null;
      }
      return Se ?? [];
    })(), Ne) : [];
  }
  const _r = "Paperozi / A2z (\uAE30\uBCF8)";
  function zn() {
    const [t, r] = s.useState(() => Jt()), [a, o] = s.useState([]), [d, i] = s.useState(ce()), [l, c] = s.useState(0), p = s.useCallback(async () => {
      if (ce()) {
        i(true);
        try {
          Dn();
          const h = await Rn();
          o(h);
        } finally {
          i(false);
        }
      }
    }, []);
    s.useEffect(() => {
      p();
    }, [
      p
    ]), s.useEffect(() => {
      const h = () => r(Jt()), b = () => c((u) => u + 1);
      return window.addEventListener(Qt, h), window.addEventListener(Zt, b), () => {
        window.removeEventListener(Qt, h), window.removeEventListener(Zt, b);
      };
    }, []);
    const m = s.useMemo(() => va(a), [
      a,
      l
    ]), k = (h) => {
      r(h), er(h);
    }, x = () => {
      r(""), er("");
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
            e.jsx(Sa, {
              id: "settings-ui-font-family",
              value: t,
              onChange: k,
              options: m,
              placeholder: _r
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
              disabled: d,
              className: "inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
              children: [
                e.jsx(at, {
                  size: 14,
                  "aria-hidden": true
                }),
                d ? "\uC2DC\uC2A4\uD15C \uAE00\uAF34 \uBD88\uB7EC\uC624\uB294 \uC911\u2026" : "\uC2DC\uC2A4\uD15C \uAE00\uAF34 \uC0C8\uB85C\uACE0\uCE68"
              ]
            }) : null
          ]
        }),
        t ? null : e.jsxs("p", {
          className: "mt-2 text-[11px] text-gray-500 dark:text-odp-muted",
          children: [
            "\uD604\uC7AC: ",
            _r
          ]
        })
      ]
    });
  }
  const Mn = "z-100001 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong", Ir = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200",
    t ? "border-blue-500 bg-blue-500 shadow-sm" : "border-gray-300 bg-gray-300 dark:border-odp-borderSoft dark:bg-odp-bgSoft",
    "group-hover:border-blue-400 group-hover:brightness-105"
  ].join(" ");
  function et({ label: t, children: r }) {
    return e.jsxs(mn, {
      children: [
        e.jsx(fn, {
          asChild: true,
          children: r
        }),
        e.jsx(hn, {
          children: e.jsxs(yn, {
            side: "bottom",
            sideOffset: 6,
            className: Mn,
            children: [
              t,
              e.jsx(kn, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function Bn() {
    const [t, r] = s.useState(() => Na()), [a, o] = s.useState(() => tr()), [d, i] = s.useState(() => rr()), [l, c] = s.useState(() => ar()), [p, m] = s.useState(() => Date.now());
    s.useEffect(() => Re((x, h) => {
      x === "settings-status-bar-clock" ? r(h) : x === "settings-status-bar-clock-date" && o(h);
    }), []), s.useEffect(() => {
      const x = (h) => {
        const b = h.detail;
        i((b == null ? void 0 : b.format) ?? rr()), o(typeof (b == null ? void 0 : b.showDate) == "boolean" ? b.showDate : tr()), c(typeof (b == null ? void 0 : b.customPattern) == "string" ? b.customPattern : ar());
      };
      return window.addEventListener(sr, x), () => {
        window.removeEventListener(sr, x);
      };
    }, []), s.useEffect(() => {
      if (!t) return;
      const x = window.setInterval(() => m(Date.now()), 1e3);
      return () => window.clearInterval(x);
    }, [
      t
    ]);
    const k = wa(p, {
      format: d,
      showDate: a,
      customPattern: l
    });
    return e.jsx(gn, {
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
                        onClick: () => W("settings-status-bar-clock-date", !a),
                        className: Ir(a),
                        "aria-pressed": a,
                        "aria-label": "\uC0C1\uD0DC\uBC14 \uC2DC\uACC4 \uB0A0\uC9DC \uD45C\uC2DC",
                        children: e.jsx("span", {
                          className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${a ? "translate-x-4" : "translate-x-0.5"}`
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
                    e.jsx(ye, {
                      className: "flex flex-col gap-2",
                      value: d,
                      onValueChange: (x) => {
                        x !== "24h" && x !== "12h" && x !== "custom" || (Ea(x), i(x));
                      },
                      "aria-label": "\uC0C1\uD0DC\uBC14 \uC2DC\uACC4 \uD45C\uC2DC \uD615\uC2DD",
                      children: Ca.map((x) => {
                        const h = d === x.value, b = x.value === "24h" ? "24\uC2DC\uAC04\uC81C \uD504\uB9AC\uC14B. \uC608: 15:04:05 (\uB0A0\uC9DC \uCF1C\uBA74 2026-01-15 15:04:05)" : x.value === "12h" ? "12\uC2DC\uAC04\uC81C + AM/PM \uD504\uB9AC\uC14B. \uC608: 03:04:05 PM (\uB0A0\uC9DC \uCF1C\uBA74 \uC55E\uC5D0 yyyy-MM-dd)" : "\uC9C1\uC811 \uD328\uD134 \uC785\uB825. yyyy/MM/dd/HH/hh/mm/ss/A/a \uD1A0\uD070\uC744 \uC870\uD569\uD569\uB2C8\uB2E4.";
                        return e.jsx(et, {
                          label: b,
                          children: e.jsx(xe, {
                            value: x.value,
                            className: [
                              "w-90 origin-left rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200",
                              "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                              h ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"
                            ].join(" "),
                            children: e.jsxs("div", {
                              className: h ? "" : "opacity-50",
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
                d === "custom" ? e.jsxs("div", {
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
                            value: l,
                            onChange: (x) => {
                              const h = x.target.value;
                              c(h), Oa(h);
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
                            children: Aa.map((x) => e.jsxs("tr", {
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
                          children: Pa.map((x) => e.jsxs("li", {
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
  function $n() {
    const [t, r] = s.useState([]), [a, o] = s.useState(false), [d, i] = s.useState(false), [l, c] = s.useState(null), [p, m] = s.useState(null), [k, x] = s.useState(false), h = s.useCallback(async () => {
      c(null);
      try {
        const u = await Ta();
        r(u.templates), o(true);
      } catch (u) {
        c(u instanceof Error ? u.message : String(u)), r(_a().templates), o(true);
      }
    }, []);
    s.useEffect(() => {
      h();
    }, [
      h
    ]);
    const b = async (u) => {
      i(true), c(null);
      try {
        await Ia({
          ...Fa,
          templates: u
        }), r(u);
      } catch (f) {
        c(f instanceof Error ? f.message : String(f));
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
        l ? e.jsx("p", {
          className: "mb-2 text-xs text-red-600",
          children: l
        }) : null,
        e.jsxs("div", {
          className: "mb-3 flex gap-2",
          children: [
            e.jsx("button", {
              type: "button",
              disabled: !a || d,
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
              disabled: d,
              onClick: () => {
                h();
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
                        b(t.filter((f) => f.id !== u.id));
                      },
                      children: "\uC0AD\uC81C"
                    })
                  ]
                })
              ]
            }, u.id)),
            a && t.length === 0 ? e.jsx("li", {
              className: "text-xs text-gray-400",
              children: "\uB4F1\uB85D\uB41C \uD15C\uD50C\uB9BF\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
            }) : null
          ]
        }),
        e.jsx(En, {
          isOpen: k,
          template: p,
          onClose: () => {
            x(false), m(null);
          },
          onSave: (u) => {
            const f = t.filter((E) => E.id !== (p == null ? void 0 : p.id) && E.id !== u.id);
            b([
              ...f,
              u
            ]).then(() => {
              x(false), m(null);
            });
          }
        })
      ]
    });
  }
  const Kn = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), Wn = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function tt({ label: t, description: r, checked: a, onCheckedChange: o, ariaLabel: d }) {
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
          className: Kn(a),
          checked: a,
          onCheckedChange: o,
          "aria-label": d,
          children: e.jsx(dt, {
            className: Wn
          })
        })
      ]
    });
  }
  function Vn() {
    const [t, r] = s.useState(() => nr());
    return s.useEffect(() => {
      const a = () => r(nr());
      return a(), window.addEventListener(or, a), () => window.removeEventListener(or, a);
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
                  onCheckedChange: (a) => W("settings-cover-center-snap", a),
                  ariaLabel: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5"
                }),
                e.jsxs("label", {
                  className: "block space-y-1 pt-1",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-400",
                      children: "\uD5C8\uC6A9 \uC624\uCC28"
                    }),
                    e.jsx(Tr, {
                      unit: "css",
                      suffix: "px",
                      min: lr,
                      max: dr,
                      step: 0.1,
                      value: t.centerSnapTolerancePx,
                      "aria-label": "\uAC00\uC6B4\uB370 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (a) => La(a)
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
                  onCheckedChange: (a) => W("settings-cover-object-snap", a),
                  ariaLabel: "\uAC1C\uCCB4 \uC2A4\uB0C5"
                }),
                e.jsxs("label", {
                  className: "block space-y-1 pt-1",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-400",
                      children: "\uD5C8\uC6A9 \uC624\uCC28"
                    }),
                    e.jsx(Tr, {
                      unit: "css",
                      suffix: "px",
                      min: lr,
                      max: dr,
                      step: 0.1,
                      value: t.objectSnapTolerancePx,
                      "aria-label": "\uAC1C\uCCB4 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (a) => Da(a)
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
                onCheckedChange: (a) => W("settings-cover-text-outline", a),
                ariaLabel: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC"
              })
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(tt, {
                label: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30",
                description: "\uD14D\uC2A4\uD2B8\xB7\uC774\uBBF8\uC9C0\xB7\uB3C4\uD615 \uC0BD\uC785 \uC2DC \uBC18\uD22C\uBA85 \uACE0\uC2A4\uD2B8 \uBBF8\uB9AC\uBCF4\uAE30",
                checked: t.placePreviewEnabled,
                onCheckedChange: (a) => W("settings-cover-place-preview", a),
                ariaLabel: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30"
              })
            }),
            e.jsxs("p", {
              className: "text-[11px] text-gray-500 dark:text-odp-muted",
              children: [
                "\uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28 \uAE30\uBCF8\uAC12 ",
                Ra,
                "px \xB7 0.1px \uB2E8\uC704"
              ]
            })
          ]
        })
      ]
    });
  }
  function Hn() {
    const [t, r] = s.useState(""), [a, o] = s.useState(""), [d, i] = s.useState(null), [l, c] = s.useState(false);
    s.useEffect(() => {
      const b = () => {
        const f = $a();
        r(f), o(f);
      };
      b(), za().then((f) => {
        r(f.url), o(f.url);
      });
      const u = () => b();
      return window.addEventListener(ir, u), () => window.removeEventListener(ir, u);
    }, []);
    const p = cr(t) !== a, m = cr(t), k = !!String(t || "").trim() && !m, x = async () => {
      const b = String(t || "").trim();
      if (b && !m) {
        i("https:// \uB85C \uC2DC\uC791\uD558\uB294 Worker \uC8FC\uC18C\uB97C \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      c(true), i(null);
      try {
        const u = await xr(b);
        r(u), o(u), i(u ? `\uC800\uC7A5\uB428 \u2014 ${Ye}\uC5D0 \uAE30\uB85D\uD588\uACE0, OG \uC694\uCCAD \uC2DC \uC774 Worker\uB97C \uAC00\uC7A5 \uBA3C\uC800 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.` : `Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${Ye}).`);
      } finally {
        c(false);
      }
    }, h = async () => {
      c(true), i(null);
      try {
        r("");
        const b = await xr("");
        o(b), i(`Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${Ye}).`);
      } finally {
        c(false);
      }
    };
    return e.jsxs(ge, {
      id: "settings-og",
      contentKey: "settings-og-worker",
      defaultOpen: false,
      tabIndex: -1,
      className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsx(me, {
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
                    href: Ma,
                    target: "_blank",
                    rel: "noreferrer noopener",
                    className: "inline-block",
                    children: e.jsx("img", {
                      src: Ba,
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
                disabled: l,
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
                    disabled: l || !p && !k,
                    className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                    children: l ? "\uC800\uC7A5 \uC911\u2026" : "\uC800\uC7A5"
                  }),
                  e.jsx("button", {
                    type: "button",
                    onClick: () => {
                      h();
                    },
                    disabled: l || !a && !t,
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
              d ? e.jsx("p", {
                className: "mt-2 text-[11px] text-gray-600 dark:text-odp-muted",
                children: d
              }) : null
            ]
          })
        })
      ]
    });
  }
  function ne({ id: t, title: r, open: a, onOpenChange: o, children: d }) {
    const i = `settings-group-${t}`, l = `${i}-panel`, c = `${i}-title`;
    return e.jsxs(ge, {
      as: "section",
      id: i,
      contentKey: i,
      open: a,
      onOpenChange: o,
      "aria-labelledby": c,
      className: "scroll-mt-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50/80 dark:border-odp-borderStrong dark:bg-odp-surface/80",
      children: [
        e.jsx(me, {
          id: c,
          controlsId: l,
          titleAs: "span",
          className: "flex w-full items-center gap-2 px-4 py-3 text-left transition hover:bg-gray-100/80 dark:hover:bg-odp-focusBg/40",
          titleClassName: "text-sm font-bold text-gray-800 dark:text-odp-fgStrong",
          children: r
        }),
        e.jsx(oe, {
          children: e.jsx("div", {
            id: l,
            className: "space-y-4 border-t border-gray-200 px-4 pb-4 pt-3 dark:border-odp-borderStrong",
            children: d
          })
        })
      ]
    });
  }
  function Un({ groups: t, activeSectionId: r, onNavigate: a }) {
    const [o, d] = s.useState(""), i = s.useMemo(() => Ka(t, o), [
      t,
      o
    ]), l = o.trim();
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
                e.jsx(nt, {
                  size: 13,
                  className: "pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-odp-muted",
                  "aria-hidden": true
                }),
                e.jsx("input", {
                  type: "search",
                  value: o,
                  onChange: (c) => d(c.target.value),
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
            children: l ? `"${l}"\uC5D0 \uB9DE\uB294 \uADF8\uB8F9\xB7\uC139\uC158\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.` : "\uD45C\uC2DC\uD560 \uC124\uC815 \uC5C6\uC74C"
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
                        onClick: () => a(p.id),
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
  function Gn() {
    const t = s.useRef(null), [r, a] = s.useState(() => String(ur()));
    s.useEffect(() => {
      const d = (i) => {
        var _a2;
        const c = ((_a2 = i == null ? void 0 : i.detail) == null ? void 0 : _a2.softCap) ?? ur();
        a(String(c));
      };
      return window.addEventListener(br, d), () => {
        window.removeEventListener(br, d);
      };
    }, []), s.useEffect(() => {
      const d = () => {
        var _a2;
        (_a2 = document.getElementById("settings-workspace-pane-soft-cap")) == null ? void 0 : _a2.scrollIntoView({
          behavior: "smooth",
          block: "center"
        }), window.setTimeout(() => {
          var _a3, _b;
          (_a3 = t.current) == null ? void 0 : _a3.focus(), (_b = t.current) == null ? void 0 : _b.select();
        }, 80);
      };
      return window.addEventListener(pr, d), () => {
        window.removeEventListener(pr, d);
      };
    }, []);
    const o = () => {
      const d = Wa(Va(r));
      a(String(d));
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
              onChange: (d) => a(d.target.value),
              onBlur: o,
              onKeyDown: (d) => {
                d.key === "Enter" && (d.preventDefault(), o(), d.target.blur());
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
  function Fr(t) {
    return t === "off" || t === "hover-or-focus" || t === "focus";
  }
  function Xn() {
    const [t, r] = s.useState(() => fr());
    return s.useEffect(() => {
      const a = (o) => {
        const d = o == null ? void 0 : o.detail;
        r((d == null ? void 0 : d.mode) && Fr(d.mode) ? d.mode : fr());
      };
      return window.addEventListener(hr, a), () => {
        window.removeEventListener(hr, a);
      };
    }, []), e.jsxs("div", {
      id: "settings-workspace-pane-freeze",
      tabIndex: -1,
      className: "scroll-mt-4 space-y-2",
      children: [
        e.jsx("p", {
          className: "text-xs font-medium text-gray-700 dark:text-odp-fg",
          children: "\uBE44\uD65C\uC131 \uC2A4\uD50C\uB9BF \uD398\uC778 \uD504\uB9AC\uC9D5"
        }),
        e.jsx(ye, {
          className: "flex flex-col gap-2",
          value: t,
          onValueChange: (a) => {
            Fr(a) && (Ua(a), r(a));
          },
          "aria-label": "\uBE44\uD65C\uC131 \uC2A4\uD50C\uB9BF \uD398\uC778 \uD504\uB9AC\uC9D5",
          children: Ha.map((a) => {
            const o = t === a.value;
            return e.jsx(xe, {
              value: a.value,
              className: [
                "w-90 origin-left rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200",
                "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                o ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"
              ].join(" "),
              children: e.jsxs("div", {
                className: o ? "" : "opacity-50",
                children: [
                  e.jsx("div", {
                    className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                    children: a.label
                  }),
                  e.jsx("div", {
                    className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
                    children: a.description
                  })
                ]
              })
            }, a.value);
          })
        })
      ]
    });
  }
  function Yn({ open: t, extension: r, onOpenChange: a, onOpenFile: o }) {
    const d = (r == null ? void 0 : r.files) ?? [], i = r ? `${r.label} \uD30C\uC77C` : "\uD30C\uC77C \uBAA9\uB85D";
    return e.jsx(jn, {
      open: t,
      onOpenChange: a,
      children: e.jsxs(vn, {
        children: [
          e.jsx(Sn, {
            className: "fixed inset-0 z-100000 bg-black/40"
          }),
          e.jsxs(Nn, {
            className: "fixed top-1/2 left-1/2 z-100001 flex max-h-[min(90vh,40rem)] w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft",
            "aria-describedby": void 0,
            children: [
              e.jsxs("div", {
                className: "flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-odp-borderStrong",
                children: [
                  e.jsxs("div", {
                    className: "min-w-0",
                    children: [
                      e.jsx(wn, {
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
                  e.jsx(Cn, {
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
                children: d.length === 0 ? e.jsx("p", {
                  className: "px-4 py-8 text-center text-xs text-gray-500 dark:text-odp-muted",
                  children: "\uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
                }) : e.jsx("ul", {
                  className: "divide-y divide-gray-100 dark:divide-odp-borderSoft",
                  children: d.map((l) => e.jsx("li", {
                    children: e.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        o(l);
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
                              children: l.name
                            }),
                            e.jsx("span", {
                              className: "mt-0.5 block truncate font-mono text-[10px] text-gray-500 dark:text-odp-muted",
                              title: l.path,
                              children: l.path
                            })
                          ]
                        }),
                        e.jsx("span", {
                          className: "shrink-0 tabular-nums text-[11px] text-gray-600 dark:text-odp-muted",
                          children: de(l.size)
                        })
                      ]
                    })
                  }, l.path))
                })
              })
            ]
          })
        ]
      })
    });
  }
  const qn = 160, Lr = "settings-as-build-log-auto-scroll", Jn = (t) => [
    "relative inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), Qn = "block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[0.875rem]";
  function Zn(t) {
    return t === "error" ? "text-red-600 dark:text-red-400" : t === "warn" ? "text-amber-700 dark:text-amber-300" : t === "ok" ? "text-emerald-700 dark:text-emerald-300" : "text-gray-600 dark:text-odp-muted";
  }
  function Ur({ logs: t, building: r, progress: a, className: o = "" }) {
    const d = s.useRef(null), [i, l] = s.useState(() => t ?? _.getBuildLogs().slice()), [c, p] = s.useState(() => r ?? _.getStatus().building), [m, k] = s.useState(() => a ?? _.getStatus().buildProgress), [x, h] = s.useState(() => Ga()), b = s.useRef(0);
    return s.useEffect(() => {
      t && l(t);
    }, [
      t
    ]), s.useEffect(() => {
      r !== void 0 && p(r);
    }, [
      r
    ]), s.useEffect(() => {
      a !== void 0 && k(a);
    }, [
      a
    ]), s.useEffect(() => Re((u, f) => {
      u === Lr && h(f);
    }), []), s.useEffect(() => {
      if (t) return;
      let u = false;
      const f = async () => {
        const g = ++b.current, P = await _.getBuildLogsAsync();
        u || g !== b.current || l(P);
      };
      f();
      const E = _.subscribeBuildLogs(() => {
        f();
      }), v = _.subscribe(() => {
        const g = _.getStatus();
        p(g.building), k(g.buildProgress);
      });
      return () => {
        u = true, E(), v();
      };
    }, [
      t
    ]), s.useEffect(() => {
      var _a2;
      !x || i.length === 0 || ((_a2 = d.current) == null ? void 0 : _a2.scrollToIndex(i.length - 1, {
        align: "end"
      }));
    }, [
      i,
      c,
      x
    ]), !c && i.length === 0 ? null : e.jsxs("div", {
      className: `overflow-hidden rounded-md border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft ${o}`,
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
                        W(Lr, u);
                      },
                      className: Jn(x),
                      "aria-label": "\uC0C9\uC778 \uB85C\uADF8 \uC790\uB3D9 \uC2A4\uD06C\uB864",
                      children: e.jsx(dt, {
                        className: Qn
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
        }) : e.jsx(Xa, {
          ref: d,
          className: "overscroll-contain px-2.5 py-1.5 font-mono text-[10px] leading-relaxed",
          style: {
            height: qn
          },
          data: i,
          "aria-live": "polite",
          "aria-relevant": "additions",
          children: (u) => e.jsxs("div", {
            className: `whitespace-pre-wrap break-all ${Zn(u.level)}`,
            children: [
              e.jsx("span", {
                className: "text-gray-400 dark:text-odp-muted",
                children: eo(u.at)
              }),
              " ",
              u.message
            ]
          }, u.id)
        })
      ]
    });
  }
  function eo(t) {
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
  function Gr({ isOpen: t, info: r, onResume: a, onStartFresh: o, onCancel: d }) {
    const i = (r == null ? void 0 : r.processedFileCount) ?? 0, l = (r == null ? void 0 : r.processedChatCount) ?? 0, c = i + l, p = (r == null ? void 0 : r.updatedAt) && r.updatedAt > 0 ? new Date(r.updatedAt).toLocaleString() : null;
    return e.jsx(Ce, {
      isOpen: t,
      title: "\uC911\uC9C0\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8",
      message: c > 0 ? `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778\uC774 \uC788\uC2B5\uB2C8\uB2E4.
\uCC98\uB9AC\uB428: \uD30C\uC77C ${i} \xB7 \uCC44\uD305 day ${l}${p ? `
\uC800\uC7A5 \uC2DC\uAC01: ${p}` : ""}

\uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAE4C\uC694, \uC544\uB2C8\uBA74 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uB9CC\uB4E4\uAE4C\uC694?` : `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4.
\uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAE4C\uC694, \uC544\uB2C8\uBA74 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uB9CC\uB4E4\uAE4C\uC694?`,
      confirmLabel: "\uC774\uC5B4\uC11C \uC0C9\uC778",
      discardLabel: "\uCC98\uC74C\uBD80\uD130",
      cancelLabel: "\uCDE8\uC18C",
      onConfirm: a,
      onDiscard: o,
      onCancel: d
    });
  }
  const to = 400;
  function Xr() {
    const [t, r] = s.useState(() => _.getStatus()), a = s.useRef(t.building);
    return s.useEffect(() => {
      let o = null, d = false;
      const i = () => {
        const l = _.getStatus();
        a.current = l.building, r(l);
      };
      return _.subscribe(() => {
        const l = _.getStatus(), c = a.current && !l.building;
        if (a.current = l.building, c) {
          o && (clearTimeout(o), o = null), d = false, i();
          return;
        }
        if (o) {
          d = true;
          return;
        }
        i(), o = setTimeout(() => {
          o = null, d && (d = false, i());
        }, to);
      });
    }, []), t;
  }
  function lt(t) {
    return t.building && t.indexBuildCancellable;
  }
  function Lt(t) {
    return t.building && !t.indexBuildCancellable;
  }
  function Yr(t) {
    return lt(t);
  }
  function rt(t, r = false) {
    return r || !t.enabled || !t.isolationReady ? false : !lt(t);
  }
  function qr(t) {
    return lt(t) || Lt(t) ? typeof t.buildProgress == "number" ? `\uC0C9\uC778 \uC911 ${Math.round(t.buildProgress * 100)}%` : "\uC0C9\uC778 \uC911\u2026" : t.hasCheckpoint ? "\uC0C9\uC778 \uC7AC\uAC1C/\uB2E4\uC2DC \uC2DC\uC791" : t.hasIndex ? "\uB2E4\uC2DC \uC0C9\uC778" : "\uC0C9\uC778";
  }
  const Fe = [
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
  ], ro = `linear-gradient(90deg, ${Fe.map((t) => `rgb(${t.rgb.join(" ")}) ${(t.t * 100).toFixed(2)}%`).join(", ")})`;
  function Dr(t) {
    return Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : 0;
  }
  function Ct(t, r, a) {
    return Math.round(t + (r - t) * a);
  }
  function ao(t) {
    const r = Dr(t / 100);
    let a = 0;
    for (; a < Fe.length - 2 && r > Fe[a + 1].t; ) a += 1;
    const o = Fe[a], d = Fe[a + 1], i = d.t - o.t || 1, l = Dr((r - o.t) / i), c = Ct(o.rgb[0], d.rgb[0], l), p = Ct(o.rgb[1], d.rgb[1], l), m = Ct(o.rgb[2], d.rgb[2], l);
    return `rgb(${c} ${p} ${m})`;
  }
  function Rr({ percent: t }) {
    const r = ao(t);
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
  function so() {
    return e.jsxs("div", {
      className: "space-y-0.5",
      "aria-label": "\uC6A9\uB7C9 \uBE44\uC728 \uC0C9\uC0C1 \uBC94\uB840",
      children: [
        e.jsx("div", {
          className: "h-1.5 w-full rounded-full border border-gray-200 dark:border-odp-borderStrong",
          style: {
            backgroundImage: ro
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
  function no(t) {
    return t === fe ? "Local Haim" : t === we ? "WebDAV Haim" : t === le ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function oo() {
    return e.jsx("div", {
      className: "flex h-40 min-h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-white text-xs text-gray-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted md:h-full md:min-h-48",
      children: "\uADF8\uB798\uD504 \uC900\uBE44\uC911"
    });
  }
  function lo({ depth: t, expandable: r, expanded: a, label: o }) {
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
          children: a ? e.jsx(Kr, {
            size: 14
          }) : e.jsx(Wr, {
            size: 14
          })
        }) : e.jsx("span", {
          className: "inline-block size-4 shrink-0",
          "aria-hidden": true
        }),
        e.jsx("span", {
          className: "min-w-0 truncate",
          children: o
        })
      ]
    });
  }
  function Et({ columns: t, rows: r, emptyText: a = "\uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", maxHeightClass: o = "max-h-64", legendColumnKey: d = null }) {
    return e.jsx("div", {
      className: `${o} overflow-auto rounded-md border border-gray-200 dark:border-odp-borderStrong`,
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
                children: a
              })
            }) : r.map((i, l) => {
              var _a2, _b, _c, _d;
              const c = typeof i._onClick == "function", p = ((_a2 = i._tree) == null ? void 0 : _a2.expandable) ? i._tree.expanded : void 0, m = (_c = (_b = r[l - 1]) == null ? void 0 : _b._tree) == null ? void 0 : _c.depth, k = (_d = i._tree) == null ? void 0 : _d.depth, x = l > 0 && typeof m == "number" && typeof k == "number" && k < m, h = (b) => {
                var _a3;
                c && (b.key !== "Enter" && b.key !== " " || (b.preventDefault(), (_a3 = i._onClick) == null ? void 0 : _a3.call(i)));
              };
              return e.jsx("tr", {
                onClick: c ? i._onClick : void 0,
                onKeyDown: h,
                tabIndex: c ? 0 : void 0,
                "aria-expanded": p,
                className: `hover:bg-gray-50 dark:hover:bg-odp-focusBg/40 ${c ? "cursor-pointer" : ""}`,
                children: t.map((b) => {
                  const u = b.tree ? i._tree : void 0;
                  return e.jsx("td", {
                    className: `px-3 py-1.5 text-gray-700 dark:text-odp-fg ${x ? "border-t-2 border-gray-300 dark:border-odp-borderStrong" : "border-t border-gray-100 dark:border-odp-borderSoft"} ${b.align === "right" ? "text-right tabular-nums" : ""} ${b.className ?? ""}`,
                    children: u ? e.jsx(lo, {
                      depth: u.depth,
                      expandable: u.expandable,
                      expanded: u.expanded,
                      label: u.label
                    }) : i[b.key]
                  }, b.key);
                })
              }, i._key ?? l);
            })
          }),
          d ? e.jsx("tfoot", {
            children: e.jsx("tr", {
              children: t.map((i) => e.jsx("td", {
                className: "sticky bottom-0 border-t border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: i.key === d ? e.jsx(so, {}) : null
              }, i.key))
            })
          }) : null
        ]
      })
    });
  }
  function io(t, r) {
    const a = /* @__PURE__ */ new Set(), o = [];
    for (const d of t) (d.parentPath == null || a.has(d.parentPath) && r.has(d.parentPath)) && (o.push(d), a.add(d.path));
    return o;
  }
  function Ot({ title: t, open: r, onToggle: a, children: o }) {
    return e.jsxs(ge, {
      contentKey: t,
      open: r,
      onOpenChange: (d) => {
        d !== r && a();
      },
      className: "rounded-md border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-bgSoft",
      children: [
        e.jsx(me, {
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
                children: e.jsx(oo, {})
              }),
              e.jsx("div", {
                className: "min-w-0",
                children: o
              })
            ]
          })
        })
      ]
    });
  }
  function co({ storageMode: t = le, onScanTree: r, canScan: a = true, onOpenFile: o }) {
    const [d, i] = s.useState(false), [l, c] = s.useState(null), [p, m] = s.useState(null), [k, x] = s.useState(() => /* @__PURE__ */ new Set()), [h, b] = s.useState(null), [u, f] = s.useState({
      summary: true,
      extension: false,
      folder: false
    }), [E, v] = s.useState(false), g = Xr(), [P, j] = s.useState(false), [A, N] = s.useState(null), [F, D] = s.useState(false);
    s.useEffect(() => {
      g.building || v(false);
    }, [
      g.building
    ]), s.useEffect(() => {
      _.refreshCheckpointStatus();
    }, []), s.useEffect(() => {
      m(null), c(null), x(/* @__PURE__ */ new Set()), b(null), f({
        summary: true,
        extension: false,
        folder: false
      });
    }, [
      t
    ]);
    const L = (w) => {
      f((V) => ({
        ...V,
        [w]: !V[w]
      }));
    }, B = (w) => {
      x((V) => {
        const X = new Set(V);
        return X.has(w) ? X.delete(w) : X.add(w), X;
      });
    }, Z = async () => {
      if (!(!r || !a || d)) {
        i(true), c(null);
        try {
          const w = await r();
          m(Pn(w)), x(/* @__PURE__ */ new Set()), b(null);
        } catch (w) {
          const V = w instanceof Error ? w.message : String(w);
          c(V || "\uC6A9\uB7C9 \uBD84\uC11D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."), m(null), x(/* @__PURE__ */ new Set()), b(null);
        } finally {
          i(false);
        }
      }
    }, R = (w) => {
      rt(g, E) && (v(true), _.rebuild({
        resume: w
      }).finally(() => v(false)));
    }, $ = () => {
      rt(g, E) && (async () => {
        const w = await _.getRebuildCheckpointInfo();
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
      _.cancelRebuild();
    }, z = p == null ? void 0 : p.summary, Ee = z && z.totalSize > 0 ? z.indexSize / z.totalSize * 100 : 0, ue = z ? [
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
    ] : [], ee = io((p == null ? void 0 : p.folders) ?? [], k);
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
                      children: no(t)
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
                  disabled: !a || !rt(g, E),
                  className: "inline-flex items-center gap-1.5 rounded border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                  title: g.enabled ? g.isolationReady ? "\uC5ED\uC0C9\uC778\uC744 \uBC31\uADF8\uB77C\uC6B4\uB4DC\uB85C \uC0DD\uC131\uD569\uB2C8\uB2E4" : "\uC6F9\uC5D0\uC11C\uB294 \uAC80\uC0C9 \uACA9\uB9AC(COOP/COEP)\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694" : "\uC124\uC815\uC5D0\uC11C \uC5ED\uC0C9\uC778\uC744 \uCF20 \uB4A4 \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",
                  children: [
                    E || g.building ? e.jsx(De, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(nt, {
                      size: 14
                    }),
                    qr(g)
                  ]
                }),
                Yr(g) ? e.jsxs("button", {
                  type: "button",
                  onClick: K,
                  className: "inline-flex items-center gap-1.5 rounded border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60",
                  title: "\uC0C9\uC778\uC744 \uC911\uC9C0\uD569\uB2C8\uB2E4. \uCCB4\uD06C\uD3EC\uC778\uD2B8\uB294 \uC720\uC9C0\uB418\uC5B4 \uC774\uC5B4\uC11C \uC7AC\uAC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                  children: [
                    e.jsx(Pr, {
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
                    e.jsx(Pr, {
                      size: 14
                    }),
                    "\uC911\uC9C0"
                  ]
                }) : null,
                e.jsxs("button", {
                  type: "button",
                  onClick: Z,
                  disabled: !a || d || typeof r != "function",
                  className: "inline-flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
                  children: [
                    d ? e.jsx(De, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(Dt, {
                      size: 14
                    }),
                    d ? "\uBD84\uC11D \uC911\u2026" : p ? "\uB2E4\uC2DC \uBD84\uC11D" : "\uBD84\uC11D \uC2DC\uC791"
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
        e.jsx(Ur, {}),
        e.jsx(Gr, {
          isOpen: P,
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
          isOpen: F,
          title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
          message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
          confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
          cancelLabel: "\uCDE8\uC18C",
          onConfirm: () => {
            D(false), R(false);
          },
          onCancel: () => D(false)
        }),
        l && e.jsx("p", {
          className: "whitespace-pre-wrap text-xs text-red-600 dark:text-red-400",
          children: l
        }),
        e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsx(Ot, {
              title: "\uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: u.summary,
              onToggle: () => L("summary"),
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
                rows: ue.map((w) => ({
                  label: w.label,
                  value: w.value
                })),
                emptyText: "\uBD84\uC11D\uC744 \uC2DC\uC791\uD558\uBA74 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4."
              })
            }),
            e.jsx(Ot, {
              title: "\uD30C\uC77C \uD615\uC2DD\uBCC4 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: u.extension,
              onToggle: () => L("extension"),
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
                  percent: e.jsx(Rr, {
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
              onToggle: () => L("folder"),
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
                    percent: e.jsx(Rr, {
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
        e.jsx(Yn, {
          open: h != null,
          extension: h,
          onOpenChange: (w) => {
            w || b(null);
          },
          onOpenFile: async (w) => {
            b(null), await (o == null ? void 0 : o(w));
          }
        })
      ]
    });
  }
  function zt(t) {
    return String(t || "").replace(/^\/+/, "");
  }
  function xo(t) {
    const r = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
    for (const [o, d] of t) {
      if (d.kind === "file") {
        r.add(zt(d.path));
        continue;
      }
      const i = Ya(o);
      i && a.add(i.dateStr);
    }
    return {
      files: r,
      chatDates: a
    };
  }
  function uo(t, r) {
    const a = zt(t);
    if ($r(a)) {
      const o = Ja(a);
      return !!(o && r.chatDates.has(o));
    }
    return r.files.has(a);
  }
  function zr(t, r, a) {
    let o = 0, d = 0;
    const i = (l) => {
      var _a2;
      if (l.type === "file" && l.path) {
        const c = zt(l.path);
        if (!($r(c) || qa(c, a))) return;
        o += 1, uo(c, r) && (d += 1);
        return;
      }
      if ((_a2 = l.children) == null ? void 0 : _a2.length) for (const c of l.children) i(c);
    };
    return i(t), {
      indexableCount: o,
      indexedCount: d
    };
  }
  function Mr(t, r) {
    return r <= 0 ? 0 : t / r * 100;
  }
  function Jr(t, r) {
    return r <= 0 ? "\u2014" : t > 0 && t < 0.1 ? "< 0.1%" : `${t.toFixed(1)}%`;
  }
  function bo(t, r, a = {}) {
    const o = Array.isArray(t) ? t : [], d = xo(r);
    let i = 0, l = 0;
    const c = [], p = (m, k, x) => {
      var _a2;
      const h = m.filter((b) => b.type === "folder").map((b) => ({
        node: b,
        ...zr(b, d, a)
      })).sort((b, u) => u.indexableCount - b.indexableCount || b.node.name.localeCompare(u.node.name));
      for (const { node: b, indexableCount: u, indexedCount: f } of h) {
        const E = b.path || `${b.name}/`, v = (b.children ?? []).some((P) => P.type === "folder"), g = Mr(f, u);
        c.push({
          path: E,
          name: b.name,
          depth: k,
          parentPath: x,
          hasChildFolders: v,
          indexableCount: u,
          indexedCount: f,
          percent: g
        }), ((_a2 = b.children) == null ? void 0 : _a2.length) && p(b.children, k + 1, E);
      }
    };
    for (const m of o) {
      const k = zr(m, d, a);
      i += k.indexableCount, l += k.indexedCount;
    }
    return p(o, 0, null), {
      summary: {
        indexableCount: i,
        indexedCount: l,
        percent: Mr(l, i)
      },
      folders: c
    };
  }
  const po = `${ts} min-w-[200px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft`;
  function go(t) {
    return t === fe ? "Local Haim" : t === we ? "WebDAV Haim" : t === le ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function mo(t) {
    const r = Math.min(1, Math.max(0, t / 100)), a = Math.round(255 * (1 - r) + 34 * r), o = Math.round(68 * (1 - r) + 197 * r), d = Math.round(68 * (1 - r) + 94 * r);
    return `rgb(${a} ${o} ${d})`;
  }
  function fo(t, r) {
    const a = /* @__PURE__ */ new Set(), o = [];
    for (const d of t) (d.parentPath == null || a.has(d.parentPath) && r.has(d.parentPath)) && (o.push(d), a.add(d.path));
    return o;
  }
  function ho({ percent: t, indexableCount: r, className: a = "" }) {
    const o = r > 0 ? Math.min(100, Math.max(0, t)) : 0;
    return e.jsx("div", {
      className: `h-3 w-28 shrink-0 overflow-hidden rounded-sm bg-gray-900/90 dark:bg-black/50 ${a}`,
      "aria-hidden": true,
      children: e.jsx("div", {
        className: "h-full min-w-0 transition-[width] duration-150",
        style: {
          width: `${o}%`,
          backgroundColor: mo(t)
        }
      })
    });
  }
  function yo({ depth: t, expandable: r, expanded: a, label: o }) {
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
          children: a ? e.jsx(Kr, {
            size: 14
          }) : e.jsx(Wr, {
            size: 14
          })
        }) : e.jsx("span", {
          className: "inline-block size-4 shrink-0",
          "aria-hidden": true
        }),
        e.jsx("span", {
          className: "min-w-0 truncate",
          children: o
        })
      ]
    });
  }
  function ko({ row: t, index: r, expanded: a, building: o, indexEnabled: d, onToggle: i, onIndexFolder: l }) {
    const c = Qa(), { contextMenuOpen: p, setContextMenuOpen: m, longPressOpenedRef: k, bindPress: x } = Za({
      enabled: true,
      coarse: c
    }), h = t.hasChildFolders, b = Le(t.path), u = d && !o && !b, f = Jr(t.percent, t.indexableCount), E = (g) => {
      h && (g.key !== "Enter" && g.key !== " " || (g.preventDefault(), i(t.path)));
    }, v = e.jsxs("li", {
      className: `flex items-center gap-2 rounded px-1 py-0.5 ${h ? "cursor-pointer hover:bg-white/5 focus-visible:outline-1 focus-visible:outline-blue-400" : ""}`,
      onClick: () => {
        if (c && k.current) {
          k.current = false;
          return;
        }
        h && i(t.path);
      },
      onKeyDown: E,
      tabIndex: h ? 0 : void 0,
      "aria-expanded": h ? a : void 0,
      ...c ? x : {},
      children: [
        e.jsx("span", {
          className: "w-5 shrink-0 text-right tabular-nums text-gray-500",
          children: r + 1
        }),
        e.jsx("span", {
          className: "min-w-0 flex-1 overflow-hidden",
          children: e.jsx(yo, {
            depth: t.depth,
            expandable: t.hasChildFolders,
            expanded: a,
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
        e.jsx(ho, {
          percent: t.percent,
          indexableCount: t.indexableCount
        }),
        e.jsx("span", {
          className: "w-12 shrink-0 text-right tabular-nums text-gray-200",
          children: f
        })
      ]
    });
    return e.jsx(es, {
      ...c ? {
        open: p,
        onOpenChange: m
      } : {},
      title: t.path.replace(/\/$/, "") || t.name,
      subtitle: "\uD3F4\uB354 \uCEE4\uBC84\uB9AC\uC9C0",
      contentClassName: po,
      trigger: v,
      children: e.jsxs(rs, {
        className: as,
        disabled: !u,
        onSelect: () => {
          u && l(t.path);
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
  function jo({ storageMode: t = le, onScanTree: r, canScan: a = true, embedded: o = false }) {
    const [d, i] = s.useState(false), [l, c] = s.useState(null), [p, m] = s.useState(null), [k, x] = s.useState(() => /* @__PURE__ */ new Set()), [h, b] = s.useState(0), u = s.useRef(null), f = s.useRef(false), E = s.useRef(false), v = s.useRef(r), g = s.useRef(a);
    s.useEffect(() => {
      v.current = r, g.current = a;
    }, [
      r,
      a
    ]);
    const P = s.useCallback(async () => {
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
    s.useEffect(() => _.subscribe(() => {
      if (_.getStatus().building) {
        if (f.current || (f.current = true, P()), u.current) return;
        u.current = setTimeout(() => {
          u.current = null, b(($) => $ + 1);
        }, 500);
        return;
      }
      f.current = false, u.current && (clearTimeout(u.current), u.current = null), b(($) => $ + 1);
    }), [
      P
    ]), s.useEffect(() => {
      _.getStatus().building && (f.current || (f.current = true, P()));
    }, [
      P
    ]), s.useEffect(() => () => {
      u.current && clearTimeout(u.current);
    }, []), s.useEffect(() => {
      m(null), c(null), x(/* @__PURE__ */ new Set()), f.current = false;
    }, [
      t
    ]);
    const j = _.getStatus(), A = s.useMemo(() => p ? bo(p, _.getIndex().docs, {
      includeOtherFiles: j.includeOtherFiles,
      excludedFolders: j.excludedFolders
    }) : null, [
      p,
      h,
      j.includeOtherFiles,
      j.excludedFolders
    ]), N = fo((A == null ? void 0 : A.folders) ?? [], k), F = (R) => {
      x(($) => {
        const K = new Set($);
        return K.has(R) ? K.delete(R) : K.add(R), K;
      });
    }, D = () => {
      P();
    }, L = s.useCallback((R) => {
      _.rebuild({
        folderPath: R,
        ignoreExcludedFolders: true
      });
    }, []), B = A == null ? void 0 : A.summary, Z = B ? Jr(B.percent, B.indexableCount) : "\u2014";
    return e.jsxs("div", {
      className: o ? "space-y-4 border-t border-gray-200 pt-4 dark:border-odp-borderSoft" : "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsxs("div", {
          className: "flex flex-wrap items-start justify-between gap-3",
          children: [
            e.jsxs("div", {
              className: "min-w-0",
              children: [
                e.jsx("h3", {
                  className: o ? "text-xs font-bold text-gray-700 dark:text-odp-fgStrong" : "text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
                  children: o ? "\uD3F4\uB354\uBCC4 \uCEE4\uBC84\uB9AC\uC9C0" : "\uC5ED\uC0C9\uC778"
                }),
                e.jsxs("p", {
                  className: "mt-1 text-xs text-gray-600 dark:text-odp-muted",
                  children: [
                    "\uD604\uC7AC \uC120\uD0DD: ",
                    e.jsx("span", {
                      className: "font-semibold",
                      children: go(t)
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
              disabled: !a || d || typeof r != "function",
              className: "inline-flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
              children: [
                d ? e.jsx(De, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(Dt, {
                  size: 14
                }),
                d ? "\uBD88\uB7EC\uC624\uB294 \uC911\u2026" : p ? "\uB2E4\uC2DC \uBD88\uB7EC\uC624\uAE30" : "\uD3F4\uB354 \uD2B8\uB9AC \uBD88\uB7EC\uC624\uAE30"
              ]
            })
          ]
        }),
        !a && e.jsx("p", {
          className: "text-xs text-amber-700 dark:text-amber-300",
          children: "\uC120\uD0DD\uD55C \uC800\uC7A5\uC18C\uAC00 \uC544\uC9C1 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC5F0\uACB0 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
        }),
        !j.enabled && e.jsx("p", {
          className: "text-xs text-amber-700 dark:text-amber-300",
          children: "\uC5ED\uC0C9\uC778\uC774 \uAEBC\uC838 \uC788\uC2B5\uB2C8\uB2E4. \uC704\uC5D0\uC11C \uC5ED\uC0C9\uC778\uC744 \uCF20 \uB4A4 \uC0C9\uC778\uC744 \uC0DD\uC131\uD558\uC138\uC694."
        }),
        l ? e.jsx("p", {
          className: "whitespace-pre-wrap text-xs text-red-600 dark:text-red-400",
          children: l
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
            children: d ? "\uD3F4\uB354 \uD2B8\uB9AC\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026" : p ? "\uD45C\uC2DC\uD560 \uD3F4\uB354\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." : j.building ? "\uC0C9\uC778 \uC2DC\uC791\uC5D0 \uB9DE\uCDB0 \uD3F4\uB354 \uD2B8\uB9AC\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026" : "\u300C\uD3F4\uB354 \uD2B8\uB9AC \uBD88\uB7EC\uC624\uAE30\u300D\uB97C \uB204\uB974\uAC70\uB098 \uC0C9\uC778\uC744 \uC2DC\uC791\uD558\uBA74 \uC5ED\uC0C9\uC778 \uD604\uD669\uC744 \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
          }) : e.jsx("ul", {
            className: "space-y-0.5",
            children: N.map((R, $) => e.jsx(ko, {
              row: R,
              index: $,
              expanded: k.has(R.path),
              building: j.building,
              indexEnabled: j.enabled,
              onToggle: F,
              onIndexFolder: L
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
  const vo = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), So = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function No(t) {
    return t === fe ? "Local Haim" : t === we ? "WebDAV Haim" : t === le ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function wo({ storageMode: t, canScan: r = false, onScanTree: a, onReadText: o, onReadBytes: d, onDeletePaths: i }) {
    const [l, c] = s.useState(() => ss()), [p, m] = s.useState("notes"), [k, x] = s.useState("trash"), [h, b] = s.useState(false), [u, f] = s.useState(false), [E, v] = s.useState(null), [g, P] = s.useState(null), [j, A] = s.useState(""), [N, F] = s.useState([]), [D, L] = s.useState(() => /* @__PURE__ */ new Set()), [B, Z] = s.useState([]), [R, $] = s.useState(() => /* @__PURE__ */ new Set()), [K, z] = s.useState({}), [Ee, ue] = s.useState(false), [ee, w] = s.useState([]), [V, X] = s.useState({}), [Oe, ze] = s.useState(false), ie = s.useRef(null);
    s.useEffect(() => Re((y, C) => {
      y === "settings-orphan-image-auto" && c(C);
    }), []), s.useEffect(() => () => {
      var _a2;
      (_a2 = ie.current) == null ? void 0 : _a2.abort();
    }, []);
    const re = h || u || Oe, Me = async () => {
      var _a2;
      if (!r || !a || !o || re) return;
      (_a2 = ie.current) == null ? void 0 : _a2.abort();
      const y = new AbortController();
      ie.current = y, b(true), A(""), v(null);
      try {
        const C = await a();
        if (y.signal.aborted) return;
        const T = yr(C, p), I = ns(C), M = /* @__PURE__ */ new Set();
        if (await os(I, 6, async (H) => {
          try {
            const q = await o(H);
            for (const Ke of ds(q)) M.add(Ke);
          } catch {
          }
        }, {
          signal: y.signal,
          onProgress: (H, q) => v({
            done: H,
            total: q
          })
        }), y.signal.aborted) return;
        const U = ls({
          images: T,
          referencedPaths: M
        });
        F(U), L(new Set(U.map((H) => H.path)));
      } catch (C) {
        if ((C == null ? void 0 : C.name) === "AbortError") return;
        A(C instanceof Error ? C.message : String(C));
      } finally {
        b(false), v(null);
      }
    }, Be = async () => {
      var _a2;
      if (!r || !a || !d || re) return;
      (_a2 = ie.current) == null ? void 0 : _a2.abort();
      const y = new AbortController();
      ie.current = y, f(true), A(""), P(null);
      try {
        const C = await a();
        if (y.signal.aborted) return;
        const T = yr(C, p), I = await is(T, d, {
          signal: y.signal,
          onProgress: (H, q) => P({
            done: H,
            total: q
          })
        });
        if (y.signal.aborted) return;
        Z(I);
        const M = {}, U = /* @__PURE__ */ new Set();
        for (const H of I) {
          M[H.hash] = H.keepPath;
          for (const q of H.files) q.path !== H.keepPath && U.add(q.path);
        }
        z(M), $(U);
      } catch (C) {
        if ((C == null ? void 0 : C.name) === "AbortError") return;
        A(C instanceof Error ? C.message : String(C));
      } finally {
        f(false), P(null);
      }
    }, ke = (y) => {
      L((C) => {
        const T = new Set(C);
        return T.has(y) ? T.delete(y) : T.add(y), T;
      });
    }, ae = (y, C) => {
      const T = K[C];
      y !== T && $((I) => {
        const M = new Set(I);
        return M.has(y) ? M.delete(y) : M.add(y), M;
      });
    }, it = (y, C) => {
      z((T) => ({
        ...T,
        [y]: C
      })), $((T) => {
        const I = new Set(T), M = B.find((U) => U.hash === y);
        if (!M) return I;
        for (const U of M.files) U.path === C ? I.delete(U.path) : I.add(U.path);
        return I;
      });
    }, ct = () => {
      const y = {};
      for (const C of B) {
        const T = K[C.hash];
        if (T) for (const I of C.files) I.path !== T && R.has(I.path) && (y[I.path] = T);
      }
      return y;
    }, $e = (y, C) => {
      !y.length || !i || (w(y), X(C ?? {}), ue(true));
    }, xt = async () => {
      if (!(!i || !ee.length)) {
        ze(true), A("");
        try {
          const y = Object.keys(V).length ? V : void 0;
          await i(ee, k, y ? {
            pathRemap: y
          } : void 0);
          const C = new Set(ee);
          F((T) => T.filter((I) => !C.has(I.path))), L((T) => {
            const I = new Set(T);
            for (const M of C) I.delete(M);
            return I;
          }), Z((T) => T.map((I) => ({
            ...I,
            files: I.files.filter((M) => !C.has(M.path))
          })).filter((I) => I.files.length >= 2)), $((T) => {
            const I = new Set(T);
            for (const M of C) I.delete(M);
            return I;
          }), ue(false), w([]), X({});
        } catch (y) {
          A(y instanceof Error ? y.message : String(y));
        } finally {
          ze(false);
        }
      }
    }, Y = D.size, te = R.size, be = k === "hard";
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
                No(t),
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
              className: vo(l),
              checked: l,
              onCheckedChange: (y) => W("settings-orphan-image-auto", y),
              "aria-label": "\uB178\uD2B8 \uC0AD\uC81C \uC2DC \uC774\uBBF8\uC9C0 \uC790\uB3D9 \uC815\uB9AC",
              children: e.jsx(dt, {
                className: So
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
                e.jsx(ye, {
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
                    return e.jsx(xe, {
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
                e.jsx(ye, {
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
                    return e.jsx(xe, {
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
                h ? e.jsx(De, {
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
                }) : e.jsx(pn, {
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
                    e.jsx(It, {
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
                      onChange: () => ke(y.path)
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
                    e.jsx(It, {
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
                    const T = K[y.hash] === C.path;
                    return e.jsx("li", {
                      children: e.jsxs("label", {
                        className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg",
                        children: [
                          e.jsx("input", {
                            type: "checkbox",
                            className: "mt-0.5",
                            checked: R.has(C.path),
                            disabled: T,
                            onChange: () => ae(C.path, y.hash)
                          }),
                          e.jsxs("span", {
                            className: "min-w-0 flex-1 break-all",
                            children: [
                              C.path,
                              T ? e.jsx("span", {
                                className: "ml-1 text-[10px] text-blue-600 dark:text-blue-400",
                                children: "(\uC720\uC9C0)"
                              }) : null
                            ]
                          }),
                          T ? null : e.jsx("button", {
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
          title: be ? "\uC774\uBBF8\uC9C0\uB97C \uC601\uAD6C \uC0AD\uC81C\uD560\uAE4C\uC694?" : "\uC774\uBBF8\uC9C0\uB97C \uD734\uC9C0\uD1B5\uC73C\uB85C \uBCF4\uB0BC\uAE4C\uC694?",
          message: be ? `${ee.length}\uAC1C \uD30C\uC77C\uC744 \uBCF5\uAD6C\uD560 \uC218 \uC5C6\uC774 \uC0AD\uC81C\uD569\uB2C8\uB2E4.${Object.keys(V).length ? " \uC0AD\uC81C \uB300\uC0C1\uC744 \uCC38\uC870\uD558\uB294 \uBB38\uC11C \uB9C1\uD06C\uB294 \uC720\uC9C0 \uC774\uBBF8\uC9C0\uB85C \uBC14\uB01D\uB2C8\uB2E4." : ""}` : `${ee.length}\uAC1C \uD30C\uC77C\uC744 .trash/ \uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.${Object.keys(V).length ? " \uC0AD\uC81C \uB300\uC0C1\uC744 \uCC38\uC870\uD558\uB294 \uBB38\uC11C \uB9C1\uD06C\uB294 \uC720\uC9C0 \uC774\uBBF8\uC9C0\uB85C \uBC14\uB01D\uB2C8\uB2E4." : ""}`,
          variant: "danger",
          confirmLabel: be ? "\uC601\uAD6C \uC0AD\uC81C" : "\uD734\uC9C0\uD1B5\uC73C\uB85C \uC774\uB3D9",
          cancelLabel: "\uCDE8\uC18C",
          confirmDisabled: Oe,
          onConfirm: () => {
            xt();
          },
          onCancel: () => {
            Oe || (ue(false), w([]), X({}));
          }
        })
      ]
    });
  }
  const Co = "\uC554\uD638\uC124\uC815 \uBD88\uB7EC\uC624\uB294 \uC911", Eo = [
    {
      value: "off",
      label: "\uC0AC\uC6A9 \uC548 \uD568",
      description: "\uC571\uC744 \uC5F4\uBA74 \uC800\uC7A5\uB41C \uC5F0\uACB0 \uC815\uBCF4\uB97C \uBC14\uB85C \uBD88\uB7EC\uC635\uB2C8\uB2E4.",
      icon: Tt
    },
    {
      value: "password",
      label: "\uBE44\uBC00\uBC88\uD638",
      description: "\uC571 \uC785\uC7A5 \uC2DC \uB9C8\uC2A4\uD130 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD569\uB2C8\uB2E4.",
      icon: gs
    },
    {
      value: "biometric",
      label: "\uC0DD\uCCB4 \uC778\uC99D",
      description: "Touch ID, Windows Hello \uB4F1\uC73C\uB85C \uC571\uC744 \uC7A0\uAE08 \uD574\uC81C\uD569\uB2C8\uB2E4.",
      icon: ms
    }
  ];
  function Oo({ s3Creds: t, webdavConfig: r, onModeChanged: a }) {
    const { lock: o } = cs(), { showToast: d, dismissToast: i } = xs(), [l, c] = s.useState("off"), [p, m] = s.useState(false), [k, x] = s.useState(false), [h, b] = s.useState(false), [u, f] = s.useState(false), E = us(), v = s.useCallback(async (N) => {
      d({
        message: Co,
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
      d
    ]);
    if (s.useEffect(() => {
      if (!Pt()) return;
      let N = false;
      return (async () => {
        try {
          const [F, D] = await v(() => Promise.all([
            bs(),
            ps()
          ]));
          if (N) return;
          c(F), m(D);
        } catch {
          N || (c("off"), m(false));
        }
      })(), () => {
        N = true;
      };
    }, [
      v
    ]), !Pt()) return null;
    const g = async (N) => {
      if (!(k || N === l)) {
        x(true);
        try {
          if (N === "off") await v(() => kr(t, r));
          else if (N === "password") {
            b(true);
            return;
          } else await v(() => hs(t));
          c(N), a == null ? void 0 : a(N);
        } catch (F) {
          if (N === "biometric" && ys(F)) return;
          alert(vt(F, "\uC785\uC7A5 \uC7A0\uAE08 \uC124\uC815\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
        } finally {
          x(false);
        }
      }
    }, P = async (N) => {
      x(true);
      try {
        await v(() => ks(N, t, r)), c("password"), a == null ? void 0 : a("password"), b(false);
      } catch (F) {
        alert(vt(F, "\uBE44\uBC00\uBC88\uD638 \uC7A0\uAE08 \uC124\uC815\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        x(false);
      }
    }, j = async () => {
      f(false), x(true);
      try {
        await v(() => kr(t, r)), c("off"), a == null ? void 0 : a("off");
      } catch (N) {
        alert(vt(N, "\uC785\uC7A5 \uC7A0\uAE08 \uD574\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        x(false);
      }
    }, A = () => {
      l === "off" || k || o();
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
                    e.jsx(Tt, {
                      size: 16
                    }),
                    "\uC571 \uC785\uC7A5 \uC7A0\uAE08 (Tauri)"
                  ]
                }),
                l !== "off" ? e.jsxs(he, {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  className: "shrink-0",
                  disabled: k,
                  onClick: A,
                  "aria-label": "\uC571 \uC7A0\uAE08",
                  children: [
                    e.jsx(Tt, {
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
            e.jsx(ye, {
              value: l,
              onValueChange: (N) => {
                const F = N;
                if (F === "off" && l !== "off") {
                  f(true);
                  return;
                }
                g(F);
              },
              className: "space-y-2",
              disabled: k,
              children: Eo.map((N) => {
                const F = N.icon, D = N.value === "biometric" && !p, L = N.value === "biometric" && p ? E : N.label, B = N.value === "biometric" && p ? `${E}\uB85C \uC571\uC744 \uC7A0\uAE08 \uD574\uC81C\uD569\uB2C8\uB2E4.` : N.description;
                return e.jsxs("label", {
                  className: [
                    "flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition",
                    l === N.value ? "border-blue-400 bg-white shadow-sm dark:border-blue-500 dark:bg-odp-bgSoft" : "border-gray-200 bg-white/70 dark:border-odp-borderStrong dark:bg-odp-surface/60",
                    D ? "cursor-not-allowed opacity-50" : "hover:border-blue-300"
                  ].join(" "),
                  children: [
                    e.jsx(xe, {
                      value: N.value,
                      disabled: D || k,
                      className: "mt-0.5 h-4 w-4 shrink-0 rounded-full border border-gray-400 bg-white outline-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                      "aria-label": L,
                      children: e.jsx(Ft, {
                        className: "relative flex h-full w-full items-center justify-center after:block after:h-1.5 after:w-1.5 after:rounded-full after:bg-white"
                      })
                    }),
                    e.jsxs("span", {
                      className: "min-w-0 flex-1",
                      children: [
                        e.jsxs("span", {
                          className: "flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-odp-fg",
                          children: [
                            e.jsx(F, {
                              size: 14
                            }),
                            L
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
            l !== "off" && e.jsx("p", {
              className: "mt-3 text-[11px] text-gray-500 dark:text-odp-muted",
              children: l === "password" ? "\uBE44\uBC00\uBC88\uD638 \uBAA8\uB4DC\uAC00 \uCF1C\uC838 \uC788\uC2B5\uB2C8\uB2E4. \uC571\uC744 \uB2E4\uC2DC \uC5F4 \uB54C \uBE44\uBC00\uBC88\uD638\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." : `${E} \uBAA8\uB4DC\uAC00 \uCF1C\uC838 \uC788\uC2B5\uB2C8\uB2E4.`
            })
          ]
        }),
        e.jsx(fs, {
          isOpen: h,
          masterPassword: "",
          onCancel: () => {
            b(false);
          },
          onSubmit: (N) => {
            P(N);
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
          onCancel: () => f(false)
        })
      ]
    });
  }
  const Ao = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), Po = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function To() {
    const [t, r] = s.useState(() => jr()), [a, o] = s.useState(""), [d, i] = s.useState(false), l = s.useCallback(async () => {
      if (ce()) try {
        o(await js());
      } catch {
        o("");
      }
    }, []);
    s.useEffect(() => {
      if (ce()) return r(jr()), l(), Re((m, k) => {
        m === "settings-tauri-download-save-dialog" && r(k);
      });
    }, [
      l
    ]);
    const c = s.useCallback(async () => {
      i(true);
      try {
        await vs() && await l();
      } finally {
        i(false);
      }
    }, [
      l
    ]), p = s.useCallback(async () => {
      Ss(null), await l();
    }, [
      l
    ]);
    return ce() ? e.jsxs("div", {
      id: "settings-tauri-download",
      tabIndex: -1,
      className: "scroll-mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsxs("h3", {
          className: "mb-2 flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong",
          children: [
            e.jsx(_t, {
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
              className: Ao(t),
              checked: t,
              onCheckedChange: (m) => {
                r(m), Ns(m), W("settings-tauri-download-save-dialog", m);
              },
              "aria-label": "\uB2E4\uC6B4\uB85C\uB4DC \uC704\uCE58 \uC0AC\uC804 \uD655\uC778",
              children: e.jsx(dt, {
                className: Po
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
              children: a || "\uBD88\uB7EC\uC624\uB294 \uC911\u2026"
            }),
            e.jsxs("div", {
              className: "mt-3 flex flex-wrap gap-2",
              children: [
                e.jsxs(he, {
                  type: "button",
                  variant: "secondary",
                  disabled: d,
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
                  disabled: d,
                  onClick: () => {
                    p();
                  },
                  children: [
                    e.jsx(_t, {
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
  const _o = [
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
  function Io({ limits: t, disabled: r = false, onChange: a }) {
    const [o, d] = s.useState(() => ({
      maxFiles: String(t.maxFiles),
      maxChatDays: String(t.maxChatDays),
      maxHits: String(t.maxHits)
    }));
    s.useEffect(() => {
      d({
        maxFiles: String(t.maxFiles),
        maxChatDays: String(t.maxChatDays),
        maxHits: String(t.maxHits)
      });
    }, [
      t.maxFiles,
      t.maxChatDays,
      t.maxHits
    ]);
    const i = (l, c) => {
      const p = Number.parseInt(c.trim(), 10), m = Es({
        ...t,
        [l]: Number.isFinite(p) ? p : t[l]
      });
      d((k) => ({
        ...k,
        [l]: String(m[l])
      })), m[l] !== t[l] && a(m);
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
          children: _o.map(({ key: l, label: c, hint: p }) => {
            const m = Cs[l], k = t[l] === ws;
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
                  value: o[l],
                  disabled: r,
                  "aria-label": c,
                  onChange: (x) => {
                    d((h) => ({
                      ...h,
                      [l]: x.target.value
                    }));
                  },
                  onBlur: (x) => {
                    i(l, x.target.value);
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
            }, l);
          })
        })
      ]
    });
  }
  function Qr(t) {
    return (t == null ? void 0 : t.length) ? t.filter((r) => r.type !== "folder" || !r.path ? false : !Le(r.path)).map((r) => ({
      ...r,
      children: Qr(r.children)
    })) : [];
  }
  function Zr({ node: t, level: r, onSelect: a, selectedPath: o, excludedFolders: d }) {
    const [i, l] = s.useState(r < 2);
    if (t.type !== "folder" || !t.path || Le(t.path)) return null;
    const c = Ts(t.path), p = o === c, m = _s(c, d), k = `${r * 12 + 8}px`, x = Qr(t.children);
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
                onClick: () => l((h) => !h),
                children: i ? "\u25BE" : "\u25B8"
              }),
              e.jsxs("button", {
                type: "button",
                disabled: m,
                onClick: () => a(c),
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
        i && x.map((h) => e.jsx(Zr, {
          node: h,
          level: r + 1,
          onSelect: a,
          selectedPath: o,
          excludedFolders: d
        }, h.path))
      ]
    });
  }
  function Fo({ folders: t, disabled: r = false, onChange: a, onRequestTree: o, canRequestTree: d = true }) {
    const [i, l] = s.useState(false), [c, p] = s.useState(null), [m, k] = s.useState(false), [x, h] = s.useState(null), [b, u] = s.useState(null);
    s.useEffect(() => {
      i || (u(null), h(null));
    }, [
      i
    ]);
    const f = s.useCallback(async () => {
      if (!(r || typeof o != "function")) {
        l(true), k(true), h(null);
        try {
          const v = await o();
          p(Array.isArray(v) ? v : []);
        } catch (v) {
          p(null), h(v instanceof Error ? v.message : String(v));
        } finally {
          k(false);
        }
      }
    }, [
      r,
      o
    ]), E = () => {
      b && (a(Ps(t, b)), l(false));
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
                onClick: () => a(Os(t, v)),
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
          disabled: r || !d || typeof o != "function",
          onClick: () => {
            f();
          },
          className: "rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft",
          children: "\uD3F4\uB354 \uCD94\uAC00\u2026"
        }),
        e.jsx(As, {
          isOpen: i,
          onClose: () => l(false),
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
                  (c || []).filter((v) => v.type === "folder" && v.path && !Le(v.path)).map((v) => e.jsx(Zr, {
                    node: v,
                    level: 0,
                    onSelect: u,
                    selectedPath: b,
                    excludedFolders: t
                  }, v.path)),
                  (c || []).filter((v) => v.type === "folder" && v.path && !Le(v.path)).length === 0 ? e.jsx("p", {
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
                    onClick: () => l(false),
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
  function Lo({ value: t, disabled: r = false, onChange: a }) {
    const [o, d] = s.useState(String(t));
    s.useEffect(() => {
      d(String(t));
    }, [
      t
    ]);
    const i = (l) => {
      const c = Number.parseInt(l.trim(), 10), p = Fs(Number.isFinite(c) ? c : t);
      d(String(p)), p !== t && a(p);
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
                Is,
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
              value: o,
              disabled: r,
              "aria-label": "\uCCB4\uD06C\uD3EC\uC778\uD2B8 \uC8FC\uAE30",
              onChange: (l) => {
                d(l.target.value);
              },
              onBlur: (l) => {
                i(l.target.value);
              },
              onKeyDown: (l) => {
                l.key === "Enter" && l.currentTarget.blur();
              },
              className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft disabled:opacity-50"
            })
          ]
        })
      ]
    });
  }
  function Do(t, r, a = "") {
    const [o, d] = s.useState(a);
    return s.useEffect(() => {
      const i = t.current;
      if (!i || r.length === 0) return;
      const l = r.map((p) => document.getElementById(p)).filter((p) => !!p);
      if (l.length === 0) return;
      const c = new IntersectionObserver((p) => {
        var _a2;
        const k = (_a2 = p.filter((x) => x.isIntersecting).sort((x, h) => h.intersectionRatio - x.intersectionRatio)[0]) == null ? void 0 : _a2.target;
        (k == null ? void 0 : k.id) && d(k.id);
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
      for (const p of l) c.observe(p);
      return () => c.disconnect();
    }, [
      t,
      r,
      a
    ]), o;
  }
  function Ro(t, r) {
    const a = t.getBoundingClientRect(), o = r.getBoundingClientRect();
    return a.top - o.top + r.scrollTop;
  }
  function zo(t, r, a) {
    const o = "smooth", d = Number.parseFloat(getComputedStyle(r).scrollMarginTop || "0") || 0, i = Ro(r, t) - d;
    t.scrollTo({
      top: Math.max(0, i),
      behavior: o
    });
  }
  function At(t, r, a) {
    return r ? t ? (zo(t, r), true) : (r.scrollIntoView({
      block: "start",
      behavior: "smooth"
    }), true) : false;
  }
  Jo = function({ s3Creds: t, masterPassword: r, onSaveS3Creds: a, onExportCreds: o, onImportClick: d, showHiddenFolders: i, onToggleHiddenFolders: l, showTrashFolder: c = false, onToggleTrashFolder: p, hideRecordingCompanions: m = false, onToggleHideRecordingCompanions: k, treeStickyFolderPathEnabled: x = true, onToggleTreeStickyFolderPath: h, showTreeModifiedDate: b = false, onToggleShowTreeModifiedDate: u, treeHoverExpandSettings: f = rn, onTreeHoverExpandSettingsChange: E, onRequestClose: v, webauthnSupported: g = false, webauthnEnabled: P = false, webauthnStorageOnly: j = false, onEnableWebAuthn: A, onDisableWebAuthn: N, snippetConfig: F, onChangeSnippetConfig: D, onSaveSnippetConfig: L, isSavingSnippets: B = false, snippetConfigLoaded: Z = false, editorType: R, onEditorTypeChange: $, storageMode: K = le, onStorageModeChange: z, localFolderName: Ee = "", localVaultFsPath: ue = "", onOpenLocalFolder: ee, webdavConfig: w, onSaveWebdavConfig: V, isMobileLayout: X = false, sidebarOpen: Oe = true, sidebarCollapsed: ze = false, onOpenSidebar: ie, onCheckAppUpdate: re, isCheckingAppUpdate: Me = false, latestAppBuildId: Be = "", onScanStorageUsage: ke, canScanStorageUsage: ae = false, onOpenStorageUsageFile: it, onReadUnusedImageText: ct, onReadUnusedImageBytes: $e, onDeleteUnusedImagePaths: xt }) {
    const [Y, te] = s.useState(t), [be, y] = s.useState(""), [C, T] = s.useState(w ?? {
      endpoint: "",
      username: "",
      password: "",
      basePath: ""
    }), [I, M] = s.useState(false), [U, H] = s.useState(g), [q, Ke] = s.useState(() => Ls()), [We, ea] = s.useState(() => Ds()), [Ae, ta] = s.useState(() => Rs()), [Mt, Bt] = s.useState(() => vr()), [Ve, ra] = s.useState(() => zs()), [He, aa] = s.useState(() => Ms()), O = Xr(), [Ue, sa] = s.useState(() => Bs()), [na, $t] = s.useState(() => Sr()), [Kt, J] = s.useState(false), [oa, Ge] = s.useState(false), [da, Xe] = s.useState(null), [la, ut] = s.useState(false), [ia, bt] = s.useState(true), [Wt, pt] = s.useState(() => K === fe), [Vt, gt] = s.useState(false), [ca, mt] = s.useState(true), [se, Ht] = s.useState(() => $s(true)), Pe = s.useRef(null), Te = ga(), Ut = ma(), je = Pt(), Gt = String(ue || "").trim(), xa = String(Ee || "").trim() || Ks() || "", ft = je && Gt ? Gt : xa, Xt = je || typeof window < "u" && "showDirectoryPicker" in window;
    s.useEffect(() => Re((n, S) => {
      n === "settings-alt-vim" ? ea(S) : n === "settings-workspace-tabs" ? ta(S) : n === "settings-composer-helper" ? ra(S) : n === "settings-composer-autocomplete" ? aa(S) : n === "settings-as-animation" && sa(S);
    }), []), s.useEffect(() => {
      const n = (S) => {
        var _a2;
        const G = ((_a2 = S == null ? void 0 : S.detail) == null ? void 0 : _a2.mode) ?? Sr();
        $t(G);
      };
      return window.addEventListener(Nr, n), () => {
        window.removeEventListener(Nr, n);
      };
    }, []), s.useEffect(() => {
      const n = (S) => {
        var _a2;
        const G = ((_a2 = S == null ? void 0 : S.detail) == null ? void 0 : _a2.mode) ?? vr();
        Bt(G);
      };
      return window.addEventListener(wr, n), () => {
        window.removeEventListener(wr, n);
      };
    }, []), s.useEffect(() => {
      const n = String(Te.hash || "").replace(/^#/, "");
      if (!n.startsWith("settings-")) return;
      n === "settings-s3" && bt(true), n === "settings-webdav" && gt(true), n === "settings-local" && pt(true), n === "settings-imgbb" && mt(true), (n === "settings-mlx-vlm" || n === "settings-llama-cpp") && Nt(n), n === "settings-workspace-pane-soft-cap" && window.setTimeout(() => Ws(), 100);
      const S = Cr(n);
      S && Ht((Ie) => ({
        ...Ie,
        [S]: true
      }));
      const G = Er(n), ve = n === "settings-mlx-vlm" || n === "settings-llama-cpp" ? 220 : 80, pe = window.setTimeout(() => {
        var _a2;
        const Ie = document.getElementById(G);
        if (Ie) {
          At(Pe.current, Ie);
          try {
            (_a2 = Ie.focus) == null ? void 0 : _a2.call(Ie, {
              preventScroll: true
            });
          } catch {
          }
        }
      }, ve);
      return () => window.clearTimeout(pe);
    }, [
      Te.hash,
      Te.pathname
    ]), s.useEffect(() => {
      O.building || J(false);
    }, [
      O.building
    ]), s.useEffect(() => {
      _.isEnabled() && _.ensureManifestSummary();
    }, []), s.useEffect(() => {
      te({
        ...t,
        llmProviderProfiles: Je(t)
      }), y("");
    }, [
      t
    ]);
    const ht = !!((t == null ? void 0 : t.imgbbApiKey) || "").trim(), _e = (n) => {
      const S = n !== void 0 ? n : Je(Y), G = dn(S), pe = be.trim() || (ht ? t.imgbbApiKey : "");
      return {
        ...Y,
        llmProviderProfiles: S,
        ...G,
        imgbbApiKey: pe
      };
    };
    s.useEffect(() => {
      T(w ?? {
        endpoint: "",
        username: "",
        password: "",
        basePath: ""
      });
    }, [
      w
    ]), s.useEffect(() => {
      let n = false;
      return Vs().then((S) => {
        n || H(S);
      }), () => {
        n = true;
      };
    }, []);
    const yt = U && (r || j), Yt = s.useMemo(() => ({
      isDesktopApp: je,
      showWebAuthnSection: yt,
      canScanStorageUsage: ae
    }), [
      je,
      yt,
      ae
    ]), kt = s.useMemo(() => Hs(Yt), [
      Yt
    ]), qt = s.useMemo(() => kt.flatMap((n) => n.sections.map((S) => S.id)), [
      kt
    ]), ua = Do(Pe, qt, qt[0] || ""), Q = s.useCallback((n, S) => {
      n && Ht((G) => ({
        ...G,
        [n]: S
      }));
    }, []), ba = s.useCallback((n) => {
      const S = Cr(n);
      Q(S, true), n === "settings-s3" && bt(true), n === "settings-webdav" && gt(true), n === "settings-local" && pt(true), n === "settings-imgbb" && mt(true), (n === "settings-mlx-vlm" || n === "settings-llama-cpp") && Nt(n);
      const G = Er(n);
      Ut({
        pathname: Te.pathname,
        hash: `#${n}`
      }, {
        replace: true
      });
      const ve = n === "settings-mlx-vlm" || n === "settings-llama-cpp" ? 220 : 120;
      window.setTimeout(() => {
        var _a2;
        const pe = document.getElementById(G);
        if (pe) {
          At(Pe.current, pe);
          try {
            (_a2 = pe.focus) == null ? void 0 : _a2.call(pe, {
              preventScroll: true
            });
          } catch {
          }
        }
      }, ve);
    }, [
      Te.pathname,
      Ut,
      Q
    ]), pa = !X && ze ? "md:pl-14" : "";
    return e.jsxs("div", {
      className: "flex min-h-0 min-w-0 max-h-full flex-1 flex-col overflow-hidden bg-white dark:bg-odp-bgSofter",
      children: [
        e.jsxs("div", {
          className: `px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-odp-surface flex justify-between items-center gap-3 bg-gray-50 dark:bg-odp-surface shrink-0 transition-[padding] duration-300 ease-in-out ${pa}`,
          children: [
            e.jsxs("div", {
              className: "flex min-w-0 flex-1 items-center gap-2",
              children: [
                X && !Oe && typeof ie == "function" && e.jsx("button", {
                  type: "button",
                  "aria-label": "\uC0AC\uC774\uB4DC\uBC14 \uC5F4\uAE30",
                  onClick: ie,
                  className: "inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
                  children: e.jsx(Us, {
                    size: 22
                  })
                }),
                e.jsxs("h2", {
                  className: "font-bold text-gray-700 dark:text-odp-fgStrong flex min-w-0 items-center gap-2",
                  children: [
                    e.jsx(Gs, {}),
                    " \uC124\uC815 \uBC0F \uC554\uD638\uD654"
                  ]
                })
              ]
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => v == null ? void 0 : v(_e()),
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
              ref: Pe,
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
                      e.jsx(Oo, {
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
                                    value: fe,
                                    checked: K === fe,
                                    onChange: () => z == null ? void 0 : z(fe)
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
                                    value: we,
                                    checked: K === we,
                                    onChange: () => z == null ? void 0 : z(we)
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
                      e.jsxs(ge, {
                        as: "form",
                        id: "settings-s3",
                        contentKey: "settings-s3-conn",
                        open: ia,
                        onOpenChange: bt,
                        tabIndex: -1,
                        onSubmit: (n) => {
                          n.preventDefault(), a(_e());
                        },
                        className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsx(me, {
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
                                      onClick: () => v == null ? void 0 : v(_e()),
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
                      e.jsxs(ge, {
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
                          e.jsx(me, {
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
                                          onChange: (n) => T((S) => ({
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
                                          onChange: (n) => T((S) => ({
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
                                          onChange: (n) => T((S) => ({
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
                                          onChange: (n) => T((S) => ({
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
                                          const { createWebdavBackend: n } = await Br(async () => {
                                            const { createWebdavBackend: G } = await import("./index-DgMMigqL.js").then(async (m2) => {
                                              await m2.__tla;
                                              return m2;
                                            }).then((ve) => ve.jE);
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
                      e.jsxs(ge, {
                        id: "settings-local",
                        contentKey: "settings-local-conn",
                        open: Wt,
                        onOpenChange: pt,
                        tabIndex: -1,
                        className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsx(me, {
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
                                  children: je ? "Local Haim\uC740 OS \uD3F4\uB354 \uC120\uD0DD \uB300\uD654\uC0C1\uC790\uB85C vault \uB8E8\uD2B8\uB97C \uC9C0\uC815\uD569\uB2C8\uB2E4. \uC120\uD0DD\uD55C \uD3F4\uB354\uC758 \uC804\uCCB4 \uACBD\uB85C\uAC00 \uC800\uC7A5\uB418\uBA70, \uC571\uC744 \uB2E4\uC2DC \uC5F4\uBA74 \uAC19\uC740 \uC704\uCE58\uB97C \uBCF5\uC6D0\uD569\uB2C8\uB2E4." : "Local Haim\uC740 \uBE0C\uB77C\uC6B0\uC800 File System Access API\uB85C \uC5F0 \uD3F4\uB354\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uBCF4\uC548\uC0C1 OS \uC804\uCCB4 \uACBD\uB85C\uB294 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC73C\uBA70, \uD3F4\uB354 \uC774\uB984\uC73C\uB85C \uC5F4\uB9B0 \uC704\uCE58\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
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
                                      value: ft || "(\uD3F4\uB354\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC74C)",
                                      "aria-label": je ? "\uD604\uC7AC \uC5F4\uB9B0 \uB85C\uCEEC \uD3F4\uB354 \uACBD\uB85C" : "\uD604\uC7AC \uC5F4\uB9B0 \uB85C\uCEEC \uD3F4\uB354 \uC774\uB984"
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
                                      ft ? "\uB2E4\uB978 \uD3F4\uB354 \uC5F4\uAE30" : "\uD3F4\uB354 \uC120\uD0DD"
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
                                onClick: o,
                                className: "flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded transition",
                                children: [
                                  e.jsx(_t, {}),
                                  " S3 \uC5F0\uACB0\uC815\uBCF4 \uB0B4\uBCF4\uB0B4\uAE30"
                                ]
                              }),
                              e.jsxs("button", {
                                onClick: d,
                                className: "flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded transition",
                                children: [
                                  e.jsx(Xs, {}),
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
                          }) : P ? e.jsxs("div", {
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
                              disabled: I,
                              onClick: async () => {
                                if (I || !A) return;
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
                              children: I ? "\uB4F1\uB85D \uC911\u2026" : "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uC0AC\uC6A9 (\uB4F1\uB85D)"
                            })
                          })
                        ]
                      }),
                      ae && e.jsx("div", {
                        id: "settings-storage-usage",
                        tabIndex: -1,
                        className: "scroll-mt-4",
                        children: e.jsx(co, {
                          storageMode: K,
                          onScanTree: ke,
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
                      e.jsx(Ys, {
                        profiles: Je(Y),
                        onSaveProfiles: (n) => {
                          te((S) => ({
                            ...S,
                            llmProviderProfiles: n
                          })), a(_e(n));
                        }
                      }),
                      e.jsx(qs, {}),
                      e.jsx(Js, {})
                    ]
                  }),
                  e.jsxs(ne, {
                    id: "integrations",
                    title: "\uC678\uBD80 \uC5F0\uB3D9",
                    open: se.integrations !== false,
                    onOpenChange: (n) => Q("integrations", n),
                    children: [
                      e.jsx(wo, {
                        storageMode: K,
                        canScan: ae,
                        onScanTree: ke,
                        onReadText: ct,
                        onReadBytes: $e,
                        onDeletePaths: xt
                      }),
                      e.jsxs(ge, {
                        as: "form",
                        id: "settings-imgbb",
                        contentKey: "settings-imgbb-conn",
                        open: ca,
                        onOpenChange: mt,
                        tabIndex: -1,
                        onSubmit: (n) => {
                          if (n.preventDefault(), !be.trim() && !ht) {
                            alert("API \uD0A4\uB97C \uC785\uB825\uD558\uC138\uC694.");
                            return;
                          }
                          a(_e());
                        },
                        className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsx(me, {
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
                                      value: be,
                                      onChange: (n) => y(n.target.value),
                                      placeholder: ht ? "\uC800\uC7A5\uB428 \u2014 \uBCC0\uACBD \uC2DC \uC0C8 \uD0A4 \uC785\uB825" : "ImgBB API \uD0A4 \uC785\uB825"
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
                      e.jsx(Hn, {})
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
                                children: Qs.map((n) => e.jsxs("label", {
                                  className: "flex items-start gap-2 cursor-pointer",
                                  children: [
                                    e.jsx("input", {
                                      type: "radio",
                                      name: "footnoteDisplayMode",
                                      value: n.value,
                                      checked: na === n.value,
                                      onChange: () => {
                                        Zs(n.value), $t(n.value);
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
                        children: e.jsx(Fn, {
                          value: F,
                          onChange: D,
                          onSave: L,
                          isSaving: B,
                          isLoaded: Z
                        })
                      }),
                      e.jsx($n, {}),
                      e.jsx(Vn, {}),
                      e.jsx(Ln, {})
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
                                  n && At(Pe.current, n);
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
                          e.jsx(Fo, {
                            folders: O.excludedFolders || [],
                            disabled: !O.enabled,
                            canRequestTree: ae,
                            onRequestTree: ke,
                            onChange: (n) => _.setExcludedFolders(n)
                          }),
                          e.jsx(Lo, {
                            value: O.checkpointEvery ?? 5,
                            disabled: !O.enabled,
                            onChange: (n) => _.setCheckpointEvery(n)
                          }),
                          e.jsx(Io, {
                            limits: O.liveScanLimits,
                            disabled: !O.enabled,
                            onChange: (n) => _.setLiveScanLimits(n)
                          }),
                          e.jsxs("div", {
                            className: `rounded-md border px-3 py-2 text-xs ${O.building ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200" : O.hasIndex ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200" : "border-gray-200 bg-white text-gray-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-muted"}`,
                            children: [
                              lt(O) || Lt(O) ? e.jsxs(e.Fragment, {
                                children: [
                                  Lt(O) ? "\uC5ED\uC0C9\uC778 \uC800\uC7A5 \uC911" : "\uBC31\uADF8\uB77C\uC6B4\uB4DC \uC0C9\uC778 \uC911",
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
                                    const n = await _.getRebuildCheckpointInfo();
                                    if (n) {
                                      Xe(n), Ge(true);
                                      return;
                                    }
                                    if (O.hasIndex) {
                                      ut(true);
                                      return;
                                    }
                                    J(true), _.rebuild({
                                      resume: false
                                    }).finally(() => J(false));
                                  })();
                                },
                                className: "inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                                children: [
                                  e.jsx(at, {
                                    size: 14
                                  }),
                                  qr(O)
                                ]
                              }),
                              Yr(O) ? e.jsxs("button", {
                                type: "button",
                                onClick: () => _.cancelRebuild(),
                                className: "inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60",
                                title: "\uC0C9\uC778\uC744 \uC911\uC9C0\uD569\uB2C8\uB2E4. \uCCB4\uD06C\uD3EC\uC778\uD2B8\uB294 \uC720\uC9C0\uB418\uC5B4 \uC774\uC5B4\uC11C \uC7AC\uAC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                                children: [
                                  e.jsx(Or, {
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
                                  e.jsx(Or, {
                                    size: 14
                                  }),
                                  "\uC911\uC9C0"
                                ]
                              }) : null,
                              e.jsx("button", {
                                type: "button",
                                disabled: Kt || O.building || !O.hasIndex,
                                onClick: () => {
                                  window.confirm("\uC5ED\uC0C9\uC778 \uCE90\uC2DC(.advanced-search/)\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694? \uC0AD\uC81C \uD6C4\uC5D0\uB294 \u300C\uC0C9\uC778\u300D\uC73C\uB85C \uB2E4\uC2DC \uC0DD\uC131\uD574\uC57C \uD569\uB2C8\uB2E4.") && (J(true), _.clearCache().finally(() => J(false)));
                                },
                                className: "inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:bg-odp-bgSoft dark:text-red-300 dark:hover:bg-red-950/30",
                                children: "\uC5ED\uC0C9\uC778 \uCE90\uC2DC \uC0AD\uC81C"
                              })
                            ]
                          }),
                          e.jsx(Gr, {
                            isOpen: oa,
                            info: da,
                            onCancel: () => {
                              Ge(false), Xe(null);
                            },
                            onResume: () => {
                              Ge(false), Xe(null), J(true), _.rebuild({
                                resume: true
                              }).finally(() => J(false));
                            },
                            onStartFresh: () => {
                              Ge(false), Xe(null), J(true), _.rebuild({
                                resume: false
                              }).finally(() => J(false));
                            }
                          }),
                          e.jsx(Ce, {
                            isOpen: la,
                            title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
                            message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
                            confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
                            cancelLabel: "\uCDE8\uC18C",
                            onConfirm: () => {
                              ut(false), J(true), _.rebuild({
                                resume: false
                              }).finally(() => J(false));
                            },
                            onCancel: () => ut(false)
                          }),
                          e.jsx(Ur, {}),
                          e.jsx(jo, {
                            embedded: true,
                            storageMode: K,
                            onScanTree: ke,
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
                                    e.jsx(ye, {
                                      className: "flex flex-col gap-2",
                                      value: Mt,
                                      onValueChange: (n) => {
                                        n !== "off" && n !== "onFocusChange" && n !== "onWindowChange" || (tn(n), Bt(n));
                                      },
                                      "aria-label": "\uD0ED \uC790\uB3D9 \uC800\uC7A5",
                                      children: en.map((n) => {
                                        const S = Mt === n.value;
                                        return e.jsx(xe, {
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
                                    e.jsx(Gn, {}),
                                    e.jsx(Xn, {})
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
                          e.jsx(zn, {}),
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
                                onClick: l,
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
                          typeof h == "function" && e.jsxs("label", {
                            className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                            children: [
                              e.jsx("button", {
                                type: "button",
                                onClick: h,
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
                          e.jsx(Bn, {}),
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
                                        step: f.unit === "ms" ? 1 : 0.1,
                                        value: f.value,
                                        onChange: (n) => {
                                          const S = Number(n.target.value);
                                          E({
                                            ...f,
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
                                    children: e.jsxs(ye, {
                                      className: "flex items-center gap-3",
                                      value: f.unit,
                                      onValueChange: (n) => {
                                        n !== "s" && n !== "ms" || f.unit !== n && E({
                                          unit: n,
                                          value: an(f.value, f.unit, n)
                                        });
                                      },
                                      "aria-label": "\uB300\uAE30 \uC2DC\uAC04 \uB2E8\uC704",
                                      children: [
                                        e.jsxs("label", {
                                          className: "flex items-center gap-1.5 cursor-pointer",
                                          children: [
                                            e.jsx(xe, {
                                              value: "s",
                                              className: "size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                                              children: e.jsx(Ft, {
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
                                            e.jsx(xe, {
                                              value: "ms",
                                              className: "size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                                              children: e.jsx(Ft, {
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
                                      sn(f),
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
                                      Ke(Qe), Ar(Qe);
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
                                      Ke(Ze), Ar(Ze);
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
                    children: e.jsx(nn, {
                      llmProviderProfiles: Je(Y)
                    })
                  }),
                  e.jsxs(ne, {
                    id: "app",
                    title: "\uC571",
                    open: se.app !== false,
                    onOpenChange: (n) => Q("app", n),
                    children: [
                      e.jsx(To, {}),
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
                                    children: on() || "\uC54C \uC218 \uC5C6\uC74C"
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
            X ? null : e.jsx(Un, {
              groups: kt,
              activeSectionId: ua,
              onNavigate: ba
            })
          ]
        })
      ]
    });
  };
});
export {
  __tla,
  Jo as default
};
