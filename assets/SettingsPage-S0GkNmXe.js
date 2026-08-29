const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-RtVxfB8B.js","assets/vendor-react-BFxggocB.js","assets/vendor-md-editor-B8SO9Xt5.js","assets/vendor-aws-BCHf6c5E.js","assets/vendor-lucide-BNj_ckSR.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-b8oTnHK_.js","assets/vendor-radix-j_e9Isqx.js","assets/vendor-google-genai-DGp6lEvQ.js","assets/index-7iILl8pY.css"])))=>i.map(i=>d[i]);
import { _ as Er, __tla as __tla_0 } from "./vendor-md-editor-B8SO9Xt5.js";
import { r as a, j as e, f as ra, u as aa, __tla as __tla_1 } from "./vendor-react-BFxggocB.js";
import { b1 as kt, aF as sa, b2 as na, b3 as oa, b4 as da, aP as we, b5 as la, b6 as ce, b7 as Jt, b8 as Qt, b9 as Zt, ba as ia, a2 as ca, bb as tt, bc as er, aE as xa, aR as ua, aO as ba, bd as pa, be as tr, bf as rr, bg as H, bh as ar, bi as sr, bj as ga, bk as ma, bl as ha, bm as fa, bn as nr, bo as or, bp as pe, bq as ge, br as ie, bs as Ye, bt as ya, bu as ka, bv as ja, bw as dr, bx as va, S as F, by as Sa, bz as rt, _ as Na, bA as de, U as me, V as Se, bB as wa, bC as Or, bD as Ca, bE as Ea, aD as Oa, bF as Ia, bG as _e, bH as La, bI as Ta, bJ as Fa, aW as Da, bK as Aa, D as he, bL as lr, bM as _a, bN as Pa, bO as za, bP as Ra, bQ as $a, bR as Ma, bS as Ba, bT as Ka, bU as It, bV as Wa, bW as Ga, bX as Lt, bY as Ua, bZ as Va, b_ as Ha, b$ as ir, c0 as Ya, c1 as Xa, c2 as jt, c3 as qa, c4 as cr, c5 as Ja, c6 as Qa, c7 as Za, c8 as Tt, c9 as es, ca as at, cb as vt, cc as ts, cd as rs, ce as as, cf as ss, a7 as ns, cg as os, ch as ds, ci as ls, cj as is, ck as Xe, cl as cs, cm as xs, cn as us, co as bs, cp as ps, cq as xr, cr as gs, cs as ms, ct as ur, cu as hs, cv as fs, cw as br, cx as pr, cy as St, cz as gr, cA as mr, cB as qe, cC as ys, cD as ks, cE as js, cF as vs, cG as Ss, cH as Ns, cI as ws, cJ as Cs, cK as De, cL as Es, cM as Os, cN as Is, cO as Ls, cP as hr, cQ as Ts, cR as Fs, cS as Ds, cT as As, cU as _s, cV as Je, cW as fr, cX as Qe, cY as Ps, cZ as zs, c_ as Rs, __tla as __tla_2 } from "./index-RtVxfB8B.js";
import { a3 as $s, a4 as _t, a5 as Ms, a2 as Ft, T as Bs, a6 as Ks, c as st, X as Pt, a7 as Ws, L as Pe, a8 as yr, a9 as Ir, aa as Lr, ab as Gs } from "./vendor-lucide-BNj_ckSR.js";
import { T as Us } from "./TableStyleTemplateEditor-C8_w_qEJ.js";
import { S as kr } from "./SliderWithScrubInput-BzazJItT.js";
import { S as nt, g as ot, D as Vs, E as Hs, G as Ys, H as Xs, J as qs, K as Js, M as ze, N as Ne, Q as Dt } from "./vendor-radix-j_e9Isqx.js";
import "./vendor-aws-BCHf6c5E.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-google-genai-DGp6lEvQ.js";
import "./index-moa0c9-p.js";
let fo;
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
  function oe(t) {
    if (t == null || Number.isNaN(t)) return "\uC54C \uC218 \uC5C6\uC74C";
    if (t < 1024) return `${t} B`;
    const r = t / 1024;
    if (r < 1024) return `${r.toFixed(1)} KB`;
    const s = r / 1024;
    return s < 1024 ? `${s.toFixed(1)} MB` : `${(s / 1024).toFixed(1)} GB`;
  }
  function Qs(t) {
    const r = String(t || "").toLowerCase(), s = r.lastIndexOf(".");
    return s <= 0 || s === r.length - 1 ? "(none)" : r.slice(s + 1);
  }
  function Zs(t) {
    const r = String(t || "").replace(/^\/+/, "");
    return r === kt || r === `${kt}/` || r.startsWith(`${kt}/`);
  }
  function Tr(t) {
    var _a2;
    if (t.type === "file") return typeof t.size == "number" && Number.isFinite(t.size) ? t.size : 0;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let r = 0;
    for (const s of t.children) r += Tr(s);
    return r;
  }
  function Fr(t) {
    var _a2;
    if (t.type === "file") return 1;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let r = 0;
    for (const s of t.children) r += Fr(s);
    return r;
  }
  function en(t) {
    const r = Array.isArray(t) ? t : [];
    let s = 0, d = 0, i = 0, l = 0, o = 0, c = 0, p = 0;
    const g = /* @__PURE__ */ new Map(), k = (x) => {
      var _a2;
      for (const m of x) {
        if (m.type === "folder") {
          d += 1, ((_a2 = m.children) == null ? void 0 : _a2.length) && k(m.children);
          continue;
        }
        if (m.type !== "file") continue;
        s += 1;
        const E = typeof m.size == "number" && Number.isFinite(m.size), v = E ? m.size : 0;
        E ? v === 0 && (i += 1) : l += 1, o += v;
        const b = m.path || m.name;
        Zs(b) && (c += v, p += 1);
        const L = Qs(m.name), y = g.get(L) ?? {
          count: 0,
          size: 0,
          files: []
        };
        y.count += 1, y.size += v, y.files.push({
          path: b,
          name: m.name,
          size: E ? v : null,
          node: m
        }), g.set(L, y);
      }
    };
    k(r);
    const h = [
      ...g.entries()
    ].map(([x, { count: m, size: E, files: v }]) => ({
      ext: x,
      label: x === "(none)" ? "(\uD655\uC7A5\uC790 \uC5C6\uC74C)" : `.${x}`,
      count: m,
      size: E,
      percent: o > 0 ? E / o * 100 : 0,
      files: [
        ...v
      ].sort((b, L) => (L.size ?? -1) - (b.size ?? -1) || b.path.localeCompare(L.path))
    })).sort((x, m) => m.size - x.size || m.count - x.count || x.label.localeCompare(m.label)), j = [], u = (x, m, E) => {
      var _a2;
      const v = x.filter((b) => b.type === "folder").map((b) => ({
        node: b,
        size: Tr(b),
        fileCount: Fr(b)
      })).sort((b, L) => L.size - b.size || b.node.name.localeCompare(L.node.name));
      for (const { node: b, size: L, fileCount: y } of v) {
        const I = b.path || `${b.name}/`, N = (b.children ?? []).some((_) => _.type === "folder");
        j.push({
          path: I,
          name: b.name,
          depth: m,
          parentPath: E,
          hasChildFolders: N,
          size: L,
          fileCount: y,
          percent: o > 0 ? L / o * 100 : 0
        }), ((_a2 = b.children) == null ? void 0 : _a2.length) && u(b.children, m + 1, I);
      }
    };
    return u(r, 0, null), {
      summary: {
        totalSize: o,
        fileCount: s,
        folderCount: d,
        zeroByteCount: i,
        unknownSizeCount: l,
        indexSize: c,
        indexFileCount: p
      },
      byExtension: h,
      folders: j
    };
  }
  function tn(t) {
    return !t || typeof t != "string" ? "" : t.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
  }
  function rn(t) {
    const r = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), s = [];
    (r ? t.metaKey : t.ctrlKey) && s.push("mod"), t.altKey && s.push("alt"), t.shiftKey && s.push("shift");
    const d = (t.key || "").toLowerCase();
    return !d || d === "shift" || d === "control" || d === "alt" || d === "meta" || (s.push(d), s.length <= 1) ? null : s.join("+");
  }
  function Nt(t) {
    if (!t || typeof t != "string") return "";
    const s = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "Cmd" : "Ctrl";
    return t.toLowerCase().replace(/\bmod\b/g, s).split("+").map((d) => d.trim().charAt(0).toUpperCase() + d.trim().slice(1)).join(" + ");
  }
  function an() {
    return {
      id: String(Date.now()) + "-" + Math.random().toString(36).slice(2),
      name: "",
      prefix: "",
      body: "",
      description: ""
    };
  }
  function sn({ value: t, onChange: r, onSave: s, isSaving: d = false, isLoaded: i = true }) {
    const [l, o] = a.useState(() => t || {
      snippets: []
    }), [c, p] = a.useState(null), [g, k] = a.useState(null);
    a.useEffect(() => {
      o(t || {
        snippets: []
      });
    }, [
      t
    ]), a.useEffect(() => {
      if (!c) return;
      const y = (I) => {
        I.preventDefault(), I.stopPropagation();
        const N = rn(I);
        N && k(N);
      };
      return window.addEventListener("keydown", y, true), () => window.removeEventListener("keydown", y, true);
    }, [
      c
    ]);
    const h = (y) => {
      const I = {
        snippets: y
      };
      o(I), r == null ? void 0 : r(I);
    }, j = () => {
      h([
        ...l.snippets || [],
        an()
      ]);
    }, u = (y, I, N) => {
      const _ = (l.snippets || []).map((z) => z.id === y ? {
        ...z,
        [I]: N
      } : z);
      h(_);
    }, x = (y) => {
      const I = (l.snippets || []).filter((N) => N.id !== y);
      h(I);
    }, m = (y) => {
      p(y), k(null);
    }, E = () => {
      p(null), k(null);
    }, v = () => {
      !c || !g || (u(c, "prefix", g), E());
    }, b = () => {
      const I = (l.snippets || []).map((P) => {
        const B = (P.prefix || "").trim(), Z = tn(B) || B;
        return {
          ...P,
          name: (P.name || "").trim(),
          prefix: Z,
          body: (P.body || "").replace(/\r\n/g, `
`),
          description: (P.description || "").trim()
        };
      });
      if (I.find((P) => !P.prefix || !P.body)) {
        alert("\uAC01 \uC2A4\uB2C8\uD3AB\uC5D0\uB294 \uB2E8\uCD95\uD0A4(shortcut)\uC640 body\uAC00 \uBAA8\uB450 \uD544\uC694\uD569\uB2C8\uB2E4.");
        return;
      }
      const _ = /* @__PURE__ */ new Set();
      for (const P of I) {
        if (_.has(P.prefix)) {
          alert(`\uC911\uBCF5\uB41C \uB2E8\uCD95\uD0A4 "${P.prefix}" \uC774(\uAC00) \uC788\uC2B5\uB2C8\uB2E4. \uAC01 \uB2E8\uCD95\uD0A4\uB294 \uACE0\uC720\uD574\uC57C \uD569\uB2C8\uB2E4.`);
          return;
        }
        _.add(P.prefix);
      }
      const z = {
        snippets: I
      };
      o(z), r == null ? void 0 : r(z), s == null ? void 0 : s(z);
    }, L = l.snippets || [];
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
            !i && e.jsx("p", {
              className: "text-xs text-gray-500 dark:text-odp-muted",
              children: "\uC2A4\uB2C8\uD3AB \uC124\uC815\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4\u2026"
            }),
            i && L.length === 0 && e.jsx("p", {
              className: "text-xs text-gray-500 dark:text-odp-muted",
              children: '\uC544\uC9C1 \uB4F1\uB85D\uB41C \uC2A4\uB2C8\uD3AB\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC544\uB798 "\uC2A4\uB2C8\uD3AB \uCD94\uAC00" \uBC84\uD2BC\uC744 \uB20C\uB7EC \uC0C8 \uC2A4\uB2C8\uD3AB\uC744 \uB9CC\uB4E4\uC5B4 \uBCF4\uC138\uC694.'
            }),
            L.map((y) => e.jsxs("div", {
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
                          value: y.name || "",
                          onChange: (I) => u(y.id, "name", I.target.value),
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
                              title: y.prefix ? Nt(y.prefix) : "",
                              children: y.prefix ? Nt(y.prefix) : "\uBBF8\uC124\uC815"
                            }),
                            e.jsx("button", {
                              type: "button",
                              className: "shrink-0 px-2 py-1 text-[11px] rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
                              onClick: () => m(y.id),
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
                      value: y.body || "",
                      onChange: (I) => u(y.id, "body", I.target.value),
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
                          value: y.description || "",
                          onChange: (I) => u(y.id, "description", I.target.value),
                          placeholder: "\uC608: TODO \uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC2A4\uB2C8\uD3AB"
                        })
                      ]
                    }),
                    e.jsx("button", {
                      type: "button",
                      className: "mt-4 sm:mt-6 px-2 py-1 text-[11px] text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/40 rounded hover:bg-red-50 dark:hover:bg-red-900/20 whitespace-nowrap",
                      onClick: () => {
                        window.confirm("\uC774 \uC2A4\uB2C8\uD3AB\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?") && x(y.id);
                      },
                      children: "\uC0AD\uC81C"
                    })
                  ]
                })
              ]
            }, y.id))
          ]
        }),
        e.jsxs("div", {
          className: "flex items-center justify-between gap-2 pt-1",
          children: [
            e.jsx("button", {
              type: "button",
              onClick: j,
              className: "px-3 py-1.5 text-xs rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
              children: "\uC2A4\uB2C8\uD3AB \uCD94\uAC00"
            }),
            e.jsx("button", {
              type: "button",
              onClick: b,
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
            onClick: (y) => y.stopPropagation(),
            onKeyDown: (y) => y.stopPropagation(),
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
                children: g ? e.jsx("span", {
                  className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                  children: Nt(g)
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
                    disabled: !g,
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
  function nn() {
    const [t, r] = a.useState([]), [s, d] = a.useState(false), [i, l] = a.useState(false), [o, c] = a.useState(null), [p, g] = a.useState(false), [k, h] = a.useState(null), [j, u] = a.useState(null), x = a.useCallback(async () => {
      c(null);
      try {
        const b = await sa();
        r(b.files), d(true);
      } catch (b) {
        c(b instanceof Error ? b.message : String(b)), d(true);
      }
    }, []);
    a.useEffect(() => {
      x();
    }, [
      x
    ]);
    const m = () => {
      h(null), g(true);
    }, E = (b) => {
      h(b), g(true);
    }, v = async () => {
      if (j) {
        l(true), c(null);
        try {
          const b = await la(j.id);
          r(b.files), u(null);
        } catch (b) {
          c(b instanceof Error ? b.message : String(b));
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
              children: na.map((b) => e.jsxs("li", {
                className: "flex items-center justify-between rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsx("div", {
                        className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                        style: {
                          fontFamily: b.name
                        },
                        children: b.name
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
              }, b.id))
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
                  disabled: !s || i,
                  onClick: m,
                  className: "inline-flex items-center gap-1 rounded bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
                  children: [
                    e.jsx($s, {
                      className: "h-3.5 w-3.5",
                      "aria-hidden": true
                    }),
                    "\uC6F9\uD3F0\uD2B8 \uCD94\uAC00"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: i,
                  onClick: () => {
                    x();
                  },
                  className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-fg dark:hover:bg-odp-focusBg",
                  children: [
                    e.jsx(_t, {
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
          children: t.map((b) => {
            const L = oa(b.css);
            return e.jsxs("li", {
              className: "flex flex-wrap items-center gap-2 rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: [
                e.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    e.jsx("div", {
                      className: "truncate text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                      children: b.name
                    }),
                    e.jsxs("div", {
                      className: "truncate text-[10px] text-gray-400 dark:text-odp-muted",
                      children: [
                        b.filename,
                        L.length ? ` \xB7 ${L.join(", ")}` : ""
                      ]
                    }),
                    L.length > 0 ? e.jsx("ul", {
                      className: "mt-1 flex flex-wrap gap-1",
                      children: L.map((y) => e.jsx("li", {
                        className: "rounded-full border border-gray-100 bg-gray-50 px-1.5 py-0.5 text-[10px] dark:border-odp-border dark:bg-odp-bg",
                        style: {
                          fontFamily: y
                        },
                        children: y
                      }, y))
                    }) : null
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: i,
                  onClick: () => E(b),
                  className: "inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg",
                  children: [
                    e.jsx(Ms, {
                      className: "h-3 w-3",
                      "aria-hidden": true
                    }),
                    "\uD3B8\uC9D1"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: i,
                  onClick: () => u(b),
                  className: "inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40",
                  children: [
                    e.jsx(Ft, {
                      className: "h-3 w-3",
                      "aria-hidden": true
                    }),
                    "\uC0AD\uC81C"
                  ]
                })
              ]
            }, b.id);
          })
        }) : e.jsx("p", {
          className: "text-xs text-gray-500 dark:text-odp-muted",
          children: "\uBD88\uB7EC\uC624\uB294 \uC911\u2026"
        }),
        e.jsx(da, {
          isOpen: p,
          initialFile: k,
          onClose: () => {
            g(false), h(null);
          },
          onSaved: () => {
            x();
          }
        }),
        e.jsx(we, {
          isOpen: !!j,
          title: "\uC6F9\uD3F0\uD2B8 \uC0AD\uC81C",
          message: j ? `"${j.name}" (${j.filename}) \uD30C\uC77C\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694\uAE4C\uC694?` : "",
          confirmLabel: "\uC0AD\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: () => {
            v();
          },
          onCancel: () => u(null)
        })
      ]
    });
  }
  let je = null, ve = null;
  function on() {
    je = null, ve = null;
  }
  async function dn() {
    return ce() ? je || ve || (ve = (async () => {
      try {
        const { invoke: t } = await Er(async () => {
          const { invoke: s } = await import("./index-RtVxfB8B.js").then(async (m) => {
            await m.__tla;
            return m;
          }).then((d) => d.j6);
          return {
            invoke: s
          };
        }, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])), r = await t("list_system_font_families");
        je = Array.isArray(r) ? r : [];
      } catch {
        je = [];
      } finally {
        ve = null;
      }
      return je ?? [];
    })(), ve) : [];
  }
  const jr = "Paperozi / A2z (\uAE30\uBCF8)";
  function ln() {
    const [t, r] = a.useState(() => Jt()), [s, d] = a.useState([]), [i, l] = a.useState(ce()), [o, c] = a.useState(0), p = a.useCallback(async () => {
      if (ce()) {
        l(true);
        try {
          on();
          const j = await dn();
          d(j);
        } finally {
          l(false);
        }
      }
    }, []);
    a.useEffect(() => {
      p();
    }, [
      p
    ]), a.useEffect(() => {
      const j = () => r(Jt()), u = () => c((x) => x + 1);
      return window.addEventListener(Qt, j), window.addEventListener(Zt, u), () => {
        window.removeEventListener(Qt, j), window.removeEventListener(Zt, u);
      };
    }, []);
    const g = a.useMemo(() => ia(s), [
      s,
      o
    ]), k = (j) => {
      r(j), er(j);
    }, h = () => {
      r(""), er("");
    };
    return e.jsxs("div", {
      className: "mb-4 border-b border-gray-200 pb-4 dark:border-odp-borderSoft",
      children: [
        e.jsxs("div", {
          className: "mb-2 flex flex-wrap items-center gap-x-2 gap-y-1",
          children: [
            e.jsx(Bs, {
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
            e.jsx(ca, {
              id: "settings-ui-font-family",
              value: t,
              onChange: k,
              options: g,
              placeholder: jr
            })
          ]
        }),
        e.jsxs("div", {
          className: "mt-3 flex flex-wrap items-center gap-2",
          children: [
            e.jsxs("button", {
              type: "button",
              onClick: h,
              className: "inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
              children: [
                e.jsx(tt, {
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
              disabled: i,
              className: "inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
              children: [
                e.jsx(tt, {
                  size: 14,
                  "aria-hidden": true
                }),
                i ? "\uC2DC\uC2A4\uD15C \uAE00\uAF34 \uBD88\uB7EC\uC624\uB294 \uC911\u2026" : "\uC2DC\uC2A4\uD15C \uAE00\uAF34 \uC0C8\uB85C\uACE0\uCE68"
              ]
            }) : null
          ]
        }),
        t ? null : e.jsxs("p", {
          className: "mt-2 text-[11px] text-gray-500 dark:text-odp-muted",
          children: [
            "\uD604\uC7AC: ",
            jr
          ]
        })
      ]
    });
  }
  function cn() {
    const [t, r] = a.useState([]), [s, d] = a.useState(false), [i, l] = a.useState(false), [o, c] = a.useState(null), [p, g] = a.useState(null), [k, h] = a.useState(false), j = a.useCallback(async () => {
      c(null);
      try {
        const x = await xa();
        r(x.templates), d(true);
      } catch (x) {
        c(x instanceof Error ? x.message : String(x)), r(ua().templates), d(true);
      }
    }, []);
    a.useEffect(() => {
      j();
    }, [
      j
    ]);
    const u = async (x) => {
      l(true), c(null);
      try {
        await ba({
          ...pa,
          templates: x
        }), r(x);
      } catch (m) {
        c(m instanceof Error ? m.message : String(m));
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
        o ? e.jsx("p", {
          className: "mb-2 text-xs text-red-600",
          children: o
        }) : null,
        e.jsxs("div", {
          className: "mb-3 flex gap-2",
          children: [
            e.jsx("button", {
              type: "button",
              disabled: !s || i,
              onClick: () => {
                const x = `template-${Date.now().toString(36)}`;
                g({
                  id: x,
                  name: "\uC0C8 \uD15C\uD50C\uB9BF",
                  sections: {},
                  rules: [
                    {
                      rows: "odd",
                      bg: "#f5f5f5"
                    }
                  ]
                }), h(true);
              },
              className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
              children: "\uC0C8 \uD15C\uD50C\uB9BF"
            }),
            e.jsx("button", {
              type: "button",
              disabled: i,
              onClick: () => {
                j();
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
                        g(x), h(true);
                      },
                      children: "\uD3B8\uC9D1"
                    }),
                    e.jsx("button", {
                      type: "button",
                      className: "rounded px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
                      onClick: () => {
                        u(t.filter((m) => m.id !== x.id));
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
        e.jsx(Us, {
          isOpen: k,
          template: p,
          onClose: () => {
            h(false), g(null);
          },
          onSave: (x) => {
            const m = t.filter((E) => E.id !== (p == null ? void 0 : p.id) && E.id !== x.id);
            u([
              ...m,
              x
            ]).then(() => {
              h(false), g(null);
            });
          }
        })
      ]
    });
  }
  const xn = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), un = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function Ze({ label: t, description: r, checked: s, onCheckedChange: d, ariaLabel: i }) {
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
        e.jsx(nt, {
          className: xn(s),
          checked: s,
          onCheckedChange: d,
          "aria-label": i,
          children: e.jsx(ot, {
            className: un
          })
        })
      ]
    });
  }
  function bn() {
    const [t, r] = a.useState(() => tr());
    return a.useEffect(() => {
      const s = () => r(tr());
      return s(), window.addEventListener(rr, s), () => window.removeEventListener(rr, s);
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
                e.jsx(Ze, {
                  label: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5",
                  description: "\uB4DC\uB798\uADF8 \uC2DC \uD398\uC774\uC9C0 \uAC00\uB85C\xB7\uC138\uB85C \uC911\uC559\uC120\uC5D0 \uB9DE\uCDA4",
                  checked: t.centerSnapEnabled,
                  onCheckedChange: (s) => H("settings-cover-center-snap", s),
                  ariaLabel: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5"
                }),
                e.jsxs("label", {
                  className: "block space-y-1 pt-1",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-400",
                      children: "\uD5C8\uC6A9 \uC624\uCC28"
                    }),
                    e.jsx(kr, {
                      unit: "css",
                      suffix: "px",
                      min: sr,
                      max: ar,
                      step: 0.1,
                      value: t.centerSnapTolerancePx,
                      "aria-label": "\uAC00\uC6B4\uB370 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (s) => ga(s)
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              className: "space-y-2 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: [
                e.jsx(Ze, {
                  label: "\uAC1C\uCCB4 \uC2A4\uB0C5",
                  description: "\uB2E4\uB978 \uAC1C\uCCB4\uC758 \uD14C\uB450\uB9AC\xB7\uAC00\uC6B4\uB370\uC120\uC5D0 \uB9DE\uCDA4 (\uADF8\uB8F9\uC740 \uD1B5\uC9F8\uB85C)",
                  checked: t.objectSnapEnabled,
                  onCheckedChange: (s) => H("settings-cover-object-snap", s),
                  ariaLabel: "\uAC1C\uCCB4 \uC2A4\uB0C5"
                }),
                e.jsxs("label", {
                  className: "block space-y-1 pt-1",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-400",
                      children: "\uD5C8\uC6A9 \uC624\uCC28"
                    }),
                    e.jsx(kr, {
                      unit: "css",
                      suffix: "px",
                      min: sr,
                      max: ar,
                      step: 0.1,
                      value: t.objectSnapTolerancePx,
                      "aria-label": "\uAC1C\uCCB4 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (s) => ma(s)
                    })
                  ]
                })
              ]
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(Ze, {
                label: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC",
                description: "\uC120\uD0DD\uACFC \uBB34\uAD00\uD558\uAC8C \uBAA8\uB4E0 \uD14D\uC2A4\uD2B8 \uC0C1\uC790\uB97C \uC605\uC740 \uBD89\uC740 \uC2E4\uC120\uC73C\uB85C \uD45C\uC2DC",
                checked: t.textContainerOutlineEnabled,
                onCheckedChange: (s) => H("settings-cover-text-outline", s),
                ariaLabel: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC"
              })
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(Ze, {
                label: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30",
                description: "\uD14D\uC2A4\uD2B8\xB7\uC774\uBBF8\uC9C0\xB7\uB3C4\uD615 \uC0BD\uC785 \uC2DC \uBC18\uD22C\uBA85 \uACE0\uC2A4\uD2B8 \uBBF8\uB9AC\uBCF4\uAE30",
                checked: t.placePreviewEnabled,
                onCheckedChange: (s) => H("settings-cover-place-preview", s),
                ariaLabel: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30"
              })
            }),
            e.jsxs("p", {
              className: "text-[11px] text-gray-500 dark:text-odp-muted",
              children: [
                "\uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28 \uAE30\uBCF8\uAC12 ",
                ha,
                "px \xB7 0.1px \uB2E8\uC704"
              ]
            })
          ]
        })
      ]
    });
  }
  function pn() {
    const [t, r] = a.useState(""), [s, d] = a.useState(""), [i, l] = a.useState(null), [o, c] = a.useState(false);
    a.useEffect(() => {
      const u = () => {
        const m = ja();
        r(m), d(m);
      };
      u(), fa().then((m) => {
        r(m.url), d(m.url);
      });
      const x = () => u();
      return window.addEventListener(nr, x), () => window.removeEventListener(nr, x);
    }, []);
    const p = or(t) !== s, g = or(t), k = !!String(t || "").trim() && !g, h = async () => {
      const u = String(t || "").trim();
      if (u && !g) {
        l("https:// \uB85C \uC2DC\uC791\uD558\uB294 Worker \uC8FC\uC18C\uB97C \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      c(true), l(null);
      try {
        const x = await dr(u);
        r(x), d(x), l(x ? `\uC800\uC7A5\uB428 \u2014 ${Ye}\uC5D0 \uAE30\uB85D\uD588\uACE0, OG \uC694\uCCAD \uC2DC \uC774 Worker\uB97C \uAC00\uC7A5 \uBA3C\uC800 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.` : `Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${Ye}).`);
      } finally {
        c(false);
      }
    }, j = async () => {
      c(true), l(null);
      try {
        r("");
        const u = await dr("");
        d(u), l(`Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${Ye}).`);
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
        e.jsx(ie, {
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
                    href: ya,
                    target: "_blank",
                    rel: "noreferrer noopener",
                    className: "inline-block",
                    children: e.jsx("img", {
                      src: ka,
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
                onChange: (u) => {
                  r(u.target.value), l(null);
                },
                onKeyDown: (u) => {
                  u.key === "Enter" && (u.preventDefault(), h());
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
                      h();
                    },
                    disabled: o || !p && !k,
                    className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                    children: o ? "\uC800\uC7A5 \uC911\u2026" : "\uC800\uC7A5"
                  }),
                  e.jsx("button", {
                    type: "button",
                    onClick: () => {
                      j();
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
              i ? e.jsx("p", {
                className: "mt-2 text-[11px] text-gray-600 dark:text-odp-muted",
                children: i
              }) : null
            ]
          })
        })
      ]
    });
  }
  function ne({ id: t, title: r, open: s, onOpenChange: d, children: i }) {
    const l = `settings-group-${t}`, o = `${l}-panel`, c = `${l}-title`;
    return e.jsxs(pe, {
      as: "section",
      id: l,
      contentKey: l,
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
        e.jsx(ie, {
          children: e.jsx("div", {
            id: o,
            className: "space-y-4 border-t border-gray-200 px-4 pb-4 pt-3 dark:border-odp-borderStrong",
            children: i
          })
        })
      ]
    });
  }
  function gn({ groups: t, activeSectionId: r, onNavigate: s }) {
    const [d, i] = a.useState(""), l = a.useMemo(() => va(t, d), [
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
                e.jsx(Ks, {
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
                e.jsx(st, {
                  size: 13,
                  className: "pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-odp-muted",
                  "aria-hidden": true
                }),
                e.jsx("input", {
                  type: "search",
                  value: d,
                  onChange: (c) => i(c.target.value),
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
            children: o ? `"${o}"\uC5D0 \uB9DE\uB294 \uADF8\uB8F9\xB7\uC139\uC158\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.` : "\uD45C\uC2DC\uD560 \uC124\uC815 \uC5C6\uC74C"
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
                  children: c.sections.map((p) => {
                    const g = r === p.id;
                    return e.jsx("li", {
                      children: e.jsx("button", {
                        type: "button",
                        onClick: () => s(p.id),
                        "aria-current": g ? "location" : void 0,
                        className: [
                          "w-full rounded-md px-2 py-1.5 text-left text-[11px] leading-snug transition",
                          g ? "bg-blue-100 font-semibold text-blue-900 dark:bg-blue-950/50 dark:text-blue-100" : "text-gray-700 hover:bg-white hover:text-gray-900 dark:text-odp-fg dark:hover:bg-odp-bgSoft dark:hover:text-odp-fgStrong"
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
  function mn({ open: t, extension: r, onOpenChange: s, onOpenFile: d }) {
    const i = (r == null ? void 0 : r.files) ?? [], l = r ? `${r.label} \uD30C\uC77C` : "\uD30C\uC77C \uBAA9\uB85D";
    return e.jsx(Vs, {
      open: t,
      onOpenChange: s,
      children: e.jsxs(Hs, {
        children: [
          e.jsx(Ys, {
            className: "fixed inset-0 z-100000 bg-black/40"
          }),
          e.jsxs(Xs, {
            className: "fixed top-1/2 left-1/2 z-100001 flex max-h-[min(90vh,40rem)] w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft",
            "aria-describedby": void 0,
            children: [
              e.jsxs("div", {
                className: "flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-odp-borderStrong",
                children: [
                  e.jsxs("div", {
                    className: "min-w-0",
                    children: [
                      e.jsx(qs, {
                        className: "truncate text-sm font-semibold text-gray-800 dark:text-odp-fgStrong",
                        children: l
                      }),
                      r ? e.jsxs("p", {
                        className: "mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted",
                        children: [
                          r.count.toLocaleString(),
                          "\uAC1C \xB7 ",
                          oe(r.size)
                        ]
                      }) : null
                    ]
                  }),
                  e.jsx(Js, {
                    asChild: true,
                    children: e.jsx("button", {
                      type: "button",
                      className: "inline-flex shrink-0 items-center justify-center rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-odp-focusBg dark:hover:text-odp-fg",
                      "aria-label": "\uB2EB\uAE30",
                      children: e.jsx(Pt, {
                        size: 16
                      })
                    })
                  })
                ]
              }),
              e.jsx("div", {
                className: "min-h-0 flex-1 overflow-y-auto",
                children: i.length === 0 ? e.jsx("p", {
                  className: "px-4 py-8 text-center text-xs text-gray-500 dark:text-odp-muted",
                  children: "\uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
                }) : e.jsx("ul", {
                  className: "divide-y divide-gray-100 dark:divide-odp-borderSoft",
                  children: i.map((o) => e.jsx("li", {
                    children: e.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        d(o);
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
                          children: oe(o.size)
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
  const hn = 160, vr = "settings-as-build-log-auto-scroll", fn = (t) => [
    "relative inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), yn = "block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[0.875rem]";
  function kn(t) {
    return t === "error" ? "text-red-600 dark:text-red-400" : t === "warn" ? "text-amber-700 dark:text-amber-300" : t === "ok" ? "text-emerald-700 dark:text-emerald-300" : "text-gray-600 dark:text-odp-muted";
  }
  function Dr({ logs: t, building: r, progress: s, className: d = "" }) {
    const i = a.useRef(null), [l, o] = a.useState(() => t ?? F.getBuildLogs().slice()), [c, p] = a.useState(() => r ?? F.getStatus().building), [g, k] = a.useState(() => s ?? F.getStatus().buildProgress), [h, j] = a.useState(() => Sa()), u = a.useRef(0);
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
    ]), a.useEffect(() => rt((x, m) => {
      x === vr && j(m);
    }), []), a.useEffect(() => {
      if (t) return;
      let x = false;
      const m = async () => {
        const b = ++u.current, L = await F.getBuildLogsAsync();
        x || b !== u.current || o(L);
      };
      m();
      const E = F.subscribeBuildLogs(() => {
        m();
      }), v = F.subscribe(() => {
        const b = F.getStatus();
        p(b.building), k(b.buildProgress);
      });
      return () => {
        x = true, E(), v();
      };
    }, [
      t
    ]), a.useEffect(() => {
      var _a2;
      !h || l.length === 0 || ((_a2 = i.current) == null ? void 0 : _a2.scrollToIndex(l.length - 1, {
        align: "end"
      }));
    }, [
      l,
      c,
      h
    ]), !c && l.length === 0 ? null : e.jsxs("div", {
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
                    e.jsx(nt, {
                      checked: h,
                      onCheckedChange: (x) => {
                        H(vr, x);
                      },
                      className: fn(h),
                      "aria-label": "\uC0C9\uC778 \uB85C\uADF8 \uC790\uB3D9 \uC2A4\uD06C\uB864",
                      children: e.jsx(ot, {
                        className: yn
                      })
                    })
                  ]
                }),
                c && typeof g == "number" ? e.jsxs("span", {
                  className: "text-[10px] tabular-nums text-amber-700 dark:text-amber-300",
                  children: [
                    Math.round(g * 100),
                    "%"
                  ]
                }) : null
              ]
            })
          ]
        }),
        c && typeof g == "number" ? e.jsx("div", {
          className: "h-0.5 w-full bg-gray-100 dark:bg-odp-bg",
          children: e.jsx("div", {
            className: "h-full bg-blue-500 transition-[width] duration-200 ease-out dark:bg-blue-400",
            style: {
              width: `${Math.min(100, Math.max(0, g * 100))}%`
            }
          })
        }) : null,
        l.length === 0 ? e.jsx("p", {
          className: "px-2.5 py-1.5 font-mono text-[10px] text-gray-400 dark:text-odp-muted",
          children: "\uB300\uAE30 \uC911\u2026"
        }) : e.jsx(Na, {
          ref: i,
          className: "overscroll-contain px-2.5 py-1.5 font-mono text-[10px] leading-relaxed",
          style: {
            height: hn
          },
          data: l,
          "aria-live": "polite",
          "aria-relevant": "additions",
          children: (x) => e.jsxs("div", {
            className: `whitespace-pre-wrap break-all ${kn(x.level)}`,
            children: [
              e.jsx("span", {
                className: "text-gray-400 dark:text-odp-muted",
                children: jn(x.at)
              }),
              " ",
              x.message
            ]
          }, x.id)
        })
      ]
    });
  }
  function jn(t) {
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
  function Ar({ isOpen: t, info: r, onResume: s, onStartFresh: d, onCancel: i }) {
    const l = (r == null ? void 0 : r.processedFileCount) ?? 0, o = (r == null ? void 0 : r.processedChatCount) ?? 0, c = l + o, p = (r == null ? void 0 : r.updatedAt) && r.updatedAt > 0 ? new Date(r.updatedAt).toLocaleString() : null;
    return e.jsx(we, {
      isOpen: t,
      title: "\uC911\uC9C0\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8",
      message: c > 0 ? `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778\uC774 \uC788\uC2B5\uB2C8\uB2E4.
\uCC98\uB9AC\uB428: \uD30C\uC77C ${l} \xB7 \uCC44\uD305 day ${o}${p ? `
\uC800\uC7A5 \uC2DC\uAC01: ${p}` : ""}

\uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAE4C\uC694, \uC544\uB2C8\uBA74 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uB9CC\uB4E4\uAE4C\uC694?` : `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4.
\uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAE4C\uC694, \uC544\uB2C8\uBA74 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uB9CC\uB4E4\uAE4C\uC694?`,
      confirmLabel: "\uC774\uC5B4\uC11C \uC0C9\uC778",
      discardLabel: "\uCC98\uC74C\uBD80\uD130",
      cancelLabel: "\uCDE8\uC18C",
      onConfirm: s,
      onDiscard: d,
      onCancel: i
    });
  }
  const vn = 400;
  function _r() {
    const [t, r] = a.useState(() => F.getStatus()), s = a.useRef(t.building);
    return a.useEffect(() => {
      let d = null, i = false;
      const l = () => {
        const o = F.getStatus();
        s.current = o.building, r(o);
      };
      return F.subscribe(() => {
        const o = F.getStatus(), c = s.current && !o.building;
        if (s.current = o.building, c) {
          d && (clearTimeout(d), d = null), i = false, l();
          return;
        }
        if (d) {
          i = true;
          return;
        }
        l(), d = setTimeout(() => {
          d = null, i && (i = false, l());
        }, vn);
      });
    }, []), t;
  }
  function dt(t) {
    return t.building && t.indexBuildCancellable;
  }
  function At(t) {
    return t.building && !t.indexBuildCancellable;
  }
  function Pr(t) {
    return dt(t);
  }
  function et(t, r = false) {
    return r || !t.enabled || !t.isolationReady ? false : !dt(t);
  }
  function zr(t) {
    return dt(t) || At(t) ? typeof t.buildProgress == "number" ? `\uC0C9\uC778 \uC911 ${Math.round(t.buildProgress * 100)}%` : "\uC0C9\uC778 \uC911\u2026" : t.hasCheckpoint ? "\uC0C9\uC778 \uC7AC\uAC1C/\uB2E4\uC2DC \uC2DC\uC791" : t.hasIndex ? "\uB2E4\uC2DC \uC0C9\uC778" : "\uC0C9\uC778";
  }
  const Ae = [
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
  ], Sn = `linear-gradient(90deg, ${Ae.map((t) => `rgb(${t.rgb.join(" ")}) ${(t.t * 100).toFixed(2)}%`).join(", ")})`;
  function Sr(t) {
    return Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : 0;
  }
  function wt(t, r, s) {
    return Math.round(t + (r - t) * s);
  }
  function Nn(t) {
    const r = Sr(t / 100);
    let s = 0;
    for (; s < Ae.length - 2 && r > Ae[s + 1].t; ) s += 1;
    const d = Ae[s], i = Ae[s + 1], l = i.t - d.t || 1, o = Sr((r - d.t) / l), c = wt(d.rgb[0], i.rgb[0], o), p = wt(d.rgb[1], i.rgb[1], o), g = wt(d.rgb[2], i.rgb[2], o);
    return `rgb(${c} ${p} ${g})`;
  }
  function Nr({ percent: t }) {
    const r = Nn(t);
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
  function wn() {
    return e.jsxs("div", {
      className: "space-y-0.5",
      "aria-label": "\uC6A9\uB7C9 \uBE44\uC728 \uC0C9\uC0C1 \uBC94\uB840",
      children: [
        e.jsx("div", {
          className: "h-1.5 w-full rounded-full border border-gray-200 dark:border-odp-borderStrong",
          style: {
            backgroundImage: Sn
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
  function Cn(t) {
    return t === me ? "Local Haim" : t === Se ? "WebDAV Haim" : t === de ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function En() {
    return e.jsx("div", {
      className: "flex h-40 min-h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-white text-xs text-gray-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted md:h-full md:min-h-48",
      children: "\uADF8\uB798\uD504 \uC900\uBE44\uC911"
    });
  }
  function On({ depth: t, expandable: r, expanded: s, label: d }) {
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
          children: s ? e.jsx(Ir, {
            size: 14
          }) : e.jsx(Lr, {
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
  function Ct({ columns: t, rows: r, emptyText: s = "\uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", maxHeightClass: d = "max-h-64", legendColumnKey: i = null }) {
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
            children: r.length === 0 ? e.jsx("tr", {
              children: e.jsx("td", {
                colSpan: t.length,
                className: "px-3 py-6 text-center text-gray-500 dark:text-odp-muted",
                children: s
              })
            }) : r.map((l, o) => {
              var _a2, _b, _c, _d;
              const c = typeof l._onClick == "function", p = ((_a2 = l._tree) == null ? void 0 : _a2.expandable) ? l._tree.expanded : void 0, g = (_c = (_b = r[o - 1]) == null ? void 0 : _b._tree) == null ? void 0 : _c.depth, k = (_d = l._tree) == null ? void 0 : _d.depth, h = o > 0 && typeof g == "number" && typeof k == "number" && k < g, j = (u) => {
                var _a3;
                c && (u.key !== "Enter" && u.key !== " " || (u.preventDefault(), (_a3 = l._onClick) == null ? void 0 : _a3.call(l)));
              };
              return e.jsx("tr", {
                onClick: c ? l._onClick : void 0,
                onKeyDown: j,
                tabIndex: c ? 0 : void 0,
                "aria-expanded": p,
                className: `hover:bg-gray-50 dark:hover:bg-odp-focusBg/40 ${c ? "cursor-pointer" : ""}`,
                children: t.map((u) => {
                  const x = u.tree ? l._tree : void 0;
                  return e.jsx("td", {
                    className: `px-3 py-1.5 text-gray-700 dark:text-odp-fg ${h ? "border-t-2 border-gray-300 dark:border-odp-borderStrong" : "border-t border-gray-100 dark:border-odp-borderSoft"} ${u.align === "right" ? "text-right tabular-nums" : ""} ${u.className ?? ""}`,
                    children: x ? e.jsx(On, {
                      depth: x.depth,
                      expandable: x.expandable,
                      expanded: x.expanded,
                      label: x.label
                    }) : l[u.key]
                  }, u.key);
                })
              }, l._key ?? o);
            })
          }),
          i ? e.jsx("tfoot", {
            children: e.jsx("tr", {
              children: t.map((l) => e.jsx("td", {
                className: "sticky bottom-0 border-t border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: l.key === i ? e.jsx(wn, {}) : null
              }, l.key))
            })
          }) : null
        ]
      })
    });
  }
  function In(t, r) {
    const s = /* @__PURE__ */ new Set(), d = [];
    for (const i of t) (i.parentPath == null || s.has(i.parentPath) && r.has(i.parentPath)) && (d.push(i), s.add(i.path));
    return d;
  }
  function Et({ title: t, open: r, onToggle: s, children: d }) {
    return e.jsxs(pe, {
      contentKey: t,
      open: r,
      onOpenChange: (i) => {
        i !== r && s();
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
        e.jsx(ie, {
          children: e.jsxs("div", {
            className: "grid grid-cols-1 gap-3 border-t border-gray-200 p-3 dark:border-odp-borderStrong md:grid-cols-[minmax(10rem,14rem)_minmax(0,1fr)] md:items-stretch",
            children: [
              e.jsx("div", {
                className: "min-w-0",
                children: e.jsx(En, {})
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
  function Ln({ storageMode: t = de, onScanTree: r, canScan: s = true, onOpenFile: d }) {
    const [i, l] = a.useState(false), [o, c] = a.useState(null), [p, g] = a.useState(null), [k, h] = a.useState(() => /* @__PURE__ */ new Set()), [j, u] = a.useState(null), [x, m] = a.useState({
      summary: true,
      extension: false,
      folder: false
    }), [E, v] = a.useState(false), b = _r(), [L, y] = a.useState(false), [I, N] = a.useState(null), [_, z] = a.useState(false);
    a.useEffect(() => {
      b.building || v(false);
    }, [
      b.building
    ]), a.useEffect(() => {
      F.refreshCheckpointStatus();
    }, []), a.useEffect(() => {
      g(null), c(null), h(/* @__PURE__ */ new Set()), u(null), m({
        summary: true,
        extension: false,
        folder: false
      });
    }, [
      t
    ]);
    const P = (w) => {
      m((W) => ({
        ...W,
        [w]: !W[w]
      }));
    }, B = (w) => {
      h((W) => {
        const Y = new Set(W);
        return Y.has(w) ? Y.delete(w) : Y.add(w), Y;
      });
    }, Z = async () => {
      if (!(!r || !s || i)) {
        l(true), c(null);
        try {
          const w = await r();
          g(en(w)), h(/* @__PURE__ */ new Set()), u(null);
        } catch (w) {
          const W = w instanceof Error ? w.message : String(w);
          c(W || "\uC6A9\uB7C9 \uBD84\uC11D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."), g(null), h(/* @__PURE__ */ new Set()), u(null);
        } finally {
          l(false);
        }
      }
    }, A = (w) => {
      et(b, E) && (v(true), F.rebuild({
        resume: w
      }).finally(() => v(false)));
    }, $ = () => {
      et(b, E) && (async () => {
        const w = await F.getRebuildCheckpointInfo();
        if (w) {
          N(w), y(true);
          return;
        }
        if (b.hasIndex) {
          z(true);
          return;
        }
        A(false);
      })();
    }, K = () => {
      F.cancelRebuild();
    }, R = p == null ? void 0 : p.summary, Ce = R && R.totalSize > 0 ? R.indexSize / R.totalSize * 100 : 0, xe = R ? [
      {
        label: "\uCD1D \uC6A9\uB7C9",
        value: oe(R.totalSize)
      },
      {
        label: "\uC0C9\uC778 \uB370\uC774\uD130 (.advanced-search)",
        value: `${oe(R.indexSize)} \xB7 ${R.indexFileCount.toLocaleString()}\uAC1C \uD30C\uC77C${R.totalSize > 0 ? ` \xB7 ${Ce.toFixed(1)}%` : ""}`
      },
      {
        label: "\uC0C9\uC778 \uC81C\uC678 \uC6A9\uB7C9",
        value: oe(Math.max(0, R.totalSize - R.indexSize))
      },
      {
        label: "\uD30C\uC77C \uC218",
        value: R.fileCount.toLocaleString()
      },
      {
        label: "\uD3F4\uB354 \uC218",
        value: R.folderCount.toLocaleString()
      },
      {
        label: "0 byte \uD30C\uC77C",
        value: R.zeroByteCount.toLocaleString()
      },
      ...R.unknownSizeCount > 0 ? [
        {
          label: "\uD06C\uAE30 \uBBF8\uD655\uC778 \uD30C\uC77C",
          value: R.unknownSizeCount.toLocaleString()
        }
      ] : []
    ] : [], ee = In((p == null ? void 0 : p.folders) ?? [], k);
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
                      children: Cn(t)
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
                  disabled: !s || !et(b, E),
                  className: "inline-flex items-center gap-1.5 rounded border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                  title: b.enabled ? b.isolationReady ? "\uC5ED\uC0C9\uC778\uC744 \uBC31\uADF8\uB77C\uC6B4\uB4DC\uB85C \uC0DD\uC131\uD569\uB2C8\uB2E4" : "\uC6F9\uC5D0\uC11C\uB294 \uAC80\uC0C9 \uACA9\uB9AC(COOP/COEP)\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694" : "\uC124\uC815\uC5D0\uC11C \uC5ED\uC0C9\uC778\uC744 \uCF20 \uB4A4 \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",
                  children: [
                    E || b.building ? e.jsx(Pe, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(st, {
                      size: 14
                    }),
                    zr(b)
                  ]
                }),
                Pr(b) ? e.jsxs("button", {
                  type: "button",
                  onClick: K,
                  className: "inline-flex items-center gap-1.5 rounded border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60",
                  title: "\uC0C9\uC778\uC744 \uC911\uC9C0\uD569\uB2C8\uB2E4. \uCCB4\uD06C\uD3EC\uC778\uD2B8\uB294 \uC720\uC9C0\uB418\uC5B4 \uC774\uC5B4\uC11C \uC7AC\uAC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                  children: [
                    e.jsx(yr, {
                      size: 14
                    }),
                    "\uC911\uC9C0"
                  ]
                }) : b.building ? e.jsxs("button", {
                  type: "button",
                  disabled: true,
                  className: "inline-flex items-center gap-1.5 rounded border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 opacity-50 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200",
                  title: "\uC0C9\uC778\uC774 \uC644\uB8CC\uB418\uC5B4 \uC800\uC7A5 \uC911\uC785\uB2C8\uB2E4.",
                  children: [
                    e.jsx(yr, {
                      size: 14
                    }),
                    "\uC911\uC9C0"
                  ]
                }) : null,
                e.jsxs("button", {
                  type: "button",
                  onClick: Z,
                  disabled: !s || i || typeof r != "function",
                  className: "inline-flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
                  children: [
                    i ? e.jsx(Pe, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(_t, {
                      size: 14
                    }),
                    i ? "\uBD84\uC11D \uC911\u2026" : p ? "\uB2E4\uC2DC \uBD84\uC11D" : "\uBD84\uC11D \uC2DC\uC791"
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
        e.jsx(Dr, {}),
        e.jsx(Ar, {
          isOpen: L,
          info: I,
          onCancel: () => {
            y(false), N(null);
          },
          onResume: () => {
            y(false), N(null), A(true);
          },
          onStartFresh: () => {
            y(false), N(null), A(false);
          }
        }),
        e.jsx(we, {
          isOpen: _,
          title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
          message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
          confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
          cancelLabel: "\uCDE8\uC18C",
          onConfirm: () => {
            z(false), A(false);
          },
          onCancel: () => z(false)
        }),
        o && e.jsx("p", {
          className: "whitespace-pre-wrap text-xs text-red-600 dark:text-red-400",
          children: o
        }),
        e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsx(Et, {
              title: "\uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: x.summary,
              onToggle: () => P("summary"),
              children: e.jsx(Ct, {
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
            e.jsx(Et, {
              title: "\uD30C\uC77C \uD615\uC2DD\uBCC4 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: x.extension,
              onToggle: () => P("extension"),
              children: e.jsx(Ct, {
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
                  size: oe(w.size),
                  percent: e.jsx(Nr, {
                    percent: w.percent
                  }),
                  _onClick: () => u(w)
                })),
                emptyText: "\uBD84\uC11D\uC744 \uC2DC\uC791\uD558\uBA74 \uD615\uC2DD\uBCC4 \uC6A9\uB7C9\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4.",
                legendColumnKey: "percent"
              })
            }),
            e.jsx(Et, {
              title: "\uD3F4\uB354\uBCC4 \uC6A9\uB7C9 (Tree Size)",
              open: x.folder,
              onToggle: () => P("folder"),
              children: e.jsx(Ct, {
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
                  const W = k.has(w.path);
                  return {
                    _key: w.path,
                    fileCount: w.fileCount.toLocaleString(),
                    size: oe(w.size),
                    percent: e.jsx(Nr, {
                      percent: w.percent
                    }),
                    ...w.hasChildFolders ? {
                      _onClick: () => B(w.path)
                    } : {},
                    _tree: {
                      depth: w.depth,
                      expandable: w.hasChildFolders,
                      expanded: W,
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
        e.jsx(mn, {
          open: j != null,
          extension: j,
          onOpenChange: (w) => {
            w || u(null);
          },
          onOpenFile: async (w) => {
            u(null), await (d == null ? void 0 : d(w));
          }
        })
      ]
    });
  }
  function zt(t) {
    return String(t || "").replace(/^\/+/, "");
  }
  function Tn(t) {
    const r = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
    for (const [d, i] of t) {
      if (i.kind === "file") {
        r.add(zt(i.path));
        continue;
      }
      const l = wa(d);
      l && s.add(l.dateStr);
    }
    return {
      files: r,
      chatDates: s
    };
  }
  function Fn(t, r) {
    const s = zt(t);
    if (Or(s)) {
      const d = Ea(s);
      return !!(d && r.chatDates.has(d));
    }
    return r.files.has(s);
  }
  function wr(t, r, s) {
    let d = 0, i = 0;
    const l = (o) => {
      var _a2;
      if (o.type === "file" && o.path) {
        const c = zt(o.path);
        if (!(Or(c) || Ca(c, s))) return;
        d += 1, Fn(c, r) && (i += 1);
        return;
      }
      if ((_a2 = o.children) == null ? void 0 : _a2.length) for (const c of o.children) l(c);
    };
    return l(t), {
      indexableCount: d,
      indexedCount: i
    };
  }
  function Cr(t, r) {
    return r <= 0 ? 0 : t / r * 100;
  }
  function Rr(t, r) {
    return r <= 0 ? "\u2014" : t > 0 && t < 0.1 ? "< 0.1%" : `${t.toFixed(1)}%`;
  }
  function Dn(t, r, s = {}) {
    const d = Array.isArray(t) ? t : [], i = Tn(r);
    let l = 0, o = 0;
    const c = [], p = (g, k, h) => {
      var _a2;
      const j = g.filter((u) => u.type === "folder").map((u) => ({
        node: u,
        ...wr(u, i, s)
      })).sort((u, x) => x.indexableCount - u.indexableCount || u.node.name.localeCompare(x.node.name));
      for (const { node: u, indexableCount: x, indexedCount: m } of j) {
        const E = u.path || `${u.name}/`, v = (u.children ?? []).some((L) => L.type === "folder"), b = Cr(m, x);
        c.push({
          path: E,
          name: u.name,
          depth: k,
          parentPath: h,
          hasChildFolders: v,
          indexableCount: x,
          indexedCount: m,
          percent: b
        }), ((_a2 = u.children) == null ? void 0 : _a2.length) && p(u.children, k + 1, E);
      }
    };
    for (const g of d) {
      const k = wr(g, i, s);
      l += k.indexableCount, o += k.indexedCount;
    }
    return p(d, 0, null), {
      summary: {
        indexableCount: l,
        indexedCount: o,
        percent: Cr(o, l)
      },
      folders: c
    };
  }
  const An = `${Ta} min-w-[200px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft`;
  function _n(t) {
    return t === me ? "Local Haim" : t === Se ? "WebDAV Haim" : t === de ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function Pn(t) {
    const r = Math.min(1, Math.max(0, t / 100)), s = Math.round(255 * (1 - r) + 34 * r), d = Math.round(68 * (1 - r) + 197 * r), i = Math.round(68 * (1 - r) + 94 * r);
    return `rgb(${s} ${d} ${i})`;
  }
  function zn(t, r) {
    const s = /* @__PURE__ */ new Set(), d = [];
    for (const i of t) (i.parentPath == null || s.has(i.parentPath) && r.has(i.parentPath)) && (d.push(i), s.add(i.path));
    return d;
  }
  function Rn({ percent: t, indexableCount: r, className: s = "" }) {
    const d = r > 0 ? Math.min(100, Math.max(0, t)) : 0;
    return e.jsx("div", {
      className: `h-3 w-28 shrink-0 overflow-hidden rounded-sm bg-gray-900/90 dark:bg-black/50 ${s}`,
      "aria-hidden": true,
      children: e.jsx("div", {
        className: "h-full min-w-0 transition-[width] duration-150",
        style: {
          width: `${d}%`,
          backgroundColor: Pn(t)
        }
      })
    });
  }
  function $n({ depth: t, expandable: r, expanded: s, label: d }) {
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
          children: s ? e.jsx(Ir, {
            size: 14
          }) : e.jsx(Lr, {
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
  function Mn({ row: t, index: r, expanded: s, building: d, indexEnabled: i, onToggle: l, onIndexFolder: o }) {
    const c = Oa(), { contextMenuOpen: p, setContextMenuOpen: g, longPressOpenedRef: k, bindPress: h } = Ia({
      enabled: true,
      coarse: c
    }), j = t.hasChildFolders, u = _e(t.path), x = i && !d && !u, m = Rr(t.percent, t.indexableCount), E = (b) => {
      j && (b.key !== "Enter" && b.key !== " " || (b.preventDefault(), l(t.path)));
    }, v = e.jsxs("li", {
      className: `flex items-center gap-2 rounded px-1 py-0.5 ${j ? "cursor-pointer hover:bg-white/5 focus-visible:outline-1 focus-visible:outline-blue-400" : ""}`,
      onClick: () => {
        if (c && k.current) {
          k.current = false;
          return;
        }
        j && l(t.path);
      },
      onKeyDown: E,
      tabIndex: j ? 0 : void 0,
      "aria-expanded": j ? s : void 0,
      ...c ? h : {},
      children: [
        e.jsx("span", {
          className: "w-5 shrink-0 text-right tabular-nums text-gray-500",
          children: r + 1
        }),
        e.jsx("span", {
          className: "min-w-0 flex-1 overflow-hidden",
          children: e.jsx($n, {
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
        e.jsx(Rn, {
          percent: t.percent,
          indexableCount: t.indexableCount
        }),
        e.jsx("span", {
          className: "w-12 shrink-0 text-right tabular-nums text-gray-200",
          children: m
        })
      ]
    });
    return e.jsx(La, {
      ...c ? {
        open: p,
        onOpenChange: g
      } : {},
      title: t.path.replace(/\/$/, "") || t.name,
      subtitle: "\uD3F4\uB354 \uCEE4\uBC84\uB9AC\uC9C0",
      contentClassName: An,
      trigger: v,
      children: e.jsxs(Fa, {
        className: Da,
        disabled: !x,
        onSelect: () => {
          x && o(t.path);
        },
        children: [
          e.jsx(st, {
            size: 14
          }),
          "\uC774 \uD3F4\uB354 \uC5ED\uC0C9\uC778",
          u ? " (\uC2DC\uC2A4\uD15C \uC81C\uC678)" : ""
        ]
      })
    });
  }
  function Bn({ storageMode: t = de, onScanTree: r, canScan: s = true, embedded: d = false }) {
    const [i, l] = a.useState(false), [o, c] = a.useState(null), [p, g] = a.useState(null), [k, h] = a.useState(() => /* @__PURE__ */ new Set()), [j, u] = a.useState(0), x = a.useRef(null), m = a.useRef(false), E = a.useRef(false), v = a.useRef(r), b = a.useRef(s);
    a.useEffect(() => {
      v.current = r, b.current = s;
    }, [
      r,
      s
    ]);
    const L = a.useCallback(async () => {
      const A = v.current;
      if (!(!A || !b.current || E.current)) {
        E.current = true, l(true), c(null);
        try {
          const $ = await A();
          g($), h(/* @__PURE__ */ new Set());
        } catch ($) {
          const K = $ instanceof Error ? $.message : String($);
          c(K || "\uD3F4\uB354 \uD2B8\uB9AC\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."), g(null), h(/* @__PURE__ */ new Set());
        } finally {
          E.current = false, l(false);
        }
      }
    }, []);
    a.useEffect(() => F.subscribe(() => {
      if (F.getStatus().building) {
        if (m.current || (m.current = true, L()), x.current) return;
        x.current = setTimeout(() => {
          x.current = null, u(($) => $ + 1);
        }, 500);
        return;
      }
      m.current = false, x.current && (clearTimeout(x.current), x.current = null), u(($) => $ + 1);
    }), [
      L
    ]), a.useEffect(() => {
      F.getStatus().building && (m.current || (m.current = true, L()));
    }, [
      L
    ]), a.useEffect(() => () => {
      x.current && clearTimeout(x.current);
    }, []), a.useEffect(() => {
      g(null), c(null), h(/* @__PURE__ */ new Set()), m.current = false;
    }, [
      t
    ]);
    const y = F.getStatus(), I = a.useMemo(() => p ? Dn(p, F.getIndex().docs, {
      includeOtherFiles: y.includeOtherFiles,
      excludedFolders: y.excludedFolders
    }) : null, [
      p,
      j,
      y.includeOtherFiles,
      y.excludedFolders
    ]), N = zn((I == null ? void 0 : I.folders) ?? [], k), _ = (A) => {
      h(($) => {
        const K = new Set($);
        return K.has(A) ? K.delete(A) : K.add(A), K;
      });
    }, z = () => {
      L();
    }, P = a.useCallback((A) => {
      F.rebuild({
        folderPath: A,
        ignoreExcludedFolders: true
      });
    }, []), B = I == null ? void 0 : I.summary, Z = B ? Rr(B.percent, B.indexableCount) : "\u2014";
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
                      children: _n(t)
                    }),
                    ". \uD3F4\uB354\uBCC4\uB85C \uC0C9\uC778 \uB300\uC0C1 \uD30C\uC77C \uC911 \uC5ED\uC0C9\uC778\uB41C \uBE44\uC728\uC744 \uD45C\uC2DC\uD569\uB2C8\uB2E4.",
                    y.includeOtherFiles ? " (Markdown + \uAE30\uD0C0 \uD14D\uC2A4\uD2B8 \uD30C\uC77C)" : " (Markdown\uB9CC)",
                    y.building ? " \uC0C9\uC778 \uC2DC\uC791 \uC2DC \uD3F4\uB354 \uD2B8\uB9AC\uB97C \uC790\uB3D9\uC73C\uB85C \uBD88\uB7EC\uC624\uACE0, \uC9C4\uD589\uB3C4\uAC00 \uAC31\uC2E0\uB429\uB2C8\uB2E4." : ""
                  ]
                })
              ]
            }),
            e.jsxs("button", {
              type: "button",
              onClick: z,
              disabled: !s || i || typeof r != "function",
              className: "inline-flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
              children: [
                i ? e.jsx(Pe, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(_t, {
                  size: 14
                }),
                i ? "\uBD88\uB7EC\uC624\uB294 \uC911\u2026" : p ? "\uB2E4\uC2DC \uBD88\uB7EC\uC624\uAE30" : "\uD3F4\uB354 \uD2B8\uB9AC \uBD88\uB7EC\uC624\uAE30"
              ]
            })
          ]
        }),
        !s && e.jsx("p", {
          className: "text-xs text-amber-700 dark:text-amber-300",
          children: "\uC120\uD0DD\uD55C \uC800\uC7A5\uC18C\uAC00 \uC544\uC9C1 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC5F0\uACB0 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694."
        }),
        !y.enabled && e.jsx("p", {
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
            children: i ? "\uD3F4\uB354 \uD2B8\uB9AC\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026" : p ? "\uD45C\uC2DC\uD560 \uD3F4\uB354\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." : y.building ? "\uC0C9\uC778 \uC2DC\uC791\uC5D0 \uB9DE\uCDB0 \uD3F4\uB354 \uD2B8\uB9AC\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026" : "\u300C\uD3F4\uB354 \uD2B8\uB9AC \uBD88\uB7EC\uC624\uAE30\u300D\uB97C \uB204\uB974\uAC70\uB098 \uC0C9\uC778\uC744 \uC2DC\uC791\uD558\uBA74 \uC5ED\uC0C9\uC778 \uD604\uD669\uC744 \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
          }) : e.jsx("ul", {
            className: "space-y-0.5",
            children: N.map((A, $) => e.jsx(Mn, {
              row: A,
              index: $,
              expanded: k.has(A.path),
              building: y.building,
              indexEnabled: y.enabled,
              onToggle: _,
              onIndexFolder: P
            }, A.path))
          })
        }),
        e.jsx("p", {
          className: "text-[10px] text-gray-500 dark:text-odp-muted",
          children: "\uD3F4\uB354\uB97C \uD074\uB9AD\uD574 \uD558\uC704 \uD3F4\uB354\uB97C \uD3BC\uCE69\uB2C8\uB2E4. \uC6B0\uD074\uB9AD(\uB610\uB294 \uAE38\uAC8C \uB204\uB974\uAE30)\uC73C\uB85C \uD574\uB2F9 \uD3F4\uB354\uB9CC \uC5ED\uC0C9\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4(\uC81C\uC678 \uD3F4\uB354 \uC124\uC815\uC744 \uBB34\uC2DC\uD558\uACE0 \uBCD1\uD569 \uC0C9\uC778). \uCC44\uD305 day \uD30C\uC77C\uC740 \uD574\uB2F9 \uB0A0\uC9DC \uBA54\uC2DC\uC9C0\uAC00 \uD558\uB098\uB77C\uB3C4 \uC0C9\uC778\uB418\uBA74 \uC644\uB8CC\uB85C \uC9D1\uACC4\uD569\uB2C8\uB2E4."
        })
      ]
    });
  }
  const Kn = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), Wn = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function Gn(t) {
    return t === me ? "Local Haim" : t === Se ? "WebDAV Haim" : t === de ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function Un({ storageMode: t, canScan: r = false, onScanTree: s, onReadText: d, onReadBytes: i, onDeletePaths: l }) {
    const [o, c] = a.useState(() => Aa()), [p, g] = a.useState("notes"), [k, h] = a.useState("trash"), [j, u] = a.useState(false), [x, m] = a.useState(false), [E, v] = a.useState(null), [b, L] = a.useState(null), [y, I] = a.useState(""), [N, _] = a.useState([]), [z, P] = a.useState(() => /* @__PURE__ */ new Set()), [B, Z] = a.useState([]), [A, $] = a.useState(() => /* @__PURE__ */ new Set()), [K, R] = a.useState({}), [Ce, xe] = a.useState(false), [ee, w] = a.useState([]), [W, Y] = a.useState({}), [Ee, Re] = a.useState(false), le = a.useRef(null);
    a.useEffect(() => rt((f, C) => {
      f === "settings-orphan-image-auto" && c(C);
    }), []), a.useEffect(() => () => {
      var _a2;
      (_a2 = le.current) == null ? void 0 : _a2.abort();
    }, []);
    const re = j || x || Ee, $e = async () => {
      var _a2;
      if (!r || !s || !d || re) return;
      (_a2 = le.current) == null ? void 0 : _a2.abort();
      const f = new AbortController();
      le.current = f, u(true), I(""), v(null);
      try {
        const C = await s();
        if (f.signal.aborted) return;
        const T = lr(C, p), D = _a(C), M = /* @__PURE__ */ new Set();
        if (await Pa(D, 6, async (G) => {
          try {
            const q = await d(G);
            for (const Ke of za(q)) M.add(Ke);
          } catch {
          }
        }, {
          signal: f.signal,
          onProgress: (G, q) => v({
            done: G,
            total: q
          })
        }), f.signal.aborted) return;
        const U = Ra({
          images: T,
          referencedPaths: M
        });
        _(U), P(new Set(U.map((G) => G.path)));
      } catch (C) {
        if ((C == null ? void 0 : C.name) === "AbortError") return;
        I(C instanceof Error ? C.message : String(C));
      } finally {
        u(false), v(null);
      }
    }, Me = async () => {
      var _a2;
      if (!r || !s || !i || re) return;
      (_a2 = le.current) == null ? void 0 : _a2.abort();
      const f = new AbortController();
      le.current = f, m(true), I(""), L(null);
      try {
        const C = await s();
        if (f.signal.aborted) return;
        const T = lr(C, p), D = await $a(T, i, {
          signal: f.signal,
          onProgress: (G, q) => L({
            done: G,
            total: q
          })
        });
        if (f.signal.aborted) return;
        Z(D);
        const M = {}, U = /* @__PURE__ */ new Set();
        for (const G of D) {
          M[G.hash] = G.keepPath;
          for (const q of G.files) q.path !== G.keepPath && U.add(q.path);
        }
        R(M), $(U);
      } catch (C) {
        if ((C == null ? void 0 : C.name) === "AbortError") return;
        I(C instanceof Error ? C.message : String(C));
      } finally {
        m(false), L(null);
      }
    }, fe = (f) => {
      P((C) => {
        const T = new Set(C);
        return T.has(f) ? T.delete(f) : T.add(f), T;
      });
    }, ae = (f, C) => {
      const T = K[C];
      f !== T && $((D) => {
        const M = new Set(D);
        return M.has(f) ? M.delete(f) : M.add(f), M;
      });
    }, lt = (f, C) => {
      R((T) => ({
        ...T,
        [f]: C
      })), $((T) => {
        const D = new Set(T), M = B.find((U) => U.hash === f);
        if (!M) return D;
        for (const U of M.files) U.path === C ? D.delete(U.path) : D.add(U.path);
        return D;
      });
    }, it = () => {
      const f = {};
      for (const C of B) {
        const T = K[C.hash];
        if (T) for (const D of C.files) D.path !== T && A.has(D.path) && (f[D.path] = T);
      }
      return f;
    }, Be = (f, C) => {
      !f.length || !l || (w(f), Y(C ?? {}), xe(true));
    }, ct = async () => {
      if (!(!l || !ee.length)) {
        Re(true), I("");
        try {
          const f = Object.keys(W).length ? W : void 0;
          await l(ee, k, f ? {
            pathRemap: f
          } : void 0);
          const C = new Set(ee);
          _((T) => T.filter((D) => !C.has(D.path))), P((T) => {
            const D = new Set(T);
            for (const M of C) D.delete(M);
            return D;
          }), Z((T) => T.map((D) => ({
            ...D,
            files: D.files.filter((M) => !C.has(M.path))
          })).filter((D) => D.files.length >= 2)), $((T) => {
            const D = new Set(T);
            for (const M of C) D.delete(M);
            return D;
          }), xe(false), w([]), Y({});
        } catch (f) {
          I(f instanceof Error ? f.message : String(f));
        } finally {
          Re(false);
        }
      }
    }, X = z.size, te = A.size, ue = k === "hard";
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
                Gn(t),
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
            e.jsx(nt, {
              className: Kn(o),
              checked: o,
              onCheckedChange: (f) => H("settings-orphan-image-auto", f),
              "aria-label": "\uB178\uD2B8 \uC0AD\uC81C \uC2DC \uC774\uBBF8\uC9C0 \uC790\uB3D9 \uC815\uB9AC",
              children: e.jsx(ot, {
                className: Wn
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
                e.jsx(ze, {
                  className: "flex flex-col gap-1.5",
                  value: p,
                  onValueChange: (f) => g(f),
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
                    const C = p === f.value;
                    return e.jsx(Ne, {
                      value: f.value,
                      className: [
                        "rounded-md border-2 px-2.5 py-2 text-left text-xs outline-none transition-all",
                        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                        C ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30" : "border-gray-300 opacity-70 dark:border-odp-borderStrong"
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
                e.jsx(ze, {
                  className: "flex flex-col gap-1.5",
                  value: k,
                  onValueChange: (f) => h(f),
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
                    const C = k === f.value;
                    return e.jsx(Ne, {
                      value: f.value,
                      className: [
                        "rounded-md border-2 px-2.5 py-2 text-left text-xs outline-none transition-all",
                        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                        C ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30" : "border-gray-300 opacity-70 dark:border-odp-borderStrong"
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
            e.jsxs(he, {
              type: "button",
              variant: "secondary",
              disabled: !r || re,
              onClick: () => {
                $e();
              },
              children: [
                j ? e.jsx(Pe, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(st, {
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
                Me();
              },
              children: [
                x ? e.jsx(Pe, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(Gs, {
                  size: 14
                }),
                "\uC911\uBCF5 \uC2A4\uCE94"
              ]
            })
          ]
        }),
        (E || b) && e.jsxs("p", {
          className: "text-[11px] text-gray-500 dark:text-odp-muted",
          children: [
            E ? `Markdown ${E.done}/${E.total}` : null,
            E && b ? " \xB7 " : null,
            b ? `\uD574\uC2DC ${b.done}/${b.total}` : null
          ]
        }),
        y ? e.jsx("p", {
          className: "text-xs text-red-600 dark:text-red-400",
          role: "alert",
          children: y
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
                  disabled: X === 0 || re,
                  onClick: () => Be([
                    ...z
                  ]),
                  children: [
                    e.jsx(Ft, {
                      size: 14
                    }),
                    "\uC120\uD0DD \uC0AD\uC81C (",
                    X,
                    ")"
                  ]
                })
              ]
            }),
            e.jsx("ul", {
              className: "max-h-56 space-y-1 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter",
              children: N.map((f) => e.jsx("li", {
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
                      children: oe(f.size)
                    })
                  ]
                })
              }, f.path))
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
                  onClick: () => Be([
                    ...A
                  ], it()),
                  children: [
                    e.jsx(Ft, {
                      size: 14
                    }),
                    "\uC120\uD0DD \uC0AD\uC81C (",
                    te,
                    ")"
                  ]
                })
              ]
            }),
            B.map((f) => e.jsxs("div", {
              className: "space-y-1 rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter",
              children: [
                e.jsxs("div", {
                  className: "text-[10px] text-gray-500 dark:text-odp-muted",
                  children: [
                    oe(f.size),
                    " \xB7 ",
                    f.hash.slice(0, 12),
                    "\u2026"
                  ]
                }),
                e.jsx("ul", {
                  className: "space-y-1",
                  children: f.files.map((C) => {
                    const T = K[f.hash] === C.path;
                    return e.jsx("li", {
                      children: e.jsxs("label", {
                        className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg",
                        children: [
                          e.jsx("input", {
                            type: "checkbox",
                            className: "mt-0.5",
                            checked: A.has(C.path),
                            disabled: T,
                            onChange: () => ae(C.path, f.hash)
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
                            onClick: () => lt(f.hash, C.path),
                            children: "\uC774 \uD30C\uC77C \uC720\uC9C0"
                          })
                        ]
                      })
                    }, C.path);
                  })
                })
              ]
            }, f.hash))
          ]
        }) : null,
        e.jsx(we, {
          isOpen: Ce,
          title: ue ? "\uC774\uBBF8\uC9C0\uB97C \uC601\uAD6C \uC0AD\uC81C\uD560\uAE4C\uC694?" : "\uC774\uBBF8\uC9C0\uB97C \uD734\uC9C0\uD1B5\uC73C\uB85C \uBCF4\uB0BC\uAE4C\uC694?",
          message: ue ? `${ee.length}\uAC1C \uD30C\uC77C\uC744 \uBCF5\uAD6C\uD560 \uC218 \uC5C6\uC774 \uC0AD\uC81C\uD569\uB2C8\uB2E4.${Object.keys(W).length ? " \uC0AD\uC81C \uB300\uC0C1\uC744 \uCC38\uC870\uD558\uB294 \uBB38\uC11C \uB9C1\uD06C\uB294 \uC720\uC9C0 \uC774\uBBF8\uC9C0\uB85C \uBC14\uB01D\uB2C8\uB2E4." : ""}` : `${ee.length}\uAC1C \uD30C\uC77C\uC744 .trash/ \uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.${Object.keys(W).length ? " \uC0AD\uC81C \uB300\uC0C1\uC744 \uCC38\uC870\uD558\uB294 \uBB38\uC11C \uB9C1\uD06C\uB294 \uC720\uC9C0 \uC774\uBBF8\uC9C0\uB85C \uBC14\uB01D\uB2C8\uB2E4." : ""}`,
          variant: "danger",
          confirmLabel: ue ? "\uC601\uAD6C \uC0AD\uC81C" : "\uD734\uC9C0\uD1B5\uC73C\uB85C \uC774\uB3D9",
          cancelLabel: "\uCDE8\uC18C",
          confirmDisabled: Ee,
          onConfirm: () => {
            ct();
          },
          onCancel: () => {
            Ee || (xe(false), w([]), Y({}));
          }
        })
      ]
    });
  }
  const Vn = "\uC554\uD638\uC124\uC815 \uBD88\uB7EC\uC624\uB294 \uC911", Hn = [
    {
      value: "off",
      label: "\uC0AC\uC6A9 \uC548 \uD568",
      description: "\uC571\uC744 \uC5F4\uBA74 \uC800\uC7A5\uB41C \uC5F0\uACB0 \uC815\uBCF4\uB97C \uBC14\uB85C \uBD88\uB7EC\uC635\uB2C8\uB2E4.",
      icon: Lt
    },
    {
      value: "password",
      label: "\uBE44\uBC00\uBC88\uD638",
      description: "\uC571 \uC785\uC7A5 \uC2DC \uB9C8\uC2A4\uD130 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD569\uB2C8\uB2E4.",
      icon: Ua
    },
    {
      value: "biometric",
      label: "\uC0DD\uCCB4 \uC778\uC99D",
      description: "Touch ID, Windows Hello \uB4F1\uC73C\uB85C \uC571\uC744 \uC7A0\uAE08 \uD574\uC81C\uD569\uB2C8\uB2E4.",
      icon: Va
    }
  ];
  function Yn({ s3Creds: t, webdavConfig: r, onModeChanged: s }) {
    const { lock: d } = Ma(), { showToast: i, dismissToast: l } = Ba(), [o, c] = a.useState("off"), [p, g] = a.useState(false), [k, h] = a.useState(false), [j, u] = a.useState(false), [x, m] = a.useState(false), E = Ka(), v = a.useCallback(async (N) => {
      i({
        message: Vn,
        icon: "loading",
        durationMs: 0
      });
      try {
        return await N();
      } finally {
        l();
      }
    }, [
      l,
      i
    ]);
    if (a.useEffect(() => {
      if (!It()) return;
      let N = false;
      return (async () => {
        try {
          const [_, z] = await v(() => Promise.all([
            Wa(),
            Ga()
          ]));
          if (N) return;
          c(_), g(z);
        } catch {
          N || (c("off"), g(false));
        }
      })(), () => {
        N = true;
      };
    }, [
      v
    ]), !It()) return null;
    const b = async (N) => {
      if (!(k || N === o)) {
        h(true);
        try {
          if (N === "off") await v(() => ir(t, r));
          else if (N === "password") {
            u(true);
            return;
          } else await v(() => Ya(t));
          c(N), s == null ? void 0 : s(N);
        } catch (_) {
          if (N === "biometric" && Xa(_)) return;
          alert(jt(_, "\uC785\uC7A5 \uC7A0\uAE08 \uC124\uC815\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
        } finally {
          h(false);
        }
      }
    }, L = async (N) => {
      h(true);
      try {
        await v(() => qa(N, t, r)), c("password"), s == null ? void 0 : s("password"), u(false);
      } catch (_) {
        alert(jt(_, "\uBE44\uBC00\uBC88\uD638 \uC7A0\uAE08 \uC124\uC815\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        h(false);
      }
    }, y = async () => {
      m(false), h(true);
      try {
        await v(() => ir(t, r)), c("off"), s == null ? void 0 : s("off");
      } catch (N) {
        alert(jt(N, "\uC785\uC7A5 \uC7A0\uAE08 \uD574\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        h(false);
      }
    }, I = () => {
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
                    e.jsx(Lt, {
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
                  onClick: I,
                  "aria-label": "\uC571 \uC7A0\uAE08",
                  children: [
                    e.jsx(Lt, {
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
            e.jsx(ze, {
              value: o,
              onValueChange: (N) => {
                const _ = N;
                if (_ === "off" && o !== "off") {
                  m(true);
                  return;
                }
                b(_);
              },
              className: "space-y-2",
              disabled: k,
              children: Hn.map((N) => {
                const _ = N.icon, z = N.value === "biometric" && !p, P = N.value === "biometric" && p ? E : N.label, B = N.value === "biometric" && p ? `${E}\uB85C \uC571\uC744 \uC7A0\uAE08 \uD574\uC81C\uD569\uB2C8\uB2E4.` : N.description;
                return e.jsxs("label", {
                  className: [
                    "flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition",
                    o === N.value ? "border-blue-400 bg-white shadow-sm dark:border-blue-500 dark:bg-odp-bgSoft" : "border-gray-200 bg-white/70 dark:border-odp-borderStrong dark:bg-odp-surface/60",
                    z ? "cursor-not-allowed opacity-50" : "hover:border-blue-300"
                  ].join(" "),
                  children: [
                    e.jsx(Ne, {
                      value: N.value,
                      disabled: z || k,
                      className: "mt-0.5 h-4 w-4 shrink-0 rounded-full border border-gray-400 bg-white outline-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                      "aria-label": P,
                      children: e.jsx(Dt, {
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
                            P
                          ]
                        }),
                        e.jsx("span", {
                          className: "mt-0.5 block text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
                          children: B
                        }),
                        z && e.jsx("span", {
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
        e.jsx(Ha, {
          isOpen: j,
          masterPassword: "",
          onCancel: () => {
            u(false);
          },
          onSubmit: (N) => {
            L(N);
          }
        }),
        e.jsx(we, {
          isOpen: x,
          title: "\uC785\uC7A5 \uC7A0\uAE08 \uD574\uC81C",
          message: "\uC571 \uC785\uC7A5 \uC7A0\uAE08\uC744 \uB044\uBA74 \uB2E4\uC74C \uC2E4\uD589\uBD80\uD130 \uBE44\uBC00\uBC88\uD638\xB7\uC0DD\uCCB4 \uC778\uC99D \uC5C6\uC774 \uC5F0\uACB0 \uC815\uBCF4\uB97C \uBD88\uB7EC\uC635\uB2C8\uB2E4.",
          confirmLabel: "\uC0AC\uC6A9 \uD574\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: () => {
            y();
          },
          onCancel: () => m(false)
        })
      ]
    });
  }
  const Xn = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), qn = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function Jn() {
    const [t, r] = a.useState(() => cr()), [s, d] = a.useState(""), [i, l] = a.useState(false), o = a.useCallback(async () => {
      if (ce()) try {
        d(await Ja());
      } catch {
        d("");
      }
    }, []);
    a.useEffect(() => {
      if (ce()) return r(cr()), o(), rt((g, k) => {
        g === "settings-tauri-download-save-dialog" && r(k);
      });
    }, [
      o
    ]);
    const c = a.useCallback(async () => {
      l(true);
      try {
        await Qa() && await o();
      } finally {
        l(false);
      }
    }, [
      o
    ]), p = a.useCallback(async () => {
      Za(null), await o();
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
            e.jsx(Tt, {
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
            e.jsx(nt, {
              className: Xn(t),
              checked: t,
              onCheckedChange: (g) => {
                r(g), es(g), H("settings-tauri-download-save-dialog", g);
              },
              "aria-label": "\uB2E4\uC6B4\uB85C\uB4DC \uC704\uCE58 \uC0AC\uC804 \uD655\uC778",
              children: e.jsx(ot, {
                className: qn
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
                  disabled: i,
                  onClick: () => {
                    c();
                  },
                  children: [
                    e.jsx(at, {
                      size: 14
                    }),
                    "\uD3F4\uB354 \uC9C0\uC815"
                  ]
                }),
                e.jsxs(he, {
                  type: "button",
                  variant: "tertiary",
                  disabled: i,
                  onClick: () => {
                    p();
                  },
                  children: [
                    e.jsx(Tt, {
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
  const Qn = [
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
  function Zn({ limits: t, disabled: r = false, onChange: s }) {
    const [d, i] = a.useState(() => ({
      maxFiles: String(t.maxFiles),
      maxChatDays: String(t.maxChatDays),
      maxHits: String(t.maxHits)
    }));
    a.useEffect(() => {
      i({
        maxFiles: String(t.maxFiles),
        maxChatDays: String(t.maxChatDays),
        maxHits: String(t.maxHits)
      });
    }, [
      t.maxFiles,
      t.maxChatDays,
      t.maxHits
    ]);
    const l = (o, c) => {
      const p = Number.parseInt(c.trim(), 10), g = as({
        ...t,
        [o]: Number.isFinite(p) ? p : t[o]
      });
      i((k) => ({
        ...k,
        [o]: String(g[o])
      })), g[o] !== t[o] && s(g);
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
                vt.maxFiles,
                " /",
                " ",
                vt.maxChatDays,
                " / ",
                vt.maxHits,
                "."
              ]
            })
          ]
        }),
        e.jsx("div", {
          className: "grid gap-3 sm:grid-cols-3",
          children: Qn.map(({ key: o, label: c, hint: p }) => {
            const g = rs[o], k = t[o] === ts;
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
                        g.min,
                        "\u2013",
                        g.max,
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
                  onChange: (h) => {
                    i((j) => ({
                      ...j,
                      [o]: h.target.value
                    }));
                  },
                  onBlur: (h) => {
                    l(o, h.target.value);
                  },
                  onKeyDown: (h) => {
                    h.key === "Enter" && h.currentTarget.blur();
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
  function $r(t) {
    return (t == null ? void 0 : t.length) ? t.filter((r) => r.type !== "folder" || !r.path ? false : !_e(r.path)).map((r) => ({
      ...r,
      children: $r(r.children)
    })) : [];
  }
  function Mr({ node: t, level: r, onSelect: s, selectedPath: d, excludedFolders: i }) {
    const [l, o] = a.useState(r < 2);
    if (t.type !== "folder" || !t.path || _e(t.path)) return null;
    const c = ds(t.path), p = d === c, g = ls(c, i), k = `${r * 12 + 8}px`, h = $r(t.children);
    return e.jsxs("div", {
      children: [
        e.jsx("div", {
          className: `flex items-center justify-between py-1 pr-2 text-sm ${p ? "bg-blue-50 text-blue-700 dark:bg-odp-line dark:text-odp-fgStrong" : "text-gray-700 dark:text-odp-fg"} ${g ? "opacity-40" : "hover:bg-gray-100 dark:hover:bg-odp-bgSoft"}`,
          style: {
            paddingLeft: k
          },
          children: e.jsxs("div", {
            className: "flex min-w-0 items-center gap-1.5",
            children: [
              e.jsx("button", {
                type: "button",
                className: "flex w-4 shrink-0 justify-center text-gray-400 dark:text-gray-500",
                "aria-label": l ? "\uC811\uAE30" : "\uD3BC\uCE58\uAE30",
                onClick: () => o((j) => !j),
                children: l ? "\u25BE" : "\u25B8"
              }),
              e.jsxs("button", {
                type: "button",
                disabled: g,
                onClick: () => s(c),
                className: "flex min-w-0 items-center gap-1 text-left disabled:cursor-not-allowed",
                children: [
                  e.jsx("span", {
                    className: "shrink-0 text-gray-500 dark:text-gray-300",
                    children: e.jsx(at, {
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
        l && h.map((j) => e.jsx(Mr, {
          node: j,
          level: r + 1,
          onSelect: s,
          selectedPath: d,
          excludedFolders: i
        }, j.path))
      ]
    });
  }
  function eo({ folders: t, disabled: r = false, onChange: s, onRequestTree: d, canRequestTree: i = true }) {
    const [l, o] = a.useState(false), [c, p] = a.useState(null), [g, k] = a.useState(false), [h, j] = a.useState(null), [u, x] = a.useState(null);
    a.useEffect(() => {
      l || (x(null), j(null));
    }, [
      l
    ]);
    const m = a.useCallback(async () => {
      if (!(r || typeof d != "function")) {
        o(true), k(true), j(null);
        try {
          const v = await d();
          p(Array.isArray(v) ? v : []);
        } catch (v) {
          p(null), j(v instanceof Error ? v.message : String(v));
        } finally {
          k(false);
        }
      }
    }, [
      r,
      d
    ]), E = () => {
      u && (s(os(t, u)), o(false));
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
              e.jsx(at, {
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
                onClick: () => s(ss(t, v)),
                className: "rounded p-0.5 text-gray-500 hover:bg-gray-200 hover:text-gray-800 disabled:opacity-50 dark:hover:bg-odp-bgSoft dark:hover:text-odp-fgStrong",
                children: e.jsx(Pt, {
                  size: 14
                })
              })
            ]
          }, v))
        }),
        e.jsx("button", {
          type: "button",
          disabled: r || !i || typeof d != "function",
          onClick: () => {
            m();
          },
          className: "rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft",
          children: "\uD3F4\uB354 \uCD94\uAC00\u2026"
        }),
        e.jsx(ns, {
          isOpen: l,
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
              g ? e.jsx("p", {
                className: "text-xs text-gray-500",
                children: "\uD3F4\uB354 \uD2B8\uB9AC \uBD88\uB7EC\uC624\uB294 \uC911\u2026"
              }) : h ? e.jsx("p", {
                className: "text-xs text-red-600 dark:text-red-400",
                children: h
              }) : e.jsxs("div", {
                className: "max-h-[min(50vh,360px)] overflow-auto rounded border border-gray-200 dark:border-odp-borderSoft",
                children: [
                  (c || []).filter((v) => v.type === "folder" && v.path && !_e(v.path)).map((v) => e.jsx(Mr, {
                    node: v,
                    level: 0,
                    onSelect: x,
                    selectedPath: u,
                    excludedFolders: t
                  }, v.path)),
                  (c || []).filter((v) => v.type === "folder" && v.path && !_e(v.path)).length === 0 ? e.jsx("p", {
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
                    disabled: !u,
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
  function to({ value: t, disabled: r = false, onChange: s }) {
    const [d, i] = a.useState(String(t));
    a.useEffect(() => {
      i(String(t));
    }, [
      t
    ]);
    const l = (o) => {
      const c = Number.parseInt(o.trim(), 10), p = cs(Number.isFinite(c) ? c : t);
      i(String(p)), p !== t && s(p);
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
                is,
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
                    Xe.min,
                    "\u2013",
                    Xe.max,
                    ")"
                  ]
                })
              ]
            }),
            e.jsx("input", {
              type: "number",
              inputMode: "numeric",
              min: Xe.min,
              max: Xe.max,
              value: d,
              disabled: r,
              "aria-label": "\uCCB4\uD06C\uD3EC\uC778\uD2B8 \uC8FC\uAE30",
              onChange: (o) => {
                i(o.target.value);
              },
              onBlur: (o) => {
                l(o.target.value);
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
  function ro(t, r, s = "") {
    const [d, i] = a.useState(s);
    return a.useEffect(() => {
      const l = t.current;
      if (!l || r.length === 0) return;
      const o = r.map((p) => document.getElementById(p)).filter((p) => !!p);
      if (o.length === 0) return;
      const c = new IntersectionObserver((p) => {
        var _a2;
        const k = (_a2 = p.filter((h) => h.isIntersecting).sort((h, j) => j.intersectionRatio - h.intersectionRatio)[0]) == null ? void 0 : _a2.target;
        (k == null ? void 0 : k.id) && i(k.id);
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
      for (const p of o) c.observe(p);
      return () => c.disconnect();
    }, [
      t,
      r,
      s
    ]), d;
  }
  function ao(t, r) {
    const s = t.getBoundingClientRect(), d = r.getBoundingClientRect();
    return s.top - d.top + r.scrollTop;
  }
  function so(t, r, s) {
    const d = "smooth", i = Number.parseFloat(getComputedStyle(r).scrollMarginTop || "0") || 0, l = ao(r, t) - i;
    t.scrollTo({
      top: Math.max(0, l),
      behavior: d
    });
  }
  function Ot(t, r, s) {
    return r ? t ? (so(t, r), true) : (r.scrollIntoView({
      block: "start",
      behavior: "smooth"
    }), true) : false;
  }
  fo = function({ s3Creds: t, masterPassword: r, onSaveS3Creds: s, onExportCreds: d, onImportClick: i, showHiddenFolders: l, onToggleHiddenFolders: o, showTrashFolder: c = false, onToggleTrashFolder: p, hideRecordingCompanions: g = false, onToggleHideRecordingCompanions: k, treeStickyFolderPathEnabled: h = true, onToggleTreeStickyFolderPath: j, showTreeModifiedDate: u = false, onToggleShowTreeModifiedDate: x, treeHoverExpandSettings: m = Ds, onTreeHoverExpandSettingsChange: E, onRequestClose: v, webauthnSupported: b = false, webauthnEnabled: L = false, webauthnStorageOnly: y = false, onEnableWebAuthn: I, onDisableWebAuthn: N, snippetConfig: _, onChangeSnippetConfig: z, onSaveSnippetConfig: P, isSavingSnippets: B = false, snippetConfigLoaded: Z = false, editorType: A, onEditorTypeChange: $, storageMode: K = de, onStorageModeChange: R, localFolderName: Ce = "", localVaultFsPath: xe = "", onOpenLocalFolder: ee, webdavConfig: w, onSaveWebdavConfig: W, isMobileLayout: Y = false, sidebarOpen: Ee = true, sidebarCollapsed: Re = false, onOpenSidebar: le, onCheckAppUpdate: re, isCheckingAppUpdate: $e = false, latestAppBuildId: Me = "", onScanStorageUsage: fe, canScanStorageUsage: ae = false, onOpenStorageUsageFile: lt, onReadUnusedImageText: it, onReadUnusedImageBytes: Be, onDeleteUnusedImagePaths: ct }) {
    const [X, te] = a.useState(t), [ue, f] = a.useState(""), [C, T] = a.useState(w ?? {
      endpoint: "",
      username: "",
      password: "",
      basePath: ""
    }), [D, M] = a.useState(false), [U, G] = a.useState(b), [q, Ke] = a.useState(() => xs()), [Br, Rt] = a.useState(() => A ?? us()), [We, Kr] = a.useState(() => bs()), [Oe, Wr] = a.useState(() => ps()), [$t, Mt] = a.useState(() => xr()), [Ge, Gr] = a.useState(() => gs()), O = _r(), [Ue, Ur] = a.useState(() => ms()), [Vr, Bt] = a.useState(() => ur()), [Kt, J] = a.useState(false), [Hr, Ve] = a.useState(false), [Yr, He] = a.useState(null), [Xr, xt] = a.useState(false), [qr, ut] = a.useState(true), [Wt, bt] = a.useState(() => K === me), [Gt, pt] = a.useState(false), [Jr, gt] = a.useState(true), [se, Ut] = a.useState(() => hs(true)), Ie = a.useRef(null), Le = ra(), Vt = aa(), ye = It(), Ht = String(xe || "").trim(), Qr = String(Ce || "").trim() || fs() || "", mt = ye && Ht ? Ht : Qr, Yt = ye || typeof window < "u" && "showDirectoryPicker" in window;
    a.useEffect(() => rt((n, S) => {
      n === "settings-alt-vim" ? Kr(S) : n === "settings-workspace-tabs" ? Wr(S) : n === "settings-composer-helper" ? Gr(S) : n === "settings-as-animation" && Ur(S);
    }), []), a.useEffect(() => {
      const n = (S) => {
        var _a2;
        const V = ((_a2 = S == null ? void 0 : S.detail) == null ? void 0 : _a2.mode) ?? ur();
        Bt(V);
      };
      return window.addEventListener(br, n), () => {
        window.removeEventListener(br, n);
      };
    }, []), a.useEffect(() => {
      const n = (S) => {
        var _a2;
        const V = ((_a2 = S == null ? void 0 : S.detail) == null ? void 0 : _a2.mode) ?? xr();
        Mt(V);
      };
      return window.addEventListener(pr, n), () => {
        window.removeEventListener(pr, n);
      };
    }, []), a.useEffect(() => {
      const n = String(Le.hash || "").replace(/^#/, "");
      if (!n.startsWith("settings-")) return;
      n === "settings-s3" && ut(true), n === "settings-webdav" && pt(true), n === "settings-local" && bt(true), n === "settings-imgbb" && gt(true), (n === "settings-mlx-vlm" || n === "settings-llama-cpp") && St(n);
      const S = gr(n);
      S && Ut((Fe) => ({
        ...Fe,
        [S]: true
      }));
      const V = mr(n), ke = n === "settings-mlx-vlm" || n === "settings-llama-cpp" ? 220 : 80, be = window.setTimeout(() => {
        var _a2;
        const Fe = document.getElementById(V);
        if (Fe) {
          Ot(Ie.current, Fe);
          try {
            (_a2 = Fe.focus) == null ? void 0 : _a2.call(Fe, {
              preventScroll: true
            });
          } catch {
          }
        }
      }, ke);
      return () => window.clearTimeout(be);
    }, [
      Le.hash,
      Le.pathname
    ]), a.useEffect(() => {
      O.building || J(false);
    }, [
      O.building
    ]), a.useEffect(() => {
      F.isEnabled() && F.ensureManifestSummary();
    }, []), a.useEffect(() => {
      te({
        ...t,
        llmProviderProfiles: qe(t)
      }), f("");
    }, [
      t
    ]);
    const ht = !!((t == null ? void 0 : t.imgbbApiKey) || "").trim(), Te = (n) => {
      const S = n !== void 0 ? n : qe(X), V = Rs(S), be = ue.trim() || (ht ? t.imgbbApiKey : "");
      return {
        ...X,
        llmProviderProfiles: S,
        ...V,
        imgbbApiKey: be
      };
    };
    a.useEffect(() => {
      T(w ?? {
        endpoint: "",
        username: "",
        password: "",
        basePath: ""
      });
    }, [
      w
    ]), a.useEffect(() => {
      A !== void 0 && Rt(A);
    }, [
      A
    ]), a.useEffect(() => {
      let n = false;
      return ys().then((S) => {
        n || G(S);
      }), () => {
        n = true;
      };
    }, []);
    const ft = U && (r || y), Xt = a.useMemo(() => ({
      isDesktopApp: ye,
      showWebAuthnSection: ft,
      canScanStorageUsage: ae
    }), [
      ye,
      ft,
      ae
    ]), yt = a.useMemo(() => ks(Xt), [
      Xt
    ]), qt = a.useMemo(() => yt.flatMap((n) => n.sections.map((S) => S.id)), [
      yt
    ]), Zr = ro(Ie, qt, qt[0] || ""), Q = a.useCallback((n, S) => {
      n && Ut((V) => ({
        ...V,
        [n]: S
      }));
    }, []), ea = a.useCallback((n) => {
      const S = gr(n);
      Q(S, true), n === "settings-s3" && ut(true), n === "settings-webdav" && pt(true), n === "settings-local" && bt(true), n === "settings-imgbb" && gt(true), (n === "settings-mlx-vlm" || n === "settings-llama-cpp") && St(n);
      const V = mr(n);
      Vt({
        pathname: Le.pathname,
        hash: `#${n}`
      }, {
        replace: true
      });
      const ke = n === "settings-mlx-vlm" || n === "settings-llama-cpp" ? 220 : 120;
      window.setTimeout(() => {
        var _a2;
        const be = document.getElementById(V);
        if (be) {
          Ot(Ie.current, be);
          try {
            (_a2 = be.focus) == null ? void 0 : _a2.call(be, {
              preventScroll: true
            });
          } catch {
          }
        }
      }, ke);
    }, [
      Le.pathname,
      Vt,
      Q
    ]), ta = !Y && Re ? "md:pl-14" : "";
    return e.jsxs("div", {
      className: "flex min-h-0 min-w-0 max-h-full flex-1 flex-col overflow-hidden bg-white dark:bg-odp-bgSofter",
      children: [
        e.jsxs("div", {
          className: `px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-odp-surface flex justify-between items-center gap-3 bg-gray-50 dark:bg-odp-surface shrink-0 transition-[padding] duration-300 ease-in-out ${ta}`,
          children: [
            e.jsxs("div", {
              className: "flex min-w-0 flex-1 items-center gap-2",
              children: [
                Y && !Ee && typeof le == "function" && e.jsx("button", {
                  type: "button",
                  "aria-label": "\uC0AC\uC774\uB4DC\uBC14 \uC5F4\uAE30",
                  onClick: le,
                  className: "inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
                  children: e.jsx(js, {
                    size: 22
                  })
                }),
                e.jsxs("h2", {
                  className: "font-bold text-gray-700 dark:text-odp-fgStrong flex min-w-0 items-center gap-2",
                  children: [
                    e.jsx(vs, {}),
                    " \uC124\uC815 \uBC0F \uC554\uD638\uD654"
                  ]
                })
              ]
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => v == null ? void 0 : v(Te()),
              className: "text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded transition",
              children: e.jsx(Pt, {
                size: 16
              })
            })
          ]
        }),
        e.jsxs("div", {
          className: "flex min-h-0 min-w-0 flex-1",
          children: [
            e.jsx("div", {
              ref: Ie,
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
                      e.jsx(Yn, {
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
                                    value: de,
                                    checked: K === de,
                                    onChange: () => R == null ? void 0 : R(de)
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
                                    onChange: () => R == null ? void 0 : R(me)
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
                                    value: Se,
                                    checked: K === Se,
                                    onChange: () => R == null ? void 0 : R(Se)
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
                        open: qr,
                        onOpenChange: ut,
                        tabIndex: -1,
                        onSubmit: (n) => {
                          n.preventDefault(), s(Te());
                        },
                        className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsx(ge, {
                            children: "S3 \uC5F0\uACB0 \uC815\uBCF4"
                          }),
                          e.jsx(ie, {
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
                                          value: X.accessKeyId,
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
                                          value: X.secretAccessKey,
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
                                          value: X.region,
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
                                          value: X.bucket,
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
                                          value: X.endpoint || "",
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
                                      onClick: () => v == null ? void 0 : v(Te()),
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
                        open: Gt,
                        onOpenChange: pt,
                        tabIndex: -1,
                        onSubmit: (n) => {
                          n.preventDefault(), W == null ? void 0 : W(C);
                        },
                        className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsx(ge, {
                            trailing: Gt ? null : e.jsx("span", {
                              className: "ml-auto text-[11px] font-normal text-gray-400 dark:text-odp-muted",
                              children: "\uC811\uD798"
                            }),
                            children: "WebDAV \uC5F0\uACB0 \uC815\uBCF4"
                          }),
                          e.jsx(ie, {
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
                                          const { createWebdavBackend: n } = await Er(async () => {
                                            const { createWebdavBackend: V } = await import("./index-RtVxfB8B.js").then(async (m2) => {
                                              await m2.__tla;
                                              return m2;
                                            }).then((ke) => ke.j5);
                                            return {
                                              createWebdavBackend: V
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
                        onOpenChange: bt,
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
                          e.jsx(ie, {
                            children: e.jsxs(e.Fragment, {
                              children: [
                                e.jsx("p", {
                                  className: "text-xs text-gray-600 dark:text-odp-muted",
                                  children: ye ? "Local Haim\uC740 OS \uD3F4\uB354 \uC120\uD0DD \uB300\uD654\uC0C1\uC790\uB85C vault \uB8E8\uD2B8\uB97C \uC9C0\uC815\uD569\uB2C8\uB2E4. \uC120\uD0DD\uD55C \uD3F4\uB354\uC758 \uC804\uCCB4 \uACBD\uB85C\uAC00 \uC800\uC7A5\uB418\uBA70, \uC571\uC744 \uB2E4\uC2DC \uC5F4\uBA74 \uAC19\uC740 \uC704\uCE58\uB97C \uBCF5\uC6D0\uD569\uB2C8\uB2E4." : "Local Haim\uC740 \uBE0C\uB77C\uC6B0\uC800 File System Access API\uB85C \uC5F0 \uD3F4\uB354\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uBCF4\uC548\uC0C1 OS \uC804\uCCB4 \uACBD\uB85C\uB294 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC73C\uBA70, \uD3F4\uB354 \uC774\uB984\uC73C\uB85C \uC5F4\uB9B0 \uC704\uCE58\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
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
                                      value: mt || "(\uD3F4\uB354\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC74C)",
                                      "aria-label": ye ? "\uD604\uC7AC \uC5F4\uB9B0 \uB85C\uCEEC \uD3F4\uB354 \uACBD\uB85C" : "\uD604\uC7AC \uC5F4\uB9B0 \uB85C\uCEEC \uD3F4\uB354 \uC774\uB984"
                                    })
                                  ]
                                }),
                                Yt ? null : e.jsx("p", {
                                  className: "text-xs text-amber-700 dark:text-amber-300",
                                  children: "\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uD3F4\uB354 \uC120\uD0DD\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Chromium \uACC4\uC5F4 \uBE0C\uB77C\uC6B0\uC800\uB97C \uC0AC\uC6A9\uD574 \uC8FC\uC138\uC694."
                                }),
                                e.jsx("div", {
                                  className: "flex justify-end gap-2 pt-2",
                                  children: e.jsxs("button", {
                                    type: "button",
                                    disabled: !Yt || typeof ee != "function",
                                    onClick: () => ee == null ? void 0 : ee(),
                                    className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                                    children: [
                                      e.jsx(at, {
                                        size: 16
                                      }),
                                      mt ? "\uB2E4\uB978 \uD3F4\uB354 \uC5F4\uAE30" : "\uD3F4\uB354 \uC120\uD0DD"
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
                                  e.jsx(Tt, {}),
                                  " S3 \uC5F0\uACB0\uC815\uBCF4 \uB0B4\uBCF4\uB0B4\uAE30"
                                ]
                              }),
                              e.jsxs("button", {
                                onClick: i,
                                className: "flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded transition",
                                children: [
                                  e.jsx(Ss, {}),
                                  " S3 \uC5F0\uACB0\uC815\uBCF4 \uBD88\uB7EC\uC624\uAE30"
                                ]
                              })
                            ]
                          })
                        ]
                      }),
                      ft && e.jsxs("div", {
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
                            children: y ? "S3 \uC5F0\uACB0 \uC815\uBCF4\uAC00 \uBCF4\uC548 \uD0A4\uB85C\uB9CC \uC554\uD638\uD654\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0 \uC2DC\uC5D0\uB294 \uBE44\uBC00\uBC88\uD638\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4." : "\uC9C0\uBB38, Windows Hello, Touch ID \uB4F1\uC73C\uB85C \uC571 \uC7A0\uAE08 \uD574\uC81C\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0 \uC2DC\uC5D0\uB294 \uBE44\uBC00\uBC88\uD638\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
                          }),
                          y ? e.jsx("p", {
                            className: "text-xs text-gray-600 dark:text-odp-muted",
                            children: "\uC800\uC7A5\uC18C: \uBCF4\uC548 \uD0A4\uB85C \uBCF4\uD638\uB428"
                          }) : L ? e.jsxs("div", {
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
                              disabled: D,
                              onClick: async () => {
                                if (D || !I) return;
                                let n;
                                try {
                                  n = I(r);
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
                              children: D ? "\uB4F1\uB85D \uC911\u2026" : "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uC0AC\uC6A9 (\uB4F1\uB85D)"
                            })
                          })
                        ]
                      }),
                      ae && e.jsx("div", {
                        id: "settings-storage-usage",
                        tabIndex: -1,
                        className: "scroll-mt-4",
                        children: e.jsx(Ln, {
                          storageMode: K,
                          onScanTree: fe,
                          canScan: ae,
                          onOpenFile: lt
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
                      e.jsx(Ns, {
                        profiles: qe(X),
                        onSaveProfiles: (n) => {
                          te((S) => ({
                            ...S,
                            llmProviderProfiles: n
                          })), s(Te(n));
                        }
                      }),
                      e.jsx(ws, {}),
                      e.jsx(Cs, {})
                    ]
                  }),
                  e.jsxs(ne, {
                    id: "integrations",
                    title: "\uC678\uBD80 \uC5F0\uB3D9",
                    open: se.integrations !== false,
                    onOpenChange: (n) => Q("integrations", n),
                    children: [
                      e.jsx(Un, {
                        storageMode: K,
                        canScan: ae,
                        onScanTree: fe,
                        onReadText: it,
                        onReadBytes: Be,
                        onDeletePaths: ct
                      }),
                      e.jsxs(pe, {
                        as: "form",
                        id: "settings-imgbb",
                        contentKey: "settings-imgbb-conn",
                        open: Jr,
                        onOpenChange: gt,
                        tabIndex: -1,
                        onSubmit: (n) => {
                          if (n.preventDefault(), !ue.trim() && !ht) {
                            alert("API \uD0A4\uB97C \uC785\uB825\uD558\uC138\uC694.");
                            return;
                          }
                          s(Te());
                        },
                        className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
                        children: [
                          e.jsx(ge, {
                            children: "ImgBB"
                          }),
                          e.jsx(ie, {
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
                                      onChange: (n) => f(n.target.value),
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
                      e.jsx(pn, {})
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
                                    value: De,
                                    checked: Br === De,
                                    onChange: () => {
                                      Rt(De), Es(De), $ == null ? void 0 : $(De);
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
                                    value: Os,
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
                                children: Is.map((n) => e.jsxs("label", {
                                  className: "flex items-start gap-2 cursor-pointer",
                                  children: [
                                    e.jsx("input", {
                                      type: "radio",
                                      name: "footnoteDisplayMode",
                                      value: n.value,
                                      checked: Vr === n.value,
                                      onChange: () => {
                                        Ls(n.value), Bt(n.value);
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
                        children: e.jsx(sn, {
                          value: _,
                          onChange: z,
                          onSave: P,
                          isSaving: B,
                          isLoaded: Z
                        })
                      }),
                      e.jsx(cn, {}),
                      e.jsx(bn, {}),
                      e.jsx(nn, {})
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
                                  St("settings-inverted-index");
                                  const n = document.getElementById("settings-inverted-index");
                                  n && Ot(Ie.current, n);
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
                                  H("settings-as-animation", !Ue);
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
                                  H("settings-as-index", !O.enabled);
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
                                  H("settings-as-include-other", !O.includeOtherFiles);
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
                          e.jsx(eo, {
                            folders: O.excludedFolders || [],
                            disabled: !O.enabled,
                            canRequestTree: ae,
                            onRequestTree: fe,
                            onChange: (n) => F.setExcludedFolders(n)
                          }),
                          e.jsx(to, {
                            value: O.checkpointEvery ?? 5,
                            disabled: !O.enabled,
                            onChange: (n) => F.setCheckpointEvery(n)
                          }),
                          e.jsx(Zn, {
                            limits: O.liveScanLimits,
                            disabled: !O.enabled,
                            onChange: (n) => F.setLiveScanLimits(n)
                          }),
                          e.jsxs("div", {
                            className: `rounded-md border px-3 py-2 text-xs ${O.building ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200" : O.hasIndex ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200" : "border-gray-200 bg-white text-gray-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-muted"}`,
                            children: [
                              dt(O) || At(O) ? e.jsxs(e.Fragment, {
                                children: [
                                  At(O) ? "\uC5ED\uC0C9\uC778 \uC800\uC7A5 \uC911" : "\uBC31\uADF8\uB77C\uC6B4\uB4DC \uC0C9\uC778 \uC911",
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
                                disabled: !et(O, Kt),
                                onClick: () => {
                                  (async () => {
                                    const n = await F.getRebuildCheckpointInfo();
                                    if (n) {
                                      He(n), Ve(true);
                                      return;
                                    }
                                    if (O.hasIndex) {
                                      xt(true);
                                      return;
                                    }
                                    J(true), F.rebuild({
                                      resume: false
                                    }).finally(() => J(false));
                                  })();
                                },
                                className: "inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                                children: [
                                  e.jsx(tt, {
                                    size: 14
                                  }),
                                  zr(O)
                                ]
                              }),
                              Pr(O) ? e.jsxs("button", {
                                type: "button",
                                onClick: () => F.cancelRebuild(),
                                className: "inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60",
                                title: "\uC0C9\uC778\uC744 \uC911\uC9C0\uD569\uB2C8\uB2E4. \uCCB4\uD06C\uD3EC\uC778\uD2B8\uB294 \uC720\uC9C0\uB418\uC5B4 \uC774\uC5B4\uC11C \uC7AC\uAC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                                children: [
                                  e.jsx(hr, {
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
                                  e.jsx(hr, {
                                    size: 14
                                  }),
                                  "\uC911\uC9C0"
                                ]
                              }) : null,
                              e.jsx("button", {
                                type: "button",
                                disabled: Kt || O.building || !O.hasIndex,
                                onClick: () => {
                                  window.confirm("\uC5ED\uC0C9\uC778 \uCE90\uC2DC(.advanced-search/)\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694? \uC0AD\uC81C \uD6C4\uC5D0\uB294 \u300C\uC0C9\uC778\u300D\uC73C\uB85C \uB2E4\uC2DC \uC0DD\uC131\uD574\uC57C \uD569\uB2C8\uB2E4.") && (J(true), F.clearCache().finally(() => J(false)));
                                },
                                className: "inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:bg-odp-bgSoft dark:text-red-300 dark:hover:bg-red-950/30",
                                children: "\uC5ED\uC0C9\uC778 \uCE90\uC2DC \uC0AD\uC81C"
                              })
                            ]
                          }),
                          e.jsx(Ar, {
                            isOpen: Hr,
                            info: Yr,
                            onCancel: () => {
                              Ve(false), He(null);
                            },
                            onResume: () => {
                              Ve(false), He(null), J(true), F.rebuild({
                                resume: true
                              }).finally(() => J(false));
                            },
                            onStartFresh: () => {
                              Ve(false), He(null), J(true), F.rebuild({
                                resume: false
                              }).finally(() => J(false));
                            }
                          }),
                          e.jsx(we, {
                            isOpen: Xr,
                            title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
                            message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
                            confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
                            cancelLabel: "\uCDE8\uC18C",
                            onConfirm: () => {
                              xt(false), J(true), F.rebuild({
                                resume: false
                              }).finally(() => J(false));
                            },
                            onCancel: () => xt(false)
                          }),
                          e.jsx(Dr, {}),
                          e.jsx(Bn, {
                            embedded: true,
                            storageMode: K,
                            onScanTree: fe,
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
                                      H("settings-alt-vim", !We);
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
                                      H("settings-workspace-tabs", !Oe);
                                    },
                                    className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Oe ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                    "aria-pressed": Oe,
                                    "aria-label": "\uD0ED \uAE30\uB2A5",
                                    children: e.jsx("span", {
                                      className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Oe ? "translate-x-4" : "translate-x-0.5"}`
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
                              e.jsx(ie, {
                                open: Oe,
                                contentKey: "settings-workspace-tabs-autosave",
                                children: e.jsxs("div", {
                                  className: "pl-12 space-y-2",
                                  children: [
                                    e.jsx("p", {
                                      className: "text-xs font-medium text-gray-700 dark:text-odp-fg",
                                      children: "\uD0ED \uC790\uB3D9 \uC800\uC7A5 \uC124\uC815"
                                    }),
                                    e.jsx(ze, {
                                      className: "flex flex-col gap-2",
                                      value: $t,
                                      onValueChange: (n) => {
                                        n !== "off" && n !== "onFocusChange" && n !== "onWindowChange" || (Fs(n), Mt(n));
                                      },
                                      "aria-label": "\uD0ED \uC790\uB3D9 \uC800\uC7A5",
                                      children: Ts.map((n) => {
                                        const S = $t === n.value;
                                        return e.jsx(Ne, {
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
                                    })
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
                          e.jsx(ln, {}),
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
                          typeof k == "function" && e.jsxs("label", {
                            className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                            children: [
                              e.jsx("button", {
                                type: "button",
                                onClick: k,
                                className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${g ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                "aria-pressed": g,
                                "aria-label": "\uB179\uC74C\xB7\uD544\uAE30 \uB3D9\uBC18 \uD30C\uC77C \uC228\uAE30\uAE30",
                                children: e.jsx("span", {
                                  className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${g ? "translate-x-4" : "translate-x-0.5"}`
                                })
                              }),
                              e.jsx("span", {
                                className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                                children: "\uB179\uC74C\xB7\uD544\uAE30 \uB3D9\uAE30\uD654 \uD30C\uC77C \uC228\uAE30\uAE30 (\uC0AC\uC774\uB4DC\uBC14 \uBAA9\uB85D\xB7\uB179\uC74C UI\xB7\uB3D9\uAE30\uD654 \uBCF4\uAE30\uC5D0\uC11C \uC81C\uC678)"
                              })
                            ]
                          }),
                          typeof j == "function" && e.jsxs("label", {
                            className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                            children: [
                              e.jsx("button", {
                                type: "button",
                                onClick: j,
                                className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${h ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                "aria-pressed": h,
                                "aria-label": "\uD2B8\uB9AC \uD3F4\uB354 \uACBD\uB85C sticky \uD45C\uC2DC",
                                children: e.jsx("span", {
                                  className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${h ? "translate-x-4" : "translate-x-0.5"}`
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
                                className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${u ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                                "aria-pressed": u,
                                "aria-label": "\uD2B8\uB9AC \uC218\uC815 \uB0A0\uC9DC \uD45C\uC2DC",
                                children: e.jsx("span", {
                                  className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${u ? "translate-x-4" : "translate-x-0.5"}`
                                })
                              }),
                              e.jsx("span", {
                                className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                                children: "\uD2B8\uB9AC \uD30C\uC77C\uBA85 \uC544\uB798 \uC218\uC815 \uB0A0\uC9DC \uD45C\uC2DC (yy-MM-dd hh:mm:ss, \uACF5\uAC04\uC5D0 \uB530\uB77C \uCD95\uC57D)"
                              })
                            ]
                          }),
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
                                        step: m.unit === "ms" ? 1 : 0.1,
                                        value: m.value,
                                        onChange: (n) => {
                                          const S = Number(n.target.value);
                                          E({
                                            ...m,
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
                                    children: e.jsxs(ze, {
                                      className: "flex items-center gap-3",
                                      value: m.unit,
                                      onValueChange: (n) => {
                                        n !== "s" && n !== "ms" || m.unit !== n && E({
                                          unit: n,
                                          value: As(m.value, m.unit, n)
                                        });
                                      },
                                      "aria-label": "\uB300\uAE30 \uC2DC\uAC04 \uB2E8\uC704",
                                      children: [
                                        e.jsxs("label", {
                                          className: "flex items-center gap-1.5 cursor-pointer",
                                          children: [
                                            e.jsx(Ne, {
                                              value: "s",
                                              className: "size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                                              children: e.jsx(Dt, {
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
                                            e.jsx(Ne, {
                                              value: "ms",
                                              className: "size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                                              children: e.jsx(Dt, {
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
                                      _s(m),
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
                                    value: Je,
                                    checked: q === Je,
                                    onChange: () => {
                                      Ke(Je), fr(Je);
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
                                    value: Qe,
                                    checked: q === Qe,
                                    onChange: () => {
                                      Ke(Qe), fr(Qe);
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
                          children: "\uCC44\uD305 \uC785\uB825\uCC3D \uC544\uB798 \uB2E8\uCD95\uD0A4 \uC548\uB0B4 \uBB38\uAD6C \uD45C\uC2DC \uC5EC\uBD80\uB97C \uC124\uC815\uD569\uB2C8\uB2E4."
                        }),
                        e.jsxs("label", {
                          className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                          children: [
                            e.jsx("button", {
                              type: "button",
                              onClick: () => {
                                H("settings-composer-helper", !Ge);
                              },
                              className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Ge ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                              "aria-pressed": Ge,
                              "aria-label": "\uC785\uB825\uCC3D \uB2E8\uCD95\uD0A4 \uC548\uB0B4 \uD45C\uC2DC",
                              children: e.jsx("span", {
                                className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Ge ? "translate-x-4" : "translate-x-0.5"}`
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
                  e.jsx(ne, {
                    id: "quiz",
                    title: "\uD034\uC988",
                    open: se.quiz !== false,
                    onOpenChange: (n) => Q("quiz", n),
                    children: e.jsx(Ps, {
                      llmProviderProfiles: qe(X)
                    })
                  }),
                  e.jsxs(ne, {
                    id: "app",
                    title: "\uC571",
                    open: se.app !== false,
                    onOpenChange: (n) => Q("app", n),
                    children: [
                      e.jsx(Jn, {}),
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
                                    children: zs() || "\uC54C \uC218 \uC5C6\uC74C"
                                  })
                                ]
                              }),
                              Me ? e.jsxs("div", {
                                className: "flex flex-wrap gap-x-2 gap-y-0.5",
                                children: [
                                  e.jsx("dt", {
                                    className: "shrink-0 font-semibold text-gray-700 dark:text-odp-fgStrong",
                                    children: "\uCD5C\uC2E0 \uBC84\uC804"
                                  }),
                                  e.jsx("dd", {
                                    className: "min-w-0 break-all font-mono",
                                    children: Me
                                  })
                                ]
                              }) : null
                            ]
                          }),
                          e.jsxs("button", {
                            type: "button",
                            onClick: () => re == null ? void 0 : re(),
                            disabled: $e || typeof re != "function",
                            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-60",
                            children: [
                              e.jsx(tt, {
                                size: 16
                              }),
                              $e ? "\uCD5C\uC2E0 \uBC84\uC804 \uD655\uC778 \uC911..." : "\uCD5C\uC2E0 \uBC84\uC804 \uD655\uC778 \uBC0F \uC989\uC2DC \uC5C5\uB370\uC774\uD2B8"
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            }),
            Y ? null : e.jsx(gn, {
              groups: yt,
              activeSectionId: Zr,
              onNavigate: ea
            })
          ]
        })
      ]
    });
  };
});
export {
  __tla,
  fo as default
};
