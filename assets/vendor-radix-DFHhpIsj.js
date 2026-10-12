var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _e, _a;
import { r as i, $ as et, j as b, a as mt, R as ye } from "./vendor-react-ChQ1w2We.js";
import { a as Ue, b as Gr, c as wc } from "./vendor-aws-DKtg11UV.js";
var yc = Object.defineProperty, yo = (e, t) => yc(e, "name", { value: t, configurable: true });
function Xn(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
yo(Xn, "setRef");
function Hr(...e) {
  return (t) => {
    let n = false;
    const o = e.map((r) => {
      const s = Xn(r, t);
      return !n && typeof s == "function" && (n = true), s;
    });
    if (n) return () => {
      for (let r = 0; r < o.length; r++) {
        const s = o[r];
        typeof s == "function" ? s() : Xn(e[r], null);
      }
    };
  };
}
yo(Hr, "composeRefs");
function B(...e) {
  return i.useCallback(Hr(...e), e);
}
yo(B, "useComposedRefs");
var Rc = Object.defineProperty, xe = (e, t) => Rc(e, "name", { value: t, configurable: true });
function Se(e) {
  const t = i.forwardRef((n, o) => {
    let { children: r, ...s } = n, c = null, a = false;
    const l = [];
    qn(r) && typeof Gt == "function" && (r = Gt(r._payload)), i.Children.forEach(r, (f) => {
      var _a3;
      if (Xr(f)) {
        a = true;
        const m = f;
        let h = "child" in m.props ? m.props.child : m.props.children;
        qn(h) && typeof Gt == "function" && (h = Gt(h._payload)), c = Sc(m, h), l.push((_a3 = c == null ? void 0 : c.props) == null ? void 0 : _a3.children);
      } else l.push(f);
    }), c ? c = i.cloneElement(c, void 0, l) : !a && i.Children.count(r) === 1 && i.isValidElement(r) && (c = r);
    const u = c ? Yr(c) : void 0, p = B(o, u);
    if (!c) {
      if (r || r === 0) throw new Error(a ? Ic(e) : Pc(e));
      return r;
    }
    const d = zr(s, c.props ?? {});
    return c.type !== i.Fragment && (d.ref = o ? p : u), i.cloneElement(c, d);
  });
  return t.displayName = `${e}.Slot`, t;
}
xe(Se, "createSlot");
var Wr = /* @__PURE__ */ Symbol.for("radix.slottable");
function Kr(e) {
  const t = xe((n) => "child" in n ? n.children(n.child) : n.children, "Slottable");
  return t.displayName = `${e}.Slottable`, t.__radixId = Wr, t;
}
xe(Kr, "createSlottable");
var Sc = xe((e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return i.isValidElement(n) ? i.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return i.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function zr(e, t) {
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
xe(zr, "mergeProps");
function Yr(e) {
  var _a3, _b;
  let t = (_a3 = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : _a3.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (_b = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : _b.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
xe(Yr, "getElementRef");
function Xr(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Wr;
}
xe(Xr, "isSlottable");
var Ec = /* @__PURE__ */ Symbol.for("react.lazy");
function qn(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Ec && "_payload" in e && qr(e._payload);
}
xe(qn, "isLazyComponent");
function qr(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
xe(qr, "isPromiseLike");
var Pc = xe((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), Ic = xe((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Gt = et[" use ".trim().toString()], _c = Object.defineProperty, Tc = (e, t) => _c(e, "name", { value: t, configurable: true }), Ac = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"], j = Ac.reduce((e, t) => {
  const n = Se(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: c, ...a } = r, l = c ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = true), b.jsx(l, { ...a, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function Ro(e, t) {
  e && mt.flushSync(() => e.dispatchEvent(t));
}
Tc(Ro, "dispatchDiscreteCustomEvent");
var Mc = Object.defineProperty, Oc = (e, t) => Mc(e, "name", { value: t, configurable: true }), Zr = Object.freeze({ position: "absolute", border: 0, width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", wordWrap: "normal" }), $c = i.forwardRef(Oc(function(t, n) {
  return b.jsx(j.span, { ...t, ref: n, style: { ...Zr, ...t.style } });
}, "VisuallyHidden")), Dc = $c, Fc = Object.defineProperty, ge = (e, t) => Fc(e, "name", { value: t, configurable: true });
function kc(e, t) {
  const n = i.createContext(t);
  n.displayName = e + "Context";
  const o = ge((s) => {
    const { children: c, ...a } = s, l = i.useMemo(() => a, Object.values(a));
    return b.jsx(n.Provider, { value: l, children: c });
  }, "Provider");
  o.displayName = e + "Provider";
  function r(s, c = {}) {
    const { optional: a = false } = c, l = i.useContext(n);
    if (l) return l;
    if (t !== void 0) return t;
    if (!a) throw new Error(`\`${s}\` must be used within \`${e}\``);
  }
  return ge(r, "useContext"), [o, r];
}
ge(kc, "createContext");
function ne(e, t = []) {
  let n = [];
  function o(s, c) {
    const a = i.createContext(c);
    a.displayName = s + "Context";
    const l = n.length;
    n = [...n, c];
    const u = ge((d) => {
      var _a3;
      const { scope: f, children: m, ...h } = d, v = ((_a3 = f == null ? void 0 : f[e]) == null ? void 0 : _a3[l]) || a, g = i.useMemo(() => h, Object.values(h));
      return b.jsx(v.Provider, { value: g, children: m });
    }, "Provider");
    u.displayName = s + "Provider";
    function p(d, f, m = {}) {
      var _a3;
      const { optional: h = false } = m, v = ((_a3 = f == null ? void 0 : f[e]) == null ? void 0 : _a3[l]) || a, g = i.useContext(v);
      if (g) return g;
      if (c !== void 0) return c;
      if (!h) throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return ge(p, "useContext"), [u, p];
  }
  ge(o, "createContext");
  const r = ge(() => {
    const s = n.map((c) => i.createContext(c));
    return ge(function(a) {
      const l = (a == null ? void 0 : a[e]) || s;
      return i.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: l } }), [a, l]);
    }, "useScope");
  }, "createScope");
  return r.scopeName = e, [o, Qr(r, ...t)];
}
ge(ne, "createContextScope");
function Qr(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = ge(() => {
    const o = e.map((r) => ({ useScope: r(), scopeName: r.scopeName }));
    return ge(function(s) {
      const c = o.reduce((a, { useScope: l, scopeName: u }) => {
        const d = l(s)[`__scope${u}`];
        return { ...a, ...d };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: c }), [c]);
    }, "useComposedScopes");
  }, "createScope");
  return n.scopeName = t.scopeName, n;
}
ge(Qr, "composeContextScopes");
var Nc = Object.defineProperty, te = (e, t) => Nc(e, "name", { value: t, configurable: true });
function un(e) {
  const t = e + "CollectionProvider", [n, o] = ne(t), [r, s] = n(t, { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }), c = te((v) => {
    const { scope: g, children: w } = v, y = i.useRef(null), C = i.useRef(/* @__PURE__ */ new Map()).current;
    return b.jsx(r, { scope: g, itemMap: C, collectionRef: y, children: w });
  }, "CollectionProvider");
  c.displayName = t;
  const a = e + "CollectionSlot", l = Se(a), u = i.forwardRef((v, g) => {
    const { scope: w, children: y } = v, C = s(a, w), x = B(g, C.collectionRef);
    return b.jsx(l, { ref: x, children: y });
  });
  u.displayName = a;
  const p = e + "CollectionItemSlot", d = "data-radix-collection-item", f = Se(p), m = i.forwardRef((v, g) => {
    const { scope: w, children: y, ...C } = v, x = i.useRef(null), S = B(g, x), R = s(p, w);
    return i.useEffect(() => (R.itemMap.set(x, { ref: x, ...C }), () => {
      R.itemMap.delete(x);
    })), b.jsx(f, { [d]: "", ref: S, children: y });
  });
  m.displayName = p;
  function h(v) {
    const g = s(e + "CollectionConsumer", v);
    return i.useCallback(() => {
      const y = g.collectionRef.current;
      if (!y) return [];
      const C = Array.from(y.querySelectorAll(`[${d}]`));
      return Array.from(g.itemMap.values()).sort((R, E) => C.indexOf(R.ref.current) - C.indexOf(E.ref.current));
    }, [g.collectionRef, g.itemMap]);
  }
  return te(h, "useCollection"), [{ Provider: c, Slot: u, ItemSlot: m }, h, o];
}
te(un, "createCollection");
var hr = /* @__PURE__ */ new WeakMap(), kn = (_a = class extends Map {
  constructor(t) {
    super(t);
    __privateAdd(this, _e);
    __privateSet(this, _e, [...super.keys()]), hr.set(this, true);
  }
  set(t, n) {
    return hr.get(this) && (this.has(t) ? __privateGet(this, _e)[__privateGet(this, _e).indexOf(t)] = t : __privateGet(this, _e).push(t)), super.set(t, n), this;
  }
  insert(t, n, o) {
    const r = this.has(n), s = __privateGet(this, _e).length, c = So(t);
    let a = c >= 0 ? c : s + c;
    const l = a < 0 || a >= s ? -1 : a;
    if (l === this.size || r && l === this.size - 1 || l === -1) return this.set(n, o), this;
    const u = this.size + (r ? 0 : 1);
    c < 0 && a++;
    const p = [...__privateGet(this, _e)];
    let d, f = false;
    for (let m = a; m < u; m++) if (a === m) {
      let h = p[m];
      p[m] === n && (h = p[m + 1]), r && this.delete(n), d = this.get(h), this.set(n, o);
    } else {
      !f && p[m - 1] === n && (f = true);
      const h = p[f ? m : m - 1], v = d;
      d = this.get(h), this.delete(h), this.set(h, v);
    }
    return this;
  }
  with(t, n, o) {
    const r = new _a(this);
    return r.insert(t, n, o), r;
  }
  before(t) {
    const n = __privateGet(this, _e).indexOf(t) - 1;
    if (!(n < 0)) return this.entryAt(n);
  }
  setBefore(t, n, o) {
    const r = __privateGet(this, _e).indexOf(t);
    return r === -1 ? this : this.insert(r, n, o);
  }
  after(t) {
    let n = __privateGet(this, _e).indexOf(t);
    if (n = n === -1 || n === this.size - 1 ? -1 : n + 1, n !== -1) return this.entryAt(n);
  }
  setAfter(t, n, o) {
    const r = __privateGet(this, _e).indexOf(t);
    return r === -1 ? this : this.insert(r + 1, n, o);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    return __privateSet(this, _e, []), super.clear();
  }
  delete(t) {
    const n = super.delete(t);
    return n && __privateGet(this, _e).splice(__privateGet(this, _e).indexOf(t), 1), n;
  }
  deleteAt(t) {
    const n = this.keyAt(t);
    return n !== void 0 ? this.delete(n) : false;
  }
  at(t) {
    const n = Jt(__privateGet(this, _e), t);
    if (n !== void 0) return this.get(n);
  }
  entryAt(t) {
    const n = Jt(__privateGet(this, _e), t);
    if (n !== void 0) return [n, this.get(n)];
  }
  indexOf(t) {
    return __privateGet(this, _e).indexOf(t);
  }
  keyAt(t) {
    return Jt(__privateGet(this, _e), t);
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
}, _e = new WeakMap(), te(_a, "OrderedDict"), _a);
function Jt(e, t) {
  if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
  const n = Jr(e, t);
  return n === -1 ? void 0 : e[n];
}
te(Jt, "at");
function Jr(e, t) {
  const n = e.length, o = So(t), r = o >= 0 ? o : n + o;
  return r < 0 || r >= n ? -1 : r;
}
te(Jr, "toSafeIndex");
function So(e) {
  return e !== e || e === 0 ? 0 : Math.trunc(e);
}
te(So, "toSafeInteger");
function jc(e) {
  const t = e + "CollectionProvider", [n, o] = ne(t), [r, s] = n(t, { collectionElement: null, collectionRef: { current: null }, collectionRefObject: { current: null }, itemMap: new kn(), setItemMap: te(() => {
  }, "setItemMap") }), c = te(({ state: C, ...x }) => C ? b.jsx(l, { ...x, state: C }) : b.jsx(a, { ...x }), "CollectionProvider");
  c.displayName = t;
  const a = te((C) => {
    const x = g();
    return b.jsx(l, { ...C, state: x });
  }, "CollectionInit");
  a.displayName = t + "Init";
  const l = te((C) => {
    const { scope: x, children: S, state: R } = C, E = i.useRef(null), [_, A] = i.useState(null), O = B(E, A), [P, I] = R;
    return i.useEffect(() => {
      if (!_) return;
      const M = ns(() => {
      });
      return M.observe(_, { childList: true, subtree: true }), () => {
        M.disconnect();
      };
    }, [_]), b.jsx(r, { scope: x, itemMap: P, setItemMap: I, collectionRef: O, collectionRefObject: E, collectionElement: _, children: S });
  }, "CollectionProviderImpl");
  l.displayName = t + "Impl";
  const u = e + "CollectionSlot", p = Se(u), d = i.forwardRef((C, x) => {
    const { scope: S, children: R } = C, E = s(u, S), _ = B(x, E.collectionRef);
    return b.jsx(p, { ref: _, children: R });
  });
  d.displayName = u;
  const f = e + "CollectionItemSlot", m = "data-radix-collection-item", h = Se(f), v = i.forwardRef((C, x) => {
    const { scope: S, children: R, ...E } = C, _ = i.useRef(null), [A, O] = i.useState(null), P = B(x, _, O), I = s(f, S), { setItemMap: M } = I, D = i.useRef(E);
    es(D.current, E) || (D.current = E);
    const V = D.current;
    return i.useEffect(() => {
      const k = V;
      return M((N) => A ? N.has(A) ? N.set(A, { ...k, element: A }).toSorted(Zn) : (N.set(A, { ...k, element: A }), N.toSorted(Zn)) : N), () => {
        M((N) => !A || !N.has(A) ? N : (N.delete(A), new kn(N)));
      };
    }, [A, V, M]), b.jsx(h, { [m]: "", ref: P, children: R });
  });
  v.displayName = f;
  function g() {
    return i.useState(new kn());
  }
  te(g, "useInitCollection");
  function w(C) {
    const { itemMap: x } = s(e + "CollectionConsumer", C);
    return x;
  }
  return te(w, "useCollection"), [{ Provider: c, Slot: d, ItemSlot: v }, { createCollectionScope: o, useCollection: w, useInitCollection: g }];
}
te(jc, "createCollection");
function es(e, t) {
  if (e === t) return true;
  if (typeof e != "object" || typeof t != "object" || e == null || t == null) return false;
  const n = Object.keys(e), o = Object.keys(t);
  if (n.length !== o.length) return false;
  for (const r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || e[r] !== t[r]) return false;
  return true;
}
te(es, "shallowEqual");
function ts(e, t) {
  return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
te(ts, "isElementPreceding");
function Zn(e, t) {
  return !e[1].element || !t[1].element ? 0 : ts(e[1].element, t[1].element) ? -1 : 1;
}
te(Zn, "sortByDocumentPosition");
function ns(e) {
  return new MutationObserver((n) => {
    for (const o of n) if (o.type === "childList") {
      e();
      return;
    }
  });
}
te(ns, "getChildListObserver");
var Lc = Object.defineProperty, ht = (e, t) => Lc(e, "name", { value: t, configurable: true }), os = !!(typeof window < "u" && window.document && window.document.createElement);
function T(e, t, { checkForDefaultPrevented: n = true } = {}) {
  return ht(function(r) {
    if (e == null ? void 0 : e(r), n === false || !r || !r.defaultPrevented) return t == null ? void 0 : t(r);
  }, "handleEvent");
}
ht(T, "composeEventHandlers");
function Vc(e) {
  var _a3;
  if (!os) throw new Error("Cannot access window outside of the DOM");
  return ((_a3 = e == null ? void 0 : e.ownerDocument) == null ? void 0 : _a3.defaultView) ?? window;
}
ht(Vc, "getOwnerWindow");
function Qn(e) {
  if (!os) throw new Error("Cannot access document outside of the DOM");
  return (e == null ? void 0 : e.ownerDocument) ?? document;
}
ht(Qn, "getOwnerDocument");
function rs(e, t = false) {
  const { activeElement: n } = Qn(e);
  if (!(n == null ? void 0 : n.nodeName)) return null;
  if (ss(n) && n.contentDocument) return rs(n.contentDocument.body, t);
  if (t) {
    const o = n.getAttribute("aria-activedescendant");
    if (o) {
      const r = Qn(n).getElementById(o);
      if (r) return r;
    }
  }
  return n;
}
ht(rs, "getActiveElement");
function ss(e) {
  return e.tagName === "IFRAME";
}
ht(ss, "isFrame");
var Q = (globalThis == null ? void 0 : globalThis.document) ? i.useLayoutEffect : () => {
}, Bc = Object.defineProperty, Uc = (e, t) => Bc(e, "name", { value: t, configurable: true }), vr = et[" useEffectEvent ".trim().toString()], gr = et[" useInsertionEffect ".trim().toString()];
function is(e) {
  if (typeof vr == "function") return vr(e);
  const t = i.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof gr == "function" ? gr(() => {
    t.current = e;
  }) : Q(() => {
    t.current = e;
  }), i.useMemo(() => ((...n) => {
    var _a3;
    return (_a3 = t.current) == null ? void 0 : _a3.call(t, ...n);
  }), []);
}
Uc(is, "useEffectEvent");
var Gc = Object.defineProperty, Mt = (e, t) => Gc(e, "name", { value: t, configurable: true }), Hc = et[" useInsertionEffect ".trim().toString()] || Q;
function fe({ prop: e, defaultProp: t, onChange: n = Mt(() => {
}, "onChange"), caller: o }) {
  const [r, s, c] = cs({ defaultProp: t, onChange: n }), a = e !== void 0, l = a ? e : r, u = i.useCallback((p) => {
    var _a3;
    if (a) {
      const d = as(p) ? p(e) : p;
      d !== e && ((_a3 = c.current) == null ? void 0 : _a3.call(c, d));
    } else s(p);
  }, [a, e, s, c]);
  return [l, u];
}
Mt(fe, "useControllableState");
function cs({ defaultProp: e, onChange: t }) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return Hc(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    var _a3;
    r.current !== n && ((_a3 = s.current) == null ? void 0 : _a3.call(s, n), r.current = n);
  }, [n, r]), [n, o, s];
}
Mt(cs, "useUncontrolledState");
function as(e) {
  return typeof e == "function";
}
Mt(as, "isFunction");
var br = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function Wc(e, t, n, o) {
  const { prop: r, defaultProp: s, onChange: c, caller: a } = t, l = r !== void 0, u = is(c), p = [{ ...n, state: s }];
  o && p.push(o);
  const [d, f] = i.useReducer((g, w) => {
    if (w.type === br) return { ...g, state: w.state };
    const y = e(g, w);
    return l && !Object.is(y.state, g.state) && u(y.state), y;
  }, ...p), m = d.state, h = i.useRef(m);
  i.useEffect(() => {
    h.current !== m && (h.current = m, l || u(m));
  }, [m, h, l]);
  const v = i.useMemo(() => r !== void 0 ? { ...d, state: r } : d, [d, r]);
  return i.useEffect(() => {
    l && !Object.is(r, d.state) && f({ type: br, state: r });
  }, [r, d.state, l]), [v, f];
}
Mt(Wc, "useControllableStateReducer");
var Kc = Object.defineProperty, Ne = (e, t) => Kc(e, "name", { value: t, configurable: true });
function ls(e, t) {
  return i.useReducer((n, o) => t[n][o] ?? n, e);
}
Ne(ls, "useStateMachine");
var pe = Ne((e) => {
  const { present: t, children: n } = e, o = us(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = ds(o.ref, fs(r));
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
}, "Presence");
function us(e) {
  const [t, n] = i.useState(), o = i.useRef(null), r = i.useRef(e), s = i.useRef("none"), c = i.useRef(void 0), a = e ? "mounted" : "unmounted", [l, u] = ls(a, { mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" }, unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" }, unmounted: { MOUNT: "mounted" } });
  return i.useEffect(() => {
    l === "mounted" ? (s.current = c.current ?? lt(o.current), c.current = void 0) : s.current = "none";
  }, [l]), Q(() => {
    const p = o.current, d = r.current;
    if (d !== e) {
      const m = s.current, h = lt(p);
      e ? (c.current = h, u("MOUNT")) : h === "none" || (p == null ? void 0 : p.display) === "none" ? u("UNMOUNT") : u(d && m !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, u]), Q(() => {
    if (t) {
      let p;
      const d = t.ownerDocument.defaultView ?? window, f = Ne((h) => {
        const g = lt(o.current).includes(CSS.escape(h.animationName));
        if (h.target === t && g && (u("ANIMATION_END"), !r.current)) {
          const w = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", p = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = w);
          });
        }
      }, "handleAnimationEnd"), m = Ne((h) => {
        h.target === t && (s.current = lt(o.current));
      }, "handleAnimationStart");
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
        d.clearTimeout(p), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f);
      };
    } else u("ANIMATION_END");
  }, [t, u]), { isPresent: ["mounted", "unmountSuspended"].includes(l), ref: i.useCallback((p) => {
    if (p) {
      const d = getComputedStyle(p);
      o.current = d, c.current = lt(d);
    } else o.current = null;
    n(p);
  }, []) };
}
Ne(us, "usePresence");
function Jn(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
Ne(Jn, "setRef");
function ds(...e) {
  const t = i.useRef(e);
  return t.current = e, i.useCallback((n) => {
    const o = t.current;
    let r = false;
    const s = o.map((c) => {
      const a = Jn(c, n);
      return !r && typeof a == "function" && (r = true), a;
    });
    if (r) return () => {
      for (let c = 0; c < s.length; c++) {
        const a = s[c];
        typeof a == "function" ? a() : Jn(o[c], null);
      }
    };
  }, []);
}
Ne(ds, "useStableComposedRefs");
function lt(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
Ne(lt, "getAnimationName");
function fs(e) {
  var _a3, _b;
  let t = (_a3 = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : _a3.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (_b = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : _b.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Ne(fs, "getElementRef");
var zc = Object.defineProperty, Yc = (e, t) => zc(e, "name", { value: t, configurable: true }), Xc = et[" useId ".trim().toString()] || (() => {
}), qc = 0;
function de(e) {
  const [t, n] = i.useState(Xc());
  return Q(() => {
    e || n((o) => o ?? String(qc++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
Yc(de, "useId");
var Zc = Object.defineProperty, Qc = (e, t) => Zc(e, "name", { value: t, configurable: true }), Jc = i.createContext(void 0);
function vt(e) {
  const t = i.useContext(Jc);
  return e || t || "ltr";
}
Qc(vt, "useDirection");
var ea = Object.defineProperty, ta = (e, t) => ea(e, "name", { value: t, configurable: true });
function be(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => ((...n) => {
    var _a3;
    return (_a3 = t.current) == null ? void 0 : _a3.call(t, ...n);
  }), []);
}
ta(be, "useCallbackRef");
var na = Object.defineProperty, ee = (e, t) => na(e, "name", { value: t, configurable: true }), eo = "dismissableLayer.update", oa = "dismissableLayer.pointerDownOutside", ra = "dismissableLayer.focusOutside", Cr, ps = i.createContext({ layers: /* @__PURE__ */ new Set(), layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(), branches: /* @__PURE__ */ new Set(), dismissableSurfaces: /* @__PURE__ */ new Set() }), Ot = i.forwardRef(ee(function(t, n) {
  const { disableOutsidePointerEvents: o = false, deferPointerDownOutside: r = false, onEscapeKeyDown: s, onPointerDownOutside: c, onFocusOutside: a, onInteractOutside: l, onDismiss: u, ...p } = t, d = i.useContext(ps), [f, m] = i.useState(null), h = (f == null ? void 0 : f.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, v] = i.useState({}), g = B(n, m), w = Array.from(d.layers), [y] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), C = y ? w.indexOf(y) : -1, x = f ? w.indexOf(f) : -1, S = d.layersWithOutsidePointerEventsDisabled.size > 0, R = x >= C, E = i.useRef(false), _ = hs((I) => {
    c == null ? void 0 : c(I), l == null ? void 0 : l(I), I.defaultPrevented || (u == null ? void 0 : u());
  }, { ownerDocument: h, deferPointerDownOutside: r, isDeferredPointerDownOutsideRef: E, dismissableSurfaces: d.dismissableSurfaces, shouldHandlePointerDownOutside: i.useCallback((I) => {
    if (!(I instanceof Node)) return false;
    const M = [...d.branches].some((D) => D.contains(I));
    return R && !M;
  }, [d.branches, R]) }), A = vs((I) => {
    if (r && E.current) return;
    const M = I.target;
    [...d.branches].some((V) => V.contains(M)) || (a == null ? void 0 : a(I), l == null ? void 0 : l(I), I.defaultPrevented || (u == null ? void 0 : u()));
  }, h), O = f ? x === w.length - 1 : false, P = be((I) => {
    I.key === "Escape" && (s == null ? void 0 : s(I), !I.defaultPrevented && u && (I.preventDefault(), u()));
  });
  return i.useEffect(() => {
    if (O) return h.addEventListener("keydown", P, { capture: true }), () => h.removeEventListener("keydown", P, { capture: true });
  }, [h, O, P]), i.useEffect(() => {
    if (f) return o && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (Cr = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), to(), () => {
      o && (d.layersWithOutsidePointerEventsDisabled.delete(f), d.layersWithOutsidePointerEventsDisabled.size === 0 && (h.body.style.pointerEvents = Cr));
    };
  }, [f, h, o, d]), i.useEffect(() => () => {
    f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), to());
  }, [f, d]), i.useEffect(() => {
    const I = ee(() => v({}), "handleUpdate");
    return document.addEventListener(eo, I), () => document.removeEventListener(eo, I);
  }, []), b.jsx(j.div, { ...p, ref: g, style: { pointerEvents: S ? R ? "auto" : "none" : void 0, ...t.style }, onFocusCapture: T(t.onFocusCapture, A.onFocusCapture), onBlurCapture: T(t.onBlurCapture, A.onBlurCapture), onPointerDownCapture: T(t.onPointerDownCapture, _.onPointerDownCapture) });
}, "DismissableLayer"));
function ms() {
  const e = i.useContext(ps), [t, n] = i.useState(null);
  return i.useEffect(() => {
    if (t) return e.dismissableSurfaces.add(t), () => {
      e.dismissableSurfaces.delete(t);
    };
  }, [t, e.dismissableSurfaces]), n;
}
ee(ms, "useDismissableLayerSurface");
var sa = ee(() => true, "IS_TRUE");
function hs(e, t) {
  const { ownerDocument: n = globalThis == null ? void 0 : globalThis.document, deferPointerDownOutside: o = false, isDeferredPointerDownOutsideRef: r, dismissableSurfaces: s, shouldHandlePointerDownOutside: c = sa } = t, a = be(e), l = i.useRef(false), u = i.useRef(false), p = i.useRef(/* @__PURE__ */ new Map()), d = i.useRef(() => {
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
    function h(C) {
      if (!u.current) return;
      const x = C.target;
      x instanceof Node && [...s].some((R) => R.contains(x)) || p.current.set(C.type, true), C.type === "click" && window.setTimeout(() => {
        u.current && d.current();
      }, 0);
    }
    ee(h, "handleInteractionCapture");
    function v(C) {
      u.current && p.current.set(C.type, false);
    }
    ee(v, "handleInteractionBubble");
    const g = ee((C) => {
      if (C.target && !l.current) {
        let x = function() {
          n.removeEventListener("click", d.current);
          const R = m();
          f(), R || Eo(oa, a, S, { discrete: true });
        };
        if (ee(x, "handleAndDispatchPointerDownOutsideEvent"), !c(C.target)) {
          n.removeEventListener("click", d.current), f(), l.current = false;
          return;
        }
        const S = { originalEvent: C };
        u.current = true, r.current = o && C.button === 0, p.current.clear(), !o || C.button !== 0 ? x() : (n.removeEventListener("click", d.current), d.current = x, n.addEventListener("click", d.current, { once: true }));
      } else n.removeEventListener("click", d.current), f();
      l.current = false;
    }, "handlePointerDown"), w = ["pointerup", "mousedown", "mouseup", "touchstart", "touchend", "click"];
    for (const C of w) n.addEventListener(C, h, true), n.addEventListener(C, v);
    const y = window.setTimeout(() => {
      n.addEventListener("pointerdown", g);
    }, 0);
    return () => {
      window.clearTimeout(y), n.removeEventListener("pointerdown", g), n.removeEventListener("click", d.current);
      for (const C of w) n.removeEventListener(C, h, true), n.removeEventListener(C, v);
    };
  }, [n, a, o, r, s, c]), { onPointerDownCapture: ee(() => l.current = true, "onPointerDownCapture") };
}
ee(hs, "usePointerDownOutside");
function vs(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = be(e), o = i.useRef(false);
  return i.useEffect(() => {
    const r = ee((s) => {
      s.target && !o.current && Eo(ra, n, { originalEvent: s }, { discrete: false });
    }, "handleFocus");
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), { onFocusCapture: ee(() => o.current = true, "onFocusCapture"), onBlurCapture: ee(() => o.current = false, "onBlurCapture") };
}
ee(vs, "useFocusOutside");
function to() {
  const e = new CustomEvent(eo);
  document.dispatchEvent(e);
}
ee(to, "dispatchUpdate");
function Eo(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: false, cancelable: true, detail: n });
  t && r.addEventListener(e, t, { once: true }), o ? Ro(r, s) : r.dispatchEvent(s);
}
ee(Eo, "handleAndDispatchCustomEvent");
var ia = Object.defineProperty, ce = (e, t) => ia(e, "name", { value: t, configurable: true }), Nn = "focusScope.autoFocusOnMount", jn = "focusScope.autoFocusOnUnmount", xr = { bubbles: false, cancelable: true }, dn = i.forwardRef(ce(function(t, n) {
  const { loop: o = false, trapped: r = false, onMountAutoFocus: s, onUnmountAutoFocus: c, ...a } = t, [l, u] = i.useState(null), p = be(s), d = be(c), f = i.useRef(null), m = B(n, u), h = i.useRef({ paused: false, pause() {
    this.paused = true;
  }, resume() {
    this.paused = false;
  } }).current;
  i.useEffect(() => {
    if (r) {
      let g = function(x) {
        if (h.paused || !l) return;
        const S = x.target;
        l.contains(S) ? f.current = S : Ae(f.current, { select: true });
      }, w = function(x) {
        if (h.paused || !l) return;
        const S = x.relatedTarget;
        S !== null && (l.contains(S) || Ae(f.current, { select: true }));
      }, y = function(x) {
        if (document.activeElement === document.body) for (const R of x) R.removedNodes.length > 0 && Ae(l);
      };
      ce(g, "handleFocusIn"), ce(w, "handleFocusOut"), ce(y, "handleMutations"), document.addEventListener("focusin", g), document.addEventListener("focusout", w);
      const C = new MutationObserver(y);
      return l && C.observe(l, { childList: true, subtree: true }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", w), C.disconnect();
      };
    }
  }, [r, l, h.paused]), i.useEffect(() => {
    if (l) {
      wr.add(h);
      const g = document.activeElement;
      if (!l.contains(g)) {
        const y = new CustomEvent(Nn, xr);
        l.addEventListener(Nn, p), l.dispatchEvent(y), y.defaultPrevented || (gs(ys(Po(l)), { select: true }), document.activeElement === g && Ae(l));
      }
      return () => {
        l.removeEventListener(Nn, p), setTimeout(() => {
          const y = new CustomEvent(jn, xr);
          l.addEventListener(jn, d), l.dispatchEvent(y), y.defaultPrevented || Ae(g ?? document.body, { select: true }), l.removeEventListener(jn, d), wr.remove(h);
        }, 0);
      };
    }
  }, [l, p, d, h]);
  const v = i.useCallback((g) => {
    if (!o && !r || h.paused) return;
    const w = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, y = document.activeElement;
    if (w && y) {
      const C = g.currentTarget, [x, S] = bs(C);
      x && S ? !g.shiftKey && y === S ? (g.preventDefault(), o && Ae(x, { select: true })) : g.shiftKey && y === x && (g.preventDefault(), o && Ae(S, { select: true })) : y === C && g.preventDefault();
    }
  }, [o, r, h.paused]);
  return b.jsx(j.div, { tabIndex: -1, ...a, ref: m, onKeyDown: v });
}, "FocusScope"));
function gs(e, { select: t = false } = {}) {
  const n = document.activeElement;
  for (const o of e) if (Ae(o, { select: t }), document.activeElement !== n) return;
}
ce(gs, "focusFirst");
function bs(e) {
  const t = Po(e), n = no(t, e), o = no(t.reverse(), e);
  return [n, o];
}
ce(bs, "getTabbableEdges");
function Po(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: ce((o) => {
    const r = o.tagName === "INPUT" && o.type === "hidden";
    return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  }, "acceptNode") });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
ce(Po, "getTabbableCandidates");
function no(e, t) {
  const n = typeof t.checkVisibility == "function" && t.checkVisibility({ checkVisibilityCSS: true });
  for (const o of e) if (!(n ? !o.checkVisibility({ checkVisibilityCSS: true }) : Cs(o, { upTo: t }))) return o;
}
ce(no, "findVisible");
function Cs(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return true;
  for (; e; ) {
    if (t !== void 0 && e === t) return false;
    if (getComputedStyle(e).display === "none") return true;
    e = e.parentElement;
  }
  return false;
}
ce(Cs, "isHidden");
function xs(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
ce(xs, "isSelectableInput");
function Ae(e, { select: t = false } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: true }), e !== n && xs(e) && t && e.select();
  }
}
ce(Ae, "focus");
var wr = ws();
function ws() {
  let e = [];
  return { add(t) {
    const n = e[0];
    t !== n && (n == null ? void 0 : n.pause()), e = oo(e, t), e.unshift(t);
  }, remove(t) {
    var _a3;
    e = oo(e, t), (_a3 = e[0]) == null ? void 0 : _a3.resume();
  } };
}
ce(ws, "createFocusScopesStack");
function oo(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
ce(oo, "arrayRemove");
function ys(e) {
  return e.filter((t) => t.tagName !== "A");
}
ce(ys, "removeLinks");
var ca = Object.defineProperty, aa = (e, t) => ca(e, "name", { value: t, configurable: true }), $t = i.forwardRef(aa(function(t, n) {
  var _a3;
  const { container: o, ...r } = t, [s, c] = i.useState(false);
  Q(() => c(true), []);
  const a = o || s && ((_a3 = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a3.body);
  return a ? mt.createPortal(b.jsx(j.div, { ...r, ref: n }), a) : null;
}, "Portal")), la = Object.defineProperty, Io = (e, t) => la(e, "name", { value: t, configurable: true }), Ht = 0, st = null;
function ua(e) {
  return gt(), e.children;
}
Io(ua, "FocusGuards");
function gt() {
  i.useEffect(() => {
    st || (st = { start: ro(), end: ro() });
    const { start: e, end: t } = st;
    return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), Ht++, () => {
      Ht === 1 && (st == null ? void 0 : st.start.remove(), st == null ? void 0 : st.end.remove(), st = null), Ht = Math.max(0, Ht - 1);
    };
  }, []);
}
Io(gt, "useFocusGuards");
function ro() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
Io(ro, "createFocusGuard");
var en = "right-scroll-bar-position", tn = "width-before-scroll-bar", da = "with-scroll-bars-hidden", fa = "--removed-body-scroll-bar-size";
function Ln(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function pa(e, t) {
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
var ma = typeof window < "u" ? i.useLayoutEffect : i.useEffect, yr = /* @__PURE__ */ new WeakMap();
function ha(e, t) {
  var n = pa(null, function(o) {
    return e.forEach(function(r) {
      return Ln(r, o);
    });
  });
  return ma(function() {
    var o = yr.get(n);
    if (o) {
      var r = new Set(o), s = new Set(e), c = n.current;
      r.forEach(function(a) {
        s.has(a) || Ln(a, null);
      }), s.forEach(function(a) {
        r.has(a) || Ln(a, c);
      });
    }
    yr.set(n, e);
  }, [e]), n;
}
function va(e) {
  return e;
}
function ga(e, t) {
  t === void 0 && (t = va);
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
function ba(e) {
  e === void 0 && (e = {});
  var t = ga(null);
  return t.options = Ue({ async: true, ssr: false }, e), t;
}
var Rs = function(e) {
  var t = e.sideCar, n = Gr(e, ["sideCar"]);
  if (!t) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o) throw new Error("Sidecar medium not found");
  return i.createElement(o, Ue({}, n));
};
Rs.isSideCarExport = true;
function Ca(e, t) {
  return e.useMedium(t), Rs;
}
var Ss = ba(), Vn = function() {
}, fn = i.forwardRef(function(e, t) {
  var n = i.useRef(null), o = i.useState({ onScrollCapture: Vn, onWheelCapture: Vn, onTouchMoveCapture: Vn }), r = o[0], s = o[1], c = e.forwardProps, a = e.children, l = e.className, u = e.removeScrollBar, p = e.enabled, d = e.shards, f = e.sideCar, m = e.noRelative, h = e.noIsolation, v = e.inert, g = e.allowPinchZoom, w = e.as, y = w === void 0 ? "div" : w, C = e.gapMode, x = Gr(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), S = f, R = ha([n, t]), E = Ue(Ue({}, x), r);
  return i.createElement(i.Fragment, null, p && i.createElement(S, { sideCar: Ss, removeScrollBar: u, shards: d, noRelative: m, noIsolation: h, inert: v, setCallbacks: s, allowPinchZoom: !!g, lockRef: n, gapMode: C }), c ? i.cloneElement(i.Children.only(a), Ue(Ue({}, E), { ref: R })) : i.createElement(y, Ue({}, E, { className: l, ref: R }), a));
});
fn.defaultProps = { enabled: true, removeScrollBar: true, inert: false };
fn.classNames = { fullWidth: tn, zeroRight: en };
var xa = function() {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function wa() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = xa();
  return t && e.setAttribute("nonce", t), e;
}
function ya(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Ra(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Sa = function() {
  var e = 0, t = null;
  return { add: function(n) {
    e == 0 && (t = wa()) && (ya(t, n), Ra(t)), e++;
  }, remove: function() {
    e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
  } };
}, Ea = function() {
  var e = Sa();
  return function(t, n) {
    i.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Es = function() {
  var e = Ea(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, Pa = { left: 0, top: 0, right: 0, gap: 0 }, Bn = function(e) {
  return parseInt(e || "", 10) || 0;
}, Ia = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Bn(n), Bn(o), Bn(r)];
}, _a2 = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u") return Pa;
  var t = Ia(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, o - n + t[2] - t[0]) };
}, Ta = Es(), ut = "data-scroll-locked", Aa = function(e, t, n, o) {
  var r = e.left, s = e.top, c = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(da, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(a, "px ").concat(o, `;
  }
  body[`).concat(ut, `] {
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
  
  .`).concat(en, ` {
    right: `).concat(a, "px ").concat(o, `;
  }
  
  .`).concat(tn, ` {
    margin-right: `).concat(a, "px ").concat(o, `;
  }
  
  .`).concat(en, " .").concat(en, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(tn, " .").concat(tn, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(ut, `] {
    `).concat(fa, ": ").concat(a, `px;
  }
`);
}, Rr = function() {
  var e = parseInt(document.body.getAttribute(ut) || "0", 10);
  return isFinite(e) ? e : 0;
}, Ma = function() {
  i.useEffect(function() {
    return document.body.setAttribute(ut, (Rr() + 1).toString()), function() {
      var e = Rr() - 1;
      e <= 0 ? document.body.removeAttribute(ut) : document.body.setAttribute(ut, e.toString());
    };
  }, []);
}, Oa = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  Ma();
  var s = i.useMemo(function() {
    return _a2(r);
  }, [r]);
  return i.createElement(Ta, { styles: Aa(s, !t, r, n ? "" : "!important") });
}, so = false;
if (typeof window < "u") try {
  var Wt = Object.defineProperty({}, "passive", { get: function() {
    return so = true, true;
  } });
  window.addEventListener("test", Wt, Wt), window.removeEventListener("test", Wt, Wt);
} catch {
  so = false;
}
var it = so ? { passive: false } : false, $a = function(e) {
  return e.tagName === "TEXTAREA";
}, Ps = function(e, t) {
  if (!(e instanceof Element)) return false;
  var n = window.getComputedStyle(e);
  return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !$a(e) && n[t] === "visible");
}, Da = function(e) {
  return Ps(e, "overflowY");
}, Fa = function(e) {
  return Ps(e, "overflowX");
}, Sr = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = Is(e, o);
    if (r) {
      var s = _s(e, o), c = s[1], a = s[2];
      if (c > a) return true;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return false;
}, ka = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [t, n, o];
}, Na = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [t, n, o];
}, Is = function(e, t) {
  return e === "v" ? Da(t) : Fa(t);
}, _s = function(e, t) {
  return e === "v" ? ka(t) : Na(t);
}, ja = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, La = function(e, t, n, o, r) {
  var s = ja(e, window.getComputedStyle(t).direction), c = s * o, a = n.target, l = t.contains(a), u = false, p = c > 0, d = 0, f = 0;
  do {
    if (!a) break;
    var m = _s(e, a), h = m[0], v = m[1], g = m[2], w = v - g - s * h;
    (h || w) && Is(e, a) && (d += w, f += h);
    var y = a.parentNode;
    a = y && y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? y.host : y;
  } while (!l && a !== document.body || l && (t.contains(a) || t === a));
  return (p && Math.abs(d) < 1 || !p && Math.abs(f) < 1) && (u = true), u;
}, Kt = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Er = function(e) {
  return [e.deltaX, e.deltaY];
}, Pr = function(e) {
  return e && "current" in e ? e.current : e;
}, Va = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Ba = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Ua = 0, ct = [];
function Ga(e) {
  var t = i.useRef([]), n = i.useRef([0, 0]), o = i.useRef(), r = i.useState(Ua++)[0], s = i.useState(Es)[0], c = i.useRef(e);
  i.useEffect(function() {
    c.current = e;
  }, [e]), i.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var v = wc([e.lockRef.current], (e.shards || []).map(Pr), true).filter(Boolean);
      return v.forEach(function(g) {
        return g.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), v.forEach(function(g) {
          return g.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = i.useCallback(function(v, g) {
    if ("touches" in v && v.touches.length === 2 || v.type === "wheel" && v.ctrlKey) return !c.current.allowPinchZoom;
    var w = Kt(v), y = n.current, C = "deltaX" in v ? v.deltaX : y[0] - w[0], x = "deltaY" in v ? v.deltaY : y[1] - w[1], S, R = v.target, E = Math.abs(C) > Math.abs(x) ? "h" : "v";
    if ("touches" in v && E === "h" && R.type === "range") return false;
    var _ = window.getSelection(), A = _ && _.anchorNode, O = A ? A === R || A.contains(R) : false;
    if (O) return false;
    var P = Sr(E, R);
    if (!P) return true;
    if (P ? S = E : (S = E === "v" ? "h" : "v", P = Sr(E, R)), !P) return false;
    if (!o.current && "changedTouches" in v && (C || x) && (o.current = S), !S) return true;
    var I = o.current || S;
    return La(I, g, v, I === "h" ? C : x);
  }, []), l = i.useCallback(function(v) {
    var g = v;
    if (!(!ct.length || ct[ct.length - 1] !== s)) {
      var w = "deltaY" in g ? Er(g) : Kt(g), y = t.current.filter(function(S) {
        return S.name === g.type && (S.target === g.target || g.target === S.shadowParent) && Va(S.delta, w);
      })[0];
      if (y && y.should) {
        g.cancelable && g.preventDefault();
        return;
      }
      if (!y) {
        var C = (c.current.shards || []).map(Pr).filter(Boolean).filter(function(S) {
          return S.contains(g.target);
        }), x = C.length > 0 ? a(g, C[0]) : !c.current.noIsolation;
        x && g.cancelable && g.preventDefault();
      }
    }
  }, []), u = i.useCallback(function(v, g, w, y) {
    var C = { name: v, delta: g, target: w, should: y, shadowParent: Ha(w) };
    t.current.push(C), setTimeout(function() {
      t.current = t.current.filter(function(x) {
        return x !== C;
      });
    }, 1);
  }, []), p = i.useCallback(function(v) {
    n.current = Kt(v), o.current = void 0;
  }, []), d = i.useCallback(function(v) {
    u(v.type, Er(v), v.target, a(v, e.lockRef.current));
  }, []), f = i.useCallback(function(v) {
    u(v.type, Kt(v), v.target, a(v, e.lockRef.current));
  }, []);
  i.useEffect(function() {
    return ct.push(s), e.setCallbacks({ onScrollCapture: d, onWheelCapture: d, onTouchMoveCapture: f }), document.addEventListener("wheel", l, it), document.addEventListener("touchmove", l, it), document.addEventListener("touchstart", p, it), function() {
      ct = ct.filter(function(v) {
        return v !== s;
      }), document.removeEventListener("wheel", l, it), document.removeEventListener("touchmove", l, it), document.removeEventListener("touchstart", p, it);
    };
  }, []);
  var m = e.removeScrollBar, h = e.inert;
  return i.createElement(i.Fragment, null, h ? i.createElement(s, { styles: Ba(r) }) : null, m ? i.createElement(Oa, { noRelative: e.noRelative, gapMode: e.gapMode }) : null);
}
function Ha(e) {
  for (var t = null; e !== null; ) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Wa = Ca(Ss, Ga);
var Dt = i.forwardRef(function(e, t) {
  return i.createElement(fn, Ue({}, e, { ref: t, sideCar: Wa }));
});
Dt.classNames = fn.classNames;
var Ka = function(e) {
  if (typeof document > "u") return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, at = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap(), Yt = {}, Un = 0, Ts = function(e) {
  return e && (e.host || Ts(e.parentNode));
}, za = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n)) return n;
    var o = Ts(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Ya = function(e, t, n, o) {
  var r = za(t, Array.isArray(e) ? e : [e]);
  Yt[n] || (Yt[n] = /* @__PURE__ */ new WeakMap());
  var s = Yt[n], c = [], a = /* @__PURE__ */ new Set(), l = new Set(r), u = function(d) {
    !d || a.has(d) || (a.add(d), u(d.parentNode));
  };
  r.forEach(u);
  var p = function(d) {
    !d || l.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (a.has(f)) p(f);
      else try {
        var m = f.getAttribute(o), h = m !== null && m !== "false", v = (at.get(f) || 0) + 1, g = (s.get(f) || 0) + 1;
        at.set(f, v), s.set(f, g), c.push(f), v === 1 && h && zt.set(f, true), g === 1 && f.setAttribute(n, "true"), h || f.setAttribute(o, "true");
      } catch (w) {
        console.error("aria-hidden: cannot operate on ", f, w);
      }
    });
  };
  return p(t), a.clear(), Un++, function() {
    c.forEach(function(d) {
      var f = at.get(d) - 1, m = s.get(d) - 1;
      at.set(d, f), s.set(d, m), f || (zt.has(d) || d.removeAttribute(o), zt.delete(d)), m || d.removeAttribute(n);
    }), Un--, Un || (at = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap(), Yt = {});
  };
}, pn = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = Ka(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), Ya(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, Xa = Object.defineProperty, me = (e, t) => Xa(e, "name", { value: t, configurable: true }), _o = "Dialog", [As, Fm] = ne(_o), [qa, we] = As(_o), km = me((e) => {
  const { __scopeDialog: t, children: n, open: o, defaultOpen: r, onOpenChange: s, modal: c = true } = e, a = i.useRef(null), l = i.useRef(null), [u, p] = fe({ prop: o, defaultProp: r ?? false, onChange: s, caller: _o }), [d, f] = i.useState(0), [m, h] = i.useState(0);
  return b.jsx(qa, { scope: t, triggerRef: a, contentRef: l, contentId: de(), titleId: de(), descriptionId: de(), titlePresent: d > 0, descriptionPresent: m > 0, setTitleCount: f, setDescriptionCount: h, open: u, onOpenChange: p, onOpenToggle: i.useCallback(() => p((v) => !v), [p]), modal: c, children: n });
}, "Dialog"), Za = "DialogTrigger", Nm = i.forwardRef(me(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = we(Za, o), c = B(n, s.triggerRef);
  return b.jsx(j.button, { type: "button", "aria-haspopup": "dialog", "aria-expanded": s.open, "aria-controls": s.open ? s.contentId : void 0, "data-state": mn(s.open), ...r, ref: c, onClick: T(t.onClick, s.onOpenToggle) });
}, "DialogTrigger")), Ms = "DialogPortal", [Qa, Os] = As(Ms, { forceMount: void 0 }), jm = me((e) => {
  const { __scopeDialog: t, forceMount: n, children: o, container: r } = e, s = we(Ms, t);
  return b.jsx(Qa, { scope: t, forceMount: n, children: i.Children.map(o, (c) => b.jsx(pe, { present: n || s.open, children: b.jsx($t, { asChild: true, container: r, children: c }) })) });
}, "DialogPortal"), io = "DialogOverlay", Lm = i.forwardRef(me(function(t, n) {
  const o = Os(io, t.__scopeDialog), { forceMount: r = o.forceMount, ...s } = t, c = we(io, t.__scopeDialog);
  return c.modal ? b.jsx(pe, { present: r || c.open, children: b.jsx(el, { ...s, ref: n }) }) : null;
}, "DialogOverlay")), Ja = Se("DialogOverlay.RemoveScroll"), el = i.forwardRef(me(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = we(io, o), c = ms(), a = B(n, c);
  return b.jsx(Dt, { as: Ja, allowPinchZoom: true, shards: [s.contentRef], children: b.jsx(j.div, { "data-state": mn(s.open), ...r, ref: a, style: { pointerEvents: "auto", ...r.style } }) });
}, "DialogOverlayImpl")), Pt = "DialogContent", Vm = i.forwardRef(me(function(t, n) {
  const o = Os(Pt, t.__scopeDialog), { forceMount: r = o.forceMount, ...s } = t, c = we(Pt, t.__scopeDialog);
  return b.jsx(pe, { present: r || c.open, children: c.modal ? b.jsx(tl, { ...s, ref: n }) : b.jsx(nl, { ...s, ref: n }) });
}, "DialogContent")), tl = i.forwardRef(me(function(t, n) {
  const o = we(Pt, t.__scopeDialog), r = i.useRef(null), s = B(n, o.contentRef, r);
  return i.useEffect(() => {
    const c = r.current;
    if (c) return pn(c);
  }, []), b.jsx($s, { ...t, ref: s, trapFocus: o.open, disableOutsidePointerEvents: o.open, onCloseAutoFocus: T(t.onCloseAutoFocus, (c) => {
    var _a3;
    c.preventDefault(), (_a3 = o.triggerRef.current) == null ? void 0 : _a3.focus();
  }), onPointerDownOutside: T(t.onPointerDownOutside, (c) => {
    const a = c.detail.originalEvent, l = a.button === 0 && a.ctrlKey === true;
    (a.button === 2 || l) && c.preventDefault();
  }), onFocusOutside: T(t.onFocusOutside, (c) => c.preventDefault()) });
}, "DialogContentModal")), nl = i.forwardRef(me(function(t, n) {
  const o = we(Pt, t.__scopeDialog), r = i.useRef(false), s = i.useRef(false);
  return b.jsx($s, { ...t, ref: n, trapFocus: false, disableOutsidePointerEvents: false, onCloseAutoFocus: (c) => {
    var _a3, _b;
    (_a3 = t.onCloseAutoFocus) == null ? void 0 : _a3.call(t, c), c.defaultPrevented || (r.current || ((_b = o.triggerRef.current) == null ? void 0 : _b.focus()), c.preventDefault()), r.current = false, s.current = false;
  }, onInteractOutside: (c) => {
    var _a3, _b;
    (_a3 = t.onInteractOutside) == null ? void 0 : _a3.call(t, c), c.defaultPrevented || (r.current = true, c.detail.originalEvent.type === "pointerdown" && (s.current = true));
    const a = c.target;
    ((_b = o.triggerRef.current) == null ? void 0 : _b.contains(a)) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && s.current && c.preventDefault();
  } });
}, "DialogContentNonModal")), $s = i.forwardRef(me(function(t, n) {
  const { __scopeDialog: o, trapFocus: r, onOpenAutoFocus: s, onCloseAutoFocus: c, ...a } = t, l = we(Pt, o);
  return gt(), b.jsx(b.Fragment, { children: b.jsx(dn, { asChild: true, loop: true, trapped: r, onMountAutoFocus: s, onUnmountAutoFocus: c, children: b.jsx(Ot, { role: "dialog", id: l.contentId, "aria-describedby": l.descriptionPresent ? l.descriptionId : void 0, "aria-labelledby": l.titlePresent ? l.titleId : void 0, "data-state": mn(l.open), ...a, ref: n, deferPointerDownOutside: true, onDismiss: () => l.onOpenChange(false) }) }) });
}, "DialogContentImpl")), ol = "DialogTitle", Bm = i.forwardRef(me(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = we(ol, o), { setTitleCount: c } = s;
  return Q(() => (c((a) => a + 1), () => c((a) => a - 1)), [c]), b.jsx(j.h2, { id: s.titleId, ...r, ref: n });
}, "DialogTitle")), rl = "DialogDescription", Um = i.forwardRef(me(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = we(rl, o), { setDescriptionCount: c } = s;
  return Q(() => (c((a) => a + 1), () => c((a) => a - 1)), [c]), b.jsx(j.p, { id: s.descriptionId, ...r, ref: n });
}, "DialogDescription")), sl = "DialogClose", Gm = i.forwardRef(me(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = we(sl, o);
  return b.jsx(j.button, { type: "button", ...r, ref: n, onClick: T(t.onClick, () => s.onOpenChange(false)) });
}, "DialogClose"));
function mn(e) {
  return e ? "open" : "closed";
}
me(mn, "getState");
var il = Object.defineProperty, cl = (e, t) => il(e, "name", { value: t, configurable: true });
function Ft(e) {
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
cl(Ft, "useSize");
var al = Object.defineProperty, je = (e, t) => al(e, "name", { value: t, configurable: true }), To = "Checkbox", [ll, Hm] = ne(To), [ul, Ao] = ll(To);
function Ds(e) {
  const { __scopeCheckbox: t, checked: n, children: o, defaultChecked: r, disabled: s, form: c, name: a, onCheckedChange: l, required: u, value: p = "on", internal_do_not_use_render: d } = e, [f, m] = fe({ prop: n, defaultProp: r ?? false, onChange: l, caller: To }), [h, v] = i.useState(null), [g, w] = i.useState(null), y = i.useRef(false), [C, x] = i.useReducer((E) => E + 1, 0), S = h ? !!c || !!h.closest("form") : true, R = { checked: f, disabled: s, setChecked: m, control: h, setControl: v, name: a, form: c, value: p, hasConsumerStoppedPropagationRef: y, userInteractionCount: C, onUserInteraction: x, required: u, defaultChecked: Me(r) ? false : r, isFormControl: S, bubbleInput: g, setBubbleInput: w };
  return b.jsx(ul, { scope: t, ...R, children: Fs(d) ? d(R) : o });
}
je(Ds, "CheckboxProvider");
var dl = "CheckboxTrigger", fl = i.forwardRef(je(function({ __scopeCheckbox: t, onKeyDown: n, onClick: o, ...r }, s) {
  const { control: c, value: a, disabled: l, checked: u, required: p, setControl: d, setChecked: f, hasConsumerStoppedPropagationRef: m, onUserInteraction: h, isFormControl: v, bubbleInput: g } = Ao(dl, t), w = B(s, d), y = i.useRef(u);
  return i.useEffect(() => {
    const C = c == null ? void 0 : c.form;
    if (C) {
      const x = je(() => f(y.current), "reset");
      return C.addEventListener("reset", x), () => C.removeEventListener("reset", x);
    }
  }, [c, f]), b.jsx(j.button, { type: "button", role: "checkbox", "aria-checked": Me(u) ? "mixed" : u, "aria-required": p, "data-state": Mo(u), "data-disabled": l ? "" : void 0, disabled: l, value: a, ...r, ref: w, onKeyDown: T(n, (C) => {
    C.key === "Enter" && C.preventDefault();
  }), onClick: T(o, (C) => {
    h(), f((x) => Me(x) ? true : !x), g && v && (m.current = C.isPropagationStopped(), m.current || C.stopPropagation());
  }) });
}, "CheckboxTrigger")), Wm = i.forwardRef(je(function(t, n) {
  const { __scopeCheckbox: o, name: r, checked: s, defaultChecked: c, required: a, disabled: l, value: u, onCheckedChange: p, form: d, ...f } = t;
  return b.jsx(Ds, { __scopeCheckbox: o, checked: s, defaultChecked: c, disabled: l, required: a, onCheckedChange: p, name: r, form: d, value: u, internal_do_not_use_render: ({ isFormControl: m }) => b.jsxs(b.Fragment, { children: [b.jsx(fl, { ...f, ref: n, __scopeCheckbox: o }), m && b.jsx(hl, { __scopeCheckbox: o })] }) });
}, "Checkbox")), pl = "CheckboxIndicator", Km = i.forwardRef(je(function(t, n) {
  const { __scopeCheckbox: o, forceMount: r, ...s } = t, c = Ao(pl, o);
  return b.jsx(pe, { present: r || Me(c.checked) || c.checked === true, children: b.jsx(j.span, { "data-state": Mo(c.checked), "data-disabled": c.disabled ? "" : void 0, ...s, ref: n, style: { pointerEvents: "none", ...t.style } }) });
}, "CheckboxIndicator")), ml = "CheckboxBubbleInput", hl = i.forwardRef(je(function({ __scopeCheckbox: t, onClick: n, ...o }, r) {
  const { control: s, hasConsumerStoppedPropagationRef: c, userInteractionCount: a, checked: l, defaultChecked: u, required: p, disabled: d, name: f, value: m, form: h, bubbleInput: v, setBubbleInput: g } = Ao(ml, t), w = B(r, g), y = Ft(s), C = i.useRef(false), x = i.useRef(l), S = i.useRef(a);
  i.useEffect(() => {
    const E = v;
    if (!E) return;
    const _ = window.HTMLInputElement.prototype, O = Object.getOwnPropertyDescriptor(_, "checked").set, P = a !== S.current;
    S.current = a;
    const I = x.current !== l;
    x.current = l;
    const M = !(P && c.current);
    if (I && O) {
      C.current = !P;
      const D = new Event("click", { bubbles: M });
      E.indeterminate = Me(l), O.call(E, Me(l) ? false : l), E.dispatchEvent(D), C.current = false;
    }
  }, [v, l, c, a]);
  const R = i.useRef(Me(l) ? false : l);
  return b.jsx(j.input, { type: "checkbox", "aria-hidden": true, defaultChecked: u ?? R.current, required: p, disabled: d, name: f, value: m, form: h, ...o, tabIndex: -1, ref: w, onClick: T(n, (E) => {
    C.current && E.stopPropagation();
  }), style: { ...o.style, ...y, position: "absolute", pointerEvents: "none", opacity: 0, margin: 0, transform: "translateX(-100%)" } });
}, "CheckboxBubbleInput"));
function Fs(e) {
  return typeof e == "function";
}
je(Fs, "isFunction");
function Me(e) {
  return e === "indeterminate";
}
je(Me, "isIndeterminate");
function Mo(e) {
  return Me(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
je(Mo, "getState");
const vl = ["top", "right", "bottom", "left"], He = Math.min, Oe = Math.max, rn = Math.round, Xt = Math.floor, $e = (e) => ({ x: e, y: e }), gl = { left: "right", right: "left", bottom: "top", top: "bottom" };
function ks(e, t, n) {
  return Oe(e, He(t, n));
}
function Le(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function We(e) {
  return e.split("-")[0];
}
function bt(e) {
  return e.split("-")[1];
}
function Oo(e) {
  return e === "x" ? "y" : "x";
}
function $o(e) {
  return e === "y" ? "height" : "width";
}
function Re(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function Do(e) {
  return Oo(Re(e));
}
function bl(e, t, n) {
  n === void 0 && (n = false);
  const o = bt(e), r = Do(e), s = $o(r);
  let c = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (c = sn(c)), [c, sn(c)];
}
function Cl(e) {
  const t = sn(e);
  return [co(e), t, co(t)];
}
function co(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const Ir = ["left", "right"], _r = ["right", "left"], xl = ["top", "bottom"], wl = ["bottom", "top"];
function yl(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? _r : Ir : t ? Ir : _r;
    case "left":
    case "right":
      return t ? xl : wl;
    default:
      return [];
  }
}
function Rl(e, t, n, o) {
  const r = bt(e);
  let s = yl(We(e), n === "start", o);
  return r && (s = s.map((c) => c + "-" + r), t && (s = s.concat(s.map(co)))), s;
}
function sn(e) {
  const t = We(e);
  return gl[t] + e.slice(t.length);
}
function Sl(e) {
  var t, n, o, r;
  return { top: (t = e.top) != null ? t : 0, right: (n = e.right) != null ? n : 0, bottom: (o = e.bottom) != null ? o : 0, left: (r = e.left) != null ? r : 0 };
}
function Ns(e) {
  return typeof e != "number" ? Sl(e) : { top: e, right: e, bottom: e, left: e };
}
function cn(e) {
  const { x: t, y: n, width: o, height: r } = e;
  return { width: o, height: r, top: n, left: t, right: t + o, bottom: n + r, x: t, y: n };
}
function Tr(e, t, n) {
  let { reference: o, floating: r } = e;
  const s = Re(t), c = Do(t), a = $o(c), l = We(t), u = s === "y", p = o.x + o.width / 2 - r.width / 2, d = o.y + o.height / 2 - r.height / 2, f = o[a] / 2 - r[a] / 2;
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
  const h = bt(t);
  return h && (m[c] += f * (h === "end" ? 1 : -1) * (n && u ? -1 : 1)), m;
}
async function El(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: o, y: r, platform: s, rects: c, elements: a, strategy: l } = e, { boundary: u = "clippingAncestors", rootBoundary: p = "viewport", elementContext: d = "floating", altBoundary: f = false, padding: m = 0 } = Le(t, e), h = Ns(m), g = a[f ? d === "floating" ? "reference" : "floating" : d], w = cn(await s.getClippingRect({ element: (n = await (s.isElement == null ? void 0 : s.isElement(g))) == null || n ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)), boundary: u, rootBoundary: p, strategy: l })), y = d === "floating" ? { x: o, y: r, width: c.floating.width, height: c.floating.height } : c.reference, C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), x = await (s.isElement == null ? void 0 : s.isElement(C)) && await (s.getScale == null ? void 0 : s.getScale(C)) || { x: 1, y: 1 }, S = cn(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({ elements: a, rect: y, offsetParent: C, strategy: l }) : y);
  return { top: (w.top - S.top + h.top) / x.y, bottom: (S.bottom - w.bottom + h.bottom) / x.y, left: (w.left - S.left + h.left) / x.x, right: (S.right - w.right + h.right) / x.x };
}
const Pl = 50, Il = async (e, t, n) => {
  const { placement: o = "bottom", strategy: r = "absolute", middleware: s = [], platform: c } = n, a = c.detectOverflow ? c : { ...c, detectOverflow: El }, l = await (c.isRTL == null ? void 0 : c.isRTL(t));
  let u = await c.getElementRects({ reference: e, floating: t, strategy: r }), { x: p, y: d } = Tr(u, o, l), f = o, m = 0;
  const h = {};
  for (let v = 0; v < s.length; v++) {
    const g = s[v];
    if (!g) continue;
    const { name: w, fn: y } = g, { x: C, y: x, data: S, reset: R } = await y({ x: p, y: d, initialPlacement: o, placement: f, strategy: r, middlewareData: h, rects: u, platform: a, elements: { reference: e, floating: t } });
    p = C ?? p, d = x ?? d, h[w] = { ...h[w], ...S }, R && m < Pl && (m++, typeof R == "object" && (R.placement && (f = R.placement), R.rects && (u = R.rects === true ? await c.getElementRects({ reference: e, floating: t, strategy: r }) : R.rects), { x: p, y: d } = Tr(u, f, l)), v = -1);
  }
  return { x: p, y: d, placement: f, strategy: r, middlewareData: h };
}, _l = (e) => ({ name: "arrow", options: e, async fn(t) {
  const { x: n, y: o, placement: r, rects: s, platform: c, elements: a, middlewareData: l } = t, { element: u, padding: p = 0 } = Le(e, t) || {};
  if (u == null) return {};
  const d = Ns(p), f = { x: n, y: o }, m = Do(r), h = $o(m), v = await c.getDimensions(u), g = m === "y", w = g ? "top" : "left", y = g ? "bottom" : "right", C = g ? "clientHeight" : "clientWidth", x = s.reference[h] + s.reference[m] - f[m] - s.floating[h], S = f[m] - s.reference[m], R = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(u));
  let E = R ? R[C] : 0;
  (!E || !await (c.isElement == null ? void 0 : c.isElement(R))) && (E = a.floating[C] || s.floating[h]);
  const _ = x / 2 - S / 2, A = E / 2 - v[h] / 2 - 1, O = He(d[w], A), P = He(d[y], A), I = E - v[h] - P, M = E / 2 - v[h] / 2 + _, D = ks(O, M, I), V = !l.arrow && bt(r) != null && M !== D && s.reference[h] / 2 - (M < O ? O : P) - v[h] / 2 < 0, k = V ? M < O ? M - O : M - I : 0;
  return { [m]: f[m] + k, data: { [m]: D, centerOffset: M - D - k, ...V && { alignmentOffset: k } }, reset: V };
} }), Tl = function(e) {
  return e === void 0 && (e = {}), { name: "flip", options: e, async fn(t) {
    var n, o;
    const { placement: r, middlewareData: s, rects: c, initialPlacement: a, platform: l, elements: u } = t, { mainAxis: p = true, crossAxis: d = true, fallbackPlacements: f, fallbackStrategy: m = "bestFit", fallbackAxisSideDirection: h = "none", flipAlignment: v = true, ...g } = Le(e, t);
    if ((n = s.arrow) != null && n.alignmentOffset) return {};
    const w = We(r), y = Re(a), C = We(a) === a, x = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), S = f || (C || !v ? [sn(a)] : Cl(a)), R = h !== "none";
    !f && R && S.push(...Rl(a, v, h, x));
    const E = [a, ...S], _ = await l.detectOverflow(t, g), A = [];
    let O = ((o = s.flip) == null ? void 0 : o.overflows) || [];
    if (p && A.push(_[w]), d) {
      const D = bl(r, c, x);
      A.push(_[D[0]], _[D[1]]);
    }
    if (O = [...O, { placement: r, overflows: A }], !A.every((D) => D <= 0)) {
      var P, I;
      const D = (((P = s.flip) == null ? void 0 : P.index) || 0) + 1, V = E[D];
      if (V && (!(d === "alignment" ? y !== Re(V) : false) || O.every((L) => Re(L.placement) === y ? L.overflows[0] > 0 : true))) return { data: { index: D, overflows: O }, reset: { placement: V } };
      let k = (I = O.filter((N) => N.overflows[0] <= 0).sort((N, L) => N.overflows[1] - L.overflows[1])[0]) == null ? void 0 : I.placement;
      if (!k) switch (m) {
        case "bestFit": {
          var M;
          const N = (M = O.filter((L) => {
            if (R) {
              const U = Re(L.placement);
              return U === y || U === "y";
            }
            return true;
          }).map((L) => [L.placement, L.overflows.filter((U) => U > 0).reduce((U, $) => U + $, 0)]).sort((L, U) => L[1] - U[1])[0]) == null ? void 0 : M[0];
          N && (k = N);
          break;
        }
        case "initialPlacement":
          k = a;
          break;
      }
      if (r !== k) return { reset: { placement: k } };
    }
    return {};
  } };
};
function Ar(e, t) {
  return { top: e.top - t.height, right: e.right - t.width, bottom: e.bottom - t.height, left: e.left - t.width };
}
function Mr(e) {
  return vl.some((t) => e[t] >= 0);
}
const Al = function(e) {
  return e === void 0 && (e = {}), { name: "hide", options: e, async fn(t) {
    const { rects: n, platform: o } = t, { strategy: r = "referenceHidden", ...s } = Le(e, t);
    switch (r) {
      case "referenceHidden": {
        const c = await o.detectOverflow(t, { ...s, elementContext: "reference" }), a = Ar(c, n.reference);
        return { data: { referenceHiddenOffsets: a, referenceHidden: Mr(a) } };
      }
      case "escaped": {
        const c = await o.detectOverflow(t, { ...s, altBoundary: true }), a = Ar(c, n.floating);
        return { data: { escapedOffsets: a, escaped: Mr(a) } };
      }
      default:
        return {};
    }
  } };
}, js = /* @__PURE__ */ new Set(["left", "top"]);
async function Ml(e, t) {
  const { placement: n, platform: o, elements: r } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), c = We(n), a = bt(n), l = Re(n) === "y", u = js.has(c) ? -1 : 1, p = s && l ? -1 : 1, d = Le(t, e);
  let { mainAxis: f, crossAxis: m, alignmentAxis: h } = typeof d == "number" ? { mainAxis: d, crossAxis: 0, alignmentAxis: null } : { mainAxis: d.mainAxis || 0, crossAxis: d.crossAxis || 0, alignmentAxis: d.alignmentAxis };
  return a && typeof h == "number" && (m = a === "end" ? h * -1 : h), l ? { x: m * p, y: f * u } : { x: f * u, y: m * p };
}
const Ol = function(e) {
  return e === void 0 && (e = 0), { name: "offset", options: e, async fn(t) {
    var n, o;
    const { x: r, y: s, placement: c, middlewareData: a } = t, l = await Ml(t, e);
    return c === ((n = a.offset) == null ? void 0 : n.placement) && (o = a.arrow) != null && o.alignmentOffset ? {} : { x: r + l.x, y: s + l.y, data: { ...l, placement: c } };
  } };
}, $l = function(e) {
  return e === void 0 && (e = {}), { name: "shift", options: e, async fn(t) {
    const { x: n, y: o, placement: r, platform: s } = t, { mainAxis: c = true, crossAxis: a = false, limiter: l = { fn: (y) => {
      let { x: C, y: x } = y;
      return { x: C, y: x };
    } }, ...u } = Le(e, t), p = { x: n, y: o }, d = await s.detectOverflow(t, u), f = Re(r), m = Oo(f);
    let h = p[m], v = p[f];
    const g = (y, C) => ks(C + d[y === "y" ? "top" : "left"], C, C - d[y === "y" ? "bottom" : "right"]);
    c && (h = g(m, h)), a && (v = g(f, v));
    const w = l.fn({ ...t, [m]: h, [f]: v });
    return { ...w, data: { x: w.x - n, y: w.y - o, enabled: { [m]: c, [f]: a } } };
  } };
}, Dl = function(e) {
  return e === void 0 && (e = {}), { options: e, fn(t) {
    var n, o;
    const { x: r, y: s, placement: c, rects: a, middlewareData: l } = t, { offset: u = 0, mainAxis: p = true, crossAxis: d = true } = Le(e, t), f = { x: r, y: s }, m = Re(c), h = Oo(m);
    let v = f[h], g = f[m];
    const w = Le(u, t), y = typeof w == "number" ? { mainAxis: w, crossAxis: 0 } : { mainAxis: (n = w.mainAxis) != null ? n : 0, crossAxis: (o = w.crossAxis) != null ? o : 0 };
    if (p) {
      const S = h === "y" ? "height" : "width", R = a.reference[h] - a.floating[S] + y.mainAxis, E = a.reference[h] + a.reference[S] - y.mainAxis;
      v < R ? v = R : v > E && (v = E);
    }
    if (d) {
      var C, x;
      const S = h === "y" ? "width" : "height", R = js.has(We(c)), E = a.reference[m] - a.floating[S] + (R && ((C = l.offset) == null ? void 0 : C[m]) || 0) + (R ? 0 : y.crossAxis), _ = a.reference[m] + a.reference[S] + (R ? 0 : ((x = l.offset) == null ? void 0 : x[m]) || 0) - (R ? y.crossAxis : 0);
      g < E ? g = E : g > _ && (g = _);
    }
    return { [h]: v, [m]: g };
  } };
}, Fl = function(e) {
  return e === void 0 && (e = {}), { name: "size", options: e, async fn(t) {
    const { placement: n, rects: o, platform: r, elements: s } = t, { apply: c = () => {
    }, ...a } = Le(e, t), l = await r.detectOverflow(t, a), u = We(n), p = bt(n), d = Re(n) === "y", { width: f, height: m } = o.floating;
    let h, v;
    u === "top" || u === "bottom" ? (h = u, v = p === (await (r.isRTL == null ? void 0 : r.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (v = u, h = p === "end" ? "top" : "bottom");
    const g = m - l.top - l.bottom, w = f - l.left - l.right, y = He(m - l[h], g), C = He(f - l[v], w), x = t.middlewareData.shift, S = !x;
    let R = y, E = C;
    x != null && x.enabled.x && (E = w), x != null && x.enabled.y && (R = g), S && !p && (d ? E = f - 2 * Oe(l.left, l.right) : R = m - 2 * Oe(l.top, l.bottom)), await c({ ...t, availableWidth: E, availableHeight: R });
    const _ = await r.getDimensions(s.floating);
    return f !== _.width || m !== _.height ? { reset: { rects: true } } : {};
  } };
};
function hn() {
  return typeof window < "u";
}
function Ct(e) {
  return Ls(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function le(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ve(e) {
  var t;
  return (t = (Ls(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Ls(e) {
  return hn() ? e instanceof Node || e instanceof le(e).Node : false;
}
function Ee(e) {
  return hn() ? e instanceof Element || e instanceof le(e).Element : false;
}
function ze(e) {
  return hn() ? e instanceof HTMLElement || e instanceof le(e).HTMLElement : false;
}
function Or(e) {
  return !hn() || typeof ShadowRoot > "u" ? false : e instanceof ShadowRoot || e instanceof le(e).ShadowRoot;
}
function vn(e) {
  const { overflow: t, overflowX: n, overflowY: o, display: r } = Pe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && r !== "inline" && r !== "contents";
}
function kl(e) {
  return /^(table|td|th)$/.test(Ct(e));
}
function gn(e) {
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
const Nl = /transform|translate|scale|rotate|perspective|filter/, jl = /paint|layout|strict|content/, qe = (e) => !!e && e !== "none";
let Gn;
function Fo(e) {
  const t = Ee(e) ? Pe(e) : e;
  return qe(t.transform) || qe(t.translate) || qe(t.scale) || qe(t.rotate) || qe(t.perspective) || !ko() && (qe(t.backdropFilter) || qe(t.filter)) || Nl.test(t.willChange || "") || jl.test(t.contain || "");
}
function Ll(e) {
  let t = Ze(e);
  for (; ze(t) && !It(t); ) {
    if (Fo(t)) return t;
    if (gn(t)) return null;
    t = Ze(t);
  }
  return null;
}
function ko() {
  return Gn == null && (Gn = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Gn;
}
function It(e) {
  return /^(html|body|#document)$/.test(Ct(e));
}
function Pe(e) {
  return le(e).getComputedStyle(e);
}
function bn(e) {
  return Ee(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Ze(e) {
  if (Ct(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || Or(e) && e.host || Ve(e);
  return Or(t) ? t.host : t;
}
function Vs(e) {
  const t = Ze(e);
  return It(t) ? (e.ownerDocument || e).body : ze(t) && vn(t) ? t : Vs(t);
}
function _t(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = true);
  const r = Vs(e), s = r === ((o = e.ownerDocument) == null ? void 0 : o.body), c = le(r);
  if (s) {
    const a = ao(c);
    return t.concat(c, c.visualViewport || [], vn(r) ? r : [], a && n ? _t(a) : []);
  } else return t.concat(r, _t(r, [], n));
}
function ao(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Bs(e) {
  const t = Pe(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = ze(e), s = r ? e.offsetWidth : n, c = r ? e.offsetHeight : o, a = rn(n) !== s || rn(o) !== c;
  return a && (n = s, o = c), { width: n, height: o, $: a };
}
function No(e) {
  return Ee(e) ? e : e.contextElement;
}
function dt(e) {
  const t = No(e);
  if (!ze(t)) return $e(1);
  const n = t.getBoundingClientRect(), { width: o, height: r, $: s } = Bs(t);
  let c = (s ? rn(n.width) : n.width) / o, a = (s ? rn(n.height) : n.height) / r;
  return (!c || !Number.isFinite(c)) && (c = 1), (!a || !Number.isFinite(a)) && (a = 1), { x: c, y: a };
}
const Vl = $e(0);
function Us(e) {
  const t = le(e);
  return !ko() || !t.visualViewport ? Vl : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function Bl(e, t, n) {
  return t === void 0 && (t = false), !!n && t && n === le(e);
}
function Qe(e, t, n, o) {
  t === void 0 && (t = false), n === void 0 && (n = false);
  const r = e.getBoundingClientRect(), s = No(e);
  let c = $e(1);
  t && (o ? Ee(o) && (c = dt(o)) : c = dt(e));
  const a = Bl(s, n, o) ? Us(s) : $e(0);
  let l = (r.left + a.x) / c.x, u = (r.top + a.y) / c.y, p = r.width / c.x, d = r.height / c.y;
  if (s && o) {
    const f = le(s), m = Ee(o) ? le(o) : o;
    let h = f, v = ao(h);
    for (; v && m !== h; ) {
      const g = dt(v), w = v.getBoundingClientRect(), y = Pe(v), C = w.left + (v.clientLeft + parseFloat(y.paddingLeft)) * g.x, x = w.top + (v.clientTop + parseFloat(y.paddingTop)) * g.y;
      l *= g.x, u *= g.y, p *= g.x, d *= g.y, l += C, u += x, h = le(v), v = ao(h);
    }
  }
  return cn({ width: p, height: d, x: l, y: u });
}
function Cn(e, t) {
  const n = bn(e).scrollLeft;
  return t ? t.left + n : Qe(Ve(e)).left + n;
}
function Gs(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - Cn(e, n), r = n.top + t.scrollTop;
  return { x: o, y: r };
}
function Ul(e) {
  let { elements: t, rect: n, offsetParent: o, strategy: r } = e;
  const s = r === "fixed", c = Ve(o), a = t ? gn(t.floating) : false;
  if (o === c || a && s) return n;
  let l = { scrollLeft: 0, scrollTop: 0 }, u = $e(1);
  const p = $e(0), d = ze(o);
  if ((d || !s) && ((Ct(o) !== "body" || vn(c)) && (l = bn(o)), d)) {
    const m = Qe(o);
    u = dt(o), p.x = m.x + o.clientLeft, p.y = m.y + o.clientTop;
  }
  const f = c && !d && !s ? Gs(c, l) : $e(0);
  return { width: n.width * u.x, height: n.height * u.y, x: n.x * u.x - l.scrollLeft * u.x + p.x + f.x, y: n.y * u.y - l.scrollTop * u.y + p.y + f.y };
}
function Gl(e) {
  return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Hl(e) {
  const t = bn(e), n = e.ownerDocument.body, o = Oe(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), r = Oe(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
  let s = -t.scrollLeft + Cn(e);
  const c = -t.scrollTop;
  return Pe(n).direction === "rtl" && (s += Oe(e.clientWidth, n.clientWidth) - o), { width: o, height: r, x: s, y: c };
}
const Wl = 25;
function Kl(e, t, n) {
  n === void 0 && (n = "viewport");
  const o = n === "layoutViewport", r = le(e), s = Ve(e), c = r.visualViewport;
  let a = s.clientWidth, l = s.clientHeight, u = 0, p = 0;
  if (c) {
    const f = !ko() || t === "fixed";
    o ? f || (u = -c.offsetLeft, p = -c.offsetTop) : (a = c.width, l = c.height, f && (u = c.offsetLeft, p = c.offsetTop));
  }
  if (Cn(s) <= 0) {
    const f = s.ownerDocument, m = f.body, h = getComputedStyle(m), v = f.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, g = Math.abs(s.clientWidth - m.clientWidth - v), w = getComputedStyle(s).scrollbarGutter === "stable both-edges" ? g / 2 : g;
    w <= Wl && (a -= w);
  }
  return { width: a, height: l, x: u, y: p };
}
function zl(e, t) {
  const n = Qe(e, true, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, s = dt(e), c = e.clientWidth * s.x, a = e.clientHeight * s.y, l = r * s.x, u = o * s.y;
  return { width: c, height: a, x: l, y: u };
}
function $r(e, t, n) {
  let o;
  if (t === "viewport" || t === "layoutViewport") o = Kl(e, n, t);
  else if (t === "document") o = Hl(Ve(e));
  else if (Ee(t)) o = zl(t, n);
  else {
    const r = Us(e);
    o = { x: t.x - r.x, y: t.y - r.y, width: t.width, height: t.height };
  }
  return cn(o);
}
function Yl(e, t) {
  const n = t.get(e);
  if (n) return n;
  let o = _t(e, [], false).filter((a) => Ee(a) && Ct(a) !== "body"), r = null;
  const s = Pe(e).position === "fixed";
  let c = s ? Ze(e) : e;
  for (; Ee(c) && !It(c); ) {
    const a = Pe(c), l = Fo(c), u = r ? r.position : s ? "fixed" : "";
    !l && (u === "fixed" || u === "absolute" && a.position === "static") ? o = o.filter((d) => d !== c) : r = a, c = Ze(c);
  }
  return t.set(e, o), o;
}
function Xl(e) {
  let { element: t, boundary: n, rootBoundary: o, strategy: r } = e;
  const c = [...n === "clippingAncestors" ? gn(t) ? [] : Yl(t, this._c) : [].concat(n), o], a = $r(t, c[0], r);
  let l = a.top, u = a.right, p = a.bottom, d = a.left;
  for (let f = 1; f < c.length; f++) {
    const m = $r(t, c[f], r);
    l = Oe(m.top, l), u = He(m.right, u), p = He(m.bottom, p), d = Oe(m.left, d);
  }
  return { width: u - d, height: p - l, x: d, y: l };
}
function ql(e) {
  const { width: t, height: n } = Bs(e);
  return { width: t, height: n };
}
function Zl(e, t, n) {
  const o = ze(t), r = Ve(t), s = n === "fixed", c = Qe(e, true, s, t);
  let a = { scrollLeft: 0, scrollTop: 0 };
  const l = $e(0);
  if ((o || !s) && ((Ct(t) !== "body" || vn(r)) && (a = bn(t)), o)) {
    const f = Qe(t, true, s, t);
    l.x = f.x + t.clientLeft, l.y = f.y + t.clientTop;
  }
  !o && r && (l.x = Cn(r));
  const u = r && !o && !s ? Gs(r, a) : $e(0), p = c.left + a.scrollLeft - l.x - u.x, d = c.top + a.scrollTop - l.y - u.y;
  return { x: p, y: d, width: c.width, height: c.height };
}
function Hn(e) {
  return Pe(e).position === "static";
}
function Dr(e, t) {
  if (!ze(e) || Pe(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return Ve(e) === n && (n = n.ownerDocument.body), n;
}
function Hs(e, t) {
  const n = le(e);
  if (gn(e)) return n;
  if (!ze(e)) {
    let r = Ze(e);
    for (; r && !It(r); ) {
      if (Ee(r) && !Hn(r)) return r;
      r = Ze(r);
    }
    return n;
  }
  let o = Dr(e, t);
  for (; o && kl(o) && Hn(o); ) o = Dr(o, t);
  return o && It(o) && Hn(o) && !Fo(o) ? n : o || Ll(e) || n;
}
const Ql = async function(e) {
  const t = this.getOffsetParent || Hs, n = this.getDimensions, o = await n(e.floating);
  return { reference: Zl(e.reference, await t(e.floating), e.strategy), floating: { x: 0, y: 0, width: o.width, height: o.height } };
};
function Jl(e) {
  return Pe(e).direction === "rtl";
}
const eu = { convertOffsetParentRelativeRectToViewportRelativeRect: Ul, getDocumentElement: Ve, getClippingRect: Xl, getOffsetParent: Hs, getElementRects: Ql, getClientRects: Gl, getDimensions: ql, getScale: dt, isElement: Ee, isRTL: Jl };
function Ws(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function tu(e, t, n) {
  let o = null, r;
  const s = Ve(e);
  function c() {
    var p;
    clearTimeout(r), (p = o) == null || p.disconnect(), o = null;
  }
  function a(p, d) {
    p === void 0 && (p = false), d === void 0 && (d = 1), c();
    const f = e.getBoundingClientRect(), { left: m, top: h, width: v, height: g } = f;
    if (p || t(), !v || !g) return;
    const w = Xt(h), y = Xt(s.clientWidth - (m + v)), C = Xt(s.clientHeight - (h + g)), x = Xt(m), R = { rootMargin: -w + "px " + -y + "px " + -C + "px " + -x + "px", threshold: Oe(0, He(1, d)) || 1 };
    let E = true;
    function _(A) {
      const O = A[0].intersectionRatio;
      if (!Ws(f, e.getBoundingClientRect())) return a();
      if (O !== d) {
        if (!E) return a();
        O ? a(false, O) : r = setTimeout(() => {
          a(false, 1e-7);
        }, 1e3);
      }
      E = false;
    }
    try {
      o = new IntersectionObserver(_, { ...R, root: s.ownerDocument });
    } catch {
      o = new IntersectionObserver(_, R);
    }
    o.observe(e);
  }
  const l = le(e), u = () => a(n);
  return l.addEventListener("resize", u), a(true), () => {
    l.removeEventListener("resize", u), c();
  };
}
function nu(e, t, n, o) {
  o === void 0 && (o = {});
  const { ancestorScroll: r = true, ancestorResize: s = true, elementResize: c = typeof ResizeObserver == "function", layoutShift: a = typeof IntersectionObserver == "function", animationFrame: l = false } = o, u = No(e), p = r || s ? [...u ? _t(u) : [], ...t ? _t(t) : []] : [];
  p.forEach((w) => {
    r && w.addEventListener("scroll", n), s && w.addEventListener("resize", n);
  });
  const d = u && a ? tu(u, n, s) : null;
  let f = -1, m = null;
  c && (m = new ResizeObserver((w) => {
    let [y] = w;
    y && y.target === u && m && t && (m.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var C;
      (C = m) == null || C.observe(t);
    })), n();
  }), u && !l && m.observe(u), t && m.observe(t));
  let h, v = l ? Qe(e) : null;
  l && g();
  function g() {
    const w = Qe(e);
    v && !Ws(v, w) && n(), v = w, h = requestAnimationFrame(g);
  }
  return n(), () => {
    var w;
    p.forEach((y) => {
      r && y.removeEventListener("scroll", n), s && y.removeEventListener("resize", n);
    }), d == null ? void 0 : d(), (w = m) == null || w.disconnect(), m = null, l && cancelAnimationFrame(h);
  };
}
const ou = Ol, ru = $l, su = Tl, iu = Fl, cu = Al, Fr = _l, au = Dl, lu = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = n ?? {}, s = { ...eu, ...r.platform, _c: o };
  return Il(e, t, { ...r, platform: s });
};
var uu = typeof document < "u", du = function() {
}, nn = uu ? i.useLayoutEffect : du;
function an(e, t) {
  if (e === t) return true;
  if (typeof e != typeof t) return false;
  if (typeof e == "function" && e.toString() === t.toString()) return true;
  let n, o, r;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return false;
      for (o = n; o-- !== 0; ) if (!an(e[o], t[o])) return false;
      return true;
    }
    if (r = Object.keys(e), n = r.length, n !== Object.keys(t).length) return false;
    for (o = n; o-- !== 0; ) if (!{}.hasOwnProperty.call(t, r[o])) return false;
    for (o = n; o-- !== 0; ) {
      const s = r[o];
      if (!(s === "_owner" && e.$$typeof) && !an(e[s], t[s])) return false;
    }
    return true;
  }
  return e !== e && t !== t;
}
function Ks(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function kr(e, t) {
  const n = Ks(e);
  return Math.round(t * n) / n;
}
function Wn(e) {
  const t = i.useRef(e);
  return nn(() => {
    t.current = e;
  }), t;
}
function fu(e) {
  e === void 0 && (e = {});
  const { placement: t = "bottom", strategy: n = "absolute", middleware: o = [], platform: r, elements: { reference: s, floating: c } = {}, transform: a = true, whileElementsMounted: l, open: u } = e, [p, d] = i.useState({ x: 0, y: 0, strategy: n, placement: t, middlewareData: {}, isPositioned: false }), [f, m] = i.useState(o);
  an(f, o) || m(o);
  const [h, v] = i.useState(null), [g, w] = i.useState(null), y = i.useCallback((L) => {
    L !== R.current && (R.current = L, v(L));
  }, []), C = i.useCallback((L) => {
    L !== E.current && (E.current = L, w(L));
  }, []), x = s || h, S = c || g, R = i.useRef(null), E = i.useRef(null), _ = i.useRef(p), A = l != null, O = Wn(l), P = Wn(r), I = Wn(u), M = i.useCallback(() => {
    if (!R.current || !E.current) return;
    const L = { placement: t, strategy: n, middleware: f };
    P.current && (L.platform = P.current), lu(R.current, E.current, L).then((U) => {
      const $ = { ...U, isPositioned: I.current !== false };
      D.current && !an(_.current, $) && (_.current = $, mt.flushSync(() => {
        d($);
      }));
    });
  }, [f, t, n, P, I]);
  nn(() => {
    u === false && _.current.isPositioned && (_.current.isPositioned = false, d((L) => ({ ...L, isPositioned: false })));
  }, [u]);
  const D = i.useRef(false);
  nn(() => (D.current = true, () => {
    D.current = false;
  }), []), nn(() => {
    if (x && (R.current = x), S && (E.current = S), x && S) {
      if (O.current) return O.current(x, S, M);
      M();
    }
  }, [x, S, M, O, A]);
  const V = i.useMemo(() => ({ reference: R, floating: E, setReference: y, setFloating: C }), [y, C]), k = i.useMemo(() => ({ reference: x, floating: S }), [x, S]), N = i.useMemo(() => {
    const L = { position: n, left: 0, top: 0 };
    if (!k.floating) return L;
    const U = kr(k.floating, p.x), $ = kr(k.floating, p.y);
    return a ? { ...L, transform: "translate(" + U + "px, " + $ + "px)", ...Ks(k.floating) >= 1.5 && { willChange: "transform" } } : { position: n, left: U, top: $ };
  }, [n, a, k.floating, p.x, p.y]);
  return i.useMemo(() => ({ ...p, update: M, refs: V, elements: k, floatingStyles: N }), [p, M, V, k, N]);
}
const pu = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return { name: "arrow", options: e, fn(n) {
    const { element: o, padding: r } = typeof e == "function" ? e(n) : e;
    return o && t(o) ? o.current != null ? Fr({ element: o.current, padding: r }).fn(n) : {} : o ? Fr({ element: o, padding: r }).fn(n) : {};
  } };
}, mu = (e, t) => {
  const n = ou(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, hu = (e, t) => {
  const n = ru(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, vu = (e, t) => ({ fn: au(e).fn, options: [e, t] }), gu = (e, t) => {
  const n = su(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, bu = (e, t) => {
  const n = iu(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, Cu = (e, t) => {
  const n = cu(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, xu = (e, t) => {
  const n = pu(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
};
var wu = Object.defineProperty, yu = (e, t) => wu(e, "name", { value: t, configurable: true }), Ru = i.forwardRef(yu(function(t, n) {
  const { children: o, width: r = 10, height: s = 5, ...c } = t;
  return b.jsx(j.svg, { ...c, ref: n, width: r, height: s, viewBox: "0 0 30 10", preserveAspectRatio: "none", children: t.asChild ? o : b.jsx("polygon", { points: "0,0 30,0 15,10" }) });
}, "Arrow")), Su = Ru, Eu = Object.defineProperty, De = (e, t) => Eu(e, "name", { value: t, configurable: true }), zs = "Popper", [Ys, Ye] = ne(zs), [Pu, Xs] = Ys(zs), Iu = De((e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = i.useState(null), [s, c] = i.useState(void 0);
  return b.jsx(Pu, { scope: t, anchor: o, onAnchorChange: r, placementState: s, setPlacementState: c, children: n });
}, "Popper"), _u = "PopperAnchor", Tu = i.forwardRef(De(function(t, n) {
  const { __scopePopper: o, virtualRef: r, ...s } = t, c = Xs(_u, o), a = i.useRef(null), l = c.onAnchorChange, u = i.useCallback((v) => {
    a.current = v, v && l(v);
  }, [l]), p = B(n, u), d = i.useRef(null);
  i.useEffect(() => {
    if (!r) return;
    const v = d.current;
    d.current = r.current, v !== d.current && l(d.current);
  });
  const f = c.placementState && xn(c.placementState), m = f == null ? void 0 : f[0], h = f == null ? void 0 : f[1];
  return r ? null : b.jsx(j.div, { "data-radix-popper-side": m, "data-radix-popper-align": h, ...s, ref: p });
}, "PopperAnchor")), qs = "PopperContent", [Au, Mu] = Ys(qs), Ou = i.forwardRef(De(function(t, n) {
  var _a3, _b, _c2, _d2, _e3, _f2, _g;
  const { __scopePopper: o, side: r = "bottom", sideOffset: s = 0, align: c = "center", alignOffset: a = 0, arrowPadding: l = 0, avoidCollisions: u = true, collisionBoundary: p = [], collisionPadding: d = 0, sticky: f = "partial", hideWhenDetached: m = false, updatePositionStrategy: h = "optimized", onPlaced: v, ...g } = t, w = Xs(qs, o), [y, C] = i.useState(null), x = B(n, C), [S, R] = i.useState(null), E = Ft(S), _ = (E == null ? void 0 : E.width) ?? 0, A = (E == null ? void 0 : E.height) ?? 0, O = r + (c !== "center" ? "-" + c : ""), P = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, I = Array.isArray(p) ? p : [p], M = I.length > 0, D = { padding: P, boundary: I.filter(Zs), altBoundary: M }, { refs: V, floatingStyles: k, placement: N, isPositioned: L, middlewareData: U } = fu({ strategy: "fixed", placement: O, whileElementsMounted: De((...W) => nu(...W, { animationFrame: h === "always" }), "whileElementsMounted"), elements: { reference: w.anchor }, middleware: [mu({ mainAxis: s + A, alignmentAxis: a }), u && hu({ mainAxis: true, crossAxis: false, limiter: f === "partial" ? vu() : void 0, ...D }), u && gu({ ...D }), bu({ ...D, apply: De(({ elements: W, rects: re, availableWidth: z, availableHeight: Y }) => {
    const { width: q, height: Te } = re.reference, ve = W.floating.style;
    ve.setProperty("--radix-popper-available-width", `${z}px`), ve.setProperty("--radix-popper-available-height", `${Y}px`), ve.setProperty("--radix-popper-anchor-width", `${q}px`), ve.setProperty("--radix-popper-anchor-height", `${Te}px`);
  }, "apply") }), S && xu({ element: S, padding: l }), ku({ arrowWidth: _, arrowHeight: A }), m && Cu({ strategy: "referenceHidden", ...D, boundary: M ? D.boundary : void 0 })] }), $ = w.setPlacementState;
  Q(() => ($(N), () => {
    $(void 0);
  }), [N, $]);
  const [J, H] = xn(N), X = be(v);
  Q(() => {
    L && (X == null ? void 0 : X());
  }, [L, X]);
  const ae = (_a3 = U.arrow) == null ? void 0 : _a3.x, he = (_b = U.arrow) == null ? void 0 : _b.y, _e2 = ((_c2 = U.arrow) == null ? void 0 : _c2.centerOffset) !== 0, [ue, F] = i.useState();
  return Q(() => {
    y && F(window.getComputedStyle(y).zIndex);
  }, [y]), b.jsx("div", { ref: V.setFloating, "data-radix-popper-content-wrapper": "", style: { ...k, transform: L ? k.transform : "translate(0, -200%)", minWidth: "max-content", zIndex: ue, "--radix-popper-transform-origin": [(_d2 = U.transformOrigin) == null ? void 0 : _d2.x, (_e3 = U.transformOrigin) == null ? void 0 : _e3.y].join(" "), ...((_f2 = U.hide) == null ? void 0 : _f2.referenceHidden) && { visibility: "hidden", pointerEvents: "none" } }, dir: t.dir, children: b.jsx(Au, { scope: o, placedSide: J, placedAlign: H, onArrowChange: R, arrowX: ae, arrowY: he, shouldHideArrow: _e2, children: b.jsx(j.div, { "data-side": J, "data-align": H, ...g, ref: x, style: { ...g.style, animation: L ? (_g = g.style) == null ? void 0 : _g.animation : "none" } }) }) });
}, "PopperContent")), $u = "PopperArrow", Du = { top: "bottom", right: "left", bottom: "top", left: "right" }, Fu = i.forwardRef(De(function(t, n) {
  const { __scopePopper: o, ...r } = t, s = Mu($u, o), c = Du[s.placedSide];
  return b.jsx("span", { ref: s.onArrowChange, style: { position: "absolute", left: s.arrowX, top: s.arrowY, [c]: 0, transformOrigin: { top: "", right: "0 0", bottom: "center 0", left: "100% 0" }[s.placedSide], transform: { top: "translateY(100%)", right: "translateY(50%) rotate(90deg) translateX(-50%)", bottom: "rotate(180deg)", left: "translateY(50%) rotate(-90deg) translateX(50%)" }[s.placedSide], visibility: s.shouldHideArrow ? "hidden" : void 0 }, children: b.jsx(Su, { ...r, ref: n, style: { ...r.style, display: "block" } }) });
}, "PopperArrow"));
function Zs(e) {
  return e !== null;
}
De(Zs, "isNotNull");
var ku = De((e) => ({ name: "transformOrigin", options: e, fn(t) {
  var _a3, _b, _c2;
  const { placement: n, rects: o, middlewareData: r } = t, c = ((_a3 = r.arrow) == null ? void 0 : _a3.centerOffset) !== 0, a = c ? 0 : e.arrowWidth, l = c ? 0 : e.arrowHeight, [u, p] = xn(n), d = { start: "0%", center: "50%", end: "100%" }[p], f = (((_b = r.arrow) == null ? void 0 : _b.x) ?? 0) + a / 2, m = (((_c2 = r.arrow) == null ? void 0 : _c2.y) ?? 0) + l / 2;
  let h = "", v = "";
  return u === "bottom" ? (h = c ? d : `${f}px`, v = `${-l}px`) : u === "top" ? (h = c ? d : `${f}px`, v = `${o.floating.height + l}px`) : u === "right" ? (h = `${-l}px`, v = c ? d : `${m}px`) : u === "left" && (h = `${o.floating.width + l}px`, v = c ? d : `${m}px`), { data: { x: h, y: v } };
} }), "transformOrigin");
function xn(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
De(xn, "getSideAndAlignFromPlacement");
var wn = Iu, kt = Tu, yn = Ou, Qs = Fu, Nu = Object.defineProperty, jo = (e, t) => Nu(e, "name", { value: t, configurable: true }), Kn = false;
function Js() {
  const [e, t] = i.useState(Kn);
  return i.useEffect(() => {
    Kn || (Kn = true, t(true));
  }, []), e;
}
jo(Js, "useIsHydrated");
var ei = et[" useSyncExternalStore ".trim().toString()];
function ti() {
  return () => {
  };
}
jo(ti, "subscribe");
function ni() {
  return ei(ti, () => true, () => false);
}
jo(ni, "useIsHydratedModern");
var ju = typeof ei == "function" ? ni : Js, Lu = Object.defineProperty, tt = (e, t) => Lu(e, "name", { value: t, configurable: true }), zn = "rovingFocusGroup.onEntryFocus", Vu = { bubbles: false, cancelable: true }, Rn = "RovingFocusGroup", [lo, oi, Bu] = un(Rn), [Uu, xt] = ne(Rn, [Bu]), [Gu, Hu] = Uu(Rn), Wu = i.forwardRef(tt(function(t, n) {
  return b.jsx(lo.Provider, { scope: t.__scopeRovingFocusGroup, children: b.jsx(lo.Slot, { scope: t.__scopeRovingFocusGroup, children: b.jsx(Ku, { ...t, ref: n }) }) });
}, "RovingFocusGroup")), Ku = i.forwardRef(tt(function(t, n) {
  const { __scopeRovingFocusGroup: o, orientation: r, loop: s = false, dir: c, currentTabStopId: a, defaultCurrentTabStopId: l, onCurrentTabStopIdChange: u, onEntryFocus: p, preventScrollOnEntryFocus: d = false, ...f } = t, m = i.useRef(null), h = B(n, m), v = vt(c), [g, w] = fe({ prop: a, defaultProp: l ?? null, onChange: u, caller: Rn }), [y, C] = i.useState(false), x = be(p), S = oi(o), R = i.useRef(false), [E, _] = i.useState(0);
  return i.useEffect(() => {
    const A = m.current;
    if (A) return A.addEventListener(zn, x), () => A.removeEventListener(zn, x);
  }, [x]), b.jsx(Gu, { scope: o, orientation: r, dir: v, loop: s, currentTabStopId: g, onItemFocus: i.useCallback((A) => w(A), [w]), onItemShiftTab: i.useCallback(() => C(true), []), onFocusableItemAdd: i.useCallback(() => _((A) => A + 1), []), onFocusableItemRemove: i.useCallback(() => _((A) => A - 1), []), children: b.jsx(j.div, { tabIndex: y || E === 0 ? -1 : 0, "data-orientation": r, ...f, ref: h, style: { outline: "none", ...t.style }, onMouseDown: T(t.onMouseDown, () => {
    R.current = true;
  }), onFocus: T(t.onFocus, (A) => {
    const O = !R.current;
    if (A.target === A.currentTarget && O && !y) {
      const P = new CustomEvent(zn, Vu);
      if (A.currentTarget.dispatchEvent(P), !P.defaultPrevented) {
        const I = S().filter((N) => N.focusable), M = I.find((N) => N.active), D = I.find((N) => N.id === g), k = [M, D, ...I].filter(Boolean).map((N) => N.ref.current);
        Lo(k, d);
      }
    }
    R.current = false;
  }), onBlur: T(t.onBlur, () => C(false)) }) });
}, "RovingFocusGroupImpl")), zu = "RovingFocusGroupItem", Yu = i.forwardRef(tt(function(t, n) {
  const { __scopeRovingFocusGroup: o, focusable: r = true, active: s = false, tabStopId: c, children: a, ...l } = t, u = de(), p = c || u, d = Hu(zu, o), f = d.currentTabStopId === p, m = oi(o), { onFocusableItemAdd: h, onFocusableItemRemove: v, currentTabStopId: g } = d, w = ju();
  return Q(() => {
    if (!(!w || !r)) return h(), () => v();
  }, [w, r, h, v]), i.useEffect(() => {
    if (!(w || !r)) return h(), () => v();
  }, [w, r, h, v]), b.jsx(lo.ItemSlot, { scope: o, id: p, focusable: r, active: s, children: b.jsx(j.span, { tabIndex: f ? 0 : -1, "data-orientation": d.orientation, ...l, ref: n, onMouseDown: T(t.onMouseDown, (y) => {
    r ? d.onItemFocus(p) : y.preventDefault();
  }), onFocus: T(t.onFocus, () => d.onItemFocus(p)), onKeyDown: T(t.onKeyDown, (y) => {
    if (y.key === "Tab" && y.shiftKey) {
      d.onItemShiftTab();
      return;
    }
    if (y.target !== y.currentTarget) return;
    const C = si(y, d.orientation, d.dir);
    if (C !== void 0) {
      if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
      y.preventDefault();
      let S = m().filter((R) => R.focusable).map((R) => R.ref.current);
      if (C === "last") S.reverse();
      else if (C === "prev" || C === "next") {
        C === "prev" && S.reverse();
        const R = S.indexOf(y.currentTarget);
        S = d.loop ? ii(S, R + 1) : S.slice(R + 1);
      }
      setTimeout(() => Lo(S));
    }
  }), children: typeof a == "function" ? a({ isCurrentTabStop: f, hasTabStop: g != null }) : a }) });
}, "RovingFocusGroupItem")), Xu = { ArrowLeft: "prev", ArrowUp: "prev", ArrowRight: "next", ArrowDown: "next", PageUp: "first", Home: "first", PageDown: "last", End: "last" };
function ri(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
tt(ri, "getDirectionAwareKey");
function si(e, t, n) {
  const o = ri(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o))) return Xu[o];
}
tt(si, "getFocusIntent");
function Lo(e, t = false) {
  const n = document.activeElement;
  for (const o of e) if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
tt(Lo, "focusFirst");
function ii(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
tt(ii, "wrapArray");
var Vo = Wu, Bo = Yu, qu = Object.defineProperty, K = (e, t) => qu(e, "name", { value: t, configurable: true }), Zu = ["Enter", " "], Qu = ["ArrowDown", "PageUp", "Home"], ci = ["ArrowUp", "PageDown", "End"], Ju = [...Qu, ...ci], Sn = "Menu", [uo, ed, td] = un(Sn), [nt, En] = ne(Sn, [td, Ye, xt]), Uo = Ye(), ai = xt(), [nd, Nt] = nt(Sn), [od, Go] = nt(Sn), rd = K((e) => {
  const { __scopeMenu: t, open: n = false, children: o, dir: r, onOpenChange: s, modal: c = true } = e, a = Uo(t), [l, u] = i.useState(null), p = i.useRef(false), d = be(s), f = vt(r);
  return i.useEffect(() => {
    const m = K(() => {
      p.current = true, document.addEventListener("pointerdown", h, { capture: true, once: true }), document.addEventListener("pointermove", h, { capture: true, once: true });
    }, "handleKeyDown"), h = K(() => p.current = false, "handlePointer");
    return document.addEventListener("keydown", m, { capture: true }), () => {
      document.removeEventListener("keydown", m, { capture: true }), document.removeEventListener("pointerdown", h, { capture: true }), document.removeEventListener("pointermove", h, { capture: true });
    };
  }, []), i.useEffect(() => {
    if (!n) return;
    const m = K(() => d(false), "handleBlur");
    return window.addEventListener("blur", m), () => window.removeEventListener("blur", m);
  }, [n, d]), b.jsx(wn, { ...a, children: b.jsx(nd, { scope: t, open: n, onOpenChange: d, content: l, onContentChange: u, children: b.jsx(od, { scope: t, onClose: i.useCallback(() => d(false), [d]), isUsingKeyboardRef: p, dir: f, modal: c, children: o }) }) });
}, "Menu"), sd = i.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, ...r } = t, s = Uo(o);
  return b.jsx(kt, { ...s, ...r, ref: n });
}, "MenuAnchor")), li = "MenuPortal", [id, cd] = nt(li, { forceMount: void 0 }), ad = K((e) => {
  const { __scopeMenu: t, forceMount: n, children: o, container: r } = e, s = Nt(li, t);
  return b.jsx(id, { scope: t, forceMount: n, children: b.jsx(pe, { present: n || s.open, children: b.jsx($t, { asChild: true, container: r, children: o }) }) });
}, "MenuPortal"), Ge = "MenuContent", [ld, ui] = nt(Ge), ud = i.forwardRef(K(function(t, n) {
  const o = cd(Ge, t.__scopeMenu), { forceMount: r = o.forceMount, ...s } = t, c = Nt(Ge, t.__scopeMenu), a = Go(Ge, t.__scopeMenu);
  return b.jsx(uo.Provider, { scope: t.__scopeMenu, children: b.jsx(pe, { present: r || c.open, children: b.jsx(uo.Slot, { scope: t.__scopeMenu, children: a.modal ? b.jsx(dd, { ...s, ref: n }) : b.jsx(fd, { ...s, ref: n }) }) }) });
}, "MenuContent")), dd = i.forwardRef(K(function(t, n) {
  const o = Nt(Ge, t.__scopeMenu), r = i.useRef(null), s = B(n, r);
  return i.useEffect(() => {
    const c = r.current;
    if (c) return pn(c);
  }, []), b.jsx(di, { ...t, ref: s, trapFocus: o.open, disableOutsidePointerEvents: o.open, disableOutsideScroll: true, onFocusOutside: T(t.onFocusOutside, (c) => c.preventDefault(), { checkForDefaultPrevented: false }), onDismiss: () => o.onOpenChange(false) });
}, "MenuRootContentModal")), fd = i.forwardRef(K(function(t, n) {
  const o = Nt(Ge, t.__scopeMenu);
  return b.jsx(di, { ...t, ref: n, trapFocus: false, disableOutsidePointerEvents: false, disableOutsideScroll: false, onDismiss: () => o.onOpenChange(false) });
}, "MenuRootContentNonModal")), pd = Se("MenuContent.ScrollLock"), di = i.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, loop: r = false, trapFocus: s, onOpenAutoFocus: c, onCloseAutoFocus: a, disableOutsidePointerEvents: l, onEntryFocus: u, onEscapeKeyDown: p, onPointerDownOutside: d, onFocusOutside: f, onInteractOutside: m, onDismiss: h, disableOutsideScroll: v, ...g } = t, w = Nt(Ge, o), y = Go(Ge, o), C = Uo(o), x = ai(o), S = ed(o), [R, E] = i.useState(null), _ = i.useRef(null), A = B(n, _, w.onContentChange), O = i.useRef(0), P = i.useRef(""), I = i.useRef(0), M = i.useRef(null), D = i.useRef("right"), V = i.useRef(0), k = v ? Dt : i.Fragment, N = v ? { as: pd, allowPinchZoom: true } : void 0, L = K(($) => {
    var _a3, _b;
    const J = P.current + $, H = S().filter((F) => !F.disabled), X = document.activeElement, ae = (_a3 = H.find((F) => F.ref.current === X)) == null ? void 0 : _a3.textValue, he = H.map((F) => F.textValue), _e2 = vi(he, J, ae), ue = (_b = H.find((F) => F.textValue === _e2)) == null ? void 0 : _b.ref.current;
    K((function F(W) {
      P.current = W, window.clearTimeout(O.current), W !== "" && (O.current = window.setTimeout(() => F(""), 1e3));
    }), "updateSearch")(J), ue && setTimeout(() => ue.focus());
  }, "handleTypeaheadSearch");
  i.useEffect(() => () => window.clearTimeout(O.current), []), gt();
  const U = i.useCallback(($) => {
    var _a3, _b;
    return D.current === ((_a3 = M.current) == null ? void 0 : _a3.side) && bi($, (_b = M.current) == null ? void 0 : _b.area);
  }, []);
  return b.jsx(ld, { scope: o, searchRef: P, onItemEnter: i.useCallback(($) => {
    U($) && $.preventDefault();
  }, [U]), onItemLeave: i.useCallback(($) => {
    var _a3;
    U($) || ((_a3 = _.current) == null ? void 0 : _a3.focus(), E(null));
  }, [U]), onTriggerLeave: i.useCallback(($) => {
    U($) && $.preventDefault();
  }, [U]), pointerGraceTimerRef: I, onPointerGraceIntentChange: i.useCallback(($) => {
    M.current = $;
  }, []), children: b.jsx(k, { ...N, children: b.jsx(dn, { asChild: true, trapped: s, onMountAutoFocus: T(c, ($) => {
    var _a3;
    $.preventDefault(), (_a3 = _.current) == null ? void 0 : _a3.focus({ preventScroll: true });
  }), onUnmountAutoFocus: a, children: b.jsx(Ot, { asChild: true, disableOutsidePointerEvents: l, onEscapeKeyDown: p, onPointerDownOutside: d, onFocusOutside: f, onInteractOutside: m, onDismiss: h, children: b.jsx(Vo, { asChild: true, ...x, dir: y.dir, orientation: "vertical", loop: r, currentTabStopId: R, onCurrentTabStopIdChange: E, onEntryFocus: T(u, ($) => {
    y.isUsingKeyboardRef.current || $.preventDefault();
  }), preventScrollOnEntryFocus: true, children: b.jsx(yn, { role: "menu", "aria-orientation": "vertical", "data-state": fi(w.open), "data-radix-menu-content": "", dir: y.dir, ...C, ...g, ref: A, style: { outline: "none", ...g.style }, onKeyDown: T(g.onKeyDown, ($) => {
    const H = $.target.closest("[data-radix-menu-content]") === $.currentTarget, X = $.ctrlKey || $.altKey || $.metaKey, ae = $.key.length === 1;
    H && ($.key === "Tab" && $.preventDefault(), !X && ae && L($.key));
    const he = _.current;
    if ($.target !== he || !Ju.includes($.key)) return;
    $.preventDefault();
    const ue = S().filter((F) => !F.disabled).map((F) => F.ref.current);
    ci.includes($.key) && ue.reverse(), mi(ue);
  }), onBlur: T(t.onBlur, ($) => {
    $.currentTarget.contains($.target) || (window.clearTimeout(O.current), P.current = "");
  }), onPointerMove: T(t.onPointerMove, ln(($) => {
    const J = $.target, H = V.current !== $.clientX;
    if ($.currentTarget.contains(J) && H) {
      const X = $.clientX > V.current ? "right" : "left";
      D.current = X, V.current = $.clientX;
    }
  })) }) }) }) }) }) });
}, "MenuContentImpl")), fo = "MenuItem", Nr = "menu.itemSelect", md = i.forwardRef(K(function(t, n) {
  const { disabled: o = false, onSelect: r, ...s } = t, c = i.useRef(null), a = Go(fo, t.__scopeMenu), l = ui(fo, t.__scopeMenu), u = B(n, c), p = i.useRef(false), d = K(() => {
    const f = c.current;
    if (!o && f) {
      const m = new CustomEvent(Nr, { bubbles: true, cancelable: true });
      f.addEventListener(Nr, (h) => r == null ? void 0 : r(h), { once: true }), Ro(f, m), m.defaultPrevented ? p.current = false : a.onClose();
    }
  }, "handleSelect");
  return b.jsx(hd, { ...s, ref: u, disabled: o, onClick: T(t.onClick, d), onPointerDown: (f) => {
    var _a3;
    (_a3 = t.onPointerDown) == null ? void 0 : _a3.call(t, f), p.current = true;
  }, onPointerUp: T(t.onPointerUp, (f) => {
    var _a3;
    p.current || ((_a3 = f.currentTarget) == null ? void 0 : _a3.click());
  }), onKeyDown: T(t.onKeyDown, (f) => {
    o || f.target !== f.currentTarget || l.searchRef.current !== "" && f.key === " " || Zu.includes(f.key) && (f.currentTarget.click(), f.preventDefault());
  }) });
}, "MenuItem")), hd = i.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, disabled: r = false, textValue: s, ...c } = t, a = ui(fo, o), l = ai(o), u = i.useRef(null), p = B(n, u), [d, f] = i.useState(false), [m, h] = i.useState("");
  return i.useEffect(() => {
    const v = u.current;
    v && h((v.textContent ?? "").trim());
  }, [c.children]), b.jsx(uo.ItemSlot, { scope: o, disabled: r, textValue: s ?? m, children: b.jsx(Bo, { asChild: true, ...l, focusable: !r, children: b.jsx(j.div, { role: "menuitem", "data-highlighted": d ? "" : void 0, "aria-disabled": r || void 0, "data-disabled": r ? "" : void 0, ...c, ref: p, onPointerMove: T(t.onPointerMove, ln((v) => {
    r ? a.onItemLeave(v) : (a.onItemEnter(v), v.defaultPrevented || v.currentTarget.focus({ preventScroll: true }));
  })), onPointerLeave: T(t.onPointerLeave, ln((v) => a.onItemLeave(v))), onFocus: T(t.onFocus, () => f(true)), onBlur: T(t.onBlur, () => f(false)) }) }) });
}, "MenuItemImpl")), vd = "MenuRadioGroup", [zm, Ym] = nt(vd, { value: void 0, onValueChange: K(() => {
}, "onValueChange") }), gd = "MenuItemIndicator", [Xm, qm] = nt(gd, { checked: false }), bd = i.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, ...r } = t;
  return b.jsx(j.div, { role: "separator", "aria-orientation": "horizontal", ...r, ref: n });
}, "MenuSeparator")), Cd = "MenuSub", [Zm, Qm] = nt(Cd);
function fi(e) {
  return e ? "open" : "closed";
}
K(fi, "getOpenState");
function pi(e) {
  return e === "indeterminate";
}
K(pi, "isIndeterminate");
function xd(e) {
  return pi(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
K(xd, "getCheckedState");
function mi(e) {
  const t = document.activeElement;
  for (const n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
K(mi, "focusFirst");
function hi(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
K(hi, "wrapArray");
function vi(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let c = hi(e, Math.max(s, 0));
  r.length === 1 && (c = c.filter((u) => u !== n));
  const l = c.find((u) => u.toLowerCase().startsWith(r.toLowerCase()));
  return l !== n ? l : void 0;
}
K(vi, "getNextMatch");
function gi(e, t) {
  const { x: n, y: o } = e;
  let r = false;
  for (let s = 0, c = t.length - 1; s < t.length; c = s++) {
    const a = t[s], l = t[c], u = a.x, p = a.y, d = l.x, f = l.y;
    p > o != f > o && n < (d - u) * (o - p) / (f - p) + u && (r = !r);
  }
  return r;
}
K(gi, "isPointInPolygon");
function bi(e, t) {
  if (!t) return false;
  const n = { x: e.clientX, y: e.clientY };
  return gi(n, t);
}
K(bi, "isPointerInGraceArea");
function ln(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
K(ln, "whenMouse");
var Ci = rd, xi = sd, wi = ad, yi = ud, Ri = md, wd = bd, yd = Object.defineProperty, Fe = (e, t) => yd(e, "name", { value: t, configurable: true }), Ho = "ContextMenu", [Rd, Jm] = ne(Ho, [En]), wt = En(), [Sd, Si] = Rd(Ho), Ed = Fe((e) => {
  const { __scopeContextMenu: t, children: n, onOpenChange: o, open: r, dir: s, modal: c = true } = e, a = i.useRef(false), [l, u] = fe({ prop: r, defaultProp: false, onChange: o, caller: Ho }), p = wt(t);
  return b.jsx(Sd, { scope: t, open: l, onOpenChange: u, modal: c, hasInteractedRef: a, children: b.jsx(Ci, { ...p, dir: s, open: l, onOpenChange: u, modal: c, children: n }) });
}, "ContextMenu"), Pd = "ContextMenuTrigger", Id = i.forwardRef(Fe(function(t, n) {
  const { __scopeContextMenu: o, disabled: r = false, ...s } = t, c = Si(Pd, o), a = wt(o), [l, u] = i.useState({ x: 0, y: 0 }), p = i.useMemo(() => ({ current: { getBoundingClientRect: Fe(() => DOMRect.fromRect({ width: 0, height: 0, ...l }), "getBoundingClientRect") } }), [l]), d = i.useRef(0), f = i.useCallback(() => window.clearTimeout(d.current), []), m = Fe((h) => {
    c.hasInteractedRef.current = true, u({ x: h.clientX, y: h.clientY }), c.onOpenChange(true);
  }, "handleOpen");
  return i.useEffect(() => f, [f]), i.useEffect(() => {
    r && f();
  }, [r, f]), b.jsxs(b.Fragment, { children: [b.jsx(xi, { ...a, virtualRef: p }), b.jsx(j.span, { "data-state": c.open ? "open" : "closed", "data-disabled": r ? "" : void 0, ...s, ref: n, style: { WebkitTouchCallout: "none", ...t.style }, onContextMenu: r ? t.onContextMenu : T(t.onContextMenu, (h) => {
    f(), m(h), h.preventDefault();
  }), onPointerDown: r ? t.onPointerDown : T(t.onPointerDown, Et((h) => {
    f(), c.open && c.onOpenChange(false), d.current = window.setTimeout(() => m(h), 700);
  })), onPointerMove: r ? t.onPointerMove : T(t.onPointerMove, Et(f)), onPointerCancel: r ? t.onPointerCancel : T(t.onPointerCancel, Et(f)), onPointerUp: r ? t.onPointerUp : T(t.onPointerUp, Et(f)) })] });
}, "ContextMenuTrigger")), _d = Fe((e) => {
  const { __scopeContextMenu: t, ...n } = e, o = wt(t);
  return b.jsx(wi, { ...o, ...n });
}, "ContextMenuPortal"), Td = "ContextMenuContent", Ad = i.forwardRef(Fe(function(t, n) {
  const { __scopeContextMenu: o, ...r } = t, s = Si(Td, o), c = wt(o), a = i.useRef(false);
  return b.jsx(yi, { ...c, ...r, ref: n, side: "right", sideOffset: 2, align: "start", onCloseAutoFocus: (l) => {
    var _a3;
    (_a3 = t.onCloseAutoFocus) == null ? void 0 : _a3.call(t, l), !l.defaultPrevented && a.current && l.preventDefault(), a.current = false;
  }, onInteractOutside: (l) => {
    var _a3;
    (_a3 = t.onInteractOutside) == null ? void 0 : _a3.call(t, l), !l.defaultPrevented && !s.modal && (a.current = true);
  }, style: { ...t.style, "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)", "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)", "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)", "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)" } });
}, "ContextMenuContent")), Md = i.forwardRef(Fe(function(t, n) {
  const { __scopeContextMenu: o, ...r } = t, s = wt(o);
  return b.jsx(Ri, { ...s, ...r, ref: n });
}, "ContextMenuItem")), Od = i.forwardRef(Fe(function(t, n) {
  const { __scopeContextMenu: o, ...r } = t, s = wt(o);
  return b.jsx(wd, { ...s, ...r, ref: n });
}, "ContextMenuSeparator"));
function Et(e) {
  return (t) => t.pointerType !== "mouse" ? e(t) : void 0;
}
Fe(Et, "whenTouchOrPen");
var eh = Ed, th = Id, nh = _d, oh = Ad, rh = Md, sh = Od, $d = Object.defineProperty, jt = (e, t) => $d(e, "name", { value: t, configurable: true }), Wo = "DropdownMenu", [Dd, ih] = ne(Wo, [En]), Lt = En(), [Fd, Ei] = Dd(Wo), kd = jt((e) => {
  const { __scopeDropdownMenu: t, children: n, dir: o, open: r, defaultOpen: s, onOpenChange: c, modal: a = true } = e, l = Lt(t), u = i.useRef(null), [p, d] = fe({ prop: r, defaultProp: s ?? false, onChange: c, caller: Wo });
  return b.jsx(Fd, { scope: t, triggerId: de(), triggerRef: u, contentId: de(), open: p, onOpenChange: d, onOpenToggle: i.useCallback(() => d((f) => !f), [d]), modal: a, children: b.jsx(Ci, { ...l, open: p, onOpenChange: d, dir: o, modal: a, children: n }) });
}, "DropdownMenu"), Nd = "DropdownMenuTrigger", jd = i.forwardRef(jt(function(t, n) {
  const { __scopeDropdownMenu: o, disabled: r = false, ...s } = t, c = Ei(Nd, o), a = Lt(o), l = B(n, c.triggerRef);
  return b.jsx(xi, { asChild: true, ...a, children: b.jsx(j.button, { type: "button", id: c.triggerId, "aria-haspopup": "menu", "aria-expanded": c.open, "aria-controls": c.open ? c.contentId : void 0, "data-state": c.open ? "open" : "closed", "data-disabled": r ? "" : void 0, disabled: r, ...s, ref: l, onPointerDown: T(t.onPointerDown, (u) => {
    !r && u.button === 0 && u.ctrlKey === false && (c.onOpenToggle(), c.open || u.preventDefault());
  }), onKeyDown: T(t.onKeyDown, (u) => {
    r || (["Enter", " "].includes(u.key) && c.onOpenToggle(), u.key === "ArrowDown" && c.onOpenChange(true), ["Enter", " ", "ArrowDown"].includes(u.key) && u.preventDefault());
  }) }) });
}, "DropdownMenuTrigger")), Ld = jt((e) => {
  const { __scopeDropdownMenu: t, ...n } = e, o = Lt(t);
  return b.jsx(wi, { ...o, ...n });
}, "DropdownMenuPortal"), Vd = "DropdownMenuContent", Bd = i.forwardRef(jt(function(t, n) {
  const { __scopeDropdownMenu: o, ...r } = t, s = Ei(Vd, o), c = Lt(o), a = i.useRef(false);
  return b.jsx(yi, { id: s.contentId, "aria-labelledby": s.triggerId, ...c, ...r, ref: n, onCloseAutoFocus: T(t.onCloseAutoFocus, (l) => {
    var _a3;
    a.current || ((_a3 = s.triggerRef.current) == null ? void 0 : _a3.focus()), a.current = false, l.preventDefault();
  }), onInteractOutside: T(t.onInteractOutside, (l) => {
    const u = l.detail.originalEvent, p = u.button === 0 && u.ctrlKey === true, d = u.button === 2 || p;
    (!s.modal || d) && (a.current = true);
  }), style: { ...t.style, "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)", "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)", "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)", "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)" } });
}, "DropdownMenuContent")), Ud = i.forwardRef(jt(function(t, n) {
  const { __scopeDropdownMenu: o, ...r } = t, s = Lt(o);
  return b.jsx(Ri, { ...s, ...r, ref: n });
}, "DropdownMenuItem")), ch = kd, ah = jd, lh = Ld, uh = Bd, dh = Ud, Gd = Object.defineProperty, Hd = (e, t) => Gd(e, "name", { value: t, configurable: true }), Wd = i.forwardRef(Hd(function(t, n) {
  return b.jsx(j.label, { ...t, ref: n, onMouseDown: (o) => {
    var _a3;
    o.target.closest("button, input, select, textarea") || ((_a3 = t.onMouseDown) == null ? void 0 : _a3.call(t, o), !o.defaultPrevented && o.detail > 1 && o.preventDefault());
  } });
}, "Label")), Kd = Object.defineProperty, oe = (e, t) => Kd(e, "name", { value: t, configurable: true }), [Ko, fh] = ne("Form"), Pi = "Form", [zd, zo] = Ko(Pi), [Yd, Xd] = Ko(Pi), qd = i.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, onClearServerErrors: r = oe(() => {
  }, "onClearServerErrors"), ...s } = t, c = i.useRef(null), a = B(n, c), [l, u] = i.useState({}), p = i.useCallback((P) => l[P], [l]), d = i.useCallback((P, I) => u((M) => ({ ...M, [P]: { ...M[P] ?? {}, ...I } })), []), f = i.useCallback((P) => {
    u((I) => ({ ...I, [P]: void 0 })), C((I) => ({ ...I, [P]: {} }));
  }, []), [m, h] = i.useState({}), v = i.useCallback((P) => m[P] ?? [], [m]), g = i.useCallback((P, I) => {
    h((M) => ({ ...M, [P]: [...M[P] ?? [], I] }));
  }, []), w = i.useCallback((P, I) => {
    h((M) => ({ ...M, [P]: (M[P] ?? []).filter((D) => D.id !== I) }));
  }, []), [y, C] = i.useState({}), x = i.useCallback((P) => y[P] ?? {}, [y]), S = i.useCallback((P, I) => {
    C((M) => ({ ...M, [P]: { ...M[P] ?? {}, ...I } }));
  }, []), [R, E] = i.useState({}), _ = i.useCallback((P, I) => {
    E((M) => {
      const D = new Set(M[P]).add(I);
      return { ...M, [P]: D };
    });
  }, []), A = i.useCallback((P, I) => {
    E((M) => {
      const D = new Set(M[P]);
      return D.delete(I), { ...M, [P]: D };
    });
  }, []), O = i.useCallback((P) => Array.from(R[P] ?? []).join(" ") || void 0, [R]);
  return b.jsx(zd, { scope: o, getFieldValidity: p, onFieldValidityChange: d, getFieldCustomMatcherEntries: v, onFieldCustomMatcherEntryAdd: g, onFieldCustomMatcherEntryRemove: w, getFieldCustomErrors: x, onFieldCustomErrorsChange: S, onFieldValiditionClear: f, children: b.jsx(Yd, { scope: o, onFieldMessageIdAdd: _, onFieldMessageIdRemove: A, getFieldDescription: O, children: b.jsx(j.form, { ...s, ref: a, onInvalid: T(t.onInvalid, (P) => {
    const I = Yo(P.currentTarget);
    I === P.target && I.focus(), P.preventDefault();
  }), onSubmit: T(t.onSubmit, r, { checkForDefaultPrevented: false }), onReset: T(t.onReset, r) }) }) });
}, "Form")), ft = "FormField", [Zd, Ii] = Ko(ft), Qd = i.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, name: r, serverInvalid: s = false, ...c } = t, l = zo(ft, o).getFieldValidity(r), u = de();
  return b.jsx(Zd, { scope: o, id: u, name: r, serverInvalid: s, children: b.jsx(j.div, { "data-valid": Pn(l, s), "data-invalid": In(l, s), ...c, ref: n }) });
}, "FormField")), qt = "FormLabel", Jd = i.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, name: r, ...s } = t, c = zo(qt, o), a = Ii(qt, o, { optional: true }), l = r ?? (a == null ? void 0 : a.name);
  if (!l) throw new Error(`\`${qt}\` must be used within \`${ft}\` or specify the \`name\` prop`);
  const u = s.htmlFor || (a == null ? void 0 : a.id);
  if (!u) throw new Error(`\`${qt}\` must be used within \`${ft}\` or specify the \`htmlFor\` prop`);
  const p = c.getFieldValidity(l), d = (a == null ? void 0 : a.serverInvalid) ?? false;
  return b.jsx(Wd, { "data-valid": Pn(p, d), "data-invalid": In(p, d), ...s, ref: n, htmlFor: u });
}, "FormLabel")), St = "FormControl", ef = i.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, name: r, id: s, ...c } = t, a = zo(St, o), l = Ii(St, o, { optional: true }), u = Xd(St, o), p = i.useRef(null), d = B(n, p), f = r || (l == null ? void 0 : l.name);
  if (!f) throw new Error(`\`${St}\` must be used within \`${ft}\` or specify the \`name\` prop`);
  const m = s || (l == null ? void 0 : l.id);
  if (!m) throw new Error(`\`${St}\` must be used within \`${ft}\` or specify the \`id\` prop`);
  const h = a.getFieldCustomMatcherEntries(f), { onFieldValidityChange: v, onFieldCustomErrorsChange: g, onFieldValiditionClear: w } = a, y = i.useCallback(async (R) => {
    if (Di(R.validity)) {
      const k = on(R.validity);
      v(f, k);
      return;
    }
    const E = R.form ? new FormData(R.form) : new FormData(), _ = [R.value, E], A = [], O = [];
    h.forEach((k) => {
      Mi(k, _) ? O.push(k) : Oi(k) && A.push(k);
    });
    const P = A.map(({ id: k, match: N }) => [k, N(..._)]), I = Object.fromEntries(P), M = Object.values(I).some(Boolean), D = M;
    R.setCustomValidity(D ? jr : "");
    const V = on(R.validity);
    if (v(f, V), g(f, I), !M && O.length > 0) {
      const k = O.map(({ id: H, match: X }) => X(..._).then((ae) => [H, ae])), N = await Promise.all(k), L = Object.fromEntries(N), $ = Object.values(L).some(Boolean);
      R.setCustomValidity($ ? jr : "");
      const J = on(R.validity);
      v(f, J), g(f, L);
    }
  }, [h, f, g, v]);
  i.useEffect(() => {
    const R = p.current;
    if (R) {
      const E = oe(() => y(R), "handleChange");
      return R.addEventListener("change", E), () => R.removeEventListener("change", E);
    }
  }, [y]);
  const C = i.useCallback(() => {
    const R = p.current;
    R && (R.setCustomValidity(""), w(f));
  }, [f, w]);
  i.useEffect(() => {
    var _a3;
    const R = (_a3 = p.current) == null ? void 0 : _a3.form;
    if (R) return R.addEventListener("reset", C), () => R.removeEventListener("reset", C);
  }, [C]);
  const x = (l == null ? void 0 : l.serverInvalid) ?? false;
  i.useEffect(() => {
    if (!x) return;
    const R = p.current, E = R == null ? void 0 : R.closest("form"), _ = E ? Yo(E) : null;
    _ === R && (_ == null ? void 0 : _.focus());
  }, [x]);
  const S = a.getFieldValidity(f);
  return b.jsx(j.input, { "data-valid": Pn(S, x), "data-invalid": In(S, x), "aria-invalid": x || void 0, "aria-describedby": u.getFieldDescription(f), title: "", ...c, ref: d, id: m, name: f, onInvalid: T(t.onInvalid, (R) => {
    const E = R.currentTarget;
    y(E);
  }), onChange: T(t.onChange, (R) => {
    C();
  }) });
}, "FormControl")), jr = "This value is not valid";
function on(e) {
  const t = {};
  for (const n in e) t[n] = e[n];
  return t;
}
oe(on, "validityStateToObject");
function _i(e) {
  return e instanceof HTMLElement;
}
oe(_i, "isHTMLElement");
function Ti(e) {
  return "validity" in e;
}
oe(Ti, "isFormControl");
function Ai(e) {
  return Ti(e) && (e.validity.valid === false || e.getAttribute("aria-invalid") === "true");
}
oe(Ai, "isInvalid");
function Yo(e) {
  const t = e.elements, [n] = Array.from(t).filter(_i).filter(Ai);
  return n ?? null;
}
oe(Yo, "getFirstInvalidControl");
function Mi(e, t) {
  return e.match.constructor.name === "AsyncFunction" || $i(e.match, t);
}
oe(Mi, "isAsyncCustomMatcherEntry");
function Oi(e) {
  return e.match.constructor.name === "Function";
}
oe(Oi, "isSyncCustomMatcherEntry");
function $i(e, t) {
  return e(...t) instanceof Promise;
}
oe($i, "returnsPromise");
function Di(e) {
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
oe(Di, "hasBuiltInError");
function Pn(e, t) {
  if ((e == null ? void 0 : e.valid) === true && !t) return true;
}
oe(Pn, "getValidAttribute");
function In(e, t) {
  if ((e == null ? void 0 : e.valid) === false || t) return true;
}
oe(In, "getInvalidAttribute");
var ph = qd, mh = Qd, hh = Jd, vh = ef, tf = Object.defineProperty, nf = (e, t) => tf(e, "name", { value: t, configurable: true });
function Fi(e) {
  const t = i.useRef({ value: e, previous: e });
  return i.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
nf(Fi, "usePrevious");
var of = Object.defineProperty, rf = (e, t) => of(e, "name", { value: t, configurable: true });
function po(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
rf(po, "clamp");
var sf = Object.defineProperty, Ie = (e, t) => sf(e, "name", { value: t, configurable: true }), Xo = "Popover", [ki, gh] = ne(Xo, [Ye]), Vt = Ye(), [cf, ot] = ki(Xo), af = Ie((e) => {
  const { __scopePopover: t, children: n, open: o, defaultOpen: r, onOpenChange: s, modal: c = false } = e, a = Vt(t), l = i.useRef(null), [u, p] = i.useState(false), [d, f] = fe({ prop: o, defaultProp: r ?? false, onChange: s, caller: Xo });
  return b.jsx(wn, { ...a, children: b.jsx(cf, { scope: t, contentId: de(), triggerRef: l, open: d, onOpenChange: f, onOpenToggle: i.useCallback(() => f((m) => !m), [f]), hasCustomAnchor: u, onCustomAnchorAdd: i.useCallback(() => p(true), []), onCustomAnchorRemove: i.useCallback(() => p(false), []), modal: c, children: n }) });
}, "Popover"), lf = "PopoverAnchor", uf = i.forwardRef(Ie(function(t, n) {
  const { __scopePopover: o, ...r } = t, s = ot(lf, o), c = Vt(o), { onCustomAnchorAdd: a, onCustomAnchorRemove: l } = s;
  return i.useEffect(() => (a(), () => l()), [a, l]), b.jsx(kt, { ...c, ...r, ref: n });
}, "PopoverAnchor")), df = "PopoverTrigger", ff = i.forwardRef(Ie(function(t, n) {
  const { __scopePopover: o, ...r } = t, s = ot(df, o), c = Vt(o), a = B(n, s.triggerRef), l = b.jsx(j.button, { type: "button", "aria-haspopup": "dialog", "aria-expanded": s.open, "aria-controls": s.open ? s.contentId : void 0, "data-state": qo(s.open), ...r, ref: a, onClick: T(t.onClick, s.onOpenToggle) });
  return s.hasCustomAnchor ? l : b.jsx(kt, { asChild: true, ...c, children: l });
}, "PopoverTrigger")), Ni = "PopoverPortal", [pf, mf] = ki(Ni, { forceMount: void 0 }), hf = Ie((e) => {
  const { __scopePopover: t, forceMount: n, children: o, container: r } = e, s = ot(Ni, t);
  return b.jsx(pf, { scope: t, forceMount: n, children: b.jsx(pe, { present: n || s.open, children: b.jsx($t, { asChild: true, container: r, children: o }) }) });
}, "PopoverPortal"), Tt = "PopoverContent", vf = i.forwardRef(Ie(function(t, n) {
  const o = mf(Tt, t.__scopePopover), { forceMount: r = o.forceMount, ...s } = t, c = ot(Tt, t.__scopePopover);
  return b.jsx(pe, { present: r || c.open, children: c.modal ? b.jsx(bf, { ...s, ref: n }) : b.jsx(Cf, { ...s, ref: n }) });
}, "PopoverContent")), gf = Se("PopoverContent.RemoveScroll"), bf = i.forwardRef(Ie(function(t, n) {
  const o = ot(Tt, t.__scopePopover), r = i.useRef(null), s = B(n, r), c = i.useRef(false);
  return i.useEffect(() => {
    const a = r.current;
    if (a) return pn(a);
  }, []), b.jsx(Dt, { as: gf, allowPinchZoom: true, children: b.jsx(ji, { ...t, ref: s, trapFocus: o.open, disableOutsidePointerEvents: true, onCloseAutoFocus: T(t.onCloseAutoFocus, (a) => {
    var _a3;
    a.preventDefault(), c.current || ((_a3 = o.triggerRef.current) == null ? void 0 : _a3.focus());
  }), onPointerDownOutside: T(t.onPointerDownOutside, (a) => {
    const l = a.detail.originalEvent, u = l.button === 0 && l.ctrlKey === true, p = l.button === 2 || u;
    c.current = p;
  }, { checkForDefaultPrevented: false }), onFocusOutside: T(t.onFocusOutside, (a) => a.preventDefault(), { checkForDefaultPrevented: false }) }) });
}, "PopoverContentModal")), Cf = i.forwardRef(Ie(function(t, n) {
  const o = ot(Tt, t.__scopePopover), r = i.useRef(false), s = i.useRef(false);
  return b.jsx(ji, { ...t, ref: n, trapFocus: false, disableOutsidePointerEvents: false, onCloseAutoFocus: (c) => {
    var _a3, _b;
    (_a3 = t.onCloseAutoFocus) == null ? void 0 : _a3.call(t, c), c.defaultPrevented || (r.current || ((_b = o.triggerRef.current) == null ? void 0 : _b.focus()), c.preventDefault()), r.current = false, s.current = false;
  }, onInteractOutside: (c) => {
    var _a3, _b;
    (_a3 = t.onInteractOutside) == null ? void 0 : _a3.call(t, c), c.defaultPrevented || (r.current = true, c.detail.originalEvent.type === "pointerdown" && (s.current = true));
    const a = c.target;
    ((_b = o.triggerRef.current) == null ? void 0 : _b.contains(a)) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && s.current && c.preventDefault();
  } });
}, "PopoverContentNonModal")), ji = i.forwardRef(Ie(function(t, n) {
  const { __scopePopover: o, trapFocus: r, onOpenAutoFocus: s, onCloseAutoFocus: c, disableOutsidePointerEvents: a, onEscapeKeyDown: l, onPointerDownOutside: u, onFocusOutside: p, onInteractOutside: d, ...f } = t, m = ot(Tt, o), h = Vt(o);
  return gt(), b.jsx(dn, { asChild: true, loop: true, trapped: r, onMountAutoFocus: s, onUnmountAutoFocus: c, children: b.jsx(Ot, { asChild: true, disableOutsidePointerEvents: a, onInteractOutside: d, onEscapeKeyDown: l, onPointerDownOutside: u, onFocusOutside: p, onDismiss: () => m.onOpenChange(false), deferPointerDownOutside: true, children: b.jsx(yn, { "data-state": qo(m.open), role: "dialog", id: m.contentId, ...h, ...f, ref: n, style: { ...f.style, "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-popover-content-available-width": "var(--radix-popper-available-width)", "--radix-popover-content-available-height": "var(--radix-popper-available-height)", "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)", "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)" } }) }) });
}, "PopoverContentImpl")), xf = i.forwardRef(Ie(function(t, n) {
  const { __scopePopover: o, ...r } = t, s = Vt(o);
  return b.jsx(Qs, { ...s, ...r, ref: n });
}, "PopoverArrow"));
function qo(e) {
  return e ? "open" : "closed";
}
Ie(qo, "getState");
var bh = af, Ch = uf, xh = ff, wh = hf, yh = vf, Rh = xf, wf = Object.defineProperty, se = (e, t) => wf(e, "name", { value: t, configurable: true }), Li = "Radio", [yf, Vi] = ne(Li), [Rf, _n] = yf(Li);
function Bi(e) {
  const { __scopeRadio: t, checked: n = false, children: o, disabled: r, form: s, name: c, onCheck: a, required: l, value: u = "on", internal_do_not_use_render: p } = e, [d, f] = i.useState(null), [m, h] = i.useState(null), v = i.useRef(false), [g, w] = i.useReducer((x) => x + 1, 0), y = d ? !!s || !!d.closest("form") : true, C = { checked: n, disabled: r, required: l, name: c, form: s, value: u, control: d, setControl: f, hasConsumerStoppedPropagationRef: v, userInteractionCount: g, onUserInteraction: w, isFormControl: y, bubbleInput: m, setBubbleInput: h, onCheck: se(() => a == null ? void 0 : a(), "onCheck") };
  return b.jsx(Rf, { scope: t, ...C, children: Ui(p) ? p(C) : o });
}
se(Bi, "RadioProvider");
var Sf = "RadioTrigger", Ef = i.forwardRef(se(function({ __scopeRadio: t, onClick: n, ...o }, r) {
  const { checked: s, disabled: c, value: a, setControl: l, onCheck: u, hasConsumerStoppedPropagationRef: p, onUserInteraction: d, isFormControl: f, bubbleInput: m } = _n(Sf, t), h = B(r, l);
  return b.jsx(j.button, { type: "button", role: "radio", "aria-checked": s, "data-state": Zo(s), "data-disabled": c ? "" : void 0, disabled: c, value: a, ...o, ref: h, onClick: T(n, (v) => {
    s || (d(), u()), m && f && (p.current = v.isPropagationStopped(), p.current || v.stopPropagation());
  }) });
}, "RadioTrigger")), Pf = "RadioIndicator", If = i.forwardRef(se(function(t, n) {
  const { __scopeRadio: o, forceMount: r, ...s } = t, c = _n(Pf, o);
  return b.jsx(pe, { present: r || c.checked, children: b.jsx(j.span, { "data-state": Zo(c.checked), "data-disabled": c.disabled ? "" : void 0, ...s, ref: n }) });
}, "RadioIndicator")), _f = "RadioBubbleInput", Tf = i.forwardRef(se(function({ __scopeRadio: t, onClick: n, ...o }, r) {
  const { control: s, checked: c, required: a, disabled: l, name: u, value: p, form: d, bubbleInput: f, setBubbleInput: m, hasConsumerStoppedPropagationRef: h, userInteractionCount: v } = _n(_f, t), g = B(r, m), w = Ft(s), y = i.useRef(false), C = i.useRef(c), x = i.useRef(v);
  i.useEffect(() => {
    const R = f;
    if (!R) return;
    const E = window.HTMLInputElement.prototype, A = Object.getOwnPropertyDescriptor(E, "checked").set, O = v !== x.current;
    x.current = v;
    const P = C.current !== c;
    C.current = c;
    const I = !(O && h.current);
    if (P && A) {
      y.current = !O;
      const M = new Event("click", { bubbles: I });
      A.call(R, c), R.dispatchEvent(M), y.current = false;
    }
  }, [f, c, h, v]);
  const S = i.useRef(c);
  return b.jsx(j.input, { type: "radio", "aria-hidden": true, defaultChecked: S.current, required: a, disabled: l, name: u, value: p, form: d, ...o, tabIndex: -1, ref: g, onClick: T(n, (R) => {
    y.current && R.stopPropagation();
  }), style: { ...o.style, ...w, position: "absolute", pointerEvents: "none", opacity: 0, margin: 0, transform: "translateX(-100%)" } });
}, "RadioBubbleInput"));
function Ui(e) {
  return typeof e == "function";
}
se(Ui, "isFunction");
function Zo(e) {
  return e ? "checked" : "unchecked";
}
se(Zo, "getState");
var Af = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], Qo = "RadioGroup", [Mf, Sh] = ne(Qo, [xt, Vi]), Gi = xt(), Tn = Vi(), [Of, $f] = Mf(Qo), Eh = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, name: r, form: s, defaultValue: c, value: a, required: l = false, disabled: u = false, orientation: p, dir: d, loop: f = true, onValueChange: m, ...h } = t, v = Gi(o), g = vt(d), [w, y] = fe({ prop: a, defaultProp: c ?? null, onChange: m, caller: Qo }), [C, x] = i.useState(null), S = B(n, x), R = i.useRef(w);
  return i.useEffect(() => {
    const E = s ? C == null ? void 0 : C.ownerDocument.getElementById(s) : C == null ? void 0 : C.closest("form");
    if (E instanceof HTMLFormElement) {
      const _ = se(() => y(R.current), "reset");
      return E.addEventListener("reset", _), () => E.removeEventListener("reset", _);
    }
  }, [C, s, y]), b.jsx(Of, { scope: o, name: r, form: s, required: l, disabled: u, value: w, onValueChange: y, children: b.jsx(Vo, { asChild: true, ...v, orientation: p, dir: g, loop: f, children: b.jsx(j.div, { role: "radiogroup", "aria-required": l, "aria-orientation": p, "data-disabled": u ? "" : void 0, dir: g, ...h, ref: S }) }) });
}, "RadioGroup")), Df = "RadioGroupItemProvider", Ff = "RadioGroupItemTrigger";
function Hi(e) {
  const { __scopeRadioGroup: t, value: n, disabled: o, children: r, internal_do_not_use_render: s } = e, c = $f(Df, t), a = Tn(t), l = c.disabled || o;
  return b.jsx(Bi, { ...a, checked: c.value === n, disabled: l, required: c.required, name: c.name, form: c.form, value: n, onCheck: () => c.onValueChange(n), internal_do_not_use_render: s, children: r });
}
se(Hi, "RadioGroupItemProvider");
var kf = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, ...r } = t, s = Gi(o), c = Tn(o), { checked: a, disabled: l } = _n(Ff, c.__scopeRadio), u = i.useRef(null), p = B(n, u), d = i.useRef(false);
  return i.useEffect(() => {
    const f = se((h) => {
      Af.includes(h.key) && (d.current = true);
    }, "handleKeyDown"), m = se(() => d.current = false, "handleKeyUp");
    return document.addEventListener("keydown", f), document.addEventListener("keyup", m), () => {
      document.removeEventListener("keydown", f), document.removeEventListener("keyup", m);
    };
  }, []), b.jsx(Bo, { asChild: true, ...s, focusable: !l, active: a, children: b.jsx(Ef, { ...c, ...r, ref: p, onKeyDown: T(r.onKeyDown, (f) => {
    f.key === "Enter" && f.preventDefault();
  }), onFocus: T(r.onFocus, () => {
    var _a3;
    d.current && ((_a3 = u.current) == null ? void 0 : _a3.click());
  }) }) });
}, "RadioGroupItemTrigger")), Ph = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, value: r, disabled: s, ...c } = t;
  return b.jsx(Hi, { __scopeRadioGroup: o, value: r, disabled: s, internal_do_not_use_render: ({ isFormControl: a }) => b.jsxs(b.Fragment, { children: [b.jsx(kf, { ...c, ref: n, __scopeRadioGroup: o }), a && b.jsx(Nf, { __scopeRadioGroup: o })] }) });
}, "RadioGroupItem")), Nf = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, ...r } = t, s = Tn(o);
  return b.jsx(Tf, { ...s, ...r, ref: n });
}, "RadioGroupItemBubbleInput")), Ih = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, ...r } = t, s = Tn(o);
  return b.jsx(If, { ...s, ...r, ref: n });
}, "RadioGroupIndicator")), jf = Object.defineProperty, G = (e, t) => jf(e, "name", { value: t, configurable: true }), Lf = [" ", "Enter", "ArrowUp", "ArrowDown"], Vf = [" ", "Enter"], pt = "Select", [An, Jo, Bf] = un(pt), [rt, _h] = ne(pt, [Bf, Ye]), er = Ye(), [Uf, Xe] = rt(pt), [Gf, Hf] = rt(pt);
function Wi(e) {
  const { __scopeSelect: t, children: n, open: o, defaultOpen: r, onOpenChange: s, value: c, defaultValue: a, onValueChange: l, dir: u, name: p, autoComplete: d, disabled: f, required: m, form: h, internal_do_not_use_render: v } = e, g = er(t), [w, y] = i.useState(null), [C, x] = i.useState(null), [S, R] = i.useState(false), E = vt(u), [_, A] = fe({ prop: o, defaultProp: r ?? false, onChange: s, caller: pt }), [O, P] = fe({ prop: c, defaultProp: a, onChange: l, caller: pt }), I = i.useRef(null), M = i.useRef(O);
  i.useEffect(() => {
    const H = h ? w == null ? void 0 : w.ownerDocument.getElementById(h) : w == null ? void 0 : w.form;
    if (H instanceof HTMLFormElement) {
      const X = G(() => P(M.current), "reset");
      return H.addEventListener("reset", X), () => H.removeEventListener("reset", X);
    }
  }, [h, w, P]);
  const D = w ? !!h || !!w.closest("form") : true, [V, k] = i.useState(/* @__PURE__ */ new Set()), N = de(), L = Array.from(V).map((H) => H.props.value).join(";"), U = i.useCallback((H) => {
    k((X) => new Set(X).add(H));
  }, []), $ = i.useCallback((H) => {
    k((X) => {
      const ae = new Set(X);
      return ae.delete(H), ae;
    });
  }, []), J = { required: m, trigger: w, onTriggerChange: y, valueNode: C, onValueNodeChange: x, valueNodeHasChildren: S, onValueNodeHasChildrenChange: R, contentId: N, value: O, onValueChange: P, open: _, onOpenChange: A, dir: E, triggerPointerDownPosRef: I, disabled: f, name: p, autoComplete: d, form: h, nativeOptions: V, nativeSelectKey: L, isFormControl: D };
  return b.jsx(wn, { ...g, children: b.jsx(Uf, { scope: t, ...J, children: b.jsx(An.Provider, { scope: t, children: b.jsx(Gf, { scope: t, onNativeOptionAdd: U, onNativeOptionRemove: $, children: Yi(v) ? v(J) : n }) }) }) });
}
G(Wi, "SelectProvider");
var Th = G((e) => {
  const { __scopeSelect: t, children: n, ...o } = e;
  return b.jsx(Wi, { __scopeSelect: t, ...o, internal_do_not_use_render: ({ isFormControl: r }) => b.jsxs(b.Fragment, { children: [n, r ? b.jsx(ip, { __scopeSelect: t }) : null] }) });
}, "Select"), Wf = "SelectTrigger", Ah = i.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, disabled: r = false, ...s } = t, c = er(o), a = Xe(Wf, o), l = a.disabled || r, u = B(n, a.onTriggerChange), p = Jo(o), d = i.useRef("touch"), [f, m, h] = tr((g) => {
    const w = p().filter((x) => !x.disabled), y = w.find((x) => x.value === a.value), C = nr(w, g, y);
    C !== void 0 && a.onValueChange(C.value);
  }), v = G((g) => {
    l || (a.onOpenChange(true), h()), g && (a.triggerPointerDownPosRef.current = { x: Math.round(g.pageX), y: Math.round(g.pageY) });
  }, "handleOpen");
  return b.jsx(kt, { asChild: true, ...c, children: b.jsx(j.button, { type: "button", role: "combobox", "aria-controls": a.open ? a.contentId : void 0, "aria-expanded": a.open, "aria-required": a.required, "aria-autocomplete": "none", dir: a.dir, "data-state": a.open ? "open" : "closed", disabled: l, "data-disabled": l ? "" : void 0, "data-placeholder": Bt(a.value) ? "" : void 0, ...s, ref: u, onClick: T(s.onClick, (g) => {
    g.currentTarget.focus(), d.current !== "mouse" && v(g);
  }), onPointerDown: T(s.onPointerDown, (g) => {
    d.current = g.pointerType;
    const w = g.target;
    w.hasPointerCapture(g.pointerId) && w.releasePointerCapture(g.pointerId), g.button === 0 && g.ctrlKey === false && g.pointerType === "mouse" && (v(g), g.preventDefault());
  }), onKeyDown: T(s.onKeyDown, (g) => {
    const w = f.current !== "";
    !(g.ctrlKey || g.altKey || g.metaKey) && g.key.length === 1 && m(g.key), !(w && g.key === " ") && Lf.includes(g.key) && (v(), g.preventDefault());
  }) }) });
}, "SelectTrigger")), Kf = "SelectValue", Mh = i.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, className: r, style: s, children: c, placeholder: a = "", ...l } = t, u = Xe(Kf, o), { onValueNodeHasChildrenChange: p } = u, d = c !== void 0, f = B(n, u.onValueNodeChange);
  Q(() => {
    p(d);
  }, [p, d]);
  const m = Bt(u.value);
  return b.jsx(j.span, { ...l, asChild: m ? false : l.asChild, ref: f, style: { pointerEvents: "none" }, children: b.jsx(i.Fragment, { children: m ? a : c }, m ? "placeholder" : "value") });
}, "SelectValue")), Oh = i.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, children: r, ...s } = t;
  return b.jsx(j.span, { "aria-hidden": true, ...s, ref: n, children: r || "\u25BC" });
}, "SelectIcon")), zf = "SelectPortal", [Yf, Xf] = rt(zf, { forceMount: void 0 }), $h = G((e) => {
  const { __scopeSelect: t, forceMount: n, ...o } = e;
  return b.jsx(Yf, { scope: e.__scopeSelect, forceMount: n, children: b.jsx($t, { asChild: true, ...o }) });
}, "SelectPortal"), Je = "SelectContent", Dh = i.forwardRef(G(function(t, n) {
  const o = Xf(Je, t.__scopeSelect), { forceMount: r = o.forceMount, ...s } = t, c = Xe(Je, t.__scopeSelect), [a, l] = i.useState();
  return Q(() => {
    l(new DocumentFragment());
  }, []), b.jsx(pe, { present: r || c.open, children: ({ present: u }) => u ? b.jsx(Qf, { ...s, ref: n }) : b.jsx(qf, { ...s, fragment: a }) });
}, "SelectContent")), qf = i.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, children: r, fragment: s } = t;
  return s ? mt.createPortal(b.jsx(Ki, { scope: o, children: b.jsx(An.Slot, { scope: o, children: b.jsx("div", { ref: n, children: r }) }) }), s) : null;
}, "SelectContentFragment")), Ce = 10, [Ki, Mn] = rt(Je), Zf = Se("SelectContent.RemoveScroll"), Qf = i.forwardRef(G(function(t, n) {
  const { __scopeSelect: o } = t, { position: r = "item-aligned", onCloseAutoFocus: s, onEscapeKeyDown: c, onPointerDownOutside: a, side: l, sideOffset: u, align: p, alignOffset: d, arrowPadding: f, collisionBoundary: m, collisionPadding: h, sticky: v, hideWhenDetached: g, avoidCollisions: w, ...y } = t, C = Xe(Je, o), [x, S] = i.useState(null), [R, E] = i.useState(null), _ = B(n, S), [A, O] = i.useState(null), [P, I] = i.useState(null), M = Jo(o), [D, V] = i.useState(false), k = i.useRef(false);
  i.useEffect(() => {
    if (x) return pn(x);
  }, [x]), gt();
  const N = i.useCallback((F) => {
    const [W, ...re] = M().map((q) => q.ref.current), [z] = re.slice(-1), Y = document.activeElement;
    for (const q of F) if (q === Y || (q == null ? void 0 : q.scrollIntoView({ block: "nearest" }), q === W && R && (R.scrollTop = 0), q === z && R && (R.scrollTop = R.scrollHeight), q == null ? void 0 : q.focus(), document.activeElement !== Y)) return;
  }, [M, R]), L = i.useCallback(() => N([A, x]), [N, A, x]);
  i.useEffect(() => {
    D && L();
  }, [D, L]);
  const { onOpenChange: U, triggerPointerDownPosRef: $ } = C;
  i.useEffect(() => {
    if (x) {
      let F = { x: 0, y: 0 };
      const W = G((z) => {
        var _a3, _b;
        F = { x: Math.abs(Math.round(z.pageX) - (((_a3 = $.current) == null ? void 0 : _a3.x) ?? 0)), y: Math.abs(Math.round(z.pageY) - (((_b = $.current) == null ? void 0 : _b.y) ?? 0)) };
      }, "handlePointerMove"), re = G((z) => {
        F.x <= 10 && F.y <= 10 ? z.preventDefault() : z.composedPath().includes(x) || U(false), document.removeEventListener("pointermove", W), $.current = null;
      }, "handlePointerUp");
      return $.current !== null && (document.addEventListener("pointermove", W), document.addEventListener("pointerup", re, { capture: true, once: true })), () => {
        document.removeEventListener("pointermove", W), document.removeEventListener("pointerup", re, { capture: true });
      };
    }
  }, [x, U, $]), i.useEffect(() => {
    const F = G(() => U(false), "close");
    return window.addEventListener("blur", F), window.addEventListener("resize", F), () => {
      window.removeEventListener("blur", F), window.removeEventListener("resize", F);
    };
  }, [U]);
  const [J, H] = tr((F) => {
    const W = M().filter((Y) => !Y.disabled), re = W.find((Y) => Y.ref.current === document.activeElement), z = nr(W, F, re);
    z && setTimeout(() => {
      var _a3;
      return (_a3 = z.ref.current) == null ? void 0 : _a3.focus();
    });
  }), X = i.useCallback((F, W, re) => {
    const z = !k.current && !re;
    (C.value !== void 0 && C.value === W || z) && (O(F), z && (k.current = true));
  }, [C.value]), ae = i.useCallback(() => x == null ? void 0 : x.focus(), [x]), he = i.useCallback((F, W, re) => {
    const z = !k.current && !re;
    (C.value !== void 0 && C.value === W || z) && I(F);
  }, [C.value]), _e2 = r === "popper" ? Lr : Jf, ue = _e2 === Lr ? { side: l, sideOffset: u, align: p, alignOffset: d, arrowPadding: f, collisionBoundary: m, collisionPadding: h, sticky: v, hideWhenDetached: g, avoidCollisions: w } : {};
  return b.jsx(Ki, { scope: o, content: x, viewport: R, onViewportChange: E, itemRefCallback: X, selectedItem: A, onItemLeave: ae, itemTextRefCallback: he, focusSelectedItem: L, selectedItemText: P, position: r, isPositioned: D, searchRef: J, children: b.jsx(Dt, { as: Zf, allowPinchZoom: true, children: b.jsx(dn, { asChild: true, trapped: C.open, onMountAutoFocus: (F) => {
    F.preventDefault();
  }, onUnmountAutoFocus: T(s, (F) => {
    var _a3;
    (_a3 = C.trigger) == null ? void 0 : _a3.focus({ preventScroll: true }), F.preventDefault();
  }), children: b.jsx(Ot, { asChild: true, disableOutsidePointerEvents: true, onEscapeKeyDown: c, onPointerDownOutside: a, onFocusOutside: (F) => F.preventDefault(), onDismiss: () => C.onOpenChange(false), children: b.jsx(_e2, { role: "listbox", id: C.contentId, "data-state": C.open ? "open" : "closed", dir: C.dir, onContextMenu: (F) => F.preventDefault(), ...y, ...ue, onPlaced: () => V(true), ref: _, style: { display: "flex", flexDirection: "column", outline: "none", ...y.style }, onKeyDown: T(y.onKeyDown, (F) => {
    const W = F.ctrlKey || F.altKey || F.metaKey;
    if (F.key === "Tab" && F.preventDefault(), !W && F.key.length === 1 && H(F.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(F.key)) {
      let z = M().filter((Y) => !Y.disabled).map((Y) => Y.ref.current);
      if (["ArrowUp", "End"].includes(F.key) && (z = z.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(F.key)) {
        const Y = F.target, q = z.indexOf(Y);
        z = z.slice(q + 1);
      }
      setTimeout(() => N(z)), F.preventDefault();
    }
  }) }) }) }) }) });
}, "SelectContentImpl")), Jf = i.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, onPlaced: r, ...s } = t, c = Xe(Je, o), a = Mn(Je, o), [l, u] = i.useState(null), [p, d] = i.useState(null), f = B(n, d), m = Jo(o), h = i.useRef(false), v = i.useRef(true), { viewport: g, selectedItem: w, selectedItemText: y, focusSelectedItem: C } = a, x = i.useCallback(() => {
    if (c.trigger && c.valueNode && l && p && g && w && y) {
      const _ = c.trigger.getBoundingClientRect(), A = p.getBoundingClientRect(), O = c.valueNode.getBoundingClientRect(), P = y.getBoundingClientRect();
      if (c.dir !== "rtl") {
        const Y = P.left - A.left, q = O.left - Y, Te = _.left - q, ve = _.width + Te, $n = Math.max(ve, A.width), Dn = window.innerWidth - Ce, Fn = po(q, [Ce, Math.max(Ce, Dn - $n)]);
        l.style.minWidth = ve + "px", l.style.left = Fn + "px";
      } else {
        const Y = A.right - P.right, q = window.innerWidth - O.right - Y, Te = window.innerWidth - _.right - q, ve = _.width + Te, $n = Math.max(ve, A.width), Dn = window.innerWidth - Ce, Fn = po(q, [Ce, Math.max(Ce, Dn - $n)]);
        l.style.minWidth = ve + "px", l.style.right = Fn + "px";
      }
      const I = m(), M = window.innerHeight - Ce * 2, D = g.scrollHeight, V = window.getComputedStyle(p), k = parseInt(V.borderTopWidth, 10), N = parseInt(V.paddingTop, 10), L = parseInt(V.borderBottomWidth, 10), U = parseInt(V.paddingBottom, 10), $ = k + N + D + U + L, J = Math.min(w.offsetHeight * 5, $), H = window.getComputedStyle(g), X = parseInt(H.paddingTop, 10), ae = parseInt(H.paddingBottom, 10), he = _.top + _.height / 2 - Ce, _e2 = M - he, ue = w.offsetHeight / 2, F = w.offsetTop + ue, W = k + N + F, re = $ - W;
      if (W <= he) {
        const Y = I.length > 0 && w === I[I.length - 1].ref.current;
        l.style.bottom = "0px";
        const q = p.clientHeight - g.offsetTop - g.offsetHeight, Te = Math.max(_e2, ue + (Y ? ae : 0) + q + L), ve = W + Te;
        l.style.height = ve + "px";
      } else {
        const Y = I.length > 0 && w === I[0].ref.current;
        l.style.top = "0px";
        const Te = Math.max(he, k + g.offsetTop + (Y ? X : 0) + ue) + re;
        l.style.height = Te + "px", g.scrollTop = W - he + g.offsetTop;
      }
      l.style.margin = `${Ce}px 0`, l.style.minHeight = J + "px", l.style.maxHeight = M + "px", r == null ? void 0 : r(), requestAnimationFrame(() => h.current = true);
    }
  }, [m, c.trigger, c.valueNode, l, p, g, w, y, c.dir, r]);
  Q(() => x(), [x]);
  const [S, R] = i.useState();
  Q(() => {
    p && R(window.getComputedStyle(p).zIndex);
  }, [p]);
  const E = i.useCallback((_) => {
    _ && v.current === true && (x(), C == null ? void 0 : C(), v.current = false);
  }, [x, C]);
  return b.jsx(ep, { scope: o, contentWrapper: l, shouldExpandOnScrollRef: h, onScrollButtonChange: E, children: b.jsx("div", { ref: u, style: { display: "flex", flexDirection: "column", position: "fixed", zIndex: S }, children: b.jsx(j.div, { ...s, ref: f, style: { boxSizing: "border-box", maxHeight: "100%", ...s.style } }) }) });
}, "SelectItemAlignedPosition")), Lr = i.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, align: r = "start", collisionPadding: s = Ce, ...c } = t, a = er(o);
  return b.jsx(yn, { ...a, ...c, ref: n, align: r, collisionPadding: s, style: { boxSizing: "border-box", ...c.style, "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-select-content-available-width": "var(--radix-popper-available-width)", "--radix-select-content-available-height": "var(--radix-popper-available-height)", "--radix-select-trigger-width": "var(--radix-popper-anchor-width)", "--radix-select-trigger-height": "var(--radix-popper-anchor-height)" } });
}, "SelectPopperPosition")), [ep, tp] = rt(Je, {}), Vr = "SelectViewport", Fh = i.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, nonce: r, ...s } = t, c = Mn(Vr, o), a = tp(Vr, o), l = B(n, c.onViewportChange), u = i.useRef(0);
  return b.jsxs(b.Fragment, { children: [b.jsx("style", { dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" }, nonce: r }), b.jsx(An.Slot, { scope: o, children: b.jsx(j.div, { "data-radix-select-viewport": "", role: "presentation", ...s, ref: l, style: { position: "relative", flex: 1, overflow: "hidden auto", ...s.style }, onScroll: T(s.onScroll, (p) => {
    const d = p.currentTarget, { contentWrapper: f, shouldExpandOnScrollRef: m } = a;
    if ((m == null ? void 0 : m.current) && f) {
      const h = Math.abs(u.current - d.scrollTop);
      if (h > 0) {
        const v = window.innerHeight - Ce * 2, g = parseFloat(f.style.minHeight), w = parseFloat(f.style.height), y = Math.max(g, w);
        if (y < v) {
          const C = y + h, x = Math.min(v, C), S = C - x;
          f.style.height = x + "px", f.style.bottom === "0px" && (d.scrollTop = S > 0 ? S : 0, f.style.justifyContent = "flex-end");
        }
      }
    }
    u.current = d.scrollTop;
  }) }) })] });
}, "SelectViewport")), np = "SelectGroup", [kh, Nh] = rt(np), mo = "SelectItem", [op, zi] = rt(mo), jh = i.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, value: r, disabled: s = false, textValue: c, ...a } = t, l = Xe(mo, o), u = Mn(mo, o), p = l.value === r, [d, f] = i.useState(c ?? ""), [m, h] = i.useState(false), v = be((x) => {
    var _a3;
    return (_a3 = u.itemRefCallback) == null ? void 0 : _a3.call(u, x, r, s);
  }), g = B(n, v), w = de(), y = i.useRef("touch"), C = G(() => {
    s || (l.onValueChange(r), l.onOpenChange(false));
  }, "handleSelect");
  return b.jsx(op, { scope: o, value: r, disabled: s, textId: w, isSelected: p, onItemTextChange: i.useCallback((x) => {
    f((S) => S || ((x == null ? void 0 : x.textContent) ?? "").trim());
  }, []), children: b.jsx(An.ItemSlot, { scope: o, value: r, disabled: s, textValue: d, children: b.jsx(j.div, { role: "option", "aria-labelledby": w, "data-highlighted": m ? "" : void 0, "aria-selected": p && m, "data-state": p ? "checked" : "unchecked", "aria-disabled": s || void 0, "data-disabled": s ? "" : void 0, tabIndex: s ? void 0 : -1, ...a, ref: g, onFocus: T(a.onFocus, () => h(true)), onBlur: T(a.onBlur, () => h(false)), onClick: T(a.onClick, () => {
    y.current !== "mouse" && C();
  }), onPointerUp: T(a.onPointerUp, () => {
    y.current === "mouse" && C();
  }), onPointerDown: T(a.onPointerDown, (x) => {
    y.current = x.pointerType;
  }), onPointerMove: T(a.onPointerMove, (x) => {
    var _a3;
    y.current = x.pointerType, s ? (_a3 = u.onItemLeave) == null ? void 0 : _a3.call(u) : y.current === "mouse" && x.currentTarget.focus({ preventScroll: true });
  }), onPointerLeave: T(a.onPointerLeave, (x) => {
    var _a3;
    x.currentTarget === document.activeElement && ((_a3 = u.onItemLeave) == null ? void 0 : _a3.call(u));
  }), onKeyDown: T(a.onKeyDown, (x) => {
    var _a3;
    s || x.target !== x.currentTarget || ((_a3 = u.searchRef) == null ? void 0 : _a3.current) !== "" && x.key === " " || (Vf.includes(x.key) && C(), x.key === " " && x.preventDefault());
  }) }) }) });
}, "SelectItem")), Zt = "SelectItemText", Lh = i.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, className: r, style: s, ...c } = t, a = Xe(Zt, o), l = Mn(Zt, o), u = zi(Zt, o), p = Hf(Zt, o), [d, f] = i.useState(null), m = be((C) => {
    var _a3;
    return (_a3 = l.itemTextRefCallback) == null ? void 0 : _a3.call(l, C, u.value, u.disabled);
  }), h = B(n, f, u.onItemTextChange, m), v = d == null ? void 0 : d.textContent, g = i.useMemo(() => b.jsx("option", { value: u.value, disabled: u.disabled, children: v }, u.value), [u.disabled, u.value, v]), { onNativeOptionAdd: w, onNativeOptionRemove: y } = p;
  return Q(() => (w(g), () => y(g)), [w, y, g]), b.jsxs(b.Fragment, { children: [b.jsx(j.span, { id: u.textId, ...c, ref: h }), u.isSelected && a.valueNode && !a.valueNodeHasChildren && !Bt(a.value) ? mt.createPortal(c.children, a.valueNode) : null] });
}, "SelectItemText")), rp = "SelectItemIndicator", Vh = i.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, ...r } = t;
  return zi(rp, o).isSelected ? b.jsx(j.span, { "aria-hidden": true, ...r, ref: n }) : null;
}, "SelectItemIndicator")), Bh = i.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, ...r } = t;
  return b.jsx(j.div, { "aria-hidden": true, ...r, ref: n });
}, "SelectSeparator")), sp = "SelectBubbleInput", ip = i.forwardRef(G(function({ __scopeSelect: t, ...n }, o) {
  const r = Xe(sp, t), { value: s, onValueChange: c, required: a, disabled: l, name: u, autoComplete: p, form: d } = r, { nativeOptions: f, nativeSelectKey: m } = r, h = i.useRef(null), v = B(o, h), g = s ?? "", w = Fi(g), y = Array.from(f).some((C) => (C.props.value ?? "") === "");
  return i.useEffect(() => {
    const C = h.current;
    if (!C) return;
    const x = window.HTMLSelectElement.prototype, R = Object.getOwnPropertyDescriptor(x, "value").set;
    if (w !== g && R) {
      const E = new Event("change", { bubbles: true });
      R.call(C, g), C.dispatchEvent(E);
    }
  }, [w, g]), b.jsxs(j.select, { "aria-hidden": true, required: a, tabIndex: -1, name: u, autoComplete: p, disabled: l, form: d, onChange: (C) => c(C.target.value), ...n, style: { ...Zr, ...n.style }, ref: v, defaultValue: g, children: [Bt(s) && !y ? b.jsx("option", { value: "" }) : null, Array.from(f)] }, m);
}, "SelectBubbleInput"));
function Yi(e) {
  return typeof e == "function";
}
G(Yi, "isFunction");
function Bt(e) {
  return e === "" || e === void 0;
}
G(Bt, "shouldShowPlaceholder");
function tr(e) {
  const t = be(e), n = i.useRef(""), o = i.useRef(0), r = i.useCallback((c) => {
    const a = n.current + c;
    t(a), G((function l(u) {
      n.current = u, window.clearTimeout(o.current), u !== "" && (o.current = window.setTimeout(() => l(""), 1e3));
    }), "updateSearch")(a);
  }, [t]), s = i.useCallback(() => {
    n.current = "", window.clearTimeout(o.current);
  }, []);
  return i.useEffect(() => () => window.clearTimeout(o.current), []), [n, r, s];
}
G(tr, "useTypeaheadSearch");
function nr(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let c = Xi(e, Math.max(s, 0));
  r.length === 1 && (c = c.filter((u) => u !== n));
  const l = c.find((u) => u.textValue.toLowerCase().startsWith(r.toLowerCase()));
  return l !== n ? l : void 0;
}
G(nr, "findNextItem");
function Xi(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
G(Xi, "wrapArray");
var cp = Object.defineProperty, Ke = (e, t) => cp(e, "name", { value: t, configurable: true }), or = "Switch", [ap, Uh] = ne(or), [lp, rr] = ap(or);
function qi(e) {
  const { __scopeSwitch: t, checked: n, children: o, defaultChecked: r, disabled: s, form: c, name: a, onCheckedChange: l, required: u, value: p = "on", internal_do_not_use_render: d } = e, [f, m] = fe({ prop: n, defaultProp: r ?? false, onChange: l, caller: or }), [h, v] = i.useState(null), [g, w] = i.useState(null), y = i.useRef(false), [C, x] = i.useReducer((E) => E + 1, 0), S = h ? !!c || !!h.closest("form") : true, R = { checked: f, setChecked: m, disabled: s, control: h, setControl: v, name: a, form: c, value: p, hasConsumerStoppedPropagationRef: y, userInteractionCount: C, onUserInteraction: x, required: u, defaultChecked: r, isFormControl: S, bubbleInput: g, setBubbleInput: w };
  return b.jsx(lp, { scope: t, ...R, children: Zi(d) ? d(R) : o });
}
Ke(qi, "SwitchProvider");
var up = "SwitchTrigger", dp = i.forwardRef(Ke(function({ __scopeSwitch: t, onClick: n, ...o }, r) {
  const { control: s, form: c, value: a, disabled: l, checked: u, required: p, setControl: d, setChecked: f, hasConsumerStoppedPropagationRef: m, onUserInteraction: h, isFormControl: v, bubbleInput: g } = rr(up, t), w = B(r, d), y = i.useRef(u);
  return i.useEffect(() => {
    const C = c ? s == null ? void 0 : s.ownerDocument.getElementById(c) : s == null ? void 0 : s.form;
    if (C instanceof HTMLFormElement) {
      const x = Ke(() => f(y.current), "reset");
      return C.addEventListener("reset", x), () => C.removeEventListener("reset", x);
    }
  }, [s, c, f]), b.jsx(j.button, { type: "button", role: "switch", "aria-checked": u, "aria-required": p, "data-state": sr(u), "data-disabled": l ? "" : void 0, disabled: l, value: a, ...o, ref: w, onClick: T(n, (C) => {
    h(), f((x) => !x), g && v && (m.current = C.isPropagationStopped(), m.current || C.stopPropagation());
  }) });
}, "SwitchTrigger")), Gh = i.forwardRef(Ke(function(t, n) {
  const { __scopeSwitch: o, name: r, checked: s, defaultChecked: c, required: a, disabled: l, value: u, onCheckedChange: p, form: d, ...f } = t;
  return b.jsx(qi, { __scopeSwitch: o, checked: s, defaultChecked: c, disabled: l, required: a, onCheckedChange: p, name: r, form: d, value: u, internal_do_not_use_render: ({ isFormControl: m }) => b.jsxs(b.Fragment, { children: [b.jsx(dp, { ...f, ref: n, __scopeSwitch: o }), m && b.jsx(mp, { __scopeSwitch: o })] }) });
}, "Switch")), fp = "SwitchThumb", Hh = i.forwardRef(Ke(function(t, n) {
  const { __scopeSwitch: o, ...r } = t, s = rr(fp, o);
  return b.jsx(j.span, { "data-state": sr(s.checked), "data-disabled": s.disabled ? "" : void 0, ...r, ref: n });
}, "SwitchThumb")), pp = "SwitchBubbleInput", mp = i.forwardRef(Ke(function({ __scopeSwitch: t, onClick: n, ...o }, r) {
  const { control: s, hasConsumerStoppedPropagationRef: c, userInteractionCount: a, checked: l, defaultChecked: u, required: p, disabled: d, name: f, value: m, form: h, bubbleInput: v, setBubbleInput: g } = rr(pp, t), w = B(r, g), y = Ft(s), C = i.useRef(false), x = i.useRef(l), S = i.useRef(a);
  i.useEffect(() => {
    const E = v;
    if (!E) return;
    const _ = window.HTMLInputElement.prototype, O = Object.getOwnPropertyDescriptor(_, "checked").set, P = a !== S.current;
    S.current = a;
    const I = x.current !== l;
    x.current = l;
    const M = !(P && c.current);
    if (I && O) {
      C.current = !P;
      const D = new Event("click", { bubbles: M });
      O.call(E, l), E.dispatchEvent(D), C.current = false;
    }
  }, [v, l, c, a]);
  const R = i.useRef(l);
  return b.jsx(j.input, { type: "checkbox", "aria-hidden": true, defaultChecked: u ?? R.current, required: p, disabled: d, name: f, value: m, form: h, ...o, tabIndex: -1, ref: w, onClick: T(n, (E) => {
    C.current && E.stopPropagation();
  }), style: { ...o.style, ...y, position: "absolute", pointerEvents: "none", opacity: 0, margin: 0, transform: "translateX(-100%)" } });
}, "SwitchBubbleInput"));
function Zi(e) {
  return typeof e == "function";
}
Ke(Zi, "isFunction");
function sr(e) {
  return e ? "checked" : "unchecked";
}
Ke(sr, "getState");
var hp = Object.defineProperty, yt = (e, t) => hp(e, "name", { value: t, configurable: true }), ir = "Tabs", [vp, Wh] = ne(ir, [xt]), Qi = xt(), [gp, cr] = vp(ir), bp = i.forwardRef(yt(function(t, n) {
  const { __scopeTabs: o, value: r, onValueChange: s, defaultValue: c, orientation: a = "horizontal", dir: l, activationMode: u = "automatic", ...p } = t, d = vt(l), [f, m] = fe({ prop: r, onChange: s, defaultProp: c ?? "", caller: ir });
  return b.jsx(gp, { scope: o, baseId: de(), value: f, onValueChange: m, orientation: a, dir: d, activationMode: u, children: b.jsx(j.div, { dir: d, "data-orientation": a, ...p, ref: n }) });
}, "Tabs")), Cp = "TabsList", xp = i.forwardRef(yt(function(t, n) {
  const { __scopeTabs: o, loop: r = true, ...s } = t, c = cr(Cp, o), a = Qi(o);
  return b.jsx(Vo, { asChild: true, ...a, orientation: c.orientation, dir: c.dir, loop: r, children: b.jsx(j.div, { role: "tablist", "aria-orientation": c.orientation, ...s, ref: n }) });
}, "TabsList")), wp = "TabsTrigger", yp = i.forwardRef(yt(function(t, n) {
  const { __scopeTabs: o, value: r, disabled: s = false, ...c } = t, a = cr(wp, o), l = Qi(o), u = ar(a.baseId, r), p = lr(a.baseId, r), d = r === a.value;
  return b.jsx(Bo, { asChild: true, ...l, focusable: !s, active: d, children: b.jsx(j.button, { type: "button", role: "tab", "aria-selected": d, "aria-controls": p, "data-state": d ? "active" : "inactive", "data-disabled": s ? "" : void 0, disabled: s, id: u, ...c, ref: n, onMouseDown: T(t.onMouseDown, (f) => {
    !s && f.button === 0 && f.ctrlKey === false ? a.onValueChange(r) : f.preventDefault();
  }), onKeyDown: T(t.onKeyDown, (f) => {
    s || f.target !== f.currentTarget || [" ", "Enter"].includes(f.key) && a.onValueChange(r);
  }), onFocus: T(t.onFocus, () => {
    const f = a.activationMode !== "manual";
    !d && !s && f && a.onValueChange(r);
  }) }) });
}, "TabsTrigger")), Rp = "TabsContent", Sp = i.forwardRef(yt(function(t, n) {
  const { __scopeTabs: o, value: r, forceMount: s, children: c, ...a } = t, l = cr(Rp, o), u = ar(l.baseId, r), p = lr(l.baseId, r), d = r === l.value, f = i.useRef(d);
  return i.useEffect(() => {
    const m = requestAnimationFrame(() => f.current = false);
    return () => cancelAnimationFrame(m);
  }, []), b.jsx(pe, { present: s || d, children: ({ present: m }) => b.jsx(j.div, { "data-state": d ? "active" : "inactive", "data-orientation": l.orientation, role: "tabpanel", "aria-labelledby": u, hidden: !m, id: p, tabIndex: 0, ...a, ref: n, style: { ...t.style, animationDuration: f.current ? "0s" : void 0 }, children: m && c }) });
}, "TabsContent"));
function ar(e, t) {
  return `${e}-trigger-${t}`;
}
yt(ar, "makeTriggerId");
function lr(e, t) {
  return `${e}-content-${t}`;
}
yt(lr, "makeContentId");
var Kh = bp, zh = xp, Yh = yp, Xh = Sp, Ep = Object.defineProperty, Z = (e, t) => Ep(e, "name", { value: t, configurable: true }), [ur, qh] = ne("Tooltip", [Ye]), On = Ye(), Pp = "TooltipProvider", Ip = 700, ho = "tooltip.open", [_p, dr] = ur(Pp), Tp = Z((e) => {
  const { __scopeTooltip: t, delayDuration: n = Ip, skipDelayDuration: o = 300, disableHoverableContent: r = false, children: s } = e, c = i.useRef(true), a = i.useRef(false), l = i.useRef(0);
  return i.useEffect(() => {
    const u = l.current;
    return () => window.clearTimeout(u);
  }, []), b.jsx(_p, { scope: t, isOpenDelayedRef: c, delayDuration: n, onOpen: i.useCallback(() => {
    o <= 0 || (window.clearTimeout(l.current), c.current = false);
  }, [o]), onClose: i.useCallback(() => {
    o <= 0 || (window.clearTimeout(l.current), l.current = window.setTimeout(() => c.current = true, o));
  }, [o]), isPointerInTransitRef: a, onPointerInTransitChange: i.useCallback((u) => {
    a.current = u;
  }, []), disableHoverableContent: r, children: s });
}, "TooltipProvider"), vo = "Tooltip", [Ap, Ut] = ur(vo), Mp = Z((e) => {
  const { __scopeTooltip: t, children: n, open: o, defaultOpen: r, onOpenChange: s, disableHoverableContent: c, delayDuration: a } = e, l = dr(vo, e.__scopeTooltip), u = On(t), [p, d] = i.useState(null), [f, m] = i.useState(void 0), h = de(), v = i.useRef(0), g = c ?? l.disableHoverableContent, w = a ?? l.delayDuration, y = i.useRef(false), [C, x] = fe({ prop: o, defaultProp: r ?? false, onChange: Z((O) => {
    O ? (l.onOpen(), document.dispatchEvent(new CustomEvent(ho))) : l.onClose(), s == null ? void 0 : s(O);
  }, "onChange"), caller: vo }), S = i.useMemo(() => C ? y.current ? "delayed-open" : "instant-open" : "closed", [C]), R = i.useCallback(() => {
    window.clearTimeout(v.current), v.current = 0, y.current = false, x(true);
  }, [x]), E = i.useCallback(() => {
    window.clearTimeout(v.current), v.current = 0, x(false);
  }, [x]), _ = i.useCallback(() => {
    window.clearTimeout(v.current), v.current = window.setTimeout(() => {
      y.current = true, x(true), v.current = 0;
    }, w);
  }, [w, x]);
  i.useEffect(() => () => {
    v.current && (window.clearTimeout(v.current), v.current = 0);
  }, []);
  const A = f ?? h;
  return b.jsx(wn, { ...u, children: b.jsx(Ap, { scope: t, contentId: A, setContentId: m, open: C, stateAttribute: S, trigger: p, onTriggerChange: d, onTriggerEnter: i.useCallback(() => {
    l.isOpenDelayedRef.current ? _() : R();
  }, [l.isOpenDelayedRef, _, R]), onTriggerLeave: i.useCallback(() => {
    g ? E() : (window.clearTimeout(v.current), v.current = 0);
  }, [E, g]), onOpen: R, onClose: E, disableHoverableContent: g, children: n }) });
}, "Tooltip"), Br = "TooltipTrigger", Op = i.forwardRef(Z(function(t, n) {
  const { __scopeTooltip: o, ...r } = t, s = Ut(Br, o), c = dr(Br, o), a = On(o), l = i.useRef(null), u = B(n, l, s.onTriggerChange), p = i.useRef(false), d = i.useRef(false), f = i.useCallback(() => p.current = false, []);
  return i.useEffect(() => () => document.removeEventListener("pointerup", f), [f]), b.jsx(kt, { asChild: true, ...a, children: b.jsx(j.button, { "aria-describedby": s.open ? s.contentId : void 0, "data-state": s.stateAttribute, ...r, ref: u, onPointerMove: T(t.onPointerMove, (m) => {
    m.pointerType !== "touch" && !d.current && !c.isPointerInTransitRef.current && (s.onTriggerEnter(), d.current = true);
  }), onPointerLeave: T(t.onPointerLeave, () => {
    s.onTriggerLeave(), d.current = false;
  }), onPointerDown: T(t.onPointerDown, () => {
    s.open && s.onClose(), p.current = true, document.addEventListener("pointerup", f, { once: true });
  }), onFocus: T(t.onFocus, () => {
    p.current || s.onOpen();
  }), onBlur: T(t.onBlur, s.onClose), onClick: T(t.onClick, s.onClose) }) });
}, "TooltipTrigger")), Ji = "TooltipPortal", [$p, Dp] = ur(Ji, { forceMount: void 0 }), Fp = Z((e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, s = Ut(Ji, t);
  return b.jsx($p, { scope: t, forceMount: n, children: b.jsx(pe, { present: n || s.open, children: b.jsx($t, { asChild: true, container: r, children: o }) }) });
}, "TooltipPortal"), At = "TooltipContent", kp = i.forwardRef(Z(function(t, n) {
  const o = Dp(At, t.__scopeTooltip), { forceMount: r = o.forceMount, side: s = "top", ...c } = t, a = Ut(At, t.__scopeTooltip);
  return b.jsx(pe, { present: r || a.open, children: a.disableHoverableContent ? b.jsx(ec, { side: s, ...c, ref: n }) : b.jsx(Np, { side: s, ...c, ref: n }) });
}, "TooltipContent")), Np = i.forwardRef(Z(function(t, n) {
  const o = Ut(At, t.__scopeTooltip), r = dr(At, t.__scopeTooltip), s = i.useRef(null), c = B(n, s), [a, l] = i.useState(null), { trigger: u, onClose: p } = o, d = s.current, { onPointerInTransitChange: f } = r, m = i.useCallback(() => {
    l(null), f(false);
  }, [f]), h = i.useCallback((v, g) => {
    const w = v.currentTarget, y = { x: v.clientX, y: v.clientY }, C = tc(y, w.getBoundingClientRect()), x = nc(y, C), S = oc(g.getBoundingClientRect()), R = sc([...x, ...S]);
    l(R), f(true);
  }, [f]);
  return i.useEffect(() => () => m(), [m]), i.useEffect(() => {
    if (u && d) {
      const v = Z((w) => h(w, d), "handleTriggerLeave"), g = Z((w) => h(w, u), "handleContentLeave");
      return u.addEventListener("pointerleave", v), d.addEventListener("pointerleave", g), () => {
        u.removeEventListener("pointerleave", v), d.removeEventListener("pointerleave", g);
      };
    }
  }, [u, d, h, m]), i.useEffect(() => {
    if (a) {
      const v = Z((g) => {
        const w = g.target, y = { x: g.clientX, y: g.clientY }, C = (u == null ? void 0 : u.contains(w)) || (d == null ? void 0 : d.contains(w)), x = !rc(y, a);
        C ? m() : x && (m(), p());
      }, "handleTrackPointerGrace");
      return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v);
    }
  }, [u, d, a, p, m]), b.jsx(ec, { ...t, ref: c });
}, "TooltipContentHoverable")), jp = Kr("TooltipContent"), ec = i.forwardRef(Z(function(t, n) {
  const { __scopeTooltip: o, children: r, "aria-label": s, id: c, onEscapeKeyDown: a, onPointerDownOutside: l, ...u } = t, p = Ut(At, o), d = On(o), { onClose: f } = p;
  i.useEffect(() => (document.addEventListener(ho, f), () => document.removeEventListener(ho, f)), [f]), i.useEffect(() => {
    if (p.trigger) {
      const h = Z((v) => {
        v.target instanceof Node && v.target.contains(p.trigger) && f();
      }, "handleScroll");
      return window.addEventListener("scroll", h, { capture: true }), () => window.removeEventListener("scroll", h, { capture: true });
    }
  }, [p.trigger, f]);
  const { setContentId: m } = p;
  return Q(() => (m(c), () => {
    m(void 0);
  }), [c, m]), b.jsx(Ot, { asChild: true, disableOutsidePointerEvents: false, onEscapeKeyDown: a, onPointerDownOutside: l, onFocusOutside: (h) => h.preventDefault(), onDismiss: f, children: b.jsxs(yn, { "data-state": p.stateAttribute, role: s ? void 0 : "tooltip", id: s ? void 0 : p.contentId, ...d, ...u, ref: n, style: { ...u.style, "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)", "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)", "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)", "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)" }, children: [b.jsx(jp, { children: r }), s ? b.jsx(Dc, { id: p.contentId, role: "tooltip", children: s }) : null] }) });
}, "TooltipContentImpl")), Lp = i.forwardRef(Z(function(t, n) {
  const { __scopeTooltip: o, ...r } = t, s = On(o);
  return b.jsx(Qs, { ...s, ...r, ref: n });
}, "TooltipArrow"));
function tc(e, t) {
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
Z(tc, "getExitSideFromRect");
function nc(e, t, n = 5) {
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
Z(nc, "getPaddedExitPoints");
function oc(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [{ x: r, y: t }, { x: n, y: t }, { x: n, y: o }, { x: r, y: o }];
}
Z(oc, "getPointsFromRect");
function rc(e, t) {
  const { x: n, y: o } = e;
  let r = false;
  for (let s = 0, c = t.length - 1; s < t.length; c = s++) {
    const a = t[s], l = t[c], u = a.x, p = a.y, d = l.x, f = l.y;
    p > o != f > o && n < (d - u) * (o - p) / (f - p) + u && (r = !r);
  }
  return r;
}
Z(rc, "isPointInPolygon");
function sc(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), ic(t);
}
Z(sc, "getHull");
function ic(e) {
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
Z(ic, "getHullPresorted");
var Zh = Tp, Qh = Mp, Jh = Op, ev = Fp, tv = kp, nv = Lp;
function ie() {
  return ie = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
  }, ie.apply(null, arguments);
}
function ke(e, t, { checkForDefaultPrevented: n = true } = {}) {
  return function(r) {
    if (e == null ? void 0 : e(r), n === false || !r.defaultPrevented) return t == null ? void 0 : t(r);
  };
}
function fr(e, t = []) {
  let n = [];
  function o(s, c) {
    const a = i.createContext(c), l = n.length;
    n = [...n, c];
    function u(d) {
      const { scope: f, children: m, ...h } = d, v = (f == null ? void 0 : f[e][l]) || a, g = i.useMemo(() => h, Object.values(h));
      return i.createElement(v.Provider, { value: g }, m);
    }
    function p(d, f) {
      const m = (f == null ? void 0 : f[e][l]) || a, h = i.useContext(m);
      if (h) return h;
      if (c !== void 0) return c;
      throw new Error(`\`${d}\` must be used within \`${s}\``);
    }
    return u.displayName = s + "Provider", [u, p];
  }
  const r = () => {
    const s = n.map((c) => i.createContext(c));
    return function(a) {
      const l = (a == null ? void 0 : a[e]) || s;
      return i.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: l } }), [a, l]);
    };
  };
  return r.scopeName = e, [o, Vp(r, ...t)];
}
function Vp(...e) {
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
function Bp(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function cc(...e) {
  return (t) => e.forEach((n) => Bp(n, t));
}
function go(...e) {
  return i.useCallback(cc(...e), e);
}
const bo = i.forwardRef((e, t) => {
  const { children: n, ...o } = e, r = i.Children.toArray(n), s = r.find(Gp);
  if (s) {
    const c = s.props.children, a = r.map((l) => l === s ? i.Children.count(c) > 1 ? i.Children.only(null) : i.isValidElement(c) ? c.props.children : null : l);
    return i.createElement(Co, ie({}, o, { ref: t }), i.isValidElement(c) ? i.cloneElement(c, void 0, a) : null);
  }
  return i.createElement(Co, ie({}, o, { ref: t }), n);
});
bo.displayName = "Slot";
const Co = i.forwardRef((e, t) => {
  const { children: n, ...o } = e;
  return i.isValidElement(n) ? i.cloneElement(n, { ...Hp(o, n.props), ref: cc(t, n.ref) }) : i.Children.count(n) > 1 ? i.Children.only(null) : null;
});
Co.displayName = "SlotClone";
const Up = ({ children: e }) => i.createElement(i.Fragment, null, e);
function Gp(e) {
  return i.isValidElement(e) && e.type === Up;
}
function Hp(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...a) => {
      s(...a), r(...a);
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Wp(e) {
  const t = e + "CollectionProvider", [n, o] = fr(t), [r, s] = n(t, { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }), c = (m) => {
    const { scope: h, children: v } = m, g = ye.useRef(null), w = ye.useRef(/* @__PURE__ */ new Map()).current;
    return ye.createElement(r, { scope: h, itemMap: w, collectionRef: g }, v);
  }, a = e + "CollectionSlot", l = ye.forwardRef((m, h) => {
    const { scope: v, children: g } = m, w = s(a, v), y = go(h, w.collectionRef);
    return ye.createElement(bo, { ref: y }, g);
  }), u = e + "CollectionItemSlot", p = "data-radix-collection-item", d = ye.forwardRef((m, h) => {
    const { scope: v, children: g, ...w } = m, y = ye.useRef(null), C = go(h, y), x = s(u, v);
    return ye.useEffect(() => (x.itemMap.set(y, { ref: y, ...w }), () => {
      x.itemMap.delete(y);
    })), ye.createElement(bo, { [p]: "", ref: C }, g);
  });
  function f(m) {
    const h = s(e + "CollectionConsumer", m);
    return ye.useCallback(() => {
      const g = h.collectionRef.current;
      if (!g) return [];
      const w = Array.from(g.querySelectorAll(`[${p}]`));
      return Array.from(h.itemMap.values()).sort((x, S) => w.indexOf(x.ref.current) - w.indexOf(S.ref.current));
    }, [h.collectionRef, h.itemMap]);
  }
  return [{ Provider: c, Slot: l, ItemSlot: d }, f, o];
}
const Kp = (globalThis == null ? void 0 : globalThis.document) ? i.useLayoutEffect : () => {
}, zp = et.useId || (() => {
});
let Yp = 0;
function ac(e) {
  const [t, n] = i.useState(zp());
  return Kp(() => {
    n((o) => o ?? String(Yp++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
function Xp(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function qp(...e) {
  return (t) => e.forEach((n) => Xp(n, t));
}
const lc = i.forwardRef((e, t) => {
  const { children: n, ...o } = e, r = i.Children.toArray(n), s = r.find(Qp);
  if (s) {
    const c = s.props.children, a = r.map((l) => l === s ? i.Children.count(c) > 1 ? i.Children.only(null) : i.isValidElement(c) ? c.props.children : null : l);
    return i.createElement(xo, ie({}, o, { ref: t }), i.isValidElement(c) ? i.cloneElement(c, void 0, a) : null);
  }
  return i.createElement(xo, ie({}, o, { ref: t }), n);
});
lc.displayName = "Slot";
const xo = i.forwardRef((e, t) => {
  const { children: n, ...o } = e;
  return i.isValidElement(n) ? i.cloneElement(n, { ...Jp(o, n.props), ref: qp(t, n.ref) }) : i.Children.count(n) > 1 ? i.Children.only(null) : null;
});
xo.displayName = "SlotClone";
const Zp = ({ children: e }) => i.createElement(i.Fragment, null, e);
function Qp(e) {
  return i.isValidElement(e) && e.type === Zp;
}
function Jp(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...a) => {
      s(...a), r(...a);
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
const em = ["a", "button", "div", "h2", "h3", "img", "label", "li", "nav", "ol", "p", "span", "svg", "ul"], Rt = em.reduce((e, t) => {
  const n = i.forwardRef((o, r) => {
    const { asChild: s, ...c } = o, a = s ? lc : t;
    return i.useEffect(() => {
      window[/* @__PURE__ */ Symbol.for("radix-ui")] = true;
    }, []), i.createElement(a, ie({}, c, { ref: r }));
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {});
function tm(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => (...n) => {
    var o;
    return (o = t.current) === null || o === void 0 ? void 0 : o.call(t, ...n);
  }, []);
}
function uc(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => (...n) => {
    var o;
    return (o = t.current) === null || o === void 0 ? void 0 : o.call(t, ...n);
  }, []);
}
function dc({ prop: e, defaultProp: t, onChange: n = () => {
} }) {
  const [o, r] = nm({ defaultProp: t, onChange: n }), s = e !== void 0, c = s ? e : o, a = uc(n), l = i.useCallback((u) => {
    if (s) {
      const d = typeof u == "function" ? u(e) : u;
      d !== e && a(d);
    } else r(u);
  }, [s, e, r, a]);
  return [c, l];
}
function nm({ defaultProp: e, onChange: t }) {
  const n = i.useState(e), [o] = n, r = i.useRef(o), s = uc(t);
  return i.useEffect(() => {
    r.current !== o && (s(o), r.current = o);
  }, [o, r, s]), n;
}
const om = i.createContext(void 0);
function fc(e) {
  const t = i.useContext(om);
  return e || t || "ltr";
}
const Yn = "rovingFocusGroup.onEntryFocus", rm = { bubbles: false, cancelable: true }, pr = "RovingFocusGroup", [wo, pc, sm] = Wp(pr), [im, mc] = fr(pr, [sm]), [cm, am] = im(pr), lm = i.forwardRef((e, t) => i.createElement(wo.Provider, { scope: e.__scopeRovingFocusGroup }, i.createElement(wo.Slot, { scope: e.__scopeRovingFocusGroup }, i.createElement(um, ie({}, e, { ref: t }))))), um = i.forwardRef((e, t) => {
  const { __scopeRovingFocusGroup: n, orientation: o, loop: r = false, dir: s, currentTabStopId: c, defaultCurrentTabStopId: a, onCurrentTabStopIdChange: l, onEntryFocus: u, ...p } = e, d = i.useRef(null), f = go(t, d), m = fc(s), [h = null, v] = dc({ prop: c, defaultProp: a, onChange: l }), [g, w] = i.useState(false), y = tm(u), C = pc(n), x = i.useRef(false), [S, R] = i.useState(0);
  return i.useEffect(() => {
    const E = d.current;
    if (E) return E.addEventListener(Yn, y), () => E.removeEventListener(Yn, y);
  }, [y]), i.createElement(cm, { scope: n, orientation: o, dir: m, loop: r, currentTabStopId: h, onItemFocus: i.useCallback((E) => v(E), [v]), onItemShiftTab: i.useCallback(() => w(true), []), onFocusableItemAdd: i.useCallback(() => R((E) => E + 1), []), onFocusableItemRemove: i.useCallback(() => R((E) => E - 1), []) }, i.createElement(Rt.div, ie({ tabIndex: g || S === 0 ? -1 : 0, "data-orientation": o }, p, { ref: f, style: { outline: "none", ...e.style }, onMouseDown: ke(e.onMouseDown, () => {
    x.current = true;
  }), onFocus: ke(e.onFocus, (E) => {
    const _ = !x.current;
    if (E.target === E.currentTarget && _ && !g) {
      const A = new CustomEvent(Yn, rm);
      if (E.currentTarget.dispatchEvent(A), !A.defaultPrevented) {
        const O = C().filter((V) => V.focusable), P = O.find((V) => V.active), I = O.find((V) => V.id === h), D = [P, I, ...O].filter(Boolean).map((V) => V.ref.current);
        hc(D);
      }
    }
    x.current = false;
  }), onBlur: ke(e.onBlur, () => w(false)) })));
}), dm = "RovingFocusGroupItem", fm = i.forwardRef((e, t) => {
  const { __scopeRovingFocusGroup: n, focusable: o = true, active: r = false, tabStopId: s, ...c } = e, a = ac(), l = s || a, u = am(dm, n), p = u.currentTabStopId === l, d = pc(n), { onFocusableItemAdd: f, onFocusableItemRemove: m } = u;
  return i.useEffect(() => {
    if (o) return f(), () => m();
  }, [o, f, m]), i.createElement(wo.ItemSlot, { scope: n, id: l, focusable: o, active: r }, i.createElement(Rt.span, ie({ tabIndex: p ? 0 : -1, "data-orientation": u.orientation }, c, { ref: t, onMouseDown: ke(e.onMouseDown, (h) => {
    o ? u.onItemFocus(l) : h.preventDefault();
  }), onFocus: ke(e.onFocus, () => u.onItemFocus(l)), onKeyDown: ke(e.onKeyDown, (h) => {
    if (h.key === "Tab" && h.shiftKey) {
      u.onItemShiftTab();
      return;
    }
    if (h.target !== h.currentTarget) return;
    const v = hm(h, u.orientation, u.dir);
    if (v !== void 0) {
      h.preventDefault();
      let w = d().filter((y) => y.focusable).map((y) => y.ref.current);
      if (v === "last") w.reverse();
      else if (v === "prev" || v === "next") {
        v === "prev" && w.reverse();
        const y = w.indexOf(h.currentTarget);
        w = u.loop ? vm(w, y + 1) : w.slice(y + 1);
      }
      setTimeout(() => hc(w));
    }
  }) })));
}), pm = { ArrowLeft: "prev", ArrowUp: "prev", ArrowRight: "next", ArrowDown: "next", PageUp: "first", Home: "first", PageDown: "last", End: "last" };
function mm(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function hm(e, t, n) {
  const o = mm(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o))) return pm[o];
}
function hc(e) {
  const t = document.activeElement;
  for (const n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function vm(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
const gm = lm, bm = fm;
function Cm(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function xm(...e) {
  return (t) => e.forEach((n) => Cm(n, t));
}
function wm(...e) {
  return i.useCallback(xm(...e), e);
}
const Ur = (globalThis == null ? void 0 : globalThis.document) ? i.useLayoutEffect : () => {
};
function ym(e, t) {
  return i.useReducer((n, o) => {
    const r = t[n][o];
    return r ?? n;
  }, e);
}
const vc = (e) => {
  const { present: t, children: n } = e, o = Rm(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = wm(o.ref, r.ref);
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
};
vc.displayName = "Presence";
function Rm(e) {
  const [t, n] = i.useState(), o = i.useRef({}), r = i.useRef(e), s = i.useRef("none"), c = e ? "mounted" : "unmounted", [a, l] = ym(c, { mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" }, unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" }, unmounted: { MOUNT: "mounted" } });
  return i.useEffect(() => {
    const u = Qt(o.current);
    s.current = a === "mounted" ? u : "none";
  }, [a]), Ur(() => {
    const u = o.current, p = r.current;
    if (p !== e) {
      const f = s.current, m = Qt(u);
      e ? l("MOUNT") : m === "none" || (u == null ? void 0 : u.display) === "none" ? l("UNMOUNT") : l(p && f !== m ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), Ur(() => {
    if (t) {
      const u = (d) => {
        const m = Qt(o.current).includes(d.animationName);
        d.target === t && m && mt.flushSync(() => l("ANIMATION_END"));
      }, p = (d) => {
        d.target === t && (s.current = Qt(o.current));
      };
      return t.addEventListener("animationstart", p), t.addEventListener("animationcancel", u), t.addEventListener("animationend", u), () => {
        t.removeEventListener("animationstart", p), t.removeEventListener("animationcancel", u), t.removeEventListener("animationend", u);
      };
    } else l("ANIMATION_END");
  }, [t, l]), { isPresent: ["mounted", "unmountSuspended"].includes(a), ref: i.useCallback((u) => {
    u && (o.current = getComputedStyle(u)), n(u);
  }, []) };
}
function Qt(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
const gc = "Tabs", [Sm] = fr(gc, [mc]), bc = mc(), [Em, mr] = Sm(gc), Pm = i.forwardRef((e, t) => {
  const { __scopeTabs: n, value: o, onValueChange: r, defaultValue: s, orientation: c = "horizontal", dir: a, activationMode: l = "automatic", ...u } = e, p = fc(a), [d, f] = dc({ prop: o, onChange: r, defaultProp: s });
  return i.createElement(Em, { scope: n, baseId: ac(), value: d, onValueChange: f, orientation: c, dir: p, activationMode: l }, i.createElement(Rt.div, ie({ dir: p, "data-orientation": c }, u, { ref: t })));
}), Im = "TabsList", _m = i.forwardRef((e, t) => {
  const { __scopeTabs: n, loop: o = true, ...r } = e, s = mr(Im, n), c = bc(n);
  return i.createElement(gm, ie({ asChild: true }, c, { orientation: s.orientation, dir: s.dir, loop: o }), i.createElement(Rt.div, ie({ role: "tablist", "aria-orientation": s.orientation }, r, { ref: t })));
}), Tm = "TabsTrigger", Am = i.forwardRef((e, t) => {
  const { __scopeTabs: n, value: o, disabled: r = false, ...s } = e, c = mr(Tm, n), a = bc(n), l = Cc(c.baseId, o), u = xc(c.baseId, o), p = o === c.value;
  return i.createElement(bm, ie({ asChild: true }, a, { focusable: !r, active: p }), i.createElement(Rt.button, ie({ type: "button", role: "tab", "aria-selected": p, "aria-controls": u, "data-state": p ? "active" : "inactive", "data-disabled": r ? "" : void 0, disabled: r, id: l }, s, { ref: t, onMouseDown: ke(e.onMouseDown, (d) => {
    !r && d.button === 0 && d.ctrlKey === false ? c.onValueChange(o) : d.preventDefault();
  }), onKeyDown: ke(e.onKeyDown, (d) => {
    [" ", "Enter"].includes(d.key) && c.onValueChange(o);
  }), onFocus: ke(e.onFocus, () => {
    const d = c.activationMode !== "manual";
    !p && !r && d && c.onValueChange(o);
  }) })));
}), Mm = "TabsContent", Om = i.forwardRef((e, t) => {
  const { __scopeTabs: n, value: o, forceMount: r, children: s, ...c } = e, a = mr(Mm, n), l = Cc(a.baseId, o), u = xc(a.baseId, o), p = o === a.value, d = i.useRef(p);
  return i.useEffect(() => {
    const f = requestAnimationFrame(() => d.current = false);
    return () => cancelAnimationFrame(f);
  }, []), i.createElement(vc, { present: r || p }, ({ present: f }) => i.createElement(Rt.div, ie({ "data-state": p ? "active" : "inactive", "data-orientation": a.orientation, role: "tabpanel", "aria-labelledby": l, hidden: !f, id: u, tabIndex: 0 }, c, { ref: t, style: { ...e.style, animationDuration: d.current ? "0s" : void 0 } }), f && s));
});
function Cc(e, t) {
  return `${e}-trigger-${t}`;
}
function xc(e, t) {
  return `${e}-content-${t}`;
}
const ov = Pm, rv = _m, sv = Am, iv = Om;
export {
  iv as $,
  nv as A,
  ph as B,
  yh as C,
  vh as D,
  Kh as E,
  mh as F,
  zh as G,
  Yh as H,
  Xh as I,
  ch as J,
  ah as K,
  hh as L,
  lh as M,
  uh as N,
  dh as O,
  wh as P,
  Rh as Q,
  Dt as R,
  Gh as S,
  xh as T,
  Th as U,
  Ah as V,
  Mh as W,
  Oh as X,
  $h as Y,
  Dh as Z,
  Fh as _,
  nu as a,
  Bh as a0,
  jh as a1,
  Lh as a2,
  km as a3,
  jm as a4,
  Lm as a5,
  Vm as a6,
  Bm as a7,
  Um as a8,
  Gm as a9,
  Ch as aa,
  eh as ab,
  th as ac,
  nh as ad,
  oh as ae,
  rh as af,
  Vh as ag,
  Wm as ah,
  Km as ai,
  Nm as aj,
  sh as ak,
  mu as b,
  lu as c,
  gu as d,
  bu as e,
  su as f,
  xu as g,
  Cu as h,
  pn as i,
  ov as j,
  sv as k,
  vu as l,
  rv as m,
  bh as n,
  ou as o,
  Eh as p,
  Ph as q,
  Ih as r,
  hu as s,
  Hh as t,
  fu as u,
  Zh as v,
  Qh as w,
  Jh as x,
  ev as y,
  tv as z
};
