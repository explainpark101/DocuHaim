const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-md-editor-B8lrupGh.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-markdown-it-BSFfF5B5.js","assets/vendor-codemirror-V7b8BJE-.js","assets/vendor-aws-hJDgVEKM.js","assets/index-BYVoYwQr.js","assets/vendor-lucide-BnjwTb2j.js","assets/bootSplash-Z2krRgC9.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-radix-8kjzYRrX.js","assets/index-BTH_STte.css"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { _ as sn } from "./vendor-aws-hJDgVEKM.js";
import { j as h, f as an, r as a, a as zn, __tla as __tla_0 } from "./vendor-react-BPvvDyqO.js";
import { ensureMdEditorConfig as Wn, __tla as __tla_1 } from "./mdEditorConfig-DtyCSywe.js";
import { c4 as Yn, c5 as cn, e_ as ln, aa as Gn, b2 as un, e$ as Xn, f0 as Un, f1 as Zn, f2 as Qn, f3 as Jn, aO as dn, eS as fn, c3 as er, f4 as tr, f5 as nr, f6 as rr, eZ as or, f7 as ir, f8 as mn, f9 as sr, fa as ar, fb as Dt, fc as cr, fd as lr, F as ur, fe as dr, ff as ze, fg as fr, fh as mr, fi as Nt, fj as It, fk as lt, fl as ut, fm as pr, fn as jt, fo as hr, fp as gr, fq as wr, H as br, fr as yr, fs as Er, ft as vr, T as kr, d1 as xr, fu as Cr, i as Ht, fv as Sr, fw as dt, aY as Rr, fx as Mr, fy as Tr, fz as Ar, fA as Pr, fB as Lr, eP as Ot, fC as Dr, fD as Nr, __tla as __tla_2 } from "./index-BYVoYwQr.js";
import { a as ye, i as Ir, s as jr, b as Hr, c as je, f as _t, m as ft, d as Kt, e as Ft, h as Bt, r as Or, j as Vt, k as be, l as mt, n as pt } from "./previewSelectionSync-CR47qWxc.js";
import { h as _r, K as Kr, __tla as __tla_3 } from "./vendor-md-editor-B8lrupGh.js";
import { S as Fr, aR as Br, aX as Vr, aY as $r, aZ as qr, ae as zr, a_ as Wr, Z as Yr, X as Gr, j as Xr, L as Ur } from "./vendor-lucide-BnjwTb2j.js";
import { v as Zr, w as Qr, x as Jr, y as eo, z as to, A as no, S as ro, t as oo } from "./vendor-radix-8kjzYRrX.js";
import { E as io, s as so, u as ao, t as co, g as lo, C as uo, I as fo, a as mo, W as po, H as ho, b as go, c as wo, h as bo, d as yo, i as Eo, e as vo, f as ko, M as xo, j as Co, k as So, l as Ro, m as Mo, n as To } from "./cmMarkdownFormatKeymap-DxmeolUE.js";
import { M as Ao } from "./MdEditorToolbarTooltips-DJ_Zamuo.js";
import { u as Po, a as Lo, b as Do, P as No } from "./previewFootnoteScroll-DS07eyDb.js";
import { u as Io, M as jo } from "./useLazyMermaidRender-BEGREvhj.js";
import { o as pn, V as Ho, X as ht, Y as $t, u as Oo, r as _o, P as Ko, k as hn, Z as Fo, _ as Bo, $ as Vo, a0 as $o, b as qo, j as zo, E as qt, a1 as Wo, a2 as Yo, a3 as Go, a4 as Xo, a5 as Uo, a6 as Zo, a7 as Qo, a8 as Jo, a9 as ei, aa as ti, ab as ni, ac as ri, ad as oi, ae as ii, af as si, ag as ai, ah as ci } from "./vendor-codemirror-V7b8BJE-.js";
import { e as li } from "./appMarkdownItPlugins-m-T7S_wy.js";
import { T as ui, P as di, H as fi } from "./TableEditModal-B8D6lQpV.js";
import { a as mi } from "./vendor-motion-Bv-XITR_.js";
import { W as pi, __tla as __tla_4 } from "./WikiImageSizeModal-D7MjzOqH.js";
import { u as hi } from "./useWikiImageHydration-BrPEAfu4.js";
import { a as He, c as gi, b as wi, d as bi, e as gt, i as wt, f as zt, g as yi } from "./previewMirrorEdit-Oxnil1qn.js";
import { h as Ei, j as vi, k as ki } from "./mdEditorSelectionWrap-DR6lJ0QV.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./wikiImageResolver-BX0McZ8Q.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./emojiShortcode-CZFZfFoz.js";
import "./vendor-tiptap-DxyadcB3.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./styleResolve-FWe9FNWf.js";
import "./mermaidTheme-Deyx0OD8.js";
import { __tla as __tla_5 } from "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./index-flVIUjar.js";
import "./haimCodeTabSettings-BI7a8VYQ.js";
import "./codeBlockCommentTogglePlan-3lyEpRvG.js";
import { __tla as __tla_6 } from "./lazyMermaid-BcnyKPEC.js";
import "./TableStyleTemplateEditor-CLiesccL.js";
import "./vendor-image-crop-ROMAbiiY.js";
import "./cropPadImage-DJj-DEqh.js";
let Ea;
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
  })(),
  (() => {
    try {
      return __tla_4;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_5;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_6;
    } catch {
    }
  })()
]).then(async () => {
  const Wt = ".md-editor-catalog-link", xi = "md-preview-heading-folded", Yt = "md-preview-heading-section-hidden", Ci = 2;
  function Si(e, r) {
    const u = e.getBoundingClientRect(), c = r.getBoundingClientRect();
    return u.top - c.top + r.scrollTop;
  }
  function Ri(e) {
    for (let r = 0; r < 8; r += 1) {
      const u = getComputedStyle(e);
      if (!(e.classList.contains(Yt) || e.hasAttribute("hidden") || u.display === "none")) break;
      let d = false, o = e;
      for (; o && !d; ) {
        if (o instanceof HTMLElement && (o.classList.contains(Yt) || o.hasAttribute("hidden"))) {
          let p = o.previousElementSibling;
          for (; p; ) {
            if (p instanceof HTMLElement && p.classList.contains(xi)) {
              const b = p.querySelector(":scope > .md-preview-heading-fold-chevron");
              b instanceof HTMLButtonElement && (b.click(), d = true);
              break;
            }
            p = p.previousElementSibling;
          }
        }
        o = o.parentElement;
      }
      if (!d) break;
    }
  }
  function Mi(e, r) {
    const u = (c) => {
      var _a;
      if (c.button !== 0) return;
      const d = c.target;
      if (!(d instanceof Element)) return;
      const o = d.closest(Wt);
      if (!(o instanceof HTMLElement) || !e.contains(o)) return;
      const p = Array.from(e.querySelectorAll(Wt)).indexOf(o);
      if (p < 0) return;
      const b = r.mdHeadingId({
        index: p + 1
      }), O = r.getEditorRoot(), k = ((_a = O == null ? void 0 : O.querySelector) == null ? void 0 : _a.call(O, `#${CSS.escape(b)}`)) ?? null;
      if (!k || O && !O.contains(k)) return;
      c.preventDefault(), c.stopPropagation(), typeof c.stopImmediatePropagation == "function" && c.stopImmediatePropagation(), Ri(k);
      const N = ye(k);
      if (!N) {
        k.scrollIntoView({
          block: "start",
          behavior: "smooth"
        });
        return;
      }
      const M = k.previousElementSibling ? 0 : Number.parseFloat(getComputedStyle(k).marginBlockStart || "0") || 0, A = Si(k, N) - Ci - M;
      N.scrollTo({
        top: Math.max(0, A),
        behavior: "smooth"
      });
    };
    return e.addEventListener("click", u, true), () => {
      e.removeEventListener("click", u, true);
    };
  }
  function Ti({ onToggle: e }) {
    var _a;
    const u = !!((_a = Yn()) == null ? void 0 : _a.open), c = u ? "AI \uB3C4\uC6B0\uBBF8 \uB2EB\uAE30" : "AI \uB3C4\uC6B0\uBBF8";
    return h.jsx(Zr, {
      delayDuration: 250,
      skipDelayDuration: 0,
      children: h.jsxs(Qr, {
        children: [
          h.jsx(Jr, {
            asChild: true,
            children: h.jsx("button", {
              type: "button",
              className: [
                "md-editor-toolbar-item",
                u ? "md-editor-toolbar-active bg-violet-200! hover:bg-violet-300! dark:bg-violet-800/85! dark:hover:bg-violet-700/90!" : ""
              ].filter(Boolean).join(" "),
              onClick: () => e == null ? void 0 : e(),
              "aria-label": c,
              "aria-pressed": u,
              children: h.jsx(Fr, {
                className: "md-editor-icon",
                size: 16
              })
            })
          }),
          h.jsx(eo, {
            children: h.jsxs(to, {
              side: "bottom",
              sideOffset: 6,
              className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50",
              children: [
                c,
                h.jsx(no, {
                  className: "fill-white dark:fill-odp-surface"
                })
              ]
            })
          })
        ]
      })
    });
  }
  function Ai({ onOpen: e }) {
    return h.jsx("button", {
      type: "button",
      className: "md-editor-toolbar-item",
      onClick: () => {
        e == null ? void 0 : e();
      },
      title: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960",
      "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960",
      children: h.jsx(Br, {
        className: "md-editor-icon",
        size: 16
      })
    });
  }
  function Pi({ value: e = "", theme: r = "light", currentFile: u = null, disabled: c }) {
    const d = an(), o = cn(), y = a.useCallback((p) => {
      c || ln({
        currentFile: u,
        editorContent: e,
        theme: r,
        navigate: d,
        paginationMode: p,
        openInFocusedPane: (b) => {
          var _a;
          return !!((o == null ? void 0 : o.workspaceTabsEnabled) && ((_a = o.openExportPdfInFocusedPane) == null ? void 0 : _a.call(o, b)));
        }
      });
    }, [
      d,
      e,
      r,
      c,
      u,
      o
    ]);
    return h.jsx(io, {
      variant: "md-toolbar",
      disabled: !!c,
      onOpen: y
    });
  }
  function Li({ editorRef: e }) {
    const r = a.useCallback(() => {
      var _a, _b, _c, _d;
      const u = ((_a = e.current) == null ? void 0 : _a.value) ?? e.current;
      if (!u) return;
      const c = `

<pgbr/>

`;
      if (typeof u.insert == "function") {
        u.insert(() => ({
          targetValue: c,
          select: false,
          deviationStart: 0,
          deviationEnd: 0
        })), (_b = u.focus) == null ? void 0 : _b.call(u);
        return;
      }
      const d = (_c = u.getEditorView) == null ? void 0 : _c.call(u);
      d && (d.dispatch(d.state.replaceSelection(c)), (_d = d.focus) == null ? void 0 : _d.call(d));
    }, [
      e
    ]);
    return h.jsx("button", {
      type: "button",
      className: "md-editor-toolbar-item",
      onClick: r,
      title: "Insert print page break (<pgbr/>)",
      "aria-label": "Insert print page break",
      children: h.jsx(Vr, {
        className: "md-editor-icon",
        size: 16
      })
    });
  }
  function Di({ onOpen: e }) {
    return h.jsx("button", {
      type: "button",
      className: "md-editor-toolbar-item",
      title: "\uCD5C\uB300 heading \uBCC0\uACBD",
      "aria-label": "\uCD5C\uB300 heading \uBCC0\uACBD",
      onClick: () => e(),
      children: h.jsx($r, {
        className: "md-editor-icon",
        size: 16
      })
    });
  }
  function vt({ checked: e = false, onChange: r, theme: u = "light", title: c, ariaLabel: d, icon: o }) {
    const y = u === "dark", p = d || c;
    return h.jsx("span", {
      className: "md-editor-toolbar-item inline-flex items-center !w-auto !min-w-0 px-1",
      title: c,
      children: h.jsxs("label", {
        className: "inline-flex shrink-0 cursor-pointer select-none items-center gap-1",
        onMouseDown: (b) => {
          b.preventDefault();
        },
        children: [
          h.jsx(o, {
            className: `md-editor-icon shrink-0 ${y ? "text-odp-muted" : "text-gray-500"}`,
            size: 16,
            "aria-hidden": true
          }),
          h.jsx(ro, {
            checked: e,
            onCheckedChange: (b) => r == null ? void 0 : r(!!b),
            "aria-label": p,
            className: [
              "relative h-4 w-7 rounded-full border-0 outline-none transition-colors",
              "focus-visible:ring-2 focus-visible:ring-blue-400",
              e ? "bg-blue-600 dark:bg-blue-500" : y ? "bg-odp-borderStrong" : "bg-gray-300"
            ].join(" "),
            children: h.jsx(oo, {
              className: [
                "block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform",
                "data-[state=checked]:translate-x-3.5"
              ].join(" ")
            })
          })
        ]
      })
    });
  }
  function Ni({ checked: e = false, onChange: r, theme: u = "light" }) {
    return h.jsx(vt, {
      checked: e,
      onChange: r,
      theme: u,
      icon: qr,
      title: e ? "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8 \uCF1C\uC9D0" : "\uBAA9\uCC28 \uC81C\uBAA9 \uB9D0\uC904\uC784(...)",
      ariaLabel: "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8"
    });
  }
  function Ii({ checked: e = true, onChange: r, theme: u = "light" }) {
    return h.jsx(vt, {
      checked: e,
      onChange: r,
      theme: u,
      icon: zr,
      title: e ? "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uCF1C\uC9D0" : "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uAEBC\uC9D0",
      ariaLabel: "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C"
    });
  }
  function ji({ checked: e = false, onChange: r, theme: u = "light" }) {
    return h.jsx(vt, {
      checked: e,
      onChange: r,
      theme: u,
      icon: Wr,
      title: e ? "Mirror Edit on \u2014 dual caret + instant preview sync" : "Mirror Edit off",
      ariaLabel: "Mirror Edit"
    });
  }
  function Hi({ onRequestLink: e, onRequestUpload: r, onRequestClip: u, onRequestWhiteboard: c, disabled: d = false }) {
    const [o, y] = a.useState(false), p = a.useRef(null), b = a.useRef(null), O = a.useCallback(() => y(false), []);
    return h.jsxs(h.Fragment, {
      children: [
        h.jsx(_r, {
          title: "\uC774\uBBF8\uC9C0",
          visible: o,
          onChange: y,
          disabled: d,
          overlay: h.jsxs("ul", {
            className: "md-editor-menu",
            role: "menu",
            onClick: O,
            children: [
              h.jsx("li", {
                className: "md-editor-menu-item md-editor-menu-item-image",
                role: "menuitem",
                tabIndex: 0,
                onClick: () => e(),
                onKeyDown: (k) => {
                  (k.key === "Enter" || k.key === " ") && (k.preventDefault(), e());
                },
                children: "\uB9C1\uD06C \uCD94\uAC00"
              }),
              h.jsx("li", {
                className: "md-editor-menu-item md-editor-menu-item-image",
                role: "menuitem",
                tabIndex: 0,
                onClick: () => {
                  var _a;
                  return (_a = p.current) == null ? void 0 : _a.click();
                },
                onKeyDown: (k) => {
                  var _a;
                  (k.key === "Enter" || k.key === " ") && (k.preventDefault(), (_a = p.current) == null ? void 0 : _a.click());
                },
                children: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC"
              }),
              h.jsx("li", {
                className: "md-editor-menu-item md-editor-menu-item-image",
                role: "menuitem",
                tabIndex: 0,
                onClick: () => {
                  var _a;
                  return (_a = b.current) == null ? void 0 : _a.click();
                },
                onKeyDown: (k) => {
                  var _a;
                  (k.key === "Enter" || k.key === " ") && (k.preventDefault(), (_a = b.current) == null ? void 0 : _a.click());
                },
                children: "\uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC"
              }),
              typeof c == "function" ? h.jsx("li", {
                className: "md-editor-menu-item md-editor-menu-item-image",
                role: "menuitem",
                tabIndex: 0,
                onClick: () => c(),
                onKeyDown: (k) => {
                  (k.key === "Enter" || k.key === " ") && (k.preventDefault(), c());
                },
                children: "\uD654\uC774\uD2B8\uBCF4\uB4DC"
              }) : null
            ]
          }),
          children: h.jsx(Yr, {
            className: "md-editor-icon",
            size: 16,
            "aria-hidden": true
          })
        }),
        h.jsx("input", {
          ref: p,
          type: "file",
          accept: "image/*",
          multiple: true,
          className: "hidden",
          tabIndex: -1,
          "aria-hidden": true,
          onChange: (k) => {
            const N = Array.from(k.target.files || []);
            k.target.value = "", N.length && r(N);
          }
        }),
        h.jsx("input", {
          ref: b,
          type: "file",
          accept: "image/*",
          className: "hidden",
          tabIndex: -1,
          "aria-hidden": true,
          onChange: (k) => {
            var _a;
            const N = (_a = k.target.files) == null ? void 0 : _a[0];
            k.target.value = "", N && u(N);
          }
        })
      ]
    });
  }
  function Oi({ isOpen: e, onClose: r, onConfirm: u }) {
    const [c, d] = a.useState(""), [o, y] = a.useState(""), [p, b] = a.useState(""), O = a.useRef(null);
    a.useEffect(() => {
      if (!e) return;
      d(""), y(""), b("");
      const M = window.setTimeout(() => {
        var _a;
        return (_a = O.current) == null ? void 0 : _a.focus();
      }, 40);
      return () => window.clearTimeout(M);
    }, [
      e
    ]);
    const k = () => {
      const M = c.trim(), A = o.trim();
      if (!M && !A) {
        b("\uAC01\uC8FC \uC81C\uBAA9 \uB610\uB294 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
        return;
      }
      u({
        line1: M,
        line2: A
      }), r();
    }, N = (M) => {
      M.key === "Enter" && (!(M.metaKey || M.ctrlKey) || M.altKey || M.shiftKey || M.nativeEvent.isComposing || M.keyCode === 229 || (M.preventDefault(), M.stopPropagation(), k()));
    };
    return h.jsx(Gn, {
      isOpen: e,
      onClose: r,
      ignoreEnterInFields: true,
      children: h.jsxs("div", {
        className: "flex flex-col gap-4 p-6",
        children: [
          h.jsx("h2", {
            className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong",
            children: "\uAC01\uC8FC \uC0BD\uC785"
          }),
          h.jsxs("p", {
            className: "text-xs leading-5 text-gray-500 dark:text-odp-muted",
            children: [
              "\uCCAB \uC904\uC740 \uC81C\uBAA9, \uB458\uC9F8 \uC904\uC740 URL\uC785\uB2C8\uB2E4. \uBCF8\uBB38 \uCEE4\uC11C\uC5D0",
              " ",
              h.jsx("code", {
                className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft",
                children: "[^N]"
              }),
              "\uC774 \uB4E4\uC5B4\uAC00\uACE0, \uBB38\uC11C \uD558\uB2E8 Sources\uC5D0 \uB450 \uC904\uC774 \uCD94\uAC00\uB429\uB2C8\uB2E4. Ctrl+Enter \uB610\uB294 \u2318+Enter\uB85C \uC0BD\uC785\uD569\uB2C8\uB2E4."
            ]
          }),
          h.jsxs("label", {
            className: "block",
            children: [
              h.jsx("span", {
                className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong",
                children: "\uC81C\uBAA9 (1\uC904)"
              }),
              h.jsx("input", {
                ref: O,
                type: "text",
                value: c,
                onChange: (M) => {
                  d(M.target.value), p && b("");
                },
                onKeyDown: N,
                placeholder: "\uC608: docs.docker.com - Compose services",
                className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
              })
            ]
          }),
          h.jsxs("label", {
            className: "block",
            children: [
              h.jsx("span", {
                className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong",
                children: "URL (2\uC904)"
              }),
              h.jsx("input", {
                type: "text",
                value: o,
                onChange: (M) => {
                  y(M.target.value), p && b("");
                },
                onKeyDown: N,
                placeholder: "https://\u2026",
                className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
              })
            ]
          }),
          p ? h.jsx("p", {
            className: "text-xs text-red-600 dark:text-red-300",
            children: p
          }) : null,
          h.jsxs("div", {
            className: "flex justify-end gap-2",
            children: [
              h.jsxs("button", {
                type: "button",
                onClick: r,
                className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg",
                children: [
                  h.jsx(Gr, {
                    size: 16
                  }),
                  "\uCDE8\uC18C"
                ]
              }),
              h.jsxs("button", {
                type: "button",
                onClick: k,
                className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700",
                children: [
                  h.jsx(Xr, {
                    size: 16
                  }),
                  "\uC0BD\uC785"
                ]
              })
            ]
          })
        ]
      })
    });
  }
  function _i() {
    const [e, r] = a.useState(un);
    a.useEffect(() => Xn((c) => {
      r(c);
    }), []);
    const u = a.useCallback((c) => {
      r((d) => {
        const o = typeof c == "function" ? c(d) : !!c;
        return Un(o), o;
      });
    }, []);
    return [
      e,
      u
    ];
  }
  function Ki() {
    const [e, r] = a.useState(Zn);
    a.useEffect(() => Qn((c) => {
      r(c);
    }), []);
    const u = a.useCallback((c) => {
      r((d) => {
        const o = typeof c == "function" ? c(d) : !!c;
        return Jn(o), o;
      });
    }, []);
    return [
      e,
      u
    ];
  }
  const Fi = `<br/>
`;
  function Bi(e) {
    if (!Ir() || !(e == null ? void 0 : e.state)) return false;
    const r = e.state.selection.main, u = Fi;
    return e.dispatch({
      changes: {
        from: r.from,
        to: r.to,
        insert: u
      },
      selection: pn.cursor(r.from + u.length),
      scrollIntoView: true
    }), true;
  }
  const Vi = "h1, h2, h3, h4, h5, h6", gn = "md-preview-heading-fold-chevron", Gt = "md-preview-heading-foldable", We = "md-preview-heading-folded", $i = "md-preview-heading-section-hidden", Ue = "data-md-preview-heading-fold";
  function qi(e) {
    if (!e) return false;
    const r = e.tagName;
    return r === "H1" || r === "H2" || r === "H3" || r === "H4" || r === "H5" || r === "H6";
  }
  function Xt(e) {
    const r = e.getAttribute("data-heading-level");
    if (r) {
      const c = Number(r);
      if (Number.isFinite(c) && c >= 1) return c;
    }
    const u = Number(e.tagName.slice(1));
    return Number.isFinite(u) && u >= 1 ? u : 6;
  }
  function zi(e, r) {
    return e.id || `md-preview-heading-${r}`;
  }
  function wn(e) {
    const r = Xt(e), u = [];
    let c = e.nextElementSibling;
    for (; c && !(qi(c) && Xt(c) <= r || c.hasAttribute("data-note-cover-placeholder")); ) c instanceof HTMLElement && u.push(c), c = c.nextElementSibling;
    return u;
  }
  function Wi(e) {
    return !!e.closest("[data-note-cover-placeholder], [data-note-cover-preview]");
  }
  function bn(e) {
    return Array.from(e.querySelectorAll(Vi)).filter((r) => !(!(r instanceof HTMLElement) || Wi(r)));
  }
  function Yi(e) {
    if (!e || typeof e.querySelectorAll != "function") return false;
    const r = bn(e);
    for (const u of r) if (u.getAttribute(Ue) !== "1" && wn(u).length > 0) return true;
    return false;
  }
  function Gi(e) {
    const r = document.createElement("button");
    r.type = "button", r.className = `${gn} cursor-pointer`, r.setAttribute("aria-label", e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), r.title = e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30", r.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
    const u = r.querySelector("svg");
    return u && (u.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", u.style.transformOrigin = "50% 50%"), r;
  }
  function Xi(e, r) {
    const u = e.querySelector("svg");
    u instanceof SVGElement && (mi(u, {
      transform: r ? "rotate(0deg)" : "rotate(-90deg)"
    }, {
      duration: 0.18,
      ease: "easeInOut"
    }), e.setAttribute("aria-label", r ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), e.title = r ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30");
  }
  function bt(e, r) {
    for (const u of e) u.classList.toggle($i, r), r ? u.setAttribute("hidden", "") : u.removeAttribute("hidden");
  }
  function Ui(e, r = {}) {
    if (!e || typeof e.querySelectorAll != "function") return () => {
    };
    const u = new Set(Array.from(r.collapsedIds ?? []).filter((o) => typeof o == "string" && o)), c = [];
    return bn(e).forEach((o, y) => {
      var _a;
      if (o.getAttribute(Ue) === "1") return;
      const p = wn(o);
      if (p.length === 0) return;
      const b = zi(o, y);
      o.id || (o.id = b), o.setAttribute(Ue, "1"), o.classList.add(Gt), (_a = o.querySelector(`:scope > .${gn}`)) == null ? void 0 : _a.remove();
      const k = !u.has(b), N = Gi(k);
      o.insertBefore(N, o.firstChild);
      const M = (D) => {
        o.classList.toggle(We, D), bt(p, D), Xi(N, !D);
      };
      k || (o.classList.add(We), bt(p, true));
      const A = (D) => {
        var _a2;
        D.preventDefault(), D.stopPropagation();
        const W = !o.classList.contains(We);
        M(W), W ? u.add(b) : u.delete(b), (_a2 = r.onCollapsedChange) == null ? void 0 : _a2.call(r, Array.from(u));
      };
      N.addEventListener("click", A), c.push(() => {
        N.removeEventListener("click", A), N.remove(), o.classList.remove(Gt, We), o.removeAttribute(Ue), bt(p, false);
      });
    }), () => {
      for (const o of c) o();
    };
  }
  const yn = new dn("s3haim-preview-heading-fold");
  yn.version(1).stores({
    folds: "key, updatedAt"
  });
  const En = yn.folds;
  function Zi(e, r) {
    return `heading-fold:${fn(e, r)}`;
  }
  function Qi(e) {
    return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Zi(e.type, e.id);
  }
  async function Ji(e) {
    if (!e) return null;
    const r = await En.get(e);
    return !r || !Array.isArray(r.collapsedIds) ? null : r.collapsedIds.filter((u) => typeof u == "string" && u.length > 0);
  }
  async function es(e, r) {
    e && await En.put({
      key: e,
      collapsedIds: Array.from(new Set(r.filter(Boolean))),
      updatedAt: Date.now()
    });
  }
  const Ze = /* @__PURE__ */ new Set();
  function ts(e) {
    return Ze.add(e), () => {
      Ze.delete(e);
    };
  }
  function ns(e) {
    if (!(!e.selectionSet && !e.docChanged) && !(e.view.composing || e.view.compositionStarted) && Ze.size !== 0) for (const r of Ze) try {
      r(e.view, e);
    } catch {
    }
  }
  function rs() {
    return Ho.fromClass(class {
      constructor() {
        __publicField(this, "raf", 0);
      }
      update(e) {
        e.docChanged && (e.view.composing || e.view.compositionStarted || (this.raf && cancelAnimationFrame(this.raf), this.raf = requestAnimationFrame(() => {
          this.raf = 0, os(e.view);
        })));
      }
      destroy() {
        this.raf && cancelAnimationFrame(this.raf);
      }
    });
  }
  function os(e) {
    const r = e.contentDOM;
    r && r.offsetHeight;
  }
  const is = [
    0,
    16,
    48,
    100,
    180,
    320
  ];
  function ss(e) {
    let r = [], u = null, c = null, d = false, o = false;
    function y() {
      for (const A of r) clearTimeout(A);
      r = [];
    }
    function p() {
      if (o) return false;
      const A = e.getPreviewRoot(), D = e.getView();
      return !A || !D || He(A) ? false : jr(D, A, {
        allowCollapsed: true
      });
    }
    function b() {
      d || o || (d = true, requestAnimationFrame(() => {
        d = false, p();
      }));
    }
    function O(A) {
      u && c === A || (u == null ? void 0 : u.disconnect(), c = A, u = new MutationObserver((D) => {
        D.some((X) => {
          const Q = [
            ...X.addedNodes,
            ...X.removedNodes
          ];
          return Q.length === 0 ? X.type === "characterData" || X.type === "attributes" : Q.some((te) => {
            var _a, _b;
            return te instanceof Element ? !(te.hasAttribute("data-preview-caret-mirror") || te.hasAttribute("data-preview-sel-mirror") || ((_a = te.classList) == null ? void 0 : _a.contains("s3haim-preview-caret-mirror")) || ((_b = te.classList) == null ? void 0 : _b.contains("s3haim-preview-sel-mirror"))) : true;
          });
        }) && b();
      }), u.observe(A, {
        childList: true,
        subtree: true,
        characterData: true
      }));
    }
    function k(A) {
      if (o) return;
      const D = e.getPreviewRoot();
      if (D && O(D), p(), !!(A == null ? void 0 : A.withRetries)) {
        y();
        for (const W of is) r.push(setTimeout(() => {
          if (o) return;
          const X = e.getPreviewRoot();
          X && O(X), p();
        }, W));
      }
    }
    function N() {
      o = true, y(), u == null ? void 0 : u.disconnect(), u = null, c = null, d = false;
    }
    const M = e.getPreviewRoot();
    return M && O(M), k({
      withRetries: true
    }), {
      schedule: k,
      stop: N
    };
  }
  const Ut = [
    0,
    16,
    48,
    120,
    280
  ], as = 50, cs = 40, Zt = 32, ls = 32;
  function Qt(e) {
    return !!(e == null ? void 0 : e.isConnected);
  }
  function Et(e, r) {
    const u = e.getBoundingClientRect(), c = r.getBoundingClientRect();
    return u.top - c.top + r.scrollTop;
  }
  function Jt(e, r) {
    const u = Math.max(0, r);
    Math.abs(e.scrollTop - u) < 0.5 || (e.scrollTop = u, Math.abs(e.scrollTop - u) > 1 && e.scrollTo(0, u));
  }
  function vn(e) {
    const r = [];
    for (const c of e.querySelectorAll("[data-line]")) c instanceof HTMLElement && r.push(c);
    const u = r.filter((c) => {
      let d = c.parentElement;
      for (; d && d !== e; ) {
        if (d.hasAttribute("data-line")) return false;
        d = d.parentElement;
      }
      return true;
    });
    return u.length > 0 ? u : r;
  }
  function us(e, r) {
    let u = null, c = -1;
    for (const d of vn(e)) {
      const o = Number(d.getAttribute("data-line"));
      Number.isFinite(o) && o <= r && o >= c && (u = d, c = o);
    }
    return u;
  }
  function ds(e, r, u) {
    let c = null, d = -1, o = -1 / 0;
    for (const y of vn(e)) {
      const p = Number(y.getAttribute("data-line"));
      if (!Number.isFinite(p)) continue;
      const b = Et(y, r);
      b <= u && b >= o && (c = y, d = p, o = b);
    }
    return !c || d < 0 ? null : {
      el: c,
      line0: d
    };
  }
  function fs(e, r) {
    var _a;
    const u = (_a = e == null ? void 0 : e.dom) == null ? void 0 : _a.closest(".md-editor");
    if (u instanceof HTMLElement) return u;
    const c = r == null ? void 0 : r.closest(".md-editor");
    return c instanceof HTMLElement ? c : null;
  }
  function ms(e) {
    let r = false, u = [], c = null, d = 0, o = null, y = 0, p = 0, b = null, O = null, k = null, N = null, M = null, A = "none", D = false;
    function W() {
      for (const R of u) clearTimeout(R);
      u = [];
    }
    function X() {
      c != null && (clearTimeout(c), c = null), d = 0;
    }
    function Q() {
      o != null && (clearTimeout(o), o = null);
    }
    function te() {
      y && cancelAnimationFrame(y), p && cancelAnimationFrame(p), y = 0, p = 0;
    }
    function L(R) {
      Q(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          o = setTimeout(() => {
            o = null, A === R && (A = "none");
          }, ls);
        });
      });
    }
    function ue(R) {
      return R.scrollDOM;
    }
    function oe(R) {
      return Qt(N) ? N : Qt(O) ? O : ye(R);
    }
    function ie(R) {
      if (!(R instanceof Node)) return null;
      const x = e.getView(), I = e.getPreviewRoot();
      if (x && (R === x.scrollDOM || x.dom.contains(R))) return "editor";
      if (I) {
        const F = I.closest(".md-editor-preview-wrapper") ?? I;
        if (R === F || F.contains(R)) return "preview";
      }
      return null;
    }
    function Z(R, x) {
      if (R !== "preview" || !(x instanceof HTMLElement)) return;
      const I = e.getPreviewRoot();
      if (!I) return;
      const F = ye(I);
      F && (x === F || x.contains(F)) && (N = x);
    }
    function Ee(R, x) {
      if (!(x instanceof HTMLElement)) return false;
      if (R === "editor") {
        const ae = e.getView();
        return !!(ae && (x === ae.scrollDOM || x.contains(ae.scrollDOM)));
      }
      const I = e.getPreviewRoot(), F = I ? ye(I) : null;
      return !!(F && (x === F || x.contains(F)));
    }
    function se() {
      if (D) return false;
      const R = e.getPreviewRoot(), x = e.getView();
      if (!R || !x || A === "preview" || A !== "none" && A !== "follow") return false;
      A = "follow";
      const I = Hr(x, R);
      return L("follow"), I;
    }
    function he() {
      r || D || (r = true, requestAnimationFrame(() => {
        r = false, se();
      }));
    }
    function C() {
      const R = e.getPreviewRoot(), x = e.getView();
      if (!R || !x) return;
      const I = ue(x), F = oe(R);
      if (!F) return;
      const ae = I.scrollTop, fe = x.lineBlockAtHeight(ae), ke = x.state.doc.lineAt(fe.from).number - 1, me = us(R, ke);
      if (!me) return;
      const B = fe.height > 0 ? Math.max(0, Math.min(1, (ae - fe.top) / fe.height)) : 0, Re = Et(me, F) + me.offsetHeight * B - Zt;
      Jt(F, Re);
    }
    function E() {
      const R = e.getPreviewRoot(), x = e.getView();
      if (!R || !x) return;
      const I = ue(x), F = oe(R);
      if (!F) return;
      const ae = F.scrollTop + Zt, fe = ds(R, F, ae);
      if (!fe) return;
      const { el: ke, line0: me } = fe, B = Math.min(Math.max(1, me + 1), x.state.doc.lines), Pe = x.state.doc.line(B), Re = x.lineBlockAt(Pe.from), Qe = Et(ke, F), Je = ke.offsetHeight > 0 ? Math.max(0, Math.min(1, (ae - Qe) / ke.offsetHeight)) : 0;
      Jt(I, Re.top + Re.height * Je);
    }
    function P() {
      if (!D && !(A === "preview" || A === "follow")) {
        A = "editor";
        try {
          C();
        } finally {
          L("editor");
        }
      }
    }
    function U() {
      if (!D && !(A === "editor" || A === "follow")) {
        A = "preview";
        try {
          E();
        } finally {
          L("preview");
        }
      }
    }
    function Y() {
      D || A === "preview" || A === "follow" || y || (y = requestAnimationFrame(() => {
        y = 0, P();
      }));
    }
    function q() {
      D || A === "editor" || A === "follow" || p || (p = requestAnimationFrame(() => {
        p = 0, U();
      }));
    }
    function _(R) {
      const x = ie(R.target);
      !x || !Ee(x, R.target) || (Z(x, R.target), x === "editor" ? Y() : q());
    }
    function J(R) {
      const x = ie(R.target);
      x && requestAnimationFrame(() => {
        const I = e.getView(), F = e.getPreviewRoot();
        x === "editor" && I ? Y() : x === "preview" && F && (Z("preview", ye(F)), q());
      });
    }
    function G(R) {
      const x = R.target;
      if (x instanceof HTMLImageElement && (M == null ? void 0 : M.contains(x))) {
        he(), W();
        for (const I of Ut) u.push(setTimeout(() => se(), I));
      }
    }
    function ve(R) {
      const x = R.scrollDOM;
      return x instanceof HTMLElement ? (b === x || (b && b.removeEventListener("scroll", _), b = x, x.addEventListener("scroll", _, {
        passive: true
      })), true) : false;
    }
    function _e(R) {
      const x = ye(R);
      return x ? (O === x || (O && O.removeEventListener("scroll", _), O = x, N = x, x.addEventListener("scroll", _, {
        passive: true
      })), true) : false;
    }
    function Me(R, x) {
      const I = fs(R, x);
      return I ? (k === I || (k && (k.removeEventListener("scroll", _, true), k.removeEventListener("wheel", J, true), k.removeEventListener("touchmove", J, true)), k = I, I.addEventListener("scroll", _, {
        capture: true,
        passive: true
      }), I.addEventListener("wheel", J, {
        capture: true,
        passive: true
      }), I.addEventListener("touchmove", J, {
        capture: true,
        passive: true
      })), true) : false;
    }
    function Te(R) {
      M !== R && (M && (M.removeEventListener("load", G, true), M.removeEventListener("error", G, true)), M = R, R.addEventListener("load", G, true), R.addEventListener("error", G, true));
    }
    function H() {
      D || c != null || d >= cs || (c = setTimeout(() => {
        if (c = null, d += 1, D) return;
        ee() || H();
      }, as));
    }
    function ee() {
      if (D) return false;
      const R = e.getView(), x = e.getPreviewRoot();
      let I = true;
      return R && ve(R) || (I = false), x ? (_e(x) || (I = false), Te(x)) : I = false, Me(R, x) || (I = false), I;
    }
    function Se(R) {
      if (!D && (ee() || H(), se(), !!(R == null ? void 0 : R.withRetries))) {
        W();
        for (const x of Ut) u.push(setTimeout(() => {
          D || (ee() || H(), se());
        }, x));
      }
    }
    function Ae() {
      D = true, W(), X(), Q(), te(), b && (b.removeEventListener("scroll", _), b = null), O && (O.removeEventListener("scroll", _), O = null), k && (k.removeEventListener("scroll", _, true), k.removeEventListener("wheel", J, true), k.removeEventListener("touchmove", J, true), k = null), M && (M.removeEventListener("load", G, true), M.removeEventListener("error", G, true), M = null), N = null, r = false, A = "none";
    }
    return X(), ee() || H(), Se({
      withRetries: true
    }), {
      schedule: Se,
      stop: Ae
    };
  }
  const Oe = new dn("s3haim-editor-undo-history");
  Oe.version(1).stores({
    histories: "key, updatedAt"
  });
  const en = 100, kn = 10080 * 60 * 1e3, ps = 500;
  function hs(e, r) {
    return fn(e, r);
  }
  function gs(e) {
    return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" ? null : hs(e.type, e.id);
  }
  async function ws(e) {
    if (!e) return null;
    const r = await Oe.histories.get(e);
    return r ? typeof r.updatedAt == "number" && Date.now() - r.updatedAt > kn ? (await Oe.histories.delete(e), null) : !Array.isArray(r.stack) || r.stack.length === 0 ? null : r : null;
  }
  function kt(e) {
    return Array.isArray(e) ? e.length <= en ? e : e.slice(e.length - en) : [
      ""
    ];
  }
  async function tn({ key: e, stack: r, index: u }) {
    if (!e) return;
    const c = kt(r), d = Math.max(0, Math.min(u ?? c.length - 1, c.length - 1));
    await Oe.histories.put({
      key: e,
      stack: c,
      index: d,
      updatedAt: Date.now()
    });
  }
  async function bs() {
    const e = Date.now() - kn;
    await Oe.histories.where("updatedAt").below(e).delete();
  }
  function Ye(e, r, u) {
    const c = Array.isArray(e) && e.length > 0 ? [
      ...e
    ] : [
      ""
    ];
    let d = Math.max(0, Math.min(r, c.length - 1));
    const o = u ?? "";
    if (c[d] === o) return {
      stack: c,
      index: d
    };
    const y = c.lastIndexOf(o);
    if (y >= 0) return {
      stack: c,
      index: y
    };
    const p = c.slice(0, d + 1);
    p.push(o);
    const b = kt(p);
    return {
      stack: b,
      index: b.length - 1
    };
  }
  function ys(e, r, u) {
    const c = u ?? "", d = Array.isArray(e) && e.length > 0 ? e : [
      ""
    ], o = Math.max(0, Math.min(r, d.length - 1));
    if (d[o] === c) return {
      stack: d,
      index: o,
      changed: false
    };
    for (let b = o - 1; b >= 0; b -= 1) if (d[b] === c) return {
      stack: d,
      index: b,
      changed: true
    };
    for (let b = o + 1; b < d.length; b += 1) if (d[b] === c) return {
      stack: d,
      index: b,
      changed: true
    };
    const y = d.slice(0, o + 1);
    y.push(c);
    const p = kt(y);
    return {
      stack: p,
      index: p.length - 1,
      changed: true
    };
  }
  function Es(e, r, u) {
    if (!(e == null ? void 0 : e.state) || !Array.isArray(r) || r.length === 0) return u == null ? void 0 : u(), false;
    const c = r[r.length - 1] ?? "";
    if (r.length === 1) return e.state.doc.toString() !== c && e.dispatch({
      changes: {
        from: 0,
        to: e.state.doc.length,
        insert: c
      },
      annotations: [
        ht.addToHistory.of(false)
      ]
    }), u == null ? void 0 : u(), true;
    e.dispatch({
      changes: {
        from: 0,
        to: e.state.doc.length,
        insert: r[0] ?? ""
      },
      annotations: [
        ht.addToHistory.of(false),
        $t.of("full")
      ]
    }), u == null ? void 0 : u();
    for (let o = 1; o < r.length; o += 1) {
      const y = r[o] ?? "";
      e.dispatch({
        changes: {
          from: 0,
          to: e.state.doc.length,
          insert: y
        },
        annotations: [
          $t.of("full")
        ]
      });
    }
    return e.state.doc.toString() !== c && e.dispatch({
      changes: {
        from: 0,
        to: e.state.doc.length,
        insert: c
      },
      annotations: [
        ht.addToHistory.of(false)
      ]
    }), true;
  }
  function nn(e) {
    return e && typeof e.resetHistory == "function" ? () => e.resetHistory() : null;
  }
  function rn(e) {
    var _a;
    return e ? ((_a = e.getEditorView) == null ? void 0 : _a.call(e)) ?? null : null;
  }
  function yt(e) {
    const r = e == null ? void 0 : e.current;
    return (r == null ? void 0 : r.value) ?? r ?? null;
  }
  function vs(e, r) {
    return e ?? "";
  }
  function ks({ currentFile: e, value: r, onChange: u, editorRef: c, enabled: d = true, isUserEdit: o }) {
    const y = d ? gs(e) : null, p = a.useRef([
      ""
    ]), b = a.useRef(0), O = a.useRef(null), k = a.useRef(r ?? ""), N = a.useRef(false), M = a.useRef(false), A = a.useRef(null), D = a.useRef(null), W = a.useRef(r), X = a.useRef(false), Q = a.useRef(null), te = a.useRef(0), L = a.useRef(r), ue = a.useRef(o);
    ue.current = o, W.current = r;
    const oe = a.useCallback(async (E, P, U) => {
      if (E) try {
        await tn({
          key: E,
          stack: P,
          index: U
        });
      } catch (Y) {
        console.warn("[editor-undo-history] save failed:", Y);
      }
    }, []), ie = a.useCallback((E, P, U) => {
      E && (D.current && clearTimeout(D.current), D.current = setTimeout(() => {
        D.current = null, oe(E, P, U);
      }, 300));
    }, [
      oe
    ]), Z = a.useCallback(() => {
      A.current && (clearTimeout(A.current), A.current = null);
    }, []), Ee = a.useCallback((E) => {
      const P = Ye(p.current, b.current, E ?? "");
      return p.current = P.stack, b.current = P.index, P;
    }, []), se = a.useCallback((E) => {
      const P = yt(c), U = rn(P), Y = nn(P);
      if (!U) return false;
      const q = ++te.current;
      N.current = true, M.current = true;
      try {
        Es(U, E, Y ?? void 0);
      } finally {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            te.current === q && (N.current = false, M.current = false);
          });
        });
      }
      return true;
    }, [
      c
    ]), he = a.useCallback((E, P) => {
      var _a, _b;
      const U = W.current ?? "", Y = ((_a = P == null ? void 0 : P.stack) == null ? void 0 : _a.length) ? P.stack : [
        U
      ], q = ((_b = P == null ? void 0 : P.stack) == null ? void 0 : _b.length) ? P.index ?? P.stack.length - 1 : 0, _ = Ye(Y, q, U);
      p.current = _.stack, b.current = _.index, X.current = false, L.current = U, k.current = U;
      const J = _.stack.slice(0, _.index + 1), G = (ve) => {
        if (O.current === E) {
          if (se(J)) {
            Q.current = E;
            return;
          }
          if (ve <= 0) {
            Q.current = E, M.current = false, N.current = false;
            return;
          }
          setTimeout(() => G(ve - 1), 50);
        }
      };
      G(40), ie(E, _.stack, _.index);
    }, [
      se,
      ie
    ]);
    return a.useEffect(() => {
      d && bs().catch(() => {
      });
    }, [
      d
    ]), a.useEffect(() => {
      O.current === y && (k.current = r ?? "");
    }, [
      r,
      y
    ]), a.useEffect(() => {
      var _a;
      if (!d) return;
      const E = O.current, P = y;
      if (Z(), D.current && (clearTimeout(D.current), D.current = null), E === P) return;
      if (E) {
        const _ = vs(k.current, W.current ?? ""), J = Ee(_);
        oe(E, J.stack, J.index);
      }
      O.current = P, Q.current = null, X.current = false, M.current = true, k.current = W.current ?? "";
      const U = yt(c);
      if ((_a = nn(U)) == null ? void 0 : _a(), !P) {
        p.current = [
          W.current ?? ""
        ], b.current = 0, Q.current = null, M.current = false;
        return;
      }
      const Y = ++te.current;
      let q = false;
      return (async () => {
        let _ = null;
        try {
          _ = await ws(P);
        } catch (J) {
          console.warn("[editor-undo-history] load failed:", J);
        }
        q || te.current !== Y || O.current === P && he(P, _);
      })(), () => {
        q = true;
      };
    }, [
      d,
      y,
      c,
      Z,
      Ee,
      oe,
      he
    ]), a.useEffect(() => {
      if (!d || !y || Q.current !== y || X.current || N.current || M.current || r === L.current) return;
      const E = r ?? "";
      L.current = E, k.current = E;
      const P = Ye(p.current, b.current, E);
      p.current = P.stack, b.current = P.index, se(P.stack.slice(0, P.index + 1)), ie(y, P.stack, P.index);
    }, [
      d,
      y,
      r,
      se,
      ie
    ]), a.useEffect(() => {
      if (d) return () => {
        Z(), D.current && (clearTimeout(D.current), D.current = null);
        const E = O.current;
        if (!E) return;
        const P = Ye(p.current, b.current, k.current ?? W.current ?? "");
        tn({
          key: E,
          stack: P.stack,
          index: P.index
        }).catch(() => {
        });
      };
    }, [
      d,
      Z
    ]), {
      onChange: a.useCallback((E) => {
        var _a;
        if (N.current || M.current || Q.current !== O.current) return;
        const P = W.current ?? "", U = X.current || !!((_a = ue.current) == null ? void 0 : _a.call(ue));
        if (!so({
          markdown: E,
          parentMarkdown: P,
          userEdited: U
        })) {
          if (E === "" && P !== "") {
            const Y = rn(yt(c));
            if (Y && Y.state.doc.toString() !== P) {
              N.current = true;
              try {
                Y.dispatch({
                  changes: {
                    from: 0,
                    to: Y.state.doc.length,
                    insert: P
                  }
                });
              } finally {
                queueMicrotask(() => {
                  N.current = false;
                });
              }
            }
          }
          return;
        }
        L.current = E, k.current = E, X.current = true, u == null ? void 0 : u(E), !(!d || !O.current) && (Z(), A.current = setTimeout(() => {
          if (A.current = null, N.current || M.current) return;
          const Y = O.current;
          if (!Y) return;
          const q = ys(p.current, b.current, E);
          q.changed && (p.current = q.stack, b.current = q.index, ie(Y, q.stack, q.index));
        }, ps));
      }, [
        d,
        u,
        Z,
        ie
      ])
    };
  }
  const xs = "s3haim_md_editor_toc_width", Cs = 360;
  function on(e) {
    const r = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), u = [];
    (r ? e.metaKey : e.ctrlKey) && u.push("mod"), e.altKey && u.push("alt"), e.shiftKey && u.push("shift");
    const c = (e.key || "").toLowerCase();
    return !c || c === "shift" || c === "control" || c === "alt" || c === "meta" || (u.push(c), u.length <= 1) ? null : u.join("+");
  }
  function Ge(e) {
    return !e || typeof e != "string" ? "" : e.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
  }
  const Ss = oi({
    nonTightLists: false
  });
  function Rs(e) {
    var _a, _b;
    if (!(e == null ? void 0 : e.state)) return;
    const { state: r } = e, u = (_b = (_a = r.selection) == null ? void 0 : _a.main) == null ? void 0 : _b.head;
    if (typeof u != "number") return;
    const c = r.doc.lineAt(u);
    if (!/^(\s*)([-+*]|\d+[.)]|\[[ xX]\])/.test(c.text) || c.number < 2) return;
    const d = r.doc.line(c.number - 1);
    if (d.text.trim() !== "") return;
    const o = c.from - d.from;
    e.dispatch({
      changes: {
        from: d.from,
        to: c.from,
        insert: ""
      },
      selection: pn.cursor(u - o)
    });
  }
  function Ms(e) {
    return Ss(e) ? (Rs(e), true) : Bi(e) ? true : Xo(e);
  }
  const Ts = Ko.highest(hn.of([
    {
      key: "Enter",
      run: Ms
    }
  ]));
  function Xe(e, r) {
    return Dr() ? r(e) : false;
  }
  const As = [
    {
      key: "Alt-h",
      preventDefault: true,
      run: (e) => Xe(e, ii)
    },
    {
      key: "Alt-j",
      preventDefault: true,
      run: (e) => Xe(e, si)
    },
    {
      key: "Alt-k",
      preventDefault: true,
      run: (e) => Xe(e, ai)
    },
    {
      key: "Alt-l",
      preventDefault: true,
      run: (e) => Xe(e, ci)
    }
  ];
  await Wn();
  const { MdEditor: Ps, config: Ls } = await sn(async () => {
    const { MdEditor: e, config: r } = await import("./vendor-md-editor-B8lrupGh.js").then(async (m) => {
      await m.__tla;
      return m;
    }).then((u) => u.i);
    return {
      MdEditor: e,
      config: r
    };
  }, __vite__mapDeps([0,1,2,3,4]));
  Ls({
    editorConfig: {
      languageUserDefined: {
        "ko-KR": Kr
      },
      renderDelay: mn() ? 500 : 0
    },
    codeMirrorExtensions(e, { keyBindings: r }) {
      const u = [
        ...e
      ].filter((o) => o.type !== "keymap" && o.type !== "linkShortener" && o.type !== "lineNumbers"), c = (r || []).filter((o) => {
        const y = String((o == null ? void 0 : o.key) || "").toLowerCase(), p = String((o == null ? void 0 : o.mac) || "").toLowerCase();
        return y !== "mod-f" && y !== "ctrl-d" && y !== "mod-d" && p !== "cmd-d" && y !== "ctrl-b" && y !== "mod-b" && p !== "cmd-b" && y !== "ctrl-u" && y !== "mod-u" && p !== "cmd-u" && y !== "ctrl-o" && y !== "mod-o" && p !== "cmd-o" && y !== "ctrl-arrowup" && y !== "mod-arrowup" && p !== "cmd-arrowup" && y !== "ctrl-arrowdown" && y !== "mod-arrowdown" && p !== "cmd-arrowdown" && !/^ctrl-[0-9]$/.test(y) && !/^mod-[0-9]$/.test(y) && !/^cmd-[0-9]$/.test(p);
      }), d = [
        {
          key: "ArrowLeft",
          run: (o) => Vt(o, -1)
        },
        {
          key: "ArrowRight",
          run: (o) => Vt(o, 1)
        },
        {
          key: "Ctrl-ArrowLeft",
          mac: "Alt-ArrowLeft",
          run: (o) => be(o, -1, Zo),
          shift: (o) => be(o, -1, Uo)
        },
        {
          key: "Ctrl-ArrowRight",
          mac: "Alt-ArrowRight",
          run: (o) => be(o, 1, Jo),
          shift: (o) => be(o, 1, Qo)
        },
        {
          key: "Alt-ArrowLeft",
          mac: "Ctrl-ArrowLeft",
          run: (o) => be(o, -1, ti),
          shift: (o) => be(o, -1, ei)
        },
        {
          key: "Alt-ArrowRight",
          mac: "Ctrl-ArrowRight",
          run: (o) => be(o, 1, ri),
          shift: (o) => be(o, 1, ni)
        },
        ...As,
        {
          key: "Alt--",
          preventDefault: true,
          run: vi
        },
        {
          key: "Ctrl-Tab",
          run: ki
        },
        {
          key: "Ctrl-f",
          mac: "Cmd-f",
          preventDefault: true,
          run: Fo
        },
        {
          key: "Ctrl-d",
          mac: "Cmd-d",
          preventDefault: true,
          run: (o) => ($o(o), true)
        },
        ...xo,
        {
          key: "Mod-Alt-ArrowUp",
          run: Bo
        },
        {
          key: "Mod-Alt-ArrowDown",
          run: Vo
        },
        ...c
      ];
      return u.some((o) => o.type === "drawSelection") || u.push({
        type: "drawSelection",
        extension: qo()
      }), u.push({
        type: "cmGlyphRepaintFix",
        extension: rs()
      }), u.push({
        type: "markdownSingleNewlineEnter",
        extension: Ts
      }, {
        type: "insertLineAbove",
        extension: Co
      }, {
        type: "codeFenceToggleComment",
        extension: So
      }, {
        type: "lineNumbers",
        extension: Ro()
      }, {
        type: "allowMultipleSelections",
        extension: zo.allowMultipleSelections.of(true)
      }, {
        type: "clickAddsSelectionRange",
        extension: qt.clickAddsSelectionRange.of((o) => {
          const y = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
          return o.altKey || (y ? o.metaKey : o.ctrlKey);
        })
      }, {
        type: "multiCursorPreview",
        extension: Wo({
          minSelectionLength: 2,
          maxMatches: 200
        })
      }, {
        type: "keymap",
        extension: hn.of(d)
      }, {
        type: "base64ImageFold",
        extension: Mo(Ot())
      }, {
        type: "mermaidBase64Fold",
        extension: To(Ot())
      }, {
        type: "autocompleteGate",
        extension: qt.updateListener.of((o) => {
          ns(o), !un() && Yo(o.state) === "active" && Go(o.view);
        })
      }), u;
    },
    markdownItPlugins(e) {
      return li(e);
    }
  });
  Ea = function({ value: e, onChange: r, onSave: u, theme: c = "light", currentFile: d = null, previewOnly: o = false, isMobileLayout: y = false, onUploadImage: p, isUploadingEditorImage: b = false, uploadImagePercent: O = 0, onCancelUploadImage: k, onResolveWikiImageUrl: N, snippetConfig: M = {
    snippets: []
  }, llmProviderProfiles: A = [], getImgbbApiKey: D, onOpenViewPath: W, onRequestConvertAllImagesToWiki: X, onRegisterConvertAllImagesToWiki: Q, isActiveFile: te = true, isSurfaceLive: L = true }) {
    var _a, _b;
    const ue = er(), oe = an(), ie = cn(), { showAlert: Z } = tr(), Ee = a.useId(), se = a.useMemo(() => nr(Ee), [
      Ee
    ]), he = a.useMemo(() => rr(se), [
      se
    ]), C = a.useRef(null), E = a.useRef(null), P = a.useRef(0), U = a.useRef(""), Y = `${(d == null ? void 0 : d.type) || ""}:${(d == null ? void 0 : d.id) || ""}`;
    U.current !== Y && (U.current = Y, P.current = 0);
    const q = a.useRef(null), _ = a.useRef(null), J = a.useRef(M), G = a.useRef(e), ve = a.useRef(d), _e = a.useRef(c), Me = a.useRef("");
    a.useEffect(() => {
      G.current = e, ve.current = d, _e.current = c;
    }, [
      e,
      d,
      c
    ]), a.useEffect(() => {
      const t = E.current;
      if (!t) return;
      const n = () => {
        P.current = Date.now();
      };
      return t.addEventListener("beforeinput", n, true), () => t.removeEventListener("beforeinput", n, true);
    }, []), a.useEffect(() => {
      if (!L) return;
      const { issues: t } = or(e ?? "");
      if (!t.length) {
        Me.current = "";
        return;
      }
      const n = ir(t);
      n !== Me.current && (Me.current = n, Z({
        title: "Cover syntax error",
        message: `note-cover has invalid syntax.

${n}`
      }));
    }, [
      e,
      Z,
      L
    ]);
    const Te = a.useCallback((t = {}) => {
      const n = G.current ?? "", i = ve.current;
      ln({
        currentFile: i,
        editorContent: n,
        theme: _e.current === "dark" ? "dark" : "light",
        navigate: oe,
        openCoverEdit: !!t.openCoverEdit,
        ...t.paginationMode === "flow" || t.paginationMode === "pagedjs" ? {
          paginationMode: t.paginationMode
        } : {},
        openInFocusedPane: (s) => {
          var _a2;
          return !!((ie == null ? void 0 : ie.workspaceTabsEnabled) && ((_a2 = ie.openExportPdfInFocusedPane) == null ? void 0 : _a2.call(ie, s)));
        }
      });
    }, [
      oe,
      ie
    ]), { onChange: H } = ks({
      currentFile: d,
      value: e,
      onChange: r,
      editorRef: C,
      enabled: !o,
      isUserEdit: () => Date.now() - P.current < 1e3
    }), ee = Po({
      getMarkdown: () => G.current ?? "",
      setMarkdown: (t) => {
        typeof r == "function" && r(t);
      }
    }), Se = a.useRef(ee.openAtOffset), Ae = a.useRef(ee.openPreviewTable);
    a.useEffect(() => {
      Se.current = ee.openAtOffset, Ae.current = ee.openPreviewTable;
    }, [
      ee.openAtOffset,
      ee.openPreviewTable
    ]);
    const R = a.useRef(null), [x, I] = a.useState(false), [F, ae] = a.useState(null), fe = a.useRef(() => {
    }), [ke, me] = a.useState(false), [B, Pe] = a.useState(null), [Re, Qe] = a.useState(0), [Je, xt] = a.useState(false), [xn, Ct] = a.useState(false), St = a.useRef({
      from: 0,
      to: 0
    }), et = a.useRef(H);
    a.useEffect(() => {
      et.current = H;
    }, [
      H
    ]);
    const [Rt, Ke] = a.useState(null), [Cn, tt] = a.useState(false), [ce, Le] = a.useState(null), [Sn, xe] = a.useState(false), [De, nt] = a.useState(null), [Rn, rt] = a.useState(false), [pe, Mt] = a.useState(null), [Fe, ot] = a.useState(null), ge = a.useRef(null), [it, Tt] = Lo(), [st] = ao(), [At, Pt] = _i(), [Mn, Be] = Ki(), de = a.useMemo(() => mn(), []), le = de ? false : Mn, at = a.useRef(null);
    a.useEffect(() => {
      if (o) return;
      const t = () => {
        var _a2, _b2, _c;
        const l = (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2);
        l && (at.current = l.state.selection);
      }, n = (s) => {
        !(s.metaKey || s.ctrlKey) || s.altKey || s.shiftKey || s.key.toLowerCase() === "k" && t();
      };
      window.addEventListener("keydown", n, true);
      const i = sr(t);
      return () => {
        window.removeEventListener("keydown", n, true), i();
      };
    }, [
      o
    ]), a.useEffect(() => {
      if (o || !L) return;
      const t = () => {
        var _a2;
        return ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current;
      }, n = () => {
        var _a2, _b2;
        const g = (_b2 = (_a2 = t()) == null ? void 0 : _a2.getEditorView) == null ? void 0 : _b2.call(_a2), v = at.current;
        !g || !v || g.dispatch({
          selection: v,
          scrollIntoView: true
        });
      }, i = (f) => {
        var _a2;
        const g = t();
        g && (n(), (_a2 = g.focus) == null ? void 0 : _a2.call(g), typeof g.execCommand == "function" && g.execCommand(f));
      }, s = () => {
        var _a2, _b2, _c;
        const f = t();
        if (!f) return;
        const g = `

<pgbr/>

`;
        if (typeof f.insert == "function") {
          f.insert(() => ({
            targetValue: g,
            select: false,
            deviationStart: 0,
            deviationEnd: 0
          })), (_a2 = f.focus) == null ? void 0 : _a2.call(f);
          return;
        }
        const v = (_b2 = f.getEditorView) == null ? void 0 : _b2.call(f);
        v && (v.dispatch(v.state.replaceSelection(g)), (_c = v.focus) == null ? void 0 : _c.call(v));
      }, l = (f = {}) => {
        Te(f);
      }, m = {};
      for (const f of ar) f.directive && (m[f.id] = () => i(f.directive));
      return m["editor-revoke"] = () => {
        var _a2, _b2;
        n();
        const f = (_b2 = (_a2 = t()) == null ? void 0 : _a2.getEditorView) == null ? void 0 : _b2.call(_a2);
        f && (f.focus(), Oo(f));
      }, m["editor-next"] = () => {
        var _a2, _b2;
        n();
        const f = (_b2 = (_a2 = t()) == null ? void 0 : _a2.getEditorView) == null ? void 0 : _b2.call(_a2);
        f && (f.focus(), _o(f));
      }, m["editor-llm-assist"] = () => {
        var _a2;
        return (_a2 = ue == null ? void 0 : ue.toggleAssist) == null ? void 0 : _a2.call(ue);
      }, m["editor-export-pdf"] = () => l({
        paginationMode: "flow"
      }), m["editor-export-pdf-pagedjs"] = () => l({
        paginationMode: "pagedjs"
      }), m["editor-pgbr"] = () => {
        n(), s();
      }, m["editor-heading-remap"] = () => {
        n(), fe.current();
      }, m["editor-checklist-progress"] = () => me(true), m["editor-table-edit"] = () => {
        var _a2, _b2;
        n();
        const f = (_b2 = (_a2 = t()) == null ? void 0 : _a2.getEditorView) == null ? void 0 : _b2.call(_a2);
        if (!f) return;
        const { from: g, to: v } = f.state.selection.main;
        Se.current(g, v) || Z({
          title: "No table",
          message: "No haim-table found at the cursor or selection position."
        });
      }, m["editor-image-upload"] = () => {
        const f = document.createElement("input");
        f.type = "file", f.accept = "image/*", f.multiple = true, f.onchange = () => {
          var _a2;
          const g = Array.from(f.files || []);
          g.length && ((_a2 = R.current) == null ? void 0 : _a2.call(R, g));
        }, f.click();
      }, m["editor-image-clip"] = () => {
        const f = document.createElement("input");
        f.type = "file", f.accept = "image/*", f.onchange = () => {
          var _a2;
          const g = (_a2 = f.files) == null ? void 0 : _a2[0];
          g && Ke(g);
        }, f.click();
      }, m["editor-create-whiteboard"] = () => {
        typeof p != "function" || b || tt(true);
      }, m["editor-convert-all-images-to-wiki"] = () => {
        typeof X == "function" && X();
      }, m["editor-catalog"] = () => {
        const f = E.current;
        if (!f) return;
        const g = f.querySelector([
          '.md-editor-toolbar-item[aria-label="\uCE74\uD0C8\uB85C\uADF8"]',
          '.md-editor-toolbar-item[aria-label="catalog"]',
          '.md-editor-toolbar-item[aria-label="\u76EE\u5F55"]',
          '.md-editor-toolbar-item[data-md-tip="\uCE74\uD0C8\uB85C\uADF8"]',
          '.md-editor-toolbar-item[data-md-tip="catalog"]',
          '.md-editor-toolbar-item[data-md-tip="\u76EE\u5F55"]'
        ].join(", "));
        if (g instanceof HTMLElement) {
          g.click();
          return;
        }
        const v = f.querySelectorAll(".md-editor-toolbar-item");
        for (const T of v) {
          const z = T.getAttribute("aria-label") || T.getAttribute("data-md-tip") || T.getAttribute("title") || "";
          if (/카탈로그|catalog|目录|목차/i.test(z)) {
            T instanceof HTMLElement && T.click();
            break;
          }
        }
      }, m["editor-insert-footnote"] = () => {
        Dt({
          mode: "footnote-insert"
        });
      }, m["editor-insert-circle-number"] = (f) => {
        var _a2, _b2, _c;
        const g = typeof f == "string" ? f : "";
        if (!g) {
          Dt({
            mode: "circle-number"
          });
          return;
        }
        n();
        const T = (_b2 = (_a2 = t()) == null ? void 0 : _a2.getEditorView) == null ? void 0 : _b2.call(_a2);
        T && (T.dispatch(T.state.replaceSelection(g)), (_c = T.focus) == null ? void 0 : _c.call(T));
      }, m["editor-insert-snippet"] = (f) => {
        var _a2, _b2, _c;
        const g = typeof f == "string" ? f : "";
        if (!g) return;
        n();
        const T = (_b2 = (_a2 = t()) == null ? void 0 : _a2.getEditorView) == null ? void 0 : _b2.call(_a2);
        T && (T.dispatch(T.state.replaceSelection(g)), (_c = T.focus) == null ? void 0 : _c.call(T));
      }, m["editor-version-history"] = () => {
        !(d == null ? void 0 : d.id) || !(d == null ? void 0 : d.type) || sn(async () => {
          const { openNoteVersionHistory: f } = await import("./index-BYVoYwQr.js").then(async (m2) => {
            await m2.__tla;
            return m2;
          }).then((g) => g.nA);
          return {
            openNoteVersionHistory: f
          };
        }, __vite__mapDeps([5,1,4,6,7,8,9,10,2,11,12])).then(({ openNoteVersionHistory: f }) => {
          f({
            path: d.id,
            storageType: d.type,
            currentText: typeof e == "string" ? e : void 0
          });
        });
      }, cr(m);
    }, [
      o,
      L,
      Te,
      Z,
      X,
      ue,
      d,
      e
    ]);
    const ct = ue == null ? void 0 : ue.registerEditorBridge;
    a.useEffect(() => {
      if (o || !te || !ct) return;
      const t = () => {
        const n = C.current;
        if (!n) return null;
        if (typeof n.getEditorView == "function" || typeof n.getSelectedText == "function") return n;
        const i = n.value;
        return i && (typeof i.getEditorView == "function" || typeof i.getSelectedText == "function") ? i : null;
      };
      return ct({
        editorRef: C,
        getEditorApi: t,
        hasKeyboardFocus: () => {
          var _a2, _b2, _c;
          return !!((_c = (_b2 = (_a2 = t()) == null ? void 0 : _a2.getEditorView) == null ? void 0 : _b2.call(_a2)) == null ? void 0 : _c.hasFocus);
        },
        onChange: H,
        getMarkdown: () => {
          var _a2, _b2, _c, _d, _e2, _f;
          return ((_f = (_e2 = (_d = (_c = (_b2 = (_a2 = t()) == null ? void 0 : _a2.getEditorView) == null ? void 0 : _b2.call(_a2)) == null ? void 0 : _c.state) == null ? void 0 : _d.doc) == null ? void 0 : _e2.toString) == null ? void 0 : _f.call(_e2)) ?? G.current ?? "";
        },
        documentKey: (d == null ? void 0 : d.type) && (d == null ? void 0 : d.id) ? `${d.type}:${d.id}` : void 0
      });
    }, [
      o,
      te,
      ct,
      H,
      d == null ? void 0 : d.type,
      d == null ? void 0 : d.id
    ]), a.useEffect(() => {
      if (o || !L) return;
      const t = () => {
        var _a2, _b2, _c;
        return ((_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2)) ?? null;
      }, n = () => {
        const s = t(), l = at.current;
        !s || !l || s.dispatch({
          selection: l,
          scrollIntoView: true
        });
      }, i = (s, l) => {
        var _a2, _b2;
        const m = t();
        m && (m.dispatch({
          changes: {
            from: 0,
            to: m.state.doc.length,
            insert: s
          },
          selection: {
            anchor: l
          },
          scrollIntoView: true
        }), (_a2 = m.focus) == null ? void 0 : _a2.call(m)), (_b2 = et.current) == null ? void 0 : _b2.call(et, s);
      };
      return lr({
        getMarkdown: () => {
          var _a2;
          return ((_a2 = t()) == null ? void 0 : _a2.state.doc.toString()) ?? G.current ?? "";
        },
        insertExisting: (s) => {
          n();
          const l = t(), m = (l == null ? void 0 : l.state.doc.toString()) ?? G.current ?? "", f = l == null ? void 0 : l.state.selection.main, g = Nr(m, (f == null ? void 0 : f.from) ?? 0, (f == null ? void 0 : f.to) ?? 0, s);
          i(g.next, g.caret);
        },
        openCompose: () => {
          var _a2;
          n();
          const l = (_a2 = t()) == null ? void 0 : _a2.state.selection.main;
          St.current = {
            from: (l == null ? void 0 : l.from) ?? 0,
            to: (l == null ? void 0 : l.to) ?? 0
          }, Ct(true);
        }
      });
    }, [
      o,
      L
    ]);
    const { width: Ve, isResizing: Tn, handleProps: An } = ur({
      storageKey: xs,
      defaultWidth: Cs,
      minWidth: 160,
      collapseBelowWidth: 80,
      maxWidth: 640,
      edge: "right",
      onCollapseBelowMin: () => {
        var _a2, _b2, _c;
        (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.toggleCatalog) == null ? void 0 : _c.call(_b2, false);
      }
    }), $e = a.useMemo(() => {
      const { meta: t } = dr(e ?? "");
      return t;
    }, [
      e
    ]), Pn = a.useMemo(() => {
      const t = $e == null ? void 0 : $e.fonts;
      if (!t) return {};
      const n = {}, i = ze(t.body), s = ze(t.heading), l = ze(t.bold), m = ze(t.code, "mono");
      return i && (n["--print-font-body"] = i), s && (n["--print-font-heading"] = s), l && (n["--print-font-bold"] = l), m && (n["--print-font-code"] = m), n;
    }, [
      $e
    ]);
    a.useEffect(() => {
      J.current = M || {
        snippets: []
      };
    }, [
      M
    ]), a.useEffect(() => {
      if (!L) return;
      const t = () => {
        var _a2, _b2, _c;
        const l = (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2);
        return l ? (go(l, st), wo(l, st), true) : false;
      };
      if (t()) return;
      const n = window.setTimeout(t, 50), i = window.setTimeout(t, 250);
      return () => {
        window.clearTimeout(n), window.clearTimeout(i);
      };
    }, [
      st,
      L
    ]), a.useEffect(() => {
      if (!L) {
        Mt(null);
        return;
      }
      const t = E.current;
      if (!t) return;
      const n = () => {
        const s = t.querySelector(".md-editor-catalog-fixed, .md-editor-catalog-flat");
        Mt((l) => l === s ? l : s);
      };
      n();
      const i = new MutationObserver(n);
      return i.observe(t, {
        childList: true,
        subtree: true
      }), () => i.disconnect();
    }, [
      L
    ]), a.useEffect(() => {
      const t = E.current;
      t && t.style.setProperty("--md-catalog-width", `${Ve}px`);
    }, [
      Ve
    ]), a.useLayoutEffect(() => {
      if (!L || !pe) {
        ot(null);
        return;
      }
      const t = () => {
        const s = pe.getBoundingClientRect();
        if (s.width <= 0 || s.height <= 0) {
          ot(null);
          return;
        }
        ot({
          top: s.top,
          left: s.left,
          height: s.height
        });
      };
      t();
      const n = new ResizeObserver(t);
      n.observe(pe);
      const i = E.current;
      return i && n.observe(i), window.addEventListener("resize", t), window.addEventListener("scroll", t, true), () => {
        n.disconnect(), window.removeEventListener("resize", t), window.removeEventListener("scroll", t, true);
      };
    }, [
      pe,
      Ve,
      L
    ]), a.useEffect(() => {
      if (!(!L || !pe)) return Mi(pe, {
        getEditorRoot: () => E.current,
        mdHeadingId: (t) => he(t)
      });
    }, [
      pe,
      he,
      L
    ]), hi(E, e, N, (d == null ? void 0 : d.id) ?? null, {
      enabled: L
    }), Io(E, {
      layoutKey: c,
      enabled: L
    }), a.useEffect(() => {
      if (!L) return;
      const t = E.current;
      if (!t || !e) return;
      let n = 0;
      const i = () => {
        bo(t, e, N, {
          load: true
        });
      }, s = () => {
        const v = t.querySelectorAll("[data-note-cover-mount]");
        !v.length || !(t.querySelector(".md-note-cover-placeholder--pending") || [
          ...v
        ].some((z) => z.childNodes.length === 0)) || n || (n = window.requestAnimationFrame(() => {
          n = 0, i();
        }));
      }, m = [
        0,
        80,
        280,
        600,
        1100,
        2e3
      ].map((v) => setTimeout(i, v)), f = t.querySelector(".md-editor-preview") || t, g = typeof MutationObserver < "u" ? new MutationObserver(s) : null;
      return g == null ? void 0 : g.observe(f, {
        childList: true,
        subtree: true
      }), () => {
        n && window.cancelAnimationFrame(n), m.forEach((v) => clearTimeout(v)), g == null ? void 0 : g.disconnect();
      };
    }, [
      e,
      N,
      d == null ? void 0 : d.id,
      L
    ]), a.useEffect(() => {
      const t = E.current;
      return () => {
        co(t);
      };
    }, []), a.useEffect(() => {
      if (o) return;
      const t = lo(d), n = () => {
        var _a2, _b2, _c;
        const l = (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2);
        return l ? (yo(l, t), true) : false;
      };
      if (n()) return;
      const i = [
        50,
        200,
        500,
        1e3
      ].map((s) => setTimeout(n, s));
      return () => i.forEach((s) => clearTimeout(s));
    }, [
      d == null ? void 0 : d.id,
      d == null ? void 0 : d.type,
      o
    ]), a.useEffect(() => {
      var _a2, _b2, _c;
      if (o) return;
      const n = (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2);
      fr(n);
    }, [
      d == null ? void 0 : d.id,
      o
    ]), a.useEffect(() => {
      if (o) return;
      const t = (d == null ? void 0 : d.type) && (d == null ? void 0 : d.id) ? `${d.type}:${d.id}` : null;
      let n = null, i = null;
      const s = () => {
        var _a2, _b2, _c;
        const f = (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2);
        return !f || f === i ? !!f : (n == null ? void 0 : n(), i = f, n = Sr(f, t), true);
      };
      if (s()) return () => {
        n == null ? void 0 : n();
      };
      const l = [
        50,
        200,
        500,
        1e3
      ].map((m) => setTimeout(s, m));
      return () => {
        l.forEach((m) => clearTimeout(m)), n == null ? void 0 : n();
      };
    }, [
      o,
      d == null ? void 0 : d.id,
      d == null ? void 0 : d.type
    ]), a.useEffect(() => {
      if (!L) return;
      const t = E.current;
      if (!t) return;
      const n = Qi(d), i = {
        current: []
      };
      let s = false, l = null, m = null, f = [];
      const g = () => t.querySelector(".md-editor-preview"), v = () => {
        if (s) return;
        const j = g();
        if (!j || !Yi(j)) return;
        const ne = Ui(j, {
          collapsedIds: i.current,
          onCollapsedChange: (S) => {
            i.current = S, n && es(n, S);
          }
        }), w = l;
        l = () => {
          w == null ? void 0 : w(), ne();
        };
      }, T = (j) => {
        !j || m || typeof MutationObserver > "u" || (m = new MutationObserver(v), m.observe(j, {
          childList: true,
          subtree: true
        }));
      };
      return (async () => {
        if (n) {
          const j = await Ji(n);
          if (s) return;
          j && (i.current = j);
        }
        s || (T(g()), v(), f = [
          80,
          250,
          600
        ].map((j) => setTimeout(() => {
          s || (T(g()), v());
        }, j)));
      })(), () => {
        s = true, f.forEach((j) => clearTimeout(j)), m == null ? void 0 : m.disconnect(), m = null, l == null ? void 0 : l(), l = null;
      };
    }, [
      d == null ? void 0 : d.id,
      d == null ? void 0 : d.type,
      L
    ]), a.useEffect(() => {
      var _a2, _b2, _c;
      if (!o) return;
      (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c.call(_b2, true);
    }, [
      o
    ]), a.useEffect(() => {
      if (!y || o || !(d == null ? void 0 : d.id)) return;
      Be(false);
      const t = () => {
        var _a2, _b2, _c;
        (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c.call(_b2, true);
      };
      t();
      const n = [
        80,
        240,
        600
      ].map((i) => setTimeout(t, i));
      return () => {
        n.forEach((i) => clearTimeout(i));
      };
    }, [
      y,
      o,
      d == null ? void 0 : d.id,
      Be
    ]), a.useEffect(() => {
      if (o || de || !L) return;
      const t = E.current;
      if (!t) return;
      const n = () => t.querySelector(".md-editor-preview"), i = () => le;
      let s = null;
      const l = (w) => w instanceof Element ? gt(w) ? true : !!w.closest("a, button, input, textarea, select, .md-editor-code-action, [data-transform-handle]") : false, m = (w) => {
        var _a2, _b2, _c, _d, _e2, _f;
        const S = n();
        if (!S || He(S)) return;
        if (!i()) {
          const V = (_a2 = window.getSelection) == null ? void 0 : _a2.call(window);
          (V == null ? void 0 : V.rangeCount) && S.contains(V.getRangeAt(0).commonAncestorContainer) && !V.getRangeAt(0).collapsed ? ft(S, {
            allowCollapsed: false
          }) : je(S);
          return;
        }
        const K = (_b2 = window.getSelection) == null ? void 0 : _b2.call(window);
        if (!K || K.rangeCount === 0) {
          if (!(w instanceof Element) || !w.closest("td, th")) return;
        } else {
          const V = K.getRangeAt(0);
          if (!S.contains(V.commonAncestorContainer) && !(w instanceof Element && w.closest("td, th"))) return;
        }
        const $ = (_e2 = (_d = ((_c = C.current) == null ? void 0 : _c.value) ?? C.current) == null ? void 0 : _d.getEditorView) == null ? void 0 : _e2.call(_d);
        $ && ((K == null ? void 0 : K.rangeCount) && S.contains(K.getRangeAt(0).commonAncestorContainer) && ft(S, {
          allowCollapsed: true
        }), Kt($, S, {
          focus: true,
          target: w
        }), mt(), (_f = _.current) == null ? void 0 : _f.schedule({
          withRetries: true
        }));
      }, f = (w) => w.button === 2 || w.button === 0 && w.ctrlKey, g = (w, S) => Ft(S, w.clientX, w.clientY) ? true : Bt(w.clientX, w.clientY) ? Or(S) : false, v = (w) => {
        var _a2, _b2, _c, _d;
        const S = n();
        if (!S) return;
        const K = w.target;
        if (!(K instanceof Node)) return;
        if (S.contains(K) && f(w)) {
          g(w, S);
          return;
        }
        if (S.contains(K)) {
          s = {
            x: w.clientX,
            y: w.clientY
          }, !gt(K) && !i() && je(S);
          return;
        }
        if (s = null, (_d = (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2)) == null ? void 0 : _d.dom.contains(K)) {
          if (f(w)) return;
          pt(), i() || je(S);
        }
      }, T = (w) => {
        const S = n();
        !S || !(w.target instanceof Node) || !S.contains(w.target) || g(w, S);
      }, z = (w) => {
        var _a2, _b2, _c;
        if (f(w)) return;
        const S = n();
        if (!(!S || !(w.target instanceof Node) || !S.contains(w.target)) && !l(w.target)) {
          if (wt(t)) {
            const K = !!(s && Math.hypot(w.clientX - s.x, w.clientY - s.y) > 6);
            if (s = null, !i() || K) return;
            const $ = (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2), V = w.target instanceof Element ? _t(w.target, S) : null;
            $ && V && (mt(), zt(V, $, S, w.clientX, w.clientY));
            return;
          }
          s = null, requestAnimationFrame(() => m(w.target));
        }
      }, j = (w) => {
        var _a2, _b2, _c, _d;
        const S = n();
        if (!(!S || !(w.target instanceof Node) || !S.contains(w.target)) && !l(w.target)) {
          if (wt(t)) {
            if (!i()) return;
            const re = (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2), $ = (_d = w.changedTouches) == null ? void 0 : _d[0], V = w.target instanceof Element ? _t(w.target, S) : null;
            re && V && $ && (mt(), zt(V, re, S, $.clientX, $.clientY));
            return;
          }
          requestAnimationFrame(() => m(w.target));
        }
      }, ne = (w) => {
        var _a2, _b2, _c, _d, _e2;
        if (!i() || w.isComposing || w.keyCode === 229 || w.key === "Process" || (w.metaKey || w.ctrlKey) && (w.key === "s" || w.key === "S" || w.code === "KeyS") || gt(w.target)) return;
        const S = n();
        if (!S || He(S) || wt(t)) return;
        const K = w.target, re = K instanceof Node && S.contains(K), $ = (_a2 = window.getSelection) == null ? void 0 : _a2.call(window), V = ($ == null ? void 0 : $.rangeCount) > 0 && S.contains($.getRangeAt(0).commonAncestorContainer);
        if (!re && !V) return;
        const Ce = (_d = (_c = ((_b2 = C.current) == null ? void 0 : _b2.value) ?? C.current) == null ? void 0 : _c.getEditorView) == null ? void 0 : _d.call(_c);
        Ce && (Ce.hasFocus || (V ? (ft(S, {
          allowCollapsed: true
        }), Kt(Ce, S, {
          focus: true
        }), (_e2 = _.current) == null ? void 0 : _e2.schedule({
          withRetries: true
        })) : Ce.focus()));
      };
      return t.addEventListener("mousedown", v, true), t.addEventListener("contextmenu", T, true), t.addEventListener("mouseup", z), t.addEventListener("touchend", j, {
        passive: true
      }), t.addEventListener("keydown", ne, true), () => {
        je(n()), t.removeEventListener("mousedown", v, true), t.removeEventListener("contextmenu", T, true), t.removeEventListener("mouseup", z), t.removeEventListener("touchend", j), t.removeEventListener("keydown", ne, true);
      };
    }, [
      o,
      le,
      de,
      L
    ]), a.useEffect(() => {
      var _a2, _b2, _c, _d;
      if (o || !L) {
        (_a2 = q.current) == null ? void 0 : _a2.stop(), q.current = null, (_b2 = _.current) == null ? void 0 : _b2.stop(), _.current = null, pt();
        return;
      }
      const t = E.current, n = () => {
        var _a3;
        return (_a3 = t ?? E.current) == null ? void 0 : _a3.querySelector(".md-editor-preview");
      }, i = () => {
        var _a3, _b3, _c2;
        return (_c2 = (_b3 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b3.getEditorView) == null ? void 0 : _c2.call(_b3);
      };
      (_c = q.current) == null ? void 0 : _c.stop();
      const s = ms({
        getPreviewRoot: n,
        getView: i
      });
      q.current = s, (_d = _.current) == null ? void 0 : _d.stop(), _.current = null, le ? _.current = ss({
        getPreviewRoot: n,
        getView: i
      }) : pt();
      const l = ts((m, f) => {
        var _a3;
        const g = i();
        !g || m !== g || (s.schedule({
          withRetries: f.docChanged
        }), le && ((_a3 = _.current) == null ? void 0 : _a3.schedule({
          withRetries: f.docChanged
        })));
      });
      return () => {
        var _a3, _b3;
        l(), (_a3 = _.current) == null ? void 0 : _a3.stop(), _.current = null, (_b3 = q.current) == null ? void 0 : _b3.stop(), q.current = null;
      };
    }, [
      o,
      le,
      L
    ]), a.useEffect(() => {
      if (o || !L) return;
      const t = mr(d);
      if (!t) return;
      const n = E.current;
      let i = 0, s = 0, l = Nt(t);
      const m = () => {
        var _a2, _b2, _c;
        return ((_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2)) ?? null;
      }, f = () => {
        const w = m();
        if (!(w == null ? void 0 : w.scrollDOM)) return null;
        const S = n == null ? void 0 : n.querySelector(".md-editor-preview"), K = S ? ye(S) : null;
        return {
          editorTop: w.scrollDOM.scrollTop,
          editorLeft: w.scrollDOM.scrollLeft,
          previewTop: (K == null ? void 0 : K.scrollTop) ?? 0,
          previewLeft: (K == null ? void 0 : K.scrollLeft) ?? 0
        };
      }, g = (w) => {
        const S = m();
        if (!(S == null ? void 0 : S.scrollDOM)) return false;
        S.scrollDOM.scrollTop = w.editorTop, S.scrollDOM.scrollLeft = w.editorLeft;
        const K = n == null ? void 0 : n.querySelector(".md-editor-preview"), re = K ? ye(K) : null;
        return re && (re.scrollTop = w.previewTop, re.scrollLeft = w.previewLeft), true;
      }, v = () => {
        const w = f();
        w && (l = w, dt(t, w));
      }, T = () => {
        if (l) {
          dt(t, l);
          return;
        }
        v();
      }, z = () => {
        i && window.clearTimeout(i), i = window.setTimeout(() => {
          i = 0, v();
        }, 80);
      }, j = Nt(t);
      if (j) {
        l = j;
        const w = ++s, S = (K) => {
          if (s === w) {
            if (g(j)) {
              l = j, dt(t, j);
              return;
            }
            K <= 0 || window.setTimeout(() => S(K - 1), 50);
          }
        };
        S(40);
      }
      const ne = () => z();
      return n == null ? void 0 : n.addEventListener("scroll", ne, true), () => {
        s += 1, i && window.clearTimeout(i), n == null ? void 0 : n.removeEventListener("scroll", ne, true), T();
      };
    }, [
      o,
      d == null ? void 0 : d.type,
      d == null ? void 0 : d.id,
      L
    ]), a.useEffect(() => {
      if (o || de || !le || !L) {
        gi();
        return;
      }
      const t = E.current;
      if (t) return wi(t, {
        getPreviewRoot: () => t.querySelector(".md-editor-preview"),
        getView: () => {
          var _a2, _b2, _c;
          return (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2);
        },
        isEnabled: () => le && L
      });
    }, [
      o,
      le,
      de,
      L
    ]), a.useEffect(() => {
      var _a2, _b2, _c;
      const n = (_a2 = E.current) == null ? void 0 : _a2.querySelector(".md-editor-preview");
      if (bi(), !!n && ((_b2 = q.current) == null ? void 0 : _b2.schedule({
        withRetries: true
      }), !de)) {
        if (le && !He(n)) {
          (_c = _.current) == null ? void 0 : _c.schedule({
            withRetries: true
          });
          return;
        }
        le || je(n);
      }
    }, [
      e,
      d == null ? void 0 : d.id,
      le,
      de
    ]), a.useEffect(() => {
      if (o || !L) return;
      const t = () => {
        var _a2;
        const n = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current;
        return (n == null ? void 0 : n.domEventHandlers) ? (n.domEventHandlers({
          paste: (i, s) => {
            const l = i.clipboardData;
            if (!l || !s) return;
            const m = ko(l);
            if (m.length && typeof p == "function") {
              if (b) return i.preventDefault(), false;
              i.preventDefault();
              const g = s;
              return p(m).then((v) => {
                var _a3, _b2, _c;
                if (!(v == null ? void 0 : v.length)) return;
                const T = v.map((ne) => `![[${ne}]]`).join(`
`), j = ((_c = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2)) ?? g;
                j && j.dispatch(j.state.replaceSelection(T));
              }), false;
            }
            const f = l.getData("text/plain") ?? "";
            if (f) return i.preventDefault(), s.dispatch(s.state.replaceSelection(f)), false;
          },
          keydown: (i, s) => {
            var _a3;
            if (!s) return;
            if (Ei(i, s)) return i.preventDefault(), i.stopPropagation(), true;
            if (Eo(i)) return i.preventDefault(), i.stopPropagation(), vo(s), true;
            const l = on(i);
            if (!l || l === "mod+s") return;
            const f = ((_a3 = J.current) == null ? void 0 : _a3.snippets) || [], g = Ge(l), v = f.find((T) => Ge(T.prefix) === g && (T.body || "").trim());
            if (v) return i.preventDefault(), i.stopPropagation(), s.dispatch(s.state.replaceSelection(v.body)), false;
          }
        }), true) : false;
      };
      if (!t()) {
        const n = setTimeout(t, 100);
        return () => clearTimeout(n);
      }
    }, [
      o,
      p,
      b,
      L
    ]), a.useEffect(() => {
      if (o) return;
      const t = (n) => {
        var _a2, _b2, _c, _d, _e2, _f;
        const i = on(n);
        if (!i || i === "mod+s") return;
        const l = (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2);
        if (!l) return;
        const m = E.current, f = n.target;
        if (!(m == null ? void 0 : m.contains(f)) && !((_d = l.dom) == null ? void 0 : _d.contains(f))) return;
        const v = ((_e2 = J.current) == null ? void 0 : _e2.snippets) || [], T = Ge(i), z = v.find((j) => Ge(j.prefix) === T && (j.body || "").trim());
        z && (n.preventDefault(), n.stopPropagation(), (_f = n.stopImmediatePropagation) == null ? void 0 : _f.call(n), l.dispatch(l.state.replaceSelection(z.body)));
      };
      return document.addEventListener("keydown", t, true), () => document.removeEventListener("keydown", t, true);
    }, [
      o,
      M
    ]), a.useEffect(() => {
      if (typeof u != "function") return;
      const t = (n) => {
        var _a2, _b2, _c, _d, _e2;
        if (!(n.ctrlKey || n.metaKey) || n.altKey || n.key !== "s" && n.key !== "S" && n.code !== "KeyS") return;
        const i = E.current;
        if (!i) return;
        const s = n.target, l = s instanceof Node && i.contains(s), m = i.querySelector(".md-editor-preview"), f = (_a2 = window.getSelection) == null ? void 0 : _a2.call(window), g = !!(m && (f == null ? void 0 : f.rangeCount) && m.contains(f.getRangeAt(0).commonAncestorContainer));
        if (!l && !g && !He(m)) return;
        n.preventDefault(), n.stopPropagation(), (_b2 = n.stopImmediatePropagation) == null ? void 0 : _b2.call(n);
        const T = (_e2 = (_d = ((_c = C.current) == null ? void 0 : _c.value) ?? C.current) == null ? void 0 : _d.getEditorView) == null ? void 0 : _e2.call(_d);
        yi(T), u();
      };
      return document.addEventListener("keydown", t, true), () => document.removeEventListener("keydown", t, true);
    }, [
      u
    ]), a.useEffect(() => {
      const t = E.current;
      if (!t) return;
      const n = (i) => {
        var _a2, _b2, _c, _d, _e2, _f, _g, _h, _i2;
        const s = t.querySelector(".md-editor-preview"), l = (_b2 = (_a2 = i.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, "table");
        if (l && s && s.contains(l) || s && (Ft(s, i.clientX, i.clientY) || Bt(i.clientX, i.clientY))) return;
        const m = (_d = (_c = i.target) == null ? void 0 : _c.closest) == null ? void 0 : _d.call(_c, ".cm-editor");
        if (m && t.contains(m)) {
          const z = (_g = (_f = ((_e2 = C.current) == null ? void 0 : _e2.value) ?? C.current) == null ? void 0 : _f.getEditorView) == null ? void 0 : _g.call(_f);
          if (z) {
            const { from: j, to: ne } = z.state.selection.main, w = G.current ?? "";
            if (Rr(w, j, ne)) {
              i.preventDefault(), Se.current(j, ne);
              return;
            }
          }
        }
        const f = (_i2 = (_h = i.target) == null ? void 0 : _h.closest) == null ? void 0 : _i2.call(_h, "img[data-wiki-path], img[data-md-src]");
        if (!f || !t.contains(f)) return;
        const g = Mr(f);
        if (!g.kind || !g.key) return;
        i.preventDefault();
        const v = g.kind === "wiki" ? Tr(t, f, g.key) : Ar(t, f, g.key);
        Pe({
          kind: g.kind,
          key: g.key,
          width: g.width,
          height: g.height,
          occurrence: v,
          imageSrc: f.currentSrc || f.src || ""
        });
      };
      return t.addEventListener("contextmenu", n), () => t.removeEventListener("contextmenu", n);
    }, [
      Z
    ]), a.useEffect(() => {
      const t = E.current;
      if (!t) return;
      const n = (i) => {
        var _a2, _b2, _c, _d;
        if ((_b2 = (_a2 = i.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
        const s = t.querySelector(".md-editor-preview"), l = (_d = (_c = i.target) == null ? void 0 : _c.closest) == null ? void 0 : _d.call(_c, "table");
        if (!l || !s || !s.contains(l)) return;
        i.preventDefault(), i.stopPropagation(), Ae.current(l, s) || Z({
          title: "No table",
          message: "No haim-table found at this position. Click inside a table cell and try again."
        });
      };
      return t.addEventListener("dblclick", n, true), () => t.removeEventListener("dblclick", n, true);
    }, [
      Z
    ]), a.useEffect(() => {
      const t = E.current;
      if (t) return Do(t);
    }, []), a.useEffect(() => {
      const t = () => {
        Qe((n) => n + 1);
      };
      return window.addEventListener(It, t), () => {
        window.removeEventListener(It, t);
      };
    }, []), a.useEffect(() => {
      const t = E.current;
      if (!t) return;
      const n = (l) => {
        (l.classList.contains("md-note-cover-placeholder--ready") || l.classList.contains("md-note-cover-placeholder--empty") || l.classList.contains("md-note-cover-placeholder--pending")) && rt(true);
      }, i = (l) => {
        var _a2, _b2, _c, _d, _e2, _f;
        const m = (_b2 = (_a2 = l.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, "[data-note-cover-placeholder]");
        if (m && t.contains(m)) {
          l.preventDefault(), l.stopPropagation(), n(m);
          return;
        }
        const f = (_d = (_c = l.target) == null ? void 0 : _c.closest) == null ? void 0 : _d.call(_c, "[data-chat-saved-note]");
        if (f && t.contains(f)) {
          l.preventDefault(), l.stopPropagation(), oe(Pr({
            id: f.getAttribute("data-chat-id") || "",
            href: f.getAttribute("data-chat-href") || f.getAttribute("href") || ""
          }));
          return;
        }
        const g = (_f = (_e2 = l.target) == null ? void 0 : _e2.closest) == null ? void 0 : _f.call(_e2, "a[href]");
        if (!g || !t.contains(g) || l.metaKey || l.ctrlKey || l.shiftKey || l.altKey || typeof l.button == "number" && l.button !== 0 || g.hasAttribute("data-md-footnote-to")) return;
        const v = g.getAttribute("href") || "", T = Lr(v, {
          currentViewPath: (d == null ? void 0 : d.type) ? d.id : null
        });
        if (T.kind !== "app") return;
        if (l.preventDefault(), l.stopPropagation(), T.viewPath && typeof W == "function") {
          W(T.viewPath);
          return;
        }
        const z = T.search || "", j = T.hash || "";
        oe(`${T.pathname || "/"}${z}${j}`);
      }, s = (l) => {
        var _a2, _b2;
        if (l.key !== "Enter" && l.key !== " ") return;
        const m = (_b2 = (_a2 = l.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, "[data-note-cover-placeholder]");
        !m || !t.contains(m) || (l.preventDefault(), l.stopPropagation(), n(m));
      };
      return t.addEventListener("click", i), t.addEventListener("keydown", s), () => {
        t.removeEventListener("click", i), t.removeEventListener("keydown", s);
      };
    }, [
      oe,
      d == null ? void 0 : d.id,
      d == null ? void 0 : d.type,
      W
    ]);
    const Ln = a.useCallback(({ width: t, height: n }) => {
      const i = B;
      if (!(i == null ? void 0 : i.key) || typeof H != "function") return;
      const s = i.kind === "wiki" ? lt(e, {
        path: i.key,
        occurrence: i.occurrence ?? 0,
        width: t,
        height: n
      }) : ut(e, {
        src: i.key,
        occurrence: i.occurrence ?? 0,
        width: t,
        height: n
      });
      s.updated && s.markdown !== e && H(s.markdown);
    }, [
      B,
      H,
      e
    ]), Dn = a.useCallback(async ({ file: t }) => {
      var _a2;
      const n = B;
      if (!(n == null ? void 0 : n.key) || typeof p != "function") throw new Error("Upload handler not available.");
      const s = (_a2 = await p([
        t
      ])) == null ? void 0 : _a2[0];
      if (!s) throw new Error("Upload succeeded but no path was returned.");
      if (typeof H != "function") return;
      const l = n.kind === "wiki" ? pr(e, {
        path: n.key,
        occurrence: n.occurrence ?? 0,
        nextPath: s
      }) : jt(e, {
        src: n.key,
        occurrence: n.occurrence ?? 0,
        nextPath: s
      });
      l.updated && l.markdown !== e && H(l.markdown);
    }, [
      H,
      p,
      e,
      B
    ]), Nn = a.useCallback(async ({ width: t, height: n }) => {
      var _a2;
      const i = B;
      if (!(i == null ? void 0 : i.key) || i.kind !== "markdown") throw new Error("Cannot convert: not a markdown image.");
      if (typeof H != "function") throw new Error("Cannot apply change.");
      const s = await hr({
        markdownSrc: i.key,
        displaySrc: i.imageSrc,
        currentNotePath: (d == null ? void 0 : d.id) ?? null
      });
      let l = "";
      if (s.mode === "path") l = s.path;
      else {
        if (typeof p != "function") throw new Error("Upload handler not available.");
        if (l = ((_a2 = await p([
          s.file
        ])) == null ? void 0 : _a2[0]) || "", !l) throw new Error("Upload succeeded but no path was returned.");
      }
      const m = jt(e, {
        src: i.key,
        occurrence: i.occurrence ?? 0,
        nextPath: l,
        width: t,
        height: n
      });
      m.updated && m.markdown !== e && H(m.markdown);
    }, [
      d == null ? void 0 : d.id,
      H,
      p,
      e,
      B
    ]), In = a.useCallback(async ({ width: t, height: n }) => {
      const i = B;
      if (!(i == null ? void 0 : i.key) || !(i == null ? void 0 : i.kind)) throw new Error("Cannot convert: image target is missing.");
      if (typeof H != "function") throw new Error("Cannot apply change.");
      const s = typeof D == "function" ? String(await Promise.resolve(D()) || "").trim() : "";
      if (!s) throw new Error("ImgBB API key is missing. Please add it in settings.");
      const l = gr({
        path: i.key,
        imageSrc: i.imageSrc
      });
      if (!l) throw new Error("Cannot determine image source URL for upload.");
      const f = (await wr({
        apiKey: s,
        image: l,
        name: br(i.key) ? "image" : void 0
      })).url, g = i.occurrence ?? 0;
      let v = e;
      const T = i.kind === "wiki" ? lt(v, {
        path: i.key,
        occurrence: g,
        width: t,
        height: n
      }) : ut(v, {
        src: i.key,
        occurrence: g,
        width: t,
        height: n
      });
      T.updated && (v = T.markdown);
      const z = await yr(v, {
        kind: i.kind === "wiki" ? "wiki" : "markdown",
        key: i.key,
        occurrence: g
      }, f);
      if (!z.updated && v === e) throw new Error("ImgBB upload succeeded but markdown could not be updated.");
      H(z.markdown);
    }, [
      D,
      H,
      e,
      B
    ]);
    a.useEffect(() => {
      if (typeof Q == "function") return Q(async () => {
        if (o) throw new Error("Cannot convert images in preview-only mode.");
        if (typeof H != "function") throw new Error("Cannot apply change.");
        if (!Er(e)) return {
          markdown: e,
          converted: 0,
          failed: []
        };
        const t = await vr(e, {
          currentNotePath: (d == null ? void 0 : d.id) ?? null,
          uploadFiles: async (n) => {
            if (typeof p != "function") throw new Error("Upload handler not available.");
            return p(n);
          }
        });
        return t.markdown !== e && H(t.markdown), t;
      }), () => Q(null);
    }, [
      d == null ? void 0 : d.id,
      H,
      Q,
      p,
      o,
      e
    ]);
    const we = a.useCallback((t) => {
      const n = E.current;
      if (!n || !(t == null ? void 0 : t.kind) || !(t == null ? void 0 : t.key)) return null;
      const i = t.kind === "wiki" ? "img[data-wiki-path]" : "img[data-md-src]";
      return [
        ...n.querySelectorAll(i)
      ].filter((m) => (t.kind === "wiki" ? m.getAttribute("data-wiki-path") : m.getAttribute("data-md-src")) === t.key)[t.occurrence ?? 0] ?? null;
    }, []), Lt = a.useCallback(({ kind: t, key: n, occurrence: i, widthPx: s, heightPx: l }) => {
      if (!n || typeof H != "function") return false;
      const m = Number.isFinite(s) ? `${Math.round(s)}px` : null, f = Number.isFinite(l) ? `${Math.round(l)}px` : null, g = t === "wiki" ? lt(e, {
        path: n,
        occurrence: i,
        width: m,
        height: f
      }) : ut(e, {
        src: n,
        occurrence: i,
        width: m,
        height: f
      });
      return g.updated && g.markdown !== e ? (H(g.markdown), true) : false;
    }, [
      H,
      e
    ]), jn = a.useCallback(() => {
      const t = B;
      if (!(t == null ? void 0 : t.kind) || !(t == null ? void 0 : t.key)) return;
      const n = we(t);
      if (!n) return;
      const i = n.getBoundingClientRect(), s = Math.max(24, Math.round(i.width)), l = Math.max(24, Math.round(i.height)), m = {
        kind: t.kind,
        key: t.key,
        occurrence: t.occurrence ?? 0,
        widthPx: s,
        heightPx: l,
        originalWidthPx: s,
        originalHeightPx: l
      };
      n.style.width = `${s}px`, n.style.height = `${l}px`, ge.current = m, Le(m), xe(false);
    }, [
      we,
      B
    ]);
    a.useEffect(() => {
      if (!ce) {
        nt(null);
        return;
      }
      const t = we(ce);
      if (!t) {
        Le(null), nt(null);
        return;
      }
      let n = 0;
      const i = () => {
        const s = t.getBoundingClientRect();
        nt({
          left: s.left,
          top: s.top,
          width: s.width,
          height: s.height
        }), n = requestAnimationFrame(i);
      };
      return n = requestAnimationFrame(i), () => cancelAnimationFrame(n);
    }, [
      ce,
      we
    ]), a.useEffect(() => {
      if (!ce) return;
      const t = we(ce);
      if (!t) return;
      const n = (l) => {
        var _a2, _b2;
        const m = (_b2 = (_a2 = l.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, "[data-transform-handle]");
        if (!m) return;
        l.preventDefault();
        const f = m.getAttribute("data-transform-handle");
        if (!f) return;
        const g = l.pointerType === "touch", v = ge.current || ce, T = l.clientX, z = l.clientY, j = v.heightPx > 0 ? v.widthPx / v.heightPx : 1, ne = (S) => {
          const K = S.clientX - T, re = S.clientY - z;
          let $ = v.widthPx, V = v.heightPx;
          if (f.includes("e") && ($ = v.widthPx + K), f.includes("w") && ($ = v.widthPx - K), f.includes("s") && (V = v.heightPx + re), f.includes("n") && (V = v.heightPx - re), $ = Math.max(24, $), V = Math.max(24, V), g || S.shiftKey) {
            const $n = Math.abs(($ - v.widthPx) / Math.max(1, v.widthPx)), qn = Math.abs((V - v.heightPx) / Math.max(1, v.heightPx));
            $n >= qn ? V = Math.max(24, $ / Math.max(1e-4, j)) : $ = Math.max(24, V * j);
          }
          $ = Math.max(24, Math.round($)), V = Math.max(24, Math.round(V)), t.style.width = `${$}px`, t.style.height = `${V}px`;
          const Ce = {
            ...ge.current || v,
            widthPx: $,
            heightPx: V
          };
          ge.current = Ce, Le(Ce);
        }, w = () => {
          document.removeEventListener("pointermove", ne, true), document.removeEventListener("pointerup", w, true);
        };
        document.addEventListener("pointermove", ne, true), document.addEventListener("pointerup", w, true);
      }, i = (l) => {
        l.key === "Enter" && (l.preventDefault(), xe(true));
      }, s = (l) => {
        var _a2, _b2, _c, _d;
        const m = (_b2 = (_a2 = l.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, "[data-transform-handle]"), f = (_d = (_c = l.target) == null ? void 0 : _c.closest) == null ? void 0 : _d.call(_c, "img[data-wiki-path], img[data-md-src]");
        m || f === t || xe(true);
      };
      return document.addEventListener("pointerdown", n, true), document.addEventListener("pointerdown", s, true), document.addEventListener("keydown", i, true), () => {
        document.removeEventListener("pointerdown", n, true), document.removeEventListener("pointerdown", s, true), document.removeEventListener("keydown", i, true);
      };
    }, [
      ce,
      we
    ]);
    const Hn = a.useCallback(() => {
      const t = ge.current || ce;
      t && (Lt(t), Le(null), ge.current = null, xe(false));
    }, [
      Lt,
      ce
    ]), On = a.useCallback(() => {
      const t = ge.current || ce;
      if (!t) return;
      const n = we(t);
      n && (n.style.width = `${t.originalWidthPx}px`, n.style.height = `${t.originalHeightPx}px`), Le(null), ge.current = null, xe(false);
    }, [
      we,
      ce
    ]), Ne = a.useCallback((t) => {
      var _a2, _b2, _c, _d;
      const n = String(t || "");
      if (!n) return;
      const i = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current;
      if (typeof (i == null ? void 0 : i.insert) == "function") {
        i.insert(() => ({
          targetValue: n,
          select: false,
          deviationStart: 0,
          deviationEnd: 0
        })), (_b2 = i.focus) == null ? void 0 : _b2.call(i);
        return;
      }
      const s = (_c = i == null ? void 0 : i.getEditorView) == null ? void 0 : _c.call(i);
      s && (s.dispatch(s.state.replaceSelection(n)), (_d = s.focus) == null ? void 0 : _d.call(s));
    }, []), Ie = a.useCallback(async (t) => {
      if (!(t == null ? void 0 : t.length) || typeof p != "function" || b) return;
      const n = await p(t);
      (n == null ? void 0 : n.length) && Ne(`${n.map((i) => `![[${i}]]`).join(`
`)}
`);
    }, [
      Ne,
      b,
      p
    ]);
    a.useEffect(() => {
      R.current = Ie;
    }, [
      Ie
    ]);
    const _n = a.useCallback(async (t) => {
      var _a2;
      if (!t || typeof p != "function") throw new Error("Upload handler not available.");
      const i = (_a2 = await p([
        t
      ])) == null ? void 0 : _a2[0];
      if (!i) throw new Error("Upload succeeded but no path was returned.");
      Ne(`![[${i}]]
`), Ke(null);
    }, [
      Ne,
      p
    ]), qe = a.useCallback(() => {
      var _a2, _b2, _c;
      const n = (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2);
      let i = null;
      if (n) {
        const { from: s, to: l } = n.state.selection.main;
        s !== l && (i = {
          from: s,
          to: l,
          text: n.state.doc.sliceString(s, l)
        });
      }
      ae(i), I(true);
    }, []);
    a.useEffect(() => {
      fe.current = qe;
    }, [
      qe
    ]);
    const Kn = a.useMemo(() => [
      h.jsx(Pi, {
        value: e,
        theme: c,
        currentFile: d,
        language: "ko-KR"
      }, "export-pdf"),
      h.jsx(Li, {
        editorRef: C
      }, "insert-pgbr"),
      h.jsx(Di, {
        onOpen: qe
      }, "heading-remap"),
      h.jsx(Ti, {
        onToggle: () => {
          var _a2;
          (_a2 = ue == null ? void 0 : ue.toggleAssist) == null ? void 0 : _a2.call(ue);
        }
      }, "llm-assist"),
      h.jsx(Ai, {
        onOpen: () => {
          me(true);
        }
      }, "checklist-progress"),
      h.jsx(Ni, {
        checked: it,
        onChange: Tt,
        theme: c
      }, "toc-title-wrap"),
      h.jsx(Ii, {
        checked: At,
        onChange: Pt,
        theme: c
      }, "editor-autocomplete"),
      de ? null : h.jsx(ji, {
        checked: le,
        onChange: Be,
        theme: c
      }, "mirror-edit"),
      h.jsx(Hi, {
        disabled: typeof p != "function",
        onRequestLink: () => xt(true),
        onRequestUpload: (t) => {
          Ie(t);
        },
        onRequestClip: (t) => Ke(t),
        onRequestWhiteboard: () => {
          typeof p == "function" && tt(true);
        }
      }, "image-toolbar")
    ], [
      e,
      c,
      d,
      it,
      Tt,
      At,
      Pt,
      de,
      le,
      Be,
      p,
      Ie,
      qe,
      ue == null ? void 0 : ue.toggleAssist
    ]), Fn = a.useMemo(() => [
      "bold",
      "underline",
      "italic",
      "-",
      "strikeThrough",
      "sub",
      "sup",
      "quote",
      "unorderedList",
      "orderedList",
      "task",
      "-",
      "codeRow",
      "code",
      "link",
      9,
      "table",
      "mermaid",
      "katex",
      1,
      2,
      3,
      4,
      "-",
      "revoke",
      "next",
      0,
      "=",
      6,
      7,
      ...de ? [] : [
        8
      ],
      "pageFullscreen",
      "fullscreen",
      "previewOnly",
      "preview",
      "htmlPreview",
      ...pe ? [
        5
      ] : [],
      "catalog"
    ], [
      pe,
      de
    ]), Bn = a.useMemo(() => {
      if (typeof p == "function") return async (t, n) => {
        if (b) return;
        const i = await p(t);
        (i == null ? void 0 : i.length) && n(i.map((s) => `![[${s}]]`));
      };
    }, [
      p,
      b
    ]);
    return h.jsxs("div", {
      ref: E,
      className: `h-full w-full flex flex-col relative${it ? " toc-titles-wrap" : ""}`,
      style: {
        "--md-catalog-width": `${Ve}px`,
        ...Pn
      },
      ...L ? {} : {
        inert: true
      },
      children: [
        ($e == null ? void 0 : $e.webfontCss) ? h.jsx("style", {
          "data-s3haim-document-webfonts": "1",
          children: $e.webfontCss
        }) : null,
        Fe && zn.createPortal(h.jsx(kr, {
          handleProps: An,
          isResizing: Tn,
          visibleOnHover: true,
          label: "TOC resize handle",
          style: {
            position: "fixed",
            top: Fe.top,
            left: Fe.left,
            height: Fe.height,
            bottom: "auto",
            zIndex: 10003
          }
        }), document.body),
        b && h.jsxs("div", {
          className: "absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center gap-2 py-2 text-sm bg-blue-300/40 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 border-b border-blue-500/20",
          "aria-live": "polite",
          children: [
            h.jsx(Ur, {
              size: 16,
              className: "animate-spin shrink-0"
            }),
            h.jsxs("span", {
              children: [
                "Uploading image... ",
                Math.max(0, Math.min(100, Math.round(O))),
                "%"
              ]
            }),
            typeof k == "function" && h.jsx("button", {
              type: "button",
              onClick: k,
              className: "ml-2 rounded-md border border-blue-600/50 bg-white/80 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-white dark:border-blue-300/40 dark:bg-blue-950/60 dark:text-blue-100 dark:hover:bg-blue-950",
              children: "Cancel"
            })
          ]
        }),
        h.jsxs("div", {
          className: "relative flex min-h-0 min-w-0 flex-1",
          children: [
            h.jsx("div", {
              className: "relative min-h-0 min-w-0 flex-1",
              children: h.jsx(Ps, {
                ref: C,
                id: se,
                modelValue: e,
                onChange: H,
                mdHeadingId: he,
                className: "h-full! max-h-dvh",
                theme: c,
                language: "ko-KR",
                codeTheme: xr,
                customIcon: jo,
                previewOnly: o,
                noMermaid: true,
                autoDetectCode: true,
                scrollAuto: false,
                footers: [
                  "markdownTotal"
                ],
                toolbars: Fn,
                defToolbars: Kn,
                onUploadImg: Bn
              }, `footnotes-${Re}`)
            }),
            h.jsx(uo, {
              open: ke,
              onOpenChange: me,
              markdown: e ?? "",
              onMarkdownChange: H
            })
          ]
        }),
        h.jsx(Ao, {
          containerRef: E,
          enabled: L
        }),
        h.jsx(No, {
          containerRef: E,
          enabled: L
        }),
        h.jsx(pi, {
          isOpen: !!B,
          onClose: () => Pe(null),
          path: (B == null ? void 0 : B.key) ?? "",
          kind: (B == null ? void 0 : B.kind) ?? "wiki",
          initialWidth: (B == null ? void 0 : B.width) ?? "",
          initialHeight: (B == null ? void 0 : B.height) ?? "",
          imageSrc: (B == null ? void 0 : B.imageSrc) ?? "",
          onApply: Ln,
          onStartFreeTransform: jn,
          onCrop: Dn,
          onConvertToWiki: Nn,
          onConvertToImgbb: In
        }, B ? `${B.kind}|${B.key}|${B.width ?? ""}|${B.height ?? ""}|${B.occurrence ?? 0}` : "wiki-image-size-modal"),
        h.jsx(fo, {
          isOpen: Je,
          onClose: () => xt(false),
          onConfirm: ({ desc: t, url: n }) => {
            Ne(`![${t || ""}](${n})
`);
          }
        }),
        h.jsx(Oi, {
          isOpen: xn,
          onClose: () => Ct(false),
          onConfirm: ({ line1: t, line2: n }) => {
            var _a2, _b2, _c, _d, _e2;
            const s = (_c = (_b2 = ((_a2 = C.current) == null ? void 0 : _a2.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c.call(_b2), l = (s == null ? void 0 : s.state.doc.toString()) ?? G.current ?? "", { from: m, to: f } = St.current, g = Cr(l, m, f, t, n);
            s && (s.dispatch({
              changes: {
                from: 0,
                to: s.state.doc.length,
                insert: g.next
              },
              selection: {
                anchor: g.caret
              },
              scrollIntoView: true
            }), (_d = s.focus) == null ? void 0 : _d.call(s)), (_e2 = et.current) == null ? void 0 : _e2.call(et, g.next);
          }
        }),
        h.jsx(mo, {
          isOpen: !!Rt,
          file: Rt,
          onClose: () => Ke(null),
          onConfirm: _n
        }),
        h.jsx(po, {
          isOpen: Cn,
          onClose: () => tt(false),
          disabled: typeof p != "function" || b,
          onConfirm: async (t) => {
            await Ie([
              t
            ]);
          }
        }),
        h.jsx(ui, {
          isOpen: ee.isOpen,
          initialMeta: ((_a = ee.editState) == null ? void 0 : _a.meta) ?? null,
          initialGrid: ((_b = ee.editState) == null ? void 0 : _b.grid) ?? {
            rows: [
              [
                ""
              ]
            ],
            aligns: [
              null
            ]
          },
          onClose: ee.close,
          onSave: ee.apply
        }),
        h.jsx(di, {
          containerRef: E,
          getMarkdown: () => G.current ?? "",
          setMarkdown: (t) => {
            typeof H == "function" ? H(t) : typeof r == "function" && r(t);
          },
          onEditTable: (t, n) => Ae.current(t, n),
          onEditFailed: () => {
            Z({
              title: "? ??",
              message: "? ?? ???? ?? ?? ?????. ??? ??? ??? ??? ???."
            });
          }
        }),
        h.jsx(fi, {
          containerRef: E,
          getMarkdown: () => G.current ?? "",
          setMarkdown: (t) => {
            typeof H == "function" && H(t);
          },
          enabled: !ee.isOpen
        }),
        ce && De && h.jsx("div", {
          className: "fixed z-70 pointer-events-none border-2 border-blue-500",
          style: {
            left: `${De.left}px`,
            top: `${De.top}px`,
            width: `${De.width}px`,
            height: `${De.height}px`
          },
          children: [
            "nw",
            "ne",
            "sw",
            "se"
          ].map((t) => h.jsx("button", {
            type: "button",
            "data-transform-handle": t,
            className: "absolute pointer-events-auto h-3 w-3 rounded-full bg-blue-600 border border-white",
            style: {
              left: t.includes("w") ? "-7px" : "auto",
              right: t.includes("e") ? "-7px" : "auto",
              top: t.includes("n") ? "-7px" : "auto",
              bottom: t.includes("s") ? "-7px" : "auto",
              cursor: t === "nw" || t === "se" ? "nwse-resize" : "nesw-resize"
            },
            "aria-label": `transform-${t}`
          }, t))
        }),
        ce && h.jsxs("button", {
          type: "button",
          onClick: () => xe(true),
          className: "fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm",
          children: [
            h.jsx("span", {
              className: "block font-semibold mb-1",
              children: "Free transform guide"
            }),
            h.jsx("span", {
              className: "block",
              children: "- Shift + drag: keep aspect ratio / plain drag: ignore ratio"
            }),
            h.jsx("span", {
              className: "block",
              children: "- Touch drag: keeps aspect ratio"
            }),
            h.jsx("span", {
              className: "block",
              children: "- Click elsewhere (including this banner): confirm transform"
            })
          ]
        }),
        h.jsx(Ht, {
          isOpen: Rn,
          title: "Cover export",
          message: "You need to open the Export PDF page to export the cover. Continue?",
          confirmLabel: "Continue",
          cancelLabel: "Cancel",
          onConfirm: () => {
            rt(false), Te({
              openCoverEdit: true
            });
          },
          onCancel: () => rt(false)
        }),
        h.jsx(Ht, {
          isOpen: Sn,
          title: "Save transform",
          message: "How would you like to handle the current transform?",
          confirmLabel: "Apply",
          cancelLabel: "Keep editing",
          discardLabel: "Reset transform",
          onConfirm: Hn,
          onCancel: () => xe(false),
          onDiscard: On
        }),
        h.jsx(ho, {
          isOpen: x,
          markdown: e,
          selectedMarkdown: (F == null ? void 0 : F.text) ?? "",
          onClose: () => {
            I(false), ae(null);
          },
          onApply: (t, n) => {
            if (n === "selection" && F) {
              const { from: i, to: s } = F, l = G.current ?? e, m = `${l.slice(0, i)}${t}${l.slice(s)}`;
              m !== l && H(m);
            } else t !== e && H(t);
            I(false), ae(null);
          }
        })
      ]
    });
  };
});
export {
  __tla,
  Ea as default
};
