import { c as V } from "./vendor-react-aria-Bh-vrwqW.js";
import { e as on, g as te, r as D, R as P } from "./vendor-react-BLJzfvPB.js";
import { S as Cg, s as Rg, a as Mg, b as kg, c as Dg, d as Ng, e as qg, f as cy, g as Oc, h as Bg, i as Lg, j as Fg, k as Wg, l as zg, m as Kg, n as Gg, o as xc, p as Hg, q as Ug, r as mr, t as Vg, u as Xg, v as Yg, w as Zg, x as Jg, y as Qg, z as eb, A as tb, B as rb, C as nb, D as ab, E as ib, F as ob, G as ub, H as cb, I as sb, J as lb, K as fb, L as pb, M as db, N as vb, O as hb, P as un, Q as yb, R as mb, T as gb, U as bb, V as Ob, W as xb, X as wb, Y as sy, Z as Ab, _ as Sb, $ as Pb, a0 as _b, a1 as Eb, a2 as jb } from "./vendor-mermaid-BabYrQ_n.js";
import { d as Tb } from "./vendor-tiptap-B9z9WF3R.js";
var Ea, ll;
function xe() {
  if (ll) return Ea;
  ll = 1;
  var t5 = Array.isArray;
  return Ea = t5, Ea;
}
var ja, fl;
function ly() {
  if (fl) return ja;
  fl = 1;
  var t5 = typeof on == "object" && on && on.Object === Object && on;
  return ja = t5, ja;
}
var Ta, pl;
function Ne() {
  if (pl) return Ta;
  pl = 1;
  var t5 = ly(), e = typeof self == "object" && self && self.Object === Object && self, r = t5 || e || Function("return this")();
  return Ta = r, Ta;
}
var Ia, dl;
function Qr() {
  if (dl) return Ia;
  dl = 1;
  var t5 = Ne(), e = t5.Symbol;
  return Ia = e, Ia;
}
var $a, vl;
function Ib() {
  if (vl) return $a;
  vl = 1;
  var t5 = Qr(), e = Object.prototype, r = e.hasOwnProperty, n = e.toString, a = t5 ? t5.toStringTag : void 0;
  function i(o) {
    var u = r.call(o, a), c = o[a];
    try {
      o[a] = void 0;
      var s = true;
    } catch {
    }
    var l = n.call(o);
    return s && (u ? o[a] = c : delete o[a]), l;
  }
  return $a = i, $a;
}
var Ca, hl;
function $b() {
  if (hl) return Ca;
  hl = 1;
  var t5 = Object.prototype, e = t5.toString;
  function r(n) {
    return e.call(n);
  }
  return Ca = r, Ca;
}
var Ra, yl;
function He() {
  if (yl) return Ra;
  yl = 1;
  var t5 = Qr(), e = Ib(), r = $b(), n = "[object Null]", a = "[object Undefined]", i = t5 ? t5.toStringTag : void 0;
  function o(u) {
    return u == null ? u === void 0 ? a : n : i && i in Object(u) ? e(u) : r(u);
  }
  return Ra = o, Ra;
}
var Ma, ml;
function Ue() {
  if (ml) return Ma;
  ml = 1;
  function t5(e) {
    return e != null && typeof e == "object";
  }
  return Ma = t5, Ma;
}
var ka, gl;
function Jt() {
  if (gl) return ka;
  gl = 1;
  var t5 = He(), e = Ue(), r = "[object Symbol]";
  function n(a) {
    return typeof a == "symbol" || e(a) && t5(a) == r;
  }
  return ka = n, ka;
}
var Da, bl;
function $s() {
  if (bl) return Da;
  bl = 1;
  var t5 = xe(), e = Jt(), r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, n = /^\w*$/;
  function a(i, o) {
    if (t5(i)) return false;
    var u = typeof i;
    return u == "number" || u == "symbol" || u == "boolean" || i == null || e(i) ? true : n.test(i) || !r.test(i) || o != null && i in Object(o);
  }
  return Da = a, Da;
}
var Na, Ol;
function Je() {
  if (Ol) return Na;
  Ol = 1;
  function t5(e) {
    var r = typeof e;
    return e != null && (r == "object" || r == "function");
  }
  return Na = t5, Na;
}
var qa, xl;
function Cs() {
  if (xl) return qa;
  xl = 1;
  var t5 = He(), e = Je(), r = "[object AsyncFunction]", n = "[object Function]", a = "[object GeneratorFunction]", i = "[object Proxy]";
  function o(u) {
    if (!e(u)) return false;
    var c = t5(u);
    return c == n || c == a || c == r || c == i;
  }
  return qa = o, qa;
}
var Ba, wl;
function Cb() {
  if (wl) return Ba;
  wl = 1;
  var t5 = Ne(), e = t5["__core-js_shared__"];
  return Ba = e, Ba;
}
var La, Al;
function Rb() {
  if (Al) return La;
  Al = 1;
  var t5 = Cb(), e = (function() {
    var n = /[^.]+$/.exec(t5 && t5.keys && t5.keys.IE_PROTO || "");
    return n ? "Symbol(src)_1." + n : "";
  })();
  function r(n) {
    return !!e && e in n;
  }
  return La = r, La;
}
var Fa, Sl;
function fy() {
  if (Sl) return Fa;
  Sl = 1;
  var t5 = Function.prototype, e = t5.toString;
  function r(n) {
    if (n != null) {
      try {
        return e.call(n);
      } catch {
      }
      try {
        return n + "";
      } catch {
      }
    }
    return "";
  }
  return Fa = r, Fa;
}
var Wa, Pl;
function Mb() {
  if (Pl) return Wa;
  Pl = 1;
  var t5 = Cs(), e = Rb(), r = Je(), n = fy(), a = /[\\^$.*+?()[\]{}|]/g, i = /^\[object .+?Constructor\]$/, o = Function.prototype, u = Object.prototype, c = o.toString, s = u.hasOwnProperty, l = RegExp("^" + c.call(s).replace(a, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function f(p) {
    if (!r(p) || e(p)) return false;
    var v = t5(p) ? l : i;
    return v.test(n(p));
  }
  return Wa = f, Wa;
}
var za, _l;
function kb() {
  if (_l) return za;
  _l = 1;
  function t5(e, r) {
    return e == null ? void 0 : e[r];
  }
  return za = t5, za;
}
var Ka, El;
function mt() {
  if (El) return Ka;
  El = 1;
  var t5 = Mb(), e = kb();
  function r(n, a) {
    var i = e(n, a);
    return t5(i) ? i : void 0;
  }
  return Ka = r, Ka;
}
var Ga, jl;
function Zn() {
  if (jl) return Ga;
  jl = 1;
  var t5 = mt(), e = t5(Object, "create");
  return Ga = e, Ga;
}
var Ha, Tl;
function Db() {
  if (Tl) return Ha;
  Tl = 1;
  var t5 = Zn();
  function e() {
    this.__data__ = t5 ? t5(null) : {}, this.size = 0;
  }
  return Ha = e, Ha;
}
var Ua, Il;
function Nb() {
  if (Il) return Ua;
  Il = 1;
  function t5(e) {
    var r = this.has(e) && delete this.__data__[e];
    return this.size -= r ? 1 : 0, r;
  }
  return Ua = t5, Ua;
}
var Va, $l;
function qb() {
  if ($l) return Va;
  $l = 1;
  var t5 = Zn(), e = "__lodash_hash_undefined__", r = Object.prototype, n = r.hasOwnProperty;
  function a(i) {
    var o = this.__data__;
    if (t5) {
      var u = o[i];
      return u === e ? void 0 : u;
    }
    return n.call(o, i) ? o[i] : void 0;
  }
  return Va = a, Va;
}
var Xa, Cl;
function Bb() {
  if (Cl) return Xa;
  Cl = 1;
  var t5 = Zn(), e = Object.prototype, r = e.hasOwnProperty;
  function n(a) {
    var i = this.__data__;
    return t5 ? i[a] !== void 0 : r.call(i, a);
  }
  return Xa = n, Xa;
}
var Ya, Rl;
function Lb() {
  if (Rl) return Ya;
  Rl = 1;
  var t5 = Zn(), e = "__lodash_hash_undefined__";
  function r(n, a) {
    var i = this.__data__;
    return this.size += this.has(n) ? 0 : 1, i[n] = t5 && a === void 0 ? e : a, this;
  }
  return Ya = r, Ya;
}
var Za, Ml;
function Fb() {
  if (Ml) return Za;
  Ml = 1;
  var t5 = Db(), e = Nb(), r = qb(), n = Bb(), a = Lb();
  function i(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.clear(); ++u < c; ) {
      var s = o[u];
      this.set(s[0], s[1]);
    }
  }
  return i.prototype.clear = t5, i.prototype.delete = e, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, Za = i, Za;
}
var Ja, kl;
function Wb() {
  if (kl) return Ja;
  kl = 1;
  function t5() {
    this.__data__ = [], this.size = 0;
  }
  return Ja = t5, Ja;
}
var Qa, Dl;
function Rs() {
  if (Dl) return Qa;
  Dl = 1;
  function t5(e, r) {
    return e === r || e !== e && r !== r;
  }
  return Qa = t5, Qa;
}
var ei, Nl;
function Jn() {
  if (Nl) return ei;
  Nl = 1;
  var t5 = Rs();
  function e(r, n) {
    for (var a = r.length; a--; ) if (t5(r[a][0], n)) return a;
    return -1;
  }
  return ei = e, ei;
}
var ti, ql;
function zb() {
  if (ql) return ti;
  ql = 1;
  var t5 = Jn(), e = Array.prototype, r = e.splice;
  function n(a) {
    var i = this.__data__, o = t5(i, a);
    if (o < 0) return false;
    var u = i.length - 1;
    return o == u ? i.pop() : r.call(i, o, 1), --this.size, true;
  }
  return ti = n, ti;
}
var ri, Bl;
function Kb() {
  if (Bl) return ri;
  Bl = 1;
  var t5 = Jn();
  function e(r) {
    var n = this.__data__, a = t5(n, r);
    return a < 0 ? void 0 : n[a][1];
  }
  return ri = e, ri;
}
var ni, Ll;
function Gb() {
  if (Ll) return ni;
  Ll = 1;
  var t5 = Jn();
  function e(r) {
    return t5(this.__data__, r) > -1;
  }
  return ni = e, ni;
}
var ai, Fl;
function Hb() {
  if (Fl) return ai;
  Fl = 1;
  var t5 = Jn();
  function e(r, n) {
    var a = this.__data__, i = t5(a, r);
    return i < 0 ? (++this.size, a.push([r, n])) : a[i][1] = n, this;
  }
  return ai = e, ai;
}
var ii, Wl;
function Qn() {
  if (Wl) return ii;
  Wl = 1;
  var t5 = Wb(), e = zb(), r = Kb(), n = Gb(), a = Hb();
  function i(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.clear(); ++u < c; ) {
      var s = o[u];
      this.set(s[0], s[1]);
    }
  }
  return i.prototype.clear = t5, i.prototype.delete = e, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, ii = i, ii;
}
var oi, zl;
function Ms() {
  if (zl) return oi;
  zl = 1;
  var t5 = mt(), e = Ne(), r = t5(e, "Map");
  return oi = r, oi;
}
var ui, Kl;
function Ub() {
  if (Kl) return ui;
  Kl = 1;
  var t5 = Fb(), e = Qn(), r = Ms();
  function n() {
    this.size = 0, this.__data__ = { hash: new t5(), map: new (r || e)(), string: new t5() };
  }
  return ui = n, ui;
}
var ci, Gl;
function Vb() {
  if (Gl) return ci;
  Gl = 1;
  function t5(e) {
    var r = typeof e;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? e !== "__proto__" : e === null;
  }
  return ci = t5, ci;
}
var si, Hl;
function ea() {
  if (Hl) return si;
  Hl = 1;
  var t5 = Vb();
  function e(r, n) {
    var a = r.__data__;
    return t5(n) ? a[typeof n == "string" ? "string" : "hash"] : a.map;
  }
  return si = e, si;
}
var li, Ul;
function Xb() {
  if (Ul) return li;
  Ul = 1;
  var t5 = ea();
  function e(r) {
    var n = t5(this, r).delete(r);
    return this.size -= n ? 1 : 0, n;
  }
  return li = e, li;
}
var fi, Vl;
function Yb() {
  if (Vl) return fi;
  Vl = 1;
  var t5 = ea();
  function e(r) {
    return t5(this, r).get(r);
  }
  return fi = e, fi;
}
var pi, Xl;
function Zb() {
  if (Xl) return pi;
  Xl = 1;
  var t5 = ea();
  function e(r) {
    return t5(this, r).has(r);
  }
  return pi = e, pi;
}
var di, Yl;
function Jb() {
  if (Yl) return di;
  Yl = 1;
  var t5 = ea();
  function e(r, n) {
    var a = t5(this, r), i = a.size;
    return a.set(r, n), this.size += a.size == i ? 0 : 1, this;
  }
  return di = e, di;
}
var vi, Zl;
function ks() {
  if (Zl) return vi;
  Zl = 1;
  var t5 = Ub(), e = Xb(), r = Yb(), n = Zb(), a = Jb();
  function i(o) {
    var u = -1, c = o == null ? 0 : o.length;
    for (this.clear(); ++u < c; ) {
      var s = o[u];
      this.set(s[0], s[1]);
    }
  }
  return i.prototype.clear = t5, i.prototype.delete = e, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, vi = i, vi;
}
var hi, Jl;
function py() {
  if (Jl) return hi;
  Jl = 1;
  var t5 = ks(), e = "Expected a function";
  function r(n, a) {
    if (typeof n != "function" || a != null && typeof a != "function") throw new TypeError(e);
    var i = function() {
      var o = arguments, u = a ? a.apply(this, o) : o[0], c = i.cache;
      if (c.has(u)) return c.get(u);
      var s = n.apply(this, o);
      return i.cache = c.set(u, s) || c, s;
    };
    return i.cache = new (r.Cache || t5)(), i;
  }
  return r.Cache = t5, hi = r, hi;
}
var yi, Ql;
function Qb() {
  if (Ql) return yi;
  Ql = 1;
  var t5 = py(), e = 500;
  function r(n) {
    var a = t5(n, function(o) {
      return i.size === e && i.clear(), o;
    }), i = a.cache;
    return a;
  }
  return yi = r, yi;
}
var mi, ef;
function eO() {
  if (ef) return mi;
  ef = 1;
  var t5 = Qb(), e = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, r = /\\(\\)?/g, n = t5(function(a) {
    var i = [];
    return a.charCodeAt(0) === 46 && i.push(""), a.replace(e, function(o, u, c, s) {
      i.push(c ? s.replace(r, "$1") : u || o);
    }), i;
  });
  return mi = n, mi;
}
var gi, tf;
function Ds() {
  if (tf) return gi;
  tf = 1;
  function t5(e, r) {
    for (var n = -1, a = e == null ? 0 : e.length, i = Array(a); ++n < a; ) i[n] = r(e[n], n, e);
    return i;
  }
  return gi = t5, gi;
}
var bi, rf;
function tO() {
  if (rf) return bi;
  rf = 1;
  var t5 = Qr(), e = Ds(), r = xe(), n = Jt(), a = t5 ? t5.prototype : void 0, i = a ? a.toString : void 0;
  function o(u) {
    if (typeof u == "string") return u;
    if (r(u)) return e(u, o) + "";
    if (n(u)) return i ? i.call(u) : "";
    var c = u + "";
    return c == "0" && 1 / u == -1 / 0 ? "-0" : c;
  }
  return bi = o, bi;
}
var Oi, nf;
function dy() {
  if (nf) return Oi;
  nf = 1;
  var t5 = tO();
  function e(r) {
    return r == null ? "" : t5(r);
  }
  return Oi = e, Oi;
}
var xi, af;
function vy() {
  if (af) return xi;
  af = 1;
  var t5 = xe(), e = $s(), r = eO(), n = dy();
  function a(i, o) {
    return t5(i) ? i : e(i, o) ? [i] : r(n(i));
  }
  return xi = a, xi;
}
var wi, of;
function ta() {
  if (of) return wi;
  of = 1;
  var t5 = Jt();
  function e(r) {
    if (typeof r == "string" || t5(r)) return r;
    var n = r + "";
    return n == "0" && 1 / r == -1 / 0 ? "-0" : n;
  }
  return wi = e, wi;
}
var Ai, uf;
function Ns() {
  if (uf) return Ai;
  uf = 1;
  var t5 = vy(), e = ta();
  function r(n, a) {
    a = t5(a, n);
    for (var i = 0, o = a.length; n != null && i < o; ) n = n[e(a[i++])];
    return i && i == o ? n : void 0;
  }
  return Ai = r, Ai;
}
var Si, cf;
function hy() {
  if (cf) return Si;
  cf = 1;
  var t5 = Ns();
  function e(r, n, a) {
    var i = r == null ? void 0 : t5(r, n);
    return i === void 0 ? a : i;
  }
  return Si = e, Si;
}
var rO = hy();
const Pe = te(rO);
var Pi, sf;
function nO() {
  if (sf) return Pi;
  sf = 1;
  function t5(e) {
    return e == null;
  }
  return Pi = t5, Pi;
}
var aO = nO();
const X = te(aO);
var _i, lf;
function iO() {
  if (lf) return _i;
  lf = 1;
  var t5 = He(), e = xe(), r = Ue(), n = "[object String]";
  function a(i) {
    return typeof i == "string" || !e(i) && r(i) && t5(i) == n;
  }
  return _i = a, _i;
}
var oO = iO();
const pt = te(oO);
var uO = Cs();
const U = te(uO);
var cO = Je();
const Qt = te(cO);
var Ei = { exports: {} }, Y = {};
var ff;
function sO() {
  if (ff) return Y;
  ff = 1;
  var t5 = /* @__PURE__ */ Symbol.for("react.element"), e = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), n = /* @__PURE__ */ Symbol.for("react.strict_mode"), a = /* @__PURE__ */ Symbol.for("react.profiler"), i = /* @__PURE__ */ Symbol.for("react.provider"), o = /* @__PURE__ */ Symbol.for("react.context"), u = /* @__PURE__ */ Symbol.for("react.server_context"), c = /* @__PURE__ */ Symbol.for("react.forward_ref"), s = /* @__PURE__ */ Symbol.for("react.suspense"), l = /* @__PURE__ */ Symbol.for("react.suspense_list"), f = /* @__PURE__ */ Symbol.for("react.memo"), p = /* @__PURE__ */ Symbol.for("react.lazy"), v = /* @__PURE__ */ Symbol.for("react.offscreen"), m;
  m = /* @__PURE__ */ Symbol.for("react.module.reference");
  function h(d) {
    if (typeof d == "object" && d !== null) {
      var b = d.$$typeof;
      switch (b) {
        case t5:
          switch (d = d.type, d) {
            case r:
            case a:
            case n:
            case s:
            case l:
              return d;
            default:
              switch (d = d && d.$$typeof, d) {
                case u:
                case o:
                case c:
                case p:
                case f:
                case i:
                  return d;
                default:
                  return b;
              }
          }
        case e:
          return b;
      }
    }
  }
  return Y.ContextConsumer = o, Y.ContextProvider = i, Y.Element = t5, Y.ForwardRef = c, Y.Fragment = r, Y.Lazy = p, Y.Memo = f, Y.Portal = e, Y.Profiler = a, Y.StrictMode = n, Y.Suspense = s, Y.SuspenseList = l, Y.isAsyncMode = function() {
    return false;
  }, Y.isConcurrentMode = function() {
    return false;
  }, Y.isContextConsumer = function(d) {
    return h(d) === o;
  }, Y.isContextProvider = function(d) {
    return h(d) === i;
  }, Y.isElement = function(d) {
    return typeof d == "object" && d !== null && d.$$typeof === t5;
  }, Y.isForwardRef = function(d) {
    return h(d) === c;
  }, Y.isFragment = function(d) {
    return h(d) === r;
  }, Y.isLazy = function(d) {
    return h(d) === p;
  }, Y.isMemo = function(d) {
    return h(d) === f;
  }, Y.isPortal = function(d) {
    return h(d) === e;
  }, Y.isProfiler = function(d) {
    return h(d) === a;
  }, Y.isStrictMode = function(d) {
    return h(d) === n;
  }, Y.isSuspense = function(d) {
    return h(d) === s;
  }, Y.isSuspenseList = function(d) {
    return h(d) === l;
  }, Y.isValidElementType = function(d) {
    return typeof d == "string" || typeof d == "function" || d === r || d === a || d === n || d === s || d === l || d === v || typeof d == "object" && d !== null && (d.$$typeof === p || d.$$typeof === f || d.$$typeof === i || d.$$typeof === o || d.$$typeof === c || d.$$typeof === m || d.getModuleId !== void 0);
  }, Y.typeOf = h, Y;
}
var pf;
function lO() {
  return pf || (pf = 1, Ei.exports = sO()), Ei.exports;
}
var fO = lO(), ji, df;
function yy() {
  if (df) return ji;
  df = 1;
  var t5 = He(), e = Ue(), r = "[object Number]";
  function n(a) {
    return typeof a == "number" || e(a) && t5(a) == r;
  }
  return ji = n, ji;
}
var Ti, vf;
function pO() {
  if (vf) return Ti;
  vf = 1;
  var t5 = yy();
  function e(r) {
    return t5(r) && r != +r;
  }
  return Ti = e, Ti;
}
var dO = pO();
const en = te(dO);
var vO = yy();
const hO = te(vO);
var be = function(e) {
  return e === 0 ? 0 : e > 0 ? 1 : -1;
}, st = function(e) {
  return pt(e) && e.indexOf("%") === e.length - 1;
}, N = function(e) {
  return hO(e) && !en(e);
}, yO = function(e) {
  return X(e);
}, pe = function(e) {
  return N(e) || pt(e);
}, mO = 0, tn = function(e) {
  var r = ++mO;
  return "".concat(e || "").concat(r);
}, Oe = function(e, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (!N(e) && !pt(e)) return n;
  var i;
  if (st(e)) {
    var o = e.indexOf("%");
    i = r * parseFloat(e.slice(0, o)) / 100;
  } else i = +e;
  return en(i) && (i = n), a && i > r && (i = r), i;
}, At = function(e) {
  if (!e) return null;
  var r = Object.keys(e);
  return r && r.length ? e[r[0]] : null;
}, gO = function(e) {
  if (!Array.isArray(e)) return false;
  for (var r = e.length, n = {}, a = 0; a < r; a++) if (!n[e[a]]) n[e[a]] = true;
  else return true;
  return false;
}, Ve = function(e, r) {
  return N(e) && N(r) ? function(n) {
    return e + n * (r - e);
  } : function() {
    return r;
  };
};
function wc(t5, e, r) {
  return !t5 || !t5.length ? null : t5.find(function(n) {
    return n && (typeof e == "function" ? e(n) : Pe(n, e)) === r;
  });
}
var bO = function(e, r) {
  return N(e) && N(r) ? e - r : pt(e) && pt(r) ? e.localeCompare(r) : e instanceof Date && r instanceof Date ? e.getTime() - r.getTime() : String(e).localeCompare(String(r));
};
function Tt(t5, e) {
  for (var r in t5) if ({}.hasOwnProperty.call(t5, r) && (!{}.hasOwnProperty.call(e, r) || t5[r] !== e[r])) return false;
  for (var n in e) if ({}.hasOwnProperty.call(e, n) && !{}.hasOwnProperty.call(t5, n)) return false;
  return true;
}
function Ac(t5) {
  "@babel/helpers - typeof";
  return Ac = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ac(t5);
}
var OO = ["viewBox", "children"], xO = ["aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-colcount", "aria-colindex", "aria-colspan", "aria-controls", "aria-current", "aria-describedby", "aria-details", "aria-disabled", "aria-errormessage", "aria-expanded", "aria-flowto", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-modal", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-placeholder", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-roledescription", "aria-rowcount", "aria-rowindex", "aria-rowspan", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext", "className", "color", "height", "id", "lang", "max", "media", "method", "min", "name", "style", "target", "width", "role", "tabIndex", "accentHeight", "accumulate", "additive", "alignmentBaseline", "allowReorder", "alphabetic", "amplitude", "arabicForm", "ascent", "attributeName", "attributeType", "autoReverse", "azimuth", "baseFrequency", "baselineShift", "baseProfile", "bbox", "begin", "bias", "by", "calcMode", "capHeight", "clip", "clipPath", "clipPathUnits", "clipRule", "colorInterpolation", "colorInterpolationFilters", "colorProfile", "colorRendering", "contentScriptType", "contentStyleType", "cursor", "cx", "cy", "d", "decelerate", "descent", "diffuseConstant", "direction", "display", "divisor", "dominantBaseline", "dur", "dx", "dy", "edgeMode", "elevation", "enableBackground", "end", "exponent", "externalResourcesRequired", "fill", "fillOpacity", "fillRule", "filter", "filterRes", "filterUnits", "floodColor", "floodOpacity", "focusable", "fontFamily", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "format", "from", "fx", "fy", "g1", "g2", "glyphName", "glyphOrientationHorizontal", "glyphOrientationVertical", "glyphRef", "gradientTransform", "gradientUnits", "hanging", "horizAdvX", "horizOriginX", "href", "ideographic", "imageRendering", "in2", "in", "intercept", "k1", "k2", "k3", "k4", "k", "kernelMatrix", "kernelUnitLength", "kerning", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "letterSpacing", "lightingColor", "limitingConeAngle", "local", "markerEnd", "markerHeight", "markerMid", "markerStart", "markerUnits", "markerWidth", "mask", "maskContentUnits", "maskUnits", "mathematical", "mode", "numOctaves", "offset", "opacity", "operator", "order", "orient", "orientation", "origin", "overflow", "overlinePosition", "overlineThickness", "paintOrder", "panose1", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointerEvents", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "r", "radius", "refX", "refY", "renderingIntent", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "result", "rotate", "rx", "ry", "seed", "shapeRendering", "slope", "spacing", "specularConstant", "specularExponent", "speed", "spreadMethod", "startOffset", "stdDeviation", "stemh", "stemv", "stitchTiles", "stopColor", "stopOpacity", "strikethroughPosition", "strikethroughThickness", "string", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textAnchor", "textDecoration", "textLength", "textRendering", "to", "transform", "u1", "u2", "underlinePosition", "underlineThickness", "unicode", "unicodeBidi", "unicodeRange", "unitsPerEm", "vAlphabetic", "values", "vectorEffect", "version", "vertAdvY", "vertOriginX", "vertOriginY", "vHanging", "vIdeographic", "viewTarget", "visibility", "vMathematical", "widths", "wordSpacing", "writingMode", "x1", "x2", "x", "xChannelSelector", "xHeight", "xlinkActuate", "xlinkArcrole", "xlinkHref", "xlinkRole", "xlinkShow", "xlinkTitle", "xlinkType", "xmlBase", "xmlLang", "xmlns", "xmlnsXlink", "xmlSpace", "y1", "y2", "y", "yChannelSelector", "z", "zoomAndPan", "ref", "key", "angle"], hf = ["points", "pathLength"], Ii = { svg: OO, polygon: hf, polyline: hf }, qs = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"], mn = function(e, r) {
  if (!e || typeof e == "function" || typeof e == "boolean") return null;
  var n = e;
  if (D.isValidElement(e) && (n = e.props), !Qt(n)) return null;
  var a = {};
  return Object.keys(n).forEach(function(i) {
    qs.includes(i) && (a[i] = r || function(o) {
      return n[i](n, o);
    });
  }), a;
}, wO = function(e, r, n) {
  return function(a) {
    return e(r, n, a), null;
  };
}, dt = function(e, r, n) {
  if (!Qt(e) || Ac(e) !== "object") return null;
  var a = null;
  return Object.keys(e).forEach(function(i) {
    var o = e[i];
    qs.includes(i) && typeof o == "function" && (a || (a = {}), a[i] = wO(o, r, n));
  }), a;
}, AO = ["children"], SO = ["children"];
function yf(t5, e) {
  if (t5 == null) return {};
  var r = PO(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function PO(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
var mf = { click: "onClick", mousedown: "onMouseDown", mouseup: "onMouseUp", mouseover: "onMouseOver", mousemove: "onMouseMove", mouseout: "onMouseOut", mouseenter: "onMouseEnter", mouseleave: "onMouseLeave", touchcancel: "onTouchCancel", touchend: "onTouchEnd", touchmove: "onTouchMove", touchstart: "onTouchStart", contextmenu: "onContextMenu", dblclick: "onDoubleClick" }, We = function(e) {
  return typeof e == "string" ? e : e ? e.displayName || e.name || "Component" : "";
}, gf = null, $i = null, Bs = function t(e) {
  if (e === gf && Array.isArray($i)) return $i;
  var r = [];
  return D.Children.forEach(e, function(n) {
    X(n) || (fO.isFragment(n) ? r = r.concat(t(n.props.children)) : r.push(n));
  }), $i = r, gf = e, r;
};
function Te(t5, e) {
  var r = [], n = [];
  return Array.isArray(e) ? n = e.map(function(a) {
    return We(a);
  }) : n = [We(e)], Bs(t5).forEach(function(a) {
    var i = Pe(a, "type.displayName") || Pe(a, "type.name");
    n.indexOf(i) !== -1 && r.push(a);
  }), r;
}
function Ae(t5, e) {
  var r = Te(t5, e);
  return r && r[0];
}
var bf = function(e) {
  if (!e || !e.props) return false;
  var r = e.props, n = r.width, a = r.height;
  return !(!N(n) || n <= 0 || !N(a) || a <= 0);
}, _O = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"], EO = function(e) {
  return e && e.type && pt(e.type) && _O.indexOf(e.type) >= 0;
}, jO = function(e, r, n, a) {
  var i, o = (i = Ii == null ? void 0 : Ii[a]) !== null && i !== void 0 ? i : [];
  return r.startsWith("data-") || !U(e) && (a && o.includes(r) || xO.includes(r)) || n && qs.includes(r);
}, G = function(e, r, n) {
  if (!e || typeof e == "function" || typeof e == "boolean") return null;
  var a = e;
  if (D.isValidElement(e) && (a = e.props), !Qt(a)) return null;
  var i = {};
  return Object.keys(a).forEach(function(o) {
    var u;
    jO((u = a) === null || u === void 0 ? void 0 : u[o], o, r, n) && (i[o] = a[o]);
  }), i;
}, Sc = function t2(e, r) {
  if (e === r) return true;
  var n = D.Children.count(e);
  if (n !== D.Children.count(r)) return false;
  if (n === 0) return true;
  if (n === 1) return Of(Array.isArray(e) ? e[0] : e, Array.isArray(r) ? r[0] : r);
  for (var a = 0; a < n; a++) {
    var i = e[a], o = r[a];
    if (Array.isArray(i) || Array.isArray(o)) {
      if (!t2(i, o)) return false;
    } else if (!Of(i, o)) return false;
  }
  return true;
}, Of = function(e, r) {
  if (X(e) && X(r)) return true;
  if (!X(e) && !X(r)) {
    var n = e.props || {}, a = n.children, i = yf(n, AO), o = r.props || {}, u = o.children, c = yf(o, SO);
    return a && u ? Tt(i, c) && Sc(a, u) : !a && !u ? Tt(i, c) : false;
  }
  return false;
}, xf = function(e, r) {
  var n = [], a = {};
  return Bs(e).forEach(function(i, o) {
    if (EO(i)) n.push(i);
    else if (i) {
      var u = We(i.type), c = r[u] || {}, s = c.handler, l = c.once;
      if (s && (!l || !a[u])) {
        var f = s(i, u, o);
        n.push(f), a[u] = true;
      }
    }
  }), n;
}, TO = function(e) {
  var r = e && e.type;
  return r && mf[r] ? mf[r] : null;
}, IO = function(e, r) {
  return Bs(r).indexOf(e);
}, $O = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function Pc() {
  return Pc = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Pc.apply(this, arguments);
}
function CO(t5, e) {
  if (t5 == null) return {};
  var r = RO(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function RO(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
function _c(t5) {
  var e = t5.children, r = t5.width, n = t5.height, a = t5.viewBox, i = t5.className, o = t5.style, u = t5.title, c = t5.desc, s = CO(t5, $O), l = a || { width: r, height: n, x: 0, y: 0 }, f = V("recharts-surface", i);
  return P.createElement("svg", Pc({}, G(s, true, "svg"), { className: f, width: r, height: n, style: o, viewBox: "".concat(l.x, " ").concat(l.y, " ").concat(l.width, " ").concat(l.height) }), P.createElement("title", null, u), P.createElement("desc", null, c), e);
}
var MO = ["children", "className"];
function Ec() {
  return Ec = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Ec.apply(this, arguments);
}
function kO(t5, e) {
  if (t5 == null) return {};
  var r = DO(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function DO(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
var J = P.forwardRef(function(t5, e) {
  var r = t5.children, n = t5.className, a = kO(t5, MO), i = V("recharts-layer", n);
  return P.createElement("g", Ec({ className: i }, G(a, true), { ref: e }), r);
}), ze = function(e, r) {
  for (var n = arguments.length, a = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) a[i - 2] = arguments[i];
}, Ci, wf;
function NO() {
  if (wf) return Ci;
  wf = 1;
  function t5(e, r, n) {
    var a = -1, i = e.length;
    r < 0 && (r = -r > i ? 0 : i + r), n = n > i ? i : n, n < 0 && (n += i), i = r > n ? 0 : n - r >>> 0, r >>>= 0;
    for (var o = Array(i); ++a < i; ) o[a] = e[a + r];
    return o;
  }
  return Ci = t5, Ci;
}
var Ri, Af;
function qO() {
  if (Af) return Ri;
  Af = 1;
  var t5 = NO();
  function e(r, n, a) {
    var i = r.length;
    return a = a === void 0 ? i : a, !n && a >= i ? r : t5(r, n, a);
  }
  return Ri = e, Ri;
}
var Mi, Sf;
function my() {
  if (Sf) return Mi;
  Sf = 1;
  var t5 = "\\ud800-\\udfff", e = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", a = e + r + n, i = "\\ufe0e\\ufe0f", o = "\\u200d", u = RegExp("[" + o + t5 + a + i + "]");
  function c(s) {
    return u.test(s);
  }
  return Mi = c, Mi;
}
var ki, Pf;
function BO() {
  if (Pf) return ki;
  Pf = 1;
  function t5(e) {
    return e.split("");
  }
  return ki = t5, ki;
}
var Di, _f;
function LO() {
  if (_f) return Di;
  _f = 1;
  var t5 = "\\ud800-\\udfff", e = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", a = e + r + n, i = "\\ufe0e\\ufe0f", o = "[" + t5 + "]", u = "[" + a + "]", c = "\\ud83c[\\udffb-\\udfff]", s = "(?:" + u + "|" + c + ")", l = "[^" + t5 + "]", f = "(?:\\ud83c[\\udde6-\\uddff]){2}", p = "[\\ud800-\\udbff][\\udc00-\\udfff]", v = "\\u200d", m = s + "?", h = "[" + i + "]?", d = "(?:" + v + "(?:" + [l, f, p].join("|") + ")" + h + m + ")*", b = h + m + d, g = "(?:" + [l + u + "?", u, f, p, o].join("|") + ")", x = RegExp(c + "(?=" + c + ")|" + g + b, "g");
  function w(y) {
    return y.match(x) || [];
  }
  return Di = w, Di;
}
var Ni, Ef;
function FO() {
  if (Ef) return Ni;
  Ef = 1;
  var t5 = BO(), e = my(), r = LO();
  function n(a) {
    return e(a) ? r(a) : t5(a);
  }
  return Ni = n, Ni;
}
var qi, jf;
function WO() {
  if (jf) return qi;
  jf = 1;
  var t5 = qO(), e = my(), r = FO(), n = dy();
  function a(i) {
    return function(o) {
      o = n(o);
      var u = e(o) ? r(o) : void 0, c = u ? u[0] : o.charAt(0), s = u ? t5(u, 1).join("") : o.slice(1);
      return c[i]() + s;
    };
  }
  return qi = a, qi;
}
var Bi, Tf;
function zO() {
  if (Tf) return Bi;
  Tf = 1;
  var t5 = WO(), e = t5("toUpperCase");
  return Bi = e, Bi;
}
var KO = zO();
const ra = te(KO);
function Ar(t5) {
  "@babel/helpers - typeof";
  return Ar = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ar(t5);
}
var GO = ["type", "size", "sizeType"];
function jc() {
  return jc = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, jc.apply(this, arguments);
}
function If(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function $f(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? If(Object(r), true).forEach(function(n) {
      HO(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : If(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function HO(t5, e, r) {
  return e = UO(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function UO(t5) {
  var e = VO(t5, "string");
  return Ar(e) == "symbol" ? e : e + "";
}
function VO(t5, e) {
  if (Ar(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Ar(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
function XO(t5, e) {
  if (t5 == null) return {};
  var r = YO(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function YO(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
var gy = { symbolCircle: cy, symbolCross: qg, symbolDiamond: Ng, symbolSquare: Dg, symbolStar: kg, symbolTriangle: Mg, symbolWye: Rg }, ZO = Math.PI / 180, JO = function(e) {
  var r = "symbol".concat(ra(e));
  return gy[r] || cy;
}, QO = function(e, r, n) {
  if (r === "area") return e;
  switch (n) {
    case "cross":
      return 5 * e * e / 9;
    case "diamond":
      return 0.5 * e * e / Math.sqrt(3);
    case "square":
      return e * e;
    case "star": {
      var a = 18 * ZO;
      return 1.25 * e * e * (Math.tan(a) - Math.tan(a * 2) * Math.pow(Math.tan(a), 2));
    }
    case "triangle":
      return Math.sqrt(3) * e * e / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * e * e / 8;
    default:
      return Math.PI * e * e / 4;
  }
}, e0 = function(e, r) {
  gy["symbol".concat(ra(e))] = r;
}, Ls = function(e) {
  var r = e.type, n = r === void 0 ? "circle" : r, a = e.size, i = a === void 0 ? 64 : a, o = e.sizeType, u = o === void 0 ? "area" : o, c = XO(e, GO), s = $f($f({}, c), {}, { type: n, size: i, sizeType: u }), l = function() {
    var d = JO(n), b = Cg().type(d).size(QO(i, u, n));
    return b();
  }, f = s.className, p = s.cx, v = s.cy, m = G(s, true);
  return p === +p && v === +v && i === +i ? P.createElement("path", jc({}, m, { className: V("recharts-symbols", f), transform: "translate(".concat(p, ", ").concat(v, ")"), d: l() })) : null;
};
Ls.registerSymbol = e0;
function Ct(t5) {
  "@babel/helpers - typeof";
  return Ct = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ct(t5);
}
function Tc() {
  return Tc = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Tc.apply(this, arguments);
}
function Cf(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function t0(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Cf(Object(r), true).forEach(function(n) {
      Sr(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Cf(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function r0(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function n0(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, Oy(n.key), n);
  }
}
function a0(t5, e, r) {
  return e && n0(t5.prototype, e), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function i0(t5, e, r) {
  return e = gn(e), o0(t5, by() ? Reflect.construct(e, r || [], gn(t5).constructor) : e.apply(t5, r));
}
function o0(t5, e) {
  if (e && (Ct(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return u0(t5);
}
function u0(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function by() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (by = function() {
    return !!t5;
  })();
}
function gn(t5) {
  return gn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, gn(t5);
}
function c0(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && Ic(t5, e);
}
function Ic(t5, e) {
  return Ic = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Ic(t5, e);
}
function Sr(t5, e, r) {
  return e = Oy(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Oy(t5) {
  var e = s0(t5, "string");
  return Ct(e) == "symbol" ? e : e + "";
}
function s0(t5, e) {
  if (Ct(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Ct(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
var Ee = 32, Fs = (function(t5) {
  function e() {
    return r0(this, e), i0(this, e, arguments);
  }
  return c0(e, t5), a0(e, [{ key: "renderIcon", value: function(n) {
    var a = this.props.inactiveColor, i = Ee / 2, o = Ee / 6, u = Ee / 3, c = n.inactive ? a : n.color;
    if (n.type === "plainline") return P.createElement("line", { strokeWidth: 4, fill: "none", stroke: c, strokeDasharray: n.payload.strokeDasharray, x1: 0, y1: i, x2: Ee, y2: i, className: "recharts-legend-icon" });
    if (n.type === "line") return P.createElement("path", { strokeWidth: 4, fill: "none", stroke: c, d: "M0,".concat(i, "h").concat(u, `
            A`).concat(o, ",").concat(o, ",0,1,1,").concat(2 * u, ",").concat(i, `
            H`).concat(Ee, "M").concat(2 * u, ",").concat(i, `
            A`).concat(o, ",").concat(o, ",0,1,1,").concat(u, ",").concat(i), className: "recharts-legend-icon" });
    if (n.type === "rect") return P.createElement("path", { stroke: "none", fill: c, d: "M0,".concat(Ee / 8, "h").concat(Ee, "v").concat(Ee * 3 / 4, "h").concat(-Ee, "z"), className: "recharts-legend-icon" });
    if (P.isValidElement(n.legendIcon)) {
      var s = t0({}, n);
      return delete s.legendIcon, P.cloneElement(n.legendIcon, s);
    }
    return P.createElement(Ls, { fill: c, cx: i, cy: i, size: Ee, sizeType: "diameter", type: n.type });
  } }, { key: "renderItems", value: function() {
    var n = this, a = this.props, i = a.payload, o = a.iconSize, u = a.layout, c = a.formatter, s = a.inactiveColor, l = { x: 0, y: 0, width: Ee, height: Ee }, f = { display: u === "horizontal" ? "inline-block" : "block", marginRight: 10 }, p = { display: "inline-block", verticalAlign: "middle", marginRight: 4 };
    return i.map(function(v, m) {
      var h = v.formatter || c, d = V(Sr(Sr({ "recharts-legend-item": true }, "legend-item-".concat(m), true), "inactive", v.inactive));
      if (v.type === "none") return null;
      var b = U(v.value) ? null : v.value;
      ze(!U(v.value), `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`);
      var g = v.inactive ? s : v.color;
      return P.createElement("li", Tc({ className: d, style: f, key: "legend-item-".concat(m) }, dt(n.props, v, m)), P.createElement(_c, { width: o, height: o, viewBox: l, style: p }, n.renderIcon(v)), P.createElement("span", { className: "recharts-legend-item-text", style: { color: g } }, h ? h(b, v, m) : b));
    });
  } }, { key: "render", value: function() {
    var n = this.props, a = n.payload, i = n.layout, o = n.align;
    if (!a || !a.length) return null;
    var u = { padding: 0, margin: 0, textAlign: i === "horizontal" ? o : "left" };
    return P.createElement("ul", { className: "recharts-default-legend", style: u }, this.renderItems());
  } }]);
})(D.PureComponent);
Sr(Fs, "displayName", "Legend");
Sr(Fs, "defaultProps", { iconSize: 14, layout: "horizontal", align: "center", verticalAlign: "middle", inactiveColor: "#ccc" });
var Li, Rf;
function l0() {
  if (Rf) return Li;
  Rf = 1;
  var t5 = Qn();
  function e() {
    this.__data__ = new t5(), this.size = 0;
  }
  return Li = e, Li;
}
var Fi, Mf;
function f0() {
  if (Mf) return Fi;
  Mf = 1;
  function t5(e) {
    var r = this.__data__, n = r.delete(e);
    return this.size = r.size, n;
  }
  return Fi = t5, Fi;
}
var Wi, kf;
function p0() {
  if (kf) return Wi;
  kf = 1;
  function t5(e) {
    return this.__data__.get(e);
  }
  return Wi = t5, Wi;
}
var zi, Df;
function d0() {
  if (Df) return zi;
  Df = 1;
  function t5(e) {
    return this.__data__.has(e);
  }
  return zi = t5, zi;
}
var Ki, Nf;
function v0() {
  if (Nf) return Ki;
  Nf = 1;
  var t5 = Qn(), e = Ms(), r = ks(), n = 200;
  function a(i, o) {
    var u = this.__data__;
    if (u instanceof t5) {
      var c = u.__data__;
      if (!e || c.length < n - 1) return c.push([i, o]), this.size = ++u.size, this;
      u = this.__data__ = new r(c);
    }
    return u.set(i, o), this.size = u.size, this;
  }
  return Ki = a, Ki;
}
var Gi, qf;
function xy() {
  if (qf) return Gi;
  qf = 1;
  var t5 = Qn(), e = l0(), r = f0(), n = p0(), a = d0(), i = v0();
  function o(u) {
    var c = this.__data__ = new t5(u);
    this.size = c.size;
  }
  return o.prototype.clear = e, o.prototype.delete = r, o.prototype.get = n, o.prototype.has = a, o.prototype.set = i, Gi = o, Gi;
}
var Hi, Bf;
function h0() {
  if (Bf) return Hi;
  Bf = 1;
  var t5 = "__lodash_hash_undefined__";
  function e(r) {
    return this.__data__.set(r, t5), this;
  }
  return Hi = e, Hi;
}
var Ui, Lf;
function y0() {
  if (Lf) return Ui;
  Lf = 1;
  function t5(e) {
    return this.__data__.has(e);
  }
  return Ui = t5, Ui;
}
var Vi, Ff;
function wy() {
  if (Ff) return Vi;
  Ff = 1;
  var t5 = ks(), e = h0(), r = y0();
  function n(a) {
    var i = -1, o = a == null ? 0 : a.length;
    for (this.__data__ = new t5(); ++i < o; ) this.add(a[i]);
  }
  return n.prototype.add = n.prototype.push = e, n.prototype.has = r, Vi = n, Vi;
}
var Xi, Wf;
function Ay() {
  if (Wf) return Xi;
  Wf = 1;
  function t5(e, r) {
    for (var n = -1, a = e == null ? 0 : e.length; ++n < a; ) if (r(e[n], n, e)) return true;
    return false;
  }
  return Xi = t5, Xi;
}
var Yi, zf;
function Sy() {
  if (zf) return Yi;
  zf = 1;
  function t5(e, r) {
    return e.has(r);
  }
  return Yi = t5, Yi;
}
var Zi, Kf;
function Py() {
  if (Kf) return Zi;
  Kf = 1;
  var t5 = wy(), e = Ay(), r = Sy(), n = 1, a = 2;
  function i(o, u, c, s, l, f) {
    var p = c & n, v = o.length, m = u.length;
    if (v != m && !(p && m > v)) return false;
    var h = f.get(o), d = f.get(u);
    if (h && d) return h == u && d == o;
    var b = -1, g = true, x = c & a ? new t5() : void 0;
    for (f.set(o, u), f.set(u, o); ++b < v; ) {
      var w = o[b], y = u[b];
      if (s) var O = p ? s(y, w, b, u, o, f) : s(w, y, b, o, u, f);
      if (O !== void 0) {
        if (O) continue;
        g = false;
        break;
      }
      if (x) {
        if (!e(u, function(A, S) {
          if (!r(x, S) && (w === A || l(w, A, c, s, f))) return x.push(S);
        })) {
          g = false;
          break;
        }
      } else if (!(w === y || l(w, y, c, s, f))) {
        g = false;
        break;
      }
    }
    return f.delete(o), f.delete(u), g;
  }
  return Zi = i, Zi;
}
var Ji, Gf;
function m0() {
  if (Gf) return Ji;
  Gf = 1;
  var t5 = Ne(), e = t5.Uint8Array;
  return Ji = e, Ji;
}
var Qi, Hf;
function g0() {
  if (Hf) return Qi;
  Hf = 1;
  function t5(e) {
    var r = -1, n = Array(e.size);
    return e.forEach(function(a, i) {
      n[++r] = [i, a];
    }), n;
  }
  return Qi = t5, Qi;
}
var eo, Uf;
function Ws() {
  if (Uf) return eo;
  Uf = 1;
  function t5(e) {
    var r = -1, n = Array(e.size);
    return e.forEach(function(a) {
      n[++r] = a;
    }), n;
  }
  return eo = t5, eo;
}
var to, Vf;
function b0() {
  if (Vf) return to;
  Vf = 1;
  var t5 = Qr(), e = m0(), r = Rs(), n = Py(), a = g0(), i = Ws(), o = 1, u = 2, c = "[object Boolean]", s = "[object Date]", l = "[object Error]", f = "[object Map]", p = "[object Number]", v = "[object RegExp]", m = "[object Set]", h = "[object String]", d = "[object Symbol]", b = "[object ArrayBuffer]", g = "[object DataView]", x = t5 ? t5.prototype : void 0, w = x ? x.valueOf : void 0;
  function y(O, A, S, _, T, E, j) {
    switch (S) {
      case g:
        if (O.byteLength != A.byteLength || O.byteOffset != A.byteOffset) return false;
        O = O.buffer, A = A.buffer;
      case b:
        return !(O.byteLength != A.byteLength || !E(new e(O), new e(A)));
      case c:
      case s:
      case p:
        return r(+O, +A);
      case l:
        return O.name == A.name && O.message == A.message;
      case v:
      case h:
        return O == A + "";
      case f:
        var I = a;
      case m:
        var R = _ & o;
        if (I || (I = i), O.size != A.size && !R) return false;
        var C = j.get(O);
        if (C) return C == A;
        _ |= u, j.set(O, A);
        var M = n(I(O), I(A), _, T, E, j);
        return j.delete(O), M;
      case d:
        if (w) return w.call(O) == w.call(A);
    }
    return false;
  }
  return to = y, to;
}
var ro, Xf;
function _y() {
  if (Xf) return ro;
  Xf = 1;
  function t5(e, r) {
    for (var n = -1, a = r.length, i = e.length; ++n < a; ) e[i + n] = r[n];
    return e;
  }
  return ro = t5, ro;
}
var no, Yf;
function O0() {
  if (Yf) return no;
  Yf = 1;
  var t5 = _y(), e = xe();
  function r(n, a, i) {
    var o = a(n);
    return e(n) ? o : t5(o, i(n));
  }
  return no = r, no;
}
var ao, Zf;
function x0() {
  if (Zf) return ao;
  Zf = 1;
  function t5(e, r) {
    for (var n = -1, a = e == null ? 0 : e.length, i = 0, o = []; ++n < a; ) {
      var u = e[n];
      r(u, n, e) && (o[i++] = u);
    }
    return o;
  }
  return ao = t5, ao;
}
var io, Jf;
function w0() {
  if (Jf) return io;
  Jf = 1;
  function t5() {
    return [];
  }
  return io = t5, io;
}
var oo, Qf;
function A0() {
  if (Qf) return oo;
  Qf = 1;
  var t5 = x0(), e = w0(), r = Object.prototype, n = r.propertyIsEnumerable, a = Object.getOwnPropertySymbols, i = a ? function(o) {
    return o == null ? [] : (o = Object(o), t5(a(o), function(u) {
      return n.call(o, u);
    }));
  } : e;
  return oo = i, oo;
}
var uo, ep;
function S0() {
  if (ep) return uo;
  ep = 1;
  function t5(e, r) {
    for (var n = -1, a = Array(e); ++n < e; ) a[n] = r(n);
    return a;
  }
  return uo = t5, uo;
}
var co, tp;
function P0() {
  if (tp) return co;
  tp = 1;
  var t5 = He(), e = Ue(), r = "[object Arguments]";
  function n(a) {
    return e(a) && t5(a) == r;
  }
  return co = n, co;
}
var so, rp;
function zs() {
  if (rp) return so;
  rp = 1;
  var t5 = P0(), e = Ue(), r = Object.prototype, n = r.hasOwnProperty, a = r.propertyIsEnumerable, i = t5(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? t5 : function(o) {
    return e(o) && n.call(o, "callee") && !a.call(o, "callee");
  };
  return so = i, so;
}
var vr = { exports: {} }, lo, np;
function _0() {
  if (np) return lo;
  np = 1;
  function t5() {
    return false;
  }
  return lo = t5, lo;
}
vr.exports;
var ap;
function Ey() {
  return ap || (ap = 1, (function(t5, e) {
    var r = Ne(), n = _0(), a = e && !e.nodeType && e, i = a && true && t5 && !t5.nodeType && t5, o = i && i.exports === a, u = o ? r.Buffer : void 0, c = u ? u.isBuffer : void 0, s = c || n;
    t5.exports = s;
  })(vr, vr.exports)), vr.exports;
}
var fo, ip;
function Ks() {
  if (ip) return fo;
  ip = 1;
  var t5 = 9007199254740991, e = /^(?:0|[1-9]\d*)$/;
  function r(n, a) {
    var i = typeof n;
    return a = a ?? t5, !!a && (i == "number" || i != "symbol" && e.test(n)) && n > -1 && n % 1 == 0 && n < a;
  }
  return fo = r, fo;
}
var po, op;
function Gs() {
  if (op) return po;
  op = 1;
  var t5 = 9007199254740991;
  function e(r) {
    return typeof r == "number" && r > -1 && r % 1 == 0 && r <= t5;
  }
  return po = e, po;
}
var vo, up;
function E0() {
  if (up) return vo;
  up = 1;
  var t5 = He(), e = Gs(), r = Ue(), n = "[object Arguments]", a = "[object Array]", i = "[object Boolean]", o = "[object Date]", u = "[object Error]", c = "[object Function]", s = "[object Map]", l = "[object Number]", f = "[object Object]", p = "[object RegExp]", v = "[object Set]", m = "[object String]", h = "[object WeakMap]", d = "[object ArrayBuffer]", b = "[object DataView]", g = "[object Float32Array]", x = "[object Float64Array]", w = "[object Int8Array]", y = "[object Int16Array]", O = "[object Int32Array]", A = "[object Uint8Array]", S = "[object Uint8ClampedArray]", _ = "[object Uint16Array]", T = "[object Uint32Array]", E = {};
  E[g] = E[x] = E[w] = E[y] = E[O] = E[A] = E[S] = E[_] = E[T] = true, E[n] = E[a] = E[d] = E[i] = E[b] = E[o] = E[u] = E[c] = E[s] = E[l] = E[f] = E[p] = E[v] = E[m] = E[h] = false;
  function j(I) {
    return r(I) && e(I.length) && !!E[t5(I)];
  }
  return vo = j, vo;
}
var ho, cp;
function jy() {
  if (cp) return ho;
  cp = 1;
  function t5(e) {
    return function(r) {
      return e(r);
    };
  }
  return ho = t5, ho;
}
var hr = { exports: {} };
hr.exports;
var sp;
function j0() {
  return sp || (sp = 1, (function(t5, e) {
    var r = ly(), n = e && !e.nodeType && e, a = n && true && t5 && !t5.nodeType && t5, i = a && a.exports === n, o = i && r.process, u = (function() {
      try {
        var c = a && a.require && a.require("util").types;
        return c || o && o.binding && o.binding("util");
      } catch {
      }
    })();
    t5.exports = u;
  })(hr, hr.exports)), hr.exports;
}
var yo, lp;
function Ty() {
  if (lp) return yo;
  lp = 1;
  var t5 = E0(), e = jy(), r = j0(), n = r && r.isTypedArray, a = n ? e(n) : t5;
  return yo = a, yo;
}
var mo, fp;
function T0() {
  if (fp) return mo;
  fp = 1;
  var t5 = S0(), e = zs(), r = xe(), n = Ey(), a = Ks(), i = Ty(), o = Object.prototype, u = o.hasOwnProperty;
  function c(s, l) {
    var f = r(s), p = !f && e(s), v = !f && !p && n(s), m = !f && !p && !v && i(s), h = f || p || v || m, d = h ? t5(s.length, String) : [], b = d.length;
    for (var g in s) (l || u.call(s, g)) && !(h && (g == "length" || v && (g == "offset" || g == "parent") || m && (g == "buffer" || g == "byteLength" || g == "byteOffset") || a(g, b))) && d.push(g);
    return d;
  }
  return mo = c, mo;
}
var go, pp;
function I0() {
  if (pp) return go;
  pp = 1;
  var t5 = Object.prototype;
  function e(r) {
    var n = r && r.constructor, a = typeof n == "function" && n.prototype || t5;
    return r === a;
  }
  return go = e, go;
}
var bo, dp;
function Iy() {
  if (dp) return bo;
  dp = 1;
  function t5(e, r) {
    return function(n) {
      return e(r(n));
    };
  }
  return bo = t5, bo;
}
var Oo, vp;
function $0() {
  if (vp) return Oo;
  vp = 1;
  var t5 = Iy(), e = t5(Object.keys, Object);
  return Oo = e, Oo;
}
var xo, hp;
function C0() {
  if (hp) return xo;
  hp = 1;
  var t5 = I0(), e = $0(), r = Object.prototype, n = r.hasOwnProperty;
  function a(i) {
    if (!t5(i)) return e(i);
    var o = [];
    for (var u in Object(i)) n.call(i, u) && u != "constructor" && o.push(u);
    return o;
  }
  return xo = a, xo;
}
var wo, yp;
function rn() {
  if (yp) return wo;
  yp = 1;
  var t5 = Cs(), e = Gs();
  function r(n) {
    return n != null && e(n.length) && !t5(n);
  }
  return wo = r, wo;
}
var Ao, mp;
function na() {
  if (mp) return Ao;
  mp = 1;
  var t5 = T0(), e = C0(), r = rn();
  function n(a) {
    return r(a) ? t5(a) : e(a);
  }
  return Ao = n, Ao;
}
var So, gp;
function R0() {
  if (gp) return So;
  gp = 1;
  var t5 = O0(), e = A0(), r = na();
  function n(a) {
    return t5(a, r, e);
  }
  return So = n, So;
}
var Po, bp;
function M0() {
  if (bp) return Po;
  bp = 1;
  var t5 = R0(), e = 1, r = Object.prototype, n = r.hasOwnProperty;
  function a(i, o, u, c, s, l) {
    var f = u & e, p = t5(i), v = p.length, m = t5(o), h = m.length;
    if (v != h && !f) return false;
    for (var d = v; d--; ) {
      var b = p[d];
      if (!(f ? b in o : n.call(o, b))) return false;
    }
    var g = l.get(i), x = l.get(o);
    if (g && x) return g == o && x == i;
    var w = true;
    l.set(i, o), l.set(o, i);
    for (var y = f; ++d < v; ) {
      b = p[d];
      var O = i[b], A = o[b];
      if (c) var S = f ? c(A, O, b, o, i, l) : c(O, A, b, i, o, l);
      if (!(S === void 0 ? O === A || s(O, A, u, c, l) : S)) {
        w = false;
        break;
      }
      y || (y = b == "constructor");
    }
    if (w && !y) {
      var _ = i.constructor, T = o.constructor;
      _ != T && "constructor" in i && "constructor" in o && !(typeof _ == "function" && _ instanceof _ && typeof T == "function" && T instanceof T) && (w = false);
    }
    return l.delete(i), l.delete(o), w;
  }
  return Po = a, Po;
}
var _o, Op;
function k0() {
  if (Op) return _o;
  Op = 1;
  var t5 = mt(), e = Ne(), r = t5(e, "DataView");
  return _o = r, _o;
}
var Eo, xp;
function D0() {
  if (xp) return Eo;
  xp = 1;
  var t5 = mt(), e = Ne(), r = t5(e, "Promise");
  return Eo = r, Eo;
}
var jo, wp;
function $y() {
  if (wp) return jo;
  wp = 1;
  var t5 = mt(), e = Ne(), r = t5(e, "Set");
  return jo = r, jo;
}
var To, Ap;
function N0() {
  if (Ap) return To;
  Ap = 1;
  var t5 = mt(), e = Ne(), r = t5(e, "WeakMap");
  return To = r, To;
}
var Io, Sp;
function q0() {
  if (Sp) return Io;
  Sp = 1;
  var t5 = k0(), e = Ms(), r = D0(), n = $y(), a = N0(), i = He(), o = fy(), u = "[object Map]", c = "[object Object]", s = "[object Promise]", l = "[object Set]", f = "[object WeakMap]", p = "[object DataView]", v = o(t5), m = o(e), h = o(r), d = o(n), b = o(a), g = i;
  return (t5 && g(new t5(new ArrayBuffer(1))) != p || e && g(new e()) != u || r && g(r.resolve()) != s || n && g(new n()) != l || a && g(new a()) != f) && (g = function(x) {
    var w = i(x), y = w == c ? x.constructor : void 0, O = y ? o(y) : "";
    if (O) switch (O) {
      case v:
        return p;
      case m:
        return u;
      case h:
        return s;
      case d:
        return l;
      case b:
        return f;
    }
    return w;
  }), Io = g, Io;
}
var $o, Pp;
function B0() {
  if (Pp) return $o;
  Pp = 1;
  var t5 = xy(), e = Py(), r = b0(), n = M0(), a = q0(), i = xe(), o = Ey(), u = Ty(), c = 1, s = "[object Arguments]", l = "[object Array]", f = "[object Object]", p = Object.prototype, v = p.hasOwnProperty;
  function m(h, d, b, g, x, w) {
    var y = i(h), O = i(d), A = y ? l : a(h), S = O ? l : a(d);
    A = A == s ? f : A, S = S == s ? f : S;
    var _ = A == f, T = S == f, E = A == S;
    if (E && o(h)) {
      if (!o(d)) return false;
      y = true, _ = false;
    }
    if (E && !_) return w || (w = new t5()), y || u(h) ? e(h, d, b, g, x, w) : r(h, d, A, b, g, x, w);
    if (!(b & c)) {
      var j = _ && v.call(h, "__wrapped__"), I = T && v.call(d, "__wrapped__");
      if (j || I) {
        var R = j ? h.value() : h, C = I ? d.value() : d;
        return w || (w = new t5()), x(R, C, b, g, w);
      }
    }
    return E ? (w || (w = new t5()), n(h, d, b, g, x, w)) : false;
  }
  return $o = m, $o;
}
var Co, _p;
function Hs() {
  if (_p) return Co;
  _p = 1;
  var t5 = B0(), e = Ue();
  function r(n, a, i, o, u) {
    return n === a ? true : n == null || a == null || !e(n) && !e(a) ? n !== n && a !== a : t5(n, a, i, o, r, u);
  }
  return Co = r, Co;
}
var Ro, Ep;
function L0() {
  if (Ep) return Ro;
  Ep = 1;
  var t5 = xy(), e = Hs(), r = 1, n = 2;
  function a(i, o, u, c) {
    var s = u.length, l = s, f = !c;
    if (i == null) return !l;
    for (i = Object(i); s--; ) {
      var p = u[s];
      if (f && p[2] ? p[1] !== i[p[0]] : !(p[0] in i)) return false;
    }
    for (; ++s < l; ) {
      p = u[s];
      var v = p[0], m = i[v], h = p[1];
      if (f && p[2]) {
        if (m === void 0 && !(v in i)) return false;
      } else {
        var d = new t5();
        if (c) var b = c(m, h, v, i, o, d);
        if (!(b === void 0 ? e(h, m, r | n, c, d) : b)) return false;
      }
    }
    return true;
  }
  return Ro = a, Ro;
}
var Mo, jp;
function Cy() {
  if (jp) return Mo;
  jp = 1;
  var t5 = Je();
  function e(r) {
    return r === r && !t5(r);
  }
  return Mo = e, Mo;
}
var ko, Tp;
function F0() {
  if (Tp) return ko;
  Tp = 1;
  var t5 = Cy(), e = na();
  function r(n) {
    for (var a = e(n), i = a.length; i--; ) {
      var o = a[i], u = n[o];
      a[i] = [o, u, t5(u)];
    }
    return a;
  }
  return ko = r, ko;
}
var Do, Ip;
function Ry() {
  if (Ip) return Do;
  Ip = 1;
  function t5(e, r) {
    return function(n) {
      return n == null ? false : n[e] === r && (r !== void 0 || e in Object(n));
    };
  }
  return Do = t5, Do;
}
var No, $p;
function W0() {
  if ($p) return No;
  $p = 1;
  var t5 = L0(), e = F0(), r = Ry();
  function n(a) {
    var i = e(a);
    return i.length == 1 && i[0][2] ? r(i[0][0], i[0][1]) : function(o) {
      return o === a || t5(o, a, i);
    };
  }
  return No = n, No;
}
var qo, Cp;
function z0() {
  if (Cp) return qo;
  Cp = 1;
  function t5(e, r) {
    return e != null && r in Object(e);
  }
  return qo = t5, qo;
}
var Bo, Rp;
function K0() {
  if (Rp) return Bo;
  Rp = 1;
  var t5 = vy(), e = zs(), r = xe(), n = Ks(), a = Gs(), i = ta();
  function o(u, c, s) {
    c = t5(c, u);
    for (var l = -1, f = c.length, p = false; ++l < f; ) {
      var v = i(c[l]);
      if (!(p = u != null && s(u, v))) break;
      u = u[v];
    }
    return p || ++l != f ? p : (f = u == null ? 0 : u.length, !!f && a(f) && n(v, f) && (r(u) || e(u)));
  }
  return Bo = o, Bo;
}
var Lo, Mp;
function G0() {
  if (Mp) return Lo;
  Mp = 1;
  var t5 = z0(), e = K0();
  function r(n, a) {
    return n != null && e(n, a, t5);
  }
  return Lo = r, Lo;
}
var Fo, kp;
function H0() {
  if (kp) return Fo;
  kp = 1;
  var t5 = Hs(), e = hy(), r = G0(), n = $s(), a = Cy(), i = Ry(), o = ta(), u = 1, c = 2;
  function s(l, f) {
    return n(l) && a(f) ? i(o(l), f) : function(p) {
      var v = e(p, l);
      return v === void 0 && v === f ? r(p, l) : t5(f, v, u | c);
    };
  }
  return Fo = s, Fo;
}
var Wo, Dp;
function er() {
  if (Dp) return Wo;
  Dp = 1;
  function t5(e) {
    return e;
  }
  return Wo = t5, Wo;
}
var zo, Np;
function U0() {
  if (Np) return zo;
  Np = 1;
  function t5(e) {
    return function(r) {
      return r == null ? void 0 : r[e];
    };
  }
  return zo = t5, zo;
}
var Ko, qp;
function V0() {
  if (qp) return Ko;
  qp = 1;
  var t5 = Ns();
  function e(r) {
    return function(n) {
      return t5(n, r);
    };
  }
  return Ko = e, Ko;
}
var Go, Bp;
function X0() {
  if (Bp) return Go;
  Bp = 1;
  var t5 = U0(), e = V0(), r = $s(), n = ta();
  function a(i) {
    return r(i) ? t5(n(i)) : e(i);
  }
  return Go = a, Go;
}
var Ho, Lp;
function qe() {
  if (Lp) return Ho;
  Lp = 1;
  var t5 = W0(), e = H0(), r = er(), n = xe(), a = X0();
  function i(o) {
    return typeof o == "function" ? o : o == null ? r : typeof o == "object" ? n(o) ? e(o[0], o[1]) : t5(o) : a(o);
  }
  return Ho = i, Ho;
}
var Uo, Fp;
function My() {
  if (Fp) return Uo;
  Fp = 1;
  function t5(e, r, n, a) {
    for (var i = e.length, o = n + (a ? 1 : -1); a ? o-- : ++o < i; ) if (r(e[o], o, e)) return o;
    return -1;
  }
  return Uo = t5, Uo;
}
var Vo, Wp;
function Y0() {
  if (Wp) return Vo;
  Wp = 1;
  function t5(e) {
    return e !== e;
  }
  return Vo = t5, Vo;
}
var Xo, zp;
function Z0() {
  if (zp) return Xo;
  zp = 1;
  function t5(e, r, n) {
    for (var a = n - 1, i = e.length; ++a < i; ) if (e[a] === r) return a;
    return -1;
  }
  return Xo = t5, Xo;
}
var Yo, Kp;
function J0() {
  if (Kp) return Yo;
  Kp = 1;
  var t5 = My(), e = Y0(), r = Z0();
  function n(a, i, o) {
    return i === i ? r(a, i, o) : t5(a, e, o);
  }
  return Yo = n, Yo;
}
var Zo, Gp;
function Q0() {
  if (Gp) return Zo;
  Gp = 1;
  var t5 = J0();
  function e(r, n) {
    var a = r == null ? 0 : r.length;
    return !!a && t5(r, n, 0) > -1;
  }
  return Zo = e, Zo;
}
var Jo, Hp;
function ex() {
  if (Hp) return Jo;
  Hp = 1;
  function t5(e, r, n) {
    for (var a = -1, i = e == null ? 0 : e.length; ++a < i; ) if (n(r, e[a])) return true;
    return false;
  }
  return Jo = t5, Jo;
}
var Qo, Up;
function tx() {
  if (Up) return Qo;
  Up = 1;
  function t5() {
  }
  return Qo = t5, Qo;
}
var eu, Vp;
function rx() {
  if (Vp) return eu;
  Vp = 1;
  var t5 = $y(), e = tx(), r = Ws(), n = 1 / 0, a = t5 && 1 / r(new t5([, -0]))[1] == n ? function(i) {
    return new t5(i);
  } : e;
  return eu = a, eu;
}
var tu, Xp;
function nx() {
  if (Xp) return tu;
  Xp = 1;
  var t5 = wy(), e = Q0(), r = ex(), n = Sy(), a = rx(), i = Ws(), o = 200;
  function u(c, s, l) {
    var f = -1, p = e, v = c.length, m = true, h = [], d = h;
    if (l) m = false, p = r;
    else if (v >= o) {
      var b = s ? null : a(c);
      if (b) return i(b);
      m = false, p = n, d = new t5();
    } else d = s ? [] : h;
    e: for (; ++f < v; ) {
      var g = c[f], x = s ? s(g) : g;
      if (g = l || g !== 0 ? g : 0, m && x === x) {
        for (var w = d.length; w--; ) if (d[w] === x) continue e;
        s && d.push(x), h.push(g);
      } else p(d, x, l) || (d !== h && d.push(x), h.push(g));
    }
    return h;
  }
  return tu = u, tu;
}
var ru, Yp;
function ax() {
  if (Yp) return ru;
  Yp = 1;
  var t5 = qe(), e = nx();
  function r(n, a) {
    return n && n.length ? e(n, t5(a, 2)) : [];
  }
  return ru = r, ru;
}
var ix = ax();
const Zp = te(ix);
function ky(t5, e, r) {
  return e === true ? Zp(t5, r) : U(e) ? Zp(t5, e) : t5;
}
function Rt(t5) {
  "@babel/helpers - typeof";
  return Rt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Rt(t5);
}
var ox = ["ref"];
function Jp(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Be(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Jp(Object(r), true).forEach(function(n) {
      aa(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Jp(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function ux(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function Qp(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, Ny(n.key), n);
  }
}
function cx(t5, e, r) {
  return e && Qp(t5.prototype, e), r && Qp(t5, r), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function sx(t5, e, r) {
  return e = bn(e), lx(t5, Dy() ? Reflect.construct(e, r || [], bn(t5).constructor) : e.apply(t5, r));
}
function lx(t5, e) {
  if (e && (Rt(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return fx(t5);
}
function fx(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function Dy() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Dy = function() {
    return !!t5;
  })();
}
function bn(t5) {
  return bn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, bn(t5);
}
function px(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && $c(t5, e);
}
function $c(t5, e) {
  return $c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, $c(t5, e);
}
function aa(t5, e, r) {
  return e = Ny(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Ny(t5) {
  var e = dx(t5, "string");
  return Rt(e) == "symbol" ? e : e + "";
}
function dx(t5, e) {
  if (Rt(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Rt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
function vx(t5, e) {
  if (t5 == null) return {};
  var r = hx(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function hx(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
function yx(t5) {
  return t5.value;
}
function mx(t5, e) {
  if (P.isValidElement(t5)) return P.cloneElement(t5, e);
  if (typeof t5 == "function") return P.createElement(t5, e);
  e.ref;
  var r = vx(e, ox);
  return P.createElement(Fs, r);
}
var ed = 1, It = (function(t5) {
  function e() {
    var r;
    ux(this, e);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++) a[i] = arguments[i];
    return r = sx(this, e, [].concat(a)), aa(r, "lastBoundingBox", { width: -1, height: -1 }), r;
  }
  return px(e, t5), cx(e, [{ key: "componentDidMount", value: function() {
    this.updateBBox();
  } }, { key: "componentDidUpdate", value: function() {
    this.updateBBox();
  } }, { key: "getBBox", value: function() {
    if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
      var n = this.wrapperNode.getBoundingClientRect();
      return n.height = this.wrapperNode.offsetHeight, n.width = this.wrapperNode.offsetWidth, n;
    }
    return null;
  } }, { key: "updateBBox", value: function() {
    var n = this.props.onBBoxUpdate, a = this.getBBox();
    a ? (Math.abs(a.width - this.lastBoundingBox.width) > ed || Math.abs(a.height - this.lastBoundingBox.height) > ed) && (this.lastBoundingBox.width = a.width, this.lastBoundingBox.height = a.height, n && n(a)) : (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, n && n(null));
  } }, { key: "getBBoxSnapshot", value: function() {
    return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? Be({}, this.lastBoundingBox) : { width: 0, height: 0 };
  } }, { key: "getDefaultPosition", value: function(n) {
    var a = this.props, i = a.layout, o = a.align, u = a.verticalAlign, c = a.margin, s = a.chartWidth, l = a.chartHeight, f, p;
    if (!n || (n.left === void 0 || n.left === null) && (n.right === void 0 || n.right === null)) if (o === "center" && i === "vertical") {
      var v = this.getBBoxSnapshot();
      f = { left: ((s || 0) - v.width) / 2 };
    } else f = o === "right" ? { right: c && c.right || 0 } : { left: c && c.left || 0 };
    if (!n || (n.top === void 0 || n.top === null) && (n.bottom === void 0 || n.bottom === null)) if (u === "middle") {
      var m = this.getBBoxSnapshot();
      p = { top: ((l || 0) - m.height) / 2 };
    } else p = u === "bottom" ? { bottom: c && c.bottom || 0 } : { top: c && c.top || 0 };
    return Be(Be({}, f), p);
  } }, { key: "render", value: function() {
    var n = this, a = this.props, i = a.content, o = a.width, u = a.height, c = a.wrapperStyle, s = a.payloadUniqBy, l = a.payload, f = Be(Be({ position: "absolute", width: o || "auto", height: u || "auto" }, this.getDefaultPosition(c)), c);
    return P.createElement("div", { className: "recharts-legend-wrapper", style: f, ref: function(v) {
      n.wrapperNode = v;
    } }, mx(i, Be(Be({}, this.props), {}, { payload: ky(l, s, yx) })));
  } }], [{ key: "getWithHeight", value: function(n, a) {
    var i = Be(Be({}, this.defaultProps), n.props), o = i.layout;
    return o === "vertical" && N(n.props.height) ? { height: n.props.height } : o === "horizontal" ? { width: n.props.width || a } : null;
  } }]);
})(D.PureComponent);
aa(It, "displayName", "Legend");
aa(It, "defaultProps", { iconSize: 14, layout: "horizontal", align: "center", verticalAlign: "bottom" });
var nu, td;
function gx() {
  if (td) return nu;
  td = 1;
  var t5 = Qr(), e = zs(), r = xe(), n = t5 ? t5.isConcatSpreadable : void 0;
  function a(i) {
    return r(i) || e(i) || !!(n && i && i[n]);
  }
  return nu = a, nu;
}
var au, rd;
function qy() {
  if (rd) return au;
  rd = 1;
  var t5 = _y(), e = gx();
  function r(n, a, i, o, u) {
    var c = -1, s = n.length;
    for (i || (i = e), u || (u = []); ++c < s; ) {
      var l = n[c];
      a > 0 && i(l) ? a > 1 ? r(l, a - 1, i, o, u) : t5(u, l) : o || (u[u.length] = l);
    }
    return u;
  }
  return au = r, au;
}
var iu, nd;
function bx() {
  if (nd) return iu;
  nd = 1;
  function t5(e) {
    return function(r, n, a) {
      for (var i = -1, o = Object(r), u = a(r), c = u.length; c--; ) {
        var s = u[e ? c : ++i];
        if (n(o[s], s, o) === false) break;
      }
      return r;
    };
  }
  return iu = t5, iu;
}
var ou, ad;
function Ox() {
  if (ad) return ou;
  ad = 1;
  var t5 = bx(), e = t5();
  return ou = e, ou;
}
var uu, id;
function By() {
  if (id) return uu;
  id = 1;
  var t5 = Ox(), e = na();
  function r(n, a) {
    return n && t5(n, a, e);
  }
  return uu = r, uu;
}
var cu, od;
function xx() {
  if (od) return cu;
  od = 1;
  var t5 = rn();
  function e(r, n) {
    return function(a, i) {
      if (a == null) return a;
      if (!t5(a)) return r(a, i);
      for (var o = a.length, u = n ? o : -1, c = Object(a); (n ? u-- : ++u < o) && i(c[u], u, c) !== false; ) ;
      return a;
    };
  }
  return cu = e, cu;
}
var su, ud;
function Us() {
  if (ud) return su;
  ud = 1;
  var t5 = By(), e = xx(), r = e(t5);
  return su = r, su;
}
var lu, cd;
function Ly() {
  if (cd) return lu;
  cd = 1;
  var t5 = Us(), e = rn();
  function r(n, a) {
    var i = -1, o = e(n) ? Array(n.length) : [];
    return t5(n, function(u, c, s) {
      o[++i] = a(u, c, s);
    }), o;
  }
  return lu = r, lu;
}
var fu, sd;
function wx() {
  if (sd) return fu;
  sd = 1;
  function t5(e, r) {
    var n = e.length;
    for (e.sort(r); n--; ) e[n] = e[n].value;
    return e;
  }
  return fu = t5, fu;
}
var pu, ld;
function Ax() {
  if (ld) return pu;
  ld = 1;
  var t5 = Jt();
  function e(r, n) {
    if (r !== n) {
      var a = r !== void 0, i = r === null, o = r === r, u = t5(r), c = n !== void 0, s = n === null, l = n === n, f = t5(n);
      if (!s && !f && !u && r > n || u && c && l && !s && !f || i && c && l || !a && l || !o) return 1;
      if (!i && !u && !f && r < n || f && a && o && !i && !u || s && a && o || !c && o || !l) return -1;
    }
    return 0;
  }
  return pu = e, pu;
}
var du, fd;
function Sx() {
  if (fd) return du;
  fd = 1;
  var t5 = Ax();
  function e(r, n, a) {
    for (var i = -1, o = r.criteria, u = n.criteria, c = o.length, s = a.length; ++i < c; ) {
      var l = t5(o[i], u[i]);
      if (l) {
        if (i >= s) return l;
        var f = a[i];
        return l * (f == "desc" ? -1 : 1);
      }
    }
    return r.index - n.index;
  }
  return du = e, du;
}
var vu, pd;
function Px() {
  if (pd) return vu;
  pd = 1;
  var t5 = Ds(), e = Ns(), r = qe(), n = Ly(), a = wx(), i = jy(), o = Sx(), u = er(), c = xe();
  function s(l, f, p) {
    f.length ? f = t5(f, function(h) {
      return c(h) ? function(d) {
        return e(d, h.length === 1 ? h[0] : h);
      } : h;
    }) : f = [u];
    var v = -1;
    f = t5(f, i(r));
    var m = n(l, function(h, d, b) {
      var g = t5(f, function(x) {
        return x(h);
      });
      return { criteria: g, index: ++v, value: h };
    });
    return a(m, function(h, d) {
      return o(h, d, p);
    });
  }
  return vu = s, vu;
}
var hu, dd;
function _x() {
  if (dd) return hu;
  dd = 1;
  function t5(e, r, n) {
    switch (n.length) {
      case 0:
        return e.call(r);
      case 1:
        return e.call(r, n[0]);
      case 2:
        return e.call(r, n[0], n[1]);
      case 3:
        return e.call(r, n[0], n[1], n[2]);
    }
    return e.apply(r, n);
  }
  return hu = t5, hu;
}
var yu, vd;
function Ex() {
  if (vd) return yu;
  vd = 1;
  var t5 = _x(), e = Math.max;
  function r(n, a, i) {
    return a = e(a === void 0 ? n.length - 1 : a, 0), function() {
      for (var o = arguments, u = -1, c = e(o.length - a, 0), s = Array(c); ++u < c; ) s[u] = o[a + u];
      u = -1;
      for (var l = Array(a + 1); ++u < a; ) l[u] = o[u];
      return l[a] = i(s), t5(n, this, l);
    };
  }
  return yu = r, yu;
}
var mu, hd;
function jx() {
  if (hd) return mu;
  hd = 1;
  function t5(e) {
    return function() {
      return e;
    };
  }
  return mu = t5, mu;
}
var gu, yd;
function Fy() {
  if (yd) return gu;
  yd = 1;
  var t5 = mt(), e = (function() {
    try {
      var r = t5(Object, "defineProperty");
      return r({}, "", {}), r;
    } catch {
    }
  })();
  return gu = e, gu;
}
var bu, md;
function Tx() {
  if (md) return bu;
  md = 1;
  var t5 = jx(), e = Fy(), r = er(), n = e ? function(a, i) {
    return e(a, "toString", { configurable: true, enumerable: false, value: t5(i), writable: true });
  } : r;
  return bu = n, bu;
}
var Ou, gd;
function Ix() {
  if (gd) return Ou;
  gd = 1;
  var t5 = 800, e = 16, r = Date.now;
  function n(a) {
    var i = 0, o = 0;
    return function() {
      var u = r(), c = e - (u - o);
      if (o = u, c > 0) {
        if (++i >= t5) return arguments[0];
      } else i = 0;
      return a.apply(void 0, arguments);
    };
  }
  return Ou = n, Ou;
}
var xu, bd;
function $x() {
  if (bd) return xu;
  bd = 1;
  var t5 = Tx(), e = Ix(), r = e(t5);
  return xu = r, xu;
}
var wu, Od;
function Cx() {
  if (Od) return wu;
  Od = 1;
  var t5 = er(), e = Ex(), r = $x();
  function n(a, i) {
    return r(e(a, i, t5), a + "");
  }
  return wu = n, wu;
}
var Au, xd;
function ia() {
  if (xd) return Au;
  xd = 1;
  var t5 = Rs(), e = rn(), r = Ks(), n = Je();
  function a(i, o, u) {
    if (!n(u)) return false;
    var c = typeof o;
    return (c == "number" ? e(u) && r(o, u.length) : c == "string" && o in u) ? t5(u[o], i) : false;
  }
  return Au = a, Au;
}
var Su, wd;
function Rx() {
  if (wd) return Su;
  wd = 1;
  var t5 = qy(), e = Px(), r = Cx(), n = ia(), a = r(function(i, o) {
    if (i == null) return [];
    var u = o.length;
    return u > 1 && n(i, o[0], o[1]) ? o = [] : u > 2 && n(o[0], o[1], o[2]) && (o = [o[0]]), e(i, t5(o, 1), []);
  });
  return Su = a, Su;
}
var Mx = Rx();
const Vs = te(Mx);
function Pr(t5) {
  "@babel/helpers - typeof";
  return Pr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Pr(t5);
}
function Cc() {
  return Cc = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Cc.apply(this, arguments);
}
function kx(t5, e) {
  return Bx(t5) || qx(t5, e) || Nx(t5, e) || Dx();
}
function Dx() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Nx(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return Ad(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ad(t5, e);
  }
}
function Ad(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function qx(t5, e) {
  var r = t5 == null ? null : typeof Symbol < "u" && t5[Symbol.iterator] || t5["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = true, s = false;
    try {
      if (i = (r = r.call(t5)).next, e !== 0) for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); c = true) ;
    } catch (l) {
      s = true, a = l;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw a;
      }
    }
    return u;
  }
}
function Bx(t5) {
  if (Array.isArray(t5)) return t5;
}
function Sd(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Pu(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Sd(Object(r), true).forEach(function(n) {
      Lx(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Sd(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function Lx(t5, e, r) {
  return e = Fx(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Fx(t5) {
  var e = Wx(t5, "string");
  return Pr(e) == "symbol" ? e : e + "";
}
function Wx(t5, e) {
  if (Pr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Pr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
function zx(t5) {
  return Array.isArray(t5) && pe(t5[0]) && pe(t5[1]) ? t5.join(" ~ ") : t5;
}
var Kx = function(e) {
  var r = e.separator, n = r === void 0 ? " : " : r, a = e.contentStyle, i = a === void 0 ? {} : a, o = e.itemStyle, u = o === void 0 ? {} : o, c = e.labelStyle, s = c === void 0 ? {} : c, l = e.payload, f = e.formatter, p = e.itemSorter, v = e.wrapperClassName, m = e.labelClassName, h = e.label, d = e.labelFormatter, b = e.accessibilityLayer, g = b === void 0 ? false : b, x = function() {
    if (l && l.length) {
      var j = { padding: 0, margin: 0 }, I = (p ? Vs(l, p) : l).map(function(R, C) {
        if (R.type === "none") return null;
        var M = Pu({ display: "block", paddingTop: 4, paddingBottom: 4, color: R.color || "#000" }, u), k = R.formatter || f || zx, q = R.value, F = R.name, W = q, K = F;
        if (k && W != null && K != null) {
          var B = k(q, F, R, C, l);
          if (Array.isArray(B)) {
            var H = kx(B, 2);
            W = H[0], K = H[1];
          } else W = B;
        }
        return P.createElement("li", { className: "recharts-tooltip-item", key: "tooltip-item-".concat(C), style: M }, pe(K) ? P.createElement("span", { className: "recharts-tooltip-item-name" }, K) : null, pe(K) ? P.createElement("span", { className: "recharts-tooltip-item-separator" }, n) : null, P.createElement("span", { className: "recharts-tooltip-item-value" }, W), P.createElement("span", { className: "recharts-tooltip-item-unit" }, R.unit || ""));
      });
      return P.createElement("ul", { className: "recharts-tooltip-item-list", style: j }, I);
    }
    return null;
  }, w = Pu({ margin: 0, padding: 10, backgroundColor: "#fff", border: "1px solid #ccc", whiteSpace: "nowrap" }, i), y = Pu({ margin: 0 }, s), O = !X(h), A = O ? h : "", S = V("recharts-default-tooltip", v), _ = V("recharts-tooltip-label", m);
  O && d && l !== void 0 && l !== null && (A = d(h, l));
  var T = g ? { role: "status", "aria-live": "assertive" } : {};
  return P.createElement("div", Cc({ className: S, style: w }, T), P.createElement("p", { className: _, style: y }, P.isValidElement(A) ? A : "".concat(A)), x());
};
function _r(t5) {
  "@babel/helpers - typeof";
  return _r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, _r(t5);
}
function cn(t5, e, r) {
  return e = Gx(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Gx(t5) {
  var e = Hx(t5, "string");
  return _r(e) == "symbol" ? e : e + "";
}
function Hx(t5, e) {
  if (_r(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (_r(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
var lr = "recharts-tooltip-wrapper", Ux = { visibility: "hidden" };
function Vx(t5) {
  var e = t5.coordinate, r = t5.translateX, n = t5.translateY;
  return V(lr, cn(cn(cn(cn({}, "".concat(lr, "-right"), N(r) && e && N(e.x) && r >= e.x), "".concat(lr, "-left"), N(r) && e && N(e.x) && r < e.x), "".concat(lr, "-bottom"), N(n) && e && N(e.y) && n >= e.y), "".concat(lr, "-top"), N(n) && e && N(e.y) && n < e.y));
}
function Pd(t5) {
  var e = t5.allowEscapeViewBox, r = t5.coordinate, n = t5.key, a = t5.offsetTopLeft, i = t5.position, o = t5.reverseDirection, u = t5.tooltipDimension, c = t5.viewBox, s = t5.viewBoxDimension;
  if (i && N(i[n])) return i[n];
  var l = r[n] - u - a, f = r[n] + a;
  if (e[n]) return o[n] ? l : f;
  if (o[n]) {
    var p = l, v = c[n];
    return p < v ? Math.max(f, c[n]) : Math.max(l, c[n]);
  }
  var m = f + u, h = c[n] + s;
  return m > h ? Math.max(l, c[n]) : Math.max(f, c[n]);
}
function Xx(t5) {
  var e = t5.translateX, r = t5.translateY, n = t5.useTranslate3d;
  return { transform: n ? "translate3d(".concat(e, "px, ").concat(r, "px, 0)") : "translate(".concat(e, "px, ").concat(r, "px)") };
}
function Yx(t5) {
  var e = t5.allowEscapeViewBox, r = t5.coordinate, n = t5.offsetTopLeft, a = t5.position, i = t5.reverseDirection, o = t5.tooltipBox, u = t5.useTranslate3d, c = t5.viewBox, s, l, f;
  return o.height > 0 && o.width > 0 && r ? (l = Pd({ allowEscapeViewBox: e, coordinate: r, key: "x", offsetTopLeft: n, position: a, reverseDirection: i, tooltipDimension: o.width, viewBox: c, viewBoxDimension: c.width }), f = Pd({ allowEscapeViewBox: e, coordinate: r, key: "y", offsetTopLeft: n, position: a, reverseDirection: i, tooltipDimension: o.height, viewBox: c, viewBoxDimension: c.height }), s = Xx({ translateX: l, translateY: f, useTranslate3d: u })) : s = Ux, { cssProperties: s, cssClasses: Vx({ translateX: l, translateY: f, coordinate: r }) };
}
function Mt(t5) {
  "@babel/helpers - typeof";
  return Mt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Mt(t5);
}
function _d(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ed(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? _d(Object(r), true).forEach(function(n) {
      Mc(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : _d(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function Zx(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function Jx(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, zy(n.key), n);
  }
}
function Qx(t5, e, r) {
  return e && Jx(t5.prototype, e), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function ew(t5, e, r) {
  return e = On(e), tw(t5, Wy() ? Reflect.construct(e, r || [], On(t5).constructor) : e.apply(t5, r));
}
function tw(t5, e) {
  if (e && (Mt(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return rw(t5);
}
function rw(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function Wy() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Wy = function() {
    return !!t5;
  })();
}
function On(t5) {
  return On = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, On(t5);
}
function nw(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && Rc(t5, e);
}
function Rc(t5, e) {
  return Rc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Rc(t5, e);
}
function Mc(t5, e, r) {
  return e = zy(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function zy(t5) {
  var e = aw(t5, "string");
  return Mt(e) == "symbol" ? e : e + "";
}
function aw(t5, e) {
  if (Mt(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Mt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
var jd = 1, iw = (function(t5) {
  function e() {
    var r;
    Zx(this, e);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++) a[i] = arguments[i];
    return r = ew(this, e, [].concat(a)), Mc(r, "state", { dismissed: false, dismissedAtCoordinate: { x: 0, y: 0 }, lastBoundingBox: { width: -1, height: -1 } }), Mc(r, "handleKeyDown", function(o) {
      if (o.key === "Escape") {
        var u, c, s, l;
        r.setState({ dismissed: true, dismissedAtCoordinate: { x: (u = (c = r.props.coordinate) === null || c === void 0 ? void 0 : c.x) !== null && u !== void 0 ? u : 0, y: (s = (l = r.props.coordinate) === null || l === void 0 ? void 0 : l.y) !== null && s !== void 0 ? s : 0 } });
      }
    }), r;
  }
  return nw(e, t5), Qx(e, [{ key: "updateBBox", value: function() {
    if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
      var n = this.wrapperNode.getBoundingClientRect();
      (Math.abs(n.width - this.state.lastBoundingBox.width) > jd || Math.abs(n.height - this.state.lastBoundingBox.height) > jd) && this.setState({ lastBoundingBox: { width: n.width, height: n.height } });
    } else (this.state.lastBoundingBox.width !== -1 || this.state.lastBoundingBox.height !== -1) && this.setState({ lastBoundingBox: { width: -1, height: -1 } });
  } }, { key: "componentDidMount", value: function() {
    document.addEventListener("keydown", this.handleKeyDown), this.updateBBox();
  } }, { key: "componentWillUnmount", value: function() {
    document.removeEventListener("keydown", this.handleKeyDown);
  } }, { key: "componentDidUpdate", value: function() {
    var n, a;
    this.props.active && this.updateBBox(), this.state.dismissed && (((n = this.props.coordinate) === null || n === void 0 ? void 0 : n.x) !== this.state.dismissedAtCoordinate.x || ((a = this.props.coordinate) === null || a === void 0 ? void 0 : a.y) !== this.state.dismissedAtCoordinate.y) && (this.state.dismissed = false);
  } }, { key: "render", value: function() {
    var n = this, a = this.props, i = a.active, o = a.allowEscapeViewBox, u = a.animationDuration, c = a.animationEasing, s = a.children, l = a.coordinate, f = a.hasPayload, p = a.isAnimationActive, v = a.offset, m = a.position, h = a.reverseDirection, d = a.useTranslate3d, b = a.viewBox, g = a.wrapperStyle, x = Yx({ allowEscapeViewBox: o, coordinate: l, offsetTopLeft: v, position: m, reverseDirection: h, tooltipBox: this.state.lastBoundingBox, useTranslate3d: d, viewBox: b }), w = x.cssClasses, y = x.cssProperties, O = Ed(Ed({ transition: p && i ? "transform ".concat(u, "ms ").concat(c) : void 0 }, y), {}, { pointerEvents: "none", visibility: !this.state.dismissed && i && f ? "visible" : "hidden", position: "absolute", top: 0, left: 0 }, g);
    return P.createElement("div", { tabIndex: -1, className: w, style: O, ref: function(S) {
      n.wrapperNode = S;
    } }, s);
  } }]);
})(D.PureComponent), ow = function() {
  return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout);
}, tr = { isSsr: ow() };
function kt(t5) {
  "@babel/helpers - typeof";
  return kt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, kt(t5);
}
function Td(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Id(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Td(Object(r), true).forEach(function(n) {
      Xs(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Td(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function uw(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function cw(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, Gy(n.key), n);
  }
}
function sw(t5, e, r) {
  return e && cw(t5.prototype, e), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function lw(t5, e, r) {
  return e = xn(e), fw(t5, Ky() ? Reflect.construct(e, r || [], xn(t5).constructor) : e.apply(t5, r));
}
function fw(t5, e) {
  if (e && (kt(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return pw(t5);
}
function pw(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function Ky() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Ky = function() {
    return !!t5;
  })();
}
function xn(t5) {
  return xn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, xn(t5);
}
function dw(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && kc(t5, e);
}
function kc(t5, e) {
  return kc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, kc(t5, e);
}
function Xs(t5, e, r) {
  return e = Gy(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Gy(t5) {
  var e = vw(t5, "string");
  return kt(e) == "symbol" ? e : e + "";
}
function vw(t5, e) {
  if (kt(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (kt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
function hw(t5) {
  return t5.dataKey;
}
function yw(t5, e) {
  return P.isValidElement(t5) ? P.cloneElement(t5, e) : typeof t5 == "function" ? P.createElement(t5, e) : P.createElement(Kx, e);
}
var Le = (function(t5) {
  function e() {
    return uw(this, e), lw(this, e, arguments);
  }
  return dw(e, t5), sw(e, [{ key: "render", value: function() {
    var n = this, a = this.props, i = a.active, o = a.allowEscapeViewBox, u = a.animationDuration, c = a.animationEasing, s = a.content, l = a.coordinate, f = a.filterNull, p = a.isAnimationActive, v = a.offset, m = a.payload, h = a.payloadUniqBy, d = a.position, b = a.reverseDirection, g = a.useTranslate3d, x = a.viewBox, w = a.wrapperStyle, y = m ?? [];
    f && y.length && (y = ky(m.filter(function(A) {
      return A.value != null && (A.hide !== true || n.props.includeHidden);
    }), h, hw));
    var O = y.length > 0;
    return P.createElement(iw, { allowEscapeViewBox: o, animationDuration: u, animationEasing: c, isAnimationActive: p, active: i, coordinate: l, hasPayload: O, offset: v, position: d, reverseDirection: b, useTranslate3d: g, viewBox: x, wrapperStyle: w }, yw(s, Id(Id({}, this.props), {}, { payload: y })));
  } }]);
})(D.PureComponent);
Xs(Le, "displayName", "Tooltip");
Xs(Le, "defaultProps", { accessibilityLayer: false, allowEscapeViewBox: { x: false, y: false }, animationDuration: 400, animationEasing: "ease", contentStyle: {}, coordinate: { x: 0, y: 0 }, cursor: true, cursorStyle: {}, filterNull: true, isAnimationActive: !tr.isSsr, itemStyle: {}, labelStyle: {}, offset: 10, reverseDirection: { x: false, y: false }, separator: " : ", trigger: "hover", useTranslate3d: false, viewBox: { x: 0, y: 0, height: 0, width: 0 }, wrapperStyle: {} });
var _u, $d;
function mw() {
  if ($d) return _u;
  $d = 1;
  var t5 = Ne(), e = function() {
    return t5.Date.now();
  };
  return _u = e, _u;
}
var Eu, Cd;
function gw() {
  if (Cd) return Eu;
  Cd = 1;
  var t5 = /\s/;
  function e(r) {
    for (var n = r.length; n-- && t5.test(r.charAt(n)); ) ;
    return n;
  }
  return Eu = e, Eu;
}
var ju, Rd;
function bw() {
  if (Rd) return ju;
  Rd = 1;
  var t5 = gw(), e = /^\s+/;
  function r(n) {
    return n && n.slice(0, t5(n) + 1).replace(e, "");
  }
  return ju = r, ju;
}
var Tu, Md;
function Hy() {
  if (Md) return Tu;
  Md = 1;
  var t5 = bw(), e = Je(), r = Jt(), n = NaN, a = /^[-+]0x[0-9a-f]+$/i, i = /^0b[01]+$/i, o = /^0o[0-7]+$/i, u = parseInt;
  function c(s) {
    if (typeof s == "number") return s;
    if (r(s)) return n;
    if (e(s)) {
      var l = typeof s.valueOf == "function" ? s.valueOf() : s;
      s = e(l) ? l + "" : l;
    }
    if (typeof s != "string") return s === 0 ? s : +s;
    s = t5(s);
    var f = i.test(s);
    return f || o.test(s) ? u(s.slice(2), f ? 2 : 8) : a.test(s) ? n : +s;
  }
  return Tu = c, Tu;
}
var Iu, kd;
function Ow() {
  if (kd) return Iu;
  kd = 1;
  var t5 = Je(), e = mw(), r = Hy(), n = "Expected a function", a = Math.max, i = Math.min;
  function o(u, c, s) {
    var l, f, p, v, m, h, d = 0, b = false, g = false, x = true;
    if (typeof u != "function") throw new TypeError(n);
    c = r(c) || 0, t5(s) && (b = !!s.leading, g = "maxWait" in s, p = g ? a(r(s.maxWait) || 0, c) : p, x = "trailing" in s ? !!s.trailing : x);
    function w(I) {
      var R = l, C = f;
      return l = f = void 0, d = I, v = u.apply(C, R), v;
    }
    function y(I) {
      return d = I, m = setTimeout(S, c), b ? w(I) : v;
    }
    function O(I) {
      var R = I - h, C = I - d, M = c - R;
      return g ? i(M, p - C) : M;
    }
    function A(I) {
      var R = I - h, C = I - d;
      return h === void 0 || R >= c || R < 0 || g && C >= p;
    }
    function S() {
      var I = e();
      if (A(I)) return _(I);
      m = setTimeout(S, O(I));
    }
    function _(I) {
      return m = void 0, x && l ? w(I) : (l = f = void 0, v);
    }
    function T() {
      m !== void 0 && clearTimeout(m), d = 0, l = h = f = m = void 0;
    }
    function E() {
      return m === void 0 ? v : _(e());
    }
    function j() {
      var I = e(), R = A(I);
      if (l = arguments, f = this, h = I, R) {
        if (m === void 0) return y(h);
        if (g) return clearTimeout(m), m = setTimeout(S, c), w(h);
      }
      return m === void 0 && (m = setTimeout(S, c)), v;
    }
    return j.cancel = T, j.flush = E, j;
  }
  return Iu = o, Iu;
}
var $u, Dd;
function xw() {
  if (Dd) return $u;
  Dd = 1;
  var t5 = Ow(), e = Je(), r = "Expected a function";
  function n(a, i, o) {
    var u = true, c = true;
    if (typeof a != "function") throw new TypeError(r);
    return e(o) && (u = "leading" in o ? !!o.leading : u, c = "trailing" in o ? !!o.trailing : c), t5(a, i, { leading: u, maxWait: i, trailing: c });
  }
  return $u = n, $u;
}
var ww = xw();
const Uy = te(ww);
function Er(t5) {
  "@babel/helpers - typeof";
  return Er = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Er(t5);
}
function Nd(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function sn(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Nd(Object(r), true).forEach(function(n) {
      Aw(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Nd(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function Aw(t5, e, r) {
  return e = Sw(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Sw(t5) {
  var e = Pw(t5, "string");
  return Er(e) == "symbol" ? e : e + "";
}
function Pw(t5, e) {
  if (Er(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Er(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
function _w(t5, e) {
  return Iw(t5) || Tw(t5, e) || jw(t5, e) || Ew();
}
function Ew() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function jw(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return qd(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return qd(t5, e);
  }
}
function qd(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function Tw(t5, e) {
  var r = t5 == null ? null : typeof Symbol < "u" && t5[Symbol.iterator] || t5["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = true, s = false;
    try {
      if (i = (r = r.call(t5)).next, e !== 0) for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); c = true) ;
    } catch (l) {
      s = true, a = l;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw a;
      }
    }
    return u;
  }
}
function Iw(t5) {
  if (Array.isArray(t5)) return t5;
}
var XI = D.forwardRef(function(t5, e) {
  var r = t5.aspect, n = t5.initialDimension, a = n === void 0 ? { width: -1, height: -1 } : n, i = t5.width, o = i === void 0 ? "100%" : i, u = t5.height, c = u === void 0 ? "100%" : u, s = t5.minWidth, l = s === void 0 ? 0 : s, f = t5.minHeight, p = t5.maxHeight, v = t5.children, m = t5.debounce, h = m === void 0 ? 0 : m, d = t5.id, b = t5.className, g = t5.onResize, x = t5.style, w = x === void 0 ? {} : x, y = D.useRef(null), O = D.useRef();
  O.current = g, D.useImperativeHandle(e, function() {
    return Object.defineProperty(y.current, "current", { get: function() {
      return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), y.current;
    }, configurable: true });
  });
  var A = D.useState({ containerWidth: a.width, containerHeight: a.height }), S = _w(A, 2), _ = S[0], T = S[1], E = D.useCallback(function(I, R) {
    T(function(C) {
      var M = Math.round(I), k = Math.round(R);
      return C.containerWidth === M && C.containerHeight === k ? C : { containerWidth: M, containerHeight: k };
    });
  }, []);
  D.useEffect(function() {
    var I = function(F) {
      var W, K = F[0].contentRect, B = K.width, H = K.height;
      E(B, H), (W = O.current) === null || W === void 0 || W.call(O, B, H);
    };
    h > 0 && (I = Uy(I, h, { trailing: true, leading: false }));
    var R = new ResizeObserver(I), C = y.current.getBoundingClientRect(), M = C.width, k = C.height;
    return E(M, k), R.observe(y.current), function() {
      R.disconnect();
    };
  }, [E, h]);
  var j = D.useMemo(function() {
    var I = _.containerWidth, R = _.containerHeight;
    if (I < 0 || R < 0) return null;
    ze(st(o) || st(c), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, o, c), ze(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var C = st(o) ? I : o, M = st(c) ? R : c;
    r && r > 0 && (C ? M = C / r : M && (C = M * r), p && M > p && (M = p)), ze(C > 0 || M > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, C, M, o, c, l, f, r);
    var k = !Array.isArray(v) && We(v.type).endsWith("Chart");
    return P.Children.map(v, function(q) {
      return P.isValidElement(q) ? D.cloneElement(q, sn({ width: C, height: M }, k ? { style: sn({ height: "100%", width: "100%", maxHeight: M, maxWidth: C }, q.props.style) } : {})) : q;
    });
  }, [r, v, c, p, f, l, _, o]);
  return P.createElement("div", { id: d ? "".concat(d) : void 0, className: V("recharts-responsive-container", b), style: sn(sn({}, w), {}, { width: o, height: c, minWidth: l, minHeight: f, maxHeight: p }), ref: y }, j);
}), Ys = function(e) {
  return null;
};
Ys.displayName = "Cell";
function jr(t5) {
  "@babel/helpers - typeof";
  return jr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, jr(t5);
}
function Bd(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Dc(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Bd(Object(r), true).forEach(function(n) {
      $w(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Bd(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function $w(t5, e, r) {
  return e = Cw(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Cw(t5) {
  var e = Rw(t5, "string");
  return jr(e) == "symbol" ? e : e + "";
}
function Rw(t5, e) {
  if (jr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (jr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
var wt = { widthCache: {}, cacheCount: 0 }, Mw = 2e3, kw = { position: "absolute", top: "-20000px", left: 0, padding: 0, margin: 0, border: "none", whiteSpace: "pre" }, Ld = "recharts_measurement_span";
function Dw(t5) {
  var e = Dc({}, t5);
  return Object.keys(e).forEach(function(r) {
    e[r] || delete e[r];
  }), e;
}
var gr = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (e == null || tr.isSsr) return { width: 0, height: 0 };
  var n = Dw(r), a = JSON.stringify({ text: e, copyStyle: n });
  if (wt.widthCache[a]) return wt.widthCache[a];
  try {
    var i = document.getElementById(Ld);
    i || (i = document.createElement("span"), i.setAttribute("id", Ld), i.setAttribute("aria-hidden", "true"), document.body.appendChild(i));
    var o = Dc(Dc({}, kw), n);
    Object.assign(i.style, o), i.textContent = "".concat(e);
    var u = i.getBoundingClientRect(), c = { width: u.width, height: u.height };
    return wt.widthCache[a] = c, ++wt.cacheCount > Mw && (wt.cacheCount = 0, wt.widthCache = {}), c;
  } catch {
    return { width: 0, height: 0 };
  }
}, Nw = function(e) {
  return { top: e.top + window.scrollY - document.documentElement.clientTop, left: e.left + window.scrollX - document.documentElement.clientLeft };
};
function Tr(t5) {
  "@babel/helpers - typeof";
  return Tr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Tr(t5);
}
function wn(t5, e) {
  return Fw(t5) || Lw(t5, e) || Bw(t5, e) || qw();
}
function qw() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Bw(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return Fd(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Fd(t5, e);
  }
}
function Fd(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function Lw(t5, e) {
  var r = t5 == null ? null : typeof Symbol < "u" && t5[Symbol.iterator] || t5["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = true, s = false;
    try {
      if (i = (r = r.call(t5)).next, e === 0) {
        if (Object(r) !== r) return;
        c = false;
      } else for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); c = true) ;
    } catch (l) {
      s = true, a = l;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw a;
      }
    }
    return u;
  }
}
function Fw(t5) {
  if (Array.isArray(t5)) return t5;
}
function Ww(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function Wd(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, Kw(n.key), n);
  }
}
function zw(t5, e, r) {
  return e && Wd(t5.prototype, e), r && Wd(t5, r), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function Kw(t5) {
  var e = Gw(t5, "string");
  return Tr(e) == "symbol" ? e : e + "";
}
function Gw(t5, e) {
  if (Tr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Tr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
var zd = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, Kd = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, Hw = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/, Uw = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, Vy = { cm: 96 / 2.54, mm: 96 / 25.4, pt: 96 / 72, pc: 96 / 6, in: 96, Q: 96 / (2.54 * 40), px: 1 }, Vw = Object.keys(Vy), St = "NaN";
function Xw(t5, e) {
  return t5 * Vy[e];
}
var ln = (function() {
  function t5(e, r) {
    Ww(this, t5), this.num = e, this.unit = r, this.num = e, this.unit = r, Number.isNaN(e) && (this.unit = ""), r !== "" && !Hw.test(r) && (this.num = NaN, this.unit = ""), Vw.includes(r) && (this.num = Xw(e, r), this.unit = "px");
  }
  return zw(t5, [{ key: "add", value: function(r) {
    return this.unit !== r.unit ? new t5(NaN, "") : new t5(this.num + r.num, this.unit);
  } }, { key: "subtract", value: function(r) {
    return this.unit !== r.unit ? new t5(NaN, "") : new t5(this.num - r.num, this.unit);
  } }, { key: "multiply", value: function(r) {
    return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new t5(NaN, "") : new t5(this.num * r.num, this.unit || r.unit);
  } }, { key: "divide", value: function(r) {
    return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new t5(NaN, "") : new t5(this.num / r.num, this.unit || r.unit);
  } }, { key: "toString", value: function() {
    return "".concat(this.num).concat(this.unit);
  } }, { key: "isNaN", value: function() {
    return Number.isNaN(this.num);
  } }], [{ key: "parse", value: function(r) {
    var n, a = (n = Uw.exec(r)) !== null && n !== void 0 ? n : [], i = wn(a, 3), o = i[1], u = i[2];
    return new t5(parseFloat(o), u ?? "");
  } }]);
})();
function Xy(t5) {
  if (t5.includes(St)) return St;
  for (var e = t5; e.includes("*") || e.includes("/"); ) {
    var r, n = (r = zd.exec(e)) !== null && r !== void 0 ? r : [], a = wn(n, 4), i = a[1], o = a[2], u = a[3], c = ln.parse(i ?? ""), s = ln.parse(u ?? ""), l = o === "*" ? c.multiply(s) : c.divide(s);
    if (l.isNaN()) return St;
    e = e.replace(zd, l.toString());
  }
  for (; e.includes("+") || /.-\d+(?:\.\d+)?/.test(e); ) {
    var f, p = (f = Kd.exec(e)) !== null && f !== void 0 ? f : [], v = wn(p, 4), m = v[1], h = v[2], d = v[3], b = ln.parse(m ?? ""), g = ln.parse(d ?? ""), x = h === "+" ? b.add(g) : b.subtract(g);
    if (x.isNaN()) return St;
    e = e.replace(Kd, x.toString());
  }
  return e;
}
var Gd = /\(([^()]*)\)/;
function Yw(t5) {
  for (var e = t5; e.includes("("); ) {
    var r = Gd.exec(e), n = wn(r, 2), a = n[1];
    e = e.replace(Gd, Xy(a));
  }
  return e;
}
function Zw(t5) {
  var e = t5.replace(/\s+/g, "");
  return e = Yw(e), e = Xy(e), e;
}
function Jw(t5) {
  try {
    return Zw(t5);
  } catch {
    return St;
  }
}
function Cu(t5) {
  var e = Jw(t5.slice(5, -1));
  return e === St ? "" : e;
}
var Qw = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], eA = ["dx", "dy", "angle", "className", "breakAll"];
function Nc() {
  return Nc = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Nc.apply(this, arguments);
}
function Hd(t5, e) {
  if (t5 == null) return {};
  var r = tA(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function tA(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
function Ud(t5, e) {
  return iA(t5) || aA(t5, e) || nA(t5, e) || rA();
}
function rA() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function nA(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return Vd(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Vd(t5, e);
  }
}
function Vd(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function aA(t5, e) {
  var r = t5 == null ? null : typeof Symbol < "u" && t5[Symbol.iterator] || t5["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = true, s = false;
    try {
      if (i = (r = r.call(t5)).next, e === 0) {
        if (Object(r) !== r) return;
        c = false;
      } else for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); c = true) ;
    } catch (l) {
      s = true, a = l;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw a;
      }
    }
    return u;
  }
}
function iA(t5) {
  if (Array.isArray(t5)) return t5;
}
var Yy = /[ \f\n\r\t\v\u2028\u2029]+/, Zy = function(e) {
  var r = e.children, n = e.breakAll, a = e.style;
  try {
    var i = [];
    X(r) || (n ? i = r.toString().split("") : i = r.toString().split(Yy));
    var o = i.map(function(c) {
      return { word: c, width: gr(c, a).width };
    }), u = n ? 0 : gr("\xA0", a).width;
    return { wordsWithComputedWidth: o, spaceWidth: u };
  } catch {
    return null;
  }
}, oA = function(e, r, n, a, i) {
  var o = e.maxLines, u = e.children, c = e.style, s = e.breakAll, l = N(o), f = u, p = function() {
    var C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return C.reduce(function(M, k) {
      var q = k.word, F = k.width, W = M[M.length - 1];
      if (W && (a == null || i || W.width + F + n < Number(a))) W.words.push(q), W.width += F + n;
      else {
        var K = { words: [q], width: F };
        M.push(K);
      }
      return M;
    }, []);
  }, v = p(r), m = function(C) {
    return C.reduce(function(M, k) {
      return M.width > k.width ? M : k;
    });
  };
  if (!l) return v;
  for (var h = "\u2026", d = function(C) {
    var M = f.slice(0, C), k = Zy({ breakAll: s, style: c, children: M + h }).wordsWithComputedWidth, q = p(k), F = q.length > o || m(q).width > Number(a);
    return [F, q];
  }, b = 0, g = f.length - 1, x = 0, w; b <= g && x <= f.length - 1; ) {
    var y = Math.floor((b + g) / 2), O = y - 1, A = d(O), S = Ud(A, 2), _ = S[0], T = S[1], E = d(y), j = Ud(E, 1), I = j[0];
    if (!_ && !I && (b = y + 1), _ && I && (g = y - 1), !_ && I) {
      w = T;
      break;
    }
    x++;
  }
  return w || v;
}, Xd = function(e) {
  var r = X(e) ? [] : e.toString().split(Yy);
  return [{ words: r }];
}, uA = function(e) {
  var r = e.width, n = e.scaleToFit, a = e.children, i = e.style, o = e.breakAll, u = e.maxLines;
  if ((r || n) && !tr.isSsr) {
    var c, s, l = Zy({ breakAll: o, children: a, style: i });
    if (l) {
      var f = l.wordsWithComputedWidth, p = l.spaceWidth;
      c = f, s = p;
    } else return Xd(a);
    return oA({ breakAll: o, children: a, maxLines: u, style: i }, c, s, r, n);
  }
  return Xd(a);
}, Yd = "#808080", vt = function(e) {
  var r = e.x, n = r === void 0 ? 0 : r, a = e.y, i = a === void 0 ? 0 : a, o = e.lineHeight, u = o === void 0 ? "1em" : o, c = e.capHeight, s = c === void 0 ? "0.71em" : c, l = e.scaleToFit, f = l === void 0 ? false : l, p = e.textAnchor, v = p === void 0 ? "start" : p, m = e.verticalAnchor, h = m === void 0 ? "end" : m, d = e.fill, b = d === void 0 ? Yd : d, g = Hd(e, Qw), x = D.useMemo(function() {
    return uA({ breakAll: g.breakAll, children: g.children, maxLines: g.maxLines, scaleToFit: f, style: g.style, width: g.width });
  }, [g.breakAll, g.children, g.maxLines, f, g.style, g.width]), w = g.dx, y = g.dy, O = g.angle, A = g.className, S = g.breakAll, _ = Hd(g, eA);
  if (!pe(n) || !pe(i)) return null;
  var T = n + (N(w) ? w : 0), E = i + (N(y) ? y : 0), j;
  switch (h) {
    case "start":
      j = Cu("calc(".concat(s, ")"));
      break;
    case "middle":
      j = Cu("calc(".concat((x.length - 1) / 2, " * -").concat(u, " + (").concat(s, " / 2))"));
      break;
    default:
      j = Cu("calc(".concat(x.length - 1, " * -").concat(u, ")"));
      break;
  }
  var I = [];
  if (f) {
    var R = x[0].width, C = g.width;
    I.push("scale(".concat((N(C) ? C / R : 1) / R, ")"));
  }
  return O && I.push("rotate(".concat(O, ", ").concat(T, ", ").concat(E, ")")), I.length && (_.transform = I.join(" ")), P.createElement("text", Nc({}, G(_, true), { x: T, y: E, className: V("recharts-text", A), textAnchor: v, fill: b.includes("url") ? Yd : b }), x.map(function(M, k) {
    var q = M.words.join(S ? "" : " ");
    return P.createElement("tspan", { x: T, dy: k === 0 ? j : u, key: "".concat(q, "-").concat(k) }, q);
  }));
};
const Zd = Object.freeze(Object.defineProperty({ __proto__: null, scaleBand: Oc, scaleDiverging: Bg, scaleDivergingLog: Lg, scaleDivergingPow: Fg, scaleDivergingSqrt: Wg, scaleDivergingSymlog: zg, scaleIdentity: Kg, scaleImplicit: Gg, scaleLinear: xc, scaleLog: Hg, scaleOrdinal: Ug, scalePoint: mr, scalePow: Vg, scaleQuantile: Xg, scaleQuantize: Yg, scaleRadial: Zg, scaleSequential: Jg, scaleSequentialLog: Qg, scaleSequentialPow: eb, scaleSequentialQuantile: tb, scaleSequentialSqrt: rb, scaleSequentialSymlog: nb, scaleSqrt: ab, scaleSymlog: ib, scaleThreshold: ob, scaleTime: ub, scaleUtc: cb, tickFormat: sb }, Symbol.toStringTag, { value: "Module" }));
var Ru, Jd;
function oa() {
  if (Jd) return Ru;
  Jd = 1;
  var t5 = Jt();
  function e(r, n, a) {
    for (var i = -1, o = r.length; ++i < o; ) {
      var u = r[i], c = n(u);
      if (c != null && (s === void 0 ? c === c && !t5(c) : a(c, s))) var s = c, l = u;
    }
    return l;
  }
  return Ru = e, Ru;
}
var Mu, Qd;
function Jy() {
  if (Qd) return Mu;
  Qd = 1;
  function t5(e, r) {
    return e > r;
  }
  return Mu = t5, Mu;
}
var ku, ev;
function cA() {
  if (ev) return ku;
  ev = 1;
  var t5 = oa(), e = Jy(), r = er();
  function n(a) {
    return a && a.length ? t5(a, r, e) : void 0;
  }
  return ku = n, ku;
}
var sA = cA();
const ua = te(sA);
var Du, tv;
function Qy() {
  if (tv) return Du;
  tv = 1;
  function t5(e, r) {
    return e < r;
  }
  return Du = t5, Du;
}
var Nu, rv;
function lA() {
  if (rv) return Nu;
  rv = 1;
  var t5 = oa(), e = Qy(), r = er();
  function n(a) {
    return a && a.length ? t5(a, r, e) : void 0;
  }
  return Nu = n, Nu;
}
var fA = lA();
const ca = te(fA);
var qu, nv;
function pA() {
  if (nv) return qu;
  nv = 1;
  var t5 = Ds(), e = qe(), r = Ly(), n = xe();
  function a(i, o) {
    var u = n(i) ? t5 : r;
    return u(i, e(o, 3));
  }
  return qu = a, qu;
}
var Bu, av;
function dA() {
  if (av) return Bu;
  av = 1;
  var t5 = qy(), e = pA();
  function r(n, a) {
    return t5(e(n, a), 1);
  }
  return Bu = r, Bu;
}
var vA = dA();
const hA = te(vA);
var Lu, iv;
function yA() {
  if (iv) return Lu;
  iv = 1;
  var t5 = Hs();
  function e(r, n) {
    return t5(r, n);
  }
  return Lu = e, Lu;
}
var mA = yA();
const sa = te(mA);
var rr = 1e9, gA = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, Js, ie = true, Ie = "[DecimalError] ", ft = Ie + "Invalid argument: ", Zs = Ie + "Exponent out of range: ", nr = Math.floor, ut = Math.pow, bA = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Se, ve = 1e7, ae = 7, em = 9007199254740991, An = nr(em / ae), L = {};
L.absoluteValue = L.abs = function() {
  var t5 = new this.constructor(this);
  return t5.s && (t5.s = 1), t5;
};
L.comparedTo = L.cmp = function(t5) {
  var e, r, n, a, i = this;
  if (t5 = new i.constructor(t5), i.s !== t5.s) return i.s || -t5.s;
  if (i.e !== t5.e) return i.e > t5.e ^ i.s < 0 ? 1 : -1;
  for (n = i.d.length, a = t5.d.length, e = 0, r = n < a ? n : a; e < r; ++e) if (i.d[e] !== t5.d[e]) return i.d[e] > t5.d[e] ^ i.s < 0 ? 1 : -1;
  return n === a ? 0 : n > a ^ i.s < 0 ? 1 : -1;
};
L.decimalPlaces = L.dp = function() {
  var t5 = this, e = t5.d.length - 1, r = (e - t5.e) * ae;
  if (e = t5.d[e], e) for (; e % 10 == 0; e /= 10) r--;
  return r < 0 ? 0 : r;
};
L.dividedBy = L.div = function(t5) {
  return Ke(this, new this.constructor(t5));
};
L.dividedToIntegerBy = L.idiv = function(t5) {
  var e = this, r = e.constructor;
  return ee(Ke(e, new r(t5), 0, 1), r.precision);
};
L.equals = L.eq = function(t5) {
  return !this.cmp(t5);
};
L.exponent = function() {
  return se(this);
};
L.greaterThan = L.gt = function(t5) {
  return this.cmp(t5) > 0;
};
L.greaterThanOrEqualTo = L.gte = function(t5) {
  return this.cmp(t5) >= 0;
};
L.isInteger = L.isint = function() {
  return this.e > this.d.length - 2;
};
L.isNegative = L.isneg = function() {
  return this.s < 0;
};
L.isPositive = L.ispos = function() {
  return this.s > 0;
};
L.isZero = function() {
  return this.s === 0;
};
L.lessThan = L.lt = function(t5) {
  return this.cmp(t5) < 0;
};
L.lessThanOrEqualTo = L.lte = function(t5) {
  return this.cmp(t5) < 1;
};
L.logarithm = L.log = function(t5) {
  var e, r = this, n = r.constructor, a = n.precision, i = a + 5;
  if (t5 === void 0) t5 = new n(10);
  else if (t5 = new n(t5), t5.s < 1 || t5.eq(Se)) throw Error(Ie + "NaN");
  if (r.s < 1) throw Error(Ie + (r.s ? "NaN" : "-Infinity"));
  return r.eq(Se) ? new n(0) : (ie = false, e = Ke(Ir(r, i), Ir(t5, i), i), ie = true, ee(e, a));
};
L.minus = L.sub = function(t5) {
  var e = this;
  return t5 = new e.constructor(t5), e.s == t5.s ? nm(e, t5) : tm(e, (t5.s = -t5.s, t5));
};
L.modulo = L.mod = function(t5) {
  var e, r = this, n = r.constructor, a = n.precision;
  if (t5 = new n(t5), !t5.s) throw Error(Ie + "NaN");
  return r.s ? (ie = false, e = Ke(r, t5, 0, 1).times(t5), ie = true, r.minus(e)) : ee(new n(r), a);
};
L.naturalExponential = L.exp = function() {
  return rm(this);
};
L.naturalLogarithm = L.ln = function() {
  return Ir(this);
};
L.negated = L.neg = function() {
  var t5 = new this.constructor(this);
  return t5.s = -t5.s || 0, t5;
};
L.plus = L.add = function(t5) {
  var e = this;
  return t5 = new e.constructor(t5), e.s == t5.s ? tm(e, t5) : nm(e, (t5.s = -t5.s, t5));
};
L.precision = L.sd = function(t5) {
  var e, r, n, a = this;
  if (t5 !== void 0 && t5 !== !!t5 && t5 !== 1 && t5 !== 0) throw Error(ft + t5);
  if (e = se(a) + 1, n = a.d.length - 1, r = n * ae + 1, n = a.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = a.d[0]; n >= 10; n /= 10) r++;
  }
  return t5 && e > r ? e : r;
};
L.squareRoot = L.sqrt = function() {
  var t5, e, r, n, a, i, o, u = this, c = u.constructor;
  if (u.s < 1) {
    if (!u.s) return new c(0);
    throw Error(Ie + "NaN");
  }
  for (t5 = se(u), ie = false, a = Math.sqrt(+u), a == 0 || a == 1 / 0 ? (e = Me(u.d), (e.length + t5) % 2 == 0 && (e += "0"), a = Math.sqrt(e), t5 = nr((t5 + 1) / 2) - (t5 < 0 || t5 % 2), a == 1 / 0 ? e = "5e" + t5 : (e = a.toExponential(), e = e.slice(0, e.indexOf("e") + 1) + t5), n = new c(e)) : n = new c(a.toString()), r = c.precision, a = o = r + 3; ; ) if (i = n, n = i.plus(Ke(u, i, o + 2)).times(0.5), Me(i.d).slice(0, o) === (e = Me(n.d)).slice(0, o)) {
    if (e = e.slice(o - 3, o + 1), a == o && e == "4999") {
      if (ee(i, r + 1, 0), i.times(i).eq(u)) {
        n = i;
        break;
      }
    } else if (e != "9999") break;
    o += 4;
  }
  return ie = true, ee(n, r);
};
L.times = L.mul = function(t5) {
  var e, r, n, a, i, o, u, c, s, l = this, f = l.constructor, p = l.d, v = (t5 = new f(t5)).d;
  if (!l.s || !t5.s) return new f(0);
  for (t5.s *= l.s, r = l.e + t5.e, c = p.length, s = v.length, c < s && (i = p, p = v, v = i, o = c, c = s, s = o), i = [], o = c + s, n = o; n--; ) i.push(0);
  for (n = s; --n >= 0; ) {
    for (e = 0, a = c + n; a > n; ) u = i[a] + v[n] * p[a - n - 1] + e, i[a--] = u % ve | 0, e = u / ve | 0;
    i[a] = (i[a] + e) % ve | 0;
  }
  for (; !i[--o]; ) i.pop();
  return e ? ++r : i.shift(), t5.d = i, t5.e = r, ie ? ee(t5, f.precision) : t5;
};
L.toDecimalPlaces = L.todp = function(t5, e) {
  var r = this, n = r.constructor;
  return r = new n(r), t5 === void 0 ? r : (De(t5, 0, rr), e === void 0 ? e = n.rounding : De(e, 0, 8), ee(r, t5 + se(r) + 1, e));
};
L.toExponential = function(t5, e) {
  var r, n = this, a = n.constructor;
  return t5 === void 0 ? r = ht(n, true) : (De(t5, 0, rr), e === void 0 ? e = a.rounding : De(e, 0, 8), n = ee(new a(n), t5 + 1, e), r = ht(n, true, t5 + 1)), r;
};
L.toFixed = function(t5, e) {
  var r, n, a = this, i = a.constructor;
  return t5 === void 0 ? ht(a) : (De(t5, 0, rr), e === void 0 ? e = i.rounding : De(e, 0, 8), n = ee(new i(a), t5 + se(a) + 1, e), r = ht(n.abs(), false, t5 + se(n) + 1), a.isneg() && !a.isZero() ? "-" + r : r);
};
L.toInteger = L.toint = function() {
  var t5 = this, e = t5.constructor;
  return ee(new e(t5), se(t5) + 1, e.rounding);
};
L.toNumber = function() {
  return +this;
};
L.toPower = L.pow = function(t5) {
  var e, r, n, a, i, o, u = this, c = u.constructor, s = 12, l = +(t5 = new c(t5));
  if (!t5.s) return new c(Se);
  if (u = new c(u), !u.s) {
    if (t5.s < 1) throw Error(Ie + "Infinity");
    return u;
  }
  if (u.eq(Se)) return u;
  if (n = c.precision, t5.eq(Se)) return ee(u, n);
  if (e = t5.e, r = t5.d.length - 1, o = e >= r, i = u.s, o) {
    if ((r = l < 0 ? -l : l) <= em) {
      for (a = new c(Se), e = Math.ceil(n / ae + 4), ie = false; r % 2 && (a = a.times(u), uv(a.d, e)), r = nr(r / 2), r !== 0; ) u = u.times(u), uv(u.d, e);
      return ie = true, t5.s < 0 ? new c(Se).div(a) : ee(a, n);
    }
  } else if (i < 0) throw Error(Ie + "NaN");
  return i = i < 0 && t5.d[Math.max(e, r)] & 1 ? -1 : 1, u.s = 1, ie = false, a = t5.times(Ir(u, n + s)), ie = true, a = rm(a), a.s = i, a;
};
L.toPrecision = function(t5, e) {
  var r, n, a = this, i = a.constructor;
  return t5 === void 0 ? (r = se(a), n = ht(a, r <= i.toExpNeg || r >= i.toExpPos)) : (De(t5, 1, rr), e === void 0 ? e = i.rounding : De(e, 0, 8), a = ee(new i(a), t5, e), r = se(a), n = ht(a, t5 <= r || r <= i.toExpNeg, t5)), n;
};
L.toSignificantDigits = L.tosd = function(t5, e) {
  var r = this, n = r.constructor;
  return t5 === void 0 ? (t5 = n.precision, e = n.rounding) : (De(t5, 1, rr), e === void 0 ? e = n.rounding : De(e, 0, 8)), ee(new n(r), t5, e);
};
L.toString = L.valueOf = L.val = L.toJSON = L[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = function() {
  var t5 = this, e = se(t5), r = t5.constructor;
  return ht(t5, e <= r.toExpNeg || e >= r.toExpPos);
};
function tm(t5, e) {
  var r, n, a, i, o, u, c, s, l = t5.constructor, f = l.precision;
  if (!t5.s || !e.s) return e.s || (e = new l(t5)), ie ? ee(e, f) : e;
  if (c = t5.d, s = e.d, o = t5.e, a = e.e, c = c.slice(), i = o - a, i) {
    for (i < 0 ? (n = c, i = -i, u = s.length) : (n = s, a = o, u = c.length), o = Math.ceil(f / ae), u = o > u ? o + 1 : u + 1, i > u && (i = u, n.length = 1), n.reverse(); i--; ) n.push(0);
    n.reverse();
  }
  for (u = c.length, i = s.length, u - i < 0 && (i = u, n = s, s = c, c = n), r = 0; i; ) r = (c[--i] = c[i] + s[i] + r) / ve | 0, c[i] %= ve;
  for (r && (c.unshift(r), ++a), u = c.length; c[--u] == 0; ) c.pop();
  return e.d = c, e.e = a, ie ? ee(e, f) : e;
}
function De(t5, e, r) {
  if (t5 !== ~~t5 || t5 < e || t5 > r) throw Error(ft + t5);
}
function Me(t5) {
  var e, r, n, a = t5.length - 1, i = "", o = t5[0];
  if (a > 0) {
    for (i += o, e = 1; e < a; e++) n = t5[e] + "", r = ae - n.length, r && (i += Xe(r)), i += n;
    o = t5[e], n = o + "", r = ae - n.length, r && (i += Xe(r));
  } else if (o === 0) return "0";
  for (; o % 10 === 0; ) o /= 10;
  return i + o;
}
var Ke = /* @__PURE__ */ (function() {
  function t5(n, a) {
    var i, o = 0, u = n.length;
    for (n = n.slice(); u--; ) i = n[u] * a + o, n[u] = i % ve | 0, o = i / ve | 0;
    return o && n.unshift(o), n;
  }
  function e(n, a, i, o) {
    var u, c;
    if (i != o) c = i > o ? 1 : -1;
    else for (u = c = 0; u < i; u++) if (n[u] != a[u]) {
      c = n[u] > a[u] ? 1 : -1;
      break;
    }
    return c;
  }
  function r(n, a, i) {
    for (var o = 0; i--; ) n[i] -= o, o = n[i] < a[i] ? 1 : 0, n[i] = o * ve + n[i] - a[i];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, a, i, o) {
    var u, c, s, l, f, p, v, m, h, d, b, g, x, w, y, O, A, S, _ = n.constructor, T = n.s == a.s ? 1 : -1, E = n.d, j = a.d;
    if (!n.s) return new _(n);
    if (!a.s) throw Error(Ie + "Division by zero");
    for (c = n.e - a.e, A = j.length, y = E.length, v = new _(T), m = v.d = [], s = 0; j[s] == (E[s] || 0); ) ++s;
    if (j[s] > (E[s] || 0) && --c, i == null ? g = i = _.precision : o ? g = i + (se(n) - se(a)) + 1 : g = i, g < 0) return new _(0);
    if (g = g / ae + 2 | 0, s = 0, A == 1) for (l = 0, j = j[0], g++; (s < y || l) && g--; s++) x = l * ve + (E[s] || 0), m[s] = x / j | 0, l = x % j | 0;
    else {
      for (l = ve / (j[0] + 1) | 0, l > 1 && (j = t5(j, l), E = t5(E, l), A = j.length, y = E.length), w = A, h = E.slice(0, A), d = h.length; d < A; ) h[d++] = 0;
      S = j.slice(), S.unshift(0), O = j[0], j[1] >= ve / 2 && ++O;
      do
        l = 0, u = e(j, h, A, d), u < 0 ? (b = h[0], A != d && (b = b * ve + (h[1] || 0)), l = b / O | 0, l > 1 ? (l >= ve && (l = ve - 1), f = t5(j, l), p = f.length, d = h.length, u = e(f, h, p, d), u == 1 && (l--, r(f, A < p ? S : j, p))) : (l == 0 && (u = l = 1), f = j.slice()), p = f.length, p < d && f.unshift(0), r(h, f, d), u == -1 && (d = h.length, u = e(j, h, A, d), u < 1 && (l++, r(h, A < d ? S : j, d))), d = h.length) : u === 0 && (l++, h = [0]), m[s++] = l, u && h[0] ? h[d++] = E[w] || 0 : (h = [E[w]], d = 1);
      while ((w++ < y || h[0] !== void 0) && g--);
    }
    return m[0] || m.shift(), v.e = c, ee(v, o ? i + se(v) + 1 : i);
  };
})();
function rm(t5, e) {
  var r, n, a, i, o, u, c = 0, s = 0, l = t5.constructor, f = l.precision;
  if (se(t5) > 16) throw Error(Zs + se(t5));
  if (!t5.s) return new l(Se);
  for (ie = false, u = f, o = new l(0.03125); t5.abs().gte(0.1); ) t5 = t5.times(o), s += 5;
  for (n = Math.log(ut(2, s)) / Math.LN10 * 2 + 5 | 0, u += n, r = a = i = new l(Se), l.precision = u; ; ) {
    if (a = ee(a.times(t5), u), r = r.times(++c), o = i.plus(Ke(a, r, u)), Me(o.d).slice(0, u) === Me(i.d).slice(0, u)) {
      for (; s--; ) i = ee(i.times(i), u);
      return l.precision = f, e == null ? (ie = true, ee(i, f)) : i;
    }
    i = o;
  }
}
function se(t5) {
  for (var e = t5.e * ae, r = t5.d[0]; r >= 10; r /= 10) e++;
  return e;
}
function Fu(t5, e, r) {
  if (e > t5.LN10.sd()) throw ie = true, r && (t5.precision = r), Error(Ie + "LN10 precision limit exceeded");
  return ee(new t5(t5.LN10), e);
}
function Xe(t5) {
  for (var e = ""; t5--; ) e += "0";
  return e;
}
function Ir(t5, e) {
  var r, n, a, i, o, u, c, s, l, f = 1, p = 10, v = t5, m = v.d, h = v.constructor, d = h.precision;
  if (v.s < 1) throw Error(Ie + (v.s ? "NaN" : "-Infinity"));
  if (v.eq(Se)) return new h(0);
  if (e == null ? (ie = false, s = d) : s = e, v.eq(10)) return e == null && (ie = true), Fu(h, s);
  if (s += p, h.precision = s, r = Me(m), n = r.charAt(0), i = se(v), Math.abs(i) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; ) v = v.times(t5), r = Me(v.d), n = r.charAt(0), f++;
    i = se(v), n > 1 ? (v = new h("0." + r), i++) : v = new h(n + "." + r.slice(1));
  } else return c = Fu(h, s + 2, d).times(i + ""), v = Ir(new h(n + "." + r.slice(1)), s - p).plus(c), h.precision = d, e == null ? (ie = true, ee(v, d)) : v;
  for (u = o = v = Ke(v.minus(Se), v.plus(Se), s), l = ee(v.times(v), s), a = 3; ; ) {
    if (o = ee(o.times(l), s), c = u.plus(Ke(o, new h(a), s)), Me(c.d).slice(0, s) === Me(u.d).slice(0, s)) return u = u.times(2), i !== 0 && (u = u.plus(Fu(h, s + 2, d).times(i + ""))), u = Ke(u, new h(f), s), h.precision = d, e == null ? (ie = true, ee(u, d)) : u;
    u = c, a += 2;
  }
}
function ov(t5, e) {
  var r, n, a;
  for ((r = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (n = e.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +e.slice(n + 1), e = e.substring(0, n)) : r < 0 && (r = e.length), n = 0; e.charCodeAt(n) === 48; ) ++n;
  for (a = e.length; e.charCodeAt(a - 1) === 48; ) --a;
  if (e = e.slice(n, a), e) {
    if (a -= n, r = r - n - 1, t5.e = nr(r / ae), t5.d = [], n = (r + 1) % ae, r < 0 && (n += ae), n < a) {
      for (n && t5.d.push(+e.slice(0, n)), a -= ae; n < a; ) t5.d.push(+e.slice(n, n += ae));
      e = e.slice(n), n = ae - e.length;
    } else n -= a;
    for (; n--; ) e += "0";
    if (t5.d.push(+e), ie && (t5.e > An || t5.e < -An)) throw Error(Zs + r);
  } else t5.s = 0, t5.e = 0, t5.d = [0];
  return t5;
}
function ee(t5, e, r) {
  var n, a, i, o, u, c, s, l, f = t5.d;
  for (o = 1, i = f[0]; i >= 10; i /= 10) o++;
  if (n = e - o, n < 0) n += ae, a = e, s = f[l = 0];
  else {
    if (l = Math.ceil((n + 1) / ae), i = f.length, l >= i) return t5;
    for (s = i = f[l], o = 1; i >= 10; i /= 10) o++;
    n %= ae, a = n - ae + o;
  }
  if (r !== void 0 && (i = ut(10, o - a - 1), u = s / i % 10 | 0, c = e < 0 || f[l + 1] !== void 0 || s % i, c = r < 4 ? (u || c) && (r == 0 || r == (t5.s < 0 ? 3 : 2)) : u > 5 || u == 5 && (r == 4 || c || r == 6 && (n > 0 ? a > 0 ? s / ut(10, o - a) : 0 : f[l - 1]) % 10 & 1 || r == (t5.s < 0 ? 8 : 7))), e < 1 || !f[0]) return c ? (i = se(t5), f.length = 1, e = e - i - 1, f[0] = ut(10, (ae - e % ae) % ae), t5.e = nr(-e / ae) || 0) : (f.length = 1, f[0] = t5.e = t5.s = 0), t5;
  if (n == 0 ? (f.length = l, i = 1, l--) : (f.length = l + 1, i = ut(10, ae - n), f[l] = a > 0 ? (s / ut(10, o - a) % ut(10, a) | 0) * i : 0), c) for (; ; ) if (l == 0) {
    (f[0] += i) == ve && (f[0] = 1, ++t5.e);
    break;
  } else {
    if (f[l] += i, f[l] != ve) break;
    f[l--] = 0, i = 1;
  }
  for (n = f.length; f[--n] === 0; ) f.pop();
  if (ie && (t5.e > An || t5.e < -An)) throw Error(Zs + se(t5));
  return t5;
}
function nm(t5, e) {
  var r, n, a, i, o, u, c, s, l, f, p = t5.constructor, v = p.precision;
  if (!t5.s || !e.s) return e.s ? e.s = -e.s : e = new p(t5), ie ? ee(e, v) : e;
  if (c = t5.d, f = e.d, n = e.e, s = t5.e, c = c.slice(), o = s - n, o) {
    for (l = o < 0, l ? (r = c, o = -o, u = f.length) : (r = f, n = s, u = c.length), a = Math.max(Math.ceil(v / ae), u) + 2, o > a && (o = a, r.length = 1), r.reverse(), a = o; a--; ) r.push(0);
    r.reverse();
  } else {
    for (a = c.length, u = f.length, l = a < u, l && (u = a), a = 0; a < u; a++) if (c[a] != f[a]) {
      l = c[a] < f[a];
      break;
    }
    o = 0;
  }
  for (l && (r = c, c = f, f = r, e.s = -e.s), u = c.length, a = f.length - u; a > 0; --a) c[u++] = 0;
  for (a = f.length; a > o; ) {
    if (c[--a] < f[a]) {
      for (i = a; i && c[--i] === 0; ) c[i] = ve - 1;
      --c[i], c[a] += ve;
    }
    c[a] -= f[a];
  }
  for (; c[--u] === 0; ) c.pop();
  for (; c[0] === 0; c.shift()) --n;
  return c[0] ? (e.d = c, e.e = n, ie ? ee(e, v) : e) : new p(0);
}
function ht(t5, e, r) {
  var n, a = se(t5), i = Me(t5.d), o = i.length;
  return e ? (r && (n = r - o) > 0 ? i = i.charAt(0) + "." + i.slice(1) + Xe(n) : o > 1 && (i = i.charAt(0) + "." + i.slice(1)), i = i + (a < 0 ? "e" : "e+") + a) : a < 0 ? (i = "0." + Xe(-a - 1) + i, r && (n = r - o) > 0 && (i += Xe(n))) : a >= o ? (i += Xe(a + 1 - o), r && (n = r - a - 1) > 0 && (i = i + "." + Xe(n))) : ((n = a + 1) < o && (i = i.slice(0, n) + "." + i.slice(n)), r && (n = r - o) > 0 && (a + 1 === o && (i += "."), i += Xe(n))), t5.s < 0 ? "-" + i : i;
}
function uv(t5, e) {
  if (t5.length > e) return t5.length = e, true;
}
function am(t5) {
  var e, r, n;
  function a(i) {
    var o = this;
    if (!(o instanceof a)) return new a(i);
    if (o.constructor = a, i instanceof a) {
      o.s = i.s, o.e = i.e, o.d = (i = i.d) ? i.slice() : i;
      return;
    }
    if (typeof i == "number") {
      if (i * 0 !== 0) throw Error(ft + i);
      if (i > 0) o.s = 1;
      else if (i < 0) i = -i, o.s = -1;
      else {
        o.s = 0, o.e = 0, o.d = [0];
        return;
      }
      if (i === ~~i && i < 1e7) {
        o.e = 0, o.d = [i];
        return;
      }
      return ov(o, i.toString());
    } else if (typeof i != "string") throw Error(ft + i);
    if (i.charCodeAt(0) === 45 ? (i = i.slice(1), o.s = -1) : o.s = 1, bA.test(i)) ov(o, i);
    else throw Error(ft + i);
  }
  if (a.prototype = L, a.ROUND_UP = 0, a.ROUND_DOWN = 1, a.ROUND_CEIL = 2, a.ROUND_FLOOR = 3, a.ROUND_HALF_UP = 4, a.ROUND_HALF_DOWN = 5, a.ROUND_HALF_EVEN = 6, a.ROUND_HALF_CEIL = 7, a.ROUND_HALF_FLOOR = 8, a.clone = am, a.config = a.set = OA, t5 === void 0 && (t5 = {}), t5) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], e = 0; e < n.length; ) t5.hasOwnProperty(r = n[e++]) || (t5[r] = this[r]);
  return a.config(t5), a;
}
function OA(t5) {
  if (!t5 || typeof t5 != "object") throw Error(Ie + "Object expected");
  var e, r, n, a = ["precision", 1, rr, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
  for (e = 0; e < a.length; e += 3) if ((n = t5[r = a[e]]) !== void 0) if (nr(n) === n && n >= a[e + 1] && n <= a[e + 2]) this[r] = n;
  else throw Error(ft + r + ": " + n);
  if ((n = t5[r = "LN10"]) !== void 0) if (n == Math.LN10) this[r] = new this(n);
  else throw Error(ft + r + ": " + n);
  return this;
}
var Js = am(gA);
Se = new Js(1);
const Q = Js;
function xA(t5) {
  return PA(t5) || SA(t5) || AA(t5) || wA();
}
function wA() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function AA(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return qc(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return qc(t5, e);
  }
}
function SA(t5) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(t5)) return Array.from(t5);
}
function PA(t5) {
  if (Array.isArray(t5)) return qc(t5);
}
function qc(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
var _A = function(e) {
  return e;
}, im = {}, om = function(e) {
  return e === im;
}, cv = function(e) {
  return function r() {
    return arguments.length === 0 || arguments.length === 1 && om(arguments.length <= 0 ? void 0 : arguments[0]) ? r : e.apply(void 0, arguments);
  };
}, EA = function t3(e, r) {
  return e === 1 ? r : cv(function() {
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++) a[i] = arguments[i];
    var o = a.filter(function(u) {
      return u !== im;
    }).length;
    return o >= e ? r.apply(void 0, a) : t3(e - o, cv(function() {
      for (var u = arguments.length, c = new Array(u), s = 0; s < u; s++) c[s] = arguments[s];
      var l = a.map(function(f) {
        return om(f) ? c.shift() : f;
      });
      return r.apply(void 0, xA(l).concat(c));
    }));
  });
}, la = function(e) {
  return EA(e.length, e);
}, Bc = function(e, r) {
  for (var n = [], a = e; a < r; ++a) n[a - e] = a;
  return n;
}, jA = la(function(t5, e) {
  return Array.isArray(e) ? e.map(t5) : Object.keys(e).map(function(r) {
    return e[r];
  }).map(t5);
}), TA = function() {
  for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
  if (!r.length) return _A;
  var a = r.reverse(), i = a[0], o = a.slice(1);
  return function() {
    return o.reduce(function(u, c) {
      return c(u);
    }, i.apply(void 0, arguments));
  };
}, Lc = function(e) {
  return Array.isArray(e) ? e.reverse() : e.split("").reverse.join("");
}, um = function(e) {
  var r = null, n = null;
  return function() {
    for (var a = arguments.length, i = new Array(a), o = 0; o < a; o++) i[o] = arguments[o];
    return r && i.every(function(u, c) {
      return u === r[c];
    }) || (r = i, n = e.apply(void 0, i)), n;
  };
};
function IA(t5) {
  var e;
  return t5 === 0 ? e = 1 : e = Math.floor(new Q(t5).abs().log(10).toNumber()) + 1, e;
}
function $A(t5, e, r) {
  for (var n = new Q(t5), a = 0, i = []; n.lt(e) && a < 1e5; ) i.push(n.toNumber()), n = n.add(r), a++;
  return i;
}
var CA = la(function(t5, e, r) {
  var n = +t5, a = +e;
  return n + r * (a - n);
}), RA = la(function(t5, e, r) {
  var n = e - +t5;
  return n = n || 1 / 0, (r - t5) / n;
}), MA = la(function(t5, e, r) {
  var n = e - +t5;
  return n = n || 1 / 0, Math.max(0, Math.min(1, (r - t5) / n));
});
const fa = { rangeStep: $A, getDigitCount: IA, interpolateNumber: CA, uninterpolateNumber: RA, uninterpolateTruncation: MA };
function Fc(t5) {
  return NA(t5) || DA(t5) || cm(t5) || kA();
}
function kA() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function DA(t5) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(t5)) return Array.from(t5);
}
function NA(t5) {
  if (Array.isArray(t5)) return Wc(t5);
}
function $r(t5, e) {
  return LA(t5) || BA(t5, e) || cm(t5, e) || qA();
}
function qA() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function cm(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return Wc(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Wc(t5, e);
  }
}
function Wc(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function BA(t5, e) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(t5)))) {
    var r = [], n = true, a = false, i = void 0;
    try {
      for (var o = t5[Symbol.iterator](), u; !(n = (u = o.next()).done) && (r.push(u.value), !(e && r.length === e)); n = true) ;
    } catch (c) {
      a = true, i = c;
    } finally {
      try {
        !n && o.return != null && o.return();
      } finally {
        if (a) throw i;
      }
    }
    return r;
  }
}
function LA(t5) {
  if (Array.isArray(t5)) return t5;
}
function sm(t5) {
  var e = $r(t5, 2), r = e[0], n = e[1], a = r, i = n;
  return r > n && (a = n, i = r), [a, i];
}
function lm(t5, e, r) {
  if (t5.lte(0)) return new Q(0);
  var n = fa.getDigitCount(t5.toNumber()), a = new Q(10).pow(n), i = t5.div(a), o = n !== 1 ? 0.05 : 0.1, u = new Q(Math.ceil(i.div(o).toNumber())).add(r).mul(o), c = u.mul(a);
  return e ? c : new Q(Math.ceil(c));
}
function FA(t5, e, r) {
  var n = 1, a = new Q(t5);
  if (!a.isint() && r) {
    var i = Math.abs(t5);
    i < 1 ? (n = new Q(10).pow(fa.getDigitCount(t5) - 1), a = new Q(Math.floor(a.div(n).toNumber())).mul(n)) : i > 1 && (a = new Q(Math.floor(t5)));
  } else t5 === 0 ? a = new Q(Math.floor((e - 1) / 2)) : r || (a = new Q(Math.floor(t5)));
  var o = Math.floor((e - 1) / 2), u = TA(jA(function(c) {
    return a.add(new Q(c - o).mul(n)).toNumber();
  }), Bc);
  return u(0, e);
}
function fm(t5, e, r, n) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((e - t5) / (r - 1))) return { step: new Q(0), tickMin: new Q(0), tickMax: new Q(0) };
  var i = lm(new Q(e).sub(t5).div(r - 1), n, a), o;
  t5 <= 0 && e >= 0 ? o = new Q(0) : (o = new Q(t5).add(e).div(2), o = o.sub(new Q(o).mod(i)));
  var u = Math.ceil(o.sub(t5).div(i).toNumber()), c = Math.ceil(new Q(e).sub(o).div(i).toNumber()), s = u + c + 1;
  return s > r ? fm(t5, e, r, n, a + 1) : (s < r && (c = e > 0 ? c + (r - s) : c, u = e > 0 ? u : u + (r - s)), { step: i, tickMin: o.sub(new Q(u).mul(i)), tickMax: o.add(new Q(c).mul(i)) });
}
function WA(t5) {
  var e = $r(t5, 2), r = e[0], n = e[1], a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true, o = Math.max(a, 2), u = sm([r, n]), c = $r(u, 2), s = c[0], l = c[1];
  if (s === -1 / 0 || l === 1 / 0) {
    var f = l === 1 / 0 ? [s].concat(Fc(Bc(0, a - 1).map(function() {
      return 1 / 0;
    }))) : [].concat(Fc(Bc(0, a - 1).map(function() {
      return -1 / 0;
    })), [l]);
    return r > n ? Lc(f) : f;
  }
  if (s === l) return FA(s, a, i);
  var p = fm(s, l, o, i), v = p.step, m = p.tickMin, h = p.tickMax, d = fa.rangeStep(m, h.add(new Q(0.1).mul(v)), v);
  return r > n ? Lc(d) : d;
}
function zA(t5, e) {
  var r = $r(t5, 2), n = r[0], a = r[1], i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true, o = sm([n, a]), u = $r(o, 2), c = u[0], s = u[1];
  if (c === -1 / 0 || s === 1 / 0) return [n, a];
  if (c === s) return [c];
  var l = Math.max(e, 2), f = lm(new Q(s).sub(c).div(l - 1), i, 0), p = [].concat(Fc(fa.rangeStep(new Q(c), new Q(s).sub(new Q(0.99).mul(f)), f)), [s]);
  return n > a ? Lc(p) : p;
}
var KA = um(WA), GA = um(zA), HA = "Invariant failed";
function yt(t5, e) {
  throw new Error(HA);
}
var UA = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function Dt(t5) {
  "@babel/helpers - typeof";
  return Dt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Dt(t5);
}
function Sn() {
  return Sn = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Sn.apply(this, arguments);
}
function VA(t5, e) {
  return JA(t5) || ZA(t5, e) || YA(t5, e) || XA();
}
function XA() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function YA(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return sv(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return sv(t5, e);
  }
}
function sv(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function ZA(t5, e) {
  var r = t5 == null ? null : typeof Symbol < "u" && t5[Symbol.iterator] || t5["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = true, s = false;
    try {
      if (i = (r = r.call(t5)).next, e !== 0) for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); c = true) ;
    } catch (l) {
      s = true, a = l;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw a;
      }
    }
    return u;
  }
}
function JA(t5) {
  if (Array.isArray(t5)) return t5;
}
function QA(t5, e) {
  if (t5 == null) return {};
  var r = eS(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function eS(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
function tS(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function rS(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, vm(n.key), n);
  }
}
function nS(t5, e, r) {
  return e && rS(t5.prototype, e), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function aS(t5, e, r) {
  return e = Pn(e), iS(t5, pm() ? Reflect.construct(e, r || [], Pn(t5).constructor) : e.apply(t5, r));
}
function iS(t5, e) {
  if (e && (Dt(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return oS(t5);
}
function oS(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function pm() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (pm = function() {
    return !!t5;
  })();
}
function Pn(t5) {
  return Pn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Pn(t5);
}
function uS(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && zc(t5, e);
}
function zc(t5, e) {
  return zc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, zc(t5, e);
}
function dm(t5, e, r) {
  return e = vm(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function vm(t5) {
  var e = cS(t5, "string");
  return Dt(e) == "symbol" ? e : e + "";
}
function cS(t5, e) {
  if (Dt(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Dt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
var pa = (function(t5) {
  function e() {
    return tS(this, e), aS(this, e, arguments);
  }
  return uS(e, t5), nS(e, [{ key: "render", value: function() {
    var n = this.props, a = n.offset, i = n.layout, o = n.width, u = n.dataKey, c = n.data, s = n.dataPointFormatter, l = n.xAxis, f = n.yAxis, p = QA(n, UA), v = G(p, false);
    this.props.direction === "x" && l.type !== "number" && yt();
    var m = c.map(function(h) {
      var d = s(h, u), b = d.x, g = d.y, x = d.value, w = d.errorVal;
      if (!w) return null;
      var y = [], O, A;
      if (Array.isArray(w)) {
        var S = VA(w, 2);
        O = S[0], A = S[1];
      } else O = A = w;
      if (i === "vertical") {
        var _ = l.scale, T = g + a, E = T + o, j = T - o, I = _(x - O), R = _(x + A);
        y.push({ x1: R, y1: E, x2: R, y2: j }), y.push({ x1: I, y1: T, x2: R, y2: T }), y.push({ x1: I, y1: E, x2: I, y2: j });
      } else if (i === "horizontal") {
        var C = f.scale, M = b + a, k = M - o, q = M + o, F = C(x - O), W = C(x + A);
        y.push({ x1: k, y1: W, x2: q, y2: W }), y.push({ x1: M, y1: F, x2: M, y2: W }), y.push({ x1: k, y1: F, x2: q, y2: F });
      }
      return P.createElement(J, Sn({ className: "recharts-errorBar", key: "bar-".concat(y.map(function(K) {
        return "".concat(K.x1, "-").concat(K.x2, "-").concat(K.y1, "-").concat(K.y2);
      })) }, v), y.map(function(K) {
        return P.createElement("line", Sn({}, K, { key: "line-".concat(K.x1, "-").concat(K.x2, "-").concat(K.y1, "-").concat(K.y2) }));
      }));
    });
    return P.createElement(J, { className: "recharts-errorBars" }, m);
  } }]);
})(P.Component);
dm(pa, "defaultProps", { stroke: "black", strokeWidth: 1.5, width: 5, offset: 0, layout: "horizontal" });
dm(pa, "displayName", "ErrorBar");
function Cr(t5) {
  "@babel/helpers - typeof";
  return Cr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Cr(t5);
}
function lv(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function at(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? lv(Object(r), true).forEach(function(n) {
      sS(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : lv(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function sS(t5, e, r) {
  return e = lS(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function lS(t5) {
  var e = fS(t5, "string");
  return Cr(e) == "symbol" ? e : e + "";
}
function fS(t5, e) {
  if (Cr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Cr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
var hm = function(e) {
  var r = e.children, n = e.formattedGraphicalItems, a = e.legendWidth, i = e.legendContent, o = Ae(r, It);
  if (!o) return null;
  var u = It.defaultProps, c = u !== void 0 ? at(at({}, u), o.props) : {}, s;
  return o.props && o.props.payload ? s = o.props && o.props.payload : i === "children" ? s = (n || []).reduce(function(l, f) {
    var p = f.item, v = f.props, m = v.sectors || v.data || [];
    return l.concat(m.map(function(h) {
      return { type: o.props.iconType || p.props.legendType, value: h.name, color: h.fill, payload: h };
    }));
  }, []) : s = (n || []).map(function(l) {
    var f = l.item, p = f.type.defaultProps, v = p !== void 0 ? at(at({}, p), f.props) : {}, m = v.dataKey, h = v.name, d = v.legendType, b = v.hide;
    return { inactive: b, dataKey: m, type: c.iconType || d || "square", color: Qs(f), value: h || m, payload: v };
  }), at(at(at({}, c), It.getWithHeight(o, a)), {}, { payload: s, item: o });
};
function Rr(t5) {
  "@babel/helpers - typeof";
  return Rr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Rr(t5);
}
function fv(t5) {
  return hS(t5) || vS(t5) || dS(t5) || pS();
}
function pS() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function dS(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return Kc(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Kc(t5, e);
  }
}
function vS(t5) {
  if (typeof Symbol < "u" && t5[Symbol.iterator] != null || t5["@@iterator"] != null) return Array.from(t5);
}
function hS(t5) {
  if (Array.isArray(t5)) return Kc(t5);
}
function Kc(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function pv(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ue(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? pv(Object(r), true).forEach(function(n) {
      $t(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : pv(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function $t(t5, e, r) {
  return e = yS(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function yS(t5) {
  var e = mS(t5, "string");
  return Rr(e) == "symbol" ? e : e + "";
}
function mS(t5, e) {
  if (Rr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Rr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
function ge(t5, e, r) {
  return X(t5) || X(e) ? r : pe(e) ? Pe(t5, e, r) : U(e) ? e(t5) : r;
}
function br(t5, e, r, n) {
  var a = hA(t5, function(u) {
    return ge(u, e);
  });
  if (r === "number") {
    var i = a.filter(function(u) {
      return N(u) || parseFloat(u);
    });
    return i.length ? [ca(i), ua(i)] : [1 / 0, -1 / 0];
  }
  var o = n ? a.filter(function(u) {
    return !X(u);
  }) : a;
  return o.map(function(u) {
    return pe(u) || u instanceof Date ? u : "";
  });
}
var gS = function(e) {
  var r, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], a = arguments.length > 2 ? arguments[2] : void 0, i = arguments.length > 3 ? arguments[3] : void 0, o = -1, u = (r = n == null ? void 0 : n.length) !== null && r !== void 0 ? r : 0;
  if (u <= 1) return 0;
  if (i && i.axisType === "angleAxis" && Math.abs(Math.abs(i.range[1] - i.range[0]) - 360) <= 1e-6) for (var c = i.range, s = 0; s < u; s++) {
    var l = s > 0 ? a[s - 1].coordinate : a[u - 1].coordinate, f = a[s].coordinate, p = s >= u - 1 ? a[0].coordinate : a[s + 1].coordinate, v = void 0;
    if (be(f - l) !== be(p - f)) {
      var m = [];
      if (be(p - f) === be(c[1] - c[0])) {
        v = p;
        var h = f + c[1] - c[0];
        m[0] = Math.min(h, (h + l) / 2), m[1] = Math.max(h, (h + l) / 2);
      } else {
        v = l;
        var d = p + c[1] - c[0];
        m[0] = Math.min(f, (d + f) / 2), m[1] = Math.max(f, (d + f) / 2);
      }
      var b = [Math.min(f, (v + f) / 2), Math.max(f, (v + f) / 2)];
      if (e > b[0] && e <= b[1] || e >= m[0] && e <= m[1]) {
        o = a[s].index;
        break;
      }
    } else {
      var g = Math.min(l, p), x = Math.max(l, p);
      if (e > (g + f) / 2 && e <= (x + f) / 2) {
        o = a[s].index;
        break;
      }
    }
  }
  else for (var w = 0; w < u; w++) if (w === 0 && e <= (n[w].coordinate + n[w + 1].coordinate) / 2 || w > 0 && w < u - 1 && e > (n[w].coordinate + n[w - 1].coordinate) / 2 && e <= (n[w].coordinate + n[w + 1].coordinate) / 2 || w === u - 1 && e > (n[w].coordinate + n[w - 1].coordinate) / 2) {
    o = n[w].index;
    break;
  }
  return o;
}, Qs = function(e) {
  var r, n = e, a = n.type.displayName, i = (r = e.type) !== null && r !== void 0 && r.defaultProps ? ue(ue({}, e.type.defaultProps), e.props) : e.props, o = i.stroke, u = i.fill, c;
  switch (a) {
    case "Line":
      c = o;
      break;
    case "Area":
    case "Radar":
      c = o && o !== "none" ? o : u;
      break;
    default:
      c = u;
      break;
  }
  return c;
}, bS = function(e) {
  var r = e.barSize, n = e.totalSize, a = e.stackGroups, i = a === void 0 ? {} : a;
  if (!i) return {};
  for (var o = {}, u = Object.keys(i), c = 0, s = u.length; c < s; c++) for (var l = i[u[c]].stackGroups, f = Object.keys(l), p = 0, v = f.length; p < v; p++) {
    var m = l[f[p]], h = m.items, d = m.cateAxisId, b = h.filter(function(A) {
      return We(A.type).indexOf("Bar") >= 0;
    });
    if (b && b.length) {
      var g = b[0].type.defaultProps, x = g !== void 0 ? ue(ue({}, g), b[0].props) : b[0].props, w = x.barSize, y = x[d];
      o[y] || (o[y] = []);
      var O = X(w) ? r : w;
      o[y].push({ item: b[0], stackList: b.slice(1), barSize: X(O) ? void 0 : Oe(O, n, 0) });
    }
  }
  return o;
}, OS = function(e) {
  var r = e.barGap, n = e.barCategoryGap, a = e.bandSize, i = e.sizeList, o = i === void 0 ? [] : i, u = e.maxBarSize, c = o.length;
  if (c < 1) return null;
  var s = Oe(r, a, 0, true), l, f = [];
  if (o[0].barSize === +o[0].barSize) {
    var p = false, v = a / c, m = o.reduce(function(w, y) {
      return w + y.barSize || 0;
    }, 0);
    m += (c - 1) * s, m >= a && (m -= (c - 1) * s, s = 0), m >= a && v > 0 && (p = true, v *= 0.9, m = c * v);
    var h = (a - m) / 2 >> 0, d = { offset: h - s, size: 0 };
    l = o.reduce(function(w, y) {
      var O = { item: y.item, position: { offset: d.offset + d.size + s, size: p ? v : y.barSize } }, A = [].concat(fv(w), [O]);
      return d = A[A.length - 1].position, y.stackList && y.stackList.length && y.stackList.forEach(function(S) {
        A.push({ item: S, position: d });
      }), A;
    }, f);
  } else {
    var b = Oe(n, a, 0, true);
    a - 2 * b - (c - 1) * s <= 0 && (s = 0);
    var g = (a - 2 * b - (c - 1) * s) / c;
    g > 1 && (g >>= 0);
    var x = u === +u ? Math.min(g, u) : g;
    l = o.reduce(function(w, y, O) {
      var A = [].concat(fv(w), [{ item: y.item, position: { offset: b + (g + s) * O + (g - x) / 2, size: x } }]);
      return y.stackList && y.stackList.length && y.stackList.forEach(function(S) {
        A.push({ item: S, position: A[A.length - 1].position });
      }), A;
    }, f);
  }
  return l;
}, xS = function(e, r, n, a) {
  var i = n.children, o = n.width, u = n.margin, c = o - (u.left || 0) - (u.right || 0), s = hm({ children: i, legendWidth: c });
  if (s) {
    var l = a || {}, f = l.width, p = l.height, v = s.align, m = s.verticalAlign, h = s.layout;
    if ((h === "vertical" || h === "horizontal" && m === "middle") && v !== "center" && N(e[v])) return ue(ue({}, e), {}, $t({}, v, e[v] + (f || 0)));
    if ((h === "horizontal" || h === "vertical" && v === "center") && m !== "middle" && N(e[m])) return ue(ue({}, e), {}, $t({}, m, e[m] + (p || 0)));
  }
  return e;
}, wS = function(e, r, n) {
  return X(r) ? true : e === "horizontal" ? r === "yAxis" : e === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : true;
}, ym = function(e, r, n, a, i) {
  var o = r.props.children, u = Te(o, pa).filter(function(s) {
    return wS(a, i, s.props.direction);
  });
  if (u && u.length) {
    var c = u.map(function(s) {
      return s.props.dataKey;
    });
    return e.reduce(function(s, l) {
      var f = ge(l, n);
      if (X(f)) return s;
      var p = Array.isArray(f) ? [ca(f), ua(f)] : [f, f], v = c.reduce(function(m, h) {
        var d = ge(l, h, 0), b = p[0] - Math.abs(Array.isArray(d) ? d[0] : d), g = p[1] + Math.abs(Array.isArray(d) ? d[1] : d);
        return [Math.min(b, m[0]), Math.max(g, m[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(v[0], s[0]), Math.max(v[1], s[1])];
    }, [1 / 0, -1 / 0]);
  }
  return null;
}, AS = function(e, r, n, a, i) {
  var o = r.map(function(u) {
    return ym(e, u, n, i, a);
  }).filter(function(u) {
    return !X(u);
  });
  return o && o.length ? o.reduce(function(u, c) {
    return [Math.min(u[0], c[0]), Math.max(u[1], c[1])];
  }, [1 / 0, -1 / 0]) : null;
}, mm = function(e, r, n, a, i) {
  var o = r.map(function(c) {
    var s = c.props.dataKey;
    return n === "number" && s && ym(e, c, s, a) || br(e, s, n, i);
  });
  if (n === "number") return o.reduce(function(c, s) {
    return [Math.min(c[0], s[0]), Math.max(c[1], s[1])];
  }, [1 / 0, -1 / 0]);
  var u = {};
  return o.reduce(function(c, s) {
    for (var l = 0, f = s.length; l < f; l++) u[s[l]] || (u[s[l]] = true, c.push(s[l]));
    return c;
  }, []);
}, gm = function(e, r) {
  return e === "horizontal" && r === "xAxis" || e === "vertical" && r === "yAxis" || e === "centric" && r === "angleAxis" || e === "radial" && r === "radiusAxis";
}, lt = function(e, r, n) {
  if (!e) return null;
  var a = e.scale, i = e.duplicateDomain, o = e.type, u = e.range, c = e.realScaleType === "scaleBand" ? a.bandwidth() / 2 : 2, s = (r || n) && o === "category" && a.bandwidth ? a.bandwidth() / c : 0;
  if (s = e.axisType === "angleAxis" && (u == null ? void 0 : u.length) >= 2 ? be(u[0] - u[1]) * 2 * s : s, r && (e.ticks || e.niceTicks)) {
    var l = (e.ticks || e.niceTicks).map(function(f) {
      var p = i ? i.indexOf(f) : f;
      return { coordinate: a(p) + s, value: f, offset: s };
    });
    return l.filter(function(f) {
      return !en(f.coordinate);
    });
  }
  return e.isCategorical && e.categoricalDomain ? e.categoricalDomain.map(function(f, p) {
    return { coordinate: a(f) + s, value: f, index: p, offset: s };
  }) : a.ticks && !n ? a.ticks(e.tickCount).map(function(f) {
    return { coordinate: a(f) + s, value: f, offset: s };
  }) : a.domain().map(function(f, p) {
    return { coordinate: a(f) + s, value: i ? i[f] : f, index: p, offset: s };
  });
}, Wu = /* @__PURE__ */ new WeakMap(), fn = function(e, r) {
  if (typeof r != "function") return e;
  Wu.has(e) || Wu.set(e, /* @__PURE__ */ new WeakMap());
  var n = Wu.get(e);
  if (n.has(r)) return n.get(r);
  var a = function() {
    e.apply(void 0, arguments), r.apply(void 0, arguments);
  };
  return n.set(r, a), a;
}, bm = function(e, r, n) {
  var a = e.scale, i = e.type, o = e.layout, u = e.axisType;
  if (a === "auto") return o === "radial" && u === "radiusAxis" ? { scale: Oc(), realScaleType: "band" } : o === "radial" && u === "angleAxis" ? { scale: xc(), realScaleType: "linear" } : i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? { scale: mr(), realScaleType: "point" } : i === "category" ? { scale: Oc(), realScaleType: "band" } : { scale: xc(), realScaleType: "linear" };
  if (pt(a)) {
    var c = "scale".concat(ra(a));
    return { scale: (Zd[c] || mr)(), realScaleType: Zd[c] ? c : "point" };
  }
  return U(a) ? { scale: a } : { scale: mr(), realScaleType: "point" };
}, dv = 1e-4, Om = function(e) {
  var r = e.domain();
  if (!(!r || r.length <= 2)) {
    var n = r.length, a = e.range(), i = Math.min(a[0], a[1]) - dv, o = Math.max(a[0], a[1]) + dv, u = e(r[0]), c = e(r[n - 1]);
    (u < i || u > o || c < i || c > o) && e.domain([r[0], r[n - 1]]);
  }
}, SS = function(e, r) {
  if (!e) return null;
  for (var n = 0, a = e.length; n < a; n++) if (e[n].item === r) return e[n].position;
  return null;
}, PS = function(e, r) {
  if (!r || r.length !== 2 || !N(r[0]) || !N(r[1])) return e;
  var n = Math.min(r[0], r[1]), a = Math.max(r[0], r[1]), i = [e[0], e[1]];
  return (!N(e[0]) || e[0] < n) && (i[0] = n), (!N(e[1]) || e[1] > a) && (i[1] = a), i[0] > a && (i[0] = a), i[1] < n && (i[1] = n), i;
}, _S = function(e) {
  var r = e.length;
  if (!(r <= 0)) for (var n = 0, a = e[0].length; n < a; ++n) for (var i = 0, o = 0, u = 0; u < r; ++u) {
    var c = en(e[u][n][1]) ? e[u][n][0] : e[u][n][1];
    c >= 0 ? (e[u][n][0] = i, e[u][n][1] = i + c, i = e[u][n][1]) : (e[u][n][0] = o, e[u][n][1] = o + c, o = e[u][n][1]);
  }
}, ES = function(e) {
  var r = e.length;
  if (!(r <= 0)) for (var n = 0, a = e[0].length; n < a; ++n) for (var i = 0, o = 0; o < r; ++o) {
    var u = en(e[o][n][1]) ? e[o][n][0] : e[o][n][1];
    u >= 0 ? (e[o][n][0] = i, e[o][n][1] = i + u, i = e[o][n][1]) : (e[o][n][0] = 0, e[o][n][1] = 0);
  }
}, jS = { sign: _S, expand: hb, none: vb, silhouette: db, wiggle: pb, positive: ES }, TS = function(e, r, n) {
  var a = r.map(function(u) {
    return u.props.dataKey;
  }), i = jS[n], o = lb().keys(a).value(function(u, c) {
    return +ge(u, c, 0);
  }).order(fb).offset(i);
  return o(e);
}, IS = function(e, r, n, a, i, o) {
  if (!e) return null;
  var u = o ? r.reverse() : r, c = {}, s = u.reduce(function(f, p) {
    var v, m = (v = p.type) !== null && v !== void 0 && v.defaultProps ? ue(ue({}, p.type.defaultProps), p.props) : p.props, h = m.stackId, d = m.hide;
    if (d) return f;
    var b = m[n], g = f[b] || { hasStack: false, stackGroups: {} };
    if (pe(h)) {
      var x = g.stackGroups[h] || { numericAxisId: n, cateAxisId: a, items: [] };
      x.items.push(p), g.hasStack = true, g.stackGroups[h] = x;
    } else g.stackGroups[tn("_stackId_")] = { numericAxisId: n, cateAxisId: a, items: [p] };
    return ue(ue({}, f), {}, $t({}, b, g));
  }, c), l = {};
  return Object.keys(s).reduce(function(f, p) {
    var v = s[p];
    if (v.hasStack) {
      var m = {};
      v.stackGroups = Object.keys(v.stackGroups).reduce(function(h, d) {
        var b = v.stackGroups[d];
        return ue(ue({}, h), {}, $t({}, d, { numericAxisId: n, cateAxisId: a, items: b.items, stackedData: TS(e, b.items, i) }));
      }, m);
    }
    return ue(ue({}, f), {}, $t({}, p, v));
  }, l);
}, xm = function(e, r) {
  var n = r.realScaleType, a = r.type, i = r.tickCount, o = r.originalDomain, u = r.allowDecimals, c = n || r.scale;
  if (c !== "auto" && c !== "linear") return null;
  if (i && a === "number" && o && (o[0] === "auto" || o[1] === "auto")) {
    var s = e.domain();
    if (!s.length) return null;
    var l = KA(s, i, u);
    return e.domain([ca(l), ua(l)]), { niceTicks: l };
  }
  if (i && a === "number") {
    var f = e.domain(), p = GA(f, i, u);
    return { niceTicks: p };
  }
  return null;
}, vv = function(e) {
  var r = e.axis, n = e.ticks, a = e.offset, i = e.bandSize, o = e.entry, u = e.index;
  if (r.type === "category") return n[u] ? n[u].coordinate + a : null;
  var c = ge(o, r.dataKey, r.domain[u]);
  return X(c) ? null : r.scale(c) - i / 2 + a;
}, $S = function(e) {
  var r = e.numericAxis, n = r.scale.domain();
  if (r.type === "number") {
    var a = Math.min(n[0], n[1]), i = Math.max(n[0], n[1]);
    return a <= 0 && i >= 0 ? 0 : i < 0 ? i : a;
  }
  return n[0];
}, CS = function(e, r) {
  var n, a = (n = e.type) !== null && n !== void 0 && n.defaultProps ? ue(ue({}, e.type.defaultProps), e.props) : e.props, i = a.stackId;
  if (pe(i)) {
    var o = r[i];
    if (o) {
      var u = o.items.indexOf(e);
      return u >= 0 ? o.stackedData[u] : null;
    }
  }
  return null;
}, RS = function(e) {
  return e.reduce(function(r, n) {
    return [ca(n.concat([r[0]]).filter(N)), ua(n.concat([r[1]]).filter(N))];
  }, [1 / 0, -1 / 0]);
}, wm = function(e, r, n) {
  return Object.keys(e).reduce(function(a, i) {
    var o = e[i], u = o.stackedData, c = u.reduce(function(s, l) {
      var f = RS(l.slice(r, n + 1));
      return [Math.min(s[0], f[0]), Math.max(s[1], f[1])];
    }, [1 / 0, -1 / 0]);
    return [Math.min(c[0], a[0]), Math.max(c[1], a[1])];
  }, [1 / 0, -1 / 0]).map(function(a) {
    return a === 1 / 0 || a === -1 / 0 ? 0 : a;
  });
}, hv = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, yv = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Gc = function(e, r, n) {
  if (U(e)) return e(r, n);
  if (!Array.isArray(e)) return r;
  var a = [];
  if (N(e[0])) a[0] = n ? e[0] : Math.min(e[0], r[0]);
  else if (hv.test(e[0])) {
    var i = +hv.exec(e[0])[1];
    a[0] = r[0] - i;
  } else U(e[0]) ? a[0] = e[0](r[0]) : a[0] = r[0];
  if (N(e[1])) a[1] = n ? e[1] : Math.max(e[1], r[1]);
  else if (yv.test(e[1])) {
    var o = +yv.exec(e[1])[1];
    a[1] = r[1] + o;
  } else U(e[1]) ? a[1] = e[1](r[1]) : a[1] = r[1];
  return a;
}, _n = function(e, r, n) {
  if (e && e.scale && e.scale.bandwidth) {
    var a = e.scale.bandwidth();
    if (!n || a > 0) return a;
  }
  if (e && r && r.length >= 2) {
    for (var i = Vs(r, function(f) {
      return f.coordinate;
    }), o = 1 / 0, u = 1, c = i.length; u < c; u++) {
      var s = i[u], l = i[u - 1];
      o = Math.min((s.coordinate || 0) - (l.coordinate || 0), o);
    }
    return o === 1 / 0 ? 0 : o;
  }
  return n ? void 0 : 0;
}, mv = function(e, r, n) {
  return !e || !e.length || sa(e, Pe(n, "type.defaultProps.domain")) ? r : e;
}, Am = function(e, r) {
  var n = e.type.defaultProps ? ue(ue({}, e.type.defaultProps), e.props) : e.props, a = n.dataKey, i = n.name, o = n.unit, u = n.formatter, c = n.tooltipType, s = n.chartType, l = n.hide;
  return ue(ue({}, G(e, false)), {}, { dataKey: a, unit: o, formatter: u, name: i || a, color: Qs(e), value: ge(r, a), type: c, payload: r, chartType: s, hide: l });
};
function Mr(t5) {
  "@babel/helpers - typeof";
  return Mr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Mr(t5);
}
function gv(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Fe(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? gv(Object(r), true).forEach(function(n) {
      Sm(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : gv(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function Sm(t5, e, r) {
  return e = MS(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function MS(t5) {
  var e = kS(t5, "string");
  return Mr(e) == "symbol" ? e : e + "";
}
function kS(t5, e) {
  if (Mr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Mr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
function DS(t5, e) {
  return LS(t5) || BS(t5, e) || qS(t5, e) || NS();
}
function NS() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qS(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return bv(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return bv(t5, e);
  }
}
function bv(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function BS(t5, e) {
  var r = t5 == null ? null : typeof Symbol < "u" && t5[Symbol.iterator] || t5["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = true, s = false;
    try {
      if (i = (r = r.call(t5)).next, e !== 0) for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); c = true) ;
    } catch (l) {
      s = true, a = l;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw a;
      }
    }
    return u;
  }
}
function LS(t5) {
  if (Array.isArray(t5)) return t5;
}
var En = Math.PI / 180, FS = function(e) {
  return e * 180 / Math.PI;
}, ne = function(e, r, n, a) {
  return { x: e + Math.cos(-En * a) * n, y: r + Math.sin(-En * a) * n };
}, Pm = function(e, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : { top: 0, right: 0, bottom: 0, left: 0 };
  return Math.min(Math.abs(e - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, WS = function(e, r, n, a, i) {
  var o = e.width, u = e.height, c = e.startAngle, s = e.endAngle, l = Oe(e.cx, o, o / 2), f = Oe(e.cy, u, u / 2), p = Pm(o, u, n), v = Oe(e.innerRadius, p, 0), m = Oe(e.outerRadius, p, p * 0.8), h = Object.keys(r);
  return h.reduce(function(d, b) {
    var g = r[b], x = g.domain, w = g.reversed, y;
    if (X(g.range)) a === "angleAxis" ? y = [c, s] : a === "radiusAxis" && (y = [v, m]), w && (y = [y[1], y[0]]);
    else {
      y = g.range;
      var O = y, A = DS(O, 2);
      c = A[0], s = A[1];
    }
    var S = bm(g, i), _ = S.realScaleType, T = S.scale;
    T.domain(x).range(y), Om(T);
    var E = xm(T, Fe(Fe({}, g), {}, { realScaleType: _ })), j = Fe(Fe(Fe({}, g), E), {}, { range: y, radius: m, realScaleType: _, scale: T, cx: l, cy: f, innerRadius: v, outerRadius: m, startAngle: c, endAngle: s });
    return Fe(Fe({}, d), {}, Sm({}, b, j));
  }, {});
}, zS = function(e, r) {
  var n = e.x, a = e.y, i = r.x, o = r.y;
  return Math.sqrt(Math.pow(n - i, 2) + Math.pow(a - o, 2));
}, KS = function(e, r) {
  var n = e.x, a = e.y, i = r.cx, o = r.cy, u = zS({ x: n, y: a }, { x: i, y: o });
  if (u <= 0) return { radius: u };
  var c = (n - i) / u, s = Math.acos(c);
  return a > o && (s = 2 * Math.PI - s), { radius: u, angle: FS(s), angleInRadian: s };
}, GS = function(e) {
  var r = e.startAngle, n = e.endAngle, a = Math.floor(r / 360), i = Math.floor(n / 360), o = Math.min(a, i);
  return { startAngle: r - o * 360, endAngle: n - o * 360 };
}, HS = function(e, r) {
  var n = r.startAngle, a = r.endAngle, i = Math.floor(n / 360), o = Math.floor(a / 360), u = Math.min(i, o);
  return e + u * 360;
}, Ov = function(e, r) {
  var n = e.x, a = e.y, i = KS({ x: n, y: a }, r), o = i.radius, u = i.angle, c = r.innerRadius, s = r.outerRadius;
  if (o < c || o > s) return false;
  if (o === 0) return true;
  var l = GS(r), f = l.startAngle, p = l.endAngle, v = u, m;
  if (f <= p) {
    for (; v > p; ) v -= 360;
    for (; v < f; ) v += 360;
    m = v >= f && v <= p;
  } else {
    for (; v > f; ) v -= 360;
    for (; v < p; ) v += 360;
    m = v >= p && v <= f;
  }
  return m ? Fe(Fe({}, r), {}, { radius: o, angle: HS(v, r) }) : null;
}, _m = function(e) {
  return !D.isValidElement(e) && !U(e) && typeof e != "boolean" ? e.className : "";
};
function kr(t5) {
  "@babel/helpers - typeof";
  return kr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, kr(t5);
}
var US = ["offset"];
function VS(t5) {
  return JS(t5) || ZS(t5) || YS(t5) || XS();
}
function XS() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function YS(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return Hc(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Hc(t5, e);
  }
}
function ZS(t5) {
  if (typeof Symbol < "u" && t5[Symbol.iterator] != null || t5["@@iterator"] != null) return Array.from(t5);
}
function JS(t5) {
  if (Array.isArray(t5)) return Hc(t5);
}
function Hc(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function QS(t5, e) {
  if (t5 == null) return {};
  var r = eP(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function eP(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
function xv(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function fe(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? xv(Object(r), true).forEach(function(n) {
      tP(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : xv(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function tP(t5, e, r) {
  return e = rP(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function rP(t5) {
  var e = nP(t5, "string");
  return kr(e) == "symbol" ? e : e + "";
}
function nP(t5, e) {
  if (kr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (kr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
function Dr() {
  return Dr = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Dr.apply(this, arguments);
}
var aP = function(e) {
  var r = e.value, n = e.formatter, a = X(e.children) ? r : e.children;
  return U(n) ? n(a) : a;
}, iP = function(e, r) {
  var n = be(r - e), a = Math.min(Math.abs(r - e), 360);
  return n * a;
}, oP = function(e, r, n) {
  var a = e.position, i = e.viewBox, o = e.offset, u = e.className, c = i, s = c.cx, l = c.cy, f = c.innerRadius, p = c.outerRadius, v = c.startAngle, m = c.endAngle, h = c.clockWise, d = (f + p) / 2, b = iP(v, m), g = b >= 0 ? 1 : -1, x, w;
  a === "insideStart" ? (x = v + g * o, w = h) : a === "insideEnd" ? (x = m - g * o, w = !h) : a === "end" && (x = m + g * o, w = h), w = b <= 0 ? w : !w;
  var y = ne(s, l, d, x), O = ne(s, l, d, x + (w ? 1 : -1) * 359), A = "M".concat(y.x, ",").concat(y.y, `
    A`).concat(d, ",").concat(d, ",0,1,").concat(w ? 0 : 1, `,
    `).concat(O.x, ",").concat(O.y), S = X(e.id) ? tn("recharts-radial-line-") : e.id;
  return P.createElement("text", Dr({}, n, { dominantBaseline: "central", className: V("recharts-radial-bar-label", u) }), P.createElement("defs", null, P.createElement("path", { id: S, d: A })), P.createElement("textPath", { xlinkHref: "#".concat(S) }, r));
}, uP = function(e) {
  var r = e.viewBox, n = e.offset, a = e.position, i = r, o = i.cx, u = i.cy, c = i.innerRadius, s = i.outerRadius, l = i.startAngle, f = i.endAngle, p = (l + f) / 2;
  if (a === "outside") {
    var v = ne(o, u, s + n, p), m = v.x, h = v.y;
    return { x: m, y: h, textAnchor: m >= o ? "start" : "end", verticalAnchor: "middle" };
  }
  if (a === "center") return { x: o, y: u, textAnchor: "middle", verticalAnchor: "middle" };
  if (a === "centerTop") return { x: o, y: u, textAnchor: "middle", verticalAnchor: "start" };
  if (a === "centerBottom") return { x: o, y: u, textAnchor: "middle", verticalAnchor: "end" };
  var d = (c + s) / 2, b = ne(o, u, d, p), g = b.x, x = b.y;
  return { x: g, y: x, textAnchor: "middle", verticalAnchor: "middle" };
}, cP = function(e) {
  var r = e.viewBox, n = e.parentViewBox, a = e.offset, i = e.position, o = r, u = o.x, c = o.y, s = o.width, l = o.height, f = l >= 0 ? 1 : -1, p = f * a, v = f > 0 ? "end" : "start", m = f > 0 ? "start" : "end", h = s >= 0 ? 1 : -1, d = h * a, b = h > 0 ? "end" : "start", g = h > 0 ? "start" : "end";
  if (i === "top") {
    var x = { x: u + s / 2, y: c - f * a, textAnchor: "middle", verticalAnchor: v };
    return fe(fe({}, x), n ? { height: Math.max(c - n.y, 0), width: s } : {});
  }
  if (i === "bottom") {
    var w = { x: u + s / 2, y: c + l + p, textAnchor: "middle", verticalAnchor: m };
    return fe(fe({}, w), n ? { height: Math.max(n.y + n.height - (c + l), 0), width: s } : {});
  }
  if (i === "left") {
    var y = { x: u - d, y: c + l / 2, textAnchor: b, verticalAnchor: "middle" };
    return fe(fe({}, y), n ? { width: Math.max(y.x - n.x, 0), height: l } : {});
  }
  if (i === "right") {
    var O = { x: u + s + d, y: c + l / 2, textAnchor: g, verticalAnchor: "middle" };
    return fe(fe({}, O), n ? { width: Math.max(n.x + n.width - O.x, 0), height: l } : {});
  }
  var A = n ? { width: s, height: l } : {};
  return i === "insideLeft" ? fe({ x: u + d, y: c + l / 2, textAnchor: g, verticalAnchor: "middle" }, A) : i === "insideRight" ? fe({ x: u + s - d, y: c + l / 2, textAnchor: b, verticalAnchor: "middle" }, A) : i === "insideTop" ? fe({ x: u + s / 2, y: c + p, textAnchor: "middle", verticalAnchor: m }, A) : i === "insideBottom" ? fe({ x: u + s / 2, y: c + l - p, textAnchor: "middle", verticalAnchor: v }, A) : i === "insideTopLeft" ? fe({ x: u + d, y: c + p, textAnchor: g, verticalAnchor: m }, A) : i === "insideTopRight" ? fe({ x: u + s - d, y: c + p, textAnchor: b, verticalAnchor: m }, A) : i === "insideBottomLeft" ? fe({ x: u + d, y: c + l - p, textAnchor: g, verticalAnchor: v }, A) : i === "insideBottomRight" ? fe({ x: u + s - d, y: c + l - p, textAnchor: b, verticalAnchor: v }, A) : Qt(i) && (N(i.x) || st(i.x)) && (N(i.y) || st(i.y)) ? fe({ x: u + Oe(i.x, s), y: c + Oe(i.y, l), textAnchor: "end", verticalAnchor: "end" }, A) : fe({ x: u + s / 2, y: c + l / 2, textAnchor: "middle", verticalAnchor: "middle" }, A);
}, sP = function(e) {
  return "cx" in e && N(e.cx);
};
function he(t5) {
  var e = t5.offset, r = e === void 0 ? 5 : e, n = QS(t5, US), a = fe({ offset: r }, n), i = a.viewBox, o = a.position, u = a.value, c = a.children, s = a.content, l = a.className, f = l === void 0 ? "" : l, p = a.textBreakAll;
  if (!i || X(u) && X(c) && !D.isValidElement(s) && !U(s)) return null;
  if (D.isValidElement(s)) return D.cloneElement(s, a);
  var v;
  if (U(s)) {
    if (v = D.createElement(s, a), D.isValidElement(v)) return v;
  } else v = aP(a);
  var m = sP(i), h = G(a, true);
  if (m && (o === "insideStart" || o === "insideEnd" || o === "end")) return oP(a, v, h);
  var d = m ? uP(a) : cP(a);
  return P.createElement(vt, Dr({ className: V("recharts-label", f) }, h, d, { breakAll: p }), v);
}
he.displayName = "Label";
var Em = function(e) {
  var r = e.cx, n = e.cy, a = e.angle, i = e.startAngle, o = e.endAngle, u = e.r, c = e.radius, s = e.innerRadius, l = e.outerRadius, f = e.x, p = e.y, v = e.top, m = e.left, h = e.width, d = e.height, b = e.clockWise, g = e.labelViewBox;
  if (g) return g;
  if (N(h) && N(d)) {
    if (N(f) && N(p)) return { x: f, y: p, width: h, height: d };
    if (N(v) && N(m)) return { x: v, y: m, width: h, height: d };
  }
  return N(f) && N(p) ? { x: f, y: p, width: 0, height: 0 } : N(r) && N(n) ? { cx: r, cy: n, startAngle: i || a || 0, endAngle: o || a || 0, innerRadius: s || 0, outerRadius: l || c || u || 0, clockWise: b } : e.viewBox ? e.viewBox : {};
}, lP = function(e, r) {
  return e ? e === true ? P.createElement(he, { key: "label-implicit", viewBox: r }) : pe(e) ? P.createElement(he, { key: "label-implicit", viewBox: r, value: e }) : D.isValidElement(e) ? e.type === he ? D.cloneElement(e, { key: "label-implicit", viewBox: r }) : P.createElement(he, { key: "label-implicit", content: e, viewBox: r }) : U(e) ? P.createElement(he, { key: "label-implicit", content: e, viewBox: r }) : Qt(e) ? P.createElement(he, Dr({ viewBox: r }, e, { key: "label-implicit" })) : null : null;
}, fP = function(e, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  if (!e || !e.children && n && !e.label) return null;
  var a = e.children, i = Em(e), o = Te(a, he).map(function(c, s) {
    return D.cloneElement(c, { viewBox: r || i, key: "label-".concat(s) });
  });
  if (!n) return o;
  var u = lP(e.label, r || i);
  return [u].concat(VS(o));
};
he.parseViewBox = Em;
he.renderCallByParent = fP;
var zu, wv;
function pP() {
  if (wv) return zu;
  wv = 1;
  function t5(e) {
    var r = e == null ? 0 : e.length;
    return r ? e[r - 1] : void 0;
  }
  return zu = t5, zu;
}
var dP = pP();
const vP = te(dP);
function Nr(t5) {
  "@babel/helpers - typeof";
  return Nr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Nr(t5);
}
var hP = ["valueAccessor"], yP = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function mP(t5) {
  return xP(t5) || OP(t5) || bP(t5) || gP();
}
function gP() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function bP(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return Uc(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Uc(t5, e);
  }
}
function OP(t5) {
  if (typeof Symbol < "u" && t5[Symbol.iterator] != null || t5["@@iterator"] != null) return Array.from(t5);
}
function xP(t5) {
  if (Array.isArray(t5)) return Uc(t5);
}
function Uc(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function jn() {
  return jn = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, jn.apply(this, arguments);
}
function Av(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Sv(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Av(Object(r), true).forEach(function(n) {
      wP(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Av(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function wP(t5, e, r) {
  return e = AP(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function AP(t5) {
  var e = SP(t5, "string");
  return Nr(e) == "symbol" ? e : e + "";
}
function SP(t5, e) {
  if (Nr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Nr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
function Pv(t5, e) {
  if (t5 == null) return {};
  var r = PP(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function PP(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
var _P = function(e) {
  return Array.isArray(e.value) ? vP(e.value) : e.value;
};
function Ze(t5) {
  var e = t5.valueAccessor, r = e === void 0 ? _P : e, n = Pv(t5, hP), a = n.data, i = n.dataKey, o = n.clockWise, u = n.id, c = n.textBreakAll, s = Pv(n, yP);
  return !a || !a.length ? null : P.createElement(J, { className: "recharts-label-list" }, a.map(function(l, f) {
    var p = X(i) ? r(l, f) : ge(l && l.payload, i), v = X(u) ? {} : { id: "".concat(u, "-").concat(f) };
    return P.createElement(he, jn({}, G(l, true), s, v, { parentViewBox: l.parentViewBox, value: p, textBreakAll: c, viewBox: he.parseViewBox(X(o) ? l : Sv(Sv({}, l), {}, { clockWise: o })), key: "label-".concat(f), index: f }));
  }));
}
Ze.displayName = "LabelList";
function EP(t5, e) {
  return t5 ? t5 === true ? P.createElement(Ze, { key: "labelList-implicit", data: e }) : P.isValidElement(t5) || U(t5) ? P.createElement(Ze, { key: "labelList-implicit", data: e, content: t5 }) : Qt(t5) ? P.createElement(Ze, jn({ data: e }, t5, { key: "labelList-implicit" })) : null : null;
}
function jP(t5, e) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  if (!t5 || !t5.children && r && !t5.label) return null;
  var n = t5.children, a = Te(n, Ze).map(function(o, u) {
    return D.cloneElement(o, { data: e, key: "labelList-".concat(u) });
  });
  if (!r) return a;
  var i = EP(t5.label, e);
  return [i].concat(mP(a));
}
Ze.renderCallByParent = jP;
function qr(t5) {
  "@babel/helpers - typeof";
  return qr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, qr(t5);
}
function Vc() {
  return Vc = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Vc.apply(this, arguments);
}
function _v(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ev(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? _v(Object(r), true).forEach(function(n) {
      TP(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : _v(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function TP(t5, e, r) {
  return e = IP(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function IP(t5) {
  var e = $P(t5, "string");
  return qr(e) == "symbol" ? e : e + "";
}
function $P(t5, e) {
  if (qr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (qr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
var CP = function(e, r) {
  var n = be(r - e), a = Math.min(Math.abs(r - e), 359.999);
  return n * a;
}, pn = function(e) {
  var r = e.cx, n = e.cy, a = e.radius, i = e.angle, o = e.sign, u = e.isExternal, c = e.cornerRadius, s = e.cornerIsExternal, l = c * (u ? 1 : -1) + a, f = Math.asin(c / l) / En, p = s ? i : i + o * f, v = ne(r, n, l, p), m = ne(r, n, a, p), h = s ? i - o * f : i, d = ne(r, n, l * Math.cos(f * En), h);
  return { center: v, circleTangency: m, lineTangency: d, theta: f };
}, jm = function(e) {
  var r = e.cx, n = e.cy, a = e.innerRadius, i = e.outerRadius, o = e.startAngle, u = e.endAngle, c = CP(o, u), s = o + c, l = ne(r, n, i, o), f = ne(r, n, i, s), p = "M ".concat(l.x, ",").concat(l.y, `
    A `).concat(i, ",").concat(i, `,0,
    `).concat(+(Math.abs(c) > 180), ",").concat(+(o > s), `,
    `).concat(f.x, ",").concat(f.y, `
  `);
  if (a > 0) {
    var v = ne(r, n, a, o), m = ne(r, n, a, s);
    p += "L ".concat(m.x, ",").concat(m.y, `
            A `).concat(a, ",").concat(a, `,0,
            `).concat(+(Math.abs(c) > 180), ",").concat(+(o <= s), `,
            `).concat(v.x, ",").concat(v.y, " Z");
  } else p += "L ".concat(r, ",").concat(n, " Z");
  return p;
}, RP = function(e) {
  var r = e.cx, n = e.cy, a = e.innerRadius, i = e.outerRadius, o = e.cornerRadius, u = e.forceCornerRadius, c = e.cornerIsExternal, s = e.startAngle, l = e.endAngle, f = be(l - s), p = pn({ cx: r, cy: n, radius: i, angle: s, sign: f, cornerRadius: o, cornerIsExternal: c }), v = p.circleTangency, m = p.lineTangency, h = p.theta, d = pn({ cx: r, cy: n, radius: i, angle: l, sign: -f, cornerRadius: o, cornerIsExternal: c }), b = d.circleTangency, g = d.lineTangency, x = d.theta, w = c ? Math.abs(s - l) : Math.abs(s - l) - h - x;
  if (w < 0) return u ? "M ".concat(m.x, ",").concat(m.y, `
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(o * 2, `,0
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(-o * 2, `,0
      `) : jm({ cx: r, cy: n, innerRadius: a, outerRadius: i, startAngle: s, endAngle: l });
  var y = "M ".concat(m.x, ",").concat(m.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(f < 0), ",").concat(v.x, ",").concat(v.y, `
    A`).concat(i, ",").concat(i, ",0,").concat(+(w > 180), ",").concat(+(f < 0), ",").concat(b.x, ",").concat(b.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(f < 0), ",").concat(g.x, ",").concat(g.y, `
  `);
  if (a > 0) {
    var O = pn({ cx: r, cy: n, radius: a, angle: s, sign: f, isExternal: true, cornerRadius: o, cornerIsExternal: c }), A = O.circleTangency, S = O.lineTangency, _ = O.theta, T = pn({ cx: r, cy: n, radius: a, angle: l, sign: -f, isExternal: true, cornerRadius: o, cornerIsExternal: c }), E = T.circleTangency, j = T.lineTangency, I = T.theta, R = c ? Math.abs(s - l) : Math.abs(s - l) - _ - I;
    if (R < 0 && o === 0) return "".concat(y, "L").concat(r, ",").concat(n, "Z");
    y += "L".concat(j.x, ",").concat(j.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(f < 0), ",").concat(E.x, ",").concat(E.y, `
      A`).concat(a, ",").concat(a, ",0,").concat(+(R > 180), ",").concat(+(f > 0), ",").concat(A.x, ",").concat(A.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(f < 0), ",").concat(S.x, ",").concat(S.y, "Z");
  } else y += "L".concat(r, ",").concat(n, "Z");
  return y;
}, MP = { cx: 0, cy: 0, innerRadius: 0, outerRadius: 0, startAngle: 0, endAngle: 0, cornerRadius: 0, forceCornerRadius: false, cornerIsExternal: false }, Tm = function(e) {
  var r = Ev(Ev({}, MP), e), n = r.cx, a = r.cy, i = r.innerRadius, o = r.outerRadius, u = r.cornerRadius, c = r.forceCornerRadius, s = r.cornerIsExternal, l = r.startAngle, f = r.endAngle, p = r.className;
  if (o < i || l === f) return null;
  var v = V("recharts-sector", p), m = o - i, h = Oe(u, m, 0, true), d;
  return h > 0 && Math.abs(l - f) < 360 ? d = RP({ cx: n, cy: a, innerRadius: i, outerRadius: o, cornerRadius: Math.min(h, m / 2), forceCornerRadius: c, cornerIsExternal: s, startAngle: l, endAngle: f }) : d = jm({ cx: n, cy: a, innerRadius: i, outerRadius: o, startAngle: l, endAngle: f }), P.createElement("path", Vc({}, G(r, true), { className: v, d, role: "img" }));
};
function Br(t5) {
  "@babel/helpers - typeof";
  return Br = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Br(t5);
}
function Xc() {
  return Xc = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Xc.apply(this, arguments);
}
function jv(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Tv(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? jv(Object(r), true).forEach(function(n) {
      kP(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : jv(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function kP(t5, e, r) {
  return e = DP(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function DP(t5) {
  var e = NP(t5, "string");
  return Br(e) == "symbol" ? e : e + "";
}
function NP(t5, e) {
  if (Br(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Br(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
var Iv = { curveBasisClosed: jb, curveBasisOpen: Eb, curveBasis: _b, curveBumpX: Pb, curveBumpY: Sb, curveLinearClosed: Ab, curveLinear: sy, curveMonotoneX: wb, curveMonotoneY: xb, curveNatural: Ob, curveStep: bb, curveStepAfter: gb, curveStepBefore: mb }, dn = function(e) {
  return e.x === +e.x && e.y === +e.y;
}, fr = function(e) {
  return e.x;
}, pr = function(e) {
  return e.y;
}, qP = function(e, r) {
  if (U(e)) return e;
  var n = "curve".concat(ra(e));
  return (n === "curveMonotone" || n === "curveBump") && r ? Iv["".concat(n).concat(r === "vertical" ? "Y" : "X")] : Iv[n] || sy;
}, BP = function(e) {
  var r = e.type, n = r === void 0 ? "linear" : r, a = e.points, i = a === void 0 ? [] : a, o = e.baseLine, u = e.layout, c = e.connectNulls, s = c === void 0 ? false : c, l = qP(n, u), f = s ? i.filter(function(h) {
    return dn(h);
  }) : i, p;
  if (Array.isArray(o)) {
    var v = s ? o.filter(function(h) {
      return dn(h);
    }) : o, m = f.map(function(h, d) {
      return Tv(Tv({}, h), {}, { base: v[d] });
    });
    return u === "vertical" ? p = un().y(pr).x1(fr).x0(function(h) {
      return h.base.x;
    }) : p = un().x(fr).y1(pr).y0(function(h) {
      return h.base.y;
    }), p.defined(dn).curve(l), p(m);
  }
  return u === "vertical" && N(o) ? p = un().y(pr).x1(fr).x0(o) : N(o) ? p = un().x(fr).y1(pr).y0(o) : p = yb().x(fr).y(pr), p.defined(dn).curve(l), p(f);
}, Yc = function(e) {
  var r = e.className, n = e.points, a = e.path, i = e.pathRef;
  if ((!n || !n.length) && !a) return null;
  var o = n && n.length ? BP(e) : a;
  return D.createElement("path", Xc({}, G(e, false), mn(e), { className: V("recharts-curve", r), d: o, ref: i }));
}, Ku = { exports: {} }, Gu, $v;
function LP() {
  if ($v) return Gu;
  $v = 1;
  var t5 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Gu = t5, Gu;
}
var Hu, Cv;
function FP() {
  if (Cv) return Hu;
  Cv = 1;
  var t5 = LP();
  function e() {
  }
  function r() {
  }
  return r.resetWarningCache = e, Hu = function() {
    function n(o, u, c, s, l, f) {
      if (f !== t5) {
        var p = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        throw p.name = "Invariant Violation", p;
      }
    }
    n.isRequired = n;
    function a() {
      return n;
    }
    var i = { array: n, bigint: n, bool: n, func: n, number: n, object: n, string: n, symbol: n, any: n, arrayOf: a, element: n, elementType: n, instanceOf: a, node: n, objectOf: a, oneOf: a, oneOfType: a, shape: a, exact: a, checkPropTypes: r, resetWarningCache: e };
    return i.PropTypes = i, i;
  }, Hu;
}
var Rv;
function WP() {
  return Rv || (Rv = 1, Ku.exports = FP()()), Ku.exports;
}
var zP = WP();
const Z = te(zP);
function KP(t5) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(t5);
}
function Mv(t5) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = -1, n = function a(i) {
    r < 0 && (r = i), i - r > e ? (t5(i), r = -1) : KP(a);
  };
  requestAnimationFrame(n);
}
function Zc(t5) {
  "@babel/helpers - typeof";
  return Zc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Zc(t5);
}
function GP(t5) {
  return XP(t5) || VP(t5) || UP(t5) || HP();
}
function HP() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function UP(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return kv(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return kv(t5, e);
  }
}
function kv(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function VP(t5) {
  if (typeof Symbol < "u" && t5[Symbol.iterator] != null || t5["@@iterator"] != null) return Array.from(t5);
}
function XP(t5) {
  if (Array.isArray(t5)) return t5;
}
function YP() {
  var t5 = {}, e = function() {
    return null;
  }, r = false, n = function a(i) {
    if (!r) {
      if (Array.isArray(i)) {
        if (!i.length) return;
        var o = i, u = GP(o), c = u[0], s = u.slice(1);
        if (typeof c == "number") {
          Mv(a.bind(null, s), c);
          return;
        }
        a(c), Mv(a.bind(null, s));
        return;
      }
      Zc(i) === "object" && (t5 = i, e(t5)), typeof i == "function" && i();
    }
  };
  return { stop: function() {
    r = true;
  }, start: function(i) {
    r = false, n(i);
  }, subscribe: function(i) {
    return e = i, function() {
      e = function() {
        return null;
      };
    };
  } };
}
function Lr(t5) {
  "@babel/helpers - typeof";
  return Lr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Lr(t5);
}
function Dv(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Nv(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Dv(Object(r), true).forEach(function(n) {
      Im(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Dv(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function Im(t5, e, r) {
  return e = ZP(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function ZP(t5) {
  var e = JP(t5, "string");
  return Lr(e) === "symbol" ? e : String(e);
}
function JP(t5, e) {
  if (Lr(t5) !== "object" || t5 === null) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Lr(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
var QP = function(e, r) {
  return [Object.keys(e), Object.keys(r)].reduce(function(n, a) {
    return n.filter(function(i) {
      return a.includes(i);
    });
  });
}, e_ = function(e) {
  return e;
}, t_ = function(e) {
  return e.replace(/([A-Z])/g, function(r) {
    return "-".concat(r.toLowerCase());
  });
}, Or = function(e, r) {
  return Object.keys(r).reduce(function(n, a) {
    return Nv(Nv({}, n), {}, Im({}, a, e(a, r[a])));
  }, {});
}, qv = function(e, r, n) {
  return e.map(function(a) {
    return "".concat(t_(a), " ").concat(r, "ms ").concat(n);
  }).join(",");
};
function r_(t5, e) {
  return i_(t5) || a_(t5, e) || $m(t5, e) || n_();
}
function n_() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function a_(t5, e) {
  var r = t5 == null ? null : typeof Symbol < "u" && t5[Symbol.iterator] || t5["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = true, s = false;
    try {
      if (i = (r = r.call(t5)).next, e !== 0) for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); c = true) ;
    } catch (l) {
      s = true, a = l;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw a;
      }
    }
    return u;
  }
}
function i_(t5) {
  if (Array.isArray(t5)) return t5;
}
function o_(t5) {
  return s_(t5) || c_(t5) || $m(t5) || u_();
}
function u_() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function $m(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return Jc(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Jc(t5, e);
  }
}
function c_(t5) {
  if (typeof Symbol < "u" && t5[Symbol.iterator] != null || t5["@@iterator"] != null) return Array.from(t5);
}
function s_(t5) {
  if (Array.isArray(t5)) return Jc(t5);
}
function Jc(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
var Tn = 1e-4, Cm = function(e, r) {
  return [0, 3 * e, 3 * r - 6 * e, 3 * e - 3 * r + 1];
}, Rm = function(e, r) {
  return e.map(function(n, a) {
    return n * Math.pow(r, a);
  }).reduce(function(n, a) {
    return n + a;
  });
}, Bv = function(e, r) {
  return function(n) {
    var a = Cm(e, r);
    return Rm(a, n);
  };
}, l_ = function(e, r) {
  return function(n) {
    var a = Cm(e, r), i = [].concat(o_(a.map(function(o, u) {
      return o * u;
    }).slice(1)), [0]);
    return Rm(i, n);
  };
}, Lv = function() {
  for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
  var a = r[0], i = r[1], o = r[2], u = r[3];
  if (r.length === 1) switch (r[0]) {
    case "linear":
      a = 0, i = 0, o = 1, u = 1;
      break;
    case "ease":
      a = 0.25, i = 0.1, o = 0.25, u = 1;
      break;
    case "ease-in":
      a = 0.42, i = 0, o = 1, u = 1;
      break;
    case "ease-out":
      a = 0.42, i = 0, o = 0.58, u = 1;
      break;
    case "ease-in-out":
      a = 0, i = 0, o = 0.58, u = 1;
      break;
    default: {
      var c = r[0].split("(");
      if (c[0] === "cubic-bezier" && c[1].split(")")[0].split(",").length === 4) {
        var s = c[1].split(")")[0].split(",").map(function(d) {
          return parseFloat(d);
        }), l = r_(s, 4);
        a = l[0], i = l[1], o = l[2], u = l[3];
      }
    }
  }
  var f = Bv(a, o), p = Bv(i, u), v = l_(a, o), m = function(b) {
    return b > 1 ? 1 : b < 0 ? 0 : b;
  }, h = function(b) {
    for (var g = b > 1 ? 1 : b, x = g, w = 0; w < 8; ++w) {
      var y = f(x) - g, O = v(x);
      if (Math.abs(y - g) < Tn || O < Tn) return p(x);
      x = m(x - y / O);
    }
    return p(x);
  };
  return h.isStepper = false, h;
}, f_ = function() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = e.stiff, n = r === void 0 ? 100 : r, a = e.damping, i = a === void 0 ? 8 : a, o = e.dt, u = o === void 0 ? 17 : o, c = function(l, f, p) {
    var v = -(l - f) * n, m = p * i, h = p + (v - m) * u / 1e3, d = p * u / 1e3 + l;
    return Math.abs(d - f) < Tn && Math.abs(h) < Tn ? [f, 0] : [d, h];
  };
  return c.isStepper = true, c.dt = u, c;
}, p_ = function() {
  for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
  var a = r[0];
  if (typeof a == "string") switch (a) {
    case "ease":
    case "ease-in-out":
    case "ease-out":
    case "ease-in":
    case "linear":
      return Lv(a);
    case "spring":
      return f_();
    default:
      if (a.split("(")[0] === "cubic-bezier") return Lv(a);
  }
  return typeof a == "function" ? a : null;
};
function Fr(t5) {
  "@babel/helpers - typeof";
  return Fr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Fr(t5);
}
function Fv(t5) {
  return h_(t5) || v_(t5) || Mm(t5) || d_();
}
function d_() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function v_(t5) {
  if (typeof Symbol < "u" && t5[Symbol.iterator] != null || t5["@@iterator"] != null) return Array.from(t5);
}
function h_(t5) {
  if (Array.isArray(t5)) return es(t5);
}
function Wv(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ye(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Wv(Object(r), true).forEach(function(n) {
      Qc(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Wv(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function Qc(t5, e, r) {
  return e = y_(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function y_(t5) {
  var e = m_(t5, "string");
  return Fr(e) === "symbol" ? e : String(e);
}
function m_(t5, e) {
  if (Fr(t5) !== "object" || t5 === null) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Fr(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
function g_(t5, e) {
  return x_(t5) || O_(t5, e) || Mm(t5, e) || b_();
}
function b_() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Mm(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return es(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return es(t5, e);
  }
}
function es(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function O_(t5, e) {
  var r = t5 == null ? null : typeof Symbol < "u" && t5[Symbol.iterator] || t5["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = true, s = false;
    try {
      if (i = (r = r.call(t5)).next, e !== 0) for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); c = true) ;
    } catch (l) {
      s = true, a = l;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw a;
      }
    }
    return u;
  }
}
function x_(t5) {
  if (Array.isArray(t5)) return t5;
}
var In = function(e, r, n) {
  return e + (r - e) * n;
}, ts = function(e) {
  var r = e.from, n = e.to;
  return r !== n;
}, w_ = function t4(e, r, n) {
  var a = Or(function(i, o) {
    if (ts(o)) {
      var u = e(o.from, o.to, o.velocity), c = g_(u, 2), s = c[0], l = c[1];
      return ye(ye({}, o), {}, { from: s, velocity: l });
    }
    return o;
  }, r);
  return n < 1 ? Or(function(i, o) {
    return ts(o) ? ye(ye({}, o), {}, { velocity: In(o.velocity, a[i].velocity, n), from: In(o.from, a[i].from, n) }) : o;
  }, r) : t4(e, a, n - 1);
};
const A_ = (function(t5, e, r, n, a) {
  var i = QP(t5, e), o = i.reduce(function(d, b) {
    return ye(ye({}, d), {}, Qc({}, b, [t5[b], e[b]]));
  }, {}), u = i.reduce(function(d, b) {
    return ye(ye({}, d), {}, Qc({}, b, { from: t5[b], velocity: 0, to: e[b] }));
  }, {}), c = -1, s, l, f = function() {
    return null;
  }, p = function() {
    return Or(function(b, g) {
      return g.from;
    }, u);
  }, v = function() {
    return !Object.values(u).filter(ts).length;
  }, m = function(b) {
    s || (s = b);
    var g = b - s, x = g / r.dt;
    u = w_(r, u, x), a(ye(ye(ye({}, t5), e), p())), s = b, v() || (c = requestAnimationFrame(f));
  }, h = function(b) {
    l || (l = b);
    var g = (b - l) / n, x = Or(function(y, O) {
      return In.apply(void 0, Fv(O).concat([r(g)]));
    }, o);
    if (a(ye(ye(ye({}, t5), e), x)), g < 1) c = requestAnimationFrame(f);
    else {
      var w = Or(function(y, O) {
        return In.apply(void 0, Fv(O).concat([r(1)]));
      }, o);
      a(ye(ye(ye({}, t5), e), w));
    }
  };
  return f = r.isStepper ? m : h, function() {
    return requestAnimationFrame(f), function() {
      cancelAnimationFrame(c);
    };
  };
});
function Nt(t5) {
  "@babel/helpers - typeof";
  return Nt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Nt(t5);
}
var S_ = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
function P_(t5, e) {
  if (t5 == null) return {};
  var r = __(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function __(t5, e) {
  if (t5 == null) return {};
  var r = {}, n = Object.keys(t5), a, i;
  for (i = 0; i < n.length; i++) a = n[i], !(e.indexOf(a) >= 0) && (r[a] = t5[a]);
  return r;
}
function Uu(t5) {
  return I_(t5) || T_(t5) || j_(t5) || E_();
}
function E_() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function j_(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return rs(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return rs(t5, e);
  }
}
function T_(t5) {
  if (typeof Symbol < "u" && t5[Symbol.iterator] != null || t5["@@iterator"] != null) return Array.from(t5);
}
function I_(t5) {
  if (Array.isArray(t5)) return rs(t5);
}
function rs(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function zv(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ce(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? zv(Object(r), true).forEach(function(n) {
      yr(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : zv(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function yr(t5, e, r) {
  return e = km(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function $_(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function C_(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, km(n.key), n);
  }
}
function R_(t5, e, r) {
  return e && C_(t5.prototype, e), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function km(t5) {
  var e = M_(t5, "string");
  return Nt(e) === "symbol" ? e : String(e);
}
function M_(t5, e) {
  if (Nt(t5) !== "object" || t5 === null) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Nt(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
function k_(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && ns(t5, e);
}
function ns(t5, e) {
  return ns = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ns(t5, e);
}
function D_(t5) {
  var e = N_();
  return function() {
    var n = $n(t5), a;
    if (e) {
      var i = $n(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else a = n.apply(this, arguments);
    return as(this, a);
  };
}
function as(t5, e) {
  if (e && (Nt(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return is(t5);
}
function is(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function N_() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return false;
  if (typeof Proxy == "function") return true;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), true;
  } catch {
    return false;
  }
}
function $n(t5) {
  return $n = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, $n(t5);
}
var Ge = (function(t5) {
  k_(r, t5);
  var e = D_(r);
  function r(n, a) {
    var i;
    $_(this, r), i = e.call(this, n, a);
    var o = i.props, u = o.isActive, c = o.attributeName, s = o.from, l = o.to, f = o.steps, p = o.children, v = o.duration;
    if (i.handleStyleChange = i.handleStyleChange.bind(is(i)), i.changeStyle = i.changeStyle.bind(is(i)), !u || v <= 0) return i.state = { style: {} }, typeof p == "function" && (i.state = { style: l }), as(i);
    if (f && f.length) i.state = { style: f[0].style };
    else if (s) {
      if (typeof p == "function") return i.state = { style: s }, as(i);
      i.state = { style: c ? yr({}, c, s) : s };
    } else i.state = { style: {} };
    return i;
  }
  return R_(r, [{ key: "componentDidMount", value: function() {
    var a = this.props, i = a.isActive, o = a.canBegin;
    this.mounted = true, !(!i || !o) && this.runAnimation(this.props);
  } }, { key: "componentDidUpdate", value: function(a) {
    var i = this.props, o = i.isActive, u = i.canBegin, c = i.attributeName, s = i.shouldReAnimate, l = i.to, f = i.from, p = this.state.style;
    if (u) {
      if (!o) {
        var v = { style: c ? yr({}, c, l) : l };
        this.state && p && (c && p[c] !== l || !c && p !== l) && this.setState(v);
        return;
      }
      if (!(Tb(a.to, l) && a.canBegin && a.isActive)) {
        var m = !a.canBegin || !a.isActive;
        this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
        var h = m || s ? f : a.to;
        if (this.state && p) {
          var d = { style: c ? yr({}, c, h) : h };
          (c && p[c] !== h || !c && p !== h) && this.setState(d);
        }
        this.runAnimation(Ce(Ce({}, this.props), {}, { from: h, begin: 0 }));
      }
    }
  } }, { key: "componentWillUnmount", value: function() {
    this.mounted = false;
    var a = this.props.onAnimationEnd;
    this.unSubscribe && this.unSubscribe(), this.manager && (this.manager.stop(), this.manager = null), this.stopJSAnimation && this.stopJSAnimation(), a && a();
  } }, { key: "handleStyleChange", value: function(a) {
    this.changeStyle(a);
  } }, { key: "changeStyle", value: function(a) {
    this.mounted && this.setState({ style: a });
  } }, { key: "runJSAnimation", value: function(a) {
    var i = this, o = a.from, u = a.to, c = a.duration, s = a.easing, l = a.begin, f = a.onAnimationEnd, p = a.onAnimationStart, v = A_(o, u, p_(s), c, this.changeStyle), m = function() {
      i.stopJSAnimation = v();
    };
    this.manager.start([p, l, m, c, f]);
  } }, { key: "runStepAnimation", value: function(a) {
    var i = this, o = a.steps, u = a.begin, c = a.onAnimationStart, s = o[0], l = s.style, f = s.duration, p = f === void 0 ? 0 : f, v = function(h, d, b) {
      if (b === 0) return h;
      var g = d.duration, x = d.easing, w = x === void 0 ? "ease" : x, y = d.style, O = d.properties, A = d.onAnimationEnd, S = b > 0 ? o[b - 1] : d, _ = O || Object.keys(y);
      if (typeof w == "function" || w === "spring") return [].concat(Uu(h), [i.runJSAnimation.bind(i, { from: S.style, to: y, duration: g, easing: w }), g]);
      var T = qv(_, g, w), E = Ce(Ce(Ce({}, S.style), y), {}, { transition: T });
      return [].concat(Uu(h), [E, g, A]).filter(e_);
    };
    return this.manager.start([c].concat(Uu(o.reduce(v, [l, Math.max(p, u)])), [a.onAnimationEnd]));
  } }, { key: "runAnimation", value: function(a) {
    this.manager || (this.manager = YP());
    var i = a.begin, o = a.duration, u = a.attributeName, c = a.to, s = a.easing, l = a.onAnimationStart, f = a.onAnimationEnd, p = a.steps, v = a.children, m = this.manager;
    if (this.unSubscribe = m.subscribe(this.handleStyleChange), typeof s == "function" || typeof v == "function" || s === "spring") {
      this.runJSAnimation(a);
      return;
    }
    if (p.length > 1) {
      this.runStepAnimation(a);
      return;
    }
    var h = u ? yr({}, u, c) : c, d = qv(Object.keys(h), o, s);
    m.start([l, i, Ce(Ce({}, h), {}, { transition: d }), o, f]);
  } }, { key: "render", value: function() {
    var a = this.props, i = a.children;
    a.begin;
    var o = a.duration;
    a.attributeName, a.easing;
    var u = a.isActive;
    a.steps, a.from, a.to, a.canBegin, a.onAnimationEnd, a.shouldReAnimate, a.onAnimationReStart;
    var c = P_(a, S_), s = D.Children.count(i), l = this.state.style;
    if (typeof i == "function") return i(l);
    if (!u || s === 0 || o <= 0) return i;
    var f = function(v) {
      var m = v.props, h = m.style, d = h === void 0 ? {} : h, b = m.className, g = D.cloneElement(v, Ce(Ce({}, c), {}, { style: Ce(Ce({}, d), l), className: b }));
      return g;
    };
    return s === 1 ? f(D.Children.only(i)) : P.createElement("div", null, D.Children.map(i, function(p) {
      return f(p);
    }));
  } }]), r;
})(D.PureComponent);
Ge.displayName = "Animate";
Ge.defaultProps = { begin: 0, duration: 1e3, from: "", to: "", attributeName: "", easing: "ease", isActive: true, canBegin: true, steps: [], onAnimationEnd: function() {
}, onAnimationStart: function() {
} };
Ge.propTypes = { from: Z.oneOfType([Z.object, Z.string]), to: Z.oneOfType([Z.object, Z.string]), attributeName: Z.string, duration: Z.number, begin: Z.number, easing: Z.oneOfType([Z.string, Z.func]), steps: Z.arrayOf(Z.shape({ duration: Z.number.isRequired, style: Z.object.isRequired, easing: Z.oneOfType([Z.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), Z.func]), properties: Z.arrayOf("string"), onAnimationEnd: Z.func })), children: Z.oneOfType([Z.node, Z.func]), isActive: Z.bool, canBegin: Z.bool, onAnimationEnd: Z.func, shouldReAnimate: Z.bool, onAnimationStart: Z.func, onAnimationReStart: Z.func };
function Wr(t5) {
  "@babel/helpers - typeof";
  return Wr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Wr(t5);
}
function Cn() {
  return Cn = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Cn.apply(this, arguments);
}
function q_(t5, e) {
  return W_(t5) || F_(t5, e) || L_(t5, e) || B_();
}
function B_() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function L_(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return Kv(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Kv(t5, e);
  }
}
function Kv(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function F_(t5, e) {
  var r = t5 == null ? null : typeof Symbol < "u" && t5[Symbol.iterator] || t5["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = true, s = false;
    try {
      if (i = (r = r.call(t5)).next, e !== 0) for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); c = true) ;
    } catch (l) {
      s = true, a = l;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw a;
      }
    }
    return u;
  }
}
function W_(t5) {
  if (Array.isArray(t5)) return t5;
}
function Gv(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Hv(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Gv(Object(r), true).forEach(function(n) {
      z_(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Gv(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function z_(t5, e, r) {
  return e = K_(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function K_(t5) {
  var e = G_(t5, "string");
  return Wr(e) == "symbol" ? e : e + "";
}
function G_(t5, e) {
  if (Wr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Wr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
var Uv = function(e, r, n, a, i) {
  var o = Math.min(Math.abs(n) / 2, Math.abs(a) / 2), u = a >= 0 ? 1 : -1, c = n >= 0 ? 1 : -1, s = a >= 0 && n >= 0 || a < 0 && n < 0 ? 1 : 0, l;
  if (o > 0 && i instanceof Array) {
    for (var f = [0, 0, 0, 0], p = 0, v = 4; p < v; p++) f[p] = i[p] > o ? o : i[p];
    l = "M".concat(e, ",").concat(r + u * f[0]), f[0] > 0 && (l += "A ".concat(f[0], ",").concat(f[0], ",0,0,").concat(s, ",").concat(e + c * f[0], ",").concat(r)), l += "L ".concat(e + n - c * f[1], ",").concat(r), f[1] > 0 && (l += "A ".concat(f[1], ",").concat(f[1], ",0,0,").concat(s, `,
        `).concat(e + n, ",").concat(r + u * f[1])), l += "L ".concat(e + n, ",").concat(r + a - u * f[2]), f[2] > 0 && (l += "A ".concat(f[2], ",").concat(f[2], ",0,0,").concat(s, `,
        `).concat(e + n - c * f[2], ",").concat(r + a)), l += "L ".concat(e + c * f[3], ",").concat(r + a), f[3] > 0 && (l += "A ".concat(f[3], ",").concat(f[3], ",0,0,").concat(s, `,
        `).concat(e, ",").concat(r + a - u * f[3])), l += "Z";
  } else if (o > 0 && i === +i && i > 0) {
    var m = Math.min(o, i);
    l = "M ".concat(e, ",").concat(r + u * m, `
            A `).concat(m, ",").concat(m, ",0,0,").concat(s, ",").concat(e + c * m, ",").concat(r, `
            L `).concat(e + n - c * m, ",").concat(r, `
            A `).concat(m, ",").concat(m, ",0,0,").concat(s, ",").concat(e + n, ",").concat(r + u * m, `
            L `).concat(e + n, ",").concat(r + a - u * m, `
            A `).concat(m, ",").concat(m, ",0,0,").concat(s, ",").concat(e + n - c * m, ",").concat(r + a, `
            L `).concat(e + c * m, ",").concat(r + a, `
            A `).concat(m, ",").concat(m, ",0,0,").concat(s, ",").concat(e, ",").concat(r + a - u * m, " Z");
  } else l = "M ".concat(e, ",").concat(r, " h ").concat(n, " v ").concat(a, " h ").concat(-n, " Z");
  return l;
}, H_ = function(e, r) {
  if (!e || !r) return false;
  var n = e.x, a = e.y, i = r.x, o = r.y, u = r.width, c = r.height;
  if (Math.abs(u) > 0 && Math.abs(c) > 0) {
    var s = Math.min(i, i + u), l = Math.max(i, i + u), f = Math.min(o, o + c), p = Math.max(o, o + c);
    return n >= s && n <= l && a >= f && a <= p;
  }
  return false;
}, U_ = { x: 0, y: 0, width: 0, height: 0, radius: 0, isAnimationActive: false, isUpdateAnimationActive: false, animationBegin: 0, animationDuration: 1500, animationEasing: "ease" }, el = function(e) {
  var r = Hv(Hv({}, U_), e), n = D.useRef(), a = D.useState(-1), i = q_(a, 2), o = i[0], u = i[1];
  D.useEffect(function() {
    if (n.current && n.current.getTotalLength) try {
      var w = n.current.getTotalLength();
      w && u(w);
    } catch {
    }
  }, []);
  var c = r.x, s = r.y, l = r.width, f = r.height, p = r.radius, v = r.className, m = r.animationEasing, h = r.animationDuration, d = r.animationBegin, b = r.isAnimationActive, g = r.isUpdateAnimationActive;
  if (c !== +c || s !== +s || l !== +l || f !== +f || l === 0 || f === 0) return null;
  var x = V("recharts-rectangle", v);
  return g ? P.createElement(Ge, { canBegin: o > 0, from: { width: l, height: f, x: c, y: s }, to: { width: l, height: f, x: c, y: s }, duration: h, animationEasing: m, isActive: g }, function(w) {
    var y = w.width, O = w.height, A = w.x, S = w.y;
    return P.createElement(Ge, { canBegin: o > 0, from: "0px ".concat(o === -1 ? 1 : o, "px"), to: "".concat(o, "px 0px"), attributeName: "strokeDasharray", begin: d, duration: h, isActive: b, easing: m }, P.createElement("path", Cn({}, G(r, true), { className: x, d: Uv(A, S, y, O, p), ref: n })));
  }) : P.createElement("path", Cn({}, G(r, true), { className: x, d: Uv(c, s, l, f, p) }));
}, V_ = ["points", "className", "baseLinePoints", "connectNulls"];
function Pt() {
  return Pt = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Pt.apply(this, arguments);
}
function X_(t5, e) {
  if (t5 == null) return {};
  var r = Y_(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function Y_(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
function Vv(t5) {
  return e1(t5) || Q_(t5) || J_(t5) || Z_();
}
function Z_() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function J_(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return os(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return os(t5, e);
  }
}
function Q_(t5) {
  if (typeof Symbol < "u" && t5[Symbol.iterator] != null || t5["@@iterator"] != null) return Array.from(t5);
}
function e1(t5) {
  if (Array.isArray(t5)) return os(t5);
}
function os(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
var Xv = function(e) {
  return e && e.x === +e.x && e.y === +e.y;
}, t1 = function() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r = [[]];
  return e.forEach(function(n) {
    Xv(n) ? r[r.length - 1].push(n) : r[r.length - 1].length > 0 && r.push([]);
  }), Xv(e[0]) && r[r.length - 1].push(e[0]), r[r.length - 1].length <= 0 && (r = r.slice(0, -1)), r;
}, xr = function(e, r) {
  var n = t1(e);
  r && (n = [n.reduce(function(i, o) {
    return [].concat(Vv(i), Vv(o));
  }, [])]);
  var a = n.map(function(i) {
    return i.reduce(function(o, u, c) {
      return "".concat(o).concat(c === 0 ? "M" : "L").concat(u.x, ",").concat(u.y);
    }, "");
  }).join("");
  return n.length === 1 ? "".concat(a, "Z") : a;
}, r1 = function(e, r, n) {
  var a = xr(e, n);
  return "".concat(a.slice(-1) === "Z" ? a.slice(0, -1) : a, "L").concat(xr(r.reverse(), n).slice(1));
}, n1 = function(e) {
  var r = e.points, n = e.className, a = e.baseLinePoints, i = e.connectNulls, o = X_(e, V_);
  if (!r || !r.length) return null;
  var u = V("recharts-polygon", n);
  if (a && a.length) {
    var c = o.stroke && o.stroke !== "none", s = r1(r, a, i);
    return P.createElement("g", { className: u }, P.createElement("path", Pt({}, G(o, true), { fill: s.slice(-1) === "Z" ? o.fill : "none", stroke: "none", d: s })), c ? P.createElement("path", Pt({}, G(o, true), { fill: "none", d: xr(r, i) })) : null, c ? P.createElement("path", Pt({}, G(o, true), { fill: "none", d: xr(a, i) })) : null);
  }
  var l = xr(r, i);
  return P.createElement("path", Pt({}, G(o, true), { fill: l.slice(-1) === "Z" ? o.fill : "none", className: u, d: l }));
};
function us() {
  return us = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, us.apply(this, arguments);
}
var tl = function(e) {
  var r = e.cx, n = e.cy, a = e.r, i = e.className, o = V("recharts-dot", i);
  return r === +r && n === +n && a === +a ? D.createElement("circle", us({}, G(e, false), mn(e), { className: o, cx: r, cy: n, r: a })) : null;
};
function zr(t5) {
  "@babel/helpers - typeof";
  return zr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, zr(t5);
}
var a1 = ["x", "y", "top", "left", "width", "height", "className"];
function cs() {
  return cs = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, cs.apply(this, arguments);
}
function Yv(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function i1(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Yv(Object(r), true).forEach(function(n) {
      o1(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Yv(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function o1(t5, e, r) {
  return e = u1(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function u1(t5) {
  var e = c1(t5, "string");
  return zr(e) == "symbol" ? e : e + "";
}
function c1(t5, e) {
  if (zr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (zr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
function s1(t5, e) {
  if (t5 == null) return {};
  var r = l1(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function l1(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
var f1 = function(e, r, n, a, i, o) {
  return "M".concat(e, ",").concat(i, "v").concat(a, "M").concat(o, ",").concat(r, "h").concat(n);
}, p1 = function(e) {
  var r = e.x, n = r === void 0 ? 0 : r, a = e.y, i = a === void 0 ? 0 : a, o = e.top, u = o === void 0 ? 0 : o, c = e.left, s = c === void 0 ? 0 : c, l = e.width, f = l === void 0 ? 0 : l, p = e.height, v = p === void 0 ? 0 : p, m = e.className, h = s1(e, a1), d = i1({ x: n, y: i, top: u, left: s, width: f, height: v }, h);
  return !N(n) || !N(i) || !N(f) || !N(v) || !N(u) || !N(s) ? null : P.createElement("path", cs({}, G(d, true), { className: V("recharts-cross", m), d: f1(n, i, f, v, u, s) }));
}, Vu, Zv;
function d1() {
  if (Zv) return Vu;
  Zv = 1;
  var t5 = oa(), e = Jy(), r = qe();
  function n(a, i) {
    return a && a.length ? t5(a, r(i, 2), e) : void 0;
  }
  return Vu = n, Vu;
}
var v1 = d1();
const h1 = te(v1);
var Xu, Jv;
function y1() {
  if (Jv) return Xu;
  Jv = 1;
  var t5 = oa(), e = qe(), r = Qy();
  function n(a, i) {
    return a && a.length ? t5(a, e(i, 2), r) : void 0;
  }
  return Xu = n, Xu;
}
var m1 = y1();
const g1 = te(m1);
var b1 = ["cx", "cy", "angle", "ticks", "axisLine"], O1 = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
function qt(t5) {
  "@babel/helpers - typeof";
  return qt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, qt(t5);
}
function wr() {
  return wr = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, wr.apply(this, arguments);
}
function Qv(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function it(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Qv(Object(r), true).forEach(function(n) {
      da(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Qv(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function eh(t5, e) {
  if (t5 == null) return {};
  var r = x1(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function x1(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
function w1(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function th(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, Nm(n.key), n);
  }
}
function A1(t5, e, r) {
  return e && th(t5.prototype, e), r && th(t5, r), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function S1(t5, e, r) {
  return e = Rn(e), P1(t5, Dm() ? Reflect.construct(e, r || [], Rn(t5).constructor) : e.apply(t5, r));
}
function P1(t5, e) {
  if (e && (qt(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return _1(t5);
}
function _1(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function Dm() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Dm = function() {
    return !!t5;
  })();
}
function Rn(t5) {
  return Rn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Rn(t5);
}
function E1(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && ss(t5, e);
}
function ss(t5, e) {
  return ss = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ss(t5, e);
}
function da(t5, e, r) {
  return e = Nm(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Nm(t5) {
  var e = j1(t5, "string");
  return qt(e) == "symbol" ? e : e + "";
}
function j1(t5, e) {
  if (qt(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (qt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
var va = (function(t5) {
  function e() {
    return w1(this, e), S1(this, e, arguments);
  }
  return E1(e, t5), A1(e, [{ key: "getTickValueCoord", value: function(n) {
    var a = n.coordinate, i = this.props, o = i.angle, u = i.cx, c = i.cy;
    return ne(u, c, a, o);
  } }, { key: "getTickTextAnchor", value: function() {
    var n = this.props.orientation, a;
    switch (n) {
      case "left":
        a = "end";
        break;
      case "right":
        a = "start";
        break;
      default:
        a = "middle";
        break;
    }
    return a;
  } }, { key: "getViewBox", value: function() {
    var n = this.props, a = n.cx, i = n.cy, o = n.angle, u = n.ticks, c = h1(u, function(l) {
      return l.coordinate || 0;
    }), s = g1(u, function(l) {
      return l.coordinate || 0;
    });
    return { cx: a, cy: i, startAngle: o, endAngle: o, innerRadius: s.coordinate || 0, outerRadius: c.coordinate || 0 };
  } }, { key: "renderAxisLine", value: function() {
    var n = this.props, a = n.cx, i = n.cy, o = n.angle, u = n.ticks, c = n.axisLine, s = eh(n, b1), l = u.reduce(function(m, h) {
      return [Math.min(m[0], h.coordinate), Math.max(m[1], h.coordinate)];
    }, [1 / 0, -1 / 0]), f = ne(a, i, l[0], o), p = ne(a, i, l[1], o), v = it(it(it({}, G(s, false)), {}, { fill: "none" }, G(c, false)), {}, { x1: f.x, y1: f.y, x2: p.x, y2: p.y });
    return P.createElement("line", wr({ className: "recharts-polar-radius-axis-line" }, v));
  } }, { key: "renderTicks", value: function() {
    var n = this, a = this.props, i = a.ticks, o = a.tick, u = a.angle, c = a.tickFormatter, s = a.stroke, l = eh(a, O1), f = this.getTickTextAnchor(), p = G(l, false), v = G(o, false), m = i.map(function(h, d) {
      var b = n.getTickValueCoord(h), g = it(it(it(it({ textAnchor: f, transform: "rotate(".concat(90 - u, ", ").concat(b.x, ", ").concat(b.y, ")") }, p), {}, { stroke: "none", fill: s }, v), {}, { index: d }, b), {}, { payload: h });
      return P.createElement(J, wr({ className: V("recharts-polar-radius-axis-tick", _m(o)), key: "tick-".concat(h.coordinate) }, dt(n.props, h, d)), e.renderTickItem(o, g, c ? c(h.value, d) : h.value));
    });
    return P.createElement(J, { className: "recharts-polar-radius-axis-ticks" }, m);
  } }, { key: "render", value: function() {
    var n = this.props, a = n.ticks, i = n.axisLine, o = n.tick;
    return !a || !a.length ? null : P.createElement(J, { className: V("recharts-polar-radius-axis", this.props.className) }, i && this.renderAxisLine(), o && this.renderTicks(), he.renderCallByParent(this.props, this.getViewBox()));
  } }], [{ key: "renderTickItem", value: function(n, a, i) {
    var o;
    return P.isValidElement(n) ? o = P.cloneElement(n, a) : U(n) ? o = n(a) : o = P.createElement(vt, wr({}, a, { className: "recharts-polar-radius-axis-tick-value" }), i), o;
  } }]);
})(D.PureComponent);
da(va, "displayName", "PolarRadiusAxis");
da(va, "axisType", "radiusAxis");
da(va, "defaultProps", { type: "number", radiusAxisId: 0, cx: 0, cy: 0, angle: 0, orientation: "right", stroke: "#ccc", axisLine: true, tick: true, tickCount: 5, allowDataOverflow: false, scale: "auto", allowDuplicatedCategory: true });
function Bt(t5) {
  "@babel/helpers - typeof";
  return Bt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Bt(t5);
}
function ct() {
  return ct = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, ct.apply(this, arguments);
}
function rh(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ot(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? rh(Object(r), true).forEach(function(n) {
      ha(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : rh(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function T1(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function nh(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, Bm(n.key), n);
  }
}
function I1(t5, e, r) {
  return e && nh(t5.prototype, e), r && nh(t5, r), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function $1(t5, e, r) {
  return e = Mn(e), C1(t5, qm() ? Reflect.construct(e, r || [], Mn(t5).constructor) : e.apply(t5, r));
}
function C1(t5, e) {
  if (e && (Bt(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return R1(t5);
}
function R1(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function qm() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (qm = function() {
    return !!t5;
  })();
}
function Mn(t5) {
  return Mn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Mn(t5);
}
function M1(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && ls(t5, e);
}
function ls(t5, e) {
  return ls = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ls(t5, e);
}
function ha(t5, e, r) {
  return e = Bm(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Bm(t5) {
  var e = k1(t5, "string");
  return Bt(e) == "symbol" ? e : e + "";
}
function k1(t5, e) {
  if (Bt(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Bt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
var D1 = Math.PI / 180, ah = 1e-5, ya = (function(t5) {
  function e() {
    return T1(this, e), $1(this, e, arguments);
  }
  return M1(e, t5), I1(e, [{ key: "getTickLineCoord", value: function(n) {
    var a = this.props, i = a.cx, o = a.cy, u = a.radius, c = a.orientation, s = a.tickSize, l = s || 8, f = ne(i, o, u, n.coordinate), p = ne(i, o, u + (c === "inner" ? -1 : 1) * l, n.coordinate);
    return { x1: f.x, y1: f.y, x2: p.x, y2: p.y };
  } }, { key: "getTickTextAnchor", value: function(n) {
    var a = this.props.orientation, i = Math.cos(-n.coordinate * D1), o;
    return i > ah ? o = a === "outer" ? "start" : "end" : i < -ah ? o = a === "outer" ? "end" : "start" : o = "middle", o;
  } }, { key: "renderAxisLine", value: function() {
    var n = this.props, a = n.cx, i = n.cy, o = n.radius, u = n.axisLine, c = n.axisLineType, s = ot(ot({}, G(this.props, false)), {}, { fill: "none" }, G(u, false));
    if (c === "circle") return P.createElement(tl, ct({ className: "recharts-polar-angle-axis-line" }, s, { cx: a, cy: i, r: o }));
    var l = this.props.ticks, f = l.map(function(p) {
      return ne(a, i, o, p.coordinate);
    });
    return P.createElement(n1, ct({ className: "recharts-polar-angle-axis-line" }, s, { points: f }));
  } }, { key: "renderTicks", value: function() {
    var n = this, a = this.props, i = a.ticks, o = a.tick, u = a.tickLine, c = a.tickFormatter, s = a.stroke, l = G(this.props, false), f = G(o, false), p = ot(ot({}, l), {}, { fill: "none" }, G(u, false)), v = i.map(function(m, h) {
      var d = n.getTickLineCoord(m), b = n.getTickTextAnchor(m), g = ot(ot(ot({ textAnchor: b }, l), {}, { stroke: "none", fill: s }, f), {}, { index: h, payload: m, x: d.x2, y: d.y2 });
      return P.createElement(J, ct({ className: V("recharts-polar-angle-axis-tick", _m(o)), key: "tick-".concat(m.coordinate) }, dt(n.props, m, h)), u && P.createElement("line", ct({ className: "recharts-polar-angle-axis-tick-line" }, p, d)), o && e.renderTickItem(o, g, c ? c(m.value, h) : m.value));
    });
    return P.createElement(J, { className: "recharts-polar-angle-axis-ticks" }, v);
  } }, { key: "render", value: function() {
    var n = this.props, a = n.ticks, i = n.radius, o = n.axisLine;
    return i <= 0 || !a || !a.length ? null : P.createElement(J, { className: V("recharts-polar-angle-axis", this.props.className) }, o && this.renderAxisLine(), this.renderTicks());
  } }], [{ key: "renderTickItem", value: function(n, a, i) {
    var o;
    return P.isValidElement(n) ? o = P.cloneElement(n, a) : U(n) ? o = n(a) : o = P.createElement(vt, ct({}, a, { className: "recharts-polar-angle-axis-tick-value" }), i), o;
  } }]);
})(D.PureComponent);
ha(ya, "displayName", "PolarAngleAxis");
ha(ya, "axisType", "angleAxis");
ha(ya, "defaultProps", { type: "category", angleAxisId: 0, scale: "auto", cx: 0, cy: 0, orientation: "outer", axisLine: true, tickLine: true, tickSize: 8, tick: true, hide: false, allowDuplicatedCategory: true });
var Yu, ih;
function N1() {
  if (ih) return Yu;
  ih = 1;
  var t5 = Iy(), e = t5(Object.getPrototypeOf, Object);
  return Yu = e, Yu;
}
var Zu, oh;
function q1() {
  if (oh) return Zu;
  oh = 1;
  var t5 = He(), e = N1(), r = Ue(), n = "[object Object]", a = Function.prototype, i = Object.prototype, o = a.toString, u = i.hasOwnProperty, c = o.call(Object);
  function s(l) {
    if (!r(l) || t5(l) != n) return false;
    var f = e(l);
    if (f === null) return true;
    var p = u.call(f, "constructor") && f.constructor;
    return typeof p == "function" && p instanceof p && o.call(p) == c;
  }
  return Zu = s, Zu;
}
var B1 = q1();
const L1 = te(B1);
var Ju, uh;
function F1() {
  if (uh) return Ju;
  uh = 1;
  var t5 = He(), e = Ue(), r = "[object Boolean]";
  function n(a) {
    return a === true || a === false || e(a) && t5(a) == r;
  }
  return Ju = n, Ju;
}
var W1 = F1();
const z1 = te(W1);
function Kr(t5) {
  "@babel/helpers - typeof";
  return Kr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Kr(t5);
}
function kn() {
  return kn = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, kn.apply(this, arguments);
}
function K1(t5, e) {
  return V1(t5) || U1(t5, e) || H1(t5, e) || G1();
}
function G1() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function H1(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return ch(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ch(t5, e);
  }
}
function ch(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function U1(t5, e) {
  var r = t5 == null ? null : typeof Symbol < "u" && t5[Symbol.iterator] || t5["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = true, s = false;
    try {
      if (i = (r = r.call(t5)).next, e !== 0) for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); c = true) ;
    } catch (l) {
      s = true, a = l;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw a;
      }
    }
    return u;
  }
}
function V1(t5) {
  if (Array.isArray(t5)) return t5;
}
function sh(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function lh(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? sh(Object(r), true).forEach(function(n) {
      X1(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : sh(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function X1(t5, e, r) {
  return e = Y1(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Y1(t5) {
  var e = Z1(t5, "string");
  return Kr(e) == "symbol" ? e : e + "";
}
function Z1(t5, e) {
  if (Kr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Kr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
var fh = function(e, r, n, a, i) {
  var o = n - a, u;
  return u = "M ".concat(e, ",").concat(r), u += "L ".concat(e + n, ",").concat(r), u += "L ".concat(e + n - o / 2, ",").concat(r + i), u += "L ".concat(e + n - o / 2 - a, ",").concat(r + i), u += "L ".concat(e, ",").concat(r, " Z"), u;
}, J1 = { x: 0, y: 0, upperWidth: 0, lowerWidth: 0, height: 0, isUpdateAnimationActive: false, animationBegin: 0, animationDuration: 1500, animationEasing: "ease" }, Q1 = function(e) {
  var r = lh(lh({}, J1), e), n = D.useRef(), a = D.useState(-1), i = K1(a, 2), o = i[0], u = i[1];
  D.useEffect(function() {
    if (n.current && n.current.getTotalLength) try {
      var x = n.current.getTotalLength();
      x && u(x);
    } catch {
    }
  }, []);
  var c = r.x, s = r.y, l = r.upperWidth, f = r.lowerWidth, p = r.height, v = r.className, m = r.animationEasing, h = r.animationDuration, d = r.animationBegin, b = r.isUpdateAnimationActive;
  if (c !== +c || s !== +s || l !== +l || f !== +f || p !== +p || l === 0 && f === 0 || p === 0) return null;
  var g = V("recharts-trapezoid", v);
  return b ? P.createElement(Ge, { canBegin: o > 0, from: { upperWidth: 0, lowerWidth: 0, height: p, x: c, y: s }, to: { upperWidth: l, lowerWidth: f, height: p, x: c, y: s }, duration: h, animationEasing: m, isActive: b }, function(x) {
    var w = x.upperWidth, y = x.lowerWidth, O = x.height, A = x.x, S = x.y;
    return P.createElement(Ge, { canBegin: o > 0, from: "0px ".concat(o === -1 ? 1 : o, "px"), to: "".concat(o, "px 0px"), attributeName: "strokeDasharray", begin: d, duration: h, easing: m }, P.createElement("path", kn({}, G(r, true), { className: g, d: fh(A, S, w, y, O), ref: n })));
  }) : P.createElement("g", null, P.createElement("path", kn({}, G(r, true), { className: g, d: fh(c, s, l, f, p) })));
}, eE = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function Gr(t5) {
  "@babel/helpers - typeof";
  return Gr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Gr(t5);
}
function tE(t5, e) {
  if (t5 == null) return {};
  var r = rE(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function rE(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
function ph(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Dn(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ph(Object(r), true).forEach(function(n) {
      nE(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : ph(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function nE(t5, e, r) {
  return e = aE(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function aE(t5) {
  var e = iE(t5, "string");
  return Gr(e) == "symbol" ? e : e + "";
}
function iE(t5, e) {
  if (Gr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Gr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
function oE(t5, e) {
  return Dn(Dn({}, e), t5);
}
function uE(t5, e) {
  return t5 === "symbols";
}
function dh(t5) {
  var e = t5.shapeType, r = t5.elementProps;
  switch (e) {
    case "rectangle":
      return P.createElement(el, r);
    case "trapezoid":
      return P.createElement(Q1, r);
    case "sector":
      return P.createElement(Tm, r);
    case "symbols":
      if (uE(e)) return P.createElement(Ls, r);
      break;
    default:
      return null;
  }
}
function cE(t5) {
  return D.isValidElement(t5) ? t5.props : t5;
}
function Lm(t5) {
  var e = t5.option, r = t5.shapeType, n = t5.propTransformer, a = n === void 0 ? oE : n, i = t5.activeClassName, o = i === void 0 ? "recharts-active-shape" : i, u = t5.isActive, c = tE(t5, eE), s;
  if (D.isValidElement(e)) s = D.cloneElement(e, Dn(Dn({}, c), cE(e)));
  else if (U(e)) s = e(c);
  else if (L1(e) && !z1(e)) {
    var l = a(e, c);
    s = P.createElement(dh, { shapeType: r, elementProps: l });
  } else {
    var f = c;
    s = P.createElement(dh, { shapeType: r, elementProps: f });
  }
  return u ? P.createElement(J, { className: o }, s) : s;
}
function ma(t5, e) {
  return e != null && "trapezoids" in t5.props;
}
function ga(t5, e) {
  return e != null && "sectors" in t5.props;
}
function Hr(t5, e) {
  return e != null && "points" in t5.props;
}
function sE(t5, e) {
  var r, n, a = t5.x === (e == null || (r = e.labelViewBox) === null || r === void 0 ? void 0 : r.x) || t5.x === e.x, i = t5.y === (e == null || (n = e.labelViewBox) === null || n === void 0 ? void 0 : n.y) || t5.y === e.y;
  return a && i;
}
function lE(t5, e) {
  var r = t5.endAngle === e.endAngle, n = t5.startAngle === e.startAngle;
  return r && n;
}
function fE(t5, e) {
  var r = t5.x === e.x, n = t5.y === e.y, a = t5.z === e.z;
  return r && n && a;
}
function pE(t5, e) {
  var r;
  return ma(t5, e) ? r = sE : ga(t5, e) ? r = lE : Hr(t5, e) && (r = fE), r;
}
function dE(t5, e) {
  var r;
  return ma(t5, e) ? r = "trapezoids" : ga(t5, e) ? r = "sectors" : Hr(t5, e) && (r = "points"), r;
}
function vE(t5, e) {
  if (ma(t5, e)) {
    var r;
    return (r = e.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload;
  }
  if (ga(t5, e)) {
    var n;
    return (n = e.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload;
  }
  return Hr(t5, e) ? e.payload : {};
}
function hE(t5) {
  var e = t5.activeTooltipItem, r = t5.graphicalItem, n = t5.itemData, a = dE(r, e), i = vE(r, e), o = n.filter(function(c, s) {
    var l = sa(i, c), f = r.props[a].filter(function(m) {
      var h = pE(r, e);
      return h(m, e);
    }), p = r.props[a].indexOf(f[f.length - 1]), v = s === p;
    return l && v;
  }), u = n.indexOf(o[o.length - 1]);
  return u;
}
var yn;
function Lt(t5) {
  "@babel/helpers - typeof";
  return Lt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Lt(t5);
}
function _t() {
  return _t = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, _t.apply(this, arguments);
}
function vh(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function re(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? vh(Object(r), true).forEach(function(n) {
      je(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : vh(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function yE(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function hh(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, Wm(n.key), n);
  }
}
function mE(t5, e, r) {
  return e && hh(t5.prototype, e), r && hh(t5, r), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function gE(t5, e, r) {
  return e = Nn(e), bE(t5, Fm() ? Reflect.construct(e, r || [], Nn(t5).constructor) : e.apply(t5, r));
}
function bE(t5, e) {
  if (e && (Lt(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return OE(t5);
}
function OE(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function Fm() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Fm = function() {
    return !!t5;
  })();
}
function Nn(t5) {
  return Nn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Nn(t5);
}
function xE(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && fs(t5, e);
}
function fs(t5, e) {
  return fs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, fs(t5, e);
}
function je(t5, e, r) {
  return e = Wm(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Wm(t5) {
  var e = wE(t5, "string");
  return Lt(e) == "symbol" ? e : e + "";
}
function wE(t5, e) {
  if (Lt(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Lt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
var Qe = (function(t5) {
  function e(r) {
    var n;
    return yE(this, e), n = gE(this, e, [r]), je(n, "pieRef", null), je(n, "sectorRefs", []), je(n, "id", tn("recharts-pie-")), je(n, "handleAnimationEnd", function() {
      var a = n.props.onAnimationEnd;
      n.setState({ isAnimationFinished: true }), U(a) && a();
    }), je(n, "handleAnimationStart", function() {
      var a = n.props.onAnimationStart;
      n.setState({ isAnimationFinished: false }), U(a) && a();
    }), n.state = { isAnimationFinished: !r.isAnimationActive, prevIsAnimationActive: r.isAnimationActive, prevAnimationId: r.animationId, sectorToFocus: 0 }, n;
  }
  return xE(e, t5), mE(e, [{ key: "isActiveIndex", value: function(n) {
    var a = this.props.activeIndex;
    return Array.isArray(a) ? a.indexOf(n) !== -1 : n === a;
  } }, { key: "hasActiveIndex", value: function() {
    var n = this.props.activeIndex;
    return Array.isArray(n) ? n.length !== 0 : n || n === 0;
  } }, { key: "renderLabels", value: function(n) {
    var a = this.props.isAnimationActive;
    if (a && !this.state.isAnimationFinished) return null;
    var i = this.props, o = i.label, u = i.labelLine, c = i.dataKey, s = i.valueKey, l = G(this.props, false), f = G(o, false), p = G(u, false), v = o && o.offsetRadius || 20, m = n.map(function(h, d) {
      var b = (h.startAngle + h.endAngle) / 2, g = ne(h.cx, h.cy, h.outerRadius + v, b), x = re(re(re(re({}, l), h), {}, { stroke: "none" }, f), {}, { index: d, textAnchor: e.getTextAnchor(g.x, h.cx) }, g), w = re(re(re(re({}, l), h), {}, { fill: "none", stroke: h.fill }, p), {}, { index: d, points: [ne(h.cx, h.cy, h.outerRadius, b), g] }), y = c;
      return X(c) && X(s) ? y = "value" : X(c) && (y = s), P.createElement(J, { key: "label-".concat(h.startAngle, "-").concat(h.endAngle, "-").concat(h.midAngle, "-").concat(d) }, u && e.renderLabelLineItem(u, w, "line"), e.renderLabelItem(o, x, ge(h, y)));
    });
    return P.createElement(J, { className: "recharts-pie-labels" }, m);
  } }, { key: "renderSectorsStatically", value: function(n) {
    var a = this, i = this.props, o = i.activeShape, u = i.blendStroke, c = i.inactiveShape;
    return n.map(function(s, l) {
      if ((s == null ? void 0 : s.startAngle) === 0 && (s == null ? void 0 : s.endAngle) === 0 && n.length !== 1) return null;
      var f = a.isActiveIndex(l), p = c && a.hasActiveIndex() ? c : null, v = f ? o : p, m = re(re({}, s), {}, { stroke: u ? s.fill : s.stroke, tabIndex: -1 });
      return P.createElement(J, _t({ ref: function(d) {
        d && !a.sectorRefs.includes(d) && a.sectorRefs.push(d);
      }, tabIndex: -1, className: "recharts-pie-sector" }, dt(a.props, s, l), { key: "sector-".concat(s == null ? void 0 : s.startAngle, "-").concat(s == null ? void 0 : s.endAngle, "-").concat(s.midAngle, "-").concat(l) }), P.createElement(Lm, _t({ option: v, isActive: f, shapeType: "sector" }, m)));
    });
  } }, { key: "renderSectorsWithAnimation", value: function() {
    var n = this, a = this.props, i = a.sectors, o = a.isAnimationActive, u = a.animationBegin, c = a.animationDuration, s = a.animationEasing, l = a.animationId, f = this.state, p = f.prevSectors, v = f.prevIsAnimationActive;
    return P.createElement(Ge, { begin: u, duration: c, isActive: o, easing: s, from: { t: 0 }, to: { t: 1 }, key: "pie-".concat(l, "-").concat(v), onAnimationStart: this.handleAnimationStart, onAnimationEnd: this.handleAnimationEnd }, function(m) {
      var h = m.t, d = [], b = i && i[0], g = b.startAngle;
      return i.forEach(function(x, w) {
        var y = p && p[w], O = w > 0 ? Pe(x, "paddingAngle", 0) : 0;
        if (y) {
          var A = Ve(y.endAngle - y.startAngle, x.endAngle - x.startAngle), S = re(re({}, x), {}, { startAngle: g + O, endAngle: g + A(h) + O });
          d.push(S), g = S.endAngle;
        } else {
          var _ = x.endAngle, T = x.startAngle, E = Ve(0, _ - T), j = E(h), I = re(re({}, x), {}, { startAngle: g + O, endAngle: g + j + O });
          d.push(I), g = I.endAngle;
        }
      }), P.createElement(J, null, n.renderSectorsStatically(d));
    });
  } }, { key: "attachKeyboardHandlers", value: function(n) {
    var a = this;
    n.onkeydown = function(i) {
      if (!i.altKey) switch (i.key) {
        case "ArrowLeft": {
          var o = ++a.state.sectorToFocus % a.sectorRefs.length;
          a.sectorRefs[o].focus(), a.setState({ sectorToFocus: o });
          break;
        }
        case "ArrowRight": {
          var u = --a.state.sectorToFocus < 0 ? a.sectorRefs.length - 1 : a.state.sectorToFocus % a.sectorRefs.length;
          a.sectorRefs[u].focus(), a.setState({ sectorToFocus: u });
          break;
        }
        case "Escape": {
          a.sectorRefs[a.state.sectorToFocus].blur(), a.setState({ sectorToFocus: 0 });
          break;
        }
      }
    };
  } }, { key: "renderSectors", value: function() {
    var n = this.props, a = n.sectors, i = n.isAnimationActive, o = this.state.prevSectors;
    return i && a && a.length && (!o || !sa(o, a)) ? this.renderSectorsWithAnimation() : this.renderSectorsStatically(a);
  } }, { key: "componentDidMount", value: function() {
    this.pieRef && this.attachKeyboardHandlers(this.pieRef);
  } }, { key: "render", value: function() {
    var n = this, a = this.props, i = a.hide, o = a.sectors, u = a.className, c = a.label, s = a.cx, l = a.cy, f = a.innerRadius, p = a.outerRadius, v = a.isAnimationActive, m = this.state.isAnimationFinished;
    if (i || !o || !o.length || !N(s) || !N(l) || !N(f) || !N(p)) return null;
    var h = V("recharts-pie", u);
    return P.createElement(J, { tabIndex: this.props.rootTabIndex, className: h, ref: function(b) {
      n.pieRef = b;
    } }, this.renderSectors(), c && this.renderLabels(o), he.renderCallByParent(this.props, null, false), (!v || m) && Ze.renderCallByParent(this.props, o, false));
  } }], [{ key: "getDerivedStateFromProps", value: function(n, a) {
    return a.prevIsAnimationActive !== n.isAnimationActive ? { prevIsAnimationActive: n.isAnimationActive, prevAnimationId: n.animationId, curSectors: n.sectors, prevSectors: [], isAnimationFinished: true } : n.isAnimationActive && n.animationId !== a.prevAnimationId ? { prevAnimationId: n.animationId, curSectors: n.sectors, prevSectors: a.curSectors, isAnimationFinished: true } : n.sectors !== a.curSectors ? { curSectors: n.sectors, isAnimationFinished: true } : null;
  } }, { key: "getTextAnchor", value: function(n, a) {
    return n > a ? "start" : n < a ? "end" : "middle";
  } }, { key: "renderLabelLineItem", value: function(n, a, i) {
    if (P.isValidElement(n)) return P.cloneElement(n, a);
    if (U(n)) return n(a);
    var o = V("recharts-pie-label-line", typeof n != "boolean" ? n.className : "");
    return P.createElement(Yc, _t({}, a, { key: i, type: "linear", className: o }));
  } }, { key: "renderLabelItem", value: function(n, a, i) {
    if (P.isValidElement(n)) return P.cloneElement(n, a);
    var o = i;
    if (U(n) && (o = n(a), P.isValidElement(o))) return o;
    var u = V("recharts-pie-label-text", typeof n != "boolean" && !U(n) ? n.className : "");
    return P.createElement(vt, _t({}, a, { alignmentBaseline: "middle", className: u }), o);
  } }]);
})(D.PureComponent);
yn = Qe;
je(Qe, "displayName", "Pie");
je(Qe, "defaultProps", { stroke: "#fff", fill: "#808080", legendType: "rect", cx: "50%", cy: "50%", startAngle: 0, endAngle: 360, innerRadius: 0, outerRadius: "80%", paddingAngle: 0, labelLine: true, hide: false, minAngle: 0, isAnimationActive: !tr.isSsr, animationBegin: 400, animationDuration: 1500, animationEasing: "ease", nameKey: "name", blendStroke: false, rootTabIndex: 0 });
je(Qe, "parseDeltaAngle", function(t5, e) {
  var r = be(e - t5), n = Math.min(Math.abs(e - t5), 360);
  return r * n;
});
je(Qe, "getRealPieData", function(t5) {
  var e = t5.data, r = t5.children, n = G(t5, false), a = Te(r, Ys);
  return e && e.length ? e.map(function(i, o) {
    return re(re(re({ payload: i }, n), i), a && a[o] && a[o].props);
  }) : a && a.length ? a.map(function(i) {
    return re(re({}, n), i.props);
  }) : [];
});
je(Qe, "parseCoordinateOfPie", function(t5, e) {
  var r = e.top, n = e.left, a = e.width, i = e.height, o = Pm(a, i), u = n + Oe(t5.cx, a, a / 2), c = r + Oe(t5.cy, i, i / 2), s = Oe(t5.innerRadius, o, 0), l = Oe(t5.outerRadius, o, o * 0.8), f = t5.maxRadius || Math.sqrt(a * a + i * i) / 2;
  return { cx: u, cy: c, innerRadius: s, outerRadius: l, maxRadius: f };
});
je(Qe, "getComposedData", function(t5) {
  var e = t5.item, r = t5.offset, n = e.type.defaultProps !== void 0 ? re(re({}, e.type.defaultProps), e.props) : e.props, a = yn.getRealPieData(n);
  if (!a || !a.length) return null;
  var i = n.cornerRadius, o = n.startAngle, u = n.endAngle, c = n.paddingAngle, s = n.dataKey, l = n.nameKey, f = n.valueKey, p = n.tooltipType, v = Math.abs(n.minAngle), m = yn.parseCoordinateOfPie(n, r), h = yn.parseDeltaAngle(o, u), d = Math.abs(h), b = s;
  X(s) && X(f) ? (ze(false, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), b = "value") : X(s) && (ze(false, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), b = f);
  var g = a.filter(function(S) {
    return ge(S, b, 0) !== 0;
  }).length, x = (d >= 360 ? g : g - 1) * c, w = d - g * v - x, y = a.reduce(function(S, _) {
    var T = ge(_, b, 0);
    return S + (N(T) ? T : 0);
  }, 0), O;
  if (y > 0) {
    var A;
    O = a.map(function(S, _) {
      var T = ge(S, b, 0), E = ge(S, l, _), j = (N(T) ? T : 0) / y, I;
      _ ? I = A.endAngle + be(h) * c * (T !== 0 ? 1 : 0) : I = o;
      var R = I + be(h) * ((T !== 0 ? v : 0) + j * w), C = (I + R) / 2, M = (m.innerRadius + m.outerRadius) / 2, k = [{ name: E, value: T, payload: S, dataKey: b, type: p }], q = ne(m.cx, m.cy, M, C);
      return A = re(re(re({ percent: j, cornerRadius: i, name: E, tooltipPayload: k, midAngle: C, middleRadius: M, tooltipPosition: q }, S), m), {}, { value: ge(S, b), startAngle: I, endAngle: R, payload: S, paddingAngle: be(h) * c }), A;
    });
  }
  return re(re({}, m), {}, { sectors: O, data: a });
});
var Qu, yh;
function AE() {
  if (yh) return Qu;
  yh = 1;
  var t5 = Math.ceil, e = Math.max;
  function r(n, a, i, o) {
    for (var u = -1, c = e(t5((a - n) / (i || 1)), 0), s = Array(c); c--; ) s[o ? c : ++u] = n, n += i;
    return s;
  }
  return Qu = r, Qu;
}
var ec, mh;
function zm() {
  if (mh) return ec;
  mh = 1;
  var t5 = Hy(), e = 1 / 0, r = 17976931348623157e292;
  function n(a) {
    if (!a) return a === 0 ? a : 0;
    if (a = t5(a), a === e || a === -e) {
      var i = a < 0 ? -1 : 1;
      return i * r;
    }
    return a === a ? a : 0;
  }
  return ec = n, ec;
}
var tc, gh;
function SE() {
  if (gh) return tc;
  gh = 1;
  var t5 = AE(), e = ia(), r = zm();
  function n(a) {
    return function(i, o, u) {
      return u && typeof u != "number" && e(i, o, u) && (o = u = void 0), i = r(i), o === void 0 ? (o = i, i = 0) : o = r(o), u = u === void 0 ? i < o ? 1 : -1 : r(u), t5(i, o, u, a);
    };
  }
  return tc = n, tc;
}
var rc, bh;
function PE() {
  if (bh) return rc;
  bh = 1;
  var t5 = SE(), e = t5();
  return rc = e, rc;
}
var _E = PE();
const qn = te(_E);
function Ur(t5) {
  "@babel/helpers - typeof";
  return Ur = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ur(t5);
}
function Oh(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xh(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Oh(Object(r), true).forEach(function(n) {
      Km(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Oh(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function Km(t5, e, r) {
  return e = EE(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function EE(t5) {
  var e = jE(t5, "string");
  return Ur(e) == "symbol" ? e : e + "";
}
function jE(t5, e) {
  if (Ur(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Ur(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
var TE = ["Webkit", "Moz", "O", "ms"], IE = function(e, r) {
  var n = e.replace(/(\w)/, function(i) {
    return i.toUpperCase();
  }), a = TE.reduce(function(i, o) {
    return xh(xh({}, i), {}, Km({}, o + n, r));
  }, {});
  return a[e] = r, a;
};
function Ft(t5) {
  "@babel/helpers - typeof";
  return Ft = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ft(t5);
}
function Bn() {
  return Bn = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Bn.apply(this, arguments);
}
function wh(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function nc(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? wh(Object(r), true).forEach(function(n) {
      we(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : wh(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function $E(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function Ah(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, Hm(n.key), n);
  }
}
function CE(t5, e, r) {
  return e && Ah(t5.prototype, e), r && Ah(t5, r), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function RE(t5, e, r) {
  return e = Ln(e), ME(t5, Gm() ? Reflect.construct(e, r || [], Ln(t5).constructor) : e.apply(t5, r));
}
function ME(t5, e) {
  if (e && (Ft(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return kE(t5);
}
function kE(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function Gm() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Gm = function() {
    return !!t5;
  })();
}
function Ln(t5) {
  return Ln = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ln(t5);
}
function DE(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && ps(t5, e);
}
function ps(t5, e) {
  return ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ps(t5, e);
}
function we(t5, e, r) {
  return e = Hm(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Hm(t5) {
  var e = NE(t5, "string");
  return Ft(e) == "symbol" ? e : e + "";
}
function NE(t5, e) {
  if (Ft(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Ft(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
var qE = function(e) {
  var r = e.data, n = e.startIndex, a = e.endIndex, i = e.x, o = e.width, u = e.travellerWidth;
  if (!r || !r.length) return {};
  var c = r.length, s = mr().domain(qn(0, c)).range([i, i + o - u]), l = s.domain().map(function(f) {
    return s(f);
  });
  return { isTextActive: false, isSlideMoving: false, isTravellerMoving: false, isTravellerFocused: false, startX: s(n), endX: s(a), scale: s, scaleValues: l };
}, Sh = function(e) {
  return e.changedTouches && !!e.changedTouches.length;
}, Wt = (function(t5) {
  function e(r) {
    var n;
    return $E(this, e), n = RE(this, e, [r]), we(n, "handleDrag", function(a) {
      n.leaveTimer && (clearTimeout(n.leaveTimer), n.leaveTimer = null), n.state.isTravellerMoving ? n.handleTravellerMove(a) : n.state.isSlideMoving && n.handleSlideDrag(a);
    }), we(n, "handleTouchMove", function(a) {
      a.changedTouches != null && a.changedTouches.length > 0 && n.handleDrag(a.changedTouches[0]);
    }), we(n, "handleDragEnd", function() {
      n.setState({ isTravellerMoving: false, isSlideMoving: false }, function() {
        var a = n.props, i = a.endIndex, o = a.onDragEnd, u = a.startIndex;
        o == null ? void 0 : o({ endIndex: i, startIndex: u });
      }), n.detachDragEndListener();
    }), we(n, "handleLeaveWrapper", function() {
      (n.state.isTravellerMoving || n.state.isSlideMoving) && (n.leaveTimer = window.setTimeout(n.handleDragEnd, n.props.leaveTimeOut));
    }), we(n, "handleEnterSlideOrTraveller", function() {
      n.setState({ isTextActive: true });
    }), we(n, "handleLeaveSlideOrTraveller", function() {
      n.setState({ isTextActive: false });
    }), we(n, "handleSlideDragStart", function(a) {
      var i = Sh(a) ? a.changedTouches[0] : a;
      n.setState({ isTravellerMoving: false, isSlideMoving: true, slideMoveStartX: i.pageX }), n.attachDragEndListener();
    }), n.travellerDragStartHandlers = { startX: n.handleTravellerDragStart.bind(n, "startX"), endX: n.handleTravellerDragStart.bind(n, "endX") }, n.state = {}, n;
  }
  return DE(e, t5), CE(e, [{ key: "componentWillUnmount", value: function() {
    this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.detachDragEndListener();
  } }, { key: "getIndex", value: function(n) {
    var a = n.startX, i = n.endX, o = this.state.scaleValues, u = this.props, c = u.gap, s = u.data, l = s.length - 1, f = Math.min(a, i), p = Math.max(a, i), v = e.getIndexInRange(o, f), m = e.getIndexInRange(o, p);
    return { startIndex: v - v % c, endIndex: m === l ? l : m - m % c };
  } }, { key: "getTextOfTick", value: function(n) {
    var a = this.props, i = a.data, o = a.tickFormatter, u = a.dataKey, c = ge(i[n], u, n);
    return U(o) ? o(c, n) : c;
  } }, { key: "attachDragEndListener", value: function() {
    window.addEventListener("mouseup", this.handleDragEnd, true), window.addEventListener("touchend", this.handleDragEnd, true), window.addEventListener("mousemove", this.handleDrag, true);
  } }, { key: "detachDragEndListener", value: function() {
    window.removeEventListener("mouseup", this.handleDragEnd, true), window.removeEventListener("touchend", this.handleDragEnd, true), window.removeEventListener("mousemove", this.handleDrag, true);
  } }, { key: "handleSlideDrag", value: function(n) {
    var a = this.state, i = a.slideMoveStartX, o = a.startX, u = a.endX, c = this.props, s = c.x, l = c.width, f = c.travellerWidth, p = c.startIndex, v = c.endIndex, m = c.onChange, h = n.pageX - i;
    h > 0 ? h = Math.min(h, s + l - f - u, s + l - f - o) : h < 0 && (h = Math.max(h, s - o, s - u));
    var d = this.getIndex({ startX: o + h, endX: u + h });
    (d.startIndex !== p || d.endIndex !== v) && m && m(d), this.setState({ startX: o + h, endX: u + h, slideMoveStartX: n.pageX });
  } }, { key: "handleTravellerDragStart", value: function(n, a) {
    var i = Sh(a) ? a.changedTouches[0] : a;
    this.setState({ isSlideMoving: false, isTravellerMoving: true, movingTravellerId: n, brushMoveStartX: i.pageX }), this.attachDragEndListener();
  } }, { key: "handleTravellerMove", value: function(n) {
    var a = this.state, i = a.brushMoveStartX, o = a.movingTravellerId, u = a.endX, c = a.startX, s = this.state[o], l = this.props, f = l.x, p = l.width, v = l.travellerWidth, m = l.onChange, h = l.gap, d = l.data, b = { startX: this.state.startX, endX: this.state.endX }, g = n.pageX - i;
    g > 0 ? g = Math.min(g, f + p - v - s) : g < 0 && (g = Math.max(g, f - s)), b[o] = s + g;
    var x = this.getIndex(b), w = x.startIndex, y = x.endIndex, O = function() {
      var S = d.length - 1;
      return o === "startX" && (u > c ? w % h === 0 : y % h === 0) || u < c && y === S || o === "endX" && (u > c ? y % h === 0 : w % h === 0) || u > c && y === S;
    };
    this.setState(we(we({}, o, s + g), "brushMoveStartX", n.pageX), function() {
      m && O() && m(x);
    });
  } }, { key: "handleTravellerMoveKeyboard", value: function(n, a) {
    var i = this, o = this.state, u = o.scaleValues, c = o.startX, s = o.endX, l = this.state[a], f = u.indexOf(l);
    if (f !== -1) {
      var p = f + n;
      if (!(p === -1 || p >= u.length)) {
        var v = u[p];
        a === "startX" && v >= s || a === "endX" && v <= c || this.setState(we({}, a, v), function() {
          i.props.onChange(i.getIndex({ startX: i.state.startX, endX: i.state.endX }));
        });
      }
    }
  } }, { key: "renderBackground", value: function() {
    var n = this.props, a = n.x, i = n.y, o = n.width, u = n.height, c = n.fill, s = n.stroke;
    return P.createElement("rect", { stroke: s, fill: c, x: a, y: i, width: o, height: u });
  } }, { key: "renderPanorama", value: function() {
    var n = this.props, a = n.x, i = n.y, o = n.width, u = n.height, c = n.data, s = n.children, l = n.padding, f = D.Children.only(s);
    return f ? P.cloneElement(f, { x: a, y: i, width: o, height: u, margin: l, compact: true, data: c }) : null;
  } }, { key: "renderTravellerLayer", value: function(n, a) {
    var i, o, u = this, c = this.props, s = c.y, l = c.travellerWidth, f = c.height, p = c.traveller, v = c.ariaLabel, m = c.data, h = c.startIndex, d = c.endIndex, b = Math.max(n, this.props.x), g = nc(nc({}, G(this.props, false)), {}, { x: b, y: s, width: l, height: f }), x = v || "Min value: ".concat((i = m[h]) === null || i === void 0 ? void 0 : i.name, ", Max value: ").concat((o = m[d]) === null || o === void 0 ? void 0 : o.name);
    return P.createElement(J, { tabIndex: 0, role: "slider", "aria-label": x, "aria-valuenow": n, className: "recharts-brush-traveller", onMouseEnter: this.handleEnterSlideOrTraveller, onMouseLeave: this.handleLeaveSlideOrTraveller, onMouseDown: this.travellerDragStartHandlers[a], onTouchStart: this.travellerDragStartHandlers[a], onKeyDown: function(y) {
      ["ArrowLeft", "ArrowRight"].includes(y.key) && (y.preventDefault(), y.stopPropagation(), u.handleTravellerMoveKeyboard(y.key === "ArrowRight" ? 1 : -1, a));
    }, onFocus: function() {
      u.setState({ isTravellerFocused: true });
    }, onBlur: function() {
      u.setState({ isTravellerFocused: false });
    }, style: { cursor: "col-resize" } }, e.renderTraveller(p, g));
  } }, { key: "renderSlide", value: function(n, a) {
    var i = this.props, o = i.y, u = i.height, c = i.stroke, s = i.travellerWidth, l = Math.min(n, a) + s, f = Math.max(Math.abs(a - n) - s, 0);
    return P.createElement("rect", { className: "recharts-brush-slide", onMouseEnter: this.handleEnterSlideOrTraveller, onMouseLeave: this.handleLeaveSlideOrTraveller, onMouseDown: this.handleSlideDragStart, onTouchStart: this.handleSlideDragStart, style: { cursor: "move" }, stroke: "none", fill: c, fillOpacity: 0.2, x: l, y: o, width: f, height: u });
  } }, { key: "renderText", value: function() {
    var n = this.props, a = n.startIndex, i = n.endIndex, o = n.y, u = n.height, c = n.travellerWidth, s = n.stroke, l = this.state, f = l.startX, p = l.endX, v = 5, m = { pointerEvents: "none", fill: s };
    return P.createElement(J, { className: "recharts-brush-texts" }, P.createElement(vt, Bn({ textAnchor: "end", verticalAnchor: "middle", x: Math.min(f, p) - v, y: o + u / 2 }, m), this.getTextOfTick(a)), P.createElement(vt, Bn({ textAnchor: "start", verticalAnchor: "middle", x: Math.max(f, p) + c + v, y: o + u / 2 }, m), this.getTextOfTick(i)));
  } }, { key: "render", value: function() {
    var n = this.props, a = n.data, i = n.className, o = n.children, u = n.x, c = n.y, s = n.width, l = n.height, f = n.alwaysShowText, p = this.state, v = p.startX, m = p.endX, h = p.isTextActive, d = p.isSlideMoving, b = p.isTravellerMoving, g = p.isTravellerFocused;
    if (!a || !a.length || !N(u) || !N(c) || !N(s) || !N(l) || s <= 0 || l <= 0) return null;
    var x = V("recharts-brush", i), w = P.Children.count(o) === 1, y = IE("userSelect", "none");
    return P.createElement(J, { className: x, onMouseLeave: this.handleLeaveWrapper, onTouchMove: this.handleTouchMove, style: y }, this.renderBackground(), w && this.renderPanorama(), this.renderSlide(v, m), this.renderTravellerLayer(v, "startX"), this.renderTravellerLayer(m, "endX"), (h || d || b || g || f) && this.renderText());
  } }], [{ key: "renderDefaultTraveller", value: function(n) {
    var a = n.x, i = n.y, o = n.width, u = n.height, c = n.stroke, s = Math.floor(i + u / 2) - 1;
    return P.createElement(P.Fragment, null, P.createElement("rect", { x: a, y: i, width: o, height: u, fill: c, stroke: "none" }), P.createElement("line", { x1: a + 1, y1: s, x2: a + o - 1, y2: s, fill: "none", stroke: "#fff" }), P.createElement("line", { x1: a + 1, y1: s + 2, x2: a + o - 1, y2: s + 2, fill: "none", stroke: "#fff" }));
  } }, { key: "renderTraveller", value: function(n, a) {
    var i;
    return P.isValidElement(n) ? i = P.cloneElement(n, a) : U(n) ? i = n(a) : i = e.renderDefaultTraveller(a), i;
  } }, { key: "getDerivedStateFromProps", value: function(n, a) {
    var i = n.data, o = n.width, u = n.x, c = n.travellerWidth, s = n.updateId, l = n.startIndex, f = n.endIndex;
    if (i !== a.prevData || s !== a.prevUpdateId) return nc({ prevData: i, prevTravellerWidth: c, prevUpdateId: s, prevX: u, prevWidth: o }, i && i.length ? qE({ data: i, width: o, x: u, travellerWidth: c, startIndex: l, endIndex: f }) : { scale: null, scaleValues: null });
    if (a.scale && (o !== a.prevWidth || u !== a.prevX || c !== a.prevTravellerWidth)) {
      a.scale.range([u, u + o - c]);
      var p = a.scale.domain().map(function(v) {
        return a.scale(v);
      });
      return { prevData: i, prevTravellerWidth: c, prevUpdateId: s, prevX: u, prevWidth: o, startX: a.scale(n.startIndex), endX: a.scale(n.endIndex), scaleValues: p };
    }
    return null;
  } }, { key: "getIndexInRange", value: function(n, a) {
    for (var i = n.length, o = 0, u = i - 1; u - o > 1; ) {
      var c = Math.floor((o + u) / 2);
      n[c] > a ? u = c : o = c;
    }
    return a >= n[u] ? u : o;
  } }]);
})(D.PureComponent);
we(Wt, "displayName", "Brush");
we(Wt, "defaultProps", { height: 40, travellerWidth: 5, gap: 1, fill: "#fff", stroke: "#666", padding: { top: 1, right: 1, bottom: 1, left: 1 }, leaveTimeOut: 1e3, alwaysShowText: false });
var ac, Ph;
function BE() {
  if (Ph) return ac;
  Ph = 1;
  var t5 = Us();
  function e(r, n) {
    var a;
    return t5(r, function(i, o, u) {
      return a = n(i, o, u), !a;
    }), !!a;
  }
  return ac = e, ac;
}
var ic, _h;
function LE() {
  if (_h) return ic;
  _h = 1;
  var t5 = Ay(), e = qe(), r = BE(), n = xe(), a = ia();
  function i(o, u, c) {
    var s = n(o) ? t5 : r;
    return c && a(o, u, c) && (u = void 0), s(o, e(u, 3));
  }
  return ic = i, ic;
}
var FE = LE();
const WE = te(FE);
var ke = function(e, r) {
  var n = e.alwaysShow, a = e.ifOverflow;
  return n && (a = "extendDomain"), a === r;
}, oc, Eh;
function zE() {
  if (Eh) return oc;
  Eh = 1;
  var t5 = Fy();
  function e(r, n, a) {
    n == "__proto__" && t5 ? t5(r, n, { configurable: true, enumerable: true, value: a, writable: true }) : r[n] = a;
  }
  return oc = e, oc;
}
var uc, jh;
function KE() {
  if (jh) return uc;
  jh = 1;
  var t5 = zE(), e = By(), r = qe();
  function n(a, i) {
    var o = {};
    return i = r(i, 3), e(a, function(u, c, s) {
      t5(o, c, i(u, c, s));
    }), o;
  }
  return uc = n, uc;
}
var GE = KE();
const HE = te(GE);
var cc, Th;
function UE() {
  if (Th) return cc;
  Th = 1;
  function t5(e, r) {
    for (var n = -1, a = e == null ? 0 : e.length; ++n < a; ) if (!r(e[n], n, e)) return false;
    return true;
  }
  return cc = t5, cc;
}
var sc, Ih;
function VE() {
  if (Ih) return sc;
  Ih = 1;
  var t5 = Us();
  function e(r, n) {
    var a = true;
    return t5(r, function(i, o, u) {
      return a = !!n(i, o, u), a;
    }), a;
  }
  return sc = e, sc;
}
var lc, $h;
function XE() {
  if ($h) return lc;
  $h = 1;
  var t5 = UE(), e = VE(), r = qe(), n = xe(), a = ia();
  function i(o, u, c) {
    var s = n(o) ? t5 : e;
    return c && a(o, u, c) && (u = void 0), s(o, r(u, 3));
  }
  return lc = i, lc;
}
var YE = XE();
const ZE = te(YE);
var JE = ["x", "y"];
function Vr(t5) {
  "@babel/helpers - typeof";
  return Vr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Vr(t5);
}
function ds() {
  return ds = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, ds.apply(this, arguments);
}
function Ch(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function dr(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ch(Object(r), true).forEach(function(n) {
      QE(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Ch(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function QE(t5, e, r) {
  return e = ej(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function ej(t5) {
  var e = tj(t5, "string");
  return Vr(e) == "symbol" ? e : e + "";
}
function tj(t5, e) {
  if (Vr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Vr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
function rj(t5, e) {
  if (t5 == null) return {};
  var r = nj(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function nj(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
function aj(t5, e) {
  var r = t5.x, n = t5.y, a = rj(t5, JE), i = "".concat(r), o = parseInt(i, 10), u = "".concat(n), c = parseInt(u, 10), s = "".concat(e.height || a.height), l = parseInt(s, 10), f = "".concat(e.width || a.width), p = parseInt(f, 10);
  return dr(dr(dr(dr(dr({}, e), a), o ? { x: o } : {}), c ? { y: c } : {}), {}, { height: l, width: p, name: e.name, radius: e.radius });
}
function Rh(t5) {
  return P.createElement(Lm, ds({ shapeType: "rectangle", propTransformer: aj, activeClassName: "recharts-active-bar" }, t5));
}
var ij = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return function(n, a) {
    if (typeof e == "number") return e;
    var i = N(n) || yO(n);
    return i ? e(n, a) : (i || yt(), r);
  };
}, oj = ["value", "background"], Um;
function zt(t5) {
  "@babel/helpers - typeof";
  return zt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, zt(t5);
}
function uj(t5, e) {
  if (t5 == null) return {};
  var r = cj(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function cj(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
function Fn() {
  return Fn = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Fn.apply(this, arguments);
}
function Mh(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ce(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Mh(Object(r), true).forEach(function(n) {
      Ye(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Mh(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function sj(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function kh(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, Xm(n.key), n);
  }
}
function lj(t5, e, r) {
  return e && kh(t5.prototype, e), r && kh(t5, r), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function fj(t5, e, r) {
  return e = Wn(e), pj(t5, Vm() ? Reflect.construct(e, r || [], Wn(t5).constructor) : e.apply(t5, r));
}
function pj(t5, e) {
  if (e && (zt(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return dj(t5);
}
function dj(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function Vm() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Vm = function() {
    return !!t5;
  })();
}
function Wn(t5) {
  return Wn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Wn(t5);
}
function vj(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && vs(t5, e);
}
function vs(t5, e) {
  return vs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, vs(t5, e);
}
function Ye(t5, e, r) {
  return e = Xm(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Xm(t5) {
  var e = hj(t5, "string");
  return zt(e) == "symbol" ? e : e + "";
}
function hj(t5, e) {
  if (zt(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (zt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
var ar = (function(t5) {
  function e() {
    var r;
    sj(this, e);
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++) a[i] = arguments[i];
    return r = fj(this, e, [].concat(a)), Ye(r, "state", { isAnimationFinished: false }), Ye(r, "id", tn("recharts-bar-")), Ye(r, "handleAnimationEnd", function() {
      var o = r.props.onAnimationEnd;
      r.setState({ isAnimationFinished: true }), o && o();
    }), Ye(r, "handleAnimationStart", function() {
      var o = r.props.onAnimationStart;
      r.setState({ isAnimationFinished: false }), o && o();
    }), r;
  }
  return vj(e, t5), lj(e, [{ key: "renderRectanglesStatically", value: function(n) {
    var a = this, i = this.props, o = i.shape, u = i.dataKey, c = i.activeIndex, s = i.activeBar, l = G(this.props, false);
    return n && n.map(function(f, p) {
      var v = p === c, m = v ? s : o, h = ce(ce(ce({}, l), f), {}, { isActive: v, option: m, index: p, dataKey: u, onAnimationStart: a.handleAnimationStart, onAnimationEnd: a.handleAnimationEnd });
      return P.createElement(J, Fn({ className: "recharts-bar-rectangle" }, dt(a.props, f, p), { key: "rectangle-".concat(f == null ? void 0 : f.x, "-").concat(f == null ? void 0 : f.y, "-").concat(f == null ? void 0 : f.value, "-").concat(p) }), P.createElement(Rh, h));
    });
  } }, { key: "renderRectanglesWithAnimation", value: function() {
    var n = this, a = this.props, i = a.data, o = a.layout, u = a.isAnimationActive, c = a.animationBegin, s = a.animationDuration, l = a.animationEasing, f = a.animationId, p = this.state.prevData;
    return P.createElement(Ge, { begin: c, duration: s, isActive: u, easing: l, from: { t: 0 }, to: { t: 1 }, key: "bar-".concat(f), onAnimationEnd: this.handleAnimationEnd, onAnimationStart: this.handleAnimationStart }, function(v) {
      var m = v.t, h = i.map(function(d, b) {
        var g = p && p[b];
        if (g) {
          var x = Ve(g.x, d.x), w = Ve(g.y, d.y), y = Ve(g.width, d.width), O = Ve(g.height, d.height);
          return ce(ce({}, d), {}, { x: x(m), y: w(m), width: y(m), height: O(m) });
        }
        if (o === "horizontal") {
          var A = Ve(0, d.height), S = A(m);
          return ce(ce({}, d), {}, { y: d.y + d.height - S, height: S });
        }
        var _ = Ve(0, d.width), T = _(m);
        return ce(ce({}, d), {}, { width: T });
      });
      return P.createElement(J, null, n.renderRectanglesStatically(h));
    });
  } }, { key: "renderRectangles", value: function() {
    var n = this.props, a = n.data, i = n.isAnimationActive, o = this.state.prevData;
    return i && a && a.length && (!o || !sa(o, a)) ? this.renderRectanglesWithAnimation() : this.renderRectanglesStatically(a);
  } }, { key: "renderBackground", value: function() {
    var n = this, a = this.props, i = a.data, o = a.dataKey, u = a.activeIndex, c = G(this.props.background, false);
    return i.map(function(s, l) {
      s.value;
      var f = s.background, p = uj(s, oj);
      if (!f) return null;
      var v = ce(ce(ce(ce(ce({}, p), {}, { fill: "#eee" }, f), c), dt(n.props, s, l)), {}, { onAnimationStart: n.handleAnimationStart, onAnimationEnd: n.handleAnimationEnd, dataKey: o, index: l, className: "recharts-bar-background-rectangle" });
      return P.createElement(Rh, Fn({ key: "background-bar-".concat(l), option: n.props.background, isActive: l === u }, v));
    });
  } }, { key: "renderErrorBar", value: function(n, a) {
    if (this.props.isAnimationActive && !this.state.isAnimationFinished) return null;
    var i = this.props, o = i.data, u = i.xAxis, c = i.yAxis, s = i.layout, l = i.children, f = Te(l, pa);
    if (!f) return null;
    var p = s === "vertical" ? o[0].height / 2 : o[0].width / 2, v = function(d, b) {
      var g = Array.isArray(d.value) ? d.value[1] : d.value;
      return { x: d.x, y: d.y, value: g, errorVal: ge(d, b) };
    }, m = { clipPath: n ? "url(#clipPath-".concat(a, ")") : null };
    return P.createElement(J, m, f.map(function(h) {
      return P.cloneElement(h, { key: "error-bar-".concat(a, "-").concat(h.props.dataKey), data: o, xAxis: u, yAxis: c, layout: s, offset: p, dataPointFormatter: v });
    }));
  } }, { key: "render", value: function() {
    var n = this.props, a = n.hide, i = n.data, o = n.className, u = n.xAxis, c = n.yAxis, s = n.left, l = n.top, f = n.width, p = n.height, v = n.isAnimationActive, m = n.background, h = n.id;
    if (a || !i || !i.length) return null;
    var d = this.state.isAnimationFinished, b = V("recharts-bar", o), g = u && u.allowDataOverflow, x = c && c.allowDataOverflow, w = g || x, y = X(h) ? this.id : h;
    return P.createElement(J, { className: b }, g || x ? P.createElement("defs", null, P.createElement("clipPath", { id: "clipPath-".concat(y) }, P.createElement("rect", { x: g ? s : s - f / 2, y: x ? l : l - p / 2, width: g ? f : f * 2, height: x ? p : p * 2 }))) : null, P.createElement(J, { className: "recharts-bar-rectangles", clipPath: w ? "url(#clipPath-".concat(y, ")") : null }, m ? this.renderBackground() : null, this.renderRectangles()), this.renderErrorBar(w, y), (!v || d) && Ze.renderCallByParent(this.props, i));
  } }], [{ key: "getDerivedStateFromProps", value: function(n, a) {
    return n.animationId !== a.prevAnimationId ? { prevAnimationId: n.animationId, curData: n.data, prevData: a.curData } : n.data !== a.curData ? { curData: n.data } : null;
  } }]);
})(D.PureComponent);
Um = ar;
Ye(ar, "displayName", "Bar");
Ye(ar, "defaultProps", { xAxisId: 0, yAxisId: 0, legendType: "rect", minPointSize: 0, hide: false, data: [], layout: "vertical", activeBar: false, isAnimationActive: !tr.isSsr, animationBegin: 0, animationDuration: 400, animationEasing: "ease" });
Ye(ar, "getComposedData", function(t5) {
  var e = t5.props, r = t5.item, n = t5.barPosition, a = t5.bandSize, i = t5.xAxis, o = t5.yAxis, u = t5.xAxisTicks, c = t5.yAxisTicks, s = t5.stackedData, l = t5.dataStartIndex, f = t5.displayedData, p = t5.offset, v = SS(n, r);
  if (!v) return null;
  var m = e.layout, h = r.type.defaultProps, d = h !== void 0 ? ce(ce({}, h), r.props) : r.props, b = d.dataKey, g = d.children, x = d.minPointSize, w = m === "horizontal" ? o : i, y = s ? w.scale.domain() : null, O = $S({ numericAxis: w }), A = Te(g, Ys), S = f.map(function(_, T) {
    var E, j, I, R, C, M;
    s ? E = PS(s[l + T], y) : (E = ge(_, b), Array.isArray(E) || (E = [O, E]));
    var k = ij(x, Um.defaultProps.minPointSize)(E[1], T);
    if (m === "horizontal") {
      var q, F = [o.scale(E[0]), o.scale(E[1])], W = F[0], K = F[1];
      j = vv({ axis: i, ticks: u, bandSize: a, offset: v.offset, entry: _, index: T }), I = (q = K ?? W) !== null && q !== void 0 ? q : void 0, R = v.size;
      var B = W - K;
      if (C = Number.isNaN(B) ? 0 : B, M = { x: j, y: o.y, width: R, height: o.height }, Math.abs(k) > 0 && Math.abs(C) < Math.abs(k)) {
        var H = be(C || k) * (Math.abs(k) - Math.abs(C));
        I -= H, C += H;
      }
    } else {
      var oe = [i.scale(E[0]), i.scale(E[1])], de = oe[0], $e = oe[1];
      if (j = de, I = vv({ axis: o, ticks: c, bandSize: a, offset: v.offset, entry: _, index: T }), R = $e - de, C = v.size, M = { x: i.x, y: I, width: i.width, height: C }, Math.abs(k) > 0 && Math.abs(R) < Math.abs(k)) {
        var ir = be(R || k) * (Math.abs(k) - Math.abs(R));
        R += ir;
      }
    }
    return ce(ce(ce({}, _), {}, { x: j, y: I, width: R, height: C, value: s ? E : E[1], payload: _, background: M }, A && A[T] && A[T].props), {}, { tooltipPayload: [Am(r, _)], tooltipPosition: { x: j + R / 2, y: I + C / 2 } });
  });
  return ce({ data: S, layout: m }, p);
});
function Xr(t5) {
  "@babel/helpers - typeof";
  return Xr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Xr(t5);
}
function yj(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function Dh(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, Ym(n.key), n);
  }
}
function mj(t5, e, r) {
  return e && Dh(t5.prototype, e), r && Dh(t5, r), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function Nh(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Re(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Nh(Object(r), true).forEach(function(n) {
      ba(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Nh(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function ba(t5, e, r) {
  return e = Ym(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Ym(t5) {
  var e = gj(t5, "string");
  return Xr(e) == "symbol" ? e : e + "";
}
function gj(t5, e) {
  if (Xr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Xr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
var bj = function(e, r, n, a, i) {
  var o = e.width, u = e.height, c = e.layout, s = e.children, l = Object.keys(r), f = { left: n.left, leftMirror: n.left, right: o - n.right, rightMirror: o - n.right, top: n.top, topMirror: n.top, bottom: u - n.bottom, bottomMirror: u - n.bottom }, p = !!Ae(s, ar);
  return l.reduce(function(v, m) {
    var h = r[m], d = h.orientation, b = h.domain, g = h.padding, x = g === void 0 ? {} : g, w = h.mirror, y = h.reversed, O = "".concat(d).concat(w ? "Mirror" : ""), A, S, _, T, E;
    if (h.type === "number" && (h.padding === "gap" || h.padding === "no-gap")) {
      var j = b[1] - b[0], I = 1 / 0, R = h.categoricalDomain.sort(bO);
      if (R.forEach(function(oe, de) {
        de > 0 && (I = Math.min((oe || 0) - (R[de - 1] || 0), I));
      }), Number.isFinite(I)) {
        var C = I / j, M = h.layout === "vertical" ? n.height : n.width;
        if (h.padding === "gap" && (A = C * M / 2), h.padding === "no-gap") {
          var k = Oe(e.barCategoryGap, C * M), q = C * M / 2;
          A = q - k - (q - k) / M * k;
        }
      }
    }
    a === "xAxis" ? S = [n.left + (x.left || 0) + (A || 0), n.left + n.width - (x.right || 0) - (A || 0)] : a === "yAxis" ? S = c === "horizontal" ? [n.top + n.height - (x.bottom || 0), n.top + (x.top || 0)] : [n.top + (x.top || 0) + (A || 0), n.top + n.height - (x.bottom || 0) - (A || 0)] : S = h.range, y && (S = [S[1], S[0]]);
    var F = bm(h, i, p), W = F.scale, K = F.realScaleType;
    W.domain(b).range(S), Om(W);
    var B = xm(W, Re(Re({}, h), {}, { realScaleType: K }));
    a === "xAxis" ? (E = d === "top" && !w || d === "bottom" && w, _ = n.left, T = f[O] - E * h.height) : a === "yAxis" && (E = d === "left" && !w || d === "right" && w, _ = f[O] - E * h.width, T = n.top);
    var H = Re(Re(Re({}, h), B), {}, { realScaleType: K, x: _, y: T, scale: W, width: a === "xAxis" ? n.width : h.width, height: a === "yAxis" ? n.height : h.height });
    return H.bandSize = _n(H, B), !h.hide && a === "xAxis" ? f[O] += (E ? -1 : 1) * H.height : h.hide || (f[O] += (E ? -1 : 1) * H.width), Re(Re({}, v), {}, ba({}, m, H));
  }, {});
}, Zm = function(e, r) {
  var n = e.x, a = e.y, i = r.x, o = r.y;
  return { x: Math.min(n, i), y: Math.min(a, o), width: Math.abs(i - n), height: Math.abs(o - a) };
}, Oj = function(e) {
  var r = e.x1, n = e.y1, a = e.x2, i = e.y2;
  return Zm({ x: r, y: n }, { x: a, y: i });
}, Jm = (function() {
  function t5(e) {
    yj(this, t5), this.scale = e;
  }
  return mj(t5, [{ key: "domain", get: function() {
    return this.scale.domain;
  } }, { key: "range", get: function() {
    return this.scale.range;
  } }, { key: "rangeMin", get: function() {
    return this.range()[0];
  } }, { key: "rangeMax", get: function() {
    return this.range()[1];
  } }, { key: "bandwidth", get: function() {
    return this.scale.bandwidth;
  } }, { key: "apply", value: function(r) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = n.bandAware, i = n.position;
    if (r !== void 0) {
      if (i) switch (i) {
        case "start":
          return this.scale(r);
        case "middle": {
          var o = this.bandwidth ? this.bandwidth() / 2 : 0;
          return this.scale(r) + o;
        }
        case "end": {
          var u = this.bandwidth ? this.bandwidth() : 0;
          return this.scale(r) + u;
        }
        default:
          return this.scale(r);
      }
      if (a) {
        var c = this.bandwidth ? this.bandwidth() / 2 : 0;
        return this.scale(r) + c;
      }
      return this.scale(r);
    }
  } }, { key: "isInRange", value: function(r) {
    var n = this.range(), a = n[0], i = n[n.length - 1];
    return a <= i ? r >= a && r <= i : r >= i && r <= a;
  } }], [{ key: "create", value: function(r) {
    return new t5(r);
  } }]);
})();
ba(Jm, "EPS", 1e-4);
var rl = function(e) {
  var r = Object.keys(e).reduce(function(n, a) {
    return Re(Re({}, n), {}, ba({}, a, Jm.create(e[a])));
  }, {});
  return Re(Re({}, r), {}, { apply: function(a) {
    var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = i.bandAware, u = i.position;
    return HE(a, function(c, s) {
      return r[s].apply(c, { bandAware: o, position: u });
    });
  }, isInRange: function(a) {
    return ZE(a, function(i, o) {
      return r[o].isInRange(i);
    });
  } });
};
function xj(t5) {
  return (t5 % 180 + 180) % 180;
}
var wj = function(e) {
  var r = e.width, n = e.height, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, i = xj(a), o = i * Math.PI / 180, u = Math.atan(n / r), c = o > u && o < Math.PI - u ? n / Math.sin(o) : r / Math.cos(o);
  return Math.abs(c);
}, fc, qh;
function Aj() {
  if (qh) return fc;
  qh = 1;
  var t5 = qe(), e = rn(), r = na();
  function n(a) {
    return function(i, o, u) {
      var c = Object(i);
      if (!e(i)) {
        var s = t5(o, 3);
        i = r(i), o = function(f) {
          return s(c[f], f, c);
        };
      }
      var l = a(i, o, u);
      return l > -1 ? c[s ? i[l] : l] : void 0;
    };
  }
  return fc = n, fc;
}
var pc, Bh;
function Sj() {
  if (Bh) return pc;
  Bh = 1;
  var t5 = zm();
  function e(r) {
    var n = t5(r), a = n % 1;
    return n === n ? a ? n - a : n : 0;
  }
  return pc = e, pc;
}
var dc, Lh;
function Pj() {
  if (Lh) return dc;
  Lh = 1;
  var t5 = My(), e = qe(), r = Sj(), n = Math.max;
  function a(i, o, u) {
    var c = i == null ? 0 : i.length;
    if (!c) return -1;
    var s = u == null ? 0 : r(u);
    return s < 0 && (s = n(c + s, 0)), t5(i, e(o, 3), s);
  }
  return dc = a, dc;
}
var vc, Fh;
function _j() {
  if (Fh) return vc;
  Fh = 1;
  var t5 = Aj(), e = Pj(), r = t5(e);
  return vc = r, vc;
}
_j();
var Ej = py();
const jj = te(Ej);
var Tj = jj(function(t5) {
  return { x: t5.left, y: t5.top, width: t5.width, height: t5.height };
}, function(t5) {
  return ["l", t5.left, "t", t5.top, "w", t5.width, "h", t5.height].join("");
}), Qm = D.createContext(void 0), eg = D.createContext(void 0), tg = D.createContext(void 0), Ij = D.createContext({}), rg = D.createContext(void 0), ng = D.createContext(0), ag = D.createContext(0), Wh = function(e) {
  var r = e.state, n = r.xAxisMap, a = r.yAxisMap, i = r.offset, o = e.clipPathId, u = e.children, c = e.width, s = e.height, l = Tj(i);
  return P.createElement(Qm.Provider, { value: n }, P.createElement(eg.Provider, { value: a }, P.createElement(Ij.Provider, { value: i }, P.createElement(tg.Provider, { value: l }, P.createElement(rg.Provider, { value: o }, P.createElement(ng.Provider, { value: s }, P.createElement(ag.Provider, { value: c }, u)))))));
}, $j = function() {
  return D.useContext(rg);
}, ig = function(e) {
  var r = D.useContext(Qm);
  r == null && yt();
  var n = r[e];
  return n == null && yt(), n;
}, og = function(e) {
  var r = D.useContext(eg);
  r == null && yt();
  var n = r[e];
  return n == null && yt(), n;
}, Cj = function() {
  var e = D.useContext(tg);
  return e;
}, ug = function() {
  return D.useContext(ag);
}, cg = function() {
  return D.useContext(ng);
};
function Kt(t5) {
  "@babel/helpers - typeof";
  return Kt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Kt(t5);
}
function Rj(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function Mj(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, lg(n.key), n);
  }
}
function kj(t5, e, r) {
  return e && Mj(t5.prototype, e), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function Dj(t5, e, r) {
  return e = zn(e), Nj(t5, sg() ? Reflect.construct(e, r || [], zn(t5).constructor) : e.apply(t5, r));
}
function Nj(t5, e) {
  if (e && (Kt(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return qj(t5);
}
function qj(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function sg() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (sg = function() {
    return !!t5;
  })();
}
function zn(t5) {
  return zn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, zn(t5);
}
function Bj(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && hs(t5, e);
}
function hs(t5, e) {
  return hs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, hs(t5, e);
}
function zh(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Kh(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? zh(Object(r), true).forEach(function(n) {
      nl(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : zh(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function nl(t5, e, r) {
  return e = lg(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function lg(t5) {
  var e = Lj(t5, "string");
  return Kt(e) == "symbol" ? e : e + "";
}
function Lj(t5, e) {
  if (Kt(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Kt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
function Fj(t5, e) {
  return Gj(t5) || Kj(t5, e) || zj(t5, e) || Wj();
}
function Wj() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zj(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return Gh(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Gh(t5, e);
  }
}
function Gh(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function Kj(t5, e) {
  var r = t5 == null ? null : typeof Symbol < "u" && t5[Symbol.iterator] || t5["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = true, s = false;
    try {
      if (i = (r = r.call(t5)).next, e !== 0) for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); c = true) ;
    } catch (l) {
      s = true, a = l;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw a;
      }
    }
    return u;
  }
}
function Gj(t5) {
  if (Array.isArray(t5)) return t5;
}
function ys() {
  return ys = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, ys.apply(this, arguments);
}
var Hj = function(e, r) {
  var n;
  return P.isValidElement(e) ? n = P.cloneElement(e, r) : U(e) ? n = e(r) : n = P.createElement("line", ys({}, r, { className: "recharts-reference-line-line" })), n;
}, Uj = function(e, r, n, a, i, o, u, c, s) {
  var l = i.x, f = i.y, p = i.width, v = i.height;
  if (n) {
    var m = s.y, h = e.y.apply(m, { position: o });
    if (ke(s, "discard") && !e.y.isInRange(h)) return null;
    var d = [{ x: l + p, y: h }, { x: l, y: h }];
    return c === "left" ? d.reverse() : d;
  }
  if (r) {
    var b = s.x, g = e.x.apply(b, { position: o });
    if (ke(s, "discard") && !e.x.isInRange(g)) return null;
    var x = [{ x: g, y: f + v }, { x: g, y: f }];
    return u === "top" ? x.reverse() : x;
  }
  if (a) {
    var w = s.segment, y = w.map(function(O) {
      return e.apply(O, { position: o });
    });
    return ke(s, "discard") && WE(y, function(O) {
      return !e.isInRange(O);
    }) ? null : y;
  }
  return null;
};
function Vj(t5) {
  var e = t5.x, r = t5.y, n = t5.segment, a = t5.xAxisId, i = t5.yAxisId, o = t5.shape, u = t5.className, c = t5.alwaysShow, s = $j(), l = ig(a), f = og(i), p = Cj();
  if (!s || !p) return null;
  ze(c === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var v = rl({ x: l.scale, y: f.scale }), m = pe(e), h = pe(r), d = n && n.length === 2, b = Uj(v, m, h, d, p, t5.position, l.orientation, f.orientation, t5);
  if (!b) return null;
  var g = Fj(b, 2), x = g[0], w = x.x, y = x.y, O = g[1], A = O.x, S = O.y, _ = ke(t5, "hidden") ? "url(#".concat(s, ")") : void 0, T = Kh(Kh({ clipPath: _ }, G(t5, true)), {}, { x1: w, y1: y, x2: A, y2: S });
  return P.createElement(J, { className: V("recharts-reference-line", u) }, Hj(o, T), he.renderCallByParent(t5, Oj({ x1: w, y1: y, x2: A, y2: S })));
}
var al = (function(t5) {
  function e() {
    return Rj(this, e), Dj(this, e, arguments);
  }
  return Bj(e, t5), kj(e, [{ key: "render", value: function() {
    return P.createElement(Vj, this.props);
  } }]);
})(P.Component);
nl(al, "displayName", "ReferenceLine");
nl(al, "defaultProps", { isFront: false, ifOverflow: "discard", xAxisId: 0, yAxisId: 0, fill: "none", stroke: "#ccc", fillOpacity: 1, strokeWidth: 1, position: "middle" });
function ms() {
  return ms = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, ms.apply(this, arguments);
}
function Gt(t5) {
  "@babel/helpers - typeof";
  return Gt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Gt(t5);
}
function Hh(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Uh(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Hh(Object(r), true).forEach(function(n) {
      Oa(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Hh(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function Xj(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function Yj(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, pg(n.key), n);
  }
}
function Zj(t5, e, r) {
  return e && Yj(t5.prototype, e), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function Jj(t5, e, r) {
  return e = Kn(e), Qj(t5, fg() ? Reflect.construct(e, r || [], Kn(t5).constructor) : e.apply(t5, r));
}
function Qj(t5, e) {
  if (e && (Gt(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return eT(t5);
}
function eT(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function fg() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (fg = function() {
    return !!t5;
  })();
}
function Kn(t5) {
  return Kn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Kn(t5);
}
function tT(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && gs(t5, e);
}
function gs(t5, e) {
  return gs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, gs(t5, e);
}
function Oa(t5, e, r) {
  return e = pg(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function pg(t5) {
  var e = rT(t5, "string");
  return Gt(e) == "symbol" ? e : e + "";
}
function rT(t5, e) {
  if (Gt(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Gt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
var nT = function(e) {
  var r = e.x, n = e.y, a = e.xAxis, i = e.yAxis, o = rl({ x: a.scale, y: i.scale }), u = o.apply({ x: r, y: n }, { bandAware: true });
  return ke(e, "discard") && !o.isInRange(u) ? null : u;
}, xa = (function(t5) {
  function e() {
    return Xj(this, e), Jj(this, e, arguments);
  }
  return tT(e, t5), Zj(e, [{ key: "render", value: function() {
    var n = this.props, a = n.x, i = n.y, o = n.r, u = n.alwaysShow, c = n.clipPathId, s = pe(a), l = pe(i);
    if (ze(u === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !s || !l) return null;
    var f = nT(this.props);
    if (!f) return null;
    var p = f.x, v = f.y, m = this.props, h = m.shape, d = m.className, b = ke(this.props, "hidden") ? "url(#".concat(c, ")") : void 0, g = Uh(Uh({ clipPath: b }, G(this.props, true)), {}, { cx: p, cy: v });
    return P.createElement(J, { className: V("recharts-reference-dot", d) }, e.renderDot(h, g), he.renderCallByParent(this.props, { x: p - o, y: v - o, width: 2 * o, height: 2 * o }));
  } }]);
})(P.Component);
Oa(xa, "displayName", "ReferenceDot");
Oa(xa, "defaultProps", { isFront: false, ifOverflow: "discard", xAxisId: 0, yAxisId: 0, r: 10, fill: "#fff", stroke: "#ccc", fillOpacity: 1, strokeWidth: 1 });
Oa(xa, "renderDot", function(t5, e) {
  var r;
  return P.isValidElement(t5) ? r = P.cloneElement(t5, e) : U(t5) ? r = t5(e) : r = P.createElement(tl, ms({}, e, { cx: e.cx, cy: e.cy, className: "recharts-reference-dot-dot" })), r;
});
function bs() {
  return bs = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, bs.apply(this, arguments);
}
function Ht(t5) {
  "@babel/helpers - typeof";
  return Ht = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ht(t5);
}
function Vh(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Xh(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Vh(Object(r), true).forEach(function(n) {
      wa(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Vh(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function aT(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function iT(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, vg(n.key), n);
  }
}
function oT(t5, e, r) {
  return e && iT(t5.prototype, e), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function uT(t5, e, r) {
  return e = Gn(e), cT(t5, dg() ? Reflect.construct(e, r || [], Gn(t5).constructor) : e.apply(t5, r));
}
function cT(t5, e) {
  if (e && (Ht(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return sT(t5);
}
function sT(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function dg() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (dg = function() {
    return !!t5;
  })();
}
function Gn(t5) {
  return Gn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Gn(t5);
}
function lT(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && Os(t5, e);
}
function Os(t5, e) {
  return Os = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Os(t5, e);
}
function wa(t5, e, r) {
  return e = vg(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function vg(t5) {
  var e = fT(t5, "string");
  return Ht(e) == "symbol" ? e : e + "";
}
function fT(t5, e) {
  if (Ht(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Ht(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
var pT = function(e, r, n, a, i) {
  var o = i.x1, u = i.x2, c = i.y1, s = i.y2, l = i.xAxis, f = i.yAxis;
  if (!l || !f) return null;
  var p = rl({ x: l.scale, y: f.scale }), v = { x: e ? p.x.apply(o, { position: "start" }) : p.x.rangeMin, y: n ? p.y.apply(c, { position: "start" }) : p.y.rangeMin }, m = { x: r ? p.x.apply(u, { position: "end" }) : p.x.rangeMax, y: a ? p.y.apply(s, { position: "end" }) : p.y.rangeMax };
  return ke(i, "discard") && (!p.isInRange(v) || !p.isInRange(m)) ? null : Zm(v, m);
}, Aa = (function(t5) {
  function e() {
    return aT(this, e), uT(this, e, arguments);
  }
  return lT(e, t5), oT(e, [{ key: "render", value: function() {
    var n = this.props, a = n.x1, i = n.x2, o = n.y1, u = n.y2, c = n.className, s = n.alwaysShow, l = n.clipPathId;
    ze(s === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
    var f = pe(a), p = pe(i), v = pe(o), m = pe(u), h = this.props.shape;
    if (!f && !p && !v && !m && !h) return null;
    var d = pT(f, p, v, m, this.props);
    if (!d && !h) return null;
    var b = ke(this.props, "hidden") ? "url(#".concat(l, ")") : void 0;
    return P.createElement(J, { className: V("recharts-reference-area", c) }, e.renderRect(h, Xh(Xh({ clipPath: b }, G(this.props, true)), d)), he.renderCallByParent(this.props, d));
  } }]);
})(P.Component);
wa(Aa, "displayName", "ReferenceArea");
wa(Aa, "defaultProps", { isFront: false, ifOverflow: "discard", xAxisId: 0, yAxisId: 0, r: 10, fill: "#ccc", fillOpacity: 0.5, stroke: "none", strokeWidth: 1 });
wa(Aa, "renderRect", function(t5, e) {
  var r;
  return P.isValidElement(t5) ? r = P.cloneElement(t5, e) : U(t5) ? r = t5(e) : r = P.createElement(el, bs({}, e, { className: "recharts-reference-area-rect" })), r;
});
function hg(t5, e, r) {
  if (e < 1) return [];
  if (e === 1 && r === void 0) return t5;
  for (var n = [], a = 0; a < t5.length; a += e) n.push(t5[a]);
  return n;
}
function dT(t5, e, r) {
  var n = { width: t5.width + e.width, height: t5.height + e.height };
  return wj(n, r);
}
function vT(t5, e, r) {
  var n = r === "width", a = t5.x, i = t5.y, o = t5.width, u = t5.height;
  return e === 1 ? { start: n ? a : i, end: n ? a + o : i + u } : { start: n ? a + o : i + u, end: n ? a : i };
}
function Hn(t5, e, r, n, a) {
  if (t5 * e < t5 * n || t5 * e > t5 * a) return false;
  var i = r();
  return t5 * (e - t5 * i / 2 - n) >= 0 && t5 * (e + t5 * i / 2 - a) <= 0;
}
function hT(t5, e) {
  return hg(t5, e + 1);
}
function yT(t5, e, r, n, a) {
  for (var i = (n || []).slice(), o = e.start, u = e.end, c = 0, s = 1, l = o, f = function() {
    var m = n == null ? void 0 : n[c];
    if (m === void 0) return { v: hg(n, s) };
    var h = c, d, b = function() {
      return d === void 0 && (d = r(m, h)), d;
    }, g = m.coordinate, x = c === 0 || Hn(t5, g, b, l, u);
    x || (c = 0, l = o, s += 1), x && (l = g + t5 * (b() / 2 + a), c += s);
  }, p; s <= i.length; ) if (p = f(), p) return p.v;
  return [];
}
function Yr(t5) {
  "@babel/helpers - typeof";
  return Yr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Yr(t5);
}
function Yh(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function me(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Yh(Object(r), true).forEach(function(n) {
      mT(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Yh(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function mT(t5, e, r) {
  return e = gT(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function gT(t5) {
  var e = bT(t5, "string");
  return Yr(e) == "symbol" ? e : e + "";
}
function bT(t5, e) {
  if (Yr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Yr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
function OT(t5, e, r, n, a) {
  for (var i = (n || []).slice(), o = i.length, u = e.start, c = e.end, s = function(p) {
    var v = i[p], m, h = function() {
      return m === void 0 && (m = r(v, p)), m;
    };
    if (p === o - 1) {
      var d = t5 * (v.coordinate + t5 * h() / 2 - c);
      i[p] = v = me(me({}, v), {}, { tickCoord: d > 0 ? v.coordinate - d * t5 : v.coordinate });
    } else i[p] = v = me(me({}, v), {}, { tickCoord: v.coordinate });
    var b = Hn(t5, v.tickCoord, h, u, c);
    b && (c = v.tickCoord - t5 * (h() / 2 + a), i[p] = me(me({}, v), {}, { isShow: true }));
  }, l = o - 1; l >= 0; l--) s(l);
  return i;
}
function xT(t5, e, r, n, a, i) {
  var o = (n || []).slice(), u = o.length, c = e.start, s = e.end;
  if (i) {
    var l = n[u - 1], f = r(l, u - 1), p = t5 * (l.coordinate + t5 * f / 2 - s);
    o[u - 1] = l = me(me({}, l), {}, { tickCoord: p > 0 ? l.coordinate - p * t5 : l.coordinate });
    var v = Hn(t5, l.tickCoord, function() {
      return f;
    }, c, s);
    v && (s = l.tickCoord - t5 * (f / 2 + a), o[u - 1] = me(me({}, l), {}, { isShow: true }));
  }
  for (var m = i ? u - 1 : u, h = function(g) {
    var x = o[g], w, y = function() {
      return w === void 0 && (w = r(x, g)), w;
    };
    if (g === 0) {
      var O = t5 * (x.coordinate - t5 * y() / 2 - c);
      o[g] = x = me(me({}, x), {}, { tickCoord: O < 0 ? x.coordinate - O * t5 : x.coordinate });
    } else o[g] = x = me(me({}, x), {}, { tickCoord: x.coordinate });
    var A = Hn(t5, x.tickCoord, y, c, s);
    A && (c = x.tickCoord + t5 * (y() / 2 + a), o[g] = me(me({}, x), {}, { isShow: true }));
  }, d = 0; d < m; d++) h(d);
  return o;
}
function wT(t5, e, r) {
  var n = t5.tick, a = t5.ticks, i = t5.viewBox, o = t5.minTickGap, u = t5.orientation, c = t5.interval, s = t5.tickFormatter, l = t5.unit, f = t5.angle;
  if (!a || !a.length || !n) return [];
  if (N(c) || tr.isSsr) return hT(a, typeof c == "number" && N(c) ? c : 0);
  var p = [], v = u === "top" || u === "bottom" ? "width" : "height", m = l && v === "width" ? gr(l, { fontSize: e, letterSpacing: r }) : { width: 0, height: 0 }, h = function(x, w) {
    var y = U(s) ? s(x.value, w) : x.value;
    return v === "width" ? dT(gr(y, { fontSize: e, letterSpacing: r }), m, f) : gr(y, { fontSize: e, letterSpacing: r })[v];
  }, d = a.length >= 2 ? be(a[1].coordinate - a[0].coordinate) : 1, b = vT(i, d, v);
  return c === "equidistantPreserveStart" ? yT(d, b, h, a, o) : (c === "preserveStart" || c === "preserveStartEnd" ? p = xT(d, b, h, a, o, c === "preserveStartEnd") : p = OT(d, b, h, a, o), p.filter(function(g) {
    return g.isShow;
  }));
}
var AT = ["viewBox"], ST = ["viewBox"], PT = ["ticks"];
function Ut(t5) {
  "@babel/helpers - typeof";
  return Ut = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ut(t5);
}
function Et() {
  return Et = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Et.apply(this, arguments);
}
function Zh(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function le(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Zh(Object(r), true).forEach(function(n) {
      il(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : Zh(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function hc(t5, e) {
  if (t5 == null) return {};
  var r = _T(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function _T(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
function ET(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function Jh(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, mg(n.key), n);
  }
}
function jT(t5, e, r) {
  return e && Jh(t5.prototype, e), r && Jh(t5, r), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function TT(t5, e, r) {
  return e = Un(e), IT(t5, yg() ? Reflect.construct(e, r || [], Un(t5).constructor) : e.apply(t5, r));
}
function IT(t5, e) {
  if (e && (Ut(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return $T(t5);
}
function $T(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function yg() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (yg = function() {
    return !!t5;
  })();
}
function Un(t5) {
  return Un = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Un(t5);
}
function CT(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && xs(t5, e);
}
function xs(t5, e) {
  return xs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, xs(t5, e);
}
function il(t5, e, r) {
  return e = mg(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function mg(t5) {
  var e = RT(t5, "string");
  return Ut(e) == "symbol" ? e : e + "";
}
function RT(t5, e) {
  if (Ut(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Ut(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
var Sa = (function(t5) {
  function e(r) {
    var n;
    return ET(this, e), n = TT(this, e, [r]), n.state = { fontSize: "", letterSpacing: "" }, n;
  }
  return CT(e, t5), jT(e, [{ key: "shouldComponentUpdate", value: function(n, a) {
    var i = n.viewBox, o = hc(n, AT), u = this.props, c = u.viewBox, s = hc(u, ST);
    return !Tt(i, c) || !Tt(o, s) || !Tt(a, this.state);
  } }, { key: "componentDidMount", value: function() {
    var n = this.layerReference;
    if (n) {
      var a = n.getElementsByClassName("recharts-cartesian-axis-tick-value")[0];
      a && this.setState({ fontSize: window.getComputedStyle(a).fontSize, letterSpacing: window.getComputedStyle(a).letterSpacing });
    }
  } }, { key: "getTickLineCoord", value: function(n) {
    var a = this.props, i = a.x, o = a.y, u = a.width, c = a.height, s = a.orientation, l = a.tickSize, f = a.mirror, p = a.tickMargin, v, m, h, d, b, g, x = f ? -1 : 1, w = n.tickSize || l, y = N(n.tickCoord) ? n.tickCoord : n.coordinate;
    switch (s) {
      case "top":
        v = m = n.coordinate, d = o + +!f * c, h = d - x * w, g = h - x * p, b = y;
        break;
      case "left":
        h = d = n.coordinate, m = i + +!f * u, v = m - x * w, b = v - x * p, g = y;
        break;
      case "right":
        h = d = n.coordinate, m = i + +f * u, v = m + x * w, b = v + x * p, g = y;
        break;
      default:
        v = m = n.coordinate, d = o + +f * c, h = d + x * w, g = h + x * p, b = y;
        break;
    }
    return { line: { x1: v, y1: h, x2: m, y2: d }, tick: { x: b, y: g } };
  } }, { key: "getTickTextAnchor", value: function() {
    var n = this.props, a = n.orientation, i = n.mirror, o;
    switch (a) {
      case "left":
        o = i ? "start" : "end";
        break;
      case "right":
        o = i ? "end" : "start";
        break;
      default:
        o = "middle";
        break;
    }
    return o;
  } }, { key: "getTickVerticalAnchor", value: function() {
    var n = this.props, a = n.orientation, i = n.mirror, o = "end";
    switch (a) {
      case "left":
      case "right":
        o = "middle";
        break;
      case "top":
        o = i ? "start" : "end";
        break;
      default:
        o = i ? "end" : "start";
        break;
    }
    return o;
  } }, { key: "renderAxisLine", value: function() {
    var n = this.props, a = n.x, i = n.y, o = n.width, u = n.height, c = n.orientation, s = n.mirror, l = n.axisLine, f = le(le(le({}, G(this.props, false)), G(l, false)), {}, { fill: "none" });
    if (c === "top" || c === "bottom") {
      var p = +(c === "top" && !s || c === "bottom" && s);
      f = le(le({}, f), {}, { x1: a, y1: i + p * u, x2: a + o, y2: i + p * u });
    } else {
      var v = +(c === "left" && !s || c === "right" && s);
      f = le(le({}, f), {}, { x1: a + v * o, y1: i, x2: a + v * o, y2: i + u });
    }
    return P.createElement("line", Et({}, f, { className: V("recharts-cartesian-axis-line", Pe(l, "className")) }));
  } }, { key: "renderTicks", value: function(n, a, i) {
    var o = this, u = this.props, c = u.tickLine, s = u.stroke, l = u.tick, f = u.tickFormatter, p = u.unit, v = wT(le(le({}, this.props), {}, { ticks: n }), a, i), m = this.getTickTextAnchor(), h = this.getTickVerticalAnchor(), d = G(this.props, false), b = G(l, false), g = le(le({}, d), {}, { fill: "none" }, G(c, false)), x = v.map(function(w, y) {
      var O = o.getTickLineCoord(w), A = O.line, S = O.tick, _ = le(le(le(le({ textAnchor: m, verticalAnchor: h }, d), {}, { stroke: "none", fill: s }, b), S), {}, { index: y, payload: w, visibleTicksCount: v.length, tickFormatter: f });
      return P.createElement(J, Et({ className: "recharts-cartesian-axis-tick", key: "tick-".concat(w.value, "-").concat(w.coordinate, "-").concat(w.tickCoord) }, dt(o.props, w, y)), c && P.createElement("line", Et({}, g, A, { className: V("recharts-cartesian-axis-tick-line", Pe(c, "className")) })), l && e.renderTickItem(l, _, "".concat(U(f) ? f(w.value, y) : w.value).concat(p || "")));
    });
    return P.createElement("g", { className: "recharts-cartesian-axis-ticks" }, x);
  } }, { key: "render", value: function() {
    var n = this, a = this.props, i = a.axisLine, o = a.width, u = a.height, c = a.ticksGenerator, s = a.className, l = a.hide;
    if (l) return null;
    var f = this.props, p = f.ticks, v = hc(f, PT), m = p;
    return U(c) && (m = p && p.length > 0 ? c(this.props) : c(v)), o <= 0 || u <= 0 || !m || !m.length ? null : P.createElement(J, { className: V("recharts-cartesian-axis", s), ref: function(d) {
      n.layerReference = d;
    } }, i && this.renderAxisLine(), this.renderTicks(m, this.state.fontSize, this.state.letterSpacing), he.renderCallByParent(this.props));
  } }], [{ key: "renderTickItem", value: function(n, a, i) {
    var o, u = V(a.className, "recharts-cartesian-axis-tick-value");
    return P.isValidElement(n) ? o = P.cloneElement(n, le(le({}, a), {}, { className: u })) : U(n) ? o = n(le(le({}, a), {}, { className: u })) : o = P.createElement(vt, Et({}, a, { className: "recharts-cartesian-axis-tick-value" }), i), o;
  } }]);
})(D.Component);
il(Sa, "displayName", "CartesianAxis");
il(Sa, "defaultProps", { x: 0, y: 0, width: 0, height: 0, viewBox: { x: 0, y: 0, width: 0, height: 0 }, orientation: "bottom", ticks: [], stroke: "#666", tickLine: true, axisLine: true, tick: true, mirror: false, minTickGap: 5, tickSize: 6, tickMargin: 2, interval: "preserveEnd" });
function Vt(t5) {
  "@babel/helpers - typeof";
  return Vt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Vt(t5);
}
function MT(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function kT(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, Og(n.key), n);
  }
}
function DT(t5, e, r) {
  return e && kT(t5.prototype, e), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function NT(t5, e, r) {
  return e = Vn(e), qT(t5, gg() ? Reflect.construct(e, r || [], Vn(t5).constructor) : e.apply(t5, r));
}
function qT(t5, e) {
  if (e && (Vt(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return BT(t5);
}
function BT(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function gg() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (gg = function() {
    return !!t5;
  })();
}
function Vn(t5) {
  return Vn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Vn(t5);
}
function LT(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && ws(t5, e);
}
function ws(t5, e) {
  return ws = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ws(t5, e);
}
function bg(t5, e, r) {
  return e = Og(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Og(t5) {
  var e = FT(t5, "string");
  return Vt(e) == "symbol" ? e : e + "";
}
function FT(t5, e) {
  if (Vt(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Vt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
function As() {
  return As = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, As.apply(this, arguments);
}
function WT(t5) {
  var e = t5.xAxisId, r = ug(), n = cg(), a = ig(e);
  return a == null ? null : D.createElement(Sa, As({}, a, { className: V("recharts-".concat(a.axisType, " ").concat(a.axisType), a.className), viewBox: { x: 0, y: 0, width: r, height: n }, ticksGenerator: function(o) {
    return lt(o, true);
  } }));
}
var ol = (function(t5) {
  function e() {
    return MT(this, e), NT(this, e, arguments);
  }
  return LT(e, t5), DT(e, [{ key: "render", value: function() {
    return D.createElement(WT, this.props);
  } }]);
})(D.Component);
bg(ol, "displayName", "XAxis");
bg(ol, "defaultProps", { allowDecimals: true, hide: false, orientation: "bottom", width: 0, height: 30, mirror: false, xAxisId: 0, tickCount: 5, type: "category", padding: { left: 0, right: 0 }, allowDataOverflow: false, scale: "auto", reversed: false, allowDuplicatedCategory: true });
function Xt(t5) {
  "@babel/helpers - typeof";
  return Xt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Xt(t5);
}
function zT(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function KT(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, Ag(n.key), n);
  }
}
function GT(t5, e, r) {
  return e && KT(t5.prototype, e), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function HT(t5, e, r) {
  return e = Xn(e), UT(t5, xg() ? Reflect.construct(e, r || [], Xn(t5).constructor) : e.apply(t5, r));
}
function UT(t5, e) {
  if (e && (Xt(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return VT(t5);
}
function VT(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function xg() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (xg = function() {
    return !!t5;
  })();
}
function Xn(t5) {
  return Xn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Xn(t5);
}
function XT(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && Ss(t5, e);
}
function Ss(t5, e) {
  return Ss = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Ss(t5, e);
}
function wg(t5, e, r) {
  return e = Ag(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Ag(t5) {
  var e = YT(t5, "string");
  return Xt(e) == "symbol" ? e : e + "";
}
function YT(t5, e) {
  if (Xt(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Xt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
function Ps() {
  return Ps = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, Ps.apply(this, arguments);
}
var ZT = function(e) {
  var r = e.yAxisId, n = ug(), a = cg(), i = og(r);
  return i == null ? null : D.createElement(Sa, Ps({}, i, { className: V("recharts-".concat(i.axisType, " ").concat(i.axisType), i.className), viewBox: { x: 0, y: 0, width: n, height: a }, ticksGenerator: function(u) {
    return lt(u, true);
  } }));
}, ul = (function(t5) {
  function e() {
    return zT(this, e), HT(this, e, arguments);
  }
  return XT(e, t5), GT(e, [{ key: "render", value: function() {
    return D.createElement(ZT, this.props);
  } }]);
})(D.Component);
wg(ul, "displayName", "YAxis");
wg(ul, "defaultProps", { allowDuplicatedCategory: true, allowDecimals: true, hide: false, orientation: "left", width: 60, height: 0, mirror: false, yAxisId: 0, tickCount: 5, type: "number", padding: { top: 0, bottom: 0 }, allowDataOverflow: false, scale: "auto", reversed: false });
function Qh(t5) {
  return tI(t5) || eI(t5) || QT(t5) || JT();
}
function JT() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function QT(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return _s(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return _s(t5, e);
  }
}
function eI(t5) {
  if (typeof Symbol < "u" && t5[Symbol.iterator] != null || t5["@@iterator"] != null) return Array.from(t5);
}
function tI(t5) {
  if (Array.isArray(t5)) return _s(t5);
}
function _s(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
var Es = function(e, r, n, a, i) {
  var o = Te(e, al), u = Te(e, xa), c = [].concat(Qh(o), Qh(u)), s = Te(e, Aa), l = "".concat(a, "Id"), f = a[0], p = r;
  if (c.length && (p = c.reduce(function(h, d) {
    if (d.props[l] === n && ke(d.props, "extendDomain") && N(d.props[f])) {
      var b = d.props[f];
      return [Math.min(h[0], b), Math.max(h[1], b)];
    }
    return h;
  }, p)), s.length) {
    var v = "".concat(f, "1"), m = "".concat(f, "2");
    p = s.reduce(function(h, d) {
      if (d.props[l] === n && ke(d.props, "extendDomain") && N(d.props[v]) && N(d.props[m])) {
        var b = d.props[v], g = d.props[m];
        return [Math.min(h[0], b, g), Math.max(h[1], b, g)];
      }
      return h;
    }, p);
  }
  return i && i.length && (p = i.reduce(function(h, d) {
    return N(d) ? [Math.min(h[0], d), Math.max(h[1], d)] : h;
  }, p)), p;
}, yc = { exports: {} }, ey;
function rI() {
  return ey || (ey = 1, (function(t5) {
    var e = Object.prototype.hasOwnProperty, r = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (r = false));
    function a(c, s, l) {
      this.fn = c, this.context = s, this.once = l || false;
    }
    function i(c, s, l, f, p) {
      if (typeof l != "function") throw new TypeError("The listener must be a function");
      var v = new a(l, f || c, p), m = r ? r + s : s;
      return c._events[m] ? c._events[m].fn ? c._events[m] = [c._events[m], v] : c._events[m].push(v) : (c._events[m] = v, c._eventsCount++), c;
    }
    function o(c, s) {
      --c._eventsCount === 0 ? c._events = new n() : delete c._events[s];
    }
    function u() {
      this._events = new n(), this._eventsCount = 0;
    }
    u.prototype.eventNames = function() {
      var s = [], l, f;
      if (this._eventsCount === 0) return s;
      for (f in l = this._events) e.call(l, f) && s.push(r ? f.slice(1) : f);
      return Object.getOwnPropertySymbols ? s.concat(Object.getOwnPropertySymbols(l)) : s;
    }, u.prototype.listeners = function(s) {
      var l = r ? r + s : s, f = this._events[l];
      if (!f) return [];
      if (f.fn) return [f.fn];
      for (var p = 0, v = f.length, m = new Array(v); p < v; p++) m[p] = f[p].fn;
      return m;
    }, u.prototype.listenerCount = function(s) {
      var l = r ? r + s : s, f = this._events[l];
      return f ? f.fn ? 1 : f.length : 0;
    }, u.prototype.emit = function(s, l, f, p, v, m) {
      var h = r ? r + s : s;
      if (!this._events[h]) return false;
      var d = this._events[h], b = arguments.length, g, x;
      if (d.fn) {
        switch (d.once && this.removeListener(s, d.fn, void 0, true), b) {
          case 1:
            return d.fn.call(d.context), true;
          case 2:
            return d.fn.call(d.context, l), true;
          case 3:
            return d.fn.call(d.context, l, f), true;
          case 4:
            return d.fn.call(d.context, l, f, p), true;
          case 5:
            return d.fn.call(d.context, l, f, p, v), true;
          case 6:
            return d.fn.call(d.context, l, f, p, v, m), true;
        }
        for (x = 1, g = new Array(b - 1); x < b; x++) g[x - 1] = arguments[x];
        d.fn.apply(d.context, g);
      } else {
        var w = d.length, y;
        for (x = 0; x < w; x++) switch (d[x].once && this.removeListener(s, d[x].fn, void 0, true), b) {
          case 1:
            d[x].fn.call(d[x].context);
            break;
          case 2:
            d[x].fn.call(d[x].context, l);
            break;
          case 3:
            d[x].fn.call(d[x].context, l, f);
            break;
          case 4:
            d[x].fn.call(d[x].context, l, f, p);
            break;
          default:
            if (!g) for (y = 1, g = new Array(b - 1); y < b; y++) g[y - 1] = arguments[y];
            d[x].fn.apply(d[x].context, g);
        }
      }
      return true;
    }, u.prototype.on = function(s, l, f) {
      return i(this, s, l, f, false);
    }, u.prototype.once = function(s, l, f) {
      return i(this, s, l, f, true);
    }, u.prototype.removeListener = function(s, l, f, p) {
      var v = r ? r + s : s;
      if (!this._events[v]) return this;
      if (!l) return o(this, v), this;
      var m = this._events[v];
      if (m.fn) m.fn === l && (!p || m.once) && (!f || m.context === f) && o(this, v);
      else {
        for (var h = 0, d = [], b = m.length; h < b; h++) (m[h].fn !== l || p && !m[h].once || f && m[h].context !== f) && d.push(m[h]);
        d.length ? this._events[v] = d.length === 1 ? d[0] : d : o(this, v);
      }
      return this;
    }, u.prototype.removeAllListeners = function(s) {
      var l;
      return s ? (l = r ? r + s : s, this._events[l] && o(this, l)) : (this._events = new n(), this._eventsCount = 0), this;
    }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = r, u.EventEmitter = u, t5.exports = u;
  })(yc)), yc.exports;
}
var nI = rI();
const aI = te(nI);
var mc = new aI(), gc = "recharts.syncMouseEvents";
function Zr(t5) {
  "@babel/helpers - typeof";
  return Zr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Zr(t5);
}
function iI(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function oI(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, Sg(n.key), n);
  }
}
function uI(t5, e, r) {
  return e && oI(t5.prototype, e), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function bc(t5, e, r) {
  return e = Sg(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function Sg(t5) {
  var e = cI(t5, "string");
  return Zr(e) == "symbol" ? e : e + "";
}
function cI(t5, e) {
  if (Zr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Zr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t5);
}
var sI = (function() {
  function t5() {
    iI(this, t5), bc(this, "activeIndex", 0), bc(this, "coordinateList", []), bc(this, "layout", "horizontal");
  }
  return uI(t5, [{ key: "setDetails", value: function(r) {
    var n, a = r.coordinateList, i = a === void 0 ? null : a, o = r.container, u = o === void 0 ? null : o, c = r.layout, s = c === void 0 ? null : c, l = r.offset, f = l === void 0 ? null : l, p = r.mouseHandlerCallback, v = p === void 0 ? null : p;
    this.coordinateList = (n = i ?? this.coordinateList) !== null && n !== void 0 ? n : [], this.container = u ?? this.container, this.layout = s ?? this.layout, this.offset = f ?? this.offset, this.mouseHandlerCallback = v ?? this.mouseHandlerCallback, this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1);
  } }, { key: "focus", value: function() {
    this.spoofMouse();
  } }, { key: "keyboardEvent", value: function(r) {
    if (this.coordinateList.length !== 0) switch (r.key) {
      case "ArrowRight": {
        if (this.layout !== "horizontal") return;
        this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1), this.spoofMouse();
        break;
      }
      case "ArrowLeft": {
        if (this.layout !== "horizontal") return;
        this.activeIndex = Math.max(this.activeIndex - 1, 0), this.spoofMouse();
        break;
      }
    }
  } }, { key: "setIndex", value: function(r) {
    this.activeIndex = r;
  } }, { key: "spoofMouse", value: function() {
    var r, n;
    if (this.layout === "horizontal" && this.coordinateList.length !== 0) {
      var a = this.container.getBoundingClientRect(), i = a.x, o = a.y, u = a.height, c = this.coordinateList[this.activeIndex].coordinate, s = ((r = window) === null || r === void 0 ? void 0 : r.scrollX) || 0, l = ((n = window) === null || n === void 0 ? void 0 : n.scrollY) || 0, f = i + c + s, p = o + this.offset.top + u / 2 + l;
      this.mouseHandlerCallback({ pageX: f, pageY: p });
    }
  } }]);
})();
function lI(t5, e, r) {
  if (r === "number" && e === true && Array.isArray(t5)) {
    var n = t5 == null ? void 0 : t5[0], a = t5 == null ? void 0 : t5[1];
    if (n && a && N(n) && N(a)) return true;
  }
  return false;
}
function fI(t5, e, r, n) {
  var a = n / 2;
  return { stroke: "none", fill: "#ccc", x: t5 === "horizontal" ? e.x - a : r.left + 0.5, y: t5 === "horizontal" ? r.top + 0.5 : e.y - a, width: t5 === "horizontal" ? n : r.width - 1, height: t5 === "horizontal" ? r.height - 1 : n };
}
function Pg(t5) {
  var e = t5.cx, r = t5.cy, n = t5.radius, a = t5.startAngle, i = t5.endAngle, o = ne(e, r, n, a), u = ne(e, r, n, i);
  return { points: [o, u], cx: e, cy: r, radius: n, startAngle: a, endAngle: i };
}
function pI(t5, e, r) {
  var n, a, i, o;
  if (t5 === "horizontal") n = e.x, i = n, a = r.top, o = r.top + r.height;
  else if (t5 === "vertical") a = e.y, o = a, n = r.left, i = r.left + r.width;
  else if (e.cx != null && e.cy != null) if (t5 === "centric") {
    var u = e.cx, c = e.cy, s = e.innerRadius, l = e.outerRadius, f = e.angle, p = ne(u, c, s, f), v = ne(u, c, l, f);
    n = p.x, a = p.y, i = v.x, o = v.y;
  } else return Pg(e);
  return [{ x: n, y: a }, { x: i, y: o }];
}
function Jr(t5) {
  "@babel/helpers - typeof";
  return Jr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Jr(t5);
}
function ty(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function vn(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ty(Object(r), true).forEach(function(n) {
      dI(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : ty(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function dI(t5, e, r) {
  return e = vI(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function vI(t5) {
  var e = hI(t5, "string");
  return Jr(e) == "symbol" ? e : e + "";
}
function hI(t5, e) {
  if (Jr(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Jr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
function yI(t5) {
  var e, r, n = t5.element, a = t5.tooltipEventType, i = t5.isActive, o = t5.activeCoordinate, u = t5.activePayload, c = t5.offset, s = t5.activeTooltipIndex, l = t5.tooltipAxisBandSize, f = t5.layout, p = t5.chartName, v = (e = n.props.cursor) !== null && e !== void 0 ? e : (r = n.type.defaultProps) === null || r === void 0 ? void 0 : r.cursor;
  if (!n || !v || !i || !o || p !== "ScatterChart" && a !== "axis") return null;
  var m, h = Yc;
  if (p === "ScatterChart") m = o, h = p1;
  else if (p === "BarChart") m = fI(f, o, c, l), h = el;
  else if (f === "radial") {
    var d = Pg(o), b = d.cx, g = d.cy, x = d.radius, w = d.startAngle, y = d.endAngle;
    m = { cx: b, cy: g, startAngle: w, endAngle: y, innerRadius: x, outerRadius: x }, h = Tm;
  } else m = { points: pI(f, o, c) }, h = Yc;
  var O = vn(vn(vn(vn({ stroke: "#ccc", pointerEvents: "none" }, c), m), G(v, false)), {}, { payload: u, payloadIndex: s, className: V("recharts-tooltip-cursor", v.className) });
  return D.isValidElement(v) ? D.cloneElement(v, O) : D.createElement(h, O);
}
var mI = ["item"], gI = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function Yt(t5) {
  "@babel/helpers - typeof";
  return Yt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Yt(t5);
}
function jt() {
  return jt = Object.assign ? Object.assign.bind() : function(t5) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t5[n] = r[n]);
    }
    return t5;
  }, jt.apply(this, arguments);
}
function ry(t5, e) {
  return xI(t5) || OI(t5, e) || Eg(t5, e) || bI();
}
function bI() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function OI(t5, e) {
  var r = t5 == null ? null : typeof Symbol < "u" && t5[Symbol.iterator] || t5["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = true, s = false;
    try {
      if (i = (r = r.call(t5)).next, e !== 0) for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== e); c = true) ;
    } catch (l) {
      s = true, a = l;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw a;
      }
    }
    return u;
  }
}
function xI(t5) {
  if (Array.isArray(t5)) return t5;
}
function ny(t5, e) {
  if (t5 == null) return {};
  var r = wI(t5, e), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t5);
    for (a = 0; a < i.length; a++) n = i[a], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t5, n) && (r[n] = t5[n]);
  }
  return r;
}
function wI(t5, e) {
  if (t5 == null) return {};
  var r = {};
  for (var n in t5) if (Object.prototype.hasOwnProperty.call(t5, n)) {
    if (e.indexOf(n) >= 0) continue;
    r[n] = t5[n];
  }
  return r;
}
function AI(t5, e) {
  if (!(t5 instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function SI(t5, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(t5, jg(n.key), n);
  }
}
function PI(t5, e, r) {
  return e && SI(t5.prototype, e), Object.defineProperty(t5, "prototype", { writable: false }), t5;
}
function _I(t5, e, r) {
  return e = Yn(e), EI(t5, _g() ? Reflect.construct(e, r || [], Yn(t5).constructor) : e.apply(t5, r));
}
function EI(t5, e) {
  if (e && (Yt(e) === "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return jI(t5);
}
function jI(t5) {
  if (t5 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t5;
}
function _g() {
  try {
    var t5 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (_g = function() {
    return !!t5;
  })();
}
function Yn(t5) {
  return Yn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Yn(t5);
}
function TI(t5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t5.prototype = Object.create(e && e.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e && js(t5, e);
}
function js(t5, e) {
  return js = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, js(t5, e);
}
function Zt(t5) {
  return CI(t5) || $I(t5) || Eg(t5) || II();
}
function II() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Eg(t5, e) {
  if (t5) {
    if (typeof t5 == "string") return Ts(t5, e);
    var r = Object.prototype.toString.call(t5).slice(8, -1);
    if (r === "Object" && t5.constructor && (r = t5.constructor.name), r === "Map" || r === "Set") return Array.from(t5);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ts(t5, e);
  }
}
function $I(t5) {
  if (typeof Symbol < "u" && t5[Symbol.iterator] != null || t5["@@iterator"] != null) return Array.from(t5);
}
function CI(t5) {
  if (Array.isArray(t5)) return Ts(t5);
}
function Ts(t5, e) {
  (e == null || e > t5.length) && (e = t5.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t5[r];
  return n;
}
function ay(t5, e) {
  var r = Object.keys(t5);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t5);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(t5, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function $(t5) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ay(Object(r), true).forEach(function(n) {
      z(t5, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r)) : ay(Object(r)).forEach(function(n) {
      Object.defineProperty(t5, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t5;
}
function z(t5, e, r) {
  return e = jg(e), e in t5 ? Object.defineProperty(t5, e, { value: r, enumerable: true, configurable: true, writable: true }) : t5[e] = r, t5;
}
function jg(t5) {
  var e = RI(t5, "string");
  return Yt(e) == "symbol" ? e : e + "";
}
function RI(t5, e) {
  if (Yt(t5) != "object" || !t5) return t5;
  var r = t5[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t5, e);
    if (Yt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t5);
}
var MI = { xAxis: ["bottom", "top"], yAxis: ["left", "right"] }, kI = { width: "100%", height: "100%" }, Tg = { x: 0, y: 0 };
function hn(t5) {
  return t5;
}
var DI = function(e, r) {
  return r === "horizontal" ? e.x : r === "vertical" ? e.y : r === "centric" ? e.angle : e.radius;
}, NI = function(e, r, n, a) {
  var i = r.find(function(l) {
    return l && l.index === n;
  });
  if (i) {
    if (e === "horizontal") return { x: i.coordinate, y: a.y };
    if (e === "vertical") return { x: a.x, y: i.coordinate };
    if (e === "centric") {
      var o = i.coordinate, u = a.radius;
      return $($($({}, a), ne(a.cx, a.cy, u, o)), {}, { angle: o, radius: u });
    }
    var c = i.coordinate, s = a.angle;
    return $($($({}, a), ne(a.cx, a.cy, c, s)), {}, { angle: s, radius: c });
  }
  return Tg;
}, Pa = function(e, r) {
  var n = r.graphicalItems, a = r.dataStartIndex, i = r.dataEndIndex, o = (n ?? []).reduce(function(u, c) {
    var s = c.props.data;
    return s && s.length ? [].concat(Zt(u), Zt(s)) : u;
  }, []);
  return o.length > 0 ? o : e && e.length && N(a) && N(i) ? e.slice(a, i + 1) : [];
};
function Ig(t5) {
  return t5 === "number" ? [0, "auto"] : void 0;
}
var Is = function(e, r, n, a) {
  var i = e.graphicalItems, o = e.tooltipAxis, u = Pa(r, e);
  return n < 0 || !i || !i.length || n >= u.length ? null : i.reduce(function(c, s) {
    var l, f = (l = s.props.data) !== null && l !== void 0 ? l : r;
    f && e.dataStartIndex + e.dataEndIndex !== 0 && e.dataEndIndex - e.dataStartIndex >= n && (f = f.slice(e.dataStartIndex, e.dataEndIndex + 1));
    var p;
    if (o.dataKey && !o.allowDuplicatedCategory) {
      var v = f === void 0 ? u : f;
      p = wc(v, o.dataKey, a);
    } else p = f && f[n] || u[n];
    return p ? [].concat(Zt(c), [Am(s, p)]) : c;
  }, []);
}, iy = function(e, r, n, a) {
  var i = a || { x: e.chartX, y: e.chartY }, o = DI(i, n), u = e.orderedTooltipTicks, c = e.tooltipAxis, s = e.tooltipTicks, l = gS(o, u, s, c);
  if (l >= 0 && s) {
    var f = s[l] && s[l].value, p = Is(e, r, l, f), v = NI(n, u, l, i);
    return { activeTooltipIndex: l, activeLabel: f, activePayload: p, activeCoordinate: v };
  }
  return null;
}, qI = function(e, r) {
  var n = r.axes, a = r.graphicalItems, i = r.axisType, o = r.axisIdKey, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, l = e.layout, f = e.children, p = e.stackOffset, v = gm(l, i);
  return n.reduce(function(m, h) {
    var d, b = h.type.defaultProps !== void 0 ? $($({}, h.type.defaultProps), h.props) : h.props, g = b.type, x = b.dataKey, w = b.allowDataOverflow, y = b.allowDuplicatedCategory, O = b.scale, A = b.ticks, S = b.includeHidden, _ = b[o];
    if (m[_]) return m;
    var T = Pa(e.data, { graphicalItems: a.filter(function(B) {
      var H, oe = o in B.props ? B.props[o] : (H = B.type.defaultProps) === null || H === void 0 ? void 0 : H[o];
      return oe === _;
    }), dataStartIndex: c, dataEndIndex: s }), E = T.length, j, I, R;
    lI(b.domain, w, g) && (j = Gc(b.domain, null, w), v && (g === "number" || O !== "auto") && (R = br(T, x, "category")));
    var C = Ig(g);
    if (!j || j.length === 0) {
      var M, k = (M = b.domain) !== null && M !== void 0 ? M : C;
      if (x) {
        if (j = br(T, x, g), g === "category" && v) {
          var q = gO(j);
          y && q ? (I = j, j = qn(0, E)) : y || (j = mv(k, j, h).reduce(function(B, H) {
            return B.indexOf(H) >= 0 ? B : [].concat(Zt(B), [H]);
          }, []));
        } else if (g === "category") y ? j = j.filter(function(B) {
          return B !== "" && !X(B);
        }) : j = mv(k, j, h).reduce(function(B, H) {
          return B.indexOf(H) >= 0 || H === "" || X(H) ? B : [].concat(Zt(B), [H]);
        }, []);
        else if (g === "number") {
          var F = AS(T, a.filter(function(B) {
            var H, oe, de = o in B.props ? B.props[o] : (H = B.type.defaultProps) === null || H === void 0 ? void 0 : H[o], $e = "hide" in B.props ? B.props.hide : (oe = B.type.defaultProps) === null || oe === void 0 ? void 0 : oe.hide;
            return de === _ && (S || !$e);
          }), x, i, l);
          F && (j = F);
        }
        v && (g === "number" || O !== "auto") && (R = br(T, x, "category"));
      } else v ? j = qn(0, E) : u && u[_] && u[_].hasStack && g === "number" ? j = p === "expand" ? [0, 1] : wm(u[_].stackGroups, c, s) : j = mm(T, a.filter(function(B) {
        var H = o in B.props ? B.props[o] : B.type.defaultProps[o], oe = "hide" in B.props ? B.props.hide : B.type.defaultProps.hide;
        return H === _ && (S || !oe);
      }), g, l, true);
      if (g === "number") j = Es(f, j, _, i, A), k && (j = Gc(k, j, w));
      else if (g === "category" && k) {
        var W = k, K = j.every(function(B) {
          return W.indexOf(B) >= 0;
        });
        K && (j = W);
      }
    }
    return $($({}, m), {}, z({}, _, $($({}, b), {}, { axisType: i, domain: j, categoricalDomain: R, duplicateDomain: I, originalDomain: (d = b.domain) !== null && d !== void 0 ? d : C, isCategorical: v, layout: l })));
  }, {});
}, BI = function(e, r) {
  var n = r.graphicalItems, a = r.Axis, i = r.axisType, o = r.axisIdKey, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, l = e.layout, f = e.children, p = Pa(e.data, { graphicalItems: n, dataStartIndex: c, dataEndIndex: s }), v = p.length, m = gm(l, i), h = -1;
  return n.reduce(function(d, b) {
    var g = b.type.defaultProps !== void 0 ? $($({}, b.type.defaultProps), b.props) : b.props, x = g[o], w = Ig("number");
    if (!d[x]) {
      h++;
      var y;
      return m ? y = qn(0, v) : u && u[x] && u[x].hasStack ? (y = wm(u[x].stackGroups, c, s), y = Es(f, y, x, i)) : (y = Gc(w, mm(p, n.filter(function(O) {
        var A, S, _ = o in O.props ? O.props[o] : (A = O.type.defaultProps) === null || A === void 0 ? void 0 : A[o], T = "hide" in O.props ? O.props.hide : (S = O.type.defaultProps) === null || S === void 0 ? void 0 : S.hide;
        return _ === x && !T;
      }), "number", l), a.defaultProps.allowDataOverflow), y = Es(f, y, x, i)), $($({}, d), {}, z({}, x, $($({ axisType: i }, a.defaultProps), {}, { hide: true, orientation: Pe(MI, "".concat(i, ".").concat(h % 2), null), domain: y, originalDomain: w, isCategorical: m, layout: l })));
    }
    return d;
  }, {});
}, LI = function(e, r) {
  var n = r.axisType, a = n === void 0 ? "xAxis" : n, i = r.AxisComp, o = r.graphicalItems, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, l = e.children, f = "".concat(a, "Id"), p = Te(l, i), v = {};
  return p && p.length ? v = qI(e, { axes: p, graphicalItems: o, axisType: a, axisIdKey: f, stackGroups: u, dataStartIndex: c, dataEndIndex: s }) : o && o.length && (v = BI(e, { Axis: i, graphicalItems: o, axisType: a, axisIdKey: f, stackGroups: u, dataStartIndex: c, dataEndIndex: s })), v;
}, FI = function(e) {
  var r = At(e), n = lt(r, false, true);
  return { tooltipTicks: n, orderedTooltipTicks: Vs(n, function(a) {
    return a.coordinate;
  }), tooltipAxis: r, tooltipAxisBandSize: _n(r, n) };
}, oy = function(e) {
  var r = e.children, n = e.defaultShowTooltip, a = Ae(r, Wt), i = 0, o = 0;
  return e.data && e.data.length !== 0 && (o = e.data.length - 1), a && a.props && (a.props.startIndex >= 0 && (i = a.props.startIndex), a.props.endIndex >= 0 && (o = a.props.endIndex)), { chartX: 0, chartY: 0, dataStartIndex: i, dataEndIndex: o, activeTooltipIndex: -1, isTooltipActive: !!n };
}, WI = function(e) {
  return !e || !e.length ? false : e.some(function(r) {
    var n = We(r && r.type);
    return n && n.indexOf("Bar") >= 0;
  });
}, uy = function(e) {
  return e === "horizontal" ? { numericAxisName: "yAxis", cateAxisName: "xAxis" } : e === "vertical" ? { numericAxisName: "xAxis", cateAxisName: "yAxis" } : e === "centric" ? { numericAxisName: "radiusAxis", cateAxisName: "angleAxis" } : { numericAxisName: "angleAxis", cateAxisName: "radiusAxis" };
}, zI = function(e, r) {
  var n = e.props, a = e.graphicalItems, i = e.xAxisMap, o = i === void 0 ? {} : i, u = e.yAxisMap, c = u === void 0 ? {} : u, s = n.width, l = n.height, f = n.children, p = n.margin || {}, v = Ae(f, Wt), m = Ae(f, It), h = Object.keys(c).reduce(function(y, O) {
    var A = c[O], S = A.orientation;
    return !A.mirror && !A.hide ? $($({}, y), {}, z({}, S, y[S] + A.width)) : y;
  }, { left: p.left || 0, right: p.right || 0 }), d = Object.keys(o).reduce(function(y, O) {
    var A = o[O], S = A.orientation;
    return !A.mirror && !A.hide ? $($({}, y), {}, z({}, S, Pe(y, "".concat(S)) + A.height)) : y;
  }, { top: p.top || 0, bottom: p.bottom || 0 }), b = $($({}, d), h), g = b.bottom;
  v && (b.bottom += v.props.height || Wt.defaultProps.height), m && r && (b = xS(b, a, n, r));
  var x = s - b.left - b.right, w = l - b.top - b.bottom;
  return $($({ brushBottom: g }, b), {}, { width: Math.max(x, 0), height: Math.max(w, 0) });
}, KI = function(e, r) {
  if (r === "xAxis") return e[r].width;
  if (r === "yAxis") return e[r].height;
}, $g = function(e) {
  var r = e.chartName, n = e.GraphicalChild, a = e.defaultTooltipEventType, i = a === void 0 ? "axis" : a, o = e.validateTooltipEventTypes, u = o === void 0 ? ["axis"] : o, c = e.axisComponents, s = e.legendContent, l = e.formatAxisMap, f = e.defaultProps, p = function(b, g) {
    var x = g.graphicalItems, w = g.stackGroups, y = g.offset, O = g.updateId, A = g.dataStartIndex, S = g.dataEndIndex, _ = b.barSize, T = b.layout, E = b.barGap, j = b.barCategoryGap, I = b.maxBarSize, R = uy(T), C = R.numericAxisName, M = R.cateAxisName, k = WI(x), q = [];
    return x.forEach(function(F, W) {
      var K = Pa(b.data, { graphicalItems: [F], dataStartIndex: A, dataEndIndex: S }), B = F.type.defaultProps !== void 0 ? $($({}, F.type.defaultProps), F.props) : F.props, H = B.dataKey, oe = B.maxBarSize, de = B["".concat(C, "Id")], $e = B["".concat(M, "Id")], ir = {}, _e = c.reduce(function(rt, nt) {
        var _a = g["".concat(nt.axisType, "Map")], cl = B["".concat(nt.axisType, "Id")];
        _a && _a[cl] || nt.axisType === "zAxis" || yt();
        var sl = _a[cl];
        return $($({}, rt), {}, z(z({}, nt.axisType, sl), "".concat(nt.axisType, "Ticks"), lt(sl)));
      }, ir), et = _e[M], nn = _e["".concat(M, "Ticks")], gt = w && w[de] && w[de].hasStack && CS(F, w[de].stackGroups), or = We(F.type).indexOf("Bar") >= 0, tt = _n(et, nn), bt = [], ur = k && bS({ barSize: _, stackGroups: w, totalSize: KI(_e, M) });
      if (or) {
        var cr, Ot, sr = X(oe) ? I : oe, xt = (cr = (Ot = _n(et, nn, true)) !== null && Ot !== void 0 ? Ot : sr) !== null && cr !== void 0 ? cr : 0;
        bt = OS({ barGap: E, barCategoryGap: j, bandSize: xt !== tt ? xt : tt, sizeList: ur[$e], maxBarSize: sr }), xt !== tt && (bt = bt.map(function(rt) {
          return $($({}, rt), {}, { position: $($({}, rt.position), {}, { offset: rt.position.offset - xt / 2 }) });
        }));
      }
      var an = F && F.type && F.type.getComposedData;
      an && q.push({ props: $($({}, an($($({}, _e), {}, { displayedData: K, props: b, dataKey: H, item: F, bandSize: tt, barPosition: bt, offset: y, stackedData: gt, layout: T, dataStartIndex: A, dataEndIndex: S }))), {}, z(z(z({ key: F.key || "item-".concat(W) }, C, _e[C]), M, _e[M]), "animationId", O)), childIndex: IO(F, b.children), item: F });
    }), q;
  }, v = function(b, g) {
    var x = b.props, w = b.dataStartIndex, y = b.dataEndIndex, O = b.updateId;
    if (!bf({ props: x })) return null;
    var A = x.children, S = x.layout, _ = x.stackOffset, T = x.data, E = x.reverseStackOrder, j = uy(S), I = j.numericAxisName, R = j.cateAxisName, C = Te(A, n), M = IS(T, C, "".concat(I, "Id"), "".concat(R, "Id"), _, E), k = c.reduce(function(B, H) {
      var oe = "".concat(H.axisType, "Map");
      return $($({}, B), {}, z({}, oe, LI(x, $($({}, H), {}, { graphicalItems: C, stackGroups: H.axisType === I && M, dataStartIndex: w, dataEndIndex: y }))));
    }, {}), q = zI($($({}, k), {}, { props: x, graphicalItems: C }), g == null ? void 0 : g.legendBBox);
    Object.keys(k).forEach(function(B) {
      k[B] = l(x, k[B], q, B.replace("Map", ""), r);
    });
    var F = k["".concat(R, "Map")], W = FI(F), K = p(x, $($({}, k), {}, { dataStartIndex: w, dataEndIndex: y, updateId: O, graphicalItems: C, stackGroups: M, offset: q }));
    return $($({ formattedGraphicalItems: K, graphicalItems: C, offset: q, stackGroups: M }, W), k);
  }, m = (function(d) {
    function b(g) {
      var x, w, y;
      return AI(this, b), y = _I(this, b, [g]), z(y, "eventEmitterSymbol", /* @__PURE__ */ Symbol("rechartsEventEmitter")), z(y, "accessibilityManager", new sI()), z(y, "handleLegendBBoxUpdate", function(O) {
        if (O) {
          var A = y.state, S = A.dataStartIndex, _ = A.dataEndIndex, T = A.updateId;
          y.setState($({ legendBBox: O }, v({ props: y.props, dataStartIndex: S, dataEndIndex: _, updateId: T }, $($({}, y.state), {}, { legendBBox: O }))));
        }
      }), z(y, "handleReceiveSyncEvent", function(O, A, S) {
        if (y.props.syncId === O) {
          if (S === y.eventEmitterSymbol && typeof y.props.syncMethod != "function") return;
          y.applySyncEvent(A);
        }
      }), z(y, "handleBrushChange", function(O) {
        var A = O.startIndex, S = O.endIndex;
        if (A !== y.state.dataStartIndex || S !== y.state.dataEndIndex) {
          var _ = y.state.updateId;
          y.setState(function() {
            return $({ dataStartIndex: A, dataEndIndex: S }, v({ props: y.props, dataStartIndex: A, dataEndIndex: S, updateId: _ }, y.state));
          }), y.triggerSyncEvent({ dataStartIndex: A, dataEndIndex: S });
        }
      }), z(y, "handleMouseEnter", function(O) {
        var A = y.getMouseInfo(O);
        if (A) {
          var S = $($({}, A), {}, { isTooltipActive: true });
          y.setState(S), y.triggerSyncEvent(S);
          var _ = y.props.onMouseEnter;
          U(_) && _(S, O);
        }
      }), z(y, "triggeredAfterMouseMove", function(O) {
        var A = y.getMouseInfo(O), S = A ? $($({}, A), {}, { isTooltipActive: true }) : { isTooltipActive: false };
        y.setState(S), y.triggerSyncEvent(S);
        var _ = y.props.onMouseMove;
        U(_) && _(S, O);
      }), z(y, "handleItemMouseEnter", function(O) {
        y.setState(function() {
          return { isTooltipActive: true, activeItem: O, activePayload: O.tooltipPayload, activeCoordinate: O.tooltipPosition || { x: O.cx, y: O.cy } };
        });
      }), z(y, "handleItemMouseLeave", function() {
        y.setState(function() {
          return { isTooltipActive: false };
        });
      }), z(y, "handleMouseMove", function(O) {
        O.persist(), y.throttleTriggeredAfterMouseMove(O);
      }), z(y, "handleMouseLeave", function(O) {
        y.throttleTriggeredAfterMouseMove.cancel();
        var A = { isTooltipActive: false };
        y.setState(A), y.triggerSyncEvent(A);
        var S = y.props.onMouseLeave;
        U(S) && S(A, O);
      }), z(y, "handleOuterEvent", function(O) {
        var A = TO(O), S = Pe(y.props, "".concat(A));
        if (A && U(S)) {
          var _, T;
          /.*touch.*/i.test(A) ? T = y.getMouseInfo(O.changedTouches[0]) : T = y.getMouseInfo(O), S((_ = T) !== null && _ !== void 0 ? _ : {}, O);
        }
      }), z(y, "handleClick", function(O) {
        var A = y.getMouseInfo(O);
        if (A) {
          var S = $($({}, A), {}, { isTooltipActive: true });
          y.setState(S), y.triggerSyncEvent(S);
          var _ = y.props.onClick;
          U(_) && _(S, O);
        }
      }), z(y, "handleMouseDown", function(O) {
        var A = y.props.onMouseDown;
        if (U(A)) {
          var S = y.getMouseInfo(O);
          A(S, O);
        }
      }), z(y, "handleMouseUp", function(O) {
        var A = y.props.onMouseUp;
        if (U(A)) {
          var S = y.getMouseInfo(O);
          A(S, O);
        }
      }), z(y, "handleTouchMove", function(O) {
        O.changedTouches != null && O.changedTouches.length > 0 && y.throttleTriggeredAfterMouseMove(O.changedTouches[0]);
      }), z(y, "handleTouchStart", function(O) {
        O.changedTouches != null && O.changedTouches.length > 0 && y.handleMouseDown(O.changedTouches[0]);
      }), z(y, "handleTouchEnd", function(O) {
        O.changedTouches != null && O.changedTouches.length > 0 && y.handleMouseUp(O.changedTouches[0]);
      }), z(y, "handleDoubleClick", function(O) {
        var A = y.props.onDoubleClick;
        if (U(A)) {
          var S = y.getMouseInfo(O);
          A(S, O);
        }
      }), z(y, "handleContextMenu", function(O) {
        var A = y.props.onContextMenu;
        if (U(A)) {
          var S = y.getMouseInfo(O);
          A(S, O);
        }
      }), z(y, "triggerSyncEvent", function(O) {
        y.props.syncId !== void 0 && mc.emit(gc, y.props.syncId, O, y.eventEmitterSymbol);
      }), z(y, "applySyncEvent", function(O) {
        var A = y.props, S = A.layout, _ = A.syncMethod, T = y.state.updateId, E = O.dataStartIndex, j = O.dataEndIndex;
        if (O.dataStartIndex !== void 0 || O.dataEndIndex !== void 0) y.setState($({ dataStartIndex: E, dataEndIndex: j }, v({ props: y.props, dataStartIndex: E, dataEndIndex: j, updateId: T }, y.state)));
        else if (O.activeTooltipIndex !== void 0) {
          var I = O.chartX, R = O.chartY, C = O.activeTooltipIndex, M = y.state, k = M.offset, q = M.tooltipTicks;
          if (!k) return;
          if (typeof _ == "function") C = _(q, O);
          else if (_ === "value") {
            C = -1;
            for (var F = 0; F < q.length; F++) if (q[F].value === O.activeLabel) {
              C = F;
              break;
            }
          }
          var W = $($({}, k), {}, { x: k.left, y: k.top }), K = Math.min(I, W.x + W.width), B = Math.min(R, W.y + W.height), H = q[C] && q[C].value, oe = Is(y.state, y.props.data, C), de = q[C] ? { x: S === "horizontal" ? q[C].coordinate : K, y: S === "horizontal" ? B : q[C].coordinate } : Tg;
          y.setState($($({}, O), {}, { activeLabel: H, activeCoordinate: de, activePayload: oe, activeTooltipIndex: C }));
        } else y.setState(O);
      }), z(y, "renderCursor", function(O) {
        var A, S = y.state, _ = S.isTooltipActive, T = S.activeCoordinate, E = S.activePayload, j = S.offset, I = S.activeTooltipIndex, R = S.tooltipAxisBandSize, C = y.getTooltipEventType(), M = (A = O.props.active) !== null && A !== void 0 ? A : _, k = y.props.layout, q = O.key || "_recharts-cursor";
        return P.createElement(yI, { key: q, activeCoordinate: T, activePayload: E, activeTooltipIndex: I, chartName: r, element: O, isActive: M, layout: k, offset: j, tooltipAxisBandSize: R, tooltipEventType: C });
      }), z(y, "renderPolarAxis", function(O, A, S) {
        var _ = Pe(O, "type.axisType"), T = Pe(y.state, "".concat(_, "Map")), E = O.type.defaultProps, j = E !== void 0 ? $($({}, E), O.props) : O.props, I = T && T[j["".concat(_, "Id")]];
        return D.cloneElement(O, $($({}, I), {}, { className: V(_, I.className), key: O.key || "".concat(A, "-").concat(S), ticks: lt(I, true) }));
      }), z(y, "renderPolarGrid", function(O) {
        var A = O.props, S = A.radialLines, _ = A.polarAngles, T = A.polarRadius, E = y.state, j = E.radiusAxisMap, I = E.angleAxisMap, R = At(j), C = At(I), M = C.cx, k = C.cy, q = C.innerRadius, F = C.outerRadius;
        return D.cloneElement(O, { polarAngles: Array.isArray(_) ? _ : lt(C, true).map(function(W) {
          return W.coordinate;
        }), polarRadius: Array.isArray(T) ? T : lt(R, true).map(function(W) {
          return W.coordinate;
        }), cx: M, cy: k, innerRadius: q, outerRadius: F, key: O.key || "polar-grid", radialLines: S });
      }), z(y, "renderLegend", function() {
        var O = y.state.formattedGraphicalItems, A = y.props, S = A.children, _ = A.width, T = A.height, E = y.props.margin || {}, j = _ - (E.left || 0) - (E.right || 0), I = hm({ children: S, formattedGraphicalItems: O, legendWidth: j, legendContent: s });
        if (!I) return null;
        var R = I.item, C = ny(I, mI);
        return D.cloneElement(R, $($({}, C), {}, { chartWidth: _, chartHeight: T, margin: E, onBBoxUpdate: y.handleLegendBBoxUpdate }));
      }), z(y, "renderTooltip", function() {
        var O, A = y.props, S = A.children, _ = A.accessibilityLayer, T = Ae(S, Le);
        if (!T) return null;
        var E = y.state, j = E.isTooltipActive, I = E.activeCoordinate, R = E.activePayload, C = E.activeLabel, M = E.offset, k = (O = T.props.active) !== null && O !== void 0 ? O : j;
        return D.cloneElement(T, { viewBox: $($({}, M), {}, { x: M.left, y: M.top }), active: k, label: C, payload: k ? R : [], coordinate: I, accessibilityLayer: _ });
      }), z(y, "renderBrush", function(O) {
        var A = y.props, S = A.margin, _ = A.data, T = y.state, E = T.offset, j = T.dataStartIndex, I = T.dataEndIndex, R = T.updateId;
        return D.cloneElement(O, { key: O.key || "_recharts-brush", onChange: fn(y.handleBrushChange, O.props.onChange), data: _, x: N(O.props.x) ? O.props.x : E.left, y: N(O.props.y) ? O.props.y : E.top + E.height + E.brushBottom - (S.bottom || 0), width: N(O.props.width) ? O.props.width : E.width, startIndex: j, endIndex: I, updateId: "brush-".concat(R) });
      }), z(y, "renderReferenceElement", function(O, A, S) {
        if (!O) return null;
        var _ = y, T = _.clipPathId, E = y.state, j = E.xAxisMap, I = E.yAxisMap, R = E.offset, C = O.type.defaultProps || {}, M = O.props, k = M.xAxisId, q = k === void 0 ? C.xAxisId : k, F = M.yAxisId, W = F === void 0 ? C.yAxisId : F;
        return D.cloneElement(O, { key: O.key || "".concat(A, "-").concat(S), xAxis: j[q], yAxis: I[W], viewBox: { x: R.left, y: R.top, width: R.width, height: R.height }, clipPathId: T });
      }), z(y, "renderActivePoints", function(O) {
        var A = O.item, S = O.activePoint, _ = O.basePoint, T = O.childIndex, E = O.isRange, j = [], I = A.props.key, R = A.item.type.defaultProps !== void 0 ? $($({}, A.item.type.defaultProps), A.item.props) : A.item.props, C = R.activeDot, M = R.dataKey, k = $($({ index: T, dataKey: M, cx: S.x, cy: S.y, r: 4, fill: Qs(A.item), strokeWidth: 2, stroke: "#fff", payload: S.payload, value: S.value }, G(C, false)), mn(C));
        return j.push(b.renderActiveDot(C, k, "".concat(I, "-activePoint-").concat(T))), _ ? j.push(b.renderActiveDot(C, $($({}, k), {}, { cx: _.x, cy: _.y }), "".concat(I, "-basePoint-").concat(T))) : E && j.push(null), j;
      }), z(y, "renderGraphicChild", function(O, A, S) {
        var _ = y.filterFormatItem(O, A, S);
        if (!_) return null;
        var T = y.getTooltipEventType(), E = y.state, j = E.isTooltipActive, I = E.tooltipAxis, R = E.activeTooltipIndex, C = E.activeLabel, M = y.props.children, k = Ae(M, Le), q = _.props, F = q.points, W = q.isRange, K = q.baseLine, B = _.item.type.defaultProps !== void 0 ? $($({}, _.item.type.defaultProps), _.item.props) : _.item.props, H = B.activeDot, oe = B.hide, de = B.activeBar, $e = B.activeShape, ir = !!(!oe && j && k && (H || de || $e)), _e = {};
        T !== "axis" && k && k.props.trigger === "click" ? _e = { onClick: fn(y.handleItemMouseEnter, O.props.onClick) } : T !== "axis" && (_e = { onMouseLeave: fn(y.handleItemMouseLeave, O.props.onMouseLeave), onMouseEnter: fn(y.handleItemMouseEnter, O.props.onMouseEnter) });
        var et = D.cloneElement(O, $($({}, _.props), _e));
        function nn(nt) {
          return typeof I.dataKey == "function" ? I.dataKey(nt.payload) : null;
        }
        if (ir) if (R >= 0) {
          var gt, or;
          if (I.dataKey && !I.allowDuplicatedCategory) {
            var tt = typeof I.dataKey == "function" ? nn : "payload.".concat(I.dataKey.toString());
            gt = wc(F, tt, C), or = W && K && wc(K, tt, C);
          } else gt = F == null ? void 0 : F[R], or = W && K && K[R];
          if ($e || de) {
            var bt = O.props.activeIndex !== void 0 ? O.props.activeIndex : R;
            return [D.cloneElement(O, $($($({}, _.props), _e), {}, { activeIndex: bt })), null, null];
          }
          if (!X(gt)) return [et].concat(Zt(y.renderActivePoints({ item: _, activePoint: gt, basePoint: or, childIndex: R, isRange: W })));
        } else {
          var ur, cr = (ur = y.getItemByXY(y.state.activeCoordinate)) !== null && ur !== void 0 ? ur : { graphicalItem: et }, Ot = cr.graphicalItem, sr = Ot.item, xt = sr === void 0 ? O : sr, an = Ot.childIndex, rt = $($($({}, _.props), _e), {}, { activeIndex: an });
          return [D.cloneElement(xt, rt), null, null];
        }
        return W ? [et, null, null] : [et, null];
      }), z(y, "renderCustomized", function(O, A, S) {
        return D.cloneElement(O, $($({ key: "recharts-customized-".concat(S) }, y.props), y.state));
      }), z(y, "renderMap", { CartesianGrid: { handler: hn, once: true }, ReferenceArea: { handler: y.renderReferenceElement }, ReferenceLine: { handler: hn }, ReferenceDot: { handler: y.renderReferenceElement }, XAxis: { handler: hn }, YAxis: { handler: hn }, Brush: { handler: y.renderBrush, once: true }, Bar: { handler: y.renderGraphicChild }, Line: { handler: y.renderGraphicChild }, Area: { handler: y.renderGraphicChild }, Radar: { handler: y.renderGraphicChild }, RadialBar: { handler: y.renderGraphicChild }, Scatter: { handler: y.renderGraphicChild }, Pie: { handler: y.renderGraphicChild }, Funnel: { handler: y.renderGraphicChild }, Tooltip: { handler: y.renderCursor, once: true }, PolarGrid: { handler: y.renderPolarGrid, once: true }, PolarAngleAxis: { handler: y.renderPolarAxis }, PolarRadiusAxis: { handler: y.renderPolarAxis }, Customized: { handler: y.renderCustomized } }), y.clipPathId = "".concat((x = g.id) !== null && x !== void 0 ? x : tn("recharts"), "-clip"), y.throttleTriggeredAfterMouseMove = Uy(y.triggeredAfterMouseMove, (w = g.throttleDelay) !== null && w !== void 0 ? w : 1e3 / 60), y.state = {}, y;
    }
    return TI(b, d), PI(b, [{ key: "componentDidMount", value: function() {
      var x, w;
      this.addListener(), this.accessibilityManager.setDetails({ container: this.container, offset: { left: (x = this.props.margin.left) !== null && x !== void 0 ? x : 0, top: (w = this.props.margin.top) !== null && w !== void 0 ? w : 0 }, coordinateList: this.state.tooltipTicks, mouseHandlerCallback: this.triggeredAfterMouseMove, layout: this.props.layout }), this.displayDefaultTooltip();
    } }, { key: "displayDefaultTooltip", value: function() {
      var x = this.props, w = x.children, y = x.data, O = x.height, A = x.layout, S = Ae(w, Le);
      if (S) {
        var _ = S.props.defaultIndex;
        if (!(typeof _ != "number" || _ < 0 || _ > this.state.tooltipTicks.length - 1)) {
          var T = this.state.tooltipTicks[_] && this.state.tooltipTicks[_].value, E = Is(this.state, y, _, T), j = this.state.tooltipTicks[_].coordinate, I = (this.state.offset.top + O) / 2, R = A === "horizontal", C = R ? { x: j, y: I } : { y: j, x: I }, M = this.state.formattedGraphicalItems.find(function(q) {
            var F = q.item;
            return F.type.name === "Scatter";
          });
          M && (C = $($({}, C), M.props.points[_].tooltipPosition), E = M.props.points[_].tooltipPayload);
          var k = { activeTooltipIndex: _, isTooltipActive: true, activeLabel: T, activePayload: E, activeCoordinate: C };
          this.setState(k), this.renderCursor(S), this.accessibilityManager.setIndex(_);
        }
      }
    } }, { key: "getSnapshotBeforeUpdate", value: function(x, w) {
      if (!this.props.accessibilityLayer) return null;
      if (this.state.tooltipTicks !== w.tooltipTicks && this.accessibilityManager.setDetails({ coordinateList: this.state.tooltipTicks }), this.props.layout !== x.layout && this.accessibilityManager.setDetails({ layout: this.props.layout }), this.props.margin !== x.margin) {
        var y, O;
        this.accessibilityManager.setDetails({ offset: { left: (y = this.props.margin.left) !== null && y !== void 0 ? y : 0, top: (O = this.props.margin.top) !== null && O !== void 0 ? O : 0 } });
      }
      return null;
    } }, { key: "componentDidUpdate", value: function(x) {
      Sc([Ae(x.children, Le)], [Ae(this.props.children, Le)]) || this.displayDefaultTooltip();
    } }, { key: "componentWillUnmount", value: function() {
      this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel();
    } }, { key: "getTooltipEventType", value: function() {
      var x = Ae(this.props.children, Le);
      if (x && typeof x.props.shared == "boolean") {
        var w = x.props.shared ? "axis" : "item";
        return u.indexOf(w) >= 0 ? w : i;
      }
      return i;
    } }, { key: "getMouseInfo", value: function(x) {
      if (!this.container) return null;
      var w = this.container, y = w.getBoundingClientRect(), O = Nw(y), A = { chartX: Math.round(x.pageX - O.left), chartY: Math.round(x.pageY - O.top) }, S = y.width / w.offsetWidth || 1, _ = this.inRange(A.chartX, A.chartY, S);
      if (!_) return null;
      var T = this.state, E = T.xAxisMap, j = T.yAxisMap, I = this.getTooltipEventType(), R = iy(this.state, this.props.data, this.props.layout, _);
      if (I !== "axis" && E && j) {
        var C = At(E).scale, M = At(j).scale, k = C && C.invert ? C.invert(A.chartX) : null, q = M && M.invert ? M.invert(A.chartY) : null;
        return $($({}, A), {}, { xValue: k, yValue: q }, R);
      }
      return R ? $($({}, A), R) : null;
    } }, { key: "inRange", value: function(x, w) {
      var y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, O = this.props.layout, A = x / y, S = w / y;
      if (O === "horizontal" || O === "vertical") {
        var _ = this.state.offset, T = A >= _.left && A <= _.left + _.width && S >= _.top && S <= _.top + _.height;
        return T ? { x: A, y: S } : null;
      }
      var E = this.state, j = E.angleAxisMap, I = E.radiusAxisMap;
      if (j && I) {
        var R = At(j);
        return Ov({ x: A, y: S }, R);
      }
      return null;
    } }, { key: "parseEventsOfWrapper", value: function() {
      var x = this.props.children, w = this.getTooltipEventType(), y = Ae(x, Le), O = {};
      y && w === "axis" && (y.props.trigger === "click" ? O = { onClick: this.handleClick } : O = { onMouseEnter: this.handleMouseEnter, onDoubleClick: this.handleDoubleClick, onMouseMove: this.handleMouseMove, onMouseLeave: this.handleMouseLeave, onTouchMove: this.handleTouchMove, onTouchStart: this.handleTouchStart, onTouchEnd: this.handleTouchEnd, onContextMenu: this.handleContextMenu });
      var A = mn(this.props, this.handleOuterEvent);
      return $($({}, A), O);
    } }, { key: "addListener", value: function() {
      mc.on(gc, this.handleReceiveSyncEvent);
    } }, { key: "removeListener", value: function() {
      mc.removeListener(gc, this.handleReceiveSyncEvent);
    } }, { key: "filterFormatItem", value: function(x, w, y) {
      for (var O = this.state.formattedGraphicalItems, A = 0, S = O.length; A < S; A++) {
        var _ = O[A];
        if (_.item === x || _.props.key === x.key || w === We(_.item.type) && y === _.childIndex) return _;
      }
      return null;
    } }, { key: "renderClipPath", value: function() {
      var x = this.clipPathId, w = this.state.offset, y = w.left, O = w.top, A = w.height, S = w.width;
      return P.createElement("defs", null, P.createElement("clipPath", { id: x }, P.createElement("rect", { x: y, y: O, height: A, width: S })));
    } }, { key: "getXScales", value: function() {
      var x = this.state.xAxisMap;
      return x ? Object.entries(x).reduce(function(w, y) {
        var O = ry(y, 2), A = O[0], S = O[1];
        return $($({}, w), {}, z({}, A, S.scale));
      }, {}) : null;
    } }, { key: "getYScales", value: function() {
      var x = this.state.yAxisMap;
      return x ? Object.entries(x).reduce(function(w, y) {
        var O = ry(y, 2), A = O[0], S = O[1];
        return $($({}, w), {}, z({}, A, S.scale));
      }, {}) : null;
    } }, { key: "getXScaleByAxisId", value: function(x) {
      var w;
      return (w = this.state.xAxisMap) === null || w === void 0 || (w = w[x]) === null || w === void 0 ? void 0 : w.scale;
    } }, { key: "getYScaleByAxisId", value: function(x) {
      var w;
      return (w = this.state.yAxisMap) === null || w === void 0 || (w = w[x]) === null || w === void 0 ? void 0 : w.scale;
    } }, { key: "getItemByXY", value: function(x) {
      var w = this.state, y = w.formattedGraphicalItems, O = w.activeItem;
      if (y && y.length) for (var A = 0, S = y.length; A < S; A++) {
        var _ = y[A], T = _.props, E = _.item, j = E.type.defaultProps !== void 0 ? $($({}, E.type.defaultProps), E.props) : E.props, I = We(E.type);
        if (I === "Bar") {
          var R = (T.data || []).find(function(q) {
            return H_(x, q);
          });
          if (R) return { graphicalItem: _, payload: R };
        } else if (I === "RadialBar") {
          var C = (T.data || []).find(function(q) {
            return Ov(x, q);
          });
          if (C) return { graphicalItem: _, payload: C };
        } else if (ma(_, O) || ga(_, O) || Hr(_, O)) {
          var M = hE({ graphicalItem: _, activeTooltipItem: O, itemData: j.data }), k = j.activeIndex === void 0 ? M : j.activeIndex;
          return { graphicalItem: $($({}, _), {}, { childIndex: k }), payload: Hr(_, O) ? j.data[M] : _.props.data[M] };
        }
      }
      return null;
    } }, { key: "render", value: function() {
      var x = this;
      if (!bf(this)) return null;
      var w = this.props, y = w.children, O = w.className, A = w.width, S = w.height, _ = w.style, T = w.compact, E = w.title, j = w.desc, I = ny(w, gI), R = G(I, false);
      if (T) return P.createElement(Wh, { state: this.state, width: this.props.width, height: this.props.height, clipPathId: this.clipPathId }, P.createElement(_c, jt({}, R, { width: A, height: S, title: E, desc: j }), this.renderClipPath(), xf(y, this.renderMap)));
      if (this.props.accessibilityLayer) {
        var C, M;
        R.tabIndex = (C = this.props.tabIndex) !== null && C !== void 0 ? C : 0, R.role = (M = this.props.role) !== null && M !== void 0 ? M : "application", R.onKeyDown = function(q) {
          x.accessibilityManager.keyboardEvent(q);
        }, R.onFocus = function() {
          x.accessibilityManager.focus();
        };
      }
      var k = this.parseEventsOfWrapper();
      return P.createElement(Wh, { state: this.state, width: this.props.width, height: this.props.height, clipPathId: this.clipPathId }, P.createElement("div", jt({ className: V("recharts-wrapper", O), style: $({ position: "relative", cursor: "default", width: A, height: S }, _) }, k, { ref: function(F) {
        x.container = F;
      } }), P.createElement(_c, jt({}, R, { width: A, height: S, title: E, desc: j, style: kI }), this.renderClipPath(), xf(y, this.renderMap)), this.renderLegend(), this.renderTooltip()));
    } }]);
  })(D.Component);
  z(m, "displayName", r), z(m, "defaultProps", $({ layout: "horizontal", stackOffset: "none", barCategoryGap: "10%", barGap: 4, margin: { top: 5, right: 5, bottom: 5, left: 5 }, reverseStackOrder: false, syncMethod: "index" }, f)), z(m, "getDerivedStateFromProps", function(d, b) {
    var g = d.dataKey, x = d.data, w = d.children, y = d.width, O = d.height, A = d.layout, S = d.stackOffset, _ = d.margin, T = b.dataStartIndex, E = b.dataEndIndex;
    if (b.updateId === void 0) {
      var j = oy(d);
      return $($($({}, j), {}, { updateId: 0 }, v($($({ props: d }, j), {}, { updateId: 0 }), b)), {}, { prevDataKey: g, prevData: x, prevWidth: y, prevHeight: O, prevLayout: A, prevStackOffset: S, prevMargin: _, prevChildren: w });
    }
    if (g !== b.prevDataKey || x !== b.prevData || y !== b.prevWidth || O !== b.prevHeight || A !== b.prevLayout || S !== b.prevStackOffset || !Tt(_, b.prevMargin)) {
      var I = oy(d), R = { chartX: b.chartX, chartY: b.chartY, isTooltipActive: b.isTooltipActive }, C = $($({}, iy(b, x, A)), {}, { updateId: b.updateId + 1 }), M = $($($({}, I), R), C);
      return $($($({}, M), v($({ props: d }, M), b)), {}, { prevDataKey: g, prevData: x, prevWidth: y, prevHeight: O, prevLayout: A, prevStackOffset: S, prevMargin: _, prevChildren: w });
    }
    if (!Sc(w, b.prevChildren)) {
      var k, q, F, W, K = Ae(w, Wt), B = K && (k = (q = K.props) === null || q === void 0 ? void 0 : q.startIndex) !== null && k !== void 0 ? k : T, H = K && (F = (W = K.props) === null || W === void 0 ? void 0 : W.endIndex) !== null && F !== void 0 ? F : E, oe = B !== T || H !== E, de = !X(x), $e = de && !oe ? b.updateId : b.updateId + 1;
      return $($({ updateId: $e }, v($($({ props: d }, b), {}, { updateId: $e, dataStartIndex: B, dataEndIndex: H }), b)), {}, { prevChildren: w, dataStartIndex: B, dataEndIndex: H });
    }
    return null;
  }), z(m, "renderActiveDot", function(d, b, g) {
    var x;
    return D.isValidElement(d) ? x = D.cloneElement(d, b) : U(d) ? x = d(b) : x = P.createElement(tl, b), P.createElement(J, { className: "recharts-active-dot", key: g }, x);
  });
  var h = D.forwardRef(function(b, g) {
    return P.createElement(m, jt({}, b, { ref: g }));
  });
  return h.displayName = m.displayName, h;
}, YI = $g({ chartName: "BarChart", GraphicalChild: ar, defaultTooltipEventType: "axis", validateTooltipEventTypes: ["axis", "item"], axisComponents: [{ axisType: "xAxis", AxisComp: ol }, { axisType: "yAxis", AxisComp: ul }], formatAxisMap: bj }), ZI = $g({ chartName: "PieChart", GraphicalChild: Qe, validateTooltipEventTypes: ["item"], defaultTooltipEventType: "item", legendContent: "children", axisComponents: [{ axisType: "angleAxis", AxisComp: ya }, { axisType: "radiusAxis", AxisComp: va }], formatAxisMap: WS, defaultProps: { layout: "centric", startAngle: 0, endAngle: 360, cx: "50%", cy: "50%", innerRadius: 0, outerRadius: "80%" } });
export {
  YI as B,
  Ys as C,
  It as L,
  ZI as P,
  XI as R,
  Le as T,
  ol as X,
  ul as Y,
  ar as a,
  Qe as b
};
