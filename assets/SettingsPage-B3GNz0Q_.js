const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BDGl3GOe.js","assets/vendor-react-SY5QCjFA.js","assets/vendor-md-editor-D4hOzNKK.js","assets/vendor-aws-bxAUTq4h.js","assets/vendor-lucide-DyPOSMSJ.js","assets/vendor-motion-YU7ZxHqi.js","assets/vendor-radix-BgY9OwZN.js","assets/vendor-zip-Bez6qchM.js","assets/index-B7UvbGgD.css"])))=>i.map(i=>d[i]);
import { _ as or, __tla as __tla_0 } from "./vendor-md-editor-D4hOzNKK.js";
import { r as a, j as e, f as lr, __tla as __tla_1 } from "./vendor-react-SY5QCjFA.js";
import { dC as Qe, dD as ir, dE as cr, dF as xr, dG as br, as as ue, dH as ur, dI as pr, dJ as gr, dK as mr, dL as hr, dn as mt, d1 as ht, cZ as V, dM as ft, dN as yt, c_ as fr, c$ as yr, dO as kr, dP as jr, dQ as kt, dR as jt, dS as ze, dT as vr, dU as Nr, dV as Sr, dW as vt, dX as wr, dY as Cr, dZ as ne, d_ as ye, d$ as Nt, e0 as St, e1 as Er, e2 as Ir, a0 as Or, e3 as R, e4 as oe, e5 as be, e6 as je, e7 as Ar, e8 as Rt, ac as Re, e9 as wt, ea as Lr, eb as Pr, ec as _r, ed as Dr, ee as Tr, ef as zr, eg as Rr, eh as $r, ei as Fr, ej as Ct, ek as Br, z as Mr, el as Kr, em as Et, en as Wr, d2 as It, eo as Ot, ep as et, eq as Ur, er as Gr, es as Vr, et as Hr, eu as Xr, ev as Yr, ew as fe, ex as Jr, ey as qr, ez as Zr, eA as Qr, eB as At, eC as ea, eD as ta, eE as ra, eF as aa, eG as sa, eH as da, eI as $e, eJ as Lt, eK as Fe, eL as na, eM as oa, __tla as __tla_2 } from "./index-BDGl3GOe.js";
import { W as $t, ao as Ft, x as Bt, T as Me, a as le, b as ie, X as Mt, a1 as la, v as Ke, t as Kt, e as ia, G as ca } from "./vendor-lucide-DyPOSMSJ.js";
import { T as xa } from "./TableStyleTemplateEditor-BF8YbEHR.js";
import { S as Pt } from "./SliderWithScrubInput-B28d-DVd.js";
import { K as Wt, M as Ut, G as ve, H as ce, J as We, D as ba, g as ua, h as pa, i as ga, j as ma, k as ha } from "./vendor-radix-BgY9OwZN.js";
import { G as fa, O as ya } from "./OpenAiCompatibleModelSelect-CWys2Jou.js";
import "./vendor-aws-bxAUTq4h.js";
import "./vendor-motion-YU7ZxHqi.js";
import "./vendor-zip-Bez6qchM.js";
import "./index-CG4BSG42.js";
let xs;
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
  function ee(t) {
    if (t == null || Number.isNaN(t)) return "\uC54C \uC218 \uC5C6\uC74C";
    if (t < 1024) return `${t} B`;
    const d = t / 1024;
    if (d < 1024) return `${d.toFixed(1)} KB`;
    const s = d / 1024;
    return s < 1024 ? `${s.toFixed(1)} MB` : `${(s / 1024).toFixed(1)} GB`;
  }
  function ka(t) {
    const d = String(t || "").toLowerCase(), s = d.lastIndexOf(".");
    return s <= 0 || s === d.length - 1 ? "(none)" : d.slice(s + 1);
  }
  function ja(t) {
    const d = String(t || "").replace(/^\/+/, "");
    return d === Qe || d === `${Qe}/` || d.startsWith(`${Qe}/`);
  }
  function Gt(t) {
    var _a2;
    if (t.type === "file") return typeof t.size == "number" && Number.isFinite(t.size) ? t.size : 0;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let d = 0;
    for (const s of t.children) d += Gt(s);
    return d;
  }
  function Vt(t) {
    var _a2;
    if (t.type === "file") return 1;
    if (!((_a2 = t.children) == null ? void 0 : _a2.length)) return 0;
    let d = 0;
    for (const s of t.children) d += Vt(s);
    return d;
  }
  function va(t) {
    const d = Array.isArray(t) ? t : [];
    let s = 0, u = 0, n = 0, i = 0, g = 0, k = 0, N = 0;
    const v = /* @__PURE__ */ new Map(), O = (x) => {
      var _a2;
      for (const m of x) {
        if (m.type === "folder") {
          u += 1, ((_a2 = m.children) == null ? void 0 : _a2.length) && O(m.children);
          continue;
        }
        if (m.type !== "file") continue;
        s += 1;
        const C = typeof m.size == "number" && Number.isFinite(m.size), A = C ? m.size : 0;
        C ? A === 0 && (n += 1) : i += 1, g += A;
        const o = m.path || m.name;
        ja(o) && (k += A, N += 1);
        const b = ka(m.name), l = v.get(b) ?? {
          count: 0,
          size: 0,
          files: []
        };
        l.count += 1, l.size += A, l.files.push({
          path: o,
          name: m.name,
          size: C ? A : null,
          node: m
        }), v.set(b, l);
      }
    };
    O(d);
    const E = [
      ...v.entries()
    ].map(([x, { count: m, size: C, files: A }]) => ({
      ext: x,
      label: x === "(none)" ? "(\uD655\uC7A5\uC790 \uC5C6\uC74C)" : `.${x}`,
      count: m,
      size: C,
      percent: g > 0 ? C / g * 100 : 0,
      files: [
        ...A
      ].sort((o, b) => (b.size ?? -1) - (o.size ?? -1) || o.path.localeCompare(b.path))
    })).sort((x, m) => m.size - x.size || m.count - x.count || x.label.localeCompare(m.label)), I = [], p = (x, m, C) => {
      var _a2;
      const A = x.filter((o) => o.type === "folder").map((o) => ({
        node: o,
        size: Gt(o),
        fileCount: Vt(o)
      })).sort((o, b) => b.size - o.size || o.node.name.localeCompare(b.node.name));
      for (const { node: o, size: b, fileCount: l } of A) {
        const j = o.path || `${o.name}/`, T = (o.children ?? []).some((z) => z.type === "folder");
        I.push({
          path: j,
          name: o.name,
          depth: m,
          parentPath: C,
          hasChildFolders: T,
          size: b,
          fileCount: l,
          percent: g > 0 ? b / g * 100 : 0
        }), ((_a2 = o.children) == null ? void 0 : _a2.length) && p(o.children, m + 1, j);
      }
    };
    return p(d, 0, null), {
      summary: {
        totalSize: g,
        fileCount: s,
        folderCount: u,
        zeroByteCount: n,
        unknownSizeCount: i,
        indexSize: k,
        indexFileCount: N
      },
      byExtension: E,
      folders: I
    };
  }
  function Na(t) {
    return !t || typeof t != "string" ? "" : t.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
  }
  function Sa(t) {
    const d = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), s = [];
    (d ? t.metaKey : t.ctrlKey) && s.push("mod"), t.altKey && s.push("alt"), t.shiftKey && s.push("shift");
    const u = (t.key || "").toLowerCase();
    return !u || u === "shift" || u === "control" || u === "alt" || u === "meta" || (s.push(u), s.length <= 1) ? null : s.join("+");
  }
  function tt(t) {
    if (!t || typeof t != "string") return "";
    const s = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "Cmd" : "Ctrl";
    return t.toLowerCase().replace(/\bmod\b/g, s).split("+").map((u) => u.trim().charAt(0).toUpperCase() + u.trim().slice(1)).join(" + ");
  }
  function wa() {
    return {
      id: String(Date.now()) + "-" + Math.random().toString(36).slice(2),
      name: "",
      prefix: "",
      body: "",
      description: ""
    };
  }
  function Ca({ value: t, onChange: d, onSave: s, isSaving: u = false, isLoaded: n = true }) {
    const [i, g] = a.useState(() => t || {
      snippets: []
    }), [k, N] = a.useState(null), [v, O] = a.useState(null);
    a.useEffect(() => {
      g(t || {
        snippets: []
      });
    }, [
      t
    ]), a.useEffect(() => {
      if (!k) return;
      const l = (j) => {
        j.preventDefault(), j.stopPropagation();
        const T = Sa(j);
        T && O(T);
      };
      return window.addEventListener("keydown", l, true), () => window.removeEventListener("keydown", l, true);
    }, [
      k
    ]);
    const E = (l) => {
      const j = {
        snippets: l
      };
      g(j), d == null ? void 0 : d(j);
    }, I = () => {
      E([
        ...i.snippets || [],
        wa()
      ]);
    }, p = (l, j, T) => {
      const z = (i.snippets || []).map((D) => D.id === l ? {
        ...D,
        [j]: T
      } : D);
      E(z);
    }, x = (l) => {
      const j = (i.snippets || []).filter((T) => T.id !== l);
      E(j);
    }, m = (l) => {
      N(l), O(null);
    }, C = () => {
      N(null), O(null);
    }, A = () => {
      !k || !v || (p(k, "prefix", v), C());
    }, o = () => {
      const j = (i.snippets || []).map((L) => {
        const $ = (L.prefix || "").trim(), te = Na($) || $;
        return {
          ...L,
          name: (L.name || "").trim(),
          prefix: te,
          body: (L.body || "").replace(/\r\n/g, `
`),
          description: (L.description || "").trim()
        };
      });
      if (j.find((L) => !L.prefix || !L.body)) {
        alert("\uAC01 \uC2A4\uB2C8\uD3AB\uC5D0\uB294 \uB2E8\uCD95\uD0A4(shortcut)\uC640 body\uAC00 \uBAA8\uB450 \uD544\uC694\uD569\uB2C8\uB2E4.");
        return;
      }
      const z = /* @__PURE__ */ new Set();
      for (const L of j) {
        if (z.has(L.prefix)) {
          alert(`\uC911\uBCF5\uB41C \uB2E8\uCD95\uD0A4 "${L.prefix}" \uC774(\uAC00) \uC788\uC2B5\uB2C8\uB2E4. \uAC01 \uB2E8\uCD95\uD0A4\uB294 \uACE0\uC720\uD574\uC57C \uD569\uB2C8\uB2E4.`);
          return;
        }
        z.add(L.prefix);
      }
      const D = {
        snippets: j
      };
      g(D), d == null ? void 0 : d(D), s == null ? void 0 : s(D);
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
            b.map((l) => e.jsxs("div", {
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
                          value: l.name || "",
                          onChange: (j) => p(l.id, "name", j.target.value),
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
                              title: l.prefix ? tt(l.prefix) : "",
                              children: l.prefix ? tt(l.prefix) : "\uBBF8\uC124\uC815"
                            }),
                            e.jsx("button", {
                              type: "button",
                              className: "shrink-0 px-2 py-1 text-[11px] rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition",
                              onClick: () => m(l.id),
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
                      value: l.body || "",
                      onChange: (j) => p(l.id, "body", j.target.value),
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
                          value: l.description || "",
                          onChange: (j) => p(l.id, "description", j.target.value),
                          placeholder: "\uC608: TODO \uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC2A4\uB2C8\uD3AB"
                        })
                      ]
                    }),
                    e.jsx("button", {
                      type: "button",
                      className: "mt-4 sm:mt-6 px-2 py-1 text-[11px] text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/40 rounded hover:bg-red-50 dark:hover:bg-red-900/20 whitespace-nowrap",
                      onClick: () => {
                        window.confirm("\uC774 \uC2A4\uB2C8\uD3AB\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?") && x(l.id);
                      },
                      children: "\uC0AD\uC81C"
                    })
                  ]
                })
              ]
            }, l.id))
          ]
        }),
        e.jsxs("div", {
          className: "flex items-center justify-between gap-2 pt-1",
          children: [
            e.jsx("button", {
              type: "button",
              onClick: I,
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
            onClick: (l) => l.stopPropagation(),
            onKeyDown: (l) => l.stopPropagation(),
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
                  children: tt(v)
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
  function Ea() {
    const [t, d] = a.useState([]), [s, u] = a.useState(false), [n, i] = a.useState(false), [g, k] = a.useState(null), [N, v] = a.useState(false), [O, E] = a.useState(null), [I, p] = a.useState(null), x = a.useCallback(async () => {
      k(null);
      try {
        const o = await ir();
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
    const m = () => {
      E(null), v(true);
    }, C = (o) => {
      E(o), v(true);
    }, A = async () => {
      if (I) {
        i(true), k(null);
        try {
          const o = await ur(I.id);
          d(o.files), p(null);
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
        g ? e.jsx("p", {
          className: "mb-2 text-xs text-red-600 dark:text-red-400",
          role: "alert",
          children: g
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
              children: cr.map((o) => e.jsxs("li", {
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
                  onClick: m,
                  className: "inline-flex items-center gap-1 rounded bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
                  children: [
                    e.jsx($t, {
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
                    e.jsx(Ft, {
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
            const b = xr(o.css);
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
                      children: b.map((l) => e.jsx("li", {
                        className: "rounded-full border border-gray-100 bg-gray-50 px-1.5 py-0.5 text-[10px] dark:border-odp-border dark:bg-odp-bg",
                        style: {
                          fontFamily: l
                        },
                        children: l
                      }, l))
                    }) : null
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: n,
                  onClick: () => C(o),
                  className: "inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg",
                  children: [
                    e.jsx(Bt, {
                      className: "h-3 w-3",
                      "aria-hidden": true
                    }),
                    "\uD3B8\uC9D1"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  disabled: n,
                  onClick: () => p(o),
                  className: "inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40",
                  children: [
                    e.jsx(Me, {
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
        e.jsx(br, {
          isOpen: N,
          initialFile: O,
          onClose: () => {
            v(false), E(null);
          },
          onSaved: () => {
            x();
          }
        }),
        e.jsx(ue, {
          isOpen: !!I,
          title: "\uC6F9\uD3F0\uD2B8 \uC0AD\uC81C",
          message: I ? `"${I.name}" (${I.filename}) \uD30C\uC77C\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694\uAE4C\uC694?` : "",
          confirmLabel: "\uC0AD\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          variant: "danger",
          onConfirm: () => {
            A();
          },
          onCancel: () => p(null)
        })
      ]
    });
  }
  function Ia() {
    const [t, d] = a.useState([]), [s, u] = a.useState(false), [n, i] = a.useState(false), [g, k] = a.useState(null), [N, v] = a.useState(null), [O, E] = a.useState(false), I = a.useCallback(async () => {
      k(null);
      try {
        const x = await pr();
        d(x.templates), u(true);
      } catch (x) {
        k(x instanceof Error ? x.message : String(x)), d(gr().templates), u(true);
      }
    }, []);
    a.useEffect(() => {
      I();
    }, [
      I
    ]);
    const p = async (x) => {
      i(true), k(null);
      try {
        await mr({
          ...hr,
          templates: x
        }), d(x);
      } catch (m) {
        k(m instanceof Error ? m.message : String(m));
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
        g ? e.jsx("p", {
          className: "mb-2 text-xs text-red-600",
          children: g
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
                }), E(true);
              },
              className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50",
              children: "\uC0C8 \uD15C\uD50C\uB9BF"
            }),
            e.jsx("button", {
              type: "button",
              disabled: n,
              onClick: () => {
                I();
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
                        v(x), E(true);
                      },
                      children: "\uD3B8\uC9D1"
                    }),
                    e.jsx("button", {
                      type: "button",
                      className: "rounded px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
                      onClick: () => {
                        p(t.filter((m) => m.id !== x.id));
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
        e.jsx(xa, {
          isOpen: O,
          template: N,
          onClose: () => {
            E(false), v(null);
          },
          onSave: (x) => {
            const m = t.filter((C) => C.id !== (N == null ? void 0 : N.id) && C.id !== x.id);
            p([
              ...m,
              x
            ]).then(() => {
              E(false), v(null);
            });
          }
        })
      ]
    });
  }
  const Oa = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), Aa = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function Be({ label: t, description: d, checked: s, onCheckedChange: u, ariaLabel: n }) {
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
        e.jsx(Wt, {
          className: Oa(s),
          checked: s,
          onCheckedChange: u,
          "aria-label": n,
          children: e.jsx(Ut, {
            className: Aa
          })
        })
      ]
    });
  }
  function La() {
    const [t, d] = a.useState(() => mt());
    return a.useEffect(() => {
      const s = () => d(mt());
      return s(), window.addEventListener(ht, s), () => window.removeEventListener(ht, s);
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
                e.jsx(Be, {
                  label: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5",
                  description: "\uB4DC\uB798\uADF8 \uC2DC \uD398\uC774\uC9C0 \uAC00\uB85C\xB7\uC138\uB85C \uC911\uC559\uC120\uC5D0 \uB9DE\uCDA4",
                  checked: t.centerSnapEnabled,
                  onCheckedChange: (s) => V("settings-cover-center-snap", s),
                  ariaLabel: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5"
                }),
                e.jsxs("label", {
                  className: "block space-y-1 pt-1",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-400",
                      children: "\uD5C8\uC6A9 \uC624\uCC28"
                    }),
                    e.jsx(Pt, {
                      unit: "css",
                      suffix: "px",
                      min: yt,
                      max: ft,
                      step: 0.1,
                      value: t.centerSnapTolerancePx,
                      "aria-label": "\uAC00\uC6B4\uB370 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (s) => fr(s)
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              className: "space-y-2 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: [
                e.jsx(Be, {
                  label: "\uAC1C\uCCB4 \uC2A4\uB0C5",
                  description: "\uB2E4\uB978 \uAC1C\uCCB4\uC758 \uD14C\uB450\uB9AC\xB7\uAC00\uC6B4\uB370\uC120\uC5D0 \uB9DE\uCDA4 (\uADF8\uB8F9\uC740 \uD1B5\uC9F8\uB85C)",
                  checked: t.objectSnapEnabled,
                  onCheckedChange: (s) => V("settings-cover-object-snap", s),
                  ariaLabel: "\uAC1C\uCCB4 \uC2A4\uB0C5"
                }),
                e.jsxs("label", {
                  className: "block space-y-1 pt-1",
                  children: [
                    e.jsx("span", {
                      className: "text-[10px] text-gray-400",
                      children: "\uD5C8\uC6A9 \uC624\uCC28"
                    }),
                    e.jsx(Pt, {
                      unit: "css",
                      suffix: "px",
                      min: yt,
                      max: ft,
                      step: 0.1,
                      value: t.objectSnapTolerancePx,
                      "aria-label": "\uAC1C\uCCB4 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28",
                      onChange: (s) => yr(s)
                    })
                  ]
                })
              ]
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(Be, {
                label: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC",
                description: "\uC120\uD0DD\uACFC \uBB34\uAD00\uD558\uAC8C \uBAA8\uB4E0 \uD14D\uC2A4\uD2B8 \uC0C1\uC790\uB97C \uC605\uC740 \uBD89\uC740 \uC2E4\uC120\uC73C\uB85C \uD45C\uC2DC",
                checked: t.textContainerOutlineEnabled,
                onCheckedChange: (s) => V("settings-cover-text-outline", s),
                ariaLabel: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC"
              })
            }),
            e.jsx("div", {
              className: "rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60",
              children: e.jsx(Be, {
                label: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30",
                description: "\uD14D\uC2A4\uD2B8\xB7\uC774\uBBF8\uC9C0\xB7\uB3C4\uD615 \uC0BD\uC785 \uC2DC \uBC18\uD22C\uBA85 \uACE0\uC2A4\uD2B8 \uBBF8\uB9AC\uBCF4\uAE30",
                checked: t.placePreviewEnabled,
                onCheckedChange: (s) => V("settings-cover-place-preview", s),
                ariaLabel: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30"
              })
            }),
            e.jsxs("p", {
              className: "text-[11px] text-gray-500 dark:text-odp-muted",
              children: [
                "\uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28 \uAE30\uBCF8\uAC12 ",
                kr,
                "px \xB7 0.1px \uB2E8\uC704"
              ]
            })
          ]
        })
      ]
    });
  }
  function Pa() {
    const [t, d] = a.useState(""), [s, u] = a.useState(""), [n, i] = a.useState(null), [g, k] = a.useState(false);
    a.useEffect(() => {
      const p = () => {
        const m = Sr();
        d(m), u(m);
      };
      p(), jr().then((m) => {
        d(m.url), u(m.url);
      });
      const x = () => p();
      return window.addEventListener(kt, x), () => window.removeEventListener(kt, x);
    }, []);
    const N = jt(t) !== s, v = jt(t), O = !!String(t || "").trim() && !v, E = async () => {
      const p = String(t || "").trim();
      if (p && !v) {
        i("https:// \uB85C \uC2DC\uC791\uD558\uB294 Worker \uC8FC\uC18C\uB97C \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      k(true), i(null);
      try {
        const x = await vt(p);
        d(x), u(x), i(x ? `\uC800\uC7A5\uB428 \u2014 ${ze}\uC5D0 \uAE30\uB85D\uD588\uACE0, OG \uC694\uCCAD \uC2DC \uC774 Worker\uB97C \uAC00\uC7A5 \uBA3C\uC800 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.` : `Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${ze}).`);
      } finally {
        k(false);
      }
    }, I = async () => {
      k(true), i(null);
      try {
        d("");
        const p = await vt("");
        u(p), i(`Worker URL\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4 (${ze}).`);
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
              children: ze
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
              href: vr,
              target: "_blank",
              rel: "noreferrer noopener",
              className: "inline-block",
              children: e.jsx("img", {
                src: Nr,
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
          disabled: g,
          onChange: (p) => {
            d(p.target.value), i(null);
          },
          onKeyDown: (p) => {
            p.key === "Enter" && (p.preventDefault(), E());
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
                E();
              },
              disabled: g || !N && !O,
              className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
              children: g ? "\uC800\uC7A5 \uC911\u2026" : "\uC800\uC7A5"
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => {
                I();
              },
              disabled: g || !s && !t,
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
  const _t = "size-3.5 rounded-full border border-gray-400 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft", Dt = "relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white";
  function _a(t) {
    return t === ye ? "Google Gemini" : "OpenAI \uD638\uD658";
  }
  function Da() {
    return {
      id: Ir(),
      name: "",
      kind: ne,
      baseUrl: "",
      keyInput: "",
      hasStoredKey: false
    };
  }
  function Ta(t) {
    return {
      id: t.id,
      name: t.name,
      kind: t.kind,
      baseUrl: t.baseUrl,
      keyInput: "",
      hasStoredKey: !!t.apiKey.trim()
    };
  }
  function za({ profiles: t, onSaveProfiles: d }) {
    const [s, u] = a.useState(true), [n, i] = a.useState(null), [g, k] = a.useState(null), [N, v] = a.useState(null), [O, E] = a.useState(0), I = a.useMemo(() => g ? t.find((b) => b.id === g) ?? null : null, [
      g,
      t
    ]), p = n ? wr(n.id, n.kind) || Cr(n.kind) : "", x = () => {
      k(null), i(Da());
    }, m = (b) => {
      k(b.id), i(Ta(b));
    }, C = () => {
      i(null), k(null);
    }, A = () => {
      if (!n) return;
      const b = Er({
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
      const l = n.keyInput.trim() || ((I == null ? void 0 : I.id) === n.id ? I.apiKey : ""), j = {
        id: n.id,
        name: n.name.trim(),
        kind: n.kind,
        baseUrl: n.kind === ne ? St(n.baseUrl) : "",
        apiKey: l
      }, z = t.some((D) => D.id === j.id) ? t.map((D) => D.id === j.id ? j : D) : [
        ...t,
        j
      ];
      d(z), C();
    }, o = () => {
      if (!N) return;
      const b = t.filter((l) => l.id !== N.id);
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
            e.jsx("p", {
              className: "text-xs text-gray-600 dark:text-odp-muted",
              children: "Gemini\uC640 OpenAI \uD638\uD658 endpoint\uB97C \uC5EC\uB7EC \uAC1C \uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC2E4\uC81C \uC0AC\uC6A9\uD560 \uC81C\uACF5\uC790\uB294 \uC5D0\uB514\uD130 AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uACE0\uB985\uB2C8\uB2E4. API \uD0A4\uB294 \uC5F0\uACB0 \uC815\uBCF4\uC640 \uD568\uAED8 \uC554\uD638\uD654\uB418\uBA70, \uC774 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uD45C\uC2DC\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uBE0C\uB77C\uC6B0\uC800\uC5D0\uC11C \uD638\uCD9C\uD558\uBBC0\uB85C \uCEE4\uC2A4\uD140 \uC11C\uBC84\uB294 CORS\uAC00 \uD5C8\uC6A9\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4."
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
                          _a(b.kind),
                          b.kind === ne && b.baseUrl ? ` \xB7 ${b.baseUrl}` : ""
                        ]
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "flex shrink-0 items-center gap-1",
                    children: [
                      e.jsxs("button", {
                        type: "button",
                        onClick: () => m(b),
                        className: "inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg",
                        children: [
                          e.jsx(Bt, {
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
                          e.jsx(Me, {
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
                  children: g ? "\uC81C\uACF5\uC790 \uD3B8\uC9D1" : "\uC81C\uACF5\uC790 \uCD94\uAC00"
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
                      onChange: (b) => i((l) => l && {
                        ...l,
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
                    e.jsxs(ve, {
                      className: "flex flex-wrap items-center gap-4",
                      value: n.kind,
                      onValueChange: (b) => {
                        b !== ye && b !== ne || (i((l) => l && {
                          ...l,
                          kind: b
                        }), E((l) => l + 1));
                      },
                      "aria-label": "\uC81C\uACF5\uC790 \uC885\uB958",
                      children: [
                        e.jsxs("label", {
                          className: "flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg",
                          children: [
                            e.jsx(ce, {
                              value: ye,
                              className: _t,
                              children: e.jsx(We, {
                                className: Dt
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
                            e.jsx(ce, {
                              value: ne,
                              className: _t,
                              children: e.jsx(We, {
                                className: Dt
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
                n.kind === ne ? e.jsxs("div", {
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
                      onChange: (b) => i((l) => l && {
                        ...l,
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
                        n.kind === ne ? " (\uC120\uD0DD)" : ""
                      ]
                    }),
                    e.jsx("input", {
                      type: "password",
                      autoComplete: "off",
                      className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bg",
                      value: n.keyInput,
                      onChange: (b) => i((l) => l && {
                        ...l,
                        keyInput: b.target.value
                      }),
                      placeholder: n.hasStoredKey ? "\uC800\uC7A5\uB428 \u2014 \uBCC0\uACBD \uC2DC \uC0C8 \uD0A4 \uC785\uB825" : n.kind === ye ? "AI Studio API \uD0A4 \uC785\uB825" : "Bearer \uD1A0\uD070 (\uB85C\uCEEC \uC11C\uBC84\uB294 \uBE44\uC6CC \uB450\uC138\uC694)"
                    })
                  ]
                }),
                e.jsxs("div", {
                  children: [
                    e.jsx("label", {
                      className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted",
                      children: "\uAE30\uBCF8 \uBAA8\uB378"
                    }),
                    n.kind === ye ? e.jsx(fa, {
                      getGeminiApiKey: () => n.keyInput.trim() || (I == null ? void 0 : I.apiKey) || "",
                      profileId: n.id,
                      value: p,
                      onChange: (b) => {
                        Nt(n.id, b), E((l) => l + 1);
                      },
                      autoLoad: n.hasStoredKey || !!n.keyInput.trim()
                    }, `${n.id}-${O}`) : e.jsx(ya, {
                      getBaseUrl: () => n.baseUrl,
                      getApiKey: () => n.keyInput.trim() || (I == null ? void 0 : I.apiKey) || "",
                      value: p,
                      onChange: (b) => {
                        Nt(n.id, b), E((l) => l + 1);
                      },
                      autoLoad: !!St(n.baseUrl)
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
                e.jsx($t, {
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
        e.jsx(ue, {
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
  function Ra({ open: t, extension: d, onOpenChange: s, onOpenFile: u }) {
    const n = (d == null ? void 0 : d.files) ?? [], i = d ? `${d.label} \uD30C\uC77C` : "\uD30C\uC77C \uBAA9\uB85D";
    return e.jsx(ba, {
      open: t,
      onOpenChange: s,
      children: e.jsxs(ua, {
        children: [
          e.jsx(pa, {
            className: "fixed inset-0 z-100000 bg-black/40"
          }),
          e.jsxs(ga, {
            className: "fixed top-1/2 left-1/2 z-100001 flex max-h-[min(90vh,40rem)] w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft",
            "aria-describedby": void 0,
            children: [
              e.jsxs("div", {
                className: "flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-odp-borderStrong",
                children: [
                  e.jsxs("div", {
                    className: "min-w-0",
                    children: [
                      e.jsx(ma, {
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
                  e.jsx(ha, {
                    asChild: true,
                    children: e.jsx("button", {
                      type: "button",
                      className: "inline-flex shrink-0 items-center justify-center rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-odp-focusBg dark:hover:text-odp-fg",
                      "aria-label": "\uB2EB\uAE30",
                      children: e.jsx(Mt, {
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
                  children: n.map((g) => e.jsx("li", {
                    children: e.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        u(g);
                      },
                      className: "flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition hover:bg-gray-50 dark:hover:bg-odp-focusBg/40",
                      children: [
                        e.jsx(la, {
                          size: 14,
                          className: "shrink-0 text-gray-400 dark:text-odp-muted",
                          "aria-hidden": true
                        }),
                        e.jsxs("span", {
                          className: "min-w-0 flex-1",
                          children: [
                            e.jsx("span", {
                              className: "block truncate text-xs font-medium text-gray-800 dark:text-odp-fgStrong",
                              children: g.name
                            }),
                            e.jsx("span", {
                              className: "mt-0.5 block truncate font-mono text-[10px] text-gray-500 dark:text-odp-muted",
                              title: g.path,
                              children: g.path
                            })
                          ]
                        }),
                        e.jsx("span", {
                          className: "shrink-0 tabular-nums text-[11px] text-gray-600 dark:text-odp-muted",
                          children: ee(g.size)
                        })
                      ]
                    })
                  }, g.path))
                })
              })
            ]
          })
        ]
      })
    });
  }
  const $a = 160;
  function Fa(t) {
    return t === "error" ? "text-red-600 dark:text-red-400" : t === "warn" ? "text-amber-700 dark:text-amber-300" : t === "ok" ? "text-emerald-700 dark:text-emerald-300" : "text-gray-600 dark:text-odp-muted";
  }
  function Ht({ logs: t, building: d = false, progress: s = null, className: u = "" }) {
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
        }) : e.jsx(Or, {
          ref: n,
          className: "overscroll-contain px-2.5 py-1.5 font-mono text-[10px] leading-relaxed",
          style: {
            height: $a
          },
          data: t,
          "aria-live": "polite",
          "aria-relevant": "additions",
          children: (i) => e.jsxs("div", {
            className: `whitespace-pre-wrap break-all ${Fa(i.level)}`,
            children: [
              e.jsx("span", {
                className: "text-gray-400 dark:text-odp-muted",
                children: Ba(i.at)
              }),
              " ",
              i.message
            ]
          }, i.id)
        })
      ]
    });
  }
  function Ba(t) {
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
  function Xt({ isOpen: t, info: d, onResume: s, onStartFresh: u, onCancel: n }) {
    const i = (d == null ? void 0 : d.processedFileCount) ?? 0, g = (d == null ? void 0 : d.processedChatCount) ?? 0, k = i + g, N = (d == null ? void 0 : d.updatedAt) && d.updatedAt > 0 ? new Date(d.updatedAt).toLocaleString() : null;
    return e.jsx(ue, {
      isOpen: t,
      title: "\uC911\uC9C0\uB41C \uC0C9\uC778 \uCCB4\uD06C\uD3EC\uC778\uD2B8",
      message: k > 0 ? `\uC774\uC804\uC5D0 \uC911\uC9C0\xB7\uC911\uB2E8\uB41C \uC0C9\uC778\uC774 \uC788\uC2B5\uB2C8\uB2E4.
\uCC98\uB9AC\uB428: \uD30C\uC77C ${i} \xB7 \uCC44\uD305 day ${g}${N ? `
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
  ], Ma = `linear-gradient(90deg, ${ke.map((t) => `rgb(${t.rgb.join(" ")}) ${(t.t * 100).toFixed(2)}%`).join(", ")})`;
  function Tt(t) {
    return Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : 0;
  }
  function rt(t, d, s) {
    return Math.round(t + (d - t) * s);
  }
  function Ka(t) {
    const d = Tt(t / 100);
    let s = 0;
    for (; s < ke.length - 2 && d > ke[s + 1].t; ) s += 1;
    const u = ke[s], n = ke[s + 1], i = n.t - u.t || 1, g = Tt((d - u.t) / i), k = rt(u.rgb[0], n.rgb[0], g), N = rt(u.rgb[1], n.rgb[1], g), v = rt(u.rgb[2], n.rgb[2], g);
    return `rgb(${k} ${N} ${v})`;
  }
  function zt({ percent: t }) {
    const d = Ka(t);
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
  function Wa() {
    return e.jsxs("div", {
      className: "space-y-0.5",
      "aria-label": "\uC6A9\uB7C9 \uBE44\uC728 \uC0C9\uC0C1 \uBC94\uB840",
      children: [
        e.jsx("div", {
          className: "h-1.5 w-full rounded-full border border-gray-200 dark:border-odp-borderStrong",
          style: {
            backgroundImage: Ma
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
  function Ua(t) {
    return t === be ? "Local Haim" : t === je ? "WebDAV Haim" : t === oe ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function Ga() {
    return e.jsx("div", {
      className: "flex h-40 min-h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-white text-xs text-gray-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted md:h-full md:min-h-48",
      children: "\uADF8\uB798\uD504 \uC900\uBE44\uC911"
    });
  }
  function Va({ depth: t, expandable: d, expanded: s, label: u }) {
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
          children: u
        })
      ]
    });
  }
  function at({ columns: t, rows: d, emptyText: s = "\uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", maxHeightClass: u = "max-h-64", legendColumnKey: n = null }) {
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
            }) : d.map((i, g) => {
              var _a2, _b, _c, _d;
              const k = typeof i._onClick == "function", N = ((_a2 = i._tree) == null ? void 0 : _a2.expandable) ? i._tree.expanded : void 0, v = (_c = (_b = d[g - 1]) == null ? void 0 : _b._tree) == null ? void 0 : _c.depth, O = (_d = i._tree) == null ? void 0 : _d.depth, E = g > 0 && typeof v == "number" && typeof O == "number" && O < v, I = (p) => {
                var _a3;
                k && (p.key !== "Enter" && p.key !== " " || (p.preventDefault(), (_a3 = i._onClick) == null ? void 0 : _a3.call(i)));
              };
              return e.jsx("tr", {
                onClick: k ? i._onClick : void 0,
                onKeyDown: I,
                tabIndex: k ? 0 : void 0,
                "aria-expanded": N,
                className: `hover:bg-gray-50 dark:hover:bg-odp-focusBg/40 ${k ? "cursor-pointer" : ""}`,
                children: t.map((p) => {
                  const x = p.tree ? i._tree : void 0;
                  return e.jsx("td", {
                    className: `px-3 py-1.5 text-gray-700 dark:text-odp-fg ${E ? "border-t-2 border-gray-300 dark:border-odp-borderStrong" : "border-t border-gray-100 dark:border-odp-borderSoft"} ${p.align === "right" ? "text-right tabular-nums" : ""} ${p.className ?? ""}`,
                    children: x ? e.jsx(Va, {
                      depth: x.depth,
                      expandable: x.expandable,
                      expanded: x.expanded,
                      label: x.label
                    }) : i[p.key]
                  }, p.key);
                })
              }, i._key ?? g);
            })
          }),
          n ? e.jsx("tfoot", {
            children: e.jsx("tr", {
              children: t.map((i) => e.jsx("td", {
                className: "sticky bottom-0 border-t border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                children: i.key === n ? e.jsx(Wa, {}) : null
              }, i.key))
            })
          }) : null
        ]
      })
    });
  }
  function Ha(t, d) {
    const s = /* @__PURE__ */ new Set(), u = [];
    for (const n of t) (n.parentPath == null || s.has(n.parentPath) && d.has(n.parentPath)) && (u.push(n), s.add(n.path));
    return u;
  }
  function st({ title: t, open: d, onToggle: s, children: u }) {
    return e.jsxs("div", {
      className: "rounded-md border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-bgSoft",
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: s,
          "aria-expanded": d,
          className: "flex w-full items-center gap-1.5 px-3 py-2 text-left text-xs font-bold text-gray-700 transition hover:bg-gray-50 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg/40",
          children: [
            d ? e.jsx(le, {
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
        d ? e.jsxs("div", {
          className: "grid grid-cols-1 gap-3 border-t border-gray-200 p-3 dark:border-odp-borderStrong md:grid-cols-[minmax(10rem,14rem)_minmax(0,1fr)] md:items-stretch",
          children: [
            e.jsx("div", {
              className: "min-w-0",
              children: e.jsx(Ga, {})
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
  function Xa({ storageMode: t = oe, onScanTree: d, canScan: s = true, onOpenFile: u }) {
    const [n, i] = a.useState(false), [g, k] = a.useState(null), [N, v] = a.useState(null), [O, E] = a.useState(() => /* @__PURE__ */ new Set()), [I, p] = a.useState(null), [x, m] = a.useState({
      summary: true,
      extension: false,
      folder: false
    }), [C, A] = a.useState(false), [o, b] = a.useState(() => R.getStatus()), [l, j] = a.useState(false), [T, z] = a.useState(null), [D, L] = a.useState(false);
    a.useEffect(() => R.subscribe(() => {
      b(R.getStatus());
    }), []), a.useEffect(() => {
      R.refreshCheckpointStatus();
    }, []), a.useEffect(() => {
      v(null), k(null), E(/* @__PURE__ */ new Set()), p(null), m({
        summary: true,
        extension: false,
        folder: false
      });
    }, [
      t
    ]);
    const $ = (f) => {
      m((B) => ({
        ...B,
        [f]: !B[f]
      }));
    }, te = (f) => {
      E((B) => {
        const W = new Set(B);
        return W.has(f) ? W.delete(f) : W.add(f), W;
      });
    }, G = async () => {
      if (!(!d || !s || n)) {
        i(true), k(null);
        try {
          const f = await d();
          v(va(f)), E(/* @__PURE__ */ new Set()), p(null);
        } catch (f) {
          const B = f instanceof Error ? f.message : String(f);
          k(B || "\uC6A9\uB7C9 \uBD84\uC11D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."), v(null), E(/* @__PURE__ */ new Set()), p(null);
        } finally {
          i(false);
        }
      }
    }, K = (f) => {
      C || o.building || !o.enabled || !o.isolationReady || (A(true), R.rebuild({
        resume: f
      }).finally(() => A(false)));
    }, xe = () => {
      C || o.building || !o.enabled || !o.isolationReady || (async () => {
        const f = await R.getRebuildCheckpointInfo();
        if (f) {
          z(f), j(true);
          return;
        }
        if (o.hasIndex) {
          L(true);
          return;
        }
        K(false);
      })();
    }, re = () => {
      R.cancelRebuild();
    }, P = N == null ? void 0 : N.summary, ae = P && P.totalSize > 0 ? P.indexSize / P.totalSize * 100 : 0, Y = P ? [
      {
        label: "\uCD1D \uC6A9\uB7C9",
        value: ee(P.totalSize)
      },
      {
        label: "\uC0C9\uC778 \uB370\uC774\uD130 (.advanced-search)",
        value: `${ee(P.indexSize)} \xB7 ${P.indexFileCount.toLocaleString()}\uAC1C \uD30C\uC77C${P.totalSize > 0 ? ` \xB7 ${ae.toFixed(1)}%` : ""}`
      },
      {
        label: "\uC0C9\uC778 \uC81C\uC678 \uC6A9\uB7C9",
        value: ee(Math.max(0, P.totalSize - P.indexSize))
      },
      {
        label: "\uD30C\uC77C \uC218",
        value: P.fileCount.toLocaleString()
      },
      {
        label: "\uD3F4\uB354 \uC218",
        value: P.folderCount.toLocaleString()
      },
      {
        label: "0 byte \uD30C\uC77C",
        value: P.zeroByteCount.toLocaleString()
      },
      ...P.unknownSizeCount > 0 ? [
        {
          label: "\uD06C\uAE30 \uBBF8\uD655\uC778 \uD30C\uC77C",
          value: P.unknownSizeCount.toLocaleString()
        }
      ] : []
    ] : [], se = Ha((N == null ? void 0 : N.folders) ?? [], O);
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
                      children: Ua(t)
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
                  onClick: xe,
                  disabled: !s || C || o.building || !o.enabled || !o.isolationReady,
                  className: "inline-flex items-center gap-1.5 rounded border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                  title: o.enabled ? o.isolationReady ? "Advanced Search \uC5ED\uC0C9\uC778\uC744 \uBC31\uADF8\uB77C\uC6B4\uB4DC\uB85C \uC0DD\uC131\uD569\uB2C8\uB2E4" : "\uAC80\uC0C9 \uACA9\uB9AC(COOP/COEP)\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694" : "\uC124\uC815\uC5D0\uC11C \uC5ED\uC0C9\uC778\uC744 \uCF20 \uB4A4 \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",
                  children: [
                    C || o.building ? e.jsx(Ke, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(Kt, {
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
                    e.jsx(ia, {
                      size: 14
                    }),
                    "\uC911\uC9C0"
                  ]
                }) : null,
                e.jsxs("button", {
                  type: "button",
                  onClick: G,
                  disabled: !s || n || typeof d != "function",
                  className: "inline-flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg",
                  children: [
                    n ? e.jsx(Ke, {
                      size: 14,
                      className: "animate-spin"
                    }) : e.jsx(Ft, {
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
        e.jsx(Ht, {
          logs: o.buildLogs || [],
          building: o.building,
          progress: o.buildProgress
        }),
        e.jsx(Xt, {
          isOpen: l,
          info: T,
          onCancel: () => {
            j(false), z(null);
          },
          onResume: () => {
            j(false), z(null), K(true);
          },
          onStartFresh: () => {
            j(false), z(null), K(false);
          }
        }),
        e.jsx(ue, {
          isOpen: D,
          title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
          message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
          confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
          cancelLabel: "\uCDE8\uC18C",
          onConfirm: () => {
            L(false), K(false);
          },
          onCancel: () => L(false)
        }),
        g && e.jsx("p", {
          className: "whitespace-pre-wrap text-xs text-red-600 dark:text-red-400",
          children: g
        }),
        e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsx(st, {
              title: "\uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: x.summary,
              onToggle: () => $("summary"),
              children: e.jsx(at, {
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
                rows: Y.map((f) => ({
                  label: f.label,
                  value: f.value
                })),
                emptyText: "\uBD84\uC11D\uC744 \uC2DC\uC791\uD558\uBA74 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4."
              })
            }),
            e.jsx(st, {
              title: "\uD30C\uC77C \uD615\uC2DD\uBCC4 \uC6A9\uB7C9 \uC0AC\uC6A9\uB7C9",
              open: x.extension,
              onToggle: () => $("extension"),
              children: e.jsx(at, {
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
                  percent: e.jsx(zt, {
                    percent: f.percent
                  }),
                  _onClick: () => p(f)
                })),
                emptyText: "\uBD84\uC11D\uC744 \uC2DC\uC791\uD558\uBA74 \uD615\uC2DD\uBCC4 \uC6A9\uB7C9\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4.",
                legendColumnKey: "percent"
              })
            }),
            e.jsx(st, {
              title: "\uD3F4\uB354\uBCC4 \uC6A9\uB7C9 (Tree Size)",
              open: x.folder,
              onToggle: () => $("folder"),
              children: e.jsx(at, {
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
                rows: se.map((f) => {
                  const B = O.has(f.path);
                  return {
                    _key: f.path,
                    fileCount: f.fileCount.toLocaleString(),
                    size: ee(f.size),
                    percent: e.jsx(zt, {
                      percent: f.percent
                    }),
                    ...f.hasChildFolders ? {
                      _onClick: () => te(f.path)
                    } : {},
                    _tree: {
                      depth: f.depth,
                      expandable: f.hasChildFolders,
                      expanded: B,
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
        e.jsx(Ra, {
          open: I != null,
          extension: I,
          onOpenChange: (f) => {
            f || p(null);
          },
          onOpenFile: async (f) => {
            p(null), await (u == null ? void 0 : u(f));
          }
        })
      ]
    });
  }
  const Ya = (t) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    t ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), Ja = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
  function qa(t) {
    return t === be ? "Local Haim" : t === je ? "WebDAV Haim" : t === oe ? "S3 Haim" : "\uC800\uC7A5\uC18C";
  }
  function Za({ storageMode: t, canScan: d = false, onScanTree: s, onReadText: u, onReadBytes: n, onDeletePaths: i }) {
    const [g, k] = a.useState(() => Ar()), [N, v] = a.useState("notes"), [O, E] = a.useState("trash"), [I, p] = a.useState(false), [x, m] = a.useState(false), [C, A] = a.useState(null), [o, b] = a.useState(null), [l, j] = a.useState(""), [T, z] = a.useState([]), [D, L] = a.useState(() => /* @__PURE__ */ new Set()), [$, te] = a.useState([]), [G, K] = a.useState(() => /* @__PURE__ */ new Set()), [xe, re] = a.useState({}), [P, ae] = a.useState(false), [Y, se] = a.useState([]), [f, B] = a.useState(false), W = a.useRef(null);
    a.useEffect(() => Rt((c, y) => {
      c === "settings-orphan-image-auto" && k(y);
    }), []), a.useEffect(() => () => {
      var _a2;
      (_a2 = W.current) == null ? void 0 : _a2.abort();
    }, []);
    const Z = I || x || f, Ne = async () => {
      var _a2;
      if (!d || !s || !u || Z) return;
      (_a2 = W.current) == null ? void 0 : _a2.abort();
      const c = new AbortController();
      W.current = c, p(true), j(""), A(null);
      try {
        const y = await s();
        if (c.signal.aborted) return;
        const w = wt(y, N), _ = Lr(y), F = /* @__PURE__ */ new Set();
        if (await Pr(_, 6, async (M) => {
          try {
            const X = await u(M);
            for (const Ce of _r(X)) F.add(Ce);
          } catch {
          }
        }, {
          signal: c.signal,
          onProgress: (M, X) => A({
            done: M,
            total: X
          })
        }), c.signal.aborted) return;
        const U = Dr({
          images: w,
          referencedPaths: F
        });
        z(U), L(new Set(U.map((M) => M.path)));
      } catch (y) {
        if ((y == null ? void 0 : y.name) === "AbortError") return;
        j(y instanceof Error ? y.message : String(y));
      } finally {
        p(false), A(null);
      }
    }, Se = async () => {
      var _a2;
      if (!d || !s || !n || Z) return;
      (_a2 = W.current) == null ? void 0 : _a2.abort();
      const c = new AbortController();
      W.current = c, m(true), j(""), b(null);
      try {
        const y = await s();
        if (c.signal.aborted) return;
        const w = wt(y, N), _ = await Tr(w, n, {
          signal: c.signal,
          onProgress: (M, X) => b({
            done: M,
            total: X
          })
        });
        if (c.signal.aborted) return;
        te(_);
        const F = {}, U = /* @__PURE__ */ new Set();
        for (const M of _) {
          F[M.hash] = M.keepPath;
          for (const X of M.files) X.path !== M.keepPath && U.add(X.path);
        }
        re(F), K(U);
      } catch (y) {
        if ((y == null ? void 0 : y.name) === "AbortError") return;
        j(y instanceof Error ? y.message : String(y));
      } finally {
        m(false), b(null);
      }
    }, pe = (c) => {
      L((y) => {
        const w = new Set(y);
        return w.has(c) ? w.delete(c) : w.add(c), w;
      });
    }, Ue = (c, y) => {
      const w = xe[y];
      c !== w && K((_) => {
        const F = new Set(_);
        return F.has(c) ? F.delete(c) : F.add(c), F;
      });
    }, Ge = (c, y) => {
      re((w) => ({
        ...w,
        [c]: y
      })), K((w) => {
        const _ = new Set(w), F = $.find((U) => U.hash === c);
        if (!F) return _;
        for (const U of F.files) U.path === y ? _.delete(U.path) : _.add(U.path);
        return _;
      });
    }, we = (c) => {
      !c.length || !i || (se(c), ae(true));
    }, Ve = async () => {
      if (!(!i || !Y.length)) {
        B(true), j("");
        try {
          await i(Y, O);
          const c = new Set(Y);
          z((y) => y.filter((w) => !c.has(w.path))), L((y) => {
            const w = new Set(y);
            for (const _ of c) w.delete(_);
            return w;
          }), te((y) => y.map((w) => ({
            ...w,
            files: w.files.filter((_) => !c.has(_.path))
          })).filter((w) => w.files.length >= 2)), K((y) => {
            const w = new Set(y);
            for (const _ of c) w.delete(_);
            return w;
          }), ae(false), se([]);
        } catch (c) {
          j(c instanceof Error ? c.message : String(c));
        } finally {
          B(false);
        }
      }
    }, H = D.size, J = G.size, de = O === "hard";
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
                qa(t),
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
            e.jsx(Wt, {
              className: Ya(g),
              checked: g,
              onCheckedChange: (c) => V("settings-orphan-image-auto", c),
              "aria-label": "\uB178\uD2B8 \uC0AD\uC81C \uC2DC \uC774\uBBF8\uC9C0 \uC790\uB3D9 \uC815\uB9AC",
              children: e.jsx(Ut, {
                className: Ja
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
                e.jsx(ve, {
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
                    return e.jsx(ce, {
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
                e.jsx(ve, {
                  className: "flex flex-col gap-1.5",
                  value: O,
                  onValueChange: (c) => E(c),
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
                    const y = O === c.value;
                    return e.jsx(ce, {
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
            e.jsxs(Re, {
              type: "button",
              variant: "secondary",
              disabled: !d || Z,
              onClick: () => {
                Ne();
              },
              children: [
                I ? e.jsx(Ke, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(Kt, {
                  size: 14
                }),
                "\uBBF8\uC0AC\uC6A9 \uC2A4\uCE94"
              ]
            }),
            e.jsxs(Re, {
              type: "button",
              variant: "secondary",
              disabled: !d || Z,
              onClick: () => {
                Se();
              },
              children: [
                x ? e.jsx(Ke, {
                  size: 14,
                  className: "animate-spin"
                }) : e.jsx(ca, {
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
        l ? e.jsx("p", {
          className: "text-xs text-red-600 dark:text-red-400",
          role: "alert",
          children: l
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
                e.jsxs(Re, {
                  type: "button",
                  variant: "danger",
                  disabled: H === 0 || Z,
                  onClick: () => we([
                    ...D
                  ]),
                  children: [
                    e.jsx(Me, {
                      size: 14
                    }),
                    "\uC120\uD0DD \uC0AD\uC81C (",
                    H,
                    ")"
                  ]
                })
              ]
            }),
            e.jsx("ul", {
              className: "max-h-56 space-y-1 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter",
              children: T.map((c) => e.jsx("li", {
                children: e.jsxs("label", {
                  className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg",
                  children: [
                    e.jsx("input", {
                      type: "checkbox",
                      className: "mt-0.5",
                      checked: D.has(c.path),
                      onChange: () => pe(c.path)
                    }),
                    e.jsx("span", {
                      className: "min-w-0 flex-1 break-all",
                      children: c.path
                    }),
                    e.jsx("span", {
                      className: "shrink-0 tabular-nums text-gray-500 dark:text-odp-muted",
                      children: ee(c.size)
                    })
                  ]
                })
              }, c.path))
            })
          ]
        }) : null,
        $.length > 0 ? e.jsxs("div", {
          className: "space-y-3",
          children: [
            e.jsxs("div", {
              className: "flex items-center justify-between gap-2",
              children: [
                e.jsxs("h4", {
                  className: "text-xs font-bold text-gray-700 dark:text-odp-fg",
                  children: [
                    "\uC911\uBCF5 (",
                    $.length,
                    " \uADF8\uB8F9)"
                  ]
                }),
                e.jsxs(Re, {
                  type: "button",
                  variant: "danger",
                  disabled: J === 0 || Z,
                  onClick: () => we([
                    ...G
                  ]),
                  children: [
                    e.jsx(Me, {
                      size: 14
                    }),
                    "\uC120\uD0DD \uC0AD\uC81C (",
                    J,
                    ")"
                  ]
                })
              ]
            }),
            $.map((c) => e.jsxs("div", {
              className: "space-y-1 rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter",
              children: [
                e.jsxs("div", {
                  className: "text-[10px] text-gray-500 dark:text-odp-muted",
                  children: [
                    ee(c.size),
                    " \xB7 ",
                    c.hash.slice(0, 12),
                    "\u2026"
                  ]
                }),
                e.jsx("ul", {
                  className: "space-y-1",
                  children: c.files.map((y) => {
                    const w = xe[c.hash] === y.path;
                    return e.jsx("li", {
                      children: e.jsxs("label", {
                        className: "flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg",
                        children: [
                          e.jsx("input", {
                            type: "checkbox",
                            className: "mt-0.5",
                            checked: G.has(y.path),
                            disabled: w,
                            onChange: () => Ue(y.path, c.hash)
                          }),
                          e.jsxs("span", {
                            className: "min-w-0 flex-1 break-all",
                            children: [
                              y.path,
                              w ? e.jsx("span", {
                                className: "ml-1 text-[10px] text-blue-600 dark:text-blue-400",
                                children: "(\uC720\uC9C0)"
                              }) : null
                            ]
                          }),
                          w ? null : e.jsx("button", {
                            type: "button",
                            className: "shrink-0 text-[10px] text-blue-600 underline dark:text-blue-400",
                            onClick: () => Ge(c.hash, y.path),
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
        e.jsx(ue, {
          isOpen: P,
          title: de ? "\uC774\uBBF8\uC9C0\uB97C \uC601\uAD6C \uC0AD\uC81C\uD560\uAE4C\uC694?" : "\uC774\uBBF8\uC9C0\uB97C \uD734\uC9C0\uD1B5\uC73C\uB85C \uBCF4\uB0BC\uAE4C\uC694?",
          message: de ? `${Y.length}\uAC1C \uD30C\uC77C\uC744 \uBCF5\uAD6C\uD560 \uC218 \uC5C6\uC774 \uC0AD\uC81C\uD569\uB2C8\uB2E4.` : `${Y.length}\uAC1C \uD30C\uC77C\uC744 .trash/ \uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.`,
          variant: "danger",
          confirmLabel: de ? "\uC601\uAD6C \uC0AD\uC81C" : "\uD734\uC9C0\uD1B5\uC73C\uB85C \uC774\uB3D9",
          cancelLabel: "\uCDE8\uC18C",
          confirmDisabled: f,
          onConfirm: () => {
            Ve();
          },
          onCancel: () => {
            f || (ae(false), se([]));
          }
        })
      ]
    });
  }
  xs = function({ s3Creds: t, masterPassword: d, onSaveS3Creds: s, onExportCreds: u, onImportClick: n, showHiddenFolders: i, onToggleHiddenFolders: g, showTrashFolder: k = false, onToggleTrashFolder: N, hideRecordingCompanions: v = false, onToggleHideRecordingCompanions: O, treeStickyFolderPathEnabled: E = true, onToggleTreeStickyFolderPath: I, treeHoverExpandSettings: p = aa, onTreeHoverExpandSettingsChange: x, onRequestClose: m, webauthnSupported: C = false, webauthnEnabled: A = false, webauthnStorageOnly: o = false, onEnableWebAuthn: b, onDisableWebAuthn: l, snippetConfig: j, onChangeSnippetConfig: T, onSaveSnippetConfig: z, isSavingSnippets: D = false, snippetConfigLoaded: L = false, editorType: $, onEditorTypeChange: te, storageMode: G = oe, onStorageModeChange: K, localFolderName: xe = "", onOpenLocalFolder: re, webdavConfig: P, onSaveWebdavConfig: ae, isMobileLayout: Y = false, sidebarOpen: se = true, sidebarCollapsed: f = false, onOpenSidebar: B, onCheckAppUpdate: W, isCheckingAppUpdate: Z = false, latestAppBuildId: Ne = "", onScanStorageUsage: Se, canScanStorageUsage: pe = false, onOpenStorageUsageFile: Ue, onReadUnusedImageText: Ge, onReadUnusedImageBytes: we, onDeleteUnusedImagePaths: Ve }) {
    const [H, J] = a.useState(t), [de, c] = a.useState(""), [y, w] = a.useState(P ?? {
      endpoint: "",
      username: "",
      password: "",
      basePath: ""
    }), [_, F] = a.useState(false), [U, M] = a.useState(C), [X, Ce] = a.useState(() => zr()), [Yt, dt] = a.useState(() => $ ?? Rr()), [Ee, Jt] = a.useState(() => $r()), [ge, qt] = a.useState(() => Fr()), [nt, ot] = a.useState(() => Ct()), [Ie, Zt] = a.useState(() => Br()), [Oe, Qt] = a.useState(() => Mr()), [S, lt] = a.useState(() => R.getStatus()), [Ae, er] = a.useState(() => Kr()), [tr, it] = a.useState(() => Et()), [ct, q] = a.useState(false), [rr, Le] = a.useState(false), [ar, Pe] = a.useState(null), [sr, He] = a.useState(false), [Xe, xt] = a.useState(true), [_e, bt] = a.useState(() => G === be), [De, ut] = a.useState(false), [Ye, pt] = a.useState(true), Je = lr(), qe = String(xe || "").trim() || Wr() || "", gt = typeof window < "u" && "showDirectoryPicker" in window;
    a.useEffect(() => Rt((r, h) => {
      r === "settings-alt-vim" ? Jt(h) : r === "settings-workspace-tabs" ? qt(h) : r === "settings-new-file-temp" ? Zt(h) : r === "settings-composer-helper" ? Qt(h) : r === "settings-as-animation" ? er(h) : (r === "settings-as-index" || r === "settings-as-include-other") && lt(R.getStatus());
    }), []), a.useEffect(() => {
      const r = (h) => {
        var _a2;
        const Q = ((_a2 = h == null ? void 0 : h.detail) == null ? void 0 : _a2.mode) ?? Et();
        it(Q);
      };
      return window.addEventListener(It, r), () => {
        window.removeEventListener(It, r);
      };
    }, []), a.useEffect(() => {
      const r = (h) => {
        var _a2;
        const Q = ((_a2 = h == null ? void 0 : h.detail) == null ? void 0 : _a2.mode) ?? Ct();
        ot(Q);
      };
      return window.addEventListener(Ot, r), () => {
        window.removeEventListener(Ot, r);
      };
    }, []), a.useEffect(() => {
      const r = String(Je.hash || "").replace(/^#/, "");
      if (!r.startsWith("settings-")) return;
      r === "settings-s3" && xt(true), r === "settings-local" && bt(true), r === "settings-webdav" && ut(true), r === "settings-imgbb" && pt(true);
      const Q = (/* @__PURE__ */ new Set([
        "settings-llm-providers",
        "settings-llm-provider",
        "settings-gemini",
        "settings-openai-compat"
      ])).has(r) ? "settings-llm-providers" : r, Te = window.setTimeout(() => {
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
      return () => window.clearTimeout(Te);
    }, [
      Je.hash,
      Je.pathname
    ]), a.useEffect(() => R.subscribe(() => {
      lt(R.getStatus());
    }), []), a.useEffect(() => {
      J({
        ...t,
        llmProviderProfiles: et(t)
      }), c("");
    }, [
      t
    ]);
    const Ze = !!((t == null ? void 0 : t.imgbbApiKey) || "").trim(), me = (r) => {
      const h = r !== void 0 ? r : et(H), Q = oa(h), he = de.trim() || (Ze ? t.imgbbApiKey : "");
      return {
        ...H,
        llmProviderProfiles: h,
        ...Q,
        imgbbApiKey: he
      };
    };
    a.useEffect(() => {
      w(P ?? {
        endpoint: "",
        username: "",
        password: "",
        basePath: ""
      });
    }, [
      P
    ]), a.useEffect(() => {
      $ !== void 0 && dt($);
    }, [
      $
    ]), a.useEffect(() => {
      let r = false;
      return Ur().then((h) => {
        r || M(h);
      }), () => {
        r = true;
      };
    }, []);
    const dr = U && (d || o), nr = !Y && f ? "md:pl-14" : "";
    return e.jsxs("div", {
      className: "flex-1 flex flex-col bg-white dark:bg-odp-bgSofter min-w-0 max-h-full",
      children: [
        e.jsxs("div", {
          className: `px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-odp-surface flex justify-between items-center gap-3 bg-gray-50 dark:bg-odp-surface shrink-0 transition-[padding] duration-300 ease-in-out ${nr}`,
          children: [
            e.jsxs("div", {
              className: "flex min-w-0 flex-1 items-center gap-2",
              children: [
                Y && !se && typeof B == "function" && e.jsx("button", {
                  type: "button",
                  "aria-label": "\uC0AC\uC774\uB4DC\uBC14 \uC5F4\uAE30",
                  onClick: B,
                  className: "inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
                  children: e.jsx(Gr, {
                    size: 22
                  })
                }),
                e.jsxs("h2", {
                  className: "font-bold text-gray-700 dark:text-odp-fgStrong flex min-w-0 items-center gap-2",
                  children: [
                    e.jsx(Vr, {}),
                    " \uC124\uC815 \uBC0F \uC554\uD638\uD654"
                  ]
                })
              ]
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => m == null ? void 0 : m(me()),
              className: "text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded transition",
              children: e.jsx(Mt, {
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
                          value: oe,
                          checked: G === oe,
                          onChange: () => K == null ? void 0 : K(oe)
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
                          onChange: () => K == null ? void 0 : K(be)
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
                          onChange: () => K == null ? void 0 : K(je)
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
                r.preventDefault(), s(me());
              },
              className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => xt((r) => !r),
                  className: "flex w-full items-center gap-2 text-left",
                  "aria-expanded": Xe,
                  children: [
                    Xe ? e.jsx(le, {
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
                              value: H.accessKeyId,
                              onChange: (r) => J((h) => ({
                                ...h,
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
                              value: H.secretAccessKey,
                              onChange: (r) => J((h) => ({
                                ...h,
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
                              value: H.region,
                              onChange: (r) => J((h) => ({
                                ...h,
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
                              value: H.bucket,
                              onChange: (r) => J((h) => ({
                                ...h,
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
                              value: H.endpoint || "",
                              onChange: (r) => J((h) => ({
                                ...h,
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
                          onClick: () => m == null ? void 0 : m(me()),
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
                r.preventDefault(), ae == null ? void 0 : ae(y);
              },
              className: "scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => ut((r) => !r),
                  className: "flex w-full items-center gap-2 text-left",
                  "aria-expanded": De,
                  children: [
                    De ? e.jsx(le, {
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
                    De ? null : e.jsx("span", {
                      className: "ml-auto text-[11px] font-normal text-gray-400 dark:text-odp-muted",
                      children: "\uC811\uD798"
                    })
                  ]
                }),
                De ? e.jsxs(e.Fragment, {
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
                              value: y.endpoint,
                              onChange: (r) => w((h) => ({
                                ...h,
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
                              value: y.username,
                              onChange: (r) => w((h) => ({
                                ...h,
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
                              value: y.password,
                              onChange: (r) => w((h) => ({
                                ...h,
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
                              value: y.basePath,
                              onChange: (r) => w((h) => ({
                                ...h,
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
                              const { createWebdavBackend: r } = await or(async () => {
                                const { createWebdavBackend: Q } = await import("./index-BDGl3GOe.js").then(async (m2) => {
                                  await m2.__tla;
                                  return m2;
                                }).then((Te) => Te.gg);
                                return {
                                  createWebdavBackend: Q
                                };
                              }, __vite__mapDeps([0,1,2,3,4,5,6,7,8])), h = r(y);
                              if (!h.isReady()) {
                                alert("Endpoint\uC640 Username\uC744 \uC785\uB825\uD558\uC138\uC694.");
                                return;
                              }
                              await h.testConnection(), alert("WebDAV \uC5F0\uACB0\uC5D0 \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4.");
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
                  onClick: () => bt((r) => !r),
                  className: "flex w-full items-center gap-2 text-left",
                  "aria-expanded": _e,
                  children: [
                    _e ? e.jsx(le, {
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
                    _e ? null : e.jsx("span", {
                      className: "ml-auto text-[11px] font-normal text-gray-400 dark:text-odp-muted",
                      children: "\uC811\uD798"
                    })
                  ]
                }),
                _e ? e.jsxs(e.Fragment, {
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
                    gt ? null : e.jsx("p", {
                      className: "text-xs text-amber-700 dark:text-amber-300",
                      children: "\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uD3F4\uB354 \uC120\uD0DD\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Chromium \uACC4\uC5F4 \uBE0C\uB77C\uC6B0\uC800\uB97C \uC0AC\uC6A9\uD574 \uC8FC\uC138\uC694."
                    }),
                    e.jsx("div", {
                      className: "flex justify-end gap-2 pt-2",
                      children: e.jsxs("button", {
                        type: "button",
                        disabled: !gt || typeof re != "function",
                        onClick: () => re == null ? void 0 : re(),
                        className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                        children: [
                          e.jsx(Hr, {
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
                        e.jsx(Xr, {}),
                        " S3 \uC5F0\uACB0\uC815\uBCF4 \uB0B4\uBCF4\uB0B4\uAE30"
                      ]
                    }),
                    e.jsxs("button", {
                      onClick: n,
                      className: "flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded transition",
                      children: [
                        e.jsx(Yr, {}),
                        " S3 \uC5F0\uACB0\uC815\uBCF4 \uBD88\uB7EC\uC624\uAE30"
                      ]
                    })
                  ]
                })
              ]
            }),
            dr && e.jsxs("div", {
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
                  children: o ? "S3 \uC5F0\uACB0 \uC815\uBCF4\uAC00 \uBCF4\uC548 \uD0A4\uB85C\uB9CC \uC554\uD638\uD654\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0 \uC2DC\uC5D0\uB294 \uBE44\uBC00\uBC88\uD638\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4." : "\uC9C0\uBB38, Windows Hello, Touch ID \uB4F1\uC73C\uB85C \uC571 \uC7A0\uAE08 \uD574\uC81C\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uB370\uC774\uD130 \uBC31\uC5C5/\uBCF5\uC6D0 \uC2DC\uC5D0\uB294 \uBE44\uBC00\uBC88\uD638\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."
                }),
                o ? e.jsx("p", {
                  className: "text-xs text-gray-600 dark:text-odp-muted",
                  children: "\uC800\uC7A5\uC18C: \uBCF4\uC548 \uD0A4\uB85C \uBCF4\uD638\uB428"
                }) : A ? e.jsxs("div", {
                  className: "flex items-center gap-2 flex-wrap",
                  children: [
                    e.jsx("span", {
                      className: "text-xs text-gray-700 dark:text-odp-fg",
                      children: "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uC0AC\uC6A9 \uC911"
                    }),
                    e.jsx("button", {
                      type: "button",
                      onClick: () => l == null ? void 0 : l(),
                      className: "text-xs text-red-600 dark:text-red-400 hover:underline",
                      children: "\uC0AC\uC6A9 \uD574\uC81C"
                    })
                  ]
                }) : e.jsx("div", {
                  className: "flex flex-col gap-2",
                  children: e.jsx("button", {
                    type: "button",
                    disabled: _,
                    onClick: async () => {
                      if (_ || !b) return;
                      let r;
                      try {
                        r = b(d);
                      } catch (h) {
                        alert((h == null ? void 0 : h.message) || "\uBCF4\uC548 \uD0A4 \uB4F1\uB85D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
                        return;
                      }
                      F(true);
                      try {
                        await r;
                      } catch (h) {
                        alert((h == null ? void 0 : h.message) || "\uBCF4\uC548 \uD0A4 \uB4F1\uB85D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
                      } finally {
                        F(false);
                      }
                    },
                    className: "text-left text-xs py-2 px-3 rounded border border-gray-300 dark:border-odp-borderStrong hover:bg-gray-100 dark:hover:bg-odp-surface transition",
                    "aria-label": "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uB4F1\uB85D",
                    children: _ ? "\uB4F1\uB85D \uC911\u2026" : "\uC9C0\uBB38/\uBCF4\uC548 \uD0A4\uB85C \uC7A0\uAE08 \uD574\uC81C \uC0AC\uC6A9 (\uB4F1\uB85D)"
                  })
                })
              ]
            }),
            pe && e.jsx("div", {
              id: "settings-storage-usage",
              tabIndex: -1,
              className: "scroll-mt-4",
              children: e.jsx(Xa, {
                storageMode: G,
                onScanTree: Se,
                canScan: pe,
                onOpenFile: Ue
              })
            }),
            e.jsx(za, {
              profiles: et(H),
              onSaveProfiles: (r) => {
                J((h) => ({
                  ...h,
                  llmProviderProfiles: r
                })), s(me(r));
              }
            }),
            e.jsx(Za, {
              storageMode: G,
              canScan: pe,
              onScanTree: Se,
              onReadText: Ge,
              onReadBytes: we,
              onDeletePaths: Ve
            }),
            e.jsxs("form", {
              id: "settings-imgbb",
              tabIndex: -1,
              onSubmit: (r) => {
                if (r.preventDefault(), !de.trim() && !Ze) {
                  alert("API \uD0A4\uB97C \uC785\uB825\uD558\uC138\uC694.");
                  return;
                }
                s(me());
              },
              className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => pt((r) => !r),
                  className: "flex w-full items-center gap-2 text-left",
                  "aria-expanded": Ye,
                  children: [
                    Ye ? e.jsx(le, {
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
                          value: de,
                          onChange: (r) => c(r.target.value),
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
                          checked: Yt === fe,
                          onChange: () => {
                            dt(fe), Jr(fe), te == null ? void 0 : te(fe);
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
                          value: qr,
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
                      children: Zr.map((r) => e.jsxs("label", {
                        className: "flex items-start gap-2 cursor-pointer",
                        children: [
                          e.jsx("input", {
                            type: "radio",
                            name: "footnoteDisplayMode",
                            value: r.value,
                            checked: tr === r.value,
                            onChange: () => {
                              Qr(r.value), it(r.value);
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
                        V("settings-as-animation", !Ae);
                      },
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${Ae ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": Ae,
                      "aria-label": "\uC5F4\uAE30/\uB2EB\uAE30 \uC560\uB2C8\uBA54\uC774\uC158",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Ae ? "translate-x-4" : "translate-x-0.5"}`
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
                        V("settings-as-index", !S.enabled);
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
                        V("settings-as-include-other", !S.includeOtherFiles);
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
                      disabled: ct || !S.enabled || S.building || !S.isolationReady,
                      onClick: () => {
                        (async () => {
                          const r = await R.getRebuildCheckpointInfo();
                          if (r) {
                            Pe(r), Le(true);
                            return;
                          }
                          if (S.hasIndex) {
                            He(true);
                            return;
                          }
                          q(true), R.rebuild({
                            resume: false
                          }).finally(() => q(false));
                        })();
                      },
                      className: "inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60",
                      children: [
                        e.jsx(At, {
                          size: 14
                        }),
                        S.hasCheckpoint ? "\uC0C9\uC778 \uC7AC\uAC1C/\uB2E4\uC2DC \uC2DC\uC791" : S.hasIndex ? "\uB2E4\uC2DC \uC0C9\uC778" : "\uC0C9\uC778"
                      ]
                    }),
                    S.building ? e.jsxs("button", {
                      type: "button",
                      onClick: () => R.cancelRebuild(),
                      className: "inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60",
                      title: "\uC0C9\uC778\uC744 \uC911\uC9C0\uD569\uB2C8\uB2E4. \uCCB4\uD06C\uD3EC\uC778\uD2B8\uB294 \uC720\uC9C0\uB418\uC5B4 \uC774\uC5B4\uC11C \uC7AC\uAC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                      children: [
                        e.jsx(ea, {
                          size: 14
                        }),
                        "\uC911\uC9C0"
                      ]
                    }) : null,
                    e.jsx("button", {
                      type: "button",
                      disabled: ct || S.building || !S.hasIndex,
                      onClick: () => {
                        window.confirm("\uC5ED\uC0C9\uC778 \uCE90\uC2DC(.advanced-search/)\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694? \uC0AD\uC81C \uD6C4\uC5D0\uB294 \u300C\uC0C9\uC778\u300D\uC73C\uB85C \uB2E4\uC2DC \uC0DD\uC131\uD574\uC57C \uD569\uB2C8\uB2E4.") && (q(true), R.clearCache().finally(() => q(false)));
                      },
                      className: "inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:bg-odp-bgSoft dark:text-red-300 dark:hover:bg-red-950/30",
                      children: "\uC5ED\uC0C9\uC778 \uCE90\uC2DC \uC0AD\uC81C"
                    })
                  ]
                }),
                e.jsx(Xt, {
                  isOpen: rr,
                  info: ar,
                  onCancel: () => {
                    Le(false), Pe(null);
                  },
                  onResume: () => {
                    Le(false), Pe(null), q(true), R.rebuild({
                      resume: true
                    }).finally(() => q(false));
                  },
                  onStartFresh: () => {
                    Le(false), Pe(null), q(true), R.rebuild({
                      resume: false
                    }).finally(() => q(false));
                  }
                }),
                e.jsx(ue, {
                  isOpen: sr,
                  title: "\uC5ED\uC0C9\uC778 \uB2E4\uC2DC \uC0DD\uC131",
                  message: "\uAE30\uC874 \uC5ED\uC0C9\uC778\uC744 \uC9C0\uC6B0\uACE0 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uB2E4\uC2DC \uC0C9\uC778\uD560\uAE4C\uC694? \uBC31\uADF8\uB77C\uC6B4\uB4DC\uC5D0\uC11C \uC9C4\uD589\uB429\uB2C8\uB2E4.",
                  confirmLabel: "\uB2E4\uC2DC \uC0DD\uC131",
                  cancelLabel: "\uCDE8\uC18C",
                  onConfirm: () => {
                    He(false), q(true), R.rebuild({
                      resume: false
                    }).finally(() => q(false));
                  },
                  onCancel: () => He(false)
                }),
                e.jsx(Ht, {
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
                            V("settings-alt-vim", !Ee);
                          },
                          className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Ee ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                          "aria-pressed": Ee,
                          "aria-label": "Alt+Vim \uCEE4\uC11C \uC774\uB3D9",
                          children: e.jsx("span", {
                            className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Ee ? "translate-x-4" : "translate-x-0.5"}`
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
                            V("settings-workspace-tabs", !ge);
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
                    e.jsxs("label", {
                      className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group",
                      children: [
                        e.jsx("button", {
                          type: "button",
                          onClick: () => {
                            V("settings-new-file-temp", !Ie);
                          },
                          className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Ie ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                          "aria-pressed": Ie,
                          "aria-label": "\uC0C8 \uD30C\uC77C \uC784\uC2DC(\uBA54\uBAA8\uB9AC) \uC0DD\uC131",
                          children: e.jsx("span", {
                            className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Ie ? "translate-x-4" : "translate-x-0.5"}`
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
                    ge ? e.jsxs("div", {
                      className: "pl-12 space-y-2",
                      children: [
                        e.jsx("p", {
                          className: "text-xs font-medium text-gray-700 dark:text-odp-fg",
                          children: "\uD0ED \uC790\uB3D9 \uC800\uC7A5 \uC124\uC815"
                        }),
                        e.jsx(ve, {
                          className: "flex flex-col gap-2",
                          value: nt,
                          onValueChange: (r) => {
                            r !== "off" && r !== "onFocusChange" && r !== "onWindowChange" || (ra(r), ot(r));
                          },
                          "aria-label": "\uD0ED \uC790\uB3D9 \uC800\uC7A5",
                          children: ta.map((r) => {
                            const h = nt === r.value;
                            return e.jsx(ce, {
                              value: r.value,
                              className: [
                                "rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200 origin-left w-90",
                                "focus-visible:ring-2 focus-visible:ring-blue-500/40",
                                h ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"
                              ].join(" "),
                              children: e.jsxs("div", {
                                className: h ? "" : "opacity-50",
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
                      onClick: g,
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
                typeof I == "function" && e.jsxs("label", {
                  className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4",
                  children: [
                    e.jsx("button", {
                      type: "button",
                      onClick: I,
                      className: `relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${E ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": E,
                      "aria-label": "\uD2B8\uB9AC \uD3F4\uB354 \uACBD\uB85C sticky \uD45C\uC2DC",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${E ? "translate-x-4" : "translate-x-0.5"}`
                      })
                    }),
                    e.jsx("span", {
                      className: "select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong",
                      children: "\uD2B8\uB9AC\uC5D0\uC11C \uC5F4\uB9B0 \uD3F4\uB354 \uACBD\uB85C sticky \uD45C\uC2DC (\uC2A4\uD06C\uB864 \uC2DC \uD604\uC7AC \uACBD\uB85C \uACE0\uC815)"
                    })
                  ]
                }),
                typeof x == "function" && e.jsxs("div", {
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
                                const h = Number(r.target.value);
                                x({
                                  ...p,
                                  value: Number.isFinite(h) && h >= 0 ? h : 0
                                });
                              },
                              className: "w-24 border border-gray-300 dark:border-odp-borderSoft rounded px-2 py-1.5 text-sm bg-white dark:bg-odp-bgSoft text-gray-800 dark:text-odp-fg",
                              "aria-label": "\uD3F4\uB354 \uC790\uB3D9 \uD3BC\uCE68 \uB300\uAE30 \uC2DC\uAC04"
                            })
                          ]
                        }),
                        e.jsx("div", {
                          className: "flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg",
                          children: e.jsxs(ve, {
                            className: "flex items-center gap-3",
                            value: p.unit,
                            onValueChange: (r) => {
                              r !== "s" && r !== "ms" || p.unit !== r && x({
                                unit: r,
                                value: sa(p.value, p.unit, r)
                              });
                            },
                            "aria-label": "\uB300\uAE30 \uC2DC\uAC04 \uB2E8\uC704",
                            children: [
                              e.jsxs("label", {
                                className: "flex items-center gap-1.5 cursor-pointer",
                                children: [
                                  e.jsx(ce, {
                                    value: "s",
                                    className: "size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                                    children: e.jsx(We, {
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
                                  e.jsx(ce, {
                                    value: "ms",
                                    className: "size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
                                    children: e.jsx(We, {
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
                            da(p),
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
                          value: $e,
                          checked: X === $e,
                          onChange: () => {
                            Ce($e), Lt($e);
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
                          value: Fe,
                          checked: X === Fe,
                          onChange: () => {
                            Ce(Fe), Lt(Fe);
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
              children: e.jsx(Ca, {
                value: j,
                onChange: T,
                onSave: z,
                isSaving: D,
                isLoaded: L
              })
            }),
            e.jsx(Ia, {}),
            e.jsx(La, {}),
            e.jsx(Ea, {}),
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
                        V("settings-composer-helper", !Oe);
                      },
                      className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${Oe ? "bg-blue-500 border-blue-500 shadow-sm" : "bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft"} group-hover:brightness-105 group-hover:border-blue-400`,
                      "aria-pressed": Oe,
                      "aria-label": "\uC785\uB825\uCC3D \uB2E8\uCD95\uD0A4 \uC548\uB0B4 \uD45C\uC2DC",
                      children: e.jsx("span", {
                        className: `inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${Oe ? "translate-x-4" : "translate-x-0.5"}`
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
            e.jsx(Pa, {}),
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
                          children: na() || "\uC54C \uC218 \uC5C6\uC74C"
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
                  onClick: () => W == null ? void 0 : W(),
                  disabled: Z || typeof W != "function",
                  className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-60",
                  children: [
                    e.jsx(At, {
                      size: 16
                    }),
                    Z ? "\uCD5C\uC2E0 \uBC84\uC804 \uD655\uC778 \uC911..." : "\uCD5C\uC2E0 \uBC84\uC804 \uD655\uC778 \uBC0F \uC989\uC2DC \uC5C5\uB370\uC774\uD2B8"
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
  xs as default
};
