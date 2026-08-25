const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BegHbZbw.js","assets/vendor-react-SY5QCjFA.js","assets/vendor-md-editor-CyUZNHY0.js","assets/vendor-aws-BNw5jQBi.js","assets/vendor-lucide-DpPvFd8E.js","assets/vendor-motion-YU7ZxHqi.js","assets/vendor-radix--fTcLYkF.js","assets/vendor-zip-Bez6qchM.js","assets/index-ljC4e9Ff.css"])))=>i.map(i=>d[i]);
import { _ as cr, __tla as __tla_0 } from "./vendor-md-editor-CyUZNHY0.js";
import { r as a, j as e, f as xr, __tla as __tla_1 } from "./vendor-react-SY5QCjFA.js";
import { dG as Qe, dH as br, dI as ur, dJ as pr, dK as gr, as as be, dL as mr, dM as hr, dN as fr, dO as yr, dP as kr, dn as yt, d1 as kt, cZ as G, dQ as jt, dR as vt, c_ as jr, c$ as vr, dS as Nr, dT as Sr, dU as Nt, dV as St, dW as Re, dX as wr, dY as Cr, dZ as Er, d_ as wt, d$ as Ir, e0 as Ct, e1 as se, e2 as ce, e3 as et, e4 as Et, e5 as Or, e6 as Ar, a0 as Pr, e7 as $, e8 as ne, e9 as xe, ea as ye, eb as Lr, ec as Bt, ac as $e, ed as It, ee as _r, ef as Dr, eg as zr, eh as Tr, ei as Rr, ej as $r, ek as Fr, el as Br, em as Mr, en as Ot, eo as Kr, z as Wr, ep as Ur, eq as At, er as Gr, d2 as Pt, es as Lt, et as tt, eu as Vr, ev as Hr, ew as Xr, ex as Yr, ey as Jr, ez as qr, eA as he, eB as Zr, eC as Qr, eD as ea, eE as ta, eF as _t, eG as ra, eH as aa, eI as sa, eJ as da, eK as na, eL as oa, eM as Fe, eN as Dt, eO as Be, eP as la, eQ as ia, __tla as __tla_2 } from "./index-BegHbZbw.js";
import { W as Mt, ap as Kt, x as Wt, T as Ke, a as oe, b as le, X as Ut, a1 as ca, v as We, t as Gt, e as xa, G as ba } from "./vendor-lucide-DpPvFd8E.js";
import { T as ua } from "./TableStyleTemplateEditor-C6ANQRdr.js";
import { S as zt } from "./SliderWithScrubInput-B28d-DVd.js";
import { K as Vt, M as Ht, G as ke, H as ie, J as Ue, D as pa, g as ga, h as ma, i as ha, j as fa, k as ya } from "./vendor-radix--fTcLYkF.js";
import { G as ka, O as ja, __tla as __tla_3 } from "./OpenAiCompatibleModelSelect-DcASc1vD.js";
import "./vendor-aws-BNw5jQBi.js";
import "./vendor-motion-YU7ZxHqi.js";
import "./vendor-zip-Bez6qchM.js";
import "./index-CG4BSG42.js";
import "./vendor-google-genai-Dw3BcYJd.js";
let ps;
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
  function ee(t) {
    if (t == null || Number.isNaN(t)) return "\uC54C \uC218 \uC5C6\uC74C";
    if (t < 1024) return `${t} B`;
    const d = t / 1024;
    if (d < 1024) return `${d.toFixed(1)} KB`;
    const s = d / 1024;
    return s < 1024 ? `${s.toFixed(1)} MB` : `${(s / 1024).toFixed(1)} GB`;
  }
  function va(t) {
    const d = String(t || "").toLowerCase(), s = d.lastIndexOf(".");
    return s <= 0 || s === d.length - 1 ? "(none)" : d.slice(s + 1);
  }
  function Na(t) {
    const d = String(t || "").replace(/^\/+/, "");
    return d === Qe || d === `${Qe}/` || d.startsWith(`${Qe}/`);
  }
  function Xt(t) {
    var _a2;
    if (t.type === "file") return typeof t.size == "number" && Number.isFinite(t.size) ? t.size : 0;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let d = 0;
    for (const s of t.children) d += Xt(s);
    return d;
  }
  function Yt(t) {
    var _a2;
    if (t.type === "file") return 1;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let d = 0;
    for (const s of t.children) d += Yt(s);
    return d;
  }
  function Sa(t) {
    const d = Array.isArray(t) ? t : [];
    let s = 0, u = 0, n = 0, i = 0, m = 0, k = 0, N = 0;
    const v = /* @__PURE__ */ new Map(), O = (x) => {
      var _a2;
      for (const p of x) {
        if (p.type === "folder") {
          u += 1, ((_a2 = p.children) == null ? void 0 : _a2.length) && O(p.children);
          continue;
        }
        if (p.type !== "file") continue;
        s += 1;
        const C = typeof p.size == "number" && Number.isFinite(p.size), A = C ? p.size : 0;
        C ? A === 0 && (n += 1) : i += 1, m += A;
        const o = p.path || p.name;
        Na(o) && (k += A, N += 1);
        const b = va(p.name), c = v.get(b) ?? {
          count: 0,
          size: 0,
          files: []
        };
        c.count += 1, c.size += A, c.files.push({
          path: o,
          name: p.name,
          size: C ? A : null,
          node: p
        }), v.set(b, c);
      }
    };
    O(d);
    const I = [
      ...v.entries()
    ].map(([x, { count: p, size: C, files: A }]) => ({
      ext: x,
      label: x === "(none)" ? "(\uD655\uC7A5\uC790 \uC5C6\uC74C)" : `.${x}`,
      count: p,
      size: C,
      percent: m > 0 ? C / m * 100 : 0,
      files: [
        ...A
      ].sort((o, b) => (b.size ?? -1) - (o.size ?? -1) || o.path.localeCompare(b.path))
    })).sort((x, p) => p.size - x.size || p.count - x.count || x.label.localeCompare(p.label)), w = [], g = (x, p, C) => {
      var _a2;
      const A = x.filter((o) => o.type === "folder").map((o) => ({
        node: o,
        size: Xt(o),
        fileCount: Yt(o)
      })).sort((o, b) => b.size - o.size || o.node.name.localeCompare(b.node.name));
      for (const { node: o, size: b, fileCount: c } of A) {
        const h = o.path || `${o.name}/`, T = (o.children ?? []).some((R) => R.type === "folder");
        w.push({
          path: h,
          name: o.name,
          depth: p,
          parentPath: C,
          hasChildFolders: T,
          size: b,
          fileCount: c,
          percent: m > 0 ? b / m * 100 : 0
        }), ((_a2 = o.children) == null ? void 0 : _a2.length) && g(o.children, p + 1, h);
      }
    };
    return g(d, 0, null), {
      summary: {
        totalSize: m,
        fileCount: s,
        folderCount: u,
        zeroByteCount: n,
        unknownSizeCount: i,
        indexSize: k,
        indexFileCount: N
      },
      byExtension: I,
      folders: w
    };
  }
  function wa(t) {
    return !t || typeof t != "string" ? "" : t.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
  }
  function Ca(t) {
    const d = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), s = [];
    (d ? t.metaKey : t.ctrlKey) && s.push("mod"), t.altKey && s.push("alt"), t.shiftKey && s.push("shift");
    const u = (t.key || "").toLowerCase();
    return !u || u === "shift" || u === "control" || u === "alt" || u === "meta" || (s.push(u), s.length <= 1) ? null : s.join("+");
  }
  function rt(t) {
    if (!t || typeof t != "string") return "";
    const s = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "Cmd" : "Ctrl";
    return t.toLowerCase().replace(/\bmod\b/g, s).split("+").map((u) => u.trim().charAt(0).toUpperCase() + u.trim().slice(1)).join(" + ");
  }
  function Ea() {
    return {
      id: String(Date.now()) + "-" + Math.random().toString(36).slice(2),
      name: "",
      prefix: "",
      body: "",
      description: ""
    };
  }
  function Ia({ value: t, onChange: d, onSave: s, isSaving: u = false, isLoaded: n = true }) {
    const [i, m] = a.useState(() => t || {
      snippets: []
    }), [k, N] = a.useState(null), [v, O] = a.useState(null);
    a.useEffect(() => {
      m(t || {
        snippets: []
      });
    }, [
      t
    ]), a.useEffect(() => {
      if (!k) return;
      const c = (h) => {
        h.preventDefault(), h.stopPropagation();
        const T = Ca(h);
        T && O(T);
      };
      return window.addEventListener("keydown", c, true), () => window.removeEventListener("keydown", c, true);
    }, [
      k
    ]);
    const I = (c) => {
      const h = {
        snippets: c
      };
      m(h), d == null ? void 0 : d(h);
    }, w = () => {
      I([
        ...i.snippets || [],
        Ea()
      ]);
    }, g = (c, h, T) => {
      const R = (i.snippets || []).map((_) => _.id === c ? {
        ..._,
        [h]: T
      } : _);
      I(R);
    }, x = (c) => {
      const h = (i.snippets || []).filter((T) => T.id !== c);
      I(h);
    }, p = (c) => {
      N(c), O(null);
    }, C = () => {
      N(null), O(null);
    }, A = () => {
      !k || !v || (g(k, "prefix", v), C());
    }, o = () => {
      const h = (i.snippets || []).map((L) => {
        const M = (L.prefix || "").trim(), te = wa(M) || M;
        return {
          ...L,
          name: (L.name || "").trim(),
          prefix: te,
          body: (L.body || "").replace(/\r\n/g, `
`),
          description: (L.description || "").trim()
        };
      });
      if (h.find((L) => !L.prefix || !L.body)) {
        alert("\uAC01 \uC2A4\uB2C8\uD3AB\uC5D0\uB294 \uB2E8\uCD95\uD0A4(shortcut)\uC640 body\uAC00 \uBAA8\uB450 \uD544\uC694\uD569\uB2C8\uB2E4.");
        return;
      }
      const R = /* @__PURE__ */ new Set();
      for (const L of h) {
        if (R.has(L.prefix)) {
          alert(`\uC911\uBCF5\uB41C \uB2E8\uCD95\uD0A4 "${L.prefix}" \uC774(\uAC00) \uC788\uC2B5\uB2C8\uB2E4. \uAC01 \uB2E8\uCD95\uD0A4\uB294 \uACE0\uC720\uD574\uC57C \uD569\uB2C8\uB2E4.`);
          return;
        }
        R.add(L.prefix);
      }
      const _ = {
        snippets: h
      };
      m(_), d == null ? void 0 : d(_), s == null ? void 0 : s(_);
    }, b = i.snippets || [];
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
            n && b.length === 0 && e.jsx("p", {
              className: "text-xs text-gray-500 dark:text-odp-muted",
              children: '\uC544\uC9C1 \uB4F1\uB85D\uB41C \uC2A4\uB2C8\uD3AB\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC544\uB798 "\uC2A4\uB2C8\uD3AB \uCD94\uAC00" \uBC84\uD2BC\uC744 \uB20C\uB7EC \uC0C8 \uC2A4\uB2C8\uD3AB\uC744 \uB9CC\uB4E4\uC5B4 \uBCF4\uC138\uC694.'
            }),
            b.map((c) => e.jsxs("div", {
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
                          value: c.name || "",
                          onChange: (h) => g(c.id, "name", h.target.value),
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
                              title: c.prefix ? rt(c.prefix) : "",
                              children: c.prefix ? rt(c.prefix) : "\uBBF8\uC124\uC815"
                            }),
                            e.jsx("button", {
                              type: "button",
                              className: "shrink-0 px-2 py-1 text-[11px] rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
                              onClick: () => p(c.id),
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
                      value: c.body || "",
                      onChange: (h) => g(c.id, "body", h.target.value),
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
                          value: c.description || "",
                          onChange: (h) => g(c.id, "description", h.target.value),
                          placeholder: "\uC608: TODO \uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC2A4\uB2C8\uD3AB"
                        })
                      ]
                    }),
                    e.jsx("button", {
                      type: "button",
                      className: "mt-4 sm:mt-6 px-2 py-1 text-[11px] text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/40 rounded hover:bg-red-50 dark:hover:bg-red-900/20 whitespace-nowrap",
                      onClick: () => {
                        window.confirm("\uC774 \uC2A4\uB2C8\uD3AB\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?") && x(c.id);
                      },
                      children: "\uC0AD\uC81C"
                    })
                  ]
                })
              ]
            }, c.id))
          ]
        }),
        e.jsxs("div", {
          className: "flex items-center justify-between gap-2 pt-1",
          children: [
            e.jsx("button", {
              type: "button",
              onClick: w,
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
        k != null && e.jsx("div", {
          className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "snippet-shortcut-modal-title",
          onClick: C,
          children: e.jsxs("div", {
            className: "bg-white dark:bg-odp-surface rounded-lg shadow-xl border border-gray-200 dark:border-odp-borderStrong p-5 w-full max-w-sm",
            onClick: (c) => c.stopPropagation(),
            onKeyDown: (c) => c.stopPropagation(),
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
                  children: rt(v)
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
                    onClick: C,
                    className: "px-3 py-1.5 text-xs rounded border border-gray-300 dark:border-odp-borderStrong text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
                    children: "\uCDE8\uC18C"
                  }),
                  e.jsx("button", {
                    type: "button",
                    onClick: A,
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
  function Oa() {
    const [t, d] = a.useState([]), [s, u] = a.useState(false), [n, i] = a.useState(false), [m, k] = a.useState(null), [N, v] = a.useState(false), [O, I] = a.useState(null), [w, g] = a.useState(null), x = a.useCallback(async () => {
      k(null);
      try {
        const o = await br();
        d(o.files), u(true);
      } catch (o) {
        k(o instanceof Error ? o.message : String(o)), u(true);
      }
    }, []);
    a.useEffect(() => {
      x();
    }, [
      x
    ]);
    const p = () => {
      I(null), v(true);
    }, C = (o) => {
      I(o), v(true);
    }, A = async () => {
      if (w) {
        i(true), k(null);
        try {
          const o = await mr(w.id);
          d(o.files), g(null);
        } catch (o) {
          k(o instanceof Error ? o.message : String(o));
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
        m ? e.jsx("p", {
          className: "mb-2 text-xs text-red-600 dark:text-red-400",
          role: "alert",
          children: m
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
              children: ur.map((o) => e.jsxs("li", {
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
                  disabled: !s || n,
                  onClick: p,
                  className: "inline-flex items-center gap-1 rounded bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
                  children: [
                    e.jsx(Mt, {
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
                    e.jsx(Kt, {
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
          children: t.map((o) => {
            const b = pr(o.css);
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
                        b.length ? ` \xB7 ${b.join(", ")}` : ""
                      ]
                    }),
                    b.length > 0 ? e.jsx("ul", {
                      className: "mt-1 flex flex-wrap gap-1",
                      children: b.map((c) => e.jsx("li", {
                        className: "rounded-full border border-gray-100 bg-gray-50 px-1.5 py-0.5 text-[10px] dark:border-odp-border dark:bg-odp-bg",
                        style: {
                          fontFamily: c
                        },
                        children: c
                      }, c))
                    }) : null
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: n,
                  onClick: () => C(o),
                  className: "inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg",
                  children: [
                    e.jsx(Wt, {
                      className: "h-3 w-3",
                      "aria-hidden": true
                    }),
                    "\uD3B8\uC9D1"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: n,
                  onClick: () => g(o),
                  className: "inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40",
                  children: [
                    e.jsx(Ke, {
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
        e.jsx(gr, {
          isOpen: N,
          initialFile: O,
          onClose: () => {
            v(false), I(null);
          },
          onSaved: () => {
            x();
          }
        }),
        e.jsx(be, {
          isOpen: !!w,
          title: "\uC6F9\uD3F0\uD2B8 \uC0AD\uC81C",
          message: w ? `"${w.name}" (${w.filename}) \uD30C\uC77C\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694\uAE4C\uC694?` : "",
          confirmLabel: "\uC0AD\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: () => {
            A();
          },
          onCancel: () => g(null)
        })
      ]
    });
  }
  function Aa() {
    const [t, d] = a.useState([]), [s, u] = a.useState(false), [n, i] = a.useState(false), [m, k] = a.useState(null), [N, v] = a.useState(null), [O, I] = a.useState(false), w = a.useCallback(async () => {
      k(null);
      try {
        const x = await hr();
        d(x.templates), u(true);
      } catch (x) {
        k(x instanceof Error ? x.message : String(x)), d(fr().templates), u(true);
      }
    }, []);
    a.useEffect(() => {
      w();
    }, [
      w
    ]);
    const g = async (x) => {
      i(true), k(null);
      try {
        await yr({
          ...kr,
          templates: x
        }), d(x);
      } catch (p) {
        k(p instanceof Error ? p.message : String(p));
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
        m ? e.jsx("p", {
          className: "mb-2 text-xs text-red-600",
          children: m
        }) : null,
        e.jsxs("div", {
          className: "mb-3 flex gap-2",
          children: [
            e.jsx("button", {
              type: "button",
              disabled: !s || n,
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
                }), I(true);
              },
              className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
              children: "\uC0C8 \uD15C\uD50C\uB9BF"
            }),
            e.jsx("button", {
              type: "button",
              disabled: n,
              onClick: () => {
                w();
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
                        v(x), I(true);
                      },
                      children: "\uD3B8\uC9D1"
                    }),
                    e.jsx("button", {
                      type: "button",
                      className: "rounded px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
                      onClick: () => {
                        g(t.filter((p) => p.id !== x.id));
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
        e.jsx(ua, {
          isOpen: O,
          template: N,
          onClose: () => {
            I(false), v(null);
          },
          onSave: (x) => {
            const p = t.filter((C) => C.id !== (N == null ? void 0 : N.id) && C.id !== x.id);
            g([
              ...p,
              x
            ]).then(() => {
              I(false), v(null);
            });
          }
        })
      ]
    });
  }
  const Pa = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), La = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function Me({ label: t, description: d, checked: s, onCheckedChange: u, ariaLabel: n }) {
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
              children: d
            })
          ]
        }),
        e.jsx(Vt, {
          className: Pa(s),
          checked: s,
          onCheckedChange: u,
          "aria-label": n,
          children: e.jsx(Ht, {
            className: La
          })
        })
      ]
    });
  }
  function _a() {
    const [t, d] = a.useState(() => yt());
    return a.useEffect(() => {
      const s = () => d(yt());
      return s(), window.addEventListener(kt, s), () => window.removeEventListener(kt, s);
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
                e.jsx(Me, {
                  label: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5",
                  description: "\uB4DC\uB798\uADF8 \uC2DC \uD398\uC774\uC9C0 \uAC00\uB85C\xB7\uC138\uB85C \uC911\uC559\uC120\uC5D0 \uB9DE\uCDA4",
                  checked: t.centerSnapEnabled,
                  onCheckedChange: (s) => G("settings-cover-center-snap", s),
                  ariaLabel: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5"
                }),
                e.jsxs("label", {
                  className: "block space-y-1 pt-1",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-400",
                      children: "\uD5C8\uC6A9 \uC624\uCC28"
                    }),
                    e.jsx(zt, {
                      unit: "css",
                      suffix: "px",
                      min: vt,
                      max: jt,
                      step: 0.1,
                      value: t.centerSnapTolerancePx,
                      "aria-label": "\uAC00\uC6B4\uB370 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (s) => jr(s)
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              className: "space-y-2 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: [
                e.jsx(Me, {
                  label: "\uAC1C\uCCB4 \uC2A4\uB0C5",
                  description: "\uB2E4\uB978 \uAC1C\uCCB4\uC758 \uD14C\uB450\uB9AC\xB7\uAC00\uC6B4\uB370\uC120\uC5D0 \uB9DE\uCDA4 (\uADF8\uB8F9\uC740 \uD1B5\uC9F8\uB85C)",
                  checked: t.objectSnapEnabled,
                  onCheckedChange: (s) => G("settings-cover-object-snap", s),
                  ariaLabel: "\uAC1C\uCCB4 \uC2A4\uB0C5"
                }),
                e.jsxs("label", {
                  className: "block space-y-1 pt-1",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-400",
                      children: "\uD5C8\uC6A9 \uC624\uCC28"
                    }),
                    e.jsx(zt, {
                      unit: "css",
                      suffix: "px",
                      min: vt,
                      max: jt,
                      step: 0.1,
                      value: t.objectSnapTolerancePx,
                      "aria-label": "\uAC1C\uCCB4 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (s) => vr(s)
                    })
                  ]
                })
              ]
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(Me, {
                label: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC",
                description: "\uC120\uD0DD\uACFC \uBB34\uAD00\uD558\uAC8C \uBAA8\uB4E0 \uD14D\uC2A4\uD2B8 \uC0C1\uC790\uB97C \uC605\uC740 \uBD89\uC740 \uC2E4\uC120\uC73C\uB85C \uD45C\uC2DC",
                checked: t.textContainerOutlineEnabled,
                onCheckedChange: (s) => G("settings-cover-text-outline", s),
                ariaLabel: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC"
              })
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(Me, {
                label: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30",
                description: "\uD14D\uC2A4\uD2B8\xB7\uC774\uBBF8\uC9C0\xB7\uB3C4\uD615 \uC0BD\uC785 \uC2DC \uBC18\uD22C\uBA85 \uACE0\uC2A4\uD2B8 \uBBF8\uB9AC\uBCF4\uAE30",
                checked: t.placePreviewEnabled,
                onCheckedChange: (s) => G("settings-cover-place-preview", s),
                ariaLabel: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30"
              })
            }),
            e.jsxs("p", {
              className: "text-[11px] text-gray-500 dark:text-odp-muted",
              children: [
                "\uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28 \uAE30\uBCF8\uAC12 ",
                Nr,
                "px \xB7 0.1px \uB2E8\uC704"
              ]
            })
          ]
        })
      ]
    });
  }
  function Da() {
    const [t, d] = a.useState(""), [s, u] = a.useState(""), [n, i] = a.useState(null), [m, k] = a.useState(false);
    a.useEffect(() => {
      const g = () => {
        const p = Er();
        d(p), u(p);
      };
      g(), Sr().then((p) => {
        d(p.url), u(p.url);
      });
      const x = () => g();
      return window.addEventListener(Nt, x), () => window.removeEventListener(Nt, x);
    }, []);
    const N = St(t) !== s, v = St(t), O = !!String(t || "").trim() && !v, I = async () => {
      const g = String(t || "").trim();
      if (g && !v) {
        i("https:// \uB85C \uC2DC\uC791\uD558\uB294 Worker \uC8FC\uC18C\uB97C \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      k(true), i(null);
      try {
        const x = await wt(g);
        d(x), u(x), i(x ? `\uC800\uC7A5\uB428 \u2014 ${Re}\uC5D0 \uAE30\uB85D\uD588\uACE0, OG \uC694\uCCAD \uC2DC \uC774 Worker\uB97C \uAC00\uC7A5 \uBA3C\uC800 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.` : `Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${Re}).`);
      } finally {
        k(false);
      }
    }, w = async () => {
      k(true), i(null);
      try {
        d("");
        const g = await wt("");
        u(g), i(`Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${Re}).`);
      } finally {
        k(false);
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
              children: Re
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
              href: wr,
              target: "_blank",
              rel: "noreferrer noopener",
              className: "inline-block",
              children: e.jsx("img", {
                src: Cr,
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
          disabled: m,
          onChange: (g) => {
            d(g.target.value), i(null);
          },
          onKeyDown: (g) => {
            g.key === "Enter" && (g.preventDefault(), I());
          }
        }),
        O ? e.jsx("p", {
          className: "mt-1 text-[11px] text-red-600 dark:text-red-400",
          children: "https:// \uB610\uB294 http:// \uB85C \uC2DC\uC791\uD558\uB294 \uC720\uD6A8\uD55C URL\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4."
        }) : null,
        e.jsxs("div", {
          className: "mt-3 flex flex-wrap items-center gap-2",
          children: [
            e.jsx("button", {
              type: "button",
              onClick: () => {
                I();
              },
              disabled: m || !N && !O,
              className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
              children: m ? "\uC800\uC7A5 \uC911\u2026" : "\uC800\uC7A5"
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => {
                w();
              },
              disabled: m || !s && !t,
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
  const Tt = "size-3.5 rounded-full border border-gray-400 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft", Rt = "relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white";
  function za(t) {
    return t === ce ? "Google Gemini" : "OpenAI \uD638\uD658";
  }
  function Ta() {
    return {
      id: Ar(),
      name: "",
      kind: se,
      baseUrl: "",
      keyInput: "",
      hasStoredKey: false
    };
  }
  function Ra(t) {
    return {
      id: t.id,
      name: t.name,
      kind: t.kind,
      baseUrl: t.baseUrl,
      keyInput: "",
      hasStoredKey: !!t.apiKey.trim()
    };
  }
  function $a({ profiles: t, onSaveProfiles: d }) {
    const [s, u] = a.useState(true), [n, i] = a.useState(null), [m, k] = a.useState(null), [N, v] = a.useState(null), [O, I] = a.useState(0), w = a.useMemo(() => m ? t.find((b) => b.id === m) ?? null : null, [
      m,
      t
    ]), g = n ? Ir(n.id, n.kind) || Ct(n.kind) : "", x = () => {
      k(null), i(Ta());
    }, p = (b) => {
      k(b.id), i(Ra(b));
    }, C = () => {
      i(null), k(null);
    }, A = () => {
      if (!n) return;
      const b = Or({
        name: n.name,
        kind: n.kind,
        baseUrl: n.baseUrl,
        apiKey: n.keyInput,
        hasStoredKey: n.hasStoredKey
      });
      if (b) {
        alert(b);
        return;
      }
      const c = n.keyInput.trim() || ((w == null ? void 0 : w.id) === n.id ? w.apiKey : ""), h = {
        id: n.id,
        name: n.name.trim(),
        kind: n.kind,
        baseUrl: n.kind === se ? Et(n.baseUrl) : "",
        apiKey: c
      }, R = t.some((_) => _.id === h.id) ? t.map((_) => _.id === h.id ? h : _) : [
        ...t,
        h
      ];
      d(R), C();
    }, o = () => {
      if (!N) return;
      const b = t.filter((c) => c.id !== N.id);
      d(b), (n == null ? void 0 : n.id) === N.id && C(), v(null);
    };
    return e.jsxs("div", {
      id: "settings-llm-providers",
      tabIndex: -1,
      className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: () => u((b) => !b),
          className: "flex w-full items-center gap-2 text-left",
          "aria-expanded": s,
          children: [
            s ? e.jsx(oe, {
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
        s ? e.jsxs(e.Fragment, {
          children: [
            e.jsx("p", {
              className: "text-xs text-gray-600 dark:text-odp-muted",
              children: "Gemini\uC640 OpenAI \uD638\uD658 endpoint\uB97C \uC5EC\uB7EC \uAC1C \uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC2E4\uC81C \uC0AC\uC6A9\uD560 \uC81C\uACF5\uC790\uB294 \uC5D0\uB514\uD130 AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uACE0\uB985\uB2C8\uB2E4. API \uD0A4\uB294 \uC5F0\uACB0 \uC815\uBCF4\uC640 \uD568\uAED8 \uC554\uD638\uD654\uB418\uBA70, \uC774 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uD45C\uC2DC\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Gemini\uB294 \uC6F9\uC5D0\uC11C same-origin \uD504\uB85D\uC2DC(/api/gemini)\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. OpenAI \uD638\uD658 endpoint\uB294 CORS\uAC00 \uD5C8\uC6A9\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4."
            }),
            t.length === 0 ? e.jsx("p", {
              className: "text-xs text-gray-500 dark:text-odp-muted",
              children: "\uC800\uC7A5\uB41C \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC544\uB798 \uBC84\uD2BC\uC73C\uB85C \uCD94\uAC00\uD558\uC138\uC694."
            }) : e.jsx("ul", {
              className: "space-y-1.5",
              children: t.map((b) => e.jsxs("li", {
                className: "flex items-center justify-between gap-2 rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: [
                  e.jsxs("div", {
                    className: "min-w-0",
                    children: [
                      e.jsx("div", {
                        className: "truncate text-sm font-medium text-gray-800 dark:text-odp-fgStrong",
                        children: b.name
                      }),
                      e.jsxs("div", {
                        className: "truncate text-[11px] text-gray-500 dark:text-odp-muted",
                        children: [
                          za(b.kind),
                          b.kind === se && b.baseUrl ? ` \xB7 ${b.baseUrl}` : ""
                        ]
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "flex shrink-0 items-center gap-1",
                    children: [
                      e.jsxs("button", {
                        type: "button",
                        onClick: () => p(b),
                        className: "inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg",
                        children: [
                          e.jsx(Wt, {
                            className: "h-3 w-3",
                            "aria-hidden": true
                          }),
                          "\uD3B8\uC9D1"
                        ]
                      }),
                      e.jsxs("button", {
                        type: "button",
                        onClick: () => v(b),
                        className: "inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40",
                        children: [
                          e.jsx(Ke, {
                            className: "h-3 w-3",
                            "aria-hidden": true
                          }),
                          "\uC0AD\uC81C"
                        ]
                      })
                    ]
                  })
                ]
              }, b.id))
            }),
            n ? e.jsxs("div", {
              className: "space-y-3 rounded border border-gray-200 bg-white p-3 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
              children: [
                e.jsx("p", {
                  className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong",
                  children: m ? "\uC81C\uACF5\uC790 \uD3B8\uC9D1" : "\uC81C\uACF5\uC790 \uCD94\uAC00"
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
                      onChange: (b) => i((c) => c && {
                        ...c,
                        name: b.target.value
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
                    e.jsxs(ke, {
                      className: "flex flex-wrap items-center gap-4",
                      value: n.kind,
                      onValueChange: (b) => {
                        if (b !== ce && b !== se) return;
                        const c = b;
                        i((h) => h && (et(h.id, Ct(c)), {
                          ...h,
                          kind: c,
                          keyInput: "",
                          hasStoredKey: (w == null ? void 0 : w.kind) === c && !!w.apiKey.trim()
                        })), I((h) => h + 1);
                      },
                      "aria-label": "\uC81C\uACF5\uC790 \uC885\uB958",
                      children: [
                        e.jsxs("label", {
                          className: "flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg",
                          children: [
                            e.jsx(ie, {
                              value: ce,
                              className: Tt,
                              children: e.jsx(Ue, {
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
                            e.jsx(ie, {
                              value: se,
                              className: Tt,
                              children: e.jsx(Ue, {
                                className: Rt
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
                n.kind === se ? e.jsxs("div", {
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
                      onChange: (b) => i((c) => c && {
                        ...c,
                        baseUrl: b.target.value
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
                        n.kind === se ? " (\uC120\uD0DD)" : ""
                      ]
                    }),
                    e.jsx("input", {
                      type: "password",
                      autoComplete: "off",
                      className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bg",
                      value: n.keyInput,
                      onChange: (b) => i((c) => c && {
                        ...c,
                        keyInput: b.target.value
                      }),
                      placeholder: n.hasStoredKey ? "\uC800\uC7A5\uB428 \u2014 \uBCC0\uACBD \uC2DC \uC0C8 \uD0A4 \uC785\uB825" : n.kind === ce ? "AI Studio API \uD0A4 \uC785\uB825" : "Bearer \uD1A0\uD070 (\uB85C\uCEEC \uC11C\uBC84\uB294 \uBE44\uC6CC \uB450\uC138\uC694)"
                    })
                  ]
                }),
                e.jsxs("div", {
                  children: [
                    e.jsx("label", {
                      className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                      children: "\uAE30\uBCF8 \uBAA8\uB378"
                    }),
                    n.kind === ce ? e.jsx(ka, {
                      getGeminiApiKey: () => n.keyInput.trim() || ((w == null ? void 0 : w.kind) === ce ? w.apiKey : ""),
                      profileId: n.id,
                      value: g,
                      onChange: (b) => {
                        et(n.id, b);
                      },
                      autoLoad: n.hasStoredKey || !!n.keyInput.trim()
                    }, `${n.id}-${O}`) : e.jsx(ja, {
                      getBaseUrl: () => n.baseUrl,
                      getApiKey: () => n.keyInput.trim() || ((w == null ? void 0 : w.kind) === se ? w.apiKey : ""),
                      value: g,
                      onChange: (b) => {
                        et(n.id, b);
                      },
                      autoLoad: !!Et(n.baseUrl)
                    }, `${n.id}-${O}`)
                  ]
                }),
                e.jsxs("div", {
                  className: "flex justify-end gap-2 pt-1",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: C,
                      className: "rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-focusBg",
                      children: "\uCDE8\uC18C"
                    }),
                    e.jsx("button", {
                      type: "button",
                      onClick: A,
                      className: "rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700",
                      children: "\uC81C\uACF5\uC790 \uC800\uC7A5"
                    })
                  ]
                })
              ]
            }) : e.jsxs("button", {
              type: "button",
              onClick: x,
              className: "inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs hover:bg-gray-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:hover:bg-odp-focusBg",
              children: [
                e.jsx(Mt, {
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
        e.jsx(be, {
          isOpen: !!N,
          title: "\uC81C\uACF5\uC790 \uC0AD\uC81C",
          message: N ? `"${N.name}" \uC81C\uACF5\uC790\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694?` : "",
          confirmLabel: "\uC0AD\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: o,
          onCancel: () => v(null)
        })
      ]
    });
  }
  function Fa({ open: t, extension: d, onOpenChange: s, onOpenFile: u }) {
    const n = (d == null ? void 0 : d.files) ?? [], i = d ? `${d.label} \uD30C\uC77C` : "\uD30C\uC77C \uBAA9\uB85D";
    return e.jsx(pa, {
      open: t,
      onOpenChange: s,
      children: e.jsxs(ga, {
        children: [
          e.jsx(ma, {
            className: "fixed inset-0 z-100000 bg-black/40"
          }),
          e.jsxs(ha, {
            className: "fixed top-1/2 left-1/2 z-100001 flex max-h-[min(90vh,40rem)] w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft",
            "aria-describedby": void 0,
            children: [
              e.jsxs("div", {
                className: "flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-odp-borderStrong",
                children: [
                  e.jsxs("div", {
                    className: "min-w-0",
                    children: [
                      e.jsx(fa, {
                        className: "truncate text-sm font-semibold text-gray-800 dark:text-odp-fgStrong",
                        children: i
                      }),
                      d ? e.jsxs("p", {
                        className: "mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted",
                        children: [
                          d.count.toLocaleString(),
                          "\uAC1C \xB7 ",
                          ee(d.size)
                        ]
                      }) : null
                    ]
                  }),
                  e.jsx(ya, {
                    asChild: true,
                    children: e.jsx("button", {
                      type: "button",
                      className: "inline-flex shrink-0 items-center justify-center rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-odp-focusBg dark:hover:text-odp-fg",
                      "aria-label": "\uB2EB\uAE30",
                      children: e.jsx(Ut, {
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
                  children: n.map((m) => e.jsx("li", {
                    children: e.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        u(m);
                      },
                      className: "flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition hover:bg-gray-50 dark:hover:bg-odp-focusBg/40",
                      children: [
                        e.jsx(ca, {
                          size: 14,
                          className: "shrink-0 text-gray-400 dark:text-odp-muted",
                          "aria-hidden": true
                        }),
                        e.jsxs("span", {
                          className: "min-w-0 flex-1",
                          children: [
                            e.jsx("span", {
                              className: "block truncate text-xs font-medium text-gray-800 dark:text-odp-fgStrong",
                              children: m.name
                            }),
                            e.jsx("span", {
                              className: "mt-0.5 block truncate font-mono text-[10px] text-gray-500 dark:text-odp-muted",
                              title: m.path,
                              children: m.path
                            })
                          ]
                        }),
                        e.jsx("span", {
                          className: "shrink-0 tabular-nums text-[11px] text-gray-600 dark:text-odp-muted",
                          children: ee(m.size)
                        })
                      ]
                    })
                  }, m.path))
                })
              })
            ]
          })
        ]
      })
    });
  }
  const Ba = 160;
  function Ma(t) {
    return t === "error" ? "text-red-600 dark:text-red-400" : t === "warn" ? "text-amber-700 dark:text-amber-300" : t === "ok" ? "text-emerald-700 dark:text-emerald-300" : "text-gray-600 dark:text-odp-muted";
  }
  function Jt({ logs: t, building: d = false, progress: s = null, className: u = "" }) {
    const n = a.useRef(null);
    return a.useEffect(() => {
      var _a2;
      t.length !== 0 && ((_a2 = n.current) == null ? void 0 : _a2.scrollToIndex(t.length - 1, {
        align: "end"
      }));
    }, [
      t,
      d
    ]), !d && t.length === 0 ? null : e.jsxs("div", {
      className: `overflow-hidden rounded-md border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft ${u}`,
      children: [
        e.jsxs("div", {
          className: "flex items-center justify-between gap-2 border-b border-gray-100 px-2.5 py-1.5 dark:border-odp-borderSoft",
          children: [
            e.jsxs("span", {
              className: "text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong",
              children: [
                "\uC0C9\uC778 \uB85C\uADF8",
                d ? " (\uC2E4\uC2DC\uAC04)" : ""
              ]
            }),
            d && typeof s == "number" ? e.jsxs("span", {
              className: "text-[10px] tabular-nums text-amber-700 dark:text-amber-300",
              children: [
                Math.round(s * 100),
                "%"
              ]
            }) : null
          ]
        }),
        d && typeof s == "number" ? e.jsx("div", {
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
        }) : e.jsx(Pr, {
          ref: n,
          className: "overscroll-contain px-2.5 py-1.5 font-mono text-[10px] leading-relaxed",
          style: {
            height: Ba
          },
          data: t,
          "aria-live": "polite",
          "aria-relevant": "additions",
          children: (i) => e.jsxs("div", {
            className: `whitespace-pre-wrap break-all ${Ma(i.level)}`,
            children: [
              e.jsx("span", {
                className: "text-gray-400 dark:text-odp-muted",
                children: Ka(i.at)
              }),
              " ",
              i.message
            ]
          }, i.id)
        })
      ]
    });
  }
  function Ka(t) {
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
  function qt({ isOpen: t, info: d, onResume: s, onStartFresh: u, onCancel: n }) {
    const i = (d == null ? void 0 : d.processedFileCount) ?? 0, m = (d == null ? void 0 : d.processedChatCount) ?? 0, k = i + m, N = (d == null ? void 0 : d.updatedAt) && d.updatedAt > 0 ? new Date(d.updatedAt).toLocaleString() : null;
    return e.jsx(be, {
      isOpen: t,
      title: "\uC911\uC9C0\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8",
      message: k > 0 ? `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778\uC774 \uC788\uC2B5\uB2C8\uB2E4.
\uCC98\uB9AC\uB428: \uD30C\uC77C ${i} \xB7 \uCC44\uD305 day ${m}${N ? `
\uC800\uC7A5 \uC2DC\uAC01: ${N}` : ""}

\uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAE4C\uC694, \uC544\uB2C8\uBA74 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uB9CC\uB4E4\uAE4C\uC694?` : `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4.
\uC774\uC5B4\uC11C \uC9C4\uD589\uD560\uAE4C\uC694, \uC544\uB2C8\uBA74 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uB9CC\uB4E4\uAE4C\uC694?`,
      confirmLabel: "\uC774\uC5B4\uC11C \uC0C9\uC778",
      discardLabel: "\uCC98\uC74C\uBD80\uD130",
      cancelLabel: "\uCDE8\uC18C",
      onConfirm: s,
      onDiscard: u,
      onCancel: n
    });
  }
  const fe = [
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
  ], Wa = `linear-gradient(90deg, ${fe.map((t) => `rgb(${t.rgb.join(" ")}) ${(t.t * 100).toFixed(2)}%`).join(", ")})`;
  function $t(t) {
    return Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : 0;
  }
  function at(t, d, s) {
    return Math.round(t + (d - t) * s);
  }
  function Ua(t) {
    const d = $t(t / 100);
    let s = 0;
    for (; s < fe.length - 2 && d > fe[s + 1].t; ) s += 1;
    const u = fe[s], n = fe[s + 1], i = n.t - u.t || 1, m = $t((d - u.t) / i), k = at(u.rgb[0], n.rgb[0], m), N = at(u.rgb[1], n.rgb[1], m), v = at(u.rgb[2], n.rgb[2], m);
    return `rgb(${k} ${N} ${v})`;
  }
  function Ft({ percent: t }) {
    const d = Ua(t);
    return e.jsxs("span", {
      className: "inline-flex items-center justify-end gap-1.5",
      children: [
        e.jsx("span", {
          className: "inline-block size-2.5 shrink-0 rounded-full border border-gray-300/80 shadow-sm dark:border-odp-borderStrong",
          style: {
            backgroundColor: d
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
  function Ga() {
    return e.jsxs("div", {
      className: "space-y-0.5",
      "aria-label": "\uC6A9\uB7C9 \uBE44\uC728 \uC0C9\uC0C1 \uBC94\uB840",
      children: [
        e.jsx("div", {
          className: "h-1.5 w-full rounded-full border border-gray-200 dark:border-odp-borderStrong",
          style: {
            backgroundImage: Wa
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
  function Va(t) {
    return t === xe ? "Local Haim" : t === ye ? "WebDAV Haim" : t === ne ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function Ha() {
    return e.jsx("div", {
      className: "flex h-40 min-h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-white text-xs text-gray-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted md:h-full md:min-h-48",
      children: "\uADF8\uB798\uD504 \uC900\uBE44\uC911"
    });
  }
  function Xa({ depth: t, expandable: d, expanded: s, label: u }) {
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
        d ? e.jsx("span", {
          className: "inline-flex size-4 shrink-0 items-center justify-center text-gray-500 dark:text-odp-muted",
          "aria-hidden": true,
          children: s ? e.jsx(oe, {
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
  function st({ columns: t, rows: d, emptyText: s = "\uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", maxHeightClass: u = "max-h-64", legendColumnKey: n = null }) {
    return e.jsx("div", {
      className: `${u} overflow-auto rounded-md border border-gray-200 dark:border-odp-borderStrong`,
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
            children: d.length === 0 ? e.jsx("tr", {
              children: e.jsx("td", {
                colSpan: t.length,
                className: "px-3 py-6 text-center text-gray-500 dark:text-odp-muted",
                children: s
              })
            }) : d.map((i, m) => {
              var _a2, _b, _c, _d;
              const k = typeof i._onClick == "function", N = ((_a2 = i._tree) == null ? void 0 : _a2.expandable) ? i._tree.expanded : void 0, v = (_c = (_b = d[m - 1]) == null ? void 0 : _b._tree) == null ? void 0 : _c.depth, O = (_d = i._tree) == null ? void 0 : _d.depth, I = m > 0 && typeof v == "number" && typeof O == "number" && O < v, w = (g) => {
                var _a3;
                k && (g.key !== "Enter" && g.key !== " " || (g.preventDefault(), (_a3 = i._onClick) == null ? void 0 : _a3.call(i)));
              };
              return e.jsx("tr", {
                onClick: k ? i._onClick : void 0,
                onKeyDown: w,
                tabIndex: k ? 0 : void 0,
                "aria-expanded": N,
                className: `hover:bg-gray-50 dark:hover:bg-odp-focusBg/40 ${k ? "cursor-pointer" : ""}`,
                children: t.map((g) => {
                  const x = g.tree ? i._tree : void 0;
                  return e.jsx("td", {
                    className: `px-3 py-1.5 text-gray-700 dark:text-odp-fg ${I ? "border-t-2 border-gray-300 dark:border-odp-borderStrong" : "border-t border-gray-100 dark:border-odp-borderSoft"} ${g.align === "right" ? "text-right tabular-nums" : ""} ${g.className ?? ""}`,
                    children: x ? e.jsx(Xa, {
                      depth: x.depth,
                      expandable: x.expandable,
                      expanded: x.expanded,
                      label: x.label
                    }) : i[g.key]
                  }, g.key);
                })
              }, i._key ?? m);
            })
          }),
          n ? e.jsx("tfoot", {
            children: e.jsx("tr", {
              children: t.map((i) => e.jsx("td", {
                className: "sticky bottom-0 border-t border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: i.key === n ? e.jsx(Ga, {}) : null
              }, i.key))
            })
          }) : null
        ]
      })
    });
  }
  function Ya(t, d) {
    const s = /* @__PURE__ */ new Set(), u = [];
    for (const n of t) (n.parentPath == null || s.has(n.parentPath) && d.has(n.parentPath)) && (u.push(n), s.add(n.path));
    return u;
  }
  function dt({ title: t, open: d, onToggle: s, children: u }) {
    return e.jsxs("div", {
      className: "rounded-md border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-bgSoft",
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: s,
          "aria-expanded": d,
          className: "flex w-full items-center gap-1.5 px-3 py-2 text-left text-xs font-bold text-gray-700 transition hover:bg-gray-50 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg/40",
          children: [
            d ? e.jsx(oe, {
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
        d ? e.jsxs("div", {
          className: "grid grid-cols-1 gap-3 border-t border-gray-200 p-3 dark:border-odp-borderStrong md:grid-cols-[minmax(10rem,14rem)_minmax(0,1fr)] md:items-stretch",
          children: [
            e.jsx("div", {
              className: "min-w-0",
              children: e.jsx(Ha, {})
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
  function Ja({ storageMode: t = ne, onScanTree: d, canScan: s = true, onOpenFile: u }) {
    const [n, i] = a.useState(false), [m, k] = a.useState(null), [N, v] = a.useState(null), [O, I] = a.useState(() => /* @__PURE__ */ new Set()), [w, g] = a.useState(null), [x, p] = a.useState({
      summary: true,
      extension: false,
      folder: false
    }), [C, A] = a.useState(false), [o, b] = a.useState(() => $.getStatus()), [c, h] = a.useState(false), [T, R] = a.useState(null), [_, L] = a.useState(false);
    a.useEffect(() => $.subscribe(() => {
      b($.getStatus());
    }), []), a.useEffect(() => {
      $.refreshCheckpointStatus();
    }, []), a.useEffect(() => {
      v(null), k(null), I(/* @__PURE__ */ new Set()), g(null), p({
        summary: true,
        extension: false,
        folder: false
      });
    }, [
      t
    ]);
    const M = (f) => {
      p((K) => ({
        ...K,
        [f]: !K[f]
      }));
    }, te = (f) => {
      I((K) => {
        const W = new Set(K);
        return W.has(f) ? W.delete(f) : W.add(f), W;
      });
    }, Y = async () => {
      if (!(!d || !s || n)) {
        i(true), k(null);
        try {
          const f = await d();
          v(Sa(f)), I(/* @__PURE__ */ new Set()), g(null);
        } catch (f) {
          const K = f instanceof Error ? f.message : String(f);
          k(K || "\uC6A9\uB7C9 \uBD84\uC11D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."), v(null), I(/* @__PURE__ */ new Set()), g(null);
        } finally {
          i(false);
        }
      }
    }, V = (f) => {
      C || o.building || !o.enabled || !o.isolationReady || (A(true), $.rebuild({
        resume: f
      }).finally(() => A(false)));
    }, H = () => {
      C || o.building || !o.enabled || !o.isolationReady || (async () => {
        const f = await $.getRebuildCheckpointInfo();
        if (f) {
          R(f), h(true);
          return;
        }
        if (o.hasIndex) {
          L(true);
          return;
        }
        V(false);
      })();
    }, re = () => {
      $.cancelRebuild();
    }, D = N == null ? void 0 : N.summary, ae = D && D.totalSize > 0 ? D.indexSize / D.totalSize * 100 : 0, X = D ? [
      {
        label: "\uCD1D \uC6A9\uB7C9",
        value: ee(D.totalSize)
      },
      {
        label: "\uC0C9\uC778 \uB370\uC774\uD130 (.advanced-search)",
        value: `${ee(D.indexSize)} \xB7 ${D.indexFileCount.toLocaleString()}\uAC1C \uD30C\uC77C${D.totalSize > 0 ? ` \xB7 ${ae.toFixed(1)}%` : ""}`
      },
      {
        label: "\uC0C9\uC778 \uC81C\uC678 \uC6A9\uB7C9",
        value: ee(Math.max(0, D.totalSize - D.indexSize))
      },
      {
        label: "\uD30C\uC77C \uC218",
        value: D.fileCount.toLocaleString()
      },
      {
        label: "\uD3F4\uB354 \uC218",
        value: D.folderCount.toLocaleString()
      },
      {
        label: "0 byte \uD30C\uC77C",
        value: D.zeroByteCount.toLocaleString()
      },
      ...D.unknownSizeCount > 0 ? [
        {
          label: "\uD06C\uAE30 \uBBF8\uD655\uC778 \uD30C\uC77C",
          value: D.unknownSizeCount.toLocaleString()
        }
      ] : []
    ] : [], de = Ya((N == null ? void 0 : N.folders) ?? [], O);
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
                      children: Va(t)
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
                  onClick: H,
                  disabled: !s || C || o.building || !o.enabled || !o.isolationReady,
                  className: "inline-flex items-center gap-1.5 rounded border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                  title: o.enabled ? o.isolationReady ? "Advanced Search \uC5ED\uC0C9\uC778\uC744 \uBC31\uADF8\uB77C\uC6B4\uB4DC\uB85C \uC0DD\uC131\uD569\uB2C8\uB2E4" : "\uAC80\uC0C9 \uACA9\uB9AC(COOP/COEP)\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694" : "\uC124\uC815\uC5D0\uC11C \uC5ED\uC0C9\uC778\uC744 \uCF20 \uB4A4 \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",
                  children: [
                    C || o.building ? e.jsx(We, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(Gt, {
                      size: 14
                    }),
                    C || o.building ? typeof o.buildProgress == "number" ? `\uC0C9\uC778 \uC911 ${Math.round(o.buildProgress * 100)}%` : "\uC0C9\uC778 \uC911\u2026" : o.hasCheckpoint ? "\uC0C9\uC778 \uC7AC\uAC1C/\uB2E4\uC2DC \uC2DC\uC791" : o.hasIndex ? "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131" : "\uC5ED\uC0C9\uC778 \uC0DD\uC131"
                  ]
                }),
                o.building ? e.jsxs("button", {
                  type: "button",
                  onClick: re,
                  className: "inline-flex items-center gap-1.5 rounded border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60",
                  title: "\uC0C9\uC778\uC744 \uC911\uC9C0\uD569\uB2C8\uB2E4. \uCCB4\uD06C\uD3EC\uC778\uD2B8\uB294 \uC720\uC9C0\uB418\uC5B4 \uC774\uC5B4\uC11C \uC7AC\uAC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                  children: [
                    e.jsx(xa, {
                      size: 14
                    }),
                    "\uC911\uC9C0"
                  ]
                }) : null,
                e.jsxs("button", {
                  type: "button",
                  onClick: Y,
                  disabled: !s || n || typeof d != "function",
                  className: "inline-flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
                  children: [
                    n ? e.jsx(We, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(Kt, {
                      size: 14
                    }),
                    n ? "\uBD84\uC11D \uC911\u2026" : N ? "\uB2E4\uC2DC \uBD84\uC11D" : "\uBD84\uC11D \uC2DC\uC791"
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
        e.jsx(Jt, {
          logs: o.buildLogs || [],
          building: o.building,
          progress: o.buildProgress
        }),
        e.jsx(qt, {
          isOpen: c,
          info: T,
          onCancel: () => {
            h(false), R(null);
          },
          onResume: () => {
            h(false), R(null), V(true);
          },
          onStartFresh: () => {
            h(false), R(null), V(false);
          }
        }),
        e.jsx(be, {
          isOpen: _,
          title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
          message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
          confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
          cancelLabel: "\uCDE8\uC18C",
          onConfirm: () => {
            L(false), V(false);
          },
          onCancel: () => L(false)
        }),
        m && e.jsx("p", {
          className: "whitespace-pre-wrap text-xs text-red-600 dark:text-red-400",
          children: m
        }),
        e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsx(dt, {
              title: "\uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: x.summary,
              onToggle: () => M("summary"),
              children: e.jsx(st, {
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
                rows: X.map((f) => ({
                  label: f.label,
                  value: f.value
                })),
                emptyText: "\uBD84\uC11D\uC744 \uC2DC\uC791\uD558\uBA74 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4."
              })
            }),
            e.jsx(dt, {
              title: "\uD30C\uC77C \uD615\uC2DD\uBCC4 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: x.extension,
              onToggle: () => M("extension"),
              children: e.jsx(st, {
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
                rows: ((N == null ? void 0 : N.byExtension) ?? []).map((f) => ({
                  _key: f.ext,
                  label: f.label,
                  count: f.count.toLocaleString(),
                  size: ee(f.size),
                  percent: e.jsx(Ft, {
                    percent: f.percent
                  }),
                  _onClick: () => g(f)
                })),
                emptyText: "\uBD84\uC11D\uC744 \uC2DC\uC791\uD558\uBA74 \uD615\uC2DD\uBCC4 \uC6A9\uB7C9\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4.",
                legendColumnKey: "percent"
              })
            }),
            e.jsx(dt, {
              title: "\uD3F4\uB354\uBCC4 \uC6A9\uB7C9 (Tree Size)",
              open: x.folder,
              onToggle: () => M("folder"),
              children: e.jsx(st, {
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
                rows: de.map((f) => {
                  const K = O.has(f.path);
                  return {
                    _key: f.path,
                    fileCount: f.fileCount.toLocaleString(),
                    size: ee(f.size),
                    percent: e.jsx(Ft, {
                      percent: f.percent
                    }),
                    ...f.hasChildFolders ? {
                      _onClick: () => te(f.path)
                    } : {},
                    _tree: {
                      depth: f.depth,
                      expandable: f.hasChildFolders,
                      expanded: K,
                      label: e.jsx("span", {
                        title: f.path,
                        children: f.name
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
        e.jsx(Fa, {
          open: w != null,
          extension: w,
          onOpenChange: (f) => {
            f || g(null);
          },
          onOpenFile: async (f) => {
            g(null), await (u == null ? void 0 : u(f));
          }
        })
      ]
    });
  }
  const qa = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), Za = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function Qa(t) {
    return t === xe ? "Local Haim" : t === ye ? "WebDAV Haim" : t === ne ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function es({ storageMode: t, canScan: d = false, onScanTree: s, onReadText: u, onReadBytes: n, onDeletePaths: i }) {
    const [m, k] = a.useState(() => Lr()), [N, v] = a.useState("notes"), [O, I] = a.useState("trash"), [w, g] = a.useState(false), [x, p] = a.useState(false), [C, A] = a.useState(null), [o, b] = a.useState(null), [c, h] = a.useState(""), [T, R] = a.useState([]), [_, L] = a.useState(() => /* @__PURE__ */ new Set()), [M, te] = a.useState([]), [Y, V] = a.useState(() => /* @__PURE__ */ new Set()), [H, re] = a.useState({}), [D, ae] = a.useState(false), [X, de] = a.useState([]), [f, K] = a.useState(false), W = a.useRef(null);
    a.useEffect(() => Bt((l, j) => {
      l === "settings-orphan-image-auto" && k(j);
    }), []), a.useEffect(() => () => {
      var _a2;
      (_a2 = W.current) == null ? void 0 : _a2.abort();
    }, []);
    const Z = w || x || f, je = async () => {
      var _a2;
      if (!d || !s || !u || Z) return;
      (_a2 = W.current) == null ? void 0 : _a2.abort();
      const l = new AbortController();
      W.current = l, g(true), h(""), A(null);
      try {
        const j = await s();
        if (l.signal.aborted) return;
        const E = It(j, N), P = _r(j), z = /* @__PURE__ */ new Set();
        if (await Dr(P, 6, async (B) => {
          try {
            const J = await u(B);
            for (const Ve of zr(J)) z.add(Ve);
          } catch {
          }
        }, {
          signal: l.signal,
          onProgress: (B, J) => A({
            done: B,
            total: J
          })
        }), l.signal.aborted) return;
        const F = Tr({
          images: E,
          referencedPaths: z
        });
        R(F), L(new Set(F.map((B) => B.path)));
      } catch (j) {
        if ((j == null ? void 0 : j.name) === "AbortError") return;
        h(j instanceof Error ? j.message : String(j));
      } finally {
        g(false), A(null);
      }
    }, ve = async () => {
      var _a2;
      if (!d || !s || !n || Z) return;
      (_a2 = W.current) == null ? void 0 : _a2.abort();
      const l = new AbortController();
      W.current = l, p(true), h(""), b(null);
      try {
        const j = await s();
        if (l.signal.aborted) return;
        const E = It(j, N), P = await Rr(E, n, {
          signal: l.signal,
          onProgress: (B, J) => b({
            done: B,
            total: J
          })
        });
        if (l.signal.aborted) return;
        te(P);
        const z = {}, F = /* @__PURE__ */ new Set();
        for (const B of P) {
          z[B.hash] = B.keepPath;
          for (const J of B.files) J.path !== B.keepPath && F.add(J.path);
        }
        re(z), V(F);
      } catch (j) {
        if ((j == null ? void 0 : j.name) === "AbortError") return;
        h(j instanceof Error ? j.message : String(j));
      } finally {
        p(false), b(null);
      }
    }, Ne = (l) => {
      L((j) => {
        const E = new Set(j);
        return E.has(l) ? E.delete(l) : E.add(l), E;
      });
    }, Se = (l, j) => {
      const E = H[j];
      l !== E && V((P) => {
        const z = new Set(P);
        return z.has(l) ? z.delete(l) : z.add(l), z;
      });
    }, ue = (l, j) => {
      re((E) => ({
        ...E,
        [l]: j
      })), V((E) => {
        const P = new Set(E), z = M.find((F) => F.hash === l);
        if (!z) return P;
        for (const F of z.files) F.path === j ? P.delete(F.path) : P.add(F.path);
        return P;
      });
    }, we = (l) => {
      !l.length || !i || (de(l), ae(true));
    }, Ge = async () => {
      if (!(!i || !X.length)) {
        K(true), h("");
        try {
          await i(X, O);
          const l = new Set(X);
          R((j) => j.filter((E) => !l.has(E.path))), L((j) => {
            const E = new Set(j);
            for (const P of l) E.delete(P);
            return E;
          }), te((j) => j.map((E) => ({
            ...E,
            files: E.files.filter((P) => !l.has(P.path))
          })).filter((E) => E.files.length >= 2)), V((j) => {
            const E = new Set(j);
            for (const P of l) E.delete(P);
            return E;
          }), ae(false), de([]);
        } catch (l) {
          h(l instanceof Error ? l.message : String(l));
        } finally {
          K(false);
        }
      }
    }, Ce = _.size, Ee = Y.size, U = O === "hard";
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
                Qa(t),
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
            e.jsx(Vt, {
              className: qa(m),
              checked: m,
              onCheckedChange: (l) => G("settings-orphan-image-auto", l),
              "aria-label": "\uB178\uD2B8 \uC0AD\uC81C \uC2DC \uC774\uBBF8\uC9C0 \uC790\uB3D9 \uC815\uB9AC",
              children: e.jsx(Ht, {
                className: Za
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
                e.jsx(ke, {
                  className: "flex flex-col gap-1.5",
                  value: N,
                  onValueChange: (l) => v(l),
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
                  ].map((l) => {
                    const j = N === l.value;
                    return e.jsx(ie, {
                      value: l.value,
                      className: [
                        "rounded-md border-2 px-2.5 py-2 text-left text-xs outline-none transition-all",
                        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                        j ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30" : "border-gray-300 opacity-70 dark:border-odp-borderStrong"
                      ].join(" "),
                      children: l.label
                    }, l.value);
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
                e.jsx(ke, {
                  className: "flex flex-col gap-1.5",
                  value: O,
                  onValueChange: (l) => I(l),
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
                  ].map((l) => {
                    const j = O === l.value;
                    return e.jsx(ie, {
                      value: l.value,
                      className: [
                        "rounded-md border-2 px-2.5 py-2 text-left text-xs outline-none transition-all",
                        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                        j ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30" : "border-gray-300 opacity-70 dark:border-odp-borderStrong"
                      ].join(" "),
                      children: l.label
                    }, l.value);
                  })
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          className: "flex flex-wrap gap-2",
          children: [
            e.jsxs($e, {
              type: "button",
              variant: "secondary",
              disabled: !d || Z,
              onClick: () => {
                je();
              },
              children: [
                w ? e.jsx(We, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(Gt, {
                  size: 14
                }),
                "\uBBF8\uC0AC\uC6A9 \uC2A4\uCE94"
              ]
            }),
            e.jsxs($e, {
              type: "button",
              variant: "secondary",
              disabled: !d || Z,
              onClick: () => {
                ve();
              },
              children: [
                x ? e.jsx(We, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(ba, {
                  size: 14
                }),
                "\uC911\uBCF5 \uC2A4\uCE94"
              ]
            })
          ]
        }),
        (C || o) && e.jsxs("p", {
          className: "text-[11px] text-gray-500 dark:text-odp-muted",
          children: [
            C ? `Markdown ${C.done}/${C.total}` : null,
            C && o ? " \xB7 " : null,
            o ? `\uD574\uC2DC ${o.done}/${o.total}` : null
          ]
        }),
        c ? e.jsx("p", {
          className: "text-xs text-red-600 dark:text-red-400",
          role: "alert",
          children: c
        }) : null,
        d ? null : e.jsx("p", {
          className: "text-xs text-gray-500 dark:text-odp-muted",
          children: "\uC800\uC7A5\uC18C\uAC00 \uC5F0\uACB0\uB418\uBA74 \uC2A4\uCE94\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
        }),
        T.length > 0 ? e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsxs("div", {
              className: "flex items-center justify-between gap-2",
              children: [
                e.jsxs("h4", {
                  className: "text-xs font-bold text-gray-700 dark:text-odp-fg",
                  children: [
                    "\uBBF8\uC0AC\uC6A9 (",
                    T.length,
                    ")"
                  ]
                }),
                e.jsxs($e, {
                  type: "button",
                  variant: "danger",
                  disabled: Ce === 0 || Z,
                  onClick: () => we([
                    ..._
                  ]),
                  children: [
                    e.jsx(Ke, {
                      size: 14
                    }),
                    "\uC120\uD0DD \uC0AD\uC81C (",
                    Ce,
                    ")"
                  ]
                })
              ]
            }),
            e.jsx("ul", {
              className: "max-h-56 space-y-1 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter",
              children: T.map((l) => e.jsx("li", {
                children: e.jsxs("label", {
                  className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg",
                  children: [
                    e.jsx("input", {
                      type: "checkbox",
                      className: "mt-0.5",
                      checked: _.has(l.path),
                      onChange: () => Ne(l.path)
                    }),
                    e.jsx("span", {
                      className: "min-w-0 flex-1 break-all",
                      children: l.path
                    }),
                    e.jsx("span", {
                      className: "shrink-0 tabular-nums text-gray-500 dark:text-odp-muted",
                      children: ee(l.size)
                    })
                  ]
                })
              }, l.path))
            })
          ]
        }) : null,
        M.length > 0 ? e.jsxs("div", {
          className: "space-y-3",
          children: [
            e.jsxs("div", {
              className: "flex items-center justify-between gap-2",
              children: [
                e.jsxs("h4", {
                  className: "text-xs font-bold text-gray-700 dark:text-odp-fg",
                  children: [
                    "\uC911\uBCF5 (",
                    M.length,
                    " \uADF8\uB8F9)"
                  ]
                }),
                e.jsxs($e, {
                  type: "button",
                  variant: "danger",
                  disabled: Ee === 0 || Z,
                  onClick: () => we([
                    ...Y
                  ]),
                  children: [
                    e.jsx(Ke, {
                      size: 14
                    }),
                    "\uC120\uD0DD \uC0AD\uC81C (",
                    Ee,
                    ")"
                  ]
                })
              ]
            }),
            M.map((l) => e.jsxs("div", {
              className: "space-y-1 rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter",
              children: [
                e.jsxs("div", {
                  className: "text-[10px] text-gray-500 dark:text-odp-muted",
                  children: [
                    ee(l.size),
                    " \xB7 ",
                    l.hash.slice(0, 12),
                    "\u2026"
                  ]
                }),
                e.jsx("ul", {
                  className: "space-y-1",
                  children: l.files.map((j) => {
                    const E = H[l.hash] === j.path;
                    return e.jsx("li", {
                      children: e.jsxs("label", {
                        className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg",
                        children: [
                          e.jsx("input", {
                            type: "checkbox",
                            className: "mt-0.5",
                            checked: Y.has(j.path),
                            disabled: E,
                            onChange: () => Se(j.path, l.hash)
                          }),
                          e.jsxs("span", {
                            className: "min-w-0 flex-1 break-all",
                            children: [
                              j.path,
                              E ? e.jsx("span", {
                                className: "ml-1 text-[10px] text-blue-600 dark:text-blue-400",
                                children: "(\uC720\uC9C0)"
                              }) : null
                            ]
                          }),
                          E ? null : e.jsx("button", {
                            type: "button",
                            className: "shrink-0 text-[10px] text-blue-600 underline dark:text-blue-400",
                            onClick: () => ue(l.hash, j.path),
                            children: "\uC774 \uD30C\uC77C \uC720\uC9C0"
                          })
                        ]
                      })
                    }, j.path);
                  })
                })
              ]
            }, l.hash))
          ]
        }) : null,
        e.jsx(be, {
          isOpen: D,
          title: U ? "\uC774\uBBF8\uC9C0\uB97C \uC601\uAD6C \uC0AD\uC81C\uD560\uAE4C\uC694?" : "\uC774\uBBF8\uC9C0\uB97C \uD734\uC9C0\uD1B5\uC73C\uB85C \uBCF4\uB0BC\uAE4C\uC694?",
          message: U ? `${X.length}\uAC1C \uD30C\uC77C\uC744 \uBCF5\uAD6C\uD560 \uC218 \uC5C6\uC774 \uC0AD\uC81C\uD569\uB2C8\uB2E4.` : `${X.length}\uAC1C \uD30C\uC77C\uC744 .trash/ \uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.`,
          variant: "danger",
          confirmLabel: U ? "\uC601\uAD6C \uC0AD\uC81C" : "\uD734\uC9C0\uD1B5\uC73C\uB85C \uC774\uB3D9",
          cancelLabel: "\uCDE8\uC18C",
          confirmDisabled: f,
          onConfirm: () => {
            Ge();
          },
          onCancel: () => {
            f || (ae(false), de([]));
          }
        })
      ]
    });
  }
  ps = function({ s3Creds: t, masterPassword: d, onSaveS3Creds: s, onExportCreds: u, onImportClick: n, showHiddenFolders: i, onToggleHiddenFolders: m, showTrashFolder: k = false, onToggleTrashFolder: N, hideRecordingCompanions: v = false, onToggleHideRecordingCompanions: O, treeStickyFolderPathEnabled: I = true, onToggleTreeStickyFolderPath: w, showTreeModifiedDate: g = false, onToggleShowTreeModifiedDate: x, treeHoverExpandSettings: p = da, onTreeHoverExpandSettingsChange: C, onRequestClose: A, webauthnSupported: o = false, webauthnEnabled: b = false, webauthnStorageOnly: c = false, onEnableWebAuthn: h, onDisableWebAuthn: T, snippetConfig: R, onChangeSnippetConfig: _, onSaveSnippetConfig: L, isSavingSnippets: M = false, snippetConfigLoaded: te = false, editorType: Y, onEditorTypeChange: V, storageMode: H = ne, onStorageModeChange: re, localFolderName: D = "", onOpenLocalFolder: ae, webdavConfig: X, onSaveWebdavConfig: de, isMobileLayout: f = false, sidebarOpen: K = true, sidebarCollapsed: W = false, onOpenSidebar: Z, onCheckAppUpdate: je, isCheckingAppUpdate: ve = false, latestAppBuildId: Ne = "", onScanStorageUsage: Se, canScanStorageUsage: ue = false, onOpenStorageUsageFile: we, onReadUnusedImageText: Ge, onReadUnusedImageBytes: Ce, onDeleteUnusedImagePaths: Ee }) {
    const [U, l] = a.useState(t), [j, E] = a.useState(""), [P, z] = a.useState(X ?? {
      endpoint: "",
      username: "",
      password: "",
      basePath: ""
    }), [F, B] = a.useState(false), [J, Ve] = a.useState(o), [nt, ot] = a.useState(() => $r()), [Zt, lt] = a.useState(() => Y ?? Fr()), [Ie, Qt] = a.useState(() => Br()), [pe, er] = a.useState(() => Mr()), [it, ct] = a.useState(() => Ot()), [Oe, tr] = a.useState(() => Kr()), [Ae, rr] = a.useState(() => Wr()), [S, xt] = a.useState(() => $.getStatus()), [Pe, ar] = a.useState(() => Ur()), [sr, bt] = a.useState(() => At()), [ut, q] = a.useState(false), [dr, Le] = a.useState(false), [nr, _e] = a.useState(null), [or, He] = a.useState(false), [Xe, pt] = a.useState(true), [De, gt] = a.useState(() => H === xe), [ze, mt] = a.useState(false), [Ye, ht] = a.useState(true), Je = xr(), qe = String(D || "").trim() || Gr() || "", ft = typeof window < "u" && "showDirectoryPicker" in window;
    a.useEffect(() => Bt((r, y) => {
      r === "settings-alt-vim" ? Qt(y) : r === "settings-workspace-tabs" ? er(y) : r === "settings-new-file-temp" ? tr(y) : r === "settings-composer-helper" ? rr(y) : r === "settings-as-animation" ? ar(y) : (r === "settings-as-index" || r === "settings-as-include-other") && xt($.getStatus());
    }), []), a.useEffect(() => {
      const r = (y) => {
        var _a2;
        const Q = ((_a2 = y == null ? void 0 : y.detail) == null ? void 0 : _a2.mode) ?? At();
        bt(Q);
      };
      return window.addEventListener(Pt, r), () => {
        window.removeEventListener(Pt, r);
      };
    }, []), a.useEffect(() => {
      const r = (y) => {
        var _a2;
        const Q = ((_a2 = y == null ? void 0 : y.detail) == null ? void 0 : _a2.mode) ?? Ot();
        ct(Q);
      };
      return window.addEventListener(Lt, r), () => {
        window.removeEventListener(Lt, r);
      };
    }, []), a.useEffect(() => {
      const r = String(Je.hash || "").replace(/^#/, "");
      if (!r.startsWith("settings-")) return;
      r === "settings-s3" && pt(true), r === "settings-local" && gt(true), r === "settings-webdav" && mt(true), r === "settings-imgbb" && ht(true);
      const Q = (/* @__PURE__ */ new Set([
        "settings-llm-providers",
        "settings-llm-provider",
        "settings-gemini",
        "settings-openai-compat"
      ])).has(r) ? "settings-llm-providers" : r, Te = window.setTimeout(() => {
        var _a2;
        const me = document.getElementById(Q);
        if (me) {
          me.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
          try {
            (_a2 = me.focus) == null ? void 0 : _a2.call(me, {
              preventScroll: true
            });
          } catch {
          }
        }
      }, 80);
      return () => window.clearTimeout(Te);
    }, [
      Je.hash,
      Je.pathname
    ]), a.useEffect(() => $.subscribe(() => {
      xt($.getStatus());
    }), []), a.useEffect(() => {
      l({
        ...t,
        llmProviderProfiles: tt(t)
      }), E("");
    }, [
      t
    ]);
    const Ze = !!((t == null ? void 0 : t.imgbbApiKey) || "").trim(), ge = (r) => {
      const y = r !== void 0 ? r : tt(U), Q = ia(y), me = j.trim() || (Ze ? t.imgbbApiKey : "");
      return {
        ...U,
        llmProviderProfiles: y,
        ...Q,
        imgbbApiKey: me
      };
    };
    a.useEffect(() => {
      z(X ?? {
        endpoint: "",
        username: "",
        password: "",
        basePath: ""
      });
    }, [
      X
    ]), a.useEffect(() => {
      Y !== void 0 && lt(Y);
    }, [
      Y
    ]), a.useEffect(() => {
      let r = false;
      return Vr().then((y) => {
        r || Ve(y);
      }), () => {
        r = true;
      };
    }, []);
    const lr = J && (d || c), ir = !f && W ? "md:pl-14" : "";
    return e.jsxs("div", {
      className: "flex-1 flex flex-col bg-white dark:bg-odp-bgSofter min-w-0 max-h-full",
      children: [
        e.jsxs("div", {
          className: `px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-odp-surface flex justify-between items-center gap-3 bg-gray-50 dark:bg-odp-surface shrink-0 transition-[padding] duration-300 ease-in-out ${ir}`,
          children: [
            e.jsxs("div", {
              className: "flex min-w-0 flex-1 items-center gap-2",
              children: [
                f && !K && typeof Z == "function" && e.jsx("button", {
                  type: "button",
                  "aria-label": "\uC0AC\uC774\uB4DC\uBC14 \uC5F4\uAE30",
                  onClick: Z,
                  className: "inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
                  children: e.jsx(Hr, {
                    size: 22
                  })
                }),
                e.jsxs("h2", {
                  className: "font-bold text-gray-700 dark:text-odp-fgStrong flex min-w-0 items-center gap-2",
                  children: [
                    e.jsx(Xr, {}),
                    " \uC124\uC815 \uBC0F \uC554\uD638\uD654"
                  ]
                })
              ]
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => A == null ? void 0 : A(ge()),
              className: "text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded transition",
              children: e.jsx(Ut, {
                size: 16
              })
            })
          ]
        }),
        e.jsxs("div", {
          className: "p-6 overflow-y-auto space-y-6 flex-1",
          children: [
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
                          checked: H === ne,
                          onChange: () => re == null ? void 0 : re(ne)
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
                          value: xe,
                          checked: H === xe,
                          onChange: () => re == null ? void 0 : re(xe)
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
                          value: ye,
                          checked: H === ye,
                          onChange: () => re == null ? void 0 : re(ye)
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
              onSubmit: (r) => {
                r.preventDefault(), s(ge());
              },
              className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => pt((r) => !r),
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
                              value: U.accessKeyId,
                              onChange: (r) => l((y) => ({
                                ...y,
                                accessKeyId: r.target.value
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
                              value: U.secretAccessKey,
                              onChange: (r) => l((y) => ({
                                ...y,
                                secretAccessKey: r.target.value
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
                              value: U.region,
                              onChange: (r) => l((y) => ({
                                ...y,
                                region: r.target.value
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
                              value: U.bucket,
                              onChange: (r) => l((y) => ({
                                ...y,
                                bucket: r.target.value
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
                              value: U.endpoint || "",
                              onChange: (r) => l((y) => ({
                                ...y,
                                endpoint: r.target.value
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
                          onClick: () => A == null ? void 0 : A(ge()),
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
              onSubmit: (r) => {
                r.preventDefault(), de == null ? void 0 : de(P);
              },
              className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => mt((r) => !r),
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
                              value: P.endpoint,
                              onChange: (r) => z((y) => ({
                                ...y,
                                endpoint: r.target.value
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
                              value: P.username,
                              onChange: (r) => z((y) => ({
                                ...y,
                                username: r.target.value
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
                              value: P.password,
                              onChange: (r) => z((y) => ({
                                ...y,
                                password: r.target.value
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
                              value: P.basePath,
                              onChange: (r) => z((y) => ({
                                ...y,
                                basePath: r.target.value
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
                              const { createWebdavBackend: r } = await cr(async () => {
                                const { createWebdavBackend: Q } = await import("./index-BegHbZbw.js").then(async (m2) => {
                                  await m2.__tla;
                                  return m2;
                                }).then((Te) => Te.gh);
                                return {
                                  createWebdavBackend: Q
                                };
                              }, __vite__mapDeps([0,1,2,3,4,5,6,7,8])), y = r(P);
                              if (!y.isReady()) {
                                alert("Endpoint\uC640 Username\uC744 \uC785\uB825\uD558\uC138\uC694.");
                                return;
                              }
                              await y.testConnection(), alert("WebDAV \uC5F0\uACB0\uC5D0 \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4.");
                            } catch (r) {
                              alert("WebDAV \uC5F0\uACB0 \uC2E4\uD328: " + ((r == null ? void 0 : r.message) || r) + `

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
                  onClick: () => gt((r) => !r),
                  className: "flex w-full items-center gap-2 text-left",
                  "aria-expanded": De,
                  children: [
                    De ? e.jsx(oe, {
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
                    De ? null : e.jsx("span", {
                      className: "ml-auto text-[11px] font-normal text-gray-400 dark:text-odp-muted",
                      children: "\uC811\uD798"
                    })
                  ]
                }),
                De ? e.jsxs(e.Fragment, {
                  children: [
                    e.jsx("p", {
                      className: "text-xs text-gray-600 dark:text-odp-muted",
                      children: "Local Haim\uC740 \uBE0C\uB77C\uC6B0\uC800 File System Access API\uB85C \uC5F0 \uD3F4\uB354\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uBCF4\uC548\uC0C1 OS \uC804\uCCB4 \uACBD\uB85C\uB294 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC73C\uBA70, \uD3F4\uB354 \uC774\uB984\uC73C\uB85C \uC5F4\uB9B0 \uC704\uCE58\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
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
                          value: qe || "(\uD3F4\uB354\uAC00 \uC5F4\uB824 \uC788\uC9C0 \uC54A\uC74C)",
                          "aria-label": "\uD604\uC7AC \uC5F4\uB9B0 \uB85C\uCEEC \uD3F4\uB354 \uC774\uB984"
                        })
                      ]
                    }),
                    ft ? null : e.jsx("p", {
                      className: "text-xs text-amber-700 dark:text-amber-300",
                      children: "\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uD3F4\uB354 \uC120\uD0DD\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Chromium \uACC4\uC5F4 \uBE0C\uB77C\uC6B0\uC800\uB97C \uC0AC\uC6A9\uD574 \uC8FC\uC138\uC694."
                    }),
                    e.jsx("div", {
                      className: "flex justify-end gap-2 pt-2",
                      children: e.jsxs("button", {
                        type: "button",
                        disabled: !ft || typeof ae != "function",
                        onClick: () => ae == null ? void 0 : ae(),
                        className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                        children: [
                          e.jsx(Yr, {
                            size: 16
                          }),
                          qe ? "\uB2E4\uB978 \uD3F4\uB354 \uC5F4\uAE30" : "\uD3F4\uB354 \uC120\uD0DD"
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
                        e.jsx(Jr, {}),
                        " S3 \uC5F0\uACB0\uC815\uBCF4 \uB0B4\uBCF4\uB0B4\uAE30"
                      ]
                    }),
                    e.jsxs("button", {
                      onClick: n,
                      className: "flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded transition",
                      children: [
                        e.jsx(qr, {}),
                        " S3 \uC5F0\uACB0\uC815\uBCF4 \uBD88\uB7EC\uC624\uAE30"
                      ]
                    })
                  ]
                })
              ]
            }),
            lr && e.jsxs("div", {
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
                  children: c ? "S3 \uC5F0\uACB0 \uC815\uBCF4\uAC00 \uBCF4\uC548 \uD0A4\uB85C\uB9CC \uC554\uD638\uD654\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0 \uC2DC\uC5D0\uB294 \uBE44\uBC00\uBC88\uD638\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4." : "\uC9C0\uBB38, Windows Hello, Touch ID \uB4F1\uC73C\uB85C \uC571 \uC7A0\uAE08 \uD574\uC81C\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0 \uC2DC\uC5D0\uB294 \uBE44\uBC00\uBC88\uD638\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
                }),
                c ? e.jsx("p", {
                  className: "text-xs text-gray-600 dark:text-odp-muted",
                  children: "\uC800\uC7A5\uC18C: \uBCF4\uC548 \uD0A4\uB85C \uBCF4\uD638\uB428"
                }) : b ? e.jsxs("div", {
                  className: "flex items-center gap-2 flex-wrap",
                  children: [
                    e.jsx("span", {
                      className: "text-xs text-gray-700 dark:text-odp-fg",
                      children: "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uC0AC\uC6A9 \uC911"
                    }),
                    e.jsx("button", {
                      type: "button",
                      onClick: () => T == null ? void 0 : T(),
                      className: "text-xs text-red-600 dark:text-red-400 hover:underline",
                      children: "\uC0AC\uC6A9 \uD574\uC81C"
                    })
                  ]
                }) : e.jsx("div", {
                  className: "flex flex-col gap-2",
                  children: e.jsx("button", {
                    type: "button",
                    disabled: F,
                    onClick: async () => {
                      if (F || !h) return;
                      let r;
                      try {
                        r = h(d);
                      } catch (y) {
                        alert((y == null ? void 0 : y.message) || "\uBCF4\uC548 \uD0A4 \uB4F1\uB85D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
                        return;
                      }
                      B(true);
                      try {
                        await r;
                      } catch (y) {
                        alert((y == null ? void 0 : y.message) || "\uBCF4\uC548 \uD0A4 \uB4F1\uB85D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
                      } finally {
                        B(false);
                      }
                    },
                    className: "text-left text-xs py-2 px-3 rounded border border-gray-300 dark:border-odp-borderStrong hover:bg-gray-100 dark:hover:bg-odp-surface transition",
                    "aria-label": "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uB4F1\uB85D",
                    children: F ? "\uB4F1\uB85D \uC911\u2026" : "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uC0AC\uC6A9 (\uB4F1\uB85D)"
                  })
                })
              ]
            }),
            ue && e.jsx("div", {
              id: "settings-storage-usage",
              tabIndex: -1,
              className: "scroll-mt-4",
              children: e.jsx(Ja, {
                storageMode: H,
                onScanTree: Se,
                canScan: ue,
                onOpenFile: we
              })
            }),
            e.jsx($a, {
              profiles: tt(U),
              onSaveProfiles: (r) => {
                l((y) => ({
                  ...y,
                  llmProviderProfiles: r
                })), s(ge(r));
              }
            }),
            e.jsx(es, {
              storageMode: H,
              canScan: ue,
              onScanTree: Se,
              onReadText: Ge,
              onReadBytes: Ce,
              onDeletePaths: Ee
            }),
            e.jsxs("form", {
              id: "settings-imgbb",
              tabIndex: -1,
              onSubmit: (r) => {
                if (r.preventDefault(), !j.trim() && !Ze) {
                  alert("API \uD0A4\uB97C \uC785\uB825\uD558\uC138\uC694.");
                  return;
                }
                s(ge());
              },
              className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => ht((r) => !r),
                  className: "flex w-full items-center gap-2 text-left",
                  "aria-expanded": Ye,
                  children: [
                    Ye ? e.jsx(oe, {
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
                Ye ? e.jsxs(e.Fragment, {
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
                          value: j,
                          onChange: (r) => E(r.target.value),
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
                          value: he,
                          checked: Zt === he,
                          onChange: () => {
                            lt(he), Zr(he), V == null ? void 0 : V(he);
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
                          value: Qr,
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
                      children: ea.map((r) => e.jsxs("label", {
                        className: "flex items-start gap-2 cursor-pointer",
                        children: [
                          e.jsx("input", {
                            type: "radio",
                            name: "footnoteDisplayMode",
                            value: r.value,
                            checked: sr === r.value,
                            onChange: () => {
                              ta(r.value), bt(r.value);
                            },
                            className: "mt-0.5 shrink-0"
                          }),
                          e.jsxs("span", {
                            children: [
                              e.jsx("span", {
                                className: "font-semibold",
                                children: r.label
                              }),
                              e.jsx("span", {
                                className: "text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5",
                                children: r.description
                              })
                            ]
                          })
                        ]
                      }, r.value))
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
                        G("settings-as-animation", !Pe);
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
                e.jsxs("label", {
                  className: "mt-3 flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: () => {
                        G("settings-as-index", !S.enabled);
                      },
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${S.enabled ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": S.enabled,
                      "aria-label": "\uC5ED\uC0C9\uC778 \uC0AC\uC6A9",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${S.enabled ? "translate-x-4" : "translate-x-0.5"}`
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
                  className: "mt-3 flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: () => {
                        G("settings-as-include-other", !S.includeOtherFiles);
                      },
                      disabled: !S.enabled,
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 disabled:opacity-50 ${S.includeOtherFiles ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": S.includeOtherFiles,
                      "aria-label": "\uAE30\uD0C0 \uD30C\uC77C \uC0C9\uC778 \uD3EC\uD568",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${S.includeOtherFiles ? "translate-x-4" : "translate-x-0.5"}`
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
                e.jsxs("div", {
                  className: `mt-3 rounded-md border px-3 py-2 text-xs ${S.building ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200" : S.hasIndex ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200" : "border-gray-200 bg-white text-gray-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-muted"}`,
                  children: [
                    S.building ? e.jsxs(e.Fragment, {
                      children: [
                        "\uBC31\uADF8\uB77C\uC6B4\uB4DC \uC0C9\uC778 \uC911",
                        typeof S.buildProgress == "number" ? ` \xB7 ${Math.round(S.buildProgress * 100)}%` : "\u2026"
                      ]
                    }) : S.isolationReady ? S.hasIndex ? e.jsxs(e.Fragment, {
                      children: [
                        "\uC0C9\uC778 \uC788\uC74C \xB7 \uD30C\uC77C ",
                        S.fileCount,
                        " \xB7 \uCC44\uD305",
                        " ",
                        S.chatCount,
                        S.builtAt && S.builtAt !== (/* @__PURE__ */ new Date(0)).toISOString() ? ` \xB7 \uAC31\uC2E0 ${new Date(S.builtAt).toLocaleString()}` : ""
                      ]
                    }) : e.jsx(e.Fragment, {
                      children: "\uC804\uCCB4 \uC0C9\uC778 \uC5C6\uC74C \u2014 \uC800\uC7A5\uD55C \uBB38\uC11C\xB7\uCC44\uD305\uC740 \uC99D\uBD84 \uC0C9\uC778\uB429\uB2C8\uB2E4. \uC544\uB798 \u300C\uC0C9\uC778\u300D\uC73C\uB85C \uBCFC\uD2B8 \uC804\uCCB4\uB97C \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uB9CC\uB4E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                    }) : e.jsx(e.Fragment, {
                      children: "\uAC80\uC0C9 \uC5D4\uC9C4 \uACA9\uB9AC(COOP/COEP)\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD558\uAC70\uB098 SharedArrayBuffer\uB97C \uC9C0\uC6D0\uD558\uB294 \uD658\uACBD\uC5D0\uC11C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694. \uD30C\uC77C\uBA85\xB7\uBC14\uB85C\uAC00\uAE30\uB294 \uACC4\uC18D \uAC80\uC0C9\uB429\uB2C8\uB2E4."
                    }),
                    S.lastError ? ` \xB7 \uC624\uB958: ${S.lastError}` : "",
                    S.hasCheckpoint && !S.building ? ` \xB7 \uC911\uC9C0\uB41C \uCCB4\uD06C\uD3EC\uC778\uD2B8 ${S.checkpointProcessedCount}\uAC1C` : ""
                  ]
                }),
                e.jsxs("div", {
                  className: "mt-3 flex flex-wrap gap-2",
                  children: [
                    e.jsxs("button", {
                      type: "button",
                      disabled: ut || !S.enabled || S.building || !S.isolationReady,
                      onClick: () => {
                        (async () => {
                          const r = await $.getRebuildCheckpointInfo();
                          if (r) {
                            _e(r), Le(true);
                            return;
                          }
                          if (S.hasIndex) {
                            He(true);
                            return;
                          }
                          q(true), $.rebuild({
                            resume: false
                          }).finally(() => q(false));
                        })();
                      },
                      className: "inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                      children: [
                        e.jsx(_t, {
                          size: 14
                        }),
                        S.hasCheckpoint ? "\uC0C9\uC778 \uC7AC\uAC1C/\uB2E4\uC2DC \uC2DC\uC791" : S.hasIndex ? "\uB2E4\uC2DC \uC0C9\uC778" : "\uC0C9\uC778"
                      ]
                    }),
                    S.building ? e.jsxs("button", {
                      type: "button",
                      onClick: () => $.cancelRebuild(),
                      className: "inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60",
                      title: "\uC0C9\uC778\uC744 \uC911\uC9C0\uD569\uB2C8\uB2E4. \uCCB4\uD06C\uD3EC\uC778\uD2B8\uB294 \uC720\uC9C0\uB418\uC5B4 \uC774\uC5B4\uC11C \uC7AC\uAC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                      children: [
                        e.jsx(ra, {
                          size: 14
                        }),
                        "\uC911\uC9C0"
                      ]
                    }) : null,
                    e.jsx("button", {
                      type: "button",
                      disabled: ut || S.building || !S.hasIndex,
                      onClick: () => {
                        window.confirm("\uC5ED\uC0C9\uC778 \uCE90\uC2DC(.advanced-search/)\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694? \uC0AD\uC81C \uD6C4\uC5D0\uB294 \u300C\uC0C9\uC778\u300D\uC73C\uB85C \uB2E4\uC2DC \uC0DD\uC131\uD574\uC57C \uD569\uB2C8\uB2E4.") && (q(true), $.clearCache().finally(() => q(false)));
                      },
                      className: "inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:bg-odp-bgSoft dark:text-red-300 dark:hover:bg-red-950/30",
                      children: "\uC5ED\uC0C9\uC778 \uCE90\uC2DC \uC0AD\uC81C"
                    })
                  ]
                }),
                e.jsx(qt, {
                  isOpen: dr,
                  info: nr,
                  onCancel: () => {
                    Le(false), _e(null);
                  },
                  onResume: () => {
                    Le(false), _e(null), q(true), $.rebuild({
                      resume: true
                    }).finally(() => q(false));
                  },
                  onStartFresh: () => {
                    Le(false), _e(null), q(true), $.rebuild({
                      resume: false
                    }).finally(() => q(false));
                  }
                }),
                e.jsx(be, {
                  isOpen: or,
                  title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
                  message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
                  confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
                  cancelLabel: "\uCDE8\uC18C",
                  onConfirm: () => {
                    He(false), q(true), $.rebuild({
                      resume: false
                    }).finally(() => q(false));
                  },
                  onCancel: () => He(false)
                }),
                e.jsx(Jt, {
                  className: "mt-3",
                  logs: S.buildLogs || [],
                  building: S.building,
                  progress: S.buildProgress
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
                            G("settings-alt-vim", !Ie);
                          },
                          className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Ie ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                          "aria-pressed": Ie,
                          "aria-label": "Alt+Vim \uCEE4\uC11C \uC774\uB3D9",
                          children: e.jsx("span", {
                            className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Ie ? "translate-x-4" : "translate-x-0.5"}`
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
                            G("settings-workspace-tabs", !pe);
                          },
                          className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${pe ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                          "aria-pressed": pe,
                          "aria-label": "\uD0ED \uAE30\uB2A5",
                          children: e.jsx("span", {
                            className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${pe ? "translate-x-4" : "translate-x-0.5"}`
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
                    e.jsxs("label", {
                      className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                      children: [
                        e.jsx("button", {
                          type: "button",
                          onClick: () => {
                            G("settings-new-file-temp", !Oe);
                          },
                          className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Oe ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                          "aria-pressed": Oe,
                          "aria-label": "\uC0C8 \uD30C\uC77C \uC784\uC2DC(\uBA54\uBAA8\uB9AC) \uC0DD\uC131",
                          children: e.jsx("span", {
                            className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Oe ? "translate-x-4" : "translate-x-0.5"}`
                          })
                        }),
                        e.jsxs("span", {
                          className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                          children: [
                            "\uC0C8 \uD30C\uC77C \uC784\uC2DC(\uBA54\uBAA8\uB9AC) \uC0DD\uC131",
                            e.jsx("span", {
                              className: "text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5",
                              children: "\uCF1C\uBA74 Ctrl/Cmd+N\uC774 \uC774\uB984\xB7\uACBD\uB85C \uC5C6\uC774 \uBA54\uBAA8\uB9AC \uBB38\uC11C(untitled)\uB97C \uC5FD\uB2C8\uB2E4. \uC800\uC7A5 \uC2DC \uD30C\uC77C\uBA85\uACFC \uC704\uCE58\uB97C \uC9C0\uC815\uD569\uB2C8\uB2E4. \uB044\uBA74 \uAE30\uC874\uCC98\uB7FC \uC0DD\uC131 \uC989\uC2DC \uC774\uB984\uACFC \uD3F4\uB354\uB97C \uBB3B\uC2B5\uB2C8\uB2E4."
                            })
                          ]
                        })
                      ]
                    }),
                    pe ? e.jsxs("div", {
                      className: "pl-12 space-y-2",
                      children: [
                        e.jsx("p", {
                          className: "text-xs font-medium text-gray-700 dark:text-odp-fg",
                          children: "\uD0ED \uC790\uB3D9 \uC800\uC7A5 \uC124\uC815"
                        }),
                        e.jsx(ke, {
                          className: "flex flex-col gap-2",
                          value: it,
                          onValueChange: (r) => {
                            r !== "off" && r !== "onFocusChange" && r !== "onWindowChange" || (sa(r), ct(r));
                          },
                          "aria-label": "\uD0ED \uC790\uB3D9 \uC800\uC7A5",
                          children: aa.map((r) => {
                            const y = it === r.value;
                            return e.jsx(ie, {
                              value: r.value,
                              className: [
                                "rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200 origin-left w-90",
                                "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                                y ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"
                              ].join(" "),
                              children: e.jsxs("div", {
                                className: y ? "" : "opacity-50",
                                children: [
                                  e.jsx("div", {
                                    className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong",
                                    children: r.label
                                  }),
                                  e.jsx("div", {
                                    className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted",
                                    children: r.description
                                  })
                                ]
                              })
                            }, r.value);
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
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${k ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": k,
                      "aria-label": "\uC4F0\uB808\uAE30\uD1B5 \uBCF4\uAE30 \uD1A0\uAE00",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${k ? "translate-x-4" : "translate-x-0.5"}`
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
                      onClick: m,
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
                typeof O == "function" && e.jsxs("label", {
                  className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: O,
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
                typeof w == "function" && e.jsxs("label", {
                  className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: w,
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${I ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": I,
                      "aria-label": "\uD2B8\uB9AC \uD3F4\uB354 \uACBD\uB85C sticky \uD45C\uC2DC",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${I ? "translate-x-4" : "translate-x-0.5"}`
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
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${g ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": g,
                      "aria-label": "\uD2B8\uB9AC \uC218\uC815 \uB0A0\uC9DC \uD45C\uC2DC",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${g ? "translate-x-4" : "translate-x-0.5"}`
                      })
                    }),
                    e.jsx("span", {
                      className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                      children: "\uD2B8\uB9AC \uD30C\uC77C\uBA85 \uC544\uB798 \uC218\uC815 \uB0A0\uC9DC \uD45C\uC2DC (yy-MM-dd hh:mm:ss, \uACF5\uAC04\uC5D0 \uB530\uB77C \uCD95\uC57D)"
                    })
                  ]
                }),
                typeof C == "function" && e.jsxs("div", {
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
                              step: p.unit === "ms" ? 1 : 0.1,
                              value: p.value,
                              onChange: (r) => {
                                const y = Number(r.target.value);
                                C({
                                  ...p,
                                  value: Number.isFinite(y) && y >= 0 ? y : 0
                                });
                              },
                              className: "w-24 border border-gray-300 dark:border-odp-borderSoft rounded px-2 py-1.5 text-sm bg-white dark:bg-odp-bgSoft text-gray-800 dark:text-odp-fg",
                              "aria-label": "\uD3F4\uB354 \uC790\uB3D9 \uD3BC\uCE68 \uB300\uAE30 \uC2DC\uAC04"
                            })
                          ]
                        }),
                        e.jsx("div", {
                          className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg",
                          children: e.jsxs(ke, {
                            className: "flex items-center gap-3",
                            value: p.unit,
                            onValueChange: (r) => {
                              r !== "s" && r !== "ms" || p.unit !== r && C({
                                unit: r,
                                value: na(p.value, p.unit, r)
                              });
                            },
                            "aria-label": "\uB300\uAE30 \uC2DC\uAC04 \uB2E8\uC704",
                            children: [
                              e.jsxs("label", {
                                className: "flex items-center gap-1.5 cursor-pointer",
                                children: [
                                  e.jsx(ie, {
                                    value: "s",
                                    className: "size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                                    children: e.jsx(Ue, {
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
                                  e.jsx(ie, {
                                    value: "ms",
                                    className: "size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                                    children: e.jsx(Ue, {
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
                            oa(p),
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
                          value: Fe,
                          checked: nt === Fe,
                          onChange: () => {
                            ot(Fe), Dt(Fe);
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
                          value: Be,
                          checked: nt === Be,
                          onChange: () => {
                            ot(Be), Dt(Be);
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
              children: e.jsx(Ia, {
                value: R,
                onChange: _,
                onSave: L,
                isSaving: M,
                isLoaded: te
              })
            }),
            e.jsx(Aa, {}),
            e.jsx(_a, {}),
            e.jsx(Oa, {}),
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
                        G("settings-composer-helper", !Ae);
                      },
                      className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Ae ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": Ae,
                      "aria-label": "\uC785\uB825\uCC3D \uB2E8\uCD95\uD0A4 \uC548\uB0B4 \uD45C\uC2DC",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Ae ? "translate-x-4" : "translate-x-0.5"}`
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
            e.jsx(Da, {}),
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
                          children: la() || "\uC54C \uC218 \uC5C6\uC74C"
                        })
                      ]
                    }),
                    Ne ? e.jsxs("div", {
                      className: "flex flex-wrap gap-x-2 gap-y-0.5",
                      children: [
                        e.jsx("dt", {
                          className: "shrink-0 font-semibold text-gray-700 dark:text-odp-fgStrong",
                          children: "\uCD5C\uC2E0 \uBC84\uC804"
                        }),
                        e.jsx("dd", {
                          className: "min-w-0 break-all font-mono",
                          children: Ne
                        })
                      ]
                    }) : null
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  onClick: () => je == null ? void 0 : je(),
                  disabled: ve || typeof je != "function",
                  className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-60",
                  children: [
                    e.jsx(_t, {
                      size: 16
                    }),
                    ve ? "\uCD5C\uC2E0 \uBC84\uC804 \uD655\uC778 \uC911..." : "\uCD5C\uC2E0 \uBC84\uC804 \uD655\uC778 \uBC0F \uC989\uC2DC \uC5C5\uB370\uC774\uD2B8"
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
  ps as default
};
