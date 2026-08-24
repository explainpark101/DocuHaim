var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _e2, _a;
import { r as i, R as $e, j as h, a as vt, $ as Wc } from "./vendor-react-SY5QCjFA.js";
import { _ as We, a as ss, b as Uc } from "./vendor-aws-bxAUTq4h.js";
var Hc = Object.defineProperty, So = (e, t) => Hc(e, "name", { value: t, configurable: true });
function oo(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
So(oo, "setRef");
function is(...e) {
  return (t) => {
    let n = false;
    const o = e.map((r) => {
      const s = oo(r, t);
      return !n && typeof s == "function" && (n = true), s;
    });
    if (n) return () => {
      for (let r = 0; r < o.length; r++) {
        const s = o[r];
        typeof s == "function" ? s() : oo(e[r], null);
      }
    };
  };
}
So(is, "composeRefs");
function B(...e) {
  return i.useCallback(is(...e), e);
}
So(B, "useComposedRefs");
var Gc = Object.defineProperty, ye = (e, t) => Gc(e, "name", { value: t, configurable: true });
function Ee(e) {
  const t = i.forwardRef((n, o) => {
    let { children: r, ...s } = n, c = null, a = false;
    const l = [];
    ro(r) && typeof Ht == "function" && (r = Ht(r._payload)), i.Children.forEach(r, (f) => {
      var _a3;
      if (ds(f)) {
        a = true;
        const m = f;
        let g = "child" in m.props ? m.props.child : m.props.children;
        ro(g) && typeof Ht == "function" && (g = Ht(g._payload)), c = Kc(m, g), l.push((_a3 = c == null ? void 0 : c.props) == null ? void 0 : _a3.children);
      } else l.push(f);
    }), c ? c = i.cloneElement(c, void 0, l) : !a && i.Children.count(r) === 1 && i.isValidElement(r) && (c = r);
    const u = c ? us(c) : void 0, p = B(o, u);
    if (!c) {
      if (r || r === 0) throw new Error(a ? Xc(e) : Yc(e));
      return r;
    }
    const d = ls(s, c.props ?? {});
    return c.type !== i.Fragment && (d.ref = o ? p : u), i.cloneElement(c, d);
  });
  return t.displayName = `${e}.Slot`, t;
}
ye(Ee, "createSlot");
var cs = /* @__PURE__ */ Symbol.for("radix.slottable");
function as(e) {
  const t = ye((n) => "child" in n ? n.children(n.child) : n.children, "Slottable");
  return t.displayName = `${e}.Slottable`, t.__radixId = cs, t;
}
ye(as, "createSlottable");
var Kc = ye((e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return i.isValidElement(n) ? i.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return i.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function ls(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...a) => {
      const l = s(...a);
      return r(...a), l;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
ye(ls, "mergeProps");
function us(e) {
  var _a3, _b;
  let t = (_a3 = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : _a3.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (_b = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : _b.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
ye(us, "getElementRef");
function ds(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === cs;
}
ye(ds, "isSlottable");
var zc = /* @__PURE__ */ Symbol.for("react.lazy");
function ro(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === zc && "_payload" in e && fs(e._payload);
}
ye(ro, "isLazyComponent");
function fs(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
ye(fs, "isPromiseLike");
var Yc = ye((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), Xc = ye((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Ht = $e[" use ".trim().toString()], qc = Object.defineProperty, Zc = (e, t) => qc(e, "name", { value: t, configurable: true }), Qc = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"], L = Qc.reduce((e, t) => {
  const n = Ee(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: c, ...a } = r, l = c ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = true), h.jsx(l, { ...a, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Io(e, t) {
  e && vt.flushSync(() => e.dispatchEvent(t));
}
Zc(Io, "dispatchDiscreteCustomEvent");
var Jc = Object.defineProperty, ea = (e, t) => Jc(e, "name", { value: t, configurable: true }), ps = Object.freeze({ position: "absolute", border: 0, width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", wordWrap: "normal" }), ta = i.forwardRef(ea(function(t, n) {
  return h.jsx(L.span, { ...t, ref: n, style: { ...ps, ...t.style } });
}, "VisuallyHidden")), na = ta, oa = Object.defineProperty, ve = (e, t) => oa(e, "name", { value: t, configurable: true });
function ra(e, t) {
  const n = i.createContext(t);
  n.displayName = e + "Context";
  const o = ve((s) => {
    const { children: c, ...a } = s, l = i.useMemo(() => a, Object.values(a));
    return h.jsx(n.Provider, { value: l, children: c });
  }, "Provider");
  o.displayName = e + "Provider";
  function r(s, c = {}) {
    const { optional: a = false } = c, l = i.useContext(n);
    if (l) return l;
    if (t !== void 0) return t;
    if (!a) throw new Error(`\`${s}\` must be used within \`${e}\``);
  }
  return ve(r, "useContext"), [o, r];
}
ve(ra, "createContext");
function ne(e, t = []) {
  let n = [];
  function o(s, c) {
    const a = i.createContext(c);
    a.displayName = s + "Context";
    const l = n.length;
    n = [...n, c];
    const u = ve((d) => {
      var _a3;
      const { scope: f, children: m, ...g } = d, v = ((_a3 = f == null ? void 0 : f[e]) == null ? void 0 : _a3[l]) || a, C = i.useMemo(() => g, Object.values(g));
      return h.jsx(v.Provider, { value: C, children: m });
    }, "Provider");
    u.displayName = s + "Provider";
    function p(d, f, m = {}) {
      var _a3;
      const { optional: g = false } = m, v = ((_a3 = f == null ? void 0 : f[e]) == null ? void 0 : _a3[l]) || a, C = i.useContext(v);
      if (C) return C;
      if (c !== void 0) return c;
      if (!g) throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return ve(p, "useContext"), [u, p];
  }
  ve(o, "createContext");
  const r = ve(() => {
    const s = n.map((c) => i.createContext(c));
    return ve(function(a) {
      const l = (a == null ? void 0 : a[e]) || s;
      return i.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: l } }), [a, l]);
    }, "useScope");
  }, "createScope");
  return r.scopeName = e, [o, ms(r, ...t)];
}
ve(ne, "createContextScope");
function ms(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = ve(() => {
    const o = e.map((r) => ({ useScope: r(), scopeName: r.scopeName }));
    return ve(function(s) {
      const c = o.reduce((a, { useScope: l, scopeName: u }) => {
        const d = l(s)[`__scope${u}`];
        return { ...a, ...d };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: c }), [c]);
    }, "useComposedScopes");
  }, "createScope");
  return n.scopeName = t.scopeName, n;
}
ve(ms, "composeContextScopes");
var sa = Object.defineProperty, te = (e, t) => sa(e, "name", { value: t, configurable: true });
function pn(e) {
  const t = e + "CollectionProvider", [n, o] = ne(t), [r, s] = n(t, { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }), c = te((v) => {
    const { scope: C, children: x } = v, w = i.useRef(null), y = i.useRef(/* @__PURE__ */ new Map()).current;
    return h.jsx(r, { scope: C, itemMap: y, collectionRef: w, children: x });
  }, "CollectionProvider");
  c.displayName = t;
  const a = e + "CollectionSlot", l = Ee(a), u = i.forwardRef((v, C) => {
    const { scope: x, children: w } = v, y = s(a, x), b = B(C, y.collectionRef);
    return h.jsx(l, { ref: b, children: w });
  });
  u.displayName = a;
  const p = e + "CollectionItemSlot", d = "data-radix-collection-item", f = Ee(p), m = i.forwardRef((v, C) => {
    const { scope: x, children: w, ...y } = v, b = i.useRef(null), R = B(C, b), E = s(p, x);
    return i.useEffect(() => (E.itemMap.set(b, { ref: b, ...y }), () => {
      E.itemMap.delete(b);
    })), h.jsx(f, { [d]: "", ref: R, children: w });
  });
  m.displayName = p;
  function g(v) {
    const C = s(e + "CollectionConsumer", v);
    return i.useCallback(() => {
      const w = C.collectionRef.current;
      if (!w) return [];
      const y = Array.from(w.querySelectorAll(`[${d}]`));
      return Array.from(C.itemMap.values()).sort((E, P) => y.indexOf(E.ref.current) - y.indexOf(P.ref.current));
    }, [C.collectionRef, C.itemMap]);
  }
  return te(g, "useCollection"), [{ Provider: c, Slot: u, ItemSlot: m }, g, o];
}
te(pn, "createCollection");
var wr = /* @__PURE__ */ new WeakMap(), Vn = (_a = class extends Map {
  constructor(t) {
    super(t);
    __privateAdd(this, _e2);
    __privateSet(this, _e2, [...super.keys()]), wr.set(this, true);
  }
  set(t, n) {
    return wr.get(this) && (this.has(t) ? __privateGet(this, _e2)[__privateGet(this, _e2).indexOf(t)] = t : __privateGet(this, _e2).push(t)), super.set(t, n), this;
  }
  insert(t, n, o) {
    const r = this.has(n), s = __privateGet(this, _e2).length, c = _o(t);
    let a = c >= 0 ? c : s + c;
    const l = a < 0 || a >= s ? -1 : a;
    if (l === this.size || r && l === this.size - 1 || l === -1) return this.set(n, o), this;
    const u = this.size + (r ? 0 : 1);
    c < 0 && a++;
    const p = [...__privateGet(this, _e2)];
    let d, f = false;
    for (let m = a; m < u; m++) if (a === m) {
      let g = p[m];
      p[m] === n && (g = p[m + 1]), r && this.delete(n), d = this.get(g), this.set(n, o);
    } else {
      !f && p[m - 1] === n && (f = true);
      const g = p[f ? m : m - 1], v = d;
      d = this.get(g), this.delete(g), this.set(g, v);
    }
    return this;
  }
  with(t, n, o) {
    const r = new _a(this);
    return r.insert(t, n, o), r;
  }
  before(t) {
    const n = __privateGet(this, _e2).indexOf(t) - 1;
    if (!(n < 0)) return this.entryAt(n);
  }
  setBefore(t, n, o) {
    const r = __privateGet(this, _e2).indexOf(t);
    return r === -1 ? this : this.insert(r, n, o);
  }
  after(t) {
    let n = __privateGet(this, _e2).indexOf(t);
    if (n = n === -1 || n === this.size - 1 ? -1 : n + 1, n !== -1) return this.entryAt(n);
  }
  setAfter(t, n, o) {
    const r = __privateGet(this, _e2).indexOf(t);
    return r === -1 ? this : this.insert(r + 1, n, o);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    return __privateSet(this, _e2, []), super.clear();
  }
  delete(t) {
    const n = super.delete(t);
    return n && __privateGet(this, _e2).splice(__privateGet(this, _e2).indexOf(t), 1), n;
  }
  deleteAt(t) {
    const n = this.keyAt(t);
    return n !== void 0 ? this.delete(n) : false;
  }
  at(t) {
    const n = en(__privateGet(this, _e2), t);
    if (n !== void 0) return this.get(n);
  }
  entryAt(t) {
    const n = en(__privateGet(this, _e2), t);
    if (n !== void 0) return [n, this.get(n)];
  }
  indexOf(t) {
    return __privateGet(this, _e2).indexOf(t);
  }
  keyAt(t) {
    return en(__privateGet(this, _e2), t);
  }
  from(t, n) {
    const o = this.indexOf(t);
    if (o === -1) return;
    let r = o + n;
    return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.at(r);
  }
  keyFrom(t, n) {
    const o = this.indexOf(t);
    if (o === -1) return;
    let r = o + n;
    return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.keyAt(r);
  }
  find(t, n) {
    let o = 0;
    for (const r of this) {
      if (Reflect.apply(t, n, [r, o, this])) return r;
      o++;
    }
  }
  findIndex(t, n) {
    let o = 0;
    for (const r of this) {
      if (Reflect.apply(t, n, [r, o, this])) return o;
      o++;
    }
    return -1;
  }
  filter(t, n) {
    const o = [];
    let r = 0;
    for (const s of this) Reflect.apply(t, n, [s, r, this]) && o.push(s), r++;
    return new _a(o);
  }
  map(t, n) {
    const o = [];
    let r = 0;
    for (const s of this) o.push([s[0], Reflect.apply(t, n, [s, r, this])]), r++;
    return new _a(o);
  }
  reduce(...t) {
    const [n, o] = t;
    let r = 0, s = o ?? this.at(0);
    for (const c of this) r === 0 && t.length === 1 ? s = c : s = Reflect.apply(n, this, [s, c, r, this]), r++;
    return s;
  }
  reduceRight(...t) {
    const [n, o] = t;
    let r = o ?? this.at(-1);
    for (let s = this.size - 1; s >= 0; s--) {
      const c = this.at(s);
      s === this.size - 1 && t.length === 1 ? r = c : r = Reflect.apply(n, this, [r, c, s, this]);
    }
    return r;
  }
  toSorted(t) {
    const n = [...this.entries()].sort(t);
    return new _a(n);
  }
  toReversed() {
    const t = new _a();
    for (let n = this.size - 1; n >= 0; n--) {
      const o = this.keyAt(n), r = this.get(o);
      t.set(o, r);
    }
    return t;
  }
  toSpliced(...t) {
    const n = [...this.entries()];
    return n.splice(...t), new _a(n);
  }
  slice(t, n) {
    const o = new _a();
    let r = this.size - 1;
    if (t === void 0) return o;
    t < 0 && (t = t + this.size), n !== void 0 && n > 0 && (r = n - 1);
    for (let s = t; s <= r; s++) {
      const c = this.keyAt(s), a = this.get(c);
      o.set(c, a);
    }
    return o;
  }
  every(t, n) {
    let o = 0;
    for (const r of this) {
      if (!Reflect.apply(t, n, [r, o, this])) return false;
      o++;
    }
    return true;
  }
  some(t, n) {
    let o = 0;
    for (const r of this) {
      if (Reflect.apply(t, n, [r, o, this])) return true;
      o++;
    }
    return false;
  }
}, _e2 = new WeakMap(), te(_a, "OrderedDict"), _a);
function en(e, t) {
  if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
  const n = hs(e, t);
  return n === -1 ? void 0 : e[n];
}
te(en, "at");
function hs(e, t) {
  const n = e.length, o = _o(t), r = o >= 0 ? o : n + o;
  return r < 0 || r >= n ? -1 : r;
}
te(hs, "toSafeIndex");
function _o(e) {
  return e !== e || e === 0 ? 0 : Math.trunc(e);
}
te(_o, "toSafeInteger");
function ia(e) {
  const t = e + "CollectionProvider", [n, o] = ne(t), [r, s] = n(t, { collectionElement: null, collectionRef: { current: null }, collectionRefObject: { current: null }, itemMap: new Vn(), setItemMap: te(() => {
  }, "setItemMap") }), c = te(({ state: y, ...b }) => y ? h.jsx(l, { ...b, state: y }) : h.jsx(a, { ...b }), "CollectionProvider");
  c.displayName = t;
  const a = te((y) => {
    const b = C();
    return h.jsx(l, { ...y, state: b });
  }, "CollectionInit");
  a.displayName = t + "Init";
  const l = te((y) => {
    const { scope: b, children: R, state: E } = y, P = i.useRef(null), [_, O] = i.useState(null), A = B(P, O), [S, I] = E;
    return i.useEffect(() => {
      if (!_) return;
      const D = Cs(() => {
      });
      return D.observe(_, { childList: true, subtree: true }), () => {
        D.disconnect();
      };
    }, [_]), h.jsx(r, { scope: b, itemMap: S, setItemMap: I, collectionRef: A, collectionRefObject: P, collectionElement: _, children: R });
  }, "CollectionProviderImpl");
  l.displayName = t + "Impl";
  const u = e + "CollectionSlot", p = Ee(u), d = i.forwardRef((y, b) => {
    const { scope: R, children: E } = y, P = s(u, R), _ = B(b, P.collectionRef);
    return h.jsx(p, { ref: _, children: E });
  });
  d.displayName = u;
  const f = e + "CollectionItemSlot", m = "data-radix-collection-item", g = Ee(f), v = i.forwardRef((y, b) => {
    const { scope: R, children: E, ...P } = y, _ = i.useRef(null), [O, A] = i.useState(null), S = B(b, _, A), I = s(f, R), { setItemMap: D } = I, k = i.useRef(P);
    vs(k.current, P) || (k.current = P);
    const W = k.current;
    return i.useEffect(() => {
      const N = W;
      return D(($) => O ? $.has(O) ? $.set(O, { ...N, element: O }).toSorted(so) : ($.set(O, { ...N, element: O }), $.toSorted(so)) : $), () => {
        D(($) => !O || !$.has(O) ? $ : ($.delete(O), new Vn($)));
      };
    }, [O, W, D]), h.jsx(g, { [m]: "", ref: S, children: E });
  });
  v.displayName = f;
  function C() {
    return i.useState(new Vn());
  }
  te(C, "useInitCollection");
  function x(y) {
    const { itemMap: b } = s(e + "CollectionConsumer", y);
    return b;
  }
  return te(x, "useCollection"), [{ Provider: c, Slot: d, ItemSlot: v }, { createCollectionScope: o, useCollection: x, useInitCollection: C }];
}
te(ia, "createCollection");
function vs(e, t) {
  if (e === t) return true;
  if (typeof e != "object" || typeof t != "object" || e == null || t == null) return false;
  const n = Object.keys(e), o = Object.keys(t);
  if (n.length !== o.length) return false;
  for (const r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || e[r] !== t[r]) return false;
  return true;
}
te(vs, "shallowEqual");
function gs(e, t) {
  return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
te(gs, "isElementPreceding");
function so(e, t) {
  return !e[1].element || !t[1].element ? 0 : gs(e[1].element, t[1].element) ? -1 : 1;
}
te(so, "sortByDocumentPosition");
function Cs(e) {
  return new MutationObserver((n) => {
    for (const o of n) if (o.type === "childList") {
      e();
      return;
    }
  });
}
te(Cs, "getChildListObserver");
var ca = Object.defineProperty, gt = (e, t) => ca(e, "name", { value: t, configurable: true }), ys = !!(typeof window < "u" && window.document && window.document.createElement);
function T(e, t, { checkForDefaultPrevented: n = true } = {}) {
  return gt(function(r) {
    if (e == null ? void 0 : e(r), n === false || !r || !r.defaultPrevented) return t == null ? void 0 : t(r);
  }, "handleEvent");
}
gt(T, "composeEventHandlers");
function aa(e) {
  var _a3;
  if (!ys) throw new Error("Cannot access window outside of the DOM");
  return ((_a3 = e == null ? void 0 : e.ownerDocument) == null ? void 0 : _a3.defaultView) ?? window;
}
gt(aa, "getOwnerWindow");
function io(e) {
  if (!ys) throw new Error("Cannot access document outside of the DOM");
  return (e == null ? void 0 : e.ownerDocument) ?? document;
}
gt(io, "getOwnerDocument");
function bs(e, t = false) {
  const { activeElement: n } = io(e);
  if (!(n == null ? void 0 : n.nodeName)) return null;
  if (xs(n) && n.contentDocument) return bs(n.contentDocument.body, t);
  if (t) {
    const o = n.getAttribute("aria-activedescendant");
    if (o) {
      const r = io(n).getElementById(o);
      if (r) return r;
    }
  }
  return n;
}
gt(bs, "getActiveElement");
function xs(e) {
  return e.tagName === "IFRAME";
}
gt(xs, "isFrame");
var Q = (globalThis == null ? void 0 : globalThis.document) ? i.useLayoutEffect : () => {
}, la = Object.defineProperty, ua = (e, t) => la(e, "name", { value: t, configurable: true }), Er = $e[" useEffectEvent ".trim().toString()], Rr = $e[" useInsertionEffect ".trim().toString()];
function ws(e) {
  if (typeof Er == "function") return Er(e);
  const t = i.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof Rr == "function" ? Rr(() => {
    t.current = e;
  }) : Q(() => {
    t.current = e;
  }), i.useMemo(() => ((...n) => {
    var _a3;
    return (_a3 = t.current) == null ? void 0 : _a3.call(t, ...n);
  }), []);
}
ua(ws, "useEffectEvent");
var da = Object.defineProperty, Ft = (e, t) => da(e, "name", { value: t, configurable: true }), fa = $e[" useInsertionEffect ".trim().toString()] || Q;
function de({ prop: e, defaultProp: t, onChange: n = Ft(() => {
}, "onChange"), caller: o }) {
  const [r, s, c] = Es({ defaultProp: t, onChange: n }), a = e !== void 0, l = a ? e : r, u = i.useCallback((p) => {
    var _a3;
    if (a) {
      const d = Rs(p) ? p(e) : p;
      d !== e && ((_a3 = c.current) == null ? void 0 : _a3.call(c, d));
    } else s(p);
  }, [a, e, s, c]);
  return [l, u];
}
Ft(de, "useControllableState");
function Es({ defaultProp: e, onChange: t }) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return fa(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    var _a3;
    r.current !== n && ((_a3 = s.current) == null ? void 0 : _a3.call(s, n), r.current = n);
  }, [n, r]), [n, o, s];
}
Ft(Es, "useUncontrolledState");
function Rs(e) {
  return typeof e == "function";
}
Ft(Rs, "isFunction");
var Pr = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function pa(e, t, n, o) {
  const { prop: r, defaultProp: s, onChange: c, caller: a } = t, l = r !== void 0, u = ws(c), p = [{ ...n, state: s }];
  o && p.push(o);
  const [d, f] = i.useReducer((C, x) => {
    if (x.type === Pr) return { ...C, state: x.state };
    const w = e(C, x);
    return l && !Object.is(w.state, C.state) && u(w.state), w;
  }, ...p), m = d.state, g = i.useRef(m);
  i.useEffect(() => {
    g.current !== m && (g.current = m, l || u(m));
  }, [m, g, l]);
  const v = i.useMemo(() => r !== void 0 ? { ...d, state: r } : d, [d, r]);
  return i.useEffect(() => {
    l && !Object.is(r, d.state) && f({ type: Pr, state: r });
  }, [r, d.state, l]), [v, f];
}
Ft(pa, "useControllableStateReducer");
var ma = Object.defineProperty, Fe = (e, t) => ma(e, "name", { value: t, configurable: true });
function Ps(e, t) {
  return i.useReducer((n, o) => t[n][o] ?? n, e);
}
Fe(Ps, "useStateMachine");
var fe = Fe((e) => {
  const { present: t, children: n } = e, o = Ss(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = Is(o.ref, _s(r));
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
}, "Presence");
function Ss(e) {
  const [t, n] = i.useState(), o = i.useRef(null), r = i.useRef(e), s = i.useRef("none"), c = i.useRef(void 0), a = e ? "mounted" : "unmounted", [l, u] = Ps(a, { mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" }, unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" }, unmounted: { MOUNT: "mounted" } });
  return i.useEffect(() => {
    l === "mounted" ? (s.current = c.current ?? dt(o.current), c.current = void 0) : s.current = "none";
  }, [l]), Q(() => {
    const p = o.current, d = r.current;
    if (d !== e) {
      const m = s.current, g = dt(p);
      e ? (c.current = g, u("MOUNT")) : g === "none" || (p == null ? void 0 : p.display) === "none" ? u("UNMOUNT") : u(d && m !== g ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, u]), Q(() => {
    if (t) {
      let p;
      const d = t.ownerDocument.defaultView ?? window, f = Fe((g) => {
        const C = dt(o.current).includes(CSS.escape(g.animationName));
        if (g.target === t && C && (u("ANIMATION_END"), !r.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", p = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, "handleAnimationEnd"), m = Fe((g) => {
        g.target === t && (s.current = dt(o.current));
      }, "handleAnimationStart");
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
        d.clearTimeout(p), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f);
      };
    } else u("ANIMATION_END");
  }, [t, u]), { isPresent: ["mounted", "unmountSuspended"].includes(l), ref: i.useCallback((p) => {
    if (p) {
      const d = getComputedStyle(p);
      o.current = d, c.current = dt(d);
    } else o.current = null;
    n(p);
  }, []) };
}
Fe(Ss, "usePresence");
function co(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
Fe(co, "setRef");
function Is(...e) {
  const t = i.useRef(e);
  return t.current = e, i.useCallback((n) => {
    const o = t.current;
    let r = false;
    const s = o.map((c) => {
      const a = co(c, n);
      return !r && typeof a == "function" && (r = true), a;
    });
    if (r) return () => {
      for (let c = 0; c < s.length; c++) {
        const a = s[c];
        typeof a == "function" ? a() : co(o[c], null);
      }
    };
  }, []);
}
Fe(Is, "useStableComposedRefs");
function dt(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
Fe(dt, "getAnimationName");
function _s(e) {
  var _a3, _b;
  let t = (_a3 = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : _a3.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (_b = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : _b.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Fe(_s, "getElementRef");
var ha = Object.defineProperty, va = (e, t) => ha(e, "name", { value: t, configurable: true }), ga = $e[" useId ".trim().toString()] || (() => {
}), Ca = 0;
function ue(e) {
  const [t, n] = i.useState(ga());
  return Q(() => {
    e || n((o) => o ?? String(Ca++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
va(ue, "useId");
var ya = Object.defineProperty, ba = (e, t) => ya(e, "name", { value: t, configurable: true }), xa = i.createContext(void 0);
function Ct(e) {
  const t = i.useContext(xa);
  return e || t || "ltr";
}
ba(Ct, "useDirection");
var wa = Object.defineProperty, Ea = (e, t) => wa(e, "name", { value: t, configurable: true });
function ge(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => ((...n) => {
    var _a3;
    return (_a3 = t.current) == null ? void 0 : _a3.call(t, ...n);
  }), []);
}
Ea(ge, "useCallbackRef");
var Ra = Object.defineProperty, ee = (e, t) => Ra(e, "name", { value: t, configurable: true }), ao = "dismissableLayer.update", Pa = "dismissableLayer.pointerDownOutside", Sa = "dismissableLayer.focusOutside", Sr, Ts = i.createContext({ layers: /* @__PURE__ */ new Set(), layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(), branches: /* @__PURE__ */ new Set(), dismissableSurfaces: /* @__PURE__ */ new Set() }), kt = i.forwardRef(ee(function(t, n) {
  const { disableOutsidePointerEvents: o = false, deferPointerDownOutside: r = false, onEscapeKeyDown: s, onPointerDownOutside: c, onFocusOutside: a, onInteractOutside: l, onDismiss: u, ...p } = t, d = i.useContext(Ts), [f, m] = i.useState(null), g = (f == null ? void 0 : f.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, v] = i.useState({}), C = B(n, m), x = Array.from(d.layers), [w] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), y = w ? x.indexOf(w) : -1, b = f ? x.indexOf(f) : -1, R = d.layersWithOutsidePointerEventsDisabled.size > 0, E = b >= y, P = i.useRef(false), _ = Ds((I) => {
    c == null ? void 0 : c(I), l == null ? void 0 : l(I), I.defaultPrevented || (u == null ? void 0 : u());
  }, { ownerDocument: g, deferPointerDownOutside: r, isDeferredPointerDownOutsideRef: P, dismissableSurfaces: d.dismissableSurfaces, shouldHandlePointerDownOutside: i.useCallback((I) => {
    if (!(I instanceof Node)) return false;
    const D = [...d.branches].some((k) => k.contains(I));
    return E && !D;
  }, [d.branches, E]) }), O = As((I) => {
    if (r && P.current) return;
    const D = I.target;
    [...d.branches].some((W) => W.contains(D)) || (a == null ? void 0 : a(I), l == null ? void 0 : l(I), I.defaultPrevented || (u == null ? void 0 : u()));
  }, g), A = f ? b === x.length - 1 : false, S = ge((I) => {
    I.key === "Escape" && (s == null ? void 0 : s(I), !I.defaultPrevented && u && (I.preventDefault(), u()));
  });
  return i.useEffect(() => {
    if (A) return g.addEventListener("keydown", S, { capture: true }), () => g.removeEventListener("keydown", S, { capture: true });
  }, [g, A, S]), i.useEffect(() => {
    if (f) return o && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (Sr = g.body.style.pointerEvents, g.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), lo(), () => {
      o && (d.layersWithOutsidePointerEventsDisabled.delete(f), d.layersWithOutsidePointerEventsDisabled.size === 0 && (g.body.style.pointerEvents = Sr));
    };
  }, [f, g, o, d]), i.useEffect(() => () => {
    f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), lo());
  }, [f, d]), i.useEffect(() => {
    const I = ee(() => v({}), "handleUpdate");
    return document.addEventListener(ao, I), () => document.removeEventListener(ao, I);
  }, []), h.jsx(L.div, { ...p, ref: C, style: { pointerEvents: R ? E ? "auto" : "none" : void 0, ...t.style }, onFocusCapture: T(t.onFocusCapture, O.onFocusCapture), onBlurCapture: T(t.onBlurCapture, O.onBlurCapture), onPointerDownCapture: T(t.onPointerDownCapture, _.onPointerDownCapture) });
}, "DismissableLayer"));
function Os() {
  const e = i.useContext(Ts), [t, n] = i.useState(null);
  return i.useEffect(() => {
    if (t) return e.dismissableSurfaces.add(t), () => {
      e.dismissableSurfaces.delete(t);
    };
  }, [t, e.dismissableSurfaces]), n;
}
ee(Os, "useDismissableLayerSurface");
var Ia = ee(() => true, "IS_TRUE");
function Ds(e, t) {
  const { ownerDocument: n = globalThis == null ? void 0 : globalThis.document, deferPointerDownOutside: o = false, isDeferredPointerDownOutsideRef: r, dismissableSurfaces: s, shouldHandlePointerDownOutside: c = Ia } = t, a = ge(e), l = i.useRef(false), u = i.useRef(false), p = i.useRef(/* @__PURE__ */ new Map()), d = i.useRef(() => {
  });
  return i.useEffect(() => {
    function f() {
      u.current = false, r.current = false, p.current.clear();
    }
    ee(f, "resetOutsideInteraction");
    function m() {
      return Array.from(p.current.values()).some(Boolean);
    }
    ee(m, "isOutsideInteractionIntercepted");
    function g(y) {
      if (!u.current) return;
      const b = y.target;
      b instanceof Node && [...s].some((E) => E.contains(b)) || p.current.set(y.type, true), y.type === "click" && window.setTimeout(() => {
        u.current && d.current();
      }, 0);
    }
    ee(g, "handleInteractionCapture");
    function v(y) {
      u.current && p.current.set(y.type, false);
    }
    ee(v, "handleInteractionBubble");
    const C = ee((y) => {
      if (y.target && !l.current) {
        let b = function() {
          n.removeEventListener("click", d.current);
          const E = m();
          f(), E || To(Pa, a, R, { discrete: true });
        };
        if (ee(b, "handleAndDispatchPointerDownOutsideEvent"), !c(y.target)) {
          n.removeEventListener("click", d.current), f(), l.current = false;
          return;
        }
        const R = { originalEvent: y };
        u.current = true, r.current = o && y.button === 0, p.current.clear(), !o || y.button !== 0 ? b() : (n.removeEventListener("click", d.current), d.current = b, n.addEventListener("click", d.current, { once: true }));
      } else n.removeEventListener("click", d.current), f();
      l.current = false;
    }, "handlePointerDown"), x = ["pointerup", "mousedown", "mouseup", "touchstart", "touchend", "click"];
    for (const y of x) n.addEventListener(y, g, true), n.addEventListener(y, v);
    const w = window.setTimeout(() => {
      n.addEventListener("pointerdown", C);
    }, 0);
    return () => {
      window.clearTimeout(w), n.removeEventListener("pointerdown", C), n.removeEventListener("click", d.current);
      for (const y of x) n.removeEventListener(y, g, true), n.removeEventListener(y, v);
    };
  }, [n, a, o, r, s, c]), { onPointerDownCapture: ee(() => l.current = true, "onPointerDownCapture") };
}
ee(Ds, "usePointerDownOutside");
function As(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ge(e), o = i.useRef(false);
  return i.useEffect(() => {
    const r = ee((s) => {
      s.target && !o.current && To(Sa, n, { originalEvent: s }, { discrete: false });
    }, "handleFocus");
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), { onFocusCapture: ee(() => o.current = true, "onFocusCapture"), onBlurCapture: ee(() => o.current = false, "onBlurCapture") };
}
ee(As, "useFocusOutside");
function lo() {
  const e = new CustomEvent(ao);
  document.dispatchEvent(e);
}
ee(lo, "dispatchUpdate");
function To(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: false, cancelable: true, detail: n });
  t && r.addEventListener(e, t, { once: true }), o ? Io(r, s) : r.dispatchEvent(s);
}
ee(To, "handleAndDispatchCustomEvent");
var _a2 = Object.defineProperty, ie = (e, t) => _a2(e, "name", { value: t, configurable: true }), Wn = "focusScope.autoFocusOnMount", Un = "focusScope.autoFocusOnUnmount", Ir = { bubbles: false, cancelable: true }, mn = i.forwardRef(ie(function(t, n) {
  const { loop: o = false, trapped: r = false, onMountAutoFocus: s, onUnmountAutoFocus: c, ...a } = t, [l, u] = i.useState(null), p = ge(s), d = ge(c), f = i.useRef(null), m = B(n, u), g = i.useRef({ paused: false, pause() {
    this.paused = true;
  }, resume() {
    this.paused = false;
  } }).current;
  i.useEffect(() => {
    if (r) {
      let C = function(b) {
        if (g.paused || !l) return;
        const R = b.target;
        l.contains(R) ? f.current = R : _e(f.current, { select: true });
      }, x = function(b) {
        if (g.paused || !l) return;
        const R = b.relatedTarget;
        R !== null && (l.contains(R) || _e(f.current, { select: true }));
      }, w = function(b) {
        if (document.activeElement === document.body) for (const E of b) E.removedNodes.length > 0 && _e(l);
      };
      ie(C, "handleFocusIn"), ie(x, "handleFocusOut"), ie(w, "handleMutations"), document.addEventListener("focusin", C), document.addEventListener("focusout", x);
      const y = new MutationObserver(w);
      return l && y.observe(l, { childList: true, subtree: true }), () => {
        document.removeEventListener("focusin", C), document.removeEventListener("focusout", x), y.disconnect();
      };
    }
  }, [r, l, g.paused]), i.useEffect(() => {
    if (l) {
      _r.add(g);
      const C = document.activeElement;
      if (!l.contains(C)) {
        const w = new CustomEvent(Wn, Ir);
        l.addEventListener(Wn, p), l.dispatchEvent(w), w.defaultPrevented || (Ms(Ls(Oo(l)), { select: true }), document.activeElement === C && _e(l));
      }
      return () => {
        l.removeEventListener(Wn, p), setTimeout(() => {
          const w = new CustomEvent(Un, Ir);
          l.addEventListener(Un, d), l.dispatchEvent(w), w.defaultPrevented || _e(C ?? document.body, { select: true }), l.removeEventListener(Un, d), _r.remove(g);
        }, 0);
      };
    }
  }, [l, p, d, g]);
  const v = i.useCallback((C) => {
    if (!o && !r || g.paused) return;
    const x = C.key === "Tab" && !C.altKey && !C.ctrlKey && !C.metaKey, w = document.activeElement;
    if (x && w) {
      const y = C.currentTarget, [b, R] = Fs(y);
      b && R ? !C.shiftKey && w === R ? (C.preventDefault(), o && _e(b, { select: true })) : C.shiftKey && w === b && (C.preventDefault(), o && _e(R, { select: true })) : w === y && C.preventDefault();
    }
  }, [o, r, g.paused]);
  return h.jsx(L.div, { tabIndex: -1, ...a, ref: m, onKeyDown: v });
}, "FocusScope"));
function Ms(e, { select: t = false } = {}) {
  const n = document.activeElement;
  for (const o of e) if (_e(o, { select: t }), document.activeElement !== n) return;
}
ie(Ms, "focusFirst");
function Fs(e) {
  const t = Oo(e), n = uo(t, e), o = uo(t.reverse(), e);
  return [n, o];
}
ie(Fs, "getTabbableEdges");
function Oo(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: ie((o) => {
    const r = o.tagName === "INPUT" && o.type === "hidden";
    return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  }, "acceptNode") });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
ie(Oo, "getTabbableCandidates");
function uo(e, t) {
  const n = typeof t.checkVisibility == "function" && t.checkVisibility({ checkVisibilityCSS: true });
  for (const o of e) if (!(n ? !o.checkVisibility({ checkVisibilityCSS: true }) : ks(o, { upTo: t }))) return o;
}
ie(uo, "findVisible");
function ks(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return true;
  for (; e; ) {
    if (t !== void 0 && e === t) return false;
    if (getComputedStyle(e).display === "none") return true;
    e = e.parentElement;
  }
  return false;
}
ie(ks, "isHidden");
function Ns(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
ie(Ns, "isSelectableInput");
function _e(e, { select: t = false } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: true }), e !== n && Ns(e) && t && e.select();
  }
}
ie(_e, "focus");
var _r = $s();
function $s() {
  let e = [];
  return { add(t) {
    const n = e[0];
    t !== n && (n == null ? void 0 : n.pause()), e = fo(e, t), e.unshift(t);
  }, remove(t) {
    var _a3;
    e = fo(e, t), (_a3 = e[0]) == null ? void 0 : _a3.resume();
  } };
}
ie($s, "createFocusScopesStack");
function fo(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
ie(fo, "arrayRemove");
function Ls(e) {
  return e.filter((t) => t.tagName !== "A");
}
ie(Ls, "removeLinks");
var Ta = Object.defineProperty, Oa = (e, t) => Ta(e, "name", { value: t, configurable: true }), Nt = i.forwardRef(Oa(function(t, n) {
  var _a3;
  const { container: o, ...r } = t, [s, c] = i.useState(false);
  Q(() => c(true), []);
  const a = o || s && ((_a3 = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a3.body);
  return a ? vt.createPortal(h.jsx(L.div, { ...r, ref: n }), a) : null;
}, "Portal")), Da = Object.defineProperty, Do = (e, t) => Da(e, "name", { value: t, configurable: true }), Gt = 0, ct = null;
function Aa(e) {
  return yt(), e.children;
}
Do(Aa, "FocusGuards");
function yt() {
  i.useEffect(() => {
    ct || (ct = { start: po(), end: po() });
    const { start: e, end: t } = ct;
    return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), Gt++, () => {
      Gt === 1 && (ct == null ? void 0 : ct.start.remove(), ct == null ? void 0 : ct.end.remove(), ct = null), Gt = Math.max(0, Gt - 1);
    };
  }, []);
}
Do(yt, "useFocusGuards");
function po() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
Do(po, "createFocusGuard");
var tn = "right-scroll-bar-position", nn = "width-before-scroll-bar", Ma = "with-scroll-bars-hidden", Fa = "--removed-body-scroll-bar-size";
function Hn(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function ka(e, t) {
  var n = i.useState(function() {
    return { value: e, callback: t, facade: { get current() {
      return n.value;
    }, set current(o) {
      var r = n.value;
      r !== o && (n.value = o, n.callback(o, r));
    } } };
  })[0];
  return n.callback = t, n.facade;
}
var Na = typeof window < "u" ? i.useLayoutEffect : i.useEffect, Tr = /* @__PURE__ */ new WeakMap();
function $a(e, t) {
  var n = ka(null, function(o) {
    return e.forEach(function(r) {
      return Hn(r, o);
    });
  });
  return Na(function() {
    var o = Tr.get(n);
    if (o) {
      var r = new Set(o), s = new Set(e), c = n.current;
      r.forEach(function(a) {
        s.has(a) || Hn(a, null);
      }), s.forEach(function(a) {
        r.has(a) || Hn(a, c);
      });
    }
    Tr.set(n, e);
  }, [e]), n;
}
function La(e) {
  return e;
}
function ja(e, t) {
  t === void 0 && (t = La);
  var n = [], o = false, r = { read: function() {
    if (o) throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
    return n.length ? n[n.length - 1] : e;
  }, useMedium: function(s) {
    var c = t(s, o);
    return n.push(c), function() {
      n = n.filter(function(a) {
        return a !== c;
      });
    };
  }, assignSyncMedium: function(s) {
    for (o = true; n.length; ) {
      var c = n;
      n = [], c.forEach(s);
    }
    n = { push: function(a) {
      return s(a);
    }, filter: function() {
      return n;
    } };
  }, assignMedium: function(s) {
    o = true;
    var c = [];
    if (n.length) {
      var a = n;
      n = [], a.forEach(s), c = n;
    }
    var l = function() {
      var p = c;
      c = [], p.forEach(s);
    }, u = function() {
      return Promise.resolve().then(l);
    };
    u(), n = { push: function(p) {
      c.push(p), u();
    }, filter: function(p) {
      return c = c.filter(p), n;
    } };
  } };
  return r;
}
function Ba(e) {
  e === void 0 && (e = {});
  var t = ja(null);
  return t.options = We({ async: true, ssr: false }, e), t;
}
var js = function(e) {
  var t = e.sideCar, n = ss(e, ["sideCar"]);
  if (!t) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o) throw new Error("Sidecar medium not found");
  return i.createElement(o, We({}, n));
};
js.isSideCarExport = true;
function Va(e, t) {
  return e.useMedium(t), js;
}
var Bs = Ba(), Gn = function() {
}, hn = i.forwardRef(function(e, t) {
  var n = i.useRef(null), o = i.useState({ onScrollCapture: Gn, onWheelCapture: Gn, onTouchMoveCapture: Gn }), r = o[0], s = o[1], c = e.forwardProps, a = e.children, l = e.className, u = e.removeScrollBar, p = e.enabled, d = e.shards, f = e.sideCar, m = e.noRelative, g = e.noIsolation, v = e.inert, C = e.allowPinchZoom, x = e.as, w = x === void 0 ? "div" : x, y = e.gapMode, b = ss(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), R = f, E = $a([n, t]), P = We(We({}, b), r);
  return i.createElement(i.Fragment, null, p && i.createElement(R, { sideCar: Bs, removeScrollBar: u, shards: d, noRelative: m, noIsolation: g, inert: v, setCallbacks: s, allowPinchZoom: !!C, lockRef: n, gapMode: y }), c ? i.cloneElement(i.Children.only(a), We(We({}, P), { ref: E })) : i.createElement(w, We({}, P, { className: l, ref: E }), a));
});
hn.defaultProps = { enabled: true, removeScrollBar: true, inert: false };
hn.classNames = { fullWidth: nn, zeroRight: tn };
var Wa = function() {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function Ua() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Wa();
  return t && e.setAttribute("nonce", t), e;
}
function Ha(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Ga(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Ka = function() {
  var e = 0, t = null;
  return { add: function(n) {
    e == 0 && (t = Ua()) && (Ha(t, n), Ga(t)), e++;
  }, remove: function() {
    e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
  } };
}, za = function() {
  var e = Ka();
  return function(t, n) {
    i.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Vs = function() {
  var e = za(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, Ya = { left: 0, top: 0, right: 0, gap: 0 }, Kn = function(e) {
  return parseInt(e || "", 10) || 0;
}, Xa = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Kn(n), Kn(o), Kn(r)];
}, qa = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u") return Ya;
  var t = Xa(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, o - n + t[2] - t[0]) };
}, Za = Vs(), ft = "data-scroll-locked", Qa = function(e, t, n, o) {
  var r = e.left, s = e.top, c = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Ma, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(a, "px ").concat(o, `;
  }
  body[`).concat(ft, `] {
    overflow: hidden `).concat(o, `;
    overscroll-behavior: contain;
    `).concat([t && "position: relative ".concat(o, ";"), n === "margin" && `
    padding-left: `.concat(r, `px;
    padding-top: `).concat(s, `px;
    padding-right: `).concat(c, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(a, "px ").concat(o, `;
    `), n === "padding" && "padding-right: ".concat(a, "px ").concat(o, ";")].filter(Boolean).join(""), `
  }
  
  .`).concat(tn, ` {
    right: `).concat(a, "px ").concat(o, `;
  }
  
  .`).concat(nn, ` {
    margin-right: `).concat(a, "px ").concat(o, `;
  }
  
  .`).concat(tn, " .").concat(tn, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(nn, " .").concat(nn, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(ft, `] {
    `).concat(Fa, ": ").concat(a, `px;
  }
`);
}, Or = function() {
  var e = parseInt(document.body.getAttribute(ft) || "0", 10);
  return isFinite(e) ? e : 0;
}, Ja = function() {
  i.useEffect(function() {
    return document.body.setAttribute(ft, (Or() + 1).toString()), function() {
      var e = Or() - 1;
      e <= 0 ? document.body.removeAttribute(ft) : document.body.setAttribute(ft, e.toString());
    };
  }, []);
}, el = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  Ja();
  var s = i.useMemo(function() {
    return qa(r);
  }, [r]);
  return i.createElement(Za, { styles: Qa(s, !t, r, n ? "" : "!important") });
}, mo = false;
if (typeof window < "u") try {
  var Kt = Object.defineProperty({}, "passive", { get: function() {
    return mo = true, true;
  } });
  window.addEventListener("test", Kt, Kt), window.removeEventListener("test", Kt, Kt);
} catch {
  mo = false;
}
var at = mo ? { passive: false } : false, tl = function(e) {
  return e.tagName === "TEXTAREA";
}, Ws = function(e, t) {
  if (!(e instanceof Element)) return false;
  var n = window.getComputedStyle(e);
  return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !tl(e) && n[t] === "visible");
}, nl = function(e) {
  return Ws(e, "overflowY");
}, ol = function(e) {
  return Ws(e, "overflowX");
}, Dr = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = Us(e, o);
    if (r) {
      var s = Hs(e, o), c = s[1], a = s[2];
      if (c > a) return true;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return false;
}, rl = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [t, n, o];
}, sl = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [t, n, o];
}, Us = function(e, t) {
  return e === "v" ? nl(t) : ol(t);
}, Hs = function(e, t) {
  return e === "v" ? rl(t) : sl(t);
}, il = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, cl = function(e, t, n, o, r) {
  var s = il(e, window.getComputedStyle(t).direction), c = s * o, a = n.target, l = t.contains(a), u = false, p = c > 0, d = 0, f = 0;
  do {
    if (!a) break;
    var m = Hs(e, a), g = m[0], v = m[1], C = m[2], x = v - C - s * g;
    (g || x) && Us(e, a) && (d += x, f += g);
    var w = a.parentNode;
    a = w && w.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? w.host : w;
  } while (!l && a !== document.body || l && (t.contains(a) || t === a));
  return (p && Math.abs(d) < 1 || !p && Math.abs(f) < 1) && (u = true), u;
}, zt = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Ar = function(e) {
  return [e.deltaX, e.deltaY];
}, Mr = function(e) {
  return e && "current" in e ? e.current : e;
}, al = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, ll = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, ul = 0, lt = [];
function dl(e) {
  var t = i.useRef([]), n = i.useRef([0, 0]), o = i.useRef(), r = i.useState(ul++)[0], s = i.useState(Vs)[0], c = i.useRef(e);
  i.useEffect(function() {
    c.current = e;
  }, [e]), i.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var v = Uc([e.lockRef.current], (e.shards || []).map(Mr), true).filter(Boolean);
      return v.forEach(function(C) {
        return C.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), v.forEach(function(C) {
          return C.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = i.useCallback(function(v, C) {
    if ("touches" in v && v.touches.length === 2 || v.type === "wheel" && v.ctrlKey) return !c.current.allowPinchZoom;
    var x = zt(v), w = n.current, y = "deltaX" in v ? v.deltaX : w[0] - x[0], b = "deltaY" in v ? v.deltaY : w[1] - x[1], R, E = v.target, P = Math.abs(y) > Math.abs(b) ? "h" : "v";
    if ("touches" in v && P === "h" && E.type === "range") return false;
    var _ = window.getSelection(), O = _ && _.anchorNode, A = O ? O === E || O.contains(E) : false;
    if (A) return false;
    var S = Dr(P, E);
    if (!S) return true;
    if (S ? R = P : (R = P === "v" ? "h" : "v", S = Dr(P, E)), !S) return false;
    if (!o.current && "changedTouches" in v && (y || b) && (o.current = R), !R) return true;
    var I = o.current || R;
    return cl(I, C, v, I === "h" ? y : b);
  }, []), l = i.useCallback(function(v) {
    var C = v;
    if (!(!lt.length || lt[lt.length - 1] !== s)) {
      var x = "deltaY" in C ? Ar(C) : zt(C), w = t.current.filter(function(R) {
        return R.name === C.type && (R.target === C.target || C.target === R.shadowParent) && al(R.delta, x);
      })[0];
      if (w && w.should) {
        C.cancelable && C.preventDefault();
        return;
      }
      if (!w) {
        var y = (c.current.shards || []).map(Mr).filter(Boolean).filter(function(R) {
          return R.contains(C.target);
        }), b = y.length > 0 ? a(C, y[0]) : !c.current.noIsolation;
        b && C.cancelable && C.preventDefault();
      }
    }
  }, []), u = i.useCallback(function(v, C, x, w) {
    var y = { name: v, delta: C, target: x, should: w, shadowParent: fl(x) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(b) {
        return b !== y;
      });
    }, 1);
  }, []), p = i.useCallback(function(v) {
    n.current = zt(v), o.current = void 0;
  }, []), d = i.useCallback(function(v) {
    u(v.type, Ar(v), v.target, a(v, e.lockRef.current));
  }, []), f = i.useCallback(function(v) {
    u(v.type, zt(v), v.target, a(v, e.lockRef.current));
  }, []);
  i.useEffect(function() {
    return lt.push(s), e.setCallbacks({ onScrollCapture: d, onWheelCapture: d, onTouchMoveCapture: f }), document.addEventListener("wheel", l, at), document.addEventListener("touchmove", l, at), document.addEventListener("touchstart", p, at), function() {
      lt = lt.filter(function(v) {
        return v !== s;
      }), document.removeEventListener("wheel", l, at), document.removeEventListener("touchmove", l, at), document.removeEventListener("touchstart", p, at);
    };
  }, []);
  var m = e.removeScrollBar, g = e.inert;
  return i.createElement(i.Fragment, null, g ? i.createElement(s, { styles: ll(r) }) : null, m ? i.createElement(el, { noRelative: e.noRelative, gapMode: e.gapMode }) : null);
}
function fl(e) {
  for (var t = null; e !== null; ) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const pl = Va(Bs, dl);
var bt = i.forwardRef(function(e, t) {
  return i.createElement(hn, We({}, e, { ref: t, sideCar: pl }));
});
bt.classNames = hn.classNames;
var ml = function(e) {
  if (typeof document > "u") return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, ut = /* @__PURE__ */ new WeakMap(), Yt = /* @__PURE__ */ new WeakMap(), Xt = {}, zn = 0, Gs = function(e) {
  return e && (e.host || Gs(e.parentNode));
}, hl = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n)) return n;
    var o = Gs(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, vl = function(e, t, n, o) {
  var r = hl(t, Array.isArray(e) ? e : [e]);
  Xt[n] || (Xt[n] = /* @__PURE__ */ new WeakMap());
  var s = Xt[n], c = [], a = /* @__PURE__ */ new Set(), l = new Set(r), u = function(d) {
    !d || a.has(d) || (a.add(d), u(d.parentNode));
  };
  r.forEach(u);
  var p = function(d) {
    !d || l.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (a.has(f)) p(f);
      else try {
        var m = f.getAttribute(o), g = m !== null && m !== "false", v = (ut.get(f) || 0) + 1, C = (s.get(f) || 0) + 1;
        ut.set(f, v), s.set(f, C), c.push(f), v === 1 && g && Yt.set(f, true), C === 1 && f.setAttribute(n, "true"), g || f.setAttribute(o, "true");
      } catch (x) {
        console.error("aria-hidden: cannot operate on ", f, x);
      }
    });
  };
  return p(t), a.clear(), zn++, function() {
    c.forEach(function(d) {
      var f = ut.get(d) - 1, m = s.get(d) - 1;
      ut.set(d, f), s.set(d, m), f || (Yt.has(d) || d.removeAttribute(o), Yt.delete(d)), m || d.removeAttribute(n);
    }), zn--, zn || (ut = /* @__PURE__ */ new WeakMap(), ut = /* @__PURE__ */ new WeakMap(), Yt = /* @__PURE__ */ new WeakMap(), Xt = {});
  };
}, $t = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = ml(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), vl(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, gl = Object.defineProperty, pe = (e, t) => gl(e, "name", { value: t, configurable: true }), Ao = "Dialog", [Ks, hh] = ne(Ao), [Cl, be] = Ks(Ao), vh = pe((e) => {
  const { __scopeDialog: t, children: n, open: o, defaultOpen: r, onOpenChange: s, modal: c = true } = e, a = i.useRef(null), l = i.useRef(null), [u, p] = de({ prop: o, defaultProp: r ?? false, onChange: s, caller: Ao }), [d, f] = i.useState(0), [m, g] = i.useState(0);
  return h.jsx(Cl, { scope: t, triggerRef: a, contentRef: l, contentId: ue(), titleId: ue(), descriptionId: ue(), titlePresent: d > 0, descriptionPresent: m > 0, setTitleCount: f, setDescriptionCount: g, open: u, onOpenChange: p, onOpenToggle: i.useCallback(() => p((v) => !v), [p]), modal: c, children: n });
}, "Dialog"), yl = "DialogTrigger", gh = i.forwardRef(pe(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = be(yl, o), c = B(n, s.triggerRef);
  return h.jsx(L.button, { type: "button", "aria-haspopup": "dialog", "aria-expanded": s.open, "aria-controls": s.open ? s.contentId : void 0, "data-state": vn(s.open), ...r, ref: c, onClick: T(t.onClick, s.onOpenToggle) });
}, "DialogTrigger")), zs = "DialogPortal", [bl, Ys] = Ks(zs, { forceMount: void 0 }), Ch = pe((e) => {
  const { __scopeDialog: t, forceMount: n, children: o, container: r } = e, s = be(zs, t);
  return h.jsx(bl, { scope: t, forceMount: n, children: i.Children.map(o, (c) => h.jsx(fe, { present: n || s.open, children: h.jsx(Nt, { asChild: true, container: r, children: c }) })) });
}, "DialogPortal"), ho = "DialogOverlay", yh = i.forwardRef(pe(function(t, n) {
  const o = Ys(ho, t.__scopeDialog), { forceMount: r = o.forceMount, ...s } = t, c = be(ho, t.__scopeDialog);
  return c.modal ? h.jsx(fe, { present: r || c.open, children: h.jsx(wl, { ...s, ref: n }) }) : null;
}, "DialogOverlay")), xl = Ee("DialogOverlay.RemoveScroll"), wl = i.forwardRef(pe(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = be(ho, o), c = Os(), a = B(n, c);
  return h.jsx(bt, { as: xl, allowPinchZoom: true, shards: [s.contentRef], children: h.jsx(L.div, { "data-state": vn(s.open), ...r, ref: a, style: { pointerEvents: "auto", ...r.style } }) });
}, "DialogOverlayImpl")), Tt = "DialogContent", bh = i.forwardRef(pe(function(t, n) {
  const o = Ys(Tt, t.__scopeDialog), { forceMount: r = o.forceMount, ...s } = t, c = be(Tt, t.__scopeDialog);
  return h.jsx(fe, { present: r || c.open, children: c.modal ? h.jsx(El, { ...s, ref: n }) : h.jsx(Rl, { ...s, ref: n }) });
}, "DialogContent")), El = i.forwardRef(pe(function(t, n) {
  const o = be(Tt, t.__scopeDialog), r = i.useRef(null), s = B(n, o.contentRef, r);
  return i.useEffect(() => {
    const c = r.current;
    if (c) return $t(c);
  }, []), h.jsx(Xs, { ...t, ref: s, trapFocus: o.open, disableOutsidePointerEvents: o.open, onCloseAutoFocus: T(t.onCloseAutoFocus, (c) => {
    var _a3;
    c.preventDefault(), (_a3 = o.triggerRef.current) == null ? void 0 : _a3.focus();
  }), onPointerDownOutside: T(t.onPointerDownOutside, (c) => {
    const a = c.detail.originalEvent, l = a.button === 0 && a.ctrlKey === true;
    (a.button === 2 || l) && c.preventDefault();
  }), onFocusOutside: T(t.onFocusOutside, (c) => c.preventDefault()) });
}, "DialogContentModal")), Rl = i.forwardRef(pe(function(t, n) {
  const o = be(Tt, t.__scopeDialog), r = i.useRef(false), s = i.useRef(false);
  return h.jsx(Xs, { ...t, ref: n, trapFocus: false, disableOutsidePointerEvents: false, onCloseAutoFocus: (c) => {
    var _a3, _b;
    (_a3 = t.onCloseAutoFocus) == null ? void 0 : _a3.call(t, c), c.defaultPrevented || (r.current || ((_b = o.triggerRef.current) == null ? void 0 : _b.focus()), c.preventDefault()), r.current = false, s.current = false;
  }, onInteractOutside: (c) => {
    var _a3, _b;
    (_a3 = t.onInteractOutside) == null ? void 0 : _a3.call(t, c), c.defaultPrevented || (r.current = true, c.detail.originalEvent.type === "pointerdown" && (s.current = true));
    const a = c.target;
    ((_b = o.triggerRef.current) == null ? void 0 : _b.contains(a)) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && s.current && c.preventDefault();
  } });
}, "DialogContentNonModal")), Xs = i.forwardRef(pe(function(t, n) {
  const { __scopeDialog: o, trapFocus: r, onOpenAutoFocus: s, onCloseAutoFocus: c, ...a } = t, l = be(Tt, o);
  return yt(), h.jsx(h.Fragment, { children: h.jsx(mn, { asChild: true, loop: true, trapped: r, onMountAutoFocus: s, onUnmountAutoFocus: c, children: h.jsx(kt, { role: "dialog", id: l.contentId, "aria-describedby": l.descriptionPresent ? l.descriptionId : void 0, "aria-labelledby": l.titlePresent ? l.titleId : void 0, "data-state": vn(l.open), ...a, ref: n, deferPointerDownOutside: true, onDismiss: () => l.onOpenChange(false) }) }) });
}, "DialogContentImpl")), Pl = "DialogTitle", xh = i.forwardRef(pe(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = be(Pl, o), { setTitleCount: c } = s;
  return Q(() => (c((a) => a + 1), () => c((a) => a - 1)), [c]), h.jsx(L.h2, { id: s.titleId, ...r, ref: n });
}, "DialogTitle")), Sl = "DialogDescription", wh = i.forwardRef(pe(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = be(Sl, o), { setDescriptionCount: c } = s;
  return Q(() => (c((a) => a + 1), () => c((a) => a - 1)), [c]), h.jsx(L.p, { id: s.descriptionId, ...r, ref: n });
}, "DialogDescription")), Il = "DialogClose", Eh = i.forwardRef(pe(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = be(Il, o);
  return h.jsx(L.button, { type: "button", ...r, ref: n, onClick: T(t.onClick, () => s.onOpenChange(false)) });
}, "DialogClose"));
function vn(e) {
  return e ? "open" : "closed";
}
pe(vn, "getState");
var _l = Object.defineProperty, Tl = (e, t) => _l(e, "name", { value: t, configurable: true });
function Lt(e) {
  const [t, n] = i.useState(void 0);
  return Q(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length) return;
        const s = r[0];
        let c, a;
        if ("borderBoxSize" in s) {
          const l = s.borderBoxSize, u = Array.isArray(l) ? l[0] : l;
          c = u.inlineSize, a = u.blockSize;
        } else c = e.offsetWidth, a = e.offsetHeight;
        n({ width: c, height: a });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else n(void 0);
  }, [e]), t;
}
Tl(Lt, "useSize");
var Ol = Object.defineProperty, ke = (e, t) => Ol(e, "name", { value: t, configurable: true }), Mo = "Checkbox", [Dl, Rh] = ne(Mo), [Al, Fo] = Dl(Mo);
function qs(e) {
  const { __scopeCheckbox: t, checked: n, children: o, defaultChecked: r, disabled: s, form: c, name: a, onCheckedChange: l, required: u, value: p = "on", internal_do_not_use_render: d } = e, [f, m] = de({ prop: n, defaultProp: r ?? false, onChange: l, caller: Mo }), [g, v] = i.useState(null), [C, x] = i.useState(null), w = i.useRef(false), [y, b] = i.useReducer((P) => P + 1, 0), R = g ? !!c || !!g.closest("form") : true, E = { checked: f, disabled: s, setChecked: m, control: g, setControl: v, name: a, form: c, value: p, hasConsumerStoppedPropagationRef: w, userInteractionCount: y, onUserInteraction: b, required: u, defaultChecked: Te(r) ? false : r, isFormControl: R, bubbleInput: C, setBubbleInput: x };
  return h.jsx(Al, { scope: t, ...E, children: Zs(d) ? d(E) : o });
}
ke(qs, "CheckboxProvider");
var Ml = "CheckboxTrigger", Fl = i.forwardRef(ke(function({ __scopeCheckbox: t, onKeyDown: n, onClick: o, ...r }, s) {
  const { control: c, value: a, disabled: l, checked: u, required: p, setControl: d, setChecked: f, hasConsumerStoppedPropagationRef: m, onUserInteraction: g, isFormControl: v, bubbleInput: C } = Fo(Ml, t), x = B(s, d), w = i.useRef(u);
  return i.useEffect(() => {
    const y = c == null ? void 0 : c.form;
    if (y) {
      const b = ke(() => f(w.current), "reset");
      return y.addEventListener("reset", b), () => y.removeEventListener("reset", b);
    }
  }, [c, f]), h.jsx(L.button, { type: "button", role: "checkbox", "aria-checked": Te(u) ? "mixed" : u, "aria-required": p, "data-state": ko(u), "data-disabled": l ? "" : void 0, disabled: l, value: a, ...r, ref: x, onKeyDown: T(n, (y) => {
    y.key === "Enter" && y.preventDefault();
  }), onClick: T(o, (y) => {
    g(), f((b) => Te(b) ? true : !b), C && v && (m.current = y.isPropagationStopped(), m.current || y.stopPropagation());
  }) });
}, "CheckboxTrigger")), Ph = i.forwardRef(ke(function(t, n) {
  const { __scopeCheckbox: o, name: r, checked: s, defaultChecked: c, required: a, disabled: l, value: u, onCheckedChange: p, form: d, ...f } = t;
  return h.jsx(qs, { __scopeCheckbox: o, checked: s, defaultChecked: c, disabled: l, required: a, onCheckedChange: p, name: r, form: d, value: u, internal_do_not_use_render: ({ isFormControl: m }) => h.jsxs(h.Fragment, { children: [h.jsx(Fl, { ...f, ref: n, __scopeCheckbox: o }), m && h.jsx($l, { __scopeCheckbox: o })] }) });
}, "Checkbox")), kl = "CheckboxIndicator", Sh = i.forwardRef(ke(function(t, n) {
  const { __scopeCheckbox: o, forceMount: r, ...s } = t, c = Fo(kl, o);
  return h.jsx(fe, { present: r || Te(c.checked) || c.checked === true, children: h.jsx(L.span, { "data-state": ko(c.checked), "data-disabled": c.disabled ? "" : void 0, ...s, ref: n, style: { pointerEvents: "none", ...t.style } }) });
}, "CheckboxIndicator")), Nl = "CheckboxBubbleInput", $l = i.forwardRef(ke(function({ __scopeCheckbox: t, onClick: n, ...o }, r) {
  const { control: s, hasConsumerStoppedPropagationRef: c, userInteractionCount: a, checked: l, defaultChecked: u, required: p, disabled: d, name: f, value: m, form: g, bubbleInput: v, setBubbleInput: C } = Fo(Nl, t), x = B(r, C), w = Lt(s), y = i.useRef(false), b = i.useRef(l), R = i.useRef(a);
  i.useEffect(() => {
    const P = v;
    if (!P) return;
    const _ = window.HTMLInputElement.prototype, A = Object.getOwnPropertyDescriptor(_, "checked").set, S = a !== R.current;
    R.current = a;
    const I = b.current !== l;
    b.current = l;
    const D = !(S && c.current);
    if (I && A) {
      y.current = !S;
      const k = new Event("click", { bubbles: D });
      P.indeterminate = Te(l), A.call(P, Te(l) ? false : l), P.dispatchEvent(k), y.current = false;
    }
  }, [v, l, c, a]);
  const E = i.useRef(Te(l) ? false : l);
  return h.jsx(L.input, { type: "checkbox", "aria-hidden": true, defaultChecked: u ?? E.current, required: p, disabled: d, name: f, value: m, form: g, ...o, tabIndex: -1, ref: x, onClick: T(n, (P) => {
    y.current && P.stopPropagation();
  }), style: { ...o.style, ...w, position: "absolute", pointerEvents: "none", opacity: 0, margin: 0, transform: "translateX(-100%)" } });
}, "CheckboxBubbleInput"));
function Zs(e) {
  return typeof e == "function";
}
ke(Zs, "isFunction");
function Te(e) {
  return e === "indeterminate";
}
ke(Te, "isIndeterminate");
function ko(e) {
  return Te(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
ke(ko, "getState");
const Ll = ["top", "right", "bottom", "left"], Ge = Math.min, Oe = Math.max, sn = Math.round, qt = Math.floor, De = (e) => ({ x: e, y: e }), jl = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Qs(e, t, n) {
  return Oe(e, Ge(t, n));
}
function Ne(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ke(e) {
  return e.split("-")[0];
}
function xt(e) {
  return e.split("-")[1];
}
function No(e) {
  return e === "x" ? "y" : "x";
}
function $o(e) {
  return e === "y" ? "height" : "width";
}
function we(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function Lo(e) {
  return No(we(e));
}
function Bl(e, t, n) {
  n === void 0 && (n = false);
  const o = xt(e), r = Lo(e), s = $o(r);
  let c = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (c = cn(c)), [c, cn(c)];
}
function Vl(e) {
  const t = cn(e);
  return [vo(e), t, vo(t)];
}
function vo(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const Fr = ["left", "right"], kr = ["right", "left"], Wl = ["top", "bottom"], Ul = ["bottom", "top"];
function Hl(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? kr : Fr : t ? Fr : kr;
    case "left":
    case "right":
      return t ? Wl : Ul;
    default:
      return [];
  }
}
function Gl(e, t, n, o) {
  const r = xt(e);
  let s = Hl(Ke(e), n === "start", o);
  return r && (s = s.map((c) => c + "-" + r), t && (s = s.concat(s.map(vo)))), s;
}
function cn(e) {
  const t = Ke(e);
  return jl[t] + e.slice(t.length);
}
function Kl(e) {
  var t, n, o, r;
  return { top: (t = e.top) != null ? t : 0, right: (n = e.right) != null ? n : 0, bottom: (o = e.bottom) != null ? o : 0, left: (r = e.left) != null ? r : 0 };
}
function Js(e) {
  return typeof e != "number" ? Kl(e) : { top: e, right: e, bottom: e, left: e };
}
function an(e) {
  const { x: t, y: n, width: o, height: r } = e;
  return { width: o, height: r, top: n, left: t, right: t + o, bottom: n + r, x: t, y: n };
}
function Nr(e, t, n) {
  let { reference: o, floating: r } = e;
  const s = we(t), c = Lo(t), a = $o(c), l = Ke(t), u = s === "y", p = o.x + o.width / 2 - r.width / 2, d = o.y + o.height / 2 - r.height / 2, f = o[a] / 2 - r[a] / 2;
  let m;
  switch (l) {
    case "top":
      m = { x: p, y: o.y - r.height };
      break;
    case "bottom":
      m = { x: p, y: o.y + o.height };
      break;
    case "right":
      m = { x: o.x + o.width, y: d };
      break;
    case "left":
      m = { x: o.x - r.width, y: d };
      break;
    default:
      m = { x: o.x, y: o.y };
  }
  const g = xt(t);
  return g && (m[c] += f * (g === "end" ? 1 : -1) * (n && u ? -1 : 1)), m;
}
async function zl(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: o, y: r, platform: s, rects: c, elements: a, strategy: l } = e, { boundary: u = "clippingAncestors", rootBoundary: p = "viewport", elementContext: d = "floating", altBoundary: f = false, padding: m = 0 } = Ne(t, e), g = Js(m), C = a[f ? d === "floating" ? "reference" : "floating" : d], x = an(await s.getClippingRect({ element: (n = await (s.isElement == null ? void 0 : s.isElement(C))) == null || n ? C : C.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)), boundary: u, rootBoundary: p, strategy: l })), w = d === "floating" ? { x: o, y: r, width: c.floating.width, height: c.floating.height } : c.reference, y = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), b = await (s.isElement == null ? void 0 : s.isElement(y)) && await (s.getScale == null ? void 0 : s.getScale(y)) || { x: 1, y: 1 }, R = an(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({ elements: a, rect: w, offsetParent: y, strategy: l }) : w);
  return { top: (x.top - R.top + g.top) / b.y, bottom: (R.bottom - x.bottom + g.bottom) / b.y, left: (x.left - R.left + g.left) / b.x, right: (R.right - x.right + g.right) / b.x };
}
const Yl = 50, Xl = async (e, t, n) => {
  const { placement: o = "bottom", strategy: r = "absolute", middleware: s = [], platform: c } = n, a = c.detectOverflow ? c : { ...c, detectOverflow: zl }, l = await (c.isRTL == null ? void 0 : c.isRTL(t));
  let u = await c.getElementRects({ reference: e, floating: t, strategy: r }), { x: p, y: d } = Nr(u, o, l), f = o, m = 0;
  const g = {};
  for (let v = 0; v < s.length; v++) {
    const C = s[v];
    if (!C) continue;
    const { name: x, fn: w } = C, { x: y, y: b, data: R, reset: E } = await w({ x: p, y: d, initialPlacement: o, placement: f, strategy: r, middlewareData: g, rects: u, platform: a, elements: { reference: e, floating: t } });
    p = y ?? p, d = b ?? d, g[x] = { ...g[x], ...R }, E && m < Yl && (m++, typeof E == "object" && (E.placement && (f = E.placement), E.rects && (u = E.rects === true ? await c.getElementRects({ reference: e, floating: t, strategy: r }) : E.rects), { x: p, y: d } = Nr(u, f, l)), v = -1);
  }
  return { x: p, y: d, placement: f, strategy: r, middlewareData: g };
}, ql = (e) => ({ name: "arrow", options: e, async fn(t) {
  const { x: n, y: o, placement: r, rects: s, platform: c, elements: a, middlewareData: l } = t, { element: u, padding: p = 0 } = Ne(e, t) || {};
  if (u == null) return {};
  const d = Js(p), f = { x: n, y: o }, m = Lo(r), g = $o(m), v = await c.getDimensions(u), C = m === "y", x = C ? "top" : "left", w = C ? "bottom" : "right", y = C ? "clientHeight" : "clientWidth", b = s.reference[g] + s.reference[m] - f[m] - s.floating[g], R = f[m] - s.reference[m], E = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(u));
  let P = E ? E[y] : 0;
  (!P || !await (c.isElement == null ? void 0 : c.isElement(E))) && (P = a.floating[y] || s.floating[g]);
  const _ = b / 2 - R / 2, O = P / 2 - v[g] / 2 - 1, A = Ge(d[x], O), S = Ge(d[w], O), I = P - v[g] - S, D = P / 2 - v[g] / 2 + _, k = Qs(A, D, I), W = !l.arrow && xt(r) != null && D !== k && s.reference[g] / 2 - (D < A ? A : S) - v[g] / 2 < 0, N = W ? D < A ? D - A : D - I : 0;
  return { [m]: f[m] + N, data: { [m]: k, centerOffset: D - k - N, ...W && { alignmentOffset: N } }, reset: W };
} }), Zl = function(e) {
  return e === void 0 && (e = {}), { name: "flip", options: e, async fn(t) {
    var n, o;
    const { placement: r, middlewareData: s, rects: c, initialPlacement: a, platform: l, elements: u } = t, { mainAxis: p = true, crossAxis: d = true, fallbackPlacements: f, fallbackStrategy: m = "bestFit", fallbackAxisSideDirection: g = "none", flipAlignment: v = true, ...C } = Ne(e, t);
    if ((n = s.arrow) != null && n.alignmentOffset) return {};
    const x = Ke(r), w = we(a), y = Ke(a) === a, b = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), R = f || (y || !v ? [cn(a)] : Vl(a)), E = g !== "none";
    !f && E && R.push(...Gl(a, v, g, b));
    const P = [a, ...R], _ = await l.detectOverflow(t, C), O = [];
    let A = ((o = s.flip) == null ? void 0 : o.overflows) || [];
    if (p && O.push(_[x]), d) {
      const k = Bl(r, c, b);
      O.push(_[k[0]], _[k[1]]);
    }
    if (A = [...A, { placement: r, overflows: O }], !O.every((k) => k <= 0)) {
      var S, I;
      const k = (((S = s.flip) == null ? void 0 : S.index) || 0) + 1, W = P[k];
      if (W && (!(d === "alignment" ? w !== we(W) : false) || A.every((j) => we(j.placement) === w ? j.overflows[0] > 0 : true))) return { data: { index: k, overflows: A }, reset: { placement: W } };
      let N = (I = A.filter(($) => $.overflows[0] <= 0).sort(($, j) => $.overflows[1] - j.overflows[1])[0]) == null ? void 0 : I.placement;
      if (!N) switch (m) {
        case "bestFit": {
          var D;
          const $ = (D = A.filter((j) => {
            if (E) {
              const V = we(j.placement);
              return V === w || V === "y";
            }
            return true;
          }).map((j) => [j.placement, j.overflows.filter((V) => V > 0).reduce((V, M) => V + M, 0)]).sort((j, V) => j[1] - V[1])[0]) == null ? void 0 : D[0];
          $ && (N = $);
          break;
        }
        case "initialPlacement":
          N = a;
          break;
      }
      if (r !== N) return { reset: { placement: N } };
    }
    return {};
  } };
};
function $r(e, t) {
  return { top: e.top - t.height, right: e.right - t.width, bottom: e.bottom - t.height, left: e.left - t.width };
}
function Lr(e) {
  return Ll.some((t) => e[t] >= 0);
}
const Ql = function(e) {
  return e === void 0 && (e = {}), { name: "hide", options: e, async fn(t) {
    const { rects: n, platform: o } = t, { strategy: r = "referenceHidden", ...s } = Ne(e, t);
    switch (r) {
      case "referenceHidden": {
        const c = await o.detectOverflow(t, { ...s, elementContext: "reference" }), a = $r(c, n.reference);
        return { data: { referenceHiddenOffsets: a, referenceHidden: Lr(a) } };
      }
      case "escaped": {
        const c = await o.detectOverflow(t, { ...s, altBoundary: true }), a = $r(c, n.floating);
        return { data: { escapedOffsets: a, escaped: Lr(a) } };
      }
      default:
        return {};
    }
  } };
}, ei = /* @__PURE__ */ new Set(["left", "top"]);
async function Jl(e, t) {
  const { placement: n, platform: o, elements: r } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), c = Ke(n), a = xt(n), l = we(n) === "y", u = ei.has(c) ? -1 : 1, p = s && l ? -1 : 1, d = Ne(t, e);
  let { mainAxis: f, crossAxis: m, alignmentAxis: g } = typeof d == "number" ? { mainAxis: d, crossAxis: 0, alignmentAxis: null } : { mainAxis: d.mainAxis || 0, crossAxis: d.crossAxis || 0, alignmentAxis: d.alignmentAxis };
  return a && typeof g == "number" && (m = a === "end" ? g * -1 : g), l ? { x: m * p, y: f * u } : { x: f * u, y: m * p };
}
const eu = function(e) {
  return e === void 0 && (e = 0), { name: "offset", options: e, async fn(t) {
    var n, o;
    const { x: r, y: s, placement: c, middlewareData: a } = t, l = await Jl(t, e);
    return c === ((n = a.offset) == null ? void 0 : n.placement) && (o = a.arrow) != null && o.alignmentOffset ? {} : { x: r + l.x, y: s + l.y, data: { ...l, placement: c } };
  } };
}, tu = function(e) {
  return e === void 0 && (e = {}), { name: "shift", options: e, async fn(t) {
    const { x: n, y: o, placement: r, platform: s } = t, { mainAxis: c = true, crossAxis: a = false, limiter: l = { fn: (w) => {
      let { x: y, y: b } = w;
      return { x: y, y: b };
    } }, ...u } = Ne(e, t), p = { x: n, y: o }, d = await s.detectOverflow(t, u), f = we(r), m = No(f);
    let g = p[m], v = p[f];
    const C = (w, y) => Qs(y + d[w === "y" ? "top" : "left"], y, y - d[w === "y" ? "bottom" : "right"]);
    c && (g = C(m, g)), a && (v = C(f, v));
    const x = l.fn({ ...t, [m]: g, [f]: v });
    return { ...x, data: { x: x.x - n, y: x.y - o, enabled: { [m]: c, [f]: a } } };
  } };
}, nu = function(e) {
  return e === void 0 && (e = {}), { options: e, fn(t) {
    var n, o;
    const { x: r, y: s, placement: c, rects: a, middlewareData: l } = t, { offset: u = 0, mainAxis: p = true, crossAxis: d = true } = Ne(e, t), f = { x: r, y: s }, m = we(c), g = No(m);
    let v = f[g], C = f[m];
    const x = Ne(u, t), w = typeof x == "number" ? { mainAxis: x, crossAxis: 0 } : { mainAxis: (n = x.mainAxis) != null ? n : 0, crossAxis: (o = x.crossAxis) != null ? o : 0 };
    if (p) {
      const R = g === "y" ? "height" : "width", E = a.reference[g] - a.floating[R] + w.mainAxis, P = a.reference[g] + a.reference[R] - w.mainAxis;
      v < E ? v = E : v > P && (v = P);
    }
    if (d) {
      var y, b;
      const R = g === "y" ? "width" : "height", E = ei.has(Ke(c)), P = a.reference[m] - a.floating[R] + (E && ((y = l.offset) == null ? void 0 : y[m]) || 0) + (E ? 0 : w.crossAxis), _ = a.reference[m] + a.reference[R] + (E ? 0 : ((b = l.offset) == null ? void 0 : b[m]) || 0) - (E ? w.crossAxis : 0);
      C < P ? C = P : C > _ && (C = _);
    }
    return { [g]: v, [m]: C };
  } };
}, ou = function(e) {
  return e === void 0 && (e = {}), { name: "size", options: e, async fn(t) {
    const { placement: n, rects: o, platform: r, elements: s } = t, { apply: c = () => {
    }, ...a } = Ne(e, t), l = await r.detectOverflow(t, a), u = Ke(n), p = xt(n), d = we(n) === "y", { width: f, height: m } = o.floating;
    let g, v;
    u === "top" || u === "bottom" ? (g = u, v = p === (await (r.isRTL == null ? void 0 : r.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (v = u, g = p === "end" ? "top" : "bottom");
    const C = m - l.top - l.bottom, x = f - l.left - l.right, w = Ge(m - l[g], C), y = Ge(f - l[v], x), b = t.middlewareData.shift, R = !b;
    let E = w, P = y;
    b != null && b.enabled.x && (P = x), b != null && b.enabled.y && (E = C), R && !p && (d ? P = f - 2 * Oe(l.left, l.right) : E = m - 2 * Oe(l.top, l.bottom)), await c({ ...t, availableWidth: P, availableHeight: E });
    const _ = await r.getDimensions(s.floating);
    return f !== _.width || m !== _.height ? { reset: { rects: true } } : {};
  } };
};
function gn() {
  return typeof window < "u";
}
function wt(e) {
  return ti(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ae(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Le(e) {
  var t;
  return (t = (ti(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function ti(e) {
  return gn() ? e instanceof Node || e instanceof ae(e).Node : false;
}
function Re(e) {
  return gn() ? e instanceof Element || e instanceof ae(e).Element : false;
}
function Ye(e) {
  return gn() ? e instanceof HTMLElement || e instanceof ae(e).HTMLElement : false;
}
function jr(e) {
  return !gn() || typeof ShadowRoot > "u" ? false : e instanceof ShadowRoot || e instanceof ae(e).ShadowRoot;
}
function Cn(e) {
  const { overflow: t, overflowX: n, overflowY: o, display: r } = Pe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && r !== "inline" && r !== "contents";
}
function ru(e) {
  return /^(table|td|th)$/.test(wt(e));
}
function yn(e) {
  try {
    if (e.matches(":popover-open")) return true;
  } catch {
  }
  try {
    return e.matches(":modal");
  } catch {
    return false;
  }
}
const su = /transform|translate|scale|rotate|perspective|filter/, iu = /paint|layout|strict|content/, Qe = (e) => !!e && e !== "none";
let Yn;
function jo(e) {
  const t = Re(e) ? Pe(e) : e;
  return Qe(t.transform) || Qe(t.translate) || Qe(t.scale) || Qe(t.rotate) || Qe(t.perspective) || !Bo() && (Qe(t.backdropFilter) || Qe(t.filter)) || su.test(t.willChange || "") || iu.test(t.contain || "");
}
function cu(e) {
  let t = Je(e);
  for (; Ye(t) && !Ot(t); ) {
    if (jo(t)) return t;
    if (yn(t)) return null;
    t = Je(t);
  }
  return null;
}
function Bo() {
  return Yn == null && (Yn = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Yn;
}
function Ot(e) {
  return /^(html|body|#document)$/.test(wt(e));
}
function Pe(e) {
  return ae(e).getComputedStyle(e);
}
function bn(e) {
  return Re(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Je(e) {
  if (wt(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || jr(e) && e.host || Le(e);
  return jr(t) ? t.host : t;
}
function ni(e) {
  const t = Je(e);
  return Ot(t) ? (e.ownerDocument || e).body : Ye(t) && Cn(t) ? t : ni(t);
}
function Dt(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = true);
  const r = ni(e), s = r === ((o = e.ownerDocument) == null ? void 0 : o.body), c = ae(r);
  if (s) {
    const a = go(c);
    return t.concat(c, c.visualViewport || [], Cn(r) ? r : [], a && n ? Dt(a) : []);
  } else return t.concat(r, Dt(r, [], n));
}
function go(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function oi(e) {
  const t = Pe(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = Ye(e), s = r ? e.offsetWidth : n, c = r ? e.offsetHeight : o, a = sn(n) !== s || sn(o) !== c;
  return a && (n = s, o = c), { width: n, height: o, $: a };
}
function Vo(e) {
  return Re(e) ? e : e.contextElement;
}
function pt(e) {
  const t = Vo(e);
  if (!Ye(t)) return De(1);
  const n = t.getBoundingClientRect(), { width: o, height: r, $: s } = oi(t);
  let c = (s ? sn(n.width) : n.width) / o, a = (s ? sn(n.height) : n.height) / r;
  return (!c || !Number.isFinite(c)) && (c = 1), (!a || !Number.isFinite(a)) && (a = 1), { x: c, y: a };
}
const au = De(0);
function ri(e) {
  const t = ae(e);
  return !Bo() || !t.visualViewport ? au : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function lu(e, t, n) {
  return t === void 0 && (t = false), !!n && t && n === ae(e);
}
function et(e, t, n, o) {
  t === void 0 && (t = false), n === void 0 && (n = false);
  const r = e.getBoundingClientRect(), s = Vo(e);
  let c = De(1);
  t && (o ? Re(o) && (c = pt(o)) : c = pt(e));
  const a = lu(s, n, o) ? ri(s) : De(0);
  let l = (r.left + a.x) / c.x, u = (r.top + a.y) / c.y, p = r.width / c.x, d = r.height / c.y;
  if (s && o) {
    const f = ae(s), m = Re(o) ? ae(o) : o;
    let g = f, v = go(g);
    for (; v && m !== g; ) {
      const C = pt(v), x = v.getBoundingClientRect(), w = Pe(v), y = x.left + (v.clientLeft + parseFloat(w.paddingLeft)) * C.x, b = x.top + (v.clientTop + parseFloat(w.paddingTop)) * C.y;
      l *= C.x, u *= C.y, p *= C.x, d *= C.y, l += y, u += b, g = ae(v), v = go(g);
    }
  }
  return an({ width: p, height: d, x: l, y: u });
}
function xn(e, t) {
  const n = bn(e).scrollLeft;
  return t ? t.left + n : et(Le(e)).left + n;
}
function si(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - xn(e, n), r = n.top + t.scrollTop;
  return { x: o, y: r };
}
function uu(e) {
  let { elements: t, rect: n, offsetParent: o, strategy: r } = e;
  const s = r === "fixed", c = Le(o), a = t ? yn(t.floating) : false;
  if (o === c || a && s) return n;
  let l = { scrollLeft: 0, scrollTop: 0 }, u = De(1);
  const p = De(0), d = Ye(o);
  if ((d || !s) && ((wt(o) !== "body" || Cn(c)) && (l = bn(o)), d)) {
    const m = et(o);
    u = pt(o), p.x = m.x + o.clientLeft, p.y = m.y + o.clientTop;
  }
  const f = c && !d && !s ? si(c, l) : De(0);
  return { width: n.width * u.x, height: n.height * u.y, x: n.x * u.x - l.scrollLeft * u.x + p.x + f.x, y: n.y * u.y - l.scrollTop * u.y + p.y + f.y };
}
function du(e) {
  return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function fu(e) {
  const t = bn(e), n = e.ownerDocument.body, o = Oe(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), r = Oe(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
  let s = -t.scrollLeft + xn(e);
  const c = -t.scrollTop;
  return Pe(n).direction === "rtl" && (s += Oe(e.clientWidth, n.clientWidth) - o), { width: o, height: r, x: s, y: c };
}
const pu = 25;
function mu(e, t, n) {
  n === void 0 && (n = "viewport");
  const o = n === "layoutViewport", r = ae(e), s = Le(e), c = r.visualViewport;
  let a = s.clientWidth, l = s.clientHeight, u = 0, p = 0;
  if (c) {
    const f = !Bo() || t === "fixed";
    o ? f || (u = -c.offsetLeft, p = -c.offsetTop) : (a = c.width, l = c.height, f && (u = c.offsetLeft, p = c.offsetTop));
  }
  if (xn(s) <= 0) {
    const f = s.ownerDocument, m = f.body, g = getComputedStyle(m), v = f.compatMode === "CSS1Compat" && parseFloat(g.marginLeft) + parseFloat(g.marginRight) || 0, C = Math.abs(s.clientWidth - m.clientWidth - v), x = getComputedStyle(s).scrollbarGutter === "stable both-edges" ? C / 2 : C;
    x <= pu && (a -= x);
  }
  return { width: a, height: l, x: u, y: p };
}
function hu(e, t) {
  const n = et(e, true, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, s = pt(e), c = e.clientWidth * s.x, a = e.clientHeight * s.y, l = r * s.x, u = o * s.y;
  return { width: c, height: a, x: l, y: u };
}
function Br(e, t, n) {
  let o;
  if (t === "viewport" || t === "layoutViewport") o = mu(e, n, t);
  else if (t === "document") o = fu(Le(e));
  else if (Re(t)) o = hu(t, n);
  else {
    const r = ri(e);
    o = { x: t.x - r.x, y: t.y - r.y, width: t.width, height: t.height };
  }
  return an(o);
}
function vu(e, t) {
  const n = t.get(e);
  if (n) return n;
  let o = Dt(e, [], false).filter((a) => Re(a) && wt(a) !== "body"), r = null;
  const s = Pe(e).position === "fixed";
  let c = s ? Je(e) : e;
  for (; Re(c) && !Ot(c); ) {
    const a = Pe(c), l = jo(c), u = r ? r.position : s ? "fixed" : "";
    !l && (u === "fixed" || u === "absolute" && a.position === "static") ? o = o.filter((d) => d !== c) : r = a, c = Je(c);
  }
  return t.set(e, o), o;
}
function gu(e) {
  let { element: t, boundary: n, rootBoundary: o, strategy: r } = e;
  const c = [...n === "clippingAncestors" ? yn(t) ? [] : vu(t, this._c) : [].concat(n), o], a = Br(t, c[0], r);
  let l = a.top, u = a.right, p = a.bottom, d = a.left;
  for (let f = 1; f < c.length; f++) {
    const m = Br(t, c[f], r);
    l = Oe(m.top, l), u = Ge(m.right, u), p = Ge(m.bottom, p), d = Oe(m.left, d);
  }
  return { width: u - d, height: p - l, x: d, y: l };
}
function Cu(e) {
  const { width: t, height: n } = oi(e);
  return { width: t, height: n };
}
function yu(e, t, n) {
  const o = Ye(t), r = Le(t), s = n === "fixed", c = et(e, true, s, t);
  let a = { scrollLeft: 0, scrollTop: 0 };
  const l = De(0);
  if ((o || !s) && ((wt(t) !== "body" || Cn(r)) && (a = bn(t)), o)) {
    const f = et(t, true, s, t);
    l.x = f.x + t.clientLeft, l.y = f.y + t.clientTop;
  }
  !o && r && (l.x = xn(r));
  const u = r && !o && !s ? si(r, a) : De(0), p = c.left + a.scrollLeft - l.x - u.x, d = c.top + a.scrollTop - l.y - u.y;
  return { x: p, y: d, width: c.width, height: c.height };
}
function Xn(e) {
  return Pe(e).position === "static";
}
function Vr(e, t) {
  if (!Ye(e) || Pe(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return Le(e) === n && (n = n.ownerDocument.body), n;
}
function ii(e, t) {
  const n = ae(e);
  if (yn(e)) return n;
  if (!Ye(e)) {
    let r = Je(e);
    for (; r && !Ot(r); ) {
      if (Re(r) && !Xn(r)) return r;
      r = Je(r);
    }
    return n;
  }
  let o = Vr(e, t);
  for (; o && ru(o) && Xn(o); ) o = Vr(o, t);
  return o && Ot(o) && Xn(o) && !jo(o) ? n : o || cu(e) || n;
}
const bu = async function(e) {
  const t = this.getOffsetParent || ii, n = this.getDimensions, o = await n(e.floating);
  return { reference: yu(e.reference, await t(e.floating), e.strategy), floating: { x: 0, y: 0, width: o.width, height: o.height } };
};
function xu(e) {
  return Pe(e).direction === "rtl";
}
const wu = { convertOffsetParentRelativeRectToViewportRelativeRect: uu, getDocumentElement: Le, getClippingRect: gu, getOffsetParent: ii, getElementRects: bu, getClientRects: du, getDimensions: Cu, getScale: pt, isElement: Re, isRTL: xu };
function ci(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Eu(e, t, n) {
  let o = null, r;
  const s = Le(e);
  function c() {
    var p;
    clearTimeout(r), (p = o) == null || p.disconnect(), o = null;
  }
  function a(p, d) {
    p === void 0 && (p = false), d === void 0 && (d = 1), c();
    const f = e.getBoundingClientRect(), { left: m, top: g, width: v, height: C } = f;
    if (p || t(), !v || !C) return;
    const x = qt(g), w = qt(s.clientWidth - (m + v)), y = qt(s.clientHeight - (g + C)), b = qt(m), E = { rootMargin: -x + "px " + -w + "px " + -y + "px " + -b + "px", threshold: Oe(0, Ge(1, d)) || 1 };
    let P = true;
    function _(O) {
      const A = O[0].intersectionRatio;
      if (!ci(f, e.getBoundingClientRect())) return a();
      if (A !== d) {
        if (!P) return a();
        A ? a(false, A) : r = setTimeout(() => {
          a(false, 1e-7);
        }, 1e3);
      }
      P = false;
    }
    try {
      o = new IntersectionObserver(_, { ...E, root: s.ownerDocument });
    } catch {
      o = new IntersectionObserver(_, E);
    }
    o.observe(e);
  }
  const l = ae(e), u = () => a(n);
  return l.addEventListener("resize", u), a(true), () => {
    l.removeEventListener("resize", u), c();
  };
}
function Ru(e, t, n, o) {
  o === void 0 && (o = {});
  const { ancestorScroll: r = true, ancestorResize: s = true, elementResize: c = typeof ResizeObserver == "function", layoutShift: a = typeof IntersectionObserver == "function", animationFrame: l = false } = o, u = Vo(e), p = r || s ? [...u ? Dt(u) : [], ...t ? Dt(t) : []] : [];
  p.forEach((x) => {
    r && x.addEventListener("scroll", n), s && x.addEventListener("resize", n);
  });
  const d = u && a ? Eu(u, n, s) : null;
  let f = -1, m = null;
  c && (m = new ResizeObserver((x) => {
    let [w] = x;
    w && w.target === u && m && t && (m.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var y;
      (y = m) == null || y.observe(t);
    })), n();
  }), u && !l && m.observe(u), t && m.observe(t));
  let g, v = l ? et(e) : null;
  l && C();
  function C() {
    const x = et(e);
    v && !ci(v, x) && n(), v = x, g = requestAnimationFrame(C);
  }
  return n(), () => {
    var x;
    p.forEach((w) => {
      r && w.removeEventListener("scroll", n), s && w.removeEventListener("resize", n);
    }), d == null ? void 0 : d(), (x = m) == null || x.disconnect(), m = null, l && cancelAnimationFrame(g);
  };
}
const Pu = eu, Su = tu, Iu = Zl, _u = ou, Tu = Ql, Wr = ql, Ou = nu, Du = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = n ?? {}, s = { ...wu, ...r.platform, _c: o };
  return Xl(e, t, { ...r, platform: s });
};
var Au = typeof document < "u", Mu = function() {
}, on = Au ? i.useLayoutEffect : Mu;
function ln(e, t) {
  if (e === t) return true;
  if (typeof e != typeof t) return false;
  if (typeof e == "function" && e.toString() === t.toString()) return true;
  let n, o, r;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return false;
      for (o = n; o-- !== 0; ) if (!ln(e[o], t[o])) return false;
      return true;
    }
    if (r = Object.keys(e), n = r.length, n !== Object.keys(t).length) return false;
    for (o = n; o-- !== 0; ) if (!{}.hasOwnProperty.call(t, r[o])) return false;
    for (o = n; o-- !== 0; ) {
      const s = r[o];
      if (!(s === "_owner" && e.$$typeof) && !ln(e[s], t[s])) return false;
    }
    return true;
  }
  return e !== e && t !== t;
}
function ai(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ur(e, t) {
  const n = ai(e);
  return Math.round(t * n) / n;
}
function qn(e) {
  const t = i.useRef(e);
  return on(() => {
    t.current = e;
  }), t;
}
function Fu(e) {
  e === void 0 && (e = {});
  const { placement: t = "bottom", strategy: n = "absolute", middleware: o = [], platform: r, elements: { reference: s, floating: c } = {}, transform: a = true, whileElementsMounted: l, open: u } = e, [p, d] = i.useState({ x: 0, y: 0, strategy: n, placement: t, middlewareData: {}, isPositioned: false }), [f, m] = i.useState(o);
  ln(f, o) || m(o);
  const [g, v] = i.useState(null), [C, x] = i.useState(null), w = i.useCallback((j) => {
    j !== E.current && (E.current = j, v(j));
  }, []), y = i.useCallback((j) => {
    j !== P.current && (P.current = j, x(j));
  }, []), b = s || g, R = c || C, E = i.useRef(null), P = i.useRef(null), _ = i.useRef(p), O = l != null, A = qn(l), S = qn(r), I = qn(u), D = i.useCallback(() => {
    if (!E.current || !P.current) return;
    const j = { placement: t, strategy: n, middleware: f };
    S.current && (j.platform = S.current), Du(E.current, P.current, j).then((V) => {
      const M = { ...V, isPositioned: I.current !== false };
      k.current && !ln(_.current, M) && (_.current = M, vt.flushSync(() => {
        d(M);
      }));
    });
  }, [f, t, n, S, I]);
  on(() => {
    u === false && _.current.isPositioned && (_.current.isPositioned = false, d((j) => ({ ...j, isPositioned: false })));
  }, [u]);
  const k = i.useRef(false);
  on(() => (k.current = true, () => {
    k.current = false;
  }), []), on(() => {
    if (b && (E.current = b), R && (P.current = R), b && R) {
      if (A.current) return A.current(b, R, D);
      D();
    }
  }, [b, R, D, A, O]);
  const W = i.useMemo(() => ({ reference: E, floating: P, setReference: w, setFloating: y }), [w, y]), N = i.useMemo(() => ({ reference: b, floating: R }), [b, R]), $ = i.useMemo(() => {
    const j = { position: n, left: 0, top: 0 };
    if (!N.floating) return j;
    const V = Ur(N.floating, p.x), M = Ur(N.floating, p.y);
    return a ? { ...j, transform: "translate(" + V + "px, " + M + "px)", ...ai(N.floating) >= 1.5 && { willChange: "transform" } } : { position: n, left: V, top: M };
  }, [n, a, N.floating, p.x, p.y]);
  return i.useMemo(() => ({ ...p, update: D, refs: W, elements: N, floatingStyles: $ }), [p, D, W, N, $]);
}
const ku = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return { name: "arrow", options: e, fn(n) {
    const { element: o, padding: r } = typeof e == "function" ? e(n) : e;
    return o && t(o) ? o.current != null ? Wr({ element: o.current, padding: r }).fn(n) : {} : o ? Wr({ element: o, padding: r }).fn(n) : {};
  } };
}, Nu = (e, t) => {
  const n = Pu(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, $u = (e, t) => {
  const n = Su(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, Lu = (e, t) => ({ fn: Ou(e).fn, options: [e, t] }), ju = (e, t) => {
  const n = Iu(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, Bu = (e, t) => {
  const n = _u(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, Vu = (e, t) => {
  const n = Tu(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, Wu = (e, t) => {
  const n = ku(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
};
var Uu = Object.defineProperty, Hu = (e, t) => Uu(e, "name", { value: t, configurable: true }), Gu = i.forwardRef(Hu(function(t, n) {
  const { children: o, width: r = 10, height: s = 5, ...c } = t;
  return h.jsx(L.svg, { ...c, ref: n, width: r, height: s, viewBox: "0 0 30 10", preserveAspectRatio: "none", children: t.asChild ? o : h.jsx("polygon", { points: "0,0 30,0 15,10" }) });
}, "Arrow")), Ku = Gu, zu = Object.defineProperty, Ae = (e, t) => zu(e, "name", { value: t, configurable: true }), li = "Popper", [ui, Xe] = ne(li), [Yu, di] = ui(li), Xu = Ae((e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = i.useState(null), [s, c] = i.useState(void 0);
  return h.jsx(Yu, { scope: t, anchor: o, onAnchorChange: r, placementState: s, setPlacementState: c, children: n });
}, "Popper"), qu = "PopperAnchor", Zu = i.forwardRef(Ae(function(t, n) {
  const { __scopePopper: o, virtualRef: r, ...s } = t, c = di(qu, o), a = i.useRef(null), l = c.onAnchorChange, u = i.useCallback((v) => {
    a.current = v, v && l(v);
  }, [l]), p = B(n, u), d = i.useRef(null);
  i.useEffect(() => {
    if (!r) return;
    const v = d.current;
    d.current = r.current, v !== d.current && l(d.current);
  });
  const f = c.placementState && wn(c.placementState), m = f == null ? void 0 : f[0], g = f == null ? void 0 : f[1];
  return r ? null : h.jsx(L.div, { "data-radix-popper-side": m, "data-radix-popper-align": g, ...s, ref: p });
}, "PopperAnchor")), fi = "PopperContent", [Qu, Ju] = ui(fi), ed = i.forwardRef(Ae(function(t, n) {
  var _a3, _b, _c2, _d2, _e3, _f2, _g;
  const { __scopePopper: o, side: r = "bottom", sideOffset: s = 0, align: c = "center", alignOffset: a = 0, arrowPadding: l = 0, avoidCollisions: u = true, collisionBoundary: p = [], collisionPadding: d = 0, sticky: f = "partial", hideWhenDetached: m = false, updatePositionStrategy: g = "optimized", onPlaced: v, ...C } = t, x = di(fi, o), [w, y] = i.useState(null), b = B(n, y), [R, E] = i.useState(null), P = Lt(R), _ = (P == null ? void 0 : P.width) ?? 0, O = (P == null ? void 0 : P.height) ?? 0, A = r + (c !== "center" ? "-" + c : ""), S = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, I = Array.isArray(p) ? p : [p], D = I.length > 0, k = { padding: S, boundary: I.filter(pi), altBoundary: D }, { refs: W, floatingStyles: N, placement: $, isPositioned: j, middlewareData: V } = Fu({ strategy: "fixed", placement: A, whileElementsMounted: Ae((...G) => Ru(...G, { animationFrame: g === "always" }), "whileElementsMounted"), elements: { reference: x.anchor }, middleware: [Nu({ mainAxis: s + O, alignmentAxis: a }), u && $u({ mainAxis: true, crossAxis: false, limiter: f === "partial" ? Lu() : void 0, ...k }), u && ju({ ...k }), Bu({ ...k, apply: Ae(({ elements: G, rects: re, availableWidth: z, availableHeight: Y }) => {
    const { width: q, height: Ie } = re.reference, he = G.floating.style;
    he.setProperty("--radix-popper-available-width", `${z}px`), he.setProperty("--radix-popper-available-height", `${Y}px`), he.setProperty("--radix-popper-anchor-width", `${q}px`), he.setProperty("--radix-popper-anchor-height", `${Ie}px`);
  }, "apply") }), R && Wu({ element: R, padding: l }), rd({ arrowWidth: _, arrowHeight: O }), m && Vu({ strategy: "referenceHidden", ...k, boundary: D ? k.boundary : void 0 })] }), M = x.setPlacementState;
  Q(() => (M($), () => {
    M(void 0);
  }), [$, M]);
  const [J, H] = wn($), X = ge(v);
  Q(() => {
    j && (X == null ? void 0 : X());
  }, [j, X]);
  const ce = (_a3 = V.arrow) == null ? void 0 : _a3.x, me = (_b = V.arrow) == null ? void 0 : _b.y, Se = ((_c2 = V.arrow) == null ? void 0 : _c2.centerOffset) !== 0, [le, F] = i.useState();
  return Q(() => {
    w && F(window.getComputedStyle(w).zIndex);
  }, [w]), h.jsx("div", { ref: W.setFloating, "data-radix-popper-content-wrapper": "", style: { ...N, transform: j ? N.transform : "translate(0, -200%)", minWidth: "max-content", zIndex: le, "--radix-popper-transform-origin": [(_d2 = V.transformOrigin) == null ? void 0 : _d2.x, (_e3 = V.transformOrigin) == null ? void 0 : _e3.y].join(" "), ...((_f2 = V.hide) == null ? void 0 : _f2.referenceHidden) && { visibility: "hidden", pointerEvents: "none" } }, dir: t.dir, children: h.jsx(Qu, { scope: o, placedSide: J, placedAlign: H, onArrowChange: E, arrowX: ce, arrowY: me, shouldHideArrow: Se, children: h.jsx(L.div, { "data-side": J, "data-align": H, ...C, ref: b, style: { ...C.style, animation: j ? (_g = C.style) == null ? void 0 : _g.animation : "none" } }) }) });
}, "PopperContent")), td = "PopperArrow", nd = { top: "bottom", right: "left", bottom: "top", left: "right" }, od = i.forwardRef(Ae(function(t, n) {
  const { __scopePopper: o, ...r } = t, s = Ju(td, o), c = nd[s.placedSide];
  return h.jsx("span", { ref: s.onArrowChange, style: { position: "absolute", left: s.arrowX, top: s.arrowY, [c]: 0, transformOrigin: { top: "", right: "0 0", bottom: "center 0", left: "100% 0" }[s.placedSide], transform: { top: "translateY(100%)", right: "translateY(50%) rotate(90deg) translateX(-50%)", bottom: "rotate(180deg)", left: "translateY(50%) rotate(-90deg) translateX(50%)" }[s.placedSide], visibility: s.shouldHideArrow ? "hidden" : void 0 }, children: h.jsx(Ku, { ...r, ref: n, style: { ...r.style, display: "block" } }) });
}, "PopperArrow"));
function pi(e) {
  return e !== null;
}
Ae(pi, "isNotNull");
var rd = Ae((e) => ({ name: "transformOrigin", options: e, fn(t) {
  var _a3, _b, _c2;
  const { placement: n, rects: o, middlewareData: r } = t, c = ((_a3 = r.arrow) == null ? void 0 : _a3.centerOffset) !== 0, a = c ? 0 : e.arrowWidth, l = c ? 0 : e.arrowHeight, [u, p] = wn(n), d = { start: "0%", center: "50%", end: "100%" }[p], f = (((_b = r.arrow) == null ? void 0 : _b.x) ?? 0) + a / 2, m = (((_c2 = r.arrow) == null ? void 0 : _c2.y) ?? 0) + l / 2;
  let g = "", v = "";
  return u === "bottom" ? (g = c ? d : `${f}px`, v = `${-l}px`) : u === "top" ? (g = c ? d : `${f}px`, v = `${o.floating.height + l}px`) : u === "right" ? (g = `${-l}px`, v = c ? d : `${m}px`) : u === "left" && (g = `${o.floating.width + l}px`, v = c ? d : `${m}px`), { data: { x: g, y: v } };
} }), "transformOrigin");
function wn(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
Ae(wn, "getSideAndAlignFromPlacement");
var En = Xu, Rn = Zu, Pn = ed, sd = od, id = Object.defineProperty, Wo = (e, t) => id(e, "name", { value: t, configurable: true }), Zn = false;
function mi() {
  const [e, t] = i.useState(Zn);
  return i.useEffect(() => {
    Zn || (Zn = true, t(true));
  }, []), e;
}
Wo(mi, "useIsHydrated");
var hi = $e[" useSyncExternalStore ".trim().toString()];
function vi() {
  return () => {
  };
}
Wo(vi, "subscribe");
function gi() {
  return hi(vi, () => true, () => false);
}
Wo(gi, "useIsHydratedModern");
var cd = typeof hi == "function" ? gi : mi, ad = Object.defineProperty, ot = (e, t) => ad(e, "name", { value: t, configurable: true }), Qn = "rovingFocusGroup.onEntryFocus", ld = { bubbles: false, cancelable: true }, Sn = "RovingFocusGroup", [Co, Ci, ud] = pn(Sn), [dd, Et] = ne(Sn, [ud]), [fd, pd] = dd(Sn), md = i.forwardRef(ot(function(t, n) {
  return h.jsx(Co.Provider, { scope: t.__scopeRovingFocusGroup, children: h.jsx(Co.Slot, { scope: t.__scopeRovingFocusGroup, children: h.jsx(hd, { ...t, ref: n }) }) });
}, "RovingFocusGroup")), hd = i.forwardRef(ot(function(t, n) {
  const { __scopeRovingFocusGroup: o, orientation: r, loop: s = false, dir: c, currentTabStopId: a, defaultCurrentTabStopId: l, onCurrentTabStopIdChange: u, onEntryFocus: p, preventScrollOnEntryFocus: d = false, ...f } = t, m = i.useRef(null), g = B(n, m), v = Ct(c), [C, x] = de({ prop: a, defaultProp: l ?? null, onChange: u, caller: Sn }), [w, y] = i.useState(false), b = ge(p), R = Ci(o), E = i.useRef(false), [P, _] = i.useState(0);
  return i.useEffect(() => {
    const O = m.current;
    if (O) return O.addEventListener(Qn, b), () => O.removeEventListener(Qn, b);
  }, [b]), h.jsx(fd, { scope: o, orientation: r, dir: v, loop: s, currentTabStopId: C, onItemFocus: i.useCallback((O) => x(O), [x]), onItemShiftTab: i.useCallback(() => y(true), []), onFocusableItemAdd: i.useCallback(() => _((O) => O + 1), []), onFocusableItemRemove: i.useCallback(() => _((O) => O - 1), []), children: h.jsx(L.div, { tabIndex: w || P === 0 ? -1 : 0, "data-orientation": r, ...f, ref: g, style: { outline: "none", ...t.style }, onMouseDown: T(t.onMouseDown, () => {
    E.current = true;
  }), onFocus: T(t.onFocus, (O) => {
    const A = !E.current;
    if (O.target === O.currentTarget && A && !w) {
      const S = new CustomEvent(Qn, ld);
      if (O.currentTarget.dispatchEvent(S), !S.defaultPrevented) {
        const I = R().filter(($) => $.focusable), D = I.find(($) => $.active), k = I.find(($) => $.id === C), N = [D, k, ...I].filter(Boolean).map(($) => $.ref.current);
        Uo(N, d);
      }
    }
    E.current = false;
  }), onBlur: T(t.onBlur, () => y(false)) }) });
}, "RovingFocusGroupImpl")), vd = "RovingFocusGroupItem", gd = i.forwardRef(ot(function(t, n) {
  const { __scopeRovingFocusGroup: o, focusable: r = true, active: s = false, tabStopId: c, children: a, ...l } = t, u = ue(), p = c || u, d = pd(vd, o), f = d.currentTabStopId === p, m = Ci(o), { onFocusableItemAdd: g, onFocusableItemRemove: v, currentTabStopId: C } = d, x = cd();
  return Q(() => {
    if (!(!x || !r)) return g(), () => v();
  }, [x, r, g, v]), i.useEffect(() => {
    if (!(x || !r)) return g(), () => v();
  }, [x, r, g, v]), h.jsx(Co.ItemSlot, { scope: o, id: p, focusable: r, active: s, children: h.jsx(L.span, { tabIndex: f ? 0 : -1, "data-orientation": d.orientation, ...l, ref: n, onMouseDown: T(t.onMouseDown, (w) => {
    r ? d.onItemFocus(p) : w.preventDefault();
  }), onFocus: T(t.onFocus, () => d.onItemFocus(p)), onKeyDown: T(t.onKeyDown, (w) => {
    if (w.key === "Tab" && w.shiftKey) {
      d.onItemShiftTab();
      return;
    }
    if (w.target !== w.currentTarget) return;
    const y = bi(w, d.orientation, d.dir);
    if (y !== void 0) {
      if (w.metaKey || w.ctrlKey || w.altKey || w.shiftKey) return;
      w.preventDefault();
      let R = m().filter((E) => E.focusable).map((E) => E.ref.current);
      if (y === "last") R.reverse();
      else if (y === "prev" || y === "next") {
        y === "prev" && R.reverse();
        const E = R.indexOf(w.currentTarget);
        R = d.loop ? xi(R, E + 1) : R.slice(E + 1);
      }
      setTimeout(() => Uo(R));
    }
  }), children: typeof a == "function" ? a({ isCurrentTabStop: f, hasTabStop: C != null }) : a }) });
}, "RovingFocusGroupItem")), Cd = { ArrowLeft: "prev", ArrowUp: "prev", ArrowRight: "next", ArrowDown: "next", PageUp: "first", Home: "first", PageDown: "last", End: "last" };
function yi(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
ot(yi, "getDirectionAwareKey");
function bi(e, t, n) {
  const o = yi(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o))) return Cd[o];
}
ot(bi, "getFocusIntent");
function Uo(e, t = false) {
  const n = document.activeElement;
  for (const o of e) if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
ot(Uo, "focusFirst");
function xi(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
ot(xi, "wrapArray");
var Ho = md, Go = gd, yd = Object.defineProperty, K = (e, t) => yd(e, "name", { value: t, configurable: true }), bd = ["Enter", " "], xd = ["ArrowDown", "PageUp", "Home"], wi = ["ArrowUp", "PageDown", "End"], wd = [...xd, ...wi], In = "Menu", [yo, Ed, Rd] = pn(In), [rt, _n] = ne(In, [Rd, Xe, Et]), Ko = Xe(), Ei = Et(), [Pd, jt] = rt(In), [Sd, zo] = rt(In), Id = K((e) => {
  const { __scopeMenu: t, open: n = false, children: o, dir: r, onOpenChange: s, modal: c = true } = e, a = Ko(t), [l, u] = i.useState(null), p = i.useRef(false), d = ge(s), f = Ct(r);
  return i.useEffect(() => {
    const m = K(() => {
      p.current = true, document.addEventListener("pointerdown", g, { capture: true, once: true }), document.addEventListener("pointermove", g, { capture: true, once: true });
    }, "handleKeyDown"), g = K(() => p.current = false, "handlePointer");
    return document.addEventListener("keydown", m, { capture: true }), () => {
      document.removeEventListener("keydown", m, { capture: true }), document.removeEventListener("pointerdown", g, { capture: true }), document.removeEventListener("pointermove", g, { capture: true });
    };
  }, []), i.useEffect(() => {
    if (!n) return;
    const m = K(() => d(false), "handleBlur");
    return window.addEventListener("blur", m), () => window.removeEventListener("blur", m);
  }, [n, d]), h.jsx(En, { ...a, children: h.jsx(Pd, { scope: t, open: n, onOpenChange: d, content: l, onContentChange: u, children: h.jsx(Sd, { scope: t, onClose: i.useCallback(() => d(false), [d]), isUsingKeyboardRef: p, dir: f, modal: c, children: o }) }) });
}, "Menu"), _d = i.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, ...r } = t, s = Ko(o);
  return h.jsx(Rn, { ...s, ...r, ref: n });
}, "MenuAnchor")), Ri = "MenuPortal", [Td, Od] = rt(Ri, { forceMount: void 0 }), Dd = K((e) => {
  const { __scopeMenu: t, forceMount: n, children: o, container: r } = e, s = jt(Ri, t);
  return h.jsx(Td, { scope: t, forceMount: n, children: h.jsx(fe, { present: n || s.open, children: h.jsx(Nt, { asChild: true, container: r, children: o }) }) });
}, "MenuPortal"), Ue = "MenuContent", [Ad, Pi] = rt(Ue), Md = i.forwardRef(K(function(t, n) {
  const o = Od(Ue, t.__scopeMenu), { forceMount: r = o.forceMount, ...s } = t, c = jt(Ue, t.__scopeMenu), a = zo(Ue, t.__scopeMenu);
  return h.jsx(yo.Provider, { scope: t.__scopeMenu, children: h.jsx(fe, { present: r || c.open, children: h.jsx(yo.Slot, { scope: t.__scopeMenu, children: a.modal ? h.jsx(Fd, { ...s, ref: n }) : h.jsx(kd, { ...s, ref: n }) }) }) });
}, "MenuContent")), Fd = i.forwardRef(K(function(t, n) {
  const o = jt(Ue, t.__scopeMenu), r = i.useRef(null), s = B(n, r);
  return i.useEffect(() => {
    const c = r.current;
    if (c) return $t(c);
  }, []), h.jsx(Si, { ...t, ref: s, trapFocus: o.open, disableOutsidePointerEvents: o.open, disableOutsideScroll: true, onFocusOutside: T(t.onFocusOutside, (c) => c.preventDefault(), { checkForDefaultPrevented: false }), onDismiss: () => o.onOpenChange(false) });
}, "MenuRootContentModal")), kd = i.forwardRef(K(function(t, n) {
  const o = jt(Ue, t.__scopeMenu);
  return h.jsx(Si, { ...t, ref: n, trapFocus: false, disableOutsidePointerEvents: false, disableOutsideScroll: false, onDismiss: () => o.onOpenChange(false) });
}, "MenuRootContentNonModal")), Nd = Ee("MenuContent.ScrollLock"), Si = i.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, loop: r = false, trapFocus: s, onOpenAutoFocus: c, onCloseAutoFocus: a, disableOutsidePointerEvents: l, onEntryFocus: u, onEscapeKeyDown: p, onPointerDownOutside: d, onFocusOutside: f, onInteractOutside: m, onDismiss: g, disableOutsideScroll: v, ...C } = t, x = jt(Ue, o), w = zo(Ue, o), y = Ko(o), b = Ei(o), R = Ed(o), [E, P] = i.useState(null), _ = i.useRef(null), O = B(n, _, x.onContentChange), A = i.useRef(0), S = i.useRef(""), I = i.useRef(0), D = i.useRef(null), k = i.useRef("right"), W = i.useRef(0), N = v ? bt : i.Fragment, $ = v ? { as: Nd, allowPinchZoom: true } : void 0, j = K((M) => {
    var _a3, _b;
    const J = S.current + M, H = R().filter((F) => !F.disabled), X = document.activeElement, ce = (_a3 = H.find((F) => F.ref.current === X)) == null ? void 0 : _a3.textValue, me = H.map((F) => F.textValue), Se = Di(me, J, ce), le = (_b = H.find((F) => F.textValue === Se)) == null ? void 0 : _b.ref.current;
    K((function F(G) {
      S.current = G, window.clearTimeout(A.current), G !== "" && (A.current = window.setTimeout(() => F(""), 1e3));
    }), "updateSearch")(J), le && setTimeout(() => le.focus());
  }, "handleTypeaheadSearch");
  i.useEffect(() => () => window.clearTimeout(A.current), []), yt();
  const V = i.useCallback((M) => {
    var _a3, _b;
    return k.current === ((_a3 = D.current) == null ? void 0 : _a3.side) && Mi(M, (_b = D.current) == null ? void 0 : _b.area);
  }, []);
  return h.jsx(Ad, { scope: o, searchRef: S, onItemEnter: i.useCallback((M) => {
    V(M) && M.preventDefault();
  }, [V]), onItemLeave: i.useCallback((M) => {
    var _a3;
    V(M) || ((_a3 = _.current) == null ? void 0 : _a3.focus(), P(null));
  }, [V]), onTriggerLeave: i.useCallback((M) => {
    V(M) && M.preventDefault();
  }, [V]), pointerGraceTimerRef: I, onPointerGraceIntentChange: i.useCallback((M) => {
    D.current = M;
  }, []), children: h.jsx(N, { ...$, children: h.jsx(mn, { asChild: true, trapped: s, onMountAutoFocus: T(c, (M) => {
    var _a3;
    M.preventDefault(), (_a3 = _.current) == null ? void 0 : _a3.focus({ preventScroll: true });
  }), onUnmountAutoFocus: a, children: h.jsx(kt, { asChild: true, disableOutsidePointerEvents: l, onEscapeKeyDown: p, onPointerDownOutside: d, onFocusOutside: f, onInteractOutside: m, onDismiss: g, children: h.jsx(Ho, { asChild: true, ...b, dir: w.dir, orientation: "vertical", loop: r, currentTabStopId: E, onCurrentTabStopIdChange: P, onEntryFocus: T(u, (M) => {
    w.isUsingKeyboardRef.current || M.preventDefault();
  }), preventScrollOnEntryFocus: true, children: h.jsx(Pn, { role: "menu", "aria-orientation": "vertical", "data-state": Ii(x.open), "data-radix-menu-content": "", dir: w.dir, ...y, ...C, ref: O, style: { outline: "none", ...C.style }, onKeyDown: T(C.onKeyDown, (M) => {
    const H = M.target.closest("[data-radix-menu-content]") === M.currentTarget, X = M.ctrlKey || M.altKey || M.metaKey, ce = M.key.length === 1;
    H && (M.key === "Tab" && M.preventDefault(), !X && ce && j(M.key));
    const me = _.current;
    if (M.target !== me || !wd.includes(M.key)) return;
    M.preventDefault();
    const le = R().filter((F) => !F.disabled).map((F) => F.ref.current);
    wi.includes(M.key) && le.reverse(), Ti(le);
  }), onBlur: T(t.onBlur, (M) => {
    M.currentTarget.contains(M.target) || (window.clearTimeout(A.current), S.current = "");
  }), onPointerMove: T(t.onPointerMove, un((M) => {
    const J = M.target, H = W.current !== M.clientX;
    if (M.currentTarget.contains(J) && H) {
      const X = M.clientX > W.current ? "right" : "left";
      k.current = X, W.current = M.clientX;
    }
  })) }) }) }) }) }) });
}, "MenuContentImpl")), bo = "MenuItem", Hr = "menu.itemSelect", $d = i.forwardRef(K(function(t, n) {
  const { disabled: o = false, onSelect: r, ...s } = t, c = i.useRef(null), a = zo(bo, t.__scopeMenu), l = Pi(bo, t.__scopeMenu), u = B(n, c), p = i.useRef(false), d = K(() => {
    const f = c.current;
    if (!o && f) {
      const m = new CustomEvent(Hr, { bubbles: true, cancelable: true });
      f.addEventListener(Hr, (g) => r == null ? void 0 : r(g), { once: true }), Io(f, m), m.defaultPrevented ? p.current = false : a.onClose();
    }
  }, "handleSelect");
  return h.jsx(Ld, { ...s, ref: u, disabled: o, onClick: T(t.onClick, d), onPointerDown: (f) => {
    var _a3;
    (_a3 = t.onPointerDown) == null ? void 0 : _a3.call(t, f), p.current = true;
  }, onPointerUp: T(t.onPointerUp, (f) => {
    var _a3;
    p.current || ((_a3 = f.currentTarget) == null ? void 0 : _a3.click());
  }), onKeyDown: T(t.onKeyDown, (f) => {
    o || f.target !== f.currentTarget || l.searchRef.current !== "" && f.key === " " || bd.includes(f.key) && (f.currentTarget.click(), f.preventDefault());
  }) });
}, "MenuItem")), Ld = i.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, disabled: r = false, textValue: s, ...c } = t, a = Pi(bo, o), l = Ei(o), u = i.useRef(null), p = B(n, u), [d, f] = i.useState(false), [m, g] = i.useState("");
  return i.useEffect(() => {
    const v = u.current;
    v && g((v.textContent ?? "").trim());
  }, [c.children]), h.jsx(yo.ItemSlot, { scope: o, disabled: r, textValue: s ?? m, children: h.jsx(Go, { asChild: true, ...l, focusable: !r, children: h.jsx(L.div, { role: "menuitem", "data-highlighted": d ? "" : void 0, "aria-disabled": r || void 0, "data-disabled": r ? "" : void 0, ...c, ref: p, onPointerMove: T(t.onPointerMove, un((v) => {
    r ? a.onItemLeave(v) : (a.onItemEnter(v), v.defaultPrevented || v.currentTarget.focus({ preventScroll: true }));
  })), onPointerLeave: T(t.onPointerLeave, un((v) => a.onItemLeave(v))), onFocus: T(t.onFocus, () => f(true)), onBlur: T(t.onBlur, () => f(false)) }) }) });
}, "MenuItemImpl")), jd = "MenuRadioGroup", [Ih, _h] = rt(jd, { value: void 0, onValueChange: K(() => {
}, "onValueChange") }), Bd = "MenuItemIndicator", [Th, Oh] = rt(Bd, { checked: false }), Vd = i.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, ...r } = t;
  return h.jsx(L.div, { role: "separator", "aria-orientation": "horizontal", ...r, ref: n });
}, "MenuSeparator")), Wd = "MenuSub", [Dh, Ah] = rt(Wd);
function Ii(e) {
  return e ? "open" : "closed";
}
K(Ii, "getOpenState");
function _i(e) {
  return e === "indeterminate";
}
K(_i, "isIndeterminate");
function Ud(e) {
  return _i(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
K(Ud, "getCheckedState");
function Ti(e) {
  const t = document.activeElement;
  for (const n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
K(Ti, "focusFirst");
function Oi(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
K(Oi, "wrapArray");
function Di(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let c = Oi(e, Math.max(s, 0));
  r.length === 1 && (c = c.filter((u) => u !== n));
  const l = c.find((u) => u.toLowerCase().startsWith(r.toLowerCase()));
  return l !== n ? l : void 0;
}
K(Di, "getNextMatch");
function Ai(e, t) {
  const { x: n, y: o } = e;
  let r = false;
  for (let s = 0, c = t.length - 1; s < t.length; c = s++) {
    const a = t[s], l = t[c], u = a.x, p = a.y, d = l.x, f = l.y;
    p > o != f > o && n < (d - u) * (o - p) / (f - p) + u && (r = !r);
  }
  return r;
}
K(Ai, "isPointInPolygon");
function Mi(e, t) {
  if (!t) return false;
  const n = { x: e.clientX, y: e.clientY };
  return Ai(n, t);
}
K(Mi, "isPointerInGraceArea");
function un(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
K(un, "whenMouse");
var Fi = Id, ki = _d, Ni = Dd, $i = Md, Li = $d, Hd = Vd, Gd = Object.defineProperty, Me = (e, t) => Gd(e, "name", { value: t, configurable: true }), Yo = "ContextMenu", [Kd, Mh] = ne(Yo, [_n]), Rt = _n(), [zd, ji] = Kd(Yo), Yd = Me((e) => {
  const { __scopeContextMenu: t, children: n, onOpenChange: o, open: r, dir: s, modal: c = true } = e, a = i.useRef(false), [l, u] = de({ prop: r, defaultProp: false, onChange: o, caller: Yo }), p = Rt(t);
  return h.jsx(zd, { scope: t, open: l, onOpenChange: u, modal: c, hasInteractedRef: a, children: h.jsx(Fi, { ...p, dir: s, open: l, onOpenChange: u, modal: c, children: n }) });
}, "ContextMenu"), Xd = "ContextMenuTrigger", qd = i.forwardRef(Me(function(t, n) {
  const { __scopeContextMenu: o, disabled: r = false, ...s } = t, c = ji(Xd, o), a = Rt(o), [l, u] = i.useState({ x: 0, y: 0 }), p = i.useMemo(() => ({ current: { getBoundingClientRect: Me(() => DOMRect.fromRect({ width: 0, height: 0, ...l }), "getBoundingClientRect") } }), [l]), d = i.useRef(0), f = i.useCallback(() => window.clearTimeout(d.current), []), m = Me((g) => {
    c.hasInteractedRef.current = true, u({ x: g.clientX, y: g.clientY }), c.onOpenChange(true);
  }, "handleOpen");
  return i.useEffect(() => f, [f]), i.useEffect(() => {
    r && f();
  }, [r, f]), h.jsxs(h.Fragment, { children: [h.jsx(ki, { ...a, virtualRef: p }), h.jsx(L.span, { "data-state": c.open ? "open" : "closed", "data-disabled": r ? "" : void 0, ...s, ref: n, style: { WebkitTouchCallout: "none", ...t.style }, onContextMenu: r ? t.onContextMenu : T(t.onContextMenu, (g) => {
    f(), m(g), g.preventDefault();
  }), onPointerDown: r ? t.onPointerDown : T(t.onPointerDown, _t((g) => {
    f(), c.open && c.onOpenChange(false), d.current = window.setTimeout(() => m(g), 700);
  })), onPointerMove: r ? t.onPointerMove : T(t.onPointerMove, _t(f)), onPointerCancel: r ? t.onPointerCancel : T(t.onPointerCancel, _t(f)), onPointerUp: r ? t.onPointerUp : T(t.onPointerUp, _t(f)) })] });
}, "ContextMenuTrigger")), Zd = Me((e) => {
  const { __scopeContextMenu: t, ...n } = e, o = Rt(t);
  return h.jsx(Ni, { ...o, ...n });
}, "ContextMenuPortal"), Qd = "ContextMenuContent", Jd = i.forwardRef(Me(function(t, n) {
  const { __scopeContextMenu: o, ...r } = t, s = ji(Qd, o), c = Rt(o), a = i.useRef(false);
  return h.jsx($i, { ...c, ...r, ref: n, side: "right", sideOffset: 2, align: "start", onCloseAutoFocus: (l) => {
    var _a3;
    (_a3 = t.onCloseAutoFocus) == null ? void 0 : _a3.call(t, l), !l.defaultPrevented && a.current && l.preventDefault(), a.current = false;
  }, onInteractOutside: (l) => {
    var _a3;
    (_a3 = t.onInteractOutside) == null ? void 0 : _a3.call(t, l), !l.defaultPrevented && !s.modal && (a.current = true);
  }, style: { ...t.style, "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)", "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)", "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)", "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)" } });
}, "ContextMenuContent")), ef = i.forwardRef(Me(function(t, n) {
  const { __scopeContextMenu: o, ...r } = t, s = Rt(o);
  return h.jsx(Li, { ...s, ...r, ref: n });
}, "ContextMenuItem")), tf = i.forwardRef(Me(function(t, n) {
  const { __scopeContextMenu: o, ...r } = t, s = Rt(o);
  return h.jsx(Hd, { ...s, ...r, ref: n });
}, "ContextMenuSeparator"));
function _t(e) {
  return (t) => t.pointerType !== "mouse" ? e(t) : void 0;
}
Me(_t, "whenTouchOrPen");
var Fh = Yd, kh = qd, Nh = Zd, $h = Jd, Lh = ef, jh = tf, nf = Object.defineProperty, Bt = (e, t) => nf(e, "name", { value: t, configurable: true }), Xo = "DropdownMenu", [of, Bh] = ne(Xo, [_n]), Vt = _n(), [rf, Bi] = of(Xo), sf = Bt((e) => {
  const { __scopeDropdownMenu: t, children: n, dir: o, open: r, defaultOpen: s, onOpenChange: c, modal: a = true } = e, l = Vt(t), u = i.useRef(null), [p, d] = de({ prop: r, defaultProp: s ?? false, onChange: c, caller: Xo });
  return h.jsx(rf, { scope: t, triggerId: ue(), triggerRef: u, contentId: ue(), open: p, onOpenChange: d, onOpenToggle: i.useCallback(() => d((f) => !f), [d]), modal: a, children: h.jsx(Fi, { ...l, open: p, onOpenChange: d, dir: o, modal: a, children: n }) });
}, "DropdownMenu"), cf = "DropdownMenuTrigger", af = i.forwardRef(Bt(function(t, n) {
  const { __scopeDropdownMenu: o, disabled: r = false, ...s } = t, c = Bi(cf, o), a = Vt(o), l = B(n, c.triggerRef);
  return h.jsx(ki, { asChild: true, ...a, children: h.jsx(L.button, { type: "button", id: c.triggerId, "aria-haspopup": "menu", "aria-expanded": c.open, "aria-controls": c.open ? c.contentId : void 0, "data-state": c.open ? "open" : "closed", "data-disabled": r ? "" : void 0, disabled: r, ...s, ref: l, onPointerDown: T(t.onPointerDown, (u) => {
    !r && u.button === 0 && u.ctrlKey === false && (c.onOpenToggle(), c.open || u.preventDefault());
  }), onKeyDown: T(t.onKeyDown, (u) => {
    r || (["Enter", " "].includes(u.key) && c.onOpenToggle(), u.key === "ArrowDown" && c.onOpenChange(true), ["Enter", " ", "ArrowDown"].includes(u.key) && u.preventDefault());
  }) }) });
}, "DropdownMenuTrigger")), lf = Bt((e) => {
  const { __scopeDropdownMenu: t, ...n } = e, o = Vt(t);
  return h.jsx(Ni, { ...o, ...n });
}, "DropdownMenuPortal"), uf = "DropdownMenuContent", df = i.forwardRef(Bt(function(t, n) {
  const { __scopeDropdownMenu: o, ...r } = t, s = Bi(uf, o), c = Vt(o), a = i.useRef(false);
  return h.jsx($i, { id: s.contentId, "aria-labelledby": s.triggerId, ...c, ...r, ref: n, onCloseAutoFocus: T(t.onCloseAutoFocus, (l) => {
    var _a3;
    a.current || ((_a3 = s.triggerRef.current) == null ? void 0 : _a3.focus()), a.current = false, l.preventDefault();
  }), onInteractOutside: T(t.onInteractOutside, (l) => {
    const u = l.detail.originalEvent, p = u.button === 0 && u.ctrlKey === true, d = u.button === 2 || p;
    (!s.modal || d) && (a.current = true);
  }), style: { ...t.style, "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)", "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)", "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)", "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)" } });
}, "DropdownMenuContent")), ff = i.forwardRef(Bt(function(t, n) {
  const { __scopeDropdownMenu: o, ...r } = t, s = Vt(o);
  return h.jsx(Li, { ...s, ...r, ref: n });
}, "DropdownMenuItem")), Vh = sf, Wh = af, Uh = lf, Hh = df, Gh = ff, pf = Object.defineProperty, mf = (e, t) => pf(e, "name", { value: t, configurable: true }), hf = i.forwardRef(mf(function(t, n) {
  return h.jsx(L.label, { ...t, ref: n, onMouseDown: (o) => {
    var _a3;
    o.target.closest("button, input, select, textarea") || ((_a3 = t.onMouseDown) == null ? void 0 : _a3.call(t, o), !o.defaultPrevented && o.detail > 1 && o.preventDefault());
  } });
}, "Label")), vf = Object.defineProperty, oe = (e, t) => vf(e, "name", { value: t, configurable: true }), [qo, Kh] = ne("Form"), Vi = "Form", [gf, Zo] = qo(Vi), [Cf, yf] = qo(Vi), bf = i.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, onClearServerErrors: r = oe(() => {
  }, "onClearServerErrors"), ...s } = t, c = i.useRef(null), a = B(n, c), [l, u] = i.useState({}), p = i.useCallback((S) => l[S], [l]), d = i.useCallback((S, I) => u((D) => ({ ...D, [S]: { ...D[S] ?? {}, ...I } })), []), f = i.useCallback((S) => {
    u((I) => ({ ...I, [S]: void 0 })), y((I) => ({ ...I, [S]: {} }));
  }, []), [m, g] = i.useState({}), v = i.useCallback((S) => m[S] ?? [], [m]), C = i.useCallback((S, I) => {
    g((D) => ({ ...D, [S]: [...D[S] ?? [], I] }));
  }, []), x = i.useCallback((S, I) => {
    g((D) => ({ ...D, [S]: (D[S] ?? []).filter((k) => k.id !== I) }));
  }, []), [w, y] = i.useState({}), b = i.useCallback((S) => w[S] ?? {}, [w]), R = i.useCallback((S, I) => {
    y((D) => ({ ...D, [S]: { ...D[S] ?? {}, ...I } }));
  }, []), [E, P] = i.useState({}), _ = i.useCallback((S, I) => {
    P((D) => {
      const k = new Set(D[S]).add(I);
      return { ...D, [S]: k };
    });
  }, []), O = i.useCallback((S, I) => {
    P((D) => {
      const k = new Set(D[S]);
      return k.delete(I), { ...D, [S]: k };
    });
  }, []), A = i.useCallback((S) => Array.from(E[S] ?? []).join(" ") || void 0, [E]);
  return h.jsx(gf, { scope: o, getFieldValidity: p, onFieldValidityChange: d, getFieldCustomMatcherEntries: v, onFieldCustomMatcherEntryAdd: C, onFieldCustomMatcherEntryRemove: x, getFieldCustomErrors: b, onFieldCustomErrorsChange: R, onFieldValiditionClear: f, children: h.jsx(Cf, { scope: o, onFieldMessageIdAdd: _, onFieldMessageIdRemove: O, getFieldDescription: A, children: h.jsx(L.form, { ...s, ref: a, onInvalid: T(t.onInvalid, (S) => {
    const I = Qo(S.currentTarget);
    I === S.target && I.focus(), S.preventDefault();
  }), onSubmit: T(t.onSubmit, r, { checkForDefaultPrevented: false }), onReset: T(t.onReset, r) }) }) });
}, "Form")), mt = "FormField", [xf, Wi] = qo(mt), wf = i.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, name: r, serverInvalid: s = false, ...c } = t, l = Zo(mt, o).getFieldValidity(r), u = ue();
  return h.jsx(xf, { scope: o, id: u, name: r, serverInvalid: s, children: h.jsx(L.div, { "data-valid": Tn(l, s), "data-invalid": On(l, s), ...c, ref: n }) });
}, "FormField")), Zt = "FormLabel", Ef = i.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, name: r, ...s } = t, c = Zo(Zt, o), a = Wi(Zt, o, { optional: true }), l = r ?? (a == null ? void 0 : a.name);
  if (!l) throw new Error(`\`${Zt}\` must be used within \`${mt}\` or specify the \`name\` prop`);
  const u = s.htmlFor || (a == null ? void 0 : a.id);
  if (!u) throw new Error(`\`${Zt}\` must be used within \`${mt}\` or specify the \`htmlFor\` prop`);
  const p = c.getFieldValidity(l), d = (a == null ? void 0 : a.serverInvalid) ?? false;
  return h.jsx(hf, { "data-valid": Tn(p, d), "data-invalid": On(p, d), ...s, ref: n, htmlFor: u });
}, "FormLabel")), It = "FormControl", Rf = i.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, name: r, id: s, ...c } = t, a = Zo(It, o), l = Wi(It, o, { optional: true }), u = yf(It, o), p = i.useRef(null), d = B(n, p), f = r || (l == null ? void 0 : l.name);
  if (!f) throw new Error(`\`${It}\` must be used within \`${mt}\` or specify the \`name\` prop`);
  const m = s || (l == null ? void 0 : l.id);
  if (!m) throw new Error(`\`${It}\` must be used within \`${mt}\` or specify the \`id\` prop`);
  const g = a.getFieldCustomMatcherEntries(f), { onFieldValidityChange: v, onFieldCustomErrorsChange: C, onFieldValiditionClear: x } = a, w = i.useCallback(async (E) => {
    if (Xi(E.validity)) {
      const N = rn(E.validity);
      v(f, N);
      return;
    }
    const P = E.form ? new FormData(E.form) : new FormData(), _ = [E.value, P], O = [], A = [];
    g.forEach((N) => {
      Ki(N, _) ? A.push(N) : zi(N) && O.push(N);
    });
    const S = O.map(({ id: N, match: $ }) => [N, $(..._)]), I = Object.fromEntries(S), D = Object.values(I).some(Boolean), k = D;
    E.setCustomValidity(k ? Gr : "");
    const W = rn(E.validity);
    if (v(f, W), C(f, I), !D && A.length > 0) {
      const N = A.map(({ id: H, match: X }) => X(..._).then((ce) => [H, ce])), $ = await Promise.all(N), j = Object.fromEntries($), M = Object.values(j).some(Boolean);
      E.setCustomValidity(M ? Gr : "");
      const J = rn(E.validity);
      v(f, J), C(f, j);
    }
  }, [g, f, C, v]);
  i.useEffect(() => {
    const E = p.current;
    if (E) {
      const P = oe(() => w(E), "handleChange");
      return E.addEventListener("change", P), () => E.removeEventListener("change", P);
    }
  }, [w]);
  const y = i.useCallback(() => {
    const E = p.current;
    E && (E.setCustomValidity(""), x(f));
  }, [f, x]);
  i.useEffect(() => {
    var _a3;
    const E = (_a3 = p.current) == null ? void 0 : _a3.form;
    if (E) return E.addEventListener("reset", y), () => E.removeEventListener("reset", y);
  }, [y]);
  const b = (l == null ? void 0 : l.serverInvalid) ?? false;
  i.useEffect(() => {
    if (!b) return;
    const E = p.current, P = E == null ? void 0 : E.closest("form"), _ = P ? Qo(P) : null;
    _ === E && (_ == null ? void 0 : _.focus());
  }, [b]);
  const R = a.getFieldValidity(f);
  return h.jsx(L.input, { "data-valid": Tn(R, b), "data-invalid": On(R, b), "aria-invalid": b || void 0, "aria-describedby": u.getFieldDescription(f), title: "", ...c, ref: d, id: m, name: f, onInvalid: T(t.onInvalid, (E) => {
    const P = E.currentTarget;
    w(P);
  }), onChange: T(t.onChange, (E) => {
    y();
  }) });
}, "FormControl")), Gr = "This value is not valid";
function rn(e) {
  const t = {};
  for (const n in e) t[n] = e[n];
  return t;
}
oe(rn, "validityStateToObject");
function Ui(e) {
  return e instanceof HTMLElement;
}
oe(Ui, "isHTMLElement");
function Hi(e) {
  return "validity" in e;
}
oe(Hi, "isFormControl");
function Gi(e) {
  return Hi(e) && (e.validity.valid === false || e.getAttribute("aria-invalid") === "true");
}
oe(Gi, "isInvalid");
function Qo(e) {
  const t = e.elements, [n] = Array.from(t).filter(Ui).filter(Gi);
  return n ?? null;
}
oe(Qo, "getFirstInvalidControl");
function Ki(e, t) {
  return e.match.constructor.name === "AsyncFunction" || Yi(e.match, t);
}
oe(Ki, "isAsyncCustomMatcherEntry");
function zi(e) {
  return e.match.constructor.name === "Function";
}
oe(zi, "isSyncCustomMatcherEntry");
function Yi(e, t) {
  return e(...t) instanceof Promise;
}
oe(Yi, "returnsPromise");
function Xi(e) {
  let t = false;
  for (const n in e) {
    const o = n;
    if (o !== "valid" && o !== "customError" && e[o]) {
      t = true;
      break;
    }
  }
  return t;
}
oe(Xi, "hasBuiltInError");
function Tn(e, t) {
  if ((e == null ? void 0 : e.valid) === true && !t) return true;
}
oe(Tn, "getValidAttribute");
function On(e, t) {
  if ((e == null ? void 0 : e.valid) === false || t) return true;
}
oe(On, "getInvalidAttribute");
var zh = bf, Yh = wf, Xh = Ef, qh = Rf, Pf = Object.defineProperty, Sf = (e, t) => Pf(e, "name", { value: t, configurable: true });
function qi(e) {
  const t = i.useRef({ value: e, previous: e });
  return i.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
Sf(qi, "usePrevious");
var If = Object.defineProperty, _f = (e, t) => If(e, "name", { value: t, configurable: true });
function xo(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
_f(xo, "clamp");
var Tf = Object.defineProperty, qe = (e, t) => Tf(e, "name", { value: t, configurable: true }), Jo = "Popover", [Zi, Zh] = ne(Jo, [Xe]), er = Xe(), [Of, Pt] = Zi(Jo), Df = qe((e) => {
  const { __scopePopover: t, children: n, open: o, defaultOpen: r, onOpenChange: s, modal: c = false } = e, a = er(t), l = i.useRef(null), [u, p] = i.useState(false), [d, f] = de({ prop: o, defaultProp: r ?? false, onChange: s, caller: Jo });
  return h.jsx(En, { ...a, children: h.jsx(Of, { scope: t, contentId: ue(), triggerRef: l, open: d, onOpenChange: f, onOpenToggle: i.useCallback(() => f((m) => !m), [f]), hasCustomAnchor: u, onCustomAnchorAdd: i.useCallback(() => p(true), []), onCustomAnchorRemove: i.useCallback(() => p(false), []), modal: c, children: n }) });
}, "Popover"), Af = "PopoverTrigger", Mf = i.forwardRef(qe(function(t, n) {
  const { __scopePopover: o, ...r } = t, s = Pt(Af, o), c = er(o), a = B(n, s.triggerRef), l = h.jsx(L.button, { type: "button", "aria-haspopup": "dialog", "aria-expanded": s.open, "aria-controls": s.open ? s.contentId : void 0, "data-state": tr(s.open), ...r, ref: a, onClick: T(t.onClick, s.onOpenToggle) });
  return s.hasCustomAnchor ? l : h.jsx(Rn, { asChild: true, ...c, children: l });
}, "PopoverTrigger")), Qi = "PopoverPortal", [Ff, kf] = Zi(Qi, { forceMount: void 0 }), Nf = qe((e) => {
  const { __scopePopover: t, forceMount: n, children: o, container: r } = e, s = Pt(Qi, t);
  return h.jsx(Ff, { scope: t, forceMount: n, children: h.jsx(fe, { present: n || s.open, children: h.jsx(Nt, { asChild: true, container: r, children: o }) }) });
}, "PopoverPortal"), At = "PopoverContent", $f = i.forwardRef(qe(function(t, n) {
  const o = kf(At, t.__scopePopover), { forceMount: r = o.forceMount, ...s } = t, c = Pt(At, t.__scopePopover);
  return h.jsx(fe, { present: r || c.open, children: c.modal ? h.jsx(jf, { ...s, ref: n }) : h.jsx(Bf, { ...s, ref: n }) });
}, "PopoverContent")), Lf = Ee("PopoverContent.RemoveScroll"), jf = i.forwardRef(qe(function(t, n) {
  const o = Pt(At, t.__scopePopover), r = i.useRef(null), s = B(n, r), c = i.useRef(false);
  return i.useEffect(() => {
    const a = r.current;
    if (a) return $t(a);
  }, []), h.jsx(bt, { as: Lf, allowPinchZoom: true, children: h.jsx(Ji, { ...t, ref: s, trapFocus: o.open, disableOutsidePointerEvents: true, onCloseAutoFocus: T(t.onCloseAutoFocus, (a) => {
    var _a3;
    a.preventDefault(), c.current || ((_a3 = o.triggerRef.current) == null ? void 0 : _a3.focus());
  }), onPointerDownOutside: T(t.onPointerDownOutside, (a) => {
    const l = a.detail.originalEvent, u = l.button === 0 && l.ctrlKey === true, p = l.button === 2 || u;
    c.current = p;
  }, { checkForDefaultPrevented: false }), onFocusOutside: T(t.onFocusOutside, (a) => a.preventDefault(), { checkForDefaultPrevented: false }) }) });
}, "PopoverContentModal")), Bf = i.forwardRef(qe(function(t, n) {
  const o = Pt(At, t.__scopePopover), r = i.useRef(false), s = i.useRef(false);
  return h.jsx(Ji, { ...t, ref: n, trapFocus: false, disableOutsidePointerEvents: false, onCloseAutoFocus: (c) => {
    var _a3, _b;
    (_a3 = t.onCloseAutoFocus) == null ? void 0 : _a3.call(t, c), c.defaultPrevented || (r.current || ((_b = o.triggerRef.current) == null ? void 0 : _b.focus()), c.preventDefault()), r.current = false, s.current = false;
  }, onInteractOutside: (c) => {
    var _a3, _b;
    (_a3 = t.onInteractOutside) == null ? void 0 : _a3.call(t, c), c.defaultPrevented || (r.current = true, c.detail.originalEvent.type === "pointerdown" && (s.current = true));
    const a = c.target;
    ((_b = o.triggerRef.current) == null ? void 0 : _b.contains(a)) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && s.current && c.preventDefault();
  } });
}, "PopoverContentNonModal")), Ji = i.forwardRef(qe(function(t, n) {
  const { __scopePopover: o, trapFocus: r, onOpenAutoFocus: s, onCloseAutoFocus: c, disableOutsidePointerEvents: a, onEscapeKeyDown: l, onPointerDownOutside: u, onFocusOutside: p, onInteractOutside: d, ...f } = t, m = Pt(At, o), g = er(o);
  return yt(), h.jsx(mn, { asChild: true, loop: true, trapped: r, onMountAutoFocus: s, onUnmountAutoFocus: c, children: h.jsx(kt, { asChild: true, disableOutsidePointerEvents: a, onInteractOutside: d, onEscapeKeyDown: l, onPointerDownOutside: u, onFocusOutside: p, onDismiss: () => m.onOpenChange(false), deferPointerDownOutside: true, children: h.jsx(Pn, { "data-state": tr(m.open), role: "dialog", id: m.contentId, ...g, ...f, ref: n, style: { ...f.style, "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-popover-content-available-width": "var(--radix-popper-available-width)", "--radix-popover-content-available-height": "var(--radix-popper-available-height)", "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)", "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)" } }) }) });
}, "PopoverContentImpl"));
function tr(e) {
  return e ? "open" : "closed";
}
qe(tr, "getState");
var Qh = Df, Jh = Mf, ev = Nf, tv = $f, Vf = Object.defineProperty, se = (e, t) => Vf(e, "name", { value: t, configurable: true }), ec = "Radio", [Wf, tc] = ne(ec), [Uf, Dn] = Wf(ec);
function nc(e) {
  const { __scopeRadio: t, checked: n = false, children: o, disabled: r, form: s, name: c, onCheck: a, required: l, value: u = "on", internal_do_not_use_render: p } = e, [d, f] = i.useState(null), [m, g] = i.useState(null), v = i.useRef(false), [C, x] = i.useReducer((b) => b + 1, 0), w = d ? !!s || !!d.closest("form") : true, y = { checked: n, disabled: r, required: l, name: c, form: s, value: u, control: d, setControl: f, hasConsumerStoppedPropagationRef: v, userInteractionCount: C, onUserInteraction: x, isFormControl: w, bubbleInput: m, setBubbleInput: g, onCheck: se(() => a == null ? void 0 : a(), "onCheck") };
  return h.jsx(Uf, { scope: t, ...y, children: oc(p) ? p(y) : o });
}
se(nc, "RadioProvider");
var Hf = "RadioTrigger", Gf = i.forwardRef(se(function({ __scopeRadio: t, onClick: n, ...o }, r) {
  const { checked: s, disabled: c, value: a, setControl: l, onCheck: u, hasConsumerStoppedPropagationRef: p, onUserInteraction: d, isFormControl: f, bubbleInput: m } = Dn(Hf, t), g = B(r, l);
  return h.jsx(L.button, { type: "button", role: "radio", "aria-checked": s, "data-state": nr(s), "data-disabled": c ? "" : void 0, disabled: c, value: a, ...o, ref: g, onClick: T(n, (v) => {
    s || (d(), u()), m && f && (p.current = v.isPropagationStopped(), p.current || v.stopPropagation());
  }) });
}, "RadioTrigger")), Kf = "RadioIndicator", zf = i.forwardRef(se(function(t, n) {
  const { __scopeRadio: o, forceMount: r, ...s } = t, c = Dn(Kf, o);
  return h.jsx(fe, { present: r || c.checked, children: h.jsx(L.span, { "data-state": nr(c.checked), "data-disabled": c.disabled ? "" : void 0, ...s, ref: n }) });
}, "RadioIndicator")), Yf = "RadioBubbleInput", Xf = i.forwardRef(se(function({ __scopeRadio: t, onClick: n, ...o }, r) {
  const { control: s, checked: c, required: a, disabled: l, name: u, value: p, form: d, bubbleInput: f, setBubbleInput: m, hasConsumerStoppedPropagationRef: g, userInteractionCount: v } = Dn(Yf, t), C = B(r, m), x = Lt(s), w = i.useRef(false), y = i.useRef(c), b = i.useRef(v);
  i.useEffect(() => {
    const E = f;
    if (!E) return;
    const P = window.HTMLInputElement.prototype, O = Object.getOwnPropertyDescriptor(P, "checked").set, A = v !== b.current;
    b.current = v;
    const S = y.current !== c;
    y.current = c;
    const I = !(A && g.current);
    if (S && O) {
      w.current = !A;
      const D = new Event("click", { bubbles: I });
      O.call(E, c), E.dispatchEvent(D), w.current = false;
    }
  }, [f, c, g, v]);
  const R = i.useRef(c);
  return h.jsx(L.input, { type: "radio", "aria-hidden": true, defaultChecked: R.current, required: a, disabled: l, name: u, value: p, form: d, ...o, tabIndex: -1, ref: C, onClick: T(n, (E) => {
    w.current && E.stopPropagation();
  }), style: { ...o.style, ...x, position: "absolute", pointerEvents: "none", opacity: 0, margin: 0, transform: "translateX(-100%)" } });
}, "RadioBubbleInput"));
function oc(e) {
  return typeof e == "function";
}
se(oc, "isFunction");
function nr(e) {
  return e ? "checked" : "unchecked";
}
se(nr, "getState");
var qf = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], or = "RadioGroup", [Zf, nv] = ne(or, [Et, tc]), rc = Et(), An = tc(), [Qf, Jf] = Zf(or), ov = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, name: r, form: s, defaultValue: c, value: a, required: l = false, disabled: u = false, orientation: p, dir: d, loop: f = true, onValueChange: m, ...g } = t, v = rc(o), C = Ct(d), [x, w] = de({ prop: a, defaultProp: c ?? null, onChange: m, caller: or }), [y, b] = i.useState(null), R = B(n, b), E = i.useRef(x);
  return i.useEffect(() => {
    const P = s ? y == null ? void 0 : y.ownerDocument.getElementById(s) : y == null ? void 0 : y.closest("form");
    if (P instanceof HTMLFormElement) {
      const _ = se(() => w(E.current), "reset");
      return P.addEventListener("reset", _), () => P.removeEventListener("reset", _);
    }
  }, [y, s, w]), h.jsx(Qf, { scope: o, name: r, form: s, required: l, disabled: u, value: x, onValueChange: w, children: h.jsx(Ho, { asChild: true, ...v, orientation: p, dir: C, loop: f, children: h.jsx(L.div, { role: "radiogroup", "aria-required": l, "aria-orientation": p, "data-disabled": u ? "" : void 0, dir: C, ...g, ref: R }) }) });
}, "RadioGroup")), ep = "RadioGroupItemProvider", tp = "RadioGroupItemTrigger";
function sc(e) {
  const { __scopeRadioGroup: t, value: n, disabled: o, children: r, internal_do_not_use_render: s } = e, c = Jf(ep, t), a = An(t), l = c.disabled || o;
  return h.jsx(nc, { ...a, checked: c.value === n, disabled: l, required: c.required, name: c.name, form: c.form, value: n, onCheck: () => c.onValueChange(n), internal_do_not_use_render: s, children: r });
}
se(sc, "RadioGroupItemProvider");
var np = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, ...r } = t, s = rc(o), c = An(o), { checked: a, disabled: l } = Dn(tp, c.__scopeRadio), u = i.useRef(null), p = B(n, u), d = i.useRef(false);
  return i.useEffect(() => {
    const f = se((g) => {
      qf.includes(g.key) && (d.current = true);
    }, "handleKeyDown"), m = se(() => d.current = false, "handleKeyUp");
    return document.addEventListener("keydown", f), document.addEventListener("keyup", m), () => {
      document.removeEventListener("keydown", f), document.removeEventListener("keyup", m);
    };
  }, []), h.jsx(Go, { asChild: true, ...s, focusable: !l, active: a, children: h.jsx(Gf, { ...c, ...r, ref: p, onKeyDown: T(r.onKeyDown, (f) => {
    f.key === "Enter" && f.preventDefault();
  }), onFocus: T(r.onFocus, () => {
    var _a3;
    d.current && ((_a3 = u.current) == null ? void 0 : _a3.click());
  }) }) });
}, "RadioGroupItemTrigger")), rv = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, value: r, disabled: s, ...c } = t;
  return h.jsx(sc, { __scopeRadioGroup: o, value: r, disabled: s, internal_do_not_use_render: ({ isFormControl: a }) => h.jsxs(h.Fragment, { children: [h.jsx(np, { ...c, ref: n, __scopeRadioGroup: o }), a && h.jsx(op, { __scopeRadioGroup: o })] }) });
}, "RadioGroupItem")), op = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, ...r } = t, s = An(o);
  return h.jsx(Xf, { ...s, ...r, ref: n });
}, "RadioGroupItemBubbleInput")), sv = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, ...r } = t, s = An(o);
  return h.jsx(zf, { ...s, ...r, ref: n });
}, "RadioGroupIndicator")), rp = Object.defineProperty, U = (e, t) => rp(e, "name", { value: t, configurable: true }), sp = [" ", "Enter", "ArrowUp", "ArrowDown"], ip = [" ", "Enter"], ht = "Select", [Mn, rr, cp] = pn(ht), [st, iv] = ne(ht, [cp, Xe]), sr = Xe(), [ap, Ze] = st(ht), [lp, up] = st(ht);
function ic(e) {
  const { __scopeSelect: t, children: n, open: o, defaultOpen: r, onOpenChange: s, value: c, defaultValue: a, onValueChange: l, dir: u, name: p, autoComplete: d, disabled: f, required: m, form: g, internal_do_not_use_render: v } = e, C = sr(t), [x, w] = i.useState(null), [y, b] = i.useState(null), [R, E] = i.useState(false), P = Ct(u), [_, O] = de({ prop: o, defaultProp: r ?? false, onChange: s, caller: ht }), [A, S] = de({ prop: c, defaultProp: a, onChange: l, caller: ht }), I = i.useRef(null), D = i.useRef(A);
  i.useEffect(() => {
    const H = g ? x == null ? void 0 : x.ownerDocument.getElementById(g) : x == null ? void 0 : x.form;
    if (H instanceof HTMLFormElement) {
      const X = U(() => S(D.current), "reset");
      return H.addEventListener("reset", X), () => H.removeEventListener("reset", X);
    }
  }, [g, x, S]);
  const k = x ? !!g || !!x.closest("form") : true, [W, N] = i.useState(/* @__PURE__ */ new Set()), $ = ue(), j = Array.from(W).map((H) => H.props.value).join(";"), V = i.useCallback((H) => {
    N((X) => new Set(X).add(H));
  }, []), M = i.useCallback((H) => {
    N((X) => {
      const ce = new Set(X);
      return ce.delete(H), ce;
    });
  }, []), J = { required: m, trigger: x, onTriggerChange: w, valueNode: y, onValueNodeChange: b, valueNodeHasChildren: R, onValueNodeHasChildrenChange: E, contentId: $, value: A, onValueChange: S, open: _, onOpenChange: O, dir: P, triggerPointerDownPosRef: I, disabled: f, name: p, autoComplete: d, form: g, nativeOptions: W, nativeSelectKey: j, isFormControl: k };
  return h.jsx(En, { ...C, children: h.jsx(ap, { scope: t, ...J, children: h.jsx(Mn.Provider, { scope: t, children: h.jsx(lp, { scope: t, onNativeOptionAdd: V, onNativeOptionRemove: M, children: lc(v) ? v(J) : n }) }) }) });
}
U(ic, "SelectProvider");
var cv = U((e) => {
  const { __scopeSelect: t, children: n, ...o } = e;
  return h.jsx(ic, { __scopeSelect: t, ...o, internal_do_not_use_render: ({ isFormControl: r }) => h.jsxs(h.Fragment, { children: [n, r ? h.jsx(Sp, { __scopeSelect: t }) : null] }) });
}, "Select"), dp = "SelectTrigger", av = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, disabled: r = false, ...s } = t, c = sr(o), a = Ze(dp, o), l = a.disabled || r, u = B(n, a.onTriggerChange), p = rr(o), d = i.useRef("touch"), [f, m, g] = ir((C) => {
    const x = p().filter((b) => !b.disabled), w = x.find((b) => b.value === a.value), y = cr(x, C, w);
    y !== void 0 && a.onValueChange(y.value);
  }), v = U((C) => {
    l || (a.onOpenChange(true), g()), C && (a.triggerPointerDownPosRef.current = { x: Math.round(C.pageX), y: Math.round(C.pageY) });
  }, "handleOpen");
  return h.jsx(Rn, { asChild: true, ...c, children: h.jsx(L.button, { type: "button", role: "combobox", "aria-controls": a.open ? a.contentId : void 0, "aria-expanded": a.open, "aria-required": a.required, "aria-autocomplete": "none", dir: a.dir, "data-state": a.open ? "open" : "closed", disabled: l, "data-disabled": l ? "" : void 0, "data-placeholder": Wt(a.value) ? "" : void 0, ...s, ref: u, onClick: T(s.onClick, (C) => {
    C.currentTarget.focus(), d.current !== "mouse" && v(C);
  }), onPointerDown: T(s.onPointerDown, (C) => {
    d.current = C.pointerType;
    const x = C.target;
    x.hasPointerCapture(C.pointerId) && x.releasePointerCapture(C.pointerId), C.button === 0 && C.ctrlKey === false && C.pointerType === "mouse" && (v(C), C.preventDefault());
  }), onKeyDown: T(s.onKeyDown, (C) => {
    const x = f.current !== "";
    !(C.ctrlKey || C.altKey || C.metaKey) && C.key.length === 1 && m(C.key), !(x && C.key === " ") && sp.includes(C.key) && (v(), C.preventDefault());
  }) }) });
}, "SelectTrigger")), fp = "SelectValue", lv = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, className: r, style: s, children: c, placeholder: a = "", ...l } = t, u = Ze(fp, o), { onValueNodeHasChildrenChange: p } = u, d = c !== void 0, f = B(n, u.onValueNodeChange);
  Q(() => {
    p(d);
  }, [p, d]);
  const m = Wt(u.value);
  return h.jsx(L.span, { ...l, asChild: m ? false : l.asChild, ref: f, style: { pointerEvents: "none" }, children: h.jsx(i.Fragment, { children: m ? a : c }, m ? "placeholder" : "value") });
}, "SelectValue")), uv = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, children: r, ...s } = t;
  return h.jsx(L.span, { "aria-hidden": true, ...s, ref: n, children: r || "\u25BC" });
}, "SelectIcon")), pp = "SelectPortal", [mp, hp] = st(pp, { forceMount: void 0 }), dv = U((e) => {
  const { __scopeSelect: t, forceMount: n, ...o } = e;
  return h.jsx(mp, { scope: e.__scopeSelect, forceMount: n, children: h.jsx(Nt, { asChild: true, ...o }) });
}, "SelectPortal"), tt = "SelectContent", fv = i.forwardRef(U(function(t, n) {
  const o = hp(tt, t.__scopeSelect), { forceMount: r = o.forceMount, ...s } = t, c = Ze(tt, t.__scopeSelect), [a, l] = i.useState();
  return Q(() => {
    l(new DocumentFragment());
  }, []), h.jsx(fe, { present: r || c.open, children: ({ present: u }) => u ? h.jsx(Cp, { ...s, ref: n }) : h.jsx(vp, { ...s, fragment: a }) });
}, "SelectContent")), vp = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, children: r, fragment: s } = t;
  return s ? vt.createPortal(h.jsx(cc, { scope: o, children: h.jsx(Mn.Slot, { scope: o, children: h.jsx("div", { ref: n, children: r }) }) }), s) : null;
}, "SelectContentFragment")), Ce = 10, [cc, Fn] = st(tt), gp = Ee("SelectContent.RemoveScroll"), Cp = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o } = t, { position: r = "item-aligned", onCloseAutoFocus: s, onEscapeKeyDown: c, onPointerDownOutside: a, side: l, sideOffset: u, align: p, alignOffset: d, arrowPadding: f, collisionBoundary: m, collisionPadding: g, sticky: v, hideWhenDetached: C, avoidCollisions: x, ...w } = t, y = Ze(tt, o), [b, R] = i.useState(null), [E, P] = i.useState(null), _ = B(n, R), [O, A] = i.useState(null), [S, I] = i.useState(null), D = rr(o), [k, W] = i.useState(false), N = i.useRef(false);
  i.useEffect(() => {
    if (b) return $t(b);
  }, [b]), yt();
  const $ = i.useCallback((F) => {
    const [G, ...re] = D().map((q) => q.ref.current), [z] = re.slice(-1), Y = document.activeElement;
    for (const q of F) if (q === Y || (q == null ? void 0 : q.scrollIntoView({ block: "nearest" }), q === G && E && (E.scrollTop = 0), q === z && E && (E.scrollTop = E.scrollHeight), q == null ? void 0 : q.focus(), document.activeElement !== Y)) return;
  }, [D, E]), j = i.useCallback(() => $([O, b]), [$, O, b]);
  i.useEffect(() => {
    k && j();
  }, [k, j]);
  const { onOpenChange: V, triggerPointerDownPosRef: M } = y;
  i.useEffect(() => {
    if (b) {
      let F = { x: 0, y: 0 };
      const G = U((z) => {
        var _a3, _b;
        F = { x: Math.abs(Math.round(z.pageX) - (((_a3 = M.current) == null ? void 0 : _a3.x) ?? 0)), y: Math.abs(Math.round(z.pageY) - (((_b = M.current) == null ? void 0 : _b.y) ?? 0)) };
      }, "handlePointerMove"), re = U((z) => {
        F.x <= 10 && F.y <= 10 ? z.preventDefault() : z.composedPath().includes(b) || V(false), document.removeEventListener("pointermove", G), M.current = null;
      }, "handlePointerUp");
      return M.current !== null && (document.addEventListener("pointermove", G), document.addEventListener("pointerup", re, { capture: true, once: true })), () => {
        document.removeEventListener("pointermove", G), document.removeEventListener("pointerup", re, { capture: true });
      };
    }
  }, [b, V, M]), i.useEffect(() => {
    const F = U(() => V(false), "close");
    return window.addEventListener("blur", F), window.addEventListener("resize", F), () => {
      window.removeEventListener("blur", F), window.removeEventListener("resize", F);
    };
  }, [V]);
  const [J, H] = ir((F) => {
    const G = D().filter((Y) => !Y.disabled), re = G.find((Y) => Y.ref.current === document.activeElement), z = cr(G, F, re);
    z && setTimeout(() => {
      var _a3;
      return (_a3 = z.ref.current) == null ? void 0 : _a3.focus();
    });
  }), X = i.useCallback((F, G, re) => {
    const z = !N.current && !re;
    (y.value !== void 0 && y.value === G || z) && (A(F), z && (N.current = true));
  }, [y.value]), ce = i.useCallback(() => b == null ? void 0 : b.focus(), [b]), me = i.useCallback((F, G, re) => {
    const z = !N.current && !re;
    (y.value !== void 0 && y.value === G || z) && I(F);
  }, [y.value]), Se = r === "popper" ? Kr : yp, le = Se === Kr ? { side: l, sideOffset: u, align: p, alignOffset: d, arrowPadding: f, collisionBoundary: m, collisionPadding: g, sticky: v, hideWhenDetached: C, avoidCollisions: x } : {};
  return h.jsx(cc, { scope: o, content: b, viewport: E, onViewportChange: P, itemRefCallback: X, selectedItem: O, onItemLeave: ce, itemTextRefCallback: me, focusSelectedItem: j, selectedItemText: S, position: r, isPositioned: k, searchRef: J, children: h.jsx(bt, { as: gp, allowPinchZoom: true, children: h.jsx(mn, { asChild: true, trapped: y.open, onMountAutoFocus: (F) => {
    F.preventDefault();
  }, onUnmountAutoFocus: T(s, (F) => {
    var _a3;
    (_a3 = y.trigger) == null ? void 0 : _a3.focus({ preventScroll: true }), F.preventDefault();
  }), children: h.jsx(kt, { asChild: true, disableOutsidePointerEvents: true, onEscapeKeyDown: c, onPointerDownOutside: a, onFocusOutside: (F) => F.preventDefault(), onDismiss: () => y.onOpenChange(false), children: h.jsx(Se, { role: "listbox", id: y.contentId, "data-state": y.open ? "open" : "closed", dir: y.dir, onContextMenu: (F) => F.preventDefault(), ...w, ...le, onPlaced: () => W(true), ref: _, style: { display: "flex", flexDirection: "column", outline: "none", ...w.style }, onKeyDown: T(w.onKeyDown, (F) => {
    const G = F.ctrlKey || F.altKey || F.metaKey;
    if (F.key === "Tab" && F.preventDefault(), !G && F.key.length === 1 && H(F.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(F.key)) {
      let z = D().filter((Y) => !Y.disabled).map((Y) => Y.ref.current);
      if (["ArrowUp", "End"].includes(F.key) && (z = z.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(F.key)) {
        const Y = F.target, q = z.indexOf(Y);
        z = z.slice(q + 1);
      }
      setTimeout(() => $(z)), F.preventDefault();
    }
  }) }) }) }) }) });
}, "SelectContentImpl")), yp = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, onPlaced: r, ...s } = t, c = Ze(tt, o), a = Fn(tt, o), [l, u] = i.useState(null), [p, d] = i.useState(null), f = B(n, d), m = rr(o), g = i.useRef(false), v = i.useRef(true), { viewport: C, selectedItem: x, selectedItemText: w, focusSelectedItem: y } = a, b = i.useCallback(() => {
    if (c.trigger && c.valueNode && l && p && C && x && w) {
      const _ = c.trigger.getBoundingClientRect(), O = p.getBoundingClientRect(), A = c.valueNode.getBoundingClientRect(), S = w.getBoundingClientRect();
      if (c.dir !== "rtl") {
        const Y = S.left - O.left, q = A.left - Y, Ie = _.left - q, he = _.width + Ie, Ln = Math.max(he, O.width), jn = window.innerWidth - Ce, Bn = xo(q, [Ce, Math.max(Ce, jn - Ln)]);
        l.style.minWidth = he + "px", l.style.left = Bn + "px";
      } else {
        const Y = O.right - S.right, q = window.innerWidth - A.right - Y, Ie = window.innerWidth - _.right - q, he = _.width + Ie, Ln = Math.max(he, O.width), jn = window.innerWidth - Ce, Bn = xo(q, [Ce, Math.max(Ce, jn - Ln)]);
        l.style.minWidth = he + "px", l.style.right = Bn + "px";
      }
      const I = m(), D = window.innerHeight - Ce * 2, k = C.scrollHeight, W = window.getComputedStyle(p), N = parseInt(W.borderTopWidth, 10), $ = parseInt(W.paddingTop, 10), j = parseInt(W.borderBottomWidth, 10), V = parseInt(W.paddingBottom, 10), M = N + $ + k + V + j, J = Math.min(x.offsetHeight * 5, M), H = window.getComputedStyle(C), X = parseInt(H.paddingTop, 10), ce = parseInt(H.paddingBottom, 10), me = _.top + _.height / 2 - Ce, Se = D - me, le = x.offsetHeight / 2, F = x.offsetTop + le, G = N + $ + F, re = M - G;
      if (G <= me) {
        const Y = I.length > 0 && x === I[I.length - 1].ref.current;
        l.style.bottom = "0px";
        const q = p.clientHeight - C.offsetTop - C.offsetHeight, Ie = Math.max(Se, le + (Y ? ce : 0) + q + j), he = G + Ie;
        l.style.height = he + "px";
      } else {
        const Y = I.length > 0 && x === I[0].ref.current;
        l.style.top = "0px";
        const Ie = Math.max(me, N + C.offsetTop + (Y ? X : 0) + le) + re;
        l.style.height = Ie + "px", C.scrollTop = G - me + C.offsetTop;
      }
      l.style.margin = `${Ce}px 0`, l.style.minHeight = J + "px", l.style.maxHeight = D + "px", r == null ? void 0 : r(), requestAnimationFrame(() => g.current = true);
    }
  }, [m, c.trigger, c.valueNode, l, p, C, x, w, c.dir, r]);
  Q(() => b(), [b]);
  const [R, E] = i.useState();
  Q(() => {
    p && E(window.getComputedStyle(p).zIndex);
  }, [p]);
  const P = i.useCallback((_) => {
    _ && v.current === true && (b(), y == null ? void 0 : y(), v.current = false);
  }, [b, y]);
  return h.jsx(bp, { scope: o, contentWrapper: l, shouldExpandOnScrollRef: g, onScrollButtonChange: P, children: h.jsx("div", { ref: u, style: { display: "flex", flexDirection: "column", position: "fixed", zIndex: R }, children: h.jsx(L.div, { ...s, ref: f, style: { boxSizing: "border-box", maxHeight: "100%", ...s.style } }) }) });
}, "SelectItemAlignedPosition")), Kr = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, align: r = "start", collisionPadding: s = Ce, ...c } = t, a = sr(o);
  return h.jsx(Pn, { ...a, ...c, ref: n, align: r, collisionPadding: s, style: { boxSizing: "border-box", ...c.style, "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-select-content-available-width": "var(--radix-popper-available-width)", "--radix-select-content-available-height": "var(--radix-popper-available-height)", "--radix-select-trigger-width": "var(--radix-popper-anchor-width)", "--radix-select-trigger-height": "var(--radix-popper-anchor-height)" } });
}, "SelectPopperPosition")), [bp, xp] = st(tt, {}), zr = "SelectViewport", pv = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, nonce: r, ...s } = t, c = Fn(zr, o), a = xp(zr, o), l = B(n, c.onViewportChange), u = i.useRef(0);
  return h.jsxs(h.Fragment, { children: [h.jsx("style", { dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" }, nonce: r }), h.jsx(Mn.Slot, { scope: o, children: h.jsx(L.div, { "data-radix-select-viewport": "", role: "presentation", ...s, ref: l, style: { position: "relative", flex: 1, overflow: "hidden auto", ...s.style }, onScroll: T(s.onScroll, (p) => {
    const d = p.currentTarget, { contentWrapper: f, shouldExpandOnScrollRef: m } = a;
    if ((m == null ? void 0 : m.current) && f) {
      const g = Math.abs(u.current - d.scrollTop);
      if (g > 0) {
        const v = window.innerHeight - Ce * 2, C = parseFloat(f.style.minHeight), x = parseFloat(f.style.height), w = Math.max(C, x);
        if (w < v) {
          const y = w + g, b = Math.min(v, y), R = y - b;
          f.style.height = b + "px", f.style.bottom === "0px" && (d.scrollTop = R > 0 ? R : 0, f.style.justifyContent = "flex-end");
        }
      }
    }
    u.current = d.scrollTop;
  }) }) })] });
}, "SelectViewport")), wp = "SelectGroup", [mv, hv] = st(wp), wo = "SelectItem", [Ep, ac] = st(wo), vv = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, value: r, disabled: s = false, textValue: c, ...a } = t, l = Ze(wo, o), u = Fn(wo, o), p = l.value === r, [d, f] = i.useState(c ?? ""), [m, g] = i.useState(false), v = ge((b) => {
    var _a3;
    return (_a3 = u.itemRefCallback) == null ? void 0 : _a3.call(u, b, r, s);
  }), C = B(n, v), x = ue(), w = i.useRef("touch"), y = U(() => {
    s || (l.onValueChange(r), l.onOpenChange(false));
  }, "handleSelect");
  return h.jsx(Ep, { scope: o, value: r, disabled: s, textId: x, isSelected: p, onItemTextChange: i.useCallback((b) => {
    f((R) => R || ((b == null ? void 0 : b.textContent) ?? "").trim());
  }, []), children: h.jsx(Mn.ItemSlot, { scope: o, value: r, disabled: s, textValue: d, children: h.jsx(L.div, { role: "option", "aria-labelledby": x, "data-highlighted": m ? "" : void 0, "aria-selected": p && m, "data-state": p ? "checked" : "unchecked", "aria-disabled": s || void 0, "data-disabled": s ? "" : void 0, tabIndex: s ? void 0 : -1, ...a, ref: C, onFocus: T(a.onFocus, () => g(true)), onBlur: T(a.onBlur, () => g(false)), onClick: T(a.onClick, () => {
    w.current !== "mouse" && y();
  }), onPointerUp: T(a.onPointerUp, () => {
    w.current === "mouse" && y();
  }), onPointerDown: T(a.onPointerDown, (b) => {
    w.current = b.pointerType;
  }), onPointerMove: T(a.onPointerMove, (b) => {
    var _a3;
    w.current = b.pointerType, s ? (_a3 = u.onItemLeave) == null ? void 0 : _a3.call(u) : w.current === "mouse" && b.currentTarget.focus({ preventScroll: true });
  }), onPointerLeave: T(a.onPointerLeave, (b) => {
    var _a3;
    b.currentTarget === document.activeElement && ((_a3 = u.onItemLeave) == null ? void 0 : _a3.call(u));
  }), onKeyDown: T(a.onKeyDown, (b) => {
    var _a3;
    s || b.target !== b.currentTarget || ((_a3 = u.searchRef) == null ? void 0 : _a3.current) !== "" && b.key === " " || (ip.includes(b.key) && y(), b.key === " " && b.preventDefault());
  }) }) }) });
}, "SelectItem")), Qt = "SelectItemText", gv = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, className: r, style: s, ...c } = t, a = Ze(Qt, o), l = Fn(Qt, o), u = ac(Qt, o), p = up(Qt, o), [d, f] = i.useState(null), m = ge((y) => {
    var _a3;
    return (_a3 = l.itemTextRefCallback) == null ? void 0 : _a3.call(l, y, u.value, u.disabled);
  }), g = B(n, f, u.onItemTextChange, m), v = d == null ? void 0 : d.textContent, C = i.useMemo(() => h.jsx("option", { value: u.value, disabled: u.disabled, children: v }, u.value), [u.disabled, u.value, v]), { onNativeOptionAdd: x, onNativeOptionRemove: w } = p;
  return Q(() => (x(C), () => w(C)), [x, w, C]), h.jsxs(h.Fragment, { children: [h.jsx(L.span, { id: u.textId, ...c, ref: g }), u.isSelected && a.valueNode && !a.valueNodeHasChildren && !Wt(a.value) ? vt.createPortal(c.children, a.valueNode) : null] });
}, "SelectItemText")), Rp = "SelectItemIndicator", Cv = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, ...r } = t;
  return ac(Rp, o).isSelected ? h.jsx(L.span, { "aria-hidden": true, ...r, ref: n }) : null;
}, "SelectItemIndicator")), Pp = "SelectBubbleInput", Sp = i.forwardRef(U(function({ __scopeSelect: t, ...n }, o) {
  const r = Ze(Pp, t), { value: s, onValueChange: c, required: a, disabled: l, name: u, autoComplete: p, form: d } = r, { nativeOptions: f, nativeSelectKey: m } = r, g = i.useRef(null), v = B(o, g), C = s ?? "", x = qi(C), w = Array.from(f).some((y) => (y.props.value ?? "") === "");
  return i.useEffect(() => {
    const y = g.current;
    if (!y) return;
    const b = window.HTMLSelectElement.prototype, E = Object.getOwnPropertyDescriptor(b, "value").set;
    if (x !== C && E) {
      const P = new Event("change", { bubbles: true });
      E.call(y, C), y.dispatchEvent(P);
    }
  }, [x, C]), h.jsxs(L.select, { "aria-hidden": true, required: a, tabIndex: -1, name: u, autoComplete: p, disabled: l, form: d, onChange: (y) => c(y.target.value), ...n, style: { ...ps, ...n.style }, ref: v, defaultValue: C, children: [Wt(s) && !w ? h.jsx("option", { value: "" }) : null, Array.from(f)] }, m);
}, "SelectBubbleInput"));
function lc(e) {
  return typeof e == "function";
}
U(lc, "isFunction");
function Wt(e) {
  return e === "" || e === void 0;
}
U(Wt, "shouldShowPlaceholder");
function ir(e) {
  const t = ge(e), n = i.useRef(""), o = i.useRef(0), r = i.useCallback((c) => {
    const a = n.current + c;
    t(a), U((function l(u) {
      n.current = u, window.clearTimeout(o.current), u !== "" && (o.current = window.setTimeout(() => l(""), 1e3));
    }), "updateSearch")(a);
  }, [t]), s = i.useCallback(() => {
    n.current = "", window.clearTimeout(o.current);
  }, []);
  return i.useEffect(() => () => window.clearTimeout(o.current), []), [n, r, s];
}
U(ir, "useTypeaheadSearch");
function cr(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let c = uc(e, Math.max(s, 0));
  r.length === 1 && (c = c.filter((u) => u !== n));
  const l = c.find((u) => u.textValue.toLowerCase().startsWith(r.toLowerCase()));
  return l !== n ? l : void 0;
}
U(cr, "findNextItem");
function uc(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
U(uc, "wrapArray");
var Ip = Object.defineProperty, ze = (e, t) => Ip(e, "name", { value: t, configurable: true }), ar = "Switch", [_p, yv] = ne(ar), [Tp, lr] = _p(ar);
function dc(e) {
  const { __scopeSwitch: t, checked: n, children: o, defaultChecked: r, disabled: s, form: c, name: a, onCheckedChange: l, required: u, value: p = "on", internal_do_not_use_render: d } = e, [f, m] = de({ prop: n, defaultProp: r ?? false, onChange: l, caller: ar }), [g, v] = i.useState(null), [C, x] = i.useState(null), w = i.useRef(false), [y, b] = i.useReducer((P) => P + 1, 0), R = g ? !!c || !!g.closest("form") : true, E = { checked: f, setChecked: m, disabled: s, control: g, setControl: v, name: a, form: c, value: p, hasConsumerStoppedPropagationRef: w, userInteractionCount: y, onUserInteraction: b, required: u, defaultChecked: r, isFormControl: R, bubbleInput: C, setBubbleInput: x };
  return h.jsx(Tp, { scope: t, ...E, children: fc(d) ? d(E) : o });
}
ze(dc, "SwitchProvider");
var Op = "SwitchTrigger", Dp = i.forwardRef(ze(function({ __scopeSwitch: t, onClick: n, ...o }, r) {
  const { control: s, form: c, value: a, disabled: l, checked: u, required: p, setControl: d, setChecked: f, hasConsumerStoppedPropagationRef: m, onUserInteraction: g, isFormControl: v, bubbleInput: C } = lr(Op, t), x = B(r, d), w = i.useRef(u);
  return i.useEffect(() => {
    const y = c ? s == null ? void 0 : s.ownerDocument.getElementById(c) : s == null ? void 0 : s.form;
    if (y instanceof HTMLFormElement) {
      const b = ze(() => f(w.current), "reset");
      return y.addEventListener("reset", b), () => y.removeEventListener("reset", b);
    }
  }, [s, c, f]), h.jsx(L.button, { type: "button", role: "switch", "aria-checked": u, "aria-required": p, "data-state": ur(u), "data-disabled": l ? "" : void 0, disabled: l, value: a, ...o, ref: x, onClick: T(n, (y) => {
    g(), f((b) => !b), C && v && (m.current = y.isPropagationStopped(), m.current || y.stopPropagation());
  }) });
}, "SwitchTrigger")), bv = i.forwardRef(ze(function(t, n) {
  const { __scopeSwitch: o, name: r, checked: s, defaultChecked: c, required: a, disabled: l, value: u, onCheckedChange: p, form: d, ...f } = t;
  return h.jsx(dc, { __scopeSwitch: o, checked: s, defaultChecked: c, disabled: l, required: a, onCheckedChange: p, name: r, form: d, value: u, internal_do_not_use_render: ({ isFormControl: m }) => h.jsxs(h.Fragment, { children: [h.jsx(Dp, { ...f, ref: n, __scopeSwitch: o }), m && h.jsx(Fp, { __scopeSwitch: o })] }) });
}, "Switch")), Ap = "SwitchThumb", xv = i.forwardRef(ze(function(t, n) {
  const { __scopeSwitch: o, ...r } = t, s = lr(Ap, o);
  return h.jsx(L.span, { "data-state": ur(s.checked), "data-disabled": s.disabled ? "" : void 0, ...r, ref: n });
}, "SwitchThumb")), Mp = "SwitchBubbleInput", Fp = i.forwardRef(ze(function({ __scopeSwitch: t, onClick: n, ...o }, r) {
  const { control: s, hasConsumerStoppedPropagationRef: c, userInteractionCount: a, checked: l, defaultChecked: u, required: p, disabled: d, name: f, value: m, form: g, bubbleInput: v, setBubbleInput: C } = lr(Mp, t), x = B(r, C), w = Lt(s), y = i.useRef(false), b = i.useRef(l), R = i.useRef(a);
  i.useEffect(() => {
    const P = v;
    if (!P) return;
    const _ = window.HTMLInputElement.prototype, A = Object.getOwnPropertyDescriptor(_, "checked").set, S = a !== R.current;
    R.current = a;
    const I = b.current !== l;
    b.current = l;
    const D = !(S && c.current);
    if (I && A) {
      y.current = !S;
      const k = new Event("click", { bubbles: D });
      A.call(P, l), P.dispatchEvent(k), y.current = false;
    }
  }, [v, l, c, a]);
  const E = i.useRef(l);
  return h.jsx(L.input, { type: "checkbox", "aria-hidden": true, defaultChecked: u ?? E.current, required: p, disabled: d, name: f, value: m, form: g, ...o, tabIndex: -1, ref: x, onClick: T(n, (P) => {
    y.current && P.stopPropagation();
  }), style: { ...o.style, ...w, position: "absolute", pointerEvents: "none", opacity: 0, margin: 0, transform: "translateX(-100%)" } });
}, "SwitchBubbleInput"));
function fc(e) {
  return typeof e == "function";
}
ze(fc, "isFunction");
function ur(e) {
  return e ? "checked" : "unchecked";
}
ze(ur, "getState");
var kp = Object.defineProperty, St = (e, t) => kp(e, "name", { value: t, configurable: true }), dr = "Tabs", [Np, wv] = ne(dr, [Et]), pc = Et(), [$p, fr] = Np(dr), Lp = i.forwardRef(St(function(t, n) {
  const { __scopeTabs: o, value: r, onValueChange: s, defaultValue: c, orientation: a = "horizontal", dir: l, activationMode: u = "automatic", ...p } = t, d = Ct(l), [f, m] = de({ prop: r, onChange: s, defaultProp: c ?? "", caller: dr });
  return h.jsx($p, { scope: o, baseId: ue(), value: f, onValueChange: m, orientation: a, dir: d, activationMode: u, children: h.jsx(L.div, { dir: d, "data-orientation": a, ...p, ref: n }) });
}, "Tabs")), jp = "TabsList", Bp = i.forwardRef(St(function(t, n) {
  const { __scopeTabs: o, loop: r = true, ...s } = t, c = fr(jp, o), a = pc(o);
  return h.jsx(Ho, { asChild: true, ...a, orientation: c.orientation, dir: c.dir, loop: r, children: h.jsx(L.div, { role: "tablist", "aria-orientation": c.orientation, ...s, ref: n }) });
}, "TabsList")), Vp = "TabsTrigger", Wp = i.forwardRef(St(function(t, n) {
  const { __scopeTabs: o, value: r, disabled: s = false, ...c } = t, a = fr(Vp, o), l = pc(o), u = pr(a.baseId, r), p = mr(a.baseId, r), d = r === a.value;
  return h.jsx(Go, { asChild: true, ...l, focusable: !s, active: d, children: h.jsx(L.button, { type: "button", role: "tab", "aria-selected": d, "aria-controls": p, "data-state": d ? "active" : "inactive", "data-disabled": s ? "" : void 0, disabled: s, id: u, ...c, ref: n, onMouseDown: T(t.onMouseDown, (f) => {
    !s && f.button === 0 && f.ctrlKey === false ? a.onValueChange(r) : f.preventDefault();
  }), onKeyDown: T(t.onKeyDown, (f) => {
    s || f.target !== f.currentTarget || [" ", "Enter"].includes(f.key) && a.onValueChange(r);
  }), onFocus: T(t.onFocus, () => {
    const f = a.activationMode !== "manual";
    !d && !s && f && a.onValueChange(r);
  }) }) });
}, "TabsTrigger")), Up = "TabsContent", Hp = i.forwardRef(St(function(t, n) {
  const { __scopeTabs: o, value: r, forceMount: s, children: c, ...a } = t, l = fr(Up, o), u = pr(l.baseId, r), p = mr(l.baseId, r), d = r === l.value, f = i.useRef(d);
  return i.useEffect(() => {
    const m = requestAnimationFrame(() => f.current = false);
    return () => cancelAnimationFrame(m);
  }, []), h.jsx(fe, { present: s || d, children: ({ present: m }) => h.jsx(L.div, { "data-state": d ? "active" : "inactive", "data-orientation": l.orientation, role: "tabpanel", "aria-labelledby": u, hidden: !m, id: p, tabIndex: 0, ...a, ref: n, style: { ...t.style, animationDuration: f.current ? "0s" : void 0 }, children: m && c }) });
}, "TabsContent"));
function pr(e, t) {
  return `${e}-trigger-${t}`;
}
St(pr, "makeTriggerId");
function mr(e, t) {
  return `${e}-content-${t}`;
}
St(mr, "makeContentId");
var Ev = Lp, Rv = Bp, Pv = Wp, Sv = Hp, Gp = Object.defineProperty, Z = (e, t) => Gp(e, "name", { value: t, configurable: true }), [hr, Iv] = ne("Tooltip", [Xe]), kn = Xe(), Kp = "TooltipProvider", zp = 700, Eo = "tooltip.open", [Yp, vr] = hr(Kp), Xp = Z((e) => {
  const { __scopeTooltip: t, delayDuration: n = zp, skipDelayDuration: o = 300, disableHoverableContent: r = false, children: s } = e, c = i.useRef(true), a = i.useRef(false), l = i.useRef(0);
  return i.useEffect(() => {
    const u = l.current;
    return () => window.clearTimeout(u);
  }, []), h.jsx(Yp, { scope: t, isOpenDelayedRef: c, delayDuration: n, onOpen: i.useCallback(() => {
    o <= 0 || (window.clearTimeout(l.current), c.current = false);
  }, [o]), onClose: i.useCallback(() => {
    o <= 0 || (window.clearTimeout(l.current), l.current = window.setTimeout(() => c.current = true, o));
  }, [o]), isPointerInTransitRef: a, onPointerInTransitChange: i.useCallback((u) => {
    a.current = u;
  }, []), disableHoverableContent: r, children: s });
}, "TooltipProvider"), Ro = "Tooltip", [qp, Ut] = hr(Ro), Zp = Z((e) => {
  const { __scopeTooltip: t, children: n, open: o, defaultOpen: r, onOpenChange: s, disableHoverableContent: c, delayDuration: a } = e, l = vr(Ro, e.__scopeTooltip), u = kn(t), [p, d] = i.useState(null), [f, m] = i.useState(void 0), g = ue(), v = i.useRef(0), C = c ?? l.disableHoverableContent, x = a ?? l.delayDuration, w = i.useRef(false), [y, b] = de({ prop: o, defaultProp: r ?? false, onChange: Z((A) => {
    A ? (l.onOpen(), document.dispatchEvent(new CustomEvent(Eo))) : l.onClose(), s == null ? void 0 : s(A);
  }, "onChange"), caller: Ro }), R = i.useMemo(() => y ? w.current ? "delayed-open" : "instant-open" : "closed", [y]), E = i.useCallback(() => {
    window.clearTimeout(v.current), v.current = 0, w.current = false, b(true);
  }, [b]), P = i.useCallback(() => {
    window.clearTimeout(v.current), v.current = 0, b(false);
  }, [b]), _ = i.useCallback(() => {
    window.clearTimeout(v.current), v.current = window.setTimeout(() => {
      w.current = true, b(true), v.current = 0;
    }, x);
  }, [x, b]);
  i.useEffect(() => () => {
    v.current && (window.clearTimeout(v.current), v.current = 0);
  }, []);
  const O = f ?? g;
  return h.jsx(En, { ...u, children: h.jsx(qp, { scope: t, contentId: O, setContentId: m, open: y, stateAttribute: R, trigger: p, onTriggerChange: d, onTriggerEnter: i.useCallback(() => {
    l.isOpenDelayedRef.current ? _() : E();
  }, [l.isOpenDelayedRef, _, E]), onTriggerLeave: i.useCallback(() => {
    C ? P() : (window.clearTimeout(v.current), v.current = 0);
  }, [P, C]), onOpen: E, onClose: P, disableHoverableContent: C, children: n }) });
}, "Tooltip"), Yr = "TooltipTrigger", Qp = i.forwardRef(Z(function(t, n) {
  const { __scopeTooltip: o, ...r } = t, s = Ut(Yr, o), c = vr(Yr, o), a = kn(o), l = i.useRef(null), u = B(n, l, s.onTriggerChange), p = i.useRef(false), d = i.useRef(false), f = i.useCallback(() => p.current = false, []);
  return i.useEffect(() => () => document.removeEventListener("pointerup", f), [f]), h.jsx(Rn, { asChild: true, ...a, children: h.jsx(L.button, { "aria-describedby": s.open ? s.contentId : void 0, "data-state": s.stateAttribute, ...r, ref: u, onPointerMove: T(t.onPointerMove, (m) => {
    m.pointerType !== "touch" && !d.current && !c.isPointerInTransitRef.current && (s.onTriggerEnter(), d.current = true);
  }), onPointerLeave: T(t.onPointerLeave, () => {
    s.onTriggerLeave(), d.current = false;
  }), onPointerDown: T(t.onPointerDown, () => {
    s.open && s.onClose(), p.current = true, document.addEventListener("pointerup", f, { once: true });
  }), onFocus: T(t.onFocus, () => {
    p.current || s.onOpen();
  }), onBlur: T(t.onBlur, s.onClose), onClick: T(t.onClick, s.onClose) }) });
}, "TooltipTrigger")), mc = "TooltipPortal", [Jp, em] = hr(mc, { forceMount: void 0 }), tm = Z((e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, s = Ut(mc, t);
  return h.jsx(Jp, { scope: t, forceMount: n, children: h.jsx(fe, { present: n || s.open, children: h.jsx(Nt, { asChild: true, container: r, children: o }) }) });
}, "TooltipPortal"), Mt = "TooltipContent", nm = i.forwardRef(Z(function(t, n) {
  const o = em(Mt, t.__scopeTooltip), { forceMount: r = o.forceMount, side: s = "top", ...c } = t, a = Ut(Mt, t.__scopeTooltip);
  return h.jsx(fe, { present: r || a.open, children: a.disableHoverableContent ? h.jsx(hc, { side: s, ...c, ref: n }) : h.jsx(om, { side: s, ...c, ref: n }) });
}, "TooltipContent")), om = i.forwardRef(Z(function(t, n) {
  const o = Ut(Mt, t.__scopeTooltip), r = vr(Mt, t.__scopeTooltip), s = i.useRef(null), c = B(n, s), [a, l] = i.useState(null), { trigger: u, onClose: p } = o, d = s.current, { onPointerInTransitChange: f } = r, m = i.useCallback(() => {
    l(null), f(false);
  }, [f]), g = i.useCallback((v, C) => {
    const x = v.currentTarget, w = { x: v.clientX, y: v.clientY }, y = vc(w, x.getBoundingClientRect()), b = gc(w, y), R = Cc(C.getBoundingClientRect()), E = bc([...b, ...R]);
    l(E), f(true);
  }, [f]);
  return i.useEffect(() => () => m(), [m]), i.useEffect(() => {
    if (u && d) {
      const v = Z((x) => g(x, d), "handleTriggerLeave"), C = Z((x) => g(x, u), "handleContentLeave");
      return u.addEventListener("pointerleave", v), d.addEventListener("pointerleave", C), () => {
        u.removeEventListener("pointerleave", v), d.removeEventListener("pointerleave", C);
      };
    }
  }, [u, d, g, m]), i.useEffect(() => {
    if (a) {
      const v = Z((C) => {
        const x = C.target, w = { x: C.clientX, y: C.clientY }, y = (u == null ? void 0 : u.contains(x)) || (d == null ? void 0 : d.contains(x)), b = !yc(w, a);
        y ? m() : b && (m(), p());
      }, "handleTrackPointerGrace");
      return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v);
    }
  }, [u, d, a, p, m]), h.jsx(hc, { ...t, ref: c });
}, "TooltipContentHoverable")), rm = as("TooltipContent"), hc = i.forwardRef(Z(function(t, n) {
  const { __scopeTooltip: o, children: r, "aria-label": s, id: c, onEscapeKeyDown: a, onPointerDownOutside: l, ...u } = t, p = Ut(Mt, o), d = kn(o), { onClose: f } = p;
  i.useEffect(() => (document.addEventListener(Eo, f), () => document.removeEventListener(Eo, f)), [f]), i.useEffect(() => {
    if (p.trigger) {
      const g = Z((v) => {
        v.target instanceof Node && v.target.contains(p.trigger) && f();
      }, "handleScroll");
      return window.addEventListener("scroll", g, { capture: true }), () => window.removeEventListener("scroll", g, { capture: true });
    }
  }, [p.trigger, f]);
  const { setContentId: m } = p;
  return Q(() => (m(c), () => {
    m(void 0);
  }), [c, m]), h.jsx(kt, { asChild: true, disableOutsidePointerEvents: false, onEscapeKeyDown: a, onPointerDownOutside: l, onFocusOutside: (g) => g.preventDefault(), onDismiss: f, children: h.jsxs(Pn, { "data-state": p.stateAttribute, role: s ? void 0 : "tooltip", id: s ? void 0 : p.contentId, ...d, ...u, ref: n, style: { ...u.style, "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)", "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)", "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)", "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)" }, children: [h.jsx(rm, { children: r }), s ? h.jsx(na, { id: p.contentId, role: "tooltip", children: s }) : null] }) });
}, "TooltipContentImpl")), sm = i.forwardRef(Z(function(t, n) {
  const { __scopeTooltip: o, ...r } = t, s = kn(o);
  return h.jsx(sd, { ...s, ...r, ref: n });
}, "TooltipArrow"));
function vc(e, t) {
  const n = Math.abs(t.top - e.y), o = Math.abs(t.bottom - e.y), r = Math.abs(t.right - e.x), s = Math.abs(t.left - e.x);
  switch (Math.min(n, o, r, s)) {
    case s:
      return "left";
    case r:
      return "right";
    case n:
      return "top";
    case o:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
Z(vc, "getExitSideFromRect");
function gc(e, t, n = 5) {
  const o = [];
  switch (t) {
    case "top":
      o.push({ x: e.x - n, y: e.y + n }, { x: e.x + n, y: e.y + n });
      break;
    case "bottom":
      o.push({ x: e.x - n, y: e.y - n }, { x: e.x + n, y: e.y - n });
      break;
    case "left":
      o.push({ x: e.x + n, y: e.y - n }, { x: e.x + n, y: e.y + n });
      break;
    case "right":
      o.push({ x: e.x - n, y: e.y - n }, { x: e.x - n, y: e.y + n });
      break;
  }
  return o;
}
Z(gc, "getPaddedExitPoints");
function Cc(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [{ x: r, y: t }, { x: n, y: t }, { x: n, y: o }, { x: r, y: o }];
}
Z(Cc, "getPointsFromRect");
function yc(e, t) {
  const { x: n, y: o } = e;
  let r = false;
  for (let s = 0, c = t.length - 1; s < t.length; c = s++) {
    const a = t[s], l = t[c], u = a.x, p = a.y, d = l.x, f = l.y;
    p > o != f > o && n < (d - u) * (o - p) / (f - p) + u && (r = !r);
  }
  return r;
}
Z(yc, "isPointInPolygon");
function bc(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), xc(t);
}
Z(bc, "getHull");
function xc(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    for (; t.length >= 2; ) {
      const s = t[t.length - 1], c = t[t.length - 2];
      if ((s.x - c.x) * (r.y - c.y) >= (s.y - c.y) * (r.x - c.x)) t.pop();
      else break;
    }
    t.push(r);
  }
  t.pop();
  const n = [];
  for (let o = e.length - 1; o >= 0; o--) {
    const r = e[o];
    for (; n.length >= 2; ) {
      const s = n[n.length - 1], c = n[n.length - 2];
      if ((s.x - c.x) * (r.y - c.y) >= (s.y - c.y) * (r.x - c.x)) n.pop();
      else break;
    }
    n.push(r);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
Z(xc, "getHullPresorted");
var _v = Xp, Tv = Zp, Ov = Qp, Dv = tm, Av = nm, Mv = sm;
function He(e, t, { checkForDefaultPrevented: n = true } = {}) {
  return function(r) {
    if (e == null ? void 0 : e(r), n === false || !r.defaultPrevented) return t == null ? void 0 : t(r);
  };
}
function Xr(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
function gr(...e) {
  return (t) => {
    let n = false;
    const o = e.map((r) => {
      const s = Xr(r, t);
      return !n && typeof s == "function" && (n = true), s;
    });
    if (n) return () => {
      for (let r = 0; r < o.length; r++) {
        const s = o[r];
        typeof s == "function" ? s() : Xr(e[r], null);
      }
    };
  };
}
function it(...e) {
  return i.useCallback(gr(...e), e);
}
function im(e, t) {
  const n = i.createContext(t), o = (s) => {
    const { children: c, ...a } = s, l = i.useMemo(() => a, Object.values(a));
    return h.jsx(n.Provider, { value: l, children: c });
  };
  o.displayName = e + "Provider";
  function r(s) {
    const c = i.useContext(n);
    if (c) return c;
    if (t !== void 0) return t;
    throw new Error(`\`${s}\` must be used within \`${e}\``);
  }
  return [o, r];
}
function cm(e, t = []) {
  let n = [];
  function o(s, c) {
    const a = i.createContext(c), l = n.length;
    n = [...n, c];
    const u = (d) => {
      var _a3;
      const { scope: f, children: m, ...g } = d, v = ((_a3 = f == null ? void 0 : f[e]) == null ? void 0 : _a3[l]) || a, C = i.useMemo(() => g, Object.values(g));
      return h.jsx(v.Provider, { value: C, children: m });
    };
    u.displayName = s + "Provider";
    function p(d, f) {
      var _a3;
      const m = ((_a3 = f == null ? void 0 : f[e]) == null ? void 0 : _a3[l]) || a, g = i.useContext(m);
      if (g) return g;
      if (c !== void 0) return c;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return [u, p];
  }
  const r = () => {
    const s = n.map((c) => i.createContext(c));
    return function(a) {
      const l = (a == null ? void 0 : a[e]) || s;
      return i.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: l } }), [a, l]);
    };
  };
  return r.scopeName = e, [o, am(r, ...t)];
}
function am(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const o = e.map((r) => ({ useScope: r(), scopeName: r.scopeName }));
    return function(s) {
      const c = o.reduce((a, { useScope: l, scopeName: u }) => {
        const d = l(s)[`__scope${u}`];
        return { ...a, ...d };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: c }), [c]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var lm = (globalThis == null ? void 0 : globalThis.document) ? i.useLayoutEffect : () => {
}, um = $e[" useId ".trim().toString()] || (() => {
}), dm = 0;
function Jn(e) {
  const [t, n] = i.useState(um());
  return lm(() => {
    n((o) => o ?? String(dm++));
  }, [e]), t ? `radix-${t}` : "";
}
var fm = (globalThis == null ? void 0 : globalThis.document) ? i.useLayoutEffect : () => {
}, pm = $e[" useInsertionEffect ".trim().toString()] || fm;
function mm({ prop: e, defaultProp: t, onChange: n = () => {
}, caller: o }) {
  const [r, s, c] = hm({ defaultProp: t, onChange: n }), a = e !== void 0, l = a ? e : r;
  {
    const p = i.useRef(e !== void 0);
    i.useEffect(() => {
      const d = p.current;
      d !== a && console.warn(`${o} is changing from ${d ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`), p.current = a;
    }, [a, o]);
  }
  const u = i.useCallback((p) => {
    var _a3;
    if (a) {
      const d = vm(p) ? p(e) : p;
      d !== e && ((_a3 = c.current) == null ? void 0 : _a3.call(c, d));
    } else s(p);
  }, [a, e, s, c]);
  return [l, u];
}
function hm({ defaultProp: e, onChange: t }) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return pm(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    var _a3;
    r.current !== n && ((_a3 = s.current) == null ? void 0 : _a3.call(s, n), r.current = n);
  }, [n, r]), [n, o, s];
}
function vm(e) {
  return typeof e == "function";
}
function wc(e) {
  const t = gm(e), n = i.forwardRef((o, r) => {
    const { children: s, ...c } = o, a = i.Children.toArray(s), l = a.find(ym);
    if (l) {
      const u = l.props.children, p = a.map((d) => d === l ? i.Children.count(u) > 1 ? i.Children.only(null) : i.isValidElement(u) ? u.props.children : null : d);
      return h.jsx(t, { ...c, ref: r, children: i.isValidElement(u) ? i.cloneElement(u, void 0, p) : null });
    }
    return h.jsx(t, { ...c, ref: r, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
function gm(e) {
  const t = i.forwardRef((n, o) => {
    const { children: r, ...s } = n;
    if (i.isValidElement(r)) {
      const c = xm(r), a = bm(s, r.props);
      return r.type !== i.Fragment && (a.ref = o ? gr(o, c) : c), i.cloneElement(r, a);
    }
    return i.Children.count(r) > 1 ? i.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Cm = /* @__PURE__ */ Symbol("radix.slottable");
function ym(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Cm;
}
function bm(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...a) => {
      const l = s(...a);
      return r(...a), l;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function xm(e) {
  var _a3, _b;
  let t = (_a3 = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : _a3.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (_b = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : _b.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var wm = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"], je = wm.reduce((e, t) => {
  const n = wc(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: c, ...a } = r, l = c ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = true), h.jsx(l, { ...a, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Em(e, t) {
  e && vt.flushSync(() => e.dispatchEvent(t));
}
function Cr(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => (...n) => {
    var _a3;
    return (_a3 = t.current) == null ? void 0 : _a3.call(t, ...n);
  }, []);
}
function Rm(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Cr(e);
  i.useEffect(() => {
    const o = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", o, { capture: true }), () => t.removeEventListener("keydown", o, { capture: true });
  }, [n, t]);
}
var Pm = "DismissableLayer", Po = "dismissableLayer.update", Sm = "dismissableLayer.pointerDownOutside", Im = "dismissableLayer.focusOutside", qr, Ec = i.createContext({ layers: /* @__PURE__ */ new Set(), layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(), branches: /* @__PURE__ */ new Set() }), Rc = i.forwardRef((e, t) => {
  const { disableOutsidePointerEvents: n = false, onEscapeKeyDown: o, onPointerDownOutside: r, onFocusOutside: s, onInteractOutside: c, onDismiss: a, ...l } = e, u = i.useContext(Ec), [p, d] = i.useState(null), f = (p == null ? void 0 : p.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, m] = i.useState({}), g = it(t, (P) => d(P)), v = Array.from(u.layers), [C] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), x = v.indexOf(C), w = p ? v.indexOf(p) : -1, y = u.layersWithOutsidePointerEventsDisabled.size > 0, b = w >= x, R = Om((P) => {
    const _ = P.target, O = [...u.branches].some((A) => A.contains(_));
    !b || O || (r == null ? void 0 : r(P), c == null ? void 0 : c(P), P.defaultPrevented || (a == null ? void 0 : a()));
  }, f), E = Dm((P) => {
    const _ = P.target;
    [...u.branches].some((A) => A.contains(_)) || (s == null ? void 0 : s(P), c == null ? void 0 : c(P), P.defaultPrevented || (a == null ? void 0 : a()));
  }, f);
  return Rm((P) => {
    w === u.layers.size - 1 && (o == null ? void 0 : o(P), !P.defaultPrevented && a && (P.preventDefault(), a()));
  }, f), i.useEffect(() => {
    if (p) return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (qr = f.body.style.pointerEvents, f.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(p)), u.layers.add(p), Zr(), () => {
      n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (f.body.style.pointerEvents = qr);
    };
  }, [p, f, n, u]), i.useEffect(() => () => {
    p && (u.layers.delete(p), u.layersWithOutsidePointerEventsDisabled.delete(p), Zr());
  }, [p, u]), i.useEffect(() => {
    const P = () => m({});
    return document.addEventListener(Po, P), () => document.removeEventListener(Po, P);
  }, []), h.jsx(je.div, { ...l, ref: g, style: { pointerEvents: y ? b ? "auto" : "none" : void 0, ...e.style }, onFocusCapture: He(e.onFocusCapture, E.onFocusCapture), onBlurCapture: He(e.onBlurCapture, E.onBlurCapture), onPointerDownCapture: He(e.onPointerDownCapture, R.onPointerDownCapture) });
});
Rc.displayName = Pm;
var _m = "DismissableLayerBranch", Tm = i.forwardRef((e, t) => {
  const n = i.useContext(Ec), o = i.useRef(null), r = it(t, o);
  return i.useEffect(() => {
    const s = o.current;
    if (s) return n.branches.add(s), () => {
      n.branches.delete(s);
    };
  }, [n.branches]), h.jsx(je.div, { ...e, ref: r });
});
Tm.displayName = _m;
function Om(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Cr(e), o = i.useRef(false), r = i.useRef(() => {
  });
  return i.useEffect(() => {
    const s = (a) => {
      if (a.target && !o.current) {
        let l = function() {
          Pc(Sm, n, u, { discrete: true });
        };
        const u = { originalEvent: a };
        a.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = l, t.addEventListener("click", r.current, { once: true })) : l();
      } else t.removeEventListener("click", r.current);
      o.current = false;
    }, c = window.setTimeout(() => {
      t.addEventListener("pointerdown", s);
    }, 0);
    return () => {
      window.clearTimeout(c), t.removeEventListener("pointerdown", s), t.removeEventListener("click", r.current);
    };
  }, [t, n]), { onPointerDownCapture: () => o.current = true };
}
function Dm(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Cr(e), o = i.useRef(false);
  return i.useEffect(() => {
    const r = (s) => {
      s.target && !o.current && Pc(Im, n, { originalEvent: s }, { discrete: false });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), { onFocusCapture: () => o.current = true, onBlurCapture: () => o.current = false };
}
function Zr() {
  const e = new CustomEvent(Po);
  document.dispatchEvent(e);
}
function Pc(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: false, cancelable: true, detail: n });
  t && r.addEventListener(e, t, { once: true }), o ? Em(r, s) : r.dispatchEvent(s);
}
function Qr(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => (...n) => {
    var _a3;
    return (_a3 = t.current) == null ? void 0 : _a3.call(t, ...n);
  }, []);
}
var eo = "focusScope.autoFocusOnMount", to = "focusScope.autoFocusOnUnmount", Jr = { bubbles: false, cancelable: true }, Am = "FocusScope", Sc = i.forwardRef((e, t) => {
  const { loop: n = false, trapped: o = false, onMountAutoFocus: r, onUnmountAutoFocus: s, ...c } = e, [a, l] = i.useState(null), u = Qr(r), p = Qr(s), d = i.useRef(null), f = it(t, (v) => l(v)), m = i.useRef({ paused: false, pause() {
    this.paused = true;
  }, resume() {
    this.paused = false;
  } }).current;
  i.useEffect(() => {
    if (o) {
      let v = function(y) {
        if (m.paused || !a) return;
        const b = y.target;
        a.contains(b) ? d.current = b : Ve(d.current, { select: true });
      }, C = function(y) {
        if (m.paused || !a) return;
        const b = y.relatedTarget;
        b !== null && (a.contains(b) || Ve(d.current, { select: true }));
      }, x = function(y) {
        if (document.activeElement === document.body) for (const R of y) R.removedNodes.length > 0 && Ve(a);
      };
      document.addEventListener("focusin", v), document.addEventListener("focusout", C);
      const w = new MutationObserver(x);
      return a && w.observe(a, { childList: true, subtree: true }), () => {
        document.removeEventListener("focusin", v), document.removeEventListener("focusout", C), w.disconnect();
      };
    }
  }, [o, a, m.paused]), i.useEffect(() => {
    if (a) {
      ts.add(m);
      const v = document.activeElement;
      if (!a.contains(v)) {
        const x = new CustomEvent(eo, Jr);
        a.addEventListener(eo, u), a.dispatchEvent(x), x.defaultPrevented || (Mm(Lm(Ic(a)), { select: true }), document.activeElement === v && Ve(a));
      }
      return () => {
        a.removeEventListener(eo, u), setTimeout(() => {
          const x = new CustomEvent(to, Jr);
          a.addEventListener(to, p), a.dispatchEvent(x), x.defaultPrevented || Ve(v ?? document.body, { select: true }), a.removeEventListener(to, p), ts.remove(m);
        }, 0);
      };
    }
  }, [a, u, p, m]);
  const g = i.useCallback((v) => {
    if (!n && !o || m.paused) return;
    const C = v.key === "Tab" && !v.altKey && !v.ctrlKey && !v.metaKey, x = document.activeElement;
    if (C && x) {
      const w = v.currentTarget, [y, b] = Fm(w);
      y && b ? !v.shiftKey && x === b ? (v.preventDefault(), n && Ve(y, { select: true })) : v.shiftKey && x === y && (v.preventDefault(), n && Ve(b, { select: true })) : x === w && v.preventDefault();
    }
  }, [n, o, m.paused]);
  return h.jsx(je.div, { tabIndex: -1, ...c, ref: f, onKeyDown: g });
});
Sc.displayName = Am;
function Mm(e, { select: t = false } = {}) {
  const n = document.activeElement;
  for (const o of e) if (Ve(o, { select: t }), document.activeElement !== n) return;
}
function Fm(e) {
  const t = Ic(e), n = es(t, e), o = es(t.reverse(), e);
  return [n, o];
}
function Ic(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (o) => {
    const r = o.tagName === "INPUT" && o.type === "hidden";
    return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function es(e, t) {
  for (const n of e) if (!km(n, { upTo: t })) return n;
}
function km(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return true;
  for (; e; ) {
    if (t !== void 0 && e === t) return false;
    if (getComputedStyle(e).display === "none") return true;
    e = e.parentElement;
  }
  return false;
}
function Nm(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Ve(e, { select: t = false } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: true }), e !== n && Nm(e) && t && e.select();
  }
}
var ts = $m();
function $m() {
  let e = [];
  return { add(t) {
    const n = e[0];
    t !== n && (n == null ? void 0 : n.pause()), e = ns(e, t), e.unshift(t);
  }, remove(t) {
    var _a3;
    e = ns(e, t), (_a3 = e[0]) == null ? void 0 : _a3.resume();
  } };
}
function ns(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Lm(e) {
  return e.filter((t) => t.tagName !== "A");
}
var jm = (globalThis == null ? void 0 : globalThis.document) ? i.useLayoutEffect : () => {
}, Bm = "Portal", _c = i.forwardRef((e, t) => {
  var _a3;
  const { container: n, ...o } = e, [r, s] = i.useState(false);
  jm(() => s(true), []);
  const c = n || r && ((_a3 = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a3.body);
  return c ? Wc.createPortal(h.jsx(je.div, { ...o, ref: t }), c) : null;
});
_c.displayName = Bm;
var os = (globalThis == null ? void 0 : globalThis.document) ? i.useLayoutEffect : () => {
};
function Vm(e, t) {
  return i.useReducer((n, o) => t[n][o] ?? n, e);
}
var Nn = (e) => {
  const { present: t, children: n } = e, o = Wm(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = it(o.ref, Um(r));
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
};
Nn.displayName = "Presence";
function Wm(e) {
  const [t, n] = i.useState(), o = i.useRef(null), r = i.useRef(e), s = i.useRef("none"), c = e ? "mounted" : "unmounted", [a, l] = Vm(c, { mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" }, unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" }, unmounted: { MOUNT: "mounted" } });
  return i.useEffect(() => {
    const u = Jt(o.current);
    s.current = a === "mounted" ? u : "none";
  }, [a]), os(() => {
    const u = o.current, p = r.current;
    if (p !== e) {
      const f = s.current, m = Jt(u);
      e ? l("MOUNT") : m === "none" || (u == null ? void 0 : u.display) === "none" ? l("UNMOUNT") : l(p && f !== m ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), os(() => {
    if (t) {
      let u;
      const p = t.ownerDocument.defaultView ?? window, d = (m) => {
        const v = Jt(o.current).includes(CSS.escape(m.animationName));
        if (m.target === t && v && (l("ANIMATION_END"), !r.current)) {
          const C = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = p.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = C);
          });
        }
      }, f = (m) => {
        m.target === t && (s.current = Jt(o.current));
      };
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        p.clearTimeout(u), t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else l("ANIMATION_END");
  }, [t, l]), { isPresent: ["mounted", "unmountSuspended"].includes(a), ref: i.useCallback((u) => {
    o.current = u ? getComputedStyle(u) : null, n(u);
  }, []) };
}
function Jt(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Um(e) {
  var _a3, _b;
  let t = (_a3 = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : _a3.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (_b = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : _b.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var no = 0;
function Hm() {
  i.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? rs()), document.body.insertAdjacentElement("beforeend", e[1] ?? rs()), no++, () => {
      no === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), no--;
    };
  }, []);
}
function rs() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var $n = "Dialog", [Tc] = cm($n), [Gm, xe] = Tc($n), Oc = (e) => {
  const { __scopeDialog: t, children: n, open: o, defaultOpen: r, onOpenChange: s, modal: c = true } = e, a = i.useRef(null), l = i.useRef(null), [u, p] = mm({ prop: o, defaultProp: r ?? false, onChange: s, caller: $n });
  return h.jsx(Gm, { scope: t, triggerRef: a, contentRef: l, contentId: Jn(), titleId: Jn(), descriptionId: Jn(), open: u, onOpenChange: p, onOpenToggle: i.useCallback(() => p((d) => !d), [p]), modal: c, children: n });
};
Oc.displayName = $n;
var Dc = "DialogTrigger", Km = i.forwardRef((e, t) => {
  const { __scopeDialog: n, ...o } = e, r = xe(Dc, n), s = it(t, r.triggerRef);
  return h.jsx(je.button, { type: "button", "aria-haspopup": "dialog", "aria-expanded": r.open, "aria-controls": r.contentId, "data-state": xr(r.open), ...o, ref: s, onClick: He(e.onClick, r.onOpenToggle) });
});
Km.displayName = Dc;
var yr = "DialogPortal", [zm, Ac] = Tc(yr, { forceMount: void 0 }), Mc = (e) => {
  const { __scopeDialog: t, forceMount: n, children: o, container: r } = e, s = xe(yr, t);
  return h.jsx(zm, { scope: t, forceMount: n, children: i.Children.map(o, (c) => h.jsx(Nn, { present: n || s.open, children: h.jsx(_c, { asChild: true, container: r, children: c }) })) });
};
Mc.displayName = yr;
var dn = "DialogOverlay", Fc = i.forwardRef((e, t) => {
  const n = Ac(dn, e.__scopeDialog), { forceMount: o = n.forceMount, ...r } = e, s = xe(dn, e.__scopeDialog);
  return s.modal ? h.jsx(Nn, { present: o || s.open, children: h.jsx(Xm, { ...r, ref: t }) }) : null;
});
Fc.displayName = dn;
var Ym = wc("DialogOverlay.RemoveScroll"), Xm = i.forwardRef((e, t) => {
  const { __scopeDialog: n, ...o } = e, r = xe(dn, n);
  return h.jsx(bt, { as: Ym, allowPinchZoom: true, shards: [r.contentRef], children: h.jsx(je.div, { "data-state": xr(r.open), ...o, ref: t, style: { pointerEvents: "auto", ...o.style } }) });
}), nt = "DialogContent", kc = i.forwardRef((e, t) => {
  const n = Ac(nt, e.__scopeDialog), { forceMount: o = n.forceMount, ...r } = e, s = xe(nt, e.__scopeDialog);
  return h.jsx(Nn, { present: o || s.open, children: s.modal ? h.jsx(qm, { ...r, ref: t }) : h.jsx(Zm, { ...r, ref: t }) });
});
kc.displayName = nt;
var qm = i.forwardRef((e, t) => {
  const n = xe(nt, e.__scopeDialog), o = i.useRef(null), r = it(t, n.contentRef, o);
  return i.useEffect(() => {
    const s = o.current;
    if (s) return $t(s);
  }, []), h.jsx(Nc, { ...e, ref: r, trapFocus: n.open, disableOutsidePointerEvents: true, onCloseAutoFocus: He(e.onCloseAutoFocus, (s) => {
    var _a3;
    s.preventDefault(), (_a3 = n.triggerRef.current) == null ? void 0 : _a3.focus();
  }), onPointerDownOutside: He(e.onPointerDownOutside, (s) => {
    const c = s.detail.originalEvent, a = c.button === 0 && c.ctrlKey === true;
    (c.button === 2 || a) && s.preventDefault();
  }), onFocusOutside: He(e.onFocusOutside, (s) => s.preventDefault()) });
}), Zm = i.forwardRef((e, t) => {
  const n = xe(nt, e.__scopeDialog), o = i.useRef(false), r = i.useRef(false);
  return h.jsx(Nc, { ...e, ref: t, trapFocus: false, disableOutsidePointerEvents: false, onCloseAutoFocus: (s) => {
    var _a3, _b;
    (_a3 = e.onCloseAutoFocus) == null ? void 0 : _a3.call(e, s), s.defaultPrevented || (o.current || ((_b = n.triggerRef.current) == null ? void 0 : _b.focus()), s.preventDefault()), o.current = false, r.current = false;
  }, onInteractOutside: (s) => {
    var _a3, _b;
    (_a3 = e.onInteractOutside) == null ? void 0 : _a3.call(e, s), s.defaultPrevented || (o.current = true, s.detail.originalEvent.type === "pointerdown" && (r.current = true));
    const c = s.target;
    ((_b = n.triggerRef.current) == null ? void 0 : _b.contains(c)) && s.preventDefault(), s.detail.originalEvent.type === "focusin" && r.current && s.preventDefault();
  } });
}), Nc = i.forwardRef((e, t) => {
  const { __scopeDialog: n, trapFocus: o, onOpenAutoFocus: r, onCloseAutoFocus: s, ...c } = e, a = xe(nt, n), l = i.useRef(null), u = it(t, l);
  return Hm(), h.jsxs(h.Fragment, { children: [h.jsx(Sc, { asChild: true, loop: true, trapped: o, onMountAutoFocus: r, onUnmountAutoFocus: s, children: h.jsx(Rc, { role: "dialog", id: a.contentId, "aria-describedby": a.descriptionId, "aria-labelledby": a.titleId, "data-state": xr(a.open), ...c, ref: u, onDismiss: () => a.onOpenChange(false) }) }), h.jsxs(h.Fragment, { children: [h.jsx(th, { titleId: a.titleId }), h.jsx(oh, { contentRef: l, descriptionId: a.descriptionId })] })] });
}), br = "DialogTitle", Qm = i.forwardRef((e, t) => {
  const { __scopeDialog: n, ...o } = e, r = xe(br, n);
  return h.jsx(je.h2, { id: r.titleId, ...o, ref: t });
});
Qm.displayName = br;
var $c = "DialogDescription", Jm = i.forwardRef((e, t) => {
  const { __scopeDialog: n, ...o } = e, r = xe($c, n);
  return h.jsx(je.p, { id: r.descriptionId, ...o, ref: t });
});
Jm.displayName = $c;
var Lc = "DialogClose", eh = i.forwardRef((e, t) => {
  const { __scopeDialog: n, ...o } = e, r = xe(Lc, n);
  return h.jsx(je.button, { type: "button", ...o, ref: t, onClick: He(e.onClick, () => r.onOpenChange(false)) });
});
eh.displayName = Lc;
function xr(e) {
  return e ? "open" : "closed";
}
var jc = "DialogTitleWarning", [Fv, Bc] = im(jc, { contentName: nt, titleName: br, docsSlug: "dialog" }), th = ({ titleId: e }) => {
  const t = Bc(jc), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return i.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, nh = "DialogDescriptionWarning", oh = ({ contentRef: e, descriptionId: t }) => {
  const o = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Bc(nh).contentName}}.`;
  return i.useEffect(() => {
    var _a3;
    const r = (_a3 = e.current) == null ? void 0 : _a3.getAttribute("aria-describedby");
    t && r && (document.getElementById(t) || console.warn(o));
  }, [o, e, t]), null;
}, kv = Oc, Nv = Mc, $v = Fc, Lv = kc, rh = /* @__PURE__ */ Symbol.for("react.lazy"), fn = $e[" use ".trim().toString()];
function sh(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function Vc(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === rh && "_payload" in e && sh(e._payload);
}
function ih(e) {
  const t = ch(e), n = i.forwardRef((o, r) => {
    let { children: s, ...c } = o;
    Vc(s) && typeof fn == "function" && (s = fn(s._payload));
    const a = i.Children.toArray(s), l = a.find(lh);
    if (l) {
      const u = l.props.children, p = a.map((d) => d === l ? i.Children.count(u) > 1 ? i.Children.only(null) : i.isValidElement(u) ? u.props.children : null : d);
      return h.jsx(t, { ...c, ref: r, children: i.isValidElement(u) ? i.cloneElement(u, void 0, p) : null });
    }
    return h.jsx(t, { ...c, ref: r, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
function ch(e) {
  const t = i.forwardRef((n, o) => {
    let { children: r, ...s } = n;
    if (Vc(r) && typeof fn == "function" && (r = fn(r._payload)), i.isValidElement(r)) {
      const c = dh(r), a = uh(s, r.props);
      return r.type !== i.Fragment && (a.ref = o ? gr(o, c) : c), i.cloneElement(r, a);
    }
    return i.Children.count(r) > 1 ? i.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var ah = /* @__PURE__ */ Symbol("radix.slottable");
function lh(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ah;
}
function uh(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...a) => {
      const l = s(...a);
      return r(...a), l;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function dh(e) {
  var _a3, _b;
  let t = (_a3 = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : _a3.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (_b = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : _b.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var fh = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"], jv = fh.reduce((e, t) => {
  const n = ih(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: c, ...a } = r, l = c ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = true), h.jsx(l, { ...a, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
export {
  Sv as $,
  Mv as A,
  zh as B,
  Lv as C,
  vh as D,
  qh as E,
  Yh as F,
  ov as G,
  rv as H,
  Lh as I,
  sv as J,
  bv as K,
  Xh as L,
  xv as M,
  wh as N,
  $v as O,
  jv as P,
  Qh as Q,
  kv as R,
  jh as S,
  Ov as T,
  ev as U,
  tv as V,
  gh as W,
  Jh as X,
  Ev as Y,
  Rv as Z,
  Pv as _,
  Nv as a,
  Vh as a0,
  Wh as a1,
  Uh as a2,
  Hh as a3,
  Gh as a4,
  Ph as a5,
  Sh as a6,
  _v as b,
  gr as c,
  Tv as d,
  Dv as e,
  Av as f,
  Ch as g,
  yh as h,
  bh as i,
  xh as j,
  Eh as k,
  Fh as l,
  kh as m,
  Nh as n,
  $h as o,
  cv as p,
  av as q,
  lv as r,
  uv as s,
  dv as t,
  Jn as u,
  fv as v,
  pv as w,
  vv as x,
  Cv as y,
  gv as z
};
