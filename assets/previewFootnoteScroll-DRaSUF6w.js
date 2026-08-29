import { r as f, j as s, a as gn } from "./vendor-react-BFxggocB.js";
import { A as ar, m as ir } from "./vendor-motion-b8oTnHK_.js";
import { b as mn, d as xn, T as bn, e as wn, f as vn, A as yn, l as lr, F as le, L as he, S as cr, g as ur, m as $e, r as dr, s as fr, t as hr, v as pr, I as Ot, w as gr, x as mr, y as xr, z as br, B as $t } from "./vendor-radix-j_e9Isqx.js";
import { k as Cn, ax as Pe, ay as kn, az as Sn, aA as We, aB as te, aC as En, aD as jn, aE as wr, aF as vr, aG as yr, m as Cr, aH as zt, aI as kr, aJ as Sr, v as Er, a7 as jr, a4 as Je, aK as Tr, a3 as Qe, aL as Mr, w as et, u as Rr, aM as Tn, aN as ct, aO as Nr, aP as Mn, aQ as Ht, aR as Pr, aS as Lr, aT as Dr, aU as Ar, aV as _r, aW as Ir, aX as Or, aY as Ft, aZ as Rn, I as $r, a_ as zr, a$ as Hr, b0 as Fr } from "./index-RtVxfB8B.js";
import { H as tt, T as Br } from "./TableStyleTemplateEditor-C8_w_qEJ.js";
import { J as Be, K as Wr, R as Kr, X as Ur, k as Xr, N as Bt, O as nt, Q as Wt, V as qr, W as Yr, l as Vr, Y as Kt, Z as Gr, _ as Zr, $ as Jr, a0 as Qr, a1 as eo, a2 as ve, a3 as to } from "./vendor-lucide-BNj_ckSR.js";
function no(e) {
  return { leftPct: 0, widthPct: 100 };
}
function ro(e, t) {
  return !(t > 0) || !Number.isFinite(e) ? 0 : Math.max(0, e) / t * 100;
}
function Bs(e, t, n, o) {
  var _a;
  const l = ro(t, n), a = [...e];
  if (a.length === 0) return e;
  const u = [...a].sort((c, x) => c.y - x.y || c.x - x.x);
  let d = ((_a = u[0]) == null ? void 0 : _a.y) ?? 0;
  const h = /* @__PURE__ */ new Map();
  for (const c of u) h.set(c.id, d), d += c.h + l;
  return e.map((c) => {
    const x = h.get(c.id);
    return x == null ? c : { ...c, y: x };
  });
}
function Ws(e, t) {
  return { ...e, layout: { ...e.layout, ...t, containerWidthPct: 100 } };
}
const Ks = 1.5;
function Ut(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Us(e) {
  const t = e % 6 * 3;
  return { x: Ut(18 + t, 0, 70), y: Ut(28 + t, 0, 70) };
}
const oo = "var(--cover-font-scale, 1)";
function Nn(e) {
  return `calc(${Number.isFinite(e) ? e : 16}px * ${oo})`;
}
function so(e, t) {
  return { boxSizing: "border-box", color: e.color, fontSize: Nn(e.fontSize), fontWeight: e.fontWeight, textAlign: e.textAlign, fontFamily: e.fontFamily || void 0, overflow: "hidden", whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "break-word", lineHeight: 1.25, ...(t == null ? void 0 : t.strictClip) ? { clipPath: "inset(0 0.2em 0.16em 0)" } : null };
}
function ao(e) {
  const t = e.type === "ellipse" ? "50%" : e.type === "roundRect" ? `${e.cornerRadiusPct ?? 4}%` : 0;
  return { boxSizing: "border-box", width: "100%", height: "100%", overflow: "hidden", backgroundColor: e.fill || "transparent", borderWidth: Math.max(0, e.borderWidth), borderStyle: e.borderStyle || "solid", borderColor: e.borderColor || "transparent", borderRadius: t };
}
function io(e) {
  return e === "middle" ? "center" : e === "bottom" ? "flex-end" : "flex-start";
}
function lo(e) {
  const t = e.paddingPct ?? 0;
  return { boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: io(e.textVAlign), width: "100%", height: "100%", margin: 0, padding: `${t}%`, overflow: "hidden" };
}
function co(e, t) {
  return { boxSizing: "border-box", width: "100%", margin: 0, padding: 0, border: 0, background: "transparent", outline: "none", resize: "none", overflow: "hidden", whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "break-word", lineHeight: 1.25, color: e.color || "#0c4a6e", fontSize: Nn(e.fontSize ?? 24), fontWeight: e.fontWeight ?? "normal", textAlign: e.textAlign ?? "center", fontFamily: e.fontFamily || void 0, ...(t == null ? void 0 : t.strictClip) ? { clipPath: "inset(0 0.2em 0.16em 0)" } : null };
}
function uo(e) {
  if (!e) return null;
  if (e.classList.contains("md-editor-preview")) return e;
  const t = e.querySelector("[data-export-pdf-pages]");
  return t instanceof Element ? t : e.querySelector(".md-editor-preview") ?? e.querySelector("#export-pdf-preview .md-editor-preview") ?? e.querySelector("[data-export-pdf-preview] .md-editor-preview") ?? null;
}
function Pn(e, t, n) {
  const o = Cn(e);
  if (!o.length) return null;
  const l = [...n.querySelectorAll("table")], a = l.indexOf(t);
  let u = a >= 0 ? o[a] : void 0;
  if (!u) {
    const h = l.filter((c) => c.getAttribute("data-haim-table") === "1").indexOf(t);
    h >= 0 && (u = o.filter((x) => x.meta != null)[h]);
  }
  return !u && o.length === 1 && (u = o[0]), u ?? null;
}
function fo(e, t) {
  const o = Cn(e)[t.tableIndex];
  if (!o) return { markdown: e, updated: false };
  const l = Math.max(48, Math.round(t.widthPx)), a = Math.max(32, Math.round(t.heightPx)), d = { ...o.meta ?? Pe(), width: "fit", boxWidth: `${l}px`, boxHeight: `${a}px` }, h = kn(e, o, d, o.grid);
  return { markdown: h, updated: h !== e };
}
function ho(e, t) {
  return [...t.querySelectorAll("table")].indexOf(e);
}
function po(e, t) {
  const n = {};
  for (const [o, l] of Object.entries(e)) {
    const a = We(o);
    if (!a) continue;
    const u = a.r >= t ? a.r + 1 : a.r;
    n[te(u, a.c)] = l;
  }
  return n;
}
function go(e, t) {
  const n = {};
  for (const [o, l] of Object.entries(e)) {
    const a = We(o);
    if (!a) continue;
    const u = a.c >= t ? a.c + 1 : a.c;
    n[te(a.r, u)] = l;
  }
  return n;
}
function mo(e, t) {
  const n = {};
  for (const [o, l] of Object.entries(e)) {
    const a = We(o);
    if (!a || a.r === t) continue;
    const u = a.r > t ? a.r - 1 : a.r;
    n[te(u, a.c)] = l;
  }
  return n;
}
function xo(e, t) {
  const n = {};
  for (const [o, l] of Object.entries(e)) {
    const a = We(o);
    if (!a || a.c === t) continue;
    const u = a.c > t ? a.c - 1 : a.c;
    n[te(a.r, u)] = l;
  }
  return n;
}
function bo(e, t) {
  return e.map((n) => n.r >= t ? { ...n, r: n.r + 1 } : n.r + n.rowspan > t ? { ...n, rowspan: n.rowspan + 1 } : n);
}
function wo(e, t) {
  return e.map((n) => n.c >= t ? { ...n, c: n.c + 1 } : n.c + n.colspan > t ? { ...n, colspan: n.colspan + 1 } : n);
}
function ye(e) {
  return e.rowspan < 1 || e.colspan < 1 || e.rowspan === 1 && e.colspan === 1 ? null : e;
}
function vo(e, t) {
  const n = [];
  for (const o of e) {
    if (o.r > t) {
      const l = ye({ ...o, r: o.r - 1 });
      l && n.push(l);
      continue;
    }
    if (o.r === t) {
      if (o.rowspan <= 1) continue;
      const l = ye({ ...o, rowspan: o.rowspan - 1 });
      l && n.push(l);
      continue;
    }
    if (o.r < t && o.r + o.rowspan > t) {
      const l = ye({ ...o, rowspan: o.rowspan - 1 });
      l && n.push(l);
      continue;
    }
    n.push(o);
  }
  return n;
}
function yo(e, t) {
  const n = [];
  for (const o of e) {
    if (o.c > t) {
      const l = ye({ ...o, c: o.c - 1 });
      l && n.push(l);
      continue;
    }
    if (o.c === t) {
      if (o.colspan <= 1) continue;
      const l = ye({ ...o, colspan: o.colspan - 1 });
      l && n.push(l);
      continue;
    }
    if (o.c < t && o.c + o.colspan > t) {
      const l = ye({ ...o, colspan: o.colspan - 1 });
      l && n.push(l);
      continue;
    }
    n.push(o);
  }
  return n;
}
function Co(e, t, n) {
  const o = t.merges.filter((d) => d.r === n && d.rowspan > 1);
  if (o.length === 0) return { grid: e, meta: t };
  const l = e.rows.map((d) => [...d]), a = { ...t.cells }, u = n + 1;
  for (const d of o) {
    const h = l[n], c = l[u];
    if (!h || !c) continue;
    for (; c.length <= d.c; ) c.push("");
    for (; h.length <= d.c; ) h.push("");
    const x = h[d.c] ?? "";
    x && (c[d.c] = x, h[d.c] = "");
    const E = te(n, d.c), S = te(u, d.c), b = a[E];
    b && (a[S] = { ...b }, delete a[E]);
  }
  return { grid: { rows: l, aligns: [...e.aligns] }, meta: { ...t, cells: a } };
}
function ko(e, t, n) {
  const o = t.merges.filter((u) => u.c === n && u.colspan > 1);
  if (o.length === 0) return { grid: e, meta: t };
  const l = e.rows.map((u) => [...u]), a = { ...t.cells };
  for (const u of o) {
    const d = l[u.r];
    if (!d) continue;
    for (; d.length <= u.c + 1; ) d.push("");
    const h = d[u.c] ?? "";
    h && (d[u.c + 1] = h, d[u.c] = "");
    const c = te(u.r, n), x = te(u.r, n + 1), E = a[c];
    E && (a[x] = { ...E }, delete a[c]);
  }
  return { grid: { rows: l, aligns: [...e.aligns] }, meta: { ...t, cells: a } };
}
function So(e, t, n) {
  const o = Math.max(1, ...e.rows.map((x) => x.length), e.aligns.length, 1), l = e.rows.length, a = Math.max(0, Math.min(n, l)), u = Array.from({ length: o }, () => ""), d = [...e.rows.slice(0, a), u, ...e.rows.slice(a)];
  let h = t.headerRows, c = t.footerRows;
  return a < h ? h += 1 : c > 0 && a >= l - c && (c += 1), { grid: { rows: d, aligns: [...e.aligns] }, meta: (() => {
    var _a;
    const x = { ...t, headerRows: h, footerRows: c, merges: bo(t.merges, a), cells: po(t.cells, a) };
    if ((_a = t.rowHeights) == null ? void 0 : _a.length) {
      const E = Sn(t.rowHeights, a);
      E && (x.rowHeights = E);
    }
    return x;
  })() };
}
function Eo(e, t, n) {
  const o = Math.max(1, ...e.rows.map((d) => d.length), e.aligns.length, 1), l = Math.max(0, Math.min(n, o)), a = e.rows.map((d) => {
    const h = [...d];
    for (; h.length < o; ) h.push("");
    return h.splice(l, 0, ""), h;
  });
  a.length === 0 && a.push(Array.from({ length: o + 1 }, () => ""));
  const u = [...e.aligns];
  for (; u.length < o; ) u.push(null);
  return u.splice(l, 0, null), { grid: { rows: a, aligns: u }, meta: (() => {
    var _a;
    const d = { ...t, merges: wo(t.merges, l), cells: go(t.cells, l) };
    if ((_a = t.colWidths) == null ? void 0 : _a.length) {
      const h = Sn(t.colWidths, l);
      h && (d.colWidths = h);
    }
    return d;
  })() };
}
function jo(e, t, n) {
  var _a;
  const o = e.rows.length;
  if (o <= 1) return { grid: e, meta: t };
  if (n < 0 || n >= o) return { grid: e, meta: t };
  const l = Co(e, t, n), a = [...l.grid.rows.slice(0, n), ...l.grid.rows.slice(n + 1)];
  let u = l.meta.headerRows, d = l.meta.footerRows;
  n < u ? u = Math.max(0, u - 1) : d > 0 && n >= o - d && (d = Math.max(0, d - 1));
  const h = a.length;
  u + d > h && (d = Math.max(0, h - u));
  const c = { ...l.meta, headerRows: u, footerRows: d, merges: vo(l.meta.merges, n), cells: mo(l.meta.cells, n) };
  if ((_a = l.meta.rowHeights) == null ? void 0 : _a.length) {
    const x = En(l.meta.rowHeights, n);
    x ? c.rowHeights = x : delete c.rowHeights;
  }
  return { grid: { rows: a, aligns: [...l.grid.aligns] }, meta: c };
}
function To(e, t, n) {
  var _a;
  const o = Math.max(1, ...e.rows.map((h) => h.length), e.aligns.length, 1);
  if (o <= 1) return { grid: e, meta: t };
  if (n < 0 || n >= o) return { grid: e, meta: t };
  const l = ko(e, t, n), a = l.grid.rows.map((h) => {
    const c = [...h];
    for (; c.length < o; ) c.push("");
    return c.splice(n, 1), c;
  }), u = [...l.grid.aligns];
  for (; u.length < o; ) u.push(null);
  u.splice(n, 1);
  const d = { ...l.meta, merges: yo(l.meta.merges, n), cells: xo(l.meta.cells, n) };
  if ((_a = l.meta.colWidths) == null ? void 0 : _a.length) {
    const h = En(l.meta.colWidths, n);
    h ? d.colWidths = h : delete d.colWidths;
  }
  return { grid: { rows: a, aligns: u }, meta: d };
}
function Mo(e, t, n) {
  const o = [...new Set(n.filter((a) => Number.isInteger(a) && a >= 0))].sort((a, u) => u - a);
  let l = { grid: e, meta: t };
  for (const a of o) {
    if (l.grid.rows.length <= 1) break;
    l = jo(l.grid, l.meta, a);
  }
  return l;
}
function Ro(e, t, n) {
  const o = [...new Set(n.filter((a) => Number.isInteger(a) && a >= 0))].sort((a, u) => u - a);
  let l = { grid: e, meta: t };
  for (const a of o) {
    if (Math.max(1, ...l.grid.rows.map((d) => d.length), l.grid.aligns.length, 1) <= 1) break;
    l = To(l.grid, l.meta, a);
  }
  return l;
}
const No = "data-md-footnote-title", Po = 250, Lo = 120, Do = { duration: 0.18, ease: [0.22, 1, 0.36, 1] }, Ao = "z-100050 max-w-[min(92vw,320px)] origin-(--radix-tooltip-content-transform-origin) rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function ze(e, t) {
  if (!(e instanceof Element)) return null;
  const n = e.closest(".footnote-ref-link");
  return !(n instanceof HTMLElement) || !t.contains(n) ? null : n;
}
function Xt(e) {
  var _a;
  return ((_a = e.getAttribute(No)) == null ? void 0 : _a.trim()) || "";
}
function qt(e) {
  const t = e.getBoundingClientRect(), n = Number.parseFloat(window.getComputedStyle(e).fontSize) || 16, l = !!e.querySelector("sup.footnote-ref") ? n * 0.9 : 0;
  return { top: t.top - l, left: t.left, width: Math.max(t.width, 1), height: Math.max(t.height + l, 1) };
}
function Xs({ containerRef: e, rootEl: t = null }) {
  const [n, o] = f.useState(null), [l, a] = f.useState(null), u = f.useRef(null), d = f.useRef(0), h = f.useRef(null), c = f.useCallback(() => {
    u.current != null && (clearTimeout(u.current), u.current = null);
  }, []), x = f.useCallback(() => {
    c(), h.current && (d.current = Date.now()), h.current = null, o(null), a(null);
  }, [c]), E = f.useCallback((b, v) => {
    const C = { el: b, text: v }, N = () => {
      h.current = C, o(C), a(qt(b));
    };
    if (c(), h.current) {
      N();
      return;
    }
    const $ = Date.now() - d.current < Lo ? 0 : Po;
    if ($ === 0) {
      N();
      return;
    }
    u.current = setTimeout(() => {
      u.current = null, N();
    }, $);
  }, [c]);
  f.useEffect(() => {
    const b = t ?? e.current;
    if (!b) return;
    const v = (L) => {
      var _a;
      const M = ze(L.target, b);
      if (!M) return;
      const j = Xt(M);
      if (!j) {
        x();
        return;
      }
      ((_a = h.current) == null ? void 0 : _a.el) === M && h.current.text === j || E(M, j);
    }, C = (L) => {
      var _a;
      const M = ze(L.target, b);
      if (!M) return;
      const j = L.relatedTarget;
      j instanceof Node && M.contains(j) || (((_a = h.current) == null ? void 0 : _a.el) === M || u.current != null) && x();
    }, N = (L) => {
      const M = ze(L.target, b);
      if (!M) return;
      const j = Xt(M);
      j && E(M, j);
    }, R = (L) => {
      var _a;
      const M = ze(L.target, b);
      if (!M) return;
      const j = L.relatedTarget;
      j instanceof Node && M.contains(j) || ((_a = h.current) == null ? void 0 : _a.el) === M && x();
    }, $ = () => {
      x();
    };
    return b.addEventListener("pointerover", v), b.addEventListener("pointerout", C), b.addEventListener("focusin", N), b.addEventListener("focusout", R), b.addEventListener("pointerdown", $), () => {
      c(), b.removeEventListener("pointerover", v), b.removeEventListener("pointerout", C), b.removeEventListener("focusin", N), b.removeEventListener("focusout", R), b.removeEventListener("pointerdown", $);
    };
  }, [x, c, e, t, E]), f.useLayoutEffect(() => {
    var _a;
    if (!(n == null ? void 0 : n.el)) {
      a(null);
      return;
    }
    const b = () => {
      if (!n.el.isConnected) {
        x();
        return;
      }
      a(qt(n.el));
    };
    b();
    const C = (_a = t ?? e.current) == null ? void 0 : _a.querySelector(".md-editor-preview");
    return window.addEventListener("resize", b), window.addEventListener("scroll", b, true), C == null ? void 0 : C.addEventListener("scroll", b, { passive: true }), () => {
      window.removeEventListener("resize", b), window.removeEventListener("scroll", b, true), C == null ? void 0 : C.removeEventListener("scroll", b);
    };
  }, [n, x, e, t]);
  const S = !!(n && l && n.text);
  return s.jsx(mn, { delayDuration: 0, skipDelayDuration: 0, disableHoverableContent: true, children: s.jsxs(xn, { open: S, onOpenChange: (b) => {
    b || x();
  }, children: [s.jsx(bn, { asChild: true, children: s.jsx("span", { "aria-hidden": true, className: "pointer-events-none fixed z-100049", style: l ? { top: l.top, left: l.left, width: Math.max(l.width, 1), height: Math.max(l.height, 1) } : { top: 0, left: 0, width: 1, height: 1, opacity: 0 } }) }), s.jsx(ar, { children: S ? s.jsx(wn, { forceMount: true, children: s.jsx(vn, { asChild: true, side: "top", sideOffset: 6, children: s.jsxs(ir.div, { className: Ao, initial: { opacity: 0, y: 6, scale: 0.94 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 3, scale: 0.97 }, transition: Do, children: [n == null ? void 0 : n.text, s.jsx(yn, { className: "fill-white dark:fill-odp-surface" })] }) }) }) : null })] }) });
}
const Yt = 80, _o = 350;
function Vt(e) {
  return JSON.stringify(e);
}
function Gt(e) {
  try {
    const t = JSON.parse(e);
    return !t || typeof t != "object" || !t.meta || typeof t.meta != "object" || !t.grid || !Array.isArray(t.grid.rows) ? null : t;
  } catch {
    return null;
  }
}
function Io(e) {
  return !Array.isArray(e) || e.length === 0 ? [] : e.length <= Yt ? e : e.slice(e.length - Yt);
}
function Oo(e, t, n) {
  const o = Array.isArray(e) && e.length > 0 ? e : [];
  if (o.length === 0) return { stack: [n], index: 0, changed: true };
  const l = Math.max(0, Math.min(t, o.length - 1));
  if (o[l] === n) return { stack: o, index: l, changed: false };
  const a = o.slice(0, l + 1);
  a.push(n);
  const u = Io(a);
  return { stack: u, index: u.length - 1, changed: true };
}
function $o({ enabled: e, historyKey: t, meta: n, grid: o, applySnapshot: l }) {
  const a = f.useRef([]), u = f.useRef(0), d = f.useRef(false), h = f.useRef(false), c = f.useRef(null), x = f.useRef(null), E = f.useRef(l);
  E.current = l;
  const [S, b] = f.useState(0), v = f.useCallback(() => b((y) => y + 1), []), C = f.useCallback(() => {
    c.current && (clearTimeout(c.current), c.current = null);
  }, []), N = f.useCallback(() => Vt({ meta: n, grid: o }), [o, n]), R = f.useCallback(() => {
    C();
    const y = x.current;
    if (y == null) return;
    x.current = null;
    const O = Oo(a.current, u.current, y);
    O.changed && (a.current = O.stack, u.current = O.index, v());
  }, [v, C]);
  f.useEffect(() => {
    if (!e) {
      C(), x.current = null, a.current = [], u.current = 0, h.current = false, v();
      return;
    }
    if (t <= 0) return;
    C(), x.current = null;
    const y = Vt({ meta: n, grid: o });
    a.current = [y], u.current = 0, h.current = true, v();
  }, [e, t, v, C]), f.useEffect(() => {
    if (!e || !h.current || d.current) return;
    const y = N();
    if (a.current[u.current] !== y) return x.current = y, C(), c.current = setTimeout(() => {
      c.current = null, R();
    }, _o), () => {
      C();
    };
  }, [C, N, e, R, o, n]);
  const $ = f.useCallback(() => {
    !e || !h.current || d.current || (x.current = N(), R());
  }, [N, e, R]), L = f.useCallback(() => {
    if (R(), u.current <= 0) return false;
    u.current -= 1;
    const y = a.current[u.current], O = y ? Gt(y) : null;
    return O ? (d.current = true, E.current(O), v(), requestAnimationFrame(() => {
      d.current = false;
    }), true) : false;
  }, [v, R]), M = f.useCallback(() => {
    if (R(), u.current >= a.current.length - 1) return false;
    u.current += 1;
    const y = a.current[u.current], O = y ? Gt(y) : null;
    return O ? (d.current = true, E.current(O), v(), requestAnimationFrame(() => {
      d.current = false;
    }), true) : false;
  }, [v, R]), j = e && h.current && u.current > 0, I = e && h.current && u.current < a.current.length - 1;
  return { undo: L, redo: M, canUndo: j, canRedo: I, recordNow: $, flushPendingRecord: R };
}
const zo = ["thead", "tbody", "tfoot"], rt = 10, Zt = 36, Jt = 44, Ce = 4, He = 14, Ho = "h-3.5 w-3.5 shrink-0", _ = "h-3 w-3 shrink-0", ot = "__none__", Fo = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), Bo = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Qt = 288, Ln = 200, Wo = 480, Ko = 380, Uo = 560, en = 16, Re = 6, Xo = [{ value: "full", label: "\uD398\uC774\uC9C0 \uC804\uCCB4 (full)" }, { value: "fit", label: "\uB0B4\uC6A9\uB9CC\uD07C (fit)" }], qo = [{ value: "left", label: "\uC67C\uCABD" }, { value: "right", label: "\uC624\uB978\uCABD" }], Yo = "pointer-events-none z-100050 max-w-[240px] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", Vo = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", tn = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", Dn = typeof navigator < "u" && (/Mac|iPhone|iPad|iPod/i.test(navigator.platform) || /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent ?? "")), ge = Dn ? "\u2318" : "Ctrl", Go = `${ge}+E`, Zo = `${ge}+Shift+E`, Jo = `${ge}+Shift+>`, Qo = `${ge}+Shift+<`, st = `${ge}+Z`, at = Dn ? `${ge}+Shift+Z` : `${ge}+Y`, es = 14;
function ts(e, t, n = es) {
  const o = (e || "").trim(), l = /^(\d+(?:\.\d+)?)(px|%|em|rem|pt)?$/i.exec(o), a = ((l == null ? void 0 : l[2]) || "px").toLowerCase(), u = l ? Number(l[1]) : n, d = a === "em" || a === "rem" ? 0.1 : 1, h = a === "em" || a === "rem" ? 0.5 : a === "%" ? 50 : 8;
  let c = (Number.isFinite(u) ? u : n) + t * d;
  return c = Math.max(h, c), a === "em" || a === "rem" ? c = Math.round(c * 10) / 10 : c = Math.round(c), `${c}${a}`;
}
function pe({ icon: e, children: t }) {
  return s.jsxs("span", { className: "inline-flex items-center gap-1", children: [s.jsx("span", { className: "inline-flex shrink-0 text-gray-400 dark:text-odp-muted", "aria-hidden": true, children: e }), t] });
}
function we(e) {
  return Math.min(Wo, Math.max(Ln, Math.round(e)));
}
function nn({ onDelta: e, ariaLabel: t }) {
  const n = f.useRef(0);
  return s.jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": t, className: "group relative hidden w-1.5 shrink-0 cursor-col-resize touch-none select-none landscape:flex", onPointerDown: (o) => {
    o.preventDefault(), o.stopPropagation(), o.currentTarget.setPointerCapture(o.pointerId), n.current = o.clientX;
  }, onPointerMove: (o) => {
    if (!o.currentTarget.hasPointerCapture(o.pointerId)) return;
    const l = o.clientX - n.current;
    n.current = o.clientX, l !== 0 && e(l);
  }, onPointerUp: (o) => {
    o.currentTarget.hasPointerCapture(o.pointerId) && o.currentTarget.releasePointerCapture(o.pointerId);
  }, onPointerCancel: (o) => {
    o.currentTarget.hasPointerCapture(o.pointerId) && o.currentTarget.releasePointerCapture(o.pointerId);
  }, children: s.jsx("span", { className: "absolute inset-y-2 left-1/2 w-px -translate-x-1/2 rounded-full bg-gray-300 transition-colors group-hover:bg-blue-400 group-active:bg-blue-500 dark:bg-odp-borderStrong dark:group-hover:bg-blue-400", "aria-hidden": true }) });
}
function ns(e, t) {
  return e === 0 ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC704\uC5D0 \uD589 \uCD94\uAC00" : e === t ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC544\uB798\uC5D0 \uD589 \uCD94\uAC00" : `\uB354\uBE14\uD074\uB9AD: ${e}\uD589 \uC704\uC5D0 \uD589 \uCD94\uAC00`;
}
function rs(e, t) {
  return e === 0 ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC55E\uC5D0 \uC5F4 \uCD94\uAC00" : e === t ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uB4A4\uC5D0 \uC5F4 \uCD94\uAC00" : `\uB354\uBE14\uD074\uB9AD: ${e}\uC5F4 \uC55E\uC5D0 \uC5F4 \uCD94\uAC00`;
}
function rn(e) {
  return e === "row" ? "\uB4DC\uB798\uADF8: \uD589 \uB192\uC774 \uC870\uC808" : "\uB4DC\uB798\uADF8: \uC5F4 \uB108\uBE44 \uC870\uC808";
}
function on(e, t, n, o, l, a) {
  const u = o.left - l.left, d = t - l.top, h = o.width, c = Math.min(Math.max(n - l.left, u), u + h);
  return { kind: "row", index: e, x: c, y: d, edge: { left: u, top: d - Ce / 2, width: h, height: Ce }, ghost: { left: u, top: d - Zt / 2, width: h, height: Zt }, label: ns(e, a) };
}
function sn(e, t, n, o, l, a) {
  const u = o.top - l.top, d = t - l.left, h = o.height, c = Math.min(Math.max(n - l.top, u), u + h);
  return { kind: "col", index: e, x: d, y: c, edge: { left: d - Ce / 2, top: u, width: Ce, height: h }, ghost: { left: d - Jt / 2, top: u, width: Jt, height: h }, label: rs(e, a) };
}
function os({ tip: e, onDoubleClick: t, style: n }) {
  return s.jsxs(xn, { open: true, children: [s.jsx(bn, { asChild: true, children: s.jsx("button", { type: "button", "aria-label": e, style: n, onClick: (o) => {
    o.preventDefault(), o.stopPropagation();
  }, onDoubleClick: (o) => {
    o.preventDefault(), o.stopPropagation(), t();
  }, onMouseDown: (o) => {
    o.preventDefault(), o.stopPropagation();
  }, onPointerDown: (o) => {
    o.preventDefault(), o.stopPropagation();
  }, "data-haim-edge-add": "", className: "haim-table-insert-btn pointer-events-auto absolute z-30 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-400/80 bg-white text-blue-600 shadow-sm hover:bg-blue-50 dark:border-blue-400/70 dark:bg-odp-surface dark:text-blue-300 dark:hover:bg-blue-950/60", children: s.jsx(to, { className: "h-3 w-3", "aria-hidden": true }) }) }), s.jsx(wn, { children: s.jsxs(vn, { className: Yo, side: "top", sideOffset: 8, children: [e, s.jsx(yn, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function ss({ insert: e, tip: t, allowResize: n, onDoubleClickInsert: o, onResizePointerDown: l }) {
  const a = e.kind === "row", u = a ? { left: e.edge.left, top: e.edge.top + Ce / 2 - He / 2, width: e.edge.width, height: He } : { left: e.edge.left + Ce / 2 - He / 2, top: e.edge.top, width: He, height: e.edge.height };
  return s.jsx("div", { role: "presentation", title: t, "data-haim-edge-hit": "", className: `pointer-events-auto absolute z-[25] ${n ? a ? "cursor-row-resize" : "cursor-col-resize" : "cursor-pointer"}`, style: { left: u.left, top: u.top, width: u.width, height: u.height }, onMouseDown: (d) => {
    d.preventDefault(), d.stopPropagation();
  }, onPointerDown: (d) => {
    if (d.preventDefault(), d.stopPropagation(), d.button !== 0 || d.detail >= 2 || !n) return;
    const h = d.clientX, c = d.clientY, x = d;
    let E = false;
    const S = () => {
      document.removeEventListener("pointermove", b, true), document.removeEventListener("pointerup", v, true), document.removeEventListener("pointercancel", v, true);
    }, b = (C) => {
      E || Math.abs(C.clientX - h) < 3 && Math.abs(C.clientY - c) < 3 || (E = true, S(), l(x));
    }, v = () => {
      S();
    };
    document.addEventListener("pointermove", b, true), document.addEventListener("pointerup", v, true), document.addEventListener("pointercancel", v, true);
  }, onDoubleClick: (d) => {
    d.preventDefault(), d.stopPropagation(), o();
  } });
}
function as({ insert: e }) {
  const t = `${e.kind}-${e.index}`;
  return s.jsxs("div", { "data-haim-insert-preview": "", className: "contents", children: [s.jsx("div", { "aria-hidden": true, className: `pointer-events-none absolute z-10 rounded-sm border border-transparent bg-blue-400/[0.04] dark:bg-blue-400/[0.06] ${e.kind === "row" ? "haim-table-insert-ghost-row" : "haim-table-insert-ghost-col"}`, style: { left: e.ghost.left, top: e.ghost.top, width: e.ghost.width, height: e.ghost.height } }, `ghost-${t}`), s.jsx("div", { "aria-hidden": true, className: "haim-table-insert-glow pointer-events-none absolute z-[11] rounded-full", style: { left: e.edge.left, top: e.edge.top, width: e.edge.width, height: e.edge.height } }, `glow-${t}`)] });
}
function is({ kind: e, indices: t, table: n, wrap: o, colCount: l }) {
  const [a, u] = f.useState([]);
  return f.useEffect(() => {
    if (!n || !o || !t.length) {
      u([]);
      return;
    }
    const d = () => {
      const h = o.getBoundingClientRect(), c = n.getBoundingClientRect(), x = [];
      if (e === "row") for (const E of t) {
        const S = n.rows[E];
        if (!S) continue;
        const b = S.getBoundingClientRect();
        x.push({ left: c.left - h.left, top: b.top - h.top, width: c.width, height: Math.max(1, b.height) });
      }
      else {
        const E = An(n, l);
        for (const S of t) {
          const b = E[S], v = E[S + 1];
          b == null || v == null || x.push({ left: b - h.left, top: c.top - h.top, width: Math.max(1, v - b), height: c.height });
        }
      }
      u(x);
    };
    return d(), window.addEventListener("resize", d), () => window.removeEventListener("resize", d);
  }, [l, t, e, n, o]), a.length ? s.jsx("div", { "data-haim-delete-preview": "", className: "pointer-events-none absolute inset-0 z-20", "aria-hidden": true, children: a.map((d, h) => s.jsx("div", { className: "absolute rounded-sm bg-red-500/25 ring-1 ring-inset ring-red-500/50 dark:bg-red-500/30 dark:ring-red-400/40", style: { left: d.left, top: d.top, width: d.width, height: d.height } }, `${e}-${t[h] ?? h}`)) }) : null;
}
function ls(e) {
  const t = [...e.rows];
  if (!t.length) return [];
  const n = [];
  for (let o = 0; o < t.length; o += 1) n.push(t[o].getBoundingClientRect().top);
  return n.push(t[t.length - 1].getBoundingClientRect().bottom), n;
}
function An(e, t) {
  const n = e.getBoundingClientRect(), o = [];
  for (let u = 0; u < t; u += 1) {
    const d = e.querySelectorAll(`[data-edit-c="${u}"]`);
    let h = null;
    d.forEach((c) => {
      const x = c.getBoundingClientRect();
      (h == null || x.left < h) && (h = x.left);
    }), h != null ? o.push(h) : o.push(n.left + n.width * u / Math.max(t, 1));
  }
  let l = n.right;
  return e.querySelectorAll(`[data-edit-c="${t - 1}"]`).forEach((u) => {
    const d = u.getBoundingClientRect();
    d.right > l && (l = d.right);
  }), o.push(l), o;
}
function cs(e, t, n) {
  var _a, _b;
  if (!n.length || typeof document > "u") return null;
  const l = (_b = (_a = document.elementFromPoint(e, t)) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, "td[data-edit-r][data-edit-c]");
  if (!l) return null;
  const a = Number(l.getAttribute("data-edit-r")), u = Number(l.getAttribute("data-edit-c"));
  return !Number.isInteger(a) || !Number.isInteger(u) ? null : Lr(n, a, u);
}
function an(e, t, n) {
  return e === "col" ? n.colspan > 1 && n.c < t && t < n.c + n.colspan : n.rowspan > 1 && n.r < t && t < n.r + n.rowspan;
}
function Ne(e, t, n, o, l, a, u) {
  const d = e.getBoundingClientRect(), h = t.getBoundingClientRect(), c = rt + 2;
  if (n < d.left - c || n > d.right + c || o < d.top - c || o > d.bottom + c) return null;
  const x = ls(e), E = An(e, a), S = cs(n, o, u);
  let b = null;
  for (let C = 0; C < x.length; C += 1) {
    if (S && an("row", C, S)) continue;
    const N = x[C], R = Math.abs(o - N);
    R <= rt && n >= d.left - c && n <= d.right + c && (!b || R < b.dist) && (b = { index: C, dist: R, y: N });
  }
  let v = null;
  for (let C = 0; C < E.length; C += 1) {
    if (S && an("col", C, S)) continue;
    const N = E[C], R = Math.abs(n - N);
    R <= rt && o >= d.top - c && o <= d.bottom + c && (!v || R < v.dist) && (v = { index: C, dist: R, x: N });
  }
  return b && v ? b.dist <= v.dist ? on(b.index, b.y, n, d, h, l) : sn(v.index, v.x, o, d, h, a) : b ? on(b.index, b.y, n, d, h, l) : v ? sn(v.index, v.x, o, d, h, a) : null;
}
function qs({ isOpen: e, initialMeta: t, initialGrid: n, onClose: o, onSave: l }) {
  var _a, _b, _c, _d, _e2, _f;
  const [a, u] = f.useState(Pe()), [d, h] = f.useState(n), [c, x] = f.useState(null), [E, S] = f.useState(false), [b, v] = f.useState("thead"), [C, N] = f.useState([]), [R, $] = f.useState(false), [L, M] = f.useState(null), [j, I] = f.useState(null), [y, O] = f.useState(false), [re, F] = f.useState(0), [D, B] = f.useState(null), [G, A] = f.useState(null), H = f.useRef(null), [ne, U] = f.useState(null), se = ne !== null, P = jn(), [z, W] = f.useState(Qt), [ae, pt] = f.useState(Qt), [me, xe] = f.useState(false), [ce, Ke] = f.useState(false), [Le, On] = f.useState(() => typeof window < "u" ? window.innerWidth : 1280), [De, $n] = f.useState(() => typeof window < "u" ? window.matchMedia("(orientation: landscape)").matches : true), Ae = f.useRef(null), ue = f.useRef(null), oe = f.useRef(null), zn = f.useRef(null), Ue = f.useRef(false), ie = f.useRef(null), Z = f.useRef(null), _e = f.useRef(false), Se = f.useRef(false), Ie = f.useRef({ x: 0, y: 0 });
  zn.current = j, Ue.current = E, Z.current = c, _e.current = me, Se.current = se, H.current = G;
  const gt = f.useRef(t), mt = f.useRef(n);
  gt.current = t, mt.current = n, f.useEffect(() => {
    if (!e) return;
    const r = gt.current, i = mt.current;
    u(r ? { ...r } : Pe()), h({ rows: i.rows.map((p) => [...p]), aligns: [...i.aligns] }), x(null), S(false), ie.current = null, I(null), xe(false), Ke(false), U(null), A(null), F((p) => p + 1), wr().then((p) => N(p.templates)), vr().then((p) => yr(p));
  }, [e]);
  const Hn = f.useCallback((r) => {
    u(r.meta), h({ rows: r.grid.rows.map((i) => [...i]), aligns: [...r.grid.aligns ?? []] }), x(null), S(false), ie.current = null, I(null);
  }, []), { undo: Xe, redo: qe, canUndo: Fn, canRedo: Bn, recordNow: xt } = $o({ enabled: e, historyKey: re, meta: a, grid: d, applySnapshot: Hn }), bt = f.useRef(false);
  f.useEffect(() => {
    bt.current && !y && xt(), bt.current = y;
  }, [y, xt]), f.useEffect(() => {
    if (!e) return;
    const r = (i) => {
      if (!(i.metaKey || i.ctrlKey) || i.altKey) return;
      const m = i.key.toLowerCase(), g = m === "z" && !i.shiftKey, k = m === "y" || m === "z" && i.shiftKey;
      !g && !k || (i.preventDefault(), i.stopPropagation(), i.stopImmediatePropagation(), k ? qe() : Xe());
    };
    return window.addEventListener("keydown", r, true), () => window.removeEventListener("keydown", r, true);
  }, [e, qe, Xe]), f.useEffect(() => {
    if (!e || typeof window > "u") return;
    const r = window.matchMedia("(orientation: landscape)"), i = () => {
      On(window.innerWidth), $n(r.matches);
    };
    return i(), window.addEventListener("resize", i), r.addEventListener("change", i), () => {
      window.removeEventListener("resize", i), r.removeEventListener("change", i);
    };
  }, [e]);
  const Ee = f.useMemo(() => Cr(a.merges), [a.merges]), X = d.rows.length, K = Math.max(1, ...d.rows.map((r) => r.length), d.aligns.length), J = f.useMemo(() => {
    if (!c) return [];
    const r = [], i = Math.min(c.r0, c.r1), p = Math.min(c.c0, c.c1), m = Math.max(c.r0, c.r1), g = Math.max(c.c0, c.c1);
    for (let k = i; k <= m; k += 1) for (let T = p; T <= g; T += 1) Ee.has(`${k},${T}`) || r.push({ r: k, c: T });
    return r;
  }, [c, Ee]), q = J[0] ?? null, wt = !!q, vt = f.useRef(z), yt = f.useRef(ae);
  vt.current = z, yt.current = ae;
  const Ye = f.useMemo(() => {
    const r = Le * 0.95;
    return Math.max(Ln, r - en - Re - Ko);
  }, [Le]), Wn = f.useCallback((r) => {
    const i = vt.current, p = yt.current, m = i + p;
    let g = we(i + r), k = we(m - g);
    g = we(m - k), k = we(m - g), W(g), pt(k);
  }, []), Kn = f.useCallback((r) => {
    pt((i) => {
      const p = we(i + r);
      if (z + Re + p <= Ye) return p;
      const g = Ye - z - Re;
      return we(g);
    });
  }, [Ye, z]), Un = f.useMemo(() => {
    const r = Le * 0.95;
    if (!De) return { width: r, maxWidth: "95dvw", height: "95dvh", maxHeight: "95dvh" };
    const i = z + Re + ae;
    return { width: Math.min(r, en + i + Re + Uo), maxWidth: "95dvw", height: "95dvh", maxHeight: "95dvh" };
  }, [ae, De, z, Le]), Xn = f.useMemo(() => q ? a.cells[te(q.r, q.c)] ?? {} : {}, [a.cells, q]), qn = f.useCallback((r) => {
    J.length && u((i) => {
      const p = { ...i.cells };
      for (const { r: m, c: g } of J) {
        const k = te(m, g);
        zt(r) ? delete p[k] : p[k] = r;
      }
      return { ...i, cells: p };
    });
  }, [J]), de = f.useCallback((r) => {
    h(r.grid), u(r.meta), x(null), S(false), ie.current = null, I(null);
  }, []), Q = f.useRef(d), je = f.useRef(a);
  Q.current = d, je.current = a;
  const Ct = f.useCallback((r) => {
    de(So(Q.current, je.current, r));
  }, [de]), kt = f.useCallback((r) => {
    de(Eo(Q.current, je.current, r));
  }, [de]), St = f.useCallback((r) => {
    const i = Z.current;
    let p, m;
    if (i) p = Math.min(i.r0, i.r1), m = Math.max(i.r0, i.r1), r != null && (r < p || r > m) && (p = r, m = r);
    else if (r != null) p = r, m = r;
    else {
      const T = H.current;
      (T == null ? void 0 : T.kind) === "row" && T.indices.length && (A(null), B({ kind: "row", indices: [...T.indices] }));
      return;
    }
    const g = [];
    for (let T = p; T <= m; T += 1) g.push(T);
    const k = Q.current.rows.length;
    k <= 1 || g.length === 0 || g.length >= k || (A(null), B({ kind: "row", indices: g }));
  }, []), Et = f.useCallback((r) => {
    const i = Z.current;
    let p, m;
    if (i) p = Math.min(i.c0, i.c1), m = Math.max(i.c0, i.c1), r != null && (r < p || r > m) && (p = r, m = r);
    else if (r != null) p = r, m = r;
    else {
      const T = H.current;
      (T == null ? void 0 : T.kind) === "col" && T.indices.length && (A(null), B({ kind: "col", indices: [...T.indices] }));
      return;
    }
    const g = [];
    for (let T = p; T <= m; T += 1) g.push(T);
    const k = Math.max(1, ...Q.current.rows.map((T) => T.length), Q.current.aligns.length, 1);
    k <= 1 || g.length === 0 || g.length >= k || (A(null), B({ kind: "col", indices: g }));
  }, []), jt = f.useCallback((r) => {
    const i = Z.current;
    let p, m;
    i ? (p = Math.min(i.r0, i.r1), m = Math.max(i.r0, i.r1), (r < p || r > m) && (p = r, m = r)) : (p = r, m = r);
    const g = [];
    for (let T = p; T <= m; T += 1) g.push(T);
    const k = Q.current.rows.length;
    if (k <= 1 || g.length === 0 || g.length >= k) {
      A(null);
      return;
    }
    A({ kind: "row", indices: g });
  }, []), Tt = f.useCallback((r) => {
    const i = Z.current;
    let p, m;
    i ? (p = Math.min(i.c0, i.c1), m = Math.max(i.c0, i.c1), (r < p || r > m) && (p = r, m = r)) : (p = r, m = r);
    const g = [];
    for (let T = p; T <= m; T += 1) g.push(T);
    const k = Math.max(1, ...Q.current.rows.map((T) => T.length), Q.current.aligns.length, 1);
    if (k <= 1 || g.length === 0 || g.length >= k) {
      A(null);
      return;
    }
    A({ kind: "col", indices: g });
  }, []), be = f.useCallback(() => {
    A(null);
  }, []), Yn = f.useCallback(() => {
    D && (D.kind === "row" ? de(Mo(Q.current, je.current, D.indices)) : de(Ro(Q.current, je.current, D.indices)), B(null), A(null));
  }, [de, D]), Vn = !!(c && !(c.r0 === c.r1 && c.c0 === c.c1)), Ve = f.useCallback(() => {
    !c || c.r0 === c.r1 && c.c0 === c.c1 || u((r) => ({ ...r, merges: kr(r.merges, c.r0, c.c0, c.r1, c.c1) }));
  }, [c]), Ge = f.useCallback(() => {
    c && u((r) => ({ ...r, merges: Sr(r.merges, c.r0, c.c0, c.r1, c.c1) }));
  }, [c]), Mt = f.useCallback((r) => {
    J.length && u((i) => {
      var _a2;
      const p = { ...i.cells }, m = (_a2 = i.style) == null ? void 0 : _a2.fontSize;
      for (const { r: g, c: k } of J) {
        const T = te(g, k), Y = p[T] ?? {};
        p[T] = { ...Y, fontSize: ts(Y.fontSize ?? m, r) };
      }
      return { ...i, cells: p };
    });
  }, [J]);
  f.useEffect(() => {
    if (!e) return;
    const r = (i) => {
      if (!(!(i.metaKey || i.ctrlKey) || i.altKey)) {
        if (i.shiftKey) {
          const p = i.code === "Period" || i.key === ">" || i.key === ".", m = i.code === "Comma" || i.key === "<" || i.key === ",";
          if (p || m) {
            if (!J.length) return;
            i.preventDefault(), i.stopPropagation(), Mt(p ? 1 : -1);
            return;
          }
        }
        i.code !== "KeyE" && i.key.toLowerCase() !== "e" || (i.preventDefault(), i.stopPropagation(), i.shiftKey ? Ge() : Ve());
      }
    };
    return window.addEventListener("keydown", r, true), () => window.removeEventListener("keydown", r, true);
  }, [e, Ve, Mt, J.length, Ge]);
  const Gn = f.useCallback((r) => {
    var _a2, _b2;
    if (Se.current) {
      I(null);
      return;
    }
    if (E || y) {
      E && I(null);
      return;
    }
    if ((_b2 = (_a2 = r.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, "[data-haim-edge-add], [data-haim-edge-hit]")) return;
    const i = oe.current, p = ue.current;
    if (!i || !p) return;
    const m = Ne(i, p, r.clientX, r.clientY, X, K, a.merges);
    I((g) => m ? g && g.kind === m.kind && g.index === m.index ? g.x === m.x && g.y === m.y ? g : { ...g, x: m.x, y: m.y } : m : null);
  }, [K, y, a.merges, E, X]), Zn = f.useCallback((r, i) => {
    var _a2, _b2;
    if (i.index === 0 || Se.current) return;
    r.preventDefault(), r.stopPropagation();
    const p = oe.current;
    if (!p) return;
    const m = i.index - 1;
    let g = 0, k = 0;
    if (i.kind === "col") {
      const w = (_a2 = p.querySelector(`[data-edit-c="${m}"]`)) == null ? void 0 : _a2.getBoundingClientRect();
      if (!w) return;
      g = w.left;
    } else {
      const w = (_b2 = p.rows[m]) == null ? void 0 : _b2.getBoundingClientRect();
      if (!w) return;
      k = w.top;
    }
    O(true), S(false), I(null);
    const T = (fe) => {
      let w = 24;
      i.kind === "col" ? w = fe.clientX - g : w = fe.clientY - k, w = Math.max(24, Math.round(w)), u((V) => i.kind === "col" ? { ...V, colWidths: Ht(V.colWidths, m, w) } : { ...V, rowHeights: Ht(V.rowHeights, m, w) });
    }, Y = () => {
      document.removeEventListener("pointermove", T, true), document.removeEventListener("pointerup", Y, true), document.removeEventListener("pointercancel", Y, true), O(false);
    };
    document.addEventListener("pointermove", T, true), document.addEventListener("pointerup", Y, true), document.addEventListener("pointercancel", Y, true);
  }, []), Rt = f.useCallback((r, i, p) => {
    h((m) => {
      const g = Math.max(1, ...m.rows.map((Y) => Y.length), m.aligns.length), k = m.rows.map((Y) => [...Y]);
      for (; k.length <= r; ) k.push(Array(g).fill(""));
      const T = [...k[r] ?? Array(g).fill("")];
      for (; T.length < g; ) T.push("");
      return T[i] = p, k[r] = T, { ...m, rows: k };
    });
  }, []), Nt = f.useCallback((r, i) => {
    const p = oe.current;
    if (!p) return;
    const m = p.querySelector(`td[data-edit-r="${r}"][data-edit-c="${i}"] input`);
    m && (x({ r0: r, c0: i, r1: r, c1: i }), ie.current = { r, c: i }, S(false), I(null), requestAnimationFrame(() => {
      m.focus(), m.select();
    }));
  }, []), Te = f.useCallback((r, i) => {
    x({ r0: r, c0: i, r1: r, c1: i }), ie.current = { r, c: i }, S(false), I(null);
  }, []), Pt = f.useCallback(() => {
    var _a2;
    x(null), S(false), ie.current = null;
    const r = document.activeElement;
    ((_a2 = r == null ? void 0 : r.closest) == null ? void 0 : _a2.call(r, "td[data-edit-r]")) && r.blur();
  }, []), Lt = f.useCallback((r, i) => {
    const p = ie.current;
    if (!p) {
      Te(r, i);
      return;
    }
    x({ r0: p.r, c0: p.c, r1: r, c1: i }), S(false), I(null);
  }, [Te]), Ze = f.useCallback((r, i) => {
    var _a2;
    x({ r0: r, c0: i, r1: r, c1: i }), ie.current = { r, c: i }, S(true), I(null);
    const p = document.activeElement;
    ((_a2 = p == null ? void 0 : p.closest) == null ? void 0 : _a2.call(p, "td[data-edit-r]")) && p.blur();
  }, []), Jn = f.useCallback((r, i) => {
    Ue.current && x((p) => p && { ...p, r1: r, c1: i });
  }, []);
  f.useEffect(() => {
    if (!E) return;
    const r = () => S(false);
    return window.addEventListener("mouseup", r, true), window.addEventListener("pointerup", r, true), () => {
      window.removeEventListener("mouseup", r, true), window.removeEventListener("pointerup", r, true);
    };
  }, [E]), f.useEffect(() => {
    if (!e) return;
    const r = (g) => {
      var _a2, _b2, _c2;
      const k = g;
      if (!k) return false;
      const T = ((_b2 = (_a2 = k.tagName) == null ? void 0 : _a2.toLowerCase) == null ? void 0 : _b2.call(_a2)) ?? "";
      return T === "input" || T === "textarea" || T === "select" || k.isContentEditable ? true : !!((_c2 = k.closest) == null ? void 0 : _c2.call(k, 'input, textarea, select, [contenteditable="true"]'));
    }, i = (g) => {
      g.code !== "Space" && g.key !== " " || g.repeat || r(g.target) || Z.current || (g.preventDefault(), xe(true));
    }, p = (g) => {
      g.code !== "Space" && g.key !== " " || xe(false);
    }, m = () => xe(false);
    return window.addEventListener("keydown", i, true), window.addEventListener("keyup", p, true), window.addEventListener("blur", m), () => {
      window.removeEventListener("keydown", i, true), window.removeEventListener("keyup", p, true), window.removeEventListener("blur", m), xe(false);
    };
  }, [e]), f.useEffect(() => {
    c && xe(false);
  }, [c]);
  const Dt = f.useCallback(() => {
    Ke(false);
  }, []), Qn = f.useCallback((r) => {
    const i = Ae.current;
    if (!i) return;
    const p = r.button === 1, m = r.button === 0 && me && !Z.current;
    if (p || m) {
      r.preventDefault(), r.stopPropagation(), I(null), Ie.current = { x: r.clientX, y: r.clientY }, Ke(true), i.setPointerCapture(r.pointerId);
      return;
    }
  }, [me]), er = f.useCallback((r) => {
    if (!ce) return;
    const i = Ae.current;
    if (!i) return;
    const p = r.clientX - Ie.current.x, m = r.clientY - Ie.current.y;
    Ie.current = { x: r.clientX, y: r.clientY }, i.scrollLeft -= p, i.scrollTop -= m;
  }, [ce]), At = f.useCallback((r) => {
    if (!ce) return;
    const i = Ae.current;
    (i == null ? void 0 : i.hasPointerCapture(r.pointerId)) && i.releasePointerCapture(r.pointerId), Dt();
  }, [Dt, ce]), tr = f.useCallback((r) => {
    if (r.button !== 0 || me || ce) return;
    const i = r.target;
    i && (i.closest("[data-haim-table-sidebars]") || i.closest("[data-haim-table-canvas] table, [data-haim-edge-hit], [data-haim-edge-add], [data-haim-insert-preview]") || Z.current && Pt());
  }, [Pt, ce, me]), Oe = f.useCallback((r, i, p, m) => {
    let g = r + p, k = i + m;
    for (; g >= 0 && g < X && k >= 0 && k < K; ) {
      if (!Ee.has(`${g},${k}`)) {
        Nt(g, k);
        return;
      }
      g += p, k += m;
    }
  }, [K, Ee, Nt, X]), nr = f.useCallback((r, i, p) => {
    if (r.nativeEvent.isComposing) return;
    if (r.key === "Enter") {
      r.preventDefault(), r.stopPropagation(), r.shiftKey ? Oe(i, p, -1, 0) : Oe(i, p, 1, 0);
      return;
    }
    if (!r.altKey) return;
    let m = 0, g = 0;
    if (r.key === "ArrowUp") m = -1;
    else if (r.key === "ArrowDown") m = 1;
    else if (r.key === "ArrowLeft") g = -1;
    else if (r.key === "ArrowRight") g = 1;
    else return;
    r.preventDefault(), r.stopPropagation(), Oe(i, p, m, g);
  }, [Oe]), rr = f.useMemo(() => {
    var _a2;
    return q ? ((_a2 = d.rows[q.r]) == null ? void 0 : _a2[q.c]) ?? "" : "";
  }, [d.rows, q]), _t = f.useMemo(() => a.templateId ? C.find((r) => r.id === a.templateId) ?? null : null, [a.templateId, C]), or = f.useCallback((r, i) => {
    const p = Er({ row: r, col: i, rowCount: X, colCount: K, meta: a, template: _t }), m = {};
    return p.bg && (m.backgroundColor = p.bg), p.color && (m.color = p.color), p.fontFamily && (m.fontFamily = p.fontFamily), p.fontSize && (m.fontSize = p.fontSize), p.fontWeight && (m.fontWeight = p.fontWeight), m;
  }, [_t, K, a, X]), It = (r, i) => {
    if (!c) return false;
    const p = Math.min(c.r0, c.r1), m = Math.min(c.c0, c.c1), g = Math.max(c.r0, c.r1), k = Math.max(c.c0, c.c1);
    return r >= p && r <= g && i >= m && i <= k;
  }, sr = (r) => r === "thead" ? s.jsx(nt, { className: _, "aria-hidden": true }) : r === "tfoot" ? s.jsx(Wt, { className: _, "aria-hidden": true }) : s.jsx(Kt, { className: _, "aria-hidden": true });
  return s.jsxs(s.Fragment, { children: [s.jsxs(jr, { isOpen: e, onClose: () => {
    if (D !== null) {
      B(null);
      return;
    }
    o();
  }, overlayClassName: "p-[2.5dvh]", contentClassName: "h-[95dvh] max-h-[95dvh] max-w-[95dvw]", contentStyle: Un, resizeHeight: true, children: [s.jsxs(lr, { className: "flex h-full min-h-0 flex-col", onSubmit: (r) => r.preventDefault(), onPointerDownCapture: tr, children: [s.jsxs("header", { className: "flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-3 py-2 dark:border-odp-border", children: [s.jsxs("h2", { className: "inline-flex items-center gap-1.5 text-sm font-bold text-gray-800 dark:text-odp-fgStrong", children: [s.jsx(Be, { className: Ho, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1"] }), s.jsxs("div", { className: "flex items-center gap-2", children: [s.jsxs("button", { type: "button", disabled: !Fn, title: `\uC2E4\uD589 \uCDE8\uC18C (${st})`, "aria-label": `\uC2E4\uD589 \uCDE8\uC18C (${st})`, onClick: () => Xe(), className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [s.jsx(Wr, { className: _, "aria-hidden": true }), "\uC2E4\uD589 \uCDE8\uC18C"] }), s.jsxs("button", { type: "button", disabled: !Bn, title: `\uB2E4\uC2DC \uC2E4\uD589 (${at})`, "aria-label": `\uB2E4\uC2DC \uC2E4\uD589 (${at})`, onClick: () => qe(), className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [s.jsx(Kr, { className: _, "aria-hidden": true }), "\uB2E4\uC2DC \uC2E4\uD589"] }), s.jsxs("button", { type: "button", onClick: o, className: "inline-flex items-center gap-1 rounded px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [s.jsx(Ur, { className: _, "aria-hidden": true }), "\uCDE8\uC18C"] }), s.jsxs("button", { type: "button", onClick: () => l(a, d), className: "inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700", children: [s.jsx(Xr, { className: _, "aria-hidden": true }), "\uC801\uC6A9"] })] })] }), s.jsxs("div", { className: "flex min-h-0 flex-1 flex-col landscape:flex-row", children: [s.jsxs("div", { "data-haim-table-sidebars": "", className: "order-2 flex max-h-[42%] min-h-0 w-full shrink-0 flex-col gap-2 overflow-hidden border-t border-gray-100 bg-gray-50/80 p-2 dark:border-odp-border dark:bg-odp-bgSoft/40 portrait:max-h-[42%] landscape:order-1 landscape:max-h-none landscape:w-auto landscape:flex-row landscape:gap-0 landscape:border-t-0 landscape:border-r-0", children: [s.jsxs("aside", { className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-surface landscape:flex-none landscape:shrink-0", style: De ? { width: z } : void 0, children: [s.jsx("div", { className: "sticky top-0 z-[1] border-b border-gray-100 bg-white px-2.5 py-1.5 dark:border-odp-border dark:bg-odp-surface", children: s.jsxs("h3", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong", children: [s.jsx(Be, { className: _, "aria-hidden": true }), "\uD45C \xB7 \uADF8\uB8F9"] }) }), s.jsxs("div", { className: "space-y-2 p-2.5", children: [s.jsxs("div", { className: "flex flex-wrap gap-2", children: [s.jsxs(le, { name: "template", className: "flex min-w-0 flex-1 flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [s.jsx(he, { asChild: true, children: s.jsx("span", { children: s.jsx(pe, { icon: s.jsx(Bt, { className: _ }), children: "\uD15C\uD50C\uB9BF" }) }) }), s.jsx(Je, { "aria-label": "\uD45C \uD15C\uD50C\uB9BF", value: a.templateId ?? ot, onValueChange: (r) => {
    if (r === ot) {
      u((p) => {
        const m = { ...p };
        return delete m.templateId, m;
      });
      return;
    }
    const i = C.find((p) => p.id === r);
    i && u((p) => Tr(p, i));
  }, options: [{ value: ot, label: "\uD15C\uD50C\uB9BF \uC5C6\uC74C" }, ...C.map((r) => ({ value: r.id, label: r.name }))], className: "w-full min-w-0" })] }), s.jsxs("button", { type: "button", className: "mt-auto inline-flex h-8 items-center gap-1 self-end rounded-md bg-gray-100 px-2 text-[11px] dark:bg-odp-bgSoft", onClick: () => {
    M({ id: `template-${Date.now().toString(36)}`, name: "\uC0C8 \uD15C\uD50C\uB9BF", sections: {}, rules: [] }), $(true);
  }, children: [s.jsx(Bt, { className: _, "aria-hidden": true }), "\uAD00\uB9AC"] })] }), s.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [s.jsxs(le, { name: "noHeader", className: "col-span-2 flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [s.jsx(he, { asChild: true, children: s.jsx("span", { children: s.jsx(pe, { icon: s.jsx(nt, { className: _ }), children: "noHeader" }) }) }), s.jsxs("label", { className: "flex cursor-pointer items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-2 py-1.5 dark:border-odp-borderSoft dark:bg-odp-surface", children: [s.jsx("span", { className: "min-w-0 text-[11px] leading-snug text-gray-600 dark:text-odp-muted", children: "thead/th \uC5C6\uC774 \uBAA8\uB450 tbody/td" }), s.jsx(cr, { className: Fo(!!a.noHeader), checked: !!a.noHeader, onCheckedChange: (r) => u((i) => {
    if (r) return { ...i, noHeader: true };
    const { noHeader: p, ...m } = i;
    return m;
  }), "aria-label": "noHeader", children: s.jsx(ur, { className: Bo }) })] })] }), s.jsxs(le, { name: "headerRows", className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${a.noHeader ? "opacity-40" : ""}`, children: [s.jsx(he, { asChild: true, children: s.jsx("span", { children: s.jsx(pe, { icon: s.jsx(nt, { className: _ }), children: "headerRows" }) }) }), s.jsx($e, { asChild: true, children: s.jsx("input", { type: "number", min: 0, max: X, value: a.headerRows, disabled: !!a.noHeader, onChange: (r) => u((i) => ({ ...i, headerRows: Math.max(0, Number(r.target.value) || 0) })), className: Qe }) })] }), s.jsxs(le, { name: "footerRows", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [s.jsx(he, { asChild: true, children: s.jsx("span", { children: s.jsx(pe, { icon: s.jsx(Wt, { className: _ }), children: "footerRows" }) }) }), s.jsx($e, { asChild: true, children: s.jsx("input", { type: "number", min: 0, max: X, value: a.footerRows, onChange: (r) => u((i) => ({ ...i, footerRows: Math.max(0, Number(r.target.value) || 0) })), className: Qe }) })] }), s.jsxs(le, { name: "width", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [s.jsx(he, { asChild: true, children: s.jsx("span", { children: s.jsx(pe, { icon: s.jsx(qr, { className: _ }), children: "\uB108\uBE44" }) }) }), s.jsx(Je, { "aria-label": "\uD45C \uB108\uBE44", value: a.width, onValueChange: (r) => u((i) => ({ ...i, width: r === "fit" ? "fit" : "full" })), options: [...Xo], className: "w-full" })] }), s.jsxs(le, { name: "align", className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${a.width !== "fit" ? "opacity-40" : ""}`, children: [s.jsx(he, { asChild: true, children: s.jsx("span", { children: s.jsx(pe, { icon: a.align === "right" ? s.jsx(Yr, { className: _ }) : s.jsx(Vr, { className: _ }), children: "\uC815\uB82C" }) }) }), s.jsx(Je, { "aria-label": "\uD45C \uC815\uB82C", value: a.align, disabled: a.width !== "fit", onValueChange: (r) => u((i) => ({ ...i, align: r === "right" ? "right" : "left" })), options: [...qo], className: "w-full" })] })] }), s.jsxs("div", { className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border", children: [s.jsx("p", { className: "text-[10px] font-medium text-gray-600 dark:text-odp-muted", children: "\uD45C \uAE30\uBCF8 \uD3F0\uD2B8\xB7\uC2A4\uD0C0\uC77C" }), s.jsx("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: "\uC140\xB7\uADF8\uB8F9 \uAC12\uC774 \uC788\uC73C\uBA74 \uADF8\uCABD\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4." }), s.jsx(tt, { compact: true, idPrefix: "table-edit-table", value: a.style ?? {}, onChange: (r) => u((i) => ({ ...i, style: zt(r) ? {} : r })) })] }), s.jsxs("div", { className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border", children: [s.jsxs("p", { className: "inline-flex items-center gap-1 text-[10px] font-medium text-gray-600 dark:text-odp-muted", children: [s.jsx(Kt, { className: _, "aria-hidden": true }), "\uADF8\uB8F9 \uC2A4\uD0C0\uC77C"] }), s.jsx("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: "thead / tbody / tfoot \uAD6C\uC5ED" }), s.jsx("div", { className: "mb-1 flex flex-wrap gap-1", children: zo.map((r) => s.jsxs("button", { type: "button", onClick: () => v(r), className: `inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] ${b === r ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-odp-bgSoft"}`, children: [sr(r), r] }, r)) }), s.jsx(tt, { compact: true, idPrefix: `table-edit-${b}`, value: a.sections[b] ?? {}, onChange: (r) => u((i) => ({ ...i, sections: { ...i.sections, [b]: r } })) })] })] })] }), s.jsx(nn, { ariaLabel: "\uD45C \uC0AC\uC774\uB4DC\uBC14\uC640 \uC140 \uC0AC\uC774\uB4DC\uBC14 \uC0AC\uC774 \uB108\uBE44 \uC870\uC808", onDelta: Wn }), s.jsx("aside", { "aria-hidden": !wt, className: `flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-blue-200 bg-white dark:border-blue-900/50 dark:bg-odp-surface landscape:flex-none landscape:shrink-0 ${wt ? "" : "pointer-events-none portrait:hidden landscape:invisible"}`, style: De ? { width: ae } : void 0, children: q ? s.jsxs(s.Fragment, { children: [s.jsx("div", { className: "sticky top-0 z-[1] border-b border-blue-100 bg-white px-2.5 py-1.5 dark:border-blue-900/40 dark:bg-odp-surface", children: s.jsxs("h3", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong", children: [s.jsx(Gr, { className: _, "aria-hidden": true }), "\uC140", s.jsxs("span", { className: "font-normal text-gray-400 dark:text-odp-muted", children: ["(", q.r + 1, "\uD589 ", q.c + 1, "\uC5F4", J.length > 1 ? ` \xB7 ${J.length}\uCE78` : "", ")"] })] }) }), s.jsxs("div", { className: "space-y-2 p-2.5", children: [s.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [s.jsxs("button", { type: "button", disabled: !Vn, title: `\uBCD1\uD569 (${Go})`, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft", onClick: Ve, children: [s.jsx(Zr, { className: _, "aria-hidden": true }), "\uBCD1\uD569"] }), s.jsxs("button", { type: "button", disabled: !c, title: `\uBCD1\uD569 \uD574\uC81C (${Zo})`, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft", onClick: Ge, children: [s.jsx(Jr, { className: _, "aria-hidden": true }), "\uBCD1\uD569 \uD574\uC81C"] })] }), s.jsxs("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: ["\uAE00\uC790 \uD06C\uAE30: ", Jo, " / ", Qo] }), s.jsxs(le, { name: "cell-text", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [s.jsx(he, { asChild: true, children: s.jsx("span", { children: s.jsx(pe, { icon: s.jsx(Qr, { className: _ }), children: "\uC140 \uD14D\uC2A4\uD2B8" }) }) }), s.jsx($e, { asChild: true, children: s.jsx("input", { type: "text", value: rr, onChange: (r) => Rt(q.r, q.c, r.target.value), placeholder: "\uC140 \uB0B4\uC6A9 \uC785\uB825", className: Mr }) })] }), s.jsx(tt, { compact: true, idPrefix: "table-edit-cell", value: Xn, onChange: qn })] })] }) : null }), s.jsx(nn, { ariaLabel: "\uC0AC\uC774\uB4DC\uBC14\uC640 \uD45C \uC0AC\uC774 \uB108\uBE44 \uC870\uC808", onDelta: Kn })] }), s.jsxs("div", { ref: Ae, "data-haim-table-canvas": "", className: `order-1 flex min-h-0 min-w-0 flex-1 flex-col overflow-auto border-t border-gray-100 p-3 landscape:order-2 landscape:border-t-0 landscape:border-l dark:border-odp-border ${ce ? "cursor-grabbing select-none" : me && !c ? "cursor-grab select-none" : ""}`, onMouseLeave: () => {
    y || I(null);
  }, onPointerDown: Qn, onPointerMove: er, onPointerUp: At, onPointerCancel: At, onAuxClick: (r) => {
    r.button === 1 && r.preventDefault();
  }, children: [s.jsxs("p", { className: "mb-2 inline-flex shrink-0 items-center gap-1 text-[10px] text-gray-400", children: [s.jsx(eo, { className: _, "aria-hidden": true }), "\uB354\uBE14\uD074\uB9AD \uB4DC\uB798\uADF8\xB7Shift+\uD074\uB9AD: \uBC94\uC704 \uC120\uD0DD \xB7 \uC6B0\uD074\uB9AD: \uD589/\uC5F4 \uC0AD\uC81C \xB7 \uD720\uD074\uB9AD/\uC2A4\uD398\uC774\uC2A4+\uB4DC\uB798\uADF8: \uD328\uB2DD \xB7 ", st, "/", at, ": \uC2E4\uD589 \uCDE8\uC18C/\uB2E4\uC2DC \uC2E4\uD589 \xB7 \uD14C\uB450\uB9AC \uB354\uBE14\uD074\uB9AD: \uD589\xB7\uC5F4 \uCD94\uAC00"] }), s.jsx("div", { ref: ue, className: "relative inline-block min-w-full p-5", "data-haim-inserting": (j == null ? void 0 : j.kind) ?? void 0, onMouseMove: Gn, onMouseLeave: () => {
    y || I(null);
  }, children: s.jsxs(mn, { delayDuration: 0, skipDelayDuration: 0, children: [s.jsxs("table", { ref: oe, className: `border-collapse text-sm ${((_a = a.colWidths) == null ? void 0 : _a.some((r) => r && r.trim())) ? "w-max max-w-full" : "w-full"}`, style: { tableLayout: ((_b = a.colWidths) == null ? void 0 : _b.some((r) => r && r.trim())) || ((_c = a.rowHeights) == null ? void 0 : _c.some((r) => r && r.trim())) ? "fixed" : void 0, ...((_d = a.style) == null ? void 0 : _d.fontFamily) ? { fontFamily: a.style.fontFamily } : {}, ...((_e2 = a.style) == null ? void 0 : _e2.fontSize) ? { fontSize: a.style.fontSize } : {}, ...((_f = a.style) == null ? void 0 : _f.fontWeight) ? { fontWeight: a.style.fontWeight } : {} }, children: [s.jsx("colgroup", { children: Array.from({ length: K }, (r, i) => {
    const p = et(a.colWidths, i);
    return s.jsx("col", { style: p ? { width: p } : void 0 }, i);
  }) }), s.jsx("tbody", { children: d.rows.map((r, i) => {
    const p = et(a.rowHeights, i);
    return s.jsx("tr", { style: p ? { height: p } : void 0, children: Array.from({ length: K }, (m, g) => {
      if (Ee.has(`${i},${g}`)) return null;
      const k = Rr(a.merges, i, g), T = It(i, g), Y = et(a.colWidths, g), fe = s.jsx("td", { "data-edit-r": i, "data-edit-c": g, colSpan: k == null ? void 0 : k.colspan, rowSpan: k == null ? void 0 : k.rowspan, className: `min-h-11 cursor-pointer border-2 border-gray-300 p-0 transition-[box-shadow,outline-color] dark:border-odp-borderStrong ${Y ? "" : "min-w-28"} ${T ? "relative z-[1] outline outline-2 outline-offset-[-2px] outline-blue-500 ring-0" : "hover:relative hover:z-[1] hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-blue-400/70"}`, onContextMenu: () => {
        It(i, g) || Te(i, g), P && (U({ r: i, c: g }), I(null));
      }, onMouseDown: (w) => {
        var _a2, _b2;
        if (w.button === 1 || w.button !== 0 || Se.current || _e.current && !Z.current) return;
        if ((_b2 = (_a2 = w.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, "[data-haim-edge-hit], [data-haim-edge-add]")) {
          w.preventDefault();
          return;
        }
        {
          const ee = oe.current, Me = ue.current;
          if (ee && Me && Ne(ee, Me, w.clientX, w.clientY, X, K, a.merges)) {
            w.preventDefault();
            return;
          }
        }
        if (w.shiftKey) {
          w.preventDefault(), Lt(i, g);
          return;
        }
        if (w.detail >= 2) {
          w.preventDefault(), Ze(i, g);
          return;
        }
        Te(i, g);
      }, onDoubleClick: (w) => {
        const V = oe.current, ee = ue.current;
        if (V && ee && Ne(V, ee, w.clientX, w.clientY, X, K, a.merges)) {
          w.preventDefault(), w.stopPropagation();
          return;
        }
        w.preventDefault(), Ze(i, g);
      }, onMouseEnter: () => {
        Jn(i, g);
      }, children: s.jsx(le, { name: `cell-${i}-${g}`, className: "contents", children: s.jsx($e, { asChild: true, children: s.jsx("input", { type: "text", value: r[g] ?? "", onChange: (w) => Rt(i, g, w.target.value), onKeyDown: (w) => nr(w, i, g), onMouseDown: (w) => {
        var _a2, _b2;
        if (w.button !== 1 && w.button === 0 && !Se.current && !(_e.current && !Z.current)) {
          if ((_b2 = (_a2 = w.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, "[data-haim-edge-hit], [data-haim-edge-add]")) {
            w.preventDefault(), w.stopPropagation();
            return;
          }
          {
            const V = oe.current, ee = ue.current;
            if (V && ee && Ne(V, ee, w.clientX, w.clientY, X, K, a.merges)) {
              w.preventDefault(), w.stopPropagation();
              return;
            }
          }
          if (w.shiftKey) {
            w.preventDefault(), w.stopPropagation(), Lt(i, g);
            return;
          }
          if (w.detail >= 2) {
            w.preventDefault();
            return;
          }
          w.stopPropagation();
        }
      }, onDoubleClick: (w) => {
        const V = oe.current, ee = ue.current;
        if (V && ee && Ne(V, ee, w.clientX, w.clientY, X, K, a.merges)) {
          w.preventDefault(), w.stopPropagation();
          return;
        }
        w.preventDefault(), w.stopPropagation(), Ze(i, g);
      }, onFocus: () => {
        Ue.current || _e.current && !Z.current || Te(i, g);
      }, className: `${Qe} h-full min-h-11 w-full cursor-pointer border-transparent bg-transparent px-2 text-sm focus:cursor-text focus:border-gray-300 focus:bg-white/90 dark:focus:bg-odp-bgSoft/90 ${Y ? "" : "min-w-28"}`, style: { ...or(i, g), ...p ? { height: p } : {} } }) }) }) }, g);
      return P ? fe : s.jsxs(dr, { onOpenChange: (w) => {
        U(w ? { r: i, c: g } : null), w ? I(null) : be();
      }, children: [s.jsx(fr, { asChild: true, children: fe }), s.jsx(hr, { children: s.jsxs(pr, { className: Vo, onCloseAutoFocus: (w) => w.preventDefault(), children: [s.jsxs(Ot, { className: tn, disabled: X <= 1, onPointerEnter: () => jt(i), onPointerLeave: be, onFocus: () => jt(i), onBlur: be, onSelect: () => {
        St(i);
      }, children: [s.jsx(ve, { className: _, "aria-hidden": true }), "\uD589 \uC0AD\uC81C"] }), s.jsxs(Ot, { className: tn, disabled: K <= 1, onPointerEnter: () => Tt(g), onPointerLeave: be, onFocus: () => Tt(g), onBlur: be, onSelect: () => {
        Et(g);
      }, children: [s.jsx(ve, { className: _, "aria-hidden": true }), "\uC5F4 \uC0AD\uC81C"] })] }) })] }, g);
    }) }, i);
  }) })] }), G ? s.jsx(is, { kind: G.kind, indices: G.indices, table: oe.current, wrap: ue.current, colCount: K }) : null, P && ne ? s.jsxs(Tn, { open: se, onOpenChange: (r) => {
    r || (U(null), be());
  }, title: `${ne.r + 1}\uD589 ${ne.c + 1}\uC5F4`, subtitle: "\uD45C \uD3B8\uC9D1 \uC140", children: [s.jsxs("button", { type: "button", className: ct, disabled: X <= 1, onClick: () => {
    St(ne.r), U(null);
  }, children: [s.jsx(ve, { className: _, "aria-hidden": true }), "\uD589 \uC0AD\uC81C"] }), s.jsxs("button", { type: "button", className: ct, disabled: K <= 1, onClick: () => {
    Et(ne.c), U(null);
  }, children: [s.jsx(ve, { className: _, "aria-hidden": true }), "\uC5F4 \uC0AD\uC81C"] })] }) : null, j && !se ? s.jsxs(s.Fragment, { children: [s.jsx(as, { insert: j }, `preview-${j.kind}-${j.index}`), s.jsx(ss, { insert: j, allowResize: j.index !== 0, tip: j.index === 0 ? j.label : `${j.label} \xB7 ${rn(j.kind)}`, onDoubleClickInsert: () => {
    const { kind: r, index: i } = j;
    r === "row" ? Ct(i) : kt(i);
  }, onResizePointerDown: (r) => Zn(r, j) }, `hit-${j.kind}-${j.index}`), s.jsx(os, { tip: j.index === 0 ? j.label : `${j.label} \xB7 ${rn(j.kind)}`, onDoubleClick: () => {
    const { kind: r, index: i } = j;
    r === "row" ? Ct(i) : kt(i);
  }, style: { left: j.x, top: j.y } }, `btn-${j.kind}-${j.index}`)] }) : null] }) })] })] })] }), s.jsx(Br, { isOpen: R, template: L, onClose: () => {
    $(false), M(null);
  }, onSave: (r) => {
    const p = [...Pr().templates.filter((m) => m.id !== (L == null ? void 0 : L.id) && m.id !== r.id), r];
    Nr({ templates: p }).then((m) => {
      N(m.templates), $(false), M(null);
    });
  } })] }), typeof document < "u" ? gn.createPortal(s.jsx("div", { className: "relative z-[100060]", children: s.jsx(Mn, { isOpen: D !== null, variant: "danger", title: (D == null ? void 0 : D.kind) === "col" ? "\uC5F4 \uC0AD\uC81C" : "\uD589 \uC0AD\uC81C", message: (D == null ? void 0 : D.kind) === "col" ? D.indices.length > 1 ? `\uC120\uD0DD\uD55C ${D.indices.length}\uAC1C \uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(D.indices[0] ?? 0) + 1}\uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : D ? D.indices.length > 1 ? `\uC120\uD0DD\uD55C ${D.indices.length}\uAC1C \uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(D.indices[0] ?? 0) + 1}\uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : "", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", onConfirm: Yn, onCancel: () => B(null) }) }), document.body) : null] });
}
const us = ".export-pdf-cover-stack", ln = ".export-pdf-overlay-portal";
function dt(e) {
  if (!e || typeof window > "u") return 1;
  let t = 1, n = e;
  for (; n; ) {
    const o = window.getComputedStyle(n).zoom;
    if (o && o !== "normal") {
      const l = Number.parseFloat(o);
      Number.isFinite(l) && l > 0 && (t *= l);
    }
    n = n.parentElement;
  }
  return t;
}
function cn(e, t) {
  const n = t > 0 ? t : 1;
  return e / n;
}
function un(e, t) {
  const n = t > 0 ? t : 1;
  return e / n;
}
function ut(e, t, n) {
  if (t < 1) return true;
  const o = t * (n > 0 ? n : 1);
  return Math.abs(e - o) <= Math.abs(e - t);
}
function ds(e) {
  return e.closest(us);
}
function fs(e) {
  if (!e) return null;
  const t = e instanceof Element ? e.querySelector(ln) : null;
  return t instanceof HTMLElement ? t : e instanceof HTMLElement && e.matches(ln) ? e : null;
}
function hs(e, t) {
  const n = dt(e), o = n > 0 ? n : 1, l = e.getBoundingClientRect(), a = t.getBoundingClientRect(), u = e.offsetWidth, d = e.offsetHeight;
  return ut(l.width, u, n) ? { left: (l.left - a.left) / o, top: (l.top - a.top) / o, width: u, height: d } : { left: l.left - a.left, top: l.top - a.top, width: u, height: d };
}
function ps(e) {
  const t = dt(e), n = e.getBoundingClientRect(), o = e.offsetWidth, l = e.offsetHeight, a = ut(n.width, o, t) ? cn(n.width, t) : o, u = ut(n.height, l, t) ? cn(n.height, t) : l;
  return { width: Math.max(1, Math.round(a)), height: Math.max(1, Math.round(u)) };
}
function gs(e) {
  if (e instanceof HTMLElement) {
    const n = ds(e);
    if (n) return { ...hs(e, n), positioning: "zoom-root-absolute" };
  }
  const t = e.getBoundingClientRect();
  return { left: t.left, top: t.top, width: t.width, height: t.height, positioning: "viewport-fixed" };
}
function ms(e, t) {
  var _a, _b;
  let n = 0, o = false, l = null;
  const a = (c) => {
    l && c && l.left === c.left && l.top === c.top && l.width === c.width && l.height === c.height && l.positioning === c.positioning || (l = c, t(c));
  }, u = () => {
    if (o) return;
    const c = e();
    if (!(c == null ? void 0 : c.isConnected)) {
      a(null);
      return;
    }
    const x = gs(c);
    if (x.width < 1 || x.height < 1) {
      a(null);
      return;
    }
    a(x);
  }, d = () => {
    o || (u(), n = requestAnimationFrame(d));
  }, h = () => {
    o || u();
  };
  return n = requestAnimationFrame(d), window.addEventListener("scroll", h, true), window.addEventListener("resize", h), (_a = window.visualViewport) == null ? void 0 : _a.addEventListener("scroll", h), (_b = window.visualViewport) == null ? void 0 : _b.addEventListener("resize", h), () => {
    var _a2, _b2;
    o = true, cancelAnimationFrame(n), window.removeEventListener("scroll", h, true), window.removeEventListener("resize", h), (_a2 = window.visualViewport) == null ? void 0 : _a2.removeEventListener("scroll", h), (_b2 = window.visualViewport) == null ? void 0 : _b2.removeEventListener("resize", h);
  };
}
const xs = ["nw", "ne", "sw", "se"], bs = { nw: { left: 0, top: 0, cursor: "nwse-resize", transform: "translate(-50%, -50%)" }, ne: { left: "100%", top: 0, cursor: "nesw-resize", transform: "translate(-50%, -50%)" }, sw: { left: 0, top: "100%", cursor: "nesw-resize", transform: "translate(-50%, -50%)" }, se: { left: "100%", top: "100%", cursor: "nwse-resize", transform: "translate(-50%, -50%)" } };
function ws(e) {
  return uo(e);
}
function Ys({ containerRef: e, getMarkdown: t, setMarkdown: n, enabled: o = true }) {
  const [l, a] = f.useState(null), [u, d] = f.useState(null), h = f.useRef(null), c = f.useRef(false);
  h.current = l;
  const x = f.useCallback(() => {
    a(null), d(null), h.current = null;
  }, []);
  f.useEffect(() => {
    o || x();
  }, [x, o]), f.useEffect(() => {
    if (!(l == null ? void 0 : l.table)) {
      d(null);
      return;
    }
    const v = l.table;
    return ms(() => v.isConnected ? v : null, (C) => {
      if (!C) {
        x();
        return;
      }
      d(C);
    });
  }, [l, x]), f.useEffect(() => {
    if (!o) return;
    const v = e.current;
    if (!v) return;
    const C = (N) => {
      var _a, _b, _c, _d;
      if (c.current) return;
      const R = N.target;
      if (!R || ((_a = R.closest) == null ? void 0 : _a.call(R, "[data-haim-table-resize-handle]")) || ((_b = R.closest) == null ? void 0 : _b.call(R, "[data-transform-handle]"))) return;
      const $ = ws(v);
      if (!$) return;
      if (!$.contains(R)) {
        x();
        return;
      }
      const L = (_c = R.closest) == null ? void 0 : _c.call(R, "table");
      if (!L || !$.contains(L)) {
        x();
        return;
      }
      if ((_d = R.closest) == null ? void 0 : _d.call(R, "a, button, input, textarea, select")) return;
      const M = ho(L, $);
      if (M < 0) return;
      const j = ps(L), I = { table: L, tableIndex: M, widthPx: Math.max(48, j.width), heightPx: Math.max(32, j.height) };
      h.current = I, a(I);
    };
    return v.addEventListener("pointerdown", C, true), () => v.removeEventListener("pointerdown", C, true);
  }, [x, e, o]);
  const E = f.useCallback((v, C) => {
    v.preventDefault(), v.stopPropagation();
    const N = h.current;
    if (!(N == null ? void 0 : N.table)) return;
    c.current = true;
    const R = v.clientX, $ = v.clientY, L = N.widthPx, M = N.heightPx, j = M > 0 ? L / M : 1, I = v.pointerType === "touch";
    let y = false;
    const O = (F) => {
      const D = dt(N.table), B = un(F.clientX - R, D), G = un(F.clientY - $, D);
      (Math.abs(B) > 1 || Math.abs(G) > 1) && (y = true);
      let A = L, H = M;
      if (C.includes("e") && (A = L + B), C.includes("w") && (A = L - B), C.includes("s") && (H = M + G), C.includes("n") && (H = M - G), A = Math.max(48, A), H = Math.max(32, H), I || F.shiftKey) {
        const se = Math.abs((A - L) / Math.max(1, L)), P = Math.abs((H - M) / Math.max(1, M));
        se >= P ? H = Math.max(32, A / Math.max(1e-4, j)) : A = Math.max(48, H * j);
      }
      A = Math.max(48, Math.round(A)), H = Math.max(32, Math.round(H)), Dr(N.table, A, H);
      const U = { ...N, widthPx: A, heightPx: H };
      h.current = U, a(U);
    }, re = () => {
      document.removeEventListener("pointermove", O, true), document.removeEventListener("pointerup", re, true), document.removeEventListener("pointercancel", re, true), c.current = false;
      const F = h.current;
      if (!F || !y || F.widthPx === L && F.heightPx === M) return;
      const D = fo(t(), { tableIndex: F.tableIndex, widthPx: F.widthPx, heightPx: F.heightPx });
      D.updated && n(D.markdown);
    };
    document.addEventListener("pointermove", O, true), document.addEventListener("pointerup", re, true), document.addEventListener("pointercancel", re, true);
  }, [t, n]);
  if (!o || !l || !u || typeof document > "u") return null;
  const S = u.positioning === "zoom-root-absolute" ? fs(e.current) : null, b = !!S;
  return gn.createPortal(s.jsx("div", { className: `pointer-events-none z-100040 border-2 border-blue-500 print:hidden ${b ? "absolute" : "fixed"}`, style: { left: u.left, top: u.top, width: u.width, height: u.height }, "data-haim-table-resize-overlay": "", children: xs.map((v) => s.jsx("button", { type: "button", "aria-label": `\uD45C \uD06C\uAE30 \uC870\uC808 ${v}`, "data-haim-table-resize-handle": v, className: "pointer-events-auto absolute h-3.5 w-3.5 rounded-sm border-2 border-blue-500 bg-white shadow-sm dark:bg-odp-surface", style: bs[v], onPointerDown: (C) => E(C, v) }, v)) }), b ? S : document.body);
}
const vs = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", dn = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-800 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-surface", fn = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", Fe = "h-3.5 w-3.5 shrink-0";
function Vs({ containerRef: e, getMarkdown: t, setMarkdown: n, onEditTable: o, onEditFailed: l, findPreviewRoot: a, mobileMenuTitle: u = "\uBBF8\uB9AC\uBCF4\uAE30 \uD45C", mobileMenuSubtitle: d = "\uB9C8\uD06C\uB2E4\uC6B4 \uD14C\uC774\uBE14" }) {
  const h = jn(), [c, x] = f.useState(false), [E, S] = f.useState(null), [b, v] = f.useState(null), C = f.useRef(null);
  C.current = E;
  const N = f.useCallback((y) => {
    S(y), x(true);
  }, []);
  f.useEffect(() => {
    const y = e.current;
    if (!y) return;
    const O = () => {
      const P = e.current;
      return P ? a ? a(P) : P.querySelector(".md-editor-preview") : null;
    }, re = (P) => {
      var _a, _b, _c, _d;
      if ((_b = (_a = P.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const z = O(), W = (_d = (_c = P.target) == null ? void 0 : _c.closest) == null ? void 0 : _d.call(_c, "table");
      !(W instanceof HTMLTableElement) || !(z == null ? void 0 : z.contains(W)) || (P.preventDefault(), P.stopPropagation(), N({ table: W, previewRoot: z, x: P.clientX, y: P.clientY }));
    };
    let F = null, D = null, B = false, G = null;
    const A = () => {
      F && clearTimeout(F), F = null, D = null, G = null;
    }, H = (P) => {
      var _a, _b;
      if (P.pointerType === "mouse") return;
      const z = O();
      if (!z) return;
      const W = (_b = (_a = P.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, "table");
      !(W instanceof HTMLTableElement) || !z.contains(W) || (A(), B = false, G = W, D = { x: P.clientX, y: P.clientY }, F = setTimeout(() => {
        B = true, Ar();
        const ae = O();
        G && ae && N({ table: G, previewRoot: ae, x: (D == null ? void 0 : D.x) ?? P.clientX, y: (D == null ? void 0 : D.y) ?? P.clientY });
      }, _r));
    }, ne = (P) => {
      if (!D) return;
      const z = P.clientX - D.x, W = P.clientY - D.y;
      z * z + W * W > 100 && A();
    }, U = (P) => {
      B && (P.preventDefault(), P.stopPropagation()), A(), B = false;
    }, se = (P) => {
      var _a, _b;
      const z = O(), W = (_b = (_a = P.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, "table");
      W && (z == null ? void 0 : z.contains(W)) && window.matchMedia("(pointer: coarse)").matches && P.preventDefault();
    };
    return y.addEventListener("contextmenu", re, true), y.addEventListener("pointerdown", H), y.addEventListener("pointermove", ne), y.addEventListener("pointerup", U), y.addEventListener("pointercancel", U), y.addEventListener("contextmenu", se, true), () => {
      A(), y.removeEventListener("contextmenu", re, true), y.removeEventListener("pointerdown", H), y.removeEventListener("pointermove", ne), y.removeEventListener("pointerup", U), y.removeEventListener("pointercancel", U), y.removeEventListener("contextmenu", se, true);
    };
  }, [e, a, N]);
  const R = () => {
    const y = C.current;
    if (!y) return;
    o(y.table, y.previewRoot) || (l == null ? void 0 : l());
  }, $ = () => {
    const y = C.current;
    if (!y) return;
    const O = Pn(t(), y.table, y.previewRoot);
    if (!O) {
      l == null ? void 0 : l();
      return;
    }
    v(O);
  }, L = () => {
    if (!b) return;
    const y = Or(t(), b);
    n(y), v(null);
  }, M = E ?? { x: 0, y: 0 }, j = () => {
    x(false), S(null);
  }, I = s.jsxs(s.Fragment, { children: [s.jsxs("button", { type: "button", className: h ? Ir : dn, onClick: () => {
    R(), j();
  }, children: [s.jsx(Be, { className: Fe, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1\uAE30"] }), s.jsxs("button", { type: "button", className: h ? ct : fn, onClick: () => {
    $(), j();
  }, children: [s.jsx(ve, { className: Fe, "aria-hidden": true }), "\uD45C \uC0AD\uC81C"] })] });
  return s.jsxs(s.Fragment, { children: [h ? s.jsx(Tn, { open: c, onOpenChange: (y) => {
    x(y), y || S(null);
  }, title: u, subtitle: d, children: I }) : s.jsxs(gr, { open: c, onOpenChange: (y) => {
    x(y), y || S(null);
  }, modal: true, children: [s.jsx(mr, { asChild: true, children: s.jsx("button", { type: "button", "aria-hidden": true, tabIndex: -1, className: "pointer-events-none fixed h-px w-px opacity-0", style: { left: M.x, top: M.y } }) }), s.jsx(xr, { children: s.jsxs(br, { className: vs, side: "bottom", align: "start", sideOffset: 2, collisionPadding: 12, onCloseAutoFocus: (y) => y.preventDefault(), children: [s.jsxs($t, { className: dn, onSelect: R, children: [s.jsx(Be, { className: Fe, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1\uAE30"] }), s.jsxs($t, { className: fn, onSelect: $, children: [s.jsx(ve, { className: Fe, "aria-hidden": true }), "\uD45C \uC0AD\uC81C"] })] }) })] }), s.jsx(Mn, { isOpen: b !== null, variant: "danger", title: "\uD45C \uC0AD\uC81C", message: "\uC774 \uD45C\uB97C \uB9C8\uD06C\uB2E4\uC6B4\uC5D0\uC11C \uC0AD\uC81C\uD560\uAE4C\uC694?", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", onConfirm: L, onCancel: () => v(null) })] });
}
function Gs(e) {
  const [t, n] = f.useState(null), o = f.useRef(e.getMarkdown), l = f.useRef(e.setMarkdown);
  o.current = e.getMarkdown, l.current = e.setMarkdown;
  const a = f.useCallback((c, x = c) => {
    const E = o.current(), S = Ft(E, c, x);
    return S ? (n({ block: S, meta: S.meta ?? Pe(), grid: S.grid }), true) : false;
  }, []), u = f.useCallback((c, x) => {
    const E = o.current(), S = Pn(E, c, x);
    return S ? (n({ block: S, meta: S.meta ?? Pe(), grid: S.grid }), true) : false;
  }, []), d = f.useCallback(() => n(null), []), h = f.useCallback((c, x) => {
    if (!t) return;
    const E = o.current(), S = Ft(E, t.block.start, t.block.start + 1) ?? t.block, b = kn(E, S, c, x);
    l.current(b), n(null);
  }, [t]);
  return { editState: t, openAtOffset: a, openPreviewTable: u, close: d, apply: h, isOpen: !!t };
}
function ys(e) {
  const t = String(e ?? "").trim();
  return t && Rn(t) ? t : null;
}
function _n(e, t) {
  const n = String(e ?? "").trim(), o = ys(n), [l, a] = f.useState(() => o);
  return f.useEffect(() => {
    if (!n) {
      a(null);
      return;
    }
    if (Rn(n)) {
      a(n);
      return;
    }
    let u = false;
    return a(null), $r(n, typeof t == "function" ? t : async () => null).then((h) => {
      u || a(h || null);
    }), () => {
      u = true;
    };
  }, [n, t]), o || l;
}
function Cs({ cover: e }) {
  const t = f.useMemo(() => Hr(e.webfonts), [e.webfonts]);
  return t ? s.jsx("style", { "data-note-cover-webfonts": "1", children: t }) : null;
}
function ks({ path: e, getPresignedUrl: t }) {
  const n = _n(e, t);
  return n ? s.jsx("img", { src: n, alt: "", className: "pointer-events-none absolute inset-0 h-full w-full object-cover", draggable: false }) : null;
}
function Ss({ path: e, getPresignedUrl: t }) {
  const n = _n(e, t);
  return n ? s.jsx("img", { src: n, alt: "", className: "h-full w-full object-fill", draggable: false }) : s.jsx("div", { className: "flex h-full w-full items-center justify-center bg-neutral-100 text-[10px] text-neutral-400", children: "\uC774\uBBF8\uC9C0" });
}
function it(e) {
  return { position: "absolute", left: `${e.x}%`, top: `${e.y}%`, width: `${e.w}%`, height: `${e.h}%` };
}
function Es({ el: e, strictClip: t = false }) {
  const n = e.text ?? "";
  return s.jsx("div", { className: "h-full w-full", style: ao(e), "data-cover-shape": e.type, children: n ? s.jsx("div", { style: lo(e), children: s.jsx("div", { style: co(e, { strictClip: t }), children: n }) }) : null });
}
function Zs({ cover: e, getPresignedUrl: t, className: n = "", style: o, showFrameOutline: l = false, renderElements: a = true, children: u }) {
  const d = no(e.layout), h = e.bg.color || "#ffffff";
  return s.jsxs("div", { className: `export-pdf-cover relative z-2 overflow-hidden bg-white text-gray-900 ${n}`, style: { width: "var(--print-page-width)", height: "var(--print-page-height)", backgroundColor: h, ...o }, "data-note-cover": "1", onContextMenu: (c) => {
    c.stopPropagation();
  }, children: [s.jsx(Cs, { cover: e }), e.bg.imagePath ? s.jsx(ks, { path: e.bg.imagePath, getPresignedUrl: t }) : null, s.jsxs("div", { className: `absolute top-0 bottom-0 ${l ? "outline outline-1 outline-dashed outline-blue-400/70" : ""}`, style: { left: `${d.leftPct}%`, width: `${d.widthPct}%` }, "data-cover-frame": "1", children: [a ? e.elements.map((c) => c.type === "text" ? s.jsx("div", { "data-cover-el": c.id, style: { ...it(c), ...so(c) }, children: c.text }, c.id) : zr(c) ? s.jsx("div", { "data-cover-el": c.id, style: it(c), children: s.jsx(Es, { el: c }) }, c.id) : s.jsx("div", { "data-cover-el": c.id, style: it(c), children: s.jsx(Ss, { path: c.path, getPresignedUrl: t }) }, c.id)) : null, u] })] });
}
const js = "data-md-footnote-to", In = "data-md-footnote-back-button", Ts = 2, Ms = "is-hidden";
let ft = null;
const ke = /* @__PURE__ */ new WeakMap();
function Rs(e) {
  return /^#(?:source-\d+|fnref-\d+(?:-\d+)?)$/i.test(String(e || "").trim());
}
function Ns(e, t) {
  var _a;
  try {
    const n = `#${CSS.escape(e)}, [data-md-footnote-id="${CSS.escape(e)}"]`, o = (_a = t == null ? void 0 : t.querySelector) == null ? void 0 : _a.call(t, n);
    if (o) return o;
  } catch {
  }
  return document.getElementById(e);
}
function Ps(e) {
  return /^source-\d+$/i.test(e);
}
function Ls(e) {
  const t = Fr(e);
  if (!t) {
    e.scrollIntoView({ block: "start", behavior: "smooth" });
    return;
  }
  const n = e.getBoundingClientRect(), o = t.getBoundingClientRect(), l = t.scrollTop + (n.top - o.top) - Ts;
  t.scrollTo({ top: Math.max(0, l), behavior: "smooth" });
}
function hn(e, t) {
  const n = String(e || "").trim(), o = n.startsWith("#") ? n.slice(1) : n;
  if (!o) return false;
  const l = Ns(o, t);
  return l ? (Ps(o) ? Ls(l) : l.scrollIntoView({ block: "nearest", behavior: "smooth" }), true) : false;
}
function pn(e, t) {
  var _a, _b;
  const n = (_a = e == null ? void 0 : e.closest) == null ? void 0 : _a.call(e, ".md-editor-preview");
  return n && t.contains(n) ? n : ((_b = t.querySelector) == null ? void 0 : _b.call(t, ".md-editor-preview")) ?? t;
}
function Ds(e) {
  return (e == null ? void 0 : e.querySelector) ? e.querySelector(`[${In}]`) : null;
}
function ht(e) {
  const t = Ds(e);
  if (!t) return;
  const n = !!(e && ke.get(e));
  t.classList.toggle(Ms, !n), t.toggleAttribute("aria-hidden", !n), t.toggleAttribute("disabled", !n), t.setAttribute("data-footnote-return-target", (e && ke.get(e)) ?? "");
}
function lt(e) {
  e && ke.delete(e), ft = null, ht(e);
}
function As(e, t) {
  e && t ? ke.set(e, t) : e && ke.delete(e), ft = t || null, ht(e);
}
function Js(e) {
  if (!e || typeof e.addEventListener != "function") return;
  const t = (n) => {
    var _a, _b, _c, _d;
    const o = n;
    if (o.metaKey || o.ctrlKey || o.shiftKey || o.altKey || typeof o.button == "number" && o.button !== 0) return;
    const l = (_b = (_a = o.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, `[${In}]`);
    if (l instanceof HTMLElement && e.contains(l)) {
      const x = pn(o.target, e), E = x && ke.get(x) || ft;
      if (!E) return;
      n.preventDefault(), n.stopPropagation(), hn(E, x), lt(x);
      return;
    }
    const a = (_d = (_c = o.target) == null ? void 0 : _c.closest) == null ? void 0 : _d.call(_c, "a[href], a[data-md-footnote-to]");
    if (!a || !e.contains(a)) return;
    const u = a.getAttribute(js) || "", d = a.getAttribute("href") || "", h = u || (Rs(d) ? d.slice(1) : "");
    if (!h) return;
    const c = pn(o.target, e);
    if (n.preventDefault(), n.stopPropagation(), h && h.startsWith("source-")) {
      const x = a.getAttribute("data-md-footnote-id") || a.id;
      x ? As(c, x) : lt(c);
    } else lt(c);
    hn(h, c);
  };
  return e.addEventListener("click", t, true), ht(e), () => e.removeEventListener("click", t, true);
}
export {
  Zs as C,
  Ys as H,
  Xs as P,
  qs as T,
  Vs as a,
  Js as b,
  Ks as c,
  so as d,
  Es as e,
  co as f,
  ro as g,
  lo as h,
  ao as i,
  _n as j,
  uo as k,
  fs as l,
  ps as m,
  Us as n,
  dt as o,
  Bs as r,
  ms as s,
  Gs as u,
  un as v,
  Ws as w
};
