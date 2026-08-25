var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as a, j as o, u as qo, a as Xo, c as Js } from "./vendor-react-SY5QCjFA.js";
import { p as Qs, C as wr, q as Yo, E as _t, S as Go, D as Tr, W as ei, r as Zo, u as zt, w as mt, x as Jo, y as yr, V as Qo, z as es, A as Ke, F as ti, B as ni, l as ri, G as oi, I as si, T as Tn, J as Pr, L as ii, O as ai, P as li, Q as ci, i as ts, v as ui, R as di, U as fi, K as mi, X as pi, Y as hi, Z as gi, f as xi, d as bi, $ as wi, c as yi, a as vi, a0 as ki, a1 as Ei, a2 as Si, a3 as Ci, a4 as Ni, a5 as Mi, a6 as ji, a7 as Li, a8 as Ti, a9 as Pi, aa as Ri, ab as Ai } from "./vendor-md-editor-CyUZNHY0.js";
import { i as yt, j as or, k as Di, l as Ii, a as _i, s as $i, m as Fi, o as Tt, h as Hi, P as Oi, H as Bi, p as Pn, q as Rr, t as Ar, v as Dr, x as zi, y as Ir, z as rt, A as Rn, B as An } from "./previewFootnoteScroll-CLhWj4s8.js";
import { dt as Ki, f3 as ns, f4 as yn, f5 as Ve, f6 as rs, f7 as Vi, f8 as Wi, d$ as _r, f9 as Ui, fa as $r, e1 as Dn, e3 as qi, fb as Fr, fc as Hr, e2 as Xi, fd as Or, fe as Yi, ff as Gi, fg as Zi, cW as os, fh as ss, fi as Br, fj as Ji, M as Kt, fk as Qi, fl as zr, ac as Kr, fm as ea, fn as ta, fo as na, fp as Vr, fq as is, fr as ra, fs as oa, ft as sa, fu as ia, fv as aa, fw as as, fx as pn, _ as ls, dM as la, dH as ca, fy as ua, du as da, fz as Wr, fA as fa, fB as ma, dz as pa, fC as In, fD as ha, fE as _n, fF as ga, dA as $n, dy as xa, T as cs, X as sr, dO as ba, as as hn, fG as Ur, dN as wa, fH as ya, a3 as va, fI as ka, U as Ea, fJ as Sa, fK as ir, fL as Ca, cx as vr, cw as kr, fM as Na, fN as Ma, fO as ja, cH as La, bV as Ta, di as Pa, cC as us, u as Ra, cV as Aa, N as ds, fP as Da, fQ as Ia, fR as qr, fS as _a, fT as $a, au as Fa, cS as Ha, dh as rn, d2 as Xr, d4 as Fn, d5 as Hn, d6 as Oa, d7 as Yr, d8 as Ba, d9 as za, da as Ka, db as Va, dc as Wa, fU as Ua, fV as qa, av as Xa, Q as Ya, fW as Ga, dk as Za, dl as Ja, dm as Qa, fX as el, fY as tl, fZ as nl, f_ as rl, ex as ol } from "./index-C76l_n0j.js";
import { g as sl, i as il, a as al } from "./OpenAiCompatibleModelSelect-DzGKLezo.js";
import { T as ll, c as cl } from "./clipboardImageFiles-DvQLZnpy.js";
import { u as ul, p as On, L as Pt, a as dl, i as fl, g as ml, b as pl, c as hl } from "./LlmAssistPanel-cw7HQbfY.js";
import { L as gl, n as xl } from "./llmAssistImages-Ca7ILDRO.js";
import { a8 as ar, b8 as fs, B as bl, b9 as wl, X as Vt, ba as yl, bb as Gr, bc as Bn, ad as zn, bd as vl, t as kl, be as Er, bf as El, a as ms, aq as Sl, J as Cl, bg as Nl, bh as Ml, C as vn, bi as jl, bj as Ll, a9 as ps, aa as Tl, h as Pl, bk as gn, U as Rl, a$ as Al, b7 as Zr, bl as Kn, bm as Jr, bn as Dl, aY as Il, aW as _l, bo as Qr, bp as $l, bq as Fl, br as Hl, bs as Ol, T as vt, W as Bl, v as zl } from "./vendor-lucide-BWX_GyjE.js";
import { b as hs, G as Vn, H as Wn, p as Kl, q as Vl, r as Wl, s as Ul, t as ql, v as Xl, w as Yl, x as Gl, y as Zl, z as Jl, K as Sr, M as Cr, d as lr, T as cr, e as ur, f as dr, A as fr, B as Ql, F as ot, L as ut, E as on, l as ec, m as tc, n as nc, o as rc, I as eo, a0 as oc, a1 as sc, a2 as ic, a3 as ac, a4 as to } from "./vendor-radix-Do7C1uSR.js";
import { M as lc } from "./MdEditorToolbarTooltips-DhAcDm1s.js";
import { N as cc, u as uc, W as dc } from "./useTocTitleWrap-bRVbd8fz.js";
import { u as fc, M as mc } from "./useLazyMermaidRender-DtZWyS3-.js";
import { H as Un, T as pc } from "./TableStyleTemplateEditor-Dd-sSAFY.js";
import { b as kn } from "./vendor-motion-YU7ZxHqi.js";
import { u as hc } from "./useWikiImageHydration-CThtbr2f.js";
import "./vendor-aws-BNw5jQBi.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-google-genai-Dw3BcYJd.js";
import "./vendor-image-crop-Loz3ogoo.js";
import "./storageImageHydration-ZG1lQeNF.js";
import "./index-CG4BSG42.js";
function gs(e, t, n) {
  const r = Ki(e);
  if (!r.length) return null;
  const i = [...n.querySelectorAll("table")], s = i.indexOf(t);
  let l = s >= 0 ? r[s] : void 0;
  if (!l) {
    const p = i.filter((m) => m.getAttribute("data-haim-table") === "1").indexOf(t);
    p >= 0 && (l = r.filter((h) => h.meta != null)[p]);
  }
  return !l && r.length === 1 && (l = r[0]), l ?? null;
}
function gc(e, t) {
  const n = {};
  for (const [r, i] of Object.entries(e)) {
    const s = yn(r);
    if (!s) continue;
    const l = s.r >= t ? s.r + 1 : s.r;
    n[Ve(l, s.c)] = i;
  }
  return n;
}
function xc(e, t) {
  const n = {};
  for (const [r, i] of Object.entries(e)) {
    const s = yn(r);
    if (!s) continue;
    const l = s.c >= t ? s.c + 1 : s.c;
    n[Ve(s.r, l)] = i;
  }
  return n;
}
function bc(e, t) {
  const n = {};
  for (const [r, i] of Object.entries(e)) {
    const s = yn(r);
    if (!s || s.r === t) continue;
    const l = s.r > t ? s.r - 1 : s.r;
    n[Ve(l, s.c)] = i;
  }
  return n;
}
function wc(e, t) {
  const n = {};
  for (const [r, i] of Object.entries(e)) {
    const s = yn(r);
    if (!s || s.c === t) continue;
    const l = s.c > t ? s.c - 1 : s.c;
    n[Ve(s.r, l)] = i;
  }
  return n;
}
function yc(e, t) {
  return e.map((n) => n.r >= t ? { ...n, r: n.r + 1 } : n.r + n.rowspan > t ? { ...n, rowspan: n.rowspan + 1 } : n);
}
function vc(e, t) {
  return e.map((n) => n.c >= t ? { ...n, c: n.c + 1 } : n.c + n.colspan > t ? { ...n, colspan: n.colspan + 1 } : n);
}
function kt(e) {
  return e.rowspan < 1 || e.colspan < 1 || e.rowspan === 1 && e.colspan === 1 ? null : e;
}
function kc(e, t) {
  const n = [];
  for (const r of e) {
    if (r.r > t) {
      const i = kt({ ...r, r: r.r - 1 });
      i && n.push(i);
      continue;
    }
    if (r.r === t) {
      if (r.rowspan <= 1) continue;
      const i = kt({ ...r, rowspan: r.rowspan - 1 });
      i && n.push(i);
      continue;
    }
    if (r.r < t && r.r + r.rowspan > t) {
      const i = kt({ ...r, rowspan: r.rowspan - 1 });
      i && n.push(i);
      continue;
    }
    n.push(r);
  }
  return n;
}
function Ec(e, t) {
  const n = [];
  for (const r of e) {
    if (r.c > t) {
      const i = kt({ ...r, c: r.c - 1 });
      i && n.push(i);
      continue;
    }
    if (r.c === t) {
      if (r.colspan <= 1) continue;
      const i = kt({ ...r, colspan: r.colspan - 1 });
      i && n.push(i);
      continue;
    }
    if (r.c < t && r.c + r.colspan > t) {
      const i = kt({ ...r, colspan: r.colspan - 1 });
      i && n.push(i);
      continue;
    }
    n.push(r);
  }
  return n;
}
function Sc(e, t, n) {
  const r = t.merges.filter((u) => u.r === n && u.rowspan > 1);
  if (r.length === 0) return { grid: e, meta: t };
  const i = e.rows.map((u) => [...u]), s = { ...t.cells }, l = n + 1;
  for (const u of r) {
    const p = i[n], m = i[l];
    if (!p || !m) continue;
    for (; m.length <= u.c; ) m.push("");
    for (; p.length <= u.c; ) p.push("");
    const h = p[u.c] ?? "";
    h && (m[u.c] = h, p[u.c] = "");
    const P = Ve(n, u.c), C = Ve(l, u.c), R = s[P];
    R && (s[C] = { ...R }, delete s[P]);
  }
  return { grid: { rows: i, aligns: [...e.aligns] }, meta: { ...t, cells: s } };
}
function Cc(e, t, n) {
  const r = t.merges.filter((l) => l.c === n && l.colspan > 1);
  if (r.length === 0) return { grid: e, meta: t };
  const i = e.rows.map((l) => [...l]), s = { ...t.cells };
  for (const l of r) {
    const u = i[l.r];
    if (!u) continue;
    for (; u.length <= l.c + 1; ) u.push("");
    const p = u[l.c] ?? "";
    p && (u[l.c + 1] = p, u[l.c] = "");
    const m = Ve(l.r, n), h = Ve(l.r, n + 1), P = s[m];
    P && (s[h] = { ...P }, delete s[m]);
  }
  return { grid: { rows: i, aligns: [...e.aligns] }, meta: { ...t, cells: s } };
}
function Nc(e, t, n) {
  const r = Math.max(1, ...e.rows.map((h) => h.length), e.aligns.length, 1), i = e.rows.length, s = Math.max(0, Math.min(n, i)), l = Array.from({ length: r }, () => ""), u = [...e.rows.slice(0, s), l, ...e.rows.slice(s)];
  let p = t.headerRows, m = t.footerRows;
  return s < p ? p += 1 : m > 0 && s >= i - m && (m += 1), { grid: { rows: u, aligns: [...e.aligns] }, meta: (() => {
    var _a2;
    const h = { ...t, headerRows: p, footerRows: m, merges: yc(t.merges, s), cells: gc(t.cells, s) };
    if ((_a2 = t.rowHeights) == null ? void 0 : _a2.length) {
      const P = ns(t.rowHeights, s);
      P && (h.rowHeights = P);
    }
    return h;
  })() };
}
function Mc(e, t, n) {
  const r = Math.max(1, ...e.rows.map((u) => u.length), e.aligns.length, 1), i = Math.max(0, Math.min(n, r)), s = e.rows.map((u) => {
    const p = [...u];
    for (; p.length < r; ) p.push("");
    return p.splice(i, 0, ""), p;
  });
  s.length === 0 && s.push(Array.from({ length: r + 1 }, () => ""));
  const l = [...e.aligns];
  for (; l.length < r; ) l.push(null);
  return l.splice(i, 0, null), { grid: { rows: s, aligns: l }, meta: (() => {
    var _a2;
    const u = { ...t, merges: vc(t.merges, i), cells: xc(t.cells, i) };
    if ((_a2 = t.colWidths) == null ? void 0 : _a2.length) {
      const p = ns(t.colWidths, i);
      p && (u.colWidths = p);
    }
    return u;
  })() };
}
function jc(e, t, n) {
  var _a2;
  const r = e.rows.length;
  if (r <= 1) return { grid: e, meta: t };
  if (n < 0 || n >= r) return { grid: e, meta: t };
  const i = Sc(e, t, n), s = [...i.grid.rows.slice(0, n), ...i.grid.rows.slice(n + 1)];
  let l = i.meta.headerRows, u = i.meta.footerRows;
  n < l ? l = Math.max(0, l - 1) : u > 0 && n >= r - u && (u = Math.max(0, u - 1));
  const p = s.length;
  l + u > p && (u = Math.max(0, p - l));
  const m = { ...i.meta, headerRows: l, footerRows: u, merges: kc(i.meta.merges, n), cells: bc(i.meta.cells, n) };
  if ((_a2 = i.meta.rowHeights) == null ? void 0 : _a2.length) {
    const h = rs(i.meta.rowHeights, n);
    h ? m.rowHeights = h : delete m.rowHeights;
  }
  return { grid: { rows: s, aligns: [...i.grid.aligns] }, meta: m };
}
function Lc(e, t, n) {
  var _a2;
  const r = Math.max(1, ...e.rows.map((p) => p.length), e.aligns.length, 1);
  if (r <= 1) return { grid: e, meta: t };
  if (n < 0 || n >= r) return { grid: e, meta: t };
  const i = Cc(e, t, n), s = i.grid.rows.map((p) => {
    const m = [...p];
    for (; m.length < r; ) m.push("");
    return m.splice(n, 1), m;
  }), l = [...i.grid.aligns];
  for (; l.length < r; ) l.push(null);
  l.splice(n, 1);
  const u = { ...i.meta, merges: Ec(i.meta.merges, n), cells: wc(i.meta.cells, n) };
  if ((_a2 = i.meta.colWidths) == null ? void 0 : _a2.length) {
    const p = rs(i.meta.colWidths, n);
    p ? u.colWidths = p : delete u.colWidths;
  }
  return { grid: { rows: s, aligns: l }, meta: u };
}
function Tc(e, t, n) {
  const r = [...new Set(n.filter((s) => Number.isInteger(s) && s >= 0))].sort((s, l) => l - s);
  let i = { grid: e, meta: t };
  for (const s of r) {
    if (i.grid.rows.length <= 1) break;
    i = jc(i.grid, i.meta, s);
  }
  return i;
}
function Pc(e, t, n) {
  const r = [...new Set(n.filter((s) => Number.isInteger(s) && s >= 0))].sort((s, l) => l - s);
  let i = { grid: e, meta: t };
  for (const s of r) {
    if (Math.max(1, ...i.grid.rows.map((u) => u.length), i.grid.aligns.length, 1) <= 1) break;
    i = Lc(i.grid, i.meta, s);
  }
  return i;
}
function Rc(e) {
  return String(e || "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96) || "doc";
}
function Ac(e) {
  return `md-ed-${Rc(e)}`;
}
function Dc(e) {
  const t = `${e}-h`;
  return (n, r, i) => {
    const s = Number.isInteger(i) ? i : 0, l = typeof n == "object" && n !== null ? Number(n.index) : NaN, u = Number.isInteger(l) ? l : s;
    return `${t}-${u}`;
  };
}
const no = ".md-editor-catalog-link", Ic = "md-preview-heading-folded", ro = "md-preview-heading-section-hidden", _c = 2;
function $c(e, t) {
  const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
  return n.top - r.top + t.scrollTop;
}
function Fc(e) {
  for (let t = 0; t < 8; t += 1) {
    const n = getComputedStyle(e);
    if (!(e.classList.contains(ro) || e.hasAttribute("hidden") || n.display === "none")) break;
    let i = false, s = e;
    for (; s && !i; ) {
      if (s instanceof HTMLElement && (s.classList.contains(ro) || s.hasAttribute("hidden"))) {
        let u = s.previousElementSibling;
        for (; u; ) {
          if (u instanceof HTMLElement && u.classList.contains(Ic)) {
            const p = u.querySelector(":scope > .md-preview-heading-fold-chevron");
            p instanceof HTMLButtonElement && (p.click(), i = true);
            break;
          }
          u = u.previousElementSibling;
        }
      }
      s = s.parentElement;
    }
    if (!i) break;
  }
}
function Hc(e, t) {
  const n = (r) => {
    var _a2;
    if (r.button !== 0) return;
    const i = r.target;
    if (!(i instanceof Element)) return;
    const s = i.closest(no);
    if (!(s instanceof HTMLElement) || !e.contains(s)) return;
    const u = Array.from(e.querySelectorAll(no)).indexOf(s);
    if (u < 0) return;
    const p = t.mdHeadingId({ index: u + 1 }), m = t.getEditorRoot(), h = ((_a2 = m == null ? void 0 : m.querySelector) == null ? void 0 : _a2.call(m, `#${CSS.escape(p)}`)) ?? null;
    if (!h || m && !m.contains(h)) return;
    r.preventDefault(), r.stopPropagation(), typeof r.stopImmediatePropagation == "function" && r.stopImmediatePropagation(), Fc(h);
    const P = yt(h);
    if (!P) {
      h.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    const C = h.previousElementSibling ? 0 : Number.parseFloat(getComputedStyle(h).marginBlockStart || "0") || 0, R = $c(h, P) - _c - C;
    P.scrollTo({ top: Math.max(0, R), behavior: "smooth" });
  };
  return e.addEventListener("click", n, true), () => {
    e.removeEventListener("click", n, true);
  };
}
const Nr = "s3haim-llm-modal-position", xs = "s3haim-llm-modal-hidden", Oc = 420, mr = 280, pr = 240, Bc = 560, zc = 44, qn = { leftVw: 55, topVh: 12 };
function Kc() {
  try {
    const e = localStorage.getItem(Nr);
    if (!e) return { ...qn };
    const t = JSON.parse(e), n = Number(t == null ? void 0 : t.leftVw), r = Number(t == null ? void 0 : t.topVh);
    return !Number.isFinite(n) || !Number.isFinite(r) ? { ...qn } : { leftVw: Math.min(95, Math.max(0, n)), topVh: Math.min(95, Math.max(0, r)) };
  } catch {
    return { ...qn };
  }
}
function Xn(e) {
  const t = window.innerWidth || 1, n = window.innerHeight || 1, r = Kc(), i = Math.min(Oc, Math.max(mr, e.width - 16)), s = Math.min(zc + Bc, Math.max(pr, e.height - 16)), l = { leftPx: r.leftVw / 100 * t, topPx: r.topVh / 100 * n, widthPx: i, heightPx: s };
  return ft(l, e);
}
function ft(e, t) {
  const n = Math.max(mr, t.width), r = Math.max(pr, t.height), i = Math.min(n, Math.max(mr, e.widthPx)), s = Math.min(r, Math.max(pr, e.heightPx)), l = t.right - i, u = t.bottom - s, p = Math.min(Math.max(t.left, e.leftPx), Math.max(t.left, l)), m = Math.min(Math.max(t.top, e.topPx), Math.max(t.top, u));
  return { leftPx: Math.round(p), topPx: Math.round(m), widthPx: Math.round(i), heightPx: Math.round(s) };
}
function Vc(e) {
  const t = e ?? { left: 8, top: 8, right: window.innerWidth - 8, bottom: window.innerHeight - 8, width: window.innerWidth - 16, height: window.innerHeight - 16 };
  try {
    const n = localStorage.getItem(Nr);
    if (!n) return Xn(t);
    const r = JSON.parse(n);
    return Number.isFinite(Number(r == null ? void 0 : r.leftPx)) && Number.isFinite(Number(r == null ? void 0 : r.topPx)) && Number.isFinite(Number(r == null ? void 0 : r.widthPx)) && Number.isFinite(Number(r == null ? void 0 : r.heightPx)) ? ft({ leftPx: Number(r.leftPx), topPx: Number(r.topPx), widthPx: Number(r.widthPx), heightPx: Number(r.heightPx) }, t) : Xn(t);
  } catch {
    return Xn(t);
  }
}
function Wc(e, t) {
  const n = t ?? { left: 8, top: 8, right: window.innerWidth - 8, bottom: window.innerHeight - 8, width: window.innerWidth - 16, height: window.innerHeight - 16 }, r = ft(e, n);
  try {
    localStorage.setItem(Nr, JSON.stringify(r));
  } catch {
  }
}
function Uc() {
  try {
    return localStorage.getItem(xs) === "1";
  } catch {
    return false;
  }
}
function Yn(e) {
  try {
    localStorage.setItem(xs, e ? "1" : "0");
  } catch {
  }
}
function qc(e) {
  const t = e == null ? void 0 : e.current, n = (t == null ? void 0 : t.value) ?? t ?? null;
  return n && typeof n == "object" && "root" in n && n.root instanceof Element ? n.root : null;
}
function oo(e) {
  var _a2;
  const n = { left: 8, top: 8, right: Math.max(8, window.innerWidth - 8), bottom: Math.max(8, window.innerHeight - 8), width: Math.max(0, window.innerWidth - 16), height: Math.max(0, window.innerHeight - 16) }, r = qc(e);
  if (!r) return n;
  const i = r.getBoundingClientRect(), l = (_a2 = r.querySelector(".md-editor-toolbar-wrapper") || r.querySelector(".md-editor-toolbar")) == null ? void 0 : _a2.getBoundingClientRect(), u = l ? l.bottom : i.top, p = i.bottom, m = i.left, h = i.right;
  return { left: m, top: u, right: h, bottom: p, width: Math.max(0, h - m), height: Math.max(0, p - u) };
}
const so = 5, io = "llm-assist-modal-resize-cursor-style", xn = "llm-assist-modal-corner-resize";
function Xc() {
  if (document.getElementById(io)) return;
  const e = document.createElement("style");
  e.id = io, e.textContent = `
    html.${xn},
    html.${xn} * {
      cursor: var(--llm-assist-resize-cursor, nwse-resize) !important;
    }
  `, document.head.appendChild(e);
}
function Yc(e) {
  return e === "se" ? "nwse-resize" : "nesw-resize";
}
function Gc(e) {
  Xc();
  const t = Yc(e);
  document.documentElement.style.setProperty("--llm-assist-resize-cursor", t), document.documentElement.classList.add(xn), document.body.style.userSelect = "none";
}
function Zc() {
  document.documentElement.classList.remove(xn), document.documentElement.style.removeProperty("--llm-assist-resize-cursor"), document.body.style.userSelect = "";
}
function Jc(e, { enabled: t = true } = {}) {
  const n = a.useRef(oo(e)), [r, i] = a.useState(() => Vc(n.current)), s = a.useRef(null), l = a.useRef({ active: false, startX: 0, startY: 0, startLayout: r }), u = a.useRef(null), p = a.useCallback(() => {
    n.current = oo(e), i((A) => ft(A, n.current));
  }, [e]);
  a.useEffect(() => {
    var _a2, _b, _c2;
    if (!t) return;
    p();
    const A = () => p();
    window.addEventListener("resize", A), window.addEventListener("scroll", A, true);
    const I = ((_b = (_a2 = e == null ? void 0 : e.current) == null ? void 0 : _a2.value) == null ? void 0 : _b.root) ?? ((_c2 = e == null ? void 0 : e.current) == null ? void 0 : _c2.root) ?? null;
    let O = null;
    if (I && typeof ResizeObserver < "u") {
      O = new ResizeObserver(A), O.observe(I);
      const q = I.querySelector(".md-editor-toolbar-wrapper") || I.querySelector(".md-editor-toolbar");
      q && O.observe(q);
    }
    return () => {
      window.removeEventListener("resize", A), window.removeEventListener("scroll", A, true), O == null ? void 0 : O.disconnect();
    };
  }, [t, e, p]);
  const m = a.useCallback((A) => {
    const I = ft(A, n.current);
    return Wc(I, n.current), I;
  }, []), h = a.useCallback((A, I) => {
    const O = l.current;
    if (!O.active) return;
    const q = A - O.startX, b = I - O.startY;
    i(ft({ ...O.startLayout, leftPx: O.startLayout.leftPx + q, topPx: O.startLayout.topPx + b }, n.current));
  }, []), P = a.useCallback((A, { onTap: I } = {}) => {
    if (A.pointerType === "touch" || A.button !== 0) return;
    A.preventDefault();
    const O = A.clientX, q = A.clientY;
    let b = false;
    l.current = { active: true, startX: O, startY: q, startLayout: r };
    const T = (E) => {
      l.current.active && (Math.hypot(E.clientX - O, E.clientY - q) > so && (b = true), h(E.clientX, E.clientY));
    }, X = () => {
      l.current.active && (l.current.active = false, document.removeEventListener("pointermove", T), document.removeEventListener("pointerup", X), i((E) => m(E)), b || (I == null ? void 0 : I()));
    };
    document.addEventListener("pointermove", T), document.addEventListener("pointerup", X);
  }, [h, r, m]), C = a.useCallback((A, { onTap: I } = {}) => {
    const O = A.changedTouches;
    if (!(O == null ? void 0 : O.length)) return;
    const q = O[0];
    if (!q) return;
    const b = q.identifier, T = q.clientX, X = q.clientY;
    A.preventDefault();
    let E = false;
    l.current = { active: true, startX: T, startY: X, startLayout: r, touchIdentifier: b };
    const D = (Q) => {
      if (!l.current.active) return;
      const re = Array.from(Q.touches).find((ae) => ae.identifier === b);
      re && (Math.hypot(re.clientX - T, re.clientY - X) > so && (E = true), h(re.clientX, re.clientY), Q.preventDefault());
    }, K = () => {
      l.current.active && (l.current.active = false, document.removeEventListener("touchmove", D), document.removeEventListener("touchend", J), document.removeEventListener("touchcancel", J), i((Q) => m(Q)), E || (I == null ? void 0 : I()));
    }, J = (Q) => {
      !l.current.active || !Array.from(Q.changedTouches).some((ae) => ae.identifier === b) || K();
    };
    document.addEventListener("touchmove", D, { passive: false }), document.addEventListener("touchend", J, { passive: false }), document.addEventListener("touchcancel", J, { passive: false });
  }, [h, r, m]), R = a.useCallback((A, I) => {
    const O = u.current;
    if (!O) return;
    const q = A - O.startX, b = I - O.startY, T = O.startLayout;
    let X;
    O.corner === "se" ? X = { leftPx: T.leftPx, topPx: T.topPx, widthPx: T.widthPx + q, heightPx: T.heightPx + b } : X = { leftPx: T.leftPx + q, topPx: T.topPx, widthPx: T.widthPx - q, heightPx: T.heightPx + b }, i(ft(X, n.current));
  }, []), S = a.useCallback((A, I) => {
    if (I.button !== 0) return;
    I.preventDefault(), I.stopPropagation(), u.current = { corner: A, startX: I.clientX, startY: I.clientY, startLayout: r }, Gc(A);
    const O = I.currentTarget;
    O instanceof HTMLElement && typeof O.setPointerCapture == "function" && O.setPointerCapture(I.pointerId);
    const q = () => {
      u.current = null, Zc(), document.removeEventListener("pointermove", b), document.removeEventListener("pointerup", T), document.removeEventListener("pointercancel", T);
    }, b = (X) => {
      X.preventDefault(), R(X.clientX, X.clientY);
    }, T = () => {
      u.current && (q(), i((X) => m(X)));
    };
    document.addEventListener("pointermove", b, { passive: false }), document.addEventListener("pointerup", T), document.addEventListener("pointercancel", T);
  }, [R, r, m]), M = { left: r.leftPx, top: r.topPx, width: r.widthPx, height: r.heightPx };
  return { layout: r, panelRef: s, panelStyle: M, startPositionDrag: P, startPositionTouchDrag: C, startCornerResize: S, refreshBounds: p };
}
const En = "data-mirror-edit", Ct = "data-mirror-edit-active", Qc = "a, button, input, textarea, select, label, .md-editor-code-action, [data-transform-handle], table, .md-editor-mermaid, .md-editor-katex, .md-editor-code, pre, [data-note-cover]";
function Gn(e) {
  return e instanceof Element ? !!(e.closest(`[${Ct}]`) || e.closest(`[${En}]`)) : false;
}
function Dt(e) {
  return !!(e == null ? void 0 : e.querySelector(`[${Ct}]`));
}
function fn(e) {
  var _a2, _b;
  return e ? !!((_b = (e instanceof Element && e.classList.contains("md-editor") ? e : null) || ((_a2 = e.querySelector) == null ? void 0 : _a2.call(e, ".md-editor")) || (e instanceof Element ? e.closest(".md-editor") : null)) == null ? void 0 : _b.classList.contains("md-editor-previewOnly")) : false;
}
function eu(e) {
  const t = e.match(/^(.*?)(\n*)$/s);
  return { body: (t == null ? void 0 : t[1]) ?? e, trailing: (t == null ? void 0 : t[2]) ?? "" };
}
function tu(e) {
  var _a2;
  const t = [/^(#{1,6}[ \t]+)/, /^([ \t]*[-*+][ \t]+\[[ xX]\][ \t]+)/, /^([ \t]*[-*+][ \t]+)/, /^([ \t]*\d+\.[ \t]+)/, /^(>[ \t]?)/];
  for (const n of t) {
    const i = (_a2 = e.match(n)) == null ? void 0 : _a2[1];
    if (i) return { prefix: i, content: e.slice(i.length) };
  }
  return { prefix: "", content: e };
}
function nu(e) {
  return e instanceof Element ? e.closest(`[${Ct}]`) ? false : !!e.closest(Qc) : true;
}
const Sn = new ll({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-", emDelimiter: "*", strongDelimiter: "**" });
Sn.keep(["u", "sub", "sup"]);
Sn.addRule("wikiImageData", { filter: (e) => {
  var _a2;
  return e.nodeName !== "IMG" ? false : !!((_a2 = e.getAttribute) == null ? void 0 : _a2.call(e, "data-wiki-path"));
}, replacement: (e, t) => {
  const n = t;
  return Vi({ path: n.getAttribute("data-wiki-path"), width: n.getAttribute("data-wiki-width"), height: n.getAttribute("data-wiki-height"), background: n.getAttribute("data-wiki-bg") });
} });
Sn.addRule("deepHeading", { filter: (e) => {
  var _a2;
  if (!(e == null ? void 0 : e.nodeName)) return false;
  const t = Number((_a2 = e.getAttribute) == null ? void 0 : _a2.call(e, "data-heading-level"));
  return !!(Number.isInteger(t) && t >= 7);
}, replacement: (e, t) => {
  var _a2;
  const n = Number((_a2 = t.getAttribute) == null ? void 0 : _a2.call(t, "data-heading-level")), r = Number.isInteger(n) && n >= 1 ? n : 6;
  return `${"#".repeat(r)} ${e.trim()}`;
} });
function ru(e, t) {
  let n = e.trim();
  return t && (/^#{1,6}[ \t]+/.test(t) ? n = n.replace(/^#{1,6}[ \t]+/, "") : /\[[ xX]\]/.test(t) ? n = n.replace(/^([-*+]|\d+\.)[ \t]+\[[ xX]\][ \t]+/, "") : /^([ \t]*[-*+][ \t]+)/.test(t) || /^([ \t]*\d+\.[ \t]+)/.test(t) ? n = n.replace(/^([-*+]|\d+\.)[ \t]+/, "") : /^>[ \t]?/.test(t) && (n = n.replace(/^(>[ \t]?)+/gm, "").trim())), n;
}
function ou(e, t) {
  if (!/\[[ xX]\]/.test(e)) return e;
  const n = t.querySelector('input[type="checkbox"]');
  if (!(n instanceof HTMLInputElement)) return e;
  const r = n.checked;
  return e.replace(/\[[ xX]\]/, r ? "[x]" : "[ ]");
}
function su(e, t) {
  const { prefix: n } = tu(t), r = e.cloneNode(true);
  r.removeAttribute(Ct), r.removeAttribute(En), r.removeAttribute("contenteditable"), r.removeAttribute("spellcheck");
  const i = ou(n, r);
  r.querySelectorAll('input[type="checkbox"]').forEach((h) => h.remove()), r.querySelectorAll(".md-preview-heading-fold-chevron, .md-heading-fold, .md-editor-code-action, [data-transform-handle], button").forEach((h) => h.remove());
  const s = e.tagName.toLowerCase(), u = /^h[1-6]$/.test(s) || s === "p" || s === "li" || s === "blockquote" || s === "td" || s === "th" ? r.innerHTML : r.outerHTML;
  let p = Sn.turndown(u || "");
  p = p.replace(/^\n+|\n+$/g, ""), p = ru(p, i);
  const m = Number(e.getAttribute("data-heading-level"));
  return Number.isInteger(m) && m >= 7 ? `${"#".repeat(m)} ${p.replace(/^#{1,6}[ \t]+/, "").trim()}` : i ? `${i}${p}` : p;
}
let _e = null;
function $t(e) {
  const t = _e;
  _e = null, t && (t.cleanup(), t.block.isConnected && (t.block.removeAttribute(Ct), t.block.removeAttribute(En), t.block.removeAttribute("contenteditable"), t.block.removeAttribute("spellcheck"), e && (t.block.innerHTML = t.snapshotHtml)));
}
function It(e) {
  const t = _e;
  if (!t) return;
  const r = `${su(t.block, t.snapshotBody)}${t.trailing}`, { from: i, to: s } = t, l = e.state.doc.sliceString(i, s);
  if (r === l) {
    $t(true);
    return;
  }
  $t(false), e.dispatch({ changes: { from: i, to: s, insert: r }, selection: { anchor: i + r.length } });
}
function ao(e, t, n) {
  var _a2;
  const r = (_a2 = window.getSelection) == null ? void 0 : _a2.call(window);
  if (!r) return;
  try {
    const s = document;
    if (typeof s.caretRangeFromPoint == "function") {
      const l = s.caretRangeFromPoint(t, n);
      if (l && e.contains(l.startContainer)) {
        r.removeAllRanges(), r.addRange(l);
        return;
      }
    }
    if (typeof s.caretPositionFromPoint == "function") {
      const l = s.caretPositionFromPoint(t, n);
      if ((l == null ? void 0 : l.offsetNode) && e.contains(l.offsetNode)) {
        const u = document.createRange();
        u.setStart(l.offsetNode, l.offset), u.collapse(true), r.removeAllRanges(), r.addRange(u);
        return;
      }
    }
  } catch {
  }
  const i = document.createRange();
  i.selectNodeContents(e), i.collapse(false), r.removeAllRanges(), r.addRange(i);
}
function bs(e, t, n, r, i) {
  if (_e) {
    if (_e.block === e) return ao(e, r, i), true;
    It(t);
  }
  const s = Number(e.getAttribute("data-line"));
  if (!Number.isFinite(s)) return false;
  const { from: l, to: u } = Di(t, n, s, s), p = t.state.doc.sliceString(l, u);
  if (!p && l === u) return false;
  const { body: m, trailing: h } = eu(p), P = e.innerHTML;
  e.setAttribute(Ct, "1"), e.setAttribute(En, "1"), e.setAttribute("contenteditable", "true"), e.setAttribute("spellcheck", "true"), e.setAttribute("aria-label", "Mirror Edit"), e.querySelectorAll(".md-preview-heading-fold-chevron, button").forEach((M) => {
    M instanceof HTMLElement && (M.contentEditable = "false");
  });
  const C = (M) => {
    if (M.key === "Escape") {
      M.preventDefault(), M.stopPropagation(), $t(true);
      return;
    }
    if (M.key === "Enter" && (M.metaKey || M.ctrlKey)) {
      M.preventDefault(), M.stopPropagation(), It(t);
      return;
    }
    const A = e.tagName.toLowerCase();
    M.key === "Enter" && !M.shiftKey && /^h[1-6]$/.test(A) && (M.preventDefault(), M.stopPropagation(), It(t));
  }, R = (M) => {
    var _a2;
    const A = (_a2 = M.clipboardData) == null ? void 0 : _a2.getData("text/plain");
    A != null && (M.preventDefault(), document.execCommand("insertText", false, A));
  }, S = () => {
    window.setTimeout(() => {
      (_e == null ? void 0 : _e.block) === e && (e.contains(document.activeElement) || It(t));
    }, 0);
  };
  return e.addEventListener("keydown", C), e.addEventListener("paste", R), e.addEventListener("blur", S), _e = { block: e, snapshotHtml: P, snapshotBody: m, from: l, to: u, trailing: h, cleanup: () => {
    e.removeEventListener("keydown", C), e.removeEventListener("paste", R), e.removeEventListener("blur", S);
  } }, requestAnimationFrame(() => {
    e.focus(), ao(e, r, i);
  }), true;
}
function iu(e, t) {
  const n = (r) => {
    if (!t.isEnabled() || nu(r.target)) return;
    const i = t.getPreviewRoot();
    if (!i || !(r.target instanceof Node) || !i.contains(r.target)) return;
    const s = or(r.target, i);
    if (!s) return;
    const l = t.getView();
    l && (r.preventDefault(), r.stopPropagation(), bs(s, l, i, r.clientX, r.clientY));
  };
  return e.addEventListener("dblclick", n, true), () => {
    e.removeEventListener("dblclick", n, true), _e && $t(true);
  };
}
function au() {
  $t(true);
}
function lu(e) {
  return !e || !_e ? false : (It(e), true);
}
function lo(e, t, n, r, i) {
  return bs(e, t, n, r, i);
}
function cu() {
  _e && (_e.block.isConnected || (_e.cleanup(), _e = null));
}
function uu(e) {
  var _a2;
  return ((_a2 = e == null ? void 0 : e.current) == null ? void 0 : _a2.value) ?? (e == null ? void 0 : e.current) ?? null;
}
function du(e, t = null) {
  if (t == null ? void 0 : t.dom) return t.dom.closest(".md-editor");
  const n = uu(e);
  return (n == null ? void 0 : n.root) instanceof Element ? n.root : null;
}
function fu(e, { view: t = null, from: n = 0, to: r = 0 } = {}) {
  const i = t ?? Ft(e).view, s = du(e, i);
  return !!(fn(s) || !(i == null ? void 0 : i.state) || !i.hasFocus && n === r);
}
function mu(e, t) {
  return e ? e.endsWith(`
`) ? t : `
${t}` : t;
}
function pu(e, t) {
  if (!e) return t;
  const n = e.endsWith(`
`) ? "" : `
`;
  return `${e}${n}${t}`;
}
function hu({ editorRef: e, from: t, to: n, result: r, onChange: i, getMarkdown: s }) {
  var _a2, _b, _c2;
  const { view: l } = Ft(e);
  if (fu(e, { view: l, from: t, to: n })) {
    const p = ((_c2 = (_b = (_a2 = l == null ? void 0 : l.state) == null ? void 0 : _a2.doc) == null ? void 0 : _b.toString) == null ? void 0 : _c2.call(_b)) ?? (typeof s == "function" ? s() : ""), m = mu(p, r);
    if (l == null ? void 0 : l.state) {
      const h = p.length;
      return hr(l, h, h, m, i);
    }
    return typeof i == "function" ? (i(pu(p, r)), true) : false;
  }
  return hr(l, t, n, r, i);
}
function Ft(e) {
  var _a2, _b, _c2;
  const n = (_c2 = (_b = ((_a2 = e == null ? void 0 : e.current) == null ? void 0 : _a2.value) ?? (e == null ? void 0 : e.current)) == null ? void 0 : _b.getEditorView) == null ? void 0 : _c2.call(_b);
  if (!(n == null ? void 0 : n.state)) return { text: "", from: 0, to: 0, view: null };
  const r = n.state.selection.main;
  return { text: n.state.doc.sliceString(r.from, r.to), from: r.from, to: r.to, view: n };
}
function hr(e, t, n, r, i) {
  var _a2;
  return (e == null ? void 0 : e.state) ? (e.dispatch({ changes: { from: t, to: n, insert: r }, selection: { anchor: t + r.length } }), (_a2 = e.focus) == null ? void 0 : _a2.call(e), i == null ? void 0 : i(e.state.doc.toString()), true) : false;
}
function gu({ editorRef: e, onChange: t, getMarkdown: n, llmProviderProfiles: r = [], open: i, onOpenChange: s, theme: l = "light" }) {
  const u = Array.isArray(r) ? r : [], [p, m] = a.useState(() => Uc()), [h, P] = a.useState(false), [C, R] = a.useState(""), [S, M] = a.useState({ from: 0, to: 0 }), [A, I] = a.useState([]), [O, q] = a.useState(""), [b, T] = a.useState(""), [X, E] = a.useState("text"), [D, K] = a.useState(false), [J, Q] = a.useState(""), [re, ae] = a.useState([]), [le, we] = a.useState(""), [te, W] = a.useState(""), [ee, pe] = a.useState(null), [Se, We, $e] = ul(u), ie = Wi(u, Se), [ue, Ce] = a.useState(() => ie ? _r(ie.id, ie.kind) : ""), de = a.useRef(null), { panelRef: Fe, panelStyle: z, startPositionDrag: B, startPositionTouchDrag: ne, startCornerResize: Z, refreshBounds: Ee } = Jc(e, { enabled: i }), he = a.useCallback(() => ({ selectedText: C, selectionRange: S, attachedImages: A, instruction: O, result: b, resultViewMode: X, loading: D, error: J, templates: re, selectedTemplateId: le, templateName: te, editingTemplateId: ee, profiles: u.map((j) => ({ id: j.id, name: j.name, kind: j.kind, baseUrl: j.baseUrl })), selectedProfileId: Se, model: ue, theme: l }), [C, S, A, O, b, X, D, J, re, le, te, ee, u, Se, ue, l]), ye = a.useCallback(() => {
    const j = de.current;
    !j || j.closed || On(j, Pt.SYNC, { state: he() });
  }, [he]), Ae = a.useCallback(() => {
    const j = de.current;
    if (j && !j.closed) try {
      j.close();
    } catch {
    }
    de.current = null, P(false);
  }, []), fe = a.useCallback(() => {
    const { text: j, from: $, to: Y } = Ft(e);
    return R(j), M({ from: $, to: Y }), j;
  }, [e]), ge = a.useCallback(async () => {
    const j = await Ui();
    return ae(j), j;
  }, []);
  a.useEffect(() => {
    i && (m(false), Yn(false), Ee(), $e(), fe(), ge(), Q(""));
  }, [i, Ee, fe, ge, $e]), a.useEffect(() => {
    if (!(ie == null ? void 0 : ie.id) || !(ie == null ? void 0 : ie.kind)) {
      Ce("");
      return;
    }
    Ce(_r(ie.id, ie.kind));
  }, [ie == null ? void 0 : ie.id, ie == null ? void 0 : ie.kind]), a.useEffect(() => {
    const j = () => {
      we(""), pe(null), ge();
    };
    return window.addEventListener($r, j), () => {
      window.removeEventListener($r, j);
    };
  }, [ge]), a.useEffect(() => {
    if (!i || p || h) return;
    const $ = setInterval(() => fe(), 600);
    return () => clearInterval($);
  }, [i, p, h, fe]), a.useEffect(() => {
    ye();
  }, [ye]), a.useEffect(() => {
    if (!h) return;
    const j = setInterval(() => {
      const $ = de.current;
      (!$ || $.closed) && (de.current = null, P(false));
    }, 400);
    return () => clearInterval(j);
  }, [h]), a.useEffect(() => {
    if (!i) {
      Ae();
      return;
    }
    const j = () => {
      const $ = de.current;
      if ($ && !$.closed) {
        On($, Pt.PARENT_CLOSING);
        try {
          $.close();
        } catch {
        }
      }
    };
    return window.addEventListener("beforeunload", j), () => window.removeEventListener("beforeunload", j);
  }, [i, Ae]);
  const me = a.useCallback((j) => {
    const $ = String(j || "").trim();
    Ce($), ie && (Dn(ie.id, $), ie.kind === qi ? Fr($) : Hr($));
  }, [ie]), De = a.useCallback(async () => {
    Q(""), K(true);
    try {
      const j = fe();
      if (!ie) throw new Error("\uC124\uC815\uC5D0\uC11C AI \uC81C\uACF5\uC790\uB97C \uCD94\uAC00\uD55C \uB4A4 \uC120\uD0DD\uD558\uC138\uC694.");
      if (ie.kind === Xi) {
        const Y = (ie.baseUrl || "").trim();
        if (!Y) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC218\uC815\uD558\uC138\uC694.");
        Dn(ie.id, ue), Hr(ue);
        const et = await Or(ie.id, () => ie.apiKey || "", (it) => sl({ baseUrl: Y, apiKey: it, model: ue, instruction: O, selectedText: j, images: A }), { allowEmpty: true, missingKeyMessage: "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
        T(et);
        return;
      }
      if (il(ue)) throw new Error(`\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.
Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash\uB85C \uBCC0\uACBD\uD574 \uC8FC\uC138\uC694.`);
      Dn(ie.id, ue), Fr(ue);
      const $ = await Or(ie.id, () => ie.apiKey || "", (Y) => al({ apiKey: Y, model: ue, instruction: O, selectedText: j, images: A }), { missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
      T($);
    } catch (j) {
      Q((j == null ? void 0 : j.message) || "LLM \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    } finally {
      K(false);
    }
  }, [fe, A, ie, ue, O]), je = a.useCallback(() => {
    if (!b) return;
    const { from: j, to: $ } = S;
    if (!hu({ editorRef: e, from: j, to: $, result: b, onChange: t, getMarkdown: n })) {
      Q("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC801\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC120\uD0DD \uC601\uC5ED\uC744 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.");
      return;
    }
    fe();
  }, [b, e, S, t, n, fe]), He = a.useCallback((j) => {
    we(j);
    const $ = re.find((Y) => Y.id === j);
    $ && (q($.instruction), W($.name), pe($.id));
  }, [re]), Oe = a.useCallback(async () => {
    const j = te.trim(), $ = O.trim();
    if (!j || !$) {
      alert("\uD15C\uD50C\uB9BF \uC774\uB984\uACFC \uC9C0\uC2DC\uC0AC\uD56D\uC744 \uBAA8\uB450 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    try {
      const Y = await Yi({ id: ee || Gi().id, name: j, instruction: $, updatedAt: Date.now() });
      pe(Y.id), we(Y.id), await ge();
    } catch (Y) {
      alert((Y == null ? void 0 : Y.message) || "\uD15C\uD50C\uB9BF \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [te, O, ee, ge]), xe = a.useCallback(() => {
    pe(null), we(""), W(""), q("");
  }, []), Be = a.useCallback(async () => {
    if (ee && window.confirm("\uC774 \uC9C0\uC2DC\uC0AC\uD56D \uD15C\uD50C\uB9BF\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?")) try {
      await Zi(ee), xe(), await ge();
    } catch (j) {
      alert((j == null ? void 0 : j.message) || "\uD15C\uD50C\uB9BF \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [ee, xe, ge]), Ge = a.useCallback(async (j) => {
    !Array.isArray(j) || !j.length || I(($) => {
      const Y = gl - $.length;
      return Y <= 0 ? $ : [...$, ...j.slice(0, Y)];
    });
  }, []), Le = a.useCallback((j) => {
    j && I(($) => $.filter((Y) => Y.id !== j));
  }, []), Ue = a.useCallback(async (j, $ = {}) => {
    switch (j) {
      case "refresh-selection":
        fe();
        break;
      case "run":
        await De();
        break;
      case "apply-result":
        je();
        break;
      case "set-instruction":
        q(typeof $.value == "string" ? $.value : "");
        break;
      case "set-result":
        T(typeof $.value == "string" ? $.value : "");
        break;
      case "set-model":
        typeof $.value == "string" && me($.value);
        break;
      case "set-llm-profile-id":
        typeof $.value == "string" && We($.value);
        break;
      case "load-template":
        He($.id ?? "");
        break;
      case "save-template":
        await Oe();
        break;
      case "new-template":
        xe();
        break;
      case "delete-template":
        await Be();
        break;
      case "set-template-name":
        W(typeof $.value == "string" ? $.value : "");
        break;
      case "set-result-view-mode":
        ($.value === "preview" || $.value === "text") && E($.value);
        break;
      case "add-images": {
        const Y = (Array.isArray($.images) ? $.images : []).map(xl).filter(Boolean);
        Y.length && await Ge(Y);
        break;
      }
      case "remove-image":
        Le($.id);
        break;
      case "close":
        s == null ? void 0 : s(false);
        break;
    }
  }, [fe, De, je, me, We, He, Oe, xe, Be, Ge, Le, s]);
  a.useEffect(() => {
    if (!i) return;
    const j = ($) => {
      if ($.origin === window.location.origin && fl($.data)) {
        if ($.data.type === Pt.READY) {
          $.source && typeof $.source.postMessage == "function" && (de.current = $.source, P(true), On($.source, Pt.SYNC, { state: he() }));
          return;
        }
        $.data.type === Pt.ACTION && Ue($.data.action, $.data.payload);
      }
    };
    return window.addEventListener("message", j), () => window.removeEventListener("message", j);
  }, [i, he, Ue]);
  const st = () => {
    m(true), Yn(true);
  }, Je = () => {
    m(false), Yn(false), fe();
  }, Qe = () => {
    Ae(), s == null ? void 0 : s(false);
  }, Me = () => {
    let j = de.current;
    if (j && !j.closed) {
      j.focus(), ye(), P(true);
      return;
    }
    const $ = ml();
    if (j = window.open($, pl, hl), !j) {
      alert("\uD31D\uC5C5\uC774 \uCC28\uB2E8\uB418\uC5B4 \uC0C8 \uCC3D\uC744 \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    de.current = j, P(true);
  }, Ne = { theme: l, profiles: u, selectedProfileId: Se, onSelectedProfileIdChange: We, selectedProfile: ie, model: ue, onModelChange: me, selectedText: C, onRefreshSelection: fe, attachedImages: A, onAddImages: Ge, onRemoveImage: Le, instruction: O, onInstructionChange: q, result: b, onResultChange: T, resultViewMode: X, onResultViewModeChange: E, loading: D, error: J, templates: re, selectedTemplateId: le, onLoadTemplate: He, templateName: te, onTemplateNameChange: W, editingTemplateId: ee, onSaveTemplate: Oe, onNewTemplate: xe, onDeleteTemplate: Be, onRun: De, onApplyResult: je };
  if (!i) return null;
  if (p || h) {
    const j = h ? "AI (\uC0C8\uCC3D)" : "AI", $ = h ? "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC (\uC0C8 \uCC3D \uB2EB\uC73C\uBA74 \uBCF5\uADC0)" : "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC";
    return o.jsxs("div", { role: "button", tabIndex: 0, onPointerDown: (Y) => B(Y, { onTap: h ? void 0 : Je }), onTouchStart: (Y) => ne(Y, { onTap: h ? void 0 : Je }), onKeyDown: (Y) => {
      h || (Y.key === "Enter" || Y.key === " ") && (Y.preventDefault(), Je());
    }, className: "fixed z-10050 flex touch-none cursor-grab select-none items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-1.5 text-xs font-medium text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 active:cursor-grabbing", style: { left: z.left, top: z.top }, title: $, "aria-label": j, children: [o.jsx(ar, { size: 14, "aria-hidden": true }), j] });
  }
  return o.jsxs("div", { ref: Fe, className: "fixed z-10050 flex flex-col rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95", style: z, role: "dialog", "aria-modal": "false", "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8", children: [o.jsxs("div", { className: "flex touch-none cursor-grab active:cursor-grabbing items-center justify-between gap-2 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40", onPointerDown: (j) => B(j), onTouchStart: (j) => ne(j), children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [o.jsx(fs, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), o.jsx(ar, { size: 16, className: "shrink-0", "aria-hidden": true }), o.jsx("span", { className: "truncate", children: "AI \uB3C4\uC6B0\uBBF8" })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [o.jsx("button", { type: "button", onPointerDown: (j) => j.stopPropagation(), onTouchStart: (j) => j.stopPropagation(), onClick: Me, disabled: h, className: "rounded p-1 text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-200 dark:hover:bg-violet-900/50", title: h ? "\uC0C8 \uCC3D\uC5D0\uC11C \uC5F4\uB824 \uC788\uC74C" : "\uC0C8 \uCC3D\uC73C\uB85C \uC5F4\uAE30", "aria-label": "\uC0C8 \uCC3D\uC73C\uB85C \uC5F4\uAE30", children: o.jsx(bl, { size: 15 }) }), o.jsx("button", { type: "button", onPointerDown: (j) => j.stopPropagation(), onTouchStart: (j) => j.stopPropagation(), onClick: st, className: "rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", title: "\uC228\uAE30\uAE30", "aria-label": "\uC228\uAE30\uAE30", children: o.jsx(wl, { size: 15 }) }), o.jsx("button", { type: "button", onPointerDown: (j) => j.stopPropagation(), onTouchStart: (j) => j.stopPropagation(), onClick: Qe, className: "rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", title: "\uB2EB\uAE30", "aria-label": "\uB2EB\uAE30", children: o.jsx(Vt, { size: 15 }) })] })] }), o.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-3", children: o.jsx(dl, { ...Ne }) }), o.jsx("div", { role: "separator", "aria-orientation": "horizontal", "aria-label": "\uD06C\uAE30 \uC870\uC808", className: "absolute bottom-0 left-0 z-20 h-6 w-6 touch-none opacity-0 cursor-nesw-resize!", onPointerDown: (j) => Z("sw", j) }), o.jsx("div", { role: "separator", "aria-orientation": "horizontal", "aria-label": "\uD06C\uAE30 \uC870\uC808", className: "absolute bottom-0 right-0 z-20 h-6 w-6 touch-none opacity-0 cursor-nwse-resize!", onPointerDown: (j) => Z("se", j) })] });
}
function xu({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: () => e == null ? void 0 : e(), title: "AI \uB3C4\uC6B0\uBBF8", "aria-label": "AI \uB3C4\uC6B0\uBBF8", children: o.jsx(ar, { className: "md-editor-icon", size: 16 }) });
}
function bu(e) {
  const t = String(e ?? "").split(`
`), n = [];
  let r = { name: "\uC77C\uBC18 / \uBBF8\uBD84\uB958", tasks: [] }, i = 0, s = 0;
  t.forEach((u, p) => {
    const m = u.match(/^(#{1,6})\s+(.*)/);
    if (m) {
      (r.tasks.length > 0 || r.name !== "\uC77C\uBC18 / \uBBF8\uBD84\uB958") && n.push(r), r = { name: m[2].trim(), tasks: [] };
      return;
    }
    const h = u.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX])\]\s+(.*)/);
    if (h) {
      const P = Math.floor(h[1].length / 2), C = h[3].toLowerCase() === "x", R = h[4].trim();
      i += 1, C && (s += 1), r.tasks.push({ id: `line-${p}`, lineIndex: p, indent: P, completed: C, text: R, rawLine: u });
    }
  }), r.tasks.length > 0 && n.push(r);
  const l = i > 0 ? Math.round(s / i * 100) : 0;
  return { categories: n, totalTasks: i, completedTasks: s, pendingTasks: i - s, percentage: l };
}
function wu(e, t) {
  const n = String(e ?? "").split(`
`);
  if (t < 0 || t >= n.length) return e;
  const r = n[t];
  if (r.includes("[ ]")) n[t] = r.replace("[ ]", "[x]");
  else if (r.includes("[x]")) n[t] = r.replace("[x]", "[ ]");
  else if (r.includes("[X]")) n[t] = r.replace("[X]", "[ ]");
  else return e;
  return n.join(`
`);
}
function yu({ markdown: e = "", onMarkdownChange: t }) {
  const [n, r] = a.useState(""), [i, s] = a.useState("all"), [l, u] = a.useState({}), [p, m] = a.useState("dashboard"), h = a.useMemo(() => bu(e), [e]);
  a.useEffect(() => {
    const S = {};
    h.categories.forEach((M) => {
      S[M.name] = true;
    }), u(S);
  }, [h.categories.length]);
  const P = (S) => {
    typeof t == "function" && t(wu(e, S));
  }, C = (S) => {
    u((M) => ({ ...M, [S]: !M[S] }));
  }, R = (S) => {
    const M = S.text.toLowerCase().includes(n.toLowerCase()), A = i === "all" ? true : i === "completed" ? S.completed : !S.completed;
    return M && A;
  };
  return o.jsxs("div", { className: "space-y-3 text-xs text-slate-100", children: [o.jsxs("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: [o.jsxs("div", { className: "col-span-2 sm:col-span-1 relative overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3", children: [o.jsx("div", { className: "pointer-events-none absolute -right-2 -top-2 opacity-10", children: o.jsx(yl, { className: "h-16 w-16 text-indigo-400" }) }), o.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-indigo-300", children: "\uC804\uCCB4 \uC9C4\uD589\uB960" }), o.jsx("div", { className: "my-1.5 flex items-baseline gap-1", children: o.jsxs("span", { className: "text-3xl font-extrabold text-white", children: [h.percentage, "%"] }) }), o.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-slate-800", children: o.jsx("div", { className: "h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out", style: { width: `${h.percentage}%` } }) })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-slate-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uCD1D \uD0DC\uC2A4\uD06C" }), o.jsx(Gr, { className: "h-3.5 w-3.5 text-slate-500" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-slate-100", children: [h.totalTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-emerald-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC644\uB8CC\uB428" }), o.jsx(Bn, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-emerald-400", children: [h.completedTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-amber-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC9C4\uD589 \uC608\uC815" }), o.jsx(zn, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-amber-400", children: [h.pendingTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] })] }), o.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2", children: [o.jsxs("div", { className: "flex rounded-lg border border-slate-800 bg-slate-900 p-0.5", children: [o.jsxs("button", { type: "button", onClick: () => m("dashboard"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${p === "dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(vl, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCE74\uD14C\uACE0\uB9AC" })] }), o.jsxs("button", { type: "button", onClick: () => m("checklist"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${p === "checklist" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(Gr, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8" })] })] }), o.jsxs("div", { className: "flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5", children: [o.jsxs("div", { className: "relative min-w-[120px] flex-1", children: [o.jsx(kl, { className: "absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" }), o.jsx("input", { type: "text", value: n, onChange: (S) => r(S.target.value), placeholder: "\uAC80\uC0C9...", className: "w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none" })] }), o.jsxs("select", { value: i, onChange: (S) => s(S.target.value), className: "rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none", children: [o.jsx("option", { value: "all", children: "\uC804\uCCB4" }), o.jsx("option", { value: "completed", children: "\uC644\uB8CC\uB9CC" }), o.jsx("option", { value: "pending", children: "\uBBF8\uC644\uB8CC\uB9CC" })] })] })] }), p === "dashboard" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5", children: h.categories.length === 0 ? o.jsxs("div", { className: "py-8 text-center text-slate-500", children: [o.jsx(Er, { className: "mx-auto mb-2 h-8 w-8 opacity-40" }), o.jsx("p", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD56D\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), o.jsx("code", { className: "mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400", children: "- [ ] \uD560 \uC77C" })] }) : h.categories.map((S, M) => {
    const A = S.tasks.length, I = S.tasks.filter((T) => T.completed).length, O = A > 0 ? Math.round(I / A * 100) : 0, q = !!l[S.name], b = S.tasks.filter(R);
    return n && b.length === 0 ? null : o.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70", children: [o.jsxs("button", { type: "button", onClick: () => C(S.name), className: "flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40", children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [o.jsx("span", { className: "shrink-0 text-slate-500", children: q ? o.jsx(El, { className: "h-3.5 w-3.5" }) : o.jsx(ms, { className: "h-3.5 w-3.5" }) }), o.jsx("span", { className: "truncate text-[12px] font-semibold text-slate-200", children: S.name })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [o.jsxs("span", { className: "text-[10px] font-medium text-slate-400", children: [o.jsx("strong", { className: "text-slate-200", children: I }), " / ", A] }), o.jsxs("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${O === 100 ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border border-indigo-500/20 bg-indigo-500/10 text-indigo-400"}`, children: [O, "%"] })] })] }), q && o.jsx("div", { className: "space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2", children: b.length === 0 ? o.jsx("p", { className: "py-1 pl-5 text-[11px] text-slate-500", children: "\uC870\uAC74\uC5D0 \uC77C\uCE58\uD558\uB294 \uD0DC\uC2A4\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : b.map((T) => o.jsxs("button", { type: "button", onClick: () => P(T.lineIndex), style: { paddingLeft: `${T.indent * 12 + 8}px` }, className: "flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50", children: [o.jsx("span", { className: "mt-0.5 shrink-0 text-slate-400", children: T.completed ? o.jsx(Bn, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(zn, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${T.completed ? "text-slate-500 line-through" : "text-slate-300"}`, children: T.text })] }, T.id)) })] }, `${S.name}-${M}`);
  }) }), p === "checklist" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5", children: h.categories.map((S, M) => {
    const A = S.tasks.filter(R);
    return A.length === 0 ? null : o.jsxs("div", { className: "space-y-1", children: [o.jsxs("div", { className: "sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400", children: [S.name, " (", A.length, ")"] }), A.map((I) => o.jsxs("button", { type: "button", onClick: () => P(I.lineIndex), style: { paddingLeft: `${I.indent * 10 + 6}px` }, className: "flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60", children: [o.jsx("span", { className: "mt-0.5 shrink-0", children: I.completed ? o.jsx(Bn, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(zn, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${I.completed ? "text-slate-500 line-through" : "text-slate-200"}`, children: I.text })] }, I.id))] }, `${S.name}-list-${M}`);
  }) })] })] });
}
const ws = "s3haim-checklist-progress-modal-position", Zn = { leftVw: 58, topVh: 14 };
function vu() {
  try {
    const e = localStorage.getItem(ws);
    if (!e) return { ...Zn };
    const t = JSON.parse(e), n = Number(t == null ? void 0 : t.leftVw), r = Number(t == null ? void 0 : t.topVh);
    return !Number.isFinite(n) || !Number.isFinite(r) ? { ...Zn } : { leftVw: Math.min(95, Math.max(0, n)), topVh: Math.min(95, Math.max(0, r)) };
  } catch {
    return { ...Zn };
  }
}
function ku({ leftVw: e, topVh: t }) {
  try {
    localStorage.setItem(ws, JSON.stringify({ leftVw: Math.min(95, Math.max(0, e)), topVh: Math.min(95, Math.max(0, t)) }));
  } catch {
  }
}
const ys = "(max-width: 768px)", Eu = 5;
function co() {
  return typeof window < "u" && window.matchMedia(ys).matches;
}
function Su({ editorRef: e, onChange: t, open: n, onOpenChange: r }) {
  const [i, s] = a.useState(() => vu()), [l, u] = a.useState(""), [p, m] = a.useState({ from: 0, to: 0 }), h = a.useRef({ active: false, startX: 0, startY: 0, startLeftVw: 0, startTopVh: 0 }), P = a.useCallback(() => {
    const { text: M, from: A, to: I } = Ft(e);
    return u(M), m({ from: A, to: I }), M;
  }, [e]);
  a.useEffect(() => {
    if (n) {
      if (co()) {
        r == null ? void 0 : r(false);
        return;
      }
      P();
    }
  }, [n, P, r]), a.useEffect(() => {
    if (!n) return;
    const M = window.matchMedia(ys), A = (I) => {
      I.matches && (r == null ? void 0 : r(false));
    };
    return M.addEventListener("change", A), () => M.removeEventListener("change", A);
  }, [n, r]);
  const C = a.useCallback((M) => {
    if (M.button !== 0) return;
    M.preventDefault();
    const A = M.clientX, I = M.clientY;
    h.current = { active: true, startX: A, startY: I, startLeftVw: i.leftVw, startTopVh: i.topVh };
    const O = (b) => {
      if (!h.current.active) return;
      Math.hypot(b.clientX - A, b.clientY - I) <= Eu;
      const T = window.innerWidth || 1, X = window.innerHeight || 1, E = (b.clientX - h.current.startX) / T * 100, D = (b.clientY - h.current.startY) / X * 100;
      s({ leftVw: Math.min(92, Math.max(0, h.current.startLeftVw + E)), topVh: Math.min(90, Math.max(0, h.current.startTopVh + D)) });
    }, q = () => {
      h.current.active && (h.current.active = false, document.removeEventListener("pointermove", O), document.removeEventListener("pointerup", q), s((b) => (ku(b), b)));
    };
    document.addEventListener("pointermove", O), document.addEventListener("pointerup", q);
  }, [i.leftVw, i.topVh]), R = a.useCallback((M) => {
    u(M);
    const { view: A } = Ft(e), { from: I, to: O } = p;
    hr(A, I, O, M, t) && m({ from: I, to: I + M.length });
  }, [e, p, t]), S = () => {
    r == null ? void 0 : r(false);
  };
  return !n || co() ? null : o.jsxs("div", { className: "fixed z-[10050] w-[min(92vw,440px)] rounded-lg border border-indigo-400/40 bg-slate-950/95 shadow-2xl backdrop-blur-md", style: { left: `${i.leftVw}vw`, top: `${i.topVh}vh` }, role: "dialog", "aria-modal": "false", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: [o.jsxs("div", { className: "flex cursor-grab items-center justify-between gap-2 border-b border-indigo-500/30 bg-indigo-950/50 px-3 py-2 active:cursor-grabbing", onPointerDown: C, children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-indigo-100", children: [o.jsx(fs, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), o.jsx(Er, { size: 16, className: "shrink-0", "aria-hidden": true }), o.jsx("span", { className: "truncate", children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960" })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [o.jsxs("button", { type: "button", onPointerDown: (M) => M.stopPropagation(), onClick: P, className: "inline-flex items-center gap-1 rounded px-1.5 py-1 text-[11px] text-indigo-200 hover:bg-indigo-900/50", title: "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", "aria-label": "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", children: [o.jsx(Sl, { size: 14 }), o.jsx("span", { className: "hidden sm:inline", children: "\uC0C8\uB85C\uACE0\uCE68" })] }), o.jsx("button", { type: "button", onPointerDown: (M) => M.stopPropagation(), onClick: S, className: "rounded p-1 text-indigo-200 hover:bg-indigo-900/50", title: "\uB2EB\uAE30", "aria-label": "\uB2EB\uAE30", children: o.jsx(Vt, { size: 15 }) })] })] }), o.jsx("div", { className: "max-h-[min(72vh,640px)] overflow-y-auto p-3", children: l.trim() ? o.jsx(yu, { markdown: l, onMarkdownChange: R }) : o.jsxs("p", { className: "rounded-lg border border-dashed border-slate-700 bg-slate-900/60 px-3 py-6 text-center text-xs text-slate-400", children: ["\uC5D0\uB514\uD130\uC5D0\uC11C \uCCB4\uD06C\uB9AC\uC2A4\uD2B8\uAC00 \uD3EC\uD568\uB41C \uD14D\uC2A4\uD2B8\uB97C \uC120\uD0DD\uD55C \uB4A4", o.jsx("br", {}), "\uD234\uBC14 \uBC84\uD2BC\uC744 \uB204\uB974\uAC70\uB098 \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694."] }) })] });
}
const Cu = "(max-width: 768px)";
function Nu() {
  return typeof window < "u" && window.matchMedia(Cu).matches;
}
function Mu({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item max-md:hidden", onClick: () => {
    Nu() || (e == null ? void 0 : e());
  }, title: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: o.jsx(Er, { className: "md-editor-icon", size: 16 }) });
}
function ju({ value: e = "", theme: t = "light", currentFile: n = null, disabled: r, trigger: i }) {
  const s = qo(), l = a.useCallback(() => {
    r || (os({ currentFile: n, editorContent: e }), s(ss(n == null ? void 0 : n.id), { state: { value: e, theme: t, currentFile: n } }));
  }, [s, e, t, r, n]);
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: l, disabled: r, title: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", "aria-label": "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", children: i ?? o.jsx(Cl, { className: "md-editor-icon", size: 16 }) });
}
function Lu({ editorRef: e }) {
  const t = a.useCallback(() => {
    var _a2, _b, _c2, _d2;
    const n = ((_a2 = e.current) == null ? void 0 : _a2.value) ?? e.current;
    if (!n) return;
    const r = `

<pgbr/>

`;
    if (typeof n.insert == "function") {
      n.insert(() => ({ targetValue: r, select: false, deviationStart: 0, deviationEnd: 0 })), (_b = n.focus) == null ? void 0 : _b.call(n);
      return;
    }
    const i = (_c2 = n.getEditorView) == null ? void 0 : _c2.call(n);
    i && (i.dispatch(i.state.replaceSelection(r)), (_d2 = i.focus) == null ? void 0 : _d2.call(i));
  }, [e]);
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: t, title: "Insert print page break (<pgbr/>)", "aria-label": "Insert print page break", children: o.jsx(Nl, { className: "md-editor-icon", size: 16 }) });
}
function Tu({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", title: "\uCD5C\uB300 heading \uBCC0\uACBD", "aria-label": "\uCD5C\uB300 heading \uBCC0\uACBD", onClick: () => e(), children: o.jsx(Ml, { className: "md-editor-icon", size: 16 }) });
}
const Pu = [{ value: "selection", title: "\uC120\uD0DD \uC601\uC5ED", description: "\uD604\uC7AC \uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uB9CC \uBCC0\uACBD" }, { value: "document", title: "\uC804\uCCB4 \uBB38\uC11C", description: "\uBB38\uC11C \uC804\uCCB4 heading\uC744 \uBCC0\uACBD" }], Ru = [{ value: "flat", title: "1. \uD615\uC2DD", description: "\uCD5C\uB300 heading\uC744 \uD55C \uC790\uB9AC \uBC88\uD638\uB85C \uC2DC\uC791" }, { value: "nested", title: "2.1. \uD615\uC2DD", description: "heading \uC218\uC900\uB9CC\uD07C \uBC88\uD638\uB97C \uBD99\uC784" }], Au = [{ value: 1, title: "1\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 1. / 1.1. \u2026" }, { value: 2, title: "2\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 2. / 2.1. \u2026" }], Du = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), Iu = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", uo = "z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function _u({ isOpen: e, markdown: t, selectedMarkdown: n = "", onClose: r, onApply: i }) {
  const s = n.length > 0, [l, u] = a.useState("document"), [p, m] = a.useState(1), [h, P] = a.useState(false), [C, R] = a.useState("nested"), [S, M] = a.useState(1), A = l === "selection" ? n : t;
  a.useEffect(() => {
    if (!e) return;
    const b = s ? "selection" : "document";
    u(b), m(Br(b === "selection" ? n : t)), P(false), R("nested"), M(1);
  }, [e, t, n, s]), a.useEffect(() => {
    if (!e) return;
    const b = (E) => {
      const D = E;
      return (D == null ? void 0 : D.closest) ? !!D.closest('.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]') : false;
    }, T = () => {
      const E = document.activeElement;
      E && b(E) && typeof E.blur == "function" && E.blur();
    };
    T();
    const X = (E) => {
      if (E.metaKey || E.ctrlKey || E.altKey) return;
      const D = E.key;
      if (D >= "1" && D <= "9") {
        const K = Number(D);
        zr(K) && (E.preventDefault(), E.stopPropagation(), E.stopImmediatePropagation(), m(K));
        return;
      }
      E.key === "Escape" || E.key === "Enter" || b(E.target) && (E.preventDefault(), E.stopPropagation(), E.stopImmediatePropagation(), T());
    };
    return window.addEventListener("keydown", X, true), () => window.removeEventListener("keydown", X, true);
  }, [e]);
  const I = a.useMemo(() => Ji(A, p, { maxLevel: Vr, renumberOutline: h, outlineStyle: C, outlineStart: S }), [A, p, h, C, S]), O = (b) => {
    if (b !== "selection" && b !== "document" || b === "selection" && !s) return;
    u(b), m(Br(b === "selection" ? n : t));
  }, q = () => {
    if (!I.sourceMax) return;
    const b = na(A, p, { maxLevel: Vr, renumberOutline: h, outlineStyle: C, outlineStart: S });
    b !== A && i(b, l), r();
  };
  return o.jsx(Kt, { isOpen: e, onClose: r, onConfirm: q, contentClassName: "max-w-3xl", children: o.jsx(hs, { delayDuration: 250, skipDelayDuration: 0, children: o.jsxs("div", { className: "flex min-h-0 flex-1 flex-col p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uCD5C\uB300 heading \uBCC0\uACBD" }), o.jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-odp-muted", children: ["\uAC10\uC9C0\uB41C \uCD5C\uB300 heading\uC744 \uC120\uD0DD\uD55C \uB2E8\uACC4\uB85C \uBC14\uAFB8\uACE0, \uD558\uC704 heading\uB3C4 \uAC19\uC740 \uAC04\uACA9\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.", " ", "\uC22B\uC790 \uD0A4 1\u20139\uB85C \uCD5C\uB300 heading\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC801\uC6A9 \uBC94\uC704" }), o.jsx(Vn, { className: "flex items-center gap-2", value: l, onValueChange: O, "aria-label": "\uCD5C\uB300 heading \uC801\uC6A9 \uBC94\uC704", children: Pu.map((b) => {
    const T = l === b.value, X = b.value === "selection" && !s;
    return o.jsx(Wn, { value: b.value, disabled: X, className: ["flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", T ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: T ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: b.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: b.value === "selection" && !s ? "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" : b.description })] }) }, b.value);
  }) })] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("label", { htmlFor: "editor-heading-max", className: "mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading" }), o.jsxs(Kl, { value: String(p), onValueChange: (b) => {
    const T = Number(b);
    zr(T) && m(T);
  }, children: [o.jsxs(Vl, { id: "editor-heading-max", "aria-label": "\uCD5C\uB300 heading", className: "inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [o.jsx(Wl, {}), o.jsx(Ul, { className: "text-gray-500", children: o.jsx(ms, { size: 14 }) })] }), o.jsx(ql, { children: o.jsx(Xl, { className: "z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: o.jsx(Yl, { className: "p-1", children: Qi.map((b) => o.jsxs(Gl, { value: String(b), className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [o.jsx(Zl, { className: "absolute left-1.5 inline-flex items-center", children: o.jsx(vn, { size: 12 }) }), o.jsx(Jl, { children: `h${b}` })] }, b)) }) }) })] })] }), o.jsxs("div", { className: "mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft", children: [o.jsxs("div", { className: "flex items-center justify-between gap-3", children: [o.jsxs("div", { className: "min-w-0", children: [o.jsx("div", { className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: "outline \uBC88\uD638 \uB9DE\uCD94\uAE30" }), o.jsx("p", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC55E\uC758 1. / 2.1. \uAC19\uC740 \uBC88\uD638\uB97C \uD604\uC7AC heading \uC218\uC900\uC5D0 \uB9DE\uAC8C \uB2E4\uC2DC \uBD99\uC785\uB2C8\uB2E4." })] }), o.jsx(Sr, { className: Du(h), checked: h, onCheckedChange: P, "aria-label": "outline \uBC88\uD638 \uB9DE\uCD94\uAE30", children: o.jsx(Cr, { className: Iu }) })] }), h ? o.jsxs("div", { className: "mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60", children: [o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD" }), o.jsx(Vn, { className: "flex items-center gap-2", value: C, onValueChange: (b) => {
    (b === "flat" || b === "nested") && R(b);
  }, "aria-label": "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD", children: Ru.map((b) => {
    const T = C === b.value;
    return o.jsx(Wn, { value: b.value, className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", T ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: T ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: b.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: b.description })] }) }, b.value);
  }) })] }), o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), o.jsx(Vn, { className: "flex items-center gap-2", value: String(S), onValueChange: (b) => {
    b === "1" && M(1), b === "2" && M(2);
  }, "aria-label": "\uCD5C\uB300 heading \uC2DC\uC791 \uBC88\uD638", children: Au.map((b) => {
    const T = S === b.value;
    return o.jsx(Wn, { value: String(b.value), className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", T ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: T ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: b.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: b.description })] }) }, b.value);
  }) })] })] }) : null] }), o.jsx("div", { className: "mt-4 min-h-0", children: I.rows.length ? o.jsx("div", { className: "max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-odp-borderSoft", children: o.jsxs("table", { className: "w-full table-fixed border-collapse text-left text-sm", children: [o.jsx("thead", { className: "sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft", children: o.jsxs("tr", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874 \uC81C\uBAA9" }), o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD\uB420 \uC81C\uBAA9" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD" })] }) }), o.jsx("tbody", { children: I.rows.map((b, T) => o.jsxs("tr", { className: "border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60", children: [o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(lr, { children: [o.jsx(cr, { asChild: true, children: o.jsx("span", { className: "block truncate", children: b.text || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(ur, { children: o.jsxs(dr, { side: "top", sideOffset: 6, className: uo, children: [b.text || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(fr, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(lr, { children: [o.jsx(cr, { asChild: true, children: o.jsx("span", { className: "block truncate", children: b.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(ur, { children: o.jsxs(dr, { side: "top", sideOffset: 6, className: uo, children: [b.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(fr, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted", children: ["h", b.from] }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: ["h", b.to] })] }, `${b.from}-${T}-${b.text}`)) })] }) }) : o.jsx("p", { className: "rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted", children: l === "selection" ? "\uC120\uD0DD \uC601\uC5ED\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBB38\uC11C\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) }), o.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [o.jsxs(Kr, { type: "button", variant: "secondary", size: "md", onClick: r, children: [o.jsx(ea, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs(Kr, { type: "button", variant: "primary", size: "md", onClick: q, disabled: !I.sourceMax, children: [o.jsx(ta, { size: 16 }), "\uC801\uC6A9"] })] })] }) }) });
}
function Cn({ checked: e = false, onChange: t, theme: n = "light", title: r, ariaLabel: i, icon: s }) {
  const l = n === "dark", u = i || r;
  return o.jsx("span", { className: "md-editor-toolbar-item inline-flex items-center !w-auto !min-w-0 px-1", title: r, children: o.jsxs("label", { className: "inline-flex shrink-0 cursor-pointer select-none items-center gap-1", onMouseDown: (p) => {
    p.preventDefault();
  }, children: [o.jsx(s, { className: `md-editor-icon shrink-0 ${l ? "text-odp-muted" : "text-gray-500"}`, size: 16, "aria-hidden": true }), o.jsx(Sr, { checked: e, onCheckedChange: (p) => t == null ? void 0 : t(!!p), "aria-label": u, className: ["relative h-4 w-7 rounded-full border-0 outline-none transition-colors", "focus-visible:ring-2 focus-visible:ring-blue-400", e ? "bg-blue-600 dark:bg-blue-500" : l ? "bg-odp-borderStrong" : "bg-gray-300"].join(" "), children: o.jsx(Cr, { className: ["block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform", "data-[state=checked]:translate-x-3.5"].join(" ") }) })] }) });
}
function $u({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(Cn, { checked: e, onChange: t, theme: n, icon: jl, title: e ? "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8 \uCF1C\uC9D0" : "\uBAA9\uCC28 \uC81C\uBAA9 \uB9D0\uC904\uC784(...)", ariaLabel: "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8" });
}
function Fu({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(Cn, { checked: e, onChange: t, theme: n, icon: Ll, title: e ? "base64 \uC774\uBBF8\uC9C0 \uC811\uD798" : "base64 \uC774\uBBF8\uC9C0 \uD3BC\uCE68", ariaLabel: "base64 \uC774\uBBF8\uC9C0 \uC811\uAE30" });
}
function Hu({ checked: e = true, onChange: t, theme: n = "light" }) {
  return o.jsx(Cn, { checked: e, onChange: t, theme: n, icon: ps, title: e ? "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uCF1C\uC9D0" : "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uAEBC\uC9D0", ariaLabel: "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C" });
}
function Ou({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(Cn, { checked: e, onChange: t, theme: n, icon: Tl, title: e ? "Mirror Edit on \u2014 dual caret + instant preview sync" : "Mirror Edit off", ariaLabel: "Mirror Edit" });
}
function Bu({ onRequestLink: e, onRequestUpload: t, onRequestClip: n, disabled: r = false }) {
  const [i, s] = a.useState(false), l = a.useRef(null), u = a.useRef(null), p = a.useCallback(() => s(false), []);
  return o.jsxs(o.Fragment, { children: [o.jsx(Qs, { title: "\uC774\uBBF8\uC9C0", visible: i, onChange: s, disabled: r, overlay: o.jsxs("ul", { className: "md-editor-menu", role: "menu", onClick: p, children: [o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => e(), onKeyDown: (m) => {
    (m.key === "Enter" || m.key === " ") && (m.preventDefault(), e());
  }, children: "\uB9C1\uD06C \uCD94\uAC00" }), o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => {
    var _a2;
    return (_a2 = l.current) == null ? void 0 : _a2.click();
  }, onKeyDown: (m) => {
    var _a2;
    (m.key === "Enter" || m.key === " ") && (m.preventDefault(), (_a2 = l.current) == null ? void 0 : _a2.click());
  }, children: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC" }), o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => {
    var _a2;
    return (_a2 = u.current) == null ? void 0 : _a2.click();
  }, onKeyDown: (m) => {
    var _a2;
    (m.key === "Enter" || m.key === " ") && (m.preventDefault(), (_a2 = u.current) == null ? void 0 : _a2.click());
  }, children: "\uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC" })] }), children: o.jsx(Pl, { className: "md-editor-icon", size: 16, "aria-hidden": true }) }), o.jsx("input", { ref: l, type: "file", accept: "image/*", multiple: true, className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (m) => {
    const h = Array.from(m.target.files || []);
    m.target.value = "", h.length && t(h);
  } }), o.jsx("input", { ref: u, type: "file", accept: "image/*", className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (m) => {
    var _a2;
    const h = (_a2 = m.target.files) == null ? void 0 : _a2[0];
    m.target.value = "", h && n(h);
  } })] });
}
function zu({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, i] = a.useState(""), [s, l] = a.useState(""), [u, p] = a.useState("");
  a.useEffect(() => {
    e && (i(""), l(""), p(""));
  }, [e]);
  const m = () => {
    const h = s.trim();
    if (!h) {
      p("\uC774\uBBF8\uC9C0 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ desc: r.trim(), url: h }), t();
  };
  return o.jsx(Kt, { isOpen: e, onClose: t, onConfirm: m, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C" }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC124\uBA85 (alt)" }), o.jsx("input", { type: "text", value: r, onChange: (h) => i(h.target.value), placeholder: "\uC120\uD0DD", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL" }), o.jsx("input", { type: "text", value: s, onChange: (h) => l(h.target.value), placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), u ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: u }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(Vt, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: m, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(vn, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function Ku({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, i] = a.useState(""), [s, l] = a.useState(""), [u, p] = a.useState(""), m = a.useRef(null);
  a.useEffect(() => {
    if (!e) return;
    i(""), l(""), p("");
    const C = window.setTimeout(() => {
      var _a2;
      return (_a2 = m.current) == null ? void 0 : _a2.focus();
    }, 40);
    return () => window.clearTimeout(C);
  }, [e]);
  const h = () => {
    const C = r.trim(), R = s.trim();
    if (!C && !R) {
      p("\uAC01\uC8FC \uC81C\uBAA9 \uB610\uB294 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ line1: C, line2: R }), t();
  }, P = (C) => {
    C.key === "Enter" && (!(C.metaKey || C.ctrlKey) || C.altKey || C.shiftKey || C.nativeEvent.isComposing || C.keyCode === 229 || (C.preventDefault(), C.stopPropagation(), h()));
  };
  return o.jsx(Kt, { isOpen: e, onClose: t, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uAC01\uC8FC \uC0BD\uC785" }), o.jsxs("p", { className: "text-xs leading-5 text-gray-500 dark:text-odp-muted", children: ["\uCCAB \uC904\uC740 \uC81C\uBAA9, \uB458\uC9F8 \uC904\uC740 URL\uC785\uB2C8\uB2E4. \uBCF8\uBB38 \uCEE4\uC11C\uC5D0", " ", o.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "[^N]" }), "\uC774 \uB4E4\uC5B4\uAC00\uACE0, \uBB38\uC11C \uD558\uB2E8 Sources\uC5D0 \uB450 \uC904\uC774 \uCD94\uAC00\uB429\uB2C8\uB2E4. Ctrl+Enter \uB610\uB294 \u2318+Enter\uB85C \uC0BD\uC785\uD569\uB2C8\uB2E4."] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC81C\uBAA9 (1\uC904)" }), o.jsx("input", { ref: m, type: "text", value: r, onChange: (C) => {
    i(C.target.value), u && p("");
  }, onKeyDown: P, placeholder: "\uC608: docs.docker.com - Compose services", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL (2\uC904)" }), o.jsx("input", { type: "text", value: s, onChange: (C) => {
    l(C.target.value), u && p("");
  }, onKeyDown: P, placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), u ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: u }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(Vt, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: h, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(vn, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function Vu({ isOpen: e, file: t, onClose: n, onConfirm: r }) {
  const [i, s] = a.useState("");
  return a.useEffect(() => {
    if (!e || !t) {
      s("");
      return;
    }
    const l = URL.createObjectURL(t);
    return s(l), () => {
      URL.revokeObjectURL(l);
    };
  }, [e, t]), o.jsx(Kt, { isOpen: e && !!t, onClose: n, contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: i ? o.jsx(cc, { imageSrc: i, ...(t == null ? void 0 : t.name) ? { fileName: t.name } : {}, onCancel: n, onConfirm: r }) : null });
}
const vs = "s3haim_md_editor_base64_image_fold";
function gr() {
  if (typeof window > "u") return true;
  try {
    const e = window.localStorage.getItem(vs);
    return e === null ? true : e === "1";
  } catch {
    return true;
  }
}
function Wu(e) {
  if (!(typeof window > "u")) try {
    window.localStorage.setItem(vs, e ? "1" : "0");
  } catch {
  }
}
function Uu() {
  const [e, t] = a.useState(gr), n = a.useCallback((r) => {
    t((i) => {
      const s = typeof r == "function" ? r(i) : !!r;
      return Wu(s), s;
    });
  }, []);
  return [e, n];
}
function qu() {
  const [e, t] = a.useState(is);
  a.useEffect(() => ra((r) => {
    t(r);
  }), []);
  const n = a.useCallback((r) => {
    t((i) => {
      const s = typeof r == "function" ? r(i) : !!r;
      return oa(s), s;
    });
  }, []);
  return [e, n];
}
function Xu() {
  const [e, t] = a.useState(sa);
  a.useEffect(() => ia((r) => {
    t(r);
  }), []);
  const n = a.useCallback((r) => {
    t((i) => {
      const s = typeof r == "function" ? r(i) : !!r;
      return aa(s), s;
    });
  }, []);
  return [e, n];
}
const Yu = 48, fo = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi, ks = Go.define(), Es = Go.define(), Ss = new wr();
function Gu(e) {
  const t = [];
  fo.lastIndex = 0;
  let n;
  for (; (n = fo.exec(e)) !== null; ) {
    const r = n[1] ?? "image", i = n[2] ?? "";
    if (i.length < Yu) continue;
    const s = n[0], l = s.length - i.length, u = n.index + l;
    t.push({ from: u, to: n.index + s.length, mime: r });
  }
  return t;
}
function Zu(e, t) {
  const n = Math.round(t * 3 / 4), r = n >= 1024 * 1024 ? `${(n / (1024 * 1024)).toFixed(1)}MB` : n >= 1024 ? `${Math.max(1, Math.round(n / 1024))}KB` : `${n}B`;
  return `\u2026${e} ${r}\u2026`;
}
class Ju extends ei {
  constructor(t, n, r) {
    super(), this.label = t, this.from = n, this.to = r;
  }
  toDOM(t) {
    const n = document.createElement("span");
    return n.textContent = this.label, n.className = "cm-base64-image-fold", n.title = "Click to expand base64 image data", n.addEventListener("mousedown", (r) => {
      r.preventDefault(), r.stopPropagation(), t.dispatch({ selection: { anchor: this.from }, effects: ks.of({ from: this.from, to: this.to }) }), t.focus();
    }), n.addEventListener("click", (r) => {
      r.preventDefault();
    }), n;
  }
  ignoreEvent() {
    return false;
  }
  eq(t) {
    return this.label === t.label && this.from === t.from && this.to === t.to;
  }
}
function Qu(e, t, n) {
  return e.some((r) => r.from === t && r.to === n);
}
function mo(e, t) {
  const n = [], r = [];
  for (let i = 1; i <= e.doc.lines; i += 1) {
    const s = e.doc.line(i);
    for (const l of Gu(s.text)) {
      const u = s.from + l.from, p = s.from + l.to;
      if (Qu(t, u, p)) {
        r.push({ from: u, to: p });
        continue;
      }
      n.push(Tr.replace({ widget: new Ju(Zu(l.mime, p - u), u, p) }).range(u, p));
    }
  }
  return { deco: Tr.set(n, true), expanded: r };
}
const Cs = Yo.define({ create(e) {
  return mo(e, []);
}, update(e, t) {
  let n = e.expanded;
  t.docChanged && n.length && (n = n.map(({ from: i, to: s }) => ({ from: t.changes.mapPos(i, 1), to: t.changes.mapPos(s, -1) })).filter(({ from: i, to: s }) => i < s));
  let r = n !== e.expanded;
  for (const i of t.effects) i.is(ks) ? (n = [{ from: i.value.from, to: i.value.to }], r = true) : i.is(Es) && n.length > 0 && (n = [], r = true);
  return t.docChanged || r ? mo(t.state, n) : e;
}, provide: (e) => _t.decorations.from(e, (t) => t.deco) }), ed = _t.domEventHandlers({ mousedown(e, t) {
  const n = t.state.field(Cs, false);
  if (!n || n.expanded.length === 0) return false;
  const r = e.target;
  if (!(r instanceof Node) || !t.dom.contains(r)) return false;
  const i = t.posAtDOM(r, 0);
  return i !== -1 && n.expanded.some(({ from: s, to: l }) => i >= s && i <= l) || t.dispatch({ effects: Es.of(null) }), false;
} });
function Ns() {
  return [Cs, ed];
}
function td(e) {
  return Ss.of(e ? Ns() : []);
}
function nd(e, t) {
  if (e) try {
    e.dispatch({ effects: Ss.reconfigure(t ? Ns() : []) });
  } catch {
  }
}
const Ms = new wr();
function rd(e, t, n) {
  let r = false;
  return es(e).between(t, n, () => {
    r = true;
  }), r;
}
function od(e) {
  const t = [], n = e.doc.toString();
  return yr(e).iterate({ enter(r) {
    if (r.name !== "FencedCode") return;
    const i = as(n, r.from, r.to);
    i && t.push(i);
  } }), t;
}
function js(e, t, n) {
  return e.some((r) => r.from === t && r.to === n);
}
const Ls = Yo.define({ create() {
  return [];
}, update(e, t) {
  let n = e;
  t.docChanged && n.length && (n = n.map(({ from: i, to: s }) => ({ from: t.changes.mapPos(i, 1), to: t.changes.mapPos(s, -1) })).filter(({ from: i, to: s }) => i < s));
  let r = n !== e;
  for (const i of t.effects) if (i.is(zt)) js(n, i.value.from, i.value.to) || (n = [...n, i.value], r = true);
  else if (i.is(mt)) {
    const s = n.filter((l) => l.from !== i.value.from || l.to !== i.value.to);
    s.length !== n.length && (n = s, r = true);
  }
  return r ? n : e;
} });
function po(e) {
  const t = e.state.field(Ls), n = [];
  for (const r of od(e.state)) js(t, r.from, r.to) || rd(e.state, r.from, r.to) || n.push(mt.of(r));
  n.length > 0 && e.dispatch({ effects: n });
}
const sd = Qo.fromClass(class {
  constructor(e) {
    po(e);
  }
  update(e) {
    e.docChanged && po(e.view);
  }
}), id = Jo.of((e, t) => {
  const n = e.doc.toString();
  let r = null;
  return yr(e).iterate({ enter(i) {
    if (i.name !== "FencedCode" || e.doc.lineAt(i.from).from !== t) return;
    const l = as(n, i.from, i.to);
    if (l) return r = l, false;
  } }), r;
});
function Ts() {
  return [Ls, Zo(), id, sd];
}
function ad(e) {
  return Ms.of(e ? Ts() : []);
}
function ld(e, t) {
  if (e) try {
    e.dispatch({ effects: Ms.reconfigure(t ? Ts() : []) });
  } catch {
  }
}
const bn = /* @__PURE__ */ new Set();
function cd(e) {
  return bn.add(e), () => {
    bn.delete(e);
  };
}
function ud(e) {
  if (!(!e.selectionSet && !e.docChanged) && !(e.view.composing || e.view.compositionStarted) && bn.size !== 0) for (const t of bn) try {
    t(e.view, e);
  } catch {
  }
}
const dd = `<br/>
`;
function fd(e) {
  if (!Ii() || !(e == null ? void 0 : e.state)) return false;
  const t = e.state.selection.main, n = dd;
  return e.dispatch({ changes: { from: t.from, to: t.to, insert: n }, selection: Ke.cursor(t.from + n.length), scrollIntoView: true }), true;
}
const ho = 80, md = 350;
function go(e) {
  return JSON.stringify(e);
}
function xo(e) {
  try {
    const t = JSON.parse(e);
    return !t || typeof t != "object" || !t.meta || typeof t.meta != "object" || !t.grid || !Array.isArray(t.grid.rows) ? null : t;
  } catch {
    return null;
  }
}
function pd(e) {
  return !Array.isArray(e) || e.length === 0 ? [] : e.length <= ho ? e : e.slice(e.length - ho);
}
function hd(e, t, n) {
  const r = Array.isArray(e) && e.length > 0 ? e : [];
  if (r.length === 0) return { stack: [n], index: 0, changed: true };
  const i = Math.max(0, Math.min(t, r.length - 1));
  if (r[i] === n) return { stack: r, index: i, changed: false };
  const s = r.slice(0, i + 1);
  s.push(n);
  const l = pd(s);
  return { stack: l, index: l.length - 1, changed: true };
}
function gd({ enabled: e, historyKey: t, meta: n, grid: r, applySnapshot: i }) {
  const s = a.useRef([]), l = a.useRef(0), u = a.useRef(false), p = a.useRef(false), m = a.useRef(null), h = a.useRef(null), P = a.useRef(i);
  P.current = i;
  const [C, R] = a.useState(0), S = a.useCallback(() => R((E) => E + 1), []), M = a.useCallback(() => {
    m.current && (clearTimeout(m.current), m.current = null);
  }, []), A = a.useCallback(() => go({ meta: n, grid: r }), [r, n]), I = a.useCallback(() => {
    M();
    const E = h.current;
    if (E == null) return;
    h.current = null;
    const D = hd(s.current, l.current, E);
    D.changed && (s.current = D.stack, l.current = D.index, S());
  }, [S, M]);
  a.useEffect(() => {
    if (!e) {
      M(), h.current = null, s.current = [], l.current = 0, p.current = false, S();
      return;
    }
    if (t <= 0) return;
    M(), h.current = null;
    const E = go({ meta: n, grid: r });
    s.current = [E], l.current = 0, p.current = true, S();
  }, [e, t, S, M]), a.useEffect(() => {
    if (!e || !p.current || u.current) return;
    const E = A();
    if (s.current[l.current] !== E) return h.current = E, M(), m.current = setTimeout(() => {
      m.current = null, I();
    }, md), () => {
      M();
    };
  }, [M, A, e, I, r, n]);
  const O = a.useCallback(() => {
    !e || !p.current || u.current || (h.current = A(), I());
  }, [A, e, I]), q = a.useCallback(() => {
    if (I(), l.current <= 0) return false;
    l.current -= 1;
    const E = s.current[l.current], D = E ? xo(E) : null;
    return D ? (u.current = true, P.current(D), S(), requestAnimationFrame(() => {
      u.current = false;
    }), true) : false;
  }, [S, I]), b = a.useCallback(() => {
    if (I(), l.current >= s.current.length - 1) return false;
    l.current += 1;
    const E = s.current[l.current], D = E ? xo(E) : null;
    return D ? (u.current = true, P.current(D), S(), requestAnimationFrame(() => {
      u.current = false;
    }), true) : false;
  }, [S, I]), T = e && p.current && l.current > 0, X = e && p.current && l.current < s.current.length - 1;
  return { undo: q, redo: b, canUndo: T, canRedo: X, recordNow: O, flushPendingRecord: I };
}
const xd = ["thead", "tbody", "tfoot"], Jn = 10, bo = 36, wo = 44, Et = 4, sn = 14, bd = "h-3.5 w-3.5 shrink-0", ce = "h-3 w-3 shrink-0", Qn = "__none__", wd = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), yd = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", yo = 288, Ps = 200, vd = 480, kd = 380, Ed = 560, vo = 16, Rt = 6, Sd = [{ value: "full", label: "\uD398\uC774\uC9C0 \uC804\uCCB4 (full)" }, { value: "fit", label: "\uB0B4\uC6A9\uB9CC\uD07C (fit)" }], Cd = [{ value: "left", label: "\uC67C\uCABD" }, { value: "right", label: "\uC624\uB978\uCABD" }], Nd = "pointer-events-none z-100050 max-w-[240px] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", Md = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", ko = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", Rs = typeof navigator < "u" && (/Mac|iPhone|iPad|iPod/i.test(navigator.platform) || /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent ?? "")), pt = Rs ? "\u2318" : "Ctrl", jd = `${pt}+E`, Ld = `${pt}+Shift+E`, Td = `${pt}+Shift+>`, Pd = `${pt}+Shift+<`, er = `${pt}+Z`, tr = Rs ? `${pt}+Shift+Z` : `${pt}+Y`, Rd = 14;
function Ad(e, t, n = Rd) {
  const r = (e || "").trim(), i = /^(\d+(?:\.\d+)?)(px|%|em|rem|pt)?$/i.exec(r), s = ((i == null ? void 0 : i[2]) || "px").toLowerCase(), l = i ? Number(i[1]) : n, u = s === "em" || s === "rem" ? 0.1 : 1, p = s === "em" || s === "rem" ? 0.5 : s === "%" ? 50 : 8;
  let m = (Number.isFinite(l) ? l : n) + t * u;
  return m = Math.max(p, m), s === "em" || s === "rem" ? m = Math.round(m * 10) / 10 : m = Math.round(m), `${m}${s}`;
}
function dt({ icon: e, children: t }) {
  return o.jsxs("span", { className: "inline-flex items-center gap-1", children: [o.jsx("span", { className: "inline-flex shrink-0 text-gray-400 dark:text-odp-muted", "aria-hidden": true, children: e }), t] });
}
function wt(e) {
  return Math.min(vd, Math.max(Ps, Math.round(e)));
}
function Eo({ onDelta: e, ariaLabel: t }) {
  const n = a.useRef(0);
  return o.jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": t, className: "group relative hidden w-1.5 shrink-0 cursor-col-resize touch-none select-none landscape:flex", onPointerDown: (r) => {
    r.preventDefault(), r.stopPropagation(), r.currentTarget.setPointerCapture(r.pointerId), n.current = r.clientX;
  }, onPointerMove: (r) => {
    if (!r.currentTarget.hasPointerCapture(r.pointerId)) return;
    const i = r.clientX - n.current;
    n.current = r.clientX, i !== 0 && e(i);
  }, onPointerUp: (r) => {
    r.currentTarget.hasPointerCapture(r.pointerId) && r.currentTarget.releasePointerCapture(r.pointerId);
  }, onPointerCancel: (r) => {
    r.currentTarget.hasPointerCapture(r.pointerId) && r.currentTarget.releasePointerCapture(r.pointerId);
  }, children: o.jsx("span", { className: "absolute inset-y-2 left-1/2 w-px -translate-x-1/2 rounded-full bg-gray-300 transition-colors group-hover:bg-blue-400 group-active:bg-blue-500 dark:bg-odp-borderStrong dark:group-hover:bg-blue-400", "aria-hidden": true }) });
}
function Dd(e, t) {
  return e === 0 ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC704\uC5D0 \uD589 \uCD94\uAC00" : e === t ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC544\uB798\uC5D0 \uD589 \uCD94\uAC00" : `\uB354\uBE14\uD074\uB9AD: ${e}\uD589 \uC704\uC5D0 \uD589 \uCD94\uAC00`;
}
function Id(e, t) {
  return e === 0 ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC55E\uC5D0 \uC5F4 \uCD94\uAC00" : e === t ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uB4A4\uC5D0 \uC5F4 \uCD94\uAC00" : `\uB354\uBE14\uD074\uB9AD: ${e}\uC5F4 \uC55E\uC5D0 \uC5F4 \uCD94\uAC00`;
}
function So(e) {
  return e === "row" ? "\uB4DC\uB798\uADF8: \uD589 \uB192\uC774 \uC870\uC808" : "\uB4DC\uB798\uADF8: \uC5F4 \uB108\uBE44 \uC870\uC808";
}
function Co(e, t, n, r, i, s) {
  const l = r.left - i.left, u = t - i.top, p = r.width, m = Math.min(Math.max(n - i.left, l), l + p);
  return { kind: "row", index: e, x: m, y: u, edge: { left: l, top: u - Et / 2, width: p, height: Et }, ghost: { left: l, top: u - bo / 2, width: p, height: bo }, label: Dd(e, s) };
}
function No(e, t, n, r, i, s) {
  const l = r.top - i.top, u = t - i.left, p = r.height, m = Math.min(Math.max(n - i.top, l), l + p);
  return { kind: "col", index: e, x: u, y: m, edge: { left: u - Et / 2, top: l, width: Et, height: p }, ghost: { left: u - wo / 2, top: l, width: wo, height: p }, label: Id(e, s) };
}
function _d({ tip: e, onDoubleClick: t, style: n }) {
  return o.jsxs(lr, { open: true, children: [o.jsx(cr, { asChild: true, children: o.jsx("button", { type: "button", "aria-label": e, style: n, onClick: (r) => {
    r.preventDefault(), r.stopPropagation();
  }, onDoubleClick: (r) => {
    r.preventDefault(), r.stopPropagation(), t();
  }, onMouseDown: (r) => {
    r.preventDefault(), r.stopPropagation();
  }, onPointerDown: (r) => {
    r.preventDefault(), r.stopPropagation();
  }, "data-haim-edge-add": "", className: "haim-table-insert-btn pointer-events-auto absolute z-30 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-400/80 bg-white text-blue-600 shadow-sm hover:bg-blue-50 dark:border-blue-400/70 dark:bg-odp-surface dark:text-blue-300 dark:hover:bg-blue-950/60", children: o.jsx(Bl, { className: "h-3 w-3", "aria-hidden": true }) }) }), o.jsx(ur, { children: o.jsxs(dr, { className: Nd, side: "top", sideOffset: 8, children: [e, o.jsx(fr, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function $d({ insert: e, tip: t, allowResize: n, onDoubleClickInsert: r, onResizePointerDown: i }) {
  const s = e.kind === "row", l = s ? { left: e.edge.left, top: e.edge.top + Et / 2 - sn / 2, width: e.edge.width, height: sn } : { left: e.edge.left + Et / 2 - sn / 2, top: e.edge.top, width: sn, height: e.edge.height };
  return o.jsx("div", { role: "presentation", title: t, "data-haim-edge-hit": "", className: `pointer-events-auto absolute z-[25] ${n ? s ? "cursor-row-resize" : "cursor-col-resize" : "cursor-pointer"}`, style: { left: l.left, top: l.top, width: l.width, height: l.height }, onMouseDown: (u) => {
    u.preventDefault(), u.stopPropagation();
  }, onPointerDown: (u) => {
    if (u.preventDefault(), u.stopPropagation(), u.button !== 0 || u.detail >= 2 || !n) return;
    const p = u.clientX, m = u.clientY, h = u;
    let P = false;
    const C = () => {
      document.removeEventListener("pointermove", R, true), document.removeEventListener("pointerup", S, true), document.removeEventListener("pointercancel", S, true);
    }, R = (M) => {
      P || Math.abs(M.clientX - p) < 3 && Math.abs(M.clientY - m) < 3 || (P = true, C(), i(h));
    }, S = () => {
      C();
    };
    document.addEventListener("pointermove", R, true), document.addEventListener("pointerup", S, true), document.addEventListener("pointercancel", S, true);
  }, onDoubleClick: (u) => {
    u.preventDefault(), u.stopPropagation(), r();
  } });
}
function Fd({ insert: e }) {
  const t = `${e.kind}-${e.index}`;
  return o.jsxs("div", { "data-haim-insert-preview": "", className: "contents", children: [o.jsx("div", { "aria-hidden": true, className: `pointer-events-none absolute z-10 rounded-sm border border-transparent bg-blue-400/[0.04] dark:bg-blue-400/[0.06] ${e.kind === "row" ? "haim-table-insert-ghost-row" : "haim-table-insert-ghost-col"}`, style: { left: e.ghost.left, top: e.ghost.top, width: e.ghost.width, height: e.ghost.height } }, `ghost-${t}`), o.jsx("div", { "aria-hidden": true, className: "haim-table-insert-glow pointer-events-none absolute z-[11] rounded-full", style: { left: e.edge.left, top: e.edge.top, width: e.edge.width, height: e.edge.height } }, `glow-${t}`)] });
}
function Hd({ kind: e, indices: t, table: n, wrap: r, colCount: i }) {
  const [s, l] = a.useState([]);
  return a.useEffect(() => {
    if (!n || !r || !t.length) {
      l([]);
      return;
    }
    const u = () => {
      const p = r.getBoundingClientRect(), m = n.getBoundingClientRect(), h = [];
      if (e === "row") for (const P of t) {
        const C = n.rows[P];
        if (!C) continue;
        const R = C.getBoundingClientRect();
        h.push({ left: m.left - p.left, top: R.top - p.top, width: m.width, height: Math.max(1, R.height) });
      }
      else {
        const P = As(n, i);
        for (const C of t) {
          const R = P[C], S = P[C + 1];
          R == null || S == null || h.push({ left: R - p.left, top: m.top - p.top, width: Math.max(1, S - R), height: m.height });
        }
      }
      l(h);
    };
    return u(), window.addEventListener("resize", u), () => window.removeEventListener("resize", u);
  }, [i, t, e, n, r]), s.length ? o.jsx("div", { "data-haim-delete-preview": "", className: "pointer-events-none absolute inset-0 z-20", "aria-hidden": true, children: s.map((u, p) => o.jsx("div", { className: "absolute rounded-sm bg-red-500/25 ring-1 ring-inset ring-red-500/50 dark:bg-red-500/30 dark:ring-red-400/40", style: { left: u.left, top: u.top, width: u.width, height: u.height } }, `${e}-${t[p] ?? p}`)) }) : null;
}
function Od(e) {
  const t = [...e.rows];
  if (!t.length) return [];
  const n = [];
  for (let r = 0; r < t.length; r += 1) n.push(t[r].getBoundingClientRect().top);
  return n.push(t[t.length - 1].getBoundingClientRect().bottom), n;
}
function As(e, t) {
  const n = e.getBoundingClientRect(), r = [];
  for (let l = 0; l < t; l += 1) {
    const u = e.querySelectorAll(`[data-edit-c="${l}"]`);
    let p = null;
    u.forEach((m) => {
      const h = m.getBoundingClientRect();
      (p == null || h.left < p) && (p = h.left);
    }), p != null ? r.push(p) : r.push(n.left + n.width * l / Math.max(t, 1));
  }
  let i = n.right;
  return e.querySelectorAll(`[data-edit-c="${t - 1}"]`).forEach((l) => {
    const u = l.getBoundingClientRect();
    u.right > i && (i = u.right);
  }), r.push(i), r;
}
function Bd(e, t, n) {
  var _a2, _b;
  if (!n.length || typeof document > "u") return null;
  const i = (_b = (_a2 = document.elementFromPoint(e, t)) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "td[data-edit-r][data-edit-c]");
  if (!i) return null;
  const s = Number(i.getAttribute("data-edit-r")), l = Number(i.getAttribute("data-edit-c"));
  return !Number.isInteger(s) || !Number.isInteger(l) ? null : ya(n, s, l);
}
function Mo(e, t, n) {
  return e === "col" ? n.colspan > 1 && n.c < t && t < n.c + n.colspan : n.rowspan > 1 && n.r < t && t < n.r + n.rowspan;
}
function At(e, t, n, r, i, s, l) {
  const u = e.getBoundingClientRect(), p = t.getBoundingClientRect(), m = Jn + 2;
  if (n < u.left - m || n > u.right + m || r < u.top - m || r > u.bottom + m) return null;
  const h = Od(e), P = As(e, s), C = Bd(n, r, l);
  let R = null;
  for (let M = 0; M < h.length; M += 1) {
    if (C && Mo("row", M, C)) continue;
    const A = h[M], I = Math.abs(r - A);
    I <= Jn && n >= u.left - m && n <= u.right + m && (!R || I < R.dist) && (R = { index: M, dist: I, y: A });
  }
  let S = null;
  for (let M = 0; M < P.length; M += 1) {
    if (C && Mo("col", M, C)) continue;
    const A = P[M], I = Math.abs(n - A);
    I <= Jn && r >= u.top - m && r <= u.bottom + m && (!S || I < S.dist) && (S = { index: M, dist: I, x: A });
  }
  return R && S ? R.dist <= S.dist ? Co(R.index, R.y, n, u, p, i) : No(S.index, S.x, r, u, p, s) : R ? Co(R.index, R.y, n, u, p, i) : S ? No(S.index, S.x, r, u, p, s) : null;
}
function zd({ isOpen: e, initialMeta: t, initialGrid: n, onClose: r, onSave: i }) {
  var _a2, _b, _c2, _d2, _e2, _f2;
  const [s, l] = a.useState(pn()), [u, p] = a.useState(n), [m, h] = a.useState(null), [P, C] = a.useState(false), [R, S] = a.useState("thead"), [M, A] = a.useState([]), [I, O] = a.useState(false), [q, b] = a.useState(null), [T, X] = a.useState(null), [E, D] = a.useState(false), [K, J] = a.useState(0), [Q, re] = a.useState(null), [ae, le] = a.useState(null), we = a.useRef(null), [te, W] = a.useState(null), ee = te !== null, pe = ls(), [Se, We] = a.useState(yo), [$e, ie] = a.useState(yo), [ue, Ce] = a.useState(false), [de, Fe] = a.useState(false), [z, B] = a.useState(() => typeof window < "u" ? window.innerWidth : 1280), [ne, Z] = a.useState(() => typeof window < "u" ? window.matchMedia("(orientation: landscape)").matches : true), Ee = a.useRef(null), he = a.useRef(null), ye = a.useRef(null), Ae = a.useRef(null), fe = a.useRef(false), ge = a.useRef(null), me = a.useRef(null), De = a.useRef(false), je = a.useRef(false), He = a.useRef({ x: 0, y: 0 });
  Ae.current = T, fe.current = P, me.current = m, De.current = ue, je.current = ee, we.current = ae;
  const Oe = a.useRef(t), xe = a.useRef(n);
  Oe.current = t, xe.current = n, a.useEffect(() => {
    if (!e) return;
    const c = Oe.current, d = xe.current;
    l(c ? { ...c } : pn()), p({ rows: d.rows.map((w) => [...w]), aligns: [...d.aligns] }), h(null), C(false), ge.current = null, X(null), Ce(false), Fe(false), W(null), le(null), J((w) => w + 1), la().then((w) => A(w.templates)), ca().then((w) => ua(w));
  }, [e]);
  const Be = a.useCallback((c) => {
    l(c.meta), p({ rows: c.grid.rows.map((d) => [...d]), aligns: [...c.grid.aligns ?? []] }), h(null), C(false), ge.current = null, X(null);
  }, []), { undo: Ge, redo: Le, canUndo: Ue, canRedo: st, recordNow: Je } = gd({ enabled: e, historyKey: K, meta: s, grid: u, applySnapshot: Be }), Qe = a.useRef(false);
  a.useEffect(() => {
    Qe.current && !E && Je(), Qe.current = E;
  }, [E, Je]), a.useEffect(() => {
    if (!e) return;
    const c = (d) => {
      if (!(d.metaKey || d.ctrlKey) || d.altKey) return;
      const N = d.key.toLowerCase(), k = N === "z" && !d.shiftKey, F = N === "y" || N === "z" && d.shiftKey;
      !k && !F || (d.preventDefault(), d.stopPropagation(), d.stopImmediatePropagation(), F ? Le() : Ge());
    };
    return window.addEventListener("keydown", c, true), () => window.removeEventListener("keydown", c, true);
  }, [e, Le, Ge]), a.useEffect(() => {
    if (!e || typeof window > "u") return;
    const c = window.matchMedia("(orientation: landscape)"), d = () => {
      B(window.innerWidth), Z(c.matches);
    };
    return d(), window.addEventListener("resize", d), c.addEventListener("change", d), () => {
      window.removeEventListener("resize", d), c.removeEventListener("change", d);
    };
  }, [e]);
  const Me = a.useMemo(() => da(s.merges), [s.merges]), Ne = u.rows.length, j = Math.max(1, ...u.rows.map((c) => c.length), u.aligns.length), $ = a.useMemo(() => {
    if (!m) return [];
    const c = [], d = Math.min(m.r0, m.r1), w = Math.min(m.c0, m.c1), N = Math.max(m.r0, m.r1), k = Math.max(m.c0, m.c1);
    for (let F = d; F <= N; F += 1) for (let G = w; G <= k; G += 1) Me.has(`${F},${G}`) || c.push({ r: F, c: G });
    return c;
  }, [m, Me]), Y = $[0] ?? null, et = !!Y, it = a.useRef(Se), tt = a.useRef($e);
  it.current = Se, tt.current = $e;
  const gt = a.useMemo(() => {
    const c = z * 0.95;
    return Math.max(Ps, c - vo - Rt - kd);
  }, [z]), Ut = a.useCallback((c) => {
    const d = it.current, w = tt.current, N = d + w;
    let k = wt(d + c), F = wt(N - k);
    k = wt(N - F), F = wt(N - k), We(k), ie(F);
  }, []), qt = a.useCallback((c) => {
    ie((d) => {
      const w = wt(d + c);
      if (Se + Rt + w <= gt) return w;
      const k = gt - Se - Rt;
      return wt(k);
    });
  }, [gt, Se]), Mn = a.useMemo(() => {
    const c = z * 0.95;
    if (!ne) return { width: c, maxWidth: "95dvw", height: "95dvh", maxHeight: "95dvh" };
    const d = Se + Rt + $e;
    return { width: Math.min(c, vo + d + Rt + Ed), maxWidth: "95dvw", height: "95dvh", maxHeight: "95dvh" };
  }, [$e, ne, Se, z]), xt = a.useMemo(() => Y ? s.cells[Ve(Y.r, Y.c)] ?? {} : {}, [s.cells, Y]), Ie = a.useCallback((c) => {
    $.length && l((d) => {
      const w = { ...d.cells };
      for (const { r: N, c: k } of $) {
        const F = Ve(N, k);
        Wr(c) ? delete w[F] : w[F] = c;
      }
      return { ...d, cells: w };
    });
  }, [$]), ve = a.useCallback((c) => {
    p(c.grid), l(c.meta), h(null), C(false), ge.current = null, X(null);
  }, []), Te = a.useRef(u), qe = a.useRef(s);
  Te.current = u, qe.current = s;
  const Xt = a.useCallback((c) => {
    ve(Nc(Te.current, qe.current, c));
  }, [ve]), Yt = a.useCallback((c) => {
    ve(Mc(Te.current, qe.current, c));
  }, [ve]), at = a.useCallback((c) => {
    const d = me.current;
    let w, N;
    if (d) w = Math.min(d.r0, d.r1), N = Math.max(d.r0, d.r1), c != null && (c < w || c > N) && (w = c, N = c);
    else if (c != null) w = c, N = c;
    else {
      const G = we.current;
      (G == null ? void 0 : G.kind) === "row" && G.indices.length && (le(null), re({ kind: "row", indices: [...G.indices] }));
      return;
    }
    const k = [];
    for (let G = w; G <= N; G += 1) k.push(G);
    const F = Te.current.rows.length;
    F <= 1 || k.length === 0 || k.length >= F || (le(null), re({ kind: "row", indices: k }));
  }, []), Gt = a.useCallback((c) => {
    const d = me.current;
    let w, N;
    if (d) w = Math.min(d.c0, d.c1), N = Math.max(d.c0, d.c1), c != null && (c < w || c > N) && (w = c, N = c);
    else if (c != null) w = c, N = c;
    else {
      const G = we.current;
      (G == null ? void 0 : G.kind) === "col" && G.indices.length && (le(null), re({ kind: "col", indices: [...G.indices] }));
      return;
    }
    const k = [];
    for (let G = w; G <= N; G += 1) k.push(G);
    const F = Math.max(1, ...Te.current.rows.map((G) => G.length), Te.current.aligns.length, 1);
    F <= 1 || k.length === 0 || k.length >= F || (le(null), re({ kind: "col", indices: k }));
  }, []), Zt = a.useCallback((c) => {
    const d = me.current;
    let w, N;
    d ? (w = Math.min(d.r0, d.r1), N = Math.max(d.r0, d.r1), (c < w || c > N) && (w = c, N = c)) : (w = c, N = c);
    const k = [];
    for (let G = w; G <= N; G += 1) k.push(G);
    const F = Te.current.rows.length;
    if (F <= 1 || k.length === 0 || k.length >= F) {
      le(null);
      return;
    }
    le({ kind: "row", indices: k });
  }, []), Jt = a.useCallback((c) => {
    const d = me.current;
    let w, N;
    d ? (w = Math.min(d.c0, d.c1), N = Math.max(d.c0, d.c1), (c < w || c > N) && (w = c, N = c)) : (w = c, N = c);
    const k = [];
    for (let G = w; G <= N; G += 1) k.push(G);
    const F = Math.max(1, ...Te.current.rows.map((G) => G.length), Te.current.aligns.length, 1);
    if (F <= 1 || k.length === 0 || k.length >= F) {
      le(null);
      return;
    }
    le({ kind: "col", indices: k });
  }, []), nt = a.useCallback(() => {
    le(null);
  }, []), jn = a.useCallback(() => {
    Q && (Q.kind === "row" ? ve(Tc(Te.current, qe.current, Q.indices)) : ve(Pc(Te.current, qe.current, Q.indices)), re(null), le(null));
  }, [ve, Q]), Xe = !!(m && !(m.r0 === m.r1 && m.c0 === m.c1)), bt = a.useCallback(() => {
    !m || m.r0 === m.r1 && m.c0 === m.c1 || l((c) => ({ ...c, merges: fa(c.merges, m.r0, m.c0, m.r1, m.c1) }));
  }, [m]), Mt = a.useCallback(() => {
    m && l((c) => ({ ...c, merges: ma(c.merges, m.r0, m.c0, m.r1, m.c1) }));
  }, [m]), Qt = a.useCallback((c) => {
    $.length && l((d) => {
      var _a3;
      const w = { ...d.cells }, N = (_a3 = d.style) == null ? void 0 : _a3.fontSize;
      for (const { r: k, c: F } of $) {
        const G = Ve(k, F), be = w[G] ?? {};
        w[G] = { ...be, fontSize: Ad(be.fontSize ?? N, c) };
      }
      return { ...d, cells: w };
    });
  }, [$]);
  a.useEffect(() => {
    if (!e) return;
    const c = (d) => {
      if (!(!(d.metaKey || d.ctrlKey) || d.altKey)) {
        if (d.shiftKey) {
          const w = d.code === "Period" || d.key === ">" || d.key === ".", N = d.code === "Comma" || d.key === "<" || d.key === ",";
          if (w || N) {
            if (!$.length) return;
            d.preventDefault(), d.stopPropagation(), Qt(w ? 1 : -1);
            return;
          }
        }
        d.code !== "KeyE" && d.key.toLowerCase() !== "e" || (d.preventDefault(), d.stopPropagation(), d.shiftKey ? Mt() : bt());
      }
    };
    return window.addEventListener("keydown", c, true), () => window.removeEventListener("keydown", c, true);
  }, [e, bt, Qt, $.length, Mt]);
  const Ln = a.useCallback((c) => {
    var _a3, _b2;
    if (je.current) {
      X(null);
      return;
    }
    if (P || E) {
      P && X(null);
      return;
    }
    if ((_b2 = (_a3 = c.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-add], [data-haim-edge-hit]")) return;
    const d = ye.current, w = he.current;
    if (!d || !w) return;
    const N = At(d, w, c.clientX, c.clientY, Ne, j, s.merges);
    X((k) => N ? k && k.kind === N.kind && k.index === N.index ? k.x === N.x && k.y === N.y ? k : { ...k, x: N.x, y: N.y } : N : null);
  }, [j, E, s.merges, P, Ne]), lt = a.useCallback((c, d) => {
    var _a3, _b2;
    if (d.index === 0 || je.current) return;
    c.preventDefault(), c.stopPropagation();
    const w = ye.current;
    if (!w) return;
    const N = d.index - 1;
    let k = 0, F = 0;
    if (d.kind === "col") {
      const V = (_a3 = w.querySelector(`[data-edit-c="${N}"]`)) == null ? void 0 : _a3.getBoundingClientRect();
      if (!V) return;
      k = V.left;
    } else {
      const V = (_b2 = w.rows[N]) == null ? void 0 : _b2.getBoundingClientRect();
      if (!V) return;
      F = V.top;
    }
    D(true), C(false), X(null);
    const G = (Ze) => {
      let V = 24;
      d.kind === "col" ? V = Ze.clientX - k : V = Ze.clientY - F, V = Math.max(24, Math.round(V)), l((Re) => d.kind === "col" ? { ...Re, colWidths: Ur(Re.colWidths, N, V) } : { ...Re, rowHeights: Ur(Re.rowHeights, N, V) });
    }, be = () => {
      document.removeEventListener("pointermove", G, true), document.removeEventListener("pointerup", be, true), document.removeEventListener("pointercancel", be, true), D(false);
    };
    document.addEventListener("pointermove", G, true), document.addEventListener("pointerup", be, true), document.addEventListener("pointercancel", be, true);
  }, []), ct = a.useCallback((c, d, w) => {
    p((N) => {
      const k = Math.max(1, ...N.rows.map((be) => be.length), N.aligns.length), F = N.rows.map((be) => [...be]);
      for (; F.length <= c; ) F.push(Array(k).fill(""));
      const G = [...F[c] ?? Array(k).fill("")];
      for (; G.length < k; ) G.push("");
      return G[d] = w, F[c] = G, { ...N, rows: F };
    });
  }, []), en = a.useCallback((c, d) => {
    const w = ye.current;
    if (!w) return;
    const N = w.querySelector(`td[data-edit-r="${c}"][data-edit-c="${d}"] input`);
    N && (h({ r0: c, c0: d, r1: c, c1: d }), ge.current = { r: c, c: d }, C(false), X(null), requestAnimationFrame(() => {
      N.focus(), N.select();
    }));
  }, []), Ye = a.useCallback((c, d) => {
    h({ r0: c, c0: d, r1: c, c1: d }), ge.current = { r: c, c: d }, C(false), X(null);
  }, []), tn = a.useCallback(() => {
    var _a3;
    h(null), C(false), ge.current = null;
    const c = document.activeElement;
    ((_a3 = c == null ? void 0 : c.closest) == null ? void 0 : _a3.call(c, "td[data-edit-r]")) && c.blur();
  }, []), nn = a.useCallback((c, d) => {
    const w = ge.current;
    if (!w) {
      Ye(c, d);
      return;
    }
    h({ r0: w.r, c0: w.c, r1: c, c1: d }), C(false), X(null);
  }, [Ye]), jt = a.useCallback((c, d) => {
    var _a3;
    h({ r0: c, c0: d, r1: c, c1: d }), ge.current = { r: c, c: d }, C(true), X(null);
    const w = document.activeElement;
    ((_a3 = w == null ? void 0 : w.closest) == null ? void 0 : _a3.call(w, "td[data-edit-r]")) && w.blur();
  }, []), f = a.useCallback((c, d) => {
    fe.current && h((w) => w && { ...w, r1: c, c1: d });
  }, []);
  a.useEffect(() => {
    if (!P) return;
    const c = () => C(false);
    return window.addEventListener("mouseup", c, true), window.addEventListener("pointerup", c, true), () => {
      window.removeEventListener("mouseup", c, true), window.removeEventListener("pointerup", c, true);
    };
  }, [P]), a.useEffect(() => {
    if (!e) return;
    const c = (k) => {
      var _a3, _b2, _c3;
      const F = k;
      if (!F) return false;
      const G = ((_b2 = (_a3 = F.tagName) == null ? void 0 : _a3.toLowerCase) == null ? void 0 : _b2.call(_a3)) ?? "";
      return G === "input" || G === "textarea" || G === "select" || F.isContentEditable ? true : !!((_c3 = F.closest) == null ? void 0 : _c3.call(F, 'input, textarea, select, [contenteditable="true"]'));
    }, d = (k) => {
      k.code !== "Space" && k.key !== " " || k.repeat || c(k.target) || me.current || (k.preventDefault(), Ce(true));
    }, w = (k) => {
      k.code !== "Space" && k.key !== " " || Ce(false);
    }, N = () => Ce(false);
    return window.addEventListener("keydown", d, true), window.addEventListener("keyup", w, true), window.addEventListener("blur", N), () => {
      window.removeEventListener("keydown", d, true), window.removeEventListener("keyup", w, true), window.removeEventListener("blur", N), Ce(false);
    };
  }, [e]), a.useEffect(() => {
    m && Ce(false);
  }, [m]);
  const g = a.useCallback(() => {
    Fe(false);
  }, []), x = a.useCallback((c) => {
    const d = Ee.current;
    if (!d) return;
    const w = c.button === 1, N = c.button === 0 && ue && !me.current;
    if (w || N) {
      c.preventDefault(), c.stopPropagation(), X(null), He.current = { x: c.clientX, y: c.clientY }, Fe(true), d.setPointerCapture(c.pointerId);
      return;
    }
  }, [ue]), y = a.useCallback((c) => {
    if (!de) return;
    const d = Ee.current;
    if (!d) return;
    const w = c.clientX - He.current.x, N = c.clientY - He.current.y;
    He.current = { x: c.clientX, y: c.clientY }, d.scrollLeft -= w, d.scrollTop -= N;
  }, [de]), v = a.useCallback((c) => {
    if (!de) return;
    const d = Ee.current;
    (d == null ? void 0 : d.hasPointerCapture(c.pointerId)) && d.releasePointerCapture(c.pointerId), g();
  }, [g, de]), _ = a.useCallback((c) => {
    if (c.button !== 0 || ue || de) return;
    const d = c.target;
    d && (d.closest("[data-haim-table-sidebars]") || d.closest("[data-haim-table-canvas] table, [data-haim-edge-hit], [data-haim-edge-add], [data-haim-insert-preview]") || me.current && tn());
  }, [tn, de, ue]), L = a.useCallback((c, d, w, N) => {
    let k = c + w, F = d + N;
    for (; k >= 0 && k < Ne && F >= 0 && F < j; ) {
      if (!Me.has(`${k},${F}`)) {
        en(k, F);
        return;
      }
      k += w, F += N;
    }
  }, [j, Me, en, Ne]), H = a.useCallback((c, d, w) => {
    if (c.nativeEvent.isComposing) return;
    if (c.key === "Enter") {
      c.preventDefault(), c.stopPropagation(), c.shiftKey ? L(d, w, -1, 0) : L(d, w, 1, 0);
      return;
    }
    if (!c.altKey) return;
    let N = 0, k = 0;
    if (c.key === "ArrowUp") N = -1;
    else if (c.key === "ArrowDown") N = 1;
    else if (c.key === "ArrowLeft") k = -1;
    else if (c.key === "ArrowRight") k = 1;
    else return;
    c.preventDefault(), c.stopPropagation(), L(d, w, N, k);
  }, [L]), U = a.useMemo(() => {
    var _a3;
    return Y ? ((_a3 = u.rows[Y.r]) == null ? void 0 : _a3[Y.c]) ?? "" : "";
  }, [u.rows, Y]), oe = a.useMemo(() => s.templateId ? M.find((c) => c.id === s.templateId) ?? null : null, [s.templateId, M]), ke = a.useCallback((c, d) => {
    const w = pa({ row: c, col: d, rowCount: Ne, colCount: j, meta: s, template: oe }), N = {};
    return w.bg && (N.backgroundColor = w.bg), w.color && (N.color = w.color), w.fontFamily && (N.fontFamily = w.fontFamily), w.fontSize && (N.fontSize = w.fontSize), w.fontWeight && (N.fontWeight = w.fontWeight), N;
  }, [oe, j, s, Ne]), se = (c, d) => {
    if (!m) return false;
    const w = Math.min(m.r0, m.r1), N = Math.min(m.c0, m.c1), k = Math.max(m.r0, m.r1), F = Math.max(m.c0, m.c1);
    return c >= w && c <= k && d >= N && d <= F;
  }, Pe = (c) => c === "thead" ? o.jsx(Kn, { className: ce, "aria-hidden": true }) : c === "tfoot" ? o.jsx(Jr, { className: ce, "aria-hidden": true }) : o.jsx(Qr, { className: ce, "aria-hidden": true });
  return o.jsxs(o.Fragment, { children: [o.jsxs(Kt, { isOpen: e, onClose: () => {
    if (Q !== null) {
      re(null);
      return;
    }
    r();
  }, overlayClassName: "p-[2.5dvh]", contentClassName: "h-[95dvh] max-h-[95dvh] max-w-[95dvw]", contentStyle: Mn, resizeHeight: true, children: [o.jsxs(Ql, { className: "flex h-full min-h-0 flex-col", onSubmit: (c) => c.preventDefault(), onPointerDownCapture: _, children: [o.jsxs("header", { className: "flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-3 py-2 dark:border-odp-border", children: [o.jsxs("h2", { className: "inline-flex items-center gap-1.5 text-sm font-bold text-gray-800 dark:text-odp-fgStrong", children: [o.jsx(gn, { className: bd, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1"] }), o.jsxs("div", { className: "flex items-center gap-2", children: [o.jsxs("button", { type: "button", disabled: !Ue, title: `\uC2E4\uD589 \uCDE8\uC18C (${er})`, "aria-label": `\uC2E4\uD589 \uCDE8\uC18C (${er})`, onClick: () => Ge(), className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(Rl, { className: ce, "aria-hidden": true }), "\uC2E4\uD589 \uCDE8\uC18C"] }), o.jsxs("button", { type: "button", disabled: !st, title: `\uB2E4\uC2DC \uC2E4\uD589 (${tr})`, "aria-label": `\uB2E4\uC2DC \uC2E4\uD589 (${tr})`, onClick: () => Le(), className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(Al, { className: ce, "aria-hidden": true }), "\uB2E4\uC2DC \uC2E4\uD589"] }), o.jsxs("button", { type: "button", onClick: r, className: "inline-flex items-center gap-1 rounded px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(Vt, { className: ce, "aria-hidden": true }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: () => i(s, u), className: "inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700", children: [o.jsx(vn, { className: ce, "aria-hidden": true }), "\uC801\uC6A9"] })] })] }), o.jsxs("div", { className: "flex min-h-0 flex-1 flex-col landscape:flex-row", children: [o.jsxs("div", { "data-haim-table-sidebars": "", className: "order-2 flex max-h-[42%] min-h-0 w-full shrink-0 flex-col gap-2 overflow-hidden border-t border-gray-100 bg-gray-50/80 p-2 dark:border-odp-border dark:bg-odp-bgSoft/40 portrait:max-h-[42%] landscape:order-1 landscape:max-h-none landscape:w-auto landscape:flex-row landscape:gap-0 landscape:border-t-0 landscape:border-r-0", children: [o.jsxs("aside", { className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-surface landscape:flex-none landscape:shrink-0", style: ne ? { width: Se } : void 0, children: [o.jsx("div", { className: "sticky top-0 z-[1] border-b border-gray-100 bg-white px-2.5 py-1.5 dark:border-odp-border dark:bg-odp-surface", children: o.jsxs("h3", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong", children: [o.jsx(gn, { className: ce, "aria-hidden": true }), "\uD45C \xB7 \uADF8\uB8F9"] }) }), o.jsxs("div", { className: "space-y-2 p-2.5", children: [o.jsxs("div", { className: "flex flex-wrap gap-2", children: [o.jsxs(ot, { name: "template", className: "flex min-w-0 flex-1 flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ut, { asChild: true, children: o.jsx("span", { children: o.jsx(dt, { icon: o.jsx(Zr, { className: ce }), children: "\uD15C\uD50C\uB9BF" }) }) }), o.jsx(In, { "aria-label": "\uD45C \uD15C\uD50C\uB9BF", value: s.templateId ?? Qn, onValueChange: (c) => {
    if (c === Qn) {
      l((w) => {
        const N = { ...w };
        return delete N.templateId, N;
      });
      return;
    }
    const d = M.find((w) => w.id === c);
    d && l((w) => ha(w, d));
  }, options: [{ value: Qn, label: "\uD15C\uD50C\uB9BF \uC5C6\uC74C" }, ...M.map((c) => ({ value: c.id, label: c.name }))], className: "w-full min-w-0" })] }), o.jsxs("button", { type: "button", className: "mt-auto inline-flex h-8 items-center gap-1 self-end rounded-md bg-gray-100 px-2 text-[11px] dark:bg-odp-bgSoft", onClick: () => {
    b({ id: `template-${Date.now().toString(36)}`, name: "\uC0C8 \uD15C\uD50C\uB9BF", sections: {}, rules: [] }), O(true);
  }, children: [o.jsx(Zr, { className: ce, "aria-hidden": true }), "\uAD00\uB9AC"] })] }), o.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [o.jsxs(ot, { name: "noHeader", className: "col-span-2 flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ut, { asChild: true, children: o.jsx("span", { children: o.jsx(dt, { icon: o.jsx(Kn, { className: ce }), children: "noHeader" }) }) }), o.jsxs("label", { className: "flex cursor-pointer items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-2 py-1.5 dark:border-odp-borderSoft dark:bg-odp-surface", children: [o.jsx("span", { className: "min-w-0 text-[11px] leading-snug text-gray-600 dark:text-odp-muted", children: "thead/th \uC5C6\uC774 \uBAA8\uB450 tbody/td" }), o.jsx(Sr, { className: wd(!!s.noHeader), checked: !!s.noHeader, onCheckedChange: (c) => l((d) => {
    if (c) return { ...d, noHeader: true };
    const { noHeader: w, ...N } = d;
    return N;
  }), "aria-label": "noHeader", children: o.jsx(Cr, { className: yd }) })] })] }), o.jsxs(ot, { name: "headerRows", className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${s.noHeader ? "opacity-40" : ""}`, children: [o.jsx(ut, { asChild: true, children: o.jsx("span", { children: o.jsx(dt, { icon: o.jsx(Kn, { className: ce }), children: "headerRows" }) }) }), o.jsx(on, { asChild: true, children: o.jsx("input", { type: "number", min: 0, max: Ne, value: s.headerRows, disabled: !!s.noHeader, onChange: (c) => l((d) => ({ ...d, headerRows: Math.max(0, Number(c.target.value) || 0) })), className: _n }) })] }), o.jsxs(ot, { name: "footerRows", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ut, { asChild: true, children: o.jsx("span", { children: o.jsx(dt, { icon: o.jsx(Jr, { className: ce }), children: "footerRows" }) }) }), o.jsx(on, { asChild: true, children: o.jsx("input", { type: "number", min: 0, max: Ne, value: s.footerRows, onChange: (c) => l((d) => ({ ...d, footerRows: Math.max(0, Number(c.target.value) || 0) })), className: _n }) })] }), o.jsxs(ot, { name: "width", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ut, { asChild: true, children: o.jsx("span", { children: o.jsx(dt, { icon: o.jsx(Dl, { className: ce }), children: "\uB108\uBE44" }) }) }), o.jsx(In, { "aria-label": "\uD45C \uB108\uBE44", value: s.width, onValueChange: (c) => l((d) => ({ ...d, width: c === "fit" ? "fit" : "full" })), options: [...Sd], className: "w-full" })] }), o.jsxs(ot, { name: "align", className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${s.width !== "fit" ? "opacity-40" : ""}`, children: [o.jsx(ut, { asChild: true, children: o.jsx("span", { children: o.jsx(dt, { icon: s.align === "right" ? o.jsx(Il, { className: ce }) : o.jsx(_l, { className: ce }), children: "\uC815\uB82C" }) }) }), o.jsx(In, { "aria-label": "\uD45C \uC815\uB82C", value: s.align, disabled: s.width !== "fit", onValueChange: (c) => l((d) => ({ ...d, align: c === "right" ? "right" : "left" })), options: [...Cd], className: "w-full" })] })] }), o.jsxs("div", { className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border", children: [o.jsx("p", { className: "text-[10px] font-medium text-gray-600 dark:text-odp-muted", children: "\uD45C \uAE30\uBCF8 \uD3F0\uD2B8\xB7\uC2A4\uD0C0\uC77C" }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: "\uC140\xB7\uADF8\uB8F9 \uAC12\uC774 \uC788\uC73C\uBA74 \uADF8\uCABD\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4." }), o.jsx(Un, { compact: true, idPrefix: "table-edit-table", value: s.style ?? {}, onChange: (c) => l((d) => ({ ...d, style: Wr(c) ? {} : c })) })] }), o.jsxs("div", { className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border", children: [o.jsxs("p", { className: "inline-flex items-center gap-1 text-[10px] font-medium text-gray-600 dark:text-odp-muted", children: [o.jsx(Qr, { className: ce, "aria-hidden": true }), "\uADF8\uB8F9 \uC2A4\uD0C0\uC77C"] }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: "thead / tbody / tfoot \uAD6C\uC5ED" }), o.jsx("div", { className: "mb-1 flex flex-wrap gap-1", children: xd.map((c) => o.jsxs("button", { type: "button", onClick: () => S(c), className: `inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] ${R === c ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-odp-bgSoft"}`, children: [Pe(c), c] }, c)) }), o.jsx(Un, { compact: true, idPrefix: `table-edit-${R}`, value: s.sections[R] ?? {}, onChange: (c) => l((d) => ({ ...d, sections: { ...d.sections, [R]: c } })) })] })] })] }), o.jsx(Eo, { ariaLabel: "\uD45C \uC0AC\uC774\uB4DC\uBC14\uC640 \uC140 \uC0AC\uC774\uB4DC\uBC14 \uC0AC\uC774 \uB108\uBE44 \uC870\uC808", onDelta: Ut }), o.jsx("aside", { "aria-hidden": !et, className: `flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-blue-200 bg-white dark:border-blue-900/50 dark:bg-odp-surface landscape:flex-none landscape:shrink-0 ${et ? "" : "pointer-events-none portrait:hidden landscape:invisible"}`, style: ne ? { width: $e } : void 0, children: Y ? o.jsxs(o.Fragment, { children: [o.jsx("div", { className: "sticky top-0 z-[1] border-b border-blue-100 bg-white px-2.5 py-1.5 dark:border-blue-900/40 dark:bg-odp-surface", children: o.jsxs("h3", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong", children: [o.jsx($l, { className: ce, "aria-hidden": true }), "\uC140", o.jsxs("span", { className: "font-normal text-gray-400 dark:text-odp-muted", children: ["(", Y.r + 1, "\uD589 ", Y.c + 1, "\uC5F4", $.length > 1 ? ` \xB7 ${$.length}\uCE78` : "", ")"] })] }) }), o.jsxs("div", { className: "space-y-2 p-2.5", children: [o.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [o.jsxs("button", { type: "button", disabled: !Xe, title: `\uBCD1\uD569 (${jd})`, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft", onClick: bt, children: [o.jsx(Fl, { className: ce, "aria-hidden": true }), "\uBCD1\uD569"] }), o.jsxs("button", { type: "button", disabled: !m, title: `\uBCD1\uD569 \uD574\uC81C (${Ld})`, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft", onClick: Mt, children: [o.jsx(Hl, { className: ce, "aria-hidden": true }), "\uBCD1\uD569 \uD574\uC81C"] })] }), o.jsxs("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: ["\uAE00\uC790 \uD06C\uAE30: ", Td, " / ", Pd] }), o.jsxs(ot, { name: "cell-text", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ut, { asChild: true, children: o.jsx("span", { children: o.jsx(dt, { icon: o.jsx(ps, { className: ce }), children: "\uC140 \uD14D\uC2A4\uD2B8" }) }) }), o.jsx(on, { asChild: true, children: o.jsx("input", { type: "text", value: U, onChange: (c) => ct(Y.r, Y.c, c.target.value), placeholder: "\uC140 \uB0B4\uC6A9 \uC785\uB825", className: ga }) })] }), o.jsx(Un, { compact: true, idPrefix: "table-edit-cell", value: xt, onChange: Ie })] })] }) : null }), o.jsx(Eo, { ariaLabel: "\uC0AC\uC774\uB4DC\uBC14\uC640 \uD45C \uC0AC\uC774 \uB108\uBE44 \uC870\uC808", onDelta: qt })] }), o.jsxs("div", { ref: Ee, "data-haim-table-canvas": "", className: `order-1 flex min-h-0 min-w-0 flex-1 flex-col overflow-auto border-t border-gray-100 p-3 landscape:order-2 landscape:border-t-0 landscape:border-l dark:border-odp-border ${de ? "cursor-grabbing select-none" : ue && !m ? "cursor-grab select-none" : ""}`, onMouseLeave: () => {
    E || X(null);
  }, onPointerDown: x, onPointerMove: y, onPointerUp: v, onPointerCancel: v, onAuxClick: (c) => {
    c.button === 1 && c.preventDefault();
  }, children: [o.jsxs("p", { className: "mb-2 inline-flex shrink-0 items-center gap-1 text-[10px] text-gray-400", children: [o.jsx(Ol, { className: ce, "aria-hidden": true }), "\uB354\uBE14\uD074\uB9AD \uB4DC\uB798\uADF8\xB7Shift+\uD074\uB9AD: \uBC94\uC704 \uC120\uD0DD \xB7 \uC6B0\uD074\uB9AD: \uD589/\uC5F4 \uC0AD\uC81C \xB7 \uD720\uD074\uB9AD/\uC2A4\uD398\uC774\uC2A4+\uB4DC\uB798\uADF8: \uD328\uB2DD \xB7 ", er, "/", tr, ": \uC2E4\uD589 \uCDE8\uC18C/\uB2E4\uC2DC \uC2E4\uD589 \xB7 \uD14C\uB450\uB9AC \uB354\uBE14\uD074\uB9AD: \uD589\xB7\uC5F4 \uCD94\uAC00"] }), o.jsx("div", { ref: he, className: "relative inline-block min-w-full p-5", "data-haim-inserting": (T == null ? void 0 : T.kind) ?? void 0, onMouseMove: Ln, onMouseLeave: () => {
    E || X(null);
  }, children: o.jsxs(hs, { delayDuration: 0, skipDelayDuration: 0, children: [o.jsxs("table", { ref: ye, className: `border-collapse text-sm ${((_a2 = s.colWidths) == null ? void 0 : _a2.some((c) => c && c.trim())) ? "w-max max-w-full" : "w-full"}`, style: { tableLayout: ((_b = s.colWidths) == null ? void 0 : _b.some((c) => c && c.trim())) || ((_c2 = s.rowHeights) == null ? void 0 : _c2.some((c) => c && c.trim())) ? "fixed" : void 0, ...((_d2 = s.style) == null ? void 0 : _d2.fontFamily) ? { fontFamily: s.style.fontFamily } : {}, ...((_e2 = s.style) == null ? void 0 : _e2.fontSize) ? { fontSize: s.style.fontSize } : {}, ...((_f2 = s.style) == null ? void 0 : _f2.fontWeight) ? { fontWeight: s.style.fontWeight } : {} }, children: [o.jsx("colgroup", { children: Array.from({ length: j }, (c, d) => {
    const w = $n(s.colWidths, d);
    return o.jsx("col", { style: w ? { width: w } : void 0 }, d);
  }) }), o.jsx("tbody", { children: u.rows.map((c, d) => {
    const w = $n(s.rowHeights, d);
    return o.jsx("tr", { style: w ? { height: w } : void 0, children: Array.from({ length: j }, (N, k) => {
      if (Me.has(`${d},${k}`)) return null;
      const F = xa(s.merges, d, k), G = se(d, k), be = $n(s.colWidths, k), Ze = o.jsx("td", { "data-edit-r": d, "data-edit-c": k, colSpan: F == null ? void 0 : F.colspan, rowSpan: F == null ? void 0 : F.rowspan, className: `min-h-11 cursor-pointer border-2 border-gray-300 p-0 transition-[box-shadow,outline-color] dark:border-odp-borderStrong ${be ? "" : "min-w-28"} ${G ? "relative z-[1] outline outline-2 outline-offset-[-2px] outline-blue-500 ring-0" : "hover:relative hover:z-[1] hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-blue-400/70"}`, onContextMenu: () => {
        se(d, k) || Ye(d, k), pe && (W({ r: d, c: k }), X(null));
      }, onMouseDown: (V) => {
        var _a3, _b2;
        if (V.button === 1 || V.button !== 0 || je.current || De.current && !me.current) return;
        if ((_b2 = (_a3 = V.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-hit], [data-haim-edge-add]")) {
          V.preventDefault();
          return;
        }
        {
          const ze = ye.current, Lt = he.current;
          if (ze && Lt && At(ze, Lt, V.clientX, V.clientY, Ne, j, s.merges)) {
            V.preventDefault();
            return;
          }
        }
        if (V.shiftKey) {
          V.preventDefault(), nn(d, k);
          return;
        }
        if (V.detail >= 2) {
          V.preventDefault(), jt(d, k);
          return;
        }
        Ye(d, k);
      }, onDoubleClick: (V) => {
        const Re = ye.current, ze = he.current;
        if (Re && ze && At(Re, ze, V.clientX, V.clientY, Ne, j, s.merges)) {
          V.preventDefault(), V.stopPropagation();
          return;
        }
        V.preventDefault(), jt(d, k);
      }, onMouseEnter: () => {
        f(d, k);
      }, children: o.jsx(ot, { name: `cell-${d}-${k}`, className: "contents", children: o.jsx(on, { asChild: true, children: o.jsx("input", { type: "text", value: c[k] ?? "", onChange: (V) => ct(d, k, V.target.value), onKeyDown: (V) => H(V, d, k), onMouseDown: (V) => {
        var _a3, _b2;
        if (V.button !== 1 && V.button === 0 && !je.current && !(De.current && !me.current)) {
          if ((_b2 = (_a3 = V.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-hit], [data-haim-edge-add]")) {
            V.preventDefault(), V.stopPropagation();
            return;
          }
          {
            const Re = ye.current, ze = he.current;
            if (Re && ze && At(Re, ze, V.clientX, V.clientY, Ne, j, s.merges)) {
              V.preventDefault(), V.stopPropagation();
              return;
            }
          }
          if (V.shiftKey) {
            V.preventDefault(), V.stopPropagation(), nn(d, k);
            return;
          }
          if (V.detail >= 2) {
            V.preventDefault();
            return;
          }
          V.stopPropagation();
        }
      }, onDoubleClick: (V) => {
        const Re = ye.current, ze = he.current;
        if (Re && ze && At(Re, ze, V.clientX, V.clientY, Ne, j, s.merges)) {
          V.preventDefault(), V.stopPropagation();
          return;
        }
        V.preventDefault(), V.stopPropagation(), jt(d, k);
      }, onFocus: () => {
        fe.current || De.current && !me.current || Ye(d, k);
      }, className: `${_n} h-full min-h-11 w-full cursor-pointer border-transparent bg-transparent px-2 text-sm focus:cursor-text focus:border-gray-300 focus:bg-white/90 dark:focus:bg-odp-bgSoft/90 ${be ? "" : "min-w-28"}`, style: { ...ke(d, k), ...w ? { height: w } : {} } }) }) }) }, k);
      return pe ? Ze : o.jsxs(ec, { onOpenChange: (V) => {
        W(V ? { r: d, c: k } : null), V ? X(null) : nt();
      }, children: [o.jsx(tc, { asChild: true, children: Ze }), o.jsx(nc, { children: o.jsxs(rc, { className: Md, onCloseAutoFocus: (V) => V.preventDefault(), children: [o.jsxs(eo, { className: ko, disabled: Ne <= 1, onPointerEnter: () => Zt(d), onPointerLeave: nt, onFocus: () => Zt(d), onBlur: nt, onSelect: () => {
        at(d);
      }, children: [o.jsx(vt, { className: ce, "aria-hidden": true }), "\uD589 \uC0AD\uC81C"] }), o.jsxs(eo, { className: ko, disabled: j <= 1, onPointerEnter: () => Jt(k), onPointerLeave: nt, onFocus: () => Jt(k), onBlur: nt, onSelect: () => {
        Gt(k);
      }, children: [o.jsx(vt, { className: ce, "aria-hidden": true }), "\uC5F4 \uC0AD\uC81C"] })] }) })] }, k);
    }) }, d);
  }) })] }), ae ? o.jsx(Hd, { kind: ae.kind, indices: ae.indices, table: ye.current, wrap: he.current, colCount: j }) : null, pe && te ? o.jsxs(cs, { open: ee, onOpenChange: (c) => {
    c || (W(null), nt());
  }, title: `${te.r + 1}\uD589 ${te.c + 1}\uC5F4`, subtitle: "\uD45C \uD3B8\uC9D1 \uC140", children: [o.jsxs("button", { type: "button", className: sr, disabled: Ne <= 1, onClick: () => {
    at(te.r), W(null);
  }, children: [o.jsx(vt, { className: ce, "aria-hidden": true }), "\uD589 \uC0AD\uC81C"] }), o.jsxs("button", { type: "button", className: sr, disabled: j <= 1, onClick: () => {
    Gt(te.c), W(null);
  }, children: [o.jsx(vt, { className: ce, "aria-hidden": true }), "\uC5F4 \uC0AD\uC81C"] })] }) : null, T && !ee ? o.jsxs(o.Fragment, { children: [o.jsx(Fd, { insert: T }, `preview-${T.kind}-${T.index}`), o.jsx($d, { insert: T, allowResize: T.index !== 0, tip: T.index === 0 ? T.label : `${T.label} \xB7 ${So(T.kind)}`, onDoubleClickInsert: () => {
    const { kind: c, index: d } = T;
    c === "row" ? Xt(d) : Yt(d);
  }, onResizePointerDown: (c) => lt(c, T) }, `hit-${T.kind}-${T.index}`), o.jsx(_d, { tip: T.index === 0 ? T.label : `${T.label} \xB7 ${So(T.kind)}`, onDoubleClick: () => {
    const { kind: c, index: d } = T;
    c === "row" ? Xt(d) : Yt(d);
  }, style: { left: T.x, top: T.y } }, `btn-${T.kind}-${T.index}`)] }) : null] }) })] })] })] }), o.jsx(pc, { isOpen: I, template: q, onClose: () => {
    O(false), b(null);
  }, onSave: (c) => {
    const w = [...wa().templates.filter((N) => N.id !== (q == null ? void 0 : q.id) && N.id !== c.id), c];
    ba({ templates: w }).then((N) => {
      A(N.templates), O(false), b(null);
    });
  } })] }), typeof document < "u" ? Xo.createPortal(o.jsx("div", { className: "relative z-[100060]", children: o.jsx(hn, { isOpen: Q !== null, variant: "danger", title: (Q == null ? void 0 : Q.kind) === "col" ? "\uC5F4 \uC0AD\uC81C" : "\uD589 \uC0AD\uC81C", message: (Q == null ? void 0 : Q.kind) === "col" ? Q.indices.length > 1 ? `\uC120\uD0DD\uD55C ${Q.indices.length}\uAC1C \uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(Q.indices[0] ?? 0) + 1}\uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : Q ? Q.indices.length > 1 ? `\uC120\uD0DD\uD55C ${Q.indices.length}\uAC1C \uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(Q.indices[0] ?? 0) + 1}\uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : "", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", onConfirm: jn, onCancel: () => re(null) }) }), document.body) : null] });
}
const Kd = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", jo = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-800 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-surface", Lo = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", an = "h-3.5 w-3.5 shrink-0";
function Vd({ containerRef: e, getMarkdown: t, setMarkdown: n, onEditTable: r, onEditFailed: i }) {
  const s = ls(), [l, u] = a.useState(false), [p, m] = a.useState(null), [h, P] = a.useState(null), C = a.useRef(null);
  C.current = p;
  const R = a.useCallback((b) => {
    m(b), u(true);
  }, []);
  a.useEffect(() => {
    const b = e.current;
    if (!b) return;
    const T = () => b.querySelector(".md-editor-preview"), X = (te) => {
      var _a2, _b, _c2, _d2;
      if ((_b = (_a2 = te.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const W = T(), ee = (_d2 = (_c2 = te.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "table");
      !(ee instanceof HTMLTableElement) || !(W == null ? void 0 : W.contains(ee)) || (te.preventDefault(), te.stopPropagation(), R({ table: ee, previewRoot: W, x: te.clientX, y: te.clientY }));
    };
    let E = null, D = null, K = false, J = null;
    const Q = () => {
      E && clearTimeout(E), E = null, D = null, J = null;
    }, re = (te) => {
      var _a2, _b;
      if (te.pointerType === "mouse") return;
      const W = T();
      if (!W) return;
      const ee = (_b = (_a2 = te.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "table");
      !(ee instanceof HTMLTableElement) || !W.contains(ee) || (Q(), K = false, J = ee, D = { x: te.clientX, y: te.clientY }, E = setTimeout(() => {
        K = true, va();
        const pe = T();
        J && pe && R({ table: J, previewRoot: pe, x: (D == null ? void 0 : D.x) ?? te.clientX, y: (D == null ? void 0 : D.y) ?? te.clientY });
      }, ka));
    }, ae = (te) => {
      if (!D) return;
      const W = te.clientX - D.x, ee = te.clientY - D.y;
      W * W + ee * ee > 100 && Q();
    }, le = (te) => {
      K && (te.preventDefault(), te.stopPropagation()), Q(), K = false;
    }, we = (te) => {
      var _a2, _b;
      const W = T(), ee = (_b = (_a2 = te.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "table");
      ee && (W == null ? void 0 : W.contains(ee)) && window.matchMedia("(pointer: coarse)").matches && te.preventDefault();
    };
    return b.addEventListener("contextmenu", X, true), b.addEventListener("pointerdown", re), b.addEventListener("pointermove", ae), b.addEventListener("pointerup", le), b.addEventListener("pointercancel", le), b.addEventListener("contextmenu", we, true), () => {
      Q(), b.removeEventListener("contextmenu", X, true), b.removeEventListener("pointerdown", re), b.removeEventListener("pointermove", ae), b.removeEventListener("pointerup", le), b.removeEventListener("pointercancel", le), b.removeEventListener("contextmenu", we, true);
    };
  }, [e, R]);
  const S = () => {
    const b = C.current;
    if (!b) return;
    r(b.table, b.previewRoot) || (i == null ? void 0 : i());
  }, M = () => {
    const b = C.current;
    if (!b) return;
    const T = gs(t(), b.table, b.previewRoot);
    if (!T) {
      i == null ? void 0 : i();
      return;
    }
    P(T);
  }, A = () => {
    if (!h) return;
    const b = Sa(t(), h);
    n(b), P(null);
  }, I = p ?? { x: 0, y: 0 }, O = () => {
    u(false), m(null);
  }, q = o.jsxs(o.Fragment, { children: [o.jsxs("button", { type: "button", className: s ? Ea : jo, onClick: () => {
    S(), O();
  }, children: [o.jsx(gn, { className: an, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1\uAE30"] }), o.jsxs("button", { type: "button", className: s ? sr : Lo, onClick: () => {
    M(), O();
  }, children: [o.jsx(vt, { className: an, "aria-hidden": true }), "\uD45C \uC0AD\uC81C"] })] });
  return o.jsxs(o.Fragment, { children: [s ? o.jsx(cs, { open: l, onOpenChange: (b) => {
    u(b), b || m(null);
  }, title: "\uBBF8\uB9AC\uBCF4\uAE30 \uD45C", subtitle: "\uB9C8\uD06C\uB2E4\uC6B4 \uD14C\uC774\uBE14", children: q }) : o.jsxs(oc, { open: l, onOpenChange: (b) => {
    u(b), b || m(null);
  }, modal: true, children: [o.jsx(sc, { asChild: true, children: o.jsx("button", { type: "button", "aria-hidden": true, tabIndex: -1, className: "pointer-events-none fixed h-px w-px opacity-0", style: { left: I.x, top: I.y } }) }), o.jsx(ic, { children: o.jsxs(ac, { className: Kd, side: "bottom", align: "start", sideOffset: 2, collisionPadding: 12, onCloseAutoFocus: (b) => b.preventDefault(), children: [o.jsxs(to, { className: jo, onSelect: S, children: [o.jsx(gn, { className: an, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1\uAE30"] }), o.jsxs(to, { className: Lo, onSelect: M, children: [o.jsx(vt, { className: an, "aria-hidden": true }), "\uD45C \uC0AD\uC81C"] })] }) })] }), o.jsx(hn, { isOpen: h !== null, variant: "danger", title: "\uD45C \uC0AD\uC81C", message: "\uC774 \uD45C\uB97C \uB9C8\uD06C\uB2E4\uC6B4\uC5D0\uC11C \uC0AD\uC81C\uD560\uAE4C\uC694?", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", onConfirm: A, onCancel: () => P(null) })] });
}
function Wd(e) {
  const [t, n] = a.useState(null), r = a.useRef(e.getMarkdown), i = a.useRef(e.setMarkdown);
  r.current = e.getMarkdown, i.current = e.setMarkdown;
  const s = a.useCallback((m, h = m) => {
    const P = r.current(), C = ir(P, m, h);
    return C ? (n({ block: C, meta: C.meta ?? pn(), grid: C.grid }), true) : false;
  }, []), l = a.useCallback((m, h) => {
    const P = r.current(), C = gs(P, m, h);
    return C ? (n({ block: C, meta: C.meta ?? pn(), grid: C.grid }), true) : false;
  }, []), u = a.useCallback(() => n(null), []), p = a.useCallback((m, h) => {
    if (!t) return;
    const P = r.current(), C = ir(P, t.block.start, t.block.start + 1) ?? t.block, R = Ca(P, C, m, h);
    i.current(R), n(null);
  }, [t]);
  return { editState: t, openAtOffset: s, openPreviewTable: l, close: u, apply: p, isOpen: !!t };
}
const Ds = new kr("s3haim-note-cover-fold");
Ds.version(1).stores({ folds: "key, updatedAt" });
const Is = Ds.folds;
function Ud(e, t) {
  return `cover-fold:${vr(e, t)}`;
}
function qd(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Ud(e.type, e.id);
}
async function Xd(e) {
  if (!e) return null;
  const t = await Is.get(e);
  return !t || typeof t.collapsed != "boolean" ? null : t.collapsed;
}
async function Yd(e, t) {
  e && await Is.put({ key: e, collapsed: !!t, updatedAt: Date.now() });
}
function St(e) {
  const t = Math.min(e.length, 2e6);
  return Na(e.sliceString(0, t));
}
function ht(e) {
  const t = St(e.doc);
  if (!t) return null;
  const n = e.doc.lineAt(t.from);
  return n.to >= t.to ? null : { from: n.to, to: t.to };
}
function Ht(e, t) {
  let n = false;
  return es(e).between(t.from, t.to, () => {
    n = true;
  }), n;
}
function Gd(e, t) {
  return e.from === t.from && e.to === t.to;
}
function Zd(e, t) {
  const n = e.doc.lineAt(t);
  let r = false;
  return yr(e).iterate({ from: n.from, to: Math.min(n.to, n.from + 1), enter(i) {
    const s = i.type.name;
    if (s.startsWith("ATXHeading") || s.startsWith("SetextHeading")) return r = true, false;
  } }), r;
}
function nr(e, t) {
  const n = St(e.doc);
  if (n) {
    const s = e.doc.lineAt(n.from);
    if (t === s.from) {
      const l = ht(e);
      if (l) return { ...l, kind: "cover" };
    }
    if (t >= n.from && t < n.to) return null;
  }
  if (!Zd(e, t)) return null;
  const r = e.doc.lineAt(t), i = oi(e, r.from, r.to);
  return !i || i.from >= i.to ? null : { ...i, kind: "heading" };
}
const Ot = ti.define({ combine: (e) => e[e.length - 1] ?? null }), _s = new wr();
function Jd(e) {
  return _s.of(Ot.of(e));
}
function Qd(e, t) {
  e.dispatch({ effects: _s.reconfigure(Ot.of(t)) });
}
function ef(e, t) {
  const n = document.createElement("button");
  n.type = "button", n.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${t}`;
  const r = t === "cover" ? e ? "\uD45C\uC9C0 \uC811\uAE30" : "\uD45C\uC9C0 \uD3BC\uCE58\uAE30" : e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30";
  n.setAttribute("aria-label", r), n.title = r, n.dataset.foldKind = t, n.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const i = n.querySelector("svg");
  return i && (i.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", i.style.transformOrigin = "50% 50%"), n;
}
class To extends si {
  constructor(t, n) {
    super(), this.open = t, this.kind = n;
  }
  eq(t) {
    return this.open === t.open && this.kind === t.kind;
  }
  toDOM() {
    return ef(this.open, this.kind);
  }
}
let xr = 0;
function $s(e, t) {
  const n = e.coordsAtPos(t.from), r = e.coordsAtPos(t.to);
  if (!n || !r) return null;
  const i = e.contentDOM.getBoundingClientRect(), s = Math.min(n.top, r.top), l = Math.max(n.bottom, r.bottom), u = Math.max(0, l - s);
  if (u < 2) return null;
  const p = document.createElement("div");
  return p.className = "cm-note-cover-fold-motion", p.style.cssText = ["position:fixed", `top:${s}px`, `left:${i.left}px`, `width:${Math.max(0, i.width)}px`, `height:${u}px`, "overflow:hidden", "pointer-events:none", "z-index:6", "background:var(--md-bk-color, var(--cm-background, #fff))"].join(";"), document.body.appendChild(p), p;
}
async function tf(e, t) {
  const n = ++xr, r = $s(e, t);
  if (!r) {
    e.dispatch({ effects: mt.of(t) });
    return;
  }
  try {
    await kn(r, { height: 0, opacity: 0.35 }, { duration: 0.22, ease: "easeInOut" });
  } catch {
  }
  n === xr && ht(e.state) && e.dispatch({ effects: mt.of(t) }), r.remove();
}
async function nf(e, t) {
  ++xr, e.dispatch({ effects: zt.of(t) });
  const n = ht(e.state);
  if (!n) return;
  const r = $s(e, n);
  if (r) {
    try {
      await kn(r, { height: 0, opacity: 0 }, { duration: 0.22, ease: "easeInOut" });
    } catch {
    }
    r.remove();
  }
}
function Fs(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.querySelector) == null ? void 0 : _a2.call(e, "svg");
  n instanceof SVGElement && kn(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" });
}
function Po(e, t) {
  const n = Ht(e.state, t);
  return e.dispatch({ effects: n ? zt.of(t) : mt.of(t) }), true;
}
function Ro(e) {
  const t = ht(e.state);
  if (!t) return false;
  const r = !Ht(e.state, t), i = e.dom.querySelector('.cm-note-cover-fold-chevron[data-fold-kind="cover"]');
  return Fs(i, !r), (async () => {
    r ? await tf(e, t) : await nf(e, t);
    const s = e.state.facet(Ot);
    s && Yd(s, r);
  })(), true;
}
function rf(e, t) {
  const n = ht(e.state);
  if (!n) return;
  const r = Ht(e.state, n);
  t && !r ? e.dispatch({ effects: mt.of(n) }) : !t && r && e.dispatch({ effects: zt.of(n) });
}
function of() {
  return Qo.fromClass(class {
    constructor(e) {
      __publicField(this, "lastKey", null);
      __publicField(this, "hadCover", false);
      __publicField(this, "loadGen", 0);
      this.view = e, this.syncKeyAndMaybeRestore();
    }
    update(e) {
      const t = e.state.facet(Ot) !== this.lastKey, r = !!St(e.state.doc), i = r && !this.hadCover;
      this.hadCover = r, (t || i) && this.syncKeyAndMaybeRestore();
    }
    syncKeyAndMaybeRestore() {
      const e = this.view.state.facet(Ot);
      this.lastKey = e;
      const t = St(this.view.state.doc);
      if (this.hadCover = !!t, !e || !t) return;
      const n = ++this.loadGen;
      Xd(e).then((r) => {
        n === this.loadGen && r != null && rf(this.view, r);
      });
    }
  });
}
function sf(e) {
  return e.transactions.some((t) => t.effects.some((n) => n.is(mt) || n.is(zt)));
}
function af() {
  return [Jd(null), Zo({ preparePlaceholder(e, t) {
    const n = ht(e);
    return n && Gd(n, t) ? "cover" : "heading";
  }, placeholderDOM(e, t, n) {
    const r = document.createElement("span");
    return r.className = "cm-foldPlaceholder", r.textContent = n === "cover" ? "\u2026\uD45C\uC9C0\u2026" : "\u2026", r.setAttribute("aria-hidden", "true"), r.onclick = t, r;
  } }), Jo.of((e, t) => {
    const n = St(e.doc);
    if (!n) return null;
    const r = e.doc.lineAt(n.from);
    return t !== r.from ? null : ht(e);
  }), ni({ class: "cm-note-cover-fold-gutter", lineMarker(e, t) {
    const n = nr(e.state, t.from);
    if (!n) return null;
    const r = !Ht(e.state, n);
    return new To(r, n.kind);
  }, lineMarkerChange: (e) => e.docChanged || e.viewportChanged || sf(e), initialSpacer: () => new To(true, "heading"), domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = nr(e.state, t.from);
    if (!r) return false;
    if (r.kind === "cover") {
      if (!Ro(e)) return false;
    } else {
      const i = n.target instanceof Element ? n.target.closest(".cm-note-cover-fold-chevron") : null;
      Fs(i, Ht(e.state, r)), Po(e, r);
    }
    return n.preventDefault(), n.stopPropagation(), true;
  } } }), ri({ domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = St(e.state.doc);
    if (r && t.from >= r.from && t.from < r.to) return Ro(e) ? (n.preventDefault(), true) : false;
    const i = nr(e.state, t.from);
    return !i || i.kind !== "heading" ? false : (Po(e, i), n.preventDefault(), true);
  } } }), of(), _t.theme({ ".cm-note-cover-fold-gutter": { width: "1.1rem" }, ".cm-note-cover-fold-gutter .cm-gutterElement": { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }, ".cm-note-cover-fold-chevron": { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", padding: "0", margin: "0", border: "none", background: "transparent", color: "inherit", opacity: "0.65", cursor: "pointer", lineHeight: "1" }, ".cm-note-cover-fold-chevron:hover": { opacity: "1" }, ".cm-note-cover-fold-chevron svg": { display: "block" } })];
}
function lf({ cover: e, getPresignedUrl: t }) {
  const n = Ma(e.pageSizeId) ? e.pageSizeId : ja, r = a.useMemo(() => ({ ...La(), pageSizeId: n }), [n]), i = a.useMemo(() => Ta(n), [n]), s = a.useMemo(() => Pa(r), [r]);
  return o.jsx("div", { className: "md-note-cover-preview-light w-full bg-white text-gray-900", "data-note-cover-preview": "1", "data-color-mode": "light", "data-cover-page-size": n, style: s, children: o.jsx(_i, { cover: e, getPresignedUrl: t, className: "md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]", style: { width: "100%", height: "auto", aspectRatio: `${i.widthMm} / ${i.heightMm}` } }) });
}
const wn = /* @__PURE__ */ new WeakMap(), cf = "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026", uf = "\uD45C\uC9C0";
function Hs(e) {
  const t = wn.get(e);
  t && (t.unmount(), wn.delete(e));
}
function Ao(e, t) {
  if (!e) return;
  const n = e.querySelector(".md-note-cover-placeholder__fallback");
  n && (n.textContent = t);
}
function Do(e, t) {
  e && (e.classList.toggle("md-note-cover-placeholder--pending", t === "pending"), e.classList.toggle("md-note-cover-placeholder--ready", t === "ready"), e.classList.toggle("md-note-cover-placeholder--empty", t === "empty"), t === "pending" ? Ao(e, cf) : t === "empty" && Ao(e, uf));
}
function df(e, t, n) {
  let r = wn.get(e);
  r || (r = Js.createRoot(e), wn.set(e, r)), r.render(a.createElement(lf, { cover: t, getPresignedUrl: n ?? void 0 }));
}
function ff(e, t, n, r) {
  if (!e || typeof e.querySelectorAll != "function") return 0;
  const { cover: i } = us(t ?? ""), s = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  if (!(i == null ? void 0 : i.enabled)) {
    for (const l of s) {
      Hs(l);
      const u = l.closest("[data-note-cover-placeholder]");
      Do(u, "empty");
    }
    return 0;
  }
  for (const l of s) {
    const u = l.closest("[data-note-cover-placeholder]");
    Do(u, "ready"), df(l, i, n);
  }
  return s.length;
}
function mf(e) {
  if (!e || typeof e.querySelectorAll != "function") return;
  const t = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  for (const n of t) Hs(n);
}
const pf = "h1, h2, h3, h4, h5, h6", Os = "md-preview-heading-fold-chevron", Io = "md-preview-heading-foldable", ln = "md-preview-heading-folded", hf = "md-preview-heading-section-hidden", mn = "data-md-preview-heading-fold";
function gf(e) {
  if (!e) return false;
  const t = e.tagName;
  return t === "H1" || t === "H2" || t === "H3" || t === "H4" || t === "H5" || t === "H6";
}
function _o(e) {
  const t = e.getAttribute("data-heading-level");
  if (t) {
    const r = Number(t);
    if (Number.isFinite(r) && r >= 1) return r;
  }
  const n = Number(e.tagName.slice(1));
  return Number.isFinite(n) && n >= 1 ? n : 6;
}
function xf(e, t) {
  return e.id || `md-preview-heading-${t}`;
}
function Bs(e) {
  const t = _o(e), n = [];
  let r = e.nextElementSibling;
  for (; r && !(gf(r) && _o(r) <= t || r.hasAttribute("data-note-cover-placeholder")); ) r instanceof HTMLElement && n.push(r), r = r.nextElementSibling;
  return n;
}
function bf(e) {
  return !!e.closest("[data-note-cover-placeholder], [data-note-cover-preview]");
}
function zs(e) {
  return Array.from(e.querySelectorAll(pf)).filter((t) => !(!(t instanceof HTMLElement) || bf(t)));
}
function wf(e) {
  if (!e || typeof e.querySelectorAll != "function") return false;
  const t = zs(e);
  for (const n of t) if (n.getAttribute(mn) !== "1" && Bs(n).length > 0) return true;
  return false;
}
function yf(e) {
  const t = document.createElement("button");
  t.type = "button", t.className = `${Os} cursor-pointer`, t.setAttribute("aria-label", e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), t.title = e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30", t.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const n = t.querySelector("svg");
  return n && (n.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", n.style.transformOrigin = "50% 50%"), t;
}
function vf(e, t) {
  const n = e.querySelector("svg");
  n instanceof SVGElement && (kn(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" }), e.setAttribute("aria-label", t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), e.title = t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30");
}
function rr(e, t) {
  for (const n of e) n.classList.toggle(hf, t), t ? n.setAttribute("hidden", "") : n.removeAttribute("hidden");
}
function kf(e, t = {}) {
  if (!e || typeof e.querySelectorAll != "function") return () => {
  };
  const n = new Set(Array.from(t.collapsedIds ?? []).filter((s) => typeof s == "string" && s)), r = [];
  return zs(e).forEach((s, l) => {
    var _a2;
    if (s.getAttribute(mn) === "1") return;
    const u = Bs(s);
    if (u.length === 0) return;
    const p = xf(s, l);
    s.id || (s.id = p), s.setAttribute(mn, "1"), s.classList.add(Io), (_a2 = s.querySelector(`:scope > .${Os}`)) == null ? void 0 : _a2.remove();
    const h = !n.has(p), P = yf(h);
    s.insertBefore(P, s.firstChild);
    const C = (S) => {
      s.classList.toggle(ln, S), rr(u, S), vf(P, !S);
    };
    h || (s.classList.add(ln), rr(u, true));
    const R = (S) => {
      var _a3;
      S.preventDefault(), S.stopPropagation();
      const M = !s.classList.contains(ln);
      C(M), M ? n.add(p) : n.delete(p), (_a3 = t.onCollapsedChange) == null ? void 0 : _a3.call(t, Array.from(n));
    };
    P.addEventListener("click", R), r.push(() => {
      P.removeEventListener("click", R), P.remove(), s.classList.remove(Io, ln), s.removeAttribute(mn), rr(u, false);
    });
  }), () => {
    for (const s of r) s();
  };
}
const Ks = new kr("s3haim-preview-heading-fold");
Ks.version(1).stores({ folds: "key, updatedAt" });
const Vs = Ks.folds;
function Ef(e, t) {
  return `heading-fold:${vr(e, t)}`;
}
function Sf(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Ef(e.type, e.id);
}
async function Cf(e) {
  if (!e) return null;
  const t = await Vs.get(e);
  return !t || !Array.isArray(t.collapsedIds) ? null : t.collapsedIds.filter((n) => typeof n == "string" && n.length > 0);
}
async function Nf(e, t) {
  e && await Vs.put({ key: e, collapsedIds: Array.from(new Set(t.filter(Boolean))), updatedAt: Date.now() });
}
const Mf = [0, 16, 48, 100, 180, 320];
function jf(e) {
  let t = [], n = null, r = null, i = false, s = false;
  function l() {
    for (const R of t) clearTimeout(R);
    t = [];
  }
  function u() {
    if (s) return false;
    const R = e.getPreviewRoot(), S = e.getView();
    return !R || !S || Dt(R) ? false : $i(S, R, { allowCollapsed: true });
  }
  function p() {
    i || s || (i = true, requestAnimationFrame(() => {
      i = false, u();
    }));
  }
  function m(R) {
    n && r === R || (n == null ? void 0 : n.disconnect(), r = R, n = new MutationObserver((S) => {
      S.some((A) => {
        const I = [...A.addedNodes, ...A.removedNodes];
        return I.length === 0 ? A.type === "characterData" || A.type === "attributes" : I.some((O) => {
          var _a2, _b;
          return O instanceof Element ? !(O.hasAttribute("data-preview-caret-mirror") || O.hasAttribute("data-preview-sel-mirror") || ((_a2 = O.classList) == null ? void 0 : _a2.contains("s3haim-preview-caret-mirror")) || ((_b = O.classList) == null ? void 0 : _b.contains("s3haim-preview-sel-mirror"))) : true;
        });
      }) && p();
    }), n.observe(R, { childList: true, subtree: true, characterData: true }));
  }
  function h(R) {
    if (s) return;
    const S = e.getPreviewRoot();
    if (S && m(S), u(), !!(R == null ? void 0 : R.withRetries)) {
      l();
      for (const M of Mf) t.push(setTimeout(() => {
        if (s) return;
        const A = e.getPreviewRoot();
        A && m(A), u();
      }, M));
    }
  }
  function P() {
    s = true, l(), n == null ? void 0 : n.disconnect(), n = null, r = null, i = false;
  }
  const C = e.getPreviewRoot();
  return C && m(C), h({ withRetries: true }), { schedule: h, stop: P };
}
const $o = [0, 16, 48, 120, 280], Lf = 50, Tf = 40, Fo = 32, Pf = 32;
function Ho(e) {
  return !!(e == null ? void 0 : e.isConnected);
}
function br(e, t) {
  const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
  return n.top - r.top + t.scrollTop;
}
function Oo(e, t) {
  const n = Math.max(0, t);
  Math.abs(e.scrollTop - n) < 0.5 || (e.scrollTop = n, Math.abs(e.scrollTop - n) > 1 && e.scrollTo(0, n));
}
function Ws(e) {
  const t = [];
  for (const r of e.querySelectorAll("[data-line]")) r instanceof HTMLElement && t.push(r);
  const n = t.filter((r) => {
    let i = r.parentElement;
    for (; i && i !== e; ) {
      if (i.hasAttribute("data-line")) return false;
      i = i.parentElement;
    }
    return true;
  });
  return n.length > 0 ? n : t;
}
function Rf(e, t) {
  let n = null, r = -1;
  for (const i of Ws(e)) {
    const s = Number(i.getAttribute("data-line"));
    Number.isFinite(s) && s <= t && s >= r && (n = i, r = s);
  }
  return n;
}
function Af(e, t, n) {
  let r = null, i = -1, s = -1 / 0;
  for (const l of Ws(e)) {
    const u = Number(l.getAttribute("data-line"));
    if (!Number.isFinite(u)) continue;
    const p = br(l, t);
    p <= n && p >= s && (r = l, i = u, s = p);
  }
  return !r || i < 0 ? null : { el: r, line0: i };
}
function Df(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.dom) == null ? void 0 : _a2.closest(".md-editor");
  if (n instanceof HTMLElement) return n;
  const r = t == null ? void 0 : t.closest(".md-editor");
  return r instanceof HTMLElement ? r : null;
}
function If(e) {
  let t = false, n = [], r = null, i = 0, s = null, l = 0, u = 0, p = null, m = null, h = null, P = null, C = null, R = "none", S = false;
  function M() {
    for (const z of n) clearTimeout(z);
    n = [];
  }
  function A() {
    r != null && (clearTimeout(r), r = null), i = 0;
  }
  function I() {
    s != null && (clearTimeout(s), s = null);
  }
  function O() {
    l && cancelAnimationFrame(l), u && cancelAnimationFrame(u), l = 0, u = 0;
  }
  function q(z) {
    I(), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        s = setTimeout(() => {
          s = null, R === z && (R = "none");
        }, Pf);
      });
    });
  }
  function b(z) {
    return z.scrollDOM;
  }
  function T(z) {
    return Ho(P) ? P : Ho(m) ? m : yt(z);
  }
  function X(z) {
    if (!(z instanceof Node)) return null;
    const B = e.getView(), ne = e.getPreviewRoot();
    if (B && (z === B.scrollDOM || B.dom.contains(z))) return "editor";
    if (ne) {
      const Z = ne.closest(".md-editor-preview-wrapper") ?? ne;
      if (z === Z || Z.contains(z)) return "preview";
    }
    return null;
  }
  function E(z, B) {
    if (z !== "preview" || !(B instanceof HTMLElement)) return;
    const ne = e.getPreviewRoot();
    if (!ne) return;
    const Z = yt(ne);
    Z && (B === Z || B.contains(Z)) && (P = B);
  }
  function D(z, B) {
    if (!(B instanceof HTMLElement)) return false;
    if (z === "editor") {
      const Ee = e.getView();
      return !!(Ee && (B === Ee.scrollDOM || B.contains(Ee.scrollDOM)));
    }
    const ne = e.getPreviewRoot(), Z = ne ? yt(ne) : null;
    return !!(Z && (B === Z || B.contains(Z)));
  }
  function K() {
    if (S) return false;
    const z = e.getPreviewRoot(), B = e.getView();
    if (!z || !B || R === "preview" || R !== "none" && R !== "follow") return false;
    R = "follow";
    const ne = Fi(B, z);
    return q("follow"), ne;
  }
  function J() {
    t || S || (t = true, requestAnimationFrame(() => {
      t = false, K();
    }));
  }
  function Q() {
    const z = e.getPreviewRoot(), B = e.getView();
    if (!z || !B) return;
    const ne = b(B), Z = T(z);
    if (!Z) return;
    const Ee = ne.scrollTop, he = B.lineBlockAtHeight(Ee), ye = B.state.doc.lineAt(he.from).number - 1, Ae = Rf(z, ye);
    if (!Ae) return;
    const fe = he.height > 0 ? Math.max(0, Math.min(1, (Ee - he.top) / he.height)) : 0, me = br(Ae, Z) + Ae.offsetHeight * fe - Fo;
    Oo(Z, me);
  }
  function re() {
    const z = e.getPreviewRoot(), B = e.getView();
    if (!z || !B) return;
    const ne = b(B), Z = T(z);
    if (!Z) return;
    const Ee = Z.scrollTop + Fo, he = Af(z, Z, Ee);
    if (!he) return;
    const { el: ye, line0: Ae } = he, fe = Math.min(Math.max(1, Ae + 1), B.state.doc.lines), ge = B.state.doc.line(fe), me = B.lineBlockAt(ge.from), De = br(ye, Z), je = ye.offsetHeight > 0 ? Math.max(0, Math.min(1, (Ee - De) / ye.offsetHeight)) : 0;
    Oo(ne, me.top + me.height * je);
  }
  function ae() {
    if (!S && !(R === "preview" || R === "follow")) {
      R = "editor";
      try {
        Q();
      } finally {
        q("editor");
      }
    }
  }
  function le() {
    if (!S && !(R === "editor" || R === "follow")) {
      R = "preview";
      try {
        re();
      } finally {
        q("preview");
      }
    }
  }
  function we() {
    S || R === "preview" || R === "follow" || l || (l = requestAnimationFrame(() => {
      l = 0, ae();
    }));
  }
  function te() {
    S || R === "editor" || R === "follow" || u || (u = requestAnimationFrame(() => {
      u = 0, le();
    }));
  }
  function W(z) {
    const B = X(z.target);
    !B || !D(B, z.target) || (E(B, z.target), B === "editor" ? we() : te());
  }
  function ee(z) {
    const B = X(z.target);
    B && requestAnimationFrame(() => {
      const ne = e.getView(), Z = e.getPreviewRoot();
      B === "editor" && ne ? we() : B === "preview" && Z && (E("preview", yt(Z)), te());
    });
  }
  function pe(z) {
    const B = z.target;
    if (B instanceof HTMLImageElement && (C == null ? void 0 : C.contains(B))) {
      J(), M();
      for (const ne of $o) n.push(setTimeout(() => K(), ne));
    }
  }
  function Se(z) {
    const B = z.scrollDOM;
    return B instanceof HTMLElement ? (p === B || (p && p.removeEventListener("scroll", W), p = B, B.addEventListener("scroll", W, { passive: true })), true) : false;
  }
  function We(z) {
    const B = yt(z);
    return B ? (m === B || (m && m.removeEventListener("scroll", W), m = B, P = B, B.addEventListener("scroll", W, { passive: true })), true) : false;
  }
  function $e(z, B) {
    const ne = Df(z, B);
    return ne ? (h === ne || (h && (h.removeEventListener("scroll", W, true), h.removeEventListener("wheel", ee, true), h.removeEventListener("touchmove", ee, true)), h = ne, ne.addEventListener("scroll", W, { capture: true, passive: true }), ne.addEventListener("wheel", ee, { capture: true, passive: true }), ne.addEventListener("touchmove", ee, { capture: true, passive: true })), true) : false;
  }
  function ie(z) {
    C !== z && (C && (C.removeEventListener("load", pe, true), C.removeEventListener("error", pe, true)), C = z, z.addEventListener("load", pe, true), z.addEventListener("error", pe, true));
  }
  function ue() {
    S || r != null || i >= Tf || (r = setTimeout(() => {
      if (r = null, i += 1, S) return;
      Ce() || ue();
    }, Lf));
  }
  function Ce() {
    if (S) return false;
    const z = e.getView(), B = e.getPreviewRoot();
    let ne = true;
    return z && Se(z) || (ne = false), B ? (We(B) || (ne = false), ie(B)) : ne = false, $e(z, B) || (ne = false), ne;
  }
  function de(z) {
    if (!S && (Ce() || ue(), K(), !!(z == null ? void 0 : z.withRetries))) {
      M();
      for (const B of $o) n.push(setTimeout(() => {
        S || (Ce() || ue(), K());
      }, B));
    }
  }
  function Fe() {
    S = true, M(), A(), I(), O(), p && (p.removeEventListener("scroll", W), p = null), m && (m.removeEventListener("scroll", W), m = null), h && (h.removeEventListener("scroll", W, true), h.removeEventListener("wheel", ee, true), h.removeEventListener("touchmove", ee, true), h = null), C && (C.removeEventListener("load", pe, true), C.removeEventListener("error", pe, true), C = null), P = null, t = false, R = "none";
  }
  return A(), Ce() || ue(), de({ withRetries: true }), { schedule: de, stop: Fe };
}
const Bt = new kr("s3haim-editor-undo-history");
Bt.version(1).stores({ histories: "key, updatedAt" });
const Bo = 100, Us = 10080 * 60 * 1e3, _f = 500;
function $f(e, t) {
  return vr(e, t);
}
function Ff(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" ? null : $f(e.type, e.id);
}
async function Hf(e) {
  if (!e) return null;
  const t = await Bt.histories.get(e);
  return t ? typeof t.updatedAt == "number" && Date.now() - t.updatedAt > Us ? (await Bt.histories.delete(e), null) : !Array.isArray(t.stack) || t.stack.length === 0 ? null : t : null;
}
function Mr(e) {
  return Array.isArray(e) ? e.length <= Bo ? e : e.slice(e.length - Bo) : [""];
}
async function zo({ key: e, stack: t, index: n }) {
  if (!e) return;
  const r = Mr(t), i = Math.max(0, Math.min(n ?? r.length - 1, r.length - 1));
  await Bt.histories.put({ key: e, stack: r, index: i, updatedAt: Date.now() });
}
async function Of() {
  const e = Date.now() - Us;
  await Bt.histories.where("updatedAt").below(e).delete();
}
function cn(e, t, n) {
  const r = Array.isArray(e) && e.length > 0 ? [...e] : [""];
  let i = Math.max(0, Math.min(t, r.length - 1));
  const s = n ?? "";
  if (r[i] === s) return { stack: r, index: i };
  const l = r.lastIndexOf(s);
  if (l >= 0) return { stack: r, index: l };
  const u = r.slice(0, i + 1);
  u.push(s);
  const p = Mr(u);
  return { stack: p, index: p.length - 1 };
}
function Bf(e, t, n) {
  const r = n ?? "", i = Array.isArray(e) && e.length > 0 ? e : [""], s = Math.max(0, Math.min(t, i.length - 1));
  if (i[s] === r) return { stack: i, index: s, changed: false };
  for (let p = s - 1; p >= 0; p -= 1) if (i[p] === r) return { stack: i, index: p, changed: true };
  for (let p = s + 1; p < i.length; p += 1) if (i[p] === r) return { stack: i, index: p, changed: true };
  const l = i.slice(0, s + 1);
  l.push(r);
  const u = Mr(l);
  return { stack: u, index: u.length - 1, changed: true };
}
function zf(e, t, n) {
  if (!(e == null ? void 0 : e.state) || !Array.isArray(t) || t.length === 0) return n == null ? void 0 : n(), false;
  const r = t[t.length - 1] ?? "";
  if (t.length === 1) return e.state.doc.toString() !== r && e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: r }, annotations: [Tn.addToHistory.of(false)] }), n == null ? void 0 : n(), true;
  e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: t[0] ?? "" }, annotations: [Tn.addToHistory.of(false), Pr.of("full")] }), n == null ? void 0 : n();
  for (let s = 1; s < t.length; s += 1) {
    const l = t[s] ?? "";
    e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: l }, annotations: [Pr.of("full")] });
  }
  return e.state.doc.toString() !== r && e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: r }, annotations: [Tn.addToHistory.of(false)] }), true;
}
function Ko(e) {
  return e && typeof e.resetHistory == "function" ? () => e.resetHistory() : null;
}
function Kf(e) {
  var _a2;
  return e ? ((_a2 = e.getEditorView) == null ? void 0 : _a2.call(e)) ?? null : null;
}
function Vo(e) {
  var _a2;
  return ((_a2 = e == null ? void 0 : e.current) == null ? void 0 : _a2.value) ?? (e == null ? void 0 : e.current) ?? null;
}
function Vf({ currentFile: e, value: t, onChange: n, editorRef: r, enabled: i = true }) {
  const s = i ? Ff(e) : null, l = a.useRef([""]), u = a.useRef(0), p = a.useRef(null), m = a.useRef(false), h = a.useRef(null), P = a.useRef(null), C = a.useRef(t), R = a.useRef(false), S = a.useRef(null), M = a.useRef(0), A = a.useRef(t);
  C.current = t;
  const I = a.useCallback(async (D, K, J) => {
    if (D) try {
      await zo({ key: D, stack: K, index: J });
    } catch (Q) {
      console.warn("[editor-undo-history] save failed:", Q);
    }
  }, []), O = a.useCallback((D, K, J) => {
    D && (P.current && clearTimeout(P.current), P.current = setTimeout(() => {
      P.current = null, I(D, K, J);
    }, 300));
  }, [I]), q = a.useCallback(() => {
    h.current && (clearTimeout(h.current), h.current = null);
  }, []), b = a.useCallback(() => {
    const D = C.current ?? "", K = cn(l.current, u.current, D);
    return l.current = K.stack, u.current = K.index, K;
  }, []), T = a.useCallback((D) => {
    const K = Vo(r), J = Kf(K), Q = Ko(K);
    if (!J) return false;
    const re = ++M.current;
    m.current = true;
    try {
      zf(J, D, Q ?? void 0);
    } finally {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          M.current === re && (m.current = false);
        });
      });
    }
    return true;
  }, [r]), X = a.useCallback((D, K) => {
    var _a2, _b;
    const J = C.current ?? "", Q = ((_a2 = K == null ? void 0 : K.stack) == null ? void 0 : _a2.length) ? K.stack : [J], re = ((_b = K == null ? void 0 : K.stack) == null ? void 0 : _b.length) ? K.index ?? K.stack.length - 1 : 0, ae = cn(Q, re, J);
    l.current = ae.stack, u.current = ae.index, S.current = D, R.current = false, A.current = J;
    const le = ae.stack.slice(0, ae.index + 1), we = (te) => {
      p.current === D && (T(le) || te <= 0 || setTimeout(() => we(te - 1), 50));
    };
    we(40), O(D, ae.stack, ae.index);
  }, [T, O]);
  return a.useEffect(() => {
    i && Of().catch(() => {
    });
  }, [i]), a.useEffect(() => {
    var _a2;
    if (!i) return;
    const D = p.current, K = s;
    if (q(), P.current && (clearTimeout(P.current), P.current = null), D && D !== K) {
      const ae = b();
      I(D, ae.stack, ae.index);
    }
    p.current = K, S.current = null, R.current = false;
    const J = Vo(r);
    if ((_a2 = Ko(J)) == null ? void 0 : _a2(), !K) {
      l.current = [C.current ?? ""], u.current = 0;
      return;
    }
    const Q = ++M.current;
    let re = false;
    return (async () => {
      let ae = null;
      try {
        ae = await Hf(K);
      } catch (le) {
        console.warn("[editor-undo-history] load failed:", le);
      }
      re || M.current !== Q || p.current === K && X(K, ae);
    })(), () => {
      re = true;
    };
  }, [i, s, r, q, b, I, X]), a.useEffect(() => {
    if (!i || !s || S.current !== s || R.current || m.current || t === A.current) return;
    const D = t ?? "";
    A.current = D;
    const K = cn(l.current, u.current, D);
    l.current = K.stack, u.current = K.index, T(K.stack.slice(0, K.index + 1)), O(s, K.stack, K.index);
  }, [i, s, t, T, O]), a.useEffect(() => {
    if (i) return () => {
      q(), P.current && (clearTimeout(P.current), P.current = null);
      const D = p.current;
      if (!D) return;
      const K = cn(l.current, u.current, C.current ?? "");
      zo({ key: D, stack: K.stack, index: K.index }).catch(() => {
      });
    };
  }, [i, q]), { onChange: a.useCallback((D) => {
    m.current || (A.current = D, R.current = true, n == null ? void 0 : n(D), !(!i || !p.current) && (q(), h.current = setTimeout(() => {
      if (h.current = null, m.current) return;
      const K = p.current;
      if (!K) return;
      const J = Bf(l.current, u.current, D);
      J.changed && (l.current = J.stack, u.current = J.index, O(K, J.stack, J.index));
    }, _f)));
  }, [i, n, q, O]) };
}
const jr = /^(\s*)([-+*])(\s+)(.*)$/, Lr = /^(\s*)(\d+)([.)])(\s+)(.*)$/, qs = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX])\](.*)$/, Wf = /^(#{1,10})\s+(.*)$/;
function Uf(e) {
  if (!e) return false;
  const t = e[0];
  return [...e].every((n) => n === t);
}
function Xs(e, t, n, r, i) {
  const s = t - r.length, l = n + i.length;
  if (s < 0 || l > e.length || e.sliceString(s, t) !== r || e.sliceString(n, l) !== i) return false;
  if (r === i && Uf(r)) {
    const u = r[0] ?? "";
    if (s > 0 && e.sliceString(s - 1, s) === u || l < e.length && e.sliceString(l, l + 1) === u) return false;
  }
  return true;
}
function qf(e, t, n, r) {
  const { from: i, to: s, empty: l } = t;
  if (l) {
    const m = `${n}${r}`;
    return { change: { from: i, to: s, insert: m }, next: Ke.cursor(i + n.length) };
  }
  const u = e.sliceString(i, s);
  if (u.length >= n.length + r.length && u.startsWith(n) && u.endsWith(r)) {
    const m = u.slice(n.length, u.length - r.length);
    return { change: { from: i, to: s, insert: m }, next: Ke.range(i, i + m.length) };
  }
  if (Xs(e, i, s, n, r)) {
    const m = i - n.length, h = s + r.length;
    return { change: { from: m, to: h, insert: u }, next: Ke.range(m, m + u.length) };
  }
  const p = `${n}${u}${r}`;
  return { change: { from: i, to: s, insert: p }, next: Ke.range(i + n.length, i + n.length + u.length) };
}
function Xf(e, t) {
  if (t.empty) return null;
  const n = e.sliceString(t.from, t.to);
  if (!n) return null;
  let r = "`";
  for (; n.includes(r); ) r += "`";
  if (!n.includes(`
`) && n.startsWith(r) && n.endsWith(r) && n.length > r.length * 2) {
    const l = n.slice(r.length, n.length - r.length);
    return { change: { from: t.from, to: t.to, insert: l }, next: Ke.range(t.from, t.from + l.length) };
  }
  if (Xs(e, t.from, t.to, r, r)) {
    const l = t.from - r.length, u = t.to + r.length;
    return { change: { from: l, to: u, insert: n }, next: Ke.range(l, l + n.length) };
  }
  const s = `${r}${n}${r}`;
  return { change: { from: t.from, to: t.to, insert: s }, next: Ke.range(t.from + r.length, t.from + r.length + n.length) };
}
function Ys(e, t) {
  if (!t.length) return false;
  const n = t.map((i) => i.change).filter((i) => !!i).sort((i, s) => i.from - s.from);
  if (!n.length) return false;
  const r = t.map((i) => i.next);
  return e.dispatch({ changes: n, selection: Ke.create(r, e.state.selection.mainIndex) }), true;
}
function Nt(e, t, n = t) {
  if (!(e == null ? void 0 : e.state) || !t) return false;
  const r = e.state.selection.ranges.map((i) => qf(e.state.doc, i, t, n));
  return Ys(e, r);
}
function Yf(e) {
  return Nt(e, "**");
}
function Gf(e) {
  return Nt(e, "*");
}
function Zf(e) {
  return Nt(e, "~~");
}
function Jf(e) {
  return Nt(e, "<u>", "</u>");
}
function Qf(e) {
  return Nt(e, "^");
}
function em(e) {
  return Nt(e, "~");
}
function Gs(e) {
  if (!(e == null ? void 0 : e.state)) return false;
  const t = e.state.selection.ranges.map((n) => Xf(e.state.doc, n) ?? { next: n });
  return Ys(e, t);
}
function tm(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e.state.selection.ranges) {
    const r = e.state.doc.lineAt(n.from).number, i = e.state.doc.lineAt(n.to).number;
    for (let s = r; s <= i; s += 1) t.add(s);
  }
  return [...t].sort((n, r) => n - r);
}
function Wt(e, t) {
  if (!(e == null ? void 0 : e.state)) return false;
  const n = [];
  for (const r of tm(e)) {
    const i = e.state.doc.line(r), s = t(i.text);
    s !== null && s !== i.text && n.push({ from: i.from, to: i.to, insert: s });
  }
  return n.length ? (e.dispatch({ changes: n }), true) : false;
}
function nm(e) {
  const t = e.match(jr);
  if (t) return `${t[1] ?? ""}1. ${t[4] ?? ""}`;
  const n = e.match(Lr);
  return n ? `${n[1] ?? ""}- ${n[5] ?? ""}` : null;
}
function rm(e) {
  const t = e.match(qs);
  if (!t) return null;
  const n = t[1] ?? "", r = t[2] ?? " ", i = t[3] ?? "";
  return `${n}[${r === " " ? "x" : " "}]${i}`;
}
function om(e) {
  return Wt(e, nm);
}
function sm(e) {
  return Wt(e, rm);
}
function im(e) {
  return Wt(e, (t) => {
    const n = t.match(jr);
    if (n) {
      const i = n[1] ?? "", s = n[4] ?? "";
      return qs.test(t) ? `${i}- ${s.replace(/^\[[ xX]\]\s?/, "")}` : `${i}${s}`;
    }
    const r = t.match(Lr);
    return r ? `${r[1] ?? ""}- ${r[5] ?? ""}` : `- ${t}`;
  });
}
function am(e) {
  return Wt(e, (t) => {
    const n = t.match(Lr);
    if (n) return `${n[1] ?? ""}${n[5] ?? ""}`;
    const r = t.match(jr);
    return r ? `${r[1] ?? ""}1. ${r[4] ?? ""}` : `1. ${t}`;
  });
}
function Wo(e, t) {
  if (t < 1 || t > 10) return false;
  const n = "#".repeat(t);
  return Wt(e, (r) => {
    var _a2;
    const i = r.match(Wf);
    return i ? ((_a2 = i[1]) == null ? void 0 : _a2.length) === t ? i[2] ?? "" : `${n} ${i[2] ?? ""}` : `${n} ${r}`;
  });
}
function Nn(e, t, n = t) {
  if (!(e == null ? void 0 : e.state) || !t) return false;
  const r = e.state.changeByRange((i) => {
    if (i.empty) return { range: i };
    const s = e.state.doc.sliceString(i.from, i.to), l = `${t}${s}${n}`;
    return { changes: { from: i.from, to: i.to, insert: l }, range: Ke.range(i.from + t.length, i.from + t.length + s.length) };
  });
  return r.changes.empty ? false : (e.dispatch(r), true);
}
function lm(e) {
  return Nn(e, "$");
}
function cm(e) {
  return Nn(e, "[", "]");
}
function um(e) {
  return Nn(e, "(", ")");
}
function dm(e) {
  return Nn(e, "{", "}");
}
const fm = "s3haim_md_editor_toc_width", mm = 360;
function Uo(e) {
  const t = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), n = [];
  (t ? e.metaKey : e.ctrlKey) && n.push("mod"), e.altKey && n.push("alt"), e.shiftKey && n.push("shift");
  const r = (e.key || "").toLowerCase();
  return !r || r === "shift" || r === "control" || r === "alt" || r === "meta" || (n.push(r), n.length <= 1) ? null : n.join("+");
}
function un(e) {
  return !e || typeof e != "string" ? "" : e.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
}
const pm = fi({ nonTightLists: false });
function hm(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const { state: t } = e, n = (_b = (_a2 = t.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof n != "number") return;
  const r = t.doc.lineAt(n);
  if (!/^(\s*)([-+*]|\d+[.)]|\[[ xX]\])/.test(r.text) || r.number < 2) return;
  const i = t.doc.line(r.number - 1);
  if (i.text.trim() !== "") return;
  const s = r.from - i.from;
  e.dispatch({ changes: { from: i.from, to: r.from, insert: "" }, selection: Ke.cursor(n - s) });
}
function gm(e) {
  return pm(e) ? (hm(e), true) : fd(e) ? true : di(e);
}
const xm = ci.highest(ts.of([{ key: "Enter", run: gm }]));
function bm(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const t = (_b = (_a2 = e.state.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof t != "number") return;
  const n = e.state.doc.lineAt(t);
  e.dispatch({ changes: { from: n.from, to: n.from, insert: `
` }, selection: { anchor: n.from } });
}
function wm(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return false;
  const { key: t, code: n } = e;
  return t === "`" || t === "?" || t === "\\" || n === "Backquote" || n === "IntlBackslash";
}
function Zs(e, t) {
  if (t.defaultPrevented || t.ctrlKey || t.metaKey || t.altKey || t.isComposing) return false;
  switch (t.key) {
    case "$":
      return lm(e);
    case "[":
      return cm(e);
    case "(":
      return um(e);
    case "{":
      return dm(e);
    default:
      return false;
  }
}
function dn(e, t) {
  return ol() ? t(e) : false;
}
const ym = [{ key: "Alt-h", preventDefault: true, run: (e) => dn(e, Ti) }, { key: "Alt-j", preventDefault: true, run: (e) => dn(e, Pi) }, { key: "Alt-k", preventDefault: true, run: (e) => dn(e, Ri) }, { key: "Alt-l", preventDefault: true, run: (e) => dn(e, Ai) }];
ui({ editorConfig: { languageUserDefined: { "ko-KR": mi }, renderDelay: ds() ? 500 : 0 }, codeMirrorExtensions(e, { keyBindings: t }) {
  const n = [...e].filter((s) => s.type !== "keymap" && s.type !== "linkShortener" && s.type !== "lineNumbers"), r = (t || []).filter((s) => {
    const l = String((s == null ? void 0 : s.key) || "").toLowerCase(), u = String((s == null ? void 0 : s.mac) || "").toLowerCase();
    return l !== "ctrl-d" && l !== "mod-d" && u !== "cmd-d" && l !== "ctrl-b" && l !== "mod-b" && u !== "cmd-b" && l !== "ctrl-u" && l !== "mod-u" && u !== "cmd-u" && l !== "ctrl-o" && l !== "mod-o" && u !== "cmd-o" && l !== "ctrl-arrowup" && l !== "mod-arrowup" && u !== "cmd-arrowup" && l !== "ctrl-arrowdown" && l !== "mod-arrowdown" && u !== "cmd-arrowdown" && !/^ctrl-[0-9]$/.test(l) && !/^mod-[0-9]$/.test(l) && !/^cmd-[0-9]$/.test(u);
  }), i = [{ key: "ArrowLeft", run: (s) => Ir(s, -1) }, { key: "ArrowRight", run: (s) => Ir(s, 1) }, { key: "Ctrl-ArrowLeft", mac: "Alt-ArrowLeft", run: (s) => rt(s, -1, Ei), shift: (s) => rt(s, -1, ki) }, { key: "Ctrl-ArrowRight", mac: "Alt-ArrowRight", run: (s) => rt(s, 1, Ci), shift: (s) => rt(s, 1, Si) }, { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: (s) => rt(s, -1, Mi), shift: (s) => rt(s, -1, Ni) }, { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: (s) => rt(s, 1, Li), shift: (s) => rt(s, 1, ji) }, ...ym, { key: "Alt--", preventDefault: true, run: om }, { key: "Ctrl-Tab", run: sm }, { key: "Ctrl-d", mac: "Cmd-d", preventDefault: true, run: (s) => (gi(s), true) }, { key: "Ctrl-b", mac: "Cmd-b", preventDefault: true, run: Yf }, { key: "Ctrl-i", mac: "Cmd-i", preventDefault: true, run: Gf }, { key: "Ctrl-u", mac: "Cmd-u", preventDefault: true, run: Jf, shift: im }, { key: "Ctrl-o", mac: "Cmd-o", preventDefault: true, run: am }, { key: "Shift-Ctrl-s", mac: "Shift-Cmd-s", preventDefault: true, run: Zf }, { key: "Ctrl-ArrowUp", mac: "Cmd-ArrowUp", preventDefault: true, run: Qf }, { key: "Ctrl-ArrowDown", mac: "Cmd-ArrowDown", preventDefault: true, run: em }, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => ({ key: `Ctrl-${s}`, mac: `Cmd-${s}`, preventDefault: true, run: (l) => Wo(l, s) })), { key: "Ctrl-0", mac: "Cmd-0", preventDefault: true, run: (s) => Wo(s, 10) }, { any: (s, l) => (l.ctrlKey || l.metaKey) && l.altKey && l.code === "KeyC" ? Gs(s) : Zs(s, l) }, { key: "Mod-Alt-ArrowUp", run: pi }, { key: "Mod-Alt-ArrowDown", run: hi }, ...r];
  return n.some((s) => s.type === "drawSelection") || n.push({ type: "drawSelection", extension: xi() }), n.push({ type: "markdownSingleNewlineEnter", extension: xm }, { type: "lineNumbers", extension: af() }, { type: "allowMultipleSelections", extension: bi.allowMultipleSelections.of(true) }, { type: "clickAddsSelectionRange", extension: _t.clickAddsSelectionRange.of((s) => {
    const l = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    return s.altKey || (l ? s.metaKey : s.ctrlKey);
  }) }, { type: "multiCursorPreview", extension: wi({ minSelectionLength: 2, maxMatches: 200 }) }, { type: "keymap", extension: ts.of(i) }, { type: "base64ImageFold", extension: td(gr()) }, { type: "mermaidBase64Fold", extension: ad(gr()) }, { type: "autocompleteGate", extension: _t.updateListener.of((s) => {
    ud(s), !is() && yi(s.state) === "active" && vi(s.view);
  }) }), n;
}, markdownItPlugins(e) {
  return nl(e);
} });
function Wm({ value: e, onChange: t, onSave: n, theme: r = "light", currentFile: i = null, previewOnly: s = false, isMobileLayout: l = false, onUploadImage: u, isUploadingEditorImage: p = false, uploadImagePercent: m = 0, onCancelUploadImage: h, onResolveWikiImageUrl: P, snippetConfig: C = { snippets: [] }, llmProviderProfiles: R = [], getImgbbApiKey: S, onOpenViewPath: M, onRequestConvertAllImagesToWiki: A, onRegisterConvertAllImagesToWiki: I }) {
  var _a2, _b;
  const O = qo(), { showAlert: q } = Ra(), b = a.useId(), T = a.useMemo(() => Ac(b), [b]), X = a.useMemo(() => Dc(T), [T]), E = a.useRef(null), D = a.useRef(null), K = a.useRef(null), J = a.useRef(null), Q = a.useRef(C), re = a.useRef(e), ae = a.useRef(i), le = a.useRef(r), we = a.useRef("");
  a.useEffect(() => {
    re.current = e, ae.current = i, le.current = r;
  }, [e, i, r]), a.useEffect(() => {
    const { issues: f } = us(e ?? "");
    if (!f.length) {
      we.current = "";
      return;
    }
    const g = Aa(f);
    g !== we.current && (we.current = g, q({ title: "Cover syntax error", message: `note-cover has invalid syntax.

${g}` }));
  }, [e, q]);
  const te = a.useCallback((f = {}) => {
    const g = re.current ?? "", x = ae.current;
    os({ currentFile: x, editorContent: g }), O(ss(x == null ? void 0 : x.id), { state: { value: g, theme: le.current === "dark" ? "dark" : "light", currentFile: x, ...f.openCoverEdit ? { openCoverEdit: true } : {} } });
  }, [O]), { onChange: W } = Vf({ currentFile: i, value: e, onChange: t, editorRef: E, enabled: !s }), ee = Wd({ getMarkdown: () => re.current ?? "", setMarkdown: (f) => {
    typeof t == "function" && t(f);
  } }), pe = a.useRef(ee.openAtOffset), Se = a.useRef(ee.openPreviewTable);
  a.useEffect(() => {
    pe.current = ee.openAtOffset, Se.current = ee.openPreviewTable;
  }, [ee.openAtOffset, ee.openPreviewTable]);
  const We = a.useRef(null), [$e, ie] = a.useState(false), [ue, Ce] = a.useState(false), [de, Fe] = a.useState(null), z = a.useRef(() => {
  }), [B, ne] = a.useState(false), [Z, Ee] = a.useState(null), [he, ye] = a.useState(0), [Ae, fe] = a.useState(false), [ge, me] = a.useState(false), De = a.useRef({ from: 0, to: 0 }), je = a.useRef(W);
  a.useEffect(() => {
    je.current = W;
  }, [W]);
  const [He, Oe] = a.useState(null), [xe, Be] = a.useState(null), [Ge, Le] = a.useState(false), [Ue, st] = a.useState(null), [Je, Qe] = a.useState(false), [Me, Ne] = a.useState(null), [j, $] = a.useState(null), Y = a.useRef(null), [et, it] = uc(), [tt, gt] = Uu(), [Ut, qt] = qu(), [Mn, xt] = Xu(), Ie = a.useMemo(() => ds(), []), ve = Ie ? false : Mn, Te = a.useRef(null);
  a.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3, _b2, _c2;
      const v = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      v && (Te.current = v.state.selection);
    }, g = (y) => {
      !(y.metaKey || y.ctrlKey) || y.altKey || y.shiftKey || y.key.toLowerCase() === "k" && f();
    };
    window.addEventListener("keydown", g, true);
    const x = Da(f);
    return () => {
      window.removeEventListener("keydown", g, true), x();
    };
  }, [s]), a.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3;
      return ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current;
    }, g = () => {
      var _a3, _b2;
      const H = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3), U = Te.current;
      !H || !U || H.dispatch({ selection: U, scrollIntoView: true });
    }, x = (L) => {
      var _a3;
      const H = f();
      H && (g(), (_a3 = H.focus) == null ? void 0 : _a3.call(H), typeof H.execCommand == "function" && H.execCommand(L));
    }, y = () => {
      var _a3, _b2, _c2;
      const L = f();
      if (!L) return;
      const H = `

<pgbr/>

`;
      if (typeof L.insert == "function") {
        L.insert(() => ({ targetValue: H, select: false, deviationStart: 0, deviationEnd: 0 })), (_a3 = L.focus) == null ? void 0 : _a3.call(L);
        return;
      }
      const U = (_b2 = L.getEditorView) == null ? void 0 : _b2.call(L);
      U && (U.dispatch(U.state.replaceSelection(H)), (_c2 = U.focus) == null ? void 0 : _c2.call(U));
    }, v = (L = {}) => {
      te(L);
    }, _ = {};
    for (const L of Ia) L.directive && (_[L.id] = () => x(L.directive));
    return _["editor-revoke"] = () => {
      var _a3, _b2;
      g();
      const L = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      L && (L.focus(), ii(L));
    }, _["editor-next"] = () => {
      var _a3, _b2;
      g();
      const L = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      L && (L.focus(), ai(L));
    }, _["editor-llm-assist"] = () => ie(true), _["editor-export-pdf"] = v, _["editor-pgbr"] = () => {
      g(), y();
    }, _["editor-heading-remap"] = () => {
      g(), z.current();
    }, _["editor-checklist-progress"] = () => ne(true), _["editor-table-edit"] = () => {
      var _a3, _b2;
      g();
      const L = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      if (!L) return;
      const { from: H, to: U } = L.state.selection.main;
      pe.current(H, U) || q({ title: "No table", message: "No haim-table found at the cursor or selection position." });
    }, _["editor-image-upload"] = () => {
      const L = document.createElement("input");
      L.type = "file", L.accept = "image/*", L.multiple = true, L.onchange = () => {
        var _a3;
        const H = Array.from(L.files || []);
        H.length && ((_a3 = We.current) == null ? void 0 : _a3.call(We, H));
      }, L.click();
    }, _["editor-image-clip"] = () => {
      const L = document.createElement("input");
      L.type = "file", L.accept = "image/*", L.onchange = () => {
        var _a3;
        const H = (_a3 = L.files) == null ? void 0 : _a3[0];
        H && Oe(H);
      }, L.click();
    }, _["editor-convert-all-images-to-wiki"] = () => {
      typeof A == "function" && A();
    }, _["editor-insert-footnote"] = () => {
      qr({ mode: "footnote-insert" });
    }, _["editor-insert-circle-number"] = (L) => {
      var _a3, _b2, _c2;
      const H = typeof L == "string" ? L : "";
      if (!H) {
        qr({ mode: "circle-number" });
        return;
      }
      g();
      const oe = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      oe && (oe.dispatch(oe.state.replaceSelection(H)), (_c2 = oe.focus) == null ? void 0 : _c2.call(oe));
    }, _["editor-insert-snippet"] = (L) => {
      var _a3, _b2, _c2;
      const H = typeof L == "string" ? L : "";
      if (!H) return;
      g();
      const oe = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      oe && (oe.dispatch(oe.state.replaceSelection(H)), (_c2 = oe.focus) == null ? void 0 : _c2.call(oe));
    }, _a(_);
  }, [s, te, q, A]), a.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3, _b2, _c2;
      return ((_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? null;
    }, g = () => {
      const y = f(), v = Te.current;
      !y || !v || y.dispatch({ selection: v, scrollIntoView: true });
    }, x = (y, v) => {
      var _a3, _b2;
      const _ = f();
      _ && (_.dispatch({ changes: { from: 0, to: _.state.doc.length, insert: y }, selection: { anchor: v }, scrollIntoView: true }), (_a3 = _.focus) == null ? void 0 : _a3.call(_)), (_b2 = je.current) == null ? void 0 : _b2.call(je, y);
    };
    return $a({ getMarkdown: () => {
      var _a3;
      return ((_a3 = f()) == null ? void 0 : _a3.state.doc.toString()) ?? re.current ?? "";
    }, insertExisting: (y) => {
      g();
      const v = f(), _ = (v == null ? void 0 : v.state.doc.toString()) ?? re.current ?? "", L = v == null ? void 0 : v.state.selection.main, H = rl(_, (L == null ? void 0 : L.from) ?? 0, (L == null ? void 0 : L.to) ?? 0, y);
      x(H.next, H.caret);
    }, openCompose: () => {
      var _a3;
      g();
      const v = (_a3 = f()) == null ? void 0 : _a3.state.selection.main;
      De.current = { from: (v == null ? void 0 : v.from) ?? 0, to: (v == null ? void 0 : v.to) ?? 0 }, me(true);
    } });
  }, [s]);
  const { width: qe, isResizing: Xt, handleProps: Yt } = Fa({ storageKey: fm, defaultWidth: mm, minWidth: 160, collapseBelowWidth: 80, maxWidth: 640, edge: "right", onCollapseBelowMin: () => {
    var _a3, _b2, _c2;
    (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.toggleCatalog) == null ? void 0 : _c2.call(_b2, false);
  } }), at = a.useMemo(() => {
    const { meta: f } = Ha(e ?? "");
    return f;
  }, [e]), Gt = a.useMemo(() => {
    const f = at == null ? void 0 : at.fonts;
    return f ? { "--print-font-body": rn(f.body), "--print-font-heading": rn(f.heading), "--print-font-bold": rn(f.bold), "--print-font-code": rn(f.code, "mono") } : {};
  }, [at]);
  a.useEffect(() => {
    Q.current = C || { snippets: [] };
  }, [C]), a.useEffect(() => {
    const f = () => {
      var _a3, _b2, _c2;
      const v = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return v ? (nd(v, tt), ld(v, tt), true) : false;
    };
    if (f()) return;
    const g = window.setTimeout(f, 50), x = window.setTimeout(f, 250);
    return () => {
      window.clearTimeout(g), window.clearTimeout(x);
    };
  }, [tt]), a.useEffect(() => {
    const f = D.current;
    if (!f) return;
    const g = () => {
      const y = f.querySelector(".md-editor-catalog-fixed, .md-editor-catalog-flat");
      Ne((v) => v === y ? v : y);
    };
    g();
    const x = new MutationObserver(g);
    return x.observe(f, { childList: true, subtree: true }), () => x.disconnect();
  }, []), a.useEffect(() => {
    const f = D.current;
    f && f.style.setProperty("--md-catalog-width", `${qe}px`);
  }, [qe]), a.useLayoutEffect(() => {
    if (!Me) {
      $(null);
      return;
    }
    const f = () => {
      const y = Me.getBoundingClientRect();
      if (y.width <= 0 || y.height <= 0) {
        $(null);
        return;
      }
      $({ top: y.top, left: y.left, height: y.height });
    };
    f();
    const g = new ResizeObserver(f);
    g.observe(Me);
    const x = D.current;
    return x && g.observe(x), window.addEventListener("resize", f), window.addEventListener("scroll", f, true), () => {
      g.disconnect(), window.removeEventListener("resize", f), window.removeEventListener("scroll", f, true);
    };
  }, [Me, qe]), a.useEffect(() => {
    if (Me) return Hc(Me, { getEditorRoot: () => D.current, mdHeadingId: (f) => X(f) });
  }, [Me, X]), hc(D, e, P, (i == null ? void 0 : i.id) ?? null), fc(D, { layoutKey: `${r}|${e}` }), a.useEffect(() => {
    const f = D.current;
    if (!f || !e) return;
    let g = 0;
    const x = () => {
      ff(f, e, P);
    }, y = () => {
      const U = f.querySelectorAll("[data-note-cover-mount]");
      !U.length || !(f.querySelector(".md-note-cover-placeholder--pending") || [...U].some((ke) => ke.childNodes.length === 0)) || g || (g = window.requestAnimationFrame(() => {
        g = 0, x();
      }));
    }, _ = [0, 80, 280, 600, 1100, 2e3].map((U) => setTimeout(x, U)), L = f.querySelector(".md-editor-preview") || f, H = typeof MutationObserver < "u" ? new MutationObserver(y) : null;
    return H == null ? void 0 : H.observe(L, { childList: true, subtree: true }), () => {
      g && window.cancelAnimationFrame(g), _.forEach((U) => clearTimeout(U)), H == null ? void 0 : H.disconnect();
    };
  }, [e, P, i == null ? void 0 : i.id]), a.useEffect(() => {
    const f = D.current;
    return () => {
      mf(f);
    };
  }, []), a.useEffect(() => {
    if (s) return;
    const f = qd(i), g = () => {
      var _a3, _b2, _c2;
      const v = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return v ? (Qd(v, f), true) : false;
    };
    if (g()) return;
    const x = [50, 200, 500, 1e3].map((y) => setTimeout(g, y));
    return () => x.forEach((y) => clearTimeout(y));
  }, [i == null ? void 0 : i.id, i == null ? void 0 : i.type, s]), a.useEffect(() => {
    const f = D.current;
    if (!f) return;
    const g = Sf(i), x = { current: [] };
    let y = false, v = null, _ = null, L = [];
    const H = () => f.querySelector(".md-editor-preview"), U = () => {
      if (y) return;
      const se = H();
      if (!se || !wf(se)) return;
      const Pe = kf(se, { collapsedIds: x.current, onCollapsedChange: (d) => {
        x.current = d, g && Nf(g, d);
      } }), c = v;
      v = () => {
        c == null ? void 0 : c(), Pe();
      };
    }, oe = (se) => {
      !se || _ || typeof MutationObserver > "u" || (_ = new MutationObserver(U), _.observe(se, { childList: true, subtree: true }));
    };
    return (async () => {
      if (g) {
        const se = await Cf(g);
        if (y) return;
        se && (x.current = se);
      }
      y || (oe(H()), U(), L = [80, 250, 600].map((se) => setTimeout(() => {
        y || (oe(H()), U());
      }, se)));
    })(), () => {
      y = true, L.forEach((se) => clearTimeout(se)), _ == null ? void 0 : _.disconnect(), _ = null, v == null ? void 0 : v(), v = null;
    };
  }, [i == null ? void 0 : i.id, i == null ? void 0 : i.type]), a.useEffect(() => {
    var _a3, _b2, _c2;
    if (!s) return;
    (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c2.call(_b2, true);
  }, [s]), a.useEffect(() => {
    if (!l || s || !(i == null ? void 0 : i.id)) return;
    xt(false);
    const f = () => {
      var _a3, _b2, _c2;
      (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c2.call(_b2, true);
    };
    f();
    const g = [80, 240, 600].map((x) => setTimeout(f, x));
    return () => {
      g.forEach((x) => clearTimeout(x));
    };
  }, [l, s, i == null ? void 0 : i.id, xt]), a.useEffect(() => {
    if (s || Ie) return;
    const f = D.current;
    if (!f) return;
    const g = () => f.querySelector(".md-editor-preview"), x = () => ve;
    let y = null;
    const v = (c) => c instanceof Element ? Gn(c) ? true : !!c.closest("a, button, input, textarea, select, .md-editor-code-action, [data-transform-handle]") : false, _ = (c) => {
      var _a3, _b2, _c2, _d2, _e2, _f2;
      const d = g();
      if (!d || Dt(d)) return;
      if (!x()) {
        const F = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window);
        (F == null ? void 0 : F.rangeCount) && d.contains(F.getRangeAt(0).commonAncestorContainer) && !F.getRangeAt(0).collapsed ? Pn(d, { allowCollapsed: false }) : Tt(d);
        return;
      }
      const w = (_b2 = window.getSelection) == null ? void 0 : _b2.call(window);
      if (!w || w.rangeCount === 0) {
        if (!(c instanceof Element) || !c.closest("td, th")) return;
      } else {
        const F = w.getRangeAt(0);
        if (!d.contains(F.commonAncestorContainer) && !(c instanceof Element && c.closest("td, th"))) return;
      }
      const k = (_e2 = (_d2 = ((_c2 = E.current) == null ? void 0 : _c2.value) ?? E.current) == null ? void 0 : _d2.getEditorView) == null ? void 0 : _e2.call(_d2);
      k && ((w == null ? void 0 : w.rangeCount) && d.contains(w.getRangeAt(0).commonAncestorContainer) && Pn(d, { allowCollapsed: true }), Rr(k, d, { focus: true, target: c }), Rn(), (_f2 = J.current) == null ? void 0 : _f2.schedule({ withRetries: true }));
    }, L = (c) => c.button === 2 || c.button === 0 && c.ctrlKey, H = (c, d) => Ar(d, c.clientX, c.clientY) ? true : Dr(c.clientX, c.clientY) ? zi(d) : false, U = (c) => {
      var _a3, _b2, _c2, _d2;
      const d = g();
      if (!d) return;
      const w = c.target;
      if (!(w instanceof Node)) return;
      if (d.contains(w) && L(c)) {
        H(c, d);
        return;
      }
      if (d.contains(w)) {
        y = { x: c.clientX, y: c.clientY }, !Gn(w) && !x() && Tt(d);
        return;
      }
      if (y = null, (_d2 = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) == null ? void 0 : _d2.dom.contains(w)) {
        if (L(c)) return;
        An(), x() || Tt(d);
      }
    }, oe = (c) => {
      const d = g();
      !d || !(c.target instanceof Node) || !d.contains(c.target) || H(c, d);
    }, ke = (c) => {
      var _a3, _b2, _c2;
      if (L(c)) return;
      const d = g();
      if (!(!d || !(c.target instanceof Node) || !d.contains(c.target)) && !v(c.target)) {
        if (fn(f)) {
          const w = !!(y && Math.hypot(c.clientX - y.x, c.clientY - y.y) > 6);
          if (y = null, !x() || w) return;
          const k = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), F = c.target instanceof Element ? or(c.target, d) : null;
          k && F && (Rn(), lo(F, k, d, c.clientX, c.clientY));
          return;
        }
        y = null, requestAnimationFrame(() => _(c.target));
      }
    }, se = (c) => {
      var _a3, _b2, _c2, _d2;
      const d = g();
      if (!(!d || !(c.target instanceof Node) || !d.contains(c.target)) && !v(c.target)) {
        if (fn(f)) {
          if (!x()) return;
          const N = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), k = (_d2 = c.changedTouches) == null ? void 0 : _d2[0], F = c.target instanceof Element ? or(c.target, d) : null;
          N && F && k && (Rn(), lo(F, N, d, k.clientX, k.clientY));
          return;
        }
        requestAnimationFrame(() => _(c.target));
      }
    }, Pe = (c) => {
      var _a3, _b2, _c2, _d2, _e2;
      if (!x() || c.isComposing || c.keyCode === 229 || c.key === "Process" || (c.metaKey || c.ctrlKey) && (c.key === "s" || c.key === "S" || c.code === "KeyS") || Gn(c.target)) return;
      const d = g();
      if (!d || Dt(d) || fn(f)) return;
      const w = c.target, N = w instanceof Node && d.contains(w), k = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), F = (k == null ? void 0 : k.rangeCount) > 0 && d.contains(k.getRangeAt(0).commonAncestorContainer);
      if (!N && !F) return;
      const be = (_d2 = (_c2 = ((_b2 = E.current) == null ? void 0 : _b2.value) ?? E.current) == null ? void 0 : _c2.getEditorView) == null ? void 0 : _d2.call(_c2);
      be && (be.hasFocus || (F ? (Pn(d, { allowCollapsed: true }), Rr(be, d, { focus: true }), (_e2 = J.current) == null ? void 0 : _e2.schedule({ withRetries: true })) : be.focus()));
    };
    return f.addEventListener("mousedown", U, true), f.addEventListener("contextmenu", oe, true), f.addEventListener("mouseup", ke), f.addEventListener("touchend", se, { passive: true }), f.addEventListener("keydown", Pe, true), () => {
      Tt(g()), f.removeEventListener("mousedown", U, true), f.removeEventListener("contextmenu", oe, true), f.removeEventListener("mouseup", ke), f.removeEventListener("touchend", se), f.removeEventListener("keydown", Pe, true);
    };
  }, [s, ve, Ie]), a.useEffect(() => {
    var _a3, _b2, _c2, _d2;
    if (s) {
      (_a3 = K.current) == null ? void 0 : _a3.stop(), K.current = null, (_b2 = J.current) == null ? void 0 : _b2.stop(), J.current = null, An();
      return;
    }
    const f = D.current, g = () => {
      var _a4;
      return (_a4 = f ?? D.current) == null ? void 0 : _a4.querySelector(".md-editor-preview");
    }, x = () => {
      var _a4, _b3, _c3;
      return (_c3 = (_b3 = ((_a4 = E.current) == null ? void 0 : _a4.value) ?? E.current) == null ? void 0 : _b3.getEditorView) == null ? void 0 : _c3.call(_b3);
    };
    (_c2 = K.current) == null ? void 0 : _c2.stop();
    const y = If({ getPreviewRoot: g, getView: x });
    K.current = y, (_d2 = J.current) == null ? void 0 : _d2.stop(), J.current = null, ve ? J.current = jf({ getPreviewRoot: g, getView: x }) : An();
    const v = cd((_, L) => {
      var _a4;
      const H = x();
      !H || _ !== H || (y.schedule({ withRetries: L.docChanged }), ve && ((_a4 = J.current) == null ? void 0 : _a4.schedule({ withRetries: L.docChanged })));
    });
    return () => {
      var _a4, _b3;
      v(), (_a4 = J.current) == null ? void 0 : _a4.stop(), J.current = null, (_b3 = K.current) == null ? void 0 : _b3.stop(), K.current = null;
    };
  }, [s, ve]), a.useEffect(() => {
    if (s || Ie || !ve) {
      au();
      return;
    }
    const f = D.current;
    if (f) return iu(f, { getPreviewRoot: () => f.querySelector(".md-editor-preview"), getView: () => {
      var _a3, _b2, _c2;
      return (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    }, isEnabled: () => ve });
  }, [s, ve, Ie]), a.useEffect(() => {
    var _a3, _b2, _c2;
    const g = (_a3 = D.current) == null ? void 0 : _a3.querySelector(".md-editor-preview");
    if (cu(), !!g && ((_b2 = K.current) == null ? void 0 : _b2.schedule({ withRetries: true }), !Ie)) {
      if (ve && !Dt(g)) {
        (_c2 = J.current) == null ? void 0 : _c2.schedule({ withRetries: true });
        return;
      }
      ve || Tt(g);
    }
  }, [e, i == null ? void 0 : i.id, ve, Ie]), a.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3;
      const g = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current;
      return (g == null ? void 0 : g.domEventHandlers) ? (g.domEventHandlers({ paste: (x, y) => {
        const v = x.clipboardData;
        if (!v || !y) return;
        const _ = cl(v);
        if (_.length && typeof u == "function") {
          if (p) return x.preventDefault(), false;
          x.preventDefault();
          const H = y;
          return u(_).then((U) => {
            var _a4, _b2, _c2;
            if (!(U == null ? void 0 : U.length)) return;
            const oe = U.map((Pe) => `![[${Pe}]]`).join(`
`), se = ((_c2 = (_b2 = ((_a4 = E.current) == null ? void 0 : _a4.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? H;
            se && se.dispatch(se.state.replaceSelection(oe));
          }), false;
        }
        const L = v.getData("text/plain") ?? "";
        if (L) return x.preventDefault(), y.dispatch(y.state.replaceSelection(L)), false;
      }, keydown: (x, y) => {
        var _a4;
        if (!y) return;
        if (!y.composing && wm(x) && Gs(y) || !y.composing && Zs(y, x)) return x.preventDefault(), x.stopPropagation(), true;
        const v = Uo(x);
        if (!v) return;
        if (v === "mod+shift+enter") return x.preventDefault(), x.stopPropagation(), bm(y), false;
        if (v === "mod+s") return;
        const L = ((_a4 = Q.current) == null ? void 0 : _a4.snippets) || [], H = un(v), U = L.find((oe) => un(oe.prefix) === H && (oe.body || "").trim());
        if (U) return x.preventDefault(), x.stopPropagation(), y.dispatch(y.state.replaceSelection(U.body)), false;
      } }), true) : false;
    };
    if (!f()) {
      const g = setTimeout(f, 100);
      return () => clearTimeout(g);
    }
  }, [s, u, p]), a.useEffect(() => {
    if (s) return;
    const f = (g) => {
      var _a3, _b2, _c2, _d2, _e2, _f2;
      const x = Uo(g);
      if (!x || x === "mod+s") return;
      const v = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      if (!v) return;
      const _ = D.current, L = g.target;
      if (!(_ == null ? void 0 : _.contains(L)) && !((_d2 = v.dom) == null ? void 0 : _d2.contains(L))) return;
      const U = ((_e2 = Q.current) == null ? void 0 : _e2.snippets) || [], oe = un(x), ke = U.find((se) => un(se.prefix) === oe && (se.body || "").trim());
      ke && (g.preventDefault(), g.stopPropagation(), (_f2 = g.stopImmediatePropagation) == null ? void 0 : _f2.call(g), v.dispatch(v.state.replaceSelection(ke.body)));
    };
    return document.addEventListener("keydown", f, true), () => document.removeEventListener("keydown", f, true);
  }, [s, C]), a.useEffect(() => {
    if (typeof n != "function") return;
    const f = (g) => {
      var _a3, _b2, _c2, _d2, _e2;
      if (!(g.ctrlKey || g.metaKey) || g.altKey || g.key !== "s" && g.key !== "S" && g.code !== "KeyS") return;
      const x = D.current;
      if (!x) return;
      const y = g.target, v = y instanceof Node && x.contains(y), _ = x.querySelector(".md-editor-preview"), L = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), H = !!(_ && (L == null ? void 0 : L.rangeCount) && _.contains(L.getRangeAt(0).commonAncestorContainer));
      if (!v && !H && !Dt(_)) return;
      g.preventDefault(), g.stopPropagation(), (_b2 = g.stopImmediatePropagation) == null ? void 0 : _b2.call(g);
      const oe = (_e2 = (_d2 = ((_c2 = E.current) == null ? void 0 : _c2.value) ?? E.current) == null ? void 0 : _d2.getEditorView) == null ? void 0 : _e2.call(_d2);
      lu(oe), n();
    };
    return document.addEventListener("keydown", f, true), () => document.removeEventListener("keydown", f, true);
  }, [n]), a.useEffect(() => {
    const f = D.current;
    if (!f) return;
    const g = (x) => {
      var _a3, _b2, _c2, _d2, _e2, _f2, _g, _h, _i2;
      const y = f.querySelector(".md-editor-preview"), v = (_b2 = (_a3 = x.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "table");
      if (v && y && y.contains(v) || y && (Ar(y, x.clientX, x.clientY) || Dr(x.clientX, x.clientY))) return;
      const _ = (_d2 = (_c2 = x.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, ".cm-editor");
      if (_ && f.contains(_)) {
        const ke = (_g = (_f2 = ((_e2 = E.current) == null ? void 0 : _e2.value) ?? E.current) == null ? void 0 : _f2.getEditorView) == null ? void 0 : _g.call(_f2);
        if (ke) {
          const { from: se, to: Pe } = ke.state.selection.main, c = re.current ?? "";
          if (ir(c, se, Pe)) {
            x.preventDefault(), pe.current(se, Pe);
            return;
          }
        }
      }
      const L = (_i2 = (_h = x.target) == null ? void 0 : _h.closest) == null ? void 0 : _i2.call(_h, "img[data-wiki-path], img[data-md-src]");
      if (!L || !f.contains(L)) return;
      const H = Za(L);
      if (!H.kind || !H.key) return;
      x.preventDefault();
      const U = H.kind === "wiki" ? Ja(f, L, H.key) : Qa(f, L, H.key);
      Ee({ kind: H.kind, key: H.key, width: H.width, height: H.height, occurrence: U, imageSrc: L.currentSrc || L.src || "" });
    };
    return f.addEventListener("contextmenu", g), () => f.removeEventListener("contextmenu", g);
  }, [q]), a.useEffect(() => {
    const f = D.current;
    if (!f) return;
    const g = (x) => {
      var _a3, _b2, _c2, _d2;
      if ((_b2 = (_a3 = x.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const y = f.querySelector(".md-editor-preview"), v = (_d2 = (_c2 = x.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "table");
      if (!v || !y || !y.contains(v)) return;
      x.preventDefault(), x.stopPropagation(), Se.current(v, y) || q({ title: "No table", message: "No haim-table found at this position. Click inside a table cell and try again." });
    };
    return f.addEventListener("dblclick", g, true), () => f.removeEventListener("dblclick", g, true);
  }, [q]), a.useEffect(() => {
    const f = D.current;
    if (f) return Hi(f);
  }, []), a.useEffect(() => {
    const f = () => {
      ye((g) => g + 1);
    };
    return window.addEventListener(Xr, f), () => {
      window.removeEventListener(Xr, f);
    };
  }, []), a.useEffect(() => {
    const f = D.current;
    if (!f) return;
    const g = (v) => {
      (v.classList.contains("md-note-cover-placeholder--ready") || v.classList.contains("md-note-cover-placeholder--empty") || v.classList.contains("md-note-cover-placeholder--pending")) && Qe(true);
    }, x = (v) => {
      var _a3, _b2, _c2, _d2, _e2, _f2;
      const _ = (_b2 = (_a3 = v.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      if (_ && f.contains(_)) {
        v.preventDefault(), v.stopPropagation(), g(_);
        return;
      }
      const L = (_d2 = (_c2 = v.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "[data-chat-saved-note]");
      if (L && f.contains(L)) {
        v.preventDefault(), v.stopPropagation(), O(el({ id: L.getAttribute("data-chat-id") || "", href: L.getAttribute("data-chat-href") || L.getAttribute("href") || "" }));
        return;
      }
      const H = (_f2 = (_e2 = v.target) == null ? void 0 : _e2.closest) == null ? void 0 : _f2.call(_e2, "a[href]");
      if (!H || !f.contains(H) || v.metaKey || v.ctrlKey || v.shiftKey || v.altKey || typeof v.button == "number" && v.button !== 0 || H.hasAttribute("data-md-footnote-to")) return;
      const U = H.getAttribute("href") || "", oe = tl(U, { currentViewPath: (i == null ? void 0 : i.type) ? i.id : null });
      if (oe.kind !== "app") return;
      if (v.preventDefault(), v.stopPropagation(), oe.viewPath && typeof M == "function") {
        M(oe.viewPath);
        return;
      }
      const ke = oe.search || "", se = oe.hash || "";
      O(`${oe.pathname || "/"}${ke}${se}`);
    }, y = (v) => {
      var _a3, _b2;
      if (v.key !== "Enter" && v.key !== " ") return;
      const _ = (_b2 = (_a3 = v.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      !_ || !f.contains(_) || (v.preventDefault(), v.stopPropagation(), g(_));
    };
    return f.addEventListener("click", x), f.addEventListener("keydown", y), () => {
      f.removeEventListener("click", x), f.removeEventListener("keydown", y);
    };
  }, [O, i == null ? void 0 : i.id, i == null ? void 0 : i.type, M]);
  const Zt = a.useCallback(({ width: f, height: g }) => {
    const x = Z;
    if (!(x == null ? void 0 : x.key) || typeof W != "function") return;
    const y = x.kind === "wiki" ? Fn(e, { path: x.key, occurrence: x.occurrence ?? 0, width: f, height: g }) : Hn(e, { src: x.key, occurrence: x.occurrence ?? 0, width: f, height: g });
    y.updated && y.markdown !== e && W(y.markdown);
  }, [Z, W, e]), Jt = a.useCallback(async ({ file: f }) => {
    var _a3;
    const g = Z;
    if (!(g == null ? void 0 : g.key) || typeof u != "function") throw new Error("Upload handler not available.");
    const y = (_a3 = await u([f])) == null ? void 0 : _a3[0];
    if (!y) throw new Error("Upload succeeded but no path was returned.");
    if (typeof W != "function") return;
    const v = g.kind === "wiki" ? Oa(e, { path: g.key, occurrence: g.occurrence ?? 0, nextPath: y }) : Yr(e, { src: g.key, occurrence: g.occurrence ?? 0, nextPath: y });
    v.updated && v.markdown !== e && W(v.markdown);
  }, [W, u, e, Z]), nt = a.useCallback(async ({ width: f, height: g }) => {
    var _a3;
    const x = Z;
    if (!(x == null ? void 0 : x.key) || x.kind !== "markdown") throw new Error("Cannot convert: not a markdown image.");
    if (typeof W != "function") throw new Error("Cannot apply change.");
    const y = await Ba({ markdownSrc: x.key, displaySrc: x.imageSrc, currentNotePath: (i == null ? void 0 : i.id) ?? null });
    let v = "";
    if (y.mode === "path") v = y.path;
    else {
      if (typeof u != "function") throw new Error("Upload handler not available.");
      if (v = ((_a3 = await u([y.file])) == null ? void 0 : _a3[0]) || "", !v) throw new Error("Upload succeeded but no path was returned.");
    }
    const _ = Yr(e, { src: x.key, occurrence: x.occurrence ?? 0, nextPath: v, width: f, height: g });
    _.updated && _.markdown !== e && W(_.markdown);
  }, [i == null ? void 0 : i.id, W, u, e, Z]), jn = a.useCallback(async ({ width: f, height: g }) => {
    const x = Z;
    if (!(x == null ? void 0 : x.key) || !(x == null ? void 0 : x.kind)) throw new Error("Cannot convert: image target is missing.");
    if (typeof W != "function") throw new Error("Cannot apply change.");
    const y = typeof S == "function" ? String(await Promise.resolve(S()) || "").trim() : "";
    if (!y) throw new Error("ImgBB API key is missing. Please add it in settings.");
    const v = za({ path: x.key, imageSrc: x.imageSrc });
    if (!v) throw new Error("Cannot determine image source URL for upload.");
    const L = (await Ka({ apiKey: y, image: v, name: Va(x.key) ? "image" : void 0 })).url, H = x.occurrence ?? 0;
    let U = e;
    const oe = x.kind === "wiki" ? Fn(U, { path: x.key, occurrence: H, width: f, height: g }) : Hn(U, { src: x.key, occurrence: H, width: f, height: g });
    oe.updated && (U = oe.markdown);
    const ke = await Wa(U, { kind: x.kind === "wiki" ? "wiki" : "markdown", key: x.key, occurrence: H }, L);
    if (!ke.updated && U === e) throw new Error("ImgBB upload succeeded but markdown could not be updated.");
    W(ke.markdown);
  }, [S, W, e, Z]);
  a.useEffect(() => {
    if (typeof I == "function") return I(async () => {
      if (s) throw new Error("Cannot convert images in preview-only mode.");
      if (typeof W != "function") throw new Error("Cannot apply change.");
      if (!Ua(e)) return { markdown: e, converted: 0, failed: [] };
      const f = await qa(e, { currentNotePath: (i == null ? void 0 : i.id) ?? null, uploadFiles: async (g) => {
        if (typeof u != "function") throw new Error("Upload handler not available.");
        return u(g);
      } });
      return f.markdown !== e && W(f.markdown), f;
    }), () => I(null);
  }, [i == null ? void 0 : i.id, W, I, u, s, e]);
  const Xe = a.useCallback((f) => {
    const g = D.current;
    if (!g || !(f == null ? void 0 : f.kind) || !(f == null ? void 0 : f.key)) return null;
    const x = f.kind === "wiki" ? "img[data-wiki-path]" : "img[data-md-src]";
    return [...g.querySelectorAll(x)].filter((_) => (f.kind === "wiki" ? _.getAttribute("data-wiki-path") : _.getAttribute("data-md-src")) === f.key)[f.occurrence ?? 0] ?? null;
  }, []), bt = a.useCallback(({ kind: f, key: g, occurrence: x, widthPx: y, heightPx: v }) => {
    if (!g || typeof W != "function") return false;
    const _ = Number.isFinite(y) ? `${Math.round(y)}px` : null, L = Number.isFinite(v) ? `${Math.round(v)}px` : null, H = f === "wiki" ? Fn(e, { path: g, occurrence: x, width: _, height: L }) : Hn(e, { src: g, occurrence: x, width: _, height: L });
    return H.updated && H.markdown !== e ? (W(H.markdown), true) : false;
  }, [W, e]), Mt = a.useCallback(() => {
    const f = Z;
    if (!(f == null ? void 0 : f.kind) || !(f == null ? void 0 : f.key)) return;
    const g = Xe(f);
    if (!g) return;
    const x = g.getBoundingClientRect(), y = Math.max(24, Math.round(x.width)), v = Math.max(24, Math.round(x.height)), _ = { kind: f.kind, key: f.key, occurrence: f.occurrence ?? 0, widthPx: y, heightPx: v, originalWidthPx: y, originalHeightPx: v };
    g.style.width = `${y}px`, g.style.height = `${v}px`, Y.current = _, Be(_), Le(false);
  }, [Xe, Z]);
  a.useEffect(() => {
    if (!xe) {
      st(null);
      return;
    }
    const f = Xe(xe);
    if (!f) {
      Be(null), st(null);
      return;
    }
    let g = 0;
    const x = () => {
      const y = f.getBoundingClientRect();
      st({ left: y.left, top: y.top, width: y.width, height: y.height }), g = requestAnimationFrame(x);
    };
    return g = requestAnimationFrame(x), () => cancelAnimationFrame(g);
  }, [xe, Xe]), a.useEffect(() => {
    if (!xe) return;
    const f = Xe(xe);
    if (!f) return;
    const g = (v) => {
      var _a3, _b2;
      const _ = (_b2 = (_a3 = v.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]");
      if (!_) return;
      v.preventDefault();
      const L = _.getAttribute("data-transform-handle");
      if (!L) return;
      const H = v.pointerType === "touch", U = Y.current || xe, oe = v.clientX, ke = v.clientY, se = U.heightPx > 0 ? U.widthPx / U.heightPx : 1, Pe = (d) => {
        const w = d.clientX - oe, N = d.clientY - ke;
        let k = U.widthPx, F = U.heightPx;
        if (L.includes("e") && (k = U.widthPx + w), L.includes("w") && (k = U.widthPx - w), L.includes("s") && (F = U.heightPx + N), L.includes("n") && (F = U.heightPx - N), k = Math.max(24, k), F = Math.max(24, F), H || d.shiftKey) {
          const Ze = Math.abs((k - U.widthPx) / Math.max(1, U.widthPx)), V = Math.abs((F - U.heightPx) / Math.max(1, U.heightPx));
          Ze >= V ? F = Math.max(24, k / Math.max(1e-4, se)) : k = Math.max(24, F * se);
        }
        k = Math.max(24, Math.round(k)), F = Math.max(24, Math.round(F)), f.style.width = `${k}px`, f.style.height = `${F}px`;
        const be = { ...Y.current || U, widthPx: k, heightPx: F };
        Y.current = be, Be(be);
      }, c = () => {
        document.removeEventListener("pointermove", Pe, true), document.removeEventListener("pointerup", c, true);
      };
      document.addEventListener("pointermove", Pe, true), document.addEventListener("pointerup", c, true);
    }, x = (v) => {
      v.key === "Enter" && (v.preventDefault(), Le(true));
    }, y = (v) => {
      var _a3, _b2, _c2, _d2;
      const _ = (_b2 = (_a3 = v.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]"), L = (_d2 = (_c2 = v.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "img[data-wiki-path], img[data-md-src]");
      _ || L === f || Le(true);
    };
    return document.addEventListener("pointerdown", g, true), document.addEventListener("pointerdown", y, true), document.addEventListener("keydown", x, true), () => {
      document.removeEventListener("pointerdown", g, true), document.removeEventListener("pointerdown", y, true), document.removeEventListener("keydown", x, true);
    };
  }, [xe, Xe]);
  const Qt = a.useCallback(() => {
    const f = Y.current || xe;
    f && (bt(f), Be(null), Y.current = null, Le(false));
  }, [bt, xe]), Ln = a.useCallback(() => {
    const f = Y.current || xe;
    if (!f) return;
    const g = Xe(f);
    g && (g.style.width = `${f.originalWidthPx}px`, g.style.height = `${f.originalHeightPx}px`), Be(null), Y.current = null, Le(false);
  }, [Xe, xe]), lt = a.useCallback((f) => {
    var _a3, _b2, _c2, _d2;
    const g = String(f || "");
    if (!g) return;
    const x = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current;
    if (typeof (x == null ? void 0 : x.insert) == "function") {
      x.insert(() => ({ targetValue: g, select: false, deviationStart: 0, deviationEnd: 0 })), (_b2 = x.focus) == null ? void 0 : _b2.call(x);
      return;
    }
    const y = (_c2 = x == null ? void 0 : x.getEditorView) == null ? void 0 : _c2.call(x);
    y && (y.dispatch(y.state.replaceSelection(g)), (_d2 = y.focus) == null ? void 0 : _d2.call(y));
  }, []), ct = a.useCallback(async (f) => {
    if (!(f == null ? void 0 : f.length) || typeof u != "function" || p) return;
    const g = await u(f);
    (g == null ? void 0 : g.length) && lt(`${g.map((x) => `![[${x}]]`).join(`
`)}
`);
  }, [lt, p, u]);
  a.useEffect(() => {
    We.current = ct;
  }, [ct]);
  const en = a.useCallback(async (f) => {
    var _a3;
    if (!f || typeof u != "function") throw new Error("Upload handler not available.");
    const x = (_a3 = await u([f])) == null ? void 0 : _a3[0];
    if (!x) throw new Error("Upload succeeded but no path was returned.");
    lt(`![[${x}]]
`), Oe(null);
  }, [lt, u]), Ye = a.useCallback(() => {
    var _a3, _b2, _c2;
    const g = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    let x = null;
    if (g) {
      const { from: y, to: v } = g.state.selection.main;
      y !== v && (x = { from: y, to: v, text: g.state.doc.sliceString(y, v) });
    }
    Fe(x), Ce(true);
  }, []);
  a.useEffect(() => {
    z.current = Ye;
  }, [Ye]);
  const tn = a.useMemo(() => [o.jsx(ju, { value: e, theme: r, currentFile: i, language: "ko-KR" }, "export-pdf"), o.jsx(Lu, { editorRef: E }, "insert-pgbr"), o.jsx(Tu, { onOpen: Ye }, "heading-remap"), o.jsx(xu, { onOpen: () => {
    ie(true);
  } }, "llm-assist"), o.jsx(Mu, { onOpen: () => {
    ne(true);
  } }, "checklist-progress"), o.jsx($u, { checked: et, onChange: it, theme: r }, "toc-title-wrap"), o.jsx(Fu, { checked: tt, onChange: gt, theme: r }, "base64-image-fold"), o.jsx(Hu, { checked: Ut, onChange: qt, theme: r }, "editor-autocomplete"), Ie ? null : o.jsx(Ou, { checked: ve, onChange: xt, theme: r }, "mirror-edit"), o.jsx(Bu, { disabled: typeof u != "function", onRequestLink: () => fe(true), onRequestUpload: (f) => {
    ct(f);
  }, onRequestClip: (f) => Oe(f) }, "image-toolbar")], [e, r, i, et, it, tt, gt, Ut, qt, Ie, ve, xt, u, ct, Ye]), nn = a.useMemo(() => ["bold", "underline", "italic", "-", "strikeThrough", "sub", "sup", "quote", "unorderedList", "orderedList", "task", "-", "codeRow", "code", "link", 9, "table", "mermaid", "katex", 1, 2, 3, 4, "-", "revoke", "next", 0, "=", 6, 7, ...Ie ? [] : [8], "pageFullscreen", "fullscreen", "previewOnly", "preview", "htmlPreview", ...Me ? [5] : [], "catalog"], [Me, Ie]), jt = a.useMemo(() => {
    if (typeof u == "function") return async (f, g) => {
      if (p) return;
      const x = await u(f);
      (x == null ? void 0 : x.length) && g(x.map((y) => `![[${y}]]`));
    };
  }, [u, p]);
  return o.jsxs("div", { ref: D, className: `h-full w-full flex flex-col relative${et ? " toc-titles-wrap" : ""}`, style: { "--md-catalog-width": `${qe}px`, ...Gt }, children: [(at == null ? void 0 : at.webfontCss) ? o.jsx("style", { "data-s3haim-document-webfonts": "1", children: at.webfontCss }) : null, j && Xo.createPortal(o.jsx(Xa, { handleProps: Yt, isResizing: Xt, visibleOnHover: true, label: "TOC resize handle", style: { position: "fixed", top: j.top, left: j.left, height: j.height, bottom: "auto", zIndex: 10003 } }), document.body), p && o.jsxs("div", { className: "absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center gap-2 py-2 text-sm bg-blue-300/40 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 border-b border-blue-500/20", "aria-live": "polite", children: [o.jsx(zl, { size: 16, className: "animate-spin shrink-0" }), o.jsxs("span", { children: ["Uploading image... ", Math.max(0, Math.min(100, Math.round(m))), "%"] }), typeof h == "function" && o.jsx("button", { type: "button", onClick: h, className: "ml-2 rounded-md border border-blue-600/50 bg-white/80 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-white dark:border-blue-300/40 dark:bg-blue-950/60 dark:text-blue-100 dark:hover:bg-blue-950", children: "Cancel" })] }), o.jsx(li, { ref: E, id: T, modelValue: e, onChange: W, mdHeadingId: X, className: "h-full! max-h-dvh", theme: r, language: "ko-KR", codeTheme: Ya, customIcon: mc, previewOnly: s, noMermaid: true, autoDetectCode: true, scrollAuto: false, footers: ["markdownTotal"], toolbars: nn, defToolbars: tn, onUploadImg: jt }, `footnotes-${he}`), o.jsx(lc, { containerRef: D }), o.jsx(Oi, { containerRef: D }), o.jsx(dc, { isOpen: !!Z, onClose: () => Ee(null), path: (Z == null ? void 0 : Z.key) ?? "", kind: (Z == null ? void 0 : Z.kind) ?? "wiki", initialWidth: (Z == null ? void 0 : Z.width) ?? "", initialHeight: (Z == null ? void 0 : Z.height) ?? "", imageSrc: (Z == null ? void 0 : Z.imageSrc) ?? "", onApply: Zt, onStartFreeTransform: Mt, onCrop: Jt, onConvertToWiki: nt, onConvertToImgbb: jn }, Z ? `${Z.kind}|${Z.key}|${Z.width ?? ""}|${Z.height ?? ""}|${Z.occurrence ?? 0}` : "wiki-image-size-modal"), o.jsx(zu, { isOpen: Ae, onClose: () => fe(false), onConfirm: ({ desc: f, url: g }) => {
    lt(`![${f || ""}](${g})
`);
  } }), o.jsx(Ku, { isOpen: ge, onClose: () => me(false), onConfirm: ({ line1: f, line2: g }) => {
    var _a3, _b2, _c2, _d2, _e2;
    const y = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), v = (y == null ? void 0 : y.state.doc.toString()) ?? re.current ?? "", { from: _, to: L } = De.current, H = Ga(v, _, L, f, g);
    y && (y.dispatch({ changes: { from: 0, to: y.state.doc.length, insert: H.next }, selection: { anchor: H.caret }, scrollIntoView: true }), (_d2 = y.focus) == null ? void 0 : _d2.call(y)), (_e2 = je.current) == null ? void 0 : _e2.call(je, H.next);
  } }), o.jsx(Vu, { isOpen: !!He, file: He, onClose: () => Oe(null), onConfirm: en }), o.jsx(zd, { isOpen: ee.isOpen, initialMeta: ((_a2 = ee.editState) == null ? void 0 : _a2.meta) ?? null, initialGrid: ((_b = ee.editState) == null ? void 0 : _b.grid) ?? { rows: [[""]], aligns: [null] }, onClose: ee.close, onSave: ee.apply }), o.jsx(Vd, { containerRef: D, getMarkdown: () => re.current ?? "", setMarkdown: (f) => {
    typeof W == "function" ? W(f) : typeof t == "function" && t(f);
  }, onEditTable: (f, g) => Se.current(f, g), onEditFailed: () => {
    q({ title: "? ??", message: "? ?? ???? ?? ?? ?????. ??? ??? ??? ??? ???." });
  } }), o.jsx(Bi, { containerRef: D, getMarkdown: () => re.current ?? "", setMarkdown: (f) => {
    typeof W == "function" && W(f);
  }, enabled: !ee.isOpen }), xe && Ue && o.jsx("div", { className: "fixed z-70 pointer-events-none border-2 border-blue-500", style: { left: `${Ue.left}px`, top: `${Ue.top}px`, width: `${Ue.width}px`, height: `${Ue.height}px` }, children: ["nw", "ne", "sw", "se"].map((f) => o.jsx("button", { type: "button", "data-transform-handle": f, className: "absolute pointer-events-auto h-3 w-3 rounded-full bg-blue-600 border border-white", style: { left: f.includes("w") ? "-7px" : "auto", right: f.includes("e") ? "-7px" : "auto", top: f.includes("n") ? "-7px" : "auto", bottom: f.includes("s") ? "-7px" : "auto", cursor: f === "nw" || f === "se" ? "nwse-resize" : "nesw-resize" }, "aria-label": `transform-${f}` }, f)) }), xe && o.jsxs("button", { type: "button", onClick: () => Le(true), className: "fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm", children: [o.jsx("span", { className: "block font-semibold mb-1", children: "Free transform guide" }), o.jsx("span", { className: "block", children: "- Shift + drag: keep aspect ratio / plain drag: ignore ratio" }), o.jsx("span", { className: "block", children: "- Touch drag: keeps aspect ratio" }), o.jsx("span", { className: "block", children: "- Click elsewhere (including this banner): confirm transform" })] }), o.jsx(hn, { isOpen: Je, title: "Cover export", message: "You need to open the Export PDF page to export the cover. Continue?", confirmLabel: "Continue", cancelLabel: "Cancel", onConfirm: () => {
    Qe(false), te({ openCoverEdit: true });
  }, onCancel: () => Qe(false) }), o.jsx(hn, { isOpen: Ge, title: "Save transform", message: "How would you like to handle the current transform?", confirmLabel: "Apply", cancelLabel: "Keep editing", discardLabel: "Reset transform", onConfirm: Qt, onCancel: () => Le(false), onDiscard: Ln }), o.jsx(_u, { isOpen: ue, markdown: e, selectedMarkdown: (de == null ? void 0 : de.text) ?? "", onClose: () => {
    Ce(false), Fe(null);
  }, onApply: (f, g) => {
    if (g === "selection" && de) {
      const { from: x, to: y } = de, v = re.current ?? e, _ = `${v.slice(0, x)}${f}${v.slice(y)}`;
      _ !== v && W(_);
    } else f !== e && W(f);
    Ce(false), Fe(null);
  } }), o.jsx(gu, { editorRef: E, onChange: W, getMarkdown: () => {
    var _a3, _b2, _c2, _d2, _e2, _f2, _g;
    return ((_g = (_f2 = (_e2 = (_d2 = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) == null ? void 0 : _d2.state) == null ? void 0 : _e2.doc) == null ? void 0 : _f2.toString) == null ? void 0 : _g.call(_f2)) ?? re.current ?? "";
  }, llmProviderProfiles: R, open: $e, onOpenChange: ie, theme: r }), o.jsx(Su, { editorRef: E, onChange: W, open: B, onOpenChange: ne })] });
}
export {
  Wm as default
};
