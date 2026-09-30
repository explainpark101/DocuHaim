import { r as f, j as o, a as on } from "./vendor-react-BDjpSibw.js";
import { u as sn, aZ as st, a_ as Wn, dO as an, dP as Oe, aU as te, dQ as ln, dR as cn, dS as Fn, dT as Bn, dU as Un, dV as un, dW as dn, j as fn, dX as Kn, dY as Xn, dZ as qn, d_ as at, d$ as Yn, e0 as Vn, e1 as Zn, e2 as Gn, w as Jn, e3 as Dt, e4 as Qn, e5 as er, aj as tr, ag as Ve, af as Ze, am as nr, A as Ge, z as rr, e6 as or, e7 as Lt, e8 as sr, e9 as ar } from "./index-Dog3fMs3.js";
import { r as lr } from "./wikiImageResolver-BvdyUDhG.js";
import { aq as He, T as ye, U as ir, R as cr, X as ur, y as dr, ar as At, $ as Je, as as _t, at as fr, au as hr, av as pr, aw as $t, ax as gr, ay as mr, az as xr, ad as br, aA as wr, a as yr } from "./vendor-lucide-CJAxREEr.js";
import { t as vr, u as Cr, v as kr, w as Sr, I as It, m as jr, F as ie, L as he, S as Er, g as Mr, n as $e, h as Nr, Z as Rr, _ as Pr, $ as Tr, a0 as Dr, a1 as zt, i as Lr, j as Ar, k as _r, l as $r, A as Ir } from "./vendor-radix-DuLpLUUM.js";
import { H as Qe, T as zr } from "./TableStyleTemplateEditor-Blp9vT1G.js";
import { r as Hr, a as Or } from "./styleResolve-I7mc_aVt.js";
function Wr(e) {
  return { leftPct: 0, widthPct: 100 };
}
function Fr(e, n) {
  return !(n > 0) || !Number.isFinite(e) ? 0 : Math.max(0, e) / n * 100;
}
function gs(e, n, r, l) {
  var _a;
  const i = Fr(n, r), a = [...e];
  if (a.length === 0) return e;
  const u = [...a].sort((c, x) => c.y - x.y || c.x - x.x);
  let d = ((_a = u[0]) == null ? void 0 : _a.y) ?? 0;
  const p = /* @__PURE__ */ new Map();
  for (const c of u) p.set(c.id, d), d += c.h + i;
  return e.map((c) => {
    const x = p.get(c.id);
    return x == null ? c : { ...c, y: x };
  });
}
function ms(e, n) {
  return { ...e, layout: { ...e.layout, ...n, containerWidthPct: 100 } };
}
const xs = 1.5;
function Ht(e, n, r) {
  return Math.min(r, Math.max(n, e));
}
function bs(e) {
  const n = e % 6 * 3;
  return { x: Ht(18 + n, 0, 70), y: Ht(28 + n, 0, 70) };
}
const Br = "var(--cover-font-scale, 1)";
function hn(e) {
  return `calc(${Number.isFinite(e) ? e : 16}px * ${Br})`;
}
function Ur(e, n) {
  return { boxSizing: "border-box", color: e.color, fontSize: hn(e.fontSize), fontWeight: e.fontWeight, textAlign: e.textAlign, fontFamily: e.fontFamily || void 0, overflow: "hidden", whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "break-word", lineHeight: 1.25, ...(n == null ? void 0 : n.strictClip) ? { clipPath: "inset(0 0.2em 0.16em 0)" } : null };
}
function Kr(e) {
  const n = e.type === "ellipse" ? "50%" : e.type === "roundRect" ? `${e.cornerRadiusPct ?? 4}%` : 0;
  return { boxSizing: "border-box", width: "100%", height: "100%", overflow: "hidden", backgroundColor: e.fill || "transparent", borderWidth: Math.max(0, e.borderWidth), borderStyle: e.borderStyle || "solid", borderColor: e.borderColor || "transparent", borderRadius: n };
}
function Xr(e) {
  return e === "middle" ? "center" : e === "bottom" ? "flex-end" : "flex-start";
}
function qr(e) {
  const n = e.paddingPct ?? 0;
  return { boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: Xr(e.textVAlign), width: "100%", height: "100%", margin: 0, padding: `${n}%`, overflow: "hidden" };
}
function Yr(e, n) {
  return { boxSizing: "border-box", width: "100%", margin: 0, padding: 0, border: 0, background: "transparent", outline: "none", resize: "none", overflow: "hidden", whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "break-word", lineHeight: 1.25, color: e.color || "#0c4a6e", fontSize: hn(e.fontSize ?? 24), fontWeight: e.fontWeight ?? "normal", textAlign: e.textAlign ?? "center", fontFamily: e.fontFamily || void 0, ...(n == null ? void 0 : n.strictClip) ? { clipPath: "inset(0 0.2em 0.16em 0)" } : null };
}
function Vr(e) {
  if (!e) return null;
  if (e.classList.contains("md-editor-preview")) return e;
  const n = e.querySelector("[data-export-pdf-pages]");
  return n instanceof Element ? n : e.querySelector(".md-editor-preview") ?? e.querySelector("#export-pdf-preview .md-editor-preview") ?? e.querySelector("[data-export-pdf-preview] .md-editor-preview") ?? e.querySelector(".ProseMirror") ?? (e.classList.contains("ProseMirror") ? e : null) ?? null;
}
function Zr(e, n, r) {
  const l = sn(e);
  if (!l.length) return null;
  const i = [...r.querySelectorAll("table")], a = i.indexOf(n);
  let u = a >= 0 ? l[a] : void 0;
  if (!u) {
    const p = i.filter((c) => c.getAttribute("data-haim-table") === "1").indexOf(n);
    p >= 0 && (u = l.filter((x) => x.meta != null)[p]);
  }
  return !u && l.length === 1 && (u = l[0]), u ?? null;
}
function Gr(e, n) {
  const l = sn(e)[n.tableIndex];
  if (!l) return { markdown: e, updated: false };
  const i = Math.max(48, Math.round(n.widthPx)), a = Math.max(32, Math.round(n.heightPx)), d = { ...l.meta ?? st(), width: "fit", boxWidth: `${i}px`, boxHeight: `${a}px` }, p = Wn(e, l, d, l.grid);
  return { markdown: p, updated: p !== e };
}
function Jr(e, n) {
  return [...n.querySelectorAll("table")].indexOf(e);
}
function Qr(e, n) {
  const r = {};
  for (const [l, i] of Object.entries(e)) {
    const a = Oe(l);
    if (!a) continue;
    const u = a.r >= n ? a.r + 1 : a.r;
    r[te(u, a.c)] = i;
  }
  return r;
}
function eo(e, n) {
  const r = {};
  for (const [l, i] of Object.entries(e)) {
    const a = Oe(l);
    if (!a) continue;
    const u = a.c >= n ? a.c + 1 : a.c;
    r[te(a.r, u)] = i;
  }
  return r;
}
function to(e, n) {
  const r = {};
  for (const [l, i] of Object.entries(e)) {
    const a = Oe(l);
    if (!a || a.r === n) continue;
    const u = a.r > n ? a.r - 1 : a.r;
    r[te(u, a.c)] = i;
  }
  return r;
}
function no(e, n) {
  const r = {};
  for (const [l, i] of Object.entries(e)) {
    const a = Oe(l);
    if (!a || a.c === n) continue;
    const u = a.c > n ? a.c - 1 : a.c;
    r[te(a.r, u)] = i;
  }
  return r;
}
function ro(e, n) {
  return e.map((r) => r.r >= n ? { ...r, r: r.r + 1 } : r.r + r.rowspan > n ? { ...r, rowspan: r.rowspan + 1 } : r);
}
function oo(e, n) {
  return e.map((r) => r.c >= n ? { ...r, c: r.c + 1 } : r.c + r.colspan > n ? { ...r, colspan: r.colspan + 1 } : r);
}
function ve(e) {
  return e.rowspan < 1 || e.colspan < 1 || e.rowspan === 1 && e.colspan === 1 ? null : e;
}
function so(e, n) {
  const r = [];
  for (const l of e) {
    if (l.r > n) {
      const i = ve({ ...l, r: l.r - 1 });
      i && r.push(i);
      continue;
    }
    if (l.r === n) {
      if (l.rowspan <= 1) continue;
      const i = ve({ ...l, rowspan: l.rowspan - 1 });
      i && r.push(i);
      continue;
    }
    if (l.r < n && l.r + l.rowspan > n) {
      const i = ve({ ...l, rowspan: l.rowspan - 1 });
      i && r.push(i);
      continue;
    }
    r.push(l);
  }
  return r;
}
function ao(e, n) {
  const r = [];
  for (const l of e) {
    if (l.c > n) {
      const i = ve({ ...l, c: l.c - 1 });
      i && r.push(i);
      continue;
    }
    if (l.c === n) {
      if (l.colspan <= 1) continue;
      const i = ve({ ...l, colspan: l.colspan - 1 });
      i && r.push(i);
      continue;
    }
    if (l.c < n && l.c + l.colspan > n) {
      const i = ve({ ...l, colspan: l.colspan - 1 });
      i && r.push(i);
      continue;
    }
    r.push(l);
  }
  return r;
}
function lo(e, n, r) {
  const l = n.merges.filter((d) => d.r === r && d.rowspan > 1);
  if (l.length === 0) return { grid: e, meta: n };
  const i = e.rows.map((d) => [...d]), a = { ...n.cells }, u = r + 1;
  for (const d of l) {
    const p = i[r], c = i[u];
    if (!p || !c) continue;
    for (; c.length <= d.c; ) c.push("");
    for (; p.length <= d.c; ) p.push("");
    const x = p[d.c] ?? "";
    x && (c[d.c] = x, p[d.c] = "");
    const E = te(r, d.c), M = te(u, d.c), S = a[E];
    S && (a[M] = { ...S }, delete a[E]);
  }
  return { grid: { rows: i, aligns: [...e.aligns] }, meta: { ...n, cells: a } };
}
function io(e, n, r) {
  const l = n.merges.filter((u) => u.c === r && u.colspan > 1);
  if (l.length === 0) return { grid: e, meta: n };
  const i = e.rows.map((u) => [...u]), a = { ...n.cells };
  for (const u of l) {
    const d = i[u.r];
    if (!d) continue;
    for (; d.length <= u.c + 1; ) d.push("");
    const p = d[u.c] ?? "";
    p && (d[u.c + 1] = p, d[u.c] = "");
    const c = te(u.r, r), x = te(u.r, r + 1), E = a[c];
    E && (a[x] = { ...E }, delete a[c]);
  }
  return { grid: { rows: i, aligns: [...e.aligns] }, meta: { ...n, cells: a } };
}
function co(e, n, r) {
  const l = Math.max(1, ...e.rows.map((x) => x.length), e.aligns.length, 1), i = e.rows.length, a = Math.max(0, Math.min(r, i)), u = Array.from({ length: l }, () => ""), d = [...e.rows.slice(0, a), u, ...e.rows.slice(a)];
  let p = n.headerRows, c = n.footerRows;
  return a < p ? p += 1 : c > 0 && a >= i - c && (c += 1), { grid: { rows: d, aligns: [...e.aligns] }, meta: (() => {
    var _a;
    const x = { ...n, headerRows: p, footerRows: c, merges: ro(n.merges, a), cells: Qr(n.cells, a) };
    if ((_a = n.rowHeights) == null ? void 0 : _a.length) {
      const E = an(n.rowHeights, a);
      E && (x.rowHeights = E);
    }
    return x;
  })() };
}
function uo(e, n, r) {
  const l = Math.max(1, ...e.rows.map((d) => d.length), e.aligns.length, 1), i = Math.max(0, Math.min(r, l)), a = e.rows.map((d) => {
    const p = [...d];
    for (; p.length < l; ) p.push("");
    return p.splice(i, 0, ""), p;
  });
  a.length === 0 && a.push(Array.from({ length: l + 1 }, () => ""));
  const u = [...e.aligns];
  for (; u.length < l; ) u.push(null);
  return u.splice(i, 0, null), { grid: { rows: a, aligns: u }, meta: (() => {
    var _a;
    const d = { ...n, merges: oo(n.merges, i), cells: eo(n.cells, i) };
    if ((_a = n.colWidths) == null ? void 0 : _a.length) {
      const p = an(n.colWidths, i);
      p && (d.colWidths = p);
    }
    return d;
  })() };
}
function fo(e, n, r) {
  var _a;
  const l = e.rows.length;
  if (l <= 1) return { grid: e, meta: n };
  if (r < 0 || r >= l) return { grid: e, meta: n };
  const i = lo(e, n, r), a = [...i.grid.rows.slice(0, r), ...i.grid.rows.slice(r + 1)];
  let u = i.meta.headerRows, d = i.meta.footerRows;
  r < u ? u = Math.max(0, u - 1) : d > 0 && r >= l - d && (d = Math.max(0, d - 1));
  const p = a.length;
  u + d > p && (d = Math.max(0, p - u));
  const c = { ...i.meta, headerRows: u, footerRows: d, merges: so(i.meta.merges, r), cells: to(i.meta.cells, r) };
  if ((_a = i.meta.rowHeights) == null ? void 0 : _a.length) {
    const x = ln(i.meta.rowHeights, r);
    x ? c.rowHeights = x : delete c.rowHeights;
  }
  return { grid: { rows: a, aligns: [...i.grid.aligns] }, meta: c };
}
function ho(e, n, r) {
  var _a;
  const l = Math.max(1, ...e.rows.map((p) => p.length), e.aligns.length, 1);
  if (l <= 1) return { grid: e, meta: n };
  if (r < 0 || r >= l) return { grid: e, meta: n };
  const i = io(e, n, r), a = i.grid.rows.map((p) => {
    const c = [...p];
    for (; c.length < l; ) c.push("");
    return c.splice(r, 1), c;
  }), u = [...i.grid.aligns];
  for (; u.length < l; ) u.push(null);
  u.splice(r, 1);
  const d = { ...i.meta, merges: ao(i.meta.merges, r), cells: no(i.meta.cells, r) };
  if ((_a = i.meta.colWidths) == null ? void 0 : _a.length) {
    const p = ln(i.meta.colWidths, r);
    p ? d.colWidths = p : delete d.colWidths;
  }
  return { grid: { rows: a, aligns: u }, meta: d };
}
function po(e, n, r) {
  const l = [...new Set(r.filter((a) => Number.isInteger(a) && a >= 0))].sort((a, u) => u - a);
  let i = { grid: e, meta: n };
  for (const a of l) {
    if (i.grid.rows.length <= 1) break;
    i = fo(i.grid, i.meta, a);
  }
  return i;
}
function go(e, n, r) {
  const l = [...new Set(r.filter((a) => Number.isInteger(a) && a >= 0))].sort((a, u) => u - a);
  let i = { grid: e, meta: n };
  for (const a of l) {
    if (Math.max(1, ...i.grid.rows.map((d) => d.length), i.grid.aligns.length, 1) <= 1) break;
    i = ho(i.grid, i.meta, a);
  }
  return i;
}
function mo(e) {
  const n = String(e ?? "").trim();
  return n && cn(n) ? n : null;
}
function pn(e, n) {
  const r = String(e ?? "").trim(), l = mo(r), [i, a] = f.useState(() => l);
  return f.useEffect(() => {
    if (!r) {
      a(null);
      return;
    }
    if (cn(r)) {
      a(r);
      return;
    }
    let u = false;
    return a(null), lr(r, typeof n == "function" ? n : async () => null).then((p) => {
      u || a(p || null);
    }), () => {
      u = true;
    };
  }, [r, n]), l || i;
}
function xo({ cover: e }) {
  const n = f.useMemo(() => Bn(e.webfonts), [e.webfonts]);
  return n ? o.jsx("style", { "data-note-cover-webfonts": "1", children: n }) : null;
}
function bo({ path: e, getPresignedUrl: n }) {
  const r = pn(e, n);
  return r ? o.jsx("img", { src: r, alt: "", className: "pointer-events-none absolute inset-0 h-full w-full object-cover", draggable: false }) : null;
}
function wo({ path: e, getPresignedUrl: n }) {
  const r = pn(e, n);
  return r ? o.jsx("img", { src: r, alt: "", className: "h-full w-full object-fill", draggable: false }) : o.jsx("div", { className: "flex h-full w-full items-center justify-center bg-neutral-100 text-[10px] text-neutral-400", children: "\uC774\uBBF8\uC9C0" });
}
function et(e) {
  return { position: "absolute", left: `${e.x}%`, top: `${e.y}%`, width: `${e.w}%`, height: `${e.h}%` };
}
function yo({ el: e, strictClip: n = false }) {
  const r = e.text ?? "";
  return o.jsx("div", { className: "h-full w-full", style: Kr(e), "data-cover-shape": e.type, children: r ? o.jsx("div", { style: qr(e), children: o.jsx("div", { style: Yr(e, { strictClip: n }), children: r }) }) : null });
}
function ws({ cover: e, getPresignedUrl: n, className: r = "", style: l, showFrameOutline: i = false, renderElements: a = true, children: u }) {
  const d = Wr(e.layout), p = e.bg.color || "#ffffff";
  return o.jsxs("div", { className: `export-pdf-cover relative z-2 overflow-hidden bg-white text-gray-900 ${r}`, style: { width: "var(--print-page-width)", height: "var(--print-page-height)", backgroundColor: p, ...l }, "data-note-cover": "1", onContextMenu: (c) => {
    c.stopPropagation();
  }, children: [o.jsx(xo, { cover: e }), e.bg.imagePath ? o.jsx(bo, { path: e.bg.imagePath, getPresignedUrl: n }) : null, o.jsxs("div", { className: `absolute top-0 bottom-0 ${i ? "outline outline-1 outline-dashed outline-blue-400/70" : ""}`, style: { left: `${d.leftPct}%`, width: `${d.widthPct}%` }, "data-cover-frame": "1", children: [a ? e.elements.map((c) => c.type === "text" ? o.jsx("div", { "data-cover-el": c.id, style: { ...et(c), ...Ur(c) }, children: c.text }, c.id) : Fn(c) ? o.jsx("div", { "data-cover-el": c.id, style: et(c), children: o.jsx(yo, { el: c }) }, c.id) : o.jsx("div", { "data-cover-el": c.id, style: et(c), children: o.jsx(wo, { path: c.path, getPresignedUrl: n }) }, c.id)) : null, u] })] });
}
const vo = ".export-pdf-cover-stack", Ot = ".export-pdf-overlay-portal";
function it(e) {
  if (!e || typeof window > "u") return 1;
  let n = 1, r = e;
  for (; r; ) {
    const l = window.getComputedStyle(r).zoom;
    if (l && l !== "normal") {
      const i = Number.parseFloat(l);
      Number.isFinite(i) && i > 0 && (n *= i);
    }
    r = r.parentElement;
  }
  return n;
}
function Wt(e, n) {
  const r = n > 0 ? n : 1;
  return e / r;
}
function Ft(e, n) {
  const r = n > 0 ? n : 1;
  return e / r;
}
function lt(e, n, r) {
  if (n < 1) return true;
  const l = n * (r > 0 ? r : 1);
  return Math.abs(e - l) <= Math.abs(e - n);
}
function Co(e) {
  return e.closest(vo);
}
function ko(e) {
  if (!e) return null;
  const n = e instanceof Element ? e.querySelector(Ot) : null;
  return n instanceof HTMLElement ? n : e instanceof HTMLElement && e.matches(Ot) ? e : null;
}
function So(e, n) {
  const r = it(e), l = r > 0 ? r : 1, i = e.getBoundingClientRect(), a = n.getBoundingClientRect(), u = e.offsetWidth, d = e.offsetHeight;
  return lt(i.width, u, r) ? { left: (i.left - a.left) / l, top: (i.top - a.top) / l, width: u, height: d } : { left: i.left - a.left, top: i.top - a.top, width: u, height: d };
}
function jo(e) {
  const n = it(e), r = e.getBoundingClientRect(), l = e.offsetWidth, i = e.offsetHeight, a = lt(r.width, l, n) ? Wt(r.width, n) : l, u = lt(r.height, i, n) ? Wt(r.height, n) : i;
  return { width: Math.max(1, Math.round(a)), height: Math.max(1, Math.round(u)) };
}
function Eo(e) {
  if (e instanceof HTMLElement) {
    const r = Co(e);
    if (r) return { ...So(e, r), positioning: "zoom-root-absolute" };
  }
  const n = e.getBoundingClientRect();
  return { left: n.left, top: n.top, width: n.width, height: n.height, positioning: "viewport-fixed" };
}
function Mo(e, n) {
  var _a, _b;
  let r = 0, l = false, i = null;
  const a = (c) => {
    i && c && i.left === c.left && i.top === c.top && i.width === c.width && i.height === c.height && i.positioning === c.positioning || (i = c, n(c));
  }, u = () => {
    if (l) return;
    const c = e();
    if (!(c == null ? void 0 : c.isConnected)) {
      a(null);
      return;
    }
    const x = Eo(c);
    if (x.width < 1 || x.height < 1) {
      a(null);
      return;
    }
    a(x);
  }, d = () => {
    l || (u(), r = requestAnimationFrame(d));
  }, p = () => {
    l || u();
  };
  return r = requestAnimationFrame(d), window.addEventListener("scroll", p, true), window.addEventListener("resize", p), (_a = window.visualViewport) == null ? void 0 : _a.addEventListener("scroll", p), (_b = window.visualViewport) == null ? void 0 : _b.addEventListener("resize", p), () => {
    var _a2, _b2;
    l = true, cancelAnimationFrame(r), window.removeEventListener("scroll", p, true), window.removeEventListener("resize", p), (_a2 = window.visualViewport) == null ? void 0 : _a2.removeEventListener("scroll", p), (_b2 = window.visualViewport) == null ? void 0 : _b2.removeEventListener("resize", p);
  };
}
const No = ["nw", "ne", "sw", "se"], Ro = { nw: { left: 0, top: 0, cursor: "nwse-resize", transform: "translate(-50%, -50%)" }, ne: { left: "100%", top: 0, cursor: "nesw-resize", transform: "translate(-50%, -50%)" }, sw: { left: 0, top: "100%", cursor: "nesw-resize", transform: "translate(-50%, -50%)" }, se: { left: "100%", top: "100%", cursor: "nwse-resize", transform: "translate(-50%, -50%)" } };
function Po(e) {
  return Vr(e);
}
function ys({ containerRef: e, getMarkdown: n, setMarkdown: r, enabled: l = true }) {
  const [i, a] = f.useState(null), [u, d] = f.useState(null), p = f.useRef(null), c = f.useRef(false);
  p.current = i;
  const x = f.useCallback(() => {
    a(null), d(null), p.current = null;
  }, []);
  f.useEffect(() => {
    l || x();
  }, [x, l]), f.useEffect(() => {
    if (!(i == null ? void 0 : i.table)) {
      d(null);
      return;
    }
    const y = i.table;
    return Mo(() => y.isConnected ? y : null, (k) => {
      if (!k) {
        x();
        return;
      }
      d(k);
    });
  }, [i, x]), f.useEffect(() => {
    if (!l) return;
    const y = e.current;
    if (!y) return;
    const k = (D) => {
      var _a, _b, _c, _d;
      if (c.current) return;
      const R = D.target;
      if (!R || ((_a = R.closest) == null ? void 0 : _a.call(R, "[data-haim-table-resize-handle]")) || ((_b = R.closest) == null ? void 0 : _b.call(R, "[data-transform-handle]"))) return;
      const B = Po(y);
      if (!B) return;
      if (!B.contains(R)) {
        x();
        return;
      }
      const $ = (_c = R.closest) == null ? void 0 : _c.call(R, "table");
      if (!$ || !B.contains($)) {
        x();
        return;
      }
      if ((_d = R.closest) == null ? void 0 : _d.call(R, "a, button, input, textarea, select")) return;
      const I = Jr($, B);
      if (I < 0) return;
      const j = jo($), A = { table: $, tableIndex: I, widthPx: Math.max(48, j.width), heightPx: Math.max(32, j.height) };
      p.current = A, a(A);
    };
    return y.addEventListener("pointerdown", k, true), () => y.removeEventListener("pointerdown", k, true);
  }, [x, e, l]);
  const E = f.useCallback((y, k) => {
    y.preventDefault(), y.stopPropagation();
    const D = p.current;
    if (!(D == null ? void 0 : D.table)) return;
    c.current = true;
    const R = y.clientX, B = y.clientY, $ = D.widthPx, I = D.heightPx, j = I > 0 ? $ / I : 1, A = y.pointerType === "touch";
    let w = false;
    const _ = (O) => {
      const P = it(D.table), W = Ft(O.clientX - R, P), Z = Ft(O.clientY - B, P);
      (Math.abs(W) > 1 || Math.abs(Z) > 1) && (w = true);
      let T = $, H = I;
      if (k.includes("e") && (T = $ + W), k.includes("w") && (T = $ - W), k.includes("s") && (H = I + Z), k.includes("n") && (H = I - Z), T = Math.max(48, T), H = Math.max(32, H), A || O.shiftKey) {
        const se = Math.abs((T - $) / Math.max(1, $)), N = Math.abs((H - I) / Math.max(1, I));
        se >= N ? H = Math.max(32, T / Math.max(1e-4, j)) : T = Math.max(48, H * j);
      }
      T = Math.max(48, Math.round(T)), H = Math.max(32, Math.round(H)), Un(D.table, T, H);
      const K = { ...D, widthPx: T, heightPx: H };
      p.current = K, a(K);
    }, re = () => {
      document.removeEventListener("pointermove", _, true), document.removeEventListener("pointerup", re, true), document.removeEventListener("pointercancel", re, true), c.current = false;
      const O = p.current;
      if (!O || !w || O.widthPx === $ && O.heightPx === I) return;
      const P = Gr(n(), { tableIndex: O.tableIndex, widthPx: O.widthPx, heightPx: O.heightPx });
      P.updated && r(P.markdown);
    };
    document.addEventListener("pointermove", _, true), document.addEventListener("pointerup", re, true), document.addEventListener("pointercancel", re, true);
  }, [n, r]);
  if (!l || !i || !u || typeof document > "u") return null;
  const M = u.positioning === "zoom-root-absolute" ? ko(e.current) : null, S = !!M;
  return on.createPortal(o.jsx("div", { className: `pointer-events-none z-100040 border-2 border-blue-500 print:hidden ${S ? "absolute" : "fixed"}`, style: { left: u.left, top: u.top, width: u.width, height: u.height }, "data-haim-table-resize-overlay": "", children: No.map((y) => o.jsx("button", { type: "button", "aria-label": `\uD45C \uD06C\uAE30 \uC870\uC808 ${y}`, "data-haim-table-resize-handle": y, className: "pointer-events-auto absolute h-3.5 w-3.5 rounded-sm border-2 border-blue-500 bg-white shadow-sm dark:bg-odp-surface", style: Ro[y], onPointerDown: (k) => E(k, y) }, y)) }), S ? M : document.body);
}
const To = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", Bt = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-800 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-surface", Ut = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", Ie = "h-3.5 w-3.5 shrink-0";
function vs({ containerRef: e, getMarkdown: n, setMarkdown: r, onEditTable: l, onEditFailed: i, findPreviewRoot: a, mobileMenuTitle: u = "\uBBF8\uB9AC\uBCF4\uAE30 \uD45C", mobileMenuSubtitle: d = "\uB9C8\uD06C\uB2E4\uC6B4 \uD14C\uC774\uBE14" }) {
  const p = un(), [c, x] = f.useState(false), [E, M] = f.useState(null), [S, y] = f.useState(null), k = f.useRef(null);
  k.current = E;
  const D = f.useCallback((w) => {
    M(w), x(true);
  }, []);
  f.useEffect(() => {
    const w = e.current;
    if (!w) return;
    const _ = () => {
      const N = e.current;
      return N ? a ? a(N) : N.querySelector(".md-editor-preview") : null;
    }, re = (N) => {
      var _a, _b, _c, _d, _e, _f;
      if ((_b = (_a = N.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const z = _(), F = ((_d = (_c = N.target) == null ? void 0 : _c.closest) == null ? void 0 : _d.call(_c, 'table[data-haim-table="1"]')) ?? ((_f = (_e = N.target) == null ? void 0 : _e.closest) == null ? void 0 : _f.call(_e, "table"));
      !(F instanceof HTMLTableElement) || !(z == null ? void 0 : z.contains(F)) || F.getAttribute("data-haim-table") === "1" && (N.preventDefault(), N.stopPropagation(), D({ table: F, previewRoot: z, x: N.clientX, y: N.clientY }));
    };
    let O = null, P = null, W = false, Z = null;
    const T = () => {
      O && clearTimeout(O), O = null, P = null, Z = null;
    }, H = (N) => {
      var _a, _b;
      if (N.pointerType === "mouse") return;
      const z = _();
      if (!z) return;
      const F = (_b = (_a = N.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, 'table[data-haim-table="1"]');
      !(F instanceof HTMLTableElement) || !z.contains(F) || (T(), W = false, Z = F, P = { x: N.clientX, y: N.clientY }, O = setTimeout(() => {
        W = true, Kn();
        const ae = _();
        Z && ae && D({ table: Z, previewRoot: ae, x: (P == null ? void 0 : P.x) ?? N.clientX, y: (P == null ? void 0 : P.y) ?? N.clientY });
      }, Xn));
    }, ne = (N) => {
      if (!P) return;
      const z = N.clientX - P.x, F = N.clientY - P.y;
      z * z + F * F > 100 && T();
    }, K = (N) => {
      W && (N.preventDefault(), N.stopPropagation()), T(), W = false;
    }, se = (N) => {
      var _a, _b;
      const z = _(), F = (_b = (_a = N.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, "table");
      F && (z == null ? void 0 : z.contains(F)) && window.matchMedia("(pointer: coarse)").matches && N.preventDefault();
    };
    return w.addEventListener("contextmenu", re, true), w.addEventListener("pointerdown", H), w.addEventListener("pointermove", ne), w.addEventListener("pointerup", K), w.addEventListener("pointercancel", K), w.addEventListener("contextmenu", se, true), () => {
      T(), w.removeEventListener("contextmenu", re, true), w.removeEventListener("pointerdown", H), w.removeEventListener("pointermove", ne), w.removeEventListener("pointerup", K), w.removeEventListener("pointercancel", K), w.removeEventListener("contextmenu", se, true);
    };
  }, [e, a, D]);
  const R = () => {
    const w = k.current;
    if (!w) return;
    l(w.table, w.previewRoot) || (i == null ? void 0 : i());
  }, B = () => {
    const w = k.current;
    if (!w) return;
    const _ = Zr(n(), w.table, w.previewRoot);
    if (!_) {
      i == null ? void 0 : i();
      return;
    }
    y(_);
  }, $ = () => {
    if (!S) return;
    const w = Yn(n(), S);
    r(w), y(null);
  }, I = E ?? { x: 0, y: 0 }, j = () => {
    x(false), M(null);
  }, A = o.jsxs(o.Fragment, { children: [o.jsxs("button", { type: "button", className: p ? qn : Bt, onClick: () => {
    R(), j();
  }, children: [o.jsx(He, { className: Ie, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1\uAE30"] }), o.jsxs("button", { type: "button", className: p ? at : Ut, onClick: () => {
    B(), j();
  }, children: [o.jsx(ye, { className: Ie, "aria-hidden": true }), "\uD45C \uC0AD\uC81C"] })] });
  return o.jsxs(o.Fragment, { children: [p ? o.jsx(dn, { open: c, onOpenChange: (w) => {
    x(w), w || M(null);
  }, title: u, subtitle: d, children: A }) : o.jsxs(vr, { open: c, onOpenChange: (w) => {
    x(w), w || M(null);
  }, modal: true, children: [o.jsx(Cr, { asChild: true, children: o.jsx("button", { type: "button", "aria-hidden": true, tabIndex: -1, className: "pointer-events-none fixed h-px w-px opacity-0", style: { left: I.x, top: I.y } }) }), o.jsx(kr, { children: o.jsxs(Sr, { className: To, side: "bottom", align: "start", sideOffset: 2, collisionPadding: 12, onCloseAutoFocus: (w) => w.preventDefault(), children: [o.jsxs(It, { className: Bt, onSelect: R, children: [o.jsx(He, { className: Ie, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1\uAE30"] }), o.jsxs(It, { className: Ut, onSelect: B, children: [o.jsx(ye, { className: Ie, "aria-hidden": true }), "\uD45C \uC0AD\uC81C"] })] }) })] }), o.jsx(fn, { isOpen: S !== null, variant: "danger", title: "\uD45C \uC0AD\uC81C", message: "\uC774 \uD45C\uB97C \uB9C8\uD06C\uB2E4\uC6B4\uC5D0\uC11C \uC0AD\uC81C\uD560\uAE4C\uC694?", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", onConfirm: $, onCancel: () => y(null) })] });
}
const Kt = 80, Do = 350;
function Xt(e) {
  return JSON.stringify(e);
}
function qt(e) {
  try {
    const n = JSON.parse(e);
    return !n || typeof n != "object" || !n.meta || typeof n.meta != "object" || !n.grid || !Array.isArray(n.grid.rows) ? null : n;
  } catch {
    return null;
  }
}
function Lo(e) {
  return !Array.isArray(e) || e.length === 0 ? [] : e.length <= Kt ? e : e.slice(e.length - Kt);
}
function Ao(e, n, r) {
  const l = Array.isArray(e) && e.length > 0 ? e : [];
  if (l.length === 0) return { stack: [r], index: 0, changed: true };
  const i = Math.max(0, Math.min(n, l.length - 1));
  if (l[i] === r) return { stack: l, index: i, changed: false };
  const a = l.slice(0, i + 1);
  a.push(r);
  const u = Lo(a);
  return { stack: u, index: u.length - 1, changed: true };
}
function _o({ enabled: e, historyKey: n, meta: r, grid: l, applySnapshot: i }) {
  const a = f.useRef([]), u = f.useRef(0), d = f.useRef(false), p = f.useRef(false), c = f.useRef(null), x = f.useRef(null), E = f.useRef(i);
  E.current = i;
  const [M, S] = f.useState(0), y = f.useCallback(() => S((w) => w + 1), []), k = f.useCallback(() => {
    c.current && (clearTimeout(c.current), c.current = null);
  }, []), D = f.useCallback(() => Xt({ meta: r, grid: l }), [l, r]), R = f.useCallback(() => {
    k();
    const w = x.current;
    if (w == null) return;
    x.current = null;
    const _ = Ao(a.current, u.current, w);
    _.changed && (a.current = _.stack, u.current = _.index, y());
  }, [y, k]);
  f.useEffect(() => {
    if (!e) {
      k(), x.current = null, a.current = [], u.current = 0, p.current = false, y();
      return;
    }
    if (n <= 0) return;
    k(), x.current = null;
    const w = Xt({ meta: r, grid: l });
    a.current = [w], u.current = 0, p.current = true, y();
  }, [e, n, y, k]), f.useEffect(() => {
    if (!e || !p.current || d.current) return;
    const w = D();
    if (a.current[u.current] !== w) return x.current = w, k(), c.current = setTimeout(() => {
      c.current = null, R();
    }, Do), () => {
      k();
    };
  }, [k, D, e, R, l, r]);
  const B = f.useCallback(() => {
    !e || !p.current || d.current || (x.current = D(), R());
  }, [D, e, R]), $ = f.useCallback(() => {
    if (R(), u.current <= 0) return false;
    u.current -= 1;
    const w = a.current[u.current], _ = w ? qt(w) : null;
    return _ ? (d.current = true, E.current(_), y(), requestAnimationFrame(() => {
      d.current = false;
    }), true) : false;
  }, [y, R]), I = f.useCallback(() => {
    if (R(), u.current >= a.current.length - 1) return false;
    u.current += 1;
    const w = a.current[u.current], _ = w ? qt(w) : null;
    return _ ? (d.current = true, E.current(_), y(), requestAnimationFrame(() => {
      d.current = false;
    }), true) : false;
  }, [y, R]), j = e && p.current && u.current > 0, A = e && p.current && u.current < a.current.length - 1;
  return { undo: $, redo: I, canUndo: j, canRedo: A, recordNow: B, flushPendingRecord: R };
}
const $o = ["thead", "tbody", "tfoot"], tt = 10, Yt = 36, Vt = 44, Ce = 4, ze = 14, Io = "h-3.5 w-3.5 shrink-0", L = "h-3 w-3 shrink-0", nt = "__none__", zo = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), Ho = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Zt = 288, gn = 200, Oo = 480, Wo = 380, Fo = 560, Gt = 16, Ne = 6, Bo = [{ value: "full", label: "\uD398\uC774\uC9C0 \uC804\uCCB4 (full)" }, { value: "fit", label: "\uB0B4\uC6A9\uB9CC\uD07C (fit)" }], Uo = [{ value: "left", label: "\uC67C\uCABD" }, { value: "right", label: "\uC624\uB978\uCABD" }], Ko = "pointer-events-none z-100050 max-w-[240px] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", Xo = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", Jt = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", mn = typeof navigator < "u" && (/Mac|iPhone|iPad|iPod/i.test(navigator.platform) || /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent ?? "")), ge = mn ? "\u2318" : "Ctrl", qo = `${ge}+E`, Yo = `${ge}+Shift+E`, Vo = `${ge}+Shift+>`, Zo = `${ge}+Shift+<`, rt = `${ge}+Z`, ot = mn ? `${ge}+Shift+Z` : `${ge}+Y`, Go = 14;
function Jo(e, n, r = Go) {
  const l = (e || "").trim(), i = /^(\d+(?:\.\d+)?)(px|%|em|rem|pt)?$/i.exec(l), a = ((i == null ? void 0 : i[2]) || "px").toLowerCase(), u = i ? Number(i[1]) : r, d = a === "em" || a === "rem" ? 0.1 : 1, p = a === "em" || a === "rem" ? 0.5 : a === "%" ? 50 : 8;
  let c = (Number.isFinite(u) ? u : r) + n * d;
  return c = Math.max(p, c), a === "em" || a === "rem" ? c = Math.round(c * 10) / 10 : c = Math.round(c), `${c}${a}`;
}
function pe({ icon: e, children: n }) {
  return o.jsxs("span", { className: "inline-flex items-center gap-1", children: [o.jsx("span", { className: "inline-flex shrink-0 text-gray-400 dark:text-odp-muted", "aria-hidden": true, children: e }), n] });
}
function we(e) {
  return Math.min(Oo, Math.max(gn, Math.round(e)));
}
function Qt({ onDelta: e, ariaLabel: n }) {
  const r = f.useRef(0);
  return o.jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": n, className: "group relative hidden w-1.5 shrink-0 cursor-col-resize touch-none select-none landscape:flex", onPointerDown: (l) => {
    l.preventDefault(), l.stopPropagation(), l.currentTarget.setPointerCapture(l.pointerId), r.current = l.clientX;
  }, onPointerMove: (l) => {
    if (!l.currentTarget.hasPointerCapture(l.pointerId)) return;
    const i = l.clientX - r.current;
    r.current = l.clientX, i !== 0 && e(i);
  }, onPointerUp: (l) => {
    l.currentTarget.hasPointerCapture(l.pointerId) && l.currentTarget.releasePointerCapture(l.pointerId);
  }, onPointerCancel: (l) => {
    l.currentTarget.hasPointerCapture(l.pointerId) && l.currentTarget.releasePointerCapture(l.pointerId);
  }, children: o.jsx("span", { className: "absolute inset-y-2 left-1/2 w-px -translate-x-1/2 rounded-full bg-gray-300 transition-colors group-hover:bg-blue-400 group-active:bg-blue-500 dark:bg-odp-borderStrong dark:group-hover:bg-blue-400", "aria-hidden": true }) });
}
function Qo(e, n) {
  return e === 0 ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC704\uC5D0 \uD589 \uCD94\uAC00" : e === n ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC544\uB798\uC5D0 \uD589 \uCD94\uAC00" : `\uB354\uBE14\uD074\uB9AD: ${e}\uD589 \uC704\uC5D0 \uD589 \uCD94\uAC00`;
}
function es(e, n) {
  return e === 0 ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC55E\uC5D0 \uC5F4 \uCD94\uAC00" : e === n ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uB4A4\uC5D0 \uC5F4 \uCD94\uAC00" : `\uB354\uBE14\uD074\uB9AD: ${e}\uC5F4 \uC55E\uC5D0 \uC5F4 \uCD94\uAC00`;
}
function en(e) {
  return e === "row" ? "\uB4DC\uB798\uADF8: \uD589 \uB192\uC774 \uC870\uC808" : "\uB4DC\uB798\uADF8: \uC5F4 \uB108\uBE44 \uC870\uC808";
}
function tn(e, n, r, l, i, a) {
  const u = l.left - i.left, d = n - i.top, p = l.width, c = Math.min(Math.max(r - i.left, u), u + p);
  return { kind: "row", index: e, x: c, y: d, edge: { left: u, top: d - Ce / 2, width: p, height: Ce }, ghost: { left: u, top: d - Yt / 2, width: p, height: Yt }, label: Qo(e, a) };
}
function nn(e, n, r, l, i, a) {
  const u = l.top - i.top, d = n - i.left, p = l.height, c = Math.min(Math.max(r - i.top, u), u + p);
  return { kind: "col", index: e, x: d, y: c, edge: { left: d - Ce / 2, top: u, width: Ce, height: p }, ghost: { left: d - Vt / 2, top: u, width: Vt, height: p }, label: es(e, a) };
}
function ts({ tip: e, onDoubleClick: n, style: r }) {
  return o.jsxs(Lr, { open: true, children: [o.jsx(Ar, { asChild: true, children: o.jsx("button", { type: "button", "aria-label": e, style: r, onClick: (l) => {
    l.preventDefault(), l.stopPropagation();
  }, onDoubleClick: (l) => {
    l.preventDefault(), l.stopPropagation(), n();
  }, onMouseDown: (l) => {
    l.preventDefault(), l.stopPropagation();
  }, onPointerDown: (l) => {
    l.preventDefault(), l.stopPropagation();
  }, "data-haim-edge-add": "", className: "haim-table-insert-btn pointer-events-auto absolute z-30 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-400/80 bg-white text-blue-600 shadow-sm hover:bg-blue-50 dark:border-blue-400/70 dark:bg-odp-surface dark:text-blue-300 dark:hover:bg-blue-950/60", children: o.jsx(yr, { className: "h-3 w-3", "aria-hidden": true }) }) }), o.jsx(_r, { children: o.jsxs($r, { className: Ko, side: "top", sideOffset: 8, children: [e, o.jsx(Ir, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function ns({ insert: e, tip: n, allowResize: r, onDoubleClickInsert: l, onResizePointerDown: i }) {
  const a = e.kind === "row", u = a ? { left: e.edge.left, top: e.edge.top + Ce / 2 - ze / 2, width: e.edge.width, height: ze } : { left: e.edge.left + Ce / 2 - ze / 2, top: e.edge.top, width: ze, height: e.edge.height };
  return o.jsx("div", { role: "presentation", title: n, "data-haim-edge-hit": "", className: `pointer-events-auto absolute z-[25] ${r ? a ? "cursor-row-resize" : "cursor-col-resize" : "cursor-pointer"}`, style: { left: u.left, top: u.top, width: u.width, height: u.height }, onMouseDown: (d) => {
    d.preventDefault(), d.stopPropagation();
  }, onPointerDown: (d) => {
    if (d.preventDefault(), d.stopPropagation(), d.button !== 0 || d.detail >= 2 || !r) return;
    const p = d.clientX, c = d.clientY, x = d;
    let E = false;
    const M = () => {
      document.removeEventListener("pointermove", S, true), document.removeEventListener("pointerup", y, true), document.removeEventListener("pointercancel", y, true);
    }, S = (k) => {
      E || Math.abs(k.clientX - p) < 3 && Math.abs(k.clientY - c) < 3 || (E = true, M(), i(x));
    }, y = () => {
      M();
    };
    document.addEventListener("pointermove", S, true), document.addEventListener("pointerup", y, true), document.addEventListener("pointercancel", y, true);
  }, onDoubleClick: (d) => {
    d.preventDefault(), d.stopPropagation(), l();
  } });
}
function rs({ insert: e }) {
  const n = `${e.kind}-${e.index}`;
  return o.jsxs("div", { "data-haim-insert-preview": "", className: "contents", children: [o.jsx("div", { "aria-hidden": true, className: `pointer-events-none absolute z-10 rounded-sm border border-transparent bg-blue-400/[0.04] dark:bg-blue-400/[0.06] ${e.kind === "row" ? "haim-table-insert-ghost-row" : "haim-table-insert-ghost-col"}`, style: { left: e.ghost.left, top: e.ghost.top, width: e.ghost.width, height: e.ghost.height } }, `ghost-${n}`), o.jsx("div", { "aria-hidden": true, className: "haim-table-insert-glow pointer-events-none absolute z-[11] rounded-full", style: { left: e.edge.left, top: e.edge.top, width: e.edge.width, height: e.edge.height } }, `glow-${n}`)] });
}
function os({ kind: e, indices: n, table: r, wrap: l, colCount: i }) {
  const [a, u] = f.useState([]);
  return f.useEffect(() => {
    if (!r || !l || !n.length) {
      u([]);
      return;
    }
    const d = () => {
      const p = l.getBoundingClientRect(), c = r.getBoundingClientRect(), x = [];
      if (e === "row") for (const E of n) {
        const M = r.rows[E];
        if (!M) continue;
        const S = M.getBoundingClientRect();
        x.push({ left: c.left - p.left, top: S.top - p.top, width: c.width, height: Math.max(1, S.height) });
      }
      else {
        const E = xn(r, i);
        for (const M of n) {
          const S = E[M], y = E[M + 1];
          S == null || y == null || x.push({ left: S - p.left, top: c.top - p.top, width: Math.max(1, y - S), height: c.height });
        }
      }
      u(x);
    };
    return d(), window.addEventListener("resize", d), () => window.removeEventListener("resize", d);
  }, [i, n, e, r, l]), a.length ? o.jsx("div", { "data-haim-delete-preview": "", className: "pointer-events-none absolute inset-0 z-20", "aria-hidden": true, children: a.map((d, p) => o.jsx("div", { className: "absolute rounded-sm bg-red-500/25 ring-1 ring-inset ring-red-500/50 dark:bg-red-500/30 dark:ring-red-400/40", style: { left: d.left, top: d.top, width: d.width, height: d.height } }, `${e}-${n[p] ?? p}`)) }) : null;
}
function ss(e) {
  const n = [...e.rows];
  if (!n.length) return [];
  const r = [];
  for (let l = 0; l < n.length; l += 1) r.push(n[l].getBoundingClientRect().top);
  return r.push(n[n.length - 1].getBoundingClientRect().bottom), r;
}
function xn(e, n) {
  const r = e.getBoundingClientRect(), l = [];
  for (let u = 0; u < n; u += 1) {
    const d = e.querySelectorAll(`[data-edit-c="${u}"]`);
    let p = null;
    d.forEach((c) => {
      const x = c.getBoundingClientRect();
      (p == null || x.left < p) && (p = x.left);
    }), p != null ? l.push(p) : l.push(r.left + r.width * u / Math.max(n, 1));
  }
  let i = r.right;
  return e.querySelectorAll(`[data-edit-c="${n - 1}"]`).forEach((u) => {
    const d = u.getBoundingClientRect();
    d.right > i && (i = d.right);
  }), l.push(i), l;
}
function as(e, n, r) {
  var _a, _b;
  if (!r.length || typeof document > "u") return null;
  const i = (_b = (_a = document.elementFromPoint(e, n)) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, "td[data-edit-r][data-edit-c]");
  if (!i) return null;
  const a = Number(i.getAttribute("data-edit-r")), u = Number(i.getAttribute("data-edit-c"));
  return !Number.isInteger(a) || !Number.isInteger(u) ? null : ar(r, a, u);
}
function rn(e, n, r) {
  return e === "col" ? r.colspan > 1 && r.c < n && n < r.c + r.colspan : r.rowspan > 1 && r.r < n && n < r.r + r.rowspan;
}
function Re(e, n, r, l, i, a, u) {
  const d = e.getBoundingClientRect(), p = n.getBoundingClientRect(), c = tt + 2;
  if (r < d.left - c || r > d.right + c || l < d.top - c || l > d.bottom + c) return null;
  const x = ss(e), E = xn(e, a), M = as(r, l, u);
  let S = null;
  for (let k = 0; k < x.length; k += 1) {
    if (M && rn("row", k, M)) continue;
    const D = x[k], R = Math.abs(l - D);
    R <= tt && r >= d.left - c && r <= d.right + c && (!S || R < S.dist) && (S = { index: k, dist: R, y: D });
  }
  let y = null;
  for (let k = 0; k < E.length; k += 1) {
    if (M && rn("col", k, M)) continue;
    const D = E[k], R = Math.abs(r - D);
    R <= tt && l >= d.top - c && l <= d.bottom + c && (!y || R < y.dist) && (y = { index: k, dist: R, x: D });
  }
  return S && y ? S.dist <= y.dist ? tn(S.index, S.y, r, d, p, i) : nn(y.index, y.x, l, d, p, a) : S ? tn(S.index, S.y, r, d, p, i) : y ? nn(y.index, y.x, l, d, p, a) : null;
}
function Cs({ isOpen: e, initialMeta: n, initialGrid: r, onClose: l, onSave: i }) {
  var _a, _b, _c, _d, _e2, _f;
  const [a, u] = f.useState(st()), [d, p] = f.useState(r), [c, x] = f.useState(null), [E, M] = f.useState(false), [S, y] = f.useState("thead"), [k, D] = f.useState([]), [R, B] = f.useState(false), [$, I] = f.useState(null), [j, A] = f.useState(null), [w, _] = f.useState(false), [re, O] = f.useState(0), [P, W] = f.useState(null), [Z, T] = f.useState(null), H = f.useRef(null), [ne, K] = f.useState(null), se = ne !== null, N = un(), [z, F] = f.useState(Zt), [ae, ct] = f.useState(Zt), [me, xe] = f.useState(false), [ce, We] = f.useState(false), [Pe, bn] = f.useState(() => typeof window < "u" ? window.innerWidth : 1280), [Te, wn] = f.useState(() => typeof window < "u" ? window.matchMedia("(orientation: landscape)").matches : true), De = f.useRef(null), ue = f.useRef(null), oe = f.useRef(null), yn = f.useRef(null), Fe = f.useRef(false), le = f.useRef(null), G = f.useRef(null), Le = f.useRef(false), ke = f.useRef(false), Ae = f.useRef({ x: 0, y: 0 });
  yn.current = j, Fe.current = E, G.current = c, Le.current = me, ke.current = se, H.current = Z;
  const ut = f.useRef(n), dt = f.useRef(r);
  ut.current = n, dt.current = r, f.useEffect(() => {
    if (!e) return;
    const t = ut.current, s = dt.current;
    u(t ? { ...t } : st()), p({ rows: s.rows.map((h) => [...h]), aligns: [...s.aligns] }), x(null), M(false), le.current = null, A(null), xe(false), We(false), K(null), T(null), O((h) => h + 1), Vn().then((h) => D(h.templates)), Zn().then((h) => Gn(h));
  }, [e]);
  const vn = f.useCallback((t) => {
    u(t.meta), p({ rows: t.grid.rows.map((s) => [...s]), aligns: [...t.grid.aligns ?? []] }), x(null), M(false), le.current = null, A(null);
  }, []), { undo: Be, redo: Ue, canUndo: Cn, canRedo: kn, recordNow: ft } = _o({ enabled: e, historyKey: re, meta: a, grid: d, applySnapshot: vn }), ht = f.useRef(false);
  f.useEffect(() => {
    ht.current && !w && ft(), ht.current = w;
  }, [w, ft]), f.useEffect(() => {
    if (!e) return;
    const t = (s) => {
      if (!(s.metaKey || s.ctrlKey) || s.altKey) return;
      const m = s.key.toLowerCase(), g = m === "z" && !s.shiftKey, v = m === "y" || m === "z" && s.shiftKey;
      !g && !v || (s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation(), v ? Ue() : Be());
    };
    return window.addEventListener("keydown", t, true), () => window.removeEventListener("keydown", t, true);
  }, [e, Ue, Be]), f.useEffect(() => {
    if (!e || typeof window > "u") return;
    const t = window.matchMedia("(orientation: landscape)"), s = () => {
      bn(window.innerWidth), wn(t.matches);
    };
    return s(), window.addEventListener("resize", s), t.addEventListener("change", s), () => {
      window.removeEventListener("resize", s), t.removeEventListener("change", s);
    };
  }, [e]);
  const Se = f.useMemo(() => Jn(a.merges), [a.merges]), X = d.rows.length, U = Math.max(1, ...d.rows.map((t) => t.length), d.aligns.length), J = f.useMemo(() => {
    if (!c) return [];
    const t = [], s = Math.min(c.r0, c.r1), h = Math.min(c.c0, c.c1), m = Math.max(c.r0, c.r1), g = Math.max(c.c0, c.c1);
    for (let v = s; v <= m; v += 1) for (let C = h; C <= g; C += 1) Se.has(`${v},${C}`) || t.push({ r: v, c: C });
    return t;
  }, [c, Se]), q = J[0] ?? null, pt = !!q, gt = f.useRef(z), mt = f.useRef(ae);
  gt.current = z, mt.current = ae;
  const Ke = f.useMemo(() => {
    const t = Pe * 0.95;
    return Math.max(gn, t - Gt - Ne - Wo);
  }, [Pe]), Sn = f.useCallback((t) => {
    const s = gt.current, h = mt.current, m = s + h;
    let g = we(s + t), v = we(m - g);
    g = we(m - v), v = we(m - g), F(g), ct(v);
  }, []), jn = f.useCallback((t) => {
    ct((s) => {
      const h = we(s + t);
      if (z + Ne + h <= Ke) return h;
      const g = Ke - z - Ne;
      return we(g);
    });
  }, [Ke, z]), En = f.useMemo(() => {
    const t = Pe * 0.95;
    if (!Te) return { width: t, maxWidth: "95dvw", height: "95dvh", maxHeight: "95dvh" };
    const s = z + Ne + ae;
    return { width: Math.min(t, Gt + s + Ne + Fo), maxWidth: "95dvw", height: "95dvh", maxHeight: "95dvh" };
  }, [ae, Te, z, Pe]), Mn = f.useMemo(() => q ? a.cells[te(q.r, q.c)] ?? {} : {}, [a.cells, q]), Nn = f.useCallback((t) => {
    J.length && u((s) => {
      const h = { ...s.cells };
      for (const { r: m, c: g } of J) {
        const v = te(m, g);
        Dt(t) ? delete h[v] : h[v] = t;
      }
      return { ...s, cells: h };
    });
  }, [J]), de = f.useCallback((t) => {
    p(t.grid), u(t.meta), x(null), M(false), le.current = null, A(null);
  }, []), Q = f.useRef(d), je = f.useRef(a);
  Q.current = d, je.current = a;
  const xt = f.useCallback((t) => {
    de(co(Q.current, je.current, t));
  }, [de]), bt = f.useCallback((t) => {
    de(uo(Q.current, je.current, t));
  }, [de]), wt = f.useCallback((t) => {
    const s = G.current;
    let h, m;
    if (s) h = Math.min(s.r0, s.r1), m = Math.max(s.r0, s.r1), t != null && (t < h || t > m) && (h = t, m = t);
    else if (t != null) h = t, m = t;
    else {
      const C = H.current;
      (C == null ? void 0 : C.kind) === "row" && C.indices.length && (T(null), W({ kind: "row", indices: [...C.indices] }));
      return;
    }
    const g = [];
    for (let C = h; C <= m; C += 1) g.push(C);
    const v = Q.current.rows.length;
    v <= 1 || g.length === 0 || g.length >= v || (T(null), W({ kind: "row", indices: g }));
  }, []), yt = f.useCallback((t) => {
    const s = G.current;
    let h, m;
    if (s) h = Math.min(s.c0, s.c1), m = Math.max(s.c0, s.c1), t != null && (t < h || t > m) && (h = t, m = t);
    else if (t != null) h = t, m = t;
    else {
      const C = H.current;
      (C == null ? void 0 : C.kind) === "col" && C.indices.length && (T(null), W({ kind: "col", indices: [...C.indices] }));
      return;
    }
    const g = [];
    for (let C = h; C <= m; C += 1) g.push(C);
    const v = Math.max(1, ...Q.current.rows.map((C) => C.length), Q.current.aligns.length, 1);
    v <= 1 || g.length === 0 || g.length >= v || (T(null), W({ kind: "col", indices: g }));
  }, []), vt = f.useCallback((t) => {
    const s = G.current;
    let h, m;
    s ? (h = Math.min(s.r0, s.r1), m = Math.max(s.r0, s.r1), (t < h || t > m) && (h = t, m = t)) : (h = t, m = t);
    const g = [];
    for (let C = h; C <= m; C += 1) g.push(C);
    const v = Q.current.rows.length;
    if (v <= 1 || g.length === 0 || g.length >= v) {
      T(null);
      return;
    }
    T({ kind: "row", indices: g });
  }, []), Ct = f.useCallback((t) => {
    const s = G.current;
    let h, m;
    s ? (h = Math.min(s.c0, s.c1), m = Math.max(s.c0, s.c1), (t < h || t > m) && (h = t, m = t)) : (h = t, m = t);
    const g = [];
    for (let C = h; C <= m; C += 1) g.push(C);
    const v = Math.max(1, ...Q.current.rows.map((C) => C.length), Q.current.aligns.length, 1);
    if (v <= 1 || g.length === 0 || g.length >= v) {
      T(null);
      return;
    }
    T({ kind: "col", indices: g });
  }, []), be = f.useCallback(() => {
    T(null);
  }, []), Rn = f.useCallback(() => {
    P && (P.kind === "row" ? de(po(Q.current, je.current, P.indices)) : de(go(Q.current, je.current, P.indices)), W(null), T(null));
  }, [de, P]), Pn = !!(c && !(c.r0 === c.r1 && c.c0 === c.c1)), Xe = f.useCallback(() => {
    !c || c.r0 === c.r1 && c.c0 === c.c1 || u((t) => ({ ...t, merges: Qn(t.merges, c.r0, c.c0, c.r1, c.c1) }));
  }, [c]), qe = f.useCallback(() => {
    c && u((t) => ({ ...t, merges: er(t.merges, c.r0, c.c0, c.r1, c.c1) }));
  }, [c]), kt = f.useCallback((t) => {
    J.length && u((s) => {
      var _a2;
      const h = { ...s.cells }, m = (_a2 = s.style) == null ? void 0 : _a2.fontSize;
      for (const { r: g, c: v } of J) {
        const C = te(g, v), Y = h[C] ?? {};
        h[C] = { ...Y, fontSize: Jo(Y.fontSize ?? m, t) };
      }
      return { ...s, cells: h };
    });
  }, [J]);
  f.useEffect(() => {
    if (!e) return;
    const t = (s) => {
      if (!(!(s.metaKey || s.ctrlKey) || s.altKey)) {
        if (s.shiftKey) {
          const h = s.code === "Period" || s.key === ">" || s.key === ".", m = s.code === "Comma" || s.key === "<" || s.key === ",";
          if (h || m) {
            if (!J.length) return;
            s.preventDefault(), s.stopPropagation(), kt(h ? 1 : -1);
            return;
          }
        }
        s.code !== "KeyE" && s.key.toLowerCase() !== "e" || (s.preventDefault(), s.stopPropagation(), s.shiftKey ? qe() : Xe());
      }
    };
    return window.addEventListener("keydown", t, true), () => window.removeEventListener("keydown", t, true);
  }, [e, Xe, kt, J.length, qe]);
  const Tn = f.useCallback((t) => {
    var _a2, _b2;
    if (ke.current) {
      A(null);
      return;
    }
    if (E || w) {
      E && A(null);
      return;
    }
    if ((_b2 = (_a2 = t.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, "[data-haim-edge-add], [data-haim-edge-hit]")) return;
    const s = oe.current, h = ue.current;
    if (!s || !h) return;
    const m = Re(s, h, t.clientX, t.clientY, X, U, a.merges);
    A((g) => m ? g && g.kind === m.kind && g.index === m.index ? g.x === m.x && g.y === m.y ? g : { ...g, x: m.x, y: m.y } : m : null);
  }, [U, w, a.merges, E, X]), Dn = f.useCallback((t, s) => {
    var _a2, _b2;
    if (s.index === 0 || ke.current) return;
    t.preventDefault(), t.stopPropagation();
    const h = oe.current;
    if (!h) return;
    const m = s.index - 1;
    let g = 0, v = 0;
    if (s.kind === "col") {
      const b = (_a2 = h.querySelector(`[data-edit-c="${m}"]`)) == null ? void 0 : _a2.getBoundingClientRect();
      if (!b) return;
      g = b.left;
    } else {
      const b = (_b2 = h.rows[m]) == null ? void 0 : _b2.getBoundingClientRect();
      if (!b) return;
      v = b.top;
    }
    _(true), M(false), A(null);
    const C = (fe) => {
      let b = 24;
      s.kind === "col" ? b = fe.clientX - g : b = fe.clientY - v, b = Math.max(24, Math.round(b)), u((V) => s.kind === "col" ? { ...V, colWidths: Lt(V.colWidths, m, b) } : { ...V, rowHeights: Lt(V.rowHeights, m, b) });
    }, Y = () => {
      document.removeEventListener("pointermove", C, true), document.removeEventListener("pointerup", Y, true), document.removeEventListener("pointercancel", Y, true), _(false);
    };
    document.addEventListener("pointermove", C, true), document.addEventListener("pointerup", Y, true), document.addEventListener("pointercancel", Y, true);
  }, []), St = f.useCallback((t, s, h) => {
    p((m) => {
      const g = Math.max(1, ...m.rows.map((Y) => Y.length), m.aligns.length), v = m.rows.map((Y) => [...Y]);
      for (; v.length <= t; ) v.push(Array(g).fill(""));
      const C = [...v[t] ?? Array(g).fill("")];
      for (; C.length < g; ) C.push("");
      return C[s] = h, v[t] = C, { ...m, rows: v };
    });
  }, []), jt = f.useCallback((t, s) => {
    const h = oe.current;
    if (!h) return;
    const m = h.querySelector(`td[data-edit-r="${t}"][data-edit-c="${s}"] input`);
    m && (x({ r0: t, c0: s, r1: t, c1: s }), le.current = { r: t, c: s }, M(false), A(null), requestAnimationFrame(() => {
      m.focus(), m.select();
    }));
  }, []), Ee = f.useCallback((t, s) => {
    x({ r0: t, c0: s, r1: t, c1: s }), le.current = { r: t, c: s }, M(false), A(null);
  }, []), Et = f.useCallback(() => {
    var _a2;
    x(null), M(false), le.current = null;
    const t = document.activeElement;
    ((_a2 = t == null ? void 0 : t.closest) == null ? void 0 : _a2.call(t, "td[data-edit-r]")) && t.blur();
  }, []), Mt = f.useCallback((t, s) => {
    const h = le.current;
    if (!h) {
      Ee(t, s);
      return;
    }
    x({ r0: h.r, c0: h.c, r1: t, c1: s }), M(false), A(null);
  }, [Ee]), Ye = f.useCallback((t, s) => {
    var _a2;
    x({ r0: t, c0: s, r1: t, c1: s }), le.current = { r: t, c: s }, M(true), A(null);
    const h = document.activeElement;
    ((_a2 = h == null ? void 0 : h.closest) == null ? void 0 : _a2.call(h, "td[data-edit-r]")) && h.blur();
  }, []), Ln = f.useCallback((t, s) => {
    Fe.current && x((h) => h && { ...h, r1: t, c1: s });
  }, []);
  f.useEffect(() => {
    if (!E) return;
    const t = () => M(false);
    return window.addEventListener("mouseup", t, true), window.addEventListener("pointerup", t, true), () => {
      window.removeEventListener("mouseup", t, true), window.removeEventListener("pointerup", t, true);
    };
  }, [E]), f.useEffect(() => {
    if (!e) return;
    const t = (g) => {
      var _a2, _b2, _c2;
      const v = g;
      if (!v) return false;
      const C = ((_b2 = (_a2 = v.tagName) == null ? void 0 : _a2.toLowerCase) == null ? void 0 : _b2.call(_a2)) ?? "";
      return C === "input" || C === "textarea" || C === "select" || v.isContentEditable ? true : !!((_c2 = v.closest) == null ? void 0 : _c2.call(v, 'input, textarea, select, [contenteditable="true"]'));
    }, s = (g) => {
      g.code !== "Space" && g.key !== " " || g.repeat || t(g.target) || G.current || (g.preventDefault(), xe(true));
    }, h = (g) => {
      g.code !== "Space" && g.key !== " " || xe(false);
    }, m = () => xe(false);
    return window.addEventListener("keydown", s, true), window.addEventListener("keyup", h, true), window.addEventListener("blur", m), () => {
      window.removeEventListener("keydown", s, true), window.removeEventListener("keyup", h, true), window.removeEventListener("blur", m), xe(false);
    };
  }, [e]), f.useEffect(() => {
    c && xe(false);
  }, [c]);
  const Nt = f.useCallback(() => {
    We(false);
  }, []), An = f.useCallback((t) => {
    const s = De.current;
    if (!s) return;
    const h = t.button === 1, m = t.button === 0 && me && !G.current;
    if (h || m) {
      t.preventDefault(), t.stopPropagation(), A(null), Ae.current = { x: t.clientX, y: t.clientY }, We(true), s.setPointerCapture(t.pointerId);
      return;
    }
  }, [me]), _n = f.useCallback((t) => {
    if (!ce) return;
    const s = De.current;
    if (!s) return;
    const h = t.clientX - Ae.current.x, m = t.clientY - Ae.current.y;
    Ae.current = { x: t.clientX, y: t.clientY }, s.scrollLeft -= h, s.scrollTop -= m;
  }, [ce]), Rt = f.useCallback((t) => {
    if (!ce) return;
    const s = De.current;
    (s == null ? void 0 : s.hasPointerCapture(t.pointerId)) && s.releasePointerCapture(t.pointerId), Nt();
  }, [Nt, ce]), $n = f.useCallback((t) => {
    if (t.button !== 0 || me || ce) return;
    const s = t.target;
    s && (s.closest("[data-haim-table-sidebars]") || s.closest("[data-haim-table-canvas] table, [data-haim-edge-hit], [data-haim-edge-add], [data-haim-insert-preview]") || G.current && Et());
  }, [Et, ce, me]), _e = f.useCallback((t, s, h, m) => {
    let g = t + h, v = s + m;
    for (; g >= 0 && g < X && v >= 0 && v < U; ) {
      if (!Se.has(`${g},${v}`)) {
        jt(g, v);
        return;
      }
      g += h, v += m;
    }
  }, [U, Se, jt, X]), In = f.useCallback((t, s, h) => {
    if (t.nativeEvent.isComposing) return;
    if (t.key === "Enter") {
      t.preventDefault(), t.stopPropagation(), t.shiftKey ? _e(s, h, -1, 0) : _e(s, h, 1, 0);
      return;
    }
    if (!t.altKey) return;
    let m = 0, g = 0;
    if (t.key === "ArrowUp") m = -1;
    else if (t.key === "ArrowDown") m = 1;
    else if (t.key === "ArrowLeft") g = -1;
    else if (t.key === "ArrowRight") g = 1;
    else return;
    t.preventDefault(), t.stopPropagation(), _e(s, h, m, g);
  }, [_e]), zn = f.useMemo(() => {
    var _a2;
    return q ? ((_a2 = d.rows[q.r]) == null ? void 0 : _a2[q.c]) ?? "" : "";
  }, [d.rows, q]), Pt = f.useMemo(() => a.templateId ? k.find((t) => t.id === a.templateId) ?? null : null, [a.templateId, k]), Hn = f.useCallback((t, s) => {
    const h = Hr({ row: t, col: s, rowCount: X, colCount: U, meta: a, template: Pt }), m = {};
    return h.bg && (m.backgroundColor = h.bg), h.color && (m.color = h.color), h.fontFamily && (m.fontFamily = h.fontFamily), h.fontSize && (m.fontSize = h.fontSize), h.fontWeight && (m.fontWeight = h.fontWeight), m;
  }, [Pt, U, a, X]), Tt = (t, s) => {
    if (!c) return false;
    const h = Math.min(c.r0, c.r1), m = Math.min(c.c0, c.c1), g = Math.max(c.r0, c.r1), v = Math.max(c.c0, c.c1);
    return t >= h && t <= g && s >= m && s <= v;
  }, On = (t) => t === "thead" ? o.jsx(Je, { className: L, "aria-hidden": true }) : t === "tfoot" ? o.jsx(_t, { className: L, "aria-hidden": true }) : o.jsx($t, { className: L, "aria-hidden": true });
  return o.jsxs(o.Fragment, { children: [o.jsxs(tr, { isOpen: e, onClose: () => {
    if (P !== null) {
      W(null);
      return;
    }
    l();
  }, overlayClassName: "p-[2.5dvh]", contentClassName: "h-[95dvh] max-h-[95dvh] max-w-[95dvw]", contentStyle: En, resizeHeight: true, children: [o.jsxs(jr, { className: "flex h-full min-h-0 flex-col", onSubmit: (t) => t.preventDefault(), onPointerDownCapture: $n, children: [o.jsxs("header", { className: "flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-3 py-2 dark:border-odp-border", children: [o.jsxs("h2", { className: "inline-flex items-center gap-1.5 text-sm font-bold text-gray-800 dark:text-odp-fgStrong", children: [o.jsx(He, { className: Io, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1"] }), o.jsxs("div", { className: "flex items-center gap-2", children: [o.jsxs("button", { type: "button", disabled: !Cn, title: `\uC2E4\uD589 \uCDE8\uC18C (${rt})`, "aria-label": `\uC2E4\uD589 \uCDE8\uC18C (${rt})`, onClick: () => Be(), className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(ir, { className: L, "aria-hidden": true }), "\uC2E4\uD589 \uCDE8\uC18C"] }), o.jsxs("button", { type: "button", disabled: !kn, title: `\uB2E4\uC2DC \uC2E4\uD589 (${ot})`, "aria-label": `\uB2E4\uC2DC \uC2E4\uD589 (${ot})`, onClick: () => Ue(), className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(cr, { className: L, "aria-hidden": true }), "\uB2E4\uC2DC \uC2E4\uD589"] }), o.jsxs("button", { type: "button", onClick: l, className: "inline-flex items-center gap-1 rounded px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(ur, { className: L, "aria-hidden": true }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: () => i(a, d), className: "inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700", children: [o.jsx(dr, { className: L, "aria-hidden": true }), "\uC801\uC6A9"] })] })] }), o.jsxs("div", { className: "flex min-h-0 flex-1 flex-col landscape:flex-row", children: [o.jsxs("div", { "data-haim-table-sidebars": "", className: "order-2 flex max-h-[42%] min-h-0 w-full shrink-0 flex-col gap-2 overflow-hidden border-t border-gray-100 bg-gray-50/80 p-2 dark:border-odp-border dark:bg-odp-bgSoft/40 portrait:max-h-[42%] landscape:order-1 landscape:max-h-none landscape:w-auto landscape:flex-row landscape:gap-0 landscape:border-t-0 landscape:border-r-0", children: [o.jsxs("aside", { className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-surface landscape:flex-none landscape:shrink-0", style: Te ? { width: z } : void 0, children: [o.jsx("div", { className: "sticky top-0 z-[1] border-b border-gray-100 bg-white px-2.5 py-1.5 dark:border-odp-border dark:bg-odp-surface", children: o.jsxs("h3", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong", children: [o.jsx(He, { className: L, "aria-hidden": true }), "\uD45C \xB7 \uADF8\uB8F9"] }) }), o.jsxs("div", { className: "space-y-2 p-2.5", children: [o.jsxs("div", { className: "flex flex-wrap gap-2", children: [o.jsxs(ie, { name: "template", className: "flex min-w-0 flex-1 flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(he, { asChild: true, children: o.jsx("span", { children: o.jsx(pe, { icon: o.jsx(At, { className: L }), children: "\uD15C\uD50C\uB9BF" }) }) }), o.jsx(Ve, { "aria-label": "\uD45C \uD15C\uD50C\uB9BF", value: a.templateId ?? nt, onValueChange: (t) => {
    if (t === nt) {
      u((h) => {
        const m = { ...h };
        return delete m.templateId, m;
      });
      return;
    }
    const s = k.find((h) => h.id === t);
    s && u((h) => Or(h, s));
  }, options: [{ value: nt, label: "\uD15C\uD50C\uB9BF \uC5C6\uC74C" }, ...k.map((t) => ({ value: t.id, label: t.name }))], className: "w-full min-w-0" })] }), o.jsxs("button", { type: "button", className: "mt-auto inline-flex h-8 items-center gap-1 self-end rounded-md bg-gray-100 px-2 text-[11px] dark:bg-odp-bgSoft", onClick: () => {
    I({ id: `template-${Date.now().toString(36)}`, name: "\uC0C8 \uD15C\uD50C\uB9BF", sections: {}, rules: [] }), B(true);
  }, children: [o.jsx(At, { className: L, "aria-hidden": true }), "\uAD00\uB9AC"] })] }), o.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [o.jsxs(ie, { name: "noHeader", className: "col-span-2 flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(he, { asChild: true, children: o.jsx("span", { children: o.jsx(pe, { icon: o.jsx(Je, { className: L }), children: "noHeader" }) }) }), o.jsxs("label", { className: "flex cursor-pointer items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-2 py-1.5 dark:border-odp-borderSoft dark:bg-odp-surface", children: [o.jsx("span", { className: "min-w-0 text-[11px] leading-snug text-gray-600 dark:text-odp-muted", children: "thead/th \uC5C6\uC774 \uBAA8\uB450 tbody/td" }), o.jsx(Er, { className: zo(!!a.noHeader), checked: !!a.noHeader, onCheckedChange: (t) => u((s) => {
    if (t) return { ...s, noHeader: true };
    const { noHeader: h, ...m } = s;
    return m;
  }), "aria-label": "noHeader", children: o.jsx(Mr, { className: Ho }) })] })] }), o.jsxs(ie, { name: "headerRows", className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${a.noHeader ? "opacity-40" : ""}`, children: [o.jsx(he, { asChild: true, children: o.jsx("span", { children: o.jsx(pe, { icon: o.jsx(Je, { className: L }), children: "headerRows" }) }) }), o.jsx($e, { asChild: true, children: o.jsx("input", { type: "number", min: 0, max: X, value: a.headerRows, disabled: !!a.noHeader, onChange: (t) => u((s) => ({ ...s, headerRows: Math.max(0, Number(t.target.value) || 0) })), className: Ze }) })] }), o.jsxs(ie, { name: "footerRows", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(he, { asChild: true, children: o.jsx("span", { children: o.jsx(pe, { icon: o.jsx(_t, { className: L }), children: "footerRows" }) }) }), o.jsx($e, { asChild: true, children: o.jsx("input", { type: "number", min: 0, max: X, value: a.footerRows, onChange: (t) => u((s) => ({ ...s, footerRows: Math.max(0, Number(t.target.value) || 0) })), className: Ze }) })] }), o.jsxs(ie, { name: "width", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(he, { asChild: true, children: o.jsx("span", { children: o.jsx(pe, { icon: o.jsx(fr, { className: L }), children: "\uB108\uBE44" }) }) }), o.jsx(Ve, { "aria-label": "\uD45C \uB108\uBE44", value: a.width, onValueChange: (t) => u((s) => ({ ...s, width: t === "fit" ? "fit" : "full" })), options: [...Bo], className: "w-full" })] }), o.jsxs(ie, { name: "align", className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${a.width !== "fit" ? "opacity-40" : ""}`, children: [o.jsx(he, { asChild: true, children: o.jsx("span", { children: o.jsx(pe, { icon: a.align === "right" ? o.jsx(hr, { className: L }) : o.jsx(pr, { className: L }), children: "\uC815\uB82C" }) }) }), o.jsx(Ve, { "aria-label": "\uD45C \uC815\uB82C", value: a.align, disabled: a.width !== "fit", onValueChange: (t) => u((s) => ({ ...s, align: t === "right" ? "right" : "left" })), options: [...Uo], className: "w-full" })] })] }), o.jsxs("div", { className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border", children: [o.jsx("p", { className: "text-[10px] font-medium text-gray-600 dark:text-odp-muted", children: "\uD45C \uAE30\uBCF8 \uD3F0\uD2B8\xB7\uC2A4\uD0C0\uC77C" }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: "\uC140\xB7\uADF8\uB8F9 \uAC12\uC774 \uC788\uC73C\uBA74 \uADF8\uCABD\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4." }), o.jsx(Qe, { compact: true, idPrefix: "table-edit-table", value: a.style ?? {}, onChange: (t) => u((s) => ({ ...s, style: Dt(t) ? {} : t })) })] }), o.jsxs("div", { className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border", children: [o.jsxs("p", { className: "inline-flex items-center gap-1 text-[10px] font-medium text-gray-600 dark:text-odp-muted", children: [o.jsx($t, { className: L, "aria-hidden": true }), "\uADF8\uB8F9 \uC2A4\uD0C0\uC77C"] }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: "thead / tbody / tfoot \uAD6C\uC5ED" }), o.jsx("div", { className: "mb-1 flex flex-wrap gap-1", children: $o.map((t) => o.jsxs("button", { type: "button", onClick: () => y(t), className: `inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] ${S === t ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-odp-bgSoft"}`, children: [On(t), t] }, t)) }), o.jsx(Qe, { compact: true, idPrefix: `table-edit-${S}`, value: a.sections[S] ?? {}, onChange: (t) => u((s) => ({ ...s, sections: { ...s.sections, [S]: t } })) })] })] })] }), o.jsx(Qt, { ariaLabel: "\uD45C \uC0AC\uC774\uB4DC\uBC14\uC640 \uC140 \uC0AC\uC774\uB4DC\uBC14 \uC0AC\uC774 \uB108\uBE44 \uC870\uC808", onDelta: Sn }), o.jsx("aside", { "aria-hidden": !pt, className: `flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-blue-200 bg-white dark:border-blue-900/50 dark:bg-odp-surface landscape:flex-none landscape:shrink-0 ${pt ? "" : "pointer-events-none portrait:hidden landscape:invisible"}`, style: Te ? { width: ae } : void 0, children: q ? o.jsxs(o.Fragment, { children: [o.jsx("div", { className: "sticky top-0 z-[1] border-b border-blue-100 bg-white px-2.5 py-1.5 dark:border-blue-900/40 dark:bg-odp-surface", children: o.jsxs("h3", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong", children: [o.jsx(gr, { className: L, "aria-hidden": true }), "\uC140", o.jsxs("span", { className: "font-normal text-gray-400 dark:text-odp-muted", children: ["(", q.r + 1, "\uD589 ", q.c + 1, "\uC5F4", J.length > 1 ? ` \xB7 ${J.length}\uCE78` : "", ")"] })] }) }), o.jsxs("div", { className: "space-y-2 p-2.5", children: [o.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [o.jsxs("button", { type: "button", disabled: !Pn, title: `\uBCD1\uD569 (${qo})`, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft", onClick: Xe, children: [o.jsx(mr, { className: L, "aria-hidden": true }), "\uBCD1\uD569"] }), o.jsxs("button", { type: "button", disabled: !c, title: `\uBCD1\uD569 \uD574\uC81C (${Yo})`, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft", onClick: qe, children: [o.jsx(xr, { className: L, "aria-hidden": true }), "\uBCD1\uD569 \uD574\uC81C"] })] }), o.jsxs("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: ["\uAE00\uC790 \uD06C\uAE30: ", Vo, " / ", Zo] }), o.jsxs(ie, { name: "cell-text", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(he, { asChild: true, children: o.jsx("span", { children: o.jsx(pe, { icon: o.jsx(br, { className: L }), children: "\uC140 \uD14D\uC2A4\uD2B8" }) }) }), o.jsx($e, { asChild: true, children: o.jsx("input", { type: "text", value: zn, onChange: (t) => St(q.r, q.c, t.target.value), placeholder: "\uC140 \uB0B4\uC6A9 \uC785\uB825", className: nr }) })] }), o.jsx(Qe, { compact: true, idPrefix: "table-edit-cell", value: Mn, onChange: Nn })] })] }) : null }), o.jsx(Qt, { ariaLabel: "\uC0AC\uC774\uB4DC\uBC14\uC640 \uD45C \uC0AC\uC774 \uB108\uBE44 \uC870\uC808", onDelta: jn })] }), o.jsxs("div", { ref: De, "data-haim-table-canvas": "", className: `order-1 flex min-h-0 min-w-0 flex-1 flex-col overflow-auto border-t border-gray-100 p-3 landscape:order-2 landscape:border-t-0 landscape:border-l dark:border-odp-border ${ce ? "cursor-grabbing select-none" : me && !c ? "cursor-grab select-none" : ""}`, onMouseLeave: () => {
    w || A(null);
  }, onPointerDown: An, onPointerMove: _n, onPointerUp: Rt, onPointerCancel: Rt, onAuxClick: (t) => {
    t.button === 1 && t.preventDefault();
  }, children: [o.jsxs("p", { className: "mb-2 inline-flex shrink-0 items-center gap-1 text-[10px] text-gray-400", children: [o.jsx(wr, { className: L, "aria-hidden": true }), "\uB354\uBE14\uD074\uB9AD \uB4DC\uB798\uADF8\xB7Shift+\uD074\uB9AD: \uBC94\uC704 \uC120\uD0DD \xB7 \uC6B0\uD074\uB9AD: \uD589/\uC5F4 \uC0AD\uC81C \xB7 \uD720\uD074\uB9AD/\uC2A4\uD398\uC774\uC2A4+\uB4DC\uB798\uADF8: \uD328\uB2DD \xB7 ", rt, "/", ot, ": \uC2E4\uD589 \uCDE8\uC18C/\uB2E4\uC2DC \uC2E4\uD589 \xB7 \uD14C\uB450\uB9AC \uB354\uBE14\uD074\uB9AD: \uD589\xB7\uC5F4 \uCD94\uAC00"] }), o.jsx("div", { ref: ue, className: "relative inline-block min-w-full p-5", "data-haim-inserting": (j == null ? void 0 : j.kind) ?? void 0, onMouseMove: Tn, onMouseLeave: () => {
    w || A(null);
  }, children: o.jsxs(Nr, { delayDuration: 0, skipDelayDuration: 0, children: [o.jsxs("table", { ref: oe, className: `border-collapse text-sm ${((_a = a.colWidths) == null ? void 0 : _a.some((t) => t && t.trim())) ? "w-max max-w-full" : "w-full"}`, style: { tableLayout: ((_b = a.colWidths) == null ? void 0 : _b.some((t) => t && t.trim())) || ((_c = a.rowHeights) == null ? void 0 : _c.some((t) => t && t.trim())) ? "fixed" : void 0, ...((_d = a.style) == null ? void 0 : _d.fontFamily) ? { fontFamily: a.style.fontFamily } : {}, ...((_e2 = a.style) == null ? void 0 : _e2.fontSize) ? { fontSize: a.style.fontSize } : {}, ...((_f = a.style) == null ? void 0 : _f.fontWeight) ? { fontWeight: a.style.fontWeight } : {} }, children: [o.jsx("colgroup", { children: Array.from({ length: U }, (t, s) => {
    const h = Ge(a.colWidths, s);
    return o.jsx("col", { style: h ? { width: h } : void 0 }, s);
  }) }), o.jsx("tbody", { children: d.rows.map((t, s) => {
    const h = Ge(a.rowHeights, s);
    return o.jsx("tr", { style: h ? { height: h } : void 0, children: Array.from({ length: U }, (m, g) => {
      if (Se.has(`${s},${g}`)) return null;
      const v = rr(a.merges, s, g), C = Tt(s, g), Y = Ge(a.colWidths, g), fe = o.jsx("td", { "data-edit-r": s, "data-edit-c": g, colSpan: v == null ? void 0 : v.colspan, rowSpan: v == null ? void 0 : v.rowspan, className: `min-h-11 cursor-pointer border-2 border-gray-300 p-0 transition-[box-shadow,outline-color] dark:border-odp-borderStrong ${Y ? "" : "min-w-28"} ${C ? "relative z-[1] outline outline-2 outline-offset-[-2px] outline-blue-500 ring-0" : "hover:relative hover:z-[1] hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-blue-400/70"}`, onContextMenu: () => {
        Tt(s, g) || Ee(s, g), N && (K({ r: s, c: g }), A(null));
      }, onMouseDown: (b) => {
        var _a2, _b2;
        if (b.button === 1 || b.button !== 0 || ke.current || Le.current && !G.current) return;
        if ((_b2 = (_a2 = b.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, "[data-haim-edge-hit], [data-haim-edge-add]")) {
          b.preventDefault();
          return;
        }
        {
          const ee = oe.current, Me = ue.current;
          if (ee && Me && Re(ee, Me, b.clientX, b.clientY, X, U, a.merges)) {
            b.preventDefault();
            return;
          }
        }
        if (b.shiftKey) {
          b.preventDefault(), Mt(s, g);
          return;
        }
        if (b.detail >= 2) {
          b.preventDefault(), Ye(s, g);
          return;
        }
        Ee(s, g);
      }, onDoubleClick: (b) => {
        const V = oe.current, ee = ue.current;
        if (V && ee && Re(V, ee, b.clientX, b.clientY, X, U, a.merges)) {
          b.preventDefault(), b.stopPropagation();
          return;
        }
        b.preventDefault(), Ye(s, g);
      }, onMouseEnter: () => {
        Ln(s, g);
      }, children: o.jsx(ie, { name: `cell-${s}-${g}`, className: "contents", children: o.jsx($e, { asChild: true, children: o.jsx("input", { type: "text", value: t[g] ?? "", onChange: (b) => St(s, g, b.target.value), onKeyDown: (b) => In(b, s, g), onMouseDown: (b) => {
        var _a2, _b2;
        if (b.button !== 1 && b.button === 0 && !ke.current && !(Le.current && !G.current)) {
          if ((_b2 = (_a2 = b.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b2.call(_a2, "[data-haim-edge-hit], [data-haim-edge-add]")) {
            b.preventDefault(), b.stopPropagation();
            return;
          }
          {
            const V = oe.current, ee = ue.current;
            if (V && ee && Re(V, ee, b.clientX, b.clientY, X, U, a.merges)) {
              b.preventDefault(), b.stopPropagation();
              return;
            }
          }
          if (b.shiftKey) {
            b.preventDefault(), b.stopPropagation(), Mt(s, g);
            return;
          }
          if (b.detail >= 2) {
            b.preventDefault();
            return;
          }
          b.stopPropagation();
        }
      }, onDoubleClick: (b) => {
        const V = oe.current, ee = ue.current;
        if (V && ee && Re(V, ee, b.clientX, b.clientY, X, U, a.merges)) {
          b.preventDefault(), b.stopPropagation();
          return;
        }
        b.preventDefault(), b.stopPropagation(), Ye(s, g);
      }, onFocus: () => {
        Fe.current || Le.current && !G.current || Ee(s, g);
      }, className: `${Ze} h-full min-h-11 w-full cursor-pointer border-transparent bg-transparent px-2 text-sm focus:cursor-text focus:border-gray-300 focus:bg-white/90 dark:focus:bg-odp-bgSoft/90 ${Y ? "" : "min-w-28"}`, style: { ...Hn(s, g), ...h ? { height: h } : {} } }) }) }) }, g);
      return N ? fe : o.jsxs(Rr, { onOpenChange: (b) => {
        K(b ? { r: s, c: g } : null), b ? A(null) : be();
      }, children: [o.jsx(Pr, { asChild: true, children: fe }), o.jsx(Tr, { children: o.jsxs(Dr, { className: Xo, onCloseAutoFocus: (b) => b.preventDefault(), children: [o.jsxs(zt, { className: Jt, disabled: X <= 1, onPointerEnter: () => vt(s), onPointerLeave: be, onFocus: () => vt(s), onBlur: be, onSelect: () => {
        wt(s);
      }, children: [o.jsx(ye, { className: L, "aria-hidden": true }), "\uD589 \uC0AD\uC81C"] }), o.jsxs(zt, { className: Jt, disabled: U <= 1, onPointerEnter: () => Ct(g), onPointerLeave: be, onFocus: () => Ct(g), onBlur: be, onSelect: () => {
        yt(g);
      }, children: [o.jsx(ye, { className: L, "aria-hidden": true }), "\uC5F4 \uC0AD\uC81C"] })] }) })] }, g);
    }) }, s);
  }) })] }), Z ? o.jsx(os, { kind: Z.kind, indices: Z.indices, table: oe.current, wrap: ue.current, colCount: U }) : null, N && ne ? o.jsxs(dn, { open: se, onOpenChange: (t) => {
    t || (K(null), be());
  }, title: `${ne.r + 1}\uD589 ${ne.c + 1}\uC5F4`, subtitle: "\uD45C \uD3B8\uC9D1 \uC140", children: [o.jsxs("button", { type: "button", className: at, disabled: X <= 1, onClick: () => {
    wt(ne.r), K(null);
  }, children: [o.jsx(ye, { className: L, "aria-hidden": true }), "\uD589 \uC0AD\uC81C"] }), o.jsxs("button", { type: "button", className: at, disabled: U <= 1, onClick: () => {
    yt(ne.c), K(null);
  }, children: [o.jsx(ye, { className: L, "aria-hidden": true }), "\uC5F4 \uC0AD\uC81C"] })] }) : null, j && !se ? o.jsxs(o.Fragment, { children: [o.jsx(rs, { insert: j }, `preview-${j.kind}-${j.index}`), o.jsx(ns, { insert: j, allowResize: j.index !== 0, tip: j.index === 0 ? j.label : `${j.label} \xB7 ${en(j.kind)}`, onDoubleClickInsert: () => {
    const { kind: t, index: s } = j;
    t === "row" ? xt(s) : bt(s);
  }, onResizePointerDown: (t) => Dn(t, j) }, `hit-${j.kind}-${j.index}`), o.jsx(ts, { tip: j.index === 0 ? j.label : `${j.label} \xB7 ${en(j.kind)}`, onDoubleClick: () => {
    const { kind: t, index: s } = j;
    t === "row" ? xt(s) : bt(s);
  }, style: { left: j.x, top: j.y } }, `btn-${j.kind}-${j.index}`)] }) : null] }) })] })] })] }), o.jsx(zr, { isOpen: R, template: $, onClose: () => {
    B(false), I(null);
  }, onSave: (t) => {
    const h = [...sr().templates.filter((m) => m.id !== ($ == null ? void 0 : $.id) && m.id !== t.id), t];
    or({ templates: h }).then((m) => {
      D(m.templates), B(false), I(null);
    });
  } })] }), typeof document < "u" ? on.createPortal(o.jsx("div", { className: "relative z-[100060]", children: o.jsx(fn, { isOpen: P !== null, variant: "danger", title: (P == null ? void 0 : P.kind) === "col" ? "\uC5F4 \uC0AD\uC81C" : "\uD589 \uC0AD\uC81C", message: (P == null ? void 0 : P.kind) === "col" ? P.indices.length > 1 ? `\uC120\uD0DD\uD55C ${P.indices.length}\uAC1C \uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(P.indices[0] ?? 0) + 1}\uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : P ? P.indices.length > 1 ? `\uC120\uD0DD\uD55C ${P.indices.length}\uAC1C \uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(P.indices[0] ?? 0) + 1}\uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : "", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", onConfirm: Rn, onCancel: () => W(null) }) }), document.body) : null] });
}
export {
  ws as C,
  ys as H,
  vs as P,
  Cs as T,
  xs as a,
  yo as b,
  Ur as c,
  Yr as d,
  qr as e,
  Kr as f,
  Fr as g,
  gs as h,
  Vr as i,
  ko as j,
  jo as k,
  it as l,
  bs as n,
  Zr as r,
  Mo as s,
  pn as u,
  Ft as v,
  ms as w
};
