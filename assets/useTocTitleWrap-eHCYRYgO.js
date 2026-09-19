const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/NoteImageCropperJsPanel-BfyWhtN5.js","assets/vendor-md-editor-D3gQZdJY.js","assets/vendor-react-BwEIQNKH.js","assets/cropPadImage-CUan6XFO.js","assets/index-bQvC9Gon.js","assets/vendor-aws-u6g9QQ6G.js","assets/vendor-lucide-MLE-4ziu.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-CLW0brs2.js","assets/vendor-radix-DOgSp64j.js","assets/vendor-google-genai-Bp0rxPXM.js","assets/index-lzqj4P6y.css"])))=>i.map(i=>d[i]);
import { r as a, j as r, a as zt, __tla as __tla_0 } from "./vendor-react-BwEIQNKH.js";
import { A as Dr, m as zr } from "./vendor-motion-CLW0brs2.js";
import { d as Un, e as Kn, f as qn, g as Xn, h as Yn, A as Gn, i as Ir, j as _r, k as tn, l as nn, S as Pt, a as Lt, b as Or, F as ve, L as Te, c as ot, m as $r, n as Br, o as Hr, p as Fr, I as rn, q as Wr, r as Ur, s as Kr, t as qr, u as on } from "./vendor-radix-DOgSp64j.js";
import { q as Vn, aa as Je, ab as Zn, ac as Jn, ad as ft, ae as fe, af as Qn, ag as Xr, ah as er, ai as Yr, aj as Gr, ak as Vr, t as Zr, al as sn, am as Jr, an as Qr, y as eo, a0 as tr, Y as wt, ao as to, X as yt, ap as no, z as vt, x as ro, aq as nr, ar as At, as as oo, at as rr, au as an, av as so, aw as ao, ax as io, ay as lo, az as co, aA as uo, aB as fo, aC as ln, aD as or, a7 as ho, aE as po, aF as go, aG as mo, aH as xo, aI as sr, aJ as bo, __tla as __tla_1 } from "./index-bQvC9Gon.js";
import { H as kt, T as wo } from "./TableStyleTemplateEditor-Cysd-KtJ.js";
import { L as Ze, i as yo, A as vo, a as ar, j as dt, U as ko, R as Co, X as ir, k as lr, l as cn, m as Ct, n as un, o as So, p as jo, q as Ro, r as dn, s as Eo, t as No, u as To, v as Mo, w as Po, x as _e, y as Lo, I as Ao, z as Do, D as zo } from "./vendor-lucide-MLE-4ziu.js";
import { _ as Io, __tla as __tla_2 } from "./vendor-md-editor-D3gQZdJY.js";
import { g as _o, s as Oo } from "./vendor-image-crop-BDK_XcHP.js";
import { g as $o, c as Bo, o as Ho, a as Fo, b as Wo } from "./cropPadImage-CUan6XFO.js";
let ii, oi, $s, ni, ri, ci, ui, li, si, ei, Xo, Ma, Ko, Zo, Vo, Yo, mr, Jo, xa, ti, wa, _t, Ja, va, di, ai, _n, Qa;
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
  function Uo(e) {
    return {
      leftPct: 0,
      widthPct: 100
    };
  }
  Ko = function(e, t) {
    return !(t > 0) || !Number.isFinite(e) ? 0 : Math.max(0, e) / t * 100;
  };
  Ja = function(e, t, n, s) {
    var _a2;
    const l = Ko(t, n), o = [
      ...e
    ];
    if (o.length === 0) return e;
    const u = [
      ...o
    ].sort((c, p) => c.y - p.y || c.x - p.x);
    let f = ((_a2 = u[0]) == null ? void 0 : _a2.y) ?? 0;
    const h = /* @__PURE__ */ new Map();
    for (const c of u) h.set(c.id, f), f += c.h + l;
    return e.map((c) => {
      const p = h.get(c.id);
      return p == null ? c : {
        ...c,
        y: p
      };
    });
  };
  Qa = function(e, t) {
    return {
      ...e,
      layout: {
        ...e.layout,
        ...t,
        containerWidthPct: 100
      }
    };
  };
  ei = 1.5;
  function fn(e, t, n) {
    return Math.min(n, Math.max(t, e));
  }
  ti = function(e) {
    const t = e % 6 * 3;
    return {
      x: fn(18 + t, 0, 70),
      y: fn(28 + t, 0, 70)
    };
  };
  const qo = "var(--cover-font-scale, 1)";
  function cr(e) {
    return `calc(${Number.isFinite(e) ? e : 16}px * ${qo})`;
  }
  Xo = function(e, t) {
    return {
      boxSizing: "border-box",
      color: e.color,
      fontSize: cr(e.fontSize),
      fontWeight: e.fontWeight,
      textAlign: e.textAlign,
      fontFamily: e.fontFamily || void 0,
      overflow: "hidden",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      overflowWrap: "break-word",
      lineHeight: 1.25,
      ...(t == null ? void 0 : t.strictClip) ? {
        clipPath: "inset(0 0.2em 0.16em 0)"
      } : null
    };
  };
  Yo = function(e) {
    const t = e.type === "ellipse" ? "50%" : e.type === "roundRect" ? `${e.cornerRadiusPct ?? 4}%` : 0;
    return {
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      backgroundColor: e.fill || "transparent",
      borderWidth: Math.max(0, e.borderWidth),
      borderStyle: e.borderStyle || "solid",
      borderColor: e.borderColor || "transparent",
      borderRadius: t
    };
  };
  function Go(e) {
    return e === "middle" ? "center" : e === "bottom" ? "flex-end" : "flex-start";
  }
  Vo = function(e) {
    const t = e.paddingPct ?? 0;
    return {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: Go(e.textVAlign),
      width: "100%",
      height: "100%",
      margin: 0,
      padding: `${t}%`,
      overflow: "hidden"
    };
  };
  Zo = function(e, t) {
    return {
      boxSizing: "border-box",
      width: "100%",
      margin: 0,
      padding: 0,
      border: 0,
      background: "transparent",
      outline: "none",
      resize: "none",
      overflow: "hidden",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      overflowWrap: "break-word",
      lineHeight: 1.25,
      color: e.color || "#0c4a6e",
      fontSize: cr(e.fontSize ?? 24),
      fontWeight: e.fontWeight ?? "normal",
      textAlign: e.textAlign ?? "center",
      fontFamily: e.fontFamily || void 0,
      ...(t == null ? void 0 : t.strictClip) ? {
        clipPath: "inset(0 0.2em 0.16em 0)"
      } : null
    };
  };
  Jo = function(e) {
    if (!e) return null;
    if (e.classList.contains("md-editor-preview")) return e;
    const t = e.querySelector("[data-export-pdf-pages]");
    return t instanceof Element ? t : e.querySelector(".md-editor-preview") ?? e.querySelector("#export-pdf-preview .md-editor-preview") ?? e.querySelector("[data-export-pdf-preview] .md-editor-preview") ?? null;
  };
  function ur(e, t, n) {
    const s = Vn(e);
    if (!s.length) return null;
    const l = [
      ...n.querySelectorAll("table")
    ], o = l.indexOf(t);
    let u = o >= 0 ? s[o] : void 0;
    if (!u) {
      const h = l.filter((c) => c.getAttribute("data-haim-table") === "1").indexOf(t);
      h >= 0 && (u = s.filter((p) => p.meta != null)[h]);
    }
    return !u && s.length === 1 && (u = s[0]), u ?? null;
  }
  function Qo(e, t) {
    const s = Vn(e)[t.tableIndex];
    if (!s) return {
      markdown: e,
      updated: false
    };
    const l = Math.max(48, Math.round(t.widthPx)), o = Math.max(32, Math.round(t.heightPx)), f = {
      ...s.meta ?? Je(),
      width: "fit",
      boxWidth: `${l}px`,
      boxHeight: `${o}px`
    }, h = Zn(e, s, f, s.grid);
    return {
      markdown: h,
      updated: h !== e
    };
  }
  function es(e, t) {
    return [
      ...t.querySelectorAll("table")
    ].indexOf(e);
  }
  function ts(e, t) {
    const n = {};
    for (const [s, l] of Object.entries(e)) {
      const o = ft(s);
      if (!o) continue;
      const u = o.r >= t ? o.r + 1 : o.r;
      n[fe(u, o.c)] = l;
    }
    return n;
  }
  function ns(e, t) {
    const n = {};
    for (const [s, l] of Object.entries(e)) {
      const o = ft(s);
      if (!o) continue;
      const u = o.c >= t ? o.c + 1 : o.c;
      n[fe(o.r, u)] = l;
    }
    return n;
  }
  function rs(e, t) {
    const n = {};
    for (const [s, l] of Object.entries(e)) {
      const o = ft(s);
      if (!o || o.r === t) continue;
      const u = o.r > t ? o.r - 1 : o.r;
      n[fe(u, o.c)] = l;
    }
    return n;
  }
  function os(e, t) {
    const n = {};
    for (const [s, l] of Object.entries(e)) {
      const o = ft(s);
      if (!o || o.c === t) continue;
      const u = o.c > t ? o.c - 1 : o.c;
      n[fe(o.r, u)] = l;
    }
    return n;
  }
  function ss(e, t) {
    return e.map((n) => n.r >= t ? {
      ...n,
      r: n.r + 1
    } : n.r + n.rowspan > t ? {
      ...n,
      rowspan: n.rowspan + 1
    } : n);
  }
  function as(e, t) {
    return e.map((n) => n.c >= t ? {
      ...n,
      c: n.c + 1
    } : n.c + n.colspan > t ? {
      ...n,
      colspan: n.colspan + 1
    } : n);
  }
  function Oe(e) {
    return e.rowspan < 1 || e.colspan < 1 || e.rowspan === 1 && e.colspan === 1 ? null : e;
  }
  function is(e, t) {
    const n = [];
    for (const s of e) {
      if (s.r > t) {
        const l = Oe({
          ...s,
          r: s.r - 1
        });
        l && n.push(l);
        continue;
      }
      if (s.r === t) {
        if (s.rowspan <= 1) continue;
        const l = Oe({
          ...s,
          rowspan: s.rowspan - 1
        });
        l && n.push(l);
        continue;
      }
      if (s.r < t && s.r + s.rowspan > t) {
        const l = Oe({
          ...s,
          rowspan: s.rowspan - 1
        });
        l && n.push(l);
        continue;
      }
      n.push(s);
    }
    return n;
  }
  function ls(e, t) {
    const n = [];
    for (const s of e) {
      if (s.c > t) {
        const l = Oe({
          ...s,
          c: s.c - 1
        });
        l && n.push(l);
        continue;
      }
      if (s.c === t) {
        if (s.colspan <= 1) continue;
        const l = Oe({
          ...s,
          colspan: s.colspan - 1
        });
        l && n.push(l);
        continue;
      }
      if (s.c < t && s.c + s.colspan > t) {
        const l = Oe({
          ...s,
          colspan: s.colspan - 1
        });
        l && n.push(l);
        continue;
      }
      n.push(s);
    }
    return n;
  }
  function cs(e, t, n) {
    const s = t.merges.filter((f) => f.r === n && f.rowspan > 1);
    if (s.length === 0) return {
      grid: e,
      meta: t
    };
    const l = e.rows.map((f) => [
      ...f
    ]), o = {
      ...t.cells
    }, u = n + 1;
    for (const f of s) {
      const h = l[n], c = l[u];
      if (!h || !c) continue;
      for (; c.length <= f.c; ) c.push("");
      for (; h.length <= f.c; ) h.push("");
      const p = h[f.c] ?? "";
      p && (c[f.c] = p, h[f.c] = "");
      const v = fe(n, f.c), C = fe(u, f.c), w = o[v];
      w && (o[C] = {
        ...w
      }, delete o[v]);
    }
    return {
      grid: {
        rows: l,
        aligns: [
          ...e.aligns
        ]
      },
      meta: {
        ...t,
        cells: o
      }
    };
  }
  function us(e, t, n) {
    const s = t.merges.filter((u) => u.c === n && u.colspan > 1);
    if (s.length === 0) return {
      grid: e,
      meta: t
    };
    const l = e.rows.map((u) => [
      ...u
    ]), o = {
      ...t.cells
    };
    for (const u of s) {
      const f = l[u.r];
      if (!f) continue;
      for (; f.length <= u.c + 1; ) f.push("");
      const h = f[u.c] ?? "";
      h && (f[u.c + 1] = h, f[u.c] = "");
      const c = fe(u.r, n), p = fe(u.r, n + 1), v = o[c];
      v && (o[p] = {
        ...v
      }, delete o[c]);
    }
    return {
      grid: {
        rows: l,
        aligns: [
          ...e.aligns
        ]
      },
      meta: {
        ...t,
        cells: o
      }
    };
  }
  function ds(e, t, n) {
    const s = Math.max(1, ...e.rows.map((p) => p.length), e.aligns.length, 1), l = e.rows.length, o = Math.max(0, Math.min(n, l)), u = Array.from({
      length: s
    }, () => ""), f = [
      ...e.rows.slice(0, o),
      u,
      ...e.rows.slice(o)
    ];
    let h = t.headerRows, c = t.footerRows;
    return o < h ? h += 1 : c > 0 && o >= l - c && (c += 1), {
      grid: {
        rows: f,
        aligns: [
          ...e.aligns
        ]
      },
      meta: (() => {
        var _a2;
        const p = {
          ...t,
          headerRows: h,
          footerRows: c,
          merges: ss(t.merges, o),
          cells: ts(t.cells, o)
        };
        if ((_a2 = t.rowHeights) == null ? void 0 : _a2.length) {
          const v = Jn(t.rowHeights, o);
          v && (p.rowHeights = v);
        }
        return p;
      })()
    };
  }
  function fs(e, t, n) {
    const s = Math.max(1, ...e.rows.map((f) => f.length), e.aligns.length, 1), l = Math.max(0, Math.min(n, s)), o = e.rows.map((f) => {
      const h = [
        ...f
      ];
      for (; h.length < s; ) h.push("");
      return h.splice(l, 0, ""), h;
    });
    o.length === 0 && o.push(Array.from({
      length: s + 1
    }, () => ""));
    const u = [
      ...e.aligns
    ];
    for (; u.length < s; ) u.push(null);
    return u.splice(l, 0, null), {
      grid: {
        rows: o,
        aligns: u
      },
      meta: (() => {
        var _a2;
        const f = {
          ...t,
          merges: as(t.merges, l),
          cells: ns(t.cells, l)
        };
        if ((_a2 = t.colWidths) == null ? void 0 : _a2.length) {
          const h = Jn(t.colWidths, l);
          h && (f.colWidths = h);
        }
        return f;
      })()
    };
  }
  function hs(e, t, n) {
    var _a2;
    const s = e.rows.length;
    if (s <= 1) return {
      grid: e,
      meta: t
    };
    if (n < 0 || n >= s) return {
      grid: e,
      meta: t
    };
    const l = cs(e, t, n), o = [
      ...l.grid.rows.slice(0, n),
      ...l.grid.rows.slice(n + 1)
    ];
    let u = l.meta.headerRows, f = l.meta.footerRows;
    n < u ? u = Math.max(0, u - 1) : f > 0 && n >= s - f && (f = Math.max(0, f - 1));
    const h = o.length;
    u + f > h && (f = Math.max(0, h - u));
    const c = {
      ...l.meta,
      headerRows: u,
      footerRows: f,
      merges: is(l.meta.merges, n),
      cells: rs(l.meta.cells, n)
    };
    if ((_a2 = l.meta.rowHeights) == null ? void 0 : _a2.length) {
      const p = Qn(l.meta.rowHeights, n);
      p ? c.rowHeights = p : delete c.rowHeights;
    }
    return {
      grid: {
        rows: o,
        aligns: [
          ...l.grid.aligns
        ]
      },
      meta: c
    };
  }
  function ps(e, t, n) {
    var _a2;
    const s = Math.max(1, ...e.rows.map((h) => h.length), e.aligns.length, 1);
    if (s <= 1) return {
      grid: e,
      meta: t
    };
    if (n < 0 || n >= s) return {
      grid: e,
      meta: t
    };
    const l = us(e, t, n), o = l.grid.rows.map((h) => {
      const c = [
        ...h
      ];
      for (; c.length < s; ) c.push("");
      return c.splice(n, 1), c;
    }), u = [
      ...l.grid.aligns
    ];
    for (; u.length < s; ) u.push(null);
    u.splice(n, 1);
    const f = {
      ...l.meta,
      merges: ls(l.meta.merges, n),
      cells: os(l.meta.cells, n)
    };
    if ((_a2 = l.meta.colWidths) == null ? void 0 : _a2.length) {
      const h = Qn(l.meta.colWidths, n);
      h ? f.colWidths = h : delete f.colWidths;
    }
    return {
      grid: {
        rows: o,
        aligns: u
      },
      meta: f
    };
  }
  function gs(e, t, n) {
    const s = [
      ...new Set(n.filter((o) => Number.isInteger(o) && o >= 0))
    ].sort((o, u) => u - o);
    let l = {
      grid: e,
      meta: t
    };
    for (const o of s) {
      if (l.grid.rows.length <= 1) break;
      l = hs(l.grid, l.meta, o);
    }
    return l;
  }
  function ms(e, t, n) {
    const s = [
      ...new Set(n.filter((o) => Number.isInteger(o) && o >= 0))
    ].sort((o, u) => u - o);
    let l = {
      grid: e,
      meta: t
    };
    for (const o of s) {
      if (Math.max(1, ...l.grid.rows.map((f) => f.length), l.grid.aligns.length, 1) <= 1) break;
      l = ps(l.grid, l.meta, o);
    }
    return l;
  }
  const xs = "data-md-footnote-title", bs = 250, ws = 120, ys = {
    duration: 0.18,
    ease: [
      0.22,
      1,
      0.36,
      1
    ]
  }, vs = "z-100050 max-w-[min(92vw,320px)] origin-(--radix-tooltip-content-transform-origin) rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
  function st(e, t) {
    if (!(e instanceof Element)) return null;
    const n = e.closest(".footnote-ref-link");
    return !(n instanceof HTMLElement) || !t.contains(n) ? null : n;
  }
  function hn(e) {
    var _a2;
    return ((_a2 = e.getAttribute(xs)) == null ? void 0 : _a2.trim()) || "";
  }
  function pn(e) {
    const t = e.getBoundingClientRect(), n = Number.parseFloat(window.getComputedStyle(e).fontSize) || 16, l = !!e.querySelector("sup.footnote-ref") ? n * 0.9 : 0;
    return {
      top: t.top - l,
      left: t.left,
      width: Math.max(t.width, 1),
      height: Math.max(t.height + l, 1)
    };
  }
  ni = function({ containerRef: e, rootEl: t = null }) {
    const [n, s] = a.useState(null), [l, o] = a.useState(null), u = a.useRef(null), f = a.useRef(0), h = a.useRef(null), c = a.useCallback(() => {
      u.current != null && (clearTimeout(u.current), u.current = null);
    }, []), p = a.useCallback(() => {
      c(), h.current && (f.current = Date.now()), h.current = null, s(null), o(null);
    }, [
      c
    ]), v = a.useCallback((w, y) => {
      const R = {
        el: w,
        text: y
      }, O = () => {
        h.current = R, s(R), o(pn(w));
      };
      if (c(), h.current) {
        O();
        return;
      }
      const $ = Date.now() - f.current < ws ? 0 : bs;
      if ($ === 0) {
        O();
        return;
      }
      u.current = setTimeout(() => {
        u.current = null, O();
      }, $);
    }, [
      c
    ]);
    a.useEffect(() => {
      const w = t ?? e.current;
      if (!w) return;
      const y = (A) => {
        var _a2;
        const P = st(A.target, w);
        if (!P) return;
        const S = hn(P);
        if (!S) {
          p();
          return;
        }
        ((_a2 = h.current) == null ? void 0 : _a2.el) === P && h.current.text === S || v(P, S);
      }, R = (A) => {
        var _a2;
        const P = st(A.target, w);
        if (!P) return;
        const S = A.relatedTarget;
        S instanceof Node && P.contains(S) || (((_a2 = h.current) == null ? void 0 : _a2.el) === P || u.current != null) && p();
      }, O = (A) => {
        const P = st(A.target, w);
        if (!P) return;
        const S = hn(P);
        S && v(P, S);
      }, E = (A) => {
        var _a2;
        const P = st(A.target, w);
        if (!P) return;
        const S = A.relatedTarget;
        S instanceof Node && P.contains(S) || ((_a2 = h.current) == null ? void 0 : _a2.el) === P && p();
      }, $ = () => {
        p();
      };
      return w.addEventListener("pointerover", y), w.addEventListener("pointerout", R), w.addEventListener("focusin", O), w.addEventListener("focusout", E), w.addEventListener("pointerdown", $), () => {
        c(), w.removeEventListener("pointerover", y), w.removeEventListener("pointerout", R), w.removeEventListener("focusin", O), w.removeEventListener("focusout", E), w.removeEventListener("pointerdown", $);
      };
    }, [
      p,
      c,
      e,
      t,
      v
    ]), a.useLayoutEffect(() => {
      var _a2;
      if (!(n == null ? void 0 : n.el)) {
        o(null);
        return;
      }
      const w = () => {
        if (!n.el.isConnected) {
          p();
          return;
        }
        o(pn(n.el));
      };
      w();
      const R = (_a2 = t ?? e.current) == null ? void 0 : _a2.querySelector(".md-editor-preview");
      return window.addEventListener("resize", w), window.addEventListener("scroll", w, true), R == null ? void 0 : R.addEventListener("scroll", w, {
        passive: true
      }), () => {
        window.removeEventListener("resize", w), window.removeEventListener("scroll", w, true), R == null ? void 0 : R.removeEventListener("scroll", w);
      };
    }, [
      n,
      p,
      e,
      t
    ]);
    const C = !!(n && l && n.text);
    return r.jsx(Un, {
      delayDuration: 0,
      skipDelayDuration: 0,
      disableHoverableContent: true,
      children: r.jsxs(Kn, {
        open: C,
        onOpenChange: (w) => {
          w || p();
        },
        children: [
          r.jsx(qn, {
            asChild: true,
            children: r.jsx("span", {
              "aria-hidden": true,
              className: "pointer-events-none fixed z-100049",
              style: l ? {
                top: l.top,
                left: l.left,
                width: Math.max(l.width, 1),
                height: Math.max(l.height, 1)
              } : {
                top: 0,
                left: 0,
                width: 1,
                height: 1,
                opacity: 0
              }
            })
          }),
          r.jsx(Dr, {
            children: C ? r.jsx(Xn, {
              forceMount: true,
              children: r.jsx(Yn, {
                asChild: true,
                side: "top",
                sideOffset: 6,
                children: r.jsxs(zr.div, {
                  className: vs,
                  initial: {
                    opacity: 0,
                    y: 6,
                    scale: 0.94
                  },
                  animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1
                  },
                  exit: {
                    opacity: 0,
                    y: 3,
                    scale: 0.97
                  },
                  transition: ys,
                  children: [
                    n == null ? void 0 : n.text,
                    r.jsx(Gn, {
                      className: "fill-white dark:fill-odp-surface"
                    })
                  ]
                })
              })
            }) : null
          })
        ]
      })
    });
  };
  const dr = new Xr("s3haim-image-crop-undo-history");
  dr.version(1).stores({
    histories: "key, updatedAt"
  });
  const It = dr.histories, gn = 60, ks = 350;
  function Cs(e) {
    const t = e.length > 96 ? `${e.slice(0, 48)}:${e.length}` : e, n = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    return `crop:${t}:${n}`;
  }
  function St(e) {
    return JSON.stringify(e);
  }
  function mn(e) {
    try {
      const t = JSON.parse(e);
      return !t || typeof t != "object" || !t.crop || typeof t.crop.x != "number" || typeof t.crop.y != "number" || typeof t.zoom != "number" || typeof t.lockRatio != "boolean" || typeof t.keepTransparency != "boolean" ? null : t;
    } catch {
      return null;
    }
  }
  function fr(e) {
    return !Array.isArray(e) || e.length === 0 ? [] : e.length <= gn ? e : e.slice(e.length - gn);
  }
  async function Ss({ key: e, stack: t, index: n }) {
    if (!e) return;
    const s = fr(t), l = Math.max(0, Math.min(n ?? s.length - 1, s.length - 1));
    await It.put({
      key: e,
      stack: s,
      index: l,
      updatedAt: Date.now()
    });
  }
  async function xn(e) {
    e && await It.delete(e);
  }
  async function js() {
    await It.clear();
  }
  function Rs(e, t, n) {
    const s = Array.isArray(e) && e.length > 0 ? e : [];
    if (s.length === 0) return {
      stack: [
        n
      ],
      index: 0,
      changed: true
    };
    const l = Math.max(0, Math.min(t, s.length - 1));
    if (s[l] === n) return {
      stack: s,
      index: l,
      changed: false
    };
    const o = s.slice(0, l + 1);
    o.push(n);
    const u = fr(o);
    return {
      stack: u,
      index: u.length - 1,
      changed: true
    };
  }
  function Es({ enabled: e, imageSrc: t, getSnapshot: n, applySnapshot: s }) {
    const l = a.useRef([]), o = a.useRef(0), u = a.useRef(false), f = a.useRef(null), h = a.useRef(null), c = a.useRef(null), p = a.useRef(null), v = a.useRef(false), C = a.useRef(false), w = a.useRef(n), y = a.useRef(s);
    w.current = n, y.current = s;
    const [R, O] = a.useState(0), E = a.useCallback(() => O((D) => D + 1), []), $ = a.useCallback(() => {
      f.current && (clearTimeout(f.current), f.current = null), h.current && (clearTimeout(h.current), h.current = null);
    }, []), A = a.useCallback((D, W, I) => {
      v.current || p.current !== D || (h.current && clearTimeout(h.current), h.current = setTimeout(() => {
        h.current = null, !(v.current || p.current !== D) && Ss({
          key: D,
          stack: W,
          index: I
        }).then(() => {
          (v.current || p.current !== D) && xn(D).catch(() => {
          });
        }).catch((G) => {
          console.warn("[image-crop-undo] save failed:", G);
        });
      }, 200));
    }, []), P = a.useCallback(() => {
      f.current && (clearTimeout(f.current), f.current = null);
      const D = p.current, W = c.current;
      if (!D || W == null || v.current) return;
      c.current = null;
      const I = Rs(l.current, o.current, W);
      I.changed && (l.current = I.stack, o.current = I.index, A(D, I.stack, I.index), E());
    }, [
      E,
      A
    ]);
    a.useEffect(() => {
      if (!t) return;
      v.current = false, $();
      const D = Cs(t);
      return p.current = D, l.current = [], o.current = 0, c.current = null, C.current = false, E(), () => {
        v.current = true, $(), c.current = null;
        const W = p.current;
        p.current = null, l.current = [], o.current = 0, C.current = false, (async () => {
          try {
            W && await xn(W), await js();
          } catch {
          }
        })();
      };
    }, [
      e,
      t,
      E,
      $
    ]);
    const S = a.useCallback(() => {
      if (v.current || C.current) return;
      const D = p.current;
      if (!D) return;
      const W = St(w.current());
      l.current = [
        W
      ], o.current = 0, C.current = true, A(D, l.current, o.current), E();
    }, [
      E,
      e,
      A
    ]), H = a.useCallback(() => {
      v.current || u.current || !C.current || !p.current || (c.current = St(w.current()), f.current && clearTimeout(f.current), f.current = setTimeout(() => {
        f.current = null, P();
      }, ks));
    }, [
      e,
      P
    ]), j = a.useCallback(() => {
      v.current || u.current || !C.current || !p.current || (c.current = St(w.current()), P());
    }, [
      e,
      P
    ]), F = a.useCallback(() => {
      if (P(), o.current <= 0) return false;
      o.current -= 1;
      const D = l.current[o.current], W = D ? mn(D) : null;
      if (!W) return false;
      u.current = true, y.current(W);
      const I = p.current;
      return I && A(I, l.current, o.current), E(), requestAnimationFrame(() => {
        u.current = false;
      }), true;
    }, [
      E,
      P,
      A
    ]), Y = a.useCallback(() => {
      if (P(), o.current >= l.current.length - 1) return false;
      o.current += 1;
      const D = l.current[o.current], W = D ? mn(D) : null;
      if (!W) return false;
      u.current = true, y.current(W);
      const I = p.current;
      return I && A(I, l.current, o.current), E(), requestAnimationFrame(() => {
        u.current = false;
      }), true;
    }, [
      E,
      P,
      A
    ]), K = C.current && o.current > 0, M = C.current && o.current < l.current.length - 1;
    return {
      ensureBaseline: S,
      recordSoon: H,
      recordNow: j,
      undo: F,
      redo: Y,
      canUndo: K,
      canRedo: M
    };
  }
  const Ns = a.lazy(() => Io(() => import("./NoteImageCropperJsPanel-BfyWhtN5.js").then(async (m) => {
    await m.__tla;
    return m;
  }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]))), ke = 48, Ts = 1.5, Ms = 0.08, bn = "relative h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent bg-gray-300 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:bg-blue-600 dark:bg-odp-borderStrong dark:data-[state=checked]:bg-blue-500", wn = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Ps = {
    backgroundColor: "#ffffff",
    backgroundImage: [
      "linear-gradient(45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)",
      "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"
    ].join(","),
    backgroundSize: "16px 16px",
    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px"
  }, Ls = [
    {
      id: "n",
      className: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize"
    },
    {
      id: "s",
      className: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize"
    },
    {
      id: "e",
      className: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-ew-resize"
    },
    {
      id: "w",
      className: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize"
    },
    {
      id: "ne",
      className: "right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize"
    },
    {
      id: "nw",
      className: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize"
    },
    {
      id: "se",
      className: "right-0 bottom-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize"
    },
    {
      id: "sw",
      className: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize"
    }
  ];
  function yn(e, t, n) {
    return {
      width: Math.min(t, Math.max(ke, e.width)),
      height: Math.min(n, Math.max(ke, e.height))
    };
  }
  function As(e, t, n, s) {
    const l = s.width / 2, o = s.height / 2;
    let u = t, f = n;
    return e.includes("e") && (u = t + l), e.includes("w") && (u = t - l), e.includes("s") && (f = n + o), e.includes("n") && (f = n - o), {
      x: u,
      y: f
    };
  }
  function Ds(e, t, n, s, l, o, u) {
    const f = s - t, h = l - n;
    let c = o.width, p = o.height;
    if (e === "e" || e === "w" ? c = Math.abs(f) * 2 : (e === "n" || e === "s" || (c = Math.abs(f) * 2), p = Math.abs(h) * 2), u && o.height > 0) {
      const v = o.width / o.height;
      if (e === "e" || e === "w") p = c / v;
      else if (e === "n" || e === "s") c = p * v;
      else {
        const C = e.includes("e") ? 1 : -1, w = e.includes("s") ? 1 : -1, y = (f * C * v + h * w) / (v * v + 1);
        c = Math.abs(y) * v * 2, p = Math.abs(y) * 2;
      }
    }
    return {
      width: c,
      height: p
    };
  }
  function zs(e) {
    return e.width > e.height ? e.width / e.naturalWidth : e.height / e.naturalHeight;
  }
  function Is(e, t) {
    const n = [
      {
        left: e.originX,
        right: e.originX + e.cellWidth,
        top: e.originY,
        bottom: e.originY + e.cellHeight
      }
    ];
    return t && (Math.abs(t.x - e.originX) > 0.5 || Math.abs(t.y - e.originY) > 0.5 || Math.abs(t.width - e.cellWidth) > 0.5 || Math.abs(t.height - e.cellHeight) > 0.5) && n.push({
      left: t.x,
      right: t.x + t.width,
      top: t.y,
      bottom: t.y + t.height
    }), n;
  }
  function _s(e) {
    return Math.max(16, Math.min(e.width, e.height) * Ms);
  }
  function at(e, t, n) {
    let s = null, l = n;
    for (const o of t) {
      const u = Math.abs(e - o);
      u <= l && (s = o, l = u);
    }
    return s;
  }
  function vn(e, t, n = 0.5) {
    return Math.abs(e.x - t.x) < n && Math.abs(e.y - t.y) < n && Math.abs(e.width - t.width) < n && Math.abs(e.height - t.height) < n;
  }
  function Os(e, t, n, s) {
    const l = Is(t, n);
    if (l.length === 0) return null;
    const o = _s(e), u = l.flatMap((S) => [
      S.left,
      S.right
    ]), f = l.flatMap((S) => [
      S.top,
      S.bottom
    ]), h = e.x, c = e.x + e.width, p = e.y, v = e.y + e.height;
    if (s === "translate") {
      let S = 0, H = o + 1, j = 0, F = o + 1;
      for (const K of u) for (const M of [
        K - h,
        K - c
      ]) {
        const D = Math.abs(M);
        D < H && (H = D, S = M);
      }
      for (const K of f) for (const M of [
        K - p,
        K - v
      ]) {
        const D = Math.abs(M);
        D < F && (F = D, j = M);
      }
      if (H > o && F > o) return null;
      const Y = {
        x: e.x + (H <= o ? S : 0),
        y: e.y + (F <= o ? j : 0),
        width: e.width,
        height: e.height
      };
      return vn(e, Y) ? null : Y;
    }
    const C = at(h, u, o), w = at(c, u, o), y = at(p, f, o), R = at(v, f, o);
    let O = C ?? h, E = w ?? c, $ = y ?? p, A = R ?? v;
    if (E - O < ke) if (C != null && w == null) E = O + e.width;
    else if (w != null && C == null) O = E - e.width;
    else {
      const S = (h + c) / 2;
      O = S - e.width / 2, E = S + e.width / 2;
    }
    if (A - $ < ke) if (y != null && R == null) A = $ + e.height;
    else if (R != null && y == null) $ = A - e.height;
    else {
      const S = (p + v) / 2;
      $ = S - e.height / 2, A = S + e.height / 2;
    }
    const P = {
      x: O,
      y: $,
      width: E - O,
      height: A - $
    };
    return C == null && w == null && y == null && R == null || vn(e, P) ? null : P;
  }
  $s = function({ imageSrc: e, fileName: t, onCancel: n, onConfirm: s }) {
    const l = a.useRef(null), o = a.useRef(null), u = a.useRef(null), f = a.useRef(null), h = a.useRef(null), c = a.useRef(null), p = a.useRef(false), v = a.useRef(false), C = a.useRef(0), w = a.useRef(false), y = a.useRef(null), [R, O] = a.useState("easy"), [E, $] = a.useState({
      x: 0,
      y: 0
    }), [A, P] = a.useState(1), [S, H] = a.useState(null), [j, F] = a.useState(false), [Y, K] = a.useState(true), [M, D] = a.useState(false), [W, I] = a.useState(""), [G, ee] = a.useState(null), [J, U] = a.useState(null), [T, q] = a.useState(null), [Z, Q] = a.useState(null), [Qe, he] = a.useState(null), te = a.useRef(null), ae = a.useRef(E), ie = a.useRef(A), pe = a.useRef(j), Le = a.useRef(Y), ge = a.useRef(null);
    ae.current = E, ie.current = A, pe.current = j, Le.current = Y;
    const ht = a.useCallback(() => ({
      crop: {
        ...ae.current
      },
      zoom: ie.current,
      cropSize: o.current ? {
        ...o.current
      } : null,
      lockRatio: pe.current,
      keepTransparency: Le.current,
      croppedArea: te.current ? {
        ...te.current
      } : null
    }), []), me = a.useCallback((m) => {
      v.current = true, w.current = false, F(m.lockRatio), pe.current = m.lockRatio, Le.current = m.keepTransparency, m.cropSize ? (o.current = m.cropSize, H(m.cropSize)) : (o.current = null, H(null)), ae.current = m.crop, ie.current = m.zoom, $(m.crop), P(m.zoom), m.croppedArea && (te.current = m.croppedArea), window.requestAnimationFrame(() => {
        v.current = false;
      });
    }, []), xe = a.useCallback((m) => {
      if (m.keepTransparency !== Le.current) {
        ge.current = m, K(m.keepTransparency), F(m.lockRatio);
        return;
      }
      me(m);
    }, [
      me
    ]), { ensureBaseline: le, recordSoon: Ae, recordNow: ne, undo: ce, redo: re } = Es({
      enabled: true,
      imageSrc: e,
      getSnapshot: ht,
      applySnapshot: xe
    }), Ce = a.useCallback((m) => {
      w.current = true, o.current = m, !C.current && (C.current = window.requestAnimationFrame(() => {
        C.current = 0, H(o.current);
      }));
    }, []), Se = a.useCallback((m) => {
      w.current || y.current || v.current || (ae.current = m, $(m), Ae());
    }, [
      Ae
    ]);
    a.useEffect(() => () => {
      C.current && window.cancelAnimationFrame(C.current);
    }, []), a.useEffect(() => {
      R === "easy" && (p.current = false);
    }, [
      R
    ]), a.useEffect(() => {
      O("easy"), $({
        x: 0,
        y: 0
      }), P(1), o.current = null, H(null), F(false), K(true), D(false), I(""), te.current = null, ee(null), u.current = null, f.current = null, h.current = null, p.current = false, w.current = false, ge.current = null, q(null), U(null), Q(null), he(null);
    }, [
      e
    ]), a.useEffect(() => {
      if (!e) return;
      let m = false;
      return $o(e).then((k) => {
        m || Q(k);
      }).catch(() => {
        m || Q(null);
      }), () => {
        m = true;
      };
    }, [
      e
    ]), a.useEffect(() => {
      if (!e) return;
      let m = false;
      const k = Y ? null : "#ffffff";
      return Bo(e, k, {
        padRatio: Ts,
        matteCenter: !!k && !Y
      }).then((L) => {
        if (m) {
          URL.revokeObjectURL(L.src);
          return;
        }
        c.current && URL.revokeObjectURL(c.current), c.current = L.src, f.current = L.meta, p.current = false, U(L.src), q(L.meta);
      }).catch(() => {
        m || (U(e), q(null), f.current = null);
      }), () => {
        m = true;
      };
    }, [
      e,
      Y
    ]), a.useEffect(() => {
      if (!T || !(Z == null ? void 0 : Z.hasTransparentMargin)) {
        h.current = null, he(null);
        return;
      }
      const m = Ho(T, Z);
      h.current = m, he(m);
    }, [
      T,
      Z
    ]), a.useEffect(() => () => {
      c.current && (URL.revokeObjectURL(c.current), c.current = null);
    }, []), a.useEffect(() => {
      if (R !== "easy") return;
      const m = l.current;
      if (!m) return;
      const k = () => {
        const B = m.querySelector(".reactEasyCrop_CropArea");
        ee((X) => X === B ? X : B);
      };
      k();
      const L = new MutationObserver(k);
      return L.observe(m, {
        childList: true,
        subtree: true
      }), () => L.disconnect();
    }, [
      J,
      R
    ]);
    const ye = a.useCallback(() => {
      var _a2, _b;
      const m = l.current, k = G ?? (m == null ? void 0 : m.querySelector(".reactEasyCrop_CropArea")), L = m == null ? void 0 : m.getBoundingClientRect();
      if (!k || !L) return {
        cx: 0,
        cy: 0,
        width: ((_a2 = o.current) == null ? void 0 : _a2.width) ?? 0,
        height: ((_b = o.current) == null ? void 0 : _b.height) ?? 0,
        maxWidth: 480,
        maxHeight: 360
      };
      const B = k.getBoundingClientRect();
      return {
        cx: B.left + B.width / 2,
        cy: B.top + B.height / 2,
        width: B.width,
        height: B.height,
        maxWidth: Math.max(ke, L.width - 16),
        maxHeight: Math.max(ke, L.height - 16)
      };
    }, [
      G
    ]), be = a.useCallback((m, k) => {
      var _a2;
      const L = u.current;
      if (!L) return;
      const B = zs(L), X = (_a2 = l.current) == null ? void 0 : _a2.getBoundingClientRect(), we = Math.max(ke, ((X == null ? void 0 : X.width) ?? L.width) - 16), nt = Math.max(ke, ((X == null ? void 0 : X.height) ?? L.height) - 16), De = !!(k == null ? void 0 : k.fitNatural) || !o.current ? 1 : Math.min(4, Math.max(1, ie.current)), Ue = yn({
        width: m.width * B * De,
        height: m.height * B * De
      }, we, nt);
      o.current = Ue, H(Ue);
      const Ke = _o(m, L, 0, Ue, 1, 4);
      v.current = true, ae.current = Ke.crop, ie.current = Math.min(4, Math.max(1, Ke.zoom)), $(Ke.crop), P(ie.current), te.current = m, window.requestAnimationFrame(() => {
        v.current = false;
      });
    }, []), He = a.useCallback((m, k) => {
      u.current = m;
      const L = ge.current;
      if (L) {
        ge.current = null, p.current = true, me(L);
        return;
      }
      be({
        x: k.originX,
        y: k.originY,
        width: k.cellWidth,
        height: k.cellHeight
      }), window.requestAnimationFrame(() => {
        le(), ne();
      });
    }, [
      be,
      me,
      le,
      ne
    ]), Fe = a.useCallback((m, k) => {
      He(m, k);
    }, [
      He
    ]), je = a.useCallback((m = "translate") => {
      if (v.current) return;
      const k = te.current, L = f.current;
      if (!k || !L) return;
      const B = Os(k, L, h.current, m);
      B && be(B);
    }, [
      be
    ]), We = a.useCallback(() => {
      const m = h.current;
      m && (be(m, {
        fitNatural: true
      }), window.requestAnimationFrame(() => {
        ne();
      }));
    }, [
      be,
      ne
    ]);
    a.useEffect(() => {
      const m = u.current;
      !T || !m || p.current || (p.current = true, Fe(m, T));
    }, [
      T,
      Fe,
      J
    ]);
    const et = a.useCallback((m, k) => {
      te.current = k;
    }, []), pt = a.useCallback((m) => {
      if (y.current || p.current === false && f.current) return;
      const k = o.current;
      k && Math.abs(k.width - m.width) < 0.5 && Math.abs(k.height - m.height) < 0.5 || (o.current = m, H(m));
    }, []);
    a.useEffect(() => {
      const m = (L) => {
        const B = y.current;
        if (!B) return;
        L.preventDefault();
        const X = ye(), we = Ds(B.handle, X.cx, X.cy, L.clientX - B.offsetX, L.clientY - B.offsetY, {
          width: X.width,
          height: X.height
        }, B.lockRatio || L.shiftKey);
        Ce(yn(we, X.maxWidth, X.maxHeight));
      }, k = () => {
        if (!y.current) return;
        y.current = null;
        const L = () => {
          w.current = false, je("resize"), window.requestAnimationFrame(() => {
            ne();
          });
        };
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(L);
        });
      };
      return window.addEventListener("pointermove", m, {
        passive: false
      }), window.addEventListener("pointerup", k), window.addEventListener("pointercancel", k), () => {
        window.removeEventListener("pointermove", m), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k);
      };
    }, [
      Ce,
      ye,
      ne,
      je
    ]), a.useEffect(() => {
      if (R !== "easy") return;
      const m = (k) => {
        if (!(k.metaKey || k.ctrlKey) || k.altKey) return;
        const B = k.key.toLowerCase(), X = B === "z" && !k.shiftKey, we = B === "y" || B === "z" && k.shiftKey;
        !X && !we || (k.preventDefault(), k.stopPropagation(), k.stopImmediatePropagation(), !M && (we ? re() : ce()));
      };
      return window.addEventListener("keydown", m, true), () => window.removeEventListener("keydown", m, true);
    }, [
      M,
      R,
      re,
      ce
    ]);
    const tt = async () => {
      const m = te.current;
      if (!(!m || M || !e)) {
        D(true), I("");
        try {
          const k = (t || "image").replace(/\.[^.]+$/, "") || "image", L = {
            keepTransparency: Y,
            fileName: Y ? `${k}-crop.png` : `${k}-crop.jpg`
          };
          if (f.current) {
            const B = await Fo(e, m, f.current, L);
            await s(B.file, B.area);
          } else {
            const X = await Wo(J || e, m, L);
            await s(X, m);
          }
        } catch (k) {
          I(k instanceof Error ? k.message : String(k)), D(false);
        }
      }
    }, Re = J;
    return r.jsxs("div", {
      className: "flex h-full min-h-0 flex-col gap-3 overflow-y-auto p-6",
      children: [
        r.jsx("h2", {
          className: "shrink-0 text-lg font-bold text-gray-800 dark:text-odp-fgStrong",
          children: "\uC774\uBBF8\uC9C0 \uC790\uB974\uAE30"
        }),
        r.jsxs(Ir, {
          value: R,
          onValueChange: (m) => {
            O(m === "editor" ? "editor" : "easy"), I(""), D(false);
          },
          className: "flex min-h-0 flex-1 flex-col gap-3",
          children: [
            r.jsxs(_r, {
              className: "flex shrink-0 gap-1 rounded-lg border border-gray-200 p-1 dark:border-odp-borderSoft",
              children: [
                r.jsx(tn, {
                  value: "easy",
                  className: "flex-1 rounded-md px-3 py-1.5 text-xs font-medium text-gray-500 outline-none transition data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-odp-muted dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white",
                  children: "\uBAA8\uBC14\uC77C \uC790\uB974\uAE30"
                }),
                r.jsx(tn, {
                  value: "editor",
                  className: "flex-1 rounded-md px-3 py-1.5 text-xs font-medium text-gray-500 outline-none transition data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:text-odp-muted dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white",
                  children: "\uB370\uC2A4\uD06C\uD0D1 \uC790\uB974\uAE30"
                })
              ]
            }),
            r.jsx(nn, {
              value: "editor",
              className: "flex min-h-0 flex-1 flex-col outline-none data-[state=inactive]:hidden",
              children: r.jsx(a.Suspense, {
                fallback: r.jsxs("div", {
                  className: "flex min-h-[240px] flex-1 items-center justify-center text-sm text-neutral-500 dark:text-neutral-300",
                  children: [
                    r.jsx(Ze, {
                      size: 18,
                      className: "mr-2 animate-spin"
                    }),
                    "Cropper.js \uC900\uBE44 \uC911\u2026"
                  ]
                }),
                children: r.jsx(Ns, {
                  imageSrc: e,
                  ...t ? {
                    fileName: t
                  } : {},
                  onCancel: n,
                  onConfirm: s
                })
              })
            }),
            r.jsxs(nn, {
              value: "easy",
              className: "flex min-h-0 flex-1 flex-col gap-3 outline-none data-[state=inactive]:hidden",
              children: [
                r.jsx("p", {
                  className: "shrink-0 text-xs text-gray-500 dark:text-odp-muted",
                  children: "\uBAA8\uC11C\uB9AC\xB7\uBCC0\uC744 \uB4DC\uB798\uADF8\uD574 \uBE44\uC728\uC744 \uC790\uC720\uB86D\uAC8C \uC870\uC808\uD558\uC138\uC694. Shift\uB97C \uB204\uB974\uBA74 \uBE44\uC728\uC774 \uC720\uC9C0\uB429\uB2C8\uB2E4. \uC774\uBBF8\uC9C0 \uBC14\uAE65(\uD22C\uBA85 \uC5EC\uBC31)\uAE4C\uC9C0 \uC798\uB77C \uB4A4\uCABD\uC5D0\uC11C\uBD80\uD130 \uC790\uB97C \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uD22C\uBA85 PNG\uB294 \uC6D0\uBCF8\xB7\uBD88\uD22C\uBA85 \uCF58\uD150\uCE20 \uAC00\uC7A5\uC790\uB9AC\uC5D0 \uAC00\uAE4C\uC774 \uB450\uBA74 \uD06C\uAE30 \uC870\uC808\xB7\uC774\uB3D9 \uBAA8\uB450 \uC790\uB3D9\uC73C\uB85C \uB9DE\uCDA5\uB2C8\uB2E4."
                }),
                r.jsxs("div", {
                  ref: l,
                  className: "relative min-h-[220px] w-full flex-1 overflow-hidden rounded-lg",
                  style: Y ? Ps : {
                    backgroundColor: "#ffffff"
                  },
                  children: [
                    Re ? r.jsx(Oo, {
                      image: Re,
                      crop: E,
                      zoom: A,
                      minZoom: 1,
                      maxZoom: 4,
                      ...S ? {
                        cropSize: S,
                        aspect: S.width / Math.max(1, S.height)
                      } : {},
                      zoomWithScroll: true,
                      showGrid: true,
                      style: {
                        containerStyle: {
                          backgroundColor: "transparent"
                        },
                        cropAreaStyle: {
                          overflow: "visible"
                        }
                      },
                      onCropChange: Se,
                      onZoomChange: (m) => {
                        w.current || y.current || v.current || (ie.current = m, P(m), Ae());
                      },
                      onCropComplete: et,
                      onCropAreaChange: et,
                      onCropSizeChange: pt,
                      onInteractionEnd: () => {
                        je("translate"), window.requestAnimationFrame(() => {
                          ne();
                        });
                      },
                      onMediaLoaded: (m) => {
                        u.current = m;
                        const k = f.current ?? T;
                        p.current || !k || (p.current = true, Fe(m, k));
                      }
                    }) : r.jsxs("div", {
                      className: "flex h-full items-center justify-center text-sm text-neutral-500 dark:text-neutral-300",
                      children: [
                        r.jsx(Ze, {
                          size: 18,
                          className: "mr-2 animate-spin"
                        }),
                        "\uC900\uBE44 \uC911\u2026"
                      ]
                    }),
                    G ? zt.createPortal(Ls.map((m) => r.jsx("button", {
                      type: "button",
                      "aria-label": `crop-handle-${m.id}`,
                      className: `pointer-events-auto absolute z-20 h-3.5 w-3.5 touch-none rounded-sm border border-white bg-blue-500 shadow ${m.className}`,
                      onPointerDown: (k) => {
                        k.preventDefault(), k.stopPropagation(), k.currentTarget.setPointerCapture(k.pointerId);
                        const L = ye(), B = As(m.id, L.cx, L.cy, {
                          width: L.width,
                          height: L.height
                        });
                        w.current = true, o.current = {
                          width: L.width,
                          height: L.height
                        }, y.current = {
                          handle: m.id,
                          offsetX: k.clientX - B.x,
                          offsetY: k.clientY - B.y,
                          lockRatio: j
                        };
                      }
                    }, m.id)), G) : null
                  ]
                }),
                Qe && (Z == null ? void 0 : Z.hasTransparentMargin) ? r.jsxs("button", {
                  type: "button",
                  onClick: We,
                  disabled: M || !Re,
                  className: "inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg",
                  children: [
                    r.jsx(yo, {
                      size: 14
                    }),
                    "\uD22C\uBA85 \uC81C\uC678 \xB7 \uCF58\uD150\uCE20\uC5D0 \uB9DE\uCD94\uAE30"
                  ]
                }) : null,
                r.jsxs("label", {
                  className: "flex items-center gap-2 text-xs text-gray-600 dark:text-odp-muted",
                  children: [
                    r.jsx("span", {
                      className: "shrink-0",
                      children: "\uD655\uB300"
                    }),
                    r.jsx("input", {
                      type: "range",
                      min: 1,
                      max: 4,
                      step: 0.01,
                      value: A,
                      onChange: (m) => {
                        const k = Number(m.target.value);
                        ie.current = k, P(k), Ae();
                      },
                      onPointerUp: () => ne(),
                      onKeyUp: () => ne(),
                      className: "w-full accent-blue-600"
                    })
                  ]
                }),
                r.jsxs("label", {
                  className: "flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
                  children: [
                    r.jsxs("span", {
                      className: "min-w-0",
                      children: [
                        r.jsx("span", {
                          className: "block text-xs font-medium text-gray-800 dark:text-odp-fgStrong",
                          children: "\uBE44\uC728 \uC7A0\uAE08"
                        }),
                        r.jsx("span", {
                          className: "mt-0.5 block text-[10px] text-gray-500 dark:text-odp-muted",
                          children: "\uB044\uBA74 \uAC00\uB85C\xB7\uC138\uB85C\uB97C \uB530\uB85C \uB298\uB824 \uBE44\uC728\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                        })
                      ]
                    }),
                    r.jsx(Pt, {
                      className: bn,
                      checked: j,
                      onCheckedChange: (m) => {
                        const k = !!m;
                        pe.current = k, F(k), window.requestAnimationFrame(() => {
                          ne();
                        });
                      },
                      "aria-label": "\uBE44\uC728 \uC7A0\uAE08",
                      children: r.jsx(Lt, {
                        className: wn
                      })
                    })
                  ]
                }),
                r.jsxs("label", {
                  className: "flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
                  children: [
                    r.jsxs("span", {
                      className: "min-w-0",
                      children: [
                        r.jsx("span", {
                          className: "block text-xs font-medium text-gray-800 dark:text-odp-fgStrong",
                          children: "PNG \uD22C\uBA85 \uBC30\uACBD \uC720\uC9C0"
                        }),
                        r.jsx("span", {
                          className: "mt-0.5 block text-[10px] text-gray-500 dark:text-odp-muted",
                          children: "\uB044\uBA74 \uD770 \uBC30\uACBD JPEG\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4. \uCF1C\uBA74 \uD22C\uBA85 \uC5EC\uBC31\uC744 \uCCB4\uD06C\uBB34\uB2AC\uB85C \uD45C\uC2DC\uD569\uB2C8\uB2E4."
                        })
                      ]
                    }),
                    r.jsx(Pt, {
                      className: bn,
                      checked: Y,
                      onCheckedChange: (m) => {
                        K(!!m);
                      },
                      "aria-label": "PNG \uD22C\uBA85 \uBC30\uACBD \uC720\uC9C0",
                      children: r.jsx(Lt, {
                        className: wn
                      })
                    })
                  ]
                }),
                W ? r.jsx("p", {
                  className: "text-xs text-red-600 dark:text-red-300",
                  children: W
                }) : null,
                r.jsxs("div", {
                  className: "flex justify-end gap-2",
                  children: [
                    r.jsxs("button", {
                      type: "button",
                      onClick: n,
                      disabled: M,
                      className: "inline-flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 hover:bg-gray-200 disabled:opacity-50 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg",
                      children: [
                        r.jsx(vo, {
                          size: 16
                        }),
                        "\uB4A4\uB85C"
                      ]
                    }),
                    r.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        tt();
                      },
                      disabled: M || !Re,
                      className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
                      children: [
                        M ? r.jsx(Ze, {
                          size: 16,
                          className: "animate-spin"
                        }) : r.jsx(ar, {
                          size: 16
                        }),
                        M ? "\uC801\uC6A9 \uC911\u2026" : "\uC790\uB974\uAE30 \uC801\uC6A9"
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  };
  const kn = 80, Bs = 350;
  function Cn(e) {
    return JSON.stringify(e);
  }
  function Sn(e) {
    try {
      const t = JSON.parse(e);
      return !t || typeof t != "object" || !t.meta || typeof t.meta != "object" || !t.grid || !Array.isArray(t.grid.rows) ? null : t;
    } catch {
      return null;
    }
  }
  function Hs(e) {
    return !Array.isArray(e) || e.length === 0 ? [] : e.length <= kn ? e : e.slice(e.length - kn);
  }
  function Fs(e, t, n) {
    const s = Array.isArray(e) && e.length > 0 ? e : [];
    if (s.length === 0) return {
      stack: [
        n
      ],
      index: 0,
      changed: true
    };
    const l = Math.max(0, Math.min(t, s.length - 1));
    if (s[l] === n) return {
      stack: s,
      index: l,
      changed: false
    };
    const o = s.slice(0, l + 1);
    o.push(n);
    const u = Hs(o);
    return {
      stack: u,
      index: u.length - 1,
      changed: true
    };
  }
  function Ws({ enabled: e, historyKey: t, meta: n, grid: s, applySnapshot: l }) {
    const o = a.useRef([]), u = a.useRef(0), f = a.useRef(false), h = a.useRef(false), c = a.useRef(null), p = a.useRef(null), v = a.useRef(l);
    v.current = l;
    const [C, w] = a.useState(0), y = a.useCallback(() => w((j) => j + 1), []), R = a.useCallback(() => {
      c.current && (clearTimeout(c.current), c.current = null);
    }, []), O = a.useCallback(() => Cn({
      meta: n,
      grid: s
    }), [
      s,
      n
    ]), E = a.useCallback(() => {
      R();
      const j = p.current;
      if (j == null) return;
      p.current = null;
      const F = Fs(o.current, u.current, j);
      F.changed && (o.current = F.stack, u.current = F.index, y());
    }, [
      y,
      R
    ]);
    a.useEffect(() => {
      if (!e) {
        R(), p.current = null, o.current = [], u.current = 0, h.current = false, y();
        return;
      }
      if (t <= 0) return;
      R(), p.current = null;
      const j = Cn({
        meta: n,
        grid: s
      });
      o.current = [
        j
      ], u.current = 0, h.current = true, y();
    }, [
      e,
      t,
      y,
      R
    ]), a.useEffect(() => {
      if (!e || !h.current || f.current) return;
      const j = O();
      if (o.current[u.current] !== j) return p.current = j, R(), c.current = setTimeout(() => {
        c.current = null, E();
      }, Bs), () => {
        R();
      };
    }, [
      R,
      O,
      e,
      E,
      s,
      n
    ]);
    const $ = a.useCallback(() => {
      !e || !h.current || f.current || (p.current = O(), E());
    }, [
      O,
      e,
      E
    ]), A = a.useCallback(() => {
      if (E(), u.current <= 0) return false;
      u.current -= 1;
      const j = o.current[u.current], F = j ? Sn(j) : null;
      return F ? (f.current = true, v.current(F), y(), requestAnimationFrame(() => {
        f.current = false;
      }), true) : false;
    }, [
      y,
      E
    ]), P = a.useCallback(() => {
      if (E(), u.current >= o.current.length - 1) return false;
      u.current += 1;
      const j = o.current[u.current], F = j ? Sn(j) : null;
      return F ? (f.current = true, v.current(F), y(), requestAnimationFrame(() => {
        f.current = false;
      }), true) : false;
    }, [
      y,
      E
    ]), S = e && h.current && u.current > 0, H = e && h.current && u.current < o.current.length - 1;
    return {
      undo: A,
      redo: P,
      canUndo: S,
      canRedo: H,
      recordNow: $,
      flushPendingRecord: E
    };
  }
  const Us = [
    "thead",
    "tbody",
    "tfoot"
  ], jt = 10, jn = 36, Rn = 44, $e = 4, it = 14, Ks = "h-3.5 w-3.5 shrink-0", V = "h-3 w-3 shrink-0", Rt = "__none__", qs = (e) => [
    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400",
    e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"
  ].join(" "), Xs = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", En = 288, hr = 200, Ys = 480, Gs = 380, Vs = 560, Nn = 16, Ge = 6, Zs = [
    {
      value: "full",
      label: "\uD398\uC774\uC9C0 \uC804\uCCB4 (full)"
    },
    {
      value: "fit",
      label: "\uB0B4\uC6A9\uB9CC\uD07C (fit)"
    }
  ], Js = [
    {
      value: "left",
      label: "\uC67C\uCABD"
    },
    {
      value: "right",
      label: "\uC624\uB978\uCABD"
    }
  ], Qs = "pointer-events-none z-100050 max-w-[240px] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", ea = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", Tn = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", pr = typeof navigator < "u" && (/Mac|iPhone|iPad|iPod/i.test(navigator.platform) || /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent ?? "")), Pe = pr ? "\u2318" : "Ctrl", ta = `${Pe}+E`, na = `${Pe}+Shift+E`, ra = `${Pe}+Shift+>`, oa = `${Pe}+Shift+<`, Et = `${Pe}+Z`, Nt = pr ? `${Pe}+Shift+Z` : `${Pe}+Y`, sa = 14;
  function aa(e, t, n = sa) {
    const s = (e || "").trim(), l = /^(\d+(?:\.\d+)?)(px|%|em|rem|pt)?$/i.exec(s), o = ((l == null ? void 0 : l[2]) || "px").toLowerCase(), u = l ? Number(l[1]) : n, f = o === "em" || o === "rem" ? 0.1 : 1, h = o === "em" || o === "rem" ? 0.5 : o === "%" ? 50 : 8;
    let c = (Number.isFinite(u) ? u : n) + t * f;
    return c = Math.max(h, c), o === "em" || o === "rem" ? c = Math.round(c * 10) / 10 : c = Math.round(c), `${c}${o}`;
  }
  function Me({ icon: e, children: t }) {
    return r.jsxs("span", {
      className: "inline-flex items-center gap-1",
      children: [
        r.jsx("span", {
          className: "inline-flex shrink-0 text-gray-400 dark:text-odp-muted",
          "aria-hidden": true,
          children: e
        }),
        t
      ]
    });
  }
  function Ie(e) {
    return Math.min(Ys, Math.max(hr, Math.round(e)));
  }
  function Mn({ onDelta: e, ariaLabel: t }) {
    const n = a.useRef(0);
    return r.jsx("div", {
      role: "separator",
      "aria-orientation": "vertical",
      "aria-label": t,
      className: "group relative hidden w-1.5 shrink-0 cursor-col-resize touch-none select-none landscape:flex",
      onPointerDown: (s) => {
        s.preventDefault(), s.stopPropagation(), s.currentTarget.setPointerCapture(s.pointerId), n.current = s.clientX;
      },
      onPointerMove: (s) => {
        if (!s.currentTarget.hasPointerCapture(s.pointerId)) return;
        const l = s.clientX - n.current;
        n.current = s.clientX, l !== 0 && e(l);
      },
      onPointerUp: (s) => {
        s.currentTarget.hasPointerCapture(s.pointerId) && s.currentTarget.releasePointerCapture(s.pointerId);
      },
      onPointerCancel: (s) => {
        s.currentTarget.hasPointerCapture(s.pointerId) && s.currentTarget.releasePointerCapture(s.pointerId);
      },
      children: r.jsx("span", {
        className: "absolute inset-y-2 left-1/2 w-px -translate-x-1/2 rounded-full bg-gray-300 transition-colors group-hover:bg-blue-400 group-active:bg-blue-500 dark:bg-odp-borderStrong dark:group-hover:bg-blue-400",
        "aria-hidden": true
      })
    });
  }
  function ia(e, t) {
    return e === 0 ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC704\uC5D0 \uD589 \uCD94\uAC00" : e === t ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC544\uB798\uC5D0 \uD589 \uCD94\uAC00" : `\uB354\uBE14\uD074\uB9AD: ${e}\uD589 \uC704\uC5D0 \uD589 \uCD94\uAC00`;
  }
  function la(e, t) {
    return e === 0 ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC55E\uC5D0 \uC5F4 \uCD94\uAC00" : e === t ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uB4A4\uC5D0 \uC5F4 \uCD94\uAC00" : `\uB354\uBE14\uD074\uB9AD: ${e}\uC5F4 \uC55E\uC5D0 \uC5F4 \uCD94\uAC00`;
  }
  function Pn(e) {
    return e === "row" ? "\uB4DC\uB798\uADF8: \uD589 \uB192\uC774 \uC870\uC808" : "\uB4DC\uB798\uADF8: \uC5F4 \uB108\uBE44 \uC870\uC808";
  }
  function Ln(e, t, n, s, l, o) {
    const u = s.left - l.left, f = t - l.top, h = s.width, c = Math.min(Math.max(n - l.left, u), u + h);
    return {
      kind: "row",
      index: e,
      x: c,
      y: f,
      edge: {
        left: u,
        top: f - $e / 2,
        width: h,
        height: $e
      },
      ghost: {
        left: u,
        top: f - jn / 2,
        width: h,
        height: jn
      },
      label: ia(e, o)
    };
  }
  function An(e, t, n, s, l, o) {
    const u = s.top - l.top, f = t - l.left, h = s.height, c = Math.min(Math.max(n - l.top, u), u + h);
    return {
      kind: "col",
      index: e,
      x: f,
      y: c,
      edge: {
        left: f - $e / 2,
        top: u,
        width: $e,
        height: h
      },
      ghost: {
        left: f - Rn / 2,
        top: u,
        width: Rn,
        height: h
      },
      label: la(e, o)
    };
  }
  function ca({ tip: e, onDoubleClick: t, style: n }) {
    return r.jsxs(Kn, {
      open: true,
      children: [
        r.jsx(qn, {
          asChild: true,
          children: r.jsx("button", {
            type: "button",
            "aria-label": e,
            style: n,
            onClick: (s) => {
              s.preventDefault(), s.stopPropagation();
            },
            onDoubleClick: (s) => {
              s.preventDefault(), s.stopPropagation(), t();
            },
            onMouseDown: (s) => {
              s.preventDefault(), s.stopPropagation();
            },
            onPointerDown: (s) => {
              s.preventDefault(), s.stopPropagation();
            },
            "data-haim-edge-add": "",
            className: "haim-table-insert-btn pointer-events-auto absolute z-30 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-400/80 bg-white text-blue-600 shadow-sm hover:bg-blue-50 dark:border-blue-400/70 dark:bg-odp-surface dark:text-blue-300 dark:hover:bg-blue-950/60",
            children: r.jsx(Lo, {
              className: "h-3 w-3",
              "aria-hidden": true
            })
          })
        }),
        r.jsx(Xn, {
          children: r.jsxs(Yn, {
            className: Qs,
            side: "top",
            sideOffset: 8,
            children: [
              e,
              r.jsx(Gn, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function ua({ insert: e, tip: t, allowResize: n, onDoubleClickInsert: s, onResizePointerDown: l }) {
    const o = e.kind === "row", u = o ? {
      left: e.edge.left,
      top: e.edge.top + $e / 2 - it / 2,
      width: e.edge.width,
      height: it
    } : {
      left: e.edge.left + $e / 2 - it / 2,
      top: e.edge.top,
      width: it,
      height: e.edge.height
    };
    return r.jsx("div", {
      role: "presentation",
      title: t,
      "data-haim-edge-hit": "",
      className: `pointer-events-auto absolute z-[25] ${n ? o ? "cursor-row-resize" : "cursor-col-resize" : "cursor-pointer"}`,
      style: {
        left: u.left,
        top: u.top,
        width: u.width,
        height: u.height
      },
      onMouseDown: (f) => {
        f.preventDefault(), f.stopPropagation();
      },
      onPointerDown: (f) => {
        if (f.preventDefault(), f.stopPropagation(), f.button !== 0 || f.detail >= 2 || !n) return;
        const h = f.clientX, c = f.clientY, p = f;
        let v = false;
        const C = () => {
          document.removeEventListener("pointermove", w, true), document.removeEventListener("pointerup", y, true), document.removeEventListener("pointercancel", y, true);
        }, w = (R) => {
          v || Math.abs(R.clientX - h) < 3 && Math.abs(R.clientY - c) < 3 || (v = true, C(), l(p));
        }, y = () => {
          C();
        };
        document.addEventListener("pointermove", w, true), document.addEventListener("pointerup", y, true), document.addEventListener("pointercancel", y, true);
      },
      onDoubleClick: (f) => {
        f.preventDefault(), f.stopPropagation(), s();
      }
    });
  }
  function da({ insert: e }) {
    const t = `${e.kind}-${e.index}`;
    return r.jsxs("div", {
      "data-haim-insert-preview": "",
      className: "contents",
      children: [
        r.jsx("div", {
          "aria-hidden": true,
          className: `pointer-events-none absolute z-10 rounded-sm border border-transparent bg-blue-400/[0.04] dark:bg-blue-400/[0.06] ${e.kind === "row" ? "haim-table-insert-ghost-row" : "haim-table-insert-ghost-col"}`,
          style: {
            left: e.ghost.left,
            top: e.ghost.top,
            width: e.ghost.width,
            height: e.ghost.height
          }
        }, `ghost-${t}`),
        r.jsx("div", {
          "aria-hidden": true,
          className: "haim-table-insert-glow pointer-events-none absolute z-[11] rounded-full",
          style: {
            left: e.edge.left,
            top: e.edge.top,
            width: e.edge.width,
            height: e.edge.height
          }
        }, `glow-${t}`)
      ]
    });
  }
  function fa({ kind: e, indices: t, table: n, wrap: s, colCount: l }) {
    const [o, u] = a.useState([]);
    return a.useEffect(() => {
      if (!n || !s || !t.length) {
        u([]);
        return;
      }
      const f = () => {
        const h = s.getBoundingClientRect(), c = n.getBoundingClientRect(), p = [];
        if (e === "row") for (const v of t) {
          const C = n.rows[v];
          if (!C) continue;
          const w = C.getBoundingClientRect();
          p.push({
            left: c.left - h.left,
            top: w.top - h.top,
            width: c.width,
            height: Math.max(1, w.height)
          });
        }
        else {
          const v = gr(n, l);
          for (const C of t) {
            const w = v[C], y = v[C + 1];
            w == null || y == null || p.push({
              left: w - h.left,
              top: c.top - h.top,
              width: Math.max(1, y - w),
              height: c.height
            });
          }
        }
        u(p);
      };
      return f(), window.addEventListener("resize", f), () => window.removeEventListener("resize", f);
    }, [
      l,
      t,
      e,
      n,
      s
    ]), o.length ? r.jsx("div", {
      "data-haim-delete-preview": "",
      className: "pointer-events-none absolute inset-0 z-20",
      "aria-hidden": true,
      children: o.map((f, h) => r.jsx("div", {
        className: "absolute rounded-sm bg-red-500/25 ring-1 ring-inset ring-red-500/50 dark:bg-red-500/30 dark:ring-red-400/40",
        style: {
          left: f.left,
          top: f.top,
          width: f.width,
          height: f.height
        }
      }, `${e}-${t[h] ?? h}`))
    }) : null;
  }
  function ha(e) {
    const t = [
      ...e.rows
    ];
    if (!t.length) return [];
    const n = [];
    for (let s = 0; s < t.length; s += 1) n.push(t[s].getBoundingClientRect().top);
    return n.push(t[t.length - 1].getBoundingClientRect().bottom), n;
  }
  function gr(e, t) {
    const n = e.getBoundingClientRect(), s = [];
    for (let u = 0; u < t; u += 1) {
      const f = e.querySelectorAll(`[data-edit-c="${u}"]`);
      let h = null;
      f.forEach((c) => {
        const p = c.getBoundingClientRect();
        (h == null || p.left < h) && (h = p.left);
      }), h != null ? s.push(h) : s.push(n.left + n.width * u / Math.max(t, 1));
    }
    let l = n.right;
    return e.querySelectorAll(`[data-edit-c="${t - 1}"]`).forEach((u) => {
      const f = u.getBoundingClientRect();
      f.right > l && (l = f.right);
    }), s.push(l), s;
  }
  function pa(e, t, n) {
    var _a2, _b;
    if (!n.length || typeof document > "u") return null;
    const l = (_b = (_a2 = document.elementFromPoint(e, t)) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "td[data-edit-r][data-edit-c]");
    if (!l) return null;
    const o = Number(l.getAttribute("data-edit-r")), u = Number(l.getAttribute("data-edit-c"));
    return !Number.isInteger(o) || !Number.isInteger(u) ? null : ao(n, o, u);
  }
  function Dn(e, t, n) {
    return e === "col" ? n.colspan > 1 && n.c < t && t < n.c + n.colspan : n.rowspan > 1 && n.r < t && t < n.r + n.rowspan;
  }
  function Ve(e, t, n, s, l, o, u) {
    const f = e.getBoundingClientRect(), h = t.getBoundingClientRect(), c = jt + 2;
    if (n < f.left - c || n > f.right + c || s < f.top - c || s > f.bottom + c) return null;
    const p = ha(e), v = gr(e, o), C = pa(n, s, u);
    let w = null;
    for (let R = 0; R < p.length; R += 1) {
      if (C && Dn("row", R, C)) continue;
      const O = p[R], E = Math.abs(s - O);
      E <= jt && n >= f.left - c && n <= f.right + c && (!w || E < w.dist) && (w = {
        index: R,
        dist: E,
        y: O
      });
    }
    let y = null;
    for (let R = 0; R < v.length; R += 1) {
      if (C && Dn("col", R, C)) continue;
      const O = v[R], E = Math.abs(n - O);
      E <= jt && s >= f.top - c && s <= f.bottom + c && (!y || E < y.dist) && (y = {
        index: R,
        dist: E,
        x: O
      });
    }
    return w && y ? w.dist <= y.dist ? Ln(w.index, w.y, n, f, h, l) : An(y.index, y.x, s, f, h, o) : w ? Ln(w.index, w.y, n, f, h, l) : y ? An(y.index, y.x, s, f, h, o) : null;
  }
  ri = function({ isOpen: e, initialMeta: t, initialGrid: n, onClose: s, onSave: l }) {
    var _a2, _b, _c, _d, _e2, _f;
    const [o, u] = a.useState(Je()), [f, h] = a.useState(n), [c, p] = a.useState(null), [v, C] = a.useState(false), [w, y] = a.useState("thead"), [R, O] = a.useState([]), [E, $] = a.useState(false), [A, P] = a.useState(null), [S, H] = a.useState(null), [j, F] = a.useState(false), [Y, K] = a.useState(0), [M, D] = a.useState(null), [W, I] = a.useState(null), G = a.useRef(null), [ee, J] = a.useState(null), U = ee !== null, T = er(), [q, Z] = a.useState(En), [Q, Qe] = a.useState(En), [he, te] = a.useState(false), [ae, ie] = a.useState(false), [pe, Le] = a.useState(() => typeof window < "u" ? window.innerWidth : 1280), [ge, ht] = a.useState(() => typeof window < "u" ? window.matchMedia("(orientation: landscape)").matches : true), me = a.useRef(null), xe = a.useRef(null), le = a.useRef(null), Ae = a.useRef(null), ne = a.useRef(false), ce = a.useRef(null), re = a.useRef(null), Ce = a.useRef(false), Se = a.useRef(false), ye = a.useRef({
      x: 0,
      y: 0
    });
    Ae.current = S, ne.current = v, re.current = c, Ce.current = he, Se.current = U, G.current = W;
    const be = a.useRef(t), He = a.useRef(n);
    be.current = t, He.current = n, a.useEffect(() => {
      if (!e) return;
      const i = be.current, d = He.current;
      u(i ? {
        ...i
      } : Je()), h({
        rows: d.rows.map((g) => [
          ...g
        ]),
        aligns: [
          ...d.aligns
        ]
      }), p(null), C(false), ce.current = null, H(null), te(false), ie(false), J(null), I(null), K((g) => g + 1), Yr().then((g) => O(g.templates)), Gr().then((g) => Vr(g));
    }, [
      e
    ]);
    const Fe = a.useCallback((i) => {
      u(i.meta), h({
        rows: i.grid.rows.map((d) => [
          ...d
        ]),
        aligns: [
          ...i.grid.aligns ?? []
        ]
      }), p(null), C(false), ce.current = null, H(null);
    }, []), { undo: je, redo: We, canUndo: et, canRedo: pt, recordNow: tt } = Ws({
      enabled: e,
      historyKey: Y,
      meta: o,
      grid: f,
      applySnapshot: Fe
    }), Re = a.useRef(false);
    a.useEffect(() => {
      Re.current && !j && tt(), Re.current = j;
    }, [
      j,
      tt
    ]), a.useEffect(() => {
      if (!e) return;
      const i = (d) => {
        if (!(d.metaKey || d.ctrlKey) || d.altKey) return;
        const b = d.key.toLowerCase(), x = b === "z" && !d.shiftKey, z = b === "y" || b === "z" && d.shiftKey;
        !x && !z || (d.preventDefault(), d.stopPropagation(), d.stopImmediatePropagation(), z ? We() : je());
      };
      return window.addEventListener("keydown", i, true), () => window.removeEventListener("keydown", i, true);
    }, [
      e,
      We,
      je
    ]), a.useEffect(() => {
      if (!e || typeof window > "u") return;
      const i = window.matchMedia("(orientation: landscape)"), d = () => {
        Le(window.innerWidth), ht(i.matches);
      };
      return d(), window.addEventListener("resize", d), i.addEventListener("change", d), () => {
        window.removeEventListener("resize", d), i.removeEventListener("change", d);
      };
    }, [
      e
    ]);
    const m = a.useMemo(() => Zr(o.merges), [
      o.merges
    ]), k = f.rows.length, L = Math.max(1, ...f.rows.map((i) => i.length), f.aligns.length), B = a.useMemo(() => {
      if (!c) return [];
      const i = [], d = Math.min(c.r0, c.r1), g = Math.min(c.c0, c.c1), b = Math.max(c.r0, c.r1), x = Math.max(c.c0, c.c1);
      for (let z = d; z <= b; z += 1) for (let _ = g; _ <= x; _ += 1) m.has(`${z},${_}`) || i.push({
        r: z,
        c: _
      });
      return i;
    }, [
      c,
      m
    ]), X = B[0] ?? null, we = !!X, nt = a.useRef(q), gt = a.useRef(Q);
    nt.current = q, gt.current = Q;
    const De = a.useMemo(() => {
      const i = pe * 0.95;
      return Math.max(hr, i - Nn - Ge - Gs);
    }, [
      pe
    ]), Ue = a.useCallback((i) => {
      const d = nt.current, g = gt.current, b = d + g;
      let x = Ie(d + i), z = Ie(b - x);
      x = Ie(b - z), z = Ie(b - x), Z(x), Qe(z);
    }, []), Ke = a.useCallback((i) => {
      Qe((d) => {
        const g = Ie(d + i);
        if (q + Ge + g <= De) return g;
        const x = De - q - Ge;
        return Ie(x);
      });
    }, [
      De,
      q
    ]), wr = a.useMemo(() => {
      const i = pe * 0.95;
      if (!ge) return {
        width: i,
        maxWidth: "95dvw",
        height: "95dvh",
        maxHeight: "95dvh"
      };
      const d = q + Ge + Q;
      return {
        width: Math.min(i, Nn + d + Ge + Vs),
        maxWidth: "95dvw",
        height: "95dvh",
        maxHeight: "95dvh"
      };
    }, [
      Q,
      ge,
      q,
      pe
    ]), yr = a.useMemo(() => X ? o.cells[fe(X.r, X.c)] ?? {} : {}, [
      o.cells,
      X
    ]), vr = a.useCallback((i) => {
      B.length && u((d) => {
        const g = {
          ...d.cells
        };
        for (const { r: b, c: x } of B) {
          const z = fe(b, x);
          sn(i) ? delete g[z] : g[z] = i;
        }
        return {
          ...d,
          cells: g
        };
      });
    }, [
      B
    ]), Ee = a.useCallback((i) => {
      h(i.grid), u(i.meta), p(null), C(false), ce.current = null, H(null);
    }, []), ue = a.useRef(f), qe = a.useRef(o);
    ue.current = f, qe.current = o;
    const Bt = a.useCallback((i) => {
      Ee(ds(ue.current, qe.current, i));
    }, [
      Ee
    ]), Ht = a.useCallback((i) => {
      Ee(fs(ue.current, qe.current, i));
    }, [
      Ee
    ]), Ft = a.useCallback((i) => {
      const d = re.current;
      let g, b;
      if (d) g = Math.min(d.r0, d.r1), b = Math.max(d.r0, d.r1), i != null && (i < g || i > b) && (g = i, b = i);
      else if (i != null) g = i, b = i;
      else {
        const _ = G.current;
        (_ == null ? void 0 : _.kind) === "row" && _.indices.length && (I(null), D({
          kind: "row",
          indices: [
            ..._.indices
          ]
        }));
        return;
      }
      const x = [];
      for (let _ = g; _ <= b; _ += 1) x.push(_);
      const z = ue.current.rows.length;
      z <= 1 || x.length === 0 || x.length >= z || (I(null), D({
        kind: "row",
        indices: x
      }));
    }, []), Wt = a.useCallback((i) => {
      const d = re.current;
      let g, b;
      if (d) g = Math.min(d.c0, d.c1), b = Math.max(d.c0, d.c1), i != null && (i < g || i > b) && (g = i, b = i);
      else if (i != null) g = i, b = i;
      else {
        const _ = G.current;
        (_ == null ? void 0 : _.kind) === "col" && _.indices.length && (I(null), D({
          kind: "col",
          indices: [
            ..._.indices
          ]
        }));
        return;
      }
      const x = [];
      for (let _ = g; _ <= b; _ += 1) x.push(_);
      const z = Math.max(1, ...ue.current.rows.map((_) => _.length), ue.current.aligns.length, 1);
      z <= 1 || x.length === 0 || x.length >= z || (I(null), D({
        kind: "col",
        indices: x
      }));
    }, []), Ut = a.useCallback((i) => {
      const d = re.current;
      let g, b;
      d ? (g = Math.min(d.r0, d.r1), b = Math.max(d.r0, d.r1), (i < g || i > b) && (g = i, b = i)) : (g = i, b = i);
      const x = [];
      for (let _ = g; _ <= b; _ += 1) x.push(_);
      const z = ue.current.rows.length;
      if (z <= 1 || x.length === 0 || x.length >= z) {
        I(null);
        return;
      }
      I({
        kind: "row",
        indices: x
      });
    }, []), Kt = a.useCallback((i) => {
      const d = re.current;
      let g, b;
      d ? (g = Math.min(d.c0, d.c1), b = Math.max(d.c0, d.c1), (i < g || i > b) && (g = i, b = i)) : (g = i, b = i);
      const x = [];
      for (let _ = g; _ <= b; _ += 1) x.push(_);
      const z = Math.max(1, ...ue.current.rows.map((_) => _.length), ue.current.aligns.length, 1);
      if (z <= 1 || x.length === 0 || x.length >= z) {
        I(null);
        return;
      }
      I({
        kind: "col",
        indices: x
      });
    }, []), ze = a.useCallback(() => {
      I(null);
    }, []), kr = a.useCallback(() => {
      M && (M.kind === "row" ? Ee(gs(ue.current, qe.current, M.indices)) : Ee(ms(ue.current, qe.current, M.indices)), D(null), I(null));
    }, [
      Ee,
      M
    ]), Cr = !!(c && !(c.r0 === c.r1 && c.c0 === c.c1)), mt = a.useCallback(() => {
      !c || c.r0 === c.r1 && c.c0 === c.c1 || u((i) => ({
        ...i,
        merges: Jr(i.merges, c.r0, c.c0, c.r1, c.c1)
      }));
    }, [
      c
    ]), xt = a.useCallback(() => {
      c && u((i) => ({
        ...i,
        merges: Qr(i.merges, c.r0, c.c0, c.r1, c.c1)
      }));
    }, [
      c
    ]), qt = a.useCallback((i) => {
      B.length && u((d) => {
        var _a3;
        const g = {
          ...d.cells
        }, b = (_a3 = d.style) == null ? void 0 : _a3.fontSize;
        for (const { r: x, c: z } of B) {
          const _ = fe(x, z), oe = g[_] ?? {};
          g[_] = {
            ...oe,
            fontSize: aa(oe.fontSize ?? b, i)
          };
        }
        return {
          ...d,
          cells: g
        };
      });
    }, [
      B
    ]);
    a.useEffect(() => {
      if (!e) return;
      const i = (d) => {
        if (!(!(d.metaKey || d.ctrlKey) || d.altKey)) {
          if (d.shiftKey) {
            const g = d.code === "Period" || d.key === ">" || d.key === ".", b = d.code === "Comma" || d.key === "<" || d.key === ",";
            if (g || b) {
              if (!B.length) return;
              d.preventDefault(), d.stopPropagation(), qt(g ? 1 : -1);
              return;
            }
          }
          d.code !== "KeyE" && d.key.toLowerCase() !== "e" || (d.preventDefault(), d.stopPropagation(), d.shiftKey ? xt() : mt());
        }
      };
      return window.addEventListener("keydown", i, true), () => window.removeEventListener("keydown", i, true);
    }, [
      e,
      mt,
      qt,
      B.length,
      xt
    ]);
    const Sr = a.useCallback((i) => {
      var _a3, _b2;
      if (Se.current) {
        H(null);
        return;
      }
      if (v || j) {
        v && H(null);
        return;
      }
      if ((_b2 = (_a3 = i.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-add], [data-haim-edge-hit]")) return;
      const d = le.current, g = xe.current;
      if (!d || !g) return;
      const b = Ve(d, g, i.clientX, i.clientY, k, L, o.merges);
      H((x) => b ? x && x.kind === b.kind && x.index === b.index ? x.x === b.x && x.y === b.y ? x : {
        ...x,
        x: b.x,
        y: b.y
      } : b : null);
    }, [
      L,
      j,
      o.merges,
      v,
      k
    ]), jr = a.useCallback((i, d) => {
      var _a3, _b2;
      if (d.index === 0 || Se.current) return;
      i.preventDefault(), i.stopPropagation();
      const g = le.current;
      if (!g) return;
      const b = d.index - 1;
      let x = 0, z = 0;
      if (d.kind === "col") {
        const N = (_a3 = g.querySelector(`[data-edit-c="${b}"]`)) == null ? void 0 : _a3.getBoundingClientRect();
        if (!N) return;
        x = N.left;
      } else {
        const N = (_b2 = g.rows[b]) == null ? void 0 : _b2.getBoundingClientRect();
        if (!N) return;
        z = N.top;
      }
      F(true), C(false), H(null);
      const _ = (Ne) => {
        let N = 24;
        d.kind === "col" ? N = Ne.clientX - x : N = Ne.clientY - z, N = Math.max(24, Math.round(N)), u((se) => d.kind === "col" ? {
          ...se,
          colWidths: an(se.colWidths, b, N)
        } : {
          ...se,
          rowHeights: an(se.rowHeights, b, N)
        });
      }, oe = () => {
        document.removeEventListener("pointermove", _, true), document.removeEventListener("pointerup", oe, true), document.removeEventListener("pointercancel", oe, true), F(false);
      };
      document.addEventListener("pointermove", _, true), document.addEventListener("pointerup", oe, true), document.addEventListener("pointercancel", oe, true);
    }, []), Xt = a.useCallback((i, d, g) => {
      h((b) => {
        const x = Math.max(1, ...b.rows.map((oe) => oe.length), b.aligns.length), z = b.rows.map((oe) => [
          ...oe
        ]);
        for (; z.length <= i; ) z.push(Array(x).fill(""));
        const _ = [
          ...z[i] ?? Array(x).fill("")
        ];
        for (; _.length < x; ) _.push("");
        return _[d] = g, z[i] = _, {
          ...b,
          rows: z
        };
      });
    }, []), Yt = a.useCallback((i, d) => {
      const g = le.current;
      if (!g) return;
      const b = g.querySelector(`td[data-edit-r="${i}"][data-edit-c="${d}"] input`);
      b && (p({
        r0: i,
        c0: d,
        r1: i,
        c1: d
      }), ce.current = {
        r: i,
        c: d
      }, C(false), H(null), requestAnimationFrame(() => {
        b.focus(), b.select();
      }));
    }, []), Xe = a.useCallback((i, d) => {
      p({
        r0: i,
        c0: d,
        r1: i,
        c1: d
      }), ce.current = {
        r: i,
        c: d
      }, C(false), H(null);
    }, []), Gt = a.useCallback(() => {
      var _a3;
      p(null), C(false), ce.current = null;
      const i = document.activeElement;
      ((_a3 = i == null ? void 0 : i.closest) == null ? void 0 : _a3.call(i, "td[data-edit-r]")) && i.blur();
    }, []), Vt = a.useCallback((i, d) => {
      const g = ce.current;
      if (!g) {
        Xe(i, d);
        return;
      }
      p({
        r0: g.r,
        c0: g.c,
        r1: i,
        c1: d
      }), C(false), H(null);
    }, [
      Xe
    ]), bt = a.useCallback((i, d) => {
      var _a3;
      p({
        r0: i,
        c0: d,
        r1: i,
        c1: d
      }), ce.current = {
        r: i,
        c: d
      }, C(true), H(null);
      const g = document.activeElement;
      ((_a3 = g == null ? void 0 : g.closest) == null ? void 0 : _a3.call(g, "td[data-edit-r]")) && g.blur();
    }, []), Rr = a.useCallback((i, d) => {
      ne.current && p((g) => g && {
        ...g,
        r1: i,
        c1: d
      });
    }, []);
    a.useEffect(() => {
      if (!v) return;
      const i = () => C(false);
      return window.addEventListener("mouseup", i, true), window.addEventListener("pointerup", i, true), () => {
        window.removeEventListener("mouseup", i, true), window.removeEventListener("pointerup", i, true);
      };
    }, [
      v
    ]), a.useEffect(() => {
      if (!e) return;
      const i = (x) => {
        var _a3, _b2, _c2;
        const z = x;
        if (!z) return false;
        const _ = ((_b2 = (_a3 = z.tagName) == null ? void 0 : _a3.toLowerCase) == null ? void 0 : _b2.call(_a3)) ?? "";
        return _ === "input" || _ === "textarea" || _ === "select" || z.isContentEditable ? true : !!((_c2 = z.closest) == null ? void 0 : _c2.call(z, 'input, textarea, select, [contenteditable="true"]'));
      }, d = (x) => {
        x.code !== "Space" && x.key !== " " || x.repeat || i(x.target) || re.current || (x.preventDefault(), te(true));
      }, g = (x) => {
        x.code !== "Space" && x.key !== " " || te(false);
      }, b = () => te(false);
      return window.addEventListener("keydown", d, true), window.addEventListener("keyup", g, true), window.addEventListener("blur", b), () => {
        window.removeEventListener("keydown", d, true), window.removeEventListener("keyup", g, true), window.removeEventListener("blur", b), te(false);
      };
    }, [
      e
    ]), a.useEffect(() => {
      c && te(false);
    }, [
      c
    ]);
    const Zt = a.useCallback(() => {
      ie(false);
    }, []), Er = a.useCallback((i) => {
      const d = me.current;
      if (!d) return;
      const g = i.button === 1, b = i.button === 0 && he && !re.current;
      if (g || b) {
        i.preventDefault(), i.stopPropagation(), H(null), ye.current = {
          x: i.clientX,
          y: i.clientY
        }, ie(true), d.setPointerCapture(i.pointerId);
        return;
      }
    }, [
      he
    ]), Nr = a.useCallback((i) => {
      if (!ae) return;
      const d = me.current;
      if (!d) return;
      const g = i.clientX - ye.current.x, b = i.clientY - ye.current.y;
      ye.current = {
        x: i.clientX,
        y: i.clientY
      }, d.scrollLeft -= g, d.scrollTop -= b;
    }, [
      ae
    ]), Jt = a.useCallback((i) => {
      if (!ae) return;
      const d = me.current;
      (d == null ? void 0 : d.hasPointerCapture(i.pointerId)) && d.releasePointerCapture(i.pointerId), Zt();
    }, [
      Zt,
      ae
    ]), Tr = a.useCallback((i) => {
      if (i.button !== 0 || he || ae) return;
      const d = i.target;
      d && (d.closest("[data-haim-table-sidebars]") || d.closest("[data-haim-table-canvas] table, [data-haim-edge-hit], [data-haim-edge-add], [data-haim-insert-preview]") || re.current && Gt());
    }, [
      Gt,
      ae,
      he
    ]), rt = a.useCallback((i, d, g, b) => {
      let x = i + g, z = d + b;
      for (; x >= 0 && x < k && z >= 0 && z < L; ) {
        if (!m.has(`${x},${z}`)) {
          Yt(x, z);
          return;
        }
        x += g, z += b;
      }
    }, [
      L,
      m,
      Yt,
      k
    ]), Mr = a.useCallback((i, d, g) => {
      if (i.nativeEvent.isComposing) return;
      if (i.key === "Enter") {
        i.preventDefault(), i.stopPropagation(), i.shiftKey ? rt(d, g, -1, 0) : rt(d, g, 1, 0);
        return;
      }
      if (!i.altKey) return;
      let b = 0, x = 0;
      if (i.key === "ArrowUp") b = -1;
      else if (i.key === "ArrowDown") b = 1;
      else if (i.key === "ArrowLeft") x = -1;
      else if (i.key === "ArrowRight") x = 1;
      else return;
      i.preventDefault(), i.stopPropagation(), rt(d, g, b, x);
    }, [
      rt
    ]), Pr = a.useMemo(() => {
      var _a3;
      return X ? ((_a3 = f.rows[X.r]) == null ? void 0 : _a3[X.c]) ?? "" : "";
    }, [
      f.rows,
      X
    ]), Qt = a.useMemo(() => o.templateId ? R.find((i) => i.id === o.templateId) ?? null : null, [
      o.templateId,
      R
    ]), Lr = a.useCallback((i, d) => {
      const g = eo({
        row: i,
        col: d,
        rowCount: k,
        colCount: L,
        meta: o,
        template: Qt
      }), b = {};
      return g.bg && (b.backgroundColor = g.bg), g.color && (b.color = g.color), g.fontFamily && (b.fontFamily = g.fontFamily), g.fontSize && (b.fontSize = g.fontSize), g.fontWeight && (b.fontWeight = g.fontWeight), b;
    }, [
      Qt,
      L,
      o,
      k
    ]), en = (i, d) => {
      if (!c) return false;
      const g = Math.min(c.r0, c.r1), b = Math.min(c.c0, c.c1), x = Math.max(c.r0, c.r1), z = Math.max(c.c0, c.c1);
      return i >= g && i <= x && d >= b && d <= z;
    }, Ar = (i) => i === "thead" ? r.jsx(Ct, {
      className: V,
      "aria-hidden": true
    }) : i === "tfoot" ? r.jsx(un, {
      className: V,
      "aria-hidden": true
    }) : r.jsx(dn, {
      className: V,
      "aria-hidden": true
    });
    return r.jsxs(r.Fragment, {
      children: [
        r.jsxs(tr, {
          isOpen: e,
          onClose: () => {
            if (M !== null) {
              D(null);
              return;
            }
            s();
          },
          overlayClassName: "p-[2.5dvh]",
          contentClassName: "h-[95dvh] max-h-[95dvh] max-w-[95dvw]",
          contentStyle: wr,
          resizeHeight: true,
          children: [
            r.jsxs(Or, {
              className: "flex h-full min-h-0 flex-col",
              onSubmit: (i) => i.preventDefault(),
              onPointerDownCapture: Tr,
              children: [
                r.jsxs("header", {
                  className: "flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-3 py-2 dark:border-odp-border",
                  children: [
                    r.jsxs("h2", {
                      className: "inline-flex items-center gap-1.5 text-sm font-bold text-gray-800 dark:text-odp-fgStrong",
                      children: [
                        r.jsx(dt, {
                          className: Ks,
                          "aria-hidden": true
                        }),
                        "\uD45C \uD3B8\uC9D1"
                      ]
                    }),
                    r.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        r.jsxs("button", {
                          type: "button",
                          disabled: !et,
                          title: `\uC2E4\uD589 \uCDE8\uC18C (${Et})`,
                          "aria-label": `\uC2E4\uD589 \uCDE8\uC18C (${Et})`,
                          onClick: () => je(),
                          className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft",
                          children: [
                            r.jsx(ko, {
                              className: V,
                              "aria-hidden": true
                            }),
                            "\uC2E4\uD589 \uCDE8\uC18C"
                          ]
                        }),
                        r.jsxs("button", {
                          type: "button",
                          disabled: !pt,
                          title: `\uB2E4\uC2DC \uC2E4\uD589 (${Nt})`,
                          "aria-label": `\uB2E4\uC2DC \uC2E4\uD589 (${Nt})`,
                          onClick: () => We(),
                          className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft",
                          children: [
                            r.jsx(Co, {
                              className: V,
                              "aria-hidden": true
                            }),
                            "\uB2E4\uC2DC \uC2E4\uD589"
                          ]
                        }),
                        r.jsxs("button", {
                          type: "button",
                          onClick: s,
                          className: "inline-flex items-center gap-1 rounded px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft",
                          children: [
                            r.jsx(ir, {
                              className: V,
                              "aria-hidden": true
                            }),
                            "\uCDE8\uC18C"
                          ]
                        }),
                        r.jsxs("button", {
                          type: "button",
                          onClick: () => l(o, f),
                          className: "inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700",
                          children: [
                            r.jsx(lr, {
                              className: V,
                              "aria-hidden": true
                            }),
                            "\uC801\uC6A9"
                          ]
                        })
                      ]
                    })
                  ]
                }),
                r.jsxs("div", {
                  className: "flex min-h-0 flex-1 flex-col landscape:flex-row",
                  children: [
                    r.jsxs("div", {
                      "data-haim-table-sidebars": "",
                      className: "order-2 flex max-h-[42%] min-h-0 w-full shrink-0 flex-col gap-2 overflow-hidden border-t border-gray-100 bg-gray-50/80 p-2 dark:border-odp-border dark:bg-odp-bgSoft/40 portrait:max-h-[42%] landscape:order-1 landscape:max-h-none landscape:w-auto landscape:flex-row landscape:gap-0 landscape:border-t-0 landscape:border-r-0",
                      children: [
                        r.jsxs("aside", {
                          className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-surface landscape:flex-none landscape:shrink-0",
                          style: ge ? {
                            width: q
                          } : void 0,
                          children: [
                            r.jsx("div", {
                              className: "sticky top-0 z-[1] border-b border-gray-100 bg-white px-2.5 py-1.5 dark:border-odp-border dark:bg-odp-surface",
                              children: r.jsxs("h3", {
                                className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong",
                                children: [
                                  r.jsx(dt, {
                                    className: V,
                                    "aria-hidden": true
                                  }),
                                  "\uD45C \xB7 \uADF8\uB8F9"
                                ]
                              })
                            }),
                            r.jsxs("div", {
                              className: "space-y-2 p-2.5",
                              children: [
                                r.jsxs("div", {
                                  className: "flex flex-wrap gap-2",
                                  children: [
                                    r.jsxs(ve, {
                                      name: "template",
                                      className: "flex min-w-0 flex-1 flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted",
                                      children: [
                                        r.jsx(Te, {
                                          asChild: true,
                                          children: r.jsx("span", {
                                            children: r.jsx(Me, {
                                              icon: r.jsx(cn, {
                                                className: V
                                              }),
                                              children: "\uD15C\uD50C\uB9BF"
                                            })
                                          })
                                        }),
                                        r.jsx(wt, {
                                          "aria-label": "\uD45C \uD15C\uD50C\uB9BF",
                                          value: o.templateId ?? Rt,
                                          onValueChange: (i) => {
                                            if (i === Rt) {
                                              u((g) => {
                                                const b = {
                                                  ...g
                                                };
                                                return delete b.templateId, b;
                                              });
                                              return;
                                            }
                                            const d = R.find((g) => g.id === i);
                                            d && u((g) => to(g, d));
                                          },
                                          options: [
                                            {
                                              value: Rt,
                                              label: "\uD15C\uD50C\uB9BF \uC5C6\uC74C"
                                            },
                                            ...R.map((i) => ({
                                              value: i.id,
                                              label: i.name
                                            }))
                                          ],
                                          className: "w-full min-w-0"
                                        })
                                      ]
                                    }),
                                    r.jsxs("button", {
                                      type: "button",
                                      className: "mt-auto inline-flex h-8 items-center gap-1 self-end rounded-md bg-gray-100 px-2 text-[11px] dark:bg-odp-bgSoft",
                                      onClick: () => {
                                        P({
                                          id: `template-${Date.now().toString(36)}`,
                                          name: "\uC0C8 \uD15C\uD50C\uB9BF",
                                          sections: {},
                                          rules: []
                                        }), $(true);
                                      },
                                      children: [
                                        r.jsx(cn, {
                                          className: V,
                                          "aria-hidden": true
                                        }),
                                        "\uAD00\uB9AC"
                                      ]
                                    })
                                  ]
                                }),
                                r.jsxs("div", {
                                  className: "grid grid-cols-2 gap-2",
                                  children: [
                                    r.jsxs(ve, {
                                      name: "noHeader",
                                      className: "col-span-2 flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted",
                                      children: [
                                        r.jsx(Te, {
                                          asChild: true,
                                          children: r.jsx("span", {
                                            children: r.jsx(Me, {
                                              icon: r.jsx(Ct, {
                                                className: V
                                              }),
                                              children: "noHeader"
                                            })
                                          })
                                        }),
                                        r.jsxs("label", {
                                          className: "flex cursor-pointer items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-2 py-1.5 dark:border-odp-borderSoft dark:bg-odp-surface",
                                          children: [
                                            r.jsx("span", {
                                              className: "min-w-0 text-[11px] leading-snug text-gray-600 dark:text-odp-muted",
                                              children: "thead/th \uC5C6\uC774 \uBAA8\uB450 tbody/td"
                                            }),
                                            r.jsx(Pt, {
                                              className: qs(!!o.noHeader),
                                              checked: !!o.noHeader,
                                              onCheckedChange: (i) => u((d) => {
                                                if (i) return {
                                                  ...d,
                                                  noHeader: true
                                                };
                                                const { noHeader: g, ...b } = d;
                                                return b;
                                              }),
                                              "aria-label": "noHeader",
                                              children: r.jsx(Lt, {
                                                className: Xs
                                              })
                                            })
                                          ]
                                        })
                                      ]
                                    }),
                                    r.jsxs(ve, {
                                      name: "headerRows",
                                      className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${o.noHeader ? "opacity-40" : ""}`,
                                      children: [
                                        r.jsx(Te, {
                                          asChild: true,
                                          children: r.jsx("span", {
                                            children: r.jsx(Me, {
                                              icon: r.jsx(Ct, {
                                                className: V
                                              }),
                                              children: "headerRows"
                                            })
                                          })
                                        }),
                                        r.jsx(ot, {
                                          asChild: true,
                                          children: r.jsx("input", {
                                            type: "number",
                                            min: 0,
                                            max: k,
                                            value: o.headerRows,
                                            disabled: !!o.noHeader,
                                            onChange: (i) => u((d) => ({
                                              ...d,
                                              headerRows: Math.max(0, Number(i.target.value) || 0)
                                            })),
                                            className: yt
                                          })
                                        })
                                      ]
                                    }),
                                    r.jsxs(ve, {
                                      name: "footerRows",
                                      className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted",
                                      children: [
                                        r.jsx(Te, {
                                          asChild: true,
                                          children: r.jsx("span", {
                                            children: r.jsx(Me, {
                                              icon: r.jsx(un, {
                                                className: V
                                              }),
                                              children: "footerRows"
                                            })
                                          })
                                        }),
                                        r.jsx(ot, {
                                          asChild: true,
                                          children: r.jsx("input", {
                                            type: "number",
                                            min: 0,
                                            max: k,
                                            value: o.footerRows,
                                            onChange: (i) => u((d) => ({
                                              ...d,
                                              footerRows: Math.max(0, Number(i.target.value) || 0)
                                            })),
                                            className: yt
                                          })
                                        })
                                      ]
                                    }),
                                    r.jsxs(ve, {
                                      name: "width",
                                      className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted",
                                      children: [
                                        r.jsx(Te, {
                                          asChild: true,
                                          children: r.jsx("span", {
                                            children: r.jsx(Me, {
                                              icon: r.jsx(So, {
                                                className: V
                                              }),
                                              children: "\uB108\uBE44"
                                            })
                                          })
                                        }),
                                        r.jsx(wt, {
                                          "aria-label": "\uD45C \uB108\uBE44",
                                          value: o.width,
                                          onValueChange: (i) => u((d) => ({
                                            ...d,
                                            width: i === "fit" ? "fit" : "full"
                                          })),
                                          options: [
                                            ...Zs
                                          ],
                                          className: "w-full"
                                        })
                                      ]
                                    }),
                                    r.jsxs(ve, {
                                      name: "align",
                                      className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${o.width !== "fit" ? "opacity-40" : ""}`,
                                      children: [
                                        r.jsx(Te, {
                                          asChild: true,
                                          children: r.jsx("span", {
                                            children: r.jsx(Me, {
                                              icon: o.align === "right" ? r.jsx(jo, {
                                                className: V
                                              }) : r.jsx(Ro, {
                                                className: V
                                              }),
                                              children: "\uC815\uB82C"
                                            })
                                          })
                                        }),
                                        r.jsx(wt, {
                                          "aria-label": "\uD45C \uC815\uB82C",
                                          value: o.align,
                                          disabled: o.width !== "fit",
                                          onValueChange: (i) => u((d) => ({
                                            ...d,
                                            align: i === "right" ? "right" : "left"
                                          })),
                                          options: [
                                            ...Js
                                          ],
                                          className: "w-full"
                                        })
                                      ]
                                    })
                                  ]
                                }),
                                r.jsxs("div", {
                                  className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border",
                                  children: [
                                    r.jsx("p", {
                                      className: "text-[10px] font-medium text-gray-600 dark:text-odp-muted",
                                      children: "\uD45C \uAE30\uBCF8 \uD3F0\uD2B8\xB7\uC2A4\uD0C0\uC77C"
                                    }),
                                    r.jsx("p", {
                                      className: "text-[10px] text-gray-400 dark:text-odp-muted",
                                      children: "\uC140\xB7\uADF8\uB8F9 \uAC12\uC774 \uC788\uC73C\uBA74 \uADF8\uCABD\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4."
                                    }),
                                    r.jsx(kt, {
                                      compact: true,
                                      idPrefix: "table-edit-table",
                                      value: o.style ?? {},
                                      onChange: (i) => u((d) => ({
                                        ...d,
                                        style: sn(i) ? {} : i
                                      }))
                                    })
                                  ]
                                }),
                                r.jsxs("div", {
                                  className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border",
                                  children: [
                                    r.jsxs("p", {
                                      className: "inline-flex items-center gap-1 text-[10px] font-medium text-gray-600 dark:text-odp-muted",
                                      children: [
                                        r.jsx(dn, {
                                          className: V,
                                          "aria-hidden": true
                                        }),
                                        "\uADF8\uB8F9 \uC2A4\uD0C0\uC77C"
                                      ]
                                    }),
                                    r.jsx("p", {
                                      className: "text-[10px] text-gray-400 dark:text-odp-muted",
                                      children: "thead / tbody / tfoot \uAD6C\uC5ED"
                                    }),
                                    r.jsx("div", {
                                      className: "mb-1 flex flex-wrap gap-1",
                                      children: Us.map((i) => r.jsxs("button", {
                                        type: "button",
                                        onClick: () => y(i),
                                        className: `inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] ${w === i ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-odp-bgSoft"}`,
                                        children: [
                                          Ar(i),
                                          i
                                        ]
                                      }, i))
                                    }),
                                    r.jsx(kt, {
                                      compact: true,
                                      idPrefix: `table-edit-${w}`,
                                      value: o.sections[w] ?? {},
                                      onChange: (i) => u((d) => ({
                                        ...d,
                                        sections: {
                                          ...d.sections,
                                          [w]: i
                                        }
                                      }))
                                    })
                                  ]
                                })
                              ]
                            })
                          ]
                        }),
                        r.jsx(Mn, {
                          ariaLabel: "\uD45C \uC0AC\uC774\uB4DC\uBC14\uC640 \uC140 \uC0AC\uC774\uB4DC\uBC14 \uC0AC\uC774 \uB108\uBE44 \uC870\uC808",
                          onDelta: Ue
                        }),
                        r.jsx("aside", {
                          "aria-hidden": !we,
                          className: `flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-blue-200 bg-white dark:border-blue-900/50 dark:bg-odp-surface landscape:flex-none landscape:shrink-0 ${we ? "" : "pointer-events-none portrait:hidden landscape:invisible"}`,
                          style: ge ? {
                            width: Q
                          } : void 0,
                          children: X ? r.jsxs(r.Fragment, {
                            children: [
                              r.jsx("div", {
                                className: "sticky top-0 z-[1] border-b border-blue-100 bg-white px-2.5 py-1.5 dark:border-blue-900/40 dark:bg-odp-surface",
                                children: r.jsxs("h3", {
                                  className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong",
                                  children: [
                                    r.jsx(Eo, {
                                      className: V,
                                      "aria-hidden": true
                                    }),
                                    "\uC140",
                                    r.jsxs("span", {
                                      className: "font-normal text-gray-400 dark:text-odp-muted",
                                      children: [
                                        "(",
                                        X.r + 1,
                                        "\uD589 ",
                                        X.c + 1,
                                        "\uC5F4",
                                        B.length > 1 ? ` \xB7 ${B.length}\uCE78` : "",
                                        ")"
                                      ]
                                    })
                                  ]
                                })
                              }),
                              r.jsxs("div", {
                                className: "space-y-2 p-2.5",
                                children: [
                                  r.jsxs("div", {
                                    className: "flex flex-wrap gap-1.5",
                                    children: [
                                      r.jsxs("button", {
                                        type: "button",
                                        disabled: !Cr,
                                        title: `\uBCD1\uD569 (${ta})`,
                                        className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft",
                                        onClick: mt,
                                        children: [
                                          r.jsx(No, {
                                            className: V,
                                            "aria-hidden": true
                                          }),
                                          "\uBCD1\uD569"
                                        ]
                                      }),
                                      r.jsxs("button", {
                                        type: "button",
                                        disabled: !c,
                                        title: `\uBCD1\uD569 \uD574\uC81C (${na})`,
                                        className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft",
                                        onClick: xt,
                                        children: [
                                          r.jsx(To, {
                                            className: V,
                                            "aria-hidden": true
                                          }),
                                          "\uBCD1\uD569 \uD574\uC81C"
                                        ]
                                      })
                                    ]
                                  }),
                                  r.jsxs("p", {
                                    className: "text-[10px] text-gray-400 dark:text-odp-muted",
                                    children: [
                                      "\uAE00\uC790 \uD06C\uAE30: ",
                                      ra,
                                      " / ",
                                      oa
                                    ]
                                  }),
                                  r.jsxs(ve, {
                                    name: "cell-text",
                                    className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted",
                                    children: [
                                      r.jsx(Te, {
                                        asChild: true,
                                        children: r.jsx("span", {
                                          children: r.jsx(Me, {
                                            icon: r.jsx(Mo, {
                                              className: V
                                            }),
                                            children: "\uC140 \uD14D\uC2A4\uD2B8"
                                          })
                                        })
                                      }),
                                      r.jsx(ot, {
                                        asChild: true,
                                        children: r.jsx("input", {
                                          type: "text",
                                          value: Pr,
                                          onChange: (i) => Xt(X.r, X.c, i.target.value),
                                          placeholder: "\uC140 \uB0B4\uC6A9 \uC785\uB825",
                                          className: no
                                        })
                                      })
                                    ]
                                  }),
                                  r.jsx(kt, {
                                    compact: true,
                                    idPrefix: "table-edit-cell",
                                    value: yr,
                                    onChange: vr
                                  })
                                ]
                              })
                            ]
                          }) : null
                        }),
                        r.jsx(Mn, {
                          ariaLabel: "\uC0AC\uC774\uB4DC\uBC14\uC640 \uD45C \uC0AC\uC774 \uB108\uBE44 \uC870\uC808",
                          onDelta: Ke
                        })
                      ]
                    }),
                    r.jsxs("div", {
                      ref: me,
                      "data-haim-table-canvas": "",
                      className: `order-1 flex min-h-0 min-w-0 flex-1 flex-col overflow-auto border-t border-gray-100 p-3 landscape:order-2 landscape:border-t-0 landscape:border-l dark:border-odp-border ${ae ? "cursor-grabbing select-none" : he && !c ? "cursor-grab select-none" : ""}`,
                      onMouseLeave: () => {
                        j || H(null);
                      },
                      onPointerDown: Er,
                      onPointerMove: Nr,
                      onPointerUp: Jt,
                      onPointerCancel: Jt,
                      onAuxClick: (i) => {
                        i.button === 1 && i.preventDefault();
                      },
                      children: [
                        r.jsxs("p", {
                          className: "mb-2 inline-flex shrink-0 items-center gap-1 text-[10px] text-gray-400",
                          children: [
                            r.jsx(Po, {
                              className: V,
                              "aria-hidden": true
                            }),
                            "\uB354\uBE14\uD074\uB9AD \uB4DC\uB798\uADF8\xB7Shift+\uD074\uB9AD: \uBC94\uC704 \uC120\uD0DD \xB7 \uC6B0\uD074\uB9AD: \uD589/\uC5F4 \uC0AD\uC81C \xB7 \uD720\uD074\uB9AD/\uC2A4\uD398\uC774\uC2A4+\uB4DC\uB798\uADF8: \uD328\uB2DD \xB7 ",
                            Et,
                            "/",
                            Nt,
                            ": \uC2E4\uD589 \uCDE8\uC18C/\uB2E4\uC2DC \uC2E4\uD589 \xB7 \uD14C\uB450\uB9AC \uB354\uBE14\uD074\uB9AD: \uD589\xB7\uC5F4 \uCD94\uAC00"
                          ]
                        }),
                        r.jsx("div", {
                          ref: xe,
                          className: "relative inline-block min-w-full p-5",
                          "data-haim-inserting": (S == null ? void 0 : S.kind) ?? void 0,
                          onMouseMove: Sr,
                          onMouseLeave: () => {
                            j || H(null);
                          },
                          children: r.jsxs(Un, {
                            delayDuration: 0,
                            skipDelayDuration: 0,
                            children: [
                              r.jsxs("table", {
                                ref: le,
                                className: `border-collapse text-sm ${((_a2 = o.colWidths) == null ? void 0 : _a2.some((i) => i && i.trim())) ? "w-max max-w-full" : "w-full"}`,
                                style: {
                                  tableLayout: ((_b = o.colWidths) == null ? void 0 : _b.some((i) => i && i.trim())) || ((_c = o.rowHeights) == null ? void 0 : _c.some((i) => i && i.trim())) ? "fixed" : void 0,
                                  ...((_d = o.style) == null ? void 0 : _d.fontFamily) ? {
                                    fontFamily: o.style.fontFamily
                                  } : {},
                                  ...((_e2 = o.style) == null ? void 0 : _e2.fontSize) ? {
                                    fontSize: o.style.fontSize
                                  } : {},
                                  ...((_f = o.style) == null ? void 0 : _f.fontWeight) ? {
                                    fontWeight: o.style.fontWeight
                                  } : {}
                                },
                                children: [
                                  r.jsx("colgroup", {
                                    children: Array.from({
                                      length: L
                                    }, (i, d) => {
                                      const g = vt(o.colWidths, d);
                                      return r.jsx("col", {
                                        style: g ? {
                                          width: g
                                        } : void 0
                                      }, d);
                                    })
                                  }),
                                  r.jsx("tbody", {
                                    children: f.rows.map((i, d) => {
                                      const g = vt(o.rowHeights, d);
                                      return r.jsx("tr", {
                                        style: g ? {
                                          height: g
                                        } : void 0,
                                        children: Array.from({
                                          length: L
                                        }, (b, x) => {
                                          if (m.has(`${d},${x}`)) return null;
                                          const z = ro(o.merges, d, x), _ = en(d, x), oe = vt(o.colWidths, x), Ne = r.jsx("td", {
                                            "data-edit-r": d,
                                            "data-edit-c": x,
                                            colSpan: z == null ? void 0 : z.colspan,
                                            rowSpan: z == null ? void 0 : z.rowspan,
                                            className: `min-h-11 cursor-pointer border-2 border-gray-300 p-0 transition-[box-shadow,outline-color] dark:border-odp-borderStrong ${oe ? "" : "min-w-28"} ${_ ? "relative z-[1] outline outline-2 outline-offset-[-2px] outline-blue-500 ring-0" : "hover:relative hover:z-[1] hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-blue-400/70"}`,
                                            onContextMenu: () => {
                                              en(d, x) || Xe(d, x), T && (J({
                                                r: d,
                                                c: x
                                              }), H(null));
                                            },
                                            onMouseDown: (N) => {
                                              var _a3, _b2;
                                              if (N.button === 1 || N.button !== 0 || Se.current || Ce.current && !re.current) return;
                                              if ((_b2 = (_a3 = N.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-hit], [data-haim-edge-add]")) {
                                                N.preventDefault();
                                                return;
                                              }
                                              {
                                                const de = le.current, Ye = xe.current;
                                                if (de && Ye && Ve(de, Ye, N.clientX, N.clientY, k, L, o.merges)) {
                                                  N.preventDefault();
                                                  return;
                                                }
                                              }
                                              if (N.shiftKey) {
                                                N.preventDefault(), Vt(d, x);
                                                return;
                                              }
                                              if (N.detail >= 2) {
                                                N.preventDefault(), bt(d, x);
                                                return;
                                              }
                                              Xe(d, x);
                                            },
                                            onDoubleClick: (N) => {
                                              const se = le.current, de = xe.current;
                                              if (se && de && Ve(se, de, N.clientX, N.clientY, k, L, o.merges)) {
                                                N.preventDefault(), N.stopPropagation();
                                                return;
                                              }
                                              N.preventDefault(), bt(d, x);
                                            },
                                            onMouseEnter: () => {
                                              Rr(d, x);
                                            },
                                            children: r.jsx(ve, {
                                              name: `cell-${d}-${x}`,
                                              className: "contents",
                                              children: r.jsx(ot, {
                                                asChild: true,
                                                children: r.jsx("input", {
                                                  type: "text",
                                                  value: i[x] ?? "",
                                                  onChange: (N) => Xt(d, x, N.target.value),
                                                  onKeyDown: (N) => Mr(N, d, x),
                                                  onMouseDown: (N) => {
                                                    var _a3, _b2;
                                                    if (N.button !== 1 && N.button === 0 && !Se.current && !(Ce.current && !re.current)) {
                                                      if ((_b2 = (_a3 = N.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-hit], [data-haim-edge-add]")) {
                                                        N.preventDefault(), N.stopPropagation();
                                                        return;
                                                      }
                                                      {
                                                        const se = le.current, de = xe.current;
                                                        if (se && de && Ve(se, de, N.clientX, N.clientY, k, L, o.merges)) {
                                                          N.preventDefault(), N.stopPropagation();
                                                          return;
                                                        }
                                                      }
                                                      if (N.shiftKey) {
                                                        N.preventDefault(), N.stopPropagation(), Vt(d, x);
                                                        return;
                                                      }
                                                      if (N.detail >= 2) {
                                                        N.preventDefault();
                                                        return;
                                                      }
                                                      N.stopPropagation();
                                                    }
                                                  },
                                                  onDoubleClick: (N) => {
                                                    const se = le.current, de = xe.current;
                                                    if (se && de && Ve(se, de, N.clientX, N.clientY, k, L, o.merges)) {
                                                      N.preventDefault(), N.stopPropagation();
                                                      return;
                                                    }
                                                    N.preventDefault(), N.stopPropagation(), bt(d, x);
                                                  },
                                                  onFocus: () => {
                                                    ne.current || Ce.current && !re.current || Xe(d, x);
                                                  },
                                                  className: `${yt} h-full min-h-11 w-full cursor-pointer border-transparent bg-transparent px-2 text-sm focus:cursor-text focus:border-gray-300 focus:bg-white/90 dark:focus:bg-odp-bgSoft/90 ${oe ? "" : "min-w-28"}`,
                                                  style: {
                                                    ...Lr(d, x),
                                                    ...g ? {
                                                      height: g
                                                    } : {}
                                                  }
                                                })
                                              })
                                            })
                                          }, x);
                                          return T ? Ne : r.jsxs($r, {
                                            onOpenChange: (N) => {
                                              J(N ? {
                                                r: d,
                                                c: x
                                              } : null), N ? H(null) : ze();
                                            },
                                            children: [
                                              r.jsx(Br, {
                                                asChild: true,
                                                children: Ne
                                              }),
                                              r.jsx(Hr, {
                                                children: r.jsxs(Fr, {
                                                  className: ea,
                                                  onCloseAutoFocus: (N) => N.preventDefault(),
                                                  children: [
                                                    r.jsxs(rn, {
                                                      className: Tn,
                                                      disabled: k <= 1,
                                                      onPointerEnter: () => Ut(d),
                                                      onPointerLeave: ze,
                                                      onFocus: () => Ut(d),
                                                      onBlur: ze,
                                                      onSelect: () => {
                                                        Ft(d);
                                                      },
                                                      children: [
                                                        r.jsx(_e, {
                                                          className: V,
                                                          "aria-hidden": true
                                                        }),
                                                        "\uD589 \uC0AD\uC81C"
                                                      ]
                                                    }),
                                                    r.jsxs(rn, {
                                                      className: Tn,
                                                      disabled: L <= 1,
                                                      onPointerEnter: () => Kt(x),
                                                      onPointerLeave: ze,
                                                      onFocus: () => Kt(x),
                                                      onBlur: ze,
                                                      onSelect: () => {
                                                        Wt(x);
                                                      },
                                                      children: [
                                                        r.jsx(_e, {
                                                          className: V,
                                                          "aria-hidden": true
                                                        }),
                                                        "\uC5F4 \uC0AD\uC81C"
                                                      ]
                                                    })
                                                  ]
                                                })
                                              })
                                            ]
                                          }, x);
                                        })
                                      }, d);
                                    })
                                  })
                                ]
                              }),
                              W ? r.jsx(fa, {
                                kind: W.kind,
                                indices: W.indices,
                                table: le.current,
                                wrap: xe.current,
                                colCount: L
                              }) : null,
                              T && ee ? r.jsxs(nr, {
                                open: U,
                                onOpenChange: (i) => {
                                  i || (J(null), ze());
                                },
                                title: `${ee.r + 1}\uD589 ${ee.c + 1}\uC5F4`,
                                subtitle: "\uD45C \uD3B8\uC9D1 \uC140",
                                children: [
                                  r.jsxs("button", {
                                    type: "button",
                                    className: At,
                                    disabled: k <= 1,
                                    onClick: () => {
                                      Ft(ee.r), J(null);
                                    },
                                    children: [
                                      r.jsx(_e, {
                                        className: V,
                                        "aria-hidden": true
                                      }),
                                      "\uD589 \uC0AD\uC81C"
                                    ]
                                  }),
                                  r.jsxs("button", {
                                    type: "button",
                                    className: At,
                                    disabled: L <= 1,
                                    onClick: () => {
                                      Wt(ee.c), J(null);
                                    },
                                    children: [
                                      r.jsx(_e, {
                                        className: V,
                                        "aria-hidden": true
                                      }),
                                      "\uC5F4 \uC0AD\uC81C"
                                    ]
                                  })
                                ]
                              }) : null,
                              S && !U ? r.jsxs(r.Fragment, {
                                children: [
                                  r.jsx(da, {
                                    insert: S
                                  }, `preview-${S.kind}-${S.index}`),
                                  r.jsx(ua, {
                                    insert: S,
                                    allowResize: S.index !== 0,
                                    tip: S.index === 0 ? S.label : `${S.label} \xB7 ${Pn(S.kind)}`,
                                    onDoubleClickInsert: () => {
                                      const { kind: i, index: d } = S;
                                      i === "row" ? Bt(d) : Ht(d);
                                    },
                                    onResizePointerDown: (i) => jr(i, S)
                                  }, `hit-${S.kind}-${S.index}`),
                                  r.jsx(ca, {
                                    tip: S.index === 0 ? S.label : `${S.label} \xB7 ${Pn(S.kind)}`,
                                    onDoubleClick: () => {
                                      const { kind: i, index: d } = S;
                                      i === "row" ? Bt(d) : Ht(d);
                                    },
                                    style: {
                                      left: S.x,
                                      top: S.y
                                    }
                                  }, `btn-${S.kind}-${S.index}`)
                                ]
                              }) : null
                            ]
                          })
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            r.jsx(wo, {
              isOpen: E,
              template: A,
              onClose: () => {
                $(false), P(null);
              },
              onSave: (i) => {
                const g = [
                  ...so().templates.filter((b) => b.id !== (A == null ? void 0 : A.id) && b.id !== i.id),
                  i
                ];
                oo({
                  templates: g
                }).then((b) => {
                  O(b.templates), $(false), P(null);
                });
              }
            })
          ]
        }),
        typeof document < "u" ? zt.createPortal(r.jsx("div", {
          className: "relative z-[100060]",
          children: r.jsx(rr, {
            isOpen: M !== null,
            variant: "danger",
            title: (M == null ? void 0 : M.kind) === "col" ? "\uC5F4 \uC0AD\uC81C" : "\uD589 \uC0AD\uC81C",
            message: (M == null ? void 0 : M.kind) === "col" ? M.indices.length > 1 ? `\uC120\uD0DD\uD55C ${M.indices.length}\uAC1C \uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(M.indices[0] ?? 0) + 1}\uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : M ? M.indices.length > 1 ? `\uC120\uD0DD\uD55C ${M.indices.length}\uAC1C \uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(M.indices[0] ?? 0) + 1}\uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : "",
            confirmLabel: "\uC0AD\uC81C",
            cancelLabel: "\uCDE8\uC18C",
            onConfirm: kr,
            onCancel: () => D(null)
          })
        }), document.body) : null
      ]
    });
  };
  const ga = ".export-pdf-cover-stack", zn = ".export-pdf-overlay-portal";
  _t = function(e) {
    if (!e || typeof window > "u") return 1;
    let t = 1, n = e;
    for (; n; ) {
      const s = window.getComputedStyle(n).zoom;
      if (s && s !== "normal") {
        const l = Number.parseFloat(s);
        Number.isFinite(l) && l > 0 && (t *= l);
      }
      n = n.parentElement;
    }
    return t;
  };
  function In(e, t) {
    const n = t > 0 ? t : 1;
    return e / n;
  }
  _n = function(e, t) {
    const n = t > 0 ? t : 1;
    return e / n;
  };
  function Dt(e, t, n) {
    if (t < 1) return true;
    const s = t * (n > 0 ? n : 1);
    return Math.abs(e - s) <= Math.abs(e - t);
  }
  function ma(e) {
    return e.closest(ga);
  }
  xa = function(e) {
    if (!e) return null;
    const t = e instanceof Element ? e.querySelector(zn) : null;
    return t instanceof HTMLElement ? t : e instanceof HTMLElement && e.matches(zn) ? e : null;
  };
  function ba(e, t) {
    const n = _t(e), s = n > 0 ? n : 1, l = e.getBoundingClientRect(), o = t.getBoundingClientRect(), u = e.offsetWidth, f = e.offsetHeight;
    return Dt(l.width, u, n) ? {
      left: (l.left - o.left) / s,
      top: (l.top - o.top) / s,
      width: u,
      height: f
    } : {
      left: l.left - o.left,
      top: l.top - o.top,
      width: u,
      height: f
    };
  }
  wa = function(e) {
    const t = _t(e), n = e.getBoundingClientRect(), s = e.offsetWidth, l = e.offsetHeight, o = Dt(n.width, s, t) ? In(n.width, t) : s, u = Dt(n.height, l, t) ? In(n.height, t) : l;
    return {
      width: Math.max(1, Math.round(o)),
      height: Math.max(1, Math.round(u))
    };
  };
  function ya(e) {
    if (e instanceof HTMLElement) {
      const n = ma(e);
      if (n) return {
        ...ba(e, n),
        positioning: "zoom-root-absolute"
      };
    }
    const t = e.getBoundingClientRect();
    return {
      left: t.left,
      top: t.top,
      width: t.width,
      height: t.height,
      positioning: "viewport-fixed"
    };
  }
  va = function(e, t) {
    var _a2, _b;
    let n = 0, s = false, l = null;
    const o = (c) => {
      l && c && l.left === c.left && l.top === c.top && l.width === c.width && l.height === c.height && l.positioning === c.positioning || (l = c, t(c));
    }, u = () => {
      if (s) return;
      const c = e();
      if (!(c == null ? void 0 : c.isConnected)) {
        o(null);
        return;
      }
      const p = ya(c);
      if (p.width < 1 || p.height < 1) {
        o(null);
        return;
      }
      o(p);
    }, f = () => {
      s || (u(), n = requestAnimationFrame(f));
    }, h = () => {
      s || u();
    };
    return n = requestAnimationFrame(f), window.addEventListener("scroll", h, true), window.addEventListener("resize", h), (_a2 = window.visualViewport) == null ? void 0 : _a2.addEventListener("scroll", h), (_b = window.visualViewport) == null ? void 0 : _b.addEventListener("resize", h), () => {
      var _a3, _b2;
      s = true, cancelAnimationFrame(n), window.removeEventListener("scroll", h, true), window.removeEventListener("resize", h), (_a3 = window.visualViewport) == null ? void 0 : _a3.removeEventListener("scroll", h), (_b2 = window.visualViewport) == null ? void 0 : _b2.removeEventListener("resize", h);
    };
  };
  const ka = [
    "nw",
    "ne",
    "sw",
    "se"
  ], Ca = {
    nw: {
      left: 0,
      top: 0,
      cursor: "nwse-resize",
      transform: "translate(-50%, -50%)"
    },
    ne: {
      left: "100%",
      top: 0,
      cursor: "nesw-resize",
      transform: "translate(-50%, -50%)"
    },
    sw: {
      left: 0,
      top: "100%",
      cursor: "nesw-resize",
      transform: "translate(-50%, -50%)"
    },
    se: {
      left: "100%",
      top: "100%",
      cursor: "nwse-resize",
      transform: "translate(-50%, -50%)"
    }
  };
  function Sa(e) {
    return Jo(e);
  }
  oi = function({ containerRef: e, getMarkdown: t, setMarkdown: n, enabled: s = true }) {
    const [l, o] = a.useState(null), [u, f] = a.useState(null), h = a.useRef(null), c = a.useRef(false);
    h.current = l;
    const p = a.useCallback(() => {
      o(null), f(null), h.current = null;
    }, []);
    a.useEffect(() => {
      s || p();
    }, [
      p,
      s
    ]), a.useEffect(() => {
      if (!(l == null ? void 0 : l.table)) {
        f(null);
        return;
      }
      const y = l.table;
      return va(() => y.isConnected ? y : null, (R) => {
        if (!R) {
          p();
          return;
        }
        f(R);
      });
    }, [
      l,
      p
    ]), a.useEffect(() => {
      if (!s) return;
      const y = e.current;
      if (!y) return;
      const R = (O) => {
        var _a2, _b, _c, _d;
        if (c.current) return;
        const E = O.target;
        if (!E || ((_a2 = E.closest) == null ? void 0 : _a2.call(E, "[data-haim-table-resize-handle]")) || ((_b = E.closest) == null ? void 0 : _b.call(E, "[data-transform-handle]"))) return;
        const $ = Sa(y);
        if (!$) return;
        if (!$.contains(E)) {
          p();
          return;
        }
        const A = (_c = E.closest) == null ? void 0 : _c.call(E, "table");
        if (!A || !$.contains(A)) {
          p();
          return;
        }
        if ((_d = E.closest) == null ? void 0 : _d.call(E, "a, button, input, textarea, select")) return;
        const P = es(A, $);
        if (P < 0) return;
        const S = wa(A), H = {
          table: A,
          tableIndex: P,
          widthPx: Math.max(48, S.width),
          heightPx: Math.max(32, S.height)
        };
        h.current = H, o(H);
      };
      return y.addEventListener("pointerdown", R, true), () => y.removeEventListener("pointerdown", R, true);
    }, [
      p,
      e,
      s
    ]);
    const v = a.useCallback((y, R) => {
      y.preventDefault(), y.stopPropagation();
      const O = h.current;
      if (!(O == null ? void 0 : O.table)) return;
      c.current = true;
      const E = y.clientX, $ = y.clientY, A = O.widthPx, P = O.heightPx, S = P > 0 ? A / P : 1, H = y.pointerType === "touch";
      let j = false;
      const F = (K) => {
        const M = _t(O.table), D = _n(K.clientX - E, M), W = _n(K.clientY - $, M);
        (Math.abs(D) > 1 || Math.abs(W) > 1) && (j = true);
        let I = A, G = P;
        if (R.includes("e") && (I = A + D), R.includes("w") && (I = A - D), R.includes("s") && (G = P + W), R.includes("n") && (G = P - W), I = Math.max(48, I), G = Math.max(32, G), H || K.shiftKey) {
          const U = Math.abs((I - A) / Math.max(1, A)), T = Math.abs((G - P) / Math.max(1, P));
          U >= T ? G = Math.max(32, I / Math.max(1e-4, S)) : I = Math.max(48, G * S);
        }
        I = Math.max(48, Math.round(I)), G = Math.max(32, Math.round(G)), io(O.table, I, G);
        const J = {
          ...O,
          widthPx: I,
          heightPx: G
        };
        h.current = J, o(J);
      }, Y = () => {
        document.removeEventListener("pointermove", F, true), document.removeEventListener("pointerup", Y, true), document.removeEventListener("pointercancel", Y, true), c.current = false;
        const K = h.current;
        if (!K || !j || K.widthPx === A && K.heightPx === P) return;
        const M = Qo(t(), {
          tableIndex: K.tableIndex,
          widthPx: K.widthPx,
          heightPx: K.heightPx
        });
        M.updated && n(M.markdown);
      };
      document.addEventListener("pointermove", F, true), document.addEventListener("pointerup", Y, true), document.addEventListener("pointercancel", Y, true);
    }, [
      t,
      n
    ]);
    if (!s || !l || !u || typeof document > "u") return null;
    const C = u.positioning === "zoom-root-absolute" ? xa(e.current) : null, w = !!C;
    return zt.createPortal(r.jsx("div", {
      className: `pointer-events-none z-100040 border-2 border-blue-500 print:hidden ${w ? "absolute" : "fixed"}`,
      style: {
        left: u.left,
        top: u.top,
        width: u.width,
        height: u.height
      },
      "data-haim-table-resize-overlay": "",
      children: ka.map((y) => r.jsx("button", {
        type: "button",
        "aria-label": `\uD45C \uD06C\uAE30 \uC870\uC808 ${y}`,
        "data-haim-table-resize-handle": y,
        className: "pointer-events-auto absolute h-3.5 w-3.5 rounded-sm border-2 border-blue-500 bg-white shadow-sm dark:bg-odp-surface",
        style: Ca[y],
        onPointerDown: (R) => v(R, y)
      }, y))
    }), w ? C : document.body);
  };
  const ja = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", On = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-800 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-surface", $n = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", lt = "h-3.5 w-3.5 shrink-0";
  si = function({ containerRef: e, getMarkdown: t, setMarkdown: n, onEditTable: s, onEditFailed: l, findPreviewRoot: o, mobileMenuTitle: u = "\uBBF8\uB9AC\uBCF4\uAE30 \uD45C", mobileMenuSubtitle: f = "\uB9C8\uD06C\uB2E4\uC6B4 \uD14C\uC774\uBE14" }) {
    const h = er(), [c, p] = a.useState(false), [v, C] = a.useState(null), [w, y] = a.useState(null), R = a.useRef(null);
    R.current = v;
    const O = a.useCallback((j) => {
      C(j), p(true);
    }, []);
    a.useEffect(() => {
      const j = e.current;
      if (!j) return;
      const F = () => {
        const T = e.current;
        return T ? o ? o(T) : T.querySelector(".md-editor-preview") : null;
      }, Y = (T) => {
        var _a2, _b, _c, _d;
        if ((_b = (_a2 = T.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
        const q = F(), Z = (_d = (_c = T.target) == null ? void 0 : _c.closest) == null ? void 0 : _d.call(_c, "table");
        !(Z instanceof HTMLTableElement) || !(q == null ? void 0 : q.contains(Z)) || (T.preventDefault(), T.stopPropagation(), O({
          table: Z,
          previewRoot: q,
          x: T.clientX,
          y: T.clientY
        }));
      };
      let K = null, M = null, D = false, W = null;
      const I = () => {
        K && clearTimeout(K), K = null, M = null, W = null;
      }, G = (T) => {
        var _a2, _b;
        if (T.pointerType === "mouse") return;
        const q = F();
        if (!q) return;
        const Z = (_b = (_a2 = T.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "table");
        !(Z instanceof HTMLTableElement) || !q.contains(Z) || (I(), D = false, W = Z, M = {
          x: T.clientX,
          y: T.clientY
        }, K = setTimeout(() => {
          D = true, lo();
          const Q = F();
          W && Q && O({
            table: W,
            previewRoot: Q,
            x: (M == null ? void 0 : M.x) ?? T.clientX,
            y: (M == null ? void 0 : M.y) ?? T.clientY
          });
        }, co));
      }, ee = (T) => {
        if (!M) return;
        const q = T.clientX - M.x, Z = T.clientY - M.y;
        q * q + Z * Z > 100 && I();
      }, J = (T) => {
        D && (T.preventDefault(), T.stopPropagation()), I(), D = false;
      }, U = (T) => {
        var _a2, _b;
        const q = F(), Z = (_b = (_a2 = T.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "table");
        Z && (q == null ? void 0 : q.contains(Z)) && window.matchMedia("(pointer: coarse)").matches && T.preventDefault();
      };
      return j.addEventListener("contextmenu", Y, true), j.addEventListener("pointerdown", G), j.addEventListener("pointermove", ee), j.addEventListener("pointerup", J), j.addEventListener("pointercancel", J), j.addEventListener("contextmenu", U, true), () => {
        I(), j.removeEventListener("contextmenu", Y, true), j.removeEventListener("pointerdown", G), j.removeEventListener("pointermove", ee), j.removeEventListener("pointerup", J), j.removeEventListener("pointercancel", J), j.removeEventListener("contextmenu", U, true);
      };
    }, [
      e,
      o,
      O
    ]);
    const E = () => {
      const j = R.current;
      if (!j) return;
      s(j.table, j.previewRoot) || (l == null ? void 0 : l());
    }, $ = () => {
      const j = R.current;
      if (!j) return;
      const F = ur(t(), j.table, j.previewRoot);
      if (!F) {
        l == null ? void 0 : l();
        return;
      }
      y(F);
    }, A = () => {
      if (!w) return;
      const j = fo(t(), w);
      n(j), y(null);
    }, P = v ?? {
      x: 0,
      y: 0
    }, S = () => {
      p(false), C(null);
    }, H = r.jsxs(r.Fragment, {
      children: [
        r.jsxs("button", {
          type: "button",
          className: h ? uo : On,
          onClick: () => {
            E(), S();
          },
          children: [
            r.jsx(dt, {
              className: lt,
              "aria-hidden": true
            }),
            "\uD45C \uD3B8\uC9D1\uAE30"
          ]
        }),
        r.jsxs("button", {
          type: "button",
          className: h ? At : $n,
          onClick: () => {
            $(), S();
          },
          children: [
            r.jsx(_e, {
              className: lt,
              "aria-hidden": true
            }),
            "\uD45C \uC0AD\uC81C"
          ]
        })
      ]
    });
    return r.jsxs(r.Fragment, {
      children: [
        h ? r.jsx(nr, {
          open: c,
          onOpenChange: (j) => {
            p(j), j || C(null);
          },
          title: u,
          subtitle: f,
          children: H
        }) : r.jsxs(Wr, {
          open: c,
          onOpenChange: (j) => {
            p(j), j || C(null);
          },
          modal: true,
          children: [
            r.jsx(Ur, {
              asChild: true,
              children: r.jsx("button", {
                type: "button",
                "aria-hidden": true,
                tabIndex: -1,
                className: "pointer-events-none fixed h-px w-px opacity-0",
                style: {
                  left: P.x,
                  top: P.y
                }
              })
            }),
            r.jsx(Kr, {
              children: r.jsxs(qr, {
                className: ja,
                side: "bottom",
                align: "start",
                sideOffset: 2,
                collisionPadding: 12,
                onCloseAutoFocus: (j) => j.preventDefault(),
                children: [
                  r.jsxs(on, {
                    className: On,
                    onSelect: E,
                    children: [
                      r.jsx(dt, {
                        className: lt,
                        "aria-hidden": true
                      }),
                      "\uD45C \uD3B8\uC9D1\uAE30"
                    ]
                  }),
                  r.jsxs(on, {
                    className: $n,
                    onSelect: $,
                    children: [
                      r.jsx(_e, {
                        className: lt,
                        "aria-hidden": true
                      }),
                      "\uD45C \uC0AD\uC81C"
                    ]
                  })
                ]
              })
            })
          ]
        }),
        r.jsx(rr, {
          isOpen: w !== null,
          variant: "danger",
          title: "\uD45C \uC0AD\uC81C",
          message: "\uC774 \uD45C\uB97C \uB9C8\uD06C\uB2E4\uC6B4\uC5D0\uC11C \uC0AD\uC81C\uD560\uAE4C\uC694?",
          confirmLabel: "\uC0AD\uC81C",
          cancelLabel: "\uCDE8\uC18C",
          onConfirm: A,
          onCancel: () => y(null)
        })
      ]
    });
  };
  ai = function(e) {
    const [t, n] = a.useState(null), s = a.useRef(e.getMarkdown), l = a.useRef(e.setMarkdown);
    s.current = e.getMarkdown, l.current = e.setMarkdown;
    const o = a.useCallback((c, p = c) => {
      const v = s.current(), C = ln(v, c, p);
      return C ? (n({
        block: C,
        meta: C.meta ?? Je(),
        grid: C.grid
      }), true) : false;
    }, []), u = a.useCallback((c, p) => {
      const v = s.current(), C = ur(v, c, p);
      return C ? (n({
        block: C,
        meta: C.meta ?? Je(),
        grid: C.grid
      }), true) : false;
    }, []), f = a.useCallback(() => n(null), []), h = a.useCallback((c, p) => {
      if (!t) return;
      const v = s.current(), C = ln(v, t.block.start, t.block.start + 1) ?? t.block, w = Zn(v, C, c, p);
      l.current(w), n(null);
    }, [
      t
    ]);
    return {
      editState: t,
      openAtOffset: o,
      openPreviewTable: u,
      close: f,
      apply: h,
      isOpen: !!t
    };
  };
  function Ra(e) {
    const t = String(e ?? "").trim();
    return t && or(t) ? t : null;
  }
  mr = function(e, t) {
    const n = String(e ?? "").trim(), s = Ra(n), [l, o] = a.useState(() => s);
    return a.useEffect(() => {
      if (!n) {
        o(null);
        return;
      }
      if (or(n)) {
        o(n);
        return;
      }
      let u = false;
      return o(null), ho(n, typeof t == "function" ? t : async () => null).then((h) => {
        u || o(h || null);
      }), () => {
        u = true;
      };
    }, [
      n,
      t
    ]), s || l;
  };
  function Ea({ cover: e }) {
    const t = a.useMemo(() => go(e.webfonts), [
      e.webfonts
    ]);
    return t ? r.jsx("style", {
      "data-note-cover-webfonts": "1",
      children: t
    }) : null;
  }
  function Na({ path: e, getPresignedUrl: t }) {
    const n = mr(e, t);
    return n ? r.jsx("img", {
      src: n,
      alt: "",
      className: "pointer-events-none absolute inset-0 h-full w-full object-cover",
      draggable: false
    }) : null;
  }
  function Ta({ path: e, getPresignedUrl: t }) {
    const n = mr(e, t);
    return n ? r.jsx("img", {
      src: n,
      alt: "",
      className: "h-full w-full object-fill",
      draggable: false
    }) : r.jsx("div", {
      className: "flex h-full w-full items-center justify-center bg-neutral-100 text-[10px] text-neutral-400",
      children: "\uC774\uBBF8\uC9C0"
    });
  }
  function Tt(e) {
    return {
      position: "absolute",
      left: `${e.x}%`,
      top: `${e.y}%`,
      width: `${e.w}%`,
      height: `${e.h}%`
    };
  }
  Ma = function({ el: e, strictClip: t = false }) {
    const n = e.text ?? "";
    return r.jsx("div", {
      className: "h-full w-full",
      style: Yo(e),
      "data-cover-shape": e.type,
      children: n ? r.jsx("div", {
        style: Vo(e),
        children: r.jsx("div", {
          style: Zo(e, {
            strictClip: t
          }),
          children: n
        })
      }) : null
    });
  };
  ii = function({ cover: e, getPresignedUrl: t, className: n = "", style: s, showFrameOutline: l = false, renderElements: o = true, children: u }) {
    const f = Uo(e.layout), h = e.bg.color || "#ffffff";
    return r.jsxs("div", {
      className: `export-pdf-cover relative z-2 overflow-hidden bg-white text-gray-900 ${n}`,
      style: {
        width: "var(--print-page-width)",
        height: "var(--print-page-height)",
        backgroundColor: h,
        ...s
      },
      "data-note-cover": "1",
      onContextMenu: (c) => {
        c.stopPropagation();
      },
      children: [
        r.jsx(Ea, {
          cover: e
        }),
        e.bg.imagePath ? r.jsx(Na, {
          path: e.bg.imagePath,
          getPresignedUrl: t
        }) : null,
        r.jsxs("div", {
          className: `absolute top-0 bottom-0 ${l ? "outline outline-1 outline-dashed outline-blue-400/70" : ""}`,
          style: {
            left: `${f.leftPct}%`,
            width: `${f.widthPct}%`
          },
          "data-cover-frame": "1",
          children: [
            o ? e.elements.map((c) => c.type === "text" ? r.jsx("div", {
              "data-cover-el": c.id,
              style: {
                ...Tt(c),
                ...Xo(c)
              },
              children: c.text
            }, c.id) : po(c) ? r.jsx("div", {
              "data-cover-el": c.id,
              style: Tt(c),
              children: r.jsx(Ma, {
                el: c
              })
            }, c.id) : r.jsx("div", {
              "data-cover-el": c.id,
              style: Tt(c),
              children: r.jsx(Ta, {
                path: c.path,
                getPresignedUrl: t
              })
            }, c.id)) : null,
            u
          ]
        })
      ]
    });
  };
  const Pa = "data-md-footnote-to", xr = "data-md-footnote-back-button", La = 2, Aa = "is-hidden";
  let Ot = null;
  const Be = /* @__PURE__ */ new WeakMap();
  function Da(e) {
    return /^#(?:source-\d+|fnref-\d+(?:-\d+)?)$/i.test(String(e || "").trim());
  }
  function za(e, t) {
    var _a2;
    try {
      const n = `#${CSS.escape(e)}, [data-md-footnote-id="${CSS.escape(e)}"]`, s = (_a2 = t == null ? void 0 : t.querySelector) == null ? void 0 : _a2.call(t, n);
      if (s) return s;
    } catch {
    }
    return document.getElementById(e);
  }
  function Ia(e) {
    return /^source-\d+$/i.test(e);
  }
  function _a(e) {
    const t = mo(e);
    if (!t) {
      e.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
      return;
    }
    const n = e.getBoundingClientRect(), s = t.getBoundingClientRect(), l = t.scrollTop + (n.top - s.top) - La;
    t.scrollTo({
      top: Math.max(0, l),
      behavior: "smooth"
    });
  }
  function Bn(e, t) {
    const n = String(e || "").trim(), s = n.startsWith("#") ? n.slice(1) : n;
    if (!s) return false;
    const l = za(s, t);
    return l ? (Ia(s) ? _a(l) : l.scrollIntoView({
      block: "nearest",
      behavior: "smooth"
    }), true) : false;
  }
  function Hn(e, t) {
    var _a2, _b;
    const n = (_a2 = e == null ? void 0 : e.closest) == null ? void 0 : _a2.call(e, ".md-editor-preview");
    return n && t.contains(n) ? n : ((_b = t.querySelector) == null ? void 0 : _b.call(t, ".md-editor-preview")) ?? t;
  }
  function Oa(e) {
    return (e == null ? void 0 : e.querySelector) ? e.querySelector(`[${xr}]`) : null;
  }
  function $t(e) {
    const t = Oa(e);
    if (!t) return;
    const n = !!(e && Be.get(e));
    t.classList.toggle(Aa, !n), t.toggleAttribute("aria-hidden", !n), t.toggleAttribute("disabled", !n), t.setAttribute("data-footnote-return-target", (e && Be.get(e)) ?? "");
  }
  function Mt(e) {
    e && Be.delete(e), Ot = null, $t(e);
  }
  function $a(e, t) {
    e && t ? Be.set(e, t) : e && Be.delete(e), Ot = t || null, $t(e);
  }
  li = function(e) {
    if (!e || typeof e.addEventListener != "function") return;
    const t = (n) => {
      var _a2, _b, _c, _d;
      const s = n;
      if (s.metaKey || s.ctrlKey || s.shiftKey || s.altKey || typeof s.button == "number" && s.button !== 0) return;
      const l = (_b = (_a2 = s.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, `[${xr}]`);
      if (l instanceof HTMLElement && e.contains(l)) {
        const p = Hn(s.target, e), v = p && Be.get(p) || Ot;
        if (!v) return;
        n.preventDefault(), n.stopPropagation(), Bn(v, p), Mt(p);
        return;
      }
      const o = (_d = (_c = s.target) == null ? void 0 : _c.closest) == null ? void 0 : _d.call(_c, "a[href], a[data-md-footnote-to]");
      if (!o || !e.contains(o)) return;
      const u = o.getAttribute(Pa) || "", f = o.getAttribute("href") || "", h = u || (Da(f) ? f.slice(1) : "");
      if (!h) return;
      const c = Hn(s.target, e);
      if (n.preventDefault(), n.stopPropagation(), h && h.startsWith("source-")) {
        const p = o.getAttribute("data-md-footnote-id") || o.id;
        p ? $a(c, p) : Mt(c);
      } else Mt(c);
      Bn(h, c);
    };
    return e.addEventListener("click", t, true), $t(e), () => e.removeEventListener("click", t, true);
  };
  const Fn = 30;
  function ct(e) {
    return e ? e.endsWith("px") ? e.slice(0, -2) : e : "";
  }
  function ut(e) {
    const t = String(e ?? "").trim();
    if (!t) return {
      normalized: null,
      error: null
    };
    const n = bo(t);
    return n ? {
      normalized: n,
      error: null
    } : {
      normalized: null,
      error: "\uC22B\uC790, px, %, vh, vw \uD615\uC2DD\uB9CC \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (\uC608: 320, 320px, 50%, 40vh, 60vw)"
    };
  }
  function Wn(e) {
    return e ? sr(e) && e.length > Fn ? e.slice(0, Fn) : e : "";
  }
  ci = function({ isOpen: e, onClose: t, path: n = "", kind: s = "wiki", initialWidth: l, initialHeight: o, imageSrc: u = "", onApply: f, onStartFreeTransform: h, onCrop: c, onConvertToWiki: p, onConvertToImgbb: v }) {
    const [C, w] = a.useState(() => ct(l)), [y, R] = a.useState(() => ct(o)), [O, E] = a.useState(""), [$, A] = a.useState(false), [P, S] = a.useState(false), [H, j] = a.useState(false);
    a.useEffect(() => {
      e && (w(ct(l)), R(ct(o)), E(""), A(false), S(false), j(false));
    }, [
      e,
      l,
      o,
      n,
      u
    ]);
    const F = a.useMemo(() => Wn(n), [
      n
    ]), Y = s === "markdown" && typeof p == "function", K = typeof v == "function" && !xo(n), M = P || H, D = a.useMemo(() => {
      if (!n) return "";
      const U = Wn(n), T = ut(C).normalized, q = ut(y).normalized;
      if (s === "markdown") {
        const Q = [];
        return T && Q.push(`w=${T}`), q && Q.push(`h=${q}`), Q.length ? `![](${U}){${Q.join(" ")}}` : `![](${U})`;
      }
      const Z = [];
      return T && Z.push(`w=${T}`), q && Z.push(`h=${q}`), Z.length ? `![[${U}|${Z.join(" ")}]]` : `![[${U}]]`;
    }, [
      n,
      s,
      C,
      y
    ]), W = () => {
      const U = ut(C);
      if (U.error) return E(U.error), null;
      const T = ut(y);
      return T.error ? (E(T.error), null) : (E(""), {
        width: U.normalized,
        height: T.normalized
      });
    }, I = () => {
      const U = W();
      U && (f == null ? void 0 : f(U), t == null ? void 0 : t());
    }, G = async () => {
      if (!Y || M) return;
      const U = W();
      if (U) {
        S(true), E("");
        try {
          await (p == null ? void 0 : p(U)), t == null ? void 0 : t();
        } catch (T) {
          const q = T instanceof Error && T.message ? T.message : "wiki image\uB85C \uBCC0\uACBD\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
          E(q);
        } finally {
          S(false);
        }
      }
    }, ee = async () => {
      if (!K || M) return;
      const U = W();
      if (U) {
        j(true), E("");
        try {
          await (v == null ? void 0 : v(U)), t == null ? void 0 : t();
        } catch (T) {
          const q = T instanceof Error && T.message ? T.message : "ImgBB\uB85C \uBCC0\uD658\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.";
          E(q);
        } finally {
          j(false);
        }
      }
    }, J = !!u && typeof c == "function";
    return r.jsx(tr, {
      isOpen: e,
      onClose: $ ? () => A(false) : t,
      onConfirm: $ || M ? void 0 : I,
      contentClassName: $ ? "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]" : "max-w-lg",
      resizeHeight: $,
      layoutKey: $ ? "crop" : "size",
      children: $ ? r.jsx($s, {
        imageSrc: u,
        fileName: sr(n) ? "image" : n,
        onCancel: () => A(false),
        onConfirm: async (U, T) => {
          await (c == null ? void 0 : c({
            file: U,
            widthPx: T.width,
            heightPx: T.height
          })), A(false), t == null ? void 0 : t();
        }
      }) : r.jsxs("div", {
        className: "p-6 flex flex-col gap-4",
        children: [
          r.jsx("h2", {
            className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong",
            children: "\uC774\uBBF8\uC9C0 \uD06C\uAE30"
          }),
          r.jsx("p", {
            className: "text-xs text-gray-500 dark:text-odp-muted break-all",
            children: F
          }),
          r.jsxs("label", {
            className: "block",
            children: [
              r.jsx("span", {
                className: "block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1",
                children: "\uB108\uBE44 (\uBE44\uC6B0\uBA74 \uAE30\uBCF8)"
              }),
              r.jsx("input", {
                type: "text",
                value: C,
                onChange: (U) => w(U.target.value),
                placeholder: "\uC608: 320 / 320px / 50% / 60vw",
                disabled: M,
                className: "w-full rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60"
              })
            ]
          }),
          r.jsxs("label", {
            className: "block",
            children: [
              r.jsx("span", {
                className: "block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1",
                children: "\uB192\uC774 (\uBE44\uC6B0\uBA74 \uAE30\uBCF8)"
              }),
              r.jsx("input", {
                type: "text",
                value: y,
                onChange: (U) => R(U.target.value),
                placeholder: "\uC608: 240 / 240px / 40% / 40vh",
                disabled: M,
                className: "w-full rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60"
              })
            ]
          }),
          r.jsx("p", {
            className: "text-xs text-gray-500 dark:text-odp-muted break-all",
            children: D
          }),
          O ? r.jsx("p", {
            className: "text-xs text-red-600 dark:text-red-300",
            children: O
          }) : null,
          r.jsxs("div", {
            className: "flex flex-wrap justify-end gap-2",
            children: [
              Y ? r.jsxs("button", {
                type: "button",
                onClick: () => {
                  G();
                },
                disabled: M,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  P ? r.jsx(Ze, {
                    size: 16,
                    className: "animate-spin"
                  }) : r.jsx(Ao, {
                    size: 16
                  }),
                  "wiki image\uB85C \uBCC0\uACBD"
                ]
              }) : null,
              K ? r.jsxs("button", {
                type: "button",
                onClick: () => {
                  ee();
                },
                disabled: M,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  H ? r.jsx(Ze, {
                    size: 16,
                    className: "animate-spin"
                  }) : r.jsx(Do, {
                    size: 16
                  }),
                  "ImgBB\uB85C \uBCC0\uD658"
                ]
              }) : null,
              J ? r.jsxs("button", {
                type: "button",
                onClick: () => A(true),
                disabled: M,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  r.jsx(ar, {
                    size: 16
                  }),
                  "\uC790\uB974\uAE30"
                ]
              }) : null,
              typeof h == "function" ? r.jsxs("button", {
                type: "button",
                onClick: () => {
                  h(), t == null ? void 0 : t();
                },
                disabled: M,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  r.jsx(zo, {
                    size: 16
                  }),
                  "\uC790\uC720\uBCC0\uD615"
                ]
              }) : null,
              r.jsxs("button", {
                type: "button",
                onClick: t,
                disabled: M,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition disabled:opacity-60",
                children: [
                  r.jsx(ir, {
                    size: 16
                  }),
                  "\uCDE8\uC18C"
                ]
              }),
              r.jsxs("button", {
                type: "button",
                onClick: I,
                disabled: M,
                className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition disabled:opacity-60",
                children: [
                  r.jsx(lr, {
                    size: 16
                  }),
                  "\uC801\uC6A9"
                ]
              })
            ]
          })
        ]
      })
    });
  };
  const br = "s3haim_toc_title_wrap";
  function Ba() {
    try {
      return typeof window > "u" ? false : window.localStorage.getItem(br) === "1";
    } catch {
      return false;
    }
  }
  function Ha(e) {
    try {
      if (typeof window > "u") return;
      window.localStorage.setItem(br, e ? "1" : "0");
    } catch {
    }
  }
  ui = function() {
    const [e, t] = a.useState(Ba), n = a.useCallback((s) => {
      t((l) => {
        const o = typeof s == "function" ? s(l) : !!s;
        return Ha(o), o;
      });
    }, []);
    return [
      e,
      n
    ];
  };
  di = function(e) {
    return e ? "whitespace-normal break-words [overflow-wrap:anywhere]" : "truncate";
  };
});
export {
  ii as C,
  oi as H,
  $s as N,
  ni as P,
  ri as T,
  ci as W,
  __tla,
  ui as a,
  li as b,
  si as c,
  ei as d,
  Xo as e,
  Ma as f,
  Ko as g,
  Zo as h,
  Vo as i,
  Yo as j,
  mr as k,
  Jo as l,
  xa as m,
  ti as n,
  wa as o,
  _t as p,
  Ja as r,
  va as s,
  di as t,
  ai as u,
  _n as v,
  Qa as w
};
