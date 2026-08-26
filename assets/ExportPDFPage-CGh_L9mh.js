import { r as d, j as t, a as ss, e as va, u as ka } from "./vendor-react-kfkzeLNk.js";
import { A as ja } from "./vendor-md-editor-3uoZigMr.js";
import { c2 as Fe, c3 as Ye, c4 as Ce, c5 as _e, c6 as Nt, c7 as vn, c8 as Oi, c9 as _i, ca as Sa, cb as ks, cc as Fi, cd as js, ce as Na, cf as Ca, cg as is, ch as pn, ci as Ss, U as Bi, K as wr, cj as Ea, ck as qr, cl as Pa, cm as os, cn as Ta, co as Xs, cp as Hi, cq as Ae, a8 as kr, cr as sn, Q as as, cs as ls, ct as cs, cu as Ra, cv as Ma, cw as La, cx as za, cy as Aa, cz as Wi, cA as Ki, cB as Ia, bg as Da, cC as Gi, cD as Xi, cE as Ui, cF as Bn, cG as Lr, cH as $a, cI as Oa, $ as _a, cJ as Yi, cK as Br, ay as vr, cL as Us, cM as Ys, cN as Zr, cO as Jr, cP as Vs, cQ as Fa, cR as Ba, cS as Ha, cT as Wa, cU as Ka, cV as Ga, cW as Xa, cX as Ua, cY as Ya, cZ as Va, c_ as qa, c$ as Za, d0 as Ja, d1 as qs, d2 as Qa, d3 as el, T as Vi, a0 as tl, d4 as on, d5 as rl, d6 as Hn, d7 as nl, d8 as sl, d9 as ds, da as us, db as il, dc as ol, dd as al, de as ll, bf as cl, df as dl, dg as ul, dh as fl, di as pl, dj as ml, dk as hl, dl as xl, dm as gl, dn as bl, dp as wl, E as Wn, dq as Kn, P as Zs, dr as yl, ds as vl, dt as kl, du as jl, dv as Sl, ah as ot, dw as Nl, dx as Gn, aG as Qr, aJ as Cl, aK as El, dy as Pl, aF as Js, bD as Qs, dz as Tl, al as Xn, dA as Un, am as Rl, dB as ei, dC as Ml, an as Ll, ao as zl, a2 as Al, ap as Il, dD as Dl, dE as $l, dF as Ol, dG as _l, dH as en, dI as Fl, dJ as Bl, M as Hl, dK as Wl, dL as Kl, ar as Gl, dM as Xl, aE as Ul } from "./index-y-7LfBXB.js";
import { J as mt, i as St, k as Yl, W as Vl, N as ql, C as Zl, Y as Jl, K as qi, M as Zi, z as Ji, Z as Ns, _ as Cs, $ as Es, a0 as Ps, a as Ql, a1 as ec, a2 as tc, a3 as rc, a4 as nc, a5 as Ts, a6 as Rs, G as kn, a7 as jn, a8 as Sn, a9 as Nn, aa as Qi, ab as Cn, ac as En, ad as Pn, ae as eo, j as to, af as ro, ag as no, ah as sc, T as an, Q as ln, x as so, D as ic, ai as io, I as Yn, aj as oc, ak as ac, al as Vn, am as lc, an as cc, ao as dc, ap as uc, aq as fc, ar as pc, as as mc, at as hc, A as ti, au as xc, w as gc, v as bc, av as wc, aw as yc } from "./vendor-lucide-MHeIhp6j.js";
import { B as Ft, E as Bt, G as Ht, H as Wt, I as Kt, J as Gt, K as Xt, M as Ut, N as Yt, Q as Vt, S as tr, b as rr, U as vc, V as kc, W as jc, X as Sc, d as Nc, e as zt, T as At, f as It, g as Dt, A as $t, Y as Cc, Z as Ec } from "./vendor-radix-BympcaAE.js";
import { C as Ir, g as fs, a as cn, c as oo, n as ri, b as Pc, d as Tc, e as Rc, f as Mc, u as Lc, w as zc, r as Ac, h as Ic, H as Dc, P as $c } from "./previewFootnoteScroll-DNr3C9m-.js";
import { c as Oc, C as ni, a as ft, b as _c, d as jt } from "./ChatImageBackgroundPicker-CTQUKkbn.js";
import { S as kt, g as Fc } from "./SliderWithScrubInput-B2qoXP-p.js";
import { N as Bc, u as Hc, t as Wc, W as Kc } from "./useTocTitleWrap-DyO770lw.js";
import { m as ao } from "./vendor-motion-9P87yVtW.js";
import { T as Gc } from "./TocTitleWrapToggle-BNLFhwUn.js";
import { u as Xc } from "./useWikiImageHydration-Dg6N4GmW.js";
import "./vendor-aws-DoHMlT-9.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-google-genai-BXoTgYIl.js";
import "./index-DKf8xmDw.js";
import "./vendor-image-crop-BfNSF_Kw.js";
import "./storageImageHydration-DXQ4AKQZ.js";
function si(e, r, n) {
  return Math.min(n, Math.max(r, e));
}
function Uc(e, r) {
  const n = r instanceof Set ? r : new Set(r);
  return e.elements.filter((s) => n.has(s.id));
}
function qn(e, r, n, s) {
  if (!r.length || n === 0 && s === 0) return e;
  const i = new Set(r), o = e.elements.filter((c) => i.has(c.id));
  if (!o.length) return e;
  let a = n, u = s;
  for (const c of o) n < 0 && (a = Math.max(a, -c.x)), n > 0 && (a = Math.min(a, 100 - c.w - c.x)), s < 0 && (u = Math.max(u, -c.y)), s > 0 && (u = Math.min(u, 100 - c.h - c.y));
  return { ...e, elements: e.elements.map((c) => i.has(c.id) ? { ...c, x: si(c.x + a, 0, 100 - c.w), y: si(c.y + u, 0, 100 - c.h) } : c) };
}
function mn(e) {
  if (!e.length) return null;
  let r = 1 / 0, n = 1 / 0, s = -1 / 0, i = -1 / 0;
  for (const o of e) r = Math.min(r, o.x), n = Math.min(n, o.y), s = Math.max(s, o.x + o.w), i = Math.max(i, o.y + o.h);
  return { x: r, y: n, w: s - r, h: i - n };
}
function ps(e) {
  const r = e.x, n = e.y, s = e.x + e.w, i = e.y + e.h, o = Math.min(r, s), a = Math.min(n, i);
  return { x: o, y: a, w: Math.abs(s - r), h: Math.abs(i - n) };
}
function ii(e, r) {
  const n = ps(r);
  if (n.w < 0.05 && n.h < 0.05) return [];
  const s = n.x + n.w, i = n.y + n.h;
  return e.filter((o) => {
    const a = o.x + o.w, u = o.y + o.h;
    return o.x < s && a > n.x && o.y < i && u > n.y;
  }).map((o) => o.id);
}
function Yc(e, r) {
  if (!r.length) return null;
  const n = r.map((i) => {
    var _a2;
    return ((_a2 = e.elements.find((o) => o.id === i)) == null ? void 0 : _a2.groupId) ?? null;
  }), s = n[0];
  return !s || !n.every((i) => i === s) ? null : s;
}
function Tn(e, r) {
  var _a2;
  const n = Fe(e), s = n.elements.find((u) => u.id === r);
  if (!(s == null ? void 0 : s.groupId)) return [];
  const i = [];
  let o = s.groupId;
  const a = /* @__PURE__ */ new Set();
  for (; o && !a.has(o); ) a.add(o), i.push(o), o = (_a2 = Nt(n, o)) == null ? void 0 : _a2.parentGroupId;
  return i.reverse();
}
function lo(e, r, n) {
  const s = Ce(e, n);
  if (!s.length || s.length !== r.length) return false;
  const i = new Set(r);
  return s.every((o) => i.has(o));
}
function ms(e, r, n = "root") {
  if (!r.length) return [];
  const s = Fe(e), i = /* @__PURE__ */ new Set();
  for (const o of r) {
    const a = s.elements.find((c) => c.id === o);
    if (!a) continue;
    if (!a.groupId) {
      i.add(o);
      continue;
    }
    const u = n === "immediate" ? a.groupId : Tn(s, o)[0] ?? a.groupId;
    for (const c of Ce(s, u)) i.add(c);
  }
  return [...i];
}
function Vc(e, r, n) {
  const s = Fe(e);
  if (!s.elements.some((u) => u.id === r)) return [];
  const i = Tn(s, r);
  if (!i.length) return [r];
  let o = -1;
  for (let u = 0; u < i.length; u += 1) lo(s, n, i[u]) && (o = u);
  if (o >= 0) return Ce(s, i[o]);
  if (n.includes(r)) return [...n];
  const a = co(s, n);
  return a && Ce(s, a).includes(r) ? uo(s, a, r) : Ce(s, i[0]);
}
function qc(e, r, n) {
  const s = Fe(e);
  if (!s.elements.some((a) => a.id === r)) return { ids: [], enterEdit: false };
  if (n.length === 1 && n[0] === r) return { ids: [r], enterEdit: true };
  const i = Tn(s, r);
  if (!i.length) return { ids: [r], enterEdit: true };
  let o = -1;
  for (let a = 0; a < i.length; a += 1) lo(s, n, i[a]) && (o = a);
  return o < 0 ? { ids: Ce(s, i[0]), enterEdit: false } : o < i.length - 1 ? { ids: Ce(s, i[o + 1]), enterEdit: false } : { ids: [r], enterEdit: false };
}
function co(e, r) {
  if (!r.length) return null;
  const n = Fe(e);
  let s = null;
  for (const o of r) {
    const a = Tn(n, o);
    if (!a.length) return null;
    if (s == null) {
      s = [...a];
      continue;
    }
    const u = new Set(a);
    s = s.filter((c) => u.has(c));
  }
  if (!(s == null ? void 0 : s.length)) return null;
  const i = new Set(r);
  for (let o = s.length - 1; o >= 0; o -= 1) {
    const a = s[o], u = Ce(n, a);
    if (u.length && r.every((c) => u.includes(c)) && !u.every((c) => i.has(c))) return a;
  }
  return null;
}
function uo(e, r, n) {
  const s = Fe(e);
  for (const i of js(s, r)) if (_e(s, i)) {
    const o = Ce(s, i);
    if (o.includes(n)) return o;
  } else if (i === n) return [n];
  return [n];
}
function Zc(e, r, n) {
  const s = Fe(e);
  if (!s.elements.some((a) => a.id === r)) return [];
  const i = co(s, n);
  return i ? Ce(s, i).includes(r) ? uo(s, i, r) : ms(s, [r], "root") : ms(s, [r], "root");
}
function Jc(e, r) {
  const n = [...new Set(r)].filter((x) => e.elements.some((p) => p.id === x));
  if (!n.length) return { cover: e, newIds: [] };
  const s = new Set(n), i = /* @__PURE__ */ new Map();
  for (const x of n) i.set(x, crypto.randomUUID());
  const o = /* @__PURE__ */ new Map();
  for (const x of e.elements) !s.has(x.id) || !x.groupId || o.has(x.groupId) || o.set(x.groupId, crypto.randomUUID());
  const a = [];
  for (const x of e.elements) {
    if (!s.has(x.id)) continue;
    const p = i.get(x.id);
    if (!p) continue;
    const w = x.groupId ? o.get(x.groupId) : void 0, y = { ...x, id: p };
    w ? y.groupId = w : delete y.groupId, a.push(y);
  }
  let u = Fe(e);
  const c = [];
  for (const [x, p] of o) {
    const w = u.groups.find((g) => g.id === x), y = ((w == null ? void 0 : w.childIds) ?? []).map((g) => i.has(g) ? i.get(g) : o.has(g) ? o.get(g) : null).filter((g) => !!g);
    c.push({ id: p, name: (w == null ? void 0 : w.name) ? `${w.name} \uBCF5\uC0AC` : "\uADF8\uB8F9", childIds: y });
  }
  u = { ...u, groups: [...u.groups, ...c], elements: [...u.elements, ...a] };
  const b = Ye(e, n).map((x) => i.get(x) ?? o.get(x)).filter((x) => !!x);
  for (const x of [...b].reverse()) u = { ...u, rootLayerIds: [x, ...(u.rootLayerIds ?? []).filter((p) => p !== x)] };
  return u = Fe(u), { cover: u, newIds: n.map((x) => i.get(x)).filter(Boolean) };
}
function Rn(e, r, n) {
  const s = [...new Set(r)].filter((c) => e.elements.some((f) => f.id === c));
  if (s.length < 1) return null;
  let i = Fe(e);
  const o = Ye(i, s);
  if (o.length === 1 && _e(i, o[0])) return null;
  const a = ks(i);
  i = a.cover;
  const u = a.groupId;
  for (const c of [...o].reverse()) i = Fi(i, c, u, "inside");
  return { cover: i, groupId: u };
}
function Mn(e, r) {
  return Sa(e, r);
}
function hs(e, r) {
  const n = Fe(e), s = Ye(n, r), i = s.length ? s : [...r];
  return vn(n, i);
}
function xs(e, r, n) {
  return Na(e, r, n);
}
function Ms(e, r) {
  const n = Ye(e, r);
  return Oi(e, n.length ? n : r);
}
function Ls(e, r) {
  const n = Ye(e, r);
  return _i(e, n.length ? n : r);
}
function oi(e, r, n) {
  const s = Ye(e, r), i = s.length ? s : [...r];
  if (!i.length) return e;
  let o = e;
  const a = n === 1 ? i : [...i].reverse();
  for (const u of a) o = xs(o, u, n);
  return o;
}
function Qc(e, r, n) {
  const s = n.trim() || "\uADF8\uB8F9";
  return { ...e, groups: (e.groups ?? []).map((i) => i.id === r ? { ...i, name: s } : i) };
}
function ed(e, r, n) {
  const s = n.trim();
  return { ...e, elements: e.elements.map((i) => {
    if (i.id !== r) return i;
    const o = { ...i };
    return s ? o.name = s : delete o.name, o;
  }) };
}
function Hr(e, r) {
  var _a2;
  const n = Nt(e, r);
  return n ? n.locked === true : ((_a2 = e.elements.find((i) => i.id === r)) == null ? void 0 : _a2.locked) === true;
}
function sr(e, r) {
  const n = typeof r == "string" ? e.elements.find((o) => o.id === r) : r;
  if (!n) return false;
  if (n.locked === true) return true;
  let s = n.groupId;
  const i = /* @__PURE__ */ new Set();
  for (; s && !i.has(s); ) {
    i.add(s);
    const o = Nt(e, s);
    if (!o) break;
    if (o.locked === true) return true;
    s = o.parentGroupId;
  }
  return false;
}
function td(e, r) {
  let n = r;
  const s = /* @__PURE__ */ new Set();
  for (; n && !s.has(n); ) {
    s.add(n);
    const i = Nt(e, n);
    if (!i) break;
    if (i.locked === true) return true;
    n = i.parentGroupId;
  }
  return false;
}
function fo(e, r, n) {
  return _e(e, r) ? { ...e, groups: (e.groups ?? []).map((s) => {
    if (s.id !== r) return s;
    const i = { ...s };
    return n ? i.locked = true : delete i.locked, i;
  }) } : { ...e, elements: e.elements.map((s) => {
    if (s.id !== r) return s;
    const i = { ...s };
    return n ? i.locked = true : delete i.locked, i;
  }) };
}
function po(e, r) {
  return fo(e, r, !Hr(e, r));
}
function _r(e, r) {
  return r.filter((n) => !sr(e, n));
}
function dn(e, r) {
  return r.some((n) => _e(e, n) ? td(e, n) ? true : Ce(e, n).some((s) => sr(e, s)) : sr(e, n));
}
const ai = 6, rd = 400;
function li(e) {
  return Number.isFinite(e) ? Math.min(rd, Math.max(ai, Math.round(e))) : ai;
}
function gs(e, r, n) {
  if (!r.length || !Number.isFinite(n) || n === 0) return e;
  const s = new Set(r);
  let i = false;
  const o = e.elements.map((a) => {
    if (!s.has(a.id)) return a;
    if (a.type === "text") {
      const u = Number(a.fontSize), c = li((Number.isFinite(u) ? u : 36) + n);
      return c === a.fontSize ? a : (i = true, { ...a, fontSize: c });
    }
    if (a.type === "rect" || a.type === "ellipse" || a.type === "roundRect") {
      const u = Number(a.fontSize), c = Number.isFinite(u) ? u : 24, f = li(c + n);
      return f === c && a.fontSize === f ? a : (i = true, { ...a, fontSize: f });
    }
    return a;
  });
  return i ? { ...e, elements: o } : e;
}
function un(e, r, n) {
  if (!r.length || n !== "left" && n !== "center" && n !== "right") return e;
  const s = new Set(r);
  let i = false;
  const o = e.elements.map((a) => s.has(a.id) ? a.type === "text" ? a.textAlign === n ? a : (i = true, { ...a, textAlign: n }) : a.type === "rect" || a.type === "ellipse" || a.type === "roundRect" ? a.textAlign === n ? a : (i = true, { ...a, textAlign: n }) : a : a);
  return i ? { ...e, elements: o } : e;
}
function yr(e, r, n) {
  return Math.min(n, Math.max(r, e));
}
function nd(e, r) {
  const n = new Set(r);
  return e.elements.filter((s) => n.has(s.id));
}
function sd(e, r) {
  if (_e(e, r)) {
    const s = nd(e, Ce(e, r));
    return s.length ? mn(s) : null;
  }
  const n = e.elements.find((s) => s.id === r);
  return n ? { x: n.x, y: n.y, w: n.w, h: n.h } : null;
}
function id(e, r) {
  return _e(e, r) ? Ce(e, r) : e.elements.some((n) => n.id === r) ? [r] : [];
}
function ci(e, r) {
  var _a2;
  const n = Fe(e), s = new Set(r), i = [], o = /* @__PURE__ */ new Set(), a = (c) => {
    if (o.has(c)) return;
    const f = id(n, c);
    if (!f.length || f.some((x) => s.has(x))) return;
    const b = sd(n, c);
    b && (o.add(c), i.push(b));
  };
  for (const c of n.rootLayerIds ?? []) a(c);
  const u = /* @__PURE__ */ new Set();
  for (const c of r) {
    let b = ((_a2 = n.elements.find((x) => x.id === c)) == null ? void 0 : _a2.groupId) ?? null;
    for (; b; ) {
      u.add(b);
      const x = Ca(n, b);
      b = x ?? null;
    }
  }
  for (const c of u) {
    const f = Ce(n, c);
    if (!(f.length > 0 && f.every((b) => s.has(b)))) for (const b of js(n, c)) a(b);
  }
  return i;
}
function _t(e, r, n) {
  let s = null;
  for (const i of e) for (const o of r) {
    const a = o - i, u = Math.abs(a);
    u > n || (!s || u < Math.abs(s.delta)) && (s = { delta: a, guide: o });
  }
  return s;
}
function od(e, r, n = {}) {
  const { objectSnapEnabled: s = false, frameCenterSnapEnabled: i = false, objectThresholdPx: o, frameCenterThresholdPx: a, frameWidthPx: u = 0, frameHeightPx: c = 0, thresholdPct: f = Ir, objectThresholdPct: b = f, frameCenterThresholdPct: x = f } = n;
  if (!s && !i) return { x: e.x, y: e.y, verticalGuides: [], horizontalGuides: [] };
  const p = (re) => u > 0 ? re / u * 100 : b, w = (re) => c > 0 ? re / c * 100 : b, y = o != null && u > 0 ? p(o) : b, g = o != null && c > 0 ? w(o) : b, k = a != null && u > 0 ? p(a) : x, N = a != null && c > 0 ? w(a) : x, L = e.x, C = e.x + e.w, E = e.x + e.w / 2, _ = e.y, O = e.y + e.h, z = e.y + e.h / 2, G = [], U = [];
  if (s) for (const re of r) G.push(re.x, re.x + re.w / 2, re.x + re.w), U.push(re.y, re.y + re.h / 2, re.y + re.h);
  const R = [L, E, C], I = [_, z, O], se = s ? _t(R, G, y) : null, V = s ? _t(I, U, g) : null, ie = i ? _t([E], [50], k) : null, ke = i ? _t([z], [50], N) : null, de = (re, Y) => re ? Y ? Math.abs(re.delta) <= Math.abs(Y.delta) ? re : Y : re : Y, $ = de(se, ie), q = de(V, ke);
  let T = e.x + (($ == null ? void 0 : $.delta) ?? 0), H = e.y + ((q == null ? void 0 : q.delta) ?? 0);
  T = yr(T, 0, 100 - e.w), H = yr(H, 0, 100 - e.h);
  const B = $ ? [$.guide] : [], ue = q ? [q.guide] : [];
  return { x: T, y: H, verticalGuides: B, horizontalGuides: ue };
}
const ad = 2;
function ld(e, r, n, s = {}) {
  const { objectSnapEnabled: i = false, frameCenterSnapEnabled: o = false, objectThresholdPx: a, frameCenterThresholdPx: u, frameWidthPx: c = 0, frameHeightPx: f = 0, minSizePct: b = ad } = s;
  if (!i && !o) return { ...e, verticalGuides: [], horizontalGuides: [] };
  const x = (I) => c > 0 ? I / c * 100 : Ir, p = (I) => f > 0 ? I / f * 100 : Ir, w = a != null && c > 0 ? x(a) : Ir, y = a != null && f > 0 ? p(a) : Ir, g = [], k = [];
  if (i) for (const I of n) g.push(I.x, I.x + I.w / 2, I.x + I.w), k.push(I.y, I.y + I.h / 2, I.y + I.h);
  o && (g.push(50), k.push(50));
  let { x: N, y: L, w: C, h: E } = e;
  const _ = [], O = [], z = r.includes("w"), G = r.includes("e"), U = r.includes("n"), R = r.includes("s");
  if (G) {
    const I = N + C, se = _t([I], g, w);
    se && (C = yr(I + se.delta - N, b, 100 - N), _.push(se.guide));
  } else if (z) {
    const I = N, se = N + C, V = _t([I], g, w);
    if (V) {
      const ie = yr(I + V.delta, 0, se - b);
      C = se - ie, N = ie, _.push(V.guide);
    }
  }
  if (R) {
    const I = L + E, se = _t([I], k, y);
    se && (E = yr(I + se.delta - L, b, 100 - L), O.push(se.guide));
  } else if (U) {
    const I = L, se = L + E, V = _t([I], k, y);
    if (V) {
      const ie = yr(I + V.delta, 0, se - b);
      E = se - ie, L = ie, O.push(V.guide);
    }
  }
  return { x: N, y: L, w: C, h: E, verticalGuides: _, horizontalGuides: O };
}
function di(e, r, n) {
  return Math.min(n, Math.max(r, e));
}
function mo(e, r) {
  if (_e(e, r)) {
    const s = cd(e, Ce(e, r));
    if (!s.length) return null;
    const i = mn(s);
    return i ? { memberIds: s.map((o) => o.id), bounds: i } : null;
  }
  const n = e.elements.find((s) => s.id === r);
  return n ? { memberIds: [n.id], bounds: { x: n.x, y: n.y, w: n.w, h: n.h } } : null;
}
function cd(e, r) {
  const n = new Set(r);
  return e.elements.filter((s) => n.has(s.id));
}
function ho(e, r) {
  const n = Fe(e), s = Ye(n, r), i = s.length === 1 && _e(n, s[0]) ? s[0] : null, o = [];
  for (const a of s) {
    const u = mo(n, a);
    u && o.push(u);
  }
  return { units: o, soleGroupId: i };
}
function xo(e, r) {
  const n = Fe(e);
  if (!Nt(n, r)) return [];
  const s = [];
  for (const i of js(n, r)) {
    const o = mo(n, i);
    o && s.push(o);
  }
  return s;
}
function dd(e, r, n, s = 0) {
  if (r.length < 1 || r.length < 2 && n.startsWith("distribute") || r.length < 2 && !n.startsWith("distribute")) return e;
  const i = Math.max(0, s), o = { x: Math.min(...r.map((p) => p.bounds.x)), y: Math.min(...r.map((p) => p.bounds.y)), right: Math.max(...r.map((p) => p.bounds.x + p.bounds.w)), bottom: Math.max(...r.map((p) => p.bounds.y + p.bounds.h)) }, a = o.right - o.x, u = o.bottom - o.y, c = /* @__PURE__ */ new Map(), f = (p, w, y) => {
    for (const g of p.memberIds) c.set(g, { dx: w, dy: y });
  };
  if (n === "left") for (const p of r) f(p, o.x - p.bounds.x, 0);
  else if (n === "centerX") {
    const p = o.x + a / 2;
    for (const w of r) f(w, p - (w.bounds.x + w.bounds.w / 2), 0);
  } else if (n === "right") for (const p of r) f(p, o.right - (p.bounds.x + p.bounds.w), 0);
  else if (n === "top") for (const p of r) f(p, 0, o.y - p.bounds.y);
  else if (n === "centerY") {
    const p = o.y + u / 2;
    for (const w of r) f(w, 0, p - (w.bounds.y + w.bounds.h / 2));
  } else if (n === "bottom") for (const p of r) f(p, 0, o.bottom - (p.bounds.y + p.bounds.h));
  else if (n === "distributeX") {
    const p = [...r].sort((w, y) => w.bounds.x - y.bounds.x);
    if (p.length === 2) {
      const w = p[0], y = p[1], g = w.bounds.x + w.bounds.w + i;
      f(y, g - y.bounds.x, 0);
    } else {
      const w = p[0], k = (p[p.length - 1].bounds.x - w.bounds.x) / (p.length - 1);
      p.slice(1, -1).forEach((N, L) => {
        const C = w.bounds.x + k * (L + 1);
        f(N, C - N.bounds.x, 0);
      });
    }
  } else if (n === "distributeY") {
    const p = [...r].sort((w, y) => w.bounds.y - y.bounds.y);
    if (p.length === 2) {
      const w = p[0], y = p[1], g = w.bounds.y + w.bounds.h + i;
      f(y, 0, g - y.bounds.y);
    } else {
      const w = p[0], k = (p[p.length - 1].bounds.y - w.bounds.y) / (p.length - 1);
      p.slice(1, -1).forEach((N, L) => {
        const C = w.bounds.y + k * (L + 1);
        f(N, 0, C - N.bounds.y);
      });
    }
  }
  if (!e.elements.filter((p) => c.has(p.id)).length) return e;
  const x = /* @__PURE__ */ new Map();
  for (const p of r) {
    const w = p.memberIds[0];
    if (!w) continue;
    const y = c.get(w);
    if (!y) continue;
    let { dx: g, dy: k } = y;
    for (const N of p.memberIds) {
      const L = e.elements.find((C) => C.id === N);
      L && (g < 0 && (g = Math.max(g, -L.x)), g > 0 && (g = Math.min(g, 100 - L.w - L.x)), k < 0 && (k = Math.max(k, -L.y)), k > 0 && (k = Math.min(k, 100 - L.h - L.y)));
    }
    for (const N of p.memberIds) x.set(N, { dx: g, dy: k });
  }
  return { ...e, elements: e.elements.map((p) => {
    const w = x.get(p.id);
    return !w || w.dx === 0 && w.dy === 0 ? p : { ...p, x: di(p.x + w.dx, 0, 100 - p.w), y: di(p.y + w.dy, 0, 100 - p.h) };
  }) };
}
function Dr(e, r, n, s = 0, i) {
  const o = (i == null ? void 0 : i.insideGroupId) ? xo(e, i.insideGroupId) : ho(e, r).units;
  return dd(e, o, n, s);
}
function go(e, r) {
  const { units: n, soleGroupId: s } = ho(e, r);
  if (s) {
    const i = xo(e, s);
    return { enabled: i.length >= 2, soleGroupId: s, unitCount: i.length };
  }
  return { enabled: n.length >= 2, soleGroupId: null, unitCount: n.length };
}
function le(e, r, n) {
  return Math.min(n, Math.max(r, e));
}
function zs(e, r, n, s = 50) {
  if (!(e > 0) || r < 1 || n < 1) return { w: s, h: 35 };
  let i = s, o = i * r / (n * e);
  return o > 55 && (o = 55, i = o * n * e / r), i > 90 && (i = 90, o = i * r / (n * e)), { w: le(i, 4, 100), h: le(o, 4, 100) };
}
function ud(e, r, n) {
  const s = e.naturalAspect;
  if (s == null || !(s > 0) || r < 1 || n < 1) return e;
  const i = e.x + e.w / 2, o = e.y + e.h / 2, a = zs(s, r, n, e.w), u = a.w, c = a.h;
  let f = i - u / 2, b = o - c / 2;
  return f < 0 && (f = 0), b < 0 && (b = 0), f + u > 100 && (f = 100 - u), b + c > 100 && (b = 100 - c), { ...e, x: f, y: b, w: u, h: c };
}
function Zn(e, r, n, s, i) {
  let o = { ...e, naturalAspect: r };
  if (i) {
    const a = zs(r, n, s, e.w || 50), u = e.x + e.w / 2, c = e.y + e.h / 2;
    let f = u - a.w / 2, b = c - a.h / 2;
    f = le(f, 0, 100 - a.w), b = le(b, 0, 100 - a.h), o = { ...o, x: f, y: b, w: a.w, h: a.h };
  }
  return o;
}
function fd(e, r, n, s, i, o) {
  if (o) {
    const b = e.x + e.w / 2, x = e.y + e.h / 2;
    let p = 0, w = 0;
    r.includes("e") && (p += n), r.includes("w") && (p -= n), r.includes("s") && (w += s), r.includes("n") && (w -= s);
    const y = Math.max(i, 2 * Math.min(b, 100 - b)), g = Math.max(i, 2 * Math.min(x, 100 - x)), k = le(e.w + 2 * p, i, y), N = le(e.h + 2 * w, i, g);
    return { x: b - k / 2, y: x - N / 2, w: k, h: N };
  }
  let { x: a, y: u, w: c, h: f } = e;
  if (r.includes("e") && (c = le(e.w + n, i, 100 - e.x)), r.includes("s") && (f = le(e.h + s, i, 100 - e.y)), r.includes("w")) {
    const b = le(e.w - n, i, e.x + e.w), x = e.w - b;
    a = le(e.x + x, 0, 100 - b), c = b;
  }
  if (r.includes("n")) {
    const b = le(e.h - s, i, e.y + e.h), x = e.h - b;
    u = le(e.y + x, 0, 100 - b), f = b;
  }
  return { x: a, y: u, w: c, h: f };
}
function pd(e, r, n, s, i, o, a) {
  const c = !!(a == null ? void 0 : a.fromCenter);
  if (!!!e.lockAspect || i < 1 || o < 1) {
    const C = fd(e, r, n, s, 4, c);
    return { ...e, ...C };
  }
  const b = e.w / Math.max(e.h, 1e-3) * (i / o), x = e.naturalAspect && e.naturalAspect > 0 ? e.naturalAspect : b, p = (C) => C * i / (o * x), w = (C) => C * o * x / i;
  if (c) {
    const C = e.x + e.w / 2, E = e.y + e.h / 2, _ = Math.max(4, 2 * Math.min(C, 100 - C)), O = Math.max(4, 2 * Math.min(E, 100 - E));
    let z = 0, G = 0;
    r.includes("e") && (z += n), r.includes("w") && (z -= n), r.includes("s") && (G += s), r.includes("n") && (G -= s);
    const U = r.length === 2;
    let R, I;
    return U ? Math.abs(n) * i >= Math.abs(s) * o ? (R = le(e.w + 2 * z, 4, _), I = p(R), I > O && (I = O, R = le(w(I), 4, _))) : (I = le(e.h + 2 * G, 4, O), R = w(I), R > _ && (R = _, I = le(p(R), 4, O))) : r === "e" || r === "w" ? (R = le(e.w + 2 * z, 4, _), I = p(R), I > O && (I = O, R = le(w(I), 4, _))) : (I = le(e.h + 2 * G, 4, O), R = w(I), R > _ && (R = _, I = le(p(R), 4, O))), { ...e, x: C - R / 2, y: E - I / 2, w: R, h: I };
  }
  let { x: y, y: g, w: k, h: N } = e;
  if (r.length === 2) if (Math.abs(n) * i >= Math.abs(s) * o) {
    if (r.includes("e") && (k = le(e.w + n, 4, 100 - e.x)), r.includes("w")) {
      const E = le(e.w - n, 4, e.x + e.w);
      y = le(e.x + (e.w - E), 0, 100 - E), k = E;
    }
    N = p(k), r.includes("n") && (g = le(e.y + e.h - N, 0, 100 - N)), g + N > 100 && (N = 100 - g, k = w(N), r.includes("w") && (y = le(e.x + e.w - k, 0, 100 - k)));
  } else {
    if (r.includes("s") && (N = le(e.h + s, 4, 100 - e.y)), r.includes("n")) {
      const E = le(e.h - s, 4, e.y + e.h);
      g = le(e.y + (e.h - E), 0, 100 - E), N = E;
    }
    k = w(N), r.includes("w") && (y = le(e.x + e.w - k, 0, 100 - k)), y + k > 100 && (k = 100 - y, N = p(k), r.includes("n") && (g = le(e.y + e.h - N, 0, 100 - N)));
  }
  else if (r === "e" || r === "w") {
    if (r === "e") k = le(e.w + n, 4, 100 - e.x);
    else {
      const C = le(e.w - n, 4, e.x + e.w);
      y = le(e.x + (e.w - C), 0, 100 - C), k = C;
    }
    N = p(k), g = le(e.y + (e.h - N) / 2, 0, 100 - N);
  } else {
    if (r === "s") N = le(e.h + s, 4, 100 - e.y);
    else {
      const C = le(e.h - s, 4, e.y + e.h);
      g = le(e.y + (e.h - C), 0, 100 - C), N = C;
    }
    k = w(N), y = le(e.x + (e.w - k) / 2, 0, 100 - k);
  }
  return { ...e, x: le(y, 0, 100 - k), y: le(g, 0, 100 - N), w: le(k, 4, 100), h: le(N, 4, 100) };
}
function md({ isOpen: e, onClose: r, fonts: n, onFontsChange: s }) {
  const [i, o] = d.useState(() => n || { ...is }), [a, u] = d.useState(false), [c, f] = d.useState(0);
  d.useEffect(() => {
    e && n && o(n);
  }, [e, n]), d.useEffect(() => {
    const y = () => f((g) => g + 1);
    return window.addEventListener(pn, y), () => window.removeEventListener(pn, y);
  }, []);
  const b = d.useMemo(() => Ss(), [c]), x = (y, g) => {
    const k = { ...i, [y]: g };
    o(k), s == null ? void 0 : s(k);
  }, p = async () => {
    u(true);
    try {
      await Ea(i), s == null ? void 0 : s(i), r == null ? void 0 : r();
    } catch (y) {
      alert("\uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4: " + ((y == null ? void 0 : y.message) || y));
    } finally {
      u(false);
    }
  }, w = () => {
    o({ ...is });
  };
  return t.jsx(Bi, { isOpen: e, onClose: r, onConfirm: a ? void 0 : p, ignoreEnterInFields: true, children: t.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [t.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uD504\uB9B0\uD2B8 \uD3F0\uD2B8 \uC124\uC815" }), t.jsx("p", { className: "text-xs text-gray-500 dark:text-odp-muted", children: "PDF\uB85C \uB0B4\uBCF4\uB0BC \uB54C \uC801\uC6A9\uB420 \uD3F0\uD2B8\uB97C \uC124\uC815\uD569\uB2C8\uB2E4. \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uD3F0\uD2B8\uAC00 \uC0AC\uC6A9\uB429\uB2C8\uB2E4. \uC6F9\uD3F0\uD2B8\uB294 \uC124\uC815 \u2192 \uC6F9\uD3F0\uD2B8(CSS)\uC5D0\uC11C \uCD94\uAC00\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), t.jsxs("div", { className: "grid gap-4", children: [t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1", children: "\uBCF8\uBB38" }), t.jsx(wr, { id: "print-font-body", value: i.body, onChange: (y) => x("body", y), options: b, placeholder: "\uC608: Noto Sans KR, serif" })] }), t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1", children: "\uC81C\uBAA9 (h1~h10)" }), t.jsx(wr, { id: "print-font-heading", value: i.heading, onChange: (y) => x("heading", y), options: b, placeholder: "\uC608: Noto Serif KR, Georgia" })] }), t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1", children: "\uAD75\uC740 \uAE00\uC528 (b, strong)" }), t.jsx(wr, { id: "print-font-bold", value: i.bold, onChange: (y) => x("bold", y), options: b, placeholder: "\uC608: Noto Sans KR, sans-serif" })] }), t.jsxs("label", { className: "block", children: [t.jsx("span", { className: "block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1", children: "\uCF54\uB4DC \uBE14\uB85D (code, pre)" }), t.jsx(wr, { id: "print-font-code", value: i.code, onChange: (y) => x("code", y), options: b, placeholder: "\uC608: Consolas, monospace" })] })] }), t.jsxs("div", { className: "flex items-center justify-between gap-2 pt-2", children: [t.jsx("button", { type: "button", onClick: w, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-odp-muted dark:hover:text-odp-fg", children: "\uAE30\uBCF8\uAC12\uC73C\uB85C \uCD08\uAE30\uD654" }), t.jsxs("div", { className: "flex gap-2", children: [t.jsx("button", { type: "button", onClick: r, className: "px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition", children: "\uCDE8\uC18C" }), t.jsx("button", { type: "button", onClick: p, disabled: a, className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition disabled:opacity-50 disabled:cursor-not-allowed", children: a ? "\uC800\uC7A5 \uC911\u2026" : "\uC801\uC6A9" })] })] })] }) });
}
function hd({ maxWidth: e, maxHeight: r, widthFallback: n = "718px", heightFallback: s = "1047px", onChange: i }) {
  const [o, a] = d.useState(e), [u, c] = d.useState(r), [f, b] = d.useState(false), [x, p] = d.useState(false), w = d.useRef(null), y = d.useRef(null), g = d.useRef({ maxWidth: e, maxHeight: r, onChange: i, widthFallback: n, heightFallback: s });
  g.current = { maxWidth: e, maxHeight: r, onChange: i, widthFallback: n, heightFallback: s }, d.useEffect(() => {
    a(e), b(false);
  }, [e]), d.useEffect(() => {
    c(r), p(false);
  }, [r]);
  const k = (C) => /^\d+px$/i.test(C.trim()), N = (C) => {
    const E = qr(C);
    if (E === null) {
      b(true);
      return;
    }
    b(false), a(E), E !== e && i({ maxWidth: E, maxHeight: r });
  }, L = (C) => {
    const E = qr(C);
    if (E === null) {
      p(true);
      return;
    }
    p(false), c(E), E !== r && i({ maxWidth: e, maxHeight: E });
  };
  return d.useEffect(() => {
    const C = w.current, E = y.current;
    if (!C || !E) return;
    const _ = (G, U) => {
      const R = (I) => {
        I.preventDefault(), I.stopPropagation();
        const se = I.deltaY < 0 ? 1 : -1, { maxWidth: V, maxHeight: ie, onChange: ke, widthFallback: de, heightFallback: $ } = g.current, q = G.value, T = U === "width" ? de : $, H = Pa(q, se, { shiftKey: I.shiftKey, altKey: I.altKey, emptyFallback: T });
        if (H !== null) {
          if (U === "width") {
            a(H), b(false), H !== V && ke({ maxWidth: H, maxHeight: ie });
            return;
          }
          c(H), p(false), H !== ie && ke({ maxWidth: V, maxHeight: H });
        }
      };
      return G.addEventListener("wheel", R, { passive: false }), () => G.removeEventListener("wheel", R);
    }, O = _(C, "width"), z = _(E, "height");
    return () => {
      O(), z();
    };
  }, []), t.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2", children: [t.jsx("span", { className: "shrink-0 text-xs text-gray-500 dark:text-odp-muted", children: "\uC774\uBBF8\uC9C0 \uCD5C\uB300 (px)" }), t.jsxs("label", { className: "flex items-center gap-1", children: [t.jsx("span", { className: "text-xs text-gray-500 dark:text-odp-muted", children: "W" }), t.jsx("input", { ref: w, type: "text", inputMode: "numeric", "data-print-toolbar": "image-max", value: o, onChange: (C) => {
    const E = C.target.value;
    a(E);
    const _ = qr(E);
    b(_ === null), _ !== null && k(E) && _ !== e && i({ maxWidth: _, maxHeight: r });
  }, onBlur: (C) => N(C.target.value), onKeyDown: (C) => {
    C.key === "Enter" && (C.preventDefault(), N(C.currentTarget.value));
  }, placeholder: "718px", "aria-label": "\uBAA8\uB4E0 \uC774\uBBF8\uC9C0 max-width (px)", title: "\uD720: 10px / Shift+\uD720: 50px / Alt+\uD720: 1px", "aria-invalid": f, className: `h-8 w-24 rounded-md border bg-white px-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:bg-odp-surface dark:text-odp-fgStrong ${f ? "border-red-400 dark:border-red-500" : "border-gray-300 dark:border-odp-borderStrong"}` })] }), t.jsxs("label", { className: "flex items-center gap-1", children: [t.jsx("span", { className: "text-xs text-gray-500 dark:text-odp-muted", children: "H" }), t.jsx("input", { ref: y, type: "text", inputMode: "numeric", value: u, onChange: (C) => {
    const E = C.target.value;
    c(E);
    const _ = qr(E);
    p(_ === null), _ !== null && k(E) && _ !== r && i({ maxWidth: e, maxHeight: _ });
  }, onBlur: (C) => L(C.target.value), onKeyDown: (C) => {
    C.key === "Enter" && (C.preventDefault(), L(C.currentTarget.value));
  }, placeholder: "1047px", "aria-label": "\uBAA8\uB4E0 \uC774\uBBF8\uC9C0 max-height (px)", title: "\uD720: 10px / Shift+\uD720: 50px / Alt+\uD720: 1px", "aria-invalid": x, className: `h-8 w-28 rounded-md border bg-white px-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:bg-odp-surface dark:text-odp-fgStrong ${x ? "border-red-400 dark:border-red-500" : "border-gray-300 dark:border-odp-borderStrong"}` })] })] });
}
function ui({ children: e, showPageMarker: r = false, className: n = "" }) {
  return t.jsxs("div", { className: `relative ${n}`, "data-print-cover-page": r ? "1" : void 0, children: [e, r ? t.jsxs("div", { className: "pointer-events-none absolute inset-0 z-10 print:hidden", "aria-hidden": true, children: [t.jsx("span", { className: "absolute top-1 right-0 translate-x-[calc(100%+0.35rem)] rounded bg-red-50 px-1 text-[10px] font-medium leading-4 text-red-600 shadow-sm dark:bg-red-950/80 dark:text-red-300", children: "1p" }), t.jsx("div", { className: "absolute inset-x-0 bottom-0 border-b-2 border-dashed border-red-400/80" })] }) : null] });
}
function xd({ value: e, onValueChange: r }) {
  return t.jsxs("label", { className: "flex min-w-0 items-center gap-2", children: [t.jsx("span", { className: "shrink-0 text-xs text-gray-500 dark:text-odp-muted", children: "\uC6A9\uC9C0" }), t.jsxs(Ft, { value: e, onValueChange: (n) => {
    const s = os.find((i) => i.id === n);
    s && r(s.id);
  }, children: [t.jsxs(Bt, { "aria-label": "\uC778\uC1C4 \uC6A9\uC9C0 \uD06C\uAE30", "data-print-toolbar": "paper", className: "inline-flex h-8 min-w-36 items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [t.jsx(Ht, {}), t.jsx(Wt, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Kt, { children: t.jsx(Gt, { className: "z-100010 max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: os.map((n) => t.jsxs(Ut, { value: n.id, className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(St, { size: 12 }) }), t.jsx(Vt, { children: n.label })] }, n.id)) }) }) })] })] });
}
const gd = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), bd = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
function wd({ checked: e, onCheckedChange: r, disabled: n = false }) {
  return t.jsxs("label", { className: "inline-flex items-center gap-2", children: [t.jsx("span", { className: "shrink-0 text-xs text-gray-500 dark:text-odp-muted", children: "\uCCAB\uC7A5 \uB2E8\uBA74" }), t.jsx(tr, { className: gd(e), checked: e, disabled: n, onCheckedChange: r, "aria-label": "\uCCAB\uC7A5 \uB2E8\uBA74\uC73C\uB85C \uBCF4\uAE30", "data-print-toolbar": "first-page-single", children: t.jsx(rr, { className: bd }) })] });
}
const Jn = [{ value: "scroll", label: "\uC2A4\uD06C\uB864", Icon: Yl }, { value: "flip", label: "\uB118\uAE30\uAE30", Icon: Vl }];
function yd({ value: e, onValueChange: r, disabled: n = false }) {
  const s = Jn.find((i) => i.value === e) ?? Jn[0];
  return t.jsxs("label", { className: "flex min-w-0 items-center gap-2", children: [t.jsx("span", { className: "shrink-0 text-xs text-gray-500 dark:text-odp-muted", children: "\uBCF4\uAE30" }), t.jsxs(Ft, { value: e, disabled: n, onValueChange: (i) => {
    (i === "scroll" || i === "flip") && r(i);
  }, children: [t.jsxs(Bt, { "aria-label": "\uBBF8\uB9AC\uBCF4\uAE30 \uC2A4\uD06C\uB864/\uB118\uAE30\uAE30", "data-print-toolbar": "view-nav", className: "inline-flex h-8 min-w-32 items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [t.jsxs("span", { className: "inline-flex min-w-0 items-center gap-1.5", children: [t.jsx(s.Icon, { size: 14, className: "shrink-0 text-gray-500 dark:text-odp-muted", "aria-hidden": true }), t.jsx(Ht, {})] }), t.jsx(Wt, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Kt, { children: t.jsx(Gt, { className: "z-100010 max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: Jn.map(({ value: i, label: o, Icon: a }) => t.jsxs(Ut, { value: i, className: "relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(St, { size: 12 }) }), t.jsx(a, { size: 14, className: "shrink-0 text-gray-500 dark:text-odp-muted", "aria-hidden": true }), t.jsx(Vt, { children: o })] }, i)) }) }) })] })] });
}
const Qn = [{ value: 1, label: "1\uD398\uC774\uC9C0", Icon: ql }, { value: 2, label: "2\uD398\uC774\uC9C0", Icon: Zl }];
function vd({ value: e, onValueChange: r, disabled: n = false }) {
  const s = Qn.find((i) => i.value === e) ?? Qn[0];
  return t.jsxs("label", { className: "flex min-w-0 items-center gap-2", children: [t.jsx("span", { className: "shrink-0 text-xs text-gray-500 dark:text-odp-muted", children: "\uD398\uC774\uC9C0" }), t.jsxs(Ft, { value: String(e), disabled: n, onValueChange: (i) => {
    i === "1" ? r(1) : i === "2" && r(2);
  }, children: [t.jsxs(Bt, { "aria-label": "\uBBF8\uB9AC\uBCF4\uAE30 1\uD398\uC774\uC9C0/2\uD398\uC774\uC9C0", "data-print-toolbar": "view-pages", className: "inline-flex h-8 min-w-32 items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [t.jsxs("span", { className: "inline-flex min-w-0 items-center gap-1.5", children: [t.jsx(s.Icon, { size: 14, className: "shrink-0 text-gray-500 dark:text-odp-muted", "aria-hidden": true }), t.jsx(Ht, {})] }), t.jsx(Wt, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Kt, { children: t.jsx(Gt, { className: "z-100010 max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: Qn.map(({ value: i, label: o, Icon: a }) => t.jsxs(Ut, { value: String(i), className: "relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(St, { size: 12 }) }), t.jsx(a, { size: 14, className: "shrink-0 text-gray-500 dark:text-odp-muted", "aria-hidden": true }), t.jsx(Vt, { children: o })] }, i)) }) }) })] })] });
}
const bo = "s3haim_print_preview_view", hn = 25, As = 400, Fr = 5, nr = 16, yt = { navigation: "scroll", pages: 1, firstPageSingle: true, zoomPercent: 100 };
function Ln(e) {
  if (!Number.isFinite(e)) return yt.zoomPercent;
  const r = Math.round(e / Fr) * Fr;
  return Math.min(As, Math.max(hn, r));
}
function $r(e, r) {
  return Ln(e + r * Fr);
}
function kd(e) {
  return e === "scroll" || e === "flip";
}
function jd(e) {
  return e === 1 || e === 2;
}
function wo(e, r) {
  const n = Math.max(0, Math.floor(e));
  if (n === 0) return [{ left: null, right: null }];
  const s = [];
  let i = 0;
  for (r && (s.push({ left: 0, right: null, centerSingle: true }), i = 1); i < n; ) {
    const o = i, a = i + 1 < n ? i + 1 : null;
    s.push({ left: o, right: a }), i += 2;
  }
  return s;
}
function Sd(e, r) {
  for (let n = 0; n < e.length; n += 1) {
    const s = e[n];
    if (s && (s.left === r || s.right === r)) return n;
  }
  return 0;
}
function fi(e) {
  const r = [];
  return e.left != null && r.push(e.left), e.right != null && r.push(e.right), r;
}
function Nd(e) {
  const r = Ta(e);
  return { widthPx: Math.max(1, Math.round(Xs(r.widthMm))), heightPx: Math.max(1, Math.round(Xs(r.heightMm))) };
}
function Cd(e) {
  const { viewportWidth: r, viewportHeight: n, pageWidthPx: s, pageHeightPx: i, pageCols: o, gapPx: a = nr, paddingPx: u = 32 } = e, c = Math.max(1, r - u * 2), f = Math.max(1, n - u * 2), b = s * o + (o > 1 ? a : 0), x = i, p = Math.min(c / b, f / x), w = Math.floor(p * 100 / Fr) * Fr;
  return Math.min(As, Math.max(hn, w || hn));
}
function Ed() {
  if (typeof window > "u") return { ...yt };
  try {
    const e = window.localStorage.getItem(bo);
    if (!e) return { ...yt };
    const r = JSON.parse(e);
    if (!r || typeof r != "object") return { ...yt };
    const n = r;
    return { navigation: kd(n.navigation) ? n.navigation : yt.navigation, pages: jd(n.pages) ? n.pages : yt.pages, firstPageSingle: typeof n.firstPageSingle == "boolean" ? n.firstPageSingle : yt.firstPageSingle, zoomPercent: Ln(typeof n.zoomPercent == "number" ? n.zoomPercent : yt.zoomPercent) };
  } catch {
    return { ...yt };
  }
}
function zr(e) {
  if (!(typeof window > "u")) try {
    window.localStorage.setItem(bo, JSON.stringify(e));
  } catch {
  }
}
const Is = "print-pack-line", yo = "export-pdf-page-inner", qt = "data-print-body-page";
function vo(e) {
  return Math.max(e.offsetHeight, e.getBoundingClientRect().height, 1);
}
function Pd(e) {
  return e.classList.contains("md-pgbr") || e.matches(".md-pgbr");
}
function Td(e) {
  var _a2;
  const r = e.parentElement;
  return !!(!r || r.closest('[aria-hidden="true"], .md-pgbr, .md-editor-code-head, .md-editor-code, pre, code, .md-editor-mermaid') || ((_a2 = r.closest("figure")) == null ? void 0 : _a2.querySelector("img")));
}
function pi(e, r) {
  var _a2;
  const n = document;
  if (typeof n.caretRangeFromPoint == "function") return n.caretRangeFromPoint(e, r);
  const s = (_a2 = n.caretPositionFromPoint) == null ? void 0 : _a2.call(n, e, r);
  if (!(s == null ? void 0 : s.offsetNode)) return null;
  const i = document.createRange();
  try {
    return i.setStart(s.offsetNode, s.offset), i.collapse(true), i;
  } catch {
    return null;
  }
}
function Rd(e) {
  const r = [], n = document.createRange(), s = document.createTreeWalker(e, NodeFilter.SHOW_TEXT, { acceptNode(o) {
    var _a2;
    return !((_a2 = o.textContent) == null ? void 0 : _a2.trim()) || Td(o) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
  } });
  let i = s.nextNode();
  for (; i; ) {
    n.selectNodeContents(i);
    const o = n.getClientRects();
    for (let a = 0; a < o.length; a += 1) {
      const u = o.item(a);
      if (!u || u.height < 2 || u.width < 1) continue;
      const c = Math.round(u.top * 2) / 2;
      r.some((f) => Math.abs(f - c) < 1) || r.push(c);
    }
    i = s.nextNode();
  }
  return r.sort((o, a) => o - a), r.map((o, a) => {
    const u = r[a + 1], c = u ?? o + 16;
    return (o + c) / 2;
  });
}
function Md(e, r, n) {
  const s = e.getBoundingClientRect(), i = Math.min(s.right - 2, s.left + Math.max(4, s.width * 0.02)), o = pi(i, r);
  if (!o || !e.contains(o.startContainer)) return null;
  const a = document.createRange();
  if (a.setStart(o.startContainer, o.startOffset), n == null) {
    a.setEndAfter(e.lastChild ?? e);
    try {
      a.setEnd(e, e.childNodes.length);
    } catch {
    }
    return a;
  }
  const u = pi(i, n);
  return !u || !e.contains(u.startContainer) ? (a.setEnd(e, e.childNodes.length), a) : (a.setEnd(u.startContainer, u.startOffset), a);
}
function Ld(e, r) {
  const n = getComputedStyle(e);
  r.style.margin = "0", r.style.padding = "0", r.style.font = n.font, r.style.fontSize = n.fontSize, r.style.fontWeight = n.fontWeight, r.style.fontFamily = n.fontFamily, r.style.lineHeight = n.lineHeight, r.style.letterSpacing = n.letterSpacing, r.style.textAlign = n.textAlign, r.style.color = n.color, r.style.whiteSpace = n.whiteSpace, r.style.wordBreak = n.wordBreak, r.style.overflowWrap = n.overflowWrap;
}
function zd(e, r, n) {
  const s = /^H[1-6]$/i.test(e.tagName) ? e.tagName.toLowerCase() : "div", i = document.createElement(s);
  if (i.className = Is, i.dataset.printPackLine = "1", i.dataset.printPackSource = e.tagName.toLowerCase(), r === 0 && e.id && (i.id = e.id), r === 0) {
    const o = getComputedStyle(e).marginTop;
    o && o !== "0px" && (i.style.marginTop = o);
  }
  if (r === n - 1) {
    const o = getComputedStyle(e).marginBottom;
    o && o !== "0px" && (i.style.marginBottom = o);
  }
  if (Ld(e, i), /^H[1-6]$/i.test(e.tagName) && (i.style.fontWeight = getComputedStyle(e).fontWeight), e.tagName === "LI") {
    const o = getComputedStyle(e);
    i.style.paddingLeft = o.paddingLeft, i.style.listStyleType = o.listStyleType, i.style.display = "list-item", i.style.marginLeft = o.marginLeft;
  }
  return i;
}
function Ad(e) {
  const r = Rd(e);
  if (r.length <= 1) {
    const s = e.cloneNode(true);
    return s.classList.add(Is), s.dataset.printPackLine = "1", [s];
  }
  const n = [];
  for (let s = 0; s < r.length; s += 1) {
    const i = r[s], o = r[s + 1] ?? null, a = Md(e, i, o), u = zd(e, s, r.length);
    if (a && !a.collapsed) try {
      u.appendChild(a.cloneContents());
    } catch {
      u.textContent = a.toString();
    }
    else s === 0 && u.appendChild(e.cloneNode(true));
    u.childNodes.length === 0 && s === 0 && u.appendChild(e.cloneNode(true)), (u.childNodes.length > 0 || s === 0) && n.push(u);
  }
  return n.length > 0 ? n : [e.cloneNode(true)];
}
function Id(e) {
  const r = e.querySelector(".md-editor-code-head");
  return r ? vo(r) : 0;
}
function Dd(e) {
  return Math.max(1, vo(e) - Id(e));
}
function $d(e, r) {
  var _a2;
  const n = e.cloneNode(true);
  if ((_a2 = n.querySelector(".md-editor-code-head")) == null ? void 0 : _a2.remove(), !r) return n;
  const i = n.querySelector("pre code");
  if (!i) return n;
  const o = r.className, a = r.textContent ?? "", u = [...e.querySelectorAll(".md-editor-code-block")].indexOf(r);
  i.replaceChildren();
  const c = document.createElement("span");
  return c.className = o || "md-editor-code-block", c.textContent = a, u >= 0 && (c.dataset.line = String(u + 1)), i.appendChild(c), n;
}
function Od(e, r, n) {
  var _a2, _b;
  if (Dd(e) <= r + 0.5) {
    const o = e.cloneNode(true);
    (_a2 = o.querySelector(".md-editor-code-head")) == null ? void 0 : _a2.remove(), n.push({ type: "element", element: o });
    return;
  }
  const i = [...e.querySelectorAll("pre code .md-editor-code-block")];
  if (i.length === 0) {
    const o = e.cloneNode(true);
    (_b = o.querySelector(".md-editor-code-head")) == null ? void 0 : _b.remove(), n.push({ type: "element", element: o });
    return;
  }
  for (const o of i) n.push({ type: "element", element: $d(e, o) });
}
function mi(e, r) {
  for (const n of Ad(e)) r.push({ type: "element", element: n });
}
function bs(e, r, n) {
  for (const s of Array.from(e.children)) {
    const i = s;
    if (i instanceof HTMLElement) {
      if (Pd(i)) {
        n.push({ type: "page-break" });
        continue;
      }
      if (i.matches(".md-editor-code")) {
        Od(i, r, n);
        continue;
      }
      if (i.matches(".md-editor-mermaid, table, [data-haim-table], hr")) {
        n.push({ type: "element", element: i.cloneNode(true) });
        continue;
      }
      if (i.matches("figure") || i.matches("img") && !i.closest("figure")) {
        const o = i.matches("figure") ? i : i.closest("figure") ?? i;
        n.push({ type: "element", element: o.cloneNode(true) });
        continue;
      }
      if (i.matches("ul, ol")) {
        for (const o of i.querySelectorAll(":scope > li")) mi(o, n);
        continue;
      }
      if (i.matches("blockquote")) {
        bs(i, r, n);
        continue;
      }
      if (i.matches("p, h1, h2, h3, h4, h5, h6, li")) {
        mi(i, n);
        continue;
      }
      if (i.children.length > 0 && !i.matches("pre, code, svg")) {
        bs(i, r, n);
        continue;
      }
      n.push({ type: "element", element: i.cloneNode(true) });
    }
  }
}
function ko(e) {
  return e.querySelector(".md-editor-preview") ?? e.querySelector('[id$="-preview"]') ?? e;
}
function _d(e, r) {
  const n = ko(e), s = [];
  return bs(n, r, s), s;
}
function tn(e, r, n = "") {
  const s = document.createElement("div");
  s.className = "export-pdf-page export-pdf-paper", s.setAttribute(qt, String(r)), s.style.width = "var(--print-page-width)", s.style.height = "var(--print-page-height)", s.style.minHeight = "var(--print-page-height)", s.style.maxHeight = "var(--print-page-height)", s.style.padding = "var(--print-page-margin)", s.style.boxSizing = "border-box", s.style.overflow = "hidden", s.style.background = "#ffffff", s.style.color = "#111827";
  const i = document.createElement("div");
  return i.className = [yo, "md-editor-preview", n].filter(Boolean).join(" "), i.setAttribute("data-export-pdf-preview", "1"), i.style.height = `${Math.max(1, e)}px`, i.style.maxHeight = `${Math.max(1, e)}px`, i.style.overflow = "hidden", i.style.position = "relative", s.appendChild(i), s;
}
function es(e) {
  const r = e.querySelector(`.${yo}`);
  if (!r) throw new Error("export-pdf-page missing inner");
  return r;
}
function ts(e, r) {
  return e.scrollHeight > r + 1;
}
function Fd(e) {
  for (const r of e.querySelectorAll("[id]")) r.closest(".md-editor-mermaid") || r.removeAttribute("id");
}
let hi = 0;
function Bd(e) {
  var _a2;
  const r = ((_a2 = e.classList) == null ? void 0 : _a2.contains("md-editor-mermaid")) ? [e] : [...e.querySelectorAll(".md-editor-mermaid")];
  for (const n of r) {
    const s = n.querySelector("svg");
    if (!s) continue;
    hi += 1;
    const i = `pm${hi}-`, o = /* @__PURE__ */ new Map(), a = [s, ...s.querySelectorAll("[id]")];
    for (const c of a) {
      const f = c.id;
      if (!f) continue;
      const b = `${i}${f}`;
      o.set(f, b), c.id = b;
    }
    if (o.size === 0) continue;
    const u = (c) => {
      let f = c;
      const b = [...o.entries()].sort((x, p) => p[0].length - x[0].length);
      for (const [x, p] of b) f = f.split(x).join(p);
      return f;
    };
    for (const c of s.querySelectorAll("style")) c.textContent && (c.textContent = u(c.textContent));
    for (const c of [s, ...s.querySelectorAll("*")]) for (const f of [...c.attributes]) {
      if (!f.value.includes("#")) continue;
      const b = u(f.value);
      b !== f.value && c.setAttribute(f.name, b);
    }
  }
}
function Hd(e) {
  const { stagingRoot: r, pagesHost: n, pageInnerHeightPx: s } = e;
  if (s <= 1) return n.replaceChildren(), n.appendChild(tn(1, 0)), { pageCount: 1 };
  const o = [...ko(r).classList].find((w) => w.endsWith("-theme")) ?? "", a = _d(r, s);
  n.replaceChildren();
  let u = 0, c = tn(s, u, o), f = es(c);
  n.appendChild(c);
  const b = () => {
    u += 1, c = tn(s, u, o), f = es(c), n.appendChild(c);
  };
  for (const w of a) {
    if (w.type === "page-break") {
      f.childNodes.length > 0 && b();
      continue;
    }
    const y = w.element.cloneNode(true);
    if (Fd(y), Bd(y), (w.element.id && y.classList.contains(Is) || w.element.id && /^H[1-6]$/i.test(w.element.tagName)) && (y.id = w.element.id), f.appendChild(y), !!ts(f, s)) {
      if (f.removeChild(y), f.childNodes.length === 0) {
        f.appendChild(y), b();
        continue;
      }
      b(), f.appendChild(y), !(ts(f, s) && f.childNodes.length === 1) && ts(f, s);
    }
  }
  const x = n.lastElementChild;
  x && n.children.length > 1 && es(x).childNodes.length === 0 && x.remove(), n.children.length === 0 && n.appendChild(tn(s, 0, o)), [...n.children].forEach((w, y) => {
    w instanceof HTMLElement && w.setAttribute(qt, String(y));
  });
  const p = /* @__PURE__ */ new Set();
  for (const w of n.querySelectorAll("[id]")) w.id && p.add(w.id);
  for (const w of r.querySelectorAll("[id]")) p.has(w.id) && w.removeAttribute("id");
  return { pageCount: n.children.length };
}
function xi(e, r) {
  const n = Math.max(1, e), s = Math.max(1, r);
  return Array.from({ length: n }, (i, o) => o * s);
}
function gi(e) {
  return e instanceof HTMLElement ? !!e.closest('textarea, input, select, [contenteditable="true"]') : false;
}
function jo(e, r = true, n = {}) {
  const s = n.spaceDrag !== false, i = n.middleClick !== false;
  d.useEffect(() => {
    if (!r || !e || !s && !i) return;
    let o = false, a = null;
    const u = () => {
      if (a) {
        e.style.cursor = "grabbing", e.style.userSelect = "none";
        return;
      }
      if (s && o) {
        e.style.cursor = "grab", e.style.userSelect = "";
        return;
      }
      e.style.cursor = "", e.style.userSelect = "";
    }, c = () => {
      if (a) {
        try {
          e.releasePointerCapture(a.pointerId);
        } catch {
        }
        a = null, u();
      }
    }, f = (N) => {
      if (s && !(N.code !== "Space" && N.key !== " ") && !gi(N.target)) {
        if (N.repeat) {
          N.preventDefault();
          return;
        }
        o = true, N.preventDefault(), u();
      }
    }, b = (N) => {
      s && (N.code !== "Space" && N.key !== " " || (o = false, a || u()));
    }, x = () => {
      o = false, c(), u();
    }, p = (N) => {
      if (N.pointerType === "touch") return;
      const L = i && N.button === 1, C = s && N.button === 0 && o;
      if (!L && !C || gi(N.target)) return;
      L && N.preventDefault();
      const E = e.scrollWidth > e.clientWidth + 1, _ = e.scrollHeight > e.clientHeight + 1;
      if (!(!E && !_)) {
        N.preventDefault(), N.stopPropagation(), a = { pointerId: N.pointerId, lastX: N.clientX, lastY: N.clientY };
        try {
          e.setPointerCapture(N.pointerId);
        } catch {
        }
        u();
      }
    }, w = (N) => {
      if (!a || N.pointerId !== a.pointerId) return;
      const L = N.clientX - a.lastX, C = N.clientY - a.lastY;
      a.lastX = N.clientX, a.lastY = N.clientY, e.scrollLeft -= L, e.scrollTop -= C;
    }, y = (N) => {
      !a || N.pointerId !== a.pointerId || c();
    }, g = () => {
      a = null, u();
    }, k = (N) => {
      i && N.button === 1 && N.preventDefault();
    };
    return s && (window.addEventListener("keydown", f, true), window.addEventListener("keyup", b, true), window.addEventListener("blur", x)), e.addEventListener("pointerdown", p, true), e.addEventListener("pointermove", w), e.addEventListener("pointerup", y), e.addEventListener("pointercancel", y), e.addEventListener("lostpointercapture", g), i && e.addEventListener("auxclick", k), () => {
      s && (window.removeEventListener("keydown", f, true), window.removeEventListener("keyup", b, true), window.removeEventListener("blur", x)), e.removeEventListener("pointerdown", p, true), e.removeEventListener("pointermove", w), e.removeEventListener("pointerup", y), e.removeEventListener("pointercancel", y), e.removeEventListener("lostpointercapture", g), i && e.removeEventListener("auxclick", k), e.style.cursor = "", e.style.userSelect = "";
    };
  }, [e, r, s, i]);
}
function bi({ widthPx: e, heightPx: r }) {
  return t.jsx("div", { "data-print-page-slot": "1", className: "shrink-0 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.12)]", style: { width: e, height: r }, "aria-hidden": true });
}
function Wd({ widthPx: e, heightPx: r, children: n }) {
  return t.jsx("div", { "data-print-page-slot": "1", className: "relative shrink-0 overflow-hidden shadow-[0_8px_28px_rgba(15,23,42,0.12)]", style: { width: e, height: r }, children: n });
}
function Kd({ widthPx: e, heightPx: r, bodyIndex: n, pagesHostRef: s, packLayoutKey: i }) {
  const o = d.useRef(null);
  return d.useLayoutEffect(() => {
    const a = o.current, u = s.current;
    if (!a || (a.replaceChildren(), !u)) return;
    const c = u.querySelector(`[${qt}="${n}"]`);
    if (!c) return;
    const f = c.cloneNode(true);
    for (const b of f.querySelectorAll("[id]")) b.removeAttribute("id");
    f.removeAttribute("id"), f.style.boxShadow = "none", f.style.margin = "0", a.appendChild(f);
  }, [n, i, s]), t.jsx("div", { "data-print-page-slot": "1", className: "relative shrink-0 overflow-hidden bg-white text-gray-900 shadow-[0_8px_28px_rgba(15,23,42,0.12)]", style: { width: e, height: r, boxSizing: "border-box" }, children: t.jsx("div", { ref: o, className: "export-pdf-page-slot-clone h-full w-full origin-top-left" }) });
}
function fn({ logicalIndex: e, hasCover: r, coverNode: n, bodyPageCount: s, pagesHostRef: i, packLayoutKey: o, widthPx: a, heightPx: u, allowBlank: c = true }) {
  if (e == null) return c ? t.jsx(bi, { widthPx: a, heightPx: u }) : null;
  if (r && e === 0) return t.jsx(Wd, { widthPx: a, heightPx: u, children: n });
  const f = e - (r ? 1 : 0);
  return f < 0 || f >= Math.max(1, s) ? t.jsx(bi, { widthPx: a, heightPx: u }) : t.jsx(Kd, { widthPx: a, heightPx: u, bodyIndex: f, pagesHostRef: i, packLayoutKey: o });
}
function So({ pair: e, hasCover: r, coverNode: n, bodyPageCount: s, pagesHostRef: i, packLayoutKey: o, widthPx: a, heightPx: u, gapPx: c }) {
  const f = e.left ?? e.right;
  return e.centerSingle && f != null ? t.jsx("div", { className: "flex flex-row items-start justify-center", style: { width: a * 2 + c }, children: t.jsx(fn, { logicalIndex: f, hasCover: r, coverNode: n, bodyPageCount: s, pagesHostRef: i, packLayoutKey: o, widthPx: a, heightPx: u, allowBlank: false }) }) : t.jsxs("div", { className: "flex flex-row items-start justify-center", style: { gap: c }, children: [t.jsx(fn, { logicalIndex: e.left, hasCover: r, coverNode: n, bodyPageCount: s, pagesHostRef: i, packLayoutKey: o, widthPx: a, heightPx: u }), t.jsx(fn, { logicalIndex: e.right, hasCover: r, coverNode: n, bodyPageCount: s, pagesHostRef: i, packLayoutKey: o, widthPx: a, heightPx: u })] });
}
function Gd({ logicalIndex: e, hasCover: r, coverNode: n, bodyPageCount: s, pagesHostRef: i, packLayoutKey: o, widthPx: a, heightPx: u }) {
  return t.jsx(fn, { logicalIndex: e, hasCover: r, coverNode: n, bodyPageCount: s, pagesHostRef: i, packLayoutKey: o, widthPx: a, heightPx: u });
}
function Xd({ navigation: e, pages: r, firstPageSingle: n, zoomPercent: s, onZoomChange: i, pageSizeId: o, bodyPageCount: a, pagesHostRef: u, packLayoutKey: c, hasCover: f, coverNode: b, flipIndex: x, onFlipIndexChange: p, onVisibleLogicalPagesChange: w }) {
  const y = d.useRef(null), g = d.useRef(null), [k, N] = d.useState(null), L = d.useCallback(($) => {
    g.current = $, N($);
  }, []);
  jo(k, e === "scroll" && r === 2);
  const { widthPx: C, heightPx: E } = d.useMemo(() => Nd(o), [o]), _ = (f ? 1 : 0) + Math.max(1, a), O = d.useMemo(() => r === 1 ? Array.from({ length: _ }, ($, q) => ({ left: q, right: null })) : wo(_, n), [n, r, _]), z = Math.min(Math.max(0, x), Math.max(0, O.length - 1)), G = d.useRef(i);
  G.current = i, d.useLayoutEffect(() => {
    if (e !== "flip") return;
    const $ = y.current;
    if (!$) return;
    const q = () => {
      const H = $.getBoundingClientRect(), B = Cd({ viewportWidth: H.width, viewportHeight: H.height, pageWidthPx: C, pageHeightPx: E, pageCols: r, gapPx: nr });
      G.current(B);
    };
    q();
    const T = new ResizeObserver(q);
    return T.observe($), () => T.disconnect();
  }, [E, e, r, C]), d.useEffect(() => {
    x !== z && p(z);
  }, [x, p, z]);
  const U = d.useCallback(($) => {
    if (!w) return;
    const q = $.map((T) => T + 1);
    w(q.length ? q : [1]);
  }, [w]);
  d.useEffect(() => {
    if (e === "flip") {
      const $ = O[z];
      if (!$) {
        U([0]);
        return;
      }
      U(r === 1 ? $.left != null ? [$.left] : [0] : fi($));
    }
  }, [e, r, O, U, z]), d.useEffect(() => {
    if (e !== "scroll" || r !== 2) return;
    const $ = g.current;
    if (!$) return;
    const q = E + nr, T = () => {
      const H = s / 100, B = Math.max(1, q * H), ue = $.scrollTop, re = $.clientHeight, Y = Math.max(0, Math.floor(ue / B)), ye = Math.min(O.length - 1, Math.floor((ue + re) / B)), me = [];
      for (let ee = Y; ee <= ye; ee += 1) {
        const Ee = O[ee];
        Ee && me.push(...fi(Ee));
      }
      U(me);
    };
    return T(), $.addEventListener("scroll", T, { passive: true }), () => $.removeEventListener("scroll", T);
  }, [E, e, r, O, U, s]);
  const R = d.useCallback(() => {
    p(Math.max(0, z - 1));
  }, [p, z]), I = d.useCallback(() => {
    p(Math.min(O.length - 1, z + 1));
  }, [p, O.length, z]), se = z > 0, V = z < O.length - 1;
  d.useEffect(() => {
    if (e !== "flip") return;
    const $ = (q) => {
      const T = q.target;
      T && (T.tagName === "INPUT" || T.tagName === "TEXTAREA" || T.isContentEditable) || (q.key === "ArrowLeft" || q.key === "PageUp" ? (q.preventDefault(), R()) : (q.key === "ArrowRight" || q.key === "PageDown") && (q.preventDefault(), I()));
    };
    return window.addEventListener("keydown", $), () => window.removeEventListener("keydown", $);
  }, [I, R, e]), d.useEffect(() => {
    if (e !== "flip") return;
    const $ = y.current;
    if (!$) return;
    const q = 48, T = 60;
    let H = 0, B = 0, ue = 0;
    const re = (me) => {
      const ee = me.changedTouches[0];
      ee && (H = ee.clientX, B = ee.clientY);
    }, Y = (me) => {
      const ee = me.changedTouches[0];
      if (!ee) return;
      const Ee = ee.clientX - H, Me = ee.clientY - B;
      Math.abs(Ee) < q || Math.abs(Ee) < Math.abs(Me) || (Ee < 0 ? I() : R());
    }, ye = (me) => {
      me.ctrlKey || me.metaKey || Math.abs(me.deltaX) < Math.abs(me.deltaY) || (ue += me.deltaX, !(Math.abs(ue) < T) && (ue > 0 ? I() : R(), ue = 0));
    };
    return $.addEventListener("touchstart", re, { passive: true }), $.addEventListener("touchend", Y, { passive: true }), $.addEventListener("wheel", ye, { passive: true }), () => {
      $.removeEventListener("touchstart", re), $.removeEventListener("touchend", Y), $.removeEventListener("wheel", ye);
    };
  }, [I, R, e]);
  const ie = { zoom: s / 100 }, ke = d.useCallback(($) => {
    if ($.button !== 0) return;
    const q = y.current;
    if (!q) return;
    const T = q.getBoundingClientRect(), H = T.left + T.width / 2;
    $.clientX < H ? se && R() : V && I();
  }, [V, se, I, R]);
  if (e === "scroll" && r === 2) {
    const $ = E + nr, q = 1, T = s / 100;
    return t.jsx("div", { ref: L, className: "export-pdf-preview-stage h-full min-h-0 w-full overflow-auto print:hidden", children: t.jsx("div", { style: ie, children: t.jsx("div", { className: "relative mx-auto", style: { height: Math.max($, O.length * $), width: C * 2 + nr }, children: t.jsx(Ud, { pairs: O, rowH: $, scale: T, scrollRef: g, overscan: q, hasCover: f, coverNode: b, bodyPageCount: a, pagesHostRef: u, packLayoutKey: c, widthPx: C, heightPx: E }) }) }) });
  }
  const de = O[z] ?? { left: 0, right: null };
  return t.jsxs("div", { ref: y, className: "export-pdf-preview-stage relative flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden touch-pan-y print:hidden", onPointerDown: ke, children: [t.jsx("div", { className: "pointer-events-none relative z-10 flex min-h-0 w-full flex-1 items-center justify-center overflow-auto p-4", children: t.jsx("div", { className: "pointer-events-auto", style: ie, children: r === 1 ? t.jsx(Gd, { logicalIndex: de.left ?? 0, hasCover: f, coverNode: b, bodyPageCount: a, pagesHostRef: u, packLayoutKey: c, widthPx: C, heightPx: E }) : t.jsx(So, { pair: de, hasCover: f, coverNode: b, bodyPageCount: a, pagesHostRef: u, packLayoutKey: c, widthPx: C, heightPx: E, gapPx: nr }) }) }), t.jsxs("div", { className: "pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 print:hidden", children: [t.jsx("button", { type: "button", className: "pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm hover:bg-white disabled:opacity-30 dark:border-odp-borderSoft dark:bg-odp-bgSoft/90 dark:text-odp-fg", "aria-label": "\uC774\uC804 \uD398\uC774\uC9C0", disabled: !se, onPointerDown: ($) => $.stopPropagation(), onClick: ($) => {
    $.stopPropagation(), R();
  }, children: t.jsx(Jl, { size: 20 }) }), t.jsx("button", { type: "button", className: "pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm hover:bg-white disabled:opacity-30 dark:border-odp-borderSoft dark:bg-odp-bgSoft/90 dark:text-odp-fg", "aria-label": "\uB2E4\uC74C \uD398\uC774\uC9C0", disabled: !V, onPointerDown: ($) => $.stopPropagation(), onClick: ($) => {
    $.stopPropagation(), I();
  }, children: t.jsx(qi, { size: 20 }) })] })] });
}
function Ud({ pairs: e, rowH: r, scale: n, scrollRef: s, overscan: i, hasCover: o, coverNode: a, bodyPageCount: u, pagesHostRef: c, packLayoutKey: f, widthPx: b, heightPx: x }) {
  const [p, w] = d.useState({ first: 0, last: 2 });
  d.useEffect(() => {
    const g = s.current;
    if (!g) return;
    const k = () => {
      const N = Math.max(1, r * n), L = g.scrollTop, C = g.clientHeight, E = Math.max(0, Math.floor(L / N) - i), _ = Math.min(e.length - 1, Math.floor((L + C) / N) + i);
      w((O) => O.first === E && O.last === _ ? O : { first: E, last: _ });
    };
    return k(), g.addEventListener("scroll", k, { passive: true }), () => g.removeEventListener("scroll", k);
  }, [i, e.length, r, n, s]);
  const y = [];
  for (let g = p.first; g <= p.last; g += 1) {
    const k = e[g];
    k && y.push(t.jsx("div", { className: "absolute left-0", style: { top: g * r, height: r }, children: t.jsx(So, { pair: k, hasCover: o, coverNode: a, bodyPageCount: u, pagesHostRef: c, packLayoutKey: f, widthPx: b, heightPx: x, gapPx: nr }) }, `spread-${g}`));
  }
  return t.jsx(t.Fragment, { children: y });
}
function Yd(e, r, n) {
  var _a2;
  const s = e.closest(`[${qt}]`);
  if (s && r.contains(s)) {
    const o = Number(s.getAttribute(qt) ?? "0");
    return (n ? 1 : 0) + (Number.isFinite(o) ? o : 0);
  }
  const i = [...r.querySelectorAll(`[${qt}]`)];
  for (let o = 0; o < i.length; o += 1) if ((_a2 = i[o]) == null ? void 0 : _a2.contains(e)) return (n ? 1 : 0) + o;
  return n ? 1 : 0;
}
function Vd(e, r, n, s) {
  if (n === 1) return Math.min(Math.max(0, e), Math.max(0, r - 1));
  const i = wo(r, s);
  return Sd(i, e);
}
function qd({ value: e, onChange: r, disabled: n = false }) {
  const [s, i] = d.useState(false), [o, a] = d.useState(String(e)), u = d.useRef(null), c = d.useRef(false), f = d.useRef(null);
  d.useEffect(() => () => {
    f.current && clearTimeout(f.current);
  }, []), d.useEffect(() => {
    s || a(String(e));
  }, [s, e]), d.useEffect(() => {
    if (!s) return;
    const x = u.current;
    x && (x.focus(), x.select());
  }, [s]);
  const b = () => {
    const x = Number.parseFloat(o.replace(/%/g, "").trim());
    if (!Number.isFinite(x)) {
      a(String(e)), i(false);
      return;
    }
    r(Ln(x)), i(false);
  };
  return t.jsxs("div", { className: "inline-flex h-8 items-center gap-0.5 rounded-md border border-gray-300 bg-white dark:border-odp-borderStrong dark:bg-odp-surface", "data-print-toolbar": "zoom", children: [t.jsx("button", { type: "button", disabled: n || e <= hn, onClick: () => r($r(e, -1)), className: "inline-flex h-full w-7 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-focusBg", "aria-label": "\uCD95\uC18C", title: "\uCD95\uC18C", children: t.jsx(Zi, { size: 14 }) }), s ? t.jsx("input", { ref: u, type: "text", inputMode: "numeric", disabled: n, value: o, "aria-label": "\uD655\uB300 \uBE44\uC728", className: "h-full w-14 border-x border-gray-200 bg-transparent px-1 text-center text-xs tabular-nums text-gray-800 outline-none dark:border-odp-borderSoft dark:text-odp-fgStrong", onChange: (x) => a(x.target.value), onKeyDown: (x) => {
    x.key === "Enter" ? (x.preventDefault(), c.current = true, b()) : x.key === "Escape" && (x.preventDefault(), c.current = true, a(String(e)), i(false));
  }, onBlur: () => {
    if (c.current) {
      c.current = false;
      return;
    }
    b();
  } }) : t.jsxs("button", { type: "button", disabled: n, className: "inline-flex h-full w-14 items-center justify-center border-x border-gray-200 px-1 text-xs tabular-nums text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", "aria-label": `\uD655\uB300 \uBE44\uC728 ${e}%`, title: "\uD074\uB9AD\uD558\uC5EC \uC785\uB825, \uB354\uBE14\uD074\uB9AD\uC73C\uB85C 100%", onClick: () => {
    n || (f.current && clearTimeout(f.current), f.current = setTimeout(() => {
      f.current = null, a(String(e)), i(true);
    }, 220));
  }, onDoubleClick: (x) => {
    x.preventDefault(), x.stopPropagation(), !n && (f.current && (clearTimeout(f.current), f.current = null), i(false), r(100));
  }, children: [e, "%"] }), t.jsx("button", { type: "button", disabled: n || e >= As, onClick: () => r($r(e, 1)), className: "inline-flex h-full w-7 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-focusBg", "aria-label": "\uD655\uB300", title: "\uD655\uB300", children: t.jsx(Ji, { size: 14 }) })] });
}
function Zd() {
  const e = window.visualViewport;
  return e ? { top: e.offsetTop, bottom: e.offsetTop + e.height } : { top: 0, bottom: window.innerHeight };
}
function wi(e, r, n, s) {
  const i = e.getBoundingClientRect();
  return Math.min(i.bottom, n) - Math.max(i.top, r) > s;
}
function Jd(e, r, n, s) {
  const i = r.getBoundingClientRect(), o = Zd(), a = Math.max(i.top, o.top), u = Math.min(i.bottom, o.bottom);
  if (u - a <= 8) return [1];
  const c = [];
  s && n && wi(n, a, u, 24) && c.push(1);
  const f = s ? 1 : 0, b = [...e.querySelectorAll(`[${qt}]`)];
  for (const x of b) {
    if (!wi(x, a, u, 24)) continue;
    const p = Number(x.getAttribute(qt) ?? "0");
    c.push(p + 1 + f);
  }
  return c.length ? c : [1];
}
function Qd({ pagesHostRef: e, scrollRef: r, coverRef: n, hasCover: s = false, bodyPageCount: i, overridePages: o = null }) {
  const [a, u] = d.useState([1]);
  d.useEffect(() => {
    var _a2, _b;
    if (o && o.length > 0) {
      u(o);
      return;
    }
    const x = e.current, p = r.current;
    if (!x || !p) return;
    let w = 0;
    const y = () => {
      const k = Jd(x, p, (n == null ? void 0 : n.current) ?? null, s);
      u((N) => N.length === k.length && N.every((L, C) => L === k[C]) ? N : k);
    }, g = () => {
      w || (w = window.requestAnimationFrame(() => {
        w = 0, y();
      }));
    };
    return y(), p.addEventListener("scroll", g, { passive: true }), window.addEventListener("scroll", g, { passive: true }), window.addEventListener("resize", g), (_a2 = window.visualViewport) == null ? void 0 : _a2.addEventListener("resize", g), (_b = window.visualViewport) == null ? void 0 : _b.addEventListener("scroll", g), () => {
      var _a3, _b2;
      w && window.cancelAnimationFrame(w), p.removeEventListener("scroll", g), window.removeEventListener("scroll", g), window.removeEventListener("resize", g), (_a3 = window.visualViewport) == null ? void 0 : _a3.removeEventListener("resize", g), (_b2 = window.visualViewport) == null ? void 0 : _b2.removeEventListener("scroll", g);
    };
  }, [i, n, s, o, e, r]);
  const c = a[0] ?? 1, f = a[a.length - 1] ?? c, b = c === f ? `${c}p` : `${c}p \u2013 ${f}p`;
  return t.jsx("div", { className: "pointer-events-none fixed bottom-4 left-4 z-40 rounded-md border border-gray-200 bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-sm print:hidden dark:border-odp-borderSoft dark:bg-odp-bgSoft/90 dark:text-odp-fg", "aria-live": "polite", children: b });
}
function rs(e, r, n, s) {
  if (!Number.isFinite(e)) return r;
  const i = Math.min(n, Math.max(r, e));
  if (s <= 0) return i;
  const o = Math.round(i / s) * s;
  return Math.min(n, Math.max(r, o));
}
function xn({ value: e, onChange: r, min: n = 0, max: s = 100, step: i = 1, suffix: o = "", disabled: a = false, resetValue: u, "aria-label": c = "\uAC12", decreaseLabel: f = "\uAC10\uC18C", increaseLabel: b = "\uC99D\uAC00", className: x = "" }) {
  const [p, w] = d.useState(false), [y, g] = d.useState(String(e)), k = d.useRef(null), N = d.useRef(false), L = d.useRef(null), C = `${e}${o}`;
  d.useEffect(() => () => {
    L.current && clearTimeout(L.current);
  }, []), d.useEffect(() => {
    p || g(String(e));
  }, [p, e]), d.useEffect(() => {
    if (!p) return;
    const O = k.current;
    O && (O.focus(), O.select());
  }, [p]);
  const E = () => {
    const O = y.replace(new RegExp(`${o}$`, "i"), "").replace(/%/g, "").trim(), z = Number.parseFloat(O);
    if (!Number.isFinite(z)) {
      g(String(e)), w(false);
      return;
    }
    r(rs(z, n, s, i)), w(false);
  }, _ = (O) => {
    r(rs(e + O * i, n, s, i));
  };
  return t.jsxs("div", { className: `inline-flex h-8 items-center gap-0.5 rounded-md border border-gray-300 bg-white dark:border-odp-borderStrong dark:bg-odp-surface ${x}`, children: [t.jsx("button", { type: "button", disabled: a || e <= n, onClick: () => _(-1), className: "inline-flex h-full w-7 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-focusBg", "aria-label": f, title: f, children: t.jsx(Zi, { size: 14 }) }), p ? t.jsx("input", { ref: k, type: "text", inputMode: "numeric", disabled: a, value: y, "aria-label": c, className: "h-full w-14 border-x border-gray-200 bg-transparent px-1 text-center text-xs tabular-nums text-gray-800 outline-none dark:border-odp-borderSoft dark:text-odp-fgStrong", onChange: (O) => g(O.target.value), onKeyDown: (O) => {
    O.key === "Enter" ? (O.preventDefault(), N.current = true, E()) : O.key === "Escape" && (O.preventDefault(), N.current = true, g(String(e)), w(false));
  }, onBlur: () => {
    if (N.current) {
      N.current = false;
      return;
    }
    E();
  } }) : t.jsx("button", { type: "button", disabled: a, className: "inline-flex h-full w-14 items-center justify-center border-x border-gray-200 px-1 text-xs tabular-nums text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", "aria-label": `${c} ${C}`, title: u != null ? `\uD074\uB9AD\uD558\uC5EC \uC785\uB825, \uB354\uBE14\uD074\uB9AD\uC73C\uB85C ${u}${o}` : "\uD074\uB9AD\uD558\uC5EC \uC785\uB825", onClick: () => {
    a || (L.current && clearTimeout(L.current), L.current = setTimeout(() => {
      L.current = null, g(String(e)), w(true);
    }, 220));
  }, onDoubleClick: (O) => {
    O.preventDefault(), O.stopPropagation(), !(a || u == null) && (L.current && (clearTimeout(L.current), L.current = null), w(false), r(rs(u, n, s, i)));
  }, children: C }), t.jsx("button", { type: "button", disabled: a || e >= s, onClick: () => _(1), className: "inline-flex h-full w-7 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-focusBg", "aria-label": b, title: b, children: t.jsx(Ji, { size: 14 }) })] });
}
const eu = `${Oc} z-100010 w-[min(92vw,300px)] max-h-[min(80vh,640px)] overflow-y-auto p-1.5`, No = "z-100050 max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", Co = "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", Eo = "inline-flex h-8 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg", Ds = "inline-flex h-8 flex-1 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg dark:hover:bg-odp-focusBg", Po = "border-blue-400 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-200", tu = "mb-1 px-0.5 text-[10px] font-medium text-gray-400";
function We(e, r, n) {
  return { ...e, elements: e.elements.map((s) => s.id !== r ? s : { ...s, ...n }) };
}
function Qt() {
  return t.jsx(sn, {});
}
function gn({ children: e }) {
  return t.jsx("div", { className: tu, children: e });
}
function ru({ value: e, onChange: r, disabled: n }) {
  const s = [{ id: "left", icon: to, label: "\uC67C\uCABD" }, { id: "center", icon: ro, label: "\uAC00\uC6B4\uB370" }, { id: "right", icon: no, label: "\uC624\uB978\uCABD" }];
  return t.jsx("div", { className: "flex gap-1", children: s.map(({ id: i, icon: o, label: a }) => t.jsx("button", { type: "button", title: a, disabled: n, className: `${Ds} ${e === i ? Po : ""}`, onClick: () => r(i), onPointerDown: (u) => u.stopPropagation(), children: t.jsx(o, { size: 14 }) }, i)) });
}
function nu({ textAlign: e, textVAlign: r, onTextAlignChange: n, onTextVAlignChange: s, disabled: i }) {
  return t.jsx("div", { className: "grid grid-cols-3 gap-1", children: [["left", jn, () => n("left")], ["center", Sn, () => n("center")], ["right", Nn, () => n("right")], ["top", Cn, () => s("top")], ["middle", En, () => s("middle")], ["bottom", Pn, () => s("bottom")]].map(([o, a, u]) => {
    const c = o === "left" || o === "center" || o === "right" ? e === o : r === o;
    return t.jsx("button", { type: "button", disabled: i, className: `${Ds} ${c ? Po : ""}`, onClick: u, onPointerDown: (f) => f.stopPropagation(), children: t.jsx(a, { size: 14 }) }, o);
  }) });
}
function yi({ disabled: e, onAlign: r }) {
  const n = [{ mode: "left", tip: "\uC67C\uCABD \uC815\uB82C", Icon: jn }, { mode: "centerX", tip: "\uAC00\uB85C \uAC00\uC6B4\uB370", Icon: Sn }, { mode: "right", tip: "\uC624\uB978\uCABD \uC815\uB82C", Icon: Nn }, { mode: "distributeX", tip: "\uAC00\uB85C \uAC04\uACA9 \uBD84\uBC30", Icon: Qi }, { mode: "top", tip: "\uC704\uCABD \uC815\uB82C", Icon: Cn }, { mode: "centerY", tip: "\uC138\uB85C \uAC00\uC6B4\uB370", Icon: En }, { mode: "bottom", tip: "\uC544\uB798\uCABD \uC815\uB82C", Icon: Pn }, { mode: "distributeY", tip: "\uC138\uB85C \uAC04\uACA9 \uBD84\uBC30", Icon: eo }];
  return t.jsx("div", { className: "grid grid-cols-4 gap-1", children: n.map(({ mode: s, tip: i, Icon: o }) => t.jsx("button", { type: "button", title: i, disabled: e, className: Ds, onClick: () => r(s), onPointerDown: (a) => a.stopPropagation(), children: t.jsx(o, { size: 14 }) }, s)) });
}
function To({ value: e, onChange: r, disabled: n = false, ariaLabel: s }) {
  return t.jsxs(Ft, { value: cs(e), onValueChange: (i) => r(ls(i)), disabled: n, children: [t.jsxs(Bt, { "aria-label": s, className: Eo, children: [t.jsx(Ht, {}), t.jsx(Wt, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Kt, { children: t.jsx(Gt, { className: No, position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: as.map((i) => t.jsxs(Ut, { value: i.value, className: Co, children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(St, { size: 12 }) }), t.jsx(Vt, { children: i.label })] }, i.value)) }) }) })] });
}
function su({ cover: e, el: r, onChange: n, disabled: s }) {
  const i = d.useMemo(() => Ss(), []);
  return t.jsxs("div", { className: "flex flex-col gap-2 px-1 py-1", onPointerDown: (o) => o.stopPropagation(), onKeyDown: (o) => o.stopPropagation(), children: [t.jsx(gn, { children: "\uD14D\uC2A4\uD2B8" }), t.jsxs("div", { className: "flex flex-col gap-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAE00\uC790 \uD06C\uAE30" }), t.jsx(xn, { min: 6, max: 400, step: 1, suffix: "px", value: r.fontSize, resetValue: 36, "aria-label": "\uAE00\uC790 \uD06C\uAE30", decreaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uC904\uC774\uAE30", increaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uD0A4\uC6B0\uAE30", onChange: (o) => {
    s || n(We(e, r.id, { fontSize: o }));
  } })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD3F0\uD2B8" }), t.jsx(wr, { id: `cover-ctx-text-font-${r.id}`, value: r.fontFamily || "", options: i, placeholder: "\uC608: Paperozi, sans-serif", inputClassName: "!px-2 !py-1 !text-xs", onChange: (o) => {
    if (s) return;
    const a = o.trim();
    n({ ...e, elements: e.elements.map((u) => {
      if (u.id !== r.id || u.type !== "text") return u;
      const c = { ...u };
      return a ? c.fontFamily = a : delete c.fontFamily, c;
    }) });
  } })] }), t.jsxs("div", { className: "space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAD75\uAE30" }), t.jsx(To, { value: r.fontWeight, ariaLabel: "\uD3F0\uD2B8 \uAD75\uAE30", disabled: s, onChange: (o) => n(We(e, r.id, { fontWeight: o })) })] }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 text-[10px] text-gray-400", children: "\uD14D\uC2A4\uD2B8 \uC815\uB82C" }), t.jsx(ru, { value: r.textAlign, disabled: s, onChange: (o) => n(We(e, r.id, { textAlign: o })) })] }), t.jsx(jt, { value: r.color, allowNone: false, label: "\uAE00\uC790\uC0C9", compact: true, onChange: (o) => {
    s || n(We(e, r.id, { color: o || "#111111" }));
  } })] });
}
function iu({ cover: e, el: r, onChange: n, disabled: s }) {
  return t.jsxs("div", { className: "flex flex-col gap-2 px-1 py-1", onPointerDown: (i) => i.stopPropagation(), onKeyDown: (i) => i.stopPropagation(), children: [t.jsx(gn, { children: "\uB3C4\uD615" }), t.jsx(jt, { value: r.fill, allowNone: true, label: "\uCC44\uC6B0\uAE30", compact: true, onChange: (i) => {
    s || n(We(e, r.id, { fill: i || "transparent" }));
  } }), t.jsx(jt, { value: r.borderColor, allowNone: true, label: "\uD14C\uB450\uB9AC \uC0C9", compact: true, onChange: (i) => {
    s || n(We(e, r.id, { borderColor: i || "transparent" }));
  } }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD14C\uB450\uB9AC \uB450\uAED8" }), t.jsx(kt, { unit: "css", suffix: "px", min: 0, max: 40, step: 1, value: r.borderWidth, "aria-label": "\uD14C\uB450\uB9AC \uB450\uAED8", onChange: (i) => {
    s || n(We(e, r.id, { borderWidth: i }));
  } })] }), t.jsxs("div", { className: "space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD14C\uB450\uB9AC \uC2A4\uD0C0\uC77C" }), t.jsxs(Ft, { value: r.borderStyle, disabled: s, onValueChange: (i) => {
    i !== "solid" && i !== "dashed" && i !== "dotted" || n(We(e, r.id, { borderStyle: i }));
  }, children: [t.jsxs(Bt, { "aria-label": "\uD14C\uB450\uB9AC \uC2A4\uD0C0\uC77C", className: Eo, children: [t.jsx(Ht, {}), t.jsx(Wt, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Kt, { children: t.jsx(Gt, { className: No, position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: [{ value: "solid", label: "\uC2E4\uC120" }, { value: "dashed", label: "\uD30C\uC120" }, { value: "dotted", label: "\uC810\uC120" }].map((i) => t.jsxs(Ut, { value: i.value, className: Co, children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(St, { size: 12 }) }), t.jsx(Vt, { children: i.label })] }, i.value)) }) }) })] })] }), r.type === "roundRect" ? t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uBAA8\uC11C\uB9AC \uB465\uAE00\uAE30" }), t.jsx(kt, { unit: "percent", suffix: "%", min: 0, max: 50, step: 1, value: r.cornerRadiusPct ?? 4, "aria-label": "\uBAA8\uC11C\uB9AC \uB465\uAE00\uAE30", onChange: (i) => {
    s || n(We(e, r.id, { cornerRadiusPct: i }));
  } })] }) : null, t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uB3C4\uD615 \uC548 \uD14D\uC2A4\uD2B8" }), t.jsx("textarea", { className: "min-h-14 w-full resize-y rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg", value: r.text ?? "", placeholder: "\uC120\uD0DD \uC0AC\uD56D", disabled: s, onChange: (i) => n(We(e, r.id, { text: i.target.value })) })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uC548\uCABD \uC5EC\uBC31" }), t.jsx(kt, { unit: "percent", suffix: "%", min: 0, max: 40, step: 1, value: r.paddingPct ?? 0, "aria-label": "\uB3C4\uD615 \uC548\uCABD \uC5EC\uBC31", onChange: (i) => {
    s || n(We(e, r.id, { paddingPct: i }));
  } })] }), t.jsxs("div", { className: "flex flex-col gap-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAE00\uC790 \uD06C\uAE30" }), t.jsx(xn, { min: 6, max: 400, step: 1, suffix: "px", value: r.fontSize ?? 24, resetValue: 24, "aria-label": "\uB3C4\uD615 \uAE00\uC790 \uD06C\uAE30", decreaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uC904\uC774\uAE30", increaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uD0A4\uC6B0\uAE30", onChange: (i) => {
    s || n(We(e, r.id, { fontSize: i }));
  } })] }), t.jsxs("div", { className: "space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAD75\uAE30" }), t.jsx(To, { value: r.fontWeight ?? "normal", ariaLabel: "\uB3C4\uD615 \uAE00\uC790 \uAD75\uAE30", disabled: s, onChange: (i) => n(We(e, r.id, { fontWeight: i })) })] }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 text-[10px] text-gray-400", children: "\uD14D\uC2A4\uD2B8 \uC704\uCE58" }), t.jsx(nu, { textAlign: r.textAlign ?? "center", textVAlign: r.textVAlign ?? "middle", disabled: s, onTextAlignChange: (i) => n(We(e, r.id, { textAlign: i })), onTextVAlignChange: (i) => n(We(e, r.id, { textVAlign: i })) })] }), t.jsx(jt, { value: r.color ?? "#111111", allowNone: false, label: "\uAE00\uC790\uC0C9", compact: true, onChange: (i) => {
    s || n(We(e, r.id, { color: i || "#111111" }));
  } })] });
}
function ou(e, r) {
  const n = Ye(e, r), s = n.length ? n : [...r];
  if (!s.length) return e;
  const i = s.some((a) => !Hr(e, a));
  let o = e;
  for (const a of s) o = fo(o, a, i);
  return o;
}
function au(e, r) {
  const n = Ye(e, r), s = n.length ? n : [...r];
  return s.length > 0 && s.every((i) => Hr(e, i));
}
function Ro({ cover: e, targetId: r, selectedIds: n, onChange: s, onSelectIds: i, onRequestDelete: o, onImageCrop: a, onRestoreImageAspect: u, onToggleImageLockAspect: c }) {
  const f = n.includes(r) ? n : [r], b = Ye(e, f), x = b.length === 1 && _e(e, b[0]) ? b[0] : null, p = f.length > 1 && !x, w = !!x, y = f.length === 1 ? e.elements.find((_) => _.id === f[0]) ?? null : null, g = f.length > 0 && f.every((_) => {
    const O = e.elements.find((z) => z.id === _);
    return O ? sr(e, O) : true;
  }), k = au(e, f), L = go(e, f).enabled, C = (_) => {
    var _a2;
    const O = _r(e, f);
    if (!O.length) return;
    const G = (_a2 = document.querySelector('[data-cover-frame="1"]')) == null ? void 0 : _a2.getBoundingClientRect(), U = _ === "distributeX" ? (G == null ? void 0 : G.width) ?? 0 : (G == null ? void 0 : G.height) ?? 0, R = fs(e.layout.gapPx, U);
    if (x) {
      s(Dr(e, O, _, R, { insideGroupId: x }));
      return;
    }
    s(Dr(e, O, _, R));
  }, E = !(f.length < 1 || x);
  return t.jsxs(t.Fragment, { children: [t.jsxs(Ae, { className: ft, onSelect: () => {
    n.includes(r) || i(f), s(ou(e, f));
  }, children: [k ? t.jsx(Ns, { size: 16, className: "shrink-0" }) : t.jsx(Cs, { size: 16, className: "shrink-0" }), k ? "\uC7A0\uAE08 \uD574\uC81C" : "\uC7A0\uAE08"] }), w ? t.jsxs(t.Fragment, { children: [t.jsxs(Ae, { className: ft, onSelect: () => {
    x && s(Mn(e, x));
  }, children: [t.jsx(Es, { size: 16, className: "shrink-0" }), "\uADF8\uB8F9 \uD574\uC81C"] }), t.jsx(Qt, {}), t.jsxs("div", { className: "px-1 py-1", onPointerDown: (_) => _.stopPropagation(), children: [t.jsx(gn, { children: "\uC815\uB82C" }), t.jsx(yi, { disabled: !L, onAlign: C })] })] }) : null, p ? t.jsxs(t.Fragment, { children: [t.jsxs(Ae, { className: ft, disabled: !E, onSelect: () => {
    const _ = Rn(e, f);
    _ && (s(_.cover), i(Ce(_.cover, _.groupId)));
  }, children: [t.jsx(Ps, { size: 16, className: "shrink-0" }), "\uADF8\uB8F9\uD654"] }), t.jsx(Qt, {}), t.jsxs("div", { className: "px-1 py-1", onPointerDown: (_) => _.stopPropagation(), children: [t.jsx(gn, { children: "\uAC1C\uCCB4 \uC815\uB82C" }), t.jsx(yi, { disabled: !L, onAlign: C })] })] }) : null, (y == null ? void 0 : y.type) === "text" ? t.jsxs(t.Fragment, { children: [t.jsx(Qt, {}), t.jsx(su, { cover: e, el: y, onChange: s, disabled: g })] }) : null, y && kr(y) ? t.jsxs(t.Fragment, { children: [t.jsx(Qt, {}), t.jsx(iu, { cover: e, el: y, onChange: s, disabled: g })] }) : null, (y == null ? void 0 : y.type) === "image" ? t.jsxs(t.Fragment, { children: [t.jsx(Qt, {}), t.jsxs(Ae, { className: ft, disabled: g, onSelect: () => a == null ? void 0 : a(y), children: [t.jsx(Ql, { size: 16, className: "shrink-0" }), "\uC790\uB974\uAE30"] }), t.jsxs(Ae, { className: ft, disabled: g || !y.naturalAspect, onSelect: () => u == null ? void 0 : u(y.id), children: [t.jsx(ec, { size: 16, className: "shrink-0" }), "\uC6D0\uBCF8 \uBE44\uC728\uB85C \uB418\uB3CC\uB9AC\uAE30"] }), t.jsxs(Ae, { className: ft, disabled: g, onSelect: () => c == null ? void 0 : c(y.id), children: [t.jsx(tc, { size: 16, className: "shrink-0" }), y.lockAspect ? "\uBB34\uC870\uAC74 \uBE44\uC728 \uC720\uC9C0 \uD574\uC81C" : "\uBB34\uC870\uAC74 \uBE44\uC728 \uC720\uC9C0"] })] }) : null, t.jsx(Qt, {}), t.jsxs(Ae, { className: ft, disabled: g, onSelect: () => s(oi(e, f, 1)), children: [t.jsx(rc, { size: 16, className: "shrink-0" }), "\uC55E\uC73C\uB85C"] }), t.jsxs(Ae, { className: ft, disabled: g, onSelect: () => s(oi(e, f, -1)), children: [t.jsx(nc, { size: 16, className: "shrink-0" }), "\uB4A4\uB85C"] }), t.jsxs(Ae, { className: ft, disabled: g, onSelect: () => s(Ms(e, f)), children: [t.jsx(Ts, { size: 16, className: "shrink-0" }), "\uB9E8 \uC55E\uC73C\uB85C"] }), t.jsxs(Ae, { className: ft, disabled: g, onSelect: () => s(Ls(e, f)), children: [t.jsx(Rs, { size: 16, className: "shrink-0" }), "\uB9E8 \uB4A4\uB85C"] }), t.jsx(Qt, {}), t.jsxs(Ae, { className: _c, danger: true, onSelect: () => {
    n.includes(r) || i(f), o(f);
  }, children: [t.jsx(kn, { size: 16, className: "shrink-0" }), "\uC0AD\uC81C"] })] });
}
function lu(e) {
  return t.jsx(vc, { className: eu, onCloseAutoFocus: (r) => r.preventDefault(), onPointerDownOutside: (r) => {
    const n = r.target;
    n instanceof Element && n.closest(`[${ni}]`) && r.preventDefault();
  }, onInteractOutside: (r) => {
    const n = r.target;
    n instanceof Element && n.closest(`[${ni}]`) && r.preventDefault();
  }, children: t.jsx(Hi, { surface: "desktop", children: t.jsx(Ro, { ...e }) }) });
}
async function jr(e, r) {
  var _a2, _b;
  const n = (r == null ? void 0 : r.type) || "s3", s = String((r == null ? void 0 : r.id) || "").trim(), i = s ? Ra(s) : ".images/note", o = Wi();
  if (n === "session") throw new Error("\uC138\uC158 \uB178\uD2B8 \uC774\uBBF8\uC9C0 \uC790\uB974\uAE30\uB294 \uD3B8\uC9D1\uAE30\uC5D0\uC11C \uC9C4\uD589\uD574 \uC8FC\uC138\uC694.");
  if (n === "local") {
    if (!o.localRootHandle) throw new Error("\uB85C\uCEEC \uD3F4\uB354\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    return Ma(o.localRootHandle, e, { imagePathPrefix: i });
  }
  if (n === "webdav") {
    const c = o.webdavConfig;
    if (!(c == null ? void 0 : c.endpoint) || !(c == null ? void 0 : c.username)) throw new Error("WebDAV\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
    const f = Ki(c), b = La(i), x = ((_a2 = crypto.randomUUID) == null ? void 0 : _a2.call(crypto)) ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    let p = e.type;
    (!p || p === "application/octet-stream") && (p = await za(e) || p);
    const w = Ia(p), y = `${b}${x}${w}`.replace(/\/+/g, "/").replace(/^\//, ""), g = new Uint8Array(await e.arrayBuffer());
    return await f.writeBytes(y, g, p || "application/octet-stream"), y;
  }
  const a = typeof o.getS3Client == "function" ? o.getS3Client() : null, u = (_b = o.s3Creds) == null ? void 0 : _b.bucket;
  if (!a || !u) throw new Error("S3 \uD074\uB77C\uC774\uC5B8\uD2B8\uB97C \uCD08\uAE30\uD654\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  return Aa(a, u, e, { imagePathPrefix: i });
}
const cu = [{ id: "n", className: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize" }, { id: "s", className: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize" }, { id: "e", className: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-ew-resize" }, { id: "w", className: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize" }, { id: "ne", className: "right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize" }, { id: "nw", className: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize" }, { id: "se", className: "right-0 bottom-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize" }, { id: "sw", className: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize" }], vt = 2, vi = 3, du = 10, uu = 500, fu = 500, pu = /* @__PURE__ */ new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);
function ki(e) {
  return pu.has(e);
}
function Re(e, r, n) {
  return Math.min(n, Math.max(r, e));
}
function mu(e, r, n, s, i) {
  if (i == null ? void 0 : i.fromCenter) {
    const f = e.x + e.w / 2, b = e.y + e.h / 2;
    let x = 0, p = 0;
    r.includes("e") && (x += n), r.includes("w") && (x -= n), r.includes("s") && (p += s), r.includes("n") && (p -= s);
    const w = Math.max(vt, 2 * Math.min(f, 100 - f)), y = Math.max(vt, 2 * Math.min(b, 100 - b)), g = Re(e.w + 2 * x, vt, w), k = Re(e.h + 2 * p, vt, y);
    return { ...e, x: f - g / 2, y: b - k / 2, w: g, h: k };
  }
  let { x: o, y: a, w: u, h: c } = e;
  if (r.includes("e") && (u = Re(e.w + n, vt, 100 - e.x)), r.includes("s") && (c = Re(e.h + s, vt, 100 - e.y)), r.includes("w")) {
    const f = Re(e.w - n, vt, e.x + e.w), b = e.w - f;
    o = Re(e.x + b, 0, 100 - f), u = f;
  }
  if (r.includes("n")) {
    const f = Re(e.h - s, vt, e.y + e.h), b = e.h - f;
    a = Re(e.y + b, 0, 100 - f), c = f;
  }
  return { ...e, x: o, y: a, w: u, h: c };
}
function er(e, r, n) {
  return { ...e, elements: e.elements.map((s) => s.id === r ? n : s) };
}
function hr(e) {
  return e instanceof HTMLElement ? !!e.closest('textarea, input, [contenteditable="true"]') : false;
}
function hu({ el: e, getPresignedUrl: r, onNaturalReady: n }) {
  const s = Lc(e.path, r);
  return s ? t.jsx("img", { src: s, alt: "", className: "pointer-events-none h-full w-full object-fill", draggable: false, onLoad: (i) => {
    const o = i.currentTarget;
    o.naturalWidth > 0 && o.naturalHeight > 0 && (n == null ? void 0 : n(o.naturalWidth / o.naturalHeight));
  } }) : t.jsx("div", { className: "flex h-full w-full items-center justify-center bg-neutral-100 text-[10px] text-neutral-400", children: "\uC774\uBBF8\uC9C0" });
}
function xu({ el: e }) {
  return t.jsx("div", { className: "h-full w-full", style: oo(e, { strictClip: true }), children: e.text });
}
function gu({ el: e, isEditing: r, onTextChange: n, onBlur: s }) {
  return r ? t.jsx("div", { className: "h-full w-full", style: Mc(e), "data-cover-shape": e.type, children: t.jsx("div", { style: Rc(e), children: t.jsx("textarea", { className: "min-h-[1.25em] w-full", style: Tc(e), value: e.text ?? "", rows: Math.max(1, (e.text ?? "").split(/\r?\n/).length), autoFocus: true, onChange: (i) => n(i.target.value), onBlur: s, onPointerDown: (i) => i.stopPropagation() }) }) }) : t.jsx(Pc, { el: e, strictClip: true });
}
const rn = { w: 40, h: 25 };
function bu({ cover: e, selectedIds: r, onSelectIds: n, onChange: s, getPresignedUrl: i, currentFile: o = null, centerSnapEnabled: a = true, centerSnapTolerance: u = Xi, objectSnapEnabled: c = false, onObjectSnapEnabledChange: f, objectSnapTolerance: b = Ui, textContainerOutlineEnabled: x = false, placePreviewEnabled: p = true, placeMode: w = null, onPlaceModeChange: y, onUndo: g, onRedo: k, className: N = "" }) {
  const { showToast: L } = Da(), C = d.useRef(null), [E, _] = d.useState(null), [O, z] = d.useState(null), [G, U] = d.useState(null), [R, I] = d.useState(null), [se, V] = d.useState(null), [ie, ke] = d.useState({ v: [], h: [] }), [de, $] = d.useState(null), [q, T] = d.useState(null), H = Gi(), [B, ue] = d.useState(null), re = d.useRef(false);
  re.current = !!q;
  const [Y, ye] = d.useState(0), [me, ee] = d.useState(false), Ee = d.useRef(false), Me = d.useRef(false), Ke = d.useRef(null);
  Ee.current = Y > 0 || Me.current;
  const Te = () => {
    Ke.current != null && (window.clearTimeout(Ke.current), Ke.current = null);
  }, Qe = () => {
    Te(), Me.current = false, ye(0), ee(false);
  }, Sr = () => {
    Me.current = true, ye(0), Te(), Ke.current = window.setTimeout(() => {
      Ke.current = null, Me.current = false, ye(2);
    }, 220);
  };
  d.useEffect(() => () => Te(), []);
  const Le = d.useRef(null), Z = d.useRef(e), xe = d.useRef(r), we = d.useRef(w), Ct = d.useRef(a), ze = d.useRef(u), et = d.useRef(c), X = d.useRef(b), Ve = d.useRef(f), ht = d.useRef(false);
  Z.current = e, xe.current = r, we.current = w, Ct.current = a, ze.current = u, et.current = c, X.current = b, Ve.current = f;
  const Et = d.useCallback((l) => Z.current.elements.find((m) => m.id === l) ?? null, []), tt = d.useCallback((l) => {
    const m = Le.current;
    if (!m) return;
    if (m.kind === "marquee") {
      const ne = (l.clientX - m.originClientX) / m.frameW * 100, S = (l.clientY - m.originClientY) / m.frameH * 100, W = Re(m.startXPct + ne, 0, 100), J = Re(m.startYPct + S, 0, 100);
      Le.current = { ...m, curXPct: W, curYPct: J }, $(ps({ x: m.startXPct, y: m.startYPct, w: W - m.startXPct, h: J - m.startYPct }));
      return;
    }
    const v = (l.clientX - m.startX) / m.frameW * 100, P = (l.clientY - m.startY) / m.frameH * 100;
    if (m.kind === "move") {
      if (!m.moved && Math.hypot(l.clientX - m.startX, l.clientY - m.startY) >= vi) {
        m.moved = true;
        const ve = m.pendingShiftClick;
        ve && !ve.wasFullySelected && n([.../* @__PURE__ */ new Set([...ve.selectionAtDown, ...ve.targetIds])]);
      }
      if (!m.ids.length) return;
      if (m.pendingDuplicate) if (Math.hypot(l.clientX - m.startX, l.clientY - m.startY) >= vi) {
        const ve = Jc(Z.current, m.ids);
        s(ve.cover), n(ve.newIds), m.ids = ve.newIds, m.origElements = ve.cover.elements.map((Ze) => ({ ...Ze })), m.pendingDuplicate = false;
      } else return;
      let ne = v, S = P;
      l.shiftKey && (Math.abs(ne) >= Math.abs(S) ? S = 0 : ne = 0);
      const W = { ...Z.current, elements: m.origElements.map((pe) => ({ ...pe })) };
      let J = qn(W, m.ids, ne, S);
      const ge = Ct.current, te = et.current;
      if ((ge || te) && !l.shiftKey) {
        const pe = J.elements.filter((Ze) => m.ids.includes(Ze.id)), ve = mn(pe);
        if (ve) {
          const Ze = te ? ci(J, m.ids) : [], Oe = od(ve, Ze, { objectSnapEnabled: te, frameCenterSnapEnabled: ge, objectThresholdPx: X.current, frameCenterThresholdPx: ze.current, frameWidthPx: m.frameW, frameHeightPx: m.frameH }), ur = Oe.x - ve.x, Pr = Oe.y - ve.y;
          (ur !== 0 || Pr !== 0) && (J = qn(J, m.ids, ur, Pr)), ke({ v: Oe.verticalGuides, h: Oe.horizontalGuides });
        }
      } else ke({ v: [], h: [] });
      s(J);
      return;
    }
    ke({ v: [], h: [] });
    const M = m.orig, F = l.shiftKey;
    let D = M.type === "image" ? pd(M, m.handle, v, P, m.frameW, m.frameH, { fromCenter: F }) : mu(M, m.handle, v, P, { fromCenter: F });
    const ae = Ct.current, fe = et.current;
    if ((ae || fe) && !l.shiftKey) {
      const ne = fe ? ci(Z.current, [m.id]) : [], S = ld({ x: D.x, y: D.y, w: D.w, h: D.h }, m.handle, ne, { objectSnapEnabled: fe, frameCenterSnapEnabled: ae, objectThresholdPx: X.current, frameCenterThresholdPx: ze.current, frameWidthPx: m.frameW, frameHeightPx: m.frameH, minSizePct: vt });
      D = { ...D, x: S.x, y: S.y, w: S.w, h: S.h }, ke({ v: S.verticalGuides, h: S.horizontalGuides });
    }
    s(er(Z.current, m.id, D));
  }, [s, n]), Pe = d.useCallback((l) => {
    const m = Le.current;
    if ((m == null ? void 0 : m.kind) === "marquee") {
      const v = ps({ x: m.startXPct, y: m.startYPct, w: m.curXPct - m.startXPct, h: m.curYPct - m.startYPct }), P = ii(Z.current.elements, v), M = ms(Z.current, P);
      if (m.additive && M.length) {
        const F = new Set(xe.current);
        M.forEach((D) => F.add(D)), n([...F]);
      } else n(M);
      $(null);
    } else if ((m == null ? void 0 : m.kind) === "move" && m.pendingShiftClick && (l == null ? void 0 : l.type) === "pointerup") {
      const v = m.pendingShiftClick;
      if (!m.moved) if (v.wasFullySelected) {
        if (!v.selectionIsExactTarget && performance.now() - v.downAt < fu) {
          const P = new Set(v.targetIds);
          n(v.selectionAtDown.filter((M) => !P.has(M)));
        }
      } else n([.../* @__PURE__ */ new Set([...v.selectionAtDown, ...v.targetIds])]);
    }
    Le.current = null, ke({ v: [], h: [] }), window.removeEventListener("pointermove", tt), window.removeEventListener("pointerup", Pe), window.removeEventListener("pointercancel", Pe);
  }, [tt, n]);
  d.useEffect(() => () => Pe(), [Pe]);
  const $e = (l, m, v) => ({ xPct: Re((l - v.left) / v.width * 100, 0, 100), yPct: Re((m - v.top) / v.height * 100, 0, 100) }), Ie = (l, m, v, P) => ({ x: Re(l, 0, Math.max(0, 100 - v)), y: Re(m, 0, Math.max(0, 100 - P)), w: v, h: P }), xt = d.useCallback((l, m) => {
    const P = l > 1 ? l : 800, M = m > 1 ? m : 1100;
    return { w: Re(36 * 0.65 * 5 / P * 100, 6, 40), h: Re(36 * 1.4 / M * 100, 3, 20), fontSize: 36 };
  }, []), gt = d.useCallback((l, m, v) => v && v > 0 && l > 1 && m > 1 ? zs(v, l, m, 50) : { w: 50, h: 35 }, []), ir = d.useCallback((l, m, v) => {
    var _a2, _b;
    const P = (_a2 = C.current) == null ? void 0 : _a2.getBoundingClientRect(), M = (P == null ? void 0 : P.width) ?? 0, F = (P == null ? void 0 : P.height) ?? 0, D = (v == null ? void 0 : v.text) ?? "\uC81C\uBAA9", ae = (v == null ? void 0 : v.fontSize) ?? 36, fe = Math.max(1, D.split(/\r?\n/).length);
    let ne, S;
    if ((v == null ? void 0 : v.text) != null) {
      const ge = Math.min(40, Math.max(5, ((_b = D.split(/\r?\n/)[0]) == null ? void 0 : _b.length) || 5));
      ne = Re(ae * 0.65 * ge / Math.max(1, M || 800) * 100, 8, 80), S = Re(ae * 1.35 * fe / Math.max(1, F || 1100) * 100, 4, 40);
    } else {
      const ge = xt(M, F);
      ne = ge.w, S = ge.h;
    }
    const W = Ie(l, m, ne, S), J = Bn({ ...W, text: D, textAlign: "left", fontSize: ae, ...(v == null ? void 0 : v.fontWeight) != null ? { fontWeight: v.fontWeight } : {} });
    s(Lr(Z.current, J)), n([J.id]), (v == null ? void 0 : v.clearPlaceMode) !== false && (y == null ? void 0 : y(null));
  }, [s, y, n, xt]), or = d.useCallback(async (l, m, v) => {
    var _a2;
    try {
      const P = await jr(l, o), M = (_a2 = C.current) == null ? void 0 : _a2.getBoundingClientRect(), F = gt((M == null ? void 0 : M.width) ?? 0, (M == null ? void 0 : M.height) ?? 0, se);
      let D = $a(P, Ie(m, v, F.w, F.h));
      if (M && M.width > 1 && M.height > 1) {
        const ae = URL.createObjectURL(l);
        try {
          const fe = await new Promise((ne) => {
            const S = new Image();
            S.onload = () => {
              const W = S.naturalWidth || 0, J = S.naturalHeight || 0;
              ne(W > 0 && J > 0 ? W / J : null);
            }, S.onerror = () => ne(null), S.src = ae;
          });
          fe && fe > 0 && (D = Zn(D, fe, M.width, M.height, true), D = { ...D, x: Re(m, 0, Math.max(0, 100 - D.w)), y: Re(v, 0, Math.max(0, 100 - D.h)) });
        } finally {
          URL.revokeObjectURL(ae);
        }
      }
      s(Lr(Z.current, D)), n([D.id]);
    } catch (P) {
      console.error(P), window.alert(P instanceof Error ? P.message : "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [o, s, n, se, gt]), ar = d.useCallback((l, m, v) => {
    const P = Ie(m, v, rn.w, rn.h), M = Oa(l, { ...P, text: "", textAlign: "center", textVAlign: "middle", fontSize: 24, color: "#0c4a6e", fontWeight: "bold", paddingPct: 2 });
    s(Lr(Z.current, M)), n([M.id]), y == null ? void 0 : y(null);
  }, [s, y, n]);
  d.useEffect(() => {
    if ((w == null ? void 0 : w.kind) !== "image" || !w.files[0]) {
      V(null), I((M) => (M && URL.revokeObjectURL(M), null));
      return;
    }
    const l = w.files[0];
    let m = false;
    const v = URL.createObjectURL(l);
    I((M) => (M && URL.revokeObjectURL(M), v));
    const P = new Image();
    return P.onload = () => {
      if (m) return;
      const M = P.naturalWidth || 0, F = P.naturalHeight || 0;
      V(M > 0 && F > 0 ? M / F : null);
    }, P.onerror = () => {
      m || V(null);
    }, P.src = v, () => {
      m = true;
    };
  }, [w]), d.useEffect(() => {
    p || U(null);
  }, [p]), d.useEffect(() => {
    if (!w) {
      z(null), U(null);
      return;
    }
    const l = (m) => {
      var _a2;
      if (z({ x: m.clientX, y: m.clientY }), !p) {
        U(null);
        return;
      }
      const v = (_a2 = C.current) == null ? void 0 : _a2.getBoundingClientRect();
      if (!v || v.width < 1 || v.height < 1) {
        U(null);
        return;
      }
      const { xPct: P, yPct: M } = $e(m.clientX, m.clientY, v);
      if (w.kind === "text") {
        const D = xt(v.width, v.height);
        U(Ie(P, M, D.w, D.h));
        return;
      }
      if (w.kind === "shape") {
        U(Ie(P, M, rn.w, rn.h));
        return;
      }
      const F = gt(v.width, v.height, se);
      U(Ie(P, M, F.w, F.h));
    };
    return window.addEventListener("pointermove", l, { passive: true }), () => window.removeEventListener("pointermove", l);
  }, [w, p, se, gt, xt]);
  const lr = (l) => {
    if (l.button !== 0) return;
    const m = C.current;
    if (!m) return;
    const v = m.getBoundingClientRect();
    if (v.width < 1 || v.height < 1) return;
    l.preventDefault(), _(null);
    const P = l.metaKey || l.ctrlKey;
    P || n([]);
    const { xPct: M, yPct: F } = $e(l.clientX, l.clientY, v);
    Le.current = { kind: "marquee", startXPct: M, startYPct: F, curXPct: M, curYPct: F, additive: P, frameW: v.width, frameH: v.height, originClientX: l.clientX, originClientY: l.clientY }, $({ x: M, y: F, w: 0, h: 0 }), window.addEventListener("pointermove", tt), window.addEventListener("pointerup", Pe), window.addEventListener("pointercancel", Pe);
  }, Pt = (l) => {
    if (l.button === 0) {
      if (w) {
        const m = C.current;
        if (!m) return;
        const v = m.getBoundingClientRect();
        if (v.width < 1 || v.height < 1) return;
        l.preventDefault(), l.stopPropagation();
        const { xPct: P, yPct: M } = $e(l.clientX, l.clientY, v);
        if (w.kind === "text") {
          ir(P, M);
          return;
        }
        if (w.kind === "shape") {
          ar(w.shapeType, P, M);
          return;
        }
        const [F, ...D] = w.files;
        if (!F) {
          y == null ? void 0 : y(null);
          return;
        }
        (async () => (await or(F, P, M), y == null ? void 0 : y(D.length ? { kind: "image", files: D } : null)))();
        return;
      }
      lr(l);
    }
  }, Nr = (l, m) => {
    if (m.button !== 0) return;
    const v = C.current, P = Et(l);
    if (!v || !P) return;
    const M = v.getBoundingClientRect();
    if (M.width < 1 || M.height < 1) return;
    m.preventDefault(), m.stopPropagation();
    const F = m.metaKey || m.ctrlKey, D = m.altKey, ae = m.shiftKey, fe = ae && !F && !D, ne = (F || ae) && !D, S = ne ? Zc(Z.current, l, xe.current) : Vc(Z.current, l, xe.current), W = xe.current, J = S.length > 0 && S.every((Oe) => W.includes(Oe)), ge = J && W.length === S.length && S.every((Oe) => W.includes(Oe));
    let te = W, pe;
    if (fe) pe = { downAt: performance.now(), targetIds: S, wasFullySelected: J, selectionIsExactTarget: ge, selectionAtDown: [...W] }, J ? te = W : te = [.../* @__PURE__ */ new Set([...W, ...S])];
    else if (ne) if (J) if (ge) te = S;
    else {
      const Oe = new Set(S);
      te = W.filter((ur) => !Oe.has(ur)), n(te);
      return;
    }
    else te = [.../* @__PURE__ */ new Set([...W, ...S])], n(te);
    else J ? te = W : (te = S, n(te));
    const ve = _r(Z.current, te);
    if (!ve.length && !pe) return;
    const Ze = D || F && J;
    Le.current = { kind: "move", ids: ve, startX: m.clientX, startY: m.clientY, origElements: Z.current.elements.map((Oe) => ({ ...Oe })), frameW: M.width, frameH: M.height, moved: false, ...Ze ? { pendingDuplicate: true } : {}, ...pe ? { pendingShiftClick: pe } : {} }, window.addEventListener("pointermove", tt), window.addEventListener("pointerup", Pe), window.addEventListener("pointercancel", Pe);
  }, Ge = (l, m, v) => {
    const P = C.current, M = Et(l);
    if (!P || !M || sr(Z.current, M)) return;
    const F = P.getBoundingClientRect();
    F.width < 1 || F.height < 1 || (m.preventDefault(), m.stopPropagation(), n([l]), Le.current = { kind: "resize", id: l, handle: v, startX: m.clientX, startY: m.clientY, orig: { ...M }, frameW: F.width, frameH: F.height }, window.addEventListener("pointermove", tt), window.addEventListener("pointerup", Pe), window.addEventListener("pointercancel", Pe));
  }, at = d.useCallback((l, m) => {
    var _a2;
    const v = Z.current.elements.find((ne) => ne.id === l);
    if (!v || v.type !== "image") return;
    const P = !(v.naturalAspect && v.naturalAspect > 0), M = P;
    if (!P && !M) return;
    const F = (_a2 = C.current) == null ? void 0 : _a2.getBoundingClientRect(), D = (F == null ? void 0 : F.width) ?? 1, ae = (F == null ? void 0 : F.height) ?? 1, fe = Zn(v, m, D, ae, M);
    fe.naturalAspect === v.naturalAspect && fe.w === v.w && fe.h === v.h && fe.x === v.x && fe.y === v.y || s(er(Z.current, l, fe));
  }, [s]), cr = d.useCallback((l) => {
    const m = Z.current.elements.find((P) => P.id === l);
    if (!m || m.type !== "image") return;
    const v = { ...m };
    m.lockAspect ? delete v.lockAspect : v.lockAspect = true, s(er(Z.current, l, v));
  }, [s]), lt = d.useCallback((l) => {
    var _a2;
    const m = Z.current.elements.find((P) => P.id === l);
    if (!m || m.type !== "image") return;
    const v = (_a2 = C.current) == null ? void 0 : _a2.getBoundingClientRect();
    !v || v.width < 1 || v.height < 1 || s(er(Z.current, l, ud(m, v.width, v.height)));
  }, [s]), qe = d.useCallback((l) => {
    if (!l.length) return;
    xe.current = l, n(l);
    const m = dn(Z.current, l);
    Te(), Me.current = false, ee(m), ye(1);
  }, [n]), dr = d.useCallback(async (l) => {
    if (n([l.id]), typeof i != "function") {
      window.alert("\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    try {
      const m = await _a(l.path, i) || "";
      if (!m) {
        window.alert("\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        return;
      }
      T({ id: l.id, path: l.path, imageSrc: m });
    } catch (m) {
      console.error(m), window.alert(m instanceof Error ? m.message : "\uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    }
  }, [i, n]), Cr = d.useCallback(async (l, m) => {
    var _a2;
    if (!q) return;
    const v = await jr(l, o), P = Z.current.elements.find((ne) => ne.id === q.id);
    if (!P || P.type !== "image") {
      T(null);
      return;
    }
    const M = m.width / Math.max(1, m.height), F = (_a2 = C.current) == null ? void 0 : _a2.getBoundingClientRect(), D = (F == null ? void 0 : F.width) ?? 1, ae = (F == null ? void 0 : F.height) ?? 1, fe = Zn({ ...P, path: v }, M, D, ae, true);
    s(er(Z.current, q.id, fe)), T(null);
  }, [q, o, s]);
  d.useEffect(() => {
    const l = C.current;
    if (!l) return;
    const m = (v) => {
      const P = v;
      P.ctrlKey && (P.preventDefault(), P.stopPropagation());
    };
    return l.addEventListener("contextmenu", m), () => l.removeEventListener("contextmenu", m);
  }, []), d.useEffect(() => {
    const l = (m) => {
      var _a2;
      if (hr(m.target) || ht.current) return;
      const v = Us(m.clipboardData), P = Ys(m.clipboardData);
      let M = String(((_a2 = m.clipboardData) == null ? void 0 : _a2.getData("text/plain")) ?? "").trim();
      !v.length && !M && !P || (m.preventDefault(), m.stopPropagation(), (async () => {
        ht.current = true;
        try {
          let F = Z.current, D = null;
          const ae = [];
          let fe = false;
          for (const S of v) if (Zr(S)) try {
            ae.push(await Jr(S)), fe = true;
          } catch (W) {
            console.error(W), window.alert(W instanceof Error ? W.message : "SVG\uB97C PNG\uB85C \uBCC0\uD658\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
          }
          else ae.push(S);
          const ne = v.some(Zr);
          if (P && !ne) try {
            ae.push(await Jr(P)), fe = true;
          } catch (S) {
            console.error(S), window.alert(S instanceof Error ? S.message : "SVG\uB97C PNG\uB85C \uBCC0\uD658\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
          }
          if (fe && (Vs(M) || !M) && (M = ""), ae.length && (y == null ? void 0 : y({ kind: "image", files: ae })), M) {
            const S = ri(F.elements.length), W = M.split(/\r?\n/).length, J = Bn({ text: M, x: S.x, y: S.y, w: 64, h: Math.min(40, Math.max(10, W * 4 + 4)), fontSize: ae.length ? 24 : 28, fontWeight: "normal", textAlign: "left" });
            F = Lr(F, J), D = J.id;
          }
          F !== Z.current && (s(F), D && n([D]));
        } finally {
          ht.current = false;
        }
      })());
    };
    return window.addEventListener("paste", l), () => window.removeEventListener("paste", l);
  }, [o, s, y, n]), d.useEffect(() => {
    const l = { current: false }, m = (D) => {
      var _a2, _b, _c2;
      return D ? !!(((_a2 = D.types) == null ? void 0 : _a2.includes("Files")) || ((_b = D.types) == null ? void 0 : _b.includes("text/plain")) || ((_c2 = D.files) == null ? void 0 : _c2.length)) : false;
    }, v = async (D) => {
      let ae = String(D.getData("text/plain") ?? "").trim();
      const fe = Array.from(D.files || []);
      for (const ne of fe) if (!ne.type.startsWith("image/") && (ne.type.startsWith("text/") || /\.(txt|md|markdown|csv|json)$/i.test(ne.name))) try {
        const S = (await ne.text()).trim();
        S && (ae = S);
      } catch {
      }
      return ae;
    }, P = async (D, ae, fe) => {
      const ne = [];
      let S = false, W = fe;
      for (const ge of D) if (Zr(ge)) try {
        ne.push(await Jr(ge)), S = true;
      } catch (te) {
        console.error(te), window.alert(te instanceof Error ? te.message : "SVG\uB97C PNG\uB85C \uBCC0\uD658\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      }
      else ne.push(ge);
      const J = D.some(Zr);
      if (ae && !J) try {
        ne.push(await Jr(ae)), S = true;
      } catch (ge) {
        console.error(ge), window.alert(ge instanceof Error ? ge.message : "SVG\uB97C PNG\uB85C \uBCC0\uD658\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      }
      return S && (Vs(W) || !W) && (W = ""), { files: ne, text: W };
    }, M = (D) => {
      m(D.dataTransfer) && (hr(D.target) || (D.preventDefault(), D.dataTransfer && (D.dataTransfer.dropEffect = "copy")));
    }, F = (D) => {
      if (!D.dataTransfer || hr(D.target) || !m(D.dataTransfer) || l.current || ht.current) return;
      D.preventDefault(), D.stopPropagation();
      const ae = Us(D.dataTransfer), fe = Ys(D.dataTransfer);
      (async () => {
        l.current = true;
        try {
          let ne = await v(D.dataTransfer);
          const S = await P(ae, fe, ne);
          ne = S.text;
          const W = S.files;
          if (!W.length && !ne) return;
          if (W.length && (y == null ? void 0 : y({ kind: "image", files: W })), ne) {
            const J = ri(Z.current.elements.length), ge = ne.split(/\r?\n/).length, te = Bn({ text: ne, x: J.x, y: J.y, w: 64, h: Math.min(40, Math.max(10, ge * 4 + 4)), fontSize: W.length ? 24 : 28, fontWeight: "normal", textAlign: "left" });
            s(Lr(Z.current, te)), W.length || n([te.id]);
          }
        } finally {
          l.current = false;
        }
      })();
    };
    return window.addEventListener("dragover", M), window.addEventListener("drop", F), () => {
      window.removeEventListener("dragover", M), window.removeEventListener("drop", F);
    };
  }, [s, y, n]), d.useEffect(() => {
    const l = () => {
      const S = xe.current;
      S.length && (s(hs(Z.current, S)), n([]));
    }, m = () => {
      const S = xe.current;
      if (!S.length) return;
      const W = dn(Z.current, S);
      Te(), Me.current = false, ee(W), ye(1);
    }, v = /* @__PURE__ */ new Set();
    let P = null;
    const M = (S) => du * Fc({ altKey: S.altKey, shiftKey: S.shiftKey, ctrlKey: S.ctrlKey, metaKey: S.metaKey }), F = (S) => {
      var _a2;
      const W = _r(Z.current, xe.current);
      if (!W.length || E) return;
      const J = (_a2 = C.current) == null ? void 0 : _a2.getBoundingClientRect();
      if (!J || J.width < 1 || J.height < 1) return;
      const ge = M(S);
      let te = 0, pe = 0;
      if (v.has("ArrowLeft") && (te -= ge), v.has("ArrowRight") && (te += ge), v.has("ArrowUp") && (pe -= ge), v.has("ArrowDown") && (pe += ge), te === 0 && pe === 0) return;
      const ve = te / J.width * 100, Ze = pe / J.height * 100;
      s(qn(Z.current, W, ve, Ze));
    }, D = () => {
      v.clear(), P = null;
    }, ae = (S) => {
      var _a2;
      const W = S.metaKey || S.ctrlKey;
      if (S.key === "Tab" && S.shiftKey && !W && !S.altKey && !S.repeat) {
        if (hr(S.target)) return;
        S.preventDefault(), S.stopPropagation();
        const te = !et.current;
        et.current = te, (_a2 = Ve.current) == null ? void 0 : _a2.call(Ve, te), L(te ? "\uAC1C\uCCB4 \uC2A4\uB0C5 \uCF1C\uC9D0" : "\uAC1C\uCCB4 \uC2A4\uB0C5 \uAEBC\uC9D0");
        return;
      }
      if (S.key === "Escape") {
        if (Ee.current) return;
        if (we.current) {
          S.preventDefault(), S.stopPropagation(), y == null ? void 0 : y(null);
          return;
        }
        if (E) {
          S.preventDefault(), S.stopPropagation(), _(null), document.activeElement instanceof HTMLElement && document.activeElement.blur();
          return;
        }
        if (hr(S.target) || !xe.current.length) return;
        S.preventDefault(), S.stopPropagation(), n([]);
        return;
      }
      if (W && S.shiftKey && !S.altKey) {
        const { code: te, key: pe } = S, ve = te === "Comma" || pe === "<" || pe === ",";
        if (ve || (te === "Period" || pe === ">" || pe === ".")) {
          if (!xe.current.length) return;
          S.preventDefault(), S.stopPropagation();
          const Oe = gs(Z.current, xe.current, ve ? -1 : 1);
          Oe !== Z.current && s(Oe);
          return;
        }
      }
      if (S.altKey && !W && !S.shiftKey && !S.repeat) {
        const pe = { KeyL: "left", KeyM: "center", KeyE: "center", KeyR: "right" }[S.code];
        if (pe) {
          if (!xe.current.length) return;
          S.preventDefault(), S.stopPropagation();
          const ve = un(Z.current, xe.current, pe);
          ve !== Z.current && s(ve);
          return;
        }
      }
      if (hr(S.target)) return;
      if (ki(S.key)) {
        if (!xe.current.length || E || Le.current) return;
        S.preventDefault(), S.stopPropagation();
        const te = performance.now(), pe = v.has(S.key);
        if (v.add(S.key), P == null) {
          P = te, F(S);
          return;
        }
        if (!pe && !S.repeat) {
          F(S);
          return;
        }
        if (te - P < uu) return;
        F(S);
        return;
      }
      if (!S.metaKey && !S.ctrlKey && !S.altKey && (S.key === "Backspace" || S.key === "Delete")) {
        if (!xe.current.length || Ee.current) return;
        S.preventDefault(), S.stopPropagation();
        const te = dn(Z.current, xe.current);
        if (S.key === "Backspace" || te) {
          m();
          return;
        }
        l();
        return;
      }
      if (!S.metaKey && !S.ctrlKey && !S.altKey && !S.shiftKey && !S.repeat) {
        const te = S.key.toLowerCase();
        if (te === "t" || te === "m" || te === "o") {
          if (E || Ee.current) return;
          S.preventDefault(), S.stopPropagation();
          const pe = we.current;
          if (te === "t") {
            y == null ? void 0 : y((pe == null ? void 0 : pe.kind) === "text" ? null : { kind: "text" });
            return;
          }
          if (te === "m") {
            y == null ? void 0 : y((pe == null ? void 0 : pe.kind) === "shape" && pe.shapeType === "rect" ? null : { kind: "shape", shapeType: "rect" });
            return;
          }
          y == null ? void 0 : y((pe == null ? void 0 : pe.kind) === "shape" && pe.shapeType === "ellipse" ? null : { kind: "shape", shapeType: "ellipse" });
          return;
        }
      }
      if (!W || S.altKey) return;
      const J = S.key.toLowerCase();
      if (re.current && (J === "z" || J === "y")) return;
      if (J === "z" && S.shiftKey) {
        S.preventDefault(), S.stopPropagation(), k == null ? void 0 : k();
        return;
      }
      if (J === "y") {
        S.preventDefault(), S.stopPropagation(), k == null ? void 0 : k();
        return;
      }
      if (J === "z") {
        S.preventDefault(), S.stopPropagation(), g == null ? void 0 : g();
        return;
      }
      if (J !== "g") return;
      if (S.preventDefault(), S.stopPropagation(), S.shiftKey) {
        const te = Yc(Z.current, xe.current);
        if (!te) return;
        s(Mn(Z.current, te));
        return;
      }
      const ge = Rn(Z.current, xe.current);
      ge && (s(ge.cover), n(Ce(ge.cover, ge.groupId)));
    }, fe = (S) => {
      ki(S.key) && (v.delete(S.key), v.size === 0 && (P = null));
    }, ne = () => {
      D();
    };
    return window.addEventListener("keydown", ae), window.addEventListener("keyup", fe), window.addEventListener("blur", ne), () => {
      window.removeEventListener("keydown", ae), window.removeEventListener("keyup", fe), window.removeEventListener("blur", ne);
    };
  }, [E, s, n, g, k, y, L]);
  const Er = new Set(r), Xe = r.length === 1 ? Et(r[0]) : null, bt = d.useMemo(() => {
    const l = Ye(e, r), m = [], v = /* @__PURE__ */ new Set();
    for (const P of l) {
      if (!_e(e, P)) continue;
      const M = Ce(e, P);
      if (!M.length) continue;
      const F = mn(Uc(e, M));
      if (F) {
        m.push({ id: P, bounds: F });
        for (const D of M) v.add(D);
      }
    }
    return { outlines: m, memberIds: v };
  }, [e, r]), Be = d.useMemo(() => !de || de.w < 0.05 && de.h < 0.05 ? /* @__PURE__ */ new Set() : new Set(ii(e.elements, de)), [e.elements, de]), rt = (l, m, v) => {
    const P = sr(e, l), M = bt.memberIds.has(l.id), F = ["absolute", "box-border"];
    return P && m ? F.push("ring-2", "ring-yellow-400", "ring-offset-0") : m && M ? F.push("ring-2", "ring-blue-300", "ring-offset-0") : m ? F.push("ring-2", "ring-blue-500", "ring-offset-0") : v ? F.push("outline", "outline-2", "outline-dashed", "outline-blue-500", "-outline-offset-1") : F.push("hover:ring-1", "hover:ring-blue-300"), x && l.type === "text" && F.push("shadow-[inset_0_0_0_1px_rgba(248,113,113,0.7)]"), F.join(" ");
  };
  return t.jsxs(cn, { cover: e, getPresignedUrl: i, showFrameOutline: true, renderElements: false, className: `shadow-[0_8px_28px_rgba(15,23,42,0.12)] print:shadow-none ${N}`, children: [t.jsxs("div", { ref: C, className: `absolute inset-0 ${w ? "cursor-crosshair" : ""}`, tabIndex: 0, role: "application", "aria-label": "\uD45C\uC9C0 \uD3B8\uC9D1 \uCE94\uBC84\uC2A4", onPointerDown: (l) => {
    Pt(l);
  }, children: [ie.v.map((l) => t.jsx("div", { className: "pointer-events-none absolute top-0 bottom-0 z-40 w-px bg-pink-500/80", style: { left: `${l}%` }, "aria-hidden": true }, `snap-v-${l}`)), ie.h.map((l) => t.jsx("div", { className: "pointer-events-none absolute left-0 right-0 z-40 h-px bg-pink-500/80", style: { top: `${l}%` }, "aria-hidden": true }, `snap-h-${l}`)), de && (de.w > 0.05 || de.h > 0.05) ? t.jsx("div", { className: "pointer-events-none absolute z-50 border border-dashed border-blue-500 bg-blue-500/10", style: { left: `${de.x}%`, top: `${de.y}%`, width: `${de.w}%`, height: `${de.h}%` }, "aria-hidden": true }) : null, bt.outlines.map(({ id: l, bounds: m }) => t.jsx("div", { className: "pointer-events-none absolute z-40 border-2 border-blue-500", style: { left: `${m.x}%`, top: `${m.y}%`, width: `${m.w}%`, height: `${m.h}%` }, "aria-hidden": true }, `group-sel-${l}`)), w && p && G ? t.jsx("div", { className: "pointer-events-none absolute z-45 overflow-hidden rounded-sm border border-dashed border-blue-500 bg-blue-500/15", style: { left: `${G.x}%`, top: `${G.y}%`, width: `${G.w}%`, height: `${G.h}%` }, "aria-hidden": true, children: w.kind === "text" ? t.jsx("div", { className: "flex h-full w-full items-start justify-start px-0.5 text-left font-bold text-gray-800/40 dark:text-white/35", style: { fontSize: 36, lineHeight: 1.25 }, children: "\uC81C\uBAA9" }) : w.kind === "shape" ? t.jsx("div", { className: "h-full w-full border border-blue-500/50 bg-sky-200/40", style: { borderRadius: w.shapeType === "ellipse" ? "50%" : w.shapeType === "roundRect" ? "8%" : 0 } }) : R ? t.jsx("img", { src: R, alt: "", className: "h-full w-full object-fill opacity-45", draggable: false }) : t.jsx("div", { className: "h-full w-full bg-blue-400/20" }) }) : null, e.elements.map((l, m) => {
    const v = Er.has(l.id), P = Be.has(l.id), M = sr(e, l), F = !M && (l.type === "text" || kr(l)), D = F && l.id === E, ae = v && r.length === 1 && !D && !M, fe = rt(l, v, P), ne = t.jsxs(t.Fragment, { children: [D && l.type === "text" ? t.jsx("textarea", { className: "h-full w-full resize-none border-0 bg-transparent p-0 outline-none", style: oo(l), value: l.text, autoFocus: true, onChange: (W) => {
      s(er(Z.current, l.id, { ...l, text: W.target.value }));
    }, onBlur: () => _(null), onPointerDown: (W) => W.stopPropagation() }) : l.type === "text" ? t.jsx(xu, { el: l }) : kr(l) ? t.jsx(gu, { el: l, isEditing: D, onTextChange: (W) => {
      s(er(Z.current, l.id, { ...l, text: W }));
    }, onBlur: () => _(null) }) : t.jsx(hu, { el: l, getPresignedUrl: i, onNaturalReady: (W) => at(l.id, W) }), ae ? cu.map((W) => t.jsx("div", { className: `absolute z-30 h-2.5 w-2.5 rounded-sm border border-white bg-blue-500 ${W.className}`, onPointerDown: (J) => {
      if (w) {
        Pt(J);
        return;
      }
      Ge(l.id, J, W.id);
    } }, W.id)) : null] }), S = t.jsx("div", { "data-cover-el": l.id, "data-cover-locked": M ? "1" : void 0, className: fe, style: { left: `${l.x}%`, top: `${l.y}%`, width: `${l.w}%`, height: `${l.h}%`, zIndex: v || P ? 20 + m : 10 + m, cursor: D ? "text" : M ? "default" : "move" }, onContextMenu: (W) => {
      xe.current.includes(l.id) || (xe.current = [l.id], n([l.id])), H && (W.preventDefault(), ue(l.id));
    }, onPointerDown: (W) => {
      if (w) {
        Pt(W);
        return;
      }
      if (D) {
        W.stopPropagation();
        return;
      }
      Nr(l.id, W);
    }, onDoubleClick: (W) => {
      if (W.preventDefault(), W.stopPropagation(), w) return;
      const J = qc(Z.current, l.id, xe.current);
      J.ids.length && (n(J.ids), J.enterEdit && F && _(l.id));
    }, children: ne });
    return H ? t.jsx("div", { children: S }, l.id) : t.jsxs(kc, { children: [t.jsx(jc, { asChild: true, children: S }), t.jsx(Sc, { children: t.jsx(lu, { cover: e, targetId: l.id, selectedIds: r, onChange: s, onSelectIds: n, onRequestDelete: qe, onImageCrop: (W) => {
      dr(W);
    }, onRestoreImageAspect: lt, onToggleImageLockAspect: cr }) })] }, l.id);
  })] }), H && B ? t.jsx(Yi, { open: !!B, onOpenChange: (l) => {
    l || ue(null);
  }, title: (() => {
    const l = e.elements.find((m) => m.id === B);
    return l ? Br(l) : "\uCEE4\uBC84 \uC694\uC18C";
  })(), subtitle: "\uCEE4\uBC84 \uCE94\uBC84\uC2A4", bodyClassName: "p-0", children: t.jsx(Hi, { surface: "mobile", children: t.jsx("div", { className: "p-2", children: t.jsx(Ro, { cover: e, targetId: B, selectedIds: r, onChange: s, onSelectIds: n, onRequestDelete: (l) => {
    qe(l), ue(null);
  }, onImageCrop: (l) => {
    ue(null), dr(l);
  }, onRestoreImageAspect: lt, onToggleImageLockAspect: cr }) }) }) }) : null, Xe ? t.jsxs("span", { className: "sr-only", children: ["Selected ", Xe.type, " ", Xe.id] }) : r.length > 1 ? t.jsxs("span", { className: "sr-only", children: ["Selected ", r.length, " layers"] }) : null, t.jsx(Bi, { isOpen: !!q, onClose: () => T(null), contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: q ? t.jsx(Bc, { imageSrc: q.imageSrc, fileName: q.path, onCancel: () => T(null), onConfirm: Cr }) : null }), t.jsx(vr, { isOpen: Y > 0, title: Y === 2 ? "\uC7A0\uAE34 \uAC1C\uCCB4 \uC0AD\uC81C" : "\uAC1C\uCCB4 \uC0AD\uC81C", message: Y === 2 ? "\uC7A0\uAE34 \uAC1C\uCCB4\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uC815\uB9D0 \uC0AD\uC81C\uD560\uAE4C\uC694?" : "\uC120\uD0DD\uD55C \uAC1C\uCCB4\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694?", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", variant: "danger", onConfirm: () => {
    if (me && Y === 1) {
      Sr();
      return;
    }
    const l = xe.current;
    Qe(), l.length && (s(hs(Z.current, l)), n([]));
  }, onCancel: Qe }, `cover-delete-confirm-${Y}`), w && O ? ss.createPortal(t.jsx("div", { className: "pointer-events-none fixed z-[100001] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", style: p ? { left: O.x + 14, top: O.y - 8, transform: "translateY(-100%)" } : { left: O.x + 14, top: O.y + 18 }, children: "\uD074\uB9AD\uD574\uC11C \uC0BD\uC785\uD558\uAE30" }), document.body) : null] });
}
function br({ children: e, className: r = "" }) {
  return t.jsx("kbd", { className: ["inline-flex shrink-0 min-w-7 items-center justify-center whitespace-nowrap rounded-md border border-b-2 border-gray-300 bg-linear-to-b from-white to-gray-100 px-2 py-1 font-mono text-xs font-semibold leading-none text-ink shadow-[0_1px_0_rgba(15,23,42,0.06)] dark:border-odp-borderStrong dark:from-odp-surface dark:to-odp-bgSoft dark:text-odp-fgStrong", r].filter(Boolean).join(" "), children: e });
}
function He({ keys: e, className: r = "" }) {
  return t.jsx("span", { className: `inline-flex max-w-full flex-wrap items-center gap-x-0.5 gap-y-1 ${r}`, children: e.map((n, s) => t.jsxs("span", { className: "inline-flex shrink-0 items-center gap-0.5", children: [s > 0 ? t.jsx("span", { className: "px-0.5 text-xs text-gray-400 dark:text-odp-muted", "aria-hidden": true, children: "+" }) : null, t.jsx(br, { children: n })] }, s)) });
}
function Mo() {
  if (typeof navigator > "u") return false;
  const e = navigator.platform || "", r = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(r);
}
function wu() {
  return Mo() ? "\u2318" : "Ctrl";
}
function yu() {
  return Mo() ? "\u2325" : "Alt";
}
const Or = "__cover-layer-root__", Lo = "flex w-full items-center gap-1 rounded px-1.5 py-1 text-left text-[11px] hover:bg-gray-100 dark:hover:bg-odp-focusBg", ws = "bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-200", vu = "z-[10060] min-w-[160px] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-[11px] text-gray-800 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", Rt = "flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-gray-100 dark:data-highlighted:bg-odp-focusBg", ku = (e) => {
  const r = Va(e);
  return r.length > 0 ? r : qa(e);
};
function ji(e, r, n, s) {
  if (e === Or) return "after";
  if (!n || s == null) return r ? "inside" : "before";
  const i = (s - n.top) / Math.max(1, n.height);
  return r ? i < 0.28 ? "before" : i > 0.72 ? "after" : "inside" : i < 0.5 ? "before" : "after";
}
function ju(e) {
  return e.type === "text" ? t.jsx(an, { size: 12, className: "shrink-0 opacity-70", "aria-hidden": true }) : kr(e) ? t.jsx(ln, { size: 12, className: "shrink-0 opacity-70", "aria-hidden": true }) : t.jsx(so, { size: 12, className: "shrink-0 opacity-70", "aria-hidden": true });
}
function Si({ displayValue: e, editValue: r, placeholder: n, isEditing: s, className: i, onStartEdit: o, onCommit: a, onCancel: u }) {
  const [c, f] = d.useState(r), b = d.useRef(r), x = d.useRef(null), p = d.useRef(false);
  if (d.useEffect(() => {
    if (!s) return;
    p.current = false, b.current = r, f(r);
    const k = window.requestAnimationFrame(() => {
      const N = x.current;
      N && (N.focus(), N.select());
    });
    return () => window.cancelAnimationFrame(k);
  }, [s]), !s) return t.jsx("span", { className: i, onDoubleClick: (k) => {
    k.stopPropagation(), k.preventDefault(), o();
  }, children: e });
  const w = () => {
    p.current || (p.current = true, a(b.current));
  }, y = () => {
    p.current || (p.current = true, u());
  }, g = (k) => {
    if (k.key === "Enter") {
      k.preventDefault(), k.stopPropagation(), w();
      return;
    }
    k.key === "Escape" && (k.preventDefault(), k.stopPropagation(), y());
  };
  return t.jsx("input", { ref: x, className: "min-w-0 flex-1 rounded border border-blue-400 bg-white px-1 py-0 text-[11px] text-gray-900 outline-none select-text placeholder:text-gray-400 dark:border-blue-500 dark:bg-odp-bg dark:text-odp-fgStrong dark:placeholder:text-gray-500", value: c, placeholder: n, "aria-label": "\uB808\uC774\uC5B4 \uC774\uB984", onChange: (k) => {
    b.current = k.target.value, f(k.target.value);
  }, onBlur: w, onKeyDown: g, onClick: (k) => k.stopPropagation(), onPointerDown: (k) => k.stopPropagation(), onDoubleClick: (k) => k.stopPropagation() });
}
function Su({ children: e, cover: r, targetId: n, kind: s, selectedIds: i, onChange: o, onSelectIds: a, onRequestDeleteLayers: u, onStartRename: c }) {
  var _a2, _b;
  const f = Fe(r), b = s === "group" ? Ce(f, n) : [n], x = s === "group" ? b.length ? b : [] : i.includes(n) ? i : [n], p = s === "group" ? n : ((_a2 = f.elements.find((L) => L.id === n)) == null ? void 0 : _a2.groupId) ?? null, w = (() => {
    if (s !== "element" || x.length < 1) return false;
    const L = Ye(f, x);
    return !(L.length === 1 && _e(f, L[0]));
  })(), y = !!p, g = Hr(r, n), k = s === "group" ? ((_b = Nt(f, n)) == null ? void 0 : _b.name) ?? "\uADF8\uB8F9" : (() => {
    const L = f.elements.find((C) => C.id === n);
    return L ? Br(L) : "\uB808\uC774\uC5B4";
  })(), N = s === "group" ? "\uB808\uC774\uC5B4 \uADF8\uB8F9" : "\uB808\uC774\uC5B4";
  return t.jsxs(el, { title: k, subtitle: N, contentClassName: vu, trigger: e, children: [t.jsxs(Ae, { className: Rt, onSelect: () => {
    window.setTimeout(() => c(n), 0);
  }, children: [t.jsx(ic, { size: 14 }), "\uC774\uB984 \uBCC0\uACBD"] }), t.jsxs(Ae, { className: Rt, onSelect: () => o(po(r, n)), children: [g ? t.jsx(Ns, { size: 14 }) : t.jsx(Cs, { size: 14 }), g ? "\uC7A0\uAE08 \uD574\uC81C" : "\uC7A0\uAE08"] }), t.jsx(sn, {}), t.jsxs(Ae, { className: Rt, disabled: !w, onSelect: () => {
    const L = Rn(r, x);
    L && (o(L.cover), a(Ce(L.cover, L.groupId)));
  }, children: [t.jsx(Ps, { size: 14 }), "\uADF8\uB8F9"] }), t.jsxs(Ae, { className: Rt, disabled: !y, onSelect: () => {
    p && o(Mn(r, p));
  }, children: [t.jsx(Es, { size: 14 }), "\uADF8\uB8F9 \uD574\uC81C"] }), t.jsxs(Ae, { className: Rt, onSelect: () => {
    const L = ks(r);
    o(L.cover);
  }, children: [t.jsx(io, { size: 14 }), "\uC0C8 \uADF8\uB8F9"] }), t.jsx(sn, {}), t.jsxs(Ae, { className: Rt, disabled: s === "group" ? false : x.length === 0, onSelect: () => {
    if (s === "group") {
      o(Oi(r, [n]));
      return;
    }
    o(Ms(r, x));
  }, children: [t.jsx(Ts, { size: 14 }), "\uB9E8 \uC55E\uC73C\uB85C"] }), t.jsxs(Ae, { className: Rt, onSelect: () => {
    if (s === "group") {
      o(_i(r, [n]));
      return;
    }
    o(Ls(r, x));
  }, children: [t.jsx(Rs, { size: 14 }), "\uB9E8 \uB4A4\uB85C"] }), t.jsx(sn, {}), t.jsxs(Ae, { className: `${Rt} text-red-600 dark:text-red-400`, danger: true, onSelect: () => {
    const L = s === "group" ? [n] : x;
    if (u) {
      u(L);
      return;
    }
    o(s === "group" ? vn(r, [n]) : Nu(r, x)), a([]);
  }, children: [t.jsx(kn, { size: 14 }), "\uC0AD\uC81C"] })] });
}
function Nu(e, r) {
  return vn(e, r);
}
function Cu({ id: e, kind: r, depth: n, cover: s, selectedIds: i, selectedSet: o, collapsed: a, dropHint: u, isRenaming: c, onStartRename: f, onFinishRename: b, onToggleCollapse: x, onSelectElement: p, onSelectGroup: w, onChange: y, onSelectIds: g, onRequestDeleteLayers: k }) {
  const { attributes: N, listeners: L, setNodeRef: C, transform: E, transition: _, isDragging: O } = Za({ id: e, data: { kind: r }, disabled: c }), z = { transform: Ja.Transform.toString(E), transition: _, opacity: O ? 0.35 : 1, paddingLeft: `${6 + n * 12}px` }, G = Fe(s), U = d.useRef(s);
  U.current = s;
  const R = r === "group" ? Nt(G, e) : null, I = r === "element" ? G.elements.find((Y) => Y.id === e) : null, se = r === "group" ? Ce(G, e) : [], V = r === "group" && se.length > 0 && se.every((Y) => o.has(Y)), ie = r === "group" && !V && se.some((Y) => o.has(Y)), ke = r === "element" && o.has(e), de = Hr(s, e), $ = `${Lo} relative ${r === "group" ? V ? ws : ie ? "bg-blue-50/50 dark:bg-blue-950/20" : "" : ke ? ws : ""} ${de ? "ring-1 ring-inset ring-yellow-400/80" : ""}`, q = c ? {} : { ...N, ...L }, T = (Y) => {
    var _a2;
    const ye = U.current;
    if (r === "group") {
      const me = Nt(ye, e), ee = Y.trim() || "\uADF8\uB8F9";
      if (me && me.name === ee) {
        b();
        return;
      }
      y(Qc(ye, e, Y));
    } else {
      const me = ye.elements.find((ee) => ee.id === e);
      if (me) {
        const ee = Y.trim(), Ee = ((_a2 = me.name) == null ? void 0 : _a2.trim()) ?? "";
        if (ee === Ee) {
          b();
          return;
        }
        if (!Ee && ee === qs(me)) {
          b();
          return;
        }
      }
      y(ed(ye, e, Y));
    }
    b();
  }, H = t.jsx("span", { role: "button", tabIndex: -1, "data-no-dnd": true, className: `shrink-0 rounded p-0.5 hover:bg-gray-200 dark:hover:bg-odp-borderStrong ${de ? "text-yellow-600 dark:text-yellow-400" : "text-gray-400"}`, title: de ? "\uC7A0\uAE08 \uD574\uC81C" : "\uC7A0\uAE08", "aria-label": de ? "\uC7A0\uAE08 \uD574\uC81C" : "\uC7A0\uAE08", onClick: (Y) => {
    Y.stopPropagation(), y(po(s, e));
  }, onPointerDown: (Y) => Y.stopPropagation(), children: de ? t.jsx(Cs, { size: 12 }) : t.jsx(Ns, { size: 12 }) }), B = u === "before" ? t.jsx("div", { className: "pointer-events-none absolute inset-x-1 -top-0.5 z-10 h-0.5 rounded bg-blue-500" }) : u === "after" ? t.jsx("div", { className: "pointer-events-none absolute inset-x-1 -bottom-0.5 z-10 h-0.5 rounded bg-blue-500" }) : u === "inside" ? t.jsx("div", { className: "pointer-events-none absolute inset-0 z-10 rounded ring-2 ring-inset ring-blue-400/70" }) : null, ue = (Y) => {
    c || Y.target instanceof Element && Y.target.closest("[data-no-dnd]") || (r === "group" ? w(e, Y) : p(e, Y));
  }, re = r === "group" && R ? t.jsxs("div", { ref: C, style: z, className: `${$} cursor-grab active:cursor-grabbing`, "aria-selected": V, role: "option", onClick: ue, ...q, children: [B, t.jsx("button", { type: "button", className: "shrink-0 rounded p-0.5 hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: (Y) => {
    Y.stopPropagation(), x();
  }, "aria-label": a ? "\uADF8\uB8F9 \uD3BC\uCE58\uAE30" : "\uADF8\uB8F9 \uC811\uAE30", children: a ? t.jsx(qi, { size: 12 }) : t.jsx(mt, { size: 12 }) }), t.jsx(sc, { size: 12, className: "shrink-0 opacity-70" }), t.jsx(Si, { displayValue: R.name, editValue: R.name, isEditing: c, className: "min-w-0 flex-1 truncate font-medium", onStartEdit: () => f(e), onCommit: T, onCancel: b }), c ? null : t.jsx("span", { className: "shrink-0 text-[9px] text-gray-400", children: se.length }), H] }) : I ? t.jsxs("div", { ref: C, style: z, className: `${$} cursor-grab active:cursor-grabbing`, "aria-selected": ke, onClick: ue, ...q, role: "option", children: [B, ju(I), t.jsx(Si, { displayValue: Br(I), editValue: qs(I), isEditing: c, className: "min-w-0 flex-1 truncate", onStartEdit: () => f(e), onCommit: T, onCancel: b }), H, !c && i.length === 1 && i[0] === e ? t.jsxs("span", { className: "flex shrink-0 gap-0.5", children: [t.jsx("span", { role: "button", tabIndex: -1, className: "rounded px-1 text-[9px] hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: (Y) => {
    Y.stopPropagation(), y(xs(s, e, 1));
  }, children: "\u2191" }), t.jsx("span", { role: "button", tabIndex: -1, className: "rounded px-1 text-[9px] hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: (Y) => {
    Y.stopPropagation(), y(xs(s, e, -1));
  }, children: "\u2193" })] }) : null] }) : null;
  return re ? t.jsx(Su, { cover: s, targetId: e, kind: r, selectedIds: i, onChange: y, onSelectIds: g, onRequestDeleteLayers: k, onStartRename: f, children: t.jsx(ao.div, { layout: c ? false : "position", transition: { duration: 0.18, ease: "easeOut" }, children: re }) }) : null;
}
function Eu({ active: e }) {
  const { setNodeRef: r, isOver: n } = Qa({ id: Or });
  return t.jsx("div", { ref: r, className: `mt-1 min-h-8 rounded border border-dashed px-2 py-2 text-center text-[9px] transition-colors ${n || e ? "border-blue-400 bg-blue-50/60 text-blue-600 dark:bg-blue-950/30" : "border-gray-200 text-gray-400 dark:border-odp-borderStrong"}`, "aria-label": "\uB8E8\uD2B8\uB85C \uC774\uB3D9", children: "\uB8E8\uD2B8\uB85C \uBE7C\uB0B4\uAE30" });
}
function Pu({ cover: e, selectedIds: r, onSelectIds: n, onChange: s, collapsedGroups: i, onCollapsedGroupsChange: o, onRequestDeleteLayers: a }) {
  const u = d.useMemo(() => Fe(e), [e]), c = d.useMemo(() => Fa(u, i), [u, i]), f = d.useMemo(() => c.map((T) => T.id), [c]), b = d.useMemo(() => new Set(r), [r]), x = d.useRef(null), [p, w] = d.useState(null), [y, g] = d.useState(null), [k, N] = d.useState("before"), [L, C] = d.useState(null), E = d.useRef(null), _ = d.useRef(null), O = Ba(Ha(Wa, { activationConstraint: { distance: 5 } }));
  d.useEffect(() => {
    L && (c.some((T) => T.id === L) || C(null));
  }, [c, L]);
  const z = (T) => _e(u, T) ? Ce(e, T) : [T], G = (T, H) => {
    const B = c.findIndex((me) => me.id === T), ue = c.findIndex((me) => me.id === H);
    if (B < 0 || ue < 0) {
      n(z(H));
      return;
    }
    const re = Math.min(B, ue), Y = Math.max(B, ue), ye = [];
    for (let me = re; me <= Y; me += 1) {
      const ee = c[me];
      ee && ye.push(...z(ee.id));
    }
    n([...new Set(ye)]);
  }, U = (T, H) => {
    if (H.preventDefault(), H.shiftKey && x.current) {
      G(x.current, T);
      return;
    }
    const B = z(T);
    if (H.metaKey || H.ctrlKey) {
      if (B.every((re) => b.has(re))) {
        const re = new Set(B);
        n(r.filter((Y) => !re.has(Y)));
      } else n([.../* @__PURE__ */ new Set([...r, ...B])]);
      return;
    }
    x.current = T, n(B);
  }, R = (T, H) => {
    if (H.preventDefault(), H.shiftKey && x.current) {
      G(x.current, T);
      return;
    }
    const B = Ce(e, T);
    if (H.metaKey || H.ctrlKey) {
      const ue = new Set(r);
      B.length > 0 && B.every((Y) => ue.has(Y)) ? B.forEach((Y) => ue.delete(Y)) : B.forEach((Y) => ue.add(Y)), n([...ue]);
      return;
    }
    x.current = T, n(B);
  }, I = (T) => {
    if (_e(u, T)) return T;
    const H = Ye(e, r);
    for (const B of H) if (_e(u, B) && Ce(u, B).includes(T)) return B;
    return T;
  }, se = (T) => {
    const H = T.over;
    if (!H) {
      g(null);
      return;
    }
    const B = String(H.id);
    g(B);
    const ue = B !== Or && _e(u, B), re = H.rect;
    N(ji(B, ue, re ? { top: re.top, height: re.height } : null, E.current));
  }, V = (T) => {
    const H = String(T.active.id), B = I(H);
    _.current = B, w(B);
  }, ie = (T) => {
    const H = T.active.rect.current.translated;
    H && (E.current = H.top + H.height / 2), se(T);
  }, ke = (T) => {
    var _a2;
    const H = _.current ?? String(T.active.id), B = T.over ? String(T.over.id) : null;
    let ue = k;
    if (_.current = null, w(null), g(null), E.current = null, !B || H === B) return;
    if (B === Or) {
      s(Ya(e, H, "end"));
      return;
    }
    const re = _e(u, B), Y = (_a2 = T.over) == null ? void 0 : _a2.rect;
    if (Y) {
      const ye = T.active.rect.current.translated != null ? T.active.rect.current.translated.top + T.active.rect.current.translated.height / 2 : null;
      ue = ji(B, re, { top: Y.top, height: Y.height }, ye);
    }
    s(Fi(e, H, B, ue));
  }, de = () => {
    _.current = null, w(null), g(null), E.current = null;
  }, $ = p ? c.find((T) => T.id === p) ?? null : null, q = (() => {
    var _a2;
    if (!$) return "";
    if ($.kind === "group") return ((_a2 = Nt(u, $.id)) == null ? void 0 : _a2.name) ?? "\uADF8\uB8F9";
    const T = u.elements.find((H) => H.id === $.id);
    return T ? Br(T) : "";
  })();
  return t.jsxs(Ka, { sensors: O, collisionDetection: ku, onDragStart: V, onDragMove: ie, onDragEnd: ke, onDragCancel: de, children: [t.jsxs("div", { className: "max-h-72 space-y-0.5 overflow-y-auto rounded-md border border-gray-200 bg-white p-1 select-none dark:border-odp-borderStrong dark:bg-odp-bg", role: "listbox", "aria-label": "\uD45C\uC9C0 \uB808\uC774\uC5B4", "aria-multiselectable": true, children: [c.length === 0 ? t.jsx("p", { className: "px-2 py-3 text-center text-[10px] text-gray-400", children: "\uB808\uC774\uC5B4 \uC5C6\uC74C" }) : t.jsx(Ga, { items: f, strategy: Xa, children: c.map((T) => t.jsx(Cu, { id: T.id, kind: T.kind, depth: T.depth, cover: u, selectedIds: r, selectedSet: b, collapsed: !!i[T.id], dropHint: p && y === T.id && p !== T.id ? k : null, isRenaming: L === T.id, onStartRename: C, onFinishRename: () => C(null), onToggleCollapse: () => o({ ...i, [T.id]: !i[T.id] }), onSelectElement: U, onSelectGroup: R, onChange: s, onSelectIds: n, onRequestDeleteLayers: a }, T.id)) }), t.jsx(Eu, { active: !!(p && y === Or) })] }), t.jsx(Ua, { dropAnimation: null, children: p ? t.jsx(ao.div, { initial: { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" }, animate: { scale: 1.03, boxShadow: "0 8px 24px rgba(15, 23, 42, 0.18)" }, className: `${Lo} ${ws} cursor-grabbing border border-blue-200 bg-white dark:border-blue-800 dark:bg-odp-surface`, children: t.jsx("span", { className: "truncate px-1", children: q }) }) : null })] });
}
const Ni = Vi, Tu = "s3haim_cover_sidebar_width", Ru = 300, Mu = "s3haim_cover_layers_sidebar_width", Lu = 280, zo = "s3haim_cover_layers_detached", xr = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), gr = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Ar = "text-[11px] font-medium text-gray-500 dark:text-odp-fgMuted", Lt = "inline-flex items-center justify-center gap-1 rounded-md border border-gray-300 px-2 py-1.5 text-[11px] text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-odp-borderStrong dark:text-odp-fg dark:hover:bg-odp-focusBg", Ne = "inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-odp-borderStrong dark:text-odp-fg dark:hover:bg-odp-focusBg", pt = "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200", Ot = "z-[10050] max-w-[220px] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", zu = { settings: false, shortcuts: false, layers: true, background: true, selection: true };
function Ue({ keys: e, children: r }) {
  return t.jsxs("li", { className: "flex flex-col gap-1.5 rounded-md border border-gray-200/80 bg-gray-50/90 px-2.5 py-2 dark:border-odp-borderStrong/60 dark:bg-odp-focusBg/45", children: [t.jsx("div", { className: "flex max-w-full flex-wrap items-center gap-x-1 gap-y-1.5", children: e }), t.jsx("p", { className: "text-[11px] font-medium leading-snug text-ink dark:text-odp-fgStrong", children: r })] });
}
function nn() {
  return t.jsx("span", { className: "shrink-0 px-0.5 text-xs text-gray-400 dark:text-odp-muted", "aria-hidden": true, children: "/" });
}
function Au() {
  const e = wu(), r = yu();
  return t.jsxs("ul", { className: "flex flex-col gap-5", "aria-label": "\uD45C\uC9C0 \uD3B8\uC9D1 \uB2E8\uCD95\uD0A4", children: [t.jsx(Ue, { keys: t.jsx(br, { children: "\uB4DC\uB798\uADF8" }), children: "\uBE48 \uACF3\uC744 \uB4DC\uB798\uADF8\uD574 \uC601\uC5ED \uC120\uD0DD" }), t.jsx(Ue, { keys: t.jsx(He, { keys: [e, "G"] }), children: "\uC120\uD0DD\uD55C \uC694\uC18C \uADF8\uB8F9" }), t.jsx(Ue, { keys: t.jsx(He, { keys: [e, "Shift", "G"] }), children: "\uADF8\uB8F9 \uD574\uC81C" }), t.jsx(Ue, { keys: t.jsxs(t.Fragment, { children: [t.jsx(He, { keys: [r, "\uB4DC\uB798\uADF8"] }), t.jsx(nn, {}), t.jsx(He, { keys: [e, "\uB4DC\uB798\uADF8"] })] }), children: "\uBCF5\uC81C\uD558\uBA70 \uC774\uB3D9" }), t.jsx(Ue, { keys: t.jsx(He, { keys: ["Shift", "\uD074\uB9AD"] }), children: "\uB2E4\uC911 \uC120\uD0DD (Mod+\uD074\uB9AD\uACFC \uB3D9\uC77C)" }), t.jsx(Ue, { keys: t.jsx(He, { keys: ["Shift", "\uB4DC\uB798\uADF8"] }), children: "\uCD95 \uACE0\uC815 \uC774\uB3D9 \xB7 \uD06C\uAE30 \uC870\uC808 \uC2DC \uC911\uC2EC \uAE30\uC900" }), t.jsx(Ue, { keys: t.jsxs(t.Fragment, { children: [t.jsx(br, { children: "\u2191" }), t.jsx(br, { children: "\u2193" }), t.jsx(br, { children: "\u2190" }), t.jsx(br, { children: "\u2192" })] }), children: "\uC774\uB3D9 (\uAE30\uBCF8 10px)" }), t.jsx(Ue, { keys: t.jsx(He, { keys: [r, "\uD654\uC0B4\uD45C"] }), children: "\uBBF8\uC138 \uC774\uB3D9" }), t.jsx(Ue, { keys: t.jsxs(t.Fragment, { children: [t.jsx(He, { keys: ["Shift", "\uD654\uC0B4\uD45C"] }), t.jsx(nn, {}), t.jsx(He, { keys: [e, "\uD654\uC0B4\uD45C"] })] }), children: "\uD06C\uAC8C \uC774\uB3D9" }), t.jsx(Ue, { keys: t.jsx(He, { keys: [r, "L"] }), children: "\uD14D\uC2A4\uD2B8 \uC67C\uCABD \uC815\uB82C" }), t.jsx(Ue, { keys: t.jsxs(t.Fragment, { children: [t.jsx(He, { keys: [r, "M"] }), t.jsx(nn, {}), t.jsx(He, { keys: [r, "E"] })] }), children: "\uD14D\uC2A4\uD2B8 \uAC00\uC6B4\uB370 \uC815\uB82C" }), t.jsx(Ue, { keys: t.jsx(He, { keys: [r, "R"] }), children: "\uD14D\uC2A4\uD2B8 \uC624\uB978\uCABD \uC815\uB82C" }), t.jsx(Ue, { keys: t.jsx(He, { keys: [e, "Z"] }), children: "\uC2E4\uD589 \uCDE8\uC18C" }), t.jsx(Ue, { keys: t.jsxs(t.Fragment, { children: [t.jsx(He, { keys: [e, "Shift", "Z"] }), t.jsx(nn, {}), t.jsx(He, { keys: [e, "Y"] })] }), children: "\uB2E4\uC2DC \uC2E4\uD589" })] });
}
function he({ tip: e, children: r, className: n = "", disabled: s, onClick: i, pressed: o, type: a = "button" }) {
  return t.jsxs(zt, { children: [t.jsx(At, { asChild: true, children: t.jsx("button", { type: a, className: n, disabled: s, onClick: i, "aria-label": e, "aria-pressed": o, children: r }) }), t.jsx(It, { children: t.jsxs(Dt, { className: Ot, side: "top", sideOffset: 6, children: [e, t.jsx($t, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Mt({ title: e, open: r, onToggle: n, children: s, headerRight: i, icon: o, titleClassName: a, iconClassName: u }) {
  return t.jsxs("section", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [t.jsxs("div", { className: "flex items-center gap-1 px-2 py-1.5", children: [t.jsxs(zt, { children: [t.jsx(At, { asChild: true, children: t.jsxs("button", { type: "button", className: "flex min-w-0 flex-1 items-center gap-1.5 rounded px-1 py-1 text-left hover:bg-gray-100 dark:hover:bg-odp-focusBg", onClick: n, "aria-expanded": r, "aria-label": r ? `${e} \uC811\uAE30` : `${e} \uD3BC\uCE58\uAE30`, children: [o ? t.jsx(o, { size: 14, className: u ?? "shrink-0 text-gray-700 dark:text-odp-fgStrong", "aria-hidden": true }) : null, t.jsx("span", { className: a ?? "truncate text-[11px] font-semibold tracking-wide text-gray-800 dark:text-odp-fgStrong", children: e })] }) }), t.jsx(It, { children: t.jsxs(Dt, { className: Ot, side: "top", sideOffset: 6, children: [r ? `${e} \uC811\uAE30` : `${e} \uD3BC\uCE58\uAE30`, t.jsx($t, { className: "fill-white dark:fill-odp-surface" })] }) })] }), i, t.jsx(he, { tip: r ? `${e} \uC811\uAE30` : `${e} \uD3BC\uCE58\uAE30`, className: "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-gray-700 hover:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", onClick: n, children: t.jsx(mt, { size: 14, className: `transition-transform duration-200 ease-out ${r ? "rotate-0" : "-rotate-90"}`, "aria-hidden": true }) })] }), t.jsx("div", { className: `grid transition-[grid-template-rows,opacity] duration-200 ease-out ${r ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`, children: t.jsx("div", { className: "min-h-0 overflow-hidden", children: t.jsx("div", { className: "space-y-2 px-3 pb-3", "aria-hidden": !r, children: s }) }) })] });
}
function De(e, r, n) {
  return { ...e, elements: e.elements.map((s) => s.id !== r ? s : { ...s, ...n }) };
}
function Iu({ value: e, onChange: r }) {
  const n = [{ id: "left", icon: to, label: "\uC67C\uCABD \uC815\uB82C (Alt+L)" }, { id: "center", icon: ro, label: "\uAC00\uC6B4\uB370 \uC815\uB82C (Alt+M / Alt+E)" }, { id: "right", icon: no, label: "\uC624\uB978\uCABD \uC815\uB82C (Alt+R)" }];
  return t.jsx("div", { className: "flex gap-1", children: n.map(({ id: s, icon: i, label: o }) => t.jsx(he, { tip: o, className: `${Lt} flex-1 ${e === s ? pt : ""}`, pressed: e === s, onClick: () => r(s), children: t.jsx(i, { size: 14 }) }, s)) });
}
function Du({ textAlign: e, textVAlign: r, onTextAlignChange: n, onTextVAlignChange: s }) {
  return t.jsxs("div", { className: "grid grid-cols-3 gap-1", children: [t.jsx(he, { tip: "\uC67C\uCABD (Alt+L)", className: `${Ne} ${e === "left" ? pt : ""}`, pressed: e === "left", onClick: () => n("left"), children: t.jsx(jn, { size: 15 }) }), t.jsx(he, { tip: "\uAC00\uB85C \uAC00\uC6B4\uB370 (Alt+M / Alt+E)", className: `${Ne} ${e === "center" ? pt : ""}`, pressed: e === "center", onClick: () => n("center"), children: t.jsx(Sn, { size: 15 }) }), t.jsx(he, { tip: "\uC624\uB978\uCABD (Alt+R)", className: `${Ne} ${e === "right" ? pt : ""}`, pressed: e === "right", onClick: () => n("right"), children: t.jsx(Nn, { size: 15 }) }), t.jsx(he, { tip: "\uC704\uCABD", className: `${Ne} ${r === "top" ? pt : ""}`, pressed: r === "top", onClick: () => s("top"), children: t.jsx(Cn, { size: 15 }) }), t.jsx(he, { tip: "\uC138\uB85C \uAC00\uC6B4\uB370", className: `${Ne} ${r === "middle" ? pt : ""}`, pressed: r === "middle", onClick: () => s("middle"), children: t.jsx(En, { size: 15 }) }), t.jsx(he, { tip: "\uC544\uB798\uCABD", className: `${Ne} ${r === "bottom" ? pt : ""}`, pressed: r === "bottom", onClick: () => s("bottom"), children: t.jsx(Pn, { size: 15 }) })] });
}
function $u() {
  if (typeof window > "u") return false;
  try {
    return window.localStorage.getItem(zo) === "1";
  } catch {
    return false;
  }
}
function Ou(e) {
  if (!(typeof window > "u")) try {
    window.localStorage.setItem(zo, e ? "1" : "0");
  } catch {
  }
}
function _u({ cover: e, selectedIds: r, onSelectIds: n, onChange: s, currentFile: i = null, topPx: o = 0, width: a, isResizing: u = false, resizeHandleProps: c = {}, layersDetached: f, onLayersDetachedChange: b, layersWidth: x, layersIsResizing: p = false, layersResizeHandleProps: w = {}, centerSnapEnabled: y = true, onCenterSnapEnabledChange: g, centerSnapTolerance: k = Xi, onCenterSnapToleranceChange: N, objectSnapEnabled: L = false, onObjectSnapEnabledChange: C, objectSnapTolerance: E = Ui, onObjectSnapToleranceChange: _, textContainerOutlineEnabled: O = false, onTextContainerOutlineEnabledChange: z, placePreviewEnabled: G = true, onPlacePreviewEnabledChange: U, canUndo: R = false, canRedo: I = false, onUndo: se, onRedo: V, placeMode: ie = null, onPlaceModeChange: ke, className: de = "" }) {
  const $ = d.useRef(null), q = d.useRef(null), [T, H] = d.useState({}), [B, ue] = d.useState(zu), [re, Y] = d.useState(0), [ye, me] = d.useState(null), [ee, Ee] = d.useState(null), [Me, Ke] = d.useState(0), [Te, Qe] = d.useState(false), [Sr, Le] = d.useState(null), Z = d.useRef(false), xe = d.useRef(null), we = () => {
    xe.current != null && (window.clearTimeout(xe.current), xe.current = null);
  }, Ct = () => {
    we(), Z.current = false, Ke(0), Qe(false), Le(null);
  }, ze = () => {
    Z.current = true, Ke(0), we(), xe.current = window.setTimeout(() => {
      xe.current = null, Z.current = false, Ke(2);
    }, 220);
  };
  d.useEffect(() => () => we(), []), d.useEffect(() => {
    const l = () => Y((m) => m + 1);
    return window.addEventListener(pn, l), () => window.removeEventListener(pn, l);
  }, []);
  const et = d.useMemo(() => Ss(), [re]), X = r.length === 1 ? e.elements.find((l) => l.id === r[0]) ?? null : null, Ve = d.useMemo(() => {
    var _a2;
    if (r.length < 1) return null;
    if (r.length === 1) return ((_a2 = e.elements.find((P) => P.id === r[0])) == null ? void 0 : _a2.groupId) ?? null;
    const l = r.map((v) => {
      var _a3;
      return ((_a3 = e.elements.find((P) => P.id === v)) == null ? void 0 : _a3.groupId) ?? null;
    }), m = l[0];
    return !m || !l.every((v) => v === m) ? null : m;
  }, [e.elements, r]), ht = d.useMemo(() => {
    if (r.length < 1) return false;
    const l = Ye(e, r);
    return !(l.length === 1 && _e(e, l[0]));
  }, [e, r]), Et = !!Ve, tt = d.useMemo(() => go(e, r), [e, r]), Pe = tt.enabled, $e = tt.soleGroupId;
  d.useEffect(() => {
    ye != null && $e !== ye && me(null);
  }, [$e, ye]), d.useEffect(() => {
    ee != null && ($e || Ee(null));
  }, [$e, ee]);
  const Ie = (l) => {
    ue((m) => ({ ...m, [l]: !m[l] }));
  }, xt = () => {
    ke == null ? void 0 : ke((ie == null ? void 0 : ie.kind) === "text" ? null : { kind: "text" });
  }, gt = (l) => {
    if ((ie == null ? void 0 : ie.kind) === "shape" && ie.shapeType === l) {
      ke == null ? void 0 : ke(null);
      return;
    }
    ke == null ? void 0 : ke({ kind: "shape", shapeType: l });
  }, ir = (l) => {
    l && (ke == null ? void 0 : ke({ kind: "image", files: [l] }));
  }, or = async (l, m = false) => {
    if (l) try {
      const v = await jr(l, i);
      if (m && (X == null ? void 0 : X.type) === "image") {
        s(De(e, X.id, { path: v }));
        return;
      }
    } catch (v) {
      console.error(v), window.alert(v instanceof Error ? v.message : "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, ar = async (l) => {
    if (l) try {
      const m = await jr(l, i);
      s({ ...e, bg: { ...e.bg, imagePath: m } });
    } catch (m) {
      console.error(m), window.alert(m instanceof Error ? m.message : "\uBC30\uACBD \uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, lr = () => {
    const l = Rn(e, r);
    l && (s(l.cover), n(Ce(l.cover, l.groupId)));
  }, Pt = () => {
    const l = ks(e);
    s(l.cover);
  }, Nr = () => {
    Ve && s(Mn(e, Ve));
  }, Ge = (l, m) => {
    s(m === "layers" ? vn(e, l) : hs(e, l)), n([]);
  }, at = (l, m = "layers") => {
    if (!l.length) return;
    if (!dn(e, l)) {
      Ge(l, m);
      return;
    }
    Le({ ids: l, mode: m }), Qe(true), Ke(1);
  }, cr = () => {
    r.length && at(r, "elements");
  }, lt = () => {
    var _a2;
    const m = ((_a2 = document.querySelector('[data-cover-frame="1"]')) == null ? void 0 : _a2.getBoundingClientRect().height) ?? 0, v = Ac(e.elements, e.layout.gapPx, m);
    s({ ...e, elements: v });
  }, qe = (l) => {
    var _a2;
    if (!Pe) return;
    const m = _r(e, r);
    if (!m.length) return;
    const P = (_a2 = document.querySelector('[data-cover-frame="1"]')) == null ? void 0 : _a2.getBoundingClientRect(), M = l === "distributeX" ? (P == null ? void 0 : P.width) ?? 0 : (P == null ? void 0 : P.height) ?? 0, F = fs(e.layout.gapPx, M);
    if ($e) {
      if (ye === $e) {
        s(Dr(e, m, l, F, { insideGroupId: $e }));
        return;
      }
      Ee(l);
      return;
    }
    s(Dr(e, m, l, F));
  }, dr = () => {
    var _a2;
    if (!$e || !ee) {
      Ee(null);
      return;
    }
    const l = ee, m = _r(e, r);
    if (!m.length) {
      Ee(null);
      return;
    }
    const P = (_a2 = document.querySelector('[data-cover-frame="1"]')) == null ? void 0 : _a2.getBoundingClientRect(), M = l === "distributeX" ? (P == null ? void 0 : P.width) ?? 0 : (P == null ? void 0 : P.height) ?? 0, F = fs(e.layout.gapPx, M);
    me($e), Ee(null), s(Dr(e, m, l, F, { insideGroupId: $e }));
  }, Cr = t.jsx(Pu, { cover: e, selectedIds: r, onSelectIds: n, onChange: s, collapsedGroups: T, onCollapsedGroupsChange: H, onRequestDeleteLayers: (l) => at(l, "layers") }), Er = t.jsxs("div", { className: "space-y-1.5", children: [t.jsxs("div", { className: "grid grid-cols-2 gap-1.5", children: [t.jsxs(he, { tip: (ie == null ? void 0 : ie.kind) === "text" ? "\uD074\uB9AD \uC0BD\uC785 \uCDE8\uC18C (Esc)" : "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uCD94\uAC00 (T) \u2014 \uCE94\uBC84\uC2A4\uB97C \uD074\uB9AD\uD574 \uBC30\uCE58", className: `${Lt} ${(ie == null ? void 0 : ie.kind) === "text" ? `${pt} shadow-inner` : ""}`, pressed: (ie == null ? void 0 : ie.kind) === "text", onClick: xt, children: [t.jsx(an, { size: 14 }), "\uD14D\uC2A4\uD2B8"] }), t.jsxs(he, { tip: (ie == null ? void 0 : ie.kind) === "image" ? "\uD074\uB9AD \uC0BD\uC785 \uCDE8\uC18C (Esc)" : "\uC774\uBBF8\uC9C0 \uCD94\uAC00 \u2014 \uD30C\uC77C \uC120\uD0DD \uD6C4 \uCE94\uBC84\uC2A4\uB97C \uD074\uB9AD\uD574 \uBC30\uCE58", className: `${Lt} ${(ie == null ? void 0 : ie.kind) === "image" ? `${pt} shadow-inner` : ""}`, pressed: (ie == null ? void 0 : ie.kind) === "image", onClick: () => {
    if ((ie == null ? void 0 : ie.kind) === "image") {
      ke == null ? void 0 : ke(null);
      return;
    }
    $.current && ($.current.dataset.coverImageMode = "place", $.current.click());
  }, children: [t.jsx(Yn, { size: 14 }), "\uC774\uBBF8\uC9C0"] })] }), t.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: [{ type: "rect", tip: "\uC0AC\uAC01\uD615", shortcut: "M", Icon: ln }, { type: "ellipse", tip: "\uD0C0\uC6D0", shortcut: "O", Icon: oc }, { type: "roundRect", tip: "\uB465\uADFC \uC0AC\uAC01\uD615", shortcut: null, Icon: ac }].map(({ type: l, tip: m, shortcut: v, Icon: P }) => {
    const M = (ie == null ? void 0 : ie.kind) === "shape" && ie.shapeType === l, F = M ? "\uD074\uB9AD \uC0BD\uC785 \uCDE8\uC18C (Esc)" : v ? `${m} \uCD94\uAC00 (${v}) \u2014 \uCE94\uBC84\uC2A4\uB97C \uD074\uB9AD\uD574 \uBC30\uCE58` : `${m} \uCD94\uAC00 \u2014 \uCE94\uBC84\uC2A4\uB97C \uD074\uB9AD\uD574 \uBC30\uCE58`;
    return t.jsxs(he, { tip: F, className: `${Lt} ${M ? `${pt} shadow-inner` : ""}`, pressed: M, onClick: () => gt(l), children: [t.jsx(P, { size: 14 }), t.jsx("span", { className: "truncate", children: m })] }, l);
  }) })] }), Xe = t.jsxs("div", { className: "rounded-md border border-gray-200 bg-gray-50 p-1.5 dark:border-odp-borderStrong dark:bg-odp-bg/60", children: [t.jsx("div", { className: "mb-1 px-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-400", children: "\uB808\uC774\uC5B4 \uC561\uC158" }), t.jsxs("div", { className: "flex flex-wrap gap-1", children: [t.jsx(he, { tip: "\uC0C8 \uADF8\uB8F9", className: Ne, onClick: Pt, children: t.jsx(io, { size: 15 }) }), t.jsx(he, { tip: "\uADF8\uB8F9 (Mod+G)", className: Ne, disabled: !ht, onClick: lr, children: t.jsx(Ps, { size: 15 }) }), t.jsx(he, { tip: "\uADF8\uB8F9 \uD574\uC81C (Mod+Shift+G)", className: Ne, disabled: !Et, onClick: Nr, children: t.jsx(Es, { size: 15 }) }), t.jsx(he, { tip: "\uB9E8 \uC55E\uC73C\uB85C", className: Ne, disabled: !r.length, onClick: () => s(Ms(e, r)), children: t.jsx(Ts, { size: 15 }) }), t.jsx(he, { tip: "\uB9E8 \uB4A4\uB85C", className: Ne, disabled: !r.length, onClick: () => s(Ls(e, r)), children: t.jsx(Rs, { size: 15 }) }), t.jsx(he, { tip: "\uC138\uB85C \uC815\uB9AC (gap \uC801\uC6A9)", className: Ne, disabled: e.elements.length === 0, onClick: lt, children: t.jsx(Vn, { size: 15 }) }), t.jsx(he, { tip: "\uC120\uD0DD \uC0AD\uC81C", className: Ne, disabled: !r.length, onClick: cr, children: t.jsx(kn, { size: 15 }) })] })] }), bt = t.jsxs("div", { className: "rounded-md border border-gray-200 bg-gray-50 p-1.5 dark:border-odp-borderStrong dark:bg-odp-bg/60", children: [t.jsx("div", { className: "mb-1 px-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-400", children: "\uAC1C\uCCB4 \uC815\uB82C" }), t.jsxs("div", { className: "mb-1.5 grid grid-cols-4 gap-1", children: [t.jsx(he, { tip: "\uC67C\uCABD \uC815\uB82C", className: Ne, disabled: !Pe, onClick: () => qe("left"), children: t.jsx(jn, { size: 15 }) }), t.jsx(he, { tip: "\uAC00\uB85C \uAC00\uC6B4\uB370", className: Ne, disabled: !Pe, onClick: () => qe("centerX"), children: t.jsx(Sn, { size: 15 }) }), t.jsx(he, { tip: "\uC624\uB978\uCABD \uC815\uB82C", className: Ne, disabled: !Pe, onClick: () => qe("right"), children: t.jsx(Nn, { size: 15 }) }), t.jsx(he, { tip: "\uAC00\uB85C \uAC04\uACA9 \uBD84\uBC30", className: Ne, disabled: !Pe, onClick: () => qe("distributeX"), children: t.jsx(Qi, { size: 15 }) }), t.jsx(he, { tip: "\uC704\uCABD \uC815\uB82C", className: Ne, disabled: !Pe, onClick: () => qe("top"), children: t.jsx(Cn, { size: 15 }) }), t.jsx(he, { tip: "\uC138\uB85C \uAC00\uC6B4\uB370", className: Ne, disabled: !Pe, onClick: () => qe("centerY"), children: t.jsx(En, { size: 15 }) }), t.jsx(he, { tip: "\uC544\uB798\uCABD \uC815\uB82C", className: Ne, disabled: !Pe, onClick: () => qe("bottom"), children: t.jsx(Pn, { size: 15 }) }), t.jsx(he, { tip: "\uC138\uB85C \uAC04\uACA9 \uBD84\uBC30", className: Ne, disabled: !Pe, onClick: () => qe("distributeY"), children: t.jsx(eo, { size: 15 }) })] }), t.jsxs("label", { className: "block space-y-1 px-0.5", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "Gap" }), t.jsx(kt, { unit: "css", suffix: "px", min: 0, max: 200, step: 1, value: e.layout.gapPx, "aria-label": "\uAC1C\uCCB4 \uC815\uB82C Gap", onChange: (l) => s(zc(e, { gapPx: l })) }), t.jsx("span", { className: "block text-[10px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC138\uB85C \uC815\uB9AC \uC2DC \uAC1C\uCCB4 \uC0AC\uC774 \uAC04\uACA9, \uAC00\uB85C\xB7\uC138\uB85C \uAC04\uACA9 \uBD84\uBC30\uC5D0\uC11C \uAC1C\uCCB4\uAC00 2\uAC1C\uC77C \uB54C \uC0AC\uC774\uC758 \uAC04\uACA9\uC73C\uB85C \uC4F0\uC785\uB2C8\uB2E4." })] })] }), Be = t.jsxs("div", { className: "space-y-2", children: [Er, Cr, Xe, bt] }), rt = t.jsx("input", { ref: $, type: "file", accept: "image/*", className: "hidden", "data-cover-image-mode": "add", onChange: (l) => {
    var _a2;
    const m = l.currentTarget.dataset.coverImageMode || "add", v = (_a2 = l.target.files) == null ? void 0 : _a2[0];
    if (l.currentTarget.dataset.coverImageMode = "add", l.target.value = "", m === "place") {
      ir(v);
      return;
    }
    or(v, m === "replace");
  } });
  return t.jsx(Nc, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs(t.Fragment, { children: [t.jsxs("aside", { className: `fixed bottom-0 z-30 flex border-r border-gray-200 bg-white/95 backdrop-blur-sm print:hidden dark:border-odp-borderSoft dark:bg-odp-bgSoft/95 ${de}`, style: { top: o, left: 0, width: a }, "aria-label": "\uD45C\uC9C0 \uC124\uC815", children: [t.jsxs("div", { className: "relative flex min-h-0 w-full flex-col overflow-y-auto pb-16", children: [rt, t.jsxs("div", { className: "sticky top-0 z-10 flex items-center gap-2 border-b border-gray-200 bg-white/95 px-3 py-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft/95", children: [t.jsx("div", { className: "flex-1 text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-odp-fgStrong", children: "\uD45C\uC9C0" }), t.jsx(he, { tip: "\uC2E4\uD589 \uCDE8\uC18C (Mod+Z)", className: Ne, disabled: !R, onClick: () => se == null ? void 0 : se(), children: t.jsx(lc, { size: 15 }) }), t.jsx(he, { tip: "\uB2E4\uC2DC \uC2E4\uD589 (Mod+Shift+Z / Mod+Y)", className: Ne, disabled: !I, onClick: () => V == null ? void 0 : V(), children: t.jsx(cc, { size: 15 }) })] }), t.jsx(Mt, { title: "\uC124\uC815", icon: dc, open: B.settings, onToggle: () => Ie("settings"), children: t.jsxs("div", { className: "space-y-2 rounded-md border border-gray-200 bg-gray-50 p-2.5 dark:border-odp-borderStrong dark:bg-odp-bg/50", children: [t.jsxs("div", { className: "flex items-center justify-between gap-2", children: [t.jsx("span", { className: Ar, children: "\uD45C\uC9C0 \uC0AC\uC6A9" }), t.jsxs(zt, { children: [t.jsx(At, { asChild: true, children: t.jsx(tr, { className: xr(e.enabled), checked: e.enabled, onCheckedChange: (l) => s({ ...e, enabled: l }), "aria-label": "\uD45C\uC9C0 \uC0AC\uC6A9", children: t.jsx(rr, { className: gr }) }) }), t.jsx(It, { children: t.jsxs(Dt, { className: Ot, side: "top", sideOffset: 6, children: ["\uD45C\uC9C0 \uC0AC\uC6A9", t.jsx($t, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }), t.jsxs("div", { className: "space-y-1.5", children: [t.jsxs("div", { className: "flex items-center justify-between gap-2", children: [t.jsx("span", { className: Ar, children: "\uAC00\uC6B4\uB370 \uC2A4\uB0C5" }), t.jsxs(zt, { children: [t.jsx(At, { asChild: true, children: t.jsx(tr, { className: xr(y), checked: y, onCheckedChange: (l) => g == null ? void 0 : g(l), "aria-label": "\uAC00\uB85C\xB7\uC138\uB85C \uAC00\uC6B4\uB370 \uC2A4\uB0C5", children: t.jsx(rr, { className: gr }) }) }), t.jsx(It, { children: t.jsxs(Dt, { className: Ot, side: "top", sideOffset: 6, children: ["\uAC00\uB85C\xB7\uC138\uB85C \uAC00\uC6B4\uB370 \uC2A4\uB0C5", t.jsx($t, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD5C8\uC6A9 \uC624\uCC28" }), t.jsx(kt, { unit: "css", suffix: "px", min: 0.1, max: 100, step: 0.1, value: k, disabled: !N, "aria-label": "\uAC00\uC6B4\uB370 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28", onChange: (l) => N == null ? void 0 : N(l) })] })] }), t.jsxs("div", { className: "space-y-1.5", children: [t.jsxs("div", { className: "flex items-center justify-between gap-2", children: [t.jsx("span", { className: Ar, children: "\uAC1C\uCCB4 \uC2A4\uB0C5" }), t.jsxs(zt, { children: [t.jsx(At, { asChild: true, children: t.jsx(tr, { className: xr(L), checked: L, onCheckedChange: (l) => C == null ? void 0 : C(l), "aria-label": "\uAC1C\uCCB4 \uD14C\uB450\uB9AC\xB7\uAC00\uC6B4\uB370\uC120 \uC2A4\uB0C5", children: t.jsx(rr, { className: gr }) }) }), t.jsx(It, { children: t.jsxs(Dt, { className: Ot, side: "top", sideOffset: 6, children: ["\uB2E4\uB978 \uAC1C\uCCB4\uC758 \uD14C\uB450\uB9AC\xB7\uAC00\uC6B4\uB370\uC120\uC5D0 \uB9DE\uCDA4 (Shift+Tab \uD1A0\uAE00 \xB7 \uADF8\uB8F9\uC740 \uD1B5\uC9F8\uB85C, \uADF8\uB8F9 \uC548\uC5D0\uC11C\uB294 sibling\uACFC\uB3C4)", t.jsx($t, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD5C8\uC6A9 \uC624\uCC28" }), t.jsx(kt, { unit: "css", suffix: "px", min: 0.1, max: 100, step: 0.1, value: E, disabled: !_, "aria-label": "\uAC1C\uCCB4 \uC2A4\uB0C5 \uD5C8\uC6A9 \uC624\uCC28", onChange: (l) => _ == null ? void 0 : _(l) })] })] }), t.jsxs("div", { className: "flex items-center justify-between gap-2", children: [t.jsx("span", { className: Ar, children: "\uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD45C\uC2DC" }), t.jsxs(zt, { children: [t.jsx(At, { asChild: true, children: t.jsx(tr, { className: xr(O), checked: O, onCheckedChange: (l) => z == null ? void 0 : z(l), "aria-label": "\uBAA8\uB4E0 \uD14D\uC2A4\uD2B8 \uC0C1\uC790 \uD14C\uB450\uB9AC \uD45C\uC2DC", children: t.jsx(rr, { className: gr }) }) }), t.jsx(It, { children: t.jsxs(Dt, { className: Ot, side: "top", sideOffset: 6, children: ["\uC120\uD0DD\uACFC \uBB34\uAD00\uD558\uAC8C \uBAA8\uB4E0 \uD14D\uC2A4\uD2B8 \uC0C1\uC790\uB97C \uC605\uC740 \uBD89\uC740 \uC2E4\uC120\uC73C\uB85C \uD45C\uC2DC", t.jsx($t, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }), t.jsxs("div", { className: "flex items-center justify-between gap-2", children: [t.jsx("span", { className: Ar, children: "\uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30" }), t.jsxs(zt, { children: [t.jsx(At, { asChild: true, children: t.jsx(tr, { className: xr(G), checked: G, onCheckedChange: (l) => U == null ? void 0 : U(l), "aria-label": "\uD074\uB9AD \uC0BD\uC785 \uBBF8\uB9AC\uBCF4\uAE30", children: t.jsx(rr, { className: gr }) }) }), t.jsx(It, { children: t.jsxs(Dt, { className: Ot, side: "top", sideOffset: 6, children: ["\uD14D\uC2A4\uD2B8\xB7\uC774\uBBF8\uC9C0\xB7\uB3C4\uD615 \uD074\uB9AD \uC0BD\uC785 \uC2DC \uCEE4\uC11C \uC704\uCE58\uC5D0 \uBC18\uD22C\uBA85 \uBBF8\uB9AC\uBCF4\uAE30 \uD45C\uC2DC", t.jsx($t, { className: "fill-white dark:fill-odp-surface" })] }) })] })] })] }) }), !f && t.jsx(Mt, { title: "\uB808\uC774\uC5B4", icon: Vn, open: B.layers, onToggle: () => Ie("layers"), headerRight: t.jsx(he, { tip: "\uB808\uC774\uC5B4\uB97C \uBCC4\uB3C4 \uC0AC\uC774\uB4DC\uBC14\uB85C \uBD84\uB9AC", className: Ne, onClick: () => b(true), children: t.jsx(uc, { size: 15 }) }), children: Be }), t.jsxs(Mt, { title: "\uBC30\uACBD", icon: so, open: B.background, onToggle: () => Ie("background"), children: [t.jsx(jt, { value: e.bg.color, onChange: (l) => s({ ...e, bg: { ...e.bg, color: l || "#ffffff" } }), allowNone: false, label: "\uC0C9", compact: true }), t.jsxs("div", { className: "mt-2 flex gap-1.5", children: [t.jsx(he, { tip: "\uBC30\uACBD \uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC", className: `${Lt} flex-1`, onClick: () => {
    var _a2;
    return (_a2 = q.current) == null ? void 0 : _a2.click();
  }, children: "\uBC30\uACBD \uC774\uBBF8\uC9C0" }), t.jsx(he, { tip: "\uBC30\uACBD \uC774\uBBF8\uC9C0 \uC81C\uAC70", className: Lt, disabled: !e.bg.imagePath, onClick: () => s({ ...e, bg: { ...e.bg, imagePath: "" } }), children: "\uC81C\uAC70" })] }), e.bg.imagePath ? t.jsx("p", { className: "truncate text-[10px] text-gray-400", title: e.bg.imagePath, children: e.bg.imagePath }) : null, t.jsx("input", { ref: q, type: "file", accept: "image/*", className: "hidden", onChange: (l) => {
    var _a2;
    ar((_a2 = l.target.files) == null ? void 0 : _a2[0]), l.target.value = "";
  } })] }), (X == null ? void 0 : X.type) === "text" ? t.jsxs(Mt, { title: "\uC120\uD0DD \xB7 \uD14D\uC2A4\uD2B8", icon: an, open: B.selection, onToggle: () => Ie("selection"), children: [t.jsxs("div", { className: "flex flex-col gap-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAE00\uC790 \uD06C\uAE30" }), t.jsx(xn, { min: 6, max: 400, step: 1, suffix: "px", value: X.fontSize, resetValue: 36, "aria-label": "\uAE00\uC790 \uD06C\uAE30", decreaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uC904\uC774\uAE30", increaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uD0A4\uC6B0\uAE30", onChange: (l) => s(De(e, X.id, { fontSize: l })) })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD3F0\uD2B8 (font-family)" }), t.jsx(wr, { id: "cover-text-font-family", value: X.fontFamily || "", onChange: (l) => {
    const m = l.trim();
    s({ ...e, elements: e.elements.map((v) => {
      if (v.id !== X.id || v.type !== "text") return v;
      const P = { ...v };
      return m ? P.fontFamily = m : delete P.fontFamily, P;
    }) });
  }, options: et, placeholder: "\uC608: Paperozi, sans-serif", inputClassName: "!px-2 !py-1 !text-xs" }), t.jsx("p", { className: "text-[10px] leading-snug text-gray-400 dark:text-odp-fgMuted", children: "\uC6F9\uD3F0\uD2B8\uB294 \uC124\uC815 \u2192 \uC6F9\uD3F0\uD2B8(CSS)\uC5D0\uC11C \uCD94\uAC00\uD569\uB2C8\uB2E4." })] }), t.jsxs("div", { className: "space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAD75\uAE30 (font-weight)" }), t.jsxs(Ft, { value: cs(X.fontWeight), onValueChange: (l) => s(De(e, X.id, { fontWeight: ls(l) })), children: [t.jsxs(Bt, { "aria-label": "\uD3F0\uD2B8 \uAD75\uAE30", className: "inline-flex h-8 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg", children: [t.jsx(Ht, {}), t.jsx(Wt, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Kt, { children: t.jsx(Gt, { className: "z-[10050] max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: as.map((l) => t.jsxs(Ut, { value: l.value, className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(St, { size: 12 }) }), t.jsx(Vt, { children: l.label })] }, l.value)) }) }) })] })] }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 text-[10px] text-gray-400", children: "\uD14D\uC2A4\uD2B8 \uC815\uB82C" }), t.jsx(Iu, { value: X.textAlign, onChange: (l) => s(De(e, X.id, { textAlign: l })) })] }), t.jsx(jt, { value: X.color, onChange: (l) => s(De(e, X.id, { color: l || "#111111" })), allowNone: false, label: "\uAE00\uC790\uC0C9", compact: true })] }) : null, (X == null ? void 0 : X.type) === "image" ? t.jsxs(Mt, { title: "\uC120\uD0DD \xB7 \uC774\uBBF8\uC9C0", icon: Yn, open: B.selection, onToggle: () => Ie("selection"), children: [t.jsx("p", { className: "truncate text-[10px] text-gray-400", title: X.path, children: X.path }), t.jsxs("div", { className: "flex items-center justify-between gap-2 py-1", children: [t.jsxs("div", { children: [t.jsx("div", { className: "text-[11px] text-gray-600 dark:text-odp-fg", children: "\uBB34\uC870\uAC74 \uBE44\uC728 \uC720\uC9C0" }), t.jsx("p", { className: "text-[10px] text-gray-400", children: "\uCF1C\uBA74 \uB9AC\uC0AC\uC774\uC988 \uC2DC \uCC0C\uADF8\uB7EC\uC9C0\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." })] }), t.jsxs(zt, { children: [t.jsx(At, { asChild: true, children: t.jsx(tr, { className: xr(!!X.lockAspect), checked: !!X.lockAspect, onCheckedChange: (l) => {
    s({ ...e, elements: e.elements.map((m) => {
      if (m.id !== X.id || m.type !== "image") return m;
      const v = { ...m };
      return l ? v.lockAspect = true : delete v.lockAspect, v;
    }) });
  }, "aria-label": "\uBB34\uC870\uAC74 \uBE44\uC728 \uC720\uC9C0", children: t.jsx(rr, { className: gr }) }) }), t.jsx(It, { children: t.jsxs(Dt, { className: Ot, side: "top", sideOffset: 6, children: ["\uBB34\uC870\uAC74 \uBE44\uC728 \uC720\uC9C0", t.jsx($t, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }), t.jsx(he, { tip: "\uC6D0\uBCF8 \uBE44\uC728\uB85C \uB418\uB3CC\uB9AC\uAE30", className: `${Lt} w-full`, disabled: !X.naturalAspect, onClick: () => {
    if (!X.naturalAspect) return;
    const l = X.naturalAspect, m = X.x + X.w / 2, v = X.y + X.h / 2, F = X.w * 210 / (297 * l);
    let D = m - X.w / 2, ae = v - F / 2;
    D = Math.min(Math.max(0, D), 100 - X.w), ae = Math.min(Math.max(0, ae), 100 - F), s(De(e, X.id, { x: D, y: ae, h: Math.min(100, Math.max(4, F)) }));
  }, children: "\uC6D0\uBCF8 \uBE44\uC728\uB85C \uB418\uB3CC\uB9AC\uAE30" }), t.jsx(he, { tip: "\uC774\uBBF8\uC9C0 \uAD50\uCCB4", className: `${Lt} w-full`, onClick: () => {
    $.current && ($.current.dataset.coverImageMode = "replace", $.current.click());
  }, children: "\uC774\uBBF8\uC9C0 \uAD50\uCCB4" })] }) : null, X && kr(X) ? t.jsxs(Mt, { title: "\uC120\uD0DD \xB7 \uB3C4\uD615", icon: ln, open: B.selection, onToggle: () => Ie("selection"), children: [t.jsx(jt, { value: X.fill, onChange: (l) => s(De(e, X.id, { fill: l || "transparent" })), allowNone: true, label: "\uCC44\uC6B0\uAE30", compact: true }), t.jsx(jt, { value: X.borderColor, onChange: (l) => s(De(e, X.id, { borderColor: l || "transparent" })), allowNone: true, label: "\uD14C\uB450\uB9AC \uC0C9", compact: true }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD14C\uB450\uB9AC \uB450\uAED8" }), t.jsx(kt, { unit: "css", suffix: "px", min: 0, max: 40, step: 1, value: X.borderWidth, "aria-label": "\uD14C\uB450\uB9AC \uB450\uAED8", onChange: (l) => s(De(e, X.id, { borderWidth: l })) })] }), t.jsxs("div", { className: "space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uD14C\uB450\uB9AC \uC2A4\uD0C0\uC77C" }), t.jsxs(Ft, { value: X.borderStyle, onValueChange: (l) => {
    l !== "solid" && l !== "dashed" && l !== "dotted" || s(De(e, X.id, { borderStyle: l }));
  }, children: [t.jsxs(Bt, { "aria-label": "\uD14C\uB450\uB9AC \uC2A4\uD0C0\uC77C", className: "inline-flex h-8 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg", children: [t.jsx(Ht, {}), t.jsx(Wt, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Kt, { children: t.jsx(Gt, { className: "z-[10050] max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: [{ value: "solid", label: "\uC2E4\uC120" }, { value: "dashed", label: "\uD30C\uC120" }, { value: "dotted", label: "\uC810\uC120" }].map((l) => t.jsxs(Ut, { value: l.value, className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(St, { size: 12 }) }), t.jsx(Vt, { children: l.label })] }, l.value)) }) }) })] })] }), X.type === "roundRect" ? t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uBAA8\uC11C\uB9AC \uB465\uAE00\uAE30" }), t.jsx(kt, { unit: "percent", suffix: "%", min: 0, max: 50, step: 1, value: X.cornerRadiusPct ?? 4, "aria-label": "\uBAA8\uC11C\uB9AC \uB465\uAE00\uAE30", onChange: (l) => s(De(e, X.id, { cornerRadiusPct: l })) })] }) : null, t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uB3C4\uD615 \uC548 \uD14D\uC2A4\uD2B8" }), t.jsx("textarea", { className: "min-h-16 w-full resize-y rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg", value: X.text ?? "", placeholder: "\uC120\uD0DD \uC0AC\uD56D", onChange: (l) => s(De(e, X.id, { text: l.target.value })) })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uC548\uCABD \uC5EC\uBC31" }), t.jsx(kt, { unit: "percent", suffix: "%", min: 0, max: 40, step: 1, value: X.paddingPct ?? 0, "aria-label": "\uB3C4\uD615 \uC548\uCABD \uC5EC\uBC31", onChange: (l) => s(De(e, X.id, { paddingPct: l })) })] }), t.jsxs("div", { className: "flex flex-col gap-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAE00\uC790 \uD06C\uAE30" }), t.jsx(xn, { min: 6, max: 400, step: 1, suffix: "px", value: X.fontSize ?? 24, resetValue: 24, "aria-label": "\uB3C4\uD615 \uAE00\uC790 \uD06C\uAE30", decreaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uC904\uC774\uAE30", increaseLabel: "\uAE00\uC790 \uD06C\uAE30 \uD0A4\uC6B0\uAE30", onChange: (l) => s(De(e, X.id, { fontSize: l })) })] }), t.jsxs("div", { className: "space-y-1", children: [t.jsx("span", { className: "text-[10px] text-gray-400", children: "\uAD75\uAE30 (font-weight)" }), t.jsxs(Ft, { value: cs(X.fontWeight ?? "normal"), onValueChange: (l) => s(De(e, X.id, { fontWeight: ls(l) })), children: [t.jsxs(Bt, { "aria-label": "\uB3C4\uD615 \uAE00\uC790 \uAD75\uAE30", className: "inline-flex h-8 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg", children: [t.jsx(Ht, {}), t.jsx(Wt, { className: "text-gray-500", children: t.jsx(mt, { size: 14 }) })] }), t.jsx(Kt, { children: t.jsx(Gt, { className: "z-[10050] max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: t.jsx(Xt, { className: "p-1", children: as.map((l) => t.jsxs(Ut, { value: l.value, className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [t.jsx(Yt, { className: "absolute left-1.5 inline-flex items-center", children: t.jsx(St, { size: 12 }) }), t.jsx(Vt, { children: l.label })] }, l.value)) }) }) })] })] }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 text-[10px] text-gray-400", children: "\uD14D\uC2A4\uD2B8 \uC704\uCE58" }), t.jsx(Du, { textAlign: X.textAlign ?? "center", textVAlign: X.textVAlign ?? "middle", onTextAlignChange: (l) => s(De(e, X.id, { textAlign: l })), onTextVAlignChange: (l) => s(De(e, X.id, { textVAlign: l })) })] }), t.jsx(jt, { value: X.color ?? "#0c4a6e", onChange: (l) => s(De(e, X.id, { color: l || "#0c4a6e" })), allowNone: false, label: "\uAE00\uC790\uC0C9", compact: true })] }) : null, r.length > 1 ? t.jsxs(Mt, { title: `\uC120\uD0DD \xB7 ${r.length}\uAC1C`, icon: fc, open: B.selection, onToggle: () => Ie("selection"), children: [t.jsx("p", { className: "text-[10px] text-gray-400", children: "\uB4DC\uB798\uADF8\uD558\uBA74 \uD568\uAED8 \uC774\uB3D9\uD569\uB2C8\uB2E4. Mod+G\uB85C \uADF8\uB8F9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uCCB4\uD06C\uB97C \uD574\uC81C\uD558\uBA74 \uC120\uD0DD\uC5D0\uC11C \uBE60\uC9D1\uB2C8\uB2E4." }), t.jsx("ul", { className: "mt-2 max-h-52 space-y-0.5 overflow-y-auto rounded-md border border-gray-200 p-1 dark:border-odp-borderStrong", children: r.map((l) => {
    const m = e.elements.find((P) => P.id === l);
    if (!m) return null;
    const v = Br(m);
    return t.jsx("li", { children: t.jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded px-1.5 py-1 hover:bg-gray-50 dark:hover:bg-odp-focusBg", children: [t.jsx(Cc, { className: "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border border-gray-400 bg-white outline-none focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-500", checked: true, onCheckedChange: (P) => {
      P !== true && n(r.filter((M) => M !== l));
    }, "aria-label": `${v} \uC120\uD0DD \uD574\uC81C`, children: t.jsx(Ec, { className: "text-white", children: t.jsx(St, { size: 10, strokeWidth: 3 }) }) }), m.type === "text" ? t.jsx(an, { size: 12, className: "shrink-0 text-gray-400", "aria-hidden": true }) : kr(m) ? t.jsx(ln, { size: 12, className: "shrink-0 text-gray-400", "aria-hidden": true }) : t.jsx(Yn, { size: 12, className: "shrink-0 text-gray-400", "aria-hidden": true }), t.jsx("span", { className: "min-w-0 flex-1 truncate text-[11px] text-gray-700 dark:text-odp-fg", children: v })] }) }, l);
  }) })] }) : null, t.jsx(Mt, { title: "\uB2E8\uCD95\uD0A4", icon: pc, open: B.shortcuts, onToggle: () => Ie("shortcuts"), titleClassName: "truncate text-[11px] font-semibold tracking-wide text-ink dark:text-odp-fgStrong", iconClassName: "shrink-0 text-ink dark:text-odp-fgStrong", children: t.jsx(Au, {}) })] }), t.jsx(Ni, { edge: "right", handleProps: c, isResizing: u, visibleOnHover: true, label: "\uD45C\uC9C0 \uC0AC\uC774\uB4DC\uBC14 \uB108\uBE44 \uC870\uC808" })] }), f ? t.jsxs("aside", { className: "fixed bottom-0 z-30 flex border-r border-gray-200 bg-white/95 backdrop-blur-sm print:hidden dark:border-odp-borderSoft dark:bg-odp-bgSoft/95", style: { top: o, left: a, width: x }, "aria-label": "\uD45C\uC9C0 \uB808\uC774\uC5B4", children: [t.jsxs("div", { className: "relative flex min-h-0 w-full flex-col overflow-y-auto pb-16", children: [t.jsxs("div", { className: "sticky top-0 z-10 flex items-center gap-2 border-b border-gray-200 bg-white/95 px-3 py-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft/95", children: [t.jsxs("div", { className: "flex gap-1.5 items-center flex-1 text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-odp-fgStrong", children: [t.jsx(Vn, { size: 14, className: "shrink-0 text-gray-700 dark:text-odp-fgStrong", "aria-hidden": true }), "\uB808\uC774\uC5B4"] }), t.jsx(he, { tip: "\uBA54\uC778 \uC0AC\uC774\uB4DC\uBC14\uB85C \uD569\uCE58\uAE30", className: Ne, onClick: () => b(false), children: t.jsx(mc, { size: 15 }) })] }), t.jsx("div", { className: "space-y-2 px-3 py-3", children: Be })] }), t.jsx(Ni, { edge: "right", handleProps: w, isResizing: p, visibleOnHover: true, label: "\uB808\uC774\uC5B4 \uC0AC\uC774\uB4DC\uBC14 \uB108\uBE44 \uC870\uC808" })] }) : null, t.jsx(vr, { isOpen: ee != null, title: "\uADF8\uB8F9 \uB0B4\uBD80 \uC815\uB82C", message: "\uC120\uD0DD\uD55C \uADF8\uB8F9 \uC548\uC758 \uAC1C\uCCB4\uB97C \uC815\uB82C\uD560\uAE4C\uC694?", confirmLabel: "\uC815\uB82C", cancelLabel: "\uCDE8\uC18C", onConfirm: dr, onCancel: () => Ee(null) }), t.jsx(vr, { isOpen: Me > 0, title: Me === 2 ? "\uC7A0\uAE34 \uAC1C\uCCB4 \uC0AD\uC81C" : "\uAC1C\uCCB4 \uC0AD\uC81C", message: Me === 2 ? "\uC7A0\uAE34 \uAC1C\uCCB4\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uC815\uB9D0 \uC0AD\uC81C\uD560\uAE4C\uC694?" : "\uC120\uD0DD\uD55C \uAC1C\uCCB4\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694?", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", variant: "danger", onConfirm: () => {
    if (Te && Me === 1) {
      ze();
      return;
    }
    const l = Sr;
    Ct(), (l == null ? void 0 : l.ids.length) && Ge(l.ids, l.mode);
  }, onCancel: Ct }, `cover-sidebar-delete-${Me}`)] }) });
}
const Ao = new tl("s3haim-cover-undo-history");
Ao.version(1).stores({ histories: "key, updatedAt" });
const bn = Ao.histories, Ci = 80, Fu = 1440 * 60 * 1e3, Bu = 400;
function Hu(e, r) {
  return `cover:${on(e, r)}`;
}
function Wu(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Hu(e.type, e.id);
}
function Ei(e) {
  return JSON.stringify(e);
}
function Pi(e) {
  try {
    const r = JSON.parse(e);
    return !r || typeof r != "object" || !Array.isArray(r.elements) ? null : r;
  } catch {
    return null;
  }
}
function Io(e) {
  return !Array.isArray(e) || e.length === 0 ? [] : e.length <= Ci ? e : e.slice(e.length - Ci);
}
async function Ku(e) {
  if (!e) return null;
  const r = await bn.get(e);
  return r ? typeof r.updatedAt == "number" && Date.now() - r.updatedAt > Fu ? (await bn.delete(e), null) : !Array.isArray(r.stack) || r.stack.length === 0 ? null : r : null;
}
async function Gu({ key: e, stack: r, index: n }) {
  if (!e) return;
  const s = Io(r), i = Math.max(0, Math.min(n ?? s.length - 1, s.length - 1));
  await bn.put({ key: e, stack: s, index: i, updatedAt: Date.now() });
}
async function Xu(e) {
  e && await bn.delete(e);
}
function Ti(e, r, n) {
  const s = Array.isArray(e) && e.length > 0 ? e : [];
  if (s.length === 0) return { stack: [n], index: 0, changed: true };
  const i = Math.max(0, Math.min(r, s.length - 1));
  if (s[i] === n) return { stack: s, index: i, changed: false };
  const o = s.slice(0, i + 1);
  o.push(n);
  const a = Io(o);
  return { stack: a, index: a.length - 1, changed: true };
}
function Uu({ currentFile: e = null, enabled: r, cover: n, applyCover: s }) {
  const i = r ? Wu(e) : null, o = d.useRef([]), a = d.useRef(0), u = d.useRef(false), c = d.useRef(null), f = d.useRef(null), b = d.useRef(null), x = d.useRef(null), p = d.useRef(s);
  p.current = s;
  const [w, y] = d.useState(0), g = d.useCallback(() => y((z) => z + 1), []), k = d.useCallback((z, G, U) => {
    f.current && clearTimeout(f.current), f.current = setTimeout(() => {
      f.current = null, Gu({ key: z, stack: G, index: U }).catch((R) => {
        console.warn("[cover-undo] save failed:", R);
      });
    }, 250);
  }, []), N = d.useCallback(() => {
    c.current && (clearTimeout(c.current), c.current = null);
    const z = x.current, G = b.current;
    if (!z || G == null) return;
    b.current = null;
    const U = Ti(o.current, a.current, G);
    U.changed && (o.current = U.stack, a.current = U.index, k(z, U.stack, U.index), g());
  }, [g, k]);
  d.useEffect(() => {
    if (!r || !i || !n) return;
    let z = false;
    const G = Ei(n);
    return (async () => {
      var _a2;
      if (!(x.current === i && o.current.length > 0)) {
        x.current = i, b.current = null, c.current && (clearTimeout(c.current), c.current = null);
        try {
          const R = await Ku(i);
          if (z) return;
          if ((_a2 = R == null ? void 0 : R.stack) == null ? void 0 : _a2.length) {
            o.current = R.stack, a.current = Math.max(0, Math.min(R.index ?? R.stack.length - 1, R.stack.length - 1));
            const I = Ti(o.current, a.current, G);
            o.current = I.stack, a.current = I.index;
          } else o.current = [G], a.current = 0;
          k(i, o.current, a.current), g();
        } catch (R) {
          if (console.warn("[cover-undo] load failed:", R), z) return;
          o.current = [G], a.current = 0, g();
        }
      }
    })(), () => {
      z = true;
    };
  }, [r, i, g, k]), d.useEffect(() => () => {
    c.current && clearTimeout(c.current), f.current && clearTimeout(f.current);
    const z = x.current;
    z && Xu(z).catch(() => {
    });
  }, []);
  const L = d.useCallback((z) => {
    p.current(z), !(u.current || !x.current) && (b.current = Ei(z), c.current && clearTimeout(c.current), c.current = setTimeout(() => {
      c.current = null, N();
    }, Bu));
  }, [N]), C = d.useCallback(() => {
    if (N(), a.current <= 0) return false;
    a.current -= 1;
    const z = o.current[a.current], G = z ? Pi(z) : null;
    if (!G) return false;
    u.current = true, p.current(G);
    const U = x.current;
    return U && k(U, o.current, a.current), g(), requestAnimationFrame(() => {
      u.current = false;
    }), true;
  }, [g, N, k]), E = d.useCallback(() => {
    if (N(), a.current >= o.current.length - 1) return false;
    a.current += 1;
    const z = o.current[a.current], G = z ? Pi(z) : null;
    if (!G) return false;
    u.current = true, p.current(G);
    const U = x.current;
    return U && k(U, o.current, a.current), g(), requestAnimationFrame(() => {
      u.current = false;
    }), true;
  }, [g, N, k]), _ = r && a.current > 0, O = r && a.current < o.current.length - 1;
  return { onCoverChange: L, undo: C, redo: E, canUndo: _, canRedo: O, flushPendingRecord: N };
}
function Ri(e, r) {
  const n = e ? rl(e) : "";
  if (n === null || n === "") return null;
  const s = n.match(/^(\d+(?:\.\d+)?)(px|%|vh|vw|mm|cm|in)$/i);
  if (!(s == null ? void 0 : s[1]) || !s[2]) return null;
  const i = Number(s[1]);
  if (!Number.isFinite(i)) return null;
  switch (s[2].toLowerCase()) {
    case "px":
      return i;
    case "%":
      return i / 100 * r;
    case "mm":
      return i * 96 / 25.4;
    case "cm":
      return i * 96 / 2.54;
    case "in":
      return i * 96;
    case "vh":
      return i / 100 * window.innerHeight;
    case "vw":
      return i / 100 * window.innerWidth;
    default:
      return null;
  }
}
function Yu(e, r, n, s) {
  const i = r / Math.max(1, n), o = e.getAttribute("data-wiki-width") || e.getAttribute("data-md-width") || "", a = e.getAttribute("data-wiki-height") || e.getAttribute("data-md-height") || "", u = Ri(o, s), c = Ri(a, s);
  if (u && u > 0 && c && c > 0) {
    const f = Math.min(u / r, c / n);
    return { width: r * f, height: n * f };
  }
  return u && u > 0 ? { width: u, height: u / i } : c && c > 0 ? { width: c * i, height: c } : { width: r, height: n };
}
function Vu(e, r, n) {
  d.useLayoutEffect(() => {
    const s = e.current, i = r.current;
    if (!s || !i) return;
    let o = 0;
    const a = () => {
      const x = i.getBoundingClientRect(), p = x.width, w = x.height;
      if (p < 1 || w < 1) return;
      const y = s.getBoundingClientRect().width || p, g = [...s.querySelectorAll("img")];
      for (const k of g) {
        if (k.hasAttribute("data-print-free-transform")) continue;
        const N = k.naturalWidth, L = k.naturalHeight;
        if (!N || !L) continue;
        const C = Yu(k, N, L, y), E = Math.min(p / C.width, w / C.height, 1), _ = Math.max(1, Math.round(C.width * E)), O = Math.max(1, Math.round(C.height * E)), z = `${_}px`, G = `${O}px`;
        k.style.width !== z && (k.style.width = z), k.style.height !== G && (k.style.height = G), k.style.objectFit !== "contain" && (k.style.objectFit = "contain"), k.setAttribute("data-print-aspect-fit", "1");
      }
    }, u = () => {
      o || (o = window.requestAnimationFrame(() => {
        o = 0, a();
      }));
    };
    a();
    const c = new ResizeObserver(u);
    c.observe(s), c.observe(i);
    const f = new MutationObserver(u);
    f.observe(s, { childList: true, subtree: true, attributes: true, attributeFilter: ["src", "data-wiki-width", "data-wiki-height", "data-md-width", "data-md-height"] });
    const b = [...s.querySelectorAll("img")];
    for (const x of b) x.complete || x.addEventListener("load", u);
    return () => {
      o && window.cancelAnimationFrame(o), c.disconnect(), f.disconnect();
      for (const x of b) x.removeEventListener("load", u);
    };
  }, [n, r, e]);
}
const ys = "data-print-table-fit";
function Mi(e) {
  e.style.transform = "", e.style.transformOrigin = "", e.style.marginRight = "", e.style.marginBottom = "", e.style.maxWidth = "", e.removeAttribute(ys);
}
function qu(e, r) {
  d.useLayoutEffect(() => {
    const n = e.current;
    if (!n) return;
    let s = 0, i = false;
    const o = () => {
      const f = n.clientWidth;
      if (!(f < 1)) {
        i = true;
        try {
          const b = [...n.querySelectorAll("table")];
          for (const x of b) {
            Mi(x), x.style.maxWidth = "none";
            const p = x.scrollWidth, w = x.offsetHeight;
            if (p <= f + 1) {
              x.style.maxWidth = `${f}px`, x.setAttribute(ys, "1");
              continue;
            }
            const y = Math.max(0.05, Math.min(1, f / p));
            x.style.maxWidth = "none", x.style.transformOrigin = "top left", x.style.transform = `scale(${y})`, x.style.marginRight = `${-Math.round(p * (1 - y))}px`, x.style.marginBottom = `${-Math.round(w * (1 - y))}px`, x.setAttribute(ys, String(Number(y.toFixed(4))));
          }
        } finally {
          i = false;
        }
      }
    }, a = () => {
      i || s || (s = window.requestAnimationFrame(() => {
        s = 0, o();
      }));
    };
    o();
    const u = new ResizeObserver(a);
    u.observe(n);
    const c = new MutationObserver(() => {
      i || a();
    });
    return c.observe(n, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "data-haim-box-w", "data-haim-box-h", "data-haim-width", "width"] }), () => {
      s && window.cancelAnimationFrame(s), u.disconnect(), c.disconnect();
      for (const f of n.querySelectorAll("table")) Mi(f);
    };
  }, [r, e]);
}
const vs = "data-print-mermaid-fit";
function Zu(e) {
  e.style.transform = "", e.style.transformOrigin = "", e.style.marginRight = "", e.style.marginBottom = "", e.style.maxWidth = "", e.style.width = "", e.removeAttribute(vs);
}
function Ju(e, r, n) {
  d.useLayoutEffect(() => {
    const s = e.current, i = r.current;
    if (!s || !i) return;
    let o = 0, a = false;
    const u = () => {
      const x = i.getBoundingClientRect(), p = x.width, w = x.height;
      if (!(p < 1 || w < 1)) {
        a = true;
        try {
          const y = [...s.querySelectorAll(".md-editor-mermaid[data-processed]")];
          for (const g of y) {
            Zu(g);
            const k = g.querySelector("svg"), N = Math.max(g.scrollWidth, g.offsetWidth, (k == null ? void 0 : k.getBoundingClientRect().width) ?? 0), L = Math.max(g.scrollHeight, g.offsetHeight, (k == null ? void 0 : k.getBoundingClientRect().height) ?? 0);
            if (N < 1 || L < 1) continue;
            const C = Math.min(p / N, w / L, 1);
            if (C >= 0.999) {
              g.setAttribute(vs, "1");
              continue;
            }
            g.style.transformOrigin = "top left", g.style.transform = `scale(${C})`, g.style.marginRight = `${-Math.round(N * (1 - C))}px`, g.style.marginBottom = `${-Math.round(L * (1 - C))}px`, g.setAttribute(vs, String(Number(C.toFixed(4))));
          }
        } finally {
          a = false;
        }
      }
    }, c = () => {
      a || o || (o = window.requestAnimationFrame(() => {
        o = 0, u();
      }));
    };
    u();
    const f = new ResizeObserver(c);
    f.observe(s), f.observe(i);
    const b = new MutationObserver(() => {
      a || c();
    });
    return b.observe(s, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-processed", "data-content"] }), () => {
      o && window.cancelAnimationFrame(o), f.disconnect(), b.disconnect();
    };
  }, [n, r, e]);
}
function Qu(e) {
  const r = d.useRef(null), [n, s] = d.useState(0);
  return d.useLayoutEffect(() => {
    const i = r.current;
    if (!i) return;
    const o = () => {
      const u = i.getBoundingClientRect().height;
      s((c) => Math.abs(c - u) < 0.5 ? c : u);
    };
    o();
    const a = new ResizeObserver(o);
    return a.observe(i), () => a.disconnect();
  }, [e]), { metricRef: r, pageInnerHeightPx: n };
}
function ef(e, r, n, s) {
  const [i, o] = d.useState(1), [a, u] = d.useState([0]), c = d.useRef(0);
  return d.useLayoutEffect(() => {
    const f = e.current, b = r.current;
    if (!f || !b || n <= 1) {
      o(1), u([0]);
      return;
    }
    let x = 0, p = false;
    const w = c.current += 1, y = () => {
      if (p || w !== c.current) return;
      if (!f.querySelector(".md-editor-preview")) {
        o(1), u(xi(1, n)), b.replaceChildren();
        return;
      }
      const { pageCount: E } = Hd({ stagingRoot: f, pagesHost: b, pageInnerHeightPx: n });
      o(E), u(xi(E, n));
    }, g = () => {
      x || (x = window.requestAnimationFrame(() => {
        x = 0, window.requestAnimationFrame(() => {
          p || y();
        });
      }));
    };
    y();
    const k = new ResizeObserver(g);
    k.observe(f);
    const N = new MutationObserver(g);
    N.observe(f, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["style", "class", "src", "width", "height", "data-processed"] });
    const L = [...f.querySelectorAll("img")];
    for (const C of L) C.complete || C.addEventListener("load", g);
    return () => {
      p = true, x && window.cancelAnimationFrame(x), k.disconnect(), N.disconnect();
      for (const C of L) C.removeEventListener("load", g);
    };
  }, [s, n, r, e]), { pageCount: i, pageStarts: a, contentHeight: Math.max(1, i) * Math.max(1, n) };
}
function tf(e) {
  return e === "json" ? "application/json" : e === "raw" ? "text/plain" : e === "html" ? "text/html" : e === "svg" ? "image/svg+xml" : "text/markdown";
}
async function rf(e, r) {
  var _a2;
  const n = String(r ?? ""), s = String((e == null ? void 0 : e.id) || "").trim(), i = (e == null ? void 0 : e.type) || "s3";
  if (!s) throw new Error("\uC800\uC7A5\uD560 \uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
  if (i === "session") return { mode: "pending-only" };
  const o = Wi(), a = tf(e == null ? void 0 : e.viewer);
  if (i === "local") {
    const f = (e == null ? void 0 : e.handle) ?? (o.localRootHandle ? await nl(o.localRootHandle, s) : null);
    if (!f) throw new Error("\uB85C\uCEEC \uD30C\uC77C \uD578\uB4E4\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    const b = await f.createWritable();
    return await b.write(n), await b.close(), await Hn(on("local", s)), { mode: "storage" };
  }
  if (i === "webdav") {
    const f = o.webdavConfig;
    if (!(f == null ? void 0 : f.endpoint) || !(f == null ? void 0 : f.username)) throw new Error("WebDAV\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
    return await Ki(f).writeText(s, n, a), await Hn(on("webdav", s)), { mode: "storage" };
  }
  const u = typeof o.getS3Client == "function" ? o.getS3Client() : null, c = (_a2 = o.s3Creds) == null ? void 0 : _a2.bucket;
  if (!u || !c) throw new Error("S3 \uD074\uB77C\uC774\uC5B8\uD2B8\uB97C \uCD08\uAE30\uD654\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  return await sl(u, { Bucket: c, Key: s, Body: n, ContentType: a }), await Hn(on("s3", s)), { mode: "storage" };
}
function Do(e) {
  return String(e ?? "").replace(/\s+/g, " ").trim();
}
function wn(e) {
  let r = String(e ?? "");
  r = r.replace(/!\[[^\]]*]\([^)]*\)/g, ""), r = r.replace(/\[([^\]]*)]\([^)]*\)/g, "$1"), r = r.replace(/`([^`]+)`/g, "$1");
  for (let n = 0; n < 3; n += 1) r = r.replace(/\*\*([^*]+)\*\*/g, "$1"), r = r.replace(/__([^_]+)__/g, "$1"), r = r.replace(/~~([^~]+)~~/g, "$1"), r = r.replace(/(^|[^*\w])\*([^*\n]+)\*(?=[^*\w]|$)/g, "$1$2"), r = r.replace(/(^|[^A-Za-z0-9_])_([^_\n]+)_(?=[^A-Za-z0-9_]|$)/g, "$1$2");
  return Do(r);
}
const $o = /^<pgbr\s*\/?\s*>$/i;
function nf(e) {
  return /^\s*(```+|~~~+)/.test(e);
}
function yn(e) {
  return String(e ?? "").replace(/\s+/g, " ").trim();
}
function sf(e) {
  const r = e.parentElement;
  return !!(!r || r.closest('[aria-hidden="true"], .md-pgbr, .export-pdf-paper-metric'));
}
function of(e) {
  const r = [], n = document.createTreeWalker(e, NodeFilter.SHOW_TEXT, { acceptNode(o) {
    return !o.textContent || sf(o) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
  } }), s = document.createRange();
  let i = n.nextNode();
  for (; i; ) {
    const o = i, a = o.textContent ?? "";
    s.selectNodeContents(o);
    const u = [...s.getClientRects()].filter((f) => f.height >= 2 && f.width >= 1);
    if (u.length === 0) {
      i = n.nextNode();
      continue;
    }
    if (u.length === 1) {
      const f = u[0];
      f && r.push({ top: f.top, bottom: f.bottom, left: f.left, right: f.right, text: a }), i = n.nextNode();
      continue;
    }
    let c = 0;
    for (const f of u) {
      let b = -1, x = -1;
      for (let p = c; p < a.length; p += 1) {
        s.setStart(o, p), s.setEnd(o, p + 1);
        const w = s.getBoundingClientRect();
        if (w.height < 1 && w.width < 1) continue;
        if (Math.min(w.bottom, f.bottom) - Math.max(w.top, f.top) > Math.min(w.height || f.height, f.height) * 0.45) {
          b < 0 && (b = p), x = p + 1;
          continue;
        }
        if (b >= 0) break;
      }
      b >= 0 && x >= 0 && (r.push({ top: f.top, bottom: f.bottom, left: f.left, right: f.right, text: a.slice(b, x) }), c = x);
    }
    i = n.nextNode();
  }
  return r;
}
function af(e) {
  const r = [...e].sort((s, i) => s.top - i.top || s.left - i.left), n = [];
  for (const s of r) {
    const i = n[n.length - 1], o = i == null ? void 0 : i[0];
    if (o && Math.abs(s.top - o.top) <= 3) {
      i.push(s);
      continue;
    }
    n.push([s]);
  }
  for (const s of n) s.sort((i, o) => i.left - o.left);
  return n;
}
function lf(e, r, n) {
  const s = af(of(e));
  if (!s.length) return null;
  let i = s.findIndex((c) => c.some((f) => r >= f.left && r <= f.right && n >= f.top && n <= f.bottom));
  if (i < 0 && (i = s.findIndex((c) => {
    const f = Math.min(...c.map((x) => x.top)), b = Math.max(...c.map((x) => x.bottom));
    return n >= f && n <= b;
  })), i < 0) {
    let c = 1 / 0;
    s.forEach((f, b) => {
      const x = Math.min(...f.map((y) => y.top)), p = Math.max(...f.map((y) => y.bottom)), w = n < x ? x - n : n > p ? n - p : 0;
      w < c && (c = w, i = b);
    });
  }
  const o = i >= 0 ? s[i] : null;
  if (!o) return null;
  const a = yn(o.map((c) => c.text).join(""));
  if (!a) return null;
  let u = 0;
  for (let c = 0; c < i; c += 1) yn((s[c] ?? []).map((b) => b.text).join("")) === a && (u += 1);
  return { lineText: a, occurrence: u, top: Math.min(...o.map((c) => c.top)), left: Math.min(...o.map((c) => c.left)), right: Math.max(...o.map((c) => c.right)), bottom: Math.max(...o.map((c) => c.bottom)) };
}
function cf(e, r) {
  var _a2;
  let n = r - 1;
  for (; n >= 0 && !((_a2 = e[n]) == null ? void 0 : _a2.trim()); ) n -= 1;
  if (n >= 0 && $o.test((e[n] ?? "").trim())) return e.join(`
`);
  const s = ["<pgbr/>", ""];
  r > 0 && (e[r - 1] ?? "").trim() !== "" && s.unshift("");
  const i = [...e];
  return i.splice(r, 0, ...s), i.join(`
`);
}
function df(e) {
  let r = 0;
  for (; r < e.length; ) {
    const s = e.slice(r).match(/^ {0,3}>\s?/);
    if (!(s == null ? void 0 : s[0])) break;
    r += s[0].length;
  }
  const n = e.slice(r).match(/^(?:[-*+]|\d+[.)])\s+(?:\[[ xX]\]\s+)?/);
  return (n == null ? void 0 : n[0]) && (r += n[0].length), r;
}
function uf(e, r, n = 0) {
  const s = e.slice(n);
  if (!s.trim()) return -1;
  const i = s.indexOf(r);
  if (i >= 0) return n + i;
  const o = yn(r);
  if (!o) return -1;
  const a = wn(s);
  if (a.length >= 8 && (a.includes(o) || o.includes(a))) return n;
  let u = "";
  const c = [];
  for (let b = 0; b < s.length; b += 1) {
    const x = s[b] ?? "";
    if (/\s/.test(x)) {
      if (u.endsWith(" ") || u.length === 0) continue;
      u += " ", c.push(n + b);
      continue;
    }
    u += x, c.push(n + b);
  }
  const f = u.indexOf(o);
  return f < 0 ? -1 : c[f] ?? -1;
}
function ff(e, r, n) {
  const s = yn(r);
  if (!s || !Number.isInteger(n) || n < 0) return { markdown: e, updated: false };
  const i = String(e ?? "").split(`
`);
  let o = false, a = -1;
  for (let u = 0; u < i.length; u += 1) {
    const c = i[u] ?? "";
    if (nf(c)) {
      o = !o;
      continue;
    }
    if (o) continue;
    const f = df(c), b = wn(c), x = wn(c.slice(f)), p = b === s || x === s, w = !p && s.length >= 8 && (b.includes(s) || x.includes(s));
    if ((p || w ? x === s || x.includes(s) ? f : 0 : uf(c, s)) < 0 && !p && !w || (a += 1, a !== n)) continue;
    if ((() => {
      let N = u - 1;
      for (; N >= 0 && !(i[N] ?? "").trim(); ) N -= 1;
      return N >= 0 && $o.test((i[N] ?? "").trim());
    })()) return { markdown: e, updated: false };
    const k = cf(i, u);
    return { markdown: k, updated: k !== e };
  }
  return { markdown: e, updated: false };
}
const pf = /^<pgbr\s*\/?\s*>$/i;
function Oo(e) {
  return /^\s*(```+|~~~+)/.test(e);
}
const Li = Do, zi = wn;
function _o() {
  return il("print-heading");
}
function mf(e, r) {
  if (!Number.isInteger(r) || r < 1) return -1;
  const n = _o().parse(String(e ?? ""), {});
  let s = 0;
  for (const i of n) if (!(i.type !== "heading_open" || !i.map) && (s += 1, s === r)) return i.map[0] ?? -1;
  return -1;
}
function hf(e) {
  const n = String(e.id || "").match(/^pdf-ex-heading-(\d+)$/);
  if (!(n == null ? void 0 : n[1])) return null;
  const s = Number(n[1]);
  return Number.isInteger(s) && s >= 1 ? s : null;
}
function xf(e) {
  const r = String(e ?? "").split(`
`), n = [];
  let s = false;
  for (let i = 0; i < r.length; i += 1) {
    const o = r[i] ?? "";
    if (Oo(o)) {
      s = !s;
      continue;
    }
    if (s) continue;
    const a = o.trim();
    if (a) {
      if (/^<hr\b[^>]*\/?>$/i.test(a)) {
        n.push(i);
        continue;
      }
      (/^(\*\s*){3,}$/.test(a) || /^(-\s*){3,}$/.test(a) || /^(_\s*){3,}$/.test(a)) && n.push(i);
    }
  }
  return { lines: r, indexes: n };
}
function Fo(e, r) {
  let n = r - 1;
  for (; n >= 0 && !(e[n] ?? "").trim(); ) n -= 1;
  if (n >= 0 && pf.test((e[n] ?? "").trim())) return e.join(`
`);
  const s = ["<pgbr/>", ""];
  r > 0 && (e[r - 1] ?? "").trim() !== "" && s.unshift("");
  const i = [...e];
  return i.splice(r, 0, ...s), i.join(`
`);
}
function zn(e, r) {
  var _a2;
  const n = ds(e), s = r(n.body);
  return s.updated ? n.cover ? { markdown: us(s.markdown, n.cover), updated: true } : ((_a2 = n.match) == null ? void 0 : _a2[0]) ? { markdown: `${n.match[0]}
${s.markdown.replace(/^\uFEFF/, "")}`, updated: true } : s : { markdown: e, updated: false };
}
function Bo(e, r, n, s) {
  const i = zi(r), o = Number.isInteger(s) && s != null && s >= 1;
  return !o && (!i || !Number.isInteger(n) || n < 0) ? { markdown: e, updated: false } : zn(e, (a) => {
    let u = -1;
    if (o && (u = mf(a, s)), u < 0 && i) {
      const b = _o().parse(a, {});
      let x = -1;
      for (let p = 0; p < b.length; p += 1) {
        const w = b[p];
        if ((w == null ? void 0 : w.type) !== "heading_open" || !w.map) continue;
        const y = b[p + 1], g = (y == null ? void 0 : y.type) === "inline" ? String(y.content ?? "") : "";
        if (zi(g) === i && (x += 1, x === n)) {
          u = w.map[0] ?? -1;
          break;
        }
      }
    }
    if (u < 0) return { markdown: a, updated: false };
    const c = a.split(`
`), f = Fo(c, u);
    return { markdown: f, updated: f !== a };
  });
}
function gf(e, r) {
  return !Number.isInteger(r) || r < 0 ? { markdown: e, updated: false } : zn(e, (n) => {
    const { lines: s, indexes: i } = xf(n), o = i[r];
    if (!Number.isInteger(o)) return { markdown: n, updated: false };
    const a = Fo(s, o);
    return { markdown: a, updated: a !== n };
  });
}
function bf(e, r, n) {
  return zn(e, (s) => ff(s, r, n));
}
function wf(e, r) {
  return !Number.isInteger(r) || r < 0 ? { markdown: e, updated: false } : zn(e, (n) => {
    const s = n.split(`
`);
    let i = false, o = -1, a = false;
    const u = s.map((c) => Oo(c) ? (i = !i, c) : i || !/<pgbr\s*\/?\s*>/i.test(c) ? c : c.replace(/<pgbr\s*\/?\s*>/gi, (f) => (o += 1, o !== r ? f : (a = true, ""))));
    return a ? { markdown: u.join(`
`), updated: true } : { markdown: n, updated: false };
  });
}
function yf(e, r) {
  const n = Li(Ai(r)), s = hf(r), i = [...e.querySelectorAll("h1, h2, h3, h4, h5, h6")].filter((c) => e.contains(c)), o = i.findIndex((c) => c === r), a = s ?? (o < 0 ? 1 : o + 1);
  let u = 0;
  for (const c of i) {
    if (c === r) break;
    Li(Ai(c)) === n && (u += 1);
  }
  return { text: n, occurrence: u, headingIndex: a };
}
function Ai(e) {
  const r = e.cloneNode(true);
  return r.querySelectorAll('.md-preview-heading-fold-chevron, [aria-hidden="true"], button').forEach((n) => n.remove()), r.textContent || "";
}
const vf = "fixed z-100050 min-w-[200px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", kf = "flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-800 outline-none hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-surface", jf = "flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 outline-none hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40", Ii = "h-3.5 w-3.5 shrink-0";
function ns(e, r) {
  const n = e.getBoundingClientRect();
  return { left: n.left, top: r, width: Math.max(1, n.width) };
}
function Sf(e, r, n) {
  const s = r();
  let i;
  return e.kind === "heading" ? i = Bo(s, e.headingText, e.occurrence, e.headingIndex) : e.kind === "hr" ? i = gf(s, e.hrIndex) : e.kind === "line" ? i = bf(s, e.lineText, e.occurrence) : i = wf(s, e.occurrence), !i.updated || i.markdown === s ? false : (n(i.markdown), true);
}
function Nf({ containerEl: e, containerRef: r, paperContentRef: n, getMarkdown: s, setMarkdown: i }) {
  const o = Gi(), [a, u] = d.useState(false), [c, f] = d.useState(null), [b, x] = d.useState(false), p = d.useRef(null), w = d.useRef(s), y = d.useRef(i);
  w.current = s, y.current = i;
  const g = d.useCallback((z) => {
    p.current = z, f(z), x(false), u(true);
  }, []), k = d.useCallback(() => {
    u(false), x(false), f(null), p.current = null;
  }, []), N = d.useCallback((z) => {
    z && (Sf(z, w.current, y.current), p.current = null, u(false), x(false), f(null));
  }, []);
  d.useEffect(() => {
    const z = e ?? (r == null ? void 0 : r.current) ?? null;
    if (!z) return;
    const G = (R) => {
      var _a2, _b, _c2, _d2;
      const I = ".export-pdf-cover, [data-cover-slide], [data-cover-el], [data-cover-shape]";
      if (((_b = (_a2 = R.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, I)) || ((_d2 = (_c2 = document.elementFromPoint(R.clientX, R.clientY)) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, I))) return true;
      for (const V of z.querySelectorAll(I)) {
        const ie = V.getBoundingClientRect();
        if (R.clientX >= ie.left && R.clientX <= ie.right && R.clientY >= ie.top && R.clientY <= ie.bottom) return true;
      }
      return false;
    }, U = (R) => {
      var _a2, _b, _c2, _d2, _e2, _f, _g, _h, _i2, _j, _k, _l2;
      if (G(R) || R.ctrlKey) return;
      const I = n.current, se = R.target instanceof Element ? R.target : (_a2 = R.target) == null ? void 0 : _a2.parentElement, V = (() => {
        var _a3, _b2, _c3;
        if (I && se && I.contains(se)) return I;
        const T = (_a3 = se == null ? void 0 : se.closest) == null ? void 0 : _a3.call(se, "[data-export-pdf-pages]");
        if (T instanceof HTMLElement) return T;
        const H = ((_b2 = se == null ? void 0 : se.closest) == null ? void 0 : _b2.call(se, ".md-editor-preview")) ?? ((_c3 = se == null ? void 0 : se.closest) == null ? void 0 : _c3.call(se, "[data-export-pdf-preview]"));
        return H instanceof HTMLElement ? H : I;
      })();
      if (!V) return;
      const ie = I && I.clientWidth > 0 ? I : V, ke = (_c2 = (_b = R.target) == null ? void 0 : _b.closest) == null ? void 0 : _c2.call(_b, '.md-pgbr[data-md-pgbr="1"], .md-pgbr');
      if (ke && V.contains(ke)) {
        R.preventDefault(), R.stopPropagation();
        const H = [...V.querySelectorAll('.md-pgbr[data-md-pgbr="1"], .md-pgbr')].findIndex((B) => B === ke);
        if (H < 0) return;
        g({ kind: "delete", x: R.clientX, y: R.clientY, occurrence: H, label: "\uD398\uC774\uC9C0 \uB098\uB204\uAE30" });
        return;
      }
      if (((_e2 = (_d2 = R.target) == null ? void 0 : _d2.closest) == null ? void 0 : _e2.call(_d2, "img[data-wiki-path], img[data-md-src]")) || ((_g = (_f = R.target) == null ? void 0 : _f.closest) == null ? void 0 : _g.call(_f, "table"))) return;
      const de = (_i2 = (_h = R.target) == null ? void 0 : _h.closest) == null ? void 0 : _i2.call(_h, "h1, h2, h3, h4, h5, h6");
      if (de instanceof HTMLElement && V.contains(de)) {
        R.preventDefault(), R.stopPropagation();
        const { text: T, occurrence: H, headingIndex: B } = yf(V, de), ue = de.getBoundingClientRect();
        g({ kind: "heading", x: R.clientX, y: R.clientY, headingText: T || ((_j = de.textContent) == null ? void 0 : _j.trim()) || "", occurrence: H, headingIndex: B, preview: ns(ie, ue.top), label: T || "\uC81C\uBAA9" });
        return;
      }
      const $ = (_l2 = (_k = R.target) == null ? void 0 : _k.closest) == null ? void 0 : _l2.call(_k, "hr");
      if ($ instanceof HTMLElement && V.contains($)) {
        R.preventDefault(), R.stopPropagation();
        const H = [...V.querySelectorAll("hr")].findIndex((ue) => ue === $);
        if (H < 0) return;
        const B = $.getBoundingClientRect();
        g({ kind: "hr", x: R.clientX, y: R.clientY, hrIndex: H, preview: ns(ie, B.top), label: "\uAD6C\uBD84\uC120" });
        return;
      }
      if (!(R.target instanceof Node) || !V.contains(R.target)) return;
      const q = lf(V, R.clientX, R.clientY);
      (q == null ? void 0 : q.lineText) && (R.preventDefault(), R.stopPropagation(), g({ kind: "line", x: R.clientX, y: R.clientY, lineText: q.lineText, occurrence: q.occurrence, preview: ns(ie, q.top), label: q.lineText }));
    };
    return z.addEventListener("contextmenu", U), () => z.removeEventListener("contextmenu", U);
  }, [e, r, g, n]), d.useEffect(() => {
    if (!a || o) return;
    const z = (U) => {
      var _a2, _b;
      U.button !== 0 || ((_b = (_a2 = U.target instanceof Element ? U.target : null) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, '[data-print-pgbr-menu="1"]')) || k();
    }, G = (U) => {
      U.key === "Escape" && k();
    };
    return window.addEventListener("pointerdown", z, false), window.addEventListener("keydown", G), () => {
      window.removeEventListener("pointerdown", z, false), window.removeEventListener("keydown", G);
    };
  }, [k, o, a]);
  const L = !!(c && c.kind !== "delete" && b && "preview" in c), C = (z) => {
    if (z.button !== 0) return;
    z.preventDefault(), z.stopPropagation();
    const G = p.current ?? c;
    N(G);
  }, E = (c == null ? void 0 : c.kind) === "delete" ? t.jsxs("button", { type: "button", "data-print-pgbr-action": "1", className: o ? ol : jf, onPointerUp: C, children: [t.jsx(kn, { className: Ii, "aria-hidden": true }), "\uD398\uC774\uC9C0 \uB098\uB204\uAE30 \uC0AD\uC81C"] }) : t.jsxs("button", { type: "button", "data-print-pgbr-action": "1", className: o ? al : kf, onPointerEnter: () => x(true), onPointerLeave: () => x(false), onPointerUp: C, children: [t.jsx(hc, { className: Ii, "aria-hidden": true }), "\uD398\uC774\uC9C0 \uB098\uB204\uAE30 \uC0BD\uC785"] }), _ = L && c && "preview" in c ? ss.createPortal(t.jsxs("div", { className: "pointer-events-none fixed z-100040 print:hidden", style: { left: c.preview.left, top: Math.max(0, c.preview.top - 1), width: c.preview.width }, "aria-hidden": true, children: [t.jsx("div", { className: "border-t-2 border-dashed border-red-500 bg-red-500/10", style: { height: 12 } }), t.jsx("div", { className: "mt-0.5 inline-block rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow-sm", children: "\uD398\uC774\uC9C0 \uBD84\uD560 \uBBF8\uB9AC\uBCF4\uAE30" })] }), document.body) : null, O = a && c && !o ? ss.createPortal(t.jsx("div", { "data-print-pgbr-menu": "1", className: vf, style: { left: Math.min(c.x, window.innerWidth - 220), top: Math.min(c.y, window.innerHeight - 80) }, role: "menu", children: E }), document.body) : null;
  return t.jsxs(t.Fragment, { children: [_, o ? t.jsx(Yi, { open: a, onOpenChange: (z) => {
    z ? u(true) : k();
  }, title: (c == null ? void 0 : c.label) || "\uD398\uC774\uC9C0 \uB098\uB204\uAE30", subtitle: "\uC778\uC1C4 \uBBF8\uB9AC\uBCF4\uAE30", children: t.jsx("div", { "data-print-pgbr-menu": "1", onPointerEnter: () => {
    (c == null ? void 0 : c.kind) !== "delete" && x(true);
  }, onPointerLeave: () => x(false), children: E }) }) : O] });
}
const Di = "export-pdf-preview", Cf = "s3haim_print_toc_width", Ef = 360, $i = ({ index: e }) => `pdf-ex-heading-${e}`, Pf = 2 / 3;
function Tf(e) {
  const r = window.innerHeight * Pf;
  let n = null;
  for (const s of e) (s == null ? void 0 : s.id) && s.getBoundingClientRect().top <= r && (n = s.id);
  return n;
}
const Rf = `
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
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-mermaid svg,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-mermaid svg * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
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
  .export-pdf-pages {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .export-pdf-pages .export-pdf-page {
    box-shadow: 0 8px 28px rgba(15, 23, 42, 0.12);
  }
  .export-pdf-pages .print-pack-line {
    display: block;
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
    .export-pdf-staging {
      display: none !important;
    }
    .export-pdf-pages {
      gap: 0 !important;
      align-items: stretch !important;
      zoom: 1 !important;
    }
    .export-pdf-pages .export-pdf-page {
      display: block !important;
      width: var(--print-page-width) !important;
      height: var(--print-page-height) !important;
      min-height: var(--print-page-height) !important;
      max-height: var(--print-page-height) !important;
      margin: 0 !important;
      padding: var(--print-page-margin) !important;
      box-shadow: none !important;
      overflow: hidden !important;
      background: #ffffff !important;
      break-after: page !important;
      page-break-after: always !important;
    }
    .export-pdf-pages .export-pdf-page:last-child {
      break-after: auto !important;
      page-break-after: auto !important;
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
    .export-pdf-paper .md-pgbr {
      background: transparent !important;
      background-image: none !important;
      border: none !important;
    }
  }
`;
function qf({ documentValue: e = "", documentFile: r = null, openCoverEdit: n = false, isDocumentLoading: s = false, hasNavigationSession: i = false }) {
  var _a2, _b, _c2, _d2;
  const o = va(), a = ka(), { showAlert: u } = ll(), { s3Creds: c } = cl(), f = d.useCallback(() => ((c == null ? void 0 : c.imgbbApiKey) || "").trim(), [c == null ? void 0 : c.imgbbApiKey]), b = o.state && typeof o.state == "object" ? o.state : null, x = dl(o.pathname), p = typeof (b == null ? void 0 : b.value) == "string" ? b.value : typeof e == "string" ? e : "", w = (b == null ? void 0 : b.currentFile) ?? r ?? null, y = !!((b == null ? void 0 : b.openCoverEdit) ?? n), [g, k] = d.useState(() => p), N = d.useRef(""), [L, C] = d.useState(() => p), [E, _] = d.useState(() => w), O = d.useRef(p), z = d.useRef(w), G = d.useRef(false);
  O.current = g, z.current = E;
  const [U, R] = d.useState(false), [I, se] = d.useState(() => ({ ...is })), [V, ie] = d.useState(() => ul()), [ke, de] = d.useState(false), [$, q] = d.useState(true), [T, H] = d.useState(0), [B, ue] = d.useState([]), [re, Y] = Hc(), [ye, me] = d.useState([]), [ee, Ee] = d.useState(null), [Me, Ke] = d.useState(null), [Te, Qe] = d.useState(null), [Sr, Le] = d.useState(false), [Z, xe] = d.useState(null), [we, Ct] = d.useState(() => !!y), [ze, et] = d.useState([]), [X, Ve] = d.useState(null), [ht, Et] = d.useState(() => fl()), [tt, Pe] = d.useState(() => pl()), [$e, Ie] = d.useState(() => ml()), [xt, gt] = d.useState(() => hl()), [ir, or] = d.useState(() => xl()), [ar, lr] = d.useState(() => gl()), [Pt, Nr] = d.useState(() => $u()), [Ge, at] = d.useState(() => Ed()), [cr, lt] = d.useState(0), [qe, dr] = d.useState(null), [Cr, Er] = d.useState(0), Xe = d.useRef(null), bt = d.useRef(null), Be = d.useRef(null), [rt, l] = d.useState(null), m = d.useCallback((h) => {
    Be.current = h, l(h);
  }, []), v = d.useRef(null), P = d.useRef(null), M = d.useRef(null), F = d.useRef(null), D = `${V.pageSizeId}|${V.imageMaxWidth}|${V.imageMaxHeight}`, { metricRef: ae, pageInnerHeightPx: fe } = Qu(D);
  Vu(v, F, D), qu(v, `${D}|${g}`), bl(v, { eager: true, layoutKey: `${D}|${g}` }), Ju(v, F, `${D}|${g}`);
  const ne = wl(V.pageSizeId), S = fe > 1 ? fe : ne.heightPx, W = `${D}|${g}|${S}`, { pageCount: J } = ef(v, P, S, W), ge = d.useRef(null), te = d.useRef(false), pe = d.useRef(null), ve = d.useRef(0), { width: Ze, isResizing: Oe, handleProps: ur } = Wn({ storageKey: Cf, defaultWidth: Ef, minWidth: 180, collapseBelowWidth: 90, maxWidth: 640, edge: "right", onCollapseBelowMin: () => q(false) }), { width: Pr, isResizing: Ho, handleProps: Wo } = Wn({ storageKey: Tu, defaultWidth: Ru, minWidth: 220, maxWidth: 480, edge: "left" }), { width: $s, isResizing: Ko, handleProps: Go } = Wn({ storageKey: Mu, defaultWidth: Lu, minWidth: 200, maxWidth: 420, edge: "left" }), Xo = Pr + (Pt ? $s : 0), [Uo, Os] = d.useState(() => Kn());
  d.useEffect(() => {
    const h = () => Os(Kn());
    return window.addEventListener(Zs, h), Os(Kn()), () => window.removeEventListener(Zs, h);
  }, []);
  const Tr = d.useMemo(() => yl(E == null ? void 0 : E.type), [E == null ? void 0 : E.type, Uo]), _s = d.useRef((b == null ? void 0 : b.value) != null ? (w == null ? void 0 : w.id) ?? null : null);
  d.useEffect(() => {
    if ((b == null ? void 0 : b.value) != null || !(r == null ? void 0 : r.id) || _s.current === r.id) return;
    _s.current = r.id, _(r);
    const h = typeof e == "string" ? e : "";
    k(h), C(h);
  }, [r, e, b]);
  const fr = d.useMemo(() => {
    const { meta: h } = vl(g);
    return h ?? kl;
  }, [g]), Wr = d.useMemo(() => jl(g), [g]), An = d.useMemo(() => ds(g), [g]), Kr = An.cover, oe = Kr, Fs = !!(oe == null ? void 0 : oe.enabled), In = we ? "scroll" : Ge.navigation, pr = we ? 1 : Ge.pages, ct = In === "scroll" && pr === 1, Dn = !!we, Je = d.useCallback((h) => {
    at((j) => {
      const A = { ...j, ...h };
      return Object.prototype.hasOwnProperty.call(h, "zoomPercent") && (A.zoomPercent = Ln(h.zoomPercent)), zr(A), A;
    });
  }, []), Yo = d.useCallback((h) => {
    Je({ zoomPercent: h });
  }, [Je]), Gr = d.useCallback((h) => {
    if (!h) return;
    const j = document.getElementById(h);
    if (!j) return;
    if (ct) {
      j.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    const A = P.current;
    if (!A) {
      j.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    const Q = Yd(j, A, !!(oe == null ? void 0 : oe.enabled)), K = ((oe == null ? void 0 : oe.enabled) ? 1 : 0) + Math.max(1, J), ce = Vd(Q, K, pr, Ge.firstPageSingle);
    lt(ce);
  }, [oe == null ? void 0 : oe.enabled, J, pr, ct, Ge.firstPageSingle]);
  d.useEffect(() => {
    const { issues: h } = An;
    if (!h.length) {
      N.current = "";
      return;
    }
    const j = Sl(h);
    j !== N.current && (N.current = j, u({ title: "\uD45C\uC9C0 \uB370\uC774\uD130 \uC624\uB958", message: `\uD45C\uC9C0(note-cover) \uB370\uC774\uD130\uC5D0 \uBB38\uC81C\uAC00 \uC788\uC2B5\uB2C8\uB2E4.

${j}` }));
  }, [An, u]);
  const $n = d.useCallback((h) => {
    k((j) => {
      const A = us(j, h);
      return ot({ currentFile: E, editorContent: A }), A;
    });
  }, [E]), { onCoverChange: Tt, undo: Bs, redo: Hs, canUndo: Vo, canRedo: qo } = Uu({ currentFile: E, enabled: !!(we && oe), cover: oe, applyCover: $n }), Rr = d.useCallback(() => {
    Ct((h) => {
      const j = !h;
      return j || (et([]), Ve(null)), j;
    }), k((h) => {
      if (we || ds(h).cover) return h;
      const j = Nl({ pageSizeId: V.pageSizeId }), A = us(h, j);
      return ot({ currentFile: E, editorContent: A }), A;
    });
  }, [we, E, V.pageSizeId]);
  d.useEffect(() => {
    !we || !(oe == null ? void 0 : oe.pageSizeId) || oe.pageSizeId !== V.pageSizeId && ie((h) => {
      if (h.pageSizeId === oe.pageSizeId) return h;
      const j = { ...h, pageSizeId: oe.pageSizeId };
      return Gn(j), j;
    });
  }, [oe == null ? void 0 : oe.pageSizeId, we, V.pageSizeId]);
  const Zo = d.useCallback((h) => {
    Et(h), Qr("settings-cover-center-snap", h);
  }, []), Jo = d.useCallback((h) => {
    Pe(h), Cl(h);
  }, []), Qo = d.useCallback((h) => {
    Ie(h), Qr("settings-cover-object-snap", h);
  }, []), ea = d.useCallback((h) => {
    gt(h), El(h);
  }, []), ta = d.useCallback((h) => {
    or(h), Qr("settings-cover-text-outline", h);
  }, []), ra = d.useCallback((h) => {
    lr(h), Qr("settings-cover-place-preview", h);
  }, []), na = d.useCallback((h) => {
    Nr(h), Ou(h);
  }, []);
  Xc(Be, Wr, Tr ?? void 0, E == null ? void 0 : E.id), d.useEffect(() => {
    let h = false;
    return Pl().then((j) => {
      h || se(j);
    }), () => {
      h = true;
    };
  }, []), d.useEffect(() => {
    const h = () => {
      const j = Ul();
      Et(j.centerSnapEnabled), Pe(j.centerSnapTolerancePx), Ie(j.objectSnapEnabled), gt(j.objectSnapTolerancePx), or(j.textContainerOutlineEnabled), lr(j.placePreviewEnabled);
    };
    return window.addEventListener(Js, h), () => window.removeEventListener(Js, h);
  }, []), d.useEffect(() => {
    o.state == null && a("/", { replace: true });
  }, [o.state, a]), d.useEffect(() => {
    const h = () => {
      const A = bt.current;
      if (!A) {
        H(0);
        return;
      }
      const Q = A.getBoundingClientRect();
      H(Math.max(0, Math.round(Q.bottom)));
    };
    h(), window.addEventListener("resize", h), window.addEventListener("scroll", h, true);
    let j = null;
    return typeof ResizeObserver < "u" && bt.current && (j = new ResizeObserver(h), j.observe(bt.current)), () => {
      window.removeEventListener("resize", h), window.removeEventListener("scroll", h, true), j == null ? void 0 : j.disconnect();
    };
  }, []), d.useEffect(() => {
    if (rt) return Ic(rt);
  }, [rt]), d.useEffect(() => {
    const h = () => {
      Er((j) => j + 1);
    };
    return window.addEventListener(Qs, h), () => {
      window.removeEventListener(Qs, h);
    };
  }, []), d.useEffect(() => {
    const h = Be.current;
    if (!h) return;
    const j = () => {
      const K = P.current, ce = ["[data-export-pdf-pages] h1", "[data-export-pdf-pages] h2", "[data-export-pdf-pages] h3", "[data-export-pdf-pages] h4", "[data-export-pdf-pages] h5", "[data-export-pdf-pages] h6", "[data-export-pdf-pages] .print-pack-line[id]"].join(", "), Se = "#export-pdf-preview .md-editor-preview h1, #export-pdf-preview .md-editor-preview h2, #export-pdf-preview .md-editor-preview h3, #export-pdf-preview .md-editor-preview h4, #export-pdf-preview .md-editor-preview h5, #export-pdf-preview .md-editor-preview h6", je = K ? [...K.querySelectorAll(ce)] : [], be = je.length ? je : [...h.querySelectorAll(Se)], nt = /* @__PURE__ */ new Set(), ut = [];
      be.forEach((wt, Yr) => {
        const Jt = wt.id || $i({ index: Yr });
        if (!Jt || nt.has(Jt)) return;
        nt.add(Jt);
        const Mr = (wt.dataset.printPackSource || wt.tagName || "h1").toUpperCase(), Vr = Number(Mr.replace(/^H/, "")) || 1;
        ut.push({ id: Jt, level: Vr, text: (wt.textContent || "").trim() || "(\uBE48 \uC81C\uBAA9)" });
      }), ue(ut);
    }, A = [60, 180, 420].map((K) => setTimeout(j, K)), Q = new MutationObserver(() => j());
    return Q.observe(h, { childList: true, subtree: true, characterData: true }), () => {
      A.forEach((K) => clearTimeout(K)), Q.disconnect();
    };
  }, [Wr, J]), d.useEffect(() => {
    if (!B.length) {
      me([]);
      return;
    }
    const h = B.map((je) => document.getElementById(je.id)).filter(Boolean);
    if (!h.length) {
      me([]);
      return;
    }
    const j = Be.current;
    let A = 0;
    const Q = () => {
      const je = Tf(h), be = je ? [je] : [];
      me((nt) => nt.length === be.length && nt.every((ut, wt) => ut === be[wt]) ? nt : be);
    }, K = () => {
      A || (A = window.requestAnimationFrame(() => {
        A = 0, Q();
      }));
    };
    Q(), j == null ? void 0 : j.addEventListener("scroll", K, { passive: true }), window.addEventListener("scroll", K, { passive: true, capture: true }), window.addEventListener("resize", K);
    let ce = null;
    const Se = (j == null ? void 0 : j.querySelector(`#${Di}`)) ?? j;
    return typeof ResizeObserver < "u" && Se && (ce = new ResizeObserver(K), ce.observe(Se)), () => {
      A && window.cancelAnimationFrame(A), j == null ? void 0 : j.removeEventListener("scroll", K), window.removeEventListener("scroll", K, { capture: true }), window.removeEventListener("resize", K), ce == null ? void 0 : ce.disconnect();
    };
  }, [B, Wr]), d.useEffect(() => {
    var _a3;
    if (!$ || !ye.length || Date.now() < ve.current) return;
    const h = ge.current;
    if (!h) return;
    const j = (_a3 = B.find((Se) => ye.includes(Se.id))) == null ? void 0 : _a3.id;
    if (!j) return;
    const A = h.querySelector(`button[data-toc-id="${j}"]`);
    if (!A) return;
    const Q = h.getBoundingClientRect(), K = A.getBoundingClientRect();
    K.top >= Q.top + 8 && K.bottom <= Q.bottom - 8 || (te.current = true, A.scrollIntoView({ block: "nearest" }), pe.current && window.clearTimeout(pe.current), pe.current = window.setTimeout(() => {
      te.current = false;
    }, 120));
  }, [B, $, ye]), d.useEffect(() => () => {
    pe.current && window.clearTimeout(pe.current);
  }, []);
  const mr = d.useCallback((h, j = z.current) => {
    G.current = true, ot({ currentFile: j, editorContent: typeof h == "string" ? h : "" });
  }, []);
  d.useLayoutEffect(() => (G.current = false, () => {
    G.current || ot({ currentFile: z.current, editorContent: O.current ?? "" });
  }), []);
  const On = d.useCallback(() => {
    const h = document.querySelector("[data-export-pdf-pages]");
    !h || h.children.length === 0 || window.print();
  }, []), _n = g !== L, Fn = d.useRef(_n);
  Fn.current = _n;
  const sa = d.useCallback(() => Fn.current, []), { isBlocked: ia, proceed: Xr, reset: oa } = Tl({ isDirty: sa }), Ws = d.useCallback(() => {
    var _a3;
    Fn.current || mr(O.current, z.current);
    const h = ((_a3 = z.current) == null ? void 0 : _a3.id) || x;
    if (h) {
      a(`/view/${h}`);
      return;
    }
    a(-1);
  }, [a, x, mr]), Zt = d.useCallback(async () => {
    if (!(E == null ? void 0 : E.id) || U) return false;
    R(true);
    try {
      Gn(V);
      const h = { ...E, content: g };
      mr(g, h), _(h);
      const j = await rf(E, g);
      return C(g), j.mode === "pending-only" && alert("\uC138\uC158 \uB178\uD2B8\uB294 \uB4A4\uB85C \uAC00\uBA74 \uD3B8\uC9D1\uAE30\uC5D0 \uBC18\uC601\uB429\uB2C8\uB2E4."), true;
    } catch (h) {
      return alert(`\uC800\uC7A5 \uC2E4\uD328: ${(h == null ? void 0 : h.message) || h}`), false;
    } finally {
      R(false);
    }
  }, [E, U, g, V, mr]), aa = d.useCallback(async () => {
    await Zt() && Xr();
  }, [Zt, Xr]), la = d.useCallback(() => {
    mr(L, E), Xr();
  }, [E, Xr, L, mr]);
  d.useEffect(() => {
    const h = (j) => {
      !(j.ctrlKey || j.metaKey) || j.key.toLowerCase() !== "s" || (j.preventDefault(), Zt());
    };
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }, [Zt]);
  const ca = d.useCallback((h) => {
    Gr(h);
  }, [Gr]);
  d.useEffect(() => {
    const h = Be.current;
    if (!h) return;
    const j = '.export-pdf-cover, [data-note-cover="1"]', A = (K) => {
      var _a3, _b2, _c3;
      const ce = K.target;
      if (ce instanceof Element && ce.closest(j)) return true;
      if (typeof K.composedPath == "function") {
        for (const je of K.composedPath()) if (je instanceof Element && ((_a3 = je.matches) == null ? void 0 : _a3.call(je, j))) return true;
      }
      if ((_c3 = (_b2 = document.elementFromPoint(K.clientX, K.clientY)) == null ? void 0 : _b2.closest) == null ? void 0 : _c3.call(_b2, j)) return true;
      for (const je of h.querySelectorAll(j)) {
        const be = je.getBoundingClientRect();
        if (K.clientX >= be.left && K.clientX <= be.right && K.clientY >= be.top && K.clientY <= be.bottom) return true;
      }
      return false;
    }, Q = (K) => {
      var _a3, _b2, _c3, _d3;
      if (A(K) || K.ctrlKey) return;
      const ce = P.current && ((_b2 = (_a3 = K.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-export-pdf-pages]")) ? P.current : v.current;
      if (!ce) return;
      const Se = (_d3 = (_c3 = K.target) == null ? void 0 : _c3.closest) == null ? void 0 : _d3.call(_c3, "img[data-wiki-path], img[data-md-src]");
      if (Se && ce.contains(Se)) {
        const je = Kl(Se);
        if (!je.kind || !je.key) return;
        K.preventDefault();
        const be = je.kind === "wiki" ? Gl(ce, Se, je.key) : Xl(ce, Se, je.key);
        Ee({ kind: je.kind, key: je.key, width: je.width, height: je.height, occurrence: be, imageSrc: Se.currentSrc || Se.src || "" });
      }
    };
    return h.addEventListener("contextmenu", Q), () => h.removeEventListener("contextmenu", Q);
  }, []);
  const da = d.useCallback(({ width: h, height: j }) => {
    const A = ee;
    if (!(A == null ? void 0 : A.key)) return;
    const Q = A.kind === "wiki" ? Xn(g, { path: A.key, occurrence: A.occurrence ?? 0, width: h, height: j }) : Un(g, { src: A.key, occurrence: A.occurrence ?? 0, width: h, height: j });
    !Q.updated || Q.markdown === g || (k(Q.markdown), ot({ currentFile: E, editorContent: Q.markdown }));
  }, [E, g, ee]), ua = d.useCallback(async ({ file: h }) => {
    const j = ee;
    if (!(j == null ? void 0 : j.key)) throw new Error("\uC790\uB97C \uC774\uBBF8\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    const A = await jr(h, E), Q = j.kind === "wiki" ? Rl(g, { path: j.key, occurrence: j.occurrence ?? 0, nextPath: A }) : ei(g, { src: j.key, occurrence: j.occurrence ?? 0, nextPath: A });
    !Q.updated || Q.markdown === g || (k(Q.markdown), ot({ currentFile: E, editorContent: Q.markdown }));
  }, [E, g, ee]), fa = d.useCallback(async ({ width: h, height: j }) => {
    const A = ee;
    if (!(A == null ? void 0 : A.key) || A.kind !== "markdown") throw new Error("\uBCC0\uD658\uD560 \uC774\uBBF8\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    const Q = await Ml({ markdownSrc: A.key, displaySrc: A.imageSrc, currentNotePath: (E == null ? void 0 : E.id) ?? null });
    let K = "";
    if (Q.mode === "path") K = Q.path;
    else if (K = await jr(Q.file, E), !K) throw new Error("\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    const ce = ei(g, { src: A.key, occurrence: A.occurrence ?? 0, nextPath: K, width: h, height: j });
    if (!ce.updated || ce.markdown === g) throw new Error("\uB9C8\uD06C\uB2E4\uC6B4\uC5D0\uC11C \uD574\uB2F9 \uC774\uBBF8\uC9C0\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    k(ce.markdown), ot({ currentFile: E, editorContent: ce.markdown });
  }, [E, g, ee]), pa = d.useCallback(async ({ width: h, height: j }) => {
    const A = ee;
    if (!(A == null ? void 0 : A.key) || !(A == null ? void 0 : A.kind)) throw new Error("\uBCC0\uD658\uD560 \uC774\uBBF8\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    const Q = f();
    if (!Q) throw new Error("ImgBB API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uD0A4\uB97C \uC800\uC7A5\uD558\uC138\uC694.");
    const K = Ll({ path: A.key, imageSrc: A.imageSrc });
    if (!K) throw new Error("\uC5C5\uB85C\uB4DC\uD560 \uC774\uBBF8\uC9C0 \uC18C\uC2A4\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    const Se = (await zl({ apiKey: Q, image: K, name: Al(A.key) ? "image" : void 0 })).url, je = A.occurrence ?? 0;
    let be = g;
    const nt = A.kind === "wiki" ? Xn(be, { path: A.key, occurrence: je, width: h, height: j }) : Un(be, { src: A.key, occurrence: je, width: h, height: j });
    nt.updated && (be = nt.markdown);
    const ut = await Il(be, { kind: A.kind === "wiki" ? "wiki" : "markdown", key: A.key, occurrence: je }, Se);
    if (!ut.updated && be === g) throw new Error("\uB9C8\uD06C\uB2E4\uC6B4\uC5D0\uC11C \uD574\uB2F9 \uC774\uBBF8\uC9C0\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    k(ut.markdown), ot({ currentFile: E, editorContent: ut.markdown });
  }, [E, f, g, ee]), dt = d.useCallback((h) => {
    const j = Be.current;
    if (!j || !(h == null ? void 0 : h.kind) || !(h == null ? void 0 : h.key)) return null;
    const A = h.kind === "wiki" ? "img[data-wiki-path]" : "img[data-md-src]";
    return [...j.querySelectorAll(A)].filter((ce) => (h.kind === "wiki" ? ce.getAttribute("data-wiki-path") : ce.getAttribute("data-md-src")) === h.key)[h.occurrence ?? 0] ?? null;
  }, []), ma = d.useCallback(() => {
    const h = ee;
    if (!(h == null ? void 0 : h.kind) || !(h == null ? void 0 : h.key)) return;
    const j = dt(h);
    if (!j) return;
    const A = j.getBoundingClientRect(), Q = Math.max(24, Math.round(A.width)), K = Math.max(24, Math.round(A.height)), ce = { kind: h.kind, key: h.key, occurrence: h.occurrence ?? 0, widthPx: Q, heightPx: K, originalWidthPx: Q, originalHeightPx: K };
    j.style.width = `${Q}px`, j.style.height = `${K}px`, j.setAttribute("data-print-free-transform", "1"), Xe.current = ce, Qe(ce), Le(false);
  }, [dt, ee]);
  d.useEffect(() => {
    if (!Te) {
      xe(null);
      return;
    }
    const h = dt(Te);
    if (!h) {
      Qe(null), xe(null);
      return;
    }
    let j = 0;
    const A = () => {
      const Q = h.getBoundingClientRect();
      xe({ left: Q.left, top: Q.top, width: Q.width, height: Q.height }), j = requestAnimationFrame(A);
    };
    return j = requestAnimationFrame(A), () => cancelAnimationFrame(j);
  }, [Te, dt]), d.useEffect(() => {
    if (!Te) return;
    const h = dt(Te);
    if (!h) return;
    const j = (K) => {
      var _a3, _b2;
      const ce = (_b2 = (_a3 = K.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]");
      if (!ce) return;
      K.preventDefault();
      const Se = ce.getAttribute("data-transform-handle");
      if (!Se) return;
      const je = K.pointerType === "touch", be = Xe.current || Te, nt = K.clientX, ut = K.clientY, wt = be.heightPx > 0 ? be.widthPx / be.heightPx : 1, Yr = (Mr) => {
        const Vr = Mr.clientX - nt, Ks = Mr.clientY - ut;
        let st = be.widthPx, it = be.heightPx;
        if (Se.includes("e") && (st = be.widthPx + Vr), Se.includes("w") && (st = be.widthPx - Vr), Se.includes("s") && (it = be.heightPx + Ks), Se.includes("n") && (it = be.heightPx - Ks), st = Math.max(24, st), it = Math.max(24, it), je || Mr.shiftKey) {
          const wa = Math.abs((st - be.widthPx) / Math.max(1, be.widthPx)), ya = Math.abs((it - be.heightPx) / Math.max(1, be.heightPx));
          wa >= ya ? it = Math.max(24, st / Math.max(1e-4, wt)) : st = Math.max(24, it * wt);
        }
        st = Math.max(24, Math.round(st)), it = Math.max(24, Math.round(it)), h.style.width = `${st}px`, h.style.height = `${it}px`;
        const Gs = { ...Xe.current || be, widthPx: st, heightPx: it };
        Xe.current = Gs, Qe(Gs);
      }, Jt = () => {
        document.removeEventListener("pointermove", Yr, true), document.removeEventListener("pointerup", Jt, true);
      };
      document.addEventListener("pointermove", Yr, true), document.addEventListener("pointerup", Jt, true);
    }, A = (K) => {
      var _a3, _b2, _c3, _d3;
      const ce = (_b2 = (_a3 = K.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]"), Se = (_d3 = (_c3 = K.target) == null ? void 0 : _c3.closest) == null ? void 0 : _d3.call(_c3, "img[data-wiki-path], img[data-md-src]");
      ce || Se === h || Le(true);
    }, Q = (K) => {
      if (K.key !== "Enter") return;
      const ce = K.target;
      ce instanceof Element && ce.closest('[data-advanced-search], [role="dialog"], [role="combobox"], input, textarea') || (K.preventDefault(), Le(true));
    };
    return document.addEventListener("pointerdown", j, true), document.addEventListener("pointerdown", A, true), document.addEventListener("keydown", Q, true), () => {
      document.removeEventListener("pointerdown", j, true), document.removeEventListener("pointerdown", A, true), document.removeEventListener("keydown", Q, true);
    };
  }, [Te, dt]);
  const ha = d.useCallback(() => {
    var _a3;
    const h = Xe.current || Te;
    if (!(h == null ? void 0 : h.key)) return;
    const j = `${Math.round(h.widthPx)}px`, A = `${Math.round(h.heightPx)}px`, Q = h.kind === "wiki" ? Xn(g, { path: h.key, occurrence: h.occurrence ?? 0, width: j, height: A }) : Un(g, { src: h.key, occurrence: h.occurrence ?? 0, width: j, height: A });
    Q.updated && Q.markdown !== g && (k(Q.markdown), ot({ currentFile: E, editorContent: Q.markdown })), (_a3 = dt(h)) == null ? void 0 : _a3.removeAttribute("data-print-free-transform"), Qe(null), Xe.current = null, Le(false);
  }, [E, dt, Te, g]), xa = d.useCallback(() => {
    const h = Me;
    if (!h) return;
    const j = O.current ?? "", A = Bo(j, h.headingText || "", 0, h.headingIndex);
    A.updated && A.markdown !== j && (k(A.markdown), ot({ currentFile: z.current, editorContent: A.markdown })), Ke(null);
  }, [Me]), ga = d.useCallback(() => {
    const h = Xe.current || Te;
    if (!h) return;
    const j = dt(h);
    j && (j.style.width = `${h.originalWidthPx}px`, j.style.height = `${h.originalHeightPx}px`, j.removeAttribute("data-print-free-transform")), Qe(null), Xe.current = null, Le(false);
  }, [dt, Te]), Ur = d.useCallback((h) => {
    ie((j) => {
      const A = { ...j, ...h };
      return Gn(A), A;
    }), h.pageSizeId && oe && h.pageSizeId !== oe.pageSizeId && $n({ ...oe, pageSizeId: h.pageSizeId });
  }, [oe, $n]);
  d.useEffect(() => {
    const h = { "print-save": () => {
      Zt();
    }, "print-font-settings": () => de(true), "print-export": () => On(), "print-toggle-toc": () => q((j) => !j), "print-view-scroll": () => Je({ navigation: "scroll" }), "print-view-flip": () => Je({ navigation: "flip" }), "print-view-pages-1": () => Je({ pages: 1 }), "print-view-pages-2": () => Je({ pages: 2 }), "print-toggle-first-page-single": () => {
      at((j) => {
        const A = { ...j, firstPageSingle: !j.firstPageSingle };
        return zr(A), A;
      });
    }, "print-zoom-in": () => {
      at((j) => {
        const A = { ...j, zoomPercent: $r(j.zoomPercent, 1) };
        return zr(A), A;
      });
    }, "print-zoom-out": () => {
      at((j) => {
        const A = { ...j, zoomPercent: $r(j.zoomPercent, -1) };
        return zr(A), A;
      });
    }, "print-zoom-reset": () => Je({ zoomPercent: 100 }), "print-cover-place-text": () => {
      we || Rr(), Ve((j) => (j == null ? void 0 : j.kind) === "text" ? null : { kind: "text" });
    }, "print-cover-place-rect": () => {
      we || Rr(), Ve((j) => (j == null ? void 0 : j.kind) === "shape" && j.shapeType === "rect" ? null : { kind: "shape", shapeType: "rect" });
    }, "print-cover-place-ellipse": () => {
      we || Rr(), Ve((j) => (j == null ? void 0 : j.kind) === "shape" && j.shapeType === "ellipse" ? null : { kind: "shape", shapeType: "ellipse" });
    }, "print-cover-font-size-up": () => {
      if (!we || !oe || !ze.length) return;
      const j = gs(oe, ze, 1);
      j !== oe && Tt(j);
    }, "print-cover-font-size-down": () => {
      if (!we || !oe || !ze.length) return;
      const j = gs(oe, ze, -1);
      j !== oe && Tt(j);
    }, "print-cover-text-align-left": () => {
      if (!we || !oe || !ze.length) return;
      const j = un(oe, ze, "left");
      j !== oe && Tt(j);
    }, "print-cover-text-align-center": () => {
      if (!we || !oe || !ze.length) return;
      const j = un(oe, ze, "center");
      j !== oe && Tt(j);
    }, "print-cover-text-align-right": () => {
      if (!we || !oe || !ze.length) return;
      const j = un(oe, ze, "right");
      j !== oe && Tt(j);
    } };
    for (const j of os) h[Dl(j.id)] = () => {
      Ur({ pageSizeId: j.id });
    };
    return $l(h);
  }, [Zt, On, Ur, Je, we, Rr, oe, ze, Tt]), d.useEffect(() => Ol(({ headingId: h }) => {
    Gr(h);
  }), [Gr]), d.useEffect(() => _l(() => B.map((h) => ({ id: h.id, text: h.text, level: h.level }))), [B]), d.useEffect(() => {
    const h = Be.current;
    if (!h) return;
    const j = (A) => {
      if (!(A.ctrlKey || A.metaKey)) return;
      A.preventDefault();
      const Q = A.deltaY < 0 ? 1 : -1;
      at((K) => {
        const ce = { ...K, zoomPercent: $r(K.zoomPercent, Q) };
        return zr(ce), ce;
      });
    };
    return h.addEventListener("wheel", j, { passive: false }), () => h.removeEventListener("wheel", j);
  }, [rt]), jo(rt, true, { middleClick: !!we });
  const ba = { ...Fl(V), "--print-font-body": en(((_a2 = fr.fonts) == null ? void 0 : _a2.body) || I.body), "--print-font-heading": en(((_b = fr.fonts) == null ? void 0 : _b.heading) || I.heading), "--print-font-bold": en(((_c2 = fr.fonts) == null ? void 0 : _c2.bold) || I.bold), "--print-font-code": en(((_d2 = fr.fonts) == null ? void 0 : _d2.code) || I.code, "mono") };
  return s ? t.jsx("div", { className: "flex h-full min-h-0 flex-col items-center justify-center gap-3 bg-neutral-200 px-4 dark:bg-neutral-800", children: t.jsx("p", { className: "text-sm text-gray-600 dark:text-odp-fg", children: "\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\u2026" }) }) : !i && b == null && !x && !g ? t.jsxs("div", { className: "flex h-full min-h-0 flex-col items-center justify-center gap-3 bg-neutral-200 px-4 dark:bg-neutral-800", children: [t.jsx("p", { className: "text-sm text-gray-600 dark:text-odp-fg", children: "\uC778\uC1C4 \uBBF8\uB9AC\uBCF4\uAE30 \uC138\uC158\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uD3B8\uC9D1\uAE30\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694." }), t.jsxs("button", { type: "button", onClick: Ws, className: "inline-flex items-center gap-2 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg", children: [t.jsx(ti, { size: 18 }), "\uB4A4\uB85C \uAC00\uAE30"] })] }) : t.jsxs("div", { className: "export-pdf-page flex flex-col h-full min-h-0 overflow-hidden print:h-auto print:min-h-0 print:overflow-visible bg-neutral-200 dark:bg-neutral-800 print:bg-white min-w-0", style: ba, children: [fr.webfontCss ? t.jsx("style", { "data-s3haim-document-webfonts": "1", children: fr.webfontCss }) : null, t.jsx("style", { children: Rf }), t.jsx("style", { children: Bl(V.pageSizeId) }), t.jsxs("div", { ref: bt, className: "sticky top-0 z-20 flex flex-col gap-2 px-4 py-3 border-b border-gray-200 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft shrink-0 print:hidden", children: [t.jsxs("div", { className: "flex items-center justify-between gap-4", children: [t.jsxs("button", { type: "button", onClick: Ws, "data-print-toolbar": "back", className: "flex items-center gap-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg px-3 py-2 rounded transition", "aria-label": "\uB4A4\uB85C \uAC00\uAE30", children: [t.jsx(ti, { size: 18 }), "\uB4A4\uB85C \uAC00\uAE30"] }), t.jsx("h2", { className: "font-semibold text-gray-800 dark:text-odp-fg truncate flex-1 text-center", children: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30" }), t.jsxs("div", { className: "flex items-center gap-2", children: [t.jsxs("button", { type: "button", onClick: () => de(true), "data-print-toolbar": "font", className: "flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg rounded transition", "aria-label": "\uD3F0\uD2B8 \uC124\uC815", children: [t.jsx(xc, { size: 16 }), "\uD3F0\uD2B8 \uC124\uC815"] }), t.jsxs("button", { type: "button", onClick: Zt, "data-print-toolbar": "save", disabled: !(E == null ? void 0 : E.id) || U || !_n, className: "inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded transition disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-600 hover:bg-blue-700", "aria-label": "\uC800\uC7A5", title: "\uC774\uBBF8\uC9C0 \uD06C\uAE30\uC640 \uD398\uC774\uC9C0 \uB098\uB204\uAE30\uB97C \uB178\uD2B8\uC5D0 \uC800\uC7A5 (Ctrl+S)", children: [t.jsx(gc, { size: 16 }), U ? "\uC800\uC7A5 \uC911\u2026" : "\uC800\uC7A5"] }), t.jsxs("button", { type: "button", className: "md-editor-btn inline-flex items-center gap-1.5", "data-print-toolbar": "export", onClick: On, "aria-label": "\uB0B4\uBCF4\uB0B4\uAE30", children: [t.jsx(bc, { size: 16 }), "\uB0B4\uBCF4\uB0B4\uAE30"] })] })] }), t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-x-4 gap-y-2", children: [t.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2", children: [t.jsxs("button", { type: "button", onClick: Rr, "data-print-toolbar": "cover", className: `flex items-center gap-1.5 px-3 py-2 text-sm rounded transition ${we ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200" : "text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg"}`, "aria-label": Kr ? "\uD45C\uC9C0 \uD3B8\uC9D1" : "\uD45C\uC9C0 \uCD94\uAC00", "aria-pressed": we, title: Kr ? "\uD45C\uC9C0 \uD3B8\uC9D1" : "\uD45C\uC9C0 \uCD94\uAC00", children: [t.jsx(wc, { size: 16 }), Kr ? "\uD45C\uC9C0 \uD3B8\uC9D1" : "\uD45C\uC9C0 \uCD94\uAC00"] }), t.jsx(xd, { value: V.pageSizeId, onValueChange: (h) => Ur({ pageSizeId: h }) }), t.jsx(yd, { value: In, disabled: Dn, onValueChange: (h) => {
    Je({ navigation: h }), lt(0);
  } }), t.jsx(vd, { value: pr, disabled: Dn, onValueChange: (h) => {
    Je({ pages: h }), lt(0);
  } }), pr === 2 && !Dn ? t.jsx(wd, { checked: Ge.firstPageSingle, onCheckedChange: (h) => {
    Je({ firstPageSingle: h }), lt(0);
  } }) : null, t.jsx(qd, { value: Ge.zoomPercent, onChange: (h) => Je({ zoomPercent: h }) }), t.jsx(hd, { maxWidth: V.imageMaxWidth, maxHeight: V.imageMaxHeight, widthFallback: `${ne.widthPx}px`, heightFallback: `${ne.heightPx}px`, onChange: ({ maxWidth: h, maxHeight: j }) => Ur({ imageMaxWidth: h, imageMaxHeight: j }) })] }), t.jsxs("button", { type: "button", onClick: () => q((h) => !h), "data-print-toolbar": "toc", className: "flex shrink-0 items-center gap-1.5 px-3 py-2 text-sm text-gray-600 dark:text-odp-fg hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-odp-focusBg rounded transition", "aria-label": $ ? "\uBAA9\uCC28 \uC228\uAE30\uAE30" : "\uBAA9\uCC28 \uBCF4\uC774\uAE30", "aria-pressed": $, title: $ ? "\uBAA9\uCC28 \uC228\uAE30\uAE30" : "\uBAA9\uCC28 \uBCF4\uC774\uAE30", children: [t.jsx(yc, { size: 16 }), "\uBAA9\uCC28"] })] })] }), t.jsxs("div", { className: "relative flex min-h-0 flex-1 flex-col", style: { "--export-toc-width": `${Ze}px`, "--export-cover-sidebar-width": `${Xo}px` }, children: [t.jsxs("div", { ref: m, className: `export-pdf-preview-scroll relative px-4 py-6 min-h-0 flex-1 bg-neutral-200 dark:bg-neutral-800 text-gray-900 print:bg-white print:h-auto print:max-h-none print:overflow-visible print:p-0 ${ct ? "overflow-auto" : "overflow-hidden"} ${$ ? "md:pr-(--export-toc-width)" : ""} ${we ? "md:pl-(--export-cover-sidebar-width)" : ""}`, children: [ct ? null : t.jsx("div", { className: `absolute inset-0 print:hidden ${$ ? "md:right-(--export-toc-width)" : ""}`, children: t.jsx(Xd, { navigation: In, pages: pr, firstPageSingle: Ge.firstPageSingle, zoomPercent: Ge.zoomPercent, onZoomChange: Yo, pageSizeId: V.pageSizeId, bodyPageCount: J, pagesHostRef: P, packLayoutKey: W, hasCover: !!(oe == null ? void 0 : oe.enabled), coverNode: (oe == null ? void 0 : oe.enabled) ? t.jsx(cn, { cover: oe, getPresignedUrl: Tr, className: "h-full w-full shadow-none" }) : null, flipIndex: cr, onFlipIndexChange: lt, onVisibleLogicalPagesChange: dr }) }), t.jsxs("div", { className: `export-pdf-cover-stack mx-auto w-full print:mx-0 ${ct ? "" : "export-pdf-source-measure"}`, style: ct ? { zoom: Ge.zoomPercent / 100 } : void 0, "aria-hidden": ct ? void 0 : true, children: [(oe == null ? void 0 : oe.enabled) || we ? we && oe ? t.jsxs(t.Fragment, { children: [t.jsx("div", { ref: M, children: t.jsx(ui, { showPageMarker: Fs && ct, className: "mx-auto w-fit max-w-full", children: t.jsx(bu, { cover: oe, selectedIds: ze, onSelectIds: et, onChange: Tt, getPresignedUrl: Tr, currentFile: E, centerSnapEnabled: ht, centerSnapTolerance: tt, objectSnapEnabled: $e, objectSnapTolerance: xt, textContainerOutlineEnabled: ir, placePreviewEnabled: ar, placeMode: X, onPlaceModeChange: Ve, onUndo: Bs, onRedo: Hs, className: "mx-auto print:hidden print:mx-0" }) }) }), oe.enabled ? t.jsx(cn, { cover: oe, getPresignedUrl: Tr, className: "mx-auto hidden shadow-none print:block print:mx-0" }) : null] }) : (oe == null ? void 0 : oe.enabled) ? t.jsx("div", { ref: M, children: t.jsx(ui, { showPageMarker: ct, className: "mx-auto w-fit max-w-full", children: t.jsx(cn, { cover: oe, getPresignedUrl: Tr, className: "mx-auto shadow-[0_8px_28px_rgba(15,23,42,0.12)] print:shadow-none print:mx-0" }) }) }) : null : null, t.jsx("div", { ref: P, "data-export-pdf-pages": "1", className: "export-pdf-pages w-full" }), t.jsxs("div", { className: "export-pdf-paper export-pdf-staging relative mx-auto bg-white text-gray-900 print:hidden", style: { width: "var(--print-page-width)", minHeight: "var(--print-page-height)", padding: "var(--print-page-margin)", position: "absolute", left: 0, top: 0, visibility: "hidden", pointerEvents: "none", zIndex: -1 }, "aria-hidden": true, children: [t.jsx("div", { ref: ae, className: "export-pdf-paper-metric pointer-events-none absolute top-0 left-0 -z-10 w-px opacity-0", "aria-hidden": true }), t.jsxs("div", { ref: v, className: "export-pdf-paper-content relative", children: [t.jsx("div", { ref: F, className: "pointer-events-none absolute top-0 left-0 -z-10 opacity-0", style: { width: "var(--print-img-max-width)", height: "var(--print-img-max-height)" }, "aria-hidden": true }), t.jsx(ja, { id: Di, theme: "light", language: "ko-KR", codeTheme: Wl, customIcon: Hl, value: Wr, mdHeadingId: $i, noMermaid: true, codeFoldable: false, showCodeRowNumber: false }, `footnotes-${Cr}`)] })] })] })] }), t.jsx(Qd, { pagesHostRef: P, scrollRef: Be, coverRef: M, hasCover: Fs, bodyPageCount: J, overridePages: ct ? null : qe }), we && oe ? t.jsx(_u, { cover: oe, selectedIds: ze, onSelectIds: et, onChange: Tt, currentFile: E, topPx: T, width: Pr, isResizing: Ho, resizeHandleProps: Wo, layersDetached: Pt, onLayersDetachedChange: na, layersWidth: $s, layersIsResizing: Ko, layersResizeHandleProps: Go, centerSnapEnabled: ht, onCenterSnapEnabledChange: Zo, centerSnapTolerance: tt, onCenterSnapToleranceChange: Jo, objectSnapEnabled: $e, onObjectSnapEnabledChange: Qo, objectSnapTolerance: xt, onObjectSnapToleranceChange: ea, textContainerOutlineEnabled: ir, onTextContainerOutlineEnabledChange: ta, placePreviewEnabled: ar, onPlacePreviewEnabledChange: ra, placeMode: X, onPlaceModeChange: Ve, canUndo: Vo, canRedo: qo, onUndo: Bs, onRedo: Hs }) : null, $ && t.jsxs("aside", { className: "hidden md:flex fixed right-0 bottom-0 border-l border-gray-200 dark:border-odp-borderSoft bg-white/95 dark:bg-odp-bgSoft/95 backdrop-blur-sm z-30 print:hidden", style: { top: T, width: Ze }, children: [t.jsx(Vi, { handleProps: ur, isResizing: Oe, visibleOnHover: true, label: "\uBAA9\uCC28 \uB108\uBE44 \uC870\uC808" }), t.jsxs("div", { className: "relative flex flex-col w-full min-h-0 p-2 pl-2.5", children: [t.jsxs("div", { className: "flex items-center justify-between gap-2 px-1.5 py-1", children: [t.jsx("div", { className: "text-xs font-semibold tracking-wide text-gray-700 dark:text-odp-fgStrong uppercase", children: "\uBAA9\uCC28" }), t.jsx(Gc, { checked: re, onChange: Y, isDark: typeof document < "u" && document.documentElement.classList.contains("dark") })] }), t.jsx("ul", { ref: ge, onScroll: () => {
    te.current || (ve.current = Date.now() + 900);
  }, onWheel: () => {
    ve.current = Date.now() + 900;
  }, onTouchMove: () => {
    ve.current = Date.now() + 900;
  }, className: "mt-1 flex-1 min-h-0 overflow-y-auto space-y-1", children: B.length === 0 ? t.jsx("li", { className: "px-1.5 text-xs text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC5C6\uC74C" }) : B.map((h, j) => t.jsx("li", { style: { paddingLeft: `${Math.min(h.level - 1, 5) * 0.45}rem` }, children: t.jsxs("button", { type: "button", "data-toc-id": h.id, onClick: () => ca(h.id), onContextMenu: (A) => {
    A.preventDefault();
    const Q = String(h.id || "").match(/^pdf-ex-heading-(\d+)$/i), K = (Q == null ? void 0 : Q[1]) ? Number(Q[1]) : null, ce = Number.isInteger(K) && K >= 1 ? K : j + 1;
    Ke({ headingIndex: ce, headingText: h.text || "" });
  }, className: `group relative w-full text-left rounded px-1.5 py-1 text-sm transition ${Wc(re)} ${ye.includes(h.id) ? "font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-odp-focusBg" : "text-gray-700 dark:text-odp-fg hover:bg-gray-100 dark:hover:bg-odp-focusBg"}`, title: h.text, children: [t.jsx("span", { className: `absolute left-0 w-0.5 rounded ${re ? "top-2 h-4" : "top-1/2 h-4 -translate-y-1/2"} ${ye.includes(h.id) ? "bg-red-500" : "bg-transparent"}`, "aria-hidden": true }), h.text] }) }, `${h.id}-${j}`)) })] })] })] }), t.jsx(md, { isOpen: ke, onClose: () => de(false), fonts: I, onFontsChange: (h) => se(h) }), t.jsx(Kc, { isOpen: !!ee, onClose: () => Ee(null), path: (ee == null ? void 0 : ee.key) ?? "", kind: (ee == null ? void 0 : ee.kind) ?? "wiki", initialWidth: (ee == null ? void 0 : ee.width) ?? "", initialHeight: (ee == null ? void 0 : ee.height) ?? "", imageSrc: (ee == null ? void 0 : ee.imageSrc) ?? "", onApply: da, onStartFreeTransform: ma, onCrop: ua, onConvertToWiki: fa, onConvertToImgbb: pa }, ee ? `${ee.kind}|${ee.key}|${ee.width ?? ""}|${ee.height ?? ""}|${ee.occurrence ?? 0}` : "wiki-image-size-modal"), t.jsx(Dc, { containerRef: Be, getMarkdown: () => O.current ?? "", setMarkdown: (h) => k(h) }), Te && Z && t.jsx("div", { className: "fixed z-70 pointer-events-none border-2 border-blue-500 print:hidden", style: { left: `${Z.left}px`, top: `${Z.top}px`, width: `${Z.width}px`, height: `${Z.height}px` }, children: ["nw", "ne", "sw", "se"].map((h) => t.jsx("button", { type: "button", "data-transform-handle": h, className: "absolute pointer-events-auto h-3 w-3 rounded-full bg-blue-600 border border-white", style: { left: h.includes("w") ? "-7px" : "auto", right: h.includes("e") ? "-7px" : "auto", top: h.includes("n") ? "-7px" : "auto", bottom: h.includes("s") ? "-7px" : "auto", cursor: h === "nw" || h === "se" ? "nwse-resize" : "nesw-resize" }, "aria-label": `transform-${h}` }, h)) }), Te && t.jsxs("button", { type: "button", onClick: () => Le(true), className: "fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm print:hidden", children: [t.jsx("span", { className: "block font-semibold mb-1", children: "\uC774\uBBF8\uC9C0 \uC790\uC720\uBCC0\uD615 \uC548\uB0B4" }), t.jsx("span", { className: "block", children: "- Shift + \uB4DC\uB798\uADF8: \uC6D0\uBCF8 \uBE44\uC728 \uC720\uC9C0 / \uC77C\uBC18 \uB4DC\uB798\uADF8: \uBE44\uC728 \uBB34\uC2DC" }), t.jsx("span", { className: "block", children: "- \uD130\uCE58 \uB4DC\uB798\uADF8: \uC6D0\uBCF8 \uBE44\uC728 \uC720\uC9C0" }), t.jsx("span", { className: "block", children: "- \uB2E4\uB978 \uACF3 \uD074\uB9AD(\uC774 \uD1A0\uC2A4\uD2B8 \uD3EC\uD568): \uBCC0\uD615 \uC644\uB8CC \uD655\uC778" })] }), t.jsx(vr, { isOpen: ia, title: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uBCC0\uACBD\uC0AC\uD56D", message: "\uC800\uC7A5\uD558\uC9C0 \uC54A\uC740 \uBCC0\uACBD\uC0AC\uD56D\uC774 \uC788\uC2B5\uB2C8\uB2E4. \uC774\uB3D9\uD558\uBA74 \uBCC0\uACBD\uC0AC\uD56D\uC774 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4.", confirmLabel: "\uC800\uC7A5 \uD6C4 \uC774\uB3D9", cancelLabel: "\uCDE8\uC18C", discardLabel: "\uC800\uC7A5 \uC548 \uD558\uACE0 \uC774\uB3D9", onConfirm: () => {
    aa();
  }, onCancel: oa, onDiscard: la, confirmDisabled: !(E == null ? void 0 : E.id) || U }), t.jsx(vr, { isOpen: Sr, title: "\uC790\uC720\uBCC0\uD615 \uC800\uC7A5", message: "\uD604\uC7AC \uBCC0\uD615\uC744 \uC5B4\uB5BB\uAC8C \uCC98\uB9AC\uD560\uAE4C\uC694?", confirmLabel: "\uC801\uC6A9", cancelLabel: "\uACC4\uC18D \uC218\uC815", discardLabel: "\uBCC0\uD615 \uCD08\uAE30\uD654", onConfirm: ha, onCancel: () => Le(false), onDiscard: ga }), t.jsx(vr, { isOpen: !!Me, title: "\uD398\uC774\uC9C0 \uB098\uB204\uAE30 \uC0BD\uC785", message: `\uC544\uB798 heading \uC55E\uC5D0 <pgbr/> \uB97C \uC0BD\uC785\uD569\uB2C8\uB2E4.

${(Me == null ? void 0 : Me.headingText) || "(\uC81C\uBAA9 \uD14D\uC2A4\uD2B8 \uC5C6\uC74C)"}`, confirmLabel: "\uC0BD\uC785", cancelLabel: "\uCDE8\uC18C", onConfirm: xa, onCancel: () => Ke(null) }), t.jsx(Nf, { containerEl: rt, containerRef: Be, paperContentRef: v, getMarkdown: () => O.current ?? "", setMarkdown: (h) => {
    k(h), ot({ currentFile: z.current, editorContent: h });
  } }), t.jsx($c, { containerRef: Be, rootEl: rt })] });
}
export {
  qf as default
};
