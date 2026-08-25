var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as i, j as o, u as Ao, a as Do, c as Ps } from "./vendor-react-SY5QCjFA.js";
import { p as As, C as Io, q as Ds, E as Ft, S as _o, D as yr, W as Is, r as Ge, F as _s, u as $s, w as Hs, x as Fs, l as Os, y as Bs, z as xn, A as Ot, V as Vs, B as Ks, G as zs, I as Ws, T as jn, J as vr, L as Us, O as qs, P as Xs, Q as Ys, i as $o, v as Gs, R as Js, U as Zs, K as Qs, X as ea, Y as ta, Z as na, f as ra, d as oa, $ as sa, c as aa, a as ia, a0 as la, a1 as ca, a2 as ua, a3 as da, a4 as fa, a5 as ma, a6 as pa, a7 as ha, a8 as ga, a9 as xa, aa as ba, ab as wa } from "./vendor-md-editor-D4hOzNKK.js";
import { i as St, j as ya, a as va, k as tr, l as ka, s as Sa, m as Ea, o as At, h as Ca, P as Na, H as ja, p as Mn, q as kr, t as Sr, v as Er, x as Ma, y as Cr, z as ct, A as Tn, B as Ln } from "./previewFootnoteScroll-8uyJ2qqJ.js";
import { dt as Ta, eP as Ho, eQ as bn, eR as Je, eS as Fo, eT as La, dX as Nr, eU as Ra, eV as jr, d$ as Rn, d_ as Pa, eW as Mr, eX as Tr, dZ as Aa, eY as Lr, eZ as Da, e_ as Ia, e$ as _a, cW as Oo, f0 as Bo, f1 as Rr, f2 as $a, M as Wt, f3 as Ha, f4 as Pr, ac as Ar, f5 as Fa, f6 as Oa, f7 as Ba, f8 as Dr, f9 as Vo, fa as Va, fb as Ka, fc as za, fd as Wa, fe as Ua, ff as dn, _ as Ko, dI as qa, dD as Xa, fg as Ya, du as Ga, fh as Ir, fi as Ja, fj as Za, dz as Qa, fk as Pn, fl as ei, fm as An, fn as ti, dA as Dn, dy as ni, T as zo, X as nr, dK as ri, as as fn, fo as _r, dJ as oi, fp as si, a3 as ai, fq as ii, U as li, fr as ci, fs as rr, ft as ui, cx as fr, cw as mr, fu as di, fv as fi, fw as mi, cH as pi, bV as hi, di as gi, cC as Wo, fx as xi, u as bi, cV as wi, N as Uo, fy as yi, fz as vi, fA as ki, fB as Si, fC as Ei, au as Ci, cS as Ni, dh as tn, d2 as $r, d4 as In, d5 as _n, d6 as ji, d7 as Hr, d8 as Mi, d9 as Ti, da as Li, db as Ri, dc as Pi, fD as Ai, fE as Di, av as Ii, Q as _i, fF as $i, dk as Hi, dl as Fi, dm as Oi, fG as Bi, fH as Vi, fI as Ki, fJ as zi, eh as Wi } from "./index-DmaSghxP.js";
import { g as Ui, i as qi, a as Xi } from "./OpenAiCompatibleModelSelect-CMrQvRKw.js";
import { u as Yi, p as $n, L as Dt, a as Gi, i as Ji, g as Zi, b as Qi, c as el } from "./LlmAssistPanel-DKwmxh4D.js";
import { L as tl, n as nl } from "./llmAssistImages-Ca7ILDRO.js";
import { a7 as or, b8 as qo, B as rl, b9 as ol, X as Ut, ba as sl, bb as Fr, bc as Hn, aY as Fn, bd as al, t as il, be as pr, bf as ll, a as Xo, ao as cl, J as ul, bg as dl, bh as fl, C as wn, bi as ml, bj as pl, a8 as Yo, a9 as hl, g as gl, bk as mn, U as xl, a$ as bl, b7 as Or, bl as On, bm as Br, bn as wl, aX as yl, aV as vl, bo as Vr, bp as kl, bq as Sl, br as El, bs as Cl, T as Et, W as Nl, v as jl } from "./vendor-lucide-DyPOSMSJ.js";
import { b as Go, G as Bn, H as Vn, p as Ml, q as Tl, r as Ll, s as Rl, t as Pl, v as Al, w as Dl, x as Il, y as _l, z as $l, K as hr, M as gr, d as sr, T as ar, e as ir, f as lr, A as cr, B as Hl, F as ut, L as pt, E as nn, l as Fl, m as Ol, n as Bl, o as Vl, I as Kr, a0 as Kl, a1 as zl, a2 as Wl, a3 as Ul, a4 as zr } from "./vendor-radix-BgY9OwZN.js";
import { M as ql } from "./MdEditorToolbarTooltips-BIS5YQnD.js";
import { N as Xl, u as Yl, W as Gl } from "./useTocTitleWrap-XztYng_Q.js";
import { u as Jl, M as Zl } from "./useLazyMermaidRender-CaoU0vfO.js";
import { H as Kn, T as Ql } from "./TableStyleTemplateEditor-BJWR3_Ni.js";
import { b as yn } from "./vendor-motion-YU7ZxHqi.js";
import { T as ec, c as tc } from "./turndown.browser.es-7CAzp1eF.js";
import { u as nc } from "./useWikiImageHydration-C6YBhs47.js";
import "./vendor-aws-bxAUTq4h.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-image-crop-Loz3ogoo.js";
import "./storageImageHydration-DumRVs2Z.js";
import "./index-CG4BSG42.js";
function Jo(e, t, n) {
  const r = Ta(e);
  if (!r.length) return null;
  const a = [...n.querySelectorAll("table")], s = a.indexOf(t);
  let c = s >= 0 ? r[s] : void 0;
  if (!c) {
    const p = a.filter((m) => m.getAttribute("data-haim-table") === "1").indexOf(t);
    p >= 0 && (c = r.filter((g) => g.meta != null)[p]);
  }
  return !c && r.length === 1 && (c = r[0]), c ?? null;
}
function rc(e, t) {
  const n = {};
  for (const [r, a] of Object.entries(e)) {
    const s = bn(r);
    if (!s) continue;
    const c = s.r >= t ? s.r + 1 : s.r;
    n[Je(c, s.c)] = a;
  }
  return n;
}
function oc(e, t) {
  const n = {};
  for (const [r, a] of Object.entries(e)) {
    const s = bn(r);
    if (!s) continue;
    const c = s.c >= t ? s.c + 1 : s.c;
    n[Je(s.r, c)] = a;
  }
  return n;
}
function sc(e, t) {
  const n = {};
  for (const [r, a] of Object.entries(e)) {
    const s = bn(r);
    if (!s || s.r === t) continue;
    const c = s.r > t ? s.r - 1 : s.r;
    n[Je(c, s.c)] = a;
  }
  return n;
}
function ac(e, t) {
  const n = {};
  for (const [r, a] of Object.entries(e)) {
    const s = bn(r);
    if (!s || s.c === t) continue;
    const c = s.c > t ? s.c - 1 : s.c;
    n[Je(s.r, c)] = a;
  }
  return n;
}
function ic(e, t) {
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
      const a = Ct({ ...r, r: r.r - 1 });
      a && n.push(a);
      continue;
    }
    if (r.r === t) {
      if (r.rowspan <= 1) continue;
      const a = Ct({ ...r, rowspan: r.rowspan - 1 });
      a && n.push(a);
      continue;
    }
    if (r.r < t && r.r + r.rowspan > t) {
      const a = Ct({ ...r, rowspan: r.rowspan - 1 });
      a && n.push(a);
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
      const a = Ct({ ...r, c: r.c - 1 });
      a && n.push(a);
      continue;
    }
    if (r.c === t) {
      if (r.colspan <= 1) continue;
      const a = Ct({ ...r, colspan: r.colspan - 1 });
      a && n.push(a);
      continue;
    }
    if (r.c < t && r.c + r.colspan > t) {
      const a = Ct({ ...r, colspan: r.colspan - 1 });
      a && n.push(a);
      continue;
    }
    n.push(r);
  }
  return n;
}
function dc(e, t, n) {
  const r = t.merges.filter((u) => u.r === n && u.rowspan > 1);
  if (r.length === 0) return { grid: e, meta: t };
  const a = e.rows.map((u) => [...u]), s = { ...t.cells }, c = n + 1;
  for (const u of r) {
    const p = a[n], m = a[c];
    if (!p || !m) continue;
    for (; m.length <= u.c; ) m.push("");
    for (; p.length <= u.c; ) p.push("");
    const g = p[u.c] ?? "";
    g && (m[u.c] = g, p[u.c] = "");
    const T = Je(n, u.c), S = Je(c, u.c), R = s[T];
    R && (s[S] = { ...R }, delete s[T]);
  }
  return { grid: { rows: a, aligns: [...e.aligns] }, meta: { ...t, cells: s } };
}
function fc(e, t, n) {
  const r = t.merges.filter((c) => c.c === n && c.colspan > 1);
  if (r.length === 0) return { grid: e, meta: t };
  const a = e.rows.map((c) => [...c]), s = { ...t.cells };
  for (const c of r) {
    const u = a[c.r];
    if (!u) continue;
    for (; u.length <= c.c + 1; ) u.push("");
    const p = u[c.c] ?? "";
    p && (u[c.c + 1] = p, u[c.c] = "");
    const m = Je(c.r, n), g = Je(c.r, n + 1), T = s[m];
    T && (s[g] = { ...T }, delete s[m]);
  }
  return { grid: { rows: a, aligns: [...e.aligns] }, meta: { ...t, cells: s } };
}
function mc(e, t, n) {
  const r = Math.max(1, ...e.rows.map((g) => g.length), e.aligns.length, 1), a = e.rows.length, s = Math.max(0, Math.min(n, a)), c = Array.from({ length: r }, () => ""), u = [...e.rows.slice(0, s), c, ...e.rows.slice(s)];
  let p = t.headerRows, m = t.footerRows;
  return s < p ? p += 1 : m > 0 && s >= a - m && (m += 1), { grid: { rows: u, aligns: [...e.aligns] }, meta: (() => {
    var _a2;
    const g = { ...t, headerRows: p, footerRows: m, merges: ic(t.merges, s), cells: rc(t.cells, s) };
    if ((_a2 = t.rowHeights) == null ? void 0 : _a2.length) {
      const T = Ho(t.rowHeights, s);
      T && (g.rowHeights = T);
    }
    return g;
  })() };
}
function pc(e, t, n) {
  const r = Math.max(1, ...e.rows.map((u) => u.length), e.aligns.length, 1), a = Math.max(0, Math.min(n, r)), s = e.rows.map((u) => {
    const p = [...u];
    for (; p.length < r; ) p.push("");
    return p.splice(a, 0, ""), p;
  });
  s.length === 0 && s.push(Array.from({ length: r + 1 }, () => ""));
  const c = [...e.aligns];
  for (; c.length < r; ) c.push(null);
  return c.splice(a, 0, null), { grid: { rows: s, aligns: c }, meta: (() => {
    var _a2;
    const u = { ...t, merges: lc(t.merges, a), cells: oc(t.cells, a) };
    if ((_a2 = t.colWidths) == null ? void 0 : _a2.length) {
      const p = Ho(t.colWidths, a);
      p && (u.colWidths = p);
    }
    return u;
  })() };
}
function hc(e, t, n) {
  var _a2;
  const r = e.rows.length;
  if (r <= 1) return { grid: e, meta: t };
  if (n < 0 || n >= r) return { grid: e, meta: t };
  const a = dc(e, t, n), s = [...a.grid.rows.slice(0, n), ...a.grid.rows.slice(n + 1)];
  let c = a.meta.headerRows, u = a.meta.footerRows;
  n < c ? c = Math.max(0, c - 1) : u > 0 && n >= r - u && (u = Math.max(0, u - 1));
  const p = s.length;
  c + u > p && (u = Math.max(0, p - c));
  const m = { ...a.meta, headerRows: c, footerRows: u, merges: cc(a.meta.merges, n), cells: sc(a.meta.cells, n) };
  if ((_a2 = a.meta.rowHeights) == null ? void 0 : _a2.length) {
    const g = Fo(a.meta.rowHeights, n);
    g ? m.rowHeights = g : delete m.rowHeights;
  }
  return { grid: { rows: s, aligns: [...a.grid.aligns] }, meta: m };
}
function gc(e, t, n) {
  var _a2;
  const r = Math.max(1, ...e.rows.map((p) => p.length), e.aligns.length, 1);
  if (r <= 1) return { grid: e, meta: t };
  if (n < 0 || n >= r) return { grid: e, meta: t };
  const a = fc(e, t, n), s = a.grid.rows.map((p) => {
    const m = [...p];
    for (; m.length < r; ) m.push("");
    return m.splice(n, 1), m;
  }), c = [...a.grid.aligns];
  for (; c.length < r; ) c.push(null);
  c.splice(n, 1);
  const u = { ...a.meta, merges: uc(a.meta.merges, n), cells: ac(a.meta.cells, n) };
  if ((_a2 = a.meta.colWidths) == null ? void 0 : _a2.length) {
    const p = Fo(a.meta.colWidths, n);
    p ? u.colWidths = p : delete u.colWidths;
  }
  return { grid: { rows: s, aligns: c }, meta: u };
}
function xc(e, t, n) {
  const r = [...new Set(n.filter((s) => Number.isInteger(s) && s >= 0))].sort((s, c) => c - s);
  let a = { grid: e, meta: t };
  for (const s of r) {
    if (a.grid.rows.length <= 1) break;
    a = hc(a.grid, a.meta, s);
  }
  return a;
}
function bc(e, t, n) {
  const r = [...new Set(n.filter((s) => Number.isInteger(s) && s >= 0))].sort((s, c) => c - s);
  let a = { grid: e, meta: t };
  for (const s of r) {
    if (Math.max(1, ...a.grid.rows.map((u) => u.length), a.grid.aligns.length, 1) <= 1) break;
    a = gc(a.grid, a.meta, s);
  }
  return a;
}
function wc(e) {
  return String(e || "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96) || "doc";
}
function yc(e) {
  return `md-ed-${wc(e)}`;
}
function vc(e) {
  const t = `${e}-h`;
  return (n, r, a) => {
    const s = Number.isInteger(a) ? a : 0, c = typeof n == "object" && n !== null ? Number(n.index) : NaN, u = Number.isInteger(c) ? c : s;
    return `${t}-${u}`;
  };
}
const Wr = ".md-editor-catalog-link", kc = "md-preview-heading-folded", Ur = "md-preview-heading-section-hidden", Sc = 2;
function Ec(e, t) {
  const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
  return n.top - r.top + t.scrollTop;
}
function Cc(e) {
  for (let t = 0; t < 8; t += 1) {
    const n = getComputedStyle(e);
    if (!(e.classList.contains(Ur) || e.hasAttribute("hidden") || n.display === "none")) break;
    let a = false, s = e;
    for (; s && !a; ) {
      if (s instanceof HTMLElement && (s.classList.contains(Ur) || s.hasAttribute("hidden"))) {
        let u = s.previousElementSibling;
        for (; u; ) {
          if (u instanceof HTMLElement && u.classList.contains(kc)) {
            const p = u.querySelector(":scope > .md-preview-heading-fold-chevron");
            p instanceof HTMLButtonElement && (p.click(), a = true);
            break;
          }
          u = u.previousElementSibling;
        }
      }
      s = s.parentElement;
    }
    if (!a) break;
  }
}
function Nc(e, t) {
  const n = (r) => {
    var _a2;
    if (r.button !== 0) return;
    const a = r.target;
    if (!(a instanceof Element)) return;
    const s = a.closest(Wr);
    if (!(s instanceof HTMLElement) || !e.contains(s)) return;
    const u = Array.from(e.querySelectorAll(Wr)).indexOf(s);
    if (u < 0) return;
    const p = t.mdHeadingId({ index: u + 1 }), m = t.getEditorRoot(), g = ((_a2 = m == null ? void 0 : m.querySelector) == null ? void 0 : _a2.call(m, `#${CSS.escape(p)}`)) ?? null;
    if (!g || m && !m.contains(g)) return;
    r.preventDefault(), r.stopPropagation(), typeof r.stopImmediatePropagation == "function" && r.stopImmediatePropagation(), Cc(g);
    const T = St(g);
    if (!T) {
      g.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    const S = g.previousElementSibling ? 0 : Number.parseFloat(getComputedStyle(g).marginBlockStart || "0") || 0, R = Ec(g, T) - Sc - S;
    T.scrollTo({ top: Math.max(0, R), behavior: "smooth" });
  };
  return e.addEventListener("click", n, true), () => {
    e.removeEventListener("click", n, true);
  };
}
const Zo = "s3haim-llm-modal-position", Qo = "s3haim-llm-modal-hidden", zn = { leftVw: 55, topVh: 12 };
function jc() {
  try {
    const e = localStorage.getItem(Zo);
    if (!e) return { ...zn };
    const t = JSON.parse(e), n = Number(t == null ? void 0 : t.leftVw), r = Number(t == null ? void 0 : t.topVh);
    return !Number.isFinite(n) || !Number.isFinite(r) ? { ...zn } : { leftVw: Math.min(95, Math.max(0, n)), topVh: Math.min(95, Math.max(0, r)) };
  } catch {
    return { ...zn };
  }
}
function qr({ leftVw: e, topVh: t }) {
  try {
    localStorage.setItem(Zo, JSON.stringify({ leftVw: Math.min(95, Math.max(0, e)), topVh: Math.min(95, Math.max(0, t)) }));
  } catch {
  }
}
function Mc() {
  try {
    return localStorage.getItem(Qo) === "1";
  } catch {
    return false;
  }
}
function Wn(e) {
  try {
    localStorage.setItem(Qo, e ? "1" : "0");
  } catch {
  }
}
function pn(e) {
  var _a2, _b, _c2;
  const n = (_c2 = (_b = ((_a2 = e == null ? void 0 : e.current) == null ? void 0 : _a2.value) ?? (e == null ? void 0 : e.current)) == null ? void 0 : _b.getEditorView) == null ? void 0 : _c2.call(_b);
  if (!(n == null ? void 0 : n.state)) return { text: "", from: 0, to: 0, view: null };
  const r = n.state.selection.main;
  return { text: n.state.doc.sliceString(r.from, r.to), from: r.from, to: r.to, view: n };
}
function es(e, t, n, r, a) {
  var _a2;
  return (e == null ? void 0 : e.state) ? (e.dispatch({ changes: { from: t, to: n, insert: r }, selection: { anchor: t + r.length } }), (_a2 = e.focus) == null ? void 0 : _a2.call(e), a == null ? void 0 : a(e.state.doc.toString()), true) : false;
}
function Tc({ editorRef: e, onChange: t, llmProviderProfiles: n = [], open: r, onOpenChange: a, theme: s = "light" }) {
  const c = Array.isArray(n) ? n : [], [u, p] = i.useState(() => jc()), [m, g] = i.useState(() => Mc()), [T, S] = i.useState(false), [R, C] = i.useState(""), [N, O] = i.useState({ from: 0, to: 0 }), [F, Q] = i.useState([]), [G, k] = i.useState(""), [D, Z] = i.useState(""), [E, A] = i.useState("text"), [z, ee] = i.useState(false), [ne, se] = i.useState(""), [le, ce] = i.useState([]), [we, J] = i.useState(""), [V, te] = i.useState(""), [de, Ee] = i.useState(null), [We, Fe, Ue] = Yi(c), re = La(c, We), [ue, je] = i.useState(() => re ? Nr(re.id, re.kind) : ""), Ce = i.useRef(null), $ = i.useRef({ active: false, startX: 0, startY: 0, startLeftVw: 0, startTopVh: 0 }), B = 5, Y = i.useCallback(() => ({ selectedText: R, selectionRange: N, attachedImages: F, instruction: G, result: D, resultViewMode: E, loading: z, error: ne, templates: le, selectedTemplateId: we, templateName: V, editingTemplateId: de, profiles: c.map((j) => ({ id: j.id, name: j.name, kind: j.kind, baseUrl: j.baseUrl })), selectedProfileId: We, model: ue, theme: s }), [R, N, F, G, D, E, z, ne, le, we, V, de, c, We, ue, s]), q = i.useCallback(() => {
    const j = Ce.current;
    !j || j.closed || $n(j, Dt.SYNC, { state: Y() });
  }, [Y]), xe = i.useCallback(() => {
    const j = Ce.current;
    if (j && !j.closed) try {
      j.close();
    } catch {
    }
    Ce.current = null, S(false);
  }, []), ye = i.useCallback((j, { onTap: P } = {}) => {
    if (j.pointerType === "touch" || j.button !== 0) return;
    j.preventDefault();
    const U = j.clientX, ie = j.clientY;
    let De = false;
    $.current = { active: true, startX: U, startY: ie, startLeftVw: u.leftVw, startTopVh: u.topVh };
    const Ke = (Le) => {
      if (!$.current.active) return;
      Math.hypot(Le.clientX - U, Le.clientY - ie) > B && (De = true);
      const ot = window.innerWidth || 1, it = window.innerHeight || 1, Ze = (Le.clientX - $.current.startX) / ot * 100, Pe = (Le.clientY - $.current.startY) / it * 100;
      p({ leftVw: Math.min(92, Math.max(0, $.current.startLeftVw + Ze)), topVh: Math.min(90, Math.max(0, $.current.startTopVh + Pe)) });
    }, _e = () => {
      $.current.active && ($.current.active = false, document.removeEventListener("pointermove", Ke), document.removeEventListener("pointerup", _e), p((Le) => (qr(Le), Le)), De || (P == null ? void 0 : P()));
    };
    document.addEventListener("pointermove", Ke), document.addEventListener("pointerup", _e);
  }, [u.leftVw, u.topVh]), ve = i.useCallback((j, { onTap: P } = {}) => {
    const U = j.changedTouches;
    if (!U || !U.length) return;
    const ie = U[0], De = ie.identifier, Ke = ie.clientX, _e = ie.clientY;
    j.preventDefault();
    let Le = false;
    $.current = { active: true, startX: Ke, startY: _e, startLeftVw: u.leftVw, startTopVh: u.topVh, touchIdentifier: De };
    const ot = (Pe) => {
      if (!$.current.active) return;
      const Se = Array.from(Pe.touches || []).find((yt) => yt.identifier === De);
      if (!Se) return;
      Math.hypot(Se.clientX - Ke, Se.clientY - _e) > B && (Le = true);
      const me = window.innerWidth || 1, Re = window.innerHeight || 1, ze = (Se.clientX - Ke) / me * 100, wt = (Se.clientY - _e) / Re * 100;
      p({ leftVw: Math.min(92, Math.max(0, $.current.startLeftVw + ze)), topVh: Math.min(90, Math.max(0, $.current.startTopVh + wt)) }), Pe.preventDefault();
    }, it = () => {
      $.current.active && ($.current.active = false, document.removeEventListener("touchmove", ot), document.removeEventListener("touchend", Ze), document.removeEventListener("touchcancel", Ze), p((Pe) => (qr(Pe), Pe)), Le || (P == null ? void 0 : P()));
    }, Ze = (Pe) => {
      !$.current.active || !Array.from(Pe.changedTouches || []).some((me) => me.identifier === De) || it();
    };
    document.addEventListener("touchmove", ot, { passive: false }), document.addEventListener("touchend", Ze, { passive: false }), document.addEventListener("touchcancel", Ze, { passive: false });
  }, [u.leftVw, u.topVh]), he = i.useCallback(() => {
    const { text: j, from: P, to: U } = pn(e);
    return C(j), O({ from: P, to: U }), j;
  }, [e]), Ne = i.useCallback(async () => {
    const j = await Ra();
    return ce(j), j;
  }, []);
  i.useEffect(() => {
    r && (g(false), Wn(false), Ue(), he(), Ne(), se(""));
  }, [r, he, Ne, Ue]), i.useEffect(() => {
    if (!(re == null ? void 0 : re.id) || !(re == null ? void 0 : re.kind)) {
      je("");
      return;
    }
    je(Nr(re.id, re.kind));
  }, [re == null ? void 0 : re.id, re == null ? void 0 : re.kind]), i.useEffect(() => {
    const j = () => {
      J(""), Ee(null), Ne();
    };
    return window.addEventListener(jr, j), () => {
      window.removeEventListener(jr, j);
    };
  }, [Ne]), i.useEffect(() => {
    if (!r || m || T) return;
    const P = setInterval(() => he(), 600);
    return () => clearInterval(P);
  }, [r, m, T, he]), i.useEffect(() => {
    q();
  }, [q]), i.useEffect(() => {
    if (!T) return;
    const j = setInterval(() => {
      const P = Ce.current;
      (!P || P.closed) && (Ce.current = null, S(false));
    }, 400);
    return () => clearInterval(j);
  }, [T]), i.useEffect(() => {
    if (!r) {
      xe();
      return;
    }
    const j = () => {
      const P = Ce.current;
      if (P && !P.closed) {
        $n(P, Dt.PARENT_CLOSING);
        try {
          P.close();
        } catch {
        }
      }
    };
    return window.addEventListener("beforeunload", j), () => window.removeEventListener("beforeunload", j);
  }, [r, xe]);
  const Me = i.useCallback((j) => {
    const P = String(j || "").trim();
    je(P), re && (Rn(re.id, P), re.kind === Pa ? Mr(P) : Tr(P));
  }, [re]), pe = i.useCallback(async () => {
    se(""), ee(true);
    try {
      const j = he();
      if (!re) throw new Error("\uC124\uC815\uC5D0\uC11C AI \uC81C\uACF5\uC790\uB97C \uCD94\uAC00\uD55C \uB4A4 \uC120\uD0DD\uD558\uC138\uC694.");
      if (re.kind === Aa) {
        const U = (re.baseUrl || "").trim();
        if (!U) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC218\uC815\uD558\uC138\uC694.");
        Rn(re.id, ue), Tr(ue);
        const ie = await Lr(re.id, () => re.apiKey || "", (De) => Ui({ baseUrl: U, apiKey: De, model: ue, instruction: G, selectedText: j, images: F }), { allowEmpty: true, missingKeyMessage: "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
        Z(ie);
        return;
      }
      if (qi(ue)) throw new Error(`\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.
Gemini 2.0 Flash \uB610\uB294 Gemini 2.5 Flash\uB85C \uBCC0\uACBD\uD574 \uC8FC\uC138\uC694.`);
      Rn(re.id, ue), Mr(ue);
      const P = await Lr(re.id, () => re.apiKey || "", (U) => Xi({ apiKey: U, model: ue, instruction: G, selectedText: j, images: F }), { missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
      Z(P);
    } catch (j) {
      se((j == null ? void 0 : j.message) || "LLM \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    } finally {
      ee(false);
    }
  }, [he, F, re, ue, G]), Oe = i.useCallback(() => {
    if (!D) return;
    const { view: j } = pn(e), { from: P, to: U } = N;
    if (!es(j, P, U, D, t)) {
      se("\uC5D0\uB514\uD130\uC5D0 \uACB0\uACFC\uB97C \uC801\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC120\uD0DD \uC601\uC5ED\uC744 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.");
      return;
    }
    he();
  }, [D, e, N, t, he]), Ae = i.useCallback((j) => {
    J(j);
    const P = le.find((U) => U.id === j);
    P && (k(P.instruction), te(P.name), Ee(P.id));
  }, [le]), qe = i.useCallback(async () => {
    const j = V.trim(), P = G.trim();
    if (!j || !P) {
      alert("\uD15C\uD50C\uB9BF \uC774\uB984\uACFC \uC9C0\uC2DC\uC0AC\uD56D\uC744 \uBAA8\uB450 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    try {
      const U = await Da({ id: de || Ia().id, name: j, instruction: P, updatedAt: Date.now() });
      Ee(U.id), J(U.id), await Ne();
    } catch (U) {
      alert((U == null ? void 0 : U.message) || "\uD15C\uD50C\uB9BF \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [V, G, de, Ne]), Be = i.useCallback(() => {
    Ee(null), J(""), te(""), k("");
  }, []), ke = i.useCallback(async () => {
    if (de && window.confirm("\uC774 \uC9C0\uC2DC\uC0AC\uD56D \uD15C\uD50C\uB9BF\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?")) try {
      await _a(de), Be(), await Ne();
    } catch (j) {
      alert((j == null ? void 0 : j.message) || "\uD15C\uD50C\uB9BF \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [de, Be, Ne]), Xe = i.useCallback(async (j) => {
    !Array.isArray(j) || !j.length || Q((P) => {
      const U = tl - P.length;
      return U <= 0 ? P : [...P, ...j.slice(0, U)];
    });
  }, []), tt = i.useCallback((j) => {
    j && Q((P) => P.filter((U) => U.id !== j));
  }, []), Ie = i.useCallback(async (j, P = {}) => {
    switch (j) {
      case "refresh-selection":
        he();
        break;
      case "run":
        await pe();
        break;
      case "apply-result":
        Oe();
        break;
      case "set-instruction":
        k(typeof P.value == "string" ? P.value : "");
        break;
      case "set-result":
        Z(typeof P.value == "string" ? P.value : "");
        break;
      case "set-model":
        typeof P.value == "string" && Me(P.value);
        break;
      case "set-llm-profile-id":
        typeof P.value == "string" && Fe(P.value);
        break;
      case "load-template":
        Ae(P.id ?? "");
        break;
      case "save-template":
        await qe();
        break;
      case "new-template":
        Be();
        break;
      case "delete-template":
        await ke();
        break;
      case "set-template-name":
        te(typeof P.value == "string" ? P.value : "");
        break;
      case "set-result-view-mode":
        (P.value === "preview" || P.value === "text") && A(P.value);
        break;
      case "add-images": {
        const U = (Array.isArray(P.images) ? P.images : []).map(nl).filter(Boolean);
        U.length && await Xe(U);
        break;
      }
      case "remove-image":
        tt(P.id);
        break;
      case "close":
        a == null ? void 0 : a(false);
        break;
    }
  }, [he, pe, Oe, Me, Fe, Ae, qe, Be, ke, Xe, tt, a]);
  i.useEffect(() => {
    if (!r) return;
    const j = (P) => {
      if (P.origin === window.location.origin && Ji(P.data)) {
        if (P.data.type === Dt.READY) {
          P.source && typeof P.source.postMessage == "function" && (Ce.current = P.source, S(true), $n(P.source, Dt.SYNC, { state: Y() }));
          return;
        }
        P.data.type === Dt.ACTION && Ie(P.data.action, P.data.payload);
      }
    };
    return window.addEventListener("message", j), () => window.removeEventListener("message", j);
  }, [r, Y, Ie]);
  const nt = () => {
    g(true), Wn(true);
  }, rt = () => {
    g(false), Wn(false), he();
  }, bt = () => {
    xe(), a == null ? void 0 : a(false);
  }, at = () => {
    let j = Ce.current;
    if (j && !j.closed) {
      j.focus(), q(), S(true);
      return;
    }
    const P = Zi();
    if (j = window.open(P, Qi, el), !j) {
      alert("\uD31D\uC5C5\uC774 \uCC28\uB2E8\uB418\uC5B4 \uC0C8 \uCC3D\uC744 \uC5F4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    Ce.current = j, S(true);
  }, Te = { theme: s, profiles: c, selectedProfileId: We, onSelectedProfileIdChange: Fe, selectedProfile: re, model: ue, onModelChange: Me, selectedText: R, onRefreshSelection: he, attachedImages: F, onAddImages: Xe, onRemoveImage: tt, instruction: G, onInstructionChange: k, result: D, onResultChange: Z, resultViewMode: E, onResultViewModeChange: A, loading: z, error: ne, templates: le, selectedTemplateId: we, onLoadTemplate: Ae, templateName: V, onTemplateNameChange: te, editingTemplateId: de, onSaveTemplate: qe, onNewTemplate: Be, onDeleteTemplate: ke, onRun: pe, onApplyResult: Oe };
  if (!r) return null;
  if (m || T) {
    const j = T ? "AI (\uC0C8\uCC3D)" : "AI", P = T ? "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC (\uC0C8 \uCC3D \uB2EB\uC73C\uBA74 \uBCF5\uADC0)" : "\uB4DC\uB798\uADF8: \uC774\uB3D9 \xB7 \uD074\uB9AD: AI \uB3C4\uC6B0\uBBF8 \uD45C\uC2DC";
    return o.jsxs("div", { role: "button", tabIndex: 0, onPointerDown: (U) => ye(U, { onTap: T ? void 0 : rt }), onTouchStart: (U) => ve(U, { onTap: T ? void 0 : rt }), onKeyDown: (U) => {
      T || (U.key === "Enter" || U.key === " ") && (U.preventDefault(), rt());
    }, className: "fixed z-10050 flex touch-none cursor-grab select-none items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-1.5 text-xs font-medium text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 active:cursor-grabbing", style: { left: `${u.leftVw}vw`, top: `${u.topVh}vh` }, title: P, "aria-label": j, children: [o.jsx(or, { size: 14, "aria-hidden": true }), j] });
  }
  return o.jsxs("div", { className: "fixed z-10050 w-[min(92vw,420px)] rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95", style: { left: `${u.leftVw}vw`, top: `${u.topVh}vh` }, role: "dialog", "aria-modal": "false", "aria-label": "AI \uD14D\uC2A4\uD2B8 \uB3C4\uC6B0\uBBF8", children: [o.jsxs("div", { className: "flex touch-none cursor-grab active:cursor-grabbing items-center justify-between gap-2 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40", onPointerDown: (j) => ye(j), onTouchStart: (j) => ve(j), children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [o.jsx(qo, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), o.jsx(or, { size: 16, className: "shrink-0", "aria-hidden": true }), o.jsx("span", { className: "truncate", children: "AI \uB3C4\uC6B0\uBBF8" })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [o.jsx("button", { type: "button", onPointerDown: (j) => j.stopPropagation(), onTouchStart: (j) => j.stopPropagation(), onClick: at, disabled: T, className: "rounded p-1 text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-200 dark:hover:bg-violet-900/50", title: T ? "\uC0C8 \uCC3D\uC5D0\uC11C \uC5F4\uB824 \uC788\uC74C" : "\uC0C8 \uCC3D\uC73C\uB85C \uC5F4\uAE30", "aria-label": "\uC0C8 \uCC3D\uC73C\uB85C \uC5F4\uAE30", children: o.jsx(rl, { size: 15 }) }), o.jsx("button", { type: "button", onPointerDown: (j) => j.stopPropagation(), onTouchStart: (j) => j.stopPropagation(), onClick: nt, className: "rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", title: "\uC228\uAE30\uAE30", "aria-label": "\uC228\uAE30\uAE30", children: o.jsx(ol, { size: 15 }) }), o.jsx("button", { type: "button", onPointerDown: (j) => j.stopPropagation(), onTouchStart: (j) => j.stopPropagation(), onClick: bt, className: "rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", title: "\uB2EB\uAE30", "aria-label": "\uB2EB\uAE30", children: o.jsx(Ut, { size: 15 }) })] })] }), o.jsx("div", { className: "max-h-[min(70vh,560px)] overflow-y-auto p-3", children: o.jsx(Gi, { ...Te }) })] });
}
function Lc({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: () => e == null ? void 0 : e(), title: "AI \uB3C4\uC6B0\uBBF8", "aria-label": "AI \uB3C4\uC6B0\uBBF8", children: o.jsx(or, { className: "md-editor-icon", size: 16 }) });
}
function Rc(e) {
  const t = String(e ?? "").split(`
`), n = [];
  let r = { name: "\uC77C\uBC18 / \uBBF8\uBD84\uB958", tasks: [] }, a = 0, s = 0;
  t.forEach((u, p) => {
    const m = u.match(/^(#{1,6})\s+(.*)/);
    if (m) {
      (r.tasks.length > 0 || r.name !== "\uC77C\uBC18 / \uBBF8\uBD84\uB958") && n.push(r), r = { name: m[2].trim(), tasks: [] };
      return;
    }
    const g = u.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX])\]\s+(.*)/);
    if (g) {
      const T = Math.floor(g[1].length / 2), S = g[3].toLowerCase() === "x", R = g[4].trim();
      a += 1, S && (s += 1), r.tasks.push({ id: `line-${p}`, lineIndex: p, indent: T, completed: S, text: R, rawLine: u });
    }
  }), r.tasks.length > 0 && n.push(r);
  const c = a > 0 ? Math.round(s / a * 100) : 0;
  return { categories: n, totalTasks: a, completedTasks: s, pendingTasks: a - s, percentage: c };
}
function Pc(e, t) {
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
function Ac({ markdown: e = "", onMarkdownChange: t }) {
  const [n, r] = i.useState(""), [a, s] = i.useState("all"), [c, u] = i.useState({}), [p, m] = i.useState("dashboard"), g = i.useMemo(() => Rc(e), [e]);
  i.useEffect(() => {
    const C = {};
    g.categories.forEach((N) => {
      C[N.name] = true;
    }), u(C);
  }, [g.categories.length]);
  const T = (C) => {
    typeof t == "function" && t(Pc(e, C));
  }, S = (C) => {
    u((N) => ({ ...N, [C]: !N[C] }));
  }, R = (C) => {
    const N = C.text.toLowerCase().includes(n.toLowerCase()), O = a === "all" ? true : a === "completed" ? C.completed : !C.completed;
    return N && O;
  };
  return o.jsxs("div", { className: "space-y-3 text-xs text-slate-100", children: [o.jsxs("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: [o.jsxs("div", { className: "col-span-2 sm:col-span-1 relative overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3", children: [o.jsx("div", { className: "pointer-events-none absolute -right-2 -top-2 opacity-10", children: o.jsx(sl, { className: "h-16 w-16 text-indigo-400" }) }), o.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-indigo-300", children: "\uC804\uCCB4 \uC9C4\uD589\uB960" }), o.jsx("div", { className: "my-1.5 flex items-baseline gap-1", children: o.jsxs("span", { className: "text-3xl font-extrabold text-white", children: [g.percentage, "%"] }) }), o.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-slate-800", children: o.jsx("div", { className: "h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out", style: { width: `${g.percentage}%` } }) })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-slate-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uCD1D \uD0DC\uC2A4\uD06C" }), o.jsx(Fr, { className: "h-3.5 w-3.5 text-slate-500" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-slate-100", children: [g.totalTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-emerald-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC644\uB8CC\uB428" }), o.jsx(Hn, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-emerald-400", children: [g.completedTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-amber-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC9C4\uD589 \uC608\uC815" }), o.jsx(Fn, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-amber-400", children: [g.pendingTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] })] }), o.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2", children: [o.jsxs("div", { className: "flex rounded-lg border border-slate-800 bg-slate-900 p-0.5", children: [o.jsxs("button", { type: "button", onClick: () => m("dashboard"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${p === "dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(al, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCE74\uD14C\uACE0\uB9AC" })] }), o.jsxs("button", { type: "button", onClick: () => m("checklist"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${p === "checklist" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(Fr, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8" })] })] }), o.jsxs("div", { className: "flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5", children: [o.jsxs("div", { className: "relative min-w-[120px] flex-1", children: [o.jsx(il, { className: "absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" }), o.jsx("input", { type: "text", value: n, onChange: (C) => r(C.target.value), placeholder: "\uAC80\uC0C9...", className: "w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none" })] }), o.jsxs("select", { value: a, onChange: (C) => s(C.target.value), className: "rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none", children: [o.jsx("option", { value: "all", children: "\uC804\uCCB4" }), o.jsx("option", { value: "completed", children: "\uC644\uB8CC\uB9CC" }), o.jsx("option", { value: "pending", children: "\uBBF8\uC644\uB8CC\uB9CC" })] })] })] }), p === "dashboard" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5", children: g.categories.length === 0 ? o.jsxs("div", { className: "py-8 text-center text-slate-500", children: [o.jsx(pr, { className: "mx-auto mb-2 h-8 w-8 opacity-40" }), o.jsx("p", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD56D\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), o.jsx("code", { className: "mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400", children: "- [ ] \uD560 \uC77C" })] }) : g.categories.map((C, N) => {
    const O = C.tasks.length, F = C.tasks.filter((D) => D.completed).length, Q = O > 0 ? Math.round(F / O * 100) : 0, G = !!c[C.name], k = C.tasks.filter(R);
    return n && k.length === 0 ? null : o.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70", children: [o.jsxs("button", { type: "button", onClick: () => S(C.name), className: "flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40", children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [o.jsx("span", { className: "shrink-0 text-slate-500", children: G ? o.jsx(ll, { className: "h-3.5 w-3.5" }) : o.jsx(Xo, { className: "h-3.5 w-3.5" }) }), o.jsx("span", { className: "truncate text-[12px] font-semibold text-slate-200", children: C.name })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [o.jsxs("span", { className: "text-[10px] font-medium text-slate-400", children: [o.jsx("strong", { className: "text-slate-200", children: F }), " / ", O] }), o.jsxs("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${Q === 100 ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border border-indigo-500/20 bg-indigo-500/10 text-indigo-400"}`, children: [Q, "%"] })] })] }), G && o.jsx("div", { className: "space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2", children: k.length === 0 ? o.jsx("p", { className: "py-1 pl-5 text-[11px] text-slate-500", children: "\uC870\uAC74\uC5D0 \uC77C\uCE58\uD558\uB294 \uD0DC\uC2A4\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : k.map((D) => o.jsxs("button", { type: "button", onClick: () => T(D.lineIndex), style: { paddingLeft: `${D.indent * 12 + 8}px` }, className: "flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50", children: [o.jsx("span", { className: "mt-0.5 shrink-0 text-slate-400", children: D.completed ? o.jsx(Hn, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(Fn, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${D.completed ? "text-slate-500 line-through" : "text-slate-300"}`, children: D.text })] }, D.id)) })] }, `${C.name}-${N}`);
  }) }), p === "checklist" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5", children: g.categories.map((C, N) => {
    const O = C.tasks.filter(R);
    return O.length === 0 ? null : o.jsxs("div", { className: "space-y-1", children: [o.jsxs("div", { className: "sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400", children: [C.name, " (", O.length, ")"] }), O.map((F) => o.jsxs("button", { type: "button", onClick: () => T(F.lineIndex), style: { paddingLeft: `${F.indent * 10 + 6}px` }, className: "flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60", children: [o.jsx("span", { className: "mt-0.5 shrink-0", children: F.completed ? o.jsx(Hn, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(Fn, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${F.completed ? "text-slate-500 line-through" : "text-slate-200"}`, children: F.text })] }, F.id))] }, `${C.name}-list-${N}`);
  }) })] })] });
}
const ts = "s3haim-checklist-progress-modal-position", Un = { leftVw: 58, topVh: 14 };
function Dc() {
  try {
    const e = localStorage.getItem(ts);
    if (!e) return { ...Un };
    const t = JSON.parse(e), n = Number(t == null ? void 0 : t.leftVw), r = Number(t == null ? void 0 : t.topVh);
    return !Number.isFinite(n) || !Number.isFinite(r) ? { ...Un } : { leftVw: Math.min(95, Math.max(0, n)), topVh: Math.min(95, Math.max(0, r)) };
  } catch {
    return { ...Un };
  }
}
function Ic({ leftVw: e, topVh: t }) {
  try {
    localStorage.setItem(ts, JSON.stringify({ leftVw: Math.min(95, Math.max(0, e)), topVh: Math.min(95, Math.max(0, t)) }));
  } catch {
  }
}
const ns = "(max-width: 768px)", _c = 5;
function Xr() {
  return typeof window < "u" && window.matchMedia(ns).matches;
}
function $c({ editorRef: e, onChange: t, open: n, onOpenChange: r }) {
  const [a, s] = i.useState(() => Dc()), [c, u] = i.useState(""), [p, m] = i.useState({ from: 0, to: 0 }), g = i.useRef({ active: false, startX: 0, startY: 0, startLeftVw: 0, startTopVh: 0 }), T = i.useCallback(() => {
    const { text: N, from: O, to: F } = pn(e);
    return u(N), m({ from: O, to: F }), N;
  }, [e]);
  i.useEffect(() => {
    if (n) {
      if (Xr()) {
        r == null ? void 0 : r(false);
        return;
      }
      T();
    }
  }, [n, T, r]), i.useEffect(() => {
    if (!n) return;
    const N = window.matchMedia(ns), O = (F) => {
      F.matches && (r == null ? void 0 : r(false));
    };
    return N.addEventListener("change", O), () => N.removeEventListener("change", O);
  }, [n, r]);
  const S = i.useCallback((N) => {
    if (N.button !== 0) return;
    N.preventDefault();
    const O = N.clientX, F = N.clientY;
    g.current = { active: true, startX: O, startY: F, startLeftVw: a.leftVw, startTopVh: a.topVh };
    const Q = (k) => {
      if (!g.current.active) return;
      Math.hypot(k.clientX - O, k.clientY - F) <= _c;
      const D = window.innerWidth || 1, Z = window.innerHeight || 1, E = (k.clientX - g.current.startX) / D * 100, A = (k.clientY - g.current.startY) / Z * 100;
      s({ leftVw: Math.min(92, Math.max(0, g.current.startLeftVw + E)), topVh: Math.min(90, Math.max(0, g.current.startTopVh + A)) });
    }, G = () => {
      g.current.active && (g.current.active = false, document.removeEventListener("pointermove", Q), document.removeEventListener("pointerup", G), s((k) => (Ic(k), k)));
    };
    document.addEventListener("pointermove", Q), document.addEventListener("pointerup", G);
  }, [a.leftVw, a.topVh]), R = i.useCallback((N) => {
    u(N);
    const { view: O } = pn(e), { from: F, to: Q } = p;
    es(O, F, Q, N, t) && m({ from: F, to: F + N.length });
  }, [e, p, t]), C = () => {
    r == null ? void 0 : r(false);
  };
  return !n || Xr() ? null : o.jsxs("div", { className: "fixed z-[10050] w-[min(92vw,440px)] rounded-lg border border-indigo-400/40 bg-slate-950/95 shadow-2xl backdrop-blur-md", style: { left: `${a.leftVw}vw`, top: `${a.topVh}vh` }, role: "dialog", "aria-modal": "false", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: [o.jsxs("div", { className: "flex cursor-grab items-center justify-between gap-2 border-b border-indigo-500/30 bg-indigo-950/50 px-3 py-2 active:cursor-grabbing", onPointerDown: S, children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-indigo-100", children: [o.jsx(qo, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), o.jsx(pr, { size: 16, className: "shrink-0", "aria-hidden": true }), o.jsx("span", { className: "truncate", children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960" })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [o.jsxs("button", { type: "button", onPointerDown: (N) => N.stopPropagation(), onClick: T, className: "inline-flex items-center gap-1 rounded px-1.5 py-1 text-[11px] text-indigo-200 hover:bg-indigo-900/50", title: "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", "aria-label": "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", children: [o.jsx(cl, { size: 14 }), o.jsx("span", { className: "hidden sm:inline", children: "\uC0C8\uB85C\uACE0\uCE68" })] }), o.jsx("button", { type: "button", onPointerDown: (N) => N.stopPropagation(), onClick: C, className: "rounded p-1 text-indigo-200 hover:bg-indigo-900/50", title: "\uB2EB\uAE30", "aria-label": "\uB2EB\uAE30", children: o.jsx(Ut, { size: 15 }) })] })] }), o.jsx("div", { className: "max-h-[min(72vh,640px)] overflow-y-auto p-3", children: c.trim() ? o.jsx(Ac, { markdown: c, onMarkdownChange: R }) : o.jsxs("p", { className: "rounded-lg border border-dashed border-slate-700 bg-slate-900/60 px-3 py-6 text-center text-xs text-slate-400", children: ["\uC5D0\uB514\uD130\uC5D0\uC11C \uCCB4\uD06C\uB9AC\uC2A4\uD2B8\uAC00 \uD3EC\uD568\uB41C \uD14D\uC2A4\uD2B8\uB97C \uC120\uD0DD\uD55C \uB4A4", o.jsx("br", {}), "\uD234\uBC14 \uBC84\uD2BC\uC744 \uB204\uB974\uAC70\uB098 \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694."] }) })] });
}
const Hc = "(max-width: 768px)";
function Fc() {
  return typeof window < "u" && window.matchMedia(Hc).matches;
}
function Oc({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item max-md:hidden", onClick: () => {
    Fc() || (e == null ? void 0 : e());
  }, title: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: o.jsx(pr, { className: "md-editor-icon", size: 16 }) });
}
function Bc({ value: e = "", theme: t = "light", currentFile: n = null, disabled: r, trigger: a }) {
  const s = Ao(), c = i.useCallback(() => {
    r || (Oo({ currentFile: n, editorContent: e }), s(Bo(n == null ? void 0 : n.id), { state: { value: e, theme: t, currentFile: n } }));
  }, [s, e, t, r, n]);
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: c, disabled: r, title: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", "aria-label": "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", children: a ?? o.jsx(ul, { className: "md-editor-icon", size: 16 }) });
}
function Vc({ editorRef: e }) {
  const t = i.useCallback(() => {
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
    const a = (_c2 = n.getEditorView) == null ? void 0 : _c2.call(n);
    a && (a.dispatch(a.state.replaceSelection(r)), (_d2 = a.focus) == null ? void 0 : _d2.call(a));
  }, [e]);
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: t, title: "Insert print page break (<pgbr/>)", "aria-label": "Insert print page break", children: o.jsx(dl, { className: "md-editor-icon", size: 16 }) });
}
function Kc({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", title: "\uCD5C\uB300 heading \uBCC0\uACBD", "aria-label": "\uCD5C\uB300 heading \uBCC0\uACBD", onClick: () => e(), children: o.jsx(fl, { className: "md-editor-icon", size: 16 }) });
}
const zc = [{ value: "selection", title: "\uC120\uD0DD \uC601\uC5ED", description: "\uD604\uC7AC \uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uB9CC \uBCC0\uACBD" }, { value: "document", title: "\uC804\uCCB4 \uBB38\uC11C", description: "\uBB38\uC11C \uC804\uCCB4 heading\uC744 \uBCC0\uACBD" }], Wc = [{ value: "flat", title: "1. \uD615\uC2DD", description: "\uCD5C\uB300 heading\uC744 \uD55C \uC790\uB9AC \uBC88\uD638\uB85C \uC2DC\uC791" }, { value: "nested", title: "2.1. \uD615\uC2DD", description: "heading \uC218\uC900\uB9CC\uD07C \uBC88\uD638\uB97C \uBD99\uC784" }], Uc = [{ value: 1, title: "1\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 1. / 1.1. \u2026" }, { value: 2, title: "2\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 2. / 2.1. \u2026" }], qc = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), Xc = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Yr = "z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function Yc({ isOpen: e, markdown: t, selectedMarkdown: n = "", onClose: r, onApply: a }) {
  const s = n.length > 0, [c, u] = i.useState("document"), [p, m] = i.useState(1), [g, T] = i.useState(false), [S, R] = i.useState("nested"), [C, N] = i.useState(1), O = c === "selection" ? n : t;
  i.useEffect(() => {
    if (!e) return;
    const k = s ? "selection" : "document";
    u(k), m(Rr(k === "selection" ? n : t)), T(false), R("nested"), N(1);
  }, [e, t, n, s]), i.useEffect(() => {
    if (!e) return;
    const k = (E) => {
      const A = E;
      return (A == null ? void 0 : A.closest) ? !!A.closest('.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]') : false;
    }, D = () => {
      const E = document.activeElement;
      E && k(E) && typeof E.blur == "function" && E.blur();
    };
    D();
    const Z = (E) => {
      if (E.metaKey || E.ctrlKey || E.altKey) return;
      const A = E.key;
      if (A >= "1" && A <= "9") {
        const z = Number(A);
        Pr(z) && (E.preventDefault(), E.stopPropagation(), E.stopImmediatePropagation(), m(z));
        return;
      }
      E.key === "Escape" || E.key === "Enter" || k(E.target) && (E.preventDefault(), E.stopPropagation(), E.stopImmediatePropagation(), D());
    };
    return window.addEventListener("keydown", Z, true), () => window.removeEventListener("keydown", Z, true);
  }, [e]);
  const F = i.useMemo(() => $a(O, p, { maxLevel: Dr, renumberOutline: g, outlineStyle: S, outlineStart: C }), [O, p, g, S, C]), Q = (k) => {
    if (k !== "selection" && k !== "document" || k === "selection" && !s) return;
    u(k), m(Rr(k === "selection" ? n : t));
  }, G = () => {
    if (!F.sourceMax) return;
    const k = Ba(O, p, { maxLevel: Dr, renumberOutline: g, outlineStyle: S, outlineStart: C });
    k !== O && a(k, c), r();
  };
  return o.jsx(Wt, { isOpen: e, onClose: r, onConfirm: G, contentClassName: "max-w-3xl", children: o.jsx(Go, { delayDuration: 250, skipDelayDuration: 0, children: o.jsxs("div", { className: "flex min-h-0 flex-1 flex-col p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uCD5C\uB300 heading \uBCC0\uACBD" }), o.jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-odp-muted", children: ["\uAC10\uC9C0\uB41C \uCD5C\uB300 heading\uC744 \uC120\uD0DD\uD55C \uB2E8\uACC4\uB85C \uBC14\uAFB8\uACE0, \uD558\uC704 heading\uB3C4 \uAC19\uC740 \uAC04\uACA9\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.", " ", "\uC22B\uC790 \uD0A4 1\u20139\uB85C \uCD5C\uB300 heading\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC801\uC6A9 \uBC94\uC704" }), o.jsx(Bn, { className: "flex items-center gap-2", value: c, onValueChange: Q, "aria-label": "\uCD5C\uB300 heading \uC801\uC6A9 \uBC94\uC704", children: zc.map((k) => {
    const D = c === k.value, Z = k.value === "selection" && !s;
    return o.jsx(Vn, { value: k.value, disabled: Z, className: ["flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", D ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: D ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: k.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: k.value === "selection" && !s ? "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" : k.description })] }) }, k.value);
  }) })] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("label", { htmlFor: "editor-heading-max", className: "mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading" }), o.jsxs(Ml, { value: String(p), onValueChange: (k) => {
    const D = Number(k);
    Pr(D) && m(D);
  }, children: [o.jsxs(Tl, { id: "editor-heading-max", "aria-label": "\uCD5C\uB300 heading", className: "inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [o.jsx(Ll, {}), o.jsx(Rl, { className: "text-gray-500", children: o.jsx(Xo, { size: 14 }) })] }), o.jsx(Pl, { children: o.jsx(Al, { className: "z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: o.jsx(Dl, { className: "p-1", children: Ha.map((k) => o.jsxs(Il, { value: String(k), className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [o.jsx(_l, { className: "absolute left-1.5 inline-flex items-center", children: o.jsx(wn, { size: 12 }) }), o.jsx($l, { children: `h${k}` })] }, k)) }) }) })] })] }), o.jsxs("div", { className: "mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft", children: [o.jsxs("div", { className: "flex items-center justify-between gap-3", children: [o.jsxs("div", { className: "min-w-0", children: [o.jsx("div", { className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: "outline \uBC88\uD638 \uB9DE\uCD94\uAE30" }), o.jsx("p", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC55E\uC758 1. / 2.1. \uAC19\uC740 \uBC88\uD638\uB97C \uD604\uC7AC heading \uC218\uC900\uC5D0 \uB9DE\uAC8C \uB2E4\uC2DC \uBD99\uC785\uB2C8\uB2E4." })] }), o.jsx(hr, { className: qc(g), checked: g, onCheckedChange: T, "aria-label": "outline \uBC88\uD638 \uB9DE\uCD94\uAE30", children: o.jsx(gr, { className: Xc }) })] }), g ? o.jsxs("div", { className: "mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60", children: [o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD" }), o.jsx(Bn, { className: "flex items-center gap-2", value: S, onValueChange: (k) => {
    (k === "flat" || k === "nested") && R(k);
  }, "aria-label": "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD", children: Wc.map((k) => {
    const D = S === k.value;
    return o.jsx(Vn, { value: k.value, className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", D ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: D ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: k.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: k.description })] }) }, k.value);
  }) })] }), o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), o.jsx(Bn, { className: "flex items-center gap-2", value: String(C), onValueChange: (k) => {
    k === "1" && N(1), k === "2" && N(2);
  }, "aria-label": "\uCD5C\uB300 heading \uC2DC\uC791 \uBC88\uD638", children: Uc.map((k) => {
    const D = C === k.value;
    return o.jsx(Vn, { value: String(k.value), className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", D ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: D ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: k.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: k.description })] }) }, k.value);
  }) })] })] }) : null] }), o.jsx("div", { className: "mt-4 min-h-0", children: F.rows.length ? o.jsx("div", { className: "max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-odp-borderSoft", children: o.jsxs("table", { className: "w-full table-fixed border-collapse text-left text-sm", children: [o.jsx("thead", { className: "sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft", children: o.jsxs("tr", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874 \uC81C\uBAA9" }), o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD\uB420 \uC81C\uBAA9" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD" })] }) }), o.jsx("tbody", { children: F.rows.map((k, D) => o.jsxs("tr", { className: "border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60", children: [o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(sr, { children: [o.jsx(ar, { asChild: true, children: o.jsx("span", { className: "block truncate", children: k.text || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(ir, { children: o.jsxs(lr, { side: "top", sideOffset: 6, className: Yr, children: [k.text || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(cr, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(sr, { children: [o.jsx(ar, { asChild: true, children: o.jsx("span", { className: "block truncate", children: k.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(ir, { children: o.jsxs(lr, { side: "top", sideOffset: 6, className: Yr, children: [k.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(cr, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted", children: ["h", k.from] }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: ["h", k.to] })] }, `${k.from}-${D}-${k.text}`)) })] }) }) : o.jsx("p", { className: "rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted", children: c === "selection" ? "\uC120\uD0DD \uC601\uC5ED\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBB38\uC11C\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) }), o.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [o.jsxs(Ar, { type: "button", variant: "secondary", size: "md", onClick: r, children: [o.jsx(Fa, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs(Ar, { type: "button", variant: "primary", size: "md", onClick: G, disabled: !F.sourceMax, children: [o.jsx(Oa, { size: 16 }), "\uC801\uC6A9"] })] })] }) }) });
}
function vn({ checked: e = false, onChange: t, theme: n = "light", title: r, ariaLabel: a, icon: s }) {
  const c = n === "dark", u = a || r;
  return o.jsx("span", { className: "md-editor-toolbar-item inline-flex items-center !w-auto !min-w-0 px-1", title: r, children: o.jsxs("label", { className: "inline-flex shrink-0 cursor-pointer select-none items-center gap-1", onMouseDown: (p) => {
    p.preventDefault();
  }, children: [o.jsx(s, { className: `md-editor-icon shrink-0 ${c ? "text-odp-muted" : "text-gray-500"}`, size: 16, "aria-hidden": true }), o.jsx(hr, { checked: e, onCheckedChange: (p) => t == null ? void 0 : t(!!p), "aria-label": u, className: ["relative h-4 w-7 rounded-full border-0 outline-none transition-colors", "focus-visible:ring-2 focus-visible:ring-blue-400", e ? "bg-blue-600 dark:bg-blue-500" : c ? "bg-odp-borderStrong" : "bg-gray-300"].join(" "), children: o.jsx(gr, { className: ["block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform", "data-[state=checked]:translate-x-3.5"].join(" ") }) })] }) });
}
function Gc({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(vn, { checked: e, onChange: t, theme: n, icon: ml, title: e ? "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8 \uCF1C\uC9D0" : "\uBAA9\uCC28 \uC81C\uBAA9 \uB9D0\uC904\uC784(...)", ariaLabel: "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8" });
}
function Jc({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(vn, { checked: e, onChange: t, theme: n, icon: pl, title: e ? "base64 \uC774\uBBF8\uC9C0 \uC811\uD798" : "base64 \uC774\uBBF8\uC9C0 \uD3BC\uCE68", ariaLabel: "base64 \uC774\uBBF8\uC9C0 \uC811\uAE30" });
}
function Zc({ checked: e = true, onChange: t, theme: n = "light" }) {
  return o.jsx(vn, { checked: e, onChange: t, theme: n, icon: Yo, title: e ? "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uCF1C\uC9D0" : "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uAEBC\uC9D0", ariaLabel: "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C" });
}
function Qc({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(vn, { checked: e, onChange: t, theme: n, icon: hl, title: e ? "Mirror Edit on \u2014 dual caret + instant preview sync" : "Mirror Edit off", ariaLabel: "Mirror Edit" });
}
function eu({ onRequestLink: e, onRequestUpload: t, onRequestClip: n, disabled: r = false }) {
  const [a, s] = i.useState(false), c = i.useRef(null), u = i.useRef(null), p = i.useCallback(() => s(false), []);
  return o.jsxs(o.Fragment, { children: [o.jsx(As, { title: "\uC774\uBBF8\uC9C0", visible: a, onChange: s, disabled: r, overlay: o.jsxs("ul", { className: "md-editor-menu", role: "menu", onClick: p, children: [o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => e(), onKeyDown: (m) => {
    (m.key === "Enter" || m.key === " ") && (m.preventDefault(), e());
  }, children: "\uB9C1\uD06C \uCD94\uAC00" }), o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => {
    var _a2;
    return (_a2 = c.current) == null ? void 0 : _a2.click();
  }, onKeyDown: (m) => {
    var _a2;
    (m.key === "Enter" || m.key === " ") && (m.preventDefault(), (_a2 = c.current) == null ? void 0 : _a2.click());
  }, children: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC" }), o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => {
    var _a2;
    return (_a2 = u.current) == null ? void 0 : _a2.click();
  }, onKeyDown: (m) => {
    var _a2;
    (m.key === "Enter" || m.key === " ") && (m.preventDefault(), (_a2 = u.current) == null ? void 0 : _a2.click());
  }, children: "\uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC" })] }), children: o.jsx(gl, { className: "md-editor-icon", size: 16, "aria-hidden": true }) }), o.jsx("input", { ref: c, type: "file", accept: "image/*", multiple: true, className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (m) => {
    const g = Array.from(m.target.files || []);
    m.target.value = "", g.length && t(g);
  } }), o.jsx("input", { ref: u, type: "file", accept: "image/*", className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (m) => {
    var _a2;
    const g = (_a2 = m.target.files) == null ? void 0 : _a2[0];
    m.target.value = "", g && n(g);
  } })] });
}
function tu({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, a] = i.useState(""), [s, c] = i.useState(""), [u, p] = i.useState("");
  i.useEffect(() => {
    e && (a(""), c(""), p(""));
  }, [e]);
  const m = () => {
    const g = s.trim();
    if (!g) {
      p("\uC774\uBBF8\uC9C0 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ desc: r.trim(), url: g }), t();
  };
  return o.jsx(Wt, { isOpen: e, onClose: t, onConfirm: m, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C" }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC124\uBA85 (alt)" }), o.jsx("input", { type: "text", value: r, onChange: (g) => a(g.target.value), placeholder: "\uC120\uD0DD", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL" }), o.jsx("input", { type: "text", value: s, onChange: (g) => c(g.target.value), placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), u ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: u }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(Ut, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: m, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(wn, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function nu({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, a] = i.useState(""), [s, c] = i.useState(""), [u, p] = i.useState(""), m = i.useRef(null);
  i.useEffect(() => {
    if (!e) return;
    a(""), c(""), p("");
    const S = window.setTimeout(() => {
      var _a2;
      return (_a2 = m.current) == null ? void 0 : _a2.focus();
    }, 40);
    return () => window.clearTimeout(S);
  }, [e]);
  const g = () => {
    const S = r.trim(), R = s.trim();
    if (!S && !R) {
      p("\uAC01\uC8FC \uC81C\uBAA9 \uB610\uB294 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ line1: S, line2: R }), t();
  }, T = (S) => {
    S.key === "Enter" && (!(S.metaKey || S.ctrlKey) || S.altKey || S.shiftKey || S.nativeEvent.isComposing || S.keyCode === 229 || (S.preventDefault(), S.stopPropagation(), g()));
  };
  return o.jsx(Wt, { isOpen: e, onClose: t, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uAC01\uC8FC \uC0BD\uC785" }), o.jsxs("p", { className: "text-xs leading-5 text-gray-500 dark:text-odp-muted", children: ["\uCCAB \uC904\uC740 \uC81C\uBAA9, \uB458\uC9F8 \uC904\uC740 URL\uC785\uB2C8\uB2E4. \uBCF8\uBB38 \uCEE4\uC11C\uC5D0", " ", o.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "[^N]" }), "\uC774 \uB4E4\uC5B4\uAC00\uACE0, \uBB38\uC11C \uD558\uB2E8 Sources\uC5D0 \uB450 \uC904\uC774 \uCD94\uAC00\uB429\uB2C8\uB2E4. Ctrl+Enter \uB610\uB294 \u2318+Enter\uB85C \uC0BD\uC785\uD569\uB2C8\uB2E4."] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC81C\uBAA9 (1\uC904)" }), o.jsx("input", { ref: m, type: "text", value: r, onChange: (S) => {
    a(S.target.value), u && p("");
  }, onKeyDown: T, placeholder: "\uC608: docs.docker.com - Compose services", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL (2\uC904)" }), o.jsx("input", { type: "text", value: s, onChange: (S) => {
    c(S.target.value), u && p("");
  }, onKeyDown: T, placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), u ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: u }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(Ut, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: g, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(wn, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function ru({ isOpen: e, file: t, onClose: n, onConfirm: r }) {
  const [a, s] = i.useState("");
  return i.useEffect(() => {
    if (!e || !t) {
      s("");
      return;
    }
    const c = URL.createObjectURL(t);
    return s(c), () => {
      URL.revokeObjectURL(c);
    };
  }, [e, t]), o.jsx(Wt, { isOpen: e && !!t, onClose: n, contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: a ? o.jsx(Xl, { imageSrc: a, ...(t == null ? void 0 : t.name) ? { fileName: t.name } : {}, onCancel: n, onConfirm: r }) : null });
}
const rs = "s3haim_md_editor_base64_image_fold";
function os() {
  if (typeof window > "u") return true;
  try {
    const e = window.localStorage.getItem(rs);
    return e === null ? true : e === "1";
  } catch {
    return true;
  }
}
function ou(e) {
  if (!(typeof window > "u")) try {
    window.localStorage.setItem(rs, e ? "1" : "0");
  } catch {
  }
}
function su() {
  const [e, t] = i.useState(os), n = i.useCallback((r) => {
    t((a) => {
      const s = typeof r == "function" ? r(a) : !!r;
      return ou(s), s;
    });
  }, []);
  return [e, n];
}
function au() {
  const [e, t] = i.useState(Vo);
  i.useEffect(() => Va((r) => {
    t(r);
  }), []);
  const n = i.useCallback((r) => {
    t((a) => {
      const s = typeof r == "function" ? r(a) : !!r;
      return Ka(s), s;
    });
  }, []);
  return [e, n];
}
function iu() {
  const [e, t] = i.useState(za);
  i.useEffect(() => Wa((r) => {
    t(r);
  }), []);
  const n = i.useCallback((r) => {
    t((a) => {
      const s = typeof r == "function" ? r(a) : !!r;
      return Ua(s), s;
    });
  }, []);
  return [e, n];
}
const lu = 48, Gr = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi, ss = _o.define(), as = _o.define(), is = new Io();
function cu(e) {
  const t = [];
  Gr.lastIndex = 0;
  let n;
  for (; (n = Gr.exec(e)) !== null; ) {
    const r = n[1] ?? "image", a = n[2] ?? "";
    if (a.length < lu) continue;
    const s = n[0], c = s.length - a.length, u = n.index + c;
    t.push({ from: u, to: n.index + s.length, mime: r });
  }
  return t;
}
function uu(e, t) {
  const n = Math.round(t * 3 / 4), r = n >= 1024 * 1024 ? `${(n / (1024 * 1024)).toFixed(1)}MB` : n >= 1024 ? `${Math.max(1, Math.round(n / 1024))}KB` : `${n}B`;
  return `\u2026${e} ${r}\u2026`;
}
class du extends Is {
  constructor(t, n, r) {
    super(), this.label = t, this.from = n, this.to = r;
  }
  toDOM(t) {
    const n = document.createElement("span");
    return n.textContent = this.label, n.className = "cm-base64-image-fold", n.title = "Click to expand base64 image data", n.addEventListener("mousedown", (r) => {
      r.preventDefault(), r.stopPropagation(), t.dispatch({ selection: { anchor: this.from }, effects: ss.of({ from: this.from, to: this.to }) }), t.focus();
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
function fu(e, t, n) {
  return e.some((r) => r.from === t && r.to === n);
}
function Jr(e, t) {
  const n = [], r = [];
  for (let a = 1; a <= e.doc.lines; a += 1) {
    const s = e.doc.line(a);
    for (const c of cu(s.text)) {
      const u = s.from + c.from, p = s.from + c.to;
      if (fu(t, u, p)) {
        r.push({ from: u, to: p });
        continue;
      }
      n.push(yr.replace({ widget: new du(uu(c.mime, p - u), u, p) }).range(u, p));
    }
  }
  return { deco: yr.set(n, true), expanded: r };
}
const ls = Ds.define({ create(e) {
  return Jr(e, []);
}, update(e, t) {
  let n = e.expanded;
  t.docChanged && n.length && (n = n.map(({ from: a, to: s }) => ({ from: t.changes.mapPos(a, 1), to: t.changes.mapPos(s, -1) })).filter(({ from: a, to: s }) => a < s));
  let r = n !== e.expanded;
  for (const a of t.effects) a.is(ss) ? (n = [{ from: a.value.from, to: a.value.to }], r = true) : a.is(as) && n.length > 0 && (n = [], r = true);
  return t.docChanged || r ? Jr(t.state, n) : e;
}, provide: (e) => Ft.decorations.from(e, (t) => t.deco) }), mu = Ft.domEventHandlers({ mousedown(e, t) {
  const n = t.state.field(ls, false);
  if (!n || n.expanded.length === 0) return false;
  const r = e.target;
  if (!(r instanceof Node) || !t.dom.contains(r)) return false;
  const a = t.posAtDOM(r, 0);
  return a !== -1 && n.expanded.some(({ from: s, to: c }) => a >= s && a <= c) || t.dispatch({ effects: as.of(null) }), false;
} });
function cs() {
  return [ls, mu];
}
function pu(e) {
  return is.of(e ? cs() : []);
}
function hu(e, t) {
  if (e) try {
    e.dispatch({ effects: is.reconfigure(t ? cs() : []) });
  } catch {
  }
}
const hn = /* @__PURE__ */ new Set();
function gu(e) {
  return hn.add(e), () => {
    hn.delete(e);
  };
}
function xu(e) {
  if (!(!e.selectionSet && !e.docChanged) && !(e.view.composing || e.view.compositionStarted) && hn.size !== 0) for (const t of hn) try {
    t(e.view, e);
  } catch {
  }
}
const bu = `<br/>
`;
function wu(e) {
  if (!ya() || !(e == null ? void 0 : e.state)) return false;
  const t = e.state.selection.main, n = bu;
  return e.dispatch({ changes: { from: t.from, to: t.to, insert: n }, selection: Ge.cursor(t.from + n.length), scrollIntoView: true }), true;
}
const Zr = 80, yu = 350;
function Qr(e) {
  return JSON.stringify(e);
}
function eo(e) {
  try {
    const t = JSON.parse(e);
    return !t || typeof t != "object" || !t.meta || typeof t.meta != "object" || !t.grid || !Array.isArray(t.grid.rows) ? null : t;
  } catch {
    return null;
  }
}
function vu(e) {
  return !Array.isArray(e) || e.length === 0 ? [] : e.length <= Zr ? e : e.slice(e.length - Zr);
}
function ku(e, t, n) {
  const r = Array.isArray(e) && e.length > 0 ? e : [];
  if (r.length === 0) return { stack: [n], index: 0, changed: true };
  const a = Math.max(0, Math.min(t, r.length - 1));
  if (r[a] === n) return { stack: r, index: a, changed: false };
  const s = r.slice(0, a + 1);
  s.push(n);
  const c = vu(s);
  return { stack: c, index: c.length - 1, changed: true };
}
function Su({ enabled: e, historyKey: t, meta: n, grid: r, applySnapshot: a }) {
  const s = i.useRef([]), c = i.useRef(0), u = i.useRef(false), p = i.useRef(false), m = i.useRef(null), g = i.useRef(null), T = i.useRef(a);
  T.current = a;
  const [S, R] = i.useState(0), C = i.useCallback(() => R((E) => E + 1), []), N = i.useCallback(() => {
    m.current && (clearTimeout(m.current), m.current = null);
  }, []), O = i.useCallback(() => Qr({ meta: n, grid: r }), [r, n]), F = i.useCallback(() => {
    N();
    const E = g.current;
    if (E == null) return;
    g.current = null;
    const A = ku(s.current, c.current, E);
    A.changed && (s.current = A.stack, c.current = A.index, C());
  }, [C, N]);
  i.useEffect(() => {
    if (!e) {
      N(), g.current = null, s.current = [], c.current = 0, p.current = false, C();
      return;
    }
    if (t <= 0) return;
    N(), g.current = null;
    const E = Qr({ meta: n, grid: r });
    s.current = [E], c.current = 0, p.current = true, C();
  }, [e, t, C, N]), i.useEffect(() => {
    if (!e || !p.current || u.current) return;
    const E = O();
    if (s.current[c.current] !== E) return g.current = E, N(), m.current = setTimeout(() => {
      m.current = null, F();
    }, yu), () => {
      N();
    };
  }, [N, O, e, F, r, n]);
  const Q = i.useCallback(() => {
    !e || !p.current || u.current || (g.current = O(), F());
  }, [O, e, F]), G = i.useCallback(() => {
    if (F(), c.current <= 0) return false;
    c.current -= 1;
    const E = s.current[c.current], A = E ? eo(E) : null;
    return A ? (u.current = true, T.current(A), C(), requestAnimationFrame(() => {
      u.current = false;
    }), true) : false;
  }, [C, F]), k = i.useCallback(() => {
    if (F(), c.current >= s.current.length - 1) return false;
    c.current += 1;
    const E = s.current[c.current], A = E ? eo(E) : null;
    return A ? (u.current = true, T.current(A), C(), requestAnimationFrame(() => {
      u.current = false;
    }), true) : false;
  }, [C, F]), D = e && p.current && c.current > 0, Z = e && p.current && c.current < s.current.length - 1;
  return { undo: G, redo: k, canUndo: D, canRedo: Z, recordNow: Q, flushPendingRecord: F };
}
const Eu = ["thead", "tbody", "tfoot"], qn = 10, to = 36, no = 44, Nt = 4, rn = 14, Cu = "h-3.5 w-3.5 shrink-0", fe = "h-3 w-3 shrink-0", Xn = "__none__", Nu = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), ju = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", ro = 288, us = 200, Mu = 480, Tu = 380, Lu = 560, oo = 16, It = 6, Ru = [{ value: "full", label: "\uD398\uC774\uC9C0 \uC804\uCCB4 (full)" }, { value: "fit", label: "\uB0B4\uC6A9\uB9CC\uD07C (fit)" }], Pu = [{ value: "left", label: "\uC67C\uCABD" }, { value: "right", label: "\uC624\uB978\uCABD" }], Au = "pointer-events-none z-100050 max-w-[240px] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", Du = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", so = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", ds = typeof navigator < "u" && (/Mac|iPhone|iPad|iPod/i.test(navigator.platform) || /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent ?? "")), gt = ds ? "\u2318" : "Ctrl", Iu = `${gt}+E`, _u = `${gt}+Shift+E`, $u = `${gt}+Shift+>`, Hu = `${gt}+Shift+<`, Yn = `${gt}+Z`, Gn = ds ? `${gt}+Shift+Z` : `${gt}+Y`, Fu = 14;
function Ou(e, t, n = Fu) {
  const r = (e || "").trim(), a = /^(\d+(?:\.\d+)?)(px|%|em|rem|pt)?$/i.exec(r), s = ((a == null ? void 0 : a[2]) || "px").toLowerCase(), c = a ? Number(a[1]) : n, u = s === "em" || s === "rem" ? 0.1 : 1, p = s === "em" || s === "rem" ? 0.5 : s === "%" ? 50 : 8;
  let m = (Number.isFinite(c) ? c : n) + t * u;
  return m = Math.max(p, m), s === "em" || s === "rem" ? m = Math.round(m * 10) / 10 : m = Math.round(m), `${m}${s}`;
}
function ht({ icon: e, children: t }) {
  return o.jsxs("span", { className: "inline-flex items-center gap-1", children: [o.jsx("span", { className: "inline-flex shrink-0 text-gray-400 dark:text-odp-muted", "aria-hidden": true, children: e }), t] });
}
function kt(e) {
  return Math.min(Mu, Math.max(us, Math.round(e)));
}
function ao({ onDelta: e, ariaLabel: t }) {
  const n = i.useRef(0);
  return o.jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": t, className: "group relative hidden w-1.5 shrink-0 cursor-col-resize touch-none select-none landscape:flex", onPointerDown: (r) => {
    r.preventDefault(), r.stopPropagation(), r.currentTarget.setPointerCapture(r.pointerId), n.current = r.clientX;
  }, onPointerMove: (r) => {
    if (!r.currentTarget.hasPointerCapture(r.pointerId)) return;
    const a = r.clientX - n.current;
    n.current = r.clientX, a !== 0 && e(a);
  }, onPointerUp: (r) => {
    r.currentTarget.hasPointerCapture(r.pointerId) && r.currentTarget.releasePointerCapture(r.pointerId);
  }, onPointerCancel: (r) => {
    r.currentTarget.hasPointerCapture(r.pointerId) && r.currentTarget.releasePointerCapture(r.pointerId);
  }, children: o.jsx("span", { className: "absolute inset-y-2 left-1/2 w-px -translate-x-1/2 rounded-full bg-gray-300 transition-colors group-hover:bg-blue-400 group-active:bg-blue-500 dark:bg-odp-borderStrong dark:group-hover:bg-blue-400", "aria-hidden": true }) });
}
function Bu(e, t) {
  return e === 0 ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC704\uC5D0 \uD589 \uCD94\uAC00" : e === t ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC544\uB798\uC5D0 \uD589 \uCD94\uAC00" : `\uB354\uBE14\uD074\uB9AD: ${e}\uD589 \uC704\uC5D0 \uD589 \uCD94\uAC00`;
}
function Vu(e, t) {
  return e === 0 ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC55E\uC5D0 \uC5F4 \uCD94\uAC00" : e === t ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uB4A4\uC5D0 \uC5F4 \uCD94\uAC00" : `\uB354\uBE14\uD074\uB9AD: ${e}\uC5F4 \uC55E\uC5D0 \uC5F4 \uCD94\uAC00`;
}
function io(e) {
  return e === "row" ? "\uB4DC\uB798\uADF8: \uD589 \uB192\uC774 \uC870\uC808" : "\uB4DC\uB798\uADF8: \uC5F4 \uB108\uBE44 \uC870\uC808";
}
function lo(e, t, n, r, a, s) {
  const c = r.left - a.left, u = t - a.top, p = r.width, m = Math.min(Math.max(n - a.left, c), c + p);
  return { kind: "row", index: e, x: m, y: u, edge: { left: c, top: u - Nt / 2, width: p, height: Nt }, ghost: { left: c, top: u - to / 2, width: p, height: to }, label: Bu(e, s) };
}
function co(e, t, n, r, a, s) {
  const c = r.top - a.top, u = t - a.left, p = r.height, m = Math.min(Math.max(n - a.top, c), c + p);
  return { kind: "col", index: e, x: u, y: m, edge: { left: u - Nt / 2, top: c, width: Nt, height: p }, ghost: { left: u - no / 2, top: c, width: no, height: p }, label: Vu(e, s) };
}
function Ku({ tip: e, onDoubleClick: t, style: n }) {
  return o.jsxs(sr, { open: true, children: [o.jsx(ar, { asChild: true, children: o.jsx("button", { type: "button", "aria-label": e, style: n, onClick: (r) => {
    r.preventDefault(), r.stopPropagation();
  }, onDoubleClick: (r) => {
    r.preventDefault(), r.stopPropagation(), t();
  }, onMouseDown: (r) => {
    r.preventDefault(), r.stopPropagation();
  }, onPointerDown: (r) => {
    r.preventDefault(), r.stopPropagation();
  }, "data-haim-edge-add": "", className: "haim-table-insert-btn pointer-events-auto absolute z-30 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-400/80 bg-white text-blue-600 shadow-sm hover:bg-blue-50 dark:border-blue-400/70 dark:bg-odp-surface dark:text-blue-300 dark:hover:bg-blue-950/60", children: o.jsx(Nl, { className: "h-3 w-3", "aria-hidden": true }) }) }), o.jsx(ir, { children: o.jsxs(lr, { className: Au, side: "top", sideOffset: 8, children: [e, o.jsx(cr, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function zu({ insert: e, tip: t, allowResize: n, onDoubleClickInsert: r, onResizePointerDown: a }) {
  const s = e.kind === "row", c = s ? { left: e.edge.left, top: e.edge.top + Nt / 2 - rn / 2, width: e.edge.width, height: rn } : { left: e.edge.left + Nt / 2 - rn / 2, top: e.edge.top, width: rn, height: e.edge.height };
  return o.jsx("div", { role: "presentation", title: t, "data-haim-edge-hit": "", className: `pointer-events-auto absolute z-[25] ${n ? s ? "cursor-row-resize" : "cursor-col-resize" : "cursor-pointer"}`, style: { left: c.left, top: c.top, width: c.width, height: c.height }, onMouseDown: (u) => {
    u.preventDefault(), u.stopPropagation();
  }, onPointerDown: (u) => {
    if (u.preventDefault(), u.stopPropagation(), u.button !== 0 || u.detail >= 2 || !n) return;
    const p = u.clientX, m = u.clientY, g = u;
    let T = false;
    const S = () => {
      document.removeEventListener("pointermove", R, true), document.removeEventListener("pointerup", C, true), document.removeEventListener("pointercancel", C, true);
    }, R = (N) => {
      T || Math.abs(N.clientX - p) < 3 && Math.abs(N.clientY - m) < 3 || (T = true, S(), a(g));
    }, C = () => {
      S();
    };
    document.addEventListener("pointermove", R, true), document.addEventListener("pointerup", C, true), document.addEventListener("pointercancel", C, true);
  }, onDoubleClick: (u) => {
    u.preventDefault(), u.stopPropagation(), r();
  } });
}
function Wu({ insert: e }) {
  const t = `${e.kind}-${e.index}`;
  return o.jsxs("div", { "data-haim-insert-preview": "", className: "contents", children: [o.jsx("div", { "aria-hidden": true, className: `pointer-events-none absolute z-10 rounded-sm border border-transparent bg-blue-400/[0.04] dark:bg-blue-400/[0.06] ${e.kind === "row" ? "haim-table-insert-ghost-row" : "haim-table-insert-ghost-col"}`, style: { left: e.ghost.left, top: e.ghost.top, width: e.ghost.width, height: e.ghost.height } }, `ghost-${t}`), o.jsx("div", { "aria-hidden": true, className: "haim-table-insert-glow pointer-events-none absolute z-[11] rounded-full", style: { left: e.edge.left, top: e.edge.top, width: e.edge.width, height: e.edge.height } }, `glow-${t}`)] });
}
function Uu({ kind: e, indices: t, table: n, wrap: r, colCount: a }) {
  const [s, c] = i.useState([]);
  return i.useEffect(() => {
    if (!n || !r || !t.length) {
      c([]);
      return;
    }
    const u = () => {
      const p = r.getBoundingClientRect(), m = n.getBoundingClientRect(), g = [];
      if (e === "row") for (const T of t) {
        const S = n.rows[T];
        if (!S) continue;
        const R = S.getBoundingClientRect();
        g.push({ left: m.left - p.left, top: R.top - p.top, width: m.width, height: Math.max(1, R.height) });
      }
      else {
        const T = fs(n, a);
        for (const S of t) {
          const R = T[S], C = T[S + 1];
          R == null || C == null || g.push({ left: R - p.left, top: m.top - p.top, width: Math.max(1, C - R), height: m.height });
        }
      }
      c(g);
    };
    return u(), window.addEventListener("resize", u), () => window.removeEventListener("resize", u);
  }, [a, t, e, n, r]), s.length ? o.jsx("div", { "data-haim-delete-preview": "", className: "pointer-events-none absolute inset-0 z-20", "aria-hidden": true, children: s.map((u, p) => o.jsx("div", { className: "absolute rounded-sm bg-red-500/25 ring-1 ring-inset ring-red-500/50 dark:bg-red-500/30 dark:ring-red-400/40", style: { left: u.left, top: u.top, width: u.width, height: u.height } }, `${e}-${t[p] ?? p}`)) }) : null;
}
function qu(e) {
  const t = [...e.rows];
  if (!t.length) return [];
  const n = [];
  for (let r = 0; r < t.length; r += 1) n.push(t[r].getBoundingClientRect().top);
  return n.push(t[t.length - 1].getBoundingClientRect().bottom), n;
}
function fs(e, t) {
  const n = e.getBoundingClientRect(), r = [];
  for (let c = 0; c < t; c += 1) {
    const u = e.querySelectorAll(`[data-edit-c="${c}"]`);
    let p = null;
    u.forEach((m) => {
      const g = m.getBoundingClientRect();
      (p == null || g.left < p) && (p = g.left);
    }), p != null ? r.push(p) : r.push(n.left + n.width * c / Math.max(t, 1));
  }
  let a = n.right;
  return e.querySelectorAll(`[data-edit-c="${t - 1}"]`).forEach((c) => {
    const u = c.getBoundingClientRect();
    u.right > a && (a = u.right);
  }), r.push(a), r;
}
function Xu(e, t, n) {
  var _a2, _b;
  if (!n.length || typeof document > "u") return null;
  const a = (_b = (_a2 = document.elementFromPoint(e, t)) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "td[data-edit-r][data-edit-c]");
  if (!a) return null;
  const s = Number(a.getAttribute("data-edit-r")), c = Number(a.getAttribute("data-edit-c"));
  return !Number.isInteger(s) || !Number.isInteger(c) ? null : si(n, s, c);
}
function uo(e, t, n) {
  return e === "col" ? n.colspan > 1 && n.c < t && t < n.c + n.colspan : n.rowspan > 1 && n.r < t && t < n.r + n.rowspan;
}
function _t(e, t, n, r, a, s, c) {
  const u = e.getBoundingClientRect(), p = t.getBoundingClientRect(), m = qn + 2;
  if (n < u.left - m || n > u.right + m || r < u.top - m || r > u.bottom + m) return null;
  const g = qu(e), T = fs(e, s), S = Xu(n, r, c);
  let R = null;
  for (let N = 0; N < g.length; N += 1) {
    if (S && uo("row", N, S)) continue;
    const O = g[N], F = Math.abs(r - O);
    F <= qn && n >= u.left - m && n <= u.right + m && (!R || F < R.dist) && (R = { index: N, dist: F, y: O });
  }
  let C = null;
  for (let N = 0; N < T.length; N += 1) {
    if (S && uo("col", N, S)) continue;
    const O = T[N], F = Math.abs(n - O);
    F <= qn && r >= u.top - m && r <= u.bottom + m && (!C || F < C.dist) && (C = { index: N, dist: F, x: O });
  }
  return R && C ? R.dist <= C.dist ? lo(R.index, R.y, n, u, p, a) : co(C.index, C.x, r, u, p, s) : R ? lo(R.index, R.y, n, u, p, a) : C ? co(C.index, C.x, r, u, p, s) : null;
}
function Yu({ isOpen: e, initialMeta: t, initialGrid: n, onClose: r, onSave: a }) {
  var _a2, _b, _c2, _d2, _e2, _f2;
  const [s, c] = i.useState(dn()), [u, p] = i.useState(n), [m, g] = i.useState(null), [T, S] = i.useState(false), [R, C] = i.useState("thead"), [N, O] = i.useState([]), [F, Q] = i.useState(false), [G, k] = i.useState(null), [D, Z] = i.useState(null), [E, A] = i.useState(false), [z, ee] = i.useState(0), [ne, se] = i.useState(null), [le, ce] = i.useState(null), we = i.useRef(null), [J, V] = i.useState(null), te = J !== null, de = Ko(), [Ee, We] = i.useState(ro), [Fe, Ue] = i.useState(ro), [re, ue] = i.useState(false), [je, Ce] = i.useState(false), [$, B] = i.useState(() => typeof window < "u" ? window.innerWidth : 1280), [Y, q] = i.useState(() => typeof window < "u" ? window.matchMedia("(orientation: landscape)").matches : true), xe = i.useRef(null), ye = i.useRef(null), ve = i.useRef(null), he = i.useRef(null), Ne = i.useRef(false), Me = i.useRef(null), pe = i.useRef(null), Oe = i.useRef(false), Ae = i.useRef(false), qe = i.useRef({ x: 0, y: 0 });
  he.current = D, Ne.current = T, pe.current = m, Oe.current = re, Ae.current = te, we.current = le;
  const Be = i.useRef(t), ke = i.useRef(n);
  Be.current = t, ke.current = n, i.useEffect(() => {
    if (!e) return;
    const l = Be.current, d = ke.current;
    c(l ? { ...l } : dn()), p({ rows: d.rows.map((b) => [...b]), aligns: [...d.aligns] }), g(null), S(false), Me.current = null, Z(null), ue(false), Ce(false), V(null), ce(null), ee((b) => b + 1), qa().then((b) => O(b.templates)), Xa().then((b) => Ya(b));
  }, [e]);
  const Xe = i.useCallback((l) => {
    c(l.meta), p({ rows: l.grid.rows.map((d) => [...d]), aligns: [...l.grid.aligns ?? []] }), g(null), S(false), Me.current = null, Z(null);
  }, []), { undo: tt, redo: Ie, canUndo: nt, canRedo: rt, recordNow: bt } = Su({ enabled: e, historyKey: z, meta: s, grid: u, applySnapshot: Xe }), at = i.useRef(false);
  i.useEffect(() => {
    at.current && !E && bt(), at.current = E;
  }, [E, bt]), i.useEffect(() => {
    if (!e) return;
    const l = (d) => {
      if (!(d.metaKey || d.ctrlKey) || d.altKey) return;
      const M = d.key.toLowerCase(), v = M === "z" && !d.shiftKey, _ = M === "y" || M === "z" && d.shiftKey;
      !v && !_ || (d.preventDefault(), d.stopPropagation(), d.stopImmediatePropagation(), _ ? Ie() : tt());
    };
    return window.addEventListener("keydown", l, true), () => window.removeEventListener("keydown", l, true);
  }, [e, Ie, tt]), i.useEffect(() => {
    if (!e || typeof window > "u") return;
    const l = window.matchMedia("(orientation: landscape)"), d = () => {
      B(window.innerWidth), q(l.matches);
    };
    return d(), window.addEventListener("resize", d), l.addEventListener("change", d), () => {
      window.removeEventListener("resize", d), l.removeEventListener("change", d);
    };
  }, [e]);
  const Te = i.useMemo(() => Ga(s.merges), [s.merges]), j = u.rows.length, P = Math.max(1, ...u.rows.map((l) => l.length), u.aligns.length), U = i.useMemo(() => {
    if (!m) return [];
    const l = [], d = Math.min(m.r0, m.r1), b = Math.min(m.c0, m.c1), M = Math.max(m.r0, m.r1), v = Math.max(m.c0, m.c1);
    for (let _ = d; _ <= M; _ += 1) for (let X = b; X <= v; X += 1) Te.has(`${_},${X}`) || l.push({ r: _, c: X });
    return l;
  }, [m, Te]), ie = U[0] ?? null, De = !!ie, Ke = i.useRef(Ee), _e = i.useRef(Fe);
  Ke.current = Ee, _e.current = Fe;
  const Le = i.useMemo(() => {
    const l = $ * 0.95;
    return Math.max(us, l - oo - It - Tu);
  }, [$]), ot = i.useCallback((l) => {
    const d = Ke.current, b = _e.current, M = d + b;
    let v = kt(d + l), _ = kt(M - v);
    v = kt(M - _), _ = kt(M - v), We(v), Ue(_);
  }, []), it = i.useCallback((l) => {
    Ue((d) => {
      const b = kt(d + l);
      if (Ee + It + b <= Le) return b;
      const v = Le - Ee - It;
      return kt(v);
    });
  }, [Le, Ee]), Ze = i.useMemo(() => {
    const l = $ * 0.95;
    if (!Y) return { width: l, maxWidth: "95dvw", height: "95dvh", maxHeight: "95dvh" };
    const d = Ee + It + Fe;
    return { width: Math.min(l, oo + d + It + Lu), maxWidth: "95dvw", height: "95dvh", maxHeight: "95dvh" };
  }, [Fe, Y, Ee, $]), Pe = i.useMemo(() => ie ? s.cells[Je(ie.r, ie.c)] ?? {} : {}, [s.cells, ie]), Se = i.useCallback((l) => {
    U.length && c((d) => {
      const b = { ...d.cells };
      for (const { r: M, c: v } of U) {
        const _ = Je(M, v);
        Ir(l) ? delete b[_] : b[_] = l;
      }
      return { ...d, cells: b };
    });
  }, [U]), me = i.useCallback((l) => {
    p(l.grid), c(l.meta), g(null), S(false), Me.current = null, Z(null);
  }, []), Re = i.useRef(u), ze = i.useRef(s);
  Re.current = u, ze.current = s;
  const wt = i.useCallback((l) => {
    me(mc(Re.current, ze.current, l));
  }, [me]), yt = i.useCallback((l) => {
    me(pc(Re.current, ze.current, l));
  }, [me]), dt = i.useCallback((l) => {
    const d = pe.current;
    let b, M;
    if (d) b = Math.min(d.r0, d.r1), M = Math.max(d.r0, d.r1), l != null && (l < b || l > M) && (b = l, M = l);
    else if (l != null) b = l, M = l;
    else {
      const X = we.current;
      (X == null ? void 0 : X.kind) === "row" && X.indices.length && (ce(null), se({ kind: "row", indices: [...X.indices] }));
      return;
    }
    const v = [];
    for (let X = b; X <= M; X += 1) v.push(X);
    const _ = Re.current.rows.length;
    _ <= 1 || v.length === 0 || v.length >= _ || (ce(null), se({ kind: "row", indices: v }));
  }, []), Xt = i.useCallback((l) => {
    const d = pe.current;
    let b, M;
    if (d) b = Math.min(d.c0, d.c1), M = Math.max(d.c0, d.c1), l != null && (l < b || l > M) && (b = l, M = l);
    else if (l != null) b = l, M = l;
    else {
      const X = we.current;
      (X == null ? void 0 : X.kind) === "col" && X.indices.length && (ce(null), se({ kind: "col", indices: [...X.indices] }));
      return;
    }
    const v = [];
    for (let X = b; X <= M; X += 1) v.push(X);
    const _ = Math.max(1, ...Re.current.rows.map((X) => X.length), Re.current.aligns.length, 1);
    _ <= 1 || v.length === 0 || v.length >= _ || (ce(null), se({ kind: "col", indices: v }));
  }, []), Yt = i.useCallback((l) => {
    const d = pe.current;
    let b, M;
    d ? (b = Math.min(d.r0, d.r1), M = Math.max(d.r0, d.r1), (l < b || l > M) && (b = l, M = l)) : (b = l, M = l);
    const v = [];
    for (let X = b; X <= M; X += 1) v.push(X);
    const _ = Re.current.rows.length;
    if (_ <= 1 || v.length === 0 || v.length >= _) {
      ce(null);
      return;
    }
    ce({ kind: "row", indices: v });
  }, []), Gt = i.useCallback((l) => {
    const d = pe.current;
    let b, M;
    d ? (b = Math.min(d.c0, d.c1), M = Math.max(d.c0, d.c1), (l < b || l > M) && (b = l, M = l)) : (b = l, M = l);
    const v = [];
    for (let X = b; X <= M; X += 1) v.push(X);
    const _ = Math.max(1, ...Re.current.rows.map((X) => X.length), Re.current.aligns.length, 1);
    if (_ <= 1 || v.length === 0 || v.length >= _) {
      ce(null);
      return;
    }
    ce({ kind: "col", indices: v });
  }, []), lt = i.useCallback(() => {
    ce(null);
  }, []), Cn = i.useCallback(() => {
    ne && (ne.kind === "row" ? me(xc(Re.current, ze.current, ne.indices)) : me(bc(Re.current, ze.current, ne.indices)), se(null), ce(null));
  }, [me, ne]), Qe = !!(m && !(m.r0 === m.r1 && m.c0 === m.c1)), vt = i.useCallback(() => {
    !m || m.r0 === m.r1 && m.c0 === m.c1 || c((l) => ({ ...l, merges: Ja(l.merges, m.r0, m.c0, m.r1, m.c1) }));
  }, [m]), Lt = i.useCallback(() => {
    m && c((l) => ({ ...l, merges: Za(l.merges, m.r0, m.c0, m.r1, m.c1) }));
  }, [m]), Jt = i.useCallback((l) => {
    U.length && c((d) => {
      var _a3;
      const b = { ...d.cells }, M = (_a3 = d.style) == null ? void 0 : _a3.fontSize;
      for (const { r: v, c: _ } of U) {
        const X = Je(v, _), ge = b[X] ?? {};
        b[X] = { ...ge, fontSize: Ou(ge.fontSize ?? M, l) };
      }
      return { ...d, cells: b };
    });
  }, [U]);
  i.useEffect(() => {
    if (!e) return;
    const l = (d) => {
      if (!(!(d.metaKey || d.ctrlKey) || d.altKey)) {
        if (d.shiftKey) {
          const b = d.code === "Period" || d.key === ">" || d.key === ".", M = d.code === "Comma" || d.key === "<" || d.key === ",";
          if (b || M) {
            if (!U.length) return;
            d.preventDefault(), d.stopPropagation(), Jt(b ? 1 : -1);
            return;
          }
        }
        d.code !== "KeyE" && d.key.toLowerCase() !== "e" || (d.preventDefault(), d.stopPropagation(), d.shiftKey ? Lt() : vt());
      }
    };
    return window.addEventListener("keydown", l, true), () => window.removeEventListener("keydown", l, true);
  }, [e, vt, Jt, U.length, Lt]);
  const Nn = i.useCallback((l) => {
    var _a3, _b2;
    if (Ae.current) {
      Z(null);
      return;
    }
    if (T || E) {
      T && Z(null);
      return;
    }
    if ((_b2 = (_a3 = l.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-add], [data-haim-edge-hit]")) return;
    const d = ve.current, b = ye.current;
    if (!d || !b) return;
    const M = _t(d, b, l.clientX, l.clientY, j, P, s.merges);
    Z((v) => M ? v && v.kind === M.kind && v.index === M.index ? v.x === M.x && v.y === M.y ? v : { ...v, x: M.x, y: M.y } : M : null);
  }, [P, E, s.merges, T, j]), ft = i.useCallback((l, d) => {
    var _a3, _b2;
    if (d.index === 0 || Ae.current) return;
    l.preventDefault(), l.stopPropagation();
    const b = ve.current;
    if (!b) return;
    const M = d.index - 1;
    let v = 0, _ = 0;
    if (d.kind === "col") {
      const K = (_a3 = b.querySelector(`[data-edit-c="${M}"]`)) == null ? void 0 : _a3.getBoundingClientRect();
      if (!K) return;
      v = K.left;
    } else {
      const K = (_b2 = b.rows[M]) == null ? void 0 : _b2.getBoundingClientRect();
      if (!K) return;
      _ = K.top;
    }
    A(true), S(false), Z(null);
    const X = (st) => {
      let K = 24;
      d.kind === "col" ? K = st.clientX - v : K = st.clientY - _, K = Math.max(24, Math.round(K)), c((He) => d.kind === "col" ? { ...He, colWidths: _r(He.colWidths, M, K) } : { ...He, rowHeights: _r(He.rowHeights, M, K) });
    }, ge = () => {
      document.removeEventListener("pointermove", X, true), document.removeEventListener("pointerup", ge, true), document.removeEventListener("pointercancel", ge, true), A(false);
    };
    document.addEventListener("pointermove", X, true), document.addEventListener("pointerup", ge, true), document.addEventListener("pointercancel", ge, true);
  }, []), mt = i.useCallback((l, d, b) => {
    p((M) => {
      const v = Math.max(1, ...M.rows.map((ge) => ge.length), M.aligns.length), _ = M.rows.map((ge) => [...ge]);
      for (; _.length <= l; ) _.push(Array(v).fill(""));
      const X = [..._[l] ?? Array(v).fill("")];
      for (; X.length < v; ) X.push("");
      return X[d] = b, _[l] = X, { ...M, rows: _ };
    });
  }, []), Zt = i.useCallback((l, d) => {
    const b = ve.current;
    if (!b) return;
    const M = b.querySelector(`td[data-edit-r="${l}"][data-edit-c="${d}"] input`);
    M && (g({ r0: l, c0: d, r1: l, c1: d }), Me.current = { r: l, c: d }, S(false), Z(null), requestAnimationFrame(() => {
      M.focus(), M.select();
    }));
  }, []), et = i.useCallback((l, d) => {
    g({ r0: l, c0: d, r1: l, c1: d }), Me.current = { r: l, c: d }, S(false), Z(null);
  }, []), Qt = i.useCallback(() => {
    var _a3;
    g(null), S(false), Me.current = null;
    const l = document.activeElement;
    ((_a3 = l == null ? void 0 : l.closest) == null ? void 0 : _a3.call(l, "td[data-edit-r]")) && l.blur();
  }, []), en = i.useCallback((l, d) => {
    const b = Me.current;
    if (!b) {
      et(l, d);
      return;
    }
    g({ r0: b.r, c0: b.c, r1: l, c1: d }), S(false), Z(null);
  }, [et]), Rt = i.useCallback((l, d) => {
    var _a3;
    g({ r0: l, c0: d, r1: l, c1: d }), Me.current = { r: l, c: d }, S(true), Z(null);
    const b = document.activeElement;
    ((_a3 = b == null ? void 0 : b.closest) == null ? void 0 : _a3.call(b, "td[data-edit-r]")) && b.blur();
  }, []), f = i.useCallback((l, d) => {
    Ne.current && g((b) => b && { ...b, r1: l, c1: d });
  }, []);
  i.useEffect(() => {
    if (!T) return;
    const l = () => S(false);
    return window.addEventListener("mouseup", l, true), window.addEventListener("pointerup", l, true), () => {
      window.removeEventListener("mouseup", l, true), window.removeEventListener("pointerup", l, true);
    };
  }, [T]), i.useEffect(() => {
    if (!e) return;
    const l = (v) => {
      var _a3, _b2, _c3;
      const _ = v;
      if (!_) return false;
      const X = ((_b2 = (_a3 = _.tagName) == null ? void 0 : _a3.toLowerCase) == null ? void 0 : _b2.call(_a3)) ?? "";
      return X === "input" || X === "textarea" || X === "select" || _.isContentEditable ? true : !!((_c3 = _.closest) == null ? void 0 : _c3.call(_, 'input, textarea, select, [contenteditable="true"]'));
    }, d = (v) => {
      v.code !== "Space" && v.key !== " " || v.repeat || l(v.target) || pe.current || (v.preventDefault(), ue(true));
    }, b = (v) => {
      v.code !== "Space" && v.key !== " " || ue(false);
    }, M = () => ue(false);
    return window.addEventListener("keydown", d, true), window.addEventListener("keyup", b, true), window.addEventListener("blur", M), () => {
      window.removeEventListener("keydown", d, true), window.removeEventListener("keyup", b, true), window.removeEventListener("blur", M), ue(false);
    };
  }, [e]), i.useEffect(() => {
    m && ue(false);
  }, [m]);
  const h = i.useCallback(() => {
    Ce(false);
  }, []), x = i.useCallback((l) => {
    const d = xe.current;
    if (!d) return;
    const b = l.button === 1, M = l.button === 0 && re && !pe.current;
    if (b || M) {
      l.preventDefault(), l.stopPropagation(), Z(null), qe.current = { x: l.clientX, y: l.clientY }, Ce(true), d.setPointerCapture(l.pointerId);
      return;
    }
  }, [re]), w = i.useCallback((l) => {
    if (!je) return;
    const d = xe.current;
    if (!d) return;
    const b = l.clientX - qe.current.x, M = l.clientY - qe.current.y;
    qe.current = { x: l.clientX, y: l.clientY }, d.scrollLeft -= b, d.scrollTop -= M;
  }, [je]), y = i.useCallback((l) => {
    if (!je) return;
    const d = xe.current;
    (d == null ? void 0 : d.hasPointerCapture(l.pointerId)) && d.releasePointerCapture(l.pointerId), h();
  }, [h, je]), I = i.useCallback((l) => {
    if (l.button !== 0 || re || je) return;
    const d = l.target;
    d && (d.closest("[data-haim-table-sidebars]") || d.closest("[data-haim-table-canvas] table, [data-haim-edge-hit], [data-haim-edge-add], [data-haim-insert-preview]") || pe.current && Qt());
  }, [Qt, je, re]), L = i.useCallback((l, d, b, M) => {
    let v = l + b, _ = d + M;
    for (; v >= 0 && v < j && _ >= 0 && _ < P; ) {
      if (!Te.has(`${v},${_}`)) {
        Zt(v, _);
        return;
      }
      v += b, _ += M;
    }
  }, [P, Te, Zt, j]), H = i.useCallback((l, d, b) => {
    if (l.nativeEvent.isComposing) return;
    if (l.key === "Enter") {
      l.preventDefault(), l.stopPropagation(), l.shiftKey ? L(d, b, -1, 0) : L(d, b, 1, 0);
      return;
    }
    if (!l.altKey) return;
    let M = 0, v = 0;
    if (l.key === "ArrowUp") M = -1;
    else if (l.key === "ArrowDown") M = 1;
    else if (l.key === "ArrowLeft") v = -1;
    else if (l.key === "ArrowRight") v = 1;
    else return;
    l.preventDefault(), l.stopPropagation(), L(d, b, M, v);
  }, [L]), W = i.useMemo(() => {
    var _a3;
    return ie ? ((_a3 = u.rows[ie.r]) == null ? void 0 : _a3[ie.c]) ?? "" : "";
  }, [u.rows, ie]), oe = i.useMemo(() => s.templateId ? N.find((l) => l.id === s.templateId) ?? null : null, [s.templateId, N]), be = i.useCallback((l, d) => {
    const b = Qa({ row: l, col: d, rowCount: j, colCount: P, meta: s, template: oe }), M = {};
    return b.bg && (M.backgroundColor = b.bg), b.color && (M.color = b.color), b.fontFamily && (M.fontFamily = b.fontFamily), b.fontSize && (M.fontSize = b.fontSize), b.fontWeight && (M.fontWeight = b.fontWeight), M;
  }, [oe, P, s, j]), ae = (l, d) => {
    if (!m) return false;
    const b = Math.min(m.r0, m.r1), M = Math.min(m.c0, m.c1), v = Math.max(m.r0, m.r1), _ = Math.max(m.c0, m.c1);
    return l >= b && l <= v && d >= M && d <= _;
  }, $e = (l) => l === "thead" ? o.jsx(On, { className: fe, "aria-hidden": true }) : l === "tfoot" ? o.jsx(Br, { className: fe, "aria-hidden": true }) : o.jsx(Vr, { className: fe, "aria-hidden": true });
  return o.jsxs(o.Fragment, { children: [o.jsxs(Wt, { isOpen: e, onClose: () => {
    if (ne !== null) {
      se(null);
      return;
    }
    r();
  }, overlayClassName: "p-[2.5dvh]", contentClassName: "h-[95dvh] max-h-[95dvh] max-w-[95dvw]", contentStyle: Ze, resizeHeight: true, children: [o.jsxs(Hl, { className: "flex h-full min-h-0 flex-col", onSubmit: (l) => l.preventDefault(), onPointerDownCapture: I, children: [o.jsxs("header", { className: "flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-3 py-2 dark:border-odp-border", children: [o.jsxs("h2", { className: "inline-flex items-center gap-1.5 text-sm font-bold text-gray-800 dark:text-odp-fgStrong", children: [o.jsx(mn, { className: Cu, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1"] }), o.jsxs("div", { className: "flex items-center gap-2", children: [o.jsxs("button", { type: "button", disabled: !nt, title: `\uC2E4\uD589 \uCDE8\uC18C (${Yn})`, "aria-label": `\uC2E4\uD589 \uCDE8\uC18C (${Yn})`, onClick: () => tt(), className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(xl, { className: fe, "aria-hidden": true }), "\uC2E4\uD589 \uCDE8\uC18C"] }), o.jsxs("button", { type: "button", disabled: !rt, title: `\uB2E4\uC2DC \uC2E4\uD589 (${Gn})`, "aria-label": `\uB2E4\uC2DC \uC2E4\uD589 (${Gn})`, onClick: () => Ie(), className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(bl, { className: fe, "aria-hidden": true }), "\uB2E4\uC2DC \uC2E4\uD589"] }), o.jsxs("button", { type: "button", onClick: r, className: "inline-flex items-center gap-1 rounded px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(Ut, { className: fe, "aria-hidden": true }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: () => a(s, u), className: "inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700", children: [o.jsx(wn, { className: fe, "aria-hidden": true }), "\uC801\uC6A9"] })] })] }), o.jsxs("div", { className: "flex min-h-0 flex-1 flex-col landscape:flex-row", children: [o.jsxs("div", { "data-haim-table-sidebars": "", className: "order-2 flex max-h-[42%] min-h-0 w-full shrink-0 flex-col gap-2 overflow-hidden border-t border-gray-100 bg-gray-50/80 p-2 dark:border-odp-border dark:bg-odp-bgSoft/40 portrait:max-h-[42%] landscape:order-1 landscape:max-h-none landscape:w-auto landscape:flex-row landscape:gap-0 landscape:border-t-0 landscape:border-r-0", children: [o.jsxs("aside", { className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-surface landscape:flex-none landscape:shrink-0", style: Y ? { width: Ee } : void 0, children: [o.jsx("div", { className: "sticky top-0 z-[1] border-b border-gray-100 bg-white px-2.5 py-1.5 dark:border-odp-border dark:bg-odp-surface", children: o.jsxs("h3", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong", children: [o.jsx(mn, { className: fe, "aria-hidden": true }), "\uD45C \xB7 \uADF8\uB8F9"] }) }), o.jsxs("div", { className: "space-y-2 p-2.5", children: [o.jsxs("div", { className: "flex flex-wrap gap-2", children: [o.jsxs(ut, { name: "template", className: "flex min-w-0 flex-1 flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(pt, { asChild: true, children: o.jsx("span", { children: o.jsx(ht, { icon: o.jsx(Or, { className: fe }), children: "\uD15C\uD50C\uB9BF" }) }) }), o.jsx(Pn, { "aria-label": "\uD45C \uD15C\uD50C\uB9BF", value: s.templateId ?? Xn, onValueChange: (l) => {
    if (l === Xn) {
      c((b) => {
        const M = { ...b };
        return delete M.templateId, M;
      });
      return;
    }
    const d = N.find((b) => b.id === l);
    d && c((b) => ei(b, d));
  }, options: [{ value: Xn, label: "\uD15C\uD50C\uB9BF \uC5C6\uC74C" }, ...N.map((l) => ({ value: l.id, label: l.name }))], className: "w-full min-w-0" })] }), o.jsxs("button", { type: "button", className: "mt-auto inline-flex h-8 items-center gap-1 self-end rounded-md bg-gray-100 px-2 text-[11px] dark:bg-odp-bgSoft", onClick: () => {
    k({ id: `template-${Date.now().toString(36)}`, name: "\uC0C8 \uD15C\uD50C\uB9BF", sections: {}, rules: [] }), Q(true);
  }, children: [o.jsx(Or, { className: fe, "aria-hidden": true }), "\uAD00\uB9AC"] })] }), o.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [o.jsxs(ut, { name: "noHeader", className: "col-span-2 flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(pt, { asChild: true, children: o.jsx("span", { children: o.jsx(ht, { icon: o.jsx(On, { className: fe }), children: "noHeader" }) }) }), o.jsxs("label", { className: "flex cursor-pointer items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-2 py-1.5 dark:border-odp-borderSoft dark:bg-odp-surface", children: [o.jsx("span", { className: "min-w-0 text-[11px] leading-snug text-gray-600 dark:text-odp-muted", children: "thead/th \uC5C6\uC774 \uBAA8\uB450 tbody/td" }), o.jsx(hr, { className: Nu(!!s.noHeader), checked: !!s.noHeader, onCheckedChange: (l) => c((d) => {
    if (l) return { ...d, noHeader: true };
    const { noHeader: b, ...M } = d;
    return M;
  }), "aria-label": "noHeader", children: o.jsx(gr, { className: ju }) })] })] }), o.jsxs(ut, { name: "headerRows", className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${s.noHeader ? "opacity-40" : ""}`, children: [o.jsx(pt, { asChild: true, children: o.jsx("span", { children: o.jsx(ht, { icon: o.jsx(On, { className: fe }), children: "headerRows" }) }) }), o.jsx(nn, { asChild: true, children: o.jsx("input", { type: "number", min: 0, max: j, value: s.headerRows, disabled: !!s.noHeader, onChange: (l) => c((d) => ({ ...d, headerRows: Math.max(0, Number(l.target.value) || 0) })), className: An }) })] }), o.jsxs(ut, { name: "footerRows", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(pt, { asChild: true, children: o.jsx("span", { children: o.jsx(ht, { icon: o.jsx(Br, { className: fe }), children: "footerRows" }) }) }), o.jsx(nn, { asChild: true, children: o.jsx("input", { type: "number", min: 0, max: j, value: s.footerRows, onChange: (l) => c((d) => ({ ...d, footerRows: Math.max(0, Number(l.target.value) || 0) })), className: An }) })] }), o.jsxs(ut, { name: "width", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(pt, { asChild: true, children: o.jsx("span", { children: o.jsx(ht, { icon: o.jsx(wl, { className: fe }), children: "\uB108\uBE44" }) }) }), o.jsx(Pn, { "aria-label": "\uD45C \uB108\uBE44", value: s.width, onValueChange: (l) => c((d) => ({ ...d, width: l === "fit" ? "fit" : "full" })), options: [...Ru], className: "w-full" })] }), o.jsxs(ut, { name: "align", className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${s.width !== "fit" ? "opacity-40" : ""}`, children: [o.jsx(pt, { asChild: true, children: o.jsx("span", { children: o.jsx(ht, { icon: s.align === "right" ? o.jsx(yl, { className: fe }) : o.jsx(vl, { className: fe }), children: "\uC815\uB82C" }) }) }), o.jsx(Pn, { "aria-label": "\uD45C \uC815\uB82C", value: s.align, disabled: s.width !== "fit", onValueChange: (l) => c((d) => ({ ...d, align: l === "right" ? "right" : "left" })), options: [...Pu], className: "w-full" })] })] }), o.jsxs("div", { className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border", children: [o.jsx("p", { className: "text-[10px] font-medium text-gray-600 dark:text-odp-muted", children: "\uD45C \uAE30\uBCF8 \uD3F0\uD2B8\xB7\uC2A4\uD0C0\uC77C" }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: "\uC140\xB7\uADF8\uB8F9 \uAC12\uC774 \uC788\uC73C\uBA74 \uADF8\uCABD\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4." }), o.jsx(Kn, { compact: true, idPrefix: "table-edit-table", value: s.style ?? {}, onChange: (l) => c((d) => ({ ...d, style: Ir(l) ? {} : l })) })] }), o.jsxs("div", { className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border", children: [o.jsxs("p", { className: "inline-flex items-center gap-1 text-[10px] font-medium text-gray-600 dark:text-odp-muted", children: [o.jsx(Vr, { className: fe, "aria-hidden": true }), "\uADF8\uB8F9 \uC2A4\uD0C0\uC77C"] }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: "thead / tbody / tfoot \uAD6C\uC5ED" }), o.jsx("div", { className: "mb-1 flex flex-wrap gap-1", children: Eu.map((l) => o.jsxs("button", { type: "button", onClick: () => C(l), className: `inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] ${R === l ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-odp-bgSoft"}`, children: [$e(l), l] }, l)) }), o.jsx(Kn, { compact: true, idPrefix: `table-edit-${R}`, value: s.sections[R] ?? {}, onChange: (l) => c((d) => ({ ...d, sections: { ...d.sections, [R]: l } })) })] })] })] }), o.jsx(ao, { ariaLabel: "\uD45C \uC0AC\uC774\uB4DC\uBC14\uC640 \uC140 \uC0AC\uC774\uB4DC\uBC14 \uC0AC\uC774 \uB108\uBE44 \uC870\uC808", onDelta: ot }), o.jsx("aside", { "aria-hidden": !De, className: `flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-blue-200 bg-white dark:border-blue-900/50 dark:bg-odp-surface landscape:flex-none landscape:shrink-0 ${De ? "" : "pointer-events-none portrait:hidden landscape:invisible"}`, style: Y ? { width: Fe } : void 0, children: ie ? o.jsxs(o.Fragment, { children: [o.jsx("div", { className: "sticky top-0 z-[1] border-b border-blue-100 bg-white px-2.5 py-1.5 dark:border-blue-900/40 dark:bg-odp-surface", children: o.jsxs("h3", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong", children: [o.jsx(kl, { className: fe, "aria-hidden": true }), "\uC140", o.jsxs("span", { className: "font-normal text-gray-400 dark:text-odp-muted", children: ["(", ie.r + 1, "\uD589 ", ie.c + 1, "\uC5F4", U.length > 1 ? ` \xB7 ${U.length}\uCE78` : "", ")"] })] }) }), o.jsxs("div", { className: "space-y-2 p-2.5", children: [o.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [o.jsxs("button", { type: "button", disabled: !Qe, title: `\uBCD1\uD569 (${Iu})`, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft", onClick: vt, children: [o.jsx(Sl, { className: fe, "aria-hidden": true }), "\uBCD1\uD569"] }), o.jsxs("button", { type: "button", disabled: !m, title: `\uBCD1\uD569 \uD574\uC81C (${_u})`, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft", onClick: Lt, children: [o.jsx(El, { className: fe, "aria-hidden": true }), "\uBCD1\uD569 \uD574\uC81C"] })] }), o.jsxs("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: ["\uAE00\uC790 \uD06C\uAE30: ", $u, " / ", Hu] }), o.jsxs(ut, { name: "cell-text", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(pt, { asChild: true, children: o.jsx("span", { children: o.jsx(ht, { icon: o.jsx(Yo, { className: fe }), children: "\uC140 \uD14D\uC2A4\uD2B8" }) }) }), o.jsx(nn, { asChild: true, children: o.jsx("input", { type: "text", value: W, onChange: (l) => mt(ie.r, ie.c, l.target.value), placeholder: "\uC140 \uB0B4\uC6A9 \uC785\uB825", className: ti }) })] }), o.jsx(Kn, { compact: true, idPrefix: "table-edit-cell", value: Pe, onChange: Se })] })] }) : null }), o.jsx(ao, { ariaLabel: "\uC0AC\uC774\uB4DC\uBC14\uC640 \uD45C \uC0AC\uC774 \uB108\uBE44 \uC870\uC808", onDelta: it })] }), o.jsxs("div", { ref: xe, "data-haim-table-canvas": "", className: `order-1 flex min-h-0 min-w-0 flex-1 flex-col overflow-auto border-t border-gray-100 p-3 landscape:order-2 landscape:border-t-0 landscape:border-l dark:border-odp-border ${je ? "cursor-grabbing select-none" : re && !m ? "cursor-grab select-none" : ""}`, onMouseLeave: () => {
    E || Z(null);
  }, onPointerDown: x, onPointerMove: w, onPointerUp: y, onPointerCancel: y, onAuxClick: (l) => {
    l.button === 1 && l.preventDefault();
  }, children: [o.jsxs("p", { className: "mb-2 inline-flex shrink-0 items-center gap-1 text-[10px] text-gray-400", children: [o.jsx(Cl, { className: fe, "aria-hidden": true }), "\uB354\uBE14\uD074\uB9AD \uB4DC\uB798\uADF8\xB7Shift+\uD074\uB9AD: \uBC94\uC704 \uC120\uD0DD \xB7 \uC6B0\uD074\uB9AD: \uD589/\uC5F4 \uC0AD\uC81C \xB7 \uD720\uD074\uB9AD/\uC2A4\uD398\uC774\uC2A4+\uB4DC\uB798\uADF8: \uD328\uB2DD \xB7 ", Yn, "/", Gn, ": \uC2E4\uD589 \uCDE8\uC18C/\uB2E4\uC2DC \uC2E4\uD589 \xB7 \uD14C\uB450\uB9AC \uB354\uBE14\uD074\uB9AD: \uD589\xB7\uC5F4 \uCD94\uAC00"] }), o.jsx("div", { ref: ye, className: "relative inline-block min-w-full p-5", "data-haim-inserting": (D == null ? void 0 : D.kind) ?? void 0, onMouseMove: Nn, onMouseLeave: () => {
    E || Z(null);
  }, children: o.jsxs(Go, { delayDuration: 0, skipDelayDuration: 0, children: [o.jsxs("table", { ref: ve, className: `border-collapse text-sm ${((_a2 = s.colWidths) == null ? void 0 : _a2.some((l) => l && l.trim())) ? "w-max max-w-full" : "w-full"}`, style: { tableLayout: ((_b = s.colWidths) == null ? void 0 : _b.some((l) => l && l.trim())) || ((_c2 = s.rowHeights) == null ? void 0 : _c2.some((l) => l && l.trim())) ? "fixed" : void 0, ...((_d2 = s.style) == null ? void 0 : _d2.fontFamily) ? { fontFamily: s.style.fontFamily } : {}, ...((_e2 = s.style) == null ? void 0 : _e2.fontSize) ? { fontSize: s.style.fontSize } : {}, ...((_f2 = s.style) == null ? void 0 : _f2.fontWeight) ? { fontWeight: s.style.fontWeight } : {} }, children: [o.jsx("colgroup", { children: Array.from({ length: P }, (l, d) => {
    const b = Dn(s.colWidths, d);
    return o.jsx("col", { style: b ? { width: b } : void 0 }, d);
  }) }), o.jsx("tbody", { children: u.rows.map((l, d) => {
    const b = Dn(s.rowHeights, d);
    return o.jsx("tr", { style: b ? { height: b } : void 0, children: Array.from({ length: P }, (M, v) => {
      if (Te.has(`${d},${v}`)) return null;
      const _ = ni(s.merges, d, v), X = ae(d, v), ge = Dn(s.colWidths, v), st = o.jsx("td", { "data-edit-r": d, "data-edit-c": v, colSpan: _ == null ? void 0 : _.colspan, rowSpan: _ == null ? void 0 : _.rowspan, className: `min-h-11 cursor-pointer border-2 border-gray-300 p-0 transition-[box-shadow,outline-color] dark:border-odp-borderStrong ${ge ? "" : "min-w-28"} ${X ? "relative z-[1] outline outline-2 outline-offset-[-2px] outline-blue-500 ring-0" : "hover:relative hover:z-[1] hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-blue-400/70"}`, onContextMenu: () => {
        ae(d, v) || et(d, v), de && (V({ r: d, c: v }), Z(null));
      }, onMouseDown: (K) => {
        var _a3, _b2;
        if (K.button === 1 || K.button !== 0 || Ae.current || Oe.current && !pe.current) return;
        if ((_b2 = (_a3 = K.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-hit], [data-haim-edge-add]")) {
          K.preventDefault();
          return;
        }
        {
          const Ye = ve.current, Pt = ye.current;
          if (Ye && Pt && _t(Ye, Pt, K.clientX, K.clientY, j, P, s.merges)) {
            K.preventDefault();
            return;
          }
        }
        if (K.shiftKey) {
          K.preventDefault(), en(d, v);
          return;
        }
        if (K.detail >= 2) {
          K.preventDefault(), Rt(d, v);
          return;
        }
        et(d, v);
      }, onDoubleClick: (K) => {
        const He = ve.current, Ye = ye.current;
        if (He && Ye && _t(He, Ye, K.clientX, K.clientY, j, P, s.merges)) {
          K.preventDefault(), K.stopPropagation();
          return;
        }
        K.preventDefault(), Rt(d, v);
      }, onMouseEnter: () => {
        f(d, v);
      }, children: o.jsx(ut, { name: `cell-${d}-${v}`, className: "contents", children: o.jsx(nn, { asChild: true, children: o.jsx("input", { type: "text", value: l[v] ?? "", onChange: (K) => mt(d, v, K.target.value), onKeyDown: (K) => H(K, d, v), onMouseDown: (K) => {
        var _a3, _b2;
        if (K.button !== 1 && K.button === 0 && !Ae.current && !(Oe.current && !pe.current)) {
          if ((_b2 = (_a3 = K.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-hit], [data-haim-edge-add]")) {
            K.preventDefault(), K.stopPropagation();
            return;
          }
          {
            const He = ve.current, Ye = ye.current;
            if (He && Ye && _t(He, Ye, K.clientX, K.clientY, j, P, s.merges)) {
              K.preventDefault(), K.stopPropagation();
              return;
            }
          }
          if (K.shiftKey) {
            K.preventDefault(), K.stopPropagation(), en(d, v);
            return;
          }
          if (K.detail >= 2) {
            K.preventDefault();
            return;
          }
          K.stopPropagation();
        }
      }, onDoubleClick: (K) => {
        const He = ve.current, Ye = ye.current;
        if (He && Ye && _t(He, Ye, K.clientX, K.clientY, j, P, s.merges)) {
          K.preventDefault(), K.stopPropagation();
          return;
        }
        K.preventDefault(), K.stopPropagation(), Rt(d, v);
      }, onFocus: () => {
        Ne.current || Oe.current && !pe.current || et(d, v);
      }, className: `${An} h-full min-h-11 w-full cursor-pointer border-transparent bg-transparent px-2 text-sm focus:cursor-text focus:border-gray-300 focus:bg-white/90 dark:focus:bg-odp-bgSoft/90 ${ge ? "" : "min-w-28"}`, style: { ...be(d, v), ...b ? { height: b } : {} } }) }) }) }, v);
      return de ? st : o.jsxs(Fl, { onOpenChange: (K) => {
        V(K ? { r: d, c: v } : null), K ? Z(null) : lt();
      }, children: [o.jsx(Ol, { asChild: true, children: st }), o.jsx(Bl, { children: o.jsxs(Vl, { className: Du, onCloseAutoFocus: (K) => K.preventDefault(), children: [o.jsxs(Kr, { className: so, disabled: j <= 1, onPointerEnter: () => Yt(d), onPointerLeave: lt, onFocus: () => Yt(d), onBlur: lt, onSelect: () => {
        dt(d);
      }, children: [o.jsx(Et, { className: fe, "aria-hidden": true }), "\uD589 \uC0AD\uC81C"] }), o.jsxs(Kr, { className: so, disabled: P <= 1, onPointerEnter: () => Gt(v), onPointerLeave: lt, onFocus: () => Gt(v), onBlur: lt, onSelect: () => {
        Xt(v);
      }, children: [o.jsx(Et, { className: fe, "aria-hidden": true }), "\uC5F4 \uC0AD\uC81C"] })] }) })] }, v);
    }) }, d);
  }) })] }), le ? o.jsx(Uu, { kind: le.kind, indices: le.indices, table: ve.current, wrap: ye.current, colCount: P }) : null, de && J ? o.jsxs(zo, { open: te, onOpenChange: (l) => {
    l || (V(null), lt());
  }, title: `${J.r + 1}\uD589 ${J.c + 1}\uC5F4`, subtitle: "\uD45C \uD3B8\uC9D1 \uC140", children: [o.jsxs("button", { type: "button", className: nr, disabled: j <= 1, onClick: () => {
    dt(J.r), V(null);
  }, children: [o.jsx(Et, { className: fe, "aria-hidden": true }), "\uD589 \uC0AD\uC81C"] }), o.jsxs("button", { type: "button", className: nr, disabled: P <= 1, onClick: () => {
    Xt(J.c), V(null);
  }, children: [o.jsx(Et, { className: fe, "aria-hidden": true }), "\uC5F4 \uC0AD\uC81C"] })] }) : null, D && !te ? o.jsxs(o.Fragment, { children: [o.jsx(Wu, { insert: D }, `preview-${D.kind}-${D.index}`), o.jsx(zu, { insert: D, allowResize: D.index !== 0, tip: D.index === 0 ? D.label : `${D.label} \xB7 ${io(D.kind)}`, onDoubleClickInsert: () => {
    const { kind: l, index: d } = D;
    l === "row" ? wt(d) : yt(d);
  }, onResizePointerDown: (l) => ft(l, D) }, `hit-${D.kind}-${D.index}`), o.jsx(Ku, { tip: D.index === 0 ? D.label : `${D.label} \xB7 ${io(D.kind)}`, onDoubleClick: () => {
    const { kind: l, index: d } = D;
    l === "row" ? wt(d) : yt(d);
  }, style: { left: D.x, top: D.y } }, `btn-${D.kind}-${D.index}`)] }) : null] }) })] })] })] }), o.jsx(Ql, { isOpen: F, template: G, onClose: () => {
    Q(false), k(null);
  }, onSave: (l) => {
    const b = [...oi().templates.filter((M) => M.id !== (G == null ? void 0 : G.id) && M.id !== l.id), l];
    ri({ templates: b }).then((M) => {
      O(M.templates), Q(false), k(null);
    });
  } })] }), typeof document < "u" ? Do.createPortal(o.jsx("div", { className: "relative z-[100060]", children: o.jsx(fn, { isOpen: ne !== null, variant: "danger", title: (ne == null ? void 0 : ne.kind) === "col" ? "\uC5F4 \uC0AD\uC81C" : "\uD589 \uC0AD\uC81C", message: (ne == null ? void 0 : ne.kind) === "col" ? ne.indices.length > 1 ? `\uC120\uD0DD\uD55C ${ne.indices.length}\uAC1C \uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(ne.indices[0] ?? 0) + 1}\uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : ne ? ne.indices.length > 1 ? `\uC120\uD0DD\uD55C ${ne.indices.length}\uAC1C \uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(ne.indices[0] ?? 0) + 1}\uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : "", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", onConfirm: Cn, onCancel: () => se(null) }) }), document.body) : null] });
}
const Gu = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", fo = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-800 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-surface", mo = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", on = "h-3.5 w-3.5 shrink-0";
function Ju({ containerRef: e, getMarkdown: t, setMarkdown: n, onEditTable: r, onEditFailed: a }) {
  const s = Ko(), [c, u] = i.useState(false), [p, m] = i.useState(null), [g, T] = i.useState(null), S = i.useRef(null);
  S.current = p;
  const R = i.useCallback((k) => {
    m(k), u(true);
  }, []);
  i.useEffect(() => {
    const k = e.current;
    if (!k) return;
    const D = () => k.querySelector(".md-editor-preview"), Z = (J) => {
      var _a2, _b, _c2, _d2;
      if ((_b = (_a2 = J.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const V = D(), te = (_d2 = (_c2 = J.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "table");
      !(te instanceof HTMLTableElement) || !(V == null ? void 0 : V.contains(te)) || (J.preventDefault(), J.stopPropagation(), R({ table: te, previewRoot: V, x: J.clientX, y: J.clientY }));
    };
    let E = null, A = null, z = false, ee = null;
    const ne = () => {
      E && clearTimeout(E), E = null, A = null, ee = null;
    }, se = (J) => {
      var _a2, _b;
      if (J.pointerType === "mouse") return;
      const V = D();
      if (!V) return;
      const te = (_b = (_a2 = J.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "table");
      !(te instanceof HTMLTableElement) || !V.contains(te) || (ne(), z = false, ee = te, A = { x: J.clientX, y: J.clientY }, E = setTimeout(() => {
        z = true, ai();
        const de = D();
        ee && de && R({ table: ee, previewRoot: de, x: (A == null ? void 0 : A.x) ?? J.clientX, y: (A == null ? void 0 : A.y) ?? J.clientY });
      }, ii));
    }, le = (J) => {
      if (!A) return;
      const V = J.clientX - A.x, te = J.clientY - A.y;
      V * V + te * te > 100 && ne();
    }, ce = (J) => {
      z && (J.preventDefault(), J.stopPropagation()), ne(), z = false;
    }, we = (J) => {
      var _a2, _b;
      const V = D(), te = (_b = (_a2 = J.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "table");
      te && (V == null ? void 0 : V.contains(te)) && window.matchMedia("(pointer: coarse)").matches && J.preventDefault();
    };
    return k.addEventListener("contextmenu", Z, true), k.addEventListener("pointerdown", se), k.addEventListener("pointermove", le), k.addEventListener("pointerup", ce), k.addEventListener("pointercancel", ce), k.addEventListener("contextmenu", we, true), () => {
      ne(), k.removeEventListener("contextmenu", Z, true), k.removeEventListener("pointerdown", se), k.removeEventListener("pointermove", le), k.removeEventListener("pointerup", ce), k.removeEventListener("pointercancel", ce), k.removeEventListener("contextmenu", we, true);
    };
  }, [e, R]);
  const C = () => {
    const k = S.current;
    if (!k) return;
    r(k.table, k.previewRoot) || (a == null ? void 0 : a());
  }, N = () => {
    const k = S.current;
    if (!k) return;
    const D = Jo(t(), k.table, k.previewRoot);
    if (!D) {
      a == null ? void 0 : a();
      return;
    }
    T(D);
  }, O = () => {
    if (!g) return;
    const k = ci(t(), g);
    n(k), T(null);
  }, F = p ?? { x: 0, y: 0 }, Q = () => {
    u(false), m(null);
  }, G = o.jsxs(o.Fragment, { children: [o.jsxs("button", { type: "button", className: s ? li : fo, onClick: () => {
    C(), Q();
  }, children: [o.jsx(mn, { className: on, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1\uAE30"] }), o.jsxs("button", { type: "button", className: s ? nr : mo, onClick: () => {
    N(), Q();
  }, children: [o.jsx(Et, { className: on, "aria-hidden": true }), "\uD45C \uC0AD\uC81C"] })] });
  return o.jsxs(o.Fragment, { children: [s ? o.jsx(zo, { open: c, onOpenChange: (k) => {
    u(k), k || m(null);
  }, title: "\uBBF8\uB9AC\uBCF4\uAE30 \uD45C", subtitle: "\uB9C8\uD06C\uB2E4\uC6B4 \uD14C\uC774\uBE14", children: G }) : o.jsxs(Kl, { open: c, onOpenChange: (k) => {
    u(k), k || m(null);
  }, modal: true, children: [o.jsx(zl, { asChild: true, children: o.jsx("button", { type: "button", "aria-hidden": true, tabIndex: -1, className: "pointer-events-none fixed h-px w-px opacity-0", style: { left: F.x, top: F.y } }) }), o.jsx(Wl, { children: o.jsxs(Ul, { className: Gu, side: "bottom", align: "start", sideOffset: 2, collisionPadding: 12, onCloseAutoFocus: (k) => k.preventDefault(), children: [o.jsxs(zr, { className: fo, onSelect: C, children: [o.jsx(mn, { className: on, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1\uAE30"] }), o.jsxs(zr, { className: mo, onSelect: N, children: [o.jsx(Et, { className: on, "aria-hidden": true }), "\uD45C \uC0AD\uC81C"] })] }) })] }), o.jsx(fn, { isOpen: g !== null, variant: "danger", title: "\uD45C \uC0AD\uC81C", message: "\uC774 \uD45C\uB97C \uB9C8\uD06C\uB2E4\uC6B4\uC5D0\uC11C \uC0AD\uC81C\uD560\uAE4C\uC694?", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", onConfirm: O, onCancel: () => T(null) })] });
}
function Zu(e) {
  const [t, n] = i.useState(null), r = i.useRef(e.getMarkdown), a = i.useRef(e.setMarkdown);
  r.current = e.getMarkdown, a.current = e.setMarkdown;
  const s = i.useCallback((m, g = m) => {
    const T = r.current(), S = rr(T, m, g);
    return S ? (n({ block: S, meta: S.meta ?? dn(), grid: S.grid }), true) : false;
  }, []), c = i.useCallback((m, g) => {
    const T = r.current(), S = Jo(T, m, g);
    return S ? (n({ block: S, meta: S.meta ?? dn(), grid: S.grid }), true) : false;
  }, []), u = i.useCallback(() => n(null), []), p = i.useCallback((m, g) => {
    if (!t) return;
    const T = r.current(), S = rr(T, t.block.start, t.block.start + 1) ?? t.block, R = ui(T, S, m, g);
    a.current(R), n(null);
  }, [t]);
  return { editState: t, openAtOffset: s, openPreviewTable: c, close: u, apply: p, isOpen: !!t };
}
const ms = new mr("s3haim-note-cover-fold");
ms.version(1).stores({ folds: "key, updatedAt" });
const ps = ms.folds;
function Qu(e, t) {
  return `cover-fold:${fr(e, t)}`;
}
function ed(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Qu(e.type, e.id);
}
async function td(e) {
  if (!e) return null;
  const t = await ps.get(e);
  return !t || typeof t.collapsed != "boolean" ? null : t.collapsed;
}
async function nd(e, t) {
  e && await ps.put({ key: e, collapsed: !!t, updatedAt: Date.now() });
}
function jt(e) {
  const t = Math.min(e.length, 2e6);
  return di(e.sliceString(0, t));
}
function xt(e) {
  const t = jt(e.doc);
  if (!t) return null;
  const n = e.doc.lineAt(t.from);
  return n.to >= t.to ? null : { from: n.to, to: t.to };
}
function Bt(e, t) {
  let n = false;
  return Ks(e).between(t.from, t.to, () => {
    n = true;
  }), n;
}
function rd(e, t) {
  return e.from === t.from && e.to === t.to;
}
function od(e, t) {
  const n = e.doc.lineAt(t);
  let r = false;
  return zs(e).iterate({ from: n.from, to: Math.min(n.to, n.from + 1), enter(a) {
    const s = a.type.name;
    if (s.startsWith("ATXHeading") || s.startsWith("SetextHeading")) return r = true, false;
  } }), r;
}
function Jn(e, t) {
  const n = jt(e.doc);
  if (n) {
    const s = e.doc.lineAt(n.from);
    if (t === s.from) {
      const c = xt(e);
      if (c) return { ...c, kind: "cover" };
    }
    if (t >= n.from && t < n.to) return null;
  }
  if (!od(e, t)) return null;
  const r = e.doc.lineAt(t), a = Bs(e, r.from, r.to);
  return !a || a.from >= a.to ? null : { ...a, kind: "heading" };
}
const Vt = _s.define({ combine: (e) => e[e.length - 1] ?? null }), hs = new Io();
function sd(e) {
  return hs.of(Vt.of(e));
}
function ad(e, t) {
  e.dispatch({ effects: hs.reconfigure(Vt.of(t)) });
}
function id(e, t) {
  const n = document.createElement("button");
  n.type = "button", n.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${t}`;
  const r = t === "cover" ? e ? "\uD45C\uC9C0 \uC811\uAE30" : "\uD45C\uC9C0 \uD3BC\uCE58\uAE30" : e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30";
  n.setAttribute("aria-label", r), n.title = r, n.dataset.foldKind = t, n.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const a = n.querySelector("svg");
  return a && (a.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", a.style.transformOrigin = "50% 50%"), n;
}
class po extends Ws {
  constructor(t, n) {
    super(), this.open = t, this.kind = n;
  }
  eq(t) {
    return this.open === t.open && this.kind === t.kind;
  }
  toDOM() {
    return id(this.open, this.kind);
  }
}
let ur = 0;
function gs(e, t) {
  const n = e.coordsAtPos(t.from), r = e.coordsAtPos(t.to);
  if (!n || !r) return null;
  const a = e.contentDOM.getBoundingClientRect(), s = Math.min(n.top, r.top), c = Math.max(n.bottom, r.bottom), u = Math.max(0, c - s);
  if (u < 2) return null;
  const p = document.createElement("div");
  return p.className = "cm-note-cover-fold-motion", p.style.cssText = ["position:fixed", `top:${s}px`, `left:${a.left}px`, `width:${Math.max(0, a.width)}px`, `height:${u}px`, "overflow:hidden", "pointer-events:none", "z-index:6", "background:var(--md-bk-color, var(--cm-background, #fff))"].join(";"), document.body.appendChild(p), p;
}
async function ld(e, t) {
  const n = ++ur, r = gs(e, t);
  if (!r) {
    e.dispatch({ effects: Ot.of(t) });
    return;
  }
  try {
    await yn(r, { height: 0, opacity: 0.35 }, { duration: 0.22, ease: "easeInOut" });
  } catch {
  }
  n === ur && xt(e.state) && e.dispatch({ effects: Ot.of(t) }), r.remove();
}
async function cd(e, t) {
  ++ur, e.dispatch({ effects: xn.of(t) });
  const n = xt(e.state);
  if (!n) return;
  const r = gs(e, n);
  if (r) {
    try {
      await yn(r, { height: 0, opacity: 0 }, { duration: 0.22, ease: "easeInOut" });
    } catch {
    }
    r.remove();
  }
}
function xs(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.querySelector) == null ? void 0 : _a2.call(e, "svg");
  n instanceof SVGElement && yn(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" });
}
function ho(e, t) {
  const n = Bt(e.state, t);
  return e.dispatch({ effects: n ? xn.of(t) : Ot.of(t) }), true;
}
function go(e) {
  const t = xt(e.state);
  if (!t) return false;
  const r = !Bt(e.state, t), a = e.dom.querySelector('.cm-note-cover-fold-chevron[data-fold-kind="cover"]');
  return xs(a, !r), (async () => {
    r ? await ld(e, t) : await cd(e, t);
    const s = e.state.facet(Vt);
    s && nd(s, r);
  })(), true;
}
function ud(e, t) {
  const n = xt(e.state);
  if (!n) return;
  const r = Bt(e.state, n);
  t && !r ? e.dispatch({ effects: Ot.of(n) }) : !t && r && e.dispatch({ effects: xn.of(n) });
}
function dd() {
  return Vs.fromClass(class {
    constructor(e) {
      __publicField(this, "lastKey", null);
      __publicField(this, "hadCover", false);
      __publicField(this, "loadGen", 0);
      this.view = e, this.syncKeyAndMaybeRestore();
    }
    update(e) {
      const t = e.state.facet(Vt) !== this.lastKey, r = !!jt(e.state.doc), a = r && !this.hadCover;
      this.hadCover = r, (t || a) && this.syncKeyAndMaybeRestore();
    }
    syncKeyAndMaybeRestore() {
      const e = this.view.state.facet(Vt);
      this.lastKey = e;
      const t = jt(this.view.state.doc);
      if (this.hadCover = !!t, !e || !t) return;
      const n = ++this.loadGen;
      td(e).then((r) => {
        n === this.loadGen && r != null && ud(this.view, r);
      });
    }
  });
}
function fd(e) {
  return e.transactions.some((t) => t.effects.some((n) => n.is(Ot) || n.is(xn)));
}
function md() {
  return [sd(null), $s({ preparePlaceholder(e, t) {
    const n = xt(e);
    return n && rd(n, t) ? "cover" : "heading";
  }, placeholderDOM(e, t, n) {
    const r = document.createElement("span");
    return r.className = "cm-foldPlaceholder", r.textContent = n === "cover" ? "\u2026\uD45C\uC9C0\u2026" : "\u2026", r.setAttribute("aria-hidden", "true"), r.onclick = t, r;
  } }), Hs.of((e, t) => {
    const n = jt(e.doc);
    if (!n) return null;
    const r = e.doc.lineAt(n.from);
    return t !== r.from ? null : xt(e);
  }), Fs({ class: "cm-note-cover-fold-gutter", lineMarker(e, t) {
    const n = Jn(e.state, t.from);
    if (!n) return null;
    const r = !Bt(e.state, n);
    return new po(r, n.kind);
  }, lineMarkerChange: (e) => e.docChanged || e.viewportChanged || fd(e), initialSpacer: () => new po(true, "heading"), domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = Jn(e.state, t.from);
    if (!r) return false;
    if (r.kind === "cover") {
      if (!go(e)) return false;
    } else {
      const a = n.target instanceof Element ? n.target.closest(".cm-note-cover-fold-chevron") : null;
      xs(a, Bt(e.state, r)), ho(e, r);
    }
    return n.preventDefault(), n.stopPropagation(), true;
  } } }), Os({ domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = jt(e.state.doc);
    if (r && t.from >= r.from && t.from < r.to) return go(e) ? (n.preventDefault(), true) : false;
    const a = Jn(e.state, t.from);
    return !a || a.kind !== "heading" ? false : (ho(e, a), n.preventDefault(), true);
  } } }), dd(), Ft.theme({ ".cm-note-cover-fold-gutter": { width: "1.1rem" }, ".cm-note-cover-fold-gutter .cm-gutterElement": { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }, ".cm-note-cover-fold-chevron": { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", padding: "0", margin: "0", border: "none", background: "transparent", color: "inherit", opacity: "0.65", cursor: "pointer", lineHeight: "1" }, ".cm-note-cover-fold-chevron:hover": { opacity: "1" }, ".cm-note-cover-fold-chevron svg": { display: "block" } })];
}
function pd({ cover: e, getPresignedUrl: t }) {
  const n = fi(e.pageSizeId) ? e.pageSizeId : mi, r = i.useMemo(() => ({ ...pi(), pageSizeId: n }), [n]), a = i.useMemo(() => hi(n), [n]), s = i.useMemo(() => gi(r), [r]);
  return o.jsx("div", { className: "md-note-cover-preview-light w-full bg-white text-gray-900", "data-note-cover-preview": "1", "data-color-mode": "light", "data-cover-page-size": n, style: s, children: o.jsx(va, { cover: e, getPresignedUrl: t, className: "md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]", style: { width: "100%", height: "auto", aspectRatio: `${a.widthMm} / ${a.heightMm}` } }) });
}
const gn = /* @__PURE__ */ new WeakMap(), hd = "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026", gd = "\uD45C\uC9C0";
function bs(e) {
  const t = gn.get(e);
  t && (t.unmount(), gn.delete(e));
}
function xo(e, t) {
  if (!e) return;
  const n = e.querySelector(".md-note-cover-placeholder__fallback");
  n && (n.textContent = t);
}
function bo(e, t) {
  e && (e.classList.toggle("md-note-cover-placeholder--pending", t === "pending"), e.classList.toggle("md-note-cover-placeholder--ready", t === "ready"), e.classList.toggle("md-note-cover-placeholder--empty", t === "empty"), t === "pending" ? xo(e, hd) : t === "empty" && xo(e, gd));
}
function xd(e, t, n) {
  let r = gn.get(e);
  r || (r = Ps.createRoot(e), gn.set(e, r)), r.render(i.createElement(pd, { cover: t, getPresignedUrl: n ?? void 0 }));
}
function bd(e, t, n, r) {
  if (!e || typeof e.querySelectorAll != "function") return 0;
  const { cover: a } = Wo(t ?? ""), s = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  if (!(a == null ? void 0 : a.enabled)) {
    for (const c of s) {
      bs(c);
      const u = c.closest("[data-note-cover-placeholder]");
      bo(u, "empty");
    }
    return 0;
  }
  for (const c of s) {
    const u = c.closest("[data-note-cover-placeholder]");
    bo(u, "ready"), xd(c, a, n);
  }
  return s.length;
}
function wd(e) {
  if (!e || typeof e.querySelectorAll != "function") return;
  const t = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  for (const n of t) bs(n);
}
const yd = "h1, h2, h3, h4, h5, h6", ws = "md-preview-heading-fold-chevron", wo = "md-preview-heading-foldable", sn = "md-preview-heading-folded", vd = "md-preview-heading-section-hidden", un = "data-md-preview-heading-fold";
function kd(e) {
  if (!e) return false;
  const t = e.tagName;
  return t === "H1" || t === "H2" || t === "H3" || t === "H4" || t === "H5" || t === "H6";
}
function yo(e) {
  const t = e.getAttribute("data-heading-level");
  if (t) {
    const r = Number(t);
    if (Number.isFinite(r) && r >= 1) return r;
  }
  const n = Number(e.tagName.slice(1));
  return Number.isFinite(n) && n >= 1 ? n : 6;
}
function Sd(e, t) {
  return e.id || `md-preview-heading-${t}`;
}
function ys(e) {
  const t = yo(e), n = [];
  let r = e.nextElementSibling;
  for (; r && !(kd(r) && yo(r) <= t || r.hasAttribute("data-note-cover-placeholder")); ) r instanceof HTMLElement && n.push(r), r = r.nextElementSibling;
  return n;
}
function Ed(e) {
  return !!e.closest("[data-note-cover-placeholder], [data-note-cover-preview]");
}
function vs(e) {
  return Array.from(e.querySelectorAll(yd)).filter((t) => !(!(t instanceof HTMLElement) || Ed(t)));
}
function Cd(e) {
  if (!e || typeof e.querySelectorAll != "function") return false;
  const t = vs(e);
  for (const n of t) if (n.getAttribute(un) !== "1" && ys(n).length > 0) return true;
  return false;
}
function Nd(e) {
  const t = document.createElement("button");
  t.type = "button", t.className = `${ws} cursor-pointer`, t.setAttribute("aria-label", e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), t.title = e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30", t.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const n = t.querySelector("svg");
  return n && (n.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", n.style.transformOrigin = "50% 50%"), t;
}
function jd(e, t) {
  const n = e.querySelector("svg");
  n instanceof SVGElement && (yn(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" }), e.setAttribute("aria-label", t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), e.title = t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30");
}
function Zn(e, t) {
  for (const n of e) n.classList.toggle(vd, t), t ? n.setAttribute("hidden", "") : n.removeAttribute("hidden");
}
function Md(e, t = {}) {
  if (!e || typeof e.querySelectorAll != "function") return () => {
  };
  const n = new Set(Array.from(t.collapsedIds ?? []).filter((s) => typeof s == "string" && s)), r = [];
  return vs(e).forEach((s, c) => {
    var _a2;
    if (s.getAttribute(un) === "1") return;
    const u = ys(s);
    if (u.length === 0) return;
    const p = Sd(s, c);
    s.id || (s.id = p), s.setAttribute(un, "1"), s.classList.add(wo), (_a2 = s.querySelector(`:scope > .${ws}`)) == null ? void 0 : _a2.remove();
    const g = !n.has(p), T = Nd(g);
    s.insertBefore(T, s.firstChild);
    const S = (C) => {
      s.classList.toggle(sn, C), Zn(u, C), jd(T, !C);
    };
    g || (s.classList.add(sn), Zn(u, true));
    const R = (C) => {
      var _a3;
      C.preventDefault(), C.stopPropagation();
      const N = !s.classList.contains(sn);
      S(N), N ? n.add(p) : n.delete(p), (_a3 = t.onCollapsedChange) == null ? void 0 : _a3.call(t, Array.from(n));
    };
    T.addEventListener("click", R), r.push(() => {
      T.removeEventListener("click", R), T.remove(), s.classList.remove(wo, sn), s.removeAttribute(un), Zn(u, false);
    });
  }), () => {
    for (const s of r) s();
  };
}
const ks = new mr("s3haim-preview-heading-fold");
ks.version(1).stores({ folds: "key, updatedAt" });
const Ss = ks.folds;
function Td(e, t) {
  return `heading-fold:${fr(e, t)}`;
}
function Ld(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Td(e.type, e.id);
}
async function Rd(e) {
  if (!e) return null;
  const t = await Ss.get(e);
  return !t || !Array.isArray(t.collapsedIds) ? null : t.collapsedIds.filter((n) => typeof n == "string" && n.length > 0);
}
async function Pd(e, t) {
  e && await Ss.put({ key: e, collapsedIds: Array.from(new Set(t.filter(Boolean))), updatedAt: Date.now() });
}
const kn = "data-mirror-edit", Mt = "data-mirror-edit-active", Ad = "a, button, input, textarea, select, label, .md-editor-code-action, [data-transform-handle], table, .md-editor-mermaid, .md-editor-katex, .md-editor-code, pre, [data-note-cover]";
function Qn(e) {
  return e instanceof Element ? !!(e.closest(`[${Mt}]`) || e.closest(`[${kn}]`)) : false;
}
function $t(e) {
  return !!(e == null ? void 0 : e.querySelector(`[${Mt}]`));
}
function er(e) {
  var _a2, _b;
  return e ? !!((_b = (e instanceof Element && e.classList.contains("md-editor") ? e : null) || ((_a2 = e.querySelector) == null ? void 0 : _a2.call(e, ".md-editor")) || (e instanceof Element ? e.closest(".md-editor") : null)) == null ? void 0 : _b.classList.contains("md-editor-previewOnly")) : false;
}
function Dd(e) {
  const t = e.match(/^(.*?)(\n*)$/s);
  return { body: (t == null ? void 0 : t[1]) ?? e, trailing: (t == null ? void 0 : t[2]) ?? "" };
}
function Id(e) {
  var _a2;
  const t = [/^(#{1,6}[ \t]+)/, /^([ \t]*[-*+][ \t]+\[[ xX]\][ \t]+)/, /^([ \t]*[-*+][ \t]+)/, /^([ \t]*\d+\.[ \t]+)/, /^(>[ \t]?)/];
  for (const n of t) {
    const a = (_a2 = e.match(n)) == null ? void 0 : _a2[1];
    if (a) return { prefix: a, content: e.slice(a.length) };
  }
  return { prefix: "", content: e };
}
function _d(e) {
  return e instanceof Element ? e.closest(`[${Mt}]`) ? false : !!e.closest(Ad) : true;
}
const Sn = new ec({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-", emDelimiter: "*", strongDelimiter: "**" });
Sn.keep(["u", "sub", "sup"]);
Sn.addRule("wikiImageData", { filter: (e) => {
  var _a2;
  return e.nodeName !== "IMG" ? false : !!((_a2 = e.getAttribute) == null ? void 0 : _a2.call(e, "data-wiki-path"));
}, replacement: (e, t) => {
  const n = t;
  return xi({ path: n.getAttribute("data-wiki-path"), width: n.getAttribute("data-wiki-width"), height: n.getAttribute("data-wiki-height"), background: n.getAttribute("data-wiki-bg") });
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
function $d(e, t) {
  let n = e.trim();
  return t && (/^#{1,6}[ \t]+/.test(t) ? n = n.replace(/^#{1,6}[ \t]+/, "") : /\[[ xX]\]/.test(t) ? n = n.replace(/^([-*+]|\d+\.)[ \t]+\[[ xX]\][ \t]+/, "") : /^([ \t]*[-*+][ \t]+)/.test(t) || /^([ \t]*\d+\.[ \t]+)/.test(t) ? n = n.replace(/^([-*+]|\d+\.)[ \t]+/, "") : /^>[ \t]?/.test(t) && (n = n.replace(/^(>[ \t]?)+/gm, "").trim())), n;
}
function Hd(e, t) {
  if (!/\[[ xX]\]/.test(e)) return e;
  const n = t.querySelector('input[type="checkbox"]');
  if (!(n instanceof HTMLInputElement)) return e;
  const r = n.checked;
  return e.replace(/\[[ xX]\]/, r ? "[x]" : "[ ]");
}
function Fd(e, t) {
  const { prefix: n } = Id(t), r = e.cloneNode(true);
  r.removeAttribute(Mt), r.removeAttribute(kn), r.removeAttribute("contenteditable"), r.removeAttribute("spellcheck");
  const a = Hd(n, r);
  r.querySelectorAll('input[type="checkbox"]').forEach((g) => g.remove()), r.querySelectorAll(".md-preview-heading-fold-chevron, .md-heading-fold, .md-editor-code-action, [data-transform-handle], button").forEach((g) => g.remove());
  const s = e.tagName.toLowerCase(), u = /^h[1-6]$/.test(s) || s === "p" || s === "li" || s === "blockquote" || s === "td" || s === "th" ? r.innerHTML : r.outerHTML;
  let p = Sn.turndown(u || "");
  p = p.replace(/^\n+|\n+$/g, ""), p = $d(p, a);
  const m = Number(e.getAttribute("data-heading-level"));
  return Number.isInteger(m) && m >= 7 ? `${"#".repeat(m)} ${p.replace(/^#{1,6}[ \t]+/, "").trim()}` : a ? `${a}${p}` : p;
}
let Ve = null;
function Kt(e) {
  const t = Ve;
  Ve = null, t && (t.cleanup(), t.block.isConnected && (t.block.removeAttribute(Mt), t.block.removeAttribute(kn), t.block.removeAttribute("contenteditable"), t.block.removeAttribute("spellcheck"), e && (t.block.innerHTML = t.snapshotHtml)));
}
function Ht(e) {
  const t = Ve;
  if (!t) return;
  const r = `${Fd(t.block, t.snapshotBody)}${t.trailing}`, { from: a, to: s } = t, c = e.state.doc.sliceString(a, s);
  if (r === c) {
    Kt(true);
    return;
  }
  Kt(false), e.dispatch({ changes: { from: a, to: s, insert: r }, selection: { anchor: a + r.length } });
}
function vo(e, t, n) {
  var _a2;
  const r = (_a2 = window.getSelection) == null ? void 0 : _a2.call(window);
  if (!r) return;
  try {
    const s = document;
    if (typeof s.caretRangeFromPoint == "function") {
      const c = s.caretRangeFromPoint(t, n);
      if (c && e.contains(c.startContainer)) {
        r.removeAllRanges(), r.addRange(c);
        return;
      }
    }
    if (typeof s.caretPositionFromPoint == "function") {
      const c = s.caretPositionFromPoint(t, n);
      if ((c == null ? void 0 : c.offsetNode) && e.contains(c.offsetNode)) {
        const u = document.createRange();
        u.setStart(c.offsetNode, c.offset), u.collapse(true), r.removeAllRanges(), r.addRange(u);
        return;
      }
    }
  } catch {
  }
  const a = document.createRange();
  a.selectNodeContents(e), a.collapse(false), r.removeAllRanges(), r.addRange(a);
}
function Es(e, t, n, r, a) {
  if (Ve) {
    if (Ve.block === e) return vo(e, r, a), true;
    Ht(t);
  }
  const s = Number(e.getAttribute("data-line"));
  if (!Number.isFinite(s)) return false;
  const { from: c, to: u } = ka(t, n, s, s), p = t.state.doc.sliceString(c, u);
  if (!p && c === u) return false;
  const { body: m, trailing: g } = Dd(p), T = e.innerHTML;
  e.setAttribute(Mt, "1"), e.setAttribute(kn, "1"), e.setAttribute("contenteditable", "true"), e.setAttribute("spellcheck", "true"), e.setAttribute("aria-label", "Mirror Edit"), e.querySelectorAll(".md-preview-heading-fold-chevron, button").forEach((N) => {
    N instanceof HTMLElement && (N.contentEditable = "false");
  });
  const S = (N) => {
    if (N.key === "Escape") {
      N.preventDefault(), N.stopPropagation(), Kt(true);
      return;
    }
    if (N.key === "Enter" && (N.metaKey || N.ctrlKey)) {
      N.preventDefault(), N.stopPropagation(), Ht(t);
      return;
    }
    const O = e.tagName.toLowerCase();
    N.key === "Enter" && !N.shiftKey && /^h[1-6]$/.test(O) && (N.preventDefault(), N.stopPropagation(), Ht(t));
  }, R = (N) => {
    var _a2;
    const O = (_a2 = N.clipboardData) == null ? void 0 : _a2.getData("text/plain");
    O != null && (N.preventDefault(), document.execCommand("insertText", false, O));
  }, C = () => {
    window.setTimeout(() => {
      (Ve == null ? void 0 : Ve.block) === e && (e.contains(document.activeElement) || Ht(t));
    }, 0);
  };
  return e.addEventListener("keydown", S), e.addEventListener("paste", R), e.addEventListener("blur", C), Ve = { block: e, snapshotHtml: T, snapshotBody: m, from: c, to: u, trailing: g, cleanup: () => {
    e.removeEventListener("keydown", S), e.removeEventListener("paste", R), e.removeEventListener("blur", C);
  } }, requestAnimationFrame(() => {
    e.focus(), vo(e, r, a);
  }), true;
}
function Od(e, t) {
  const n = (r) => {
    if (!t.isEnabled() || _d(r.target)) return;
    const a = t.getPreviewRoot();
    if (!a || !(r.target instanceof Node) || !a.contains(r.target)) return;
    const s = tr(r.target, a);
    if (!s) return;
    const c = t.getView();
    c && (r.preventDefault(), r.stopPropagation(), Es(s, c, a, r.clientX, r.clientY));
  };
  return e.addEventListener("dblclick", n, true), () => {
    e.removeEventListener("dblclick", n, true), Ve && Kt(true);
  };
}
function Bd() {
  Kt(true);
}
function Vd(e) {
  return !e || !Ve ? false : (Ht(e), true);
}
function ko(e, t, n, r, a) {
  return Es(e, t, n, r, a);
}
function Kd() {
  Ve && (Ve.block.isConnected || (Ve.cleanup(), Ve = null));
}
const zd = [0, 16, 48, 100, 180, 320];
function Wd(e) {
  let t = [], n = null, r = null, a = false, s = false;
  function c() {
    for (const R of t) clearTimeout(R);
    t = [];
  }
  function u() {
    if (s) return false;
    const R = e.getPreviewRoot(), C = e.getView();
    return !R || !C || $t(R) ? false : Sa(C, R, { allowCollapsed: true });
  }
  function p() {
    a || s || (a = true, requestAnimationFrame(() => {
      a = false, u();
    }));
  }
  function m(R) {
    n && r === R || (n == null ? void 0 : n.disconnect(), r = R, n = new MutationObserver((C) => {
      C.some((O) => {
        const F = [...O.addedNodes, ...O.removedNodes];
        return F.length === 0 ? O.type === "characterData" || O.type === "attributes" : F.some((Q) => {
          var _a2, _b;
          return Q instanceof Element ? !(Q.hasAttribute("data-preview-caret-mirror") || Q.hasAttribute("data-preview-sel-mirror") || ((_a2 = Q.classList) == null ? void 0 : _a2.contains("s3haim-preview-caret-mirror")) || ((_b = Q.classList) == null ? void 0 : _b.contains("s3haim-preview-sel-mirror"))) : true;
        });
      }) && p();
    }), n.observe(R, { childList: true, subtree: true, characterData: true }));
  }
  function g(R) {
    if (s) return;
    const C = e.getPreviewRoot();
    if (C && m(C), u(), !!(R == null ? void 0 : R.withRetries)) {
      c();
      for (const N of zd) t.push(setTimeout(() => {
        if (s) return;
        const O = e.getPreviewRoot();
        O && m(O), u();
      }, N));
    }
  }
  function T() {
    s = true, c(), n == null ? void 0 : n.disconnect(), n = null, r = null, a = false;
  }
  const S = e.getPreviewRoot();
  return S && m(S), g({ withRetries: true }), { schedule: g, stop: T };
}
const So = [0, 16, 48, 120, 280], Ud = 50, qd = 40, Eo = 32, Xd = 32;
function Co(e) {
  return !!(e == null ? void 0 : e.isConnected);
}
function dr(e, t) {
  const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
  return n.top - r.top + t.scrollTop;
}
function No(e, t) {
  const n = Math.max(0, t);
  Math.abs(e.scrollTop - n) < 0.5 || (e.scrollTop = n, Math.abs(e.scrollTop - n) > 1 && e.scrollTo(0, n));
}
function Cs(e) {
  const t = [];
  for (const r of e.querySelectorAll("[data-line]")) r instanceof HTMLElement && t.push(r);
  const n = t.filter((r) => {
    let a = r.parentElement;
    for (; a && a !== e; ) {
      if (a.hasAttribute("data-line")) return false;
      a = a.parentElement;
    }
    return true;
  });
  return n.length > 0 ? n : t;
}
function Yd(e, t) {
  let n = null, r = -1;
  for (const a of Cs(e)) {
    const s = Number(a.getAttribute("data-line"));
    Number.isFinite(s) && s <= t && s >= r && (n = a, r = s);
  }
  return n;
}
function Gd(e, t, n) {
  let r = null, a = -1, s = -1 / 0;
  for (const c of Cs(e)) {
    const u = Number(c.getAttribute("data-line"));
    if (!Number.isFinite(u)) continue;
    const p = dr(c, t);
    p <= n && p >= s && (r = c, a = u, s = p);
  }
  return !r || a < 0 ? null : { el: r, line0: a };
}
function Jd(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.dom) == null ? void 0 : _a2.closest(".md-editor");
  if (n instanceof HTMLElement) return n;
  const r = t == null ? void 0 : t.closest(".md-editor");
  return r instanceof HTMLElement ? r : null;
}
function Zd(e) {
  let t = false, n = [], r = null, a = 0, s = null, c = 0, u = 0, p = null, m = null, g = null, T = null, S = null, R = "none", C = false;
  function N() {
    for (const $ of n) clearTimeout($);
    n = [];
  }
  function O() {
    r != null && (clearTimeout(r), r = null), a = 0;
  }
  function F() {
    s != null && (clearTimeout(s), s = null);
  }
  function Q() {
    c && cancelAnimationFrame(c), u && cancelAnimationFrame(u), c = 0, u = 0;
  }
  function G($) {
    F(), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        s = setTimeout(() => {
          s = null, R === $ && (R = "none");
        }, Xd);
      });
    });
  }
  function k($) {
    return $.scrollDOM;
  }
  function D($) {
    return Co(T) ? T : Co(m) ? m : St($);
  }
  function Z($) {
    if (!($ instanceof Node)) return null;
    const B = e.getView(), Y = e.getPreviewRoot();
    if (B && ($ === B.scrollDOM || B.dom.contains($))) return "editor";
    if (Y) {
      const q = Y.closest(".md-editor-preview-wrapper") ?? Y;
      if ($ === q || q.contains($)) return "preview";
    }
    return null;
  }
  function E($, B) {
    if ($ !== "preview" || !(B instanceof HTMLElement)) return;
    const Y = e.getPreviewRoot();
    if (!Y) return;
    const q = St(Y);
    q && (B === q || B.contains(q)) && (T = B);
  }
  function A($, B) {
    if (!(B instanceof HTMLElement)) return false;
    if ($ === "editor") {
      const xe = e.getView();
      return !!(xe && (B === xe.scrollDOM || B.contains(xe.scrollDOM)));
    }
    const Y = e.getPreviewRoot(), q = Y ? St(Y) : null;
    return !!(q && (B === q || B.contains(q)));
  }
  function z() {
    if (C) return false;
    const $ = e.getPreviewRoot(), B = e.getView();
    if (!$ || !B || R === "preview" || R !== "none" && R !== "follow") return false;
    R = "follow";
    const Y = Ea(B, $);
    return G("follow"), Y;
  }
  function ee() {
    t || C || (t = true, requestAnimationFrame(() => {
      t = false, z();
    }));
  }
  function ne() {
    const $ = e.getPreviewRoot(), B = e.getView();
    if (!$ || !B) return;
    const Y = k(B), q = D($);
    if (!q) return;
    const xe = Y.scrollTop, ye = B.lineBlockAtHeight(xe), ve = B.state.doc.lineAt(ye.from).number - 1, he = Yd($, ve);
    if (!he) return;
    const Ne = ye.height > 0 ? Math.max(0, Math.min(1, (xe - ye.top) / ye.height)) : 0, pe = dr(he, q) + he.offsetHeight * Ne - Eo;
    No(q, pe);
  }
  function se() {
    const $ = e.getPreviewRoot(), B = e.getView();
    if (!$ || !B) return;
    const Y = k(B), q = D($);
    if (!q) return;
    const xe = q.scrollTop + Eo, ye = Gd($, q, xe);
    if (!ye) return;
    const { el: ve, line0: he } = ye, Ne = Math.min(Math.max(1, he + 1), B.state.doc.lines), Me = B.state.doc.line(Ne), pe = B.lineBlockAt(Me.from), Oe = dr(ve, q), Ae = ve.offsetHeight > 0 ? Math.max(0, Math.min(1, (xe - Oe) / ve.offsetHeight)) : 0;
    No(Y, pe.top + pe.height * Ae);
  }
  function le() {
    if (!C && !(R === "preview" || R === "follow")) {
      R = "editor";
      try {
        ne();
      } finally {
        G("editor");
      }
    }
  }
  function ce() {
    if (!C && !(R === "editor" || R === "follow")) {
      R = "preview";
      try {
        se();
      } finally {
        G("preview");
      }
    }
  }
  function we() {
    C || R === "preview" || R === "follow" || c || (c = requestAnimationFrame(() => {
      c = 0, le();
    }));
  }
  function J() {
    C || R === "editor" || R === "follow" || u || (u = requestAnimationFrame(() => {
      u = 0, ce();
    }));
  }
  function V($) {
    const B = Z($.target);
    !B || !A(B, $.target) || (E(B, $.target), B === "editor" ? we() : J());
  }
  function te($) {
    const B = Z($.target);
    B && requestAnimationFrame(() => {
      const Y = e.getView(), q = e.getPreviewRoot();
      B === "editor" && Y ? we() : B === "preview" && q && (E("preview", St(q)), J());
    });
  }
  function de($) {
    const B = $.target;
    if (B instanceof HTMLImageElement && (S == null ? void 0 : S.contains(B))) {
      ee(), N();
      for (const Y of So) n.push(setTimeout(() => z(), Y));
    }
  }
  function Ee($) {
    const B = $.scrollDOM;
    return B instanceof HTMLElement ? (p === B || (p && p.removeEventListener("scroll", V), p = B, B.addEventListener("scroll", V, { passive: true })), true) : false;
  }
  function We($) {
    const B = St($);
    return B ? (m === B || (m && m.removeEventListener("scroll", V), m = B, T = B, B.addEventListener("scroll", V, { passive: true })), true) : false;
  }
  function Fe($, B) {
    const Y = Jd($, B);
    return Y ? (g === Y || (g && (g.removeEventListener("scroll", V, true), g.removeEventListener("wheel", te, true), g.removeEventListener("touchmove", te, true)), g = Y, Y.addEventListener("scroll", V, { capture: true, passive: true }), Y.addEventListener("wheel", te, { capture: true, passive: true }), Y.addEventListener("touchmove", te, { capture: true, passive: true })), true) : false;
  }
  function Ue($) {
    S !== $ && (S && (S.removeEventListener("load", de, true), S.removeEventListener("error", de, true)), S = $, $.addEventListener("load", de, true), $.addEventListener("error", de, true));
  }
  function re() {
    C || r != null || a >= qd || (r = setTimeout(() => {
      if (r = null, a += 1, C) return;
      ue() || re();
    }, Ud));
  }
  function ue() {
    if (C) return false;
    const $ = e.getView(), B = e.getPreviewRoot();
    let Y = true;
    return $ && Ee($) || (Y = false), B ? (We(B) || (Y = false), Ue(B)) : Y = false, Fe($, B) || (Y = false), Y;
  }
  function je($) {
    if (!C && (ue() || re(), z(), !!($ == null ? void 0 : $.withRetries))) {
      N();
      for (const B of So) n.push(setTimeout(() => {
        C || (ue() || re(), z());
      }, B));
    }
  }
  function Ce() {
    C = true, N(), O(), F(), Q(), p && (p.removeEventListener("scroll", V), p = null), m && (m.removeEventListener("scroll", V), m = null), g && (g.removeEventListener("scroll", V, true), g.removeEventListener("wheel", te, true), g.removeEventListener("touchmove", te, true), g = null), S && (S.removeEventListener("load", de, true), S.removeEventListener("error", de, true), S = null), T = null, t = false, R = "none";
  }
  return O(), ue() || re(), je({ withRetries: true }), { schedule: je, stop: Ce };
}
const zt = new mr("s3haim-editor-undo-history");
zt.version(1).stores({ histories: "key, updatedAt" });
const jo = 100, Ns = 10080 * 60 * 1e3, Qd = 500;
function ef(e, t) {
  return fr(e, t);
}
function tf(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" ? null : ef(e.type, e.id);
}
async function nf(e) {
  if (!e) return null;
  const t = await zt.histories.get(e);
  return t ? typeof t.updatedAt == "number" && Date.now() - t.updatedAt > Ns ? (await zt.histories.delete(e), null) : !Array.isArray(t.stack) || t.stack.length === 0 ? null : t : null;
}
function xr(e) {
  return Array.isArray(e) ? e.length <= jo ? e : e.slice(e.length - jo) : [""];
}
async function Mo({ key: e, stack: t, index: n }) {
  if (!e) return;
  const r = xr(t), a = Math.max(0, Math.min(n ?? r.length - 1, r.length - 1));
  await zt.histories.put({ key: e, stack: r, index: a, updatedAt: Date.now() });
}
async function rf() {
  const e = Date.now() - Ns;
  await zt.histories.where("updatedAt").below(e).delete();
}
function an(e, t, n) {
  const r = Array.isArray(e) && e.length > 0 ? [...e] : [""];
  let a = Math.max(0, Math.min(t, r.length - 1));
  const s = n ?? "";
  if (r[a] === s) return { stack: r, index: a };
  const c = r.lastIndexOf(s);
  if (c >= 0) return { stack: r, index: c };
  const u = r.slice(0, a + 1);
  u.push(s);
  const p = xr(u);
  return { stack: p, index: p.length - 1 };
}
function of(e, t, n) {
  const r = n ?? "", a = Array.isArray(e) && e.length > 0 ? e : [""], s = Math.max(0, Math.min(t, a.length - 1));
  if (a[s] === r) return { stack: a, index: s, changed: false };
  for (let p = s - 1; p >= 0; p -= 1) if (a[p] === r) return { stack: a, index: p, changed: true };
  for (let p = s + 1; p < a.length; p += 1) if (a[p] === r) return { stack: a, index: p, changed: true };
  const c = a.slice(0, s + 1);
  c.push(r);
  const u = xr(c);
  return { stack: u, index: u.length - 1, changed: true };
}
function sf(e, t, n) {
  if (!(e == null ? void 0 : e.state) || !Array.isArray(t) || t.length === 0) return n == null ? void 0 : n(), false;
  const r = t[t.length - 1] ?? "";
  if (t.length === 1) return e.state.doc.toString() !== r && e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: r }, annotations: [jn.addToHistory.of(false)] }), n == null ? void 0 : n(), true;
  e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: t[0] ?? "" }, annotations: [jn.addToHistory.of(false), vr.of("full")] }), n == null ? void 0 : n();
  for (let s = 1; s < t.length; s += 1) {
    const c = t[s] ?? "";
    e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: c }, annotations: [vr.of("full")] });
  }
  return e.state.doc.toString() !== r && e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: r }, annotations: [jn.addToHistory.of(false)] }), true;
}
function To(e) {
  return e && typeof e.resetHistory == "function" ? () => e.resetHistory() : null;
}
function af(e) {
  var _a2;
  return e ? ((_a2 = e.getEditorView) == null ? void 0 : _a2.call(e)) ?? null : null;
}
function Lo(e) {
  var _a2;
  return ((_a2 = e == null ? void 0 : e.current) == null ? void 0 : _a2.value) ?? (e == null ? void 0 : e.current) ?? null;
}
function lf({ currentFile: e, value: t, onChange: n, editorRef: r, enabled: a = true }) {
  const s = a ? tf(e) : null, c = i.useRef([""]), u = i.useRef(0), p = i.useRef(null), m = i.useRef(false), g = i.useRef(null), T = i.useRef(null), S = i.useRef(t), R = i.useRef(false), C = i.useRef(null), N = i.useRef(0), O = i.useRef(t);
  S.current = t;
  const F = i.useCallback(async (A, z, ee) => {
    if (A) try {
      await Mo({ key: A, stack: z, index: ee });
    } catch (ne) {
      console.warn("[editor-undo-history] save failed:", ne);
    }
  }, []), Q = i.useCallback((A, z, ee) => {
    A && (T.current && clearTimeout(T.current), T.current = setTimeout(() => {
      T.current = null, F(A, z, ee);
    }, 300));
  }, [F]), G = i.useCallback(() => {
    g.current && (clearTimeout(g.current), g.current = null);
  }, []), k = i.useCallback(() => {
    const A = S.current ?? "", z = an(c.current, u.current, A);
    return c.current = z.stack, u.current = z.index, z;
  }, []), D = i.useCallback((A) => {
    const z = Lo(r), ee = af(z), ne = To(z);
    if (!ee) return false;
    const se = ++N.current;
    m.current = true;
    try {
      sf(ee, A, ne ?? void 0);
    } finally {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          N.current === se && (m.current = false);
        });
      });
    }
    return true;
  }, [r]), Z = i.useCallback((A, z) => {
    var _a2, _b;
    const ee = S.current ?? "", ne = ((_a2 = z == null ? void 0 : z.stack) == null ? void 0 : _a2.length) ? z.stack : [ee], se = ((_b = z == null ? void 0 : z.stack) == null ? void 0 : _b.length) ? z.index ?? z.stack.length - 1 : 0, le = an(ne, se, ee);
    c.current = le.stack, u.current = le.index, C.current = A, R.current = false, O.current = ee;
    const ce = le.stack.slice(0, le.index + 1), we = (J) => {
      p.current === A && (D(ce) || J <= 0 || setTimeout(() => we(J - 1), 50));
    };
    we(40), Q(A, le.stack, le.index);
  }, [D, Q]);
  return i.useEffect(() => {
    a && rf().catch(() => {
    });
  }, [a]), i.useEffect(() => {
    var _a2;
    if (!a) return;
    const A = p.current, z = s;
    if (G(), T.current && (clearTimeout(T.current), T.current = null), A && A !== z) {
      const le = k();
      F(A, le.stack, le.index);
    }
    p.current = z, C.current = null, R.current = false;
    const ee = Lo(r);
    if ((_a2 = To(ee)) == null ? void 0 : _a2(), !z) {
      c.current = [S.current ?? ""], u.current = 0;
      return;
    }
    const ne = ++N.current;
    let se = false;
    return (async () => {
      let le = null;
      try {
        le = await nf(z);
      } catch (ce) {
        console.warn("[editor-undo-history] load failed:", ce);
      }
      se || N.current !== ne || p.current === z && Z(z, le);
    })(), () => {
      se = true;
    };
  }, [a, s, r, G, k, F, Z]), i.useEffect(() => {
    if (!a || !s || C.current !== s || R.current || m.current || t === O.current) return;
    const A = t ?? "";
    O.current = A;
    const z = an(c.current, u.current, A);
    c.current = z.stack, u.current = z.index, D(z.stack.slice(0, z.index + 1)), Q(s, z.stack, z.index);
  }, [a, s, t, D, Q]), i.useEffect(() => {
    if (a) return () => {
      G(), T.current && (clearTimeout(T.current), T.current = null);
      const A = p.current;
      if (!A) return;
      const z = an(c.current, u.current, S.current ?? "");
      Mo({ key: A, stack: z.stack, index: z.index }).catch(() => {
      });
    };
  }, [a, G]), { onChange: i.useCallback((A) => {
    m.current || (O.current = A, R.current = true, n == null ? void 0 : n(A), !(!a || !p.current) && (G(), g.current = setTimeout(() => {
      if (g.current = null, m.current) return;
      const z = p.current;
      if (!z) return;
      const ee = of(c.current, u.current, A);
      ee.changed && (c.current = ee.stack, u.current = ee.index, Q(z, ee.stack, ee.index));
    }, Qd)));
  }, [a, n, G, Q]) };
}
const br = /^(\s*)([-+*])(\s+)(.*)$/, wr = /^(\s*)(\d+)([.)])(\s+)(.*)$/, js = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX])\](.*)$/, cf = /^(#{1,10})\s+(.*)$/;
function uf(e) {
  if (!e) return false;
  const t = e[0];
  return [...e].every((n) => n === t);
}
function Ms(e, t, n, r, a) {
  const s = t - r.length, c = n + a.length;
  if (s < 0 || c > e.length || e.sliceString(s, t) !== r || e.sliceString(n, c) !== a) return false;
  if (r === a && uf(r)) {
    const u = r[0] ?? "";
    if (s > 0 && e.sliceString(s - 1, s) === u || c < e.length && e.sliceString(c, c + 1) === u) return false;
  }
  return true;
}
function df(e, t, n, r) {
  const { from: a, to: s, empty: c } = t;
  if (c) {
    const m = `${n}${r}`;
    return { change: { from: a, to: s, insert: m }, next: Ge.cursor(a + n.length) };
  }
  const u = e.sliceString(a, s);
  if (u.length >= n.length + r.length && u.startsWith(n) && u.endsWith(r)) {
    const m = u.slice(n.length, u.length - r.length);
    return { change: { from: a, to: s, insert: m }, next: Ge.range(a, a + m.length) };
  }
  if (Ms(e, a, s, n, r)) {
    const m = a - n.length, g = s + r.length;
    return { change: { from: m, to: g, insert: u }, next: Ge.range(m, m + u.length) };
  }
  const p = `${n}${u}${r}`;
  return { change: { from: a, to: s, insert: p }, next: Ge.range(a + n.length, a + n.length + u.length) };
}
function ff(e, t) {
  if (t.empty) return null;
  const n = e.sliceString(t.from, t.to);
  if (!n) return null;
  let r = "`";
  for (; n.includes(r); ) r += "`";
  if (!n.includes(`
`) && n.startsWith(r) && n.endsWith(r) && n.length > r.length * 2) {
    const c = n.slice(r.length, n.length - r.length);
    return { change: { from: t.from, to: t.to, insert: c }, next: Ge.range(t.from, t.from + c.length) };
  }
  if (Ms(e, t.from, t.to, r, r)) {
    const c = t.from - r.length, u = t.to + r.length;
    return { change: { from: c, to: u, insert: n }, next: Ge.range(c, c + n.length) };
  }
  const s = `${r}${n}${r}`;
  return { change: { from: t.from, to: t.to, insert: s }, next: Ge.range(t.from + r.length, t.from + r.length + n.length) };
}
function Ts(e, t) {
  if (!t.length) return false;
  const n = t.map((a) => a.change).filter((a) => !!a).sort((a, s) => a.from - s.from);
  if (!n.length) return false;
  const r = t.map((a) => a.next);
  return e.dispatch({ changes: n, selection: Ge.create(r, e.state.selection.mainIndex) }), true;
}
function Tt(e, t, n = t) {
  if (!(e == null ? void 0 : e.state) || !t) return false;
  const r = e.state.selection.ranges.map((a) => df(e.state.doc, a, t, n));
  return Ts(e, r);
}
function mf(e) {
  return Tt(e, "**");
}
function pf(e) {
  return Tt(e, "*");
}
function hf(e) {
  return Tt(e, "~~");
}
function gf(e) {
  return Tt(e, "<u>", "</u>");
}
function xf(e) {
  return Tt(e, "^");
}
function bf(e) {
  return Tt(e, "~");
}
function Ls(e) {
  if (!(e == null ? void 0 : e.state)) return false;
  const t = e.state.selection.ranges.map((n) => ff(e.state.doc, n) ?? { next: n });
  return Ts(e, t);
}
function wf(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e.state.selection.ranges) {
    const r = e.state.doc.lineAt(n.from).number, a = e.state.doc.lineAt(n.to).number;
    for (let s = r; s <= a; s += 1) t.add(s);
  }
  return [...t].sort((n, r) => n - r);
}
function qt(e, t) {
  if (!(e == null ? void 0 : e.state)) return false;
  const n = [];
  for (const r of wf(e)) {
    const a = e.state.doc.line(r), s = t(a.text);
    s !== null && s !== a.text && n.push({ from: a.from, to: a.to, insert: s });
  }
  return n.length ? (e.dispatch({ changes: n }), true) : false;
}
function yf(e) {
  const t = e.match(br);
  if (t) return `${t[1] ?? ""}1. ${t[4] ?? ""}`;
  const n = e.match(wr);
  return n ? `${n[1] ?? ""}- ${n[5] ?? ""}` : null;
}
function vf(e) {
  const t = e.match(js);
  if (!t) return null;
  const n = t[1] ?? "", r = t[2] ?? " ", a = t[3] ?? "";
  return `${n}[${r === " " ? "x" : " "}]${a}`;
}
function kf(e) {
  return qt(e, yf);
}
function Sf(e) {
  return qt(e, vf);
}
function Ef(e) {
  return qt(e, (t) => {
    const n = t.match(br);
    if (n) {
      const a = n[1] ?? "", s = n[4] ?? "";
      return js.test(t) ? `${a}- ${s.replace(/^\[[ xX]\]\s?/, "")}` : `${a}${s}`;
    }
    const r = t.match(wr);
    return r ? `${r[1] ?? ""}- ${r[5] ?? ""}` : `- ${t}`;
  });
}
function Cf(e) {
  return qt(e, (t) => {
    const n = t.match(wr);
    if (n) return `${n[1] ?? ""}${n[5] ?? ""}`;
    const r = t.match(br);
    return r ? `${r[1] ?? ""}1. ${r[4] ?? ""}` : `1. ${t}`;
  });
}
function Ro(e, t) {
  if (t < 1 || t > 10) return false;
  const n = "#".repeat(t);
  return qt(e, (r) => {
    var _a2;
    const a = r.match(cf);
    return a ? ((_a2 = a[1]) == null ? void 0 : _a2.length) === t ? a[2] ?? "" : `${n} ${a[2] ?? ""}` : `${n} ${r}`;
  });
}
function En(e, t, n = t) {
  if (!(e == null ? void 0 : e.state) || !t) return false;
  const r = e.state.changeByRange((a) => {
    if (a.empty) return { range: a };
    const s = e.state.doc.sliceString(a.from, a.to), c = `${t}${s}${n}`;
    return { changes: { from: a.from, to: a.to, insert: c }, range: Ge.range(a.from + t.length, a.from + t.length + s.length) };
  });
  return r.changes.empty ? false : (e.dispatch(r), true);
}
function Nf(e) {
  return En(e, "$");
}
function jf(e) {
  return En(e, "[", "]");
}
function Mf(e) {
  return En(e, "(", ")");
}
function Tf(e) {
  return En(e, "{", "}");
}
const Lf = "s3haim_md_editor_toc_width", Rf = 360;
function Po(e) {
  const t = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), n = [];
  (t ? e.metaKey : e.ctrlKey) && n.push("mod"), e.altKey && n.push("alt"), e.shiftKey && n.push("shift");
  const r = (e.key || "").toLowerCase();
  return !r || r === "shift" || r === "control" || r === "alt" || r === "meta" || (n.push(r), n.length <= 1) ? null : n.join("+");
}
function ln(e) {
  return !e || typeof e != "string" ? "" : e.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
}
const Pf = Zs({ nonTightLists: false });
function Af(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const { state: t } = e, n = (_b = (_a2 = t.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof n != "number") return;
  const r = t.doc.lineAt(n);
  if (!/^(\s*)([-+*]|\d+[.)]|\[[ xX]\])/.test(r.text) || r.number < 2) return;
  const a = t.doc.line(r.number - 1);
  if (a.text.trim() !== "") return;
  const s = r.from - a.from;
  e.dispatch({ changes: { from: a.from, to: r.from, insert: "" }, selection: Ge.cursor(n - s) });
}
function Df(e) {
  return Pf(e) ? (Af(e), true) : wu(e) ? true : Js(e);
}
const If = Ys.highest($o.of([{ key: "Enter", run: Df }]));
function _f(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const t = (_b = (_a2 = e.state.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof t != "number") return;
  const n = e.state.doc.lineAt(t);
  e.dispatch({ changes: { from: n.from, to: n.from, insert: `
` }, selection: { anchor: n.from } });
}
function $f(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return false;
  const { key: t, code: n } = e;
  return t === "`" || t === "?" || t === "\\" || n === "Backquote" || n === "IntlBackslash";
}
function Rs(e, t) {
  if (t.defaultPrevented || t.ctrlKey || t.metaKey || t.altKey || t.isComposing) return false;
  switch (t.key) {
    case "$":
      return Nf(e);
    case "[":
      return jf(e);
    case "(":
      return Mf(e);
    case "{":
      return Tf(e);
    default:
      return false;
  }
}
function cn(e, t) {
  return Wi() ? t(e) : false;
}
const Hf = [{ key: "Alt-h", preventDefault: true, run: (e) => cn(e, ga) }, { key: "Alt-j", preventDefault: true, run: (e) => cn(e, xa) }, { key: "Alt-k", preventDefault: true, run: (e) => cn(e, ba) }, { key: "Alt-l", preventDefault: true, run: (e) => cn(e, wa) }];
Gs({ editorConfig: { languageUserDefined: { "ko-KR": Qs }, renderDelay: Uo() ? 500 : 0 }, codeMirrorExtensions(e, { keyBindings: t }) {
  const n = [...e].filter((s) => s.type !== "keymap" && s.type !== "linkShortener" && s.type !== "lineNumbers"), r = (t || []).filter((s) => {
    const c = String((s == null ? void 0 : s.key) || "").toLowerCase(), u = String((s == null ? void 0 : s.mac) || "").toLowerCase();
    return c !== "ctrl-d" && c !== "mod-d" && u !== "cmd-d" && c !== "ctrl-b" && c !== "mod-b" && u !== "cmd-b" && c !== "ctrl-u" && c !== "mod-u" && u !== "cmd-u" && c !== "ctrl-o" && c !== "mod-o" && u !== "cmd-o" && c !== "ctrl-arrowup" && c !== "mod-arrowup" && u !== "cmd-arrowup" && c !== "ctrl-arrowdown" && c !== "mod-arrowdown" && u !== "cmd-arrowdown" && !/^ctrl-[0-9]$/.test(c) && !/^mod-[0-9]$/.test(c) && !/^cmd-[0-9]$/.test(u);
  }), a = [{ key: "ArrowLeft", run: (s) => Cr(s, -1) }, { key: "ArrowRight", run: (s) => Cr(s, 1) }, { key: "Ctrl-ArrowLeft", mac: "Alt-ArrowLeft", run: (s) => ct(s, -1, ca), shift: (s) => ct(s, -1, la) }, { key: "Ctrl-ArrowRight", mac: "Alt-ArrowRight", run: (s) => ct(s, 1, da), shift: (s) => ct(s, 1, ua) }, { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: (s) => ct(s, -1, ma), shift: (s) => ct(s, -1, fa) }, { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: (s) => ct(s, 1, ha), shift: (s) => ct(s, 1, pa) }, ...Hf, { key: "Alt--", preventDefault: true, run: kf }, { key: "Ctrl-Tab", run: Sf }, { key: "Ctrl-d", mac: "Cmd-d", preventDefault: true, run: (s) => (na(s), true) }, { key: "Ctrl-b", mac: "Cmd-b", preventDefault: true, run: mf }, { key: "Ctrl-i", mac: "Cmd-i", preventDefault: true, run: pf }, { key: "Ctrl-u", mac: "Cmd-u", preventDefault: true, run: gf, shift: Ef }, { key: "Ctrl-o", mac: "Cmd-o", preventDefault: true, run: Cf }, { key: "Shift-Ctrl-s", mac: "Shift-Cmd-s", preventDefault: true, run: hf }, { key: "Ctrl-ArrowUp", mac: "Cmd-ArrowUp", preventDefault: true, run: xf }, { key: "Ctrl-ArrowDown", mac: "Cmd-ArrowDown", preventDefault: true, run: bf }, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => ({ key: `Ctrl-${s}`, mac: `Cmd-${s}`, preventDefault: true, run: (c) => Ro(c, s) })), { key: "Ctrl-0", mac: "Cmd-0", preventDefault: true, run: (s) => Ro(s, 10) }, { any: (s, c) => (c.ctrlKey || c.metaKey) && c.altKey && c.code === "KeyC" ? Ls(s) : Rs(s, c) }, { key: "Mod-Alt-ArrowUp", run: ea }, { key: "Mod-Alt-ArrowDown", run: ta }, ...r];
  return n.some((s) => s.type === "drawSelection") || n.push({ type: "drawSelection", extension: ra() }), n.push({ type: "markdownSingleNewlineEnter", extension: If }, { type: "lineNumbers", extension: md() }, { type: "allowMultipleSelections", extension: oa.allowMultipleSelections.of(true) }, { type: "clickAddsSelectionRange", extension: Ft.clickAddsSelectionRange.of((s) => {
    const c = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    return s.altKey || (c ? s.metaKey : s.ctrlKey);
  }) }, { type: "multiCursorPreview", extension: sa({ minSelectionLength: 2, maxMatches: 200 }) }, { type: "keymap", extension: $o.of(a) }, { type: "base64ImageFold", extension: pu(os()) }, { type: "autocompleteGate", extension: Ft.updateListener.of((s) => {
    xu(s), !Vo() && aa(s.state) === "active" && ia(s.view);
  }) }), n;
}, markdownItPlugins(e) {
  return Ki(e);
} });
function lm({ value: e, onChange: t, onSave: n, theme: r = "light", currentFile: a = null, previewOnly: s = false, isMobileLayout: c = false, onUploadImage: u, isUploadingEditorImage: p = false, uploadImagePercent: m = 0, onCancelUploadImage: g, onResolveWikiImageUrl: T, snippetConfig: S = { snippets: [] }, llmProviderProfiles: R = [], getImgbbApiKey: C, onOpenViewPath: N, onRequestConvertAllImagesToWiki: O, onRegisterConvertAllImagesToWiki: F }) {
  var _a2, _b;
  const Q = Ao(), { showAlert: G } = bi(), k = i.useId(), D = i.useMemo(() => yc(k), [k]), Z = i.useMemo(() => vc(D), [D]), E = i.useRef(null), A = i.useRef(null), z = i.useRef(null), ee = i.useRef(null), ne = i.useRef(S), se = i.useRef(e), le = i.useRef(a), ce = i.useRef(r), we = i.useRef("");
  i.useEffect(() => {
    se.current = e, le.current = a, ce.current = r;
  }, [e, a, r]), i.useEffect(() => {
    const { issues: f } = Wo(e ?? "");
    if (!f.length) {
      we.current = "";
      return;
    }
    const h = wi(f);
    h !== we.current && (we.current = h, G({ title: "Cover syntax error", message: `note-cover has invalid syntax.

${h}` }));
  }, [e, G]);
  const J = i.useCallback((f = {}) => {
    const h = se.current ?? "", x = le.current;
    Oo({ currentFile: x, editorContent: h }), Q(Bo(x == null ? void 0 : x.id), { state: { value: h, theme: ce.current === "dark" ? "dark" : "light", currentFile: x, ...f.openCoverEdit ? { openCoverEdit: true } : {} } });
  }, [Q]), { onChange: V } = lf({ currentFile: a, value: e, onChange: t, editorRef: E, enabled: !s }), te = Zu({ getMarkdown: () => se.current ?? "", setMarkdown: (f) => {
    typeof t == "function" && t(f);
  } }), de = i.useRef(te.openAtOffset), Ee = i.useRef(te.openPreviewTable);
  i.useEffect(() => {
    de.current = te.openAtOffset, Ee.current = te.openPreviewTable;
  }, [te.openAtOffset, te.openPreviewTable]);
  const We = i.useRef(null), [Fe, Ue] = i.useState(false), [re, ue] = i.useState(false), [je, Ce] = i.useState(null), $ = i.useRef(() => {
  }), [B, Y] = i.useState(false), [q, xe] = i.useState(null), [ye, ve] = i.useState(0), [he, Ne] = i.useState(false), [Me, pe] = i.useState(false), Oe = i.useRef({ from: 0, to: 0 }), Ae = i.useRef(V);
  i.useEffect(() => {
    Ae.current = V;
  }, [V]);
  const [qe, Be] = i.useState(null), [ke, Xe] = i.useState(null), [tt, Ie] = i.useState(false), [nt, rt] = i.useState(null), [bt, at] = i.useState(false), [Te, j] = i.useState(null), [P, U] = i.useState(null), ie = i.useRef(null), [De, Ke] = Yl(), [_e, Le] = su(), [ot, it] = au(), [Ze, Pe] = iu(), Se = i.useMemo(() => Uo(), []), me = Se ? false : Ze, Re = i.useRef(null);
  i.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3, _b2, _c2;
      const y = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      y && (Re.current = y.state.selection);
    }, h = (w) => {
      !(w.metaKey || w.ctrlKey) || w.altKey || w.shiftKey || w.key.toLowerCase() === "k" && f();
    };
    window.addEventListener("keydown", h, true);
    const x = yi(f);
    return () => {
      window.removeEventListener("keydown", h, true), x();
    };
  }, [s]), i.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3;
      return ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current;
    }, h = () => {
      var _a3, _b2;
      const H = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3), W = Re.current;
      !H || !W || H.dispatch({ selection: W, scrollIntoView: true });
    }, x = (L) => {
      var _a3;
      const H = f();
      H && (h(), (_a3 = H.focus) == null ? void 0 : _a3.call(H), typeof H.execCommand == "function" && H.execCommand(L));
    }, w = () => {
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
      const W = (_b2 = L.getEditorView) == null ? void 0 : _b2.call(L);
      W && (W.dispatch(W.state.replaceSelection(H)), (_c2 = W.focus) == null ? void 0 : _c2.call(W));
    }, y = (L = {}) => {
      J(L);
    }, I = {};
    for (const L of vi) L.directive && (I[L.id] = () => x(L.directive));
    return I["editor-revoke"] = () => {
      var _a3, _b2;
      h();
      const L = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      L && (L.focus(), Us(L));
    }, I["editor-next"] = () => {
      var _a3, _b2;
      h();
      const L = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      L && (L.focus(), qs(L));
    }, I["editor-llm-assist"] = () => Ue(true), I["editor-export-pdf"] = y, I["editor-pgbr"] = () => {
      h(), w();
    }, I["editor-heading-remap"] = () => {
      h(), $.current();
    }, I["editor-checklist-progress"] = () => Y(true), I["editor-table-edit"] = () => {
      var _a3, _b2;
      h();
      const L = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      if (!L) return;
      const { from: H, to: W } = L.state.selection.main;
      de.current(H, W) || G({ title: "No table", message: "No haim-table found at the cursor or selection position." });
    }, I["editor-image-upload"] = () => {
      const L = document.createElement("input");
      L.type = "file", L.accept = "image/*", L.multiple = true, L.onchange = () => {
        var _a3;
        const H = Array.from(L.files || []);
        H.length && ((_a3 = We.current) == null ? void 0 : _a3.call(We, H));
      }, L.click();
    }, I["editor-image-clip"] = () => {
      const L = document.createElement("input");
      L.type = "file", L.accept = "image/*", L.onchange = () => {
        var _a3;
        const H = (_a3 = L.files) == null ? void 0 : _a3[0];
        H && Be(H);
      }, L.click();
    }, I["editor-convert-all-images-to-wiki"] = () => {
      typeof O == "function" && O();
    }, I["editor-insert-footnote"] = () => {
      ki({ mode: "footnote-insert" });
    }, I["editor-insert-snippet"] = (L) => {
      var _a3, _b2, _c2;
      const H = typeof L == "string" ? L : "";
      if (!H) return;
      h();
      const oe = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      oe && (oe.dispatch(oe.state.replaceSelection(H)), (_c2 = oe.focus) == null ? void 0 : _c2.call(oe));
    }, Si(I);
  }, [s, J, G, O]), i.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3, _b2, _c2;
      return ((_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? null;
    }, h = () => {
      const w = f(), y = Re.current;
      !w || !y || w.dispatch({ selection: y, scrollIntoView: true });
    }, x = (w, y) => {
      var _a3, _b2;
      const I = f();
      I && (I.dispatch({ changes: { from: 0, to: I.state.doc.length, insert: w }, selection: { anchor: y }, scrollIntoView: true }), (_a3 = I.focus) == null ? void 0 : _a3.call(I)), (_b2 = Ae.current) == null ? void 0 : _b2.call(Ae, w);
    };
    return Ei({ getMarkdown: () => {
      var _a3;
      return ((_a3 = f()) == null ? void 0 : _a3.state.doc.toString()) ?? se.current ?? "";
    }, insertExisting: (w) => {
      h();
      const y = f(), I = (y == null ? void 0 : y.state.doc.toString()) ?? se.current ?? "", L = y == null ? void 0 : y.state.selection.main, H = zi(I, (L == null ? void 0 : L.from) ?? 0, (L == null ? void 0 : L.to) ?? 0, w);
      x(H.next, H.caret);
    }, openCompose: () => {
      var _a3;
      h();
      const y = (_a3 = f()) == null ? void 0 : _a3.state.selection.main;
      Oe.current = { from: (y == null ? void 0 : y.from) ?? 0, to: (y == null ? void 0 : y.to) ?? 0 }, pe(true);
    } });
  }, [s]);
  const { width: ze, isResizing: wt, handleProps: yt } = Ci({ storageKey: Lf, defaultWidth: Rf, minWidth: 160, collapseBelowWidth: 80, maxWidth: 640, edge: "right", onCollapseBelowMin: () => {
    var _a3, _b2, _c2;
    (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.toggleCatalog) == null ? void 0 : _c2.call(_b2, false);
  } }), dt = i.useMemo(() => {
    const { meta: f } = Ni(e ?? "");
    return f;
  }, [e]), Xt = i.useMemo(() => {
    const f = dt == null ? void 0 : dt.fonts;
    return f ? { "--print-font-body": tn(f.body), "--print-font-heading": tn(f.heading), "--print-font-bold": tn(f.bold), "--print-font-code": tn(f.code, "mono") } : {};
  }, [dt]);
  i.useEffect(() => {
    ne.current = S || { snippets: [] };
  }, [S]), i.useEffect(() => {
    const f = () => {
      var _a3, _b2, _c2;
      const y = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return y ? (hu(y, _e), true) : false;
    };
    if (f()) return;
    const h = window.setTimeout(f, 50), x = window.setTimeout(f, 250);
    return () => {
      window.clearTimeout(h), window.clearTimeout(x);
    };
  }, [_e]), i.useEffect(() => {
    const f = A.current;
    if (!f) return;
    const h = () => {
      const w = f.querySelector(".md-editor-catalog-fixed, .md-editor-catalog-flat");
      j((y) => y === w ? y : w);
    };
    h();
    const x = new MutationObserver(h);
    return x.observe(f, { childList: true, subtree: true }), () => x.disconnect();
  }, []), i.useEffect(() => {
    const f = A.current;
    f && f.style.setProperty("--md-catalog-width", `${ze}px`);
  }, [ze]), i.useLayoutEffect(() => {
    if (!Te) {
      U(null);
      return;
    }
    const f = () => {
      const w = Te.getBoundingClientRect();
      if (w.width <= 0 || w.height <= 0) {
        U(null);
        return;
      }
      U({ top: w.top, left: w.left, height: w.height });
    };
    f();
    const h = new ResizeObserver(f);
    h.observe(Te);
    const x = A.current;
    return x && h.observe(x), window.addEventListener("resize", f), window.addEventListener("scroll", f, true), () => {
      h.disconnect(), window.removeEventListener("resize", f), window.removeEventListener("scroll", f, true);
    };
  }, [Te, ze]), i.useEffect(() => {
    if (Te) return Nc(Te, { getEditorRoot: () => A.current, mdHeadingId: (f) => Z(f) });
  }, [Te, Z]), nc(A, e, T, (a == null ? void 0 : a.id) ?? null), Jl(A, { layoutKey: `${r}|${e}` }), i.useEffect(() => {
    const f = A.current;
    if (!f || !e) return;
    let h = 0;
    const x = () => {
      bd(f, e, T);
    }, w = () => {
      const W = f.querySelectorAll("[data-note-cover-mount]");
      !W.length || !(f.querySelector(".md-note-cover-placeholder--pending") || [...W].some((be) => be.childNodes.length === 0)) || h || (h = window.requestAnimationFrame(() => {
        h = 0, x();
      }));
    }, I = [0, 80, 280, 600, 1100, 2e3].map((W) => setTimeout(x, W)), L = f.querySelector(".md-editor-preview") || f, H = typeof MutationObserver < "u" ? new MutationObserver(w) : null;
    return H == null ? void 0 : H.observe(L, { childList: true, subtree: true }), () => {
      h && window.cancelAnimationFrame(h), I.forEach((W) => clearTimeout(W)), H == null ? void 0 : H.disconnect();
    };
  }, [e, T, a == null ? void 0 : a.id]), i.useEffect(() => {
    const f = A.current;
    return () => {
      wd(f);
    };
  }, []), i.useEffect(() => {
    if (s) return;
    const f = ed(a), h = () => {
      var _a3, _b2, _c2;
      const y = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return y ? (ad(y, f), true) : false;
    };
    if (h()) return;
    const x = [50, 200, 500, 1e3].map((w) => setTimeout(h, w));
    return () => x.forEach((w) => clearTimeout(w));
  }, [a == null ? void 0 : a.id, a == null ? void 0 : a.type, s]), i.useEffect(() => {
    const f = A.current;
    if (!f) return;
    const h = Ld(a), x = { current: [] };
    let w = false, y = null, I = null, L = [];
    const H = () => f.querySelector(".md-editor-preview"), W = () => {
      if (w) return;
      const ae = H();
      if (!ae || !Cd(ae)) return;
      const $e = Md(ae, { collapsedIds: x.current, onCollapsedChange: (d) => {
        x.current = d, h && Pd(h, d);
      } }), l = y;
      y = () => {
        l == null ? void 0 : l(), $e();
      };
    }, oe = (ae) => {
      !ae || I || typeof MutationObserver > "u" || (I = new MutationObserver(W), I.observe(ae, { childList: true, subtree: true }));
    };
    return (async () => {
      if (h) {
        const ae = await Rd(h);
        if (w) return;
        ae && (x.current = ae);
      }
      w || (oe(H()), W(), L = [80, 250, 600].map((ae) => setTimeout(() => {
        w || (oe(H()), W());
      }, ae)));
    })(), () => {
      w = true, L.forEach((ae) => clearTimeout(ae)), I == null ? void 0 : I.disconnect(), I = null, y == null ? void 0 : y(), y = null;
    };
  }, [a == null ? void 0 : a.id, a == null ? void 0 : a.type]), i.useEffect(() => {
    var _a3, _b2, _c2;
    if (!s) return;
    (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c2.call(_b2, true);
  }, [s]), i.useEffect(() => {
    if (!c || s || !(a == null ? void 0 : a.id)) return;
    Pe(false);
    const f = () => {
      var _a3, _b2, _c2;
      (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c2.call(_b2, true);
    };
    f();
    const h = [80, 240, 600].map((x) => setTimeout(f, x));
    return () => {
      h.forEach((x) => clearTimeout(x));
    };
  }, [c, s, a == null ? void 0 : a.id, Pe]), i.useEffect(() => {
    if (s || Se) return;
    const f = A.current;
    if (!f) return;
    const h = () => f.querySelector(".md-editor-preview"), x = () => me;
    let w = null;
    const y = (l) => l instanceof Element ? Qn(l) ? true : !!l.closest("a, button, input, textarea, select, .md-editor-code-action, [data-transform-handle]") : false, I = (l) => {
      var _a3, _b2, _c2, _d2, _e2, _f2;
      const d = h();
      if (!d || $t(d)) return;
      if (!x()) {
        const _ = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window);
        (_ == null ? void 0 : _.rangeCount) && d.contains(_.getRangeAt(0).commonAncestorContainer) && !_.getRangeAt(0).collapsed ? Mn(d, { allowCollapsed: false }) : At(d);
        return;
      }
      const b = (_b2 = window.getSelection) == null ? void 0 : _b2.call(window);
      if (!b || b.rangeCount === 0) {
        if (!(l instanceof Element) || !l.closest("td, th")) return;
      } else {
        const _ = b.getRangeAt(0);
        if (!d.contains(_.commonAncestorContainer) && !(l instanceof Element && l.closest("td, th"))) return;
      }
      const v = (_e2 = (_d2 = ((_c2 = E.current) == null ? void 0 : _c2.value) ?? E.current) == null ? void 0 : _d2.getEditorView) == null ? void 0 : _e2.call(_d2);
      v && ((b == null ? void 0 : b.rangeCount) && d.contains(b.getRangeAt(0).commonAncestorContainer) && Mn(d, { allowCollapsed: true }), kr(v, d, { focus: true, target: l }), Tn(), (_f2 = ee.current) == null ? void 0 : _f2.schedule({ withRetries: true }));
    }, L = (l) => l.button === 2 || l.button === 0 && l.ctrlKey, H = (l, d) => Sr(d, l.clientX, l.clientY) ? true : Er(l.clientX, l.clientY) ? Ma(d) : false, W = (l) => {
      var _a3, _b2, _c2, _d2;
      const d = h();
      if (!d) return;
      const b = l.target;
      if (!(b instanceof Node)) return;
      if (d.contains(b) && L(l)) {
        H(l, d);
        return;
      }
      if (d.contains(b)) {
        w = { x: l.clientX, y: l.clientY }, !Qn(b) && !x() && At(d);
        return;
      }
      if (w = null, (_d2 = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) == null ? void 0 : _d2.dom.contains(b)) {
        if (L(l)) return;
        Ln(), x() || At(d);
      }
    }, oe = (l) => {
      const d = h();
      !d || !(l.target instanceof Node) || !d.contains(l.target) || H(l, d);
    }, be = (l) => {
      var _a3, _b2, _c2;
      if (L(l)) return;
      const d = h();
      if (!(!d || !(l.target instanceof Node) || !d.contains(l.target)) && !y(l.target)) {
        if (er(f)) {
          const b = !!(w && Math.hypot(l.clientX - w.x, l.clientY - w.y) > 6);
          if (w = null, !x() || b) return;
          const v = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), _ = l.target instanceof Element ? tr(l.target, d) : null;
          v && _ && (Tn(), ko(_, v, d, l.clientX, l.clientY));
          return;
        }
        w = null, requestAnimationFrame(() => I(l.target));
      }
    }, ae = (l) => {
      var _a3, _b2, _c2, _d2;
      const d = h();
      if (!(!d || !(l.target instanceof Node) || !d.contains(l.target)) && !y(l.target)) {
        if (er(f)) {
          if (!x()) return;
          const M = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), v = (_d2 = l.changedTouches) == null ? void 0 : _d2[0], _ = l.target instanceof Element ? tr(l.target, d) : null;
          M && _ && v && (Tn(), ko(_, M, d, v.clientX, v.clientY));
          return;
        }
        requestAnimationFrame(() => I(l.target));
      }
    }, $e = (l) => {
      var _a3, _b2, _c2, _d2, _e2;
      if (!x() || l.isComposing || l.keyCode === 229 || l.key === "Process" || (l.metaKey || l.ctrlKey) && (l.key === "s" || l.key === "S" || l.code === "KeyS") || Qn(l.target)) return;
      const d = h();
      if (!d || $t(d) || er(f)) return;
      const b = l.target, M = b instanceof Node && d.contains(b), v = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), _ = (v == null ? void 0 : v.rangeCount) > 0 && d.contains(v.getRangeAt(0).commonAncestorContainer);
      if (!M && !_) return;
      const ge = (_d2 = (_c2 = ((_b2 = E.current) == null ? void 0 : _b2.value) ?? E.current) == null ? void 0 : _c2.getEditorView) == null ? void 0 : _d2.call(_c2);
      ge && (ge.hasFocus || (_ ? (Mn(d, { allowCollapsed: true }), kr(ge, d, { focus: true }), (_e2 = ee.current) == null ? void 0 : _e2.schedule({ withRetries: true })) : ge.focus()));
    };
    return f.addEventListener("mousedown", W, true), f.addEventListener("contextmenu", oe, true), f.addEventListener("mouseup", be), f.addEventListener("touchend", ae, { passive: true }), f.addEventListener("keydown", $e, true), () => {
      At(h()), f.removeEventListener("mousedown", W, true), f.removeEventListener("contextmenu", oe, true), f.removeEventListener("mouseup", be), f.removeEventListener("touchend", ae), f.removeEventListener("keydown", $e, true);
    };
  }, [s, me, Se]), i.useEffect(() => {
    var _a3, _b2, _c2, _d2;
    if (s) {
      (_a3 = z.current) == null ? void 0 : _a3.stop(), z.current = null, (_b2 = ee.current) == null ? void 0 : _b2.stop(), ee.current = null, Ln();
      return;
    }
    const f = A.current, h = () => {
      var _a4;
      return (_a4 = f ?? A.current) == null ? void 0 : _a4.querySelector(".md-editor-preview");
    }, x = () => {
      var _a4, _b3, _c3;
      return (_c3 = (_b3 = ((_a4 = E.current) == null ? void 0 : _a4.value) ?? E.current) == null ? void 0 : _b3.getEditorView) == null ? void 0 : _c3.call(_b3);
    };
    (_c2 = z.current) == null ? void 0 : _c2.stop();
    const w = Zd({ getPreviewRoot: h, getView: x });
    z.current = w, (_d2 = ee.current) == null ? void 0 : _d2.stop(), ee.current = null, me ? ee.current = Wd({ getPreviewRoot: h, getView: x }) : Ln();
    const y = gu((I, L) => {
      var _a4;
      const H = x();
      !H || I !== H || (w.schedule({ withRetries: L.docChanged }), me && ((_a4 = ee.current) == null ? void 0 : _a4.schedule({ withRetries: L.docChanged })));
    });
    return () => {
      var _a4, _b3;
      y(), (_a4 = ee.current) == null ? void 0 : _a4.stop(), ee.current = null, (_b3 = z.current) == null ? void 0 : _b3.stop(), z.current = null;
    };
  }, [s, me]), i.useEffect(() => {
    if (s || Se || !me) {
      Bd();
      return;
    }
    const f = A.current;
    if (f) return Od(f, { getPreviewRoot: () => f.querySelector(".md-editor-preview"), getView: () => {
      var _a3, _b2, _c2;
      return (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    }, isEnabled: () => me });
  }, [s, me, Se]), i.useEffect(() => {
    var _a3, _b2, _c2;
    const h = (_a3 = A.current) == null ? void 0 : _a3.querySelector(".md-editor-preview");
    if (Kd(), !!h && ((_b2 = z.current) == null ? void 0 : _b2.schedule({ withRetries: true }), !Se)) {
      if (me && !$t(h)) {
        (_c2 = ee.current) == null ? void 0 : _c2.schedule({ withRetries: true });
        return;
      }
      me || At(h);
    }
  }, [e, a == null ? void 0 : a.id, me, Se]), i.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3;
      const h = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current;
      return (h == null ? void 0 : h.domEventHandlers) ? (h.domEventHandlers({ paste: (x, w) => {
        const y = x.clipboardData;
        if (!y || !w) return;
        const I = tc(y);
        if (I.length && typeof u == "function") {
          if (p) return x.preventDefault(), false;
          x.preventDefault();
          const H = w;
          return u(I).then((W) => {
            var _a4, _b2, _c2;
            if (!(W == null ? void 0 : W.length)) return;
            const oe = W.map(($e) => `![[${$e}]]`).join(`
`), ae = ((_c2 = (_b2 = ((_a4 = E.current) == null ? void 0 : _a4.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? H;
            ae && ae.dispatch(ae.state.replaceSelection(oe));
          }), false;
        }
        const L = y.getData("text/plain") ?? "";
        if (L) return x.preventDefault(), w.dispatch(w.state.replaceSelection(L)), false;
      }, keydown: (x, w) => {
        var _a4;
        if (!w) return;
        if (!w.composing && $f(x) && Ls(w) || !w.composing && Rs(w, x)) return x.preventDefault(), x.stopPropagation(), true;
        const y = Po(x);
        if (!y) return;
        if (y === "mod+shift+enter") return x.preventDefault(), x.stopPropagation(), _f(w), false;
        if (y === "mod+s") return;
        const L = ((_a4 = ne.current) == null ? void 0 : _a4.snippets) || [], H = ln(y), W = L.find((oe) => ln(oe.prefix) === H && (oe.body || "").trim());
        if (W) return x.preventDefault(), x.stopPropagation(), w.dispatch(w.state.replaceSelection(W.body)), false;
      } }), true) : false;
    };
    if (!f()) {
      const h = setTimeout(f, 100);
      return () => clearTimeout(h);
    }
  }, [s, u, p]), i.useEffect(() => {
    if (s) return;
    const f = (h) => {
      var _a3, _b2, _c2, _d2, _e2, _f2;
      const x = Po(h);
      if (!x || x === "mod+s") return;
      const y = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      if (!y) return;
      const I = A.current, L = h.target;
      if (!(I == null ? void 0 : I.contains(L)) && !((_d2 = y.dom) == null ? void 0 : _d2.contains(L))) return;
      const W = ((_e2 = ne.current) == null ? void 0 : _e2.snippets) || [], oe = ln(x), be = W.find((ae) => ln(ae.prefix) === oe && (ae.body || "").trim());
      be && (h.preventDefault(), h.stopPropagation(), (_f2 = h.stopImmediatePropagation) == null ? void 0 : _f2.call(h), y.dispatch(y.state.replaceSelection(be.body)));
    };
    return document.addEventListener("keydown", f, true), () => document.removeEventListener("keydown", f, true);
  }, [s, S]), i.useEffect(() => {
    if (typeof n != "function") return;
    const f = (h) => {
      var _a3, _b2, _c2, _d2, _e2;
      if (!(h.ctrlKey || h.metaKey) || h.altKey || h.key !== "s" && h.key !== "S" && h.code !== "KeyS") return;
      const x = A.current;
      if (!x) return;
      const w = h.target, y = w instanceof Node && x.contains(w), I = x.querySelector(".md-editor-preview"), L = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), H = !!(I && (L == null ? void 0 : L.rangeCount) && I.contains(L.getRangeAt(0).commonAncestorContainer));
      if (!y && !H && !$t(I)) return;
      h.preventDefault(), h.stopPropagation(), (_b2 = h.stopImmediatePropagation) == null ? void 0 : _b2.call(h);
      const oe = (_e2 = (_d2 = ((_c2 = E.current) == null ? void 0 : _c2.value) ?? E.current) == null ? void 0 : _d2.getEditorView) == null ? void 0 : _e2.call(_d2);
      Vd(oe), n();
    };
    return document.addEventListener("keydown", f, true), () => document.removeEventListener("keydown", f, true);
  }, [n]), i.useEffect(() => {
    const f = A.current;
    if (!f) return;
    const h = (x) => {
      var _a3, _b2, _c2, _d2, _e2, _f2, _g, _h, _i2;
      const w = f.querySelector(".md-editor-preview"), y = (_b2 = (_a3 = x.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "table");
      if (y && w && w.contains(y) || w && (Sr(w, x.clientX, x.clientY) || Er(x.clientX, x.clientY))) return;
      const I = (_d2 = (_c2 = x.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, ".cm-editor");
      if (I && f.contains(I)) {
        const be = (_g = (_f2 = ((_e2 = E.current) == null ? void 0 : _e2.value) ?? E.current) == null ? void 0 : _f2.getEditorView) == null ? void 0 : _g.call(_f2);
        if (be) {
          const { from: ae, to: $e } = be.state.selection.main, l = se.current ?? "";
          if (rr(l, ae, $e)) {
            x.preventDefault(), de.current(ae, $e);
            return;
          }
        }
      }
      const L = (_i2 = (_h = x.target) == null ? void 0 : _h.closest) == null ? void 0 : _i2.call(_h, "img[data-wiki-path], img[data-md-src]");
      if (!L || !f.contains(L)) return;
      const H = Hi(L);
      if (!H.kind || !H.key) return;
      x.preventDefault();
      const W = H.kind === "wiki" ? Fi(f, L, H.key) : Oi(f, L, H.key);
      xe({ kind: H.kind, key: H.key, width: H.width, height: H.height, occurrence: W, imageSrc: L.currentSrc || L.src || "" });
    };
    return f.addEventListener("contextmenu", h), () => f.removeEventListener("contextmenu", h);
  }, [G]), i.useEffect(() => {
    const f = A.current;
    if (!f) return;
    const h = (x) => {
      var _a3, _b2, _c2, _d2;
      if ((_b2 = (_a3 = x.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const w = f.querySelector(".md-editor-preview"), y = (_d2 = (_c2 = x.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "table");
      if (!y || !w || !w.contains(y)) return;
      x.preventDefault(), x.stopPropagation(), Ee.current(y, w) || G({ title: "No table", message: "No haim-table found at this position. Click inside a table cell and try again." });
    };
    return f.addEventListener("dblclick", h, true), () => f.removeEventListener("dblclick", h, true);
  }, [G]), i.useEffect(() => {
    const f = A.current;
    if (f) return Ca(f);
  }, []), i.useEffect(() => {
    const f = () => {
      ve((h) => h + 1);
    };
    return window.addEventListener($r, f), () => {
      window.removeEventListener($r, f);
    };
  }, []), i.useEffect(() => {
    const f = A.current;
    if (!f) return;
    const h = (y) => {
      (y.classList.contains("md-note-cover-placeholder--ready") || y.classList.contains("md-note-cover-placeholder--empty") || y.classList.contains("md-note-cover-placeholder--pending")) && at(true);
    }, x = (y) => {
      var _a3, _b2, _c2, _d2, _e2, _f2;
      const I = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      if (I && f.contains(I)) {
        y.preventDefault(), y.stopPropagation(), h(I);
        return;
      }
      const L = (_d2 = (_c2 = y.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "[data-chat-saved-note]");
      if (L && f.contains(L)) {
        y.preventDefault(), y.stopPropagation(), Q(Bi({ id: L.getAttribute("data-chat-id") || "", href: L.getAttribute("data-chat-href") || L.getAttribute("href") || "" }));
        return;
      }
      const H = (_f2 = (_e2 = y.target) == null ? void 0 : _e2.closest) == null ? void 0 : _f2.call(_e2, "a[href]");
      if (!H || !f.contains(H) || y.metaKey || y.ctrlKey || y.shiftKey || y.altKey || typeof y.button == "number" && y.button !== 0 || H.hasAttribute("data-md-footnote-to")) return;
      const W = H.getAttribute("href") || "", oe = Vi(W, { currentViewPath: (a == null ? void 0 : a.type) ? a.id : null });
      if (oe.kind !== "app") return;
      if (y.preventDefault(), y.stopPropagation(), oe.viewPath && typeof N == "function") {
        N(oe.viewPath);
        return;
      }
      const be = oe.search || "", ae = oe.hash || "";
      Q(`${oe.pathname || "/"}${be}${ae}`);
    }, w = (y) => {
      var _a3, _b2;
      if (y.key !== "Enter" && y.key !== " ") return;
      const I = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      !I || !f.contains(I) || (y.preventDefault(), y.stopPropagation(), h(I));
    };
    return f.addEventListener("click", x), f.addEventListener("keydown", w), () => {
      f.removeEventListener("click", x), f.removeEventListener("keydown", w);
    };
  }, [Q, a == null ? void 0 : a.id, a == null ? void 0 : a.type, N]);
  const Yt = i.useCallback(({ width: f, height: h }) => {
    const x = q;
    if (!(x == null ? void 0 : x.key) || typeof V != "function") return;
    const w = x.kind === "wiki" ? In(e, { path: x.key, occurrence: x.occurrence ?? 0, width: f, height: h }) : _n(e, { src: x.key, occurrence: x.occurrence ?? 0, width: f, height: h });
    w.updated && w.markdown !== e && V(w.markdown);
  }, [q, V, e]), Gt = i.useCallback(async ({ file: f }) => {
    var _a3;
    const h = q;
    if (!(h == null ? void 0 : h.key) || typeof u != "function") throw new Error("Upload handler not available.");
    const w = (_a3 = await u([f])) == null ? void 0 : _a3[0];
    if (!w) throw new Error("Upload succeeded but no path was returned.");
    if (typeof V != "function") return;
    const y = h.kind === "wiki" ? ji(e, { path: h.key, occurrence: h.occurrence ?? 0, nextPath: w }) : Hr(e, { src: h.key, occurrence: h.occurrence ?? 0, nextPath: w });
    y.updated && y.markdown !== e && V(y.markdown);
  }, [V, u, e, q]), lt = i.useCallback(async ({ width: f, height: h }) => {
    var _a3;
    const x = q;
    if (!(x == null ? void 0 : x.key) || x.kind !== "markdown") throw new Error("Cannot convert: not a markdown image.");
    if (typeof V != "function") throw new Error("Cannot apply change.");
    const w = await Mi({ markdownSrc: x.key, displaySrc: x.imageSrc, currentNotePath: (a == null ? void 0 : a.id) ?? null });
    let y = "";
    if (w.mode === "path") y = w.path;
    else {
      if (typeof u != "function") throw new Error("Upload handler not available.");
      if (y = ((_a3 = await u([w.file])) == null ? void 0 : _a3[0]) || "", !y) throw new Error("Upload succeeded but no path was returned.");
    }
    const I = Hr(e, { src: x.key, occurrence: x.occurrence ?? 0, nextPath: y, width: f, height: h });
    I.updated && I.markdown !== e && V(I.markdown);
  }, [a == null ? void 0 : a.id, V, u, e, q]), Cn = i.useCallback(async ({ width: f, height: h }) => {
    const x = q;
    if (!(x == null ? void 0 : x.key) || !(x == null ? void 0 : x.kind)) throw new Error("Cannot convert: image target is missing.");
    if (typeof V != "function") throw new Error("Cannot apply change.");
    const w = typeof C == "function" ? String(await Promise.resolve(C()) || "").trim() : "";
    if (!w) throw new Error("ImgBB API key is missing. Please add it in settings.");
    const y = Ti({ path: x.key, imageSrc: x.imageSrc });
    if (!y) throw new Error("Cannot determine image source URL for upload.");
    const L = (await Li({ apiKey: w, image: y, name: Ri(x.key) ? "image" : void 0 })).url, H = x.occurrence ?? 0;
    let W = e;
    const oe = x.kind === "wiki" ? In(W, { path: x.key, occurrence: H, width: f, height: h }) : _n(W, { src: x.key, occurrence: H, width: f, height: h });
    oe.updated && (W = oe.markdown);
    const be = await Pi(W, { kind: x.kind === "wiki" ? "wiki" : "markdown", key: x.key, occurrence: H }, L);
    if (!be.updated && W === e) throw new Error("ImgBB upload succeeded but markdown could not be updated.");
    V(be.markdown);
  }, [C, V, e, q]);
  i.useEffect(() => {
    if (typeof F == "function") return F(async () => {
      if (s) throw new Error("Cannot convert images in preview-only mode.");
      if (typeof V != "function") throw new Error("Cannot apply change.");
      if (!Ai(e)) return { markdown: e, converted: 0, failed: [] };
      const f = await Di(e, { currentNotePath: (a == null ? void 0 : a.id) ?? null, uploadFiles: async (h) => {
        if (typeof u != "function") throw new Error("Upload handler not available.");
        return u(h);
      } });
      return f.markdown !== e && V(f.markdown), f;
    }), () => F(null);
  }, [a == null ? void 0 : a.id, V, F, u, s, e]);
  const Qe = i.useCallback((f) => {
    const h = A.current;
    if (!h || !(f == null ? void 0 : f.kind) || !(f == null ? void 0 : f.key)) return null;
    const x = f.kind === "wiki" ? "img[data-wiki-path]" : "img[data-md-src]";
    return [...h.querySelectorAll(x)].filter((I) => (f.kind === "wiki" ? I.getAttribute("data-wiki-path") : I.getAttribute("data-md-src")) === f.key)[f.occurrence ?? 0] ?? null;
  }, []), vt = i.useCallback(({ kind: f, key: h, occurrence: x, widthPx: w, heightPx: y }) => {
    if (!h || typeof V != "function") return false;
    const I = Number.isFinite(w) ? `${Math.round(w)}px` : null, L = Number.isFinite(y) ? `${Math.round(y)}px` : null, H = f === "wiki" ? In(e, { path: h, occurrence: x, width: I, height: L }) : _n(e, { src: h, occurrence: x, width: I, height: L });
    return H.updated && H.markdown !== e ? (V(H.markdown), true) : false;
  }, [V, e]), Lt = i.useCallback(() => {
    const f = q;
    if (!(f == null ? void 0 : f.kind) || !(f == null ? void 0 : f.key)) return;
    const h = Qe(f);
    if (!h) return;
    const x = h.getBoundingClientRect(), w = Math.max(24, Math.round(x.width)), y = Math.max(24, Math.round(x.height)), I = { kind: f.kind, key: f.key, occurrence: f.occurrence ?? 0, widthPx: w, heightPx: y, originalWidthPx: w, originalHeightPx: y };
    h.style.width = `${w}px`, h.style.height = `${y}px`, ie.current = I, Xe(I), Ie(false);
  }, [Qe, q]);
  i.useEffect(() => {
    if (!ke) {
      rt(null);
      return;
    }
    const f = Qe(ke);
    if (!f) {
      Xe(null), rt(null);
      return;
    }
    let h = 0;
    const x = () => {
      const w = f.getBoundingClientRect();
      rt({ left: w.left, top: w.top, width: w.width, height: w.height }), h = requestAnimationFrame(x);
    };
    return h = requestAnimationFrame(x), () => cancelAnimationFrame(h);
  }, [ke, Qe]), i.useEffect(() => {
    if (!ke) return;
    const f = Qe(ke);
    if (!f) return;
    const h = (y) => {
      var _a3, _b2;
      const I = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]");
      if (!I) return;
      y.preventDefault();
      const L = I.getAttribute("data-transform-handle");
      if (!L) return;
      const H = y.pointerType === "touch", W = ie.current || ke, oe = y.clientX, be = y.clientY, ae = W.heightPx > 0 ? W.widthPx / W.heightPx : 1, $e = (d) => {
        const b = d.clientX - oe, M = d.clientY - be;
        let v = W.widthPx, _ = W.heightPx;
        if (L.includes("e") && (v = W.widthPx + b), L.includes("w") && (v = W.widthPx - b), L.includes("s") && (_ = W.heightPx + M), L.includes("n") && (_ = W.heightPx - M), v = Math.max(24, v), _ = Math.max(24, _), H || d.shiftKey) {
          const st = Math.abs((v - W.widthPx) / Math.max(1, W.widthPx)), K = Math.abs((_ - W.heightPx) / Math.max(1, W.heightPx));
          st >= K ? _ = Math.max(24, v / Math.max(1e-4, ae)) : v = Math.max(24, _ * ae);
        }
        v = Math.max(24, Math.round(v)), _ = Math.max(24, Math.round(_)), f.style.width = `${v}px`, f.style.height = `${_}px`;
        const ge = { ...ie.current || W, widthPx: v, heightPx: _ };
        ie.current = ge, Xe(ge);
      }, l = () => {
        document.removeEventListener("pointermove", $e, true), document.removeEventListener("pointerup", l, true);
      };
      document.addEventListener("pointermove", $e, true), document.addEventListener("pointerup", l, true);
    }, x = (y) => {
      y.key === "Enter" && (y.preventDefault(), Ie(true));
    }, w = (y) => {
      var _a3, _b2, _c2, _d2;
      const I = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]"), L = (_d2 = (_c2 = y.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "img[data-wiki-path], img[data-md-src]");
      I || L === f || Ie(true);
    };
    return document.addEventListener("pointerdown", h, true), document.addEventListener("pointerdown", w, true), document.addEventListener("keydown", x, true), () => {
      document.removeEventListener("pointerdown", h, true), document.removeEventListener("pointerdown", w, true), document.removeEventListener("keydown", x, true);
    };
  }, [ke, Qe]);
  const Jt = i.useCallback(() => {
    const f = ie.current || ke;
    f && (vt(f), Xe(null), ie.current = null, Ie(false));
  }, [vt, ke]), Nn = i.useCallback(() => {
    const f = ie.current || ke;
    if (!f) return;
    const h = Qe(f);
    h && (h.style.width = `${f.originalWidthPx}px`, h.style.height = `${f.originalHeightPx}px`), Xe(null), ie.current = null, Ie(false);
  }, [Qe, ke]), ft = i.useCallback((f) => {
    var _a3, _b2, _c2, _d2;
    const h = String(f || "");
    if (!h) return;
    const x = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current;
    if (typeof (x == null ? void 0 : x.insert) == "function") {
      x.insert(() => ({ targetValue: h, select: false, deviationStart: 0, deviationEnd: 0 })), (_b2 = x.focus) == null ? void 0 : _b2.call(x);
      return;
    }
    const w = (_c2 = x == null ? void 0 : x.getEditorView) == null ? void 0 : _c2.call(x);
    w && (w.dispatch(w.state.replaceSelection(h)), (_d2 = w.focus) == null ? void 0 : _d2.call(w));
  }, []), mt = i.useCallback(async (f) => {
    if (!(f == null ? void 0 : f.length) || typeof u != "function" || p) return;
    const h = await u(f);
    (h == null ? void 0 : h.length) && ft(`${h.map((x) => `![[${x}]]`).join(`
`)}
`);
  }, [ft, p, u]);
  i.useEffect(() => {
    We.current = mt;
  }, [mt]);
  const Zt = i.useCallback(async (f) => {
    var _a3;
    if (!f || typeof u != "function") throw new Error("Upload handler not available.");
    const x = (_a3 = await u([f])) == null ? void 0 : _a3[0];
    if (!x) throw new Error("Upload succeeded but no path was returned.");
    ft(`![[${x}]]
`), Be(null);
  }, [ft, u]), et = i.useCallback(() => {
    var _a3, _b2, _c2;
    const h = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    let x = null;
    if (h) {
      const { from: w, to: y } = h.state.selection.main;
      w !== y && (x = { from: w, to: y, text: h.state.doc.sliceString(w, y) });
    }
    Ce(x), ue(true);
  }, []);
  i.useEffect(() => {
    $.current = et;
  }, [et]);
  const Qt = i.useMemo(() => [o.jsx(Bc, { value: e, theme: r, currentFile: a, language: "ko-KR" }, "export-pdf"), o.jsx(Vc, { editorRef: E }, "insert-pgbr"), o.jsx(Kc, { onOpen: et }, "heading-remap"), o.jsx(Lc, { onOpen: () => {
    Ue(true);
  } }, "llm-assist"), o.jsx(Oc, { onOpen: () => {
    Y(true);
  } }, "checklist-progress"), o.jsx(Gc, { checked: De, onChange: Ke, theme: r }, "toc-title-wrap"), o.jsx(Jc, { checked: _e, onChange: Le, theme: r }, "base64-image-fold"), o.jsx(Zc, { checked: ot, onChange: it, theme: r }, "editor-autocomplete"), Se ? null : o.jsx(Qc, { checked: me, onChange: Pe, theme: r }, "mirror-edit"), o.jsx(eu, { disabled: typeof u != "function", onRequestLink: () => Ne(true), onRequestUpload: (f) => {
    mt(f);
  }, onRequestClip: (f) => Be(f) }, "image-toolbar")], [e, r, a, De, Ke, _e, Le, ot, it, Se, me, Pe, u, mt, et]), en = i.useMemo(() => ["bold", "underline", "italic", "-", "strikeThrough", "sub", "sup", "quote", "unorderedList", "orderedList", "task", "-", "codeRow", "code", "link", 9, "table", "mermaid", "katex", 1, 2, 3, 4, "-", "revoke", "next", 0, "=", 6, 7, ...Se ? [] : [8], "pageFullscreen", "fullscreen", "previewOnly", "preview", "htmlPreview", ...Te ? [5] : [], "catalog"], [Te, Se]), Rt = i.useMemo(() => {
    if (typeof u == "function") return async (f, h) => {
      if (p) return;
      const x = await u(f);
      (x == null ? void 0 : x.length) && h(x.map((w) => `![[${w}]]`));
    };
  }, [u, p]);
  return o.jsxs("div", { ref: A, className: `h-full w-full flex flex-col relative${De ? " toc-titles-wrap" : ""}`, style: { "--md-catalog-width": `${ze}px`, ...Xt }, children: [(dt == null ? void 0 : dt.webfontCss) ? o.jsx("style", { "data-s3haim-document-webfonts": "1", children: dt.webfontCss }) : null, P && Do.createPortal(o.jsx(Ii, { handleProps: yt, isResizing: wt, visibleOnHover: true, label: "TOC resize handle", style: { position: "fixed", top: P.top, left: P.left, height: P.height, bottom: "auto", zIndex: 10003 } }), document.body), p && o.jsxs("div", { className: "absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center gap-2 py-2 text-sm bg-blue-300/40 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 border-b border-blue-500/20", "aria-live": "polite", children: [o.jsx(jl, { size: 16, className: "animate-spin shrink-0" }), o.jsxs("span", { children: ["Uploading image... ", Math.max(0, Math.min(100, Math.round(m))), "%"] }), typeof g == "function" && o.jsx("button", { type: "button", onClick: g, className: "ml-2 rounded-md border border-blue-600/50 bg-white/80 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-white dark:border-blue-300/40 dark:bg-blue-950/60 dark:text-blue-100 dark:hover:bg-blue-950", children: "Cancel" })] }), o.jsx(Xs, { ref: E, id: D, modelValue: e, onChange: V, mdHeadingId: Z, className: "h-full! max-h-dvh", theme: r, language: "ko-KR", codeTheme: _i, customIcon: Zl, previewOnly: s, noMermaid: true, autoDetectCode: true, scrollAuto: false, footers: ["markdownTotal"], toolbars: en, defToolbars: Qt, onUploadImg: Rt }, `footnotes-${ye}`), o.jsx(ql, { containerRef: A }), o.jsx(Na, { containerRef: A }), o.jsx(Gl, { isOpen: !!q, onClose: () => xe(null), path: (q == null ? void 0 : q.key) ?? "", kind: (q == null ? void 0 : q.kind) ?? "wiki", initialWidth: (q == null ? void 0 : q.width) ?? "", initialHeight: (q == null ? void 0 : q.height) ?? "", imageSrc: (q == null ? void 0 : q.imageSrc) ?? "", onApply: Yt, onStartFreeTransform: Lt, onCrop: Gt, onConvertToWiki: lt, onConvertToImgbb: Cn }, q ? `${q.kind}|${q.key}|${q.width ?? ""}|${q.height ?? ""}|${q.occurrence ?? 0}` : "wiki-image-size-modal"), o.jsx(tu, { isOpen: he, onClose: () => Ne(false), onConfirm: ({ desc: f, url: h }) => {
    ft(`![${f || ""}](${h})
`);
  } }), o.jsx(nu, { isOpen: Me, onClose: () => pe(false), onConfirm: ({ line1: f, line2: h }) => {
    var _a3, _b2, _c2, _d2, _e2;
    const w = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), y = (w == null ? void 0 : w.state.doc.toString()) ?? se.current ?? "", { from: I, to: L } = Oe.current, H = $i(y, I, L, f, h);
    w && (w.dispatch({ changes: { from: 0, to: w.state.doc.length, insert: H.next }, selection: { anchor: H.caret }, scrollIntoView: true }), (_d2 = w.focus) == null ? void 0 : _d2.call(w)), (_e2 = Ae.current) == null ? void 0 : _e2.call(Ae, H.next);
  } }), o.jsx(ru, { isOpen: !!qe, file: qe, onClose: () => Be(null), onConfirm: Zt }), o.jsx(Yu, { isOpen: te.isOpen, initialMeta: ((_a2 = te.editState) == null ? void 0 : _a2.meta) ?? null, initialGrid: ((_b = te.editState) == null ? void 0 : _b.grid) ?? { rows: [[""]], aligns: [null] }, onClose: te.close, onSave: te.apply }), o.jsx(Ju, { containerRef: A, getMarkdown: () => se.current ?? "", setMarkdown: (f) => {
    typeof V == "function" ? V(f) : typeof t == "function" && t(f);
  }, onEditTable: (f, h) => Ee.current(f, h), onEditFailed: () => {
    G({ title: "? ??", message: "? ?? ???? ?? ?? ?????. ??? ??? ??? ??? ???." });
  } }), o.jsx(ja, { containerRef: A, getMarkdown: () => se.current ?? "", setMarkdown: (f) => {
    typeof V == "function" && V(f);
  }, enabled: !te.isOpen }), ke && nt && o.jsx("div", { className: "fixed z-70 pointer-events-none border-2 border-blue-500", style: { left: `${nt.left}px`, top: `${nt.top}px`, width: `${nt.width}px`, height: `${nt.height}px` }, children: ["nw", "ne", "sw", "se"].map((f) => o.jsx("button", { type: "button", "data-transform-handle": f, className: "absolute pointer-events-auto h-3 w-3 rounded-full bg-blue-600 border border-white", style: { left: f.includes("w") ? "-7px" : "auto", right: f.includes("e") ? "-7px" : "auto", top: f.includes("n") ? "-7px" : "auto", bottom: f.includes("s") ? "-7px" : "auto", cursor: f === "nw" || f === "se" ? "nwse-resize" : "nesw-resize" }, "aria-label": `transform-${f}` }, f)) }), ke && o.jsxs("button", { type: "button", onClick: () => Ie(true), className: "fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm", children: [o.jsx("span", { className: "block font-semibold mb-1", children: "Free transform guide" }), o.jsx("span", { className: "block", children: "- Shift + drag: keep aspect ratio / plain drag: ignore ratio" }), o.jsx("span", { className: "block", children: "- Touch drag: keeps aspect ratio" }), o.jsx("span", { className: "block", children: "- Click elsewhere (including this banner): confirm transform" })] }), o.jsx(fn, { isOpen: bt, title: "Cover export", message: "You need to open the Export PDF page to export the cover. Continue?", confirmLabel: "Continue", cancelLabel: "Cancel", onConfirm: () => {
    at(false), J({ openCoverEdit: true });
  }, onCancel: () => at(false) }), o.jsx(fn, { isOpen: tt, title: "Save transform", message: "How would you like to handle the current transform?", confirmLabel: "Apply", cancelLabel: "Keep editing", discardLabel: "Reset transform", onConfirm: Jt, onCancel: () => Ie(false), onDiscard: Nn }), o.jsx(Yc, { isOpen: re, markdown: e, selectedMarkdown: (je == null ? void 0 : je.text) ?? "", onClose: () => {
    ue(false), Ce(null);
  }, onApply: (f, h) => {
    if (h === "selection" && je) {
      const { from: x, to: w } = je, y = se.current ?? e, I = `${y.slice(0, x)}${f}${y.slice(w)}`;
      I !== y && V(I);
    } else f !== e && V(f);
    ue(false), Ce(null);
  } }), o.jsx(Tc, { editorRef: E, onChange: V, llmProviderProfiles: R, open: Fe, onOpenChange: Ue, theme: r }), o.jsx($c, { editorRef: E, onChange: V, open: B, onOpenChange: Y })] });
}
export {
  lm as default
};
