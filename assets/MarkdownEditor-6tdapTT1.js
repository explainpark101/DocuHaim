var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as a, j as o, u as Io, a as $o, c as Ps } from "./vendor-react-SY5QCjFA.js";
import { p as Ds, C as _o, q as Is, E as Ht, S as Fo, D as vr, W as $s, r as Je, F as _s, u as Fs, w as Hs, x as Os, l as Bs, y as Vs, z as bn, A as Ot, V as Ks, B as zs, G as Ws, I as Us, T as Mn, J as kr, L as qs, O as Xs, P as Ys, Q as Gs, i as Ho, v as Js, R as Zs, U as Qs, K as ei, X as ti, Y as ni, Z as ri, f as oi, d as si, $ as ii, c as ai, a as li, a0 as ci, a1 as ui, a2 as di, a3 as fi, a4 as mi, a5 as pi, a6 as hi, a7 as gi, a8 as xi, a9 as bi, aa as wi, ab as yi } from "./vendor-md-editor-D4hOzNKK.js";
import { i as Et, j as tr, k as vi, l as ki, a as Ei, s as Si, m as Ci, o as Pt, h as Ni, P as ji, H as Mi, p as Tn, q as Er, t as Sr, v as Cr, x as Ti, y as Nr, z as ct, A as Ln, B as Rn } from "./previewFootnoteScroll-1GbarVgm.js";
import { dt as Li, eP as Oo, eQ as wn, eR as Ze, eS as Bo, eT as Ri, eU as Ai, dX as jr, eV as Pi, eW as Mr, d$ as An, d_ as Di, eX as Tr, eY as Lr, dZ as Ii, eZ as Rr, e_ as $i, e$ as _i, f0 as Fi, cW as Vo, f1 as Ko, f2 as Ar, f3 as Hi, M as Ut, f4 as Oi, f5 as Pr, ac as Dr, f6 as Bi, f7 as Vi, f8 as Ki, f9 as Ir, fa as zo, fb as zi, fc as Wi, fd as Ui, fe as qi, ff as Xi, fg as mn, _ as Wo, dI as Yi, dD as Gi, fh as Ji, du as Zi, fi as $r, fj as Qi, fk as ea, dz as ta, fl as Pn, fm as na, fn as Dn, fo as ra, dA as In, dy as oa, T as Uo, X as nr, dK as sa, as as pn, fp as _r, dJ as ia, fq as aa, a3 as la, fr as ca, U as ua, fs as da, ft as rr, fu as fa, cx as mr, cw as pr, fv as ma, fw as pa, fx as ha, cH as ga, bV as xa, di as ba, cC as qo, u as wa, cV as ya, N as Xo, fy as va, fz as ka, fA as Fr, fB as Ea, fC as Sa, au as Ca, cS as Na, dh as nn, d2 as Hr, d4 as $n, d5 as _n, d6 as ja, d7 as Or, d8 as Ma, d9 as Ta, da as La, db as Ra, dc as Aa, fD as Pa, fE as Da, av as Ia, Q as $a, fF as _a, dk as Fa, dl as Ha, dm as Oa, fG as Ba, fH as Va, fI as Ka, fJ as za, eh as Wa } from "./index-Ut6Cs96T.js";
import { g as Ua, i as qa, a as Xa } from "./OpenAiCompatibleModelSelect-BUHMJMxT.js";
import { T as Ya, c as Ga } from "./clipboardImageFiles-vjQHGR0v.js";
import { u as Ja, p as Fn, L as Dt, a as Za, i as Qa, g as el, b as tl, c as nl } from "./LlmAssistPanel-CxHMKB16.js";
import { L as rl, n as ol } from "./llmAssistImages-Ca7ILDRO.js";
import { a7 as or, b8 as Yo, B as sl, b9 as il, X as qt, ba as al, bb as Br, bc as Hn, ac as On, bd as ll, t as cl, be as hr, bf as ul, a as Go, ap as dl, J as fl, bg as ml, bh as pl, C as yn, bi as hl, bj as gl, a8 as Jo, a9 as xl, g as bl, bk as hn, U as wl, a$ as yl, b7 as Vr, bl as Bn, bm as Kr, bn as vl, aY as kl, aW as El, bo as zr, bp as Sl, bq as Cl, br as Nl, bs as jl, T as St, W as Ml, v as Tl } from "./vendor-lucide-CbFAdz-T.js";
import { b as Zo, G as Vn, H as Kn, p as Ll, q as Rl, r as Al, s as Pl, t as Dl, v as Il, w as $l, x as _l, y as Fl, z as Hl, K as gr, M as xr, d as sr, T as ir, e as ar, f as lr, A as cr, B as Ol, F as ut, L as ht, E as rn, l as Bl, m as Vl, n as Kl, o as zl, I as Wr, a0 as Wl, a1 as Ul, a2 as ql, a3 as Xl, a4 as Ur } from "./vendor-radix-BgY9OwZN.js";
import { M as Yl } from "./MdEditorToolbarTooltips-BIS5YQnD.js";
import { N as Gl, u as Jl, W as Zl } from "./useTocTitleWrap-DfgssJEP.js";
import { u as Ql, M as ec } from "./useLazyMermaidRender-qUPdHGG8.js";
import { H as zn, T as tc } from "./TableStyleTemplateEditor-CcTVg_VV.js";
import { b as vn } from "./vendor-motion-YU7ZxHqi.js";
import { u as nc } from "./useWikiImageHydration-n6RAuRIE.js";
import "./vendor-aws-bxAUTq4h.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-image-crop-Loz3ogoo.js";
import "./storageImageHydration-Cep0mM1i.js";
import "./index-CG4BSG42.js";
function Qo(e, t, n) {
  const r = Li(e);
  if (!r.length) return null;
  const i = [...n.querySelectorAll("table")], s = i.indexOf(t);
  let l = s >= 0 ? r[s] : void 0;
  if (!l) {
    const m = i.filter((p) => p.getAttribute("data-haim-table") === "1").indexOf(t);
    m >= 0 && (l = r.filter((g) => g.meta != null)[m]);
  }
  return !l && r.length === 1 && (l = r[0]), l ?? null;
}
function rc(e, t) {
  const n = {};
  for (const [r, i] of Object.entries(e)) {
    const s = wn(r);
    if (!s) continue;
    const l = s.r >= t ? s.r + 1 : s.r;
    n[Ze(l, s.c)] = i;
  }
  return n;
}
function oc(e, t) {
  const n = {};
  for (const [r, i] of Object.entries(e)) {
    const s = wn(r);
    if (!s) continue;
    const l = s.c >= t ? s.c + 1 : s.c;
    n[Ze(s.r, l)] = i;
  }
  return n;
}
function sc(e, t) {
  const n = {};
  for (const [r, i] of Object.entries(e)) {
    const s = wn(r);
    if (!s || s.r === t) continue;
    const l = s.r > t ? s.r - 1 : s.r;
    n[Ze(l, s.c)] = i;
  }
  return n;
}
function ic(e, t) {
  const n = {};
  for (const [r, i] of Object.entries(e)) {
    const s = wn(r);
    if (!s || s.c === t) continue;
    const l = s.c > t ? s.c - 1 : s.c;
    n[Ze(s.r, l)] = i;
  }
  return n;
}
function ac(e, t) {
  return e.map((n) => n.r >= t ? { ...n, r: n.r + 1 } : n.r + n.rowspan > t ? { ...n, rowspan: n.rowspan + 1 } : n);
}
function lc(e, t) {
  return e.map((n) => n.c >= t ? { ...n, c: n.c + 1 } : n.c + n.colspan > t ? { ...n, colspan: n.colspan + 1 } : n);
}
function Ct(e) {
  return e.rowspan < 1 || e.colspan < 1 || e.rowspan === 1 && e.colspan === 1 ? null : e;
}
function cc(e, t) {
  const n = [];
  for (const r of e) {
    if (r.r > t) {
      const i = Ct({ ...r, r: r.r - 1 });
      i && n.push(i);
      continue;
    }
    if (r.r === t) {
      if (r.rowspan <= 1) continue;
      const i = Ct({ ...r, rowspan: r.rowspan - 1 });
      i && n.push(i);
      continue;
    }
    if (r.r < t && r.r + r.rowspan > t) {
      const i = Ct({ ...r, rowspan: r.rowspan - 1 });
      i && n.push(i);
      continue;
    }
    n.push(r);
  }
  return n;
}
function uc(e, t) {
  const n = [];
  for (const r of e) {
    if (r.c > t) {
      const i = Ct({ ...r, c: r.c - 1 });
      i && n.push(i);
      continue;
    }
    if (r.c === t) {
      if (r.colspan <= 1) continue;
      const i = Ct({ ...r, colspan: r.colspan - 1 });
      i && n.push(i);
      continue;
    }
    if (r.c < t && r.c + r.colspan > t) {
      const i = Ct({ ...r, colspan: r.colspan - 1 });
      i && n.push(i);
      continue;
    }
    n.push(r);
  }
  return n;
}
function dc(e, t, n) {
  const r = t.merges.filter((u) => u.r === n && u.rowspan > 1);
  if (r.length === 0) return { grid: e, meta: t };
  const i = e.rows.map((u) => [...u]), s = { ...t.cells }, l = n + 1;
  for (const u of r) {
    const m = i[n], p = i[l];
    if (!m || !p) continue;
    for (; p.length <= u.c; ) p.push("");
    for (; m.length <= u.c; ) m.push("");
    const g = m[u.c] ?? "";
    g && (p[u.c] = g, m[u.c] = "");
    const R = Ze(n, u.c), E = Ze(l, u.c), L = s[R];
    L && (s[E] = { ...L }, delete s[R]);
  }
  return { grid: { rows: i, aligns: [...e.aligns] }, meta: { ...t, cells: s } };
}
function fc(e, t, n) {
  const r = t.merges.filter((l) => l.c === n && l.colspan > 1);
  if (r.length === 0) return { grid: e, meta: t };
  const i = e.rows.map((l) => [...l]), s = { ...t.cells };
  for (const l of r) {
    const u = i[l.r];
    if (!u) continue;
    for (; u.length <= l.c + 1; ) u.push("");
    const m = u[l.c] ?? "";
    m && (u[l.c + 1] = m, u[l.c] = "");
    const p = Ze(l.r, n), g = Ze(l.r, n + 1), R = s[p];
    R && (s[g] = { ...R }, delete s[p]);
  }
  return { grid: { rows: i, aligns: [...e.aligns] }, meta: { ...t, cells: s } };
}
function mc(e, t, n) {
  const r = Math.max(1, ...e.rows.map((g) => g.length), e.aligns.length, 1), i = e.rows.length, s = Math.max(0, Math.min(n, i)), l = Array.from({ length: r }, () => ""), u = [...e.rows.slice(0, s), l, ...e.rows.slice(s)];
  let m = t.headerRows, p = t.footerRows;
  return s < m ? m += 1 : p > 0 && s >= i - p && (p += 1), { grid: { rows: u, aligns: [...e.aligns] }, meta: (() => {
    var _a2;
    const g = { ...t, headerRows: m, footerRows: p, merges: ac(t.merges, s), cells: rc(t.cells, s) };
    if ((_a2 = t.rowHeights) == null ? void 0 : _a2.length) {
      const R = Oo(t.rowHeights, s);
      R && (g.rowHeights = R);
    }
    return g;
  })() };
}
function pc(e, t, n) {
  const r = Math.max(1, ...e.rows.map((u) => u.length), e.aligns.length, 1), i = Math.max(0, Math.min(n, r)), s = e.rows.map((u) => {
    const m = [...u];
    for (; m.length < r; ) m.push("");
    return m.splice(i, 0, ""), m;
  });
  s.length === 0 && s.push(Array.from({ length: r + 1 }, () => ""));
  const l = [...e.aligns];
  for (; l.length < r; ) l.push(null);
  return l.splice(i, 0, null), { grid: { rows: s, aligns: l }, meta: (() => {
    var _a2;
    const u = { ...t, merges: lc(t.merges, i), cells: oc(t.cells, i) };
    if ((_a2 = t.colWidths) == null ? void 0 : _a2.length) {
      const m = Oo(t.colWidths, i);
      m && (u.colWidths = m);
    }
    return u;
  })() };
}
function hc(e, t, n) {
  var _a2;
  const r = e.rows.length;
  if (r <= 1) return { grid: e, meta: t };
  if (n < 0 || n >= r) return { grid: e, meta: t };
  const i = dc(e, t, n), s = [...i.grid.rows.slice(0, n), ...i.grid.rows.slice(n + 1)];
  let l = i.meta.headerRows, u = i.meta.footerRows;
  n < l ? l = Math.max(0, l - 1) : u > 0 && n >= r - u && (u = Math.max(0, u - 1));
  const m = s.length;
  l + u > m && (u = Math.max(0, m - l));
  const p = { ...i.meta, headerRows: l, footerRows: u, merges: cc(i.meta.merges, n), cells: sc(i.meta.cells, n) };
  if ((_a2 = i.meta.rowHeights) == null ? void 0 : _a2.length) {
    const g = Bo(i.meta.rowHeights, n);
    g ? p.rowHeights = g : delete p.rowHeights;
  }
  return { grid: { rows: s, aligns: [...i.grid.aligns] }, meta: p };
}
function gc(e, t, n) {
  var _a2;
  const r = Math.max(1, ...e.rows.map((m) => m.length), e.aligns.length, 1);
  if (r <= 1) return { grid: e, meta: t };
  if (n < 0 || n >= r) return { grid: e, meta: t };
  const i = fc(e, t, n), s = i.grid.rows.map((m) => {
    const p = [...m];
    for (; p.length < r; ) p.push("");
    return p.splice(n, 1), p;
  }), l = [...i.grid.aligns];
  for (; l.length < r; ) l.push(null);
  l.splice(n, 1);
  const u = { ...i.meta, merges: uc(i.meta.merges, n), cells: ic(i.meta.cells, n) };
  if ((_a2 = i.meta.colWidths) == null ? void 0 : _a2.length) {
    const m = Bo(i.meta.colWidths, n);
    m ? u.colWidths = m : delete u.colWidths;
  }
  return { grid: { rows: s, aligns: l }, meta: u };
}
function xc(e, t, n) {
  const r = [...new Set(n.filter((s) => Number.isInteger(s) && s >= 0))].sort((s, l) => l - s);
  let i = { grid: e, meta: t };
  for (const s of r) {
    if (i.grid.rows.length <= 1) break;
    i = hc(i.grid, i.meta, s);
  }
  return i;
}
function bc(e, t, n) {
  const r = [...new Set(n.filter((s) => Number.isInteger(s) && s >= 0))].sort((s, l) => l - s);
  let i = { grid: e, meta: t };
  for (const s of r) {
    if (Math.max(1, ...i.grid.rows.map((u) => u.length), i.grid.aligns.length, 1) <= 1) break;
    i = gc(i.grid, i.meta, s);
  }
  return i;
}
function wc(e) {
  return String(e || "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96) || "doc";
}
function yc(e) {
  return `md-ed-${wc(e)}`;
}
function vc(e) {
  const t = `${e}-h`;
  return (n, r, i) => {
    const s = Number.isInteger(i) ? i : 0, l = typeof n == "object" && n !== null ? Number(n.index) : NaN, u = Number.isInteger(l) ? l : s;
    return `${t}-${u}`;
  };
}
const qr = ".md-editor-catalog-link", kc = "md-preview-heading-folded", Xr = "md-preview-heading-section-hidden", Ec = 2;
function Sc(e, t) {
  const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
  return n.top - r.top + t.scrollTop;
}
function Cc(e) {
  for (let t = 0; t < 8; t += 1) {
    const n = getComputedStyle(e);
    if (!(e.classList.contains(Xr) || e.hasAttribute("hidden") || n.display === "none")) break;
    let i = false, s = e;
    for (; s && !i; ) {
      if (s instanceof HTMLElement && (s.classList.contains(Xr) || s.hasAttribute("hidden"))) {
        let u = s.previousElementSibling;
        for (; u; ) {
          if (u instanceof HTMLElement && u.classList.contains(kc)) {
            const m = u.querySelector(":scope > .md-preview-heading-fold-chevron");
            m instanceof HTMLButtonElement && (m.click(), i = true);
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
function Nc(e, t) {
  const n = (r) => {
    var _a2;
    if (r.button !== 0) return;
    const i = r.target;
    if (!(i instanceof Element)) return;
    const s = i.closest(qr);
    if (!(s instanceof HTMLElement) || !e.contains(s)) return;
    const u = Array.from(e.querySelectorAll(qr)).indexOf(s);
    if (u < 0) return;
    const m = t.mdHeadingId({ index: u + 1 }), p = t.getEditorRoot(), g = ((_a2 = p == null ? void 0 : p.querySelector) == null ? void 0 : _a2.call(p, `#${CSS.escape(m)}`)) ?? null;
    if (!g || p && !p.contains(g)) return;
    r.preventDefault(), r.stopPropagation(), typeof r.stopImmediatePropagation == "function" && r.stopImmediatePropagation(), Cc(g);
    const R = Et(g);
    if (!R) {
      g.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    const E = g.previousElementSibling ? 0 : Number.parseFloat(getComputedStyle(g).marginBlockStart || "0") || 0, L = Sc(g, R) - Ec - E;
    R.scrollTo({ top: Math.max(0, L), behavior: "smooth" });
  };
  return e.addEventListener("click", n, true), () => {
    e.removeEventListener("click", n, true);
  };
}
const es = "s3haim-llm-modal-position", ts = "s3haim-llm-modal-hidden", Wn = { leftVw: 55, topVh: 12 };
function jc() {
  try {
    const e = localStorage.getItem(es);
    if (!e) return { ...Wn };
    const t = JSON.parse(e), n = Number(t == null ? void 0 : t.leftVw), r = Number(t == null ? void 0 : t.topVh);
    return !Number.isFinite(n) || !Number.isFinite(r) ? { ...Wn } : { leftVw: Math.min(95, Math.max(0, n)), topVh: Math.min(95, Math.max(0, r)) };
  } catch {
    return { ...Wn };
  }
}
function Yr({ leftVw: e, topVh: t }) {
  try {
    localStorage.setItem(es, JSON.stringify({ leftVw: Math.min(95, Math.max(0, e)), topVh: Math.min(95, Math.max(0, t)) }));
  } catch {
  }
}
function Mc() {
  try {
    return localStorage.getItem(ts) === "1";
  } catch {
    return false;
  }
}
function Un(e) {
  try {
    localStorage.setItem(ts, e ? "1" : "0");
  } catch {
  }
}
const kn = "data-mirror-edit", Mt = "data-mirror-edit-active", Tc = "a, button, input, textarea, select, label, .md-editor-code-action, [data-transform-handle], table, .md-editor-mermaid, .md-editor-katex, .md-editor-code, pre, [data-note-cover]";
function qn(e) {
  return e instanceof Element ? !!(e.closest(`[${Mt}]`) || e.closest(`[${kn}]`)) : false;
}
function _t(e) {
  return !!(e == null ? void 0 : e.querySelector(`[${Mt}]`));
}
function dn(e) {
  var _a2, _b;
  return e ? !!((_b = (e instanceof Element && e.classList.contains("md-editor") ? e : null) || ((_a2 = e.querySelector) == null ? void 0 : _a2.call(e, ".md-editor")) || (e instanceof Element ? e.closest(".md-editor") : null)) == null ? void 0 : _b.classList.contains("md-editor-previewOnly")) : false;
}
function Lc(e) {
  const t = e.match(/^(.*?)(\n*)$/s);
  return { body: (t == null ? void 0 : t[1]) ?? e, trailing: (t == null ? void 0 : t[2]) ?? "" };
}
function Rc(e) {
  var _a2;
  const t = [/^(#{1,6}[ \t]+)/, /^([ \t]*[-*+][ \t]+\[[ xX]\][ \t]+)/, /^([ \t]*[-*+][ \t]+)/, /^([ \t]*\d+\.[ \t]+)/, /^(>[ \t]?)/];
  for (const n of t) {
    const i = (_a2 = e.match(n)) == null ? void 0 : _a2[1];
    if (i) return { prefix: i, content: e.slice(i.length) };
  }
  return { prefix: "", content: e };
}
function Ac(e) {
  return e instanceof Element ? e.closest(`[${Mt}]`) ? false : !!e.closest(Tc) : true;
}
const En = new Ya({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-", emDelimiter: "*", strongDelimiter: "**" });
En.keep(["u", "sub", "sup"]);
En.addRule("wikiImageData", { filter: (e) => {
  var _a2;
  return e.nodeName !== "IMG" ? false : !!((_a2 = e.getAttribute) == null ? void 0 : _a2.call(e, "data-wiki-path"));
}, replacement: (e, t) => {
  const n = t;
  return Ri({ path: n.getAttribute("data-wiki-path"), width: n.getAttribute("data-wiki-width"), height: n.getAttribute("data-wiki-height"), background: n.getAttribute("data-wiki-bg") });
} });
En.addRule("deepHeading", { filter: (e) => {
  var _a2;
  if (!(e == null ? void 0 : e.nodeName)) return false;
  const t = Number((_a2 = e.getAttribute) == null ? void 0 : _a2.call(e, "data-heading-level"));
  return !!(Number.isInteger(t) && t >= 7);
}, replacement: (e, t) => {
  var _a2;
  const n = Number((_a2 = t.getAttribute) == null ? void 0 : _a2.call(t, "data-heading-level")), r = Number.isInteger(n) && n >= 1 ? n : 6;
  return `${"#".repeat(r)} ${e.trim()}`;
} });
function Pc(e, t) {
  let n = e.trim();
  return t && (/^#{1,6}[ \t]+/.test(t) ? n = n.replace(/^#{1,6}[ \t]+/, "") : /\[[ xX]\]/.test(t) ? n = n.replace(/^([-*+]|\d+\.)[ \t]+\[[ xX]\][ \t]+/, "") : /^([ \t]*[-*+][ \t]+)/.test(t) || /^([ \t]*\d+\.[ \t]+)/.test(t) ? n = n.replace(/^([-*+]|\d+\.)[ \t]+/, "") : /^>[ \t]?/.test(t) && (n = n.replace(/^(>[ \t]?)+/gm, "").trim())), n;
}
function Dc(e, t) {
  if (!/\[[ xX]\]/.test(e)) return e;
  const n = t.querySelector('input[type="checkbox"]');
  if (!(n instanceof HTMLInputElement)) return e;
  const r = n.checked;
  return e.replace(/\[[ xX]\]/, r ? "[x]" : "[ ]");
}
function Ic(e, t) {
  const { prefix: n } = Rc(t), r = e.cloneNode(true);
  r.removeAttribute(Mt), r.removeAttribute(kn), r.removeAttribute("contenteditable"), r.removeAttribute("spellcheck");
  const i = Dc(n, r);
  r.querySelectorAll('input[type="checkbox"]').forEach((g) => g.remove()), r.querySelectorAll(".md-preview-heading-fold-chevron, .md-heading-fold, .md-editor-code-action, [data-transform-handle], button").forEach((g) => g.remove());
  const s = e.tagName.toLowerCase(), u = /^h[1-6]$/.test(s) || s === "p" || s === "li" || s === "blockquote" || s === "td" || s === "th" ? r.innerHTML : r.outerHTML;
  let m = En.turndown(u || "");
  m = m.replace(/^\n+|\n+$/g, ""), m = Pc(m, i);
  const p = Number(e.getAttribute("data-heading-level"));
  return Number.isInteger(p) && p >= 7 ? `${"#".repeat(p)} ${m.replace(/^#{1,6}[ \t]+/, "").trim()}` : i ? `${i}${m}` : m;
}
let Ve = null;
function Bt(e) {
  const t = Ve;
  Ve = null, t && (t.cleanup(), t.block.isConnected && (t.block.removeAttribute(Mt), t.block.removeAttribute(kn), t.block.removeAttribute("contenteditable"), t.block.removeAttribute("spellcheck"), e && (t.block.innerHTML = t.snapshotHtml)));
}
function Ft(e) {
  const t = Ve;
  if (!t) return;
  const r = `${Ic(t.block, t.snapshotBody)}${t.trailing}`, { from: i, to: s } = t, l = e.state.doc.sliceString(i, s);
  if (r === l) {
    Bt(true);
    return;
  }
  Bt(false), e.dispatch({ changes: { from: i, to: s, insert: r }, selection: { anchor: i + r.length } });
}
function Gr(e, t, n) {
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
function ns(e, t, n, r, i) {
  if (Ve) {
    if (Ve.block === e) return Gr(e, r, i), true;
    Ft(t);
  }
  const s = Number(e.getAttribute("data-line"));
  if (!Number.isFinite(s)) return false;
  const { from: l, to: u } = vi(t, n, s, s), m = t.state.doc.sliceString(l, u);
  if (!m && l === u) return false;
  const { body: p, trailing: g } = Lc(m), R = e.innerHTML;
  e.setAttribute(Mt, "1"), e.setAttribute(kn, "1"), e.setAttribute("contenteditable", "true"), e.setAttribute("spellcheck", "true"), e.setAttribute("aria-label", "Mirror Edit"), e.querySelectorAll(".md-preview-heading-fold-chevron, button").forEach((T) => {
    T instanceof HTMLElement && (T.contentEditable = "false");
  });
  const E = (T) => {
    if (T.key === "Escape") {
      T.preventDefault(), T.stopPropagation(), Bt(true);
      return;
    }
    if (T.key === "Enter" && (T.metaKey || T.ctrlKey)) {
      T.preventDefault(), T.stopPropagation(), Ft(t);
      return;
    }
    const O = e.tagName.toLowerCase();
    T.key === "Enter" && !T.shiftKey && /^h[1-6]$/.test(O) && (T.preventDefault(), T.stopPropagation(), Ft(t));
  }, L = (T) => {
    var _a2;
    const O = (_a2 = T.clipboardData) == null ? void 0 : _a2.getData("text/plain");
    O != null && (T.preventDefault(), document.execCommand("insertText", false, O));
  }, C = () => {
    window.setTimeout(() => {
      (Ve == null ? void 0 : Ve.block) === e && (e.contains(document.activeElement) || Ft(t));
    }, 0);
  };
  return e.addEventListener("keydown", E), e.addEventListener("paste", L), e.addEventListener("blur", C), Ve = { block: e, snapshotHtml: R, snapshotBody: p, from: l, to: u, trailing: g, cleanup: () => {
    e.removeEventListener("keydown", E), e.removeEventListener("paste", L), e.removeEventListener("blur", C);
  } }, requestAnimationFrame(() => {
    e.focus(), Gr(e, r, i);
  }), true;
}
function $c(e, t) {
  const n = (r) => {
    if (!t.isEnabled() || Ac(r.target)) return;
    const i = t.getPreviewRoot();
    if (!i || !(r.target instanceof Node) || !i.contains(r.target)) return;
    const s = tr(r.target, i);
    if (!s) return;
    const l = t.getView();
    l && (r.preventDefault(), r.stopPropagation(), ns(s, l, i, r.clientX, r.clientY));
  };
  return e.addEventListener("dblclick", n, true), () => {
    e.removeEventListener("dblclick", n, true), Ve && Bt(true);
  };
}
function _c() {
  Bt(true);
}
function Fc(e) {
  return !e || !Ve ? false : (Ft(e), true);
}
function Jr(e, t, n, r, i) {
  return ns(e, t, n, r, i);
}
function Hc() {
  Ve && (Ve.block.isConnected || (Ve.cleanup(), Ve = null));
}
function Oc(e) {
  var _a2;
  return ((_a2 = e == null ? void 0 : e.current) == null ? void 0 : _a2.value) ?? (e == null ? void 0 : e.current) ?? null;
}
function Bc(e, t = null) {
  if (t == null ? void 0 : t.dom) return t.dom.closest(".md-editor");
  const n = Oc(e);
  return (n == null ? void 0 : n.root) instanceof Element ? n.root : null;
}
function Vc(e, { view: t = null, from: n = 0, to: r = 0 } = {}) {
  const i = t ?? Vt(e).view, s = Bc(e, i);
  return !!(dn(s) || !(i == null ? void 0 : i.state) || !i.hasFocus && n === r);
}
function Kc(e, t) {
  return e ? e.endsWith(`
`) ? t : `
${t}` : t;
}
function zc(e, t) {
  if (!e) return t;
  const n = e.endsWith(`
`) ? "" : `
`;
  return `${e}${n}${t}`;
}
function Wc({ editorRef: e, from: t, to: n, result: r, onChange: i, getMarkdown: s }) {
  var _a2, _b, _c2;
  const { view: l } = Vt(e);
  if (Vc(e, { view: l, from: t, to: n })) {
    const m = ((_c2 = (_b = (_a2 = l == null ? void 0 : l.state) == null ? void 0 : _a2.doc) == null ? void 0 : _b.toString) == null ? void 0 : _c2.call(_b)) ?? (typeof s == "function" ? s() : ""), p = Kc(m, r);
    if (l == null ? void 0 : l.state) {
      const g = m.length;
      return ur(l, g, g, p, i);
    }
    return typeof i == "function" ? (i(zc(m, r)), true) : false;
  }
  return ur(l, t, n, r, i);
}
function Vt(e) {
  var _a2, _b, _c2;
  const n = (_c2 = (_b = ((_a2 = e == null ? void 0 : e.current) == null ? void 0 : _a2.value) ?? (e == null ? void 0 : e.current)) == null ? void 0 : _b.getEditorView) == null ? void 0 : _c2.call(_b);
  if (!(n == null ? void 0 : n.state)) return { text: "", from: 0, to: 0, view: null };
  const r = n.state.selection.main;
  return { text: n.state.doc.sliceString(r.from, r.to), from: r.from, to: r.to, view: n };
}
function ur(e, t, n, r, i) {
  var _a2;
  return (e == null ? void 0 : e.state) ? (e.dispatch({ changes: { from: t, to: n, insert: r }, selection: { anchor: t + r.length } }), (_a2 = e.focus) == null ? void 0 : _a2.call(e), i == null ? void 0 : i(e.state.doc.toString()), true) : false;
}
function Uc({ editorRef: e, onChange: t, getMarkdown: n, llmProviderProfiles: r = [], open: i, onOpenChange: s, theme: l = "light" }) {
  const u = Array.isArray(r) ? r : [], [m, p] = a.useState(() => jc()), [g, R] = a.useState(() => Mc()), [E, L] = a.useState(false), [C, T] = a.useState(""), [O, B] = a.useState({ from: 0, to: 0 }), [Y, re] = a.useState([]), [v, I] = a.useState(""), [G, S] = a.useState(""), [A, z] = a.useState("text"), [Z, oe] = a.useState(false), [se, le] = a.useState(""), [ae, Ce] = a.useState([]), [Q, K] = a.useState(""), [ee, ge] = a.useState(""), [fe, Ue] = a.useState(null), [Pe, Ke, Me] = Ja(u), ne = Ai(u, Pe), [ue, Fe] = a.useState(() => ne ? jr(ne.id, ne.kind) : ""), H = a.useRef(null), $ = a.useRef({ active: false, startX: 0, startY: 0, startLeftVw: 0, startTopVh: 0 }), J = 5, q = a.useCallback(() => ({ selectedText: C, selectionRange: O, attachedImages: Y, instruction: v, result: G, resultViewMode: A, loading: Z, error: se, templates: ae, selectedTemplateId: Q, templateName: ee, editingTemplateId: fe, profiles: u.map((N) => ({ id: N.id, name: N.name, kind: N.kind, baseUrl: N.baseUrl })), selectedProfileId: Pe, model: ue, theme: l }), [C, O, Y, v, G, A, Z, se, ae, Q, ee, fe, u, Pe, ue, l]), ye = a.useCallback(() => {
    const N = H.current;
    !N || N.closed || Fn(N, Dt.SYNC, { state: q() });
  }, [q]), ve = a.useCallback(() => {
    const N = H.current;
    if (N && !N.closed) try {
      N.close();
    } catch {
    }
    H.current = null, L(false);
  }, []), Ee = a.useCallback((N, { onTap: P } = {}) => {
    if (N.pointerType === "touch" || N.button !== 0) return;
    N.preventDefault();
    const W = N.clientX, Re = N.clientY;
    let De = false;
    $.current = { active: true, startX: W, startY: Re, startLeftVw: m.leftVw, startTopVh: m.topVh };
    const Ie = (Ae) => {
      if (!$.current.active) return;
      Math.hypot(Ae.clientX - W, Ae.clientY - Re) > J && (De = true);
      const rt = window.innerWidth || 1, ft = window.innerHeight || 1, Be = (Ae.clientX - $.current.startX) / rt * 100, he = (Ae.clientY - $.current.startY) / ft * 100;
      p({ leftVw: Math.min(92, Math.max(0, $.current.startLeftVw + Be)), topVh: Math.min(90, Math.max(0, $.current.startTopVh + he)) });
    }, Oe = () => {
      $.current.active && ($.current.active = false, document.removeEventListener("pointermove", Ie), document.removeEventListener("pointerup", Oe), p((Ae) => (Yr(Ae), Ae)), De || (P == null ? void 0 : P()));
    };
    document.addEventListener("pointermove", Ie), document.addEventListener("pointerup", Oe);
  }, [m.leftVw, m.topVh]), ze = a.useCallback((N, { onTap: P } = {}) => {
    const W = N.changedTouches;
    if (!W || !W.length) return;
    const Re = W[0], De = Re.identifier, Ie = Re.clientX, Oe = Re.clientY;
    N.preventDefault();
    let Ae = false;
    $.current = { active: true, startX: Ie, startY: Oe, startLeftVw: m.leftVw, startTopVh: m.topVh, touchIdentifier: De };
    const rt = (he) => {
      if (!$.current.active) return;
      const ce = Array.from(he.touches || []).find((ot) => ot.identifier === De);
      if (!ce) return;
      Math.hypot(ce.clientX - Ie, ce.clientY - Oe) > J && (Ae = true);
      const Se = window.innerWidth || 1, We = window.innerHeight || 1, wt = (ce.clientX - Ie) / Se * 100, yt = (ce.clientY - Oe) / We * 100;
      p({ leftVw: Math.min(92, Math.max(0, $.current.startLeftVw + wt)), topVh: Math.min(90, Math.max(0, $.current.startTopVh + yt)) }), he.preventDefault();
    }, ft = () => {
      $.current.active && ($.current.active = false, document.removeEventListener("touchmove", rt), document.removeEventListener("touchend", Be), document.removeEventListener("touchcancel", Be), p((he) => (Yr(he), he)), Ae || (P == null ? void 0 : P()));
    }, Be = (he) => {
      !$.current.active || !Array.from(he.changedTouches || []).some((Se) => Se.identifier === De) || ft();
    };
    document.addEventListener("touchmove", rt, { passive: false }), document.addEventListener("touchend", Be, { passive: false }), document.addEventListener("touchcancel", Be, { passive: false });
  }, [m.leftVw, m.topVh]), me = a.useCallback(() => {
    const { text: N, from: P, to: W } = Vt(e);
    return T(N), B({ from: P, to: W }), N;
  }, [e]), xe = a.useCallback(async () => {
    const N = await Pi();
    return Ce(N), N;
  }, []);
  a.useEffect(() => {
    i && (R(false), Un(false), Me(), me(), xe(), le(""));
  }, [i, me, xe, Me]), a.useEffect(() => {
    if (!(ne == null ? void 0 : ne.id) || !(ne == null ? void 0 : ne.kind)) {
      Fe("");
      return;
    }
    Fe(jr(ne.id, ne.kind));
  }, [ne == null ? void 0 : ne.id, ne == null ? void 0 : ne.kind]), a.useEffect(() => {
    const N = () => {
      K(""), Ue(null), xe();
    };
    return window.addEventListener(Mr, N), () => {
      window.removeEventListener(Mr, N);
    };
  }, [xe]), a.useEffect(() => {
    if (!i || g || E) return;
    const P = setInterval(() => me(), 600);
    return () => clearInterval(P);
  }, [i, g, E, me]), a.useEffect(() => {
    ye();
  }, [ye]), a.useEffect(() => {
    if (!E) return;
    const N = setInterval(() => {
      const P = H.current;
      (!P || P.closed) && (H.current = null, L(false));
    }, 400);
    return () => clearInterval(N);
  }, [E]), a.useEffect(() => {
    if (!i) {
      ve();
      return;
    }
    const N = () => {
      const P = H.current;
      if (P && !P.closed) {
        Fn(P, Dt.PARENT_CLOSING);
        try {
          P.close();
        } catch {
        }
      }
    };
    return window.addEventListener("beforeunload", N), () => window.removeEventListener("beforeunload", N);
  }, [i, ve]);
  const pe = a.useCallback((N) => {
    const P = String(N || "").trim();
    Fe(P), ne && (An(ne.id, P), ne.kind === Di ? Tr(P) : Lr(P));
  }, [ne]), He = a.useCallback(async () => {
    le(""), oe(true);
    try {
      const N = me();
      if (!ne) throw new Error("\uC124\uC815\uC5D0\uC11C AI \uC81C\uACF5\uC790\uB97C \uCD94\uAC00\uD55C \uB4A4 \uC120\uD0DD\uD558\uC138\uC694.");
      if (ne.kind === Ii) {
        const W = (ne.baseUrl || "").trim();
        if (!W) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC218\uC815\uD558\uC138\uC694.");
        An(ne.id, ue), Lr(ue);
        const Re = await Rr(ne.id, () => ne.apiKey || "", (De) => Ua({ baseUrl: W, apiKey: De, model: ue, instruction: v, selectedText: N, images: Y }), { allowEmpty: true, missingKeyMessage: "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
        S(Re);
        return;
      }
      if (qa(ue)) throw new Error(`\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.
Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash\uB85C \uBCC0\uACBD\uD574 \uC8FC\uC138\uC694.`);
      An(ne.id, ue), Tr(ue);
      const P = await Rr(ne.id, () => ne.apiKey || "", (W) => Xa({ apiKey: W, model: ue, instruction: v, selectedText: N, images: Y }), { missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
      S(P);
    } catch (N) {
      le((N == null ? void 0 : N.message) || "LLM \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    } finally {
      oe(false);
    }
  }, [me, Y, ne, ue, v]), Te = a.useCallback(() => {
    if (!G) return;
    const { from: N, to: P } = O;
    if (!Wc({ editorRef: e, from: N, to: P, result: G, onChange: t, getMarkdown: n })) {
      le("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC801\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC120\uD0DD \uC601\uC5ED\uC744 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.");
      return;
    }
    me();
  }, [G, e, O, t, n, me]), qe = a.useCallback((N) => {
    K(N);
    const P = ae.find((W) => W.id === N);
    P && (I(P.instruction), ge(P.name), Ue(P.id));
  }, [ae]), Xe = a.useCallback(async () => {
    const N = ee.trim(), P = v.trim();
    if (!N || !P) {
      alert("\uD15C\uD50C\uB9BF \uC774\uB984\uACFC \uC9C0\uC2DC\uC0AC\uD56D\uC744 \uBAA8\uB450 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    try {
      const W = await $i({ id: fe || _i().id, name: N, instruction: P, updatedAt: Date.now() });
      Ue(W.id), K(W.id), await xe();
    } catch (W) {
      alert((W == null ? void 0 : W.message) || "\uD15C\uD50C\uB9BF \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [ee, v, fe, xe]), be = a.useCallback(() => {
    Ue(null), K(""), ge(""), I("");
  }, []), Ye = a.useCallback(async () => {
    if (fe && window.confirm("\uC774 \uC9C0\uC2DC\uC0AC\uD56D \uD15C\uD50C\uB9BF\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?")) try {
      await Fi(fe), be(), await xe();
    } catch (N) {
      alert((N == null ? void 0 : N.message) || "\uD15C\uD50C\uB9BF \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [fe, be, xe]), nt = a.useCallback(async (N) => {
    !Array.isArray(N) || !N.length || re((P) => {
      const W = rl - P.length;
      return W <= 0 ? P : [...P, ...N.slice(0, W)];
    });
  }, []), Le = a.useCallback((N) => {
    N && re((P) => P.filter((W) => W.id !== N));
  }, []), Qe = a.useCallback(async (N, P = {}) => {
    switch (N) {
      case "refresh-selection":
        me();
        break;
      case "run":
        await He();
        break;
      case "apply-result":
        Te();
        break;
      case "set-instruction":
        I(typeof P.value == "string" ? P.value : "");
        break;
      case "set-result":
        S(typeof P.value == "string" ? P.value : "");
        break;
      case "set-model":
        typeof P.value == "string" && pe(P.value);
        break;
      case "set-llm-profile-id":
        typeof P.value == "string" && Ke(P.value);
        break;
      case "load-template":
        qe(P.id ?? "");
        break;
      case "save-template":
        await Xe();
        break;
      case "new-template":
        be();
        break;
      case "delete-template":
        await Ye();
        break;
      case "set-template-name":
        ge(typeof P.value == "string" ? P.value : "");
        break;
      case "set-result-view-mode":
        (P.value === "preview" || P.value === "text") && z(P.value);
        break;
      case "add-images": {
        const W = (Array.isArray(P.images) ? P.images : []).map(ol).filter(Boolean);
        W.length && await nt(W);
        break;
      }
      case "remove-image":
        Le(P.id);
        break;
      case "close":
        s == null ? void 0 : s(false);
        break;
    }
  }, [me, He, Te, pe, Ke, qe, Xe, be, Ye, nt, Le, s]);
  a.useEffect(() => {
    if (!i) return;
    const N = (P) => {
      if (P.origin === window.location.origin && Qa(P.data)) {
        if (P.data.type === Dt.READY) {
          P.source && typeof P.source.postMessage == "function" && (H.current = P.source, L(true), Fn(P.source, Dt.SYNC, { state: q() }));
          return;
        }
        P.data.type === Dt.ACTION && Qe(P.data.action, P.data.payload);
      }
    };
    return window.addEventListener("message", N), () => window.removeEventListener("message", N);
  }, [i, q, Qe]);
  const dt = () => {
    R(true), Un(true);
  }, it = () => {
    R(false), Un(false), me();
  }, at = () => {
    ve(), s == null ? void 0 : s(false);
  }, je = () => {
    let N = H.current;
    if (N && !N.closed) {
      N.focus(), ye(), L(true);
      return;
    }
    const P = el();
    if (N = window.open(P, tl, nl), !N) {
      alert("\uD31D\uC5C5\uC774 \uCC28\uB2E8\uB418\uC5B4 \uC0C8 \uCC3D\uC744 \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    H.current = N, L(true);
  }, Ne = { theme: l, profiles: u, selectedProfileId: Pe, onSelectedProfileIdChange: Ke, selectedProfile: ne, model: ue, onModelChange: pe, selectedText: C, onRefreshSelection: me, attachedImages: Y, onAddImages: nt, onRemoveImage: Le, instruction: v, onInstructionChange: I, result: G, onResultChange: S, resultViewMode: A, onResultViewModeChange: z, loading: Z, error: se, templates: ae, selectedTemplateId: Q, onLoadTemplate: qe, templateName: ee, onTemplateNameChange: ge, editingTemplateId: fe, onSaveTemplate: Xe, onNewTemplate: be, onDeleteTemplate: Ye, onRun: He, onApplyResult: Te };
  if (!i) return null;
  if (g || E) {
    const N = E ? "AI (\uC0C8\uCC3D)" : "AI", P = E ? "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC (\uC0C8 \uCC3D \uB2EB\uC73C\uBA74 \uBCF5\uADC0)" : "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC";
    return o.jsxs("div", { role: "button", tabIndex: 0, onPointerDown: (W) => Ee(W, { onTap: E ? void 0 : it }), onTouchStart: (W) => ze(W, { onTap: E ? void 0 : it }), onKeyDown: (W) => {
      E || (W.key === "Enter" || W.key === " ") && (W.preventDefault(), it());
    }, className: "fixed z-10050 flex touch-none cursor-grab select-none items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-1.5 text-xs font-medium text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 active:cursor-grabbing", style: { left: `${m.leftVw}vw`, top: `${m.topVh}vh` }, title: P, "aria-label": N, children: [o.jsx(or, { size: 14, "aria-hidden": true }), N] });
  }
  return o.jsxs("div", { className: "fixed z-10050 w-[min(92vw,420px)] rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95", style: { left: `${m.leftVw}vw`, top: `${m.topVh}vh` }, role: "dialog", "aria-modal": "false", "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8", children: [o.jsxs("div", { className: "flex touch-none cursor-grab active:cursor-grabbing items-center justify-between gap-2 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40", onPointerDown: (N) => Ee(N), onTouchStart: (N) => ze(N), children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [o.jsx(Yo, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), o.jsx(or, { size: 16, className: "shrink-0", "aria-hidden": true }), o.jsx("span", { className: "truncate", children: "AI \uB3C4\uC6B0\uBBF8" })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [o.jsx("button", { type: "button", onPointerDown: (N) => N.stopPropagation(), onTouchStart: (N) => N.stopPropagation(), onClick: je, disabled: E, className: "rounded p-1 text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-200 dark:hover:bg-violet-900/50", title: E ? "\uC0C8 \uCC3D\uC5D0\uC11C \uC5F4\uB824 \uC788\uC74C" : "\uC0C8 \uCC3D\uC73C\uB85C \uC5F4\uAE30", "aria-label": "\uC0C8 \uCC3D\uC73C\uB85C \uC5F4\uAE30", children: o.jsx(sl, { size: 15 }) }), o.jsx("button", { type: "button", onPointerDown: (N) => N.stopPropagation(), onTouchStart: (N) => N.stopPropagation(), onClick: dt, className: "rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", title: "\uC228\uAE30\uAE30", "aria-label": "\uC228\uAE30\uAE30", children: o.jsx(il, { size: 15 }) }), o.jsx("button", { type: "button", onPointerDown: (N) => N.stopPropagation(), onTouchStart: (N) => N.stopPropagation(), onClick: at, className: "rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", title: "\uB2EB\uAE30", "aria-label": "\uB2EB\uAE30", children: o.jsx(qt, { size: 15 }) })] })] }), o.jsx("div", { className: "max-h-[min(70vh,560px)] overflow-y-auto p-3", children: o.jsx(Za, { ...Ne }) })] });
}
function qc({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: () => e == null ? void 0 : e(), title: "AI \uB3C4\uC6B0\uBBF8", "aria-label": "AI \uB3C4\uC6B0\uBBF8", children: o.jsx(or, { className: "md-editor-icon", size: 16 }) });
}
function Xc(e) {
  const t = String(e ?? "").split(`
`), n = [];
  let r = { name: "\uC77C\uBC18 / \uBBF8\uBD84\uB958", tasks: [] }, i = 0, s = 0;
  t.forEach((u, m) => {
    const p = u.match(/^(#{1,6})\s+(.*)/);
    if (p) {
      (r.tasks.length > 0 || r.name !== "\uC77C\uBC18 / \uBBF8\uBD84\uB958") && n.push(r), r = { name: p[2].trim(), tasks: [] };
      return;
    }
    const g = u.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX])\]\s+(.*)/);
    if (g) {
      const R = Math.floor(g[1].length / 2), E = g[3].toLowerCase() === "x", L = g[4].trim();
      i += 1, E && (s += 1), r.tasks.push({ id: `line-${m}`, lineIndex: m, indent: R, completed: E, text: L, rawLine: u });
    }
  }), r.tasks.length > 0 && n.push(r);
  const l = i > 0 ? Math.round(s / i * 100) : 0;
  return { categories: n, totalTasks: i, completedTasks: s, pendingTasks: i - s, percentage: l };
}
function Yc(e, t) {
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
function Gc({ markdown: e = "", onMarkdownChange: t }) {
  const [n, r] = a.useState(""), [i, s] = a.useState("all"), [l, u] = a.useState({}), [m, p] = a.useState("dashboard"), g = a.useMemo(() => Xc(e), [e]);
  a.useEffect(() => {
    const C = {};
    g.categories.forEach((T) => {
      C[T.name] = true;
    }), u(C);
  }, [g.categories.length]);
  const R = (C) => {
    typeof t == "function" && t(Yc(e, C));
  }, E = (C) => {
    u((T) => ({ ...T, [C]: !T[C] }));
  }, L = (C) => {
    const T = C.text.toLowerCase().includes(n.toLowerCase()), O = i === "all" ? true : i === "completed" ? C.completed : !C.completed;
    return T && O;
  };
  return o.jsxs("div", { className: "space-y-3 text-xs text-slate-100", children: [o.jsxs("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: [o.jsxs("div", { className: "col-span-2 sm:col-span-1 relative overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3", children: [o.jsx("div", { className: "pointer-events-none absolute -right-2 -top-2 opacity-10", children: o.jsx(al, { className: "h-16 w-16 text-indigo-400" }) }), o.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-indigo-300", children: "\uC804\uCCB4 \uC9C4\uD589\uB960" }), o.jsx("div", { className: "my-1.5 flex items-baseline gap-1", children: o.jsxs("span", { className: "text-3xl font-extrabold text-white", children: [g.percentage, "%"] }) }), o.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-slate-800", children: o.jsx("div", { className: "h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out", style: { width: `${g.percentage}%` } }) })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-slate-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uCD1D \uD0DC\uC2A4\uD06C" }), o.jsx(Br, { className: "h-3.5 w-3.5 text-slate-500" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-slate-100", children: [g.totalTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-emerald-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC644\uB8CC\uB428" }), o.jsx(Hn, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-emerald-400", children: [g.completedTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-amber-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC9C4\uD589 \uC608\uC815" }), o.jsx(On, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-amber-400", children: [g.pendingTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] })] }), o.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2", children: [o.jsxs("div", { className: "flex rounded-lg border border-slate-800 bg-slate-900 p-0.5", children: [o.jsxs("button", { type: "button", onClick: () => p("dashboard"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${m === "dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(ll, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCE74\uD14C\uACE0\uB9AC" })] }), o.jsxs("button", { type: "button", onClick: () => p("checklist"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${m === "checklist" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(Br, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8" })] })] }), o.jsxs("div", { className: "flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5", children: [o.jsxs("div", { className: "relative min-w-[120px] flex-1", children: [o.jsx(cl, { className: "absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" }), o.jsx("input", { type: "text", value: n, onChange: (C) => r(C.target.value), placeholder: "\uAC80\uC0C9...", className: "w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none" })] }), o.jsxs("select", { value: i, onChange: (C) => s(C.target.value), className: "rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none", children: [o.jsx("option", { value: "all", children: "\uC804\uCCB4" }), o.jsx("option", { value: "completed", children: "\uC644\uB8CC\uB9CC" }), o.jsx("option", { value: "pending", children: "\uBBF8\uC644\uB8CC\uB9CC" })] })] })] }), m === "dashboard" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5", children: g.categories.length === 0 ? o.jsxs("div", { className: "py-8 text-center text-slate-500", children: [o.jsx(hr, { className: "mx-auto mb-2 h-8 w-8 opacity-40" }), o.jsx("p", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD56D\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), o.jsx("code", { className: "mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400", children: "- [ ] \uD560 \uC77C" })] }) : g.categories.map((C, T) => {
    const O = C.tasks.length, B = C.tasks.filter((I) => I.completed).length, Y = O > 0 ? Math.round(B / O * 100) : 0, re = !!l[C.name], v = C.tasks.filter(L);
    return n && v.length === 0 ? null : o.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70", children: [o.jsxs("button", { type: "button", onClick: () => E(C.name), className: "flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40", children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [o.jsx("span", { className: "shrink-0 text-slate-500", children: re ? o.jsx(ul, { className: "h-3.5 w-3.5" }) : o.jsx(Go, { className: "h-3.5 w-3.5" }) }), o.jsx("span", { className: "truncate text-[12px] font-semibold text-slate-200", children: C.name })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [o.jsxs("span", { className: "text-[10px] font-medium text-slate-400", children: [o.jsx("strong", { className: "text-slate-200", children: B }), " / ", O] }), o.jsxs("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${Y === 100 ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border border-indigo-500/20 bg-indigo-500/10 text-indigo-400"}`, children: [Y, "%"] })] })] }), re && o.jsx("div", { className: "space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2", children: v.length === 0 ? o.jsx("p", { className: "py-1 pl-5 text-[11px] text-slate-500", children: "\uC870\uAC74\uC5D0 \uC77C\uCE58\uD558\uB294 \uD0DC\uC2A4\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : v.map((I) => o.jsxs("button", { type: "button", onClick: () => R(I.lineIndex), style: { paddingLeft: `${I.indent * 12 + 8}px` }, className: "flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50", children: [o.jsx("span", { className: "mt-0.5 shrink-0 text-slate-400", children: I.completed ? o.jsx(Hn, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(On, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${I.completed ? "text-slate-500 line-through" : "text-slate-300"}`, children: I.text })] }, I.id)) })] }, `${C.name}-${T}`);
  }) }), m === "checklist" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5", children: g.categories.map((C, T) => {
    const O = C.tasks.filter(L);
    return O.length === 0 ? null : o.jsxs("div", { className: "space-y-1", children: [o.jsxs("div", { className: "sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400", children: [C.name, " (", O.length, ")"] }), O.map((B) => o.jsxs("button", { type: "button", onClick: () => R(B.lineIndex), style: { paddingLeft: `${B.indent * 10 + 6}px` }, className: "flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60", children: [o.jsx("span", { className: "mt-0.5 shrink-0", children: B.completed ? o.jsx(Hn, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(On, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${B.completed ? "text-slate-500 line-through" : "text-slate-200"}`, children: B.text })] }, B.id))] }, `${C.name}-list-${T}`);
  }) })] })] });
}
const rs = "s3haim-checklist-progress-modal-position", Xn = { leftVw: 58, topVh: 14 };
function Jc() {
  try {
    const e = localStorage.getItem(rs);
    if (!e) return { ...Xn };
    const t = JSON.parse(e), n = Number(t == null ? void 0 : t.leftVw), r = Number(t == null ? void 0 : t.topVh);
    return !Number.isFinite(n) || !Number.isFinite(r) ? { ...Xn } : { leftVw: Math.min(95, Math.max(0, n)), topVh: Math.min(95, Math.max(0, r)) };
  } catch {
    return { ...Xn };
  }
}
function Zc({ leftVw: e, topVh: t }) {
  try {
    localStorage.setItem(rs, JSON.stringify({ leftVw: Math.min(95, Math.max(0, e)), topVh: Math.min(95, Math.max(0, t)) }));
  } catch {
  }
}
const os = "(max-width: 768px)", Qc = 5;
function Zr() {
  return typeof window < "u" && window.matchMedia(os).matches;
}
function eu({ editorRef: e, onChange: t, open: n, onOpenChange: r }) {
  const [i, s] = a.useState(() => Jc()), [l, u] = a.useState(""), [m, p] = a.useState({ from: 0, to: 0 }), g = a.useRef({ active: false, startX: 0, startY: 0, startLeftVw: 0, startTopVh: 0 }), R = a.useCallback(() => {
    const { text: T, from: O, to: B } = Vt(e);
    return u(T), p({ from: O, to: B }), T;
  }, [e]);
  a.useEffect(() => {
    if (n) {
      if (Zr()) {
        r == null ? void 0 : r(false);
        return;
      }
      R();
    }
  }, [n, R, r]), a.useEffect(() => {
    if (!n) return;
    const T = window.matchMedia(os), O = (B) => {
      B.matches && (r == null ? void 0 : r(false));
    };
    return T.addEventListener("change", O), () => T.removeEventListener("change", O);
  }, [n, r]);
  const E = a.useCallback((T) => {
    if (T.button !== 0) return;
    T.preventDefault();
    const O = T.clientX, B = T.clientY;
    g.current = { active: true, startX: O, startY: B, startLeftVw: i.leftVw, startTopVh: i.topVh };
    const Y = (v) => {
      if (!g.current.active) return;
      Math.hypot(v.clientX - O, v.clientY - B) <= Qc;
      const I = window.innerWidth || 1, G = window.innerHeight || 1, S = (v.clientX - g.current.startX) / I * 100, A = (v.clientY - g.current.startY) / G * 100;
      s({ leftVw: Math.min(92, Math.max(0, g.current.startLeftVw + S)), topVh: Math.min(90, Math.max(0, g.current.startTopVh + A)) });
    }, re = () => {
      g.current.active && (g.current.active = false, document.removeEventListener("pointermove", Y), document.removeEventListener("pointerup", re), s((v) => (Zc(v), v)));
    };
    document.addEventListener("pointermove", Y), document.addEventListener("pointerup", re);
  }, [i.leftVw, i.topVh]), L = a.useCallback((T) => {
    u(T);
    const { view: O } = Vt(e), { from: B, to: Y } = m;
    ur(O, B, Y, T, t) && p({ from: B, to: B + T.length });
  }, [e, m, t]), C = () => {
    r == null ? void 0 : r(false);
  };
  return !n || Zr() ? null : o.jsxs("div", { className: "fixed z-[10050] w-[min(92vw,440px)] rounded-lg border border-indigo-400/40 bg-slate-950/95 shadow-2xl backdrop-blur-md", style: { left: `${i.leftVw}vw`, top: `${i.topVh}vh` }, role: "dialog", "aria-modal": "false", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: [o.jsxs("div", { className: "flex cursor-grab items-center justify-between gap-2 border-b border-indigo-500/30 bg-indigo-950/50 px-3 py-2 active:cursor-grabbing", onPointerDown: E, children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-indigo-100", children: [o.jsx(Yo, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), o.jsx(hr, { size: 16, className: "shrink-0", "aria-hidden": true }), o.jsx("span", { className: "truncate", children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960" })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [o.jsxs("button", { type: "button", onPointerDown: (T) => T.stopPropagation(), onClick: R, className: "inline-flex items-center gap-1 rounded px-1.5 py-1 text-[11px] text-indigo-200 hover:bg-indigo-900/50", title: "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", "aria-label": "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", children: [o.jsx(dl, { size: 14 }), o.jsx("span", { className: "hidden sm:inline", children: "\uC0C8\uB85C\uACE0\uCE68" })] }), o.jsx("button", { type: "button", onPointerDown: (T) => T.stopPropagation(), onClick: C, className: "rounded p-1 text-indigo-200 hover:bg-indigo-900/50", title: "\uB2EB\uAE30", "aria-label": "\uB2EB\uAE30", children: o.jsx(qt, { size: 15 }) })] })] }), o.jsx("div", { className: "max-h-[min(72vh,640px)] overflow-y-auto p-3", children: l.trim() ? o.jsx(Gc, { markdown: l, onMarkdownChange: L }) : o.jsxs("p", { className: "rounded-lg border border-dashed border-slate-700 bg-slate-900/60 px-3 py-6 text-center text-xs text-slate-400", children: ["\uC5D0\uB514\uD130\uC5D0\uC11C \uCCB4\uD06C\uB9AC\uC2A4\uD2B8\uAC00 \uD3EC\uD568\uB41C \uD14D\uC2A4\uD2B8\uB97C \uC120\uD0DD\uD55C \uB4A4", o.jsx("br", {}), "\uD234\uBC14 \uBC84\uD2BC\uC744 \uB204\uB974\uAC70\uB098 \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694."] }) })] });
}
const tu = "(max-width: 768px)";
function nu() {
  return typeof window < "u" && window.matchMedia(tu).matches;
}
function ru({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item max-md:hidden", onClick: () => {
    nu() || (e == null ? void 0 : e());
  }, title: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: o.jsx(hr, { className: "md-editor-icon", size: 16 }) });
}
function ou({ value: e = "", theme: t = "light", currentFile: n = null, disabled: r, trigger: i }) {
  const s = Io(), l = a.useCallback(() => {
    r || (Vo({ currentFile: n, editorContent: e }), s(Ko(n == null ? void 0 : n.id), { state: { value: e, theme: t, currentFile: n } }));
  }, [s, e, t, r, n]);
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: l, disabled: r, title: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", "aria-label": "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", children: i ?? o.jsx(fl, { className: "md-editor-icon", size: 16 }) });
}
function su({ editorRef: e }) {
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
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: t, title: "Insert print page break (<pgbr/>)", "aria-label": "Insert print page break", children: o.jsx(ml, { className: "md-editor-icon", size: 16 }) });
}
function iu({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", title: "\uCD5C\uB300 heading \uBCC0\uACBD", "aria-label": "\uCD5C\uB300 heading \uBCC0\uACBD", onClick: () => e(), children: o.jsx(pl, { className: "md-editor-icon", size: 16 }) });
}
const au = [{ value: "selection", title: "\uC120\uD0DD \uC601\uC5ED", description: "\uD604\uC7AC \uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uB9CC \uBCC0\uACBD" }, { value: "document", title: "\uC804\uCCB4 \uBB38\uC11C", description: "\uBB38\uC11C \uC804\uCCB4 heading\uC744 \uBCC0\uACBD" }], lu = [{ value: "flat", title: "1. \uD615\uC2DD", description: "\uCD5C\uB300 heading\uC744 \uD55C \uC790\uB9AC \uBC88\uD638\uB85C \uC2DC\uC791" }, { value: "nested", title: "2.1. \uD615\uC2DD", description: "heading \uC218\uC900\uB9CC\uD07C \uBC88\uD638\uB97C \uBD99\uC784" }], cu = [{ value: 1, title: "1\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 1. / 1.1. \u2026" }, { value: 2, title: "2\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 2. / 2.1. \u2026" }], uu = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), du = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Qr = "z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function fu({ isOpen: e, markdown: t, selectedMarkdown: n = "", onClose: r, onApply: i }) {
  const s = n.length > 0, [l, u] = a.useState("document"), [m, p] = a.useState(1), [g, R] = a.useState(false), [E, L] = a.useState("nested"), [C, T] = a.useState(1), O = l === "selection" ? n : t;
  a.useEffect(() => {
    if (!e) return;
    const v = s ? "selection" : "document";
    u(v), p(Ar(v === "selection" ? n : t)), R(false), L("nested"), T(1);
  }, [e, t, n, s]), a.useEffect(() => {
    if (!e) return;
    const v = (S) => {
      const A = S;
      return (A == null ? void 0 : A.closest) ? !!A.closest('.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]') : false;
    }, I = () => {
      const S = document.activeElement;
      S && v(S) && typeof S.blur == "function" && S.blur();
    };
    I();
    const G = (S) => {
      if (S.metaKey || S.ctrlKey || S.altKey) return;
      const A = S.key;
      if (A >= "1" && A <= "9") {
        const z = Number(A);
        Pr(z) && (S.preventDefault(), S.stopPropagation(), S.stopImmediatePropagation(), p(z));
        return;
      }
      S.key === "Escape" || S.key === "Enter" || v(S.target) && (S.preventDefault(), S.stopPropagation(), S.stopImmediatePropagation(), I());
    };
    return window.addEventListener("keydown", G, true), () => window.removeEventListener("keydown", G, true);
  }, [e]);
  const B = a.useMemo(() => Hi(O, m, { maxLevel: Ir, renumberOutline: g, outlineStyle: E, outlineStart: C }), [O, m, g, E, C]), Y = (v) => {
    if (v !== "selection" && v !== "document" || v === "selection" && !s) return;
    u(v), p(Ar(v === "selection" ? n : t));
  }, re = () => {
    if (!B.sourceMax) return;
    const v = Ki(O, m, { maxLevel: Ir, renumberOutline: g, outlineStyle: E, outlineStart: C });
    v !== O && i(v, l), r();
  };
  return o.jsx(Ut, { isOpen: e, onClose: r, onConfirm: re, contentClassName: "max-w-3xl", children: o.jsx(Zo, { delayDuration: 250, skipDelayDuration: 0, children: o.jsxs("div", { className: "flex min-h-0 flex-1 flex-col p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uCD5C\uB300 heading \uBCC0\uACBD" }), o.jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-odp-muted", children: ["\uAC10\uC9C0\uB41C \uCD5C\uB300 heading\uC744 \uC120\uD0DD\uD55C \uB2E8\uACC4\uB85C \uBC14\uAFB8\uACE0, \uD558\uC704 heading\uB3C4 \uAC19\uC740 \uAC04\uACA9\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.", " ", "\uC22B\uC790 \uD0A4 1\u20139\uB85C \uCD5C\uB300 heading\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC801\uC6A9 \uBC94\uC704" }), o.jsx(Vn, { className: "flex items-center gap-2", value: l, onValueChange: Y, "aria-label": "\uCD5C\uB300 heading \uC801\uC6A9 \uBC94\uC704", children: au.map((v) => {
    const I = l === v.value, G = v.value === "selection" && !s;
    return o.jsx(Kn, { value: v.value, disabled: G, className: ["flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", I ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: I ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: v.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: v.value === "selection" && !s ? "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" : v.description })] }) }, v.value);
  }) })] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("label", { htmlFor: "editor-heading-max", className: "mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading" }), o.jsxs(Ll, { value: String(m), onValueChange: (v) => {
    const I = Number(v);
    Pr(I) && p(I);
  }, children: [o.jsxs(Rl, { id: "editor-heading-max", "aria-label": "\uCD5C\uB300 heading", className: "inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [o.jsx(Al, {}), o.jsx(Pl, { className: "text-gray-500", children: o.jsx(Go, { size: 14 }) })] }), o.jsx(Dl, { children: o.jsx(Il, { className: "z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: o.jsx($l, { className: "p-1", children: Oi.map((v) => o.jsxs(_l, { value: String(v), className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [o.jsx(Fl, { className: "absolute left-1.5 inline-flex items-center", children: o.jsx(yn, { size: 12 }) }), o.jsx(Hl, { children: `h${v}` })] }, v)) }) }) })] })] }), o.jsxs("div", { className: "mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft", children: [o.jsxs("div", { className: "flex items-center justify-between gap-3", children: [o.jsxs("div", { className: "min-w-0", children: [o.jsx("div", { className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: "outline \uBC88\uD638 \uB9DE\uCD94\uAE30" }), o.jsx("p", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC55E\uC758 1. / 2.1. \uAC19\uC740 \uBC88\uD638\uB97C \uD604\uC7AC heading \uC218\uC900\uC5D0 \uB9DE\uAC8C \uB2E4\uC2DC \uBD99\uC785\uB2C8\uB2E4." })] }), o.jsx(gr, { className: uu(g), checked: g, onCheckedChange: R, "aria-label": "outline \uBC88\uD638 \uB9DE\uCD94\uAE30", children: o.jsx(xr, { className: du }) })] }), g ? o.jsxs("div", { className: "mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60", children: [o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD" }), o.jsx(Vn, { className: "flex items-center gap-2", value: E, onValueChange: (v) => {
    (v === "flat" || v === "nested") && L(v);
  }, "aria-label": "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD", children: lu.map((v) => {
    const I = E === v.value;
    return o.jsx(Kn, { value: v.value, className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", I ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: I ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: v.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: v.description })] }) }, v.value);
  }) })] }), o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), o.jsx(Vn, { className: "flex items-center gap-2", value: String(C), onValueChange: (v) => {
    v === "1" && T(1), v === "2" && T(2);
  }, "aria-label": "\uCD5C\uB300 heading \uC2DC\uC791 \uBC88\uD638", children: cu.map((v) => {
    const I = C === v.value;
    return o.jsx(Kn, { value: String(v.value), className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", I ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: I ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: v.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: v.description })] }) }, v.value);
  }) })] })] }) : null] }), o.jsx("div", { className: "mt-4 min-h-0", children: B.rows.length ? o.jsx("div", { className: "max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-odp-borderSoft", children: o.jsxs("table", { className: "w-full table-fixed border-collapse text-left text-sm", children: [o.jsx("thead", { className: "sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft", children: o.jsxs("tr", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874 \uC81C\uBAA9" }), o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD\uB420 \uC81C\uBAA9" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD" })] }) }), o.jsx("tbody", { children: B.rows.map((v, I) => o.jsxs("tr", { className: "border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60", children: [o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(sr, { children: [o.jsx(ir, { asChild: true, children: o.jsx("span", { className: "block truncate", children: v.text || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(ar, { children: o.jsxs(lr, { side: "top", sideOffset: 6, className: Qr, children: [v.text || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(cr, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(sr, { children: [o.jsx(ir, { asChild: true, children: o.jsx("span", { className: "block truncate", children: v.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(ar, { children: o.jsxs(lr, { side: "top", sideOffset: 6, className: Qr, children: [v.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(cr, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted", children: ["h", v.from] }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: ["h", v.to] })] }, `${v.from}-${I}-${v.text}`)) })] }) }) : o.jsx("p", { className: "rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted", children: l === "selection" ? "\uC120\uD0DD \uC601\uC5ED\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBB38\uC11C\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) }), o.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [o.jsxs(Dr, { type: "button", variant: "secondary", size: "md", onClick: r, children: [o.jsx(Bi, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs(Dr, { type: "button", variant: "primary", size: "md", onClick: re, disabled: !B.sourceMax, children: [o.jsx(Vi, { size: 16 }), "\uC801\uC6A9"] })] })] }) }) });
}
function Sn({ checked: e = false, onChange: t, theme: n = "light", title: r, ariaLabel: i, icon: s }) {
  const l = n === "dark", u = i || r;
  return o.jsx("span", { className: "md-editor-toolbar-item inline-flex items-center !w-auto !min-w-0 px-1", title: r, children: o.jsxs("label", { className: "inline-flex shrink-0 cursor-pointer select-none items-center gap-1", onMouseDown: (m) => {
    m.preventDefault();
  }, children: [o.jsx(s, { className: `md-editor-icon shrink-0 ${l ? "text-odp-muted" : "text-gray-500"}`, size: 16, "aria-hidden": true }), o.jsx(gr, { checked: e, onCheckedChange: (m) => t == null ? void 0 : t(!!m), "aria-label": u, className: ["relative h-4 w-7 rounded-full border-0 outline-none transition-colors", "focus-visible:ring-2 focus-visible:ring-blue-400", e ? "bg-blue-600 dark:bg-blue-500" : l ? "bg-odp-borderStrong" : "bg-gray-300"].join(" "), children: o.jsx(xr, { className: ["block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform", "data-[state=checked]:translate-x-3.5"].join(" ") }) })] }) });
}
function mu({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(Sn, { checked: e, onChange: t, theme: n, icon: hl, title: e ? "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8 \uCF1C\uC9D0" : "\uBAA9\uCC28 \uC81C\uBAA9 \uB9D0\uC904\uC784(...)", ariaLabel: "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8" });
}
function pu({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(Sn, { checked: e, onChange: t, theme: n, icon: gl, title: e ? "base64 \uC774\uBBF8\uC9C0 \uC811\uD798" : "base64 \uC774\uBBF8\uC9C0 \uD3BC\uCE68", ariaLabel: "base64 \uC774\uBBF8\uC9C0 \uC811\uAE30" });
}
function hu({ checked: e = true, onChange: t, theme: n = "light" }) {
  return o.jsx(Sn, { checked: e, onChange: t, theme: n, icon: Jo, title: e ? "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uCF1C\uC9D0" : "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uAEBC\uC9D0", ariaLabel: "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C" });
}
function gu({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(Sn, { checked: e, onChange: t, theme: n, icon: xl, title: e ? "Mirror Edit on \u2014 dual caret + instant preview sync" : "Mirror Edit off", ariaLabel: "Mirror Edit" });
}
function xu({ onRequestLink: e, onRequestUpload: t, onRequestClip: n, disabled: r = false }) {
  const [i, s] = a.useState(false), l = a.useRef(null), u = a.useRef(null), m = a.useCallback(() => s(false), []);
  return o.jsxs(o.Fragment, { children: [o.jsx(Ds, { title: "\uC774\uBBF8\uC9C0", visible: i, onChange: s, disabled: r, overlay: o.jsxs("ul", { className: "md-editor-menu", role: "menu", onClick: m, children: [o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => e(), onKeyDown: (p) => {
    (p.key === "Enter" || p.key === " ") && (p.preventDefault(), e());
  }, children: "\uB9C1\uD06C \uCD94\uAC00" }), o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => {
    var _a2;
    return (_a2 = l.current) == null ? void 0 : _a2.click();
  }, onKeyDown: (p) => {
    var _a2;
    (p.key === "Enter" || p.key === " ") && (p.preventDefault(), (_a2 = l.current) == null ? void 0 : _a2.click());
  }, children: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC" }), o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => {
    var _a2;
    return (_a2 = u.current) == null ? void 0 : _a2.click();
  }, onKeyDown: (p) => {
    var _a2;
    (p.key === "Enter" || p.key === " ") && (p.preventDefault(), (_a2 = u.current) == null ? void 0 : _a2.click());
  }, children: "\uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC" })] }), children: o.jsx(bl, { className: "md-editor-icon", size: 16, "aria-hidden": true }) }), o.jsx("input", { ref: l, type: "file", accept: "image/*", multiple: true, className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (p) => {
    const g = Array.from(p.target.files || []);
    p.target.value = "", g.length && t(g);
  } }), o.jsx("input", { ref: u, type: "file", accept: "image/*", className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (p) => {
    var _a2;
    const g = (_a2 = p.target.files) == null ? void 0 : _a2[0];
    p.target.value = "", g && n(g);
  } })] });
}
function bu({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, i] = a.useState(""), [s, l] = a.useState(""), [u, m] = a.useState("");
  a.useEffect(() => {
    e && (i(""), l(""), m(""));
  }, [e]);
  const p = () => {
    const g = s.trim();
    if (!g) {
      m("\uC774\uBBF8\uC9C0 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ desc: r.trim(), url: g }), t();
  };
  return o.jsx(Ut, { isOpen: e, onClose: t, onConfirm: p, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C" }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC124\uBA85 (alt)" }), o.jsx("input", { type: "text", value: r, onChange: (g) => i(g.target.value), placeholder: "\uC120\uD0DD", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL" }), o.jsx("input", { type: "text", value: s, onChange: (g) => l(g.target.value), placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), u ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: u }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(qt, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: p, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(yn, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function wu({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, i] = a.useState(""), [s, l] = a.useState(""), [u, m] = a.useState(""), p = a.useRef(null);
  a.useEffect(() => {
    if (!e) return;
    i(""), l(""), m("");
    const E = window.setTimeout(() => {
      var _a2;
      return (_a2 = p.current) == null ? void 0 : _a2.focus();
    }, 40);
    return () => window.clearTimeout(E);
  }, [e]);
  const g = () => {
    const E = r.trim(), L = s.trim();
    if (!E && !L) {
      m("\uAC01\uC8FC \uC81C\uBAA9 \uB610\uB294 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ line1: E, line2: L }), t();
  }, R = (E) => {
    E.key === "Enter" && (!(E.metaKey || E.ctrlKey) || E.altKey || E.shiftKey || E.nativeEvent.isComposing || E.keyCode === 229 || (E.preventDefault(), E.stopPropagation(), g()));
  };
  return o.jsx(Ut, { isOpen: e, onClose: t, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uAC01\uC8FC \uC0BD\uC785" }), o.jsxs("p", { className: "text-xs leading-5 text-gray-500 dark:text-odp-muted", children: ["\uCCAB \uC904\uC740 \uC81C\uBAA9, \uB458\uC9F8 \uC904\uC740 URL\uC785\uB2C8\uB2E4. \uBCF8\uBB38 \uCEE4\uC11C\uC5D0", " ", o.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "[^N]" }), "\uC774 \uB4E4\uC5B4\uAC00\uACE0, \uBB38\uC11C \uD558\uB2E8 Sources\uC5D0 \uB450 \uC904\uC774 \uCD94\uAC00\uB429\uB2C8\uB2E4. Ctrl+Enter \uB610\uB294 \u2318+Enter\uB85C \uC0BD\uC785\uD569\uB2C8\uB2E4."] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC81C\uBAA9 (1\uC904)" }), o.jsx("input", { ref: p, type: "text", value: r, onChange: (E) => {
    i(E.target.value), u && m("");
  }, onKeyDown: R, placeholder: "\uC608: docs.docker.com - Compose services", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL (2\uC904)" }), o.jsx("input", { type: "text", value: s, onChange: (E) => {
    l(E.target.value), u && m("");
  }, onKeyDown: R, placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), u ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: u }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(qt, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: g, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(yn, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function yu({ isOpen: e, file: t, onClose: n, onConfirm: r }) {
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
  }, [e, t]), o.jsx(Ut, { isOpen: e && !!t, onClose: n, contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: i ? o.jsx(Gl, { imageSrc: i, ...(t == null ? void 0 : t.name) ? { fileName: t.name } : {}, onCancel: n, onConfirm: r }) : null });
}
const ss = "s3haim_md_editor_base64_image_fold";
function is() {
  if (typeof window > "u") return true;
  try {
    const e = window.localStorage.getItem(ss);
    return e === null ? true : e === "1";
  } catch {
    return true;
  }
}
function vu(e) {
  if (!(typeof window > "u")) try {
    window.localStorage.setItem(ss, e ? "1" : "0");
  } catch {
  }
}
function ku() {
  const [e, t] = a.useState(is), n = a.useCallback((r) => {
    t((i) => {
      const s = typeof r == "function" ? r(i) : !!r;
      return vu(s), s;
    });
  }, []);
  return [e, n];
}
function Eu() {
  const [e, t] = a.useState(zo);
  a.useEffect(() => zi((r) => {
    t(r);
  }), []);
  const n = a.useCallback((r) => {
    t((i) => {
      const s = typeof r == "function" ? r(i) : !!r;
      return Wi(s), s;
    });
  }, []);
  return [e, n];
}
function Su() {
  const [e, t] = a.useState(Ui);
  a.useEffect(() => qi((r) => {
    t(r);
  }), []);
  const n = a.useCallback((r) => {
    t((i) => {
      const s = typeof r == "function" ? r(i) : !!r;
      return Xi(s), s;
    });
  }, []);
  return [e, n];
}
const Cu = 48, eo = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi, as = Fo.define(), ls = Fo.define(), cs = new _o();
function Nu(e) {
  const t = [];
  eo.lastIndex = 0;
  let n;
  for (; (n = eo.exec(e)) !== null; ) {
    const r = n[1] ?? "image", i = n[2] ?? "";
    if (i.length < Cu) continue;
    const s = n[0], l = s.length - i.length, u = n.index + l;
    t.push({ from: u, to: n.index + s.length, mime: r });
  }
  return t;
}
function ju(e, t) {
  const n = Math.round(t * 3 / 4), r = n >= 1024 * 1024 ? `${(n / (1024 * 1024)).toFixed(1)}MB` : n >= 1024 ? `${Math.max(1, Math.round(n / 1024))}KB` : `${n}B`;
  return `\u2026${e} ${r}\u2026`;
}
class Mu extends $s {
  constructor(t, n, r) {
    super(), this.label = t, this.from = n, this.to = r;
  }
  toDOM(t) {
    const n = document.createElement("span");
    return n.textContent = this.label, n.className = "cm-base64-image-fold", n.title = "Click to expand base64 image data", n.addEventListener("mousedown", (r) => {
      r.preventDefault(), r.stopPropagation(), t.dispatch({ selection: { anchor: this.from }, effects: as.of({ from: this.from, to: this.to }) }), t.focus();
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
function Tu(e, t, n) {
  return e.some((r) => r.from === t && r.to === n);
}
function to(e, t) {
  const n = [], r = [];
  for (let i = 1; i <= e.doc.lines; i += 1) {
    const s = e.doc.line(i);
    for (const l of Nu(s.text)) {
      const u = s.from + l.from, m = s.from + l.to;
      if (Tu(t, u, m)) {
        r.push({ from: u, to: m });
        continue;
      }
      n.push(vr.replace({ widget: new Mu(ju(l.mime, m - u), u, m) }).range(u, m));
    }
  }
  return { deco: vr.set(n, true), expanded: r };
}
const us = Is.define({ create(e) {
  return to(e, []);
}, update(e, t) {
  let n = e.expanded;
  t.docChanged && n.length && (n = n.map(({ from: i, to: s }) => ({ from: t.changes.mapPos(i, 1), to: t.changes.mapPos(s, -1) })).filter(({ from: i, to: s }) => i < s));
  let r = n !== e.expanded;
  for (const i of t.effects) i.is(as) ? (n = [{ from: i.value.from, to: i.value.to }], r = true) : i.is(ls) && n.length > 0 && (n = [], r = true);
  return t.docChanged || r ? to(t.state, n) : e;
}, provide: (e) => Ht.decorations.from(e, (t) => t.deco) }), Lu = Ht.domEventHandlers({ mousedown(e, t) {
  const n = t.state.field(us, false);
  if (!n || n.expanded.length === 0) return false;
  const r = e.target;
  if (!(r instanceof Node) || !t.dom.contains(r)) return false;
  const i = t.posAtDOM(r, 0);
  return i !== -1 && n.expanded.some(({ from: s, to: l }) => i >= s && i <= l) || t.dispatch({ effects: ls.of(null) }), false;
} });
function ds() {
  return [us, Lu];
}
function Ru(e) {
  return cs.of(e ? ds() : []);
}
function Au(e, t) {
  if (e) try {
    e.dispatch({ effects: cs.reconfigure(t ? ds() : []) });
  } catch {
  }
}
const gn = /* @__PURE__ */ new Set();
function Pu(e) {
  return gn.add(e), () => {
    gn.delete(e);
  };
}
function Du(e) {
  if (!(!e.selectionSet && !e.docChanged) && !(e.view.composing || e.view.compositionStarted) && gn.size !== 0) for (const t of gn) try {
    t(e.view, e);
  } catch {
  }
}
const Iu = `<br/>
`;
function $u(e) {
  if (!ki() || !(e == null ? void 0 : e.state)) return false;
  const t = e.state.selection.main, n = Iu;
  return e.dispatch({ changes: { from: t.from, to: t.to, insert: n }, selection: Je.cursor(t.from + n.length), scrollIntoView: true }), true;
}
const no = 80, _u = 350;
function ro(e) {
  return JSON.stringify(e);
}
function oo(e) {
  try {
    const t = JSON.parse(e);
    return !t || typeof t != "object" || !t.meta || typeof t.meta != "object" || !t.grid || !Array.isArray(t.grid.rows) ? null : t;
  } catch {
    return null;
  }
}
function Fu(e) {
  return !Array.isArray(e) || e.length === 0 ? [] : e.length <= no ? e : e.slice(e.length - no);
}
function Hu(e, t, n) {
  const r = Array.isArray(e) && e.length > 0 ? e : [];
  if (r.length === 0) return { stack: [n], index: 0, changed: true };
  const i = Math.max(0, Math.min(t, r.length - 1));
  if (r[i] === n) return { stack: r, index: i, changed: false };
  const s = r.slice(0, i + 1);
  s.push(n);
  const l = Fu(s);
  return { stack: l, index: l.length - 1, changed: true };
}
function Ou({ enabled: e, historyKey: t, meta: n, grid: r, applySnapshot: i }) {
  const s = a.useRef([]), l = a.useRef(0), u = a.useRef(false), m = a.useRef(false), p = a.useRef(null), g = a.useRef(null), R = a.useRef(i);
  R.current = i;
  const [E, L] = a.useState(0), C = a.useCallback(() => L((S) => S + 1), []), T = a.useCallback(() => {
    p.current && (clearTimeout(p.current), p.current = null);
  }, []), O = a.useCallback(() => ro({ meta: n, grid: r }), [r, n]), B = a.useCallback(() => {
    T();
    const S = g.current;
    if (S == null) return;
    g.current = null;
    const A = Hu(s.current, l.current, S);
    A.changed && (s.current = A.stack, l.current = A.index, C());
  }, [C, T]);
  a.useEffect(() => {
    if (!e) {
      T(), g.current = null, s.current = [], l.current = 0, m.current = false, C();
      return;
    }
    if (t <= 0) return;
    T(), g.current = null;
    const S = ro({ meta: n, grid: r });
    s.current = [S], l.current = 0, m.current = true, C();
  }, [e, t, C, T]), a.useEffect(() => {
    if (!e || !m.current || u.current) return;
    const S = O();
    if (s.current[l.current] !== S) return g.current = S, T(), p.current = setTimeout(() => {
      p.current = null, B();
    }, _u), () => {
      T();
    };
  }, [T, O, e, B, r, n]);
  const Y = a.useCallback(() => {
    !e || !m.current || u.current || (g.current = O(), B());
  }, [O, e, B]), re = a.useCallback(() => {
    if (B(), l.current <= 0) return false;
    l.current -= 1;
    const S = s.current[l.current], A = S ? oo(S) : null;
    return A ? (u.current = true, R.current(A), C(), requestAnimationFrame(() => {
      u.current = false;
    }), true) : false;
  }, [C, B]), v = a.useCallback(() => {
    if (B(), l.current >= s.current.length - 1) return false;
    l.current += 1;
    const S = s.current[l.current], A = S ? oo(S) : null;
    return A ? (u.current = true, R.current(A), C(), requestAnimationFrame(() => {
      u.current = false;
    }), true) : false;
  }, [C, B]), I = e && m.current && l.current > 0, G = e && m.current && l.current < s.current.length - 1;
  return { undo: re, redo: v, canUndo: I, canRedo: G, recordNow: Y, flushPendingRecord: B };
}
const Bu = ["thead", "tbody", "tfoot"], Yn = 10, so = 36, io = 44, Nt = 4, on = 14, Vu = "h-3.5 w-3.5 shrink-0", de = "h-3 w-3 shrink-0", Gn = "__none__", Ku = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), zu = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", ao = 288, fs = 200, Wu = 480, Uu = 380, qu = 560, lo = 16, It = 6, Xu = [{ value: "full", label: "\uD398\uC774\uC9C0 \uC804\uCCB4 (full)" }, { value: "fit", label: "\uB0B4\uC6A9\uB9CC\uD07C (fit)" }], Yu = [{ value: "left", label: "\uC67C\uCABD" }, { value: "right", label: "\uC624\uB978\uCABD" }], Gu = "pointer-events-none z-100050 max-w-[240px] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", Ju = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", co = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", ms = typeof navigator < "u" && (/Mac|iPhone|iPad|iPod/i.test(navigator.platform) || /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent ?? "")), xt = ms ? "\u2318" : "Ctrl", Zu = `${xt}+E`, Qu = `${xt}+Shift+E`, ed = `${xt}+Shift+>`, td = `${xt}+Shift+<`, Jn = `${xt}+Z`, Zn = ms ? `${xt}+Shift+Z` : `${xt}+Y`, nd = 14;
function rd(e, t, n = nd) {
  const r = (e || "").trim(), i = /^(\d+(?:\.\d+)?)(px|%|em|rem|pt)?$/i.exec(r), s = ((i == null ? void 0 : i[2]) || "px").toLowerCase(), l = i ? Number(i[1]) : n, u = s === "em" || s === "rem" ? 0.1 : 1, m = s === "em" || s === "rem" ? 0.5 : s === "%" ? 50 : 8;
  let p = (Number.isFinite(l) ? l : n) + t * u;
  return p = Math.max(m, p), s === "em" || s === "rem" ? p = Math.round(p * 10) / 10 : p = Math.round(p), `${p}${s}`;
}
function gt({ icon: e, children: t }) {
  return o.jsxs("span", { className: "inline-flex items-center gap-1", children: [o.jsx("span", { className: "inline-flex shrink-0 text-gray-400 dark:text-odp-muted", "aria-hidden": true, children: e }), t] });
}
function kt(e) {
  return Math.min(Wu, Math.max(fs, Math.round(e)));
}
function uo({ onDelta: e, ariaLabel: t }) {
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
function od(e, t) {
  return e === 0 ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC704\uC5D0 \uD589 \uCD94\uAC00" : e === t ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC544\uB798\uC5D0 \uD589 \uCD94\uAC00" : `\uB354\uBE14\uD074\uB9AD: ${e}\uD589 \uC704\uC5D0 \uD589 \uCD94\uAC00`;
}
function sd(e, t) {
  return e === 0 ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC55E\uC5D0 \uC5F4 \uCD94\uAC00" : e === t ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uB4A4\uC5D0 \uC5F4 \uCD94\uAC00" : `\uB354\uBE14\uD074\uB9AD: ${e}\uC5F4 \uC55E\uC5D0 \uC5F4 \uCD94\uAC00`;
}
function fo(e) {
  return e === "row" ? "\uB4DC\uB798\uADF8: \uD589 \uB192\uC774 \uC870\uC808" : "\uB4DC\uB798\uADF8: \uC5F4 \uB108\uBE44 \uC870\uC808";
}
function mo(e, t, n, r, i, s) {
  const l = r.left - i.left, u = t - i.top, m = r.width, p = Math.min(Math.max(n - i.left, l), l + m);
  return { kind: "row", index: e, x: p, y: u, edge: { left: l, top: u - Nt / 2, width: m, height: Nt }, ghost: { left: l, top: u - so / 2, width: m, height: so }, label: od(e, s) };
}
function po(e, t, n, r, i, s) {
  const l = r.top - i.top, u = t - i.left, m = r.height, p = Math.min(Math.max(n - i.top, l), l + m);
  return { kind: "col", index: e, x: u, y: p, edge: { left: u - Nt / 2, top: l, width: Nt, height: m }, ghost: { left: u - io / 2, top: l, width: io, height: m }, label: sd(e, s) };
}
function id({ tip: e, onDoubleClick: t, style: n }) {
  return o.jsxs(sr, { open: true, children: [o.jsx(ir, { asChild: true, children: o.jsx("button", { type: "button", "aria-label": e, style: n, onClick: (r) => {
    r.preventDefault(), r.stopPropagation();
  }, onDoubleClick: (r) => {
    r.preventDefault(), r.stopPropagation(), t();
  }, onMouseDown: (r) => {
    r.preventDefault(), r.stopPropagation();
  }, onPointerDown: (r) => {
    r.preventDefault(), r.stopPropagation();
  }, "data-haim-edge-add": "", className: "haim-table-insert-btn pointer-events-auto absolute z-30 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-400/80 bg-white text-blue-600 shadow-sm hover:bg-blue-50 dark:border-blue-400/70 dark:bg-odp-surface dark:text-blue-300 dark:hover:bg-blue-950/60", children: o.jsx(Ml, { className: "h-3 w-3", "aria-hidden": true }) }) }), o.jsx(ar, { children: o.jsxs(lr, { className: Gu, side: "top", sideOffset: 8, children: [e, o.jsx(cr, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function ad({ insert: e, tip: t, allowResize: n, onDoubleClickInsert: r, onResizePointerDown: i }) {
  const s = e.kind === "row", l = s ? { left: e.edge.left, top: e.edge.top + Nt / 2 - on / 2, width: e.edge.width, height: on } : { left: e.edge.left + Nt / 2 - on / 2, top: e.edge.top, width: on, height: e.edge.height };
  return o.jsx("div", { role: "presentation", title: t, "data-haim-edge-hit": "", className: `pointer-events-auto absolute z-[25] ${n ? s ? "cursor-row-resize" : "cursor-col-resize" : "cursor-pointer"}`, style: { left: l.left, top: l.top, width: l.width, height: l.height }, onMouseDown: (u) => {
    u.preventDefault(), u.stopPropagation();
  }, onPointerDown: (u) => {
    if (u.preventDefault(), u.stopPropagation(), u.button !== 0 || u.detail >= 2 || !n) return;
    const m = u.clientX, p = u.clientY, g = u;
    let R = false;
    const E = () => {
      document.removeEventListener("pointermove", L, true), document.removeEventListener("pointerup", C, true), document.removeEventListener("pointercancel", C, true);
    }, L = (T) => {
      R || Math.abs(T.clientX - m) < 3 && Math.abs(T.clientY - p) < 3 || (R = true, E(), i(g));
    }, C = () => {
      E();
    };
    document.addEventListener("pointermove", L, true), document.addEventListener("pointerup", C, true), document.addEventListener("pointercancel", C, true);
  }, onDoubleClick: (u) => {
    u.preventDefault(), u.stopPropagation(), r();
  } });
}
function ld({ insert: e }) {
  const t = `${e.kind}-${e.index}`;
  return o.jsxs("div", { "data-haim-insert-preview": "", className: "contents", children: [o.jsx("div", { "aria-hidden": true, className: `pointer-events-none absolute z-10 rounded-sm border border-transparent bg-blue-400/[0.04] dark:bg-blue-400/[0.06] ${e.kind === "row" ? "haim-table-insert-ghost-row" : "haim-table-insert-ghost-col"}`, style: { left: e.ghost.left, top: e.ghost.top, width: e.ghost.width, height: e.ghost.height } }, `ghost-${t}`), o.jsx("div", { "aria-hidden": true, className: "haim-table-insert-glow pointer-events-none absolute z-[11] rounded-full", style: { left: e.edge.left, top: e.edge.top, width: e.edge.width, height: e.edge.height } }, `glow-${t}`)] });
}
function cd({ kind: e, indices: t, table: n, wrap: r, colCount: i }) {
  const [s, l] = a.useState([]);
  return a.useEffect(() => {
    if (!n || !r || !t.length) {
      l([]);
      return;
    }
    const u = () => {
      const m = r.getBoundingClientRect(), p = n.getBoundingClientRect(), g = [];
      if (e === "row") for (const R of t) {
        const E = n.rows[R];
        if (!E) continue;
        const L = E.getBoundingClientRect();
        g.push({ left: p.left - m.left, top: L.top - m.top, width: p.width, height: Math.max(1, L.height) });
      }
      else {
        const R = ps(n, i);
        for (const E of t) {
          const L = R[E], C = R[E + 1];
          L == null || C == null || g.push({ left: L - m.left, top: p.top - m.top, width: Math.max(1, C - L), height: p.height });
        }
      }
      l(g);
    };
    return u(), window.addEventListener("resize", u), () => window.removeEventListener("resize", u);
  }, [i, t, e, n, r]), s.length ? o.jsx("div", { "data-haim-delete-preview": "", className: "pointer-events-none absolute inset-0 z-20", "aria-hidden": true, children: s.map((u, m) => o.jsx("div", { className: "absolute rounded-sm bg-red-500/25 ring-1 ring-inset ring-red-500/50 dark:bg-red-500/30 dark:ring-red-400/40", style: { left: u.left, top: u.top, width: u.width, height: u.height } }, `${e}-${t[m] ?? m}`)) }) : null;
}
function ud(e) {
  const t = [...e.rows];
  if (!t.length) return [];
  const n = [];
  for (let r = 0; r < t.length; r += 1) n.push(t[r].getBoundingClientRect().top);
  return n.push(t[t.length - 1].getBoundingClientRect().bottom), n;
}
function ps(e, t) {
  const n = e.getBoundingClientRect(), r = [];
  for (let l = 0; l < t; l += 1) {
    const u = e.querySelectorAll(`[data-edit-c="${l}"]`);
    let m = null;
    u.forEach((p) => {
      const g = p.getBoundingClientRect();
      (m == null || g.left < m) && (m = g.left);
    }), m != null ? r.push(m) : r.push(n.left + n.width * l / Math.max(t, 1));
  }
  let i = n.right;
  return e.querySelectorAll(`[data-edit-c="${t - 1}"]`).forEach((l) => {
    const u = l.getBoundingClientRect();
    u.right > i && (i = u.right);
  }), r.push(i), r;
}
function dd(e, t, n) {
  var _a2, _b;
  if (!n.length || typeof document > "u") return null;
  const i = (_b = (_a2 = document.elementFromPoint(e, t)) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "td[data-edit-r][data-edit-c]");
  if (!i) return null;
  const s = Number(i.getAttribute("data-edit-r")), l = Number(i.getAttribute("data-edit-c"));
  return !Number.isInteger(s) || !Number.isInteger(l) ? null : aa(n, s, l);
}
function ho(e, t, n) {
  return e === "col" ? n.colspan > 1 && n.c < t && t < n.c + n.colspan : n.rowspan > 1 && n.r < t && t < n.r + n.rowspan;
}
function $t(e, t, n, r, i, s, l) {
  const u = e.getBoundingClientRect(), m = t.getBoundingClientRect(), p = Yn + 2;
  if (n < u.left - p || n > u.right + p || r < u.top - p || r > u.bottom + p) return null;
  const g = ud(e), R = ps(e, s), E = dd(n, r, l);
  let L = null;
  for (let T = 0; T < g.length; T += 1) {
    if (E && ho("row", T, E)) continue;
    const O = g[T], B = Math.abs(r - O);
    B <= Yn && n >= u.left - p && n <= u.right + p && (!L || B < L.dist) && (L = { index: T, dist: B, y: O });
  }
  let C = null;
  for (let T = 0; T < R.length; T += 1) {
    if (E && ho("col", T, E)) continue;
    const O = R[T], B = Math.abs(n - O);
    B <= Yn && r >= u.top - p && r <= u.bottom + p && (!C || B < C.dist) && (C = { index: T, dist: B, x: O });
  }
  return L && C ? L.dist <= C.dist ? mo(L.index, L.y, n, u, m, i) : po(C.index, C.x, r, u, m, s) : L ? mo(L.index, L.y, n, u, m, i) : C ? po(C.index, C.x, r, u, m, s) : null;
}
function fd({ isOpen: e, initialMeta: t, initialGrid: n, onClose: r, onSave: i }) {
  var _a2, _b, _c2, _d2, _e, _f2;
  const [s, l] = a.useState(mn()), [u, m] = a.useState(n), [p, g] = a.useState(null), [R, E] = a.useState(false), [L, C] = a.useState("thead"), [T, O] = a.useState([]), [B, Y] = a.useState(false), [re, v] = a.useState(null), [I, G] = a.useState(null), [S, A] = a.useState(false), [z, Z] = a.useState(0), [oe, se] = a.useState(null), [le, ae] = a.useState(null), Ce = a.useRef(null), [Q, K] = a.useState(null), ee = Q !== null, ge = Wo(), [fe, Ue] = a.useState(ao), [Pe, Ke] = a.useState(ao), [Me, ne] = a.useState(false), [ue, Fe] = a.useState(false), [H, $] = a.useState(() => typeof window < "u" ? window.innerWidth : 1280), [J, q] = a.useState(() => typeof window < "u" ? window.matchMedia("(orientation: landscape)").matches : true), ye = a.useRef(null), ve = a.useRef(null), Ee = a.useRef(null), ze = a.useRef(null), me = a.useRef(false), xe = a.useRef(null), pe = a.useRef(null), He = a.useRef(false), Te = a.useRef(false), qe = a.useRef({ x: 0, y: 0 });
  ze.current = I, me.current = R, pe.current = p, He.current = Me, Te.current = ee, Ce.current = le;
  const Xe = a.useRef(t), be = a.useRef(n);
  Xe.current = t, be.current = n, a.useEffect(() => {
    if (!e) return;
    const c = Xe.current, d = be.current;
    l(c ? { ...c } : mn()), m({ rows: d.rows.map((b) => [...b]), aligns: [...d.aligns] }), g(null), E(false), xe.current = null, G(null), ne(false), Fe(false), K(null), ae(null), Z((b) => b + 1), Yi().then((b) => O(b.templates)), Gi().then((b) => Ji(b));
  }, [e]);
  const Ye = a.useCallback((c) => {
    l(c.meta), m({ rows: c.grid.rows.map((d) => [...d]), aligns: [...c.grid.aligns ?? []] }), g(null), E(false), xe.current = null, G(null);
  }, []), { undo: nt, redo: Le, canUndo: Qe, canRedo: dt, recordNow: it } = Ou({ enabled: e, historyKey: z, meta: s, grid: u, applySnapshot: Ye }), at = a.useRef(false);
  a.useEffect(() => {
    at.current && !S && it(), at.current = S;
  }, [S, it]), a.useEffect(() => {
    if (!e) return;
    const c = (d) => {
      if (!(d.metaKey || d.ctrlKey) || d.altKey) return;
      const j = d.key.toLowerCase(), k = j === "z" && !d.shiftKey, _ = j === "y" || j === "z" && d.shiftKey;
      !k && !_ || (d.preventDefault(), d.stopPropagation(), d.stopImmediatePropagation(), _ ? Le() : nt());
    };
    return window.addEventListener("keydown", c, true), () => window.removeEventListener("keydown", c, true);
  }, [e, Le, nt]), a.useEffect(() => {
    if (!e || typeof window > "u") return;
    const c = window.matchMedia("(orientation: landscape)"), d = () => {
      $(window.innerWidth), q(c.matches);
    };
    return d(), window.addEventListener("resize", d), c.addEventListener("change", d), () => {
      window.removeEventListener("resize", d), c.removeEventListener("change", d);
    };
  }, [e]);
  const je = a.useMemo(() => Zi(s.merges), [s.merges]), Ne = u.rows.length, N = Math.max(1, ...u.rows.map((c) => c.length), u.aligns.length), P = a.useMemo(() => {
    if (!p) return [];
    const c = [], d = Math.min(p.r0, p.r1), b = Math.min(p.c0, p.c1), j = Math.max(p.r0, p.r1), k = Math.max(p.c0, p.c1);
    for (let _ = d; _ <= j; _ += 1) for (let X = b; X <= k; X += 1) je.has(`${_},${X}`) || c.push({ r: _, c: X });
    return c;
  }, [p, je]), W = P[0] ?? null, Re = !!W, De = a.useRef(fe), Ie = a.useRef(Pe);
  De.current = fe, Ie.current = Pe;
  const Oe = a.useMemo(() => {
    const c = H * 0.95;
    return Math.max(fs, c - lo - It - Uu);
  }, [H]), Ae = a.useCallback((c) => {
    const d = De.current, b = Ie.current, j = d + b;
    let k = kt(d + c), _ = kt(j - k);
    k = kt(j - _), _ = kt(j - k), Ue(k), Ke(_);
  }, []), rt = a.useCallback((c) => {
    Ke((d) => {
      const b = kt(d + c);
      if (fe + It + b <= Oe) return b;
      const k = Oe - fe - It;
      return kt(k);
    });
  }, [Oe, fe]), ft = a.useMemo(() => {
    const c = H * 0.95;
    if (!J) return { width: c, maxWidth: "95dvw", height: "95dvh", maxHeight: "95dvh" };
    const d = fe + It + Pe;
    return { width: Math.min(c, lo + d + It + qu), maxWidth: "95dvw", height: "95dvh", maxHeight: "95dvh" };
  }, [Pe, J, fe, H]), Be = a.useMemo(() => W ? s.cells[Ze(W.r, W.c)] ?? {} : {}, [s.cells, W]), he = a.useCallback((c) => {
    P.length && l((d) => {
      const b = { ...d.cells };
      for (const { r: j, c: k } of P) {
        const _ = Ze(j, k);
        $r(c) ? delete b[_] : b[_] = c;
      }
      return { ...d, cells: b };
    });
  }, [P]), ce = a.useCallback((c) => {
    m(c.grid), l(c.meta), g(null), E(false), xe.current = null, G(null);
  }, []), Se = a.useRef(u), We = a.useRef(s);
  Se.current = u, We.current = s;
  const wt = a.useCallback((c) => {
    ce(mc(Se.current, We.current, c));
  }, [ce]), yt = a.useCallback((c) => {
    ce(pc(Se.current, We.current, c));
  }, [ce]), ot = a.useCallback((c) => {
    const d = pe.current;
    let b, j;
    if (d) b = Math.min(d.r0, d.r1), j = Math.max(d.r0, d.r1), c != null && (c < b || c > j) && (b = c, j = c);
    else if (c != null) b = c, j = c;
    else {
      const X = Ce.current;
      (X == null ? void 0 : X.kind) === "row" && X.indices.length && (ae(null), se({ kind: "row", indices: [...X.indices] }));
      return;
    }
    const k = [];
    for (let X = b; X <= j; X += 1) k.push(X);
    const _ = Se.current.rows.length;
    _ <= 1 || k.length === 0 || k.length >= _ || (ae(null), se({ kind: "row", indices: k }));
  }, []), Yt = a.useCallback((c) => {
    const d = pe.current;
    let b, j;
    if (d) b = Math.min(d.c0, d.c1), j = Math.max(d.c0, d.c1), c != null && (c < b || c > j) && (b = c, j = c);
    else if (c != null) b = c, j = c;
    else {
      const X = Ce.current;
      (X == null ? void 0 : X.kind) === "col" && X.indices.length && (ae(null), se({ kind: "col", indices: [...X.indices] }));
      return;
    }
    const k = [];
    for (let X = b; X <= j; X += 1) k.push(X);
    const _ = Math.max(1, ...Se.current.rows.map((X) => X.length), Se.current.aligns.length, 1);
    _ <= 1 || k.length === 0 || k.length >= _ || (ae(null), se({ kind: "col", indices: k }));
  }, []), Gt = a.useCallback((c) => {
    const d = pe.current;
    let b, j;
    d ? (b = Math.min(d.r0, d.r1), j = Math.max(d.r0, d.r1), (c < b || c > j) && (b = c, j = c)) : (b = c, j = c);
    const k = [];
    for (let X = b; X <= j; X += 1) k.push(X);
    const _ = Se.current.rows.length;
    if (_ <= 1 || k.length === 0 || k.length >= _) {
      ae(null);
      return;
    }
    ae({ kind: "row", indices: k });
  }, []), Jt = a.useCallback((c) => {
    const d = pe.current;
    let b, j;
    d ? (b = Math.min(d.c0, d.c1), j = Math.max(d.c0, d.c1), (c < b || c > j) && (b = c, j = c)) : (b = c, j = c);
    const k = [];
    for (let X = b; X <= j; X += 1) k.push(X);
    const _ = Math.max(1, ...Se.current.rows.map((X) => X.length), Se.current.aligns.length, 1);
    if (_ <= 1 || k.length === 0 || k.length >= _) {
      ae(null);
      return;
    }
    ae({ kind: "col", indices: k });
  }, []), lt = a.useCallback(() => {
    ae(null);
  }, []), Nn = a.useCallback(() => {
    oe && (oe.kind === "row" ? ce(xc(Se.current, We.current, oe.indices)) : ce(bc(Se.current, We.current, oe.indices)), se(null), ae(null));
  }, [ce, oe]), et = !!(p && !(p.r0 === p.r1 && p.c0 === p.c1)), vt = a.useCallback(() => {
    !p || p.r0 === p.r1 && p.c0 === p.c1 || l((c) => ({ ...c, merges: Qi(c.merges, p.r0, p.c0, p.r1, p.c1) }));
  }, [p]), Lt = a.useCallback(() => {
    p && l((c) => ({ ...c, merges: ea(c.merges, p.r0, p.c0, p.r1, p.c1) }));
  }, [p]), Zt = a.useCallback((c) => {
    P.length && l((d) => {
      var _a3;
      const b = { ...d.cells }, j = (_a3 = d.style) == null ? void 0 : _a3.fontSize;
      for (const { r: k, c: _ } of P) {
        const X = Ze(k, _), we = b[X] ?? {};
        b[X] = { ...we, fontSize: rd(we.fontSize ?? j, c) };
      }
      return { ...d, cells: b };
    });
  }, [P]);
  a.useEffect(() => {
    if (!e) return;
    const c = (d) => {
      if (!(!(d.metaKey || d.ctrlKey) || d.altKey)) {
        if (d.shiftKey) {
          const b = d.code === "Period" || d.key === ">" || d.key === ".", j = d.code === "Comma" || d.key === "<" || d.key === ",";
          if (b || j) {
            if (!P.length) return;
            d.preventDefault(), d.stopPropagation(), Zt(b ? 1 : -1);
            return;
          }
        }
        d.code !== "KeyE" && d.key.toLowerCase() !== "e" || (d.preventDefault(), d.stopPropagation(), d.shiftKey ? Lt() : vt());
      }
    };
    return window.addEventListener("keydown", c, true), () => window.removeEventListener("keydown", c, true);
  }, [e, vt, Zt, P.length, Lt]);
  const jn = a.useCallback((c) => {
    var _a3, _b2;
    if (Te.current) {
      G(null);
      return;
    }
    if (R || S) {
      R && G(null);
      return;
    }
    if ((_b2 = (_a3 = c.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-add], [data-haim-edge-hit]")) return;
    const d = Ee.current, b = ve.current;
    if (!d || !b) return;
    const j = $t(d, b, c.clientX, c.clientY, Ne, N, s.merges);
    G((k) => j ? k && k.kind === j.kind && k.index === j.index ? k.x === j.x && k.y === j.y ? k : { ...k, x: j.x, y: j.y } : j : null);
  }, [N, S, s.merges, R, Ne]), mt = a.useCallback((c, d) => {
    var _a3, _b2;
    if (d.index === 0 || Te.current) return;
    c.preventDefault(), c.stopPropagation();
    const b = Ee.current;
    if (!b) return;
    const j = d.index - 1;
    let k = 0, _ = 0;
    if (d.kind === "col") {
      const V = (_a3 = b.querySelector(`[data-edit-c="${j}"]`)) == null ? void 0 : _a3.getBoundingClientRect();
      if (!V) return;
      k = V.left;
    } else {
      const V = (_b2 = b.rows[j]) == null ? void 0 : _b2.getBoundingClientRect();
      if (!V) return;
      _ = V.top;
    }
    A(true), E(false), G(null);
    const X = (st) => {
      let V = 24;
      d.kind === "col" ? V = st.clientX - k : V = st.clientY - _, V = Math.max(24, Math.round(V)), l((_e2) => d.kind === "col" ? { ..._e2, colWidths: _r(_e2.colWidths, j, V) } : { ..._e2, rowHeights: _r(_e2.rowHeights, j, V) });
    }, we = () => {
      document.removeEventListener("pointermove", X, true), document.removeEventListener("pointerup", we, true), document.removeEventListener("pointercancel", we, true), A(false);
    };
    document.addEventListener("pointermove", X, true), document.addEventListener("pointerup", we, true), document.addEventListener("pointercancel", we, true);
  }, []), pt = a.useCallback((c, d, b) => {
    m((j) => {
      const k = Math.max(1, ...j.rows.map((we) => we.length), j.aligns.length), _ = j.rows.map((we) => [...we]);
      for (; _.length <= c; ) _.push(Array(k).fill(""));
      const X = [..._[c] ?? Array(k).fill("")];
      for (; X.length < k; ) X.push("");
      return X[d] = b, _[c] = X, { ...j, rows: _ };
    });
  }, []), Qt = a.useCallback((c, d) => {
    const b = Ee.current;
    if (!b) return;
    const j = b.querySelector(`td[data-edit-r="${c}"][data-edit-c="${d}"] input`);
    j && (g({ r0: c, c0: d, r1: c, c1: d }), xe.current = { r: c, c: d }, E(false), G(null), requestAnimationFrame(() => {
      j.focus(), j.select();
    }));
  }, []), tt = a.useCallback((c, d) => {
    g({ r0: c, c0: d, r1: c, c1: d }), xe.current = { r: c, c: d }, E(false), G(null);
  }, []), en = a.useCallback(() => {
    var _a3;
    g(null), E(false), xe.current = null;
    const c = document.activeElement;
    ((_a3 = c == null ? void 0 : c.closest) == null ? void 0 : _a3.call(c, "td[data-edit-r]")) && c.blur();
  }, []), tn = a.useCallback((c, d) => {
    const b = xe.current;
    if (!b) {
      tt(c, d);
      return;
    }
    g({ r0: b.r, c0: b.c, r1: c, c1: d }), E(false), G(null);
  }, [tt]), Rt = a.useCallback((c, d) => {
    var _a3;
    g({ r0: c, c0: d, r1: c, c1: d }), xe.current = { r: c, c: d }, E(true), G(null);
    const b = document.activeElement;
    ((_a3 = b == null ? void 0 : b.closest) == null ? void 0 : _a3.call(b, "td[data-edit-r]")) && b.blur();
  }, []), f = a.useCallback((c, d) => {
    me.current && g((b) => b && { ...b, r1: c, c1: d });
  }, []);
  a.useEffect(() => {
    if (!R) return;
    const c = () => E(false);
    return window.addEventListener("mouseup", c, true), window.addEventListener("pointerup", c, true), () => {
      window.removeEventListener("mouseup", c, true), window.removeEventListener("pointerup", c, true);
    };
  }, [R]), a.useEffect(() => {
    if (!e) return;
    const c = (k) => {
      var _a3, _b2, _c3;
      const _ = k;
      if (!_) return false;
      const X = ((_b2 = (_a3 = _.tagName) == null ? void 0 : _a3.toLowerCase) == null ? void 0 : _b2.call(_a3)) ?? "";
      return X === "input" || X === "textarea" || X === "select" || _.isContentEditable ? true : !!((_c3 = _.closest) == null ? void 0 : _c3.call(_, 'input, textarea, select, [contenteditable="true"]'));
    }, d = (k) => {
      k.code !== "Space" && k.key !== " " || k.repeat || c(k.target) || pe.current || (k.preventDefault(), ne(true));
    }, b = (k) => {
      k.code !== "Space" && k.key !== " " || ne(false);
    }, j = () => ne(false);
    return window.addEventListener("keydown", d, true), window.addEventListener("keyup", b, true), window.addEventListener("blur", j), () => {
      window.removeEventListener("keydown", d, true), window.removeEventListener("keyup", b, true), window.removeEventListener("blur", j), ne(false);
    };
  }, [e]), a.useEffect(() => {
    p && ne(false);
  }, [p]);
  const h = a.useCallback(() => {
    Fe(false);
  }, []), x = a.useCallback((c) => {
    const d = ye.current;
    if (!d) return;
    const b = c.button === 1, j = c.button === 0 && Me && !pe.current;
    if (b || j) {
      c.preventDefault(), c.stopPropagation(), G(null), qe.current = { x: c.clientX, y: c.clientY }, Fe(true), d.setPointerCapture(c.pointerId);
      return;
    }
  }, [Me]), w = a.useCallback((c) => {
    if (!ue) return;
    const d = ye.current;
    if (!d) return;
    const b = c.clientX - qe.current.x, j = c.clientY - qe.current.y;
    qe.current = { x: c.clientX, y: c.clientY }, d.scrollLeft -= b, d.scrollTop -= j;
  }, [ue]), y = a.useCallback((c) => {
    if (!ue) return;
    const d = ye.current;
    (d == null ? void 0 : d.hasPointerCapture(c.pointerId)) && d.releasePointerCapture(c.pointerId), h();
  }, [h, ue]), D = a.useCallback((c) => {
    if (c.button !== 0 || Me || ue) return;
    const d = c.target;
    d && (d.closest("[data-haim-table-sidebars]") || d.closest("[data-haim-table-canvas] table, [data-haim-edge-hit], [data-haim-edge-add], [data-haim-insert-preview]") || pe.current && en());
  }, [en, ue, Me]), M = a.useCallback((c, d, b, j) => {
    let k = c + b, _ = d + j;
    for (; k >= 0 && k < Ne && _ >= 0 && _ < N; ) {
      if (!je.has(`${k},${_}`)) {
        Qt(k, _);
        return;
      }
      k += b, _ += j;
    }
  }, [N, je, Qt, Ne]), F = a.useCallback((c, d, b) => {
    if (c.nativeEvent.isComposing) return;
    if (c.key === "Enter") {
      c.preventDefault(), c.stopPropagation(), c.shiftKey ? M(d, b, -1, 0) : M(d, b, 1, 0);
      return;
    }
    if (!c.altKey) return;
    let j = 0, k = 0;
    if (c.key === "ArrowUp") j = -1;
    else if (c.key === "ArrowDown") j = 1;
    else if (c.key === "ArrowLeft") k = -1;
    else if (c.key === "ArrowRight") k = 1;
    else return;
    c.preventDefault(), c.stopPropagation(), M(d, b, j, k);
  }, [M]), U = a.useMemo(() => {
    var _a3;
    return W ? ((_a3 = u.rows[W.r]) == null ? void 0 : _a3[W.c]) ?? "" : "";
  }, [u.rows, W]), te = a.useMemo(() => s.templateId ? T.find((c) => c.id === s.templateId) ?? null : null, [s.templateId, T]), ke = a.useCallback((c, d) => {
    const b = ta({ row: c, col: d, rowCount: Ne, colCount: N, meta: s, template: te }), j = {};
    return b.bg && (j.backgroundColor = b.bg), b.color && (j.color = b.color), b.fontFamily && (j.fontFamily = b.fontFamily), b.fontSize && (j.fontSize = b.fontSize), b.fontWeight && (j.fontWeight = b.fontWeight), j;
  }, [te, N, s, Ne]), ie = (c, d) => {
    if (!p) return false;
    const b = Math.min(p.r0, p.r1), j = Math.min(p.c0, p.c1), k = Math.max(p.r0, p.r1), _ = Math.max(p.c0, p.c1);
    return c >= b && c <= k && d >= j && d <= _;
  }, $e = (c) => c === "thead" ? o.jsx(Bn, { className: de, "aria-hidden": true }) : c === "tfoot" ? o.jsx(Kr, { className: de, "aria-hidden": true }) : o.jsx(zr, { className: de, "aria-hidden": true });
  return o.jsxs(o.Fragment, { children: [o.jsxs(Ut, { isOpen: e, onClose: () => {
    if (oe !== null) {
      se(null);
      return;
    }
    r();
  }, overlayClassName: "p-[2.5dvh]", contentClassName: "h-[95dvh] max-h-[95dvh] max-w-[95dvw]", contentStyle: ft, resizeHeight: true, children: [o.jsxs(Ol, { className: "flex h-full min-h-0 flex-col", onSubmit: (c) => c.preventDefault(), onPointerDownCapture: D, children: [o.jsxs("header", { className: "flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-3 py-2 dark:border-odp-border", children: [o.jsxs("h2", { className: "inline-flex items-center gap-1.5 text-sm font-bold text-gray-800 dark:text-odp-fgStrong", children: [o.jsx(hn, { className: Vu, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1"] }), o.jsxs("div", { className: "flex items-center gap-2", children: [o.jsxs("button", { type: "button", disabled: !Qe, title: `\uC2E4\uD589 \uCDE8\uC18C (${Jn})`, "aria-label": `\uC2E4\uD589 \uCDE8\uC18C (${Jn})`, onClick: () => nt(), className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(wl, { className: de, "aria-hidden": true }), "\uC2E4\uD589 \uCDE8\uC18C"] }), o.jsxs("button", { type: "button", disabled: !dt, title: `\uB2E4\uC2DC \uC2E4\uD589 (${Zn})`, "aria-label": `\uB2E4\uC2DC \uC2E4\uD589 (${Zn})`, onClick: () => Le(), className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(yl, { className: de, "aria-hidden": true }), "\uB2E4\uC2DC \uC2E4\uD589"] }), o.jsxs("button", { type: "button", onClick: r, className: "inline-flex items-center gap-1 rounded px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(qt, { className: de, "aria-hidden": true }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: () => i(s, u), className: "inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700", children: [o.jsx(yn, { className: de, "aria-hidden": true }), "\uC801\uC6A9"] })] })] }), o.jsxs("div", { className: "flex min-h-0 flex-1 flex-col landscape:flex-row", children: [o.jsxs("div", { "data-haim-table-sidebars": "", className: "order-2 flex max-h-[42%] min-h-0 w-full shrink-0 flex-col gap-2 overflow-hidden border-t border-gray-100 bg-gray-50/80 p-2 dark:border-odp-border dark:bg-odp-bgSoft/40 portrait:max-h-[42%] landscape:order-1 landscape:max-h-none landscape:w-auto landscape:flex-row landscape:gap-0 landscape:border-t-0 landscape:border-r-0", children: [o.jsxs("aside", { className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-surface landscape:flex-none landscape:shrink-0", style: J ? { width: fe } : void 0, children: [o.jsx("div", { className: "sticky top-0 z-[1] border-b border-gray-100 bg-white px-2.5 py-1.5 dark:border-odp-border dark:bg-odp-surface", children: o.jsxs("h3", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong", children: [o.jsx(hn, { className: de, "aria-hidden": true }), "\uD45C \xB7 \uADF8\uB8F9"] }) }), o.jsxs("div", { className: "space-y-2 p-2.5", children: [o.jsxs("div", { className: "flex flex-wrap gap-2", children: [o.jsxs(ut, { name: "template", className: "flex min-w-0 flex-1 flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ht, { asChild: true, children: o.jsx("span", { children: o.jsx(gt, { icon: o.jsx(Vr, { className: de }), children: "\uD15C\uD50C\uB9BF" }) }) }), o.jsx(Pn, { "aria-label": "\uD45C \uD15C\uD50C\uB9BF", value: s.templateId ?? Gn, onValueChange: (c) => {
    if (c === Gn) {
      l((b) => {
        const j = { ...b };
        return delete j.templateId, j;
      });
      return;
    }
    const d = T.find((b) => b.id === c);
    d && l((b) => na(b, d));
  }, options: [{ value: Gn, label: "\uD15C\uD50C\uB9BF \uC5C6\uC74C" }, ...T.map((c) => ({ value: c.id, label: c.name }))], className: "w-full min-w-0" })] }), o.jsxs("button", { type: "button", className: "mt-auto inline-flex h-8 items-center gap-1 self-end rounded-md bg-gray-100 px-2 text-[11px] dark:bg-odp-bgSoft", onClick: () => {
    v({ id: `template-${Date.now().toString(36)}`, name: "\uC0C8 \uD15C\uD50C\uB9BF", sections: {}, rules: [] }), Y(true);
  }, children: [o.jsx(Vr, { className: de, "aria-hidden": true }), "\uAD00\uB9AC"] })] }), o.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [o.jsxs(ut, { name: "noHeader", className: "col-span-2 flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ht, { asChild: true, children: o.jsx("span", { children: o.jsx(gt, { icon: o.jsx(Bn, { className: de }), children: "noHeader" }) }) }), o.jsxs("label", { className: "flex cursor-pointer items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-2 py-1.5 dark:border-odp-borderSoft dark:bg-odp-surface", children: [o.jsx("span", { className: "min-w-0 text-[11px] leading-snug text-gray-600 dark:text-odp-muted", children: "thead/th \uC5C6\uC774 \uBAA8\uB450 tbody/td" }), o.jsx(gr, { className: Ku(!!s.noHeader), checked: !!s.noHeader, onCheckedChange: (c) => l((d) => {
    if (c) return { ...d, noHeader: true };
    const { noHeader: b, ...j } = d;
    return j;
  }), "aria-label": "noHeader", children: o.jsx(xr, { className: zu }) })] })] }), o.jsxs(ut, { name: "headerRows", className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${s.noHeader ? "opacity-40" : ""}`, children: [o.jsx(ht, { asChild: true, children: o.jsx("span", { children: o.jsx(gt, { icon: o.jsx(Bn, { className: de }), children: "headerRows" }) }) }), o.jsx(rn, { asChild: true, children: o.jsx("input", { type: "number", min: 0, max: Ne, value: s.headerRows, disabled: !!s.noHeader, onChange: (c) => l((d) => ({ ...d, headerRows: Math.max(0, Number(c.target.value) || 0) })), className: Dn }) })] }), o.jsxs(ut, { name: "footerRows", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ht, { asChild: true, children: o.jsx("span", { children: o.jsx(gt, { icon: o.jsx(Kr, { className: de }), children: "footerRows" }) }) }), o.jsx(rn, { asChild: true, children: o.jsx("input", { type: "number", min: 0, max: Ne, value: s.footerRows, onChange: (c) => l((d) => ({ ...d, footerRows: Math.max(0, Number(c.target.value) || 0) })), className: Dn }) })] }), o.jsxs(ut, { name: "width", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ht, { asChild: true, children: o.jsx("span", { children: o.jsx(gt, { icon: o.jsx(vl, { className: de }), children: "\uB108\uBE44" }) }) }), o.jsx(Pn, { "aria-label": "\uD45C \uB108\uBE44", value: s.width, onValueChange: (c) => l((d) => ({ ...d, width: c === "fit" ? "fit" : "full" })), options: [...Xu], className: "w-full" })] }), o.jsxs(ut, { name: "align", className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${s.width !== "fit" ? "opacity-40" : ""}`, children: [o.jsx(ht, { asChild: true, children: o.jsx("span", { children: o.jsx(gt, { icon: s.align === "right" ? o.jsx(kl, { className: de }) : o.jsx(El, { className: de }), children: "\uC815\uB82C" }) }) }), o.jsx(Pn, { "aria-label": "\uD45C \uC815\uB82C", value: s.align, disabled: s.width !== "fit", onValueChange: (c) => l((d) => ({ ...d, align: c === "right" ? "right" : "left" })), options: [...Yu], className: "w-full" })] })] }), o.jsxs("div", { className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border", children: [o.jsx("p", { className: "text-[10px] font-medium text-gray-600 dark:text-odp-muted", children: "\uD45C \uAE30\uBCF8 \uD3F0\uD2B8\xB7\uC2A4\uD0C0\uC77C" }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: "\uC140\xB7\uADF8\uB8F9 \uAC12\uC774 \uC788\uC73C\uBA74 \uADF8\uCABD\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4." }), o.jsx(zn, { compact: true, idPrefix: "table-edit-table", value: s.style ?? {}, onChange: (c) => l((d) => ({ ...d, style: $r(c) ? {} : c })) })] }), o.jsxs("div", { className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border", children: [o.jsxs("p", { className: "inline-flex items-center gap-1 text-[10px] font-medium text-gray-600 dark:text-odp-muted", children: [o.jsx(zr, { className: de, "aria-hidden": true }), "\uADF8\uB8F9 \uC2A4\uD0C0\uC77C"] }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: "thead / tbody / tfoot \uAD6C\uC5ED" }), o.jsx("div", { className: "mb-1 flex flex-wrap gap-1", children: Bu.map((c) => o.jsxs("button", { type: "button", onClick: () => C(c), className: `inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] ${L === c ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-odp-bgSoft"}`, children: [$e(c), c] }, c)) }), o.jsx(zn, { compact: true, idPrefix: `table-edit-${L}`, value: s.sections[L] ?? {}, onChange: (c) => l((d) => ({ ...d, sections: { ...d.sections, [L]: c } })) })] })] })] }), o.jsx(uo, { ariaLabel: "\uD45C \uC0AC\uC774\uB4DC\uBC14\uC640 \uC140 \uC0AC\uC774\uB4DC\uBC14 \uC0AC\uC774 \uB108\uBE44 \uC870\uC808", onDelta: Ae }), o.jsx("aside", { "aria-hidden": !Re, className: `flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-blue-200 bg-white dark:border-blue-900/50 dark:bg-odp-surface landscape:flex-none landscape:shrink-0 ${Re ? "" : "pointer-events-none portrait:hidden landscape:invisible"}`, style: J ? { width: Pe } : void 0, children: W ? o.jsxs(o.Fragment, { children: [o.jsx("div", { className: "sticky top-0 z-[1] border-b border-blue-100 bg-white px-2.5 py-1.5 dark:border-blue-900/40 dark:bg-odp-surface", children: o.jsxs("h3", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong", children: [o.jsx(Sl, { className: de, "aria-hidden": true }), "\uC140", o.jsxs("span", { className: "font-normal text-gray-400 dark:text-odp-muted", children: ["(", W.r + 1, "\uD589 ", W.c + 1, "\uC5F4", P.length > 1 ? ` \xB7 ${P.length}\uCE78` : "", ")"] })] }) }), o.jsxs("div", { className: "space-y-2 p-2.5", children: [o.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [o.jsxs("button", { type: "button", disabled: !et, title: `\uBCD1\uD569 (${Zu})`, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft", onClick: vt, children: [o.jsx(Cl, { className: de, "aria-hidden": true }), "\uBCD1\uD569"] }), o.jsxs("button", { type: "button", disabled: !p, title: `\uBCD1\uD569 \uD574\uC81C (${Qu})`, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft", onClick: Lt, children: [o.jsx(Nl, { className: de, "aria-hidden": true }), "\uBCD1\uD569 \uD574\uC81C"] })] }), o.jsxs("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: ["\uAE00\uC790 \uD06C\uAE30: ", ed, " / ", td] }), o.jsxs(ut, { name: "cell-text", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ht, { asChild: true, children: o.jsx("span", { children: o.jsx(gt, { icon: o.jsx(Jo, { className: de }), children: "\uC140 \uD14D\uC2A4\uD2B8" }) }) }), o.jsx(rn, { asChild: true, children: o.jsx("input", { type: "text", value: U, onChange: (c) => pt(W.r, W.c, c.target.value), placeholder: "\uC140 \uB0B4\uC6A9 \uC785\uB825", className: ra }) })] }), o.jsx(zn, { compact: true, idPrefix: "table-edit-cell", value: Be, onChange: he })] })] }) : null }), o.jsx(uo, { ariaLabel: "\uC0AC\uC774\uB4DC\uBC14\uC640 \uD45C \uC0AC\uC774 \uB108\uBE44 \uC870\uC808", onDelta: rt })] }), o.jsxs("div", { ref: ye, "data-haim-table-canvas": "", className: `order-1 flex min-h-0 min-w-0 flex-1 flex-col overflow-auto border-t border-gray-100 p-3 landscape:order-2 landscape:border-t-0 landscape:border-l dark:border-odp-border ${ue ? "cursor-grabbing select-none" : Me && !p ? "cursor-grab select-none" : ""}`, onMouseLeave: () => {
    S || G(null);
  }, onPointerDown: x, onPointerMove: w, onPointerUp: y, onPointerCancel: y, onAuxClick: (c) => {
    c.button === 1 && c.preventDefault();
  }, children: [o.jsxs("p", { className: "mb-2 inline-flex shrink-0 items-center gap-1 text-[10px] text-gray-400", children: [o.jsx(jl, { className: de, "aria-hidden": true }), "\uB354\uBE14\uD074\uB9AD \uB4DC\uB798\uADF8\xB7Shift+\uD074\uB9AD: \uBC94\uC704 \uC120\uD0DD \xB7 \uC6B0\uD074\uB9AD: \uD589/\uC5F4 \uC0AD\uC81C \xB7 \uD720\uD074\uB9AD/\uC2A4\uD398\uC774\uC2A4+\uB4DC\uB798\uADF8: \uD328\uB2DD \xB7 ", Jn, "/", Zn, ": \uC2E4\uD589 \uCDE8\uC18C/\uB2E4\uC2DC \uC2E4\uD589 \xB7 \uD14C\uB450\uB9AC \uB354\uBE14\uD074\uB9AD: \uD589\xB7\uC5F4 \uCD94\uAC00"] }), o.jsx("div", { ref: ve, className: "relative inline-block min-w-full p-5", "data-haim-inserting": (I == null ? void 0 : I.kind) ?? void 0, onMouseMove: jn, onMouseLeave: () => {
    S || G(null);
  }, children: o.jsxs(Zo, { delayDuration: 0, skipDelayDuration: 0, children: [o.jsxs("table", { ref: Ee, className: `border-collapse text-sm ${((_a2 = s.colWidths) == null ? void 0 : _a2.some((c) => c && c.trim())) ? "w-max max-w-full" : "w-full"}`, style: { tableLayout: ((_b = s.colWidths) == null ? void 0 : _b.some((c) => c && c.trim())) || ((_c2 = s.rowHeights) == null ? void 0 : _c2.some((c) => c && c.trim())) ? "fixed" : void 0, ...((_d2 = s.style) == null ? void 0 : _d2.fontFamily) ? { fontFamily: s.style.fontFamily } : {}, ...((_e = s.style) == null ? void 0 : _e.fontSize) ? { fontSize: s.style.fontSize } : {}, ...((_f2 = s.style) == null ? void 0 : _f2.fontWeight) ? { fontWeight: s.style.fontWeight } : {} }, children: [o.jsx("colgroup", { children: Array.from({ length: N }, (c, d) => {
    const b = In(s.colWidths, d);
    return o.jsx("col", { style: b ? { width: b } : void 0 }, d);
  }) }), o.jsx("tbody", { children: u.rows.map((c, d) => {
    const b = In(s.rowHeights, d);
    return o.jsx("tr", { style: b ? { height: b } : void 0, children: Array.from({ length: N }, (j, k) => {
      if (je.has(`${d},${k}`)) return null;
      const _ = oa(s.merges, d, k), X = ie(d, k), we = In(s.colWidths, k), st = o.jsx("td", { "data-edit-r": d, "data-edit-c": k, colSpan: _ == null ? void 0 : _.colspan, rowSpan: _ == null ? void 0 : _.rowspan, className: `min-h-11 cursor-pointer border-2 border-gray-300 p-0 transition-[box-shadow,outline-color] dark:border-odp-borderStrong ${we ? "" : "min-w-28"} ${X ? "relative z-[1] outline outline-2 outline-offset-[-2px] outline-blue-500 ring-0" : "hover:relative hover:z-[1] hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-blue-400/70"}`, onContextMenu: () => {
        ie(d, k) || tt(d, k), ge && (K({ r: d, c: k }), G(null));
      }, onMouseDown: (V) => {
        var _a3, _b2;
        if (V.button === 1 || V.button !== 0 || Te.current || He.current && !pe.current) return;
        if ((_b2 = (_a3 = V.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-hit], [data-haim-edge-add]")) {
          V.preventDefault();
          return;
        }
        {
          const Ge = Ee.current, At = ve.current;
          if (Ge && At && $t(Ge, At, V.clientX, V.clientY, Ne, N, s.merges)) {
            V.preventDefault();
            return;
          }
        }
        if (V.shiftKey) {
          V.preventDefault(), tn(d, k);
          return;
        }
        if (V.detail >= 2) {
          V.preventDefault(), Rt(d, k);
          return;
        }
        tt(d, k);
      }, onDoubleClick: (V) => {
        const _e2 = Ee.current, Ge = ve.current;
        if (_e2 && Ge && $t(_e2, Ge, V.clientX, V.clientY, Ne, N, s.merges)) {
          V.preventDefault(), V.stopPropagation();
          return;
        }
        V.preventDefault(), Rt(d, k);
      }, onMouseEnter: () => {
        f(d, k);
      }, children: o.jsx(ut, { name: `cell-${d}-${k}`, className: "contents", children: o.jsx(rn, { asChild: true, children: o.jsx("input", { type: "text", value: c[k] ?? "", onChange: (V) => pt(d, k, V.target.value), onKeyDown: (V) => F(V, d, k), onMouseDown: (V) => {
        var _a3, _b2;
        if (V.button !== 1 && V.button === 0 && !Te.current && !(He.current && !pe.current)) {
          if ((_b2 = (_a3 = V.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-hit], [data-haim-edge-add]")) {
            V.preventDefault(), V.stopPropagation();
            return;
          }
          {
            const _e2 = Ee.current, Ge = ve.current;
            if (_e2 && Ge && $t(_e2, Ge, V.clientX, V.clientY, Ne, N, s.merges)) {
              V.preventDefault(), V.stopPropagation();
              return;
            }
          }
          if (V.shiftKey) {
            V.preventDefault(), V.stopPropagation(), tn(d, k);
            return;
          }
          if (V.detail >= 2) {
            V.preventDefault();
            return;
          }
          V.stopPropagation();
        }
      }, onDoubleClick: (V) => {
        const _e2 = Ee.current, Ge = ve.current;
        if (_e2 && Ge && $t(_e2, Ge, V.clientX, V.clientY, Ne, N, s.merges)) {
          V.preventDefault(), V.stopPropagation();
          return;
        }
        V.preventDefault(), V.stopPropagation(), Rt(d, k);
      }, onFocus: () => {
        me.current || He.current && !pe.current || tt(d, k);
      }, className: `${Dn} h-full min-h-11 w-full cursor-pointer border-transparent bg-transparent px-2 text-sm focus:cursor-text focus:border-gray-300 focus:bg-white/90 dark:focus:bg-odp-bgSoft/90 ${we ? "" : "min-w-28"}`, style: { ...ke(d, k), ...b ? { height: b } : {} } }) }) }) }, k);
      return ge ? st : o.jsxs(Bl, { onOpenChange: (V) => {
        K(V ? { r: d, c: k } : null), V ? G(null) : lt();
      }, children: [o.jsx(Vl, { asChild: true, children: st }), o.jsx(Kl, { children: o.jsxs(zl, { className: Ju, onCloseAutoFocus: (V) => V.preventDefault(), children: [o.jsxs(Wr, { className: co, disabled: Ne <= 1, onPointerEnter: () => Gt(d), onPointerLeave: lt, onFocus: () => Gt(d), onBlur: lt, onSelect: () => {
        ot(d);
      }, children: [o.jsx(St, { className: de, "aria-hidden": true }), "\uD589 \uC0AD\uC81C"] }), o.jsxs(Wr, { className: co, disabled: N <= 1, onPointerEnter: () => Jt(k), onPointerLeave: lt, onFocus: () => Jt(k), onBlur: lt, onSelect: () => {
        Yt(k);
      }, children: [o.jsx(St, { className: de, "aria-hidden": true }), "\uC5F4 \uC0AD\uC81C"] })] }) })] }, k);
    }) }, d);
  }) })] }), le ? o.jsx(cd, { kind: le.kind, indices: le.indices, table: Ee.current, wrap: ve.current, colCount: N }) : null, ge && Q ? o.jsxs(Uo, { open: ee, onOpenChange: (c) => {
    c || (K(null), lt());
  }, title: `${Q.r + 1}\uD589 ${Q.c + 1}\uC5F4`, subtitle: "\uD45C \uD3B8\uC9D1 \uC140", children: [o.jsxs("button", { type: "button", className: nr, disabled: Ne <= 1, onClick: () => {
    ot(Q.r), K(null);
  }, children: [o.jsx(St, { className: de, "aria-hidden": true }), "\uD589 \uC0AD\uC81C"] }), o.jsxs("button", { type: "button", className: nr, disabled: N <= 1, onClick: () => {
    Yt(Q.c), K(null);
  }, children: [o.jsx(St, { className: de, "aria-hidden": true }), "\uC5F4 \uC0AD\uC81C"] })] }) : null, I && !ee ? o.jsxs(o.Fragment, { children: [o.jsx(ld, { insert: I }, `preview-${I.kind}-${I.index}`), o.jsx(ad, { insert: I, allowResize: I.index !== 0, tip: I.index === 0 ? I.label : `${I.label} \xB7 ${fo(I.kind)}`, onDoubleClickInsert: () => {
    const { kind: c, index: d } = I;
    c === "row" ? wt(d) : yt(d);
  }, onResizePointerDown: (c) => mt(c, I) }, `hit-${I.kind}-${I.index}`), o.jsx(id, { tip: I.index === 0 ? I.label : `${I.label} \xB7 ${fo(I.kind)}`, onDoubleClick: () => {
    const { kind: c, index: d } = I;
    c === "row" ? wt(d) : yt(d);
  }, style: { left: I.x, top: I.y } }, `btn-${I.kind}-${I.index}`)] }) : null] }) })] })] })] }), o.jsx(tc, { isOpen: B, template: re, onClose: () => {
    Y(false), v(null);
  }, onSave: (c) => {
    const b = [...ia().templates.filter((j) => j.id !== (re == null ? void 0 : re.id) && j.id !== c.id), c];
    sa({ templates: b }).then((j) => {
      O(j.templates), Y(false), v(null);
    });
  } })] }), typeof document < "u" ? $o.createPortal(o.jsx("div", { className: "relative z-[100060]", children: o.jsx(pn, { isOpen: oe !== null, variant: "danger", title: (oe == null ? void 0 : oe.kind) === "col" ? "\uC5F4 \uC0AD\uC81C" : "\uD589 \uC0AD\uC81C", message: (oe == null ? void 0 : oe.kind) === "col" ? oe.indices.length > 1 ? `\uC120\uD0DD\uD55C ${oe.indices.length}\uAC1C \uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(oe.indices[0] ?? 0) + 1}\uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : oe ? oe.indices.length > 1 ? `\uC120\uD0DD\uD55C ${oe.indices.length}\uAC1C \uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(oe.indices[0] ?? 0) + 1}\uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : "", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", onConfirm: Nn, onCancel: () => se(null) }) }), document.body) : null] });
}
const md = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", go = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-800 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-surface", xo = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", sn = "h-3.5 w-3.5 shrink-0";
function pd({ containerRef: e, getMarkdown: t, setMarkdown: n, onEditTable: r, onEditFailed: i }) {
  const s = Wo(), [l, u] = a.useState(false), [m, p] = a.useState(null), [g, R] = a.useState(null), E = a.useRef(null);
  E.current = m;
  const L = a.useCallback((v) => {
    p(v), u(true);
  }, []);
  a.useEffect(() => {
    const v = e.current;
    if (!v) return;
    const I = () => v.querySelector(".md-editor-preview"), G = (Q) => {
      var _a2, _b, _c2, _d2;
      if ((_b = (_a2 = Q.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const K = I(), ee = (_d2 = (_c2 = Q.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "table");
      !(ee instanceof HTMLTableElement) || !(K == null ? void 0 : K.contains(ee)) || (Q.preventDefault(), Q.stopPropagation(), L({ table: ee, previewRoot: K, x: Q.clientX, y: Q.clientY }));
    };
    let S = null, A = null, z = false, Z = null;
    const oe = () => {
      S && clearTimeout(S), S = null, A = null, Z = null;
    }, se = (Q) => {
      var _a2, _b;
      if (Q.pointerType === "mouse") return;
      const K = I();
      if (!K) return;
      const ee = (_b = (_a2 = Q.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "table");
      !(ee instanceof HTMLTableElement) || !K.contains(ee) || (oe(), z = false, Z = ee, A = { x: Q.clientX, y: Q.clientY }, S = setTimeout(() => {
        z = true, la();
        const ge = I();
        Z && ge && L({ table: Z, previewRoot: ge, x: (A == null ? void 0 : A.x) ?? Q.clientX, y: (A == null ? void 0 : A.y) ?? Q.clientY });
      }, ca));
    }, le = (Q) => {
      if (!A) return;
      const K = Q.clientX - A.x, ee = Q.clientY - A.y;
      K * K + ee * ee > 100 && oe();
    }, ae = (Q) => {
      z && (Q.preventDefault(), Q.stopPropagation()), oe(), z = false;
    }, Ce = (Q) => {
      var _a2, _b;
      const K = I(), ee = (_b = (_a2 = Q.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "table");
      ee && (K == null ? void 0 : K.contains(ee)) && window.matchMedia("(pointer: coarse)").matches && Q.preventDefault();
    };
    return v.addEventListener("contextmenu", G, true), v.addEventListener("pointerdown", se), v.addEventListener("pointermove", le), v.addEventListener("pointerup", ae), v.addEventListener("pointercancel", ae), v.addEventListener("contextmenu", Ce, true), () => {
      oe(), v.removeEventListener("contextmenu", G, true), v.removeEventListener("pointerdown", se), v.removeEventListener("pointermove", le), v.removeEventListener("pointerup", ae), v.removeEventListener("pointercancel", ae), v.removeEventListener("contextmenu", Ce, true);
    };
  }, [e, L]);
  const C = () => {
    const v = E.current;
    if (!v) return;
    r(v.table, v.previewRoot) || (i == null ? void 0 : i());
  }, T = () => {
    const v = E.current;
    if (!v) return;
    const I = Qo(t(), v.table, v.previewRoot);
    if (!I) {
      i == null ? void 0 : i();
      return;
    }
    R(I);
  }, O = () => {
    if (!g) return;
    const v = da(t(), g);
    n(v), R(null);
  }, B = m ?? { x: 0, y: 0 }, Y = () => {
    u(false), p(null);
  }, re = o.jsxs(o.Fragment, { children: [o.jsxs("button", { type: "button", className: s ? ua : go, onClick: () => {
    C(), Y();
  }, children: [o.jsx(hn, { className: sn, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1\uAE30"] }), o.jsxs("button", { type: "button", className: s ? nr : xo, onClick: () => {
    T(), Y();
  }, children: [o.jsx(St, { className: sn, "aria-hidden": true }), "\uD45C \uC0AD\uC81C"] })] });
  return o.jsxs(o.Fragment, { children: [s ? o.jsx(Uo, { open: l, onOpenChange: (v) => {
    u(v), v || p(null);
  }, title: "\uBBF8\uB9AC\uBCF4\uAE30 \uD45C", subtitle: "\uB9C8\uD06C\uB2E4\uC6B4 \uD14C\uC774\uBE14", children: re }) : o.jsxs(Wl, { open: l, onOpenChange: (v) => {
    u(v), v || p(null);
  }, modal: true, children: [o.jsx(Ul, { asChild: true, children: o.jsx("button", { type: "button", "aria-hidden": true, tabIndex: -1, className: "pointer-events-none fixed h-px w-px opacity-0", style: { left: B.x, top: B.y } }) }), o.jsx(ql, { children: o.jsxs(Xl, { className: md, side: "bottom", align: "start", sideOffset: 2, collisionPadding: 12, onCloseAutoFocus: (v) => v.preventDefault(), children: [o.jsxs(Ur, { className: go, onSelect: C, children: [o.jsx(hn, { className: sn, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1\uAE30"] }), o.jsxs(Ur, { className: xo, onSelect: T, children: [o.jsx(St, { className: sn, "aria-hidden": true }), "\uD45C \uC0AD\uC81C"] })] }) })] }), o.jsx(pn, { isOpen: g !== null, variant: "danger", title: "\uD45C \uC0AD\uC81C", message: "\uC774 \uD45C\uB97C \uB9C8\uD06C\uB2E4\uC6B4\uC5D0\uC11C \uC0AD\uC81C\uD560\uAE4C\uC694?", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", onConfirm: O, onCancel: () => R(null) })] });
}
function hd(e) {
  const [t, n] = a.useState(null), r = a.useRef(e.getMarkdown), i = a.useRef(e.setMarkdown);
  r.current = e.getMarkdown, i.current = e.setMarkdown;
  const s = a.useCallback((p, g = p) => {
    const R = r.current(), E = rr(R, p, g);
    return E ? (n({ block: E, meta: E.meta ?? mn(), grid: E.grid }), true) : false;
  }, []), l = a.useCallback((p, g) => {
    const R = r.current(), E = Qo(R, p, g);
    return E ? (n({ block: E, meta: E.meta ?? mn(), grid: E.grid }), true) : false;
  }, []), u = a.useCallback(() => n(null), []), m = a.useCallback((p, g) => {
    if (!t) return;
    const R = r.current(), E = rr(R, t.block.start, t.block.start + 1) ?? t.block, L = fa(R, E, p, g);
    i.current(L), n(null);
  }, [t]);
  return { editState: t, openAtOffset: s, openPreviewTable: l, close: u, apply: m, isOpen: !!t };
}
const hs = new pr("s3haim-note-cover-fold");
hs.version(1).stores({ folds: "key, updatedAt" });
const gs = hs.folds;
function gd(e, t) {
  return `cover-fold:${mr(e, t)}`;
}
function xd(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : gd(e.type, e.id);
}
async function bd(e) {
  if (!e) return null;
  const t = await gs.get(e);
  return !t || typeof t.collapsed != "boolean" ? null : t.collapsed;
}
async function wd(e, t) {
  e && await gs.put({ key: e, collapsed: !!t, updatedAt: Date.now() });
}
function jt(e) {
  const t = Math.min(e.length, 2e6);
  return ma(e.sliceString(0, t));
}
function bt(e) {
  const t = jt(e.doc);
  if (!t) return null;
  const n = e.doc.lineAt(t.from);
  return n.to >= t.to ? null : { from: n.to, to: t.to };
}
function Kt(e, t) {
  let n = false;
  return zs(e).between(t.from, t.to, () => {
    n = true;
  }), n;
}
function yd(e, t) {
  return e.from === t.from && e.to === t.to;
}
function vd(e, t) {
  const n = e.doc.lineAt(t);
  let r = false;
  return Ws(e).iterate({ from: n.from, to: Math.min(n.to, n.from + 1), enter(i) {
    const s = i.type.name;
    if (s.startsWith("ATXHeading") || s.startsWith("SetextHeading")) return r = true, false;
  } }), r;
}
function Qn(e, t) {
  const n = jt(e.doc);
  if (n) {
    const s = e.doc.lineAt(n.from);
    if (t === s.from) {
      const l = bt(e);
      if (l) return { ...l, kind: "cover" };
    }
    if (t >= n.from && t < n.to) return null;
  }
  if (!vd(e, t)) return null;
  const r = e.doc.lineAt(t), i = Vs(e, r.from, r.to);
  return !i || i.from >= i.to ? null : { ...i, kind: "heading" };
}
const zt = _s.define({ combine: (e) => e[e.length - 1] ?? null }), xs = new _o();
function kd(e) {
  return xs.of(zt.of(e));
}
function Ed(e, t) {
  e.dispatch({ effects: xs.reconfigure(zt.of(t)) });
}
function Sd(e, t) {
  const n = document.createElement("button");
  n.type = "button", n.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${t}`;
  const r = t === "cover" ? e ? "\uD45C\uC9C0 \uC811\uAE30" : "\uD45C\uC9C0 \uD3BC\uCE58\uAE30" : e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30";
  n.setAttribute("aria-label", r), n.title = r, n.dataset.foldKind = t, n.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const i = n.querySelector("svg");
  return i && (i.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", i.style.transformOrigin = "50% 50%"), n;
}
class bo extends Us {
  constructor(t, n) {
    super(), this.open = t, this.kind = n;
  }
  eq(t) {
    return this.open === t.open && this.kind === t.kind;
  }
  toDOM() {
    return Sd(this.open, this.kind);
  }
}
let dr = 0;
function bs(e, t) {
  const n = e.coordsAtPos(t.from), r = e.coordsAtPos(t.to);
  if (!n || !r) return null;
  const i = e.contentDOM.getBoundingClientRect(), s = Math.min(n.top, r.top), l = Math.max(n.bottom, r.bottom), u = Math.max(0, l - s);
  if (u < 2) return null;
  const m = document.createElement("div");
  return m.className = "cm-note-cover-fold-motion", m.style.cssText = ["position:fixed", `top:${s}px`, `left:${i.left}px`, `width:${Math.max(0, i.width)}px`, `height:${u}px`, "overflow:hidden", "pointer-events:none", "z-index:6", "background:var(--md-bk-color, var(--cm-background, #fff))"].join(";"), document.body.appendChild(m), m;
}
async function Cd(e, t) {
  const n = ++dr, r = bs(e, t);
  if (!r) {
    e.dispatch({ effects: Ot.of(t) });
    return;
  }
  try {
    await vn(r, { height: 0, opacity: 0.35 }, { duration: 0.22, ease: "easeInOut" });
  } catch {
  }
  n === dr && bt(e.state) && e.dispatch({ effects: Ot.of(t) }), r.remove();
}
async function Nd(e, t) {
  ++dr, e.dispatch({ effects: bn.of(t) });
  const n = bt(e.state);
  if (!n) return;
  const r = bs(e, n);
  if (r) {
    try {
      await vn(r, { height: 0, opacity: 0 }, { duration: 0.22, ease: "easeInOut" });
    } catch {
    }
    r.remove();
  }
}
function ws(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.querySelector) == null ? void 0 : _a2.call(e, "svg");
  n instanceof SVGElement && vn(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" });
}
function wo(e, t) {
  const n = Kt(e.state, t);
  return e.dispatch({ effects: n ? bn.of(t) : Ot.of(t) }), true;
}
function yo(e) {
  const t = bt(e.state);
  if (!t) return false;
  const r = !Kt(e.state, t), i = e.dom.querySelector('.cm-note-cover-fold-chevron[data-fold-kind="cover"]');
  return ws(i, !r), (async () => {
    r ? await Cd(e, t) : await Nd(e, t);
    const s = e.state.facet(zt);
    s && wd(s, r);
  })(), true;
}
function jd(e, t) {
  const n = bt(e.state);
  if (!n) return;
  const r = Kt(e.state, n);
  t && !r ? e.dispatch({ effects: Ot.of(n) }) : !t && r && e.dispatch({ effects: bn.of(n) });
}
function Md() {
  return Ks.fromClass(class {
    constructor(e) {
      __publicField(this, "lastKey", null);
      __publicField(this, "hadCover", false);
      __publicField(this, "loadGen", 0);
      this.view = e, this.syncKeyAndMaybeRestore();
    }
    update(e) {
      const t = e.state.facet(zt) !== this.lastKey, r = !!jt(e.state.doc), i = r && !this.hadCover;
      this.hadCover = r, (t || i) && this.syncKeyAndMaybeRestore();
    }
    syncKeyAndMaybeRestore() {
      const e = this.view.state.facet(zt);
      this.lastKey = e;
      const t = jt(this.view.state.doc);
      if (this.hadCover = !!t, !e || !t) return;
      const n = ++this.loadGen;
      bd(e).then((r) => {
        n === this.loadGen && r != null && jd(this.view, r);
      });
    }
  });
}
function Td(e) {
  return e.transactions.some((t) => t.effects.some((n) => n.is(Ot) || n.is(bn)));
}
function Ld() {
  return [kd(null), Fs({ preparePlaceholder(e, t) {
    const n = bt(e);
    return n && yd(n, t) ? "cover" : "heading";
  }, placeholderDOM(e, t, n) {
    const r = document.createElement("span");
    return r.className = "cm-foldPlaceholder", r.textContent = n === "cover" ? "\u2026\uD45C\uC9C0\u2026" : "\u2026", r.setAttribute("aria-hidden", "true"), r.onclick = t, r;
  } }), Hs.of((e, t) => {
    const n = jt(e.doc);
    if (!n) return null;
    const r = e.doc.lineAt(n.from);
    return t !== r.from ? null : bt(e);
  }), Os({ class: "cm-note-cover-fold-gutter", lineMarker(e, t) {
    const n = Qn(e.state, t.from);
    if (!n) return null;
    const r = !Kt(e.state, n);
    return new bo(r, n.kind);
  }, lineMarkerChange: (e) => e.docChanged || e.viewportChanged || Td(e), initialSpacer: () => new bo(true, "heading"), domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = Qn(e.state, t.from);
    if (!r) return false;
    if (r.kind === "cover") {
      if (!yo(e)) return false;
    } else {
      const i = n.target instanceof Element ? n.target.closest(".cm-note-cover-fold-chevron") : null;
      ws(i, Kt(e.state, r)), wo(e, r);
    }
    return n.preventDefault(), n.stopPropagation(), true;
  } } }), Bs({ domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = jt(e.state.doc);
    if (r && t.from >= r.from && t.from < r.to) return yo(e) ? (n.preventDefault(), true) : false;
    const i = Qn(e.state, t.from);
    return !i || i.kind !== "heading" ? false : (wo(e, i), n.preventDefault(), true);
  } } }), Md(), Ht.theme({ ".cm-note-cover-fold-gutter": { width: "1.1rem" }, ".cm-note-cover-fold-gutter .cm-gutterElement": { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }, ".cm-note-cover-fold-chevron": { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", padding: "0", margin: "0", border: "none", background: "transparent", color: "inherit", opacity: "0.65", cursor: "pointer", lineHeight: "1" }, ".cm-note-cover-fold-chevron:hover": { opacity: "1" }, ".cm-note-cover-fold-chevron svg": { display: "block" } })];
}
function Rd({ cover: e, getPresignedUrl: t }) {
  const n = pa(e.pageSizeId) ? e.pageSizeId : ha, r = a.useMemo(() => ({ ...ga(), pageSizeId: n }), [n]), i = a.useMemo(() => xa(n), [n]), s = a.useMemo(() => ba(r), [r]);
  return o.jsx("div", { className: "md-note-cover-preview-light w-full bg-white text-gray-900", "data-note-cover-preview": "1", "data-color-mode": "light", "data-cover-page-size": n, style: s, children: o.jsx(Ei, { cover: e, getPresignedUrl: t, className: "md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]", style: { width: "100%", height: "auto", aspectRatio: `${i.widthMm} / ${i.heightMm}` } }) });
}
const xn = /* @__PURE__ */ new WeakMap(), Ad = "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026", Pd = "\uD45C\uC9C0";
function ys(e) {
  const t = xn.get(e);
  t && (t.unmount(), xn.delete(e));
}
function vo(e, t) {
  if (!e) return;
  const n = e.querySelector(".md-note-cover-placeholder__fallback");
  n && (n.textContent = t);
}
function ko(e, t) {
  e && (e.classList.toggle("md-note-cover-placeholder--pending", t === "pending"), e.classList.toggle("md-note-cover-placeholder--ready", t === "ready"), e.classList.toggle("md-note-cover-placeholder--empty", t === "empty"), t === "pending" ? vo(e, Ad) : t === "empty" && vo(e, Pd));
}
function Dd(e, t, n) {
  let r = xn.get(e);
  r || (r = Ps.createRoot(e), xn.set(e, r)), r.render(a.createElement(Rd, { cover: t, getPresignedUrl: n ?? void 0 }));
}
function Id(e, t, n, r) {
  if (!e || typeof e.querySelectorAll != "function") return 0;
  const { cover: i } = qo(t ?? ""), s = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  if (!(i == null ? void 0 : i.enabled)) {
    for (const l of s) {
      ys(l);
      const u = l.closest("[data-note-cover-placeholder]");
      ko(u, "empty");
    }
    return 0;
  }
  for (const l of s) {
    const u = l.closest("[data-note-cover-placeholder]");
    ko(u, "ready"), Dd(l, i, n);
  }
  return s.length;
}
function $d(e) {
  if (!e || typeof e.querySelectorAll != "function") return;
  const t = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  for (const n of t) ys(n);
}
const _d = "h1, h2, h3, h4, h5, h6", vs = "md-preview-heading-fold-chevron", Eo = "md-preview-heading-foldable", an = "md-preview-heading-folded", Fd = "md-preview-heading-section-hidden", fn = "data-md-preview-heading-fold";
function Hd(e) {
  if (!e) return false;
  const t = e.tagName;
  return t === "H1" || t === "H2" || t === "H3" || t === "H4" || t === "H5" || t === "H6";
}
function So(e) {
  const t = e.getAttribute("data-heading-level");
  if (t) {
    const r = Number(t);
    if (Number.isFinite(r) && r >= 1) return r;
  }
  const n = Number(e.tagName.slice(1));
  return Number.isFinite(n) && n >= 1 ? n : 6;
}
function Od(e, t) {
  return e.id || `md-preview-heading-${t}`;
}
function ks(e) {
  const t = So(e), n = [];
  let r = e.nextElementSibling;
  for (; r && !(Hd(r) && So(r) <= t || r.hasAttribute("data-note-cover-placeholder")); ) r instanceof HTMLElement && n.push(r), r = r.nextElementSibling;
  return n;
}
function Bd(e) {
  return !!e.closest("[data-note-cover-placeholder], [data-note-cover-preview]");
}
function Es(e) {
  return Array.from(e.querySelectorAll(_d)).filter((t) => !(!(t instanceof HTMLElement) || Bd(t)));
}
function Vd(e) {
  if (!e || typeof e.querySelectorAll != "function") return false;
  const t = Es(e);
  for (const n of t) if (n.getAttribute(fn) !== "1" && ks(n).length > 0) return true;
  return false;
}
function Kd(e) {
  const t = document.createElement("button");
  t.type = "button", t.className = `${vs} cursor-pointer`, t.setAttribute("aria-label", e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), t.title = e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30", t.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const n = t.querySelector("svg");
  return n && (n.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", n.style.transformOrigin = "50% 50%"), t;
}
function zd(e, t) {
  const n = e.querySelector("svg");
  n instanceof SVGElement && (vn(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" }), e.setAttribute("aria-label", t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), e.title = t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30");
}
function er(e, t) {
  for (const n of e) n.classList.toggle(Fd, t), t ? n.setAttribute("hidden", "") : n.removeAttribute("hidden");
}
function Wd(e, t = {}) {
  if (!e || typeof e.querySelectorAll != "function") return () => {
  };
  const n = new Set(Array.from(t.collapsedIds ?? []).filter((s) => typeof s == "string" && s)), r = [];
  return Es(e).forEach((s, l) => {
    var _a2;
    if (s.getAttribute(fn) === "1") return;
    const u = ks(s);
    if (u.length === 0) return;
    const m = Od(s, l);
    s.id || (s.id = m), s.setAttribute(fn, "1"), s.classList.add(Eo), (_a2 = s.querySelector(`:scope > .${vs}`)) == null ? void 0 : _a2.remove();
    const g = !n.has(m), R = Kd(g);
    s.insertBefore(R, s.firstChild);
    const E = (C) => {
      s.classList.toggle(an, C), er(u, C), zd(R, !C);
    };
    g || (s.classList.add(an), er(u, true));
    const L = (C) => {
      var _a3;
      C.preventDefault(), C.stopPropagation();
      const T = !s.classList.contains(an);
      E(T), T ? n.add(m) : n.delete(m), (_a3 = t.onCollapsedChange) == null ? void 0 : _a3.call(t, Array.from(n));
    };
    R.addEventListener("click", L), r.push(() => {
      R.removeEventListener("click", L), R.remove(), s.classList.remove(Eo, an), s.removeAttribute(fn), er(u, false);
    });
  }), () => {
    for (const s of r) s();
  };
}
const Ss = new pr("s3haim-preview-heading-fold");
Ss.version(1).stores({ folds: "key, updatedAt" });
const Cs = Ss.folds;
function Ud(e, t) {
  return `heading-fold:${mr(e, t)}`;
}
function qd(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Ud(e.type, e.id);
}
async function Xd(e) {
  if (!e) return null;
  const t = await Cs.get(e);
  return !t || !Array.isArray(t.collapsedIds) ? null : t.collapsedIds.filter((n) => typeof n == "string" && n.length > 0);
}
async function Yd(e, t) {
  e && await Cs.put({ key: e, collapsedIds: Array.from(new Set(t.filter(Boolean))), updatedAt: Date.now() });
}
const Gd = [0, 16, 48, 100, 180, 320];
function Jd(e) {
  let t = [], n = null, r = null, i = false, s = false;
  function l() {
    for (const L of t) clearTimeout(L);
    t = [];
  }
  function u() {
    if (s) return false;
    const L = e.getPreviewRoot(), C = e.getView();
    return !L || !C || _t(L) ? false : Si(C, L, { allowCollapsed: true });
  }
  function m() {
    i || s || (i = true, requestAnimationFrame(() => {
      i = false, u();
    }));
  }
  function p(L) {
    n && r === L || (n == null ? void 0 : n.disconnect(), r = L, n = new MutationObserver((C) => {
      C.some((O) => {
        const B = [...O.addedNodes, ...O.removedNodes];
        return B.length === 0 ? O.type === "characterData" || O.type === "attributes" : B.some((Y) => {
          var _a2, _b;
          return Y instanceof Element ? !(Y.hasAttribute("data-preview-caret-mirror") || Y.hasAttribute("data-preview-sel-mirror") || ((_a2 = Y.classList) == null ? void 0 : _a2.contains("s3haim-preview-caret-mirror")) || ((_b = Y.classList) == null ? void 0 : _b.contains("s3haim-preview-sel-mirror"))) : true;
        });
      }) && m();
    }), n.observe(L, { childList: true, subtree: true, characterData: true }));
  }
  function g(L) {
    if (s) return;
    const C = e.getPreviewRoot();
    if (C && p(C), u(), !!(L == null ? void 0 : L.withRetries)) {
      l();
      for (const T of Gd) t.push(setTimeout(() => {
        if (s) return;
        const O = e.getPreviewRoot();
        O && p(O), u();
      }, T));
    }
  }
  function R() {
    s = true, l(), n == null ? void 0 : n.disconnect(), n = null, r = null, i = false;
  }
  const E = e.getPreviewRoot();
  return E && p(E), g({ withRetries: true }), { schedule: g, stop: R };
}
const Co = [0, 16, 48, 120, 280], Zd = 50, Qd = 40, No = 32, ef = 32;
function jo(e) {
  return !!(e == null ? void 0 : e.isConnected);
}
function fr(e, t) {
  const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
  return n.top - r.top + t.scrollTop;
}
function Mo(e, t) {
  const n = Math.max(0, t);
  Math.abs(e.scrollTop - n) < 0.5 || (e.scrollTop = n, Math.abs(e.scrollTop - n) > 1 && e.scrollTo(0, n));
}
function Ns(e) {
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
function tf(e, t) {
  let n = null, r = -1;
  for (const i of Ns(e)) {
    const s = Number(i.getAttribute("data-line"));
    Number.isFinite(s) && s <= t && s >= r && (n = i, r = s);
  }
  return n;
}
function nf(e, t, n) {
  let r = null, i = -1, s = -1 / 0;
  for (const l of Ns(e)) {
    const u = Number(l.getAttribute("data-line"));
    if (!Number.isFinite(u)) continue;
    const m = fr(l, t);
    m <= n && m >= s && (r = l, i = u, s = m);
  }
  return !r || i < 0 ? null : { el: r, line0: i };
}
function rf(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.dom) == null ? void 0 : _a2.closest(".md-editor");
  if (n instanceof HTMLElement) return n;
  const r = t == null ? void 0 : t.closest(".md-editor");
  return r instanceof HTMLElement ? r : null;
}
function of(e) {
  let t = false, n = [], r = null, i = 0, s = null, l = 0, u = 0, m = null, p = null, g = null, R = null, E = null, L = "none", C = false;
  function T() {
    for (const H of n) clearTimeout(H);
    n = [];
  }
  function O() {
    r != null && (clearTimeout(r), r = null), i = 0;
  }
  function B() {
    s != null && (clearTimeout(s), s = null);
  }
  function Y() {
    l && cancelAnimationFrame(l), u && cancelAnimationFrame(u), l = 0, u = 0;
  }
  function re(H) {
    B(), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        s = setTimeout(() => {
          s = null, L === H && (L = "none");
        }, ef);
      });
    });
  }
  function v(H) {
    return H.scrollDOM;
  }
  function I(H) {
    return jo(R) ? R : jo(p) ? p : Et(H);
  }
  function G(H) {
    if (!(H instanceof Node)) return null;
    const $ = e.getView(), J = e.getPreviewRoot();
    if ($ && (H === $.scrollDOM || $.dom.contains(H))) return "editor";
    if (J) {
      const q = J.closest(".md-editor-preview-wrapper") ?? J;
      if (H === q || q.contains(H)) return "preview";
    }
    return null;
  }
  function S(H, $) {
    if (H !== "preview" || !($ instanceof HTMLElement)) return;
    const J = e.getPreviewRoot();
    if (!J) return;
    const q = Et(J);
    q && ($ === q || $.contains(q)) && (R = $);
  }
  function A(H, $) {
    if (!($ instanceof HTMLElement)) return false;
    if (H === "editor") {
      const ye = e.getView();
      return !!(ye && ($ === ye.scrollDOM || $.contains(ye.scrollDOM)));
    }
    const J = e.getPreviewRoot(), q = J ? Et(J) : null;
    return !!(q && ($ === q || $.contains(q)));
  }
  function z() {
    if (C) return false;
    const H = e.getPreviewRoot(), $ = e.getView();
    if (!H || !$ || L === "preview" || L !== "none" && L !== "follow") return false;
    L = "follow";
    const J = Ci($, H);
    return re("follow"), J;
  }
  function Z() {
    t || C || (t = true, requestAnimationFrame(() => {
      t = false, z();
    }));
  }
  function oe() {
    const H = e.getPreviewRoot(), $ = e.getView();
    if (!H || !$) return;
    const J = v($), q = I(H);
    if (!q) return;
    const ye = J.scrollTop, ve = $.lineBlockAtHeight(ye), Ee = $.state.doc.lineAt(ve.from).number - 1, ze = tf(H, Ee);
    if (!ze) return;
    const me = ve.height > 0 ? Math.max(0, Math.min(1, (ye - ve.top) / ve.height)) : 0, pe = fr(ze, q) + ze.offsetHeight * me - No;
    Mo(q, pe);
  }
  function se() {
    const H = e.getPreviewRoot(), $ = e.getView();
    if (!H || !$) return;
    const J = v($), q = I(H);
    if (!q) return;
    const ye = q.scrollTop + No, ve = nf(H, q, ye);
    if (!ve) return;
    const { el: Ee, line0: ze } = ve, me = Math.min(Math.max(1, ze + 1), $.state.doc.lines), xe = $.state.doc.line(me), pe = $.lineBlockAt(xe.from), He = fr(Ee, q), Te = Ee.offsetHeight > 0 ? Math.max(0, Math.min(1, (ye - He) / Ee.offsetHeight)) : 0;
    Mo(J, pe.top + pe.height * Te);
  }
  function le() {
    if (!C && !(L === "preview" || L === "follow")) {
      L = "editor";
      try {
        oe();
      } finally {
        re("editor");
      }
    }
  }
  function ae() {
    if (!C && !(L === "editor" || L === "follow")) {
      L = "preview";
      try {
        se();
      } finally {
        re("preview");
      }
    }
  }
  function Ce() {
    C || L === "preview" || L === "follow" || l || (l = requestAnimationFrame(() => {
      l = 0, le();
    }));
  }
  function Q() {
    C || L === "editor" || L === "follow" || u || (u = requestAnimationFrame(() => {
      u = 0, ae();
    }));
  }
  function K(H) {
    const $ = G(H.target);
    !$ || !A($, H.target) || (S($, H.target), $ === "editor" ? Ce() : Q());
  }
  function ee(H) {
    const $ = G(H.target);
    $ && requestAnimationFrame(() => {
      const J = e.getView(), q = e.getPreviewRoot();
      $ === "editor" && J ? Ce() : $ === "preview" && q && (S("preview", Et(q)), Q());
    });
  }
  function ge(H) {
    const $ = H.target;
    if ($ instanceof HTMLImageElement && (E == null ? void 0 : E.contains($))) {
      Z(), T();
      for (const J of Co) n.push(setTimeout(() => z(), J));
    }
  }
  function fe(H) {
    const $ = H.scrollDOM;
    return $ instanceof HTMLElement ? (m === $ || (m && m.removeEventListener("scroll", K), m = $, $.addEventListener("scroll", K, { passive: true })), true) : false;
  }
  function Ue(H) {
    const $ = Et(H);
    return $ ? (p === $ || (p && p.removeEventListener("scroll", K), p = $, R = $, $.addEventListener("scroll", K, { passive: true })), true) : false;
  }
  function Pe(H, $) {
    const J = rf(H, $);
    return J ? (g === J || (g && (g.removeEventListener("scroll", K, true), g.removeEventListener("wheel", ee, true), g.removeEventListener("touchmove", ee, true)), g = J, J.addEventListener("scroll", K, { capture: true, passive: true }), J.addEventListener("wheel", ee, { capture: true, passive: true }), J.addEventListener("touchmove", ee, { capture: true, passive: true })), true) : false;
  }
  function Ke(H) {
    E !== H && (E && (E.removeEventListener("load", ge, true), E.removeEventListener("error", ge, true)), E = H, H.addEventListener("load", ge, true), H.addEventListener("error", ge, true));
  }
  function Me() {
    C || r != null || i >= Qd || (r = setTimeout(() => {
      if (r = null, i += 1, C) return;
      ne() || Me();
    }, Zd));
  }
  function ne() {
    if (C) return false;
    const H = e.getView(), $ = e.getPreviewRoot();
    let J = true;
    return H && fe(H) || (J = false), $ ? (Ue($) || (J = false), Ke($)) : J = false, Pe(H, $) || (J = false), J;
  }
  function ue(H) {
    if (!C && (ne() || Me(), z(), !!(H == null ? void 0 : H.withRetries))) {
      T();
      for (const $ of Co) n.push(setTimeout(() => {
        C || (ne() || Me(), z());
      }, $));
    }
  }
  function Fe() {
    C = true, T(), O(), B(), Y(), m && (m.removeEventListener("scroll", K), m = null), p && (p.removeEventListener("scroll", K), p = null), g && (g.removeEventListener("scroll", K, true), g.removeEventListener("wheel", ee, true), g.removeEventListener("touchmove", ee, true), g = null), E && (E.removeEventListener("load", ge, true), E.removeEventListener("error", ge, true), E = null), R = null, t = false, L = "none";
  }
  return O(), ne() || Me(), ue({ withRetries: true }), { schedule: ue, stop: Fe };
}
const Wt = new pr("s3haim-editor-undo-history");
Wt.version(1).stores({ histories: "key, updatedAt" });
const To = 100, js = 10080 * 60 * 1e3, sf = 500;
function af(e, t) {
  return mr(e, t);
}
function lf(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" ? null : af(e.type, e.id);
}
async function cf(e) {
  if (!e) return null;
  const t = await Wt.histories.get(e);
  return t ? typeof t.updatedAt == "number" && Date.now() - t.updatedAt > js ? (await Wt.histories.delete(e), null) : !Array.isArray(t.stack) || t.stack.length === 0 ? null : t : null;
}
function br(e) {
  return Array.isArray(e) ? e.length <= To ? e : e.slice(e.length - To) : [""];
}
async function Lo({ key: e, stack: t, index: n }) {
  if (!e) return;
  const r = br(t), i = Math.max(0, Math.min(n ?? r.length - 1, r.length - 1));
  await Wt.histories.put({ key: e, stack: r, index: i, updatedAt: Date.now() });
}
async function uf() {
  const e = Date.now() - js;
  await Wt.histories.where("updatedAt").below(e).delete();
}
function ln(e, t, n) {
  const r = Array.isArray(e) && e.length > 0 ? [...e] : [""];
  let i = Math.max(0, Math.min(t, r.length - 1));
  const s = n ?? "";
  if (r[i] === s) return { stack: r, index: i };
  const l = r.lastIndexOf(s);
  if (l >= 0) return { stack: r, index: l };
  const u = r.slice(0, i + 1);
  u.push(s);
  const m = br(u);
  return { stack: m, index: m.length - 1 };
}
function df(e, t, n) {
  const r = n ?? "", i = Array.isArray(e) && e.length > 0 ? e : [""], s = Math.max(0, Math.min(t, i.length - 1));
  if (i[s] === r) return { stack: i, index: s, changed: false };
  for (let m = s - 1; m >= 0; m -= 1) if (i[m] === r) return { stack: i, index: m, changed: true };
  for (let m = s + 1; m < i.length; m += 1) if (i[m] === r) return { stack: i, index: m, changed: true };
  const l = i.slice(0, s + 1);
  l.push(r);
  const u = br(l);
  return { stack: u, index: u.length - 1, changed: true };
}
function ff(e, t, n) {
  if (!(e == null ? void 0 : e.state) || !Array.isArray(t) || t.length === 0) return n == null ? void 0 : n(), false;
  const r = t[t.length - 1] ?? "";
  if (t.length === 1) return e.state.doc.toString() !== r && e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: r }, annotations: [Mn.addToHistory.of(false)] }), n == null ? void 0 : n(), true;
  e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: t[0] ?? "" }, annotations: [Mn.addToHistory.of(false), kr.of("full")] }), n == null ? void 0 : n();
  for (let s = 1; s < t.length; s += 1) {
    const l = t[s] ?? "";
    e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: l }, annotations: [kr.of("full")] });
  }
  return e.state.doc.toString() !== r && e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: r }, annotations: [Mn.addToHistory.of(false)] }), true;
}
function Ro(e) {
  return e && typeof e.resetHistory == "function" ? () => e.resetHistory() : null;
}
function mf(e) {
  var _a2;
  return e ? ((_a2 = e.getEditorView) == null ? void 0 : _a2.call(e)) ?? null : null;
}
function Ao(e) {
  var _a2;
  return ((_a2 = e == null ? void 0 : e.current) == null ? void 0 : _a2.value) ?? (e == null ? void 0 : e.current) ?? null;
}
function pf({ currentFile: e, value: t, onChange: n, editorRef: r, enabled: i = true }) {
  const s = i ? lf(e) : null, l = a.useRef([""]), u = a.useRef(0), m = a.useRef(null), p = a.useRef(false), g = a.useRef(null), R = a.useRef(null), E = a.useRef(t), L = a.useRef(false), C = a.useRef(null), T = a.useRef(0), O = a.useRef(t);
  E.current = t;
  const B = a.useCallback(async (A, z, Z) => {
    if (A) try {
      await Lo({ key: A, stack: z, index: Z });
    } catch (oe) {
      console.warn("[editor-undo-history] save failed:", oe);
    }
  }, []), Y = a.useCallback((A, z, Z) => {
    A && (R.current && clearTimeout(R.current), R.current = setTimeout(() => {
      R.current = null, B(A, z, Z);
    }, 300));
  }, [B]), re = a.useCallback(() => {
    g.current && (clearTimeout(g.current), g.current = null);
  }, []), v = a.useCallback(() => {
    const A = E.current ?? "", z = ln(l.current, u.current, A);
    return l.current = z.stack, u.current = z.index, z;
  }, []), I = a.useCallback((A) => {
    const z = Ao(r), Z = mf(z), oe = Ro(z);
    if (!Z) return false;
    const se = ++T.current;
    p.current = true;
    try {
      ff(Z, A, oe ?? void 0);
    } finally {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          T.current === se && (p.current = false);
        });
      });
    }
    return true;
  }, [r]), G = a.useCallback((A, z) => {
    var _a2, _b;
    const Z = E.current ?? "", oe = ((_a2 = z == null ? void 0 : z.stack) == null ? void 0 : _a2.length) ? z.stack : [Z], se = ((_b = z == null ? void 0 : z.stack) == null ? void 0 : _b.length) ? z.index ?? z.stack.length - 1 : 0, le = ln(oe, se, Z);
    l.current = le.stack, u.current = le.index, C.current = A, L.current = false, O.current = Z;
    const ae = le.stack.slice(0, le.index + 1), Ce = (Q) => {
      m.current === A && (I(ae) || Q <= 0 || setTimeout(() => Ce(Q - 1), 50));
    };
    Ce(40), Y(A, le.stack, le.index);
  }, [I, Y]);
  return a.useEffect(() => {
    i && uf().catch(() => {
    });
  }, [i]), a.useEffect(() => {
    var _a2;
    if (!i) return;
    const A = m.current, z = s;
    if (re(), R.current && (clearTimeout(R.current), R.current = null), A && A !== z) {
      const le = v();
      B(A, le.stack, le.index);
    }
    m.current = z, C.current = null, L.current = false;
    const Z = Ao(r);
    if ((_a2 = Ro(Z)) == null ? void 0 : _a2(), !z) {
      l.current = [E.current ?? ""], u.current = 0;
      return;
    }
    const oe = ++T.current;
    let se = false;
    return (async () => {
      let le = null;
      try {
        le = await cf(z);
      } catch (ae) {
        console.warn("[editor-undo-history] load failed:", ae);
      }
      se || T.current !== oe || m.current === z && G(z, le);
    })(), () => {
      se = true;
    };
  }, [i, s, r, re, v, B, G]), a.useEffect(() => {
    if (!i || !s || C.current !== s || L.current || p.current || t === O.current) return;
    const A = t ?? "";
    O.current = A;
    const z = ln(l.current, u.current, A);
    l.current = z.stack, u.current = z.index, I(z.stack.slice(0, z.index + 1)), Y(s, z.stack, z.index);
  }, [i, s, t, I, Y]), a.useEffect(() => {
    if (i) return () => {
      re(), R.current && (clearTimeout(R.current), R.current = null);
      const A = m.current;
      if (!A) return;
      const z = ln(l.current, u.current, E.current ?? "");
      Lo({ key: A, stack: z.stack, index: z.index }).catch(() => {
      });
    };
  }, [i, re]), { onChange: a.useCallback((A) => {
    p.current || (O.current = A, L.current = true, n == null ? void 0 : n(A), !(!i || !m.current) && (re(), g.current = setTimeout(() => {
      if (g.current = null, p.current) return;
      const z = m.current;
      if (!z) return;
      const Z = df(l.current, u.current, A);
      Z.changed && (l.current = Z.stack, u.current = Z.index, Y(z, Z.stack, Z.index));
    }, sf)));
  }, [i, n, re, Y]) };
}
const wr = /^(\s*)([-+*])(\s+)(.*)$/, yr = /^(\s*)(\d+)([.)])(\s+)(.*)$/, Ms = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX])\](.*)$/, hf = /^(#{1,10})\s+(.*)$/;
function gf(e) {
  if (!e) return false;
  const t = e[0];
  return [...e].every((n) => n === t);
}
function Ts(e, t, n, r, i) {
  const s = t - r.length, l = n + i.length;
  if (s < 0 || l > e.length || e.sliceString(s, t) !== r || e.sliceString(n, l) !== i) return false;
  if (r === i && gf(r)) {
    const u = r[0] ?? "";
    if (s > 0 && e.sliceString(s - 1, s) === u || l < e.length && e.sliceString(l, l + 1) === u) return false;
  }
  return true;
}
function xf(e, t, n, r) {
  const { from: i, to: s, empty: l } = t;
  if (l) {
    const p = `${n}${r}`;
    return { change: { from: i, to: s, insert: p }, next: Je.cursor(i + n.length) };
  }
  const u = e.sliceString(i, s);
  if (u.length >= n.length + r.length && u.startsWith(n) && u.endsWith(r)) {
    const p = u.slice(n.length, u.length - r.length);
    return { change: { from: i, to: s, insert: p }, next: Je.range(i, i + p.length) };
  }
  if (Ts(e, i, s, n, r)) {
    const p = i - n.length, g = s + r.length;
    return { change: { from: p, to: g, insert: u }, next: Je.range(p, p + u.length) };
  }
  const m = `${n}${u}${r}`;
  return { change: { from: i, to: s, insert: m }, next: Je.range(i + n.length, i + n.length + u.length) };
}
function bf(e, t) {
  if (t.empty) return null;
  const n = e.sliceString(t.from, t.to);
  if (!n) return null;
  let r = "`";
  for (; n.includes(r); ) r += "`";
  if (!n.includes(`
`) && n.startsWith(r) && n.endsWith(r) && n.length > r.length * 2) {
    const l = n.slice(r.length, n.length - r.length);
    return { change: { from: t.from, to: t.to, insert: l }, next: Je.range(t.from, t.from + l.length) };
  }
  if (Ts(e, t.from, t.to, r, r)) {
    const l = t.from - r.length, u = t.to + r.length;
    return { change: { from: l, to: u, insert: n }, next: Je.range(l, l + n.length) };
  }
  const s = `${r}${n}${r}`;
  return { change: { from: t.from, to: t.to, insert: s }, next: Je.range(t.from + r.length, t.from + r.length + n.length) };
}
function Ls(e, t) {
  if (!t.length) return false;
  const n = t.map((i) => i.change).filter((i) => !!i).sort((i, s) => i.from - s.from);
  if (!n.length) return false;
  const r = t.map((i) => i.next);
  return e.dispatch({ changes: n, selection: Je.create(r, e.state.selection.mainIndex) }), true;
}
function Tt(e, t, n = t) {
  if (!(e == null ? void 0 : e.state) || !t) return false;
  const r = e.state.selection.ranges.map((i) => xf(e.state.doc, i, t, n));
  return Ls(e, r);
}
function wf(e) {
  return Tt(e, "**");
}
function yf(e) {
  return Tt(e, "*");
}
function vf(e) {
  return Tt(e, "~~");
}
function kf(e) {
  return Tt(e, "<u>", "</u>");
}
function Ef(e) {
  return Tt(e, "^");
}
function Sf(e) {
  return Tt(e, "~");
}
function Rs(e) {
  if (!(e == null ? void 0 : e.state)) return false;
  const t = e.state.selection.ranges.map((n) => bf(e.state.doc, n) ?? { next: n });
  return Ls(e, t);
}
function Cf(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e.state.selection.ranges) {
    const r = e.state.doc.lineAt(n.from).number, i = e.state.doc.lineAt(n.to).number;
    for (let s = r; s <= i; s += 1) t.add(s);
  }
  return [...t].sort((n, r) => n - r);
}
function Xt(e, t) {
  if (!(e == null ? void 0 : e.state)) return false;
  const n = [];
  for (const r of Cf(e)) {
    const i = e.state.doc.line(r), s = t(i.text);
    s !== null && s !== i.text && n.push({ from: i.from, to: i.to, insert: s });
  }
  return n.length ? (e.dispatch({ changes: n }), true) : false;
}
function Nf(e) {
  const t = e.match(wr);
  if (t) return `${t[1] ?? ""}1. ${t[4] ?? ""}`;
  const n = e.match(yr);
  return n ? `${n[1] ?? ""}- ${n[5] ?? ""}` : null;
}
function jf(e) {
  const t = e.match(Ms);
  if (!t) return null;
  const n = t[1] ?? "", r = t[2] ?? " ", i = t[3] ?? "";
  return `${n}[${r === " " ? "x" : " "}]${i}`;
}
function Mf(e) {
  return Xt(e, Nf);
}
function Tf(e) {
  return Xt(e, jf);
}
function Lf(e) {
  return Xt(e, (t) => {
    const n = t.match(wr);
    if (n) {
      const i = n[1] ?? "", s = n[4] ?? "";
      return Ms.test(t) ? `${i}- ${s.replace(/^\[[ xX]\]\s?/, "")}` : `${i}${s}`;
    }
    const r = t.match(yr);
    return r ? `${r[1] ?? ""}- ${r[5] ?? ""}` : `- ${t}`;
  });
}
function Rf(e) {
  return Xt(e, (t) => {
    const n = t.match(yr);
    if (n) return `${n[1] ?? ""}${n[5] ?? ""}`;
    const r = t.match(wr);
    return r ? `${r[1] ?? ""}1. ${r[4] ?? ""}` : `1. ${t}`;
  });
}
function Po(e, t) {
  if (t < 1 || t > 10) return false;
  const n = "#".repeat(t);
  return Xt(e, (r) => {
    var _a2;
    const i = r.match(hf);
    return i ? ((_a2 = i[1]) == null ? void 0 : _a2.length) === t ? i[2] ?? "" : `${n} ${i[2] ?? ""}` : `${n} ${r}`;
  });
}
function Cn(e, t, n = t) {
  if (!(e == null ? void 0 : e.state) || !t) return false;
  const r = e.state.changeByRange((i) => {
    if (i.empty) return { range: i };
    const s = e.state.doc.sliceString(i.from, i.to), l = `${t}${s}${n}`;
    return { changes: { from: i.from, to: i.to, insert: l }, range: Je.range(i.from + t.length, i.from + t.length + s.length) };
  });
  return r.changes.empty ? false : (e.dispatch(r), true);
}
function Af(e) {
  return Cn(e, "$");
}
function Pf(e) {
  return Cn(e, "[", "]");
}
function Df(e) {
  return Cn(e, "(", ")");
}
function If(e) {
  return Cn(e, "{", "}");
}
const $f = "s3haim_md_editor_toc_width", _f = 360;
function Do(e) {
  const t = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), n = [];
  (t ? e.metaKey : e.ctrlKey) && n.push("mod"), e.altKey && n.push("alt"), e.shiftKey && n.push("shift");
  const r = (e.key || "").toLowerCase();
  return !r || r === "shift" || r === "control" || r === "alt" || r === "meta" || (n.push(r), n.length <= 1) ? null : n.join("+");
}
function cn(e) {
  return !e || typeof e != "string" ? "" : e.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
}
const Ff = Qs({ nonTightLists: false });
function Hf(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const { state: t } = e, n = (_b = (_a2 = t.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof n != "number") return;
  const r = t.doc.lineAt(n);
  if (!/^(\s*)([-+*]|\d+[.)]|\[[ xX]\])/.test(r.text) || r.number < 2) return;
  const i = t.doc.line(r.number - 1);
  if (i.text.trim() !== "") return;
  const s = r.from - i.from;
  e.dispatch({ changes: { from: i.from, to: r.from, insert: "" }, selection: Je.cursor(n - s) });
}
function Of(e) {
  return Ff(e) ? (Hf(e), true) : $u(e) ? true : Zs(e);
}
const Bf = Gs.highest(Ho.of([{ key: "Enter", run: Of }]));
function Vf(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const t = (_b = (_a2 = e.state.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof t != "number") return;
  const n = e.state.doc.lineAt(t);
  e.dispatch({ changes: { from: n.from, to: n.from, insert: `
` }, selection: { anchor: n.from } });
}
function Kf(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return false;
  const { key: t, code: n } = e;
  return t === "`" || t === "?" || t === "\\" || n === "Backquote" || n === "IntlBackslash";
}
function As(e, t) {
  if (t.defaultPrevented || t.ctrlKey || t.metaKey || t.altKey || t.isComposing) return false;
  switch (t.key) {
    case "$":
      return Af(e);
    case "[":
      return Pf(e);
    case "(":
      return Df(e);
    case "{":
      return If(e);
    default:
      return false;
  }
}
function un(e, t) {
  return Wa() ? t(e) : false;
}
const zf = [{ key: "Alt-h", preventDefault: true, run: (e) => un(e, xi) }, { key: "Alt-j", preventDefault: true, run: (e) => un(e, bi) }, { key: "Alt-k", preventDefault: true, run: (e) => un(e, wi) }, { key: "Alt-l", preventDefault: true, run: (e) => un(e, yi) }];
Js({ editorConfig: { languageUserDefined: { "ko-KR": ei }, renderDelay: Xo() ? 500 : 0 }, codeMirrorExtensions(e, { keyBindings: t }) {
  const n = [...e].filter((s) => s.type !== "keymap" && s.type !== "linkShortener" && s.type !== "lineNumbers"), r = (t || []).filter((s) => {
    const l = String((s == null ? void 0 : s.key) || "").toLowerCase(), u = String((s == null ? void 0 : s.mac) || "").toLowerCase();
    return l !== "ctrl-d" && l !== "mod-d" && u !== "cmd-d" && l !== "ctrl-b" && l !== "mod-b" && u !== "cmd-b" && l !== "ctrl-u" && l !== "mod-u" && u !== "cmd-u" && l !== "ctrl-o" && l !== "mod-o" && u !== "cmd-o" && l !== "ctrl-arrowup" && l !== "mod-arrowup" && u !== "cmd-arrowup" && l !== "ctrl-arrowdown" && l !== "mod-arrowdown" && u !== "cmd-arrowdown" && !/^ctrl-[0-9]$/.test(l) && !/^mod-[0-9]$/.test(l) && !/^cmd-[0-9]$/.test(u);
  }), i = [{ key: "ArrowLeft", run: (s) => Nr(s, -1) }, { key: "ArrowRight", run: (s) => Nr(s, 1) }, { key: "Ctrl-ArrowLeft", mac: "Alt-ArrowLeft", run: (s) => ct(s, -1, ui), shift: (s) => ct(s, -1, ci) }, { key: "Ctrl-ArrowRight", mac: "Alt-ArrowRight", run: (s) => ct(s, 1, fi), shift: (s) => ct(s, 1, di) }, { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: (s) => ct(s, -1, pi), shift: (s) => ct(s, -1, mi) }, { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: (s) => ct(s, 1, gi), shift: (s) => ct(s, 1, hi) }, ...zf, { key: "Alt--", preventDefault: true, run: Mf }, { key: "Ctrl-Tab", run: Tf }, { key: "Ctrl-d", mac: "Cmd-d", preventDefault: true, run: (s) => (ri(s), true) }, { key: "Ctrl-b", mac: "Cmd-b", preventDefault: true, run: wf }, { key: "Ctrl-i", mac: "Cmd-i", preventDefault: true, run: yf }, { key: "Ctrl-u", mac: "Cmd-u", preventDefault: true, run: kf, shift: Lf }, { key: "Ctrl-o", mac: "Cmd-o", preventDefault: true, run: Rf }, { key: "Shift-Ctrl-s", mac: "Shift-Cmd-s", preventDefault: true, run: vf }, { key: "Ctrl-ArrowUp", mac: "Cmd-ArrowUp", preventDefault: true, run: Ef }, { key: "Ctrl-ArrowDown", mac: "Cmd-ArrowDown", preventDefault: true, run: Sf }, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => ({ key: `Ctrl-${s}`, mac: `Cmd-${s}`, preventDefault: true, run: (l) => Po(l, s) })), { key: "Ctrl-0", mac: "Cmd-0", preventDefault: true, run: (s) => Po(s, 10) }, { any: (s, l) => (l.ctrlKey || l.metaKey) && l.altKey && l.code === "KeyC" ? Rs(s) : As(s, l) }, { key: "Mod-Alt-ArrowUp", run: ti }, { key: "Mod-Alt-ArrowDown", run: ni }, ...r];
  return n.some((s) => s.type === "drawSelection") || n.push({ type: "drawSelection", extension: oi() }), n.push({ type: "markdownSingleNewlineEnter", extension: Bf }, { type: "lineNumbers", extension: Ld() }, { type: "allowMultipleSelections", extension: si.allowMultipleSelections.of(true) }, { type: "clickAddsSelectionRange", extension: Ht.clickAddsSelectionRange.of((s) => {
    const l = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    return s.altKey || (l ? s.metaKey : s.ctrlKey);
  }) }, { type: "multiCursorPreview", extension: ii({ minSelectionLength: 2, maxMatches: 200 }) }, { type: "keymap", extension: Ho.of(i) }, { type: "base64ImageFold", extension: Ru(is()) }, { type: "autocompleteGate", extension: Ht.updateListener.of((s) => {
    Du(s), !zo() && ai(s.state) === "active" && li(s.view);
  }) }), n;
}, markdownItPlugins(e) {
  return Ka(e);
} });
function pm({ value: e, onChange: t, onSave: n, theme: r = "light", currentFile: i = null, previewOnly: s = false, isMobileLayout: l = false, onUploadImage: u, isUploadingEditorImage: m = false, uploadImagePercent: p = 0, onCancelUploadImage: g, onResolveWikiImageUrl: R, snippetConfig: E = { snippets: [] }, llmProviderProfiles: L = [], getImgbbApiKey: C, onOpenViewPath: T, onRequestConvertAllImagesToWiki: O, onRegisterConvertAllImagesToWiki: B }) {
  var _a2, _b;
  const Y = Io(), { showAlert: re } = wa(), v = a.useId(), I = a.useMemo(() => yc(v), [v]), G = a.useMemo(() => vc(I), [I]), S = a.useRef(null), A = a.useRef(null), z = a.useRef(null), Z = a.useRef(null), oe = a.useRef(E), se = a.useRef(e), le = a.useRef(i), ae = a.useRef(r), Ce = a.useRef("");
  a.useEffect(() => {
    se.current = e, le.current = i, ae.current = r;
  }, [e, i, r]), a.useEffect(() => {
    const { issues: f } = qo(e ?? "");
    if (!f.length) {
      Ce.current = "";
      return;
    }
    const h = ya(f);
    h !== Ce.current && (Ce.current = h, re({ title: "Cover syntax error", message: `note-cover has invalid syntax.

${h}` }));
  }, [e, re]);
  const Q = a.useCallback((f = {}) => {
    const h = se.current ?? "", x = le.current;
    Vo({ currentFile: x, editorContent: h }), Y(Ko(x == null ? void 0 : x.id), { state: { value: h, theme: ae.current === "dark" ? "dark" : "light", currentFile: x, ...f.openCoverEdit ? { openCoverEdit: true } : {} } });
  }, [Y]), { onChange: K } = pf({ currentFile: i, value: e, onChange: t, editorRef: S, enabled: !s }), ee = hd({ getMarkdown: () => se.current ?? "", setMarkdown: (f) => {
    typeof t == "function" && t(f);
  } }), ge = a.useRef(ee.openAtOffset), fe = a.useRef(ee.openPreviewTable);
  a.useEffect(() => {
    ge.current = ee.openAtOffset, fe.current = ee.openPreviewTable;
  }, [ee.openAtOffset, ee.openPreviewTable]);
  const Ue = a.useRef(null), [Pe, Ke] = a.useState(false), [Me, ne] = a.useState(false), [ue, Fe] = a.useState(null), H = a.useRef(() => {
  }), [$, J] = a.useState(false), [q, ye] = a.useState(null), [ve, Ee] = a.useState(0), [ze, me] = a.useState(false), [xe, pe] = a.useState(false), He = a.useRef({ from: 0, to: 0 }), Te = a.useRef(K);
  a.useEffect(() => {
    Te.current = K;
  }, [K]);
  const [qe, Xe] = a.useState(null), [be, Ye] = a.useState(null), [nt, Le] = a.useState(false), [Qe, dt] = a.useState(null), [it, at] = a.useState(false), [je, Ne] = a.useState(null), [N, P] = a.useState(null), W = a.useRef(null), [Re, De] = Jl(), [Ie, Oe] = ku(), [Ae, rt] = Eu(), [ft, Be] = Su(), he = a.useMemo(() => Xo(), []), ce = he ? false : ft, Se = a.useRef(null);
  a.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3, _b2, _c2;
      const y = (_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      y && (Se.current = y.state.selection);
    }, h = (w) => {
      !(w.metaKey || w.ctrlKey) || w.altKey || w.shiftKey || w.key.toLowerCase() === "k" && f();
    };
    window.addEventListener("keydown", h, true);
    const x = va(f);
    return () => {
      window.removeEventListener("keydown", h, true), x();
    };
  }, [s]), a.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3;
      return ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current;
    }, h = () => {
      var _a3, _b2;
      const F = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3), U = Se.current;
      !F || !U || F.dispatch({ selection: U, scrollIntoView: true });
    }, x = (M) => {
      var _a3;
      const F = f();
      F && (h(), (_a3 = F.focus) == null ? void 0 : _a3.call(F), typeof F.execCommand == "function" && F.execCommand(M));
    }, w = () => {
      var _a3, _b2, _c2;
      const M = f();
      if (!M) return;
      const F = `

<pgbr/>

`;
      if (typeof M.insert == "function") {
        M.insert(() => ({ targetValue: F, select: false, deviationStart: 0, deviationEnd: 0 })), (_a3 = M.focus) == null ? void 0 : _a3.call(M);
        return;
      }
      const U = (_b2 = M.getEditorView) == null ? void 0 : _b2.call(M);
      U && (U.dispatch(U.state.replaceSelection(F)), (_c2 = U.focus) == null ? void 0 : _c2.call(U));
    }, y = (M = {}) => {
      Q(M);
    }, D = {};
    for (const M of ka) M.directive && (D[M.id] = () => x(M.directive));
    return D["editor-revoke"] = () => {
      var _a3, _b2;
      h();
      const M = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      M && (M.focus(), qs(M));
    }, D["editor-next"] = () => {
      var _a3, _b2;
      h();
      const M = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      M && (M.focus(), Xs(M));
    }, D["editor-llm-assist"] = () => Ke(true), D["editor-export-pdf"] = y, D["editor-pgbr"] = () => {
      h(), w();
    }, D["editor-heading-remap"] = () => {
      h(), H.current();
    }, D["editor-checklist-progress"] = () => J(true), D["editor-table-edit"] = () => {
      var _a3, _b2;
      h();
      const M = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      if (!M) return;
      const { from: F, to: U } = M.state.selection.main;
      ge.current(F, U) || re({ title: "No table", message: "No haim-table found at the cursor or selection position." });
    }, D["editor-image-upload"] = () => {
      const M = document.createElement("input");
      M.type = "file", M.accept = "image/*", M.multiple = true, M.onchange = () => {
        var _a3;
        const F = Array.from(M.files || []);
        F.length && ((_a3 = Ue.current) == null ? void 0 : _a3.call(Ue, F));
      }, M.click();
    }, D["editor-image-clip"] = () => {
      const M = document.createElement("input");
      M.type = "file", M.accept = "image/*", M.onchange = () => {
        var _a3;
        const F = (_a3 = M.files) == null ? void 0 : _a3[0];
        F && Xe(F);
      }, M.click();
    }, D["editor-convert-all-images-to-wiki"] = () => {
      typeof O == "function" && O();
    }, D["editor-insert-footnote"] = () => {
      Fr({ mode: "footnote-insert" });
    }, D["editor-insert-circle-number"] = (M) => {
      var _a3, _b2, _c2;
      const F = typeof M == "string" ? M : "";
      if (!F) {
        Fr({ mode: "circle-number" });
        return;
      }
      h();
      const te = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      te && (te.dispatch(te.state.replaceSelection(F)), (_c2 = te.focus) == null ? void 0 : _c2.call(te));
    }, D["editor-insert-snippet"] = (M) => {
      var _a3, _b2, _c2;
      const F = typeof M == "string" ? M : "";
      if (!F) return;
      h();
      const te = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      te && (te.dispatch(te.state.replaceSelection(F)), (_c2 = te.focus) == null ? void 0 : _c2.call(te));
    }, Ea(D);
  }, [s, Q, re, O]), a.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3, _b2, _c2;
      return ((_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? null;
    }, h = () => {
      const w = f(), y = Se.current;
      !w || !y || w.dispatch({ selection: y, scrollIntoView: true });
    }, x = (w, y) => {
      var _a3, _b2;
      const D = f();
      D && (D.dispatch({ changes: { from: 0, to: D.state.doc.length, insert: w }, selection: { anchor: y }, scrollIntoView: true }), (_a3 = D.focus) == null ? void 0 : _a3.call(D)), (_b2 = Te.current) == null ? void 0 : _b2.call(Te, w);
    };
    return Sa({ getMarkdown: () => {
      var _a3;
      return ((_a3 = f()) == null ? void 0 : _a3.state.doc.toString()) ?? se.current ?? "";
    }, insertExisting: (w) => {
      h();
      const y = f(), D = (y == null ? void 0 : y.state.doc.toString()) ?? se.current ?? "", M = y == null ? void 0 : y.state.selection.main, F = za(D, (M == null ? void 0 : M.from) ?? 0, (M == null ? void 0 : M.to) ?? 0, w);
      x(F.next, F.caret);
    }, openCompose: () => {
      var _a3;
      h();
      const y = (_a3 = f()) == null ? void 0 : _a3.state.selection.main;
      He.current = { from: (y == null ? void 0 : y.from) ?? 0, to: (y == null ? void 0 : y.to) ?? 0 }, pe(true);
    } });
  }, [s]);
  const { width: We, isResizing: wt, handleProps: yt } = Ca({ storageKey: $f, defaultWidth: _f, minWidth: 160, collapseBelowWidth: 80, maxWidth: 640, edge: "right", onCollapseBelowMin: () => {
    var _a3, _b2, _c2;
    (_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.toggleCatalog) == null ? void 0 : _c2.call(_b2, false);
  } }), ot = a.useMemo(() => {
    const { meta: f } = Na(e ?? "");
    return f;
  }, [e]), Yt = a.useMemo(() => {
    const f = ot == null ? void 0 : ot.fonts;
    return f ? { "--print-font-body": nn(f.body), "--print-font-heading": nn(f.heading), "--print-font-bold": nn(f.bold), "--print-font-code": nn(f.code, "mono") } : {};
  }, [ot]);
  a.useEffect(() => {
    oe.current = E || { snippets: [] };
  }, [E]), a.useEffect(() => {
    const f = () => {
      var _a3, _b2, _c2;
      const y = (_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return y ? (Au(y, Ie), true) : false;
    };
    if (f()) return;
    const h = window.setTimeout(f, 50), x = window.setTimeout(f, 250);
    return () => {
      window.clearTimeout(h), window.clearTimeout(x);
    };
  }, [Ie]), a.useEffect(() => {
    const f = A.current;
    if (!f) return;
    const h = () => {
      const w = f.querySelector(".md-editor-catalog-fixed, .md-editor-catalog-flat");
      Ne((y) => y === w ? y : w);
    };
    h();
    const x = new MutationObserver(h);
    return x.observe(f, { childList: true, subtree: true }), () => x.disconnect();
  }, []), a.useEffect(() => {
    const f = A.current;
    f && f.style.setProperty("--md-catalog-width", `${We}px`);
  }, [We]), a.useLayoutEffect(() => {
    if (!je) {
      P(null);
      return;
    }
    const f = () => {
      const w = je.getBoundingClientRect();
      if (w.width <= 0 || w.height <= 0) {
        P(null);
        return;
      }
      P({ top: w.top, left: w.left, height: w.height });
    };
    f();
    const h = new ResizeObserver(f);
    h.observe(je);
    const x = A.current;
    return x && h.observe(x), window.addEventListener("resize", f), window.addEventListener("scroll", f, true), () => {
      h.disconnect(), window.removeEventListener("resize", f), window.removeEventListener("scroll", f, true);
    };
  }, [je, We]), a.useEffect(() => {
    if (je) return Nc(je, { getEditorRoot: () => A.current, mdHeadingId: (f) => G(f) });
  }, [je, G]), nc(A, e, R, (i == null ? void 0 : i.id) ?? null), Ql(A, { layoutKey: `${r}|${e}` }), a.useEffect(() => {
    const f = A.current;
    if (!f || !e) return;
    let h = 0;
    const x = () => {
      Id(f, e, R);
    }, w = () => {
      const U = f.querySelectorAll("[data-note-cover-mount]");
      !U.length || !(f.querySelector(".md-note-cover-placeholder--pending") || [...U].some((ke) => ke.childNodes.length === 0)) || h || (h = window.requestAnimationFrame(() => {
        h = 0, x();
      }));
    }, D = [0, 80, 280, 600, 1100, 2e3].map((U) => setTimeout(x, U)), M = f.querySelector(".md-editor-preview") || f, F = typeof MutationObserver < "u" ? new MutationObserver(w) : null;
    return F == null ? void 0 : F.observe(M, { childList: true, subtree: true }), () => {
      h && window.cancelAnimationFrame(h), D.forEach((U) => clearTimeout(U)), F == null ? void 0 : F.disconnect();
    };
  }, [e, R, i == null ? void 0 : i.id]), a.useEffect(() => {
    const f = A.current;
    return () => {
      $d(f);
    };
  }, []), a.useEffect(() => {
    if (s) return;
    const f = xd(i), h = () => {
      var _a3, _b2, _c2;
      const y = (_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return y ? (Ed(y, f), true) : false;
    };
    if (h()) return;
    const x = [50, 200, 500, 1e3].map((w) => setTimeout(h, w));
    return () => x.forEach((w) => clearTimeout(w));
  }, [i == null ? void 0 : i.id, i == null ? void 0 : i.type, s]), a.useEffect(() => {
    const f = A.current;
    if (!f) return;
    const h = qd(i), x = { current: [] };
    let w = false, y = null, D = null, M = [];
    const F = () => f.querySelector(".md-editor-preview"), U = () => {
      if (w) return;
      const ie = F();
      if (!ie || !Vd(ie)) return;
      const $e = Wd(ie, { collapsedIds: x.current, onCollapsedChange: (d) => {
        x.current = d, h && Yd(h, d);
      } }), c = y;
      y = () => {
        c == null ? void 0 : c(), $e();
      };
    }, te = (ie) => {
      !ie || D || typeof MutationObserver > "u" || (D = new MutationObserver(U), D.observe(ie, { childList: true, subtree: true }));
    };
    return (async () => {
      if (h) {
        const ie = await Xd(h);
        if (w) return;
        ie && (x.current = ie);
      }
      w || (te(F()), U(), M = [80, 250, 600].map((ie) => setTimeout(() => {
        w || (te(F()), U());
      }, ie)));
    })(), () => {
      w = true, M.forEach((ie) => clearTimeout(ie)), D == null ? void 0 : D.disconnect(), D = null, y == null ? void 0 : y(), y = null;
    };
  }, [i == null ? void 0 : i.id, i == null ? void 0 : i.type]), a.useEffect(() => {
    var _a3, _b2, _c2;
    if (!s) return;
    (_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c2.call(_b2, true);
  }, [s]), a.useEffect(() => {
    if (!l || s || !(i == null ? void 0 : i.id)) return;
    Be(false);
    const f = () => {
      var _a3, _b2, _c2;
      (_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c2.call(_b2, true);
    };
    f();
    const h = [80, 240, 600].map((x) => setTimeout(f, x));
    return () => {
      h.forEach((x) => clearTimeout(x));
    };
  }, [l, s, i == null ? void 0 : i.id, Be]), a.useEffect(() => {
    if (s || he) return;
    const f = A.current;
    if (!f) return;
    const h = () => f.querySelector(".md-editor-preview"), x = () => ce;
    let w = null;
    const y = (c) => c instanceof Element ? qn(c) ? true : !!c.closest("a, button, input, textarea, select, .md-editor-code-action, [data-transform-handle]") : false, D = (c) => {
      var _a3, _b2, _c2, _d2, _e, _f2;
      const d = h();
      if (!d || _t(d)) return;
      if (!x()) {
        const _ = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window);
        (_ == null ? void 0 : _.rangeCount) && d.contains(_.getRangeAt(0).commonAncestorContainer) && !_.getRangeAt(0).collapsed ? Tn(d, { allowCollapsed: false }) : Pt(d);
        return;
      }
      const b = (_b2 = window.getSelection) == null ? void 0 : _b2.call(window);
      if (!b || b.rangeCount === 0) {
        if (!(c instanceof Element) || !c.closest("td, th")) return;
      } else {
        const _ = b.getRangeAt(0);
        if (!d.contains(_.commonAncestorContainer) && !(c instanceof Element && c.closest("td, th"))) return;
      }
      const k = (_e = (_d2 = ((_c2 = S.current) == null ? void 0 : _c2.value) ?? S.current) == null ? void 0 : _d2.getEditorView) == null ? void 0 : _e.call(_d2);
      k && ((b == null ? void 0 : b.rangeCount) && d.contains(b.getRangeAt(0).commonAncestorContainer) && Tn(d, { allowCollapsed: true }), Er(k, d, { focus: true, target: c }), Ln(), (_f2 = Z.current) == null ? void 0 : _f2.schedule({ withRetries: true }));
    }, M = (c) => c.button === 2 || c.button === 0 && c.ctrlKey, F = (c, d) => Sr(d, c.clientX, c.clientY) ? true : Cr(c.clientX, c.clientY) ? Ti(d) : false, U = (c) => {
      var _a3, _b2, _c2, _d2;
      const d = h();
      if (!d) return;
      const b = c.target;
      if (!(b instanceof Node)) return;
      if (d.contains(b) && M(c)) {
        F(c, d);
        return;
      }
      if (d.contains(b)) {
        w = { x: c.clientX, y: c.clientY }, !qn(b) && !x() && Pt(d);
        return;
      }
      if (w = null, (_d2 = (_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) == null ? void 0 : _d2.dom.contains(b)) {
        if (M(c)) return;
        Rn(), x() || Pt(d);
      }
    }, te = (c) => {
      const d = h();
      !d || !(c.target instanceof Node) || !d.contains(c.target) || F(c, d);
    }, ke = (c) => {
      var _a3, _b2, _c2;
      if (M(c)) return;
      const d = h();
      if (!(!d || !(c.target instanceof Node) || !d.contains(c.target)) && !y(c.target)) {
        if (dn(f)) {
          const b = !!(w && Math.hypot(c.clientX - w.x, c.clientY - w.y) > 6);
          if (w = null, !x() || b) return;
          const k = (_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), _ = c.target instanceof Element ? tr(c.target, d) : null;
          k && _ && (Ln(), Jr(_, k, d, c.clientX, c.clientY));
          return;
        }
        w = null, requestAnimationFrame(() => D(c.target));
      }
    }, ie = (c) => {
      var _a3, _b2, _c2, _d2;
      const d = h();
      if (!(!d || !(c.target instanceof Node) || !d.contains(c.target)) && !y(c.target)) {
        if (dn(f)) {
          if (!x()) return;
          const j = (_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), k = (_d2 = c.changedTouches) == null ? void 0 : _d2[0], _ = c.target instanceof Element ? tr(c.target, d) : null;
          j && _ && k && (Ln(), Jr(_, j, d, k.clientX, k.clientY));
          return;
        }
        requestAnimationFrame(() => D(c.target));
      }
    }, $e = (c) => {
      var _a3, _b2, _c2, _d2, _e;
      if (!x() || c.isComposing || c.keyCode === 229 || c.key === "Process" || (c.metaKey || c.ctrlKey) && (c.key === "s" || c.key === "S" || c.code === "KeyS") || qn(c.target)) return;
      const d = h();
      if (!d || _t(d) || dn(f)) return;
      const b = c.target, j = b instanceof Node && d.contains(b), k = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), _ = (k == null ? void 0 : k.rangeCount) > 0 && d.contains(k.getRangeAt(0).commonAncestorContainer);
      if (!j && !_) return;
      const we = (_d2 = (_c2 = ((_b2 = S.current) == null ? void 0 : _b2.value) ?? S.current) == null ? void 0 : _c2.getEditorView) == null ? void 0 : _d2.call(_c2);
      we && (we.hasFocus || (_ ? (Tn(d, { allowCollapsed: true }), Er(we, d, { focus: true }), (_e = Z.current) == null ? void 0 : _e.schedule({ withRetries: true })) : we.focus()));
    };
    return f.addEventListener("mousedown", U, true), f.addEventListener("contextmenu", te, true), f.addEventListener("mouseup", ke), f.addEventListener("touchend", ie, { passive: true }), f.addEventListener("keydown", $e, true), () => {
      Pt(h()), f.removeEventListener("mousedown", U, true), f.removeEventListener("contextmenu", te, true), f.removeEventListener("mouseup", ke), f.removeEventListener("touchend", ie), f.removeEventListener("keydown", $e, true);
    };
  }, [s, ce, he]), a.useEffect(() => {
    var _a3, _b2, _c2, _d2;
    if (s) {
      (_a3 = z.current) == null ? void 0 : _a3.stop(), z.current = null, (_b2 = Z.current) == null ? void 0 : _b2.stop(), Z.current = null, Rn();
      return;
    }
    const f = A.current, h = () => {
      var _a4;
      return (_a4 = f ?? A.current) == null ? void 0 : _a4.querySelector(".md-editor-preview");
    }, x = () => {
      var _a4, _b3, _c3;
      return (_c3 = (_b3 = ((_a4 = S.current) == null ? void 0 : _a4.value) ?? S.current) == null ? void 0 : _b3.getEditorView) == null ? void 0 : _c3.call(_b3);
    };
    (_c2 = z.current) == null ? void 0 : _c2.stop();
    const w = of({ getPreviewRoot: h, getView: x });
    z.current = w, (_d2 = Z.current) == null ? void 0 : _d2.stop(), Z.current = null, ce ? Z.current = Jd({ getPreviewRoot: h, getView: x }) : Rn();
    const y = Pu((D, M) => {
      var _a4;
      const F = x();
      !F || D !== F || (w.schedule({ withRetries: M.docChanged }), ce && ((_a4 = Z.current) == null ? void 0 : _a4.schedule({ withRetries: M.docChanged })));
    });
    return () => {
      var _a4, _b3;
      y(), (_a4 = Z.current) == null ? void 0 : _a4.stop(), Z.current = null, (_b3 = z.current) == null ? void 0 : _b3.stop(), z.current = null;
    };
  }, [s, ce]), a.useEffect(() => {
    if (s || he || !ce) {
      _c();
      return;
    }
    const f = A.current;
    if (f) return $c(f, { getPreviewRoot: () => f.querySelector(".md-editor-preview"), getView: () => {
      var _a3, _b2, _c2;
      return (_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    }, isEnabled: () => ce });
  }, [s, ce, he]), a.useEffect(() => {
    var _a3, _b2, _c2;
    const h = (_a3 = A.current) == null ? void 0 : _a3.querySelector(".md-editor-preview");
    if (Hc(), !!h && ((_b2 = z.current) == null ? void 0 : _b2.schedule({ withRetries: true }), !he)) {
      if (ce && !_t(h)) {
        (_c2 = Z.current) == null ? void 0 : _c2.schedule({ withRetries: true });
        return;
      }
      ce || Pt(h);
    }
  }, [e, i == null ? void 0 : i.id, ce, he]), a.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3;
      const h = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current;
      return (h == null ? void 0 : h.domEventHandlers) ? (h.domEventHandlers({ paste: (x, w) => {
        const y = x.clipboardData;
        if (!y || !w) return;
        const D = Ga(y);
        if (D.length && typeof u == "function") {
          if (m) return x.preventDefault(), false;
          x.preventDefault();
          const F = w;
          return u(D).then((U) => {
            var _a4, _b2, _c2;
            if (!(U == null ? void 0 : U.length)) return;
            const te = U.map(($e) => `![[${$e}]]`).join(`
`), ie = ((_c2 = (_b2 = ((_a4 = S.current) == null ? void 0 : _a4.value) ?? S.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? F;
            ie && ie.dispatch(ie.state.replaceSelection(te));
          }), false;
        }
        const M = y.getData("text/plain") ?? "";
        if (M) return x.preventDefault(), w.dispatch(w.state.replaceSelection(M)), false;
      }, keydown: (x, w) => {
        var _a4;
        if (!w) return;
        if (!w.composing && Kf(x) && Rs(w) || !w.composing && As(w, x)) return x.preventDefault(), x.stopPropagation(), true;
        const y = Do(x);
        if (!y) return;
        if (y === "mod+shift+enter") return x.preventDefault(), x.stopPropagation(), Vf(w), false;
        if (y === "mod+s") return;
        const M = ((_a4 = oe.current) == null ? void 0 : _a4.snippets) || [], F = cn(y), U = M.find((te) => cn(te.prefix) === F && (te.body || "").trim());
        if (U) return x.preventDefault(), x.stopPropagation(), w.dispatch(w.state.replaceSelection(U.body)), false;
      } }), true) : false;
    };
    if (!f()) {
      const h = setTimeout(f, 100);
      return () => clearTimeout(h);
    }
  }, [s, u, m]), a.useEffect(() => {
    if (s) return;
    const f = (h) => {
      var _a3, _b2, _c2, _d2, _e, _f2;
      const x = Do(h);
      if (!x || x === "mod+s") return;
      const y = (_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      if (!y) return;
      const D = A.current, M = h.target;
      if (!(D == null ? void 0 : D.contains(M)) && !((_d2 = y.dom) == null ? void 0 : _d2.contains(M))) return;
      const U = ((_e = oe.current) == null ? void 0 : _e.snippets) || [], te = cn(x), ke = U.find((ie) => cn(ie.prefix) === te && (ie.body || "").trim());
      ke && (h.preventDefault(), h.stopPropagation(), (_f2 = h.stopImmediatePropagation) == null ? void 0 : _f2.call(h), y.dispatch(y.state.replaceSelection(ke.body)));
    };
    return document.addEventListener("keydown", f, true), () => document.removeEventListener("keydown", f, true);
  }, [s, E]), a.useEffect(() => {
    if (typeof n != "function") return;
    const f = (h) => {
      var _a3, _b2, _c2, _d2, _e;
      if (!(h.ctrlKey || h.metaKey) || h.altKey || h.key !== "s" && h.key !== "S" && h.code !== "KeyS") return;
      const x = A.current;
      if (!x) return;
      const w = h.target, y = w instanceof Node && x.contains(w), D = x.querySelector(".md-editor-preview"), M = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), F = !!(D && (M == null ? void 0 : M.rangeCount) && D.contains(M.getRangeAt(0).commonAncestorContainer));
      if (!y && !F && !_t(D)) return;
      h.preventDefault(), h.stopPropagation(), (_b2 = h.stopImmediatePropagation) == null ? void 0 : _b2.call(h);
      const te = (_e = (_d2 = ((_c2 = S.current) == null ? void 0 : _c2.value) ?? S.current) == null ? void 0 : _d2.getEditorView) == null ? void 0 : _e.call(_d2);
      Fc(te), n();
    };
    return document.addEventListener("keydown", f, true), () => document.removeEventListener("keydown", f, true);
  }, [n]), a.useEffect(() => {
    const f = A.current;
    if (!f) return;
    const h = (x) => {
      var _a3, _b2, _c2, _d2, _e, _f2, _g, _h, _i2;
      const w = f.querySelector(".md-editor-preview"), y = (_b2 = (_a3 = x.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "table");
      if (y && w && w.contains(y) || w && (Sr(w, x.clientX, x.clientY) || Cr(x.clientX, x.clientY))) return;
      const D = (_d2 = (_c2 = x.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, ".cm-editor");
      if (D && f.contains(D)) {
        const ke = (_g = (_f2 = ((_e = S.current) == null ? void 0 : _e.value) ?? S.current) == null ? void 0 : _f2.getEditorView) == null ? void 0 : _g.call(_f2);
        if (ke) {
          const { from: ie, to: $e } = ke.state.selection.main, c = se.current ?? "";
          if (rr(c, ie, $e)) {
            x.preventDefault(), ge.current(ie, $e);
            return;
          }
        }
      }
      const M = (_i2 = (_h = x.target) == null ? void 0 : _h.closest) == null ? void 0 : _i2.call(_h, "img[data-wiki-path], img[data-md-src]");
      if (!M || !f.contains(M)) return;
      const F = Fa(M);
      if (!F.kind || !F.key) return;
      x.preventDefault();
      const U = F.kind === "wiki" ? Ha(f, M, F.key) : Oa(f, M, F.key);
      ye({ kind: F.kind, key: F.key, width: F.width, height: F.height, occurrence: U, imageSrc: M.currentSrc || M.src || "" });
    };
    return f.addEventListener("contextmenu", h), () => f.removeEventListener("contextmenu", h);
  }, [re]), a.useEffect(() => {
    const f = A.current;
    if (!f) return;
    const h = (x) => {
      var _a3, _b2, _c2, _d2;
      if ((_b2 = (_a3 = x.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const w = f.querySelector(".md-editor-preview"), y = (_d2 = (_c2 = x.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "table");
      if (!y || !w || !w.contains(y)) return;
      x.preventDefault(), x.stopPropagation(), fe.current(y, w) || re({ title: "No table", message: "No haim-table found at this position. Click inside a table cell and try again." });
    };
    return f.addEventListener("dblclick", h, true), () => f.removeEventListener("dblclick", h, true);
  }, [re]), a.useEffect(() => {
    const f = A.current;
    if (f) return Ni(f);
  }, []), a.useEffect(() => {
    const f = () => {
      Ee((h) => h + 1);
    };
    return window.addEventListener(Hr, f), () => {
      window.removeEventListener(Hr, f);
    };
  }, []), a.useEffect(() => {
    const f = A.current;
    if (!f) return;
    const h = (y) => {
      (y.classList.contains("md-note-cover-placeholder--ready") || y.classList.contains("md-note-cover-placeholder--empty") || y.classList.contains("md-note-cover-placeholder--pending")) && at(true);
    }, x = (y) => {
      var _a3, _b2, _c2, _d2, _e, _f2;
      const D = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      if (D && f.contains(D)) {
        y.preventDefault(), y.stopPropagation(), h(D);
        return;
      }
      const M = (_d2 = (_c2 = y.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "[data-chat-saved-note]");
      if (M && f.contains(M)) {
        y.preventDefault(), y.stopPropagation(), Y(Ba({ id: M.getAttribute("data-chat-id") || "", href: M.getAttribute("data-chat-href") || M.getAttribute("href") || "" }));
        return;
      }
      const F = (_f2 = (_e = y.target) == null ? void 0 : _e.closest) == null ? void 0 : _f2.call(_e, "a[href]");
      if (!F || !f.contains(F) || y.metaKey || y.ctrlKey || y.shiftKey || y.altKey || typeof y.button == "number" && y.button !== 0 || F.hasAttribute("data-md-footnote-to")) return;
      const U = F.getAttribute("href") || "", te = Va(U, { currentViewPath: (i == null ? void 0 : i.type) ? i.id : null });
      if (te.kind !== "app") return;
      if (y.preventDefault(), y.stopPropagation(), te.viewPath && typeof T == "function") {
        T(te.viewPath);
        return;
      }
      const ke = te.search || "", ie = te.hash || "";
      Y(`${te.pathname || "/"}${ke}${ie}`);
    }, w = (y) => {
      var _a3, _b2;
      if (y.key !== "Enter" && y.key !== " ") return;
      const D = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      !D || !f.contains(D) || (y.preventDefault(), y.stopPropagation(), h(D));
    };
    return f.addEventListener("click", x), f.addEventListener("keydown", w), () => {
      f.removeEventListener("click", x), f.removeEventListener("keydown", w);
    };
  }, [Y, i == null ? void 0 : i.id, i == null ? void 0 : i.type, T]);
  const Gt = a.useCallback(({ width: f, height: h }) => {
    const x = q;
    if (!(x == null ? void 0 : x.key) || typeof K != "function") return;
    const w = x.kind === "wiki" ? $n(e, { path: x.key, occurrence: x.occurrence ?? 0, width: f, height: h }) : _n(e, { src: x.key, occurrence: x.occurrence ?? 0, width: f, height: h });
    w.updated && w.markdown !== e && K(w.markdown);
  }, [q, K, e]), Jt = a.useCallback(async ({ file: f }) => {
    var _a3;
    const h = q;
    if (!(h == null ? void 0 : h.key) || typeof u != "function") throw new Error("Upload handler not available.");
    const w = (_a3 = await u([f])) == null ? void 0 : _a3[0];
    if (!w) throw new Error("Upload succeeded but no path was returned.");
    if (typeof K != "function") return;
    const y = h.kind === "wiki" ? ja(e, { path: h.key, occurrence: h.occurrence ?? 0, nextPath: w }) : Or(e, { src: h.key, occurrence: h.occurrence ?? 0, nextPath: w });
    y.updated && y.markdown !== e && K(y.markdown);
  }, [K, u, e, q]), lt = a.useCallback(async ({ width: f, height: h }) => {
    var _a3;
    const x = q;
    if (!(x == null ? void 0 : x.key) || x.kind !== "markdown") throw new Error("Cannot convert: not a markdown image.");
    if (typeof K != "function") throw new Error("Cannot apply change.");
    const w = await Ma({ markdownSrc: x.key, displaySrc: x.imageSrc, currentNotePath: (i == null ? void 0 : i.id) ?? null });
    let y = "";
    if (w.mode === "path") y = w.path;
    else {
      if (typeof u != "function") throw new Error("Upload handler not available.");
      if (y = ((_a3 = await u([w.file])) == null ? void 0 : _a3[0]) || "", !y) throw new Error("Upload succeeded but no path was returned.");
    }
    const D = Or(e, { src: x.key, occurrence: x.occurrence ?? 0, nextPath: y, width: f, height: h });
    D.updated && D.markdown !== e && K(D.markdown);
  }, [i == null ? void 0 : i.id, K, u, e, q]), Nn = a.useCallback(async ({ width: f, height: h }) => {
    const x = q;
    if (!(x == null ? void 0 : x.key) || !(x == null ? void 0 : x.kind)) throw new Error("Cannot convert: image target is missing.");
    if (typeof K != "function") throw new Error("Cannot apply change.");
    const w = typeof C == "function" ? String(await Promise.resolve(C()) || "").trim() : "";
    if (!w) throw new Error("ImgBB API key is missing. Please add it in settings.");
    const y = Ta({ path: x.key, imageSrc: x.imageSrc });
    if (!y) throw new Error("Cannot determine image source URL for upload.");
    const M = (await La({ apiKey: w, image: y, name: Ra(x.key) ? "image" : void 0 })).url, F = x.occurrence ?? 0;
    let U = e;
    const te = x.kind === "wiki" ? $n(U, { path: x.key, occurrence: F, width: f, height: h }) : _n(U, { src: x.key, occurrence: F, width: f, height: h });
    te.updated && (U = te.markdown);
    const ke = await Aa(U, { kind: x.kind === "wiki" ? "wiki" : "markdown", key: x.key, occurrence: F }, M);
    if (!ke.updated && U === e) throw new Error("ImgBB upload succeeded but markdown could not be updated.");
    K(ke.markdown);
  }, [C, K, e, q]);
  a.useEffect(() => {
    if (typeof B == "function") return B(async () => {
      if (s) throw new Error("Cannot convert images in preview-only mode.");
      if (typeof K != "function") throw new Error("Cannot apply change.");
      if (!Pa(e)) return { markdown: e, converted: 0, failed: [] };
      const f = await Da(e, { currentNotePath: (i == null ? void 0 : i.id) ?? null, uploadFiles: async (h) => {
        if (typeof u != "function") throw new Error("Upload handler not available.");
        return u(h);
      } });
      return f.markdown !== e && K(f.markdown), f;
    }), () => B(null);
  }, [i == null ? void 0 : i.id, K, B, u, s, e]);
  const et = a.useCallback((f) => {
    const h = A.current;
    if (!h || !(f == null ? void 0 : f.kind) || !(f == null ? void 0 : f.key)) return null;
    const x = f.kind === "wiki" ? "img[data-wiki-path]" : "img[data-md-src]";
    return [...h.querySelectorAll(x)].filter((D) => (f.kind === "wiki" ? D.getAttribute("data-wiki-path") : D.getAttribute("data-md-src")) === f.key)[f.occurrence ?? 0] ?? null;
  }, []), vt = a.useCallback(({ kind: f, key: h, occurrence: x, widthPx: w, heightPx: y }) => {
    if (!h || typeof K != "function") return false;
    const D = Number.isFinite(w) ? `${Math.round(w)}px` : null, M = Number.isFinite(y) ? `${Math.round(y)}px` : null, F = f === "wiki" ? $n(e, { path: h, occurrence: x, width: D, height: M }) : _n(e, { src: h, occurrence: x, width: D, height: M });
    return F.updated && F.markdown !== e ? (K(F.markdown), true) : false;
  }, [K, e]), Lt = a.useCallback(() => {
    const f = q;
    if (!(f == null ? void 0 : f.kind) || !(f == null ? void 0 : f.key)) return;
    const h = et(f);
    if (!h) return;
    const x = h.getBoundingClientRect(), w = Math.max(24, Math.round(x.width)), y = Math.max(24, Math.round(x.height)), D = { kind: f.kind, key: f.key, occurrence: f.occurrence ?? 0, widthPx: w, heightPx: y, originalWidthPx: w, originalHeightPx: y };
    h.style.width = `${w}px`, h.style.height = `${y}px`, W.current = D, Ye(D), Le(false);
  }, [et, q]);
  a.useEffect(() => {
    if (!be) {
      dt(null);
      return;
    }
    const f = et(be);
    if (!f) {
      Ye(null), dt(null);
      return;
    }
    let h = 0;
    const x = () => {
      const w = f.getBoundingClientRect();
      dt({ left: w.left, top: w.top, width: w.width, height: w.height }), h = requestAnimationFrame(x);
    };
    return h = requestAnimationFrame(x), () => cancelAnimationFrame(h);
  }, [be, et]), a.useEffect(() => {
    if (!be) return;
    const f = et(be);
    if (!f) return;
    const h = (y) => {
      var _a3, _b2;
      const D = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]");
      if (!D) return;
      y.preventDefault();
      const M = D.getAttribute("data-transform-handle");
      if (!M) return;
      const F = y.pointerType === "touch", U = W.current || be, te = y.clientX, ke = y.clientY, ie = U.heightPx > 0 ? U.widthPx / U.heightPx : 1, $e = (d) => {
        const b = d.clientX - te, j = d.clientY - ke;
        let k = U.widthPx, _ = U.heightPx;
        if (M.includes("e") && (k = U.widthPx + b), M.includes("w") && (k = U.widthPx - b), M.includes("s") && (_ = U.heightPx + j), M.includes("n") && (_ = U.heightPx - j), k = Math.max(24, k), _ = Math.max(24, _), F || d.shiftKey) {
          const st = Math.abs((k - U.widthPx) / Math.max(1, U.widthPx)), V = Math.abs((_ - U.heightPx) / Math.max(1, U.heightPx));
          st >= V ? _ = Math.max(24, k / Math.max(1e-4, ie)) : k = Math.max(24, _ * ie);
        }
        k = Math.max(24, Math.round(k)), _ = Math.max(24, Math.round(_)), f.style.width = `${k}px`, f.style.height = `${_}px`;
        const we = { ...W.current || U, widthPx: k, heightPx: _ };
        W.current = we, Ye(we);
      }, c = () => {
        document.removeEventListener("pointermove", $e, true), document.removeEventListener("pointerup", c, true);
      };
      document.addEventListener("pointermove", $e, true), document.addEventListener("pointerup", c, true);
    }, x = (y) => {
      y.key === "Enter" && (y.preventDefault(), Le(true));
    }, w = (y) => {
      var _a3, _b2, _c2, _d2;
      const D = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]"), M = (_d2 = (_c2 = y.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "img[data-wiki-path], img[data-md-src]");
      D || M === f || Le(true);
    };
    return document.addEventListener("pointerdown", h, true), document.addEventListener("pointerdown", w, true), document.addEventListener("keydown", x, true), () => {
      document.removeEventListener("pointerdown", h, true), document.removeEventListener("pointerdown", w, true), document.removeEventListener("keydown", x, true);
    };
  }, [be, et]);
  const Zt = a.useCallback(() => {
    const f = W.current || be;
    f && (vt(f), Ye(null), W.current = null, Le(false));
  }, [vt, be]), jn = a.useCallback(() => {
    const f = W.current || be;
    if (!f) return;
    const h = et(f);
    h && (h.style.width = `${f.originalWidthPx}px`, h.style.height = `${f.originalHeightPx}px`), Ye(null), W.current = null, Le(false);
  }, [et, be]), mt = a.useCallback((f) => {
    var _a3, _b2, _c2, _d2;
    const h = String(f || "");
    if (!h) return;
    const x = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current;
    if (typeof (x == null ? void 0 : x.insert) == "function") {
      x.insert(() => ({ targetValue: h, select: false, deviationStart: 0, deviationEnd: 0 })), (_b2 = x.focus) == null ? void 0 : _b2.call(x);
      return;
    }
    const w = (_c2 = x == null ? void 0 : x.getEditorView) == null ? void 0 : _c2.call(x);
    w && (w.dispatch(w.state.replaceSelection(h)), (_d2 = w.focus) == null ? void 0 : _d2.call(w));
  }, []), pt = a.useCallback(async (f) => {
    if (!(f == null ? void 0 : f.length) || typeof u != "function" || m) return;
    const h = await u(f);
    (h == null ? void 0 : h.length) && mt(`${h.map((x) => `![[${x}]]`).join(`
`)}
`);
  }, [mt, m, u]);
  a.useEffect(() => {
    Ue.current = pt;
  }, [pt]);
  const Qt = a.useCallback(async (f) => {
    var _a3;
    if (!f || typeof u != "function") throw new Error("Upload handler not available.");
    const x = (_a3 = await u([f])) == null ? void 0 : _a3[0];
    if (!x) throw new Error("Upload succeeded but no path was returned.");
    mt(`![[${x}]]
`), Xe(null);
  }, [mt, u]), tt = a.useCallback(() => {
    var _a3, _b2, _c2;
    const h = (_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    let x = null;
    if (h) {
      const { from: w, to: y } = h.state.selection.main;
      w !== y && (x = { from: w, to: y, text: h.state.doc.sliceString(w, y) });
    }
    Fe(x), ne(true);
  }, []);
  a.useEffect(() => {
    H.current = tt;
  }, [tt]);
  const en = a.useMemo(() => [o.jsx(ou, { value: e, theme: r, currentFile: i, language: "ko-KR" }, "export-pdf"), o.jsx(su, { editorRef: S }, "insert-pgbr"), o.jsx(iu, { onOpen: tt }, "heading-remap"), o.jsx(qc, { onOpen: () => {
    Ke(true);
  } }, "llm-assist"), o.jsx(ru, { onOpen: () => {
    J(true);
  } }, "checklist-progress"), o.jsx(mu, { checked: Re, onChange: De, theme: r }, "toc-title-wrap"), o.jsx(pu, { checked: Ie, onChange: Oe, theme: r }, "base64-image-fold"), o.jsx(hu, { checked: Ae, onChange: rt, theme: r }, "editor-autocomplete"), he ? null : o.jsx(gu, { checked: ce, onChange: Be, theme: r }, "mirror-edit"), o.jsx(xu, { disabled: typeof u != "function", onRequestLink: () => me(true), onRequestUpload: (f) => {
    pt(f);
  }, onRequestClip: (f) => Xe(f) }, "image-toolbar")], [e, r, i, Re, De, Ie, Oe, Ae, rt, he, ce, Be, u, pt, tt]), tn = a.useMemo(() => ["bold", "underline", "italic", "-", "strikeThrough", "sub", "sup", "quote", "unorderedList", "orderedList", "task", "-", "codeRow", "code", "link", 9, "table", "mermaid", "katex", 1, 2, 3, 4, "-", "revoke", "next", 0, "=", 6, 7, ...he ? [] : [8], "pageFullscreen", "fullscreen", "previewOnly", "preview", "htmlPreview", ...je ? [5] : [], "catalog"], [je, he]), Rt = a.useMemo(() => {
    if (typeof u == "function") return async (f, h) => {
      if (m) return;
      const x = await u(f);
      (x == null ? void 0 : x.length) && h(x.map((w) => `![[${w}]]`));
    };
  }, [u, m]);
  return o.jsxs("div", { ref: A, className: `h-full w-full flex flex-col relative${Re ? " toc-titles-wrap" : ""}`, style: { "--md-catalog-width": `${We}px`, ...Yt }, children: [(ot == null ? void 0 : ot.webfontCss) ? o.jsx("style", { "data-s3haim-document-webfonts": "1", children: ot.webfontCss }) : null, N && $o.createPortal(o.jsx(Ia, { handleProps: yt, isResizing: wt, visibleOnHover: true, label: "TOC resize handle", style: { position: "fixed", top: N.top, left: N.left, height: N.height, bottom: "auto", zIndex: 10003 } }), document.body), m && o.jsxs("div", { className: "absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center gap-2 py-2 text-sm bg-blue-300/40 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 border-b border-blue-500/20", "aria-live": "polite", children: [o.jsx(Tl, { size: 16, className: "animate-spin shrink-0" }), o.jsxs("span", { children: ["Uploading image... ", Math.max(0, Math.min(100, Math.round(p))), "%"] }), typeof g == "function" && o.jsx("button", { type: "button", onClick: g, className: "ml-2 rounded-md border border-blue-600/50 bg-white/80 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-white dark:border-blue-300/40 dark:bg-blue-950/60 dark:text-blue-100 dark:hover:bg-blue-950", children: "Cancel" })] }), o.jsx(Ys, { ref: S, id: I, modelValue: e, onChange: K, mdHeadingId: G, className: "h-full! max-h-dvh", theme: r, language: "ko-KR", codeTheme: $a, customIcon: ec, previewOnly: s, noMermaid: true, autoDetectCode: true, scrollAuto: false, footers: ["markdownTotal"], toolbars: tn, defToolbars: en, onUploadImg: Rt }, `footnotes-${ve}`), o.jsx(Yl, { containerRef: A }), o.jsx(ji, { containerRef: A }), o.jsx(Zl, { isOpen: !!q, onClose: () => ye(null), path: (q == null ? void 0 : q.key) ?? "", kind: (q == null ? void 0 : q.kind) ?? "wiki", initialWidth: (q == null ? void 0 : q.width) ?? "", initialHeight: (q == null ? void 0 : q.height) ?? "", imageSrc: (q == null ? void 0 : q.imageSrc) ?? "", onApply: Gt, onStartFreeTransform: Lt, onCrop: Jt, onConvertToWiki: lt, onConvertToImgbb: Nn }, q ? `${q.kind}|${q.key}|${q.width ?? ""}|${q.height ?? ""}|${q.occurrence ?? 0}` : "wiki-image-size-modal"), o.jsx(bu, { isOpen: ze, onClose: () => me(false), onConfirm: ({ desc: f, url: h }) => {
    mt(`![${f || ""}](${h})
`);
  } }), o.jsx(wu, { isOpen: xe, onClose: () => pe(false), onConfirm: ({ line1: f, line2: h }) => {
    var _a3, _b2, _c2, _d2, _e;
    const w = (_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), y = (w == null ? void 0 : w.state.doc.toString()) ?? se.current ?? "", { from: D, to: M } = He.current, F = _a(y, D, M, f, h);
    w && (w.dispatch({ changes: { from: 0, to: w.state.doc.length, insert: F.next }, selection: { anchor: F.caret }, scrollIntoView: true }), (_d2 = w.focus) == null ? void 0 : _d2.call(w)), (_e = Te.current) == null ? void 0 : _e.call(Te, F.next);
  } }), o.jsx(yu, { isOpen: !!qe, file: qe, onClose: () => Xe(null), onConfirm: Qt }), o.jsx(fd, { isOpen: ee.isOpen, initialMeta: ((_a2 = ee.editState) == null ? void 0 : _a2.meta) ?? null, initialGrid: ((_b = ee.editState) == null ? void 0 : _b.grid) ?? { rows: [[""]], aligns: [null] }, onClose: ee.close, onSave: ee.apply }), o.jsx(pd, { containerRef: A, getMarkdown: () => se.current ?? "", setMarkdown: (f) => {
    typeof K == "function" ? K(f) : typeof t == "function" && t(f);
  }, onEditTable: (f, h) => fe.current(f, h), onEditFailed: () => {
    re({ title: "? ??", message: "? ?? ???? ?? ?? ?????. ??? ??? ??? ??? ???." });
  } }), o.jsx(Mi, { containerRef: A, getMarkdown: () => se.current ?? "", setMarkdown: (f) => {
    typeof K == "function" && K(f);
  }, enabled: !ee.isOpen }), be && Qe && o.jsx("div", { className: "fixed z-70 pointer-events-none border-2 border-blue-500", style: { left: `${Qe.left}px`, top: `${Qe.top}px`, width: `${Qe.width}px`, height: `${Qe.height}px` }, children: ["nw", "ne", "sw", "se"].map((f) => o.jsx("button", { type: "button", "data-transform-handle": f, className: "absolute pointer-events-auto h-3 w-3 rounded-full bg-blue-600 border border-white", style: { left: f.includes("w") ? "-7px" : "auto", right: f.includes("e") ? "-7px" : "auto", top: f.includes("n") ? "-7px" : "auto", bottom: f.includes("s") ? "-7px" : "auto", cursor: f === "nw" || f === "se" ? "nwse-resize" : "nesw-resize" }, "aria-label": `transform-${f}` }, f)) }), be && o.jsxs("button", { type: "button", onClick: () => Le(true), className: "fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm", children: [o.jsx("span", { className: "block font-semibold mb-1", children: "Free transform guide" }), o.jsx("span", { className: "block", children: "- Shift + drag: keep aspect ratio / plain drag: ignore ratio" }), o.jsx("span", { className: "block", children: "- Touch drag: keeps aspect ratio" }), o.jsx("span", { className: "block", children: "- Click elsewhere (including this banner): confirm transform" })] }), o.jsx(pn, { isOpen: it, title: "Cover export", message: "You need to open the Export PDF page to export the cover. Continue?", confirmLabel: "Continue", cancelLabel: "Cancel", onConfirm: () => {
    at(false), Q({ openCoverEdit: true });
  }, onCancel: () => at(false) }), o.jsx(pn, { isOpen: nt, title: "Save transform", message: "How would you like to handle the current transform?", confirmLabel: "Apply", cancelLabel: "Keep editing", discardLabel: "Reset transform", onConfirm: Zt, onCancel: () => Le(false), onDiscard: jn }), o.jsx(fu, { isOpen: Me, markdown: e, selectedMarkdown: (ue == null ? void 0 : ue.text) ?? "", onClose: () => {
    ne(false), Fe(null);
  }, onApply: (f, h) => {
    if (h === "selection" && ue) {
      const { from: x, to: w } = ue, y = se.current ?? e, D = `${y.slice(0, x)}${f}${y.slice(w)}`;
      D !== y && K(D);
    } else f !== e && K(f);
    ne(false), Fe(null);
  } }), o.jsx(Uc, { editorRef: S, onChange: K, getMarkdown: () => {
    var _a3, _b2, _c2, _d2, _e, _f2, _g;
    return ((_g = (_f2 = (_e = (_d2 = (_c2 = (_b2 = ((_a3 = S.current) == null ? void 0 : _a3.value) ?? S.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) == null ? void 0 : _d2.state) == null ? void 0 : _e.doc) == null ? void 0 : _f2.toString) == null ? void 0 : _g.call(_f2)) ?? se.current ?? "";
  }, llmProviderProfiles: L, open: Pe, onOpenChange: Ke, theme: r }), o.jsx(eu, { editorRef: S, onChange: K, open: $, onOpenChange: J })] });
}
export {
  pm as default
};
