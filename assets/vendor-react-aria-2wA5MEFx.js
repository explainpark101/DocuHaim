var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _e2, _e3, _e4, _e5, _e6;
import { $ as S, r as c, b as pd, a as yd } from "./vendor-react-kfkzeLNk.js";
import "./vendor-git-diff-view-BxuuRUWt.js";
import { c as Dd } from "./vendor-novel-R6aKimCp.js";
function $t(...e) {
  return (...t) => {
    for (let a of e) typeof a == "function" && a(...t);
  };
}
const Z = typeof document < "u" ? S.useLayoutEffect : () => {
}, wu = { prefix: String(Math.round(Math.random() * 1e10)), current: 0 }, Pu = S.createContext(wu), gd = S.createContext(false);
let Va = /* @__PURE__ */ new WeakMap();
function vd(e = false) {
  var _a2, _b;
  let t = c.useContext(Pu), a = c.useRef(null);
  if (a.current === null && !e) {
    let r = (_b = (_a2 = S.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) == null ? void 0 : _a2.ReactCurrentOwner) == null ? void 0 : _b.current;
    if (r) {
      let n = Va.get(r);
      n == null ? Va.set(r, { id: t.current, state: r.memoizedState }) : r.memoizedState !== n.state && (t.current = n.id, Va.delete(r));
    }
    a.current = ++t.current;
  }
  return a.current;
}
function xd(e) {
  let t = c.useContext(Pu), a = vd(!!e), r = `react-aria${t.prefix}`;
  return e || `${r}-${a}`;
}
function Ed(e) {
  let t = S.useId(), [a] = c.useState(Vr()), r = a ? "react-aria" : `react-aria${wu.prefix}`;
  return e || `${r}-${t}`;
}
const Cd = typeof S.useId == "function" ? Ed : xd;
function wd() {
  return false;
}
function Pd() {
  return true;
}
function Sd(e) {
  return () => {
  };
}
function Vr() {
  return typeof S.useSyncExternalStore == "function" ? S.useSyncExternalStore(Sd, wd, Pd) : c.useContext(gd);
}
function Bd(e) {
  let [t, a] = c.useState(e), r = c.useRef(t), n = c.useRef(null), u = c.useRef(() => {
    if (!n.current) return;
    let o = n.current.next();
    if (o.done) {
      n.current = null;
      return;
    }
    r.current === o.value ? u.current() : a(o.value);
  });
  Z(() => {
    r.current = t, n.current && u.current();
  });
  let i = c.useCallback((o) => {
    n.current = o(r.current), u.current();
  }, [u]);
  return [t, i];
}
let Fd = !!(typeof window < "u" && window.document && window.document.createElement), lt = /* @__PURE__ */ new Map(), it;
typeof FinalizationRegistry < "u" && (it = new FinalizationRegistry((e) => {
  lt.delete(e);
}));
let Oa = /* @__PURE__ */ new WeakMap();
function Ee(e) {
  let [t, a] = c.useState(e), r = c.useRef(null), n = Cd(t), u = c.useRef(null), i = Oa.get(u);
  if (it && i !== n && (i != null && it.unregister(u), it.register(u, n, u), Oa.set(u, n)), Fd) {
    const o = lt.get(n);
    o && !o.includes(r) ? o.push(r) : lt.set(n, [r]);
  }
  return Z(() => {
    let o = n;
    return () => {
      it && (it.unregister(u), Oa.delete(u)), lt.delete(o);
    };
  }, [n]), c.useEffect(() => {
    let o = r.current;
    return o && a(o), () => {
      o && (r.current = null);
    };
  }), n;
}
function Rd(e, t) {
  if (e === t) return e;
  let a = lt.get(e);
  if (a) return a.forEach((n) => n.current = t), t;
  let r = lt.get(t);
  return r ? (r.forEach((n) => n.current = e), e) : t;
}
function Bt(e = []) {
  let t = Ee(), [a, r] = Bd(t), n = c.useCallback(() => {
    r(function* () {
      yield t, yield document.getElementById(t) ? t : void 0;
    });
  }, [t, r]);
  return Z(n, [t, n, ...e]), a;
}
function Or(...e) {
  return e.length === 1 && e[0] ? e[0] : (t) => {
    let a = false;
    const r = e.map((n) => {
      const u = pn(n, t);
      return a || (a = typeof u == "function"), u;
    });
    if (a) return () => {
      r.forEach((n, u) => {
        typeof n == "function" ? n() : pn(e[u], null);
      });
    };
  };
}
function pn(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
function Y(...e) {
  let t = { ...e[0] };
  for (let a = 1; a < e.length; a++) {
    let r = e[a];
    for (let n in r) {
      let u = t[n], i = r[n];
      typeof u == "function" && typeof i == "function" && n[0] === "o" && n[1] === "n" && n.charCodeAt(2) >= 65 && n.charCodeAt(2) <= 90 ? t[n] = $t(u, i) : (n === "className" || n === "UNSAFE_className") && typeof u == "string" && typeof i == "string" ? t[n] = Dd(u, i) : n === "id" && u && i ? t.id = Rd(u, i) : n === "ref" && u && i ? t.ref = Or(u, i) : t[n] = i !== void 0 ? i : u;
    }
  }
  return t;
}
function Su(e) {
  const t = c.useRef(null), a = c.useRef(void 0), r = c.useCallback((n) => {
    if (typeof e == "function") {
      const u = e, i = u(n);
      return () => {
        typeof i == "function" ? i() : u(null);
      };
    } else if (e) return e.current = n, () => {
      e.current = null;
    };
  }, [e]);
  return c.useMemo(() => ({ get current() {
    return t.current;
  }, set current(n) {
    t.current = n, a.current && (a.current(), a.current = void 0), n != null && (a.current = r(n));
  } }), [r]);
}
const ea = /* @__PURE__ */ Symbol("default");
function va({ values: e, children: t }) {
  for (let [a, r] of e) t = S.createElement(a.Provider, { value: r }, t);
  return t;
}
function Te(e) {
  let { className: t, style: a, children: r, defaultClassName: n, defaultChildren: u, defaultStyle: i, values: o, render: l } = e;
  return c.useMemo(() => {
    let s, d, f;
    return typeof t == "function" ? s = t({ ...o, defaultClassName: n }) : s = t, typeof a == "function" ? d = a({ ...o, defaultStyle: i || {} }) : d = a, typeof r == "function" ? f = r({ ...o, defaultChildren: u }) : r == null ? f = u : f = r, { className: s ?? n, style: d || i ? { ...i, ...d } : void 0, children: f ?? u, "data-rac": "", render: l ? ($) => l($, o) : void 0 };
  }, [t, a, r, n, u, i, o, l]);
}
function oa(e, t) {
  let a = c.useContext(e);
  if (t === null) return null;
  if (a && typeof a == "object" && "slots" in a && a.slots) {
    let r = t || ea;
    if (!a.slots[r]) {
      let n = new Intl.ListFormat().format(Object.keys(a.slots).map((i) => `"${i}"`)), u = t ? `Invalid slot "${t}".` : "A slot prop is required.";
      throw new Error(`${u} Valid slot names are ${n}.`);
    }
    return a.slots[r];
  }
  return a;
}
function Ce(e, t, a) {
  let r = oa(a, e.slot) || {}, { ref: n, ...u } = r, i = Su(c.useMemo(() => Or(t, n), [t, n])), o = Y(u, e);
  return "style" in u && u.style && "style" in e && e.style && (typeof u.style == "function" || typeof e.style == "function" ? o.style = (l) => {
    let s = typeof u.style == "function" ? u.style(l) : u.style, d = { ...l.defaultStyle, ...s }, f = typeof e.style == "function" ? e.style({ ...l, defaultStyle: d }) : e.style;
    return { ...d, ...f };
  } : o.style = { ...u.style, ...e.style }), [o, i];
}
function Td(e = true) {
  let [t, a] = c.useState(e), r = c.useRef(false), n = c.useCallback((u) => {
    r.current = true, a(!!u);
  }, []);
  return Z(() => {
    r.current || a(false);
  }, []), [n, t];
}
function Ad(e) {
  const t = /^(data-.*)$/;
  let a = {};
  for (const r in e) t.test(r) || (a[r] = e[r]);
  return a;
}
function kd(e, t, a) {
  let { render: r, ...n } = t, u = c.useRef(null), i = c.useMemo(() => Or(a, u), [a, u]);
  Z(() => {
  }, [e, r]);
  let o = { ...n, ref: i };
  return r ? r(o, void 0) : S.createElement(e, o);
}
const yn = {}, de = new Proxy({}, { get(e, t) {
  if (typeof t != "string") return;
  let a = yn[t];
  return a || (a = c.forwardRef(kd.bind(null, t)), yn[t] = a), a;
} }), W = (e) => Md(e) ? e.document : Id(e) ? e : (e == null ? void 0 : e.ownerDocument) ?? (typeof document < "u" ? document : void 0), ie = (e) => {
  var _a2;
  return ((_a2 = W(e)) == null ? void 0 : _a2.defaultView) ?? (typeof window < "u" ? window : void 0);
};
function Bu(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && typeof e.nodeType == "number";
}
function Md(e) {
  return typeof e == "object" && e != null && "window" in e && e.window === e;
}
function Id(e) {
  return Bu(e) && e.nodeType === 9;
}
function Hr(e) {
  return Bu(e) && e.nodeType === 11 && "host" in e;
}
function Nd(e, t, a, r) {
  if (a == null || e == null) return () => {
  };
  let n = Array.isArray(e) ? e : [e];
  for (let u of n) u.addEventListener(t, a, r);
  return () => {
    for (let u of n) u.removeEventListener(t, a, r);
  };
}
let Ld = false;
function ve() {
  return Ld;
}
function _(e, t) {
  var _a2;
  if (!ve()) return t && e ? e.contains(t) : false;
  if (!e || !t) return false;
  let a = t;
  for (; a !== null; ) {
    if (a === e) return true;
    typeof a.assignedElements != "function" && ((_a2 = a.assignedSlot) == null ? void 0 : _a2.parentNode) ? a = a.assignedSlot.parentNode : Hr(a) ? a = a.host : a = a.parentNode;
  }
  return false;
}
const q = (e = document) => {
  var _a2;
  if (!ve()) return e.activeElement;
  let t = e.activeElement;
  for (; t && "shadowRoot" in t && ((_a2 = t.shadowRoot) == null ? void 0 : _a2.activeElement); ) t = t.shadowRoot.activeElement;
  return t;
};
function V(e) {
  if (ve() && e.target instanceof Element && e.target.shadowRoot) {
    if ("composedPath" in e) return e.composedPath()[0] ?? null;
    if ("composedPath" in e.nativeEvent) return e.nativeEvent.composedPath()[0] ?? null;
  }
  return e.target;
}
function Vd(e, t) {
  if (t === null) return [];
  t = t ?? ie(e);
  let a = [t];
  if (!ve() || !e || e === t) return a;
  let r = "getRootNode" in t ? t.getRootNode() : null, n = e.getRootNode() ?? null;
  for (; Hr(n) && n !== r; ) a.push(n), n = n.host.getRootNode();
  return a;
}
function Ur(e) {
  if (!e) return false;
  let t = e.getRootNode(), a = ie(e);
  if (!(t instanceof a.Document || t instanceof a.ShadowRoot)) return false;
  let r = t.activeElement;
  return r != null && e.contains(r);
}
function Ze(e) {
  if (Od()) e.focus({ preventScroll: true });
  else {
    let t = Hd(e);
    e.focus(), Ud(t);
  }
}
let Kt = null;
function Od() {
  if (Kt == null) {
    Kt = false;
    try {
      document.createElement("div").focus({ get preventScroll() {
        return Kt = true, true;
      } });
    } catch {
    }
  }
  return Kt;
}
function Hd(e) {
  let t = e.parentNode, a = [], r = document.scrollingElement || document.documentElement;
  for (; t instanceof HTMLElement && t !== r; ) (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && a.push({ element: t, scrollTop: t.scrollTop, scrollLeft: t.scrollLeft }), t = t.parentNode;
  return r instanceof HTMLElement && a.push({ element: r, scrollTop: r.scrollTop, scrollLeft: r.scrollLeft }), a;
}
function Ud(e) {
  for (let { element: t, scrollTop: a, scrollLeft: r } of e) t.scrollTop = a, t.scrollLeft = r;
}
const zd = typeof Element < "u" && "checkVisibility" in Element.prototype;
function jd(e) {
  const t = ie(e);
  if (!(e instanceof t.HTMLElement) && !(e instanceof t.SVGElement)) return false;
  let { display: a, visibility: r } = e.style, n = a !== "none" && r !== "hidden" && r !== "collapse";
  if (n) {
    const { getComputedStyle: u } = ie(e);
    let { display: i, visibility: o } = u(e);
    n = i !== "none" && o !== "hidden" && o !== "collapse";
  }
  return n;
}
function Kd(e, t) {
  return !e.hasAttribute("hidden") && !e.hasAttribute("data-react-aria-prevent-focus") && (e.nodeName === "DETAILS" && t && t.nodeName !== "SUMMARY" ? e.hasAttribute("open") : true);
}
function zr(e, t) {
  return zd ? e.checkVisibility({ visibilityProperty: true }) && !e.closest("[data-react-aria-prevent-focus]") : e.nodeName !== "#comment" && jd(e) && Kd(e, t) && (!e.parentElement || zr(e.parentElement, e));
}
const jr = ["input:not([disabled]):not([type=hidden])", "select:not([disabled])", "textarea:not([disabled])", "button:not([disabled])", "a[href]", "area[href]", "summary", "iframe", "object", "embed", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable^="false"])', "permission"], _d = jr.join(":not([hidden]),") + ",[tabindex]:not([disabled]):not([hidden])";
jr.push('[tabindex]:not([tabindex="-1"]):not([disabled])');
const Wd = jr.join(':not([hidden]):not([tabindex="-1"]),');
function Fu(e, t) {
  return e.matches(_d) && !Ru(e) && ((t == null ? void 0 : t.skipVisibilityCheck) || zr(e));
}
function Zd(e) {
  return e.matches(Wd) && zr(e) && !Ru(e);
}
function Ru(e) {
  let t = e;
  for (; t != null; ) {
    if (t instanceof ie(t).HTMLElement && t.inert) return true;
    t = t.parentElement;
  }
  return false;
}
function Kr(e) {
  let t = e;
  return t.nativeEvent = e, t.isDefaultPrevented = () => t.defaultPrevented, t.isPropagationStopped = () => t.cancelBubble, t.persist = () => {
  }, t;
}
function Tu(e, t) {
  Object.defineProperty(e, "target", { value: t }), Object.defineProperty(e, "currentTarget", { value: t });
}
function Au(e) {
  let t = c.useRef({ isFocused: false, observer: null });
  return Z(() => {
    const a = t.current;
    return () => {
      a.observer && (a.observer.disconnect(), a.observer = null);
    };
  }, []), c.useCallback((a) => {
    let r = V(a);
    if (r instanceof HTMLButtonElement || r instanceof HTMLInputElement || r instanceof HTMLTextAreaElement || r instanceof HTMLSelectElement) {
      t.current.isFocused = true;
      let n = r, u = (i) => {
        if (t.current.isFocused = false, n.disabled) {
          let o = Kr(i);
          e == null ? void 0 : e(o);
        }
        t.current.observer && (t.current.observer.disconnect(), t.current.observer = null);
      };
      n.addEventListener("focusout", u, { once: true }), t.current.observer = new MutationObserver(() => {
        var _a2;
        if (t.current.isFocused && n.disabled) {
          (_a2 = t.current.observer) == null ? void 0 : _a2.disconnect();
          let i = n === q() ? null : q();
          n.dispatchEvent(new FocusEvent("blur", { relatedTarget: i })), n.dispatchEvent(new FocusEvent("focusout", { bubbles: true, relatedTarget: i }));
        }
      }), t.current.observer.observe(n, { attributes: true, attributeFilter: ["disabled"] });
    }
  }, [e]);
}
let la = false;
function Gd(e) {
  for (; e && !Fu(e, { skipVisibilityCheck: true }); ) e = e.parentElement;
  let t = ie(e), a = t.document.activeElement;
  if (!a || a === e) return;
  la = true;
  let r = false, n = (d) => {
    (V(d) === a || r) && d.stopImmediatePropagation();
  }, u = (d) => {
    (V(d) === a || r) && (d.stopImmediatePropagation(), !e && !r && (r = true, Ze(a), l()));
  }, i = (d) => {
    (V(d) === e || r) && d.stopImmediatePropagation();
  }, o = (d) => {
    (V(d) === e || r) && (d.stopImmediatePropagation(), r || (r = true, Ze(a), l()));
  };
  t.addEventListener("blur", n, true), t.addEventListener("focusout", u, true), t.addEventListener("focusin", o, true), t.addEventListener("focus", i, true);
  let l = () => {
    cancelAnimationFrame(s), t.removeEventListener("blur", n, true), t.removeEventListener("focusout", u, true), t.removeEventListener("focusin", o, true), t.removeEventListener("focus", i, true), la = false, r = false;
  }, s = requestAnimationFrame(l);
  return l;
}
function xa(e) {
  var _a2;
  if (typeof window > "u" || window.navigator == null) return false;
  let t = (_a2 = window.navigator.userAgentData) == null ? void 0 : _a2.brands;
  return Array.isArray(t) && t.some((a) => e.test(a.brand)) || e.test(window.navigator.userAgent);
}
function _r(e) {
  var _a2;
  return typeof window < "u" && window.navigator != null ? e.test(((_a2 = window.navigator.userAgentData) == null ? void 0 : _a2.platform) || window.navigator.platform) : false;
}
function Ve(e) {
  let t = null;
  return () => (t == null && (t = e()), t);
}
const Ge = Ve(function() {
  return _r(/^Mac/i);
}), Yd = Ve(function() {
  return _r(/^iPhone/i);
}), ku = Ve(function() {
  return _r(/^iPad/i) || Ge() && navigator.maxTouchPoints > 1;
}), ht = Ve(function() {
  return Yd() || ku();
}), Ye = Ve(function() {
  return xa(/AppleWebKit/i) && (ht() || !Mu());
}), Mu = Ve(function() {
  return xa(/Chrome|CriOS|CrMo/i);
}), sa = Ve(function() {
  return xa(/Android/i);
}), Jd = Ve(function() {
  return xa(/(Firefox|FxiOS)/i);
});
function Iu(e) {
  return e.pointerType === "" && e.isTrusted ? true : sa() && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function qd(e) {
  return !sa() && e.width === 0 && e.height === 0 || sa() && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse";
}
function Je(e, t, a = true) {
  var _a2, _b;
  let { metaKey: r, ctrlKey: n, altKey: u, shiftKey: i } = t;
  !Ye() && Jd() && ((_b = (_a2 = window.event) == null ? void 0 : _a2.type) == null ? void 0 : _b.startsWith("key")) && e.target === "_blank" && (Ge() ? r = true : n = true);
  let o = Ye() && Ge() && !ku() ? new KeyboardEvent("keydown", { keyIdentifier: "Enter", metaKey: r, ctrlKey: n, altKey: u, shiftKey: i }) : new MouseEvent("click", { metaKey: r, ctrlKey: n, altKey: u, shiftKey: i, detail: 1, bubbles: true, cancelable: true });
  Je.isOpening = a, Ze(e), e.dispatchEvent(o), Je.isOpening = false;
}
Je.isOpening = false;
let tt = null;
const dr = /* @__PURE__ */ new Set();
let wt = /* @__PURE__ */ new Map(), qe = false, cr = false;
const Qd = { Tab: true, Escape: true };
function Ea(e, t) {
  for (let a of dr) a(e, t);
}
function Xd(e) {
  return !(e.metaKey || !Ge() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function da(e) {
  qe = true, !Je.isOpening && Xd(e) && (tt = "keyboard", Ea("keyboard", e));
}
function st(e) {
  tt = "pointer", "pointerType" in e && e.pointerType, (e.type === "mousedown" || e.type === "pointerdown") && (qe = true, Ea("pointer", e));
}
function Nu(e) {
  !Je.isOpening && Iu(e) && (qe = true, tt = "virtual");
}
function Lu(e) {
  let t = ie(V(e)), a = W(V(e));
  V(e) === t || V(e) === a || la || !e.isTrusted || (!qe && !cr && (tt = "virtual", Ea("virtual", e)), qe = false, cr = false);
}
function Vu() {
  la || (qe = false, cr = true);
}
function fr(e) {
  if (typeof window > "u" || typeof document > "u") return;
  const t = ie(e), a = W(e);
  if (wt.get(t)) return;
  let r = t.HTMLElement.prototype.focus;
  Reflect.defineProperty(t.HTMLElement.prototype, "focus", { configurable: true, writable: true, value: function() {
    qe = true, r.apply(this, arguments);
  } }), a.addEventListener("keydown", da, true), a.addEventListener("keyup", da, true), a.addEventListener("click", Nu, true), t.addEventListener("focus", Lu, true), t.addEventListener("blur", Vu, false), typeof PointerEvent < "u" && (a.addEventListener("pointerdown", st, true), a.addEventListener("pointermove", st, true), a.addEventListener("pointerup", st, true)), t.addEventListener("beforeunload", () => {
    Ou(e);
  }, { once: true }), wt.set(t, { focus: r });
}
const Ou = (e, t) => {
  const a = ie(e), r = W(e);
  t && r.removeEventListener("DOMContentLoaded", t), wt.has(a) && (Reflect.defineProperty(a.HTMLElement.prototype, "focus", { configurable: true, writable: true, value: wt.get(a).focus }), r.removeEventListener("keydown", da, true), r.removeEventListener("keyup", da, true), r.removeEventListener("click", Nu, true), a.removeEventListener("focus", Lu, true), a.removeEventListener("blur", Vu, false), typeof PointerEvent < "u" && (r.removeEventListener("pointerdown", st, true), r.removeEventListener("pointermove", st, true), r.removeEventListener("pointerup", st, true)), wt.delete(a));
};
function ec(e) {
  const t = W(e);
  let a;
  return t.readyState !== "loading" ? fr(e) : (a = () => {
    fr(e);
  }, t.addEventListener("DOMContentLoaded", a)), () => Ou(e, a);
}
typeof document < "u" && ec();
function mr() {
  return tt !== "pointer";
}
function Ca() {
  return tt;
}
function tc(e) {
  tt = e, Ea(e, null);
}
const ac = /* @__PURE__ */ new Set(["checkbox", "radio", "range", "color", "file", "image", "button", "submit", "reset"]);
function rc(e, t, a) {
  let r = a ? V(a) : void 0, n = W(r), u = ie(r);
  const i = typeof u < "u" ? u.HTMLInputElement : HTMLInputElement, o = typeof u < "u" ? u.HTMLTextAreaElement : HTMLTextAreaElement, l = typeof u < "u" ? u.HTMLElement : HTMLElement, s = typeof u < "u" ? u.KeyboardEvent : KeyboardEvent;
  let d = q(n);
  return e = e || d instanceof i && !ac.has(d.type) || d instanceof o || d instanceof l && d.isContentEditable, !(e && t === "keyboard" && a instanceof s && !Qd[a.key]);
}
function nc(e, t, a) {
  fr(), c.useEffect(() => {
    if ((a == null ? void 0 : a.enabled) === false) return;
    let r = (n, u) => {
      rc(!!(a == null ? void 0 : a.isTextInput), n, u) && e(mr());
    };
    return dr.add(r), () => {
      dr.delete(r);
    };
  }, t);
}
const uc = /* @__PURE__ */ new Set(["checkbox", "radio", "range", "color", "file", "image", "button", "submit", "reset"]);
function Ha(e) {
  return e instanceof HTMLInputElement && !uc.has(e.type) || e instanceof HTMLTextAreaElement || e instanceof HTMLElement && e.isContentEditable;
}
const ic = S.useInsertionEffect ?? Z;
function ne(e) {
  const t = c.useRef(null);
  return ic(() => {
    t.current = e;
  }, [e]), c.useCallback((...a) => {
    const r = t.current;
    return r == null ? void 0 : r(...a);
  }, []);
}
function Ua(e, t, a, r) {
  let n = ne(a), u = a == null;
  c.useEffect(() => {
    if (u || !e.current) return;
    let i = e.current;
    return i.addEventListener(t, n, r), () => {
      i.removeEventListener(t, n, r);
    };
  }, [e, t, r, u]);
}
function Ot(e, t) {
  let { id: a, "aria-label": r, "aria-labelledby": n } = e;
  return a = Ee(a), n && r ? n = [.../* @__PURE__ */ new Set([a, ...n.trim().split(/\s+/)])].join(" ") : n && (n = n.trim().split(/\s+/).join(" ")), !r && !n && t && (r = t), { id: a, "aria-label": r, "aria-labelledby": n };
}
const oc = /* @__PURE__ */ new Set(["Arab", "Syrc", "Samr", "Mand", "Thaa", "Mend", "Nkoo", "Adlm", "Rohg", "Hebr"]), lc = /* @__PURE__ */ new Set(["ae", "ar", "arc", "bcc", "bqi", "ckb", "dv", "fa", "glk", "he", "ku", "mzn", "nqo", "pnb", "ps", "sd", "ug", "ur", "yi"]);
function sc(e) {
  if (Intl.Locale) {
    let a = new Intl.Locale(e).maximize(), r = typeof a.getTextInfo == "function" ? a.getTextInfo() : a.textInfo;
    if (r) return r.direction === "rtl";
    if (a.script) return oc.has(a.script);
  }
  let t = e.split("-")[0];
  return lc.has(t);
}
const Hu = /* @__PURE__ */ Symbol.for("react-aria.i18n.locale");
function Uu() {
  let e = typeof window < "u" && window[Hu] || typeof navigator < "u" && (navigator.language || navigator.userLanguage) || "en-US";
  try {
    Intl.DateTimeFormat.supportedLocalesOf([e]);
  } catch {
    e = "en-US";
  }
  return { locale: e, direction: sc(e) ? "rtl" : "ltr" };
}
let $r = Uu(), xt = /* @__PURE__ */ new Set();
function Dn() {
  $r = Uu();
  for (let e of xt) e($r);
}
function dc() {
  let e = Vr(), [t, a] = c.useState($r);
  return c.useEffect(() => (xt.size === 0 && window.addEventListener("languagechange", Dn), xt.add(a), () => {
    xt.delete(a), xt.size === 0 && window.removeEventListener("languagechange", Dn);
  }), []), e ? { locale: typeof window < "u" && window[Hu] || "en-US", direction: "ltr" } : t;
}
const cc = S.createContext(null);
function me() {
  let e = dc();
  return c.useContext(cc) || e;
}
const fc = /* @__PURE__ */ Symbol.for("react-aria.i18n.locale"), mc = /* @__PURE__ */ Symbol.for("react-aria.i18n.strings");
let _t;
class at {
  constructor(t, a = "en-US") {
    this.strings = Object.fromEntries(Object.entries(t).filter(([, r]) => r)), this.defaultLocale = a;
  }
  getStringForLocale(t, a) {
    let n = this.getStringsForLocale(a)[t];
    if (!n) throw new Error(`Could not find intl message ${t} in ${a} locale`);
    return n;
  }
  getStringsForLocale(t) {
    let a = this.strings[t];
    return a || (a = $c(t, this.strings, this.defaultLocale), this.strings[t] = a), a;
  }
  static getGlobalDictionaryForPackage(t) {
    if (typeof window > "u") return null;
    let a = window[fc];
    if (_t === void 0) {
      let n = window[mc];
      if (!n) return null;
      _t = {};
      for (let u in n) _t[u] = new at({ [a]: n[u] }, a);
    }
    let r = _t == null ? void 0 : _t[t];
    if (!r) throw new Error(`Strings for package "${t}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);
    return r;
  }
}
function $c(e, t, a = "en-US") {
  if (t[e]) return t[e];
  let r = bc(e), n = hc(e);
  if (n && t[`${r}-${n}`]) return t[`${r}-${n}`];
  if (t[r]) return t[r];
  for (let u in t) if (u.startsWith(r + "-")) return t[u];
  return t[a];
}
function bc(e) {
  return Intl.Locale ? new Intl.Locale(e).language : e.split("-")[0];
}
function hc(e) {
  if (Intl.Locale) return new Intl.Locale(e).script;
}
const gn = /* @__PURE__ */ new Map(), vn = /* @__PURE__ */ new Map();
class zu {
  constructor(t, a) {
    this.locale = t, this.strings = a;
  }
  format(t, a) {
    let r = this.strings.getStringForLocale(t, this.locale);
    return typeof r == "function" ? r(a, this) : r;
  }
  plural(t, a, r = "cardinal") {
    let n = a["=" + t];
    if (n) return typeof n == "function" ? n() : n;
    let u = this.locale + ":" + r, i = gn.get(u);
    i || (i = new Intl.PluralRules(this.locale, { type: r }), gn.set(u, i));
    let o = i.select(t);
    return n = a[o] || a.other, typeof n == "function" ? n() : n;
  }
  number(t) {
    let a = vn.get(this.locale);
    return a || (a = new Intl.NumberFormat(this.locale), vn.set(this.locale, a)), a.format(t);
  }
  select(t, a) {
    let r = t[a] || t.other;
    return typeof r == "function" ? r() : r;
  }
}
const xn = /* @__PURE__ */ new WeakMap();
function pc(e) {
  let t = xn.get(e);
  return t || (t = new at(e), xn.set(e, t)), t;
}
function ju(e, t) {
  return t && at.getGlobalDictionaryForPackage(t) || pc(e);
}
function Oe(e, t) {
  let { locale: a } = me(), r = ju(e, t);
  return c.useMemo(() => new zu(a, r), [a, r]);
}
const yc = typeof document < "u" ? S.useInsertionEffect ?? S.useLayoutEffect : () => {
};
function Ft(e, t, a) {
  let [r, n] = c.useState(e || t), u = c.useRef(r), i = c.useRef(e !== void 0), o = e !== void 0;
  c.useEffect(() => {
    i.current, i.current = o;
  }, [o]);
  let l = o ? e : r;
  yc(() => {
    u.current = l;
  });
  let [, s] = c.useReducer(() => ({}), {}), d = c.useCallback((f, ...$) => {
    let m = typeof f == "function" ? f(u.current) : f;
    Object.is(u.current, m) || (u.current = m, n(m), s(), a == null ? void 0 : a(m, ...$));
  }, [a]);
  return [l, d];
}
let Ie = /* @__PURE__ */ new Map(), br = /* @__PURE__ */ new Set();
function En() {
  if (typeof window > "u") return;
  function e(r) {
    return "propertyName" in r;
  }
  let t = (r) => {
    let n = V(r);
    if (!e(r) || !n) return;
    let u = Ie.get(n);
    u || (u = /* @__PURE__ */ new Set(), Ie.set(n, u), n.addEventListener("transitioncancel", a, { once: true })), u.add(r.propertyName);
  }, a = (r) => {
    let n = V(r);
    if (!e(r) || !n) return;
    let u = Ie.get(n);
    if (u && (u.delete(r.propertyName), u.size === 0 && (n.removeEventListener("transitioncancel", a), Ie.delete(n)), Ie.size === 0)) {
      for (let i of br) i();
      br.clear();
    }
  };
  document.body.addEventListener("transitionrun", t), document.body.addEventListener("transitionend", a);
}
typeof document < "u" && (document.readyState !== "loading" ? En() : document.addEventListener("DOMContentLoaded", En));
function Dc() {
  for (const [e] of Ie) "isConnected" in e && !e.isConnected && Ie.delete(e);
}
function Ku(e) {
  requestAnimationFrame(() => {
    Dc(), Ie.size === 0 ? e() : br.add(e);
  });
}
function Rt(e) {
  if (!e.isConnected) return;
  const t = W(e);
  if (Ca() === "virtual") {
    let a = q(t);
    Ku(() => {
      const r = q(t);
      (r === a || r === t.body) && e.isConnected && Ze(e);
    });
  } else Ze(e);
}
function _u(e) {
  let { isDisabled: t, onFocus: a, onBlur: r, onFocusChange: n } = e;
  const u = c.useCallback((l) => {
    if (V(l) === l.currentTarget) return r && r(l), n && n(false), true;
  }, [r, n]), i = Au(u), o = c.useCallback((l) => {
    let s = V(l);
    const d = W(s), f = d ? q(d) : q();
    s === l.currentTarget && s === f && (a && a(l), n && n(true), i(l));
  }, [n, a, i]);
  return { focusProps: { onFocus: !t && (a || n || r) ? o : void 0, onBlur: !t && (r || n) ? u : void 0 } };
}
function Wt(e) {
  if (e) return (t) => {
    let a = true, r = { ...t, preventDefault() {
      t.preventDefault();
    }, isDefaultPrevented() {
      return t.isDefaultPrevented();
    }, stopPropagation() {
      a = true;
    }, continuePropagation() {
      a = false, typeof t.continuePropagation == "function" && t.continuePropagation();
    }, isPropagationStopped() {
      return a;
    } };
    e(r), a && !(typeof t.isPropagationStopped == "function" && t.isPropagationStopped()) && t.stopPropagation();
  };
}
const gc = /* @__PURE__ */ new Set(["shift", "alt", "control", "meta", "mod"]), vc = ["Alt", "Control", "Meta", "Shift"];
function xc(e) {
  let t = /* @__PURE__ */ new Set();
  return e.alt && t.add("Alt"), e.shift && t.add("Shift"), e.ctrl && t.add("Control"), e.meta && t.add("Meta"), e.mod && t.add(Ge() ? "Meta" : "Control"), t;
}
function Ec(e) {
  let t = /* @__PURE__ */ new Set();
  return e.altKey && t.add("Alt"), e.ctrlKey && t.add("Control"), e.metaKey && t.add("Meta"), e.shiftKey && t.add("Shift"), t;
}
function Wu(e) {
  return vc.filter((t) => e.has(t));
}
function Cc(e) {
  let t = e.split("+").reduce((a, r) => {
    let n = r.toLowerCase();
    return gc.has(n) ? n === "shift" ? a.shift = true : n === "alt" ? a.alt = true : n === "control" ? a.ctrl = true : n === "meta" ? a.meta = true : n === "mod" && (a.mod = true) : a.key = r, a;
  }, { shift: false, alt: false, ctrl: false, meta: false, mod: false, key: "" });
  if (t.key === "") throw new Error(`Invalid keyboard shortcut: "${e}". Must include exactly one non-modifier key (e.g. "a", "Enter", "ArrowDown"). Combine any of Shift, Alt, Ctrl, Meta, and Mod.`);
  return t;
}
function Zu(e) {
  return e.toLowerCase();
}
const wc = { space: " ", esc: "escape", del: "delete", ins: "insert", left: "arrowleft", right: "arrowright", up: "arrowup", down: "arrowdown", pageup: "pageup", pagedown: "pagedown" };
function Pc(e) {
  let t = Zu(e), a = wc[t];
  return a ?? t;
}
function Sc(e) {
  let t = Wu(xc(e)), a = Pc(e.key);
  return t.length > 0 ? `${t.join("+")}+${a}` : a;
}
function Bc(e) {
  let t = Wu(Ec(e)), a = Zu(e.key);
  return (t.length > 0 ? `${t.join("+")}+` : "") + a;
}
function Fc(e) {
  let t = /* @__PURE__ */ new Map();
  for (let [a, r] of Object.entries(e)) {
    let n = Cc(a);
    t.set(Sc(n), r);
  }
  return (a) => {
    let r = Bc(a), n = t.get(r), u = n == null ? void 0 : n(a);
    u === void 0 && n !== void 0 ? u = { shouldContinuePropagation: false, shouldPreventDefault: true } : typeof u == "boolean" && (u = { shouldContinuePropagation: !u, shouldPreventDefault: u }), (u == null ? void 0 : u.shouldPreventDefault) && a.preventDefault(), (!n || (u == null ? void 0 : u.shouldContinuePropagation)) && a.continuePropagation();
  };
}
function Qe(e) {
  let { shortcuts: t, allowRepeats: a = false, allowComposing: r = false } = e, n, u;
  if (t) {
    let i = Fc(t), o = Wt((s) => {
      var _a2, _b;
      if (!_(s.currentTarget, V(s))) {
        s.continuePropagation();
        return;
      }
      if (((_a2 = s.nativeEvent) == null ? void 0 : _a2.repeat) && !a || ((_b = s.nativeEvent) == null ? void 0 : _b.isComposing) && !r) {
        s.continuePropagation();
        return;
      }
      i(s);
    }), l = Wt((s) => {
      var _a2, _b;
      if (!_(s.currentTarget, V(s))) {
        s.continuePropagation();
        return;
      }
      if (((_a2 = s.nativeEvent) == null ? void 0 : _a2.repeat) && !a || ((_b = s.nativeEvent) == null ? void 0 : _b.isComposing) && !r) {
        s.continuePropagation();
        return;
      }
      s.continuePropagation();
    });
    n = e.onKeyDown ? $t(e.onKeyDown, o) : o, u = e.onKeyUp ? $t(e.onKeyUp, l) : l;
  } else n = Wt(e.onKeyDown), u = Wt(e.onKeyUp);
  return { keyboardProps: e.isDisabled ? {} : { onKeyDown: n, onKeyUp: u } };
}
function Gu(e, t) {
  Z(() => {
    if (e && e.ref && t) return e.ref.current = t.current, () => {
      e.ref && (e.ref.current = null);
    };
  });
}
let Yu = S.createContext(null);
function Rc(e) {
  let t = c.useContext(Yu) || {};
  Gu(t, e);
  let { ref: a, ...r } = t;
  return r;
}
function Tc(e, t) {
  let { focusProps: a } = _u(e), { keyboardProps: r } = Qe(e), n = Y(a, r), u = Rc(t), i = e.isDisabled ? {} : u, o = c.useRef(e.autoFocus);
  c.useEffect(() => {
    o.current && t.current && Rt(t.current), o.current = false;
  }, [t]);
  let l = e.excludeFromTabOrder ? -1 : 0;
  return e.isDisabled && (l = void 0), { focusableProps: Y({ ...n, tabIndex: l }, i) };
}
typeof HTMLTemplateElement < "u" && (Object.defineProperty(HTMLTemplateElement.prototype, "firstChild", { configurable: true, enumerable: true, get: function() {
  return this.content.firstChild;
} }), Object.defineProperty(HTMLTemplateElement.prototype, "appendChild", { configurable: true, enumerable: true, value: function(e) {
  return this.content.appendChild(e);
} }), Object.defineProperty(HTMLTemplateElement.prototype, "removeChild", { configurable: true, enumerable: true, value: function(e) {
  return this.content.removeChild(e);
} }), Object.defineProperty(HTMLTemplateElement.prototype, "insertBefore", { configurable: true, enumerable: true, value: function(e, t) {
  return this.content.insertBefore(e, t);
} }));
const Ju = c.createContext(false);
function Wr(e) {
  let t = (a, r) => c.useContext(Ju) ? null : e(a, r);
  return t.displayName = e.displayName || e.name, c.forwardRef(t);
}
function Ac() {
  return c.useContext(Ju);
}
const kc = /* @__PURE__ */ new Set(["id"]), Mc = /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-describedby", "aria-details"]), Ic = /* @__PURE__ */ new Set(["href", "hrefLang", "target", "rel", "download", "ping", "referrerPolicy"]), Nc = /* @__PURE__ */ new Set(["dir", "lang", "hidden", "inert", "translate"]), Cn = /* @__PURE__ */ new Set(["onClick", "onAuxClick", "onContextMenu", "onDoubleClick", "onMouseDown", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseOut", "onMouseOver", "onMouseUp", "onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart", "onPointerDown", "onPointerMove", "onPointerUp", "onPointerCancel", "onPointerEnter", "onPointerLeave", "onPointerOver", "onPointerOut", "onGotPointerCapture", "onLostPointerCapture", "onScroll", "onWheel", "onAnimationStart", "onAnimationEnd", "onAnimationIteration", "onTransitionCancel", "onTransitionEnd", "onTransitionRun", "onTransitionStart"]), Lc = /^(data-.*)$/;
function oe(e, t = {}) {
  let { labelable: a, isLink: r, global: n, events: u = n, propNames: i } = t, o = {};
  for (const l in e) Object.prototype.hasOwnProperty.call(e, l) && (kc.has(l) || a && Mc.has(l) || r && Ic.has(l) || n && Nc.has(l) || u && (Cn.has(l) || l.endsWith("Capture") && Cn.has(l.slice(0, -7))) || (i == null ? void 0 : i.has(l)) || Lc.test(l)) && (o[l] = e[l]);
  return o;
}
let ot = "default", hr = "", ta = /* @__PURE__ */ new WeakMap();
function Vc(e) {
  if (ht() && Ye()) {
    if (ot === "default") {
      const t = W(e);
      hr = t.documentElement.style.webkitUserSelect, t.documentElement.style.webkitUserSelect = "none";
    }
    ot = "disabled";
  } else if (e instanceof HTMLElement || e instanceof SVGElement) {
    let t = "userSelect" in e.style ? "userSelect" : "webkitUserSelect";
    ta.set(e, e.style[t]), e.style[t] = "none";
  }
}
function wn(e) {
  if (ht() && Ye()) {
    if (ot !== "disabled") return;
    ot = "restoring", setTimeout(() => {
      Ku(() => {
        if (ot === "restoring") {
          const t = W(e);
          t.documentElement.style.webkitUserSelect === "none" && (t.documentElement.style.webkitUserSelect = hr || ""), hr = "", ot = "default";
        }
      });
    }, 300);
  } else if ((e instanceof HTMLElement || e instanceof SVGElement) && e && ta.has(e)) {
    let t = ta.get(e), a = "userSelect" in e.style ? "userSelect" : "webkitUserSelect";
    e.style[a] === "none" && (e.style[a] = t), e.getAttribute("style") === "" && e.removeAttribute("style"), ta.delete(e);
  }
}
function Pn(e) {
  var _a2;
  return ((_a2 = e == null ? void 0 : e.defaultView) == null ? void 0 : _a2.__webpack_nonce__) || globalThis.__webpack_nonce__ || void 0;
}
let za = /* @__PURE__ */ new WeakMap();
function qu(e) {
  let t = e ?? (typeof document < "u" ? document : void 0);
  if (!t) return Pn(t);
  if (za.has(t)) return za.get(t);
  let a = t.querySelector('meta[property="csp-nonce"]'), r = a && a instanceof ie(a).HTMLMetaElement && (a.nonce || a.content) || Pn(t) || void 0;
  return r !== void 0 && za.set(t, r), r;
}
const Zr = S.createContext({ register: () => {
} });
Zr.displayName = "PressResponderContext";
function wa() {
  let e = c.useRef(/* @__PURE__ */ new Map()), t = c.useCallback((n, u, i, o) => {
    let l = (o == null ? void 0 : o.once) ? (...s) => {
      e.current.delete(i), i(...s);
    } : i;
    e.current.set(i, { type: u, eventTarget: n, fn: l, options: o }), n.addEventListener(u, l, o);
  }, []), a = c.useCallback((n, u, i, o) => {
    var _a2;
    let l = ((_a2 = e.current.get(i)) == null ? void 0 : _a2.fn) || i;
    n.removeEventListener(u, l, o), e.current.delete(i);
  }, []), r = c.useCallback(() => {
    e.current.forEach((n, u) => {
      a(n.eventTarget, n.type, u, n.options);
    });
  }, [a]);
  return c.useEffect(() => r, [r]), { addGlobalListener: t, removeGlobalListener: a, removeAllGlobalListeners: r };
}
function Oc(e) {
  let t = c.useContext(Zr);
  if (t) {
    let { register: a, ref: r, ...n } = t;
    e = Y(n, e), a();
  }
  return Gu(t, e.ref), e;
}
class Zt {
  constructor(t, a, r, n) {
    __privateAdd(this, _e2);
    var _a2;
    __privateSet(this, _e2, true);
    const i = (_a2 = (n == null ? void 0 : n.target) ?? r.currentTarget) == null ? void 0 : _a2.getBoundingClientRect();
    let o, l = 0, s, d = null;
    r.clientX != null && r.clientY != null && (s = r.clientX, d = r.clientY), i && (s != null && d != null ? (o = s - i.left, l = d - i.top) : (o = i.width / 2, l = i.height / 2)), this.type = t, this.pointerType = a, this.target = r.currentTarget, this.shiftKey = r.shiftKey, this.metaKey = r.metaKey, this.ctrlKey = r.ctrlKey, this.altKey = r.altKey, this.x = o, this.y = l, this.key = r.key;
  }
  continuePropagation() {
    __privateSet(this, _e2, false);
  }
  get shouldStopPropagation() {
    return __privateGet(this, _e2);
  }
}
_e2 = new WeakMap();
const Sn = /* @__PURE__ */ Symbol("linkClicked"), Bn = "react-aria-pressable-style", Fn = "data-react-aria-pressable";
function Gr(e) {
  let { onPress: t, onPressChange: a, onPressStart: r, onPressEnd: n, onPressUp: u, onClick: i, isDisabled: o, isPressed: l, preventFocusOnPress: s, shouldCancelOnPointerExit: d, allowTextSelectionOnPress: f, ref: $, ...m } = Oc(e), [b, p] = c.useState(false), h = c.useRef({ isPressed: false, ignoreEmulatedMouseEvents: false, didFirePressStart: false, isTriggeringEvent: false, activePointerId: null, target: null, isOverTarget: false, pointerType: null, disposables: [] }), { addGlobalListener: y, removeAllGlobalListeners: x } = wa(), v = c.useCallback((D, I) => {
    let U = h.current;
    if (o || U.didFirePressStart) return false;
    let w = true;
    if (U.isTriggeringEvent = true, r) {
      let j = new Zt("pressstart", I, D);
      r(j), w = j.shouldStopPropagation;
    }
    return a && a(true), U.isTriggeringEvent = false, U.didFirePressStart = true, p(true), w;
  }, [o, r, a]), g = c.useCallback((D, I, U = true) => {
    let w = h.current;
    if (!w.didFirePressStart) return false;
    w.didFirePressStart = false, w.isTriggeringEvent = true;
    let j = true;
    if (n) {
      let P = new Zt("pressend", I, D);
      n(P), j = P.shouldStopPropagation;
    }
    if (a && a(false), p(false), t && U && !o) {
      let P = new Zt("press", I, D);
      t(P), j && (j = P.shouldStopPropagation);
    }
    return w.isTriggeringEvent = false, j;
  }, [o, n, a, t]), E = ne(g), B = c.useCallback((D, I) => {
    let U = h.current;
    if (o) return false;
    if (u) {
      U.isTriggeringEvent = true;
      let w = new Zt("pressup", I, D);
      return u(w), U.isTriggeringEvent = false, w.shouldStopPropagation;
    }
    return true;
  }, [o, u]), A = ne(B), k = c.useCallback((D) => {
    let I = h.current;
    if (I.isPressed && I.target) {
      I.didFirePressStart && I.pointerType != null && g(He(I.target, D), I.pointerType, false), I.isPressed = false, I.isOverTarget = false, I.activePointerId = null, I.pointerType = null, x(), f || wn(I.target);
      for (let U of I.disposables) U();
      I.disposables = [];
    }
  }, [f, x, g]), M = ne(k);
  c.useEffect(() => {
    o && h.current.isPressed && M({ currentTarget: h.current.target, shiftKey: false, ctrlKey: false, metaKey: false, altKey: false });
  }, [o]);
  let L = c.useCallback((D) => {
    d && k(D);
  }, [d, k]), C = c.useCallback((D) => {
    o || (i == null ? void 0 : i(D));
  }, [o, i]), N = c.useCallback((D, I) => {
    if (!o && i) {
      let U = new MouseEvent("click", D);
      Tu(U, I), i(Kr(U));
    }
  }, [o, i]), Q = c.useMemo(() => {
    let D = h.current, I = { onKeyDown(w) {
      var _a2;
      if (ja(w.nativeEvent, w.currentTarget) && _(w.currentTarget, V(w))) {
        Rn(V(w), w.key) && w.preventDefault();
        let j = true;
        !D.isPressed && !w.repeat && (D.target = w.currentTarget, D.isPressed = true, D.pointerType = "keyboard", j = v(w, "keyboard"));
        let P = w.currentTarget, R = (O) => {
          ja(O, P) && !O.repeat && _(P, V(O)) && D.target && A(He(D.target, O), "keyboard");
        };
        y(W(w.currentTarget), "keyup", $t(R, U), true), j && w.stopPropagation(), w.metaKey && Ge() && ((_a2 = D.metaKeyEvents) == null ? void 0 : _a2.set(w.key, w.nativeEvent));
      } else w.key === "Meta" && (D.metaKeyEvents = /* @__PURE__ */ new Map());
    }, onClick(w) {
      if (!(w && !_(w.currentTarget, V(w))) && w && w.button === 0 && !D.isTriggeringEvent && !Je.isOpening) {
        let j = true;
        if (o && w.preventDefault(), !D.ignoreEmulatedMouseEvents && !D.isPressed && (D.pointerType === "virtual" || Iu(w.nativeEvent))) {
          let P = v(w, "virtual"), R = A(w, "virtual"), O = E(w, "virtual");
          C(w), j = P && R && O;
        } else if (D.isPressed && D.pointerType !== "keyboard") {
          let P = D.pointerType || w.nativeEvent.pointerType || "virtual", R = A(He(w.currentTarget, w), P), O = E(He(w.currentTarget, w), P, true);
          j = R && O, D.isOverTarget = false, C(w), M(w);
        }
        D.ignoreEmulatedMouseEvents = false, j && w.stopPropagation();
      }
    } }, U = (w) => {
      var _a2, _b, _c2;
      if (D.isPressed && D.target && ja(w, D.target)) {
        Rn(V(w), w.key) && w.preventDefault();
        let j = V(w), P = _(D.target, j);
        E(He(D.target, w), "keyboard", P), P && N(w, D.target), x(), w.key !== "Enter" && Yr(D.target) && _(D.target, j) && !w[Sn] && (w[Sn] = true, Je(D.target, w, false)), D.isPressed = false, (_a2 = D.metaKeyEvents) == null ? void 0 : _a2.delete(w.key);
      } else if (w.key === "Meta" && ((_b = D.metaKeyEvents) == null ? void 0 : _b.size)) {
        let j = D.metaKeyEvents;
        D.metaKeyEvents = void 0;
        for (let P of j.values()) (_c2 = D.target) == null ? void 0 : _c2.dispatchEvent(new KeyboardEvent("keyup", P));
      }
    };
    if (typeof PointerEvent < "u") {
      I.onPointerDown = (P) => {
        if (P.button !== 0 || !_(P.currentTarget, V(P))) return;
        if (qd(P.nativeEvent)) {
          D.pointerType = "virtual";
          return;
        }
        D.pointerType = P.pointerType;
        let R = true;
        if (!D.isPressed) {
          D.isPressed = true, D.isOverTarget = true, D.activePointerId = P.pointerId, D.target = P.currentTarget, f || Vc(D.target), R = v(P, D.pointerType);
          let O = V(P);
          "releasePointerCapture" in O && ("hasPointerCapture" in O ? O.hasPointerCapture(P.pointerId) && O.releasePointerCapture(P.pointerId) : O.releasePointerCapture(P.pointerId)), y(W(P.currentTarget), "pointerup", w, false), y(W(P.currentTarget), "pointercancel", j, false);
        }
        R && P.stopPropagation();
      }, I.onMouseDown = (P) => {
        if (_(P.currentTarget, V(P)) && P.button === 0) {
          if (s) {
            let R = Gd(P.target);
            R && D.disposables.push(R);
          }
          P.stopPropagation();
        }
      }, I.onPointerUp = (P) => {
        !_(P.currentTarget, V(P)) || D.pointerType === "virtual" || P.button === 0 && !D.isPressed && A(P, D.pointerType || P.pointerType);
      }, I.onPointerEnter = (P) => {
        P.pointerId === D.activePointerId && D.target && !D.isOverTarget && D.pointerType != null && (D.isOverTarget = true, v(He(D.target, P), D.pointerType));
      }, I.onPointerLeave = (P) => {
        P.pointerId === D.activePointerId && D.target && D.isOverTarget && D.pointerType != null && (D.isOverTarget = false, E(He(D.target, P), D.pointerType, false), L(P));
      };
      let w = (P) => {
        if (P.pointerId === D.activePointerId && D.isPressed && P.button === 0 && D.target) {
          if (_(D.target, V(P)) && D.pointerType != null) {
            let R = false, O = setTimeout(() => {
              D.isPressed && D.target instanceof HTMLElement && (R ? M(P) : (Ze(D.target), D.target.click()));
            }, 80);
            y(P.currentTarget, "click", () => R = true, true), D.disposables.push(() => clearTimeout(O));
          } else M(P);
          D.isOverTarget = false;
        }
      }, j = (P) => {
        M(P);
      };
      I.onDragStart = (P) => {
        _(P.currentTarget, V(P)) && M(P);
      };
    }
    return I;
  }, [y, o, s, x, f, L, v, C, N]);
  return c.useEffect(() => {
    if (!$) return;
    const D = W($.current);
    if (!D || !D.head || D.getElementById(Bn)) return;
    const I = D.createElement("style");
    I.id = Bn;
    let U = qu(D);
    U && (I.nonce = U), I.textContent = `
@layer {
  [${Fn}] {
    touch-action: pan-x pan-y pinch-zoom;
  }
}
    `.trim(), D.head.prepend(I);
  }, [$]), c.useEffect(() => {
    let D = h.current;
    return () => {
      f || wn(D.target ?? void 0);
      for (let I of D.disposables) I();
      D.disposables = [];
    };
  }, [f]), { isPressed: l || b, pressProps: Y(m, Q, { [Fn]: true }) };
}
function Yr(e) {
  return e.tagName === "A" && e.hasAttribute("href");
}
function ja(e, t) {
  const { key: a, code: r } = e, n = t, u = n.getAttribute("role");
  return (a === "Enter" || a === " " || a === "Spacebar" || r === "Space") && !(n instanceof ie(n).HTMLInputElement && !Qu(n, a) || n instanceof ie(n).HTMLTextAreaElement || n.isContentEditable) && !((u === "link" || !u && Yr(n)) && a !== "Enter");
}
function He(e, t) {
  let a = t.clientX, r = t.clientY;
  return { currentTarget: e, shiftKey: t.shiftKey, ctrlKey: t.ctrlKey, metaKey: t.metaKey, altKey: t.altKey, clientX: a, clientY: r, key: t.key };
}
function Hc(e) {
  return e instanceof HTMLInputElement ? false : e instanceof HTMLButtonElement ? e.type !== "submit" && e.type !== "reset" : !Yr(e);
}
function Rn(e, t) {
  return Ge() && t === "Enter" ? false : e instanceof HTMLInputElement ? t === "Enter" && (e.type === "checkbox" || e.type === "radio") ? false : !Qu(e, t) : Hc(e);
}
const Uc = /* @__PURE__ */ new Set(["checkbox", "radio", "range", "color", "file", "image", "button", "submit", "reset"]);
function Qu(e, t) {
  return e.type === "checkbox" || e.type === "radio" ? t === " " : Uc.has(e.type);
}
function pt(e) {
  let { isDisabled: t, onBlurWithin: a, onFocusWithin: r, onFocusWithinChange: n } = e, u = c.useRef({ isFocusWithin: false }), { addGlobalListener: i, removeAllGlobalListeners: o } = wa(), l = c.useCallback((f) => {
    _(f.currentTarget, V(f)) && u.current.isFocusWithin && !_(f.currentTarget, f.relatedTarget) && (u.current.isFocusWithin = false, o(), a && a(f), n && n(false));
  }, [a, n, u, o]), s = Au(l), d = c.useCallback((f) => {
    if (!_(f.currentTarget, V(f))) return;
    let $ = V(f);
    const m = W($), b = q(m);
    if (!u.current.isFocusWithin && b === $) {
      r && r(f), n && n(true), u.current.isFocusWithin = true, s(f);
      let p = f.currentTarget;
      i(m, "focus", (h) => {
        let y = V(h);
        if (u.current.isFocusWithin && !_(p, y)) {
          let x = new m.defaultView.FocusEvent("blur", { relatedTarget: y });
          Tu(x, p);
          let v = Kr(x);
          l(v);
        }
      }, { capture: true });
    }
  }, [r, n, s, i, l]);
  return t ? { focusWithinProps: { onFocus: void 0, onBlur: void 0 } } : { focusWithinProps: { onFocus: d, onBlur: l } };
}
function yt(e = {}) {
  let { autoFocus: t = false, isTextInput: a, within: r } = e, n = c.useRef({ isFocused: false, isFocusVisible: t || mr() }), [u, i] = c.useState(false), [o, l] = c.useState(() => n.current.isFocused && n.current.isFocusVisible), s = c.useCallback(() => l(n.current.isFocused && n.current.isFocusVisible), []), d = c.useCallback((m) => {
    n.current.isFocused = m, n.current.isFocusVisible = mr(), i(m), s();
  }, [s]);
  nc((m) => {
    n.current.isFocusVisible = m, s();
  }, [a, u], { enabled: u, isTextInput: a });
  let { focusProps: f } = _u({ isDisabled: r, onFocusChange: d }), { focusWithinProps: $ } = pt({ isDisabled: !r, onFocusWithinChange: d });
  return { isFocused: u, isFocusVisible: o, focusProps: r ? $ : f };
}
let pr = false, Gt = 0;
function zc() {
  pr = true, setTimeout(() => {
    pr = false;
  }, 500);
}
function Tn(e) {
  e.pointerType === "touch" && zc();
}
function jc() {
  let e = W(null);
  if (!(typeof e > "u")) return Gt === 0 && typeof PointerEvent < "u" && e.addEventListener("pointerup", Tn), Gt++, () => {
    Gt--, !(Gt > 0) && typeof PointerEvent < "u" && e.removeEventListener("pointerup", Tn);
  };
}
function Ht(e) {
  let { onHoverStart: t, onHoverChange: a, onHoverEnd: r, isDisabled: n } = e, [u, i] = c.useState(false), o = c.useRef({ isHovered: false, ignoreEmulatedMouseEvents: false, pointerType: "", target: null }).current;
  c.useEffect(jc, []);
  let { addGlobalListener: l, removeAllGlobalListeners: s } = wa(), { hoverProps: d, triggerHoverEnd: f } = c.useMemo(() => {
    let $ = (p, h) => {
      if (o.pointerType = h, n || h === "touch" || o.isHovered || !_(p.currentTarget, V(p))) return;
      o.isHovered = true;
      let y = p.currentTarget;
      o.target = y, l(W(V(p)), "pointerover", (x) => {
        o.isHovered && o.target && !_(o.target, V(x)) && m(x, x.pointerType);
      }, { capture: true }), t && t({ type: "hoverstart", target: y, pointerType: h }), a && a(true), i(true);
    }, m = (p, h) => {
      let y = o.target;
      o.pointerType = "", o.target = null, !(h === "touch" || !o.isHovered || !y) && (o.isHovered = false, s(), r && r({ type: "hoverend", target: y, pointerType: h }), a && a(false), i(false));
    }, b = {};
    return typeof PointerEvent < "u" && (b.onPointerEnter = (p) => {
      pr && p.pointerType === "mouse" || $(p, p.pointerType);
    }, b.onPointerLeave = (p) => {
      !n && _(p.currentTarget, V(p)) && m(p, p.pointerType);
    }), { hoverProps: b, triggerHoverEnd: m };
  }, [t, a, r, n, o, l, s]);
  return c.useEffect(() => {
    n && f({ currentTarget: o.target }, o.pointerType);
  }, [n]), { hoverProps: d, isHovered: u };
}
const Jr = c.createContext({}), um = Wr(function(t, a) {
  [t, a] = Ce(t, a, Jr);
  let { elementType: r = "label", ...n } = t, u = de[r];
  return S.createElement(u, { className: "react-aria-Label", ...n, ref: a });
});
function Kc(e) {
  let { id: t, label: a, "aria-labelledby": r, "aria-label": n, labelElementType: u = "label" } = e;
  t = Ee(t);
  let i = Ee(), o = {};
  a && (r = r ? `${i} ${r}` : i, o = { id: i, htmlFor: u === "label" ? t : void 0 });
  let l = Ot({ id: t, "aria-label": n, "aria-labelledby": r });
  return { labelProps: o, fieldProps: l };
}
let Ka = /* @__PURE__ */ new Map(), yr = false;
try {
  yr = new Intl.NumberFormat("de-DE", { signDisplay: "exceptZero" }).resolvedOptions().signDisplay === "exceptZero";
} catch {
}
let ca = false;
try {
  ca = new Intl.NumberFormat("de-DE", { style: "unit", unit: "degree" }).resolvedOptions().style === "unit";
} catch {
}
const Xu = { degree: { narrow: { default: "\xB0", "ja-JP": " \u5EA6", "zh-TW": "\u5EA6", "sl-SI": " \xB0" } } };
class Dr {
  constructor(t, a = {}) {
    this.numberFormatter = _c(t, a), this.options = a;
  }
  format(t) {
    var _a2;
    let a = "";
    if (!yr && this.options.signDisplay != null ? a = Wc(this.numberFormatter, this.options.signDisplay, t) : a = this.numberFormatter.format(t), this.options.style === "unit" && !ca) {
      let { unit: r, unitDisplay: n = "short", locale: u } = this.resolvedOptions();
      if (!r) return a;
      let i = (_a2 = Xu[r]) == null ? void 0 : _a2[n];
      a += i[u] || i.default;
    }
    return a;
  }
  formatToParts(t) {
    return this.numberFormatter.formatToParts(t);
  }
  formatRange(t, a) {
    if (typeof this.numberFormatter.formatRange == "function") return this.numberFormatter.formatRange(t, a);
    if (a < t) throw new RangeError("End date must be >= start date");
    return `${this.format(t)} \u2013 ${this.format(a)}`;
  }
  formatRangeToParts(t, a) {
    if (typeof this.numberFormatter.formatRangeToParts == "function") return this.numberFormatter.formatRangeToParts(t, a);
    if (a < t) throw new RangeError("End date must be >= start date");
    let r = this.numberFormatter.formatToParts(t), n = this.numberFormatter.formatToParts(a);
    return [...r.map((u) => ({ ...u, source: "startRange" })), { type: "literal", value: " \u2013 ", source: "shared" }, ...n.map((u) => ({ ...u, source: "endRange" }))];
  }
  resolvedOptions() {
    let t = this.numberFormatter.resolvedOptions();
    return !yr && this.options.signDisplay != null && (t = { ...t, signDisplay: this.options.signDisplay }), !ca && this.options.style === "unit" && (t = { ...t, style: "unit", unit: this.options.unit, unitDisplay: this.options.unitDisplay }), t;
  }
}
function _c(e, t = {}) {
  var _a2;
  let { numberingSystem: a } = t;
  if (a && e.includes("-nu-") && (e.includes("-u-") || (e += "-u-"), e += `-nu-${a}`), t.style === "unit" && !ca) {
    let { unit: u, unitDisplay: i = "short" } = t;
    if (!u) throw new Error('unit option must be provided with style: "unit"');
    if (!((_a2 = Xu[u]) == null ? void 0 : _a2[i])) throw new Error(`Unsupported unit ${u} with unitDisplay = ${i}`);
    t = { ...t, style: "decimal" };
  }
  let r = e + (t ? Object.entries(t).sort((u, i) => u[0] < i[0] ? -1 : 1).join() : "");
  if (Ka.has(r)) return Ka.get(r);
  let n = new Intl.NumberFormat(e, t);
  return Ka.set(r, n), n;
}
function Wc(e, t, a) {
  if (t === "auto") return e.format(a);
  if (t === "never") return e.format(Math.abs(a));
  {
    let r = false;
    if (t === "always" ? r = a > 0 || Object.is(a, 0) : t === "exceptZero" && (Object.is(a, -0) || Object.is(a, 0) ? a = Math.abs(a) : r = a > 0), r) {
      let n = e.format(-a), u = e.format(a), i = n.replace(u, "").replace(/\u200e|\u061C/, "");
      return [...i].length !== 1 && console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case"), n.replace(u, "!!!").replace(i, "+").replace("!!!", u);
    } else return e.format(a);
  }
}
const Zc = new RegExp("^.*\\(.*\\).*$"), Gc = ["latn", "arab", "hanidec", "deva", "beng", "fullwide"];
class ei {
  constructor(t, a = {}) {
    this.locale = t, this.options = a;
  }
  parse(t) {
    return _a(this.locale, this.options, t).parse(t);
  }
  isValidPartialNumber(t, a, r) {
    return _a(this.locale, this.options, t).isValidPartialNumber(t, a, r);
  }
  getNumberingSystem(t) {
    return _a(this.locale, this.options, t).options.numberingSystem;
  }
}
const An = /* @__PURE__ */ new Map();
function _a(e, t, a) {
  let r = kn(e, t);
  if (!e.includes("-nu-") && !r.isValidPartialNumber(a)) {
    for (let n of Gc) if (n !== r.options.numberingSystem) {
      let u = kn(e + (e.includes("-u-") ? "-nu-" : "-u-nu-") + n, t);
      if (u.isValidPartialNumber(a)) return u;
    }
  }
  return r;
}
function kn(e, t) {
  let a = e + (t ? Object.entries(t).sort((n, u) => n[0] < u[0] ? -1 : 1).join() : ""), r = An.get(a);
  return r || (r = new Yc(e, t), An.set(a, r)), r;
}
class Yc {
  constructor(t, a = {}) {
    this.locale = t, a.roundingIncrement !== 1 && a.roundingIncrement != null && (a.maximumFractionDigits == null && a.minimumFractionDigits == null ? (a.maximumFractionDigits = 0, a.minimumFractionDigits = 0) : a.maximumFractionDigits == null ? a.maximumFractionDigits = a.minimumFractionDigits : a.minimumFractionDigits == null && (a.minimumFractionDigits = a.maximumFractionDigits)), this.formatter = new Intl.NumberFormat(t, a), this.options = this.formatter.resolvedOptions(), this.symbols = Jc(t, this.formatter, this.options, a), this.options.style === "percent" && ((this.options.minimumFractionDigits ?? 0) > 18 || (this.options.maximumFractionDigits ?? 0) > 18) && console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.");
  }
  parse(t) {
    let a = this.formatter.resolvedOptions().useGrouping, r = this.sanitize(t);
    if (!a && this.symbols.group && r.includes(this.symbols.group)) return NaN;
    if (this.symbols.group && (r = r.replaceAll(this.symbols.group, "")), this.symbols.decimal && (r = r.replace(this.symbols.decimal, ".")), this.symbols.minusSign && (r = r.replace(this.symbols.minusSign, "-")), r = r.replace(this.symbols.numeral, this.symbols.index), this.options.style === "percent") {
      let u = r.indexOf("-");
      r = r.replace("-", ""), r = r.replace("+", "");
      let i = r.indexOf(".");
      i === -1 && (i = r.length), r = r.replace(".", ""), i - 2 === 0 ? r = `0.${r}` : i - 2 === -1 ? r = `0.0${r}` : i - 2 === -2 ? r = "0.00" : r = `${r.slice(0, i - 2)}.${r.slice(i - 2)}`, u > -1 && (r = `-${r}`);
    }
    let n = r ? +r : NaN;
    if (isNaN(n)) return NaN;
    if (this.options.style === "percent") {
      let u = { ...this.options, style: "decimal", minimumFractionDigits: Math.min((this.options.minimumFractionDigits ?? 0) + 2, 20), maximumFractionDigits: Math.min((this.options.maximumFractionDigits ?? 0) + 2, 20) };
      return new ei(this.locale, u).parse(new Dr(this.locale, u).format(n));
    }
    return this.options.currencySign === "accounting" && Zc.test(t) && (n = -1 * n), n;
  }
  sanitize(t) {
    let a = this.formatter.resolvedOptions().useGrouping;
    return this.symbols.noNumeralUnits.length > 0 && this.symbols.noNumeralUnits.find((r) => r.unit === t) ? this.symbols.noNumeralUnits.find((r) => r.unit === t).value.toString() : (t = t.replace(this.symbols.literals, ""), this.symbols.minusSign && (t = t.replace("-", this.symbols.minusSign)), this.options.numberingSystem === "arab" && (this.symbols.decimal && (t = Ae(t, ",", this.symbols.decimal), t = Ae(t, "\u060C", this.symbols.decimal)), this.symbols.group && a && (t = Ae(t, ".", this.symbols.group))), this.symbols.group === "\u2019" && t.includes("'") && a && (t = Ae(t, "'", this.symbols.group)), this.symbols.group === "'" && t.includes("\u2019") && a && (t = Ae(t, "\u2019", this.symbols.group)), this.options.locale === "fr-FR" && this.symbols.group && a && (t = Ae(t, " ", this.symbols.group), t = Ae(t, /\u00A0/g, this.symbols.group)), t);
  }
  isValidPartialNumber(t, a = -1 / 0, r = 1 / 0) {
    let n = this.formatter.resolvedOptions().useGrouping;
    return t = this.sanitize(t), this.symbols.minusSign && t.startsWith(this.symbols.minusSign) && a < 0 ? t = t.slice(this.symbols.minusSign.length) : this.symbols.plusSign && t.startsWith(this.symbols.plusSign) && r > 0 && (t = t.slice(this.symbols.plusSign.length)), this.symbols.decimal && t.indexOf(this.symbols.decimal) > -1 && this.options.maximumFractionDigits === 0 ? false : (this.symbols.group && n && (t = Ae(t, this.symbols.group, "")), t = t.replace(this.symbols.numeral, ""), this.symbols.decimal && (t = t.replace(this.symbols.decimal, "")), t.length === 0);
  }
}
const Mn = /* @__PURE__ */ new Set(["decimal", "fraction", "integer", "minusSign", "plusSign", "group"]), In = [0, 4, 2, 1, 11, 20, 3, 7, 100, 21, 0.1, 1.1];
function Jc(e, t, a, r) {
  var _a2, _b, _c2, _d2;
  let n = new Intl.NumberFormat(e, { ...a, minimumSignificantDigits: 1, maximumSignificantDigits: 21, roundingIncrement: 1, roundingPriority: "auto", roundingMode: "halfExpand", useGrouping: true }), u = n.formatToParts(-10000.111), i = n.formatToParts(10000.111), o = In.map((B) => n.formatToParts(B)), l = o.map((B, A) => {
    let k = B.find((M) => M.type === "unit");
    return k && !B.some((M) => M.type === "integer" || M.type === "fraction") ? { unit: k.value, value: In[A] } : null;
  }).filter((B) => !!B), s = ((_a2 = u.find((B) => B.type === "minusSign")) == null ? void 0 : _a2.value) ?? "-", d = (_b = i.find((B) => B.type === "plusSign")) == null ? void 0 : _b.value;
  !d && ((r == null ? void 0 : r.signDisplay) === "exceptZero" || (r == null ? void 0 : r.signDisplay) === "always") && (d = "+");
  let $ = (_c2 = new Intl.NumberFormat(e, { ...a, minimumFractionDigits: 2, maximumFractionDigits: 2 }).formatToParts(1e-3).find((B) => B.type === "decimal")) == null ? void 0 : _c2.value, m = (_d2 = u.find((B) => B.type === "group")) == null ? void 0 : _d2.value, b = u.filter((B) => !Mn.has(B.type)).map((B) => Nn(B.value)), p = o.flatMap((B) => B.filter((A) => !Mn.has(A.type)).map((A) => Nn(A.value))), h = [.../* @__PURE__ */ new Set([...b, ...p])].sort((B, A) => A.length - B.length), y = h.length === 0 ? new RegExp("\\p{White_Space}|\\p{Cf}", "gu") : new RegExp(`${h.join("|")}|\\p{White_Space}|\\p{Cf}`, "gu"), x = [...new Intl.NumberFormat(a.locale, { useGrouping: false }).format(9876543210)].reverse(), v = new Map(x.map((B, A) => [B, A])), g = new RegExp(`[${x.join("")}]`, "g");
  return { minusSign: s, plusSign: d, decimal: $, group: m, literals: y, numeral: g, numerals: x, index: (B) => String(v.get(B)), noNumeralUnits: l };
}
function Ae(e, t, a) {
  return e.replaceAll ? e.replaceAll(t, a) : e.split(t).join(a);
}
function Nn(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function gr(e, t = -1 / 0, a = 1 / 0) {
  return Math.min(Math.max(e, t), a);
}
const qc = c.createContext(null), ti = 7e3;
let ke = null;
function Tt(e, t = "assertive", a = ti) {
  ke ? ke.announce(e, t, a) : (ke = new Xc(), (typeof IS_REACT_ACT_ENVIRONMENT == "boolean" ? IS_REACT_ACT_ENVIRONMENT : typeof jest < "u") ? ke.announce(e, t, a) : setTimeout(() => {
    (ke == null ? void 0 : ke.isAttached()) && (ke == null ? void 0 : ke.announce(e, t, a));
  }, 100));
}
function Qc(e) {
  ke && ke.clear(e);
}
class Xc {
  constructor() {
    this.node = null, this.assertiveLog = null, this.politeLog = null, typeof document < "u" && (this.node = document.createElement("div"), this.node.dataset.liveAnnouncer = "true", Object.assign(this.node.style, { border: 0, clip: "rect(0 0 0 0)", clipPath: "inset(50%)", height: "1px", margin: "-1px", overflow: "hidden", padding: 0, position: "absolute", width: "1px", whiteSpace: "nowrap" }), this.assertiveLog = this.createLog("assertive"), this.node.appendChild(this.assertiveLog), this.politeLog = this.createLog("polite"), this.node.appendChild(this.politeLog), document.body.prepend(this.node));
  }
  isAttached() {
    var _a2;
    return (_a2 = this.node) == null ? void 0 : _a2.isConnected;
  }
  createLog(t) {
    let a = document.createElement("div");
    return a.setAttribute("role", "log"), a.setAttribute("aria-live", t), a.setAttribute("aria-relevant", "additions"), a;
  }
  destroy() {
    this.node && (document.body.removeChild(this.node), this.node = null);
  }
  announce(t, a = "assertive", r = ti) {
    var _a2, _b;
    if (!this.node) return;
    let n = document.createElement("div");
    typeof t == "object" ? (n.setAttribute("role", "img"), n.setAttribute("aria-labelledby", t["aria-labelledby"])) : n.textContent = t, a === "assertive" ? (_a2 = this.assertiveLog) == null ? void 0 : _a2.appendChild(n) : (_b = this.politeLog) == null ? void 0 : _b.appendChild(n), t !== "" && setTimeout(() => {
      n.remove();
    }, r);
  }
  clear(t) {
    this.node && ((!t || t === "assertive") && this.assertiveLog && (this.assertiveLog.innerHTML = ""), (!t || t === "polite") && this.politeLog && (this.politeLog.innerHTML = ""));
  }
}
function ef(e, t) {
  let { elementType: a = "button", isDisabled: r, onPress: n, onPressStart: u, onPressEnd: i, onPressUp: o, onPressChange: l, preventFocusOnPress: s, allowFocusWhenDisabled: d, onClick: f, href: $, target: m, rel: b, type: p = "button" } = e, h;
  a === "button" ? h = { type: p, disabled: r, form: e.form, formAction: e.formAction, formEncType: e.formEncType, formMethod: e.formMethod, formNoValidate: e.formNoValidate, formTarget: e.formTarget, name: e.name, value: e.value } : h = { role: "button", href: a === "a" && !r ? $ : void 0, target: a === "a" ? m : void 0, type: a === "input" ? p : void 0, disabled: a === "input" ? r : void 0, "aria-disabled": !r || a === "input" ? void 0 : r, rel: a === "a" ? b : void 0 };
  let { pressProps: y, isPressed: x } = Gr({ onPressStart: u, onPressEnd: i, onPressChange: l, onPress: n, onPressUp: o, onClick: f, isDisabled: r, preventFocusOnPress: s, ref: t }), { focusableProps: v } = Tc(e, t);
  d && (v.tabIndex = r ? -1 : v.tabIndex);
  let g = Y(v, y, oe(e, { labelable: true }));
  return { isPressed: x, buttonProps: Y(h, g, { "aria-haspopup": e["aria-haspopup"], "aria-expanded": e["aria-expanded"], "aria-controls": e["aria-controls"], "aria-pressed": e["aria-pressed"], "aria-current": e["aria-current"], "aria-disabled": e["aria-disabled"] }) };
}
const Ut = c.createContext({}), im = Wr(function(t, a) {
  [t, a] = Ce(t, a, Ut);
  let r = t, { isPending: n } = r, { buttonProps: u, isPressed: i } = ef(t, a);
  u = af(u, n);
  let { focusProps: o, isFocused: l, isFocusVisible: s } = yt(t), { hoverProps: d, isHovered: f } = Ht({ ...t, isDisabled: t.isDisabled || n }), $ = { isHovered: f, isPressed: (r.isPressed || i) && !n, isFocused: l, isFocusVisible: s, isDisabled: t.isDisabled || false, isPending: n ?? false }, m = Te({ ...t, values: $, defaultClassName: "react-aria-Button" }), b = Ee(u.id), p = Ee(), h = u["aria-labelledby"];
  n && (h ? h = `${h} ${p}` : u["aria-label"] && (h = `${b} ${p}`));
  let y = c.useRef(n);
  c.useEffect(() => {
    let v = { "aria-labelledby": h || b };
    (!y.current && l && n || y.current && l && !n) && Tt(v, "assertive"), y.current = n;
  }, [n, l, h, b]);
  let x = oe(t, { global: true });
  return delete x.onClick, S.createElement(de.button, { ...Y(x, m, u, o, d), type: u.type === "submit" && n ? "button" : u.type, id: b, ref: a, "aria-labelledby": h, slot: t.slot || void 0, "aria-disabled": n ? "true" : u["aria-disabled"], "data-disabled": t.isDisabled || void 0, "data-pressed": $.isPressed || void 0, "data-hovered": f || void 0, "data-focused": l || void 0, "data-pending": n || void 0, "data-focus-visible": s || void 0 }, S.createElement(qc.Provider, { value: { id: p } }, m.children));
}), tf = /Focus|Blur|Hover|Pointer(Enter|Leave|Over|Out)|Mouse(Enter|Leave|Over|Out)/;
function af(e, t) {
  if (t) {
    for (const a in e) a.startsWith("on") && !tf.test(a) && (e[a] = void 0);
    e.href = void 0, e.target = void 0;
  }
  return e;
}
const qr = c.createContext({}), om = c.forwardRef(function(t, a) {
  [t, a] = Ce(t, a, qr);
  let { children: r, level: n = 3, className: u, ...i } = t, o = de[`h${n}`];
  return S.createElement(o, { ...i, ref: a, className: u ?? "react-aria-Heading" }, r);
}), Pa = c.createContext({});
var ai = {};
ai = { dateRange: (e) => `${e.startDate} \u0625\u0644\u0649 ${e.endDate}`, dateSelected: (e) => `${e.date} \u0627\u0644\u0645\u062D\u062F\u062F`, finishRangeSelectionPrompt: "\u0627\u0646\u0642\u0631 \u0644\u0625\u0646\u0647\u0627\u0621 \u0639\u0645\u0644\u064A\u0629 \u062A\u062D\u062F\u064A\u062F \u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u0627\u0631\u064A\u062E", maximumDate: "\u0622\u062E\u0631 \u062A\u0627\u0631\u064A\u062E \u0645\u062A\u0627\u062D", minimumDate: "\u0623\u0648\u0644 \u062A\u0627\u0631\u064A\u062E \u0645\u062A\u0627\u062D", next: "\u0627\u0644\u062A\u0627\u0644\u064A", previous: "\u0627\u0644\u0633\u0627\u0628\u0642", selectedDateDescription: (e) => `\u062A\u0627\u0631\u064A\u062E \u0645\u062D\u062F\u062F: ${e.date}`, selectedRangeDescription: (e) => `\u0627\u0644\u0645\u062F\u0649 \u0627\u0644\u0632\u0645\u0646\u064A \u0627\u0644\u0645\u062D\u062F\u062F: ${e.dateRange}`, startRangeSelectionPrompt: "\u0627\u0646\u0642\u0631 \u0644\u0628\u062F\u0621 \u0639\u0645\u0644\u064A\u0629 \u062A\u062D\u062F\u064A\u062F \u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u0627\u0631\u064A\u062E", todayDate: (e) => `\u0627\u0644\u064A\u0648\u0645\u060C ${e.date}`, todayDateSelected: (e) => `\u0627\u0644\u064A\u0648\u0645\u060C ${e.date} \u0645\u062D\u062F\u062F` };
var ri = {};
ri = { dateRange: (e) => `${e.startDate} \u0434\u043E ${e.endDate}`, dateSelected: (e) => `\u0418\u0437\u0431\u0440\u0430\u043D\u043E \u0435 ${e.date}`, finishRangeSelectionPrompt: "\u041D\u0430\u0442\u0438\u0441\u043D\u0435\u0442\u0435, \u0437\u0430 \u0434\u0430 \u0434\u043E\u0432\u044A\u0440\u0448\u0438\u0442\u0435 \u0438\u0437\u0431\u043E\u0440\u0430 \u043D\u0430 \u0432\u0440\u0435\u043C\u0435\u0432\u0438 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B", maximumDate: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0430 \u043D\u0430\u043B\u0438\u0447\u043D\u0430 \u0434\u0430\u0442\u0430", minimumDate: "\u041F\u044A\u0440\u0432\u0430 \u043D\u0430\u043B\u0438\u0447\u043D\u0430 \u0434\u0430\u0442\u0430", next: "\u041D\u0430\u043F\u0440\u0435\u0434", previous: "\u041D\u0430\u0437\u0430\u0434", selectedDateDescription: (e) => `\u0418\u0437\u0431\u0440\u0430\u043D\u0430 \u0434\u0430\u0442\u0430: ${e.date}`, selectedRangeDescription: (e) => `\u0418\u0437\u0431\u0440\u0430\u043D \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D: ${e.dateRange}`, startRangeSelectionPrompt: "\u041D\u0430\u0442\u0438\u0441\u043D\u0435\u0442\u0435, \u0437\u0430 \u0434\u0430 \u043F\u0440\u0438\u0441\u0442\u044A\u043F\u0438\u0442\u0435 \u043A\u044A\u043C \u0438\u0437\u0431\u043E\u0440\u0430 \u043D\u0430 \u0432\u0440\u0435\u043C\u0435\u0432\u0438 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B", todayDate: (e) => `\u0414\u043D\u0435\u0441, ${e.date}`, todayDateSelected: (e) => `\u0414\u043D\u0435\u0441, ${e.date} \u0441\u0430 \u0438\u0437\u0431\u0440\u0430\u043D\u0438` };
var ni = {};
ni = { dateRange: (e) => `${e.startDate} a\u017E ${e.endDate}`, dateSelected: (e) => `Vybr\xE1no ${e.date}`, finishRangeSelectionPrompt: "Kliknut\xEDm dokon\u010D\xEDte v\xFDb\u011Br rozsahu dat", maximumDate: "Posledn\xED dostupn\xE9 datum", minimumDate: "Prvn\xED dostupn\xE9 datum", next: "Dal\u0161\xED", previous: "P\u0159edchoz\xED", selectedDateDescription: (e) => `Vybran\xE9 datum: ${e.date}`, selectedRangeDescription: (e) => `Vybran\xE9 obdob\xED: ${e.dateRange}`, startRangeSelectionPrompt: "Kliknut\xEDm zah\xE1j\xEDte v\xFDb\u011Br rozsahu dat", todayDate: (e) => `Dnes, ${e.date}`, todayDateSelected: (e) => `Dnes, vybr\xE1no ${e.date}` };
var ui = {};
ui = { dateRange: (e) => `${e.startDate} til ${e.endDate}`, dateSelected: (e) => `${e.date} valgt`, finishRangeSelectionPrompt: "Klik for at fuldf\xF8re valg af datoomr\xE5de", maximumDate: "Sidste ledige dato", minimumDate: "F\xF8rste ledige dato", next: "N\xE6ste", previous: "Forrige", selectedDateDescription: (e) => `Valgt dato: ${e.date}`, selectedRangeDescription: (e) => `Valgt interval: ${e.dateRange}`, startRangeSelectionPrompt: "Klik for at starte valg af datoomr\xE5de", todayDate: (e) => `I dag, ${e.date}`, todayDateSelected: (e) => `I dag, ${e.date} valgt` };
var ii = {};
ii = { dateRange: (e) => `${e.startDate} bis ${e.endDate}`, dateSelected: (e) => `${e.date} ausgew\xE4hlt`, finishRangeSelectionPrompt: "Klicken, um die Auswahl des Datumsbereichs zu beenden", maximumDate: "Letztes verf\xFCgbares Datum", minimumDate: "Erstes verf\xFCgbares Datum", next: "Weiter", previous: "Zur\xFCck", selectedDateDescription: (e) => `Ausgew\xE4hltes Datum: ${e.date}`, selectedRangeDescription: (e) => `Ausgew\xE4hlter Bereich: ${e.dateRange}`, startRangeSelectionPrompt: "Klicken, um die Auswahl des Datumsbereichs zu beginnen", todayDate: (e) => `Heute, ${e.date}`, todayDateSelected: (e) => `Heute, ${e.date} ausgew\xE4hlt` };
var oi = {};
oi = { dateRange: (e) => `${e.startDate} \u03AD\u03C9\u03C2 ${e.endDate}`, dateSelected: (e) => `\u0395\u03C0\u03B9\u03BB\u03AD\u03C7\u03B8\u03B7\u03BA\u03B5 ${e.date}`, finishRangeSelectionPrompt: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03BF\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03CE\u03C3\u03B5\u03C4\u03B5 \u03C4\u03B7\u03BD \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE \u03B5\u03CD\u03C1\u03BF\u03C5\u03C2 \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03B9\u03CE\u03BD", maximumDate: "\u03A4\u03B5\u03BB\u03B5\u03C5\u03C4\u03B1\u03AF\u03B1 \u03B4\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03B7 \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1", minimumDate: "\u03A0\u03C1\u03CE\u03C4\u03B7 \u03B4\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03B7 \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1", next: "\u0395\u03C0\u03CC\u03BC\u03B5\u03BD\u03BF", previous: "\u03A0\u03C1\u03BF\u03B7\u03B3\u03BF\u03CD\u03BC\u03B5\u03BD\u03BF", selectedDateDescription: (e) => `\u0395\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03B7 \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1: ${e.date}`, selectedRangeDescription: (e) => `\u0395\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03BF \u03B5\u03CD\u03C1\u03BF\u03C2: ${e.dateRange}`, startRangeSelectionPrompt: "\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03BE\u03B5\u03BA\u03B9\u03BD\u03AE\u03C3\u03B5\u03C4\u03B5 \u03C4\u03B7\u03BD \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE \u03B5\u03CD\u03C1\u03BF\u03C5\u03C2 \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03B9\u03CE\u03BD", todayDate: (e) => `\u03A3\u03AE\u03BC\u03B5\u03C1\u03B1, ${e.date}`, todayDateSelected: (e) => `\u03A3\u03AE\u03BC\u03B5\u03C1\u03B1, \u03B5\u03C0\u03B9\u03BB\u03AD\u03C7\u03C4\u03B7\u03BA\u03B5 ${e.date}` };
var li = {};
li = { previous: "Previous", next: "Next", selectedDateDescription: (e) => `Selected Date: ${e.date}`, selectedRangeDescription: (e) => `Selected Range: ${e.dateRange}`, todayDate: (e) => `Today, ${e.date}`, todayDateSelected: (e) => `Today, ${e.date} selected`, dateSelected: (e) => `${e.date} selected`, startRangeSelectionPrompt: "Click to start selecting date range", finishRangeSelectionPrompt: "Click to finish selecting date range", minimumDate: "First available date", maximumDate: "Last available date", dateRange: (e) => `${e.startDate} to ${e.endDate}` };
var si = {};
si = { dateRange: (e) => `${e.startDate} a ${e.endDate}`, dateSelected: (e) => `${e.date} seleccionado`, finishRangeSelectionPrompt: "Haga clic para terminar de seleccionar rango de fechas", maximumDate: "\xDAltima fecha disponible", minimumDate: "Primera fecha disponible", next: "Siguiente", previous: "Anterior", selectedDateDescription: (e) => `Fecha seleccionada: ${e.date}`, selectedRangeDescription: (e) => `Intervalo seleccionado: ${e.dateRange}`, startRangeSelectionPrompt: "Haga clic para comenzar a seleccionar un rango de fechas", todayDate: (e) => `Hoy, ${e.date}`, todayDateSelected: (e) => `Hoy, ${e.date} seleccionado` };
var di = {};
di = { dateRange: (e) => `${e.startDate} kuni ${e.endDate}`, dateSelected: (e) => `${e.date} valitud`, finishRangeSelectionPrompt: "Kl\xF5psake kuup\xE4evavahemiku valimise l\xF5petamiseks", maximumDate: "Viimane saadaolev kuup\xE4ev", minimumDate: "Esimene saadaolev kuup\xE4ev", next: "J\xE4rgmine", previous: "Eelmine", selectedDateDescription: (e) => `Valitud kuup\xE4ev: ${e.date}`, selectedRangeDescription: (e) => `Valitud vahemik: ${e.dateRange}`, startRangeSelectionPrompt: "Kl\xF5psake kuup\xE4evavahemiku valimiseks", todayDate: (e) => `T\xE4na, ${e.date}`, todayDateSelected: (e) => `T\xE4na, ${e.date} valitud` };
var ci = {};
ci = { dateRange: (e) => `${e.startDate} \u2013 ${e.endDate}`, dateSelected: (e) => `${e.date} valittu`, finishRangeSelectionPrompt: "Lopeta p\xE4iv\xE4m\xE4\xE4r\xE4alueen valinta napsauttamalla t\xE4t\xE4.", maximumDate: "Viimeinen varattavissa oleva p\xE4iv\xE4m\xE4\xE4r\xE4", minimumDate: "Ensimm\xE4inen varattavissa oleva p\xE4iv\xE4m\xE4\xE4r\xE4", next: "Seuraava", previous: "Edellinen", selectedDateDescription: (e) => `Valittu p\xE4iv\xE4m\xE4\xE4r\xE4: ${e.date}`, selectedRangeDescription: (e) => `Valittu aikav\xE4li: ${e.dateRange}`, startRangeSelectionPrompt: "Aloita p\xE4iv\xE4m\xE4\xE4r\xE4alueen valinta napsauttamalla t\xE4t\xE4.", todayDate: (e) => `T\xE4n\xE4\xE4n, ${e.date}`, todayDateSelected: (e) => `T\xE4n\xE4\xE4n, ${e.date} valittu` };
var fi = {};
fi = { dateRange: (e) => `${e.startDate} \xE0 ${e.endDate}`, dateSelected: (e) => `${e.date} s\xE9lectionn\xE9`, finishRangeSelectionPrompt: "Cliquer pour finir de s\xE9lectionner la plage de dates", maximumDate: "Derni\xE8re date disponible", minimumDate: "Premi\xE8re date disponible", next: "Suivant", previous: "Pr\xE9c\xE9dent", selectedDateDescription: (e) => `Date s\xE9lectionn\xE9e\xA0: ${e.date}`, selectedRangeDescription: (e) => `Plage s\xE9lectionn\xE9e\xA0: ${e.dateRange}`, startRangeSelectionPrompt: "Cliquer pour commencer \xE0 s\xE9lectionner la plage de dates", todayDate: (e) => `Aujourd'hui, ${e.date}`, todayDateSelected: (e) => `Aujourd\u2019hui, ${e.date} s\xE9lectionn\xE9` };
var mi = {};
mi = { dateRange: (e) => `${e.startDate} \u05E2\u05D3 ${e.endDate}`, dateSelected: (e) => `${e.date} \u05E0\u05D1\u05D7\u05E8`, finishRangeSelectionPrompt: "\u05D7\u05E5 \u05DB\u05D3\u05D9 \u05DC\u05E1\u05D9\u05D9\u05DD \u05D0\u05EA \u05D1\u05D7\u05D9\u05E8\u05EA \u05D8\u05D5\u05D5\u05D7 \u05D4\u05EA\u05D0\u05E8\u05D9\u05DB\u05D9\u05DD", maximumDate: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05E4\u05E0\u05D5\u05D9 \u05D0\u05D7\u05E8\u05D5\u05DF", minimumDate: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05E4\u05E0\u05D5\u05D9 \u05E8\u05D0\u05E9\u05D5\u05DF", next: "\u05D4\u05D1\u05D0", previous: "\u05D4\u05E7\u05D5\u05D3\u05DD", selectedDateDescription: (e) => `\u05EA\u05D0\u05E8\u05D9\u05DA \u05E0\u05D1\u05D7\u05E8: ${e.date}`, selectedRangeDescription: (e) => `\u05D8\u05D5\u05D5\u05D7 \u05E0\u05D1\u05D7\u05E8: ${e.dateRange}`, startRangeSelectionPrompt: "\u05DC\u05D7\u05E5 \u05DB\u05D3\u05D9 \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1\u05D1\u05D7\u05D9\u05E8\u05EA \u05D8\u05D5\u05D5\u05D7 \u05D4\u05EA\u05D0\u05E8\u05D9\u05DB\u05D9\u05DD", todayDate: (e) => `\u05D4\u05D9\u05D5\u05DD, ${e.date}`, todayDateSelected: (e) => `\u05D4\u05D9\u05D5\u05DD, ${e.date} \u05E0\u05D1\u05D7\u05E8` };
var $i = {};
$i = { dateRange: (e) => `${e.startDate} do ${e.endDate}`, dateSelected: (e) => `${e.date} odabran`, finishRangeSelectionPrompt: "Kliknite da dovr\u0161ite raspon odabranih datuma", maximumDate: "Posljednji raspolo\u017Eivi datum", minimumDate: "Prvi raspolo\u017Eivi datum", next: "Sljede\u0107i", previous: "Prethodni", selectedDateDescription: (e) => `Odabrani datum: ${e.date}`, selectedRangeDescription: (e) => `Odabrani raspon: ${e.dateRange}`, startRangeSelectionPrompt: "Kliknite da zapo\u010Dnete raspon odabranih datuma", todayDate: (e) => `Danas, ${e.date}`, todayDateSelected: (e) => `Danas, odabran ${e.date}` };
var bi = {};
bi = { dateRange: (e) => `${e.startDate}\u2013${e.endDate}`, dateSelected: (e) => `${e.date} kiv\xE1lasztva`, finishRangeSelectionPrompt: "Kattintson a d\xE1tumtartom\xE1ny kijel\xF6l\xE9s\xE9nek befejez\xE9s\xE9hez", maximumDate: "Utols\xF3 el\xE9rhet\u0151 d\xE1tum", minimumDate: "Az els\u0151 el\xE9rhet\u0151 d\xE1tum", next: "K\xF6vetkez\u0151", previous: "El\u0151z\u0151", selectedDateDescription: (e) => `Kijel\xF6lt d\xE1tum: ${e.date}`, selectedRangeDescription: (e) => `Kijel\xF6lt tartom\xE1ny: ${e.dateRange}`, startRangeSelectionPrompt: "Kattintson a d\xE1tumtartom\xE1ny kijel\xF6l\xE9s\xE9nek ind\xEDt\xE1s\xE1hoz", todayDate: (e) => `Ma, ${e.date}`, todayDateSelected: (e) => `Ma, ${e.date} kijel\xF6lve` };
var hi = {};
hi = { dateRange: (e) => `Da ${e.startDate} a ${e.endDate}`, dateSelected: (e) => `${e.date} selezionata`, finishRangeSelectionPrompt: "Fai clic per completare la selezione dell\u2019intervallo di date", maximumDate: "Ultima data disponibile", minimumDate: "Prima data disponibile", next: "Successivo", previous: "Precedente", selectedDateDescription: (e) => `Data selezionata: ${e.date}`, selectedRangeDescription: (e) => `Intervallo selezionato: ${e.dateRange}`, startRangeSelectionPrompt: "Fai clic per selezionare l\u2019intervallo di date", todayDate: (e) => `Oggi, ${e.date}`, todayDateSelected: (e) => `Oggi, ${e.date} selezionata` };
var pi = {};
pi = { dateRange: (e) => `${e.startDate} \u304B\u3089 ${e.endDate}`, dateSelected: (e) => `${e.date} \u3092\u9078\u629E`, finishRangeSelectionPrompt: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u65E5\u4ED8\u7BC4\u56F2\u306E\u9078\u629E\u3092\u7D42\u4E86", maximumDate: "\u6700\u7D42\u5229\u7528\u53EF\u80FD\u65E5", minimumDate: "\u6700\u521D\u306E\u5229\u7528\u53EF\u80FD\u65E5", next: "\u6B21\u3078", previous: "\u524D\u3078", selectedDateDescription: (e) => `\u9078\u629E\u3057\u305F\u65E5\u4ED8 : ${e.date}`, selectedRangeDescription: (e) => `\u9078\u629E\u7BC4\u56F2 : ${e.dateRange}`, startRangeSelectionPrompt: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u65E5\u4ED8\u7BC4\u56F2\u306E\u9078\u629E\u3092\u958B\u59CB", todayDate: (e) => `\u672C\u65E5\u3001${e.date}`, todayDateSelected: (e) => `\u672C\u65E5\u3001${e.date} \u3092\u9078\u629E` };
var yi = {};
yi = { dateRange: (e) => `${e.startDate} ~ ${e.endDate}`, dateSelected: (e) => `${e.date} \uC120\uD0DD\uB428`, finishRangeSelectionPrompt: "\uB0A0\uC9DC \uBC94\uC704 \uC120\uD0DD\uC744 \uC644\uB8CC\uD558\uB824\uBA74 \uD074\uB9AD\uD558\uC2ED\uC2DC\uC624.", maximumDate: "\uB9C8\uC9C0\uB9C9\uC73C\uB85C \uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uC77C\uC790", minimumDate: "\uCC98\uC74C\uC73C\uB85C \uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uC77C\uC790", next: "\uB2E4\uC74C", previous: "\uC774\uC804", selectedDateDescription: (e) => `\uC120\uD0DD \uC77C\uC790: ${e.date}`, selectedRangeDescription: (e) => `\uC120\uD0DD \uBC94\uC704: ${e.dateRange}`, startRangeSelectionPrompt: "\uB0A0\uC9DC \uBC94\uC704 \uC120\uD0DD\uC744 \uC2DC\uC791\uD558\uB824\uBA74 \uD074\uB9AD\uD558\uC2ED\uC2DC\uC624.", todayDate: (e) => `\uC624\uB298, ${e.date}`, todayDateSelected: (e) => `\uC624\uB298, ${e.date} \uC120\uD0DD\uB428` };
var Di = {};
Di = { dateRange: (e) => `Nuo ${e.startDate} iki ${e.endDate}`, dateSelected: (e) => `Pasirinkta ${e.date}`, finishRangeSelectionPrompt: "Spustel\u0117kite, kad baigtum\u0117te pasirinkti dat\u0173 interval\u0105", maximumDate: "Paskutin\u0117 galima data", minimumDate: "Pirmoji galima data", next: "Paskesnis", previous: "Ankstesnis", selectedDateDescription: (e) => `Pasirinkta data: ${e.date}`, selectedRangeDescription: (e) => `Pasirinktas intervalas: ${e.dateRange}`, startRangeSelectionPrompt: "Spustel\u0117kite, kad prad\u0117tum\u0117te pasirinkti dat\u0173 interval\u0105", todayDate: (e) => `\u0160iandien, ${e.date}`, todayDateSelected: (e) => `\u0160iandien, pasirinkta ${e.date}` };
var gi = {};
gi = { dateRange: (e) => `No ${e.startDate} l\u012Bdz ${e.endDate}`, dateSelected: (e) => `Atlas\u012Bts: ${e.date}`, finishRangeSelectionPrompt: "Noklik\u0161\u0137iniet, lai pabeigtu datumu diapazona atlasi", maximumDate: "P\u0113d\u0113jais pieejamais datums", minimumDate: "Pirmais pieejamais datums", next: "T\u0101l\u0101k", previous: "Atpaka\u013C", selectedDateDescription: (e) => `Atlas\u012Btais datums: ${e.date}`, selectedRangeDescription: (e) => `Atlas\u012Btais diapazons: ${e.dateRange}`, startRangeSelectionPrompt: "Noklik\u0161\u0137iniet, lai s\u0101ktu datumu diapazona atlasi", todayDate: (e) => `\u0160odien, ${e.date}`, todayDateSelected: (e) => `Atlas\u012Bta \u0161odiena, ${e.date}` };
var vi = {};
vi = { dateRange: (e) => `${e.startDate} til ${e.endDate}`, dateSelected: (e) => `${e.date} valgt`, finishRangeSelectionPrompt: "Klikk for \xE5 fullf\xF8re valg av datoomr\xE5de", maximumDate: "Siste tilgjengelige dato", minimumDate: "F\xF8rste tilgjengelige dato", next: "Neste", previous: "Forrige", selectedDateDescription: (e) => `Valgt dato: ${e.date}`, selectedRangeDescription: (e) => `Valgt omr\xE5de: ${e.dateRange}`, startRangeSelectionPrompt: "Klikk for \xE5 starte valg av datoomr\xE5de", todayDate: (e) => `I dag, ${e.date}`, todayDateSelected: (e) => `I dag, ${e.date} valgt` };
var xi = {};
xi = { dateRange: (e) => `${e.startDate} tot ${e.endDate}`, dateSelected: (e) => `${e.date} geselecteerd`, finishRangeSelectionPrompt: "Klik om de selectie van het datumbereik te voltooien", maximumDate: "Laatste beschikbare datum", minimumDate: "Eerste beschikbare datum", next: "Volgende", previous: "Vorige", selectedDateDescription: (e) => `Geselecteerde datum: ${e.date}`, selectedRangeDescription: (e) => `Geselecteerd bereik: ${e.dateRange}`, startRangeSelectionPrompt: "Klik om het datumbereik te selecteren", todayDate: (e) => `Vandaag, ${e.date}`, todayDateSelected: (e) => `Vandaag, ${e.date} geselecteerd` };
var Ei = {};
Ei = { dateRange: (e) => `${e.startDate} do ${e.endDate}`, dateSelected: (e) => `Wybrano ${e.date}`, finishRangeSelectionPrompt: "Kliknij, aby zako\u0144czy\u0107 wyb\xF3r zakresu dat", maximumDate: "Ostatnia dost\u0119pna data", minimumDate: "Pierwsza dost\u0119pna data", next: "Dalej", previous: "Wstecz", selectedDateDescription: (e) => `Wybrana data: ${e.date}`, selectedRangeDescription: (e) => `Wybrany zakres: ${e.dateRange}`, startRangeSelectionPrompt: "Kliknij, aby rozpocz\u0105\u0107 wyb\xF3r zakresu dat", todayDate: (e) => `Dzisiaj, ${e.date}`, todayDateSelected: (e) => `Dzisiaj wybrano ${e.date}` };
var Ci = {};
Ci = { dateRange: (e) => `${e.startDate} a ${e.endDate}`, dateSelected: (e) => `${e.date} selecionado`, finishRangeSelectionPrompt: "Clique para concluir a sele\xE7\xE3o do intervalo de datas", maximumDate: "\xDAltima data dispon\xEDvel", minimumDate: "Primeira data dispon\xEDvel", next: "Pr\xF3ximo", previous: "Anterior", selectedDateDescription: (e) => `Data selecionada: ${e.date}`, selectedRangeDescription: (e) => `Intervalo selecionado: ${e.dateRange}`, startRangeSelectionPrompt: "Clique para iniciar a sele\xE7\xE3o do intervalo de datas", todayDate: (e) => `Hoje, ${e.date}`, todayDateSelected: (e) => `Hoje, ${e.date} selecionado` };
var wi = {};
wi = { dateRange: (e) => `${e.startDate} a ${e.endDate}`, dateSelected: (e) => `${e.date} selecionado`, finishRangeSelectionPrompt: "Clique para terminar de selecionar o intervalo de datas", maximumDate: "\xDAltima data dispon\xEDvel", minimumDate: "Primeira data dispon\xEDvel", next: "Pr\xF3ximo", previous: "Anterior", selectedDateDescription: (e) => `Data selecionada: ${e.date}`, selectedRangeDescription: (e) => `Intervalo selecionado: ${e.dateRange}`, startRangeSelectionPrompt: "Clique para come\xE7ar a selecionar o intervalo de datas", todayDate: (e) => `Hoje, ${e.date}`, todayDateSelected: (e) => `Hoje, ${e.date} selecionado` };
var Pi = {};
Pi = { dateRange: (e) => `De la ${e.startDate} p\xE2n\u0103 la ${e.endDate}`, dateSelected: (e) => `${e.date} selectat\u0103`, finishRangeSelectionPrompt: "Ap\u0103sa\u0163i pentru a finaliza selec\u0163ia razei pentru dat\u0103", maximumDate: "Ultima dat\u0103 disponibil\u0103", minimumDate: "Prima dat\u0103 disponibil\u0103", next: "Urm\u0103torul", previous: "\xCEnainte", selectedDateDescription: (e) => `Dat\u0103 selectat\u0103: ${e.date}`, selectedRangeDescription: (e) => `Interval selectat: ${e.dateRange}`, startRangeSelectionPrompt: "Ap\u0103sa\u0163i pentru a \xEEncepe selec\u0163ia razei pentru dat\u0103", todayDate: (e) => `Ast\u0103zi, ${e.date}`, todayDateSelected: (e) => `Azi, ${e.date} selectat\u0103` };
var Si = {};
Si = { dateRange: (e) => `\u0421 ${e.startDate} \u043F\u043E ${e.endDate}`, dateSelected: (e) => `\u0412\u044B\u0431\u0440\u0430\u043D\u043E ${e.date}`, finishRangeSelectionPrompt: "\u0429\u0435\u043B\u043A\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0430 \u0434\u0430\u0442", maximumDate: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430\u044F \u0434\u0430\u0442\u0430", minimumDate: "\u041F\u0435\u0440\u0432\u0430\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430\u044F \u0434\u0430\u0442\u0430", next: "\u0414\u0430\u043B\u0435\u0435", previous: "\u041D\u0430\u0437\u0430\u0434", selectedDateDescription: (e) => `\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u0430\u044F \u0434\u0430\u0442\u0430: ${e.date}`, selectedRangeDescription: (e) => `\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D: ${e.dateRange}`, startRangeSelectionPrompt: "\u0429\u0435\u043B\u043A\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0430 \u0434\u0430\u0442", todayDate: (e) => `\u0421\u0435\u0433\u043E\u0434\u043D\u044F, ${e.date}`, todayDateSelected: (e) => `\u0421\u0435\u0433\u043E\u0434\u043D\u044F, \u0432\u044B\u0431\u0440\u0430\u043D\u043E ${e.date}` };
var Bi = {};
Bi = { dateRange: (e) => `Od ${e.startDate} do ${e.endDate}`, dateSelected: (e) => `Vybrat\xFD d\xE1tum ${e.date}`, finishRangeSelectionPrompt: "Kliknut\xEDm dokon\u010D\xEDte v\xFDber rozsahu d\xE1tumov", maximumDate: "Posledn\xFD dostupn\xFD d\xE1tum", minimumDate: "Prv\xFD dostupn\xFD d\xE1tum", next: "Nasleduj\xFAce", previous: "Predch\xE1dzaj\xFAce", selectedDateDescription: (e) => `Vybrat\xFD d\xE1tum: ${e.date}`, selectedRangeDescription: (e) => `Vybrat\xFD rozsah: ${e.dateRange}`, startRangeSelectionPrompt: "Kliknut\xEDm spust\xEDte v\xFDber rozsahu d\xE1tumov", todayDate: (e) => `Dnes ${e.date}`, todayDateSelected: (e) => `Vybrat\xFD dne\u0161n\xFD d\xE1tum ${e.date}` };
var Fi = {};
Fi = { dateRange: (e) => `${e.startDate} do ${e.endDate}`, dateSelected: (e) => `${e.date} izbrano`, finishRangeSelectionPrompt: "Kliknite za dokon\u010Danje izbire datumskega obsega", maximumDate: "Zadnji razpolo\u017Eljivi datum", minimumDate: "Prvi razpolo\u017Eljivi datum", next: "Naprej", previous: "Nazaj", selectedDateDescription: (e) => `Izbrani datum: ${e.date}`, selectedRangeDescription: (e) => `Izbrano obmo\u010Dje: ${e.dateRange}`, startRangeSelectionPrompt: "Kliknite za za\u010Detek izbire datumskega obsega", todayDate: (e) => `Danes, ${e.date}`, todayDateSelected: (e) => `Danes, ${e.date} izbrano` };
var Ri = {};
Ri = { dateRange: (e) => `${e.startDate} do ${e.endDate}`, dateSelected: (e) => `${e.date} izabran`, finishRangeSelectionPrompt: "Kliknite da dovr\u0161ite opseg izabranih datuma", maximumDate: "Zadnji raspolo\u017Eivi datum", minimumDate: "Prvi raspolo\u017Eivi datum", next: "Slede\u0107i", previous: "Prethodni", selectedDateDescription: (e) => `Izabrani datum: ${e.date}`, selectedRangeDescription: (e) => `Izabrani period: ${e.dateRange}`, startRangeSelectionPrompt: "Kliknite da zapo\u010Dnete opseg izabranih datuma", todayDate: (e) => `Danas, ${e.date}`, todayDateSelected: (e) => `Danas, izabran ${e.date}` };
var Ti = {};
Ti = { dateRange: (e) => `${e.startDate} till ${e.endDate}`, dateSelected: (e) => `${e.date} har valts`, finishRangeSelectionPrompt: "Klicka f\xF6r att avsluta val av datumintervall", maximumDate: "Sista tillg\xE4ngliga datum", minimumDate: "F\xF6rsta tillg\xE4ngliga datum", next: "N\xE4sta", previous: "F\xF6reg\xE5ende", selectedDateDescription: (e) => `Valt datum: ${e.date}`, selectedRangeDescription: (e) => `Valt intervall: ${e.dateRange}`, startRangeSelectionPrompt: "Klicka f\xF6r att v\xE4lja datumintervall", todayDate: (e) => `Idag, ${e.date}`, todayDateSelected: (e) => `Idag, ${e.date} har valts` };
var Ai = {};
Ai = { dateRange: (e) => `${e.startDate} - ${e.endDate}`, dateSelected: (e) => `${e.date} se\xE7ildi`, finishRangeSelectionPrompt: "Tarih aral\u0131\u011F\u0131 se\xE7imini tamamlamak i\xE7in t\u0131klay\u0131n", maximumDate: "Son m\xFCsait tarih", minimumDate: "\u0130lk m\xFCsait tarih", next: "Sonraki", previous: "\xD6nceki", selectedDateDescription: (e) => `Se\xE7ilen Tarih: ${e.date}`, selectedRangeDescription: (e) => `Se\xE7ilen Aral\u0131k: ${e.dateRange}`, startRangeSelectionPrompt: "Tarih aral\u0131\u011F\u0131 se\xE7imini ba\u015Flatmak i\xE7in t\u0131klay\u0131n", todayDate: (e) => `Bug\xFCn, ${e.date}`, todayDateSelected: (e) => `Bug\xFCn, ${e.date} se\xE7ildi` };
var ki = {};
ki = { dateRange: (e) => `${e.startDate} \u2014 ${e.endDate}`, dateSelected: (e) => `\u0412\u0438\u0431\u0440\u0430\u043D\u043E ${e.date}`, finishRangeSelectionPrompt: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438 \u0432\u0438\u0431\u0456\u0440 \u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D\u0443 \u0434\u0430\u0442", maximumDate: "\u041E\u0441\u0442\u0430\u043D\u043D\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u0434\u0430\u0442\u0430", minimumDate: "\u041F\u0435\u0440\u0448\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u0434\u0430\u0442\u0430", next: "\u041D\u0430\u0441\u0442\u0443\u043F\u043D\u0438\u0439", previous: "\u041F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u0456\u0439", selectedDateDescription: (e) => `\u0412\u0438\u0431\u0440\u0430\u043D\u0430 \u0434\u0430\u0442\u0430: ${e.date}`, selectedRangeDescription: (e) => `\u0412\u0438\u0431\u0440\u0430\u043D\u0438\u0439 \u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D: ${e.dateRange}`, startRangeSelectionPrompt: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043F\u043E\u0447\u0430\u0442\u0438 \u0432\u0438\u0431\u0456\u0440 \u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D\u0443 \u0434\u0430\u0442", todayDate: (e) => `\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456, ${e.date}`, todayDateSelected: (e) => `\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456, \u0432\u0438\u0431\u0440\u0430\u043D\u043E ${e.date}` };
var Mi = {};
Mi = { dateRange: (e) => `${e.startDate} \u81F3 ${e.endDate}`, dateSelected: (e) => `\u5DF2\u9009\u62E9 ${e.date}`, finishRangeSelectionPrompt: "\u5355\u51FB\u4EE5\u5B8C\u6210\u9009\u62E9\u65E5\u671F\u8303\u56F4", maximumDate: "\u6700\u540E\u4E00\u4E2A\u53EF\u7528\u65E5\u671F", minimumDate: "\u7B2C\u4E00\u4E2A\u53EF\u7528\u65E5\u671F", next: "\u4E0B\u4E00\u9875", previous: "\u4E0A\u4E00\u9875", selectedDateDescription: (e) => `\u9009\u5B9A\u7684\u65E5\u671F\uFF1A${e.date}`, selectedRangeDescription: (e) => `\u9009\u5B9A\u7684\u8303\u56F4\uFF1A${e.dateRange}`, startRangeSelectionPrompt: "\u5355\u51FB\u4EE5\u5F00\u59CB\u9009\u62E9\u65E5\u671F\u8303\u56F4", todayDate: (e) => `\u4ECA\u5929\uFF0C\u5373 ${e.date}`, todayDateSelected: (e) => `\u5DF2\u9009\u62E9\u4ECA\u5929\uFF0C\u5373 ${e.date}` };
var Ii = {};
Ii = { dateRange: (e) => `${e.startDate} \u81F3 ${e.endDate}`, dateSelected: (e) => `\u5DF2\u9078\u53D6 ${e.date}`, finishRangeSelectionPrompt: "\u6309\u4E00\u4E0B\u4EE5\u5B8C\u6210\u9078\u53D6\u65E5\u671F\u7BC4\u570D", maximumDate: "\u6700\u5F8C\u4E00\u500B\u53EF\u7528\u65E5\u671F", minimumDate: "\u7B2C\u4E00\u500B\u53EF\u7528\u65E5\u671F", next: "\u4E0B\u4E00\u9801", previous: "\u4E0A\u4E00\u9801", selectedDateDescription: (e) => `\u9078\u5B9A\u7684\u65E5\u671F\uFF1A${e.date}`, selectedRangeDescription: (e) => `\u9078\u5B9A\u7684\u7BC4\u570D\uFF1A${e.dateRange}`, startRangeSelectionPrompt: "\u6309\u4E00\u4E0B\u4EE5\u958B\u59CB\u9078\u53D6\u65E5\u671F\u7BC4\u570D", todayDate: (e) => `\u4ECA\u5929\uFF0C${e.date}`, todayDateSelected: (e) => `\u5DF2\u9078\u53D6\u4ECA\u5929\uFF0C${e.date}` };
var zt = {};
zt = { "ar-AE": ai, "bg-BG": ri, "cs-CZ": ni, "da-DK": ui, "de-DE": ii, "el-GR": oi, "en-US": li, "es-ES": si, "et-EE": di, "fi-FI": ci, "fr-FR": fi, "he-IL": mi, "hr-HR": $i, "hu-HU": bi, "it-IT": hi, "ja-JP": pi, "ko-KR": yi, "lt-LT": Di, "lv-LV": gi, "nb-NO": vi, "nl-NL": xi, "pl-PL": Ei, "pt-BR": Ci, "pt-PT": wi, "ro-RO": Pi, "ru-RU": Si, "sk-SK": Bi, "sl-SI": Fi, "sr-SP": Ri, "sv-SE": Ti, "tr-TR": Ai, "uk-UA": ki, "zh-CN": Mi, "zh-TW": Ii };
function Ni(e, t) {
  let a = c.useRef(null);
  return e && a.current && t(e, a.current) && (e = a.current), a.current = e, e;
}
function dt(e, t) {
  return e - t * Math.floor(e / t);
}
const Li = 1721426;
function Ke(e, t, a, r) {
  t = jt(e, t);
  let n = t - 1, u = -2;
  return a <= 2 ? u = 0 : Ne(t) && (u = -1), Li - 1 + 365 * n + Math.floor(n / 4) - Math.floor(n / 100) + Math.floor(n / 400) + Math.floor((367 * a - 362) / 12 + u + r);
}
function Ne(e) {
  return e % 4 === 0 && (e % 100 !== 0 || e % 400 === 0);
}
function jt(e, t) {
  return e === "BC" ? 1 - t : t;
}
function Sa(e) {
  let t = "AD";
  return e <= 0 && (t = "BC", e = 1 - e), [t, e];
}
const rf = { standard: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], leapyear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] };
class se {
  fromJulianDay(t) {
    let a = t, r = a - Li, n = Math.floor(r / 146097), u = dt(r, 146097), i = Math.floor(u / 36524), o = dt(u, 36524), l = Math.floor(o / 1461), s = dt(o, 1461), d = Math.floor(s / 365), f = n * 400 + i * 100 + l * 4 + d + (i !== 4 && d !== 4 ? 1 : 0), [$, m] = Sa(f), b = a - Ke($, m, 1, 1), p = 2;
    a < Ke($, m, 3, 1) ? p = 0 : Ne(m) && (p = 1);
    let h = Math.floor(((b + p) * 12 + 373) / 367), y = a - Ke($, m, h, 1) + 1;
    return new ae($, m, h, y);
  }
  toJulianDay(t) {
    return Ke(t.era, t.year, t.month, t.day);
  }
  getDaysInMonth(t) {
    return rf[Ne(t.year) ? "leapyear" : "standard"][t.month - 1];
  }
  getMonthsInYear(t) {
    return 12;
  }
  getDaysInYear(t) {
    return Ne(t.year) ? 366 : 365;
  }
  getMaximumMonthsInYear() {
    return 12;
  }
  getMaximumDaysInMonth() {
    return 31;
  }
  getYearsInEra(t) {
    return 9999;
  }
  getEras() {
    return ["BC", "AD"];
  }
  isInverseEra(t) {
    return t.era === "BC";
  }
  balanceDate(t) {
    t.year <= 0 && (t.era = t.era === "BC" ? "AD" : "BC", t.year = 1 - t.year);
  }
  constructor() {
    this.identifier = "gregory";
  }
}
const nf = { "001": 1, AD: 1, AE: 6, AF: 6, AI: 1, AL: 1, AM: 1, AN: 1, AR: 1, AT: 1, AU: 1, AX: 1, AZ: 1, BA: 1, BE: 1, BG: 1, BH: 6, BM: 1, BN: 1, BY: 1, CH: 1, CL: 1, CM: 1, CN: 1, CR: 1, CY: 1, CZ: 1, DE: 1, DJ: 6, DK: 1, DZ: 6, EC: 1, EE: 1, EG: 6, ES: 1, FI: 1, FJ: 1, FO: 1, FR: 1, GB: 1, GE: 1, GF: 1, GP: 1, GR: 1, HR: 1, HU: 1, IE: 1, IQ: 6, IR: 6, IS: 1, IT: 1, JO: 6, KG: 1, KW: 6, KZ: 1, LB: 1, LI: 1, LK: 1, LT: 1, LU: 1, LV: 1, LY: 6, MC: 1, MD: 1, ME: 1, MK: 1, MN: 1, MQ: 1, MV: 5, MY: 1, NL: 1, NO: 1, NZ: 1, OM: 6, PL: 1, QA: 6, RE: 1, RO: 1, RS: 1, RU: 1, SD: 6, SE: 1, SI: 1, SK: 1, SM: 1, SY: 6, TJ: 1, TM: 1, TR: 1, UA: 1, UY: 1, UZ: 1, VA: 1, VN: 1, XK: 1 };
function te(e, t) {
  return t = ee(t, e.calendar), e.era === t.era && e.year === t.year && e.month === t.month && e.day === t.day;
}
function uf(e, t) {
  return t = ee(t, e.calendar), e = Xe(e), t = Xe(t), e.era === t.era && e.year === t.year && e.month === t.month;
}
function of(e, t) {
  return Ba(e.calendar, t.calendar) && te(e, t);
}
function Ba(e, t) {
  var _a2, _b;
  return ((_a2 = e.isEqual) == null ? void 0 : _a2.call(e, t)) ?? ((_b = t.isEqual) == null ? void 0 : _b.call(t, e)) ?? e.identifier === t.identifier;
}
function Vi(e, t) {
  return te(e, Xr(t));
}
const lf = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
function Qr(e, t, a) {
  let r = e.calendar.toJulianDay(e), n = a ? lf[a] : mf(t), u = Math.ceil(r + 1 - n) % 7;
  return u < 0 && (u += 7), u;
}
function Oi(e) {
  return Se(Date.now(), e);
}
function Xr(e) {
  return he(Oi(e));
}
function Hi(e, t) {
  return e.calendar.toJulianDay(e) - t.calendar.toJulianDay(t);
}
function Ui(e, t) {
  return Ln(e) - Ln(t);
}
function Ln(e) {
  return e.hour * 36e5 + e.minute * 6e4 + e.second * 1e3 + e.millisecond;
}
let Wa = null, sf = false;
function Fa() {
  return Wa == null && (Wa = new Intl.DateTimeFormat().resolvedOptions().timeZone), Wa;
}
function zi() {
  return sf;
}
function Xe(e) {
  return e.subtract({ days: e.day - 1 });
}
function fa(e) {
  return e.add({ days: e.calendar.getDaysInMonth(e) - e.day });
}
function df(e) {
  return Xe(e.subtract({ months: e.month - 1 }));
}
function At(e, t, a) {
  let r = Qr(e, t, a);
  return e.subtract({ days: r });
}
function cf(e, t, a) {
  return At(e, t, a).add({ days: 6 });
}
const Vn = /* @__PURE__ */ new Map(), Za = /* @__PURE__ */ new Map();
function ff(e) {
  if (Intl.Locale) {
    let a = Vn.get(e);
    return a || (a = new Intl.Locale(e).maximize().region, a && Vn.set(e, a)), a;
  }
  let t = e.split("-")[1];
  return t === "u" ? void 0 : t;
}
function mf(e) {
  let t = Za.get(e);
  if (!t) {
    if (Intl.Locale) {
      let r = new Intl.Locale(e);
      if ("getWeekInfo" in r && (t = r.getWeekInfo(), t)) return Za.set(e, t), t.firstDay;
    }
    let a = ff(e);
    if (e.includes("-fw-")) {
      let r = e.split("-fw-")[1].split("-")[0];
      r === "mon" ? t = { firstDay: 1 } : r === "tue" ? t = { firstDay: 2 } : r === "wed" ? t = { firstDay: 3 } : r === "thu" ? t = { firstDay: 4 } : r === "fri" ? t = { firstDay: 5 } : r === "sat" ? t = { firstDay: 6 } : t = { firstDay: 0 };
    } else e.includes("-ca-iso8601") ? t = { firstDay: 1 } : t = { firstDay: a && nf[a] || 0 };
    Za.set(e, t);
  }
  return t.firstDay;
}
function $f(e, t, a) {
  let r = e.calendar.getDaysInMonth(e);
  return Math.ceil((Qr(Xe(e), t, a) + r) / 7);
}
function ji(e, t) {
  return e && t ? e.compare(t) <= 0 ? e : t : e || t;
}
function Ki(e, t) {
  return e && t ? e.compare(t) >= 0 ? e : t : e || t;
}
function bt(e) {
  e = ee(e, new se());
  let t = jt(e.era, e.year);
  return _i(t, e.month, e.day, e.hour, e.minute, e.second, e.millisecond);
}
function _i(e, t, a, r, n, u, i) {
  let o = /* @__PURE__ */ new Date();
  return o.setUTCHours(r, n, u, i), o.setUTCFullYear(e, t - 1, a), o.getTime();
}
function vr(e, t) {
  if (t === "UTC") return 0;
  if (e > 0 && t === Fa() && !zi()) return new Date(e).getTimezoneOffset() * -6e4;
  let { year: a, month: r, day: n, hour: u, minute: i, second: o } = Wi(e, t);
  return _i(a, r, n, u, i, o, 0) - Math.floor(e / 1e3) * 1e3;
}
const On = /* @__PURE__ */ new Map();
function Wi(e, t) {
  let a = On.get(t);
  a || (a = new Intl.DateTimeFormat("en-US", { timeZone: t, hour12: false, era: "short", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }), On.set(t, a));
  let r = a.formatToParts(new Date(e)), n = {};
  for (let u of r) u.type !== "literal" && (n[u.type] = u.value);
  return { year: n.era === "BC" || n.era === "B" ? -n.year + 1 : +n.year, month: +n.month, day: +n.day, hour: n.hour === "24" ? 0 : +n.hour, minute: +n.minute, second: +n.second };
}
const Hn = 864e5;
function bf(e, t, a, r) {
  return (a === r ? [a] : [a, r]).filter((u) => hf(e, t, u));
}
function hf(e, t, a) {
  let r = Wi(a, t);
  return e.year === r.year && e.month === r.month && e.day === r.day && e.hour === r.hour && e.minute === r.minute && e.second === r.second;
}
function Pe(e, t, a = "compatible") {
  let r = Re(e);
  if (t === "UTC") return bt(r);
  if (t === Fa() && a === "compatible" && !zi()) {
    r = ee(r, new se());
    let l = /* @__PURE__ */ new Date(), s = jt(r.era, r.year);
    return l.setFullYear(s, r.month - 1, r.day), l.setHours(r.hour, r.minute, r.second, r.millisecond), l.getTime();
  }
  let n = bt(r), u = vr(n - Hn, t), i = vr(n + Hn, t), o = bf(r, t, n - u, n - i);
  if (o.length === 1) return o[0];
  if (o.length > 1) switch (a) {
    case "compatible":
    case "earlier":
      return o[0];
    case "later":
      return o[o.length - 1];
    case "reject":
      throw new RangeError("Multiple possible absolute times found");
  }
  switch (a) {
    case "earlier":
      return Math.min(n - u, n - i);
    case "compatible":
    case "later":
      return Math.max(n - u, n - i);
    case "reject":
      throw new RangeError("No such absolute time found");
  }
}
function Zi(e, t, a = "compatible") {
  return new Date(Pe(e, t, a));
}
function Se(e, t) {
  let a = vr(e, t), r = new Date(e + a), n = r.getUTCFullYear(), u = r.getUTCMonth() + 1, i = r.getUTCDate(), o = r.getUTCHours(), l = r.getUTCMinutes(), s = r.getUTCSeconds(), d = r.getUTCMilliseconds();
  return new It(n < 1 ? "BC" : "AD", n < 1 ? -n + 1 : n, u, i, t, a, o, l, s, d);
}
function he(e) {
  return new ae(e.calendar, e.era, e.year, e.month, e.day);
}
function Re(e, t) {
  let a = 0, r = 0, n = 0, u = 0;
  if ("timeZone" in e) ({ hour: a, minute: r, second: n, millisecond: u } = e);
  else if ("hour" in e && !t) return e;
  return t && ({ hour: a, minute: r, second: n, millisecond: u } = t), new Mt(e.calendar, e.era, e.year, e.month, e.day, a, r, n, u);
}
function ee(e, t) {
  if (Ba(e.calendar, t)) return e;
  let a = t.fromJulianDay(e.calendar.toJulianDay(e)), r = e.copy();
  return r.calendar = t, r.era = a.era, r.year = a.year, r.month = a.month, r.day = a.day, et(r), r;
}
function pf(e, t, a) {
  if (e instanceof It) return e.timeZone === t ? e : Gi(e, t);
  let r = Pe(e, t, a);
  return Se(r, t);
}
function yf(e) {
  let t = bt(e) - e.offset;
  return new Date(t);
}
function Gi(e, t) {
  let a = bt(e) - e.offset;
  return ee(Se(a, t), e.calendar);
}
function Df(e) {
  return Gi(e, Fa());
}
const Dt = 36e5;
function Ra(e, t) {
  var _a2, _b;
  let a = e.copy(), r = "hour" in a ? Qi(a, t) : 0;
  xr(a, t.years || 0), a.calendar.balanceYearMonth && a.calendar.balanceYearMonth(a, e), a.month += t.months || 0, Er(a), Yi(a), a.day += (t.weeks || 0) * 7, a.day += t.days || 0, a.day += r, gf(a), a.calendar.balanceDate && a.calendar.balanceDate(a), a.year < 1 && (a.year = 1, a.month = 1, a.day = 1);
  let n = a.calendar.getYearsInEra(a);
  if (a.year > n) {
    let i = (_b = (_a2 = a.calendar).isInverseEra) == null ? void 0 : _b.call(_a2, a);
    a.year = n, a.month = i ? 1 : a.calendar.getMonthsInYear(a), a.day = i ? 1 : a.calendar.getDaysInMonth(a);
  }
  a.month < 1 && (a.month = 1, a.day = 1);
  let u = a.calendar.getMonthsInYear(a);
  return a.month > u && (a.month = u, a.day = a.calendar.getDaysInMonth(a)), a.day = Math.max(1, Math.min(a.calendar.getDaysInMonth(a), a.day)), a;
}
function xr(e, t) {
  var _a2, _b;
  ((_b = (_a2 = e.calendar).isInverseEra) == null ? void 0 : _b.call(_a2, e)) && (t = -t), e.year += t;
}
function Er(e) {
  for (; e.month < 1; ) xr(e, -1), e.month += e.calendar.getMonthsInYear(e);
  let t = 0;
  for (; e.month > (t = e.calendar.getMonthsInYear(e)); ) e.month -= t, xr(e, 1);
}
function gf(e) {
  for (; e.day < 1; ) e.month--, Er(e), e.day += e.calendar.getDaysInMonth(e);
  for (; e.day > e.calendar.getDaysInMonth(e); ) e.day -= e.calendar.getDaysInMonth(e), e.month++, Er(e);
}
function Yi(e) {
  e.month = Math.max(1, Math.min(e.calendar.getMonthsInYear(e), e.month)), e.day = Math.max(1, Math.min(e.calendar.getDaysInMonth(e), e.day));
}
function et(e) {
  e.calendar.constrainDate && e.calendar.constrainDate(e), e.year = Math.max(1, Math.min(e.calendar.getYearsInEra(e), e.year)), Yi(e);
}
function en(e) {
  let t = {};
  for (let a in e) typeof e[a] == "number" && (t[a] = -e[a]);
  return t;
}
function Ji(e, t) {
  return Ra(e, en(t));
}
function tn(e, t) {
  let a = e.copy();
  return t.era != null && (a.era = t.era), t.year != null && (a.year = t.year), t.month != null && (a.month = t.month), t.day != null && (a.day = t.day), et(a), a;
}
function kt(e, t) {
  let a = e.copy();
  return t.hour != null && (a.hour = t.hour), t.minute != null && (a.minute = t.minute), t.second != null && (a.second = t.second), t.millisecond != null && (a.millisecond = t.millisecond), qi(a), a;
}
function vf(e) {
  e.second += Math.floor(e.millisecond / 1e3), e.millisecond = Yt(e.millisecond, 1e3), e.minute += Math.floor(e.second / 60), e.second = Yt(e.second, 60), e.hour += Math.floor(e.minute / 60), e.minute = Yt(e.minute, 60);
  let t = Math.floor(e.hour / 24);
  return e.hour = Yt(e.hour, 24), t;
}
function qi(e) {
  e.millisecond = Math.max(0, Math.min(e.millisecond, 999)), e.second = Math.max(0, Math.min(e.second, 59)), e.minute = Math.max(0, Math.min(e.minute, 59)), e.hour = Math.max(0, Math.min(e.hour, 23));
}
function Yt(e, t) {
  let a = e % t;
  return a < 0 && (a += t), a;
}
function Qi(e, t) {
  return e.hour += t.hours || 0, e.minute += t.minutes || 0, e.second += t.seconds || 0, e.millisecond += t.milliseconds || 0, vf(e);
}
function Xi(e, t) {
  let a = e.copy();
  return Qi(a, t), a;
}
function xf(e, t) {
  return Xi(e, en(t));
}
function an(e, t, a, r) {
  var _a2, _b;
  let n = e.copy();
  switch (t) {
    case "era": {
      let u = e.calendar.getEras(), i = u.indexOf(e.era);
      if (i < 0) throw new Error("Invalid era: " + e.era);
      i = Be(i, a, 0, u.length - 1, r == null ? void 0 : r.round), n.era = u[i], et(n);
      break;
    }
    case "year":
      ((_b = (_a2 = n.calendar).isInverseEra) == null ? void 0 : _b.call(_a2, n)) && (a = -a), n.year = Be(e.year, a, -1 / 0, 9999, r == null ? void 0 : r.round), n.year === -1 / 0 && (n.year = 1), n.calendar.balanceYearMonth && n.calendar.balanceYearMonth(n, e);
      break;
    case "month":
      n.month = Be(e.month, a, 1, e.calendar.getMonthsInYear(e), r == null ? void 0 : r.round);
      break;
    case "day":
      n.day = Be(e.day, a, 1, e.calendar.getDaysInMonth(e), r == null ? void 0 : r.round);
      break;
    default:
      throw new Error("Unsupported field " + t);
  }
  return e.calendar.balanceDate && e.calendar.balanceDate(n), et(n), n;
}
function rn(e, t, a, r) {
  let n = e.copy();
  switch (t) {
    case "hour": {
      let u = e.hour, i = 0, o = 23;
      if ((r == null ? void 0 : r.hourCycle) === 12) {
        let l = u >= 12;
        i = l ? 12 : 0, o = l ? 23 : 11;
      }
      n.hour = Be(u, a, i, o, r == null ? void 0 : r.round);
      break;
    }
    case "minute":
      n.minute = Be(e.minute, a, 0, 59, r == null ? void 0 : r.round);
      break;
    case "second":
      n.second = Be(e.second, a, 0, 59, r == null ? void 0 : r.round);
      break;
    case "millisecond":
      n.millisecond = Be(e.millisecond, a, 0, 999, r == null ? void 0 : r.round);
      break;
    default:
      throw new Error("Unsupported field " + t);
  }
  return n;
}
function Be(e, t, a, r, n = false) {
  if (n) {
    e += Math.sign(t), e < a && (e = r);
    let u = Math.abs(t);
    t > 0 ? e = Math.ceil(e / u) * u : e = Math.floor(e / u) * u, e > r && (e = a);
  } else e += t, e < a ? e = r - (a - e - 1) : e > r && (e = a + (e - r - 1));
  return e;
}
function eo(e, t) {
  let a;
  if (t.years != null && t.years !== 0 || t.months != null && t.months !== 0 || t.weeks != null && t.weeks !== 0 || t.days != null && t.days !== 0) {
    let n = Ra(Re(e), { years: t.years, months: t.months, weeks: t.weeks, days: t.days });
    a = Pe(n, e.timeZone);
  } else a = bt(e) - e.offset;
  a += t.milliseconds || 0, a += (t.seconds || 0) * 1e3, a += (t.minutes || 0) * 6e4, a += (t.hours || 0) * 36e5;
  let r = Se(a, e.timeZone);
  return ee(r, e.calendar);
}
function Ef(e, t) {
  return eo(e, en(t));
}
function Cf(e, t, a, r) {
  switch (t) {
    case "hour": {
      let n = 0, u = 23;
      if ((r == null ? void 0 : r.hourCycle) === 12) {
        let b = e.hour >= 12;
        n = b ? 12 : 0, u = b ? 23 : 11;
      }
      let i = Re(e), o = ee(kt(i, { hour: n }), new se()), l = [Pe(o, e.timeZone, "earlier"), Pe(o, e.timeZone, "later")].filter((b) => Se(b, e.timeZone).day === o.day)[0], s = ee(kt(i, { hour: u }), new se()), d = [Pe(s, e.timeZone, "earlier"), Pe(s, e.timeZone, "later")].filter((b) => Se(b, e.timeZone).day === s.day).pop(), f = bt(e) - e.offset, $ = Math.floor(f / Dt), m = f % Dt;
      return f = Be($, a, Math.floor(l / Dt), Math.floor(d / Dt), r == null ? void 0 : r.round) * Dt + m, ee(Se(f, e.timeZone), e.calendar);
    }
    case "minute":
    case "second":
    case "millisecond":
      return rn(e, t, a, r);
    case "era":
    case "year":
    case "month":
    case "day": {
      let n = an(Re(e), t, a, r), u = Pe(n, e.timeZone);
      return ee(Se(u, e.timeZone), e.calendar);
    }
    default:
      throw new Error("Unsupported field " + t);
  }
}
function wf(e, t, a) {
  let r = Re(e), n = kt(tn(r, t), t);
  if (n.compare(r) === 0) return e;
  let u = Pe(n, e.timeZone, a);
  return ee(Se(u, e.timeZone), e.calendar);
}
const Pf = /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})$/, Sf = /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})(?:T(\d{2}))?(?::(\d{2}))?(?::(\d{2}))?(\.\d+)?$/, to = /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})(?:T(\d{2}))?(?::(\d{2}))?(?::(\d{2}))?(\.\d+)?(?:(?:([+-]\d{2})(?::?(\d{2}))?)|Z)$/;
function Bf(e) {
  let t = e.match(Pf);
  if (!t) throw to.test(e) ? new Error(`Invalid ISO 8601 date string: ${e}. Use parseAbsolute() instead.`) : new Error("Invalid ISO 8601 date string: " + e);
  let a = new ae(ge(t[1], 0, 9999), ge(t[2], 1, 12), 1);
  return a.day = ge(t[3], 1, a.calendar.getDaysInMonth(a)), a;
}
function Ff(e) {
  let t = e.match(Sf);
  if (!t) throw to.test(e) ? new Error(`Invalid ISO 8601 date time string: ${e}. Use parseAbsolute() instead.`) : new Error("Invalid ISO 8601 date time string: " + e);
  let a = ge(t[1], -9999, 9999), r = a < 1 ? "BC" : "AD", n = new Mt(r, a < 1 ? -a + 1 : a, ge(t[2], 1, 12), 1, t[4] ? ge(t[4], 0, 23) : 0, t[5] ? ge(t[5], 0, 59) : 0, t[6] ? ge(t[6], 0, 59) : 0, t[7] ? ge(t[7], 0, 1 / 0) * 1e3 : 0);
  return n.day = ge(t[3], 0, n.calendar.getDaysInMonth(n)), n;
}
function ge(e, t, a) {
  let r = Number(e);
  if (r < t || r > a) throw new RangeError(`Value out of range: ${t} <= ${r} <= ${a}`);
  return r;
}
function ao(e) {
  return `${String(e.hour).padStart(2, "0")}:${String(e.minute).padStart(2, "0")}:${String(e.second).padStart(2, "0")}${e.millisecond ? String(e.millisecond / 1e3).slice(1) : ""}`;
}
function ro(e) {
  let t = ee(e, new se()), a;
  return t.era === "BC" ? a = t.year === 1 ? "0000" : "-" + String(Math.abs(1 - t.year)).padStart(6, "00") : a = String(t.year).padStart(4, "0"), `${a}-${String(t.month).padStart(2, "0")}-${String(t.day).padStart(2, "0")}`;
}
function no(e) {
  return `${ro(e)}T${ao(e)}`;
}
function Rf(e) {
  let t = Math.sign(e) < 0 ? "-" : "+";
  e = Math.abs(e);
  let a = Math.floor(e / 36e5), r = Math.floor(e % 36e5 / 6e4), n = Math.floor(e % 36e5 % 6e4 / 1e3), u = `${t}${String(a).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  return n !== 0 && (u += `:${String(n).padStart(2, "0")}`), u;
}
function Tf(e) {
  return `${no(e)}${Rf(e.offset)}[${e.timeZone}]`;
}
function nn(e) {
  let t = typeof e[0] == "object" ? e.shift() : new se(), a;
  if (typeof e[0] == "string") a = e.shift();
  else {
    let i = t.getEras();
    a = i[i.length - 1];
  }
  let r = e.shift(), n = e.shift(), u = e.shift();
  return [t, a, r, n, u];
}
const _ae = class _ae {
  constructor(...t) {
    __privateAdd(this, _e3);
    let [a, r, n, u, i] = nn(t);
    this.calendar = a, this.era = r, this.year = n, this.month = u, this.day = i, et(this);
  }
  copy() {
    return this.era ? new _ae(this.calendar, this.era, this.year, this.month, this.day) : new _ae(this.calendar, this.year, this.month, this.day);
  }
  add(t) {
    return Ra(this, t);
  }
  subtract(t) {
    return Ji(this, t);
  }
  set(t) {
    return tn(this, t);
  }
  cycle(t, a, r) {
    return an(this, t, a, r);
  }
  toDate(t) {
    return Zi(this, t);
  }
  toString() {
    return ro(this);
  }
  compare(t) {
    return Hi(this, t);
  }
};
_e3 = new WeakMap();
let ae = _ae;
const _un = class _un {
  constructor(t = 0, a = 0, r = 0, n = 0) {
    __privateAdd(this, _e4);
    this.hour = t, this.minute = a, this.second = r, this.millisecond = n, qi(this);
  }
  copy() {
    return new _un(this.hour, this.minute, this.second, this.millisecond);
  }
  add(t) {
    return Xi(this, t);
  }
  subtract(t) {
    return xf(this, t);
  }
  set(t) {
    return kt(this, t);
  }
  cycle(t, a, r) {
    return rn(this, t, a, r);
  }
  toString() {
    return ao(this);
  }
  compare(t) {
    return Ui(this, t);
  }
};
_e4 = new WeakMap();
let un = _un;
const _Mt = class _Mt {
  constructor(...t) {
    __privateAdd(this, _e5);
    let [a, r, n, u, i] = nn(t);
    this.calendar = a, this.era = r, this.year = n, this.month = u, this.day = i, this.hour = t.shift() || 0, this.minute = t.shift() || 0, this.second = t.shift() || 0, this.millisecond = t.shift() || 0, et(this);
  }
  copy() {
    return this.era ? new _Mt(this.calendar, this.era, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond) : new _Mt(this.calendar, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  add(t) {
    return Ra(this, t);
  }
  subtract(t) {
    return Ji(this, t);
  }
  set(t) {
    return tn(kt(this, t), t);
  }
  cycle(t, a, r) {
    switch (t) {
      case "era":
      case "year":
      case "month":
      case "day":
        return an(this, t, a, r);
      default:
        return rn(this, t, a, r);
    }
  }
  toDate(t, a) {
    return Zi(this, t, a);
  }
  toString() {
    return no(this);
  }
  compare(t) {
    let a = Hi(this, t);
    return a === 0 ? Ui(this, Re(t)) : a;
  }
};
_e5 = new WeakMap();
let Mt = _Mt;
const _It = class _It {
  constructor(...t) {
    __privateAdd(this, _e6);
    let [a, r, n, u, i] = nn(t), o = t.shift(), l = t.shift();
    this.calendar = a, this.era = r, this.year = n, this.month = u, this.day = i, this.timeZone = o, this.offset = l, this.hour = t.shift() || 0, this.minute = t.shift() || 0, this.second = t.shift() || 0, this.millisecond = t.shift() || 0, et(this);
  }
  copy() {
    return this.era ? new _It(this.calendar, this.era, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond) : new _It(this.calendar, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
  }
  add(t) {
    return eo(this, t);
  }
  subtract(t) {
    return Ef(this, t);
  }
  set(t, a) {
    return wf(this, t, a);
  }
  cycle(t, a, r) {
    return Cf(this, t, a, r);
  }
  toDate() {
    return yf(this);
  }
  toString() {
    return Tf(this);
  }
  toAbsoluteString() {
    return this.toDate().toISOString();
  }
  compare(t) {
    return this.toDate().getTime() - pf(t, this.timeZone).toDate().getTime();
  }
};
_e6 = new WeakMap();
let It = _It;
const ct = [[1868, 9, 8], [1912, 7, 30], [1926, 12, 25], [1989, 1, 8], [2019, 5, 1]], Af = [[1912, 7, 29], [1926, 12, 24], [1989, 1, 7], [2019, 4, 30]], aa = [1867, 1911, 1925, 1988, 2018], Me = ["meiji", "taisho", "showa", "heisei", "reiwa"];
function Un(e) {
  const t = ct.findIndex(([a, r, n]) => e.year < a || e.year === a && e.month < r || e.year === a && e.month === r && e.day < n);
  return t === -1 ? ct.length - 1 : t === 0 ? 0 : t - 1;
}
function Ga(e) {
  let t = aa[Me.indexOf(e.era)];
  if (!t) throw new Error("Unknown era: " + e.era);
  return new ae(e.year + t, e.month, e.day);
}
class kf extends se {
  fromJulianDay(t) {
    let a = super.fromJulianDay(t), r = Un(a);
    return new ae(this, Me[r], a.year - aa[r], a.month, a.day);
  }
  toJulianDay(t) {
    return super.toJulianDay(Ga(t));
  }
  balanceDate(t) {
    let a = Ga(t), r = Un(a);
    Me[r] !== t.era && (t.era = Me[r], t.year = a.year - aa[r]), this.constrainDate(t);
  }
  constrainDate(t) {
    let a = Me.indexOf(t.era), r = Af[a];
    if (r != null) {
      let [n, u, i] = r, o = n - aa[a];
      t.year = Math.max(1, Math.min(o, t.year)), t.year === o && (t.month = Math.min(u, t.month), t.month === u && (t.day = Math.min(i, t.day)));
    }
    if (t.year === 1 && a >= 0) {
      let [, n, u] = ct[a];
      t.month = Math.max(n, t.month), t.month === n && (t.day = Math.max(u, t.day));
    }
  }
  getEras() {
    return Me;
  }
  getYearsInEra(t) {
    let a = Me.indexOf(t.era), r = ct[a], n = ct[a + 1];
    if (n == null) return 9999 - r[0] + 1;
    let u = n[0] - r[0];
    return (t.month < n[1] || t.month === n[1] && t.day < n[2]) && u++, u;
  }
  getDaysInMonth(t) {
    return super.getDaysInMonth(Ga(t));
  }
  getMinimumMonthInYear(t) {
    let a = zn(t);
    return a ? a[1] : 1;
  }
  getMinimumDayInMonth(t) {
    let a = zn(t);
    return a && t.month === a[1] ? a[2] : 1;
  }
  constructor(...t) {
    super(...t), this.identifier = "japanese";
  }
}
function zn(e) {
  if (e.year === 1) {
    let t = Me.indexOf(e.era);
    return ct[t];
  }
}
const uo = -543;
class Mf extends se {
  fromJulianDay(t) {
    let a = super.fromJulianDay(t), r = jt(a.era, a.year);
    return new ae(this, r - uo, a.month, a.day);
  }
  toJulianDay(t) {
    return super.toJulianDay(jn(t));
  }
  getEras() {
    return ["BE"];
  }
  getDaysInMonth(t) {
    return super.getDaysInMonth(jn(t));
  }
  balanceDate() {
  }
  constructor(...t) {
    super(...t), this.identifier = "buddhist";
  }
}
function jn(e) {
  let [t, a] = Sa(e.year + uo);
  return new ae(t, a, e.month, e.day);
}
const ma = 1911;
function io(e) {
  return e.era === "minguo" ? e.year + ma : 1 - e.year + ma;
}
function Kn(e) {
  let t = e - ma;
  return t > 0 ? ["minguo", t] : ["before_minguo", 1 - t];
}
class If extends se {
  fromJulianDay(t) {
    let a = super.fromJulianDay(t), r = jt(a.era, a.year), [n, u] = Kn(r);
    return new ae(this, n, u, a.month, a.day);
  }
  toJulianDay(t) {
    return super.toJulianDay(_n(t));
  }
  getEras() {
    return ["before_minguo", "minguo"];
  }
  balanceDate(t) {
    let [a, r] = Kn(io(t));
    t.era = a, t.year = r;
  }
  isInverseEra(t) {
    return t.era === "before_minguo";
  }
  getDaysInMonth(t) {
    return super.getDaysInMonth(_n(t));
  }
  getYearsInEra(t) {
    return t.era === "before_minguo" ? 9999 : 9999 - ma;
  }
  constructor(...t) {
    super(...t), this.identifier = "roc";
  }
}
function _n(e) {
  let [t, a] = Sa(io(e));
  return new ae(t, a, e.month, e.day);
}
const Wn = 1948320, Zn = [0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336];
class Nf {
  fromJulianDay(t) {
    let a = t - Wn, r = 1 + Math.floor((33 * a + 3) / 12053), n = 365 * (r - 1) + Math.floor((8 * r + 21) / 33), u = a - n, i = u < 216 ? Math.floor(u / 31) : Math.floor((u - 6) / 30), o = u - Zn[i] + 1;
    return new ae(this, r, i + 1, o);
  }
  toJulianDay(t) {
    let a = Wn - 1 + 365 * (t.year - 1) + Math.floor((8 * t.year + 21) / 33);
    return a += Zn[t.month - 1], a += t.day, a;
  }
  getMonthsInYear() {
    return 12;
  }
  getDaysInMonth(t) {
    return t.month <= 6 ? 31 : t.month <= 11 || dt(25 * t.year + 11, 33) < 8 ? 30 : 29;
  }
  getMaximumMonthsInYear() {
    return 12;
  }
  getMaximumDaysInMonth() {
    return 31;
  }
  getEras() {
    return ["AP"];
  }
  getYearsInEra() {
    return 9377;
  }
  constructor() {
    this.identifier = "persian";
  }
}
const Ya = 78, Gn = 80;
class Lf extends se {
  fromJulianDay(t) {
    let a = super.fromJulianDay(t), r = a.year - Ya, n = t - Ke(a.era, a.year, 1, 1), u;
    n < Gn ? (r--, u = Ne(a.year - 1) ? 31 : 30, n += u + 155 + 90 + 10) : (u = Ne(a.year) ? 31 : 30, n -= Gn);
    let i, o;
    if (n < u) i = 1, o = n + 1;
    else {
      let l = n - u;
      l < 155 ? (i = Math.floor(l / 31) + 2, o = l % 31 + 1) : (l -= 155, i = Math.floor(l / 30) + 7, o = l % 30 + 1);
    }
    return new ae(this, r, i, o);
  }
  toJulianDay(t) {
    let a = t.year + Ya, [r, n] = Sa(a), u, i;
    return Ne(n) ? (u = 31, i = Ke(r, n, 3, 21)) : (u = 30, i = Ke(r, n, 3, 22)), t.month === 1 ? i + t.day - 1 : (i += u + Math.min(t.month - 2, 5) * 31, t.month >= 8 && (i += (t.month - 7) * 30), i += t.day - 1, i);
  }
  getDaysInMonth(t) {
    return t.month === 1 && Ne(t.year + Ya) || t.month >= 2 && t.month <= 6 ? 31 : 30;
  }
  getYearsInEra() {
    return 9919;
  }
  getEras() {
    return ["saka"];
  }
  balanceDate() {
  }
  constructor(...t) {
    super(...t), this.identifier = "indian";
  }
}
const $a = 1948440, Yn = 1948439, $e = 1300, nt = 1600, Vf = 460322;
function ba(e, t, a, r) {
  return r + Math.ceil(29.5 * (a - 1)) + (t - 1) * 354 + Math.floor((3 + 11 * t) / 30) + e - 1;
}
function oo(e, t, a) {
  let r = Math.floor((30 * (a - t) + 10646) / 10631), n = Math.min(12, Math.ceil((a - (29 + ba(t, r, 1, 1))) / 29.5) + 1), u = a - ba(t, r, n, 1) + 1;
  return new ae(e, r, n, u);
}
function Jn(e) {
  return (14 + 11 * e) % 30 < 11;
}
class on {
  fromJulianDay(t) {
    return oo(this, $a, t);
  }
  toJulianDay(t) {
    return ba($a, t.year, t.month, t.day);
  }
  getDaysInMonth(t) {
    let a = 29 + t.month % 2;
    return t.month === 12 && Jn(t.year) && a++, a;
  }
  getMonthsInYear() {
    return 12;
  }
  getDaysInYear(t) {
    return Jn(t.year) ? 355 : 354;
  }
  getMaximumMonthsInYear() {
    return 12;
  }
  getMaximumDaysInMonth() {
    return 30;
  }
  getYearsInEra() {
    return 9665;
  }
  getEras() {
    return ["AH"];
  }
  constructor() {
    this.identifier = "islamic-civil";
  }
}
class Of extends on {
  fromJulianDay(t) {
    return oo(this, Yn, t);
  }
  toJulianDay(t) {
    return ba(Yn, t.year, t.month, t.day);
  }
  constructor(...t) {
    super(...t), this.identifier = "islamic-tbla";
  }
}
const Hf = "qgpUDckO1AbqBmwDrQpVBakGkgepC9QF2gpcBS0NlQZKB1QLagutBa4ETwoXBYsGpQbVCtYCWwmdBE0KJg2VDawFtgm6AlsKKwWVCsoG6Qr0AnYJtgJWCcoKpAvSC9kF3AJtCU0FpQpSC6ULtAW2CVcFlwJLBaMGUgdlC2oFqworBZUMSg2lDcoF1gpXCasESwmlClILagt1BXYCtwhbBFUFqQW0BdoJ3QRuAjYJqgpUDbIN1QXaAlsJqwRVCkkLZAtxC7QFtQpVCiUNkg7JDtQG6QprCasEkwpJDaQNsg25CroEWworBZUKKgtVC1wFvQQ9Ah0JlQpKC1oLbQW2AjsJmwRVBqkGVAdqC2wFrQpVBSkLkgupC9QF2gpaBasKlQVJB2QHqgu1BbYCVgpNDiULUgtqC60FrgIvCZcESwalBqwG1gpdBZ0ETQoWDZUNqgW1BdoCWwmtBJUFygbkBuoK9QS2AlYJqgpUC9IL2QXqAm0JrQSVCkoLpQuyBbUJ1gSXCkcFkwZJB1ULagVrCisFiwpGDaMNygXWCtsEawJLCaUKUgtpC3UFdgG3CFsCKwVlBbQF2gntBG0BtgimClINqQ3UBdoKWwmrBFMGKQdiB6kLsgW1ClUFJQuSDckO0gbpCmsFqwRVCikNVA2qDbUJugQ7CpsETQqqCtUK2gJdCV4ELgqaDFUNsga5BroEXQotBZUKUguoC7QLuQXaAloJSgukDdEO6AZqC20FNQWVBkoNqA3UDdoGWwWdAisGFQtKC5ULqgWuCi4JjwwnBZUGqgbWCl0FnQI=";
let Cr, ft;
function ra(e) {
  return Vf + ft[e - $e];
}
function Et(e, t) {
  let a = e - $e, r = 1 << 11 - (t - 1);
  return (Cr[a] & r) === 0 ? 29 : 30;
}
function qn(e, t) {
  let a = ra(e);
  for (let r = 1; r < t; r++) a += Et(e, r);
  return a;
}
function Qn(e) {
  return ft[e + 1 - $e] - ft[e - $e];
}
class Uf extends on {
  constructor() {
    if (super(), this.identifier = "islamic-umalqura", Cr || (Cr = new Uint16Array(Uint8Array.from(atob(Hf), (t) => t.charCodeAt(0)).buffer)), !ft) {
      ft = new Uint32Array(nt - $e + 1);
      let t = 0;
      for (let a = $e; a <= nt; a++) {
        ft[a - $e] = t;
        for (let r = 1; r <= 12; r++) t += Et(a, r);
      }
    }
  }
  fromJulianDay(t) {
    let a = t - $a, r = ra($e), n = ra(nt);
    if (a < r || a > n) return super.fromJulianDay(t);
    {
      let u = $e - 1, i = 1, o = 1;
      for (; o > 0; ) {
        u++, o = a - ra(u) + 1;
        let l = Qn(u);
        if (o === l) {
          i = 12;
          break;
        } else if (o < l) {
          let s = Et(u, i);
          for (i = 1; o > s; ) o -= s, i++, s = Et(u, i);
          break;
        }
      }
      return new ae(this, u, i, a - qn(u, i) + 1);
    }
  }
  toJulianDay(t) {
    return t.year < $e || t.year > nt ? super.toJulianDay(t) : $a + qn(t.year, t.month) + (t.day - 1);
  }
  getDaysInMonth(t) {
    return t.year < $e || t.year > nt ? super.getDaysInMonth(t) : Et(t.year, t.month);
  }
  getDaysInYear(t) {
    return t.year < $e || t.year > nt ? super.getDaysInYear(t) : Qn(t.year);
  }
}
const Xn = 347997, lo = 1080, so = 24 * lo, zf = 29, jf = 12 * lo + 793, Kf = zf * so + jf;
function je(e) {
  return dt(e * 7 + 1, 19) < 7;
}
function na(e) {
  let t = Math.floor((235 * e - 234) / 19), a = 12084 + 13753 * t, r = t * 29 + Math.floor(a / 25920);
  return dt(3 * (r + 1), 7) < 3 && (r += 1), r;
}
function _f(e) {
  let t = na(e - 1), a = na(e);
  return na(e + 1) - a === 356 ? 2 : a - t === 382 ? 1 : 0;
}
function Pt(e) {
  return na(e) + _f(e);
}
function co(e) {
  return Pt(e + 1) - Pt(e);
}
function Wf(e) {
  let t = co(e);
  switch (t > 380 && (t -= 30), t) {
    case 353:
      return 0;
    case 354:
      return 1;
    case 355:
      return 2;
  }
}
function Jt(e, t) {
  if (t >= 6 && !je(e) && t++, t === 4 || t === 7 || t === 9 || t === 11 || t === 13) return 29;
  let a = Wf(e);
  return t === 2 ? a === 2 ? 30 : 29 : t === 3 ? a === 0 ? 29 : 30 : t === 6 ? je(e) ? 30 : 0 : 30;
}
class Zf {
  fromJulianDay(t) {
    let a = t - Xn, r = a * so / Kf, n = Math.floor((19 * r + 234) / 235) + 1, u = Pt(n), i = Math.floor(a - u);
    for (; i < 1; ) n--, u = Pt(n), i = Math.floor(a - u);
    let o = 1, l = 0;
    for (; l < i; ) l += Jt(n, o), o++;
    o--, l -= Jt(n, o);
    let s = i - l;
    return new ae(this, n, o, s);
  }
  toJulianDay(t) {
    let a = Pt(t.year);
    for (let r = 1; r < t.month; r++) a += Jt(t.year, r);
    return a + t.day + Xn;
  }
  getDaysInMonth(t) {
    return Jt(t.year, t.month);
  }
  getMonthsInYear(t) {
    return je(t.year) ? 13 : 12;
  }
  getDaysInYear(t) {
    return co(t.year);
  }
  getMaximumMonthsInYear() {
    return 13;
  }
  getMaximumDaysInMonth() {
    return 30;
  }
  getYearsInEra() {
    return 9999;
  }
  getEras() {
    return ["AM"];
  }
  balanceYearMonth(t, a) {
    a.year !== t.year && (je(a.year) && !je(t.year) && a.month > 6 ? t.month-- : !je(a.year) && je(t.year) && a.month > 6 && t.month++);
  }
  constructor() {
    this.identifier = "hebrew";
  }
}
const wr = 1723856, eu = 1824665, Pr = 5500;
function ha(e, t, a, r) {
  return e + 365 * t + Math.floor(t / 4) + 30 * (a - 1) + r - 1;
}
function ln(e, t) {
  let a = Math.floor(4 * (t - e) / 1461), r = 1 + Math.floor((t - ha(e, a, 1, 1)) / 30), n = t + 1 - ha(e, a, r, 1);
  return [a, r, n];
}
function fo(e) {
  return Math.floor(e % 4 / 3);
}
function mo(e, t) {
  return t % 13 !== 0 ? 30 : fo(e) + 5;
}
class sn {
  fromJulianDay(t) {
    let [a, r, n] = ln(wr, t), u = "AM";
    return a <= 0 && (u = "AA", a += Pr), new ae(this, u, a, r, n);
  }
  toJulianDay(t) {
    let a = t.year;
    return t.era === "AA" && (a -= Pr), ha(wr, a, t.month, t.day);
  }
  getDaysInMonth(t) {
    return mo(t.year, t.month);
  }
  getMonthsInYear() {
    return 13;
  }
  getDaysInYear(t) {
    return 365 + fo(t.year);
  }
  getMaximumMonthsInYear() {
    return 13;
  }
  getMaximumDaysInMonth() {
    return 30;
  }
  getYearsInEra(t) {
    return t.era === "AA" ? 9999 : 9991;
  }
  getEras() {
    return ["AA", "AM"];
  }
  constructor() {
    this.identifier = "ethiopic";
  }
}
class Gf extends sn {
  fromJulianDay(t) {
    let [a, r, n] = ln(wr, t);
    return a += Pr, new ae(this, "AA", a, r, n);
  }
  getEras() {
    return ["AA"];
  }
  getYearsInEra() {
    return 9999;
  }
  constructor(...t) {
    super(...t), this.identifier = "ethioaa";
  }
}
class Yf extends sn {
  fromJulianDay(t) {
    let [a, r, n] = ln(eu, t), u = "CE";
    return a <= 0 && (u = "BCE", a = 1 - a), new ae(this, u, a, r, n);
  }
  toJulianDay(t) {
    let a = t.year;
    return t.era === "BCE" && (a = 1 - a), ha(eu, a, t.month, t.day);
  }
  getDaysInMonth(t) {
    let a = t.year;
    return t.era === "BCE" && (a = 1 - a), mo(a, t.month);
  }
  isInverseEra(t) {
    return t.era === "BCE";
  }
  balanceDate(t) {
    t.year <= 0 && (t.era = t.era === "BCE" ? "CE" : "BCE", t.year = 1 - t.year);
  }
  getEras() {
    return ["BCE", "CE"];
  }
  getYearsInEra(t) {
    return t.era === "BCE" ? 9999 : 9715;
  }
  constructor(...t) {
    super(...t), this.identifier = "coptic";
  }
}
function $o(e) {
  switch (e) {
    case "buddhist":
      return new Mf();
    case "ethiopic":
      return new sn();
    case "ethioaa":
      return new Gf();
    case "coptic":
      return new Yf();
    case "hebrew":
      return new Zf();
    case "indian":
      return new Lf();
    case "islamic-civil":
      return new on();
    case "islamic-tbla":
      return new Of();
    case "islamic-umalqura":
      return new Uf();
    case "japanese":
      return new kf();
    case "persian":
      return new Nf();
    case "roc":
      return new If();
    default:
      return new se();
  }
}
let Ja = /* @__PURE__ */ new Map();
class Fe {
  constructor(t, a = {}) {
    this.formatter = bo(t, a), this.options = a;
  }
  format(t) {
    return this.formatter.format(t);
  }
  formatToParts(t) {
    return this.formatter.formatToParts(t);
  }
  formatRange(t, a) {
    if (typeof this.formatter.formatRange == "function") return this.formatter.formatRange(t, a);
    if (a < t) throw new RangeError("End date must be >= start date");
    return `${this.formatter.format(t)} \u2013 ${this.formatter.format(a)}`;
  }
  formatRangeToParts(t, a) {
    if (typeof this.formatter.formatRangeToParts == "function") return this.formatter.formatRangeToParts(t, a);
    if (a < t) throw new RangeError("End date must be >= start date");
    let r = this.formatter.formatToParts(t), n = this.formatter.formatToParts(a);
    return [...r.map((u) => ({ ...u, source: "startRange" })), { type: "literal", value: " \u2013 ", source: "shared" }, ...n.map((u) => ({ ...u, source: "endRange" }))];
  }
  resolvedOptions() {
    let t = this.formatter.resolvedOptions();
    return Qf() && (this.resolvedHourCycle || (this.resolvedHourCycle = Xf(t.locale, this.options)), t.hourCycle = this.resolvedHourCycle, t.hour12 = this.resolvedHourCycle === "h11" || this.resolvedHourCycle === "h12"), t.calendar === "ethiopic-amete-alem" && (t.calendar = "ethioaa"), t;
  }
}
const Jf = { true: { ja: "h11" }, false: {} };
function bo(e, t = {}) {
  if (typeof t.hour12 == "boolean" && qf()) {
    t = { ...t };
    let n = Jf[String(t.hour12)][e.split("-")[0]], u = t.hour12 ? "h12" : "h23";
    t.hourCycle = n ?? u, delete t.hour12;
  }
  let a = e + (t ? Object.entries(t).sort((n, u) => n[0] < u[0] ? -1 : 1).join() : "");
  if (Ja.has(a)) return Ja.get(a);
  let r = new Intl.DateTimeFormat(e, t);
  return Ja.set(a, r), r;
}
let qa = null;
function qf() {
  return qa == null && (qa = new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: false }).format(new Date(2020, 2, 3, 0)) === "24"), qa;
}
let Qa = null;
function Qf() {
  return Qa == null && (Qa = new Intl.DateTimeFormat("fr", { hour: "numeric", hour12: false }).resolvedOptions().hourCycle === "h12"), Qa;
}
function Xf(e, t) {
  if (!t.timeStyle && !t.hour) return;
  e = e.replace(/(-u-)?-nu-[a-zA-Z0-9]+/, ""), e += (e.includes("-u-") ? "" : "-u") + "-nu-latn";
  let a = bo(e, { ...t, timeZone: void 0 }), r = parseInt(a.formatToParts(new Date(2020, 2, 3, 0)).find((u) => u.type === "hour").value, 10), n = parseInt(a.formatToParts(new Date(2020, 2, 3, 23)).find((u) => u.type === "hour").value, 10);
  if (r === 0 && n === 23) return "h23";
  if (r === 24 && n === 23) return "h24";
  if (r === 0 && n === 11) return "h11";
  if (r === 12 && n === 11) return "h12";
  throw new Error("Unexpected hour cycle result");
}
function xe(e) {
  e = Ni(e ?? {}, e4);
  let { locale: t } = me();
  return c.useMemo(() => new Fe(t, e), [t, e]);
}
function e4(e, t) {
  if (e === t) return true;
  let a = Object.keys(e), r = Object.keys(t);
  if (a.length !== r.length) return false;
  for (let n of a) if (t[n] !== e[n]) return false;
  return true;
}
function ho(e) {
  return e && e.__esModule ? e.default : e;
}
const dn = /* @__PURE__ */ new WeakMap();
function Nt(e) {
  return (e == null ? void 0 : e.calendar.identifier) === "gregory" && e.era === "BC" ? "short" : void 0;
}
function t4(e) {
  let t = Oe(ho(zt), "@react-aria/calendar"), a, r;
  "highlightedRange" in e ? { start: a, end: r } = e.highlightedRange || {} : (a = Array.isArray(e.value) ? e.value[0] : e.value ?? void 0, r = Array.isArray(e.value) ? e.value.at(-1) : e.value ?? void 0);
  let n = xe({ weekday: "long", month: "long", year: "numeric", day: "numeric", era: Nt(a) || Nt(r), timeZone: e.timeZone }), { locale: u } = me(), i = c.useMemo(() => new Intl.ListFormat(u), [u]), o = "anchorDate" in e ? e.anchorDate : null;
  return c.useMemo(() => {
    if (!o && a && r) {
      if (te(a, r)) {
        let l = n.format(a.toDate(e.timeZone));
        return t.format("selectedDateDescription", { date: l });
      } else if ("highlightedRange" in e) {
        let l = Br(n, t, a, r, e.timeZone);
        return t.format("selectedRangeDescription", { dateRange: l });
      } else if (Array.isArray(e.value)) {
        let l = e.value.map((d) => n.format(d.toDate(e.timeZone))), s = i.format(l);
        return t.format("selectedDateDescription", { date: s });
      }
    }
    return "";
  }, [a, r, o, e, t, n, i]);
}
function Sr(e, t, a, r) {
  let n = Oe(ho(zt), "@react-aria/calendar"), u = Nt(e) || Nt(t), i = xe({ month: "long", year: "numeric", era: u, calendar: e.calendar.identifier, timeZone: a }), o = xe({ month: "long", year: "numeric", day: "numeric", era: u, calendar: e.calendar.identifier, timeZone: a });
  return c.useMemo(() => {
    if (te(e, Xe(e))) {
      let l = e, s = t;
      if (e.calendar.getFormattableMonth && (l = e.calendar.getFormattableMonth(e)), t.calendar.getFormattableMonth && (s = t.calendar.getFormattableMonth(t)), te(t, fa(e))) return i.format(l.toDate(a));
      if (te(t, fa(t))) return r ? Br(i, n, l, s, a) : i.formatRange(l.toDate(a), s.toDate(a));
    }
    return r ? Br(o, n, e, t, a) : o.formatRange(e.toDate(a), t.toDate(a));
  }, [e, t, i, o, n, a, r]);
}
function Br(e, t, a, r, n) {
  let u = e.formatRangeToParts(a.toDate(n), r.toDate(n)), i = -1;
  for (let s = 0; s < u.length; s++) {
    let d = u[s];
    if (d.source === "shared" && d.type === "literal") i = s;
    else if (d.source === "endRange") break;
  }
  let o = "", l = "";
  for (let s = 0; s < u.length; s++) s < i ? o += u[s].value : s > i && (l += u[s].value);
  return t.format("dateRange", { startDate: o, endDate: l });
}
function tu(e, t) {
  const a = c.useRef(true), r = c.useRef(null);
  let n = ne(e);
  c.useEffect(() => (a.current = true, () => {
    a.current = false;
  }), []), c.useEffect(() => {
    let u = r.current;
    a.current ? a.current = false : (!u || t.some((i, o) => !Object.is(i, u[o]))) && n(), r.current = t;
  }, t);
}
function a4(e) {
  return e && e.__esModule ? e.default : e;
}
function r4(e, t) {
  let a = Oe(a4(zt), "@react-aria/calendar"), r = oe(e), n = Sr(t.visibleRange.start, t.visibleRange.end, t.timeZone, false), u = Sr(t.visibleRange.start, t.visibleRange.end, t.timeZone, true);
  tu(() => {
    t.isFocused || Tt(u);
  }, [u]);
  let i = t4(t);
  tu(() => {
    i && Tt(i, "polite", 4e3);
  }, [i]);
  let o = Bt([!!e.errorMessage, e.isInvalid, e.validationState]);
  dn.set(t, { ariaLabel: e["aria-label"], ariaLabelledBy: e["aria-labelledby"], errorMessageId: o, selectedDateDescription: i });
  let [l, s] = c.useState(false), d = e.isDisabled || t.isNextVisibleRangeInvalid();
  d && l && (s(false), t.setFocused(true));
  let [f, $] = c.useState(false), m = e.isDisabled || t.isPreviousVisibleRangeInvalid();
  m && f && ($(false), t.setFocused(true));
  let b = Ot({ id: e.id, "aria-label": [e["aria-label"], u].filter(Boolean).join(", "), "aria-labelledby": e["aria-labelledby"] });
  return { calendarProps: Y(r, b, { role: "application", "aria-details": e["aria-details"] || void 0, "aria-describedby": e["aria-describedby"] || void 0 }), nextButtonProps: { onPress: () => t.focusNextPage(), "aria-label": a.format("next"), isDisabled: d, onFocusChange: s }, prevButtonProps: { onPress: () => t.focusPreviousPage(), "aria-label": a.format("previous"), isDisabled: m, onFocusChange: $ }, errorMessageProps: { id: o }, title: n };
}
function n4(e, t) {
  return r4(e, t);
}
function u4(e, t) {
  let { startDate: a = t.visibleRange.start, endDate: r = t.visibleRange.end, firstDayOfWeek: n } = e, { direction: u } = me(), { keyboardProps: i } = Qe({ shortcuts: { End: () => {
    t.focusSectionEnd();
  }, Home: () => {
    t.focusSectionStart();
  }, Escape: () => ("setAnchorDate" in t && t.setAnchorDate(null), false) } }), { keyboardProps: o } = Qe({ shortcuts: { Enter: () => {
    t.selectFocusedDate();
  }, " ": () => {
    t.selectFocusedDate();
  }, PageUp: () => {
    t.focusPreviousSection();
  }, "Shift+PageUp": () => {
    t.focusPreviousSection(true);
  }, PageDown: () => {
    t.focusNextSection();
  }, "Shift+PageDown": () => {
    t.focusNextSection(true);
  }, ArrowLeft: () => {
    u === "rtl" ? t.focusNextDay() : t.focusPreviousDay();
  }, ArrowUp: () => {
    t.focusPreviousRow();
  }, ArrowRight: () => {
    u === "rtl" ? t.focusPreviousDay() : t.focusNextDay();
  }, ArrowDown: () => {
    t.focusNextRow();
  } }, allowRepeats: true }), l = Sr(a, r, t.timeZone, true), { ariaLabel: s, ariaLabelledBy: d } = dn.get(t), f = Ot({ "aria-label": [s, l].filter(Boolean).join(", "), "aria-labelledby": d }), $ = xe({ weekday: e.weekdayStyle || "narrow", timeZone: t.timeZone }), { locale: m } = me(), b = c.useMemo(() => {
    let h = t.visibleDuration.days && t.visibleDuration.days < 7, y = h ? a : At(Xr(t.timeZone), m, n), x = h ? t.visibleDuration.days : 7;
    return [...new Array(x).keys()].map((v) => {
      let E = y.add({ days: v }).toDate(t.timeZone);
      return $.format(E);
    });
  }, [m, t.timeZone, $, n, a, t.visibleDuration.days]), p = t.getWeeksInMonth(a);
  return { gridProps: Y(f, { role: "grid", "aria-readonly": t.isReadOnly || void 0, "aria-disabled": t.isDisabled || void 0, "aria-multiselectable": "highlightedRange" in t || t.selectionMode === "multiple" || void 0, onFocus: () => t.setFocused(true), onBlur: () => t.setFocused(false) }, i, o), headerProps: { "aria-hidden": true }, weekDays: b, weeksInMonth: p };
}
function pa(e, t) {
  if (!e) return false;
  let a = window.getComputedStyle(e), r = document.scrollingElement || document.documentElement, n = /(auto|scroll)/.test(a.overflow + a.overflowX + a.overflowY);
  return e === r && a.overflow !== "hidden" && (n = true), n && t && (n = e.scrollHeight !== e.clientHeight || e.scrollWidth !== e.clientWidth), n;
}
function Ta(e, t) {
  let a = e;
  for (pa(a, t) && (a = a.parentElement); a && !pa(a, t); ) a = a.parentElement;
  return a || document.scrollingElement || document.documentElement;
}
function Xa(e, t) {
  let a = [], r = document.scrollingElement || document.documentElement;
  for (; e && (pa(e, t) && a.push(e), e !== r); ) e = e.parentElement;
  return a;
}
function er(e, t, a = {}) {
  let { block: r = "nearest", inline: n = "nearest" } = a;
  if (e === t) return;
  let u = e.scrollTop, i = e.scrollLeft, o = t.getBoundingClientRect(), l = e.getBoundingClientRect(), s = window.getComputedStyle(t), d = window.getComputedStyle(e), f = document.scrollingElement || document.documentElement, $ = e === f, m = e === f ? 0 : l.top, b = e === f ? e.clientHeight : l.bottom, p = e === f ? 0 : l.left, h = e === f ? e.clientWidth : l.right, y = parseFloat(s.scrollMarginTop) || 0, x = parseFloat(s.scrollMarginBottom) || 0, v = parseFloat(s.scrollMarginLeft) || 0, g = parseFloat(s.scrollMarginRight) || 0, E = parseFloat(d.scrollPaddingTop) || 0, B = parseFloat(d.scrollPaddingBottom) || 0, A = parseFloat(d.scrollPaddingLeft) || 0, k = parseFloat(d.scrollPaddingRight) || 0, M = parseFloat(d.borderTopWidth) || 0, L = parseFloat(d.borderBottomWidth) || 0, C = parseFloat(d.borderLeftWidth) || 0, N = parseFloat(d.borderRightWidth) || 0, Q = o.top - y, D = o.bottom + x, I = o.left - v, U = o.right + g, w = e === f ? 0 : C + N, j = e === f ? 0 : M + L, P = e === f ? 0 : e.offsetWidth - e.clientWidth - w, R = e === f ? 0 : e.offsetHeight - e.clientHeight - j, O = m + ($ ? 0 : M) + E, K = b - ($ ? 0 : L) - B - R, H = p + ($ ? 0 : C) + A, F = h - ($ ? 0 : N) - k;
  ht() && Ye() || d.direction === "ltr" ? F -= P : d.direction === "rtl" && (H += P);
  let G = Q < O || D > K, J = I < H || U > F;
  if (G && r === "start") u += Q - O;
  else if (G && r === "center") u += (Q + D) / 2 - (O + K) / 2;
  else if (G && r === "end") u += D - K;
  else if (G && r === "nearest") {
    let T = Q - O, z = D - K;
    u += Math.abs(T) <= Math.abs(z) ? T : z;
  }
  if (J && n === "start") i += I - H;
  else if (J && n === "center") i += (I + U) / 2 - (H + F) / 2;
  else if (J && n === "end") i += U - F;
  else if (J && n === "nearest") {
    let T = I - H, z = U - F;
    i += Math.abs(T) <= Math.abs(z) ? T : z;
  }
  e.scrollTo({ left: i, top: u });
}
function po(e, t = {}) {
  var _a2, _b, _c2;
  let { containingElement: a } = t;
  if (e && e.isConnected) {
    let r = document.scrollingElement || document.documentElement;
    if (window.getComputedStyle(r).overflow === "hidden") {
      let { left: u, top: i } = e.getBoundingClientRect(), o = Xa(e, true);
      for (let d of o) er(d, e);
      let { left: l, top: s } = e.getBoundingClientRect();
      if (Math.abs(u - l) > 1 || Math.abs(i - s) > 1) {
        o = a ? Xa(a, true) : [];
        for (let d of o) er(d, a, { block: "center", inline: "center" });
        for (let d of Xa(e, true)) er(d, e);
      }
    } else {
      let { left: u, top: i } = e.getBoundingClientRect();
      (_a2 = e == null ? void 0 : e.scrollIntoView) == null ? void 0 : _a2.call(e, { block: "nearest" });
      let { left: o, top: l } = e.getBoundingClientRect();
      (Math.abs(u - o) > 1 || Math.abs(i - l) > 1) && ((_b = a == null ? void 0 : a.scrollIntoView) == null ? void 0 : _b.call(a, { block: "center", inline: "center" }), (_c2 = e.scrollIntoView) == null ? void 0 : _c2.call(e, { block: "nearest" }));
    }
  }
}
let i4 = 0;
const tr = /* @__PURE__ */ new Map();
function cn(e) {
  let [t, a] = c.useState();
  return Z(() => {
    if (!e) return;
    let r = tr.get(e);
    if (r) a(r.element.id);
    else {
      let n = `react-aria-description-${i4++}`;
      a(n);
      let u = document.createElement("div");
      u.id = n, u.style.display = "none", u.textContent = e, document.body.appendChild(u), r = { refCount: 0, element: u }, tr.set(e, r);
    }
    return r.refCount++, () => {
      r && --r.refCount === 0 && (r.element.remove(), tr.delete(e));
    };
  }, [e]), { "aria-describedby": e ? t : void 0 };
}
function o4(e) {
  return e && e.__esModule ? e.default : e;
}
function l4(e, t, a) {
  let { date: r, isDisabled: n } = e, { errorMessageId: u, selectedDateDescription: i } = dn.get(t), o = Oe(o4(zt), "@react-aria/calendar"), l = xe({ weekday: "long", day: "numeric", month: "long", year: "numeric", era: Nt(r), timeZone: t.timeZone }), s = t.isCellFocused(r) && !e.isOutsideMonth;
  n = n || t.isCellDisabled(r) || !!e.isOutsideMonth;
  let d = t.isCellUnavailable(r), f = !n && !d, $ = t.isSelected(r) && f, m = false;
  t.isValueInvalid && ("highlightedRange" in t ? m = !t.anchorDate && t.highlightedRange != null && r.compare(t.highlightedRange.start) >= 0 && r.compare(t.highlightedRange.end) <= 0 : Array.isArray(t.value) ? m = t.value.some((C) => te(C, r)) : t.value && (m = te(t.value, r))), m && !n && ($ = true), r = Ni(r, of);
  let b = c.useMemo(() => r.toDate(t.timeZone), [r, t.timeZone]), p = Vi(r, t.timeZone), h = c.useMemo(() => {
    let C = "";
    return "highlightedRange" in t && t.value && !t.anchorDate && (te(r, t.value.start) || te(r, t.value.end)) && (C = i + ", "), C += l.format(b), p ? C = o.format($ ? "todayDateSelected" : "todayDate", { date: C }) : $ && (C = o.format("dateSelected", { date: C })), t.minValue && te(r, t.minValue) ? C += ", " + o.format("minimumDate") : t.maxValue && te(r, t.maxValue) && (C += ", " + o.format("maximumDate")), C;
  }, [l, b, o, $, p, r, t, i]), y = "";
  "anchorDate" in t && s && !t.isReadOnly && f && (t.anchorDate ? y = o.format("finishRangeSelectionPrompt") : y = o.format("startRangeSelectionPrompt"));
  let x = cn(y), v = c.useRef(false), g = c.useRef(false), E = c.useRef(void 0), { pressProps: B, isPressed: A } = Gr({ shouldCancelOnPointerExit: "anchorDate" in t && !!t.anchorDate, preventFocusOnPress: true, isDisabled: !f || t.isReadOnly, onPressStart(C) {
    if (t.isReadOnly) {
      t.setFocusedDate(r), t.setFocused(true);
      return;
    }
    if ("highlightedRange" in t && !t.anchorDate && (C.pointerType === "mouse" || C.pointerType === "touch")) {
      if (t.highlightedRange && !m) {
        if (te(r, t.highlightedRange.start)) {
          t.setAnchorDate(t.highlightedRange.end), t.setFocusedDate(r), t.setFocused(true), t.setDragging(true), g.current = true;
          return;
        } else if (te(r, t.highlightedRange.end)) {
          t.setAnchorDate(t.highlightedRange.start), t.setFocusedDate(r), t.setFocused(true), t.setDragging(true), g.current = true;
          return;
        }
      }
      let N = () => {
        t.setDragging(true), E.current = void 0, t.selectDate(r), t.setFocusedDate(r), t.setFocused(true), v.current = true;
      };
      C.pointerType === "touch" ? E.current = setTimeout(N, 200) : N();
    }
  }, onPressEnd() {
    g.current = false, v.current = false, clearTimeout(E.current), E.current = void 0;
  }, onPress() {
    !("anchorDate" in t) && !t.isReadOnly && (t.selectDate(r), t.setFocusedDate(r), t.setFocused(true));
  }, onPressUp(C) {
    t.isReadOnly || ("anchorDate" in t && E.current && (t.selectDate(r), t.setFocusedDate(r), t.setFocused(true)), "anchorDate" in t && (g.current ? t.setAnchorDate(r) : t.anchorDate && !v.current ? (t.selectDate(r), t.setFocusedDate(r), t.setFocused(true)) : C.pointerType === "keyboard" && !t.anchorDate ? (t.selectDate(r), t.focusNearestAvailableDate(r)) : C.pointerType === "virtual" && (t.selectDate(r), t.setFocusedDate(r), t.setFocused(true))));
  } }), k;
  n || (k = te(r, t.focusedDate) ? 0 : -1), c.useEffect(() => {
    s && a.current && (Ze(a.current), Ca() !== "pointer" && q() === a.current && po(a.current, { containingElement: Ta(a.current) }));
  }, [s, a]);
  let M = xe({ day: "numeric", timeZone: t.timeZone, calendar: r.calendar.identifier }), L = c.useMemo(() => M.formatToParts(b).find((C) => C.type === "day").value, [M, b]);
  return { cellProps: { role: "gridcell", "aria-disabled": !f || void 0, "aria-selected": $ || void 0, "aria-invalid": m || void 0 }, buttonProps: Y(B, { onFocus() {
    n || (t.setFocusedDate(r), t.setFocused(true));
  }, tabIndex: k, role: "button", "aria-disabled": !f || void 0, "aria-label": h, "aria-invalid": m || void 0, "aria-describedby": [m ? u : void 0, x["aria-describedby"]].filter(Boolean).join(" ") || void 0, onPointerEnter(C) {
    "highlightDate" in t && (C.pointerType !== "touch" || t.isDragging) && f && t.highlightDate(r);
  }, onPointerDown(C) {
    let N = V(C);
    N instanceof HTMLElement && "releasePointerCapture" in N && ("hasPointerCapture" in N ? N.hasPointerCapture(C.pointerId) && N.releasePointerCapture(C.pointerId) : N.releasePointerCapture(C.pointerId));
  }, onContextMenu(C) {
    C.preventDefault();
  } }), isPressed: A, isFocused: s, isSelected: $, isDisabled: n, isUnavailable: d, isOutsideVisibleRange: r.compare(t.visibleRange.start) < 0 || r.compare(t.visibleRange.end) > 0, isInvalid: m, formattedDate: L };
}
function qt(e, t, a) {
  return t != null && e.compare(t) < 0 || a != null && e.compare(a) > 0;
}
function au(e, t, a, r, n) {
  let u = {};
  for (let o in t) u[o] = Math.floor(t[o] / 2), u[o] > 0 && t[o] % 2 === 0 && u[o]--;
  let i = _e(e, t, a).subtract(u);
  return Lt(e, i, t, a, r, n);
}
function _e(e, t, a, r, n) {
  let u = e;
  return t.years ? u = df(e) : t.months ? u = Xe(e) : (t.weeks || t.days && t.days > 7) && (u = At(e, a)), Lt(e, u, t, a, r, n);
}
function Fr(e, t, a, r, n) {
  let u = { ...t };
  u.days ? u.days-- : u.weeks ? u.weeks-- : u.months ? u.months-- : u.years && u.years--;
  let i = _e(e, t, a).subtract(u);
  return Lt(e, i, t, a, r, n);
}
function Lt(e, t, a, r, n, u) {
  if (n && e.compare(n) >= 0) {
    let i = Ki(t, _e(he(n), a, r));
    i && (t = i);
  }
  if (u && e.compare(u) <= 0) {
    let i = ji(t, Fr(he(u), a, r));
    i && (t = i);
  }
  return t;
}
function we(e, t, a) {
  if (t) {
    let r = Ki(e, he(t));
    r && (e = r);
  }
  if (a) {
    let r = ji(e, he(a));
    r && (e = r);
  }
  return e;
}
function s4(e, t, a) {
  if (!a) return e;
  for (; e.compare(t) >= 0 && a(e); ) e = e.subtract({ days: 1 });
  return e.compare(t) >= 0 ? e : null;
}
function d4(e, t) {
  return e === t ? true : e.days === t.days && e.weeks === t.weeks && e.months === t.months && e.years === t.years;
}
function c4(e) {
  let t = c.useMemo(() => new Fe(e.locale), [e.locale]), a = c.useMemo(() => t.resolvedOptions(), [t]), { locale: r, createCalendar: n, visibleDuration: u = { months: 1 }, minValue: i, maxValue: o, selectionAlignment: l, isDateUnavailable: s, pageBehavior: d = "visible", selectionMode: f = "single", firstDayOfWeek: $, weeksInMonth: m } = e, b = c.useMemo(() => n(a.calendar), [n, a.calendar]), [p, h] = Ft(e.value, e.defaultValue ?? null, e.onChange), y = c.useMemo(() => Array.isArray(p) ? p.map((F) => ee(he(F), b)) : p ? ee(he(p), b) : null, [p, b]), x = c.useMemo(() => {
    let F = Array.isArray(p) ? p[0] : p;
    return F && "timeZone" in F ? F.timeZone : a.timeZone;
  }, [p, a.timeZone]), v = c.useMemo(() => e.focusedValue ? we(ee(he(e.focusedValue), b), i, o) : void 0, [e.focusedValue, b, i, o]), g = c.useMemo(() => e.defaultFocusedValue ? we(ee(he(e.defaultFocusedValue), b), i, o) : we(y ? Array.isArray(y) ? y[0] : y : ee(Xr(x), b), i, o), [e.defaultFocusedValue, y, x, b, i, o]), [E, B] = Ft(v, g, e.onFocusChange), A = () => {
    switch (l) {
      case "start":
        return _e(E, u, r, i, o);
      case "end":
        return Fr(E, u, r, i, o);
      default:
        return au(E, u, r, i, o);
    }
  }, [k, M] = c.useState(A), [L, C] = c.useState(e.autoFocus || false), [N, Q] = c.useState(u);
  d4(u, N) || (Q(u), M(A()));
  let D = c.useMemo(() => {
    let F = { ...u };
    return F.days ? F.days-- : F.days = -1, k.add(F);
  }, [k, u]), [I, U] = c.useState(b);
  if (!Ba(b, I)) {
    let F = ee(E, b);
    M(au(F, u, r, i, o)), B(F), U(b);
  }
  qt(E, i, o) ? B(we(E, i, o)) : E.compare(k) < 0 ? M(Fr(E, u, r, i, o)) : E.compare(D) > 0 && M(_e(E, u, r, i, o));
  function w(F) {
    F = we(F, i, o), B(F);
  }
  function j(F) {
    let G = we(F, i, o), J = s4(G, k, s);
    if (!J) return null;
    let T = Array.isArray(p) ? p[0] : p, z = ee(J, (T == null ? void 0 : T.calendar) || new se());
    return T && "hour" in T ? T.set(z) : z;
  }
  function P(F) {
    if (!e.isDisabled && !e.isReadOnly) {
      if (F === null) {
        h(f === "multiple" ? [] : null);
        return;
      }
      if (Array.isArray(F)) h(F.map(j).filter(Boolean));
      else {
        let G = j(F);
        G && h(G);
      }
    }
  }
  let R = c.useMemo(() => y ? Array.isArray(y) ? y.some((F) => (s == null ? void 0 : s(F)) || qt(F, i, o)) : (s == null ? void 0 : s(y)) || qt(y, i, o) : false, [y, s, i, o]), O = e.isInvalid || e.validationState === "invalid" || R, K = O ? "invalid" : null, H = c.useMemo(() => d === "visible" ? u : ar(u), [d, u]);
  return { isDisabled: e.isDisabled ?? false, isReadOnly: e.isReadOnly ?? false, value: y, setValue: P, selectionMode: f, visibleDuration: u, visibleRange: { start: k, end: D }, minValue: i, maxValue: o, focusedDate: E, timeZone: x, validationState: K, isValueInvalid: O, setFocusedDate(F) {
    w(F);
  }, focusNextDay() {
    w(E.add({ days: 1 }));
  }, focusPreviousDay() {
    w(E.subtract({ days: 1 }));
  }, focusNextRow() {
    u.days ? this.focusNextPage() : (u.weeks || u.months || u.years) && w(E.add({ weeks: 1 }));
  }, focusPreviousRow() {
    u.days ? this.focusPreviousPage() : (u.weeks || u.months || u.years) && w(E.subtract({ weeks: 1 }));
  }, focusNextPage() {
    let F = k.add(H);
    B(we(E.add(H), i, o)), M(_e(Lt(E, F, H, r, i, o), H, r));
  }, focusPreviousPage() {
    let F = k.subtract(H);
    B(we(E.subtract(H), i, o)), M(_e(Lt(E, F, H, r, i, o), H, r));
  }, focusSectionStart() {
    u.days ? w(k) : u.weeks ? w(At(E, r)) : (u.months || u.years) && w(Xe(E));
  }, focusSectionEnd() {
    u.days ? w(D) : u.weeks ? w(cf(E, r)) : (u.months || u.years) && w(fa(E));
  }, focusNextSection(F) {
    if (!F && !u.days) {
      w(E.add(ar(u)));
      return;
    }
    u.days ? this.focusNextPage() : u.weeks ? w(E.add({ months: 1 })) : (u.months || u.years) && w(E.add({ years: 1 }));
  }, focusPreviousSection(F) {
    if (!F && !u.days) {
      w(E.subtract(ar(u)));
      return;
    }
    u.days ? this.focusPreviousPage() : u.weeks ? w(E.subtract({ months: 1 })) : (u.months || u.years) && w(E.subtract({ years: 1 }));
  }, selectFocusedDate() {
    s && s(E) || this.selectDate(E);
  }, selectDate(F) {
    if (!(e.isDisabled || e.isReadOnly)) if (f === "multiple" && F != null) {
      let G = j(F);
      if (!G) return;
      let J = [];
      Array.isArray(p) ? J = p : p != null && (J = [p]);
      let T = J.findIndex((le) => te(le, G)), z = T >= 0 ? J.slice(0, T).concat(J.slice(T + 1)) : [...J, G];
      h(z);
    } else P(F);
  }, isFocused: L, setFocused: C, isInvalid(F) {
    return qt(F, i, o);
  }, isSelected(F) {
    return !y || this.isCellDisabled(F) || this.isCellUnavailable(F) ? false : Array.isArray(y) ? y.some((G) => te(G, F)) : te(F, y);
  }, isCellFocused(F) {
    return L && E && te(F, E);
  }, isCellDisabled(F) {
    return e.isDisabled || F.compare(k) < 0 || F.compare(D) > 0 || this.isInvalid(F);
  }, isCellUnavailable(F) {
    return e.isDateUnavailable ? e.isDateUnavailable(F) : false;
  }, isPreviousVisibleRangeInvalid() {
    let F = k.subtract({ days: 1 });
    return te(F, k) || this.isInvalid(F);
  }, isNextVisibleRangeInvalid() {
    let F = D.add({ days: 1 });
    return te(F, D) || this.isInvalid(F);
  }, getDatesInWeek(F, G = k) {
    let J = G.add({ weeks: F }), T = [], z = u.days && u.days < 7 ? u.days : 7;
    if (z === 7) {
      J = At(J, r, $);
      let le = Qr(J, r, $);
      for (let rt = 0; rt < le; rt++) T.push(null);
    }
    for (; T.length < z; ) {
      T.push(J);
      let le = J.add({ days: 1 });
      if (te(J, le)) break;
      J = le;
    }
    for (; T.length < z; ) T.push(null);
    return T;
  }, getWeeksInMonth(F = k) {
    let G = m || $f(F, r, $);
    return (u.weeks || u.days) && (G = u.weeks ?? 0, u.days && (G += Math.ceil(u.days / 7))), G;
  } };
}
function ar(e) {
  let t = { ...e };
  for (let a in e) t[a] = 1;
  return t;
}
const ru = { border: 0, clip: "rect(0 0 0 0)", clipPath: "inset(50%)", height: "1px", margin: "-1px", overflow: "hidden", padding: 0, position: "absolute", width: "1px", whiteSpace: "nowrap" };
function yo(e = {}) {
  let { style: t, isFocusable: a } = e, [r, n] = c.useState(false), { focusWithinProps: u } = pt({ isDisabled: !a, onFocusWithinChange: (o) => n(o) }), i = c.useMemo(() => r ? t : t ? { ...ru, ...t } : ru, [r]);
  return { visuallyHiddenProps: { ...u, style: i } };
}
function Rr(e) {
  let { children: t, elementType: a = "div", isFocusable: r, style: n, ...u } = e, { visuallyHiddenProps: i } = yo(e);
  return S.createElement(a, Y(u, i), t);
}
const ya = c.createContext(null), f4 = c.createContext(null), Aa = c.createContext(null), fn = c.createContext(null), lm = c.forwardRef(function(t, a) {
  [t, a] = Ce(t, a, ya);
  let { locale: r } = me(), n = c4({ ...t, locale: r, createCalendar: t.createCalendar || $o }), { calendarProps: u, prevButtonProps: i, nextButtonProps: o, errorMessageProps: l, title: s } = n4(t, n), d = Te({ ...t, values: { state: n, isDisabled: t.isDisabled || false, isInvalid: n.isValueInvalid }, defaultClassName: "react-aria-Calendar" }), f = oe(t, { global: true });
  return S.createElement(de.div, { ...Y(f, d, u), ref: a, slot: t.slot || void 0, "data-disabled": t.isDisabled || void 0, "data-invalid": n.isValueInvalid || void 0 }, S.createElement(va, { values: [[Ut, { slots: { previous: i, next: o } }], [qr, { "aria-hidden": true, level: 2, children: s }], [Aa, n], [ya, t], [Pa, { slots: { errorMessage: l } }]] }, S.createElement(Rr, null, S.createElement("h2", null, u["aria-label"])), d.children, S.createElement(Rr, null, S.createElement("button", { "aria-label": o["aria-label"], disabled: o.isDisabled, onClick: () => n.focusNextPage(), tabIndex: -1 }))));
}), ka = c.createContext(null), sm = c.forwardRef(function(t, a) {
  let r = c.useContext(Aa), n = c.useContext(fn), u = oa(ya), i = oa(f4), o = r ?? n, l = o.visibleRange.start;
  t.offset && (l = l.add(t.offset));
  let s = (u == null ? void 0 : u.firstDayOfWeek) ?? (i == null ? void 0 : i.firstDayOfWeek), { gridProps: d, headerProps: f, weekDays: $, weeksInMonth: m } = u4({ startDate: l, endDate: fa(l), weekdayStyle: t.weekdayStyle, firstDayOfWeek: s }, o), b = oe(t, { global: true });
  return S.createElement(ka.Provider, { value: { headerProps: f, weekDays: $, startDate: l, weeksInMonth: m } }, S.createElement(de.table, { render: t.render, ...Y(b, d), ref: a, style: t.style, cellPadding: 0, className: t.className ?? "react-aria-CalendarGrid" }, typeof t.children != "function" ? t.children : S.createElement(S.Fragment, null, S.createElement($4, null, (p) => S.createElement(h4, null, p)), S.createElement(y4, null, t.children))));
});
function m4(e, t) {
  let { children: a, style: r, className: n } = e, { headerProps: u, weekDays: i } = c.useContext(ka), o = oe(e, { global: true });
  return S.createElement(de.thead, { render: e.render, ...Y(o, u), ref: t, style: r, className: n ?? "react-aria-CalendarGridHeader" }, S.createElement("tr", null, i.map((l, s) => S.cloneElement(a(l), { key: s }))));
}
const $4 = c.forwardRef(m4);
function b4(e, t) {
  let { children: a, style: r, className: n } = e, u = oe(e, { global: true });
  return S.createElement(de.th, { render: e.render, ...u, ref: t, style: r, className: n || "react-aria-CalendarHeaderCell" }, a);
}
const h4 = c.forwardRef(b4);
function p4(e, t) {
  let { children: a, style: r, className: n } = e, u = c.useContext(Aa), i = c.useContext(fn), o = u ?? i, { startDate: l, weeksInMonth: s } = c.useContext(ka), d = oe(e, { global: true });
  return S.createElement(de.tbody, { render: e.render, ...d, ref: t, style: r, className: n ?? "react-aria-CalendarGridBody" }, [...new Array(s).keys()].map((f) => S.createElement("tr", { key: f }, o.getDatesInWeek(f, l).map(($, m) => $ ? S.cloneElement(a($), { key: m }) : S.createElement("td", { key: m })))));
}
const y4 = c.forwardRef(p4), dm = c.forwardRef(function({ date: t, ...a }, r) {
  let n = c.useContext(Aa), u = c.useContext(fn), i = n ?? u, { startDate: o } = c.useContext(ka) ?? { startDate: i.visibleRange.start }, l = i.visibleDuration.days || i.visibleDuration.weeks ? false : !uf(o, t), s = Vi(t, i.timeZone), d = c.useRef(null), { cellProps: f, buttonProps: $, ...m } = l4({ date: t, isOutsideMonth: l }, i, d), { hoverProps: b, isHovered: p } = Ht({ ...a, isDisabled: m.isDisabled || m.isUnavailable }), { focusProps: h, isFocusVisible: y } = yt();
  y && (y = m.isFocused);
  let x = false, v = false;
  "highlightedRange" in i && i.highlightedRange && (x = te(t, i.highlightedRange.start), v = te(t, i.highlightedRange.end));
  let g = Te({ ...a, defaultChildren: m.formattedDate, defaultClassName: "react-aria-CalendarCell", values: { date: t, isHovered: p, isOutsideMonth: l, isFocusVisible: y, isSelectionStart: x, isSelectionEnd: v, isToday: s, ...m } }), E = { "data-focused": m.isFocused || void 0, "data-hovered": p || void 0, "data-pressed": m.isPressed || void 0, "data-unavailable": m.isUnavailable || void 0, "data-disabled": m.isDisabled || void 0, "data-focus-visible": y || void 0, "data-outside-visible-range": m.isOutsideVisibleRange || void 0, "data-outside-month": l || void 0, "data-selected": m.isSelected || void 0, "data-selection-start": x || void 0, "data-selection-end": v || void 0, "data-invalid": m.isInvalid || void 0, "data-today": s || void 0 }, B = oe(a, { global: true });
  return S.createElement("td", { ...f, ref: r }, S.createElement(de.div, { ...Y(B, $, h, b, E, g), ref: d }));
}), D4 = c.createContext(null), Do = { badInput: false, customError: false, patternMismatch: false, rangeOverflow: false, rangeUnderflow: false, stepMismatch: false, tooLong: false, tooShort: false, typeMismatch: false, valueMissing: false, valid: true }, go = { ...Do, customError: true, valid: false }, gt = { isInvalid: false, validationDetails: Do, validationErrors: [] }, g4 = c.createContext({}), Tr = "__reactAriaFormValidationState";
function vo(e) {
  if (e[Tr]) {
    let { realtimeValidation: t, displayValidation: a, updateValidation: r, resetValidation: n, commitValidation: u } = e[Tr];
    return { realtimeValidation: t, displayValidation: a, updateValidation: r, resetValidation: n, commitValidation: u };
  }
  return v4(e);
}
function v4(e) {
  let { isInvalid: t, validationState: a, name: r, value: n, builtinValidation: u, validate: i, validationBehavior: o = "aria" } = e;
  a && (t || (t = a === "invalid"));
  let l = t !== void 0 ? { isInvalid: t, validationErrors: [], validationDetails: go } : null, s = c.useMemo(() => {
    if (!i || n == null) return null;
    let L = x4(i, n);
    return nu(L);
  }, [i, n]);
  (u == null ? void 0 : u.validationDetails.valid) && (u = void 0);
  let d = c.useContext(g4), f = c.useMemo(() => r ? Array.isArray(r) ? r.flatMap((L) => Ar(d[L])) : Ar(d[r]) : [], [d, r]), [$, m] = c.useState(d), [b, p] = c.useState(false);
  d !== $ && (m(d), p(false));
  let h = c.useMemo(() => nu(b ? [] : f), [b, f]), y = c.useRef(gt), [x, v] = c.useState(gt), g = c.useRef(gt), E = () => {
    if (!B) return;
    A(false);
    let L = s || u || y.current;
    rr(L, g.current) || (g.current = L, v(L));
  }, [B, A] = c.useState(false);
  return c.useEffect(E), { realtimeValidation: l || h || s || u || gt, displayValidation: o === "native" ? l || h || x : l || h || s || u || x, updateValidation(L) {
    o === "aria" && !rr(x, L) ? v(L) : y.current = L;
  }, resetValidation() {
    let L = gt;
    rr(L, g.current) || (g.current = L, v(L)), o === "native" && A(false), p(true);
  }, commitValidation() {
    o === "native" && A(true), p(true);
  } };
}
function Ar(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
function x4(e, t) {
  if (typeof e == "function") {
    let a = e(t);
    if (a && typeof a != "boolean") return Ar(a);
  }
  return [];
}
function nu(e) {
  return e.length ? { isInvalid: true, validationErrors: e, validationDetails: go } : null;
}
function rr(e, t) {
  return e === t ? true : !!e && !!t && e.isInvalid === t.isInvalid && e.validationErrors.length === t.validationErrors.length && e.validationErrors.every((a, r) => a === t.validationErrors[r]) && Object.entries(e.validationDetails).every(([a, r]) => t.validationDetails[a] === r);
}
const E4 = c.createContext(null);
function xo(e) {
  let { description: t, errorMessage: a, isInvalid: r, validationState: n } = e, { labelProps: u, fieldProps: i } = Kc(e), o = Bt([!!t, !!a, r, n]), l = Bt([!!t, !!a, r, n]);
  return i = Y(i, { "aria-describedby": [o, l, e["aria-describedby"]].filter(Boolean).join(" ") || void 0 }), { labelProps: u, fieldProps: i, descriptionProps: { id: o }, errorMessageProps: { id: l } };
}
function C4(e, t, a) {
  let r = ne((n) => {
    a && !n.defaultPrevented && a(t);
  });
  c.useEffect(() => {
    var _a2;
    let n = (_a2 = e == null ? void 0 : e.current) == null ? void 0 : _a2.form;
    return n == null ? void 0 : n.addEventListener("reset", r), () => {
      n == null ? void 0 : n.removeEventListener("reset", r);
    };
  }, [e]);
}
function w4(e, t, a) {
  let { validationBehavior: r, focus: n } = e;
  Z(() => {
    if (r === "native" && (a == null ? void 0 : a.current) && "setCustomValidity" in a.current && !a.current.disabled) {
      let s = t.realtimeValidation.isInvalid ? t.realtimeValidation.validationErrors.join(" ") || "Invalid value." : "";
      a.current.setCustomValidity(s), a.current.hasAttribute("title") || (a.current.title = ""), t.realtimeValidation.isInvalid || t.updateValidation(S4(a.current));
    }
  });
  let u = c.useRef(false), i = ne(() => {
    u.current || t.resetValidation();
  }), o = ne((s) => {
    var _a2, _b;
    t.displayValidation.isInvalid || t.commitValidation();
    let d = (_a2 = a == null ? void 0 : a.current) == null ? void 0 : _a2.form;
    !s.defaultPrevented && a && d && B4(d) === a.current && (n ? n() : (_b = a.current) == null ? void 0 : _b.focus(), tc("keyboard")), s.preventDefault();
  }), l = ne(() => {
    t.commitValidation();
  });
  c.useEffect(() => {
    let s = a == null ? void 0 : a.current;
    if (!s) return;
    let d = s.form, f = d == null ? void 0 : d.reset;
    return d && (d.reset = () => {
      u.current = !window.event || window.event.type === "message" && V(window.event) instanceof MessagePort, f == null ? void 0 : f.call(d), u.current = false;
    }), s.addEventListener("invalid", o), s.addEventListener("change", l), d == null ? void 0 : d.addEventListener("reset", i), () => {
      s.removeEventListener("invalid", o), s.removeEventListener("change", l), d == null ? void 0 : d.removeEventListener("reset", i), d && (d.reset = f);
    };
  }, [a, r]);
}
function P4(e) {
  let t = e.validity;
  return { badInput: t.badInput, customError: t.customError, patternMismatch: t.patternMismatch, rangeOverflow: t.rangeOverflow, rangeUnderflow: t.rangeUnderflow, stepMismatch: t.stepMismatch, tooLong: t.tooLong, tooShort: t.tooShort, typeMismatch: t.typeMismatch, valueMissing: t.valueMissing, valid: t.valid };
}
function S4(e) {
  return { isInvalid: !e.validity.valid, validationDetails: P4(e), validationErrors: e.validationMessage ? [e.validationMessage] : [] };
}
function B4(e) {
  var _a2;
  for (let t = 0; t < e.elements.length; t++) {
    let a = e.elements[t];
    if (((_a2 = a.validity) == null ? void 0 : _a2.valid) === false) return a;
  }
  return null;
}
const Ma = c.createContext({}), F4 = c.forwardRef(function(t, a) {
  [t, a] = Ce(t, a, Ma);
  let { isDisabled: r, isInvalid: n, isReadOnly: u, onHoverStart: i, onHoverChange: o, onHoverEnd: l, ...s } = t;
  r ?? (r = !!t["aria-disabled"] && t["aria-disabled"] !== "false"), n ?? (n = !!t["aria-invalid"] && t["aria-invalid"] !== "false");
  let { hoverProps: d, isHovered: f } = Ht({ onHoverStart: i, onHoverChange: o, onHoverEnd: l, isDisabled: r }), { isFocused: $, isFocusVisible: m, focusProps: b } = yt({ within: true }), p = Te({ ...t, values: { isHovered: f, isFocusWithin: $, isFocusVisible: m, isDisabled: r, isInvalid: n }, defaultClassName: "react-aria-Group" });
  return S.createElement(de.div, { ...Y(s, b, d), ...p, ref: a, role: t.role ?? "group", slot: t.slot ?? void 0, "data-focus-within": $ || void 0, "data-hovered": f || void 0, "data-focus-visible": m || void 0, "data-disabled": r || void 0, "data-invalid": n || void 0, "data-readonly": u || void 0 }, p.children);
}), Eo = c.createContext({});
let R4 = (e) => {
  let { onHoverStart: t, onHoverChange: a, onHoverEnd: r, ...n } = e;
  return n;
};
const T4 = Wr(function(t, a) {
  [t, a] = Ce(t, a, Eo);
  let { hoverProps: r, isHovered: n } = Ht({ ...t, isDisabled: t.disabled }), { isFocused: u, isFocusVisible: i, focusProps: o } = yt({ isTextInput: true, autoFocus: t.autoFocus }), l = !!t["aria-invalid"] && t["aria-invalid"] !== "false", s = Te({ ...t, values: { isHovered: n, isFocused: u, isFocusVisible: i, isDisabled: t.disabled || false, isInvalid: l }, defaultClassName: "react-aria-Input" });
  return S.createElement(de.input, { ...Y(R4(t), o, r), ...s, ref: a, "data-focused": u || void 0, "data-disabled": t.disabled || void 0, "data-hovered": n || void 0, "data-focus-visible": i || void 0, "data-invalid": l || void 0 });
});
var Co = {};
Co = { Empty: "\u0641\u0627\u0631\u063A" };
var wo = {};
wo = { Empty: "\u0418\u0437\u043F\u0440\u0430\u0437\u043D\u0438" };
var Po = {};
Po = { Empty: "Pr\xE1zdn\xE9" };
var So = {};
So = { Empty: "Tom" };
var Bo = {};
Bo = { Empty: "Leer" };
var Fo = {};
Fo = { Empty: "\u0386\u03B4\u03B5\u03B9\u03BF" };
var Ro = {};
Ro = { Empty: "Empty" };
var To = {};
To = { Empty: "Vac\xEDo" };
var Ao = {};
Ao = { Empty: "T\xFChjenda" };
var ko = {};
ko = { Empty: "Tyhj\xE4" };
var Mo = {};
Mo = { Empty: "Vide" };
var Io = {};
Io = { Empty: "\u05E8\u05D9\u05E7" };
var No = {};
No = { Empty: "Prazno" };
var Lo = {};
Lo = { Empty: "\xDCres" };
var Vo = {};
Vo = { Empty: "Vuoto" };
var Oo = {};
Oo = { Empty: "\u7A7A" };
var Ho = {};
Ho = { Empty: "\uBE44\uC5B4 \uC788\uC74C" };
var Uo = {};
Uo = { Empty: "Tu\u0161\u010Dias" };
var zo = {};
zo = { Empty: "Tuk\u0161s" };
var jo = {};
jo = { Empty: "Tom" };
var Ko = {};
Ko = { Empty: "Leeg" };
var _o = {};
_o = { Empty: "Pusty" };
var Wo = {};
Wo = { Empty: "Vazio" };
var Zo = {};
Zo = { Empty: "Vazio" };
var Go = {};
Go = { Empty: "Gol" };
var Yo = {};
Yo = { Empty: "\u041D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E" };
var Jo = {};
Jo = { Empty: "Pr\xE1zdne" };
var qo = {};
qo = { Empty: "Prazen" };
var Qo = {};
Qo = { Empty: "Prazno" };
var Xo = {};
Xo = { Empty: "Tomt" };
var el = {};
el = { Empty: "Bo\u015F" };
var tl = {};
tl = { Empty: "\u041F\u0443\u0441\u0442\u043E" };
var al = {};
al = { Empty: "\u7A7A" };
var rl = {};
rl = { Empty: "\u7A7A\u767D" };
var nl = {};
nl = { "ar-AE": Co, "bg-BG": wo, "cs-CZ": Po, "da-DK": So, "de-DE": Bo, "el-GR": Fo, "en-US": Ro, "es-ES": To, "et-EE": Ao, "fi-FI": ko, "fr-FR": Mo, "he-IL": Io, "hr-HR": No, "hu-HU": Lo, "it-IT": Vo, "ja-JP": Oo, "ko-KR": Ho, "lt-LT": Uo, "lv-LV": zo, "nb-NO": jo, "nl-NL": Ko, "pl-PL": _o, "pt-BR": Wo, "pt-PT": Zo, "ro-RO": Go, "ru-RU": Yo, "sk-SK": Jo, "sl-SI": qo, "sr-SP": Qo, "sv-SE": Xo, "tr-TR": el, "uk-UA": tl, "zh-CN": al, "zh-TW": rl };
function A4(e) {
  return e && e.__esModule ? e.default : e;
}
const uu = () => {
};
function k4(e) {
  const t = c.useRef(void 0);
  let { value: a, textValue: r, minValue: n, maxValue: u, isDisabled: i, isReadOnly: o, isRequired: l, onIncrement: s, onIncrementPage: d, onDecrement: f, onDecrementPage: $, onDecrementToMin: m, onIncrementToMax: b } = e;
  const p = Oe(A4(nl), "@react-aria/spinbutton");
  let h = c.useRef(false);
  const y = c.useCallback(() => {
    clearTimeout(t.current), h.current = false;
  }, []), x = ne(() => {
    y();
  });
  c.useEffect(() => () => x(), []);
  let { keyboardProps: v } = Qe({ isDisabled: i || o, shortcuts: { PageUp: () => {
    if (d) {
      d();
      return;
    }
    if (s) {
      s();
      return;
    }
    return false;
  }, ArrowUp: () => {
    if (s) {
      s();
      return;
    }
    return false;
  }, PageDown: () => {
    if ($) {
      $();
      return;
    }
    if (f) {
      f();
      return;
    }
    return false;
  }, ArrowDown: () => {
    if (f) {
      f();
      return;
    }
    return false;
  }, Home: () => {
    if (m) {
      m();
      return;
    }
    return false;
  }, End: () => {
    if (b) {
      b();
      return;
    }
    return false;
  } }, allowRepeats: true }), g = c.useRef(false), E = () => {
    g.current = true;
  }, B = () => {
    g.current = false;
  }, A = r === "" ? p.format("Empty") : (r || `${a}`).replace("-", "\u2212");
  c.useEffect(() => {
    g.current && (Qc("assertive"), Tt(A, "assertive"));
  }, [A]);
  let k = c.useCallback(() => {
    y();
  }, [y]);
  const M = ne(s ?? uu), L = ne(f ?? uu), C = ne(() => {
    (u === void 0 || isNaN(u) || a === void 0 || isNaN(a) || a < u) && (M(), N(60));
  }), N = ne((H) => {
    x(), h.current = true, t.current = window.setTimeout(C, H);
  }), Q = ne(() => {
    (n === void 0 || isNaN(n) || a === void 0 || isNaN(a) || a > n) && (L(), D(60));
  }), D = ne((H) => {
    x(), h.current = true, t.current = window.setTimeout(Q, H);
  });
  let I = (H) => {
    H.preventDefault();
  }, { addGlobalListener: U, removeAllGlobalListeners: w } = wa(), j = c.useRef(false), [P, R] = c.useState(null);
  c.useEffect(() => {
    P === "touch" ? N(600) : P ? N(400) : P || x();
  }, [P]);
  let [O, K] = c.useState(null);
  return c.useEffect(() => {
    O === "touch" ? D(600) : O ? D(400) : O || x();
  }, [O]), { spinButtonProps: { role: "spinbutton", "aria-valuenow": a !== void 0 && !isNaN(a) ? a : void 0, "aria-valuetext": A, "aria-valuemin": n, "aria-valuemax": u, "aria-disabled": i || void 0, "aria-readonly": o || void 0, "aria-required": l || void 0, ...v, onFocus: E, onBlur: B }, incrementButtonProps: { onPressStart: (H) => {
    y(), H.pointerType !== "touch" ? (s == null ? void 0 : s(), R("mouse")) : (U(window, "pointercancel", k, { capture: true }), j.current = false, R("touch")), U(window, "contextmenu", I);
  }, onPressUp: (H) => {
    y(), H.pointerType === "touch" && (j.current = true), w(), R(null);
  }, onPressEnd: (H) => {
    y(), H.pointerType === "touch" && !h.current && j.current && (s == null ? void 0 : s()), j.current = false, R(null);
  }, onFocus: E, onBlur: B }, decrementButtonProps: { onPressStart: (H) => {
    y(), H.pointerType !== "touch" ? (f == null ? void 0 : f(), K("mouse")) : (U(window, "pointercancel", k, { capture: true }), j.current = false, K("touch"));
  }, onPressUp: (H) => {
    y(), H.pointerType === "touch" && (j.current = true), w(), K(null);
  }, onPressEnd: (H) => {
    y(), H.pointerType === "touch" && !h.current && j.current && (f == null ? void 0 : f()), j.current = false, K(null);
  }, onFocus: E, onBlur: B } };
}
class M4 {
  constructor(t, a, r, n) {
    this._walkerStack = [], this._currentSetFor = /* @__PURE__ */ new Set(), this._acceptNode = (i) => {
      var _a2;
      if (i.nodeType === Node.ELEMENT_NODE) {
        const o = i.shadowRoot;
        if (o) {
          const l = this._doc.createTreeWalker(o, this.whatToShow, { acceptNode: this._acceptNode });
          return this._walkerStack.unshift(l), NodeFilter.FILTER_ACCEPT;
        } else {
          if (typeof this.filter == "function") return this.filter(i);
          if ((_a2 = this.filter) == null ? void 0 : _a2.acceptNode) return this.filter.acceptNode(i);
          if (this.filter === null) return NodeFilter.FILTER_ACCEPT;
        }
      }
      return NodeFilter.FILTER_SKIP;
    }, this._doc = t, this.root = a, this.filter = n ?? null, this.whatToShow = r ?? NodeFilter.SHOW_ALL, this._currentNode = a, this._walkerStack.unshift(t.createTreeWalker(a, r, this._acceptNode));
    const u = a.shadowRoot;
    if (u) {
      const i = this._doc.createTreeWalker(u, this.whatToShow, { acceptNode: this._acceptNode });
      this._walkerStack.unshift(i);
    }
  }
  get currentNode() {
    return this._currentNode;
  }
  set currentNode(t) {
    if (!_(this.root, t)) throw new Error("Cannot set currentNode to a node that is not contained by the root node.");
    const a = [];
    let r = t, n = t;
    for (this._currentNode = t; r && r !== this.root; ) if (r.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      const i = r, o = this._doc.createTreeWalker(i, this.whatToShow, { acceptNode: this._acceptNode });
      a.push(o), o.currentNode = n, this._currentSetFor.add(o), r = n = i.host;
    } else r = r.parentNode;
    const u = this._doc.createTreeWalker(this.root, this.whatToShow, { acceptNode: this._acceptNode });
    a.push(u), u.currentNode = n, this._currentSetFor.add(u), this._walkerStack = a;
  }
  get doc() {
    return this._doc;
  }
  firstChild() {
    let t = this.currentNode, a = this.nextNode();
    return _(t, a) ? (a && (this.currentNode = a), a) : (this.currentNode = t, null);
  }
  lastChild() {
    let a = this._walkerStack[0].lastChild();
    return a && (this.currentNode = a), a;
  }
  nextNode() {
    var _a2;
    const t = this._walkerStack[0].nextNode();
    if (t) {
      if (t.shadowRoot) {
        let r;
        if (typeof this.filter == "function" ? r = this.filter(t) : ((_a2 = this.filter) == null ? void 0 : _a2.acceptNode) && (r = this.filter.acceptNode(t)), r === NodeFilter.FILTER_ACCEPT) return this.currentNode = t, t;
        let n = this.nextNode();
        return n && (this.currentNode = n), n;
      }
      return t && (this.currentNode = t), t;
    } else if (this._walkerStack.length > 1) {
      this._walkerStack.shift();
      let a = this.nextNode();
      return a && (this.currentNode = a), a;
    } else return null;
  }
  previousNode() {
    var _a2;
    const t = this._walkerStack[0];
    if (t.currentNode === t.root) {
      if (this._currentSetFor.has(t)) if (this._currentSetFor.delete(t), this._walkerStack.length > 1) {
        this._walkerStack.shift();
        let r = this.previousNode();
        return r && (this.currentNode = r), r;
      } else return null;
      return null;
    }
    const a = t.previousNode();
    if (a) {
      if (a.shadowRoot) {
        let n;
        if (typeof this.filter == "function" ? n = this.filter(a) : ((_a2 = this.filter) == null ? void 0 : _a2.acceptNode) && (n = this.filter.acceptNode(a)), n === NodeFilter.FILTER_ACCEPT) return a && (this.currentNode = a), a;
        let u = this.lastChild();
        return u && (this.currentNode = u), u;
      }
      return a && (this.currentNode = a), a;
    } else if (this._walkerStack.length > 1) {
      this._walkerStack.shift();
      let r = this.previousNode();
      return r && (this.currentNode = r), r;
    } else return null;
  }
  nextSibling() {
    return null;
  }
  previousSibling() {
    return null;
  }
  parentNode() {
    return null;
  }
}
function ul(e, t, a, r) {
  return ve() ? new M4(e, t, a, r) : e.createTreeWalker(t, a, r);
}
const iu = S.createContext(null), kr = "react-aria-focus-scope-restore";
let X = null;
function I4(e) {
  let { children: t, contain: a, restoreFocus: r, autoFocus: n } = e, u = c.useRef(null), i = c.useRef(null), o = c.useRef([]), { parentNode: l } = c.useContext(iu) || {}, s = c.useMemo(() => new Ir({ scopeRef: o }), [o]);
  Z(() => {
    let $ = l || re.root;
    if (re.getTreeNode($.scopeRef) && X && !Da(X, $.scopeRef)) {
      let m = re.getTreeNode(X);
      m && ($ = m);
    }
    $.addChild(s), re.addNode(s);
  }, [s, l]), Z(() => {
    let $ = re.getTreeNode(o);
    $ && ($.contain = !!a);
  }, [a]), Z(() => {
    var _a2;
    let $ = (_a2 = u.current) == null ? void 0 : _a2.nextSibling, m = [], b = (p) => p.stopPropagation();
    for (; $ && $ !== i.current; ) m.push($), $.addEventListener(kr, b), $ = $.nextSibling;
    return o.current = m, () => {
      for (let p of m) p.removeEventListener(kr, b);
    };
  }, [t]), z4(o, r, a), O4(o, a), j4(o, r, a), U4(o, n), c.useEffect(() => {
    const $ = q(W(o.current ? o.current[0] : void 0));
    let m = null;
    if (pe($, o.current)) {
      for (let b of re.traverse()) b.scopeRef && pe($, b.scopeRef.current) && (m = b);
      m === re.getTreeNode(o) && (X = m.scopeRef);
    }
  }, [o]), Z(() => () => {
    var _a2, _b;
    let $ = ((_b = (_a2 = re.getTreeNode(o)) == null ? void 0 : _a2.parent) == null ? void 0 : _b.scopeRef) ?? null;
    (o === X || Da(o, X)) && (!$ || re.getTreeNode($)) && (X = $), re.removeTreeNode(o);
  }, [o]);
  let d = c.useMemo(() => N4(o), []), f = c.useMemo(() => ({ focusManager: d, parentNode: s }), [s, d]);
  return S.createElement(iu.Provider, { value: f }, S.createElement("span", { "data-focus-scope-start": true, hidden: true, ref: u }), t, S.createElement("span", { "data-focus-scope-end": true, hidden: true, ref: i }));
}
function N4(e) {
  return { focusNext(t = {}) {
    let a = e.current, { from: r, tabbable: n, wrap: u, accept: i } = t, o = r || q(W(a[0] ?? void 0)), l = a[0].previousElementSibling, s = We(a), d = fe(s, { tabbable: n, accept: i }, a);
    d.currentNode = pe(o, a) ? o : l;
    let f = d.nextNode();
    return !f && u && (d.currentNode = l, f = d.nextNode()), f && ue(f, true), f;
  }, focusPrevious(t = {}) {
    let a = e.current, { from: r, tabbable: n, wrap: u, accept: i } = t, o = r || q(W(a[0] ?? void 0)), l = a[a.length - 1].nextElementSibling, s = We(a), d = fe(s, { tabbable: n, accept: i }, a);
    d.currentNode = pe(o, a) ? o : l;
    let f = d.previousNode();
    return !f && u && (d.currentNode = l, f = d.previousNode()), f && ue(f, true), f;
  }, focusFirst(t = {}) {
    let a = e.current, { tabbable: r, accept: n } = t, u = We(a), i = fe(u, { tabbable: r, accept: n }, a);
    i.currentNode = a[0].previousElementSibling;
    let o = i.nextNode();
    return o && ue(o, true), o;
  }, focusLast(t = {}) {
    let a = e.current, { tabbable: r, accept: n } = t, u = We(a), i = fe(u, { tabbable: r, accept: n }, a);
    i.currentNode = a[a.length - 1].nextElementSibling;
    let o = i.previousNode();
    return o && ue(o, true), o;
  } };
}
function We(e) {
  return e[0].parentElement;
}
function Ct(e) {
  let t = re.getTreeNode(X);
  for (; t && t.scopeRef !== e; ) {
    if (t.contain) return false;
    t = t.parent;
  }
  return true;
}
function L4(e) {
  if (!e.form) return Array.from(W(e).querySelectorAll(`input[type="radio"][name="${CSS.escape(e.name)}"]`)).filter((r) => !r.form);
  const t = e.form.elements.namedItem(e.name);
  let a = ie(e);
  return t instanceof a.RadioNodeList ? Array.from(t).filter((r) => r instanceof a.HTMLInputElement) : t instanceof a.HTMLInputElement ? [t] : [];
}
function V4(e) {
  if (e.checked) return true;
  const t = L4(e);
  return t.length > 0 && !t.some((a) => a.checked);
}
function O4(e, t) {
  let a = c.useRef(void 0), r = c.useRef(void 0);
  Z(() => {
    let n = e.current;
    if (!t) {
      r.current && (cancelAnimationFrame(r.current), r.current = void 0);
      return;
    }
    const u = W(n ? n[0] : void 0);
    let i = (s) => {
      if (s.key !== "Tab" || s.altKey || s.ctrlKey || s.metaKey || !Ct(e) || s.isComposing) return;
      let d = q(u), f = e.current;
      if (!f || !pe(d, f)) return;
      let $ = We(f), m = fe($, { tabbable: true }, f);
      if (!d) return;
      m.currentNode = d;
      let b = s.shiftKey ? m.previousNode() : m.nextNode();
      b || (m.currentNode = s.shiftKey ? f[f.length - 1].nextElementSibling : f[0].previousElementSibling, b = s.shiftKey ? m.previousNode() : m.nextNode()), s.preventDefault(), b && (ue(b, true), b instanceof ie(b).HTMLInputElement && b.select());
    }, o = (s) => {
      (!X || Da(X, e)) && pe(V(s), e.current) ? (X = e, a.current = V(s)) : Ct(e) && !Le(V(s), e) ? a.current ? ue(a.current) : X && X.current && Mr(X.current) : Ct(e) && (a.current = V(s));
    }, l = (s) => {
      r.current && cancelAnimationFrame(r.current), r.current = requestAnimationFrame(() => {
        let d = Ca(), f = (d === "virtual" || d === null) && sa() && Mu(), $ = q(u);
        if (!f && $ && Ct(e) && !Le($, e)) {
          X = e;
          let m = V(s);
          m && m.isConnected ? (a.current = m, ue(a.current)) : X.current && Mr(X.current);
        }
      });
    };
    return u.addEventListener("keydown", i, false), u.addEventListener("focusin", o, false), n == null ? void 0 : n.forEach((s) => s.addEventListener("focusin", o, false)), n == null ? void 0 : n.forEach((s) => s.addEventListener("focusout", l, false)), () => {
      u.removeEventListener("keydown", i, false), u.removeEventListener("focusin", o, false), n == null ? void 0 : n.forEach((s) => s.removeEventListener("focusin", o, false)), n == null ? void 0 : n.forEach((s) => s.removeEventListener("focusout", l, false));
    };
  }, [e, t]), Z(() => () => {
    r.current && cancelAnimationFrame(r.current);
  }, [r]);
}
function il(e) {
  return Le(e);
}
function pe(e, t) {
  return !e || !t ? false : t.some((a) => _(a, e));
}
function Le(e, t = null) {
  if (e instanceof Element && e.closest("[data-react-aria-top-layer]")) return true;
  for (let { scopeRef: a } of re.traverse(re.getTreeNode(t))) if (a && pe(e, a.current)) return true;
  return false;
}
function H4(e) {
  return Le(e, X);
}
function Da(e, t) {
  var _a2;
  let a = (_a2 = re.getTreeNode(t)) == null ? void 0 : _a2.parent;
  for (; a; ) {
    if (a.scopeRef === e) return true;
    a = a.parent;
  }
  return false;
}
function ue(e, t = false) {
  if (e != null && !t) try {
    Rt(e);
  } catch {
  }
  else if (e != null) try {
    e.focus();
  } catch {
  }
}
function ol(e, t = true) {
  let a = e[0].previousElementSibling, r = We(e), n = fe(r, { tabbable: t }, e);
  n.currentNode = a;
  let u = n.nextNode();
  return t && !u && (r = We(e), n = fe(r, { tabbable: false }, e), n.currentNode = a, u = n.nextNode()), u;
}
function Mr(e, t = true) {
  ue(ol(e, t));
}
function U4(e, t) {
  const a = S.useRef(t);
  c.useEffect(() => {
    if (a.current) {
      X = e;
      const r = W(e.current ? e.current[0] : void 0);
      !pe(q(r), X.current) && e.current && Mr(e.current);
    }
    a.current = false;
  }, [e]);
}
function z4(e, t, a) {
  Z(() => {
    if (t || a) return;
    let r = e.current;
    const n = W(r ? r[0] : void 0);
    let u = (i) => {
      let o = V(i);
      pe(o, e.current) ? X = e : il(o) || (X = null);
    };
    return n.addEventListener("focusin", u, false), r == null ? void 0 : r.forEach((i) => i.addEventListener("focusin", u, false)), () => {
      n.removeEventListener("focusin", u, false), r == null ? void 0 : r.forEach((i) => i.removeEventListener("focusin", u, false));
    };
  }, [e, t, a]);
}
function ou(e) {
  let t = re.getTreeNode(X);
  for (; t && t.scopeRef !== e; ) {
    if (t.nodeToRestore) return false;
    t = t.parent;
  }
  return (t == null ? void 0 : t.scopeRef) === e;
}
function j4(e, t, a) {
  const r = c.useRef(typeof document < "u" ? q(W(e.current ? e.current[0] : void 0)) : null);
  Z(() => {
    let n = e.current;
    const u = W(n ? n[0] : void 0);
    if (!t || a) return;
    let i = () => {
      (!X || Da(X, e)) && pe(q(u), e.current) && (X = e);
    };
    return u.addEventListener("focusin", i, false), n == null ? void 0 : n.forEach((o) => o.addEventListener("focusin", i, false)), () => {
      u.removeEventListener("focusin", i, false), n == null ? void 0 : n.forEach((o) => o.removeEventListener("focusin", i, false));
    };
  }, [e, a]), Z(() => {
    const n = W(e.current ? e.current[0] : void 0);
    if (!t) return;
    let u = (i) => {
      if (i.key !== "Tab" || i.altKey || i.ctrlKey || i.metaKey || !Ct(e) || i.isComposing) return;
      let o = n.activeElement;
      if (!Le(o, e) || !ou(e)) return;
      let l = re.getTreeNode(e);
      if (!l) return;
      let s = l.nodeToRestore, d = fe(n.body, { tabbable: true });
      d.currentNode = o;
      let f = i.shiftKey ? d.previousNode() : d.nextNode();
      if ((!s || !s.isConnected || s === n.body) && (s = void 0, l.nodeToRestore = void 0), (!f || !Le(f, e)) && s) {
        d.currentNode = s;
        do
          f = i.shiftKey ? d.previousNode() : d.nextNode();
        while (Le(f, e));
        i.preventDefault(), i.stopPropagation(), f ? ue(f, true) : il(s) ? ue(s, true) : o.blur();
      }
    };
    return a || n.addEventListener("keydown", u, true), () => {
      a || n.removeEventListener("keydown", u, true);
    };
  }, [e, t, a]), Z(() => {
    const n = W(e.current ? e.current[0] : void 0);
    if (!t) return;
    let u = re.getTreeNode(e);
    if (u) return u.nodeToRestore = r.current ?? void 0, () => {
      let i = re.getTreeNode(e);
      if (!i) return;
      let o = i.nodeToRestore, l = q(n);
      if (t && o && (l && Le(l, e) || l === n.body && ou(e))) {
        let s = re.clone();
        requestAnimationFrame(() => {
          if (n.activeElement === n.body) {
            let d = s.getTreeNode(e);
            for (; d; ) {
              if (d.nodeToRestore && d.nodeToRestore.isConnected) {
                lu(d.nodeToRestore);
                return;
              }
              d = d.parent;
            }
            for (d = s.getTreeNode(e); d; ) {
              if (d.scopeRef && d.scopeRef.current && re.getTreeNode(d.scopeRef)) {
                let f = ol(d.scopeRef.current, true);
                lu(f);
                return;
              }
              d = d.parent;
            }
          }
        });
      }
    };
  }, [e, t]);
}
function lu(e) {
  e.dispatchEvent(new CustomEvent(kr, { bubbles: true, cancelable: true })) && ue(e);
}
function fe(e, t, a) {
  let r = (t == null ? void 0 : t.tabbable) ? Zd : Fu, n = (e == null ? void 0 : e.nodeType) === Node.ELEMENT_NODE ? e : null, u = W(n), i = ul(u, e || u, NodeFilter.SHOW_ELEMENT, { acceptNode(o) {
    return _(t == null ? void 0 : t.from, o) || (t == null ? void 0 : t.tabbable) && o.tagName === "INPUT" && o.getAttribute("type") === "radio" && (!V4(o) || i.currentNode.tagName === "INPUT" && i.currentNode.type === "radio" && i.currentNode.name === o.name) ? NodeFilter.FILTER_REJECT : r(o) && (!a || pe(o, a)) && (!(t == null ? void 0 : t.accept) || t.accept(o)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  return (t == null ? void 0 : t.from) && (i.currentNode = t.from), i;
}
function mn(e, t = {}) {
  return { focusNext(a = {}) {
    let r = e.current;
    if (!r) return null;
    let { from: n, tabbable: u = t.tabbable, wrap: i = t.wrap, accept: o = t.accept } = a, l = n || q(W(r)), s = fe(r, { tabbable: u, accept: o });
    _(r, l) && (s.currentNode = l);
    let d = s.nextNode();
    return !d && i && (s.currentNode = r, d = s.nextNode()), d && ue(d, true), d;
  }, focusPrevious(a = t) {
    let r = e.current;
    if (!r) return null;
    let { from: n, tabbable: u = t.tabbable, wrap: i = t.wrap, accept: o = t.accept } = a, l = n || q(W(r)), s = fe(r, { tabbable: u, accept: o });
    if (_(r, l)) s.currentNode = l;
    else {
      let f = nr(s);
      return f && ue(f, true), f ?? null;
    }
    let d = s.previousNode();
    if (!d && i) {
      s.currentNode = r;
      let f = nr(s);
      if (!f) return null;
      d = f;
    }
    return d && ue(d, true), d ?? null;
  }, focusFirst(a = t) {
    let r = e.current;
    if (!r) return null;
    let { tabbable: n = t.tabbable, accept: u = t.accept } = a, o = fe(r, { tabbable: n, accept: u }).nextNode();
    return o && ue(o, true), o;
  }, focusLast(a = t) {
    let r = e.current;
    if (!r) return null;
    let { tabbable: n = t.tabbable, accept: u = t.accept } = a, i = fe(r, { tabbable: n, accept: u }), o = nr(i);
    return o && ue(o, true), o ?? null;
  } };
}
function nr(e) {
  let t, a;
  do
    a = e.lastChild(), a && (t = a);
  while (a);
  return t;
}
class $n {
  constructor() {
    this.fastMap = /* @__PURE__ */ new Map(), this.root = new Ir({ scopeRef: null }), this.fastMap.set(null, this.root);
  }
  get size() {
    return this.fastMap.size;
  }
  getTreeNode(t) {
    return this.fastMap.get(t);
  }
  addTreeNode(t, a, r) {
    let n = this.fastMap.get(a ?? null);
    if (!n) return;
    let u = new Ir({ scopeRef: t });
    n.addChild(u), u.parent = n, this.fastMap.set(t, u), r && (u.nodeToRestore = r);
  }
  addNode(t) {
    this.fastMap.set(t.scopeRef, t);
  }
  removeTreeNode(t) {
    if (t === null) return;
    let a = this.fastMap.get(t);
    if (!a) return;
    let r = a.parent;
    for (let u of this.traverse()) u !== a && a.nodeToRestore && u.nodeToRestore && a.scopeRef && a.scopeRef.current && pe(u.nodeToRestore, a.scopeRef.current) && (u.nodeToRestore = a.nodeToRestore);
    let n = a.children;
    r && (r.removeChild(a), n.size > 0 && n.forEach((u) => r && r.addChild(u))), this.fastMap.delete(a.scopeRef);
  }
  *traverse(t = this.root) {
    if (t.scopeRef != null && (yield t), t.children.size > 0) for (let a of t.children) yield* this.traverse(a);
  }
  clone() {
    var _a2;
    let t = new $n();
    for (let a of this.traverse()) t.addTreeNode(a.scopeRef, ((_a2 = a.parent) == null ? void 0 : _a2.scopeRef) ?? null, a.nodeToRestore);
    return t;
  }
}
class Ir {
  constructor(t) {
    this.children = /* @__PURE__ */ new Set(), this.contain = false, this.scopeRef = t.scopeRef;
  }
  addChild(t) {
    this.children.add(t), t.parent = this;
  }
  removeChild(t) {
    this.children.delete(t), t.parent = void 0;
  }
}
let re = new $n(), ur = /* @__PURE__ */ new Map();
function K4(e) {
  let { locale: t } = me(), a = t + (e ? Object.entries(e).sort((n, u) => n[0] < u[0] ? -1 : 1).join() : "");
  if (ur.has(a)) return ur.get(a);
  let r = new Intl.Collator(t, e);
  return ur.set(a, r), r;
}
const _4 = c.createContext({ placement: "bottom" }), W4 = typeof HTMLElement < "u" && "inert" in HTMLElement.prototype;
function su(e) {
  return e.dataset.liveAnnouncer === "true" || e.dataset.reactAriaTopLayer !== void 0;
}
let vt = /* @__PURE__ */ new WeakMap(), ce = [];
function Z4(e, t) {
  let a = ie(e == null ? void 0 : e[0]), r = t instanceof a.Element ? { root: t } : t, n = (r == null ? void 0 : r.root) ?? document.body, u = (r == null ? void 0 : r.shouldUseInert) && W4, i = new Set(e), o = /* @__PURE__ */ new Set(), l = (h) => u && h instanceof a.HTMLElement ? h.inert : h.getAttribute("aria-hidden") === "true", s = (h, y) => {
    u && h instanceof a.HTMLElement ? h.inert = y : y ? h.setAttribute("aria-hidden", "true") : (h.removeAttribute("aria-hidden"), h instanceof a.HTMLElement && (h.inert = false));
  }, d = /* @__PURE__ */ new Set();
  if (ve()) {
    let h = n.getRootNode();
    for (let y of e) {
      let x = y.getRootNode();
      for (; Hr(x) && x !== h; ) d.add(x), x = x.host.getRootNode();
    }
  }
  let f = (h) => {
    for (let g of h.querySelectorAll("[data-live-announcer], [data-react-aria-top-layer]")) i.add(g);
    let y = (g) => {
      if (o.has(g) || i.has(g) || g.parentElement && o.has(g.parentElement) && g.parentElement.getAttribute("role") !== "row") return NodeFilter.FILTER_REJECT;
      for (let E of i) if (_(g, E)) return NodeFilter.FILTER_SKIP;
      return NodeFilter.FILTER_ACCEPT;
    }, x = ul(W(h), h, NodeFilter.SHOW_ELEMENT, { acceptNode: y }), v = y(h);
    if (v === NodeFilter.FILTER_ACCEPT && $(h), v !== NodeFilter.FILTER_REJECT) {
      let g = x.nextNode();
      for (; g != null; ) $(g), g = x.nextNode();
    }
  }, $ = (h) => {
    let y = vt.get(h) ?? 0;
    l(h) && y === 0 || (y === 0 && s(h, true), o.add(h), vt.set(h, y + 1));
  };
  ce.length && ce[ce.length - 1].disconnect(), f(n);
  let m = new MutationObserver((h) => {
    for (let y of h) if (y.type === "childList") {
      if (y.target.isConnected && ![...i, ...o].some((x) => _(x, y.target))) for (let x of y.addedNodes) (x instanceof HTMLElement || x instanceof SVGElement) && su(x) ? i.add(x) : x instanceof Element && f(x);
      if (ve()) {
        for (let x of d) if (!x.isConnected) {
          m.disconnect();
          break;
        }
      }
    }
  });
  m.observe(n, { childList: true, subtree: true });
  let b = /* @__PURE__ */ new Set();
  if (ve()) for (let h of d) {
    let y = new MutationObserver((x) => {
      for (let v of x) if (v.type === "childList") {
        if (v.target.isConnected && ![...i, ...o].some((g) => _(g, v.target))) for (let g of v.addedNodes) (g instanceof HTMLElement || g instanceof SVGElement) && su(g) ? i.add(g) : g instanceof Element && f(g);
        if (ve()) {
          for (let g of d) if (!g.isConnected) {
            m.disconnect();
            break;
          }
        }
      }
    });
    y.observe(h, { childList: true, subtree: true }), b.add(y);
  }
  let p = { visibleNodes: i, hiddenNodes: o, observe() {
    m.observe(n, { childList: true, subtree: true });
  }, disconnect() {
    m.disconnect();
  } };
  return ce.push(p), () => {
    if (m.disconnect(), ve()) for (let h of b) h.disconnect();
    for (let h of o) {
      let y = vt.get(h);
      y != null && (y === 1 ? (s(h, false), vt.delete(h)) : vt.set(h, y - 1));
    }
    p === ce[ce.length - 1] ? (ce.pop(), ce.length && ce[ce.length - 1].observe()) : ce.splice(ce.indexOf(p), 1);
  };
}
function G4(e) {
  let t = ce[ce.length - 1];
  if (t && !t.visibleNodes.has(e)) return t.visibleNodes.add(e), () => {
    t.visibleNodes.delete(e);
  };
}
const be = { top: "top", bottom: "top", left: "left", right: "left" }, ga = { top: "bottom", bottom: "top", left: "right", right: "left" }, Y4 = { top: "left", left: "top" }, Nr = { top: "height", left: "width" }, ll = { width: "totalWidth", height: "totalHeight" }, Qt = {};
let J4 = () => typeof document < "u" ? window.visualViewport : null;
function du(e, t) {
  let a = 0, r = 0, n = 0, u = 0, i = 0, o = 0, l = {}, s = ((t == null ? void 0 : t.scale) ?? 1) > 1;
  if (e.tagName === "BODY" || e.tagName === "HTML") {
    let d = document.documentElement;
    n = d.clientWidth, u = d.clientHeight, a = (t == null ? void 0 : t.width) ?? n, r = (t == null ? void 0 : t.height) ?? u, l.top = d.scrollTop || e.scrollTop, l.left = d.scrollLeft || e.scrollLeft, t && (i = t.offsetTop, o = t.offsetLeft);
  } else ({ width: a, height: r, top: i, left: o } = Vt(e, false)), l.top = e.scrollTop, l.left = e.scrollLeft, n = a, u = r;
  return Ye() && (e.tagName === "BODY" || e.tagName === "HTML") && s && (l.top = 0, l.left = 0, i = (t == null ? void 0 : t.pageTop) ?? 0, o = (t == null ? void 0 : t.pageLeft) ?? 0), { width: a, height: r, totalWidth: n, totalHeight: u, scroll: l, top: i, left: o };
}
function q4(e) {
  return { top: e.scrollTop, left: e.scrollLeft, width: e.scrollWidth, height: e.scrollHeight };
}
function cu(e, t, a, r, n, u, i) {
  let o = n.scroll[e] ?? 0, l = r[Nr[e]], s = i[e] + r.scroll[be[e]] + u, d = i[e] + r.scroll[be[e]] + l - u, f = t - o + r.scroll[be[e]] + i[e] - r[be[e]], $ = t - o + a + r.scroll[be[e]] + i[e] - r[be[e]];
  return f < s ? s - f : $ > d ? Math.max(d - $, s - f) : 0;
}
function Q4(e) {
  let t = window.getComputedStyle(e);
  return { top: parseInt(t.marginTop, 10) || 0, bottom: parseInt(t.marginBottom, 10) || 0, left: parseInt(t.marginLeft, 10) || 0, right: parseInt(t.marginRight, 10) || 0 };
}
function fu(e) {
  if (Qt[e]) return Qt[e];
  let [t, a] = e.split(" "), r = be[t] || "right", n = Y4[r];
  be[a] || (a = "center");
  let u = Nr[r], i = Nr[n];
  return Qt[e] = { placement: t, crossPlacement: a, axis: r, crossAxis: n, size: u, crossSize: i }, Qt[e];
}
function ir(e, t, a, r, n, u, i, o, l, s, d) {
  let { placement: f, crossPlacement: $, axis: m, crossAxis: b, size: p, crossSize: h } = r, y = {};
  y[b] = e[b] ?? 0, $ === "center" ? y[b] += ((e[h] ?? 0) - (a[h] ?? 0)) / 2 : $ !== b && (y[b] += (e[h] ?? 0) - (a[h] ?? 0)), y[b] += u;
  const x = e[b] - a[h] + l + s, v = e[b] + e[h] - l - s;
  if (y[b] = gr(y[b], x, v), f === m) {
    let g = o ? d[p] : d[ll[p]];
    y[ga[m]] = Math.floor(g - e[m] + n);
  } else y[m] = Math.floor(e[m] + e[p] + n);
  return y;
}
function X4(e, t, a, r, n, u, i, o, l, s, d) {
  let f = (e.top != null ? e.top : l[ll.height] - (e.bottom ?? 0) - i) - (l.scroll.top ?? 0), $ = s ? a.top : 0, m = { top: Math.max(t.top + $, ((d == null ? void 0 : d.offsetTop) ?? t.top) + $), bottom: Math.min(t.top + t.height + $, ((d == null ? void 0 : d.offsetTop) ?? 0) + ((d == null ? void 0 : d.height) ?? 0)) };
  return o !== "top" ? Math.max(0, m.bottom - f - ((n.top ?? 0) + (n.bottom ?? 0) + u)) : Math.max(0, f + i - m.top - ((n.top ?? 0) + (n.bottom ?? 0) + u));
}
function mu(e, t, a, r, n, u, i, o) {
  let { placement: l, axis: s, size: d } = u;
  return l === s ? Math.max(0, a[s] - (i.scroll[s] ?? 0) - (e[s] + (o ? t[s] : 0)) - (r[s] ?? 0) - r[ga[s]] - n) : Math.max(0, e[d] + e[s] + (o ? t[s] : 0) - a[s] - a[d] + (i.scroll[s] ?? 0) - (r[s] ?? 0) - r[ga[s]] - n);
}
function e3(e, t, a, r, n, u, i, o, l, s, d, f, $, m, b, p, h, y) {
  let x = fu(e), { size: v, crossAxis: g, crossSize: E, placement: B, crossPlacement: A } = x, k = ir(t, o, a, x, d, f, s, $, b, p, l), M = d, L = mu(o, s, t, n, u + d, x, l, h);
  if (i && a[v] > L) {
    let G = fu(`${ga[B]} ${A}`), J = ir(t, o, a, G, d, f, s, $, b, p, l);
    mu(o, s, t, n, u + d, G, l, h) > L && (x = G, k = J, M = d);
  }
  let C = "bottom";
  x.axis === "top" ? x.placement === "top" ? C = "top" : x.placement === "bottom" && (C = "bottom") : x.crossAxis === "top" && (x.crossPlacement === "top" ? C = "bottom" : x.crossPlacement === "bottom" && (C = "top"));
  let N = cu(g, k[g], a[E], o, l, u, s);
  k[g] += N;
  let Q = X4(k, o, s, $, n, u, a.height, C, l, h, y);
  m && m < Q && (Q = m), a.height = Math.min(a.height, Q), k = ir(t, o, a, x, M, f, s, $, b, p, l), N = cu(g, k[g], a[E], o, l, u, s), k[g] += N;
  let D = {}, I = t[g] - k[g] - n[be[g]], U = I + 0.5 * t[E];
  const w = b / 2 + p, j = be[g] === "left" ? (n.left ?? 0) + (n.right ?? 0) : (n.top ?? 0) + (n.bottom ?? 0), P = a[E] - j - b / 2 - p, R = t[g] + b / 2 - (k[g] + n[be[g]]), O = t[g] + t[E] - b / 2 - (k[g] + n[be[g]]), K = gr(U, R, O);
  D[g] = gr(K, w, P), { placement: B, crossPlacement: A } = x, b ? I = D[g] : A === "right" ? I += t[E] : A === "center" && (I += t[E] / 2);
  let H = B === "left" || B === "top" ? a[v] : 0, F = { x: B === "top" || B === "bottom" ? I : H, y: B === "left" || B === "right" ? I : H };
  return { position: k, maxHeight: Q, arrowOffsetLeft: D.left, arrowOffsetTop: D.top, placement: B, triggerAnchorPoint: F };
}
function t3(e) {
  let { placement: t, targetNode: a, overlayNode: r, scrollNode: n, padding: u, shouldFlip: i, boundaryElement: o, offset: l, crossOffset: s, maxHeight: d, arrowSize: f = 0, arrowBoundaryOffset: $ = 0, targetRect: m } = e, b = J4(), p = r instanceof HTMLElement ? a3(r) : document.documentElement, h = p === document.documentElement;
  const y = window.getComputedStyle(p).position;
  let x = !!y && y !== "static", v = h ? Vt(a, false, m) : $u(a, p, false, m);
  if (!h) {
    let { marginTop: C, marginLeft: N } = window.getComputedStyle(a);
    v.top += parseInt(C, 10) || 0, v.left += parseInt(N, 10) || 0;
  }
  let g = Vt(r, true), E = Q4(r);
  g.width += (E.left ?? 0) + (E.right ?? 0), g.height += (E.top ?? 0) + (E.bottom ?? 0);
  let B = q4(n), A = du(o, b), k = du(p, b), M;
  if ((o.tagName === "BODY" || o.tagName === "HTML") && !h) {
    let C = Ia(p, false);
    M = { top: -(C.top - A.top), left: -(C.left - A.left), width: 0, height: 0 };
  } else (o.tagName === "BODY" || o.tagName === "HTML") && h ? M = { top: 0, left: 0, width: 0, height: 0 } : M = $u(o, p, false);
  let L = _(o, p);
  return e3(t, v, g, B, E, u, i, A, k, M, l, s, x, d, f, $, L, b);
}
function Ia(e, t) {
  let { top: a, left: r, width: n, height: u } = e.getBoundingClientRect();
  return t && e instanceof e.ownerDocument.defaultView.HTMLElement && (n = e.offsetWidth, u = e.offsetHeight), { top: a, left: r, width: n, height: u };
}
function Vt(e, t, a) {
  let { top: r, left: n, width: u, height: i } = a || Ia(e, t), { scrollTop: o, scrollLeft: l, clientTop: s, clientLeft: d } = document.documentElement;
  return { top: r + o - s, left: n + l - d, width: u, height: i };
}
function $u(e, t, a, r) {
  let n = window.getComputedStyle(e), u;
  if (n.position === "fixed") u = r || Ia(e, a);
  else {
    u = Vt(e, a, r);
    let i = Vt(t, a), o = window.getComputedStyle(t);
    i.top += (parseInt(o.borderTopWidth, 10) || 0) - t.scrollTop, i.left += (parseInt(o.borderLeftWidth, 10) || 0) - t.scrollLeft, u.top -= i.top, u.left -= i.left;
  }
  return u.top -= parseInt(n.marginTop, 10) || 0, u.left -= parseInt(n.marginLeft, 10) || 0, u;
}
function a3(e) {
  let t = e.offsetParent;
  if (t && t === document.body && window.getComputedStyle(t).position === "static" && !bu(t) && (t = document.documentElement), t == null) for (t = e.parentElement; t && !bu(t); ) t = t.parentElement;
  return t || document.documentElement;
}
function bu(e) {
  let t = window.getComputedStyle(e);
  return t.transform !== "none" || /transform|perspective/.test(t.willChange) || t.filter !== "none" || t.contain === "paint" || "backdropFilter" in t && t.backdropFilter !== "none" || "WebkitBackdropFilter" in t && t.WebkitBackdropFilter !== "none";
}
const r3 = /* @__PURE__ */ new WeakMap();
function n3(e) {
  let { triggerRef: t, isOpen: a, onClose: r } = e;
  c.useEffect(() => {
    if (!a || r === null) return;
    let n = (u) => {
      let i = V(u);
      if (!t.current || i instanceof Node && !_(i, t.current) || i instanceof HTMLInputElement || i instanceof HTMLTextAreaElement) return;
      let o = r || r3.get(t.current);
      o && o();
    };
    return Nd(Vd(t.current), "scroll", n, true);
  }, [a, r, t]);
}
function u3() {
  return typeof window.ResizeObserver < "u";
}
function Lr(e) {
  const { ref: t, box: a, onResize: r } = e;
  let n = ne(r);
  c.useEffect(() => {
    let u = t == null ? void 0 : t.current;
    if (u) if (u3()) {
      const i = new window.ResizeObserver((o) => {
        o.length && n();
      });
      return i.observe(u, { box: a }), () => {
        u && i.unobserve(u);
      };
    } else return window.addEventListener("resize", n, false), () => {
      window.removeEventListener("resize", n, false);
    };
  }, [t, a]);
}
let Ue = typeof document < "u" ? window.visualViewport : null;
function i3(e) {
  let { direction: t } = me(), { arrowSize: a, targetRef: r, overlayRef: n, arrowRef: u, scrollRef: i = n, placement: o = "bottom", containerPadding: l = 12, shouldFlip: s = true, boundaryElement: d = typeof document < "u" ? document.body : null, offset: f = 0, crossOffset: $ = 0, shouldUpdatePosition: m = true, isOpen: b = true, onClose: p, maxHeight: h, arrowBoundaryOffset: y = 0, getTargetRect: x } = e, [v, g] = c.useState(null), E = [m, o, n.current, r.current, u == null ? void 0 : u.current, i.current, l, s, d, f, $, b, t, h, y, a], B = c.useRef(Ue == null ? void 0 : Ue.scale);
  c.useEffect(() => {
    b && (B.current = Ue == null ? void 0 : Ue.scale);
  }, [b]);
  let A = c.useCallback(() => {
    var _a2, _b;
    if (m === false || !b || !n.current || !r.current || !d || (Ue == null ? void 0 : Ue.scale) !== B.current) return;
    let L = null;
    if (i.current && Ur(i.current)) {
      let D = (_a2 = q()) == null ? void 0 : _a2.getBoundingClientRect(), I = i.current.getBoundingClientRect();
      L = { type: "top", offset: ((D == null ? void 0 : D.top) ?? 0) - I.top }, L.offset > I.height / 2 && (L.type = "bottom", L.offset = ((D == null ? void 0 : D.bottom) ?? 0) - I.bottom);
    }
    let C = n.current;
    !h && n.current && (C.style.top = "0px", C.style.bottom = "", C.style.maxHeight = (((_b = window.visualViewport) == null ? void 0 : _b.height) ?? window.innerHeight) + "px");
    let N = t3({ placement: l3(o, t), overlayNode: n.current, targetNode: r.current, scrollNode: i.current || n.current, padding: l, shouldFlip: s, boundaryElement: d, offset: f, crossOffset: $, maxHeight: h, arrowSize: a ?? ((u == null ? void 0 : u.current) ? Ia(u.current, true).width : 0), arrowBoundaryOffset: y, targetRect: x == null ? void 0 : x(r.current) });
    if (!N.position) return;
    C.style.top = "", C.style.bottom = "", C.style.left = "", C.style.right = "", Object.keys(N.position).forEach((D) => C.style[D] = N.position[D] + "px"), C.style.maxHeight = N.maxHeight != null ? N.maxHeight + "px" : "";
    let Q = q();
    if (L && Q && i.current) {
      let D = Q.getBoundingClientRect(), I = i.current.getBoundingClientRect(), U = D[L.type] - I[L.type];
      i.current.scrollTop += U - L.offset;
    }
    g(N);
  }, E);
  Z(A, E), o3(A), Lr({ ref: n, onResize: A }), Lr({ ref: r, onResize: A });
  let k = c.useRef(false);
  Z(() => {
    let L, C = () => {
      k.current = true, clearTimeout(L), L = setTimeout(() => {
        k.current = false;
      }, 500), A();
    }, N = () => {
      k.current && C();
    };
    return Ue == null ? void 0 : Ue.addEventListener("resize", C), Ue == null ? void 0 : Ue.addEventListener("scroll", N), () => {
      Ue == null ? void 0 : Ue.removeEventListener("resize", C), Ue == null ? void 0 : Ue.removeEventListener("scroll", N);
    };
  }, [A]);
  let M = c.useCallback(() => {
    k.current || (p == null ? void 0 : p());
  }, [p, k]);
  return n3({ triggerRef: r, isOpen: b, onClose: p && M }), { overlayProps: { style: { position: v ? "absolute" : "fixed", top: v ? void 0 : 0, left: v ? void 0 : 0, zIndex: 1e5, ...v == null ? void 0 : v.position, maxHeight: (v == null ? void 0 : v.maxHeight) ?? "100vh" } }, placement: (v == null ? void 0 : v.placement) ?? null, triggerAnchorPoint: (v == null ? void 0 : v.triggerAnchorPoint) ?? null, arrowProps: { "aria-hidden": "true", role: "presentation", style: { left: v == null ? void 0 : v.arrowOffsetLeft, top: v == null ? void 0 : v.arrowOffsetTop } }, updatePosition: A };
}
function o3(e) {
  Z(() => (window.addEventListener("resize", e, false), () => {
    window.removeEventListener("resize", e, false);
  }), [e]);
}
function l3(e, t) {
  return t === "rtl" ? e.replace("start", "right").replace("end", "left") : e.replace("start", "left").replace("end", "right");
}
function s3(e) {
  let { ref: t, onInteractOutside: a, isDisabled: r, onInteractOutsideStart: n } = e, u = c.useRef({ isPointerDown: false, ignoreEmulatedMouseEvents: false }), i = ne((l) => {
    a && hu(l, t) && (n && n(l), u.current.isPointerDown = true);
  }), o = ne((l) => {
    a && a(l);
  });
  c.useEffect(() => {
    let l = u.current;
    if (r) return;
    const s = t.current, d = W(s);
    if (typeof PointerEvent < "u") {
      let f = ($) => {
        l.isPointerDown && hu($, t) && o($), l.isPointerDown = false;
      };
      return d.addEventListener("pointerdown", i, true), d.addEventListener("click", f, true), () => {
        d.removeEventListener("pointerdown", i, true), d.removeEventListener("click", f, true);
      };
    }
  }, [t, r]);
}
function hu(e, t) {
  if (e.button > 0) return false;
  let a = V(e);
  if (a) {
    const r = a.ownerDocument;
    if (!r || !_(r.documentElement, a) || a.closest("[data-react-aria-top-layer]")) return false;
  }
  return t.current ? !e.composedPath().includes(t.current) : false;
}
const ye = [];
function d3(e, t) {
  let { onClose: a, shouldCloseOnBlur: r, isOpen: n, isDismissable: u = false, isKeyboardDismissDisabled: i = false, shouldCloseOnInteractOutside: o } = e, l = c.useRef(void 0);
  c.useEffect(() => {
    if (n && !ye.includes(t)) return ye.push(t), () => {
      let b = ye.indexOf(t);
      b >= 0 && ye.splice(b, 1);
    };
  }, [n, t]);
  let s = () => {
    ye[ye.length - 1] === t && a && a();
  }, d = (b) => {
    const p = ye[ye.length - 1];
    l.current = p, (!o || o(V(b))) && p === t && b.stopPropagation();
  }, f = (b) => {
    (!o || o(V(b))) && (ye[ye.length - 1] === t && b.stopPropagation(), l.current === t && s()), l.current = void 0;
  }, { keyboardProps: $ } = Qe({ shortcuts: { Escape: () => {
    if (!i) {
      s();
      return;
    }
    return false;
  } } });
  s3({ ref: t, onInteractOutside: u && n ? f : void 0, onInteractOutsideStart: d });
  let { focusWithinProps: m } = pt({ isDisabled: !r, onBlurWithin: (b) => {
    !b.relatedTarget || H4(b.relatedTarget) || (!o || o(b.relatedTarget)) && (a == null ? void 0 : a());
  } });
  return { overlayProps: { ...$, ...m }, underlayProps: {} };
}
const St = typeof document < "u" && window.visualViewport;
let Xt = 0, or;
function c3(e = {}) {
  let { isDisabled: t } = e;
  Z(() => {
    if (!t) return Xt++, Xt === 1 && (ht() && Ye() ? or = m3() : or = f3()), () => {
      Xt--, Xt === 0 && or();
    };
  }, [t]);
}
function f3() {
  let e = window.innerWidth - document.documentElement.clientWidth;
  return $t(e > 0 && ("scrollbarGutter" in document.documentElement.style ? ua(document.documentElement, "scrollbarGutter", "stable") : ua(document.documentElement, "paddingRight", `${e}px`)), ua(document.documentElement, "overflow", "hidden"));
}
function m3() {
  let e = ua(document.documentElement, "overflow", "hidden"), t, a = false, r = (d) => {
    let f = V(d);
    t = pa(f) ? f : Ta(f, true), a = false;
    let $ = f.ownerDocument.defaultView.getSelection();
    $ && !$.isCollapsed && $.containsNode(f, true) && (a = true), d.composedPath().some((m) => m instanceof HTMLInputElement && m.type === "range") && (a = true), "selectionStart" in f && "selectionEnd" in f && f.selectionStart < f.selectionEnd && f.ownerDocument.activeElement === f && (a = true);
  }, n = document.createElement("style"), u = qu();
  u && (n.nonce = u), n.textContent = `
@layer {
  * {
    overscroll-behavior: contain;
  }
}`.trim(), document.head.prepend(n);
  let i = (d) => {
    if (!(d.touches.length === 2 || a)) {
      if (!t || t === document.documentElement || t === document.body) {
        d.preventDefault();
        return;
      }
      t.scrollHeight === t.clientHeight && t.scrollWidth === t.clientWidth && d.preventDefault();
    }
  }, o = (d) => {
    var _a2, _b;
    let f = V(d), $ = d.relatedTarget;
    $ && Ha($) ? ($.focus({ preventScroll: true }), pu($, Ha(f))) : $ || ((_b = (_a2 = f.parentElement) == null ? void 0 : _a2.closest("[tabindex]")) == null ? void 0 : _b.focus({ preventScroll: true }));
  }, l = HTMLElement.prototype.focus;
  HTMLElement.prototype.focus = function(d) {
    let f = q(), $ = f != null && Ha(f);
    l.call(this, { ...d, preventScroll: true }), (!d || !d.preventScroll) && pu(this, $);
  };
  let s = $t(lr(document, "touchstart", r, { passive: false, capture: true }), lr(document, "touchmove", i, { passive: false, capture: true }), lr(document, "blur", o, true));
  return () => {
    e(), s(), n.remove(), HTMLElement.prototype.focus = l;
  };
}
function ua(e, t, a) {
  let r = e.style[t];
  return e.style[t] = a, () => {
    e.style[t] = r;
  };
}
function lr(e, t, a, r) {
  return e.addEventListener(t, a, r), () => {
    e.removeEventListener(t, a, r);
  };
}
function pu(e, t) {
  t || !St ? yu(e) : St.addEventListener("resize", () => yu(e), { once: true });
}
function yu(e) {
  let t = document.scrollingElement || document.documentElement, a = e;
  for (; a && a !== t; ) {
    let r = Ta(a);
    if (r !== document.documentElement && r !== document.body && r !== a) {
      let n = r.getBoundingClientRect(), u = a.getBoundingClientRect();
      if (u.top < n.top || u.bottom > n.top + a.clientHeight) {
        let i = n.bottom;
        St && (i = Math.min(i, St.offsetTop + St.height));
        let o = u.top - n.top - ((i - n.top) / 2 - u.height / 2);
        r.scrollTo({ top: Math.max(0, Math.min(r.scrollHeight - r.clientHeight, r.scrollTop + o)), behavior: "smooth" });
      }
    }
    a = r.parentElement;
  }
}
function $3(e, t) {
  let { triggerRef: a, popoverRef: r, groupRef: n, isNonModal: u, isKeyboardDismissDisabled: i, shouldCloseOnInteractOutside: o, ...l } = e, s = l.trigger === "SubmenuTrigger", { overlayProps: d, underlayProps: f } = d3({ isOpen: t.isOpen, onClose: t.close, shouldCloseOnBlur: true, isDismissable: !u || s, isKeyboardDismissDisabled: i, shouldCloseOnInteractOutside: o }, n ?? r), { overlayProps: $, arrowProps: m, placement: b, triggerAnchorPoint: p } = i3({ ...l, targetRef: a, overlayRef: r, isOpen: t.isOpen, onClose: u && !s ? t.close : null, getTargetRect: l.getTargetRect ?? (t.point ? () => new DOMRect(t.point.x, t.point.y, 0, 0) : void 0) });
  c3({ isDisabled: u || !t.isOpen }), c.useEffect(() => {
    if (t.isOpen && r.current) return u ? G4((n == null ? void 0 : n.current) ?? r.current) : Z4([(n == null ? void 0 : n.current) ?? r.current], { shouldUseInert: true });
  }, [u, t.isOpen, r, n]);
  let { focusWithinProps: h } = pt(e);
  return { popoverProps: Y(d, $, h), arrowProps: m, underlayProps: f, placement: b, triggerAnchorPoint: p };
}
var sl = {};
sl = { dismiss: "\u062A\u062C\u0627\u0647\u0644" };
var dl = {};
dl = { dismiss: "\u041E\u0442\u0445\u0432\u044A\u0440\u043B\u044F\u043D\u0435" };
var cl = {};
cl = { dismiss: "Odstranit" };
var fl = {};
fl = { dismiss: "Luk" };
var ml = {};
ml = { dismiss: "Schlie\xDFen" };
var $l = {};
$l = { dismiss: "\u0391\u03C0\u03CC\u03C1\u03C1\u03B9\u03C8\u03B7" };
var bl = {};
bl = { dismiss: "Dismiss" };
var hl = {};
hl = { dismiss: "Descartar" };
var pl = {};
pl = { dismiss: "L\xF5peta" };
var yl = {};
yl = { dismiss: "Hylk\xE4\xE4" };
var Dl = {};
Dl = { dismiss: "Rejeter" };
var gl = {};
gl = { dismiss: "\u05D4\u05EA\u05E2\u05DC\u05DD" };
var vl = {};
vl = { dismiss: "Odbaci" };
var xl = {};
xl = { dismiss: "Elutas\xEDt\xE1s" };
var El = {};
El = { dismiss: "Ignora" };
var Cl = {};
Cl = { dismiss: "\u9589\u3058\u308B" };
var wl = {};
wl = { dismiss: "\uBB34\uC2DC" };
var Pl = {};
Pl = { dismiss: "Atmesti" };
var Sl = {};
Sl = { dismiss: "Ner\u0101d\u012Bt" };
var Bl = {};
Bl = { dismiss: "Lukk" };
var Fl = {};
Fl = { dismiss: "Negeren" };
var Rl = {};
Rl = { dismiss: "Zignoruj" };
var Tl = {};
Tl = { dismiss: "Descartar" };
var Al = {};
Al = { dismiss: "Dispensar" };
var kl = {};
kl = { dismiss: "Revocare" };
var Ml = {};
Ml = { dismiss: "\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C" };
var Il = {};
Il = { dismiss: "Zru\u0161i\u0165" };
var Nl = {};
Nl = { dismiss: "Opusti" };
var Ll = {};
Ll = { dismiss: "Odbaci" };
var Vl = {};
Vl = { dismiss: "Avvisa" };
var Ol = {};
Ol = { dismiss: "Kapat" };
var Hl = {};
Hl = { dismiss: "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438" };
var Ul = {};
Ul = { dismiss: "\u53D6\u6D88" };
var zl = {};
zl = { dismiss: "\u95DC\u9589" };
var jl = {};
jl = { "ar-AE": sl, "bg-BG": dl, "cs-CZ": cl, "da-DK": fl, "de-DE": ml, "el-GR": $l, "en-US": bl, "es-ES": hl, "et-EE": pl, "fi-FI": yl, "fr-FR": Dl, "he-IL": gl, "hr-HR": vl, "hu-HU": xl, "it-IT": El, "ja-JP": Cl, "ko-KR": wl, "lt-LT": Pl, "lv-LV": Sl, "nb-NO": Bl, "nl-NL": Fl, "pl-PL": Rl, "pt-BR": Tl, "pt-PT": Al, "ro-RO": kl, "ru-RU": Ml, "sk-SK": Il, "sl-SI": Nl, "sr-SP": Ll, "sv-SE": Vl, "tr-TR": Ol, "uk-UA": Hl, "zh-CN": Ul, "zh-TW": zl };
function b3(e) {
  return e && e.__esModule ? e.default : e;
}
function Du(e) {
  let { onDismiss: t, ...a } = e, r = Oe(b3(jl), "@react-aria/overlays"), n = Ot(a, r.format("dismiss")), u = () => {
    t && t();
  };
  return S.createElement(Rr, null, S.createElement("button", { ...n, tabIndex: -1, onClick: u, style: { width: 1, height: 1 } }));
}
function h3({ children: e }) {
  let t = c.useMemo(() => ({ register: () => {
  } }), []);
  return S.createElement(Zr.Provider, { value: t }, e);
}
const p3 = c.createContext({});
function y3() {
  return c.useContext(p3) ?? {};
}
const Kl = S.createContext(null);
function gu(e) {
  let t = Vr(), { portalContainer: a = t ? null : document.body, isExiting: r } = e, [n, u] = c.useState(false), i = c.useMemo(() => ({ contain: n, setContain: u }), [n, u]), { getContainer: o } = y3();
  if (!e.portalContainer && o && (a = o()), !a) return null;
  let l = e.children;
  return e.disableFocusManagement || (l = S.createElement(I4, { restoreFocus: true, contain: (e.shouldContainFocus || n) && !r }, l)), l = S.createElement(Kl.Provider, { value: i }, S.createElement(h3, null, S.createElement(Yu.Provider, { value: null }, l))), pd.createPortal(l, a);
}
function D3() {
  var _a2;
  let t = (_a2 = c.useContext(Kl)) == null ? void 0 : _a2.setContain;
  Z(() => {
    t == null ? void 0 : t(true);
  }, [t]);
}
function _l(e) {
  let [t, a] = Ft(e.isOpen, e.defaultOpen || false, e.onOpenChange), [r, n] = c.useState(null);
  const u = c.useCallback(() => {
    a(true);
  }, [a]), i = c.useCallback(() => {
    a(false);
  }, [a]), o = c.useCallback(() => {
    a(!t);
  }, [a, t]);
  return { isOpen: t, setOpen: a, open: u, close: i, toggle: o, point: r, setPoint: n };
}
function g3(e, t = true) {
  let [a, r] = c.useState(true), n = a && t;
  return Z(() => {
    if (n && e.current && "getAnimations" in e.current) for (let u of e.current.getAnimations()) u instanceof CSSTransition && u.cancel();
  }, [e, n]), Wl(e, n, c.useCallback(() => r(false), [])), n;
}
function v3(e, t) {
  let [a, r] = c.useState(t ? "open" : "closed");
  switch (a) {
    case "open":
      t || r("exiting");
      break;
    case "closed":
    case "exiting":
      t && r("open");
      break;
  }
  let n = a === "exiting";
  return Wl(e, n, c.useCallback(() => {
    r((u) => u === "exiting" ? "closed" : u);
  }, [])), n;
}
function Wl(e, t, a) {
  Z(() => {
    if (t && e.current) {
      if (!("getAnimations" in e.current)) {
        a();
        return;
      }
      let r = e.current.getAnimations();
      if (r.length === 0) {
        a();
        return;
      }
      let n = false;
      return Promise.allSettled(r.map((u) => u.finished)).then(() => {
        n || yd.flushSync(() => {
          a();
        });
      }), () => {
        n = true;
      };
    }
  }, [e, t, a]);
}
const Zl = c.createContext(null), vu = c.createContext(null), cm = c.forwardRef(function(t, a) {
  [t, a] = Ce(t, a, Zl);
  let r = c.useContext(bn), n = _l(t), u = t.isOpen != null || t.defaultOpen != null || !r ? n : r, i = v3(a, u.isOpen), o = t.isExiting || !t.shouldSkipAnimation && i || false, l = Ac(), { direction: s } = me();
  if (l) {
    let d = t.children;
    return typeof d == "function" && (d = d({ trigger: t.trigger || null, placement: "bottom", isEntering: false, isExiting: false, defaultChildren: null })), S.createElement(S.Fragment, null, d);
  }
  return u && !u.isOpen && !o ? null : S.createElement(x3, { ...t, triggerRef: t.triggerRef, state: u, popoverRef: a, isExiting: o, dir: s });
});
function x3({ state: e, isExiting: t, UNSTABLE_portalContainer: a, clearContexts: r, ...n }) {
  var _a2, _b;
  let u = c.useRef(null), i = c.useRef(null), o = c.useContext(vu), l = o && n.trigger === "SubmenuTrigger", { popoverProps: s, underlayProps: d, arrowProps: f, placement: $, triggerAnchorPoint: m } = $3({ ...n, offset: n.offset ?? 8, arrowRef: u, groupRef: l ? o : i }, e), b = n.popoverRef, p = g3(b, !!$), h = n.isEntering || !n.shouldSkipAnimation && p || false, y = Te({ ...n, defaultClassName: "react-aria-Popover", values: { trigger: n.trigger || null, placement: $, isEntering: h, isExiting: t } }), x = !n.isNonModal || n.trigger === "SubmenuTrigger" || n.trigger === "PreviewTrigger", [v, g] = c.useState(n.trigger === "PreviewTrigger");
  Z(() => {
    b.current && g(x && !b.current.querySelector("[role=dialog]"));
  }, [b, x]), c.useEffect(() => {
    v && n.trigger !== "PreviewTrigger" && (n.trigger !== "SubmenuTrigger" || Ca() !== "pointer") && b.current && !Ur(b.current) && Rt(b.current);
  }, [v, b, n.trigger]);
  let E = c.useMemo(() => {
    let C = y.children;
    if (r) for (let N of r) C = S.createElement(N.Provider, { value: null }, C);
    return C;
  }, [y.children, r]), [B, A] = c.useState(null), k = c.useCallback(() => {
    n.triggerRef.current && A(n.triggerRef.current.getBoundingClientRect().width + "px");
  }, [n.triggerRef]);
  Z(k, [k]), Lr({ ref: ((_a2 = y.style) == null ? void 0 : _a2["--trigger-width"]) ? void 0 : n.triggerRef, onResize: k });
  let M = { ...s.style, "--trigger-anchor-point": m ? `${m.x}px ${m.y}px` : void 0, ...y.style, "--trigger-width": ((_b = y.style) == null ? void 0 : _b["--trigger-width"]) || B }, L = S.createElement(de.div, { ...Y(oe(n, { global: true }), s), ...y, id: v ? n.id : void 0, role: v ? "dialog" : void 0, tabIndex: v ? -1 : void 0, "aria-label": n["aria-label"], "aria-labelledby": n["aria-labelledby"], ref: b, slot: n.slot || void 0, style: M, dir: n.dir, "data-trigger": n.trigger, "data-placement": $, "data-entering": h || void 0, "data-exiting": t || void 0 }, !n.isNonModal && S.createElement(Du, { onDismiss: e.close }), S.createElement(_4.Provider, { value: { ...f, placement: $, ref: u } }, E), S.createElement(Du, { onDismiss: e.close }));
  return l ? S.createElement(gu, { ...n, shouldContainFocus: v && n.trigger !== "PreviewTrigger", isExiting: t, portalContainer: a ?? (o == null ? void 0 : o.current) ?? void 0 }, L) : S.createElement(gu, { ...n, shouldContainFocus: v && n.trigger !== "PreviewTrigger", isExiting: t, portalContainer: a }, !n.isNonModal && e.isOpen && S.createElement("div", { "data-testid": "underlay", ...d, style: { position: "fixed", inset: 0 } }), S.createElement("div", { ref: i, style: { display: "contents" } }, S.createElement(vu.Provider, { value: i }, L)));
}
function E3(e, t) {
  let { role: a = "dialog" } = e, r = Bt();
  r = e["aria-label"] ? void 0 : r;
  let n = Bt();
  n = a === "alertdialog" && !e["aria-describedby"] ? n : void 0;
  let u = c.useRef(false);
  c.useEffect(() => {
    if (t.current && !Ur(t.current)) {
      Rt(t.current);
      let o = setTimeout(() => {
        (q() === t.current || q() === document.body) && (u.current = true, t.current && (t.current.blur(), Rt(t.current)), u.current = false);
      }, 500);
      return () => {
        clearTimeout(o);
      };
    }
  }, [t]), D3(), c.useRef(false), c.useEffect(() => {
  });
  let i = e["aria-describedby"] ?? n;
  return { dialogProps: { ...oe(e, { labelable: true }), role: a, tabIndex: -1, "aria-labelledby": e["aria-labelledby"] ?? r, "aria-describedby": i, onBlur: (o) => {
    u.current && o.stopPropagation();
  } }, titleProps: { id: r }, contentProps: { id: n } };
}
const Gl = c.createContext(null), bn = c.createContext(null), fm = c.forwardRef(function(t, a) {
  let r = t["aria-labelledby"];
  [t, a] = Ce(t, a, Gl);
  let { dialogProps: n, titleProps: u, contentProps: i } = E3({ ...t, "aria-labelledby": r }, a), o = c.useContext(bn);
  !n["aria-label"] && !n["aria-labelledby"] && t["aria-labelledby"] && (n["aria-labelledby"] = t["aria-labelledby"]);
  let l = Te({ defaultClassName: "react-aria-Dialog", className: t.className, style: t.style, children: t.children, values: { close: (o == null ? void 0 : o.close) || (() => {
  }) } }), s = oe(t, { global: true });
  return S.createElement(de.section, { ...Y(s, l, n), render: t.render, ref: a, slot: t.slot || void 0 }, S.createElement(va, { values: [[qr, { slots: { [ea]: {}, title: { ...u, level: 2 } } }], [Pa, { slots: { [ea]: {}, description: i } }], [Ut, { slots: { [ea]: {}, close: { onPress: () => o == null ? void 0 : o.close() } } }]] }, l.children));
});
function C3(e) {
  let t = K4({ usage: "search", ...e }), a = c.useCallback((u, i) => i.length === 0 ? true : (u = u.normalize("NFC"), i = i.normalize("NFC"), t.compare(u.slice(0, i.length), i) === 0), [t]), r = c.useCallback((u, i) => i.length === 0 ? true : (u = u.normalize("NFC"), i = i.normalize("NFC"), t.compare(u.slice(-i.length), i) === 0), [t]), n = c.useCallback((u, i) => {
    if (i.length === 0) return true;
    u = u.normalize("NFC"), i = i.normalize("NFC");
    let o = 0, l = i.length;
    for (; o + l <= u.length; o++) {
      let s = u.slice(o, o + l);
      if (t.compare(i, s) === 0) return true;
    }
    return false;
  }, [t]);
  return c.useMemo(() => ({ startsWith: a, endsWith: r, contains: n }), [a, r, n]);
}
const w3 = ["day", "month", "year"], P3 = { hour: 1, minute: 2, second: 3 };
function S3(e, t) {
  let { autoComplete: a, isDisabled: r, name: n } = e, { visuallyHiddenProps: u } = yo({ style: { position: "fixed", top: 0, left: 0 } }), i = 60;
  t.granularity === "second" ? i = 1 : t.granularity === "hour" && (i = 3600);
  let o = "";
  t.value && (t.granularity === "day" ? o = he(t.value).toString() : o = Re("timeZone" in t.value ? Df(t.value) : t.value).toString());
  let l = t.granularity === "day" ? "date" : "datetime-local", s = ["hour", "minute", "second"], d = 0;
  return s.includes(t.granularity) && (d = P3[t.granularity], s = s.slice(0, d)), { containerProps: { ...u, "aria-hidden": true, "data-react-aria-prevent-focus": true, "data-a11y-ignore": "aria-hidden-focus" }, inputProps: { tabIndex: -1, autoComplete: a, disabled: r, type: l, form: "", name: n, step: i, value: o, onChange: (f) => {
    let $ = V(f).value.toString();
    if ($) try {
      let m = Ff($);
      if (t.granularity === "day" && (m = Bf($)), "setSegment" in t) for (let b in m) w3.includes(b) && t.setSegment(b, m[b]), s.includes(b) && t.setSegment(b, m[b]);
      t.setValue(m);
    } catch {
    }
  } } };
}
function B3(e) {
  let { state: t } = e, { containerProps: a, inputProps: r } = S3({ ...e }, t);
  return S.createElement("div", { ...a, "data-testid": "hidden-dateinput-container" }, S.createElement("input", r));
}
var Yl = {};
Yl = { calendar: "\u0627\u0644\u062A\u0642\u0648\u064A\u0645", day: "\u064A\u0648\u0645", dayPeriod: "\u0635/\u0645", endDate: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621", era: "\u0627\u0644\u0639\u0635\u0631", hour: "\u0627\u0644\u0633\u0627\u0639\u0627\u062A", minute: "\u0627\u0644\u062F\u0642\u0627\u0626\u0642", month: "\u0627\u0644\u0634\u0647\u0631", second: "\u0627\u0644\u062B\u0648\u0627\u0646\u064A", selectedDateDescription: (e) => `\u062A\u0627\u0631\u064A\u062E \u0645\u062D\u062F\u062F: ${e.date}`, selectedRangeDescription: (e) => `\u0627\u0644\u0645\u062F\u0649 \u0627\u0644\u0632\u0645\u0646\u064A \u0627\u0644\u0645\u062D\u062F\u062F: ${e.startDate} \u0625\u0644\u0649 ${e.endDate}`, selectedTimeDescription: (e) => `\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062D\u062F\u062F: ${e.time}`, startDate: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621", timeZoneName: "\u0627\u0644\u062A\u0648\u0642\u064A\u062A", weekday: "\u0627\u0644\u064A\u0648\u0645", year: "\u0627\u0644\u0633\u0646\u0629" };
var Jl = {};
Jl = { calendar: "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440", day: "\u0434\u0435\u043D", dayPeriod: "\u043F\u0440.\u043E\u0431./\u0441\u043B.\u043E\u0431.", endDate: "\u041A\u0440\u0430\u0439\u043D\u0430 \u0434\u0430\u0442\u0430", era: "\u0435\u0440\u0430", hour: "\u0447\u0430\u0441", minute: "\u043C\u0438\u043D\u0443\u0442\u0430", month: "\u043C\u0435\u0441\u0435\u0446", second: "\u0441\u0435\u043A\u0443\u043D\u0434\u0430", selectedDateDescription: (e) => `\u0418\u0437\u0431\u0440\u0430\u043D\u0430 \u0434\u0430\u0442\u0430: ${e.date}`, selectedRangeDescription: (e) => `\u0418\u0437\u0431\u0440\u0430\u043D \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D: ${e.startDate} \u0434\u043E ${e.endDate}`, selectedTimeDescription: (e) => `\u0418\u0437\u0431\u0440\u0430\u043D\u043E \u0432\u0440\u0435\u043C\u0435: ${e.time}`, startDate: "\u041D\u0430\u0447\u0430\u043B\u043D\u0430 \u0434\u0430\u0442\u0430", timeZoneName: "\u0447\u0430\u0441\u043E\u0432\u0430 \u0437\u043E\u043D\u0430", weekday: "\u0434\u0435\u043D \u043E\u0442 \u0441\u0435\u0434\u043C\u0438\u0446\u0430\u0442\u0430", year: "\u0433\u043E\u0434\u0438\u043D\u0430" };
var ql = {};
ql = { calendar: "Kalend\xE1\u0159", day: "den", dayPeriod: "\u010D\xE1st dne", endDate: "Kone\u010Dn\xE9 datum", era: "letopo\u010Det", hour: "hodina", minute: "minuta", month: "m\u011Bs\xEDc", second: "sekunda", selectedDateDescription: (e) => `Vybran\xE9 datum: ${e.date}`, selectedRangeDescription: (e) => `Vybran\xE9 obdob\xED: ${e.startDate} a\u017E ${e.endDate}`, selectedTimeDescription: (e) => `Vybran\xFD \u010Das: ${e.time}`, startDate: "Po\u010D\xE1te\u010Dn\xED datum", timeZoneName: "\u010Dasov\xE9 p\xE1smo", weekday: "den v t\xFDdnu", year: "rok" };
var Ql = {};
Ql = { calendar: "Kalender", day: "dag", dayPeriod: "AM/PM", endDate: "Slutdato", era: "\xE6ra", hour: "time", minute: "minut", month: "m\xE5ned", second: "sekund", selectedDateDescription: (e) => `Valgt dato: ${e.date}`, selectedRangeDescription: (e) => `Valgt interval: ${e.startDate} til ${e.endDate}`, selectedTimeDescription: (e) => `Valgt tidspunkt: ${e.time}`, startDate: "Startdato", timeZoneName: "tidszone", weekday: "ugedag", year: "\xE5r" };
var Xl = {};
Xl = { calendar: "Kalender", day: "Tag", dayPeriod: "Tagesh\xE4lfte", endDate: "Enddatum", era: "Epoche", hour: "Stunde", minute: "Minute", month: "Monat", second: "Sekunde", selectedDateDescription: (e) => `Ausgew\xE4hltes Datum: ${e.date}`, selectedRangeDescription: (e) => `Ausgew\xE4hlter Bereich: ${e.startDate} bis ${e.endDate}`, selectedTimeDescription: (e) => `Ausgew\xE4hlte Zeit: ${e.time}`, startDate: "Startdatum", timeZoneName: "Zeitzone", weekday: "Wochentag", year: "Jahr" };
var es = {};
es = { calendar: "\u0397\u03BC\u03B5\u03C1\u03BF\u03BB\u03CC\u03B3\u03B9\u03BF", day: "\u03B7\u03BC\u03AD\u03C1\u03B1", dayPeriod: "\u03C0.\u03BC./\u03BC.\u03BC.", endDate: "\u0397\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1 \u03BB\u03AE\u03BE\u03B7\u03C2", era: "\u03C0\u03B5\u03C1\u03AF\u03BF\u03B4\u03BF\u03C2", hour: "\u03CE\u03C1\u03B1", minute: "\u03BB\u03B5\u03C0\u03C4\u03CC", month: "\u03BC\u03AE\u03BD\u03B1\u03C2", second: "\u03B4\u03B5\u03C5\u03C4\u03B5\u03C1\u03CC\u03BB\u03B5\u03C0\u03C4\u03BF", selectedDateDescription: (e) => `\u0395\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03B7 \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1: ${e.date}`, selectedRangeDescription: (e) => `\u0395\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03BF \u03B5\u03CD\u03C1\u03BF\u03C2: ${e.startDate} \u03AD\u03C9\u03C2 ${e.endDate}`, selectedTimeDescription: (e) => `\u0395\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03B7 \u03CE\u03C1\u03B1: ${e.time}`, startDate: "\u0397\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1 \u03AD\u03BD\u03B1\u03C1\u03BE\u03B7\u03C2", timeZoneName: "\u03B6\u03CE\u03BD\u03B7 \u03CE\u03C1\u03B1\u03C2", weekday: "\u03BA\u03B1\u03B8\u03B7\u03BC\u03B5\u03C1\u03B9\u03BD\u03AE", year: "\u03AD\u03C4\u03BF\u03C2" };
var ts = {};
ts = { era: "era", year: "year", month: "month", day: "day", hour: "hour", minute: "minute", second: "second", dayPeriod: "AM/PM", calendar: "Calendar", startDate: "Start Date", endDate: "End Date", weekday: "day of the week", timeZoneName: "time zone", selectedDateDescription: (e) => `Selected Date: ${e.date}`, selectedRangeDescription: (e) => `Selected Range: ${e.startDate} to ${e.endDate}`, selectedTimeDescription: (e) => `Selected Time: ${e.time}` };
var as = {};
as = { calendar: "Calendario", day: "d\xEDa", dayPeriod: "a.\xA0m./p.\xA0m.", endDate: "Fecha final", era: "era", hour: "hora", minute: "minuto", month: "mes", second: "segundo", selectedDateDescription: (e) => `Fecha seleccionada: ${e.date}`, selectedRangeDescription: (e) => `Rango seleccionado: ${e.startDate} a ${e.endDate}`, selectedTimeDescription: (e) => `Hora seleccionada: ${e.time}`, startDate: "Fecha de inicio", timeZoneName: "zona horaria", weekday: "d\xEDa de la semana", year: "a\xF1o" };
var rs = {};
rs = { calendar: "Kalender", day: "p\xE4ev", dayPeriod: "enne/p\xE4rast l\xF5unat", endDate: "L\xF5ppkuup\xE4ev", era: "ajastu", hour: "tund", minute: "minut", month: "kuu", second: "sekund", selectedDateDescription: (e) => `Valitud kuup\xE4ev: ${e.date}`, selectedRangeDescription: (e) => `Valitud vahemik: ${e.startDate} kuni ${e.endDate}`, selectedTimeDescription: (e) => `Valitud aeg: ${e.time}`, startDate: "Alguskuup\xE4ev", timeZoneName: "ajav\xF6\xF6nd", weekday: "n\xE4dalap\xE4ev", year: "aasta" };
var ns = {};
ns = { calendar: "Kalenteri", day: "p\xE4iv\xE4", dayPeriod: "vuorokaudenaika", endDate: "P\xE4\xE4ttymisp\xE4iv\xE4", era: "aikakausi", hour: "tunti", minute: "minuutti", month: "kuukausi", second: "sekunti", selectedDateDescription: (e) => `Valittu p\xE4iv\xE4m\xE4\xE4r\xE4: ${e.date}`, selectedRangeDescription: (e) => `Valittu aikav\xE4li: ${e.startDate} \u2013 ${e.endDate}`, selectedTimeDescription: (e) => `Valittu aika: ${e.time}`, startDate: "Alkamisp\xE4iv\xE4", timeZoneName: "aikavy\xF6hyke", weekday: "viikonp\xE4iv\xE4", year: "vuosi" };
var us = {};
us = { calendar: "Calendrier", day: "jour", dayPeriod: "cadran", endDate: "Date de fin", era: "\xE8re", hour: "heure", minute: "minute", month: "mois", second: "seconde", selectedDateDescription: (e) => `Date s\xE9lectionn\xE9e\xA0: ${e.date}`, selectedRangeDescription: (e) => `Plage s\xE9lectionn\xE9e\xA0: ${e.startDate} au ${e.endDate}`, selectedTimeDescription: (e) => `Heure choisie\xA0: ${e.time}`, startDate: "Date de d\xE9but", timeZoneName: "fuseau horaire", weekday: "jour de la semaine", year: "ann\xE9e" };
var is = {};
is = { calendar: "\u05DC\u05D5\u05D7 \u05E9\u05E0\u05D4", day: "\u05D9\u05D5\u05DD", dayPeriod: "\u05DC\u05E4\u05E0\u05D4\u05F4\u05E6/\u05D0\u05D7\u05D4\u05F4\u05E6", endDate: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05E1\u05D9\u05D5\u05DD", era: "\u05EA\u05E7\u05D5\u05E4\u05D4", hour: "\u05E9\u05E2\u05D4", minute: "\u05D3\u05E7\u05D4", month: "\u05D7\u05D5\u05D3\u05E9", second: "\u05E9\u05E0\u05D9\u05D9\u05D4", selectedDateDescription: (e) => `\u05EA\u05D0\u05E8\u05D9\u05DA \u05E0\u05D1\u05D7\u05E8: ${e.date}`, selectedRangeDescription: (e) => `\u05D8\u05D5\u05D5\u05D7 \u05E0\u05D1\u05D7\u05E8: ${e.startDate} \u05E2\u05D3 ${e.endDate}`, selectedTimeDescription: (e) => `\u05D6\u05DE\u05DF \u05E0\u05D1\u05D7\u05E8: ${e.time}`, startDate: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05EA\u05D7\u05DC\u05D4", timeZoneName: "\u05D0\u05D6\u05D5\u05E8 \u05D6\u05DE\u05DF", weekday: "\u05D9\u05D5\u05DD \u05D1\u05E9\u05D1\u05D5\u05E2", year: "\u05E9\u05E0\u05D4" };
var os = {};
os = { calendar: "Kalendar", day: "dan", dayPeriod: "AM/PM", endDate: "Datum zavr\u0161etka", era: "era", hour: "sat", minute: "minuta", month: "mjesec", second: "sekunda", selectedDateDescription: (e) => `Odabrani datum: ${e.date}`, selectedRangeDescription: (e) => `Odabrani raspon: ${e.startDate} do ${e.endDate}`, selectedTimeDescription: (e) => `Odabrano vrijeme: ${e.time}`, startDate: "Datum po\u010Detka", timeZoneName: "vremenska zona", weekday: "dan u tjednu", year: "godina" };
var ls = {};
ls = { calendar: "Napt\xE1r", day: "nap", dayPeriod: "napszak", endDate: "Befejez\u0151 d\xE1tum", era: "\xE9ra", hour: "\xF3ra", minute: "perc", month: "h\xF3nap", second: "m\xE1sodperc", selectedDateDescription: (e) => `Kijel\xF6lt d\xE1tum: ${e.date}`, selectedRangeDescription: (e) => `Kijel\xF6lt tartom\xE1ny: ${e.startDate}\u2013${e.endDate}`, selectedTimeDescription: (e) => `Kijel\xF6lt id\u0151: ${e.time}`, startDate: "Kezd\u0151 d\xE1tum", timeZoneName: "id\u0151z\xF3na", weekday: "h\xE9t napja", year: "\xE9v" };
var ss = {};
ss = { calendar: "Calendario", day: "giorno", dayPeriod: "AM/PM", endDate: "Data finale", era: "era", hour: "ora", minute: "minuto", month: "mese", second: "secondo", selectedDateDescription: (e) => `Data selezionata: ${e.date}`, selectedRangeDescription: (e) => `Intervallo selezionato: da ${e.startDate} a ${e.endDate}`, selectedTimeDescription: (e) => `Ora selezionata: ${e.time}`, startDate: "Data iniziale", timeZoneName: "fuso orario", weekday: "giorno della settimana", year: "anno" };
var ds = {};
ds = { calendar: "\u30AB\u30EC\u30F3\u30C0\u30FC", day: "\u65E5", dayPeriod: "\u5348\u524D/\u5348\u5F8C", endDate: "\u7D42\u4E86\u65E5", era: "\u6642\u4EE3", hour: "\u6642", minute: "\u5206", month: "\u6708", second: "\u79D2", selectedDateDescription: (e) => `\u9078\u629E\u3057\u305F\u65E5\u4ED8 : ${e.date}`, selectedRangeDescription: (e) => `\u9078\u629E\u7BC4\u56F2 : ${e.startDate} \u304B\u3089 ${e.endDate}`, selectedTimeDescription: (e) => `\u9078\u629E\u3057\u305F\u6642\u9593 : ${e.time}`, startDate: "\u958B\u59CB\u65E5", timeZoneName: "\u30BF\u30A4\u30E0\u30BE\u30FC\u30F3", weekday: "\u66DC\u65E5", year: "\u5E74" };
var cs = {};
cs = { calendar: "\uB2EC\uB825", day: "\uC77C", dayPeriod: "\uC624\uC804/\uC624\uD6C4", endDate: "\uC885\uB8CC\uC77C", era: "\uC5F0\uD638", hour: "\uC2DC", minute: "\uBD84", month: "\uC6D4", second: "\uCD08", selectedDateDescription: (e) => `\uC120\uD0DD \uC77C\uC790: ${e.date}`, selectedRangeDescription: (e) => `\uC120\uD0DD \uBC94\uC704: ${e.startDate} ~ ${e.endDate}`, selectedTimeDescription: (e) => `\uC120\uD0DD \uC2DC\uAC04: ${e.time}`, startDate: "\uC2DC\uC791\uC77C", timeZoneName: "\uC2DC\uAC04\uB300", weekday: "\uC694\uC77C", year: "\uB144" };
var fs = {};
fs = { calendar: "Kalendorius", day: "diena", dayPeriod: "iki piet\u0173 / po piet\u0173", endDate: "Pabaigos data", era: "era", hour: "valanda", minute: "minut\u0117", month: "m\u0117nuo", second: "sekund\u0117", selectedDateDescription: (e) => `Pasirinkta data: ${e.date}`, selectedRangeDescription: (e) => `Pasirinktas intervalas: nuo ${e.startDate} iki ${e.endDate}`, selectedTimeDescription: (e) => `Pasirinktas laikas: ${e.time}`, startDate: "Prad\u017Eios data", timeZoneName: "laiko juosta", weekday: "savait\u0117s diena", year: "metai" };
var ms = {};
ms = { calendar: "Kalend\u0101rs", day: "diena", dayPeriod: "priek\u0161pusdien\u0101/p\u0113cpusdien\u0101", endDate: "Beigu datums", era: "\u0113ra", hour: "stundas", minute: "min\u016Btes", month: "m\u0113nesis", second: "sekundes", selectedDateDescription: (e) => `Atlas\u012Btais datums: ${e.date}`, selectedRangeDescription: (e) => `Atlas\u012Btais diapazons: no ${e.startDate} l\u012Bdz ${e.endDate}`, selectedTimeDescription: (e) => `Atlas\u012Btais laiks: ${e.time}`, startDate: "S\u0101kuma datums", timeZoneName: "laika josla", weekday: "ned\u0113\u013Cas diena", year: "gads" };
var $s = {};
$s = { calendar: "Kalender", day: "dag", dayPeriod: "a.m./p.m.", endDate: "Sluttdato", era: "tidsalder", hour: "time", minute: "minutt", month: "m\xE5ned", second: "sekund", selectedDateDescription: (e) => `Valgt dato: ${e.date}`, selectedRangeDescription: (e) => `Valgt omr\xE5de: ${e.startDate} til ${e.endDate}`, selectedTimeDescription: (e) => `Valgt tid: ${e.time}`, startDate: "Startdato", timeZoneName: "tidssone", weekday: "ukedag", year: "\xE5r" };
var bs = {};
bs = { calendar: "Kalender", day: "dag", dayPeriod: "a.m./p.m.", endDate: "Einddatum", era: "tijdperk", hour: "uur", minute: "minuut", month: "maand", second: "seconde", selectedDateDescription: (e) => `Geselecteerde datum: ${e.date}`, selectedRangeDescription: (e) => `Geselecteerd bereik: ${e.startDate} tot ${e.endDate}`, selectedTimeDescription: (e) => `Geselecteerde tijd: ${e.time}`, startDate: "Startdatum", timeZoneName: "tijdzone", weekday: "dag van de week", year: "jaar" };
var hs = {};
hs = { calendar: "Kalendarz", day: "dzie\u0144", dayPeriod: "rano / po po\u0142udniu / wieczorem", endDate: "Data ko\u0144cowa", era: "era", hour: "godzina", minute: "minuta", month: "miesi\u0105c", second: "sekunda", selectedDateDescription: (e) => `Wybrana data: ${e.date}`, selectedRangeDescription: (e) => `Wybrany zakres: ${e.startDate} do ${e.endDate}`, selectedTimeDescription: (e) => `Wybrany czas: ${e.time}`, startDate: "Data pocz\u0105tkowa", timeZoneName: "strefa czasowa", weekday: "dzie\u0144 tygodnia", year: "rok" };
var ps = {};
ps = { calendar: "Calend\xE1rio", day: "dia", dayPeriod: "AM/PM", endDate: "Data final", era: "era", hour: "hora", minute: "minuto", month: "m\xEAs", second: "segundo", selectedDateDescription: (e) => `Data selecionada: ${e.date}`, selectedRangeDescription: (e) => `Intervalo selecionado: ${e.startDate} a ${e.endDate}`, selectedTimeDescription: (e) => `Hora selecionada: ${e.time}`, startDate: "Data inicial", timeZoneName: "fuso hor\xE1rio", weekday: "dia da semana", year: "ano" };
var ys = {};
ys = { calendar: "Calend\xE1rio", day: "dia", dayPeriod: "am/pm", endDate: "Data de T\xE9rmino", era: "era", hour: "hora", minute: "minuto", month: "m\xEAs", second: "segundo", selectedDateDescription: (e) => `Data selecionada: ${e.date}`, selectedRangeDescription: (e) => `Intervalo selecionado: ${e.startDate} a ${e.endDate}`, selectedTimeDescription: (e) => `Hora selecionada: ${e.time}`, startDate: "Data de In\xEDcio", timeZoneName: "fuso hor\xE1rio", weekday: "dia da semana", year: "ano" };
var Ds = {};
Ds = { calendar: "Calendar", day: "zi", dayPeriod: "a.m/p.m.", endDate: "Dat\u0103 final", era: "er\u0103", hour: "or\u0103", minute: "minut", month: "lun\u0103", second: "secund\u0103", selectedDateDescription: (e) => `Dat\u0103 selectat\u0103: ${e.date}`, selectedRangeDescription: (e) => `Interval selectat: de la ${e.startDate} p\xE2n\u0103 la ${e.endDate}`, selectedTimeDescription: (e) => `Ora selectat\u0103: ${e.time}`, startDate: "Dat\u0103 \xEEnceput", timeZoneName: "fus orar", weekday: "ziua din s\u0103pt\u0103m\xE2n\u0103", year: "an" };
var gs = {};
gs = { calendar: "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C", day: "\u0434\u0435\u043D\u044C", dayPeriod: "AM/PM", endDate: "\u0414\u0430\u0442\u0430 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F", era: "\u044D\u0440\u0430", hour: "\u0447\u0430\u0441", minute: "\u043C\u0438\u043D\u0443\u0442\u0430", month: "\u043C\u0435\u0441\u044F\u0446", second: "\u0441\u0435\u043A\u0443\u043D\u0434\u0430", selectedDateDescription: (e) => `\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u0430\u044F \u0434\u0430\u0442\u0430: ${e.date}`, selectedRangeDescription: (e) => `\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D: \u0441 ${e.startDate} \u043F\u043E ${e.endDate}`, selectedTimeDescription: (e) => `\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F: ${e.time}`, startDate: "\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430", timeZoneName: "\u0447\u0430\u0441\u043E\u0432\u043E\u0439 \u043F\u043E\u044F\u0441", weekday: "\u0434\u0435\u043D\u044C \u043D\u0435\u0434\u0435\u043B\u0438", year: "\u0433\u043E\u0434" };
var vs = {};
vs = { calendar: "Kalend\xE1r", day: "de\u0148", dayPeriod: "AM/PM", endDate: "D\xE1tum ukon\u010Denia", era: "letopo\u010Det", hour: "hodina", minute: "min\xFAta", month: "mesiac", second: "sekunda", selectedDateDescription: (e) => `Vybrat\xFD d\xE1tum: ${e.date}`, selectedRangeDescription: (e) => `Vybrat\xFD rozsah: od ${e.startDate} do ${e.endDate}`, selectedTimeDescription: (e) => `Vybrat\xFD \u010Das: ${e.time}`, startDate: "D\xE1tum za\u010Datia", timeZoneName: "\u010Dasov\xE9 p\xE1smo", weekday: "de\u0148 t\xFD\u017Ed\u0148a", year: "rok" };
var xs = {};
xs = { calendar: "Koledar", day: "dan", dayPeriod: "dop/pop", endDate: "Datum konca", era: "doba", hour: "ura", minute: "minuta", month: "mesec", second: "sekunda", selectedDateDescription: (e) => `Izbrani datum: ${e.date}`, selectedRangeDescription: (e) => `Izbrano obmo\u010Dje: ${e.startDate} do ${e.endDate}`, selectedTimeDescription: (e) => `Izbrani \u010Das: ${e.time}`, startDate: "Datum za\u010Detka", timeZoneName: "\u010Dasovni pas", weekday: "dan v tednu", year: "leto" };
var Es = {};
Es = { calendar: "Kalendar", day: "\u0434\u0430\u043D", dayPeriod: "\u043F\u0440\u0435 \u043F\u043E\u0434\u043D\u0435/\u043F\u043E \u043F\u043E\u0434\u043D\u0435", endDate: "Datum zavr\u0161etka", era: "\u0435\u0440\u0430", hour: "\u0441\u0430\u0442", minute: "\u043C\u0438\u043D\u0443\u0442", month: "\u043C\u0435\u0441\u0435\u0446", second: "\u0441\u0435\u043A\u0443\u043D\u0434", selectedDateDescription: (e) => `Izabrani datum: ${e.date}`, selectedRangeDescription: (e) => `Izabrani opseg: od ${e.startDate} do ${e.endDate}`, selectedTimeDescription: (e) => `Izabrano vreme: ${e.time}`, startDate: "Datum po\u010Detka", timeZoneName: "\u0432\u0440\u0435\u043C\u0435\u043D\u0441\u043A\u0430 \u0437\u043E\u043D\u0430", weekday: "\u0434\u0430\u043D \u0443 \u043D\u0435\u0434\u0435\u0459\u0438", year: "\u0433\u043E\u0434\u0438\u043D\u0430" };
var Cs = {};
Cs = { calendar: "Kalender", day: "dag", dayPeriod: "fm/em", endDate: "Slutdatum", era: "era", hour: "timme", minute: "minut", month: "m\xE5nad", second: "sekund", selectedDateDescription: (e) => `Valt datum: ${e.date}`, selectedRangeDescription: (e) => `Valt intervall: ${e.startDate} till ${e.endDate}`, selectedTimeDescription: (e) => `Vald tid: ${e.time}`, startDate: "Startdatum", timeZoneName: "tidszon", weekday: "veckodag", year: "\xE5r" };
var ws = {};
ws = { calendar: "Takvim", day: "g\xFCn", dayPeriod: "\xD6\xD6/\xD6S", endDate: "Biti\u015F Tarihi", era: "\xE7a\u011F", hour: "saat", minute: "dakika", month: "ay", second: "saniye", selectedDateDescription: (e) => `Se\xE7ilen Tarih: ${e.date}`, selectedRangeDescription: (e) => `Se\xE7ilen Aral\u0131k: ${e.startDate} - ${e.endDate}`, selectedTimeDescription: (e) => `Se\xE7ilen Zaman: ${e.time}`, startDate: "Ba\u015Flang\u0131\xE7 Tarihi", timeZoneName: "saat dilimi", weekday: "haftan\u0131n g\xFCn\xFC", year: "y\u0131l" };
var Ps = {};
Ps = { calendar: "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440", day: "\u0434\u0435\u043D\u044C", dayPeriod: "\u0434\u043F/\u043F\u043F", endDate: "\u0414\u0430\u0442\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F", era: "\u0435\u0440\u0430", hour: "\u0433\u043E\u0434\u0438\u043D\u0430", minute: "\u0445\u0432\u0438\u043B\u0438\u043D\u0430", month: "\u043C\u0456\u0441\u044F\u0446\u044C", second: "\u0441\u0435\u043A\u0443\u043D\u0434\u0430", selectedDateDescription: (e) => `\u0412\u0438\u0431\u0440\u0430\u043D\u0430 \u0434\u0430\u0442\u0430: ${e.date}`, selectedRangeDescription: (e) => `\u0412\u0438\u0431\u0440\u0430\u043D\u0438\u0439 \u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D: ${e.startDate} \u2014 ${e.endDate}`, selectedTimeDescription: (e) => `\u0412\u0438\u0431\u0440\u0430\u043D\u0438\u0439 \u0447\u0430\u0441: ${e.time}`, startDate: "\u0414\u0430\u0442\u0430 \u043F\u043E\u0447\u0430\u0442\u043A\u0443", timeZoneName: "\u0447\u0430\u0441\u043E\u0432\u0438\u0439 \u043F\u043E\u044F\u0441", weekday: "\u0434\u0435\u043D\u044C \u0442\u0438\u0436\u043D\u044F", year: "\u0440\u0456\u043A" };
var Ss = {};
Ss = { calendar: "\u65E5\u5386", day: "\u65E5", dayPeriod: "\u4E0A\u5348/\u4E0B\u5348", endDate: "\u7ED3\u675F\u65E5\u671F", era: "\u7EAA\u5143", hour: "\u5C0F\u65F6", minute: "\u5206\u949F", month: "\u6708", second: "\u79D2", selectedDateDescription: (e) => `\u9009\u5B9A\u7684\u65E5\u671F\uFF1A${e.date}`, selectedRangeDescription: (e) => `\u9009\u5B9A\u7684\u8303\u56F4\uFF1A${e.startDate} \u81F3 ${e.endDate}`, selectedTimeDescription: (e) => `\u9009\u5B9A\u7684\u65F6\u95F4\uFF1A${e.time}`, startDate: "\u5F00\u59CB\u65E5\u671F", timeZoneName: "\u65F6\u533A", weekday: "\u5DE5\u4F5C\u65E5", year: "\u5E74" };
var Bs = {};
Bs = { calendar: "\u65E5\u66C6", day: "\u65E5", dayPeriod: "\u4E0A\u5348/\u4E0B\u5348", endDate: "\u7D50\u675F\u65E5\u671F", era: "\u7EAA\u5143", hour: "\u5C0F\u65F6", minute: "\u5206\u949F", month: "\u6708", second: "\u79D2", selectedDateDescription: (e) => `\u9078\u5B9A\u7684\u65E5\u671F\uFF1A${e.date}`, selectedRangeDescription: (e) => `\u9078\u5B9A\u7684\u7BC4\u570D\uFF1A${e.startDate} \u81F3 ${e.endDate}`, selectedTimeDescription: (e) => `\u9078\u5B9A\u7684\u6642\u9593\uFF1A${e.time}`, startDate: "\u958B\u59CB\u65E5\u671F", timeZoneName: "\u65F6\u533A", weekday: "\u5DE5\u4F5C\u65E5", year: "\u5E74" };
var Na = {};
Na = { "ar-AE": Yl, "bg-BG": Jl, "cs-CZ": ql, "da-DK": Ql, "de-DE": Xl, "el-GR": es, "en-US": ts, "es-ES": as, "et-EE": rs, "fi-FI": ns, "fr-FR": us, "he-IL": is, "hr-HR": os, "hu-HU": ls, "it-IT": ss, "ja-JP": ds, "ko-KR": cs, "lt-LT": fs, "lv-LV": ms, "nb-NO": $s, "nl-NL": bs, "pl-PL": hs, "pt-BR": ps, "pt-PT": ys, "ro-RO": Ds, "ru-RU": gs, "sk-SK": vs, "sl-SI": xs, "sr-SP": Es, "sv-SE": Cs, "tr-TR": ws, "uk-UA": Ps, "zh-CN": Ss, "zh-TW": Bs };
function Fs(e, t, a) {
  let { direction: r } = me(), n = c.useMemo(() => mn(t), [t]), { keyboardProps: u } = Qe({ shortcuts: { "Alt+ArrowDown": () => {
    if ("setOpen" in e) {
      e.setOpen(true);
      return;
    }
    return false;
  }, "Alt+ArrowUp": () => {
    if ("setOpen" in e) {
      e.setOpen(true);
      return;
    }
    return false;
  }, ArrowLeft: (l) => {
    if (a) return false;
    if (r === "rtl") {
      if (t.current) {
        let s = V(l), d = xu(t.current, s.getBoundingClientRect().left, -1);
        if (d) {
          d.focus();
          return;
        }
      }
    } else {
      n.focusPrevious();
      return;
    }
    return false;
  }, ArrowRight: (l) => {
    if (a) return false;
    if (r === "rtl") {
      if (t.current) {
        let s = V(l), d = xu(t.current, s.getBoundingClientRect().left, 1);
        if (d) {
          d.focus();
          return;
        }
      }
    } else {
      n.focusNext();
      return;
    }
    return false;
  } }, allowRepeats: true }), i = () => {
    if (!t.current) return;
    let l = window.event ? V(window.event) : null, s = fe(t.current, { tabbable: true });
    if (l && (s.currentNode = l, l = s.previousNode()), !l) {
      let d;
      do
        d = s.lastChild(), d && (l = d);
      while (d);
    }
    for (; l == null ? void 0 : l.hasAttribute("data-placeholder"); ) {
      let d = s.previousNode();
      if (d && d.hasAttribute("data-placeholder")) l = d;
      else break;
    }
    l && l.focus();
  }, { pressProps: o } = Gr({ preventFocusOnPress: true, allowTextSelectionOnPress: true, onPressStart(l) {
    l.pointerType === "mouse" && i();
  }, onPress(l) {
    (l.pointerType === "touch" || l.pointerType === "pen") && i();
  } });
  return Y(o, u);
}
function xu(e, t, a) {
  let r = fe(e, { tabbable: true }), n = r.nextNode(), u = null, i = 1 / 0;
  for (; n; ) {
    let l = n.getBoundingClientRect().left - t, s = Math.abs(l);
    Math.sign(l) === a && s < i && (u = n, i = s), n = r.nextNode();
  }
  return u;
}
function F3(e) {
  return e && e.__esModule ? e.default : e;
}
const Rs = /* @__PURE__ */ new WeakMap(), ia = "__reactAriaDateFieldRole", R3 = "__reactAriaDateFieldFocusManager";
function T3(e, t, a) {
  var _a2;
  let { isInvalid: r, validationErrors: n, validationDetails: u } = t.displayValidation, { labelProps: i, fieldProps: o, descriptionProps: l, errorMessageProps: s } = xo({ ...e, labelElementType: "span", isInvalid: r, errorMessage: e.errorMessage || n }), d = c.useRef(null), { focusWithinProps: f } = pt({ ...e, onFocusWithin(M) {
    var _a3;
    d.current = t.value, (_a3 = e.onFocus) == null ? void 0 : _a3.call(e, M);
  }, onBlurWithin: (M) => {
    var _a3;
    t.confirmPlaceholder(), t.value !== d.current && t.commitValidation(), (_a3 = e.onBlur) == null ? void 0 : _a3.call(e, M);
  }, onFocusWithinChange: e.onFocusChange }), $ = Oe(F3(Na), "@react-aria/datepicker"), m = t.maxGranularity === "hour" ? "selectedTimeDescription" : "selectedDateDescription", b = t.maxGranularity === "hour" ? "time" : "date", p = t.value ? $.format(m, { [b]: t.formatValue({ month: "long" }) }) : "", h = cn(p), y = e[ia] === "presentation" ? o["aria-describedby"] : [h["aria-describedby"], o["aria-describedby"]].filter(Boolean).join(" ") || void 0, x = e[R3], v = c.useMemo(() => x || mn(a), [x, a]), g = Fs(t, a, e[ia] === "presentation");
  Rs.set(t, { ariaLabel: e["aria-label"], ariaLabelledBy: [i.id, e["aria-labelledby"]].filter(Boolean).join(" ") || void 0, ariaDescribedBy: y, focusManager: v });
  let E = c.useRef(e.autoFocus), B;
  e[ia] === "presentation" ? B = { role: "presentation" } : B = Y(o, { role: "group", "aria-disabled": e.isDisabled || void 0, "aria-describedby": y }), c.useEffect(() => {
    E.current && v.focusFirst(), E.current = false;
  }, [v]), C4(e.inputRef, t.defaultValue, t.setValue), w4({ ...e, focus() {
    v.focusFirst();
  } }, t, e.inputRef);
  let A = { type: "hidden", name: e.name, form: e.form, value: ((_a2 = t.value) == null ? void 0 : _a2.toString()) || "", disabled: e.isDisabled };
  e.validationBehavior === "native" && (A.type = "text", A.hidden = true, A.required = e.isRequired, A.onChange = () => {
  });
  let k = oe(e);
  return { labelProps: { ...i, onClick: () => {
    v.focusFirst();
  } }, fieldProps: Y(k, B, g, f, { onKeyDown: e.onKeyDown, onKeyUp: e.onKeyUp, style: { unicodeBidi: "isolate" } }), inputProps: A, descriptionProps: l, errorMessageProps: s, isInvalid: r, validationErrors: n, validationDetails: u };
}
function A3(e) {
  return e && e.__esModule ? e.default : e;
}
function k3() {
  let { locale: e } = me(), t = ju(A3(Na), "@react-aria/datepicker");
  return c.useMemo(() => {
    try {
      return new Intl.DisplayNames(e, { type: "dateTimeField" });
    } catch {
      return new M3(e, t);
    }
  }, [e, t]);
}
class M3 {
  constructor(t, a) {
    this.locale = t, this.dictionary = a;
  }
  of(t) {
    return this.dictionary.getStringForLocale(t, this.locale);
  }
}
function I3(e, t, a) {
  let r = c.useRef(""), { locale: n, direction: u } = me(), i = k3(), { ariaLabel: o, ariaLabelledBy: l, ariaDescribedBy: s, focusManager: d } = Rs.get(t), f = e.isPlaceholder ? "" : e.text, $ = c.useMemo(() => t.dateFormatter.resolvedOptions(), [t.dateFormatter]), m = xe({ month: "long", timeZone: $.timeZone }), b = xe({ hour: "numeric", hour12: $.hour12, timeZone: $.timeZone });
  if (e.type === "month" && !e.isPlaceholder) {
    let R = m.format(t.dateValue);
    f = R !== f ? `${f} \u2013 ${R}` : R;
  } else e.type === "hour" && !e.isPlaceholder && (f = b.format(t.dateValue));
  let { spinButtonProps: p } = k4({ value: e.value ?? void 0, textValue: f, minValue: e.minValue, maxValue: e.maxValue, isDisabled: t.isDisabled, isReadOnly: t.isReadOnly || !e.isEditable, isRequired: t.isRequired, onIncrement: () => {
    r.current = "", t.increment(e.type);
  }, onDecrement: () => {
    r.current = "", t.decrement(e.type);
  }, onIncrementPage: () => {
    r.current = "", t.incrementPage(e.type);
  }, onDecrementPage: () => {
    r.current = "", t.decrementPage(e.type);
  }, onIncrementToMax: () => {
    r.current = "", t.incrementToMax(e.type);
  }, onDecrementToMin: () => {
    r.current = "", t.decrementToMin(e.type);
  } }), h = c.useMemo(() => new ei(n, { maximumFractionDigits: 0 }), [n]), y = () => {
    if (e.text === e.placeholder && d.focusPrevious(), h.isValidPartialNumber(e.text) && !t.isReadOnly && !e.isPlaceholder) {
      let R = e.text.slice(0, -1), O = h.parse(R);
      R = O === 0 ? "" : R, R.length === 0 || O === 0 ? t.clearSegment(e.type) : t.setSegment(e.type, O), r.current = R;
    } else (e.type === "dayPeriod" || e.type === "era") && t.clearSegment(e.type);
  }, { keyboardProps: x } = Qe({ shortcuts: { Backspace: () => {
    y();
  }, Delete: () => {
    y();
  }, "Mod+a": () => {
  } }, allowRepeats: true }), { startsWith: v } = C3({ sensitivity: "base" }), g = xe({ hour: "numeric", hour12: true }), E = c.useMemo(() => {
    let R = /* @__PURE__ */ new Date();
    return R.setHours(0), g.formatToParts(R).find((O) => O.type === "dayPeriod").value;
  }, [g]), B = c.useMemo(() => {
    let R = /* @__PURE__ */ new Date();
    return R.setHours(12), g.formatToParts(R).find((O) => O.type === "dayPeriod").value;
  }, [g]), A = xe({ year: "numeric", era: "narrow", timeZone: "UTC" }), k = c.useMemo(() => {
    if (e.type !== "era") return [];
    let R = ee(new ae(1, 1, 1), t.calendar), O = t.calendar.getEras().map((H) => {
      let F = R.set({ year: 1, month: 1, day: 1, era: H }).toDate("UTC"), J = A.formatToParts(F).find((T) => T.type === "era").value;
      return { era: H, formatted: J };
    }), K = N3(O.map((H) => H.formatted));
    if (K) for (let H of O) H.formatted = H.formatted.slice(K);
    return O;
  }, [A, t.calendar, e.type]), M = (R) => {
    if (t.isDisabled || t.isReadOnly) return;
    let O = r.current + R;
    switch (e.type) {
      case "dayPeriod":
        if (v(E, R)) t.setSegment("dayPeriod", 0);
        else if (v(B, R)) t.setSegment("dayPeriod", 1);
        else break;
        d.focusNext();
        break;
      case "era": {
        let K = k.find((H) => v(H.formatted, R));
        K && (t.setSegment("era", K.era), d.focusNext());
        break;
      }
      case "day":
      case "hour":
      case "minute":
      case "second":
      case "month":
      case "year": {
        if (!h.isValidPartialNumber(O)) return;
        let K = h.parse(O), H = K;
        if (e.maxValue !== void 0 && K > e.maxValue && (H = h.parse(R)), isNaN(K)) return;
        t.setSegment(e.type, H), e.maxValue !== void 0 && (+(K + "0") > e.maxValue || O.length >= String(e.maxValue).length) ? (r.current = "", d.focusNext()) : r.current = O;
        break;
      }
    }
  }, L = () => {
    var _a2;
    r.current = "", a.current && po(a.current, { containingElement: Ta(a.current) }), (_a2 = window.getSelection()) == null ? void 0 : _a2.collapse(a.current);
  }, C = c.useRef(typeof document < "u" ? document : null);
  Ua(C, "selectionchange", () => {
    let R = window.getSelection();
    (R == null ? void 0 : R.anchorNode) && _(a.current, R == null ? void 0 : R.anchorNode) && q() === a.current && R.collapse(a.current);
  });
  let N = c.useRef("");
  Ua(a, "beforeinput", (R) => {
    if (a.current) switch (R.preventDefault(), R.inputType) {
      case "deleteContentBackward":
      case "deleteContentForward":
        h.isValidPartialNumber(e.text) && !t.isReadOnly && y();
        break;
      case "insertCompositionText":
        N.current = a.current.textContent, a.current.textContent = a.current.textContent;
        break;
      default:
        R.data != null && M(R.data);
        break;
    }
  }), Ua(a, "input", (R) => {
    let { inputType: O, data: K } = R;
    O === "insertCompositionText" && (a.current && (a.current.textContent = N.current), K != null && (v(E, K) || v(B, K)) && M(K));
  }), Z(() => {
    let R = a.current;
    return () => {
      q() === R && (d.focusPrevious() || d.focusNext());
    };
  }, [a, d]);
  let Q = ht() || e.type === "timeZoneName" ? { role: "textbox", "aria-valuemax": null, "aria-valuemin": null, "aria-valuetext": null, "aria-valuenow": null } : {}, D = c.useMemo(() => t.segments.find((R) => R.isEditable), [t.segments]);
  e !== D && !t.isInvalid && (s = void 0);
  let I = Ee(), U = !t.isDisabled && !t.isReadOnly && e.isEditable, w = e.type === "literal" ? "" : i.of(e.type), j = Ot({ "aria-label": `${w}${o ? `, ${o}` : ""}${l ? ", " : ""}`, "aria-labelledby": l });
  if (e.type === "literal") return { segmentProps: { "aria-hidden": true } };
  let P = { caretColor: "transparent" };
  if (u === "rtl") {
    P.unicodeBidi = "embed";
    let R = $[e.type];
    (R === "numeric" || R === "2-digit") && (P.direction = "ltr");
  }
  return { segmentProps: Y(p, j, { id: I, ...Q, ...x, "aria-invalid": t.isInvalid ? "true" : void 0, "aria-describedby": s, "aria-readonly": t.isReadOnly || !e.isEditable ? "true" : void 0, "data-placeholder": e.isPlaceholder || void 0, contentEditable: U, suppressContentEditableWarning: U, spellCheck: U ? "false" : void 0, autoCorrect: U ? "off" : void 0, [parseInt(S.version, 10) >= 17 ? "enterKeyHint" : "enterkeyhint"]: U ? "next" : void 0, inputMode: t.isDisabled || e.type === "dayPeriod" || e.type === "era" || !U ? void 0 : "numeric", tabIndex: t.isDisabled ? void 0 : 0, onFocus: L, style: P, onPointerDown(R) {
    R.stopPropagation();
  }, onMouseDown(R) {
    R.stopPropagation();
  } }) };
}
function N3(e) {
  e.sort();
  let t = e[0], a = e[e.length - 1];
  for (let r = 0; r < t.length; r++) if (t[r] !== a[r]) return r;
  return 0;
}
var Ts = {};
Ts = { rangeOverflow: (e) => `\u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0627\u0644\u0642\u064A\u0645\u0629 ${e.maxValue} \u0623\u0648 \u0642\u0628\u0644 \u0630\u0644\u0643.`, rangeReversed: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0642\u0628\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621.", rangeUnderflow: (e) => `\u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0627\u0644\u0642\u064A\u0645\u0629 ${e.minValue} \u0623\u0648 \u0628\u0639\u062F \u0630\u0644\u0643.`, unavailableDate: "\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629." };
var As = {};
As = { rangeOverflow: (e) => `\u0421\u0442\u043E\u0439\u043D\u043E\u0441\u0442\u0442\u0430 \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0435 ${e.maxValue} \u0438\u043B\u0438 \u043F\u043E-\u0440\u0430\u043D\u043D\u0430.`, rangeReversed: "\u041D\u0430\u0447\u0430\u043B\u043D\u0430\u0442\u0430 \u0434\u0430\u0442\u0430 \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0435 \u043F\u0440\u0435\u0434\u0438 \u043A\u0440\u0430\u0439\u043D\u0430\u0442\u0430.", rangeUnderflow: (e) => `\u0421\u0442\u043E\u0439\u043D\u043E\u0441\u0442\u0442\u0430 \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0435 ${e.minValue} \u0438\u043B\u0438 \u043F\u043E-\u043A\u044A\u0441\u043D\u043E.`, unavailableDate: "\u0418\u0437\u0431\u0440\u0430\u043D\u0430\u0442\u0430 \u0434\u0430\u0442\u0430 \u043D\u0435 \u0435 \u043D\u0430\u043B\u0438\u0447\u043D\u0430." };
var ks = {};
ks = { rangeOverflow: (e) => `Hodnota mus\xED b\xFDt ${e.maxValue} nebo d\u0159\xEDv\u011Bj\u0161\xED.`, rangeReversed: "Datum zah\xE1jen\xED mus\xED p\u0159edch\xE1zet datu ukon\u010Den\xED.", rangeUnderflow: (e) => `Hodnota mus\xED b\xFDt ${e.minValue} nebo pozd\u011Bj\u0161\xED.`, unavailableDate: "Vybran\xE9 datum nen\xED k dispozici." };
var Ms = {};
Ms = { rangeOverflow: (e) => `V\xE6rdien skal v\xE6re ${e.maxValue} eller tidligere.`, rangeReversed: "Startdatoen skal v\xE6re f\xF8r slutdatoen.", rangeUnderflow: (e) => `V\xE6rdien skal v\xE6re ${e.minValue} eller nyere.`, unavailableDate: "Den valgte dato er ikke tilg\xE6ngelig." };
var Is = {};
Is = { rangeOverflow: (e) => `Der Wert muss ${e.maxValue} oder fr\xFCher sein.`, rangeReversed: "Das Startdatum muss vor dem Enddatum liegen.", rangeUnderflow: (e) => `Der Wert muss ${e.minValue} oder sp\xE4ter sein.`, unavailableDate: "Das ausgew\xE4hlte Datum ist nicht verf\xFCgbar." };
var Ns = {};
Ns = { rangeOverflow: (e) => `\u0397 \u03C4\u03B9\u03BC\u03AE \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 ${e.maxValue} \u03AE \u03C0\u03B1\u03BB\u03B1\u03B9\u03CC\u03C4\u03B5\u03C1\u03B7.`, rangeReversed: "\u0397 \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1 \u03AD\u03BD\u03B1\u03C1\u03BE\u03B7\u03C2 \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03C1\u03B9\u03BD \u03B1\u03C0\u03CC \u03C4\u03B7\u03BD \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1 \u03BB\u03AE\u03BE\u03B7\u03C2.", rangeUnderflow: (e) => `\u0397 \u03C4\u03B9\u03BC\u03AE \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 ${e.minValue} \u03AE \u03BC\u03B5\u03C4\u03B1\u03B3\u03B5\u03BD\u03AD\u03C3\u03C4\u03B5\u03C1\u03B7.`, unavailableDate: "\u0397 \u03B5\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03B7 \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1 \u03B4\u03B5\u03BD \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B4\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03B7." };
var Ls = {};
Ls = { rangeUnderflow: (e) => `Value must be ${e.minValue} or later.`, rangeOverflow: (e) => `Value must be ${e.maxValue} or earlier.`, rangeReversed: "Start date must be before end date.", unavailableDate: "Selected date unavailable." };
var Vs = {};
Vs = { rangeOverflow: (e) => `El valor debe ser ${e.maxValue} o anterior.`, rangeReversed: "La fecha de inicio debe ser anterior a la fecha de finalizaci\xF3n.", rangeUnderflow: (e) => `El valor debe ser ${e.minValue} o posterior.`, unavailableDate: "Fecha seleccionada no disponible." };
var Os = {};
Os = { rangeOverflow: (e) => `V\xE4\xE4rtus peab olema ${e.maxValue} v\xF5i varasem.`, rangeReversed: "Alguskuup\xE4ev peab olema enne l\xF5ppkuup\xE4eva.", rangeUnderflow: (e) => `V\xE4\xE4rtus peab olema ${e.minValue} v\xF5i hilisem.`, unavailableDate: "Valitud kuup\xE4ev pole saadaval." };
var Hs = {};
Hs = { rangeOverflow: (e) => `Arvon on oltava ${e.maxValue} tai sit\xE4 aikaisempi.`, rangeReversed: "Aloitusp\xE4iv\xE4n on oltava ennen lopetusp\xE4iv\xE4\xE4.", rangeUnderflow: (e) => `Arvon on oltava ${e.minValue} tai sit\xE4 my\xF6h\xE4isempi.`, unavailableDate: "Valittu p\xE4iv\xE4m\xE4\xE4r\xE4 ei ole k\xE4ytett\xE4viss\xE4." };
var Us = {};
Us = { rangeOverflow: (e) => `La valeur doit \xEAtre ${e.maxValue} ou ant\xE9rieure.`, rangeReversed: "La date de d\xE9but doit \xEAtre ant\xE9rieure \xE0 la date de fin.", rangeUnderflow: (e) => `La valeur doit \xEAtre ${e.minValue} ou ult\xE9rieure.`, unavailableDate: "La date s\xE9lectionn\xE9e n\u2019est pas disponible." };
var zs = {};
zs = { rangeOverflow: (e) => `\u05D4\u05E2\u05E8\u05DA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA ${e.maxValue} \u05D0\u05D5 \u05DE\u05D5\u05E7\u05D3\u05DD \u05D9\u05D5\u05EA\u05E8.`, rangeReversed: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D4\u05EA\u05D7\u05DC\u05D4 \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DC\u05E4\u05E0\u05D9 \u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05E1\u05D9\u05D5\u05DD.", rangeUnderflow: (e) => `\u05D4\u05E2\u05E8\u05DA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA ${e.minValue} \u05D0\u05D5 \u05DE\u05D0\u05D5\u05D7\u05E8 \u05D9\u05D5\u05EA\u05E8.`, unavailableDate: "\u05D4\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05E0\u05D1\u05D7\u05E8 \u05D0\u05D9\u05E0\u05D5 \u05D6\u05DE\u05D9\u05DF." };
var js = {};
js = { rangeOverflow: (e) => `Vrijednost mora biti ${e.maxValue} ili ranije.`, rangeReversed: "Datum po\u010Detka mora biti prije datuma zavr\u0161etka.", rangeUnderflow: (e) => `Vrijednost mora biti ${e.minValue} ili kasnije.`, unavailableDate: "Odabrani datum nije dostupan." };
var Ks = {};
Ks = { rangeOverflow: (e) => `Az \xE9rt\xE9knek ${e.maxValue} vagy kor\xE1bbinak kell lennie.`, rangeReversed: "A kezd\u0151 d\xE1tumnak a befejez\u0151 d\xE1tumn\xE1l kor\xE1bbinak kell lennie.", rangeUnderflow: (e) => `Az \xE9rt\xE9knek ${e.minValue} vagy k\xE9s\u0151bbinek kell lennie.`, unavailableDate: "A kiv\xE1lasztott d\xE1tum nem \xE9rhet\u0151 el." };
var _s = {};
_s = { rangeOverflow: (e) => `Il valore deve essere ${e.maxValue} o precedente.`, rangeReversed: "La data di inizio deve essere antecedente alla data di fine.", rangeUnderflow: (e) => `Il valore deve essere ${e.minValue} o successivo.`, unavailableDate: "Data selezionata non disponibile." };
var Ws = {};
Ws = { rangeOverflow: (e) => `\u5024\u306F ${e.maxValue} \u4EE5\u4E0B\u306B\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002`, rangeReversed: "\u958B\u59CB\u65E5\u306F\u7D42\u4E86\u65E5\u3088\u308A\u524D\u306B\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002", rangeUnderflow: (e) => `\u5024\u306F ${e.minValue} \u4EE5\u4E0A\u306B\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002`, unavailableDate: "\u9078\u629E\u3057\u305F\u65E5\u4ED8\u306F\u4F7F\u7528\u3067\u304D\u307E\u305B\u3093\u3002" };
var Zs = {};
Zs = { rangeOverflow: (e) => `\uAC12\uC740 ${e.maxValue} \uC774\uC804\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.`, rangeReversed: "\uC2DC\uC791\uC77C\uC740 \uC885\uB8CC\uC77C \uC774\uC804\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.", rangeUnderflow: (e) => `\uAC12\uC740 ${e.minValue} \uC774\uD6C4\uC5EC\uC57C \uD569\uB2C8\uB2E4.`, unavailableDate: "\uC120\uD0DD\uD55C \uB0A0\uC9DC\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." };
var Gs = {};
Gs = { rangeOverflow: (e) => `Reik\u0161m\u0117 turi b\u016Bti ${e.maxValue} arba ankstesn\u0117.`, rangeReversed: "Prad\u017Eios data turi b\u016Bti ankstesn\u0117 nei pabaigos data.", rangeUnderflow: (e) => `Reik\u0161m\u0117 turi b\u016Bti ${e.minValue} arba naujesn\u0117.`, unavailableDate: "Pasirinkta data nepasiekiama." };
var Ys = {};
Ys = { rangeOverflow: (e) => `V\u0113rt\u012Bbai ir j\u0101b\u016Bt ${e.maxValue} vai agr\u0101kai.`, rangeReversed: "S\u0101kuma datumam ir j\u0101b\u016Bt pirms beigu datuma.", rangeUnderflow: (e) => `V\u0113rt\u012Bbai ir j\u0101b\u016Bt ${e.minValue} vai v\u0113l\u0101kai.`, unavailableDate: "Atlas\u012Btais datums nav pieejams." };
var Js = {};
Js = { rangeOverflow: (e) => `Verdien m\xE5 v\xE6re ${e.maxValue} eller tidligere.`, rangeReversed: "Startdatoen m\xE5 v\xE6re f\xF8r sluttdatoen.", rangeUnderflow: (e) => `Verdien m\xE5 v\xE6re ${e.minValue} eller senere.`, unavailableDate: "Valgt dato utilgjengelig." };
var qs = {};
qs = { rangeOverflow: (e) => `Waarde moet ${e.maxValue} of eerder zijn.`, rangeReversed: "De startdatum moet voor de einddatum liggen.", rangeUnderflow: (e) => `Waarde moet ${e.minValue} of later zijn.`, unavailableDate: "Geselecteerde datum niet beschikbaar." };
var Qs = {};
Qs = { rangeOverflow: (e) => `Warto\u015B\u0107 musi mie\u0107 warto\u015B\u0107 ${e.maxValue} lub wcze\u015Bniejsz\u0105.`, rangeReversed: "Data rozpocz\u0119cia musi by\u0107 wcze\u015Bniejsza ni\u017C data zako\u0144czenia.", rangeUnderflow: (e) => `Warto\u015B\u0107 musi mie\u0107 warto\u015B\u0107 ${e.minValue} lub p\xF3\u017Aniejsz\u0105.`, unavailableDate: "Wybrana data jest niedost\u0119pna." };
var Xs = {};
Xs = { rangeOverflow: (e) => `O valor deve ser ${e.maxValue} ou anterior.`, rangeReversed: "A data inicial deve ser anterior \xE0 data final.", rangeUnderflow: (e) => `O valor deve ser ${e.minValue} ou posterior.`, unavailableDate: "Data selecionada indispon\xEDvel." };
var ed = {};
ed = { rangeOverflow: (e) => `O valor tem de ser ${e.maxValue} ou anterior.`, rangeReversed: "A data de in\xEDcio deve ser anterior \xE0 data de fim.", rangeUnderflow: (e) => `O valor tem de ser ${e.minValue} ou posterior.`, unavailableDate: "Data selecionada indispon\xEDvel." };
var td = {};
td = { rangeOverflow: (e) => `Valoarea trebuie s\u0103 fie ${e.maxValue} sau anterioar\u0103.`, rangeReversed: "Data de \xEEnceput trebuie s\u0103 fie anterioar\u0103 datei de sf\xE2r\u0219it.", rangeUnderflow: (e) => `Valoarea trebuie s\u0103 fie ${e.minValue} sau ulterioar\u0103.`, unavailableDate: "Data selectat\u0103 nu este disponibil\u0103." };
var ad = {};
ad = { rangeOverflow: (e) => `\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043D\u0435 \u043F\u043E\u0437\u0436\u0435 ${e.maxValue}.`, rangeReversed: "\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u043F\u0440\u0435\u0434\u0448\u0435\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0434\u0430\u0442\u0435 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F.", rangeUnderflow: (e) => `\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043D\u0435 \u0440\u0430\u043D\u044C\u0448\u0435 ${e.minValue}.`, unavailableDate: "\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u0430\u044F \u0434\u0430\u0442\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430." };
var rd = {};
rd = { rangeOverflow: (e) => `Hodnota mus\xED by\u0165 ${e.maxValue} alebo skor\u0161ia.`, rangeReversed: "D\xE1tum za\u010Diatku mus\xED by\u0165 skor\u0161\xED ako d\xE1tum konca.", rangeUnderflow: (e) => `Hodnota mus\xED by\u0165 ${e.minValue} alebo neskor\u0161ia.`, unavailableDate: "Vybrat\xFD d\xE1tum je nedostupn\xFD." };
var nd = {};
nd = { rangeOverflow: (e) => `Vrednost mora biti ${e.maxValue} ali starej\u0161a.`, rangeReversed: "Za\u010Detni datum mora biti pred kon\u010Dnim datumom.", rangeUnderflow: (e) => `Vrednost mora biti ${e.minValue} ali novej\u0161a.`, unavailableDate: "Izbrani datum ni na voljo." };
var ud = {};
ud = { rangeOverflow: (e) => `Vrednost mora da bude ${e.maxValue} ili starija.`, rangeReversed: "Datum po\u010Detka mora biti pre datuma zavr\u0161etka.", rangeUnderflow: (e) => `Vrednost mora da bude ${e.minValue} ili novija.`, unavailableDate: "Izabrani datum nije dostupan." };
var id = {};
id = { rangeOverflow: (e) => `V\xE4rdet m\xE5ste vara ${e.maxValue} eller tidigare.`, rangeReversed: "Startdatumet m\xE5ste vara f\xF6re slutdatumet.", rangeUnderflow: (e) => `V\xE4rdet m\xE5ste vara ${e.minValue} eller senare.`, unavailableDate: "Det valda datumet \xE4r inte tillg\xE4ngligt." };
var od = {};
od = { rangeOverflow: (e) => `De\u011Fer, ${e.maxValue} veya \xF6ncesi olmal\u0131d\u0131r.`, rangeReversed: "Ba\u015Flang\u0131\xE7 tarihi biti\u015F tarihinden \xF6nce olmal\u0131d\u0131r.", rangeUnderflow: (e) => `De\u011Fer, ${e.minValue} veya sonras\u0131 olmal\u0131d\u0131r.`, unavailableDate: "Se\xE7ilen tarih kullan\u0131lam\u0131yor." };
var ld = {};
ld = { rangeOverflow: (e) => `\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u043C\u0430\u0454 \u0431\u0443\u0442\u0438 \u043D\u0435 \u043F\u0456\u0437\u043D\u0456\u0448\u0435 ${e.maxValue}.`, rangeReversed: "\u0414\u0430\u0442\u0430 \u043F\u043E\u0447\u0430\u0442\u043A\u0443 \u043C\u0430\u0454 \u043F\u0435\u0440\u0435\u0434\u0443\u0432\u0430\u0442\u0438 \u0434\u0430\u0442\u0456 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F.", rangeUnderflow: (e) => `\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u043C\u0430\u0454 \u0431\u0443\u0442\u0438 \u043D\u0435 \u0440\u0430\u043D\u0456\u0448\u0435 ${e.minValue}.`, unavailableDate: "\u0412\u0438\u0431\u0440\u0430\u043D\u0430 \u0434\u0430\u0442\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430." };
var sd = {};
sd = { rangeOverflow: (e) => `\u503C\u5FC5\u987B\u662F ${e.maxValue} \u6216\u66F4\u65E9\u65E5\u671F\u3002`, rangeReversed: "\u5F00\u59CB\u65E5\u671F\u5FC5\u987B\u65E9\u4E8E\u7ED3\u675F\u65E5\u671F\u3002", rangeUnderflow: (e) => `\u503C\u5FC5\u987B\u662F ${e.minValue} \u6216\u66F4\u665A\u65E5\u671F\u3002`, unavailableDate: "\u6240\u9009\u65E5\u671F\u4E0D\u53EF\u7528\u3002" };
var dd = {};
dd = { rangeOverflow: (e) => `\u503C\u5FC5\u9808\u662F ${e.maxValue} \u6216\u66F4\u65E9\u3002`, rangeReversed: "\u958B\u59CB\u65E5\u671F\u5FC5\u9808\u5728\u7D50\u675F\u65E5\u671F\u4E4B\u524D\u3002", rangeUnderflow: (e) => `\u503C\u5FC5\u9808\u662F ${e.minValue} \u6216\u66F4\u665A\u3002`, unavailableDate: "\u6240\u9078\u65E5\u671F\u7121\u6CD5\u4F7F\u7528\u3002" };
var cd = {};
cd = { "ar-AE": Ts, "bg-BG": As, "cs-CZ": ks, "da-DK": Ms, "de-DE": Is, "el-GR": Ns, "en-US": Ls, "es-ES": Vs, "et-EE": Os, "fi-FI": Hs, "fr-FR": Us, "he-IL": zs, "hr-HR": js, "hu-HU": Ks, "it-IT": _s, "ja-JP": Ws, "ko-KR": Zs, "lt-LT": Gs, "lv-LV": Ys, "nb-NO": Js, "nl-NL": qs, "pl-PL": Qs, "pt-BR": Xs, "pt-PT": ed, "ro-RO": td, "ru-RU": ad, "sk-SK": rd, "sl-SI": nd, "sr-SP": ud, "sv-SE": id, "tr-TR": od, "uk-UA": ld, "zh-CN": sd, "zh-TW": dd };
function L3(e) {
  return e && e.__esModule ? e.default : e;
}
const V3 = new at(L3(cd));
function O3() {
  let e = typeof navigator < "u" && (navigator.language || navigator.userLanguage) || "en-US";
  try {
    Intl.DateTimeFormat.supportedLocalesOf([e]);
  } catch {
    e = "en-US";
  }
  return e;
}
function fd(e, t, a, r, n) {
  let u = e != null && a != null && e.compare(a) > 0, i = e != null && t != null && e.compare(t) < 0, o = e != null && (r == null ? void 0 : r(e)) || false, l = u || i || o, s = [];
  if (l) {
    let d = O3(), f = at.getGlobalDictionaryForPackage("@react-stately/datepicker") || V3, $ = new zu(d, f), m = new Fe(d, mt({}, n)), b = m.resolvedOptions().timeZone;
    i && t != null && s.push($.format("rangeUnderflow", { minValue: m.format(t.toDate(b)) })), u && a != null && s.push($.format("rangeOverflow", { maxValue: m.format(a.toDate(b)) })), o && s.push($.format("unavailableDate"));
  }
  return { isInvalid: l, validationErrors: s, validationDetails: { badInput: o, customError: false, patternMismatch: false, rangeOverflow: u, rangeUnderflow: i, stepMismatch: false, tooLong: false, tooShort: false, typeMismatch: false, valueMissing: false, valid: !l } };
}
const H3 = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "2-digit", second: "2-digit" }, U3 = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" };
function mt(e, t) {
  e = { ...t.shouldForceLeadingZeros ? U3 : H3, ...e };
  let r = t.granularity || "minute", n = Object.keys(e), u = n.indexOf(t.maxGranularity ?? "year");
  u < 0 && (u = 0);
  let i = n.indexOf(r);
  if (i < 0 && (i = 2), u > i) throw new Error("maxGranularity must be greater than granularity");
  let o = n.slice(u, i + 1).reduce((s, d) => (s[d] = e[d], s), {});
  return t.hourCycle != null && (o.hour12 = t.hourCycle === 12), o.timeZone = t.timeZone || "UTC", (r === "hour" || r === "minute" || r === "second") && t.timeZone && !t.hideTimeZone && (o.timeZoneName = "short"), t.showEra && u === 0 && (o.era = "short"), o;
}
function Eu(e) {
  return e && "hour" in e ? e : new un();
}
function md(e, t) {
  if (e === null) return null;
  if (e) return ee(e, t);
}
function z3(e, t, a, r) {
  if (e) return md(e, a);
  let n = ee(Oi(r ?? Fa()).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }), a);
  return t === "year" || t === "month" || t === "day" ? he(n) : r ? n : Re(n);
}
function $d(e, t) {
  let a = e && "timeZone" in e ? e.timeZone : void 0, r = e && "minute" in e ? "minute" : "day";
  if (e && t && !(t in e)) throw new Error("Invalid granularity " + t + " for value " + e.toString());
  let [n, u] = c.useState([r, a]);
  e && (n[0] !== r || n[1] !== a) && u([r, a]), t || (t = e ? r : n[0]);
  let i = e ? a : n[1];
  return [t, i];
}
const j3 = new at({ ach: { year: "mwaka", month: "dwe", day: "nino" }, af: { year: "jjjj", month: "mm", day: "dd" }, am: { year: "\u12D3\u12D3\u12D3\u12D3", month: "\u121A\u121C", day: "\u1240\u1240" }, an: { year: "aaaa", month: "mm", day: "dd" }, ar: { year: "\u0633\u0646\u0629", month: "\u0634\u0647\u0631", day: "\u064A\u0648\u0645" }, ast: { year: "aaaa", month: "mm", day: "dd" }, az: { year: "iiii", month: "aa", day: "gg" }, be: { year: "\u0433\u0433\u0433\u0433", month: "\u043C\u043C", day: "\u0434\u0434" }, bg: { year: "\u0433\u0433\u0433\u0433", month: "\u043C\u043C", day: "\u0434\u0434" }, bn: { year: "yyyy", month: "\u09AE\u09BF\u09AE\u09BF", day: "dd" }, br: { year: "bbbb", month: "mm", day: "dd" }, bs: { year: "gggg", month: "mm", day: "dd" }, ca: { year: "aaaa", month: "mm", day: "dd" }, cak: { year: "jjjj", month: "ii", day: "q'q'" }, ckb: { year: "\u0633\u0627\u06B5", month: "\u0645\u0627\u0646\u06AF", day: "\u0695\u06C6\u0698" }, cs: { year: "rrrr", month: "mm", day: "dd" }, cy: { year: "bbbb", month: "mm", day: "dd" }, da: { year: "\xE5\xE5\xE5\xE5", month: "mm", day: "dd" }, de: { year: "jjjj", month: "mm", day: "tt" }, dsb: { year: "llll", month: "mm", day: "\u017A\u017A" }, el: { year: "\u03B5\u03B5\u03B5\u03B5", month: "\u03BC\u03BC", day: "\u03B7\u03B7" }, en: { year: "yyyy", month: "mm", day: "dd" }, eo: { year: "jjjj", month: "mm", day: "tt" }, es: { year: "aaaa", month: "mm", day: "dd" }, et: { year: "aaaa", month: "kk", day: "pp" }, eu: { year: "uuuu", month: "hh", day: "ee" }, fa: { year: "\u0633\u0627\u0644", month: "\u0645\u0627\u0647", day: "\u0631\u0648\u0632" }, ff: { year: "hhhh", month: "ll", day: "\xF1\xF1" }, fi: { year: "vvvv", month: "kk", day: "pp" }, fr: { year: "aaaa", month: "mm", day: "jj" }, fy: { year: "jjjj", month: "mm", day: "dd" }, ga: { year: "bbbb", month: "mm", day: "ll" }, gd: { year: "bbbb", month: "mm", day: "ll" }, gl: { year: "aaaa", month: "mm", day: "dd" }, he: { year: "\u05E9\u05E0\u05D4", month: "\u05D7\u05D5\u05D3\u05E9", day: "\u05D9\u05D5\u05DD" }, hr: { year: "gggg", month: "mm", day: "dd" }, hsb: { year: "llll", month: "mm", day: "dd" }, hu: { year: "\xE9\xE9\xE9\xE9", month: "hh", day: "nn" }, ia: { year: "aaaa", month: "mm", day: "dd" }, id: { year: "tttt", month: "bb", day: "hh" }, is: { year: "\xE1\xE1\xE1\xE1", month: "mm", day: "dd" }, it: { year: "aaaa", month: "mm", day: "gg" }, ja: { year: "\u5E74", month: "\u6708", day: "\u65E5" }, ka: { year: "\u10EC\u10EC\u10EC\u10EC", month: "\u10D7\u10D7", day: "\u10E0\u10E0" }, kk: { year: "\u0436\u0436\u0436\u0436", month: "\u0430\u0430", day: "\u043A\u043A" }, kn: { year: "\u0CB5\u0CB5\u0CB5\u0CB5", month: "\u0CAE\u0CBF\u0CAE\u0CC0", day: "\u0CA6\u0CBF\u0CA6\u0CBF" }, ko: { year: "\uC5F0\uB3C4", month: "\uC6D4", day: "\uC77C" }, lb: { year: "jjjj", month: "mm", day: "dd" }, lo: { year: "\u0E9B\u0E9B\u0E9B\u0E9B", month: "\u0E94\u0E94", day: "\u0EA7\u0EA7" }, lt: { year: "mmmm", month: "mm", day: "dd" }, lv: { year: "gggg", month: "mm", day: "dd" }, meh: { year: "aaaa", month: "mm", day: "dd" }, ml: { year: "\u0D35\u0D7C\u0D37\u0D02", month: "\u0D2E\u0D3E\u0D38\u0D02", day: "\u0D24\u0D40\u0D2F\u0D24\u0D3F" }, ms: { year: "tttt", month: "mm", day: "hh" }, nb: { year: "\xE5\xE5\xE5\xE5", month: "mm", day: "dd" }, nl: { year: "jjjj", month: "mm", day: "dd" }, nn: { year: "\xE5\xE5\xE5\xE5", month: "mm", day: "dd" }, no: { year: "\xE5\xE5\xE5\xE5", month: "mm", day: "dd" }, oc: { year: "aaaa", month: "mm", day: "jj" }, pl: { year: "rrrr", month: "mm", day: "dd" }, pt: { year: "aaaa", month: "mm", day: "dd" }, rm: { year: "oooo", month: "mm", day: "dd" }, ro: { year: "aaaa", month: "ll", day: "zz" }, ru: { year: "\u0433\u0433\u0433\u0433", month: "\u043C\u043C", day: "\u0434\u0434" }, sc: { year: "aaaa", month: "mm", day: "dd" }, scn: { year: "aaaa", month: "mm", day: "jj" }, sk: { year: "rrrr", month: "mm", day: "dd" }, sl: { year: "llll", month: "mm", day: "dd" }, sr: { year: "\u0433\u0433\u0433\u0433", month: "\u043C\u043C", day: "\u0434\u0434" }, "sr-Latn": { year: "gggg", month: "mm", day: "dd" }, sv: { year: "\xE5\xE5\xE5\xE5", month: "mm", day: "dd" }, szl: { year: "rrrr", month: "mm", day: "dd" }, tg: { year: "\u0441\u0441\u0441\u0441", month: "\u043C\u043C", day: "\u0440\u0440" }, th: { year: "\u0E1B\u0E1B\u0E1B\u0E1B", month: "\u0E14\u0E14", day: "\u0E27\u0E27" }, tr: { year: "yyyy", month: "aa", day: "gg" }, uk: { year: "\u0440\u0440\u0440\u0440", month: "\u043C\u043C", day: "\u0434\u0434" }, "zh-CN": { year: "\u5E74", month: "\u6708", day: "\u65E5" }, "zh-TW": { year: "\u5E74", month: "\u6708", day: "\u65E5" } }, "en");
function K3(e, t, a) {
  return e === "era" || e === "dayPeriod" ? t : e === "year" || e === "month" || e === "day" ? j3.getStringForLocale(e, a) : "\u2013\u2013";
}
class De {
  constructor(t, a, r) {
    if (this.era = (r == null ? void 0 : r.era) ?? null, this.calendar = t, this.year = (r == null ? void 0 : r.year) ?? null, this.month = (r == null ? void 0 : r.month) ?? null, this.day = (r == null ? void 0 : r.day) ?? null, this.hour = (r == null ? void 0 : r.hour) ?? null, this.hourCycle = a, this.dayPeriod = null, this.minute = (r == null ? void 0 : r.minute) ?? null, this.second = (r == null ? void 0 : r.second) ?? null, this.millisecond = (r == null ? void 0 : r.millisecond) ?? null, this.offset = "offset" in (r ?? {}) ? r.offset : null, this.hour != null) {
      let [n, u] = ut(this.hour, a);
      this.dayPeriod = n, this.hour = u;
    }
  }
  copy() {
    let t = new De(this.calendar, this.hourCycle);
    return t.era = this.era, t.year = this.year, t.month = this.month, t.day = this.day, t.hour = this.hour, t.dayPeriod = this.dayPeriod, t.minute = this.minute, t.second = this.second, t.millisecond = this.millisecond, t.offset = this.offset, t;
  }
  isComplete(t) {
    return t.every((a) => this[a] != null);
  }
  validate(t, a) {
    return a.every((r) => {
      if ((r === "hour" || r === "dayPeriod") && "hour" in t) {
        let [n, u] = ut(t.hour, this.hourCycle);
        return this.dayPeriod === n && this.hour === u;
      }
      return this[r] === t[r];
    });
  }
  isCleared(t) {
    return t.every((a) => this[a] === null);
  }
  set(t, a, r) {
    let n = this.copy();
    return n[t] = a, t === "hour" && n.dayPeriod == null && "hour" in r && (n.dayPeriod = ut(r.hour, this.hourCycle)[0]), t === "year" && n.era == null && (n.era = r.era), t !== "second" && t !== "literal" && t !== "timeZoneName" && (n.offset = null), n;
  }
  clear(t) {
    let a = this.copy();
    return a[t] = null, t === "year" && (a.era = null), a.offset = null, a;
  }
  cycle(t, a, r, n) {
    let u = this.copy();
    if (u[t] == null && t !== "dayPeriod" && t !== "era") {
      if (t === "hour" && "hour" in r) {
        let [i, o] = ut(r.hour, this.hourCycle);
        u.dayPeriod = i, u.hour = o;
      } else u[t] = r[t];
      return t === "year" && u.era == null && (u.era = r.era), u;
    }
    switch (t) {
      case "era": {
        let i = this.calendar.getEras(), o = i.indexOf(u.era);
        o = ze(o, a, 0, i.length - 1), u.era = i[o];
        break;
      }
      case "year": {
        let i = new ae(this.calendar, this.era ?? r.era, this.year ?? r.year, this.month ?? 1, this.day ?? 1);
        i = i.cycle(t, a, { round: t === "year" }), u.era = i.era, u.year = i.year;
        break;
      }
      case "month":
        u.month = ze(u.month ?? 1, a, 1, this.calendar.getMaximumMonthsInYear());
        break;
      case "day":
        u.day = ze(u.day ?? 1, a, 1, this.calendar.getMaximumDaysInMonth());
        break;
      case "hour": {
        let i = n.some((o) => ["year", "month", "day"].includes(o));
        if ("timeZone" in r && (!i || u.year != null && u.month != null && u.day != null)) {
          let o = this.toValue(r);
          o = o.cycle("hour", a, { hourCycle: this.hourCycle === "h12" ? 12 : 24, round: false });
          let [l, s] = ut(o.hour, this.hourCycle);
          u.hour = s, u.dayPeriod = l, u.offset = o.offset;
        } else {
          let o = u.hour ?? 0, l = this.getSegmentLimits("hour");
          u.hour = ze(o, a, l.minValue, l.maxValue), u.dayPeriod == null && "hour" in r && (u.dayPeriod = ut(r.hour, this.hourCycle)[0]);
        }
        break;
      }
      case "dayPeriod":
        u.dayPeriod = ze(u.dayPeriod ?? 0, a, 0, 1);
        break;
      case "minute":
        u.minute = ze(u.minute ?? 0, a, 0, 59, true);
        break;
      case "second":
        u.second = ze(u.second ?? 0, a, 0, 59, true);
        break;
    }
    return u;
  }
  toValue(t) {
    if ("hour" in t) {
      let a = this.hour;
      a != null ? a = _3(a, this.dayPeriod ?? 0, this.hourCycle) : (this.hourCycle === "h12" || this.hourCycle === "h11") && (a = this.dayPeriod === 1 ? 12 : 0);
      let r = t.set({ era: this.era ?? t.era, year: this.year ?? t.year, month: this.month ?? t.month, day: this.day ?? t.day, hour: a ?? t.hour, minute: this.minute ?? t.minute, second: this.second ?? t.second, millisecond: this.millisecond ?? t.millisecond });
      return "offset" in r && this.offset != null && r.offset !== this.offset && (r = r.add({ milliseconds: r.offset - this.offset })), r;
    } else return t.set({ era: this.era ?? t.era, year: this.year ?? t.year, month: this.month ?? t.month, day: this.day ?? t.day });
  }
  getSegmentLimits(t) {
    switch (t) {
      case "era": {
        let a = this.calendar.getEras();
        return { value: this.era != null ? a.indexOf(this.era) : a.length - 1, minValue: 0, maxValue: a.length - 1 };
      }
      case "year":
        return { value: this.year, minValue: 1, maxValue: 9999 };
      case "month":
        return { value: this.month, minValue: 1, maxValue: this.calendar.getMaximumMonthsInYear() };
      case "day":
        return { value: this.day, minValue: 1, maxValue: this.calendar.getMaximumDaysInMonth() };
      case "dayPeriod":
        return { value: this.dayPeriod, minValue: 0, maxValue: 1 };
      case "hour": {
        let a = 0, r = 23;
        return this.hourCycle === "h12" ? (a = 1, r = 12) : this.hourCycle === "h11" && (a = 0, r = 11), { value: this.hour, minValue: a, maxValue: r };
      }
      case "minute":
        return { value: this.minute, minValue: 0, maxValue: 59 };
      case "second":
        return { value: this.second, minValue: 0, maxValue: 59 };
    }
  }
}
function ze(e, t, a, r, n = false) {
  if (n) {
    e += Math.sign(t), e < a && (e = r);
    let u = Math.abs(t);
    t > 0 ? e = Math.ceil(e / u) * u : e = Math.floor(e / u) * u, e > r && (e = a);
  } else e += t, e < a ? e = r - (a - e - 1) : e > r && (e = a + (e - r - 1));
  return e;
}
function ut(e, t) {
  let a = e >= 12 ? 1 : 0;
  switch (t) {
    case "h11":
      e >= 12 && (e -= 12);
      break;
    case "h12":
      e === 0 ? e = 12 : e > 12 && (e -= 12);
      break;
    case "h23":
      a = null;
      break;
    case "h24":
      e += 1, a = null;
  }
  return [a, e];
}
function _3(e, t, a) {
  switch (a) {
    case "h11":
      t === 1 && (e += 12);
      break;
    case "h12":
      e === 12 && (e = 0), t === 1 && (e += 12);
      break;
    case "h24":
      e -= 1;
      break;
  }
  return e;
}
const sr = { year: true, month: true, day: true, hour: true, minute: true, second: true, dayPeriod: true, era: true }, Cu = { year: 5, month: 2, day: 7, hour: 2, minute: 15, second: 15 }, W3 = { dayperiod: "dayPeriod", relatedYear: "year", yearName: "literal", unknown: "literal" };
function Z3(e) {
  let { locale: t, createCalendar: a, hideTimeZone: r, isDisabled: n = false, isReadOnly: u = false, isRequired: i = false, minValue: o, maxValue: l, isDateUnavailable: s } = e, d = e.value || e.defaultValue || e.placeholderValue || null, [f, $] = $d(d, e.granularity), m = $ || "UTC";
  if (d && !(f in d)) throw new Error("Invalid granularity " + f + " for value " + d.toString());
  let [b, p] = c.useMemo(() => {
    let z = new Fe(t, { dateStyle: "short", timeStyle: "short", hour12: e.hourCycle != null ? e.hourCycle === 12 : void 0 }).resolvedOptions();
    return [a(z.calendar), z.hourCycle];
  }, [t, e.hourCycle, a]), [h, y] = Ft(e.value, e.defaultValue ?? null, e.onChange), [x] = c.useState(h), v = c.useMemo(() => md(h, b) ?? null, [h, b]), [g, E] = c.useState(() => new De(b, p, v)), B = b.identifier === "gregory" && g.era === "BC", A = c.useMemo(() => ({ granularity: f, maxGranularity: e.maxGranularity ?? "year", timeZone: $, hideTimeZone: r, hourCycle: e.hourCycle, showEra: B, shouldForceLeadingZeros: e.shouldForceLeadingZeros }), [e.maxGranularity, f, e.hourCycle, e.shouldForceLeadingZeros, $, r, B]), k = c.useMemo(() => mt({}, A), [A]), M = c.useMemo(() => new Fe(t, k), [t, k]), L = c.useMemo(() => M.resolvedOptions(), [M]), C = c.useMemo(() => z3(e.placeholderValue, f, b, $), [e.placeholderValue, f, b, $]), N = c.useMemo(() => {
    let T = p === "h11" || p === "h12", z = ["era", "year", "month", "day", "hour", ...T ? ["dayPeriod"] : [], "minute", "second"], le = z.indexOf(e.maxGranularity || "era"), rt = z.indexOf(f === "hour" && T ? "dayPeriod" : f);
    return z.slice(le, rt + 1);
  }, [e.maxGranularity, f, p]), [Q, D] = c.useState(v), [I, U] = c.useState(b), [w, j] = c.useState(p);
  (v !== Q || p !== w || !Ba(b, I)) && (g = new De(b, p, v), D(v), U(b), j(p), E(g));
  let P = (T) => {
    if (!(e.isDisabled || e.isReadOnly)) if (T == null || T instanceof De && T.isCleared(N)) E(new De(b, p, v)), y(null);
    else if (!(T instanceof De)) T = ee(T, (d == null ? void 0 : d.calendar) || new se()), E(new De(b, p, v)), y(T);
    else {
      if (T.isComplete(N)) {
        let z = T.toValue(v ?? C);
        if (T.validate(z, N)) {
          let le = ee(z, (d == null ? void 0 : d.calendar) || new se());
          if (!h || le.compare(h) !== 0) {
            E(new De(b, p, v)), y(le);
            return;
          }
        }
      }
      E(T);
    }
  }, R = c.useMemo(() => g.toValue(v ?? C).toDate(m), [g, m, v, C]), O = c.useMemo(() => G3(R, g, M, L, b, t, f), [R, M, L, g, b, t, f]), K = (T, z) => {
    P(g.cycle(T, z, C, N));
  }, H = c.useMemo(() => fd(h, o, l, s, A), [h, o, l, s, A]), F = vo({ ...e, value: h, builtinValidation: H }), G = F.displayValidation.isInvalid, J = e.validationState || (G ? "invalid" : null);
  return { ...F, value: v, defaultValue: e.defaultValue ?? x, dateValue: R, calendar: b, setValue: P, segments: O, dateFormatter: M, validationState: J, isInvalid: G, granularity: f, maxGranularity: e.maxGranularity ?? "year", isDisabled: n, isReadOnly: u, isRequired: i, increment(T) {
    K(T, 1);
  }, decrement(T) {
    K(T, -1);
  }, incrementPage(T) {
    K(T, Cu[T] || 1);
  }, decrementPage(T) {
    K(T, -(Cu[T] || 1));
  }, incrementToMax(T) {
    let z = T === "hour" && p === "h12" ? 11 : g.getSegmentLimits(T).maxValue;
    P(g.set(T, z, C));
  }, decrementToMin(T) {
    let z = T === "hour" && p === "h12" ? 12 : g.getSegmentLimits(T).minValue;
    P(g.set(T, z, C));
  }, setSegment(T, z) {
    P(g.set(T, z, C));
  }, confirmPlaceholder() {
    if (!(e.isDisabled || e.isReadOnly) && g.isComplete(N)) {
      let T = g.toValue(v ?? C), z = ee(T, (d == null ? void 0 : d.calendar) || new se());
      (!h || z.compare(h) !== 0) && y(z), E(new De(b, p, v));
    }
  }, clearSegment(T) {
    let z = g;
    T !== "timeZoneName" && T !== "literal" && (z = g.clear(T)), P(z);
  }, formatValue(T) {
    if (!v) return "";
    let z = mt(T, A);
    return new Fe(t, z).format(R);
  }, getDateFormatter(T, z) {
    let le = { ...A, ...z }, rt = mt({}, le);
    return new Fe(T, rt);
  } };
}
function G3(e, t, a, r, n, u, i) {
  let o = ["hour", "minute", "second"], l = a.formatToParts(e), s = new Dr(u, { useGrouping: false }), d = new Dr(u, { useGrouping: false, minimumIntegerDigits: 2 });
  for (let $ of l) if ($.type === "year" || $.type === "month" || $.type === "day" || $.type === "hour") {
    let m = t[$.type] ?? 0;
    r[$.type] === "2-digit" ? $.value = d.format(m) : $.value = s.format(m);
  }
  let f = [];
  for (let $ of l) {
    let m = W3[$.type] || $.type, b = sr[m];
    m === "era" && n.getEras().length === 1 && (b = false);
    let p = sr[m] && t[$.type] == null, h = sr[m] ? K3(m, $.value, u) : null, y = { type: m, text: p ? h : $.value, ...t.getSegmentLimits(m), isPlaceholder: p, placeholder: h, isEditable: b };
    m === "hour" ? (f.push({ type: "literal", text: "\u2066", isPlaceholder: false, placeholder: "", isEditable: false }), f.push(y), m === i && f.push({ type: "literal", text: "\u2069", isPlaceholder: false, placeholder: "", isEditable: false })) : o.includes(m) && m === i ? (f.push(y), f.push({ type: "literal", text: "\u2069", isPlaceholder: false, placeholder: "", isEditable: false })) : f.push(y);
  }
  return f;
}
const bd = c.createContext(null), La = c.createContext(null), hn = c.createContext(null), mm = c.forwardRef(function(t, a) {
  let r = c.useContext(La), n = c.useContext(hn);
  return r || n ? S.createElement(hd, { ...t, ref: a }) : S.createElement(Y3, { ...t, ref: a });
}), Y3 = c.forwardRef((e, t) => {
  let [a, r] = Ce({ slot: e.slot }, t, bd), { locale: n } = me(), u = Z3({ ...a, locale: n, createCalendar: $o }), i = c.useRef(null), { fieldProps: o, inputProps: l } = T3({ ...a, inputRef: i }, u, r);
  return S.createElement(va, { values: [[La, u], [Eo, { ...l, ref: i }], [Ma, { ...o, ref: r, isInvalid: u.isInvalid, isDisabled: u.isDisabled }]] }, S.createElement(hd, e));
}), hd = c.forwardRef((e, t) => {
  let { className: a, children: r } = e, n = c.useContext(La), u = c.useContext(hn), i = n ?? u;
  return S.createElement(S.Fragment, null, S.createElement(F4, { ...e, ref: t, slot: e.slot || void 0, className: a ?? "react-aria-DateInput", isReadOnly: i.isReadOnly, isInvalid: i.isInvalid, isDisabled: i.isDisabled }, i.segments.map((o, l) => c.cloneElement(r(o), { key: l }))), S.createElement(T4, { className: "" }));
}), $m = c.forwardRef(function({ segment: t, ...a }, r) {
  let n = c.useContext(La), u = c.useContext(hn), i = n ?? u, o = Su(r), { segmentProps: l } = I3(t, i, o), { focusProps: s, isFocused: d, isFocusVisible: f } = yt(), { hoverProps: $, isHovered: m } = Ht({ ...a, isDisabled: i.isDisabled || t.type === "literal" }), b = Te({ ...a, values: { ...t, isReadOnly: i.isReadOnly, isInvalid: i.isInvalid, isDisabled: i.isDisabled, isHovered: m, isFocused: d, isFocusVisible: f }, defaultChildren: t.text, defaultClassName: "react-aria-DateSegment" });
  return S.createElement(de.span, { ...Y(oe(a, { global: true }), l, s, $), ...b, style: l.style, ref: o, "data-placeholder": t.isPlaceholder || void 0, "data-invalid": i.isInvalid || void 0, "data-readonly": i.isReadOnly || void 0, "data-disabled": i.isDisabled || void 0, "data-type": t.type, "data-hovered": m || void 0, "data-focused": d || void 0, "data-focus-visible": f || void 0 });
});
function J3(e) {
  return e && e.__esModule ? e.default : e;
}
function q3(e, t, a) {
  let r = Ee(), n = Ee(), u = Ee(), i = Oe(J3(Na), "@react-aria/datepicker"), { isInvalid: o, validationErrors: l, validationDetails: s } = t.displayValidation, { labelProps: d, fieldProps: f, descriptionProps: $, errorMessageProps: m } = xo({ ...e, labelElementType: "span", isInvalid: o, errorMessage: e.errorMessage || l }), b = Fs(t, a), p = f["aria-labelledby"] || f.id, { locale: h } = me(), y = t.formatValue(h, { month: "long" }), x = y ? i.format("selectedDateDescription", { date: y }) : "", v = cn(x), g = [v["aria-describedby"], f["aria-describedby"]].filter(Boolean).join(" ") || void 0, E = oe(e), B = c.useMemo(() => mn(a), [a]), A = c.useRef(false), { focusWithinProps: k } = pt({ ...e, isDisabled: t.isOpen, onBlurWithin: (M) => {
    var _a2, _b;
    let L = document.getElementById(n);
    _(L, M.relatedTarget) || (A.current = false, (_a2 = e.onBlur) == null ? void 0 : _a2.call(e, M), (_b = e.onFocusChange) == null ? void 0 : _b.call(e, false));
  }, onFocusWithin: (M) => {
    var _a2, _b;
    A.current || (A.current = true, (_a2 = e.onFocus) == null ? void 0 : _a2.call(e, M), (_b = e.onFocusChange) == null ? void 0 : _b.call(e, true));
  } });
  return { groupProps: Y(E, b, f, v, k, { role: "group", "aria-disabled": e.isDisabled || null, "aria-labelledby": p, "aria-describedby": g, onKeyDown(M) {
    t.isOpen || e.onKeyDown && e.onKeyDown(M);
  }, onKeyUp(M) {
    t.isOpen || e.onKeyUp && e.onKeyUp(M);
  } }), labelProps: { ...d, onClick: () => {
    B.focusFirst();
  } }, fieldProps: { ...f, id: u, [ia]: "presentation", "aria-describedby": g, value: t.value, defaultValue: t.defaultValue, onChange: t.setValue, placeholderValue: e.placeholderValue, hideTimeZone: e.hideTimeZone, hourCycle: e.hourCycle, shouldForceLeadingZeros: e.shouldForceLeadingZeros, granularity: e.granularity, isDisabled: e.isDisabled, isReadOnly: e.isReadOnly, isRequired: e.isRequired, validationBehavior: e.validationBehavior, [Tr]: t, autoFocus: e.autoFocus, name: e.name, form: e.form }, descriptionProps: $, errorMessageProps: m, buttonProps: { ...v, id: r, "aria-haspopup": "dialog", "aria-label": i.format("calendar"), "aria-labelledby": `${r} ${p}`, "aria-describedby": g, "aria-expanded": t.isOpen, isDisabled: e.isDisabled || e.isReadOnly, onPress: () => t.setOpen(true) }, dialogProps: { id: n, "aria-labelledby": `${r} ${p}` }, calendarProps: { autoFocus: true, value: t.dateValue, onChange: t.setDateValue, minValue: e.minValue, maxValue: e.maxValue, isDisabled: e.isDisabled, isReadOnly: e.isReadOnly, isDateUnavailable: e.isDateUnavailable, defaultFocusedValue: t.dateValue ? void 0 : e.placeholderValue, isInvalid: t.isInvalid, errorMessage: typeof e.errorMessage == "function" ? e.errorMessage(t.displayValidation) : e.errorMessage || t.displayValidation.validationErrors.join(" "), firstDayOfWeek: e.firstDayOfWeek, pageBehavior: e.pageBehavior }, isInvalid: o, validationErrors: l, validationDetails: s };
}
function Q3(e) {
  let t = _l(e), [a, r] = Ft(e.value, e.defaultValue || null, e.onChange), [n] = c.useState(a), u = a || e.placeholderValue || null, [i, o] = $d(u, e.granularity), l = a != null ? a.toDate(o ?? "UTC") : null, s = i === "hour" || i === "minute" || i === "second", d = e.shouldCloseOnSelect ?? true, [f, $] = c.useState(null), [m, b] = c.useState(null);
  if (a && (f = a, "hour" in a && (m = a)), u && !(i in u)) throw new Error("Invalid granularity " + i + " for value " + u.toString());
  let p = (a == null ? void 0 : a.calendar.identifier) === "gregory" && a.era === "BC", h = c.useMemo(() => ({ granularity: i, timeZone: o, hideTimeZone: e.hideTimeZone, hourCycle: e.hourCycle, shouldForceLeadingZeros: e.shouldForceLeadingZeros, showEra: p }), [i, e.hourCycle, e.shouldForceLeadingZeros, o, e.hideTimeZone, p]), { minValue: y, maxValue: x, isDateUnavailable: v } = e, g = c.useMemo(() => fd(a, y, x, v, h), [a, y, x, v, h]), E = vo({ ...e, value: a, builtinValidation: g }), B = E.displayValidation.isInvalid, A = e.validationState || (B ? "invalid" : null), k = (C, N) => {
    r("timeZone" in N ? N.set(he(C)) : Re(C, N)), $(null), b(null), E.commitValidation();
  }, M = (C) => {
    let N = typeof d == "function" ? d() : d;
    s ? m || N ? k(C, m || Eu(e.defaultValue || e.placeholderValue)) : $(C) : (r(C), E.commitValidation()), N && t.setOpen(false);
  }, L = (C) => {
    f && C ? k(f, C) : b(C);
  };
  return { ...E, value: a, defaultValue: e.defaultValue ?? n, setValue: r, dateValue: f, timeValue: m, setDateValue: M, setTimeValue: L, granularity: i, hasTime: s, ...t, setOpen(C) {
    !C && !a && f && s && k(f, m || Eu(e.defaultValue || e.placeholderValue)), t.setOpen(C);
  }, validationState: A, isInvalid: B, formatValue(C, N) {
    if (!l) return "";
    let Q = mt(N, h);
    return new Fe(C, Q).format(l);
  }, getDateFormatter(C, N) {
    let Q = { ...h, ...N }, D = mt({}, Q);
    return new Fe(C, D);
  } };
}
const X3 = c.createContext(null), em = c.createContext(null), tm = [Ma, Ut, Jr, Pa], bm = c.forwardRef(function(t, a) {
  [t, a] = Ce(t, a, X3);
  let { validationBehavior: r } = oa(E4) || {}, n = t.validationBehavior ?? r ?? "native", u = Q3({ ...t, validationBehavior: n }), i = c.useRef(null), [o, l] = Td(!t["aria-label"] && !t["aria-labelledby"]), { groupProps: s, labelProps: d, fieldProps: f, buttonProps: $, dialogProps: m, calendarProps: b, descriptionProps: p, errorMessageProps: h, ...y } = q3({ ...Ad(t), label: l, validationBehavior: n }, u, i), { focusProps: x, isFocused: v, isFocusVisible: g } = yt({ within: true }), E = Te({ ...t, values: { state: u, isFocusWithin: v, isFocusVisible: g, isDisabled: t.isDisabled || false, isInvalid: u.isInvalid, isOpen: u.isOpen, isReadOnly: t.isReadOnly || false, isRequired: t.isRequired || false }, defaultClassName: "react-aria-DatePicker" }), B = oe(t, { global: true });
  return delete B.id, S.createElement(va, { values: [[em, u], [Ma, { ...s, ref: i, isInvalid: u.isInvalid }], [bd, f], [Ut, { ...$, isPressed: u.isOpen }], [Jr, { ...d, ref: o, elementType: "span" }], [ya, b], [bn, u], [Zl, { trigger: "DatePicker", triggerRef: i, placement: "bottom start", clearContexts: tm }], [Gl, m], [Pa, { slots: { description: p, errorMessage: h } }], [D4, y]] }, S.createElement(de.div, { ...Y(B, E, x), ref: a, slot: t.slot || void 0, "data-focus-within": v || void 0, "data-invalid": u.isInvalid || void 0, "data-focus-visible": g || void 0, "data-disabled": t.isDisabled || void 0, "data-readonly": t.isReadOnly || void 0, "data-required": t.isRequired || void 0, "data-open": u.isOpen || void 0 }), S.createElement(B3, { autoComplete: t.autoComplete, name: t.name, isDisabled: t.isDisabled, state: u }));
});
export {
  bm as $,
  um as a,
  F4 as b,
  mm as c,
  $m as d,
  im as e,
  cm as f,
  fm as g,
  lm as h,
  om as i,
  sm as j,
  $4 as k,
  h4 as l,
  y4 as m,
  dm as n,
  Bf as o,
  Ff as p
};
