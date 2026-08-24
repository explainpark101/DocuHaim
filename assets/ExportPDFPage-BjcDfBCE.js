import { r as d, j as t, a as rs, f as ha, u as xa } from "./vendor-react-SY5QCjFA.js";
import { o as ga } from "./vendor-md-editor-D4hOzNKK.js";
import { bz as Fe, bA as Ve, bB as Me, bC as _e, bD as St, bE as bn, bF as Lo, bG as zo, bH as ba, bI as ys, bJ as Ao, bK as vs, bL as wa, bM as ya, bN as ns, bO as dn, bP as ks, M as Io, bQ as wr, bR as va, bS as Ur, bT as ka, bU as ss, bV as ja, bW as Xs, bX as Do, ab as Ie, bY as kr, bZ as tn, b_ as os, b$ as is, c0 as as, c1 as Sa, c2 as Na, c3 as Ca, c4 as Ea, c5 as Pa, c6 as Bo, c7 as Oo, c8 as Ta, c9 as Ra, _ as $o, ca as _o, cb as Fo, cc as _n, cd as Rr, ce as Ma, cf as La, r as za, T as Ho, cg as $r, as as vr, ch as Gs, ci as Vr, cj as qr, ck as Ys, cl as Aa, af as Ia, ag as Da, cm as Ba, am as Oa, cn as $a, co as _a, aq as Fa, cp as Ha, cq as Wa, cr as Ka, cs as Xa, ct as Ga, cu as Us, cv as Ya, aa as Ua, av as Wo, cw as Va, cx as rn, cy as qa, cz as Fn, cA as Za, cB as Ja, cC as ls, cD as cs, cE as Qa, X as el, U as tl, u as rl, cF as nl, cG as sl, cH as ol, cI as il, cJ as al, cK as ll, cL as cl, cM as dl, cN as ul, cO as fl, au as Hn, cP as Wn, cQ as Vs, cR as pl, cS as ml, cT as hl, cU as xl, cV as gl, cW as it, cX as bl, cY as Kn, cZ as Zr, c_ as wl, c$ as yl, d0 as vl, d1 as qs, d2 as Zs, d3 as kl, d4 as Xn, d5 as Gn, d6 as jl, d7 as Js, d8 as Sl, d9 as Nl, da as Cl, db as El, dc as Pl, dd as Tl, de as Rl, df as Ml, dg as Ll, dh as Jr, di as zl, dj as Al, Q as Il, dk as Dl, dl as Bl, dm as Ol, dn as $l } from "./index-BDGl3GOe.js";
import { u as _l, M as Fl } from "./useLazyMermaidRender-D8-Hda1W.js";
import { a as mt, C as jt, aA as Hl, aB as Wl, a1 as Kl, aC as Xl, av as Gl, b as Ko, aD as Xo, W as Go, aE as js, L as Ss, aF as Ns, aG as Cs, aH as Yl, ax as Ul, aI as Vl, aJ as ql, aK as Zl, aL as Es, aM as Ps, T as wn, aN as yn, aO as vn, aP as kn, aQ as Yo, aR as jn, aS as Sn, aT as Nn, aU as Uo, aV as Vo, aW as qo, aX as Zo, O as Jl, Q as nn, e as sn, g as Jo, x as Ql, F as Qo, _ as Yn, aY as ec, aZ as tc, a_ as Un, U as rc, a$ as nc, b0 as sc, b1 as oc, b2 as ic, b3 as ac, b4 as lc, b5 as cc, b6 as Qs, S as dc, q as uc, J as fc, b7 as pc, $ as mc } from "./vendor-lucide-DyPOSMSJ.js";
import { p as $t, q as _t, r as Ft, s as Ht, t as Wt, v as Kt, w as Xt, x as Gt, y as Yt, z as Ut, K as tr, M as rr, o as hc, l as xc, m as gc, n as bc, b as wc, d as Lt, T as zt, e as At, f as It, A as Dt, a5 as yc, a6 as vc } from "./vendor-radix-BgY9OwZN.js";
import { C as zr, g as ds, a as on, c as ei, n as eo, b as kc, d as jc, e as Sc, f as Nc, u as Cc, w as Ec, r as Pc, h as Tc, H as Rc, P as Mc } from "./previewFootnoteScroll-qduq1GXO.js";
import { h as Lc, d as to, i as ft, j as zc, C as kt } from "./ChatImageBackgroundPicker-CFH1q58j.js";
import { S as vt, g as Ac } from "./SliderWithScrubInput-B28d-DVd.js";
import { N as Ic, u as Dc, t as Bc, W as Oc } from "./useTocTitleWrap-CtruYPZb.js";
import { e as ro } from "./llmAssistImages-Ca7ILDRO.js";
import { m as ti } from "./vendor-motion-YU7ZxHqi.js";
import { T as $c } from "./TocTitleWrapToggle-CQlKMMuI.js";
import { u as _c } from "./useWikiImageHydration-B2YUO3TX.js";
import "./vendor-aws-bxAUTq4h.js";
import "./vendor-zip-Bez6qchM.js";
import "./index-CG4BSG42.js";
import "./vendor-image-crop-Loz3ogoo.js";
import "./storageImageHydration-CHXQM4FE.js";
function no(e, r, n) {
  return Math.min(n, Math.max(r, e));
}
function Fc(e, r) {
  const n = r instanceof Set ? r : new Set(r);
  return e.elements.filter((s) => n.has(s.id));
}
function Vn(e, r, n, s) {
  if (!r.length || n === 0 && s === 0) return e;
  const o = new Set(r), i = e.elements.filter((l) => o.has(l.id));
  if (!i.length) return e;
  let a = n, u = s;
  for (const l of i) n < 0 && (a = Math.max(a, -l.x)), n > 0 && (a = Math.min(a, 100 - l.w - l.x)), s < 0 && (u = Math.max(u, -l.y)), s > 0 && (u = Math.min(u, 100 - l.h - l.y));
  return { ...e, elements: e.elements.map((l) => o.has(l.id) ? { ...l, x: no(l.x + a, 0, 100 - l.w), y: no(l.y + u, 0, 100 - l.h) } : l) };
}
function un(e) {
  if (!e.length) return null;
  let r = 1 / 0, n = 1 / 0, s = -1 / 0, o = -1 / 0;
  for (const i of e) r = Math.min(r, i.x), n = Math.min(n, i.y), s = Math.max(s, i.x + i.w), o = Math.max(o, i.y + i.h);
  return { x: r, y: n, w: s - r, h: o - n };
}
function us(e) {
  const r = e.x, n = e.y, s = e.x + e.w, o = e.y + e.h, i = Math.min(r, s), a = Math.min(n, o);
  return { x: i, y: a, w: Math.abs(s - r), h: Math.abs(o - n) };
}
function so(e, r) {
  const n = us(r);
  if (n.w < 0.05 && n.h < 0.05) return [];
  const s = n.x + n.w, o = n.y + n.h;
  return e.filter((i) => {
    const a = i.x + i.w, u = i.y + i.h;
    return i.x < s && a > n.x && i.y < o && u > n.y;
  }).map((i) => i.id);
}
function Hc(e, r) {
  if (!r.length) return null;
  const n = r.map((o) => {
    var _a2;
    return ((_a2 = e.elements.find((i) => i.id === o)) == null ? void 0 : _a2.groupId) ?? null;
  }), s = n[0];
  return !s || !n.every((o) => o === s) ? null : s;
}
function Cn(e, r) {
  var _a2;
  const n = Fe(e), s = n.elements.find((u) => u.id === r);
  if (!(s == null ? void 0 : s.groupId)) return [];
  const o = [];
  let i = s.groupId;
  const a = /* @__PURE__ */ new Set();
  for (; i && !a.has(i); ) a.add(i), o.push(i), i = (_a2 = St(n, i)) == null ? void 0 : _a2.parentGroupId;
  return o.reverse();
}
function ri(e, r, n) {
  const s = Me(e, n);
  if (!s.length || s.length !== r.length) return false;
  const o = new Set(r);
  return s.every((i) => o.has(i));
}
function fs(e, r, n = "root") {
  if (!r.length) return [];
  const s = Fe(e), o = /* @__PURE__ */ new Set();
  for (const i of r) {
    const a = s.elements.find((l) => l.id === i);
    if (!a) continue;
    if (!a.groupId) {
      o.add(i);
      continue;
    }
    const u = n === "immediate" ? a.groupId : Cn(s, i)[0] ?? a.groupId;
    for (const l of Me(s, u)) o.add(l);
  }
  return [...o];
}
function Wc(e, r, n) {
  const s = Fe(e);
  if (!s.elements.some((u) => u.id === r)) return [];
  const o = Cn(s, r);
  if (!o.length) return [r];
  let i = -1;
  for (let u = 0; u < o.length; u += 1) ri(s, n, o[u]) && (i = u);
  if (i >= 0) return Me(s, o[i]);
  if (n.includes(r)) return [...n];
  const a = ni(s, n);
  return a && Me(s, a).includes(r) ? si(s, a, r) : Me(s, o[0]);
}
function Kc(e, r, n) {
  const s = Fe(e);
  if (!s.elements.some((a) => a.id === r)) return { ids: [], enterEdit: false };
  if (n.length === 1 && n[0] === r) return { ids: [r], enterEdit: true };
  const o = Cn(s, r);
  if (!o.length) return { ids: [r], enterEdit: true };
  let i = -1;
  for (let a = 0; a < o.length; a += 1) ri(s, n, o[a]) && (i = a);
  return i < 0 ? { ids: Me(s, o[0]), enterEdit: false } : i < o.length - 1 ? { ids: Me(s, o[i + 1]), enterEdit: false } : { ids: [r], enterEdit: false };
}
function ni(e, r) {
  if (!r.length) return null;
  const n = Fe(e);
  let s = null;
  for (const i of r) {
    const a = Cn(n, i);
    if (!a.length) return null;
    if (s == null) {
      s = [...a];
      continue;
    }
    const u = new Set(a);
    s = s.filter((l) => u.has(l));
  }
  if (!(s == null ? void 0 : s.length)) return null;
  const o = new Set(r);
  for (let i = s.length - 1; i >= 0; i -= 1) {
    const a = s[i], u = Me(n, a);
    if (u.length && r.every((l) => u.includes(l)) && !u.every((l) => o.has(l))) return a;
  }
  return null;
}
function si(e, r, n) {
  const s = Fe(e);
  for (const o of vs(s, r)) if (_e(s, o)) {
    const i = Me(s, o);
    if (i.includes(n)) return i;
  } else if (o === n) return [n];
  return [n];
}
function Xc(e, r, n) {
  const s = Fe(e);
  if (!s.elements.some((a) => a.id === r)) return [];
  const o = ni(s, n);
  return o ? Me(s, o).includes(r) ? si(s, o, r) : fs(s, [r], "root") : fs(s, [r], "root");
}
function Gc(e, r) {
  const n = [...new Set(r)].filter((p) => e.elements.some((x) => x.id === p));
  if (!n.length) return { cover: e, newIds: [] };
  const s = new Set(n), o = /* @__PURE__ */ new Map();
  for (const p of n) o.set(p, crypto.randomUUID());
  const i = /* @__PURE__ */ new Map();
  for (const p of e.elements) !s.has(p.id) || !p.groupId || i.has(p.groupId) || i.set(p.groupId, crypto.randomUUID());
  const a = [];
  for (const p of e.elements) {
    if (!s.has(p.id)) continue;
    const x = o.get(p.id);
    if (!x) continue;
    const w = p.groupId ? i.get(p.groupId) : void 0, y = { ...p, id: x };
    w ? y.groupId = w : delete y.groupId, a.push(y);
  }
  let u = Fe(e);
  const l = [];
  for (const [p, x] of i) {
    const w = u.groups.find((b) => b.id === p), y = ((w == null ? void 0 : w.childIds) ?? []).map((b) => o.has(b) ? o.get(b) : i.has(b) ? i.get(b) : null).filter((b) => !!b);
    l.push({ id: x, name: (w == null ? void 0 : w.name) ? `${w.name} \uBCF5\uC0AC` : "\uADF8\uB8F9", childIds: y });
  }
  u = { ...u, groups: [...u.groups, ...l], elements: [...u.elements, ...a] };
  const g = Ve(e, n).map((p) => o.get(p) ?? i.get(p)).filter((p) => !!p);
  for (const p of [...g].reverse()) u = { ...u, rootLayerIds: [p, ...(u.rootLayerIds ?? []).filter((x) => x !== p)] };
  return u = Fe(u), { cover: u, newIds: n.map((p) => o.get(p)).filter(Boolean) };
}
function En(e, r, n) {
  const s = [...new Set(r)].filter((l) => e.elements.some((f) => f.id === l));
  if (s.length < 1) return null;
  let o = Fe(e);
  const i = Ve(o, s);
  if (i.length === 1 && _e(o, i[0])) return null;
  const a = ys(o);
  o = a.cover;
  const u = a.groupId;
  for (const l of [...i].reverse()) o = Ao(o, l, u, "inside");
  return { cover: o, groupId: u };
}
function Pn(e, r) {
  return ba(e, r);
}
function ps(e, r) {
  const n = Fe(e), s = Ve(n, r), o = s.length ? s : [...r];
  return bn(n, o);
}
function ms(e, r, n) {
  return wa(e, r, n);
}
function Ts(e, r) {
  const n = Ve(e, r);
  return Lo(e, n.length ? n : r);
}
function Rs(e, r) {
  const n = Ve(e, r);
  return zo(e, n.length ? n : r);
}
function oo(e, r, n) {
  const s = Ve(e, r), o = s.length ? s : [...r];
  if (!o.length) return e;
  let i = e;
  const a = n === 1 ? o : [...o].reverse();
  for (const u of a) i = ms(i, u, n);
  return i;
}
function Yc(e, r, n) {
  const s = n.trim() || "\uADF8\uB8F9";
  return { ...e, groups: (e.groups ?? []).map((o) => o.id === r ? { ...o, name: s } : o) };
}
function Uc(e, r, n) {
  const s = n.trim();
  return { ...e, elements: e.elements.map((o) => {
    if (o.id !== r) return o;
    const i = { ...o };
    return s ? i.name = s : delete i.name, i;
  }) };
}
function _r(e, r) {
  var _a2;
  const n = St(e, r);
  return n ? n.locked === true : ((_a2 = e.elements.find((o) => o.id === r)) == null ? void 0 : _a2.locked) === true;
}
function sr(e, r) {
  const n = typeof r == "string" ? e.elements.find((i) => i.id === r) : r;
  if (!n) return false;
  if (n.locked === true) return true;
  let s = n.groupId;
  const o = /* @__PURE__ */ new Set();
  for (; s && !o.has(s); ) {
    o.add(s);
    const i = St(e, s);
    if (!i) break;
    if (i.locked === true) return true;
    s = i.parentGroupId;
  }
  return false;
}
function Vc(e, r) {
  let n = r;
  const s = /* @__PURE__ */ new Set();
  for (; n && !s.has(n); ) {
    s.add(n);
    const o = St(e, n);
    if (!o) break;
    if (o.locked === true) return true;
    n = o.parentGroupId;
  }
  return false;
}
function oi(e, r, n) {
  return _e(e, r) ? { ...e, groups: (e.groups ?? []).map((s) => {
    if (s.id !== r) return s;
    const o = { ...s };
    return n ? o.locked = true : delete o.locked, o;
  }) } : { ...e, elements: e.elements.map((s) => {
    if (s.id !== r) return s;
    const o = { ...s };
    return n ? o.locked = true : delete o.locked, o;
  }) };
}
function ii(e, r) {
  return oi(e, r, !_r(e, r));
}
function Br(e, r) {
  return r.filter((n) => !sr(e, n));
}
function an(e, r) {
  return r.some((n) => _e(e, n) ? Vc(e, n) ? true : Me(e, n).some((s) => sr(e, s)) : sr(e, n));
}
const io = 6, qc = 400;
function ao(e) {
  return Number.isFinite(e) ? Math.min(qc, Math.max(io, Math.round(e))) : io;
}
function hs(e, r, n) {
  if (!r.length || !Number.isFinite(n) || n === 0) return e;
  const s = new Set(r);
  let o = false;
  const i = e.elements.map((a) => {
    if (!s.has(a.id)) return a;
    if (a.type === "text") {
      const u = Number(a.fontSize), l = ao((Number.isFinite(u) ? u : 36) + n);
      return l === a.fontSize ? a : (o = true, { ...a, fontSize: l });
    }
    if (a.type === "rect" || a.type === "ellipse" || a.type === "roundRect") {
      const u = Number(a.fontSize), l = Number.isFinite(u) ? u : 24, f = ao(l + n);
      return f === l && a.fontSize === f ? a : (o = true, { ...a, fontSize: f });
    }
    return a;
  });
  return o ? { ...e, elements: i } : e;
}
function ln(e, r, n) {
  if (!r.length || n !== "left" && n !== "center" && n !== "right") return e;
  const s = new Set(r);
  let o = false;
  const i = e.elements.map((a) => s.has(a.id) ? a.type === "text" ? a.textAlign === n ? a : (o = true, { ...a, textAlign: n }) : a.type === "rect" || a.type === "ellipse" || a.type === "roundRect" ? a.textAlign === n ? a : (o = true, { ...a, textAlign: n }) : a : a);
  return o ? { ...e, elements: i } : e;
}
function yr(e, r, n) {
  return Math.min(n, Math.max(r, e));
}
function Zc(e, r) {
  const n = new Set(r);
  return e.elements.filter((s) => n.has(s.id));
}
function Jc(e, r) {
  if (_e(e, r)) {
    const s = Zc(e, Me(e, r));
    return s.length ? un(s) : null;
  }
  const n = e.elements.find((s) => s.id === r);
  return n ? { x: n.x, y: n.y, w: n.w, h: n.h } : null;
}
function Qc(e, r) {
  return _e(e, r) ? Me(e, r) : e.elements.some((n) => n.id === r) ? [r] : [];
}
function lo(e, r) {
  var _a2;
  const n = Fe(e), s = new Set(r), o = [], i = /* @__PURE__ */ new Set(), a = (l) => {
    if (i.has(l)) return;
    const f = Qc(n, l);
    if (!f.length || f.some((p) => s.has(p))) return;
    const g = Jc(n, l);
    g && (i.add(l), o.push(g));
  };
  for (const l of n.rootLayerIds ?? []) a(l);
  const u = /* @__PURE__ */ new Set();
  for (const l of r) {
    let g = ((_a2 = n.elements.find((p) => p.id === l)) == null ? void 0 : _a2.groupId) ?? null;
    for (; g; ) {
      u.add(g);
      const p = ya(n, g);
      g = p ?? null;
    }
  }
  for (const l of u) {
    const f = Me(n, l);
    if (!(f.length > 0 && f.every((g) => s.has(g)))) for (const g of vs(n, l)) a(g);
  }
  return o;
}
function Ot(e, r, n) {
  let s = null;
  for (const o of e) for (const i of r) {
    const a = i - o, u = Math.abs(a);
    u > n || (!s || u < Math.abs(s.delta)) && (s = { delta: a, guide: i });
  }
  return s;
}
function ed(e, r, n = {}) {
  const { objectSnapEnabled: s = false, frameCenterSnapEnabled: o = false, objectThresholdPx: i, frameCenterThresholdPx: a, frameWidthPx: u = 0, frameHeightPx: l = 0, thresholdPct: f = zr, objectThresholdPct: g = f, frameCenterThresholdPct: p = f } = n;
  if (!s && !o) return { x: e.x, y: e.y, verticalGuides: [], horizontalGuides: [] };
  const x = (se) => u > 0 ? se / u * 100 : g, w = (se) => l > 0 ? se / l * 100 : g, y = i != null && u > 0 ? x(i) : g, b = i != null && l > 0 ? w(i) : g, v = a != null && u > 0 ? x(a) : p, j = a != null && l > 0 ? w(a) : p, R = e.x, C = e.x + e.w, E = e.x + e.w / 2, $ = e.y, W = e.y + e.h, I = e.y + e.h / 2, _ = [], U = [];
  if (s) for (const se of r) _.push(se.x, se.x + se.w / 2, se.x + se.w), U.push(se.y, se.y + se.h / 2, se.y + se.h);
  const A = [R, E, C], L = [$, I, W], Q = s ? Ot(A, _, y) : null, V = s ? Ot(L, U, b) : null, re = o ? Ot([E], [50], v) : null, ge = o ? Ot([I], [50], j) : null, oe = (se, P) => se ? P ? Math.abs(se.delta) <= Math.abs(P.delta) ? se : P : se : P, ie = oe(Q, re), he = oe(V, ge);
  let D = e.x + ((ie == null ? void 0 : ie.delta) ?? 0), X = e.y + ((he == null ? void 0 : he.delta) ?? 0);
  D = yr(D, 0, 100 - e.w), X = yr(X, 0, 100 - e.h);
  const K = ie ? [ie.guide] : [], be = he ? [he.guide] : [];
  return { x: D, y: X, verticalGuides: K, horizontalGuides: be };
}
const td = 2;
function rd(e, r, n, s = {}) {
  const { objectSnapEnabled: o = false, frameCenterSnapEnabled: i = false, objectThresholdPx: a, frameCenterThresholdPx: u, frameWidthPx: l = 0, frameHeightPx: f = 0, minSizePct: g = td } = s;
  if (!o && !i) return { ...e, verticalGuides: [], horizontalGuides: [] };
  const p = (L) => l > 0 ? L / l * 100 : zr, x = (L) => f > 0 ? L / f * 100 : zr, w = a != null && l > 0 ? p(a) : zr, y = a != null && f > 0 ? x(a) : zr, b = [], v = [];
  if (o) for (const L of n) b.push(L.x, L.x + L.w / 2, L.x + L.w), v.push(L.y, L.y + L.h / 2, L.y + L.h);
  i && (b.push(50), v.push(50));
  let { x: j, y: R, w: C, h: E } = e;
  const $ = [], W = [], I = r.includes("w"), _ = r.includes("e"), U = r.includes("n"), A = r.includes("s");
  if (_) {
    const L = j + C, Q = Ot([L], b, w);
    Q && (C = yr(L + Q.delta - j, g, 100 - j), $.push(Q.guide));
  } else if (I) {
    const L = j, Q = j + C, V = Ot([L], b, w);
    if (V) {
      const re = yr(L + V.delta, 0, Q - g);
      C = Q - re, j = re, $.push(V.guide);
    }
  }
  if (A) {
    const L = R + E, Q = Ot([L], v, y);
    Q && (E = yr(L + Q.delta - R, g, 100 - R), W.push(Q.guide));
  } else if (U) {
    const L = R, Q = R + E, V = Ot([L], v, y);
    if (V) {
      const re = yr(L + V.delta, 0, Q - g);
      E = Q - re, R = re, W.push(V.guide);
    }
  }
  return { x: j, y: R, w: C, h: E, verticalGuides: $, horizontalGuides: W };
}
function co(e, r, n) {
  return Math.min(n, Math.max(r, e));
}
function ai(e, r) {
  if (_e(e, r)) {
    const s = nd(e, Me(e, r));
    if (!s.length) return null;
    const o = un(s);
    return o ? { memberIds: s.map((i) => i.id), bounds: o } : null;
  }
  const n = e.elements.find((s) => s.id === r);
  return n ? { memberIds: [n.id], bounds: { x: n.x, y: n.y, w: n.w, h: n.h } } : null;
}
function nd(e, r) {
  const n = new Set(r);
  return e.elements.filter((s) => n.has(s.id));
}
function li(e, r) {
  const n = Fe(e), s = Ve(n, r), o = s.length === 1 && _e(n, s[0]) ? s[0] : null, i = [];
  for (const a of s) {
    const u = ai(n, a);
    u && i.push(u);
  }
  return { units: i, soleGroupId: o };
}
function ci(e, r) {
  const n = Fe(e);
  if (!St(n, r)) return [];
  const s = [];
  for (const o of vs(n, r)) {
    const i = ai(n, o);
    i && s.push(i);
  }
  return s;
}
function sd(e, r, n, s = 0) {
  if (r.length < 1 || r.length < 2 && n.startsWith("distribute") || r.length < 2 && !n.startsWith("distribute")) return e;
  const o = Math.max(0, s), i = { x: Math.min(...r.map((x) => x.bounds.x)), y: Math.min(...r.map((x) => x.bounds.y)), right: Math.max(...r.map((x) => x.bounds.x + x.bounds.w)), bottom: Math.max(...r.map((x) => x.bounds.y + x.bounds.h)) }, a = i.right - i.x, u = i.bottom - i.y, l = /* @__PURE__ */ new Map(), f = (x, w, y) => {
    for (const b of x.memberIds) l.set(b, { dx: w, dy: y });
  };
  if (n === "left") for (const x of r) f(x, i.x - x.bounds.x, 0);
  else if (n === "centerX") {
    const x = i.x + a / 2;
    for (const w of r) f(w, x - (w.bounds.x + w.bounds.w / 2), 0);
  } else if (n === "right") for (const x of r) f(x, i.right - (x.bounds.x + x.bounds.w), 0);
  else if (n === "top") for (const x of r) f(x, 0, i.y - x.bounds.y);
  else if (n === "centerY") {
    const x = i.y + u / 2;
    for (const w of r) f(w, 0, x - (w.bounds.y + w.bounds.h / 2));
  } else if (n === "bottom") for (const x of r) f(x, 0, i.bottom - (x.bounds.y + x.bounds.h));
  else if (n === "distributeX") {
    const x = [...r].sort((w, y) => w.bounds.x - y.bounds.x);
    if (x.length === 2) {
      const w = x[0], y = x[1], b = w.bounds.x + w.bounds.w + o;
      f(y, b - y.bounds.x, 0);
    } else {
      const w = x[0], v = (x[x.length - 1].bounds.x - w.bounds.x) / (x.length - 1);
      x.slice(1, -1).forEach((j, R) => {
        const C = w.bounds.x + v * (R + 1);
        f(j, C - j.bounds.x, 0);
      });
    }
  } else if (n === "distributeY") {
    const x = [...r].sort((w, y) => w.bounds.y - y.bounds.y);
    if (x.length === 2) {
      const w = x[0], y = x[1], b = w.bounds.y + w.bounds.h + o;
      f(y, 0, b - y.bounds.y);
    } else {
      const w = x[0], v = (x[x.length - 1].bounds.y - w.bounds.y) / (x.length - 1);
      x.slice(1, -1).forEach((j, R) => {
        const C = w.bounds.y + v * (R + 1);
        f(j, 0, C - j.bounds.y);
      });
    }
  }
  if (!e.elements.filter((x) => l.has(x.id)).length) return e;
  const p = /* @__PURE__ */ new Map();
  for (const x of r) {
    const w = x.memberIds[0];
    if (!w) continue;
    const y = l.get(w);
    if (!y) continue;
    let { dx: b, dy: v } = y;
    for (const j of x.memberIds) {
      const R = e.elements.find((C) => C.id === j);
      R && (b < 0 && (b = Math.max(b, -R.x)), b > 0 && (b = Math.min(b, 100 - R.w - R.x)), v < 0 && (v = Math.max(v, -R.y)), v > 0 && (v = Math.min(v, 100 - R.h - R.y)));
    }
    for (const j of x.memberIds) p.set(j, { dx: b, dy: v });
  }
  return { ...e, elements: e.elements.map((x) => {
    const w = p.get(x.id);
    return !w || w.dx === 0 && w.dy === 0 ? x : { ...x, x: co(x.x + w.dx, 0, 100 - x.w), y: co(x.y + w.dy, 0, 100 - x.h) };
  }) };
}
function Ar(e, r, n, s = 0, o) {
  const i = (o == null ? void 0 : o.insideGroupId) ? ci(e, o.insideGroupId) : li(e, r).units;
  return sd(e, i, n, s);
}
function di(e, r) {
  const { units: n, soleGroupId: s } = li(e, r);
  if (s) {
    const o = ci(e, s);
    return { enabled: o.length >= 2, soleGroupId: s, unitCount: o.length };
  }
  return { enabled: n.length >= 2, soleGroupId: null, unitCount: n.length };
}
function ue(e, r, n) {
  return Math.min(n, Math.max(r, e));
}
function Ms(e, r, n, s = 50) {
  if (!(e > 0) || r < 1 || n < 1) return { w: s, h: 35 };
  let o = s, i = o * r / (n * e);
  return i > 55 && (i = 55, o = i * n * e / r), o > 90 && (o = 90, i = o * r / (n * e)), { w: ue(o, 4, 100), h: ue(i, 4, 100) };
}
function od(e, r, n) {
  const s = e.naturalAspect;
  if (s == null || !(s > 0) || r < 1 || n < 1) return e;
  const o = e.x + e.w / 2, i = e.y + e.h / 2, a = Ms(s, r, n, e.w), u = a.w, l = a.h;
  let f = o - u / 2, g = i - l / 2;
  return f < 0 && (f = 0), g < 0 && (g = 0), f + u > 100 && (f = 100 - u), g + l > 100 && (g = 100 - l), { ...e, x: f, y: g, w: u, h: l };
}
function qn(e, r, n, s, o) {
  let i = { ...e, naturalAspect: r };
  if (o) {
    const a = Ms(r, n, s, e.w || 50), u = e.x + e.w / 2, l = e.y + e.h / 2;
    let f = u - a.w / 2, g = l - a.h / 2;
    f = ue(f, 0, 100 - a.w), g = ue(g, 0, 100 - a.h), i = { ...i, x: f, y: g, w: a.w, h: a.h };
  }
  return i;
}
function id(e, r, n, s, o, i) {
  if (i) {
    const g = e.x + e.w / 2, p = e.y + e.h / 2;
    let x = 0, w = 0;
    r.includes("e") && (x += n), r.includes("w") && (x -= n), r.includes("s") && (w += s), r.includes("n") && (w -= s);
    const y = Math.max(o, 2 * Math.min(g, 100 - g)), b = Math.max(o, 2 * Math.min(p, 100 - p)), v = ue(e.w + 2 * x, o, y), j = ue(e.h + 2 * w, o, b);
    return { x: g - v / 2, y: p - j / 2, w: v, h: j };
  }
  let { x: a, y: u, w: l, h: f } = e;
  if (r.includes("e") && (l = ue(e.w + n, o, 100 - e.x)), r.includes("s") && (f = ue(e.h + s, o, 100 - e.y)), r.includes("w")) {
    const g = ue(e.w - n, o, e.x + e.w), p = e.w - g;
    a = ue(e.x + p, 0, 100 - g), l = g;
  }
  if (r.includes("n")) {
    const g = ue(e.h - s, o, e.y + e.h), p = e.h - g;
    u = ue(e.y + p, 0, 100 - g), f = g;
  }
  return { x: a, y: u, w: l, h: f };
}
function ad(e, r, n, s, o, i, a) {
  const l = !!(a == null ? void 0 : a.fromCenter);
  if (!!!e.lockAspect || o < 1 || i < 1) {
    const C = id(e, r, n, s, 4, l);
    return { ...e, ...C };
  }
  const g = e.w / Math.max(e.h, 1e-3) * (o / i), p = e.naturalAspect && e.naturalAspect > 0 ? e.naturalAspect : g, x = (C) => C * o / (i * p), w = (C) => C * i * p / o;
  if (l) {
    const C = e.x + e.w / 2, E = e.y + e.h / 2, $ = Math.max(4, 2 * Math.min(C, 100 - C)), W = Math.max(4, 2 * Math.min(E, 100 - E));
    let I = 0, _ = 0;
    r.includes("e") && (I += n), r.includes("w") && (I -= n), r.includes("s") && (_ += s), r.includes("n") && (_ -= s);
    const U = r.length === 2;
    let A, L;
    return U ? Math.abs(n) * o >= Math.abs(s) * i ? (A = ue(e.w + 2 * I, 4, $), L = x(A), L > W && (L = W, A = ue(w(L), 4, $))) : (L = ue(e.h + 2 * _, 4, W), A = w(L), A > $ && (A = $, L = ue(x(A), 4, W))) : r === "e" || r === "w" ? (A = ue(e.w + 2 * I, 4, $), L = x(A), L > W && (L = W, A = ue(w(L), 4, $))) : (L = ue(e.h + 2 * _, 4, W), A = w(L), A > $ && (A = $, L = ue(x(A), 4, W))), { ...e, x: C - A / 2, y: E - L / 2, w: A, h: L };
  }
  let { x: y, y: b, w: v, h: j } = e;
  if (r.length === 2) if (Math.abs(n) * o >= Math.abs(s) * i) {
    if (r.includes("e") && (v = ue(e.w + n, 4, 100 - e.x)), r.includes("w")) {
      const E = ue(e.w - n, 4, e.x + e.w);
      y = ue(e.x + (e.w - E), 0, 100 - E), v = E;
    }
    j = x(v), r.includes("n") && (b = ue(e.y + e.h - j, 0, 100 - j)), b + j > 100 && (j = 100 - b, v = w(j), r.includes("w") && (y = ue(e.x + e.w - v, 0, 100 - v)));
  } else {
    if (r.includes("s") && (j = ue(e.h + s, 4, 100 - e.y)), r.includes("n")) {
      const E = ue(e.h - s, 4, e.y + e.h);
      b = ue(e.y + (e.h - E), 0, 100 - E), j = E;
    }
    v = w(j), r.includes("w") && (y = ue(e.x + e.w - v, 0, 100 - v)), y + v > 100 && (v = 100 - y, j = x(v), r.includes("n") && (b = ue(e.y + e.h - j, 0, 100 - j)));
  }
  else if (r === "e" || r === "w") {
    if (r === "e") v = ue(e.w + n, 4, 100 - e.x);
    else {
      const C = ue(e.w - n, 4, e.x + e.w);
      y = ue(e.x + (e.w - C), 0, 100 - C), v = C;
    }
    j = x(v), b = ue(e.y + (e.h - j) / 2, 0, 100 - j);
  } else {
    if (r === "s") j = ue(e.h + s, 4, 100 - e.y);
    else {
      const C = ue(e.h - s, 4, e.y + e.h);
      b = ue(e.y + (e.h - C), 0, 100 - C), j = C;
    }
    v = w(j), y = ue(e.x + (e.w - v) / 2, 0, 100 - v);
  }
  return { ...e, x: ue(y, 0, 100 - v), y: ue(b, 0, 100 - j), w: ue(v, 4, 100), h: ue(j, 4, 100) };
}
function ld({ isOpen: e, onClose: r, fonts: n, onFontsChange: s }) {
  const [o, i] = d.useState(() => n || { ...ns }), [a, u] = d.useState(false), [l, f] = d.useState(0);
  d.useEffect(() => {
    e && n && i(n);
  }, [e, n]), d.useEffect(() => {
    const y = () => f((b) => b + 1);
    return window.addEventListener(dn, y), () => window.removeEventListener(dn, y);
  }, []);
  const g = d.useMemo(() => ks(), [l]), p = (y, b) => {
    const v = { ...o, [y]: b };
    i(v), s == null ? void 0 : s(v);
  }, x = async () => {
    u(true);
    try {
      await va(o), s == null ? void 0 : s(o), r == null ? void 0 : r();
    } catch (y) {
      alert("\uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4: " + ((y == null ? void 0 : y.message) || y));
    } finally {
      u(false);
    }
  }, w = () => {
    i({ ...ns });
  };
  return t.jsx(Io, { isOpen: e, onClose: r, onConfirm: a ? void 0 : x, ignoreEnterInFields: true, children: t.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [t.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uD504\uB9B0\uD2B8 \uD3F0\uD2B8 \uC124\uC815" }), t.jsx("p", { className: "text-xs text-gray-500 dark:text-odp-muted", children: "PDF\uB85C \uB0B4\uBCF4\uB0BC \uB54C \uC801\uC6A9\uB420 \uD3F0\uD2B8\uB97C \uC124\uC815\uD569\uB2C8\uB2E4. \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uD3F0\uD2B8\uAC00 \uC0AC\uC6A9\uB429\uB2C8\uB2E4. \uC6F9\uD3F0\uD2B8\uB294 \uC124\uC815 \u2192 \uC6F9\uD3F0\uD2B8(CSS)\uC5D0\uC11C \uCD94\uAC00\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), t.jsxs("div", { className: "grid gap-4", children: [t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1", children: "\uBCF8\uBB38" }), t.jsx(wr, { id: "print-font-body", value: o.body, onChange: (y) => p("body", y), options: g, placeholder: "\uC608: Noto Sans KR, serif" })] }), t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1", children: "\uC81C\uBAA9 (h1~h10)" }), t.jsx(wr, { id: "print-font-heading", value: o.heading, onChange: (y) => p("heading", y), options: g, placeholder: "\uC608: Noto Serif KR, Georgia" })] }), t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1", children: "\uAD75\uC740 \uAE00\uC528 (b, strong)" }), t.jsx(wr, { id: "print-font-bold", value: o.bold, onChange: (y) => p("bold", y), options: g, placeholder: "\uC608: Noto Sans KR, sans-serif" })] }), t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1", children: "\uCF54\uB4DC \uBE14\uB85D (code, pre)" }), t.jsx(wr, { id: "print-font-code", value: o.code, onChange: (y) => p("code", y), options: g, placeholder: "\uC608: Consolas, monospace" })] })] }), t.jsxs("div", { className: "flex items-center justify-between gap-2 pt-2", children: [t.jsx("button", { type: "button", onClick: w, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-odp-muted dark:hover:text-odp-fg", children: "\uAE30\uBCF8\uAC12\uC73C\uB85C \uCD08\uAE30\uD654" }), t.jsxs("div", { className: "flex gap-2", children: [t.jsx("button", { type: "button", onClick: r, className: "px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition", children: "\uCDE8\uC18C" }), t.jsx("button", { type: "button", onClick: x, disabled: a, className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition disabled:opacity-50 disabled:cursor-not-allowed", children: a ? "\uC800\uC7A5 \uC911\u2026" : "\uC801\uC6A9" })] })] })] }) });
}
function cd({ maxWidth: e, maxHeight: r, widthFallback: n = "718px", heightFallback: s = "1047px", onChange: o }) {
  const [i, a] = d.useState(e), [u, l] = d.useState(r), [f, g] = d.useState(false), [p, x] = d.useState(false), w = d.useRef(null), y = d.useRef(null), b = d.useRef({ maxWidth: e, maxHeight: r, onChange: o, widthFallback: n, heightFallback: s });
  b.current = { maxWidth: e, maxHeight: r, onChange: o, widthFallback: n, heightFallback: s }, d.useEffect(() => {
    a(e), g(false);
  }, [e]), d.useEffect(() => {
    l(r), x(false);
  }, [r]);
  const v = (C) => /^\d+px$/i.test(C.trim()), j = (C) => {
    const E = Ur(C);
    if (E === null) {
      g(true);
      return;
    }
    g(false), a(E), E !== e && o({ maxWidth: E, maxHeight: r });
  }, R = (C) => {
    const E = Ur(C);
    if (E === null) {
      x(true);
      return;
    }
    x(false), l(E), E !== r && o({ maxWidth: e, maxHeight: E });
  };
  return d.useEffect(() => {
    const C = w.current, E = y.current;
    if (!C || !E) return;
    const $ = (_, U) => {
      const A = (L) => {
        L.preventDefault(), L.stopPropagation();
        const Q = L.deltaY < 0 ? 1 : -1, { maxWidth: V, maxHeight: re, onChange: ge, widthFallback: oe, heightFallback: ie } = b.current, he = _.value, D = U === "width" ? oe : ie, X = ka(he, Q, { shiftKey: L.shiftKey, altKey: L.altKey, emptyFallback: D });
        if (X !== null) {
          if (U === "width") {
            a(X), g(false), X !== V && ge({ maxWidth: X, maxHeight: re });
            return;
          }
          l(X), x(false), X !== re && ge({ maxWidth: V, maxHeight: X });
        }
      };
      return _.addEventListener("wheel", A, { passive: false }), () => _.removeEventListener("wheel", A);
    }, W = $(C, "width"), I = $(E, "height");
    return () => {
      W(), I();
    };
  }, []), t.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2", children: [t.jsx("span", { className: "shrink-0 text-xs text-gray-500 dark:text-odp-muted", children: "\uC774\uBBF8\uC9C0 \uCD5C\uB300 (px)" }), t.jsxs("label", { className: "flex items-center gap-1", children: [t.jsx("span", { className: "text-xs text-gray-500 dark:text-odp-muted", children: "W" }), t.jsx("input", { ref: w, type: "text", inputMode: "numeric", "data-print-toolbar": "image-max", value: i, onChange: (C) => {
    const E = C.target.value;
    a(E);
    const $ = Ur(E);
    g($ === null), $ !== null && v(E) && $ !== e && o({ maxWidth: $, maxHeight: r });
  }, onBlur: (C) => j(C.target.value), onKeyDown: (C) => {
    C.key === "Enter" && (C.preventDefault(), j(C.currentTarget.value));
  }, placeholder: "718px", "aria-label": "\uBAA8\uB4E0 \uC774\uBBF8\uC9C0 max-width (px)", title: "\uD720: 10px / Shift+\uD720: 50px / Alt+\uD720: 1px", "aria-invalid": f, className: `h-8 w-24 rounded-md border bg-white px-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:bg-odp-surface dark:text-odp-fgStrong ${f ? "border-red-400 dark:border-red-500" : "border-gray-300 dark:border-odp-borderStrong"}` })] }), t.jsxs("label", { className: "flex items-center gap-1", children: [t.jsx("span", { className: "text-xs text-gray-500 dark:text-odp-muted", children: "H" }), t.jsx("input", { ref: y, type: "text", inputMode: "numeric", value: u, onChange: (C) => {
    const E = C.target.value;
    l(E);
    const $ = Ur(E);
    x($ === null), $ !== null && v(E) && $ !== r && o({ maxWidth: e, maxHeight: $ });
  }, onBlur: (C) => R(C.target.value), onKeyDown: (C) => {
    C.key === "Enter" && (C.preventDefault(), R(C.currentTarget.value));
  }, placeholder: "1047px", "aria-label": "\uBAA8\uB4E0 \uC774\uBBF8\uC9C0 max-height (px)", title: "\uD720: 10px / Shift+\uD720: 50px / Alt+\uD720: 1px", "aria-invalid": p, className: `h-8 w-28 rounded-md border bg-white px-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:bg-odp-surface dark:text-odp-fgStrong ${p ? "border-red-400 dark:border-red-500" : "border-gray-300 dark:border-odp-borderStrong"}` })] })] });
}
function uo({ children: e, showPageMarker: r = false, className: n = "" }) {
  return t.jsxs("div", { className: `relative ${n}`, "data-print-cover-page": r ? "1" : void 0, children: [e, r ? t.jsxs("div", { className: "pointer-events-none absolute inset-0 z-10 print:hidden", "aria-hidden": true, children: [t.jsx("span", { className: "absolute top-1 right-0 translate-x-[calc(100%+0.35rem)] rounded bg-red-50 px-1 text-[10px] font-medium leading-4 text-red-600 shadow-sm dark:bg-red-950/80 dark:text-red-300", children: "1p" }), t.jsx("div", { className: "absolute inset-x-0 bottom-0 border-b-2 border-dashed border-red-400/80" })] }) : null] });
}
function dd({ pageStarts: e, contentHeight: r, firstPageNumber: n = 1 }) {
  if (e.length === 0) return null;
  const s = Math.max(0, n - 1), o = s > 0;
  return t.jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 z-10 print:hidden", "aria-hidden": true, style: { height: Math.max(r, e[e.length - 1] ?? 0) }, children: e.map((i, a) => {
    const u = a + 1 + s, l = a > 0 || a === 0 && o;
    return t.jsxs("div", { className: "absolute right-0 left-0", style: { top: i }, children: [l ? t.jsx("div", { className: "absolute inset-x-0 top-0 border-t-2 border-dashed border-red-400/80" }) : null, t.jsxs("span", { className: "absolute top-1 right-0 translate-x-[calc(100%+0.35rem)] rounded bg-red-50 px-1 text-[10px] font-medium leading-4 text-red-600 shadow-sm dark:bg-red-950/80 dark:text-red-300", children: [u, "p"] })] }, `print-page-${u}-${Math.round(i)}`);
  }) });
}
function ud({ value: e, onValueChange: r }) {
  return t.jsxs("label", { className: "flex min-w-0 items-center gap-2", children: [t.jsx("span", { className: "shrink-0 text-xs text-gray-500 dark:text-odp-muted", children: "\uC6A9\uC9C0" }), t.jsxs($t, { value: e, onValueChange: (n) => {
    const s = ss.find((o) => o.id === n);
    s && r(s.id);
  }, children: [t.jsxs(_t, { "aria-label": "\uC778\uC1C4 \uC6A9\uC9C0 \uD06C\uAE30", "data-print-toolbar": "paper", className: "inline-flex h-8 min-w-36 items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [t.jsx(Ft, {}), t.jsx(Ht, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Wt, { children: t.jsx(Kt, { className: "z-100010 max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: ss.map((n) => t.jsxs(Gt, { value: n.id, className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(jt, { size: 12 }) }), t.jsx(Ut, { children: n.label })] }, n.id)) }) }) })] })] });
}
const fd = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), pd = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
function md({ checked: e, onCheckedChange: r, disabled: n = false }) {
  return t.jsxs("label", { className: "inline-flex items-center gap-2", children: [t.jsx("span", { className: "shrink-0 text-xs text-gray-500 dark:text-odp-muted", children: "\uCCAB\uC7A5 \uB2E8\uBA74" }), t.jsx(tr, { className: fd(e), checked: e, disabled: n, onCheckedChange: r, "aria-label": "\uCCAB\uC7A5 \uB2E8\uBA74\uC73C\uB85C \uBCF4\uAE30", "data-print-toolbar": "first-page-single", children: t.jsx(rr, { className: pd }) })] });
}
const Zn = [{ value: "scroll", label: "\uC2A4\uD06C\uB864", Icon: Hl }, { value: "flip", label: "\uB118\uAE30\uAE30", Icon: Wl }];
function hd({ value: e, onValueChange: r, disabled: n = false }) {
  const s = Zn.find((o) => o.value === e) ?? Zn[0];
  return t.jsxs("label", { className: "flex min-w-0 items-center gap-2", children: [t.jsx("span", { className: "shrink-0 text-xs text-gray-500 dark:text-odp-muted", children: "\uBCF4\uAE30" }), t.jsxs($t, { value: e, disabled: n, onValueChange: (o) => {
    (o === "scroll" || o === "flip") && r(o);
  }, children: [t.jsxs(_t, { "aria-label": "\uBBF8\uB9AC\uBCF4\uAE30 \uC2A4\uD06C\uB864/\uB118\uAE30\uAE30", "data-print-toolbar": "view-nav", className: "inline-flex h-8 min-w-32 items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [t.jsxs("span", { className: "inline-flex min-w-0 items-center gap-1.5", children: [t.jsx(s.Icon, { size: 14, className: "shrink-0 text-gray-500 dark:text-odp-muted", "aria-hidden": true }), t.jsx(Ft, {})] }), t.jsx(Ht, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Wt, { children: t.jsx(Kt, { className: "z-100010 max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: Zn.map(({ value: o, label: i, Icon: a }) => t.jsxs(Gt, { value: o, className: "relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(jt, { size: 12 }) }), t.jsx(a, { size: 14, className: "shrink-0 text-gray-500 dark:text-odp-muted", "aria-hidden": true }), t.jsx(Ut, { children: i })] }, o)) }) }) })] })] });
}
const Jn = [{ value: 1, label: "1\uD398\uC774\uC9C0", Icon: Kl }, { value: 2, label: "2\uD398\uC774\uC9C0", Icon: Xl }];
function xd({ value: e, onValueChange: r, disabled: n = false }) {
  const s = Jn.find((o) => o.value === e) ?? Jn[0];
  return t.jsxs("label", { className: "flex min-w-0 items-center gap-2", children: [t.jsx("span", { className: "shrink-0 text-xs text-gray-500 dark:text-odp-muted", children: "\uD398\uC774\uC9C0" }), t.jsxs($t, { value: String(e), disabled: n, onValueChange: (o) => {
    o === "1" ? r(1) : o === "2" && r(2);
  }, children: [t.jsxs(_t, { "aria-label": "\uBBF8\uB9AC\uBCF4\uAE30 1\uD398\uC774\uC9C0/2\uD398\uC774\uC9C0", "data-print-toolbar": "view-pages", className: "inline-flex h-8 min-w-32 items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [t.jsxs("span", { className: "inline-flex min-w-0 items-center gap-1.5", children: [t.jsx(s.Icon, { size: 14, className: "shrink-0 text-gray-500 dark:text-odp-muted", "aria-hidden": true }), t.jsx(Ft, {})] }), t.jsx(Ht, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Wt, { children: t.jsx(Kt, { className: "z-100010 max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: Jn.map(({ value: o, label: i, Icon: a }) => t.jsxs(Gt, { value: String(o), className: "relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(jt, { size: 12 }) }), t.jsx(a, { size: 14, className: "shrink-0 text-gray-500 dark:text-odp-muted", "aria-hidden": true }), t.jsx(Ut, { children: i })] }, o)) }) }) })] })] });
}
const ui = "s3haim_print_preview_view", fn = 25, Ls = 400, Or = 5, nr = 16, wt = { navigation: "scroll", pages: 1, firstPageSingle: true, zoomPercent: 100 };
function Tn(e) {
  if (!Number.isFinite(e)) return wt.zoomPercent;
  const r = Math.round(e / Or) * Or;
  return Math.min(Ls, Math.max(fn, r));
}
function Ir(e, r) {
  return Tn(e + r * Or);
}
function gd(e) {
  return e === "scroll" || e === "flip";
}
function bd(e) {
  return e === 1 || e === 2;
}
function fi(e, r) {
  const n = Math.max(0, Math.floor(e));
  if (n === 0) return [{ left: null, right: null }];
  const s = [];
  let o = 0;
  for (r && (s.push({ left: 0, right: null, centerSingle: true }), o = 1); o < n; ) {
    const i = o, a = o + 1 < n ? o + 1 : null;
    s.push({ left: i, right: a }), o += 2;
  }
  return s;
}
function wd(e, r) {
  for (let n = 0; n < e.length; n += 1) {
    const s = e[n];
    if (s && (s.left === r || s.right === r)) return n;
  }
  return 0;
}
function fo(e) {
  const r = [];
  return e.left != null && r.push(e.left), e.right != null && r.push(e.right), r;
}
function yd(e) {
  const r = ja(e);
  return { widthPx: Math.max(1, Math.round(Xs(r.widthMm))), heightPx: Math.max(1, Math.round(Xs(r.heightMm))) };
}
function vd(e) {
  const { viewportWidth: r, viewportHeight: n, pageWidthPx: s, pageHeightPx: o, pageCols: i, gapPx: a = nr, paddingPx: u = 32 } = e, l = Math.max(1, r - u * 2), f = Math.max(1, n - u * 2), g = s * i + (i > 1 ? a : 0), p = o, x = Math.min(l / g, f / p), w = Math.floor(x * 100 / Or) * Or;
  return Math.min(Ls, Math.max(fn, w || fn));
}
function kd() {
  if (typeof window > "u") return { ...wt };
  try {
    const e = window.localStorage.getItem(ui);
    if (!e) return { ...wt };
    const r = JSON.parse(e);
    if (!r || typeof r != "object") return { ...wt };
    const n = r;
    return { navigation: gd(n.navigation) ? n.navigation : wt.navigation, pages: bd(n.pages) ? n.pages : wt.pages, firstPageSingle: typeof n.firstPageSingle == "boolean" ? n.firstPageSingle : wt.firstPageSingle, zoomPercent: Tn(typeof n.zoomPercent == "number" ? n.zoomPercent : wt.zoomPercent) };
  } catch {
    return { ...wt };
  }
}
function Mr(e) {
  if (!(typeof window > "u")) try {
    window.localStorage.setItem(ui, JSON.stringify(e));
  } catch {
  }
}
function po(e) {
  return e instanceof HTMLElement ? !!e.closest('textarea, input, select, [contenteditable="true"]') : false;
}
function pi(e, r = true, n = {}) {
  const s = n.spaceDrag !== false, o = n.middleClick !== false;
  d.useEffect(() => {
    if (!r || !e || !s && !o) return;
    let i = false, a = null;
    const u = () => {
      if (a) {
        e.style.cursor = "grabbing", e.style.userSelect = "none";
        return;
      }
      if (s && i) {
        e.style.cursor = "grab", e.style.userSelect = "";
        return;
      }
      e.style.cursor = "", e.style.userSelect = "";
    }, l = () => {
      if (a) {
        try {
          e.releasePointerCapture(a.pointerId);
        } catch {
        }
        a = null, u();
      }
    }, f = (j) => {
      if (s && !(j.code !== "Space" && j.key !== " ") && !po(j.target)) {
        if (j.repeat) {
          j.preventDefault();
          return;
        }
        i = true, j.preventDefault(), u();
      }
    }, g = (j) => {
      s && (j.code !== "Space" && j.key !== " " || (i = false, a || u()));
    }, p = () => {
      i = false, l(), u();
    }, x = (j) => {
      if (j.pointerType === "touch") return;
      const R = o && j.button === 1, C = s && j.button === 0 && i;
      if (!R && !C || po(j.target)) return;
      R && j.preventDefault();
      const E = e.scrollWidth > e.clientWidth + 1, $ = e.scrollHeight > e.clientHeight + 1;
      if (!(!E && !$)) {
        j.preventDefault(), j.stopPropagation(), a = { pointerId: j.pointerId, lastX: j.clientX, lastY: j.clientY };
        try {
          e.setPointerCapture(j.pointerId);
        } catch {
        }
        u();
      }
    }, w = (j) => {
      if (!a || j.pointerId !== a.pointerId) return;
      const R = j.clientX - a.lastX, C = j.clientY - a.lastY;
      a.lastX = j.clientX, a.lastY = j.clientY, e.scrollLeft -= R, e.scrollTop -= C;
    }, y = (j) => {
      !a || j.pointerId !== a.pointerId || l();
    }, b = () => {
      a = null, u();
    }, v = (j) => {
      o && j.button === 1 && j.preventDefault();
    };
    return s && (window.addEventListener("keydown", f, true), window.addEventListener("keyup", g, true), window.addEventListener("blur", p)), e.addEventListener("pointerdown", x, true), e.addEventListener("pointermove", w), e.addEventListener("pointerup", y), e.addEventListener("pointercancel", y), e.addEventListener("lostpointercapture", b), o && e.addEventListener("auxclick", v), () => {
      s && (window.removeEventListener("keydown", f, true), window.removeEventListener("keyup", g, true), window.removeEventListener("blur", p)), e.removeEventListener("pointerdown", x, true), e.removeEventListener("pointermove", w), e.removeEventListener("pointerup", y), e.removeEventListener("pointercancel", y), e.removeEventListener("lostpointercapture", b), o && e.removeEventListener("auxclick", v), e.style.cursor = "", e.style.userSelect = "";
    };
  }, [e, r, s, o]);
}
function jd({ widthPx: e, heightPx: r }) {
  return t.jsx("div", { "data-print-page-slot": "1", className: "shrink-0 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.12)]", style: { width: e, height: r }, "aria-hidden": true });
}
function Sd({ widthPx: e, heightPx: r, children: n }) {
  return t.jsx("div", { "data-print-page-slot": "1", className: "relative shrink-0 overflow-hidden shadow-[0_8px_28px_rgba(15,23,42,0.12)]", style: { width: e, height: r }, children: n });
}
function Nd({ widthPx: e, heightPx: r, pageInnerHeightPx: n, pageStart: s, pageEnd: o, previewHtml: i, layoutKey: a }) {
  const u = d.useRef(null);
  d.useLayoutEffect(() => {
    const g = u.current;
    if (!g) return;
    g.innerHTML = i;
    for (const x of g.querySelectorAll("[id]")) x.removeAttribute("id");
    const p = g.firstElementChild;
    p instanceof HTMLElement && p.setAttribute("data-export-pdf-preview", "1");
  }, [a, i, s]);
  const l = Math.max(1, n), f = Math.max(1, o - s);
  return t.jsx("div", { "data-print-page-slot": "1", className: "relative shrink-0 overflow-hidden bg-white text-gray-900 shadow-[0_8px_28px_rgba(15,23,42,0.12)]", style: { width: e, height: r, padding: "var(--print-page-margin)", boxSizing: "border-box" }, children: t.jsx("div", { className: "relative overflow-hidden", style: { height: l }, children: t.jsx("div", { className: "relative overflow-hidden", style: { height: f }, children: t.jsx("div", { ref: u, className: "export-pdf-page-slot-clone origin-top-left", style: { transform: `translateY(-${s}px)` } }) }) }) });
}
function cn({ logicalIndex: e, hasCover: r, coverNode: n, pageStarts: s, contentHeight: o, pageInnerHeightPx: i, widthPx: a, heightPx: u, previewHtml: l, layoutKey: f, allowBlank: g = true }) {
  if (e == null) return g ? t.jsx(jd, { widthPx: a, heightPx: u }) : null;
  if (r && e === 0) return t.jsx(Sd, { widthPx: a, heightPx: u, children: n });
  const p = e - (r ? 1 : 0), x = s[p] ?? 0, w = s[p + 1] ?? o;
  return t.jsx(Nd, { widthPx: a, heightPx: u, pageInnerHeightPx: i, pageStart: x, pageEnd: w, previewHtml: l, layoutKey: `${f}:${p}` });
}
function mi({ pair: e, hasCover: r, coverNode: n, pageStarts: s, contentHeight: o, pageInnerHeightPx: i, widthPx: a, heightPx: u, previewHtml: l, layoutKey: f, gapPx: g }) {
  const p = e.left ?? e.right;
  return e.centerSingle && p != null ? t.jsx("div", { className: "flex flex-row items-start justify-center", style: { width: a * 2 + g }, children: t.jsx(cn, { logicalIndex: p, hasCover: r, coverNode: n, pageStarts: s, contentHeight: o, pageInnerHeightPx: i, widthPx: a, heightPx: u, previewHtml: l, layoutKey: f, allowBlank: false }) }) : t.jsxs("div", { className: "flex flex-row items-start justify-center", style: { gap: g }, children: [t.jsx(cn, { logicalIndex: e.left, hasCover: r, coverNode: n, pageStarts: s, contentHeight: o, pageInnerHeightPx: i, widthPx: a, heightPx: u, previewHtml: l, layoutKey: f }), t.jsx(cn, { logicalIndex: e.right, hasCover: r, coverNode: n, pageStarts: s, contentHeight: o, pageInnerHeightPx: i, widthPx: a, heightPx: u, previewHtml: l, layoutKey: f })] });
}
function Cd({ logicalIndex: e, hasCover: r, coverNode: n, pageStarts: s, contentHeight: o, pageInnerHeightPx: i, widthPx: a, heightPx: u, previewHtml: l, layoutKey: f }) {
  return t.jsx(cn, { logicalIndex: e, hasCover: r, coverNode: n, pageStarts: s, contentHeight: o, pageInnerHeightPx: i, widthPx: a, heightPx: u, previewHtml: l, layoutKey: f });
}
function Ed({ navigation: e, pages: r, firstPageSingle: n, zoomPercent: s, onZoomChange: o, pageSizeId: i, pageStarts: a, contentHeight: u, pageInnerHeightPx: l, hasCover: f, coverNode: g, sourceContentRef: p, layoutKey: x, flipIndex: w, onFlipIndexChange: y, onVisibleLogicalPagesChange: b }) {
  const v = d.useRef(null), j = d.useRef(null), [R, C] = d.useState(null), E = d.useCallback((P) => {
    j.current = P, C(P);
  }, []), [$, W] = d.useState("");
  pi(R, e === "scroll" && r === 2);
  const { widthPx: I, heightPx: _ } = d.useMemo(() => yd(i), [i]), U = Math.max(1, a.length), A = (f ? 1 : 0) + U, L = d.useMemo(() => r === 1 ? Array.from({ length: A }, (P, q) => ({ left: q, right: null })) : fi(A, n), [n, r, A]), Q = Math.min(Math.max(0, w), Math.max(0, L.length - 1));
  d.useLayoutEffect(() => {
    const P = p.current;
    if (!P) {
      W("");
      return;
    }
    const q = P.querySelector("#export-pdf-preview");
    W(q ? q.outerHTML : P.innerHTML);
  }, [x, p, a, l]);
  const V = d.useRef(o);
  V.current = o, d.useLayoutEffect(() => {
    if (e !== "flip") return;
    const P = v.current;
    if (!P) return;
    const q = () => {
      const ee = P.getBoundingClientRect(), Se = vd({ viewportWidth: ee.width, viewportHeight: ee.height, pageWidthPx: I, pageHeightPx: _, pageCols: r, gapPx: nr });
      V.current(Se);
    };
    q();
    const ae = new ResizeObserver(q);
    return ae.observe(P), () => ae.disconnect();
  }, [_, e, r, I]), d.useEffect(() => {
    w !== Q && y(Q);
  }, [w, y, Q]);
  const re = d.useCallback((P) => {
    if (!b) return;
    const q = P.map((ae) => ae + 1);
    b(q.length ? q : [1]);
  }, [b]);
  d.useEffect(() => {
    if (e === "flip") {
      const P = L[Q];
      if (!P) {
        re([0]);
        return;
      }
      re(r === 1 ? P.left != null ? [P.left] : [0] : fo(P));
    }
  }, [e, r, L, re, Q]), d.useEffect(() => {
    if (e !== "scroll" || r !== 2) return;
    const P = j.current;
    if (!P) return;
    const q = _ + nr, ae = () => {
      const ee = s / 100, Se = Math.max(1, q * ee), Ne = P.scrollTop, Ce = P.clientHeight, Pe = Math.max(0, Math.floor(Ne / Se)), He = Math.min(L.length - 1, Math.floor((Ne + Ce) / Se)), et = [];
      for (let Te = Pe; Te <= He; Te += 1) {
        const H = L[Te];
        H && et.push(...fo(H));
      }
      re(et);
    };
    return ae(), P.addEventListener("scroll", ae, { passive: true }), () => P.removeEventListener("scroll", ae);
  }, [_, e, r, L, re, s]);
  const ge = d.useCallback(() => {
    y(Math.max(0, Q - 1));
  }, [y, Q]), oe = d.useCallback(() => {
    y(Math.min(L.length - 1, Q + 1));
  }, [y, L.length, Q]), ie = d.useRef(ge), he = d.useRef(oe);
  ie.current = ge, he.current = oe;
  const D = Q > 0, X = Q < L.length - 1;
  d.useEffect(() => {
    if (e !== "flip") return;
    const P = (q) => {
      const ae = q.target;
      ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA" || ae.isContentEditable) || (q.key === "ArrowLeft" || q.key === "PageUp" ? (q.preventDefault(), ge()) : (q.key === "ArrowRight" || q.key === "PageDown") && (q.preventDefault(), oe()));
    };
    return window.addEventListener("keydown", P), () => window.removeEventListener("keydown", P);
  }, [oe, ge, e]), d.useEffect(() => {
    if (e !== "flip") return;
    const P = v.current;
    if (!P) return;
    const q = 48, ae = 60;
    let ee = 0, Se = 0, Ne = false, Ce = 0;
    const Pe = (H) => {
      if (H.touches.length !== 1) return;
      const de = H.touches[0];
      de && (Ne = true, ee = de.clientX, Se = de.clientY);
    }, He = (H) => {
      if (!Ne) return;
      Ne = false;
      const de = H.changedTouches[0];
      if (!de) return;
      const me = de.clientX - ee, at = de.clientY - Se;
      Math.abs(me) < q || Math.abs(me) < Math.abs(at) * 1.2 || (me < 0 ? he.current() : ie.current());
    }, et = () => {
      Ne = false;
    }, Te = (H) => {
      if (!(Math.abs(H.deltaX) > Math.abs(H.deltaY) * 1.1 || H.shiftKey && Math.abs(H.deltaY) > 0)) {
        Ce = 0;
        return;
      }
      H.preventDefault();
      const me = H.shiftKey && Math.abs(H.deltaX) < 1 ? H.deltaY : H.deltaX;
      Ce += me, !(Math.abs(Ce) < ae) && (Ce > 0 ? he.current() : ie.current(), Ce = 0);
    };
    return P.addEventListener("touchstart", Pe, { passive: true }), P.addEventListener("touchend", He, { passive: true }), P.addEventListener("touchcancel", et, { passive: true }), P.addEventListener("wheel", Te, { passive: false }), () => {
      P.removeEventListener("touchstart", Pe), P.removeEventListener("touchend", He), P.removeEventListener("touchcancel", et), P.removeEventListener("wheel", Te);
    };
  }, [e]);
  const K = { zoom: s / 100 }, be = d.useCallback((P) => {
    if (P.button !== 0) return;
    const q = v.current;
    if (!q) return;
    const ae = q.querySelectorAll('[data-print-page-slot="1"]');
    for (const Ne of ae) {
      const Ce = Ne.getBoundingClientRect();
      if (P.clientX >= Ce.left && P.clientX <= Ce.right && P.clientY >= Ce.top && P.clientY <= Ce.bottom) return;
    }
    const ee = q.getBoundingClientRect(), Se = ee.left + ee.width / 2;
    P.clientX < Se ? D && ge() : X && oe();
  }, [X, D, oe, ge]);
  if (e === "scroll" && r === 2) {
    const P = _ + nr, q = 1, ae = s / 100;
    return t.jsx("div", { ref: E, className: "export-pdf-preview-stage h-full min-h-0 w-full overflow-auto print:hidden", children: t.jsx("div", { style: K, children: t.jsx("div", { className: "relative mx-auto", style: { height: Math.max(P, L.length * P), width: I * 2 + nr }, children: t.jsx(Pd, { pairs: L, rowH: P, scale: ae, scrollRef: j, overscan: q, hasCover: f, coverNode: g, pageStarts: a, contentHeight: u, pageInnerHeightPx: l, widthPx: I, heightPx: _, previewHtml: $, layoutKey: x }) }) }) });
  }
  const se = L[Q] ?? { left: 0, right: null };
  return t.jsxs("div", { ref: v, className: "export-pdf-preview-stage relative flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden touch-pan-y print:hidden", onPointerDown: be, children: [t.jsx("div", { className: "pointer-events-none relative z-10 flex min-h-0 w-full flex-1 items-center justify-center overflow-auto p-4", children: t.jsx("div", { className: "pointer-events-auto", style: K, children: r === 1 ? t.jsx(Cd, { logicalIndex: se.left ?? 0, hasCover: f, coverNode: g, pageStarts: a, contentHeight: u, pageInnerHeightPx: l, widthPx: I, heightPx: _, previewHtml: $, layoutKey: x }) : t.jsx(mi, { pair: se, hasCover: f, coverNode: g, pageStarts: a, contentHeight: u, pageInnerHeightPx: l, widthPx: I, heightPx: _, previewHtml: $, layoutKey: x, gapPx: nr }) }) }), t.jsxs("div", { className: "pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 print:hidden", children: [t.jsx("button", { type: "button", className: "pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm hover:bg-white disabled:opacity-30 dark:border-odp-borderSoft dark:bg-odp-bgSoft/90 dark:text-odp-fg", "aria-label": "\uC774\uC804 \uD398\uC774\uC9C0", disabled: !D, onPointerDown: (P) => P.stopPropagation(), onClick: (P) => {
    P.stopPropagation(), ge();
  }, children: t.jsx(Gl, { size: 20 }) }), t.jsx("button", { type: "button", className: "pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm hover:bg-white disabled:opacity-30 dark:border-odp-borderSoft dark:bg-odp-bgSoft/90 dark:text-odp-fg", "aria-label": "\uB2E4\uC74C \uD398\uC774\uC9C0", disabled: !X, onPointerDown: (P) => P.stopPropagation(), onClick: (P) => {
    P.stopPropagation(), oe();
  }, children: t.jsx(Ko, { size: 20 }) })] })] });
}
function Pd({ pairs: e, rowH: r, scale: n, scrollRef: s, overscan: o, hasCover: i, coverNode: a, pageStarts: u, contentHeight: l, pageInnerHeightPx: f, widthPx: g, heightPx: p, previewHtml: x, layoutKey: w }) {
  const [y, b] = d.useState({ first: 0, last: 2 });
  d.useEffect(() => {
    const j = s.current;
    if (!j) return;
    const R = () => {
      const E = Math.max(1, r * n), $ = j.scrollTop, W = j.clientHeight, I = Math.max(0, Math.floor($ / E) - o), _ = Math.min(e.length - 1, Math.ceil(($ + W) / E) + o);
      b((U) => U.first === I && U.last === _ ? U : { first: I, last: _ });
    };
    R(), j.addEventListener("scroll", R, { passive: true });
    const C = new ResizeObserver(R);
    return C.observe(j), () => {
      j.removeEventListener("scroll", R), C.disconnect();
    };
  }, [o, e.length, r, n, s]);
  const v = [];
  for (let j = y.first; j <= y.last; j += 1) {
    const R = e[j];
    R && v.push(t.jsx("div", { className: "absolute left-0 right-0", style: { top: j * r, height: p }, children: t.jsx(mi, { pair: R, hasCover: i, coverNode: a, pageStarts: u, contentHeight: l, pageInnerHeightPx: f, widthPx: g, heightPx: p, previewHtml: x, layoutKey: w, gapPx: nr }) }, `spread-${j}`));
  }
  return t.jsx(t.Fragment, { children: v });
}
function Td(e, r, n, s) {
  const o = e.getBoundingClientRect(), i = r.getBoundingClientRect(), a = o.top - i.top + r.scrollTop;
  let u = 0;
  for (let l = 0; l < n.length; l += 1) {
    const f = n[l] ?? 0, g = n[l + 1] ?? Number.POSITIVE_INFINITY;
    if (a >= f && a < g) {
      u = l;
      break;
    }
    a >= f && (u = l);
  }
  return (s ? 1 : 0) + u;
}
function Rd(e, r, n, s) {
  if (n === 1) return Math.min(Math.max(0, e), Math.max(0, r - 1));
  const o = fi(r, s);
  return wd(o, e);
}
function Md({ value: e, onChange: r, disabled: n = false }) {
  const [s, o] = d.useState(false), [i, a] = d.useState(String(e)), u = d.useRef(null), l = d.useRef(false), f = d.useRef(null);
  d.useEffect(() => () => {
    f.current && clearTimeout(f.current);
  }, []), d.useEffect(() => {
    s || a(String(e));
  }, [s, e]), d.useEffect(() => {
    if (!s) return;
    const p = u.current;
    p && (p.focus(), p.select());
  }, [s]);
  const g = () => {
    const p = Number.parseFloat(i.replace(/%/g, "").trim());
    if (!Number.isFinite(p)) {
      a(String(e)), o(false);
      return;
    }
    r(Tn(p)), o(false);
  };
  return t.jsxs("div", { className: "inline-flex h-8 items-center gap-0.5 rounded-md border border-gray-300 bg-white dark:border-odp-borderStrong dark:bg-odp-surface", "data-print-toolbar": "zoom", children: [t.jsx("button", { type: "button", disabled: n || e <= fn, onClick: () => r(Ir(e, -1)), className: "inline-flex h-full w-7 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-focusBg", "aria-label": "\uCD95\uC18C", title: "\uCD95\uC18C", children: t.jsx(Xo, { size: 14 }) }), s ? t.jsx("input", { ref: u, type: "text", inputMode: "numeric", disabled: n, value: i, "aria-label": "\uD655\uB300 \uBE44\uC728", className: "h-full w-14 border-x border-gray-200 bg-transparent px-1 text-center text-xs tabular-nums text-gray-800 outline-none dark:border-odp-borderSoft dark:text-odp-fgStrong", onChange: (p) => a(p.target.value), onKeyDown: (p) => {
    p.key === "Enter" ? (p.preventDefault(), l.current = true, g()) : p.key === "Escape" && (p.preventDefault(), l.current = true, a(String(e)), o(false));
  }, onBlur: () => {
    if (l.current) {
      l.current = false;
      return;
    }
    g();
  } }) : t.jsxs("button", { type: "button", disabled: n, className: "inline-flex h-full w-14 items-center justify-center border-x border-gray-200 px-1 text-xs tabular-nums text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", "aria-label": `\uD655\uB300 \uBE44\uC728 ${e}%`, title: "\uD074\uB9AD\uD558\uC5EC \uC785\uB825, \uB354\uBE14\uD074\uB9AD\uC73C\uB85C 100%", onClick: () => {
    n || (f.current && clearTimeout(f.current), f.current = setTimeout(() => {
      f.current = null, a(String(e)), o(true);
    }, 220));
  }, onDoubleClick: (p) => {
    p.preventDefault(), p.stopPropagation(), !n && (f.current && (clearTimeout(f.current), f.current = null), o(false), r(100));
  }, children: [e, "%"] }), t.jsx("button", { type: "button", disabled: n || e >= Ls, onClick: () => r(Ir(e, 1)), className: "inline-flex h-full w-7 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-focusBg", "aria-label": "\uD655\uB300", title: "\uD655\uB300", children: t.jsx(Go, { size: 14 }) })] });
}
function Ld() {
  const e = window.visualViewport;
  return e ? { top: e.offsetTop, bottom: e.offsetTop + e.height } : { top: 0, bottom: window.innerHeight };
}
function zd(e, r, n, s) {
  const o = e.getBoundingClientRect();
  return Math.min(o.bottom, n) - Math.max(o.top, r) > s;
}
function Ad(e, r, n, s, o, i) {
  const a = s.getBoundingClientRect(), u = Ld(), l = Math.max(a.top, u.top), f = Math.min(a.bottom, u.bottom);
  if (f - l <= 8) return [1];
  const g = [];
  if (i && o && zd(o, l, f, 24) && g.push(1), !e.length) return g.length ? g : [1];
  const p = n.getBoundingClientRect(), x = l - p.top, w = f - p.top, y = i ? 1 : 0;
  for (let b = 0; b < e.length; b += 1) {
    const v = e[b] ?? 0, j = e[b + 1] ?? Math.max(r, v + 1);
    Math.min(j, w) - Math.max(v, x) > 24 && g.push(b + 1 + y);
  }
  return g.length ? g : [1];
}
function Id({ pageStarts: e, contentHeight: r, paperRef: n, scrollRef: s, coverRef: o, hasCover: i = false, overridePages: a = null }) {
  const [u, l] = d.useState([1]);
  d.useEffect(() => {
    var _a2, _b;
    if (a && a.length > 0) {
      l(a);
      return;
    }
    const x = n.current, w = s.current;
    if (!x || !w) return;
    let y = 0;
    const b = () => {
      const j = Ad(e, r, x, w, (o == null ? void 0 : o.current) ?? null, i);
      l((R) => R.length === j.length && R.every((C, E) => C === j[E]) ? R : j);
    }, v = () => {
      y || (y = window.requestAnimationFrame(() => {
        y = 0, b();
      }));
    };
    return b(), w.addEventListener("scroll", v, { passive: true }), window.addEventListener("scroll", v, { passive: true }), window.addEventListener("resize", v), (_a2 = window.visualViewport) == null ? void 0 : _a2.addEventListener("resize", v), (_b = window.visualViewport) == null ? void 0 : _b.addEventListener("scroll", v), () => {
      var _a3, _b2;
      y && window.cancelAnimationFrame(y), w.removeEventListener("scroll", v), window.removeEventListener("scroll", v), window.removeEventListener("resize", v), (_a3 = window.visualViewport) == null ? void 0 : _a3.removeEventListener("resize", v), (_b2 = window.visualViewport) == null ? void 0 : _b2.removeEventListener("scroll", v);
    };
  }, [r, o, i, a, e, n, s]);
  const f = u[0] ?? 1, g = u[u.length - 1] ?? f, p = f === g ? `${f}p` : `${f}p \u2013 ${g}p`;
  return t.jsx("div", { className: "pointer-events-none fixed bottom-4 left-4 z-40 rounded-md border border-gray-200 bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-sm print:hidden dark:border-odp-borderSoft dark:bg-odp-bgSoft/90 dark:text-odp-fg", "aria-live": "polite", children: p });
}
function Qn(e, r, n, s) {
  if (!Number.isFinite(e)) return r;
  const o = Math.min(n, Math.max(r, e));
  if (s <= 0) return o;
  const i = Math.round(o / s) * s;
  return Math.min(n, Math.max(r, i));
}
function pn({ value: e, onChange: r, min: n = 0, max: s = 100, step: o = 1, suffix: i = "", disabled: a = false, resetValue: u, "aria-label": l = "\uAC12", decreaseLabel: f = "\uAC10\uC18C", increaseLabel: g = "\uC99D\uAC00", className: p = "" }) {
  const [x, w] = d.useState(false), [y, b] = d.useState(String(e)), v = d.useRef(null), j = d.useRef(false), R = d.useRef(null), C = `${e}${i}`;
  d.useEffect(() => () => {
    R.current && clearTimeout(R.current);
  }, []), d.useEffect(() => {
    x || b(String(e));
  }, [x, e]), d.useEffect(() => {
    if (!x) return;
    const W = v.current;
    W && (W.focus(), W.select());
  }, [x]);
  const E = () => {
    const W = y.replace(new RegExp(`${i}$`, "i"), "").replace(/%/g, "").trim(), I = Number.parseFloat(W);
    if (!Number.isFinite(I)) {
      b(String(e)), w(false);
      return;
    }
    r(Qn(I, n, s, o)), w(false);
  }, $ = (W) => {
    r(Qn(e + W * o, n, s, o));
  };
  return t.jsxs("div", { className: `inline-flex h-8 items-center gap-0.5 rounded-md border border-gray-300 bg-white dark:border-odp-borderStrong dark:bg-odp-surface ${p}`, children: [t.jsx("button", { type: "button", disabled: a || e <= n, onClick: () => $(-1), className: "inline-flex h-full w-7 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-focusBg", "aria-label": f, title: f, children: t.jsx(Xo, { size: 14 }) }), x ? t.jsx("input", { ref: v, type: "text", inputMode: "numeric", disabled: a, value: y, "aria-label": l, className: "h-full w-14 border-x border-gray-200 bg-transparent px-1 text-center text-xs tabular-nums text-gray-800 outline-none dark:border-odp-borderSoft dark:text-odp-fgStrong", onChange: (W) => b(W.target.value), onKeyDown: (W) => {
    W.key === "Enter" ? (W.preventDefault(), j.current = true, E()) : W.key === "Escape" && (W.preventDefault(), j.current = true, b(String(e)), w(false));
  }, onBlur: () => {
    if (j.current) {
      j.current = false;
      return;
    }
    E();
  } }) : t.jsx("button", { type: "button", disabled: a, className: "inline-flex h-full w-14 items-center justify-center border-x border-gray-200 px-1 text-xs tabular-nums text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", "aria-label": `${l} ${C}`, title: u != null ? `\uD074\uB9AD\uD558\uC5EC \uC785\uB825, \uB354\uBE14\uD074\uB9AD\uC73C\uB85C ${u}${i}` : "\uD074\uB9AD\uD558\uC5EC \uC785\uB825", onClick: () => {
    a || (R.current && clearTimeout(R.current), R.current = setTimeout(() => {
      R.current = null, b(String(e)), w(true);
    }, 220));
  }, onDoubleClick: (W) => {
    W.preventDefault(), W.stopPropagation(), !(a || u == null) && (R.current && (clearTimeout(R.current), R.current = null), w(false), r(Qn(u, n, s, o)));
  }, children: C }), t.jsx("button", { type: "button", disabled: a || e >= s, onClick: () => $(1), className: "inline-flex h-full w-7 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-focusBg", "aria-label": g, title: g, children: t.jsx(Go, { size: 14 }) })] });
}
const Dd = `${Lc} z-100010 w-[min(92vw,300px)] max-h-[min(80vh,640px)] overflow-y-auto p-1.5`, hi = "z-100050 max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", xi = "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", gi = "inline-flex h-8 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg", zs = "inline-flex h-8 flex-1 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg dark:hover:bg-odp-focusBg", bi = "border-blue-400 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-200", Bd = "mb-1 px-0.5 text-[10px] font-medium text-gray-400";
function Xe(e, r, n) {
  return { ...e, elements: e.elements.map((s) => s.id !== r ? s : { ...s, ...n }) };
}
function Qt() {
  return t.jsx(tn, {});
}
function mn({ children: e }) {
  return t.jsx("div", { className: Bd, children: e });
}
function Od({ value: e, onChange: r, disabled: n }) {
  const s = [{ id: "left", icon: Vo, label: "\uC67C\uCABD" }, { id: "center", icon: qo, label: "\uAC00\uC6B4\uB370" }, { id: "right", icon: Zo, label: "\uC624\uB978\uCABD" }];
  return t.jsx("div", { className: "flex gap-1", children: s.map(({ id: o, icon: i, label: a }) => t.jsx("button", { type: "button", title: a, disabled: n, className: `${zs} ${e === o ? bi : ""}`, onClick: () => r(o), onPointerDown: (u) => u.stopPropagation(), children: t.jsx(i, { size: 14 }) }, o)) });
}
function $d({ textAlign: e, textVAlign: r, onTextAlignChange: n, onTextVAlignChange: s, disabled: o }) {
  return t.jsx("div", { className: "grid grid-cols-3 gap-1", children: [["left", yn, () => n("left")], ["center", vn, () => n("center")], ["right", kn, () => n("right")], ["top", jn, () => s("top")], ["middle", Sn, () => s("middle")], ["bottom", Nn, () => s("bottom")]].map(([i, a, u]) => {
    const l = i === "left" || i === "center" || i === "right" ? e === i : r === i;
    return t.jsx("button", { type: "button", disabled: o, className: `${zs} ${l ? bi : ""}`, onClick: u, onPointerDown: (f) => f.stopPropagation(), children: t.jsx(a, { size: 14 }) }, i);
  }) });
}
function mo({ disabled: e, onAlign: r }) {
  const n = [{ mode: "left", tip: "\uC67C\uCABD \uC815\uB82C", Icon: yn }, { mode: "centerX", tip: "\uAC00\uB85C \uAC00\uC6B4\uB370", Icon: vn }, { mode: "right", tip: "\uC624\uB978\uCABD \uC815\uB82C", Icon: kn }, { mode: "distributeX", tip: "\uAC00\uB85C \uAC04\uACA9 \uBD84\uBC30", Icon: Yo }, { mode: "top", tip: "\uC704\uCABD \uC815\uB82C", Icon: jn }, { mode: "centerY", tip: "\uC138\uB85C \uAC00\uC6B4\uB370", Icon: Sn }, { mode: "bottom", tip: "\uC544\uB798\uCABD \uC815\uB82C", Icon: Nn }, { mode: "distributeY", tip: "\uC138\uB85C \uAC04\uACA9 \uBD84\uBC30", Icon: Uo }];
  return t.jsx("div", { className: "grid grid-cols-4 gap-1", children: n.map(({ mode: s, tip: o, Icon: i }) => t.jsx("button", { type: "button", title: o, disabled: e, className: zs, onClick: () => r(s), onPointerDown: (a) => a.stopPropagation(), children: t.jsx(i, { size: 14 }) }, s)) });
}
function wi({ value: e, onChange: r, disabled: n = false, ariaLabel: s }) {
  return t.jsxs($t, { value: as(e), onValueChange: (o) => r(is(o)), disabled: n, children: [t.jsxs(_t, { "aria-label": s, className: gi, children: [t.jsx(Ft, {}), t.jsx(Ht, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Wt, { children: t.jsx(Kt, { className: hi, position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: os.map((o) => t.jsxs(Gt, { value: o.value, className: xi, children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(jt, { size: 12 }) }), t.jsx(Ut, { children: o.label })] }, o.value)) }) }) })] });
}
function _d({ cover: e, el: r, onChange: n, disabled: s }) {
  const o = d.useMemo(() => ks(), []);
  return t.jsxs("div", { className: "flex flex-col gap-2 px-1 py-1", onPointerDown: (i) => i.stopPropagation(), onKeyDown: (i) => i.stopPropagation(), children: [t.jsx(mn, { children: "\uD14D\uC2A4\uD2B8" }), t.jsxs("div", { className: "flex flex-col gap-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAE00\uC790 \uD06C\uAE30" }), t.jsx(pn, { min: 6, max: 400, step: 1, suffix: "px", value: r.fontSize, resetValue: 36, "aria-label": "\uAE00\uC790 \uD06C\uAE30", decreaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uC904\uC774\uAE30", increaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uD0A4\uC6B0\uAE30", onChange: (i) => {
    s || n(Xe(e, r.id, { fontSize: i }));
  } })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD3F0\uD2B8" }), t.jsx(wr, { id: `cover-ctx-text-font-${r.id}`, value: r.fontFamily || "", options: o, placeholder: "\uC608: Paperozi, sans-serif", inputClassName: "!px-2 !py-1 !text-xs", onChange: (i) => {
    if (s) return;
    const a = i.trim();
    n({ ...e, elements: e.elements.map((u) => {
      if (u.id !== r.id || u.type !== "text") return u;
      const l = { ...u };
      return a ? l.fontFamily = a : delete l.fontFamily, l;
    }) });
  } })] }), t.jsxs("div", { className: "space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAD75\uAE30" }), t.jsx(wi, { value: r.fontWeight, ariaLabel: "\uD3F0\uD2B8 \uAD75\uAE30", disabled: s, onChange: (i) => n(Xe(e, r.id, { fontWeight: i })) })] }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 text-[10px] text-gray-400", children: "\uD14D\uC2A4\uD2B8 \uC815\uB82C" }), t.jsx(Od, { value: r.textAlign, disabled: s, onChange: (i) => n(Xe(e, r.id, { textAlign: i })) })] }), t.jsx(kt, { value: r.color, allowNone: false, label: "\uAE00\uC790\uC0C9", compact: true, onChange: (i) => {
    s || n(Xe(e, r.id, { color: i || "#111111" }));
  } })] });
}
function Fd({ cover: e, el: r, onChange: n, disabled: s }) {
  return t.jsxs("div", { className: "flex flex-col gap-2 px-1 py-1", onPointerDown: (o) => o.stopPropagation(), onKeyDown: (o) => o.stopPropagation(), children: [t.jsx(mn, { children: "\uB3C4\uD615" }), t.jsx(kt, { value: r.fill, allowNone: true, label: "\uCC44\uC6B0\uAE30", compact: true, onChange: (o) => {
    s || n(Xe(e, r.id, { fill: o || "transparent" }));
  } }), t.jsx(kt, { value: r.borderColor, allowNone: true, label: "\uD14C\uB450\uB9AC \uC0C9", compact: true, onChange: (o) => {
    s || n(Xe(e, r.id, { borderColor: o || "transparent" }));
  } }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD14C\uB450\uB9AC \uB450\uAED8" }), t.jsx(vt, { unit: "css", suffix: "px", min: 0, max: 40, step: 1, value: r.borderWidth, "aria-label": "\uD14C\uB450\uB9AC \uB450\uAED8", onChange: (o) => {
    s || n(Xe(e, r.id, { borderWidth: o }));
  } })] }), t.jsxs("div", { className: "space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD14C\uB450\uB9AC \uC2A4\uD0C0\uC77C" }), t.jsxs($t, { value: r.borderStyle, disabled: s, onValueChange: (o) => {
    o !== "solid" && o !== "dashed" && o !== "dotted" || n(Xe(e, r.id, { borderStyle: o }));
  }, children: [t.jsxs(_t, { "aria-label": "\uD14C\uB450\uB9AC \uC2A4\uD0C0\uC77C", className: gi, children: [t.jsx(Ft, {}), t.jsx(Ht, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Wt, { children: t.jsx(Kt, { className: hi, position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: [{ value: "solid", label: "\uC2E4\uC120" }, { value: "dashed", label: "\uD30C\uC120" }, { value: "dotted", label: "\uC810\uC120" }].map((o) => t.jsxs(Gt, { value: o.value, className: xi, children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(jt, { size: 12 }) }), t.jsx(Ut, { children: o.label })] }, o.value)) }) }) })] })] }), r.type === "roundRect" ? t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uBAA8\uC11C\uB9AC \uB465\uAE00\uAE30" }), t.jsx(vt, { unit: "percent", suffix: "%", min: 0, max: 50, step: 1, value: r.cornerRadiusPct ?? 4, "aria-label": "\uBAA8\uC11C\uB9AC \uB465\uAE00\uAE30", onChange: (o) => {
    s || n(Xe(e, r.id, { cornerRadiusPct: o }));
  } })] }) : null, t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uB3C4\uD615 \uC548 \uD14D\uC2A4\uD2B8" }), t.jsx("textarea", { className: "min-h-14 w-full resize-y rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg", value: r.text ?? "", placeholder: "\uC120\uD0DD \uC0AC\uD56D", disabled: s, onChange: (o) => n(Xe(e, r.id, { text: o.target.value })) })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uC548\uCABD \uC5EC\uBC31" }), t.jsx(vt, { unit: "percent", suffix: "%", min: 0, max: 40, step: 1, value: r.paddingPct ?? 0, "aria-label": "\uB3C4\uD615 \uC548\uCABD \uC5EC\uBC31", onChange: (o) => {
    s || n(Xe(e, r.id, { paddingPct: o }));
  } })] }), t.jsxs("div", { className: "flex flex-col gap-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAE00\uC790 \uD06C\uAE30" }), t.jsx(pn, { min: 6, max: 400, step: 1, suffix: "px", value: r.fontSize ?? 24, resetValue: 24, "aria-label": "\uB3C4\uD615 \uAE00\uC790 \uD06C\uAE30", decreaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uC904\uC774\uAE30", increaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uD0A4\uC6B0\uAE30", onChange: (o) => {
    s || n(Xe(e, r.id, { fontSize: o }));
  } })] }), t.jsxs("div", { className: "space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAD75\uAE30" }), t.jsx(wi, { value: r.fontWeight ?? "normal", ariaLabel: "\uB3C4\uD615 \uAE00\uC790 \uAD75\uAE30", disabled: s, onChange: (o) => n(Xe(e, r.id, { fontWeight: o })) })] }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 text-[10px] text-gray-400", children: "\uD14D\uC2A4\uD2B8 \uC704\uCE58" }), t.jsx($d, { textAlign: r.textAlign ?? "center", textVAlign: r.textVAlign ?? "middle", disabled: s, onTextAlignChange: (o) => n(Xe(e, r.id, { textAlign: o })), onTextVAlignChange: (o) => n(Xe(e, r.id, { textVAlign: o })) })] }), t.jsx(kt, { value: r.color ?? "#111111", allowNone: false, label: "\uAE00\uC790\uC0C9", compact: true, onChange: (o) => {
    s || n(Xe(e, r.id, { color: o || "#111111" }));
  } })] });
}
function Hd(e, r) {
  const n = Ve(e, r), s = n.length ? n : [...r];
  if (!s.length) return e;
  const o = s.some((a) => !_r(e, a));
  let i = e;
  for (const a of s) i = oi(i, a, o);
  return i;
}
function Wd(e, r) {
  const n = Ve(e, r), s = n.length ? n : [...r];
  return s.length > 0 && s.every((o) => _r(e, o));
}
function yi({ cover: e, targetId: r, selectedIds: n, onChange: s, onSelectIds: o, onRequestDelete: i, onImageCrop: a, onRestoreImageAspect: u, onToggleImageLockAspect: l }) {
  const f = n.includes(r) ? n : [r], g = Ve(e, f), p = g.length === 1 && _e(e, g[0]) ? g[0] : null, x = f.length > 1 && !p, w = !!p, y = f.length === 1 ? e.elements.find(($) => $.id === f[0]) ?? null : null, b = f.length > 0 && f.every(($) => {
    const W = e.elements.find((I) => I.id === $);
    return W ? sr(e, W) : true;
  }), v = Wd(e, f), R = di(e, f).enabled, C = ($) => {
    var _a2;
    const W = Br(e, f);
    if (!W.length) return;
    const _ = (_a2 = document.querySelector('[data-cover-frame="1"]')) == null ? void 0 : _a2.getBoundingClientRect(), U = $ === "distributeX" ? (_ == null ? void 0 : _.width) ?? 0 : (_ == null ? void 0 : _.height) ?? 0, A = ds(e.layout.gapPx, U);
    if (p) {
      s(Ar(e, W, $, A, { insideGroupId: p }));
      return;
    }
    s(Ar(e, W, $, A));
  }, E = !(f.length < 1 || p);
  return t.jsxs(t.Fragment, { children: [t.jsxs(Ie, { className: ft, onSelect: () => {
    n.includes(r) || o(f), s(Hd(e, f));
  }, children: [v ? t.jsx(js, { size: 16, className: "shrink-0" }) : t.jsx(Ss, { size: 16, className: "shrink-0" }), v ? "\uC7A0\uAE08 \uD574\uC81C" : "\uC7A0\uAE08"] }), w ? t.jsxs(t.Fragment, { children: [t.jsxs(Ie, { className: ft, onSelect: () => {
    p && s(Pn(e, p));
  }, children: [t.jsx(Ns, { size: 16, className: "shrink-0" }), "\uADF8\uB8F9 \uD574\uC81C"] }), t.jsx(Qt, {}), t.jsxs("div", { className: "px-1 py-1", onPointerDown: ($) => $.stopPropagation(), children: [t.jsx(mn, { children: "\uC815\uB82C" }), t.jsx(mo, { disabled: !R, onAlign: C })] })] }) : null, x ? t.jsxs(t.Fragment, { children: [t.jsxs(Ie, { className: ft, disabled: !E, onSelect: () => {
    const $ = En(e, f);
    $ && (s($.cover), o(Me($.cover, $.groupId)));
  }, children: [t.jsx(Cs, { size: 16, className: "shrink-0" }), "\uADF8\uB8F9\uD654"] }), t.jsx(Qt, {}), t.jsxs("div", { className: "px-1 py-1", onPointerDown: ($) => $.stopPropagation(), children: [t.jsx(mn, { children: "\uAC1C\uCCB4 \uC815\uB82C" }), t.jsx(mo, { disabled: !R, onAlign: C })] })] }) : null, (y == null ? void 0 : y.type) === "text" ? t.jsxs(t.Fragment, { children: [t.jsx(Qt, {}), t.jsx(_d, { cover: e, el: y, onChange: s, disabled: b })] }) : null, y && kr(y) ? t.jsxs(t.Fragment, { children: [t.jsx(Qt, {}), t.jsx(Fd, { cover: e, el: y, onChange: s, disabled: b })] }) : null, (y == null ? void 0 : y.type) === "image" ? t.jsxs(t.Fragment, { children: [t.jsx(Qt, {}), t.jsxs(Ie, { className: ft, disabled: b, onSelect: () => a == null ? void 0 : a(y), children: [t.jsx(Yl, { size: 16, className: "shrink-0" }), "\uC790\uB974\uAE30"] }), t.jsxs(Ie, { className: ft, disabled: b || !y.naturalAspect, onSelect: () => u == null ? void 0 : u(y.id), children: [t.jsx(Ul, { size: 16, className: "shrink-0" }), "\uC6D0\uBCF8 \uBE44\uC728\uB85C \uB418\uB3CC\uB9AC\uAE30"] }), t.jsxs(Ie, { className: ft, disabled: b, onSelect: () => l == null ? void 0 : l(y.id), children: [t.jsx(Vl, { size: 16, className: "shrink-0" }), y.lockAspect ? "\uBB34\uC870\uAC74 \uBE44\uC728 \uC720\uC9C0 \uD574\uC81C" : "\uBB34\uC870\uAC74 \uBE44\uC728 \uC720\uC9C0"] })] }) : null, t.jsx(Qt, {}), t.jsxs(Ie, { className: ft, disabled: b, onSelect: () => s(oo(e, f, 1)), children: [t.jsx(ql, { size: 16, className: "shrink-0" }), "\uC55E\uC73C\uB85C"] }), t.jsxs(Ie, { className: ft, disabled: b, onSelect: () => s(oo(e, f, -1)), children: [t.jsx(Zl, { size: 16, className: "shrink-0" }), "\uB4A4\uB85C"] }), t.jsxs(Ie, { className: ft, disabled: b, onSelect: () => s(Ts(e, f)), children: [t.jsx(Es, { size: 16, className: "shrink-0" }), "\uB9E8 \uC55E\uC73C\uB85C"] }), t.jsxs(Ie, { className: ft, disabled: b, onSelect: () => s(Rs(e, f)), children: [t.jsx(Ps, { size: 16, className: "shrink-0" }), "\uB9E8 \uB4A4\uB85C"] }), t.jsx(Qt, {}), t.jsxs(Ie, { className: zc, danger: true, onSelect: () => {
    n.includes(r) || o(f), i(f);
  }, children: [t.jsx(wn, { size: 16, className: "shrink-0" }), "\uC0AD\uC81C"] })] });
}
function Kd(e) {
  return t.jsx(hc, { className: Dd, onCloseAutoFocus: (r) => r.preventDefault(), onPointerDownOutside: (r) => {
    const n = r.target;
    n instanceof Element && n.closest(`[${to}]`) && r.preventDefault();
  }, onInteractOutside: (r) => {
    const n = r.target;
    n instanceof Element && n.closest(`[${to}]`) && r.preventDefault();
  }, children: t.jsx(Do, { surface: "desktop", children: t.jsx(yi, { ...e }) }) });
}
async function jr(e, r) {
  var _a2, _b;
  const n = (r == null ? void 0 : r.type) || "s3", s = String((r == null ? void 0 : r.id) || "").trim(), o = s ? Sa(s) : ".images/note", i = Bo();
  if (n === "session") throw new Error("\uC138\uC158 \uB178\uD2B8 \uC774\uBBF8\uC9C0 \uC790\uB974\uAE30\uB294 \uD3B8\uC9D1\uAE30\uC5D0\uC11C \uC9C4\uD589\uD574 \uC8FC\uC138\uC694.");
  if (n === "local") {
    if (!i.localRootHandle) throw new Error("\uB85C\uCEEC \uD3F4\uB354\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    return Na(i.localRootHandle, e, { imagePathPrefix: o });
  }
  if (n === "webdav") {
    const l = i.webdavConfig;
    if (!(l == null ? void 0 : l.endpoint) || !(l == null ? void 0 : l.username)) throw new Error("WebDAV\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
    const f = Oo(l), g = Ca(o), p = ((_a2 = crypto.randomUUID) == null ? void 0 : _a2.call(crypto)) ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    let x = e.type;
    (!x || x === "application/octet-stream") && (x = await Ea(e) || x);
    const w = Ta(x), y = `${g}${p}${w}`.replace(/\/+/g, "/").replace(/^\//, ""), b = new Uint8Array(await e.arrayBuffer());
    return await f.writeBytes(y, b, x || "application/octet-stream"), y;
  }
  const a = typeof i.getS3Client == "function" ? i.getS3Client() : null, u = (_b = i.s3Creds) == null ? void 0 : _b.bucket;
  if (!a || !u) throw new Error("S3 \uD074\uB77C\uC774\uC5B8\uD2B8\uB97C \uCD08\uAE30\uD654\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  return Pa(a, u, e, { imagePathPrefix: o });
}
const Xd = [{ id: "n", className: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize" }, { id: "s", className: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize" }, { id: "e", className: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-ew-resize" }, { id: "w", className: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize" }, { id: "ne", className: "right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize" }, { id: "nw", className: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize" }, { id: "se", className: "right-0 bottom-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize" }, { id: "sw", className: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize" }], yt = 2, ho = 3, Gd = 10, Yd = 500, Ud = 500, Vd = /* @__PURE__ */ new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);
function xo(e) {
  return Vd.has(e);
}
function ze(e, r, n) {
  return Math.min(n, Math.max(r, e));
}
function qd(e, r, n, s, o) {
  if (o == null ? void 0 : o.fromCenter) {
    const f = e.x + e.w / 2, g = e.y + e.h / 2;
    let p = 0, x = 0;
    r.includes("e") && (p += n), r.includes("w") && (p -= n), r.includes("s") && (x += s), r.includes("n") && (x -= s);
    const w = Math.max(yt, 2 * Math.min(f, 100 - f)), y = Math.max(yt, 2 * Math.min(g, 100 - g)), b = ze(e.w + 2 * p, yt, w), v = ze(e.h + 2 * x, yt, y);
    return { ...e, x: f - b / 2, y: g - v / 2, w: b, h: v };
  }
  let { x: i, y: a, w: u, h: l } = e;
  if (r.includes("e") && (u = ze(e.w + n, yt, 100 - e.x)), r.includes("s") && (l = ze(e.h + s, yt, 100 - e.y)), r.includes("w")) {
    const f = ze(e.w - n, yt, e.x + e.w), g = e.w - f;
    i = ze(e.x + g, 0, 100 - f), u = f;
  }
  if (r.includes("n")) {
    const f = ze(e.h - s, yt, e.y + e.h), g = e.h - f;
    a = ze(e.y + g, 0, 100 - f), l = f;
  }
  return { ...e, x: i, y: a, w: u, h: l };
}
function er(e, r, n) {
  return { ...e, elements: e.elements.map((s) => s.id === r ? n : s) };
}
function hr(e) {
  return e instanceof HTMLElement ? !!e.closest('textarea, input, [contenteditable="true"]') : false;
}
function Zd({ el: e, getPresignedUrl: r, onNaturalReady: n }) {
  const s = Cc(e.path, r);
  return s ? t.jsx("img", { src: s, alt: "", className: "pointer-events-none h-full w-full object-fill", draggable: false, onLoad: (o) => {
    const i = o.currentTarget;
    i.naturalWidth > 0 && i.naturalHeight > 0 && (n == null ? void 0 : n(i.naturalWidth / i.naturalHeight));
  } }) : t.jsx("div", { className: "flex h-full w-full items-center justify-center bg-neutral-100 text-[10px] text-neutral-400", children: "\uC774\uBBF8\uC9C0" });
}
function Jd({ el: e }) {
  return t.jsx("div", { className: "h-full w-full", style: ei(e, { strictClip: true }), children: e.text });
}
function Qd({ el: e, isEditing: r, onTextChange: n, onBlur: s }) {
  return r ? t.jsx("div", { className: "h-full w-full", style: Nc(e), "data-cover-shape": e.type, children: t.jsx("div", { style: Sc(e), children: t.jsx("textarea", { className: "min-h-[1.25em] w-full", style: jc(e), value: e.text ?? "", rows: Math.max(1, (e.text ?? "").split(/\r?\n/).length), autoFocus: true, onChange: (o) => n(o.target.value), onBlur: s, onPointerDown: (o) => o.stopPropagation() }) }) }) : t.jsx(kc, { el: e, strictClip: true });
}
const Qr = { w: 40, h: 25 };
function eu({ cover: e, selectedIds: r, onSelectIds: n, onChange: s, getPresignedUrl: o, currentFile: i = null, centerSnapEnabled: a = true, centerSnapTolerance: u = _o, objectSnapEnabled: l = false, onObjectSnapEnabledChange: f, objectSnapTolerance: g = Fo, textContainerOutlineEnabled: p = false, placePreviewEnabled: x = true, placeMode: w = null, onPlaceModeChange: y, onUndo: b, onRedo: v, className: j = "" }) {
  const { showToast: R } = Ra(), C = d.useRef(null), [E, $] = d.useState(null), [W, I] = d.useState(null), [_, U] = d.useState(null), [A, L] = d.useState(null), [Q, V] = d.useState(null), [re, ge] = d.useState({ v: [], h: [] }), [oe, ie] = d.useState(null), [he, D] = d.useState(null), X = $o(), [K, be] = d.useState(null), se = d.useRef(false);
  se.current = !!he;
  const [P, q] = d.useState(0), [ae, ee] = d.useState(false), Se = d.useRef(false), Ne = d.useRef(false), Ce = d.useRef(null);
  Se.current = P > 0 || Ne.current;
  const Pe = () => {
    Ce.current != null && (window.clearTimeout(Ce.current), Ce.current = null);
  }, He = () => {
    Pe(), Ne.current = false, q(0), ee(false);
  }, et = () => {
    Ne.current = true, q(0), Pe(), Ce.current = window.setTimeout(() => {
      Ce.current = null, Ne.current = false, q(2);
    }, 220);
  };
  d.useEffect(() => () => Pe(), []);
  const Te = d.useRef(null), H = d.useRef(e), de = d.useRef(r), me = d.useRef(w), at = d.useRef(a), Ae = d.useRef(u), tt = d.useRef(l), Y = d.useRef(g), qe = d.useRef(f), ht = d.useRef(false);
  H.current = e, de.current = r, me.current = w, at.current = a, Ae.current = u, tt.current = l, Y.current = g, qe.current = f;
  const Nt = d.useCallback((c) => H.current.elements.find((m) => m.id === c) ?? null, []), rt = d.useCallback((c) => {
    const m = Te.current;
    if (!m) return;
    if (m.kind === "marquee") {
      const ne = (c.clientX - m.originClientX) / m.frameW * 100, N = (c.clientY - m.originClientY) / m.frameH * 100, F = ze(m.startXPct + ne, 0, 100), te = ze(m.startYPct + N, 0, 100);
      Te.current = { ...m, curXPct: F, curYPct: te }, ie(us({ x: m.startXPct, y: m.startYPct, w: F - m.startXPct, h: te - m.startYPct }));
      return;
    }
    const k = (c.clientX - m.startX) / m.frameW * 100, T = (c.clientY - m.startY) / m.frameH * 100;
    if (m.kind === "move") {
      if (!m.moved && Math.hypot(c.clientX - m.startX, c.clientY - m.startY) >= ho) {
        m.moved = true;
        const ke = m.pendingShiftClick;
        ke && !ke.wasFullySelected && n([.../* @__PURE__ */ new Set([...ke.selectionAtDown, ...ke.targetIds])]);
      }
      if (!m.ids.length) return;
      if (m.pendingDuplicate) if (Math.hypot(c.clientX - m.startX, c.clientY - m.startY) >= ho) {
        const ke = Gc(H.current, m.ids);
        s(ke.cover), n(ke.newIds), m.ids = ke.newIds, m.origElements = ke.cover.elements.map((Je) => ({ ...Je })), m.pendingDuplicate = false;
      } else return;
      let ne = k, N = T;
      c.shiftKey && (Math.abs(ne) >= Math.abs(N) ? N = 0 : ne = 0);
      const F = { ...H.current, elements: m.origElements.map((xe) => ({ ...xe })) };
      let te = Vn(F, m.ids, ne, N);
      const we = at.current, Z = tt.current;
      if ((we || Z) && !c.shiftKey) {
        const xe = te.elements.filter((Je) => m.ids.includes(Je.id)), ke = un(xe);
        if (ke) {
          const Je = Z ? lo(te, m.ids) : [], $e = ed(ke, Je, { objectSnapEnabled: Z, frameCenterSnapEnabled: we, objectThresholdPx: Y.current, frameCenterThresholdPx: Ae.current, frameWidthPx: m.frameW, frameHeightPx: m.frameH }), qt = $e.x - ke.x, Hr = $e.y - ke.y;
          (qt !== 0 || Hr !== 0) && (te = Vn(te, m.ids, qt, Hr)), ge({ v: $e.verticalGuides, h: $e.horizontalGuides });
        }
      } else ge({ v: [], h: [] });
      s(te);
      return;
    }
    ge({ v: [], h: [] });
    const M = m.orig, B = c.shiftKey;
    let O = M.type === "image" ? ad(M, m.handle, k, T, m.frameW, m.frameH, { fromCenter: B }) : qd(M, m.handle, k, T, { fromCenter: B });
    const le = at.current, pe = tt.current;
    if ((le || pe) && !c.shiftKey) {
      const ne = pe ? lo(H.current, [m.id]) : [], N = rd({ x: O.x, y: O.y, w: O.w, h: O.h }, m.handle, ne, { objectSnapEnabled: pe, frameCenterSnapEnabled: le, objectThresholdPx: Y.current, frameCenterThresholdPx: Ae.current, frameWidthPx: m.frameW, frameHeightPx: m.frameH, minSizePct: yt });
      O = { ...O, x: N.x, y: N.y, w: N.w, h: N.h }, ge({ v: N.verticalGuides, h: N.horizontalGuides });
    }
    s(er(H.current, m.id, O));
  }, [s, n]), Le = d.useCallback((c) => {
    const m = Te.current;
    if ((m == null ? void 0 : m.kind) === "marquee") {
      const k = us({ x: m.startXPct, y: m.startYPct, w: m.curXPct - m.startXPct, h: m.curYPct - m.startYPct }), T = so(H.current.elements, k), M = fs(H.current, T);
      if (m.additive && M.length) {
        const B = new Set(de.current);
        M.forEach((O) => B.add(O)), n([...B]);
      } else n(M);
      ie(null);
    } else if ((m == null ? void 0 : m.kind) === "move" && m.pendingShiftClick && (c == null ? void 0 : c.type) === "pointerup") {
      const k = m.pendingShiftClick;
      if (!m.moved) if (k.wasFullySelected) {
        if (!k.selectionIsExactTarget && performance.now() - k.downAt < Ud) {
          const T = new Set(k.targetIds);
          n(k.selectionAtDown.filter((M) => !T.has(M)));
        }
      } else n([.../* @__PURE__ */ new Set([...k.selectionAtDown, ...k.targetIds])]);
    }
    Te.current = null, ge({ v: [], h: [] }), window.removeEventListener("pointermove", rt), window.removeEventListener("pointerup", Le), window.removeEventListener("pointercancel", Le);
  }, [rt, n]);
  d.useEffect(() => () => Le(), [Le]);
  const Oe = (c, m, k) => ({ xPct: ze((c - k.left) / k.width * 100, 0, 100), yPct: ze((m - k.top) / k.height * 100, 0, 100) }), De = (c, m, k, T) => ({ x: ze(c, 0, Math.max(0, 100 - k)), y: ze(m, 0, Math.max(0, 100 - T)), w: k, h: T }), xt = d.useCallback((c, m) => {
    const T = c > 1 ? c : 800, M = m > 1 ? m : 1100;
    return { w: ze(36 * 0.65 * 5 / T * 100, 6, 40), h: ze(36 * 1.4 / M * 100, 3, 20), fontSize: 36 };
  }, []), gt = d.useCallback((c, m, k) => k && k > 0 && c > 1 && m > 1 ? Ms(k, c, m, 50) : { w: 50, h: 35 }, []), ir = d.useCallback((c, m, k) => {
    var _a2, _b;
    const T = (_a2 = C.current) == null ? void 0 : _a2.getBoundingClientRect(), M = (T == null ? void 0 : T.width) ?? 0, B = (T == null ? void 0 : T.height) ?? 0, O = (k == null ? void 0 : k.text) ?? "\uC81C\uBAA9", le = (k == null ? void 0 : k.fontSize) ?? 36, pe = Math.max(1, O.split(/\r?\n/).length);
    let ne, N;
    if ((k == null ? void 0 : k.text) != null) {
      const we = Math.min(40, Math.max(5, ((_b = O.split(/\r?\n/)[0]) == null ? void 0 : _b.length) || 5));
      ne = ze(le * 0.65 * we / Math.max(1, M || 800) * 100, 8, 80), N = ze(le * 1.35 * pe / Math.max(1, B || 1100) * 100, 4, 40);
    } else {
      const we = xt(M, B);
      ne = we.w, N = we.h;
    }
    const F = De(c, m, ne, N), te = _n({ ...F, text: O, textAlign: "left", fontSize: le, ...(k == null ? void 0 : k.fontWeight) != null ? { fontWeight: k.fontWeight } : {} });
    s(Rr(H.current, te)), n([te.id]), (k == null ? void 0 : k.clearPlaceMode) !== false && (y == null ? void 0 : y(null));
  }, [s, y, n, xt]), ar = d.useCallback(async (c, m, k) => {
    var _a2;
    try {
      const T = await jr(c, i), M = (_a2 = C.current) == null ? void 0 : _a2.getBoundingClientRect(), B = gt((M == null ? void 0 : M.width) ?? 0, (M == null ? void 0 : M.height) ?? 0, Q);
      let O = Ma(T, De(m, k, B.w, B.h));
      if (M && M.width > 1 && M.height > 1) {
        const le = URL.createObjectURL(c);
        try {
          const pe = await new Promise((ne) => {
            const N = new Image();
            N.onload = () => {
              const F = N.naturalWidth || 0, te = N.naturalHeight || 0;
              ne(F > 0 && te > 0 ? F / te : null);
            }, N.onerror = () => ne(null), N.src = le;
          });
          pe && pe > 0 && (O = qn(O, pe, M.width, M.height, true), O = { ...O, x: ze(m, 0, Math.max(0, 100 - O.w)), y: ze(k, 0, Math.max(0, 100 - O.h)) });
        } finally {
          URL.revokeObjectURL(le);
        }
      }
      s(Rr(H.current, O)), n([O.id]);
    } catch (T) {
      console.error(T), window.alert(T instanceof Error ? T.message : "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [i, s, n, Q, gt]), lr = d.useCallback((c, m, k) => {
    const T = De(m, k, Qr.w, Qr.h), M = La(c, { ...T, text: "", textAlign: "center", textVAlign: "middle", fontSize: 24, color: "#0c4a6e", fontWeight: "bold", paddingPct: 2 });
    s(Rr(H.current, M)), n([M.id]), y == null ? void 0 : y(null);
  }, [s, y, n]);
  d.useEffect(() => {
    if ((w == null ? void 0 : w.kind) !== "image" || !w.files[0]) {
      V(null), L((M) => (M && URL.revokeObjectURL(M), null));
      return;
    }
    const c = w.files[0];
    let m = false;
    const k = URL.createObjectURL(c);
    L((M) => (M && URL.revokeObjectURL(M), k));
    const T = new Image();
    return T.onload = () => {
      if (m) return;
      const M = T.naturalWidth || 0, B = T.naturalHeight || 0;
      V(M > 0 && B > 0 ? M / B : null);
    }, T.onerror = () => {
      m || V(null);
    }, T.src = k, () => {
      m = true;
    };
  }, [w]), d.useEffect(() => {
    x || U(null);
  }, [x]), d.useEffect(() => {
    if (!w) {
      I(null), U(null);
      return;
    }
    const c = (m) => {
      var _a2;
      if (I({ x: m.clientX, y: m.clientY }), !x) {
        U(null);
        return;
      }
      const k = (_a2 = C.current) == null ? void 0 : _a2.getBoundingClientRect();
      if (!k || k.width < 1 || k.height < 1) {
        U(null);
        return;
      }
      const { xPct: T, yPct: M } = Oe(m.clientX, m.clientY, k);
      if (w.kind === "text") {
        const O = xt(k.width, k.height);
        U(De(T, M, O.w, O.h));
        return;
      }
      if (w.kind === "shape") {
        U(De(T, M, Qr.w, Qr.h));
        return;
      }
      const B = gt(k.width, k.height, Q);
      U(De(T, M, B.w, B.h));
    };
    return window.addEventListener("pointermove", c, { passive: true }), () => window.removeEventListener("pointermove", c);
  }, [w, x, Q, gt, xt]);
  const cr = (c) => {
    if (c.button !== 0) return;
    const m = C.current;
    if (!m) return;
    const k = m.getBoundingClientRect();
    if (k.width < 1 || k.height < 1) return;
    c.preventDefault(), $(null);
    const T = c.metaKey || c.ctrlKey;
    T || n([]);
    const { xPct: M, yPct: B } = Oe(c.clientX, c.clientY, k);
    Te.current = { kind: "marquee", startXPct: M, startYPct: B, curXPct: M, curYPct: B, additive: T, frameW: k.width, frameH: k.height, originClientX: c.clientX, originClientY: c.clientY }, ie({ x: M, y: B, w: 0, h: 0 }), window.addEventListener("pointermove", rt), window.addEventListener("pointerup", Le), window.addEventListener("pointercancel", Le);
  }, Ct = (c) => {
    if (c.button === 0) {
      if (w) {
        const m = C.current;
        if (!m) return;
        const k = m.getBoundingClientRect();
        if (k.width < 1 || k.height < 1) return;
        c.preventDefault(), c.stopPropagation();
        const { xPct: T, yPct: M } = Oe(c.clientX, c.clientY, k);
        if (w.kind === "text") {
          ir(T, M);
          return;
        }
        if (w.kind === "shape") {
          lr(w.shapeType, T, M);
          return;
        }
        const [B, ...O] = w.files;
        if (!B) {
          y == null ? void 0 : y(null);
          return;
        }
        (async () => (await ar(B, T, M), y == null ? void 0 : y(O.length ? { kind: "image", files: O } : null)))();
        return;
      }
      cr(c);
    }
  }, Sr = (c, m) => {
    if (m.button !== 0) return;
    const k = C.current, T = Nt(c);
    if (!k || !T) return;
    const M = k.getBoundingClientRect();
    if (M.width < 1 || M.height < 1) return;
    m.preventDefault(), m.stopPropagation();
    const B = m.metaKey || m.ctrlKey, O = m.altKey, le = m.shiftKey, pe = le && !B && !O, ne = (B || le) && !O, N = ne ? Xc(H.current, c, de.current) : Wc(H.current, c, de.current), F = de.current, te = N.length > 0 && N.every(($e) => F.includes($e)), we = te && F.length === N.length && N.every(($e) => F.includes($e));
    let Z = F, xe;
    if (pe) xe = { downAt: performance.now(), targetIds: N, wasFullySelected: te, selectionIsExactTarget: we, selectionAtDown: [...F] }, te ? Z = F : Z = [.../* @__PURE__ */ new Set([...F, ...N])];
    else if (ne) if (te) if (we) Z = N;
    else {
      const $e = new Set(N);
      Z = F.filter((qt) => !$e.has(qt)), n(Z);
      return;
    }
    else Z = [.../* @__PURE__ */ new Set([...F, ...N])], n(Z);
    else te ? Z = F : (Z = N, n(Z));
    const ke = Br(H.current, Z);
    if (!ke.length && !xe) return;
    const Je = O || B && te;
    Te.current = { kind: "move", ids: ke, startX: m.clientX, startY: m.clientY, origElements: H.current.elements.map(($e) => ({ ...$e })), frameW: M.width, frameH: M.height, moved: false, ...Je ? { pendingDuplicate: true } : {}, ...xe ? { pendingShiftClick: xe } : {} }, window.addEventListener("pointermove", rt), window.addEventListener("pointerup", Le), window.addEventListener("pointercancel", Le);
  }, Ge = (c, m, k) => {
    const T = C.current, M = Nt(c);
    if (!T || !M || sr(H.current, M)) return;
    const B = T.getBoundingClientRect();
    B.width < 1 || B.height < 1 || (m.preventDefault(), m.stopPropagation(), n([c]), Te.current = { kind: "resize", id: c, handle: k, startX: m.clientX, startY: m.clientY, orig: { ...M }, frameW: B.width, frameH: B.height }, window.addEventListener("pointermove", rt), window.addEventListener("pointerup", Le), window.addEventListener("pointercancel", Le));
  }, lt = d.useCallback((c, m) => {
    var _a2;
    const k = H.current.elements.find((ne) => ne.id === c);
    if (!k || k.type !== "image") return;
    const T = !(k.naturalAspect && k.naturalAspect > 0), M = T;
    if (!T && !M) return;
    const B = (_a2 = C.current) == null ? void 0 : _a2.getBoundingClientRect(), O = (B == null ? void 0 : B.width) ?? 1, le = (B == null ? void 0 : B.height) ?? 1, pe = qn(k, m, O, le, M);
    pe.naturalAspect === k.naturalAspect && pe.w === k.w && pe.h === k.h && pe.x === k.x && pe.y === k.y || s(er(H.current, c, pe));
  }, [s]), dr = d.useCallback((c) => {
    const m = H.current.elements.find((T) => T.id === c);
    if (!m || m.type !== "image") return;
    const k = { ...m };
    m.lockAspect ? delete k.lockAspect : k.lockAspect = true, s(er(H.current, c, k));
  }, [s]), ct = d.useCallback((c) => {
    var _a2;
    const m = H.current.elements.find((T) => T.id === c);
    if (!m || m.type !== "image") return;
    const k = (_a2 = C.current) == null ? void 0 : _a2.getBoundingClientRect();
    !k || k.width < 1 || k.height < 1 || s(er(H.current, c, od(m, k.width, k.height)));
  }, [s]), Ze = d.useCallback((c) => {
    if (!c.length) return;
    de.current = c, n(c);
    const m = an(H.current, c);
    Pe(), Ne.current = false, ee(m), q(1);
  }, [n]), ur = d.useCallback(async (c) => {
    if (n([c.id]), typeof o != "function") {
      window.alert("\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    try {
      const m = await za(c.path, o) || "";
      if (!m) {
        window.alert("\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      D({ id: c.id, path: c.path, imageSrc: m });
    } catch (m) {
      console.error(m), window.alert(m instanceof Error ? m.message : "\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    }
  }, [o, n]), Nr = d.useCallback(async (c, m) => {
    var _a2;
    if (!he) return;
    const k = await jr(c, i), T = H.current.elements.find((ne) => ne.id === he.id);
    if (!T || T.type !== "image") {
      D(null);
      return;
    }
    const M = m.width / Math.max(1, m.height), B = (_a2 = C.current) == null ? void 0 : _a2.getBoundingClientRect(), O = (B == null ? void 0 : B.width) ?? 1, le = (B == null ? void 0 : B.height) ?? 1, pe = qn({ ...T, path: k }, M, O, le, true);
    s(er(H.current, he.id, pe)), D(null);
  }, [he, i, s]);
  d.useEffect(() => {
    const c = C.current;
    if (!c) return;
    const m = (k) => {
      const T = k;
      T.ctrlKey && (T.preventDefault(), T.stopPropagation());
    };
    return c.addEventListener("contextmenu", m), () => c.removeEventListener("contextmenu", m);
  }, []), d.useEffect(() => {
    const c = (m) => {
      var _a2;
      if (hr(m.target) || ht.current) return;
      const k = ro(m.clipboardData), T = Gs(m.clipboardData);
      let M = String(((_a2 = m.clipboardData) == null ? void 0 : _a2.getData("text/plain")) ?? "").trim();
      !k.length && !M && !T || (m.preventDefault(), m.stopPropagation(), (async () => {
        ht.current = true;
        try {
          let B = H.current, O = null;
          const le = [];
          let pe = false;
          for (const N of k) if (Vr(N)) try {
            le.push(await qr(N)), pe = true;
          } catch (F) {
            console.error(F), window.alert(F instanceof Error ? F.message : "SVG\uB97C PNG\uB85C \uBCC0\uD658\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
          }
          else le.push(N);
          const ne = k.some(Vr);
          if (T && !ne) try {
            le.push(await qr(T)), pe = true;
          } catch (N) {
            console.error(N), window.alert(N instanceof Error ? N.message : "SVG\uB97C PNG\uB85C \uBCC0\uD658\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
          }
          if (pe && (Ys(M) || !M) && (M = ""), le.length && (y == null ? void 0 : y({ kind: "image", files: le })), M) {
            const N = eo(B.elements.length), F = M.split(/\r?\n/).length, te = _n({ text: M, x: N.x, y: N.y, w: 64, h: Math.min(40, Math.max(10, F * 4 + 4)), fontSize: le.length ? 24 : 28, fontWeight: "normal", textAlign: "left" });
            B = Rr(B, te), O = te.id;
          }
          B !== H.current && (s(B), O && n([O]));
        } finally {
          ht.current = false;
        }
      })());
    };
    return window.addEventListener("paste", c), () => window.removeEventListener("paste", c);
  }, [i, s, y, n]), d.useEffect(() => {
    const c = { current: false }, m = (O) => {
      var _a2, _b, _c2;
      return O ? !!(((_a2 = O.types) == null ? void 0 : _a2.includes("Files")) || ((_b = O.types) == null ? void 0 : _b.includes("text/plain")) || ((_c2 = O.files) == null ? void 0 : _c2.length)) : false;
    }, k = async (O) => {
      let le = String(O.getData("text/plain") ?? "").trim();
      const pe = Array.from(O.files || []);
      for (const ne of pe) if (!ne.type.startsWith("image/") && (ne.type.startsWith("text/") || /\.(txt|md|markdown|csv|json)$/i.test(ne.name))) try {
        const N = (await ne.text()).trim();
        N && (le = N);
      } catch {
      }
      return le;
    }, T = async (O, le, pe) => {
      const ne = [];
      let N = false, F = pe;
      for (const we of O) if (Vr(we)) try {
        ne.push(await qr(we)), N = true;
      } catch (Z) {
        console.error(Z), window.alert(Z instanceof Error ? Z.message : "SVG\uB97C PNG\uB85C \uBCC0\uD658\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      }
      else ne.push(we);
      const te = O.some(Vr);
      if (le && !te) try {
        ne.push(await qr(le)), N = true;
      } catch (we) {
        console.error(we), window.alert(we instanceof Error ? we.message : "SVG\uB97C PNG\uB85C \uBCC0\uD658\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      }
      return N && (Ys(F) || !F) && (F = ""), { files: ne, text: F };
    }, M = (O) => {
      m(O.dataTransfer) && (hr(O.target) || (O.preventDefault(), O.dataTransfer && (O.dataTransfer.dropEffect = "copy")));
    }, B = (O) => {
      if (!O.dataTransfer || hr(O.target) || !m(O.dataTransfer) || c.current || ht.current) return;
      O.preventDefault(), O.stopPropagation();
      const le = ro(O.dataTransfer), pe = Gs(O.dataTransfer);
      (async () => {
        c.current = true;
        try {
          let ne = await k(O.dataTransfer);
          const N = await T(le, pe, ne);
          ne = N.text;
          const F = N.files;
          if (!F.length && !ne) return;
          if (F.length && (y == null ? void 0 : y({ kind: "image", files: F })), ne) {
            const te = eo(H.current.elements.length), we = ne.split(/\r?\n/).length, Z = _n({ text: ne, x: te.x, y: te.y, w: 64, h: Math.min(40, Math.max(10, we * 4 + 4)), fontSize: F.length ? 24 : 28, fontWeight: "normal", textAlign: "left" });
            s(Rr(H.current, Z)), F.length || n([Z.id]);
          }
        } finally {
          c.current = false;
        }
      })();
    };
    return window.addEventListener("dragover", M), window.addEventListener("drop", B), () => {
      window.removeEventListener("dragover", M), window.removeEventListener("drop", B);
    };
  }, [s, y, n]), d.useEffect(() => {
    const c = () => {
      const N = de.current;
      N.length && (s(ps(H.current, N)), n([]));
    }, m = () => {
      const N = de.current;
      if (!N.length) return;
      const F = an(H.current, N);
      Pe(), Ne.current = false, ee(F), q(1);
    }, k = /* @__PURE__ */ new Set();
    let T = null;
    const M = (N) => Gd * Ac({ altKey: N.altKey, shiftKey: N.shiftKey, ctrlKey: N.ctrlKey, metaKey: N.metaKey }), B = (N) => {
      var _a2;
      const F = Br(H.current, de.current);
      if (!F.length || E) return;
      const te = (_a2 = C.current) == null ? void 0 : _a2.getBoundingClientRect();
      if (!te || te.width < 1 || te.height < 1) return;
      const we = M(N);
      let Z = 0, xe = 0;
      if (k.has("ArrowLeft") && (Z -= we), k.has("ArrowRight") && (Z += we), k.has("ArrowUp") && (xe -= we), k.has("ArrowDown") && (xe += we), Z === 0 && xe === 0) return;
      const ke = Z / te.width * 100, Je = xe / te.height * 100;
      s(Vn(H.current, F, ke, Je));
    }, O = () => {
      k.clear(), T = null;
    }, le = (N) => {
      var _a2;
      const F = N.metaKey || N.ctrlKey;
      if (N.key === "Tab" && N.shiftKey && !F && !N.altKey && !N.repeat) {
        if (hr(N.target)) return;
        N.preventDefault(), N.stopPropagation();
        const Z = !tt.current;
        tt.current = Z, (_a2 = qe.current) == null ? void 0 : _a2.call(qe, Z), R(Z ? "\uAC1C\uCCB4 \uC2A4\uB0C5 \uCF1C\uC9D0" : "\uAC1C\uCCB4 \uC2A4\uB0C5 \uAEBC\uC9D0");
        return;
      }
      if (N.key === "Escape") {
        if (Se.current) return;
        if (me.current) {
          N.preventDefault(), N.stopPropagation(), y == null ? void 0 : y(null);
          return;
        }
        if (E) {
          N.preventDefault(), N.stopPropagation(), $(null), document.activeElement instanceof HTMLElement && document.activeElement.blur();
          return;
        }
        if (hr(N.target) || !de.current.length) return;
        N.preventDefault(), N.stopPropagation(), n([]);
        return;
      }
      if (F && N.shiftKey && !N.altKey) {
        const { code: Z, key: xe } = N, ke = Z === "Comma" || xe === "<" || xe === ",";
        if (ke || (Z === "Period" || xe === ">" || xe === ".")) {
          if (!de.current.length) return;
          N.preventDefault(), N.stopPropagation();
          const $e = hs(H.current, de.current, ke ? -1 : 1);
          $e !== H.current && s($e);
          return;
        }
      }
      if (N.altKey && !F && !N.shiftKey && !N.repeat) {
        const xe = { KeyL: "left", KeyM: "center", KeyE: "center", KeyR: "right" }[N.code];
        if (xe) {
          if (!de.current.length) return;
          N.preventDefault(), N.stopPropagation();
          const ke = ln(H.current, de.current, xe);
          ke !== H.current && s(ke);
          return;
        }
      }
      if (hr(N.target)) return;
      if (xo(N.key)) {
        if (!de.current.length || E || Te.current) return;
        N.preventDefault(), N.stopPropagation();
        const Z = performance.now(), xe = k.has(N.key);
        if (k.add(N.key), T == null) {
          T = Z, B(N);
          return;
        }
        if (!xe && !N.repeat) {
          B(N);
          return;
        }
        if (Z - T < Yd) return;
        B(N);
        return;
      }
      if (!N.metaKey && !N.ctrlKey && !N.altKey && (N.key === "Backspace" || N.key === "Delete")) {
        if (!de.current.length || Se.current) return;
        N.preventDefault(), N.stopPropagation();
        const Z = an(H.current, de.current);
        if (N.key === "Backspace" || Z) {
          m();
          return;
        }
        c();
        return;
      }
      if (!N.metaKey && !N.ctrlKey && !N.altKey && !N.shiftKey && !N.repeat) {
        const Z = N.key.toLowerCase();
        if (Z === "t" || Z === "m" || Z === "o") {
          if (E || Se.current) return;
          N.preventDefault(), N.stopPropagation();
          const xe = me.current;
          if (Z === "t") {
            y == null ? void 0 : y((xe == null ? void 0 : xe.kind) === "text" ? null : { kind: "text" });
            return;
          }
          if (Z === "m") {
            y == null ? void 0 : y((xe == null ? void 0 : xe.kind) === "shape" && xe.shapeType === "rect" ? null : { kind: "shape", shapeType: "rect" });
            return;
          }
          y == null ? void 0 : y((xe == null ? void 0 : xe.kind) === "shape" && xe.shapeType === "ellipse" ? null : { kind: "shape", shapeType: "ellipse" });
          return;
        }
      }
      if (!F || N.altKey) return;
      const te = N.key.toLowerCase();
      if (se.current && (te === "z" || te === "y")) return;
      if (te === "z" && N.shiftKey) {
        N.preventDefault(), N.stopPropagation(), v == null ? void 0 : v();
        return;
      }
      if (te === "y") {
        N.preventDefault(), N.stopPropagation(), v == null ? void 0 : v();
        return;
      }
      if (te === "z") {
        N.preventDefault(), N.stopPropagation(), b == null ? void 0 : b();
        return;
      }
      if (te !== "g") return;
      if (N.preventDefault(), N.stopPropagation(), N.shiftKey) {
        const Z = Hc(H.current, de.current);
        if (!Z) return;
        s(Pn(H.current, Z));
        return;
      }
      const we = En(H.current, de.current);
      we && (s(we.cover), n(Me(we.cover, we.groupId)));
    }, pe = (N) => {
      xo(N.key) && (k.delete(N.key), k.size === 0 && (T = null));
    }, ne = () => {
      O();
    };
    return window.addEventListener("keydown", le), window.addEventListener("keyup", pe), window.addEventListener("blur", ne), () => {
      window.removeEventListener("keydown", le), window.removeEventListener("keyup", pe), window.removeEventListener("blur", ne);
    };
  }, [E, s, n, b, v, y, R]);
  const Cr = new Set(r), Ye = r.length === 1 ? Nt(r[0]) : null, bt = d.useMemo(() => {
    const c = Ve(e, r), m = [], k = /* @__PURE__ */ new Set();
    for (const T of c) {
      if (!_e(e, T)) continue;
      const M = Me(e, T);
      if (!M.length) continue;
      const B = un(Fc(e, M));
      if (B) {
        m.push({ id: T, bounds: B });
        for (const O of M) k.add(O);
      }
    }
    return { outlines: m, memberIds: k };
  }, [e, r]), We = d.useMemo(() => !oe || oe.w < 0.05 && oe.h < 0.05 ? /* @__PURE__ */ new Set() : new Set(so(e.elements, oe)), [e.elements, oe]), nt = (c, m, k) => {
    const T = sr(e, c), M = bt.memberIds.has(c.id), B = ["absolute", "box-border"];
    return T && m ? B.push("ring-2", "ring-yellow-400", "ring-offset-0") : m && M ? B.push("ring-2", "ring-blue-300", "ring-offset-0") : m ? B.push("ring-2", "ring-blue-500", "ring-offset-0") : k ? B.push("outline", "outline-2", "outline-dashed", "outline-blue-500", "-outline-offset-1") : B.push("hover:ring-1", "hover:ring-blue-300"), p && c.type === "text" && B.push("shadow-[inset_0_0_0_1px_rgba(248,113,113,0.7)]"), B.join(" ");
  };
  return t.jsxs(on, { cover: e, getPresignedUrl: o, showFrameOutline: true, renderElements: false, className: `shadow-[0_8px_28px_rgba(15,23,42,0.12)] print:shadow-none ${j}`, children: [t.jsxs("div", { ref: C, className: `absolute inset-0 ${w ? "cursor-crosshair" : ""}`, tabIndex: 0, role: "application", "aria-label": "\uD45C\uC9C0 \uD3B8\uC9D1 \uCE94\uBC84\uC2A4", onPointerDown: (c) => {
    Ct(c);
  }, children: [re.v.map((c) => t.jsx("div", { className: "pointer-events-none absolute top-0 bottom-0 z-40 w-px bg-pink-500/80", style: { left: `${c}%` }, "aria-hidden": true }, `snap-v-${c}`)), re.h.map((c) => t.jsx("div", { className: "pointer-events-none absolute left-0 right-0 z-40 h-px bg-pink-500/80", style: { top: `${c}%` }, "aria-hidden": true }, `snap-h-${c}`)), oe && (oe.w > 0.05 || oe.h > 0.05) ? t.jsx("div", { className: "pointer-events-none absolute z-50 border border-dashed border-blue-500 bg-blue-500/10", style: { left: `${oe.x}%`, top: `${oe.y}%`, width: `${oe.w}%`, height: `${oe.h}%` }, "aria-hidden": true }) : null, bt.outlines.map(({ id: c, bounds: m }) => t.jsx("div", { className: "pointer-events-none absolute z-40 border-2 border-blue-500", style: { left: `${m.x}%`, top: `${m.y}%`, width: `${m.w}%`, height: `${m.h}%` }, "aria-hidden": true }, `group-sel-${c}`)), w && x && _ ? t.jsx("div", { className: "pointer-events-none absolute z-45 overflow-hidden rounded-sm border border-dashed border-blue-500 bg-blue-500/15", style: { left: `${_.x}%`, top: `${_.y}%`, width: `${_.w}%`, height: `${_.h}%` }, "aria-hidden": true, children: w.kind === "text" ? t.jsx("div", { className: "flex h-full w-full items-start justify-start px-0.5 text-left font-bold text-gray-800/40 dark:text-white/35", style: { fontSize: 36, lineHeight: 1.25 }, children: "\uC81C\uBAA9" }) : w.kind === "shape" ? t.jsx("div", { className: "h-full w-full border border-blue-500/50 bg-sky-200/40", style: { borderRadius: w.shapeType === "ellipse" ? "50%" : w.shapeType === "roundRect" ? "8%" : 0 } }) : A ? t.jsx("img", { src: A, alt: "", className: "h-full w-full object-fill opacity-45", draggable: false }) : t.jsx("div", { className: "h-full w-full bg-blue-400/20" }) }) : null, e.elements.map((c, m) => {
    const k = Cr.has(c.id), T = We.has(c.id), M = sr(e, c), B = !M && (c.type === "text" || kr(c)), O = B && c.id === E, le = k && r.length === 1 && !O && !M, pe = nt(c, k, T), ne = t.jsxs(t.Fragment, { children: [O && c.type === "text" ? t.jsx("textarea", { className: "h-full w-full resize-none border-0 bg-transparent p-0 outline-none", style: ei(c), value: c.text, autoFocus: true, onChange: (F) => {
      s(er(H.current, c.id, { ...c, text: F.target.value }));
    }, onBlur: () => $(null), onPointerDown: (F) => F.stopPropagation() }) : c.type === "text" ? t.jsx(Jd, { el: c }) : kr(c) ? t.jsx(Qd, { el: c, isEditing: O, onTextChange: (F) => {
      s(er(H.current, c.id, { ...c, text: F }));
    }, onBlur: () => $(null) }) : t.jsx(Zd, { el: c, getPresignedUrl: o, onNaturalReady: (F) => lt(c.id, F) }), le ? Xd.map((F) => t.jsx("div", { className: `absolute z-30 h-2.5 w-2.5 rounded-sm border border-white bg-blue-500 ${F.className}`, onPointerDown: (te) => {
      if (w) {
        Ct(te);
        return;
      }
      Ge(c.id, te, F.id);
    } }, F.id)) : null] }), N = t.jsx("div", { "data-cover-el": c.id, "data-cover-locked": M ? "1" : void 0, className: pe, style: { left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%`, height: `${c.h}%`, zIndex: k || T ? 20 + m : 10 + m, cursor: O ? "text" : M ? "default" : "move" }, onContextMenu: (F) => {
      de.current.includes(c.id) || (de.current = [c.id], n([c.id])), X && (F.preventDefault(), be(c.id));
    }, onPointerDown: (F) => {
      if (w) {
        Ct(F);
        return;
      }
      if (O) {
        F.stopPropagation();
        return;
      }
      Sr(c.id, F);
    }, onDoubleClick: (F) => {
      if (F.preventDefault(), F.stopPropagation(), w) return;
      const te = Kc(H.current, c.id, de.current);
      te.ids.length && (n(te.ids), te.enterEdit && B && $(c.id));
    }, children: ne });
    return X ? t.jsx("div", { children: N }, c.id) : t.jsxs(xc, { children: [t.jsx(gc, { asChild: true, children: N }), t.jsx(bc, { children: t.jsx(Kd, { cover: e, targetId: c.id, selectedIds: r, onChange: s, onSelectIds: n, onRequestDelete: Ze, onImageCrop: (F) => {
      ur(F);
    }, onRestoreImageAspect: ct, onToggleImageLockAspect: dr }) })] }, c.id);
  })] }), X && K ? t.jsx(Ho, { open: !!K, onOpenChange: (c) => {
    c || be(null);
  }, title: (() => {
    const c = e.elements.find((m) => m.id === K);
    return c ? $r(c) : "\uCEE4\uBC84 \uC694\uC18C";
  })(), subtitle: "\uCEE4\uBC84 \uCE94\uBC84\uC2A4", bodyClassName: "p-0", children: t.jsx(Do, { surface: "mobile", children: t.jsx("div", { className: "p-2", children: t.jsx(yi, { cover: e, targetId: K, selectedIds: r, onChange: s, onSelectIds: n, onRequestDelete: (c) => {
    Ze(c), be(null);
  }, onImageCrop: (c) => {
    be(null), ur(c);
  }, onRestoreImageAspect: ct, onToggleImageLockAspect: dr }) }) }) }) : null, Ye ? t.jsxs("span", { className: "sr-only", children: ["Selected ", Ye.type, " ", Ye.id] }) : r.length > 1 ? t.jsxs("span", { className: "sr-only", children: ["Selected ", r.length, " layers"] }) : null, t.jsx(Io, { isOpen: !!he, onClose: () => D(null), contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: he ? t.jsx(Ic, { imageSrc: he.imageSrc, fileName: he.path, onCancel: () => D(null), onConfirm: Nr }) : null }), t.jsx(vr, { isOpen: P > 0, title: P === 2 ? "\uC7A0\uAE34 \uAC1C\uCCB4 \uC0AD\uC81C" : "\uAC1C\uCCB4 \uC0AD\uC81C", message: P === 2 ? "\uC7A0\uAE34 \uAC1C\uCCB4\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uC815\uB9D0 \uC0AD\uC81C\uD560\uAE4C\uC694?" : "\uC120\uD0DD\uD55C \uAC1C\uCCB4\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694?", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", variant: "danger", onConfirm: () => {
    if (ae && P === 1) {
      et();
      return;
    }
    const c = de.current;
    He(), c.length && (s(ps(H.current, c)), n([]));
  }, onCancel: He }, `cover-delete-confirm-${P}`), w && W ? rs.createPortal(t.jsx("div", { className: "pointer-events-none fixed z-[100001] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", style: x ? { left: W.x + 14, top: W.y - 8, transform: "translateY(-100%)" } : { left: W.x + 14, top: W.y + 18 }, children: "\uD074\uB9AD\uD574\uC11C \uC0BD\uC785\uD558\uAE30" }), document.body) : null] });
}
function br({ children: e, className: r = "" }) {
  return t.jsx("kbd", { className: ["inline-flex shrink-0 min-w-7 items-center justify-center whitespace-nowrap rounded-md border border-b-2 border-gray-300 bg-linear-to-b from-white to-gray-100 px-2 py-1 font-mono text-xs font-semibold leading-none text-ink shadow-[0_1px_0_rgba(15,23,42,0.06)] dark:border-odp-borderStrong dark:from-odp-surface dark:to-odp-bgSoft dark:text-odp-fgStrong", r].filter(Boolean).join(" "), children: e });
}
function Ke({ keys: e, className: r = "" }) {
  return t.jsx("span", { className: `inline-flex max-w-full flex-wrap items-center gap-x-0.5 gap-y-1 ${r}`, children: e.map((n, s) => t.jsxs("span", { className: "inline-flex shrink-0 items-center gap-0.5", children: [s > 0 ? t.jsx("span", { className: "px-0.5 text-xs text-gray-400 dark:text-odp-muted", "aria-hidden": true, children: "+" }) : null, t.jsx(br, { children: n })] }, s)) });
}
function vi() {
  if (typeof navigator > "u") return false;
  const e = navigator.platform || "", r = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(r);
}
function tu() {
  return vi() ? "\u2318" : "Ctrl";
}
function ru() {
  return vi() ? "\u2325" : "Alt";
}
const Dr = "__cover-layer-root__", ki = "flex w-full items-center gap-1 rounded px-1.5 py-1 text-left text-[11px] hover:bg-gray-100 dark:hover:bg-odp-focusBg", xs = "bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-200", nu = "z-[10060] min-w-[160px] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-[11px] text-gray-800 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", Tt = "flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-gray-100 dark:data-highlighted:bg-odp-focusBg", su = (e) => {
  const r = Wa(e);
  return r.length > 0 ? r : Ka(e);
};
function go(e, r, n, s) {
  if (e === Dr) return "after";
  if (!n || s == null) return r ? "inside" : "before";
  const o = (s - n.top) / Math.max(1, n.height);
  return r ? o < 0.28 ? "before" : o > 0.72 ? "after" : "inside" : o < 0.5 ? "before" : "after";
}
function ou(e) {
  return e.type === "text" ? t.jsx(nn, { size: 12, className: "shrink-0 opacity-70", "aria-hidden": true }) : kr(e) ? t.jsx(sn, { size: 12, className: "shrink-0 opacity-70", "aria-hidden": true }) : t.jsx(Jo, { size: 12, className: "shrink-0 opacity-70", "aria-hidden": true });
}
function bo({ displayValue: e, editValue: r, placeholder: n, isEditing: s, className: o, onStartEdit: i, onCommit: a, onCancel: u }) {
  const [l, f] = d.useState(r), g = d.useRef(r), p = d.useRef(null), x = d.useRef(false);
  if (d.useEffect(() => {
    if (!s) return;
    x.current = false, g.current = r, f(r);
    const v = window.requestAnimationFrame(() => {
      const j = p.current;
      j && (j.focus(), j.select());
    });
    return () => window.cancelAnimationFrame(v);
  }, [s]), !s) return t.jsx("span", { className: o, onDoubleClick: (v) => {
    v.stopPropagation(), v.preventDefault(), i();
  }, children: e });
  const w = () => {
    x.current || (x.current = true, a(g.current));
  }, y = () => {
    x.current || (x.current = true, u());
  }, b = (v) => {
    if (v.key === "Enter") {
      v.preventDefault(), v.stopPropagation(), w();
      return;
    }
    v.key === "Escape" && (v.preventDefault(), v.stopPropagation(), y());
  };
  return t.jsx("input", { ref: p, className: "min-w-0 flex-1 rounded border border-blue-400 bg-white px-1 py-0 text-[11px] text-gray-900 outline-none select-text placeholder:text-gray-400 dark:border-blue-500 dark:bg-odp-bg dark:text-odp-fgStrong dark:placeholder:text-gray-500", value: l, placeholder: n, "aria-label": "\uB808\uC774\uC5B4 \uC774\uB984", onChange: (v) => {
    g.current = v.target.value, f(v.target.value);
  }, onBlur: w, onKeyDown: b, onClick: (v) => v.stopPropagation(), onPointerDown: (v) => v.stopPropagation(), onDoubleClick: (v) => v.stopPropagation() });
}
function iu({ children: e, cover: r, targetId: n, kind: s, selectedIds: o, onChange: i, onSelectIds: a, onRequestDeleteLayers: u, onStartRename: l }) {
  var _a2, _b;
  const f = Fe(r), g = s === "group" ? Me(f, n) : [n], p = s === "group" ? g.length ? g : [] : o.includes(n) ? o : [n], x = s === "group" ? n : ((_a2 = f.elements.find((R) => R.id === n)) == null ? void 0 : _a2.groupId) ?? null, w = (() => {
    if (s !== "element" || p.length < 1) return false;
    const R = Ve(f, p);
    return !(R.length === 1 && _e(f, R[0]));
  })(), y = !!x, b = _r(r, n), v = s === "group" ? ((_b = St(f, n)) == null ? void 0 : _b.name) ?? "\uADF8\uB8F9" : (() => {
    const R = f.elements.find((C) => C.id === n);
    return R ? $r(R) : "\uB808\uC774\uC5B4";
  })(), j = s === "group" ? "\uB808\uC774\uC5B4 \uADF8\uB8F9" : "\uB808\uC774\uC5B4";
  return t.jsxs(Ua, { title: v, subtitle: j, contentClassName: nu, trigger: e, children: [t.jsxs(Ie, { className: Tt, onSelect: () => {
    window.setTimeout(() => l(n), 0);
  }, children: [t.jsx(Ql, { size: 14 }), "\uC774\uB984 \uBCC0\uACBD"] }), t.jsxs(Ie, { className: Tt, onSelect: () => i(ii(r, n)), children: [b ? t.jsx(js, { size: 14 }) : t.jsx(Ss, { size: 14 }), b ? "\uC7A0\uAE08 \uD574\uC81C" : "\uC7A0\uAE08"] }), t.jsx(tn, {}), t.jsxs(Ie, { className: Tt, disabled: !w, onSelect: () => {
    const R = En(r, p);
    R && (i(R.cover), a(Me(R.cover, R.groupId)));
  }, children: [t.jsx(Cs, { size: 14 }), "\uADF8\uB8F9"] }), t.jsxs(Ie, { className: Tt, disabled: !y, onSelect: () => {
    x && i(Pn(r, x));
  }, children: [t.jsx(Ns, { size: 14 }), "\uADF8\uB8F9 \uD574\uC81C"] }), t.jsxs(Ie, { className: Tt, onSelect: () => {
    const R = ys(r);
    i(R.cover);
  }, children: [t.jsx(Qo, { size: 14 }), "\uC0C8 \uADF8\uB8F9"] }), t.jsx(tn, {}), t.jsxs(Ie, { className: Tt, disabled: s === "group" ? false : p.length === 0, onSelect: () => {
    if (s === "group") {
      i(Lo(r, [n]));
      return;
    }
    i(Ts(r, p));
  }, children: [t.jsx(Es, { size: 14 }), "\uB9E8 \uC55E\uC73C\uB85C"] }), t.jsxs(Ie, { className: Tt, onSelect: () => {
    if (s === "group") {
      i(zo(r, [n]));
      return;
    }
    i(Rs(r, p));
  }, children: [t.jsx(Ps, { size: 14 }), "\uB9E8 \uB4A4\uB85C"] }), t.jsx(tn, {}), t.jsxs(Ie, { className: `${Tt} text-red-600 dark:text-red-400`, danger: true, onSelect: () => {
    const R = s === "group" ? [n] : p;
    if (u) {
      u(R);
      return;
    }
    i(s === "group" ? bn(r, [n]) : au(r, p)), a([]);
  }, children: [t.jsx(wn, { size: 14 }), "\uC0AD\uC81C"] })] });
}
function au(e, r) {
  return bn(e, r);
}
function lu({ id: e, kind: r, depth: n, cover: s, selectedIds: o, selectedSet: i, collapsed: a, dropHint: u, isRenaming: l, onStartRename: f, onFinishRename: g, onToggleCollapse: p, onSelectElement: x, onSelectGroup: w, onChange: y, onSelectIds: b, onRequestDeleteLayers: v }) {
  const { attributes: j, listeners: R, setNodeRef: C, transform: E, transition: $, isDragging: W } = Xa({ id: e, data: { kind: r }, disabled: l }), I = { transform: Ga.Transform.toString(E), transition: $, opacity: W ? 0.35 : 1, paddingLeft: `${6 + n * 12}px` }, _ = Fe(s), U = d.useRef(s);
  U.current = s;
  const A = r === "group" ? St(_, e) : null, L = r === "element" ? _.elements.find((P) => P.id === e) : null, Q = r === "group" ? Me(_, e) : [], V = r === "group" && Q.length > 0 && Q.every((P) => i.has(P)), re = r === "group" && !V && Q.some((P) => i.has(P)), ge = r === "element" && i.has(e), oe = _r(s, e), ie = `${ki} relative ${r === "group" ? V ? xs : re ? "bg-blue-50/50 dark:bg-blue-950/20" : "" : ge ? xs : ""} ${oe ? "ring-1 ring-inset ring-yellow-400/80" : ""}`, he = l ? {} : { ...j, ...R }, D = (P) => {
    var _a2;
    const q = U.current;
    if (r === "group") {
      const ae = St(q, e), ee = P.trim() || "\uADF8\uB8F9";
      if (ae && ae.name === ee) {
        g();
        return;
      }
      y(Yc(q, e, P));
    } else {
      const ae = q.elements.find((ee) => ee.id === e);
      if (ae) {
        const ee = P.trim(), Se = ((_a2 = ae.name) == null ? void 0 : _a2.trim()) ?? "";
        if (ee === Se) {
          g();
          return;
        }
        if (!Se && ee === Us(ae)) {
          g();
          return;
        }
      }
      y(Uc(q, e, P));
    }
    g();
  }, X = t.jsx("span", { role: "button", tabIndex: -1, "data-no-dnd": true, className: `shrink-0 rounded p-0.5 hover:bg-gray-200 dark:hover:bg-odp-borderStrong ${oe ? "text-yellow-600 dark:text-yellow-400" : "text-gray-400"}`, title: oe ? "\uC7A0\uAE08 \uD574\uC81C" : "\uC7A0\uAE08", "aria-label": oe ? "\uC7A0\uAE08 \uD574\uC81C" : "\uC7A0\uAE08", onClick: (P) => {
    P.stopPropagation(), y(ii(s, e));
  }, onPointerDown: (P) => P.stopPropagation(), children: oe ? t.jsx(Ss, { size: 12 }) : t.jsx(js, { size: 12 }) }), K = u === "before" ? t.jsx("div", { className: "pointer-events-none absolute inset-x-1 -top-0.5 z-10 h-0.5 rounded bg-blue-500" }) : u === "after" ? t.jsx("div", { className: "pointer-events-none absolute inset-x-1 -bottom-0.5 z-10 h-0.5 rounded bg-blue-500" }) : u === "inside" ? t.jsx("div", { className: "pointer-events-none absolute inset-0 z-10 rounded ring-2 ring-inset ring-blue-400/70" }) : null, be = (P) => {
    l || P.target instanceof Element && P.target.closest("[data-no-dnd]") || (r === "group" ? w(e, P) : x(e, P));
  }, se = r === "group" && A ? t.jsxs("div", { ref: C, style: I, className: `${ie} cursor-grab active:cursor-grabbing`, "aria-selected": V, role: "option", onClick: be, ...he, children: [K, t.jsx("button", { type: "button", className: "shrink-0 rounded p-0.5 hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: (P) => {
    P.stopPropagation(), p();
  }, "aria-label": a ? "\uADF8\uB8F9 \uD3BC\uCE58\uAE30" : "\uADF8\uB8F9 \uC811\uAE30", children: a ? t.jsx(Ko, { size: 12 }) : t.jsx(mt, { size: 12 }) }), t.jsx(Jl, { size: 12, className: "shrink-0 opacity-70" }), t.jsx(bo, { displayValue: A.name, editValue: A.name, isEditing: l, className: "min-w-0 flex-1 truncate font-medium", onStartEdit: () => f(e), onCommit: D, onCancel: g }), l ? null : t.jsx("span", { className: "shrink-0 text-[9px] text-gray-400", children: Q.length }), X] }) : L ? t.jsxs("div", { ref: C, style: I, className: `${ie} cursor-grab active:cursor-grabbing`, "aria-selected": ge, onClick: be, ...he, role: "option", children: [K, ou(L), t.jsx(bo, { displayValue: $r(L), editValue: Us(L), isEditing: l, className: "min-w-0 flex-1 truncate", onStartEdit: () => f(e), onCommit: D, onCancel: g }), X, !l && o.length === 1 && o[0] === e ? t.jsxs("span", { className: "flex shrink-0 gap-0.5", children: [t.jsx("span", { role: "button", tabIndex: -1, className: "rounded px-1 text-[9px] hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: (P) => {
    P.stopPropagation(), y(ms(s, e, 1));
  }, children: "\u2191" }), t.jsx("span", { role: "button", tabIndex: -1, className: "rounded px-1 text-[9px] hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: (P) => {
    P.stopPropagation(), y(ms(s, e, -1));
  }, children: "\u2193" })] }) : null] }) : null;
  return se ? t.jsx(iu, { cover: s, targetId: e, kind: r, selectedIds: o, onChange: y, onSelectIds: b, onRequestDeleteLayers: v, onStartRename: f, children: t.jsx(ti.div, { layout: l ? false : "position", transition: { duration: 0.18, ease: "easeOut" }, children: se }) }) : null;
}
function cu({ active: e }) {
  const { setNodeRef: r, isOver: n } = Ya({ id: Dr });
  return t.jsx("div", { ref: r, className: `mt-1 min-h-8 rounded border border-dashed px-2 py-2 text-center text-[9px] transition-colors ${n || e ? "border-blue-400 bg-blue-50/60 text-blue-600 dark:bg-blue-950/30" : "border-gray-200 text-gray-400 dark:border-odp-borderStrong"}`, "aria-label": "\uB8E8\uD2B8\uB85C \uC774\uB3D9", children: "\uB8E8\uD2B8\uB85C \uBE7C\uB0B4\uAE30" });
}
function du({ cover: e, selectedIds: r, onSelectIds: n, onChange: s, collapsedGroups: o, onCollapsedGroupsChange: i, onRequestDeleteLayers: a }) {
  const u = d.useMemo(() => Fe(e), [e]), l = d.useMemo(() => Aa(u, o), [u, o]), f = d.useMemo(() => l.map((D) => D.id), [l]), g = d.useMemo(() => new Set(r), [r]), p = d.useRef(null), [x, w] = d.useState(null), [y, b] = d.useState(null), [v, j] = d.useState("before"), [R, C] = d.useState(null), E = d.useRef(null), $ = d.useRef(null), W = Ia(Da(Ba, { activationConstraint: { distance: 5 } }));
  d.useEffect(() => {
    R && (l.some((D) => D.id === R) || C(null));
  }, [l, R]);
  const I = (D) => _e(u, D) ? Me(e, D) : [D], _ = (D, X) => {
    const K = l.findIndex((ae) => ae.id === D), be = l.findIndex((ae) => ae.id === X);
    if (K < 0 || be < 0) {
      n(I(X));
      return;
    }
    const se = Math.min(K, be), P = Math.max(K, be), q = [];
    for (let ae = se; ae <= P; ae += 1) {
      const ee = l[ae];
      ee && q.push(...I(ee.id));
    }
    n([...new Set(q)]);
  }, U = (D, X) => {
    if (X.preventDefault(), X.shiftKey && p.current) {
      _(p.current, D);
      return;
    }
    const K = I(D);
    if (X.metaKey || X.ctrlKey) {
      if (K.every((se) => g.has(se))) {
        const se = new Set(K);
        n(r.filter((P) => !se.has(P)));
      } else n([.../* @__PURE__ */ new Set([...r, ...K])]);
      return;
    }
    p.current = D, n(K);
  }, A = (D, X) => {
    if (X.preventDefault(), X.shiftKey && p.current) {
      _(p.current, D);
      return;
    }
    const K = Me(e, D);
    if (X.metaKey || X.ctrlKey) {
      const be = new Set(r);
      K.length > 0 && K.every((P) => be.has(P)) ? K.forEach((P) => be.delete(P)) : K.forEach((P) => be.add(P)), n([...be]);
      return;
    }
    p.current = D, n(K);
  }, L = (D) => {
    if (_e(u, D)) return D;
    const X = Ve(e, r);
    for (const K of X) if (_e(u, K) && Me(u, K).includes(D)) return K;
    return D;
  }, Q = (D) => {
    const X = D.over;
    if (!X) {
      b(null);
      return;
    }
    const K = String(X.id);
    b(K);
    const be = K !== Dr && _e(u, K), se = X.rect;
    j(go(K, be, se ? { top: se.top, height: se.height } : null, E.current));
  }, V = (D) => {
    const X = String(D.active.id), K = L(X);
    $.current = K, w(K);
  }, re = (D) => {
    const X = D.active.rect.current.translated;
    X && (E.current = X.top + X.height / 2), Q(D);
  }, ge = (D) => {
    var _a2;
    const X = $.current ?? String(D.active.id), K = D.over ? String(D.over.id) : null;
    let be = v;
    if ($.current = null, w(null), b(null), E.current = null, !K || X === K) return;
    if (K === Dr) {
      s(Ha(e, X, "end"));
      return;
    }
    const se = _e(u, K), P = (_a2 = D.over) == null ? void 0 : _a2.rect;
    if (P) {
      const q = D.active.rect.current.translated != null ? D.active.rect.current.translated.top + D.active.rect.current.translated.height / 2 : null;
      be = go(K, se, { top: P.top, height: P.height }, q);
    }
    s(Ao(e, X, K, be));
  }, oe = () => {
    $.current = null, w(null), b(null), E.current = null;
  }, ie = x ? l.find((D) => D.id === x) ?? null : null, he = (() => {
    var _a2;
    if (!ie) return "";
    if (ie.kind === "group") return ((_a2 = St(u, ie.id)) == null ? void 0 : _a2.name) ?? "\uADF8\uB8F9";
    const D = u.elements.find((X) => X.id === ie.id);
    return D ? $r(D) : "";
  })();
  return t.jsxs(Oa, { sensors: W, collisionDetection: su, onDragStart: V, onDragMove: re, onDragEnd: ge, onDragCancel: oe, children: [t.jsxs("div", { className: "max-h-72 space-y-0.5 overflow-y-auto rounded-md border border-gray-200 bg-white p-1 select-none dark:border-odp-borderStrong dark:bg-odp-bg", role: "listbox", "aria-label": "\uD45C\uC9C0 \uB808\uC774\uC5B4", "aria-multiselectable": true, children: [l.length === 0 ? t.jsx("p", { className: "px-2 py-3 text-center text-[10px] text-gray-400", children: "\uB808\uC774\uC5B4 \uC5C6\uC74C" }) : t.jsx($a, { items: f, strategy: _a, children: l.map((D) => t.jsx(lu, { id: D.id, kind: D.kind, depth: D.depth, cover: u, selectedIds: r, selectedSet: g, collapsed: !!o[D.id], dropHint: x && y === D.id && x !== D.id ? v : null, isRenaming: R === D.id, onStartRename: C, onFinishRename: () => C(null), onToggleCollapse: () => i({ ...o, [D.id]: !o[D.id] }), onSelectElement: U, onSelectGroup: A, onChange: s, onSelectIds: n, onRequestDeleteLayers: a }, D.id)) }), t.jsx(cu, { active: !!(x && y === Dr) })] }), t.jsx(Fa, { dropAnimation: null, children: x ? t.jsx(ti.div, { initial: { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" }, animate: { scale: 1.03, boxShadow: "0 8px 24px rgba(15, 23, 42, 0.18)" }, className: `${ki} ${xs} cursor-grabbing border border-blue-200 bg-white dark:border-blue-800 dark:bg-odp-surface`, children: t.jsx("span", { className: "truncate px-1", children: he }) }) : null })] });
}
const wo = Wo, uu = "s3haim_cover_sidebar_width", fu = 300, pu = "s3haim_cover_layers_sidebar_width", mu = 280, ji = "s3haim_cover_layers_detached", xr = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), gr = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Lr = "text-[11px] font-medium text-gray-500 dark:text-odp-fgMuted", Mt = "inline-flex items-center justify-center gap-1 rounded-md border border-gray-300 px-2 py-1.5 text-[11px] text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-odp-borderStrong dark:text-odp-fg dark:hover:bg-odp-focusBg", Re = "inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-odp-borderStrong dark:text-odp-fg dark:hover:bg-odp-focusBg", pt = "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200", Bt = "z-[10050] max-w-[220px] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", hu = { settings: false, shortcuts: false, layers: true, background: true, selection: true };
function Ue({ keys: e, children: r }) {
  return t.jsxs("li", { className: "flex flex-col gap-1.5 rounded-md border border-gray-200/80 bg-gray-50/90 px-2.5 py-2 dark:border-odp-borderStrong/60 dark:bg-odp-focusBg/45", children: [t.jsx("div", { className: "flex max-w-full flex-wrap items-center gap-x-1 gap-y-1.5", children: e }), t.jsx("p", { className: "text-[11px] font-medium leading-snug text-ink dark:text-odp-fgStrong", children: r })] });
}
function en() {
  return t.jsx("span", { className: "shrink-0 px-0.5 text-xs text-gray-400 dark:text-odp-muted", "aria-hidden": true, children: "/" });
}
function xu() {
  const e = tu(), r = ru();
  return t.jsxs("ul", { className: "flex flex-col gap-5", "aria-label": "\uD45C\uC9C0 \uD3B8\uC9D1 \uB2E8\uCD95\uD0A4", children: [t.jsx(Ue, { keys: t.jsx(br, { children: "\uB4DC\uB798\uADF8" }), children: "\uBE48 \uACF3\uC744 \uB4DC\uB798\uADF8\uD574 \uC601\uC5ED \uC120\uD0DD" }), t.jsx(Ue, { keys: t.jsx(Ke, { keys: [e, "G"] }), children: "\uC120\uD0DD\uD55C \uC694\uC18C \uADF8\uB8F9" }), t.jsx(Ue, { keys: t.jsx(Ke, { keys: [e, "Shift", "G"] }), children: "\uADF8\uB8F9 \uD574\uC81C" }), t.jsx(Ue, { keys: t.jsxs(t.Fragment, { children: [t.jsx(Ke, { keys: [r, "\uB4DC\uB798\uADF8"] }), t.jsx(en, {}), t.jsx(Ke, { keys: [e, "\uB4DC\uB798\uADF8"] })] }), children: "\uBCF5\uC81C\uD558\uBA70 \uC774\uB3D9" }), t.jsx(Ue, { keys: t.jsx(Ke, { keys: ["Shift", "\uD074\uB9AD"] }), children: "\uB2E4\uC911 \uC120\uD0DD (Mod+\uD074\uB9AD\uACFC \uB3D9\uC77C)" }), t.jsx(Ue, { keys: t.jsx(Ke, { keys: ["Shift", "\uB4DC\uB798\uADF8"] }), children: "\uCD95 \uACE0\uC815 \uC774\uB3D9 \xB7 \uD06C\uAE30 \uC870\uC808 \uC2DC \uC911\uC2EC \uAE30\uC900" }), t.jsx(Ue, { keys: t.jsxs(t.Fragment, { children: [t.jsx(br, { children: "\u2191" }), t.jsx(br, { children: "\u2193" }), t.jsx(br, { children: "\u2190" }), t.jsx(br, { children: "\u2192" })] }), children: "\uC774\uB3D9 (\uAE30\uBCF8 10px)" }), t.jsx(Ue, { keys: t.jsx(Ke, { keys: [r, "\uD654\uC0B4\uD45C"] }), children: "\uBBF8\uC138 \uC774\uB3D9" }), t.jsx(Ue, { keys: t.jsxs(t.Fragment, { children: [t.jsx(Ke, { keys: ["Shift", "\uD654\uC0B4\uD45C"] }), t.jsx(en, {}), t.jsx(Ke, { keys: [e, "\uD654\uC0B4\uD45C"] })] }), children: "\uD06C\uAC8C \uC774\uB3D9" }), t.jsx(Ue, { keys: t.jsx(Ke, { keys: [r, "L"] }), children: "\uD14D\uC2A4\uD2B8 \uC67C\uCABD \uC815\uB82C" }), t.jsx(Ue, { keys: t.jsxs(t.Fragment, { children: [t.jsx(Ke, { keys: [r, "M"] }), t.jsx(en, {}), t.jsx(Ke, { keys: [r, "E"] })] }), children: "\uD14D\uC2A4\uD2B8 \uAC00\uC6B4\uB370 \uC815\uB82C" }), t.jsx(Ue, { keys: t.jsx(Ke, { keys: [r, "R"] }), children: "\uD14D\uC2A4\uD2B8 \uC624\uB978\uCABD \uC815\uB82C" }), t.jsx(Ue, { keys: t.jsx(Ke, { keys: [e, "Z"] }), children: "\uC2E4\uD589 \uCDE8\uC18C" }), t.jsx(Ue, { keys: t.jsxs(t.Fragment, { children: [t.jsx(Ke, { keys: [e, "Shift", "Z"] }), t.jsx(en, {}), t.jsx(Ke, { keys: [e, "Y"] })] }), children: "\uB2E4\uC2DC \uC2E4\uD589" })] });
}
function ye({ tip: e, children: r, className: n = "", disabled: s, onClick: o, pressed: i, type: a = "button" }) {
  return t.jsxs(Lt, { children: [t.jsx(zt, { asChild: true, children: t.jsx("button", { type: a, className: n, disabled: s, onClick: o, "aria-label": e, "aria-pressed": i, children: r }) }), t.jsx(At, { children: t.jsxs(It, { className: Bt, side: "top", sideOffset: 6, children: [e, t.jsx(Dt, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Rt({ title: e, open: r, onToggle: n, children: s, headerRight: o, icon: i, titleClassName: a, iconClassName: u }) {
  return t.jsxs("section", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [t.jsxs("div", { className: "flex items-center gap-1 px-2 py-1.5", children: [t.jsxs(Lt, { children: [t.jsx(zt, { asChild: true, children: t.jsxs("button", { type: "button", className: "flex min-w-0 flex-1 items-center gap-1.5 rounded px-1 py-1 text-left hover:bg-gray-100 dark:hover:bg-odp-focusBg", onClick: n, "aria-expanded": r, "aria-label": r ? `${e} \uC811\uAE30` : `${e} \uD3BC\uCE58\uAE30`, children: [i ? t.jsx(i, { size: 14, className: u ?? "shrink-0 text-gray-700 dark:text-odp-fgStrong", "aria-hidden": true }) : null, t.jsx("span", { className: a ?? "truncate text-[11px] font-semibold tracking-wide text-gray-800 dark:text-odp-fgStrong", children: e })] }) }), t.jsx(At, { children: t.jsxs(It, { className: Bt, side: "top", sideOffset: 6, children: [r ? `${e} \uC811\uAE30` : `${e} \uD3BC\uCE58\uAE30`, t.jsx(Dt, { className: "fill-white dark:fill-odp-surface" })] }) })] }), o, t.jsx(ye, { tip: r ? `${e} \uC811\uAE30` : `${e} \uD3BC\uCE58\uAE30`, className: "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-gray-700 hover:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", onClick: n, children: t.jsx(mt, { size: 14, className: `transition-transform duration-200 ease-out ${r ? "rotate-0" : "-rotate-90"}`, "aria-hidden": true }) })] }), t.jsx("div", { className: `grid transition-[grid-template-rows,opacity] duration-200 ease-out ${r ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`, children: t.jsx("div", { className: "min-h-0 overflow-hidden", children: t.jsx("div", { className: "space-y-2 px-3 pb-3", "aria-hidden": !r, children: s }) }) })] });
}
function Be(e, r, n) {
  return { ...e, elements: e.elements.map((s) => s.id !== r ? s : { ...s, ...n }) };
}
function gu({ value: e, onChange: r }) {
  const n = [{ id: "left", icon: Vo, label: "\uC67C\uCABD \uC815\uB82C (Alt+L)" }, { id: "center", icon: qo, label: "\uAC00\uC6B4\uB370 \uC815\uB82C (Alt+M / Alt+E)" }, { id: "right", icon: Zo, label: "\uC624\uB978\uCABD \uC815\uB82C (Alt+R)" }];
  return t.jsx("div", { className: "flex gap-1", children: n.map(({ id: s, icon: o, label: i }) => t.jsx(ye, { tip: i, className: `${Mt} flex-1 ${e === s ? pt : ""}`, pressed: e === s, onClick: () => r(s), children: t.jsx(o, { size: 14 }) }, s)) });
}
function bu({ textAlign: e, textVAlign: r, onTextAlignChange: n, onTextVAlignChange: s }) {
  return t.jsxs("div", { className: "grid grid-cols-3 gap-1", children: [t.jsx(ye, { tip: "\uC67C\uCABD (Alt+L)", className: `${Re} ${e === "left" ? pt : ""}`, pressed: e === "left", onClick: () => n("left"), children: t.jsx(yn, { size: 15 }) }), t.jsx(ye, { tip: "\uAC00\uB85C \uAC00\uC6B4\uB370 (Alt+M / Alt+E)", className: `${Re} ${e === "center" ? pt : ""}`, pressed: e === "center", onClick: () => n("center"), children: t.jsx(vn, { size: 15 }) }), t.jsx(ye, { tip: "\uC624\uB978\uCABD (Alt+R)", className: `${Re} ${e === "right" ? pt : ""}`, pressed: e === "right", onClick: () => n("right"), children: t.jsx(kn, { size: 15 }) }), t.jsx(ye, { tip: "\uC704\uCABD", className: `${Re} ${r === "top" ? pt : ""}`, pressed: r === "top", onClick: () => s("top"), children: t.jsx(jn, { size: 15 }) }), t.jsx(ye, { tip: "\uC138\uB85C \uAC00\uC6B4\uB370", className: `${Re} ${r === "middle" ? pt : ""}`, pressed: r === "middle", onClick: () => s("middle"), children: t.jsx(Sn, { size: 15 }) }), t.jsx(ye, { tip: "\uC544\uB798\uCABD", className: `${Re} ${r === "bottom" ? pt : ""}`, pressed: r === "bottom", onClick: () => s("bottom"), children: t.jsx(Nn, { size: 15 }) })] });
}
function wu() {
  if (typeof window > "u") return false;
  try {
    return window.localStorage.getItem(ji) === "1";
  } catch {
    return false;
  }
}
function yu(e) {
  if (!(typeof window > "u")) try {
    window.localStorage.setItem(ji, e ? "1" : "0");
  } catch {
  }
}
function vu({ cover: e, selectedIds: r, onSelectIds: n, onChange: s, currentFile: o = null, topPx: i = 0, width: a, isResizing: u = false, resizeHandleProps: l = {}, layersDetached: f, onLayersDetachedChange: g, layersWidth: p, layersIsResizing: x = false, layersResizeHandleProps: w = {}, centerSnapEnabled: y = true, onCenterSnapEnabledChange: b, centerSnapTolerance: v = _o, onCenterSnapToleranceChange: j, objectSnapEnabled: R = false, onObjectSnapEnabledChange: C, objectSnapTolerance: E = Fo, onObjectSnapToleranceChange: $, textContainerOutlineEnabled: W = false, onTextContainerOutlineEnabledChange: I, placePreviewEnabled: _ = true, onPlacePreviewEnabledChange: U, canUndo: A = false, canRedo: L = false, onUndo: Q, onRedo: V, placeMode: re = null, onPlaceModeChange: ge, className: oe = "" }) {
  const ie = d.useRef(null), he = d.useRef(null), [D, X] = d.useState({}), [K, be] = d.useState(hu), [se, P] = d.useState(0), [q, ae] = d.useState(null), [ee, Se] = d.useState(null), [Ne, Ce] = d.useState(0), [Pe, He] = d.useState(false), [et, Te] = d.useState(null), H = d.useRef(false), de = d.useRef(null), me = () => {
    de.current != null && (window.clearTimeout(de.current), de.current = null);
  }, at = () => {
    me(), H.current = false, Ce(0), He(false), Te(null);
  }, Ae = () => {
    H.current = true, Ce(0), me(), de.current = window.setTimeout(() => {
      de.current = null, H.current = false, Ce(2);
    }, 220);
  };
  d.useEffect(() => () => me(), []), d.useEffect(() => {
    const c = () => P((m) => m + 1);
    return window.addEventListener(dn, c), () => window.removeEventListener(dn, c);
  }, []);
  const tt = d.useMemo(() => ks(), [se]), Y = r.length === 1 ? e.elements.find((c) => c.id === r[0]) ?? null : null, qe = d.useMemo(() => {
    var _a2;
    if (r.length < 1) return null;
    if (r.length === 1) return ((_a2 = e.elements.find((T) => T.id === r[0])) == null ? void 0 : _a2.groupId) ?? null;
    const c = r.map((k) => {
      var _a3;
      return ((_a3 = e.elements.find((T) => T.id === k)) == null ? void 0 : _a3.groupId) ?? null;
    }), m = c[0];
    return !m || !c.every((k) => k === m) ? null : m;
  }, [e.elements, r]), ht = d.useMemo(() => {
    if (r.length < 1) return false;
    const c = Ve(e, r);
    return !(c.length === 1 && _e(e, c[0]));
  }, [e, r]), Nt = !!qe, rt = d.useMemo(() => di(e, r), [e, r]), Le = rt.enabled, Oe = rt.soleGroupId;
  d.useEffect(() => {
    q != null && Oe !== q && ae(null);
  }, [Oe, q]), d.useEffect(() => {
    ee != null && (Oe || Se(null));
  }, [Oe, ee]);
  const De = (c) => {
    be((m) => ({ ...m, [c]: !m[c] }));
  }, xt = () => {
    ge == null ? void 0 : ge((re == null ? void 0 : re.kind) === "text" ? null : { kind: "text" });
  }, gt = (c) => {
    if ((re == null ? void 0 : re.kind) === "shape" && re.shapeType === c) {
      ge == null ? void 0 : ge(null);
      return;
    }
    ge == null ? void 0 : ge({ kind: "shape", shapeType: c });
  }, ir = (c) => {
    c && (ge == null ? void 0 : ge({ kind: "image", files: [c] }));
  }, ar = async (c, m = false) => {
    if (c) try {
      const k = await jr(c, o);
      if (m && (Y == null ? void 0 : Y.type) === "image") {
        s(Be(e, Y.id, { path: k }));
        return;
      }
    } catch (k) {
      console.error(k), window.alert(k instanceof Error ? k.message : "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, lr = async (c) => {
    if (c) try {
      const m = await jr(c, o);
      s({ ...e, bg: { ...e.bg, imagePath: m } });
    } catch (m) {
      console.error(m), window.alert(m instanceof Error ? m.message : "\uBC30\uACBD \uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, cr = () => {
    const c = En(e, r);
    c && (s(c.cover), n(Me(c.cover, c.groupId)));
  }, Ct = () => {
    const c = ys(e);
    s(c.cover);
  }, Sr = () => {
    qe && s(Pn(e, qe));
  }, Ge = (c, m) => {
    s(m === "layers" ? bn(e, c) : ps(e, c)), n([]);
  }, lt = (c, m = "layers") => {
    if (!c.length) return;
    if (!an(e, c)) {
      Ge(c, m);
      return;
    }
    Te({ ids: c, mode: m }), He(true), Ce(1);
  }, dr = () => {
    r.length && lt(r, "elements");
  }, ct = () => {
    var _a2;
    const m = ((_a2 = document.querySelector('[data-cover-frame="1"]')) == null ? void 0 : _a2.getBoundingClientRect().height) ?? 0, k = Pc(e.elements, e.layout.gapPx, m);
    s({ ...e, elements: k });
  }, Ze = (c) => {
    var _a2;
    if (!Le) return;
    const m = Br(e, r);
    if (!m.length) return;
    const T = (_a2 = document.querySelector('[data-cover-frame="1"]')) == null ? void 0 : _a2.getBoundingClientRect(), M = c === "distributeX" ? (T == null ? void 0 : T.width) ?? 0 : (T == null ? void 0 : T.height) ?? 0, B = ds(e.layout.gapPx, M);
    if (Oe) {
      if (q === Oe) {
        s(Ar(e, m, c, B, { insideGroupId: Oe }));
        return;
      }
      Se(c);
      return;
    }
    s(Ar(e, m, c, B));
  }, ur = () => {
    var _a2;
    if (!Oe || !ee) {
      Se(null);
      return;
    }
    const c = ee, m = Br(e, r);
    if (!m.length) {
      Se(null);
      return;
    }
    const T = (_a2 = document.querySelector('[data-cover-frame="1"]')) == null ? void 0 : _a2.getBoundingClientRect(), M = c === "distributeX" ? (T == null ? void 0 : T.width) ?? 0 : (T == null ? void 0 : T.height) ?? 0, B = ds(e.layout.gapPx, M);
    ae(Oe), Se(null), s(Ar(e, m, c, B, { insideGroupId: Oe }));
  }, Nr = t.jsx(du, { cover: e, selectedIds: r, onSelectIds: n, onChange: s, collapsedGroups: D, onCollapsedGroupsChange: X, onRequestDeleteLayers: (c) => lt(c, "layers") }), Cr = t.jsxs("div", { className: "space-y-1.5", children: [t.jsxs("div", { className: "grid grid-cols-2 gap-1.5", children: [t.jsxs(ye, { tip: (re == null ? void 0 : re.kind) === "text" ? "\uD074\uB9AD \uC0BD\uC785 \uCDE8\uC18C (Esc)" : "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uCD94\uAC00 (T) \u2014 \uCE94\uBC84\uC2A4\uB97C \uD074\uB9AD\uD574 \uBC30\uCE58", className: `${Mt} ${(re == null ? void 0 : re.kind) === "text" ? `${pt} shadow-inner` : ""}`, pressed: (re == null ? void 0 : re.kind) === "text", onClick: xt, children: [t.jsx(nn, { size: 14 }), "\uD14D\uC2A4\uD2B8"] }), t.jsxs(ye, { tip: (re == null ? void 0 : re.kind) === "image" ? "\uD074\uB9AD \uC0BD\uC785 \uCDE8\uC18C (Esc)" : "\uC774\uBBF8\uC9C0 \uCD94\uAC00 \u2014 \uD30C\uC77C \uC120\uD0DD \uD6C4 \uCE94\uBC84\uC2A4\uB97C \uD074\uB9AD\uD574 \uBC30\uCE58", className: `${Mt} ${(re == null ? void 0 : re.kind) === "image" ? `${pt} shadow-inner` : ""}`, pressed: (re == null ? void 0 : re.kind) === "image", onClick: () => {
    if ((re == null ? void 0 : re.kind) === "image") {
      ge == null ? void 0 : ge(null);
      return;
    }
    ie.current && (ie.current.dataset.coverImageMode = "place", ie.current.click());
  }, children: [t.jsx(Yn, { size: 14 }), "\uC774\uBBF8\uC9C0"] })] }), t.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: [{ type: "rect", tip: "\uC0AC\uAC01\uD615", shortcut: "M", Icon: sn }, { type: "ellipse", tip: "\uD0C0\uC6D0", shortcut: "O", Icon: ec }, { type: "roundRect", tip: "\uB465\uADFC \uC0AC\uAC01\uD615", shortcut: null, Icon: tc }].map(({ type: c, tip: m, shortcut: k, Icon: T }) => {
    const M = (re == null ? void 0 : re.kind) === "shape" && re.shapeType === c, B = M ? "\uD074\uB9AD \uC0BD\uC785 \uCDE8\uC18C (Esc)" : k ? `${m} \uCD94\uAC00 (${k}) \u2014 \uCE94\uBC84\uC2A4\uB97C \uD074\uB9AD\uD574 \uBC30\uCE58` : `${m} \uCD94\uAC00 \u2014 \uCE94\uBC84\uC2A4\uB97C \uD074\uB9AD\uD574 \uBC30\uCE58`;
    return t.jsxs(ye, { tip: B, className: `${Mt} ${M ? `${pt} shadow-inner` : ""}`, pressed: M, onClick: () => gt(c), children: [t.jsx(T, { size: 14 }), t.jsx("span", { className: "truncate", children: m })] }, c);
  }) })] }), Ye = t.jsxs("div", { className: "rounded-md border border-gray-200 bg-gray-50 p-1.5 dark:border-odp-borderStrong dark:bg-odp-bg/60", children: [t.jsx("div", { className: "mb-1 px-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-400", children: "\uB808\uC774\uC5B4 \uC561\uC158" }), t.jsxs("div", { className: "flex flex-wrap gap-1", children: [t.jsx(ye, { tip: "\uC0C8 \uADF8\uB8F9", className: Re, onClick: Ct, children: t.jsx(Qo, { size: 15 }) }), t.jsx(ye, { tip: "\uADF8\uB8F9 (Mod+G)", className: Re, disabled: !ht, onClick: cr, children: t.jsx(Cs, { size: 15 }) }), t.jsx(ye, { tip: "\uADF8\uB8F9 \uD574\uC81C (Mod+Shift+G)", className: Re, disabled: !Nt, onClick: Sr, children: t.jsx(Ns, { size: 15 }) }), t.jsx(ye, { tip: "\uB9E8 \uC55E\uC73C\uB85C", className: Re, disabled: !r.length, onClick: () => s(Ts(e, r)), children: t.jsx(Es, { size: 15 }) }), t.jsx(ye, { tip: "\uB9E8 \uB4A4\uB85C", className: Re, disabled: !r.length, onClick: () => s(Rs(e, r)), children: t.jsx(Ps, { size: 15 }) }), t.jsx(ye, { tip: "\uC138\uB85C \uC815\uB9AC (gap \uC801\uC6A9)", className: Re, disabled: e.elements.length === 0, onClick: ct, children: t.jsx(Un, { size: 15 }) }), t.jsx(ye, { tip: "\uC120\uD0DD \uC0AD\uC81C", className: Re, disabled: !r.length, onClick: dr, children: t.jsx(wn, { size: 15 }) })] })] }), bt = t.jsxs("div", { className: "rounded-md border border-gray-200 bg-gray-50 p-1.5 dark:border-odp-borderStrong dark:bg-odp-bg/60", children: [t.jsx("div", { className: "mb-1 px-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-400", children: "\uAC1C\uCCB4 \uC815\uB82C" }), t.jsxs("div", { className: "mb-1.5 grid grid-cols-4 gap-1", children: [t.jsx(ye, { tip: "\uC67C\uCABD \uC815\uB82C", className: Re, disabled: !Le, onClick: () => Ze("left"), children: t.jsx(yn, { size: 15 }) }), t.jsx(ye, { tip: "\uAC00\uB85C \uAC00\uC6B4\uB370", className: Re, disabled: !Le, onClick: () => Ze("centerX"), children: t.jsx(vn, { size: 15 }) }), t.jsx(ye, { tip: "\uC624\uB978\uCABD \uC815\uB82C", className: Re, disabled: !Le, onClick: () => Ze("right"), children: t.jsx(kn, { size: 15 }) }), t.jsx(ye, { tip: "\uAC00\uB85C \uAC04\uACA9 \uBD84\uBC30", className: Re, disabled: !Le, onClick: () => Ze("distributeX"), children: t.jsx(Yo, { size: 15 }) }), t.jsx(ye, { tip: "\uC704\uCABD \uC815\uB82C", className: Re, disabled: !Le, onClick: () => Ze("top"), children: t.jsx(jn, { size: 15 }) }), t.jsx(ye, { tip: "\uC138\uB85C \uAC00\uC6B4\uB370", className: Re, disabled: !Le, onClick: () => Ze("centerY"), children: t.jsx(Sn, { size: 15 }) }), t.jsx(ye, { tip: "\uC544\uB798\uCABD \uC815\uB82C", className: Re, disabled: !Le, onClick: () => Ze("bottom"), children: t.jsx(Nn, { size: 15 }) }), t.jsx(ye, { tip: "\uC138\uB85C \uAC04\uACA9 \uBD84\uBC30", className: Re, disabled: !Le, onClick: () => Ze("distributeY"), children: t.jsx(Uo, { size: 15 }) })] }), t.jsxs("label", { className: "block space-y-1 px-0.5", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "Gap" }), t.jsx(vt, { unit: "css", suffix: "px", min: 0, max: 200, step: 1, value: e.layout.gapPx, "aria-label": "\uAC1C\uCCB4 \uC815\uB82C Gap", onChange: (c) => s(Ec(e, { gapPx: c })) }), t.jsx("span", { className: "block text-[10px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC138\uB85C \uC815\uB9AC \uC2DC \uAC1C\uCCB4 \uC0AC\uC774 \uAC04\uACA9, \uAC00\uB85C\xB7\uC138\uB85C \uAC04\uACA9 \uBD84\uBC30\uC5D0\uC11C \uAC1C\uCCB4\uAC00 2\uAC1C\uC77C \uB54C \uC0AC\uC774\uC758 \uAC04\uACA9\uC73C\uB85C \uC4F0\uC785\uB2C8\uB2E4." })] })] }), We = t.jsxs("div", { className: "space-y-2", children: [Cr, Nr, Ye, bt] }), nt = t.jsx("input", { ref: ie, type: "file", accept: "image/*", className: "hidden", "data-cover-image-mode": "add", onChange: (c) => {
    var _a2;
    const m = c.currentTarget.dataset.coverImageMode || "add", k = (_a2 = c.target.files) == null ? void 0 : _a2[0];
    if (c.currentTarget.dataset.coverImageMode = "add", c.target.value = "", m === "place") {
      ir(k);
      return;
    }
    ar(k, m === "replace");
  } });
  return t.jsx(wc, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs(t.Fragment, { children: [t.jsxs("aside", { className: `fixed bottom-0 z-30 flex border-r border-gray-200 bg-white/95 backdrop-blur-sm print:hidden dark:border-odp-borderSoft dark:bg-odp-bgSoft/95 ${oe}`, style: { top: i, left: 0, width: a }, "aria-label": "\uD45C\uC9C0 \uC124\uC815", children: [t.jsxs("div", { className: "relative flex min-h-0 w-full flex-col overflow-y-auto pb-16", children: [nt, t.jsxs("div", { className: "sticky top-0 z-10 flex items-center gap-2 border-b border-gray-200 bg-white/95 px-3 py-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft/95", children: [t.jsx("div", { className: "flex-1 text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-odp-fgStrong", children: "\uD45C\uC9C0" }), t.jsx(ye, { tip: "\uC2E4\uD589 \uCDE8\uC18C (Mod+Z)", className: Re, disabled: !A, onClick: () => Q == null ? void 0 : Q(), children: t.jsx(rc, { size: 15 }) }), t.jsx(ye, { tip: "\uB2E4\uC2DC \uC2E4\uD589 (Mod+Shift+Z / Mod+Y)", className: Re, disabled: !L, onClick: () => V == null ? void 0 : V(), children: t.jsx(nc, { size: 15 }) })] }), t.jsx(Rt, { title: "\uC124\uC815", icon: sc, open: K.settings, onToggle: () => De("settings"), children: t.jsxs("div", { className: "space-y-2 rounded-md border border-gray-200 bg-gray-50 p-2.5 dark:border-odp-borderStrong dark:bg-odp-bg/50", children: [t.jsxs("div", { className: "flex items-center justify-between gap-2", children: [t.jsx("span", { className: Lr, children: "\uD45C\uC9C0 \uC0AC\uC6A9" }), t.jsxs(Lt, { children: [t.jsx(zt, { asChild: true, children: t.jsx(tr, { className: xr(e.enabled), checked: e.enabled, onCheckedChange: (c) => s({ ...e, enabled: c }), "aria-label": "\uD45C\uC9C0 \uC0AC\uC6A9", children: t.jsx(rr, { className: gr }) }) }), t.jsx(At, { children: t.jsxs(It, { className: Bt, side: "top", sideOffset: 6, children: ["\uD45C\uC9C0 \uC0AC\uC6A9", t.jsx(Dt, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }), t.jsxs("div", { className: "space-y-1.5", children: [t.jsxs("div", { className: "flex items-center justify-between gap-2", children: [t.jsx("span", { className: Lr, children: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5" }), t.jsxs(Lt, { children: [t.jsx(zt, { asChild: true, children: t.jsx(tr, { className: xr(y), checked: y, onCheckedChange: (c) => b == null ? void 0 : b(c), "aria-label": "\uAC00\uB85C\xB7\uC138\uB85C \uAC00\uC6B4\uB370 \uC2A4\uB0C5", children: t.jsx(rr, { className: gr }) }) }), t.jsx(At, { children: t.jsxs(It, { className: Bt, side: "top", sideOffset: 6, children: ["\uAC00\uB85C\xB7\uC138\uB85C \uAC00\uC6B4\uB370 \uC2A4\uB0C5", t.jsx(Dt, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD5C8\uC6A9 \uC624\uCC28" }), t.jsx(vt, { unit: "css", suffix: "px", min: 0.1, max: 100, step: 0.1, value: v, disabled: !j, "aria-label": "\uAC00\uC6B4\uB370 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28", onChange: (c) => j == null ? void 0 : j(c) })] })] }), t.jsxs("div", { className: "space-y-1.5", children: [t.jsxs("div", { className: "flex items-center justify-between gap-2", children: [t.jsx("span", { className: Lr, children: "\uAC1C\uCCB4 \uC2A4\uB0C5" }), t.jsxs(Lt, { children: [t.jsx(zt, { asChild: true, children: t.jsx(tr, { className: xr(R), checked: R, onCheckedChange: (c) => C == null ? void 0 : C(c), "aria-label": "\uAC1C\uCCB4 \uD14C\uB450\uB9AC\xB7\uAC00\uC6B4\uB370\uC120 \uC2A4\uB0C5", children: t.jsx(rr, { className: gr }) }) }), t.jsx(At, { children: t.jsxs(It, { className: Bt, side: "top", sideOffset: 6, children: ["\uB2E4\uB978 \uAC1C\uCCB4\uC758 \uD14C\uB450\uB9AC\xB7\uAC00\uC6B4\uB370\uC120\uC5D0 \uB9DE\uCDA4 (Shift+Tab \uD1A0\uAE00 \xB7 \uADF8\uB8F9\uC740 \uD1B5\uC9F8\uB85C, \uADF8\uB8F9 \uC548\uC5D0\uC11C\uB294 sibling\uACFC\uB3C4)", t.jsx(Dt, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD5C8\uC6A9 \uC624\uCC28" }), t.jsx(vt, { unit: "css", suffix: "px", min: 0.1, max: 100, step: 0.1, value: E, disabled: !$, "aria-label": "\uAC1C\uCCB4 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28", onChange: (c) => $ == null ? void 0 : $(c) })] })] }), t.jsxs("div", { className: "flex items-center justify-between gap-2", children: [t.jsx("span", { className: Lr, children: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC" }), t.jsxs(Lt, { children: [t.jsx(zt, { asChild: true, children: t.jsx(tr, { className: xr(W), checked: W, onCheckedChange: (c) => I == null ? void 0 : I(c), "aria-label": "\uBAA8\uB4E0 \uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD14C\uB450\uB9AC \uD45C\uC2DC", children: t.jsx(rr, { className: gr }) }) }), t.jsx(At, { children: t.jsxs(It, { className: Bt, side: "top", sideOffset: 6, children: ["\uC120\uD0DD\uACFC \uBB34\uAD00\uD558\uAC8C \uBAA8\uB4E0 \uD14D\uC2A4\uD2B8 \uC0C1\uC790\uB97C \uC605\uC740 \uBD89\uC740 \uC2E4\uC120\uC73C\uB85C \uD45C\uC2DC", t.jsx(Dt, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }), t.jsxs("div", { className: "flex items-center justify-between gap-2", children: [t.jsx("span", { className: Lr, children: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30" }), t.jsxs(Lt, { children: [t.jsx(zt, { asChild: true, children: t.jsx(tr, { className: xr(_), checked: _, onCheckedChange: (c) => U == null ? void 0 : U(c), "aria-label": "\uD074\uB9AD \uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30", children: t.jsx(rr, { className: gr }) }) }), t.jsx(At, { children: t.jsxs(It, { className: Bt, side: "top", sideOffset: 6, children: ["\uD14D\uC2A4\uD2B8\xB7\uC774\uBBF8\uC9C0\xB7\uB3C4\uD615 \uD074\uB9AD \uC0BD\uC785 \uC2DC \uCEE4\uC11C \uC704\uCE58\uC5D0 \uBC18\uD22C\uBA85 \uBBF8\uB9AC\uBCF4\uAE30 \uD45C\uC2DC", t.jsx(Dt, { className: "fill-white dark:fill-odp-surface" })] }) })] })] })] }) }), !f && t.jsx(Rt, { title: "\uB808\uC774\uC5B4", icon: Un, open: K.layers, onToggle: () => De("layers"), headerRight: t.jsx(ye, { tip: "\uB808\uC774\uC5B4\uB97C \uBCC4\uB3C4 \uC0AC\uC774\uB4DC\uBC14\uB85C \uBD84\uB9AC", className: Re, onClick: () => g(true), children: t.jsx(oc, { size: 15 }) }), children: We }), t.jsxs(Rt, { title: "\uBC30\uACBD", icon: Jo, open: K.background, onToggle: () => De("background"), children: [t.jsx(kt, { value: e.bg.color, onChange: (c) => s({ ...e, bg: { ...e.bg, color: c || "#ffffff" } }), allowNone: false, label: "\uC0C9", compact: true }), t.jsxs("div", { className: "mt-2 flex gap-1.5", children: [t.jsx(ye, { tip: "\uBC30\uACBD \uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC", className: `${Mt} flex-1`, onClick: () => {
    var _a2;
    return (_a2 = he.current) == null ? void 0 : _a2.click();
  }, children: "\uBC30\uACBD \uC774\uBBF8\uC9C0" }), t.jsx(ye, { tip: "\uBC30\uACBD \uC774\uBBF8\uC9C0 \uC81C\uAC70", className: Mt, disabled: !e.bg.imagePath, onClick: () => s({ ...e, bg: { ...e.bg, imagePath: "" } }), children: "\uC81C\uAC70" })] }), e.bg.imagePath ? t.jsx("p", { className: "truncate text-[10px] text-gray-400", title: e.bg.imagePath, children: e.bg.imagePath }) : null, t.jsx("input", { ref: he, type: "file", accept: "image/*", className: "hidden", onChange: (c) => {
    var _a2;
    lr((_a2 = c.target.files) == null ? void 0 : _a2[0]), c.target.value = "";
  } })] }), (Y == null ? void 0 : Y.type) === "text" ? t.jsxs(Rt, { title: "\uC120\uD0DD \xB7 \uD14D\uC2A4\uD2B8", icon: nn, open: K.selection, onToggle: () => De("selection"), children: [t.jsxs("div", { className: "flex flex-col gap-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAE00\uC790 \uD06C\uAE30" }), t.jsx(pn, { min: 6, max: 400, step: 1, suffix: "px", value: Y.fontSize, resetValue: 36, "aria-label": "\uAE00\uC790 \uD06C\uAE30", decreaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uC904\uC774\uAE30", increaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uD0A4\uC6B0\uAE30", onChange: (c) => s(Be(e, Y.id, { fontSize: c })) })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD3F0\uD2B8 (font-family)" }), t.jsx(wr, { id: "cover-text-font-family", value: Y.fontFamily || "", onChange: (c) => {
    const m = c.trim();
    s({ ...e, elements: e.elements.map((k) => {
      if (k.id !== Y.id || k.type !== "text") return k;
      const T = { ...k };
      return m ? T.fontFamily = m : delete T.fontFamily, T;
    }) });
  }, options: tt, placeholder: "\uC608: Paperozi, sans-serif", inputClassName: "!px-2 !py-1 !text-xs" }), t.jsx("p", { className: "text-[10px] leading-snug text-gray-400 dark:text-odp-fgMuted", children: "\uC6F9\uD3F0\uD2B8\uB294 \uC124\uC815 \u2192 \uC6F9\uD3F0\uD2B8(CSS)\uC5D0\uC11C \uCD94\uAC00\uD569\uB2C8\uB2E4." })] }), t.jsxs("div", { className: "space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAD75\uAE30 (font-weight)" }), t.jsxs($t, { value: as(Y.fontWeight), onValueChange: (c) => s(Be(e, Y.id, { fontWeight: is(c) })), children: [t.jsxs(_t, { "aria-label": "\uD3F0\uD2B8 \uAD75\uAE30", className: "inline-flex h-8 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg", children: [t.jsx(Ft, {}), t.jsx(Ht, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Wt, { children: t.jsx(Kt, { className: "z-[10050] max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: os.map((c) => t.jsxs(Gt, { value: c.value, className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(jt, { size: 12 }) }), t.jsx(Ut, { children: c.label })] }, c.value)) }) }) })] })] }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 text-[10px] text-gray-400", children: "\uD14D\uC2A4\uD2B8 \uC815\uB82C" }), t.jsx(gu, { value: Y.textAlign, onChange: (c) => s(Be(e, Y.id, { textAlign: c })) })] }), t.jsx(kt, { value: Y.color, onChange: (c) => s(Be(e, Y.id, { color: c || "#111111" })), allowNone: false, label: "\uAE00\uC790\uC0C9", compact: true })] }) : null, (Y == null ? void 0 : Y.type) === "image" ? t.jsxs(Rt, { title: "\uC120\uD0DD \xB7 \uC774\uBBF8\uC9C0", icon: Yn, open: K.selection, onToggle: () => De("selection"), children: [t.jsx("p", { className: "truncate text-[10px] text-gray-400", title: Y.path, children: Y.path }), t.jsxs("div", { className: "flex items-center justify-between gap-2 py-1", children: [t.jsxs("div", { children: [t.jsx("div", { className: "text-[11px] text-gray-600 dark:text-odp-fg", children: "\uBB34\uC870\uAC74 \uBE44\uC728 \uC720\uC9C0" }), t.jsx("p", { className: "text-[10px] text-gray-400", children: "\uCF1C\uBA74 \uB9AC\uC0AC\uC774\uC988 \uC2DC \uCC0C\uADF8\uB7EC\uC9C0\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." })] }), t.jsxs(Lt, { children: [t.jsx(zt, { asChild: true, children: t.jsx(tr, { className: xr(!!Y.lockAspect), checked: !!Y.lockAspect, onCheckedChange: (c) => {
    s({ ...e, elements: e.elements.map((m) => {
      if (m.id !== Y.id || m.type !== "image") return m;
      const k = { ...m };
      return c ? k.lockAspect = true : delete k.lockAspect, k;
    }) });
  }, "aria-label": "\uBB34\uC870\uAC74 \uBE44\uC728 \uC720\uC9C0", children: t.jsx(rr, { className: gr }) }) }), t.jsx(At, { children: t.jsxs(It, { className: Bt, side: "top", sideOffset: 6, children: ["\uBB34\uC870\uAC74 \uBE44\uC728 \uC720\uC9C0", t.jsx(Dt, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }), t.jsx(ye, { tip: "\uC6D0\uBCF8 \uBE44\uC728\uB85C \uB418\uB3CC\uB9AC\uAE30", className: `${Mt} w-full`, disabled: !Y.naturalAspect, onClick: () => {
    if (!Y.naturalAspect) return;
    const c = Y.naturalAspect, m = Y.x + Y.w / 2, k = Y.y + Y.h / 2, B = Y.w * 210 / (297 * c);
    let O = m - Y.w / 2, le = k - B / 2;
    O = Math.min(Math.max(0, O), 100 - Y.w), le = Math.min(Math.max(0, le), 100 - B), s(Be(e, Y.id, { x: O, y: le, h: Math.min(100, Math.max(4, B)) }));
  }, children: "\uC6D0\uBCF8 \uBE44\uC728\uB85C \uB418\uB3CC\uB9AC\uAE30" }), t.jsx(ye, { tip: "\uC774\uBBF8\uC9C0 \uAD50\uCCB4", className: `${Mt} w-full`, onClick: () => {
    ie.current && (ie.current.dataset.coverImageMode = "replace", ie.current.click());
  }, children: "\uC774\uBBF8\uC9C0 \uAD50\uCCB4" })] }) : null, Y && kr(Y) ? t.jsxs(Rt, { title: "\uC120\uD0DD \xB7 \uB3C4\uD615", icon: sn, open: K.selection, onToggle: () => De("selection"), children: [t.jsx(kt, { value: Y.fill, onChange: (c) => s(Be(e, Y.id, { fill: c || "transparent" })), allowNone: true, label: "\uCC44\uC6B0\uAE30", compact: true }), t.jsx(kt, { value: Y.borderColor, onChange: (c) => s(Be(e, Y.id, { borderColor: c || "transparent" })), allowNone: true, label: "\uD14C\uB450\uB9AC \uC0C9", compact: true }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD14C\uB450\uB9AC \uB450\uAED8" }), t.jsx(vt, { unit: "css", suffix: "px", min: 0, max: 40, step: 1, value: Y.borderWidth, "aria-label": "\uD14C\uB450\uB9AC \uB450\uAED8", onChange: (c) => s(Be(e, Y.id, { borderWidth: c })) })] }), t.jsxs("div", { className: "space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD14C\uB450\uB9AC \uC2A4\uD0C0\uC77C" }), t.jsxs($t, { value: Y.borderStyle, onValueChange: (c) => {
    c !== "solid" && c !== "dashed" && c !== "dotted" || s(Be(e, Y.id, { borderStyle: c }));
  }, children: [t.jsxs(_t, { "aria-label": "\uD14C\uB450\uB9AC \uC2A4\uD0C0\uC77C", className: "inline-flex h-8 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg", children: [t.jsx(Ft, {}), t.jsx(Ht, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Wt, { children: t.jsx(Kt, { className: "z-[10050] max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: [{ value: "solid", label: "\uC2E4\uC120" }, { value: "dashed", label: "\uD30C\uC120" }, { value: "dotted", label: "\uC810\uC120" }].map((c) => t.jsxs(Gt, { value: c.value, className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(jt, { size: 12 }) }), t.jsx(Ut, { children: c.label })] }, c.value)) }) }) })] })] }), Y.type === "roundRect" ? t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uBAA8\uC11C\uB9AC \uB465\uAE00\uAE30" }), t.jsx(vt, { unit: "percent", suffix: "%", min: 0, max: 50, step: 1, value: Y.cornerRadiusPct ?? 4, "aria-label": "\uBAA8\uC11C\uB9AC \uB465\uAE00\uAE30", onChange: (c) => s(Be(e, Y.id, { cornerRadiusPct: c })) })] }) : null, t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uB3C4\uD615 \uC548 \uD14D\uC2A4\uD2B8" }), t.jsx("textarea", { className: "min-h-16 w-full resize-y rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg", value: Y.text ?? "", placeholder: "\uC120\uD0DD \uC0AC\uD56D", onChange: (c) => s(Be(e, Y.id, { text: c.target.value })) })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uC548\uCABD \uC5EC\uBC31" }), t.jsx(vt, { unit: "percent", suffix: "%", min: 0, max: 40, step: 1, value: Y.paddingPct ?? 0, "aria-label": "\uB3C4\uD615 \uC548\uCABD \uC5EC\uBC31", onChange: (c) => s(Be(e, Y.id, { paddingPct: c })) })] }), t.jsxs("div", { className: "flex flex-col gap-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAE00\uC790 \uD06C\uAE30" }), t.jsx(pn, { min: 6, max: 400, step: 1, suffix: "px", value: Y.fontSize ?? 24, resetValue: 24, "aria-label": "\uB3C4\uD615 \uAE00\uC790 \uD06C\uAE30", decreaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uC904\uC774\uAE30", increaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uD0A4\uC6B0\uAE30", onChange: (c) => s(Be(e, Y.id, { fontSize: c })) })] }), t.jsxs("div", { className: "space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAD75\uAE30 (font-weight)" }), t.jsxs($t, { value: as(Y.fontWeight ?? "normal"), onValueChange: (c) => s(Be(e, Y.id, { fontWeight: is(c) })), children: [t.jsxs(_t, { "aria-label": "\uB3C4\uD615 \uAE00\uC790 \uAD75\uAE30", className: "inline-flex h-8 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg", children: [t.jsx(Ft, {}), t.jsx(Ht, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Wt, { children: t.jsx(Kt, { className: "z-[10050] max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: os.map((c) => t.jsxs(Gt, { value: c.value, className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(jt, { size: 12 }) }), t.jsx(Ut, { children: c.label })] }, c.value)) }) }) })] })] }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 text-[10px] text-gray-400", children: "\uD14D\uC2A4\uD2B8 \uC704\uCE58" }), t.jsx(bu, { textAlign: Y.textAlign ?? "center", textVAlign: Y.textVAlign ?? "middle", onTextAlignChange: (c) => s(Be(e, Y.id, { textAlign: c })), onTextVAlignChange: (c) => s(Be(e, Y.id, { textVAlign: c })) })] }), t.jsx(kt, { value: Y.color ?? "#0c4a6e", onChange: (c) => s(Be(e, Y.id, { color: c || "#0c4a6e" })), allowNone: false, label: "\uAE00\uC790\uC0C9", compact: true })] }) : null, r.length > 1 ? t.jsxs(Rt, { title: `\uC120\uD0DD \xB7 ${r.length}\uAC1C`, icon: ic, open: K.selection, onToggle: () => De("selection"), children: [t.jsx("p", { className: "text-[10px] text-gray-400", children: "\uB4DC\uB798\uADF8\uD558\uBA74 \uD568\uAED8 \uC774\uB3D9\uD569\uB2C8\uB2E4. Mod+G\uB85C \uADF8\uB8F9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uCCB4\uD06C\uB97C \uD574\uC81C\uD558\uBA74 \uC120\uD0DD\uC5D0\uC11C \uBE60\uC9D1\uB2C8\uB2E4." }), t.jsx("ul", { className: "mt-2 max-h-52 space-y-0.5 overflow-y-auto rounded-md border border-gray-200 p-1 dark:border-odp-borderStrong", children: r.map((c) => {
    const m = e.elements.find((T) => T.id === c);
    if (!m) return null;
    const k = $r(m);
    return t.jsx("li", { children: t.jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded px-1.5 py-1 hover:bg-gray-50 dark:hover:bg-odp-focusBg", children: [t.jsx(yc, { className: "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border border-gray-400 bg-white outline-none focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-500", checked: true, onCheckedChange: (T) => {
      T !== true && n(r.filter((M) => M !== c));
    }, "aria-label": `${k} \uC120\uD0DD \uD574\uC81C`, children: t.jsx(vc, { className: "text-white", children: t.jsx(jt, { size: 10, strokeWidth: 3 }) }) }), m.type === "text" ? t.jsx(nn, { size: 12, className: "shrink-0 text-gray-400", "aria-hidden": true }) : kr(m) ? t.jsx(sn, { size: 12, className: "shrink-0 text-gray-400", "aria-hidden": true }) : t.jsx(Yn, { size: 12, className: "shrink-0 text-gray-400", "aria-hidden": true }), t.jsx("span", { className: "min-w-0 flex-1 truncate text-[11px] text-gray-700 dark:text-odp-fg", children: k })] }) }, c);
  }) })] }) : null, t.jsx(Rt, { title: "\uB2E8\uCD95\uD0A4", icon: ac, open: K.shortcuts, onToggle: () => De("shortcuts"), titleClassName: "truncate text-[11px] font-semibold tracking-wide text-ink dark:text-odp-fgStrong", iconClassName: "shrink-0 text-ink dark:text-odp-fgStrong", children: t.jsx(xu, {}) })] }), t.jsx(wo, { edge: "right", handleProps: l, isResizing: u, visibleOnHover: true, label: "\uD45C\uC9C0 \uC0AC\uC774\uB4DC\uBC14 \uB108\uBE44 \uC870\uC808" })] }), f ? t.jsxs("aside", { className: "fixed bottom-0 z-30 flex border-r border-gray-200 bg-white/95 backdrop-blur-sm print:hidden dark:border-odp-borderSoft dark:bg-odp-bgSoft/95", style: { top: i, left: a, width: p }, "aria-label": "\uD45C\uC9C0 \uB808\uC774\uC5B4", children: [t.jsxs("div", { className: "relative flex min-h-0 w-full flex-col overflow-y-auto pb-16", children: [t.jsxs("div", { className: "sticky top-0 z-10 flex items-center gap-2 border-b border-gray-200 bg-white/95 px-3 py-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft/95", children: [t.jsxs("div", { className: "flex gap-1.5 items-center flex-1 text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-odp-fgStrong", children: [t.jsx(Un, { size: 14, className: "shrink-0 text-gray-700 dark:text-odp-fgStrong", "aria-hidden": true }), "\uB808\uC774\uC5B4"] }), t.jsx(ye, { tip: "\uBA54\uC778 \uC0AC\uC774\uB4DC\uBC14\uB85C \uD569\uCE58\uAE30", className: Re, onClick: () => g(false), children: t.jsx(lc, { size: 15 }) })] }), t.jsx("div", { className: "space-y-2 px-3 py-3", children: We })] }), t.jsx(wo, { edge: "right", handleProps: w, isResizing: x, visibleOnHover: true, label: "\uB808\uC774\uC5B4 \uC0AC\uC774\uB4DC\uBC14 \uB108\uBE44 \uC870\uC808" })] }) : null, t.jsx(vr, { isOpen: ee != null, title: "\uADF8\uB8F9 \uB0B4\uBD80 \uC815\uB82C", message: "\uC120\uD0DD\uD55C \uADF8\uB8F9 \uC548\uC758 \uAC1C\uCCB4\uB97C \uC815\uB82C\uD560\uAE4C\uC694?", confirmLabel: "\uC815\uB82C", cancelLabel: "\uCDE8\uC18C", onConfirm: ur, onCancel: () => Se(null) }), t.jsx(vr, { isOpen: Ne > 0, title: Ne === 2 ? "\uC7A0\uAE34 \uAC1C\uCCB4 \uC0AD\uC81C" : "\uAC1C\uCCB4 \uC0AD\uC81C", message: Ne === 2 ? "\uC7A0\uAE34 \uAC1C\uCCB4\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uC815\uB9D0 \uC0AD\uC81C\uD560\uAE4C\uC694?" : "\uC120\uD0DD\uD55C \uAC1C\uCCB4\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694?", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", variant: "danger", onConfirm: () => {
    if (Pe && Ne === 1) {
      Ae();
      return;
    }
    const c = et;
    at(), (c == null ? void 0 : c.ids.length) && Ge(c.ids, c.mode);
  }, onCancel: at }, `cover-sidebar-delete-${Ne}`)] }) });
}
const Si = new Va("s3haim-cover-undo-history");
Si.version(1).stores({ histories: "key, updatedAt" });
const hn = Si.histories, yo = 80, ku = 1440 * 60 * 1e3, ju = 400;
function Su(e, r) {
  return `cover:${rn(e, r)}`;
}
function Nu(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Su(e.type, e.id);
}
function vo(e) {
  return JSON.stringify(e);
}
function ko(e) {
  try {
    const r = JSON.parse(e);
    return !r || typeof r != "object" || !Array.isArray(r.elements) ? null : r;
  } catch {
    return null;
  }
}
function Ni(e) {
  return !Array.isArray(e) || e.length === 0 ? [] : e.length <= yo ? e : e.slice(e.length - yo);
}
async function Cu(e) {
  if (!e) return null;
  const r = await hn.get(e);
  return r ? typeof r.updatedAt == "number" && Date.now() - r.updatedAt > ku ? (await hn.delete(e), null) : !Array.isArray(r.stack) || r.stack.length === 0 ? null : r : null;
}
async function Eu({ key: e, stack: r, index: n }) {
  if (!e) return;
  const s = Ni(r), o = Math.max(0, Math.min(n ?? s.length - 1, s.length - 1));
  await hn.put({ key: e, stack: s, index: o, updatedAt: Date.now() });
}
async function Pu(e) {
  e && await hn.delete(e);
}
function jo(e, r, n) {
  const s = Array.isArray(e) && e.length > 0 ? e : [];
  if (s.length === 0) return { stack: [n], index: 0, changed: true };
  const o = Math.max(0, Math.min(r, s.length - 1));
  if (s[o] === n) return { stack: s, index: o, changed: false };
  const i = s.slice(0, o + 1);
  i.push(n);
  const a = Ni(i);
  return { stack: a, index: a.length - 1, changed: true };
}
function Tu({ currentFile: e = null, enabled: r, cover: n, applyCover: s }) {
  const o = r ? Nu(e) : null, i = d.useRef([]), a = d.useRef(0), u = d.useRef(false), l = d.useRef(null), f = d.useRef(null), g = d.useRef(null), p = d.useRef(null), x = d.useRef(s);
  x.current = s;
  const [w, y] = d.useState(0), b = d.useCallback(() => y((I) => I + 1), []), v = d.useCallback((I, _, U) => {
    f.current && clearTimeout(f.current), f.current = setTimeout(() => {
      f.current = null, Eu({ key: I, stack: _, index: U }).catch((A) => {
        console.warn("[cover-undo] save failed:", A);
      });
    }, 250);
  }, []), j = d.useCallback(() => {
    l.current && (clearTimeout(l.current), l.current = null);
    const I = p.current, _ = g.current;
    if (!I || _ == null) return;
    g.current = null;
    const U = jo(i.current, a.current, _);
    U.changed && (i.current = U.stack, a.current = U.index, v(I, U.stack, U.index), b());
  }, [b, v]);
  d.useEffect(() => {
    if (!r || !o || !n) return;
    let I = false;
    const _ = vo(n);
    return (async () => {
      var _a2;
      if (!(p.current === o && i.current.length > 0)) {
        p.current = o, g.current = null, l.current && (clearTimeout(l.current), l.current = null);
        try {
          const A = await Cu(o);
          if (I) return;
          if ((_a2 = A == null ? void 0 : A.stack) == null ? void 0 : _a2.length) {
            i.current = A.stack, a.current = Math.max(0, Math.min(A.index ?? A.stack.length - 1, A.stack.length - 1));
            const L = jo(i.current, a.current, _);
            i.current = L.stack, a.current = L.index;
          } else i.current = [_], a.current = 0;
          v(o, i.current, a.current), b();
        } catch (A) {
          if (console.warn("[cover-undo] load failed:", A), I) return;
          i.current = [_], a.current = 0, b();
        }
      }
    })(), () => {
      I = true;
    };
  }, [r, o, b, v]), d.useEffect(() => () => {
    l.current && clearTimeout(l.current), f.current && clearTimeout(f.current);
    const I = p.current;
    I && Pu(I).catch(() => {
    });
  }, []);
  const R = d.useCallback((I) => {
    x.current(I), !(u.current || !p.current) && (g.current = vo(I), l.current && clearTimeout(l.current), l.current = setTimeout(() => {
      l.current = null, j();
    }, ju));
  }, [j]), C = d.useCallback(() => {
    if (j(), a.current <= 0) return false;
    a.current -= 1;
    const I = i.current[a.current], _ = I ? ko(I) : null;
    if (!_) return false;
    u.current = true, x.current(_);
    const U = p.current;
    return U && v(U, i.current, a.current), b(), requestAnimationFrame(() => {
      u.current = false;
    }), true;
  }, [b, j, v]), E = d.useCallback(() => {
    if (j(), a.current >= i.current.length - 1) return false;
    a.current += 1;
    const I = i.current[a.current], _ = I ? ko(I) : null;
    if (!_) return false;
    u.current = true, x.current(_);
    const U = p.current;
    return U && v(U, i.current, a.current), b(), requestAnimationFrame(() => {
      u.current = false;
    }), true;
  }, [b, j, v]), $ = r && a.current > 0, W = r && a.current < i.current.length - 1;
  return { onCoverChange: R, undo: C, redo: E, canUndo: $, canRedo: W, flushPendingRecord: j };
}
function So(e, r) {
  const n = e ? qa(e) : "";
  if (n === null || n === "") return null;
  const s = n.match(/^(\d+(?:\.\d+)?)(px|%|vh|vw|mm|cm|in)$/i);
  if (!(s == null ? void 0 : s[1]) || !s[2]) return null;
  const o = Number(s[1]);
  if (!Number.isFinite(o)) return null;
  switch (s[2].toLowerCase()) {
    case "px":
      return o;
    case "%":
      return o / 100 * r;
    case "mm":
      return o * 96 / 25.4;
    case "cm":
      return o * 96 / 2.54;
    case "in":
      return o * 96;
    case "vh":
      return o / 100 * window.innerHeight;
    case "vw":
      return o / 100 * window.innerWidth;
    default:
      return null;
  }
}
function Ru(e, r, n, s) {
  const o = r / Math.max(1, n), i = e.getAttribute("data-wiki-width") || e.getAttribute("data-md-width") || "", a = e.getAttribute("data-wiki-height") || e.getAttribute("data-md-height") || "", u = So(i, s), l = So(a, s);
  if (u && u > 0 && l && l > 0) {
    const f = Math.min(u / r, l / n);
    return { width: r * f, height: n * f };
  }
  return u && u > 0 ? { width: u, height: u / o } : l && l > 0 ? { width: l * o, height: l } : { width: r, height: n };
}
function Mu(e, r, n) {
  d.useLayoutEffect(() => {
    const s = e.current, o = r.current;
    if (!s || !o) return;
    let i = 0;
    const a = () => {
      const p = o.getBoundingClientRect(), x = p.width, w = p.height;
      if (x < 1 || w < 1) return;
      const y = s.getBoundingClientRect().width || x, b = [...s.querySelectorAll("img")];
      for (const v of b) {
        if (v.hasAttribute("data-print-free-transform")) continue;
        const j = v.naturalWidth, R = v.naturalHeight;
        if (!j || !R) continue;
        const C = Ru(v, j, R, y), E = Math.min(x / C.width, w / C.height, 1), $ = Math.max(1, Math.round(C.width * E)), W = Math.max(1, Math.round(C.height * E)), I = `${$}px`, _ = `${W}px`;
        v.style.width !== I && (v.style.width = I), v.style.height !== _ && (v.style.height = _), v.style.objectFit !== "contain" && (v.style.objectFit = "contain"), v.setAttribute("data-print-aspect-fit", "1");
      }
    }, u = () => {
      i || (i = window.requestAnimationFrame(() => {
        i = 0, a();
      }));
    };
    a();
    const l = new ResizeObserver(u);
    l.observe(s), l.observe(o);
    const f = new MutationObserver(u);
    f.observe(s, { childList: true, subtree: true, attributes: true, attributeFilter: ["src", "data-wiki-width", "data-wiki-height", "data-md-width", "data-md-height"] });
    const g = [...s.querySelectorAll("img")];
    for (const p of g) p.complete || p.addEventListener("load", u);
    return () => {
      i && window.cancelAnimationFrame(i), l.disconnect(), f.disconnect();
      for (const p of g) p.removeEventListener("load", u);
    };
  }, [n, r, e]);
}
const gs = "data-print-table-fit";
function No(e) {
  e.style.transform = "", e.style.transformOrigin = "", e.style.marginRight = "", e.style.marginBottom = "", e.style.maxWidth = "", e.removeAttribute(gs);
}
function Lu(e, r) {
  d.useLayoutEffect(() => {
    const n = e.current;
    if (!n) return;
    let s = 0, o = false;
    const i = () => {
      const f = n.clientWidth;
      if (!(f < 1)) {
        o = true;
        try {
          const g = [...n.querySelectorAll("table")];
          for (const p of g) {
            No(p), p.style.maxWidth = "none";
            const x = p.scrollWidth, w = p.offsetHeight;
            if (x <= f + 1) {
              p.style.maxWidth = `${f}px`, p.setAttribute(gs, "1");
              continue;
            }
            const y = Math.max(0.05, Math.min(1, f / x));
            p.style.maxWidth = "none", p.style.transformOrigin = "top left", p.style.transform = `scale(${y})`, p.style.marginRight = `${-Math.round(x * (1 - y))}px`, p.style.marginBottom = `${-Math.round(w * (1 - y))}px`, p.setAttribute(gs, String(Number(y.toFixed(4))));
          }
        } finally {
          o = false;
        }
      }
    }, a = () => {
      o || s || (s = window.requestAnimationFrame(() => {
        s = 0, i();
      }));
    };
    i();
    const u = new ResizeObserver(a);
    u.observe(n);
    const l = new MutationObserver(() => {
      o || a();
    });
    return l.observe(n, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "data-haim-box-w", "data-haim-box-h", "data-haim-width", "width"] }), () => {
      s && window.cancelAnimationFrame(s), u.disconnect(), l.disconnect();
      for (const f of n.querySelectorAll("table")) No(f);
    };
  }, [r, e]);
}
const bs = "data-print-mermaid-fit";
function zu(e) {
  e.style.transform = "", e.style.transformOrigin = "", e.style.marginRight = "", e.style.marginBottom = "", e.style.maxWidth = "", e.style.width = "", e.removeAttribute(bs);
}
function Au(e, r, n) {
  d.useLayoutEffect(() => {
    const s = e.current, o = r.current;
    if (!s || !o) return;
    let i = 0, a = false;
    const u = () => {
      const p = o.getBoundingClientRect(), x = p.width, w = p.height;
      if (!(x < 1 || w < 1)) {
        a = true;
        try {
          const y = [...s.querySelectorAll(".md-editor-mermaid[data-processed]")];
          for (const b of y) {
            zu(b);
            const v = b.querySelector("svg"), j = Math.max(b.scrollWidth, b.offsetWidth, (v == null ? void 0 : v.getBoundingClientRect().width) ?? 0), R = Math.max(b.scrollHeight, b.offsetHeight, (v == null ? void 0 : v.getBoundingClientRect().height) ?? 0);
            if (j < 1 || R < 1) continue;
            const C = Math.min(x / j, w / R, 1);
            if (C >= 0.999) {
              b.setAttribute(bs, "1");
              continue;
            }
            b.style.transformOrigin = "top left", b.style.transform = `scale(${C})`, b.style.marginRight = `${-Math.round(j * (1 - C))}px`, b.style.marginBottom = `${-Math.round(R * (1 - C))}px`, b.setAttribute(bs, String(Number(C.toFixed(4))));
          }
        } finally {
          a = false;
        }
      }
    }, l = () => {
      a || i || (i = window.requestAnimationFrame(() => {
        i = 0, u();
      }));
    };
    u();
    const f = new ResizeObserver(l);
    f.observe(s), f.observe(o);
    const g = new MutationObserver(() => {
      a || l();
    });
    return g.observe(s, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-processed", "data-content"] }), () => {
      i && window.cancelAnimationFrame(i), f.disconnect(), g.disconnect();
    };
  }, [n, r, e]);
}
function Iu(e) {
  const r = d.useRef(null), [n, s] = d.useState(0);
  return d.useLayoutEffect(() => {
    const o = r.current;
    if (!o) return;
    const i = () => {
      const u = o.getBoundingClientRect().height;
      s((l) => Math.abs(l - u) < 0.5 ? l : u);
    };
    i();
    const a = new ResizeObserver(i);
    return a.observe(o), () => a.disconnect();
  }, [e]), { metricRef: r, pageInnerHeightPx: n };
}
const Ci = '.md-pgbr[data-md-pgbr="1"], .md-pgbr';
function or(e, r) {
  const n = r.getBoundingClientRect();
  return e.getBoundingClientRect().top - n.top + r.scrollTop;
}
function Vt(e) {
  return Math.max(e.offsetHeight, e.getBoundingClientRect().height, 1);
}
function Du(e, r) {
  return or(e, r) + Vt(e);
}
function Bu(e, r, n) {
  for (let s = 0; s < r.length; s += 1) {
    const o = r[s] ?? 0, i = r[s + 1] ?? n;
    if (e >= o - 0.5 && e < i - 0.5) return i;
  }
  return n;
}
function Ei(e) {
  for (const r of e.querySelectorAll(".md-pgbr")) r.style.paddingBottom = "";
}
function Ou(e, r, n) {
  if (Ei(e), r.length !== 0) for (const s of e.querySelectorAll(Ci)) {
    const o = or(s, e), i = Bu(o, r, n), a = Vt(s), u = Math.max(0, i - o - a);
    u > 0.5 && (s.style.paddingBottom = `${u}px`);
  }
}
function $u(e) {
  const r = [];
  for (const n of e.querySelectorAll(Ci)) {
    const s = Du(n, e);
    s > 0.5 && r.push(s);
  }
  return [...new Set(r.map((n) => Math.round(n * 10) / 10))].sort((n, s) => n - s);
}
function _u(e, r) {
  const n = [0];
  for (const s of e) s > (n[n.length - 1] ?? 0) + 0.5 && s < r - 0.5 && n.push(s);
  return (n[n.length - 1] ?? 0) < r - 0.5 && n.push(r), n;
}
function Fu(e) {
  const r = [];
  for (const n of e) {
    if (n.bottom - n.top < 0.5) continue;
    const s = r[r.length - 1];
    s && Math.abs(s.top - n.top) < 0.5 && Math.abs(s.bottom - n.bottom) < 0.5 || r.push(n);
  }
  return r;
}
function Fr(e) {
  const r = Fu([...e].sort((s, o) => s.top - o.top || s.bottom - o.bottom)), n = [];
  for (const s of r) {
    const o = n[n.length - 1];
    if (!o) {
      n.push({ ...s });
      continue;
    }
    const i = Math.min(o.bottom, s.bottom) - Math.max(o.top, s.top), a = Math.min(o.bottom - o.top, s.bottom - s.top);
    if (i > Math.max(1, a * 0.45)) {
      o.top = Math.min(o.top, s.top), o.bottom = Math.max(o.bottom, s.bottom);
      continue;
    }
    n.push(s);
  }
  return n;
}
function Hu(e) {
  var _a2;
  const r = e.parentElement;
  return !!(!r || r.closest('[aria-hidden="true"], .md-pgbr, .md-editor-code-head, .md-editor-code, pre, code, .md-editor-mermaid') || ((_a2 = r.closest("figure")) == null ? void 0 : _a2.querySelector("img")));
}
function Wu(e) {
  const r = [...e.querySelectorAll("img")].map((n) => {
    const s = n.closest("figure") ?? n, o = or(s, e);
    return { top: o, bottom: o + Vt(s) };
  });
  return Fr(r);
}
function Ku(e) {
  const r = [...e.querySelectorAll(".md-editor-mermaid")].map((n) => {
    const s = n.querySelector("svg"), o = or(n, e), i = Vt(n), a = s ? s.getBoundingClientRect().height : 0, u = Math.max(i, a);
    return { top: o, bottom: o + u };
  });
  return Fr(r);
}
function Xu(e) {
  const r = [], n = e.getBoundingClientRect().top, s = document.createTreeWalker(e, NodeFilter.SHOW_TEXT, { acceptNode(a) {
    var _a2;
    return !((_a2 = a.textContent) == null ? void 0 : _a2.trim()) || Hu(a) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
  } }), o = document.createRange();
  let i = s.nextNode();
  for (; i; ) {
    o.selectNodeContents(i);
    const a = o.getClientRects();
    for (let u = 0; u < a.length; u += 1) {
      const l = a.item(u);
      !l || l.height < 2 || l.width < 1 || r.push({ top: l.top - n + e.scrollTop, bottom: l.bottom - n + e.scrollTop });
    }
    i = s.nextNode();
  }
  return Fr(r);
}
function Gu(e) {
  const r = e.querySelector(".md-editor-code-head");
  return r ? Vt(r) : 0;
}
function Pi(e, r) {
  const n = or(e, r), s = Gu(e), o = Math.max(1, Vt(e) - s);
  return { top: n, bottom: n + o, height: o };
}
function Ti(e, r) {
  var _a2;
  const n = [...e.querySelectorAll("pre code .md-editor-code-block")];
  if (n.length > 0) return n.map((g) => {
    const p = or(g, r);
    return { top: p, bottom: p + Vt(g) };
  });
  const o = (_a2 = e.querySelector("pre")) == null ? void 0 : _a2.querySelector("code");
  if (!o) return [];
  const i = [], a = r.getBoundingClientRect().top, u = document.createRange(), l = document.createTreeWalker(o, NodeFilter.SHOW_TEXT, { acceptNode(g) {
    return g.textContent ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
  } });
  let f = l.nextNode();
  for (; f; ) {
    u.selectNodeContents(f);
    const g = u.getClientRects();
    for (let p = 0; p < g.length; p += 1) {
      const x = g.item(p);
      !x || x.height < 2 || x.width < 1 || i.push({ top: x.top - a + r.scrollTop, bottom: x.bottom - a + r.scrollTop });
    }
    f = l.nextNode();
  }
  return i;
}
function Yu(e) {
  const r = [];
  for (const n of e.querySelectorAll(".md-editor-code")) {
    const s = Pi(n, e), o = Ti(n, e);
    if (o.length === 0) continue;
    const i = o[o.length - 1];
    r.push({ top: s.top, bottom: s.bottom, lastLineTop: i.top, lastLineBottom: i.bottom });
  }
  return r;
}
function Uu(e, r) {
  for (const n of r) if (!(e < n.top - 0.5 || e > n.bottom + 0.5) && e >= n.lastLineTop - 0.5) return n.bottom;
  return e;
}
function Vu(e, r) {
  const n = [];
  for (const s of e.querySelectorAll(".md-editor-code")) {
    const o = Pi(s, e);
    if (o.height <= r + 0.5) {
      n.push({ top: o.top, bottom: o.bottom });
      continue;
    }
    n.push(...Ti(s, e));
  }
  return Fr(n);
}
function qu(e, r) {
  const s = [...e.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, figure, table, blockquote, ul, ol, hr, [data-haim-table]")].filter((o) => !o.closest(".md-editor-code")).map((o) => {
    const i = o, a = or(i, e);
    return { top: a, bottom: a + Vt(i) };
  });
  return Fr([...Wu(e), ...Ku(e), ...Xu(e), ...Vu(e, r), ...s]);
}
function Zu(e, r, n) {
  let s = n;
  for (const o of e) o !== r && o.bottom <= r.top + 0.5 && o.bottom > s && (s = o.bottom);
  return s;
}
function Ju(e, r, n, s) {
  const o = n.find((f) => f.top < e - 0.5 && f.bottom > e + 0.5 && f.bottom > r + 0.5);
  if (!o) return e;
  const i = o.bottom - o.top;
  if (i <= s + 0.5) return o.bottom;
  if (o.top > r + 0.5 && i > e - o.top + 0.5) return o.top;
  if (o.top <= r + 0.5 && i > s + 0.5 || o.top <= r + 0.5) return e;
  const u = Zu(n, o, r), l = o.top - u;
  return l >= 4 ? u + l / 2 : o.top;
}
function ws(e, r) {
  const n = e[e.length - 1];
  n != null && Math.abs(n - r) < 0.5 || e.push(r);
}
function Qu(e, r, n, s, o, i) {
  if (r <= e + 0.5) return;
  ws(i, e);
  let a = e;
  for (; a + n < r - 0.5; ) {
    const u = Math.min(a + n, r);
    let l = Ju(u, a, s, n);
    if (l = Uu(l, o), l <= a + 0.5 && (l = u), l >= r - 0.5) break;
    ws(i, l), a = l;
  }
}
function Co(e, r) {
  if (r <= 1) return [0];
  const n = e.scrollHeight, s = qu(e, r), o = Yu(e), i = $u(e), a = _u(i, n), u = [];
  for (let l = 0; l < a.length - 1; l += 1) {
    const f = a[l] ?? 0, g = a[l + 1] ?? n, p = l < i.length && Math.abs(g - (i[l] ?? 0)) < 1;
    Qu(f, g, r, s, o, u), p && g < n - 0.5 && ws(u, g);
  }
  return u.length === 0 && u.push(0), u;
}
function ef(e, r, n = 8) {
  if (r <= 1) return { pageStarts: [0], contentHeight: 0 };
  Ei(e);
  let s = Co(e, r), o = e.scrollHeight;
  for (let i = 0; i < n; i += 1) {
    Ou(e, s, o);
    const a = Co(e, r), u = e.scrollHeight, l = a.length === s.length && a.every((f, g) => Math.abs(f - (s[g] ?? 0)) < 0.5) && Math.abs(u - o) < 0.5;
    if (s = a, o = u, l) break;
  }
  return { pageStarts: s, contentHeight: o };
}
function tf(e, r, n) {
  const [s, o] = d.useState([0]), [i, a] = d.useState(0);
  return d.useLayoutEffect(() => {
    const u = e.current;
    if (!u || r <= 1) {
      o([0]), a(0);
      return;
    }
    let l = 0;
    const f = () => {
      const { pageStarts: y, contentHeight: b } = ef(u, r);
      o((v) => v.length === y.length && v.every((j, R) => Math.abs(j - (y[R] ?? 0)) < 0.5) ? v : y), a((v) => Math.abs(v - b) < 0.5 ? v : b);
    }, g = () => {
      l || (l = window.requestAnimationFrame(() => {
        l = 0, f();
      }));
    };
    f();
    const p = new ResizeObserver(g);
    p.observe(u);
    const x = new MutationObserver(g);
    x.observe(u, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["style", "class", "src", "width", "height"] });
    const w = [...u.querySelectorAll("img")];
    for (const y of w) y.complete || y.addEventListener("load", g);
    return () => {
      l && window.cancelAnimationFrame(l), p.disconnect(), x.disconnect();
      for (const y of w) y.removeEventListener("load", g);
    };
  }, [n, r, e]), { pageStarts: s, contentHeight: i };
}
function rf(e) {
  return e === "json" ? "application/json" : e === "raw" ? "text/plain" : e === "html" ? "text/html" : e === "svg" ? "image/svg+xml" : "text/markdown";
}
async function nf(e, r) {
  var _a2;
  const n = String(r ?? ""), s = String((e == null ? void 0 : e.id) || "").trim(), o = (e == null ? void 0 : e.type) || "s3";
  if (!s) throw new Error("\uC800\uC7A5\uD560 \uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
  if (o === "session") return { mode: "pending-only" };
  const i = Bo(), a = rf(e == null ? void 0 : e.viewer);
  if (o === "local") {
    const f = (e == null ? void 0 : e.handle) ?? (i.localRootHandle ? await Za(i.localRootHandle, s) : null);
    if (!f) throw new Error("\uB85C\uCEEC \uD30C\uC77C \uD578\uB4E4\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    const g = await f.createWritable();
    return await g.write(n), await g.close(), await Fn(rn("local", s)), { mode: "storage" };
  }
  if (o === "webdav") {
    const f = i.webdavConfig;
    if (!(f == null ? void 0 : f.endpoint) || !(f == null ? void 0 : f.username)) throw new Error("WebDAV\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
    return await Oo(f).writeText(s, n, a), await Fn(rn("webdav", s)), { mode: "storage" };
  }
  const u = typeof i.getS3Client == "function" ? i.getS3Client() : null, l = (_a2 = i.s3Creds) == null ? void 0 : _a2.bucket;
  if (!u || !l) throw new Error("S3 \uD074\uB77C\uC774\uC5B8\uD2B8\uB97C \uCD08\uAE30\uD654\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  return await Ja(u, { Bucket: l, Key: s, Body: n, ContentType: a }), await Fn(rn("s3", s)), { mode: "storage" };
}
function Ri(e) {
  return String(e ?? "").replace(/\s+/g, " ").trim();
}
function xn(e) {
  let r = String(e ?? "");
  r = r.replace(/!\[[^\]]*]\([^)]*\)/g, ""), r = r.replace(/\[([^\]]*)]\([^)]*\)/g, "$1"), r = r.replace(/`([^`]+)`/g, "$1");
  for (let n = 0; n < 3; n += 1) r = r.replace(/\*\*([^*]+)\*\*/g, "$1"), r = r.replace(/__([^_]+)__/g, "$1"), r = r.replace(/~~([^~]+)~~/g, "$1"), r = r.replace(/(^|[^*\w])\*([^*\n]+)\*(?=[^*\w]|$)/g, "$1$2"), r = r.replace(/(^|[^A-Za-z0-9_])_([^_\n]+)_(?=[^A-Za-z0-9_]|$)/g, "$1$2");
  return Ri(r);
}
const Mi = /^<pgbr\s*\/?\s*>$/i;
function sf(e) {
  return /^\s*(```+|~~~+)/.test(e);
}
function gn(e) {
  return String(e ?? "").replace(/\s+/g, " ").trim();
}
function of(e) {
  const r = e.parentElement;
  return !!(!r || r.closest('[aria-hidden="true"], .md-pgbr, .export-pdf-paper-metric'));
}
function af(e) {
  const r = [], n = document.createTreeWalker(e, NodeFilter.SHOW_TEXT, { acceptNode(i) {
    return !i.textContent || of(i) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
  } }), s = document.createRange();
  let o = n.nextNode();
  for (; o; ) {
    const i = o, a = i.textContent ?? "";
    s.selectNodeContents(i);
    const u = [...s.getClientRects()].filter((f) => f.height >= 2 && f.width >= 1);
    if (u.length === 0) {
      o = n.nextNode();
      continue;
    }
    if (u.length === 1) {
      const f = u[0];
      f && r.push({ top: f.top, bottom: f.bottom, left: f.left, right: f.right, text: a }), o = n.nextNode();
      continue;
    }
    let l = 0;
    for (const f of u) {
      let g = -1, p = -1;
      for (let x = l; x < a.length; x += 1) {
        s.setStart(i, x), s.setEnd(i, x + 1);
        const w = s.getBoundingClientRect();
        if (w.height < 1 && w.width < 1) continue;
        if (Math.min(w.bottom, f.bottom) - Math.max(w.top, f.top) > Math.min(w.height || f.height, f.height) * 0.45) {
          g < 0 && (g = x), p = x + 1;
          continue;
        }
        if (g >= 0) break;
      }
      g >= 0 && p >= 0 && (r.push({ top: f.top, bottom: f.bottom, left: f.left, right: f.right, text: a.slice(g, p) }), l = p);
    }
    o = n.nextNode();
  }
  return r;
}
function lf(e) {
  const r = [...e].sort((s, o) => s.top - o.top || s.left - o.left), n = [];
  for (const s of r) {
    const o = n[n.length - 1], i = o == null ? void 0 : o[0];
    if (i && Math.abs(s.top - i.top) <= 3) {
      o.push(s);
      continue;
    }
    n.push([s]);
  }
  for (const s of n) s.sort((o, i) => o.left - i.left);
  return n;
}
function cf(e, r, n) {
  const s = lf(af(e));
  if (!s.length) return null;
  let o = s.findIndex((l) => l.some((f) => r >= f.left && r <= f.right && n >= f.top && n <= f.bottom));
  if (o < 0 && (o = s.findIndex((l) => {
    const f = Math.min(...l.map((p) => p.top)), g = Math.max(...l.map((p) => p.bottom));
    return n >= f && n <= g;
  })), o < 0) {
    let l = 1 / 0;
    s.forEach((f, g) => {
      const p = Math.min(...f.map((y) => y.top)), x = Math.max(...f.map((y) => y.bottom)), w = n < p ? p - n : n > x ? n - x : 0;
      w < l && (l = w, o = g);
    });
  }
  const i = o >= 0 ? s[o] : null;
  if (!i) return null;
  const a = gn(i.map((l) => l.text).join(""));
  if (!a) return null;
  let u = 0;
  for (let l = 0; l < o; l += 1) gn((s[l] ?? []).map((g) => g.text).join("")) === a && (u += 1);
  return { lineText: a, occurrence: u, top: Math.min(...i.map((l) => l.top)), left: Math.min(...i.map((l) => l.left)), right: Math.max(...i.map((l) => l.right)), bottom: Math.max(...i.map((l) => l.bottom)) };
}
function df(e, r) {
  var _a2;
  let n = r - 1;
  for (; n >= 0 && !((_a2 = e[n]) == null ? void 0 : _a2.trim()); ) n -= 1;
  if (n >= 0 && Mi.test((e[n] ?? "").trim())) return e.join(`
`);
  const s = ["<pgbr/>", ""];
  r > 0 && (e[r - 1] ?? "").trim() !== "" && s.unshift("");
  const o = [...e];
  return o.splice(r, 0, ...s), o.join(`
`);
}
function uf(e) {
  let r = 0;
  for (; r < e.length; ) {
    const s = e.slice(r).match(/^ {0,3}>\s?/);
    if (!(s == null ? void 0 : s[0])) break;
    r += s[0].length;
  }
  const n = e.slice(r).match(/^(?:[-*+]|\d+[.)])\s+(?:\[[ xX]\]\s+)?/);
  return (n == null ? void 0 : n[0]) && (r += n[0].length), r;
}
function ff(e, r, n = 0) {
  const s = e.slice(n);
  if (!s.trim()) return -1;
  const o = s.indexOf(r);
  if (o >= 0) return n + o;
  const i = gn(r);
  if (!i) return -1;
  const a = xn(s);
  if (a.length >= 8 && (a.includes(i) || i.includes(a))) return n;
  let u = "";
  const l = [];
  for (let g = 0; g < s.length; g += 1) {
    const p = s[g] ?? "";
    if (/\s/.test(p)) {
      if (u.endsWith(" ") || u.length === 0) continue;
      u += " ", l.push(n + g);
      continue;
    }
    u += p, l.push(n + g);
  }
  const f = u.indexOf(i);
  return f < 0 ? -1 : l[f] ?? -1;
}
function pf(e, r, n) {
  const s = gn(r);
  if (!s || !Number.isInteger(n) || n < 0) return { markdown: e, updated: false };
  const o = String(e ?? "").split(`
`);
  let i = false, a = -1;
  for (let u = 0; u < o.length; u += 1) {
    const l = o[u] ?? "";
    if (sf(l)) {
      i = !i;
      continue;
    }
    if (i) continue;
    const f = uf(l), g = xn(l), p = xn(l.slice(f)), x = g === s || p === s, w = !x && s.length >= 8 && (g.includes(s) || p.includes(s));
    if ((x || w ? p === s || p.includes(s) ? f : 0 : ff(l, s)) < 0 && !x && !w || (a += 1, a !== n)) continue;
    if ((() => {
      let j = u - 1;
      for (; j >= 0 && !(o[j] ?? "").trim(); ) j -= 1;
      return j >= 0 && Mi.test((o[j] ?? "").trim());
    })()) return { markdown: e, updated: false };
    const v = df(o, u);
    return { markdown: v, updated: v !== e };
  }
  return { markdown: e, updated: false };
}
const mf = /^<pgbr\s*\/?\s*>$/i;
function Li(e) {
  return /^\s*(```+|~~~+)/.test(e);
}
const Eo = Ri, Po = xn;
function zi() {
  return Qa("print-heading");
}
function hf(e, r) {
  if (!Number.isInteger(r) || r < 1) return -1;
  const n = zi().parse(String(e ?? ""), {});
  let s = 0;
  for (const o of n) if (!(o.type !== "heading_open" || !o.map) && (s += 1, s === r)) return o.map[0] ?? -1;
  return -1;
}
function xf(e) {
  const n = String(e.id || "").match(/^pdf-ex-heading-(\d+)$/);
  if (!(n == null ? void 0 : n[1])) return null;
  const s = Number(n[1]);
  return Number.isInteger(s) && s >= 1 ? s : null;
}
function gf(e) {
  const r = String(e ?? "").split(`
`), n = [];
  let s = false;
  for (let o = 0; o < r.length; o += 1) {
    const i = r[o] ?? "";
    if (Li(i)) {
      s = !s;
      continue;
    }
    if (s) continue;
    const a = i.trim();
    if (a) {
      if (/^<hr\b[^>]*\/?>$/i.test(a)) {
        n.push(o);
        continue;
      }
      (/^(\*\s*){3,}$/.test(a) || /^(-\s*){3,}$/.test(a) || /^(_\s*){3,}$/.test(a)) && n.push(o);
    }
  }
  return { lines: r, indexes: n };
}
function Ai(e, r) {
  let n = r - 1;
  for (; n >= 0 && !(e[n] ?? "").trim(); ) n -= 1;
  if (n >= 0 && mf.test((e[n] ?? "").trim())) return e.join(`
`);
  const s = ["<pgbr/>", ""];
  r > 0 && (e[r - 1] ?? "").trim() !== "" && s.unshift("");
  const o = [...e];
  return o.splice(r, 0, ...s), o.join(`
`);
}
function Rn(e, r) {
  var _a2;
  const n = ls(e), s = r(n.body);
  return s.updated ? n.cover ? { markdown: cs(s.markdown, n.cover), updated: true } : ((_a2 = n.match) == null ? void 0 : _a2[0]) ? { markdown: `${n.match[0]}
${s.markdown.replace(/^\uFEFF/, "")}`, updated: true } : s : { markdown: e, updated: false };
}
function Ii(e, r, n, s) {
  const o = Po(r), i = Number.isInteger(s) && s != null && s >= 1;
  return !i && (!o || !Number.isInteger(n) || n < 0) ? { markdown: e, updated: false } : Rn(e, (a) => {
    let u = -1;
    if (i && (u = hf(a, s)), u < 0 && o) {
      const g = zi().parse(a, {});
      let p = -1;
      for (let x = 0; x < g.length; x += 1) {
        const w = g[x];
        if ((w == null ? void 0 : w.type) !== "heading_open" || !w.map) continue;
        const y = g[x + 1], b = (y == null ? void 0 : y.type) === "inline" ? String(y.content ?? "") : "";
        if (Po(b) === o && (p += 1, p === n)) {
          u = w.map[0] ?? -1;
          break;
        }
      }
    }
    if (u < 0) return { markdown: a, updated: false };
    const l = a.split(`
`), f = Ai(l, u);
    return { markdown: f, updated: f !== a };
  });
}
function bf(e, r) {
  return !Number.isInteger(r) || r < 0 ? { markdown: e, updated: false } : Rn(e, (n) => {
    const { lines: s, indexes: o } = gf(n), i = o[r];
    if (!Number.isInteger(i)) return { markdown: n, updated: false };
    const a = Ai(s, i);
    return { markdown: a, updated: a !== n };
  });
}
function wf(e, r, n) {
  return Rn(e, (s) => pf(s, r, n));
}
function yf(e, r) {
  return !Number.isInteger(r) || r < 0 ? { markdown: e, updated: false } : Rn(e, (n) => {
    const s = n.split(`
`);
    let o = false, i = -1, a = false;
    const u = s.map((l) => Li(l) ? (o = !o, l) : o || !/<pgbr\s*\/?\s*>/i.test(l) ? l : l.replace(/<pgbr\s*\/?\s*>/gi, (f) => (i += 1, i !== r ? f : (a = true, ""))));
    return a ? { markdown: u.join(`
`), updated: true } : { markdown: n, updated: false };
  });
}
function vf(e, r) {
  const n = Eo(To(r)), s = xf(r), o = [...e.querySelectorAll("h1, h2, h3, h4, h5, h6")].filter((l) => e.contains(l)), i = o.findIndex((l) => l === r), a = s ?? (i < 0 ? 1 : i + 1);
  let u = 0;
  for (const l of o) {
    if (l === r) break;
    Eo(To(l)) === n && (u += 1);
  }
  return { text: n, occurrence: u, headingIndex: a };
}
function To(e) {
  const r = e.cloneNode(true);
  return r.querySelectorAll('.md-preview-heading-fold-chevron, [aria-hidden="true"], button').forEach((n) => n.remove()), r.textContent || "";
}
const kf = "fixed z-100050 min-w-[200px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", jf = "flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-800 outline-none hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-surface", Sf = "flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 outline-none hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40", Ro = "h-3.5 w-3.5 shrink-0";
function es(e, r) {
  const n = e.getBoundingClientRect();
  return { left: n.left, top: r, width: Math.max(1, n.width) };
}
function Nf(e, r, n) {
  const s = r();
  let o;
  return e.kind === "heading" ? o = Ii(s, e.headingText, e.occurrence, e.headingIndex) : e.kind === "hr" ? o = bf(s, e.hrIndex) : e.kind === "line" ? o = wf(s, e.lineText, e.occurrence) : o = yf(s, e.occurrence), !o.updated || o.markdown === s ? false : (n(o.markdown), true);
}
function Cf({ containerEl: e, containerRef: r, paperContentRef: n, getMarkdown: s, setMarkdown: o }) {
  const i = $o(), [a, u] = d.useState(false), [l, f] = d.useState(null), [g, p] = d.useState(false), x = d.useRef(null), w = d.useRef(s), y = d.useRef(o);
  w.current = s, y.current = o;
  const b = d.useCallback((I) => {
    x.current = I, f(I), p(false), u(true);
  }, []), v = d.useCallback(() => {
    u(false), p(false), f(null), x.current = null;
  }, []), j = d.useCallback((I) => {
    I && (Nf(I, w.current, y.current), x.current = null, u(false), p(false), f(null));
  }, []);
  d.useEffect(() => {
    const I = e ?? (r == null ? void 0 : r.current) ?? null;
    if (!I) return;
    const _ = (A) => {
      var _a2, _b, _c2, _d2;
      const L = ".export-pdf-cover, [data-cover-slide], [data-cover-el], [data-cover-shape]";
      if (((_b = (_a2 = A.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, L)) || ((_d2 = (_c2 = document.elementFromPoint(A.clientX, A.clientY)) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, L))) return true;
      for (const V of I.querySelectorAll(L)) {
        const re = V.getBoundingClientRect();
        if (A.clientX >= re.left && A.clientX <= re.right && A.clientY >= re.top && A.clientY <= re.bottom) return true;
      }
      return false;
    }, U = (A) => {
      var _a2, _b, _c2, _d2, _e2, _f, _g, _h, _i, _j, _k, _l2;
      if (_(A) || A.ctrlKey) return;
      const L = n.current, Q = A.target instanceof Element ? A.target : (_a2 = A.target) == null ? void 0 : _a2.parentElement, V = (() => {
        var _a3, _b2;
        if (L && Q && L.contains(Q)) return L;
        const D = ((_a3 = Q == null ? void 0 : Q.closest) == null ? void 0 : _a3.call(Q, ".md-editor-preview")) ?? ((_b2 = Q == null ? void 0 : Q.closest) == null ? void 0 : _b2.call(Q, "[data-export-pdf-preview]"));
        return D instanceof HTMLElement ? D : L;
      })();
      if (!V) return;
      const re = L && L.clientWidth > 0 ? L : V, ge = (_c2 = (_b = A.target) == null ? void 0 : _b.closest) == null ? void 0 : _c2.call(_b, '.md-pgbr[data-md-pgbr="1"], .md-pgbr');
      if (ge && V.contains(ge)) {
        A.preventDefault(), A.stopPropagation();
        const X = [...V.querySelectorAll('.md-pgbr[data-md-pgbr="1"], .md-pgbr')].findIndex((K) => K === ge);
        if (X < 0) return;
        b({ kind: "delete", x: A.clientX, y: A.clientY, occurrence: X, label: "\uD398\uC774\uC9C0 \uB098\uB204\uAE30" });
        return;
      }
      if (((_e2 = (_d2 = A.target) == null ? void 0 : _d2.closest) == null ? void 0 : _e2.call(_d2, "img[data-wiki-path], img[data-md-src]")) || ((_g = (_f = A.target) == null ? void 0 : _f.closest) == null ? void 0 : _g.call(_f, "table"))) return;
      const oe = (_i = (_h = A.target) == null ? void 0 : _h.closest) == null ? void 0 : _i.call(_h, "h1, h2, h3, h4, h5, h6");
      if (oe instanceof HTMLElement && V.contains(oe)) {
        A.preventDefault(), A.stopPropagation();
        const { text: D, occurrence: X, headingIndex: K } = vf(V, oe), be = oe.getBoundingClientRect();
        b({ kind: "heading", x: A.clientX, y: A.clientY, headingText: D || ((_j = oe.textContent) == null ? void 0 : _j.trim()) || "", occurrence: X, headingIndex: K, preview: es(re, be.top), label: D || "\uC81C\uBAA9" });
        return;
      }
      const ie = (_l2 = (_k = A.target) == null ? void 0 : _k.closest) == null ? void 0 : _l2.call(_k, "hr");
      if (ie instanceof HTMLElement && V.contains(ie)) {
        A.preventDefault(), A.stopPropagation();
        const X = [...V.querySelectorAll("hr")].findIndex((be) => be === ie);
        if (X < 0) return;
        const K = ie.getBoundingClientRect();
        b({ kind: "hr", x: A.clientX, y: A.clientY, hrIndex: X, preview: es(re, K.top), label: "\uAD6C\uBD84\uC120" });
        return;
      }
      if (!(A.target instanceof Node) || !V.contains(A.target)) return;
      const he = cf(V, A.clientX, A.clientY);
      (he == null ? void 0 : he.lineText) && (A.preventDefault(), A.stopPropagation(), b({ kind: "line", x: A.clientX, y: A.clientY, lineText: he.lineText, occurrence: he.occurrence, preview: es(re, he.top), label: he.lineText }));
    };
    return I.addEventListener("contextmenu", U), () => I.removeEventListener("contextmenu", U);
  }, [e, r, b, n]), d.useEffect(() => {
    if (!a || i) return;
    const I = (U) => {
      var _a2, _b;
      U.button !== 0 || ((_b = (_a2 = U.target instanceof Element ? U.target : null) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, '[data-print-pgbr-menu="1"]')) || v();
    }, _ = (U) => {
      U.key === "Escape" && v();
    };
    return window.addEventListener("pointerdown", I, false), window.addEventListener("keydown", _), () => {
      window.removeEventListener("pointerdown", I, false), window.removeEventListener("keydown", _);
    };
  }, [v, i, a]);
  const R = !!(l && l.kind !== "delete" && g && "preview" in l), C = (I) => {
    if (I.button !== 0) return;
    I.preventDefault(), I.stopPropagation();
    const _ = x.current ?? l;
    j(_);
  }, E = (l == null ? void 0 : l.kind) === "delete" ? t.jsxs("button", { type: "button", "data-print-pgbr-action": "1", className: i ? el : Sf, onPointerUp: C, children: [t.jsx(wn, { className: Ro, "aria-hidden": true }), "\uD398\uC774\uC9C0 \uB098\uB204\uAE30 \uC0AD\uC81C"] }) : t.jsxs("button", { type: "button", "data-print-pgbr-action": "1", className: i ? tl : jf, onPointerEnter: () => p(true), onPointerLeave: () => p(false), onPointerUp: C, children: [t.jsx(cc, { className: Ro, "aria-hidden": true }), "\uD398\uC774\uC9C0 \uB098\uB204\uAE30 \uC0BD\uC785"] }), $ = R && l && "preview" in l ? rs.createPortal(t.jsxs("div", { className: "pointer-events-none fixed z-100040 print:hidden", style: { left: l.preview.left, top: Math.max(0, l.preview.top - 1), width: l.preview.width }, "aria-hidden": true, children: [t.jsx("div", { className: "border-t-2 border-dashed border-red-500 bg-red-500/10", style: { height: 12 } }), t.jsx("div", { className: "mt-0.5 inline-block rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow-sm", children: "\uD398\uC774\uC9C0 \uBD84\uD560 \uBBF8\uB9AC\uBCF4\uAE30" })] }), document.body) : null, W = a && l && !i ? rs.createPortal(t.jsx("div", { "data-print-pgbr-menu": "1", className: kf, style: { left: Math.min(l.x, window.innerWidth - 220), top: Math.min(l.y, window.innerHeight - 80) }, role: "menu", children: E }), document.body) : null;
  return t.jsxs(t.Fragment, { children: [$, i ? t.jsx(Ho, { open: a, onOpenChange: (I) => {
    I ? u(true) : v();
  }, title: (l == null ? void 0 : l.label) || "\uD398\uC774\uC9C0 \uB098\uB204\uAE30", subtitle: "\uC778\uC1C4 \uBBF8\uB9AC\uBCF4\uAE30", children: t.jsx("div", { "data-print-pgbr-menu": "1", onPointerEnter: () => {
    (l == null ? void 0 : l.kind) !== "delete" && p(true);
  }, onPointerLeave: () => p(false), children: E }) }) : W] });
}
const ts = "export-pdf-preview", Ef = "s3haim_print_toc_width", Pf = 360, Mo = ({ index: e }) => `pdf-ex-heading-${e}`, Tf = 2 / 3;
function Rf(e) {
  const r = window.innerHeight * Tf;
  let n = null;
  for (const s of e) (s == null ? void 0 : s.id) && s.getBoundingClientRect().top <= r && (n = s.id);
  return n;
}
const Mf = `
  :is(#export-pdf-preview, [data-export-pdf-preview]),
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview {
    background: #ffffff;
    color: #111827;
    font-family: var(--print-font-body, inherit);
    color-scheme: light;
    /* Force light table chrome even when html/app is .dark (preview.css). */
    --md-theme-table-stripe-color: #f9fafb;
    --md-theme-table-tr-bg-color: #ffffff;
    --md-theme-table-td-border-color: #e5e7eb;
    --md-theme-table-td-border-color-horizontal: #cbd5e1;
    --md-theme-table-border-color: #e5e7eb;
    --md-theme-table-thead-bg-color: #f3f4f6;
    --md-theme-table-th-color: #f3f4f6;
    --md-theme-table-tht-color: #1e3a8a;
    --md-theme-table-tr-nc-color: #f8fafc;
    --md-theme-table-trh-color: #f3f4f6;
    --md-theme-table-color: #111827;
    --md-theme-border-color: #e5e7eb;
    --md-theme-bg-color: #ffffff;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview [class$="-theme"] {
    color-scheme: light;
    --md-theme-table-stripe-color: #f9fafb;
    --md-theme-table-tr-bg-color: #ffffff;
    --md-theme-table-td-border-color: #e5e7eb;
    --md-theme-table-td-border-color-horizontal: #cbd5e1;
    --md-theme-table-border-color: #e5e7eb;
    --md-theme-table-thead-bg-color: #f3f4f6;
    --md-theme-table-th-color: #f3f4f6;
    --md-theme-table-tht-color: #1e3a8a;
    --md-theme-table-tr-nc-color: #f8fafc;
    --md-theme-table-trh-color: #f3f4f6;
    --md-theme-table-color: #111827;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr th,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr td {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table {
    max-width: 100%;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr {
    background-color: #ffffff !important;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table thead,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table thead tr,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr th {
    background-color: #f3f4f6 !important;
    color: #111827 !important;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr th,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr td {
    border-color: #e5e7eb !important;
    color: #111827;
    word-break: break-word;
    overflow-wrap: anywhere;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h1,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h2,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h3,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h4,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h5,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h6 {
    font-family: var(--print-font-heading, inherit);
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview b,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview strong {
    font-family: var(--print-font-bold, inherit);
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview code,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview pre,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code pre,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code pre code {
    font-family: var(--print-font-code, inherit);
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code {
    --md-theme-code-block-color: #abb2bf;
    --md-theme-code-block-bg-color: #282c34;
    --md-theme-code-before-bg-color: #21252b;
    margin: 1.25em 0;
    border: 1px solid #3e4452;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: none;
    background-color: #282c34;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code .md-editor-code-head {
    display: none !important;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code pre {
    margin: 0;
    background-color: #282c34;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code pre code {
    background-color: #282c34;
    color: #abb2bf;
    border: none;
    border-radius: 0;
    padding: 1em 1.2em;
    line-height: 1.6;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview :not(pre) > code {
    background-color: rgba(135, 131, 120, 0.15);
    color: #eb5757;
    border: none;
    border-radius: 4px;
    padding: 0.2em 0.4em;
    font-size: 0.92em;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview figure {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 0 1em;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview figure figcaption {
    text-align: left;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-pgbr,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview hr,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h1,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h2,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h3,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h4,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h5,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h6 {
    cursor: pointer;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) img:not([data-print-free-transform]),
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview img:not([data-print-free-transform]) {
    max-width: var(--print-img-max-width, 100%);
    max-height: var(--print-img-max-height, var(--print-page-inner-height, 100vh));
    object-fit: contain;
  }
  .export-pdf-paper .md-pgbr {
    height: auto;
    min-height: 1px;
    margin: 0;
    padding: 0;
    border: none;
    border-block-start: 2px dashed #ef4444;
    background-color: #f3f4f6;
    background-image: repeating-linear-gradient(
      -45deg,
      #f9fafb,
      #f9fafb 6px,
      #f3f4f6 6px,
      #f3f4f6 12px
    );
  }
  .export-pdf-paper-metric {
    height: var(--print-page-inner-height);
  }
  .export-pdf-cover {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    break-after: page;
    page-break-after: always;
    /* Prefer cover hit-testing if paper box ever overlaps the cover sibling. */
    position: relative;
    z-index: 2;
    --cover-font-scale: 1;
  }
  .export-pdf-cover [data-cover-el],
  .export-pdf-cover [data-cover-shape] {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .export-pdf-cover-stack {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .export-pdf-source-measure {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    /* Prefer visibility over opacity so print engines still paint with @media print. */
    visibility: hidden;
    pointer-events: none;
    z-index: -1;
  }
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-content,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-preview-wrapper,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-preview {
    height: auto !important;
    max-height: none !important;
    min-height: 0 !important;
  }
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]),
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor,
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-content,
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview-wrapper,
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview {
    height: auto !important;
    max-height: none !important;
    min-height: 0 !important;
  }
  @media print {
    .export-pdf-preview-scroll {
      overflow: visible !important;
      max-height: none !important;
      background: #ffffff !important;
      padding: 0 !important;
    }
    .export-pdf-preview-stage {
      display: none !important;
    }
    .export-pdf-source-measure {
      position: static !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      z-index: auto !important;
      width: auto !important;
    }
    .export-pdf-page {
      display: block !important;
      overflow: visible !important;
      background: #ffffff !important;
    }
    .export-pdf-cover-stack {
      gap: 0 !important;
      align-items: stretch !important;
      /* Preview CSS zoom must not scale print layout / paper size. */
      zoom: 1 !important;
    }
    .export-pdf-cover {
      /* Same aspect as editor full page, fitted inside @page margins so the
         print dialog keeps the named paper size (e.g. A4) instead of Custom. */
      width: var(--print-cover-fit-width) !important;
      max-width: none !important;
      height: var(--print-cover-fit-height) !important;
      min-height: var(--print-cover-fit-height) !important;
      max-height: var(--print-cover-fit-height) !important;
      /* Keep design px fonts proportional to the smaller print cover box. */
      --cover-font-scale: calc(var(--print-cover-fit-height) / var(--print-page-height)) !important;
      margin: 0 !important;
      box-shadow: none !important;
      overflow: hidden !important;
      break-after: page !important;
      page-break-after: always !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .export-pdf-paper {
      width: auto !important;
      max-width: none !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
      background: #ffffff !important;
    }
    .export-pdf-paper .md-pgbr {
      background: transparent !important;
      background-image: none !important;
      border: none !important;
    }
    :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview-wrapper {
      overflow: visible !important;
      max-height: none !important;
    }
  }
`;
function Qf({ documentValue: e = "", documentFile: r = null, openCoverEdit: n = false, isDocumentLoading: s = false, hasNavigationSession: o = false }) {
  var _a2, _b, _c2, _d2;
  const i = ha(), a = xa(), { showAlert: u } = rl(), { s3Creds: l } = nl(), f = d.useCallback(() => ((l == null ? void 0 : l.imgbbApiKey) || "").trim(), [l == null ? void 0 : l.imgbbApiKey]), g = i.state && typeof i.state == "object" ? i.state : null, p = sl(i.pathname), x = typeof (g == null ? void 0 : g.value) == "string" ? g.value : typeof e == "string" ? e : "", w = (g == null ? void 0 : g.currentFile) ?? r ?? null, y = !!((g == null ? void 0 : g.openCoverEdit) ?? n), [b, v] = d.useState(() => x), j = d.useRef(""), [R, C] = d.useState(() => x), [E, $] = d.useState(() => w), W = d.useRef(x), I = d.useRef(w), _ = d.useRef(false);
  W.current = b, I.current = E;
  const [U, A] = d.useState(false), [L, Q] = d.useState(() => ({ ...ns })), [V, re] = d.useState(() => ol()), [ge, oe] = d.useState(false), [ie, he] = d.useState(true), [D, X] = d.useState(0), [K, be] = d.useState([]), [se, P] = Dc(), [q, ae] = d.useState([]), [ee, Se] = d.useState(null), [Ne, Ce] = d.useState(null), [Pe, He] = d.useState(null), [et, Te] = d.useState(false), [H, de] = d.useState(null), [me, at] = d.useState(() => !!y), [Ae, tt] = d.useState([]), [Y, qe] = d.useState(null), [ht, Nt] = d.useState(() => il()), [rt, Le] = d.useState(() => al()), [Oe, De] = d.useState(() => ll()), [xt, gt] = d.useState(() => cl()), [ir, ar] = d.useState(() => dl()), [lr, cr] = d.useState(() => ul()), [Ct, Sr] = d.useState(() => wu()), [Ge, lt] = d.useState(() => kd()), [dr, ct] = d.useState(0), [Ze, ur] = d.useState(null), [Nr, Cr] = d.useState(0), Ye = d.useRef(null), bt = d.useRef(null), We = d.useRef(null), [nt, c] = d.useState(null), m = d.useCallback((h) => {
    We.current = h, c(h);
  }, []), k = d.useRef(null), T = d.useRef(null), M = d.useRef(null), B = `${V.pageSizeId}|${V.imageMaxWidth}|${V.imageMaxHeight}`, { metricRef: O, pageInnerHeightPx: le } = Iu(B);
  Mu(k, M, B), Lu(k, `${B}|${b}`), _l(k, { eager: true, layoutKey: `${B}|${b}` }), Au(k, M, `${B}|${b}`);
  const pe = fl(V.pageSizeId), ne = le > 1 ? le : pe.heightPx, { pageStarts: N, contentHeight: F } = tf(k, ne, `${B}|${b}`), te = d.useRef(null), we = d.useRef(false), Z = d.useRef(null), xe = d.useRef(0), { width: ke, isResizing: Je, handleProps: $e } = Hn({ storageKey: Ef, defaultWidth: Pf, minWidth: 180, collapseBelowWidth: 90, maxWidth: 640, edge: "right", onCollapseBelowMin: () => he(false) }), { width: qt, isResizing: Hr, handleProps: Di } = Hn({ storageKey: uu, defaultWidth: fu, minWidth: 220, maxWidth: 480, edge: "left" }), { width: As, isResizing: Bi, handleProps: Oi } = Hn({ storageKey: pu, defaultWidth: mu, minWidth: 200, maxWidth: 420, edge: "left" }), $i = qt + (Ct ? As : 0), [_i, Is] = d.useState(() => Wn());
  d.useEffect(() => {
    const h = () => Is(Wn());
    return window.addEventListener(Vs, h), Is(Wn()), () => window.removeEventListener(Vs, h);
  }, []);
  const Er = d.useMemo(() => pl(E == null ? void 0 : E.type), [E == null ? void 0 : E.type, _i]), Ds = d.useRef((g == null ? void 0 : g.value) != null ? (w == null ? void 0 : w.id) ?? null : null);
  d.useEffect(() => {
    if ((g == null ? void 0 : g.value) != null || !(r == null ? void 0 : r.id) || Ds.current === r.id) return;
    Ds.current = r.id, $(r);
    const h = typeof e == "string" ? e : "";
    v(h), C(h);
  }, [r, e, g]);
  const fr = d.useMemo(() => {
    const { meta: h } = ml(b);
    return h ?? hl;
  }, [b]), Pr = d.useMemo(() => xl(b), [b]), Mn = d.useMemo(() => ls(b), [b]), Wr = Mn.cover, ce = Wr, Ln = !!(ce == null ? void 0 : ce.enabled), Fi = Ln ? 2 : 1, zn = me ? "scroll" : Ge.navigation, pr = me ? 1 : Ge.pages, dt = zn === "scroll" && pr === 1, An = !!me, Qe = d.useCallback((h) => {
    lt((S) => {
      const z = { ...S, ...h };
      return Object.prototype.hasOwnProperty.call(h, "zoomPercent") && (z.zoomPercent = Tn(h.zoomPercent)), Mr(z), z;
    });
  }, []), Hi = d.useCallback((h) => {
    Qe({ zoomPercent: h });
  }, [Qe]), Kr = d.useCallback((h) => {
    if (!h) return;
    const S = document.getElementById(h);
    if (!S) return;
    if (dt) {
      S.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    const z = k.current;
    if (!z) {
      S.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    const J = Td(S, z, N, !!(ce == null ? void 0 : ce.enabled)), G = ((ce == null ? void 0 : ce.enabled) ? 1 : 0) + Math.max(1, N.length), fe = Rd(J, G, pr, Ge.firstPageSingle);
    ct(fe);
  }, [ce == null ? void 0 : ce.enabled, pr, dt, N, Ge.firstPageSingle]);
  d.useEffect(() => {
    const { issues: h } = Mn;
    if (!h.length) {
      j.current = "";
      return;
    }
    const S = gl(h);
    S !== j.current && (j.current = S, u({ title: "\uD45C\uC9C0 \uB370\uC774\uD130 \uC624\uB958", message: `\uD45C\uC9C0(note-cover) \uB370\uC774\uD130\uC5D0 \uBB38\uC81C\uAC00 \uC788\uC2B5\uB2C8\uB2E4.

${S}` }));
  }, [Mn, u]);
  const In = d.useCallback((h) => {
    v((S) => {
      const z = cs(S, h);
      return it({ currentFile: E, editorContent: z }), z;
    });
  }, [E]), { onCoverChange: Et, undo: Bs, redo: Os, canUndo: Wi, canRedo: Ki } = Tu({ currentFile: E, enabled: !!(me && ce), cover: ce, applyCover: In }), Tr = d.useCallback(() => {
    at((h) => {
      const S = !h;
      return S || (tt([]), qe(null)), S;
    }), v((h) => {
      if (me || ls(h).cover) return h;
      const S = bl({ pageSizeId: V.pageSizeId }), z = cs(h, S);
      return it({ currentFile: E, editorContent: z }), z;
    });
  }, [me, E, V.pageSizeId]);
  d.useEffect(() => {
    !me || !(ce == null ? void 0 : ce.pageSizeId) || ce.pageSizeId !== V.pageSizeId && re((h) => {
      if (h.pageSizeId === ce.pageSizeId) return h;
      const S = { ...h, pageSizeId: ce.pageSizeId };
      return Kn(S), S;
    });
  }, [ce == null ? void 0 : ce.pageSizeId, me, V.pageSizeId]);
  const Xi = d.useCallback((h) => {
    Nt(h), Zr("settings-cover-center-snap", h);
  }, []), Gi = d.useCallback((h) => {
    Le(h), wl(h);
  }, []), Yi = d.useCallback((h) => {
    De(h), Zr("settings-cover-object-snap", h);
  }, []), Ui = d.useCallback((h) => {
    gt(h), yl(h);
  }, []), Vi = d.useCallback((h) => {
    ar(h), Zr("settings-cover-text-outline", h);
  }, []), qi = d.useCallback((h) => {
    cr(h), Zr("settings-cover-place-preview", h);
  }, []), Zi = d.useCallback((h) => {
    Sr(h), yu(h);
  }, []);
  _c(We, Pr, Er ?? void 0, E == null ? void 0 : E.id), d.useEffect(() => {
    let h = false;
    return vl().then((S) => {
      h || Q(S);
    }), () => {
      h = true;
    };
  }, []), d.useEffect(() => {
    const h = () => {
      const S = $l();
      Nt(S.centerSnapEnabled), Le(S.centerSnapTolerancePx), De(S.objectSnapEnabled), gt(S.objectSnapTolerancePx), ar(S.textContainerOutlineEnabled), cr(S.placePreviewEnabled);
    };
    return window.addEventListener(qs, h), () => window.removeEventListener(qs, h);
  }, []), d.useEffect(() => {
    i.state == null && a("/", { replace: true });
  }, [i.state, a]), d.useEffect(() => {
    const h = () => {
      const z = bt.current;
      if (!z) {
        X(0);
        return;
      }
      const J = z.getBoundingClientRect();
      X(Math.max(0, Math.round(J.bottom)));
    };
    h(), window.addEventListener("resize", h), window.addEventListener("scroll", h, true);
    let S = null;
    return typeof ResizeObserver < "u" && bt.current && (S = new ResizeObserver(h), S.observe(bt.current)), () => {
      window.removeEventListener("resize", h), window.removeEventListener("scroll", h, true), S == null ? void 0 : S.disconnect();
    };
  }, []), d.useEffect(() => {
    if (nt) return Tc(nt);
  }, [nt]), d.useEffect(() => {
    const h = () => {
      Cr((S) => S + 1);
    };
    return window.addEventListener(Zs, h), () => {
      window.removeEventListener(Zs, h);
    };
  }, []), d.useEffect(() => {
    const h = We.current;
    if (!h) return;
    const S = () => {
      const fe = [...h.querySelectorAll("#export-pdf-preview .md-editor-preview h1, #export-pdf-preview .md-editor-preview h2, #export-pdf-preview .md-editor-preview h3, #export-pdf-preview .md-editor-preview h4, #export-pdf-preview .md-editor-preview h5, #export-pdf-preview .md-editor-preview h6")].map((je, Ee) => {
        var _a3, _b2;
        return { id: je.id || Mo({ index: Ee }), level: Number((_b2 = (_a3 = je.tagName) == null ? void 0 : _a3.slice) == null ? void 0 : _b2.call(_a3, 1)) || 1, text: (je.textContent || "").trim() || "(\uBE48 \uC81C\uBAA9)" };
      });
      be(fe);
    }, z = [60, 180, 420].map((G) => setTimeout(S, G)), J = new MutationObserver(() => S());
    return J.observe(h, { childList: true, subtree: true, characterData: true }), () => {
      z.forEach((G) => clearTimeout(G)), J.disconnect();
    };
  }, [Pr]), d.useEffect(() => {
    if (!K.length) {
      ae([]);
      return;
    }
    const h = K.map((Ee) => document.getElementById(Ee.id)).filter(Boolean);
    if (!h.length) {
      ae([]);
      return;
    }
    const S = We.current;
    let z = 0;
    const J = () => {
      const Ee = Rf(h), ve = Ee ? [Ee] : [];
      ae((Pt) => Pt.length === ve.length && Pt.every((Jt, Yr) => Jt === ve[Yr]) ? Pt : ve);
    }, G = () => {
      z || (z = window.requestAnimationFrame(() => {
        z = 0, J();
      }));
    };
    J(), S == null ? void 0 : S.addEventListener("scroll", G, { passive: true }), window.addEventListener("scroll", G, { passive: true, capture: true }), window.addEventListener("resize", G);
    let fe = null;
    const je = (S == null ? void 0 : S.querySelector(`#${ts}`)) ?? S;
    return typeof ResizeObserver < "u" && je && (fe = new ResizeObserver(G), fe.observe(je)), () => {
      z && window.cancelAnimationFrame(z), S == null ? void 0 : S.removeEventListener("scroll", G), window.removeEventListener("scroll", G, { capture: true }), window.removeEventListener("resize", G), fe == null ? void 0 : fe.disconnect();
    };
  }, [K, Pr]), d.useEffect(() => {
    var _a3;
    if (!ie || !q.length || Date.now() < xe.current) return;
    const h = te.current;
    if (!h) return;
    const S = (_a3 = K.find((je) => q.includes(je.id))) == null ? void 0 : _a3.id;
    if (!S) return;
    const z = h.querySelector(`button[data-toc-id="${S}"]`);
    if (!z) return;
    const J = h.getBoundingClientRect(), G = z.getBoundingClientRect();
    G.top >= J.top + 8 && G.bottom <= J.bottom - 8 || (we.current = true, z.scrollIntoView({ block: "nearest" }), Z.current && window.clearTimeout(Z.current), Z.current = window.setTimeout(() => {
      we.current = false;
    }, 120));
  }, [K, ie, q]), d.useEffect(() => () => {
    Z.current && window.clearTimeout(Z.current);
  }, []);
  const mr = d.useCallback((h, S = I.current) => {
    _.current = true, it({ currentFile: S, editorContent: typeof h == "string" ? h : "" });
  }, []);
  d.useLayoutEffect(() => (_.current = false, () => {
    _.current || it({ currentFile: I.current, editorContent: W.current ?? "" });
  }), []);
  const Dn = d.useCallback(() => {
    document.querySelector(`#${ts}`) && window.print();
  }, []), Bn = b !== R, On = d.useRef(Bn);
  On.current = Bn;
  const Ji = d.useCallback(() => On.current, []), { isBlocked: Qi, proceed: Xr, reset: ea } = kl({ isDirty: Ji }), $s = d.useCallback(() => {
    var _a3;
    On.current || mr(W.current, I.current);
    const h = ((_a3 = I.current) == null ? void 0 : _a3.id) || p;
    if (h) {
      a(`/view/${h}`);
      return;
    }
    a(-1);
  }, [a, p, mr]), Zt = d.useCallback(async () => {
    if (!(E == null ? void 0 : E.id) || U) return false;
    A(true);
    try {
      Kn(V);
      const h = { ...E, content: b };
      mr(b, h), $(h);
      const S = await nf(E, b);
      return C(b), S.mode === "pending-only" && alert("\uC138\uC158 \uB178\uD2B8\uB294 \uB4A4\uB85C \uAC00\uBA74 \uD3B8\uC9D1\uAE30\uC5D0 \uBC18\uC601\uB429\uB2C8\uB2E4."), true;
    } catch (h) {
      return alert(`\uC800\uC7A5 \uC2E4\uD328: ${(h == null ? void 0 : h.message) || h}`), false;
    } finally {
      A(false);
    }
  }, [E, U, b, V, mr]), ta = d.useCallback(async () => {
    await Zt() && Xr();
  }, [Zt, Xr]), ra = d.useCallback(() => {
    mr(R, E), Xr();
  }, [E, Xr, R, mr]);
  d.useEffect(() => {
    const h = (S) => {
      !(S.ctrlKey || S.metaKey) || S.key.toLowerCase() !== "s" || (S.preventDefault(), Zt());
    };
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }, [Zt]);
  const na = d.useCallback((h) => {
    Kr(h);
  }, [Kr]);
  d.useEffect(() => {
    const h = We.current;
    if (!h) return;
    const S = '.export-pdf-cover, [data-note-cover="1"]', z = (G) => {
      var _a3, _b2, _c3;
      const fe = G.target;
      if (fe instanceof Element && fe.closest(S)) return true;
      if (typeof G.composedPath == "function") {
        for (const Ee of G.composedPath()) if (Ee instanceof Element && ((_a3 = Ee.matches) == null ? void 0 : _a3.call(Ee, S))) return true;
      }
      if ((_c3 = (_b2 = document.elementFromPoint(G.clientX, G.clientY)) == null ? void 0 : _b2.closest) == null ? void 0 : _c3.call(_b2, S)) return true;
      for (const Ee of h.querySelectorAll(S)) {
        const ve = Ee.getBoundingClientRect();
        if (G.clientX >= ve.left && G.clientX <= ve.right && G.clientY >= ve.top && G.clientY <= ve.bottom) return true;
      }
      return false;
    }, J = (G) => {
      var _a3, _b2;
      if (z(G) || G.ctrlKey) return;
      const fe = k.current;
      if (!fe) return;
      const je = (_b2 = (_a3 = G.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "img[data-wiki-path], img[data-md-src]");
      if (je && fe.contains(je)) {
        const Ee = Dl(je);
        if (!Ee.kind || !Ee.key) return;
        G.preventDefault();
        const ve = Ee.kind === "wiki" ? Bl(fe, je, Ee.key) : Ol(fe, je, Ee.key);
        Se({ kind: Ee.kind, key: Ee.key, width: Ee.width, height: Ee.height, occurrence: ve, imageSrc: je.currentSrc || je.src || "" });
      }
    };
    return h.addEventListener("contextmenu", J), () => h.removeEventListener("contextmenu", J);
  }, []);
  const sa = d.useCallback(({ width: h, height: S }) => {
    const z = ee;
    if (!(z == null ? void 0 : z.key)) return;
    const J = z.kind === "wiki" ? Xn(b, { path: z.key, occurrence: z.occurrence ?? 0, width: h, height: S }) : Gn(b, { src: z.key, occurrence: z.occurrence ?? 0, width: h, height: S });
    !J.updated || J.markdown === b || (v(J.markdown), it({ currentFile: E, editorContent: J.markdown }));
  }, [E, b, ee]), oa = d.useCallback(async ({ file: h }) => {
    const S = ee;
    if (!(S == null ? void 0 : S.key)) throw new Error("\uC790\uB97C \uC774\uBBF8\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    const z = await jr(h, E), J = S.kind === "wiki" ? jl(b, { path: S.key, occurrence: S.occurrence ?? 0, nextPath: z }) : Js(b, { src: S.key, occurrence: S.occurrence ?? 0, nextPath: z });
    !J.updated || J.markdown === b || (v(J.markdown), it({ currentFile: E, editorContent: J.markdown }));
  }, [E, b, ee]), ia = d.useCallback(async ({ width: h, height: S }) => {
    const z = ee;
    if (!(z == null ? void 0 : z.key) || z.kind !== "markdown") throw new Error("\uBCC0\uD658\uD560 \uC774\uBBF8\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    const J = await Sl({ markdownSrc: z.key, displaySrc: z.imageSrc, currentNotePath: (E == null ? void 0 : E.id) ?? null });
    let G = "";
    if (J.mode === "path") G = J.path;
    else if (G = await jr(J.file, E), !G) throw new Error("\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    const fe = Js(b, { src: z.key, occurrence: z.occurrence ?? 0, nextPath: G, width: h, height: S });
    if (!fe.updated || fe.markdown === b) throw new Error("\uB9C8\uD06C\uB2E4\uC6B4\uC5D0\uC11C \uD574\uB2F9 \uC774\uBBF8\uC9C0\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    v(fe.markdown), it({ currentFile: E, editorContent: fe.markdown });
  }, [E, b, ee]), aa = d.useCallback(async ({ width: h, height: S }) => {
    const z = ee;
    if (!(z == null ? void 0 : z.key) || !(z == null ? void 0 : z.kind)) throw new Error("\uBCC0\uD658\uD560 \uC774\uBBF8\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    const J = f();
    if (!J) throw new Error("ImgBB API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uD0A4\uB97C \uC800\uC7A5\uD558\uC138\uC694.");
    const G = Nl({ path: z.key, imageSrc: z.imageSrc });
    if (!G) throw new Error("\uC5C5\uB85C\uB4DC\uD560 \uC774\uBBF8\uC9C0 \uC18C\uC2A4\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    const je = (await Cl({ apiKey: J, image: G, name: El(z.key) ? "image" : void 0 })).url, Ee = z.occurrence ?? 0;
    let ve = b;
    const Pt = z.kind === "wiki" ? Xn(ve, { path: z.key, occurrence: Ee, width: h, height: S }) : Gn(ve, { src: z.key, occurrence: Ee, width: h, height: S });
    Pt.updated && (ve = Pt.markdown);
    const Jt = await Pl(ve, { kind: z.kind === "wiki" ? "wiki" : "markdown", key: z.key, occurrence: Ee }, je);
    if (!Jt.updated && ve === b) throw new Error("\uB9C8\uD06C\uB2E4\uC6B4\uC5D0\uC11C \uD574\uB2F9 \uC774\uBBF8\uC9C0\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    v(Jt.markdown), it({ currentFile: E, editorContent: Jt.markdown });
  }, [E, f, b, ee]), ut = d.useCallback((h) => {
    const S = We.current;
    if (!S || !(h == null ? void 0 : h.kind) || !(h == null ? void 0 : h.key)) return null;
    const z = h.kind === "wiki" ? "img[data-wiki-path]" : "img[data-md-src]";
    return [...S.querySelectorAll(z)].filter((fe) => (h.kind === "wiki" ? fe.getAttribute("data-wiki-path") : fe.getAttribute("data-md-src")) === h.key)[h.occurrence ?? 0] ?? null;
  }, []), la = d.useCallback(() => {
    const h = ee;
    if (!(h == null ? void 0 : h.kind) || !(h == null ? void 0 : h.key)) return;
    const S = ut(h);
    if (!S) return;
    const z = S.getBoundingClientRect(), J = Math.max(24, Math.round(z.width)), G = Math.max(24, Math.round(z.height)), fe = { kind: h.kind, key: h.key, occurrence: h.occurrence ?? 0, widthPx: J, heightPx: G, originalWidthPx: J, originalHeightPx: G };
    S.style.width = `${J}px`, S.style.height = `${G}px`, S.setAttribute("data-print-free-transform", "1"), Ye.current = fe, He(fe), Te(false);
  }, [ut, ee]);
  d.useEffect(() => {
    if (!Pe) {
      de(null);
      return;
    }
    const h = ut(Pe);
    if (!h) {
      He(null), de(null);
      return;
    }
    let S = 0;
    const z = () => {
      const J = h.getBoundingClientRect();
      de({ left: J.left, top: J.top, width: J.width, height: J.height }), S = requestAnimationFrame(z);
    };
    return S = requestAnimationFrame(z), () => cancelAnimationFrame(S);
  }, [Pe, ut]), d.useEffect(() => {
    if (!Pe) return;
    const h = ut(Pe);
    if (!h) return;
    const S = (G) => {
      var _a3, _b2;
      const fe = (_b2 = (_a3 = G.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]");
      if (!fe) return;
      G.preventDefault();
      const je = fe.getAttribute("data-transform-handle");
      if (!je) return;
      const Ee = G.pointerType === "touch", ve = Ye.current || Pe, Pt = G.clientX, Jt = G.clientY, Yr = ve.heightPx > 0 ? ve.widthPx / ve.heightPx : 1, _s = ($n) => {
        const Hs = $n.clientX - Pt, Ws = $n.clientY - Jt;
        let st = ve.widthPx, ot = ve.heightPx;
        if (je.includes("e") && (st = ve.widthPx + Hs), je.includes("w") && (st = ve.widthPx - Hs), je.includes("s") && (ot = ve.heightPx + Ws), je.includes("n") && (ot = ve.heightPx - Ws), st = Math.max(24, st), ot = Math.max(24, ot), Ee || $n.shiftKey) {
          const pa = Math.abs((st - ve.widthPx) / Math.max(1, ve.widthPx)), ma = Math.abs((ot - ve.heightPx) / Math.max(1, ve.heightPx));
          pa >= ma ? ot = Math.max(24, st / Math.max(1e-4, Yr)) : st = Math.max(24, ot * Yr);
        }
        st = Math.max(24, Math.round(st)), ot = Math.max(24, Math.round(ot)), h.style.width = `${st}px`, h.style.height = `${ot}px`;
        const Ks = { ...Ye.current || ve, widthPx: st, heightPx: ot };
        Ye.current = Ks, He(Ks);
      }, Fs = () => {
        document.removeEventListener("pointermove", _s, true), document.removeEventListener("pointerup", Fs, true);
      };
      document.addEventListener("pointermove", _s, true), document.addEventListener("pointerup", Fs, true);
    }, z = (G) => {
      var _a3, _b2, _c3, _d3;
      const fe = (_b2 = (_a3 = G.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]"), je = (_d3 = (_c3 = G.target) == null ? void 0 : _c3.closest) == null ? void 0 : _d3.call(_c3, "img[data-wiki-path], img[data-md-src]");
      fe || je === h || Te(true);
    }, J = (G) => {
      if (G.key !== "Enter") return;
      const fe = G.target;
      fe instanceof Element && fe.closest('[data-advanced-search], [role="dialog"], [role="combobox"], input, textarea') || (G.preventDefault(), Te(true));
    };
    return document.addEventListener("pointerdown", S, true), document.addEventListener("pointerdown", z, true), document.addEventListener("keydown", J, true), () => {
      document.removeEventListener("pointerdown", S, true), document.removeEventListener("pointerdown", z, true), document.removeEventListener("keydown", J, true);
    };
  }, [Pe, ut]);
  const ca = d.useCallback(() => {
    var _a3;
    const h = Ye.current || Pe;
    if (!(h == null ? void 0 : h.key)) return;
    const S = `${Math.round(h.widthPx)}px`, z = `${Math.round(h.heightPx)}px`, J = h.kind === "wiki" ? Xn(b, { path: h.key, occurrence: h.occurrence ?? 0, width: S, height: z }) : Gn(b, { src: h.key, occurrence: h.occurrence ?? 0, width: S, height: z });
    J.updated && J.markdown !== b && (v(J.markdown), it({ currentFile: E, editorContent: J.markdown })), (_a3 = ut(h)) == null ? void 0 : _a3.removeAttribute("data-print-free-transform"), He(null), Ye.current = null, Te(false);
  }, [E, ut, Pe, b]), da = d.useCallback(() => {
    const h = Ne;
    if (!h) return;
    const S = W.current ?? "", z = Ii(S, h.headingText || "", 0, h.headingIndex);
    z.updated && z.markdown !== S && (v(z.markdown), it({ currentFile: I.current, editorContent: z.markdown })), Ce(null);
  }, [Ne]), ua = d.useCallback(() => {
    const h = Ye.current || Pe;
    if (!h) return;
    const S = ut(h);
    S && (S.style.width = `${h.originalWidthPx}px`, S.style.height = `${h.originalHeightPx}px`, S.removeAttribute("data-print-free-transform")), He(null), Ye.current = null, Te(false);
  }, [ut, Pe]), Gr = d.useCallback((h) => {
    re((S) => {
      const z = { ...S, ...h };
      return Kn(z), z;
    }), h.pageSizeId && ce && h.pageSizeId !== ce.pageSizeId && In({ ...ce, pageSizeId: h.pageSizeId });
  }, [ce, In]);
  d.useEffect(() => {
    const h = { "print-save": () => {
      Zt();
    }, "print-font-settings": () => oe(true), "print-export": () => Dn(), "print-toggle-toc": () => he((S) => !S), "print-view-scroll": () => Qe({ navigation: "scroll" }), "print-view-flip": () => Qe({ navigation: "flip" }), "print-view-pages-1": () => Qe({ pages: 1 }), "print-view-pages-2": () => Qe({ pages: 2 }), "print-toggle-first-page-single": () => {
      lt((S) => {
        const z = { ...S, firstPageSingle: !S.firstPageSingle };
        return Mr(z), z;
      });
    }, "print-zoom-in": () => {
      lt((S) => {
        const z = { ...S, zoomPercent: Ir(S.zoomPercent, 1) };
        return Mr(z), z;
      });
    }, "print-zoom-out": () => {
      lt((S) => {
        const z = { ...S, zoomPercent: Ir(S.zoomPercent, -1) };
        return Mr(z), z;
      });
    }, "print-zoom-reset": () => Qe({ zoomPercent: 100 }), "print-cover-place-text": () => {
      me || Tr(), qe((S) => (S == null ? void 0 : S.kind) === "text" ? null : { kind: "text" });
    }, "print-cover-place-rect": () => {
      me || Tr(), qe((S) => (S == null ? void 0 : S.kind) === "shape" && S.shapeType === "rect" ? null : { kind: "shape", shapeType: "rect" });
    }, "print-cover-place-ellipse": () => {
      me || Tr(), qe((S) => (S == null ? void 0 : S.kind) === "shape" && S.shapeType === "ellipse" ? null : { kind: "shape", shapeType: "ellipse" });
    }, "print-cover-font-size-up": () => {
      if (!me || !ce || !Ae.length) return;
      const S = hs(ce, Ae, 1);
      S !== ce && Et(S);
    }, "print-cover-font-size-down": () => {
      if (!me || !ce || !Ae.length) return;
      const S = hs(ce, Ae, -1);
      S !== ce && Et(S);
    }, "print-cover-text-align-left": () => {
      if (!me || !ce || !Ae.length) return;
      const S = ln(ce, Ae, "left");
      S !== ce && Et(S);
    }, "print-cover-text-align-center": () => {
      if (!me || !ce || !Ae.length) return;
      const S = ln(ce, Ae, "center");
      S !== ce && Et(S);
    }, "print-cover-text-align-right": () => {
      if (!me || !ce || !Ae.length) return;
      const S = ln(ce, Ae, "right");
      S !== ce && Et(S);
    } };
    for (const S of ss) h[Tl(S.id)] = () => {
      Gr({ pageSizeId: S.id });
    };
    return Rl(h);
  }, [Zt, Dn, Gr, Qe, me, Tr, ce, Ae, Et]), d.useEffect(() => Ml(({ headingId: h }) => {
    Kr(h);
  }), [Kr]), d.useEffect(() => Ll(() => K.map((h) => ({ id: h.id, text: h.text, level: h.level }))), [K]), d.useEffect(() => {
    const h = We.current;
    if (!h) return;
    const S = (z) => {
      if (!(z.ctrlKey || z.metaKey)) return;
      z.preventDefault();
      const J = z.deltaY < 0 ? 1 : -1;
      lt((G) => {
        const fe = { ...G, zoomPercent: Ir(G.zoomPercent, J) };
        return Mr(fe), fe;
      });
    };
    return h.addEventListener("wheel", S, { passive: false }), () => h.removeEventListener("wheel", S);
  }, [nt]), pi(nt, true, { middleClick: !!me });
  const fa = { ...zl(V), "--print-font-body": Jr(((_a2 = fr.fonts) == null ? void 0 : _a2.body) || L.body), "--print-font-heading": Jr(((_b = fr.fonts) == null ? void 0 : _b.heading) || L.heading), "--print-font-bold": Jr(((_c2 = fr.fonts) == null ? void 0 : _c2.bold) || L.bold), "--print-font-code": Jr(((_d2 = fr.fonts) == null ? void 0 : _d2.code) || L.code, "mono") };
  return s ? t.jsx("div", { className: "flex h-full min-h-0 flex-col items-center justify-center gap-3 bg-neutral-200 px-4 dark:bg-neutral-800", children: t.jsx("p", { className: "text-sm text-gray-600 dark:text-odp-fg", children: "\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026" }) }) : !o && g == null && !p && !b ? t.jsxs("div", { className: "flex h-full min-h-0 flex-col items-center justify-center gap-3 bg-neutral-200 px-4 dark:bg-neutral-800", children: [t.jsx("p", { className: "text-sm text-gray-600 dark:text-odp-fg", children: "\uC778\uC1C4 \uBBF8\uB9AC\uBCF4\uAE30 \uC138\uC158\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uD3B8\uC9D1\uAE30\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694." }), t.jsxs("button", { type: "button", onClick: $s, className: "inline-flex items-center gap-2 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg", children: [t.jsx(Qs, { size: 18 }), "\uB4A4\uB85C \uAC00\uAE30"] })] }) : t.jsxs("div", { className: "export-pdf-page flex flex-col h-full min-h-0 overflow-hidden print:h-auto print:min-h-0 print:overflow-visible bg-neutral-200 dark:bg-neutral-800 print:bg-white min-w-0", style: fa, children: [fr.webfontCss ? t.jsx("style", { "data-s3haim-document-webfonts": "1", children: fr.webfontCss }) : null, t.jsx("style", { children: Mf }), t.jsx("style", { children: Al(V.pageSizeId) }), t.jsxs("div", { ref: bt, className: "sticky top-0 z-20 flex flex-col gap-2 px-4 py-3 border-b border-gray-200 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft shrink-0 print:hidden", children: [t.jsxs("div", { className: "flex items-center justify-between gap-4", children: [t.jsxs("button", { type: "button", onClick: $s, "data-print-toolbar": "back", className: "flex items-center gap-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg px-3 py-2 rounded transition", "aria-label": "\uB4A4\uB85C \uAC00\uAE30", children: [t.jsx(Qs, { size: 18 }), "\uB4A4\uB85C \uAC00\uAE30"] }), t.jsx("h2", { className: "font-semibold text-gray-800 dark:text-odp-fg truncate flex-1 text-center", children: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30" }), t.jsxs("div", { className: "flex items-center gap-2", children: [t.jsxs("button", { type: "button", onClick: () => oe(true), "data-print-toolbar": "font", className: "flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg rounded transition", "aria-label": "\uD3F0\uD2B8 \uC124\uC815", children: [t.jsx(dc, { size: 16 }), "\uD3F0\uD2B8 \uC124\uC815"] }), t.jsxs("button", { type: "button", onClick: Zt, "data-print-toolbar": "save", disabled: !(E == null ? void 0 : E.id) || U || !Bn, className: "inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded transition disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-600 hover:bg-blue-700", "aria-label": "\uC800\uC7A5", title: "\uC774\uBBF8\uC9C0 \uD06C\uAE30\uC640 \uD398\uC774\uC9C0 \uB098\uB204\uAE30\uB97C \uB178\uD2B8\uC5D0 \uC800\uC7A5 (Ctrl+S)", children: [t.jsx(uc, { size: 16 }), U ? "\uC800\uC7A5 \uC911\u2026" : "\uC800\uC7A5"] }), t.jsxs("button", { type: "button", className: "md-editor-btn inline-flex items-center gap-1.5", "data-print-toolbar": "export", onClick: Dn, "aria-label": "\uB0B4\uBCF4\uB0B4\uAE30", children: [t.jsx(fc, { size: 16 }), "\uB0B4\uBCF4\uB0B4\uAE30"] })] })] }), t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-x-4 gap-y-2", children: [t.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2", children: [t.jsxs("button", { type: "button", onClick: Tr, "data-print-toolbar": "cover", className: `flex items-center gap-1.5 px-3 py-2 text-sm rounded transition ${me ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200" : "text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg"}`, "aria-label": Wr ? "\uD45C\uC9C0 \uD3B8\uC9D1" : "\uD45C\uC9C0 \uCD94\uAC00", "aria-pressed": me, title: Wr ? "\uD45C\uC9C0 \uD3B8\uC9D1" : "\uD45C\uC9C0 \uCD94\uAC00", children: [t.jsx(pc, { size: 16 }), Wr ? "\uD45C\uC9C0 \uD3B8\uC9D1" : "\uD45C\uC9C0 \uCD94\uAC00"] }), t.jsx(ud, { value: V.pageSizeId, onValueChange: (h) => Gr({ pageSizeId: h }) }), t.jsx(hd, { value: zn, disabled: An, onValueChange: (h) => {
    Qe({ navigation: h }), ct(0);
  } }), t.jsx(xd, { value: pr, disabled: An, onValueChange: (h) => {
    Qe({ pages: h }), ct(0);
  } }), pr === 2 && !An ? t.jsx(md, { checked: Ge.firstPageSingle, onCheckedChange: (h) => {
    Qe({ firstPageSingle: h }), ct(0);
  } }) : null, t.jsx(Md, { value: Ge.zoomPercent, onChange: (h) => Qe({ zoomPercent: h }) }), t.jsx(cd, { maxWidth: V.imageMaxWidth, maxHeight: V.imageMaxHeight, widthFallback: `${pe.widthPx}px`, heightFallback: `${pe.heightPx}px`, onChange: ({ maxWidth: h, maxHeight: S }) => Gr({ imageMaxWidth: h, imageMaxHeight: S }) })] }), t.jsxs("button", { type: "button", onClick: () => he((h) => !h), "data-print-toolbar": "toc", className: "flex shrink-0 items-center gap-1.5 px-3 py-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg rounded transition", "aria-label": ie ? "\uBAA9\uCC28 \uC228\uAE30\uAE30" : "\uBAA9\uCC28 \uBCF4\uC774\uAE30", "aria-pressed": ie, title: ie ? "\uBAA9\uCC28 \uC228\uAE30\uAE30" : "\uBAA9\uCC28 \uBCF4\uC774\uAE30", children: [t.jsx(mc, { size: 16 }), "\uBAA9\uCC28"] })] })] }), t.jsxs("div", { className: "relative flex min-h-0 flex-1 flex-col", style: { "--export-toc-width": `${ke}px`, "--export-cover-sidebar-width": `${$i}px` }, children: [t.jsxs("div", { ref: m, className: `export-pdf-preview-scroll relative px-4 py-6 min-h-0 flex-1 bg-neutral-200 dark:bg-neutral-800 text-gray-900 print:bg-white print:h-auto print:max-h-none print:overflow-visible print:p-0 ${dt ? "overflow-auto" : "overflow-hidden"} ${ie ? "md:pr-(--export-toc-width)" : ""} ${me ? "md:pl-(--export-cover-sidebar-width)" : ""}`, children: [dt ? null : t.jsx("div", { className: `absolute inset-0 print:hidden ${ie ? "md:right-(--export-toc-width)" : ""}`, children: t.jsx(Ed, { navigation: zn, pages: pr, firstPageSingle: Ge.firstPageSingle, zoomPercent: Ge.zoomPercent, onZoomChange: Hi, pageSizeId: V.pageSizeId, pageStarts: N, contentHeight: F, pageInnerHeightPx: ne, hasCover: !!(ce == null ? void 0 : ce.enabled), coverNode: (ce == null ? void 0 : ce.enabled) ? t.jsx(on, { cover: ce, getPresignedUrl: Er, className: "h-full w-full shadow-none" }) : null, sourceContentRef: k, layoutKey: `${B}|${Pr}|${ne}`, flipIndex: dr, onFlipIndexChange: ct, onVisibleLogicalPagesChange: ur }) }), t.jsxs("div", { className: `export-pdf-cover-stack mx-auto w-full print:mx-0 ${dt ? "" : "export-pdf-source-measure"}`, style: dt ? { zoom: Ge.zoomPercent / 100 } : void 0, "aria-hidden": dt ? void 0 : true, children: [(ce == null ? void 0 : ce.enabled) || me ? me && ce ? t.jsxs(t.Fragment, { children: [t.jsx("div", { ref: T, children: t.jsx(uo, { showPageMarker: Ln && dt, className: "mx-auto w-fit max-w-full", children: t.jsx(eu, { cover: ce, selectedIds: Ae, onSelectIds: tt, onChange: Et, getPresignedUrl: Er, currentFile: E, centerSnapEnabled: ht, centerSnapTolerance: rt, objectSnapEnabled: Oe, objectSnapTolerance: xt, textContainerOutlineEnabled: ir, placePreviewEnabled: lr, placeMode: Y, onPlaceModeChange: qe, onUndo: Bs, onRedo: Os, className: "mx-auto print:hidden print:mx-0" }) }) }), ce.enabled ? t.jsx(on, { cover: ce, getPresignedUrl: Er, className: "mx-auto hidden shadow-none print:block print:mx-0" }) : null] }) : (ce == null ? void 0 : ce.enabled) ? t.jsx("div", { ref: T, children: t.jsx(uo, { showPageMarker: dt, className: "mx-auto w-fit max-w-full", children: t.jsx(on, { cover: ce, getPresignedUrl: Er, className: "mx-auto shadow-[0_8px_28px_rgba(15,23,42,0.12)] print:shadow-none print:mx-0" }) }) }) : null : null, t.jsxs("div", { className: "export-pdf-paper relative mx-auto bg-white text-gray-900 shadow-[0_8px_28px_rgba(15,23,42,0.12)] print:shadow-none print:mx-0", style: { width: "var(--print-page-width)", minHeight: "var(--print-page-height)", padding: "var(--print-page-margin)" }, children: [t.jsx("div", { ref: O, className: "export-pdf-paper-metric pointer-events-none absolute top-0 left-0 -z-10 w-px opacity-0 print:hidden", "aria-hidden": true }), t.jsxs("div", { ref: k, className: "export-pdf-paper-content relative", children: [t.jsx("div", { ref: M, className: "pointer-events-none absolute top-0 left-0 -z-10 opacity-0 print:hidden", style: { width: "var(--print-img-max-width)", height: "var(--print-img-max-height)" }, "aria-hidden": true }), t.jsx(dd, { pageStarts: N, contentHeight: F, firstPageNumber: Fi }), t.jsx(ga, { id: ts, theme: "light", language: "ko-KR", codeTheme: Il, customIcon: Fl, value: Pr, mdHeadingId: Mo, noMermaid: true, codeFoldable: false, showCodeRowNumber: false }, `footnotes-${Nr}`)] })] })] })] }), t.jsx(Id, { pageStarts: N, contentHeight: F, paperRef: k, scrollRef: We, coverRef: T, hasCover: Ln, overridePages: dt ? null : Ze }), me && ce ? t.jsx(vu, { cover: ce, selectedIds: Ae, onSelectIds: tt, onChange: Et, currentFile: E, topPx: D, width: qt, isResizing: Hr, resizeHandleProps: Di, layersDetached: Ct, onLayersDetachedChange: Zi, layersWidth: As, layersIsResizing: Bi, layersResizeHandleProps: Oi, centerSnapEnabled: ht, onCenterSnapEnabledChange: Xi, centerSnapTolerance: rt, onCenterSnapToleranceChange: Gi, objectSnapEnabled: Oe, onObjectSnapEnabledChange: Yi, objectSnapTolerance: xt, onObjectSnapToleranceChange: Ui, textContainerOutlineEnabled: ir, onTextContainerOutlineEnabledChange: Vi, placePreviewEnabled: lr, onPlacePreviewEnabledChange: qi, placeMode: Y, onPlaceModeChange: qe, canUndo: Wi, canRedo: Ki, onUndo: Bs, onRedo: Os }) : null, ie && t.jsxs("aside", { className: "hidden md:flex fixed right-0 bottom-0 border-l border-gray-200 dark:border-odp-borderSoft bg-white/95 dark:bg-odp-bgSoft/95 backdrop-blur-sm z-30 print:hidden", style: { top: D, width: ke }, children: [t.jsx(Wo, { handleProps: $e, isResizing: Je, visibleOnHover: true, label: "\uBAA9\uCC28 \uB108\uBE44 \uC870\uC808" }), t.jsxs("div", { className: "relative flex flex-col w-full min-h-0 p-2 pl-2.5", children: [t.jsxs("div", { className: "flex items-center justify-between gap-2 px-1.5 py-1", children: [t.jsx("div", { className: "text-xs font-semibold tracking-wide text-gray-700 dark:text-odp-fgStrong uppercase", children: "\uBAA9\uCC28" }), t.jsx($c, { checked: se, onChange: P, isDark: typeof document < "u" && document.documentElement.classList.contains("dark") })] }), t.jsx("ul", { ref: te, onScroll: () => {
    we.current || (xe.current = Date.now() + 900);
  }, onWheel: () => {
    xe.current = Date.now() + 900;
  }, onTouchMove: () => {
    xe.current = Date.now() + 900;
  }, className: "mt-1 flex-1 min-h-0 overflow-y-auto space-y-1", children: K.length === 0 ? t.jsx("li", { className: "px-1.5 text-xs text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC5C6\uC74C" }) : K.map((h, S) => t.jsx("li", { style: { paddingLeft: `${Math.min(h.level - 1, 5) * 0.45}rem` }, children: t.jsxs("button", { type: "button", "data-toc-id": h.id, onClick: () => na(h.id), onContextMenu: (z) => {
    z.preventDefault();
    const J = String(h.id || "").match(/^pdf-ex-heading-(\d+)$/i), G = (J == null ? void 0 : J[1]) ? Number(J[1]) : null, fe = Number.isInteger(G) && G >= 1 ? G : S + 1;
    Ce({ headingIndex: fe, headingText: h.text || "" });
  }, className: `group relative w-full text-left rounded px-1.5 py-1 text-sm transition ${Bc(se)} ${q.includes(h.id) ? "font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-odp-focusBg" : "text-gray-700 dark:text-odp-fg hover:bg-gray-100 dark:hover:bg-odp-focusBg"}`, title: h.text, children: [t.jsx("span", { className: `absolute left-0 w-0.5 rounded ${se ? "top-2 h-4" : "top-1/2 h-4 -translate-y-1/2"} ${q.includes(h.id) ? "bg-red-500" : "bg-transparent"}`, "aria-hidden": true }), h.text] }) }, `${h.id}-${S}`)) })] })] })] }), t.jsx(ld, { isOpen: ge, onClose: () => oe(false), fonts: L, onFontsChange: (h) => Q(h) }), t.jsx(Oc, { isOpen: !!ee, onClose: () => Se(null), path: (ee == null ? void 0 : ee.key) ?? "", kind: (ee == null ? void 0 : ee.kind) ?? "wiki", initialWidth: (ee == null ? void 0 : ee.width) ?? "", initialHeight: (ee == null ? void 0 : ee.height) ?? "", imageSrc: (ee == null ? void 0 : ee.imageSrc) ?? "", onApply: sa, onStartFreeTransform: la, onCrop: oa, onConvertToWiki: ia, onConvertToImgbb: aa }, ee ? `${ee.kind}|${ee.key}|${ee.width ?? ""}|${ee.height ?? ""}|${ee.occurrence ?? 0}` : "wiki-image-size-modal"), t.jsx(Rc, { containerRef: We, getMarkdown: () => W.current ?? "", setMarkdown: (h) => v(h) }), Pe && H && t.jsx("div", { className: "fixed z-70 pointer-events-none border-2 border-blue-500 print:hidden", style: { left: `${H.left}px`, top: `${H.top}px`, width: `${H.width}px`, height: `${H.height}px` }, children: ["nw", "ne", "sw", "se"].map((h) => t.jsx("button", { type: "button", "data-transform-handle": h, className: "absolute pointer-events-auto h-3 w-3 rounded-full bg-blue-600 border border-white", style: { left: h.includes("w") ? "-7px" : "auto", right: h.includes("e") ? "-7px" : "auto", top: h.includes("n") ? "-7px" : "auto", bottom: h.includes("s") ? "-7px" : "auto", cursor: h === "nw" || h === "se" ? "nwse-resize" : "nesw-resize" }, "aria-label": `transform-${h}` }, h)) }), Pe && t.jsxs("button", { type: "button", onClick: () => Te(true), className: "fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm print:hidden", children: [t.jsx("span", { className: "block font-semibold mb-1", children: "\uC774\uBBF8\uC9C0 \uC790\uC720\uBCC0\uD615 \uC548\uB0B4" }), t.jsx("span", { className: "block", children: "- Shift + \uB4DC\uB798\uADF8: \uC6D0\uBCF8 \uBE44\uC728 \uC720\uC9C0 / \uC77C\uBC18 \uB4DC\uB798\uADF8: \uBE44\uC728 \uBB34\uC2DC" }), t.jsx("span", { className: "block", children: "- \uD130\uCE58 \uB4DC\uB798\uADF8: \uC6D0\uBCF8 \uBE44\uC728 \uC720\uC9C0" }), t.jsx("span", { className: "block", children: "- \uB2E4\uB978 \uACF3 \uD074\uB9AD(\uC774 \uD1A0\uC2A4\uD2B8 \uD3EC\uD568): \uBCC0\uD615 \uC644\uB8CC \uD655\uC778" })] }), t.jsx(vr, { isOpen: Qi, title: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uBCC0\uACBD\uC0AC\uD56D", message: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uBCC0\uACBD\uC0AC\uD56D\uC774 \uC788\uC2B5\uB2C8\uB2E4. \uC774\uB3D9\uD558\uBA74 \uBCC0\uACBD\uC0AC\uD56D\uC774 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4.", confirmLabel: "\uC800\uC7A5 \uD6C4 \uC774\uB3D9", cancelLabel: "\uCDE8\uC18C", discardLabel: "\uC800\uC7A5 \uC548 \uD558\uACE0 \uC774\uB3D9", onConfirm: () => {
    ta();
  }, onCancel: ea, onDiscard: ra, confirmDisabled: !(E == null ? void 0 : E.id) || U }), t.jsx(vr, { isOpen: et, title: "\uC790\uC720\uBCC0\uD615 \uC800\uC7A5", message: "\uD604\uC7AC \uBCC0\uD615\uC744 \uC5B4\uB5BB\uAC8C \uCC98\uB9AC\uD560\uAE4C\uC694?", confirmLabel: "\uC801\uC6A9", cancelLabel: "\uACC4\uC18D \uC218\uC815", discardLabel: "\uBCC0\uD615 \uCD08\uAE30\uD654", onConfirm: ca, onCancel: () => Te(false), onDiscard: ua }), t.jsx(vr, { isOpen: !!Ne, title: "\uD398\uC774\uC9C0 \uB098\uB204\uAE30 \uC0BD\uC785", message: `\uC544\uB798 heading \uC55E\uC5D0 <pgbr/> \uB97C \uC0BD\uC785\uD569\uB2C8\uB2E4.

${(Ne == null ? void 0 : Ne.headingText) || "(\uC81C\uBAA9 \uD14D\uC2A4\uD2B8 \uC5C6\uC74C)"}`, confirmLabel: "\uC0BD\uC785", cancelLabel: "\uCDE8\uC18C", onConfirm: da, onCancel: () => Ce(null) }), t.jsx(Cf, { containerEl: nt, containerRef: We, paperContentRef: k, getMarkdown: () => W.current ?? "", setMarkdown: (h) => {
    v(h), it({ currentFile: I.current, editorContent: h });
  } }), t.jsx(Mc, { containerRef: We, rootEl: nt })] });
}
export {
  Qf as default
};
