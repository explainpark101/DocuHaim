import { r as w, j as rt } from "./vendor-react-SY5QCjFA.js";
const gn = w.createContext({});
function xe(t) {
  const e = w.useRef(null);
  return e.current === null && (e.current = t()), e.current;
}
const yr = typeof window < "u", Te = yr ? w.useLayoutEffect : w.useEffect, we = w.createContext(null);
function yn(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function bt(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const st = (t, e, n) => n > e ? e : n < t ? t : n;
let Se = () => {
};
const ut = {}, Pi = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t), Ai = (t) => typeof t == "object" && t !== null, bi = (t) => /^0[^.\s]+$/u.test(t);
function Vi(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const X = (t) => t, zt = (...t) => t.reduce((e, n) => (s) => n(e(s))), Vt = (t, e, n) => {
  const s = e - t;
  return s ? (n - t) / s : 1;
};
class vn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return yn(this.subscriptions, e), () => bt(this.subscriptions, e);
  }
  notify(e, n, s) {
    const i = this.subscriptions.length;
    if (i) if (i === 1) this.subscriptions[0](e, n, s);
    else for (let r = 0; r < i; r++) {
      const o = this.subscriptions[r];
      o && o(e, n, s);
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const z = (t) => t * 1e3, _ = (t) => t / 1e3, Ci = (t, e) => e ? t * (1e3 / e) : 0, vr = (t, e, n) => {
  const s = e - t;
  return ((n - t) % s + s) % s + t;
}, Mi = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, xr = 1e-7, Tr = 12;
function wr(t, e, n, s, i) {
  let r, o, a = 0;
  do
    o = e + (n - e) / 2, r = Mi(o, s, i) - t, r > 0 ? n = o : e = o;
  while (Math.abs(r) > xr && ++a < Tr);
  return o;
}
function Gt(t, e, n, s) {
  if (t === e && n === s) return X;
  const i = (r) => wr(r, 0, 1, t, n);
  return (r) => r === 0 || r === 1 ? r : Mi(i(r), e, s);
}
const Di = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, xn = (t) => (e) => 1 - t(1 - e), Ei = Gt(0.33, 1.53, 0.69, 0.99), Tn = xn(Ei), Ri = Di(Tn), Li = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * Tn(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), wn = (t) => 1 - Math.sin(Math.acos(t)), ki = xn(wn), Bi = Di(wn), Sr = Gt(0.42, 0, 1, 1), Pr = Gt(0, 0, 0.58, 1), Fi = Gt(0.42, 0, 0.58, 1), Ii = (t) => Array.isArray(t) && typeof t[0] != "number";
function Oi(t, e) {
  return Ii(t) ? t[vr(0, t.length, e)] : t;
}
const ji = (t) => Array.isArray(t) && typeof t[0] == "number", Ar = { linear: X, easeIn: Sr, easeInOut: Fi, easeOut: Pr, circIn: wn, circInOut: Bi, circOut: ki, backIn: Tn, backInOut: Ri, backOut: Ei, anticipate: Li }, br = (t) => typeof t == "string", ss = (t) => {
  if (ji(t)) {
    Se(t.length === 4);
    const [e, n, s, i] = t;
    return Gt(e, n, s, i);
  } else if (br(t)) return Ar[t];
  return t;
}, qt = ["setup", "read", "resolveKeyframes", "preUpdate", "update", "preRender", "render", "postRender"];
function Vr(t) {
  let e = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), s = false, i = false;
  const r = /* @__PURE__ */ new WeakSet();
  let o = { delta: 0, timestamp: 0, isProcessing: false };
  function a(u) {
    r.has(u) && (l.schedule(u), t()), u(o);
  }
  const l = { schedule: (u, c = false, h = false) => {
    const p = h && s ? e : n;
    return c && r.add(u), p.add(u), u;
  }, cancel: (u) => {
    n.delete(u), r.delete(u);
  }, process: (u) => {
    if (o = u, s) {
      i = true;
      return;
    }
    s = true;
    const c = e;
    e = n, n = c, e.forEach(a), e.clear(), s = false, i && (i = false, l.process(u));
  } };
  return l;
}
const Cr = 40;
function Ni(t, e) {
  let n = false, s = true;
  const i = { delta: 0, timestamp: 0, isProcessing: false }, r = () => n = true, o = qt.reduce((x, T) => (x[T] = Vr(r), x), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: c, update: h, preRender: f, render: p, postRender: d } = o, g = () => {
    const x = ut.useManualTiming, T = x ? i.timestamp : performance.now();
    n = false, x || (i.delta = s ? 1e3 / 60 : Math.max(Math.min(T - i.timestamp, Cr), 1)), i.timestamp = T, i.isProcessing = true, a.process(i), l.process(i), u.process(i), c.process(i), h.process(i), f.process(i), p.process(i), d.process(i), i.isProcessing = false, n && e && (s = false, t(g));
  }, m = () => {
    n = true, s = true, i.isProcessing || t(g);
  };
  return { schedule: qt.reduce((x, T) => {
    const V = o[T];
    return x[T] = (C, M = false, P = false) => (n || m(), V.schedule(C, M, P)), x;
  }, {}), cancel: (x) => {
    for (let T = 0; T < qt.length; T++) o[qt[T]].cancel(x);
  }, state: i, steps: o };
}
const { schedule: L, cancel: ct, state: j, steps: Me } = Ni(typeof requestAnimationFrame < "u" ? requestAnimationFrame : X, true);
let ee;
function Mr() {
  ee = void 0;
}
const W = { now: () => (ee === void 0 && W.set(j.isProcessing || ut.useManualTiming ? j.timestamp : performance.now()), ee), set: (t) => {
  ee = t, queueMicrotask(Mr);
} }, Ui = (t) => (e) => typeof e == "string" && e.startsWith(t), Wi = Ui("--"), Dr = Ui("var(--"), Sn = (t) => Dr(t) ? Er.test(t.split("/*")[0].trim()) : false, Er = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function is(t) {
  return typeof t != "string" ? false : t.split("/*")[0].includes("var(--");
}
const Mt = { test: (t) => typeof t == "number", parse: parseFloat, transform: (t) => t }, Nt = { ...Mt, transform: (t) => st(0, 1, t) }, Zt = { ...Mt, default: 1 }, Ft = (t) => Math.round(t * 1e5) / 1e5, Pn = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Rr(t) {
  return t == null;
}
const Lr = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, An = (t, e) => (n) => !!(typeof n == "string" && Lr.test(n) && n.startsWith(t) || e && !Rr(n) && Object.prototype.hasOwnProperty.call(n, e)), Ki = (t, e, n) => (s) => {
  if (typeof s != "string") return s;
  const [i, r, o, a] = s.match(Pn);
  return { [t]: parseFloat(i), [e]: parseFloat(r), [n]: parseFloat(o), alpha: a !== void 0 ? parseFloat(a) : 1 };
}, kr = (t) => st(0, 255, t), De = { ...Mt, transform: (t) => Math.round(kr(t)) }, pt = { test: An("rgb", "red"), parse: Ki("red", "green", "blue"), transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + De.transform(t) + ", " + De.transform(e) + ", " + De.transform(n) + ", " + Ft(Nt.transform(s)) + ")" };
function Br(t) {
  let e = "", n = "", s = "", i = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), i = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), i = t.substring(4, 5), e += e, n += n, s += s, i += i), { red: parseInt(e, 16), green: parseInt(n, 16), blue: parseInt(s, 16), alpha: i ? parseInt(i, 16) / 255 : 1 };
}
const ze = { test: An("#"), parse: Br, transform: pt.transform }, Ht = (t) => ({ test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1, parse: parseFloat, transform: (e) => `${e}${t}` }), ot = Ht("deg"), nt = Ht("%"), S = Ht("px"), Fr = Ht("vh"), Ir = Ht("vw"), os = { ...nt, parse: (t) => nt.parse(t) / 100, transform: (t) => nt.transform(t * 100) }, St = { test: An("hsl", "hue"), parse: Ki("hue", "saturation", "lightness"), transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + nt.transform(Ft(e)) + ", " + nt.transform(Ft(n)) + ", " + Ft(Nt.transform(s)) + ")" }, I = { test: (t) => pt.test(t) || ze.test(t) || St.test(t), parse: (t) => pt.test(t) ? pt.parse(t) : St.test(t) ? St.parse(t) : ze.parse(t), transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? pt.transform(t) : St.transform(t), getAnimatableNone: (t) => {
  const e = I.parse(t);
  return e.alpha = 0, I.transform(e);
} }, Or = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function jr(t) {
  var _a2, _b;
  return isNaN(t) && typeof t == "string" && (((_a2 = t.match(Pn)) == null ? void 0 : _a2.length) || 0) + (((_b = t.match(Or)) == null ? void 0 : _b.length) || 0) > 0;
}
const $i = "number", zi = "color", Nr = "var", Ur = "var(", rs = "${}", Wr = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ct(t) {
  const e = t.toString(), n = [], s = { color: [], number: [], var: [] }, i = [];
  let r = 0;
  const a = e.replace(Wr, (l) => (I.test(l) ? (s.color.push(r), i.push(zi), n.push(I.parse(l))) : l.startsWith(Ur) ? (s.var.push(r), i.push(Nr), n.push(l)) : (s.number.push(r), i.push($i), n.push(parseFloat(l))), ++r, rs)).split(rs);
  return { values: n, split: a, indexes: s, types: i };
}
function Kr(t) {
  return Ct(t).values;
}
function Gi({ split: t, types: e }) {
  const n = t.length;
  return (s) => {
    let i = "";
    for (let r = 0; r < n; r++) if (i += t[r], s[r] !== void 0) {
      const o = e[r];
      o === $i ? i += Ft(s[r]) : o === zi ? i += I.transform(s[r]) : i += s[r];
    }
    return i;
  };
}
function $r(t) {
  return Gi(Ct(t));
}
const zr = (t) => typeof t == "number" ? 0 : I.test(t) ? I.getAnimatableNone(t) : t, Gr = (t, e) => typeof t == "number" ? (e == null ? void 0 : e.trim().endsWith("/")) ? t : 0 : zr(t);
function Hr(t) {
  const e = Ct(t);
  return Gi(e)(e.values.map((s, i) => Gr(s, e.split[i])));
}
const Z = { test: jr, parse: Kr, createTransformer: $r, getAnimatableNone: Hr };
function Ee(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function _r({ hue: t, saturation: e, lightness: n, alpha: s }) {
  t /= 360, e /= 100, n /= 100;
  let i = 0, r = 0, o = 0;
  if (!e) i = r = o = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    i = Ee(l, a, t + 1 / 3), r = Ee(l, a, t), o = Ee(l, a, t - 1 / 3);
  }
  return { red: Math.round(i * 255), green: Math.round(r * 255), blue: Math.round(o * 255), alpha: s };
}
function ce(t, e) {
  return (n) => n > 0 ? e : t;
}
const R = (t, e, n) => t + (e - t) * n, Re = (t, e, n) => {
  const s = t * t, i = n * (e * e - s) + s;
  return i < 0 ? 0 : Math.sqrt(i);
}, Xr = [ze, pt, St], Yr = (t) => Xr.find((e) => e.test(t));
function as(t) {
  const e = Yr(t);
  if (!e) return false;
  let n = e.parse(t);
  return e === St && (n = _r(n)), n;
}
const ls = (t, e) => {
  const n = as(t), s = as(e);
  if (!n || !s) return ce(t, e);
  const i = { ...n };
  return (r) => (i.red = Re(n.red, s.red, r), i.green = Re(n.green, s.green, r), i.blue = Re(n.blue, s.blue, r), i.alpha = R(n.alpha, s.alpha, r), pt.transform(i));
}, Ge = /* @__PURE__ */ new Set(["none", "hidden"]);
function qr(t, e) {
  return Ge.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function Zr(t, e) {
  return (n) => R(t, e, n);
}
function bn(t) {
  return typeof t == "number" ? Zr : typeof t == "string" ? Sn(t) ? ce : I.test(t) ? ls : ta : Array.isArray(t) ? Hi : typeof t == "object" ? I.test(t) ? ls : Jr : ce;
}
function Hi(t, e) {
  const n = [...t], s = n.length, i = t.map((r, o) => bn(r)(r, e[o]));
  return (r) => {
    for (let o = 0; o < s; o++) n[o] = i[o](r);
    return n;
  };
}
function Jr(t, e) {
  const n = { ...t, ...e }, s = {};
  for (const i in n) t[i] !== void 0 && e[i] !== void 0 && (s[i] = bn(t[i])(t[i], e[i]));
  return (i) => {
    for (const r in s) n[r] = s[r](i);
    return n;
  };
}
function Qr(t, e) {
  const n = [], s = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < e.values.length; i++) {
    const r = e.types[i], o = t.indexes[r][s[r]], a = t.values[o] ?? 0;
    n[i] = a, s[r]++;
  }
  return n;
}
const ta = (t, e) => {
  const n = Z.createTransformer(e), s = Ct(t), i = Ct(e);
  return s.indexes.var.length === i.indexes.var.length && s.indexes.color.length === i.indexes.color.length && s.indexes.number.length >= i.indexes.number.length ? Ge.has(t) && !i.values.length || Ge.has(e) && !s.values.length ? qr(t, e) : zt(Hi(Qr(s, i), i.values), n) : ce(t, e);
};
function _i(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? R(t, e, n) : bn(t)(t, e);
}
const ea = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return { start: (n = true) => L.update(e, n), stop: () => ct(e), now: () => j.isProcessing ? j.timestamp : W.now() };
}, Xi = (t, e, n = 10) => {
  let s = "";
  const i = Math.max(Math.round(e / n), 2);
  for (let r = 0; r < i; r++) s += Math.round(t(r / (i - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, he = 2e4;
function Vn(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < he; ) e += n, s = t.next(e);
  return e >= he ? 1 / 0 : e;
}
function Yi(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }), i = Math.min(Vn(s), he);
  return { type: "keyframes", ease: (r) => s.next(i * r).value / e, duration: _(i) };
}
const k = { stiffness: 100, damping: 10, mass: 1, velocity: 0, duration: 800, bounce: 0.3, visualDuration: 0.3, restSpeed: { granular: 0.01, default: 2 }, restDelta: { granular: 5e-3, default: 0.5 }, minDuration: 0.01, maxDuration: 10, minDamping: 0.05, maxDamping: 1 };
function He(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const na = 12;
function sa(t, e, n) {
  let s = n;
  for (let i = 1; i < na; i++) s = s - t(s) / e(s);
  return s;
}
const Le = 1e-3;
function ia({ duration: t = k.duration, bounce: e = k.bounce, velocity: n = k.velocity, mass: s = k.mass }) {
  let i, r, o = 1 - e;
  o = st(k.minDamping, k.maxDamping, o), t = st(k.minDuration, k.maxDuration, _(t)), o < 1 ? (i = (u) => {
    const c = u * o, h = c * t, f = c - n, p = He(u, o), d = Math.exp(-h);
    return Le - f / p * d;
  }, r = (u) => {
    const h = u * o * t, f = h * n + n, p = Math.pow(o, 2) * Math.pow(u, 2) * t, d = Math.exp(-h), g = He(Math.pow(u, 2), o);
    return (-i(u) + Le > 0 ? -1 : 1) * ((f - p) * d) / g;
  }) : (i = (u) => {
    const c = Math.exp(-u * t), h = (u - n) * t + 1;
    return -Le + c * h;
  }, r = (u) => {
    const c = Math.exp(-u * t), h = (n - u) * (t * t);
    return c * h;
  });
  const a = 5 / t, l = sa(i, r, a);
  if (t = z(t), isNaN(l)) return { stiffness: k.stiffness, damping: k.damping, duration: t };
  {
    const u = Math.pow(l, 2) * s;
    return { stiffness: u, damping: o * 2 * Math.sqrt(s * u), duration: t };
  }
}
const oa = ["duration", "bounce"], ra = ["stiffness", "damping", "mass"];
function us(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function aa(t) {
  let e = { velocity: k.velocity, stiffness: k.stiffness, damping: k.damping, mass: k.mass, isResolvedFromDuration: false, ...t };
  if (!us(t, ra) && us(t, oa)) if (e.velocity = 0, t.visualDuration) {
    const n = t.visualDuration, s = 2 * Math.PI / (n * 1.2), i = s * s, r = 2 * st(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(i);
    e = { ...e, mass: k.mass, stiffness: i, damping: r };
  } else {
    const n = ia({ ...t, velocity: 0 });
    e = { ...e, ...n, mass: k.mass }, e.isResolvedFromDuration = true;
  }
  return e;
}
function Ut(t = k.visualDuration, e = k.bounce) {
  const n = typeof t != "object" ? { visualDuration: t, keyframes: [0, 1], bounce: e } : t;
  let { restSpeed: s, restDelta: i } = n;
  const r = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: false, value: r }, { stiffness: l, damping: u, mass: c, duration: h, velocity: f, isResolvedFromDuration: p } = aa({ ...n, velocity: -_(n.velocity || 0) }), d = f || 0, g = u / (2 * Math.sqrt(l * c)), m = o - r, y = _(Math.sqrt(l / c)), v = Math.abs(m) < 5;
  s || (s = v ? k.restSpeed.granular : k.restSpeed.default), i || (i = v ? k.restDelta.granular : k.restDelta.default);
  let x, T, V, C, M, P;
  if (g < 1) V = He(y, g), C = (d + g * y * m) / V, x = (b) => {
    const D = Math.exp(-g * y * b);
    return o - D * (C * Math.sin(V * b) + m * Math.cos(V * b));
  }, M = g * y * C + m * V, P = g * y * m - C * V, T = (b) => Math.exp(-g * y * b) * (M * Math.sin(V * b) + P * Math.cos(V * b));
  else if (g === 1) {
    x = (D) => o - Math.exp(-y * D) * (m + (d + y * m) * D);
    const b = d + y * m;
    T = (D) => Math.exp(-y * D) * (y * b * D - d);
  } else {
    const b = y * Math.sqrt(g * g - 1);
    x = ($) => {
      const G = Math.exp(-g * y * $), H = Math.min(b * $, 300);
      return o - G * ((d + g * y * m) * Math.sinh(H) + b * m * Math.cosh(H)) / b;
    };
    const D = (d + g * y * m) / b, B = g * y * D - m * b, N = g * y * m - D * b;
    T = ($) => {
      const G = Math.exp(-g * y * $), H = Math.min(b * $, 300);
      return G * (B * Math.sinh(H) + N * Math.cosh(H));
    };
  }
  const A = { calculatedDuration: p && h || null, velocity: (b) => z(T(b)), next: (b) => {
    if (!p && g < 1) {
      const B = Math.exp(-g * y * b), N = Math.sin(V * b), $ = Math.cos(V * b), G = o - B * (C * N + m * $), H = z(B * (M * N + P * $));
      return a.done = Math.abs(H) <= s && Math.abs(o - G) <= i, a.value = a.done ? o : G, a;
    }
    const D = x(b);
    if (p) a.done = b >= h;
    else {
      const B = z(T(b));
      a.done = Math.abs(B) <= s && Math.abs(o - D) <= i;
    }
    return a.value = a.done ? o : D, a;
  }, toString: () => {
    const b = Math.min(Vn(A), he), D = Xi((B) => A.next(b * B).value, b, 30);
    return b + "ms " + D;
  }, toTransition: () => {
  } };
  return A;
}
Ut.applyToOptions = (t) => {
  const e = Yi(t, 100, Ut);
  return t.ease = e.ease, t.duration = z(e.duration), t.type = "keyframes", t;
};
const la = 5;
function qi(t, e, n) {
  const s = Math.max(e - la, 0);
  return Ci(n - t(s), e - s);
}
function _e({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: i = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const h = t[0], f = { done: false, value: h }, p = (P) => a !== void 0 && P < a || l !== void 0 && P > l, d = (P) => a === void 0 ? l : l === void 0 || Math.abs(a - P) < Math.abs(l - P) ? a : l;
  let g = n * e;
  const m = h + g, y = o === void 0 ? m : o(m);
  y !== m && (g = y - h);
  const v = (P) => -g * Math.exp(-P / s), x = (P) => y + v(P), T = (P) => {
    const A = v(P), b = x(P);
    f.done = Math.abs(A) <= u, f.value = f.done ? y : b;
  };
  let V, C;
  const M = (P) => {
    p(f.value) && (V = P, C = Ut({ keyframes: [f.value, d(f.value)], velocity: qi(x, P, f.value), damping: i, stiffness: r, restDelta: u, restSpeed: c }));
  };
  return M(0), { calculatedDuration: null, next: (P) => {
    let A = false;
    return !C && V === void 0 && (A = true, T(P), M(P)), V !== void 0 && P >= V ? C.next(P - V) : (!A && T(P), f);
  } };
}
function ua(t, e, n) {
  const s = [], i = n || ut.mix || _i, r = t.length - 1;
  for (let o = 0; o < r; o++) {
    let a = i(t[o], t[o + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[o] || X : e;
      a = zt(l, a);
    }
    s.push(a);
  }
  return s;
}
function ca(t, e, { clamp: n = true, ease: s, mixer: i } = {}) {
  const r = t.length;
  if (Se(r === e.length), r === 1) return () => e[0];
  if (r === 2 && e[0] === e[1]) return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[r - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = ua(e, s, i), l = a.length, u = (c) => {
    if (o && c < t[0]) return e[0];
    let h = 0;
    if (l > 1) for (; h < t.length - 2 && !(c < t[h + 1]); h++) ;
    const f = Vt(t[h], t[h + 1], c);
    return a[h](f);
  };
  return n ? (c) => u(st(t[0], t[r - 1], c)) : u;
}
function Zi(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const i = Vt(0, e, s);
    t.push(R(n, 1, i));
  }
}
function Ji(t) {
  const e = [0];
  return Zi(e, t.length - 1), e;
}
function ha(t, e) {
  return t.map((n) => n * e);
}
function fa(t, e) {
  return t.map(() => e || Fi).splice(0, t.length - 1);
}
function It({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const i = Ii(s) ? s.map(ss) : ss(s), r = { done: false, value: e[0] }, o = ha(n && n.length === e.length ? n : Ji(e), t), a = ca(o, e, { ease: Array.isArray(i) ? i : fa(e, i) });
  return { calculatedDuration: t, next: (l) => (r.value = a(l), r.done = l >= t, r) };
}
const da = (t) => t !== null;
function Pe(t, { repeat: e, repeatType: n = "loop" }, s, i = 1) {
  const r = t.filter(da), a = i < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : r.length - 1;
  return !a || s === void 0 ? r[a] : s;
}
const pa = { decay: _e, inertia: _e, tween: It, keyframes: It, spring: Ut };
function Qi(t) {
  typeof t.type == "string" && (t.type = pa[t.type]);
}
class Cn {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((e) => {
      this.resolve = e;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  then(e, n) {
    return this.finished.then(e, n);
  }
}
const ma = (t) => t / 100;
class fe extends Cn {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = false, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = { done: false, value: void 0 }, this.stop = () => {
      var _a2, _b;
      const { motionValue: n } = this.options;
      n && n.updatedAt !== W.now() && this.tick(W.now()), this.isStopped = true, this.state !== "idle" && (this.teardown(), (_b = (_a2 = this.options).onStop) == null ? void 0 : _b.call(_a2));
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === false && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    Qi(e);
    const { type: n = It, repeat: s = 0, repeatDelay: i = 0, repeatType: r, velocity: o = 0 } = e;
    let { keyframes: a } = e;
    const l = n || It;
    l !== It && typeof a[0] != "number" && (this.mixKeyframes = zt(ma, _i(a[0], a[1])), a = [0, 100]);
    const u = l({ ...e, keyframes: a });
    r === "mirror" && (this.mirroredGenerator = l({ ...e, keyframes: [...a].reverse(), velocity: -o })), u.calculatedDuration === null && (u.calculatedDuration = Vn(u));
    const { calculatedDuration: c } = u;
    this.calculatedDuration = c, this.resolvedDuration = c + i, this.totalDuration = this.resolvedDuration * (s + 1) - i, this.generator = u;
  }
  updateTime(e) {
    const n = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(e, n = false) {
    const { generator: s, totalDuration: i, mixKeyframes: r, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null) return s.next(0);
    const { delay: u = 0, keyframes: c, repeat: h, repeatType: f, repeatDelay: p, type: d, onUpdate: g, finalKeyframe: m } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - i / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
    const y = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), v = this.playbackSpeed >= 0 ? y < 0 : y > i;
    this.currentTime = Math.max(y, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = i);
    let x = this.currentTime, T = s;
    if (h) {
      const P = Math.min(this.currentTime, i) / a;
      let A = Math.floor(P), b = P % 1;
      !b && P >= 1 && (b = 1), b === 1 && A--, A = Math.min(A, h + 1), A % 2 && (f === "reverse" ? (b = 1 - b, p && (b -= p / a)) : f === "mirror" && (T = o)), x = st(0, 1, b) * a;
    }
    let V;
    v ? (this.delayState.value = c[0], V = this.delayState) : V = T.next(x), r && !v && (V.value = r(V.value));
    let { done: C } = V;
    !v && l !== null && (C = this.playbackSpeed >= 0 ? this.currentTime >= i : this.currentTime <= 0);
    const M = this.holdTime === null && (this.state === "finished" || this.state === "running" && C);
    return M && d !== _e && (V.value = Pe(c, this.options, m, this.speed)), g && g(V.value), M && this.finish(), V;
  }
  then(e, n) {
    return this.finished.then(e, n);
  }
  get duration() {
    return _(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + _(e);
  }
  get time() {
    return _(this.currentTime);
  }
  set time(e) {
    e = z(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(false) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
  }
  getGeneratorVelocity() {
    const e = this.currentTime;
    if (e <= 0) return this.options.velocity || 0;
    if (this.generator.velocity) return this.generator.velocity(e);
    const n = this.generator.next(e).value;
    return qi((s) => this.generator.next(s).value, e, n);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const n = this.playbackSpeed !== e;
    n && this.driver && this.updateTime(W.now()), this.playbackSpeed = e, n && this.driver && (this.time = _(this.currentTime));
  }
  play() {
    var _a2, _b;
    if (this.isStopped) return;
    const { driver: e = ea, startTime: n } = this.options;
    this.driver || (this.driver = e((i) => this.tick(i))), (_b = (_a2 = this.options).onPlay) == null ? void 0 : _b.call(_a2);
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = n ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(W.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    var _a2, _b;
    this.notifyFinished(), this.teardown(), this.state = "finished", (_b = (_a2 = this.options).onComplete) == null ? void 0 : _b.call(_a2);
  }
  cancel() {
    var _a2, _b;
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (_b = (_a2 = this.options).onCancel) == null ? void 0 : _b.call(_a2);
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, true);
  }
  attachTimeline(e) {
    var _a2;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (_a2 = this.driver) == null ? void 0 : _a2.stop(), e.observe(this);
  }
}
function ga(t) {
  for (let e = 1; e < t.length; e++) t[e] ?? (t[e] = t[e - 1]);
}
const mt = (t) => t * 180 / Math.PI, Xe = (t) => {
  const e = mt(Math.atan2(t[1], t[0]));
  return Ye(e);
}, ya = { x: 4, y: 5, translateX: 4, translateY: 5, scaleX: 0, scaleY: 3, scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2, rotate: Xe, rotateZ: Xe, skewX: (t) => mt(Math.atan(t[1])), skewY: (t) => mt(Math.atan(t[2])), skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2 }, Ye = (t) => (t = t % 360, t < 0 && (t += 360), t), cs = Xe, hs = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), fs = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), va = { x: 12, y: 13, z: 14, translateX: 12, translateY: 13, translateZ: 14, scaleX: hs, scaleY: fs, scale: (t) => (hs(t) + fs(t)) / 2, rotateX: (t) => Ye(mt(Math.atan2(t[6], t[5]))), rotateY: (t) => Ye(mt(Math.atan2(-t[2], t[0]))), rotateZ: cs, rotate: cs, skewX: (t) => mt(Math.atan(t[4])), skewY: (t) => mt(Math.atan(t[1])), skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2 };
function qe(t) {
  return t.includes("scale") ? 1 : 0;
}
function Ze(t, e) {
  if (!t || t === "none") return qe(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, i;
  if (n) s = va, i = n;
  else {
    const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = ya, i = a;
  }
  if (!i) return qe(e);
  const r = s[e], o = i[1].split(",").map(Ta);
  return typeof r == "function" ? r(o) : o[r];
}
const xa = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return Ze(n, e);
};
function Ta(t) {
  return parseFloat(t.trim());
}
const Dt = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"], Et = /* @__PURE__ */ new Set([...Dt, "pathRotation"]), ds = (t) => t === Mt || t === S, wa = /* @__PURE__ */ new Set(["x", "y", "z"]), Sa = Dt.filter((t) => !wa.has(t));
function Pa(t) {
  const e = [];
  return Sa.forEach((n) => {
    const s = t.getValue(n);
    s !== void 0 && (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const lt = { width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0", boxSizing: s }) => {
  const i = t.max - t.min;
  return s === "border-box" ? i : i - parseFloat(e) - parseFloat(n);
}, height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0", boxSizing: s }) => {
  const i = t.max - t.min;
  return s === "border-box" ? i : i - parseFloat(e) - parseFloat(n);
}, top: (t, { top: e }) => parseFloat(e), left: (t, { left: e }) => parseFloat(e), bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min), right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min), x: (t, { transform: e }) => Ze(e, "x"), y: (t, { transform: e }) => Ze(e, "y") };
lt.translateX = lt.x;
lt.translateY = lt.y;
const gt = /* @__PURE__ */ new Set();
let Je = false, Qe = false, tn = false;
function to() {
  if (Qe) {
    const t = Array.from(gt).filter((s) => s.needsMeasurement), e = new Set(t.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const i = Pa(s);
      i.length && (n.set(s, i), s.render());
    }), t.forEach((s) => s.measureInitialState()), e.forEach((s) => {
      s.render();
      const i = n.get(s);
      i && i.forEach(([r, o]) => {
        var _a2;
        (_a2 = s.getValue(r)) == null ? void 0 : _a2.set(o);
      });
    }), t.forEach((s) => s.measureEndState()), t.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  Qe = false, Je = false, gt.forEach((t) => t.complete(tn)), gt.clear();
}
function eo() {
  gt.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Qe = true);
  });
}
function Aa() {
  tn = true, eo(), to(), tn = false;
}
class Mn {
  constructor(e, n, s, i, r, o = false) {
    this.state = "pending", this.isAsync = false, this.needsMeasurement = false, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = i, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (gt.add(this), Je || (Je = true, L.read(eo), L.resolveKeyframes(to))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: s, motionValue: i } = this;
    if (e[0] === null) {
      const r = i == null ? void 0 : i.get(), o = e[e.length - 1];
      if (r !== void 0) e[0] = r;
      else if (s && n) {
        const a = s.readValue(n, o);
        a != null && (e[0] = a);
      }
      e[0] === void 0 && (e[0] = o), i && r === void 0 && i.set(e[0]);
    }
    ga(e);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(e = false) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), gt.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (gt.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const ba = (t) => t.startsWith("--");
function no(t, e, n) {
  ba(e) ? t.style.setProperty(e, n) : t.style[e] = n;
}
const Va = {};
function so(t, e) {
  const n = Vi(t);
  return () => Va[e] ?? n();
}
const Ca = so(() => window.ScrollTimeline !== void 0, "scrollTimeline"), io = so(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return false;
  }
  return true;
}, "linearEasing"), Bt = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`, ps = { linear: "linear", ease: "ease", easeIn: "ease-in", easeOut: "ease-out", easeInOut: "ease-in-out", circIn: Bt([0, 0.65, 0.55, 1]), circOut: Bt([0.55, 0, 1, 0.45]), backIn: Bt([0.31, 0.01, 0.66, -0.59]), backOut: Bt([0.33, 1.53, 0.69, 0.99]) };
function oo(t, e) {
  if (t) return typeof t == "function" ? io() ? Xi(t, e) : "ease-out" : ji(t) ? Bt(t) : Array.isArray(t) ? t.map((n) => oo(n, e) || ps.easeOut) : ps[t];
}
function Ma(t, e, n, { delay: s = 0, duration: i = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const c = { [e]: n };
  l && (c.offset = l);
  const h = oo(a, i);
  Array.isArray(h) && (c.easing = h);
  const f = { delay: s, duration: i, easing: Array.isArray(h) ? "linear" : h, fill: "both", iterations: r + 1, direction: o === "reverse" ? "alternate" : "normal" };
  return u && (f.pseudoElement = u), t.animate(c, f);
}
function Dn(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function Da({ type: t, ...e }) {
  return Dn(t) && io() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class ro extends Cn {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = false, this.manualStartTime = null, !e) return;
    const { element: n, name: s, keyframes: i, pseudoElement: r, allowFlatten: o = false, finalKeyframe: a, onComplete: l } = e;
    this.isPseudoElement = !!r, this.allowFlatten = o, this.options = e, Se(typeof e.type != "string");
    const u = Da(e);
    this.animation = Ma(n, s, i, u, r), u.autoplay === false && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const c = Pe(i, this.options, a, this.speed);
        this.updateMotionValue && this.updateMotionValue(c), no(n, s, c), this.animation.cancel();
      }
      l == null ? void 0 : l(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var _a2, _b;
    (_b = (_a2 = this.animation).finish) == null ? void 0 : _b.call(_a2);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped) return;
    this.isStopped = true;
    const { state: e } = this;
    e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  commitStyles() {
    var _a2, _b, _c2;
    const e = (_a2 = this.options) == null ? void 0 : _a2.element;
    !this.isPseudoElement && (e == null ? void 0 : e.isConnected) && ((_c2 = (_b = this.animation).commitStyles) == null ? void 0 : _c2.call(_b));
  }
  get duration() {
    var _a2, _b;
    const e = ((_b = (_a2 = this.animation.effect) == null ? void 0 : _a2.getComputedTiming) == null ? void 0 : _b.call(_a2).duration) || 0;
    return _(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + _(e);
  }
  get time() {
    return _(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    const n = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = z(e), n && this.animation.pause();
  }
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(e) {
    this.manualStartTime = this.animation.startTime = e;
  }
  attachTimeline({ timeline: e, rangeStart: n, rangeEnd: s, observe: i }) {
    var _a2;
    return this.allowFlatten && ((_a2 = this.animation.effect) == null ? void 0 : _a2.updateTiming({ easing: "linear" })), this.animation.onfinish = null, e && Ca() ? (this.animation.timeline = e, n && (this.animation.rangeStart = n), s && (this.animation.rangeEnd = s), X) : i(this);
  }
}
const ao = { anticipate: Li, backInOut: Ri, circInOut: Bi };
function Ea(t) {
  return t in ao;
}
function Ra(t) {
  typeof t.ease == "string" && Ea(t.ease) && (t.ease = ao[t.ease]);
}
const ke = 10;
class La extends ro {
  constructor(e) {
    Ra(e), Qi(e), super(e), e.startTime !== void 0 && e.autoplay !== false && (this.startTime = e.startTime), this.options = e;
  }
  updateMotionValue(e) {
    const { motionValue: n, onUpdate: s, onComplete: i, element: r, ...o } = this.options;
    if (!n) return;
    if (e !== void 0) {
      n.set(e);
      return;
    }
    const a = new fe({ ...o, autoplay: false }), l = Math.max(ke, W.now() - this.startTime), u = st(0, ke, l - ke), c = a.sample(l).value, { name: h } = this.options;
    r && h && no(r, h, c), n.setWithVelocity(a.sample(Math.max(0, l - u)).value, c, u), a.stop();
  }
}
const ms = (t, e) => e === "zIndex" ? false : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && (Z.test(t) || t === "0") && !t.startsWith("url("));
function ka(t) {
  const e = t[0];
  if (t.length === 1) return true;
  for (let n = 0; n < t.length; n++) if (t[n] !== e) return true;
}
function Ba(t, e, n, s) {
  const i = t[0];
  if (i === null) return false;
  if (e === "display" || e === "visibility") return true;
  const r = t[t.length - 1], o = ms(i, e), a = ms(r, e);
  return !o || !a ? false : ka(t) || (n === "spring" || Dn(n)) && s;
}
function en(t) {
  t.duration = 0, t.type = "keyframes";
}
const lo = /* @__PURE__ */ new Set(["opacity", "clipPath", "filter", "transform", "backgroundColor"]), Fa = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Ia(t) {
  for (let e = 0; e < t.length; e++) if (typeof t[e] == "string" && Fa.test(t[e])) return true;
  return false;
}
const Oa = /* @__PURE__ */ new Set(["color", "backgroundColor", "outlineColor", "fill", "stroke", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"]), ja = Vi(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Na(t) {
  var _a2;
  const { motionValue: e, name: n, repeatDelay: s, repeatType: i, damping: r, type: o, keyframes: a } = t, l = (_a2 = e == null ? void 0 : e.owner) == null ? void 0 : _a2.current;
  if (!(l instanceof HTMLElement) && !(l instanceof SVGElement)) return false;
  const { onUpdate: u, transformTemplate: c } = e.owner.getProps();
  return ja() && n && (lo.has(n) || Oa.has(n) && Ia(a)) && (n !== "transform" || !c) && !u && !s && i !== "mirror" && r !== 0 && o !== "inertia";
}
const Ua = 40;
class Wa extends Cn {
  constructor({ autoplay: e = true, delay: n = 0, type: s = "keyframes", repeat: i = 0, repeatDelay: r = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: u, element: c, ...h }) {
    var _a2;
    super(), this.stop = () => {
      var _a3, _b;
      this._animation && (this._animation.stop(), (_a3 = this.stopTimeline) == null ? void 0 : _a3.call(this)), (_b = this.keyframeResolver) == null ? void 0 : _b.cancel();
    }, this.createdAt = W.now();
    const f = { autoplay: e, delay: n, type: s, repeat: i, repeatDelay: r, repeatType: o, name: l, motionValue: u, element: c, ...h }, p = (c == null ? void 0 : c.KeyframeResolver) || Mn;
    this.keyframeResolver = new p(a, (d, g, m) => this.onKeyframesResolved(d, g, f, !m), l, u, c), (_a2 = this.keyframeResolver) == null ? void 0 : _a2.scheduleResolve();
  }
  onKeyframesResolved(e, n, s, i) {
    var _a2, _b;
    this.keyframeResolver = void 0;
    const { name: r, type: o, velocity: a, delay: l, isHandoff: u, onUpdate: c } = s;
    this.resolvedAt = W.now();
    let h = true;
    Ba(e, r, o, a) || (h = false, (ut.instantAnimations || !l) && (c == null ? void 0 : c(Pe(e, s, n))), e[0] = e[e.length - 1], en(s), s.repeat = 0);
    const p = { startTime: i ? this.resolvedAt ? this.resolvedAt - this.createdAt > Ua ? this.resolvedAt : this.createdAt : this.createdAt : void 0, finalKeyframe: n, ...s, keyframes: e }, d = h && !u && Na(p), g = (_b = (_a2 = p.motionValue) == null ? void 0 : _a2.owner) == null ? void 0 : _b.current;
    let m;
    if (d) try {
      m = new La({ ...p, element: g });
    } catch {
      m = new fe(p);
    }
    else m = new fe(p);
    m.finished.then(() => {
      this.notifyFinished();
    }).catch(X), this.pendingTimeline && (this.stopTimeline = m.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = m;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    var _a2;
    return this._animation || ((_a2 = this.keyframeResolver) == null ? void 0 : _a2.resume(), Aa()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var _a2;
    this._animation && this.animation.cancel(), (_a2 = this.keyframeResolver) == null ? void 0 : _a2.cancel();
  }
}
class Ka {
  constructor(e) {
    this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((e) => e.finished));
  }
  getAll(e) {
    return this.animations[0][e];
  }
  setAll(e, n) {
    for (let s = 0; s < this.animations.length; s++) this.animations[s][e] = n;
  }
  attachTimeline(e) {
    const n = this.animations.map((s) => s.attachTimeline(e));
    return () => {
      n.forEach((s, i) => {
        s && s(), this.animations[i].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(e) {
    this.setAll("time", e);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(e) {
    this.setAll("speed", e);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return gs(this.animations, "duration");
  }
  get iterationDuration() {
    return gs(this.animations, "iterationDuration");
  }
  runAll(e) {
    this.animations.forEach((n) => n[e]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
function gs(t, e) {
  let n = 0;
  for (let s = 0; s < t.length; s++) {
    const i = t[s][e];
    i !== null && i > n && (n = i);
  }
  return n;
}
class $a extends Ka {
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
}
function uo(t, e, n, s = 0, i = 1) {
  const r = Array.from(t).sort((u, c) => u.sortNodePosition(c)).indexOf(e), o = t.size, a = (o - 1) * s;
  return typeof n == "function" ? n(r, o) : i === 1 ? r * s : a - r * s;
}
const ys = 30, za = (t) => !isNaN(parseFloat(t));
class Ga {
  constructor(e, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      var _a2;
      const i = W.now();
      if (this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && ((_a2 = this.events.change) == null ? void 0 : _a2.notify(this.current), this.dependents)) for (const r of this.dependents) r.dirty();
    }, this.hasAnimated = false, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = W.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = za(this.current));
  }
  setPrevFrameValue(e = this.current) {
    this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
  }
  onChange(e) {
    return this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new vn());
    const s = this.events[e].add(n);
    return e === "change" ? () => {
      s(), L.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const e in this.events) this.events[e].clear();
  }
  attach(e, n) {
    this.passiveEffect = e, this.stopPassiveEffect = n;
  }
  set(e) {
    this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
  }
  setWithVelocity(e, n, s) {
    this.set(n), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - s;
  }
  jump(e, n = true) {
    this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var _a2;
    (_a2 = this.events.change) == null ? void 0 : _a2.notify(this.current);
  }
  addDependent(e) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(e);
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const e = W.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > ys) return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, ys);
    return Ci(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  start(e) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = true, this.animation = e(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    var _a2, _b;
    (_a2 = this.dependents) == null ? void 0 : _a2.clear(), (_b = this.events.destroy) == null ? void 0 : _b.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function vt(t, e) {
  return new Ga(t, e);
}
function co(t, e) {
  if ((t == null ? void 0 : t.inherit) && e) {
    const { inherit: n, ...s } = t;
    return { ...e, ...s };
  }
  return t;
}
function En(t, e) {
  const n = (t == null ? void 0 : t[e]) ?? (t == null ? void 0 : t.default) ?? t;
  return n !== t ? co(n, t) : n;
}
const Ha = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 }, _a = (t) => ({ type: "spring", stiffness: 550, damping: t === 0 ? 2 * Math.sqrt(550) : 30, restSpeed: 10 }), Xa = { type: "keyframes", duration: 0.8 }, Ya = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 }, qa = (t, { keyframes: e }) => e.length > 2 ? Xa : Et.has(t) ? t.startsWith("scale") ? _a(e[1]) : Ha : Ya, Za = /* @__PURE__ */ new Set(["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from", "elapsed"]);
function Ja(t) {
  for (const e in t) if (!Za.has(e)) return true;
  return false;
}
const Rn = (t, e, n, s = {}, i, r) => (o) => {
  const a = En(s, t) || {}, l = a.delay || s.delay || 0;
  let { elapsed: u = 0 } = s;
  u = u - z(l);
  const c = { keyframes: Array.isArray(n) ? n : [null, n], ease: "easeOut", velocity: e.getVelocity(), ...a, delay: -u, onUpdate: (f) => {
    e.set(f), a.onUpdate && a.onUpdate(f);
  }, onComplete: () => {
    o(), a.onComplete && a.onComplete();
  }, name: t, motionValue: e, element: r ? void 0 : i };
  Ja(a) || Object.assign(c, qa(t, c)), c.duration && (c.duration = z(c.duration)), c.repeatDelay && (c.repeatDelay = z(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let h = false;
  if ((c.type === false || c.duration === 0 && !c.repeatDelay) && (en(c), c.delay === 0 && (h = true)), (ut.instantAnimations || ut.skipAnimations || (i == null ? void 0 : i.shouldSkipAnimations) || a.skipAnimations) && (h = true, en(c), c.delay = 0), c.allowFlatten = !a.type && !a.ease, h && !r && e.get() !== void 0) {
    const f = Pe(c.keyframes, a);
    if (f !== void 0) {
      L.update(() => {
        c.onUpdate(f), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new fe(c) : new Wa(c);
}, Qa = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function tl(t) {
  const e = Qa.exec(t);
  if (!e) return [,];
  const [, n, s, i] = e;
  return [`--${n ?? s}`, i];
}
function ho(t, e, n = 1) {
  const [s, i] = tl(t);
  if (!s) return;
  const r = window.getComputedStyle(e).getPropertyValue(s);
  if (r) {
    const o = r.trim();
    return Pi(o) ? parseFloat(o) : o;
  }
  return Sn(i) ? ho(i, e, n + 1) : i;
}
function vs(t) {
  const e = [{}, {}];
  return t == null ? void 0 : t.values.forEach((n, s) => {
    e[0][s] = n.get(), e[1][s] = n.getVelocity();
  }), e;
}
function Ln(t, e, n, s) {
  if (typeof e == "function") {
    const [i, r] = vs(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [i, r] = vs(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  return e;
}
function yt(t, e, n) {
  const s = t.getProps();
  return Ln(s, e, n !== void 0 ? n : s.custom, t);
}
const fo = /* @__PURE__ */ new Set(["width", "height", "top", "left", "right", "bottom", ...Dt]), nn = (t) => Array.isArray(t);
function el(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, vt(n));
}
function nl(t) {
  return nn(t) ? t[t.length - 1] || 0 : t;
}
function kn(t, e) {
  const n = yt(t, e);
  let { transitionEnd: s = {}, transition: i = {}, ...r } = n || {};
  r = { ...r, ...s };
  for (const o in r) {
    const a = nl(r[o]);
    el(t, o, a);
  }
}
const O = (t) => !!(t && t.getVelocity);
function sl(t) {
  return !!(O(t) && t.add);
}
function sn(t, e) {
  const n = t.getValue("willChange");
  if (sl(n)) return n.add(e);
  if (!n && ut.WillChange) {
    const s = new ut.WillChange("auto");
    t.addValue("willChange", s), s.add(e);
  }
}
function Bn(t) {
  return t.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
const il = "framerAppearId", po = "data-" + Bn(il);
function mo(t) {
  return t.props[po];
}
function ol({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== true;
  return e[n] = false, s;
}
function Fn(t, e, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  let { transition: r, transitionEnd: o, ...a } = e;
  const l = t.getDefaultTransition();
  r = r ? co(r, l) : l;
  const u = r == null ? void 0 : r.reduceMotion, c = r == null ? void 0 : r.skipAnimations;
  s && (r = s);
  const h = [], f = i && t.animationState && t.animationState.getState()[i], p = r == null ? void 0 : r.path;
  p && p.animateVisualElement(t, a, r, n, h);
  for (const d in a) {
    const g = t.getValue(d, t.latestValues[d] ?? null), m = a[d];
    if (m === void 0 || f && ol(f, d)) continue;
    const y = { delay: n, ...En(r || {}, d) };
    c && (y.skipAnimations = true);
    const v = g.get();
    if (v !== void 0 && !g.isAnimating() && !Array.isArray(m) && m === v && !y.velocity) {
      L.update(() => g.set(m));
      continue;
    }
    let x = false;
    if (window.MotionHandoffAnimation) {
      const C = mo(t);
      if (C) {
        const M = window.MotionHandoffAnimation(C, d, L);
        M !== null && (y.startTime = M, x = true);
      }
    }
    sn(t, d);
    const T = u ?? t.shouldReduceMotion;
    g.start(Rn(d, g, m, T && fo.has(d) ? { type: false } : y, t, x));
    const V = g.animation;
    V && h.push(V);
  }
  if (o) {
    const d = () => L.update(() => {
      o && kn(t, o);
    });
    h.length ? Promise.all(h).then(d) : d();
  }
  return h;
}
function on(t, e, n = {}) {
  var _a2;
  const s = yt(t, e, n.type === "exit" ? (_a2 = t.presenceContext) == null ? void 0 : _a2.custom : void 0);
  let { transition: i = t.getDefaultTransition() || {} } = s || {};
  n.transitionOverride && (i = n.transitionOverride);
  const r = s ? () => Promise.all(Fn(t, s, n)) : () => Promise.resolve(), o = t.variantChildren && t.variantChildren.size ? (l = 0) => {
    const { delayChildren: u = 0, staggerChildren: c, staggerDirection: h } = i;
    return rl(t, e, l, u, c, h, n);
  } : () => Promise.resolve(), { when: a } = i;
  if (a) {
    const [l, u] = a === "beforeChildren" ? [r, o] : [o, r];
    return l().then(() => u());
  } else return Promise.all([r(), o(n.delay)]);
}
function rl(t, e, n = 0, s = 0, i = 0, r = 1, o) {
  const a = [];
  for (const l of t.variantChildren) l.notify("AnimationStart", e), a.push(on(l, e, { ...o, delay: n + (typeof s == "function" ? 0 : s) + uo(t.variantChildren, l, s, i, r) }).then(() => l.notify("AnimationComplete", e)));
  return Promise.all(a);
}
function go(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let s;
  if (Array.isArray(e)) {
    const i = e.map((r) => on(t, r, n));
    s = Promise.all(i);
  } else if (typeof e == "string") s = on(t, e, n);
  else {
    const i = typeof e == "function" ? yt(t, e, n.custom) : e;
    s = Promise.all(Fn(t, i, n));
  }
  return s.then(() => {
    t.notify("AnimationComplete", e);
  });
}
const al = { test: (t) => t === "auto", parse: (t) => t }, yo = (t) => (e) => e.test(t), vo = [Mt, S, nt, ot, Ir, Fr, al], xs = (t) => vo.find(yo(t));
function ll(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || bi(t) : true;
}
const ul = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function cl(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow") return t;
  const [s] = n.match(Pn) || [];
  if (!s) return t;
  const i = n.replace(s, "");
  let r = ul.has(e) ? 1 : 0;
  return s !== n && (r *= 100), e + "(" + r + i + ")";
}
const hl = /\b([a-z-]*)\(.*?\)/gu, rn = { ...Z, getAnimatableNone: (t) => {
  const e = t.match(hl);
  return e ? e.map(cl).join(" ") : t;
} }, an = { ...Z, getAnimatableNone: (t) => {
  const e = Z.parse(t);
  return Z.createTransformer(t)(e.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
} }, Ts = { ...Mt, transform: Math.round }, fl = { rotate: ot, pathRotation: ot, rotateX: ot, rotateY: ot, rotateZ: ot, scale: Zt, scaleX: Zt, scaleY: Zt, scaleZ: Zt, skew: ot, skewX: ot, skewY: ot, distance: S, translateX: S, translateY: S, translateZ: S, x: S, y: S, z: S, perspective: S, transformPerspective: S, opacity: Nt, originX: os, originY: os, originZ: S }, de = { borderWidth: S, borderTopWidth: S, borderRightWidth: S, borderBottomWidth: S, borderLeftWidth: S, borderRadius: S, borderTopLeftRadius: S, borderTopRightRadius: S, borderBottomRightRadius: S, borderBottomLeftRadius: S, width: S, maxWidth: S, height: S, maxHeight: S, top: S, right: S, bottom: S, left: S, inset: S, insetBlock: S, insetBlockStart: S, insetBlockEnd: S, insetInline: S, insetInlineStart: S, insetInlineEnd: S, padding: S, paddingTop: S, paddingRight: S, paddingBottom: S, paddingLeft: S, paddingBlock: S, paddingBlockStart: S, paddingBlockEnd: S, paddingInline: S, paddingInlineStart: S, paddingInlineEnd: S, margin: S, marginTop: S, marginRight: S, marginBottom: S, marginLeft: S, marginBlock: S, marginBlockStart: S, marginBlockEnd: S, marginInline: S, marginInlineStart: S, marginInlineEnd: S, fontSize: S, backgroundPositionX: S, backgroundPositionY: S, ...fl, zIndex: Ts, fillOpacity: Nt, strokeOpacity: Nt, numOctaves: Ts }, dl = { ...de, color: I, backgroundColor: I, outlineColor: I, fill: I, stroke: I, borderColor: I, borderTopColor: I, borderRightColor: I, borderBottomColor: I, borderLeftColor: I, filter: rn, WebkitFilter: rn, mask: an, WebkitMask: an }, xo = (t) => dl[t], pl = /* @__PURE__ */ new Set([rn, an]);
function To(t, e) {
  let n = xo(t);
  return pl.has(n) || (n = Z), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const ml = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function gl(t, e, n) {
  let s = 0, i;
  for (; s < t.length && !i; ) {
    const r = t[s];
    typeof r == "string" && !ml.has(r) && Ct(r).values.length && (i = t[s]), s++;
  }
  if (i && n) for (const r of e) t[r] = To(n, i);
}
class yl extends Mn {
  constructor(e, n, s, i, r) {
    super(e, n, s, i, r, true);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: s } = this;
    if (!n || !n.current) return;
    super.readKeyframes();
    for (let c = 0; c < e.length; c++) {
      let h = e[c];
      if (typeof h == "string" && (h = h.trim(), Sn(h))) {
        const f = ho(h, n.current);
        f !== void 0 && (e[c] = f), c === e.length - 1 && (this.finalKeyframe = h);
      }
    }
    if (this.resolveNoneKeyframes(), !fo.has(s) || e.length !== 2) return;
    const [i, r] = e, o = xs(i), a = xs(r), l = is(i), u = is(r);
    if (l !== u && lt[s]) {
      this.needsMeasurement = true;
      return;
    }
    if (o !== a) if (ds(o) && ds(a)) for (let c = 0; c < e.length; c++) {
      const h = e[c];
      typeof h == "string" && (e[c] = parseFloat(h));
    }
    else lt[s] && (this.needsMeasurement = true);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, s = [];
    for (let i = 0; i < e.length; i++) (e[i] === null || ll(e[i])) && s.push(i);
    s.length && gl(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current) return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = lt[s](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const i = n[n.length - 1];
    i !== void 0 && e.getValue(s, i).jump(i, false);
  }
  measureEndState() {
    var _a2;
    const { element: e, name: n, unresolvedKeyframes: s } = this;
    if (!e || !e.current) return;
    const i = e.getValue(n);
    i && i.jump(this.measuredOrigin, false);
    const r = s.length - 1, o = s[r];
    s[r] = lt[n](e.measureViewportBox(), window.getComputedStyle(e.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), ((_a2 = this.removedTransforms) == null ? void 0 : _a2.length) && this.removedTransforms.forEach(([a, l]) => {
      e.getValue(a).set(l);
    }), this.resolveNoneKeyframes();
  }
}
const In = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"];
function On(t, e, n) {
  if (t == null) return [];
  if (t instanceof EventTarget) return [t];
  if (typeof t == "string") {
    let s = document;
    e && (s = e.current);
    const i = (n == null ? void 0 : n[t]) ?? s.querySelectorAll(t);
    return i ? Array.from(i) : [];
  }
  return Array.from(t).filter((s) => s != null);
}
const ln = (t, e) => e && typeof t == "number" ? e.transform(t) : t;
function ne(t) {
  return Ai(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: jn } = Ni(queueMicrotask, false), q = { x: false, y: false };
function wo() {
  return q.x || q.y;
}
function vl(t) {
  return t === "x" || t === "y" ? q[t] ? null : (q[t] = true, () => {
    q[t] = false;
  }) : q.x || q.y ? null : (q.x = q.y = true, () => {
    q.x = q.y = false;
  });
}
function So(t, e) {
  const n = On(t), s = new AbortController(), i = { passive: true, ...e, signal: s.signal };
  return [n, i, () => s.abort()];
}
function xl(t) {
  return !(t.pointerType === "touch" || wo());
}
function Tl(t, e, n = {}) {
  const [s, i, r] = So(t, n);
  return s.forEach((o) => {
    let a = false, l = false, u;
    const c = () => {
      o.removeEventListener("pointerleave", d);
    }, h = (m) => {
      u && (u(m), u = void 0), c();
    }, f = (m) => {
      a = false, window.removeEventListener("pointerup", f), window.removeEventListener("pointercancel", f), l && (l = false, h(m));
    }, p = () => {
      a = true, window.addEventListener("pointerup", f, i), window.addEventListener("pointercancel", f, i);
    }, d = (m) => {
      if (m.pointerType !== "touch") {
        if (a) {
          l = true;
          return;
        }
        h(m);
      }
    }, g = (m) => {
      if (!xl(m)) return;
      l = false;
      const y = e(o, m);
      typeof y == "function" && (u = y, o.addEventListener("pointerleave", d, i));
    };
    o.addEventListener("pointerenter", g, i), o.addEventListener("pointerdown", p, i);
  }), r;
}
const Po = (t, e) => e ? t === e ? true : Po(t, e.parentElement) : false, Nn = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== false, wl = /* @__PURE__ */ new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function Sl(t) {
  return wl.has(t.tagName) || t.isContentEditable === true;
}
const Pl = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function Al(t) {
  return Pl.has(t.tagName) || t.isContentEditable === true;
}
const se = /* @__PURE__ */ new WeakSet();
function ws(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function Be(t, e) {
  t.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: true, bubbles: true }));
}
const bl = (t, e) => {
  const n = t.currentTarget;
  if (!n) return;
  const s = ws(() => {
    if (se.has(n)) return;
    Be(n, "down");
    const i = ws(() => {
      Be(n, "up");
    }), r = () => Be(n, "cancel");
    n.addEventListener("keyup", i, e), n.addEventListener("blur", r, e);
  });
  n.addEventListener("keydown", s, e), n.addEventListener("blur", () => n.removeEventListener("keydown", s), e);
};
function Ss(t) {
  return Nn(t) && !wo();
}
const Ps = /* @__PURE__ */ new WeakSet();
function Vl(t, e, n = {}) {
  const [s, i, r] = So(t, n), o = (a) => {
    const l = a.currentTarget;
    if (!Ss(a) || Ps.has(a)) return;
    se.add(l), n.stopPropagation && Ps.add(a);
    const u = e(l, a), c = { ...i, capture: true }, h = (d, g) => {
      window.removeEventListener("pointerup", f, c), window.removeEventListener("pointercancel", p, c), se.has(l) && se.delete(l), Ss(d) && typeof u == "function" && u(d, { success: g });
    }, f = (d) => {
      h(d, l === window || l === document || n.useGlobalTarget || Po(l, d.target));
    }, p = (d) => {
      h(d, false);
    };
    window.addEventListener("pointerup", f, c), window.addEventListener("pointercancel", p, c);
  };
  return s.forEach((a) => {
    (n.useGlobalTarget ? window : a).addEventListener("pointerdown", o, i), ne(a) && (a.addEventListener("focus", (u) => bl(u, i)), !Sl(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
  }), r;
}
function Ae(t) {
  return Ai(t) && "ownerSVGElement" in t;
}
const ie = /* @__PURE__ */ new WeakMap();
let oe;
const Ao = (t, e, n) => (s, i) => i && i[0] ? i[0][t + "Size"] : Ae(s) && "getBBox" in s ? s.getBBox()[e] : s[n], Cl = Ao("inline", "width", "offsetWidth"), Ml = Ao("block", "height", "offsetHeight");
function Dl({ target: t, borderBoxSize: e }) {
  var _a2;
  (_a2 = ie.get(t)) == null ? void 0 : _a2.forEach((n) => {
    n(t, { get width() {
      return Cl(t, e);
    }, get height() {
      return Ml(t, e);
    } });
  });
}
function El(t) {
  t.forEach(Dl);
}
function Rl() {
  typeof ResizeObserver > "u" || (oe = new ResizeObserver(El));
}
function Ll(t, e) {
  oe || Rl();
  const n = On(t);
  return n.forEach((s) => {
    let i = ie.get(s);
    i || (i = /* @__PURE__ */ new Set(), ie.set(s, i)), i.add(e), oe == null ? void 0 : oe.observe(s);
  }), () => {
    n.forEach((s) => {
      const i = ie.get(s);
      i == null ? void 0 : i.delete(e), (i == null ? void 0 : i.size) || (oe == null ? void 0 : oe.unobserve(s));
    });
  };
}
const re = /* @__PURE__ */ new Set();
let Pt;
function kl() {
  Pt = () => {
    const t = { get width() {
      return window.innerWidth;
    }, get height() {
      return window.innerHeight;
    } };
    re.forEach((e) => e(t));
  }, window.addEventListener("resize", Pt);
}
function Bl(t) {
  return re.add(t), Pt || kl(), () => {
    re.delete(t), !re.size && typeof Pt == "function" && (window.removeEventListener("resize", Pt), Pt = void 0);
  };
}
function As(t, e) {
  return typeof t == "function" ? Bl(t) : Ll(t, e);
}
function bo(t) {
  return Ae(t) && t.tagName === "svg";
}
const Fl = [...vo, I, Z], Il = (t) => Fl.find(yo(t)), bs = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }), At = () => ({ x: bs(), y: bs() }), Vs = () => ({ min: 0, max: 0 }), F = () => ({ x: Vs(), y: Vs() }), Wt = /* @__PURE__ */ new WeakMap();
function be(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Kt(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Un = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"], Wn = ["initial", ...Un];
function Ve(t) {
  return be(t.animate) || Wn.some((e) => Kt(t[e]));
}
function Vo(t) {
  return !!(Ve(t) || t.variants);
}
function Ol(t, e, n) {
  for (const s in e) {
    const i = e[s], r = n[s];
    if (O(i)) t.addValue(s, i);
    else if (O(r)) t.addValue(s, vt(i, { owner: t }));
    else if (r !== i) if (t.hasValue(s)) {
      const o = t.getValue(s);
      o.liveStyle === true ? o.jump(i) : o.hasAnimated || o.set(i);
    } else {
      const o = t.getStaticValue(s);
      t.addValue(s, vt(o !== void 0 ? o : i, { owner: t }));
    }
  }
  for (const s in n) e[s] === void 0 && t.removeValue(s);
  return e;
}
const pe = { current: null }, Kn = { current: false }, jl = typeof window < "u";
function Co() {
  if (Kn.current = true, !!jl) if (window.matchMedia) {
    const t = window.matchMedia("(prefers-reduced-motion)"), e = () => pe.current = t.matches;
    t.addEventListener("change", e), e();
  } else pe.current = false;
}
const Cs = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure", "LayoutAnimationStart", "LayoutAnimationComplete"];
let me = {};
function Mo(t) {
  me = t;
}
function Nl() {
  return me;
}
class Do {
  scrapeMotionValuesFromProps(e, n, s) {
    return {};
  }
  constructor({ parent: e, props: n, presenceContext: s, reducedMotionConfig: i, skipAnimations: r, blockInitialAnimation: o, visualState: a }, l = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = false, this.isControllingVariants = false, this.shouldReduceMotion = null, this.shouldSkipAnimations = false, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Mn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = false, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const p = W.now();
      this.renderScheduledAt < p && (this.renderScheduledAt = p, L.render(this.render, false, true));
    };
    const { latestValues: u, renderState: c } = a;
    this.latestValues = u, this.baseTarget = { ...u }, this.initialValues = n.initial ? { ...u } : {}, this.renderState = c, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = i, this.skipAnimationsConfig = r, this.options = l, this.blockInitialAnimation = !!o, this.isControllingVariants = Ve(n), this.isVariantNode = Vo(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: h, ...f } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const p in f) {
      const d = f[p];
      u[p] !== void 0 && O(d) && d.set(u[p]);
    }
  }
  mount(e) {
    var _a2, _b;
    if (this.hasBeenMounted) for (const n in this.initialValues) (_a2 = this.values.get(n)) == null ? void 0 : _a2.jump(this.initialValues[n]), this.latestValues[n] = this.initialValues[n];
    this.current = e, Wt.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = false : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = true : (Kn.current || Co(), this.shouldReduceMotion = pe.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? false, (_b = this.parent) == null ? void 0 : _b.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = true;
  }
  unmount() {
    var _a2;
    this.projection && this.projection.unmount(), ct(this.notifyUpdate), ct(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (_a2 = this.parent) == null ? void 0 : _a2.removeChild(this);
    for (const e in this.events) this.events[e].clear();
    for (const e in this.features) {
      const n = this.features[e];
      n && (n.unmount(), n.isMounted = false);
    }
    this.current = null;
  }
  addChild(e) {
    this.children.add(e), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(e);
  }
  removeChild(e) {
    this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
  }
  bindToMotionValue(e, n) {
    if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), n.accelerate && lo.has(e) && this.current instanceof HTMLElement) {
      const { factory: o, keyframes: a, times: l, ease: u, duration: c } = n.accelerate, h = new ro({ element: this.current, name: e, keyframes: a, times: l, ease: u, duration: z(c) }), f = o(h);
      this.valueSubscriptions.set(e, () => {
        f(), h.cancel();
      });
      return;
    }
    const s = Et.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (o) => {
      this.latestValues[e] = o, this.props.onUpdate && L.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = true), this.scheduleRender();
    });
    let r;
    typeof window < "u" && window.MotionCheckAppearSync && (r = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      i(), r && r();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in me) {
      const n = me[e];
      if (!n) continue;
      const { isEnabled: s, Feature: i } = n;
      if (!this.features[e] && i && s(this.props) && (this.features[e] = new i(this)), this.features[e]) {
        const r = this.features[e];
        r.isMounted ? r.update() : (r.mount(), r.isMounted = true);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : F();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let s = 0; s < Cs.length; s++) {
      const i = Cs[s];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const r = "on" + i, o = e[r];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    this.prevMotionValues = Ol(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n) return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e);
  }
  addValue(e, n) {
    const s = this.values.get(e);
    n !== s && (s && this.removeValue(e), this.bindToMotionValue(e, n), this.values.set(e, n), this.latestValues[e] = n.get());
  }
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e]) return this.props.values[e];
    let s = this.values.get(e);
    return s === void 0 && n !== void 0 && (s = vt(n === null ? void 0 : n, { owner: this }), this.addValue(e, s)), s;
  }
  readValue(e, n) {
    let s = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return s != null && (typeof s == "string" && (Pi(s) || bi(s)) ? s = parseFloat(s) : !Il(s) && Z.test(n) && (s = To(e, n)), this.setBaseTarget(e, O(s) ? s.get() : s)), O(s) ? s.get() : s;
  }
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  getBaseTarget(e) {
    var _a2;
    const { initial: n } = this.props;
    let s;
    if (typeof n == "string" || typeof n == "object") {
      const r = Ln(this.props, n, (_a2 = this.presenceContext) == null ? void 0 : _a2.custom);
      r && (s = r[e]);
    }
    if (n && s !== void 0) return s;
    const i = this.getBaseTargetFromProps(this.props, e);
    return i !== void 0 && !O(i) ? i : this.initialValues[e] !== void 0 && s === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new vn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
  scheduleRenderMicrotask() {
    jn.render(this.render);
  }
}
class Eo extends Do {
  constructor() {
    super(...arguments), this.KeyframeResolver = yl;
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    const s = e.style;
    return s ? s[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: s }) {
    delete n[e], delete s[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    O(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
class ht {
  constructor(e) {
    this.isMounted = false, this.node = e;
  }
  update() {
  }
}
function Ro({ top: t, left: e, right: n, bottom: s }) {
  return { x: { min: e, max: n }, y: { min: t, max: s } };
}
function Ul({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function Wl(t, e) {
  if (!e) return t;
  const n = e({ x: t.left, y: t.top }), s = e({ x: t.right, y: t.bottom });
  return { top: n.y, left: n.x, bottom: s.y, right: s.x };
}
function Fe(t) {
  return t === void 0 || t === 1;
}
function un({ scale: t, scaleX: e, scaleY: n }) {
  return !Fe(t) || !Fe(e) || !Fe(n);
}
function dt(t) {
  return un(t) || Lo(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function Lo(t) {
  return Ms(t.x) || Ms(t.y);
}
function Ms(t) {
  return t && t !== "0%";
}
function ge(t, e, n) {
  const s = t - n, i = e * s;
  return n + i;
}
function Ds(t, e, n, s, i) {
  return i !== void 0 && (t = ge(t, i, s)), ge(t, n, s) + e;
}
function cn(t, e = 0, n = 1, s, i) {
  t.min = Ds(t.min, e, n, s, i), t.max = Ds(t.max, e, n, s, i);
}
function ko(t, { x: e, y: n }) {
  cn(t.x, e.translate, e.scale, e.originPoint), cn(t.y, n.translate, n.scale, n.originPoint);
}
const Es = 0.999999999999, Rs = 1.0000000000001;
function Kl(t, e, n, s = false) {
  var _a2;
  const i = n.length;
  if (!i) return;
  e.x = e.y = 1;
  let r, o;
  for (let a = 0; a < i; a++) {
    r = n[a], o = r.projectionDelta;
    const { visualElement: l } = r.options;
    l && l.props.style && l.props.style.display === "contents" || (s && r.options.layoutScroll && r.scroll && r !== r.root && (et(t.x, -r.scroll.offset.x), et(t.y, -r.scroll.offset.y)), o && (e.x *= o.x.scale, e.y *= o.y.scale, ko(t, o)), s && dt(r.latestValues) && ae(t, r.latestValues, (_a2 = r.layout) == null ? void 0 : _a2.layoutBox));
  }
  e.x < Rs && e.x > Es && (e.x = 1), e.y < Rs && e.y > Es && (e.y = 1);
}
function et(t, e) {
  t.min += e, t.max += e;
}
function Ls(t, e, n, s, i = 0.5) {
  const r = R(t.min, t.max, i);
  cn(t, e, n, r, s);
}
function ks(t, e) {
  return typeof t == "string" ? parseFloat(t) / 100 * (e.max - e.min) : t;
}
function ae(t, e, n) {
  const s = n ?? t;
  Ls(t.x, ks(e.x, s.x), e.scaleX, e.scale, e.originX), Ls(t.y, ks(e.y, s.y), e.scaleY, e.scale, e.originY);
}
function Bo(t, e) {
  return Ro(Wl(t.getBoundingClientRect(), e));
}
function $l(t, e, n) {
  const s = Bo(t, n), { scroll: i } = e;
  return i && (et(s.x, i.offset.x), et(s.y, i.offset.y)), s;
}
const zl = { x: "translateX", y: "translateY", z: "translateZ", transformPerspective: "perspective" }, Gl = Dt.length;
function Hl(t, e, n) {
  let s = "", i = true;
  for (let o = 0; o < Gl; o++) {
    const a = Dt[o], l = t[a];
    if (l === void 0) continue;
    let u = true;
    if (typeof l == "number") u = l === (a.startsWith("scale") ? 1 : 0);
    else {
      const c = parseFloat(l);
      u = a.startsWith("scale") ? c === 1 : c === 0;
    }
    if (!u || n) {
      const c = ln(l, de[a]);
      if (!u) {
        i = false;
        const h = zl[a] || a;
        s += `${h}(${c}) `;
      }
      n && (e[a] = c);
    }
  }
  const r = t.pathRotation;
  return r && (i = false, s += `rotate(${ln(r, de.pathRotation)}) `), s = s.trim(), n ? s = n(e, i ? "" : s) : i && (s = "none"), s;
}
function $n(t, e, n) {
  const { style: s, vars: i, transformOrigin: r } = t;
  let o = false, a = false;
  for (const l in e) {
    const u = e[l];
    if (Et.has(l)) {
      o = true;
      continue;
    } else if (Wi(l)) {
      i[l] = u;
      continue;
    } else {
      const c = ln(u, de[l]);
      l.startsWith("origin") ? (a = true, r[l] = c) : s[l] = c;
    }
  }
  if (e.transform || (o || n ? s.transform = Hl(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = r;
    s.transformOrigin = `${l} ${u} ${c}`;
  }
}
function Fo(t, { style: e, vars: n }, s, i) {
  const r = t.style;
  let o;
  for (o in e) r[o] = e[o];
  i == null ? void 0 : i.applyProjectionStyles(r, s);
  for (o in n) r.setProperty(o, n[o]);
}
function Bs(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const kt = { correct: (t, e) => {
  if (!e.target) return t;
  if (typeof t == "string") if (S.test(t)) t = parseFloat(t);
  else return t;
  const n = Bs(t, e.target.x), s = Bs(t, e.target.y);
  return `${n}% ${s}%`;
} }, _l = { correct: (t, { treeScale: e, projectionDelta: n }) => {
  const s = t, i = Z.parse(t);
  if (i.length > 5) return s;
  const r = Z.createTransformer(t), o = typeof i[0] != "number" ? 1 : 0, a = n.x.scale * e.x, l = n.y.scale * e.y;
  i[0 + o] /= a, i[1 + o] /= l;
  const u = R(a, l, 0.5);
  return typeof i[2 + o] == "number" && (i[2 + o] /= u), typeof i[3 + o] == "number" && (i[3 + o] /= u), r(i);
} }, hn = { borderRadius: { ...kt, applyTo: [...In] }, borderTopLeftRadius: kt, borderTopRightRadius: kt, borderBottomLeftRadius: kt, borderBottomRightRadius: kt, boxShadow: _l };
function Io(t, { layout: e, layoutId: n }) {
  return Et.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!hn[t] || t === "opacity");
}
function zn(t, e, n) {
  var _a2;
  const s = t.style, i = e == null ? void 0 : e.style, r = {};
  if (!s) return r;
  for (const o in s) (O(s[o]) || i && O(i[o]) || Io(o, t) || ((_a2 = n == null ? void 0 : n.getValue(o)) == null ? void 0 : _a2.liveStyle) !== void 0) && (r[o] = s[o]);
  return r;
}
function Xl(t) {
  return window.getComputedStyle(t);
}
class Oo extends Eo {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Fo;
  }
  mount(e) {
    Se(!!e.style), super.mount(e);
  }
  readValueFromInstance(e, n) {
    var _a2;
    if (Et.has(n)) return ((_a2 = this.projection) == null ? void 0 : _a2.isProjecting) ? qe(n) : xa(e, n);
    {
      const s = Xl(e), i = (Wi(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return Bo(e, n);
  }
  build(e, n, s) {
    $n(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return zn(e, n, s);
  }
}
function Yl(t, e) {
  return t in e;
}
class ql extends Do {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(e, n) {
    if (Yl(n, e)) {
      const s = e[n];
      if (typeof s == "string" || typeof s == "number") return s;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(e, n) {
    delete n.output[e];
  }
  measureInstanceViewportBox() {
    return F();
  }
  build(e, n) {
    Object.assign(e.output, n);
  }
  renderInstance(e, { output: n }) {
    Object.assign(e, n);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const Zl = { offset: "stroke-dashoffset", array: "stroke-dasharray" }, Jl = { offset: "strokeDashoffset", array: "strokeDasharray" };
function Ql(t, e, n = 1, s = 0, i = true) {
  t.pathLength = 1;
  const r = i ? Zl : Jl;
  t[r.offset] = `${-s}`, t[r.array] = `${e} ${n}`;
}
const tu = ["offsetDistance", "offsetPath", "offsetRotate", "offsetAnchor"];
function jo(t, { attrX: e, attrY: n, attrScale: s, pathLength: i, pathSpacing: r = 1, pathOffset: o = 0, ...a }, l, u, c) {
  if ($n(t, a, u), l) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: h, style: f } = t;
  h.transform && (f.transform = h.transform, delete h.transform), (f.transform || h.transformOrigin) && (f.transformOrigin = h.transformOrigin ?? "50% 50%", delete h.transformOrigin), f.transform && (f.transformBox = (c == null ? void 0 : c.transformBox) ?? "fill-box", delete h.transformBox);
  for (const p of tu) h[p] !== void 0 && (f[p] = h[p], delete h[p]);
  e !== void 0 && (h.x = e), n !== void 0 && (h.y = n), s !== void 0 && (h.scale = s), i !== void 0 && Ql(h, i, r, o, false);
}
const No = /* @__PURE__ */ new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform", "pathLength", "startOffset", "textLength", "lengthAdjust"]), Uo = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function eu(t, e, n, s) {
  Fo(t, e, void 0, s);
  for (const i in e.attrs) t.setAttribute(No.has(i) ? i : Bn(i), e.attrs[i]);
}
function Wo(t, e, n) {
  const s = zn(t, e, n);
  for (const i in t) if (O(t[i]) || O(e[i])) {
    const r = Dt.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
    s[r] = t[i];
  }
  return s;
}
class Ko extends Eo {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = false, this.measureInstanceViewportBox = F;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (Et.has(n)) {
      const s = xo(n);
      return s && s.default || 0;
    }
    return n = No.has(n) ? n : Bn(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return Wo(e, n, s);
  }
  build(e, n, s) {
    jo(e, n, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(e, n, s, i) {
    eu(e, n, s, i);
  }
  mount(e) {
    this.isSVGTag = Uo(e.tagName), super.mount(e);
  }
}
const nu = Wn.length;
function $o(t) {
  if (!t) return;
  if (!t.isControllingVariants) {
    const n = t.parent ? $o(t.parent) || {} : {};
    return t.props.initial !== void 0 && (n.initial = t.props.initial), n;
  }
  const e = {};
  for (let n = 0; n < nu; n++) {
    const s = Wn[n], i = t.props[s];
    (Kt(i) || i === false) && (e[s] = i);
  }
  return e;
}
function zo(t, e) {
  if (!Array.isArray(e)) return false;
  const n = e.length;
  if (n !== t.length) return false;
  for (let s = 0; s < n; s++) if (e[s] !== t[s]) return false;
  return true;
}
const su = [...Un].reverse(), iu = Un.length;
function ou(t) {
  return (e) => Promise.all(e.map(({ animation: n, options: s }) => go(t, n, s)));
}
function ru(t) {
  let e = ou(t), n = Fs(), s = true, i = false;
  const r = (u) => (c, h) => {
    var _a2;
    const f = yt(t, h, u === "exit" ? (_a2 = t.presenceContext) == null ? void 0 : _a2.custom : void 0);
    if (f) {
      const { transition: p, transitionEnd: d, ...g } = f;
      c = { ...c, ...g, ...d };
    }
    return c;
  };
  function o(u) {
    e = u(t);
  }
  function a(u) {
    const { props: c } = t, h = $o(t.parent) || {}, f = [], p = /* @__PURE__ */ new Set();
    let d = {}, g = 1 / 0;
    for (let y = 0; y < iu; y++) {
      const v = su[y], x = n[v], T = c[v] !== void 0 ? c[v] : h[v], V = Kt(T), C = v === u ? x.isActive : null;
      C === false && (g = y);
      let M = T === h[v] && T !== c[v] && V;
      if (M && (s || i) && t.manuallyAnimateOnMount && (M = false), x.protectedKeys = { ...d }, !x.isActive && C === null || !T && !x.prevProp || be(T) || typeof T == "boolean") continue;
      if (v === "exit" && x.isActive && C !== true) {
        x.prevResolvedValues && (d = { ...d, ...x.prevResolvedValues });
        continue;
      }
      const P = au(x.prevProp, T);
      let A = P || v === u && x.isActive && !M && V || y > g && V, b = false;
      const D = Array.isArray(T) ? T : [T];
      let B = D.reduce(r(v), {});
      C === false && (B = {});
      const { prevResolvedValues: N = {} } = x, $ = { ...N, ...B }, G = (E) => {
        A = true, p.has(E) && (b = true, p.delete(E)), x.needsAnimating[E] = true;
        const U = t.getValue(E);
        U && (U.liveStyle = false);
      };
      for (const E in $) {
        const U = B[E], Q = N[E];
        if (d.hasOwnProperty(E)) continue;
        let it = false;
        nn(U) && nn(Q) ? it = !zo(U, Q) || P : it = U !== Q, it ? U != null ? G(E) : p.add(E) : U !== void 0 && p.has(E) ? G(E) : x.protectedKeys[E] = true;
      }
      x.prevProp = T, x.prevResolvedValues = B, x.isActive && (d = { ...d, ...B }), (s || i) && t.blockInitialAnimation && (A = false);
      const H = M && P;
      A && (!H || b) && f.push(...D.map((E) => {
        const U = { type: v };
        if (typeof E == "string" && (s || i) && !H && t.manuallyAnimateOnMount && t.parent) {
          const { parent: Q } = t, it = yt(Q, E);
          if (Q.enteringChildren && it) {
            const { delayChildren: Xt } = it.transition || {};
            U.delay = uo(Q.enteringChildren, t, Xt);
          }
        }
        return { animation: E, options: U };
      }));
    }
    if (p.size) {
      const y = {};
      if (typeof c.initial != "boolean") {
        const v = yt(t, Array.isArray(c.initial) ? c.initial[0] : c.initial);
        v && v.transition && (y.transition = v.transition);
      }
      p.forEach((v) => {
        const x = t.getBaseTarget(v), T = t.getValue(v);
        T && (T.liveStyle = true), y[v] = x ?? null;
      }), f.push({ animation: y });
    }
    let m = !!f.length;
    return s && (c.initial === false || c.initial === c.animate) && !t.manuallyAnimateOnMount && (m = false), s = false, i = false, m ? e(f) : Promise.resolve();
  }
  function l(u, c) {
    var _a2;
    if (n[u].isActive === c) return Promise.resolve();
    (_a2 = t.variantChildren) == null ? void 0 : _a2.forEach((f) => {
      var _a3;
      return (_a3 = f.animationState) == null ? void 0 : _a3.setActive(u, c);
    }), n[u].isActive = c;
    const h = a(u);
    for (const f in n) n[f].protectedKeys = {};
    return h;
  }
  return { animateChanges: a, setActive: l, setAnimateFunction: o, getState: () => n, reset: () => {
    n = Fs(), i = true;
  } };
}
function au(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !zo(e, t) : false;
}
function ft(t = false) {
  return { isActive: t, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} };
}
function Fs() {
  return { animate: ft(true), whileInView: ft(), whileHover: ft(), whileTap: ft(), whileDrag: ft(), whileFocus: ft(), exit: ft() };
}
function fn(t, e) {
  t.min = e.min, t.max = e.max;
}
function Y(t, e) {
  fn(t.x, e.x), fn(t.y, e.y);
}
function Is(t, e) {
  t.translate = e.translate, t.scale = e.scale, t.originPoint = e.originPoint, t.origin = e.origin;
}
const Go = 1e-4, lu = 1 - Go, uu = 1 + Go, Ho = 0.01, cu = 0 - Ho, hu = 0 + Ho;
function K(t) {
  return t.max - t.min;
}
function fu(t, e, n) {
  return Math.abs(t - e) <= n;
}
function Os(t, e, n, s = 0.5) {
  t.origin = s, t.originPoint = R(e.min, e.max, t.origin), t.scale = K(n) / K(e), t.translate = R(n.min, n.max, t.origin) - t.originPoint, (t.scale >= lu && t.scale <= uu || isNaN(t.scale)) && (t.scale = 1), (t.translate >= cu && t.translate <= hu || isNaN(t.translate)) && (t.translate = 0);
}
function Ot(t, e, n, s) {
  Os(t.x, e.x, n.x, s ? s.originX : void 0), Os(t.y, e.y, n.y, s ? s.originY : void 0);
}
function js(t, e, n, s = 0) {
  const i = s ? R(n.min, n.max, s) : n.min;
  t.min = i + e.min, t.max = t.min + K(e);
}
function du(t, e, n, s) {
  js(t.x, e.x, n.x, s == null ? void 0 : s.x), js(t.y, e.y, n.y, s == null ? void 0 : s.y);
}
function Ns(t, e, n, s = 0) {
  const i = s ? R(n.min, n.max, s) : n.min;
  t.min = e.min - i, t.max = t.min + K(e);
}
function ye(t, e, n, s) {
  Ns(t.x, e.x, n.x, s == null ? void 0 : s.x), Ns(t.y, e.y, n.y, s == null ? void 0 : s.y);
}
function Us(t, e, n, s, i) {
  return t -= e, t = ge(t, 1 / n, s), i !== void 0 && (t = ge(t, 1 / i, s)), t;
}
function pu(t, e = 0, n = 1, s = 0.5, i, r = t, o = t) {
  if (nt.test(e) && (e = parseFloat(e), e = R(o.min, o.max, e / 100) - o.min), typeof e != "number") return;
  let a = R(r.min, r.max, s);
  t === r && (a -= e), t.min = Us(t.min, e, n, a, i), t.max = Us(t.max, e, n, a, i);
}
function Ws(t, e, [n, s, i], r, o) {
  pu(t, e[n], e[s], e[i], e.scale, r, o);
}
const mu = ["x", "scaleX", "originX"], gu = ["y", "scaleY", "originY"];
function Ks(t, e, n, s) {
  Ws(t.x, e, mu, n ? n.x : void 0, s ? s.x : void 0), Ws(t.y, e, gu, n ? n.y : void 0, s ? s.y : void 0);
}
function $s(t) {
  return t.translate === 0 && t.scale === 1;
}
function _o(t) {
  return $s(t.x) && $s(t.y);
}
function zs(t, e) {
  return t.min === e.min && t.max === e.max;
}
function yu(t, e) {
  return zs(t.x, e.x) && zs(t.y, e.y);
}
function Gs(t, e) {
  return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
}
function Xo(t, e) {
  return Gs(t.x, e.x) && Gs(t.y, e.y);
}
function Hs(t) {
  return K(t.x) / K(t.y);
}
function _s(t, e) {
  return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint;
}
function tt(t) {
  return [t("x"), t("y")];
}
function vu(t, e, n) {
  let s = "";
  const i = t.x.translate / e.x, r = t.y.translate / e.y, o = (n == null ? void 0 : n.z) || 0;
  if ((i || r || o) && (s = `translate3d(${i}px, ${r}px, ${o}px) `), (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `), n) {
    const { transformPerspective: u, rotate: c, pathRotation: h, rotateX: f, rotateY: p, skewX: d, skewY: g } = n;
    u && (s = `perspective(${u}px) ${s}`), c && (s += `rotate(${c}deg) `), h && (s += `rotate(${h}deg) `), f && (s += `rotateX(${f}deg) `), p && (s += `rotateY(${p}deg) `), d && (s += `skewX(${d}deg) `), g && (s += `skewY(${g}deg) `);
  }
  const a = t.x.scale * e.x, l = t.y.scale * e.y;
  return (a !== 1 || l !== 1) && (s += `scale(${a}, ${l})`), s || "none";
}
const xu = In.length, Xs = (t) => typeof t == "string" ? parseFloat(t) : t, Ys = (t) => typeof t == "number" || S.test(t);
function Tu(t, e, n, s, i, r) {
  i ? (t.opacity = R(0, n.opacity ?? 1, wu(s)), t.opacityExit = R(e.opacity ?? 1, 0, Su(s))) : r && (t.opacity = R(e.opacity ?? 1, n.opacity ?? 1, s));
  for (let o = 0; o < xu; o++) {
    const a = In[o];
    let l = qs(e, a), u = qs(n, a);
    if (l === void 0 && u === void 0) continue;
    l || (l = 0), u || (u = 0), l === 0 || u === 0 || Ys(l) === Ys(u) ? (t[a] = Math.max(R(Xs(l), Xs(u), s), 0), (nt.test(u) || nt.test(l)) && (t[a] += "%")) : t[a] = u;
  }
  (e.rotate || n.rotate) && (t.rotate = R(e.rotate || 0, n.rotate || 0, s));
}
function qs(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const wu = Yo(0, 0.5, ki), Su = Yo(0.5, 0.95, X);
function Yo(t, e, n) {
  return (s) => s < t ? 0 : s > e ? 1 : n(Vt(t, e, s));
}
function qo(t, e, n) {
  const s = O(t) ? t : vt(t);
  return s.start(Rn("", s, e, n)), s.animation;
}
function $t(t, e, n, s = { passive: true }) {
  return t.addEventListener(e, n, s), () => t.removeEventListener(e, n, s);
}
const Pu = (t, e) => t.depth - e.depth;
class Au {
  constructor() {
    this.children = [], this.isDirty = false;
  }
  add(e) {
    yn(this.children, e), this.isDirty = true;
  }
  remove(e) {
    bt(this.children, e), this.isDirty = true;
  }
  forEach(e) {
    this.isDirty && this.children.sort(Pu), this.isDirty = false, this.children.forEach(e);
  }
}
function bu(t, e) {
  const n = W.now(), s = ({ timestamp: i }) => {
    const r = i - n;
    r >= e && (ct(s), t(r - e));
  };
  return L.setup(s, true), () => ct(s);
}
function le(t) {
  return O(t) ? t.get() : t;
}
class Vu {
  constructor() {
    this.members = [];
  }
  add(e) {
    yn(this.members, e);
    for (let n = this.members.length - 1; n >= 0; n--) {
      const s = this.members[n];
      if (s === e || s === this.lead || s === this.prevLead) continue;
      const i = s.instance;
      (!i || i.isConnected === false) && !s.snapshot && (bt(this.members, s), s.unmount());
    }
    e.scheduleRender();
  }
  remove(e) {
    if (bt(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    var _a2;
    for (let n = this.members.indexOf(e) - 1; n >= 0; n--) {
      const s = this.members[n];
      if (s.isPresent !== false && ((_a2 = s.instance) == null ? void 0 : _a2.isConnected) !== false) return this.promote(s), true;
    }
    return false;
  }
  promote(e, n) {
    var _a2;
    const s = this.lead;
    if (e !== s && (this.prevLead = s, this.lead = e, e.show(), s)) {
      s.updateSnapshot(), e.scheduleRender();
      const { layoutDependency: i } = s.options, { layoutDependency: r } = e.options;
      (i === void 0 || i !== r) && (e.resumeFrom = s, n && (s.preserveOpacity = true), s.snapshot && (e.snapshot = s.snapshot, e.snapshot.latestValues = s.animationValues || s.latestValues), ((_a2 = e.root) == null ? void 0 : _a2.isUpdating) && (e.isLayoutDirty = true)), e.options.crossfade === false && s.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      var _a2, _b, _c2, _d, _e2;
      (_b = (_a2 = e.options).onExitComplete) == null ? void 0 : _b.call(_a2), (_e2 = (_c2 = e.resumingFrom) == null ? void 0 : (_d = _c2.options).onExitComplete) == null ? void 0 : _e2.call(_d);
    });
  }
  scheduleRender() {
    this.members.forEach((e) => e.instance && e.scheduleRender(false));
  }
  removeLeadSnapshot() {
    var _a2;
    ((_a2 = this.lead) == null ? void 0 : _a2.snapshot) && (this.lead.snapshot = void 0);
  }
}
const ue = { hasAnimatedSinceResize: true, hasEverUpdated: false }, Ie = ["", "X", "Y", "Z"], Cu = 1e3;
let Mu = 0;
function Oe(t, e, n, s) {
  const { latestValues: i } = e;
  i[t] && (n[t] = i[t], e.setStaticValue(t, 0), s && (s[t] = 0));
}
function Zo(t) {
  if (t.hasCheckedOptimisedAppear = true, t.root === t) return;
  const { visualElement: e } = t.options;
  if (!e) return;
  const n = mo(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: i, layoutId: r } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", L, !(i || r));
  }
  const { parent: s } = t;
  s && !s.hasCheckedOptimisedAppear && Zo(s);
}
function Jo({ attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: s, resetTransform: i }) {
  return class {
    constructor(o = {}, a = e == null ? void 0 : e()) {
      this.id = Mu++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = false, this.isAnimationBlocked = false, this.isLayoutDirty = false, this.isProjectionDirty = false, this.isSharedProjectionDirty = false, this.isTransformDirty = false, this.updateManuallyBlocked = false, this.updateBlockedByResize = false, this.isUpdating = false, this.isSVG = false, this.needsReset = false, this.shouldResetTransform = false, this.hasCheckedOptimisedAppear = false, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = false, this.layoutVersion = 0, this.updateScheduled = false, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = false, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = false, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = false, this.nodes.forEach(Ru), this.nodes.forEach(Ou), this.nodes.forEach(ju), this.nodes.forEach(Lu);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = false, this.isVisible = true, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = o, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++) this.path[l].shouldResetTransform = true;
      this.root === this && (this.nodes = new Au());
    }
    addEventListener(o, a) {
      return this.eventHandlers.has(o) || this.eventHandlers.set(o, new vn()), this.eventHandlers.get(o).add(a);
    }
    notifyListeners(o, ...a) {
      const l = this.eventHandlers.get(o);
      l && l.notify(...a);
    }
    hasListeners(o) {
      return this.eventHandlers.has(o);
    }
    mount(o) {
      if (this.instance) return;
      this.isSVG = Ae(o) && !bo(o), this.instance = o;
      const { layoutId: a, layout: l, visualElement: u } = this.options;
      if (u && !u.current && u.mount(o), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = true), t) {
        let c, h = 0;
        const f = () => this.root.updateBlockedByResize = false;
        L.read(() => {
          h = window.innerWidth;
        }), t(o, () => {
          const p = window.innerWidth;
          p !== h && (h = p, this.root.updateBlockedByResize = true, c && c(), c = bu(f, 250), ue.hasAnimatedSinceResize && (ue.hasAnimatedSinceResize = false, this.nodes.forEach(Qs)));
        });
      }
      a && this.root.registerSharedNode(a, this), this.options.animate !== false && u && (a || l) && this.addEventListener("didUpdate", ({ delta: c, hasLayoutChanged: h, hasRelativeLayoutChanged: f, layout: p }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const d = this.options.transition || u.getDefaultTransition() || $u, { onLayoutAnimationStart: g, onLayoutAnimationComplete: m } = u.getProps(), y = !this.targetLayout || !Xo(this.targetLayout, p), v = !h && f;
        if (this.options.layoutRoot || this.resumeFrom || v || h && (y || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const x = { ...En(d, "layout"), onPlay: g, onComplete: m };
          (u.shouldReduceMotion || this.options.layoutRoot) && (x.delay = 0, x.type = false), this.startAnimation(x), this.setAnimationOrigin(c, v, x.path);
        } else h || Qs(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = p;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const o = this.getStack();
      o && o.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), ct(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
    }
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = true, this.nodes && this.nodes.forEach(Nu), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: o } = this.options;
      return o && o.getProps().transformTemplate;
    }
    willUpdate(o = true) {
      if (this.root.hasTreeAnimated = true, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Zo(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty) return;
      this.isLayoutDirty = true;
      for (let c = 0; c < this.path.length; c++) {
        const h = this.path[c];
        h.shouldResetTransform = true, (typeof h.latestValues.x == "string" || typeof h.latestValues.y == "string") && (h.isLayoutDirty = true), h.updateScroll("snapshot"), h.options.layoutRoot && h.willUpdate(false);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l) return;
      const u = this.getTransformTemplate();
      this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0, this.updateSnapshot(), o && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = false, this.isUpdateBlocked()) {
        const l = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = false, this.clearAllSnapshots(), l && this.nodes.forEach(Bu), this.nodes.forEach(Zs);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Js);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = false, this.nodes.forEach(Fu), this.nodes.forEach(Iu), this.nodes.forEach(Du), this.nodes.forEach(Eu)) : this.nodes.forEach(Js), this.clearAllSnapshots();
      const a = W.now();
      j.delta = st(0, 1e3 / 60, a - j.timestamp), j.timestamp = a, j.isProcessing = true, Me.update.process(j), Me.preRender.process(j), Me.render.process(j), j.isProcessing = false;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = true, jn.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(ku), this.sharedNodes.forEach(Uu);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = true, L.preRender(this.updateProjection, false, true));
    }
    scheduleCheckAfterUnmount() {
      L.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !K(this.snapshot.measuredBox.x) && !K(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)) return;
      if (this.resumeFrom && !this.resumeFrom.instance) for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll();
      const o = this.layout;
      this.layout = this.measure(false), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = F()), this.isLayoutDirty = false, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, o ? o.layoutBox : void 0);
    }
    updateScroll(o = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === o && (a = false), a && this.instance) {
        const l = s(this.instance);
        this.scroll = { animationId: this.root.animationId, phase: o, isRoot: l, offset: n(this.instance), wasRoot: this.scroll ? this.scroll.isRoot : l };
      }
    }
    resetTransform() {
      if (!i) return;
      const o = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !_o(this.projectionDelta), l = this.getTransformTemplate(), u = l ? l(this.latestValues, "") : void 0, c = u !== this.prevTransformTemplateValue;
      o && this.instance && (a || dt(this.latestValues) || c) && (i(this.instance, u), this.shouldResetTransform = false, this.scheduleRender());
    }
    measure(o = true) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return o && (l = this.removeTransform(l)), zu(l), { animationId: this.root.animationId, measuredBox: a, layoutBox: l, latestValues: {}, source: this.id };
    }
    measurePageBox() {
      var _a2;
      const { visualElement: o } = this.options;
      if (!o) return F();
      const a = o.measureViewportBox();
      if (!(((_a2 = this.scroll) == null ? void 0 : _a2.wasRoot) || this.path.some(Gu))) {
        const { scroll: u } = this.root;
        u && (et(a.x, u.offset.x), et(a.y, u.offset.y));
      }
      return a;
    }
    removeElementScroll(o) {
      var _a2;
      const a = F();
      if (Y(a, o), (_a2 = this.scroll) == null ? void 0 : _a2.wasRoot) return a;
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l], { scroll: c, options: h } = u;
        u !== this.root && c && h.layoutScroll && (c.wasRoot && Y(a, o), et(a.x, c.offset.x), et(a.y, c.offset.y));
      }
      return a;
    }
    applyTransform(o, a = false, l) {
      var _a2, _b;
      const u = l || F();
      Y(u, o);
      for (let c = 0; c < this.path.length; c++) {
        const h = this.path[c];
        !a && h.options.layoutScroll && h.scroll && h !== h.root && (et(u.x, -h.scroll.offset.x), et(u.y, -h.scroll.offset.y)), dt(h.latestValues) && ae(u, h.latestValues, (_a2 = h.layout) == null ? void 0 : _a2.layoutBox);
      }
      return dt(this.latestValues) && ae(u, this.latestValues, (_b = this.layout) == null ? void 0 : _b.layoutBox), u;
    }
    removeTransform(o) {
      var _a2;
      const a = F();
      Y(a, o);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!dt(u.latestValues)) continue;
        let c;
        u.instance && (un(u.latestValues) && u.updateSnapshot(), c = F(), Y(c, u.measurePageBox())), Ks(a, u.latestValues, (_a2 = u.snapshot) == null ? void 0 : _a2.layoutBox, c);
      }
      return dt(this.latestValues) && Ks(a, this.latestValues), a;
    }
    setTargetDelta(o) {
      this.targetDelta = o, this.root.scheduleUpdateProjection(), this.isProjectionDirty = true;
    }
    setOptions(o) {
      this.options = { ...this.options, ...o, crossfade: o.crossfade !== void 0 ? o.crossfade : true };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = false;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== j.timestamp && this.relativeParent.resolveTargetDelta(true);
    }
    resolveTargetDelta(o = false) {
      var _a2;
      const a = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
      const l = !!this.resumingFrom || this !== a;
      if (!(o || l && this.isSharedProjectionDirty || this.isProjectionDirty || ((_a2 = this.parent) == null ? void 0 : _a2.isProjectionDirty) || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
      const { layout: c, layoutId: h } = this.options;
      if (!this.layout || !(c || h)) return;
      this.resolvedRelativeTargetAt = j.timestamp;
      const f = this.getClosestProjectingParent();
      f && this.linkedParentVersion !== f.layoutVersion && !f.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== false && f && f.layout ? this.createRelativeTarget(f, this.layout.layoutBox, f.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = F(), this.targetWithTransforms = F()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), du(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, false, this.target) : Y(this.target, this.layout.layoutBox), ko(this.target, this.targetDelta)) : Y(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = false, this.options.layoutAnchor !== false && f && !!f.resumingFrom == !!this.resumingFrom && !f.options.layoutScroll && f.target && this.animationProgress !== 1 ? this.createRelativeTarget(f, this.target, f.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || un(this.parent.latestValues) || Lo(this.parent.latestValues))) return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(o, a, l) {
      this.relativeParent = o, this.linkedParentVersion = o.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = F(), this.relativeTargetOrigin = F(), ye(this.relativeTargetOrigin, a, l, this.options.layoutAnchor || void 0), Y(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      var _a2;
      const o = this.getLead(), a = !!this.resumingFrom || this !== o;
      let l = true;
      if ((this.isProjectionDirty || ((_a2 = this.parent) == null ? void 0 : _a2.isProjectionDirty)) && (l = false), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = false), this.resolvedRelativeTargetAt === j.timestamp && (l = false), l) return;
      const { layout: u, layoutId: c } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(u || c)) return;
      Y(this.layoutCorrected, this.layout.layoutBox);
      const h = this.treeScale.x, f = this.treeScale.y;
      Kl(this.layoutCorrected, this.treeScale, this.path, a), o.layout && !o.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (o.target = o.layout.layoutBox, o.targetWithTransforms = F());
      const { target: p } = o;
      if (!p) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Is(this.prevProjectionDelta.x, this.projectionDelta.x), Is(this.prevProjectionDelta.y, this.projectionDelta.y)), Ot(this.projectionDelta, this.layoutCorrected, p, this.latestValues), (this.treeScale.x !== h || this.treeScale.y !== f || !_s(this.projectionDelta.x, this.prevProjectionDelta.x) || !_s(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = true, this.scheduleRender(), this.notifyListeners("projectionUpdate", p));
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(o = true) {
      var _a2;
      if ((_a2 = this.options.visualElement) == null ? void 0 : _a2.scheduleRender(), o) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = At(), this.projectionDelta = At(), this.projectionDeltaWithTransform = At();
    }
    setAnimationOrigin(o, a = false, l) {
      const u = this.snapshot, c = u ? u.latestValues : {}, h = { ...this.latestValues }, f = At();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const p = F(), d = u ? u.source : void 0, g = this.layout ? this.layout.source : void 0, m = d !== g, y = this.getStack(), v = !y || y.members.length <= 1, x = !!(m && !v && this.options.crossfade === true && !this.path.some(Ku));
      this.animationProgress = 0;
      let T;
      const V = l == null ? void 0 : l.interpolateProjection(o);
      this.mixTargetDelta = (C) => {
        const M = C / 1e3, P = V == null ? void 0 : V(M);
        P ? (f.x.translate = P.x, f.x.scale = R(o.x.scale, 1, M), f.x.origin = o.x.origin, f.x.originPoint = o.x.originPoint, f.y.translate = P.y, f.y.scale = R(o.y.scale, 1, M), f.y.origin = o.y.origin, f.y.originPoint = o.y.originPoint) : (ti(f.x, o.x, M), ti(f.y, o.y, M)), this.setTargetDelta(f), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (ye(p, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), Wu(this.relativeTarget, this.relativeTargetOrigin, p, M), T && yu(this.relativeTarget, T) && (this.isProjectionDirty = false), T || (T = F()), Y(T, this.relativeTarget)), m && (this.animationValues = h, Tu(h, c, this.latestValues, M, x, v)), P && P.rotate !== void 0 && (this.animationValues || (this.animationValues = h), this.animationValues.pathRotation = P.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = M;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(o) {
      var _a2, _b, _c2;
      this.notifyListeners("animationStart"), (_a2 = this.currentAnimation) == null ? void 0 : _a2.stop(), (_c2 = (_b = this.resumingFrom) == null ? void 0 : _b.currentAnimation) == null ? void 0 : _c2.stop(), this.pendingAnimation && (ct(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = L.update(() => {
        ue.hasAnimatedSinceResize = true, this.motionValue || (this.motionValue = vt(0)), this.motionValue.jump(0, false), this.currentAnimation = qo(this.motionValue, [0, 1e3], { ...o, velocity: 0, isSync: true, onUpdate: (a) => {
          this.mixTargetDelta(a), o.onUpdate && o.onUpdate(a);
        }, onComplete: () => {
          o.onComplete && o.onComplete(), this.completeAnimation();
        } }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const o = this.getStack();
      o && o.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Cu), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const o = this.getLead();
      let { targetWithTransforms: a, target: l, layout: u, latestValues: c } = o;
      if (!(!a || !l || !u)) {
        if (this !== o && this.layout && u && Qo(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          l = this.target || F();
          const h = K(this.layout.layoutBox.x);
          l.x.min = o.target.x.min, l.x.max = l.x.min + h;
          const f = K(this.layout.layoutBox.y);
          l.y.min = o.target.y.min, l.y.max = l.y.min + f;
        }
        Y(a, l), ae(a, c), Ot(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(o, a) {
      this.sharedNodes.has(o) || this.sharedNodes.set(o, new Vu()), this.sharedNodes.get(o).add(a);
      const u = a.options.initialPromotionConfig;
      a.promote({ transition: u ? u.transition : void 0, preserveFollowOpacity: u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(a) : void 0 });
    }
    isLead() {
      const o = this.getStack();
      return o ? o.lead === this : true;
    }
    getLead() {
      var _a2;
      const { layoutId: o } = this.options;
      return o ? ((_a2 = this.getStack()) == null ? void 0 : _a2.lead) || this : this;
    }
    getPrevLead() {
      var _a2;
      const { layoutId: o } = this.options;
      return o ? (_a2 = this.getStack()) == null ? void 0 : _a2.prevLead : void 0;
    }
    getStack() {
      const { layoutId: o } = this.options;
      if (o) return this.root.sharedNodes.get(o);
    }
    promote({ needsReset: o, transition: a, preserveFollowOpacity: l } = {}) {
      const u = this.getStack();
      u && u.promote(this, l), o && (this.projectionDelta = void 0, this.needsReset = true), a && this.setOptions({ transition: a });
    }
    relegate() {
      const o = this.getStack();
      return o ? o.relegate(this) : false;
    }
    resetSkewAndRotation() {
      const { visualElement: o } = this.options;
      if (!o) return;
      let a = false;
      const { latestValues: l } = o;
      if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = true), !a) return;
      const u = {};
      l.z && Oe("z", o, u, this.animationValues);
      for (let c = 0; c < Ie.length; c++) Oe(`rotate${Ie[c]}`, o, u, this.animationValues), Oe(`skew${Ie[c]}`, o, u, this.animationValues);
      o.render();
      for (const c in u) o.setStaticValue(c, u[c]), this.animationValues && (this.animationValues[c] = u[c]);
      o.scheduleRender();
    }
    applyProjectionStyles(o, a) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) {
        o.visibility = "hidden";
        return;
      }
      const l = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = false, o.visibility = "", o.opacity = "", o.pointerEvents = le(a == null ? void 0 : a.pointerEvents) || "", o.transform = l ? l(this.latestValues, "") : "none";
        return;
      }
      const u = this.getLead();
      if (!this.projectionDelta || !this.layout || !u.target) {
        this.options.layoutId && (o.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, o.pointerEvents = le(a == null ? void 0 : a.pointerEvents) || ""), this.hasProjected && !dt(this.latestValues) && (o.transform = l ? l({}, "") : "none", this.hasProjected = false);
        return;
      }
      o.visibility = "";
      const c = u.animationValues || u.latestValues;
      this.applyTransformsToTarget();
      let h = vu(this.projectionDeltaWithTransform, this.treeScale, c);
      l && (h = l(c, h)), o.transform = h;
      const { x: f, y: p } = this.projectionDelta;
      o.transformOrigin = `${f.origin * 100}% ${p.origin * 100}% 0`, u.animationValues ? o.opacity = u === this ? c.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : c.opacityExit : o.opacity = u === this ? c.opacity !== void 0 ? c.opacity : "" : c.opacityExit !== void 0 ? c.opacityExit : 0;
      for (const d in hn) {
        if (c[d] === void 0) continue;
        const { correct: g, applyTo: m, isCSSVariable: y } = hn[d], v = h === "none" ? c[d] : g(c[d], u);
        if (m) {
          const x = m.length;
          for (let T = 0; T < x; T++) o[m[T]] = v;
        } else y ? this.options.visualElement.renderState.vars[d] = v : o[d] = v;
      }
      this.options.layoutId && (o.pointerEvents = u === this ? le(a == null ? void 0 : a.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((o) => {
        var _a2;
        return (_a2 = o.currentAnimation) == null ? void 0 : _a2.stop();
      }), this.root.nodes.forEach(Zs), this.root.sharedNodes.clear();
    }
  };
}
function Du(t) {
  t.updateLayout();
}
function Eu(t) {
  var _a2;
  const e = ((_a2 = t.resumeFrom) == null ? void 0 : _a2.snapshot) || t.snapshot;
  if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: s } = t.layout, { animationType: i } = t.options, r = e.source !== t.layout.source;
    if (i === "size") tt((c) => {
      const h = r ? e.measuredBox[c] : e.layoutBox[c], f = K(h);
      h.min = n[c].min, h.max = h.min + f;
    });
    else if (i === "x" || i === "y") {
      const c = i === "x" ? "y" : "x";
      fn(r ? e.measuredBox[c] : e.layoutBox[c], n[c]);
    } else Qo(i, e.layoutBox, n) && tt((c) => {
      const h = r ? e.measuredBox[c] : e.layoutBox[c], f = K(n[c]);
      h.max = h.min + f, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = true, t.relativeTarget[c].max = t.relativeTarget[c].min + f);
    });
    const o = At();
    Ot(o, n, e.layoutBox);
    const a = At();
    r ? Ot(a, t.applyTransform(s, true), e.measuredBox) : Ot(a, n, e.layoutBox);
    const l = !_o(o);
    let u = false;
    if (!t.resumeFrom) {
      const c = t.getClosestProjectingParent();
      if (c && !c.resumeFrom) {
        const { snapshot: h, layout: f } = c;
        if (h && f) {
          const p = t.options.layoutAnchor || void 0, d = F();
          ye(d, e.layoutBox, h.layoutBox, p);
          const g = F();
          ye(g, n, f.layoutBox, p), Xo(d, g) || (u = true), c.options.layoutRoot && (t.relativeTarget = g, t.relativeTargetOrigin = d, t.relativeParent = c);
        }
      }
    }
    t.notifyListeners("didUpdate", { layout: n, snapshot: e, delta: a, layoutDelta: o, hasLayoutChanged: l, hasRelativeLayoutChanged: u });
  } else if (t.isLead()) {
    const { onExitComplete: n } = t.options;
    n && n();
  }
  t.options.transition = void 0;
}
function Ru(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function Lu(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = false;
}
function ku(t) {
  t.clearSnapshot();
}
function Zs(t) {
  t.clearMeasurements();
}
function Bu(t) {
  t.isLayoutDirty = true, t.updateLayout();
}
function Js(t) {
  t.isLayoutDirty = false;
}
function Fu(t) {
  t.isAnimationBlocked && t.layout && !t.isLayoutDirty && (t.snapshot = t.layout, t.isLayoutDirty = true);
}
function Iu(t) {
  const { visualElement: e } = t.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function Qs(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = true;
}
function Ou(t) {
  t.resolveTargetDelta();
}
function ju(t) {
  t.calcProjection();
}
function Nu(t) {
  t.resetSkewAndRotation();
}
function Uu(t) {
  t.removeLeadSnapshot();
}
function ti(t, e, n) {
  t.translate = R(e.translate, 0, n), t.scale = R(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint;
}
function ei(t, e, n, s) {
  t.min = R(e.min, n.min, s), t.max = R(e.max, n.max, s);
}
function Wu(t, e, n, s) {
  ei(t.x, e.x, n.x, s), ei(t.y, e.y, n.y, s);
}
function Ku(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const $u = { duration: 0.45, ease: [0.4, 0, 0.1, 1] }, ni = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), si = ni("applewebkit/") && !ni("chrome/") ? Math.round : X;
function ii(t) {
  t.min = si(t.min), t.max = si(t.max);
}
function zu(t) {
  ii(t.x), ii(t.y);
}
function Qo(t, e, n) {
  return t === "position" || t === "preserve-aspect" && !fu(Hs(e), Hs(n), 0.2);
}
function Gu(t) {
  var _a2;
  return t !== t.root && ((_a2 = t.scroll) == null ? void 0 : _a2.wasRoot);
}
const Hu = Jo({ attachResizeListener: (t, e) => $t(t, "resize", e), measureScroll: () => {
  var _a2, _b;
  return { x: document.documentElement.scrollLeft || ((_a2 = document.body) == null ? void 0 : _a2.scrollLeft) || 0, y: document.documentElement.scrollTop || ((_b = document.body) == null ? void 0 : _b.scrollTop) || 0 };
}, checkIsScrollRoot: () => true }), je = { current: void 0 }, tr = Jo({ measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }), defaultParent: () => {
  if (!je.current) {
    const t = new Hu({});
    t.mount(window), t.setOptions({ layoutScroll: true }), je.current = t;
  }
  return je.current;
}, resetTransform: (t, e) => {
  t.style.transform = e !== void 0 ? e : "none";
}, checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed" }), Gn = w.createContext({ transformPagePoint: (t) => t, isStatic: false, reducedMotion: "never" });
function oi(t, e) {
  if (typeof t == "function") return t(e);
  t != null && (t.current = e);
}
function _u(...t) {
  return (e) => {
    let n = false;
    const s = t.map((i) => {
      const r = oi(i, e);
      return !n && typeof r == "function" && (n = true), r;
    });
    if (n) return () => {
      for (let i = 0; i < s.length; i++) {
        const r = s[i];
        typeof r == "function" ? r() : oi(t[i], null);
      }
    };
  };
}
function Xu(...t) {
  return w.useCallback(_u(...t), t);
}
class Yu extends w.Component {
  getSnapshotBeforeUpdate(e) {
    const n = this.props.childRef.current;
    if (ne(n) && e.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const s = n.offsetParent, i = ne(s) && s.offsetWidth || 0, r = ne(s) && s.offsetHeight || 0, o = getComputedStyle(n), a = this.props.sizeRef.current;
      a.height = parseFloat(o.height), a.width = parseFloat(o.width), a.top = n.offsetTop, a.left = n.offsetLeft, a.right = i - a.width - a.left, a.bottom = r - a.height - a.top, a.direction = o.direction;
    }
    return null;
  }
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function qu({ children: t, isPresent: e, anchorX: n, anchorY: s, root: i, pop: r }) {
  var _a2;
  const o = w.useId(), a = w.useRef(null), l = w.useRef({ width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0, direction: "ltr" }), { nonce: u } = w.useContext(Gn), c = r !== false ? ((_a2 = t.props) == null ? void 0 : _a2.ref) ?? (t == null ? void 0 : t.ref) : void 0, h = Xu(a, c);
  return w.useInsertionEffect(() => {
    const { width: f, height: p, top: d, left: g, right: m, bottom: y, direction: v } = l.current;
    if (e || r === false || !a.current || !f || !p) return;
    const x = v === "rtl", T = n === "left" ? x ? `right: ${m}` : `left: ${g}` : x ? `left: ${g}` : `right: ${m}`, V = s === "bottom" ? `bottom: ${y}` : `top: ${d}`;
    a.current.dataset.motionPopId = o;
    const C = document.createElement("style");
    u && (C.nonce = u);
    const M = i ?? document.head;
    return M.appendChild(C), C.sheet && C.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${f}px !important;
            height: ${p}px !important;
            ${T}px !important;
            ${V}px !important;
          }
        `), () => {
      var _a3;
      (_a3 = a.current) == null ? void 0 : _a3.removeAttribute("data-motion-pop-id"), M.contains(C) && M.removeChild(C);
    };
  }, [e]), rt.jsx(Yu, { isPresent: e, childRef: a, sizeRef: l, pop: r, children: r === false ? t : w.cloneElement(t, { ref: h }) });
}
const Zu = ({ children: t, initial: e, isPresent: n, onExitComplete: s, custom: i, presenceAffectsLayout: r, mode: o, anchorX: a, anchorY: l, root: u }) => {
  const c = xe(Ju), h = w.useId(), f = w.useRef(n), p = w.useRef(s);
  Te(() => {
    f.current = n, p.current = s;
  });
  let d = true, g = w.useMemo(() => (d = false, { id: h, initial: e, isPresent: n, custom: i, onExitComplete: (m) => {
    c.set(m, true);
    for (const y of c.values()) if (!y) return;
    s && s();
  }, register: (m) => (c.set(m, false), () => {
    var _a2;
    c.delete(m), !f.current && !c.size && ((_a2 = p.current) == null ? void 0 : _a2.call(p));
  }) }), [n, c, s]);
  return r && d && (g = { ...g }), w.useMemo(() => {
    c.forEach((m, y) => c.set(y, false));
  }, [n]), w.useEffect(() => {
    !n && !c.size && s && s();
  }, [n]), t = rt.jsx(qu, { pop: o === "popLayout", isPresent: n, anchorX: a, anchorY: l, root: u, children: t }), rt.jsx(we.Provider, { value: g, children: t });
};
function Ju() {
  return /* @__PURE__ */ new Map();
}
function er(t = true) {
  const e = w.useContext(we);
  if (e === null) return [true, null];
  const { isPresent: n, onExitComplete: s, register: i } = e, r = w.useId();
  w.useEffect(() => {
    if (t) return i(r);
  }, [t]);
  const o = w.useCallback(() => t && s && s(r), [r, s, t]);
  return !n && s ? [false, o] : [true];
}
const Jt = (t) => t.key || "";
function ri(t) {
  const e = [];
  return w.Children.forEach(t, (n) => {
    w.isValidElement(n) && e.push(n);
  }), e;
}
const Eh = ({ children: t, custom: e, initial: n = true, onExitComplete: s, presenceAffectsLayout: i = true, mode: r = "sync", propagate: o = false, anchorX: a = "left", anchorY: l = "top", root: u }) => {
  const [c, h] = er(o), f = w.useMemo(() => ri(t), [t]), p = o && !c ? [] : f.map(Jt), d = w.useRef(true), g = w.useRef(f), m = xe(() => /* @__PURE__ */ new Map()), y = w.useRef(/* @__PURE__ */ new Set()), [v, x] = w.useState(f), [T, V] = w.useState(f);
  Te(() => {
    d.current = false, g.current = f;
    for (let P = 0; P < T.length; P++) {
      const A = Jt(T[P]);
      p.includes(A) ? (m.delete(A), y.current.delete(A)) : m.get(A) !== true && m.set(A, false);
    }
  }, [T, p.length, p.join("-")]);
  const C = [];
  if (f !== v) {
    let P = [...f];
    for (let A = 0; A < T.length; A++) {
      const b = T[A], D = Jt(b);
      p.includes(D) || (P.splice(A, 0, b), C.push(b));
    }
    return r === "wait" && C.length && (P = C), V(ri(P)), x(f), null;
  }
  const { forceRender: M } = w.useContext(gn);
  return rt.jsx(rt.Fragment, { children: T.map((P) => {
    const A = Jt(P), b = o && !c ? false : f === T || p.includes(A), D = () => {
      if (y.current.has(A)) return;
      if (m.has(A)) y.current.add(A), m.set(A, true);
      else return;
      let B = true;
      m.forEach((N) => {
        N || (B = false);
      }), B && (M == null ? void 0 : M(), V(g.current), o && (h == null ? void 0 : h()), s && s());
    };
    return rt.jsx(Zu, { isPresent: b, initial: !d.current || n ? void 0 : false, custom: e, presenceAffectsLayout: i, mode: r, root: u, onExitComplete: b ? void 0 : D, anchorX: a, anchorY: l, children: P }, A);
  }) });
}, nr = w.createContext({ strict: false }), ai = { animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"], exit: ["exit"], drag: ["drag", "dragControls"], focus: ["whileFocus"], hover: ["whileHover", "onHoverStart", "onHoverEnd"], tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"], pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"], inView: ["whileInView", "onViewportEnter", "onViewportLeave"], layout: ["layout", "layoutId"] };
let li = false;
function Qu() {
  if (li) return;
  const t = {};
  for (const e in ai) t[e] = { isEnabled: (n) => ai[e].some((s) => !!n[s]) };
  Mo(t), li = true;
}
function sr() {
  return Qu(), Nl();
}
function tc(t) {
  const e = sr();
  for (const n in t) e[n] = { ...e[n], ...t[n] };
  Mo(e);
}
const ec = /* @__PURE__ */ new Set(["animate", "exit", "variants", "initial", "style", "values", "variants", "transition", "transformTemplate", "custom", "inherit", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave", "globalTapTarget", "propagate", "ignoreStrict", "viewport"]);
function ve(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || ec.has(t);
}
let ir = (t) => !ve(t);
function nc(t) {
  typeof t == "function" && (ir = (e) => e.startsWith("on") ? !ve(e) : t(e));
}
try {
  nc(require("@emotion/is-prop-valid").default);
} catch {
}
function sc(t, e, n) {
  const s = {};
  for (const i in t) i === "values" && typeof t.values == "object" || O(t[i]) || (ir(i) || n === true && ve(i) || !e && !ve(i) || t.draggable && i.startsWith("onDrag")) && (s[i] = t[i]);
  return s;
}
const Ce = w.createContext({});
function ic(t, e) {
  if (Ve(t)) {
    const { initial: n, animate: s } = t;
    return { initial: n === false || Kt(n) ? n : void 0, animate: Kt(s) ? s : void 0 };
  }
  return t.inherit !== false ? e : {};
}
function oc(t) {
  const { initial: e, animate: n } = ic(t, w.useContext(Ce));
  return w.useMemo(() => ({ initial: e, animate: n }), [ui(e), ui(n)]);
}
function ui(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const Hn = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function or(t, e, n) {
  for (const s in e) !O(e[s]) && !Io(s, n) && (t[s] = e[s]);
}
function rc({ transformTemplate: t }, e) {
  return w.useMemo(() => {
    const n = Hn();
    return $n(n, e, t), Object.assign({}, n.vars, n.style);
  }, [e]);
}
function ac(t, e) {
  const n = t.style || {}, s = {};
  return or(s, n, t), Object.assign(s, rc(t, e)), s;
}
function lc(t, e) {
  const n = {}, s = ac(t, e);
  return t.drag && t.dragListener !== false && (n.draggable = false, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = t.drag === true ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0), n.style = s, n;
}
const rr = () => ({ ...Hn(), attrs: {} });
function uc(t, e, n, s) {
  const i = w.useMemo(() => {
    const r = rr();
    return jo(r, e, Uo(s), t.transformTemplate, t.style), { ...r.attrs, style: { ...r.style } };
  }, [e]);
  if (t.style) {
    const r = {};
    or(r, t.style, t), i.style = { ...r, ...i.style };
  }
  return i;
}
const cc = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "switch", "symbol", "svg", "text", "tspan", "use", "view"];
function _n(t) {
  return typeof t != "string" || t.includes("-") ? false : !!(cc.indexOf(t) > -1 || /[A-Z]/u.test(t));
}
function hc(t, e, n, { latestValues: s }, i, r = false, o) {
  const l = (o ?? _n(t) ? uc : lc)(e, s, i, t), u = sc(e, typeof t == "string", r), c = t !== w.Fragment ? { ...u, ...l, ref: n } : {}, { children: h } = e, f = w.useMemo(() => O(h) ? h.get() : h, [h]);
  return w.createElement(t, { ...c, children: f });
}
function fc({ scrapeMotionValuesFromProps: t, createRenderState: e }, n, s, i) {
  return { latestValues: dc(n, s, i, t), renderState: e() };
}
function dc(t, e, n, s) {
  const i = {}, r = s(t, {});
  for (const f in r) i[f] = le(r[f]);
  let { initial: o, animate: a } = t;
  const l = Ve(t), u = Vo(t);
  e && u && !l && t.inherit !== false && (o === void 0 && (o = e.initial), a === void 0 && (a = e.animate));
  let c = n ? n.initial === false : false;
  c = c || o === false;
  const h = c ? a : o;
  if (h && typeof h != "boolean" && !be(h)) {
    const f = Array.isArray(h) ? h : [h];
    for (let p = 0; p < f.length; p++) {
      const d = Ln(t, f[p]);
      if (d) {
        const { transitionEnd: g, transition: m, ...y } = d;
        for (const v in y) {
          let x = y[v];
          if (Array.isArray(x)) {
            const T = c ? x.length - 1 : 0;
            x = x[T];
          }
          x !== null && (i[v] = x);
        }
        for (const v in g) i[v] = g[v];
      }
    }
  }
  return i;
}
const ar = (t) => (e, n) => {
  const s = w.useContext(Ce), i = w.useContext(we), r = () => fc(t, e, s, i);
  return n ? r() : xe(r);
}, pc = ar({ scrapeMotionValuesFromProps: zn, createRenderState: Hn }), mc = ar({ scrapeMotionValuesFromProps: Wo, createRenderState: rr }), gc = /* @__PURE__ */ Symbol.for("motionComponentSymbol");
function yc(t, e, n) {
  const s = w.useRef(n);
  w.useInsertionEffect(() => {
    s.current = n;
  });
  const i = w.useRef(null);
  return w.useCallback((r) => {
    var _a2;
    r && ((_a2 = t.onMount) == null ? void 0 : _a2.call(t, r)), e && (r ? e.mount(r) : e.unmount());
    const o = s.current;
    if (typeof o == "function") if (r) {
      const a = o(r);
      typeof a == "function" && (i.current = a);
    } else i.current ? (i.current(), i.current = null) : o(r);
    else o && (o.current = r);
  }, [e]);
}
const lr = w.createContext({});
function wt(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function vc(t, e, n, s, i, r) {
  var _a2, _b;
  const { visualElement: o } = w.useContext(Ce), a = w.useContext(nr), l = w.useContext(we), u = w.useContext(Gn), c = u.reducedMotion, h = u.skipAnimations, f = w.useRef(null), p = w.useRef(false);
  s = s || a.renderer, !f.current && s && (f.current = s(t, { visualState: e, parent: o, props: n, presenceContext: l, blockInitialAnimation: l ? l.initial === false : false, reducedMotionConfig: c, skipAnimations: h, isSVG: r }), p.current && f.current && (f.current.manuallyAnimateOnMount = true));
  const d = f.current, g = w.useContext(lr);
  d && !d.projection && i && (d.type === "html" || d.type === "svg") && xc(f.current, n, i, g);
  const m = w.useRef(false);
  w.useInsertionEffect(() => {
    d && m.current && d.update(n, l);
  });
  const y = n[po], v = w.useRef(!!y && typeof window < "u" && !((_a2 = window.MotionHandoffIsComplete) == null ? void 0 : _a2.call(window, y)) && ((_b = window.MotionHasOptimisedAnimation) == null ? void 0 : _b.call(window, y)));
  return Te(() => {
    p.current = true, d && (m.current = true, window.MotionIsMounted = true, d.updateFeatures(), d.scheduleRenderMicrotask(), v.current && d.animationState && d.animationState.animateChanges());
  }), w.useEffect(() => {
    d && (!v.current && d.animationState && d.animationState.animateChanges(), v.current && (queueMicrotask(() => {
      var _a3;
      (_a3 = window.MotionHandoffMarkAsComplete) == null ? void 0 : _a3.call(window, y);
    }), v.current = false), d.enteringChildren = void 0);
  }), d;
}
function xc(t, e, n, s) {
  const { layoutId: i, layout: r, drag: o, dragConstraints: a, layoutScroll: l, layoutRoot: u, layoutAnchor: c, layoutCrossfade: h } = e;
  t.projection = new n(t.latestValues, e["data-framer-portal-id"] ? void 0 : ur(t.parent)), t.projection.setOptions({ layoutId: i, layout: r, alwaysMeasureLayout: !!o || a && wt(a), visualElement: t, animationType: typeof r == "string" ? r : "both", initialPromotionConfig: s, crossfade: h, layoutScroll: l, layoutRoot: u, layoutAnchor: c });
}
function ur(t) {
  if (t) return t.options.allowProjection !== false ? t.projection : ur(t.parent);
}
function Ne(t, { forwardMotionProps: e = false, type: n } = {}, s, i) {
  s && tc(s);
  const r = n ? n === "svg" : _n(t), o = r ? mc : pc;
  function a(u, c) {
    let h;
    const f = { ...w.useContext(Gn), ...u, layoutId: Tc(u) }, { isStatic: p } = f, d = oc(u), g = o(u, p);
    if (!p && typeof window < "u") {
      wc();
      const m = Sc(f);
      h = m.MeasureLayout, d.visualElement = vc(t, g, f, i, m.ProjectionNode, r);
    }
    return rt.jsxs(Ce.Provider, { value: d, children: [h && d.visualElement ? rt.jsx(h, { visualElement: d.visualElement, ...f }) : null, hc(t, u, yc(g, d.visualElement, c), g, p, e, r)] });
  }
  a.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const l = w.forwardRef(a);
  return l[gc] = t, l;
}
function Tc({ layoutId: t }) {
  const e = w.useContext(gn).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function wc(t, e) {
  w.useContext(nr).strict;
}
function Sc(t) {
  const e = sr(), { drag: n, layout: s } = e;
  if (!n && !s) return {};
  const i = { ...n, ...s };
  return { MeasureLayout: (n == null ? void 0 : n.isEnabled(t)) || (s == null ? void 0 : s.isEnabled(t)) ? i.MeasureLayout : void 0, ProjectionNode: i.ProjectionNode };
}
function Pc(t, e) {
  if (typeof Proxy > "u") return Ne;
  const n = /* @__PURE__ */ new Map(), s = (r, o) => Ne(r, o, t, e), i = (r, o) => s(r, o);
  return new Proxy(i, { get: (r, o) => o === "create" ? s : (n.has(o) || n.set(o, Ne(o, void 0, t, e)), n.get(o)) });
}
const Ac = (t, e) => e.isSVG ?? _n(t) ? new Ko(e) : new Oo(e, { allowProjection: t !== w.Fragment });
class bc extends ht {
  constructor(e) {
    super(e), e.animationState || (e.animationState = ru(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    be(e) && (this.unmountControls = e.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    e !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var _a2;
    this.node.animationState.reset(), (_a2 = this.unmountControls) == null ? void 0 : _a2.call(this);
  }
}
let Vc = 0;
class Cc extends ht {
  constructor() {
    super(...arguments), this.id = Vc++, this.isExitComplete = false;
  }
  update() {
    var _a2;
    if (!this.node.presenceContext) return;
    const { isPresent: e, onExitComplete: n } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === s) return;
    if (e && s === false) {
      if (this.isExitComplete) {
        const { initial: r, custom: o } = this.node.getProps();
        if (typeof r == "string" || typeof r == "object" && r !== null && !Array.isArray(r)) {
          const a = yt(this.node, r, o);
          if (a) {
            const { transition: l, transitionEnd: u, ...c } = a;
            for (const h in c) (_a2 = this.node.getValue(h)) == null ? void 0 : _a2.jump(c[h]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else this.node.animationState.setActive("exit", false);
      this.isExitComplete = false;
      return;
    }
    const i = this.node.animationState.setActive("exit", !e);
    n && !e && i.then(() => {
      this.isExitComplete = true, n(this.id);
    });
  }
  mount() {
    const { register: e, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), e && (this.unmount = e(this.id));
  }
  unmount() {
  }
}
const Mc = { animation: { Feature: bc }, exit: { Feature: Cc } };
function _t(t) {
  return { point: { x: t.pageX, y: t.pageY } };
}
const Dc = (t) => (e) => Nn(e) && t(e, _t(e));
function jt(t, e, n, s) {
  return $t(t, e, Dc(n), s);
}
const cr = ({ current: t }) => t ? t.ownerDocument.defaultView : null, ci = (t, e) => Math.abs(t - e);
function Ec(t, e) {
  const n = ci(t.x, e.x), s = ci(t.y, e.y);
  return Math.sqrt(n ** 2 + s ** 2);
}
const hi = /* @__PURE__ */ new Set(["auto", "scroll"]);
class hr {
  constructor(e, n, { transformPagePoint: s, contextWindow: i = window, dragSnapToOrigin: r = false, distanceThreshold: o = 3, element: a } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (d) => {
      this.handleScroll(d.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Qt(this.lastRawMoveEventInfo, this.transformPagePoint));
      const d = Ue(this.lastMoveEventInfo, this.history), g = this.startEvent !== null, m = Ec(d.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!g && !m) return;
      const { point: y } = d, { timestamp: v } = j;
      this.history.push({ ...y, timestamp: v });
      const { onStart: x, onMove: T } = this.handlers;
      g || (x && x(this.lastMoveEvent, d), this.startEvent = this.lastMoveEvent), T && T(this.lastMoveEvent, d);
    }, this.handlePointerMove = (d, g) => {
      this.lastMoveEvent = d, this.lastRawMoveEventInfo = g, this.lastMoveEventInfo = Qt(g, this.transformPagePoint), L.update(this.updatePoint, true);
    }, this.handlePointerUp = (d, g) => {
      this.end();
      const { onEnd: m, onSessionEnd: y, resumeAnimation: v } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && v && v(), !(this.lastMoveEvent && this.lastMoveEventInfo)) return;
      const x = Ue(d.type === "pointercancel" ? this.lastMoveEventInfo : Qt(g, this.transformPagePoint), this.history);
      this.startEvent && m && m(d, x), y && y(d, x);
    }, !Nn(e)) return;
    this.dragSnapToOrigin = r, this.handlers = n, this.transformPagePoint = s, this.distanceThreshold = o, this.contextWindow = i || window;
    const l = _t(e), u = Qt(l, this.transformPagePoint), { point: c } = u, { timestamp: h } = j;
    this.history = [{ ...c, timestamp: h }];
    const { onSessionStart: f } = n;
    f && f(e, Ue(u, this.history));
    const p = { passive: true, capture: true };
    this.removeListeners = zt(jt(this.contextWindow, "pointermove", this.handlePointerMove, p), jt(this.contextWindow, "pointerup", this.handlePointerUp, p), jt(this.contextWindow, "pointercancel", this.handlePointerUp, p)), a && this.startScrollTracking(a);
  }
  startScrollTracking(e) {
    let n = e.parentElement;
    for (; n; ) {
      const s = getComputedStyle(n);
      (hi.has(s.overflowX) || hi.has(s.overflowY)) && this.scrollPositions.set(n, { x: n.scrollLeft, y: n.scrollTop }), n = n.parentElement;
    }
    this.scrollPositions.set(window, { x: window.scrollX, y: window.scrollY }), window.addEventListener("scroll", this.onElementScroll, { capture: true }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, { capture: true }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  handleScroll(e) {
    const n = this.scrollPositions.get(e);
    if (!n) return;
    const s = e === window, i = s ? { x: window.scrollX, y: window.scrollY } : { x: e.scrollLeft, y: e.scrollTop }, r = { x: i.x - n.x, y: i.y - n.y };
    r.x === 0 && r.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += r.x, this.lastMoveEventInfo.point.y += r.y) : this.history.length > 0 && (this.history[0].x -= r.x, this.history[0].y -= r.y), this.scrollPositions.set(e, i), L.update(this.updatePoint, true));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), ct(this.updatePoint);
  }
}
function Qt(t, e) {
  return e ? { point: e(t.point) } : t;
}
function fi(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function Ue({ point: t }, e) {
  return { point: t, delta: fi(t, fr(e)), offset: fi(t, Rc(e)), velocity: Lc(e, 0.1) };
}
function Rc(t) {
  return t[0];
}
function fr(t) {
  return t[t.length - 1];
}
function Lc(t, e) {
  if (t.length < 2) return { x: 0, y: 0 };
  let n = t.length - 1, s = null;
  const i = fr(t);
  for (; n >= 0 && (s = t[n], !(i.timestamp - s.timestamp > z(e))); ) n--;
  if (!s) return { x: 0, y: 0 };
  s === t[0] && t.length > 2 && i.timestamp - s.timestamp > z(e) * 2 && (s = t[1]);
  const r = _(i.timestamp - s.timestamp);
  if (r === 0) return { x: 0, y: 0 };
  const o = { x: (i.x - s.x) / r, y: (i.y - s.y) / r };
  return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
}
function kc(t, { min: e, max: n }, s) {
  return e !== void 0 && t < e ? t = s ? R(e, t, s.min) : Math.max(t, e) : n !== void 0 && t > n && (t = s ? R(n, t, s.max) : Math.min(t, n)), t;
}
function di(t, e, n) {
  return { min: e !== void 0 ? t.min + e : void 0, max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0 };
}
function Bc(t, { top: e, left: n, bottom: s, right: i }) {
  return { x: di(t.x, n, i), y: di(t.y, e, s) };
}
function pi(t, e) {
  let n = e.min - t.min, s = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, s] = [s, n]), { min: n, max: s };
}
function Fc(t, e) {
  return { x: pi(t.x, e.x), y: pi(t.y, e.y) };
}
function Ic(t, e) {
  let n = 0.5;
  const s = K(t), i = K(e);
  return i > s ? n = Vt(e.min, e.max - s, t.min) : s > i && (n = Vt(t.min, t.max - i, e.min)), st(0, 1, n);
}
function Oc(t, e) {
  const n = {};
  return e.min !== void 0 && (n.min = e.min - t.min), e.max !== void 0 && (n.max = e.max - t.min), n;
}
const dn = 0.35;
function jc(t = dn) {
  return t === false ? t = 0 : t === true && (t = dn), { x: mi(t, "left", "right"), y: mi(t, "top", "bottom") };
}
function mi(t, e, n) {
  return { min: gi(t, e), max: gi(t, n) };
}
function gi(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const Nc = /* @__PURE__ */ new WeakMap();
class Uc {
  constructor(e) {
    this.openDragLock = null, this.isDragging = false, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = false, this.hasMutatedConstraints = false, this.elastic = F(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: n = false, distanceThreshold: s } = {}) {
    const { presenceContext: i } = this.visualElement;
    if (i && i.isPresent === false) return;
    const r = (h) => {
      n && this.snapToCursor(_t(h).point), this.stopAnimation();
    }, o = (h, f) => {
      const { drag: p, dragPropagation: d, onDragStart: g } = this.getProps();
      if (p && !d && (this.openDragLock && this.openDragLock(), this.openDragLock = vl(p), !this.openDragLock)) return;
      this.latestPointerEvent = h, this.latestPanInfo = f, this.isDragging = true, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = true, this.visualElement.projection.target = void 0), tt((y) => {
        let v = this.getAxisMotionValue(y).get() || 0;
        if (nt.test(v)) {
          const { projection: x } = this.visualElement;
          if (x && x.layout) {
            const T = x.layout.layoutBox[y];
            T && (v = K(T) * (parseFloat(v) / 100));
          }
        }
        this.originPoint[y] = v;
      }), g && L.update(() => g(h, f), false, true), sn(this.visualElement, "transform");
      const { animationState: m } = this.visualElement;
      m && m.setActive("whileDrag", true);
    }, a = (h, f) => {
      this.latestPointerEvent = h, this.latestPanInfo = f;
      const { dragPropagation: p, dragDirectionLock: d, onDirectionLock: g, onDrag: m } = this.getProps();
      if (!p && !this.openDragLock) return;
      const { offset: y } = f;
      if (d && this.currentDirection === null) {
        this.currentDirection = Kc(y), this.currentDirection !== null && g && g(this.currentDirection);
        return;
      }
      this.updateAxis("x", f.point, y), this.updateAxis("y", f.point, y), this.visualElement.render(), m && L.update(() => m(h, f), false, true);
    }, l = (h, f) => {
      this.latestPointerEvent = h, this.latestPanInfo = f, this.stop(h, f), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, u = () => {
      const { dragSnapToOrigin: h } = this.getProps();
      (h || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new hr(e, { onSessionStart: r, onStart: o, onMove: a, onSessionEnd: l, resumeAnimation: u }, { transformPagePoint: this.visualElement.getTransformPagePoint(), dragSnapToOrigin: c, distanceThreshold: s, contextWindow: cr(this.visualElement), element: this.visualElement.current });
  }
  stop(e, n) {
    const s = e || this.latestPointerEvent, i = n || this.latestPanInfo, r = this.isDragging;
    if (this.cancel(), !r || !i || !s) return;
    const { velocity: o } = i;
    this.startAnimation(o);
    const { onDragEnd: a } = this.getProps();
    a && L.postRender(() => a(s, i));
  }
  cancel() {
    this.isDragging = false;
    const { projection: e, animationState: n } = this.visualElement;
    e && (e.isAnimationBlocked = false), this.endPanSession();
    const { dragPropagation: s } = this.getProps();
    !s && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", false);
  }
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(e, n, s) {
    const { drag: i } = this.getProps();
    if (!s || !te(e, i, this.currentDirection)) return;
    const r = this.getAxisMotionValue(e);
    let o = this.originPoint[e] + s[e];
    this.constraints && this.constraints[e] && (o = kc(o, this.constraints[e], this.elastic[e])), r.set(o);
  }
  resolveConstraints() {
    var _a2;
    const { dragConstraints: e, dragElastic: n } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : (_a2 = this.visualElement.projection) == null ? void 0 : _a2.layout, i = this.constraints;
    e && wt(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && s ? this.constraints = Bc(s.layoutBox, e) : this.constraints = false, this.elastic = jc(n), i !== this.constraints && !wt(e) && s && this.constraints && !this.hasMutatedConstraints && tt((r) => {
      this.constraints !== false && this.getAxisMotionValue(r) && (this.constraints[r] = Oc(s.layoutBox[r], this.constraints[r]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !wt(e)) return false;
    const s = e.current, { projection: i } = this.visualElement;
    if (!i || !i.layout) return false;
    i.root && (i.root.scroll = void 0, i.root.updateScroll());
    const r = $l(s, i.root, this.visualElement.getTransformPagePoint());
    let o = Fc(i.layout.layoutBox, r);
    if (n) {
      const a = n(Ul(o));
      this.hasMutatedConstraints = !!a, a && (o = Ro(a));
    }
    return o;
  }
  startAnimation(e) {
    const { drag: n, dragMomentum: s, dragElastic: i, dragTransition: r, dragSnapToOrigin: o, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, u = tt((c) => {
      if (!te(c, n, this.currentDirection)) return;
      let h = l && l[c] || {};
      (o === true || o === c) && (h = { min: 0, max: 0 });
      const f = i ? 200 : 1e6, p = i ? 40 : 1e7, d = { type: "inertia", velocity: s ? e[c] : 0, bounceStiffness: f, bounceDamping: p, timeConstant: 750, restDelta: 1, restSpeed: 10, ...r, ...h };
      return this.startAxisValueAnimation(c, d);
    });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(e, n) {
    const s = this.getAxisMotionValue(e);
    return sn(this.visualElement, e), s.start(Rn(e, s, 0, n, this.visualElement, false));
  }
  stopAnimation() {
    tt((e) => this.getAxisMotionValue(e).stop());
  }
  getAxisMotionValue(e) {
    const n = `_drag${e.toUpperCase()}`, i = this.visualElement.getProps()[n];
    return i || this.visualElement.getValue(e, this.visualElement.latestValues[e] ?? 0);
  }
  snapToCursor(e) {
    tt((n) => {
      const { drag: s } = this.getProps();
      if (!te(n, s, this.currentDirection)) return;
      const { projection: i } = this.visualElement, r = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: o, max: a } = i.layout.layoutBox[n], l = r.get() || 0;
        r.set(e[n] - R(o, a, 0.5) + l);
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: e, dragConstraints: n } = this.getProps(), { projection: s } = this.visualElement;
    if (!wt(n) || !s || !this.constraints) return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    tt((o) => {
      const a = this.getAxisMotionValue(o);
      if (a && this.constraints !== false) {
        const l = a.get();
        i[o] = Ic({ min: l, max: l }, this.constraints[o]);
      }
    });
    const { transformTemplate: r } = this.visualElement.getProps();
    this.visualElement.current.style.transform = r ? r({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = false, this.resolveConstraints(), tt((o) => {
      if (!te(o, e, null)) return;
      const a = this.getAxisMotionValue(o), { min: l, max: u } = this.constraints[o];
      a.set(R(l, u, i[o]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current) return;
    Nc.set(this.visualElement, this);
    const e = this.visualElement.current, n = jt(e, "pointerdown", (u) => {
      const { drag: c, dragListener: h = true } = this.getProps(), f = u.target, p = f !== e && Al(f);
      c && h && !p && this.start(u);
    });
    let s;
    const i = () => {
      const { dragConstraints: u } = this.getProps();
      wt(u) && u.current && (this.constraints = this.resolveRefConstraints(), s || (s = Wc(e, u.current, () => this.scalePositionWithinConstraints())));
    }, { projection: r } = this.visualElement, o = r.addEventListener("measure", i);
    r && !r.layout && (r.root && r.root.updateScroll(), r.updateLayout()), L.read(i);
    const a = $t(window, "resize", () => this.scalePositionWithinConstraints()), l = r.addEventListener("didUpdate", (({ delta: u, hasLayoutChanged: c }) => {
      this.isDragging && c && (tt((h) => {
        const f = this.getAxisMotionValue(h);
        f && (this.originPoint[h] += u[h].translate, f.set(f.get() + u[h].translate));
      }), this.visualElement.render());
    }));
    return () => {
      a(), n(), o(), l && l(), s && s();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: n = false, dragDirectionLock: s = false, dragPropagation: i = false, dragConstraints: r = false, dragElastic: o = dn, dragMomentum: a = true } = e;
    return { ...e, drag: n, dragDirectionLock: s, dragPropagation: i, dragConstraints: r, dragElastic: o, dragMomentum: a };
  }
}
function yi(t) {
  let e = true;
  return () => {
    if (e) {
      e = false;
      return;
    }
    t();
  };
}
function Wc(t, e, n) {
  const s = As(t, yi(n)), i = As(e, yi(n));
  return () => {
    s(), i();
  };
}
function te(t, e, n) {
  return (e === true || e === t) && (n === null || n === t);
}
function Kc(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"), n;
}
class $c extends ht {
  constructor(e) {
    super(e), this.removeGroupControls = X, this.removeListeners = X, this.controls = new Uc(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || X;
  }
  update() {
    const { dragControls: e } = this.node.getProps(), { dragControls: n } = this.node.prevProps || {};
    e !== n && (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const We = (t) => (e, n) => {
  t && L.update(() => t(e, n), false, true);
};
class zc extends ht {
  constructor() {
    super(...arguments), this.removePointerDownListener = X;
  }
  onPointerDown(e) {
    this.session = new hr(e, this.createPanHandlers(), { transformPagePoint: this.node.getTransformPagePoint(), contextWindow: cr(this.node) });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: n, onPan: s, onPanEnd: i } = this.node.getProps();
    return { onSessionStart: We(e), onStart: We(n), onMove: We(s), onEnd: (r, o) => {
      delete this.session, i && L.postRender(() => i(r, o));
    } };
  }
  mount() {
    this.removePointerDownListener = jt(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let Ke = false;
class Gc extends w.Component {
  componentDidMount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: s, layoutId: i } = this.props, { projection: r } = e;
    r && (n.group && n.group.add(r), s && s.register && i && s.register(r), Ke && r.root.didUpdate(), r.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), r.setOptions({ ...r.options, layoutDependency: this.props.layoutDependency, onExitComplete: () => this.safeToRemove() })), ue.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: n, visualElement: s, drag: i, isPresent: r } = this.props, { projection: o } = s;
    return o && (o.isPresent = r, e.layoutDependency !== n && o.setOptions({ ...o.options, layoutDependency: n }), Ke = true, i || e.layoutDependency !== n || n === void 0 || e.isPresent !== r ? o.willUpdate() : this.safeToRemove(), e.isPresent !== r && (r ? o.promote() : o.relegate() || L.postRender(() => {
      const a = o.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: e, layoutAnchor: n } = this.props, { projection: s } = e;
    s && (s.options.layoutAnchor = n, s.root.didUpdate(), jn.postRender(() => {
      !s.currentAnimation && s.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: s } = this.props, { projection: i } = e;
    Ke = true, i && (i.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(i), s && s.deregister && s.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function dr(t) {
  const [e, n] = er(), s = w.useContext(gn);
  return rt.jsx(Gc, { ...t, layoutGroup: s, switchLayoutGroup: w.useContext(lr), isPresent: e, safeToRemove: n });
}
const Hc = { pan: { Feature: zc }, drag: { Feature: $c, ProjectionNode: tr, MeasureLayout: dr } };
function vi(t, e, n) {
  const { props: s } = t;
  t.animationState && s.whileHover && t.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n, r = s[i];
  r && L.postRender(() => r(e, _t(e)));
}
class _c extends ht {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = Tl(e, (n, s) => (vi(this.node, s, "Start"), (i) => vi(this.node, i, "End"))));
  }
  unmount() {
  }
}
class Xc extends ht {
  constructor() {
    super(...arguments), this.isActive = false;
  }
  onFocus() {
    let e = false;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = true;
    }
    !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", true), this.isActive = true);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", false), this.isActive = false);
  }
  mount() {
    this.unmount = zt($t(this.node.current, "focus", () => this.onFocus()), $t(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function xi(t, e, n) {
  const { props: s } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled) return;
  t.animationState && s.whileTap && t.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n), r = s[i];
  r && L.postRender(() => r(e, _t(e)));
}
class Yc extends ht {
  mount() {
    const { current: e } = this.node;
    if (!e) return;
    const { globalTapTarget: n, propagate: s } = this.node.props;
    this.unmount = Vl(e, (i, r) => (xi(this.node, r, "Start"), (o, { success: a }) => xi(this.node, o, a ? "End" : "Cancel")), { useGlobalTarget: n, stopPropagation: (s == null ? void 0 : s.tap) === false });
  }
  unmount() {
  }
}
const pn = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), qc = (t) => {
  const e = pn.get(t.target);
  e && e(t);
}, Zc = (t) => {
  t.forEach(qc);
};
function Jc({ root: t, ...e }) {
  const n = t || document;
  $e.has(n) || $e.set(n, {});
  const s = $e.get(n), i = JSON.stringify(e);
  return s[i] || (s[i] = new IntersectionObserver(Zc, { root: t, ...e })), s[i];
}
function Qc(t, e, n) {
  const s = Jc(e);
  return pn.set(t, n), s.observe(t), () => {
    pn.delete(t), s.unobserve(t);
  };
}
const th = { some: 0, all: 1 };
class eh extends ht {
  constructor() {
    super(...arguments), this.hasEnteredView = false, this.isInView = false;
  }
  startObserver() {
    var _a2;
    (_a2 = this.stopObserver) == null ? void 0 : _a2.call(this);
    const { viewport: e = {} } = this.node.getProps(), { root: n, margin: s, amount: i = "some", once: r } = e, o = { root: n ? n.current : void 0, rootMargin: s, threshold: typeof i == "number" ? i : th[i] }, a = (l) => {
      const { isIntersecting: u } = l;
      if (this.isInView === u || (this.isInView = u, r && !u && this.hasEnteredView)) return;
      u && (this.hasEnteredView = true), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: c, onViewportLeave: h } = this.node.getProps(), f = u ? c : h;
      f && f(l);
    };
    this.stopObserver = Qc(this.node.current, o, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(nh(e, n)) && this.startObserver();
  }
  unmount() {
    var _a2;
    (_a2 = this.stopObserver) == null ? void 0 : _a2.call(this), this.hasEnteredView = false, this.isInView = false;
  }
}
function nh({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const sh = { inView: { Feature: eh }, tap: { Feature: Yc }, focus: { Feature: Xc }, hover: { Feature: _c } }, ih = { layout: { ProjectionNode: tr, MeasureLayout: dr } }, oh = { ...Mc, ...sh, ...Hc, ...ih }, rh = Pc(oh, Ac);
function Rh() {
  !Kn.current && Co();
  const [t] = w.useState(pe.current);
  return t;
}
function ah(t) {
  t.values.forEach((e) => e.stop());
}
function mn(t, e) {
  [...e].reverse().forEach((s) => {
    const i = t.getVariant(s);
    i && kn(t, i), t.variantChildren && t.variantChildren.forEach((r) => {
      mn(r, e);
    });
  });
}
function lh(t, e) {
  if (Array.isArray(e)) return mn(t, e);
  if (typeof e == "string") return mn(t, [e]);
  kn(t, e);
}
function uh() {
  const t = /* @__PURE__ */ new Set(), e = { subscribe(n) {
    return t.add(n), () => {
      t.delete(n);
    };
  }, start(n, s) {
    const i = [];
    return t.forEach((r) => {
      i.push(go(r, n, { transitionOverride: s }));
    }), Promise.all(i);
  }, set(n) {
    return t.forEach((s) => {
      lh(s, n);
    });
  }, stop() {
    t.forEach((n) => {
      ah(n);
    });
  }, mount() {
    return () => {
      e.stop();
    };
  } };
  return e;
}
function Xn(t) {
  return typeof t == "object" && !Array.isArray(t);
}
function pr(t, e, n, s) {
  return t == null ? [] : typeof t == "string" && Xn(e) ? On(t, n, s) : t instanceof NodeList ? Array.from(t) : Array.isArray(t) ? t.filter((i) => i != null) : [t];
}
function ch(t, e, n) {
  return t * (e + 1) + n * e;
}
function Ti(t, e, n, s) {
  return typeof e == "number" ? e : e.startsWith("-") || e.startsWith("+") ? Math.max(0, t + parseFloat(e)) : e === "<" ? n : e.startsWith("<") ? Math.max(0, n + parseFloat(e.slice(1))) : s.get(e) ?? t;
}
function hh(t, e, n) {
  for (let s = 0; s < t.length; s++) {
    const i = t[s];
    i.at > e && i.at < n && (bt(t, i), s--);
  }
}
function fh(t, e, n, s, i, r) {
  hh(t, i, r);
  for (let o = 0; o < e.length; o++) t.push({ value: e[o], at: R(i, r, s[o]), easing: Oi(n, o) });
}
function dh(t, e, n = 0) {
  const s = e + 1 + e * n;
  for (let i = 0; i < t.length; i++) t[i] = t[i] / s;
}
function ph(t, e) {
  return t.at === e.at ? t.value === null ? 1 : e.value === null ? -1 : 0 : t.at - e.at;
}
const mh = "easeInOut", gh = 20;
function yh(t, { defaultTransition: e = {}, ...n } = {}, s, i) {
  const r = e.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, u = /* @__PURE__ */ new Map();
  let c = 0, h = 0, f = 0;
  for (let p = 0; p < t.length; p++) {
    const d = t[p];
    if (typeof d == "string") {
      u.set(d, h);
      continue;
    } else if (!Array.isArray(d)) {
      u.set(d.name, Ti(h, d.at, c, u));
      continue;
    }
    let [g, m, y = {}] = d;
    y.at !== void 0 && (h = Ti(h, y.at, c, u));
    let v = 0;
    const x = (T, V, C, M = 0, P = 0) => {
      const A = vh(T), { delay: b = 0, times: D = Ji(A), type: B = e.type || "keyframes", repeat: N, repeatType: $, repeatDelay: G = 0, ...H } = V;
      let { ease: J = e.ease || "easeOut", duration: E } = V;
      const U = typeof b == "function" ? b(M, P) : b, Q = A.length, it = Dn(B) ? B : i == null ? void 0 : i[B || "keyframes"];
      if (Q <= 2 && it) {
        let xt = 100;
        if (Q === 2 && wh(A)) {
          const Rt = A[1] - A[0];
          xt = Math.abs(Rt);
        }
        const Tt = { ...e, ...H };
        E !== void 0 && (Tt.duration = z(E));
        const Yt = Yi(Tt, xt, it);
        J = Yt.ease, E = Yt.duration;
      }
      E ?? (E = r);
      const Xt = h + U;
      D.length === 1 && D[0] === 0 && (D[1] = 1);
      const Yn = D.length - A.length;
      if (Yn > 0 && Zi(D, Yn), A.length === 1 && A.unshift(null), N && N < gh) {
        const xt = E > 0 ? G / E : 0;
        E = ch(E, N, G);
        const Tt = [...A], Yt = [...D];
        J = Array.isArray(J) ? [...J] : [J];
        const Rt = [...J], Zn = $ === "reverse" || $ === "mirror";
        let Jn = Tt, Qn = Rt;
        Zn && (Jn = [...Tt].reverse(), $ === "reverse" && (Qn = [...Rt].reverse().map((at) => typeof at == "function" ? xn(at) : at)));
        for (let at = 0; at < N; at++) {
          const ts = Zn && at % 2 === 0, es = ts ? Jn : Tt, gr = ts ? Qn : Rt, ns = (at + 1) * (1 + xt);
          xt > 0 && (A.push(A[A.length - 1]), D.push(ns), J.push("linear")), A.push(...es);
          for (let Lt = 0; Lt < es.length; Lt++) D.push(Yt[Lt] + ns), J.push(Lt === 0 ? "linear" : Oi(gr, Lt - 1));
        }
        dh(D, N, xt);
      }
      const qn = Xt + E;
      fh(C, A, J, D, Xt, qn), v = Math.max(U + E, v), f = Math.max(qn, f);
    };
    if (O(g)) {
      const T = wi(g, a);
      x(m, y, Si("default", T));
    } else {
      const T = pr(g, m, s, l), V = T.length;
      for (let C = 0; C < V; C++) {
        m = m, y = y;
        const M = T[C], P = wi(M, a);
        for (const A in m) x(m[A], xh(y, A), Si(A, P), C, V);
      }
    }
    c = h, h += v;
  }
  return a.forEach((p, d) => {
    for (const g in p) {
      const m = p[g];
      m.sort(ph);
      const y = [], v = [], x = [];
      for (let M = 0; M < m.length; M++) {
        const { at: P, value: A, easing: b } = m[M];
        y.push(A), v.push(Vt(0, f, P)), x.push(b || "easeOut");
      }
      v[0] !== 0 && (v.unshift(0), y.unshift(y[0]), x.unshift(mh)), v[v.length - 1] !== 1 && (v.push(1), y.push(null)), o.has(d) || o.set(d, { keyframes: {}, transition: {} });
      const T = o.get(d);
      T.keyframes[g] = y;
      const { type: V, ...C } = e;
      T.transition[g] = { ...C, duration: f, ease: x, times: v, ...n };
    }
  }), o;
}
function wi(t, e) {
  return !e.has(t) && e.set(t, {}), e.get(t);
}
function Si(t, e) {
  return e[t] || (e[t] = []), e[t];
}
function vh(t) {
  return Array.isArray(t) ? t : [t];
}
function xh(t, e) {
  return t && t[e] ? { ...t, ...t[e] } : { ...t };
}
const Th = (t) => typeof t == "number", wh = (t) => t.every(Th);
function Sh(t) {
  const e = { presenceContext: null, props: {}, visualState: { renderState: { transform: {}, transformOrigin: {}, style: {}, vars: {}, attrs: {} }, latestValues: {} } }, n = Ae(t) && !bo(t) ? new Ko(e) : new Oo(e);
  n.mount(t), Wt.set(t, n);
}
function Ph(t) {
  const e = { presenceContext: null, props: {}, visualState: { renderState: { output: {} }, latestValues: {} } }, n = new ql(e);
  n.mount(t), Wt.set(t, n);
}
function Ah(t, e) {
  return O(t) || typeof t == "number" || typeof t == "string" && !Xn(e);
}
function mr(t, e, n, s) {
  const i = [];
  if (Ah(t, e)) i.push(qo(t, Xn(e) && e.default || e, n && (n.default || n)));
  else {
    if (t == null) return i;
    const r = pr(t, e, s), o = r.length;
    for (let a = 0; a < o; a++) {
      const l = r[a], u = l instanceof Element ? Sh : Ph;
      Wt.has(l) || u(l);
      const c = Wt.get(l), h = { ...n };
      "delay" in h && typeof h.delay == "function" && (h.delay = h.delay(a, o)), i.push(...Fn(c, { ...e, transition: h }, {}));
    }
  }
  return i;
}
function bh(t, e, n) {
  const s = [], i = t.map((o) => {
    if (Array.isArray(o) && typeof o[0] == "function") {
      const a = o[0], l = vt(0);
      return l.on("change", a), o.length === 1 ? [l, [0, 1]] : o.length === 2 ? [l, [0, 1], o[1]] : [l, o[1], o[2]];
    }
    return o;
  });
  return yh(i, e, n, { spring: Ut }).forEach(({ keyframes: o, transition: a }, l) => {
    s.push(...mr(l, o, a));
  }), s;
}
function Vh(t) {
  return Array.isArray(t) && t.some(Array.isArray);
}
function Ch(t = {}) {
  const { scope: e, reduceMotion: n, skipAnimations: s } = t;
  function i(r, o, a) {
    let l = [], u;
    const c = {};
    if (n !== void 0 && (c.reduceMotion = n), s !== void 0 && (c.skipAnimations = s), Vh(r)) {
      const { onComplete: f, ...p } = o || {};
      typeof f == "function" && (u = f), l = bh(r, { ...c, ...p }, e);
    } else {
      const { onComplete: f, ...p } = a || {};
      typeof f == "function" && (u = f), l = mr(r, o, { ...c, ...p }, e);
    }
    const h = new $a(l);
    return u && h.finished.then(u), e && (e.animations.push(h), h.finished.then(() => {
      bt(e.animations, h);
    })), h;
  }
  return i;
}
const Lh = Ch();
function kh() {
  const t = xe(uh);
  return Te(t.mount, []), t;
}
const Bh = rh;
export {
  Eh as A,
  kh as a,
  Lh as b,
  Bh as m,
  Rh as u
};
