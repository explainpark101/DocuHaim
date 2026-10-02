var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _e2, _a;
import { r as c, a as ut, j as C, b as Et } from "./vendor-react-BLJzfvPB.js";
import { a as $e, b as _r, c as Ks } from "./vendor-aws-Cvd3RhZI.js";
var zs = Object.defineProperty, uo = (e, t) => zs(e, "name", { value: t, configurable: true });
function Gn(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
uo(Gn, "setRef");
function Tr(...e) {
  return (t) => {
    let n = false;
    const o = e.map((r) => {
      const i = Gn(r, t);
      return !n && typeof i == "function" && (n = true), i;
    });
    if (n) return () => {
      for (let r = 0; r < o.length; r++) {
        const i = o[r];
        typeof i == "function" ? i() : Gn(e[r], null);
      }
    };
  };
}
uo(Tr, "composeRefs");
function B(...e) {
  return c.useCallback(Tr(...e), e);
}
uo(B, "useComposedRefs");
var Ys = Object.defineProperty, xe = (e, t) => Ys(e, "name", { value: t, configurable: true });
function ye(e) {
  const t = c.forwardRef((n, o) => {
    let { children: r, ...i } = n, s = null, a = false;
    const l = [];
    Wn(r) && typeof $t == "function" && (r = $t(r._payload)), c.Children.forEach(r, (d) => {
      var _a3;
      if (kr(d)) {
        a = true;
        const h = d;
        let m = "child" in h.props ? h.props.child : h.props.children;
        Wn(m) && typeof $t == "function" && (m = $t(m._payload)), s = Xs(h, m), l.push((_a3 = s == null ? void 0 : s.props) == null ? void 0 : _a3.children);
      } else l.push(d);
    }), s ? s = c.cloneElement(s, void 0, l) : !a && c.Children.count(r) === 1 && c.isValidElement(r) && (s = r);
    const u = s ? Dr(s) : void 0, p = B(o, u);
    if (!s) {
      if (r || r === 0) throw new Error(a ? Qs(e) : Zs(e));
      return r;
    }
    const f = Ar(i, s.props ?? {});
    return s.type !== c.Fragment && (f.ref = o ? p : u), c.cloneElement(s, f);
  });
  return t.displayName = `${e}.Slot`, t;
}
xe(ye, "createSlot");
var Or = /* @__PURE__ */ Symbol.for("radix.slottable");
function Mr(e) {
  const t = xe((n) => "child" in n ? n.children(n.child) : n.children, "Slottable");
  return t.displayName = `${e}.Slottable`, t.__radixId = Or, t;
}
xe(Mr, "createSlottable");
var Xs = xe((e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return c.isValidElement(n) ? c.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return c.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function Ar(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...a) => {
      const l = i(...a);
      return r(...a), l;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
xe(Ar, "mergeProps");
function Dr(e) {
  var _a3, _b;
  let t = (_a3 = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : _a3.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (_b = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : _b.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
xe(Dr, "getElementRef");
function kr(e) {
  return c.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Or;
}
xe(kr, "isSlottable");
var qs = /* @__PURE__ */ Symbol.for("react.lazy");
function Wn(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === qs && "_payload" in e && Fr(e._payload);
}
xe(Wn, "isLazyComponent");
function Fr(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
xe(Fr, "isPromiseLike");
var Zs = xe((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), Qs = xe((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), $t = ut[" use ".trim().toString()], Js = Object.defineProperty, ec = (e, t) => Js(e, "name", { value: t, configurable: true }), tc = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"], L = tc.reduce((e, t) => {
  const n = ye(`Primitive.${t}`), o = c.forwardRef((r, i) => {
    const { asChild: s, ...a } = r, l = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = true), C.jsx(l, { ...a, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function fo(e, t) {
  e && Et.flushSync(() => e.dispatchEvent(t));
}
ec(fo, "dispatchDiscreteCustomEvent");
var nc = Object.defineProperty, oc = (e, t) => nc(e, "name", { value: t, configurable: true }), jr = Object.freeze({ position: "absolute", border: 0, width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", wordWrap: "normal" }), rc = c.forwardRef(oc(function(t, n) {
  return C.jsx(L.span, { ...t, ref: n, style: { ...jr, ...t.style } });
}, "VisuallyHidden")), ic = rc, sc = Object.defineProperty, ve = (e, t) => sc(e, "name", { value: t, configurable: true });
function cc(e, t) {
  const n = c.createContext(t);
  n.displayName = e + "Context";
  const o = ve((i) => {
    const { children: s, ...a } = i, l = c.useMemo(() => a, Object.values(a));
    return C.jsx(n.Provider, { value: l, children: s });
  }, "Provider");
  o.displayName = e + "Provider";
  function r(i, s = {}) {
    const { optional: a = false } = s, l = c.useContext(n);
    if (l) return l;
    if (t !== void 0) return t;
    if (!a) throw new Error(`\`${i}\` must be used within \`${e}\``);
  }
  return ve(r, "useContext"), [o, r];
}
ve(cc, "createContext");
function ne(e, t = []) {
  let n = [];
  function o(i, s) {
    const a = c.createContext(s);
    a.displayName = i + "Context";
    const l = n.length;
    n = [...n, s];
    const u = ve((f) => {
      var _a3;
      const { scope: d, children: h, ...m } = f, v = ((_a3 = d == null ? void 0 : d[e]) == null ? void 0 : _a3[l]) || a, g = c.useMemo(() => m, Object.values(m));
      return C.jsx(v.Provider, { value: g, children: h });
    }, "Provider");
    u.displayName = i + "Provider";
    function p(f, d, h = {}) {
      var _a3;
      const { optional: m = false } = h, v = ((_a3 = d == null ? void 0 : d[e]) == null ? void 0 : _a3[l]) || a, g = c.useContext(v);
      if (g) return g;
      if (s !== void 0) return s;
      if (!m) throw new Error(`\`${f}\` must be used within \`${i}\``);
    }
    return ve(p, "useContext"), [u, p];
  }
  ve(o, "createContext");
  const r = ve(() => {
    const i = n.map((s) => c.createContext(s));
    return ve(function(a) {
      const l = (a == null ? void 0 : a[e]) || i;
      return c.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: l } }), [a, l]);
    }, "useScope");
  }, "createScope");
  return r.scopeName = e, [o, Nr(r, ...t)];
}
ve(ne, "createContextScope");
function Nr(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = ve(() => {
    const o = e.map((r) => ({ useScope: r(), scopeName: r.scopeName }));
    return ve(function(i) {
      const s = o.reduce((a, { useScope: l, scopeName: u }) => {
        const f = l(i)[`__scope${u}`];
        return { ...a, ...f };
      }, {});
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    }, "useComposedScopes");
  }, "createScope");
  return n.scopeName = t.scopeName, n;
}
ve(Nr, "composeContextScopes");
var ac = Object.defineProperty, te = (e, t) => ac(e, "name", { value: t, configurable: true });
function rn(e) {
  const t = e + "CollectionProvider", [n, o] = ne(t), [r, i] = n(t, { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }), s = te((v) => {
    const { scope: g, children: w } = v, y = c.useRef(null), x = c.useRef(/* @__PURE__ */ new Map()).current;
    return C.jsx(r, { scope: g, itemMap: x, collectionRef: y, children: w });
  }, "CollectionProvider");
  s.displayName = t;
  const a = e + "CollectionSlot", l = ye(a), u = c.forwardRef((v, g) => {
    const { scope: w, children: y } = v, x = i(a, w), b = B(g, x.collectionRef);
    return C.jsx(l, { ref: b, children: y });
  });
  u.displayName = a;
  const p = e + "CollectionItemSlot", f = "data-radix-collection-item", d = ye(p), h = c.forwardRef((v, g) => {
    const { scope: w, children: y, ...x } = v, b = c.useRef(null), P = B(g, b), R = i(p, w);
    return c.useEffect(() => (R.itemMap.set(b, { ref: b, ...x }), () => {
      R.itemMap.delete(b);
    })), C.jsx(d, { [f]: "", ref: P, children: y });
  });
  h.displayName = p;
  function m(v) {
    const g = i(e + "CollectionConsumer", v);
    return c.useCallback(() => {
      const y = g.collectionRef.current;
      if (!y) return [];
      const x = Array.from(y.querySelectorAll(`[${f}]`));
      return Array.from(g.itemMap.values()).sort((R, S) => x.indexOf(R.ref.current) - x.indexOf(S.ref.current));
    }, [g.collectionRef, g.itemMap]);
  }
  return te(m, "useCollection"), [{ Provider: s, Slot: u, ItemSlot: h }, m, o];
}
te(rn, "createCollection");
var tr = /* @__PURE__ */ new WeakMap(), Mn = (_a = class extends Map {
  constructor(t) {
    super(t);
    __privateAdd(this, _e2);
    __privateSet(this, _e2, [...super.keys()]), tr.set(this, true);
  }
  set(t, n) {
    return tr.get(this) && (this.has(t) ? __privateGet(this, _e2)[__privateGet(this, _e2).indexOf(t)] = t : __privateGet(this, _e2).push(t)), super.set(t, n), this;
  }
  insert(t, n, o) {
    const r = this.has(n), i = __privateGet(this, _e2).length, s = po(t);
    let a = s >= 0 ? s : i + s;
    const l = a < 0 || a >= i ? -1 : a;
    if (l === this.size || r && l === this.size - 1 || l === -1) return this.set(n, o), this;
    const u = this.size + (r ? 0 : 1);
    s < 0 && a++;
    const p = [...__privateGet(this, _e2)];
    let f, d = false;
    for (let h = a; h < u; h++) if (a === h) {
      let m = p[h];
      p[h] === n && (m = p[h + 1]), r && this.delete(n), f = this.get(m), this.set(n, o);
    } else {
      !d && p[h - 1] === n && (d = true);
      const m = p[d ? h : h - 1], v = f;
      f = this.get(m), this.delete(m), this.set(m, v);
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
    const n = Yt(__privateGet(this, _e2), t);
    if (n !== void 0) return this.get(n);
  }
  entryAt(t) {
    const n = Yt(__privateGet(this, _e2), t);
    if (n !== void 0) return [n, this.get(n)];
  }
  indexOf(t) {
    return __privateGet(this, _e2).indexOf(t);
  }
  keyAt(t) {
    return Yt(__privateGet(this, _e2), t);
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
    for (const i of this) Reflect.apply(t, n, [i, r, this]) && o.push(i), r++;
    return new _a(o);
  }
  map(t, n) {
    const o = [];
    let r = 0;
    for (const i of this) o.push([i[0], Reflect.apply(t, n, [i, r, this])]), r++;
    return new _a(o);
  }
  reduce(...t) {
    const [n, o] = t;
    let r = 0, i = o ?? this.at(0);
    for (const s of this) r === 0 && t.length === 1 ? i = s : i = Reflect.apply(n, this, [i, s, r, this]), r++;
    return i;
  }
  reduceRight(...t) {
    const [n, o] = t;
    let r = o ?? this.at(-1);
    for (let i = this.size - 1; i >= 0; i--) {
      const s = this.at(i);
      i === this.size - 1 && t.length === 1 ? r = s : r = Reflect.apply(n, this, [r, s, i, this]);
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
    for (let i = t; i <= r; i++) {
      const s = this.keyAt(i), a = this.get(s);
      o.set(s, a);
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
function Yt(e, t) {
  if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
  const n = Lr(e, t);
  return n === -1 ? void 0 : e[n];
}
te(Yt, "at");
function Lr(e, t) {
  const n = e.length, o = po(t), r = o >= 0 ? o : n + o;
  return r < 0 || r >= n ? -1 : r;
}
te(Lr, "toSafeIndex");
function po(e) {
  return e !== e || e === 0 ? 0 : Math.trunc(e);
}
te(po, "toSafeInteger");
function lc(e) {
  const t = e + "CollectionProvider", [n, o] = ne(t), [r, i] = n(t, { collectionElement: null, collectionRef: { current: null }, collectionRefObject: { current: null }, itemMap: new Mn(), setItemMap: te(() => {
  }, "setItemMap") }), s = te(({ state: x, ...b }) => x ? C.jsx(l, { ...b, state: x }) : C.jsx(a, { ...b }), "CollectionProvider");
  s.displayName = t;
  const a = te((x) => {
    const b = g();
    return C.jsx(l, { ...x, state: b });
  }, "CollectionInit");
  a.displayName = t + "Init";
  const l = te((x) => {
    const { scope: b, children: P, state: R } = x, S = c.useRef(null), [T, O] = c.useState(null), D = B(S, O), [E, I] = R;
    return c.useEffect(() => {
      if (!T) return;
      const M = Vr(() => {
      });
      return M.observe(T, { childList: true, subtree: true }), () => {
        M.disconnect();
      };
    }, [T]), C.jsx(r, { scope: b, itemMap: E, setItemMap: I, collectionRef: D, collectionRefObject: S, collectionElement: T, children: P });
  }, "CollectionProviderImpl");
  l.displayName = t + "Impl";
  const u = e + "CollectionSlot", p = ye(u), f = c.forwardRef((x, b) => {
    const { scope: P, children: R } = x, S = i(u, P), T = B(b, S.collectionRef);
    return C.jsx(p, { ref: T, children: R });
  });
  f.displayName = u;
  const d = e + "CollectionItemSlot", h = "data-radix-collection-item", m = ye(d), v = c.forwardRef((x, b) => {
    const { scope: P, children: R, ...S } = x, T = c.useRef(null), [O, D] = c.useState(null), E = B(b, T, D), I = i(d, P), { setItemMap: M } = I, F = c.useRef(S);
    $r(F.current, S) || (F.current = S);
    const H = F.current;
    return c.useEffect(() => {
      const j = H;
      return M((N) => O ? N.has(O) ? N.set(O, { ...j, element: O }).toSorted(Un) : (N.set(O, { ...j, element: O }), N.toSorted(Un)) : N), () => {
        M((N) => !O || !N.has(O) ? N : (N.delete(O), new Mn(N)));
      };
    }, [O, H, M]), C.jsx(m, { [h]: "", ref: E, children: R });
  });
  v.displayName = d;
  function g() {
    return c.useState(new Mn());
  }
  te(g, "useInitCollection");
  function w(x) {
    const { itemMap: b } = i(e + "CollectionConsumer", x);
    return b;
  }
  return te(w, "useCollection"), [{ Provider: s, Slot: f, ItemSlot: v }, { createCollectionScope: o, useCollection: w, useInitCollection: g }];
}
te(lc, "createCollection");
function $r(e, t) {
  if (e === t) return true;
  if (typeof e != "object" || typeof t != "object" || e == null || t == null) return false;
  const n = Object.keys(e), o = Object.keys(t);
  if (n.length !== o.length) return false;
  for (const r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || e[r] !== t[r]) return false;
  return true;
}
te($r, "shallowEqual");
function Br(e, t) {
  return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
te(Br, "isElementPreceding");
function Un(e, t) {
  return !e[1].element || !t[1].element ? 0 : Br(e[1].element, t[1].element) ? -1 : 1;
}
te(Un, "sortByDocumentPosition");
function Vr(e) {
  return new MutationObserver((n) => {
    for (const o of n) if (o.type === "childList") {
      e();
      return;
    }
  });
}
te(Vr, "getChildListObserver");
var uc = Object.defineProperty, dt = (e, t) => uc(e, "name", { value: t, configurable: true }), Hr = !!(typeof window < "u" && window.document && window.document.createElement);
function _(e, t, { checkForDefaultPrevented: n = true } = {}) {
  return dt(function(r) {
    if (e == null ? void 0 : e(r), n === false || !r || !r.defaultPrevented) return t == null ? void 0 : t(r);
  }, "handleEvent");
}
dt(_, "composeEventHandlers");
function dc(e) {
  var _a3;
  if (!Hr) throw new Error("Cannot access window outside of the DOM");
  return ((_a3 = e == null ? void 0 : e.ownerDocument) == null ? void 0 : _a3.defaultView) ?? window;
}
dt(dc, "getOwnerWindow");
function Kn(e) {
  if (!Hr) throw new Error("Cannot access document outside of the DOM");
  return (e == null ? void 0 : e.ownerDocument) ?? document;
}
dt(Kn, "getOwnerDocument");
function Gr(e, t = false) {
  const { activeElement: n } = Kn(e);
  if (!(n == null ? void 0 : n.nodeName)) return null;
  if (Wr(n) && n.contentDocument) return Gr(n.contentDocument.body, t);
  if (t) {
    const o = n.getAttribute("aria-activedescendant");
    if (o) {
      const r = Kn(n).getElementById(o);
      if (r) return r;
    }
  }
  return n;
}
dt(Gr, "getActiveElement");
function Wr(e) {
  return e.tagName === "IFRAME";
}
dt(Wr, "isFrame");
var Q = (globalThis == null ? void 0 : globalThis.document) ? c.useLayoutEffect : () => {
}, fc = Object.defineProperty, pc = (e, t) => fc(e, "name", { value: t, configurable: true }), nr = ut[" useEffectEvent ".trim().toString()], or = ut[" useInsertionEffect ".trim().toString()];
function Ur(e) {
  if (typeof nr == "function") return nr(e);
  const t = c.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof or == "function" ? or(() => {
    t.current = e;
  }) : Q(() => {
    t.current = e;
  }), c.useMemo(() => ((...n) => {
    var _a3;
    return (_a3 = t.current) == null ? void 0 : _a3.call(t, ...n);
  }), []);
}
pc(Ur, "useEffectEvent");
var hc = Object.defineProperty, It = (e, t) => hc(e, "name", { value: t, configurable: true }), mc = ut[" useInsertionEffect ".trim().toString()] || Q;
function de({ prop: e, defaultProp: t, onChange: n = It(() => {
}, "onChange"), caller: o }) {
  const [r, i, s] = Kr({ defaultProp: t, onChange: n }), a = e !== void 0, l = a ? e : r, u = c.useCallback((p) => {
    var _a3;
    if (a) {
      const f = zr(p) ? p(e) : p;
      f !== e && ((_a3 = s.current) == null ? void 0 : _a3.call(s, f));
    } else i(p);
  }, [a, e, i, s]);
  return [l, u];
}
It(de, "useControllableState");
function Kr({ defaultProp: e, onChange: t }) {
  const [n, o] = c.useState(e), r = c.useRef(n), i = c.useRef(t);
  return mc(() => {
    i.current = t;
  }, [t]), c.useEffect(() => {
    var _a3;
    r.current !== n && ((_a3 = i.current) == null ? void 0 : _a3.call(i, n), r.current = n);
  }, [n, r]), [n, o, i];
}
It(Kr, "useUncontrolledState");
function zr(e) {
  return typeof e == "function";
}
It(zr, "isFunction");
var rr = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function vc(e, t, n, o) {
  const { prop: r, defaultProp: i, onChange: s, caller: a } = t, l = r !== void 0, u = Ur(s), p = [{ ...n, state: i }];
  o && p.push(o);
  const [f, d] = c.useReducer((g, w) => {
    if (w.type === rr) return { ...g, state: w.state };
    const y = e(g, w);
    return l && !Object.is(y.state, g.state) && u(y.state), y;
  }, ...p), h = f.state, m = c.useRef(h);
  c.useEffect(() => {
    m.current !== h && (m.current = h, l || u(h));
  }, [h, m, l]);
  const v = c.useMemo(() => r !== void 0 ? { ...f, state: r } : f, [f, r]);
  return c.useEffect(() => {
    l && !Object.is(r, f.state) && d({ type: rr, state: r });
  }, [r, f.state, l]), [v, d];
}
It(vc, "useControllableStateReducer");
var gc = Object.defineProperty, ke = (e, t) => gc(e, "name", { value: t, configurable: true });
function Yr(e, t) {
  return c.useReducer((n, o) => t[n][o] ?? n, e);
}
ke(Yr, "useStateMachine");
var fe = ke((e) => {
  const { present: t, children: n } = e, o = Xr(t), r = typeof n == "function" ? n({ present: o.isPresent }) : c.Children.only(n), i = qr(o.ref, Zr(r));
  return typeof n == "function" || o.isPresent ? c.cloneElement(r, { ref: i }) : null;
}, "Presence");
function Xr(e) {
  const [t, n] = c.useState(), o = c.useRef(null), r = c.useRef(e), i = c.useRef("none"), s = c.useRef(void 0), a = e ? "mounted" : "unmounted", [l, u] = Yr(a, { mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" }, unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" }, unmounted: { MOUNT: "mounted" } });
  return c.useEffect(() => {
    l === "mounted" ? (i.current = s.current ?? it(o.current), s.current = void 0) : i.current = "none";
  }, [l]), Q(() => {
    const p = o.current, f = r.current;
    if (f !== e) {
      const h = i.current, m = it(p);
      e ? (s.current = m, u("MOUNT")) : m === "none" || (p == null ? void 0 : p.display) === "none" ? u("UNMOUNT") : u(f && h !== m ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, u]), Q(() => {
    if (t) {
      let p;
      const f = t.ownerDocument.defaultView ?? window, d = ke((m) => {
        const g = it(o.current).includes(CSS.escape(m.animationName));
        if (m.target === t && g && (u("ANIMATION_END"), !r.current)) {
          const w = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", p = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = w);
          });
        }
      }, "handleAnimationEnd"), h = ke((m) => {
        m.target === t && (i.current = it(o.current));
      }, "handleAnimationStart");
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        f.clearTimeout(p), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else u("ANIMATION_END");
  }, [t, u]), { isPresent: ["mounted", "unmountSuspended"].includes(l), ref: c.useCallback((p) => {
    if (p) {
      const f = getComputedStyle(p);
      o.current = f, s.current = it(f);
    } else o.current = null;
    n(p);
  }, []) };
}
ke(Xr, "usePresence");
function zn(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
ke(zn, "setRef");
function qr(...e) {
  const t = c.useRef(e);
  return t.current = e, c.useCallback((n) => {
    const o = t.current;
    let r = false;
    const i = o.map((s) => {
      const a = zn(s, n);
      return !r && typeof a == "function" && (r = true), a;
    });
    if (r) return () => {
      for (let s = 0; s < i.length; s++) {
        const a = i[s];
        typeof a == "function" ? a() : zn(o[s], null);
      }
    };
  }, []);
}
ke(qr, "useStableComposedRefs");
function it(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
ke(it, "getAnimationName");
function Zr(e) {
  var _a3, _b;
  let t = (_a3 = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : _a3.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (_b = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : _b.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
ke(Zr, "getElementRef");
var Cc = Object.defineProperty, xc = (e, t) => Cc(e, "name", { value: t, configurable: true }), bc = ut[" useId ".trim().toString()] || (() => {
}), wc = 0;
function ue(e) {
  const [t, n] = c.useState(bc());
  return Q(() => {
    e || n((o) => o ?? String(wc++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
xc(ue, "useId");
var yc = Object.defineProperty, Rc = (e, t) => yc(e, "name", { value: t, configurable: true }), Pc = c.createContext(void 0);
function ft(e) {
  const t = c.useContext(Pc);
  return e || t || "ltr";
}
Rc(ft, "useDirection");
var Sc = Object.defineProperty, Ec = (e, t) => Sc(e, "name", { value: t, configurable: true });
function ge(e) {
  const t = c.useRef(e);
  return c.useEffect(() => {
    t.current = e;
  }), c.useMemo(() => ((...n) => {
    var _a3;
    return (_a3 = t.current) == null ? void 0 : _a3.call(t, ...n);
  }), []);
}
Ec(ge, "useCallbackRef");
var Ic = Object.defineProperty, ee = (e, t) => Ic(e, "name", { value: t, configurable: true }), Yn = "dismissableLayer.update", _c = "dismissableLayer.pointerDownOutside", Tc = "dismissableLayer.focusOutside", ir, Qr = c.createContext({ layers: /* @__PURE__ */ new Set(), layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(), branches: /* @__PURE__ */ new Set(), dismissableSurfaces: /* @__PURE__ */ new Set() }), _t = c.forwardRef(ee(function(t, n) {
  const { disableOutsidePointerEvents: o = false, deferPointerDownOutside: r = false, onEscapeKeyDown: i, onPointerDownOutside: s, onFocusOutside: a, onInteractOutside: l, onDismiss: u, ...p } = t, f = c.useContext(Qr), [d, h] = c.useState(null), m = (d == null ? void 0 : d.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, v] = c.useState({}), g = B(n, h), w = Array.from(f.layers), [y] = [...f.layersWithOutsidePointerEventsDisabled].slice(-1), x = y ? w.indexOf(y) : -1, b = d ? w.indexOf(d) : -1, P = f.layersWithOutsidePointerEventsDisabled.size > 0, R = b >= x, S = c.useRef(false), T = ei((I) => {
    s == null ? void 0 : s(I), l == null ? void 0 : l(I), I.defaultPrevented || (u == null ? void 0 : u());
  }, { ownerDocument: m, deferPointerDownOutside: r, isDeferredPointerDownOutsideRef: S, dismissableSurfaces: f.dismissableSurfaces, shouldHandlePointerDownOutside: c.useCallback((I) => {
    if (!(I instanceof Node)) return false;
    const M = [...f.branches].some((F) => F.contains(I));
    return R && !M;
  }, [f.branches, R]) }), O = ti((I) => {
    if (r && S.current) return;
    const M = I.target;
    [...f.branches].some((H) => H.contains(M)) || (a == null ? void 0 : a(I), l == null ? void 0 : l(I), I.defaultPrevented || (u == null ? void 0 : u()));
  }, m), D = d ? b === w.length - 1 : false, E = ge((I) => {
    I.key === "Escape" && (i == null ? void 0 : i(I), !I.defaultPrevented && u && (I.preventDefault(), u()));
  });
  return c.useEffect(() => {
    if (D) return m.addEventListener("keydown", E, { capture: true }), () => m.removeEventListener("keydown", E, { capture: true });
  }, [m, D, E]), c.useEffect(() => {
    if (d) return o && (f.layersWithOutsidePointerEventsDisabled.size === 0 && (ir = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), f.layersWithOutsidePointerEventsDisabled.add(d)), f.layers.add(d), Xn(), () => {
      o && (f.layersWithOutsidePointerEventsDisabled.delete(d), f.layersWithOutsidePointerEventsDisabled.size === 0 && (m.body.style.pointerEvents = ir));
    };
  }, [d, m, o, f]), c.useEffect(() => () => {
    d && (f.layers.delete(d), f.layersWithOutsidePointerEventsDisabled.delete(d), Xn());
  }, [d, f]), c.useEffect(() => {
    const I = ee(() => v({}), "handleUpdate");
    return document.addEventListener(Yn, I), () => document.removeEventListener(Yn, I);
  }, []), C.jsx(L.div, { ...p, ref: g, style: { pointerEvents: P ? R ? "auto" : "none" : void 0, ...t.style }, onFocusCapture: _(t.onFocusCapture, O.onFocusCapture), onBlurCapture: _(t.onBlurCapture, O.onBlurCapture), onPointerDownCapture: _(t.onPointerDownCapture, T.onPointerDownCapture) });
}, "DismissableLayer"));
function Jr() {
  const e = c.useContext(Qr), [t, n] = c.useState(null);
  return c.useEffect(() => {
    if (t) return e.dismissableSurfaces.add(t), () => {
      e.dismissableSurfaces.delete(t);
    };
  }, [t, e.dismissableSurfaces]), n;
}
ee(Jr, "useDismissableLayerSurface");
var Oc = ee(() => true, "IS_TRUE");
function ei(e, t) {
  const { ownerDocument: n = globalThis == null ? void 0 : globalThis.document, deferPointerDownOutside: o = false, isDeferredPointerDownOutsideRef: r, dismissableSurfaces: i, shouldHandlePointerDownOutside: s = Oc } = t, a = ge(e), l = c.useRef(false), u = c.useRef(false), p = c.useRef(/* @__PURE__ */ new Map()), f = c.useRef(() => {
  });
  return c.useEffect(() => {
    function d() {
      u.current = false, r.current = false, p.current.clear();
    }
    ee(d, "resetOutsideInteraction");
    function h() {
      return Array.from(p.current.values()).some(Boolean);
    }
    ee(h, "isOutsideInteractionIntercepted");
    function m(x) {
      if (!u.current) return;
      const b = x.target;
      b instanceof Node && [...i].some((R) => R.contains(b)) || p.current.set(x.type, true), x.type === "click" && window.setTimeout(() => {
        u.current && f.current();
      }, 0);
    }
    ee(m, "handleInteractionCapture");
    function v(x) {
      u.current && p.current.set(x.type, false);
    }
    ee(v, "handleInteractionBubble");
    const g = ee((x) => {
      if (x.target && !l.current) {
        let b = function() {
          n.removeEventListener("click", f.current);
          const R = h();
          d(), R || ho(_c, a, P, { discrete: true });
        };
        if (ee(b, "handleAndDispatchPointerDownOutsideEvent"), !s(x.target)) {
          n.removeEventListener("click", f.current), d(), l.current = false;
          return;
        }
        const P = { originalEvent: x };
        u.current = true, r.current = o && x.button === 0, p.current.clear(), !o || x.button !== 0 ? b() : (n.removeEventListener("click", f.current), f.current = b, n.addEventListener("click", f.current, { once: true }));
      } else n.removeEventListener("click", f.current), d();
      l.current = false;
    }, "handlePointerDown"), w = ["pointerup", "mousedown", "mouseup", "touchstart", "touchend", "click"];
    for (const x of w) n.addEventListener(x, m, true), n.addEventListener(x, v);
    const y = window.setTimeout(() => {
      n.addEventListener("pointerdown", g);
    }, 0);
    return () => {
      window.clearTimeout(y), n.removeEventListener("pointerdown", g), n.removeEventListener("click", f.current);
      for (const x of w) n.removeEventListener(x, m, true), n.removeEventListener(x, v);
    };
  }, [n, a, o, r, i, s]), { onPointerDownCapture: ee(() => l.current = true, "onPointerDownCapture") };
}
ee(ei, "usePointerDownOutside");
function ti(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ge(e), o = c.useRef(false);
  return c.useEffect(() => {
    const r = ee((i) => {
      i.target && !o.current && ho(Tc, n, { originalEvent: i }, { discrete: false });
    }, "handleFocus");
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), { onFocusCapture: ee(() => o.current = true, "onFocusCapture"), onBlurCapture: ee(() => o.current = false, "onBlurCapture") };
}
ee(ti, "useFocusOutside");
function Xn() {
  const e = new CustomEvent(Yn);
  document.dispatchEvent(e);
}
ee(Xn, "dispatchUpdate");
function ho(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, i = new CustomEvent(e, { bubbles: false, cancelable: true, detail: n });
  t && r.addEventListener(e, t, { once: true }), o ? fo(r, i) : r.dispatchEvent(i);
}
ee(ho, "handleAndDispatchCustomEvent");
var Mc = Object.defineProperty, se = (e, t) => Mc(e, "name", { value: t, configurable: true }), An = "focusScope.autoFocusOnMount", Dn = "focusScope.autoFocusOnUnmount", sr = { bubbles: false, cancelable: true }, sn = c.forwardRef(se(function(t, n) {
  const { loop: o = false, trapped: r = false, onMountAutoFocus: i, onUnmountAutoFocus: s, ...a } = t, [l, u] = c.useState(null), p = ge(i), f = ge(s), d = c.useRef(null), h = B(n, u), m = c.useRef({ paused: false, pause() {
    this.paused = true;
  }, resume() {
    this.paused = false;
  } }).current;
  c.useEffect(() => {
    if (r) {
      let g = function(b) {
        if (m.paused || !l) return;
        const P = b.target;
        l.contains(P) ? d.current = P : _e(d.current, { select: true });
      }, w = function(b) {
        if (m.paused || !l) return;
        const P = b.relatedTarget;
        P !== null && (l.contains(P) || _e(d.current, { select: true }));
      }, y = function(b) {
        if (document.activeElement === document.body) for (const R of b) R.removedNodes.length > 0 && _e(l);
      };
      se(g, "handleFocusIn"), se(w, "handleFocusOut"), se(y, "handleMutations"), document.addEventListener("focusin", g), document.addEventListener("focusout", w);
      const x = new MutationObserver(y);
      return l && x.observe(l, { childList: true, subtree: true }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", w), x.disconnect();
      };
    }
  }, [r, l, m.paused]), c.useEffect(() => {
    if (l) {
      cr.add(m);
      const g = document.activeElement;
      if (!l.contains(g)) {
        const y = new CustomEvent(An, sr);
        l.addEventListener(An, p), l.dispatchEvent(y), y.defaultPrevented || (ni(ci(mo(l)), { select: true }), document.activeElement === g && _e(l));
      }
      return () => {
        l.removeEventListener(An, p), setTimeout(() => {
          const y = new CustomEvent(Dn, sr);
          l.addEventListener(Dn, f), l.dispatchEvent(y), y.defaultPrevented || _e(g ?? document.body, { select: true }), l.removeEventListener(Dn, f), cr.remove(m);
        }, 0);
      };
    }
  }, [l, p, f, m]);
  const v = c.useCallback((g) => {
    if (!o && !r || m.paused) return;
    const w = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, y = document.activeElement;
    if (w && y) {
      const x = g.currentTarget, [b, P] = oi(x);
      b && P ? !g.shiftKey && y === P ? (g.preventDefault(), o && _e(b, { select: true })) : g.shiftKey && y === b && (g.preventDefault(), o && _e(P, { select: true })) : y === x && g.preventDefault();
    }
  }, [o, r, m.paused]);
  return C.jsx(L.div, { tabIndex: -1, ...a, ref: h, onKeyDown: v });
}, "FocusScope"));
function ni(e, { select: t = false } = {}) {
  const n = document.activeElement;
  for (const o of e) if (_e(o, { select: t }), document.activeElement !== n) return;
}
se(ni, "focusFirst");
function oi(e) {
  const t = mo(e), n = qn(t, e), o = qn(t.reverse(), e);
  return [n, o];
}
se(oi, "getTabbableEdges");
function mo(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: se((o) => {
    const r = o.tagName === "INPUT" && o.type === "hidden";
    return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  }, "acceptNode") });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
se(mo, "getTabbableCandidates");
function qn(e, t) {
  const n = typeof t.checkVisibility == "function" && t.checkVisibility({ checkVisibilityCSS: true });
  for (const o of e) if (!(n ? !o.checkVisibility({ checkVisibilityCSS: true }) : ri(o, { upTo: t }))) return o;
}
se(qn, "findVisible");
function ri(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return true;
  for (; e; ) {
    if (t !== void 0 && e === t) return false;
    if (getComputedStyle(e).display === "none") return true;
    e = e.parentElement;
  }
  return false;
}
se(ri, "isHidden");
function ii(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
se(ii, "isSelectableInput");
function _e(e, { select: t = false } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: true }), e !== n && ii(e) && t && e.select();
  }
}
se(_e, "focus");
var cr = si();
function si() {
  let e = [];
  return { add(t) {
    const n = e[0];
    t !== n && (n == null ? void 0 : n.pause()), e = Zn(e, t), e.unshift(t);
  }, remove(t) {
    var _a3;
    e = Zn(e, t), (_a3 = e[0]) == null ? void 0 : _a3.resume();
  } };
}
se(si, "createFocusScopesStack");
function Zn(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
se(Zn, "arrayRemove");
function ci(e) {
  return e.filter((t) => t.tagName !== "A");
}
se(ci, "removeLinks");
var Ac = Object.defineProperty, Dc = (e, t) => Ac(e, "name", { value: t, configurable: true }), Tt = c.forwardRef(Dc(function(t, n) {
  var _a3;
  const { container: o, ...r } = t, [i, s] = c.useState(false);
  Q(() => s(true), []);
  const a = o || i && ((_a3 = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a3.body);
  return a ? Et.createPortal(C.jsx(L.div, { ...r, ref: n }), a) : null;
}, "Portal")), kc = Object.defineProperty, vo = (e, t) => kc(e, "name", { value: t, configurable: true }), Bt = 0, tt = null;
function Fc(e) {
  return pt(), e.children;
}
vo(Fc, "FocusGuards");
function pt() {
  c.useEffect(() => {
    tt || (tt = { start: Qn(), end: Qn() });
    const { start: e, end: t } = tt;
    return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), Bt++, () => {
      Bt === 1 && (tt == null ? void 0 : tt.start.remove(), tt == null ? void 0 : tt.end.remove(), tt = null), Bt = Math.max(0, Bt - 1);
    };
  }, []);
}
vo(pt, "useFocusGuards");
function Qn() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
vo(Qn, "createFocusGuard");
var Xt = "right-scroll-bar-position", qt = "width-before-scroll-bar", jc = "with-scroll-bars-hidden", Nc = "--removed-body-scroll-bar-size";
function kn(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Lc(e, t) {
  var n = c.useState(function() {
    return { value: e, callback: t, facade: { get current() {
      return n.value;
    }, set current(o) {
      var r = n.value;
      r !== o && (n.value = o, n.callback(o, r));
    } } };
  })[0];
  return n.callback = t, n.facade;
}
var $c = typeof window < "u" ? c.useLayoutEffect : c.useEffect, ar = /* @__PURE__ */ new WeakMap();
function Bc(e, t) {
  var n = Lc(null, function(o) {
    return e.forEach(function(r) {
      return kn(r, o);
    });
  });
  return $c(function() {
    var o = ar.get(n);
    if (o) {
      var r = new Set(o), i = new Set(e), s = n.current;
      r.forEach(function(a) {
        i.has(a) || kn(a, null);
      }), i.forEach(function(a) {
        r.has(a) || kn(a, s);
      });
    }
    ar.set(n, e);
  }, [e]), n;
}
function Vc(e) {
  return e;
}
function Hc(e, t) {
  t === void 0 && (t = Vc);
  var n = [], o = false, r = { read: function() {
    if (o) throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
    return n.length ? n[n.length - 1] : e;
  }, useMedium: function(i) {
    var s = t(i, o);
    return n.push(s), function() {
      n = n.filter(function(a) {
        return a !== s;
      });
    };
  }, assignSyncMedium: function(i) {
    for (o = true; n.length; ) {
      var s = n;
      n = [], s.forEach(i);
    }
    n = { push: function(a) {
      return i(a);
    }, filter: function() {
      return n;
    } };
  }, assignMedium: function(i) {
    o = true;
    var s = [];
    if (n.length) {
      var a = n;
      n = [], a.forEach(i), s = n;
    }
    var l = function() {
      var p = s;
      s = [], p.forEach(i);
    }, u = function() {
      return Promise.resolve().then(l);
    };
    u(), n = { push: function(p) {
      s.push(p), u();
    }, filter: function(p) {
      return s = s.filter(p), n;
    } };
  } };
  return r;
}
function Gc(e) {
  e === void 0 && (e = {});
  var t = Hc(null);
  return t.options = $e({ async: true, ssr: false }, e), t;
}
var ai = function(e) {
  var t = e.sideCar, n = _r(e, ["sideCar"]);
  if (!t) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o) throw new Error("Sidecar medium not found");
  return c.createElement(o, $e({}, n));
};
ai.isSideCarExport = true;
function Wc(e, t) {
  return e.useMedium(t), ai;
}
var li = Gc(), Fn = function() {
}, cn = c.forwardRef(function(e, t) {
  var n = c.useRef(null), o = c.useState({ onScrollCapture: Fn, onWheelCapture: Fn, onTouchMoveCapture: Fn }), r = o[0], i = o[1], s = e.forwardProps, a = e.children, l = e.className, u = e.removeScrollBar, p = e.enabled, f = e.shards, d = e.sideCar, h = e.noRelative, m = e.noIsolation, v = e.inert, g = e.allowPinchZoom, w = e.as, y = w === void 0 ? "div" : w, x = e.gapMode, b = _r(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), P = d, R = Bc([n, t]), S = $e($e({}, b), r);
  return c.createElement(c.Fragment, null, p && c.createElement(P, { sideCar: li, removeScrollBar: u, shards: f, noRelative: h, noIsolation: m, inert: v, setCallbacks: i, allowPinchZoom: !!g, lockRef: n, gapMode: x }), s ? c.cloneElement(c.Children.only(a), $e($e({}, S), { ref: R })) : c.createElement(y, $e({}, S, { className: l, ref: R }), a));
});
cn.defaultProps = { enabled: true, removeScrollBar: true, inert: false };
cn.classNames = { fullWidth: qt, zeroRight: Xt };
var Uc = function() {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function Kc() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Uc();
  return t && e.setAttribute("nonce", t), e;
}
function zc(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Yc(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Xc = function() {
  var e = 0, t = null;
  return { add: function(n) {
    e == 0 && (t = Kc()) && (zc(t, n), Yc(t)), e++;
  }, remove: function() {
    e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
  } };
}, qc = function() {
  var e = Xc();
  return function(t, n) {
    c.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, ui = function() {
  var e = qc(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, Zc = { left: 0, top: 0, right: 0, gap: 0 }, jn = function(e) {
  return parseInt(e || "", 10) || 0;
}, Qc = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [jn(n), jn(o), jn(r)];
}, Jc = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u") return Zc;
  var t = Qc(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, o - n + t[2] - t[0]) };
}, ea = ui(), st = "data-scroll-locked", ta = function(e, t, n, o) {
  var r = e.left, i = e.top, s = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(jc, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(a, "px ").concat(o, `;
  }
  body[`).concat(st, `] {
    overflow: hidden `).concat(o, `;
    overscroll-behavior: contain;
    `).concat([t && "position: relative ".concat(o, ";"), n === "margin" && `
    padding-left: `.concat(r, `px;
    padding-top: `).concat(i, `px;
    padding-right: `).concat(s, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(a, "px ").concat(o, `;
    `), n === "padding" && "padding-right: ".concat(a, "px ").concat(o, ";")].filter(Boolean).join(""), `
  }
  
  .`).concat(Xt, ` {
    right: `).concat(a, "px ").concat(o, `;
  }
  
  .`).concat(qt, ` {
    margin-right: `).concat(a, "px ").concat(o, `;
  }
  
  .`).concat(Xt, " .").concat(Xt, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(qt, " .").concat(qt, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(st, `] {
    `).concat(Nc, ": ").concat(a, `px;
  }
`);
}, lr = function() {
  var e = parseInt(document.body.getAttribute(st) || "0", 10);
  return isFinite(e) ? e : 0;
}, na = function() {
  c.useEffect(function() {
    return document.body.setAttribute(st, (lr() + 1).toString()), function() {
      var e = lr() - 1;
      e <= 0 ? document.body.removeAttribute(st) : document.body.setAttribute(st, e.toString());
    };
  }, []);
}, oa = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  na();
  var i = c.useMemo(function() {
    return Jc(r);
  }, [r]);
  return c.createElement(ea, { styles: ta(i, !t, r, n ? "" : "!important") });
}, Jn = false;
if (typeof window < "u") try {
  var Vt = Object.defineProperty({}, "passive", { get: function() {
    return Jn = true, true;
  } });
  window.addEventListener("test", Vt, Vt), window.removeEventListener("test", Vt, Vt);
} catch {
  Jn = false;
}
var nt = Jn ? { passive: false } : false, ra = function(e) {
  return e.tagName === "TEXTAREA";
}, di = function(e, t) {
  if (!(e instanceof Element)) return false;
  var n = window.getComputedStyle(e);
  return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !ra(e) && n[t] === "visible");
}, ia = function(e) {
  return di(e, "overflowY");
}, sa = function(e) {
  return di(e, "overflowX");
}, ur = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = fi(e, o);
    if (r) {
      var i = pi(e, o), s = i[1], a = i[2];
      if (s > a) return true;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return false;
}, ca = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [t, n, o];
}, aa = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [t, n, o];
}, fi = function(e, t) {
  return e === "v" ? ia(t) : sa(t);
}, pi = function(e, t) {
  return e === "v" ? ca(t) : aa(t);
}, la = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, ua = function(e, t, n, o, r) {
  var i = la(e, window.getComputedStyle(t).direction), s = i * o, a = n.target, l = t.contains(a), u = false, p = s > 0, f = 0, d = 0;
  do {
    if (!a) break;
    var h = pi(e, a), m = h[0], v = h[1], g = h[2], w = v - g - i * m;
    (m || w) && fi(e, a) && (f += w, d += m);
    var y = a.parentNode;
    a = y && y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? y.host : y;
  } while (!l && a !== document.body || l && (t.contains(a) || t === a));
  return (p && Math.abs(f) < 1 || !p && Math.abs(d) < 1) && (u = true), u;
}, Ht = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, dr = function(e) {
  return [e.deltaX, e.deltaY];
}, fr = function(e) {
  return e && "current" in e ? e.current : e;
}, da = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, fa = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, pa = 0, ot = [];
function ha(e) {
  var t = c.useRef([]), n = c.useRef([0, 0]), o = c.useRef(), r = c.useState(pa++)[0], i = c.useState(ui)[0], s = c.useRef(e);
  c.useEffect(function() {
    s.current = e;
  }, [e]), c.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var v = Ks([e.lockRef.current], (e.shards || []).map(fr), true).filter(Boolean);
      return v.forEach(function(g) {
        return g.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), v.forEach(function(g) {
          return g.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = c.useCallback(function(v, g) {
    if ("touches" in v && v.touches.length === 2 || v.type === "wheel" && v.ctrlKey) return !s.current.allowPinchZoom;
    var w = Ht(v), y = n.current, x = "deltaX" in v ? v.deltaX : y[0] - w[0], b = "deltaY" in v ? v.deltaY : y[1] - w[1], P, R = v.target, S = Math.abs(x) > Math.abs(b) ? "h" : "v";
    if ("touches" in v && S === "h" && R.type === "range") return false;
    var T = window.getSelection(), O = T && T.anchorNode, D = O ? O === R || O.contains(R) : false;
    if (D) return false;
    var E = ur(S, R);
    if (!E) return true;
    if (E ? P = S : (P = S === "v" ? "h" : "v", E = ur(S, R)), !E) return false;
    if (!o.current && "changedTouches" in v && (x || b) && (o.current = P), !P) return true;
    var I = o.current || P;
    return ua(I, g, v, I === "h" ? x : b);
  }, []), l = c.useCallback(function(v) {
    var g = v;
    if (!(!ot.length || ot[ot.length - 1] !== i)) {
      var w = "deltaY" in g ? dr(g) : Ht(g), y = t.current.filter(function(P) {
        return P.name === g.type && (P.target === g.target || g.target === P.shadowParent) && da(P.delta, w);
      })[0];
      if (y && y.should) {
        g.cancelable && g.preventDefault();
        return;
      }
      if (!y) {
        var x = (s.current.shards || []).map(fr).filter(Boolean).filter(function(P) {
          return P.contains(g.target);
        }), b = x.length > 0 ? a(g, x[0]) : !s.current.noIsolation;
        b && g.cancelable && g.preventDefault();
      }
    }
  }, []), u = c.useCallback(function(v, g, w, y) {
    var x = { name: v, delta: g, target: w, should: y, shadowParent: ma(w) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(b) {
        return b !== x;
      });
    }, 1);
  }, []), p = c.useCallback(function(v) {
    n.current = Ht(v), o.current = void 0;
  }, []), f = c.useCallback(function(v) {
    u(v.type, dr(v), v.target, a(v, e.lockRef.current));
  }, []), d = c.useCallback(function(v) {
    u(v.type, Ht(v), v.target, a(v, e.lockRef.current));
  }, []);
  c.useEffect(function() {
    return ot.push(i), e.setCallbacks({ onScrollCapture: f, onWheelCapture: f, onTouchMoveCapture: d }), document.addEventListener("wheel", l, nt), document.addEventListener("touchmove", l, nt), document.addEventListener("touchstart", p, nt), function() {
      ot = ot.filter(function(v) {
        return v !== i;
      }), document.removeEventListener("wheel", l, nt), document.removeEventListener("touchmove", l, nt), document.removeEventListener("touchstart", p, nt);
    };
  }, []);
  var h = e.removeScrollBar, m = e.inert;
  return c.createElement(c.Fragment, null, m ? c.createElement(i, { styles: fa(r) }) : null, h ? c.createElement(oa, { noRelative: e.noRelative, gapMode: e.gapMode }) : null);
}
function ma(e) {
  for (var t = null; e !== null; ) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const va = Wc(li, ha);
var Ot = c.forwardRef(function(e, t) {
  return c.createElement(cn, $e({}, e, { ref: t, sideCar: va }));
});
Ot.classNames = cn.classNames;
var ga = function(e) {
  if (typeof document > "u") return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, rt = /* @__PURE__ */ new WeakMap(), Gt = /* @__PURE__ */ new WeakMap(), Wt = {}, Nn = 0, hi = function(e) {
  return e && (e.host || hi(e.parentNode));
}, Ca = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n)) return n;
    var o = hi(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, xa = function(e, t, n, o) {
  var r = Ca(t, Array.isArray(e) ? e : [e]);
  Wt[n] || (Wt[n] = /* @__PURE__ */ new WeakMap());
  var i = Wt[n], s = [], a = /* @__PURE__ */ new Set(), l = new Set(r), u = function(f) {
    !f || a.has(f) || (a.add(f), u(f.parentNode));
  };
  r.forEach(u);
  var p = function(f) {
    !f || l.has(f) || Array.prototype.forEach.call(f.children, function(d) {
      if (a.has(d)) p(d);
      else try {
        var h = d.getAttribute(o), m = h !== null && h !== "false", v = (rt.get(d) || 0) + 1, g = (i.get(d) || 0) + 1;
        rt.set(d, v), i.set(d, g), s.push(d), v === 1 && m && Gt.set(d, true), g === 1 && d.setAttribute(n, "true"), m || d.setAttribute(o, "true");
      } catch (w) {
        console.error("aria-hidden: cannot operate on ", d, w);
      }
    });
  };
  return p(t), a.clear(), Nn++, function() {
    s.forEach(function(f) {
      var d = rt.get(f) - 1, h = i.get(f) - 1;
      rt.set(f, d), i.set(f, h), d || (Gt.has(f) || f.removeAttribute(o), Gt.delete(f)), h || f.removeAttribute(n);
    }), Nn--, Nn || (rt = /* @__PURE__ */ new WeakMap(), rt = /* @__PURE__ */ new WeakMap(), Gt = /* @__PURE__ */ new WeakMap(), Wt = {});
  };
}, an = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = ga(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), xa(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, ba = Object.defineProperty, pe = (e, t) => ba(e, "name", { value: t, configurable: true }), go = "Dialog", [mi, pp] = ne(go), [wa, be] = mi(go), hp = pe((e) => {
  const { __scopeDialog: t, children: n, open: o, defaultOpen: r, onOpenChange: i, modal: s = true } = e, a = c.useRef(null), l = c.useRef(null), [u, p] = de({ prop: o, defaultProp: r ?? false, onChange: i, caller: go }), [f, d] = c.useState(0), [h, m] = c.useState(0);
  return C.jsx(wa, { scope: t, triggerRef: a, contentRef: l, contentId: ue(), titleId: ue(), descriptionId: ue(), titlePresent: f > 0, descriptionPresent: h > 0, setTitleCount: d, setDescriptionCount: m, open: u, onOpenChange: p, onOpenToggle: c.useCallback(() => p((v) => !v), [p]), modal: s, children: n });
}, "Dialog"), ya = "DialogTrigger", mp = c.forwardRef(pe(function(t, n) {
  const { __scopeDialog: o, ...r } = t, i = be(ya, o), s = B(n, i.triggerRef);
  return C.jsx(L.button, { type: "button", "aria-haspopup": "dialog", "aria-expanded": i.open, "aria-controls": i.open ? i.contentId : void 0, "data-state": ln(i.open), ...r, ref: s, onClick: _(t.onClick, i.onOpenToggle) });
}, "DialogTrigger")), vi = "DialogPortal", [Ra, gi] = mi(vi, { forceMount: void 0 }), vp = pe((e) => {
  const { __scopeDialog: t, forceMount: n, children: o, container: r } = e, i = be(vi, t);
  return C.jsx(Ra, { scope: t, forceMount: n, children: c.Children.map(o, (s) => C.jsx(fe, { present: n || i.open, children: C.jsx(Tt, { asChild: true, container: r, children: s }) })) });
}, "DialogPortal"), eo = "DialogOverlay", gp = c.forwardRef(pe(function(t, n) {
  const o = gi(eo, t.__scopeDialog), { forceMount: r = o.forceMount, ...i } = t, s = be(eo, t.__scopeDialog);
  return s.modal ? C.jsx(fe, { present: r || s.open, children: C.jsx(Sa, { ...i, ref: n }) }) : null;
}, "DialogOverlay")), Pa = ye("DialogOverlay.RemoveScroll"), Sa = c.forwardRef(pe(function(t, n) {
  const { __scopeDialog: o, ...r } = t, i = be(eo, o), s = Jr(), a = B(n, s);
  return C.jsx(Ot, { as: Pa, allowPinchZoom: true, shards: [i.contentRef], children: C.jsx(L.div, { "data-state": ln(i.open), ...r, ref: a, style: { pointerEvents: "auto", ...r.style } }) });
}, "DialogOverlayImpl")), wt = "DialogContent", Cp = c.forwardRef(pe(function(t, n) {
  const o = gi(wt, t.__scopeDialog), { forceMount: r = o.forceMount, ...i } = t, s = be(wt, t.__scopeDialog);
  return C.jsx(fe, { present: r || s.open, children: s.modal ? C.jsx(Ea, { ...i, ref: n }) : C.jsx(Ia, { ...i, ref: n }) });
}, "DialogContent")), Ea = c.forwardRef(pe(function(t, n) {
  const o = be(wt, t.__scopeDialog), r = c.useRef(null), i = B(n, o.contentRef, r);
  return c.useEffect(() => {
    const s = r.current;
    if (s) return an(s);
  }, []), C.jsx(Ci, { ...t, ref: i, trapFocus: o.open, disableOutsidePointerEvents: o.open, onCloseAutoFocus: _(t.onCloseAutoFocus, (s) => {
    var _a3;
    s.preventDefault(), (_a3 = o.triggerRef.current) == null ? void 0 : _a3.focus();
  }), onPointerDownOutside: _(t.onPointerDownOutside, (s) => {
    const a = s.detail.originalEvent, l = a.button === 0 && a.ctrlKey === true;
    (a.button === 2 || l) && s.preventDefault();
  }), onFocusOutside: _(t.onFocusOutside, (s) => s.preventDefault()) });
}, "DialogContentModal")), Ia = c.forwardRef(pe(function(t, n) {
  const o = be(wt, t.__scopeDialog), r = c.useRef(false), i = c.useRef(false);
  return C.jsx(Ci, { ...t, ref: n, trapFocus: false, disableOutsidePointerEvents: false, onCloseAutoFocus: (s) => {
    var _a3, _b;
    (_a3 = t.onCloseAutoFocus) == null ? void 0 : _a3.call(t, s), s.defaultPrevented || (r.current || ((_b = o.triggerRef.current) == null ? void 0 : _b.focus()), s.preventDefault()), r.current = false, i.current = false;
  }, onInteractOutside: (s) => {
    var _a3, _b;
    (_a3 = t.onInteractOutside) == null ? void 0 : _a3.call(t, s), s.defaultPrevented || (r.current = true, s.detail.originalEvent.type === "pointerdown" && (i.current = true));
    const a = s.target;
    ((_b = o.triggerRef.current) == null ? void 0 : _b.contains(a)) && s.preventDefault(), s.detail.originalEvent.type === "focusin" && i.current && s.preventDefault();
  } });
}, "DialogContentNonModal")), Ci = c.forwardRef(pe(function(t, n) {
  const { __scopeDialog: o, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: s, ...a } = t, l = be(wt, o);
  return pt(), C.jsx(C.Fragment, { children: C.jsx(sn, { asChild: true, loop: true, trapped: r, onMountAutoFocus: i, onUnmountAutoFocus: s, children: C.jsx(_t, { role: "dialog", id: l.contentId, "aria-describedby": l.descriptionPresent ? l.descriptionId : void 0, "aria-labelledby": l.titlePresent ? l.titleId : void 0, "data-state": ln(l.open), ...a, ref: n, deferPointerDownOutside: true, onDismiss: () => l.onOpenChange(false) }) }) });
}, "DialogContentImpl")), _a2 = "DialogTitle", xp = c.forwardRef(pe(function(t, n) {
  const { __scopeDialog: o, ...r } = t, i = be(_a2, o), { setTitleCount: s } = i;
  return Q(() => (s((a) => a + 1), () => s((a) => a - 1)), [s]), C.jsx(L.h2, { id: i.titleId, ...r, ref: n });
}, "DialogTitle")), Ta = "DialogDescription", bp = c.forwardRef(pe(function(t, n) {
  const { __scopeDialog: o, ...r } = t, i = be(Ta, o), { setDescriptionCount: s } = i;
  return Q(() => (s((a) => a + 1), () => s((a) => a - 1)), [s]), C.jsx(L.p, { id: i.descriptionId, ...r, ref: n });
}, "DialogDescription")), Oa = "DialogClose", wp = c.forwardRef(pe(function(t, n) {
  const { __scopeDialog: o, ...r } = t, i = be(Oa, o);
  return C.jsx(L.button, { type: "button", ...r, ref: n, onClick: _(t.onClick, () => i.onOpenChange(false)) });
}, "DialogClose"));
function ln(e) {
  return e ? "open" : "closed";
}
pe(ln, "getState");
var Ma = Object.defineProperty, Aa = (e, t) => Ma(e, "name", { value: t, configurable: true });
function Mt(e) {
  const [t, n] = c.useState(void 0);
  return Q(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const o = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length) return;
        const i = r[0];
        let s, a;
        if ("borderBoxSize" in i) {
          const l = i.borderBoxSize, u = Array.isArray(l) ? l[0] : l;
          s = u.inlineSize, a = u.blockSize;
        } else s = e.offsetWidth, a = e.offsetHeight;
        n({ width: s, height: a });
      });
      return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
    } else n(void 0);
  }, [e]), t;
}
Aa(Mt, "useSize");
var Da = Object.defineProperty, Fe = (e, t) => Da(e, "name", { value: t, configurable: true }), Co = "Checkbox", [ka, yp] = ne(Co), [Fa, xo] = ka(Co);
function xi(e) {
  const { __scopeCheckbox: t, checked: n, children: o, defaultChecked: r, disabled: i, form: s, name: a, onCheckedChange: l, required: u, value: p = "on", internal_do_not_use_render: f } = e, [d, h] = de({ prop: n, defaultProp: r ?? false, onChange: l, caller: Co }), [m, v] = c.useState(null), [g, w] = c.useState(null), y = c.useRef(false), [x, b] = c.useReducer((S) => S + 1, 0), P = m ? !!s || !!m.closest("form") : true, R = { checked: d, disabled: i, setChecked: h, control: m, setControl: v, name: a, form: s, value: p, hasConsumerStoppedPropagationRef: y, userInteractionCount: x, onUserInteraction: b, required: u, defaultChecked: Te(r) ? false : r, isFormControl: P, bubbleInput: g, setBubbleInput: w };
  return C.jsx(Fa, { scope: t, ...R, children: bi(f) ? f(R) : o });
}
Fe(xi, "CheckboxProvider");
var ja = "CheckboxTrigger", Na = c.forwardRef(Fe(function({ __scopeCheckbox: t, onKeyDown: n, onClick: o, ...r }, i) {
  const { control: s, value: a, disabled: l, checked: u, required: p, setControl: f, setChecked: d, hasConsumerStoppedPropagationRef: h, onUserInteraction: m, isFormControl: v, bubbleInput: g } = xo(ja, t), w = B(i, f), y = c.useRef(u);
  return c.useEffect(() => {
    const x = s == null ? void 0 : s.form;
    if (x) {
      const b = Fe(() => d(y.current), "reset");
      return x.addEventListener("reset", b), () => x.removeEventListener("reset", b);
    }
  }, [s, d]), C.jsx(L.button, { type: "button", role: "checkbox", "aria-checked": Te(u) ? "mixed" : u, "aria-required": p, "data-state": bo(u), "data-disabled": l ? "" : void 0, disabled: l, value: a, ...r, ref: w, onKeyDown: _(n, (x) => {
    x.key === "Enter" && x.preventDefault();
  }), onClick: _(o, (x) => {
    m(), d((b) => Te(b) ? true : !b), g && v && (h.current = x.isPropagationStopped(), h.current || x.stopPropagation());
  }) });
}, "CheckboxTrigger")), Rp = c.forwardRef(Fe(function(t, n) {
  const { __scopeCheckbox: o, name: r, checked: i, defaultChecked: s, required: a, disabled: l, value: u, onCheckedChange: p, form: f, ...d } = t;
  return C.jsx(xi, { __scopeCheckbox: o, checked: i, defaultChecked: s, disabled: l, required: a, onCheckedChange: p, name: r, form: f, value: u, internal_do_not_use_render: ({ isFormControl: h }) => C.jsxs(C.Fragment, { children: [C.jsx(Na, { ...d, ref: n, __scopeCheckbox: o }), h && C.jsx(Ba, { __scopeCheckbox: o })] }) });
}, "Checkbox")), La = "CheckboxIndicator", Pp = c.forwardRef(Fe(function(t, n) {
  const { __scopeCheckbox: o, forceMount: r, ...i } = t, s = xo(La, o);
  return C.jsx(fe, { present: r || Te(s.checked) || s.checked === true, children: C.jsx(L.span, { "data-state": bo(s.checked), "data-disabled": s.disabled ? "" : void 0, ...i, ref: n, style: { pointerEvents: "none", ...t.style } }) });
}, "CheckboxIndicator")), $a = "CheckboxBubbleInput", Ba = c.forwardRef(Fe(function({ __scopeCheckbox: t, onClick: n, ...o }, r) {
  const { control: i, hasConsumerStoppedPropagationRef: s, userInteractionCount: a, checked: l, defaultChecked: u, required: p, disabled: f, name: d, value: h, form: m, bubbleInput: v, setBubbleInput: g } = xo($a, t), w = B(r, g), y = Mt(i), x = c.useRef(false), b = c.useRef(l), P = c.useRef(a);
  c.useEffect(() => {
    const S = v;
    if (!S) return;
    const T = window.HTMLInputElement.prototype, D = Object.getOwnPropertyDescriptor(T, "checked").set, E = a !== P.current;
    P.current = a;
    const I = b.current !== l;
    b.current = l;
    const M = !(E && s.current);
    if (I && D) {
      x.current = !E;
      const F = new Event("click", { bubbles: M });
      S.indeterminate = Te(l), D.call(S, Te(l) ? false : l), S.dispatchEvent(F), x.current = false;
    }
  }, [v, l, s, a]);
  const R = c.useRef(Te(l) ? false : l);
  return C.jsx(L.input, { type: "checkbox", "aria-hidden": true, defaultChecked: u ?? R.current, required: p, disabled: f, name: d, value: h, form: m, ...o, tabIndex: -1, ref: w, onClick: _(n, (S) => {
    x.current && S.stopPropagation();
  }), style: { ...o.style, ...y, position: "absolute", pointerEvents: "none", opacity: 0, margin: 0, transform: "translateX(-100%)" } });
}, "CheckboxBubbleInput"));
function bi(e) {
  return typeof e == "function";
}
Fe(bi, "isFunction");
function Te(e) {
  return e === "indeterminate";
}
Fe(Te, "isIndeterminate");
function bo(e) {
  return Te(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
Fe(bo, "getState");
const Va = ["top", "right", "bottom", "left"], Ve = Math.min, Oe = Math.max, Jt = Math.round, Ut = Math.floor, Me = (e) => ({ x: e, y: e }), Ha = { left: "right", right: "left", bottom: "top", top: "bottom" };
function wi(e, t, n) {
  return Oe(e, Ve(t, n));
}
function je(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function He(e) {
  return e.split("-")[0];
}
function ht(e) {
  return e.split("-")[1];
}
function wo(e) {
  return e === "x" ? "y" : "x";
}
function yo(e) {
  return e === "y" ? "height" : "width";
}
function we(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function Ro(e) {
  return wo(we(e));
}
function Ga(e, t, n) {
  n === void 0 && (n = false);
  const o = ht(e), r = Ro(e), i = yo(r);
  let s = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (s = en(s)), [s, en(s)];
}
function Wa(e) {
  const t = en(e);
  return [to(e), t, to(t)];
}
function to(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const pr = ["left", "right"], hr = ["right", "left"], Ua = ["top", "bottom"], Ka = ["bottom", "top"];
function za(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? hr : pr : t ? pr : hr;
    case "left":
    case "right":
      return t ? Ua : Ka;
    default:
      return [];
  }
}
function Ya(e, t, n, o) {
  const r = ht(e);
  let i = za(He(e), n === "start", o);
  return r && (i = i.map((s) => s + "-" + r), t && (i = i.concat(i.map(to)))), i;
}
function en(e) {
  const t = He(e);
  return Ha[t] + e.slice(t.length);
}
function Xa(e) {
  var t, n, o, r;
  return { top: (t = e.top) != null ? t : 0, right: (n = e.right) != null ? n : 0, bottom: (o = e.bottom) != null ? o : 0, left: (r = e.left) != null ? r : 0 };
}
function yi(e) {
  return typeof e != "number" ? Xa(e) : { top: e, right: e, bottom: e, left: e };
}
function tn(e) {
  const { x: t, y: n, width: o, height: r } = e;
  return { width: o, height: r, top: n, left: t, right: t + o, bottom: n + r, x: t, y: n };
}
function mr(e, t, n) {
  let { reference: o, floating: r } = e;
  const i = we(t), s = Ro(t), a = yo(s), l = He(t), u = i === "y", p = o.x + o.width / 2 - r.width / 2, f = o.y + o.height / 2 - r.height / 2, d = o[a] / 2 - r[a] / 2;
  let h;
  switch (l) {
    case "top":
      h = { x: p, y: o.y - r.height };
      break;
    case "bottom":
      h = { x: p, y: o.y + o.height };
      break;
    case "right":
      h = { x: o.x + o.width, y: f };
      break;
    case "left":
      h = { x: o.x - r.width, y: f };
      break;
    default:
      h = { x: o.x, y: o.y };
  }
  const m = ht(t);
  return m && (h[s] += d * (m === "end" ? 1 : -1) * (n && u ? -1 : 1)), h;
}
async function qa(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: o, y: r, platform: i, rects: s, elements: a, strategy: l } = e, { boundary: u = "clippingAncestors", rootBoundary: p = "viewport", elementContext: f = "floating", altBoundary: d = false, padding: h = 0 } = je(t, e), m = yi(h), g = a[d ? f === "floating" ? "reference" : "floating" : f], w = tn(await i.getClippingRect({ element: (n = await (i.isElement == null ? void 0 : i.isElement(g))) == null || n ? g : g.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating)), boundary: u, rootBoundary: p, strategy: l })), y = f === "floating" ? { x: o, y: r, width: s.floating.width, height: s.floating.height } : s.reference, x = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)), b = await (i.isElement == null ? void 0 : i.isElement(x)) && await (i.getScale == null ? void 0 : i.getScale(x)) || { x: 1, y: 1 }, P = tn(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({ elements: a, rect: y, offsetParent: x, strategy: l }) : y);
  return { top: (w.top - P.top + m.top) / b.y, bottom: (P.bottom - w.bottom + m.bottom) / b.y, left: (w.left - P.left + m.left) / b.x, right: (P.right - w.right + m.right) / b.x };
}
const Za = 50, Qa = async (e, t, n) => {
  const { placement: o = "bottom", strategy: r = "absolute", middleware: i = [], platform: s } = n, a = s.detectOverflow ? s : { ...s, detectOverflow: qa }, l = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let u = await s.getElementRects({ reference: e, floating: t, strategy: r }), { x: p, y: f } = mr(u, o, l), d = o, h = 0;
  const m = {};
  for (let v = 0; v < i.length; v++) {
    const g = i[v];
    if (!g) continue;
    const { name: w, fn: y } = g, { x, y: b, data: P, reset: R } = await y({ x: p, y: f, initialPlacement: o, placement: d, strategy: r, middlewareData: m, rects: u, platform: a, elements: { reference: e, floating: t } });
    p = x ?? p, f = b ?? f, m[w] = { ...m[w], ...P }, R && h < Za && (h++, typeof R == "object" && (R.placement && (d = R.placement), R.rects && (u = R.rects === true ? await s.getElementRects({ reference: e, floating: t, strategy: r }) : R.rects), { x: p, y: f } = mr(u, d, l)), v = -1);
  }
  return { x: p, y: f, placement: d, strategy: r, middlewareData: m };
}, Ja = (e) => ({ name: "arrow", options: e, async fn(t) {
  const { x: n, y: o, placement: r, rects: i, platform: s, elements: a, middlewareData: l } = t, { element: u, padding: p = 0 } = je(e, t) || {};
  if (u == null) return {};
  const f = yi(p), d = { x: n, y: o }, h = Ro(r), m = yo(h), v = await s.getDimensions(u), g = h === "y", w = g ? "top" : "left", y = g ? "bottom" : "right", x = g ? "clientHeight" : "clientWidth", b = i.reference[m] + i.reference[h] - d[h] - i.floating[m], P = d[h] - i.reference[h], R = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u));
  let S = R ? R[x] : 0;
  (!S || !await (s.isElement == null ? void 0 : s.isElement(R))) && (S = a.floating[x] || i.floating[m]);
  const T = b / 2 - P / 2, O = S / 2 - v[m] / 2 - 1, D = Ve(f[w], O), E = Ve(f[y], O), I = S - v[m] - E, M = S / 2 - v[m] / 2 + T, F = wi(D, M, I), H = !l.arrow && ht(r) != null && M !== F && i.reference[m] / 2 - (M < D ? D : E) - v[m] / 2 < 0, j = H ? M < D ? M - D : M - I : 0;
  return { [h]: d[h] + j, data: { [h]: F, centerOffset: M - F - j, ...H && { alignmentOffset: j } }, reset: H };
} }), el = function(e) {
  return e === void 0 && (e = {}), { name: "flip", options: e, async fn(t) {
    var n, o;
    const { placement: r, middlewareData: i, rects: s, initialPlacement: a, platform: l, elements: u } = t, { mainAxis: p = true, crossAxis: f = true, fallbackPlacements: d, fallbackStrategy: h = "bestFit", fallbackAxisSideDirection: m = "none", flipAlignment: v = true, ...g } = je(e, t);
    if ((n = i.arrow) != null && n.alignmentOffset) return {};
    const w = He(r), y = we(a), x = He(a) === a, b = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), P = d || (x || !v ? [en(a)] : Wa(a)), R = m !== "none";
    !d && R && P.push(...Ya(a, v, m, b));
    const S = [a, ...P], T = await l.detectOverflow(t, g), O = [];
    let D = ((o = i.flip) == null ? void 0 : o.overflows) || [];
    if (p && O.push(T[w]), f) {
      const F = Ga(r, s, b);
      O.push(T[F[0]], T[F[1]]);
    }
    if (D = [...D, { placement: r, overflows: O }], !O.every((F) => F <= 0)) {
      var E, I;
      const F = (((E = i.flip) == null ? void 0 : E.index) || 0) + 1, H = S[F];
      if (H && (!(f === "alignment" ? y !== we(H) : false) || D.every(($) => we($.placement) === y ? $.overflows[0] > 0 : true))) return { data: { index: F, overflows: D }, reset: { placement: H } };
      let j = (I = D.filter((N) => N.overflows[0] <= 0).sort((N, $) => N.overflows[1] - $.overflows[1])[0]) == null ? void 0 : I.placement;
      if (!j) switch (h) {
        case "bestFit": {
          var M;
          const N = (M = D.filter(($) => {
            if (R) {
              const V = we($.placement);
              return V === y || V === "y";
            }
            return true;
          }).map(($) => [$.placement, $.overflows.filter((V) => V > 0).reduce((V, A) => V + A, 0)]).sort(($, V) => $[1] - V[1])[0]) == null ? void 0 : M[0];
          N && (j = N);
          break;
        }
        case "initialPlacement":
          j = a;
          break;
      }
      if (r !== j) return { reset: { placement: j } };
    }
    return {};
  } };
};
function vr(e, t) {
  return { top: e.top - t.height, right: e.right - t.width, bottom: e.bottom - t.height, left: e.left - t.width };
}
function gr(e) {
  return Va.some((t) => e[t] >= 0);
}
const tl = function(e) {
  return e === void 0 && (e = {}), { name: "hide", options: e, async fn(t) {
    const { rects: n, platform: o } = t, { strategy: r = "referenceHidden", ...i } = je(e, t);
    switch (r) {
      case "referenceHidden": {
        const s = await o.detectOverflow(t, { ...i, elementContext: "reference" }), a = vr(s, n.reference);
        return { data: { referenceHiddenOffsets: a, referenceHidden: gr(a) } };
      }
      case "escaped": {
        const s = await o.detectOverflow(t, { ...i, altBoundary: true }), a = vr(s, n.floating);
        return { data: { escapedOffsets: a, escaped: gr(a) } };
      }
      default:
        return {};
    }
  } };
}, Ri = /* @__PURE__ */ new Set(["left", "top"]);
async function nl(e, t) {
  const { placement: n, platform: o, elements: r } = e, i = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), s = He(n), a = ht(n), l = we(n) === "y", u = Ri.has(s) ? -1 : 1, p = i && l ? -1 : 1, f = je(t, e);
  let { mainAxis: d, crossAxis: h, alignmentAxis: m } = typeof f == "number" ? { mainAxis: f, crossAxis: 0, alignmentAxis: null } : { mainAxis: f.mainAxis || 0, crossAxis: f.crossAxis || 0, alignmentAxis: f.alignmentAxis };
  return a && typeof m == "number" && (h = a === "end" ? m * -1 : m), l ? { x: h * p, y: d * u } : { x: d * u, y: h * p };
}
const ol = function(e) {
  return e === void 0 && (e = 0), { name: "offset", options: e, async fn(t) {
    var n, o;
    const { x: r, y: i, placement: s, middlewareData: a } = t, l = await nl(t, e);
    return s === ((n = a.offset) == null ? void 0 : n.placement) && (o = a.arrow) != null && o.alignmentOffset ? {} : { x: r + l.x, y: i + l.y, data: { ...l, placement: s } };
  } };
}, rl = function(e) {
  return e === void 0 && (e = {}), { name: "shift", options: e, async fn(t) {
    const { x: n, y: o, placement: r, platform: i } = t, { mainAxis: s = true, crossAxis: a = false, limiter: l = { fn: (y) => {
      let { x, y: b } = y;
      return { x, y: b };
    } }, ...u } = je(e, t), p = { x: n, y: o }, f = await i.detectOverflow(t, u), d = we(r), h = wo(d);
    let m = p[h], v = p[d];
    const g = (y, x) => wi(x + f[y === "y" ? "top" : "left"], x, x - f[y === "y" ? "bottom" : "right"]);
    s && (m = g(h, m)), a && (v = g(d, v));
    const w = l.fn({ ...t, [h]: m, [d]: v });
    return { ...w, data: { x: w.x - n, y: w.y - o, enabled: { [h]: s, [d]: a } } };
  } };
}, il = function(e) {
  return e === void 0 && (e = {}), { options: e, fn(t) {
    var n, o;
    const { x: r, y: i, placement: s, rects: a, middlewareData: l } = t, { offset: u = 0, mainAxis: p = true, crossAxis: f = true } = je(e, t), d = { x: r, y: i }, h = we(s), m = wo(h);
    let v = d[m], g = d[h];
    const w = je(u, t), y = typeof w == "number" ? { mainAxis: w, crossAxis: 0 } : { mainAxis: (n = w.mainAxis) != null ? n : 0, crossAxis: (o = w.crossAxis) != null ? o : 0 };
    if (p) {
      const P = m === "y" ? "height" : "width", R = a.reference[m] - a.floating[P] + y.mainAxis, S = a.reference[m] + a.reference[P] - y.mainAxis;
      v < R ? v = R : v > S && (v = S);
    }
    if (f) {
      var x, b;
      const P = m === "y" ? "width" : "height", R = Ri.has(He(s)), S = a.reference[h] - a.floating[P] + (R && ((x = l.offset) == null ? void 0 : x[h]) || 0) + (R ? 0 : y.crossAxis), T = a.reference[h] + a.reference[P] + (R ? 0 : ((b = l.offset) == null ? void 0 : b[h]) || 0) - (R ? y.crossAxis : 0);
      g < S ? g = S : g > T && (g = T);
    }
    return { [m]: v, [h]: g };
  } };
}, sl = function(e) {
  return e === void 0 && (e = {}), { name: "size", options: e, async fn(t) {
    const { placement: n, rects: o, platform: r, elements: i } = t, { apply: s = () => {
    }, ...a } = je(e, t), l = await r.detectOverflow(t, a), u = He(n), p = ht(n), f = we(n) === "y", { width: d, height: h } = o.floating;
    let m, v;
    u === "top" || u === "bottom" ? (m = u, v = p === (await (r.isRTL == null ? void 0 : r.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = u, m = p === "end" ? "top" : "bottom");
    const g = h - l.top - l.bottom, w = d - l.left - l.right, y = Ve(h - l[m], g), x = Ve(d - l[v], w), b = t.middlewareData.shift, P = !b;
    let R = y, S = x;
    b != null && b.enabled.x && (S = w), b != null && b.enabled.y && (R = g), P && !p && (f ? S = d - 2 * Oe(l.left, l.right) : R = h - 2 * Oe(l.top, l.bottom)), await s({ ...t, availableWidth: S, availableHeight: R });
    const T = await r.getDimensions(i.floating);
    return d !== T.width || h !== T.height ? { reset: { rects: true } } : {};
  } };
};
function un() {
  return typeof window < "u";
}
function mt(e) {
  return Pi(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ae(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ne(e) {
  var t;
  return (t = (Pi(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Pi(e) {
  return un() ? e instanceof Node || e instanceof ae(e).Node : false;
}
function Re(e) {
  return un() ? e instanceof Element || e instanceof ae(e).Element : false;
}
function We(e) {
  return un() ? e instanceof HTMLElement || e instanceof ae(e).HTMLElement : false;
}
function Cr(e) {
  return !un() || typeof ShadowRoot > "u" ? false : e instanceof ShadowRoot || e instanceof ae(e).ShadowRoot;
}
function dn(e) {
  const { overflow: t, overflowX: n, overflowY: o, display: r } = Pe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && r !== "inline" && r !== "contents";
}
function cl(e) {
  return /^(table|td|th)$/.test(mt(e));
}
function fn(e) {
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
const al = /transform|translate|scale|rotate|perspective|filter/, ll = /paint|layout|strict|content/, ze = (e) => !!e && e !== "none";
let Ln;
function Po(e) {
  const t = Re(e) ? Pe(e) : e;
  return ze(t.transform) || ze(t.translate) || ze(t.scale) || ze(t.rotate) || ze(t.perspective) || !So() && (ze(t.backdropFilter) || ze(t.filter)) || al.test(t.willChange || "") || ll.test(t.contain || "");
}
function ul(e) {
  let t = Ye(e);
  for (; We(t) && !yt(t); ) {
    if (Po(t)) return t;
    if (fn(t)) return null;
    t = Ye(t);
  }
  return null;
}
function So() {
  return Ln == null && (Ln = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Ln;
}
function yt(e) {
  return /^(html|body|#document)$/.test(mt(e));
}
function Pe(e) {
  return ae(e).getComputedStyle(e);
}
function pn(e) {
  return Re(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Ye(e) {
  if (mt(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || Cr(e) && e.host || Ne(e);
  return Cr(t) ? t.host : t;
}
function Si(e) {
  const t = Ye(e);
  return yt(t) ? (e.ownerDocument || e).body : We(t) && dn(t) ? t : Si(t);
}
function Rt(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = true);
  const r = Si(e), i = r === ((o = e.ownerDocument) == null ? void 0 : o.body), s = ae(r);
  if (i) {
    const a = no(s);
    return t.concat(s, s.visualViewport || [], dn(r) ? r : [], a && n ? Rt(a) : []);
  } else return t.concat(r, Rt(r, [], n));
}
function no(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Ei(e) {
  const t = Pe(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = We(e), i = r ? e.offsetWidth : n, s = r ? e.offsetHeight : o, a = Jt(n) !== i || Jt(o) !== s;
  return a && (n = i, o = s), { width: n, height: o, $: a };
}
function Eo(e) {
  return Re(e) ? e : e.contextElement;
}
function ct(e) {
  const t = Eo(e);
  if (!We(t)) return Me(1);
  const n = t.getBoundingClientRect(), { width: o, height: r, $: i } = Ei(t);
  let s = (i ? Jt(n.width) : n.width) / o, a = (i ? Jt(n.height) : n.height) / r;
  return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), { x: s, y: a };
}
const dl = Me(0);
function Ii(e) {
  const t = ae(e);
  return !So() || !t.visualViewport ? dl : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function fl(e, t, n) {
  return t === void 0 && (t = false), !!n && t && n === ae(e);
}
function Xe(e, t, n, o) {
  t === void 0 && (t = false), n === void 0 && (n = false);
  const r = e.getBoundingClientRect(), i = Eo(e);
  let s = Me(1);
  t && (o ? Re(o) && (s = ct(o)) : s = ct(e));
  const a = fl(i, n, o) ? Ii(i) : Me(0);
  let l = (r.left + a.x) / s.x, u = (r.top + a.y) / s.y, p = r.width / s.x, f = r.height / s.y;
  if (i && o) {
    const d = ae(i), h = Re(o) ? ae(o) : o;
    let m = d, v = no(m);
    for (; v && h !== m; ) {
      const g = ct(v), w = v.getBoundingClientRect(), y = Pe(v), x = w.left + (v.clientLeft + parseFloat(y.paddingLeft)) * g.x, b = w.top + (v.clientTop + parseFloat(y.paddingTop)) * g.y;
      l *= g.x, u *= g.y, p *= g.x, f *= g.y, l += x, u += b, m = ae(v), v = no(m);
    }
  }
  return tn({ width: p, height: f, x: l, y: u });
}
function hn(e, t) {
  const n = pn(e).scrollLeft;
  return t ? t.left + n : Xe(Ne(e)).left + n;
}
function _i(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - hn(e, n), r = n.top + t.scrollTop;
  return { x: o, y: r };
}
function pl(e) {
  let { elements: t, rect: n, offsetParent: o, strategy: r } = e;
  const i = r === "fixed", s = Ne(o), a = t ? fn(t.floating) : false;
  if (o === s || a && i) return n;
  let l = { scrollLeft: 0, scrollTop: 0 }, u = Me(1);
  const p = Me(0), f = We(o);
  if ((f || !i) && ((mt(o) !== "body" || dn(s)) && (l = pn(o)), f)) {
    const h = Xe(o);
    u = ct(o), p.x = h.x + o.clientLeft, p.y = h.y + o.clientTop;
  }
  const d = s && !f && !i ? _i(s, l) : Me(0);
  return { width: n.width * u.x, height: n.height * u.y, x: n.x * u.x - l.scrollLeft * u.x + p.x + d.x, y: n.y * u.y - l.scrollTop * u.y + p.y + d.y };
}
function hl(e) {
  return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function ml(e) {
  const t = pn(e), n = e.ownerDocument.body, o = Oe(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), r = Oe(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
  let i = -t.scrollLeft + hn(e);
  const s = -t.scrollTop;
  return Pe(n).direction === "rtl" && (i += Oe(e.clientWidth, n.clientWidth) - o), { width: o, height: r, x: i, y: s };
}
const vl = 25;
function gl(e, t, n) {
  n === void 0 && (n = "viewport");
  const o = n === "layoutViewport", r = ae(e), i = Ne(e), s = r.visualViewport;
  let a = i.clientWidth, l = i.clientHeight, u = 0, p = 0;
  if (s) {
    const d = !So() || t === "fixed";
    o ? d || (u = -s.offsetLeft, p = -s.offsetTop) : (a = s.width, l = s.height, d && (u = s.offsetLeft, p = s.offsetTop));
  }
  if (hn(i) <= 0) {
    const d = i.ownerDocument, h = d.body, m = getComputedStyle(h), v = d.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, g = Math.abs(i.clientWidth - h.clientWidth - v), w = getComputedStyle(i).scrollbarGutter === "stable both-edges" ? g / 2 : g;
    w <= vl && (a -= w);
  }
  return { width: a, height: l, x: u, y: p };
}
function Cl(e, t) {
  const n = Xe(e, true, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, i = ct(e), s = e.clientWidth * i.x, a = e.clientHeight * i.y, l = r * i.x, u = o * i.y;
  return { width: s, height: a, x: l, y: u };
}
function xr(e, t, n) {
  let o;
  if (t === "viewport" || t === "layoutViewport") o = gl(e, n, t);
  else if (t === "document") o = ml(Ne(e));
  else if (Re(t)) o = Cl(t, n);
  else {
    const r = Ii(e);
    o = { x: t.x - r.x, y: t.y - r.y, width: t.width, height: t.height };
  }
  return tn(o);
}
function xl(e, t) {
  const n = t.get(e);
  if (n) return n;
  let o = Rt(e, [], false).filter((a) => Re(a) && mt(a) !== "body"), r = null;
  const i = Pe(e).position === "fixed";
  let s = i ? Ye(e) : e;
  for (; Re(s) && !yt(s); ) {
    const a = Pe(s), l = Po(s), u = r ? r.position : i ? "fixed" : "";
    !l && (u === "fixed" || u === "absolute" && a.position === "static") ? o = o.filter((f) => f !== s) : r = a, s = Ye(s);
  }
  return t.set(e, o), o;
}
function bl(e) {
  let { element: t, boundary: n, rootBoundary: o, strategy: r } = e;
  const s = [...n === "clippingAncestors" ? fn(t) ? [] : xl(t, this._c) : [].concat(n), o], a = xr(t, s[0], r);
  let l = a.top, u = a.right, p = a.bottom, f = a.left;
  for (let d = 1; d < s.length; d++) {
    const h = xr(t, s[d], r);
    l = Oe(h.top, l), u = Ve(h.right, u), p = Ve(h.bottom, p), f = Oe(h.left, f);
  }
  return { width: u - f, height: p - l, x: f, y: l };
}
function wl(e) {
  const { width: t, height: n } = Ei(e);
  return { width: t, height: n };
}
function yl(e, t, n) {
  const o = We(t), r = Ne(t), i = n === "fixed", s = Xe(e, true, i, t);
  let a = { scrollLeft: 0, scrollTop: 0 };
  const l = Me(0);
  if ((o || !i) && ((mt(t) !== "body" || dn(r)) && (a = pn(t)), o)) {
    const d = Xe(t, true, i, t);
    l.x = d.x + t.clientLeft, l.y = d.y + t.clientTop;
  }
  !o && r && (l.x = hn(r));
  const u = r && !o && !i ? _i(r, a) : Me(0), p = s.left + a.scrollLeft - l.x - u.x, f = s.top + a.scrollTop - l.y - u.y;
  return { x: p, y: f, width: s.width, height: s.height };
}
function $n(e) {
  return Pe(e).position === "static";
}
function br(e, t) {
  if (!We(e) || Pe(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return Ne(e) === n && (n = n.ownerDocument.body), n;
}
function Ti(e, t) {
  const n = ae(e);
  if (fn(e)) return n;
  if (!We(e)) {
    let r = Ye(e);
    for (; r && !yt(r); ) {
      if (Re(r) && !$n(r)) return r;
      r = Ye(r);
    }
    return n;
  }
  let o = br(e, t);
  for (; o && cl(o) && $n(o); ) o = br(o, t);
  return o && yt(o) && $n(o) && !Po(o) ? n : o || ul(e) || n;
}
const Rl = async function(e) {
  const t = this.getOffsetParent || Ti, n = this.getDimensions, o = await n(e.floating);
  return { reference: yl(e.reference, await t(e.floating), e.strategy), floating: { x: 0, y: 0, width: o.width, height: o.height } };
};
function Pl(e) {
  return Pe(e).direction === "rtl";
}
const Sl = { convertOffsetParentRelativeRectToViewportRelativeRect: pl, getDocumentElement: Ne, getClippingRect: bl, getOffsetParent: Ti, getElementRects: Rl, getClientRects: hl, getDimensions: wl, getScale: ct, isElement: Re, isRTL: Pl };
function Oi(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function El(e, t, n) {
  let o = null, r;
  const i = Ne(e);
  function s() {
    var p;
    clearTimeout(r), (p = o) == null || p.disconnect(), o = null;
  }
  function a(p, f) {
    p === void 0 && (p = false), f === void 0 && (f = 1), s();
    const d = e.getBoundingClientRect(), { left: h, top: m, width: v, height: g } = d;
    if (p || t(), !v || !g) return;
    const w = Ut(m), y = Ut(i.clientWidth - (h + v)), x = Ut(i.clientHeight - (m + g)), b = Ut(h), R = { rootMargin: -w + "px " + -y + "px " + -x + "px " + -b + "px", threshold: Oe(0, Ve(1, f)) || 1 };
    let S = true;
    function T(O) {
      const D = O[0].intersectionRatio;
      if (!Oi(d, e.getBoundingClientRect())) return a();
      if (D !== f) {
        if (!S) return a();
        D ? a(false, D) : r = setTimeout(() => {
          a(false, 1e-7);
        }, 1e3);
      }
      S = false;
    }
    try {
      o = new IntersectionObserver(T, { ...R, root: i.ownerDocument });
    } catch {
      o = new IntersectionObserver(T, R);
    }
    o.observe(e);
  }
  const l = ae(e), u = () => a(n);
  return l.addEventListener("resize", u), a(true), () => {
    l.removeEventListener("resize", u), s();
  };
}
function Il(e, t, n, o) {
  o === void 0 && (o = {});
  const { ancestorScroll: r = true, ancestorResize: i = true, elementResize: s = typeof ResizeObserver == "function", layoutShift: a = typeof IntersectionObserver == "function", animationFrame: l = false } = o, u = Eo(e), p = r || i ? [...u ? Rt(u) : [], ...t ? Rt(t) : []] : [];
  p.forEach((w) => {
    r && w.addEventListener("scroll", n), i && w.addEventListener("resize", n);
  });
  const f = u && a ? El(u, n, i) : null;
  let d = -1, h = null;
  s && (h = new ResizeObserver((w) => {
    let [y] = w;
    y && y.target === u && h && t && (h.unobserve(t), cancelAnimationFrame(d), d = requestAnimationFrame(() => {
      var x;
      (x = h) == null || x.observe(t);
    })), n();
  }), u && !l && h.observe(u), t && h.observe(t));
  let m, v = l ? Xe(e) : null;
  l && g();
  function g() {
    const w = Xe(e);
    v && !Oi(v, w) && n(), v = w, m = requestAnimationFrame(g);
  }
  return n(), () => {
    var w;
    p.forEach((y) => {
      r && y.removeEventListener("scroll", n), i && y.removeEventListener("resize", n);
    }), f == null ? void 0 : f(), (w = h) == null || w.disconnect(), h = null, l && cancelAnimationFrame(m);
  };
}
const _l = ol, Tl = rl, Ol = el, Ml = sl, Al = tl, wr = Ja, Dl = il, kl = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = n ?? {}, i = { ...Sl, ...r.platform, _c: o };
  return Qa(e, t, { ...r, platform: i });
};
var Fl = typeof document < "u", jl = function() {
}, Zt = Fl ? c.useLayoutEffect : jl;
function nn(e, t) {
  if (e === t) return true;
  if (typeof e != typeof t) return false;
  if (typeof e == "function" && e.toString() === t.toString()) return true;
  let n, o, r;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return false;
      for (o = n; o-- !== 0; ) if (!nn(e[o], t[o])) return false;
      return true;
    }
    if (r = Object.keys(e), n = r.length, n !== Object.keys(t).length) return false;
    for (o = n; o-- !== 0; ) if (!{}.hasOwnProperty.call(t, r[o])) return false;
    for (o = n; o-- !== 0; ) {
      const i = r[o];
      if (!(i === "_owner" && e.$$typeof) && !nn(e[i], t[i])) return false;
    }
    return true;
  }
  return e !== e && t !== t;
}
function Mi(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function yr(e, t) {
  const n = Mi(e);
  return Math.round(t * n) / n;
}
function Bn(e) {
  const t = c.useRef(e);
  return Zt(() => {
    t.current = e;
  }), t;
}
function Nl(e) {
  e === void 0 && (e = {});
  const { placement: t = "bottom", strategy: n = "absolute", middleware: o = [], platform: r, elements: { reference: i, floating: s } = {}, transform: a = true, whileElementsMounted: l, open: u } = e, [p, f] = c.useState({ x: 0, y: 0, strategy: n, placement: t, middlewareData: {}, isPositioned: false }), [d, h] = c.useState(o);
  nn(d, o) || h(o);
  const [m, v] = c.useState(null), [g, w] = c.useState(null), y = c.useCallback(($) => {
    $ !== R.current && (R.current = $, v($));
  }, []), x = c.useCallback(($) => {
    $ !== S.current && (S.current = $, w($));
  }, []), b = i || m, P = s || g, R = c.useRef(null), S = c.useRef(null), T = c.useRef(p), O = l != null, D = Bn(l), E = Bn(r), I = Bn(u), M = c.useCallback(() => {
    if (!R.current || !S.current) return;
    const $ = { placement: t, strategy: n, middleware: d };
    E.current && ($.platform = E.current), kl(R.current, S.current, $).then((V) => {
      const A = { ...V, isPositioned: I.current !== false };
      F.current && !nn(T.current, A) && (T.current = A, Et.flushSync(() => {
        f(A);
      }));
    });
  }, [d, t, n, E, I]);
  Zt(() => {
    u === false && T.current.isPositioned && (T.current.isPositioned = false, f(($) => ({ ...$, isPositioned: false })));
  }, [u]);
  const F = c.useRef(false);
  Zt(() => (F.current = true, () => {
    F.current = false;
  }), []), Zt(() => {
    if (b && (R.current = b), P && (S.current = P), b && P) {
      if (D.current) return D.current(b, P, M);
      M();
    }
  }, [b, P, M, D, O]);
  const H = c.useMemo(() => ({ reference: R, floating: S, setReference: y, setFloating: x }), [y, x]), j = c.useMemo(() => ({ reference: b, floating: P }), [b, P]), N = c.useMemo(() => {
    const $ = { position: n, left: 0, top: 0 };
    if (!j.floating) return $;
    const V = yr(j.floating, p.x), A = yr(j.floating, p.y);
    return a ? { ...$, transform: "translate(" + V + "px, " + A + "px)", ...Mi(j.floating) >= 1.5 && { willChange: "transform" } } : { position: n, left: V, top: A };
  }, [n, a, j.floating, p.x, p.y]);
  return c.useMemo(() => ({ ...p, update: M, refs: H, elements: j, floatingStyles: N }), [p, M, H, j, N]);
}
const Ll = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return { name: "arrow", options: e, fn(n) {
    const { element: o, padding: r } = typeof e == "function" ? e(n) : e;
    return o && t(o) ? o.current != null ? wr({ element: o.current, padding: r }).fn(n) : {} : o ? wr({ element: o, padding: r }).fn(n) : {};
  } };
}, $l = (e, t) => {
  const n = _l(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, Bl = (e, t) => {
  const n = Tl(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, Vl = (e, t) => ({ fn: Dl(e).fn, options: [e, t] }), Hl = (e, t) => {
  const n = Ol(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, Gl = (e, t) => {
  const n = Ml(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, Wl = (e, t) => {
  const n = Al(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, Ul = (e, t) => {
  const n = Ll(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
};
var Kl = Object.defineProperty, zl = (e, t) => Kl(e, "name", { value: t, configurable: true }), Yl = c.forwardRef(zl(function(t, n) {
  const { children: o, width: r = 10, height: i = 5, ...s } = t;
  return C.jsx(L.svg, { ...s, ref: n, width: r, height: i, viewBox: "0 0 30 10", preserveAspectRatio: "none", children: t.asChild ? o : C.jsx("polygon", { points: "0,0 30,0 15,10" }) });
}, "Arrow")), Xl = Yl, ql = Object.defineProperty, Ae = (e, t) => ql(e, "name", { value: t, configurable: true }), Ai = "Popper", [Di, Ue] = ne(Ai), [Zl, ki] = Di(Ai), Ql = Ae((e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = c.useState(null), [i, s] = c.useState(void 0);
  return C.jsx(Zl, { scope: t, anchor: o, onAnchorChange: r, placementState: i, setPlacementState: s, children: n });
}, "Popper"), Jl = "PopperAnchor", eu = c.forwardRef(Ae(function(t, n) {
  const { __scopePopper: o, virtualRef: r, ...i } = t, s = ki(Jl, o), a = c.useRef(null), l = s.onAnchorChange, u = c.useCallback((v) => {
    a.current = v, v && l(v);
  }, [l]), p = B(n, u), f = c.useRef(null);
  c.useEffect(() => {
    if (!r) return;
    const v = f.current;
    f.current = r.current, v !== f.current && l(f.current);
  });
  const d = s.placementState && mn(s.placementState), h = d == null ? void 0 : d[0], m = d == null ? void 0 : d[1];
  return r ? null : C.jsx(L.div, { "data-radix-popper-side": h, "data-radix-popper-align": m, ...i, ref: p });
}, "PopperAnchor")), Fi = "PopperContent", [tu, nu] = Di(Fi), ou = c.forwardRef(Ae(function(t, n) {
  var _a3, _b, _c2, _d2, _e3, _f2, _g;
  const { __scopePopper: o, side: r = "bottom", sideOffset: i = 0, align: s = "center", alignOffset: a = 0, arrowPadding: l = 0, avoidCollisions: u = true, collisionBoundary: p = [], collisionPadding: f = 0, sticky: d = "partial", hideWhenDetached: h = false, updatePositionStrategy: m = "optimized", onPlaced: v, ...g } = t, w = ki(Fi, o), [y, x] = c.useState(null), b = B(n, x), [P, R] = c.useState(null), S = Mt(P), T = (S == null ? void 0 : S.width) ?? 0, O = (S == null ? void 0 : S.height) ?? 0, D = r + (s !== "center" ? "-" + s : ""), E = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, I = Array.isArray(p) ? p : [p], M = I.length > 0, F = { padding: E, boundary: I.filter(ji), altBoundary: M }, { refs: H, floatingStyles: j, placement: N, isPositioned: $, middlewareData: V } = Nl({ strategy: "fixed", placement: D, whileElementsMounted: Ae((...U) => Il(...U, { animationFrame: m === "always" }), "whileElementsMounted"), elements: { reference: w.anchor }, middleware: [$l({ mainAxis: i + O, alignmentAxis: a }), u && Bl({ mainAxis: true, crossAxis: false, limiter: d === "partial" ? Vl() : void 0, ...F }), u && Hl({ ...F }), Gl({ ...F, apply: Ae(({ elements: U, rects: re, availableWidth: z, availableHeight: Y }) => {
    const { width: q, height: Ie } = re.reference, me = U.floating.style;
    me.setProperty("--radix-popper-available-width", `${z}px`), me.setProperty("--radix-popper-available-height", `${Y}px`), me.setProperty("--radix-popper-anchor-width", `${q}px`), me.setProperty("--radix-popper-anchor-height", `${Ie}px`);
  }, "apply") }), P && Ul({ element: P, padding: l }), cu({ arrowWidth: T, arrowHeight: O }), h && Wl({ strategy: "referenceHidden", ...F, boundary: M ? F.boundary : void 0 })] }), A = w.setPlacementState;
  Q(() => (A(N), () => {
    A(void 0);
  }), [N, A]);
  const [J, W] = mn(N), X = ge(v);
  Q(() => {
    $ && (X == null ? void 0 : X());
  }, [$, X]);
  const ce = (_a3 = V.arrow) == null ? void 0 : _a3.x, he = (_b = V.arrow) == null ? void 0 : _b.y, Ee = ((_c2 = V.arrow) == null ? void 0 : _c2.centerOffset) !== 0, [le, k] = c.useState();
  return Q(() => {
    y && k(window.getComputedStyle(y).zIndex);
  }, [y]), C.jsx("div", { ref: H.setFloating, "data-radix-popper-content-wrapper": "", style: { ...j, transform: $ ? j.transform : "translate(0, -200%)", minWidth: "max-content", zIndex: le, "--radix-popper-transform-origin": [(_d2 = V.transformOrigin) == null ? void 0 : _d2.x, (_e3 = V.transformOrigin) == null ? void 0 : _e3.y].join(" "), ...((_f2 = V.hide) == null ? void 0 : _f2.referenceHidden) && { visibility: "hidden", pointerEvents: "none" } }, dir: t.dir, children: C.jsx(tu, { scope: o, placedSide: J, placedAlign: W, onArrowChange: R, arrowX: ce, arrowY: he, shouldHideArrow: Ee, children: C.jsx(L.div, { "data-side": J, "data-align": W, ...g, ref: b, style: { ...g.style, animation: $ ? (_g = g.style) == null ? void 0 : _g.animation : "none" } }) }) });
}, "PopperContent")), ru = "PopperArrow", iu = { top: "bottom", right: "left", bottom: "top", left: "right" }, su = c.forwardRef(Ae(function(t, n) {
  const { __scopePopper: o, ...r } = t, i = nu(ru, o), s = iu[i.placedSide];
  return C.jsx("span", { ref: i.onArrowChange, style: { position: "absolute", left: i.arrowX, top: i.arrowY, [s]: 0, transformOrigin: { top: "", right: "0 0", bottom: "center 0", left: "100% 0" }[i.placedSide], transform: { top: "translateY(100%)", right: "translateY(50%) rotate(90deg) translateX(-50%)", bottom: "rotate(180deg)", left: "translateY(50%) rotate(-90deg) translateX(50%)" }[i.placedSide], visibility: i.shouldHideArrow ? "hidden" : void 0 }, children: C.jsx(Xl, { ...r, ref: n, style: { ...r.style, display: "block" } }) });
}, "PopperArrow"));
function ji(e) {
  return e !== null;
}
Ae(ji, "isNotNull");
var cu = Ae((e) => ({ name: "transformOrigin", options: e, fn(t) {
  var _a3, _b, _c2;
  const { placement: n, rects: o, middlewareData: r } = t, s = ((_a3 = r.arrow) == null ? void 0 : _a3.centerOffset) !== 0, a = s ? 0 : e.arrowWidth, l = s ? 0 : e.arrowHeight, [u, p] = mn(n), f = { start: "0%", center: "50%", end: "100%" }[p], d = (((_b = r.arrow) == null ? void 0 : _b.x) ?? 0) + a / 2, h = (((_c2 = r.arrow) == null ? void 0 : _c2.y) ?? 0) + l / 2;
  let m = "", v = "";
  return u === "bottom" ? (m = s ? f : `${d}px`, v = `${-l}px`) : u === "top" ? (m = s ? f : `${d}px`, v = `${o.floating.height + l}px`) : u === "right" ? (m = `${-l}px`, v = s ? f : `${h}px`) : u === "left" && (m = `${o.floating.width + l}px`, v = s ? f : `${h}px`), { data: { x: m, y: v } };
} }), "transformOrigin");
function mn(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
Ae(mn, "getSideAndAlignFromPlacement");
var vn = Ql, At = eu, gn = ou, Ni = su, au = Object.defineProperty, Io = (e, t) => au(e, "name", { value: t, configurable: true }), Vn = false;
function Li() {
  const [e, t] = c.useState(Vn);
  return c.useEffect(() => {
    Vn || (Vn = true, t(true));
  }, []), e;
}
Io(Li, "useIsHydrated");
var $i = ut[" useSyncExternalStore ".trim().toString()];
function Bi() {
  return () => {
  };
}
Io(Bi, "subscribe");
function Vi() {
  return $i(Bi, () => true, () => false);
}
Io(Vi, "useIsHydratedModern");
var lu = typeof $i == "function" ? Vi : Li, uu = Object.defineProperty, Ze = (e, t) => uu(e, "name", { value: t, configurable: true }), Hn = "rovingFocusGroup.onEntryFocus", du = { bubbles: false, cancelable: true }, Cn = "RovingFocusGroup", [oo, Hi, fu] = rn(Cn), [pu, vt] = ne(Cn, [fu]), [hu, mu] = pu(Cn), vu = c.forwardRef(Ze(function(t, n) {
  return C.jsx(oo.Provider, { scope: t.__scopeRovingFocusGroup, children: C.jsx(oo.Slot, { scope: t.__scopeRovingFocusGroup, children: C.jsx(gu, { ...t, ref: n }) }) });
}, "RovingFocusGroup")), gu = c.forwardRef(Ze(function(t, n) {
  const { __scopeRovingFocusGroup: o, orientation: r, loop: i = false, dir: s, currentTabStopId: a, defaultCurrentTabStopId: l, onCurrentTabStopIdChange: u, onEntryFocus: p, preventScrollOnEntryFocus: f = false, ...d } = t, h = c.useRef(null), m = B(n, h), v = ft(s), [g, w] = de({ prop: a, defaultProp: l ?? null, onChange: u, caller: Cn }), [y, x] = c.useState(false), b = ge(p), P = Hi(o), R = c.useRef(false), [S, T] = c.useState(0);
  return c.useEffect(() => {
    const O = h.current;
    if (O) return O.addEventListener(Hn, b), () => O.removeEventListener(Hn, b);
  }, [b]), C.jsx(hu, { scope: o, orientation: r, dir: v, loop: i, currentTabStopId: g, onItemFocus: c.useCallback((O) => w(O), [w]), onItemShiftTab: c.useCallback(() => x(true), []), onFocusableItemAdd: c.useCallback(() => T((O) => O + 1), []), onFocusableItemRemove: c.useCallback(() => T((O) => O - 1), []), children: C.jsx(L.div, { tabIndex: y || S === 0 ? -1 : 0, "data-orientation": r, ...d, ref: m, style: { outline: "none", ...t.style }, onMouseDown: _(t.onMouseDown, () => {
    R.current = true;
  }), onFocus: _(t.onFocus, (O) => {
    const D = !R.current;
    if (O.target === O.currentTarget && D && !y) {
      const E = new CustomEvent(Hn, du);
      if (O.currentTarget.dispatchEvent(E), !E.defaultPrevented) {
        const I = P().filter((N) => N.focusable), M = I.find((N) => N.active), F = I.find((N) => N.id === g), j = [M, F, ...I].filter(Boolean).map((N) => N.ref.current);
        _o(j, f);
      }
    }
    R.current = false;
  }), onBlur: _(t.onBlur, () => x(false)) }) });
}, "RovingFocusGroupImpl")), Cu = "RovingFocusGroupItem", xu = c.forwardRef(Ze(function(t, n) {
  const { __scopeRovingFocusGroup: o, focusable: r = true, active: i = false, tabStopId: s, children: a, ...l } = t, u = ue(), p = s || u, f = mu(Cu, o), d = f.currentTabStopId === p, h = Hi(o), { onFocusableItemAdd: m, onFocusableItemRemove: v, currentTabStopId: g } = f, w = lu();
  return Q(() => {
    if (!(!w || !r)) return m(), () => v();
  }, [w, r, m, v]), c.useEffect(() => {
    if (!(w || !r)) return m(), () => v();
  }, [w, r, m, v]), C.jsx(oo.ItemSlot, { scope: o, id: p, focusable: r, active: i, children: C.jsx(L.span, { tabIndex: d ? 0 : -1, "data-orientation": f.orientation, ...l, ref: n, onMouseDown: _(t.onMouseDown, (y) => {
    r ? f.onItemFocus(p) : y.preventDefault();
  }), onFocus: _(t.onFocus, () => f.onItemFocus(p)), onKeyDown: _(t.onKeyDown, (y) => {
    if (y.key === "Tab" && y.shiftKey) {
      f.onItemShiftTab();
      return;
    }
    if (y.target !== y.currentTarget) return;
    const x = Wi(y, f.orientation, f.dir);
    if (x !== void 0) {
      if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
      y.preventDefault();
      let P = h().filter((R) => R.focusable).map((R) => R.ref.current);
      if (x === "last") P.reverse();
      else if (x === "prev" || x === "next") {
        x === "prev" && P.reverse();
        const R = P.indexOf(y.currentTarget);
        P = f.loop ? Ui(P, R + 1) : P.slice(R + 1);
      }
      setTimeout(() => _o(P));
    }
  }), children: typeof a == "function" ? a({ isCurrentTabStop: d, hasTabStop: g != null }) : a }) });
}, "RovingFocusGroupItem")), bu = { ArrowLeft: "prev", ArrowUp: "prev", ArrowRight: "next", ArrowDown: "next", PageUp: "first", Home: "first", PageDown: "last", End: "last" };
function Gi(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
Ze(Gi, "getDirectionAwareKey");
function Wi(e, t, n) {
  const o = Gi(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o))) return bu[o];
}
Ze(Wi, "getFocusIntent");
function _o(e, t = false) {
  const n = document.activeElement;
  for (const o of e) if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
Ze(_o, "focusFirst");
function Ui(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
Ze(Ui, "wrapArray");
var To = vu, Oo = xu, wu = Object.defineProperty, K = (e, t) => wu(e, "name", { value: t, configurable: true }), yu = ["Enter", " "], Ru = ["ArrowDown", "PageUp", "Home"], Ki = ["ArrowUp", "PageDown", "End"], Pu = [...Ru, ...Ki], xn = "Menu", [ro, Su, Eu] = rn(xn), [Qe, bn] = ne(xn, [Eu, Ue, vt]), Mo = Ue(), zi = vt(), [Iu, Dt] = Qe(xn), [_u, Ao] = Qe(xn), Tu = K((e) => {
  const { __scopeMenu: t, open: n = false, children: o, dir: r, onOpenChange: i, modal: s = true } = e, a = Mo(t), [l, u] = c.useState(null), p = c.useRef(false), f = ge(i), d = ft(r);
  return c.useEffect(() => {
    const h = K(() => {
      p.current = true, document.addEventListener("pointerdown", m, { capture: true, once: true }), document.addEventListener("pointermove", m, { capture: true, once: true });
    }, "handleKeyDown"), m = K(() => p.current = false, "handlePointer");
    return document.addEventListener("keydown", h, { capture: true }), () => {
      document.removeEventListener("keydown", h, { capture: true }), document.removeEventListener("pointerdown", m, { capture: true }), document.removeEventListener("pointermove", m, { capture: true });
    };
  }, []), c.useEffect(() => {
    if (!n) return;
    const h = K(() => f(false), "handleBlur");
    return window.addEventListener("blur", h), () => window.removeEventListener("blur", h);
  }, [n, f]), C.jsx(vn, { ...a, children: C.jsx(Iu, { scope: t, open: n, onOpenChange: f, content: l, onContentChange: u, children: C.jsx(_u, { scope: t, onClose: c.useCallback(() => f(false), [f]), isUsingKeyboardRef: p, dir: d, modal: s, children: o }) }) });
}, "Menu"), Ou = c.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, ...r } = t, i = Mo(o);
  return C.jsx(At, { ...i, ...r, ref: n });
}, "MenuAnchor")), Yi = "MenuPortal", [Mu, Au] = Qe(Yi, { forceMount: void 0 }), Du = K((e) => {
  const { __scopeMenu: t, forceMount: n, children: o, container: r } = e, i = Dt(Yi, t);
  return C.jsx(Mu, { scope: t, forceMount: n, children: C.jsx(fe, { present: n || i.open, children: C.jsx(Tt, { asChild: true, container: r, children: o }) }) });
}, "MenuPortal"), Be = "MenuContent", [ku, Xi] = Qe(Be), Fu = c.forwardRef(K(function(t, n) {
  const o = Au(Be, t.__scopeMenu), { forceMount: r = o.forceMount, ...i } = t, s = Dt(Be, t.__scopeMenu), a = Ao(Be, t.__scopeMenu);
  return C.jsx(ro.Provider, { scope: t.__scopeMenu, children: C.jsx(fe, { present: r || s.open, children: C.jsx(ro.Slot, { scope: t.__scopeMenu, children: a.modal ? C.jsx(ju, { ...i, ref: n }) : C.jsx(Nu, { ...i, ref: n }) }) }) });
}, "MenuContent")), ju = c.forwardRef(K(function(t, n) {
  const o = Dt(Be, t.__scopeMenu), r = c.useRef(null), i = B(n, r);
  return c.useEffect(() => {
    const s = r.current;
    if (s) return an(s);
  }, []), C.jsx(qi, { ...t, ref: i, trapFocus: o.open, disableOutsidePointerEvents: o.open, disableOutsideScroll: true, onFocusOutside: _(t.onFocusOutside, (s) => s.preventDefault(), { checkForDefaultPrevented: false }), onDismiss: () => o.onOpenChange(false) });
}, "MenuRootContentModal")), Nu = c.forwardRef(K(function(t, n) {
  const o = Dt(Be, t.__scopeMenu);
  return C.jsx(qi, { ...t, ref: n, trapFocus: false, disableOutsidePointerEvents: false, disableOutsideScroll: false, onDismiss: () => o.onOpenChange(false) });
}, "MenuRootContentNonModal")), Lu = ye("MenuContent.ScrollLock"), qi = c.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, loop: r = false, trapFocus: i, onOpenAutoFocus: s, onCloseAutoFocus: a, disableOutsidePointerEvents: l, onEntryFocus: u, onEscapeKeyDown: p, onPointerDownOutside: f, onFocusOutside: d, onInteractOutside: h, onDismiss: m, disableOutsideScroll: v, ...g } = t, w = Dt(Be, o), y = Ao(Be, o), x = Mo(o), b = zi(o), P = Su(o), [R, S] = c.useState(null), T = c.useRef(null), O = B(n, T, w.onContentChange), D = c.useRef(0), E = c.useRef(""), I = c.useRef(0), M = c.useRef(null), F = c.useRef("right"), H = c.useRef(0), j = v ? Ot : c.Fragment, N = v ? { as: Lu, allowPinchZoom: true } : void 0, $ = K((A) => {
    var _a3, _b;
    const J = E.current + A, W = P().filter((k) => !k.disabled), X = document.activeElement, ce = (_a3 = W.find((k) => k.ref.current === X)) == null ? void 0 : _a3.textValue, he = W.map((k) => k.textValue), Ee = ts(he, J, ce), le = (_b = W.find((k) => k.textValue === Ee)) == null ? void 0 : _b.ref.current;
    K((function k(U) {
      E.current = U, window.clearTimeout(D.current), U !== "" && (D.current = window.setTimeout(() => k(""), 1e3));
    }), "updateSearch")(J), le && setTimeout(() => le.focus());
  }, "handleTypeaheadSearch");
  c.useEffect(() => () => window.clearTimeout(D.current), []), pt();
  const V = c.useCallback((A) => {
    var _a3, _b;
    return F.current === ((_a3 = M.current) == null ? void 0 : _a3.side) && os(A, (_b = M.current) == null ? void 0 : _b.area);
  }, []);
  return C.jsx(ku, { scope: o, searchRef: E, onItemEnter: c.useCallback((A) => {
    V(A) && A.preventDefault();
  }, [V]), onItemLeave: c.useCallback((A) => {
    var _a3;
    V(A) || ((_a3 = T.current) == null ? void 0 : _a3.focus(), S(null));
  }, [V]), onTriggerLeave: c.useCallback((A) => {
    V(A) && A.preventDefault();
  }, [V]), pointerGraceTimerRef: I, onPointerGraceIntentChange: c.useCallback((A) => {
    M.current = A;
  }, []), children: C.jsx(j, { ...N, children: C.jsx(sn, { asChild: true, trapped: i, onMountAutoFocus: _(s, (A) => {
    var _a3;
    A.preventDefault(), (_a3 = T.current) == null ? void 0 : _a3.focus({ preventScroll: true });
  }), onUnmountAutoFocus: a, children: C.jsx(_t, { asChild: true, disableOutsidePointerEvents: l, onEscapeKeyDown: p, onPointerDownOutside: f, onFocusOutside: d, onInteractOutside: h, onDismiss: m, children: C.jsx(To, { asChild: true, ...b, dir: y.dir, orientation: "vertical", loop: r, currentTabStopId: R, onCurrentTabStopIdChange: S, onEntryFocus: _(u, (A) => {
    y.isUsingKeyboardRef.current || A.preventDefault();
  }), preventScrollOnEntryFocus: true, children: C.jsx(gn, { role: "menu", "aria-orientation": "vertical", "data-state": Zi(w.open), "data-radix-menu-content": "", dir: y.dir, ...x, ...g, ref: O, style: { outline: "none", ...g.style }, onKeyDown: _(g.onKeyDown, (A) => {
    const W = A.target.closest("[data-radix-menu-content]") === A.currentTarget, X = A.ctrlKey || A.altKey || A.metaKey, ce = A.key.length === 1;
    W && (A.key === "Tab" && A.preventDefault(), !X && ce && $(A.key));
    const he = T.current;
    if (A.target !== he || !Pu.includes(A.key)) return;
    A.preventDefault();
    const le = P().filter((k) => !k.disabled).map((k) => k.ref.current);
    Ki.includes(A.key) && le.reverse(), Ji(le);
  }), onBlur: _(t.onBlur, (A) => {
    A.currentTarget.contains(A.target) || (window.clearTimeout(D.current), E.current = "");
  }), onPointerMove: _(t.onPointerMove, on((A) => {
    const J = A.target, W = H.current !== A.clientX;
    if (A.currentTarget.contains(J) && W) {
      const X = A.clientX > H.current ? "right" : "left";
      F.current = X, H.current = A.clientX;
    }
  })) }) }) }) }) }) });
}, "MenuContentImpl")), io = "MenuItem", Rr = "menu.itemSelect", $u = c.forwardRef(K(function(t, n) {
  const { disabled: o = false, onSelect: r, ...i } = t, s = c.useRef(null), a = Ao(io, t.__scopeMenu), l = Xi(io, t.__scopeMenu), u = B(n, s), p = c.useRef(false), f = K(() => {
    const d = s.current;
    if (!o && d) {
      const h = new CustomEvent(Rr, { bubbles: true, cancelable: true });
      d.addEventListener(Rr, (m) => r == null ? void 0 : r(m), { once: true }), fo(d, h), h.defaultPrevented ? p.current = false : a.onClose();
    }
  }, "handleSelect");
  return C.jsx(Bu, { ...i, ref: u, disabled: o, onClick: _(t.onClick, f), onPointerDown: (d) => {
    var _a3;
    (_a3 = t.onPointerDown) == null ? void 0 : _a3.call(t, d), p.current = true;
  }, onPointerUp: _(t.onPointerUp, (d) => {
    var _a3;
    p.current || ((_a3 = d.currentTarget) == null ? void 0 : _a3.click());
  }), onKeyDown: _(t.onKeyDown, (d) => {
    o || d.target !== d.currentTarget || l.searchRef.current !== "" && d.key === " " || yu.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
  }) });
}, "MenuItem")), Bu = c.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, disabled: r = false, textValue: i, ...s } = t, a = Xi(io, o), l = zi(o), u = c.useRef(null), p = B(n, u), [f, d] = c.useState(false), [h, m] = c.useState("");
  return c.useEffect(() => {
    const v = u.current;
    v && m((v.textContent ?? "").trim());
  }, [s.children]), C.jsx(ro.ItemSlot, { scope: o, disabled: r, textValue: i ?? h, children: C.jsx(Oo, { asChild: true, ...l, focusable: !r, children: C.jsx(L.div, { role: "menuitem", "data-highlighted": f ? "" : void 0, "aria-disabled": r || void 0, "data-disabled": r ? "" : void 0, ...s, ref: p, onPointerMove: _(t.onPointerMove, on((v) => {
    r ? a.onItemLeave(v) : (a.onItemEnter(v), v.defaultPrevented || v.currentTarget.focus({ preventScroll: true }));
  })), onPointerLeave: _(t.onPointerLeave, on((v) => a.onItemLeave(v))), onFocus: _(t.onFocus, () => d(true)), onBlur: _(t.onBlur, () => d(false)) }) }) });
}, "MenuItemImpl")), Vu = "MenuRadioGroup", [Sp, Ep] = Qe(Vu, { value: void 0, onValueChange: K(() => {
}, "onValueChange") }), Hu = "MenuItemIndicator", [Ip, _p] = Qe(Hu, { checked: false }), Gu = c.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, ...r } = t;
  return C.jsx(L.div, { role: "separator", "aria-orientation": "horizontal", ...r, ref: n });
}, "MenuSeparator")), Wu = "MenuSub", [Tp, Op] = Qe(Wu);
function Zi(e) {
  return e ? "open" : "closed";
}
K(Zi, "getOpenState");
function Qi(e) {
  return e === "indeterminate";
}
K(Qi, "isIndeterminate");
function Uu(e) {
  return Qi(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
K(Uu, "getCheckedState");
function Ji(e) {
  const t = document.activeElement;
  for (const n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
K(Ji, "focusFirst");
function es(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
K(es, "wrapArray");
function ts(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1;
  let s = es(e, Math.max(i, 0));
  r.length === 1 && (s = s.filter((u) => u !== n));
  const l = s.find((u) => u.toLowerCase().startsWith(r.toLowerCase()));
  return l !== n ? l : void 0;
}
K(ts, "getNextMatch");
function ns(e, t) {
  const { x: n, y: o } = e;
  let r = false;
  for (let i = 0, s = t.length - 1; i < t.length; s = i++) {
    const a = t[i], l = t[s], u = a.x, p = a.y, f = l.x, d = l.y;
    p > o != d > o && n < (f - u) * (o - p) / (d - p) + u && (r = !r);
  }
  return r;
}
K(ns, "isPointInPolygon");
function os(e, t) {
  if (!t) return false;
  const n = { x: e.clientX, y: e.clientY };
  return ns(n, t);
}
K(os, "isPointerInGraceArea");
function on(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
K(on, "whenMouse");
var rs = Tu, is = Ou, ss = Du, cs = Fu, as = $u, Ku = Gu, zu = Object.defineProperty, De = (e, t) => zu(e, "name", { value: t, configurable: true }), Do = "ContextMenu", [Yu, Mp] = ne(Do, [bn]), gt = bn(), [Xu, ls] = Yu(Do), qu = De((e) => {
  const { __scopeContextMenu: t, children: n, onOpenChange: o, open: r, dir: i, modal: s = true } = e, a = c.useRef(false), [l, u] = de({ prop: r, defaultProp: false, onChange: o, caller: Do }), p = gt(t);
  return C.jsx(Xu, { scope: t, open: l, onOpenChange: u, modal: s, hasInteractedRef: a, children: C.jsx(rs, { ...p, dir: i, open: l, onOpenChange: u, modal: s, children: n }) });
}, "ContextMenu"), Zu = "ContextMenuTrigger", Qu = c.forwardRef(De(function(t, n) {
  const { __scopeContextMenu: o, disabled: r = false, ...i } = t, s = ls(Zu, o), a = gt(o), [l, u] = c.useState({ x: 0, y: 0 }), p = c.useMemo(() => ({ current: { getBoundingClientRect: De(() => DOMRect.fromRect({ width: 0, height: 0, ...l }), "getBoundingClientRect") } }), [l]), f = c.useRef(0), d = c.useCallback(() => window.clearTimeout(f.current), []), h = De((m) => {
    s.hasInteractedRef.current = true, u({ x: m.clientX, y: m.clientY }), s.onOpenChange(true);
  }, "handleOpen");
  return c.useEffect(() => d, [d]), c.useEffect(() => {
    r && d();
  }, [r, d]), C.jsxs(C.Fragment, { children: [C.jsx(is, { ...a, virtualRef: p }), C.jsx(L.span, { "data-state": s.open ? "open" : "closed", "data-disabled": r ? "" : void 0, ...i, ref: n, style: { WebkitTouchCallout: "none", ...t.style }, onContextMenu: r ? t.onContextMenu : _(t.onContextMenu, (m) => {
    d(), h(m), m.preventDefault();
  }), onPointerDown: r ? t.onPointerDown : _(t.onPointerDown, bt((m) => {
    d(), s.open && s.onOpenChange(false), f.current = window.setTimeout(() => h(m), 700);
  })), onPointerMove: r ? t.onPointerMove : _(t.onPointerMove, bt(d)), onPointerCancel: r ? t.onPointerCancel : _(t.onPointerCancel, bt(d)), onPointerUp: r ? t.onPointerUp : _(t.onPointerUp, bt(d)) })] });
}, "ContextMenuTrigger")), Ju = De((e) => {
  const { __scopeContextMenu: t, ...n } = e, o = gt(t);
  return C.jsx(ss, { ...o, ...n });
}, "ContextMenuPortal"), ed = "ContextMenuContent", td = c.forwardRef(De(function(t, n) {
  const { __scopeContextMenu: o, ...r } = t, i = ls(ed, o), s = gt(o), a = c.useRef(false);
  return C.jsx(cs, { ...s, ...r, ref: n, side: "right", sideOffset: 2, align: "start", onCloseAutoFocus: (l) => {
    var _a3;
    (_a3 = t.onCloseAutoFocus) == null ? void 0 : _a3.call(t, l), !l.defaultPrevented && a.current && l.preventDefault(), a.current = false;
  }, onInteractOutside: (l) => {
    var _a3;
    (_a3 = t.onInteractOutside) == null ? void 0 : _a3.call(t, l), !l.defaultPrevented && !i.modal && (a.current = true);
  }, style: { ...t.style, "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)", "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)", "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)", "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)" } });
}, "ContextMenuContent")), nd = c.forwardRef(De(function(t, n) {
  const { __scopeContextMenu: o, ...r } = t, i = gt(o);
  return C.jsx(as, { ...i, ...r, ref: n });
}, "ContextMenuItem")), od = c.forwardRef(De(function(t, n) {
  const { __scopeContextMenu: o, ...r } = t, i = gt(o);
  return C.jsx(Ku, { ...i, ...r, ref: n });
}, "ContextMenuSeparator"));
function bt(e) {
  return (t) => t.pointerType !== "mouse" ? e(t) : void 0;
}
De(bt, "whenTouchOrPen");
var Ap = qu, Dp = Qu, kp = Ju, Fp = td, jp = nd, Np = od, rd = Object.defineProperty, kt = (e, t) => rd(e, "name", { value: t, configurable: true }), ko = "DropdownMenu", [id, Lp] = ne(ko, [bn]), Ft = bn(), [sd, us] = id(ko), cd = kt((e) => {
  const { __scopeDropdownMenu: t, children: n, dir: o, open: r, defaultOpen: i, onOpenChange: s, modal: a = true } = e, l = Ft(t), u = c.useRef(null), [p, f] = de({ prop: r, defaultProp: i ?? false, onChange: s, caller: ko });
  return C.jsx(sd, { scope: t, triggerId: ue(), triggerRef: u, contentId: ue(), open: p, onOpenChange: f, onOpenToggle: c.useCallback(() => f((d) => !d), [f]), modal: a, children: C.jsx(rs, { ...l, open: p, onOpenChange: f, dir: o, modal: a, children: n }) });
}, "DropdownMenu"), ad = "DropdownMenuTrigger", ld = c.forwardRef(kt(function(t, n) {
  const { __scopeDropdownMenu: o, disabled: r = false, ...i } = t, s = us(ad, o), a = Ft(o), l = B(n, s.triggerRef);
  return C.jsx(is, { asChild: true, ...a, children: C.jsx(L.button, { type: "button", id: s.triggerId, "aria-haspopup": "menu", "aria-expanded": s.open, "aria-controls": s.open ? s.contentId : void 0, "data-state": s.open ? "open" : "closed", "data-disabled": r ? "" : void 0, disabled: r, ...i, ref: l, onPointerDown: _(t.onPointerDown, (u) => {
    !r && u.button === 0 && u.ctrlKey === false && (s.onOpenToggle(), s.open || u.preventDefault());
  }), onKeyDown: _(t.onKeyDown, (u) => {
    r || (["Enter", " "].includes(u.key) && s.onOpenToggle(), u.key === "ArrowDown" && s.onOpenChange(true), ["Enter", " ", "ArrowDown"].includes(u.key) && u.preventDefault());
  }) }) });
}, "DropdownMenuTrigger")), ud = kt((e) => {
  const { __scopeDropdownMenu: t, ...n } = e, o = Ft(t);
  return C.jsx(ss, { ...o, ...n });
}, "DropdownMenuPortal"), dd = "DropdownMenuContent", fd = c.forwardRef(kt(function(t, n) {
  const { __scopeDropdownMenu: o, ...r } = t, i = us(dd, o), s = Ft(o), a = c.useRef(false);
  return C.jsx(cs, { id: i.contentId, "aria-labelledby": i.triggerId, ...s, ...r, ref: n, onCloseAutoFocus: _(t.onCloseAutoFocus, (l) => {
    var _a3;
    a.current || ((_a3 = i.triggerRef.current) == null ? void 0 : _a3.focus()), a.current = false, l.preventDefault();
  }), onInteractOutside: _(t.onInteractOutside, (l) => {
    const u = l.detail.originalEvent, p = u.button === 0 && u.ctrlKey === true, f = u.button === 2 || p;
    (!i.modal || f) && (a.current = true);
  }), style: { ...t.style, "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)", "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)", "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)", "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)" } });
}, "DropdownMenuContent")), pd = c.forwardRef(kt(function(t, n) {
  const { __scopeDropdownMenu: o, ...r } = t, i = Ft(o);
  return C.jsx(as, { ...i, ...r, ref: n });
}, "DropdownMenuItem")), $p = cd, Bp = ld, Vp = ud, Hp = fd, Gp = pd, hd = Object.defineProperty, md = (e, t) => hd(e, "name", { value: t, configurable: true }), vd = c.forwardRef(md(function(t, n) {
  return C.jsx(L.label, { ...t, ref: n, onMouseDown: (o) => {
    var _a3;
    o.target.closest("button, input, select, textarea") || ((_a3 = t.onMouseDown) == null ? void 0 : _a3.call(t, o), !o.defaultPrevented && o.detail > 1 && o.preventDefault());
  } });
}, "Label")), gd = Object.defineProperty, oe = (e, t) => gd(e, "name", { value: t, configurable: true }), [Fo, Wp] = ne("Form"), ds = "Form", [Cd, jo] = Fo(ds), [xd, bd] = Fo(ds), wd = c.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, onClearServerErrors: r = oe(() => {
  }, "onClearServerErrors"), ...i } = t, s = c.useRef(null), a = B(n, s), [l, u] = c.useState({}), p = c.useCallback((E) => l[E], [l]), f = c.useCallback((E, I) => u((M) => ({ ...M, [E]: { ...M[E] ?? {}, ...I } })), []), d = c.useCallback((E) => {
    u((I) => ({ ...I, [E]: void 0 })), x((I) => ({ ...I, [E]: {} }));
  }, []), [h, m] = c.useState({}), v = c.useCallback((E) => h[E] ?? [], [h]), g = c.useCallback((E, I) => {
    m((M) => ({ ...M, [E]: [...M[E] ?? [], I] }));
  }, []), w = c.useCallback((E, I) => {
    m((M) => ({ ...M, [E]: (M[E] ?? []).filter((F) => F.id !== I) }));
  }, []), [y, x] = c.useState({}), b = c.useCallback((E) => y[E] ?? {}, [y]), P = c.useCallback((E, I) => {
    x((M) => ({ ...M, [E]: { ...M[E] ?? {}, ...I } }));
  }, []), [R, S] = c.useState({}), T = c.useCallback((E, I) => {
    S((M) => {
      const F = new Set(M[E]).add(I);
      return { ...M, [E]: F };
    });
  }, []), O = c.useCallback((E, I) => {
    S((M) => {
      const F = new Set(M[E]);
      return F.delete(I), { ...M, [E]: F };
    });
  }, []), D = c.useCallback((E) => Array.from(R[E] ?? []).join(" ") || void 0, [R]);
  return C.jsx(Cd, { scope: o, getFieldValidity: p, onFieldValidityChange: f, getFieldCustomMatcherEntries: v, onFieldCustomMatcherEntryAdd: g, onFieldCustomMatcherEntryRemove: w, getFieldCustomErrors: b, onFieldCustomErrorsChange: P, onFieldValiditionClear: d, children: C.jsx(xd, { scope: o, onFieldMessageIdAdd: T, onFieldMessageIdRemove: O, getFieldDescription: D, children: C.jsx(L.form, { ...i, ref: a, onInvalid: _(t.onInvalid, (E) => {
    const I = No(E.currentTarget);
    I === E.target && I.focus(), E.preventDefault();
  }), onSubmit: _(t.onSubmit, r, { checkForDefaultPrevented: false }), onReset: _(t.onReset, r) }) }) });
}, "Form")), at = "FormField", [yd, fs] = Fo(at), Rd = c.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, name: r, serverInvalid: i = false, ...s } = t, l = jo(at, o).getFieldValidity(r), u = ue();
  return C.jsx(yd, { scope: o, id: u, name: r, serverInvalid: i, children: C.jsx(L.div, { "data-valid": wn(l, i), "data-invalid": yn(l, i), ...s, ref: n }) });
}, "FormField")), Kt = "FormLabel", Pd = c.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, name: r, ...i } = t, s = jo(Kt, o), a = fs(Kt, o, { optional: true }), l = r ?? (a == null ? void 0 : a.name);
  if (!l) throw new Error(`\`${Kt}\` must be used within \`${at}\` or specify the \`name\` prop`);
  const u = i.htmlFor || (a == null ? void 0 : a.id);
  if (!u) throw new Error(`\`${Kt}\` must be used within \`${at}\` or specify the \`htmlFor\` prop`);
  const p = s.getFieldValidity(l), f = (a == null ? void 0 : a.serverInvalid) ?? false;
  return C.jsx(vd, { "data-valid": wn(p, f), "data-invalid": yn(p, f), ...i, ref: n, htmlFor: u });
}, "FormLabel")), xt = "FormControl", Sd = c.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, name: r, id: i, ...s } = t, a = jo(xt, o), l = fs(xt, o, { optional: true }), u = bd(xt, o), p = c.useRef(null), f = B(n, p), d = r || (l == null ? void 0 : l.name);
  if (!d) throw new Error(`\`${xt}\` must be used within \`${at}\` or specify the \`name\` prop`);
  const h = i || (l == null ? void 0 : l.id);
  if (!h) throw new Error(`\`${xt}\` must be used within \`${at}\` or specify the \`id\` prop`);
  const m = a.getFieldCustomMatcherEntries(d), { onFieldValidityChange: v, onFieldCustomErrorsChange: g, onFieldValiditionClear: w } = a, y = c.useCallback(async (R) => {
    if (xs(R.validity)) {
      const j = Qt(R.validity);
      v(d, j);
      return;
    }
    const S = R.form ? new FormData(R.form) : new FormData(), T = [R.value, S], O = [], D = [];
    m.forEach((j) => {
      vs(j, T) ? D.push(j) : gs(j) && O.push(j);
    });
    const E = O.map(({ id: j, match: N }) => [j, N(...T)]), I = Object.fromEntries(E), M = Object.values(I).some(Boolean), F = M;
    R.setCustomValidity(F ? Pr : "");
    const H = Qt(R.validity);
    if (v(d, H), g(d, I), !M && D.length > 0) {
      const j = D.map(({ id: W, match: X }) => X(...T).then((ce) => [W, ce])), N = await Promise.all(j), $ = Object.fromEntries(N), A = Object.values($).some(Boolean);
      R.setCustomValidity(A ? Pr : "");
      const J = Qt(R.validity);
      v(d, J), g(d, $);
    }
  }, [m, d, g, v]);
  c.useEffect(() => {
    const R = p.current;
    if (R) {
      const S = oe(() => y(R), "handleChange");
      return R.addEventListener("change", S), () => R.removeEventListener("change", S);
    }
  }, [y]);
  const x = c.useCallback(() => {
    const R = p.current;
    R && (R.setCustomValidity(""), w(d));
  }, [d, w]);
  c.useEffect(() => {
    var _a3;
    const R = (_a3 = p.current) == null ? void 0 : _a3.form;
    if (R) return R.addEventListener("reset", x), () => R.removeEventListener("reset", x);
  }, [x]);
  const b = (l == null ? void 0 : l.serverInvalid) ?? false;
  c.useEffect(() => {
    if (!b) return;
    const R = p.current, S = R == null ? void 0 : R.closest("form"), T = S ? No(S) : null;
    T === R && (T == null ? void 0 : T.focus());
  }, [b]);
  const P = a.getFieldValidity(d);
  return C.jsx(L.input, { "data-valid": wn(P, b), "data-invalid": yn(P, b), "aria-invalid": b || void 0, "aria-describedby": u.getFieldDescription(d), title: "", ...s, ref: f, id: h, name: d, onInvalid: _(t.onInvalid, (R) => {
    const S = R.currentTarget;
    y(S);
  }), onChange: _(t.onChange, (R) => {
    x();
  }) });
}, "FormControl")), Pr = "This value is not valid";
function Qt(e) {
  const t = {};
  for (const n in e) t[n] = e[n];
  return t;
}
oe(Qt, "validityStateToObject");
function ps(e) {
  return e instanceof HTMLElement;
}
oe(ps, "isHTMLElement");
function hs(e) {
  return "validity" in e;
}
oe(hs, "isFormControl");
function ms(e) {
  return hs(e) && (e.validity.valid === false || e.getAttribute("aria-invalid") === "true");
}
oe(ms, "isInvalid");
function No(e) {
  const t = e.elements, [n] = Array.from(t).filter(ps).filter(ms);
  return n ?? null;
}
oe(No, "getFirstInvalidControl");
function vs(e, t) {
  return e.match.constructor.name === "AsyncFunction" || Cs(e.match, t);
}
oe(vs, "isAsyncCustomMatcherEntry");
function gs(e) {
  return e.match.constructor.name === "Function";
}
oe(gs, "isSyncCustomMatcherEntry");
function Cs(e, t) {
  return e(...t) instanceof Promise;
}
oe(Cs, "returnsPromise");
function xs(e) {
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
oe(xs, "hasBuiltInError");
function wn(e, t) {
  if ((e == null ? void 0 : e.valid) === true && !t) return true;
}
oe(wn, "getValidAttribute");
function yn(e, t) {
  if ((e == null ? void 0 : e.valid) === false || t) return true;
}
oe(yn, "getInvalidAttribute");
var Up = wd, Kp = Rd, zp = Pd, Yp = Sd, Ed = Object.defineProperty, Id = (e, t) => Ed(e, "name", { value: t, configurable: true });
function bs(e) {
  const t = c.useRef({ value: e, previous: e });
  return c.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
Id(bs, "usePrevious");
var _d = Object.defineProperty, Td = (e, t) => _d(e, "name", { value: t, configurable: true });
function so(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
Td(so, "clamp");
var Od = Object.defineProperty, Se = (e, t) => Od(e, "name", { value: t, configurable: true }), Lo = "Popover", [ws, Xp] = ne(Lo, [Ue]), jt = Ue(), [Md, Je] = ws(Lo), Ad = Se((e) => {
  const { __scopePopover: t, children: n, open: o, defaultOpen: r, onOpenChange: i, modal: s = false } = e, a = jt(t), l = c.useRef(null), [u, p] = c.useState(false), [f, d] = de({ prop: o, defaultProp: r ?? false, onChange: i, caller: Lo });
  return C.jsx(vn, { ...a, children: C.jsx(Md, { scope: t, contentId: ue(), triggerRef: l, open: f, onOpenChange: d, onOpenToggle: c.useCallback(() => d((h) => !h), [d]), hasCustomAnchor: u, onCustomAnchorAdd: c.useCallback(() => p(true), []), onCustomAnchorRemove: c.useCallback(() => p(false), []), modal: s, children: n }) });
}, "Popover"), Dd = "PopoverAnchor", kd = c.forwardRef(Se(function(t, n) {
  const { __scopePopover: o, ...r } = t, i = Je(Dd, o), s = jt(o), { onCustomAnchorAdd: a, onCustomAnchorRemove: l } = i;
  return c.useEffect(() => (a(), () => l()), [a, l]), C.jsx(At, { ...s, ...r, ref: n });
}, "PopoverAnchor")), Fd = "PopoverTrigger", jd = c.forwardRef(Se(function(t, n) {
  const { __scopePopover: o, ...r } = t, i = Je(Fd, o), s = jt(o), a = B(n, i.triggerRef), l = C.jsx(L.button, { type: "button", "aria-haspopup": "dialog", "aria-expanded": i.open, "aria-controls": i.open ? i.contentId : void 0, "data-state": $o(i.open), ...r, ref: a, onClick: _(t.onClick, i.onOpenToggle) });
  return i.hasCustomAnchor ? l : C.jsx(At, { asChild: true, ...s, children: l });
}, "PopoverTrigger")), ys = "PopoverPortal", [Nd, Ld] = ws(ys, { forceMount: void 0 }), $d = Se((e) => {
  const { __scopePopover: t, forceMount: n, children: o, container: r } = e, i = Je(ys, t);
  return C.jsx(Nd, { scope: t, forceMount: n, children: C.jsx(fe, { present: n || i.open, children: C.jsx(Tt, { asChild: true, container: r, children: o }) }) });
}, "PopoverPortal"), Pt = "PopoverContent", Bd = c.forwardRef(Se(function(t, n) {
  const o = Ld(Pt, t.__scopePopover), { forceMount: r = o.forceMount, ...i } = t, s = Je(Pt, t.__scopePopover);
  return C.jsx(fe, { present: r || s.open, children: s.modal ? C.jsx(Hd, { ...i, ref: n }) : C.jsx(Gd, { ...i, ref: n }) });
}, "PopoverContent")), Vd = ye("PopoverContent.RemoveScroll"), Hd = c.forwardRef(Se(function(t, n) {
  const o = Je(Pt, t.__scopePopover), r = c.useRef(null), i = B(n, r), s = c.useRef(false);
  return c.useEffect(() => {
    const a = r.current;
    if (a) return an(a);
  }, []), C.jsx(Ot, { as: Vd, allowPinchZoom: true, children: C.jsx(Rs, { ...t, ref: i, trapFocus: o.open, disableOutsidePointerEvents: true, onCloseAutoFocus: _(t.onCloseAutoFocus, (a) => {
    var _a3;
    a.preventDefault(), s.current || ((_a3 = o.triggerRef.current) == null ? void 0 : _a3.focus());
  }), onPointerDownOutside: _(t.onPointerDownOutside, (a) => {
    const l = a.detail.originalEvent, u = l.button === 0 && l.ctrlKey === true, p = l.button === 2 || u;
    s.current = p;
  }, { checkForDefaultPrevented: false }), onFocusOutside: _(t.onFocusOutside, (a) => a.preventDefault(), { checkForDefaultPrevented: false }) }) });
}, "PopoverContentModal")), Gd = c.forwardRef(Se(function(t, n) {
  const o = Je(Pt, t.__scopePopover), r = c.useRef(false), i = c.useRef(false);
  return C.jsx(Rs, { ...t, ref: n, trapFocus: false, disableOutsidePointerEvents: false, onCloseAutoFocus: (s) => {
    var _a3, _b;
    (_a3 = t.onCloseAutoFocus) == null ? void 0 : _a3.call(t, s), s.defaultPrevented || (r.current || ((_b = o.triggerRef.current) == null ? void 0 : _b.focus()), s.preventDefault()), r.current = false, i.current = false;
  }, onInteractOutside: (s) => {
    var _a3, _b;
    (_a3 = t.onInteractOutside) == null ? void 0 : _a3.call(t, s), s.defaultPrevented || (r.current = true, s.detail.originalEvent.type === "pointerdown" && (i.current = true));
    const a = s.target;
    ((_b = o.triggerRef.current) == null ? void 0 : _b.contains(a)) && s.preventDefault(), s.detail.originalEvent.type === "focusin" && i.current && s.preventDefault();
  } });
}, "PopoverContentNonModal")), Rs = c.forwardRef(Se(function(t, n) {
  const { __scopePopover: o, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: s, disableOutsidePointerEvents: a, onEscapeKeyDown: l, onPointerDownOutside: u, onFocusOutside: p, onInteractOutside: f, ...d } = t, h = Je(Pt, o), m = jt(o);
  return pt(), C.jsx(sn, { asChild: true, loop: true, trapped: r, onMountAutoFocus: i, onUnmountAutoFocus: s, children: C.jsx(_t, { asChild: true, disableOutsidePointerEvents: a, onInteractOutside: f, onEscapeKeyDown: l, onPointerDownOutside: u, onFocusOutside: p, onDismiss: () => h.onOpenChange(false), deferPointerDownOutside: true, children: C.jsx(gn, { "data-state": $o(h.open), role: "dialog", id: h.contentId, ...m, ...d, ref: n, style: { ...d.style, "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-popover-content-available-width": "var(--radix-popper-available-width)", "--radix-popover-content-available-height": "var(--radix-popper-available-height)", "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)", "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)" } }) }) });
}, "PopoverContentImpl")), Wd = c.forwardRef(Se(function(t, n) {
  const { __scopePopover: o, ...r } = t, i = jt(o);
  return C.jsx(Ni, { ...i, ...r, ref: n });
}, "PopoverArrow"));
function $o(e) {
  return e ? "open" : "closed";
}
Se($o, "getState");
var qp = Ad, Zp = kd, Qp = jd, Jp = $d, eh = Bd, th = Wd, Ud = Object.defineProperty, ie = (e, t) => Ud(e, "name", { value: t, configurable: true }), Ps = "Radio", [Kd, Ss] = ne(Ps), [zd, Rn] = Kd(Ps);
function Es(e) {
  const { __scopeRadio: t, checked: n = false, children: o, disabled: r, form: i, name: s, onCheck: a, required: l, value: u = "on", internal_do_not_use_render: p } = e, [f, d] = c.useState(null), [h, m] = c.useState(null), v = c.useRef(false), [g, w] = c.useReducer((b) => b + 1, 0), y = f ? !!i || !!f.closest("form") : true, x = { checked: n, disabled: r, required: l, name: s, form: i, value: u, control: f, setControl: d, hasConsumerStoppedPropagationRef: v, userInteractionCount: g, onUserInteraction: w, isFormControl: y, bubbleInput: h, setBubbleInput: m, onCheck: ie(() => a == null ? void 0 : a(), "onCheck") };
  return C.jsx(zd, { scope: t, ...x, children: Is(p) ? p(x) : o });
}
ie(Es, "RadioProvider");
var Yd = "RadioTrigger", Xd = c.forwardRef(ie(function({ __scopeRadio: t, onClick: n, ...o }, r) {
  const { checked: i, disabled: s, value: a, setControl: l, onCheck: u, hasConsumerStoppedPropagationRef: p, onUserInteraction: f, isFormControl: d, bubbleInput: h } = Rn(Yd, t), m = B(r, l);
  return C.jsx(L.button, { type: "button", role: "radio", "aria-checked": i, "data-state": Bo(i), "data-disabled": s ? "" : void 0, disabled: s, value: a, ...o, ref: m, onClick: _(n, (v) => {
    i || (f(), u()), h && d && (p.current = v.isPropagationStopped(), p.current || v.stopPropagation());
  }) });
}, "RadioTrigger")), qd = "RadioIndicator", Zd = c.forwardRef(ie(function(t, n) {
  const { __scopeRadio: o, forceMount: r, ...i } = t, s = Rn(qd, o);
  return C.jsx(fe, { present: r || s.checked, children: C.jsx(L.span, { "data-state": Bo(s.checked), "data-disabled": s.disabled ? "" : void 0, ...i, ref: n }) });
}, "RadioIndicator")), Qd = "RadioBubbleInput", Jd = c.forwardRef(ie(function({ __scopeRadio: t, onClick: n, ...o }, r) {
  const { control: i, checked: s, required: a, disabled: l, name: u, value: p, form: f, bubbleInput: d, setBubbleInput: h, hasConsumerStoppedPropagationRef: m, userInteractionCount: v } = Rn(Qd, t), g = B(r, h), w = Mt(i), y = c.useRef(false), x = c.useRef(s), b = c.useRef(v);
  c.useEffect(() => {
    const R = d;
    if (!R) return;
    const S = window.HTMLInputElement.prototype, O = Object.getOwnPropertyDescriptor(S, "checked").set, D = v !== b.current;
    b.current = v;
    const E = x.current !== s;
    x.current = s;
    const I = !(D && m.current);
    if (E && O) {
      y.current = !D;
      const M = new Event("click", { bubbles: I });
      O.call(R, s), R.dispatchEvent(M), y.current = false;
    }
  }, [d, s, m, v]);
  const P = c.useRef(s);
  return C.jsx(L.input, { type: "radio", "aria-hidden": true, defaultChecked: P.current, required: a, disabled: l, name: u, value: p, form: f, ...o, tabIndex: -1, ref: g, onClick: _(n, (R) => {
    y.current && R.stopPropagation();
  }), style: { ...o.style, ...w, position: "absolute", pointerEvents: "none", opacity: 0, margin: 0, transform: "translateX(-100%)" } });
}, "RadioBubbleInput"));
function Is(e) {
  return typeof e == "function";
}
ie(Is, "isFunction");
function Bo(e) {
  return e ? "checked" : "unchecked";
}
ie(Bo, "getState");
var ef = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], Vo = "RadioGroup", [tf, nh] = ne(Vo, [vt, Ss]), _s = vt(), Pn = Ss(), [nf, of] = tf(Vo), oh = c.forwardRef(ie(function(t, n) {
  const { __scopeRadioGroup: o, name: r, form: i, defaultValue: s, value: a, required: l = false, disabled: u = false, orientation: p, dir: f, loop: d = true, onValueChange: h, ...m } = t, v = _s(o), g = ft(f), [w, y] = de({ prop: a, defaultProp: s ?? null, onChange: h, caller: Vo }), [x, b] = c.useState(null), P = B(n, b), R = c.useRef(w);
  return c.useEffect(() => {
    const S = i ? x == null ? void 0 : x.ownerDocument.getElementById(i) : x == null ? void 0 : x.closest("form");
    if (S instanceof HTMLFormElement) {
      const T = ie(() => y(R.current), "reset");
      return S.addEventListener("reset", T), () => S.removeEventListener("reset", T);
    }
  }, [x, i, y]), C.jsx(nf, { scope: o, name: r, form: i, required: l, disabled: u, value: w, onValueChange: y, children: C.jsx(To, { asChild: true, ...v, orientation: p, dir: g, loop: d, children: C.jsx(L.div, { role: "radiogroup", "aria-required": l, "aria-orientation": p, "data-disabled": u ? "" : void 0, dir: g, ...m, ref: P }) }) });
}, "RadioGroup")), rf = "RadioGroupItemProvider", sf = "RadioGroupItemTrigger";
function Ts(e) {
  const { __scopeRadioGroup: t, value: n, disabled: o, children: r, internal_do_not_use_render: i } = e, s = of(rf, t), a = Pn(t), l = s.disabled || o;
  return C.jsx(Es, { ...a, checked: s.value === n, disabled: l, required: s.required, name: s.name, form: s.form, value: n, onCheck: () => s.onValueChange(n), internal_do_not_use_render: i, children: r });
}
ie(Ts, "RadioGroupItemProvider");
var cf = c.forwardRef(ie(function(t, n) {
  const { __scopeRadioGroup: o, ...r } = t, i = _s(o), s = Pn(o), { checked: a, disabled: l } = Rn(sf, s.__scopeRadio), u = c.useRef(null), p = B(n, u), f = c.useRef(false);
  return c.useEffect(() => {
    const d = ie((m) => {
      ef.includes(m.key) && (f.current = true);
    }, "handleKeyDown"), h = ie(() => f.current = false, "handleKeyUp");
    return document.addEventListener("keydown", d), document.addEventListener("keyup", h), () => {
      document.removeEventListener("keydown", d), document.removeEventListener("keyup", h);
    };
  }, []), C.jsx(Oo, { asChild: true, ...i, focusable: !l, active: a, children: C.jsx(Xd, { ...s, ...r, ref: p, onKeyDown: _(r.onKeyDown, (d) => {
    d.key === "Enter" && d.preventDefault();
  }), onFocus: _(r.onFocus, () => {
    var _a3;
    f.current && ((_a3 = u.current) == null ? void 0 : _a3.click());
  }) }) });
}, "RadioGroupItemTrigger")), rh = c.forwardRef(ie(function(t, n) {
  const { __scopeRadioGroup: o, value: r, disabled: i, ...s } = t;
  return C.jsx(Ts, { __scopeRadioGroup: o, value: r, disabled: i, internal_do_not_use_render: ({ isFormControl: a }) => C.jsxs(C.Fragment, { children: [C.jsx(cf, { ...s, ref: n, __scopeRadioGroup: o }), a && C.jsx(af, { __scopeRadioGroup: o })] }) });
}, "RadioGroupItem")), af = c.forwardRef(ie(function(t, n) {
  const { __scopeRadioGroup: o, ...r } = t, i = Pn(o);
  return C.jsx(Jd, { ...i, ...r, ref: n });
}, "RadioGroupItemBubbleInput")), ih = c.forwardRef(ie(function(t, n) {
  const { __scopeRadioGroup: o, ...r } = t, i = Pn(o);
  return C.jsx(Zd, { ...i, ...r, ref: n });
}, "RadioGroupIndicator")), lf = Object.defineProperty, G = (e, t) => lf(e, "name", { value: t, configurable: true }), uf = [" ", "Enter", "ArrowUp", "ArrowDown"], df = [" ", "Enter"], lt = "Select", [Sn, Ho, ff] = rn(lt), [et, sh] = ne(lt, [ff, Ue]), Go = Ue(), [pf, Ke] = et(lt), [hf, mf] = et(lt);
function Os(e) {
  const { __scopeSelect: t, children: n, open: o, defaultOpen: r, onOpenChange: i, value: s, defaultValue: a, onValueChange: l, dir: u, name: p, autoComplete: f, disabled: d, required: h, form: m, internal_do_not_use_render: v } = e, g = Go(t), [w, y] = c.useState(null), [x, b] = c.useState(null), [P, R] = c.useState(false), S = ft(u), [T, O] = de({ prop: o, defaultProp: r ?? false, onChange: i, caller: lt }), [D, E] = de({ prop: s, defaultProp: a, onChange: l, caller: lt }), I = c.useRef(null), M = c.useRef(D);
  c.useEffect(() => {
    const W = m ? w == null ? void 0 : w.ownerDocument.getElementById(m) : w == null ? void 0 : w.form;
    if (W instanceof HTMLFormElement) {
      const X = G(() => E(M.current), "reset");
      return W.addEventListener("reset", X), () => W.removeEventListener("reset", X);
    }
  }, [m, w, E]);
  const F = w ? !!m || !!w.closest("form") : true, [H, j] = c.useState(/* @__PURE__ */ new Set()), N = ue(), $ = Array.from(H).map((W) => W.props.value).join(";"), V = c.useCallback((W) => {
    j((X) => new Set(X).add(W));
  }, []), A = c.useCallback((W) => {
    j((X) => {
      const ce = new Set(X);
      return ce.delete(W), ce;
    });
  }, []), J = { required: h, trigger: w, onTriggerChange: y, valueNode: x, onValueNodeChange: b, valueNodeHasChildren: P, onValueNodeHasChildrenChange: R, contentId: N, value: D, onValueChange: E, open: T, onOpenChange: O, dir: S, triggerPointerDownPosRef: I, disabled: d, name: p, autoComplete: f, form: m, nativeOptions: H, nativeSelectKey: $, isFormControl: F };
  return C.jsx(vn, { ...g, children: C.jsx(pf, { scope: t, ...J, children: C.jsx(Sn.Provider, { scope: t, children: C.jsx(hf, { scope: t, onNativeOptionAdd: V, onNativeOptionRemove: A, children: Ds(v) ? v(J) : n }) }) }) });
}
G(Os, "SelectProvider");
var ch = G((e) => {
  const { __scopeSelect: t, children: n, ...o } = e;
  return C.jsx(Os, { __scopeSelect: t, ...o, internal_do_not_use_render: ({ isFormControl: r }) => C.jsxs(C.Fragment, { children: [n, r ? C.jsx(Mf, { __scopeSelect: t }) : null] }) });
}, "Select"), vf = "SelectTrigger", ah = c.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, disabled: r = false, ...i } = t, s = Go(o), a = Ke(vf, o), l = a.disabled || r, u = B(n, a.onTriggerChange), p = Ho(o), f = c.useRef("touch"), [d, h, m] = Wo((g) => {
    const w = p().filter((b) => !b.disabled), y = w.find((b) => b.value === a.value), x = Uo(w, g, y);
    x !== void 0 && a.onValueChange(x.value);
  }), v = G((g) => {
    l || (a.onOpenChange(true), m()), g && (a.triggerPointerDownPosRef.current = { x: Math.round(g.pageX), y: Math.round(g.pageY) });
  }, "handleOpen");
  return C.jsx(At, { asChild: true, ...s, children: C.jsx(L.button, { type: "button", role: "combobox", "aria-controls": a.open ? a.contentId : void 0, "aria-expanded": a.open, "aria-required": a.required, "aria-autocomplete": "none", dir: a.dir, "data-state": a.open ? "open" : "closed", disabled: l, "data-disabled": l ? "" : void 0, "data-placeholder": Nt(a.value) ? "" : void 0, ...i, ref: u, onClick: _(i.onClick, (g) => {
    g.currentTarget.focus(), f.current !== "mouse" && v(g);
  }), onPointerDown: _(i.onPointerDown, (g) => {
    f.current = g.pointerType;
    const w = g.target;
    w.hasPointerCapture(g.pointerId) && w.releasePointerCapture(g.pointerId), g.button === 0 && g.ctrlKey === false && g.pointerType === "mouse" && (v(g), g.preventDefault());
  }), onKeyDown: _(i.onKeyDown, (g) => {
    const w = d.current !== "";
    !(g.ctrlKey || g.altKey || g.metaKey) && g.key.length === 1 && h(g.key), !(w && g.key === " ") && uf.includes(g.key) && (v(), g.preventDefault());
  }) }) });
}, "SelectTrigger")), gf = "SelectValue", lh = c.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, className: r, style: i, children: s, placeholder: a = "", ...l } = t, u = Ke(gf, o), { onValueNodeHasChildrenChange: p } = u, f = s !== void 0, d = B(n, u.onValueNodeChange);
  Q(() => {
    p(f);
  }, [p, f]);
  const h = Nt(u.value);
  return C.jsx(L.span, { ...l, asChild: h ? false : l.asChild, ref: d, style: { pointerEvents: "none" }, children: C.jsx(c.Fragment, { children: h ? a : s }, h ? "placeholder" : "value") });
}, "SelectValue")), uh = c.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, children: r, ...i } = t;
  return C.jsx(L.span, { "aria-hidden": true, ...i, ref: n, children: r || "\u25BC" });
}, "SelectIcon")), Cf = "SelectPortal", [xf, bf] = et(Cf, { forceMount: void 0 }), dh = G((e) => {
  const { __scopeSelect: t, forceMount: n, ...o } = e;
  return C.jsx(xf, { scope: e.__scopeSelect, forceMount: n, children: C.jsx(Tt, { asChild: true, ...o }) });
}, "SelectPortal"), qe = "SelectContent", fh = c.forwardRef(G(function(t, n) {
  const o = bf(qe, t.__scopeSelect), { forceMount: r = o.forceMount, ...i } = t, s = Ke(qe, t.__scopeSelect), [a, l] = c.useState();
  return Q(() => {
    l(new DocumentFragment());
  }, []), C.jsx(fe, { present: r || s.open, children: ({ present: u }) => u ? C.jsx(Rf, { ...i, ref: n }) : C.jsx(wf, { ...i, fragment: a }) });
}, "SelectContent")), wf = c.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, children: r, fragment: i } = t;
  return i ? Et.createPortal(C.jsx(Ms, { scope: o, children: C.jsx(Sn.Slot, { scope: o, children: C.jsx("div", { ref: n, children: r }) }) }), i) : null;
}, "SelectContentFragment")), Ce = 10, [Ms, En] = et(qe), yf = ye("SelectContent.RemoveScroll"), Rf = c.forwardRef(G(function(t, n) {
  const { __scopeSelect: o } = t, { position: r = "item-aligned", onCloseAutoFocus: i, onEscapeKeyDown: s, onPointerDownOutside: a, side: l, sideOffset: u, align: p, alignOffset: f, arrowPadding: d, collisionBoundary: h, collisionPadding: m, sticky: v, hideWhenDetached: g, avoidCollisions: w, ...y } = t, x = Ke(qe, o), [b, P] = c.useState(null), [R, S] = c.useState(null), T = B(n, P), [O, D] = c.useState(null), [E, I] = c.useState(null), M = Ho(o), [F, H] = c.useState(false), j = c.useRef(false);
  c.useEffect(() => {
    if (b) return an(b);
  }, [b]), pt();
  const N = c.useCallback((k) => {
    const [U, ...re] = M().map((q) => q.ref.current), [z] = re.slice(-1), Y = document.activeElement;
    for (const q of k) if (q === Y || (q == null ? void 0 : q.scrollIntoView({ block: "nearest" }), q === U && R && (R.scrollTop = 0), q === z && R && (R.scrollTop = R.scrollHeight), q == null ? void 0 : q.focus(), document.activeElement !== Y)) return;
  }, [M, R]), $ = c.useCallback(() => N([O, b]), [N, O, b]);
  c.useEffect(() => {
    F && $();
  }, [F, $]);
  const { onOpenChange: V, triggerPointerDownPosRef: A } = x;
  c.useEffect(() => {
    if (b) {
      let k = { x: 0, y: 0 };
      const U = G((z) => {
        var _a3, _b;
        k = { x: Math.abs(Math.round(z.pageX) - (((_a3 = A.current) == null ? void 0 : _a3.x) ?? 0)), y: Math.abs(Math.round(z.pageY) - (((_b = A.current) == null ? void 0 : _b.y) ?? 0)) };
      }, "handlePointerMove"), re = G((z) => {
        k.x <= 10 && k.y <= 10 ? z.preventDefault() : z.composedPath().includes(b) || V(false), document.removeEventListener("pointermove", U), A.current = null;
      }, "handlePointerUp");
      return A.current !== null && (document.addEventListener("pointermove", U), document.addEventListener("pointerup", re, { capture: true, once: true })), () => {
        document.removeEventListener("pointermove", U), document.removeEventListener("pointerup", re, { capture: true });
      };
    }
  }, [b, V, A]), c.useEffect(() => {
    const k = G(() => V(false), "close");
    return window.addEventListener("blur", k), window.addEventListener("resize", k), () => {
      window.removeEventListener("blur", k), window.removeEventListener("resize", k);
    };
  }, [V]);
  const [J, W] = Wo((k) => {
    const U = M().filter((Y) => !Y.disabled), re = U.find((Y) => Y.ref.current === document.activeElement), z = Uo(U, k, re);
    z && setTimeout(() => {
      var _a3;
      return (_a3 = z.ref.current) == null ? void 0 : _a3.focus();
    });
  }), X = c.useCallback((k, U, re) => {
    const z = !j.current && !re;
    (x.value !== void 0 && x.value === U || z) && (D(k), z && (j.current = true));
  }, [x.value]), ce = c.useCallback(() => b == null ? void 0 : b.focus(), [b]), he = c.useCallback((k, U, re) => {
    const z = !j.current && !re;
    (x.value !== void 0 && x.value === U || z) && I(k);
  }, [x.value]), Ee = r === "popper" ? Sr : Pf, le = Ee === Sr ? { side: l, sideOffset: u, align: p, alignOffset: f, arrowPadding: d, collisionBoundary: h, collisionPadding: m, sticky: v, hideWhenDetached: g, avoidCollisions: w } : {};
  return C.jsx(Ms, { scope: o, content: b, viewport: R, onViewportChange: S, itemRefCallback: X, selectedItem: O, onItemLeave: ce, itemTextRefCallback: he, focusSelectedItem: $, selectedItemText: E, position: r, isPositioned: F, searchRef: J, children: C.jsx(Ot, { as: yf, allowPinchZoom: true, children: C.jsx(sn, { asChild: true, trapped: x.open, onMountAutoFocus: (k) => {
    k.preventDefault();
  }, onUnmountAutoFocus: _(i, (k) => {
    var _a3;
    (_a3 = x.trigger) == null ? void 0 : _a3.focus({ preventScroll: true }), k.preventDefault();
  }), children: C.jsx(_t, { asChild: true, disableOutsidePointerEvents: true, onEscapeKeyDown: s, onPointerDownOutside: a, onFocusOutside: (k) => k.preventDefault(), onDismiss: () => x.onOpenChange(false), children: C.jsx(Ee, { role: "listbox", id: x.contentId, "data-state": x.open ? "open" : "closed", dir: x.dir, onContextMenu: (k) => k.preventDefault(), ...y, ...le, onPlaced: () => H(true), ref: T, style: { display: "flex", flexDirection: "column", outline: "none", ...y.style }, onKeyDown: _(y.onKeyDown, (k) => {
    const U = k.ctrlKey || k.altKey || k.metaKey;
    if (k.key === "Tab" && k.preventDefault(), !U && k.key.length === 1 && W(k.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(k.key)) {
      let z = M().filter((Y) => !Y.disabled).map((Y) => Y.ref.current);
      if (["ArrowUp", "End"].includes(k.key) && (z = z.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(k.key)) {
        const Y = k.target, q = z.indexOf(Y);
        z = z.slice(q + 1);
      }
      setTimeout(() => N(z)), k.preventDefault();
    }
  }) }) }) }) }) });
}, "SelectContentImpl")), Pf = c.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, onPlaced: r, ...i } = t, s = Ke(qe, o), a = En(qe, o), [l, u] = c.useState(null), [p, f] = c.useState(null), d = B(n, f), h = Ho(o), m = c.useRef(false), v = c.useRef(true), { viewport: g, selectedItem: w, selectedItemText: y, focusSelectedItem: x } = a, b = c.useCallback(() => {
    if (s.trigger && s.valueNode && l && p && g && w && y) {
      const T = s.trigger.getBoundingClientRect(), O = p.getBoundingClientRect(), D = s.valueNode.getBoundingClientRect(), E = y.getBoundingClientRect();
      if (s.dir !== "rtl") {
        const Y = E.left - O.left, q = D.left - Y, Ie = T.left - q, me = T.width + Ie, _n = Math.max(me, O.width), Tn = window.innerWidth - Ce, On = so(q, [Ce, Math.max(Ce, Tn - _n)]);
        l.style.minWidth = me + "px", l.style.left = On + "px";
      } else {
        const Y = O.right - E.right, q = window.innerWidth - D.right - Y, Ie = window.innerWidth - T.right - q, me = T.width + Ie, _n = Math.max(me, O.width), Tn = window.innerWidth - Ce, On = so(q, [Ce, Math.max(Ce, Tn - _n)]);
        l.style.minWidth = me + "px", l.style.right = On + "px";
      }
      const I = h(), M = window.innerHeight - Ce * 2, F = g.scrollHeight, H = window.getComputedStyle(p), j = parseInt(H.borderTopWidth, 10), N = parseInt(H.paddingTop, 10), $ = parseInt(H.borderBottomWidth, 10), V = parseInt(H.paddingBottom, 10), A = j + N + F + V + $, J = Math.min(w.offsetHeight * 5, A), W = window.getComputedStyle(g), X = parseInt(W.paddingTop, 10), ce = parseInt(W.paddingBottom, 10), he = T.top + T.height / 2 - Ce, Ee = M - he, le = w.offsetHeight / 2, k = w.offsetTop + le, U = j + N + k, re = A - U;
      if (U <= he) {
        const Y = I.length > 0 && w === I[I.length - 1].ref.current;
        l.style.bottom = "0px";
        const q = p.clientHeight - g.offsetTop - g.offsetHeight, Ie = Math.max(Ee, le + (Y ? ce : 0) + q + $), me = U + Ie;
        l.style.height = me + "px";
      } else {
        const Y = I.length > 0 && w === I[0].ref.current;
        l.style.top = "0px";
        const Ie = Math.max(he, j + g.offsetTop + (Y ? X : 0) + le) + re;
        l.style.height = Ie + "px", g.scrollTop = U - he + g.offsetTop;
      }
      l.style.margin = `${Ce}px 0`, l.style.minHeight = J + "px", l.style.maxHeight = M + "px", r == null ? void 0 : r(), requestAnimationFrame(() => m.current = true);
    }
  }, [h, s.trigger, s.valueNode, l, p, g, w, y, s.dir, r]);
  Q(() => b(), [b]);
  const [P, R] = c.useState();
  Q(() => {
    p && R(window.getComputedStyle(p).zIndex);
  }, [p]);
  const S = c.useCallback((T) => {
    T && v.current === true && (b(), x == null ? void 0 : x(), v.current = false);
  }, [b, x]);
  return C.jsx(Sf, { scope: o, contentWrapper: l, shouldExpandOnScrollRef: m, onScrollButtonChange: S, children: C.jsx("div", { ref: u, style: { display: "flex", flexDirection: "column", position: "fixed", zIndex: P }, children: C.jsx(L.div, { ...i, ref: d, style: { boxSizing: "border-box", maxHeight: "100%", ...i.style } }) }) });
}, "SelectItemAlignedPosition")), Sr = c.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, align: r = "start", collisionPadding: i = Ce, ...s } = t, a = Go(o);
  return C.jsx(gn, { ...a, ...s, ref: n, align: r, collisionPadding: i, style: { boxSizing: "border-box", ...s.style, "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-select-content-available-width": "var(--radix-popper-available-width)", "--radix-select-content-available-height": "var(--radix-popper-available-height)", "--radix-select-trigger-width": "var(--radix-popper-anchor-width)", "--radix-select-trigger-height": "var(--radix-popper-anchor-height)" } });
}, "SelectPopperPosition")), [Sf, Ef] = et(qe, {}), Er = "SelectViewport", ph = c.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, nonce: r, ...i } = t, s = En(Er, o), a = Ef(Er, o), l = B(n, s.onViewportChange), u = c.useRef(0);
  return C.jsxs(C.Fragment, { children: [C.jsx("style", { dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" }, nonce: r }), C.jsx(Sn.Slot, { scope: o, children: C.jsx(L.div, { "data-radix-select-viewport": "", role: "presentation", ...i, ref: l, style: { position: "relative", flex: 1, overflow: "hidden auto", ...i.style }, onScroll: _(i.onScroll, (p) => {
    const f = p.currentTarget, { contentWrapper: d, shouldExpandOnScrollRef: h } = a;
    if ((h == null ? void 0 : h.current) && d) {
      const m = Math.abs(u.current - f.scrollTop);
      if (m > 0) {
        const v = window.innerHeight - Ce * 2, g = parseFloat(d.style.minHeight), w = parseFloat(d.style.height), y = Math.max(g, w);
        if (y < v) {
          const x = y + m, b = Math.min(v, x), P = x - b;
          d.style.height = b + "px", d.style.bottom === "0px" && (f.scrollTop = P > 0 ? P : 0, d.style.justifyContent = "flex-end");
        }
      }
    }
    u.current = f.scrollTop;
  }) }) })] });
}, "SelectViewport")), If = "SelectGroup", [hh, mh] = et(If), co = "SelectItem", [_f, As] = et(co), vh = c.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, value: r, disabled: i = false, textValue: s, ...a } = t, l = Ke(co, o), u = En(co, o), p = l.value === r, [f, d] = c.useState(s ?? ""), [h, m] = c.useState(false), v = ge((b) => {
    var _a3;
    return (_a3 = u.itemRefCallback) == null ? void 0 : _a3.call(u, b, r, i);
  }), g = B(n, v), w = ue(), y = c.useRef("touch"), x = G(() => {
    i || (l.onValueChange(r), l.onOpenChange(false));
  }, "handleSelect");
  return C.jsx(_f, { scope: o, value: r, disabled: i, textId: w, isSelected: p, onItemTextChange: c.useCallback((b) => {
    d((P) => P || ((b == null ? void 0 : b.textContent) ?? "").trim());
  }, []), children: C.jsx(Sn.ItemSlot, { scope: o, value: r, disabled: i, textValue: f, children: C.jsx(L.div, { role: "option", "aria-labelledby": w, "data-highlighted": h ? "" : void 0, "aria-selected": p && h, "data-state": p ? "checked" : "unchecked", "aria-disabled": i || void 0, "data-disabled": i ? "" : void 0, tabIndex: i ? void 0 : -1, ...a, ref: g, onFocus: _(a.onFocus, () => m(true)), onBlur: _(a.onBlur, () => m(false)), onClick: _(a.onClick, () => {
    y.current !== "mouse" && x();
  }), onPointerUp: _(a.onPointerUp, () => {
    y.current === "mouse" && x();
  }), onPointerDown: _(a.onPointerDown, (b) => {
    y.current = b.pointerType;
  }), onPointerMove: _(a.onPointerMove, (b) => {
    var _a3;
    y.current = b.pointerType, i ? (_a3 = u.onItemLeave) == null ? void 0 : _a3.call(u) : y.current === "mouse" && b.currentTarget.focus({ preventScroll: true });
  }), onPointerLeave: _(a.onPointerLeave, (b) => {
    var _a3;
    b.currentTarget === document.activeElement && ((_a3 = u.onItemLeave) == null ? void 0 : _a3.call(u));
  }), onKeyDown: _(a.onKeyDown, (b) => {
    var _a3;
    i || b.target !== b.currentTarget || ((_a3 = u.searchRef) == null ? void 0 : _a3.current) !== "" && b.key === " " || (df.includes(b.key) && x(), b.key === " " && b.preventDefault());
  }) }) }) });
}, "SelectItem")), zt = "SelectItemText", gh = c.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, className: r, style: i, ...s } = t, a = Ke(zt, o), l = En(zt, o), u = As(zt, o), p = mf(zt, o), [f, d] = c.useState(null), h = ge((x) => {
    var _a3;
    return (_a3 = l.itemTextRefCallback) == null ? void 0 : _a3.call(l, x, u.value, u.disabled);
  }), m = B(n, d, u.onItemTextChange, h), v = f == null ? void 0 : f.textContent, g = c.useMemo(() => C.jsx("option", { value: u.value, disabled: u.disabled, children: v }, u.value), [u.disabled, u.value, v]), { onNativeOptionAdd: w, onNativeOptionRemove: y } = p;
  return Q(() => (w(g), () => y(g)), [w, y, g]), C.jsxs(C.Fragment, { children: [C.jsx(L.span, { id: u.textId, ...s, ref: m }), u.isSelected && a.valueNode && !a.valueNodeHasChildren && !Nt(a.value) ? Et.createPortal(s.children, a.valueNode) : null] });
}, "SelectItemText")), Tf = "SelectItemIndicator", Ch = c.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, ...r } = t;
  return As(Tf, o).isSelected ? C.jsx(L.span, { "aria-hidden": true, ...r, ref: n }) : null;
}, "SelectItemIndicator")), xh = c.forwardRef(G(function(t, n) {
  const { __scopeSelect: o, ...r } = t;
  return C.jsx(L.div, { "aria-hidden": true, ...r, ref: n });
}, "SelectSeparator")), Of = "SelectBubbleInput", Mf = c.forwardRef(G(function({ __scopeSelect: t, ...n }, o) {
  const r = Ke(Of, t), { value: i, onValueChange: s, required: a, disabled: l, name: u, autoComplete: p, form: f } = r, { nativeOptions: d, nativeSelectKey: h } = r, m = c.useRef(null), v = B(o, m), g = i ?? "", w = bs(g), y = Array.from(d).some((x) => (x.props.value ?? "") === "");
  return c.useEffect(() => {
    const x = m.current;
    if (!x) return;
    const b = window.HTMLSelectElement.prototype, R = Object.getOwnPropertyDescriptor(b, "value").set;
    if (w !== g && R) {
      const S = new Event("change", { bubbles: true });
      R.call(x, g), x.dispatchEvent(S);
    }
  }, [w, g]), C.jsxs(L.select, { "aria-hidden": true, required: a, tabIndex: -1, name: u, autoComplete: p, disabled: l, form: f, onChange: (x) => s(x.target.value), ...n, style: { ...jr, ...n.style }, ref: v, defaultValue: g, children: [Nt(i) && !y ? C.jsx("option", { value: "" }) : null, Array.from(d)] }, h);
}, "SelectBubbleInput"));
function Ds(e) {
  return typeof e == "function";
}
G(Ds, "isFunction");
function Nt(e) {
  return e === "" || e === void 0;
}
G(Nt, "shouldShowPlaceholder");
function Wo(e) {
  const t = ge(e), n = c.useRef(""), o = c.useRef(0), r = c.useCallback((s) => {
    const a = n.current + s;
    t(a), G((function l(u) {
      n.current = u, window.clearTimeout(o.current), u !== "" && (o.current = window.setTimeout(() => l(""), 1e3));
    }), "updateSearch")(a);
  }, [t]), i = c.useCallback(() => {
    n.current = "", window.clearTimeout(o.current);
  }, []);
  return c.useEffect(() => () => window.clearTimeout(o.current), []), [n, r, i];
}
G(Wo, "useTypeaheadSearch");
function Uo(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1;
  let s = ks(e, Math.max(i, 0));
  r.length === 1 && (s = s.filter((u) => u !== n));
  const l = s.find((u) => u.textValue.toLowerCase().startsWith(r.toLowerCase()));
  return l !== n ? l : void 0;
}
G(Uo, "findNextItem");
function ks(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
G(ks, "wrapArray");
var Af = Object.defineProperty, Ge = (e, t) => Af(e, "name", { value: t, configurable: true }), Ko = "Switch", [Df, bh] = ne(Ko), [kf, zo] = Df(Ko);
function Fs(e) {
  const { __scopeSwitch: t, checked: n, children: o, defaultChecked: r, disabled: i, form: s, name: a, onCheckedChange: l, required: u, value: p = "on", internal_do_not_use_render: f } = e, [d, h] = de({ prop: n, defaultProp: r ?? false, onChange: l, caller: Ko }), [m, v] = c.useState(null), [g, w] = c.useState(null), y = c.useRef(false), [x, b] = c.useReducer((S) => S + 1, 0), P = m ? !!s || !!m.closest("form") : true, R = { checked: d, setChecked: h, disabled: i, control: m, setControl: v, name: a, form: s, value: p, hasConsumerStoppedPropagationRef: y, userInteractionCount: x, onUserInteraction: b, required: u, defaultChecked: r, isFormControl: P, bubbleInput: g, setBubbleInput: w };
  return C.jsx(kf, { scope: t, ...R, children: js(f) ? f(R) : o });
}
Ge(Fs, "SwitchProvider");
var Ff = "SwitchTrigger", jf = c.forwardRef(Ge(function({ __scopeSwitch: t, onClick: n, ...o }, r) {
  const { control: i, form: s, value: a, disabled: l, checked: u, required: p, setControl: f, setChecked: d, hasConsumerStoppedPropagationRef: h, onUserInteraction: m, isFormControl: v, bubbleInput: g } = zo(Ff, t), w = B(r, f), y = c.useRef(u);
  return c.useEffect(() => {
    const x = s ? i == null ? void 0 : i.ownerDocument.getElementById(s) : i == null ? void 0 : i.form;
    if (x instanceof HTMLFormElement) {
      const b = Ge(() => d(y.current), "reset");
      return x.addEventListener("reset", b), () => x.removeEventListener("reset", b);
    }
  }, [i, s, d]), C.jsx(L.button, { type: "button", role: "switch", "aria-checked": u, "aria-required": p, "data-state": Yo(u), "data-disabled": l ? "" : void 0, disabled: l, value: a, ...o, ref: w, onClick: _(n, (x) => {
    m(), d((b) => !b), g && v && (h.current = x.isPropagationStopped(), h.current || x.stopPropagation());
  }) });
}, "SwitchTrigger")), wh = c.forwardRef(Ge(function(t, n) {
  const { __scopeSwitch: o, name: r, checked: i, defaultChecked: s, required: a, disabled: l, value: u, onCheckedChange: p, form: f, ...d } = t;
  return C.jsx(Fs, { __scopeSwitch: o, checked: i, defaultChecked: s, disabled: l, required: a, onCheckedChange: p, name: r, form: f, value: u, internal_do_not_use_render: ({ isFormControl: h }) => C.jsxs(C.Fragment, { children: [C.jsx(jf, { ...d, ref: n, __scopeSwitch: o }), h && C.jsx($f, { __scopeSwitch: o })] }) });
}, "Switch")), Nf = "SwitchThumb", yh = c.forwardRef(Ge(function(t, n) {
  const { __scopeSwitch: o, ...r } = t, i = zo(Nf, o);
  return C.jsx(L.span, { "data-state": Yo(i.checked), "data-disabled": i.disabled ? "" : void 0, ...r, ref: n });
}, "SwitchThumb")), Lf = "SwitchBubbleInput", $f = c.forwardRef(Ge(function({ __scopeSwitch: t, onClick: n, ...o }, r) {
  const { control: i, hasConsumerStoppedPropagationRef: s, userInteractionCount: a, checked: l, defaultChecked: u, required: p, disabled: f, name: d, value: h, form: m, bubbleInput: v, setBubbleInput: g } = zo(Lf, t), w = B(r, g), y = Mt(i), x = c.useRef(false), b = c.useRef(l), P = c.useRef(a);
  c.useEffect(() => {
    const S = v;
    if (!S) return;
    const T = window.HTMLInputElement.prototype, D = Object.getOwnPropertyDescriptor(T, "checked").set, E = a !== P.current;
    P.current = a;
    const I = b.current !== l;
    b.current = l;
    const M = !(E && s.current);
    if (I && D) {
      x.current = !E;
      const F = new Event("click", { bubbles: M });
      D.call(S, l), S.dispatchEvent(F), x.current = false;
    }
  }, [v, l, s, a]);
  const R = c.useRef(l);
  return C.jsx(L.input, { type: "checkbox", "aria-hidden": true, defaultChecked: u ?? R.current, required: p, disabled: f, name: d, value: h, form: m, ...o, tabIndex: -1, ref: w, onClick: _(n, (S) => {
    x.current && S.stopPropagation();
  }), style: { ...o.style, ...y, position: "absolute", pointerEvents: "none", opacity: 0, margin: 0, transform: "translateX(-100%)" } });
}, "SwitchBubbleInput"));
function js(e) {
  return typeof e == "function";
}
Ge(js, "isFunction");
function Yo(e) {
  return e ? "checked" : "unchecked";
}
Ge(Yo, "getState");
var Bf = Object.defineProperty, Ct = (e, t) => Bf(e, "name", { value: t, configurable: true }), Xo = "Tabs", [Vf, Rh] = ne(Xo, [vt]), Ns = vt(), [Hf, qo] = Vf(Xo), Gf = c.forwardRef(Ct(function(t, n) {
  const { __scopeTabs: o, value: r, onValueChange: i, defaultValue: s, orientation: a = "horizontal", dir: l, activationMode: u = "automatic", ...p } = t, f = ft(l), [d, h] = de({ prop: r, onChange: i, defaultProp: s ?? "", caller: Xo });
  return C.jsx(Hf, { scope: o, baseId: ue(), value: d, onValueChange: h, orientation: a, dir: f, activationMode: u, children: C.jsx(L.div, { dir: f, "data-orientation": a, ...p, ref: n }) });
}, "Tabs")), Wf = "TabsList", Uf = c.forwardRef(Ct(function(t, n) {
  const { __scopeTabs: o, loop: r = true, ...i } = t, s = qo(Wf, o), a = Ns(o);
  return C.jsx(To, { asChild: true, ...a, orientation: s.orientation, dir: s.dir, loop: r, children: C.jsx(L.div, { role: "tablist", "aria-orientation": s.orientation, ...i, ref: n }) });
}, "TabsList")), Kf = "TabsTrigger", zf = c.forwardRef(Ct(function(t, n) {
  const { __scopeTabs: o, value: r, disabled: i = false, ...s } = t, a = qo(Kf, o), l = Ns(o), u = Zo(a.baseId, r), p = Qo(a.baseId, r), f = r === a.value;
  return C.jsx(Oo, { asChild: true, ...l, focusable: !i, active: f, children: C.jsx(L.button, { type: "button", role: "tab", "aria-selected": f, "aria-controls": p, "data-state": f ? "active" : "inactive", "data-disabled": i ? "" : void 0, disabled: i, id: u, ...s, ref: n, onMouseDown: _(t.onMouseDown, (d) => {
    !i && d.button === 0 && d.ctrlKey === false ? a.onValueChange(r) : d.preventDefault();
  }), onKeyDown: _(t.onKeyDown, (d) => {
    i || d.target !== d.currentTarget || [" ", "Enter"].includes(d.key) && a.onValueChange(r);
  }), onFocus: _(t.onFocus, () => {
    const d = a.activationMode !== "manual";
    !f && !i && d && a.onValueChange(r);
  }) }) });
}, "TabsTrigger")), Yf = "TabsContent", Xf = c.forwardRef(Ct(function(t, n) {
  const { __scopeTabs: o, value: r, forceMount: i, children: s, ...a } = t, l = qo(Yf, o), u = Zo(l.baseId, r), p = Qo(l.baseId, r), f = r === l.value, d = c.useRef(f);
  return c.useEffect(() => {
    const h = requestAnimationFrame(() => d.current = false);
    return () => cancelAnimationFrame(h);
  }, []), C.jsx(fe, { present: i || f, children: ({ present: h }) => C.jsx(L.div, { "data-state": f ? "active" : "inactive", "data-orientation": l.orientation, role: "tabpanel", "aria-labelledby": u, hidden: !h, id: p, tabIndex: 0, ...a, ref: n, style: { ...t.style, animationDuration: d.current ? "0s" : void 0 }, children: h && s }) });
}, "TabsContent"));
function Zo(e, t) {
  return `${e}-trigger-${t}`;
}
Ct(Zo, "makeTriggerId");
function Qo(e, t) {
  return `${e}-content-${t}`;
}
Ct(Qo, "makeContentId");
var Ph = Gf, Sh = Uf, Eh = zf, Ih = Xf, qf = Object.defineProperty, Z = (e, t) => qf(e, "name", { value: t, configurable: true }), [Jo, _h] = ne("Tooltip", [Ue]), In = Ue(), Zf = "TooltipProvider", Qf = 700, ao = "tooltip.open", [Jf, er] = Jo(Zf), ep = Z((e) => {
  const { __scopeTooltip: t, delayDuration: n = Qf, skipDelayDuration: o = 300, disableHoverableContent: r = false, children: i } = e, s = c.useRef(true), a = c.useRef(false), l = c.useRef(0);
  return c.useEffect(() => {
    const u = l.current;
    return () => window.clearTimeout(u);
  }, []), C.jsx(Jf, { scope: t, isOpenDelayedRef: s, delayDuration: n, onOpen: c.useCallback(() => {
    o <= 0 || (window.clearTimeout(l.current), s.current = false);
  }, [o]), onClose: c.useCallback(() => {
    o <= 0 || (window.clearTimeout(l.current), l.current = window.setTimeout(() => s.current = true, o));
  }, [o]), isPointerInTransitRef: a, onPointerInTransitChange: c.useCallback((u) => {
    a.current = u;
  }, []), disableHoverableContent: r, children: i });
}, "TooltipProvider"), lo = "Tooltip", [tp, Lt] = Jo(lo), np = Z((e) => {
  const { __scopeTooltip: t, children: n, open: o, defaultOpen: r, onOpenChange: i, disableHoverableContent: s, delayDuration: a } = e, l = er(lo, e.__scopeTooltip), u = In(t), [p, f] = c.useState(null), [d, h] = c.useState(void 0), m = ue(), v = c.useRef(0), g = s ?? l.disableHoverableContent, w = a ?? l.delayDuration, y = c.useRef(false), [x, b] = de({ prop: o, defaultProp: r ?? false, onChange: Z((D) => {
    D ? (l.onOpen(), document.dispatchEvent(new CustomEvent(ao))) : l.onClose(), i == null ? void 0 : i(D);
  }, "onChange"), caller: lo }), P = c.useMemo(() => x ? y.current ? "delayed-open" : "instant-open" : "closed", [x]), R = c.useCallback(() => {
    window.clearTimeout(v.current), v.current = 0, y.current = false, b(true);
  }, [b]), S = c.useCallback(() => {
    window.clearTimeout(v.current), v.current = 0, b(false);
  }, [b]), T = c.useCallback(() => {
    window.clearTimeout(v.current), v.current = window.setTimeout(() => {
      y.current = true, b(true), v.current = 0;
    }, w);
  }, [w, b]);
  c.useEffect(() => () => {
    v.current && (window.clearTimeout(v.current), v.current = 0);
  }, []);
  const O = d ?? m;
  return C.jsx(vn, { ...u, children: C.jsx(tp, { scope: t, contentId: O, setContentId: h, open: x, stateAttribute: P, trigger: p, onTriggerChange: f, onTriggerEnter: c.useCallback(() => {
    l.isOpenDelayedRef.current ? T() : R();
  }, [l.isOpenDelayedRef, T, R]), onTriggerLeave: c.useCallback(() => {
    g ? S() : (window.clearTimeout(v.current), v.current = 0);
  }, [S, g]), onOpen: R, onClose: S, disableHoverableContent: g, children: n }) });
}, "Tooltip"), Ir = "TooltipTrigger", op = c.forwardRef(Z(function(t, n) {
  const { __scopeTooltip: o, ...r } = t, i = Lt(Ir, o), s = er(Ir, o), a = In(o), l = c.useRef(null), u = B(n, l, i.onTriggerChange), p = c.useRef(false), f = c.useRef(false), d = c.useCallback(() => p.current = false, []);
  return c.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), C.jsx(At, { asChild: true, ...a, children: C.jsx(L.button, { "aria-describedby": i.open ? i.contentId : void 0, "data-state": i.stateAttribute, ...r, ref: u, onPointerMove: _(t.onPointerMove, (h) => {
    h.pointerType !== "touch" && !f.current && !s.isPointerInTransitRef.current && (i.onTriggerEnter(), f.current = true);
  }), onPointerLeave: _(t.onPointerLeave, () => {
    i.onTriggerLeave(), f.current = false;
  }), onPointerDown: _(t.onPointerDown, () => {
    i.open && i.onClose(), p.current = true, document.addEventListener("pointerup", d, { once: true });
  }), onFocus: _(t.onFocus, () => {
    p.current || i.onOpen();
  }), onBlur: _(t.onBlur, i.onClose), onClick: _(t.onClick, i.onClose) }) });
}, "TooltipTrigger")), Ls = "TooltipPortal", [rp, ip] = Jo(Ls, { forceMount: void 0 }), sp = Z((e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, i = Lt(Ls, t);
  return C.jsx(rp, { scope: t, forceMount: n, children: C.jsx(fe, { present: n || i.open, children: C.jsx(Tt, { asChild: true, container: r, children: o }) }) });
}, "TooltipPortal"), St = "TooltipContent", cp = c.forwardRef(Z(function(t, n) {
  const o = ip(St, t.__scopeTooltip), { forceMount: r = o.forceMount, side: i = "top", ...s } = t, a = Lt(St, t.__scopeTooltip);
  return C.jsx(fe, { present: r || a.open, children: a.disableHoverableContent ? C.jsx($s, { side: i, ...s, ref: n }) : C.jsx(ap, { side: i, ...s, ref: n }) });
}, "TooltipContent")), ap = c.forwardRef(Z(function(t, n) {
  const o = Lt(St, t.__scopeTooltip), r = er(St, t.__scopeTooltip), i = c.useRef(null), s = B(n, i), [a, l] = c.useState(null), { trigger: u, onClose: p } = o, f = i.current, { onPointerInTransitChange: d } = r, h = c.useCallback(() => {
    l(null), d(false);
  }, [d]), m = c.useCallback((v, g) => {
    const w = v.currentTarget, y = { x: v.clientX, y: v.clientY }, x = Bs(y, w.getBoundingClientRect()), b = Vs(y, x), P = Hs(g.getBoundingClientRect()), R = Ws([...b, ...P]);
    l(R), d(true);
  }, [d]);
  return c.useEffect(() => () => h(), [h]), c.useEffect(() => {
    if (u && f) {
      const v = Z((w) => m(w, f), "handleTriggerLeave"), g = Z((w) => m(w, u), "handleContentLeave");
      return u.addEventListener("pointerleave", v), f.addEventListener("pointerleave", g), () => {
        u.removeEventListener("pointerleave", v), f.removeEventListener("pointerleave", g);
      };
    }
  }, [u, f, m, h]), c.useEffect(() => {
    if (a) {
      const v = Z((g) => {
        const w = g.target, y = { x: g.clientX, y: g.clientY }, x = (u == null ? void 0 : u.contains(w)) || (f == null ? void 0 : f.contains(w)), b = !Gs(y, a);
        x ? h() : b && (h(), p());
      }, "handleTrackPointerGrace");
      return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v);
    }
  }, [u, f, a, p, h]), C.jsx($s, { ...t, ref: s });
}, "TooltipContentHoverable")), lp = Mr("TooltipContent"), $s = c.forwardRef(Z(function(t, n) {
  const { __scopeTooltip: o, children: r, "aria-label": i, id: s, onEscapeKeyDown: a, onPointerDownOutside: l, ...u } = t, p = Lt(St, o), f = In(o), { onClose: d } = p;
  c.useEffect(() => (document.addEventListener(ao, d), () => document.removeEventListener(ao, d)), [d]), c.useEffect(() => {
    if (p.trigger) {
      const m = Z((v) => {
        v.target instanceof Node && v.target.contains(p.trigger) && d();
      }, "handleScroll");
      return window.addEventListener("scroll", m, { capture: true }), () => window.removeEventListener("scroll", m, { capture: true });
    }
  }, [p.trigger, d]);
  const { setContentId: h } = p;
  return Q(() => (h(s), () => {
    h(void 0);
  }), [s, h]), C.jsx(_t, { asChild: true, disableOutsidePointerEvents: false, onEscapeKeyDown: a, onPointerDownOutside: l, onFocusOutside: (m) => m.preventDefault(), onDismiss: d, children: C.jsxs(gn, { "data-state": p.stateAttribute, role: i ? void 0 : "tooltip", id: i ? void 0 : p.contentId, ...f, ...u, ref: n, style: { ...u.style, "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)", "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)", "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)", "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)" }, children: [C.jsx(lp, { children: r }), i ? C.jsx(ic, { id: p.contentId, role: "tooltip", children: i }) : null] }) });
}, "TooltipContentImpl")), up = c.forwardRef(Z(function(t, n) {
  const { __scopeTooltip: o, ...r } = t, i = In(o);
  return C.jsx(Ni, { ...i, ...r, ref: n });
}, "TooltipArrow"));
function Bs(e, t) {
  const n = Math.abs(t.top - e.y), o = Math.abs(t.bottom - e.y), r = Math.abs(t.right - e.x), i = Math.abs(t.left - e.x);
  switch (Math.min(n, o, r, i)) {
    case i:
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
Z(Bs, "getExitSideFromRect");
function Vs(e, t, n = 5) {
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
Z(Vs, "getPaddedExitPoints");
function Hs(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [{ x: r, y: t }, { x: n, y: t }, { x: n, y: o }, { x: r, y: o }];
}
Z(Hs, "getPointsFromRect");
function Gs(e, t) {
  const { x: n, y: o } = e;
  let r = false;
  for (let i = 0, s = t.length - 1; i < t.length; s = i++) {
    const a = t[i], l = t[s], u = a.x, p = a.y, f = l.x, d = l.y;
    p > o != d > o && n < (f - u) * (o - p) / (d - p) + u && (r = !r);
  }
  return r;
}
Z(Gs, "isPointInPolygon");
function Ws(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), Us(t);
}
Z(Ws, "getHull");
function Us(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    for (; t.length >= 2; ) {
      const i = t[t.length - 1], s = t[t.length - 2];
      if ((i.x - s.x) * (r.y - s.y) >= (i.y - s.y) * (r.x - s.x)) t.pop();
      else break;
    }
    t.push(r);
  }
  t.pop();
  const n = [];
  for (let o = e.length - 1; o >= 0; o--) {
    const r = e[o];
    for (; n.length >= 2; ) {
      const i = n[n.length - 1], s = n[n.length - 2];
      if ((i.x - s.x) * (r.y - s.y) >= (i.y - s.y) * (r.x - s.x)) n.pop();
      else break;
    }
    n.push(r);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
Z(Us, "getHullPresorted");
var Th = ep, Oh = np, Mh = op, Ah = sp, Dh = cp, kh = up;
export {
  kp as $,
  kh as A,
  lh as B,
  eh as C,
  uh as D,
  dh as E,
  Kp as F,
  fh as G,
  ph as H,
  Gp as I,
  xh as J,
  vh as K,
  zp as L,
  gh as M,
  hp as N,
  vp as O,
  Jp as P,
  gp as Q,
  qp as R,
  wh as S,
  Qp as T,
  Cp as U,
  xp as V,
  bp as W,
  wp as X,
  Zp as Y,
  Ap as Z,
  Dp as _,
  Il as a,
  Fp as a0,
  jp as a1,
  Ch as a2,
  Rp as a3,
  Pp as a4,
  mp as a5,
  Np as a6,
  oh as b,
  kl as c,
  rh as d,
  ih as e,
  Ol as f,
  yh as g,
  Th as h,
  Oh as i,
  Mh as j,
  Ah as k,
  Dh as l,
  Up as m,
  Yp as n,
  _l as o,
  Ph as p,
  Sh as q,
  Eh as r,
  Ih as s,
  $p as t,
  Bp as u,
  Vp as v,
  Hp as w,
  th as x,
  ch as y,
  ah as z
};
