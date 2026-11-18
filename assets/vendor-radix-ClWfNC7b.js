var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _e, _a;
import { r as i, $ as nt, j as b, a as gt, R as ye } from "./vendor-react-BPvvDyqO.js";
import { a as Be, b as zr, c as Ac } from "./vendor-aws-hJDgVEKM.js";
var Mc = Object.defineProperty, Io = (e, t) => Mc(e, "name", { value: t, configurable: true });
function Jn(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
Io(Jn, "setRef");
function Yr(...e) {
  return (t) => {
    let n = false;
    const o = e.map((r) => {
      const s = Jn(r, t);
      return !n && typeof s == "function" && (n = true), s;
    });
    if (n) return () => {
      for (let r = 0; r < o.length; r++) {
        const s = o[r];
        typeof s == "function" ? s() : Jn(e[r], null);
      }
    };
  };
}
Io(Yr, "composeRefs");
function G(...e) {
  return i.useCallback(Yr(...e), e);
}
Io(G, "useComposedRefs");
var Oc = Object.defineProperty, xe = (e, t) => Oc(e, "name", { value: t, configurable: true });
function Pe(e) {
  const t = i.forwardRef((n, o) => {
    let { children: r, ...s } = n, c = null, a = false;
    const l = [];
    eo(r) && typeof Wt == "function" && (r = Wt(r._payload)), i.Children.forEach(r, (f) => {
      var _a3;
      if (Jr(f)) {
        a = true;
        const m = f;
        let v = "child" in m.props ? m.props.child : m.props.children;
        eo(v) && typeof Wt == "function" && (v = Wt(v._payload)), c = $c(m, v), l.push((_a3 = c == null ? void 0 : c.props) == null ? void 0 : _a3.children);
      } else l.push(f);
    }), c ? c = i.cloneElement(c, void 0, l) : !a && i.Children.count(r) === 1 && i.isValidElement(r) && (c = r);
    const u = c ? Qr(c) : void 0, p = G(o, u);
    if (!c) {
      if (r || r === 0) throw new Error(a ? kc(e) : Fc(e));
      return r;
    }
    const d = Zr(s, c.props ?? {});
    return c.type !== i.Fragment && (d.ref = o ? p : u), i.cloneElement(c, d);
  });
  return t.displayName = `${e}.Slot`, t;
}
xe(Pe, "createSlot");
var Xr = /* @__PURE__ */ Symbol.for("radix.slottable");
function qr(e) {
  const t = xe((n) => "child" in n ? n.children(n.child) : n.children, "Slottable");
  return t.displayName = `${e}.Slottable`, t.__radixId = Xr, t;
}
xe(qr, "createSlottable");
var $c = xe((e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return i.isValidElement(n) ? i.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return i.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function Zr(e, t) {
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
xe(Zr, "mergeProps");
function Qr(e) {
  var _a3, _b;
  let t = (_a3 = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : _a3.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (_b = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : _b.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
xe(Qr, "getElementRef");
function Jr(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Xr;
}
xe(Jr, "isSlottable");
var Dc = /* @__PURE__ */ Symbol.for("react.lazy");
function eo(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Dc && "_payload" in e && es(e._payload);
}
xe(eo, "isLazyComponent");
function es(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
xe(es, "isPromiseLike");
var Fc = xe((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), kc = xe((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Wt = nt[" use ".trim().toString()], Nc = Object.defineProperty, jc = (e, t) => Nc(e, "name", { value: t, configurable: true }), Lc = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"], k = Lc.reduce((e, t) => {
  const n = Pe(`Primitive.${t}`), o = i.forwardRef((r, s) => {
    const { asChild: c, ...a } = r, l = c ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = true), b.jsx(l, { ...a, ref: s });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
function To(e, t) {
  e && gt.flushSync(() => e.dispatchEvent(t));
}
jc(To, "dispatchDiscreteCustomEvent");
var Vc = Object.defineProperty, Gc = (e, t) => Vc(e, "name", { value: t, configurable: true }), ts = Object.freeze({ position: "absolute", border: 0, width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", wordWrap: "normal" }), Bc = i.forwardRef(Gc(function(t, n) {
  return b.jsx(k.span, { ...t, ref: n, style: { ...ts, ...t.style } });
}, "VisuallyHidden")), Uc = Bc, Hc = Object.defineProperty, ge = (e, t) => Hc(e, "name", { value: t, configurable: true });
function Wc(e, t) {
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
ge(Wc, "createContext");
function J(e, t = []) {
  let n = [];
  function o(s, c) {
    const a = i.createContext(c);
    a.displayName = s + "Context";
    const l = n.length;
    n = [...n, c];
    const u = ge((d) => {
      var _a3;
      const { scope: f, children: m, ...v } = d, h = ((_a3 = f == null ? void 0 : f[e]) == null ? void 0 : _a3[l]) || a, g = i.useMemo(() => v, Object.values(v));
      return b.jsx(h.Provider, { value: g, children: m });
    }, "Provider");
    u.displayName = s + "Provider";
    function p(d, f, m = {}) {
      var _a3;
      const { optional: v = false } = m, h = ((_a3 = f == null ? void 0 : f[e]) == null ? void 0 : _a3[l]) || a, g = i.useContext(h);
      if (g) return g;
      if (c !== void 0) return c;
      if (!v) throw new Error(`\`${d}\` must be used within \`${s}\``);
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
  return r.scopeName = e, [o, ns(r, ...t)];
}
ge(J, "createContextScope");
function ns(...e) {
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
ge(ns, "composeContextScopes");
var Kc = Object.defineProperty, ne = (e, t) => Kc(e, "name", { value: t, configurable: true });
function fn(e) {
  const t = e + "CollectionProvider", [n, o] = J(t), [r, s] = n(t, { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }), c = ne((h) => {
    const { scope: g, children: w } = h, y = i.useRef(null), C = i.useRef(/* @__PURE__ */ new Map()).current;
    return b.jsx(r, { scope: g, itemMap: C, collectionRef: y, children: w });
  }, "CollectionProvider");
  c.displayName = t;
  const a = e + "CollectionSlot", l = Pe(a), u = i.forwardRef((h, g) => {
    const { scope: w, children: y } = h, C = s(a, w), x = G(g, C.collectionRef);
    return b.jsx(l, { ref: x, children: y });
  });
  u.displayName = a;
  const p = e + "CollectionItemSlot", d = "data-radix-collection-item", f = Pe(p), m = i.forwardRef((h, g) => {
    const { scope: w, children: y, ...C } = h, x = i.useRef(null), P = G(g, x), R = s(p, w);
    return i.useEffect(() => (R.itemMap.set(x, { ref: x, ...C }), () => {
      R.itemMap.delete(x);
    })), b.jsx(f, { [d]: "", ref: P, children: y });
  });
  m.displayName = p;
  function v(h) {
    const g = s(e + "CollectionConsumer", h);
    return i.useCallback(() => {
      const y = g.collectionRef.current;
      if (!y) return [];
      const C = Array.from(y.querySelectorAll(`[${d}]`));
      return Array.from(g.itemMap.values()).sort((R, S) => C.indexOf(R.ref.current) - C.indexOf(S.ref.current));
    }, [g.collectionRef, g.itemMap]);
  }
  return ne(v, "useCollection"), [{ Provider: c, Slot: u, ItemSlot: m }, v, o];
}
ne(fn, "createCollection");
var br = /* @__PURE__ */ new WeakMap(), Vn = (_a = class extends Map {
  constructor(t) {
    super(t);
    __privateAdd(this, _e);
    __privateSet(this, _e, [...super.keys()]), br.set(this, true);
  }
  set(t, n) {
    return br.get(this) && (this.has(t) ? __privateGet(this, _e)[__privateGet(this, _e).indexOf(t)] = t : __privateGet(this, _e).push(t)), super.set(t, n), this;
  }
  insert(t, n, o) {
    const r = this.has(n), s = __privateGet(this, _e).length, c = _o(t);
    let a = c >= 0 ? c : s + c;
    const l = a < 0 || a >= s ? -1 : a;
    if (l === this.size || r && l === this.size - 1 || l === -1) return this.set(n, o), this;
    const u = this.size + (r ? 0 : 1);
    c < 0 && a++;
    const p = [...__privateGet(this, _e)];
    let d, f = false;
    for (let m = a; m < u; m++) if (a === m) {
      let v = p[m];
      p[m] === n && (v = p[m + 1]), r && this.delete(n), d = this.get(v), this.set(n, o);
    } else {
      !f && p[m - 1] === n && (f = true);
      const v = p[f ? m : m - 1], h = d;
      d = this.get(v), this.delete(v), this.set(v, h);
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
    const n = tn(__privateGet(this, _e), t);
    if (n !== void 0) return this.get(n);
  }
  entryAt(t) {
    const n = tn(__privateGet(this, _e), t);
    if (n !== void 0) return [n, this.get(n)];
  }
  indexOf(t) {
    return __privateGet(this, _e).indexOf(t);
  }
  keyAt(t) {
    return tn(__privateGet(this, _e), t);
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
}, _e = new WeakMap(), ne(_a, "OrderedDict"), _a);
function tn(e, t) {
  if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
  const n = os(e, t);
  return n === -1 ? void 0 : e[n];
}
ne(tn, "at");
function os(e, t) {
  const n = e.length, o = _o(t), r = o >= 0 ? o : n + o;
  return r < 0 || r >= n ? -1 : r;
}
ne(os, "toSafeIndex");
function _o(e) {
  return e !== e || e === 0 ? 0 : Math.trunc(e);
}
ne(_o, "toSafeInteger");
function zc(e) {
  const t = e + "CollectionProvider", [n, o] = J(t), [r, s] = n(t, { collectionElement: null, collectionRef: { current: null }, collectionRefObject: { current: null }, itemMap: new Vn(), setItemMap: ne(() => {
  }, "setItemMap") }), c = ne(({ state: C, ...x }) => C ? b.jsx(l, { ...x, state: C }) : b.jsx(a, { ...x }), "CollectionProvider");
  c.displayName = t;
  const a = ne((C) => {
    const x = g();
    return b.jsx(l, { ...C, state: x });
  }, "CollectionInit");
  a.displayName = t + "Init";
  const l = ne((C) => {
    const { scope: x, children: P, state: R } = C, S = i.useRef(null), [_, A] = i.useState(null), O = G(S, A), [E, I] = R;
    return i.useEffect(() => {
      if (!_) return;
      const M = is(() => {
      });
      return M.observe(_, { childList: true, subtree: true }), () => {
        M.disconnect();
      };
    }, [_]), b.jsx(r, { scope: x, itemMap: E, setItemMap: I, collectionRef: O, collectionRefObject: S, collectionElement: _, children: P });
  }, "CollectionProviderImpl");
  l.displayName = t + "Impl";
  const u = e + "CollectionSlot", p = Pe(u), d = i.forwardRef((C, x) => {
    const { scope: P, children: R } = C, S = s(u, P), _ = G(x, S.collectionRef);
    return b.jsx(p, { ref: _, children: R });
  });
  d.displayName = u;
  const f = e + "CollectionItemSlot", m = "data-radix-collection-item", v = Pe(f), h = i.forwardRef((C, x) => {
    const { scope: P, children: R, ...S } = C, _ = i.useRef(null), [A, O] = i.useState(null), E = G(x, _, O), I = s(f, P), { setItemMap: M } = I, D = i.useRef(S);
    rs(D.current, S) || (D.current = S);
    const V = D.current;
    return i.useEffect(() => {
      const N = V;
      return M((j) => A ? j.has(A) ? j.set(A, { ...N, element: A }).toSorted(to) : (j.set(A, { ...N, element: A }), j.toSorted(to)) : j), () => {
        M((j) => !A || !j.has(A) ? j : (j.delete(A), new Vn(j)));
      };
    }, [A, V, M]), b.jsx(v, { [m]: "", ref: E, children: R });
  });
  h.displayName = f;
  function g() {
    return i.useState(new Vn());
  }
  ne(g, "useInitCollection");
  function w(C) {
    const { itemMap: x } = s(e + "CollectionConsumer", C);
    return x;
  }
  return ne(w, "useCollection"), [{ Provider: c, Slot: d, ItemSlot: h }, { createCollectionScope: o, useCollection: w, useInitCollection: g }];
}
ne(zc, "createCollection");
function rs(e, t) {
  if (e === t) return true;
  if (typeof e != "object" || typeof t != "object" || e == null || t == null) return false;
  const n = Object.keys(e), o = Object.keys(t);
  if (n.length !== o.length) return false;
  for (const r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || e[r] !== t[r]) return false;
  return true;
}
ne(rs, "shallowEqual");
function ss(e, t) {
  return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
ne(ss, "isElementPreceding");
function to(e, t) {
  return !e[1].element || !t[1].element ? 0 : ss(e[1].element, t[1].element) ? -1 : 1;
}
ne(to, "sortByDocumentPosition");
function is(e) {
  return new MutationObserver((n) => {
    for (const o of n) if (o.type === "childList") {
      e();
      return;
    }
  });
}
ne(is, "getChildListObserver");
var Yc = Object.defineProperty, bt = (e, t) => Yc(e, "name", { value: t, configurable: true }), cs = !!(typeof window < "u" && window.document && window.document.createElement);
function T(e, t, { checkForDefaultPrevented: n = true } = {}) {
  return bt(function(r) {
    if (e == null ? void 0 : e(r), n === false || !r || !r.defaultPrevented) return t == null ? void 0 : t(r);
  }, "handleEvent");
}
bt(T, "composeEventHandlers");
function Xc(e) {
  var _a3;
  if (!cs) throw new Error("Cannot access window outside of the DOM");
  return ((_a3 = e == null ? void 0 : e.ownerDocument) == null ? void 0 : _a3.defaultView) ?? window;
}
bt(Xc, "getOwnerWindow");
function no(e) {
  if (!cs) throw new Error("Cannot access document outside of the DOM");
  return (e == null ? void 0 : e.ownerDocument) ?? document;
}
bt(no, "getOwnerDocument");
function as(e, t = false) {
  const { activeElement: n } = no(e);
  if (!(n == null ? void 0 : n.nodeName)) return null;
  if (ls(n) && n.contentDocument) return as(n.contentDocument.body, t);
  if (t) {
    const o = n.getAttribute("aria-activedescendant");
    if (o) {
      const r = no(n).getElementById(o);
      if (r) return r;
    }
  }
  return n;
}
bt(as, "getActiveElement");
function ls(e) {
  return e.tagName === "IFRAME";
}
bt(ls, "isFrame");
var Q = (globalThis == null ? void 0 : globalThis.document) ? i.useLayoutEffect : () => {
}, qc = Object.defineProperty, Zc = (e, t) => qc(e, "name", { value: t, configurable: true }), Cr = nt[" useEffectEvent ".trim().toString()], xr = nt[" useInsertionEffect ".trim().toString()];
function us(e) {
  if (typeof Cr == "function") return Cr(e);
  const t = i.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof xr == "function" ? xr(() => {
    t.current = e;
  }) : Q(() => {
    t.current = e;
  }), i.useMemo(() => ((...n) => {
    var _a3;
    return (_a3 = t.current) == null ? void 0 : _a3.call(t, ...n);
  }), []);
}
Zc(us, "useEffectEvent");
var Qc = Object.defineProperty, $t = (e, t) => Qc(e, "name", { value: t, configurable: true }), Jc = nt[" useInsertionEffect ".trim().toString()] || Q;
function ie({ prop: e, defaultProp: t, onChange: n = $t(() => {
}, "onChange"), caller: o }) {
  const [r, s, c] = ds({ defaultProp: t, onChange: n }), a = e !== void 0, l = a ? e : r, u = i.useCallback((p) => {
    var _a3;
    if (a) {
      const d = fs(p) ? p(e) : p;
      d !== e && ((_a3 = c.current) == null ? void 0 : _a3.call(c, d));
    } else s(p);
  }, [a, e, s, c]);
  return [l, u];
}
$t(ie, "useControllableState");
function ds({ defaultProp: e, onChange: t }) {
  const [n, o] = i.useState(e), r = i.useRef(n), s = i.useRef(t);
  return Jc(() => {
    s.current = t;
  }, [t]), i.useEffect(() => {
    var _a3;
    r.current !== n && ((_a3 = s.current) == null ? void 0 : _a3.call(s, n), r.current = n);
  }, [n, r]), [n, o, s];
}
$t(ds, "useUncontrolledState");
function fs(e) {
  return typeof e == "function";
}
$t(fs, "isFunction");
var wr = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function ea(e, t, n, o) {
  const { prop: r, defaultProp: s, onChange: c, caller: a } = t, l = r !== void 0, u = us(c), p = [{ ...n, state: s }];
  o && p.push(o);
  const [d, f] = i.useReducer((g, w) => {
    if (w.type === wr) return { ...g, state: w.state };
    const y = e(g, w);
    return l && !Object.is(y.state, g.state) && u(y.state), y;
  }, ...p), m = d.state, v = i.useRef(m);
  i.useEffect(() => {
    v.current !== m && (v.current = m, l || u(m));
  }, [m, v, l]);
  const h = i.useMemo(() => r !== void 0 ? { ...d, state: r } : d, [d, r]);
  return i.useEffect(() => {
    l && !Object.is(r, d.state) && f({ type: wr, state: r });
  }, [r, d.state, l]), [h, f];
}
$t(ea, "useControllableStateReducer");
var ta = Object.defineProperty, Ne = (e, t) => ta(e, "name", { value: t, configurable: true });
function ps(e, t) {
  return i.useReducer((n, o) => t[n][o] ?? n, e);
}
Ne(ps, "useStateMachine");
var pe = Ne((e) => {
  const { present: t, children: n } = e, o = ms(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = vs(o.ref, hs(r));
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
}, "Presence");
function ms(e) {
  const [t, n] = i.useState(), o = i.useRef(null), r = i.useRef(e), s = i.useRef("none"), c = i.useRef(void 0), a = e ? "mounted" : "unmounted", [l, u] = ps(a, { mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" }, unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" }, unmounted: { MOUNT: "mounted" } });
  return i.useEffect(() => {
    l === "mounted" ? (s.current = c.current ?? ft(o.current), c.current = void 0) : s.current = "none";
  }, [l]), Q(() => {
    const p = o.current, d = r.current;
    if (d !== e) {
      const m = s.current, v = ft(p);
      e ? (c.current = v, u("MOUNT")) : v === "none" || (p == null ? void 0 : p.display) === "none" ? u("UNMOUNT") : u(d && m !== v ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, u]), Q(() => {
    if (t) {
      let p;
      const d = t.ownerDocument.defaultView ?? window, f = Ne((v) => {
        const g = ft(o.current).includes(CSS.escape(v.animationName));
        if (v.target === t && g && (u("ANIMATION_END"), !r.current)) {
          const w = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", p = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = w);
          });
        }
      }, "handleAnimationEnd"), m = Ne((v) => {
        v.target === t && (s.current = ft(o.current));
      }, "handleAnimationStart");
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
        d.clearTimeout(p), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f);
      };
    } else u("ANIMATION_END");
  }, [t, u]), { isPresent: ["mounted", "unmountSuspended"].includes(l), ref: i.useCallback((p) => {
    if (p) {
      const d = getComputedStyle(p);
      o.current = d, c.current = ft(d);
    } else o.current = null;
    n(p);
  }, []) };
}
Ne(ms, "usePresence");
function oo(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
Ne(oo, "setRef");
function vs(...e) {
  const t = i.useRef(e);
  return t.current = e, i.useCallback((n) => {
    const o = t.current;
    let r = false;
    const s = o.map((c) => {
      const a = oo(c, n);
      return !r && typeof a == "function" && (r = true), a;
    });
    if (r) return () => {
      for (let c = 0; c < s.length; c++) {
        const a = s[c];
        typeof a == "function" ? a() : oo(o[c], null);
      }
    };
  }, []);
}
Ne(vs, "useStableComposedRefs");
function ft(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
Ne(ft, "getAnimationName");
function hs(e) {
  var _a3, _b;
  let t = (_a3 = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : _a3.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (_b = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : _b.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Ne(hs, "getElementRef");
var na = Object.defineProperty, oa = (e, t) => na(e, "name", { value: t, configurable: true }), ra = nt[" useId ".trim().toString()] || (() => {
}), sa = 0;
function fe(e) {
  const [t, n] = i.useState(ra());
  return Q(() => {
    e || n((o) => o ?? String(sa++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
oa(fe, "useId");
var ia = Object.defineProperty, ca = (e, t) => ia(e, "name", { value: t, configurable: true }), aa = i.createContext(void 0);
function ot(e) {
  const t = i.useContext(aa);
  return e || t || "ltr";
}
ca(ot, "useDirection");
var la = Object.defineProperty, ua = (e, t) => la(e, "name", { value: t, configurable: true });
function be(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => ((...n) => {
    var _a3;
    return (_a3 = t.current) == null ? void 0 : _a3.call(t, ...n);
  }), []);
}
ua(be, "useCallbackRef");
var da = Object.defineProperty, te = (e, t) => da(e, "name", { value: t, configurable: true }), ro = "dismissableLayer.update", fa = "dismissableLayer.pointerDownOutside", pa = "dismissableLayer.focusOutside", yr, gs = i.createContext({ layers: /* @__PURE__ */ new Set(), layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(), branches: /* @__PURE__ */ new Set(), dismissableSurfaces: /* @__PURE__ */ new Set() }), Dt = i.forwardRef(te(function(t, n) {
  const { disableOutsidePointerEvents: o = false, deferPointerDownOutside: r = false, onEscapeKeyDown: s, onPointerDownOutside: c, onFocusOutside: a, onInteractOutside: l, onDismiss: u, ...p } = t, d = i.useContext(gs), [f, m] = i.useState(null), v = (f == null ? void 0 : f.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, h] = i.useState({}), g = G(n, m), w = Array.from(d.layers), [y] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), C = y ? w.indexOf(y) : -1, x = f ? w.indexOf(f) : -1, P = d.layersWithOutsidePointerEventsDisabled.size > 0, R = x >= C, S = i.useRef(false), _ = Cs((I) => {
    c == null ? void 0 : c(I), l == null ? void 0 : l(I), I.defaultPrevented || (u == null ? void 0 : u());
  }, { ownerDocument: v, deferPointerDownOutside: r, isDeferredPointerDownOutsideRef: S, dismissableSurfaces: d.dismissableSurfaces, shouldHandlePointerDownOutside: i.useCallback((I) => {
    if (!(I instanceof Node)) return false;
    const M = [...d.branches].some((D) => D.contains(I));
    return R && !M;
  }, [d.branches, R]) }), A = xs((I) => {
    if (r && S.current) return;
    const M = I.target;
    [...d.branches].some((V) => V.contains(M)) || (a == null ? void 0 : a(I), l == null ? void 0 : l(I), I.defaultPrevented || (u == null ? void 0 : u()));
  }, v), O = f ? x === w.length - 1 : false, E = be((I) => {
    I.key === "Escape" && (s == null ? void 0 : s(I), !I.defaultPrevented && u && (I.preventDefault(), u()));
  });
  return i.useEffect(() => {
    if (O) return v.addEventListener("keydown", E, { capture: true }), () => v.removeEventListener("keydown", E, { capture: true });
  }, [v, O, E]), i.useEffect(() => {
    if (f) return o && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (yr = v.body.style.pointerEvents, v.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), so(), () => {
      o && (d.layersWithOutsidePointerEventsDisabled.delete(f), d.layersWithOutsidePointerEventsDisabled.size === 0 && (v.body.style.pointerEvents = yr));
    };
  }, [f, v, o, d]), i.useEffect(() => () => {
    f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), so());
  }, [f, d]), i.useEffect(() => {
    const I = te(() => h({}), "handleUpdate");
    return document.addEventListener(ro, I), () => document.removeEventListener(ro, I);
  }, []), b.jsx(k.div, { ...p, ref: g, style: { pointerEvents: P ? R ? "auto" : "none" : void 0, ...t.style }, onFocusCapture: T(t.onFocusCapture, A.onFocusCapture), onBlurCapture: T(t.onBlurCapture, A.onBlurCapture), onPointerDownCapture: T(t.onPointerDownCapture, _.onPointerDownCapture) });
}, "DismissableLayer"));
function bs() {
  const e = i.useContext(gs), [t, n] = i.useState(null);
  return i.useEffect(() => {
    if (t) return e.dismissableSurfaces.add(t), () => {
      e.dismissableSurfaces.delete(t);
    };
  }, [t, e.dismissableSurfaces]), n;
}
te(bs, "useDismissableLayerSurface");
var ma = te(() => true, "IS_TRUE");
function Cs(e, t) {
  const { ownerDocument: n = globalThis == null ? void 0 : globalThis.document, deferPointerDownOutside: o = false, isDeferredPointerDownOutsideRef: r, dismissableSurfaces: s, shouldHandlePointerDownOutside: c = ma } = t, a = be(e), l = i.useRef(false), u = i.useRef(false), p = i.useRef(/* @__PURE__ */ new Map()), d = i.useRef(() => {
  });
  return i.useEffect(() => {
    function f() {
      u.current = false, r.current = false, p.current.clear();
    }
    te(f, "resetOutsideInteraction");
    function m() {
      return Array.from(p.current.values()).some(Boolean);
    }
    te(m, "isOutsideInteractionIntercepted");
    function v(C) {
      if (!u.current) return;
      const x = C.target;
      x instanceof Node && [...s].some((R) => R.contains(x)) || p.current.set(C.type, true), C.type === "click" && window.setTimeout(() => {
        u.current && d.current();
      }, 0);
    }
    te(v, "handleInteractionCapture");
    function h(C) {
      u.current && p.current.set(C.type, false);
    }
    te(h, "handleInteractionBubble");
    const g = te((C) => {
      if (C.target && !l.current) {
        let x = function() {
          n.removeEventListener("click", d.current);
          const R = m();
          f(), R || Ao(fa, a, P, { discrete: true });
        };
        if (te(x, "handleAndDispatchPointerDownOutsideEvent"), !c(C.target)) {
          n.removeEventListener("click", d.current), f(), l.current = false;
          return;
        }
        const P = { originalEvent: C };
        u.current = true, r.current = o && C.button === 0, p.current.clear(), !o || C.button !== 0 ? x() : (n.removeEventListener("click", d.current), d.current = x, n.addEventListener("click", d.current, { once: true }));
      } else n.removeEventListener("click", d.current), f();
      l.current = false;
    }, "handlePointerDown"), w = ["pointerup", "mousedown", "mouseup", "touchstart", "touchend", "click"];
    for (const C of w) n.addEventListener(C, v, true), n.addEventListener(C, h);
    const y = window.setTimeout(() => {
      n.addEventListener("pointerdown", g);
    }, 0);
    return () => {
      window.clearTimeout(y), n.removeEventListener("pointerdown", g), n.removeEventListener("click", d.current);
      for (const C of w) n.removeEventListener(C, v, true), n.removeEventListener(C, h);
    };
  }, [n, a, o, r, s, c]), { onPointerDownCapture: te(() => l.current = true, "onPointerDownCapture") };
}
te(Cs, "usePointerDownOutside");
function xs(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = be(e), o = i.useRef(false);
  return i.useEffect(() => {
    const r = te((s) => {
      s.target && !o.current && Ao(pa, n, { originalEvent: s }, { discrete: false });
    }, "handleFocus");
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), { onFocusCapture: te(() => o.current = true, "onFocusCapture"), onBlurCapture: te(() => o.current = false, "onBlurCapture") };
}
te(xs, "useFocusOutside");
function so() {
  const e = new CustomEvent(ro);
  document.dispatchEvent(e);
}
te(so, "dispatchUpdate");
function Ao(e, t, n, { discrete: o }) {
  const r = n.originalEvent.target, s = new CustomEvent(e, { bubbles: false, cancelable: true, detail: n });
  t && r.addEventListener(e, t, { once: true }), o ? To(r, s) : r.dispatchEvent(s);
}
te(Ao, "handleAndDispatchCustomEvent");
var va = Object.defineProperty, ae = (e, t) => va(e, "name", { value: t, configurable: true }), Gn = "focusScope.autoFocusOnMount", Bn = "focusScope.autoFocusOnUnmount", Rr = { bubbles: false, cancelable: true }, pn = i.forwardRef(ae(function(t, n) {
  const { loop: o = false, trapped: r = false, onMountAutoFocus: s, onUnmountAutoFocus: c, ...a } = t, [l, u] = i.useState(null), p = be(s), d = be(c), f = i.useRef(null), m = G(n, u), v = i.useRef({ paused: false, pause() {
    this.paused = true;
  }, resume() {
    this.paused = false;
  } }).current;
  i.useEffect(() => {
    if (r) {
      let g = function(x) {
        if (v.paused || !l) return;
        const P = x.target;
        l.contains(P) ? f.current = P : Ae(f.current, { select: true });
      }, w = function(x) {
        if (v.paused || !l) return;
        const P = x.relatedTarget;
        P !== null && (l.contains(P) || Ae(f.current, { select: true }));
      }, y = function(x) {
        if (document.activeElement === document.body) for (const R of x) R.removedNodes.length > 0 && Ae(l);
      };
      ae(g, "handleFocusIn"), ae(w, "handleFocusOut"), ae(y, "handleMutations"), document.addEventListener("focusin", g), document.addEventListener("focusout", w);
      const C = new MutationObserver(y);
      return l && C.observe(l, { childList: true, subtree: true }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", w), C.disconnect();
      };
    }
  }, [r, l, v.paused]), i.useEffect(() => {
    if (l) {
      Pr.add(v);
      const g = document.activeElement;
      if (!l.contains(g)) {
        const y = new CustomEvent(Gn, Rr);
        l.addEventListener(Gn, p), l.dispatchEvent(y), y.defaultPrevented || (ws(Es(Mo(l)), { select: true }), document.activeElement === g && Ae(l));
      }
      return () => {
        l.removeEventListener(Gn, p), setTimeout(() => {
          const y = new CustomEvent(Bn, Rr);
          l.addEventListener(Bn, d), l.dispatchEvent(y), y.defaultPrevented || Ae(g ?? document.body, { select: true }), l.removeEventListener(Bn, d), Pr.remove(v);
        }, 0);
      };
    }
  }, [l, p, d, v]);
  const h = i.useCallback((g) => {
    if (!o && !r || v.paused) return;
    const w = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, y = document.activeElement;
    if (w && y) {
      const C = g.currentTarget, [x, P] = ys(C);
      x && P ? !g.shiftKey && y === P ? (g.preventDefault(), o && Ae(x, { select: true })) : g.shiftKey && y === x && (g.preventDefault(), o && Ae(P, { select: true })) : y === C && g.preventDefault();
    }
  }, [o, r, v.paused]);
  return b.jsx(k.div, { tabIndex: -1, ...a, ref: m, onKeyDown: h });
}, "FocusScope"));
function ws(e, { select: t = false } = {}) {
  const n = document.activeElement;
  for (const o of e) if (Ae(o, { select: t }), document.activeElement !== n) return;
}
ae(ws, "focusFirst");
function ys(e) {
  const t = Mo(e), n = io(t, e), o = io(t.reverse(), e);
  return [n, o];
}
ae(ys, "getTabbableEdges");
function Mo(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: ae((o) => {
    const r = o.tagName === "INPUT" && o.type === "hidden";
    return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  }, "acceptNode") });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
ae(Mo, "getTabbableCandidates");
function io(e, t) {
  const n = typeof t.checkVisibility == "function" && t.checkVisibility({ checkVisibilityCSS: true });
  for (const o of e) if (!(n ? !o.checkVisibility({ checkVisibilityCSS: true }) : Rs(o, { upTo: t }))) return o;
}
ae(io, "findVisible");
function Rs(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return true;
  for (; e; ) {
    if (t !== void 0 && e === t) return false;
    if (getComputedStyle(e).display === "none") return true;
    e = e.parentElement;
  }
  return false;
}
ae(Rs, "isHidden");
function Ps(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
ae(Ps, "isSelectableInput");
function Ae(e, { select: t = false } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: true }), e !== n && Ps(e) && t && e.select();
  }
}
ae(Ae, "focus");
var Pr = Ss();
function Ss() {
  let e = [];
  return { add(t) {
    const n = e[0];
    t !== n && (n == null ? void 0 : n.pause()), e = co(e, t), e.unshift(t);
  }, remove(t) {
    var _a3;
    e = co(e, t), (_a3 = e[0]) == null ? void 0 : _a3.resume();
  } };
}
ae(Ss, "createFocusScopesStack");
function co(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
ae(co, "arrayRemove");
function Es(e) {
  return e.filter((t) => t.tagName !== "A");
}
ae(Es, "removeLinks");
var ha = Object.defineProperty, ga = (e, t) => ha(e, "name", { value: t, configurable: true }), Ft = i.forwardRef(ga(function(t, n) {
  var _a3;
  const { container: o, ...r } = t, [s, c] = i.useState(false);
  Q(() => c(true), []);
  const a = o || s && ((_a3 = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a3.body);
  return a ? gt.createPortal(b.jsx(k.div, { ...r, ref: n }), a) : null;
}, "Portal")), ba = Object.defineProperty, Oo = (e, t) => ba(e, "name", { value: t, configurable: true }), Kt = 0, at = null;
function Ca(e) {
  return Ct(), e.children;
}
Oo(Ca, "FocusGuards");
function Ct() {
  i.useEffect(() => {
    at || (at = { start: ao(), end: ao() });
    const { start: e, end: t } = at;
    return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), Kt++, () => {
      Kt === 1 && (at == null ? void 0 : at.start.remove(), at == null ? void 0 : at.end.remove(), at = null), Kt = Math.max(0, Kt - 1);
    };
  }, []);
}
Oo(Ct, "useFocusGuards");
function ao() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
Oo(ao, "createFocusGuard");
var nn = "right-scroll-bar-position", on = "width-before-scroll-bar", xa = "with-scroll-bars-hidden", wa = "--removed-body-scroll-bar-size";
function Un(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function ya(e, t) {
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
var Ra = typeof window < "u" ? i.useLayoutEffect : i.useEffect, Sr = /* @__PURE__ */ new WeakMap();
function Pa(e, t) {
  var n = ya(null, function(o) {
    return e.forEach(function(r) {
      return Un(r, o);
    });
  });
  return Ra(function() {
    var o = Sr.get(n);
    if (o) {
      var r = new Set(o), s = new Set(e), c = n.current;
      r.forEach(function(a) {
        s.has(a) || Un(a, null);
      }), s.forEach(function(a) {
        r.has(a) || Un(a, c);
      });
    }
    Sr.set(n, e);
  }, [e]), n;
}
function Sa(e) {
  return e;
}
function Ea(e, t) {
  t === void 0 && (t = Sa);
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
function Ia(e) {
  e === void 0 && (e = {});
  var t = Ea(null);
  return t.options = Be({ async: true, ssr: false }, e), t;
}
var Is = function(e) {
  var t = e.sideCar, n = zr(e, ["sideCar"]);
  if (!t) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var o = t.read();
  if (!o) throw new Error("Sidecar medium not found");
  return i.createElement(o, Be({}, n));
};
Is.isSideCarExport = true;
function Ta(e, t) {
  return e.useMedium(t), Is;
}
var Ts = Ia(), Hn = function() {
}, mn = i.forwardRef(function(e, t) {
  var n = i.useRef(null), o = i.useState({ onScrollCapture: Hn, onWheelCapture: Hn, onTouchMoveCapture: Hn }), r = o[0], s = o[1], c = e.forwardProps, a = e.children, l = e.className, u = e.removeScrollBar, p = e.enabled, d = e.shards, f = e.sideCar, m = e.noRelative, v = e.noIsolation, h = e.inert, g = e.allowPinchZoom, w = e.as, y = w === void 0 ? "div" : w, C = e.gapMode, x = zr(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), P = f, R = Pa([n, t]), S = Be(Be({}, x), r);
  return i.createElement(i.Fragment, null, p && i.createElement(P, { sideCar: Ts, removeScrollBar: u, shards: d, noRelative: m, noIsolation: v, inert: h, setCallbacks: s, allowPinchZoom: !!g, lockRef: n, gapMode: C }), c ? i.cloneElement(i.Children.only(a), Be(Be({}, S), { ref: R })) : i.createElement(y, Be({}, S, { className: l, ref: R }), a));
});
mn.defaultProps = { enabled: true, removeScrollBar: true, inert: false };
mn.classNames = { fullWidth: on, zeroRight: nn };
var _a2 = function() {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function Aa() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = _a2();
  return t && e.setAttribute("nonce", t), e;
}
function Ma(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Oa(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var $a = function() {
  var e = 0, t = null;
  return { add: function(n) {
    e == 0 && (t = Aa()) && (Ma(t, n), Oa(t)), e++;
  }, remove: function() {
    e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
  } };
}, Da = function() {
  var e = $a();
  return function(t, n) {
    i.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, _s = function() {
  var e = Da(), t = function(n) {
    var o = n.styles, r = n.dynamic;
    return e(o, r), null;
  };
  return t;
}, Fa = { left: 0, top: 0, right: 0, gap: 0 }, Wn = function(e) {
  return parseInt(e || "", 10) || 0;
}, ka = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], o = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Wn(n), Wn(o), Wn(r)];
}, Na = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u") return Fa;
  var t = ka(e), n = document.documentElement.clientWidth, o = window.innerWidth;
  return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, o - n + t[2] - t[0]) };
}, ja = _s(), pt = "data-scroll-locked", La = function(e, t, n, o) {
  var r = e.left, s = e.top, c = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(xa, ` {
   overflow: hidden `).concat(o, `;
   padding-right: `).concat(a, "px ").concat(o, `;
  }
  body[`).concat(pt, `] {
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
  
  .`).concat(nn, ` {
    right: `).concat(a, "px ").concat(o, `;
  }
  
  .`).concat(on, ` {
    margin-right: `).concat(a, "px ").concat(o, `;
  }
  
  .`).concat(nn, " .").concat(nn, ` {
    right: 0 `).concat(o, `;
  }
  
  .`).concat(on, " .").concat(on, ` {
    margin-right: 0 `).concat(o, `;
  }
  
  body[`).concat(pt, `] {
    `).concat(wa, ": ").concat(a, `px;
  }
`);
}, Er = function() {
  var e = parseInt(document.body.getAttribute(pt) || "0", 10);
  return isFinite(e) ? e : 0;
}, Va = function() {
  i.useEffect(function() {
    return document.body.setAttribute(pt, (Er() + 1).toString()), function() {
      var e = Er() - 1;
      e <= 0 ? document.body.removeAttribute(pt) : document.body.setAttribute(pt, e.toString());
    };
  }, []);
}, Ga = function(e) {
  var t = e.noRelative, n = e.noImportant, o = e.gapMode, r = o === void 0 ? "margin" : o;
  Va();
  var s = i.useMemo(function() {
    return Na(r);
  }, [r]);
  return i.createElement(ja, { styles: La(s, !t, r, n ? "" : "!important") });
}, lo = false;
if (typeof window < "u") try {
  var zt = Object.defineProperty({}, "passive", { get: function() {
    return lo = true, true;
  } });
  window.addEventListener("test", zt, zt), window.removeEventListener("test", zt, zt);
} catch {
  lo = false;
}
var lt = lo ? { passive: false } : false, Ba = function(e) {
  return e.tagName === "TEXTAREA";
}, As = function(e, t) {
  if (!(e instanceof Element)) return false;
  var n = window.getComputedStyle(e);
  return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !Ba(e) && n[t] === "visible");
}, Ua = function(e) {
  return As(e, "overflowY");
}, Ha = function(e) {
  return As(e, "overflowX");
}, Ir = function(e, t) {
  var n = t.ownerDocument, o = t;
  do {
    typeof ShadowRoot < "u" && o instanceof ShadowRoot && (o = o.host);
    var r = Ms(e, o);
    if (r) {
      var s = Os(e, o), c = s[1], a = s[2];
      if (c > a) return true;
    }
    o = o.parentNode;
  } while (o && o !== n.body);
  return false;
}, Wa = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, o = e.clientHeight;
  return [t, n, o];
}, Ka = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, o = e.clientWidth;
  return [t, n, o];
}, Ms = function(e, t) {
  return e === "v" ? Ua(t) : Ha(t);
}, Os = function(e, t) {
  return e === "v" ? Wa(t) : Ka(t);
}, za = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Ya = function(e, t, n, o, r) {
  var s = za(e, window.getComputedStyle(t).direction), c = s * o, a = n.target, l = t.contains(a), u = false, p = c > 0, d = 0, f = 0;
  do {
    if (!a) break;
    var m = Os(e, a), v = m[0], h = m[1], g = m[2], w = h - g - s * v;
    (v || w) && Ms(e, a) && (d += w, f += v);
    var y = a.parentNode;
    a = y && y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? y.host : y;
  } while (!l && a !== document.body || l && (t.contains(a) || t === a));
  return (p && Math.abs(d) < 1 || !p && Math.abs(f) < 1) && (u = true), u;
}, Yt = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Tr = function(e) {
  return [e.deltaX, e.deltaY];
}, _r = function(e) {
  return e && "current" in e ? e.current : e;
}, Xa = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, qa = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Za = 0, ut = [];
function Qa(e) {
  var t = i.useRef([]), n = i.useRef([0, 0]), o = i.useRef(), r = i.useState(Za++)[0], s = i.useState(_s)[0], c = i.useRef(e);
  i.useEffect(function() {
    c.current = e;
  }, [e]), i.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var h = Ac([e.lockRef.current], (e.shards || []).map(_r), true).filter(Boolean);
      return h.forEach(function(g) {
        return g.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), h.forEach(function(g) {
          return g.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = i.useCallback(function(h, g) {
    if ("touches" in h && h.touches.length === 2 || h.type === "wheel" && h.ctrlKey) return !c.current.allowPinchZoom;
    var w = Yt(h), y = n.current, C = "deltaX" in h ? h.deltaX : y[0] - w[0], x = "deltaY" in h ? h.deltaY : y[1] - w[1], P, R = h.target, S = Math.abs(C) > Math.abs(x) ? "h" : "v";
    if ("touches" in h && S === "h" && R.type === "range") return false;
    var _ = window.getSelection(), A = _ && _.anchorNode, O = A ? A === R || A.contains(R) : false;
    if (O) return false;
    var E = Ir(S, R);
    if (!E) return true;
    if (E ? P = S : (P = S === "v" ? "h" : "v", E = Ir(S, R)), !E) return false;
    if (!o.current && "changedTouches" in h && (C || x) && (o.current = P), !P) return true;
    var I = o.current || P;
    return Ya(I, g, h, I === "h" ? C : x);
  }, []), l = i.useCallback(function(h) {
    var g = h;
    if (!(!ut.length || ut[ut.length - 1] !== s)) {
      var w = "deltaY" in g ? Tr(g) : Yt(g), y = t.current.filter(function(P) {
        return P.name === g.type && (P.target === g.target || g.target === P.shadowParent) && Xa(P.delta, w);
      })[0];
      if (y && y.should) {
        g.cancelable && g.preventDefault();
        return;
      }
      if (!y) {
        var C = (c.current.shards || []).map(_r).filter(Boolean).filter(function(P) {
          return P.contains(g.target);
        }), x = C.length > 0 ? a(g, C[0]) : !c.current.noIsolation;
        x && g.cancelable && g.preventDefault();
      }
    }
  }, []), u = i.useCallback(function(h, g, w, y) {
    var C = { name: h, delta: g, target: w, should: y, shadowParent: Ja(w) };
    t.current.push(C), setTimeout(function() {
      t.current = t.current.filter(function(x) {
        return x !== C;
      });
    }, 1);
  }, []), p = i.useCallback(function(h) {
    n.current = Yt(h), o.current = void 0;
  }, []), d = i.useCallback(function(h) {
    u(h.type, Tr(h), h.target, a(h, e.lockRef.current));
  }, []), f = i.useCallback(function(h) {
    u(h.type, Yt(h), h.target, a(h, e.lockRef.current));
  }, []);
  i.useEffect(function() {
    return ut.push(s), e.setCallbacks({ onScrollCapture: d, onWheelCapture: d, onTouchMoveCapture: f }), document.addEventListener("wheel", l, lt), document.addEventListener("touchmove", l, lt), document.addEventListener("touchstart", p, lt), function() {
      ut = ut.filter(function(h) {
        return h !== s;
      }), document.removeEventListener("wheel", l, lt), document.removeEventListener("touchmove", l, lt), document.removeEventListener("touchstart", p, lt);
    };
  }, []);
  var m = e.removeScrollBar, v = e.inert;
  return i.createElement(i.Fragment, null, v ? i.createElement(s, { styles: qa(r) }) : null, m ? i.createElement(Ga, { noRelative: e.noRelative, gapMode: e.gapMode }) : null);
}
function Ja(e) {
  for (var t = null; e !== null; ) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const el = Ta(Ts, Qa);
var kt = i.forwardRef(function(e, t) {
  return i.createElement(mn, Be({}, e, { ref: t, sideCar: el }));
});
kt.classNames = mn.classNames;
var tl = function(e) {
  if (typeof document > "u") return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, dt = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakMap(), qt = {}, Kn = 0, $s = function(e) {
  return e && (e.host || $s(e.parentNode));
}, nl = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n)) return n;
    var o = $s(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, ol = function(e, t, n, o) {
  var r = nl(t, Array.isArray(e) ? e : [e]);
  qt[n] || (qt[n] = /* @__PURE__ */ new WeakMap());
  var s = qt[n], c = [], a = /* @__PURE__ */ new Set(), l = new Set(r), u = function(d) {
    !d || a.has(d) || (a.add(d), u(d.parentNode));
  };
  r.forEach(u);
  var p = function(d) {
    !d || l.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (a.has(f)) p(f);
      else try {
        var m = f.getAttribute(o), v = m !== null && m !== "false", h = (dt.get(f) || 0) + 1, g = (s.get(f) || 0) + 1;
        dt.set(f, h), s.set(f, g), c.push(f), h === 1 && v && Xt.set(f, true), g === 1 && f.setAttribute(n, "true"), v || f.setAttribute(o, "true");
      } catch (w) {
        console.error("aria-hidden: cannot operate on ", f, w);
      }
    });
  };
  return p(t), a.clear(), Kn++, function() {
    c.forEach(function(d) {
      var f = dt.get(d) - 1, m = s.get(d) - 1;
      dt.set(d, f), s.set(d, m), f || (Xt.has(d) || d.removeAttribute(o), Xt.delete(d)), m || d.removeAttribute(n);
    }), Kn--, Kn || (dt = /* @__PURE__ */ new WeakMap(), dt = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakMap(), qt = {});
  };
}, vn = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = tl(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), ol(o, r, n, "aria-hidden")) : function() {
    return null;
  };
}, rl = Object.defineProperty, me = (e, t) => rl(e, "name", { value: t, configurable: true }), $o = "Dialog", [Ds, Jm] = J($o), [sl, we] = Ds($o), ev = me((e) => {
  const { __scopeDialog: t, children: n, open: o, defaultOpen: r, onOpenChange: s, modal: c = true } = e, a = i.useRef(null), l = i.useRef(null), [u, p] = ie({ prop: o, defaultProp: r ?? false, onChange: s, caller: $o }), [d, f] = i.useState(0), [m, v] = i.useState(0);
  return b.jsx(sl, { scope: t, triggerRef: a, contentRef: l, contentId: fe(), titleId: fe(), descriptionId: fe(), titlePresent: d > 0, descriptionPresent: m > 0, setTitleCount: f, setDescriptionCount: v, open: u, onOpenChange: p, onOpenToggle: i.useCallback(() => p((h) => !h), [p]), modal: c, children: n });
}, "Dialog"), il = "DialogTrigger", tv = i.forwardRef(me(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = we(il, o), c = G(n, s.triggerRef);
  return b.jsx(k.button, { type: "button", "aria-haspopup": "dialog", "aria-expanded": s.open, "aria-controls": s.open ? s.contentId : void 0, "data-state": hn(s.open), ...r, ref: c, onClick: T(t.onClick, s.onOpenToggle) });
}, "DialogTrigger")), Fs = "DialogPortal", [cl, ks] = Ds(Fs, { forceMount: void 0 }), nv = me((e) => {
  const { __scopeDialog: t, forceMount: n, children: o, container: r } = e, s = we(Fs, t);
  return b.jsx(cl, { scope: t, forceMount: n, children: i.Children.map(o, (c) => b.jsx(pe, { present: n || s.open, children: b.jsx(Ft, { asChild: true, container: r, children: c }) })) });
}, "DialogPortal"), uo = "DialogOverlay", ov = i.forwardRef(me(function(t, n) {
  const o = ks(uo, t.__scopeDialog), { forceMount: r = o.forceMount, ...s } = t, c = we(uo, t.__scopeDialog);
  return c.modal ? b.jsx(pe, { present: r || c.open, children: b.jsx(ll, { ...s, ref: n }) }) : null;
}, "DialogOverlay")), al = Pe("DialogOverlay.RemoveScroll"), ll = i.forwardRef(me(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = we(uo, o), c = bs(), a = G(n, c);
  return b.jsx(kt, { as: al, allowPinchZoom: true, shards: [s.contentRef], children: b.jsx(k.div, { "data-state": hn(s.open), ...r, ref: a, style: { pointerEvents: "auto", ...r.style } }) });
}, "DialogOverlayImpl")), Tt = "DialogContent", rv = i.forwardRef(me(function(t, n) {
  const o = ks(Tt, t.__scopeDialog), { forceMount: r = o.forceMount, ...s } = t, c = we(Tt, t.__scopeDialog);
  return b.jsx(pe, { present: r || c.open, children: c.modal ? b.jsx(ul, { ...s, ref: n }) : b.jsx(dl, { ...s, ref: n }) });
}, "DialogContent")), ul = i.forwardRef(me(function(t, n) {
  const o = we(Tt, t.__scopeDialog), r = i.useRef(null), s = G(n, o.contentRef, r);
  return i.useEffect(() => {
    const c = r.current;
    if (c) return vn(c);
  }, []), b.jsx(Ns, { ...t, ref: s, trapFocus: o.open, disableOutsidePointerEvents: o.open, onCloseAutoFocus: T(t.onCloseAutoFocus, (c) => {
    var _a3;
    c.preventDefault(), (_a3 = o.triggerRef.current) == null ? void 0 : _a3.focus();
  }), onPointerDownOutside: T(t.onPointerDownOutside, (c) => {
    const a = c.detail.originalEvent, l = a.button === 0 && a.ctrlKey === true;
    (a.button === 2 || l) && c.preventDefault();
  }), onFocusOutside: T(t.onFocusOutside, (c) => c.preventDefault()) });
}, "DialogContentModal")), dl = i.forwardRef(me(function(t, n) {
  const o = we(Tt, t.__scopeDialog), r = i.useRef(false), s = i.useRef(false);
  return b.jsx(Ns, { ...t, ref: n, trapFocus: false, disableOutsidePointerEvents: false, onCloseAutoFocus: (c) => {
    var _a3, _b;
    (_a3 = t.onCloseAutoFocus) == null ? void 0 : _a3.call(t, c), c.defaultPrevented || (r.current || ((_b = o.triggerRef.current) == null ? void 0 : _b.focus()), c.preventDefault()), r.current = false, s.current = false;
  }, onInteractOutside: (c) => {
    var _a3, _b;
    (_a3 = t.onInteractOutside) == null ? void 0 : _a3.call(t, c), c.defaultPrevented || (r.current = true, c.detail.originalEvent.type === "pointerdown" && (s.current = true));
    const a = c.target;
    ((_b = o.triggerRef.current) == null ? void 0 : _b.contains(a)) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && s.current && c.preventDefault();
  } });
}, "DialogContentNonModal")), Ns = i.forwardRef(me(function(t, n) {
  const { __scopeDialog: o, trapFocus: r, onOpenAutoFocus: s, onCloseAutoFocus: c, ...a } = t, l = we(Tt, o);
  return Ct(), b.jsx(b.Fragment, { children: b.jsx(pn, { asChild: true, loop: true, trapped: r, onMountAutoFocus: s, onUnmountAutoFocus: c, children: b.jsx(Dt, { role: "dialog", id: l.contentId, "aria-describedby": l.descriptionPresent ? l.descriptionId : void 0, "aria-labelledby": l.titlePresent ? l.titleId : void 0, "data-state": hn(l.open), ...a, ref: n, deferPointerDownOutside: true, onDismiss: () => l.onOpenChange(false) }) }) });
}, "DialogContentImpl")), fl = "DialogTitle", sv = i.forwardRef(me(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = we(fl, o), { setTitleCount: c } = s;
  return Q(() => (c((a) => a + 1), () => c((a) => a - 1)), [c]), b.jsx(k.h2, { id: s.titleId, ...r, ref: n });
}, "DialogTitle")), pl = "DialogDescription", iv = i.forwardRef(me(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = we(pl, o), { setDescriptionCount: c } = s;
  return Q(() => (c((a) => a + 1), () => c((a) => a - 1)), [c]), b.jsx(k.p, { id: s.descriptionId, ...r, ref: n });
}, "DialogDescription")), ml = "DialogClose", cv = i.forwardRef(me(function(t, n) {
  const { __scopeDialog: o, ...r } = t, s = we(ml, o);
  return b.jsx(k.button, { type: "button", ...r, ref: n, onClick: T(t.onClick, () => s.onOpenChange(false)) });
}, "DialogClose"));
function hn(e) {
  return e ? "open" : "closed";
}
me(hn, "getState");
var vl = Object.defineProperty, hl = (e, t) => vl(e, "name", { value: t, configurable: true });
function Nt(e) {
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
hl(Nt, "useSize");
var gl = Object.defineProperty, je = (e, t) => gl(e, "name", { value: t, configurable: true }), Do = "Checkbox", [bl, av] = J(Do), [Cl, Fo] = bl(Do);
function js(e) {
  const { __scopeCheckbox: t, checked: n, children: o, defaultChecked: r, disabled: s, form: c, name: a, onCheckedChange: l, required: u, value: p = "on", internal_do_not_use_render: d } = e, [f, m] = ie({ prop: n, defaultProp: r ?? false, onChange: l, caller: Do }), [v, h] = i.useState(null), [g, w] = i.useState(null), y = i.useRef(false), [C, x] = i.useReducer((S) => S + 1, 0), P = v ? !!c || !!v.closest("form") : true, R = { checked: f, disabled: s, setChecked: m, control: v, setControl: h, name: a, form: c, value: p, hasConsumerStoppedPropagationRef: y, userInteractionCount: C, onUserInteraction: x, required: u, defaultChecked: Me(r) ? false : r, isFormControl: P, bubbleInput: g, setBubbleInput: w };
  return b.jsx(Cl, { scope: t, ...R, children: Ls(d) ? d(R) : o });
}
je(js, "CheckboxProvider");
var xl = "CheckboxTrigger", wl = i.forwardRef(je(function({ __scopeCheckbox: t, onKeyDown: n, onClick: o, ...r }, s) {
  const { control: c, value: a, disabled: l, checked: u, required: p, setControl: d, setChecked: f, hasConsumerStoppedPropagationRef: m, onUserInteraction: v, isFormControl: h, bubbleInput: g } = Fo(xl, t), w = G(s, d), y = i.useRef(u);
  return i.useEffect(() => {
    const C = c == null ? void 0 : c.form;
    if (C) {
      const x = je(() => f(y.current), "reset");
      return C.addEventListener("reset", x), () => C.removeEventListener("reset", x);
    }
  }, [c, f]), b.jsx(k.button, { type: "button", role: "checkbox", "aria-checked": Me(u) ? "mixed" : u, "aria-required": p, "data-state": ko(u), "data-disabled": l ? "" : void 0, disabled: l, value: a, ...r, ref: w, onKeyDown: T(n, (C) => {
    C.key === "Enter" && C.preventDefault();
  }), onClick: T(o, (C) => {
    v(), f((x) => Me(x) ? true : !x), g && h && (m.current = C.isPropagationStopped(), m.current || C.stopPropagation());
  }) });
}, "CheckboxTrigger")), lv = i.forwardRef(je(function(t, n) {
  const { __scopeCheckbox: o, name: r, checked: s, defaultChecked: c, required: a, disabled: l, value: u, onCheckedChange: p, form: d, ...f } = t;
  return b.jsx(js, { __scopeCheckbox: o, checked: s, defaultChecked: c, disabled: l, required: a, onCheckedChange: p, name: r, form: d, value: u, internal_do_not_use_render: ({ isFormControl: m }) => b.jsxs(b.Fragment, { children: [b.jsx(wl, { ...f, ref: n, __scopeCheckbox: o }), m && b.jsx(Pl, { __scopeCheckbox: o })] }) });
}, "Checkbox")), yl = "CheckboxIndicator", uv = i.forwardRef(je(function(t, n) {
  const { __scopeCheckbox: o, forceMount: r, ...s } = t, c = Fo(yl, o);
  return b.jsx(pe, { present: r || Me(c.checked) || c.checked === true, children: b.jsx(k.span, { "data-state": ko(c.checked), "data-disabled": c.disabled ? "" : void 0, ...s, ref: n, style: { pointerEvents: "none", ...t.style } }) });
}, "CheckboxIndicator")), Rl = "CheckboxBubbleInput", Pl = i.forwardRef(je(function({ __scopeCheckbox: t, onClick: n, ...o }, r) {
  const { control: s, hasConsumerStoppedPropagationRef: c, userInteractionCount: a, checked: l, defaultChecked: u, required: p, disabled: d, name: f, value: m, form: v, bubbleInput: h, setBubbleInput: g } = Fo(Rl, t), w = G(r, g), y = Nt(s), C = i.useRef(false), x = i.useRef(l), P = i.useRef(a);
  i.useEffect(() => {
    const S = h;
    if (!S) return;
    const _ = window.HTMLInputElement.prototype, O = Object.getOwnPropertyDescriptor(_, "checked").set, E = a !== P.current;
    P.current = a;
    const I = x.current !== l;
    x.current = l;
    const M = !(E && c.current);
    if (I && O) {
      C.current = !E;
      const D = new Event("click", { bubbles: M });
      S.indeterminate = Me(l), O.call(S, Me(l) ? false : l), S.dispatchEvent(D), C.current = false;
    }
  }, [h, l, c, a]);
  const R = i.useRef(Me(l) ? false : l);
  return b.jsx(k.input, { type: "checkbox", "aria-hidden": true, defaultChecked: u ?? R.current, required: p, disabled: d, name: f, value: m, form: v, ...o, tabIndex: -1, ref: w, onClick: T(n, (S) => {
    C.current && S.stopPropagation();
  }), style: { ...o.style, ...y, position: "absolute", pointerEvents: "none", opacity: 0, margin: 0, transform: "translateX(-100%)" } });
}, "CheckboxBubbleInput"));
function Ls(e) {
  return typeof e == "function";
}
je(Ls, "isFunction");
function Me(e) {
  return e === "indeterminate";
}
je(Me, "isIndeterminate");
function ko(e) {
  return Me(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
je(ko, "getState");
const Sl = ["top", "right", "bottom", "left"], He = Math.min, Oe = Math.max, cn = Math.round, Zt = Math.floor, $e = (e) => ({ x: e, y: e }), El = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Vs(e, t, n) {
  return Oe(e, He(t, n));
}
function Le(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function We(e) {
  return e.split("-")[0];
}
function xt(e) {
  return e.split("-")[1];
}
function No(e) {
  return e === "x" ? "y" : "x";
}
function jo(e) {
  return e === "y" ? "height" : "width";
}
function Re(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function Lo(e) {
  return No(Re(e));
}
function Il(e, t, n) {
  n === void 0 && (n = false);
  const o = xt(e), r = Lo(e), s = jo(r);
  let c = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (c = an(c)), [c, an(c)];
}
function Tl(e) {
  const t = an(e);
  return [fo(e), t, fo(t)];
}
function fo(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const Ar = ["left", "right"], Mr = ["right", "left"], _l = ["top", "bottom"], Al = ["bottom", "top"];
function Ml(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Mr : Ar : t ? Ar : Mr;
    case "left":
    case "right":
      return t ? _l : Al;
    default:
      return [];
  }
}
function Ol(e, t, n, o) {
  const r = xt(e);
  let s = Ml(We(e), n === "start", o);
  return r && (s = s.map((c) => c + "-" + r), t && (s = s.concat(s.map(fo)))), s;
}
function an(e) {
  const t = We(e);
  return El[t] + e.slice(t.length);
}
function $l(e) {
  var t, n, o, r;
  return { top: (t = e.top) != null ? t : 0, right: (n = e.right) != null ? n : 0, bottom: (o = e.bottom) != null ? o : 0, left: (r = e.left) != null ? r : 0 };
}
function Gs(e) {
  return typeof e != "number" ? $l(e) : { top: e, right: e, bottom: e, left: e };
}
function ln(e) {
  const { x: t, y: n, width: o, height: r } = e;
  return { width: o, height: r, top: n, left: t, right: t + o, bottom: n + r, x: t, y: n };
}
function Or(e, t, n) {
  let { reference: o, floating: r } = e;
  const s = Re(t), c = Lo(t), a = jo(c), l = We(t), u = s === "y", p = o.x + o.width / 2 - r.width / 2, d = o.y + o.height / 2 - r.height / 2, f = o[a] / 2 - r[a] / 2;
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
  const v = xt(t);
  return v && (m[c] += f * (v === "end" ? 1 : -1) * (n && u ? -1 : 1)), m;
}
async function Dl(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: o, y: r, platform: s, rects: c, elements: a, strategy: l } = e, { boundary: u = "clippingAncestors", rootBoundary: p = "viewport", elementContext: d = "floating", altBoundary: f = false, padding: m = 0 } = Le(t, e), v = Gs(m), g = a[f ? d === "floating" ? "reference" : "floating" : d], w = ln(await s.getClippingRect({ element: (n = await (s.isElement == null ? void 0 : s.isElement(g))) == null || n ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)), boundary: u, rootBoundary: p, strategy: l })), y = d === "floating" ? { x: o, y: r, width: c.floating.width, height: c.floating.height } : c.reference, C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), x = await (s.isElement == null ? void 0 : s.isElement(C)) && await (s.getScale == null ? void 0 : s.getScale(C)) || { x: 1, y: 1 }, P = ln(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({ elements: a, rect: y, offsetParent: C, strategy: l }) : y);
  return { top: (w.top - P.top + v.top) / x.y, bottom: (P.bottom - w.bottom + v.bottom) / x.y, left: (w.left - P.left + v.left) / x.x, right: (P.right - w.right + v.right) / x.x };
}
const Fl = 50, kl = async (e, t, n) => {
  const { placement: o = "bottom", strategy: r = "absolute", middleware: s = [], platform: c } = n, a = c.detectOverflow ? c : { ...c, detectOverflow: Dl }, l = await (c.isRTL == null ? void 0 : c.isRTL(t));
  let u = await c.getElementRects({ reference: e, floating: t, strategy: r }), { x: p, y: d } = Or(u, o, l), f = o, m = 0;
  const v = {};
  for (let h = 0; h < s.length; h++) {
    const g = s[h];
    if (!g) continue;
    const { name: w, fn: y } = g, { x: C, y: x, data: P, reset: R } = await y({ x: p, y: d, initialPlacement: o, placement: f, strategy: r, middlewareData: v, rects: u, platform: a, elements: { reference: e, floating: t } });
    p = C ?? p, d = x ?? d, v[w] = { ...v[w], ...P }, R && m < Fl && (m++, typeof R == "object" && (R.placement && (f = R.placement), R.rects && (u = R.rects === true ? await c.getElementRects({ reference: e, floating: t, strategy: r }) : R.rects), { x: p, y: d } = Or(u, f, l)), h = -1);
  }
  return { x: p, y: d, placement: f, strategy: r, middlewareData: v };
}, Nl = (e) => ({ name: "arrow", options: e, async fn(t) {
  const { x: n, y: o, placement: r, rects: s, platform: c, elements: a, middlewareData: l } = t, { element: u, padding: p = 0 } = Le(e, t) || {};
  if (u == null) return {};
  const d = Gs(p), f = { x: n, y: o }, m = Lo(r), v = jo(m), h = await c.getDimensions(u), g = m === "y", w = g ? "top" : "left", y = g ? "bottom" : "right", C = g ? "clientHeight" : "clientWidth", x = s.reference[v] + s.reference[m] - f[m] - s.floating[v], P = f[m] - s.reference[m], R = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(u));
  let S = R ? R[C] : 0;
  (!S || !await (c.isElement == null ? void 0 : c.isElement(R))) && (S = a.floating[C] || s.floating[v]);
  const _ = x / 2 - P / 2, A = S / 2 - h[v] / 2 - 1, O = He(d[w], A), E = He(d[y], A), I = S - h[v] - E, M = S / 2 - h[v] / 2 + _, D = Vs(O, M, I), V = !l.arrow && xt(r) != null && M !== D && s.reference[v] / 2 - (M < O ? O : E) - h[v] / 2 < 0, N = V ? M < O ? M - O : M - I : 0;
  return { [m]: f[m] + N, data: { [m]: D, centerOffset: M - D - N, ...V && { alignmentOffset: N } }, reset: V };
} }), jl = function(e) {
  return e === void 0 && (e = {}), { name: "flip", options: e, async fn(t) {
    var n, o;
    const { placement: r, middlewareData: s, rects: c, initialPlacement: a, platform: l, elements: u } = t, { mainAxis: p = true, crossAxis: d = true, fallbackPlacements: f, fallbackStrategy: m = "bestFit", fallbackAxisSideDirection: v = "none", flipAlignment: h = true, ...g } = Le(e, t);
    if ((n = s.arrow) != null && n.alignmentOffset) return {};
    const w = We(r), y = Re(a), C = We(a) === a, x = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), P = f || (C || !h ? [an(a)] : Tl(a)), R = v !== "none";
    !f && R && P.push(...Ol(a, h, v, x));
    const S = [a, ...P], _ = await l.detectOverflow(t, g), A = [];
    let O = ((o = s.flip) == null ? void 0 : o.overflows) || [];
    if (p && A.push(_[w]), d) {
      const D = Il(r, c, x);
      A.push(_[D[0]], _[D[1]]);
    }
    if (O = [...O, { placement: r, overflows: A }], !A.every((D) => D <= 0)) {
      var E, I;
      const D = (((E = s.flip) == null ? void 0 : E.index) || 0) + 1, V = S[D];
      if (V && (!(d === "alignment" ? y !== Re(V) : false) || O.every((L) => Re(L.placement) === y ? L.overflows[0] > 0 : true))) return { data: { index: D, overflows: O }, reset: { placement: V } };
      let N = (I = O.filter((j) => j.overflows[0] <= 0).sort((j, L) => j.overflows[1] - L.overflows[1])[0]) == null ? void 0 : I.placement;
      if (!N) switch (m) {
        case "bestFit": {
          var M;
          const j = (M = O.filter((L) => {
            if (R) {
              const B = Re(L.placement);
              return B === y || B === "y";
            }
            return true;
          }).map((L) => [L.placement, L.overflows.filter((B) => B > 0).reduce((B, $) => B + $, 0)]).sort((L, B) => L[1] - B[1])[0]) == null ? void 0 : M[0];
          j && (N = j);
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
function Dr(e) {
  return Sl.some((t) => e[t] >= 0);
}
const Ll = function(e) {
  return e === void 0 && (e = {}), { name: "hide", options: e, async fn(t) {
    const { rects: n, platform: o } = t, { strategy: r = "referenceHidden", ...s } = Le(e, t);
    switch (r) {
      case "referenceHidden": {
        const c = await o.detectOverflow(t, { ...s, elementContext: "reference" }), a = $r(c, n.reference);
        return { data: { referenceHiddenOffsets: a, referenceHidden: Dr(a) } };
      }
      case "escaped": {
        const c = await o.detectOverflow(t, { ...s, altBoundary: true }), a = $r(c, n.floating);
        return { data: { escapedOffsets: a, escaped: Dr(a) } };
      }
      default:
        return {};
    }
  } };
}, Bs = /* @__PURE__ */ new Set(["left", "top"]);
async function Vl(e, t) {
  const { placement: n, platform: o, elements: r } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), c = We(n), a = xt(n), l = Re(n) === "y", u = Bs.has(c) ? -1 : 1, p = s && l ? -1 : 1, d = Le(t, e);
  let { mainAxis: f, crossAxis: m, alignmentAxis: v } = typeof d == "number" ? { mainAxis: d, crossAxis: 0, alignmentAxis: null } : { mainAxis: d.mainAxis || 0, crossAxis: d.crossAxis || 0, alignmentAxis: d.alignmentAxis };
  return a && typeof v == "number" && (m = a === "end" ? v * -1 : v), l ? { x: m * p, y: f * u } : { x: f * u, y: m * p };
}
const Gl = function(e) {
  return e === void 0 && (e = 0), { name: "offset", options: e, async fn(t) {
    var n, o;
    const { x: r, y: s, placement: c, middlewareData: a } = t, l = await Vl(t, e);
    return c === ((n = a.offset) == null ? void 0 : n.placement) && (o = a.arrow) != null && o.alignmentOffset ? {} : { x: r + l.x, y: s + l.y, data: { ...l, placement: c } };
  } };
}, Bl = function(e) {
  return e === void 0 && (e = {}), { name: "shift", options: e, async fn(t) {
    const { x: n, y: o, placement: r, platform: s } = t, { mainAxis: c = true, crossAxis: a = false, limiter: l = { fn: (y) => {
      let { x: C, y: x } = y;
      return { x: C, y: x };
    } }, ...u } = Le(e, t), p = { x: n, y: o }, d = await s.detectOverflow(t, u), f = Re(r), m = No(f);
    let v = p[m], h = p[f];
    const g = (y, C) => Vs(C + d[y === "y" ? "top" : "left"], C, C - d[y === "y" ? "bottom" : "right"]);
    c && (v = g(m, v)), a && (h = g(f, h));
    const w = l.fn({ ...t, [m]: v, [f]: h });
    return { ...w, data: { x: w.x - n, y: w.y - o, enabled: { [m]: c, [f]: a } } };
  } };
}, Ul = function(e) {
  return e === void 0 && (e = {}), { options: e, fn(t) {
    var n, o;
    const { x: r, y: s, placement: c, rects: a, middlewareData: l } = t, { offset: u = 0, mainAxis: p = true, crossAxis: d = true } = Le(e, t), f = { x: r, y: s }, m = Re(c), v = No(m);
    let h = f[v], g = f[m];
    const w = Le(u, t), y = typeof w == "number" ? { mainAxis: w, crossAxis: 0 } : { mainAxis: (n = w.mainAxis) != null ? n : 0, crossAxis: (o = w.crossAxis) != null ? o : 0 };
    if (p) {
      const P = v === "y" ? "height" : "width", R = a.reference[v] - a.floating[P] + y.mainAxis, S = a.reference[v] + a.reference[P] - y.mainAxis;
      h < R ? h = R : h > S && (h = S);
    }
    if (d) {
      var C, x;
      const P = v === "y" ? "width" : "height", R = Bs.has(We(c)), S = a.reference[m] - a.floating[P] + (R && ((C = l.offset) == null ? void 0 : C[m]) || 0) + (R ? 0 : y.crossAxis), _ = a.reference[m] + a.reference[P] + (R ? 0 : ((x = l.offset) == null ? void 0 : x[m]) || 0) - (R ? y.crossAxis : 0);
      g < S ? g = S : g > _ && (g = _);
    }
    return { [v]: h, [m]: g };
  } };
}, Hl = function(e) {
  return e === void 0 && (e = {}), { name: "size", options: e, async fn(t) {
    const { placement: n, rects: o, platform: r, elements: s } = t, { apply: c = () => {
    }, ...a } = Le(e, t), l = await r.detectOverflow(t, a), u = We(n), p = xt(n), d = Re(n) === "y", { width: f, height: m } = o.floating;
    let v, h;
    u === "top" || u === "bottom" ? (v = u, h = p === (await (r.isRTL == null ? void 0 : r.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (h = u, v = p === "end" ? "top" : "bottom");
    const g = m - l.top - l.bottom, w = f - l.left - l.right, y = He(m - l[v], g), C = He(f - l[h], w), x = t.middlewareData.shift, P = !x;
    let R = y, S = C;
    x != null && x.enabled.x && (S = w), x != null && x.enabled.y && (R = g), P && !p && (d ? S = f - 2 * Oe(l.left, l.right) : R = m - 2 * Oe(l.top, l.bottom)), await c({ ...t, availableWidth: S, availableHeight: R });
    const _ = await r.getDimensions(s.floating);
    return f !== _.width || m !== _.height ? { reset: { rects: true } } : {};
  } };
};
function gn() {
  return typeof window < "u";
}
function wt(e) {
  return Us(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ue(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ve(e) {
  var t;
  return (t = (Us(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Us(e) {
  return gn() ? e instanceof Node || e instanceof ue(e).Node : false;
}
function Se(e) {
  return gn() ? e instanceof Element || e instanceof ue(e).Element : false;
}
function Ye(e) {
  return gn() ? e instanceof HTMLElement || e instanceof ue(e).HTMLElement : false;
}
function Fr(e) {
  return !gn() || typeof ShadowRoot > "u" ? false : e instanceof ShadowRoot || e instanceof ue(e).ShadowRoot;
}
function bn(e) {
  const { overflow: t, overflowX: n, overflowY: o, display: r } = Ee(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && r !== "inline" && r !== "contents";
}
function Wl(e) {
  return /^(table|td|th)$/.test(wt(e));
}
function Cn(e) {
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
const Kl = /transform|translate|scale|rotate|perspective|filter/, zl = /paint|layout|strict|content/, Qe = (e) => !!e && e !== "none";
let zn;
function Vo(e) {
  const t = Se(e) ? Ee(e) : e;
  return Qe(t.transform) || Qe(t.translate) || Qe(t.scale) || Qe(t.rotate) || Qe(t.perspective) || !Go() && (Qe(t.backdropFilter) || Qe(t.filter)) || Kl.test(t.willChange || "") || zl.test(t.contain || "");
}
function Yl(e) {
  let t = Je(e);
  for (; Ye(t) && !_t(t); ) {
    if (Vo(t)) return t;
    if (Cn(t)) return null;
    t = Je(t);
  }
  return null;
}
function Go() {
  return zn == null && (zn = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), zn;
}
function _t(e) {
  return /^(html|body|#document)$/.test(wt(e));
}
function Ee(e) {
  return ue(e).getComputedStyle(e);
}
function xn(e) {
  return Se(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Je(e) {
  if (wt(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || Fr(e) && e.host || Ve(e);
  return Fr(t) ? t.host : t;
}
function Hs(e) {
  const t = Je(e);
  return _t(t) ? (e.ownerDocument || e).body : Ye(t) && bn(t) ? t : Hs(t);
}
function At(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = true);
  const r = Hs(e), s = r === ((o = e.ownerDocument) == null ? void 0 : o.body), c = ue(r);
  if (s) {
    const a = po(c);
    return t.concat(c, c.visualViewport || [], bn(r) ? r : [], a && n ? At(a) : []);
  } else return t.concat(r, At(r, [], n));
}
function po(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Ws(e) {
  const t = Ee(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = Ye(e), s = r ? e.offsetWidth : n, c = r ? e.offsetHeight : o, a = cn(n) !== s || cn(o) !== c;
  return a && (n = s, o = c), { width: n, height: o, $: a };
}
function Bo(e) {
  return Se(e) ? e : e.contextElement;
}
function mt(e) {
  const t = Bo(e);
  if (!Ye(t)) return $e(1);
  const n = t.getBoundingClientRect(), { width: o, height: r, $: s } = Ws(t);
  let c = (s ? cn(n.width) : n.width) / o, a = (s ? cn(n.height) : n.height) / r;
  return (!c || !Number.isFinite(c)) && (c = 1), (!a || !Number.isFinite(a)) && (a = 1), { x: c, y: a };
}
const Xl = $e(0);
function Ks(e) {
  const t = ue(e);
  return !Go() || !t.visualViewport ? Xl : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function ql(e, t, n) {
  return t === void 0 && (t = false), !!n && t && n === ue(e);
}
function et(e, t, n, o) {
  t === void 0 && (t = false), n === void 0 && (n = false);
  const r = e.getBoundingClientRect(), s = Bo(e);
  let c = $e(1);
  t && (o ? Se(o) && (c = mt(o)) : c = mt(e));
  const a = ql(s, n, o) ? Ks(s) : $e(0);
  let l = (r.left + a.x) / c.x, u = (r.top + a.y) / c.y, p = r.width / c.x, d = r.height / c.y;
  if (s && o) {
    const f = ue(s), m = Se(o) ? ue(o) : o;
    let v = f, h = po(v);
    for (; h && m !== v; ) {
      const g = mt(h), w = h.getBoundingClientRect(), y = Ee(h), C = w.left + (h.clientLeft + parseFloat(y.paddingLeft)) * g.x, x = w.top + (h.clientTop + parseFloat(y.paddingTop)) * g.y;
      l *= g.x, u *= g.y, p *= g.x, d *= g.y, l += C, u += x, v = ue(h), h = po(v);
    }
  }
  return ln({ width: p, height: d, x: l, y: u });
}
function wn(e, t) {
  const n = xn(e).scrollLeft;
  return t ? t.left + n : et(Ve(e)).left + n;
}
function zs(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - wn(e, n), r = n.top + t.scrollTop;
  return { x: o, y: r };
}
function Zl(e) {
  let { elements: t, rect: n, offsetParent: o, strategy: r } = e;
  const s = r === "fixed", c = Ve(o), a = t ? Cn(t.floating) : false;
  if (o === c || a && s) return n;
  let l = { scrollLeft: 0, scrollTop: 0 }, u = $e(1);
  const p = $e(0), d = Ye(o);
  if ((d || !s) && ((wt(o) !== "body" || bn(c)) && (l = xn(o)), d)) {
    const m = et(o);
    u = mt(o), p.x = m.x + o.clientLeft, p.y = m.y + o.clientTop;
  }
  const f = c && !d && !s ? zs(c, l) : $e(0);
  return { width: n.width * u.x, height: n.height * u.y, x: n.x * u.x - l.scrollLeft * u.x + p.x + f.x, y: n.y * u.y - l.scrollTop * u.y + p.y + f.y };
}
function Ql(e) {
  return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Jl(e) {
  const t = xn(e), n = e.ownerDocument.body, o = Oe(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), r = Oe(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
  let s = -t.scrollLeft + wn(e);
  const c = -t.scrollTop;
  return Ee(n).direction === "rtl" && (s += Oe(e.clientWidth, n.clientWidth) - o), { width: o, height: r, x: s, y: c };
}
const eu = 25;
function tu(e, t, n) {
  n === void 0 && (n = "viewport");
  const o = n === "layoutViewport", r = ue(e), s = Ve(e), c = r.visualViewport;
  let a = s.clientWidth, l = s.clientHeight, u = 0, p = 0;
  if (c) {
    const f = !Go() || t === "fixed";
    o ? f || (u = -c.offsetLeft, p = -c.offsetTop) : (a = c.width, l = c.height, f && (u = c.offsetLeft, p = c.offsetTop));
  }
  if (wn(s) <= 0) {
    const f = s.ownerDocument, m = f.body, v = getComputedStyle(m), h = f.compatMode === "CSS1Compat" && parseFloat(v.marginLeft) + parseFloat(v.marginRight) || 0, g = Math.abs(s.clientWidth - m.clientWidth - h), w = getComputedStyle(s).scrollbarGutter === "stable both-edges" ? g / 2 : g;
    w <= eu && (a -= w);
  }
  return { width: a, height: l, x: u, y: p };
}
function nu(e, t) {
  const n = et(e, true, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, s = mt(e), c = e.clientWidth * s.x, a = e.clientHeight * s.y, l = r * s.x, u = o * s.y;
  return { width: c, height: a, x: l, y: u };
}
function kr(e, t, n) {
  let o;
  if (t === "viewport" || t === "layoutViewport") o = tu(e, n, t);
  else if (t === "document") o = Jl(Ve(e));
  else if (Se(t)) o = nu(t, n);
  else {
    const r = Ks(e);
    o = { x: t.x - r.x, y: t.y - r.y, width: t.width, height: t.height };
  }
  return ln(o);
}
function ou(e, t) {
  const n = t.get(e);
  if (n) return n;
  let o = At(e, [], false).filter((a) => Se(a) && wt(a) !== "body"), r = null;
  const s = Ee(e).position === "fixed";
  let c = s ? Je(e) : e;
  for (; Se(c) && !_t(c); ) {
    const a = Ee(c), l = Vo(c), u = r ? r.position : s ? "fixed" : "";
    !l && (u === "fixed" || u === "absolute" && a.position === "static") ? o = o.filter((d) => d !== c) : r = a, c = Je(c);
  }
  return t.set(e, o), o;
}
function ru(e) {
  let { element: t, boundary: n, rootBoundary: o, strategy: r } = e;
  const c = [...n === "clippingAncestors" ? Cn(t) ? [] : ou(t, this._c) : [].concat(n), o], a = kr(t, c[0], r);
  let l = a.top, u = a.right, p = a.bottom, d = a.left;
  for (let f = 1; f < c.length; f++) {
    const m = kr(t, c[f], r);
    l = Oe(m.top, l), u = He(m.right, u), p = He(m.bottom, p), d = Oe(m.left, d);
  }
  return { width: u - d, height: p - l, x: d, y: l };
}
function su(e) {
  const { width: t, height: n } = Ws(e);
  return { width: t, height: n };
}
function iu(e, t, n) {
  const o = Ye(t), r = Ve(t), s = n === "fixed", c = et(e, true, s, t);
  let a = { scrollLeft: 0, scrollTop: 0 };
  const l = $e(0);
  if ((o || !s) && ((wt(t) !== "body" || bn(r)) && (a = xn(t)), o)) {
    const f = et(t, true, s, t);
    l.x = f.x + t.clientLeft, l.y = f.y + t.clientTop;
  }
  !o && r && (l.x = wn(r));
  const u = r && !o && !s ? zs(r, a) : $e(0), p = c.left + a.scrollLeft - l.x - u.x, d = c.top + a.scrollTop - l.y - u.y;
  return { x: p, y: d, width: c.width, height: c.height };
}
function Yn(e) {
  return Ee(e).position === "static";
}
function Nr(e, t) {
  if (!Ye(e) || Ee(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return Ve(e) === n && (n = n.ownerDocument.body), n;
}
function Ys(e, t) {
  const n = ue(e);
  if (Cn(e)) return n;
  if (!Ye(e)) {
    let r = Je(e);
    for (; r && !_t(r); ) {
      if (Se(r) && !Yn(r)) return r;
      r = Je(r);
    }
    return n;
  }
  let o = Nr(e, t);
  for (; o && Wl(o) && Yn(o); ) o = Nr(o, t);
  return o && _t(o) && Yn(o) && !Vo(o) ? n : o || Yl(e) || n;
}
const cu = async function(e) {
  const t = this.getOffsetParent || Ys, n = this.getDimensions, o = await n(e.floating);
  return { reference: iu(e.reference, await t(e.floating), e.strategy), floating: { x: 0, y: 0, width: o.width, height: o.height } };
};
function au(e) {
  return Ee(e).direction === "rtl";
}
const lu = { convertOffsetParentRelativeRectToViewportRelativeRect: Zl, getDocumentElement: Ve, getClippingRect: ru, getOffsetParent: Ys, getElementRects: cu, getClientRects: Ql, getDimensions: su, getScale: mt, isElement: Se, isRTL: au };
function Xs(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function uu(e, t, n) {
  let o = null, r;
  const s = Ve(e);
  function c() {
    var p;
    clearTimeout(r), (p = o) == null || p.disconnect(), o = null;
  }
  function a(p, d) {
    p === void 0 && (p = false), d === void 0 && (d = 1), c();
    const f = e.getBoundingClientRect(), { left: m, top: v, width: h, height: g } = f;
    if (p || t(), !h || !g) return;
    const w = Zt(v), y = Zt(s.clientWidth - (m + h)), C = Zt(s.clientHeight - (v + g)), x = Zt(m), R = { rootMargin: -w + "px " + -y + "px " + -C + "px " + -x + "px", threshold: Oe(0, He(1, d)) || 1 };
    let S = true;
    function _(A) {
      const O = A[0].intersectionRatio;
      if (!Xs(f, e.getBoundingClientRect())) return a();
      if (O !== d) {
        if (!S) return a();
        O ? a(false, O) : r = setTimeout(() => {
          a(false, 1e-7);
        }, 1e3);
      }
      S = false;
    }
    try {
      o = new IntersectionObserver(_, { ...R, root: s.ownerDocument });
    } catch {
      o = new IntersectionObserver(_, R);
    }
    o.observe(e);
  }
  const l = ue(e), u = () => a(n);
  return l.addEventListener("resize", u), a(true), () => {
    l.removeEventListener("resize", u), c();
  };
}
function du(e, t, n, o) {
  o === void 0 && (o = {});
  const { ancestorScroll: r = true, ancestorResize: s = true, elementResize: c = typeof ResizeObserver == "function", layoutShift: a = typeof IntersectionObserver == "function", animationFrame: l = false } = o, u = Bo(e), p = r || s ? [...u ? At(u) : [], ...t ? At(t) : []] : [];
  p.forEach((w) => {
    r && w.addEventListener("scroll", n), s && w.addEventListener("resize", n);
  });
  const d = u && a ? uu(u, n, s) : null;
  let f = -1, m = null;
  c && (m = new ResizeObserver((w) => {
    let [y] = w;
    y && y.target === u && m && t && (m.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var C;
      (C = m) == null || C.observe(t);
    })), n();
  }), u && !l && m.observe(u), t && m.observe(t));
  let v, h = l ? et(e) : null;
  l && g();
  function g() {
    const w = et(e);
    h && !Xs(h, w) && n(), h = w, v = requestAnimationFrame(g);
  }
  return n(), () => {
    var w;
    p.forEach((y) => {
      r && y.removeEventListener("scroll", n), s && y.removeEventListener("resize", n);
    }), d == null ? void 0 : d(), (w = m) == null || w.disconnect(), m = null, l && cancelAnimationFrame(v);
  };
}
const fu = Gl, pu = Bl, mu = jl, vu = Hl, hu = Ll, jr = Nl, gu = Ul, bu = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = n ?? {}, s = { ...lu, ...r.platform, _c: o };
  return kl(e, t, { ...r, platform: s });
};
var Cu = typeof document < "u", xu = function() {
}, rn = Cu ? i.useLayoutEffect : xu;
function un(e, t) {
  if (e === t) return true;
  if (typeof e != typeof t) return false;
  if (typeof e == "function" && e.toString() === t.toString()) return true;
  let n, o, r;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return false;
      for (o = n; o-- !== 0; ) if (!un(e[o], t[o])) return false;
      return true;
    }
    if (r = Object.keys(e), n = r.length, n !== Object.keys(t).length) return false;
    for (o = n; o-- !== 0; ) if (!{}.hasOwnProperty.call(t, r[o])) return false;
    for (o = n; o-- !== 0; ) {
      const s = r[o];
      if (!(s === "_owner" && e.$$typeof) && !un(e[s], t[s])) return false;
    }
    return true;
  }
  return e !== e && t !== t;
}
function qs(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Lr(e, t) {
  const n = qs(e);
  return Math.round(t * n) / n;
}
function Xn(e) {
  const t = i.useRef(e);
  return rn(() => {
    t.current = e;
  }), t;
}
function wu(e) {
  e === void 0 && (e = {});
  const { placement: t = "bottom", strategy: n = "absolute", middleware: o = [], platform: r, elements: { reference: s, floating: c } = {}, transform: a = true, whileElementsMounted: l, open: u } = e, [p, d] = i.useState({ x: 0, y: 0, strategy: n, placement: t, middlewareData: {}, isPositioned: false }), [f, m] = i.useState(o);
  un(f, o) || m(o);
  const [v, h] = i.useState(null), [g, w] = i.useState(null), y = i.useCallback((L) => {
    L !== R.current && (R.current = L, h(L));
  }, []), C = i.useCallback((L) => {
    L !== S.current && (S.current = L, w(L));
  }, []), x = s || v, P = c || g, R = i.useRef(null), S = i.useRef(null), _ = i.useRef(p), A = l != null, O = Xn(l), E = Xn(r), I = Xn(u), M = i.useCallback(() => {
    if (!R.current || !S.current) return;
    const L = { placement: t, strategy: n, middleware: f };
    E.current && (L.platform = E.current), bu(R.current, S.current, L).then((B) => {
      const $ = { ...B, isPositioned: I.current !== false };
      D.current && !un(_.current, $) && (_.current = $, gt.flushSync(() => {
        d($);
      }));
    });
  }, [f, t, n, E, I]);
  rn(() => {
    u === false && _.current.isPositioned && (_.current.isPositioned = false, d((L) => ({ ...L, isPositioned: false })));
  }, [u]);
  const D = i.useRef(false);
  rn(() => (D.current = true, () => {
    D.current = false;
  }), []), rn(() => {
    if (x && (R.current = x), P && (S.current = P), x && P) {
      if (O.current) return O.current(x, P, M);
      M();
    }
  }, [x, P, M, O, A]);
  const V = i.useMemo(() => ({ reference: R, floating: S, setReference: y, setFloating: C }), [y, C]), N = i.useMemo(() => ({ reference: x, floating: P }), [x, P]), j = i.useMemo(() => {
    const L = { position: n, left: 0, top: 0 };
    if (!N.floating) return L;
    const B = Lr(N.floating, p.x), $ = Lr(N.floating, p.y);
    return a ? { ...L, transform: "translate(" + B + "px, " + $ + "px)", ...qs(N.floating) >= 1.5 && { willChange: "transform" } } : { position: n, left: B, top: $ };
  }, [n, a, N.floating, p.x, p.y]);
  return i.useMemo(() => ({ ...p, update: M, refs: V, elements: N, floatingStyles: j }), [p, M, V, N, j]);
}
const yu = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return { name: "arrow", options: e, fn(n) {
    const { element: o, padding: r } = typeof e == "function" ? e(n) : e;
    return o && t(o) ? o.current != null ? jr({ element: o.current, padding: r }).fn(n) : {} : o ? jr({ element: o, padding: r }).fn(n) : {};
  } };
}, Ru = (e, t) => {
  const n = fu(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, Pu = (e, t) => {
  const n = pu(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, Su = (e, t) => ({ fn: gu(e).fn, options: [e, t] }), Eu = (e, t) => {
  const n = mu(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, Iu = (e, t) => {
  const n = vu(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, Tu = (e, t) => {
  const n = hu(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
}, _u = (e, t) => {
  const n = yu(e);
  return { name: n.name, fn: n.fn, options: [e, t] };
};
var Au = Object.defineProperty, Mu = (e, t) => Au(e, "name", { value: t, configurable: true }), Ou = i.forwardRef(Mu(function(t, n) {
  const { children: o, width: r = 10, height: s = 5, ...c } = t;
  return b.jsx(k.svg, { ...c, ref: n, width: r, height: s, viewBox: "0 0 30 10", preserveAspectRatio: "none", children: t.asChild ? o : b.jsx("polygon", { points: "0,0 30,0 15,10" }) });
}, "Arrow")), $u = Ou, Du = Object.defineProperty, De = (e, t) => Du(e, "name", { value: t, configurable: true }), Zs = "Popper", [Qs, Xe] = J(Zs), [Fu, Js] = Qs(Zs), ku = De((e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = i.useState(null), [s, c] = i.useState(void 0);
  return b.jsx(Fu, { scope: t, anchor: o, onAnchorChange: r, placementState: s, setPlacementState: c, children: n });
}, "Popper"), Nu = "PopperAnchor", ju = i.forwardRef(De(function(t, n) {
  const { __scopePopper: o, virtualRef: r, ...s } = t, c = Js(Nu, o), a = i.useRef(null), l = c.onAnchorChange, u = i.useCallback((h) => {
    a.current = h, h && l(h);
  }, [l]), p = G(n, u), d = i.useRef(null);
  i.useEffect(() => {
    if (!r) return;
    const h = d.current;
    d.current = r.current, h !== d.current && l(d.current);
  });
  const f = c.placementState && yn(c.placementState), m = f == null ? void 0 : f[0], v = f == null ? void 0 : f[1];
  return r ? null : b.jsx(k.div, { "data-radix-popper-side": m, "data-radix-popper-align": v, ...s, ref: p });
}, "PopperAnchor")), ei = "PopperContent", [Lu, Vu] = Qs(ei), Gu = i.forwardRef(De(function(t, n) {
  var _a3, _b, _c2, _d2, _e2, _f2, _g;
  const { __scopePopper: o, side: r = "bottom", sideOffset: s = 0, align: c = "center", alignOffset: a = 0, arrowPadding: l = 0, avoidCollisions: u = true, collisionBoundary: p = [], collisionPadding: d = 0, sticky: f = "partial", hideWhenDetached: m = false, updatePositionStrategy: v = "optimized", onPlaced: h, ...g } = t, w = Js(ei, o), [y, C] = i.useState(null), x = G(n, C), [P, R] = i.useState(null), S = Nt(P), _ = (S == null ? void 0 : S.width) ?? 0, A = (S == null ? void 0 : S.height) ?? 0, O = r + (c !== "center" ? "-" + c : ""), E = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, I = Array.isArray(p) ? p : [p], M = I.length > 0, D = { padding: E, boundary: I.filter(ti), altBoundary: M }, { refs: V, floatingStyles: N, placement: j, isPositioned: L, middlewareData: B } = wu({ strategy: "fixed", placement: O, whileElementsMounted: De((...W) => du(...W, { animationFrame: v === "always" }), "whileElementsMounted"), elements: { reference: w.anchor }, middleware: [Ru({ mainAxis: s + A, alignmentAxis: a }), u && Pu({ mainAxis: true, crossAxis: false, limiter: f === "partial" ? Su() : void 0, ...D }), u && Eu({ ...D }), Iu({ ...D, apply: De(({ elements: W, rects: re, availableWidth: z, availableHeight: Y }) => {
    const { width: q, height: _e3 } = re.reference, he = W.floating.style;
    he.setProperty("--radix-popper-available-width", `${z}px`), he.setProperty("--radix-popper-available-height", `${Y}px`), he.setProperty("--radix-popper-anchor-width", `${q}px`), he.setProperty("--radix-popper-anchor-height", `${_e3}px`);
  }, "apply") }), P && _u({ element: P, padding: l }), Wu({ arrowWidth: _, arrowHeight: A }), m && Tu({ strategy: "referenceHidden", ...D, boundary: M ? D.boundary : void 0 })] }), $ = w.setPlacementState;
  Q(() => ($(j), () => {
    $(void 0);
  }), [j, $]);
  const [ee, H] = yn(j), X = be(h);
  Q(() => {
    L && (X == null ? void 0 : X());
  }, [L, X]);
  const le = (_a3 = B.arrow) == null ? void 0 : _a3.x, ve = (_b = B.arrow) == null ? void 0 : _b.y, Te = ((_c2 = B.arrow) == null ? void 0 : _c2.centerOffset) !== 0, [de, F] = i.useState();
  return Q(() => {
    y && F(window.getComputedStyle(y).zIndex);
  }, [y]), b.jsx("div", { ref: V.setFloating, "data-radix-popper-content-wrapper": "", style: { ...N, transform: L ? N.transform : "translate(0, -200%)", minWidth: "max-content", zIndex: de, "--radix-popper-transform-origin": [(_d2 = B.transformOrigin) == null ? void 0 : _d2.x, (_e2 = B.transformOrigin) == null ? void 0 : _e2.y].join(" "), ...((_f2 = B.hide) == null ? void 0 : _f2.referenceHidden) && { visibility: "hidden", pointerEvents: "none" } }, dir: t.dir, children: b.jsx(Lu, { scope: o, placedSide: ee, placedAlign: H, onArrowChange: R, arrowX: le, arrowY: ve, shouldHideArrow: Te, children: b.jsx(k.div, { "data-side": ee, "data-align": H, ...g, ref: x, style: { ...g.style, animation: L ? (_g = g.style) == null ? void 0 : _g.animation : "none" } }) }) });
}, "PopperContent")), Bu = "PopperArrow", Uu = { top: "bottom", right: "left", bottom: "top", left: "right" }, Hu = i.forwardRef(De(function(t, n) {
  const { __scopePopper: o, ...r } = t, s = Vu(Bu, o), c = Uu[s.placedSide];
  return b.jsx("span", { ref: s.onArrowChange, style: { position: "absolute", left: s.arrowX, top: s.arrowY, [c]: 0, transformOrigin: { top: "", right: "0 0", bottom: "center 0", left: "100% 0" }[s.placedSide], transform: { top: "translateY(100%)", right: "translateY(50%) rotate(90deg) translateX(-50%)", bottom: "rotate(180deg)", left: "translateY(50%) rotate(-90deg) translateX(50%)" }[s.placedSide], visibility: s.shouldHideArrow ? "hidden" : void 0 }, children: b.jsx($u, { ...r, ref: n, style: { ...r.style, display: "block" } }) });
}, "PopperArrow"));
function ti(e) {
  return e !== null;
}
De(ti, "isNotNull");
var Wu = De((e) => ({ name: "transformOrigin", options: e, fn(t) {
  var _a3, _b, _c2;
  const { placement: n, rects: o, middlewareData: r } = t, c = ((_a3 = r.arrow) == null ? void 0 : _a3.centerOffset) !== 0, a = c ? 0 : e.arrowWidth, l = c ? 0 : e.arrowHeight, [u, p] = yn(n), d = { start: "0%", center: "50%", end: "100%" }[p], f = (((_b = r.arrow) == null ? void 0 : _b.x) ?? 0) + a / 2, m = (((_c2 = r.arrow) == null ? void 0 : _c2.y) ?? 0) + l / 2;
  let v = "", h = "";
  return u === "bottom" ? (v = c ? d : `${f}px`, h = `${-l}px`) : u === "top" ? (v = c ? d : `${f}px`, h = `${o.floating.height + l}px`) : u === "right" ? (v = `${-l}px`, h = c ? d : `${m}px`) : u === "left" && (v = `${o.floating.width + l}px`, h = c ? d : `${m}px`), { data: { x: v, y: h } };
} }), "transformOrigin");
function yn(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
De(yn, "getSideAndAlignFromPlacement");
var Rn = ku, jt = ju, Pn = Gu, ni = Hu, Ku = Object.defineProperty, Uo = (e, t) => Ku(e, "name", { value: t, configurable: true }), qn = false;
function oi() {
  const [e, t] = i.useState(qn);
  return i.useEffect(() => {
    qn || (qn = true, t(true));
  }, []), e;
}
Uo(oi, "useIsHydrated");
var ri = nt[" useSyncExternalStore ".trim().toString()];
function si() {
  return () => {
  };
}
Uo(si, "subscribe");
function ii() {
  return ri(si, () => true, () => false);
}
Uo(ii, "useIsHydratedModern");
var zu = typeof ri == "function" ? ii : oi, Yu = Object.defineProperty, rt = (e, t) => Yu(e, "name", { value: t, configurable: true }), Zn = "rovingFocusGroup.onEntryFocus", Xu = { bubbles: false, cancelable: true }, Sn = "RovingFocusGroup", [mo, ci, qu] = fn(Sn), [Zu, qe] = J(Sn, [qu]), [Qu, Ju] = Zu(Sn), ed = i.forwardRef(rt(function(t, n) {
  return b.jsx(mo.Provider, { scope: t.__scopeRovingFocusGroup, children: b.jsx(mo.Slot, { scope: t.__scopeRovingFocusGroup, children: b.jsx(td, { ...t, ref: n }) }) });
}, "RovingFocusGroup")), td = i.forwardRef(rt(function(t, n) {
  const { __scopeRovingFocusGroup: o, orientation: r, loop: s = false, dir: c, currentTabStopId: a, defaultCurrentTabStopId: l, onCurrentTabStopIdChange: u, onEntryFocus: p, preventScrollOnEntryFocus: d = false, ...f } = t, m = i.useRef(null), v = G(n, m), h = ot(c), [g, w] = ie({ prop: a, defaultProp: l ?? null, onChange: u, caller: Sn }), [y, C] = i.useState(false), x = be(p), P = ci(o), R = i.useRef(false), [S, _] = i.useState(0);
  return i.useEffect(() => {
    const A = m.current;
    if (A) return A.addEventListener(Zn, x), () => A.removeEventListener(Zn, x);
  }, [x]), b.jsx(Qu, { scope: o, orientation: r, dir: h, loop: s, currentTabStopId: g, onItemFocus: i.useCallback((A) => w(A), [w]), onItemShiftTab: i.useCallback(() => C(true), []), onFocusableItemAdd: i.useCallback(() => _((A) => A + 1), []), onFocusableItemRemove: i.useCallback(() => _((A) => A - 1), []), children: b.jsx(k.div, { tabIndex: y || S === 0 ? -1 : 0, "data-orientation": r, ...f, ref: v, style: { outline: "none", ...t.style }, onMouseDown: T(t.onMouseDown, () => {
    R.current = true;
  }), onFocus: T(t.onFocus, (A) => {
    const O = !R.current;
    if (A.target === A.currentTarget && O && !y) {
      const E = new CustomEvent(Zn, Xu);
      if (A.currentTarget.dispatchEvent(E), !E.defaultPrevented) {
        const I = P().filter((j) => j.focusable), M = I.find((j) => j.active), D = I.find((j) => j.id === g), N = [M, D, ...I].filter(Boolean).map((j) => j.ref.current);
        Ho(N, d);
      }
    }
    R.current = false;
  }), onBlur: T(t.onBlur, () => C(false)) }) });
}, "RovingFocusGroupImpl")), nd = "RovingFocusGroupItem", od = i.forwardRef(rt(function(t, n) {
  const { __scopeRovingFocusGroup: o, focusable: r = true, active: s = false, tabStopId: c, children: a, ...l } = t, u = fe(), p = c || u, d = Ju(nd, o), f = d.currentTabStopId === p, m = ci(o), { onFocusableItemAdd: v, onFocusableItemRemove: h, currentTabStopId: g } = d, w = zu();
  return Q(() => {
    if (!(!w || !r)) return v(), () => h();
  }, [w, r, v, h]), i.useEffect(() => {
    if (!(w || !r)) return v(), () => h();
  }, [w, r, v, h]), b.jsx(mo.ItemSlot, { scope: o, id: p, focusable: r, active: s, children: b.jsx(k.span, { tabIndex: f ? 0 : -1, "data-orientation": d.orientation, ...l, ref: n, onMouseDown: T(t.onMouseDown, (y) => {
    r ? d.onItemFocus(p) : y.preventDefault();
  }), onFocus: T(t.onFocus, () => d.onItemFocus(p)), onKeyDown: T(t.onKeyDown, (y) => {
    if (y.key === "Tab" && y.shiftKey) {
      d.onItemShiftTab();
      return;
    }
    if (y.target !== y.currentTarget) return;
    const C = li(y, d.orientation, d.dir);
    if (C !== void 0) {
      if (y.metaKey || y.ctrlKey || y.altKey || y.shiftKey) return;
      y.preventDefault();
      let P = m().filter((R) => R.focusable).map((R) => R.ref.current);
      if (C === "last") P.reverse();
      else if (C === "prev" || C === "next") {
        C === "prev" && P.reverse();
        const R = P.indexOf(y.currentTarget);
        P = d.loop ? ui(P, R + 1) : P.slice(R + 1);
      }
      setTimeout(() => Ho(P));
    }
  }), children: typeof a == "function" ? a({ isCurrentTabStop: f, hasTabStop: g != null }) : a }) });
}, "RovingFocusGroupItem")), rd = { ArrowLeft: "prev", ArrowUp: "prev", ArrowRight: "next", ArrowDown: "next", PageUp: "first", Home: "first", PageDown: "last", End: "last" };
function ai(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
rt(ai, "getDirectionAwareKey");
function li(e, t, n) {
  const o = ai(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o))) return rd[o];
}
rt(li, "getFocusIntent");
function Ho(e, t = false) {
  const n = document.activeElement;
  for (const o of e) if (o === n || (o.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
rt(Ho, "focusFirst");
function ui(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
rt(ui, "wrapArray");
var En = ed, In = od, sd = Object.defineProperty, K = (e, t) => sd(e, "name", { value: t, configurable: true }), id = ["Enter", " "], cd = ["ArrowDown", "PageUp", "Home"], di = ["ArrowUp", "PageDown", "End"], ad = [...cd, ...di], Tn = "Menu", [vo, ld, ud] = fn(Tn), [st, _n] = J(Tn, [ud, Xe, qe]), Wo = Xe(), fi = qe(), [dd, Lt] = st(Tn), [fd, Ko] = st(Tn), pd = K((e) => {
  const { __scopeMenu: t, open: n = false, children: o, dir: r, onOpenChange: s, modal: c = true } = e, a = Wo(t), [l, u] = i.useState(null), p = i.useRef(false), d = be(s), f = ot(r);
  return i.useEffect(() => {
    const m = K(() => {
      p.current = true, document.addEventListener("pointerdown", v, { capture: true, once: true }), document.addEventListener("pointermove", v, { capture: true, once: true });
    }, "handleKeyDown"), v = K(() => p.current = false, "handlePointer");
    return document.addEventListener("keydown", m, { capture: true }), () => {
      document.removeEventListener("keydown", m, { capture: true }), document.removeEventListener("pointerdown", v, { capture: true }), document.removeEventListener("pointermove", v, { capture: true });
    };
  }, []), i.useEffect(() => {
    if (!n) return;
    const m = K(() => d(false), "handleBlur");
    return window.addEventListener("blur", m), () => window.removeEventListener("blur", m);
  }, [n, d]), b.jsx(Rn, { ...a, children: b.jsx(dd, { scope: t, open: n, onOpenChange: d, content: l, onContentChange: u, children: b.jsx(fd, { scope: t, onClose: i.useCallback(() => d(false), [d]), isUsingKeyboardRef: p, dir: f, modal: c, children: o }) }) });
}, "Menu"), md = i.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, ...r } = t, s = Wo(o);
  return b.jsx(jt, { ...s, ...r, ref: n });
}, "MenuAnchor")), pi = "MenuPortal", [vd, hd] = st(pi, { forceMount: void 0 }), gd = K((e) => {
  const { __scopeMenu: t, forceMount: n, children: o, container: r } = e, s = Lt(pi, t);
  return b.jsx(vd, { scope: t, forceMount: n, children: b.jsx(pe, { present: n || s.open, children: b.jsx(Ft, { asChild: true, container: r, children: o }) }) });
}, "MenuPortal"), Ue = "MenuContent", [bd, mi] = st(Ue), Cd = i.forwardRef(K(function(t, n) {
  const o = hd(Ue, t.__scopeMenu), { forceMount: r = o.forceMount, ...s } = t, c = Lt(Ue, t.__scopeMenu), a = Ko(Ue, t.__scopeMenu);
  return b.jsx(vo.Provider, { scope: t.__scopeMenu, children: b.jsx(pe, { present: r || c.open, children: b.jsx(vo.Slot, { scope: t.__scopeMenu, children: a.modal ? b.jsx(xd, { ...s, ref: n }) : b.jsx(wd, { ...s, ref: n }) }) }) });
}, "MenuContent")), xd = i.forwardRef(K(function(t, n) {
  const o = Lt(Ue, t.__scopeMenu), r = i.useRef(null), s = G(n, r);
  return i.useEffect(() => {
    const c = r.current;
    if (c) return vn(c);
  }, []), b.jsx(vi, { ...t, ref: s, trapFocus: o.open, disableOutsidePointerEvents: o.open, disableOutsideScroll: true, onFocusOutside: T(t.onFocusOutside, (c) => c.preventDefault(), { checkForDefaultPrevented: false }), onDismiss: () => o.onOpenChange(false) });
}, "MenuRootContentModal")), wd = i.forwardRef(K(function(t, n) {
  const o = Lt(Ue, t.__scopeMenu);
  return b.jsx(vi, { ...t, ref: n, trapFocus: false, disableOutsidePointerEvents: false, disableOutsideScroll: false, onDismiss: () => o.onOpenChange(false) });
}, "MenuRootContentNonModal")), yd = Pe("MenuContent.ScrollLock"), vi = i.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, loop: r = false, trapFocus: s, onOpenAutoFocus: c, onCloseAutoFocus: a, disableOutsidePointerEvents: l, onEntryFocus: u, onEscapeKeyDown: p, onPointerDownOutside: d, onFocusOutside: f, onInteractOutside: m, onDismiss: v, disableOutsideScroll: h, ...g } = t, w = Lt(Ue, o), y = Ko(Ue, o), C = Wo(o), x = fi(o), P = ld(o), [R, S] = i.useState(null), _ = i.useRef(null), A = G(n, _, w.onContentChange), O = i.useRef(0), E = i.useRef(""), I = i.useRef(0), M = i.useRef(null), D = i.useRef("right"), V = i.useRef(0), N = h ? kt : i.Fragment, j = h ? { as: yd, allowPinchZoom: true } : void 0, L = K(($) => {
    var _a3, _b;
    const ee = E.current + $, H = P().filter((F) => !F.disabled), X = document.activeElement, le = (_a3 = H.find((F) => F.ref.current === X)) == null ? void 0 : _a3.textValue, ve = H.map((F) => F.textValue), Te = xi(ve, ee, le), de = (_b = H.find((F) => F.textValue === Te)) == null ? void 0 : _b.ref.current;
    K((function F(W) {
      E.current = W, window.clearTimeout(O.current), W !== "" && (O.current = window.setTimeout(() => F(""), 1e3));
    }), "updateSearch")(ee), de && setTimeout(() => de.focus());
  }, "handleTypeaheadSearch");
  i.useEffect(() => () => window.clearTimeout(O.current), []), Ct();
  const B = i.useCallback(($) => {
    var _a3, _b;
    return D.current === ((_a3 = M.current) == null ? void 0 : _a3.side) && yi($, (_b = M.current) == null ? void 0 : _b.area);
  }, []);
  return b.jsx(bd, { scope: o, searchRef: E, onItemEnter: i.useCallback(($) => {
    B($) && $.preventDefault();
  }, [B]), onItemLeave: i.useCallback(($) => {
    var _a3;
    B($) || ((_a3 = _.current) == null ? void 0 : _a3.focus(), S(null));
  }, [B]), onTriggerLeave: i.useCallback(($) => {
    B($) && $.preventDefault();
  }, [B]), pointerGraceTimerRef: I, onPointerGraceIntentChange: i.useCallback(($) => {
    M.current = $;
  }, []), children: b.jsx(N, { ...j, children: b.jsx(pn, { asChild: true, trapped: s, onMountAutoFocus: T(c, ($) => {
    var _a3;
    $.preventDefault(), (_a3 = _.current) == null ? void 0 : _a3.focus({ preventScroll: true });
  }), onUnmountAutoFocus: a, children: b.jsx(Dt, { asChild: true, disableOutsidePointerEvents: l, onEscapeKeyDown: p, onPointerDownOutside: d, onFocusOutside: f, onInteractOutside: m, onDismiss: v, children: b.jsx(En, { asChild: true, ...x, dir: y.dir, orientation: "vertical", loop: r, currentTabStopId: R, onCurrentTabStopIdChange: S, onEntryFocus: T(u, ($) => {
    y.isUsingKeyboardRef.current || $.preventDefault();
  }), preventScrollOnEntryFocus: true, children: b.jsx(Pn, { role: "menu", "aria-orientation": "vertical", "data-state": hi(w.open), "data-radix-menu-content": "", dir: y.dir, ...C, ...g, ref: A, style: { outline: "none", ...g.style }, onKeyDown: T(g.onKeyDown, ($) => {
    const H = $.target.closest("[data-radix-menu-content]") === $.currentTarget, X = $.ctrlKey || $.altKey || $.metaKey, le = $.key.length === 1;
    H && ($.key === "Tab" && $.preventDefault(), !X && le && L($.key));
    const ve = _.current;
    if ($.target !== ve || !ad.includes($.key)) return;
    $.preventDefault();
    const de = P().filter((F) => !F.disabled).map((F) => F.ref.current);
    di.includes($.key) && de.reverse(), bi(de);
  }), onBlur: T(t.onBlur, ($) => {
    $.currentTarget.contains($.target) || (window.clearTimeout(O.current), E.current = "");
  }), onPointerMove: T(t.onPointerMove, dn(($) => {
    const ee = $.target, H = V.current !== $.clientX;
    if ($.currentTarget.contains(ee) && H) {
      const X = $.clientX > V.current ? "right" : "left";
      D.current = X, V.current = $.clientX;
    }
  })) }) }) }) }) }) });
}, "MenuContentImpl")), ho = "MenuItem", Vr = "menu.itemSelect", Rd = i.forwardRef(K(function(t, n) {
  const { disabled: o = false, onSelect: r, ...s } = t, c = i.useRef(null), a = Ko(ho, t.__scopeMenu), l = mi(ho, t.__scopeMenu), u = G(n, c), p = i.useRef(false), d = K(() => {
    const f = c.current;
    if (!o && f) {
      const m = new CustomEvent(Vr, { bubbles: true, cancelable: true });
      f.addEventListener(Vr, (v) => r == null ? void 0 : r(v), { once: true }), To(f, m), m.defaultPrevented ? p.current = false : a.onClose();
    }
  }, "handleSelect");
  return b.jsx(Pd, { ...s, ref: u, disabled: o, onClick: T(t.onClick, d), onPointerDown: (f) => {
    var _a3;
    (_a3 = t.onPointerDown) == null ? void 0 : _a3.call(t, f), p.current = true;
  }, onPointerUp: T(t.onPointerUp, (f) => {
    var _a3;
    p.current || ((_a3 = f.currentTarget) == null ? void 0 : _a3.click());
  }), onKeyDown: T(t.onKeyDown, (f) => {
    o || f.target !== f.currentTarget || l.searchRef.current !== "" && f.key === " " || id.includes(f.key) && (f.currentTarget.click(), f.preventDefault());
  }) });
}, "MenuItem")), Pd = i.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, disabled: r = false, textValue: s, ...c } = t, a = mi(ho, o), l = fi(o), u = i.useRef(null), p = G(n, u), [d, f] = i.useState(false), [m, v] = i.useState("");
  return i.useEffect(() => {
    const h = u.current;
    h && v((h.textContent ?? "").trim());
  }, [c.children]), b.jsx(vo.ItemSlot, { scope: o, disabled: r, textValue: s ?? m, children: b.jsx(In, { asChild: true, ...l, focusable: !r, children: b.jsx(k.div, { role: "menuitem", "data-highlighted": d ? "" : void 0, "aria-disabled": r || void 0, "data-disabled": r ? "" : void 0, ...c, ref: p, onPointerMove: T(t.onPointerMove, dn((h) => {
    r ? a.onItemLeave(h) : (a.onItemEnter(h), h.defaultPrevented || h.currentTarget.focus({ preventScroll: true }));
  })), onPointerLeave: T(t.onPointerLeave, dn((h) => a.onItemLeave(h))), onFocus: T(t.onFocus, () => f(true)), onBlur: T(t.onBlur, () => f(false)) }) }) });
}, "MenuItemImpl")), Sd = "MenuRadioGroup", [dv, fv] = st(Sd, { value: void 0, onValueChange: K(() => {
}, "onValueChange") }), Ed = "MenuItemIndicator", [pv, mv] = st(Ed, { checked: false }), Id = i.forwardRef(K(function(t, n) {
  const { __scopeMenu: o, ...r } = t;
  return b.jsx(k.div, { role: "separator", "aria-orientation": "horizontal", ...r, ref: n });
}, "MenuSeparator")), Td = "MenuSub", [vv, hv] = st(Td);
function hi(e) {
  return e ? "open" : "closed";
}
K(hi, "getOpenState");
function gi(e) {
  return e === "indeterminate";
}
K(gi, "isIndeterminate");
function _d(e) {
  return gi(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
K(_d, "getCheckedState");
function bi(e) {
  const t = document.activeElement;
  for (const n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
K(bi, "focusFirst");
function Ci(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
K(Ci, "wrapArray");
function xi(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let c = Ci(e, Math.max(s, 0));
  r.length === 1 && (c = c.filter((u) => u !== n));
  const l = c.find((u) => u.toLowerCase().startsWith(r.toLowerCase()));
  return l !== n ? l : void 0;
}
K(xi, "getNextMatch");
function wi(e, t) {
  const { x: n, y: o } = e;
  let r = false;
  for (let s = 0, c = t.length - 1; s < t.length; c = s++) {
    const a = t[s], l = t[c], u = a.x, p = a.y, d = l.x, f = l.y;
    p > o != f > o && n < (d - u) * (o - p) / (f - p) + u && (r = !r);
  }
  return r;
}
K(wi, "isPointInPolygon");
function yi(e, t) {
  if (!t) return false;
  const n = { x: e.clientX, y: e.clientY };
  return wi(n, t);
}
K(yi, "isPointerInGraceArea");
function dn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
K(dn, "whenMouse");
var Ri = pd, Pi = md, Si = gd, Ei = Cd, Ii = Rd, Ad = Id, Md = Object.defineProperty, Fe = (e, t) => Md(e, "name", { value: t, configurable: true }), zo = "ContextMenu", [Od, gv] = J(zo, [_n]), yt = _n(), [$d, Ti] = Od(zo), Dd = Fe((e) => {
  const { __scopeContextMenu: t, children: n, onOpenChange: o, open: r, dir: s, modal: c = true } = e, a = i.useRef(false), [l, u] = ie({ prop: r, defaultProp: false, onChange: o, caller: zo }), p = yt(t);
  return b.jsx($d, { scope: t, open: l, onOpenChange: u, modal: c, hasInteractedRef: a, children: b.jsx(Ri, { ...p, dir: s, open: l, onOpenChange: u, modal: c, children: n }) });
}, "ContextMenu"), Fd = "ContextMenuTrigger", kd = i.forwardRef(Fe(function(t, n) {
  const { __scopeContextMenu: o, disabled: r = false, ...s } = t, c = Ti(Fd, o), a = yt(o), [l, u] = i.useState({ x: 0, y: 0 }), p = i.useMemo(() => ({ current: { getBoundingClientRect: Fe(() => DOMRect.fromRect({ width: 0, height: 0, ...l }), "getBoundingClientRect") } }), [l]), d = i.useRef(0), f = i.useCallback(() => window.clearTimeout(d.current), []), m = Fe((v) => {
    c.hasInteractedRef.current = true, u({ x: v.clientX, y: v.clientY }), c.onOpenChange(true);
  }, "handleOpen");
  return i.useEffect(() => f, [f]), i.useEffect(() => {
    r && f();
  }, [r, f]), b.jsxs(b.Fragment, { children: [b.jsx(Pi, { ...a, virtualRef: p }), b.jsx(k.span, { "data-state": c.open ? "open" : "closed", "data-disabled": r ? "" : void 0, ...s, ref: n, style: { WebkitTouchCallout: "none", ...t.style }, onContextMenu: r ? t.onContextMenu : T(t.onContextMenu, (v) => {
    f(), m(v), v.preventDefault();
  }), onPointerDown: r ? t.onPointerDown : T(t.onPointerDown, It((v) => {
    f(), c.open && c.onOpenChange(false), d.current = window.setTimeout(() => m(v), 700);
  })), onPointerMove: r ? t.onPointerMove : T(t.onPointerMove, It(f)), onPointerCancel: r ? t.onPointerCancel : T(t.onPointerCancel, It(f)), onPointerUp: r ? t.onPointerUp : T(t.onPointerUp, It(f)) })] });
}, "ContextMenuTrigger")), Nd = Fe((e) => {
  const { __scopeContextMenu: t, ...n } = e, o = yt(t);
  return b.jsx(Si, { ...o, ...n });
}, "ContextMenuPortal"), jd = "ContextMenuContent", Ld = i.forwardRef(Fe(function(t, n) {
  const { __scopeContextMenu: o, ...r } = t, s = Ti(jd, o), c = yt(o), a = i.useRef(false);
  return b.jsx(Ei, { ...c, ...r, ref: n, side: "right", sideOffset: 2, align: "start", onCloseAutoFocus: (l) => {
    var _a3;
    (_a3 = t.onCloseAutoFocus) == null ? void 0 : _a3.call(t, l), !l.defaultPrevented && a.current && l.preventDefault(), a.current = false;
  }, onInteractOutside: (l) => {
    var _a3;
    (_a3 = t.onInteractOutside) == null ? void 0 : _a3.call(t, l), !l.defaultPrevented && !s.modal && (a.current = true);
  }, style: { ...t.style, "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)", "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)", "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)", "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)" } });
}, "ContextMenuContent")), Vd = i.forwardRef(Fe(function(t, n) {
  const { __scopeContextMenu: o, ...r } = t, s = yt(o);
  return b.jsx(Ii, { ...s, ...r, ref: n });
}, "ContextMenuItem")), Gd = i.forwardRef(Fe(function(t, n) {
  const { __scopeContextMenu: o, ...r } = t, s = yt(o);
  return b.jsx(Ad, { ...s, ...r, ref: n });
}, "ContextMenuSeparator"));
function It(e) {
  return (t) => t.pointerType !== "mouse" ? e(t) : void 0;
}
Fe(It, "whenTouchOrPen");
var bv = Dd, Cv = kd, xv = Nd, wv = Ld, yv = Vd, Rv = Gd, Bd = Object.defineProperty, Vt = (e, t) => Bd(e, "name", { value: t, configurable: true }), Yo = "DropdownMenu", [Ud, Pv] = J(Yo, [_n]), Gt = _n(), [Hd, _i] = Ud(Yo), Wd = Vt((e) => {
  const { __scopeDropdownMenu: t, children: n, dir: o, open: r, defaultOpen: s, onOpenChange: c, modal: a = true } = e, l = Gt(t), u = i.useRef(null), [p, d] = ie({ prop: r, defaultProp: s ?? false, onChange: c, caller: Yo });
  return b.jsx(Hd, { scope: t, triggerId: fe(), triggerRef: u, contentId: fe(), open: p, onOpenChange: d, onOpenToggle: i.useCallback(() => d((f) => !f), [d]), modal: a, children: b.jsx(Ri, { ...l, open: p, onOpenChange: d, dir: o, modal: a, children: n }) });
}, "DropdownMenu"), Kd = "DropdownMenuTrigger", zd = i.forwardRef(Vt(function(t, n) {
  const { __scopeDropdownMenu: o, disabled: r = false, ...s } = t, c = _i(Kd, o), a = Gt(o), l = G(n, c.triggerRef);
  return b.jsx(Pi, { asChild: true, ...a, children: b.jsx(k.button, { type: "button", id: c.triggerId, "aria-haspopup": "menu", "aria-expanded": c.open, "aria-controls": c.open ? c.contentId : void 0, "data-state": c.open ? "open" : "closed", "data-disabled": r ? "" : void 0, disabled: r, ...s, ref: l, onPointerDown: T(t.onPointerDown, (u) => {
    !r && u.button === 0 && u.ctrlKey === false && (c.onOpenToggle(), c.open || u.preventDefault());
  }), onKeyDown: T(t.onKeyDown, (u) => {
    r || (["Enter", " "].includes(u.key) && c.onOpenToggle(), u.key === "ArrowDown" && c.onOpenChange(true), ["Enter", " ", "ArrowDown"].includes(u.key) && u.preventDefault());
  }) }) });
}, "DropdownMenuTrigger")), Yd = Vt((e) => {
  const { __scopeDropdownMenu: t, ...n } = e, o = Gt(t);
  return b.jsx(Si, { ...o, ...n });
}, "DropdownMenuPortal"), Xd = "DropdownMenuContent", qd = i.forwardRef(Vt(function(t, n) {
  const { __scopeDropdownMenu: o, ...r } = t, s = _i(Xd, o), c = Gt(o), a = i.useRef(false);
  return b.jsx(Ei, { id: s.contentId, "aria-labelledby": s.triggerId, ...c, ...r, ref: n, onCloseAutoFocus: T(t.onCloseAutoFocus, (l) => {
    var _a3;
    a.current || ((_a3 = s.triggerRef.current) == null ? void 0 : _a3.focus()), a.current = false, l.preventDefault();
  }), onInteractOutside: T(t.onInteractOutside, (l) => {
    const u = l.detail.originalEvent, p = u.button === 0 && u.ctrlKey === true, d = u.button === 2 || p;
    (!s.modal || d) && (a.current = true);
  }), style: { ...t.style, "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)", "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)", "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)", "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)" } });
}, "DropdownMenuContent")), Zd = i.forwardRef(Vt(function(t, n) {
  const { __scopeDropdownMenu: o, ...r } = t, s = Gt(o);
  return b.jsx(Ii, { ...s, ...r, ref: n });
}, "DropdownMenuItem")), Sv = Wd, Ev = zd, Iv = Yd, Tv = qd, _v = Zd, Qd = Object.defineProperty, Jd = (e, t) => Qd(e, "name", { value: t, configurable: true }), ef = i.forwardRef(Jd(function(t, n) {
  return b.jsx(k.label, { ...t, ref: n, onMouseDown: (o) => {
    var _a3;
    o.target.closest("button, input, select, textarea") || ((_a3 = t.onMouseDown) == null ? void 0 : _a3.call(t, o), !o.defaultPrevented && o.detail > 1 && o.preventDefault());
  } });
}, "Label")), tf = Object.defineProperty, oe = (e, t) => tf(e, "name", { value: t, configurable: true }), [Xo, Av] = J("Form"), Ai = "Form", [nf, qo] = Xo(Ai), [of, rf] = Xo(Ai), sf = i.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, onClearServerErrors: r = oe(() => {
  }, "onClearServerErrors"), ...s } = t, c = i.useRef(null), a = G(n, c), [l, u] = i.useState({}), p = i.useCallback((E) => l[E], [l]), d = i.useCallback((E, I) => u((M) => ({ ...M, [E]: { ...M[E] ?? {}, ...I } })), []), f = i.useCallback((E) => {
    u((I) => ({ ...I, [E]: void 0 })), C((I) => ({ ...I, [E]: {} }));
  }, []), [m, v] = i.useState({}), h = i.useCallback((E) => m[E] ?? [], [m]), g = i.useCallback((E, I) => {
    v((M) => ({ ...M, [E]: [...M[E] ?? [], I] }));
  }, []), w = i.useCallback((E, I) => {
    v((M) => ({ ...M, [E]: (M[E] ?? []).filter((D) => D.id !== I) }));
  }, []), [y, C] = i.useState({}), x = i.useCallback((E) => y[E] ?? {}, [y]), P = i.useCallback((E, I) => {
    C((M) => ({ ...M, [E]: { ...M[E] ?? {}, ...I } }));
  }, []), [R, S] = i.useState({}), _ = i.useCallback((E, I) => {
    S((M) => {
      const D = new Set(M[E]).add(I);
      return { ...M, [E]: D };
    });
  }, []), A = i.useCallback((E, I) => {
    S((M) => {
      const D = new Set(M[E]);
      return D.delete(I), { ...M, [E]: D };
    });
  }, []), O = i.useCallback((E) => Array.from(R[E] ?? []).join(" ") || void 0, [R]);
  return b.jsx(nf, { scope: o, getFieldValidity: p, onFieldValidityChange: d, getFieldCustomMatcherEntries: h, onFieldCustomMatcherEntryAdd: g, onFieldCustomMatcherEntryRemove: w, getFieldCustomErrors: x, onFieldCustomErrorsChange: P, onFieldValiditionClear: f, children: b.jsx(of, { scope: o, onFieldMessageIdAdd: _, onFieldMessageIdRemove: A, getFieldDescription: O, children: b.jsx(k.form, { ...s, ref: a, onInvalid: T(t.onInvalid, (E) => {
    const I = Zo(E.currentTarget);
    I === E.target && I.focus(), E.preventDefault();
  }), onSubmit: T(t.onSubmit, r, { checkForDefaultPrevented: false }), onReset: T(t.onReset, r) }) }) });
}, "Form")), vt = "FormField", [cf, Mi] = Xo(vt), af = i.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, name: r, serverInvalid: s = false, ...c } = t, l = qo(vt, o).getFieldValidity(r), u = fe();
  return b.jsx(cf, { scope: o, id: u, name: r, serverInvalid: s, children: b.jsx(k.div, { "data-valid": An(l, s), "data-invalid": Mn(l, s), ...c, ref: n }) });
}, "FormField")), Qt = "FormLabel", lf = i.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, name: r, ...s } = t, c = qo(Qt, o), a = Mi(Qt, o, { optional: true }), l = r ?? (a == null ? void 0 : a.name);
  if (!l) throw new Error(`\`${Qt}\` must be used within \`${vt}\` or specify the \`name\` prop`);
  const u = s.htmlFor || (a == null ? void 0 : a.id);
  if (!u) throw new Error(`\`${Qt}\` must be used within \`${vt}\` or specify the \`htmlFor\` prop`);
  const p = c.getFieldValidity(l), d = (a == null ? void 0 : a.serverInvalid) ?? false;
  return b.jsx(ef, { "data-valid": An(p, d), "data-invalid": Mn(p, d), ...s, ref: n, htmlFor: u });
}, "FormLabel")), Et = "FormControl", uf = i.forwardRef(oe(function(t, n) {
  const { __scopeForm: o, name: r, id: s, ...c } = t, a = qo(Et, o), l = Mi(Et, o, { optional: true }), u = rf(Et, o), p = i.useRef(null), d = G(n, p), f = r || (l == null ? void 0 : l.name);
  if (!f) throw new Error(`\`${Et}\` must be used within \`${vt}\` or specify the \`name\` prop`);
  const m = s || (l == null ? void 0 : l.id);
  if (!m) throw new Error(`\`${Et}\` must be used within \`${vt}\` or specify the \`id\` prop`);
  const v = a.getFieldCustomMatcherEntries(f), { onFieldValidityChange: h, onFieldCustomErrorsChange: g, onFieldValiditionClear: w } = a, y = i.useCallback(async (R) => {
    if (ji(R.validity)) {
      const N = sn(R.validity);
      h(f, N);
      return;
    }
    const S = R.form ? new FormData(R.form) : new FormData(), _ = [R.value, S], A = [], O = [];
    v.forEach((N) => {
      Fi(N, _) ? O.push(N) : ki(N) && A.push(N);
    });
    const E = A.map(({ id: N, match: j }) => [N, j(..._)]), I = Object.fromEntries(E), M = Object.values(I).some(Boolean), D = M;
    R.setCustomValidity(D ? Gr : "");
    const V = sn(R.validity);
    if (h(f, V), g(f, I), !M && O.length > 0) {
      const N = O.map(({ id: H, match: X }) => X(..._).then((le) => [H, le])), j = await Promise.all(N), L = Object.fromEntries(j), $ = Object.values(L).some(Boolean);
      R.setCustomValidity($ ? Gr : "");
      const ee = sn(R.validity);
      h(f, ee), g(f, L);
    }
  }, [v, f, g, h]);
  i.useEffect(() => {
    const R = p.current;
    if (R) {
      const S = oe(() => y(R), "handleChange");
      return R.addEventListener("change", S), () => R.removeEventListener("change", S);
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
    const R = p.current, S = R == null ? void 0 : R.closest("form"), _ = S ? Zo(S) : null;
    _ === R && (_ == null ? void 0 : _.focus());
  }, [x]);
  const P = a.getFieldValidity(f);
  return b.jsx(k.input, { "data-valid": An(P, x), "data-invalid": Mn(P, x), "aria-invalid": x || void 0, "aria-describedby": u.getFieldDescription(f), title: "", ...c, ref: d, id: m, name: f, onInvalid: T(t.onInvalid, (R) => {
    const S = R.currentTarget;
    y(S);
  }), onChange: T(t.onChange, (R) => {
    C();
  }) });
}, "FormControl")), Gr = "This value is not valid";
function sn(e) {
  const t = {};
  for (const n in e) t[n] = e[n];
  return t;
}
oe(sn, "validityStateToObject");
function Oi(e) {
  return e instanceof HTMLElement;
}
oe(Oi, "isHTMLElement");
function $i(e) {
  return "validity" in e;
}
oe($i, "isFormControl");
function Di(e) {
  return $i(e) && (e.validity.valid === false || e.getAttribute("aria-invalid") === "true");
}
oe(Di, "isInvalid");
function Zo(e) {
  const t = e.elements, [n] = Array.from(t).filter(Oi).filter(Di);
  return n ?? null;
}
oe(Zo, "getFirstInvalidControl");
function Fi(e, t) {
  return e.match.constructor.name === "AsyncFunction" || Ni(e.match, t);
}
oe(Fi, "isAsyncCustomMatcherEntry");
function ki(e) {
  return e.match.constructor.name === "Function";
}
oe(ki, "isSyncCustomMatcherEntry");
function Ni(e, t) {
  return e(...t) instanceof Promise;
}
oe(Ni, "returnsPromise");
function ji(e) {
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
oe(ji, "hasBuiltInError");
function An(e, t) {
  if ((e == null ? void 0 : e.valid) === true && !t) return true;
}
oe(An, "getValidAttribute");
function Mn(e, t) {
  if ((e == null ? void 0 : e.valid) === false || t) return true;
}
oe(Mn, "getInvalidAttribute");
var Mv = sf, Ov = af, $v = lf, Dv = uf, df = Object.defineProperty, ff = (e, t) => df(e, "name", { value: t, configurable: true });
function Li(e) {
  const t = i.useRef({ value: e, previous: e });
  return i.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
ff(Li, "usePrevious");
var pf = Object.defineProperty, mf = (e, t) => pf(e, "name", { value: t, configurable: true });
function go(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
mf(go, "clamp");
var vf = Object.defineProperty, Ie = (e, t) => vf(e, "name", { value: t, configurable: true }), Qo = "Popover", [Vi, Fv] = J(Qo, [Xe]), Bt = Xe(), [hf, it] = Vi(Qo), gf = Ie((e) => {
  const { __scopePopover: t, children: n, open: o, defaultOpen: r, onOpenChange: s, modal: c = false } = e, a = Bt(t), l = i.useRef(null), [u, p] = i.useState(false), [d, f] = ie({ prop: o, defaultProp: r ?? false, onChange: s, caller: Qo });
  return b.jsx(Rn, { ...a, children: b.jsx(hf, { scope: t, contentId: fe(), triggerRef: l, open: d, onOpenChange: f, onOpenToggle: i.useCallback(() => f((m) => !m), [f]), hasCustomAnchor: u, onCustomAnchorAdd: i.useCallback(() => p(true), []), onCustomAnchorRemove: i.useCallback(() => p(false), []), modal: c, children: n }) });
}, "Popover"), bf = "PopoverAnchor", Cf = i.forwardRef(Ie(function(t, n) {
  const { __scopePopover: o, ...r } = t, s = it(bf, o), c = Bt(o), { onCustomAnchorAdd: a, onCustomAnchorRemove: l } = s;
  return i.useEffect(() => (a(), () => l()), [a, l]), b.jsx(jt, { ...c, ...r, ref: n });
}, "PopoverAnchor")), xf = "PopoverTrigger", wf = i.forwardRef(Ie(function(t, n) {
  const { __scopePopover: o, ...r } = t, s = it(xf, o), c = Bt(o), a = G(n, s.triggerRef), l = b.jsx(k.button, { type: "button", "aria-haspopup": "dialog", "aria-expanded": s.open, "aria-controls": s.open ? s.contentId : void 0, "data-state": Jo(s.open), ...r, ref: a, onClick: T(t.onClick, s.onOpenToggle) });
  return s.hasCustomAnchor ? l : b.jsx(jt, { asChild: true, ...c, children: l });
}, "PopoverTrigger")), Gi = "PopoverPortal", [yf, Rf] = Vi(Gi, { forceMount: void 0 }), Pf = Ie((e) => {
  const { __scopePopover: t, forceMount: n, children: o, container: r } = e, s = it(Gi, t);
  return b.jsx(yf, { scope: t, forceMount: n, children: b.jsx(pe, { present: n || s.open, children: b.jsx(Ft, { asChild: true, container: r, children: o }) }) });
}, "PopoverPortal"), Mt = "PopoverContent", Sf = i.forwardRef(Ie(function(t, n) {
  const o = Rf(Mt, t.__scopePopover), { forceMount: r = o.forceMount, ...s } = t, c = it(Mt, t.__scopePopover);
  return b.jsx(pe, { present: r || c.open, children: c.modal ? b.jsx(If, { ...s, ref: n }) : b.jsx(Tf, { ...s, ref: n }) });
}, "PopoverContent")), Ef = Pe("PopoverContent.RemoveScroll"), If = i.forwardRef(Ie(function(t, n) {
  const o = it(Mt, t.__scopePopover), r = i.useRef(null), s = G(n, r), c = i.useRef(false);
  return i.useEffect(() => {
    const a = r.current;
    if (a) return vn(a);
  }, []), b.jsx(kt, { as: Ef, allowPinchZoom: true, children: b.jsx(Bi, { ...t, ref: s, trapFocus: o.open, disableOutsidePointerEvents: true, onCloseAutoFocus: T(t.onCloseAutoFocus, (a) => {
    var _a3;
    a.preventDefault(), c.current || ((_a3 = o.triggerRef.current) == null ? void 0 : _a3.focus());
  }), onPointerDownOutside: T(t.onPointerDownOutside, (a) => {
    const l = a.detail.originalEvent, u = l.button === 0 && l.ctrlKey === true, p = l.button === 2 || u;
    c.current = p;
  }, { checkForDefaultPrevented: false }), onFocusOutside: T(t.onFocusOutside, (a) => a.preventDefault(), { checkForDefaultPrevented: false }) }) });
}, "PopoverContentModal")), Tf = i.forwardRef(Ie(function(t, n) {
  const o = it(Mt, t.__scopePopover), r = i.useRef(false), s = i.useRef(false);
  return b.jsx(Bi, { ...t, ref: n, trapFocus: false, disableOutsidePointerEvents: false, onCloseAutoFocus: (c) => {
    var _a3, _b;
    (_a3 = t.onCloseAutoFocus) == null ? void 0 : _a3.call(t, c), c.defaultPrevented || (r.current || ((_b = o.triggerRef.current) == null ? void 0 : _b.focus()), c.preventDefault()), r.current = false, s.current = false;
  }, onInteractOutside: (c) => {
    var _a3, _b;
    (_a3 = t.onInteractOutside) == null ? void 0 : _a3.call(t, c), c.defaultPrevented || (r.current = true, c.detail.originalEvent.type === "pointerdown" && (s.current = true));
    const a = c.target;
    ((_b = o.triggerRef.current) == null ? void 0 : _b.contains(a)) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && s.current && c.preventDefault();
  } });
}, "PopoverContentNonModal")), Bi = i.forwardRef(Ie(function(t, n) {
  const { __scopePopover: o, trapFocus: r, onOpenAutoFocus: s, onCloseAutoFocus: c, disableOutsidePointerEvents: a, onEscapeKeyDown: l, onPointerDownOutside: u, onFocusOutside: p, onInteractOutside: d, ...f } = t, m = it(Mt, o), v = Bt(o);
  return Ct(), b.jsx(pn, { asChild: true, loop: true, trapped: r, onMountAutoFocus: s, onUnmountAutoFocus: c, children: b.jsx(Dt, { asChild: true, disableOutsidePointerEvents: a, onInteractOutside: d, onEscapeKeyDown: l, onPointerDownOutside: u, onFocusOutside: p, onDismiss: () => m.onOpenChange(false), deferPointerDownOutside: true, children: b.jsx(Pn, { "data-state": Jo(m.open), role: "dialog", id: m.contentId, ...v, ...f, ref: n, style: { ...f.style, "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-popover-content-available-width": "var(--radix-popper-available-width)", "--radix-popover-content-available-height": "var(--radix-popper-available-height)", "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)", "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)" } }) }) });
}, "PopoverContentImpl")), _f = i.forwardRef(Ie(function(t, n) {
  const { __scopePopover: o, ...r } = t, s = Bt(o);
  return b.jsx(ni, { ...s, ...r, ref: n });
}, "PopoverArrow"));
function Jo(e) {
  return e ? "open" : "closed";
}
Ie(Jo, "getState");
var kv = gf, Nv = Cf, jv = wf, Lv = Pf, Vv = Sf, Gv = _f, Af = Object.defineProperty, se = (e, t) => Af(e, "name", { value: t, configurable: true }), Ui = "Radio", [Mf, Hi] = J(Ui), [Of, On] = Mf(Ui);
function Wi(e) {
  const { __scopeRadio: t, checked: n = false, children: o, disabled: r, form: s, name: c, onCheck: a, required: l, value: u = "on", internal_do_not_use_render: p } = e, [d, f] = i.useState(null), [m, v] = i.useState(null), h = i.useRef(false), [g, w] = i.useReducer((x) => x + 1, 0), y = d ? !!s || !!d.closest("form") : true, C = { checked: n, disabled: r, required: l, name: c, form: s, value: u, control: d, setControl: f, hasConsumerStoppedPropagationRef: h, userInteractionCount: g, onUserInteraction: w, isFormControl: y, bubbleInput: m, setBubbleInput: v, onCheck: se(() => a == null ? void 0 : a(), "onCheck") };
  return b.jsx(Of, { scope: t, ...C, children: Ki(p) ? p(C) : o });
}
se(Wi, "RadioProvider");
var $f = "RadioTrigger", Df = i.forwardRef(se(function({ __scopeRadio: t, onClick: n, ...o }, r) {
  const { checked: s, disabled: c, value: a, setControl: l, onCheck: u, hasConsumerStoppedPropagationRef: p, onUserInteraction: d, isFormControl: f, bubbleInput: m } = On($f, t), v = G(r, l);
  return b.jsx(k.button, { type: "button", role: "radio", "aria-checked": s, "data-state": er(s), "data-disabled": c ? "" : void 0, disabled: c, value: a, ...o, ref: v, onClick: T(n, (h) => {
    s || (d(), u()), m && f && (p.current = h.isPropagationStopped(), p.current || h.stopPropagation());
  }) });
}, "RadioTrigger")), Ff = "RadioIndicator", kf = i.forwardRef(se(function(t, n) {
  const { __scopeRadio: o, forceMount: r, ...s } = t, c = On(Ff, o);
  return b.jsx(pe, { present: r || c.checked, children: b.jsx(k.span, { "data-state": er(c.checked), "data-disabled": c.disabled ? "" : void 0, ...s, ref: n }) });
}, "RadioIndicator")), Nf = "RadioBubbleInput", jf = i.forwardRef(se(function({ __scopeRadio: t, onClick: n, ...o }, r) {
  const { control: s, checked: c, required: a, disabled: l, name: u, value: p, form: d, bubbleInput: f, setBubbleInput: m, hasConsumerStoppedPropagationRef: v, userInteractionCount: h } = On(Nf, t), g = G(r, m), w = Nt(s), y = i.useRef(false), C = i.useRef(c), x = i.useRef(h);
  i.useEffect(() => {
    const R = f;
    if (!R) return;
    const S = window.HTMLInputElement.prototype, A = Object.getOwnPropertyDescriptor(S, "checked").set, O = h !== x.current;
    x.current = h;
    const E = C.current !== c;
    C.current = c;
    const I = !(O && v.current);
    if (E && A) {
      y.current = !O;
      const M = new Event("click", { bubbles: I });
      A.call(R, c), R.dispatchEvent(M), y.current = false;
    }
  }, [f, c, v, h]);
  const P = i.useRef(c);
  return b.jsx(k.input, { type: "radio", "aria-hidden": true, defaultChecked: P.current, required: a, disabled: l, name: u, value: p, form: d, ...o, tabIndex: -1, ref: g, onClick: T(n, (R) => {
    y.current && R.stopPropagation();
  }), style: { ...o.style, ...w, position: "absolute", pointerEvents: "none", opacity: 0, margin: 0, transform: "translateX(-100%)" } });
}, "RadioBubbleInput"));
function Ki(e) {
  return typeof e == "function";
}
se(Ki, "isFunction");
function er(e) {
  return e ? "checked" : "unchecked";
}
se(er, "getState");
var Lf = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], tr = "RadioGroup", [Vf, Bv] = J(tr, [qe, Hi]), zi = qe(), $n = Hi(), [Gf, Bf] = Vf(tr), Uv = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, name: r, form: s, defaultValue: c, value: a, required: l = false, disabled: u = false, orientation: p, dir: d, loop: f = true, onValueChange: m, ...v } = t, h = zi(o), g = ot(d), [w, y] = ie({ prop: a, defaultProp: c ?? null, onChange: m, caller: tr }), [C, x] = i.useState(null), P = G(n, x), R = i.useRef(w);
  return i.useEffect(() => {
    const S = s ? C == null ? void 0 : C.ownerDocument.getElementById(s) : C == null ? void 0 : C.closest("form");
    if (S instanceof HTMLFormElement) {
      const _ = se(() => y(R.current), "reset");
      return S.addEventListener("reset", _), () => S.removeEventListener("reset", _);
    }
  }, [C, s, y]), b.jsx(Gf, { scope: o, name: r, form: s, required: l, disabled: u, value: w, onValueChange: y, children: b.jsx(En, { asChild: true, ...h, orientation: p, dir: g, loop: f, children: b.jsx(k.div, { role: "radiogroup", "aria-required": l, "aria-orientation": p, "data-disabled": u ? "" : void 0, dir: g, ...v, ref: P }) }) });
}, "RadioGroup")), Uf = "RadioGroupItemProvider", Hf = "RadioGroupItemTrigger";
function Yi(e) {
  const { __scopeRadioGroup: t, value: n, disabled: o, children: r, internal_do_not_use_render: s } = e, c = Bf(Uf, t), a = $n(t), l = c.disabled || o;
  return b.jsx(Wi, { ...a, checked: c.value === n, disabled: l, required: c.required, name: c.name, form: c.form, value: n, onCheck: () => c.onValueChange(n), internal_do_not_use_render: s, children: r });
}
se(Yi, "RadioGroupItemProvider");
var Wf = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, ...r } = t, s = zi(o), c = $n(o), { checked: a, disabled: l } = On(Hf, c.__scopeRadio), u = i.useRef(null), p = G(n, u), d = i.useRef(false);
  return i.useEffect(() => {
    const f = se((v) => {
      Lf.includes(v.key) && (d.current = true);
    }, "handleKeyDown"), m = se(() => d.current = false, "handleKeyUp");
    return document.addEventListener("keydown", f), document.addEventListener("keyup", m), () => {
      document.removeEventListener("keydown", f), document.removeEventListener("keyup", m);
    };
  }, []), b.jsx(In, { asChild: true, ...s, focusable: !l, active: a, children: b.jsx(Df, { ...c, ...r, ref: p, onKeyDown: T(r.onKeyDown, (f) => {
    f.key === "Enter" && f.preventDefault();
  }), onFocus: T(r.onFocus, () => {
    var _a3;
    d.current && ((_a3 = u.current) == null ? void 0 : _a3.click());
  }) }) });
}, "RadioGroupItemTrigger")), Hv = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, value: r, disabled: s, ...c } = t;
  return b.jsx(Yi, { __scopeRadioGroup: o, value: r, disabled: s, internal_do_not_use_render: ({ isFormControl: a }) => b.jsxs(b.Fragment, { children: [b.jsx(Wf, { ...c, ref: n, __scopeRadioGroup: o }), a && b.jsx(Kf, { __scopeRadioGroup: o })] }) });
}, "RadioGroupItem")), Kf = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, ...r } = t, s = $n(o);
  return b.jsx(jf, { ...s, ...r, ref: n });
}, "RadioGroupItemBubbleInput")), Wv = i.forwardRef(se(function(t, n) {
  const { __scopeRadioGroup: o, ...r } = t, s = $n(o);
  return b.jsx(kf, { ...s, ...r, ref: n });
}, "RadioGroupIndicator")), zf = Object.defineProperty, U = (e, t) => zf(e, "name", { value: t, configurable: true }), Yf = [" ", "Enter", "ArrowUp", "ArrowDown"], Xf = [" ", "Enter"], ht = "Select", [Dn, nr, qf] = fn(ht), [ct, Kv] = J(ht, [qf, Xe]), or = Xe(), [Zf, Ze] = ct(ht), [Qf, Jf] = ct(ht);
function Xi(e) {
  const { __scopeSelect: t, children: n, open: o, defaultOpen: r, onOpenChange: s, value: c, defaultValue: a, onValueChange: l, dir: u, name: p, autoComplete: d, disabled: f, required: m, form: v, internal_do_not_use_render: h } = e, g = or(t), [w, y] = i.useState(null), [C, x] = i.useState(null), [P, R] = i.useState(false), S = ot(u), [_, A] = ie({ prop: o, defaultProp: r ?? false, onChange: s, caller: ht }), [O, E] = ie({ prop: c, defaultProp: a, onChange: l, caller: ht }), I = i.useRef(null), M = i.useRef(O);
  i.useEffect(() => {
    const H = v ? w == null ? void 0 : w.ownerDocument.getElementById(v) : w == null ? void 0 : w.form;
    if (H instanceof HTMLFormElement) {
      const X = U(() => E(M.current), "reset");
      return H.addEventListener("reset", X), () => H.removeEventListener("reset", X);
    }
  }, [v, w, E]);
  const D = w ? !!v || !!w.closest("form") : true, [V, N] = i.useState(/* @__PURE__ */ new Set()), j = fe(), L = Array.from(V).map((H) => H.props.value).join(";"), B = i.useCallback((H) => {
    N((X) => new Set(X).add(H));
  }, []), $ = i.useCallback((H) => {
    N((X) => {
      const le = new Set(X);
      return le.delete(H), le;
    });
  }, []), ee = { required: m, trigger: w, onTriggerChange: y, valueNode: C, onValueNodeChange: x, valueNodeHasChildren: P, onValueNodeHasChildrenChange: R, contentId: j, value: O, onValueChange: E, open: _, onOpenChange: A, dir: S, triggerPointerDownPosRef: I, disabled: f, name: p, autoComplete: d, form: v, nativeOptions: V, nativeSelectKey: L, isFormControl: D };
  return b.jsx(Rn, { ...g, children: b.jsx(Zf, { scope: t, ...ee, children: b.jsx(Dn.Provider, { scope: t, children: b.jsx(Qf, { scope: t, onNativeOptionAdd: B, onNativeOptionRemove: $, children: Qi(h) ? h(ee) : n }) }) }) });
}
U(Xi, "SelectProvider");
var zv = U((e) => {
  const { __scopeSelect: t, children: n, ...o } = e;
  return b.jsx(Xi, { __scopeSelect: t, ...o, internal_do_not_use_render: ({ isFormControl: r }) => b.jsxs(b.Fragment, { children: [n, r ? b.jsx(vp, { __scopeSelect: t }) : null] }) });
}, "Select"), ep = "SelectTrigger", Yv = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, disabled: r = false, ...s } = t, c = or(o), a = Ze(ep, o), l = a.disabled || r, u = G(n, a.onTriggerChange), p = nr(o), d = i.useRef("touch"), [f, m, v] = rr((g) => {
    const w = p().filter((x) => !x.disabled), y = w.find((x) => x.value === a.value), C = sr(w, g, y);
    C !== void 0 && a.onValueChange(C.value);
  }), h = U((g) => {
    l || (a.onOpenChange(true), v()), g && (a.triggerPointerDownPosRef.current = { x: Math.round(g.pageX), y: Math.round(g.pageY) });
  }, "handleOpen");
  return b.jsx(jt, { asChild: true, ...c, children: b.jsx(k.button, { type: "button", role: "combobox", "aria-controls": a.open ? a.contentId : void 0, "aria-expanded": a.open, "aria-required": a.required, "aria-autocomplete": "none", dir: a.dir, "data-state": a.open ? "open" : "closed", disabled: l, "data-disabled": l ? "" : void 0, "data-placeholder": Ut(a.value) ? "" : void 0, ...s, ref: u, onClick: T(s.onClick, (g) => {
    g.currentTarget.focus(), d.current !== "mouse" && h(g);
  }), onPointerDown: T(s.onPointerDown, (g) => {
    d.current = g.pointerType;
    const w = g.target;
    w.hasPointerCapture(g.pointerId) && w.releasePointerCapture(g.pointerId), g.button === 0 && g.ctrlKey === false && g.pointerType === "mouse" && (h(g), g.preventDefault());
  }), onKeyDown: T(s.onKeyDown, (g) => {
    const w = f.current !== "";
    !(g.ctrlKey || g.altKey || g.metaKey) && g.key.length === 1 && m(g.key), !(w && g.key === " ") && Yf.includes(g.key) && (h(), g.preventDefault());
  }) }) });
}, "SelectTrigger")), tp = "SelectValue", Xv = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, className: r, style: s, children: c, placeholder: a = "", ...l } = t, u = Ze(tp, o), { onValueNodeHasChildrenChange: p } = u, d = c !== void 0, f = G(n, u.onValueNodeChange);
  Q(() => {
    p(d);
  }, [p, d]);
  const m = Ut(u.value);
  return b.jsx(k.span, { ...l, asChild: m ? false : l.asChild, ref: f, style: { pointerEvents: "none" }, children: b.jsx(i.Fragment, { children: m ? a : c }, m ? "placeholder" : "value") });
}, "SelectValue")), qv = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, children: r, ...s } = t;
  return b.jsx(k.span, { "aria-hidden": true, ...s, ref: n, children: r || "\u25BC" });
}, "SelectIcon")), np = "SelectPortal", [op, rp] = ct(np, { forceMount: void 0 }), Zv = U((e) => {
  const { __scopeSelect: t, forceMount: n, ...o } = e;
  return b.jsx(op, { scope: e.__scopeSelect, forceMount: n, children: b.jsx(Ft, { asChild: true, ...o }) });
}, "SelectPortal"), tt = "SelectContent", Qv = i.forwardRef(U(function(t, n) {
  const o = rp(tt, t.__scopeSelect), { forceMount: r = o.forceMount, ...s } = t, c = Ze(tt, t.__scopeSelect), [a, l] = i.useState();
  return Q(() => {
    l(new DocumentFragment());
  }, []), b.jsx(pe, { present: r || c.open, children: ({ present: u }) => u ? b.jsx(cp, { ...s, ref: n }) : b.jsx(sp, { ...s, fragment: a }) });
}, "SelectContent")), sp = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, children: r, fragment: s } = t;
  return s ? gt.createPortal(b.jsx(qi, { scope: o, children: b.jsx(Dn.Slot, { scope: o, children: b.jsx("div", { ref: n, children: r }) }) }), s) : null;
}, "SelectContentFragment")), Ce = 10, [qi, Fn] = ct(tt), ip = Pe("SelectContent.RemoveScroll"), cp = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o } = t, { position: r = "item-aligned", onCloseAutoFocus: s, onEscapeKeyDown: c, onPointerDownOutside: a, side: l, sideOffset: u, align: p, alignOffset: d, arrowPadding: f, collisionBoundary: m, collisionPadding: v, sticky: h, hideWhenDetached: g, avoidCollisions: w, ...y } = t, C = Ze(tt, o), [x, P] = i.useState(null), [R, S] = i.useState(null), _ = G(n, P), [A, O] = i.useState(null), [E, I] = i.useState(null), M = nr(o), [D, V] = i.useState(false), N = i.useRef(false);
  i.useEffect(() => {
    if (x) return vn(x);
  }, [x]), Ct();
  const j = i.useCallback((F) => {
    const [W, ...re] = M().map((q) => q.ref.current), [z] = re.slice(-1), Y = document.activeElement;
    for (const q of F) if (q === Y || (q == null ? void 0 : q.scrollIntoView({ block: "nearest" }), q === W && R && (R.scrollTop = 0), q === z && R && (R.scrollTop = R.scrollHeight), q == null ? void 0 : q.focus(), document.activeElement !== Y)) return;
  }, [M, R]), L = i.useCallback(() => j([A, x]), [j, A, x]);
  i.useEffect(() => {
    D && L();
  }, [D, L]);
  const { onOpenChange: B, triggerPointerDownPosRef: $ } = C;
  i.useEffect(() => {
    if (x) {
      let F = { x: 0, y: 0 };
      const W = U((z) => {
        var _a3, _b;
        F = { x: Math.abs(Math.round(z.pageX) - (((_a3 = $.current) == null ? void 0 : _a3.x) ?? 0)), y: Math.abs(Math.round(z.pageY) - (((_b = $.current) == null ? void 0 : _b.y) ?? 0)) };
      }, "handlePointerMove"), re = U((z) => {
        F.x <= 10 && F.y <= 10 ? z.preventDefault() : z.composedPath().includes(x) || B(false), document.removeEventListener("pointermove", W), $.current = null;
      }, "handlePointerUp");
      return $.current !== null && (document.addEventListener("pointermove", W), document.addEventListener("pointerup", re, { capture: true, once: true })), () => {
        document.removeEventListener("pointermove", W), document.removeEventListener("pointerup", re, { capture: true });
      };
    }
  }, [x, B, $]), i.useEffect(() => {
    const F = U(() => B(false), "close");
    return window.addEventListener("blur", F), window.addEventListener("resize", F), () => {
      window.removeEventListener("blur", F), window.removeEventListener("resize", F);
    };
  }, [B]);
  const [ee, H] = rr((F) => {
    const W = M().filter((Y) => !Y.disabled), re = W.find((Y) => Y.ref.current === document.activeElement), z = sr(W, F, re);
    z && setTimeout(() => {
      var _a3;
      return (_a3 = z.ref.current) == null ? void 0 : _a3.focus();
    });
  }), X = i.useCallback((F, W, re) => {
    const z = !N.current && !re;
    (C.value !== void 0 && C.value === W || z) && (O(F), z && (N.current = true));
  }, [C.value]), le = i.useCallback(() => x == null ? void 0 : x.focus(), [x]), ve = i.useCallback((F, W, re) => {
    const z = !N.current && !re;
    (C.value !== void 0 && C.value === W || z) && I(F);
  }, [C.value]), Te = r === "popper" ? Br : ap, de = Te === Br ? { side: l, sideOffset: u, align: p, alignOffset: d, arrowPadding: f, collisionBoundary: m, collisionPadding: v, sticky: h, hideWhenDetached: g, avoidCollisions: w } : {};
  return b.jsx(qi, { scope: o, content: x, viewport: R, onViewportChange: S, itemRefCallback: X, selectedItem: A, onItemLeave: le, itemTextRefCallback: ve, focusSelectedItem: L, selectedItemText: E, position: r, isPositioned: D, searchRef: ee, children: b.jsx(kt, { as: ip, allowPinchZoom: true, children: b.jsx(pn, { asChild: true, trapped: C.open, onMountAutoFocus: (F) => {
    F.preventDefault();
  }, onUnmountAutoFocus: T(s, (F) => {
    var _a3;
    (_a3 = C.trigger) == null ? void 0 : _a3.focus({ preventScroll: true }), F.preventDefault();
  }), children: b.jsx(Dt, { asChild: true, disableOutsidePointerEvents: true, onEscapeKeyDown: c, onPointerDownOutside: a, onFocusOutside: (F) => F.preventDefault(), onDismiss: () => C.onOpenChange(false), children: b.jsx(Te, { role: "listbox", id: C.contentId, "data-state": C.open ? "open" : "closed", dir: C.dir, onContextMenu: (F) => F.preventDefault(), ...y, ...de, onPlaced: () => V(true), ref: _, style: { display: "flex", flexDirection: "column", outline: "none", ...y.style }, onKeyDown: T(y.onKeyDown, (F) => {
    const W = F.ctrlKey || F.altKey || F.metaKey;
    if (F.key === "Tab" && F.preventDefault(), !W && F.key.length === 1 && H(F.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(F.key)) {
      let z = M().filter((Y) => !Y.disabled).map((Y) => Y.ref.current);
      if (["ArrowUp", "End"].includes(F.key) && (z = z.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(F.key)) {
        const Y = F.target, q = z.indexOf(Y);
        z = z.slice(q + 1);
      }
      setTimeout(() => j(z)), F.preventDefault();
    }
  }) }) }) }) }) });
}, "SelectContentImpl")), ap = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, onPlaced: r, ...s } = t, c = Ze(tt, o), a = Fn(tt, o), [l, u] = i.useState(null), [p, d] = i.useState(null), f = G(n, d), m = nr(o), v = i.useRef(false), h = i.useRef(true), { viewport: g, selectedItem: w, selectedItemText: y, focusSelectedItem: C } = a, x = i.useCallback(() => {
    if (c.trigger && c.valueNode && l && p && g && w && y) {
      const _ = c.trigger.getBoundingClientRect(), A = p.getBoundingClientRect(), O = c.valueNode.getBoundingClientRect(), E = y.getBoundingClientRect();
      if (c.dir !== "rtl") {
        const Y = E.left - A.left, q = O.left - Y, _e2 = _.left - q, he = _.width + _e2, Nn = Math.max(he, A.width), jn = window.innerWidth - Ce, Ln = go(q, [Ce, Math.max(Ce, jn - Nn)]);
        l.style.minWidth = he + "px", l.style.left = Ln + "px";
      } else {
        const Y = A.right - E.right, q = window.innerWidth - O.right - Y, _e2 = window.innerWidth - _.right - q, he = _.width + _e2, Nn = Math.max(he, A.width), jn = window.innerWidth - Ce, Ln = go(q, [Ce, Math.max(Ce, jn - Nn)]);
        l.style.minWidth = he + "px", l.style.right = Ln + "px";
      }
      const I = m(), M = window.innerHeight - Ce * 2, D = g.scrollHeight, V = window.getComputedStyle(p), N = parseInt(V.borderTopWidth, 10), j = parseInt(V.paddingTop, 10), L = parseInt(V.borderBottomWidth, 10), B = parseInt(V.paddingBottom, 10), $ = N + j + D + B + L, ee = Math.min(w.offsetHeight * 5, $), H = window.getComputedStyle(g), X = parseInt(H.paddingTop, 10), le = parseInt(H.paddingBottom, 10), ve = _.top + _.height / 2 - Ce, Te = M - ve, de = w.offsetHeight / 2, F = w.offsetTop + de, W = N + j + F, re = $ - W;
      if (W <= ve) {
        const Y = I.length > 0 && w === I[I.length - 1].ref.current;
        l.style.bottom = "0px";
        const q = p.clientHeight - g.offsetTop - g.offsetHeight, _e2 = Math.max(Te, de + (Y ? le : 0) + q + L), he = W + _e2;
        l.style.height = he + "px";
      } else {
        const Y = I.length > 0 && w === I[0].ref.current;
        l.style.top = "0px";
        const _e2 = Math.max(ve, N + g.offsetTop + (Y ? X : 0) + de) + re;
        l.style.height = _e2 + "px", g.scrollTop = W - ve + g.offsetTop;
      }
      l.style.margin = `${Ce}px 0`, l.style.minHeight = ee + "px", l.style.maxHeight = M + "px", r == null ? void 0 : r(), requestAnimationFrame(() => v.current = true);
    }
  }, [m, c.trigger, c.valueNode, l, p, g, w, y, c.dir, r]);
  Q(() => x(), [x]);
  const [P, R] = i.useState();
  Q(() => {
    p && R(window.getComputedStyle(p).zIndex);
  }, [p]);
  const S = i.useCallback((_) => {
    _ && h.current === true && (x(), C == null ? void 0 : C(), h.current = false);
  }, [x, C]);
  return b.jsx(lp, { scope: o, contentWrapper: l, shouldExpandOnScrollRef: v, onScrollButtonChange: S, children: b.jsx("div", { ref: u, style: { display: "flex", flexDirection: "column", position: "fixed", zIndex: P }, children: b.jsx(k.div, { ...s, ref: f, style: { boxSizing: "border-box", maxHeight: "100%", ...s.style } }) }) });
}, "SelectItemAlignedPosition")), Br = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, align: r = "start", collisionPadding: s = Ce, ...c } = t, a = or(o);
  return b.jsx(Pn, { ...a, ...c, ref: n, align: r, collisionPadding: s, style: { boxSizing: "border-box", ...c.style, "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-select-content-available-width": "var(--radix-popper-available-width)", "--radix-select-content-available-height": "var(--radix-popper-available-height)", "--radix-select-trigger-width": "var(--radix-popper-anchor-width)", "--radix-select-trigger-height": "var(--radix-popper-anchor-height)" } });
}, "SelectPopperPosition")), [lp, up] = ct(tt, {}), Ur = "SelectViewport", Jv = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, nonce: r, ...s } = t, c = Fn(Ur, o), a = up(Ur, o), l = G(n, c.onViewportChange), u = i.useRef(0);
  return b.jsxs(b.Fragment, { children: [b.jsx("style", { dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" }, nonce: r }), b.jsx(Dn.Slot, { scope: o, children: b.jsx(k.div, { "data-radix-select-viewport": "", role: "presentation", ...s, ref: l, style: { position: "relative", flex: 1, overflow: "hidden auto", ...s.style }, onScroll: T(s.onScroll, (p) => {
    const d = p.currentTarget, { contentWrapper: f, shouldExpandOnScrollRef: m } = a;
    if ((m == null ? void 0 : m.current) && f) {
      const v = Math.abs(u.current - d.scrollTop);
      if (v > 0) {
        const h = window.innerHeight - Ce * 2, g = parseFloat(f.style.minHeight), w = parseFloat(f.style.height), y = Math.max(g, w);
        if (y < h) {
          const C = y + v, x = Math.min(h, C), P = C - x;
          f.style.height = x + "px", f.style.bottom === "0px" && (d.scrollTop = P > 0 ? P : 0, f.style.justifyContent = "flex-end");
        }
      }
    }
    u.current = d.scrollTop;
  }) }) })] });
}, "SelectViewport")), dp = "SelectGroup", [eh, th] = ct(dp), bo = "SelectItem", [fp, Zi] = ct(bo), nh = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, value: r, disabled: s = false, textValue: c, ...a } = t, l = Ze(bo, o), u = Fn(bo, o), p = l.value === r, [d, f] = i.useState(c ?? ""), [m, v] = i.useState(false), h = be((x) => {
    var _a3;
    return (_a3 = u.itemRefCallback) == null ? void 0 : _a3.call(u, x, r, s);
  }), g = G(n, h), w = fe(), y = i.useRef("touch"), C = U(() => {
    s || (l.onValueChange(r), l.onOpenChange(false));
  }, "handleSelect");
  return b.jsx(fp, { scope: o, value: r, disabled: s, textId: w, isSelected: p, onItemTextChange: i.useCallback((x) => {
    f((P) => P || ((x == null ? void 0 : x.textContent) ?? "").trim());
  }, []), children: b.jsx(Dn.ItemSlot, { scope: o, value: r, disabled: s, textValue: d, children: b.jsx(k.div, { role: "option", "aria-labelledby": w, "data-highlighted": m ? "" : void 0, "aria-selected": p && m, "data-state": p ? "checked" : "unchecked", "aria-disabled": s || void 0, "data-disabled": s ? "" : void 0, tabIndex: s ? void 0 : -1, ...a, ref: g, onFocus: T(a.onFocus, () => v(true)), onBlur: T(a.onBlur, () => v(false)), onClick: T(a.onClick, () => {
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
    s || x.target !== x.currentTarget || ((_a3 = u.searchRef) == null ? void 0 : _a3.current) !== "" && x.key === " " || (Xf.includes(x.key) && C(), x.key === " " && x.preventDefault());
  }) }) }) });
}, "SelectItem")), Jt = "SelectItemText", oh = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, className: r, style: s, ...c } = t, a = Ze(Jt, o), l = Fn(Jt, o), u = Zi(Jt, o), p = Jf(Jt, o), [d, f] = i.useState(null), m = be((C) => {
    var _a3;
    return (_a3 = l.itemTextRefCallback) == null ? void 0 : _a3.call(l, C, u.value, u.disabled);
  }), v = G(n, f, u.onItemTextChange, m), h = d == null ? void 0 : d.textContent, g = i.useMemo(() => b.jsx("option", { value: u.value, disabled: u.disabled, children: h }, u.value), [u.disabled, u.value, h]), { onNativeOptionAdd: w, onNativeOptionRemove: y } = p;
  return Q(() => (w(g), () => y(g)), [w, y, g]), b.jsxs(b.Fragment, { children: [b.jsx(k.span, { id: u.textId, ...c, ref: v }), u.isSelected && a.valueNode && !a.valueNodeHasChildren && !Ut(a.value) ? gt.createPortal(c.children, a.valueNode) : null] });
}, "SelectItemText")), pp = "SelectItemIndicator", rh = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, ...r } = t;
  return Zi(pp, o).isSelected ? b.jsx(k.span, { "aria-hidden": true, ...r, ref: n }) : null;
}, "SelectItemIndicator")), sh = i.forwardRef(U(function(t, n) {
  const { __scopeSelect: o, ...r } = t;
  return b.jsx(k.div, { "aria-hidden": true, ...r, ref: n });
}, "SelectSeparator")), mp = "SelectBubbleInput", vp = i.forwardRef(U(function({ __scopeSelect: t, ...n }, o) {
  const r = Ze(mp, t), { value: s, onValueChange: c, required: a, disabled: l, name: u, autoComplete: p, form: d } = r, { nativeOptions: f, nativeSelectKey: m } = r, v = i.useRef(null), h = G(o, v), g = s ?? "", w = Li(g), y = Array.from(f).some((C) => (C.props.value ?? "") === "");
  return i.useEffect(() => {
    const C = v.current;
    if (!C) return;
    const x = window.HTMLSelectElement.prototype, R = Object.getOwnPropertyDescriptor(x, "value").set;
    if (w !== g && R) {
      const S = new Event("change", { bubbles: true });
      R.call(C, g), C.dispatchEvent(S);
    }
  }, [w, g]), b.jsxs(k.select, { "aria-hidden": true, required: a, tabIndex: -1, name: u, autoComplete: p, disabled: l, form: d, onChange: (C) => c(C.target.value), ...n, style: { ...ts, ...n.style }, ref: h, defaultValue: g, children: [Ut(s) && !y ? b.jsx("option", { value: "" }) : null, Array.from(f)] }, m);
}, "SelectBubbleInput"));
function Qi(e) {
  return typeof e == "function";
}
U(Qi, "isFunction");
function Ut(e) {
  return e === "" || e === void 0;
}
U(Ut, "shouldShowPlaceholder");
function rr(e) {
  const t = be(e), n = i.useRef(""), o = i.useRef(0), r = i.useCallback((c) => {
    const a = n.current + c;
    t(a), U((function l(u) {
      n.current = u, window.clearTimeout(o.current), u !== "" && (o.current = window.setTimeout(() => l(""), 1e3));
    }), "updateSearch")(a);
  }, [t]), s = i.useCallback(() => {
    n.current = "", window.clearTimeout(o.current);
  }, []);
  return i.useEffect(() => () => window.clearTimeout(o.current), []), [n, r, s];
}
U(rr, "useTypeaheadSearch");
function sr(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, s = n ? e.indexOf(n) : -1;
  let c = Ji(e, Math.max(s, 0));
  r.length === 1 && (c = c.filter((u) => u !== n));
  const l = c.find((u) => u.textValue.toLowerCase().startsWith(r.toLowerCase()));
  return l !== n ? l : void 0;
}
U(sr, "findNextItem");
function Ji(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
U(Ji, "wrapArray");
var hp = Object.defineProperty, Ke = (e, t) => hp(e, "name", { value: t, configurable: true }), ir = "Switch", [gp, ih] = J(ir), [bp, cr] = gp(ir);
function ec(e) {
  const { __scopeSwitch: t, checked: n, children: o, defaultChecked: r, disabled: s, form: c, name: a, onCheckedChange: l, required: u, value: p = "on", internal_do_not_use_render: d } = e, [f, m] = ie({ prop: n, defaultProp: r ?? false, onChange: l, caller: ir }), [v, h] = i.useState(null), [g, w] = i.useState(null), y = i.useRef(false), [C, x] = i.useReducer((S) => S + 1, 0), P = v ? !!c || !!v.closest("form") : true, R = { checked: f, setChecked: m, disabled: s, control: v, setControl: h, name: a, form: c, value: p, hasConsumerStoppedPropagationRef: y, userInteractionCount: C, onUserInteraction: x, required: u, defaultChecked: r, isFormControl: P, bubbleInput: g, setBubbleInput: w };
  return b.jsx(bp, { scope: t, ...R, children: tc(d) ? d(R) : o });
}
Ke(ec, "SwitchProvider");
var Cp = "SwitchTrigger", xp = i.forwardRef(Ke(function({ __scopeSwitch: t, onClick: n, ...o }, r) {
  const { control: s, form: c, value: a, disabled: l, checked: u, required: p, setControl: d, setChecked: f, hasConsumerStoppedPropagationRef: m, onUserInteraction: v, isFormControl: h, bubbleInput: g } = cr(Cp, t), w = G(r, d), y = i.useRef(u);
  return i.useEffect(() => {
    const C = c ? s == null ? void 0 : s.ownerDocument.getElementById(c) : s == null ? void 0 : s.form;
    if (C instanceof HTMLFormElement) {
      const x = Ke(() => f(y.current), "reset");
      return C.addEventListener("reset", x), () => C.removeEventListener("reset", x);
    }
  }, [s, c, f]), b.jsx(k.button, { type: "button", role: "switch", "aria-checked": u, "aria-required": p, "data-state": ar(u), "data-disabled": l ? "" : void 0, disabled: l, value: a, ...o, ref: w, onClick: T(n, (C) => {
    v(), f((x) => !x), g && h && (m.current = C.isPropagationStopped(), m.current || C.stopPropagation());
  }) });
}, "SwitchTrigger")), ch = i.forwardRef(Ke(function(t, n) {
  const { __scopeSwitch: o, name: r, checked: s, defaultChecked: c, required: a, disabled: l, value: u, onCheckedChange: p, form: d, ...f } = t;
  return b.jsx(ec, { __scopeSwitch: o, checked: s, defaultChecked: c, disabled: l, required: a, onCheckedChange: p, name: r, form: d, value: u, internal_do_not_use_render: ({ isFormControl: m }) => b.jsxs(b.Fragment, { children: [b.jsx(xp, { ...f, ref: n, __scopeSwitch: o }), m && b.jsx(Rp, { __scopeSwitch: o })] }) });
}, "Switch")), wp = "SwitchThumb", ah = i.forwardRef(Ke(function(t, n) {
  const { __scopeSwitch: o, ...r } = t, s = cr(wp, o);
  return b.jsx(k.span, { "data-state": ar(s.checked), "data-disabled": s.disabled ? "" : void 0, ...r, ref: n });
}, "SwitchThumb")), yp = "SwitchBubbleInput", Rp = i.forwardRef(Ke(function({ __scopeSwitch: t, onClick: n, ...o }, r) {
  const { control: s, hasConsumerStoppedPropagationRef: c, userInteractionCount: a, checked: l, defaultChecked: u, required: p, disabled: d, name: f, value: m, form: v, bubbleInput: h, setBubbleInput: g } = cr(yp, t), w = G(r, g), y = Nt(s), C = i.useRef(false), x = i.useRef(l), P = i.useRef(a);
  i.useEffect(() => {
    const S = h;
    if (!S) return;
    const _ = window.HTMLInputElement.prototype, O = Object.getOwnPropertyDescriptor(_, "checked").set, E = a !== P.current;
    P.current = a;
    const I = x.current !== l;
    x.current = l;
    const M = !(E && c.current);
    if (I && O) {
      C.current = !E;
      const D = new Event("click", { bubbles: M });
      O.call(S, l), S.dispatchEvent(D), C.current = false;
    }
  }, [h, l, c, a]);
  const R = i.useRef(l);
  return b.jsx(k.input, { type: "checkbox", "aria-hidden": true, defaultChecked: u ?? R.current, required: p, disabled: d, name: f, value: m, form: v, ...o, tabIndex: -1, ref: w, onClick: T(n, (S) => {
    C.current && S.stopPropagation();
  }), style: { ...o.style, ...y, position: "absolute", pointerEvents: "none", opacity: 0, margin: 0, transform: "translateX(-100%)" } });
}, "SwitchBubbleInput"));
function tc(e) {
  return typeof e == "function";
}
Ke(tc, "isFunction");
function ar(e) {
  return e ? "checked" : "unchecked";
}
Ke(ar, "getState");
var Pp = Object.defineProperty, Rt = (e, t) => Pp(e, "name", { value: t, configurable: true }), lr = "Tabs", [Sp, lh] = J(lr, [qe]), nc = qe(), [Ep, ur] = Sp(lr), Ip = i.forwardRef(Rt(function(t, n) {
  const { __scopeTabs: o, value: r, onValueChange: s, defaultValue: c, orientation: a = "horizontal", dir: l, activationMode: u = "automatic", ...p } = t, d = ot(l), [f, m] = ie({ prop: r, onChange: s, defaultProp: c ?? "", caller: lr });
  return b.jsx(Ep, { scope: o, baseId: fe(), value: f, onValueChange: m, orientation: a, dir: d, activationMode: u, children: b.jsx(k.div, { dir: d, "data-orientation": a, ...p, ref: n }) });
}, "Tabs")), Tp = "TabsList", _p = i.forwardRef(Rt(function(t, n) {
  const { __scopeTabs: o, loop: r = true, ...s } = t, c = ur(Tp, o), a = nc(o);
  return b.jsx(En, { asChild: true, ...a, orientation: c.orientation, dir: c.dir, loop: r, children: b.jsx(k.div, { role: "tablist", "aria-orientation": c.orientation, ...s, ref: n }) });
}, "TabsList")), Ap = "TabsTrigger", Mp = i.forwardRef(Rt(function(t, n) {
  const { __scopeTabs: o, value: r, disabled: s = false, ...c } = t, a = ur(Ap, o), l = nc(o), u = dr(a.baseId, r), p = fr(a.baseId, r), d = r === a.value;
  return b.jsx(In, { asChild: true, ...l, focusable: !s, active: d, children: b.jsx(k.button, { type: "button", role: "tab", "aria-selected": d, "aria-controls": p, "data-state": d ? "active" : "inactive", "data-disabled": s ? "" : void 0, disabled: s, id: u, ...c, ref: n, onMouseDown: T(t.onMouseDown, (f) => {
    !s && f.button === 0 && f.ctrlKey === false ? a.onValueChange(r) : f.preventDefault();
  }), onKeyDown: T(t.onKeyDown, (f) => {
    s || f.target !== f.currentTarget || [" ", "Enter"].includes(f.key) && a.onValueChange(r);
  }), onFocus: T(t.onFocus, () => {
    const f = a.activationMode !== "manual";
    !d && !s && f && a.onValueChange(r);
  }) }) });
}, "TabsTrigger")), Op = "TabsContent", $p = i.forwardRef(Rt(function(t, n) {
  const { __scopeTabs: o, value: r, forceMount: s, children: c, ...a } = t, l = ur(Op, o), u = dr(l.baseId, r), p = fr(l.baseId, r), d = r === l.value, f = i.useRef(d);
  return i.useEffect(() => {
    const m = requestAnimationFrame(() => f.current = false);
    return () => cancelAnimationFrame(m);
  }, []), b.jsx(pe, { present: s || d, children: ({ present: m }) => b.jsx(k.div, { "data-state": d ? "active" : "inactive", "data-orientation": l.orientation, role: "tabpanel", "aria-labelledby": u, hidden: !m, id: p, tabIndex: 0, ...a, ref: n, style: { ...t.style, animationDuration: f.current ? "0s" : void 0 }, children: m && c }) });
}, "TabsContent"));
function dr(e, t) {
  return `${e}-trigger-${t}`;
}
Rt(dr, "makeTriggerId");
function fr(e, t) {
  return `${e}-content-${t}`;
}
Rt(fr, "makeContentId");
var uh = Ip, dh = _p, fh = Mp, ph = $p, Dp = Object.defineProperty, Fp = (e, t) => Dp(e, "name", { value: t, configurable: true }), kp = "Toggle", Np = i.forwardRef(Fp(function(t, n) {
  const { pressed: o, defaultPressed: r, onPressedChange: s, ...c } = t, [a, l] = ie({ prop: o, onChange: s, defaultProp: r ?? false, caller: kp });
  return b.jsx(k.button, { type: "button", "aria-pressed": a, "data-state": a ? "on" : "off", "data-disabled": t.disabled ? "" : void 0, ...c, ref: n, onClick: T(t.onClick, () => {
    t.disabled || l(!a);
  }) });
}, "Toggle")), jp = Object.defineProperty, ze = (e, t) => jp(e, "name", { value: t, configurable: true }), Pt = "ToggleGroup", [oc, mh] = J(Pt, [qe]), rc = qe(), vh = i.forwardRef(ze(function(t, n) {
  const { type: o, ...r } = t;
  if (o === "single") {
    const s = r;
    return b.jsx(Lp, { role: "radiogroup", ...s, ref: n });
  }
  if (o === "multiple") {
    const s = r;
    return b.jsx(Vp, { role: "toolbar", ...s, ref: n });
  }
  throw new Error(`Missing prop \`type\` expected on \`${Pt}\``);
}, "ToggleGroup")), [sc, ic] = oc(Pt), Lp = i.forwardRef(ze(function(t, n) {
  const { value: o, defaultValue: r, onValueChange: s = ze(() => {
  }, "onValueChange"), ...c } = t, [a, l] = ie({ prop: o, defaultProp: r ?? "", onChange: s, caller: Pt });
  return b.jsx(sc, { scope: t.__scopeToggleGroup, type: "single", value: i.useMemo(() => a ? [a] : [], [a]), onItemActivate: l, onItemDeactivate: i.useCallback(() => l(""), [l]), children: b.jsx(cc, { ...c, ref: n }) });
}, "ToggleGroupImplSingle")), Vp = i.forwardRef(ze(function(t, n) {
  const { value: o, defaultValue: r, onValueChange: s = ze(() => {
  }, "onValueChange"), ...c } = t, [a, l] = ie({ prop: o, defaultProp: r ?? [], onChange: s, caller: Pt }), u = i.useCallback((d) => l((f = []) => [...f, d]), [l]), p = i.useCallback((d) => l((f = []) => f.filter((m) => m !== d)), [l]);
  return b.jsx(sc, { scope: t.__scopeToggleGroup, type: "multiple", value: a, onItemActivate: u, onItemDeactivate: p, children: b.jsx(cc, { ...c, ref: n }) });
}, "ToggleGroupImplMultiple")), [Gp, Bp] = oc(Pt), cc = i.forwardRef(ze(function(t, n) {
  const { __scopeToggleGroup: o, disabled: r = false, rovingFocus: s = true, orientation: c, dir: a, loop: l = true, ...u } = t, p = rc(o), d = ot(a), f = { dir: d, ...u };
  return b.jsx(Gp, { scope: o, rovingFocus: s, disabled: r, children: s ? b.jsx(En, { asChild: true, ...p, orientation: c, dir: d, loop: l, children: b.jsx(k.div, { ...f, ref: n }) }) : b.jsx(k.div, { ...f, ref: n }) });
}, "ToggleGroupImpl")), Co = "ToggleGroupItem", hh = i.forwardRef(ze(function(t, n) {
  const o = ic(Co, t.__scopeToggleGroup), r = Bp(Co, t.__scopeToggleGroup), s = rc(t.__scopeToggleGroup), c = o.value.includes(t.value), a = r.disabled || t.disabled, l = { ...t, pressed: c, disabled: a }, u = i.useRef(null);
  return r.rovingFocus ? b.jsx(In, { asChild: true, ...s, focusable: !a, active: c, ref: u, children: b.jsx(Hr, { ...l, ref: n }) }) : b.jsx(Hr, { ...l, ref: n });
}, "ToggleGroupItem")), Hr = i.forwardRef(ze(function(t, n) {
  const { __scopeToggleGroup: o, value: r, ...s } = t, c = ic(Co, o), a = { role: "radio", "aria-checked": t.pressed, "aria-pressed": void 0 }, l = c.type === "single" ? a : void 0;
  return b.jsx(Np, { ...l, ...s, ref: n, onPressedChange: (u) => {
    u ? c.onItemActivate(r) : c.onItemDeactivate(r);
  } });
}, "ToggleGroupItemImpl")), Up = Object.defineProperty, Z = (e, t) => Up(e, "name", { value: t, configurable: true }), [pr, gh] = J("Tooltip", [Xe]), kn = Xe(), Hp = "TooltipProvider", Wp = 700, xo = "tooltip.open", [Kp, mr] = pr(Hp), zp = Z((e) => {
  const { __scopeTooltip: t, delayDuration: n = Wp, skipDelayDuration: o = 300, disableHoverableContent: r = false, children: s } = e, c = i.useRef(true), a = i.useRef(false), l = i.useRef(0);
  return i.useEffect(() => {
    const u = l.current;
    return () => window.clearTimeout(u);
  }, []), b.jsx(Kp, { scope: t, isOpenDelayedRef: c, delayDuration: n, onOpen: i.useCallback(() => {
    o <= 0 || (window.clearTimeout(l.current), c.current = false);
  }, [o]), onClose: i.useCallback(() => {
    o <= 0 || (window.clearTimeout(l.current), l.current = window.setTimeout(() => c.current = true, o));
  }, [o]), isPointerInTransitRef: a, onPointerInTransitChange: i.useCallback((u) => {
    a.current = u;
  }, []), disableHoverableContent: r, children: s });
}, "TooltipProvider"), wo = "Tooltip", [Yp, Ht] = pr(wo), Xp = Z((e) => {
  const { __scopeTooltip: t, children: n, open: o, defaultOpen: r, onOpenChange: s, disableHoverableContent: c, delayDuration: a } = e, l = mr(wo, e.__scopeTooltip), u = kn(t), [p, d] = i.useState(null), [f, m] = i.useState(void 0), v = fe(), h = i.useRef(0), g = c ?? l.disableHoverableContent, w = a ?? l.delayDuration, y = i.useRef(false), [C, x] = ie({ prop: o, defaultProp: r ?? false, onChange: Z((O) => {
    O ? (l.onOpen(), document.dispatchEvent(new CustomEvent(xo))) : l.onClose(), s == null ? void 0 : s(O);
  }, "onChange"), caller: wo }), P = i.useMemo(() => C ? y.current ? "delayed-open" : "instant-open" : "closed", [C]), R = i.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, y.current = false, x(true);
  }, [x]), S = i.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, x(false);
  }, [x]), _ = i.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      y.current = true, x(true), h.current = 0;
    }, w);
  }, [w, x]);
  i.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []);
  const A = f ?? v;
  return b.jsx(Rn, { ...u, children: b.jsx(Yp, { scope: t, contentId: A, setContentId: m, open: C, stateAttribute: P, trigger: p, onTriggerChange: d, onTriggerEnter: i.useCallback(() => {
    l.isOpenDelayedRef.current ? _() : R();
  }, [l.isOpenDelayedRef, _, R]), onTriggerLeave: i.useCallback(() => {
    g ? S() : (window.clearTimeout(h.current), h.current = 0);
  }, [S, g]), onOpen: R, onClose: S, disableHoverableContent: g, children: n }) });
}, "Tooltip"), Wr = "TooltipTrigger", qp = i.forwardRef(Z(function(t, n) {
  const { __scopeTooltip: o, ...r } = t, s = Ht(Wr, o), c = mr(Wr, o), a = kn(o), l = i.useRef(null), u = G(n, l, s.onTriggerChange), p = i.useRef(false), d = i.useRef(false), f = i.useCallback(() => p.current = false, []);
  return i.useEffect(() => () => document.removeEventListener("pointerup", f), [f]), b.jsx(jt, { asChild: true, ...a, children: b.jsx(k.button, { "aria-describedby": s.open ? s.contentId : void 0, "data-state": s.stateAttribute, ...r, ref: u, onPointerMove: T(t.onPointerMove, (m) => {
    m.pointerType !== "touch" && !d.current && !c.isPointerInTransitRef.current && (s.onTriggerEnter(), d.current = true);
  }), onPointerLeave: T(t.onPointerLeave, () => {
    s.onTriggerLeave(), d.current = false;
  }), onPointerDown: T(t.onPointerDown, () => {
    s.open && s.onClose(), p.current = true, document.addEventListener("pointerup", f, { once: true });
  }), onFocus: T(t.onFocus, () => {
    p.current || s.onOpen();
  }), onBlur: T(t.onBlur, s.onClose), onClick: T(t.onClick, s.onClose) }) });
}, "TooltipTrigger")), ac = "TooltipPortal", [Zp, Qp] = pr(ac, { forceMount: void 0 }), Jp = Z((e) => {
  const { __scopeTooltip: t, forceMount: n, children: o, container: r } = e, s = Ht(ac, t);
  return b.jsx(Zp, { scope: t, forceMount: n, children: b.jsx(pe, { present: n || s.open, children: b.jsx(Ft, { asChild: true, container: r, children: o }) }) });
}, "TooltipPortal"), Ot = "TooltipContent", em = i.forwardRef(Z(function(t, n) {
  const o = Qp(Ot, t.__scopeTooltip), { forceMount: r = o.forceMount, side: s = "top", ...c } = t, a = Ht(Ot, t.__scopeTooltip);
  return b.jsx(pe, { present: r || a.open, children: a.disableHoverableContent ? b.jsx(lc, { side: s, ...c, ref: n }) : b.jsx(tm, { side: s, ...c, ref: n }) });
}, "TooltipContent")), tm = i.forwardRef(Z(function(t, n) {
  const o = Ht(Ot, t.__scopeTooltip), r = mr(Ot, t.__scopeTooltip), s = i.useRef(null), c = G(n, s), [a, l] = i.useState(null), { trigger: u, onClose: p } = o, d = s.current, { onPointerInTransitChange: f } = r, m = i.useCallback(() => {
    l(null), f(false);
  }, [f]), v = i.useCallback((h, g) => {
    const w = h.currentTarget, y = { x: h.clientX, y: h.clientY }, C = uc(y, w.getBoundingClientRect()), x = dc(y, C), P = fc(g.getBoundingClientRect()), R = mc([...x, ...P]);
    l(R), f(true);
  }, [f]);
  return i.useEffect(() => () => m(), [m]), i.useEffect(() => {
    if (u && d) {
      const h = Z((w) => v(w, d), "handleTriggerLeave"), g = Z((w) => v(w, u), "handleContentLeave");
      return u.addEventListener("pointerleave", h), d.addEventListener("pointerleave", g), () => {
        u.removeEventListener("pointerleave", h), d.removeEventListener("pointerleave", g);
      };
    }
  }, [u, d, v, m]), i.useEffect(() => {
    if (a) {
      const h = Z((g) => {
        const w = g.target, y = { x: g.clientX, y: g.clientY }, C = (u == null ? void 0 : u.contains(w)) || (d == null ? void 0 : d.contains(w)), x = !pc(y, a);
        C ? m() : x && (m(), p());
      }, "handleTrackPointerGrace");
      return document.addEventListener("pointermove", h), () => document.removeEventListener("pointermove", h);
    }
  }, [u, d, a, p, m]), b.jsx(lc, { ...t, ref: c });
}, "TooltipContentHoverable")), nm = qr("TooltipContent"), lc = i.forwardRef(Z(function(t, n) {
  const { __scopeTooltip: o, children: r, "aria-label": s, id: c, onEscapeKeyDown: a, onPointerDownOutside: l, ...u } = t, p = Ht(Ot, o), d = kn(o), { onClose: f } = p;
  i.useEffect(() => (document.addEventListener(xo, f), () => document.removeEventListener(xo, f)), [f]), i.useEffect(() => {
    if (p.trigger) {
      const v = Z((h) => {
        h.target instanceof Node && h.target.contains(p.trigger) && f();
      }, "handleScroll");
      return window.addEventListener("scroll", v, { capture: true }), () => window.removeEventListener("scroll", v, { capture: true });
    }
  }, [p.trigger, f]);
  const { setContentId: m } = p;
  return Q(() => (m(c), () => {
    m(void 0);
  }), [c, m]), b.jsx(Dt, { asChild: true, disableOutsidePointerEvents: false, onEscapeKeyDown: a, onPointerDownOutside: l, onFocusOutside: (v) => v.preventDefault(), onDismiss: f, children: b.jsxs(Pn, { "data-state": p.stateAttribute, role: s ? void 0 : "tooltip", id: s ? void 0 : p.contentId, ...d, ...u, ref: n, style: { ...u.style, "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)", "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)", "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)", "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)" }, children: [b.jsx(nm, { children: r }), s ? b.jsx(Uc, { id: p.contentId, role: "tooltip", children: s }) : null] }) });
}, "TooltipContentImpl")), om = i.forwardRef(Z(function(t, n) {
  const { __scopeTooltip: o, ...r } = t, s = kn(o);
  return b.jsx(ni, { ...s, ...r, ref: n });
}, "TooltipArrow"));
function uc(e, t) {
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
Z(uc, "getExitSideFromRect");
function dc(e, t, n = 5) {
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
Z(dc, "getPaddedExitPoints");
function fc(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [{ x: r, y: t }, { x: n, y: t }, { x: n, y: o }, { x: r, y: o }];
}
Z(fc, "getPointsFromRect");
function pc(e, t) {
  const { x: n, y: o } = e;
  let r = false;
  for (let s = 0, c = t.length - 1; s < t.length; c = s++) {
    const a = t[s], l = t[c], u = a.x, p = a.y, d = l.x, f = l.y;
    p > o != f > o && n < (d - u) * (o - p) / (f - p) + u && (r = !r);
  }
  return r;
}
Z(pc, "isPointInPolygon");
function mc(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), vc(t);
}
Z(mc, "getHull");
function vc(e) {
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
Z(vc, "getHullPresorted");
var bh = zp, Ch = Xp, xh = qp, wh = Jp, yh = em, Rh = om;
function ce() {
  return ce = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
  }, ce.apply(null, arguments);
}
function ke(e, t, { checkForDefaultPrevented: n = true } = {}) {
  return function(r) {
    if (e == null ? void 0 : e(r), n === false || !r.defaultPrevented) return t == null ? void 0 : t(r);
  };
}
function vr(e, t = []) {
  let n = [];
  function o(s, c) {
    const a = i.createContext(c), l = n.length;
    n = [...n, c];
    function u(d) {
      const { scope: f, children: m, ...v } = d, h = (f == null ? void 0 : f[e][l]) || a, g = i.useMemo(() => v, Object.values(v));
      return i.createElement(h.Provider, { value: g }, m);
    }
    function p(d, f) {
      const m = (f == null ? void 0 : f[e][l]) || a, v = i.useContext(m);
      if (v) return v;
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
  return r.scopeName = e, [o, rm(r, ...t)];
}
function rm(...e) {
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
function sm(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function hc(...e) {
  return (t) => e.forEach((n) => sm(n, t));
}
function yo(...e) {
  return i.useCallback(hc(...e), e);
}
const Ro = i.forwardRef((e, t) => {
  const { children: n, ...o } = e, r = i.Children.toArray(n), s = r.find(cm);
  if (s) {
    const c = s.props.children, a = r.map((l) => l === s ? i.Children.count(c) > 1 ? i.Children.only(null) : i.isValidElement(c) ? c.props.children : null : l);
    return i.createElement(Po, ce({}, o, { ref: t }), i.isValidElement(c) ? i.cloneElement(c, void 0, a) : null);
  }
  return i.createElement(Po, ce({}, o, { ref: t }), n);
});
Ro.displayName = "Slot";
const Po = i.forwardRef((e, t) => {
  const { children: n, ...o } = e;
  return i.isValidElement(n) ? i.cloneElement(n, { ...am(o, n.props), ref: hc(t, n.ref) }) : i.Children.count(n) > 1 ? i.Children.only(null) : null;
});
Po.displayName = "SlotClone";
const im = ({ children: e }) => i.createElement(i.Fragment, null, e);
function cm(e) {
  return i.isValidElement(e) && e.type === im;
}
function am(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...a) => {
      s(...a), r(...a);
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function lm(e) {
  const t = e + "CollectionProvider", [n, o] = vr(t), [r, s] = n(t, { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }), c = (m) => {
    const { scope: v, children: h } = m, g = ye.useRef(null), w = ye.useRef(/* @__PURE__ */ new Map()).current;
    return ye.createElement(r, { scope: v, itemMap: w, collectionRef: g }, h);
  }, a = e + "CollectionSlot", l = ye.forwardRef((m, v) => {
    const { scope: h, children: g } = m, w = s(a, h), y = yo(v, w.collectionRef);
    return ye.createElement(Ro, { ref: y }, g);
  }), u = e + "CollectionItemSlot", p = "data-radix-collection-item", d = ye.forwardRef((m, v) => {
    const { scope: h, children: g, ...w } = m, y = ye.useRef(null), C = yo(v, y), x = s(u, h);
    return ye.useEffect(() => (x.itemMap.set(y, { ref: y, ...w }), () => {
      x.itemMap.delete(y);
    })), ye.createElement(Ro, { [p]: "", ref: C }, g);
  });
  function f(m) {
    const v = s(e + "CollectionConsumer", m);
    return ye.useCallback(() => {
      const g = v.collectionRef.current;
      if (!g) return [];
      const w = Array.from(g.querySelectorAll(`[${p}]`));
      return Array.from(v.itemMap.values()).sort((x, P) => w.indexOf(x.ref.current) - w.indexOf(P.ref.current));
    }, [v.collectionRef, v.itemMap]);
  }
  return [{ Provider: c, Slot: l, ItemSlot: d }, f, o];
}
const um = (globalThis == null ? void 0 : globalThis.document) ? i.useLayoutEffect : () => {
}, dm = nt.useId || (() => {
});
let fm = 0;
function gc(e) {
  const [t, n] = i.useState(dm());
  return um(() => {
    n((o) => o ?? String(fm++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
function pm(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function mm(...e) {
  return (t) => e.forEach((n) => pm(n, t));
}
const bc = i.forwardRef((e, t) => {
  const { children: n, ...o } = e, r = i.Children.toArray(n), s = r.find(hm);
  if (s) {
    const c = s.props.children, a = r.map((l) => l === s ? i.Children.count(c) > 1 ? i.Children.only(null) : i.isValidElement(c) ? c.props.children : null : l);
    return i.createElement(So, ce({}, o, { ref: t }), i.isValidElement(c) ? i.cloneElement(c, void 0, a) : null);
  }
  return i.createElement(So, ce({}, o, { ref: t }), n);
});
bc.displayName = "Slot";
const So = i.forwardRef((e, t) => {
  const { children: n, ...o } = e;
  return i.isValidElement(n) ? i.cloneElement(n, { ...gm(o, n.props), ref: mm(t, n.ref) }) : i.Children.count(n) > 1 ? i.Children.only(null) : null;
});
So.displayName = "SlotClone";
const vm = ({ children: e }) => i.createElement(i.Fragment, null, e);
function hm(e) {
  return i.isValidElement(e) && e.type === vm;
}
function gm(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], s = t[o];
    /^on[A-Z]/.test(o) ? r && s ? n[o] = (...a) => {
      s(...a), r(...a);
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...s } : o === "className" && (n[o] = [r, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
const bm = ["a", "button", "div", "h2", "h3", "img", "label", "li", "nav", "ol", "p", "span", "svg", "ul"], St = bm.reduce((e, t) => {
  const n = i.forwardRef((o, r) => {
    const { asChild: s, ...c } = o, a = s ? bc : t;
    return i.useEffect(() => {
      window[/* @__PURE__ */ Symbol.for("radix-ui")] = true;
    }, []), i.createElement(a, ce({}, c, { ref: r }));
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {});
function Cm(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => (...n) => {
    var o;
    return (o = t.current) === null || o === void 0 ? void 0 : o.call(t, ...n);
  }, []);
}
function Cc(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => (...n) => {
    var o;
    return (o = t.current) === null || o === void 0 ? void 0 : o.call(t, ...n);
  }, []);
}
function xc({ prop: e, defaultProp: t, onChange: n = () => {
} }) {
  const [o, r] = xm({ defaultProp: t, onChange: n }), s = e !== void 0, c = s ? e : o, a = Cc(n), l = i.useCallback((u) => {
    if (s) {
      const d = typeof u == "function" ? u(e) : u;
      d !== e && a(d);
    } else r(u);
  }, [s, e, r, a]);
  return [c, l];
}
function xm({ defaultProp: e, onChange: t }) {
  const n = i.useState(e), [o] = n, r = i.useRef(o), s = Cc(t);
  return i.useEffect(() => {
    r.current !== o && (s(o), r.current = o);
  }, [o, r, s]), n;
}
const wm = i.createContext(void 0);
function wc(e) {
  const t = i.useContext(wm);
  return e || t || "ltr";
}
const Qn = "rovingFocusGroup.onEntryFocus", ym = { bubbles: false, cancelable: true }, hr = "RovingFocusGroup", [Eo, yc, Rm] = lm(hr), [Pm, Rc] = vr(hr, [Rm]), [Sm, Em] = Pm(hr), Im = i.forwardRef((e, t) => i.createElement(Eo.Provider, { scope: e.__scopeRovingFocusGroup }, i.createElement(Eo.Slot, { scope: e.__scopeRovingFocusGroup }, i.createElement(Tm, ce({}, e, { ref: t }))))), Tm = i.forwardRef((e, t) => {
  const { __scopeRovingFocusGroup: n, orientation: o, loop: r = false, dir: s, currentTabStopId: c, defaultCurrentTabStopId: a, onCurrentTabStopIdChange: l, onEntryFocus: u, ...p } = e, d = i.useRef(null), f = yo(t, d), m = wc(s), [v = null, h] = xc({ prop: c, defaultProp: a, onChange: l }), [g, w] = i.useState(false), y = Cm(u), C = yc(n), x = i.useRef(false), [P, R] = i.useState(0);
  return i.useEffect(() => {
    const S = d.current;
    if (S) return S.addEventListener(Qn, y), () => S.removeEventListener(Qn, y);
  }, [y]), i.createElement(Sm, { scope: n, orientation: o, dir: m, loop: r, currentTabStopId: v, onItemFocus: i.useCallback((S) => h(S), [h]), onItemShiftTab: i.useCallback(() => w(true), []), onFocusableItemAdd: i.useCallback(() => R((S) => S + 1), []), onFocusableItemRemove: i.useCallback(() => R((S) => S - 1), []) }, i.createElement(St.div, ce({ tabIndex: g || P === 0 ? -1 : 0, "data-orientation": o }, p, { ref: f, style: { outline: "none", ...e.style }, onMouseDown: ke(e.onMouseDown, () => {
    x.current = true;
  }), onFocus: ke(e.onFocus, (S) => {
    const _ = !x.current;
    if (S.target === S.currentTarget && _ && !g) {
      const A = new CustomEvent(Qn, ym);
      if (S.currentTarget.dispatchEvent(A), !A.defaultPrevented) {
        const O = C().filter((V) => V.focusable), E = O.find((V) => V.active), I = O.find((V) => V.id === v), D = [E, I, ...O].filter(Boolean).map((V) => V.ref.current);
        Pc(D);
      }
    }
    x.current = false;
  }), onBlur: ke(e.onBlur, () => w(false)) })));
}), _m = "RovingFocusGroupItem", Am = i.forwardRef((e, t) => {
  const { __scopeRovingFocusGroup: n, focusable: o = true, active: r = false, tabStopId: s, ...c } = e, a = gc(), l = s || a, u = Em(_m, n), p = u.currentTabStopId === l, d = yc(n), { onFocusableItemAdd: f, onFocusableItemRemove: m } = u;
  return i.useEffect(() => {
    if (o) return f(), () => m();
  }, [o, f, m]), i.createElement(Eo.ItemSlot, { scope: n, id: l, focusable: o, active: r }, i.createElement(St.span, ce({ tabIndex: p ? 0 : -1, "data-orientation": u.orientation }, c, { ref: t, onMouseDown: ke(e.onMouseDown, (v) => {
    o ? u.onItemFocus(l) : v.preventDefault();
  }), onFocus: ke(e.onFocus, () => u.onItemFocus(l)), onKeyDown: ke(e.onKeyDown, (v) => {
    if (v.key === "Tab" && v.shiftKey) {
      u.onItemShiftTab();
      return;
    }
    if (v.target !== v.currentTarget) return;
    const h = $m(v, u.orientation, u.dir);
    if (h !== void 0) {
      v.preventDefault();
      let w = d().filter((y) => y.focusable).map((y) => y.ref.current);
      if (h === "last") w.reverse();
      else if (h === "prev" || h === "next") {
        h === "prev" && w.reverse();
        const y = w.indexOf(v.currentTarget);
        w = u.loop ? Dm(w, y + 1) : w.slice(y + 1);
      }
      setTimeout(() => Pc(w));
    }
  }) })));
}), Mm = { ArrowLeft: "prev", ArrowUp: "prev", ArrowRight: "next", ArrowDown: "next", PageUp: "first", Home: "first", PageDown: "last", End: "last" };
function Om(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function $m(e, t, n) {
  const o = Om(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o))) return Mm[o];
}
function Pc(e) {
  const t = document.activeElement;
  for (const n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Dm(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
const Fm = Im, km = Am;
function Nm(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function jm(...e) {
  return (t) => e.forEach((n) => Nm(n, t));
}
function Lm(...e) {
  return i.useCallback(jm(...e), e);
}
const Kr = (globalThis == null ? void 0 : globalThis.document) ? i.useLayoutEffect : () => {
};
function Vm(e, t) {
  return i.useReducer((n, o) => {
    const r = t[n][o];
    return r ?? n;
  }, e);
}
const Sc = (e) => {
  const { present: t, children: n } = e, o = Gm(t), r = typeof n == "function" ? n({ present: o.isPresent }) : i.Children.only(n), s = Lm(o.ref, r.ref);
  return typeof n == "function" || o.isPresent ? i.cloneElement(r, { ref: s }) : null;
};
Sc.displayName = "Presence";
function Gm(e) {
  const [t, n] = i.useState(), o = i.useRef({}), r = i.useRef(e), s = i.useRef("none"), c = e ? "mounted" : "unmounted", [a, l] = Vm(c, { mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" }, unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" }, unmounted: { MOUNT: "mounted" } });
  return i.useEffect(() => {
    const u = en(o.current);
    s.current = a === "mounted" ? u : "none";
  }, [a]), Kr(() => {
    const u = o.current, p = r.current;
    if (p !== e) {
      const f = s.current, m = en(u);
      e ? l("MOUNT") : m === "none" || (u == null ? void 0 : u.display) === "none" ? l("UNMOUNT") : l(p && f !== m ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, l]), Kr(() => {
    if (t) {
      const u = (d) => {
        const m = en(o.current).includes(d.animationName);
        d.target === t && m && gt.flushSync(() => l("ANIMATION_END"));
      }, p = (d) => {
        d.target === t && (s.current = en(o.current));
      };
      return t.addEventListener("animationstart", p), t.addEventListener("animationcancel", u), t.addEventListener("animationend", u), () => {
        t.removeEventListener("animationstart", p), t.removeEventListener("animationcancel", u), t.removeEventListener("animationend", u);
      };
    } else l("ANIMATION_END");
  }, [t, l]), { isPresent: ["mounted", "unmountSuspended"].includes(a), ref: i.useCallback((u) => {
    u && (o.current = getComputedStyle(u)), n(u);
  }, []) };
}
function en(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
const Ec = "Tabs", [Bm] = vr(Ec, [Rc]), Ic = Rc(), [Um, gr] = Bm(Ec), Hm = i.forwardRef((e, t) => {
  const { __scopeTabs: n, value: o, onValueChange: r, defaultValue: s, orientation: c = "horizontal", dir: a, activationMode: l = "automatic", ...u } = e, p = wc(a), [d, f] = xc({ prop: o, onChange: r, defaultProp: s });
  return i.createElement(Um, { scope: n, baseId: gc(), value: d, onValueChange: f, orientation: c, dir: p, activationMode: l }, i.createElement(St.div, ce({ dir: p, "data-orientation": c }, u, { ref: t })));
}), Wm = "TabsList", Km = i.forwardRef((e, t) => {
  const { __scopeTabs: n, loop: o = true, ...r } = e, s = gr(Wm, n), c = Ic(n);
  return i.createElement(Fm, ce({ asChild: true }, c, { orientation: s.orientation, dir: s.dir, loop: o }), i.createElement(St.div, ce({ role: "tablist", "aria-orientation": s.orientation }, r, { ref: t })));
}), zm = "TabsTrigger", Ym = i.forwardRef((e, t) => {
  const { __scopeTabs: n, value: o, disabled: r = false, ...s } = e, c = gr(zm, n), a = Ic(n), l = Tc(c.baseId, o), u = _c(c.baseId, o), p = o === c.value;
  return i.createElement(km, ce({ asChild: true }, a, { focusable: !r, active: p }), i.createElement(St.button, ce({ type: "button", role: "tab", "aria-selected": p, "aria-controls": u, "data-state": p ? "active" : "inactive", "data-disabled": r ? "" : void 0, disabled: r, id: l }, s, { ref: t, onMouseDown: ke(e.onMouseDown, (d) => {
    !r && d.button === 0 && d.ctrlKey === false ? c.onValueChange(o) : d.preventDefault();
  }), onKeyDown: ke(e.onKeyDown, (d) => {
    [" ", "Enter"].includes(d.key) && c.onValueChange(o);
  }), onFocus: ke(e.onFocus, () => {
    const d = c.activationMode !== "manual";
    !p && !r && d && c.onValueChange(o);
  }) })));
}), Xm = "TabsContent", qm = i.forwardRef((e, t) => {
  const { __scopeTabs: n, value: o, forceMount: r, children: s, ...c } = e, a = gr(Xm, n), l = Tc(a.baseId, o), u = _c(a.baseId, o), p = o === a.value, d = i.useRef(p);
  return i.useEffect(() => {
    const f = requestAnimationFrame(() => d.current = false);
    return () => cancelAnimationFrame(f);
  }, []), i.createElement(Sc, { present: r || p }, ({ present: f }) => i.createElement(St.div, ce({ "data-state": p ? "active" : "inactive", "data-orientation": a.orientation, role: "tabpanel", "aria-labelledby": l, hidden: !f, id: u, tabIndex: 0 }, c, { ref: t, style: { ...e.style, animationDuration: d.current ? "0s" : void 0 } }), f && s));
});
function Tc(e, t) {
  return `${e}-trigger-${t}`;
}
function _c(e, t) {
  return `${e}-content-${t}`;
}
const Ph = Hm, Sh = Km, Eh = Ym, Ih = qm;
export {
  Ih as $,
  Rh as A,
  Mv as B,
  Vv as C,
  Dv as D,
  Nv as E,
  Ov as F,
  uh as G,
  dh as H,
  fh as I,
  ph as J,
  Gv as K,
  $v as L,
  Sv as M,
  Ev as N,
  Iv as O,
  Lv as P,
  Tv as Q,
  kt as R,
  ch as S,
  jv as T,
  _v as U,
  bv as V,
  Cv as W,
  xv as X,
  wv as Y,
  yv as Z,
  zv as _,
  du as a,
  Yv as a0,
  Xv as a1,
  qv as a2,
  Zv as a3,
  Qv as a4,
  Jv as a5,
  sh as a6,
  nh as a7,
  oh as a8,
  ev as a9,
  nv as aa,
  ov as ab,
  rv as ac,
  sv as ad,
  iv as ae,
  cv as af,
  vh as ag,
  hh as ah,
  rh as ai,
  lv as aj,
  uv as ak,
  tv as al,
  Rv as am,
  Ru as b,
  bu as c,
  Eu as d,
  Iu as e,
  mu as f,
  _u as g,
  Tu as h,
  vn as i,
  Ph as j,
  Eh as k,
  Su as l,
  Sh as m,
  kv as n,
  fu as o,
  Uv as p,
  Hv as q,
  Wv as r,
  Pu as s,
  ah as t,
  wu as u,
  bh as v,
  Ch as w,
  xh as x,
  wh as y,
  yh as z
};
