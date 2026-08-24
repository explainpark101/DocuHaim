let n1, hy, D0, $p, M0, Pp, Kc, Wp, Ea, Am, Ip, t1, kp, mp, a1, l1, e1, x, $g;
let __tla = (async () => {
  function E0(u, r) {
    for (var o = 0; o < r.length; o++) {
      const f = r[o];
      if (typeof f != "string" && !Array.isArray(f)) {
        for (const s in f) if (s !== "default" && !(s in u)) {
          const d = Object.getOwnPropertyDescriptor(f, s);
          d && Object.defineProperty(u, s, d.get ? d : {
            enumerable: true,
            get: () => f[s]
          });
        }
      }
    }
    return Object.freeze(Object.defineProperty(u, Symbol.toStringTag, {
      value: "Module"
    }));
  }
  Wp = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
  Am = function(u) {
    return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
  };
  var Cc = {
    exports: {}
  }, Cu = {};
  var Xh;
  function R0() {
    if (Xh) return Cu;
    Xh = 1;
    var u = /* @__PURE__ */ Symbol.for("react.transitional.element"), r = /* @__PURE__ */ Symbol.for("react.fragment");
    function o(f, s, d) {
      var m = null;
      if (d !== void 0 && (m = "" + d), s.key !== void 0 && (m = "" + s.key), "key" in s) {
        d = {};
        for (var g in s) g !== "key" && (d[g] = s[g]);
      } else d = s;
      return s = d.ref, {
        $$typeof: u,
        type: f,
        key: m,
        ref: s !== void 0 ? s : null,
        props: d
      };
    }
    return Cu.Fragment = r, Cu.jsx = o, Cu.jsxs = o, Cu;
  }
  var Qh;
  function z0() {
    return Qh || (Qh = 1, Cc.exports = R0()), Cc.exports;
  }
  let Uc, ve;
  kp = z0();
  Uc = {
    exports: {}
  };
  ve = {};
  var Vh;
  function T0() {
    if (Vh) return ve;
    Vh = 1;
    var u = /* @__PURE__ */ Symbol.for("react.transitional.element"), r = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), f = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.consumer"), m = /* @__PURE__ */ Symbol.for("react.context"), g = /* @__PURE__ */ Symbol.for("react.forward_ref"), v = /* @__PURE__ */ Symbol.for("react.suspense"), y = /* @__PURE__ */ Symbol.for("react.memo"), M = /* @__PURE__ */ Symbol.for("react.lazy"), S = /* @__PURE__ */ Symbol.for("react.activity"), N = Symbol.iterator;
    function L(E) {
      return E === null || typeof E != "object" ? null : (E = N && E[N] || E["@@iterator"], typeof E == "function" ? E : null);
    }
    var G = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    }, Q = Object.assign, q = {};
    function $(E, B, K) {
      this.props = E, this.context = B, this.refs = q, this.updater = K || G;
    }
    $.prototype.isReactComponent = {}, $.prototype.setState = function(E, B) {
      if (typeof E != "object" && typeof E != "function" && E != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, E, B, "setState");
    }, $.prototype.forceUpdate = function(E) {
      this.updater.enqueueForceUpdate(this, E, "forceUpdate");
    };
    function W() {
    }
    W.prototype = $.prototype;
    function I(E, B, K) {
      this.props = E, this.context = B, this.refs = q, this.updater = K || G;
    }
    var Re = I.prototype = new W();
    Re.constructor = I, Q(Re, $.prototype), Re.isPureReactComponent = true;
    var ye = Array.isArray;
    function be() {
    }
    var ue = {
      H: null,
      A: null,
      T: null,
      S: null
    }, D = Object.prototype.hasOwnProperty;
    function ze(E, B, K) {
      var F = K.ref;
      return {
        $$typeof: u,
        type: E,
        key: B,
        ref: F !== void 0 ? F : null,
        props: K
      };
    }
    function Ue(E, B) {
      return ze(E.type, B, E.props);
    }
    function Ve(E) {
      return typeof E == "object" && E !== null && E.$$typeof === u;
    }
    function me(E) {
      var B = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + E.replace(/[=:]/g, function(K) {
        return B[K];
      });
    }
    var et = /\/+/g;
    function xe(E, B) {
      return typeof E == "object" && E !== null && E.key != null ? me("" + E.key) : B.toString(36);
    }
    function he(E) {
      switch (E.status) {
        case "fulfilled":
          return E.value;
        case "rejected":
          throw E.reason;
        default:
          switch (typeof E.status == "string" ? E.then(be, be) : (E.status = "pending", E.then(function(B) {
            E.status === "pending" && (E.status = "fulfilled", E.value = B);
          }, function(B) {
            E.status === "pending" && (E.status = "rejected", E.reason = B);
          })), E.status) {
            case "fulfilled":
              return E.value;
            case "rejected":
              throw E.reason;
          }
      }
      throw E;
    }
    function U(E, B, K, F, oe) {
      var de = typeof E;
      (de === "undefined" || de === "boolean") && (E = null);
      var Te = false;
      if (E === null) Te = true;
      else switch (de) {
        case "bigint":
        case "string":
        case "number":
          Te = true;
          break;
        case "object":
          switch (E.$$typeof) {
            case u:
            case r:
              Te = true;
              break;
            case M:
              return Te = E._init, U(Te(E._payload), B, K, F, oe);
          }
      }
      if (Te) return oe = oe(E), Te = F === "" ? "." + xe(E, 0) : F, ye(oe) ? (K = "", Te != null && (K = Te.replace(et, "$&/") + "/"), U(oe, B, K, "", function(Ra) {
        return Ra;
      })) : oe != null && (Ve(oe) && (oe = Ue(oe, K + (oe.key == null || E && E.key === oe.key ? "" : ("" + oe.key).replace(et, "$&/") + "/") + Te)), B.push(oe)), 1;
      Te = 0;
      var ft = F === "" ? "." : F + ":";
      if (ye(E)) for (var Ze = 0; Ze < E.length; Ze++) F = E[Ze], de = ft + xe(F, Ze), Te += U(F, B, K, de, oe);
      else if (Ze = L(E), typeof Ze == "function") for (E = Ze.call(E), Ze = 0; !(F = E.next()).done; ) F = F.value, de = ft + xe(F, Ze++), Te += U(F, B, K, de, oe);
      else if (de === "object") {
        if (typeof E.then == "function") return U(he(E), B, K, F, oe);
        throw B = String(E), Error("Objects are not valid as a React child (found: " + (B === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : B) + "). If you meant to render a collection of children, use an array instead.");
      }
      return Te;
    }
    function V(E, B, K) {
      if (E == null) return E;
      var F = [], oe = 0;
      return U(E, F, "", "", function(de) {
        return B.call(K, de, oe++);
      }), F;
    }
    function le(E) {
      if (E._status === -1) {
        var B = E._result;
        B = B(), B.then(function(K) {
          (E._status === 0 || E._status === -1) && (E._status = 1, E._result = K);
        }, function(K) {
          (E._status === 0 || E._status === -1) && (E._status = 2, E._result = K);
        }), E._status === -1 && (E._status = 0, E._result = B);
      }
      if (E._status === 1) return E._result.default;
      throw E._result;
    }
    var ae = typeof reportError == "function" ? reportError : function(E) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var B = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: typeof E == "object" && E !== null && typeof E.message == "string" ? String(E.message) : String(E),
          error: E
        });
        if (!window.dispatchEvent(B)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", E);
        return;
      }
      console.error(E);
    }, Se = {
      map: V,
      forEach: function(E, B, K) {
        V(E, function() {
          B.apply(this, arguments);
        }, K);
      },
      count: function(E) {
        var B = 0;
        return V(E, function() {
          B++;
        }), B;
      },
      toArray: function(E) {
        return V(E, function(B) {
          return B;
        }) || [];
      },
      only: function(E) {
        if (!Ve(E)) throw Error("React.Children.only expected to receive a single React element child.");
        return E;
      }
    };
    return ve.Activity = S, ve.Children = Se, ve.Component = $, ve.Fragment = o, ve.Profiler = s, ve.PureComponent = I, ve.StrictMode = f, ve.Suspense = v, ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ue, ve.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(E) {
        return ue.H.useMemoCache(E);
      }
    }, ve.cache = function(E) {
      return function() {
        return E.apply(null, arguments);
      };
    }, ve.cacheSignal = function() {
      return null;
    }, ve.cloneElement = function(E, B, K) {
      if (E == null) throw Error("The argument must be a React element, but you passed " + E + ".");
      var F = Q({}, E.props), oe = E.key;
      if (B != null) for (de in B.key !== void 0 && (oe = "" + B.key), B) !D.call(B, de) || de === "key" || de === "__self" || de === "__source" || de === "ref" && B.ref === void 0 || (F[de] = B[de]);
      var de = arguments.length - 2;
      if (de === 1) F.children = K;
      else if (1 < de) {
        for (var Te = Array(de), ft = 0; ft < de; ft++) Te[ft] = arguments[ft + 2];
        F.children = Te;
      }
      return ze(E.type, oe, F);
    }, ve.createContext = function(E) {
      return E = {
        $$typeof: m,
        _currentValue: E,
        _currentValue2: E,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      }, E.Provider = E, E.Consumer = {
        $$typeof: d,
        _context: E
      }, E;
    }, ve.createElement = function(E, B, K) {
      var F, oe = {}, de = null;
      if (B != null) for (F in B.key !== void 0 && (de = "" + B.key), B) D.call(B, F) && F !== "key" && F !== "__self" && F !== "__source" && (oe[F] = B[F]);
      var Te = arguments.length - 2;
      if (Te === 1) oe.children = K;
      else if (1 < Te) {
        for (var ft = Array(Te), Ze = 0; Ze < Te; Ze++) ft[Ze] = arguments[Ze + 2];
        oe.children = ft;
      }
      if (E && E.defaultProps) for (F in Te = E.defaultProps, Te) oe[F] === void 0 && (oe[F] = Te[F]);
      return ze(E, de, oe);
    }, ve.createRef = function() {
      return {
        current: null
      };
    }, ve.forwardRef = function(E) {
      return {
        $$typeof: g,
        render: E
      };
    }, ve.isValidElement = Ve, ve.lazy = function(E) {
      return {
        $$typeof: M,
        _payload: {
          _status: -1,
          _result: E
        },
        _init: le
      };
    }, ve.memo = function(E, B) {
      return {
        $$typeof: y,
        type: E,
        compare: B === void 0 ? null : B
      };
    }, ve.startTransition = function(E) {
      var B = ue.T, K = {};
      ue.T = K;
      try {
        var F = E(), oe = ue.S;
        oe !== null && oe(K, F), typeof F == "object" && F !== null && typeof F.then == "function" && F.then(be, ae);
      } catch (de) {
        ae(de);
      } finally {
        B !== null && K.types !== null && (B.types = K.types), ue.T = B;
      }
    }, ve.unstable_useCacheRefresh = function() {
      return ue.H.useCacheRefresh();
    }, ve.use = function(E) {
      return ue.H.use(E);
    }, ve.useActionState = function(E, B, K) {
      return ue.H.useActionState(E, B, K);
    }, ve.useCallback = function(E, B) {
      return ue.H.useCallback(E, B);
    }, ve.useContext = function(E) {
      return ue.H.useContext(E);
    }, ve.useDebugValue = function() {
    }, ve.useDeferredValue = function(E, B) {
      return ue.H.useDeferredValue(E, B);
    }, ve.useEffect = function(E, B) {
      return ue.H.useEffect(E, B);
    }, ve.useEffectEvent = function(E) {
      return ue.H.useEffectEvent(E);
    }, ve.useId = function() {
      return ue.H.useId();
    }, ve.useImperativeHandle = function(E, B, K) {
      return ue.H.useImperativeHandle(E, B, K);
    }, ve.useInsertionEffect = function(E, B) {
      return ue.H.useInsertionEffect(E, B);
    }, ve.useLayoutEffect = function(E, B) {
      return ue.H.useLayoutEffect(E, B);
    }, ve.useMemo = function(E, B) {
      return ue.H.useMemo(E, B);
    }, ve.useOptimistic = function(E, B) {
      return ue.H.useOptimistic(E, B);
    }, ve.useReducer = function(E, B, K) {
      return ue.H.useReducer(E, B, K);
    }, ve.useRef = function(E) {
      return ue.H.useRef(E);
    }, ve.useState = function(E) {
      return ue.H.useState(E);
    }, ve.useSyncExternalStore = function(E, B, K) {
      return ue.H.useSyncExternalStore(E, B, K);
    }, ve.useTransition = function() {
      return ue.H.useTransition();
    }, ve.version = "19.2.4", ve;
  }
  var Zh;
  Kc = function() {
    return Zh || (Zh = 1, Uc.exports = T0()), Uc.exports;
  };
  x = Kc();
  M0 = Am(x);
  D0 = E0({
    __proto__: null,
    default: M0
  }, [
    x
  ]);
  var xc = {
    exports: {}
  }, Uu = {}, Nc = {
    exports: {}
  }, Hc = {};
  var Kh;
  function A0() {
    return Kh || (Kh = 1, (function(u) {
      function r(U, V) {
        var le = U.length;
        U.push(V);
        e: for (; 0 < le; ) {
          var ae = le - 1 >>> 1, Se = U[ae];
          if (0 < s(Se, V)) U[ae] = V, U[le] = Se, le = ae;
          else break e;
        }
      }
      function o(U) {
        return U.length === 0 ? null : U[0];
      }
      function f(U) {
        if (U.length === 0) return null;
        var V = U[0], le = U.pop();
        if (le !== V) {
          U[0] = le;
          e: for (var ae = 0, Se = U.length, E = Se >>> 1; ae < E; ) {
            var B = 2 * (ae + 1) - 1, K = U[B], F = B + 1, oe = U[F];
            if (0 > s(K, le)) F < Se && 0 > s(oe, K) ? (U[ae] = oe, U[F] = le, ae = F) : (U[ae] = K, U[B] = le, ae = B);
            else if (F < Se && 0 > s(oe, le)) U[ae] = oe, U[F] = le, ae = F;
            else break e;
          }
        }
        return V;
      }
      function s(U, V) {
        var le = U.sortIndex - V.sortIndex;
        return le !== 0 ? le : U.id - V.id;
      }
      if (u.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var d = performance;
        u.unstable_now = function() {
          return d.now();
        };
      } else {
        var m = Date, g = m.now();
        u.unstable_now = function() {
          return m.now() - g;
        };
      }
      var v = [], y = [], M = 1, S = null, N = 3, L = false, G = false, Q = false, q = false, $ = typeof setTimeout == "function" ? setTimeout : null, W = typeof clearTimeout == "function" ? clearTimeout : null, I = typeof setImmediate < "u" ? setImmediate : null;
      function Re(U) {
        for (var V = o(y); V !== null; ) {
          if (V.callback === null) f(y);
          else if (V.startTime <= U) f(y), V.sortIndex = V.expirationTime, r(v, V);
          else break;
          V = o(y);
        }
      }
      function ye(U) {
        if (Q = false, Re(U), !G) if (o(v) !== null) G = true, be || (be = true, me());
        else {
          var V = o(y);
          V !== null && he(ye, V.startTime - U);
        }
      }
      var be = false, ue = -1, D = 5, ze = -1;
      function Ue() {
        return q ? true : !(u.unstable_now() - ze < D);
      }
      function Ve() {
        if (q = false, be) {
          var U = u.unstable_now();
          ze = U;
          var V = true;
          try {
            e: {
              G = false, Q && (Q = false, W(ue), ue = -1), L = true;
              var le = N;
              try {
                t: {
                  for (Re(U), S = o(v); S !== null && !(S.expirationTime > U && Ue()); ) {
                    var ae = S.callback;
                    if (typeof ae == "function") {
                      S.callback = null, N = S.priorityLevel;
                      var Se = ae(S.expirationTime <= U);
                      if (U = u.unstable_now(), typeof Se == "function") {
                        S.callback = Se, Re(U), V = true;
                        break t;
                      }
                      S === o(v) && f(v), Re(U);
                    } else f(v);
                    S = o(v);
                  }
                  if (S !== null) V = true;
                  else {
                    var E = o(y);
                    E !== null && he(ye, E.startTime - U), V = false;
                  }
                }
                break e;
              } finally {
                S = null, N = le, L = false;
              }
              V = void 0;
            }
          } finally {
            V ? me() : be = false;
          }
        }
      }
      var me;
      if (typeof I == "function") me = function() {
        I(Ve);
      };
      else if (typeof MessageChannel < "u") {
        var et = new MessageChannel(), xe = et.port2;
        et.port1.onmessage = Ve, me = function() {
          xe.postMessage(null);
        };
      } else me = function() {
        $(Ve, 0);
      };
      function he(U, V) {
        ue = $(function() {
          U(u.unstable_now());
        }, V);
      }
      u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(U) {
        U.callback = null;
      }, u.unstable_forceFrameRate = function(U) {
        0 > U || 125 < U ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < U ? Math.floor(1e3 / U) : 5;
      }, u.unstable_getCurrentPriorityLevel = function() {
        return N;
      }, u.unstable_next = function(U) {
        switch (N) {
          case 1:
          case 2:
          case 3:
            var V = 3;
            break;
          default:
            V = N;
        }
        var le = N;
        N = V;
        try {
          return U();
        } finally {
          N = le;
        }
      }, u.unstable_requestPaint = function() {
        q = true;
      }, u.unstable_runWithPriority = function(U, V) {
        switch (U) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            U = 3;
        }
        var le = N;
        N = U;
        try {
          return V();
        } finally {
          N = le;
        }
      }, u.unstable_scheduleCallback = function(U, V, le) {
        var ae = u.unstable_now();
        switch (typeof le == "object" && le !== null ? (le = le.delay, le = typeof le == "number" && 0 < le ? ae + le : ae) : le = ae, U) {
          case 1:
            var Se = -1;
            break;
          case 2:
            Se = 250;
            break;
          case 5:
            Se = 1073741823;
            break;
          case 4:
            Se = 1e4;
            break;
          default:
            Se = 5e3;
        }
        return Se = le + Se, U = {
          id: M++,
          callback: V,
          priorityLevel: U,
          startTime: le,
          expirationTime: Se,
          sortIndex: -1
        }, le > ae ? (U.sortIndex = le, r(y, U), o(v) === null && U === o(y) && (Q ? (W(ue), ue = -1) : Q = true, he(ye, le - ae))) : (U.sortIndex = Se, r(v, U), G || L || (G = true, be || (be = true, me()))), U;
      }, u.unstable_shouldYield = Ue, u.unstable_wrapCallback = function(U) {
        var V = N;
        return function() {
          var le = N;
          N = V;
          try {
            return U.apply(this, arguments);
          } finally {
            N = le;
          }
        };
      };
    })(Hc)), Hc;
  }
  var Jh;
  function O0() {
    return Jh || (Jh = 1, Nc.exports = A0()), Nc.exports;
  }
  var Lc = {
    exports: {}
  }, Dt = {};
  var Fh;
  function _0() {
    if (Fh) return Dt;
    Fh = 1;
    var u = Kc();
    function r(v) {
      var y = "https://react.dev/errors/" + v;
      if (1 < arguments.length) {
        y += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var M = 2; M < arguments.length; M++) y += "&args[]=" + encodeURIComponent(arguments[M]);
      }
      return "Minified React error #" + v + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function o() {
    }
    var f = {
      d: {
        f: o,
        r: function() {
          throw Error(r(522));
        },
        D: o,
        C: o,
        L: o,
        m: o,
        X: o,
        S: o,
        M: o
      },
      p: 0,
      findDOMNode: null
    }, s = /* @__PURE__ */ Symbol.for("react.portal");
    function d(v, y, M) {
      var S = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: s,
        key: S == null ? null : "" + S,
        children: v,
        containerInfo: y,
        implementation: M
      };
    }
    var m = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function g(v, y) {
      if (v === "font") return "";
      if (typeof y == "string") return y === "use-credentials" ? y : "";
    }
    return Dt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f, Dt.createPortal = function(v, y) {
      var M = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11) throw Error(r(299));
      return d(v, y, null, M);
    }, Dt.flushSync = function(v) {
      var y = m.T, M = f.p;
      try {
        if (m.T = null, f.p = 2, v) return v();
      } finally {
        m.T = y, f.p = M, f.d.f();
      }
    }, Dt.preconnect = function(v, y) {
      typeof v == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, f.d.C(v, y));
    }, Dt.prefetchDNS = function(v) {
      typeof v == "string" && f.d.D(v);
    }, Dt.preinit = function(v, y) {
      if (typeof v == "string" && y && typeof y.as == "string") {
        var M = y.as, S = g(M, y.crossOrigin), N = typeof y.integrity == "string" ? y.integrity : void 0, L = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
        M === "style" ? f.d.S(v, typeof y.precedence == "string" ? y.precedence : void 0, {
          crossOrigin: S,
          integrity: N,
          fetchPriority: L
        }) : M === "script" && f.d.X(v, {
          crossOrigin: S,
          integrity: N,
          fetchPriority: L,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0
        });
      }
    }, Dt.preinitModule = function(v, y) {
      if (typeof v == "string") if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var M = g(y.as, y.crossOrigin);
          f.d.M(v, {
            crossOrigin: M,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0
          });
        }
      } else y == null && f.d.M(v);
    }, Dt.preload = function(v, y) {
      if (typeof v == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
        var M = y.as, S = g(M, y.crossOrigin);
        f.d.L(v, M, {
          crossOrigin: S,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0,
          type: typeof y.type == "string" ? y.type : void 0,
          fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
          referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
          imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
          imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
          media: typeof y.media == "string" ? y.media : void 0
        });
      }
    }, Dt.preloadModule = function(v, y) {
      if (typeof v == "string") if (y) {
        var M = g(y.as, y.crossOrigin);
        f.d.m(v, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: M,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0
        });
      } else f.d.m(v);
    }, Dt.requestFormReset = function(v) {
      f.d.r(v);
    }, Dt.unstable_batchedUpdates = function(v, y) {
      return v(y);
    }, Dt.useFormState = function(v, y, M) {
      return m.H.useFormState(v, y, M);
    }, Dt.useFormStatus = function() {
      return m.H.useHostTransitionStatus();
    }, Dt.version = "19.2.4", Dt;
  }
  var $h;
  function Om() {
    if ($h) return Lc.exports;
    $h = 1;
    function u() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (r) {
        console.error(r);
      }
    }
    return u(), Lc.exports = _0(), Lc.exports;
  }
  var Wh;
  function C0() {
    if (Wh) return Uu;
    Wh = 1;
    var u = O0(), r = Kc(), o = Om();
    function f(e) {
      var t = "https://react.dev/errors/" + e;
      if (1 < arguments.length) {
        t += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var l = 2; l < arguments.length; l++) t += "&args[]=" + encodeURIComponent(arguments[l]);
      }
      return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function s(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function d(e) {
      var t = e, l = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do
          t = e, (t.flags & 4098) !== 0 && (l = t.return), e = t.return;
        while (e);
      }
      return t.tag === 3 ? l : null;
    }
    function m(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function g(e) {
      if (e.tag === 31) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function v(e) {
      if (d(e) !== e) throw Error(f(188));
    }
    function y(e) {
      var t = e.alternate;
      if (!t) {
        if (t = d(e), t === null) throw Error(f(188));
        return t !== e ? null : e;
      }
      for (var l = e, a = t; ; ) {
        var n = l.return;
        if (n === null) break;
        var i = n.alternate;
        if (i === null) {
          if (a = n.return, a !== null) {
            l = a;
            continue;
          }
          break;
        }
        if (n.child === i.child) {
          for (i = n.child; i; ) {
            if (i === l) return v(n), e;
            if (i === a) return v(n), t;
            i = i.sibling;
          }
          throw Error(f(188));
        }
        if (l.return !== a.return) l = n, a = i;
        else {
          for (var c = false, h = n.child; h; ) {
            if (h === l) {
              c = true, l = n, a = i;
              break;
            }
            if (h === a) {
              c = true, a = n, l = i;
              break;
            }
            h = h.sibling;
          }
          if (!c) {
            for (h = i.child; h; ) {
              if (h === l) {
                c = true, l = i, a = n;
                break;
              }
              if (h === a) {
                c = true, a = i, l = n;
                break;
              }
              h = h.sibling;
            }
            if (!c) throw Error(f(189));
          }
        }
        if (l.alternate !== a) throw Error(f(190));
      }
      if (l.tag !== 3) throw Error(f(188));
      return l.stateNode.current === l ? e : t;
    }
    function M(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (t = M(e), t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var S = Object.assign, N = /* @__PURE__ */ Symbol.for("react.element"), L = /* @__PURE__ */ Symbol.for("react.transitional.element"), G = /* @__PURE__ */ Symbol.for("react.portal"), Q = /* @__PURE__ */ Symbol.for("react.fragment"), q = /* @__PURE__ */ Symbol.for("react.strict_mode"), $ = /* @__PURE__ */ Symbol.for("react.profiler"), W = /* @__PURE__ */ Symbol.for("react.consumer"), I = /* @__PURE__ */ Symbol.for("react.context"), Re = /* @__PURE__ */ Symbol.for("react.forward_ref"), ye = /* @__PURE__ */ Symbol.for("react.suspense"), be = /* @__PURE__ */ Symbol.for("react.suspense_list"), ue = /* @__PURE__ */ Symbol.for("react.memo"), D = /* @__PURE__ */ Symbol.for("react.lazy"), ze = /* @__PURE__ */ Symbol.for("react.activity"), Ue = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Ve = Symbol.iterator;
    function me(e) {
      return e === null || typeof e != "object" ? null : (e = Ve && e[Ve] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var et = /* @__PURE__ */ Symbol.for("react.client.reference");
    function xe(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.$$typeof === et ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case Q:
          return "Fragment";
        case $:
          return "Profiler";
        case q:
          return "StrictMode";
        case ye:
          return "Suspense";
        case be:
          return "SuspenseList";
        case ze:
          return "Activity";
      }
      if (typeof e == "object") switch (e.$$typeof) {
        case G:
          return "Portal";
        case I:
          return e.displayName || "Context";
        case W:
          return (e._context.displayName || "Context") + ".Consumer";
        case Re:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ue:
          return t = e.displayName || null, t !== null ? t : xe(e.type) || "Memo";
        case D:
          t = e._payload, e = e._init;
          try {
            return xe(e(t));
          } catch {
          }
      }
      return null;
    }
    var he = Array.isArray, U = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, le = {
      pending: false,
      data: null,
      method: null,
      action: null
    }, ae = [], Se = -1;
    function E(e) {
      return {
        current: e
      };
    }
    function B(e) {
      0 > Se || (e.current = ae[Se], ae[Se] = null, Se--);
    }
    function K(e, t) {
      Se++, ae[Se] = e.current, e.current = t;
    }
    var F = E(null), oe = E(null), de = E(null), Te = E(null);
    function ft(e, t) {
      switch (K(de, t), K(oe, e), K(F, null), t.nodeType) {
        case 9:
        case 11:
          e = (e = t.documentElement) && (e = e.namespaceURI) ? sh(e) : 0;
          break;
        default:
          if (e = t.tagName, t = t.namespaceURI) t = sh(t), e = dh(t, e);
          else switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
      }
      B(F), K(F, e);
    }
    function Ze() {
      B(F), B(oe), B(de);
    }
    function Ra(e) {
      e.memoizedState !== null && K(Te, e);
      var t = F.current, l = dh(t, e.type);
      t !== l && (K(oe, e), K(F, l));
    }
    function Za(e) {
      oe.current === e && (B(F), B(oe)), Te.current === e && (B(Te), Du._currentValue = le);
    }
    var Bn, mt;
    function Ut(e) {
      if (Bn === void 0) try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        Bn = t && t[1] || "", mt = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
      return `
` + Bn + e + mt;
    }
    var Ka = false;
    function jn(e, t) {
      if (!e || Ka) return "";
      Ka = true;
      var l = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var a = {
          DetermineComponentFrameRoot: function() {
            try {
              if (t) {
                var Y = function() {
                  throw Error();
                };
                if (Object.defineProperty(Y.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Y, []);
                  } catch (H) {
                    var _ = H;
                  }
                  Reflect.construct(e, [], Y);
                } else {
                  try {
                    Y.call();
                  } catch (H) {
                    _ = H;
                  }
                  e.call(Y.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (H) {
                  _ = H;
                }
                (Y = e()) && typeof Y.catch == "function" && Y.catch(function() {
                });
              }
            } catch (H) {
              if (H && _ && typeof H.stack == "string") return [
                H.stack,
                _.stack
              ];
            }
            return [
              null,
              null
            ];
          }
        };
        a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var n = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
        n && n.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot"
        });
        var i = a.DetermineComponentFrameRoot(), c = i[0], h = i[1];
        if (c && h) {
          var p = c.split(`
`), O = h.split(`
`);
          for (n = a = 0; a < p.length && !p[a].includes("DetermineComponentFrameRoot"); ) a++;
          for (; n < O.length && !O[n].includes("DetermineComponentFrameRoot"); ) n++;
          if (a === p.length || n === O.length) for (a = p.length - 1, n = O.length - 1; 1 <= a && 0 <= n && p[a] !== O[n]; ) n--;
          for (; 1 <= a && 0 <= n; a--, n--) if (p[a] !== O[n]) {
            if (a !== 1 || n !== 1) do
              if (a--, n--, 0 > n || p[a] !== O[n]) {
                var w = `
` + p[a].replace(" at new ", " at ");
                return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), w;
              }
            while (1 <= a && 0 <= n);
            break;
          }
        }
      } finally {
        Ka = false, Error.prepareStackTrace = l;
      }
      return (l = e ? e.displayName || e.name : "") ? Ut(l) : "";
    }
    function El(e, t) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return Ut(e.type);
        case 16:
          return Ut("Lazy");
        case 13:
          return e.child !== t && t !== null ? Ut("Suspense Fallback") : Ut("Suspense");
        case 19:
          return Ut("SuspenseList");
        case 0:
        case 15:
          return jn(e.type, false);
        case 11:
          return jn(e.type.render, false);
        case 1:
          return jn(e.type, true);
        case 31:
          return Ut("Activity");
        default:
          return "";
      }
    }
    function Zu(e) {
      try {
        var t = "", l = null;
        do
          t += El(e, l), l = e, e = e.return;
        while (e);
        return t;
      } catch (a) {
        return `
Error generating stack: ` + a.message + `
` + a.stack;
      }
    }
    var Yn = Object.prototype.hasOwnProperty, Ja = u.unstable_scheduleCallback, qn = u.unstable_cancelCallback, pr = u.unstable_shouldYield, br = u.unstable_requestPaint, Ot = u.unstable_now, Rl = u.unstable_getCurrentPriorityLevel, Vl = u.unstable_ImmediatePriority, Gn = u.unstable_UserBlockingPriority, Zl = u.unstable_NormalPriority, ul = u.unstable_LowPriority, Jt = u.unstable_IdlePriority, Ku = u.log, Sr = u.unstable_setDisableYieldValue, zl = null, _t = null;
    function gt(e) {
      if (typeof Ku == "function" && Sr(e), _t && typeof _t.setStrictMode == "function") try {
        _t.setStrictMode(zl, e);
      } catch {
      }
    }
    var Tt = Math.clz32 ? Math.clz32 : Er, Ju = Math.log, Fu = Math.LN2;
    function Er(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (Ju(e) / Fu | 0) | 0;
    }
    var za = 256, Tl = 262144, Ta = 4194304;
    function il(e) {
      var t = e & 42;
      if (t !== 0) return t;
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
          return e & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return e & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return e;
      }
    }
    function Fa(e, t, l) {
      var a = e.pendingLanes;
      if (a === 0) return 0;
      var n = 0, i = e.suspendedLanes, c = e.pingedLanes;
      e = e.warmLanes;
      var h = a & 134217727;
      return h !== 0 ? (a = h & ~i, a !== 0 ? n = il(a) : (c &= h, c !== 0 ? n = il(c) : l || (l = h & ~e, l !== 0 && (n = il(l))))) : (h = a & ~i, h !== 0 ? n = il(h) : c !== 0 ? n = il(c) : l || (l = a & ~e, l !== 0 && (n = il(l)))), n === 0 ? 0 : t !== 0 && t !== n && (t & i) === 0 && (i = n & -n, l = t & -t, i >= l || i === 32 && (l & 4194048) !== 0) ? t : n;
    }
    function Kl(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function Rr(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return t + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function Xn() {
      var e = Ta;
      return Ta <<= 1, (Ta & 62914560) === 0 && (Ta = 4194304), e;
    }
    function Jl(e) {
      for (var t = [], l = 0; 31 > l; l++) t.push(e);
      return t;
    }
    function ml(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function $u(e, t, l, a, n, i) {
      var c = e.pendingLanes;
      e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
      var h = e.entanglements, p = e.expirationTimes, O = e.hiddenUpdates;
      for (l = c & ~l; 0 < l; ) {
        var w = 31 - Tt(l), Y = 1 << w;
        h[w] = 0, p[w] = -1;
        var _ = O[w];
        if (_ !== null) for (O[w] = null, w = 0; w < _.length; w++) {
          var H = _[w];
          H !== null && (H.lane &= -536870913);
        }
        l &= ~Y;
      }
      a !== 0 && Wu(e, a, 0), i !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(c & ~t));
    }
    function Wu(e, t, l) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var a = 31 - Tt(t);
      e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | l & 261930;
    }
    function ku(e, t) {
      var l = e.entangledLanes |= t;
      for (e = e.entanglements; l; ) {
        var a = 31 - Tt(l), n = 1 << a;
        n & t | e[a] & t && (e[a] |= t), l &= ~n;
      }
    }
    function b(e, t) {
      var l = t & -t;
      return l = (l & 42) !== 0 ? 1 : z(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
    }
    function z(e) {
      switch (e) {
        case 2:
          e = 1;
          break;
        case 8:
          e = 4;
          break;
        case 32:
          e = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          e = 128;
          break;
        case 268435456:
          e = 134217728;
          break;
        default:
          e = 0;
      }
      return e;
    }
    function C(e) {
      return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
    }
    function X() {
      var e = V.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Lh(e.type));
    }
    function Z(e, t) {
      var l = V.p;
      try {
        return V.p = e, t();
      } finally {
        V.p = l;
      }
    }
    var ee = Math.random().toString(36).slice(2), J = "__reactFiber$" + ee, k = "__reactProps$" + ee, P = "__reactContainer$" + ee, re = "__reactEvents$" + ee, ce = "__reactListeners$" + ee, ie = "__reactHandles$" + ee, Le = "__reactResources$" + ee, Me = "__reactMarker$" + ee;
    function Ke(e) {
      delete e[J], delete e[k], delete e[re], delete e[ce], delete e[ie];
    }
    function $e(e) {
      var t = e[J];
      if (t) return t;
      for (var l = e.parentNode; l; ) {
        if (t = l[P] || l[J]) {
          if (l = t.alternate, t.child !== null || l !== null && l.child !== null) for (e = bh(e); e !== null; ) {
            if (l = e[J]) return l;
            e = bh(e);
          }
          return t;
        }
        e = l, l = e.parentNode;
      }
      return null;
    }
    function tt(e) {
      if (e = e[J] || e[P]) {
        var t = e.tag;
        if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
      }
      return null;
    }
    function He(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
      throw Error(f(33));
    }
    function yt(e) {
      var t = e[Le];
      return t || (t = e[Le] = {
        hoistableStyles: /* @__PURE__ */ new Map(),
        hoistableScripts: /* @__PURE__ */ new Map()
      }), t;
    }
    function Fe(e) {
      e[Me] = true;
    }
    var Fl = /* @__PURE__ */ new Set(), rl = {};
    function pt(e, t) {
      yl(e, t), yl(e + "Capture", t);
    }
    function yl(e, t) {
      for (rl[e] = t, e = 0; e < t.length; e++) Fl.add(t[e]);
    }
    var Ma = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), vl = {}, Da = {};
    function $a(e) {
      return Yn.call(Da, e) ? true : Yn.call(vl, e) ? false : Ma.test(e) ? Da[e] = true : (vl[e] = true, false);
    }
    function De(e, t, l) {
      if ($a(t)) if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + l);
      }
    }
    function nt(e, t, l) {
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(t);
            return;
        }
        e.setAttribute(t, "" + l);
      }
    }
    function Mt(e, t, l, a) {
      if (a === null) e.removeAttribute(l);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(l);
            return;
        }
        e.setAttributeNS(t, l, "" + a);
      }
    }
    function ct(e) {
      switch (typeof e) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return e;
        default:
          return "";
      }
    }
    function We(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Wa(e, t, l) {
      var a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
        var n = a.get, i = a.set;
        return Object.defineProperty(e, t, {
          configurable: true,
          get: function() {
            return n.call(this);
          },
          set: function(c) {
            l = "" + c, i.call(this, c);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        }), {
          getValue: function() {
            return l;
          },
          setValue: function(c) {
            l = "" + c;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function ka(e) {
      if (!e._valueTracker) {
        var t = We(e) ? "checked" : "value";
        e._valueTracker = Wa(e, t, "" + e[t]);
      }
    }
    function Pu(e) {
      if (!e) return false;
      var t = e._valueTracker;
      if (!t) return true;
      var l = t.getValue(), a = "";
      return e && (a = We(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== l ? (t.setValue(e), true) : false;
    }
    function Iu(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var yy = /[\n"\\]/g;
    function Ft(e) {
      return e.replace(yy, function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      });
    }
    function zr(e, t, l, a, n, i, c, h) {
      e.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? e.type = c : e.removeAttribute("type"), t != null ? c === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + ct(t)) : e.value !== "" + ct(t) && (e.value = "" + ct(t)) : c !== "submit" && c !== "reset" || e.removeAttribute("value"), t != null ? Tr(e, c, ct(t)) : l != null ? Tr(e, c, ct(l)) : a != null && e.removeAttribute("value"), n == null && i != null && (e.defaultChecked = !!i), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.name = "" + ct(h) : e.removeAttribute("name");
    }
    function no(e, t, l, a, n, i, c, h) {
      if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.type = i), t != null || l != null) {
        if (!(i !== "submit" && i !== "reset" || t != null)) {
          ka(e);
          return;
        }
        l = l != null ? "" + ct(l) : "", t = t != null ? "" + ct(t) : l, h || t === e.value || (e.value = t), e.defaultValue = t;
      }
      a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = h ? e.checked : !!a, e.defaultChecked = !!a, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.name = c), ka(e);
    }
    function Tr(e, t, l) {
      t === "number" && Iu(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
    }
    function Pa(e, t, l, a) {
      if (e = e.options, t) {
        t = {};
        for (var n = 0; n < l.length; n++) t["$" + l[n]] = true;
        for (l = 0; l < e.length; l++) n = t.hasOwnProperty("$" + e[l].value), e[l].selected !== n && (e[l].selected = n), n && a && (e[l].defaultSelected = true);
      } else {
        for (l = "" + ct(l), t = null, n = 0; n < e.length; n++) {
          if (e[n].value === l) {
            e[n].selected = true, a && (e[n].defaultSelected = true);
            return;
          }
          t !== null || e[n].disabled || (t = e[n]);
        }
        t !== null && (t.selected = true);
      }
    }
    function uo(e, t, l) {
      if (t != null && (t = "" + ct(t), t !== e.value && (e.value = t), l == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = l != null ? "" + ct(l) : "";
    }
    function io(e, t, l, a) {
      if (t == null) {
        if (a != null) {
          if (l != null) throw Error(f(92));
          if (he(a)) {
            if (1 < a.length) throw Error(f(93));
            a = a[0];
          }
          l = a;
        }
        l == null && (l = ""), t = l;
      }
      l = ct(t), e.defaultValue = l, a = e.textContent, a === l && a !== "" && a !== null && (e.value = a), ka(e);
    }
    function Ia(e, t) {
      if (t) {
        var l = e.firstChild;
        if (l && l === e.lastChild && l.nodeType === 3) {
          l.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var vy = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
    function ro(e, t, l) {
      var a = t.indexOf("--") === 0;
      l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || vy.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
    }
    function fo(e, t, l) {
      if (t != null && typeof t != "object") throw Error(f(62));
      if (e = e.style, l != null) {
        for (var a in l) !l.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
        for (var n in t) a = t[n], t.hasOwnProperty(n) && l[n] !== a && ro(e, n, a);
      } else for (var i in t) t.hasOwnProperty(i) && ro(e, i, t[i]);
    }
    function Mr(e) {
      if (e.indexOf("-") === -1) return false;
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return false;
        default:
          return true;
      }
    }
    var gy = /* @__PURE__ */ new Map([
      [
        "acceptCharset",
        "accept-charset"
      ],
      [
        "htmlFor",
        "for"
      ],
      [
        "httpEquiv",
        "http-equiv"
      ],
      [
        "crossOrigin",
        "crossorigin"
      ],
      [
        "accentHeight",
        "accent-height"
      ],
      [
        "alignmentBaseline",
        "alignment-baseline"
      ],
      [
        "arabicForm",
        "arabic-form"
      ],
      [
        "baselineShift",
        "baseline-shift"
      ],
      [
        "capHeight",
        "cap-height"
      ],
      [
        "clipPath",
        "clip-path"
      ],
      [
        "clipRule",
        "clip-rule"
      ],
      [
        "colorInterpolation",
        "color-interpolation"
      ],
      [
        "colorInterpolationFilters",
        "color-interpolation-filters"
      ],
      [
        "colorProfile",
        "color-profile"
      ],
      [
        "colorRendering",
        "color-rendering"
      ],
      [
        "dominantBaseline",
        "dominant-baseline"
      ],
      [
        "enableBackground",
        "enable-background"
      ],
      [
        "fillOpacity",
        "fill-opacity"
      ],
      [
        "fillRule",
        "fill-rule"
      ],
      [
        "floodColor",
        "flood-color"
      ],
      [
        "floodOpacity",
        "flood-opacity"
      ],
      [
        "fontFamily",
        "font-family"
      ],
      [
        "fontSize",
        "font-size"
      ],
      [
        "fontSizeAdjust",
        "font-size-adjust"
      ],
      [
        "fontStretch",
        "font-stretch"
      ],
      [
        "fontStyle",
        "font-style"
      ],
      [
        "fontVariant",
        "font-variant"
      ],
      [
        "fontWeight",
        "font-weight"
      ],
      [
        "glyphName",
        "glyph-name"
      ],
      [
        "glyphOrientationHorizontal",
        "glyph-orientation-horizontal"
      ],
      [
        "glyphOrientationVertical",
        "glyph-orientation-vertical"
      ],
      [
        "horizAdvX",
        "horiz-adv-x"
      ],
      [
        "horizOriginX",
        "horiz-origin-x"
      ],
      [
        "imageRendering",
        "image-rendering"
      ],
      [
        "letterSpacing",
        "letter-spacing"
      ],
      [
        "lightingColor",
        "lighting-color"
      ],
      [
        "markerEnd",
        "marker-end"
      ],
      [
        "markerMid",
        "marker-mid"
      ],
      [
        "markerStart",
        "marker-start"
      ],
      [
        "overlinePosition",
        "overline-position"
      ],
      [
        "overlineThickness",
        "overline-thickness"
      ],
      [
        "paintOrder",
        "paint-order"
      ],
      [
        "panose-1",
        "panose-1"
      ],
      [
        "pointerEvents",
        "pointer-events"
      ],
      [
        "renderingIntent",
        "rendering-intent"
      ],
      [
        "shapeRendering",
        "shape-rendering"
      ],
      [
        "stopColor",
        "stop-color"
      ],
      [
        "stopOpacity",
        "stop-opacity"
      ],
      [
        "strikethroughPosition",
        "strikethrough-position"
      ],
      [
        "strikethroughThickness",
        "strikethrough-thickness"
      ],
      [
        "strokeDasharray",
        "stroke-dasharray"
      ],
      [
        "strokeDashoffset",
        "stroke-dashoffset"
      ],
      [
        "strokeLinecap",
        "stroke-linecap"
      ],
      [
        "strokeLinejoin",
        "stroke-linejoin"
      ],
      [
        "strokeMiterlimit",
        "stroke-miterlimit"
      ],
      [
        "strokeOpacity",
        "stroke-opacity"
      ],
      [
        "strokeWidth",
        "stroke-width"
      ],
      [
        "textAnchor",
        "text-anchor"
      ],
      [
        "textDecoration",
        "text-decoration"
      ],
      [
        "textRendering",
        "text-rendering"
      ],
      [
        "transformOrigin",
        "transform-origin"
      ],
      [
        "underlinePosition",
        "underline-position"
      ],
      [
        "underlineThickness",
        "underline-thickness"
      ],
      [
        "unicodeBidi",
        "unicode-bidi"
      ],
      [
        "unicodeRange",
        "unicode-range"
      ],
      [
        "unitsPerEm",
        "units-per-em"
      ],
      [
        "vAlphabetic",
        "v-alphabetic"
      ],
      [
        "vHanging",
        "v-hanging"
      ],
      [
        "vIdeographic",
        "v-ideographic"
      ],
      [
        "vMathematical",
        "v-mathematical"
      ],
      [
        "vectorEffect",
        "vector-effect"
      ],
      [
        "vertAdvY",
        "vert-adv-y"
      ],
      [
        "vertOriginX",
        "vert-origin-x"
      ],
      [
        "vertOriginY",
        "vert-origin-y"
      ],
      [
        "wordSpacing",
        "word-spacing"
      ],
      [
        "writingMode",
        "writing-mode"
      ],
      [
        "xmlnsXlink",
        "xmlns:xlink"
      ],
      [
        "xHeight",
        "x-height"
      ]
    ]), py = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function ei(e) {
      return py.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function Ml() {
    }
    var Dr = null;
    function Ar(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var en = null, tn = null;
    function co(e) {
      var t = tt(e);
      if (t && (e = t.stateNode)) {
        var l = e[k] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (zr(e, l.value, l.defaultValue, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name), t = l.name, l.type === "radio" && t != null) {
              for (l = e; l.parentNode; ) l = l.parentNode;
              for (l = l.querySelectorAll('input[name="' + Ft("" + t) + '"][type="radio"]'), t = 0; t < l.length; t++) {
                var a = l[t];
                if (a !== e && a.form === e.form) {
                  var n = a[k] || null;
                  if (!n) throw Error(f(90));
                  zr(a, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name);
                }
              }
              for (t = 0; t < l.length; t++) a = l[t], a.form === e.form && Pu(a);
            }
            break e;
          case "textarea":
            uo(e, l.value, l.defaultValue);
            break e;
          case "select":
            t = l.value, t != null && Pa(e, !!l.multiple, t, false);
        }
      }
    }
    var Or = false;
    function oo(e, t, l) {
      if (Or) return e(t, l);
      Or = true;
      try {
        var a = e(t);
        return a;
      } finally {
        if (Or = false, (en !== null || tn !== null) && (Gi(), en && (t = en, e = tn, tn = en = null, co(t), e))) for (t = 0; t < e.length; t++) co(e[t]);
      }
    }
    function Qn(e, t) {
      var l = e.stateNode;
      if (l === null) return null;
      var a = l[k] || null;
      if (a === null) return null;
      l = a[t];
      e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (a = !a.disabled) || (e = e.type, a = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !a;
          break e;
        default:
          e = false;
      }
      if (e) return null;
      if (l && typeof l != "function") throw Error(f(231, t, typeof l));
      return l;
    }
    var Dl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), _r = false;
    if (Dl) try {
      var Vn = {};
      Object.defineProperty(Vn, "passive", {
        get: function() {
          _r = true;
        }
      }), window.addEventListener("test", Vn, Vn), window.removeEventListener("test", Vn, Vn);
    } catch {
      _r = false;
    }
    var $l = null, Cr = null, ti = null;
    function so() {
      if (ti) return ti;
      var e, t = Cr, l = t.length, a, n = "value" in $l ? $l.value : $l.textContent, i = n.length;
      for (e = 0; e < l && t[e] === n[e]; e++) ;
      var c = l - e;
      for (a = 1; a <= c && t[l - a] === n[i - a]; a++) ;
      return ti = n.slice(e, 1 < a ? 1 - a : void 0);
    }
    function li(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function ai() {
      return true;
    }
    function ho() {
      return false;
    }
    function xt(e) {
      function t(l, a, n, i, c) {
        this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = i, this.target = c, this.currentTarget = null;
        for (var h in e) e.hasOwnProperty(h) && (l = e[h], this[h] = l ? l(i) : i[h]);
        return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === false) ? ai : ho, this.isPropagationStopped = ho, this;
      }
      return S(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = true;
          var l = this.nativeEvent;
          l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = false), this.isDefaultPrevented = ai);
        },
        stopPropagation: function() {
          var l = this.nativeEvent;
          l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = true), this.isPropagationStopped = ai);
        },
        persist: function() {
        },
        isPersistent: ai
      }), t;
    }
    var Aa = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, ni = xt(Aa), Zn = S({}, Aa, {
      view: 0,
      detail: 0
    }), by = xt(Zn), Ur, xr, Kn, ui = S({}, Zn, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Hr,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== Kn && (Kn && e.type === "mousemove" ? (Ur = e.screenX - Kn.screenX, xr = e.screenY - Kn.screenY) : xr = Ur = 0, Kn = e), Ur);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : xr;
      }
    }), mo = xt(ui), Sy = S({}, ui, {
      dataTransfer: 0
    }), Ey = xt(Sy), Ry = S({}, Zn, {
      relatedTarget: 0
    }), Nr = xt(Ry), zy = S({}, Aa, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Ty = xt(zy), My = S({}, Aa, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Dy = xt(My), Ay = S({}, Aa, {
      data: 0
    }), yo = xt(Ay), Oy = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, _y = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, Cy = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Uy(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = Cy[e]) ? !!t[e] : false;
    }
    function Hr() {
      return Uy;
    }
    var xy = S({}, Zn, {
      key: function(e) {
        if (e.key) {
          var t = Oy[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = li(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? _y[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Hr,
      charCode: function(e) {
        return e.type === "keypress" ? li(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? li(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Ny = xt(xy), Hy = S({}, ui, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), vo = xt(Hy), Ly = S({}, Zn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Hr
    }), wy = xt(Ly), By = S({}, Aa, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), jy = xt(By), Yy = S({}, ui, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), qy = xt(Yy), Gy = S({}, Aa, {
      newState: 0,
      oldState: 0
    }), Xy = xt(Gy), Qy = [
      9,
      13,
      27,
      32
    ], Lr = Dl && "CompositionEvent" in window, Jn = null;
    Dl && "documentMode" in document && (Jn = document.documentMode);
    var Vy = Dl && "TextEvent" in window && !Jn, go = Dl && (!Lr || Jn && 8 < Jn && 11 >= Jn), po = " ", bo = false;
    function So(e, t) {
      switch (e) {
        case "keyup":
          return Qy.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function Eo(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    var ln = false;
    function Zy(e, t) {
      switch (e) {
        case "compositionend":
          return Eo(t);
        case "keypress":
          return t.which !== 32 ? null : (bo = true, po);
        case "textInput":
          return e = t.data, e === po && bo ? null : e;
        default:
          return null;
      }
    }
    function Ky(e, t) {
      if (ln) return e === "compositionend" || !Lr && So(e, t) ? (e = so(), ti = Cr = $l = null, ln = false, e) : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return go && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var Jy = {
      color: true,
      date: true,
      datetime: true,
      "datetime-local": true,
      email: true,
      month: true,
      number: true,
      password: true,
      range: true,
      search: true,
      tel: true,
      text: true,
      time: true,
      url: true,
      week: true
    };
    function Ro(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!Jy[e.type] : t === "textarea";
    }
    function zo(e, t, l, a) {
      en ? tn ? tn.push(a) : tn = [
        a
      ] : en = a, t = Fi(t, "onChange"), 0 < t.length && (l = new ni("onChange", "change", null, l, a), e.push({
        event: l,
        listeners: t
      }));
    }
    var Fn = null, $n = null;
    function Fy(e) {
      uh(e, 0);
    }
    function ii(e) {
      var t = He(e);
      if (Pu(t)) return e;
    }
    function To(e, t) {
      if (e === "change") return t;
    }
    var Mo = false;
    if (Dl) {
      var wr;
      if (Dl) {
        var Br = "oninput" in document;
        if (!Br) {
          var Do = document.createElement("div");
          Do.setAttribute("oninput", "return;"), Br = typeof Do.oninput == "function";
        }
        wr = Br;
      } else wr = false;
      Mo = wr && (!document.documentMode || 9 < document.documentMode);
    }
    function Ao() {
      Fn && (Fn.detachEvent("onpropertychange", Oo), $n = Fn = null);
    }
    function Oo(e) {
      if (e.propertyName === "value" && ii($n)) {
        var t = [];
        zo(t, $n, e, Ar(e)), oo(Fy, t);
      }
    }
    function $y(e, t, l) {
      e === "focusin" ? (Ao(), Fn = t, $n = l, Fn.attachEvent("onpropertychange", Oo)) : e === "focusout" && Ao();
    }
    function Wy(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown") return ii($n);
    }
    function ky(e, t) {
      if (e === "click") return ii(t);
    }
    function Py(e, t) {
      if (e === "input" || e === "change") return ii(t);
    }
    function Iy(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Yt = typeof Object.is == "function" ? Object.is : Iy;
    function Wn(e, t) {
      if (Yt(e, t)) return true;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null) return false;
      var l = Object.keys(e), a = Object.keys(t);
      if (l.length !== a.length) return false;
      for (a = 0; a < l.length; a++) {
        var n = l[a];
        if (!Yn.call(t, n) || !Yt(e[n], t[n])) return false;
      }
      return true;
    }
    function _o(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Co(e, t) {
      var l = _o(e);
      e = 0;
      for (var a; l; ) {
        if (l.nodeType === 3) {
          if (a = e + l.textContent.length, e <= t && a >= t) return {
            node: l,
            offset: t - e
          };
          e = a;
        }
        e: {
          for (; l; ) {
            if (l.nextSibling) {
              l = l.nextSibling;
              break e;
            }
            l = l.parentNode;
          }
          l = void 0;
        }
        l = _o(l);
      }
    }
    function Uo(e, t) {
      return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? Uo(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
    }
    function xo(e) {
      e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
      for (var t = Iu(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var l = typeof t.contentWindow.location.href == "string";
        } catch {
          l = false;
        }
        if (l) e = t.contentWindow;
        else break;
        t = Iu(e.document);
      }
      return t;
    }
    function jr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    var ev = Dl && "documentMode" in document && 11 >= document.documentMode, an = null, Yr = null, kn = null, qr = false;
    function No(e, t, l) {
      var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
      qr || an == null || an !== Iu(a) || (a = an, "selectionStart" in a && jr(a) ? a = {
        start: a.selectionStart,
        end: a.selectionEnd
      } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      }), kn && Wn(kn, a) || (kn = a, a = Fi(Yr, "onSelect"), 0 < a.length && (t = new ni("onSelect", "select", null, t, l), e.push({
        event: t,
        listeners: a
      }), t.target = an)));
    }
    function Oa(e, t) {
      var l = {};
      return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
    }
    var nn = {
      animationend: Oa("Animation", "AnimationEnd"),
      animationiteration: Oa("Animation", "AnimationIteration"),
      animationstart: Oa("Animation", "AnimationStart"),
      transitionrun: Oa("Transition", "TransitionRun"),
      transitionstart: Oa("Transition", "TransitionStart"),
      transitioncancel: Oa("Transition", "TransitionCancel"),
      transitionend: Oa("Transition", "TransitionEnd")
    }, Gr = {}, Ho = {};
    Dl && (Ho = document.createElement("div").style, "AnimationEvent" in window || (delete nn.animationend.animation, delete nn.animationiteration.animation, delete nn.animationstart.animation), "TransitionEvent" in window || delete nn.transitionend.transition);
    function _a(e) {
      if (Gr[e]) return Gr[e];
      if (!nn[e]) return e;
      var t = nn[e], l;
      for (l in t) if (t.hasOwnProperty(l) && l in Ho) return Gr[e] = t[l];
      return e;
    }
    var Lo = _a("animationend"), wo = _a("animationiteration"), Bo = _a("animationstart"), tv = _a("transitionrun"), lv = _a("transitionstart"), av = _a("transitioncancel"), jo = _a("transitionend"), Yo = /* @__PURE__ */ new Map(), Xr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    Xr.push("scrollEnd");
    function fl(e, t) {
      Yo.set(e, t), pt(t, [
        e
      ]);
    }
    var ri = typeof reportError == "function" ? reportError : function(e) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var t = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
          error: e
        });
        if (!window.dispatchEvent(t)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", e);
        return;
      }
      console.error(e);
    }, $t = [], un = 0, Qr = 0;
    function fi() {
      for (var e = un, t = Qr = un = 0; t < e; ) {
        var l = $t[t];
        $t[t++] = null;
        var a = $t[t];
        $t[t++] = null;
        var n = $t[t];
        $t[t++] = null;
        var i = $t[t];
        if ($t[t++] = null, a !== null && n !== null) {
          var c = a.pending;
          c === null ? n.next = n : (n.next = c.next, c.next = n), a.pending = n;
        }
        i !== 0 && qo(l, n, i);
      }
    }
    function ci(e, t, l, a) {
      $t[un++] = e, $t[un++] = t, $t[un++] = l, $t[un++] = a, Qr |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
    }
    function Vr(e, t, l, a) {
      return ci(e, t, l, a), oi(e);
    }
    function Ca(e, t) {
      return ci(e, null, null, t), oi(e);
    }
    function qo(e, t, l) {
      e.lanes |= l;
      var a = e.alternate;
      a !== null && (a.lanes |= l);
      for (var n = false, i = e.return; i !== null; ) i.childLanes |= l, a = i.alternate, a !== null && (a.childLanes |= l), i.tag === 22 && (e = i.stateNode, e === null || e._visibility & 1 || (n = true)), e = i, i = i.return;
      return e.tag === 3 ? (i = e.stateNode, n && t !== null && (n = 31 - Tt(l), e = i.hiddenUpdates, a = e[n], a === null ? e[n] = [
        t
      ] : a.push(t), t.lane = l | 536870912), i) : null;
    }
    function oi(e) {
      if (50 < bu) throw bu = 0, ec = null, Error(f(185));
      for (var t = e.return; t !== null; ) e = t, t = e.return;
      return e.tag === 3 ? e.stateNode : null;
    }
    var rn = {};
    function nv(e, t, l, a) {
      this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function qt(e, t, l, a) {
      return new nv(e, t, l, a);
    }
    function Zr(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function Al(e, t) {
      var l = e.alternate;
      return l === null ? (l = qt(e.tag, t, e.key, e.mode), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
    }
    function Go(e, t) {
      e.flags &= 65011714;
      var l = e.alternate;
      return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }), e;
    }
    function si(e, t, l, a, n, i) {
      var c = 0;
      if (a = e, typeof e == "function") Zr(e) && (c = 1);
      else if (typeof e == "string") c = c0(e, l, F.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else e: switch (e) {
        case ze:
          return e = qt(31, l, t, n), e.elementType = ze, e.lanes = i, e;
        case Q:
          return Ua(l.children, n, i, t);
        case q:
          c = 8, n |= 24;
          break;
        case $:
          return e = qt(12, l, t, n | 2), e.elementType = $, e.lanes = i, e;
        case ye:
          return e = qt(13, l, t, n), e.elementType = ye, e.lanes = i, e;
        case be:
          return e = qt(19, l, t, n), e.elementType = be, e.lanes = i, e;
        default:
          if (typeof e == "object" && e !== null) switch (e.$$typeof) {
            case I:
              c = 10;
              break e;
            case W:
              c = 9;
              break e;
            case Re:
              c = 11;
              break e;
            case ue:
              c = 14;
              break e;
            case D:
              c = 16, a = null;
              break e;
          }
          c = 29, l = Error(f(130, e === null ? "null" : typeof e, "")), a = null;
      }
      return t = qt(c, l, t, n), t.elementType = e, t.type = a, t.lanes = i, t;
    }
    function Ua(e, t, l, a) {
      return e = qt(7, e, a, t), e.lanes = l, e;
    }
    function Kr(e, t, l) {
      return e = qt(6, e, null, t), e.lanes = l, e;
    }
    function Xo(e) {
      var t = qt(18, null, null, 0);
      return t.stateNode = e, t;
    }
    function Jr(e, t, l) {
      return t = qt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = l, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    var Qo = /* @__PURE__ */ new WeakMap();
    function Wt(e, t) {
      if (typeof e == "object" && e !== null) {
        var l = Qo.get(e);
        return l !== void 0 ? l : (t = {
          value: e,
          source: t,
          stack: Zu(t)
        }, Qo.set(e, t), t);
      }
      return {
        value: e,
        source: t,
        stack: Zu(t)
      };
    }
    var fn = [], cn = 0, di = null, Pn = 0, kt = [], Pt = 0, Wl = null, gl = 1, pl = "";
    function Ol(e, t) {
      fn[cn++] = Pn, fn[cn++] = di, di = e, Pn = t;
    }
    function Vo(e, t, l) {
      kt[Pt++] = gl, kt[Pt++] = pl, kt[Pt++] = Wl, Wl = e;
      var a = gl;
      e = pl;
      var n = 32 - Tt(a) - 1;
      a &= ~(1 << n), l += 1;
      var i = 32 - Tt(t) + n;
      if (30 < i) {
        var c = n - n % 5;
        i = (a & (1 << c) - 1).toString(32), a >>= c, n -= c, gl = 1 << 32 - Tt(t) + n | l << n | a, pl = i + e;
      } else gl = 1 << i | l << n | a, pl = e;
    }
    function Fr(e) {
      e.return !== null && (Ol(e, 1), Vo(e, 1, 0));
    }
    function $r(e) {
      for (; e === di; ) di = fn[--cn], fn[cn] = null, Pn = fn[--cn], fn[cn] = null;
      for (; e === Wl; ) Wl = kt[--Pt], kt[Pt] = null, pl = kt[--Pt], kt[Pt] = null, gl = kt[--Pt], kt[Pt] = null;
    }
    function Zo(e, t) {
      kt[Pt++] = gl, kt[Pt++] = pl, kt[Pt++] = Wl, gl = t.id, pl = t.overflow, Wl = e;
    }
    var St = null, ke = null, Ne = false, kl = null, It = false, Wr = Error(f(519));
    function Pl(e) {
      var t = Error(f(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
      throw In(Wt(t, e)), Wr;
    }
    function Ko(e) {
      var t = e.stateNode, l = e.type, a = e.memoizedProps;
      switch (t[J] = e, t[k] = a, l) {
        case "dialog":
          Oe("cancel", t), Oe("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          Oe("load", t);
          break;
        case "video":
        case "audio":
          for (l = 0; l < Eu.length; l++) Oe(Eu[l], t);
          break;
        case "source":
          Oe("error", t);
          break;
        case "img":
        case "image":
        case "link":
          Oe("error", t), Oe("load", t);
          break;
        case "details":
          Oe("toggle", t);
          break;
        case "input":
          Oe("invalid", t), no(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, true);
          break;
        case "select":
          Oe("invalid", t);
          break;
        case "textarea":
          Oe("invalid", t), io(t, a.value, a.defaultValue, a.children);
      }
      l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === true || ch(t.textContent, l) ? (a.popover != null && (Oe("beforetoggle", t), Oe("toggle", t)), a.onScroll != null && Oe("scroll", t), a.onScrollEnd != null && Oe("scrollend", t), a.onClick != null && (t.onclick = Ml), t = true) : t = false, t || Pl(e, true);
    }
    function Jo(e) {
      for (St = e.return; St; ) switch (St.tag) {
        case 5:
        case 31:
        case 13:
          It = false;
          return;
        case 27:
        case 3:
          It = true;
          return;
        default:
          St = St.return;
      }
    }
    function on(e) {
      if (e !== St) return false;
      if (!Ne) return Jo(e), Ne = true, false;
      var t = e.tag, l;
      if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || yc(e.type, e.memoizedProps)), l = !l), l && ke && Pl(e), Jo(e), t === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(317));
        ke = ph(e);
      } else if (t === 31) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(317));
        ke = ph(e);
      } else t === 27 ? (t = ke, da(e.type) ? (e = Sc, Sc = null, ke = e) : ke = t) : ke = St ? tl(e.stateNode.nextSibling) : null;
      return true;
    }
    function xa() {
      ke = St = null, Ne = false;
    }
    function kr() {
      var e = kl;
      return e !== null && (wt === null ? wt = e : wt.push.apply(wt, e), kl = null), e;
    }
    function In(e) {
      kl === null ? kl = [
        e
      ] : kl.push(e);
    }
    var Pr = E(null), Na = null, _l = null;
    function Il(e, t, l) {
      K(Pr, t._currentValue), t._currentValue = l;
    }
    function Cl(e) {
      e._currentValue = Pr.current, B(Pr);
    }
    function Ir(e, t, l) {
      for (; e !== null; ) {
        var a = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === l) break;
        e = e.return;
      }
    }
    function ef(e, t, l, a) {
      var n = e.child;
      for (n !== null && (n.return = e); n !== null; ) {
        var i = n.dependencies;
        if (i !== null) {
          var c = n.child;
          i = i.firstContext;
          e: for (; i !== null; ) {
            var h = i;
            i = n;
            for (var p = 0; p < t.length; p++) if (h.context === t[p]) {
              i.lanes |= l, h = i.alternate, h !== null && (h.lanes |= l), Ir(i.return, l, e), a || (c = null);
              break e;
            }
            i = h.next;
          }
        } else if (n.tag === 18) {
          if (c = n.return, c === null) throw Error(f(341));
          c.lanes |= l, i = c.alternate, i !== null && (i.lanes |= l), Ir(c, l, e), c = null;
        } else c = n.child;
        if (c !== null) c.return = n;
        else for (c = n; c !== null; ) {
          if (c === e) {
            c = null;
            break;
          }
          if (n = c.sibling, n !== null) {
            n.return = c.return, c = n;
            break;
          }
          c = c.return;
        }
        n = c;
      }
    }
    function sn(e, t, l, a) {
      e = null;
      for (var n = t, i = false; n !== null; ) {
        if (!i) {
          if ((n.flags & 524288) !== 0) i = true;
          else if ((n.flags & 262144) !== 0) break;
        }
        if (n.tag === 10) {
          var c = n.alternate;
          if (c === null) throw Error(f(387));
          if (c = c.memoizedProps, c !== null) {
            var h = n.type;
            Yt(n.pendingProps.value, c.value) || (e !== null ? e.push(h) : e = [
              h
            ]);
          }
        } else if (n === Te.current) {
          if (c = n.alternate, c === null) throw Error(f(387));
          c.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Du) : e = [
            Du
          ]);
        }
        n = n.return;
      }
      e !== null && ef(t, e, l, a), t.flags |= 262144;
    }
    function hi(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!Yt(e.context._currentValue, e.memoizedValue)) return true;
        e = e.next;
      }
      return false;
    }
    function Ha(e) {
      Na = e, _l = null, e = e.dependencies, e !== null && (e.firstContext = null);
    }
    function Et(e) {
      return Fo(Na, e);
    }
    function mi(e, t) {
      return Na === null && Ha(e), Fo(e, t);
    }
    function Fo(e, t) {
      var l = t._currentValue;
      if (t = {
        context: t,
        memoizedValue: l,
        next: null
      }, _l === null) {
        if (e === null) throw Error(f(308));
        _l = t, e.dependencies = {
          lanes: 0,
          firstContext: t
        }, e.flags |= 524288;
      } else _l = _l.next = t;
      return l;
    }
    var uv = typeof AbortController < "u" ? AbortController : function() {
      var e = [], t = this.signal = {
        aborted: false,
        addEventListener: function(l, a) {
          e.push(a);
        }
      };
      this.abort = function() {
        t.aborted = true, e.forEach(function(l) {
          return l();
        });
      };
    }, iv = u.unstable_scheduleCallback, rv = u.unstable_NormalPriority, ot = {
      $$typeof: I,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
    function tf() {
      return {
        controller: new uv(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function eu(e) {
      e.refCount--, e.refCount === 0 && iv(rv, function() {
        e.controller.abort();
      });
    }
    var tu = null, lf = 0, dn = 0, hn = null;
    function fv(e, t) {
      if (tu === null) {
        var l = tu = [];
        lf = 0, dn = ic(), hn = {
          status: "pending",
          value: void 0,
          then: function(a) {
            l.push(a);
          }
        };
      }
      return lf++, t.then($o, $o), t;
    }
    function $o() {
      if (--lf === 0 && tu !== null) {
        hn !== null && (hn.status = "fulfilled");
        var e = tu;
        tu = null, dn = 0, hn = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function cv(e, t) {
      var l = [], a = {
        status: "pending",
        value: null,
        reason: null,
        then: function(n) {
          l.push(n);
        }
      };
      return e.then(function() {
        a.status = "fulfilled", a.value = t;
        for (var n = 0; n < l.length; n++) (0, l[n])(t);
      }, function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++) (0, l[n])(void 0);
      }), a;
    }
    var Wo = U.S;
    U.S = function(e, t) {
      Nd = Ot(), typeof t == "object" && t !== null && typeof t.then == "function" && fv(e, t), Wo !== null && Wo(e, t);
    };
    var La = E(null);
    function af() {
      var e = La.current;
      return e !== null ? e : Je.pooledCache;
    }
    function yi(e, t) {
      t === null ? K(La, La.current) : K(La, t.pool);
    }
    function ko() {
      var e = af();
      return e === null ? null : {
        parent: ot._currentValue,
        pool: e
      };
    }
    var mn = Error(f(460)), nf = Error(f(474)), vi = Error(f(542)), gi = {
      then: function() {
      }
    };
    function Po(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function Io(e, t, l) {
      switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(Ml, Ml), t = l), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, ts(e), e;
        default:
          if (typeof t.status == "string") t.then(Ml, Ml);
          else {
            if (e = Je, e !== null && 100 < e.shellSuspendCounter) throw Error(f(482));
            e = t, e.status = "pending", e.then(function(a) {
              if (t.status === "pending") {
                var n = t;
                n.status = "fulfilled", n.value = a;
              }
            }, function(a) {
              if (t.status === "pending") {
                var n = t;
                n.status = "rejected", n.reason = a;
              }
            });
          }
          switch (t.status) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw e = t.reason, ts(e), e;
          }
          throw Ba = t, mn;
      }
    }
    function wa(e) {
      try {
        var t = e._init;
        return t(e._payload);
      } catch (l) {
        throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Ba = l, mn) : l;
      }
    }
    var Ba = null;
    function es() {
      if (Ba === null) throw Error(f(459));
      var e = Ba;
      return Ba = null, e;
    }
    function ts(e) {
      if (e === mn || e === vi) throw Error(f(483));
    }
    var yn = null, lu = 0;
    function pi(e) {
      var t = lu;
      return lu += 1, yn === null && (yn = []), Io(yn, e, t);
    }
    function au(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function bi(e, t) {
      throw t.$$typeof === N ? Error(f(525)) : (e = Object.prototype.toString.call(t), Error(f(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
    }
    function ls(e) {
      function t(T, R) {
        if (e) {
          var A = T.deletions;
          A === null ? (T.deletions = [
            R
          ], T.flags |= 16) : A.push(R);
        }
      }
      function l(T, R) {
        if (!e) return null;
        for (; R !== null; ) t(T, R), R = R.sibling;
        return null;
      }
      function a(T) {
        for (var R = /* @__PURE__ */ new Map(); T !== null; ) T.key !== null ? R.set(T.key, T) : R.set(T.index, T), T = T.sibling;
        return R;
      }
      function n(T, R) {
        return T = Al(T, R), T.index = 0, T.sibling = null, T;
      }
      function i(T, R, A) {
        return T.index = A, e ? (A = T.alternate, A !== null ? (A = A.index, A < R ? (T.flags |= 67108866, R) : A) : (T.flags |= 67108866, R)) : (T.flags |= 1048576, R);
      }
      function c(T) {
        return e && T.alternate === null && (T.flags |= 67108866), T;
      }
      function h(T, R, A, j) {
        return R === null || R.tag !== 6 ? (R = Kr(A, T.mode, j), R.return = T, R) : (R = n(R, A), R.return = T, R);
      }
      function p(T, R, A, j) {
        var fe = A.type;
        return fe === Q ? w(T, R, A.props.children, j, A.key) : R !== null && (R.elementType === fe || typeof fe == "object" && fe !== null && fe.$$typeof === D && wa(fe) === R.type) ? (R = n(R, A.props), au(R, A), R.return = T, R) : (R = si(A.type, A.key, A.props, null, T.mode, j), au(R, A), R.return = T, R);
      }
      function O(T, R, A, j) {
        return R === null || R.tag !== 4 || R.stateNode.containerInfo !== A.containerInfo || R.stateNode.implementation !== A.implementation ? (R = Jr(A, T.mode, j), R.return = T, R) : (R = n(R, A.children || []), R.return = T, R);
      }
      function w(T, R, A, j, fe) {
        return R === null || R.tag !== 7 ? (R = Ua(A, T.mode, j, fe), R.return = T, R) : (R = n(R, A), R.return = T, R);
      }
      function Y(T, R, A) {
        if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint") return R = Kr("" + R, T.mode, A), R.return = T, R;
        if (typeof R == "object" && R !== null) {
          switch (R.$$typeof) {
            case L:
              return A = si(R.type, R.key, R.props, null, T.mode, A), au(A, R), A.return = T, A;
            case G:
              return R = Jr(R, T.mode, A), R.return = T, R;
            case D:
              return R = wa(R), Y(T, R, A);
          }
          if (he(R) || me(R)) return R = Ua(R, T.mode, A, null), R.return = T, R;
          if (typeof R.then == "function") return Y(T, pi(R), A);
          if (R.$$typeof === I) return Y(T, mi(T, R), A);
          bi(T, R);
        }
        return null;
      }
      function _(T, R, A, j) {
        var fe = R !== null ? R.key : null;
        if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint") return fe !== null ? null : h(T, R, "" + A, j);
        if (typeof A == "object" && A !== null) {
          switch (A.$$typeof) {
            case L:
              return A.key === fe ? p(T, R, A, j) : null;
            case G:
              return A.key === fe ? O(T, R, A, j) : null;
            case D:
              return A = wa(A), _(T, R, A, j);
          }
          if (he(A) || me(A)) return fe !== null ? null : w(T, R, A, j, null);
          if (typeof A.then == "function") return _(T, R, pi(A), j);
          if (A.$$typeof === I) return _(T, R, mi(T, A), j);
          bi(T, A);
        }
        return null;
      }
      function H(T, R, A, j, fe) {
        if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint") return T = T.get(A) || null, h(R, T, "" + j, fe);
        if (typeof j == "object" && j !== null) {
          switch (j.$$typeof) {
            case L:
              return T = T.get(j.key === null ? A : j.key) || null, p(R, T, j, fe);
            case G:
              return T = T.get(j.key === null ? A : j.key) || null, O(R, T, j, fe);
            case D:
              return j = wa(j), H(T, R, A, j, fe);
          }
          if (he(j) || me(j)) return T = T.get(A) || null, w(R, T, j, fe, null);
          if (typeof j.then == "function") return H(T, R, A, pi(j), fe);
          if (j.$$typeof === I) return H(T, R, A, mi(R, j), fe);
          bi(R, j);
        }
        return null;
      }
      function te(T, R, A, j) {
        for (var fe = null, we = null, ne = R, Ee = R = 0, Ce = null; ne !== null && Ee < A.length; Ee++) {
          ne.index > Ee ? (Ce = ne, ne = null) : Ce = ne.sibling;
          var Be = _(T, ne, A[Ee], j);
          if (Be === null) {
            ne === null && (ne = Ce);
            break;
          }
          e && ne && Be.alternate === null && t(T, ne), R = i(Be, R, Ee), we === null ? fe = Be : we.sibling = Be, we = Be, ne = Ce;
        }
        if (Ee === A.length) return l(T, ne), Ne && Ol(T, Ee), fe;
        if (ne === null) {
          for (; Ee < A.length; Ee++) ne = Y(T, A[Ee], j), ne !== null && (R = i(ne, R, Ee), we === null ? fe = ne : we.sibling = ne, we = ne);
          return Ne && Ol(T, Ee), fe;
        }
        for (ne = a(ne); Ee < A.length; Ee++) Ce = H(ne, T, Ee, A[Ee], j), Ce !== null && (e && Ce.alternate !== null && ne.delete(Ce.key === null ? Ee : Ce.key), R = i(Ce, R, Ee), we === null ? fe = Ce : we.sibling = Ce, we = Ce);
        return e && ne.forEach(function(ga) {
          return t(T, ga);
        }), Ne && Ol(T, Ee), fe;
      }
      function se(T, R, A, j) {
        if (A == null) throw Error(f(151));
        for (var fe = null, we = null, ne = R, Ee = R = 0, Ce = null, Be = A.next(); ne !== null && !Be.done; Ee++, Be = A.next()) {
          ne.index > Ee ? (Ce = ne, ne = null) : Ce = ne.sibling;
          var ga = _(T, ne, Be.value, j);
          if (ga === null) {
            ne === null && (ne = Ce);
            break;
          }
          e && ne && ga.alternate === null && t(T, ne), R = i(ga, R, Ee), we === null ? fe = ga : we.sibling = ga, we = ga, ne = Ce;
        }
        if (Be.done) return l(T, ne), Ne && Ol(T, Ee), fe;
        if (ne === null) {
          for (; !Be.done; Ee++, Be = A.next()) Be = Y(T, Be.value, j), Be !== null && (R = i(Be, R, Ee), we === null ? fe = Be : we.sibling = Be, we = Be);
          return Ne && Ol(T, Ee), fe;
        }
        for (ne = a(ne); !Be.done; Ee++, Be = A.next()) Be = H(ne, T, Ee, Be.value, j), Be !== null && (e && Be.alternate !== null && ne.delete(Be.key === null ? Ee : Be.key), R = i(Be, R, Ee), we === null ? fe = Be : we.sibling = Be, we = Be);
        return e && ne.forEach(function(S0) {
          return t(T, S0);
        }), Ne && Ol(T, Ee), fe;
      }
      function Qe(T, R, A, j) {
        if (typeof A == "object" && A !== null && A.type === Q && A.key === null && (A = A.props.children), typeof A == "object" && A !== null) {
          switch (A.$$typeof) {
            case L:
              e: {
                for (var fe = A.key; R !== null; ) {
                  if (R.key === fe) {
                    if (fe = A.type, fe === Q) {
                      if (R.tag === 7) {
                        l(T, R.sibling), j = n(R, A.props.children), j.return = T, T = j;
                        break e;
                      }
                    } else if (R.elementType === fe || typeof fe == "object" && fe !== null && fe.$$typeof === D && wa(fe) === R.type) {
                      l(T, R.sibling), j = n(R, A.props), au(j, A), j.return = T, T = j;
                      break e;
                    }
                    l(T, R);
                    break;
                  } else t(T, R);
                  R = R.sibling;
                }
                A.type === Q ? (j = Ua(A.props.children, T.mode, j, A.key), j.return = T, T = j) : (j = si(A.type, A.key, A.props, null, T.mode, j), au(j, A), j.return = T, T = j);
              }
              return c(T);
            case G:
              e: {
                for (fe = A.key; R !== null; ) {
                  if (R.key === fe) if (R.tag === 4 && R.stateNode.containerInfo === A.containerInfo && R.stateNode.implementation === A.implementation) {
                    l(T, R.sibling), j = n(R, A.children || []), j.return = T, T = j;
                    break e;
                  } else {
                    l(T, R);
                    break;
                  }
                  else t(T, R);
                  R = R.sibling;
                }
                j = Jr(A, T.mode, j), j.return = T, T = j;
              }
              return c(T);
            case D:
              return A = wa(A), Qe(T, R, A, j);
          }
          if (he(A)) return te(T, R, A, j);
          if (me(A)) {
            if (fe = me(A), typeof fe != "function") throw Error(f(150));
            return A = fe.call(A), se(T, R, A, j);
          }
          if (typeof A.then == "function") return Qe(T, R, pi(A), j);
          if (A.$$typeof === I) return Qe(T, R, mi(T, A), j);
          bi(T, A);
        }
        return typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint" ? (A = "" + A, R !== null && R.tag === 6 ? (l(T, R.sibling), j = n(R, A), j.return = T, T = j) : (l(T, R), j = Kr(A, T.mode, j), j.return = T, T = j), c(T)) : l(T, R);
      }
      return function(T, R, A, j) {
        try {
          lu = 0;
          var fe = Qe(T, R, A, j);
          return yn = null, fe;
        } catch (ne) {
          if (ne === mn || ne === vi) throw ne;
          var we = qt(29, ne, null, T.mode);
          return we.lanes = j, we.return = T, we;
        }
      };
    }
    var ja = ls(true), as = ls(false), ea = false;
    function uf(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          lanes: 0,
          hiddenCallbacks: null
        },
        callbacks: null
      };
    }
    function rf(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null
      });
    }
    function ta(e) {
      return {
        lane: e,
        tag: 0,
        payload: null,
        callback: null,
        next: null
      };
    }
    function la(e, t, l) {
      var a = e.updateQueue;
      if (a === null) return null;
      if (a = a.shared, (je & 2) !== 0) {
        var n = a.pending;
        return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = oi(e), qo(e, null, l), t;
      }
      return ci(e, a, t, l), oi(e);
    }
    function nu(e, t, l) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
        var a = t.lanes;
        a &= e.pendingLanes, l |= a, t.lanes = l, ku(e, l);
      }
    }
    function ff(e, t) {
      var l = e.updateQueue, a = e.alternate;
      if (a !== null && (a = a.updateQueue, l === a)) {
        var n = null, i = null;
        if (l = l.firstBaseUpdate, l !== null) {
          do {
            var c = {
              lane: l.lane,
              tag: l.tag,
              payload: l.payload,
              callback: null,
              next: null
            };
            i === null ? n = i = c : i = i.next = c, l = l.next;
          } while (l !== null);
          i === null ? n = i = t : i = i.next = t;
        } else n = i = t;
        l = {
          baseState: a.baseState,
          firstBaseUpdate: n,
          lastBaseUpdate: i,
          shared: a.shared,
          callbacks: a.callbacks
        }, e.updateQueue = l;
        return;
      }
      e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
    }
    var cf = false;
    function uu() {
      if (cf) {
        var e = hn;
        if (e !== null) throw e;
      }
    }
    function iu(e, t, l, a) {
      cf = false;
      var n = e.updateQueue;
      ea = false;
      var i = n.firstBaseUpdate, c = n.lastBaseUpdate, h = n.shared.pending;
      if (h !== null) {
        n.shared.pending = null;
        var p = h, O = p.next;
        p.next = null, c === null ? i = O : c.next = O, c = p;
        var w = e.alternate;
        w !== null && (w = w.updateQueue, h = w.lastBaseUpdate, h !== c && (h === null ? w.firstBaseUpdate = O : h.next = O, w.lastBaseUpdate = p));
      }
      if (i !== null) {
        var Y = n.baseState;
        c = 0, w = O = p = null, h = i;
        do {
          var _ = h.lane & -536870913, H = _ !== h.lane;
          if (H ? (_e & _) === _ : (a & _) === _) {
            _ !== 0 && _ === dn && (cf = true), w !== null && (w = w.next = {
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: null,
              next: null
            });
            e: {
              var te = e, se = h;
              _ = t;
              var Qe = l;
              switch (se.tag) {
                case 1:
                  if (te = se.payload, typeof te == "function") {
                    Y = te.call(Qe, Y, _);
                    break e;
                  }
                  Y = te;
                  break e;
                case 3:
                  te.flags = te.flags & -65537 | 128;
                case 0:
                  if (te = se.payload, _ = typeof te == "function" ? te.call(Qe, Y, _) : te, _ == null) break e;
                  Y = S({}, Y, _);
                  break e;
                case 2:
                  ea = true;
              }
            }
            _ = h.callback, _ !== null && (e.flags |= 64, H && (e.flags |= 8192), H = n.callbacks, H === null ? n.callbacks = [
              _
            ] : H.push(_));
          } else H = {
            lane: _,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          }, w === null ? (O = w = H, p = Y) : w = w.next = H, c |= _;
          if (h = h.next, h === null) {
            if (h = n.shared.pending, h === null) break;
            H = h, h = H.next, H.next = null, n.lastBaseUpdate = H, n.shared.pending = null;
          }
        } while (true);
        w === null && (p = Y), n.baseState = p, n.firstBaseUpdate = O, n.lastBaseUpdate = w, i === null && (n.shared.lanes = 0), ra |= c, e.lanes = c, e.memoizedState = Y;
      }
    }
    function ns(e, t) {
      if (typeof e != "function") throw Error(f(191, e));
      e.call(t);
    }
    function us(e, t) {
      var l = e.callbacks;
      if (l !== null) for (e.callbacks = null, e = 0; e < l.length; e++) ns(l[e], t);
    }
    var vn = E(null), Si = E(0);
    function is(e, t) {
      e = Yl, K(Si, e), K(vn, t), Yl = e | t.baseLanes;
    }
    function of() {
      K(Si, Yl), K(vn, vn.current);
    }
    function sf() {
      Yl = Si.current, B(vn), B(Si);
    }
    var Gt = E(null), el = null;
    function aa(e) {
      var t = e.alternate;
      K(ut, ut.current & 1), K(Gt, e), el === null && (t === null || vn.current !== null || t.memoizedState !== null) && (el = e);
    }
    function df(e) {
      K(ut, ut.current), K(Gt, e), el === null && (el = e);
    }
    function rs(e) {
      e.tag === 22 ? (K(ut, ut.current), K(Gt, e), el === null && (el = e)) : na();
    }
    function na() {
      K(ut, ut.current), K(Gt, Gt.current);
    }
    function Xt(e) {
      B(Gt), el === e && (el = null), B(ut);
    }
    var ut = E(0);
    function Ei(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var l = t.memoizedState;
          if (l !== null && (l = l.dehydrated, l === null || pc(l) || bc(l))) return t;
        } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
          if ((t.flags & 128) !== 0) return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var Ul = 0, ge = null, Ge = null, st = null, Ri = false, gn = false, Ya = false, zi = 0, ru = 0, pn = null, ov = 0;
    function lt() {
      throw Error(f(321));
    }
    function hf(e, t) {
      if (t === null) return false;
      for (var l = 0; l < t.length && l < e.length; l++) if (!Yt(e[l], t[l])) return false;
      return true;
    }
    function mf(e, t, l, a, n, i) {
      return Ul = i, ge = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, U.H = e === null || e.memoizedState === null ? Vs : _f, Ya = false, i = l(a, n), Ya = false, gn && (i = cs(t, l, a, n)), fs(e), i;
    }
    function fs(e) {
      U.H = ou;
      var t = Ge !== null && Ge.next !== null;
      if (Ul = 0, st = Ge = ge = null, Ri = false, ru = 0, pn = null, t) throw Error(f(300));
      e === null || dt || (e = e.dependencies, e !== null && hi(e) && (dt = true));
    }
    function cs(e, t, l, a) {
      ge = e;
      var n = 0;
      do {
        if (gn && (pn = null), ru = 0, gn = false, 25 <= n) throw Error(f(301));
        if (n += 1, st = Ge = null, e.updateQueue != null) {
          var i = e.updateQueue;
          i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
        }
        U.H = Zs, i = t(l, a);
      } while (gn);
      return i;
    }
    function sv() {
      var e = U.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? fu(t) : t, e = e.useState()[0], (Ge !== null ? Ge.memoizedState : null) !== e && (ge.flags |= 1024), t;
    }
    function yf() {
      var e = zi !== 0;
      return zi = 0, e;
    }
    function vf(e, t, l) {
      t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
    }
    function gf(e) {
      if (Ri) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Ri = false;
      }
      Ul = 0, st = Ge = ge = null, gn = false, ru = zi = 0, pn = null;
    }
    function Ct() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return st === null ? ge.memoizedState = st = e : st = st.next = e, st;
    }
    function it() {
      if (Ge === null) {
        var e = ge.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = Ge.next;
      var t = st === null ? ge.memoizedState : st.next;
      if (t !== null) st = t, Ge = e;
      else {
        if (e === null) throw ge.alternate === null ? Error(f(467)) : Error(f(310));
        Ge = e, e = {
          memoizedState: Ge.memoizedState,
          baseState: Ge.baseState,
          baseQueue: Ge.baseQueue,
          queue: Ge.queue,
          next: null
        }, st === null ? ge.memoizedState = st = e : st = st.next = e;
      }
      return st;
    }
    function Ti() {
      return {
        lastEffect: null,
        events: null,
        stores: null,
        memoCache: null
      };
    }
    function fu(e) {
      var t = ru;
      return ru += 1, pn === null && (pn = []), e = Io(pn, e, t), t = ge, (st === null ? t.memoizedState : st.next) === null && (t = t.alternate, U.H = t === null || t.memoizedState === null ? Vs : _f), e;
    }
    function Mi(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return fu(e);
        if (e.$$typeof === I) return Et(e);
      }
      throw Error(f(438, String(e)));
    }
    function pf(e) {
      var t = null, l = ge.updateQueue;
      if (l !== null && (t = l.memoCache), t == null) {
        var a = ge.alternate;
        a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
          data: a.data.map(function(n) {
            return n.slice();
          }),
          index: 0
        })));
      }
      if (t == null && (t = {
        data: [],
        index: 0
      }), l === null && (l = Ti(), ge.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0) for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = Ue;
      return t.index++, l;
    }
    function xl(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Di(e) {
      var t = it();
      return bf(t, Ge, e);
    }
    function bf(e, t, l) {
      var a = e.queue;
      if (a === null) throw Error(f(311));
      a.lastRenderedReducer = l;
      var n = e.baseQueue, i = a.pending;
      if (i !== null) {
        if (n !== null) {
          var c = n.next;
          n.next = i.next, i.next = c;
        }
        t.baseQueue = n = i, a.pending = null;
      }
      if (i = e.baseState, n === null) e.memoizedState = i;
      else {
        t = n.next;
        var h = c = null, p = null, O = t, w = false;
        do {
          var Y = O.lane & -536870913;
          if (Y !== O.lane ? (_e & Y) === Y : (Ul & Y) === Y) {
            var _ = O.revertLane;
            if (_ === 0) p !== null && (p = p.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }), Y === dn && (w = true);
            else if ((Ul & _) === _) {
              O = O.next, _ === dn && (w = true);
              continue;
            } else Y = {
              lane: 0,
              revertLane: O.revertLane,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }, p === null ? (h = p = Y, c = i) : p = p.next = Y, ge.lanes |= _, ra |= _;
            Y = O.action, Ya && l(i, Y), i = O.hasEagerState ? O.eagerState : l(i, Y);
          } else _ = {
            lane: Y,
            revertLane: O.revertLane,
            gesture: O.gesture,
            action: O.action,
            hasEagerState: O.hasEagerState,
            eagerState: O.eagerState,
            next: null
          }, p === null ? (h = p = _, c = i) : p = p.next = _, ge.lanes |= Y, ra |= Y;
          O = O.next;
        } while (O !== null && O !== t);
        if (p === null ? c = i : p.next = h, !Yt(i, e.memoizedState) && (dt = true, w && (l = hn, l !== null))) throw l;
        e.memoizedState = i, e.baseState = c, e.baseQueue = p, a.lastRenderedState = i;
      }
      return n === null && (a.lanes = 0), [
        e.memoizedState,
        a.dispatch
      ];
    }
    function Sf(e) {
      var t = it(), l = t.queue;
      if (l === null) throw Error(f(311));
      l.lastRenderedReducer = e;
      var a = l.dispatch, n = l.pending, i = t.memoizedState;
      if (n !== null) {
        l.pending = null;
        var c = n = n.next;
        do
          i = e(i, c.action), c = c.next;
        while (c !== n);
        Yt(i, t.memoizedState) || (dt = true), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), l.lastRenderedState = i;
      }
      return [
        i,
        a
      ];
    }
    function os(e, t, l) {
      var a = ge, n = it(), i = Ne;
      if (i) {
        if (l === void 0) throw Error(f(407));
        l = l();
      } else l = t();
      var c = !Yt((Ge || n).memoizedState, l);
      if (c && (n.memoizedState = l, dt = true), n = n.queue, zf(hs.bind(null, a, n, e), [
        e
      ]), n.getSnapshot !== t || c || st !== null && st.memoizedState.tag & 1) {
        if (a.flags |= 2048, bn(9, {
          destroy: void 0
        }, ds.bind(null, a, n, l, t), null), Je === null) throw Error(f(349));
        i || (Ul & 127) !== 0 || ss(a, t, l);
      }
      return l;
    }
    function ss(e, t, l) {
      e.flags |= 16384, e = {
        getSnapshot: t,
        value: l
      }, t = ge.updateQueue, t === null ? (t = Ti(), ge.updateQueue = t, t.stores = [
        e
      ]) : (l = t.stores, l === null ? t.stores = [
        e
      ] : l.push(e));
    }
    function ds(e, t, l, a) {
      t.value = l, t.getSnapshot = a, ms(t) && ys(e);
    }
    function hs(e, t, l) {
      return l(function() {
        ms(t) && ys(e);
      });
    }
    function ms(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var l = t();
        return !Yt(e, l);
      } catch {
        return true;
      }
    }
    function ys(e) {
      var t = Ca(e, 2);
      t !== null && Bt(t, e, 2);
    }
    function Ef(e) {
      var t = Ct();
      if (typeof e == "function") {
        var l = e;
        if (e = l(), Ya) {
          gt(true);
          try {
            l();
          } finally {
            gt(false);
          }
        }
      }
      return t.memoizedState = t.baseState = e, t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: xl,
        lastRenderedState: e
      }, t;
    }
    function vs(e, t, l, a) {
      return e.baseState = l, bf(e, Ge, typeof a == "function" ? a : xl);
    }
    function dv(e, t, l, a, n) {
      if (_i(e)) throw Error(f(485));
      if (e = t.action, e !== null) {
        var i = {
          payload: n,
          action: e,
          next: null,
          isTransition: true,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(c) {
            i.listeners.push(c);
          }
        };
        U.T !== null ? l(true) : i.isTransition = false, a(i), l = t.pending, l === null ? (i.next = t.pending = i, gs(t, i)) : (i.next = l.next, t.pending = l.next = i);
      }
    }
    function gs(e, t) {
      var l = t.action, a = t.payload, n = e.state;
      if (t.isTransition) {
        var i = U.T, c = {};
        U.T = c;
        try {
          var h = l(n, a), p = U.S;
          p !== null && p(c, h), ps(e, t, h);
        } catch (O) {
          Rf(e, t, O);
        } finally {
          i !== null && c.types !== null && (i.types = c.types), U.T = i;
        }
      } else try {
        i = l(n, a), ps(e, t, i);
      } catch (O) {
        Rf(e, t, O);
      }
    }
    function ps(e, t, l) {
      l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(function(a) {
        bs(e, t, a);
      }, function(a) {
        return Rf(e, t, a);
      }) : bs(e, t, l);
    }
    function bs(e, t, l) {
      t.status = "fulfilled", t.value = l, Ss(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, gs(e, l)));
    }
    function Rf(e, t, l) {
      var a = e.pending;
      if (e.pending = null, a !== null) {
        a = a.next;
        do
          t.status = "rejected", t.reason = l, Ss(t), t = t.next;
        while (t !== a);
      }
      e.action = null;
    }
    function Ss(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function Es(e, t) {
      return t;
    }
    function Rs(e, t) {
      if (Ne) {
        var l = Je.formState;
        if (l !== null) {
          e: {
            var a = ge;
            if (Ne) {
              if (ke) {
                t: {
                  for (var n = ke, i = It; n.nodeType !== 8; ) {
                    if (!i) {
                      n = null;
                      break t;
                    }
                    if (n = tl(n.nextSibling), n === null) {
                      n = null;
                      break t;
                    }
                  }
                  i = n.data, n = i === "F!" || i === "F" ? n : null;
                }
                if (n) {
                  ke = tl(n.nextSibling), a = n.data === "F!";
                  break e;
                }
              }
              Pl(a);
            }
            a = false;
          }
          a && (t = l[0]);
        }
      }
      return l = Ct(), l.memoizedState = l.baseState = t, a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Es,
        lastRenderedState: t
      }, l.queue = a, l = Gs.bind(null, ge, a), a.dispatch = l, a = Ef(false), i = Of.bind(null, ge, false, a.queue), a = Ct(), n = {
        state: t,
        dispatch: null,
        action: e,
        pending: null
      }, a.queue = n, l = dv.bind(null, ge, n, i, l), n.dispatch = l, a.memoizedState = e, [
        t,
        l,
        false
      ];
    }
    function zs(e) {
      var t = it();
      return Ts(t, Ge, e);
    }
    function Ts(e, t, l) {
      if (t = bf(e, t, Es)[0], e = Di(xl)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
        var a = fu(t);
      } catch (c) {
        throw c === mn ? vi : c;
      }
      else a = t;
      t = it();
      var n = t.queue, i = n.dispatch;
      return l !== t.memoizedState && (ge.flags |= 2048, bn(9, {
        destroy: void 0
      }, hv.bind(null, n, l), null)), [
        a,
        i,
        e
      ];
    }
    function hv(e, t) {
      e.action = t;
    }
    function Ms(e) {
      var t = it(), l = Ge;
      if (l !== null) return Ts(t, l, e);
      it(), t = t.memoizedState, l = it();
      var a = l.queue.dispatch;
      return l.memoizedState = e, [
        t,
        a,
        false
      ];
    }
    function bn(e, t, l, a) {
      return e = {
        tag: e,
        create: l,
        deps: a,
        inst: t,
        next: null
      }, t = ge.updateQueue, t === null && (t = Ti(), ge.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (a = l.next, l.next = e, e.next = a, t.lastEffect = e), e;
    }
    function Ds() {
      return it().memoizedState;
    }
    function Ai(e, t, l, a) {
      var n = Ct();
      ge.flags |= e, n.memoizedState = bn(1 | t, {
        destroy: void 0
      }, l, a === void 0 ? null : a);
    }
    function Oi(e, t, l, a) {
      var n = it();
      a = a === void 0 ? null : a;
      var i = n.memoizedState.inst;
      Ge !== null && a !== null && hf(a, Ge.memoizedState.deps) ? n.memoizedState = bn(t, i, l, a) : (ge.flags |= e, n.memoizedState = bn(1 | t, i, l, a));
    }
    function As(e, t) {
      Ai(8390656, 8, e, t);
    }
    function zf(e, t) {
      Oi(2048, 8, e, t);
    }
    function mv(e) {
      ge.flags |= 4;
      var t = ge.updateQueue;
      if (t === null) t = Ti(), ge.updateQueue = t, t.events = [
        e
      ];
      else {
        var l = t.events;
        l === null ? t.events = [
          e
        ] : l.push(e);
      }
    }
    function Os(e) {
      var t = it().memoizedState;
      return mv({
        ref: t,
        nextImpl: e
      }), function() {
        if ((je & 2) !== 0) throw Error(f(440));
        return t.impl.apply(void 0, arguments);
      };
    }
    function _s(e, t) {
      return Oi(4, 2, e, t);
    }
    function Cs(e, t) {
      return Oi(4, 4, e, t);
    }
    function Us(e, t) {
      if (typeof t == "function") {
        e = e();
        var l = t(e);
        return function() {
          typeof l == "function" ? l() : t(null);
        };
      }
      if (t != null) return e = e(), t.current = e, function() {
        t.current = null;
      };
    }
    function xs(e, t, l) {
      l = l != null ? l.concat([
        e
      ]) : null, Oi(4, 4, Us.bind(null, t, e), l);
    }
    function Tf() {
    }
    function Ns(e, t) {
      var l = it();
      t = t === void 0 ? null : t;
      var a = l.memoizedState;
      return t !== null && hf(t, a[1]) ? a[0] : (l.memoizedState = [
        e,
        t
      ], e);
    }
    function Hs(e, t) {
      var l = it();
      t = t === void 0 ? null : t;
      var a = l.memoizedState;
      if (t !== null && hf(t, a[1])) return a[0];
      if (a = e(), Ya) {
        gt(true);
        try {
          e();
        } finally {
          gt(false);
        }
      }
      return l.memoizedState = [
        a,
        t
      ], a;
    }
    function Mf(e, t, l) {
      return l === void 0 || (Ul & 1073741824) !== 0 && (_e & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = Ld(), ge.lanes |= e, ra |= e, l);
    }
    function Ls(e, t, l, a) {
      return Yt(l, t) ? l : vn.current !== null ? (e = Mf(e, l, a), Yt(e, t) || (dt = true), e) : (Ul & 42) === 0 || (Ul & 1073741824) !== 0 && (_e & 261930) === 0 ? (dt = true, e.memoizedState = l) : (e = Ld(), ge.lanes |= e, ra |= e, t);
    }
    function ws(e, t, l, a, n) {
      var i = V.p;
      V.p = i !== 0 && 8 > i ? i : 8;
      var c = U.T, h = {};
      U.T = h, Of(e, false, t, l);
      try {
        var p = n(), O = U.S;
        if (O !== null && O(h, p), p !== null && typeof p == "object" && typeof p.then == "function") {
          var w = cv(p, a);
          cu(e, t, w, Zt(e));
        } else cu(e, t, a, Zt(e));
      } catch (Y) {
        cu(e, t, {
          then: function() {
          },
          status: "rejected",
          reason: Y
        }, Zt());
      } finally {
        V.p = i, c !== null && h.types !== null && (c.types = h.types), U.T = c;
      }
    }
    function yv() {
    }
    function Df(e, t, l, a) {
      if (e.tag !== 5) throw Error(f(476));
      var n = Bs(e).queue;
      ws(e, n, t, le, l === null ? yv : function() {
        return js(e), l(a);
      });
    }
    function Bs(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: le,
        baseState: le,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: xl,
          lastRenderedState: le
        },
        next: null
      };
      var l = {};
      return t.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: xl,
          lastRenderedState: l
        },
        next: null
      }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
    }
    function js(e) {
      var t = Bs(e);
      t.next === null && (t = e.alternate.memoizedState), cu(e, t.next.queue, {}, Zt());
    }
    function Af() {
      return Et(Du);
    }
    function Ys() {
      return it().memoizedState;
    }
    function qs() {
      return it().memoizedState;
    }
    function vv(e) {
      for (var t = e.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var l = Zt();
            e = ta(l);
            var a = la(t, e, l);
            a !== null && (Bt(a, t, l), nu(a, t, l)), t = {
              cache: tf()
            }, e.payload = t;
            return;
        }
        t = t.return;
      }
    }
    function gv(e, t, l) {
      var a = Zt();
      l = {
        lane: a,
        revertLane: 0,
        gesture: null,
        action: l,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, _i(e) ? Xs(t, l) : (l = Vr(e, t, l, a), l !== null && (Bt(l, e, a), Qs(l, t, a)));
    }
    function Gs(e, t, l) {
      var a = Zt();
      cu(e, t, l, a);
    }
    function cu(e, t, l, a) {
      var n = {
        lane: a,
        revertLane: 0,
        gesture: null,
        action: l,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if (_i(e)) Xs(t, n);
      else {
        var i = e.alternate;
        if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
          var c = t.lastRenderedState, h = i(c, l);
          if (n.hasEagerState = true, n.eagerState = h, Yt(h, c)) return ci(e, t, n, 0), Je === null && fi(), false;
        } catch {
        }
        if (l = Vr(e, t, n, a), l !== null) return Bt(l, e, a), Qs(l, t, a), true;
      }
      return false;
    }
    function Of(e, t, l, a) {
      if (a = {
        lane: 2,
        revertLane: ic(),
        gesture: null,
        action: a,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, _i(e)) {
        if (t) throw Error(f(479));
      } else t = Vr(e, l, a, 2), t !== null && Bt(t, e, 2);
    }
    function _i(e) {
      var t = e.alternate;
      return e === ge || t !== null && t === ge;
    }
    function Xs(e, t) {
      gn = Ri = true;
      var l = e.pending;
      l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
    }
    function Qs(e, t, l) {
      if ((l & 4194048) !== 0) {
        var a = t.lanes;
        a &= e.pendingLanes, l |= a, t.lanes = l, ku(e, l);
      }
    }
    var ou = {
      readContext: Et,
      use: Mi,
      useCallback: lt,
      useContext: lt,
      useEffect: lt,
      useImperativeHandle: lt,
      useLayoutEffect: lt,
      useInsertionEffect: lt,
      useMemo: lt,
      useReducer: lt,
      useRef: lt,
      useState: lt,
      useDebugValue: lt,
      useDeferredValue: lt,
      useTransition: lt,
      useSyncExternalStore: lt,
      useId: lt,
      useHostTransitionStatus: lt,
      useFormState: lt,
      useActionState: lt,
      useOptimistic: lt,
      useMemoCache: lt,
      useCacheRefresh: lt
    };
    ou.useEffectEvent = lt;
    var Vs = {
      readContext: Et,
      use: Mi,
      useCallback: function(e, t) {
        return Ct().memoizedState = [
          e,
          t === void 0 ? null : t
        ], e;
      },
      useContext: Et,
      useEffect: As,
      useImperativeHandle: function(e, t, l) {
        l = l != null ? l.concat([
          e
        ]) : null, Ai(4194308, 4, Us.bind(null, t, e), l);
      },
      useLayoutEffect: function(e, t) {
        return Ai(4194308, 4, e, t);
      },
      useInsertionEffect: function(e, t) {
        Ai(4, 2, e, t);
      },
      useMemo: function(e, t) {
        var l = Ct();
        t = t === void 0 ? null : t;
        var a = e();
        if (Ya) {
          gt(true);
          try {
            e();
          } finally {
            gt(false);
          }
        }
        return l.memoizedState = [
          a,
          t
        ], a;
      },
      useReducer: function(e, t, l) {
        var a = Ct();
        if (l !== void 0) {
          var n = l(t);
          if (Ya) {
            gt(true);
            try {
              l(t);
            } finally {
              gt(false);
            }
          }
        } else n = t;
        return a.memoizedState = a.baseState = n, e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: n
        }, a.queue = e, e = e.dispatch = gv.bind(null, ge, e), [
          a.memoizedState,
          e
        ];
      },
      useRef: function(e) {
        var t = Ct();
        return e = {
          current: e
        }, t.memoizedState = e;
      },
      useState: function(e) {
        e = Ef(e);
        var t = e.queue, l = Gs.bind(null, ge, t);
        return t.dispatch = l, [
          e.memoizedState,
          l
        ];
      },
      useDebugValue: Tf,
      useDeferredValue: function(e, t) {
        var l = Ct();
        return Mf(l, e, t);
      },
      useTransition: function() {
        var e = Ef(false);
        return e = ws.bind(null, ge, e.queue, true, false), Ct().memoizedState = e, [
          false,
          e
        ];
      },
      useSyncExternalStore: function(e, t, l) {
        var a = ge, n = Ct();
        if (Ne) {
          if (l === void 0) throw Error(f(407));
          l = l();
        } else {
          if (l = t(), Je === null) throw Error(f(349));
          (_e & 127) !== 0 || ss(a, t, l);
        }
        n.memoizedState = l;
        var i = {
          value: l,
          getSnapshot: t
        };
        return n.queue = i, As(hs.bind(null, a, i, e), [
          e
        ]), a.flags |= 2048, bn(9, {
          destroy: void 0
        }, ds.bind(null, a, i, l, t), null), l;
      },
      useId: function() {
        var e = Ct(), t = Je.identifierPrefix;
        if (Ne) {
          var l = pl, a = gl;
          l = (a & ~(1 << 32 - Tt(a) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = zi++, 0 < l && (t += "H" + l.toString(32)), t += "_";
        } else l = ov++, t = "_" + t + "r_" + l.toString(32) + "_";
        return e.memoizedState = t;
      },
      useHostTransitionStatus: Af,
      useFormState: Rs,
      useActionState: Rs,
      useOptimistic: function(e) {
        var t = Ct();
        t.memoizedState = t.baseState = e;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null
        };
        return t.queue = l, t = Of.bind(null, ge, true, l), l.dispatch = t, [
          e,
          t
        ];
      },
      useMemoCache: pf,
      useCacheRefresh: function() {
        return Ct().memoizedState = vv.bind(null, ge);
      },
      useEffectEvent: function(e) {
        var t = Ct(), l = {
          impl: e
        };
        return t.memoizedState = l, function() {
          if ((je & 2) !== 0) throw Error(f(440));
          return l.impl.apply(void 0, arguments);
        };
      }
    }, _f = {
      readContext: Et,
      use: Mi,
      useCallback: Ns,
      useContext: Et,
      useEffect: zf,
      useImperativeHandle: xs,
      useInsertionEffect: _s,
      useLayoutEffect: Cs,
      useMemo: Hs,
      useReducer: Di,
      useRef: Ds,
      useState: function() {
        return Di(xl);
      },
      useDebugValue: Tf,
      useDeferredValue: function(e, t) {
        var l = it();
        return Ls(l, Ge.memoizedState, e, t);
      },
      useTransition: function() {
        var e = Di(xl)[0], t = it().memoizedState;
        return [
          typeof e == "boolean" ? e : fu(e),
          t
        ];
      },
      useSyncExternalStore: os,
      useId: Ys,
      useHostTransitionStatus: Af,
      useFormState: zs,
      useActionState: zs,
      useOptimistic: function(e, t) {
        var l = it();
        return vs(l, Ge, e, t);
      },
      useMemoCache: pf,
      useCacheRefresh: qs
    };
    _f.useEffectEvent = Os;
    var Zs = {
      readContext: Et,
      use: Mi,
      useCallback: Ns,
      useContext: Et,
      useEffect: zf,
      useImperativeHandle: xs,
      useInsertionEffect: _s,
      useLayoutEffect: Cs,
      useMemo: Hs,
      useReducer: Sf,
      useRef: Ds,
      useState: function() {
        return Sf(xl);
      },
      useDebugValue: Tf,
      useDeferredValue: function(e, t) {
        var l = it();
        return Ge === null ? Mf(l, e, t) : Ls(l, Ge.memoizedState, e, t);
      },
      useTransition: function() {
        var e = Sf(xl)[0], t = it().memoizedState;
        return [
          typeof e == "boolean" ? e : fu(e),
          t
        ];
      },
      useSyncExternalStore: os,
      useId: Ys,
      useHostTransitionStatus: Af,
      useFormState: Ms,
      useActionState: Ms,
      useOptimistic: function(e, t) {
        var l = it();
        return Ge !== null ? vs(l, Ge, e, t) : (l.baseState = e, [
          e,
          l.queue.dispatch
        ]);
      },
      useMemoCache: pf,
      useCacheRefresh: qs
    };
    Zs.useEffectEvent = Os;
    function Cf(e, t, l, a) {
      t = e.memoizedState, l = l(a, t), l = l == null ? t : S({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
    }
    var Uf = {
      enqueueSetState: function(e, t, l) {
        e = e._reactInternals;
        var a = Zt(), n = ta(a);
        n.payload = t, l != null && (n.callback = l), t = la(e, n, a), t !== null && (Bt(t, e, a), nu(t, e, a));
      },
      enqueueReplaceState: function(e, t, l) {
        e = e._reactInternals;
        var a = Zt(), n = ta(a);
        n.tag = 1, n.payload = t, l != null && (n.callback = l), t = la(e, n, a), t !== null && (Bt(t, e, a), nu(t, e, a));
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var l = Zt(), a = ta(l);
        a.tag = 2, t != null && (a.callback = t), t = la(e, a, l), t !== null && (Bt(t, e, l), nu(t, e, l));
      }
    };
    function Ks(e, t, l, a, n, i, c) {
      return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, i, c) : t.prototype && t.prototype.isPureReactComponent ? !Wn(l, a) || !Wn(n, i) : true;
    }
    function Js(e, t, l, a) {
      e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a), t.state !== e && Uf.enqueueReplaceState(t, t.state, null);
    }
    function qa(e, t) {
      var l = t;
      if ("ref" in t) {
        l = {};
        for (var a in t) a !== "ref" && (l[a] = t[a]);
      }
      if (e = e.defaultProps) {
        l === t && (l = S({}, l));
        for (var n in e) l[n] === void 0 && (l[n] = e[n]);
      }
      return l;
    }
    function Fs(e) {
      ri(e);
    }
    function $s(e) {
      console.error(e);
    }
    function Ws(e) {
      ri(e);
    }
    function Ci(e, t) {
      try {
        var l = e.onUncaughtError;
        l(t.value, {
          componentStack: t.stack
        });
      } catch (a) {
        setTimeout(function() {
          throw a;
        });
      }
    }
    function ks(e, t, l) {
      try {
        var a = e.onCaughtError;
        a(l.value, {
          componentStack: l.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null
        });
      } catch (n) {
        setTimeout(function() {
          throw n;
        });
      }
    }
    function xf(e, t, l) {
      return l = ta(l), l.tag = 3, l.payload = {
        element: null
      }, l.callback = function() {
        Ci(e, t);
      }, l;
    }
    function Ps(e) {
      return e = ta(e), e.tag = 3, e;
    }
    function Is(e, t, l, a) {
      var n = l.type.getDerivedStateFromError;
      if (typeof n == "function") {
        var i = a.value;
        e.payload = function() {
          return n(i);
        }, e.callback = function() {
          ks(t, l, a);
        };
      }
      var c = l.stateNode;
      c !== null && typeof c.componentDidCatch == "function" && (e.callback = function() {
        ks(t, l, a), typeof n != "function" && (fa === null ? fa = /* @__PURE__ */ new Set([
          this
        ]) : fa.add(this));
        var h = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: h !== null ? h : ""
        });
      });
    }
    function pv(e, t, l, a, n) {
      if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
        if (t = l.alternate, t !== null && sn(t, l, n, true), l = Gt.current, l !== null) {
          switch (l.tag) {
            case 31:
            case 13:
              return el === null ? Xi() : l.alternate === null && at === 0 && (at = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === gi ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([
                a
              ]) : t.add(a), ac(e, a, n)), false;
            case 22:
              return l.flags |= 65536, a === gi ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([
                  a
                ])
              }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([
                a
              ]) : l.add(a)), ac(e, a, n)), false;
          }
          throw Error(f(435, l.tag));
        }
        return ac(e, a, n), Xi(), false;
      }
      if (Ne) return t = Gt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== Wr && (e = Error(f(422), {
        cause: a
      }), In(Wt(e, l)))) : (a !== Wr && (t = Error(f(423), {
        cause: a
      }), In(Wt(t, l))), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, a = Wt(a, l), n = xf(e.stateNode, a, n), ff(e, n), at !== 4 && (at = 2)), false;
      var i = Error(f(520), {
        cause: a
      });
      if (i = Wt(i, l), pu === null ? pu = [
        i
      ] : pu.push(i), at !== 4 && (at = 2), t === null) return true;
      a = Wt(a, l), l = t;
      do {
        switch (l.tag) {
          case 3:
            return l.flags |= 65536, e = n & -n, l.lanes |= e, e = xf(l.stateNode, a, e), ff(l, e), false;
          case 1:
            if (t = l.type, i = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (fa === null || !fa.has(i)))) return l.flags |= 65536, n &= -n, l.lanes |= n, n = Ps(n), Is(n, e, l, a), ff(l, n), false;
        }
        l = l.return;
      } while (l !== null);
      return false;
    }
    var Nf = Error(f(461)), dt = false;
    function Rt(e, t, l, a) {
      t.child = e === null ? as(t, null, l, a) : ja(t, e.child, l, a);
    }
    function ed(e, t, l, a, n) {
      l = l.render;
      var i = t.ref;
      if ("ref" in a) {
        var c = {};
        for (var h in a) h !== "ref" && (c[h] = a[h]);
      } else c = a;
      return Ha(t), a = mf(e, t, l, c, i, n), h = yf(), e !== null && !dt ? (vf(e, t, n), Nl(e, t, n)) : (Ne && h && Fr(t), t.flags |= 1, Rt(e, t, a, n), t.child);
    }
    function td(e, t, l, a, n) {
      if (e === null) {
        var i = l.type;
        return typeof i == "function" && !Zr(i) && i.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = i, ld(e, t, i, a, n)) : (e = si(l.type, null, a, t, t.mode, n), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (i = e.child, !Gf(e, n)) {
        var c = i.memoizedProps;
        if (l = l.compare, l = l !== null ? l : Wn, l(c, a) && e.ref === t.ref) return Nl(e, t, n);
      }
      return t.flags |= 1, e = Al(i, a), e.ref = t.ref, e.return = t, t.child = e;
    }
    function ld(e, t, l, a, n) {
      if (e !== null) {
        var i = e.memoizedProps;
        if (Wn(i, a) && e.ref === t.ref) if (dt = false, t.pendingProps = a = i, Gf(e, n)) (e.flags & 131072) !== 0 && (dt = true);
        else return t.lanes = e.lanes, Nl(e, t, n);
      }
      return Hf(e, t, l, a, n);
    }
    function ad(e, t, l, a) {
      var n = a.children, i = e !== null ? e.memoizedState : null;
      if (e === null && t.stateNode === null && (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), a.mode === "hidden") {
        if ((t.flags & 128) !== 0) {
          if (i = i !== null ? i.baseLanes | l : l, e !== null) {
            for (a = t.child = e.child, n = 0; a !== null; ) n = n | a.lanes | a.childLanes, a = a.sibling;
            a = n & ~i;
          } else a = 0, t.child = null;
          return nd(e, t, i, l, a);
        }
        if ((l & 536870912) !== 0) t.memoizedState = {
          baseLanes: 0,
          cachePool: null
        }, e !== null && yi(t, i !== null ? i.cachePool : null), i !== null ? is(t, i) : of(), rs(t);
        else return a = t.lanes = 536870912, nd(e, t, i !== null ? i.baseLanes | l : l, l, a);
      } else i !== null ? (yi(t, i.cachePool), is(t, i), na(), t.memoizedState = null) : (e !== null && yi(t, null), of(), na());
      return Rt(e, t, n, l), t.child;
    }
    function su(e, t) {
      return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), t.sibling;
    }
    function nd(e, t, l, a, n) {
      var i = af();
      return i = i === null ? null : {
        parent: ot._currentValue,
        pool: i
      }, t.memoizedState = {
        baseLanes: l,
        cachePool: i
      }, e !== null && yi(t, null), of(), rs(t), e !== null && sn(e, t, a, true), t.childLanes = n, null;
    }
    function Ui(e, t) {
      return t = Ni({
        mode: t.mode,
        children: t.children
      }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
    }
    function ud(e, t, l) {
      return ja(t, e.child, null, l), e = Ui(t, t.pendingProps), e.flags |= 2, Xt(t), t.memoizedState = null, e;
    }
    function bv(e, t, l) {
      var a = t.pendingProps, n = (t.flags & 128) !== 0;
      if (t.flags &= -129, e === null) {
        if (Ne) {
          if (a.mode === "hidden") return e = Ui(t, a), t.lanes = 536870912, su(null, e);
          if (df(t), (e = ke) ? (e = gh(e, It), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: Wl !== null ? {
              id: gl,
              overflow: pl
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, l = Xo(e), l.return = t, t.child = l, St = t, ke = null)) : e = null, e === null) throw Pl(t);
          return t.lanes = 536870912, null;
        }
        return Ui(t, a);
      }
      var i = e.memoizedState;
      if (i !== null) {
        var c = i.dehydrated;
        if (df(t), n) if (t.flags & 256) t.flags &= -257, t = ud(e, t, l);
        else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
        else throw Error(f(558));
        else if (dt || sn(e, t, l, false), n = (l & e.childLanes) !== 0, dt || n) {
          if (a = Je, a !== null && (c = b(a, l), c !== 0 && c !== i.retryLane)) throw i.retryLane = c, Ca(e, c), Bt(a, e, c), Nf;
          Xi(), t = ud(e, t, l);
        } else e = i.treeContext, ke = tl(c.nextSibling), St = t, Ne = true, kl = null, It = false, e !== null && Zo(t, e), t = Ui(t, a), t.flags |= 4096;
        return t;
      }
      return e = Al(e.child, {
        mode: a.mode,
        children: a.children
      }), e.ref = t.ref, t.child = e, e.return = t, e;
    }
    function xi(e, t) {
      var l = t.ref;
      if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof l != "function" && typeof l != "object") throw Error(f(284));
        (e === null || e.ref !== l) && (t.flags |= 4194816);
      }
    }
    function Hf(e, t, l, a, n) {
      return Ha(t), l = mf(e, t, l, a, void 0, n), a = yf(), e !== null && !dt ? (vf(e, t, n), Nl(e, t, n)) : (Ne && a && Fr(t), t.flags |= 1, Rt(e, t, l, n), t.child);
    }
    function id(e, t, l, a, n, i) {
      return Ha(t), t.updateQueue = null, l = cs(t, a, l, n), fs(e), a = yf(), e !== null && !dt ? (vf(e, t, i), Nl(e, t, i)) : (Ne && a && Fr(t), t.flags |= 1, Rt(e, t, l, i), t.child);
    }
    function rd(e, t, l, a, n) {
      if (Ha(t), t.stateNode === null) {
        var i = rn, c = l.contextType;
        typeof c == "object" && c !== null && (i = Et(c)), i = new l(a, i), t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = Uf, t.stateNode = i, i._reactInternals = t, i = t.stateNode, i.props = a, i.state = t.memoizedState, i.refs = {}, uf(t), c = l.contextType, i.context = typeof c == "object" && c !== null ? Et(c) : rn, i.state = t.memoizedState, c = l.getDerivedStateFromProps, typeof c == "function" && (Cf(t, l, c, a), i.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (c = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), c !== i.state && Uf.enqueueReplaceState(i, i.state, null), iu(t, a, i, n), uu(), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308), a = true;
      } else if (e === null) {
        i = t.stateNode;
        var h = t.memoizedProps, p = qa(l, h);
        i.props = p;
        var O = i.context, w = l.contextType;
        c = rn, typeof w == "object" && w !== null && (c = Et(w));
        var Y = l.getDerivedStateFromProps;
        w = typeof Y == "function" || typeof i.getSnapshotBeforeUpdate == "function", h = t.pendingProps !== h, w || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (h || O !== c) && Js(t, i, a, c), ea = false;
        var _ = t.memoizedState;
        i.state = _, iu(t, a, i, n), uu(), O = t.memoizedState, h || _ !== O || ea ? (typeof Y == "function" && (Cf(t, l, Y, a), O = t.memoizedState), (p = ea || Ks(t, l, p, a, _, O, c)) ? (w || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = O), i.props = a, i.state = O, i.context = c, a = p) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), a = false);
      } else {
        i = t.stateNode, rf(e, t), c = t.memoizedProps, w = qa(l, c), i.props = w, Y = t.pendingProps, _ = i.context, O = l.contextType, p = rn, typeof O == "object" && O !== null && (p = Et(O)), h = l.getDerivedStateFromProps, (O = typeof h == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (c !== Y || _ !== p) && Js(t, i, a, p), ea = false, _ = t.memoizedState, i.state = _, iu(t, a, i, n), uu();
        var H = t.memoizedState;
        c !== Y || _ !== H || ea || e !== null && e.dependencies !== null && hi(e.dependencies) ? (typeof h == "function" && (Cf(t, l, h, a), H = t.memoizedState), (w = ea || Ks(t, l, w, a, _, H, p) || e !== null && e.dependencies !== null && hi(e.dependencies)) ? (O || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, H, p), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, H, p)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || c === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = H), i.props = a, i.state = H, i.context = p, a = w) : (typeof i.componentDidUpdate != "function" || c === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), a = false);
      }
      return i = a, xi(e, t), a = (t.flags & 128) !== 0, i || a ? (i = t.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : i.render(), t.flags |= 1, e !== null && a ? (t.child = ja(t, e.child, null, n), t.child = ja(t, null, l, n)) : Rt(e, t, l, n), t.memoizedState = i.state, e = t.child) : e = Nl(e, t, n), e;
    }
    function fd(e, t, l, a) {
      return xa(), t.flags |= 256, Rt(e, t, l, a), t.child;
    }
    var Lf = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    };
    function wf(e) {
      return {
        baseLanes: e,
        cachePool: ko()
      };
    }
    function Bf(e, t, l) {
      return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Vt), e;
    }
    function cd(e, t, l) {
      var a = t.pendingProps, n = false, i = (t.flags & 128) !== 0, c;
      if ((c = i) || (c = e !== null && e.memoizedState === null ? false : (ut.current & 2) !== 0), c && (n = true, t.flags &= -129), c = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (Ne) {
          if (n ? aa(t) : na(), (e = ke) ? (e = gh(e, It), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: Wl !== null ? {
              id: gl,
              overflow: pl
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, l = Xo(e), l.return = t, t.child = l, St = t, ke = null)) : e = null, e === null) throw Pl(t);
          return bc(e) ? t.lanes = 32 : t.lanes = 536870912, null;
        }
        var h = a.children;
        return a = a.fallback, n ? (na(), n = t.mode, h = Ni({
          mode: "hidden",
          children: h
        }, n), a = Ua(a, n, l, null), h.return = t, a.return = t, h.sibling = a, t.child = h, a = t.child, a.memoizedState = wf(l), a.childLanes = Bf(e, c, l), t.memoizedState = Lf, su(null, a)) : (aa(t), jf(t, h));
      }
      var p = e.memoizedState;
      if (p !== null && (h = p.dehydrated, h !== null)) {
        if (i) t.flags & 256 ? (aa(t), t.flags &= -257, t = Yf(e, t, l)) : t.memoizedState !== null ? (na(), t.child = e.child, t.flags |= 128, t = null) : (na(), h = a.fallback, n = t.mode, a = Ni({
          mode: "visible",
          children: a.children
        }, n), h = Ua(h, n, l, null), h.flags |= 2, a.return = t, h.return = t, a.sibling = h, t.child = a, ja(t, e.child, null, l), a = t.child, a.memoizedState = wf(l), a.childLanes = Bf(e, c, l), t.memoizedState = Lf, t = su(null, a));
        else if (aa(t), bc(h)) {
          if (c = h.nextSibling && h.nextSibling.dataset, c) var O = c.dgst;
          c = O, a = Error(f(419)), a.stack = "", a.digest = c, In({
            value: a,
            source: null,
            stack: null
          }), t = Yf(e, t, l);
        } else if (dt || sn(e, t, l, false), c = (l & e.childLanes) !== 0, dt || c) {
          if (c = Je, c !== null && (a = b(c, l), a !== 0 && a !== p.retryLane)) throw p.retryLane = a, Ca(e, a), Bt(c, e, a), Nf;
          pc(h) || Xi(), t = Yf(e, t, l);
        } else pc(h) ? (t.flags |= 192, t.child = e.child, t = null) : (e = p.treeContext, ke = tl(h.nextSibling), St = t, Ne = true, kl = null, It = false, e !== null && Zo(t, e), t = jf(t, a.children), t.flags |= 4096);
        return t;
      }
      return n ? (na(), h = a.fallback, n = t.mode, p = e.child, O = p.sibling, a = Al(p, {
        mode: "hidden",
        children: a.children
      }), a.subtreeFlags = p.subtreeFlags & 65011712, O !== null ? h = Al(O, h) : (h = Ua(h, n, l, null), h.flags |= 2), h.return = t, a.return = t, a.sibling = h, t.child = a, su(null, a), a = t.child, h = e.child.memoizedState, h === null ? h = wf(l) : (n = h.cachePool, n !== null ? (p = ot._currentValue, n = n.parent !== p ? {
        parent: p,
        pool: p
      } : n) : n = ko(), h = {
        baseLanes: h.baseLanes | l,
        cachePool: n
      }), a.memoizedState = h, a.childLanes = Bf(e, c, l), t.memoizedState = Lf, su(e.child, a)) : (aa(t), l = e.child, e = l.sibling, l = Al(l, {
        mode: "visible",
        children: a.children
      }), l.return = t, l.sibling = null, e !== null && (c = t.deletions, c === null ? (t.deletions = [
        e
      ], t.flags |= 16) : c.push(e)), t.child = l, t.memoizedState = null, l);
    }
    function jf(e, t) {
      return t = Ni({
        mode: "visible",
        children: t
      }, e.mode), t.return = e, e.child = t;
    }
    function Ni(e, t) {
      return e = qt(22, e, null, t), e.lanes = 0, e;
    }
    function Yf(e, t, l) {
      return ja(t, e.child, null, l), e = jf(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
    }
    function od(e, t, l) {
      e.lanes |= t;
      var a = e.alternate;
      a !== null && (a.lanes |= t), Ir(e.return, t, l);
    }
    function qf(e, t, l, a, n, i) {
      var c = e.memoizedState;
      c === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: a,
        tail: l,
        tailMode: n,
        treeForkCount: i
      } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = a, c.tail = l, c.tailMode = n, c.treeForkCount = i);
    }
    function sd(e, t, l) {
      var a = t.pendingProps, n = a.revealOrder, i = a.tail;
      a = a.children;
      var c = ut.current, h = (c & 2) !== 0;
      if (h ? (c = c & 1 | 2, t.flags |= 128) : c &= 1, K(ut, c), Rt(e, t, a, l), a = Ne ? Pn : 0, !h && e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && od(e, l, t);
        else if (e.tag === 19) od(e, l, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      switch (n) {
        case "forwards":
          for (l = t.child, n = null; l !== null; ) e = l.alternate, e !== null && Ei(e) === null && (n = l), l = l.sibling;
          l = n, l === null ? (n = t.child, t.child = null) : (n = l.sibling, l.sibling = null), qf(t, false, n, l, i, a);
          break;
        case "backwards":
        case "unstable_legacy-backwards":
          for (l = null, n = t.child, t.child = null; n !== null; ) {
            if (e = n.alternate, e !== null && Ei(e) === null) {
              t.child = n;
              break;
            }
            e = n.sibling, n.sibling = l, l = n, n = e;
          }
          qf(t, true, l, null, i, a);
          break;
        case "together":
          qf(t, false, null, null, void 0, a);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function Nl(e, t, l) {
      if (e !== null && (t.dependencies = e.dependencies), ra |= t.lanes, (l & t.childLanes) === 0) if (e !== null) {
        if (sn(e, t, l, false), (l & t.childLanes) === 0) return null;
      } else return null;
      if (e !== null && t.child !== e.child) throw Error(f(153));
      if (t.child !== null) {
        for (e = t.child, l = Al(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; ) e = e.sibling, l = l.sibling = Al(e, e.pendingProps), l.return = t;
        l.sibling = null;
      }
      return t.child;
    }
    function Gf(e, t) {
      return (e.lanes & t) !== 0 ? true : (e = e.dependencies, !!(e !== null && hi(e)));
    }
    function Sv(e, t, l) {
      switch (t.tag) {
        case 3:
          ft(t, t.stateNode.containerInfo), Il(t, ot, e.memoizedState.cache), xa();
          break;
        case 27:
        case 5:
          Ra(t);
          break;
        case 4:
          ft(t, t.stateNode.containerInfo);
          break;
        case 10:
          Il(t, t.type, t.memoizedProps.value);
          break;
        case 31:
          if (t.memoizedState !== null) return t.flags |= 128, df(t), null;
          break;
        case 13:
          var a = t.memoizedState;
          if (a !== null) return a.dehydrated !== null ? (aa(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? cd(e, t, l) : (aa(t), e = Nl(e, t, l), e !== null ? e.sibling : null);
          aa(t);
          break;
        case 19:
          var n = (e.flags & 128) !== 0;
          if (a = (l & t.childLanes) !== 0, a || (sn(e, t, l, false), a = (l & t.childLanes) !== 0), n) {
            if (a) return sd(e, t, l);
            t.flags |= 128;
          }
          if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), K(ut, ut.current), a) break;
          return null;
        case 22:
          return t.lanes = 0, ad(e, t, l, t.pendingProps);
        case 24:
          Il(t, ot, e.memoizedState.cache);
      }
      return Nl(e, t, l);
    }
    function dd(e, t, l) {
      if (e !== null) if (e.memoizedProps !== t.pendingProps) dt = true;
      else {
        if (!Gf(e, l) && (t.flags & 128) === 0) return dt = false, Sv(e, t, l);
        dt = (e.flags & 131072) !== 0;
      }
      else dt = false, Ne && (t.flags & 1048576) !== 0 && Vo(t, Pn, t.index);
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: {
            var a = t.pendingProps;
            if (e = wa(t.elementType), t.type = e, typeof e == "function") Zr(e) ? (a = qa(e, a), t.tag = 1, t = rd(null, t, e, a, l)) : (t.tag = 0, t = Hf(null, t, e, a, l));
            else {
              if (e != null) {
                var n = e.$$typeof;
                if (n === Re) {
                  t.tag = 11, t = ed(null, t, e, a, l);
                  break e;
                } else if (n === ue) {
                  t.tag = 14, t = td(null, t, e, a, l);
                  break e;
                }
              }
              throw t = xe(e) || e, Error(f(306, t, ""));
            }
          }
          return t;
        case 0:
          return Hf(e, t, t.type, t.pendingProps, l);
        case 1:
          return a = t.type, n = qa(a, t.pendingProps), rd(e, t, a, n, l);
        case 3:
          e: {
            if (ft(t, t.stateNode.containerInfo), e === null) throw Error(f(387));
            a = t.pendingProps;
            var i = t.memoizedState;
            n = i.element, rf(e, t), iu(t, a, null, l);
            var c = t.memoizedState;
            if (a = c.cache, Il(t, ot, a), a !== i.cache && ef(t, [
              ot
            ], l, true), uu(), a = c.element, i.isDehydrated) if (i = {
              element: a,
              isDehydrated: false,
              cache: c.cache
            }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
              t = fd(e, t, a, l);
              break e;
            } else if (a !== n) {
              n = Wt(Error(f(424)), t), In(n), t = fd(e, t, a, l);
              break e;
            } else for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, ke = tl(e.firstChild), St = t, Ne = true, kl = null, It = true, l = as(t, null, a, l), t.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
            else {
              if (xa(), a === n) {
                t = Nl(e, t, l);
                break e;
              }
              Rt(e, t, a, l);
            }
            t = t.child;
          }
          return t;
        case 26:
          return xi(e, t), e === null ? (l = zh(t.type, null, t.pendingProps, null)) ? t.memoizedState = l : Ne || (l = t.type, e = t.pendingProps, a = $i(de.current).createElement(l), a[J] = t, a[k] = e, zt(a, l, e), Fe(a), t.stateNode = a) : t.memoizedState = zh(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
        case 27:
          return Ra(t), e === null && Ne && (a = t.stateNode = Sh(t.type, t.pendingProps, de.current), St = t, It = true, n = ke, da(t.type) ? (Sc = n, ke = tl(a.firstChild)) : ke = n), Rt(e, t, t.pendingProps.children, l), xi(e, t), e === null && (t.flags |= 4194304), t.child;
        case 5:
          return e === null && Ne && ((n = a = ke) && (a = Wv(a, t.type, t.pendingProps, It), a !== null ? (t.stateNode = a, St = t, ke = tl(a.firstChild), It = false, n = true) : n = false), n || Pl(t)), Ra(t), n = t.type, i = t.pendingProps, c = e !== null ? e.memoizedProps : null, a = i.children, yc(n, i) ? a = null : c !== null && yc(n, c) && (t.flags |= 32), t.memoizedState !== null && (n = mf(e, t, sv, null, null, l), Du._currentValue = n), xi(e, t), Rt(e, t, a, l), t.child;
        case 6:
          return e === null && Ne && ((e = l = ke) && (l = kv(l, t.pendingProps, It), l !== null ? (t.stateNode = l, St = t, ke = null, e = true) : e = false), e || Pl(t)), null;
        case 13:
          return cd(e, t, l);
        case 4:
          return ft(t, t.stateNode.containerInfo), a = t.pendingProps, e === null ? t.child = ja(t, null, a, l) : Rt(e, t, a, l), t.child;
        case 11:
          return ed(e, t, t.type, t.pendingProps, l);
        case 7:
          return Rt(e, t, t.pendingProps, l), t.child;
        case 8:
          return Rt(e, t, t.pendingProps.children, l), t.child;
        case 12:
          return Rt(e, t, t.pendingProps.children, l), t.child;
        case 10:
          return a = t.pendingProps, Il(t, t.type, a.value), Rt(e, t, a.children, l), t.child;
        case 9:
          return n = t.type._context, a = t.pendingProps.children, Ha(t), n = Et(n), a = a(n), t.flags |= 1, Rt(e, t, a, l), t.child;
        case 14:
          return td(e, t, t.type, t.pendingProps, l);
        case 15:
          return ld(e, t, t.type, t.pendingProps, l);
        case 19:
          return sd(e, t, l);
        case 31:
          return bv(e, t, l);
        case 22:
          return ad(e, t, l, t.pendingProps);
        case 24:
          return Ha(t), a = Et(ot), e === null ? (n = af(), n === null && (n = Je, i = tf(), n.pooledCache = i, i.refCount++, i !== null && (n.pooledCacheLanes |= l), n = i), t.memoizedState = {
            parent: a,
            cache: n
          }, uf(t), Il(t, ot, n)) : ((e.lanes & l) !== 0 && (rf(e, t), iu(t, null, null, l), uu()), n = e.memoizedState, i = t.memoizedState, n.parent !== a ? (n = {
            parent: a,
            cache: a
          }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), Il(t, ot, a)) : (a = i.cache, Il(t, ot, a), a !== n.cache && ef(t, [
            ot
          ], l, true))), Rt(e, t, t.pendingProps.children, l), t.child;
        case 29:
          throw t.pendingProps;
      }
      throw Error(f(156, t.tag));
    }
    function Hl(e) {
      e.flags |= 4;
    }
    function Xf(e, t, l, a, n) {
      if ((t = (e.mode & 32) !== 0) && (t = false), t) {
        if (e.flags |= 16777216, (n & 335544128) === n) if (e.stateNode.complete) e.flags |= 8192;
        else if (Yd()) e.flags |= 8192;
        else throw Ba = gi, nf;
      } else e.flags &= -16777217;
    }
    function hd(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
      else if (e.flags |= 16777216, !Oh(t)) if (Yd()) e.flags |= 8192;
      else throw Ba = gi, nf;
    }
    function Hi(e, t) {
      t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Xn() : 536870912, e.lanes |= t, zn |= t);
    }
    function du(e, t) {
      if (!Ne) switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var l = null; t !== null; ) t.alternate !== null && (l = t), t = t.sibling;
          l === null ? e.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = e.tail;
          for (var a = null; l !== null; ) l.alternate !== null && (a = l), l = l.sibling;
          a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null;
      }
    }
    function Pe(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, l = 0, a = 0;
      if (t) for (var n = e.child; n !== null; ) l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = e, n = n.sibling;
      else for (n = e.child; n !== null; ) l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = e, n = n.sibling;
      return e.subtreeFlags |= a, e.childLanes = l, t;
    }
    function Ev(e, t, l) {
      var a = t.pendingProps;
      switch ($r(t), t.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return Pe(t), null;
        case 1:
          return Pe(t), null;
        case 3:
          return l = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Cl(ot), Ze(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (on(t) ? Hl(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, kr())), Pe(t), null;
        case 26:
          var n = t.type, i = t.memoizedState;
          return e === null ? (Hl(t), i !== null ? (Pe(t), hd(t, i)) : (Pe(t), Xf(t, n, null, a, l))) : i ? i !== e.memoizedState ? (Hl(t), Pe(t), hd(t, i)) : (Pe(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && Hl(t), Pe(t), Xf(t, n, e, a, l)), null;
        case 27:
          if (Za(t), l = de.current, n = t.type, e !== null && t.stateNode != null) e.memoizedProps !== a && Hl(t);
          else {
            if (!a) {
              if (t.stateNode === null) throw Error(f(166));
              return Pe(t), null;
            }
            e = F.current, on(t) ? Ko(t) : (e = Sh(n, a, l), t.stateNode = e, Hl(t));
          }
          return Pe(t), null;
        case 5:
          if (Za(t), n = t.type, e !== null && t.stateNode != null) e.memoizedProps !== a && Hl(t);
          else {
            if (!a) {
              if (t.stateNode === null) throw Error(f(166));
              return Pe(t), null;
            }
            if (i = F.current, on(t)) Ko(t);
            else {
              var c = $i(de.current);
              switch (i) {
                case 1:
                  i = c.createElementNS("http://www.w3.org/2000/svg", n);
                  break;
                case 2:
                  i = c.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                  break;
                default:
                  switch (n) {
                    case "svg":
                      i = c.createElementNS("http://www.w3.org/2000/svg", n);
                      break;
                    case "math":
                      i = c.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                      break;
                    case "script":
                      i = c.createElement("div"), i.innerHTML = "<script><\/script>", i = i.removeChild(i.firstChild);
                      break;
                    case "select":
                      i = typeof a.is == "string" ? c.createElement("select", {
                        is: a.is
                      }) : c.createElement("select"), a.multiple ? i.multiple = true : a.size && (i.size = a.size);
                      break;
                    default:
                      i = typeof a.is == "string" ? c.createElement(n, {
                        is: a.is
                      }) : c.createElement(n);
                  }
              }
              i[J] = t, i[k] = a;
              e: for (c = t.child; c !== null; ) {
                if (c.tag === 5 || c.tag === 6) i.appendChild(c.stateNode);
                else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                  c.child.return = c, c = c.child;
                  continue;
                }
                if (c === t) break e;
                for (; c.sibling === null; ) {
                  if (c.return === null || c.return === t) break e;
                  c = c.return;
                }
                c.sibling.return = c.return, c = c.sibling;
              }
              t.stateNode = i;
              e: switch (zt(i, n, a), n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  a = !!a.autoFocus;
                  break e;
                case "img":
                  a = true;
                  break e;
                default:
                  a = false;
              }
              a && Hl(t);
            }
          }
          return Pe(t), Xf(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l), null;
        case 6:
          if (e && t.stateNode != null) e.memoizedProps !== a && Hl(t);
          else {
            if (typeof a != "string" && t.stateNode === null) throw Error(f(166));
            if (e = de.current, on(t)) {
              if (e = t.stateNode, l = t.memoizedProps, a = null, n = St, n !== null) switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
              e[J] = t, e = !!(e.nodeValue === l || a !== null && a.suppressHydrationWarning === true || ch(e.nodeValue, l)), e || Pl(t, true);
            } else e = $i(e).createTextNode(a), e[J] = t, t.stateNode = e;
          }
          return Pe(t), null;
        case 31:
          if (l = t.memoizedState, e === null || e.memoizedState !== null) {
            if (a = on(t), l !== null) {
              if (e === null) {
                if (!a) throw Error(f(318));
                if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(557));
                e[J] = t;
              } else xa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              Pe(t), e = false;
            } else l = kr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = true;
            if (!e) return t.flags & 256 ? (Xt(t), t) : (Xt(t), null);
            if ((t.flags & 128) !== 0) throw Error(f(558));
          }
          return Pe(t), null;
        case 13:
          if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (n = on(t), a !== null && a.dehydrated !== null) {
              if (e === null) {
                if (!n) throw Error(f(318));
                if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(f(317));
                n[J] = t;
              } else xa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              Pe(t), n = false;
            } else n = kr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = true;
            if (!n) return t.flags & 256 ? (Xt(t), t) : (Xt(t), null);
          }
          return Xt(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = a !== null, e = e !== null && e.memoizedState !== null, l && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), i = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (i = a.memoizedState.cachePool.pool), i !== n && (a.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Hi(t, t.updateQueue), Pe(t), null);
        case 4:
          return Ze(), e === null && oc(t.stateNode.containerInfo), Pe(t), null;
        case 10:
          return Cl(t.type), Pe(t), null;
        case 19:
          if (B(ut), a = t.memoizedState, a === null) return Pe(t), null;
          if (n = (t.flags & 128) !== 0, i = a.rendering, i === null) if (n) du(a, false);
          else {
            if (at !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
              if (i = Ei(e), i !== null) {
                for (t.flags |= 128, du(a, false), e = i.updateQueue, t.updateQueue = e, Hi(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; ) Go(l, e), l = l.sibling;
                return K(ut, ut.current & 1 | 2), Ne && Ol(t, a.treeForkCount), t.child;
              }
              e = e.sibling;
            }
            a.tail !== null && Ot() > Yi && (t.flags |= 128, n = true, du(a, false), t.lanes = 4194304);
          }
          else {
            if (!n) if (e = Ei(i), e !== null) {
              if (t.flags |= 128, n = true, e = e.updateQueue, t.updateQueue = e, Hi(t, e), du(a, true), a.tail === null && a.tailMode === "hidden" && !i.alternate && !Ne) return Pe(t), null;
            } else 2 * Ot() - a.renderingStartTime > Yi && l !== 536870912 && (t.flags |= 128, n = true, du(a, false), t.lanes = 4194304);
            a.isBackwards ? (i.sibling = t.child, t.child = i) : (e = a.last, e !== null ? e.sibling = i : t.child = i, a.last = i);
          }
          return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = Ot(), e.sibling = null, l = ut.current, K(ut, n ? l & 1 | 2 : l & 1), Ne && Ol(t, a.treeForkCount), e) : (Pe(t), null);
        case 22:
        case 23:
          return Xt(t), sf(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Pe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Pe(t), l = t.updateQueue, l !== null && Hi(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== l && (t.flags |= 2048), e !== null && B(La), null;
        case 24:
          return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Cl(ot), Pe(t), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(f(156, t.tag));
    }
    function Rv(e, t) {
      switch ($r(t), t.tag) {
        case 1:
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
          return Cl(ot), Ze(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
        case 26:
        case 27:
        case 5:
          return Za(t), null;
        case 31:
          if (t.memoizedState !== null) {
            if (Xt(t), t.alternate === null) throw Error(f(340));
            xa();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 13:
          if (Xt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null) throw Error(f(340));
            xa();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
          return B(ut), null;
        case 4:
          return Ze(), null;
        case 10:
          return Cl(t.type), null;
        case 22:
        case 23:
          return Xt(t), sf(), e !== null && B(La), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 24:
          return Cl(ot), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function md(e, t) {
      switch ($r(t), t.tag) {
        case 3:
          Cl(ot), Ze();
          break;
        case 26:
        case 27:
        case 5:
          Za(t);
          break;
        case 4:
          Ze();
          break;
        case 31:
          t.memoizedState !== null && Xt(t);
          break;
        case 13:
          Xt(t);
          break;
        case 19:
          B(ut);
          break;
        case 10:
          Cl(t.type);
          break;
        case 22:
        case 23:
          Xt(t), sf(), e !== null && B(La);
          break;
        case 24:
          Cl(ot);
      }
    }
    function hu(e, t) {
      try {
        var l = t.updateQueue, a = l !== null ? l.lastEffect : null;
        if (a !== null) {
          var n = a.next;
          l = n;
          do {
            if ((l.tag & e) === e) {
              a = void 0;
              var i = l.create, c = l.inst;
              a = i(), c.destroy = a;
            }
            l = l.next;
          } while (l !== n);
        }
      } catch (h) {
        qe(t, t.return, h);
      }
    }
    function ua(e, t, l) {
      try {
        var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
        if (n !== null) {
          var i = n.next;
          a = i;
          do {
            if ((a.tag & e) === e) {
              var c = a.inst, h = c.destroy;
              if (h !== void 0) {
                c.destroy = void 0, n = t;
                var p = l, O = h;
                try {
                  O();
                } catch (w) {
                  qe(n, p, w);
                }
              }
            }
            a = a.next;
          } while (a !== i);
        }
      } catch (w) {
        qe(t, t.return, w);
      }
    }
    function yd(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var l = e.stateNode;
        try {
          us(t, l);
        } catch (a) {
          qe(e, e.return, a);
        }
      }
    }
    function vd(e, t, l) {
      l.props = qa(e.type, e.memoizedProps), l.state = e.memoizedState;
      try {
        l.componentWillUnmount();
      } catch (a) {
        qe(e, t, a);
      }
    }
    function mu(e, t) {
      try {
        var l = e.ref;
        if (l !== null) {
          switch (e.tag) {
            case 26:
            case 27:
            case 5:
              var a = e.stateNode;
              break;
            case 30:
              a = e.stateNode;
              break;
            default:
              a = e.stateNode;
          }
          typeof l == "function" ? e.refCleanup = l(a) : l.current = a;
        }
      } catch (n) {
        qe(e, t, n);
      }
    }
    function bl(e, t) {
      var l = e.ref, a = e.refCleanup;
      if (l !== null) if (typeof a == "function") try {
        a();
      } catch (n) {
        qe(e, t, n);
      } finally {
        e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
      }
      else if (typeof l == "function") try {
        l(null);
      } catch (n) {
        qe(e, t, n);
      }
      else l.current = null;
    }
    function gd(e) {
      var t = e.type, l = e.memoizedProps, a = e.stateNode;
      try {
        e: switch (t) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            l.autoFocus && a.focus();
            break e;
          case "img":
            l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet);
        }
      } catch (n) {
        qe(e, e.return, n);
      }
    }
    function Qf(e, t, l) {
      try {
        var a = e.stateNode;
        Vv(a, e.type, l, t), a[k] = t;
      } catch (n) {
        qe(e, e.return, n);
      }
    }
    function pd(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && da(e.type) || e.tag === 4;
    }
    function Vf(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || pd(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.tag === 27 && da(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Zf(e, t, l) {
      var a = e.tag;
      if (a === 5 || a === 6) e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = Ml));
      else if (a !== 4 && (a === 27 && da(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null)) for (Zf(e, t, l), e = e.sibling; e !== null; ) Zf(e, t, l), e = e.sibling;
    }
    function Li(e, t, l) {
      var a = e.tag;
      if (a === 5 || a === 6) e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
      else if (a !== 4 && (a === 27 && da(e.type) && (l = e.stateNode), e = e.child, e !== null)) for (Li(e, t, l), e = e.sibling; e !== null; ) Li(e, t, l), e = e.sibling;
    }
    function bd(e) {
      var t = e.stateNode, l = e.memoizedProps;
      try {
        for (var a = e.type, n = t.attributes; n.length; ) t.removeAttributeNode(n[0]);
        zt(t, a, l), t[J] = e, t[k] = l;
      } catch (i) {
        qe(e, e.return, i);
      }
    }
    var Ll = false, ht = false, Kf = false, Sd = typeof WeakSet == "function" ? WeakSet : Set, bt = null;
    function zv(e, t) {
      if (e = e.containerInfo, hc = lr, e = xo(e), jr(e)) {
        if ("selectionStart" in e) var l = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
        else e: {
          l = (l = e.ownerDocument) && l.defaultView || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var n = a.anchorOffset, i = a.focusNode;
            a = a.focusOffset;
            try {
              l.nodeType, i.nodeType;
            } catch {
              l = null;
              break e;
            }
            var c = 0, h = -1, p = -1, O = 0, w = 0, Y = e, _ = null;
            t: for (; ; ) {
              for (var H; Y !== l || n !== 0 && Y.nodeType !== 3 || (h = c + n), Y !== i || a !== 0 && Y.nodeType !== 3 || (p = c + a), Y.nodeType === 3 && (c += Y.nodeValue.length), (H = Y.firstChild) !== null; ) _ = Y, Y = H;
              for (; ; ) {
                if (Y === e) break t;
                if (_ === l && ++O === n && (h = c), _ === i && ++w === a && (p = c), (H = Y.nextSibling) !== null) break;
                Y = _, _ = Y.parentNode;
              }
              Y = H;
            }
            l = h === -1 || p === -1 ? null : {
              start: h,
              end: p
            };
          } else l = null;
        }
        l = l || {
          start: 0,
          end: 0
        };
      } else l = null;
      for (mc = {
        focusedElem: e,
        selectionRange: l
      }, lr = false, bt = t; bt !== null; ) if (t = bt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, bt = e;
      else for (; bt !== null; ) {
        switch (t = bt, i = t.alternate, e = t.flags, t.tag) {
          case 0:
            if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null)) for (l = 0; l < e.length; l++) n = e[l], n.ref.impl = n.nextImpl;
            break;
          case 11:
          case 15:
            break;
          case 1:
            if ((e & 1024) !== 0 && i !== null) {
              e = void 0, l = t, n = i.memoizedProps, i = i.memoizedState, a = l.stateNode;
              try {
                var te = qa(l.type, n);
                e = a.getSnapshotBeforeUpdate(te, i), a.__reactInternalSnapshotBeforeUpdate = e;
              } catch (se) {
                qe(l, l.return, se);
              }
            }
            break;
          case 3:
            if ((e & 1024) !== 0) {
              if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9) gc(e);
              else if (l === 1) switch (e.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  gc(e);
                  break;
                default:
                  e.textContent = "";
              }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if ((e & 1024) !== 0) throw Error(f(163));
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, bt = e;
          break;
        }
        bt = t.return;
      }
    }
    function Ed(e, t, l) {
      var a = l.flags;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Bl(e, l), a & 4 && hu(5, l);
          break;
        case 1:
          if (Bl(e, l), a & 4) if (e = l.stateNode, t === null) try {
            e.componentDidMount();
          } catch (c) {
            qe(l, l.return, c);
          }
          else {
            var n = qa(l.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (c) {
              qe(l, l.return, c);
            }
          }
          a & 64 && yd(l), a & 512 && mu(l, l.return);
          break;
        case 3:
          if (Bl(e, l), a & 64 && (e = l.updateQueue, e !== null)) {
            if (t = null, l.child !== null) switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
            try {
              us(e, t);
            } catch (c) {
              qe(l, l.return, c);
            }
          }
          break;
        case 27:
          t === null && a & 4 && bd(l);
        case 26:
        case 5:
          Bl(e, l), t === null && a & 4 && gd(l), a & 512 && mu(l, l.return);
          break;
        case 12:
          Bl(e, l);
          break;
        case 31:
          Bl(e, l), a & 4 && Td(e, l);
          break;
        case 13:
          Bl(e, l), a & 4 && Md(e, l), a & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = xv.bind(null, l), Pv(e, l))));
          break;
        case 22:
          if (a = l.memoizedState !== null || Ll, !a) {
            t = t !== null && t.memoizedState !== null || ht, n = Ll;
            var i = ht;
            Ll = a, (ht = t) && !i ? jl(e, l, (l.subtreeFlags & 8772) !== 0) : Bl(e, l), Ll = n, ht = i;
          }
          break;
        case 30:
          break;
        default:
          Bl(e, l);
      }
    }
    function Rd(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, Rd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ke(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    var Ie = null, Nt = false;
    function wl(e, t, l) {
      for (l = l.child; l !== null; ) zd(e, t, l), l = l.sibling;
    }
    function zd(e, t, l) {
      if (_t && typeof _t.onCommitFiberUnmount == "function") try {
        _t.onCommitFiberUnmount(zl, l);
      } catch {
      }
      switch (l.tag) {
        case 26:
          ht || bl(l, t), wl(e, t, l), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
          break;
        case 27:
          ht || bl(l, t);
          var a = Ie, n = Nt;
          da(l.type) && (Ie = l.stateNode, Nt = false), wl(e, t, l), zu(l.stateNode), Ie = a, Nt = n;
          break;
        case 5:
          ht || bl(l, t);
        case 6:
          if (a = Ie, n = Nt, Ie = null, wl(e, t, l), Ie = a, Nt = n, Ie !== null) if (Nt) try {
            (Ie.nodeType === 9 ? Ie.body : Ie.nodeName === "HTML" ? Ie.ownerDocument.body : Ie).removeChild(l.stateNode);
          } catch (i) {
            qe(l, t, i);
          }
          else try {
            Ie.removeChild(l.stateNode);
          } catch (i) {
            qe(l, t, i);
          }
          break;
        case 18:
          Ie !== null && (Nt ? (e = Ie, yh(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.stateNode), Un(e)) : yh(Ie, l.stateNode));
          break;
        case 4:
          a = Ie, n = Nt, Ie = l.stateNode.containerInfo, Nt = true, wl(e, t, l), Ie = a, Nt = n;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          ua(2, l, t), ht || ua(4, l, t), wl(e, t, l);
          break;
        case 1:
          ht || (bl(l, t), a = l.stateNode, typeof a.componentWillUnmount == "function" && vd(l, t, a)), wl(e, t, l);
          break;
        case 21:
          wl(e, t, l);
          break;
        case 22:
          ht = (a = ht) || l.memoizedState !== null, wl(e, t, l), ht = a;
          break;
        default:
          wl(e, t, l);
      }
    }
    function Td(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
        e = e.dehydrated;
        try {
          Un(e);
        } catch (l) {
          qe(t, t.return, l);
        }
      }
    }
    function Md(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
        Un(e);
      } catch (l) {
        qe(t, t.return, l);
      }
    }
    function Tv(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new Sd()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Sd()), t;
        default:
          throw Error(f(435, e.tag));
      }
    }
    function wi(e, t) {
      var l = Tv(e);
      t.forEach(function(a) {
        if (!l.has(a)) {
          l.add(a);
          var n = Nv.bind(null, e, a);
          a.then(n, n);
        }
      });
    }
    function Ht(e, t) {
      var l = t.deletions;
      if (l !== null) for (var a = 0; a < l.length; a++) {
        var n = l[a], i = e, c = t, h = c;
        e: for (; h !== null; ) {
          switch (h.tag) {
            case 27:
              if (da(h.type)) {
                Ie = h.stateNode, Nt = false;
                break e;
              }
              break;
            case 5:
              Ie = h.stateNode, Nt = false;
              break e;
            case 3:
            case 4:
              Ie = h.stateNode.containerInfo, Nt = true;
              break e;
          }
          h = h.return;
        }
        if (Ie === null) throw Error(f(160));
        zd(i, c, n), Ie = null, Nt = false, i = n.alternate, i !== null && (i.return = null), n.return = null;
      }
      if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) Dd(t, e), t = t.sibling;
    }
    var cl = null;
    function Dd(e, t) {
      var l = e.alternate, a = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ht(t, e), Lt(e), a & 4 && (ua(3, e, e.return), hu(3, e), ua(5, e, e.return));
          break;
        case 1:
          Ht(t, e), Lt(e), a & 512 && (ht || l === null || bl(l, l.return)), a & 64 && Ll && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
          break;
        case 26:
          var n = cl;
          if (Ht(t, e), Lt(e), a & 512 && (ht || l === null || bl(l, l.return)), a & 4) {
            var i = l !== null ? l.memoizedState : null;
            if (a = e.memoizedState, l === null) if (a === null) if (e.stateNode === null) {
              e: {
                a = e.type, l = e.memoizedProps, n = n.ownerDocument || n;
                t: switch (a) {
                  case "title":
                    i = n.getElementsByTagName("title")[0], (!i || i[Me] || i[J] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = n.createElement(a), n.head.insertBefore(i, n.querySelector("head > title"))), zt(i, a, l), i[J] = e, Fe(i), a = i;
                    break e;
                  case "link":
                    var c = Dh("link", "href", n).get(a + (l.href || ""));
                    if (c) {
                      for (var h = 0; h < c.length; h++) if (i = c[h], i.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && i.getAttribute("rel") === (l.rel == null ? null : l.rel) && i.getAttribute("title") === (l.title == null ? null : l.title) && i.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                        c.splice(h, 1);
                        break t;
                      }
                    }
                    i = n.createElement(a), zt(i, a, l), n.head.appendChild(i);
                    break;
                  case "meta":
                    if (c = Dh("meta", "content", n).get(a + (l.content || ""))) {
                      for (h = 0; h < c.length; h++) if (i = c[h], i.getAttribute("content") === (l.content == null ? null : "" + l.content) && i.getAttribute("name") === (l.name == null ? null : l.name) && i.getAttribute("property") === (l.property == null ? null : l.property) && i.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && i.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                        c.splice(h, 1);
                        break t;
                      }
                    }
                    i = n.createElement(a), zt(i, a, l), n.head.appendChild(i);
                    break;
                  default:
                    throw Error(f(468, a));
                }
                i[J] = e, Fe(i), a = i;
              }
              e.stateNode = a;
            } else Ah(n, e.type, e.stateNode);
            else e.stateNode = Mh(n, a, e.memoizedProps);
            else i !== a ? (i === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : i.count--, a === null ? Ah(n, e.type, e.stateNode) : Mh(n, a, e.memoizedProps)) : a === null && e.stateNode !== null && Qf(e, e.memoizedProps, l.memoizedProps);
          }
          break;
        case 27:
          Ht(t, e), Lt(e), a & 512 && (ht || l === null || bl(l, l.return)), l !== null && a & 4 && Qf(e, e.memoizedProps, l.memoizedProps);
          break;
        case 5:
          if (Ht(t, e), Lt(e), a & 512 && (ht || l === null || bl(l, l.return)), e.flags & 32) {
            n = e.stateNode;
            try {
              Ia(n, "");
            } catch (te) {
              qe(e, e.return, te);
            }
          }
          a & 4 && e.stateNode != null && (n = e.memoizedProps, Qf(e, n, l !== null ? l.memoizedProps : n)), a & 1024 && (Kf = true);
          break;
        case 6:
          if (Ht(t, e), Lt(e), a & 4) {
            if (e.stateNode === null) throw Error(f(162));
            a = e.memoizedProps, l = e.stateNode;
            try {
              l.nodeValue = a;
            } catch (te) {
              qe(e, e.return, te);
            }
          }
          break;
        case 3:
          if (Pi = null, n = cl, cl = Wi(t.containerInfo), Ht(t, e), cl = n, Lt(e), a & 4 && l !== null && l.memoizedState.isDehydrated) try {
            Un(t.containerInfo);
          } catch (te) {
            qe(e, e.return, te);
          }
          Kf && (Kf = false, Ad(e));
          break;
        case 4:
          a = cl, cl = Wi(e.stateNode.containerInfo), Ht(t, e), Lt(e), cl = a;
          break;
        case 12:
          Ht(t, e), Lt(e);
          break;
        case 31:
          Ht(t, e), Lt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, wi(e, a)));
          break;
        case 13:
          Ht(t, e), Lt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ji = Ot()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, wi(e, a)));
          break;
        case 22:
          n = e.memoizedState !== null;
          var p = l !== null && l.memoizedState !== null, O = Ll, w = ht;
          if (Ll = O || n, ht = w || p, Ht(t, e), ht = w, Ll = O, Lt(e), a & 8192) e: for (t = e.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (l === null || p || Ll || ht || Ga(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                p = l = t;
                try {
                  if (i = p.stateNode, n) c = i.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                  else {
                    h = p.stateNode;
                    var Y = p.memoizedProps.style, _ = Y != null && Y.hasOwnProperty("display") ? Y.display : null;
                    h.style.display = _ == null || typeof _ == "boolean" ? "" : ("" + _).trim();
                  }
                } catch (te) {
                  qe(p, p.return, te);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                p = t;
                try {
                  p.stateNode.nodeValue = n ? "" : p.memoizedProps;
                } catch (te) {
                  qe(p, p.return, te);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                p = t;
                try {
                  var H = p.stateNode;
                  n ? vh(H, true) : vh(p.stateNode, false);
                } catch (te) {
                  qe(p, p.return, te);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              l === t && (l = null), t = t.return;
            }
            l === t && (l = null), t.sibling.return = t.return, t = t.sibling;
          }
          a & 4 && (a = e.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, wi(e, l))));
          break;
        case 19:
          Ht(t, e), Lt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, wi(e, a)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          Ht(t, e), Lt(e);
      }
    }
    function Lt(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          for (var l, a = e.return; a !== null; ) {
            if (pd(a)) {
              l = a;
              break;
            }
            a = a.return;
          }
          if (l == null) throw Error(f(160));
          switch (l.tag) {
            case 27:
              var n = l.stateNode, i = Vf(e);
              Li(e, i, n);
              break;
            case 5:
              var c = l.stateNode;
              l.flags & 32 && (Ia(c, ""), l.flags &= -33);
              var h = Vf(e);
              Li(e, h, c);
              break;
            case 3:
            case 4:
              var p = l.stateNode.containerInfo, O = Vf(e);
              Zf(e, O, p);
              break;
            default:
              throw Error(f(161));
          }
        } catch (w) {
          qe(e, e.return, w);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function Ad(e) {
      if (e.subtreeFlags & 1024) for (e = e.child; e !== null; ) {
        var t = e;
        Ad(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
    }
    function Bl(e, t) {
      if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) Ed(e, t.alternate, t), t = t.sibling;
    }
    function Ga(e) {
      for (e = e.child; e !== null; ) {
        var t = e;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ua(4, t, t.return), Ga(t);
            break;
          case 1:
            bl(t, t.return);
            var l = t.stateNode;
            typeof l.componentWillUnmount == "function" && vd(t, t.return, l), Ga(t);
            break;
          case 27:
            zu(t.stateNode);
          case 26:
          case 5:
            bl(t, t.return), Ga(t);
            break;
          case 22:
            t.memoizedState === null && Ga(t);
            break;
          case 30:
            Ga(t);
            break;
          default:
            Ga(t);
        }
        e = e.sibling;
      }
    }
    function jl(e, t, l) {
      for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
        var a = t.alternate, n = e, i = t, c = i.flags;
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            jl(n, i, l), hu(4, i);
            break;
          case 1:
            if (jl(n, i, l), a = i, n = a.stateNode, typeof n.componentDidMount == "function") try {
              n.componentDidMount();
            } catch (O) {
              qe(a, a.return, O);
            }
            if (a = i, n = a.updateQueue, n !== null) {
              var h = a.stateNode;
              try {
                var p = n.shared.hiddenCallbacks;
                if (p !== null) for (n.shared.hiddenCallbacks = null, n = 0; n < p.length; n++) ns(p[n], h);
              } catch (O) {
                qe(a, a.return, O);
              }
            }
            l && c & 64 && yd(i), mu(i, i.return);
            break;
          case 27:
            bd(i);
          case 26:
          case 5:
            jl(n, i, l), l && a === null && c & 4 && gd(i), mu(i, i.return);
            break;
          case 12:
            jl(n, i, l);
            break;
          case 31:
            jl(n, i, l), l && c & 4 && Td(n, i);
            break;
          case 13:
            jl(n, i, l), l && c & 4 && Md(n, i);
            break;
          case 22:
            i.memoizedState === null && jl(n, i, l), mu(i, i.return);
            break;
          case 30:
            break;
          default:
            jl(n, i, l);
        }
        t = t.sibling;
      }
    }
    function Jf(e, t) {
      var l = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && eu(l));
    }
    function Ff(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && eu(e));
    }
    function ol(e, t, l, a) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) Od(e, t, l, a), t = t.sibling;
    }
    function Od(e, t, l, a) {
      var n = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          ol(e, t, l, a), n & 2048 && hu(9, t);
          break;
        case 1:
          ol(e, t, l, a);
          break;
        case 3:
          ol(e, t, l, a), n & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && eu(e)));
          break;
        case 12:
          if (n & 2048) {
            ol(e, t, l, a), e = t.stateNode;
            try {
              var i = t.memoizedProps, c = i.id, h = i.onPostCommit;
              typeof h == "function" && h(c, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
            } catch (p) {
              qe(t, t.return, p);
            }
          } else ol(e, t, l, a);
          break;
        case 31:
          ol(e, t, l, a);
          break;
        case 13:
          ol(e, t, l, a);
          break;
        case 23:
          break;
        case 22:
          i = t.stateNode, c = t.alternate, t.memoizedState !== null ? i._visibility & 2 ? ol(e, t, l, a) : yu(e, t) : i._visibility & 2 ? ol(e, t, l, a) : (i._visibility |= 2, Sn(e, t, l, a, (t.subtreeFlags & 10256) !== 0 || false)), n & 2048 && Jf(c, t);
          break;
        case 24:
          ol(e, t, l, a), n & 2048 && Ff(t.alternate, t);
          break;
        default:
          ol(e, t, l, a);
      }
    }
    function Sn(e, t, l, a, n) {
      for (n = n && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
        var i = e, c = t, h = l, p = a, O = c.flags;
        switch (c.tag) {
          case 0:
          case 11:
          case 15:
            Sn(i, c, h, p, n), hu(8, c);
            break;
          case 23:
            break;
          case 22:
            var w = c.stateNode;
            c.memoizedState !== null ? w._visibility & 2 ? Sn(i, c, h, p, n) : yu(i, c) : (w._visibility |= 2, Sn(i, c, h, p, n)), n && O & 2048 && Jf(c.alternate, c);
            break;
          case 24:
            Sn(i, c, h, p, n), n && O & 2048 && Ff(c.alternate, c);
            break;
          default:
            Sn(i, c, h, p, n);
        }
        t = t.sibling;
      }
    }
    function yu(e, t) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
        var l = e, a = t, n = a.flags;
        switch (a.tag) {
          case 22:
            yu(l, a), n & 2048 && Jf(a.alternate, a);
            break;
          case 24:
            yu(l, a), n & 2048 && Ff(a.alternate, a);
            break;
          default:
            yu(l, a);
        }
        t = t.sibling;
      }
    }
    var vu = 8192;
    function En(e, t, l) {
      if (e.subtreeFlags & vu) for (e = e.child; e !== null; ) _d(e, t, l), e = e.sibling;
    }
    function _d(e, t, l) {
      switch (e.tag) {
        case 26:
          En(e, t, l), e.flags & vu && e.memoizedState !== null && o0(l, cl, e.memoizedState, e.memoizedProps);
          break;
        case 5:
          En(e, t, l);
          break;
        case 3:
        case 4:
          var a = cl;
          cl = Wi(e.stateNode.containerInfo), En(e, t, l), cl = a;
          break;
        case 22:
          e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = vu, vu = 16777216, En(e, t, l), vu = a) : En(e, t, l));
          break;
        default:
          En(e, t, l);
      }
    }
    function Cd(e) {
      var t = e.alternate;
      if (t !== null && (e = t.child, e !== null)) {
        t.child = null;
        do
          t = e.sibling, e.sibling = null, e = t;
        while (e !== null);
      }
    }
    function gu(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null) for (var l = 0; l < t.length; l++) {
          var a = t[l];
          bt = a, xd(a, e);
        }
        Cd(e);
      }
      if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) Ud(e), e = e.sibling;
    }
    function Ud(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          gu(e), e.flags & 2048 && ua(9, e, e.return);
          break;
        case 3:
          gu(e);
          break;
        case 12:
          gu(e);
          break;
        case 22:
          var t = e.stateNode;
          e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Bi(e)) : gu(e);
          break;
        default:
          gu(e);
      }
    }
    function Bi(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null) for (var l = 0; l < t.length; l++) {
          var a = t[l];
          bt = a, xd(a, e);
        }
        Cd(e);
      }
      for (e = e.child; e !== null; ) {
        switch (t = e, t.tag) {
          case 0:
          case 11:
          case 15:
            ua(8, t, t.return), Bi(t);
            break;
          case 22:
            l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, Bi(t));
            break;
          default:
            Bi(t);
        }
        e = e.sibling;
      }
    }
    function xd(e, t) {
      for (; bt !== null; ) {
        var l = bt;
        switch (l.tag) {
          case 0:
          case 11:
          case 15:
            ua(8, l, t);
            break;
          case 23:
          case 22:
            if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
              var a = l.memoizedState.cachePool.pool;
              a != null && a.refCount++;
            }
            break;
          case 24:
            eu(l.memoizedState.cache);
        }
        if (a = l.child, a !== null) a.return = l, bt = a;
        else e: for (l = e; bt !== null; ) {
          a = bt;
          var n = a.sibling, i = a.return;
          if (Rd(a), a === l) {
            bt = null;
            break e;
          }
          if (n !== null) {
            n.return = i, bt = n;
            break e;
          }
          bt = i;
        }
      }
    }
    var Mv = {
      getCacheForType: function(e) {
        var t = Et(ot), l = t.data.get(e);
        return l === void 0 && (l = e(), t.data.set(e, l)), l;
      },
      cacheSignal: function() {
        return Et(ot).controller.signal;
      }
    }, Dv = typeof WeakMap == "function" ? WeakMap : Map, je = 0, Je = null, Ae = null, _e = 0, Ye = 0, Qt = null, ia = false, Rn = false, $f = false, Yl = 0, at = 0, ra = 0, Xa = 0, Wf = 0, Vt = 0, zn = 0, pu = null, wt = null, kf = false, ji = 0, Nd = 0, Yi = 1 / 0, qi = null, fa = null, vt = 0, ca = null, Tn = null, ql = 0, Pf = 0, If = null, Hd = null, bu = 0, ec = null;
    function Zt() {
      return (je & 2) !== 0 && _e !== 0 ? _e & -_e : U.T !== null ? ic() : X();
    }
    function Ld() {
      if (Vt === 0) if ((_e & 536870912) === 0 || Ne) {
        var e = Tl;
        Tl <<= 1, (Tl & 3932160) === 0 && (Tl = 262144), Vt = e;
      } else Vt = 536870912;
      return e = Gt.current, e !== null && (e.flags |= 32), Vt;
    }
    function Bt(e, t, l) {
      (e === Je && (Ye === 2 || Ye === 9) || e.cancelPendingCommit !== null) && (Mn(e, 0), oa(e, _e, Vt, false)), ml(e, l), ((je & 2) === 0 || e !== Je) && (e === Je && ((je & 2) === 0 && (Xa |= l), at === 4 && oa(e, _e, Vt, false)), Sl(e));
    }
    function wd(e, t, l) {
      if ((je & 6) !== 0) throw Error(f(327));
      var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Kl(e, t), n = a ? _v(e, t) : lc(e, t, true), i = a;
      do {
        if (n === 0) {
          Rn && !a && oa(e, t, 0, false);
          break;
        } else {
          if (l = e.current.alternate, i && !Av(l)) {
            n = lc(e, t, false), i = false;
            continue;
          }
          if (n === 2) {
            if (i = t, e.errorRecoveryDisabledLanes & i) var c = 0;
            else c = e.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
            if (c !== 0) {
              t = c;
              e: {
                var h = e;
                n = pu;
                var p = h.current.memoizedState.isDehydrated;
                if (p && (Mn(h, c).flags |= 256), c = lc(h, c, false), c !== 2) {
                  if ($f && !p) {
                    h.errorRecoveryDisabledLanes |= i, Xa |= i, n = 4;
                    break e;
                  }
                  i = wt, wt = n, i !== null && (wt === null ? wt = i : wt.push.apply(wt, i));
                }
                n = c;
              }
              if (i = false, n !== 2) continue;
            }
          }
          if (n === 1) {
            Mn(e, 0), oa(e, t, 0, true);
            break;
          }
          e: {
            switch (a = e, i = n, i) {
              case 0:
              case 1:
                throw Error(f(345));
              case 4:
                if ((t & 4194048) !== t) break;
              case 6:
                oa(a, t, Vt, !ia);
                break e;
              case 2:
                wt = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(f(329));
            }
            if ((t & 62914560) === t && (n = ji + 300 - Ot(), 10 < n)) {
              if (oa(a, t, Vt, !ia), Fa(a, 0, true) !== 0) break e;
              ql = t, a.timeoutHandle = hh(Bd.bind(null, a, l, wt, qi, kf, t, Vt, Xa, zn, ia, i, "Throttled", -0, 0), n);
              break e;
            }
            Bd(a, l, wt, qi, kf, t, Vt, Xa, zn, ia, i, null, -0, 0);
          }
        }
        break;
      } while (true);
      Sl(e);
    }
    function Bd(e, t, l, a, n, i, c, h, p, O, w, Y, _, H) {
      if (e.timeoutHandle = -1, Y = t.subtreeFlags, Y & 8192 || (Y & 16785408) === 16785408) {
        Y = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: true,
          waitingForViewTransition: false,
          unsuspend: Ml
        }, _d(t, i, Y);
        var te = (i & 62914560) === i ? ji - Ot() : (i & 4194048) === i ? Nd - Ot() : 0;
        if (te = s0(Y, te), te !== null) {
          ql = i, e.cancelPendingCommit = te(Zd.bind(null, e, t, i, l, a, n, c, h, p, w, Y, null, _, H)), oa(e, i, c, !O);
          return;
        }
      }
      Zd(e, t, i, l, a, n, c, h, p);
    }
    function Av(e) {
      for (var t = e; ; ) {
        var l = t.tag;
        if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null))) for (var a = 0; a < l.length; a++) {
          var n = l[a], i = n.getSnapshot;
          n = n.value;
          try {
            if (!Yt(i(), n)) return false;
          } catch {
            return false;
          }
        }
        if (l = t.child, t.subtreeFlags & 16384 && l !== null) l.return = t, t = l;
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return true;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      }
      return true;
    }
    function oa(e, t, l, a) {
      t &= ~Wf, t &= ~Xa, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
      for (var n = t; 0 < n; ) {
        var i = 31 - Tt(n), c = 1 << i;
        a[i] = -1, n &= ~c;
      }
      l !== 0 && Wu(e, l, t);
    }
    function Gi() {
      return (je & 6) === 0 ? (Su(0), false) : true;
    }
    function tc() {
      if (Ae !== null) {
        if (Ye === 0) var e = Ae.return;
        else e = Ae, _l = Na = null, gf(e), yn = null, lu = 0, e = Ae;
        for (; e !== null; ) md(e.alternate, e), e = e.return;
        Ae = null;
      }
    }
    function Mn(e, t) {
      var l = e.timeoutHandle;
      l !== -1 && (e.timeoutHandle = -1, Jv(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), ql = 0, tc(), Je = e, Ae = l = Al(e.current, null), _e = t, Ye = 0, Qt = null, ia = false, Rn = Kl(e, t), $f = false, zn = Vt = Wf = Xa = ra = at = 0, wt = pu = null, kf = false, (t & 8) !== 0 && (t |= t & 32);
      var a = e.entangledLanes;
      if (a !== 0) for (e = e.entanglements, a &= t; 0 < a; ) {
        var n = 31 - Tt(a), i = 1 << n;
        t |= e[n], a &= ~i;
      }
      return Yl = t, fi(), l;
    }
    function jd(e, t) {
      ge = null, U.H = ou, t === mn || t === vi ? (t = es(), Ye = 3) : t === nf ? (t = es(), Ye = 4) : Ye = t === Nf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Qt = t, Ae === null && (at = 1, Ci(e, Wt(t, e.current)));
    }
    function Yd() {
      var e = Gt.current;
      return e === null ? true : (_e & 4194048) === _e ? el === null : (_e & 62914560) === _e || (_e & 536870912) !== 0 ? e === el : false;
    }
    function qd() {
      var e = U.H;
      return U.H = ou, e === null ? ou : e;
    }
    function Gd() {
      var e = U.A;
      return U.A = Mv, e;
    }
    function Xi() {
      at = 4, ia || (_e & 4194048) !== _e && Gt.current !== null || (Rn = true), (ra & 134217727) === 0 && (Xa & 134217727) === 0 || Je === null || oa(Je, _e, Vt, false);
    }
    function lc(e, t, l) {
      var a = je;
      je |= 2;
      var n = qd(), i = Gd();
      (Je !== e || _e !== t) && (qi = null, Mn(e, t)), t = false;
      var c = at;
      e: do
        try {
          if (Ye !== 0 && Ae !== null) {
            var h = Ae, p = Qt;
            switch (Ye) {
              case 8:
                tc(), c = 6;
                break e;
              case 3:
              case 2:
              case 9:
              case 6:
                Gt.current === null && (t = true);
                var O = Ye;
                if (Ye = 0, Qt = null, Dn(e, h, p, O), l && Rn) {
                  c = 0;
                  break e;
                }
                break;
              default:
                O = Ye, Ye = 0, Qt = null, Dn(e, h, p, O);
            }
          }
          Ov(), c = at;
          break;
        } catch (w) {
          jd(e, w);
        }
      while (true);
      return t && e.shellSuspendCounter++, _l = Na = null, je = a, U.H = n, U.A = i, Ae === null && (Je = null, _e = 0, fi()), c;
    }
    function Ov() {
      for (; Ae !== null; ) Xd(Ae);
    }
    function _v(e, t) {
      var l = je;
      je |= 2;
      var a = qd(), n = Gd();
      Je !== e || _e !== t ? (qi = null, Yi = Ot() + 500, Mn(e, t)) : Rn = Kl(e, t);
      e: do
        try {
          if (Ye !== 0 && Ae !== null) {
            t = Ae;
            var i = Qt;
            t: switch (Ye) {
              case 1:
                Ye = 0, Qt = null, Dn(e, t, i, 1);
                break;
              case 2:
              case 9:
                if (Po(i)) {
                  Ye = 0, Qt = null, Qd(t);
                  break;
                }
                t = function() {
                  Ye !== 2 && Ye !== 9 || Je !== e || (Ye = 7), Sl(e);
                }, i.then(t, t);
                break e;
              case 3:
                Ye = 7;
                break e;
              case 4:
                Ye = 5;
                break e;
              case 7:
                Po(i) ? (Ye = 0, Qt = null, Qd(t)) : (Ye = 0, Qt = null, Dn(e, t, i, 7));
                break;
              case 5:
                var c = null;
                switch (Ae.tag) {
                  case 26:
                    c = Ae.memoizedState;
                  case 5:
                  case 27:
                    var h = Ae;
                    if (c ? Oh(c) : h.stateNode.complete) {
                      Ye = 0, Qt = null;
                      var p = h.sibling;
                      if (p !== null) Ae = p;
                      else {
                        var O = h.return;
                        O !== null ? (Ae = O, Qi(O)) : Ae = null;
                      }
                      break t;
                    }
                }
                Ye = 0, Qt = null, Dn(e, t, i, 5);
                break;
              case 6:
                Ye = 0, Qt = null, Dn(e, t, i, 6);
                break;
              case 8:
                tc(), at = 6;
                break e;
              default:
                throw Error(f(462));
            }
          }
          Cv();
          break;
        } catch (w) {
          jd(e, w);
        }
      while (true);
      return _l = Na = null, U.H = a, U.A = n, je = l, Ae !== null ? 0 : (Je = null, _e = 0, fi(), at);
    }
    function Cv() {
      for (; Ae !== null && !pr(); ) Xd(Ae);
    }
    function Xd(e) {
      var t = dd(e.alternate, e, Yl);
      e.memoizedProps = e.pendingProps, t === null ? Qi(e) : Ae = t;
    }
    function Qd(e) {
      var t = e, l = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = id(l, t, t.pendingProps, t.type, void 0, _e);
          break;
        case 11:
          t = id(l, t, t.pendingProps, t.type.render, t.ref, _e);
          break;
        case 5:
          gf(t);
        default:
          md(l, t), t = Ae = Go(t, Yl), t = dd(l, t, Yl);
      }
      e.memoizedProps = e.pendingProps, t === null ? Qi(e) : Ae = t;
    }
    function Dn(e, t, l, a) {
      _l = Na = null, gf(t), yn = null, lu = 0;
      var n = t.return;
      try {
        if (pv(e, n, t, l, _e)) {
          at = 1, Ci(e, Wt(l, e.current)), Ae = null;
          return;
        }
      } catch (i) {
        if (n !== null) throw Ae = n, i;
        at = 1, Ci(e, Wt(l, e.current)), Ae = null;
        return;
      }
      t.flags & 32768 ? (Ne || a === 1 ? e = true : Rn || (_e & 536870912) !== 0 ? e = false : (ia = e = true, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Gt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Vd(t, e)) : Qi(t);
    }
    function Qi(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          Vd(t, ia);
          return;
        }
        e = t.return;
        var l = Ev(t.alternate, t, Yl);
        if (l !== null) {
          Ae = l;
          return;
        }
        if (t = t.sibling, t !== null) {
          Ae = t;
          return;
        }
        Ae = t = e;
      } while (t !== null);
      at === 0 && (at = 5);
    }
    function Vd(e, t) {
      do {
        var l = Rv(e.alternate, e);
        if (l !== null) {
          l.flags &= 32767, Ae = l;
          return;
        }
        if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
          Ae = e;
          return;
        }
        Ae = e = l;
      } while (e !== null);
      at = 6, Ae = null;
    }
    function Zd(e, t, l, a, n, i, c, h, p) {
      e.cancelPendingCommit = null;
      do
        Vi();
      while (vt !== 0);
      if ((je & 6) !== 0) throw Error(f(327));
      if (t !== null) {
        if (t === e.current) throw Error(f(177));
        if (i = t.lanes | t.childLanes, i |= Qr, $u(e, l, i, c, h, p), e === Je && (Ae = Je = null, _e = 0), Tn = t, ca = e, ql = l, Pf = i, If = n, Hd = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Hv(Zl, function() {
          return Wd(), null;
        })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
          a = U.T, U.T = null, n = V.p, V.p = 2, c = je, je |= 4;
          try {
            zv(e, t, l);
          } finally {
            je = c, V.p = n, U.T = a;
          }
        }
        vt = 1, Kd(), Jd(), Fd();
      }
    }
    function Kd() {
      if (vt === 1) {
        vt = 0;
        var e = ca, t = Tn, l = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || l) {
          l = U.T, U.T = null;
          var a = V.p;
          V.p = 2;
          var n = je;
          je |= 4;
          try {
            Dd(t, e);
            var i = mc, c = xo(e.containerInfo), h = i.focusedElem, p = i.selectionRange;
            if (c !== h && h && h.ownerDocument && Uo(h.ownerDocument.documentElement, h)) {
              if (p !== null && jr(h)) {
                var O = p.start, w = p.end;
                if (w === void 0 && (w = O), "selectionStart" in h) h.selectionStart = O, h.selectionEnd = Math.min(w, h.value.length);
                else {
                  var Y = h.ownerDocument || document, _ = Y && Y.defaultView || window;
                  if (_.getSelection) {
                    var H = _.getSelection(), te = h.textContent.length, se = Math.min(p.start, te), Qe = p.end === void 0 ? se : Math.min(p.end, te);
                    !H.extend && se > Qe && (c = Qe, Qe = se, se = c);
                    var T = Co(h, se), R = Co(h, Qe);
                    if (T && R && (H.rangeCount !== 1 || H.anchorNode !== T.node || H.anchorOffset !== T.offset || H.focusNode !== R.node || H.focusOffset !== R.offset)) {
                      var A = Y.createRange();
                      A.setStart(T.node, T.offset), H.removeAllRanges(), se > Qe ? (H.addRange(A), H.extend(R.node, R.offset)) : (A.setEnd(R.node, R.offset), H.addRange(A));
                    }
                  }
                }
              }
              for (Y = [], H = h; H = H.parentNode; ) H.nodeType === 1 && Y.push({
                element: H,
                left: H.scrollLeft,
                top: H.scrollTop
              });
              for (typeof h.focus == "function" && h.focus(), h = 0; h < Y.length; h++) {
                var j = Y[h];
                j.element.scrollLeft = j.left, j.element.scrollTop = j.top;
              }
            }
            lr = !!hc, mc = hc = null;
          } finally {
            je = n, V.p = a, U.T = l;
          }
        }
        e.current = t, vt = 2;
      }
    }
    function Jd() {
      if (vt === 2) {
        vt = 0;
        var e = ca, t = Tn, l = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || l) {
          l = U.T, U.T = null;
          var a = V.p;
          V.p = 2;
          var n = je;
          je |= 4;
          try {
            Ed(e, t.alternate, t);
          } finally {
            je = n, V.p = a, U.T = l;
          }
        }
        vt = 3;
      }
    }
    function Fd() {
      if (vt === 4 || vt === 3) {
        vt = 0, br();
        var e = ca, t = Tn, l = ql, a = Hd;
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? vt = 5 : (vt = 0, Tn = ca = null, $d(e, e.pendingLanes));
        var n = e.pendingLanes;
        if (n === 0 && (fa = null), C(l), t = t.stateNode, _t && typeof _t.onCommitFiberRoot == "function") try {
          _t.onCommitFiberRoot(zl, t, void 0, (t.current.flags & 128) === 128);
        } catch {
        }
        if (a !== null) {
          t = U.T, n = V.p, V.p = 2, U.T = null;
          try {
            for (var i = e.onRecoverableError, c = 0; c < a.length; c++) {
              var h = a[c];
              i(h.value, {
                componentStack: h.stack
              });
            }
          } finally {
            U.T = t, V.p = n;
          }
        }
        (ql & 3) !== 0 && Vi(), Sl(e), n = e.pendingLanes, (l & 261930) !== 0 && (n & 42) !== 0 ? e === ec ? bu++ : (bu = 0, ec = e) : bu = 0, Su(0);
      }
    }
    function $d(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, eu(t)));
    }
    function Vi() {
      return Kd(), Jd(), Fd(), Wd();
    }
    function Wd() {
      if (vt !== 5) return false;
      var e = ca, t = Pf;
      Pf = 0;
      var l = C(ql), a = U.T, n = V.p;
      try {
        V.p = 32 > l ? 32 : l, U.T = null, l = If, If = null;
        var i = ca, c = ql;
        if (vt = 0, Tn = ca = null, ql = 0, (je & 6) !== 0) throw Error(f(331));
        var h = je;
        if (je |= 4, Ud(i.current), Od(i, i.current, c, l), je = h, Su(0, false), _t && typeof _t.onPostCommitFiberRoot == "function") try {
          _t.onPostCommitFiberRoot(zl, i);
        } catch {
        }
        return true;
      } finally {
        V.p = n, U.T = a, $d(e, t);
      }
    }
    function kd(e, t, l) {
      t = Wt(l, t), t = xf(e.stateNode, t, 2), e = la(e, t, 2), e !== null && (ml(e, 2), Sl(e));
    }
    function qe(e, t, l) {
      if (e.tag === 3) kd(e, e, l);
      else for (; t !== null; ) {
        if (t.tag === 3) {
          kd(t, e, l);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (fa === null || !fa.has(a))) {
            e = Wt(l, e), l = Ps(2), a = la(t, l, 2), a !== null && (Is(l, a, t, e), ml(a, 2), Sl(a));
            break;
          }
        }
        t = t.return;
      }
    }
    function ac(e, t, l) {
      var a = e.pingCache;
      if (a === null) {
        a = e.pingCache = new Dv();
        var n = /* @__PURE__ */ new Set();
        a.set(t, n);
      } else n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
      n.has(l) || ($f = true, n.add(l), e = Uv.bind(null, e, t, l), t.then(e, e));
    }
    function Uv(e, t, l) {
      var a = e.pingCache;
      a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Je === e && (_e & l) === l && (at === 4 || at === 3 && (_e & 62914560) === _e && 300 > Ot() - ji ? (je & 2) === 0 && Mn(e, 0) : Wf |= l, zn === _e && (zn = 0)), Sl(e);
    }
    function Pd(e, t) {
      t === 0 && (t = Xn()), e = Ca(e, t), e !== null && (ml(e, t), Sl(e));
    }
    function xv(e) {
      var t = e.memoizedState, l = 0;
      t !== null && (l = t.retryLane), Pd(e, l);
    }
    function Nv(e, t) {
      var l = 0;
      switch (e.tag) {
        case 31:
        case 13:
          var a = e.stateNode, n = e.memoizedState;
          n !== null && (l = n.retryLane);
          break;
        case 19:
          a = e.stateNode;
          break;
        case 22:
          a = e.stateNode._retryCache;
          break;
        default:
          throw Error(f(314));
      }
      a !== null && a.delete(t), Pd(e, l);
    }
    function Hv(e, t) {
      return Ja(e, t);
    }
    var Zi = null, An = null, nc = false, Ki = false, uc = false, sa = 0;
    function Sl(e) {
      e !== An && e.next === null && (An === null ? Zi = An = e : An = An.next = e), Ki = true, nc || (nc = true, wv());
    }
    function Su(e, t) {
      if (!uc && Ki) {
        uc = true;
        do
          for (var l = false, a = Zi; a !== null; ) {
            if (e !== 0) {
              var n = a.pendingLanes;
              if (n === 0) var i = 0;
              else {
                var c = a.suspendedLanes, h = a.pingedLanes;
                i = (1 << 31 - Tt(42 | e) + 1) - 1, i &= n & ~(c & ~h), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
              }
              i !== 0 && (l = true, lh(a, i));
            } else i = _e, i = Fa(a, a === Je ? i : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), (i & 3) === 0 || Kl(a, i) || (l = true, lh(a, i));
            a = a.next;
          }
        while (l);
        uc = false;
      }
    }
    function Lv() {
      Id();
    }
    function Id() {
      Ki = nc = false;
      var e = 0;
      sa !== 0 && Kv() && (e = sa);
      for (var t = Ot(), l = null, a = Zi; a !== null; ) {
        var n = a.next, i = eh(a, t);
        i === 0 ? (a.next = null, l === null ? Zi = n : l.next = n, n === null && (An = l)) : (l = a, (e !== 0 || (i & 3) !== 0) && (Ki = true)), a = n;
      }
      vt !== 0 && vt !== 5 || Su(e), sa !== 0 && (sa = 0);
    }
    function eh(e, t) {
      for (var l = e.suspendedLanes, a = e.pingedLanes, n = e.expirationTimes, i = e.pendingLanes & -62914561; 0 < i; ) {
        var c = 31 - Tt(i), h = 1 << c, p = n[c];
        p === -1 ? ((h & l) === 0 || (h & a) !== 0) && (n[c] = Rr(h, t)) : p <= t && (e.expiredLanes |= h), i &= ~h;
      }
      if (t = Je, l = _e, l = Fa(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), a = e.callbackNode, l === 0 || e === t && (Ye === 2 || Ye === 9) || e.cancelPendingCommit !== null) return a !== null && a !== null && qn(a), e.callbackNode = null, e.callbackPriority = 0;
      if ((l & 3) === 0 || Kl(e, l)) {
        if (t = l & -l, t === e.callbackPriority) return t;
        switch (a !== null && qn(a), C(l)) {
          case 2:
          case 8:
            l = Gn;
            break;
          case 32:
            l = Zl;
            break;
          case 268435456:
            l = Jt;
            break;
          default:
            l = Zl;
        }
        return a = th.bind(null, e), l = Ja(l, a), e.callbackPriority = t, e.callbackNode = l, t;
      }
      return a !== null && a !== null && qn(a), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function th(e, t) {
      if (vt !== 0 && vt !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
      var l = e.callbackNode;
      if (Vi() && e.callbackNode !== l) return null;
      var a = _e;
      return a = Fa(e, e === Je ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), a === 0 ? null : (wd(e, a, t), eh(e, Ot()), e.callbackNode != null && e.callbackNode === l ? th.bind(null, e) : null);
    }
    function lh(e, t) {
      if (Vi()) return null;
      wd(e, t, true);
    }
    function wv() {
      Fv(function() {
        (je & 6) !== 0 ? Ja(Vl, Lv) : Id();
      });
    }
    function ic() {
      if (sa === 0) {
        var e = dn;
        e === 0 && (e = za, za <<= 1, (za & 261888) === 0 && (za = 256)), sa = e;
      }
      return sa;
    }
    function ah(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ei("" + e);
    }
    function nh(e, t) {
      var l = t.ownerDocument.createElement("input");
      return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
    }
    function Bv(e, t, l, a, n) {
      if (t === "submit" && l && l.stateNode === n) {
        var i = ah((n[k] || null).action), c = a.submitter;
        c && (t = (t = c[k] || null) ? ah(t.formAction) : c.getAttribute("formAction"), t !== null && (i = t, c = null));
        var h = new ni("action", "action", null, a, n);
        e.push({
          event: h,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (a.defaultPrevented) {
                  if (sa !== 0) {
                    var p = c ? nh(n, c) : new FormData(n);
                    Df(l, {
                      pending: true,
                      data: p,
                      method: n.method,
                      action: i
                    }, null, p);
                  }
                } else typeof i == "function" && (h.preventDefault(), p = c ? nh(n, c) : new FormData(n), Df(l, {
                  pending: true,
                  data: p,
                  method: n.method,
                  action: i
                }, i, p));
              },
              currentTarget: n
            }
          ]
        });
      }
    }
    for (var rc = 0; rc < Xr.length; rc++) {
      var fc = Xr[rc], jv = fc.toLowerCase(), Yv = fc[0].toUpperCase() + fc.slice(1);
      fl(jv, "on" + Yv);
    }
    fl(Lo, "onAnimationEnd"), fl(wo, "onAnimationIteration"), fl(Bo, "onAnimationStart"), fl("dblclick", "onDoubleClick"), fl("focusin", "onFocus"), fl("focusout", "onBlur"), fl(tv, "onTransitionRun"), fl(lv, "onTransitionStart"), fl(av, "onTransitionCancel"), fl(jo, "onTransitionEnd"), yl("onMouseEnter", [
      "mouseout",
      "mouseover"
    ]), yl("onMouseLeave", [
      "mouseout",
      "mouseover"
    ]), yl("onPointerEnter", [
      "pointerout",
      "pointerover"
    ]), yl("onPointerLeave", [
      "pointerout",
      "pointerover"
    ]), pt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), pt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), pt("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), pt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), pt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), pt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Eu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), qv = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Eu));
    function uh(e, t) {
      t = (t & 4) !== 0;
      for (var l = 0; l < e.length; l++) {
        var a = e[l], n = a.event;
        a = a.listeners;
        e: {
          var i = void 0;
          if (t) for (var c = a.length - 1; 0 <= c; c--) {
            var h = a[c], p = h.instance, O = h.currentTarget;
            if (h = h.listener, p !== i && n.isPropagationStopped()) break e;
            i = h, n.currentTarget = O;
            try {
              i(n);
            } catch (w) {
              ri(w);
            }
            n.currentTarget = null, i = p;
          }
          else for (c = 0; c < a.length; c++) {
            if (h = a[c], p = h.instance, O = h.currentTarget, h = h.listener, p !== i && n.isPropagationStopped()) break e;
            i = h, n.currentTarget = O;
            try {
              i(n);
            } catch (w) {
              ri(w);
            }
            n.currentTarget = null, i = p;
          }
        }
      }
    }
    function Oe(e, t) {
      var l = t[re];
      l === void 0 && (l = t[re] = /* @__PURE__ */ new Set());
      var a = e + "__bubble";
      l.has(a) || (ih(t, e, 2, false), l.add(a));
    }
    function cc(e, t, l) {
      var a = 0;
      t && (a |= 4), ih(l, e, a, t);
    }
    var Ji = "_reactListening" + Math.random().toString(36).slice(2);
    function oc(e) {
      if (!e[Ji]) {
        e[Ji] = true, Fl.forEach(function(l) {
          l !== "selectionchange" && (qv.has(l) || cc(l, false, e), cc(l, true, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Ji] || (t[Ji] = true, cc("selectionchange", false, t));
      }
    }
    function ih(e, t, l, a) {
      switch (Lh(t)) {
        case 2:
          var n = m0;
          break;
        case 8:
          n = y0;
          break;
        default:
          n = Mc;
      }
      l = n.bind(null, t, l, e), n = void 0, !_r || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = true), a ? n !== void 0 ? e.addEventListener(t, l, {
        capture: true,
        passive: n
      }) : e.addEventListener(t, l, true) : n !== void 0 ? e.addEventListener(t, l, {
        passive: n
      }) : e.addEventListener(t, l, false);
    }
    function sc(e, t, l, a, n) {
      var i = a;
      if ((t & 1) === 0 && (t & 2) === 0 && a !== null) e: for (; ; ) {
        if (a === null) return;
        var c = a.tag;
        if (c === 3 || c === 4) {
          var h = a.stateNode.containerInfo;
          if (h === n) break;
          if (c === 4) for (c = a.return; c !== null; ) {
            var p = c.tag;
            if ((p === 3 || p === 4) && c.stateNode.containerInfo === n) return;
            c = c.return;
          }
          for (; h !== null; ) {
            if (c = $e(h), c === null) return;
            if (p = c.tag, p === 5 || p === 6 || p === 26 || p === 27) {
              a = i = c;
              continue e;
            }
            h = h.parentNode;
          }
        }
        a = a.return;
      }
      oo(function() {
        var O = i, w = Ar(l), Y = [];
        e: {
          var _ = Yo.get(e);
          if (_ !== void 0) {
            var H = ni, te = e;
            switch (e) {
              case "keypress":
                if (li(l) === 0) break e;
              case "keydown":
              case "keyup":
                H = Ny;
                break;
              case "focusin":
                te = "focus", H = Nr;
                break;
              case "focusout":
                te = "blur", H = Nr;
                break;
              case "beforeblur":
              case "afterblur":
                H = Nr;
                break;
              case "click":
                if (l.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                H = mo;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                H = Ey;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                H = wy;
                break;
              case Lo:
              case wo:
              case Bo:
                H = Ty;
                break;
              case jo:
                H = jy;
                break;
              case "scroll":
              case "scrollend":
                H = by;
                break;
              case "wheel":
                H = qy;
                break;
              case "copy":
              case "cut":
              case "paste":
                H = Dy;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                H = vo;
                break;
              case "toggle":
              case "beforetoggle":
                H = Xy;
            }
            var se = (t & 4) !== 0, Qe = !se && (e === "scroll" || e === "scrollend"), T = se ? _ !== null ? _ + "Capture" : null : _;
            se = [];
            for (var R = O, A; R !== null; ) {
              var j = R;
              if (A = j.stateNode, j = j.tag, j !== 5 && j !== 26 && j !== 27 || A === null || T === null || (j = Qn(R, T), j != null && se.push(Ru(R, j, A))), Qe) break;
              R = R.return;
            }
            0 < se.length && (_ = new H(_, te, null, l, w), Y.push({
              event: _,
              listeners: se
            }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (_ = e === "mouseover" || e === "pointerover", H = e === "mouseout" || e === "pointerout", _ && l !== Dr && (te = l.relatedTarget || l.fromElement) && ($e(te) || te[P])) break e;
            if ((H || _) && (_ = w.window === w ? w : (_ = w.ownerDocument) ? _.defaultView || _.parentWindow : window, H ? (te = l.relatedTarget || l.toElement, H = O, te = te ? $e(te) : null, te !== null && (Qe = d(te), se = te.tag, te !== Qe || se !== 5 && se !== 27 && se !== 6) && (te = null)) : (H = null, te = O), H !== te)) {
              if (se = mo, j = "onMouseLeave", T = "onMouseEnter", R = "mouse", (e === "pointerout" || e === "pointerover") && (se = vo, j = "onPointerLeave", T = "onPointerEnter", R = "pointer"), Qe = H == null ? _ : He(H), A = te == null ? _ : He(te), _ = new se(j, R + "leave", H, l, w), _.target = Qe, _.relatedTarget = A, j = null, $e(w) === O && (se = new se(T, R + "enter", te, l, w), se.target = A, se.relatedTarget = Qe, j = se), Qe = j, H && te) t: {
                for (se = Gv, T = H, R = te, A = 0, j = T; j; j = se(j)) A++;
                j = 0;
                for (var fe = R; fe; fe = se(fe)) j++;
                for (; 0 < A - j; ) T = se(T), A--;
                for (; 0 < j - A; ) R = se(R), j--;
                for (; A--; ) {
                  if (T === R || R !== null && T === R.alternate) {
                    se = T;
                    break t;
                  }
                  T = se(T), R = se(R);
                }
                se = null;
              }
              else se = null;
              H !== null && rh(Y, _, H, se, false), te !== null && Qe !== null && rh(Y, Qe, te, se, true);
            }
          }
          e: {
            if (_ = O ? He(O) : window, H = _.nodeName && _.nodeName.toLowerCase(), H === "select" || H === "input" && _.type === "file") var we = To;
            else if (Ro(_)) if (Mo) we = Py;
            else {
              we = Wy;
              var ne = $y;
            }
            else H = _.nodeName, !H || H.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? O && Mr(O.elementType) && (we = To) : we = ky;
            if (we && (we = we(e, O))) {
              zo(Y, we, l, w);
              break e;
            }
            ne && ne(e, _, O), e === "focusout" && O && _.type === "number" && O.memoizedProps.value != null && Tr(_, "number", _.value);
          }
          switch (ne = O ? He(O) : window, e) {
            case "focusin":
              (Ro(ne) || ne.contentEditable === "true") && (an = ne, Yr = O, kn = null);
              break;
            case "focusout":
              kn = Yr = an = null;
              break;
            case "mousedown":
              qr = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              qr = false, No(Y, l, w);
              break;
            case "selectionchange":
              if (ev) break;
            case "keydown":
            case "keyup":
              No(Y, l, w);
          }
          var Ee;
          if (Lr) e: {
            switch (e) {
              case "compositionstart":
                var Ce = "onCompositionStart";
                break e;
              case "compositionend":
                Ce = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Ce = "onCompositionUpdate";
                break e;
            }
            Ce = void 0;
          }
          else ln ? So(e, l) && (Ce = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (Ce = "onCompositionStart");
          Ce && (go && l.locale !== "ko" && (ln || Ce !== "onCompositionStart" ? Ce === "onCompositionEnd" && ln && (Ee = so()) : ($l = w, Cr = "value" in $l ? $l.value : $l.textContent, ln = true)), ne = Fi(O, Ce), 0 < ne.length && (Ce = new yo(Ce, e, null, l, w), Y.push({
            event: Ce,
            listeners: ne
          }), Ee ? Ce.data = Ee : (Ee = Eo(l), Ee !== null && (Ce.data = Ee)))), (Ee = Vy ? Zy(e, l) : Ky(e, l)) && (Ce = Fi(O, "onBeforeInput"), 0 < Ce.length && (ne = new yo("onBeforeInput", "beforeinput", null, l, w), Y.push({
            event: ne,
            listeners: Ce
          }), ne.data = Ee)), Bv(Y, e, O, l, w);
        }
        uh(Y, t);
      });
    }
    function Ru(e, t, l) {
      return {
        instance: e,
        listener: t,
        currentTarget: l
      };
    }
    function Fi(e, t) {
      for (var l = t + "Capture", a = []; e !== null; ) {
        var n = e, i = n.stateNode;
        if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || i === null || (n = Qn(e, l), n != null && a.unshift(Ru(e, n, i)), n = Qn(e, t), n != null && a.push(Ru(e, n, i))), e.tag === 3) return a;
        e = e.return;
      }
      return [];
    }
    function Gv(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function rh(e, t, l, a, n) {
      for (var i = t._reactName, c = []; l !== null && l !== a; ) {
        var h = l, p = h.alternate, O = h.stateNode;
        if (h = h.tag, p !== null && p === a) break;
        h !== 5 && h !== 26 && h !== 27 || O === null || (p = O, n ? (O = Qn(l, i), O != null && c.unshift(Ru(l, O, p))) : n || (O = Qn(l, i), O != null && c.push(Ru(l, O, p)))), l = l.return;
      }
      c.length !== 0 && e.push({
        event: t,
        listeners: c
      });
    }
    var Xv = /\r\n?/g, Qv = /\u0000|\uFFFD/g;
    function fh(e) {
      return (typeof e == "string" ? e : "" + e).replace(Xv, `
`).replace(Qv, "");
    }
    function ch(e, t) {
      return t = fh(t), fh(e) === t;
    }
    function Xe(e, t, l, a, n, i) {
      switch (l) {
        case "children":
          typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Ia(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Ia(e, "" + a);
          break;
        case "className":
          nt(e, "class", a);
          break;
        case "tabIndex":
          nt(e, "tabindex", a);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          nt(e, l, a);
          break;
        case "style":
          fo(e, a, i);
          break;
        case "data":
          if (t !== "object") {
            nt(e, "data", a);
            break;
          }
        case "src":
        case "href":
          if (a === "" && (t !== "a" || l !== "href")) {
            e.removeAttribute(l);
            break;
          }
          if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
            e.removeAttribute(l);
            break;
          }
          a = ei("" + a), e.setAttribute(l, a);
          break;
        case "action":
        case "formAction":
          if (typeof a == "function") {
            e.setAttribute(l, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
            break;
          } else typeof i == "function" && (l === "formAction" ? (t !== "input" && Xe(e, t, "name", n.name, n, null), Xe(e, t, "formEncType", n.formEncType, n, null), Xe(e, t, "formMethod", n.formMethod, n, null), Xe(e, t, "formTarget", n.formTarget, n, null)) : (Xe(e, t, "encType", n.encType, n, null), Xe(e, t, "method", n.method, n, null), Xe(e, t, "target", n.target, n, null)));
          if (a == null || typeof a == "symbol" || typeof a == "boolean") {
            e.removeAttribute(l);
            break;
          }
          a = ei("" + a), e.setAttribute(l, a);
          break;
        case "onClick":
          a != null && (e.onclick = Ml);
          break;
        case "onScroll":
          a != null && Oe("scroll", e);
          break;
        case "onScrollEnd":
          a != null && Oe("scrollend", e);
          break;
        case "dangerouslySetInnerHTML":
          if (a != null) {
            if (typeof a != "object" || !("__html" in a)) throw Error(f(61));
            if (l = a.__html, l != null) {
              if (n.children != null) throw Error(f(60));
              e.innerHTML = l;
            }
          }
          break;
        case "multiple":
          e.multiple = a && typeof a != "function" && typeof a != "symbol";
          break;
        case "muted":
          e.muted = a && typeof a != "function" && typeof a != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
            e.removeAttribute("xlink:href");
            break;
          }
          l = ei("" + a), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "" + a) : e.removeAttribute(l);
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          a && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
          break;
        case "capture":
        case "download":
          a === true ? e.setAttribute(l, "") : a !== false && a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, a) : e.removeAttribute(l);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? e.setAttribute(l, a) : e.removeAttribute(l);
          break;
        case "rowSpan":
        case "start":
          a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? e.removeAttribute(l) : e.setAttribute(l, a);
          break;
        case "popover":
          Oe("beforetoggle", e), Oe("toggle", e), De(e, "popover", a);
          break;
        case "xlinkActuate":
          Mt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
          break;
        case "xlinkArcrole":
          Mt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
          break;
        case "xlinkRole":
          Mt(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
          break;
        case "xlinkShow":
          Mt(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
          break;
        case "xlinkTitle":
          Mt(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
          break;
        case "xlinkType":
          Mt(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
          break;
        case "xmlBase":
          Mt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
          break;
        case "xmlLang":
          Mt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
          break;
        case "xmlSpace":
          Mt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
          break;
        case "is":
          De(e, "is", a);
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = gy.get(l) || l, De(e, l, a));
      }
    }
    function dc(e, t, l, a, n, i) {
      switch (l) {
        case "style":
          fo(e, a, i);
          break;
        case "dangerouslySetInnerHTML":
          if (a != null) {
            if (typeof a != "object" || !("__html" in a)) throw Error(f(61));
            if (l = a.__html, l != null) {
              if (n.children != null) throw Error(f(60));
              e.innerHTML = l;
            }
          }
          break;
        case "children":
          typeof a == "string" ? Ia(e, a) : (typeof a == "number" || typeof a == "bigint") && Ia(e, "" + a);
          break;
        case "onScroll":
          a != null && Oe("scroll", e);
          break;
        case "onScrollEnd":
          a != null && Oe("scrollend", e);
          break;
        case "onClick":
          a != null && (e.onclick = Ml);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (!rl.hasOwnProperty(l)) e: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), t = l.slice(2, n ? l.length - 7 : void 0), i = e[k] || null, i = i != null ? i[l] : null, typeof i == "function" && e.removeEventListener(t, i, n), typeof a == "function")) {
              typeof i != "function" && i !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, a, n);
              break e;
            }
            l in e ? e[l] = a : a === true ? e.setAttribute(l, "") : De(e, l, a);
          }
      }
    }
    function zt(e, t, l) {
      switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          Oe("error", e), Oe("load", e);
          var a = false, n = false, i;
          for (i in l) if (l.hasOwnProperty(i)) {
            var c = l[i];
            if (c != null) switch (i) {
              case "src":
                a = true;
                break;
              case "srcSet":
                n = true;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(f(137, t));
              default:
                Xe(e, t, i, c, l, null);
            }
          }
          n && Xe(e, t, "srcSet", l.srcSet, l, null), a && Xe(e, t, "src", l.src, l, null);
          return;
        case "input":
          Oe("invalid", e);
          var h = i = c = n = null, p = null, O = null;
          for (a in l) if (l.hasOwnProperty(a)) {
            var w = l[a];
            if (w != null) switch (a) {
              case "name":
                n = w;
                break;
              case "type":
                c = w;
                break;
              case "checked":
                p = w;
                break;
              case "defaultChecked":
                O = w;
                break;
              case "value":
                i = w;
                break;
              case "defaultValue":
                h = w;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (w != null) throw Error(f(137, t));
                break;
              default:
                Xe(e, t, a, w, l, null);
            }
          }
          no(e, i, h, p, O, c, n, false);
          return;
        case "select":
          Oe("invalid", e), a = c = i = null;
          for (n in l) if (l.hasOwnProperty(n) && (h = l[n], h != null)) switch (n) {
            case "value":
              i = h;
              break;
            case "defaultValue":
              c = h;
              break;
            case "multiple":
              a = h;
            default:
              Xe(e, t, n, h, l, null);
          }
          t = i, l = c, e.multiple = !!a, t != null ? Pa(e, !!a, t, false) : l != null && Pa(e, !!a, l, true);
          return;
        case "textarea":
          Oe("invalid", e), i = n = a = null;
          for (c in l) if (l.hasOwnProperty(c) && (h = l[c], h != null)) switch (c) {
            case "value":
              a = h;
              break;
            case "defaultValue":
              n = h;
              break;
            case "children":
              i = h;
              break;
            case "dangerouslySetInnerHTML":
              if (h != null) throw Error(f(91));
              break;
            default:
              Xe(e, t, c, h, l, null);
          }
          io(e, a, n, i);
          return;
        case "option":
          for (p in l) l.hasOwnProperty(p) && (a = l[p], a != null) && (p === "selected" ? e.selected = a && typeof a != "function" && typeof a != "symbol" : Xe(e, t, p, a, l, null));
          return;
        case "dialog":
          Oe("beforetoggle", e), Oe("toggle", e), Oe("cancel", e), Oe("close", e);
          break;
        case "iframe":
        case "object":
          Oe("load", e);
          break;
        case "video":
        case "audio":
          for (a = 0; a < Eu.length; a++) Oe(Eu[a], e);
          break;
        case "image":
          Oe("error", e), Oe("load", e);
          break;
        case "details":
          Oe("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          Oe("error", e), Oe("load", e);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (O in l) if (l.hasOwnProperty(O) && (a = l[O], a != null)) switch (O) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(f(137, t));
            default:
              Xe(e, t, O, a, l, null);
          }
          return;
        default:
          if (Mr(t)) {
            for (w in l) l.hasOwnProperty(w) && (a = l[w], a !== void 0 && dc(e, t, w, a, l, void 0));
            return;
          }
      }
      for (h in l) l.hasOwnProperty(h) && (a = l[h], a != null && Xe(e, t, h, a, l, null));
    }
    function Vv(e, t, l, a) {
      switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var n = null, i = null, c = null, h = null, p = null, O = null, w = null;
          for (H in l) {
            var Y = l[H];
            if (l.hasOwnProperty(H) && Y != null) switch (H) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                p = Y;
              default:
                a.hasOwnProperty(H) || Xe(e, t, H, null, a, Y);
            }
          }
          for (var _ in a) {
            var H = a[_];
            if (Y = l[_], a.hasOwnProperty(_) && (H != null || Y != null)) switch (_) {
              case "type":
                i = H;
                break;
              case "name":
                n = H;
                break;
              case "checked":
                O = H;
                break;
              case "defaultChecked":
                w = H;
                break;
              case "value":
                c = H;
                break;
              case "defaultValue":
                h = H;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (H != null) throw Error(f(137, t));
                break;
              default:
                H !== Y && Xe(e, t, _, H, a, Y);
            }
          }
          zr(e, c, h, p, O, w, i, n);
          return;
        case "select":
          H = c = h = _ = null;
          for (i in l) if (p = l[i], l.hasOwnProperty(i) && p != null) switch (i) {
            case "value":
              break;
            case "multiple":
              H = p;
            default:
              a.hasOwnProperty(i) || Xe(e, t, i, null, a, p);
          }
          for (n in a) if (i = a[n], p = l[n], a.hasOwnProperty(n) && (i != null || p != null)) switch (n) {
            case "value":
              _ = i;
              break;
            case "defaultValue":
              h = i;
              break;
            case "multiple":
              c = i;
            default:
              i !== p && Xe(e, t, n, i, a, p);
          }
          t = h, l = c, a = H, _ != null ? Pa(e, !!l, _, false) : !!a != !!l && (t != null ? Pa(e, !!l, t, true) : Pa(e, !!l, l ? [] : "", false));
          return;
        case "textarea":
          H = _ = null;
          for (h in l) if (n = l[h], l.hasOwnProperty(h) && n != null && !a.hasOwnProperty(h)) switch (h) {
            case "value":
              break;
            case "children":
              break;
            default:
              Xe(e, t, h, null, a, n);
          }
          for (c in a) if (n = a[c], i = l[c], a.hasOwnProperty(c) && (n != null || i != null)) switch (c) {
            case "value":
              _ = n;
              break;
            case "defaultValue":
              H = n;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (n != null) throw Error(f(91));
              break;
            default:
              n !== i && Xe(e, t, c, n, a, i);
          }
          uo(e, _, H);
          return;
        case "option":
          for (var te in l) _ = l[te], l.hasOwnProperty(te) && _ != null && !a.hasOwnProperty(te) && (te === "selected" ? e.selected = false : Xe(e, t, te, null, a, _));
          for (p in a) _ = a[p], H = l[p], a.hasOwnProperty(p) && _ !== H && (_ != null || H != null) && (p === "selected" ? e.selected = _ && typeof _ != "function" && typeof _ != "symbol" : Xe(e, t, p, _, a, H));
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var se in l) _ = l[se], l.hasOwnProperty(se) && _ != null && !a.hasOwnProperty(se) && Xe(e, t, se, null, a, _);
          for (O in a) if (_ = a[O], H = l[O], a.hasOwnProperty(O) && _ !== H && (_ != null || H != null)) switch (O) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (_ != null) throw Error(f(137, t));
              break;
            default:
              Xe(e, t, O, _, a, H);
          }
          return;
        default:
          if (Mr(t)) {
            for (var Qe in l) _ = l[Qe], l.hasOwnProperty(Qe) && _ !== void 0 && !a.hasOwnProperty(Qe) && dc(e, t, Qe, void 0, a, _);
            for (w in a) _ = a[w], H = l[w], !a.hasOwnProperty(w) || _ === H || _ === void 0 && H === void 0 || dc(e, t, w, _, a, H);
            return;
          }
      }
      for (var T in l) _ = l[T], l.hasOwnProperty(T) && _ != null && !a.hasOwnProperty(T) && Xe(e, t, T, null, a, _);
      for (Y in a) _ = a[Y], H = l[Y], !a.hasOwnProperty(Y) || _ === H || _ == null && H == null || Xe(e, t, Y, _, a, H);
    }
    function oh(e) {
      switch (e) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
          return true;
        default:
          return false;
      }
    }
    function Zv() {
      if (typeof performance.getEntriesByType == "function") {
        for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
          var n = l[a], i = n.transferSize, c = n.initiatorType, h = n.duration;
          if (i && h && oh(c)) {
            for (c = 0, h = n.responseEnd, a += 1; a < l.length; a++) {
              var p = l[a], O = p.startTime;
              if (O > h) break;
              var w = p.transferSize, Y = p.initiatorType;
              w && oh(Y) && (p = p.responseEnd, c += w * (p < h ? 1 : (h - O) / (p - O)));
            }
            if (--a, t += 8 * (i + c) / (n.duration / 1e3), e++, 10 < e) break;
          }
        }
        if (0 < e) return t / e / 1e6;
      }
      return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
    }
    var hc = null, mc = null;
    function $i(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function sh(e) {
      switch (e) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function dh(e, t) {
      if (e === 0) switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
      return e === 1 && t === "foreignObject" ? 0 : e;
    }
    function yc(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    var vc = null;
    function Kv() {
      var e = window.event;
      return e && e.type === "popstate" ? e === vc ? false : (vc = e, true) : (vc = null, false);
    }
    var hh = typeof setTimeout == "function" ? setTimeout : void 0, Jv = typeof clearTimeout == "function" ? clearTimeout : void 0, mh = typeof Promise == "function" ? Promise : void 0, Fv = typeof queueMicrotask == "function" ? queueMicrotask : typeof mh < "u" ? function(e) {
      return mh.resolve(null).then(e).catch($v);
    } : hh;
    function $v(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function da(e) {
      return e === "head";
    }
    function yh(e, t) {
      var l = t, a = 0;
      do {
        var n = l.nextSibling;
        if (e.removeChild(l), n && n.nodeType === 8) if (l = n.data, l === "/$" || l === "/&") {
          if (a === 0) {
            e.removeChild(n), Un(t);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&") a++;
        else if (l === "html") zu(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, zu(l);
          for (var i = l.firstChild; i; ) {
            var c = i.nextSibling, h = i.nodeName;
            i[Me] || h === "SCRIPT" || h === "STYLE" || h === "LINK" && i.rel.toLowerCase() === "stylesheet" || l.removeChild(i), i = c;
          }
        } else l === "body" && zu(e.ownerDocument.body);
        l = n;
      } while (l);
      Un(t);
    }
    function vh(e, t) {
      var l = e;
      e = 0;
      do {
        var a = l.nextSibling;
        if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), a && a.nodeType === 8) if (l = a.data, l === "/$") {
          if (e === 0) break;
          e--;
        } else l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
        l = a;
      } while (l);
    }
    function gc(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var l = t;
        switch (t = t.nextSibling, l.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            gc(l), Ke(l);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (l.rel.toLowerCase() === "stylesheet") continue;
        }
        e.removeChild(l);
      }
    }
    function Wv(e, t, l, a) {
      for (; e.nodeType === 1; ) {
        var n = l;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
        } else if (a) {
          if (!e[Me]) switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (i = e.getAttribute("rel"), i === "stylesheet" && e.hasAttribute("data-precedence")) break;
              if (i !== n.rel || e.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || e.getAttribute("title") !== (n.title == null ? null : n.title)) break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (i = e.getAttribute("src"), (i !== (n.src == null ? null : n.src) || e.getAttribute("type") !== (n.type == null ? null : n.type) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && i && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
              return e;
            default:
              return e;
          }
        } else if (t === "input" && e.type === "hidden") {
          var i = n.name == null ? null : "" + n.name;
          if (n.type === "hidden" && e.getAttribute("name") === i) return e;
        } else return e;
        if (e = tl(e.nextSibling), e === null) break;
      }
      return null;
    }
    function kv(e, t, l) {
      if (t === "") return null;
      for (; e.nodeType !== 3; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = tl(e.nextSibling), e === null)) return null;
      return e;
    }
    function gh(e, t) {
      for (; e.nodeType !== 8; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = tl(e.nextSibling), e === null)) return null;
      return e;
    }
    function pc(e) {
      return e.data === "$?" || e.data === "$~";
    }
    function bc(e) {
      return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
    }
    function Pv(e, t) {
      var l = e.ownerDocument;
      if (e.data === "$~") e._reactRetry = t;
      else if (e.data !== "$?" || l.readyState !== "loading") t();
      else {
        var a = function() {
          t(), l.removeEventListener("DOMContentLoaded", a);
        };
        l.addEventListener("DOMContentLoaded", a), e._reactRetry = a;
      }
    }
    function tl(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
          if (t === "/$" || t === "/&") return null;
        }
      }
      return e;
    }
    var Sc = null;
    function ph(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var l = e.data;
          if (l === "/$" || l === "/&") {
            if (t === 0) return tl(e.nextSibling);
            t--;
          } else l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function bh(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var l = e.data;
          if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
            if (t === 0) return e;
            t--;
          } else l !== "/$" && l !== "/&" || t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function Sh(e, t, l) {
      switch (t = $i(l), e) {
        case "html":
          if (e = t.documentElement, !e) throw Error(f(452));
          return e;
        case "head":
          if (e = t.head, !e) throw Error(f(453));
          return e;
        case "body":
          if (e = t.body, !e) throw Error(f(454));
          return e;
        default:
          throw Error(f(451));
      }
    }
    function zu(e) {
      for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
      Ke(e);
    }
    var ll = /* @__PURE__ */ new Map(), Eh = /* @__PURE__ */ new Set();
    function Wi(e) {
      return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
    }
    var Gl = V.d;
    V.d = {
      f: Iv,
      r: e0,
      D: t0,
      C: l0,
      L: a0,
      m: n0,
      X: i0,
      S: u0,
      M: r0
    };
    function Iv() {
      var e = Gl.f(), t = Gi();
      return e || t;
    }
    function e0(e) {
      var t = tt(e);
      t !== null && t.tag === 5 && t.type === "form" ? js(t) : Gl.r(e);
    }
    var On = typeof document > "u" ? null : document;
    function Rh(e, t, l) {
      var a = On;
      if (a && typeof t == "string" && t) {
        var n = Ft(t);
        n = 'link[rel="' + e + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), Eh.has(n) || (Eh.add(n), e = {
          rel: e,
          crossOrigin: l,
          href: t
        }, a.querySelector(n) === null && (t = a.createElement("link"), zt(t, "link", e), Fe(t), a.head.appendChild(t)));
      }
    }
    function t0(e) {
      Gl.D(e), Rh("dns-prefetch", e, null);
    }
    function l0(e, t) {
      Gl.C(e, t), Rh("preconnect", e, t);
    }
    function a0(e, t, l) {
      Gl.L(e, t, l);
      var a = On;
      if (a && e && t) {
        var n = 'link[rel="preload"][as="' + Ft(t) + '"]';
        t === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + Ft(l.imageSrcSet) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + Ft(l.imageSizes) + '"]')) : n += '[href="' + Ft(e) + '"]';
        var i = n;
        switch (t) {
          case "style":
            i = _n(e);
            break;
          case "script":
            i = Cn(e);
        }
        ll.has(i) || (e = S({
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        }, l), ll.set(i, e), a.querySelector(n) !== null || t === "style" && a.querySelector(Tu(i)) || t === "script" && a.querySelector(Mu(i)) || (t = a.createElement("link"), zt(t, "link", e), Fe(t), a.head.appendChild(t)));
      }
    }
    function n0(e, t) {
      Gl.m(e, t);
      var l = On;
      if (l && e) {
        var a = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + Ft(a) + '"][href="' + Ft(e) + '"]', i = n;
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            i = Cn(e);
        }
        if (!ll.has(i) && (e = S({
          rel: "modulepreload",
          href: e
        }, t), ll.set(i, e), l.querySelector(n) === null)) {
          switch (a) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (l.querySelector(Mu(i))) return;
          }
          a = l.createElement("link"), zt(a, "link", e), Fe(a), l.head.appendChild(a);
        }
      }
    }
    function u0(e, t, l) {
      Gl.S(e, t, l);
      var a = On;
      if (a && e) {
        var n = yt(a).hoistableStyles, i = _n(e);
        t = t || "default";
        var c = n.get(i);
        if (!c) {
          var h = {
            loading: 0,
            preload: null
          };
          if (c = a.querySelector(Tu(i))) h.loading = 5;
          else {
            e = S({
              rel: "stylesheet",
              href: e,
              "data-precedence": t
            }, l), (l = ll.get(i)) && Ec(e, l);
            var p = c = a.createElement("link");
            Fe(p), zt(p, "link", e), p._p = new Promise(function(O, w) {
              p.onload = O, p.onerror = w;
            }), p.addEventListener("load", function() {
              h.loading |= 1;
            }), p.addEventListener("error", function() {
              h.loading |= 2;
            }), h.loading |= 4, ki(c, t, a);
          }
          c = {
            type: "stylesheet",
            instance: c,
            count: 1,
            state: h
          }, n.set(i, c);
        }
      }
    }
    function i0(e, t) {
      Gl.X(e, t);
      var l = On;
      if (l && e) {
        var a = yt(l).hoistableScripts, n = Cn(e), i = a.get(n);
        i || (i = l.querySelector(Mu(n)), i || (e = S({
          src: e,
          async: true
        }, t), (t = ll.get(n)) && Rc(e, t), i = l.createElement("script"), Fe(i), zt(i, "link", e), l.head.appendChild(i)), i = {
          type: "script",
          instance: i,
          count: 1,
          state: null
        }, a.set(n, i));
      }
    }
    function r0(e, t) {
      Gl.M(e, t);
      var l = On;
      if (l && e) {
        var a = yt(l).hoistableScripts, n = Cn(e), i = a.get(n);
        i || (i = l.querySelector(Mu(n)), i || (e = S({
          src: e,
          async: true,
          type: "module"
        }, t), (t = ll.get(n)) && Rc(e, t), i = l.createElement("script"), Fe(i), zt(i, "link", e), l.head.appendChild(i)), i = {
          type: "script",
          instance: i,
          count: 1,
          state: null
        }, a.set(n, i));
      }
    }
    function zh(e, t, l, a) {
      var n = (n = de.current) ? Wi(n) : null;
      if (!n) throw Error(f(446));
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof l.precedence == "string" && typeof l.href == "string" ? (t = _n(l.href), l = yt(n).hoistableStyles, a = l.get(t), a || (a = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, l.set(t, a)), a) : {
            type: "void",
            instance: null,
            count: 0,
            state: null
          };
        case "link":
          if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
            e = _n(l.href);
            var i = yt(n).hoistableStyles, c = i.get(e);
            if (c || (n = n.ownerDocument || n, c = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: {
                loading: 0,
                preload: null
              }
            }, i.set(e, c), (i = n.querySelector(Tu(e))) && !i._p && (c.instance = i, c.state.loading = 5), ll.has(e) || (l = {
              rel: "preload",
              as: "style",
              href: l.href,
              crossOrigin: l.crossOrigin,
              integrity: l.integrity,
              media: l.media,
              hrefLang: l.hrefLang,
              referrerPolicy: l.referrerPolicy
            }, ll.set(e, l), i || f0(n, e, l, c.state))), t && a === null) throw Error(f(528, ""));
            return c;
          }
          if (t && a !== null) throw Error(f(529, ""));
          return null;
        case "script":
          return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Cn(l), l = yt(n).hoistableScripts, a = l.get(t), a || (a = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, l.set(t, a)), a) : {
            type: "void",
            instance: null,
            count: 0,
            state: null
          };
        default:
          throw Error(f(444, e));
      }
    }
    function _n(e) {
      return 'href="' + Ft(e) + '"';
    }
    function Tu(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function Th(e) {
      return S({}, e, {
        "data-precedence": e.precedence,
        precedence: null
      });
    }
    function f0(e, t, l, a) {
      e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
        return a.loading |= 1;
      }), t.addEventListener("error", function() {
        return a.loading |= 2;
      }), zt(t, "link", l), Fe(t), e.head.appendChild(t));
    }
    function Cn(e) {
      return '[src="' + Ft(e) + '"]';
    }
    function Mu(e) {
      return "script[async]" + e;
    }
    function Mh(e, t, l) {
      if (t.count++, t.instance === null) switch (t.type) {
        case "style":
          var a = e.querySelector('style[data-href~="' + Ft(l.href) + '"]');
          if (a) return t.instance = a, Fe(a), a;
          var n = S({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement("style"), Fe(a), zt(a, "style", n), ki(a, l.precedence, e), t.instance = a;
        case "stylesheet":
          n = _n(l.href);
          var i = e.querySelector(Tu(n));
          if (i) return t.state.loading |= 4, t.instance = i, Fe(i), i;
          a = Th(l), (n = ll.get(n)) && Ec(a, n), i = (e.ownerDocument || e).createElement("link"), Fe(i);
          var c = i;
          return c._p = new Promise(function(h, p) {
            c.onload = h, c.onerror = p;
          }), zt(i, "link", a), t.state.loading |= 4, ki(i, l.precedence, e), t.instance = i;
        case "script":
          return i = Cn(l.src), (n = e.querySelector(Mu(i))) ? (t.instance = n, Fe(n), n) : (a = l, (n = ll.get(i)) && (a = S({}, l), Rc(a, n)), e = e.ownerDocument || e, n = e.createElement("script"), Fe(n), zt(n, "link", a), e.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(f(443, t.type));
      }
      else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, ki(a, l.precedence, e));
      return t.instance;
    }
    function ki(e, t, l) {
      for (var a = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), n = a.length ? a[a.length - 1] : null, i = n, c = 0; c < a.length; c++) {
        var h = a[c];
        if (h.dataset.precedence === t) i = h;
        else if (i !== n) break;
      }
      i ? i.parentNode.insertBefore(e, i.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
    }
    function Ec(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
    }
    function Rc(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
    }
    var Pi = null;
    function Dh(e, t, l) {
      if (Pi === null) {
        var a = /* @__PURE__ */ new Map(), n = Pi = /* @__PURE__ */ new Map();
        n.set(l, a);
      } else n = Pi, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
      if (a.has(e)) return a;
      for (a.set(e, null), l = l.getElementsByTagName(e), n = 0; n < l.length; n++) {
        var i = l[n];
        if (!(i[Me] || i[J] || e === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
          var c = i.getAttribute(t) || "";
          c = e + c;
          var h = a.get(c);
          h ? h.push(i) : a.set(c, [
            i
          ]);
        }
      }
      return a;
    }
    function Ah(e, t, l) {
      e = e.ownerDocument || e, e.head.insertBefore(l, t === "title" ? e.querySelector("head > title") : null);
    }
    function c0(e, t, l) {
      if (l === 1 || t.itemProp != null) return false;
      switch (e) {
        case "meta":
        case "title":
          return true;
        case "style":
          if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
          return true;
        case "link":
          if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
          return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : true;
        case "script":
          if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return true;
      }
      return false;
    }
    function Oh(e) {
      return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
    }
    function o0(e, t, l, a) {
      if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== false) && (l.state.loading & 4) === 0) {
        if (l.instance === null) {
          var n = _n(a.href), i = t.querySelector(Tu(n));
          if (i) {
            t = i._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ii.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = i, Fe(i);
            return;
          }
          i = t.ownerDocument || t, a = Th(a), (n = ll.get(n)) && Ec(a, n), i = i.createElement("link"), Fe(i);
          var c = i;
          c._p = new Promise(function(h, p) {
            c.onload = h, c.onerror = p;
          }), zt(i, "link", a), l.instance = i;
        }
        e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Ii.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
      }
    }
    var zc = 0;
    function s0(e, t) {
      return e.stylesheets && e.count === 0 && tr(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
        var a = setTimeout(function() {
          if (e.stylesheets && tr(e, e.stylesheets), e.unsuspend) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        }, 6e4 + t);
        0 < e.imgBytes && zc === 0 && (zc = 62500 * Zv());
        var n = setTimeout(function() {
          if (e.waitingForImages = false, e.count === 0 && (e.stylesheets && tr(e, e.stylesheets), e.unsuspend)) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        }, (e.imgBytes > zc ? 50 : 800) + t);
        return e.unsuspend = l, function() {
          e.unsuspend = null, clearTimeout(a), clearTimeout(n);
        };
      } : null;
    }
    function Ii() {
      if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
        if (this.stylesheets) tr(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          this.unsuspend = null, e();
        }
      }
    }
    var er = null;
    function tr(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, er = /* @__PURE__ */ new Map(), t.forEach(d0, e), er = null, Ii.call(e));
    }
    function d0(e, t) {
      if (!(t.state.loading & 4)) {
        var l = er.get(e);
        if (l) var a = l.get(null);
        else {
          l = /* @__PURE__ */ new Map(), er.set(e, l);
          for (var n = e.querySelectorAll("link[data-precedence],style[data-precedence]"), i = 0; i < n.length; i++) {
            var c = n[i];
            (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (l.set(c.dataset.precedence, c), a = c);
          }
          a && l.set(null, a);
        }
        n = t.instance, c = n.getAttribute("data-precedence"), i = l.get(c) || a, i === a && l.set(null, n), l.set(c, n), this.count++, a = Ii.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), i ? i.parentNode.insertBefore(n, i.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
      }
    }
    var Du = {
      $$typeof: I,
      Provider: null,
      Consumer: null,
      _currentValue: le,
      _currentValue2: le,
      _threadCount: 0
    };
    function h0(e, t, l, a, n, i, c, h, p) {
      this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Jl(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Jl(0), this.hiddenUpdates = Jl(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = i, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = p, this.incompleteTransitions = /* @__PURE__ */ new Map();
    }
    function _h(e, t, l, a, n, i, c, h, p, O, w, Y) {
      return e = new h0(e, t, l, c, p, O, w, Y, h), t = 1, i === true && (t |= 24), i = qt(3, null, null, t), e.current = i, i.stateNode = e, t = tf(), t.refCount++, e.pooledCache = t, t.refCount++, i.memoizedState = {
        element: a,
        isDehydrated: l,
        cache: t
      }, uf(i), e;
    }
    function Ch(e) {
      return e ? (e = rn, e) : rn;
    }
    function Uh(e, t, l, a, n, i) {
      n = Ch(n), a.context === null ? a.context = n : a.pendingContext = n, a = ta(t), a.payload = {
        element: l
      }, i = i === void 0 ? null : i, i !== null && (a.callback = i), l = la(e, a, t), l !== null && (Bt(l, e, t), nu(l, e, t));
    }
    function xh(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var l = e.retryLane;
        e.retryLane = l !== 0 && l < t ? l : t;
      }
    }
    function Tc(e, t) {
      xh(e, t), (e = e.alternate) && xh(e, t);
    }
    function Nh(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = Ca(e, 67108864);
        t !== null && Bt(t, e, 67108864), Tc(e, 67108864);
      }
    }
    function Hh(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = Zt();
        t = z(t);
        var l = Ca(e, t);
        l !== null && Bt(l, e, t), Tc(e, t);
      }
    }
    var lr = true;
    function m0(e, t, l, a) {
      var n = U.T;
      U.T = null;
      var i = V.p;
      try {
        V.p = 2, Mc(e, t, l, a);
      } finally {
        V.p = i, U.T = n;
      }
    }
    function y0(e, t, l, a) {
      var n = U.T;
      U.T = null;
      var i = V.p;
      try {
        V.p = 8, Mc(e, t, l, a);
      } finally {
        V.p = i, U.T = n;
      }
    }
    function Mc(e, t, l, a) {
      if (lr) {
        var n = Dc(a);
        if (n === null) sc(e, t, a, ar, l), wh(e, a);
        else if (g0(n, e, t, l, a)) a.stopPropagation();
        else if (wh(e, a), t & 4 && -1 < v0.indexOf(e)) {
          for (; n !== null; ) {
            var i = tt(n);
            if (i !== null) switch (i.tag) {
              case 3:
                if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                  var c = il(i.pendingLanes);
                  if (c !== 0) {
                    var h = i;
                    for (h.pendingLanes |= 2, h.entangledLanes |= 2; c; ) {
                      var p = 1 << 31 - Tt(c);
                      h.entanglements[1] |= p, c &= ~p;
                    }
                    Sl(i), (je & 6) === 0 && (Yi = Ot() + 500, Su(0));
                  }
                }
                break;
              case 31:
              case 13:
                h = Ca(i, 2), h !== null && Bt(h, i, 2), Gi(), Tc(i, 2);
            }
            if (i = Dc(a), i === null && sc(e, t, a, ar, l), i === n) break;
            n = i;
          }
          n !== null && a.stopPropagation();
        } else sc(e, t, a, null, l);
      }
    }
    function Dc(e) {
      return e = Ar(e), Ac(e);
    }
    var ar = null;
    function Ac(e) {
      if (ar = null, e = $e(e), e !== null) {
        var t = d(e);
        if (t === null) e = null;
        else {
          var l = t.tag;
          if (l === 13) {
            if (e = m(t), e !== null) return e;
            e = null;
          } else if (l === 31) {
            if (e = g(t), e !== null) return e;
            e = null;
          } else if (l === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return ar = e, null;
    }
    function Lh(e) {
      switch (e) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 8;
        case "message":
          switch (Rl()) {
            case Vl:
              return 2;
            case Gn:
              return 8;
            case Zl:
            case ul:
              return 32;
            case Jt:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var Oc = false, ha = null, ma = null, ya = null, Au = /* @__PURE__ */ new Map(), Ou = /* @__PURE__ */ new Map(), va = [], v0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function wh(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          ha = null;
          break;
        case "dragenter":
        case "dragleave":
          ma = null;
          break;
        case "mouseover":
        case "mouseout":
          ya = null;
          break;
        case "pointerover":
        case "pointerout":
          Au.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Ou.delete(t.pointerId);
      }
    }
    function _u(e, t, l, a, n, i) {
      return e === null || e.nativeEvent !== i ? (e = {
        blockedOn: t,
        domEventName: l,
        eventSystemFlags: a,
        nativeEvent: i,
        targetContainers: [
          n
        ]
      }, t !== null && (t = tt(t), t !== null && Nh(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
    }
    function g0(e, t, l, a, n) {
      switch (t) {
        case "focusin":
          return ha = _u(ha, e, t, l, a, n), true;
        case "dragenter":
          return ma = _u(ma, e, t, l, a, n), true;
        case "mouseover":
          return ya = _u(ya, e, t, l, a, n), true;
        case "pointerover":
          var i = n.pointerId;
          return Au.set(i, _u(Au.get(i) || null, e, t, l, a, n)), true;
        case "gotpointercapture":
          return i = n.pointerId, Ou.set(i, _u(Ou.get(i) || null, e, t, l, a, n)), true;
      }
      return false;
    }
    function Bh(e) {
      var t = $e(e.target);
      if (t !== null) {
        var l = d(t);
        if (l !== null) {
          if (t = l.tag, t === 13) {
            if (t = m(l), t !== null) {
              e.blockedOn = t, Z(e.priority, function() {
                Hh(l);
              });
              return;
            }
          } else if (t === 31) {
            if (t = g(l), t !== null) {
              e.blockedOn = t, Z(e.priority, function() {
                Hh(l);
              });
              return;
            }
          } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function nr(e) {
      if (e.blockedOn !== null) return false;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var l = Dc(e.nativeEvent);
        if (l === null) {
          l = e.nativeEvent;
          var a = new l.constructor(l.type, l);
          Dr = a, l.target.dispatchEvent(a), Dr = null;
        } else return t = tt(l), t !== null && Nh(t), e.blockedOn = l, false;
        t.shift();
      }
      return true;
    }
    function jh(e, t, l) {
      nr(e) && l.delete(t);
    }
    function p0() {
      Oc = false, ha !== null && nr(ha) && (ha = null), ma !== null && nr(ma) && (ma = null), ya !== null && nr(ya) && (ya = null), Au.forEach(jh), Ou.forEach(jh);
    }
    function ur(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Oc || (Oc = true, u.unstable_scheduleCallback(u.unstable_NormalPriority, p0)));
    }
    var ir = null;
    function Yh(e) {
      ir !== e && (ir = e, u.unstable_scheduleCallback(u.unstable_NormalPriority, function() {
        ir === e && (ir = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], a = e[t + 1], n = e[t + 2];
          if (typeof a != "function") {
            if (Ac(a || l) === null) continue;
            break;
          }
          var i = tt(l);
          i !== null && (e.splice(t, 3), t -= 3, Df(i, {
            pending: true,
            data: n,
            method: l.method,
            action: a
          }, a, n));
        }
      }));
    }
    function Un(e) {
      function t(p) {
        return ur(p, e);
      }
      ha !== null && ur(ha, e), ma !== null && ur(ma, e), ya !== null && ur(ya, e), Au.forEach(t), Ou.forEach(t);
      for (var l = 0; l < va.length; l++) {
        var a = va[l];
        a.blockedOn === e && (a.blockedOn = null);
      }
      for (; 0 < va.length && (l = va[0], l.blockedOn === null); ) Bh(l), l.blockedOn === null && va.shift();
      if (l = (e.ownerDocument || e).$$reactFormReplay, l != null) for (a = 0; a < l.length; a += 3) {
        var n = l[a], i = l[a + 1], c = n[k] || null;
        if (typeof i == "function") c || Yh(l);
        else if (c) {
          var h = null;
          if (i && i.hasAttribute("formAction")) {
            if (n = i, c = i[k] || null) h = c.formAction;
            else if (Ac(n) !== null) continue;
          } else h = c.action;
          typeof h == "function" ? l[a + 1] = h : (l.splice(a, 3), a -= 3), Yh(l);
        }
      }
    }
    function qh() {
      function e(i) {
        i.canIntercept && i.info === "react-transition" && i.intercept({
          handler: function() {
            return new Promise(function(c) {
              return n = c;
            });
          },
          focusReset: "manual",
          scroll: "manual"
        });
      }
      function t() {
        n !== null && (n(), n = null), a || setTimeout(l, 20);
      }
      function l() {
        if (!a && !navigation.transition) {
          var i = navigation.currentEntry;
          i && i.url != null && navigation.navigate(i.url, {
            state: i.getState(),
            info: "react-transition",
            history: "replace"
          });
        }
      }
      if (typeof navigation == "object") {
        var a = false, n = null;
        return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(l, 100), function() {
          a = true, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), n !== null && (n(), n = null);
        };
      }
    }
    function _c(e) {
      this._internalRoot = e;
    }
    rr.prototype.render = _c.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error(f(409));
      var l = t.current, a = Zt();
      Uh(l, a, e, t, null, null);
    }, rr.prototype.unmount = _c.prototype.unmount = function() {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Uh(e.current, 2, null, e, null, null), Gi(), t[P] = null;
      }
    };
    function rr(e) {
      this._internalRoot = e;
    }
    rr.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = X();
        e = {
          blockedOn: null,
          target: e,
          priority: t
        };
        for (var l = 0; l < va.length && t !== 0 && t < va[l].priority; l++) ;
        va.splice(l, 0, e), l === 0 && Bh(e);
      }
    };
    var Gh = r.version;
    if (Gh !== "19.2.4") throw Error(f(527, Gh, "19.2.4"));
    V.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0) throw typeof e.render == "function" ? Error(f(188)) : (e = Object.keys(e).join(","), Error(f(268, e)));
      return e = y(t), e = e !== null ? M(e) : null, e = e === null ? null : e.stateNode, e;
    };
    var b0 = {
      bundleType: 0,
      version: "19.2.4",
      rendererPackageName: "react-dom",
      currentDispatcherRef: U,
      reconcilerVersion: "19.2.4"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var fr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!fr.isDisabled && fr.supportsFiber) try {
        zl = fr.inject(b0), _t = fr;
      } catch {
      }
    }
    return Uu.createRoot = function(e, t) {
      if (!s(e)) throw Error(f(299));
      var l = false, a = "", n = Fs, i = $s, c = Ws;
      return t != null && (t.unstable_strictMode === true && (l = true), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (i = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = _h(e, 1, false, null, null, l, a, null, n, i, c, qh), e[P] = t.current, oc(e), new _c(t);
    }, Uu.hydrateRoot = function(e, t, l) {
      if (!s(e)) throw Error(f(299));
      var a = false, n = "", i = Fs, c = $s, h = Ws, p = null;
      return l != null && (l.unstable_strictMode === true && (a = true), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (i = l.onUncaughtError), l.onCaughtError !== void 0 && (c = l.onCaughtError), l.onRecoverableError !== void 0 && (h = l.onRecoverableError), l.formState !== void 0 && (p = l.formState)), t = _h(e, 1, true, t, l ?? null, a, n, p, i, c, h, qh), t.context = Ch(null), l = t.current, a = Zt(), a = z(a), n = ta(a), n.callback = null, la(l, n, a), l = a, t.current.lanes = l, ml(t, l), Sl(t), e[P] = t.current, oc(e), new rr(t);
    }, Uu.version = "19.2.4", Uu;
  }
  var kh;
  function U0() {
    if (kh) return xc.exports;
    kh = 1;
    function u() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (r) {
        console.error(r);
      }
    }
    return u(), xc.exports = C0(), xc.exports;
  }
  Pp = U0();
  var _m = (u) => {
    throw TypeError(u);
  }, x0 = (u, r, o) => r.has(u) || _m("Cannot " + o), wc = (u, r, o) => (x0(u, r, "read from private field"), o ? o.call(u) : r.get(u)), N0 = (u, r, o) => r.has(u) ? _m("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(u) : r.set(u, o), Ph = "popstate";
  function Ih(u) {
    return typeof u == "object" && u != null && "pathname" in u && "search" in u && "hash" in u && "state" in u && "key" in u;
  }
  function H0(u = {}) {
    function r(f, s) {
      var _a;
      let d = (_a = s.state) == null ? void 0 : _a.masked, { pathname: m, search: g, hash: v } = d || f.location;
      return wn("", {
        pathname: m,
        search: g,
        hash: v
      }, s.state && s.state.usr || null, s.state && s.state.key || "default", d ? {
        pathname: f.location.pathname,
        search: f.location.search,
        hash: f.location.hash
      } : void 0);
    }
    function o(f, s) {
      return typeof s == "string" ? s : dl(s);
    }
    return Cm(r, o, null, u);
  }
  function L0(u = {}) {
    function r(s, d) {
      let { pathname: m = "/", search: g = "", hash: v = "" } = hl(s.location.hash.substring(1));
      return !m.startsWith("/") && !m.startsWith(".") && (m = "/" + m), wn("", {
        pathname: m,
        search: g,
        hash: v
      }, d.state && d.state.usr || null, d.state && d.state.key || "default");
    }
    function o(s, d) {
      let m = s.document.querySelector("base"), g = "";
      if (m && m.getAttribute("href")) {
        let v = s.location.href, y = v.indexOf("#");
        g = y === -1 ? v : v.slice(0, y);
      }
      return g + "#" + (typeof d == "string" ? d : dl(d));
    }
    function f(s, d) {
      rt(s.pathname.charAt(0) === "/", `relative pathnames are not supported in hash history.push(${JSON.stringify(d)})`);
    }
    return Cm(r, o, f, u);
  }
  function pe(u, r) {
    if (u === false || u === null || typeof u > "u") throw new Error(r);
  }
  function rt(u, r) {
    if (!u) {
      typeof console < "u" && console.warn(r);
      try {
        throw new Error(r);
      } catch {
      }
    }
  }
  function w0() {
    return Math.random().toString(36).substring(2, 10);
  }
  function em(u, r) {
    return {
      usr: u.state,
      key: u.key,
      idx: r,
      masked: u.unstable_mask ? {
        pathname: u.pathname,
        search: u.search,
        hash: u.hash
      } : void 0
    };
  }
  function wn(u, r, o = null, f, s) {
    return {
      pathname: typeof u == "string" ? u : u.pathname,
      search: "",
      hash: "",
      ...typeof r == "string" ? hl(r) : r,
      state: o,
      key: r && r.key || f || w0(),
      unstable_mask: s
    };
  }
  function dl({ pathname: u = "/", search: r = "", hash: o = "" }) {
    return r && r !== "?" && (u += r.charAt(0) === "?" ? r : "?" + r), o && o !== "#" && (u += o.charAt(0) === "#" ? o : "#" + o), u;
  }
  function hl(u) {
    let r = {};
    if (u) {
      let o = u.indexOf("#");
      o >= 0 && (r.hash = u.substring(o), u = u.substring(0, o));
      let f = u.indexOf("?");
      f >= 0 && (r.search = u.substring(f), u = u.substring(0, f)), u && (r.pathname = u);
    }
    return r;
  }
  function Cm(u, r, o, f = {}) {
    let { window: s = document.defaultView, v5Compat: d = false } = f, m = s.history, g = "POP", v = null, y = M();
    y == null && (y = 0, m.replaceState({
      ...m.state,
      idx: y
    }, ""));
    function M() {
      return (m.state || {
        idx: null
      }).idx;
    }
    function S() {
      g = "POP";
      let q = M(), $ = q == null ? null : q - y;
      y = q, v && v({
        action: g,
        location: Q.location,
        delta: $
      });
    }
    function N(q, $) {
      g = "PUSH";
      let W = Ih(q) ? q : wn(Q.location, q, $);
      o && o(W, q), y = M() + 1;
      let I = em(W, y), Re = Q.createHref(W.unstable_mask || W);
      try {
        m.pushState(I, "", Re);
      } catch (ye) {
        if (ye instanceof DOMException && ye.name === "DataCloneError") throw ye;
        s.location.assign(Re);
      }
      d && v && v({
        action: g,
        location: Q.location,
        delta: 1
      });
    }
    function L(q, $) {
      g = "REPLACE";
      let W = Ih(q) ? q : wn(Q.location, q, $);
      o && o(W, q), y = M();
      let I = em(W, y), Re = Q.createHref(W.unstable_mask || W);
      m.replaceState(I, "", Re), d && v && v({
        action: g,
        location: Q.location,
        delta: 0
      });
    }
    function G(q) {
      return Um(q);
    }
    let Q = {
      get action() {
        return g;
      },
      get location() {
        return u(s, m);
      },
      listen(q) {
        if (v) throw new Error("A history only accepts one active listener");
        return s.addEventListener(Ph, S), v = q, () => {
          s.removeEventListener(Ph, S), v = null;
        };
      },
      createHref(q) {
        return r(s, q);
      },
      createURL: G,
      encodeLocation(q) {
        let $ = G(q);
        return {
          pathname: $.pathname,
          search: $.search,
          hash: $.hash
        };
      },
      push: N,
      replace: L,
      go(q) {
        return m.go(q);
      }
    };
    return Q;
  }
  function Um(u, r = false) {
    let o = "http://localhost";
    typeof window < "u" && (o = window.location.origin !== "null" ? window.location.origin : window.location.href), pe(o, "No window.location.(origin|href) available to create URL");
    let f = typeof u == "string" ? u : dl(u);
    return f = f.replace(/ $/, "%20"), !r && f.startsWith("//") && (f = o + f), new URL(f, o);
  }
  var Hu, tm = class {
    constructor(u) {
      if (N0(this, Hu, /* @__PURE__ */ new Map()), u) for (let [r, o] of u) this.set(r, o);
    }
    get(u) {
      if (wc(this, Hu).has(u)) return wc(this, Hu).get(u);
      if (u.defaultValue !== void 0) return u.defaultValue;
      throw new Error("No value found for context");
    }
    set(u, r) {
      wc(this, Hu).set(u, r);
    }
  };
  Hu = /* @__PURE__ */ new WeakMap();
  var B0 = /* @__PURE__ */ new Set([
    "lazy",
    "caseSensitive",
    "path",
    "id",
    "index",
    "children"
  ]);
  function j0(u) {
    return B0.has(u);
  }
  var Y0 = /* @__PURE__ */ new Set([
    "lazy",
    "caseSensitive",
    "path",
    "id",
    "index",
    "middleware",
    "children"
  ]);
  function q0(u) {
    return Y0.has(u);
  }
  function G0(u) {
    return u.index === true;
  }
  function Bu(u, r, o = [], f = {}, s = false) {
    return u.map((d, m) => {
      let g = [
        ...o,
        String(m)
      ], v = typeof d.id == "string" ? d.id : g.join("-");
      if (pe(d.index !== true || !d.children, "Cannot specify children on an index route"), pe(s || !f[v], `Found a route id collision on id "${v}".  Route id's must be globally unique within Data Router usages`), G0(d)) {
        let y = {
          ...d,
          id: v
        };
        return f[v] = lm(y, r(y)), y;
      } else {
        let y = {
          ...d,
          id: v,
          children: void 0
        };
        return f[v] = lm(y, r(y)), d.children && (y.children = Bu(d.children, r, g, f, s)), y;
      }
    });
  }
  function lm(u, r) {
    return Object.assign(u, {
      ...r,
      ...typeof r.lazy == "object" && r.lazy != null ? {
        lazy: {
          ...u.lazy,
          ...r.lazy
        }
      } : {}
    });
  }
  function pa(u, r, o = "/") {
    return Lu(u, r, o, false);
  }
  function Lu(u, r, o, f) {
    let s = typeof r == "string" ? hl(r) : r, d = jt(s.pathname || "/", o);
    if (d == null) return null;
    let m = xm(u);
    Q0(m);
    let g = null;
    for (let v = 0; g == null && v < m.length; ++v) {
      let y = eg(d);
      g = P0(m[v], y, f);
    }
    return g;
  }
  function X0(u, r) {
    let { route: o, pathname: f, params: s } = u;
    return {
      id: o.id,
      pathname: f,
      params: s,
      data: r[o.id],
      loaderData: r[o.id],
      handle: o.handle
    };
  }
  function xm(u, r = [], o = [], f = "", s = false) {
    let d = (m, g, v = s, y) => {
      let M = {
        relativePath: y === void 0 ? m.path || "" : y,
        caseSensitive: m.caseSensitive === true,
        childrenIndex: g,
        route: m
      };
      if (M.relativePath.startsWith("/")) {
        if (!M.relativePath.startsWith(f) && v) return;
        pe(M.relativePath.startsWith(f), `Absolute route path "${M.relativePath}" nested under path "${f}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`), M.relativePath = M.relativePath.slice(f.length);
      }
      let S = sl([
        f,
        M.relativePath
      ]), N = o.concat(M);
      m.children && m.children.length > 0 && (pe(m.index !== true, `Index routes must not have child routes. Please remove all child routes from route path "${S}".`), xm(m.children, r, N, S, v)), !(m.path == null && !m.index) && r.push({
        path: S,
        score: W0(S, m.index),
        routesMeta: N
      });
    };
    return u.forEach((m, g) => {
      var _a;
      if (m.path === "" || !((_a = m.path) == null ? void 0 : _a.includes("?"))) d(m, g);
      else for (let v of Nm(m.path)) d(m, g, true, v);
    }), r;
  }
  function Nm(u) {
    let r = u.split("/");
    if (r.length === 0) return [];
    let [o, ...f] = r, s = o.endsWith("?"), d = o.replace(/\?$/, "");
    if (f.length === 0) return s ? [
      d,
      ""
    ] : [
      d
    ];
    let m = Nm(f.join("/")), g = [];
    return g.push(...m.map((v) => v === "" ? d : [
      d,
      v
    ].join("/"))), s && g.push(...m), g.map((v) => u.startsWith("/") && v === "" ? "/" : v);
  }
  function Q0(u) {
    u.sort((r, o) => r.score !== o.score ? o.score - r.score : k0(r.routesMeta.map((f) => f.childrenIndex), o.routesMeta.map((f) => f.childrenIndex)));
  }
  var V0 = /^:[\w-]+$/, Z0 = 3, K0 = 2, J0 = 1, F0 = 10, $0 = -2, am = (u) => u === "*";
  function W0(u, r) {
    let o = u.split("/"), f = o.length;
    return o.some(am) && (f += $0), r && (f += K0), o.filter((s) => !am(s)).reduce((s, d) => s + (V0.test(d) ? Z0 : d === "" ? J0 : F0), f);
  }
  function k0(u, r) {
    return u.length === r.length && u.slice(0, -1).every((f, s) => f === r[s]) ? u[u.length - 1] - r[r.length - 1] : 0;
  }
  function P0(u, r, o = false) {
    let { routesMeta: f } = u, s = {}, d = "/", m = [];
    for (let g = 0; g < f.length; ++g) {
      let v = f[g], y = g === f.length - 1, M = d === "/" ? r : r.slice(d.length) || "/", S = yr({
        path: v.relativePath,
        caseSensitive: v.caseSensitive,
        end: y
      }, M), N = v.route;
      if (!S && y && o && !f[f.length - 1].route.index && (S = yr({
        path: v.relativePath,
        caseSensitive: v.caseSensitive,
        end: false
      }, M)), !S) return null;
      Object.assign(s, S.params), m.push({
        params: s,
        pathname: sl([
          d,
          S.pathname
        ]),
        pathnameBase: ag(sl([
          d,
          S.pathnameBase
        ])),
        route: N
      }), S.pathnameBase !== "/" && (d = sl([
        d,
        S.pathnameBase
      ]));
    }
    return m;
  }
  function yr(u, r) {
    typeof u == "string" && (u = {
      path: u,
      caseSensitive: false,
      end: true
    });
    let [o, f] = I0(u.path, u.caseSensitive, u.end), s = r.match(o);
    if (!s) return null;
    let d = s[0], m = d.replace(/(.)\/+$/, "$1"), g = s.slice(1);
    return {
      params: f.reduce((y, { paramName: M, isOptional: S }, N) => {
        if (M === "*") {
          let G = g[N] || "";
          m = d.slice(0, d.length - G.length).replace(/(.)\/+$/, "$1");
        }
        const L = g[N];
        return S && !L ? y[M] = void 0 : y[M] = (L || "").replace(/%2F/g, "/"), y;
      }, {}),
      pathname: d,
      pathnameBase: m,
      pattern: u
    };
  }
  function I0(u, r = false, o = true) {
    rt(u === "*" || !u.endsWith("*") || u.endsWith("/*"), `Route path "${u}" will be treated as if it were "${u.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${u.replace(/\*$/, "/*")}".`);
    let f = [], s = "^" + u.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (m, g, v, y, M) => {
      if (f.push({
        paramName: g,
        isOptional: v != null
      }), v) {
        let S = M.charAt(y + m.length);
        return S && S !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
    return u.endsWith("*") ? (f.push({
      paramName: "*"
    }), s += u === "*" || u === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : o ? s += "\\/*$" : u !== "" && u !== "/" && (s += "(?:(?=\\/|$))"), [
      new RegExp(s, r ? void 0 : "i"),
      f
    ];
  }
  function eg(u) {
    try {
      return u.split("/").map((r) => decodeURIComponent(r).replace(/\//g, "%2F")).join("/");
    } catch (r) {
      return rt(false, `The URL path "${u}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`), u;
    }
  }
  function jt(u, r) {
    if (r === "/") return u;
    if (!u.toLowerCase().startsWith(r.toLowerCase())) return null;
    let o = r.endsWith("/") ? r.length - 1 : r.length, f = u.charAt(o);
    return f && f !== "/" ? null : u.slice(o) || "/";
  }
  function tg({ basename: u, pathname: r }) {
    return r === "/" ? u : sl([
      u,
      r
    ]);
  }
  var Hm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Jc = (u) => Hm.test(u);
  function lg(u, r = "/") {
    let { pathname: o, search: f = "", hash: s = "" } = typeof u == "string" ? hl(u) : u, d;
    return o ? (o = o.replace(/\/\/+/g, "/"), o.startsWith("/") ? d = nm(o.substring(1), "/") : d = nm(o, r)) : d = r, {
      pathname: d,
      search: ng(f),
      hash: ug(s)
    };
  }
  function nm(u, r) {
    let o = r.replace(/\/+$/, "").split("/");
    return u.split("/").forEach((s) => {
      s === ".." ? o.length > 1 && o.pop() : s !== "." && o.push(s);
    }), o.length > 1 ? o.join("/") : "/";
  }
  function Bc(u, r, o, f) {
    return `Cannot include a '${u}' character in a manually specified \`to.${r}\` field [${JSON.stringify(f)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
  }
  function Lm(u) {
    return u.filter((r, o) => o === 0 || r.route.path && r.route.path.length > 0);
  }
  function Fc(u) {
    let r = Lm(u);
    return r.map((o, f) => f === r.length - 1 ? o.pathname : o.pathnameBase);
  }
  function vr(u, r, o, f = false) {
    let s;
    typeof u == "string" ? s = hl(u) : (s = {
      ...u
    }, pe(!s.pathname || !s.pathname.includes("?"), Bc("?", "pathname", "search", s)), pe(!s.pathname || !s.pathname.includes("#"), Bc("#", "pathname", "hash", s)), pe(!s.search || !s.search.includes("#"), Bc("#", "search", "hash", s)));
    let d = u === "" || s.pathname === "", m = d ? "/" : s.pathname, g;
    if (m == null) g = o;
    else {
      let S = r.length - 1;
      if (!f && m.startsWith("..")) {
        let N = m.split("/");
        for (; N[0] === ".."; ) N.shift(), S -= 1;
        s.pathname = N.join("/");
      }
      g = S >= 0 ? r[S] : "/";
    }
    let v = lg(s, g), y = m && m !== "/" && m.endsWith("/"), M = (d || m === ".") && o.endsWith("/");
    return !v.pathname.endsWith("/") && (y || M) && (v.pathname += "/"), v;
  }
  var sl = (u) => u.join("/").replace(/\/\/+/g, "/"), ag = (u) => u.replace(/\/+$/, "").replace(/^\/*/, "/"), ng = (u) => !u || u === "?" ? "" : u.startsWith("?") ? u : "?" + u, ug = (u) => !u || u === "#" ? "" : u.startsWith("#") ? u : "#" + u, Yu = class {
    constructor(u, r, o, f = false) {
      this.status = u, this.statusText = r || "", this.internal = f, o instanceof Error ? (this.data = o.toString(), this.error = o) : this.data = o;
    }
  };
  function ju(u) {
    return u != null && typeof u.status == "number" && typeof u.statusText == "string" && typeof u.internal == "boolean" && "data" in u;
  }
  function qu(u) {
    return u.map((r) => r.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/";
  }
  var wm = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
  function Bm(u, r) {
    let o = u;
    if (typeof o != "string" || !Hm.test(o)) return {
      absoluteURL: void 0,
      isExternal: false,
      to: o
    };
    let f = o, s = false;
    if (wm) try {
      let d = new URL(window.location.href), m = o.startsWith("//") ? new URL(d.protocol + o) : new URL(o), g = jt(m.pathname, r);
      m.origin === d.origin && g != null ? o = g + m.search + m.hash : s = true;
    } catch {
      rt(false, `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`);
    }
    return {
      absoluteURL: f,
      isExternal: s,
      to: o
    };
  }
  var Sa = /* @__PURE__ */ Symbol("Uninstrumented");
  function ig(u, r) {
    let o = {
      lazy: [],
      "lazy.loader": [],
      "lazy.action": [],
      "lazy.middleware": [],
      middleware: [],
      loader: [],
      action: []
    };
    u.forEach((s) => s({
      id: r.id,
      index: r.index,
      path: r.path,
      instrument(d) {
        let m = Object.keys(o);
        for (let g of m) d[g] && o[g].push(d[g]);
      }
    }));
    let f = {};
    if (typeof r.lazy == "function" && o.lazy.length > 0) {
      let s = Hn(o.lazy, r.lazy, () => {
      });
      s && (f.lazy = s);
    }
    if (typeof r.lazy == "object") {
      let s = r.lazy;
      [
        "middleware",
        "loader",
        "action"
      ].forEach((d) => {
        let m = s[d], g = o[`lazy.${d}`];
        if (typeof m == "function" && g.length > 0) {
          let v = Hn(g, m, () => {
          });
          v && (f.lazy = Object.assign(f.lazy || {}, {
            [d]: v
          }));
        }
      });
    }
    return [
      "loader",
      "action"
    ].forEach((s) => {
      let d = r[s];
      if (typeof d == "function" && o[s].length > 0) {
        let m = d[Sa] ?? d, g = Hn(o[s], m, (...v) => um(v[0]));
        g && (s === "loader" && m.hydrate === true && (g.hydrate = true), g[Sa] = m, f[s] = g);
      }
    }), r.middleware && r.middleware.length > 0 && o.middleware.length > 0 && (f.middleware = r.middleware.map((s) => {
      let d = s[Sa] ?? s, m = Hn(o.middleware, d, (...g) => um(g[0]));
      return m ? (m[Sa] = d, m) : s;
    })), f;
  }
  function rg(u, r) {
    let o = {
      navigate: [],
      fetch: []
    };
    if (r.forEach((f) => f({
      instrument(s) {
        let d = Object.keys(s);
        for (let m of d) s[m] && o[m].push(s[m]);
      }
    })), o.navigate.length > 0) {
      let f = u.navigate[Sa] ?? u.navigate, s = Hn(o.navigate, f, (...d) => {
        let [m, g] = d;
        return {
          to: typeof m == "number" || typeof m == "string" ? m : m ? dl(m) : ".",
          ...im(u, g ?? {})
        };
      });
      s && (s[Sa] = f, u.navigate = s);
    }
    if (o.fetch.length > 0) {
      let f = u.fetch[Sa] ?? u.fetch, s = Hn(o.fetch, f, (...d) => {
        let [m, , g, v] = d;
        return {
          href: g ?? ".",
          fetcherKey: m,
          ...im(u, v ?? {})
        };
      });
      s && (s[Sa] = f, u.fetch = s);
    }
    return u;
  }
  function Hn(u, r, o) {
    return u.length === 0 ? null : async (...f) => {
      let s = await jm(u, o(...f), () => r(...f), u.length - 1);
      if (s.type === "error") throw s.value;
      return s.value;
    };
  }
  async function jm(u, r, o, f) {
    let s = u[f], d;
    if (s) {
      let m, g = async () => (m ? console.error("You cannot call instrumented handlers more than once") : m = jm(u, r, o, f - 1), d = await m, pe(d, "Expected a result"), d.type === "error" && d.value instanceof Error ? {
        status: "error",
        error: d.value
      } : {
        status: "success",
        error: void 0
      });
      try {
        await s(g, r);
      } catch (v) {
        console.error("An instrumentation function threw an error:", v);
      }
      m || await g(), await m;
    } else try {
      d = {
        type: "success",
        value: await o()
      };
    } catch (m) {
      d = {
        type: "error",
        value: m
      };
    }
    return d || {
      type: "error",
      value: new Error("No result assigned in instrumentation chain.")
    };
  }
  function um(u) {
    let { request: r, context: o, params: f, unstable_pattern: s } = u;
    return {
      request: fg(r),
      params: {
        ...f
      },
      unstable_pattern: s,
      context: cg(o)
    };
  }
  function im(u, r) {
    return {
      currentUrl: dl(u.state.location),
      ..."formMethod" in r ? {
        formMethod: r.formMethod
      } : {},
      ..."formEncType" in r ? {
        formEncType: r.formEncType
      } : {},
      ..."formData" in r ? {
        formData: r.formData
      } : {},
      ..."body" in r ? {
        body: r.body
      } : {}
    };
  }
  function fg(u) {
    return {
      method: u.method,
      url: u.url,
      headers: {
        get: (...r) => u.headers.get(...r)
      }
    };
  }
  function cg(u) {
    if (sg(u)) {
      let r = {
        ...u
      };
      return Object.freeze(r), r;
    } else return {
      get: (r) => u.get(r)
    };
  }
  var og = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
  function sg(u) {
    if (u === null || typeof u != "object") return false;
    const r = Object.getPrototypeOf(u);
    return r === Object.prototype || r === null || Object.getOwnPropertyNames(r).sort().join("\0") === og;
  }
  var Ym = [
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
  ], dg = new Set(Ym), hg = [
    "GET",
    ...Ym
  ], mg = new Set(hg), qm = /* @__PURE__ */ new Set([
    301,
    302,
    303,
    307,
    308
  ]), yg = /* @__PURE__ */ new Set([
    307,
    308
  ]), jc = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  }, vg = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  }, xn = {
    state: "unblocked",
    proceed: void 0,
    reset: void 0,
    location: void 0
  }, gg = (u) => ({
    hasErrorBoundary: !!u.hasErrorBoundary
  }), Gm = "remix-router-transitions", Xm = /* @__PURE__ */ Symbol("ResetLoaderData");
  function Qm(u) {
    const r = u.window ? u.window : typeof window < "u" ? window : void 0, o = typeof r < "u" && typeof r.document < "u" && typeof r.document.createElement < "u";
    pe(u.routes.length > 0, "You must provide a non-empty routes array to createRouter");
    let f = u.hydrationRouteProperties || [], s = u.mapRouteProperties || gg, d = s;
    if (u.unstable_instrumentations) {
      let b = u.unstable_instrumentations;
      d = (z) => ({
        ...s(z),
        ...ig(b.map((C) => C.route).filter(Boolean), z)
      });
    }
    let m = {}, g = Bu(u.routes, d, void 0, m), v, y = u.basename || "/";
    y.startsWith("/") || (y = `/${y}`);
    let M = u.dataStrategy || Rg, S = {
      ...u.future
    }, N = null, L = /* @__PURE__ */ new Set(), G = null, Q = null, q = null, $ = u.hydrationData != null, W = pa(g, u.history.location, y), I = false, Re = null, ye, be;
    if (W == null && !u.patchRoutesOnNavigation) {
      let b = al(404, {
        pathname: u.history.location.pathname
      }), { matches: z, route: C } = cr(g);
      ye = true, be = !ye, W = z, Re = {
        [C.id]: b
      };
    } else if (W && !u.hydrationData && Jl(W, g, u.history.location.pathname).active && (W = null), W) if (W.some((b) => b.route.lazy)) ye = false, be = !ye;
    else if (!W.some((b) => $c(b.route))) ye = true, be = !ye;
    else {
      let b = u.hydrationData ? u.hydrationData.loaderData : null, z = u.hydrationData ? u.hydrationData.errors : null, C = W;
      if (z) {
        let X = W.findIndex((Z) => z[Z.route.id] !== void 0);
        C = C.slice(0, X + 1);
      }
      be = false, ye = C.every((X) => {
        let Z = Vm(X.route, b, z);
        return be = be || Z.renderFallback, !Z.shouldLoad;
      });
    }
    else {
      ye = false, be = !ye, W = [];
      let b = Jl(null, g, u.history.location.pathname);
      b.active && b.matches && (I = true, W = b.matches);
    }
    let ue, D = {
      historyAction: u.history.action,
      location: u.history.location,
      matches: W,
      initialized: ye,
      renderFallback: be,
      navigation: jc,
      restoreScrollPosition: u.hydrationData != null ? false : null,
      preventScrollReset: false,
      revalidation: "idle",
      loaderData: u.hydrationData && u.hydrationData.loaderData || {},
      actionData: u.hydrationData && u.hydrationData.actionData || null,
      errors: u.hydrationData && u.hydrationData.errors || Re,
      fetchers: /* @__PURE__ */ new Map(),
      blockers: /* @__PURE__ */ new Map()
    }, ze = "POP", Ue = null, Ve = false, me, et = false, xe = /* @__PURE__ */ new Map(), he = null, U = false, V = false, le = /* @__PURE__ */ new Set(), ae = /* @__PURE__ */ new Map(), Se = 0, E = -1, B = /* @__PURE__ */ new Map(), K = /* @__PURE__ */ new Set(), F = /* @__PURE__ */ new Map(), oe = /* @__PURE__ */ new Map(), de = /* @__PURE__ */ new Set(), Te = /* @__PURE__ */ new Map(), ft, Ze = null;
    function Ra() {
      if (N = u.history.listen(({ action: b, location: z, delta: C }) => {
        if (ft) {
          ft(), ft = void 0;
          return;
        }
        rt(Te.size === 0 || C != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
        let X = Ta({
          currentLocation: D.location,
          nextLocation: z,
          historyAction: b
        });
        if (X && C != null) {
          let Z = new Promise((ee) => {
            ft = ee;
          });
          u.history.go(C * -1), Tl(X, {
            state: "blocked",
            location: z,
            proceed() {
              Tl(X, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: z
              }), Z.then(() => u.history.go(C));
            },
            reset() {
              let ee = new Map(D.blockers);
              ee.set(X, xn), mt({
                blockers: ee
              });
            }
          }), Ue == null ? void 0 : Ue.resolve(), Ue = null;
          return;
        }
        return El(b, z);
      }), o) {
        qg(r, xe);
        let b = () => Gg(r, xe);
        r.addEventListener("pagehide", b), he = () => r.removeEventListener("pagehide", b);
      }
      return D.initialized || El("POP", D.location, {
        initialHydration: true
      }), ue;
    }
    function Za() {
      N && N(), he && he(), L.clear(), me && me.abort(), D.fetchers.forEach((b, z) => zl(z)), D.blockers.forEach((b, z) => za(z));
    }
    function Bn(b) {
      return L.add(b), () => L.delete(b);
    }
    function mt(b, z = {}) {
      b.matches && (b.matches = b.matches.map((Z) => {
        let ee = m[Z.route.id], J = Z.route;
        return J.element !== ee.element || J.errorElement !== ee.errorElement || J.hydrateFallbackElement !== ee.hydrateFallbackElement ? {
          ...Z,
          route: ee
        } : Z;
      })), D = {
        ...D,
        ...b
      };
      let C = [], X = [];
      D.fetchers.forEach((Z, ee) => {
        Z.state === "idle" && (de.has(ee) ? C.push(ee) : X.push(ee));
      }), de.forEach((Z) => {
        !D.fetchers.has(Z) && !ae.has(Z) && C.push(Z);
      }), [
        ...L
      ].forEach((Z) => Z(D, {
        deletedFetchers: C,
        newErrors: b.errors ?? null,
        viewTransitionOpts: z.viewTransitionOpts,
        flushSync: z.flushSync === true
      })), C.forEach((Z) => zl(Z)), X.forEach((Z) => D.fetchers.delete(Z));
    }
    function Ut(b, z, { flushSync: C } = {}) {
      var _a, _b;
      let X = D.actionData != null && D.navigation.formMethod != null && At(D.navigation.formMethod) && D.navigation.state === "loading" && ((_a = b.state) == null ? void 0 : _a._isRedirect) !== true, Z;
      z.actionData ? Object.keys(z.actionData).length > 0 ? Z = z.actionData : Z = null : X ? Z = D.actionData : Z = null;
      let ee = z.loaderData ? vm(D.loaderData, z.loaderData, z.matches || [], z.errors) : D.loaderData, J = D.blockers;
      J.size > 0 && (J = new Map(J), J.forEach((ce, ie) => J.set(ie, xn)));
      let k = U ? false : Xn(b, z.matches || D.matches), P = Ve === true || D.navigation.formMethod != null && At(D.navigation.formMethod) && ((_b = b.state) == null ? void 0 : _b._isRedirect) !== true;
      v && (g = v, v = void 0), U || ze === "POP" || (ze === "PUSH" ? u.history.push(b, b.state) : ze === "REPLACE" && u.history.replace(b, b.state));
      let re;
      if (ze === "POP") {
        let ce = xe.get(D.location.pathname);
        ce && ce.has(b.pathname) ? re = {
          currentLocation: D.location,
          nextLocation: b
        } : xe.has(b.pathname) && (re = {
          currentLocation: b,
          nextLocation: D.location
        });
      } else if (et) {
        let ce = xe.get(D.location.pathname);
        ce ? ce.add(b.pathname) : (ce = /* @__PURE__ */ new Set([
          b.pathname
        ]), xe.set(D.location.pathname, ce)), re = {
          currentLocation: D.location,
          nextLocation: b
        };
      }
      mt({
        ...z,
        actionData: Z,
        loaderData: ee,
        historyAction: ze,
        location: b,
        initialized: true,
        renderFallback: false,
        navigation: jc,
        revalidation: "idle",
        restoreScrollPosition: k,
        preventScrollReset: P,
        blockers: J
      }, {
        viewTransitionOpts: re,
        flushSync: C === true
      }), ze = "POP", Ve = false, et = false, U = false, V = false, Ue == null ? void 0 : Ue.resolve(), Ue = null, Ze == null ? void 0 : Ze.resolve(), Ze = null;
    }
    async function Ka(b, z) {
      if (Ue == null ? void 0 : Ue.resolve(), Ue = null, typeof b == "number") {
        Ue || (Ue = Sm());
        let Ke = Ue.promise;
        return u.history.go(b), Ke;
      }
      let C = Xc(D.location, D.matches, y, b, z == null ? void 0 : z.fromRouteId, z == null ? void 0 : z.relative), { path: X, submission: Z, error: ee } = rm(false, C, z), J;
      (z == null ? void 0 : z.unstable_mask) && (J = {
        pathname: "",
        search: "",
        hash: "",
        ...typeof z.unstable_mask == "string" ? hl(z.unstable_mask) : {
          ...D.location.unstable_mask,
          ...z.unstable_mask
        }
      });
      let k = D.location, P = wn(k, X, z && z.state, void 0, J);
      P = {
        ...P,
        ...u.history.encodeLocation(P)
      };
      let re = z && z.replace != null ? z.replace : void 0, ce = "PUSH";
      re === true ? ce = "REPLACE" : re === false || Z != null && At(Z.formMethod) && Z.formAction === D.location.pathname + D.location.search && (ce = "REPLACE");
      let ie = z && "preventScrollReset" in z ? z.preventScrollReset === true : void 0, Le = (z && z.flushSync) === true, Me = Ta({
        currentLocation: k,
        nextLocation: P,
        historyAction: ce
      });
      if (Me) {
        Tl(Me, {
          state: "blocked",
          location: P,
          proceed() {
            Tl(Me, {
              state: "proceeding",
              proceed: void 0,
              reset: void 0,
              location: P
            }), Ka(b, z);
          },
          reset() {
            let Ke = new Map(D.blockers);
            Ke.set(Me, xn), mt({
              blockers: Ke
            });
          }
        });
        return;
      }
      await El(ce, P, {
        submission: Z,
        pendingError: ee,
        preventScrollReset: ie,
        replace: z && z.replace,
        enableViewTransition: z && z.viewTransition,
        flushSync: Le,
        callSiteDefaultShouldRevalidate: z && z.unstable_defaultShouldRevalidate
      });
    }
    function jn() {
      Ze || (Ze = Sm()), Zl(), mt({
        revalidation: "loading"
      });
      let b = Ze.promise;
      return D.navigation.state === "submitting" ? b : D.navigation.state === "idle" ? (El(D.historyAction, D.location, {
        startUninterruptedRevalidation: true
      }), b) : (El(ze || D.historyAction, D.navigation.location, {
        overrideNavigation: D.navigation,
        enableViewTransition: et === true
      }), b);
    }
    async function El(b, z, C) {
      me && me.abort(), me = null, ze = b, U = (C && C.startUninterruptedRevalidation) === true, Rr(D.location, D.matches), Ve = (C && C.preventScrollReset) === true, et = (C && C.enableViewTransition) === true;
      let X = v || g, Z = C && C.overrideNavigation, ee = (C == null ? void 0 : C.initialHydration) && D.matches && D.matches.length > 0 && !I ? D.matches : pa(X, z, y), J = (C && C.flushSync) === true;
      if (ee && D.initialized && !V && Cg(D.location, z) && !(C && C.submission && At(C.submission.formMethod))) {
        Ut(z, {
          matches: ee
        }, {
          flushSync: J
        });
        return;
      }
      let k = Jl(ee, X, z.pathname);
      if (k.active && k.matches && (ee = k.matches), !ee) {
        let { error: $e, notFoundMatches: tt, route: He } = il(z.pathname);
        Ut(z, {
          matches: tt,
          loaderData: {},
          errors: {
            [He.id]: $e
          }
        }, {
          flushSync: J
        });
        return;
      }
      me = new AbortController();
      let P = Nn(u.history, z, me.signal, C && C.submission), re = u.getContext ? await u.getContext() : new tm(), ce;
      if (C && C.pendingError) ce = [
        ba(ee).route.id,
        {
          type: "error",
          error: C.pendingError
        }
      ];
      else if (C && C.submission && At(C.submission.formMethod)) {
        let $e = await Zu(P, z, C.submission, ee, re, k.active, C && C.initialHydration === true, {
          replace: C.replace,
          flushSync: J
        });
        if ($e.shortCircuited) return;
        if ($e.pendingActionResult) {
          let [tt, He] = $e.pendingActionResult;
          if (Kt(He) && ju(He.error) && He.error.status === 404) {
            me = null, Ut(z, {
              matches: $e.matches,
              loaderData: {},
              errors: {
                [tt]: He.error
              }
            });
            return;
          }
        }
        ee = $e.matches || ee, ce = $e.pendingActionResult, Z = Yc(z, C.submission), J = false, k.active = false, P = Nn(u.history, P.url, P.signal);
      }
      let { shortCircuited: ie, matches: Le, loaderData: Me, errors: Ke } = await Yn(P, z, ee, re, k.active, Z, C && C.submission, C && C.fetcherSubmission, C && C.replace, C && C.initialHydration === true, J, ce, C && C.callSiteDefaultShouldRevalidate);
      ie || (me = null, Ut(z, {
        matches: Le || ee,
        ...gm(ce),
        loaderData: Me,
        errors: Ke
      }));
    }
    async function Zu(b, z, C, X, Z, ee, J, k = {}) {
      Zl();
      let P = jg(z, C);
      if (mt({
        navigation: P
      }, {
        flushSync: k.flushSync === true
      }), ee) {
        let ie = await ml(X, z.pathname, b.signal);
        if (ie.type === "aborted") return {
          shortCircuited: true
        };
        if (ie.type === "error") {
          if (ie.partialMatches.length === 0) {
            let { matches: Me, route: Ke } = cr(g);
            return {
              matches: Me,
              pendingActionResult: [
                Ke.id,
                {
                  type: "error",
                  error: ie.error
                }
              ]
            };
          }
          let Le = ba(ie.partialMatches).route.id;
          return {
            matches: ie.partialMatches,
            pendingActionResult: [
              Le,
              {
                type: "error",
                error: ie.error
              }
            ]
          };
        } else if (ie.matches) X = ie.matches;
        else {
          let { notFoundMatches: Le, error: Me, route: Ke } = il(z.pathname);
          return {
            matches: Le,
            pendingActionResult: [
              Ke.id,
              {
                type: "error",
                error: Me
              }
            ]
          };
        }
      }
      let re, ce = dr(X, z);
      if (!ce.route.action && !ce.route.lazy) re = {
        type: "error",
        error: al(405, {
          method: b.method,
          pathname: z.pathname,
          routeId: ce.route.id
        })
      };
      else {
        let ie = Ln(d, m, b, X, ce, J ? [] : f, Z), Le = await Vl(b, ie, Z, null);
        if (re = Le[ce.route.id], !re) {
          for (let Me of X) if (Le[Me.route.id]) {
            re = Le[Me.route.id];
            break;
          }
        }
        if (b.signal.aborted) return {
          shortCircuited: true
        };
      }
      if (Qa(re)) {
        let ie;
        return k && k.replace != null ? ie = k.replace : ie = hm(re.response.headers.get("Location"), new URL(b.url), y, u.history) === D.location.pathname + D.location.search, await Rl(b, re, true, {
          submission: C,
          replace: ie
        }), {
          shortCircuited: true
        };
      }
      if (Kt(re)) {
        let ie = ba(X, ce.route.id);
        return (k && k.replace) !== true && (ze = "PUSH"), {
          matches: X,
          pendingActionResult: [
            ie.route.id,
            re,
            ce.route.id
          ]
        };
      }
      return {
        matches: X,
        pendingActionResult: [
          ce.route.id,
          re
        ]
      };
    }
    async function Yn(b, z, C, X, Z, ee, J, k, P, re, ce, ie, Le) {
      let Me = ee || Yc(z, J), Ke = J || k || bm(Me), $e = !U && !re;
      if (Z) {
        if ($e) {
          let nt = Ja(ie);
          mt({
            navigation: Me,
            ...nt !== void 0 ? {
              actionData: nt
            } : {}
          }, {
            flushSync: ce
          });
        }
        let De = await ml(C, z.pathname, b.signal);
        if (De.type === "aborted") return {
          shortCircuited: true
        };
        if (De.type === "error") {
          if (De.partialMatches.length === 0) {
            let { matches: Mt, route: ct } = cr(g);
            return {
              matches: Mt,
              loaderData: {},
              errors: {
                [ct.id]: De.error
              }
            };
          }
          let nt = ba(De.partialMatches).route.id;
          return {
            matches: De.partialMatches,
            loaderData: {},
            errors: {
              [nt]: De.error
            }
          };
        } else if (De.matches) C = De.matches;
        else {
          let { error: nt, notFoundMatches: Mt, route: ct } = il(z.pathname);
          return {
            matches: Mt,
            loaderData: {},
            errors: {
              [ct.id]: nt
            }
          };
        }
      }
      let tt = v || g, { dsMatches: He, revalidatingFetchers: yt } = fm(b, X, d, m, u.history, D, C, Ke, z, re ? [] : f, re === true, V, le, de, F, K, tt, y, u.patchRoutesOnNavigation != null, ie, Le);
      if (E = ++Se, !u.dataStrategy && !He.some((De) => De.shouldLoad) && !He.some((De) => De.route.middleware && De.route.middleware.length > 0) && yt.length === 0) {
        let De = Ju();
        return Ut(z, {
          matches: C,
          loaderData: {},
          errors: ie && Kt(ie[1]) ? {
            [ie[0]]: ie[1].error
          } : null,
          ...gm(ie),
          ...De ? {
            fetchers: new Map(D.fetchers)
          } : {}
        }, {
          flushSync: ce
        }), {
          shortCircuited: true
        };
      }
      if ($e) {
        let De = {};
        if (!Z) {
          De.navigation = Me;
          let nt = Ja(ie);
          nt !== void 0 && (De.actionData = nt);
        }
        yt.length > 0 && (De.fetchers = qn(yt)), mt(De, {
          flushSync: ce
        });
      }
      yt.forEach((De) => {
        gt(De.key), De.controller && ae.set(De.key, De.controller);
      });
      let Fe = () => yt.forEach((De) => gt(De.key));
      me && me.signal.addEventListener("abort", Fe);
      let { loaderResults: Fl, fetcherResults: rl } = await Gn(He, yt, b, X);
      if (b.signal.aborted) return {
        shortCircuited: true
      };
      me && me.signal.removeEventListener("abort", Fe), yt.forEach((De) => ae.delete(De.key));
      let pt = or(Fl);
      if (pt) return await Rl(b, pt.result, true, {
        replace: P
      }), {
        shortCircuited: true
      };
      if (pt = or(rl), pt) return K.add(pt.key), await Rl(b, pt.result, true, {
        replace: P
      }), {
        shortCircuited: true
      };
      let { loaderData: yl, errors: Ma } = ym(D, C, Fl, ie, yt, rl);
      re && D.errors && (Ma = {
        ...D.errors,
        ...Ma
      });
      let vl = Ju(), Da = Fu(E), $a = vl || Da || yt.length > 0;
      return {
        matches: C,
        loaderData: yl,
        errors: Ma,
        ...$a ? {
          fetchers: new Map(D.fetchers)
        } : {}
      };
    }
    function Ja(b) {
      if (b && !Kt(b[1])) return {
        [b[0]]: b[1].data
      };
      if (D.actionData) return Object.keys(D.actionData).length === 0 ? null : D.actionData;
    }
    function qn(b) {
      return b.forEach((z) => {
        let C = D.fetchers.get(z.key), X = xu(void 0, C ? C.data : void 0);
        D.fetchers.set(z.key, X);
      }), new Map(D.fetchers);
    }
    async function pr(b, z, C, X) {
      gt(b);
      let Z = (X && X.flushSync) === true, ee = v || g, J = Xc(D.location, D.matches, y, C, z, X == null ? void 0 : X.relative), k = pa(ee, J, y), P = Jl(k, ee, J);
      if (P.active && P.matches && (k = P.matches), !k) {
        Jt(b, z, al(404, {
          pathname: J
        }), {
          flushSync: Z
        });
        return;
      }
      let { path: re, submission: ce, error: ie } = rm(true, J, X);
      if (ie) {
        Jt(b, z, ie, {
          flushSync: Z
        });
        return;
      }
      let Le = u.getContext ? await u.getContext() : new tm(), Me = (X && X.preventScrollReset) === true;
      if (ce && At(ce.formMethod)) {
        await br(b, z, re, k, Le, P.active, Z, Me, ce, X && X.unstable_defaultShouldRevalidate);
        return;
      }
      F.set(b, {
        routeId: z,
        path: re
      }), await Ot(b, z, re, k, Le, P.active, Z, Me, ce);
    }
    async function br(b, z, C, X, Z, ee, J, k, P, re) {
      Zl(), F.delete(b);
      let ce = D.fetchers.get(b);
      ul(b, Yg(P, ce), {
        flushSync: J
      });
      let ie = new AbortController(), Le = Nn(u.history, C, ie.signal, P);
      if (ee) {
        let We = await ml(X, new URL(Le.url).pathname, Le.signal, b);
        if (We.type === "aborted") return;
        if (We.type === "error") {
          Jt(b, z, We.error, {
            flushSync: J
          });
          return;
        } else if (We.matches) X = We.matches;
        else {
          Jt(b, z, al(404, {
            pathname: C
          }), {
            flushSync: J
          });
          return;
        }
      }
      let Me = dr(X, C);
      if (!Me.route.action && !Me.route.lazy) {
        let We = al(405, {
          method: P.formMethod,
          pathname: C,
          routeId: z
        });
        Jt(b, z, We, {
          flushSync: J
        });
        return;
      }
      ae.set(b, ie);
      let Ke = Se, $e = Ln(d, m, Le, X, Me, f, Z), tt = await Vl(Le, $e, Z, b), He = tt[Me.route.id];
      if (!He) {
        for (let We of $e) if (tt[We.route.id]) {
          He = tt[We.route.id];
          break;
        }
      }
      if (Le.signal.aborted) {
        ae.get(b) === ie && ae.delete(b);
        return;
      }
      if (de.has(b)) {
        if (Qa(He) || Kt(He)) {
          ul(b, Xl(void 0));
          return;
        }
      } else {
        if (Qa(He)) if (ae.delete(b), E > Ke) {
          ul(b, Xl(void 0));
          return;
        } else return K.add(b), ul(b, xu(P)), Rl(Le, He, false, {
          fetcherSubmission: P,
          preventScrollReset: k
        });
        if (Kt(He)) {
          Jt(b, z, He.error);
          return;
        }
      }
      let yt = D.navigation.location || D.location, Fe = Nn(u.history, yt, ie.signal), Fl = v || g, rl = D.navigation.state !== "idle" ? pa(Fl, D.navigation.location, y) : D.matches;
      pe(rl, "Didn't find any matches after fetcher action");
      let pt = ++Se;
      B.set(b, pt);
      let yl = xu(P, He.data);
      D.fetchers.set(b, yl);
      let { dsMatches: Ma, revalidatingFetchers: vl } = fm(Fe, Z, d, m, u.history, D, rl, P, yt, f, false, V, le, de, F, K, Fl, y, u.patchRoutesOnNavigation != null, [
        Me.route.id,
        He
      ], re);
      vl.filter((We) => We.key !== b).forEach((We) => {
        let Wa = We.key, ka = D.fetchers.get(Wa), Pu = xu(void 0, ka ? ka.data : void 0);
        D.fetchers.set(Wa, Pu), gt(Wa), We.controller && ae.set(Wa, We.controller);
      }), mt({
        fetchers: new Map(D.fetchers)
      });
      let Da = () => vl.forEach((We) => gt(We.key));
      ie.signal.addEventListener("abort", Da);
      let { loaderResults: $a, fetcherResults: De } = await Gn(Ma, vl, Fe, Z);
      if (ie.signal.aborted) return;
      if (ie.signal.removeEventListener("abort", Da), B.delete(b), ae.delete(b), vl.forEach((We) => ae.delete(We.key)), D.fetchers.has(b)) {
        let We = Xl(He.data);
        D.fetchers.set(b, We);
      }
      let nt = or($a);
      if (nt) return Rl(Fe, nt.result, false, {
        preventScrollReset: k
      });
      if (nt = or(De), nt) return K.add(nt.key), Rl(Fe, nt.result, false, {
        preventScrollReset: k
      });
      let { loaderData: Mt, errors: ct } = ym(D, rl, $a, void 0, vl, De);
      Fu(pt), D.navigation.state === "loading" && pt > E ? (pe(ze, "Expected pending action"), me && me.abort(), Ut(D.navigation.location, {
        matches: rl,
        loaderData: Mt,
        errors: ct,
        fetchers: new Map(D.fetchers)
      })) : (mt({
        errors: ct,
        loaderData: vm(D.loaderData, Mt, rl, ct),
        fetchers: new Map(D.fetchers)
      }), V = false);
    }
    async function Ot(b, z, C, X, Z, ee, J, k, P) {
      let re = D.fetchers.get(b);
      ul(b, xu(P, re ? re.data : void 0), {
        flushSync: J
      });
      let ce = new AbortController(), ie = Nn(u.history, C, ce.signal);
      if (ee) {
        let He = await ml(X, new URL(ie.url).pathname, ie.signal, b);
        if (He.type === "aborted") return;
        if (He.type === "error") {
          Jt(b, z, He.error, {
            flushSync: J
          });
          return;
        } else if (He.matches) X = He.matches;
        else {
          Jt(b, z, al(404, {
            pathname: C
          }), {
            flushSync: J
          });
          return;
        }
      }
      let Le = dr(X, C);
      ae.set(b, ce);
      let Me = Se, Ke = Ln(d, m, ie, X, Le, f, Z), tt = (await Vl(ie, Ke, Z, b))[Le.route.id];
      if (ae.get(b) === ce && ae.delete(b), !ie.signal.aborted) {
        if (de.has(b)) {
          ul(b, Xl(void 0));
          return;
        }
        if (Qa(tt)) if (E > Me) {
          ul(b, Xl(void 0));
          return;
        } else {
          K.add(b), await Rl(ie, tt, false, {
            preventScrollReset: k
          });
          return;
        }
        if (Kt(tt)) {
          Jt(b, z, tt.error);
          return;
        }
        ul(b, Xl(tt.data));
      }
    }
    async function Rl(b, z, C, { submission: X, fetcherSubmission: Z, preventScrollReset: ee, replace: J } = {}) {
      C || (Ue == null ? void 0 : Ue.resolve(), Ue = null), z.response.headers.has("X-Remix-Revalidate") && (V = true);
      let k = z.response.headers.get("Location");
      pe(k, "Expected a Location header on the redirect Response"), k = hm(k, new URL(b.url), y, u.history);
      let P = wn(D.location, k, {
        _isRedirect: true
      });
      if (o) {
        let Ke = false;
        if (z.response.headers.has("X-Remix-Reload-Document")) Ke = true;
        else if (Jc(k)) {
          const $e = Um(k, true);
          Ke = $e.origin !== r.location.origin || jt($e.pathname, y) == null;
        }
        if (Ke) {
          J ? r.location.replace(k) : r.location.assign(k);
          return;
        }
      }
      me = null;
      let re = J === true || z.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: ce, formAction: ie, formEncType: Le } = D.navigation;
      !X && !Z && ce && ie && Le && (X = bm(D.navigation));
      let Me = X || Z;
      if (yg.has(z.response.status) && Me && At(Me.formMethod)) await El(re, P, {
        submission: {
          ...Me,
          formAction: k
        },
        preventScrollReset: ee || Ve,
        enableViewTransition: C ? et : void 0
      });
      else {
        let Ke = Yc(P, X);
        await El(re, P, {
          overrideNavigation: Ke,
          fetcherSubmission: Z,
          preventScrollReset: ee || Ve,
          enableViewTransition: C ? et : void 0
        });
      }
    }
    async function Vl(b, z, C, X) {
      var _a;
      let Z, ee = {};
      try {
        Z = await Tg(M, b, z, X, C, false);
      } catch (J) {
        return z.filter((k) => k.shouldLoad).forEach((k) => {
          ee[k.route.id] = {
            type: "error",
            error: J
          };
        }), ee;
      }
      if (b.signal.aborted) return ee;
      if (!At(b.method)) for (let J of z) {
        if (((_a = Z[J.route.id]) == null ? void 0 : _a.type) === "error") break;
        !Z.hasOwnProperty(J.route.id) && !D.loaderData.hasOwnProperty(J.route.id) && (!D.errors || !D.errors.hasOwnProperty(J.route.id)) && J.shouldCallHandler() && (Z[J.route.id] = {
          type: "error",
          result: new Error(`No result returned from dataStrategy for route ${J.route.id}`)
        });
      }
      for (let [J, k] of Object.entries(Z)) if (Hg(k)) {
        let P = k.result;
        ee[J] = {
          type: "redirect",
          response: Og(P, b, J, z, y)
        };
      } else ee[J] = await Ag(k);
      return ee;
    }
    async function Gn(b, z, C, X) {
      let Z = Vl(C, b, X, null), ee = Promise.all(z.map(async (P) => {
        if (P.matches && P.match && P.request && P.controller) {
          let ce = (await Vl(P.request, P.matches, X, P.key))[P.match.route.id];
          return {
            [P.key]: ce
          };
        } else return Promise.resolve({
          [P.key]: {
            type: "error",
            error: al(404, {
              pathname: P.path
            })
          }
        });
      })), J = await Z, k = (await ee).reduce((P, re) => Object.assign(P, re), {});
      return {
        loaderResults: J,
        fetcherResults: k
      };
    }
    function Zl() {
      V = true, F.forEach((b, z) => {
        ae.has(z) && le.add(z), gt(z);
      });
    }
    function ul(b, z, C = {}) {
      D.fetchers.set(b, z), mt({
        fetchers: new Map(D.fetchers)
      }, {
        flushSync: (C && C.flushSync) === true
      });
    }
    function Jt(b, z, C, X = {}) {
      let Z = ba(D.matches, z);
      zl(b), mt({
        errors: {
          [Z.route.id]: C
        },
        fetchers: new Map(D.fetchers)
      }, {
        flushSync: (X && X.flushSync) === true
      });
    }
    function Ku(b) {
      return oe.set(b, (oe.get(b) || 0) + 1), de.has(b) && de.delete(b), D.fetchers.get(b) || vg;
    }
    function Sr(b, z) {
      gt(b, z == null ? void 0 : z.reason), ul(b, Xl(null));
    }
    function zl(b) {
      let z = D.fetchers.get(b);
      ae.has(b) && !(z && z.state === "loading" && B.has(b)) && gt(b), F.delete(b), B.delete(b), K.delete(b), de.delete(b), le.delete(b), D.fetchers.delete(b);
    }
    function _t(b) {
      let z = (oe.get(b) || 0) - 1;
      z <= 0 ? (oe.delete(b), de.add(b)) : oe.set(b, z), mt({
        fetchers: new Map(D.fetchers)
      });
    }
    function gt(b, z) {
      let C = ae.get(b);
      C && (C.abort(z), ae.delete(b));
    }
    function Tt(b) {
      for (let z of b) {
        let C = Ku(z), X = Xl(C.data);
        D.fetchers.set(z, X);
      }
    }
    function Ju() {
      let b = [], z = false;
      for (let C of K) {
        let X = D.fetchers.get(C);
        pe(X, `Expected fetcher: ${C}`), X.state === "loading" && (K.delete(C), b.push(C), z = true);
      }
      return Tt(b), z;
    }
    function Fu(b) {
      let z = [];
      for (let [C, X] of B) if (X < b) {
        let Z = D.fetchers.get(C);
        pe(Z, `Expected fetcher: ${C}`), Z.state === "loading" && (gt(C), B.delete(C), z.push(C));
      }
      return Tt(z), z.length > 0;
    }
    function Er(b, z) {
      let C = D.blockers.get(b) || xn;
      return Te.get(b) !== z && Te.set(b, z), C;
    }
    function za(b) {
      D.blockers.delete(b), Te.delete(b);
    }
    function Tl(b, z) {
      let C = D.blockers.get(b) || xn;
      pe(C.state === "unblocked" && z.state === "blocked" || C.state === "blocked" && z.state === "blocked" || C.state === "blocked" && z.state === "proceeding" || C.state === "blocked" && z.state === "unblocked" || C.state === "proceeding" && z.state === "unblocked", `Invalid blocker state transition: ${C.state} -> ${z.state}`);
      let X = new Map(D.blockers);
      X.set(b, z), mt({
        blockers: X
      });
    }
    function Ta({ currentLocation: b, nextLocation: z, historyAction: C }) {
      if (Te.size === 0) return;
      Te.size > 1 && rt(false, "A router only supports one blocker at a time");
      let X = Array.from(Te.entries()), [Z, ee] = X[X.length - 1], J = D.blockers.get(Z);
      if (!(J && J.state === "proceeding") && ee({
        currentLocation: b,
        nextLocation: z,
        historyAction: C
      })) return Z;
    }
    function il(b) {
      let z = al(404, {
        pathname: b
      }), C = v || g, { matches: X, route: Z } = cr(C);
      return {
        notFoundMatches: X,
        route: Z,
        error: z
      };
    }
    function Fa(b, z, C) {
      if (G = b, q = z, Q = C || null, !$ && D.navigation === jc) {
        $ = true;
        let X = Xn(D.location, D.matches);
        X != null && mt({
          restoreScrollPosition: X
        });
      }
      return () => {
        G = null, q = null, Q = null;
      };
    }
    function Kl(b, z) {
      return Q && Q(b, z.map((X) => X0(X, D.loaderData))) || b.key;
    }
    function Rr(b, z) {
      if (G && q) {
        let C = Kl(b, z);
        G[C] = q();
      }
    }
    function Xn(b, z) {
      if (G) {
        let C = Kl(b, z), X = G[C];
        if (typeof X == "number") return X;
      }
      return null;
    }
    function Jl(b, z, C) {
      if (u.patchRoutesOnNavigation) if (b) {
        if (Object.keys(b[0].params).length > 0) return {
          active: true,
          matches: Lu(z, C, y, true)
        };
      } else return {
        active: true,
        matches: Lu(z, C, y, true) || []
      };
      return {
        active: false,
        matches: null
      };
    }
    async function ml(b, z, C, X) {
      if (!u.patchRoutesOnNavigation) return {
        type: "success",
        matches: b
      };
      let Z = b;
      for (; ; ) {
        let ee = v == null, J = v || g, k = m;
        try {
          await u.patchRoutesOnNavigation({
            signal: C,
            path: z,
            matches: Z,
            fetcherKey: X,
            patch: (ce, ie) => {
              C.aborted || cm(ce, ie, J, k, d, false);
            }
          });
        } catch (ce) {
          return {
            type: "error",
            error: ce,
            partialMatches: Z
          };
        } finally {
          ee && !C.aborted && (g = [
            ...g
          ]);
        }
        if (C.aborted) return {
          type: "aborted"
        };
        let P = pa(J, z, y), re = null;
        if (P) {
          if (Object.keys(P[0].params).length === 0) return {
            type: "success",
            matches: P
          };
          if (re = Lu(J, z, y, true), !(re && Z.length < re.length && $u(Z, re.slice(0, Z.length)))) return {
            type: "success",
            matches: P
          };
        }
        if (re || (re = Lu(J, z, y, true)), !re || $u(Z, re)) return {
          type: "success",
          matches: null
        };
        Z = re;
      }
    }
    function $u(b, z) {
      return b.length === z.length && b.every((C, X) => C.route.id === z[X].route.id);
    }
    function Wu(b) {
      m = {}, v = Bu(b, d, void 0, m);
    }
    function ku(b, z, C = false) {
      let X = v == null;
      cm(b, z, v || g, m, d, C), X && (g = [
        ...g
      ], mt({}));
    }
    return ue = {
      get basename() {
        return y;
      },
      get future() {
        return S;
      },
      get state() {
        return D;
      },
      get routes() {
        return g;
      },
      get window() {
        return r;
      },
      initialize: Ra,
      subscribe: Bn,
      enableScrollRestoration: Fa,
      navigate: Ka,
      fetch: pr,
      revalidate: jn,
      createHref: (b) => u.history.createHref(b),
      encodeLocation: (b) => u.history.encodeLocation(b),
      getFetcher: Ku,
      resetFetcher: Sr,
      deleteFetcher: _t,
      dispose: Za,
      getBlocker: Er,
      deleteBlocker: za,
      patchRoutes: ku,
      _internalFetchControllers: ae,
      _internalSetRoutes: Wu,
      _internalSetStateDoNotUseOrYouWillBreakYourApp(b) {
        mt(b);
      }
    }, u.unstable_instrumentations && (ue = rg(ue, u.unstable_instrumentations.map((b) => b.router).filter(Boolean))), ue;
  }
  function pg(u) {
    return u != null && ("formData" in u && u.formData != null || "body" in u && u.body !== void 0);
  }
  function Xc(u, r, o, f, s, d) {
    let m, g;
    if (s) {
      m = [];
      for (let y of r) if (m.push(y), y.route.id === s) {
        g = y;
        break;
      }
    } else m = r, g = r[r.length - 1];
    let v = vr(f || ".", Fc(m), jt(u.pathname, o) || u.pathname, d === "path");
    if (f == null && (v.search = u.search, v.hash = u.hash), (f == null || f === "" || f === ".") && g) {
      let y = kc(v.search);
      if (g.route.index && !y) v.search = v.search ? v.search.replace(/^\?/, "?index&") : "?index";
      else if (!g.route.index && y) {
        let M = new URLSearchParams(v.search), S = M.getAll("index");
        M.delete("index"), S.filter((L) => L).forEach((L) => M.append("index", L));
        let N = M.toString();
        v.search = N ? `?${N}` : "";
      }
    }
    return o !== "/" && (v.pathname = tg({
      basename: o,
      pathname: v.pathname
    })), dl(v);
  }
  function rm(u, r, o) {
    if (!o || !pg(o)) return {
      path: r
    };
    if (o.formMethod && !Bg(o.formMethod)) return {
      path: r,
      error: al(405, {
        method: o.formMethod
      })
    };
    let f = () => ({
      path: r,
      error: al(400, {
        type: "invalid-body"
      })
    }), d = (o.formMethod || "get").toUpperCase(), m = Wm(r);
    if (o.body !== void 0) {
      if (o.formEncType === "text/plain") {
        if (!At(d)) return f();
        let S = typeof o.body == "string" ? o.body : o.body instanceof FormData || o.body instanceof URLSearchParams ? Array.from(o.body.entries()).reduce((N, [L, G]) => `${N}${L}=${G}
`, "") : String(o.body);
        return {
          path: r,
          submission: {
            formMethod: d,
            formAction: m,
            formEncType: o.formEncType,
            formData: void 0,
            json: void 0,
            text: S
          }
        };
      } else if (o.formEncType === "application/json") {
        if (!At(d)) return f();
        try {
          let S = typeof o.body == "string" ? JSON.parse(o.body) : o.body;
          return {
            path: r,
            submission: {
              formMethod: d,
              formAction: m,
              formEncType: o.formEncType,
              formData: void 0,
              json: S,
              text: void 0
            }
          };
        } catch {
          return f();
        }
      }
    }
    pe(typeof FormData == "function", "FormData is not available in this environment");
    let g, v;
    if (o.formData) g = Vc(o.formData), v = o.formData;
    else if (o.body instanceof FormData) g = Vc(o.body), v = o.body;
    else if (o.body instanceof URLSearchParams) g = o.body, v = mm(g);
    else if (o.body == null) g = new URLSearchParams(), v = new FormData();
    else try {
      g = new URLSearchParams(o.body), v = mm(g);
    } catch {
      return f();
    }
    let y = {
      formMethod: d,
      formAction: m,
      formEncType: o && o.formEncType || "application/x-www-form-urlencoded",
      formData: v,
      json: void 0,
      text: void 0
    };
    if (At(y.formMethod)) return {
      path: r,
      submission: y
    };
    let M = hl(r);
    return u && M.search && kc(M.search) && g.append("index", ""), M.search = `?${g}`, {
      path: dl(M),
      submission: y
    };
  }
  function fm(u, r, o, f, s, d, m, g, v, y, M, S, N, L, G, Q, q, $, W, I, Re) {
    var _a;
    let ye = I ? Kt(I[1]) ? I[1].error : I[1].data : void 0, be = s.createURL(d.location), ue = s.createURL(v), D;
    if (M && d.errors) {
      let he = Object.keys(d.errors)[0];
      D = m.findIndex((U) => U.route.id === he);
    } else if (I && Kt(I[1])) {
      let he = I[0];
      D = m.findIndex((U) => U.route.id === he) - 1;
    }
    let ze = I ? I[1].statusCode : void 0, Ue = ze && ze >= 400, Ve = {
      currentUrl: be,
      currentParams: ((_a = d.matches[0]) == null ? void 0 : _a.params) || {},
      nextUrl: ue,
      nextParams: m[0].params,
      ...g,
      actionResult: ye,
      actionStatus: ze
    }, me = qu(m), et = m.map((he, U) => {
      let { route: V } = he, le = null;
      if (D != null && U > D) le = false;
      else if (V.lazy) le = true;
      else if (!$c(V)) le = false;
      else if (M) {
        let { shouldLoad: B } = Vm(V, d.loaderData, d.errors);
        le = B;
      } else bg(d.loaderData, d.matches[U], he) && (le = true);
      if (le !== null) return Qc(o, f, u, me, he, y, r, le);
      let ae = false;
      typeof Re == "boolean" ? ae = Re : Ue ? ae = false : (S || be.pathname + be.search === ue.pathname + ue.search || be.search !== ue.search || Sg(d.matches[U], he)) && (ae = true);
      let Se = {
        ...Ve,
        defaultShouldRevalidate: ae
      }, E = wu(he, Se);
      return Qc(o, f, u, me, he, y, r, E, Se, Re);
    }), xe = [];
    return G.forEach((he, U) => {
      if (M || !m.some((F) => F.route.id === he.routeId) || L.has(U)) return;
      let V = d.fetchers.get(U), le = V && V.state !== "idle" && V.data === void 0, ae = pa(q, he.path, $);
      if (!ae) {
        if (W && le) return;
        xe.push({
          key: U,
          routeId: he.routeId,
          path: he.path,
          matches: null,
          match: null,
          request: null,
          controller: null
        });
        return;
      }
      if (Q.has(U)) return;
      let Se = dr(ae, he.path), E = new AbortController(), B = Nn(s, he.path, E.signal), K = null;
      if (N.has(U)) N.delete(U), K = Ln(o, f, B, ae, Se, y, r);
      else if (le) S && (K = Ln(o, f, B, ae, Se, y, r));
      else {
        let F;
        typeof Re == "boolean" ? F = Re : Ue ? F = false : F = S;
        let oe = {
          ...Ve,
          defaultShouldRevalidate: F
        };
        wu(Se, oe) && (K = Ln(o, f, B, ae, Se, y, r, oe));
      }
      K && xe.push({
        key: U,
        routeId: he.routeId,
        path: he.path,
        matches: K,
        match: Se,
        request: B,
        controller: E
      });
    }), {
      dsMatches: et,
      revalidatingFetchers: xe
    };
  }
  function $c(u) {
    return u.loader != null || u.middleware != null && u.middleware.length > 0;
  }
  function Vm(u, r, o) {
    if (u.lazy) return {
      shouldLoad: true,
      renderFallback: true
    };
    if (!$c(u)) return {
      shouldLoad: false,
      renderFallback: false
    };
    let f = r != null && u.id in r, s = o != null && o[u.id] !== void 0;
    if (!f && s) return {
      shouldLoad: false,
      renderFallback: false
    };
    if (typeof u.loader == "function" && u.loader.hydrate === true) return {
      shouldLoad: true,
      renderFallback: !f
    };
    let d = !f && !s;
    return {
      shouldLoad: d,
      renderFallback: d
    };
  }
  function bg(u, r, o) {
    let f = !r || o.route.id !== r.route.id, s = !u.hasOwnProperty(o.route.id);
    return f || s;
  }
  function Sg(u, r) {
    let o = u.route.path;
    return u.pathname !== r.pathname || o != null && o.endsWith("*") && u.params["*"] !== r.params["*"];
  }
  function wu(u, r) {
    if (u.route.shouldRevalidate) {
      let o = u.route.shouldRevalidate(r);
      if (typeof o == "boolean") return o;
    }
    return r.defaultShouldRevalidate;
  }
  function cm(u, r, o, f, s, d) {
    let m;
    if (u) {
      let y = f[u];
      pe(y, `No route found to patch children into: routeId = ${u}`), y.children || (y.children = []), m = y.children;
    } else m = o;
    let g = [], v = [];
    if (r.forEach((y) => {
      let M = m.find((S) => Zm(y, S));
      M ? v.push({
        existingRoute: M,
        newRoute: y
      }) : g.push(y);
    }), g.length > 0) {
      let y = Bu(g, s, [
        u || "_",
        "patch",
        String((m == null ? void 0 : m.length) || "0")
      ], f);
      m.push(...y);
    }
    if (d && v.length > 0) for (let y = 0; y < v.length; y++) {
      let { existingRoute: M, newRoute: S } = v[y], N = M, [L] = Bu([
        S
      ], s, [], {}, true);
      Object.assign(N, {
        element: L.element ? L.element : N.element,
        errorElement: L.errorElement ? L.errorElement : N.errorElement,
        hydrateFallbackElement: L.hydrateFallbackElement ? L.hydrateFallbackElement : N.hydrateFallbackElement
      });
    }
  }
  function Zm(u, r) {
    var _a;
    return "id" in u && "id" in r && u.id === r.id ? true : u.index === r.index && u.path === r.path && u.caseSensitive === r.caseSensitive ? (!u.children || u.children.length === 0) && (!r.children || r.children.length === 0) ? true : ((_a = u.children) == null ? void 0 : _a.every((o, f) => {
      var _a2;
      return (_a2 = r.children) == null ? void 0 : _a2.some((s) => Zm(o, s));
    })) ?? false : false;
  }
  var om = /* @__PURE__ */ new WeakMap(), Km = ({ key: u, route: r, manifest: o, mapRouteProperties: f }) => {
    let s = o[r.id];
    if (pe(s, "No route found in manifest"), !s.lazy || typeof s.lazy != "object") return;
    let d = s.lazy[u];
    if (!d) return;
    let m = om.get(s);
    m || (m = {}, om.set(s, m));
    let g = m[u];
    if (g) return g;
    let v = (async () => {
      let y = j0(u), S = s[u] !== void 0 && u !== "hasErrorBoundary";
      if (y) rt(!y, "Route property " + u + " is not a supported lazy route property. This property will be ignored."), m[u] = Promise.resolve();
      else if (S) rt(false, `Route "${s.id}" has a static property "${u}" defined. The lazy property will be ignored.`);
      else {
        let N = await d();
        N != null && (Object.assign(s, {
          [u]: N
        }), Object.assign(s, f(s)));
      }
      typeof s.lazy == "object" && (s.lazy[u] = void 0, Object.values(s.lazy).every((N) => N === void 0) && (s.lazy = void 0));
    })();
    return m[u] = v, v;
  }, sm = /* @__PURE__ */ new WeakMap();
  function Eg(u, r, o, f, s) {
    let d = o[u.id];
    if (pe(d, "No route found in manifest"), !u.lazy) return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
    if (typeof u.lazy == "function") {
      let M = sm.get(d);
      if (M) return {
        lazyRoutePromise: M,
        lazyHandlerPromise: M
      };
      let S = (async () => {
        pe(typeof u.lazy == "function", "No lazy route function found");
        let N = await u.lazy(), L = {};
        for (let G in N) {
          let Q = N[G];
          if (Q === void 0) continue;
          let q = q0(G), W = d[G] !== void 0 && G !== "hasErrorBoundary";
          q ? rt(!q, "Route property " + G + " is not a supported property to be returned from a lazy route function. This property will be ignored.") : W ? rt(!W, `Route "${d.id}" has a static property "${G}" defined but its lazy function is also returning a value for this property. The lazy route property "${G}" will be ignored.`) : L[G] = Q;
        }
        Object.assign(d, L), Object.assign(d, {
          ...f(d),
          lazy: void 0
        });
      })();
      return sm.set(d, S), S.catch(() => {
      }), {
        lazyRoutePromise: S,
        lazyHandlerPromise: S
      };
    }
    let m = Object.keys(u.lazy), g = [], v;
    for (let M of m) {
      if (s && s.includes(M)) continue;
      let S = Km({
        key: M,
        route: u,
        manifest: o,
        mapRouteProperties: f
      });
      S && (g.push(S), M === r && (v = S));
    }
    let y = g.length > 0 ? Promise.all(g).then(() => {
    }) : void 0;
    return y == null ? void 0 : y.catch(() => {
    }), v == null ? void 0 : v.catch(() => {
    }), {
      lazyRoutePromise: y,
      lazyHandlerPromise: v
    };
  }
  async function dm(u) {
    let r = u.matches.filter((s) => s.shouldLoad), o = {};
    return (await Promise.all(r.map((s) => s.resolve()))).forEach((s, d) => {
      o[r[d].route.id] = s;
    }), o;
  }
  async function Rg(u) {
    return u.matches.some((r) => r.route.middleware) ? Jm(u, () => dm(u)) : dm(u);
  }
  function Jm(u, r) {
    return zg(u, r, (f) => {
      if (wg(f)) throw f;
      return f;
    }, xg, o);
    function o(f, s, d) {
      if (d) return Promise.resolve(Object.assign(d.value, {
        [s]: {
          type: "error",
          result: f
        }
      }));
      {
        let { matches: m } = u, g = Math.min(Math.max(m.findIndex((y) => y.route.id === s), 0), Math.max(m.findIndex((y) => y.shouldCallHandler()), 0)), v = ba(m, m[g].route.id).route.id;
        return Promise.resolve({
          [v]: {
            type: "error",
            result: f
          }
        });
      }
    }
  }
  async function zg(u, r, o, f, s) {
    let { matches: d, request: m, params: g, context: v, unstable_pattern: y } = u, M = d.flatMap((N) => N.route.middleware ? N.route.middleware.map((L) => [
      N.route.id,
      L
    ]) : []);
    return await Fm({
      request: m,
      params: g,
      context: v,
      unstable_pattern: y
    }, M, r, o, f, s);
  }
  async function Fm(u, r, o, f, s, d, m = 0) {
    let { request: g } = u;
    if (g.signal.aborted) throw g.signal.reason ?? new Error(`Request aborted: ${g.method} ${g.url}`);
    let v = r[m];
    if (!v) return await o();
    let [y, M] = v, S, N = async () => {
      if (S) throw new Error("You may only call `next()` once per middleware");
      try {
        return S = {
          value: await Fm(u, r, o, f, s, d, m + 1)
        }, S.value;
      } catch (L) {
        return S = {
          value: await d(L, y, S)
        }, S.value;
      }
    };
    try {
      let L = await M(u, N), G = L != null ? f(L) : void 0;
      return s(G) ? G : S ? G ?? S.value : (S = {
        value: await N()
      }, S.value);
    } catch (L) {
      return await d(L, y, S);
    }
  }
  function $m(u, r, o, f, s) {
    let d = Km({
      key: "middleware",
      route: f.route,
      manifest: r,
      mapRouteProperties: u
    }), m = Eg(f.route, At(o.method) ? "action" : "loader", r, u, s);
    return {
      middleware: d,
      route: m.lazyRoutePromise,
      handler: m.lazyHandlerPromise
    };
  }
  function Qc(u, r, o, f, s, d, m, g, v = null, y) {
    let M = false, S = $m(u, r, o, s, d);
    return {
      ...s,
      _lazyPromises: S,
      shouldLoad: g,
      shouldRevalidateArgs: v,
      shouldCallHandler(N) {
        return M = true, v ? typeof y == "boolean" ? wu(s, {
          ...v,
          defaultShouldRevalidate: y
        }) : typeof N == "boolean" ? wu(s, {
          ...v,
          defaultShouldRevalidate: N
        }) : wu(s, v) : g;
      },
      resolve(N) {
        let { lazy: L, loader: G, middleware: Q } = s.route, q = M || g || N && !At(o.method) && (L || G), $ = Q && Q.length > 0 && !G && !L;
        return q && (At(o.method) || !$) ? Mg({
          request: o,
          unstable_pattern: f,
          match: s,
          lazyHandlerPromise: S == null ? void 0 : S.handler,
          lazyRoutePromise: S == null ? void 0 : S.route,
          handlerOverride: N,
          scopedContext: m
        }) : Promise.resolve({
          type: "data",
          result: void 0
        });
      }
    };
  }
  function Ln(u, r, o, f, s, d, m, g = null) {
    return f.map((v) => v.route.id !== s.route.id ? {
      ...v,
      shouldLoad: false,
      shouldRevalidateArgs: g,
      shouldCallHandler: () => false,
      _lazyPromises: $m(u, r, o, v, d),
      resolve: () => Promise.resolve({
        type: "data",
        result: void 0
      })
    } : Qc(u, r, o, qu(f), v, d, m, true, g));
  }
  async function Tg(u, r, o, f, s, d) {
    o.some((y) => {
      var _a;
      return (_a = y._lazyPromises) == null ? void 0 : _a.middleware;
    }) && await Promise.all(o.map((y) => {
      var _a;
      return (_a = y._lazyPromises) == null ? void 0 : _a.middleware;
    }));
    let m = {
      request: r,
      unstable_pattern: qu(o),
      params: o[0].params,
      context: s,
      matches: o
    }, v = await u({
      ...m,
      fetcherKey: f,
      runClientMiddleware: (y) => {
        let M = m;
        return Jm(M, () => y({
          ...M,
          fetcherKey: f,
          runClientMiddleware: () => {
            throw new Error("Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler");
          }
        }));
      }
    });
    try {
      await Promise.all(o.flatMap((y) => {
        var _a, _b;
        return [
          (_a = y._lazyPromises) == null ? void 0 : _a.handler,
          (_b = y._lazyPromises) == null ? void 0 : _b.route
        ];
      }));
    } catch {
    }
    return v;
  }
  async function Mg({ request: u, unstable_pattern: r, match: o, lazyHandlerPromise: f, lazyRoutePromise: s, handlerOverride: d, scopedContext: m }) {
    let g, v, y = At(u.method), M = y ? "action" : "loader", S = (N) => {
      let L, G = new Promise(($, W) => L = W);
      v = () => L(), u.signal.addEventListener("abort", v);
      let Q = ($) => typeof N != "function" ? Promise.reject(new Error(`You cannot call the handler for a route which defines a boolean "${M}" [routeId: ${o.route.id}]`)) : N({
        request: u,
        unstable_pattern: r,
        params: o.params,
        context: m
      }, ...$ !== void 0 ? [
        $
      ] : []), q = (async () => {
        try {
          return {
            type: "data",
            result: await (d ? d((W) => Q(W)) : Q())
          };
        } catch ($) {
          return {
            type: "error",
            result: $
          };
        }
      })();
      return Promise.race([
        q,
        G
      ]);
    };
    try {
      let N = y ? o.route.action : o.route.loader;
      if (f || s) if (N) {
        let L, [G] = await Promise.all([
          S(N).catch((Q) => {
            L = Q;
          }),
          f,
          s
        ]);
        if (L !== void 0) throw L;
        g = G;
      } else {
        await f;
        let L = y ? o.route.action : o.route.loader;
        if (L) [g] = await Promise.all([
          S(L),
          s
        ]);
        else if (M === "action") {
          let G = new URL(u.url), Q = G.pathname + G.search;
          throw al(405, {
            method: u.method,
            pathname: Q,
            routeId: o.route.id
          });
        } else return {
          type: "data",
          result: void 0
        };
      }
      else if (N) g = await S(N);
      else {
        let L = new URL(u.url), G = L.pathname + L.search;
        throw al(404, {
          pathname: G
        });
      }
    } catch (N) {
      return {
        type: "error",
        result: N
      };
    } finally {
      v && u.signal.removeEventListener("abort", v);
    }
    return g;
  }
  async function Dg(u) {
    let r = u.headers.get("Content-Type");
    return r && /\bapplication\/json\b/.test(r) ? u.body == null ? null : u.json() : u.text();
  }
  async function Ag(u) {
    var _a, _b, _c, _d, _e;
    let { result: r, type: o } = u;
    if (Wc(r)) {
      let f;
      try {
        f = await Dg(r);
      } catch (s) {
        return {
          type: "error",
          error: s
        };
      }
      return o === "error" ? {
        type: "error",
        error: new Yu(r.status, r.statusText, f),
        statusCode: r.status,
        headers: r.headers
      } : {
        type: "data",
        data: f,
        statusCode: r.status,
        headers: r.headers
      };
    }
    return o === "error" ? pm(r) ? r.data instanceof Error ? {
      type: "error",
      error: r.data,
      statusCode: (_a = r.init) == null ? void 0 : _a.status,
      headers: ((_b = r.init) == null ? void 0 : _b.headers) ? new Headers(r.init.headers) : void 0
    } : {
      type: "error",
      error: Ug(r),
      statusCode: ju(r) ? r.status : void 0,
      headers: ((_c = r.init) == null ? void 0 : _c.headers) ? new Headers(r.init.headers) : void 0
    } : {
      type: "error",
      error: r,
      statusCode: ju(r) ? r.status : void 0
    } : pm(r) ? {
      type: "data",
      data: r.data,
      statusCode: (_d = r.init) == null ? void 0 : _d.status,
      headers: ((_e = r.init) == null ? void 0 : _e.headers) ? new Headers(r.init.headers) : void 0
    } : {
      type: "data",
      data: r
    };
  }
  function Og(u, r, o, f, s) {
    let d = u.headers.get("Location");
    if (pe(d, "Redirects returned/thrown from loaders/actions must have a Location header"), !Jc(d)) {
      let m = f.slice(0, f.findIndex((g) => g.route.id === o) + 1);
      d = Xc(new URL(r.url), m, s, d), u.headers.set("Location", d);
    }
    return u;
  }
  function hm(u, r, o, f) {
    let s = [
      "about:",
      "blob:",
      "chrome:",
      "chrome-untrusted:",
      "content:",
      "data:",
      "devtools:",
      "file:",
      "filesystem:",
      "javascript:"
    ];
    if (Jc(u)) {
      let d = u, m = d.startsWith("//") ? new URL(r.protocol + d) : new URL(d);
      if (s.includes(m.protocol)) throw new Error("Invalid redirect location");
      let g = jt(m.pathname, o) != null;
      if (m.origin === r.origin && g) return m.pathname + m.search + m.hash;
    }
    try {
      let d = f.createURL(u);
      if (s.includes(d.protocol)) throw new Error("Invalid redirect location");
    } catch {
    }
    return u;
  }
  function Nn(u, r, o, f) {
    let s = u.createURL(Wm(r)).toString(), d = {
      signal: o
    };
    if (f && At(f.formMethod)) {
      let { formMethod: m, formEncType: g } = f;
      d.method = m.toUpperCase(), g === "application/json" ? (d.headers = new Headers({
        "Content-Type": g
      }), d.body = JSON.stringify(f.json)) : g === "text/plain" ? d.body = f.text : g === "application/x-www-form-urlencoded" && f.formData ? d.body = Vc(f.formData) : d.body = f.formData;
    }
    return new Request(s, d);
  }
  function Vc(u) {
    let r = new URLSearchParams();
    for (let [o, f] of u.entries()) r.append(o, typeof f == "string" ? f : f.name);
    return r;
  }
  function mm(u) {
    let r = new FormData();
    for (let [o, f] of u.entries()) r.append(o, f);
    return r;
  }
  function _g(u, r, o, f = false, s = false) {
    let d = {}, m = null, g, v = false, y = {}, M = o && Kt(o[1]) ? o[1].error : void 0;
    return u.forEach((S) => {
      if (!(S.route.id in r)) return;
      let N = S.route.id, L = r[N];
      if (pe(!Qa(L), "Cannot handle redirect results in processLoaderData"), Kt(L)) {
        let G = L.error;
        if (M !== void 0 && (G = M, M = void 0), m = m || {}, s) m[N] = G;
        else {
          let Q = ba(u, N);
          m[Q.route.id] == null && (m[Q.route.id] = G);
        }
        f || (d[N] = Xm), v || (v = true, g = ju(L.error) ? L.error.status : 500), L.headers && (y[N] = L.headers);
      } else d[N] = L.data, L.statusCode && L.statusCode !== 200 && !v && (g = L.statusCode), L.headers && (y[N] = L.headers);
    }), M !== void 0 && o && (m = {
      [o[0]]: M
    }, o[2] && (d[o[2]] = void 0)), {
      loaderData: d,
      errors: m,
      statusCode: g || 200,
      loaderHeaders: y
    };
  }
  function ym(u, r, o, f, s, d) {
    let { loaderData: m, errors: g } = _g(r, o, f);
    return s.filter((v) => !v.matches || v.matches.some((y) => y.shouldLoad)).forEach((v) => {
      let { key: y, match: M, controller: S } = v;
      if (S && S.signal.aborted) return;
      let N = d[y];
      if (pe(N, "Did not find corresponding fetcher result"), Kt(N)) {
        let L = ba(u.matches, M == null ? void 0 : M.route.id);
        g && g[L.route.id] || (g = {
          ...g,
          [L.route.id]: N.error
        }), u.fetchers.delete(y);
      } else if (Qa(N)) pe(false, "Unhandled fetcher revalidation redirect");
      else {
        let L = Xl(N.data);
        u.fetchers.set(y, L);
      }
    }), {
      loaderData: m,
      errors: g
    };
  }
  function vm(u, r, o, f) {
    let s = Object.entries(r).filter(([, d]) => d !== Xm).reduce((d, [m, g]) => (d[m] = g, d), {});
    for (let d of o) {
      let m = d.route.id;
      if (!r.hasOwnProperty(m) && u.hasOwnProperty(m) && d.route.loader && (s[m] = u[m]), f && f.hasOwnProperty(m)) break;
    }
    return s;
  }
  function gm(u) {
    return u ? Kt(u[1]) ? {
      actionData: {}
    } : {
      actionData: {
        [u[0]]: u[1].data
      }
    } : {};
  }
  function ba(u, r) {
    return (r ? u.slice(0, u.findIndex((f) => f.route.id === r) + 1) : [
      ...u
    ]).reverse().find((f) => f.route.hasErrorBoundary === true) || u[0];
  }
  function cr(u) {
    let r = u.length === 1 ? u[0] : u.find((o) => o.index || !o.path || o.path === "/") || {
      id: "__shim-error-route__"
    };
    return {
      matches: [
        {
          params: {},
          pathname: "",
          pathnameBase: "",
          route: r
        }
      ],
      route: r
    };
  }
  function al(u, { pathname: r, routeId: o, method: f, type: s, message: d } = {}) {
    let m = "Unknown Server Error", g = "Unknown @remix-run/router error";
    return u === 400 ? (m = "Bad Request", f && r && o ? g = `You made a ${f} request to "${r}" but did not provide a \`loader\` for route "${o}", so there is no way to handle the request.` : s === "invalid-body" && (g = "Unable to encode submission body")) : u === 403 ? (m = "Forbidden", g = `Route "${o}" does not match URL "${r}"`) : u === 404 ? (m = "Not Found", g = `No route matches URL "${r}"`) : u === 405 && (m = "Method Not Allowed", f && r && o ? g = `You made a ${f.toUpperCase()} request to "${r}" but did not provide an \`action\` for route "${o}", so there is no way to handle the request.` : f && (g = `Invalid request method "${f.toUpperCase()}"`)), new Yu(u || 500, m, new Error(g), true);
  }
  function or(u) {
    let r = Object.entries(u);
    for (let o = r.length - 1; o >= 0; o--) {
      let [f, s] = r[o];
      if (Qa(s)) return {
        key: f,
        result: s
      };
    }
  }
  function Wm(u) {
    let r = typeof u == "string" ? hl(u) : u;
    return dl({
      ...r,
      hash: ""
    });
  }
  function Cg(u, r) {
    return u.pathname !== r.pathname || u.search !== r.search ? false : u.hash === "" ? r.hash !== "" : u.hash === r.hash ? true : r.hash !== "";
  }
  function Ug(u) {
    var _a, _b;
    return new Yu(((_a = u.init) == null ? void 0 : _a.status) ?? 500, ((_b = u.init) == null ? void 0 : _b.statusText) ?? "Internal Server Error", u.data);
  }
  function xg(u) {
    return u != null && typeof u == "object" && Object.entries(u).every(([r, o]) => typeof r == "string" && Ng(o));
  }
  function Ng(u) {
    return u != null && typeof u == "object" && "type" in u && "result" in u && (u.type === "data" || u.type === "error");
  }
  function Hg(u) {
    return Wc(u.result) && qm.has(u.result.status);
  }
  function Kt(u) {
    return u.type === "error";
  }
  function Qa(u) {
    return (u && u.type) === "redirect";
  }
  function pm(u) {
    return typeof u == "object" && u != null && "type" in u && "data" in u && "init" in u && u.type === "DataWithResponseInit";
  }
  function Wc(u) {
    return u != null && typeof u.status == "number" && typeof u.statusText == "string" && typeof u.headers == "object" && typeof u.body < "u";
  }
  function Lg(u) {
    return qm.has(u);
  }
  function wg(u) {
    return Wc(u) && Lg(u.status) && u.headers.has("Location");
  }
  function Bg(u) {
    return mg.has(u.toUpperCase());
  }
  function At(u) {
    return dg.has(u.toUpperCase());
  }
  function kc(u) {
    return new URLSearchParams(u).getAll("index").some((r) => r === "");
  }
  function dr(u, r) {
    let o = typeof r == "string" ? hl(r).search : r.search;
    if (u[u.length - 1].route.index && kc(o || "")) return u[u.length - 1];
    let f = Lm(u);
    return f[f.length - 1];
  }
  function bm(u) {
    let { formMethod: r, formAction: o, formEncType: f, text: s, formData: d, json: m } = u;
    if (!(!r || !o || !f)) {
      if (s != null) return {
        formMethod: r,
        formAction: o,
        formEncType: f,
        formData: void 0,
        json: void 0,
        text: s
      };
      if (d != null) return {
        formMethod: r,
        formAction: o,
        formEncType: f,
        formData: d,
        json: void 0,
        text: void 0
      };
      if (m !== void 0) return {
        formMethod: r,
        formAction: o,
        formEncType: f,
        formData: void 0,
        json: m,
        text: void 0
      };
    }
  }
  function Yc(u, r) {
    return r ? {
      state: "loading",
      location: u,
      formMethod: r.formMethod,
      formAction: r.formAction,
      formEncType: r.formEncType,
      formData: r.formData,
      json: r.json,
      text: r.text
    } : {
      state: "loading",
      location: u,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
  }
  function jg(u, r) {
    return {
      state: "submitting",
      location: u,
      formMethod: r.formMethod,
      formAction: r.formAction,
      formEncType: r.formEncType,
      formData: r.formData,
      json: r.json,
      text: r.text
    };
  }
  function xu(u, r) {
    return u ? {
      state: "loading",
      formMethod: u.formMethod,
      formAction: u.formAction,
      formEncType: u.formEncType,
      formData: u.formData,
      json: u.json,
      text: u.text,
      data: r
    } : {
      state: "loading",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data: r
    };
  }
  function Yg(u, r) {
    return {
      state: "submitting",
      formMethod: u.formMethod,
      formAction: u.formAction,
      formEncType: u.formEncType,
      formData: u.formData,
      json: u.json,
      text: u.text,
      data: r ? r.data : void 0
    };
  }
  function Xl(u) {
    return {
      state: "idle",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data: u
    };
  }
  function qg(u, r) {
    try {
      let o = u.sessionStorage.getItem(Gm);
      if (o) {
        let f = JSON.parse(o);
        for (let [s, d] of Object.entries(f || {})) d && Array.isArray(d) && r.set(s, new Set(d || []));
      }
    } catch {
    }
  }
  function Gg(u, r) {
    if (r.size > 0) {
      let o = {};
      for (let [f, s] of r) o[f] = [
        ...s
      ];
      try {
        u.sessionStorage.setItem(Gm, JSON.stringify(o));
      } catch (f) {
        rt(false, `Failed to save applied view transitions in sessionStorage (${f}).`);
      }
    }
  }
  function Sm() {
    let u, r, o = new Promise((f, s) => {
      u = async (d) => {
        f(d);
        try {
          await o;
        } catch {
        }
      }, r = async (d) => {
        s(d);
        try {
          await o;
        } catch {
        }
      };
    });
    return {
      promise: o,
      resolve: u,
      reject: r
    };
  }
  var Va = x.createContext(null);
  Va.displayName = "DataRouter";
  var Gu = x.createContext(null);
  Gu.displayName = "DataRouterState";
  var km = x.createContext(false);
  function Xg() {
    return x.useContext(km);
  }
  var Pc = x.createContext({
    isTransitioning: false
  });
  Pc.displayName = "ViewTransition";
  var Pm = x.createContext(/* @__PURE__ */ new Map());
  Pm.displayName = "Fetchers";
  var Qg = x.createContext(null);
  Qg.displayName = "Await";
  var nl = x.createContext(null);
  nl.displayName = "Navigation";
  var Xu = x.createContext(null);
  Xu.displayName = "Location";
  var Ql = x.createContext({
    outlet: null,
    matches: [],
    isDataRoute: false
  });
  Ql.displayName = "Route";
  var Ic = x.createContext(null);
  Ic.displayName = "RouteError";
  var Im = "REACT_ROUTER_ERROR", Vg = "REDIRECT", Zg = "ROUTE_ERROR_RESPONSE";
  function Kg(u) {
    if (u.startsWith(`${Im}:${Vg}:{`)) try {
      let r = JSON.parse(u.slice(28));
      if (typeof r == "object" && r && typeof r.status == "number" && typeof r.statusText == "string" && typeof r.location == "string" && typeof r.reloadDocument == "boolean" && typeof r.replace == "boolean") return r;
    } catch {
    }
  }
  function Jg(u) {
    if (u.startsWith(`${Im}:${Zg}:{`)) try {
      let r = JSON.parse(u.slice(40));
      if (typeof r == "object" && r && typeof r.status == "number" && typeof r.statusText == "string") return new Yu(r.status, r.statusText, r.data);
    } catch {
    }
  }
  function Fg(u, { relative: r } = {}) {
    pe(Qu(), "useHref() may be used only in the context of a <Router> component.");
    let { basename: o, navigator: f } = x.useContext(nl), { hash: s, pathname: d, search: m } = Vu(u, {
      relative: r
    }), g = d;
    return o !== "/" && (g = d === "/" ? o : sl([
      o,
      d
    ])), f.createHref({
      pathname: g,
      search: m,
      hash: s
    });
  }
  function Qu() {
    return x.useContext(Xu) != null;
  }
  Ea = function() {
    return pe(Qu(), "useLocation() may be used only in the context of a <Router> component."), x.useContext(Xu).location;
  };
  var ey = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
  function ty(u) {
    x.useContext(nl).static || x.useLayoutEffect(u);
  }
  $g = function() {
    let { isDataRoute: u } = x.useContext(Ql);
    return u ? rp() : Wg();
  };
  function Wg() {
    pe(Qu(), "useNavigate() may be used only in the context of a <Router> component.");
    let u = x.useContext(Va), { basename: r, navigator: o } = x.useContext(nl), { matches: f } = x.useContext(Ql), { pathname: s } = Ea(), d = JSON.stringify(Fc(f)), m = x.useRef(false);
    return ty(() => {
      m.current = true;
    }), x.useCallback((v, y = {}) => {
      if (rt(m.current, ey), !m.current) return;
      if (typeof v == "number") {
        o.go(v);
        return;
      }
      let M = vr(v, JSON.parse(d), s, y.relative === "path");
      u == null && r !== "/" && (M.pathname = M.pathname === "/" ? r : sl([
        r,
        M.pathname
      ])), (y.replace ? o.replace : o.push)(M, y.state, y);
    }, [
      r,
      o,
      d,
      s,
      u
    ]);
  }
  x.createContext(null);
  function Vu(u, { relative: r } = {}) {
    let { matches: o } = x.useContext(Ql), { pathname: f } = Ea(), s = JSON.stringify(Fc(o));
    return x.useMemo(() => vr(u, JSON.parse(s), f, r === "path"), [
      u,
      s,
      f,
      r
    ]);
  }
  function kg(u, r) {
    return ly(u, r);
  }
  function ly(u, r, o) {
    var _a;
    pe(Qu(), "useRoutes() may be used only in the context of a <Router> component.");
    let { navigator: f } = x.useContext(nl), { matches: s } = x.useContext(Ql), d = s[s.length - 1], m = d ? d.params : {}, g = d ? d.pathname : "/", v = d ? d.pathnameBase : "/", y = d && d.route;
    {
      let q = y && y.path || "";
      iy(g, !y || q.endsWith("*") || q.endsWith("*?"), `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${q}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${q}"> to <Route path="${q === "/" ? "*" : `${q}/*`}">.`);
    }
    let M = Ea(), S;
    if (r) {
      let q = typeof r == "string" ? hl(r) : r;
      pe(v === "/" || ((_a = q.pathname) == null ? void 0 : _a.startsWith(v)), `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${v}" but pathname "${q.pathname}" was given in the \`location\` prop.`), S = q;
    } else S = M;
    let N = S.pathname || "/", L = N;
    if (v !== "/") {
      let q = v.replace(/^\//, "").split("/");
      L = "/" + N.replace(/^\//, "").split("/").slice(q.length).join("/");
    }
    let G = pa(u, {
      pathname: L
    });
    rt(y || G != null, `No routes matched location "${S.pathname}${S.search}${S.hash}" `), rt(G == null || G[G.length - 1].route.element !== void 0 || G[G.length - 1].route.Component !== void 0 || G[G.length - 1].route.lazy !== void 0, `Matched leaf route at location "${S.pathname}${S.search}${S.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);
    let Q = lp(G && G.map((q) => Object.assign({}, q, {
      params: Object.assign({}, m, q.params),
      pathname: sl([
        v,
        f.encodeLocation ? f.encodeLocation(q.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : q.pathname
      ]),
      pathnameBase: q.pathnameBase === "/" ? v : sl([
        v,
        f.encodeLocation ? f.encodeLocation(q.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : q.pathnameBase
      ])
    })), s, o);
    return r && Q ? x.createElement(Xu.Provider, {
      value: {
        location: {
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default",
          unstable_mask: void 0,
          ...S
        },
        navigationType: "POP"
      }
    }, Q) : Q;
  }
  function Pg() {
    let u = up(), r = ju(u) ? `${u.status} ${u.statusText}` : u instanceof Error ? u.message : JSON.stringify(u), o = u instanceof Error ? u.stack : null, f = "rgba(200,200,200, 0.5)", s = {
      padding: "0.5rem",
      backgroundColor: f
    }, d = {
      padding: "2px 4px",
      backgroundColor: f
    }, m = null;
    return console.error("Error handled by React Router default ErrorBoundary:", u), m = x.createElement(x.Fragment, null, x.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", x.createElement("code", {
      style: d
    }, "ErrorBoundary"), " or", " ", x.createElement("code", {
      style: d
    }, "errorElement"), " prop on your route.")), x.createElement(x.Fragment, null, x.createElement("h2", null, "Unexpected Application Error!"), x.createElement("h3", {
      style: {
        fontStyle: "italic"
      }
    }, r), o ? x.createElement("pre", {
      style: s
    }, o) : null, m);
  }
  var Ig = x.createElement(Pg, null), ay = class extends x.Component {
    constructor(u) {
      super(u), this.state = {
        location: u.location,
        revalidation: u.revalidation,
        error: u.error
      };
    }
    static getDerivedStateFromError(u) {
      return {
        error: u
      };
    }
    static getDerivedStateFromProps(u, r) {
      return r.location !== u.location || r.revalidation !== "idle" && u.revalidation === "idle" ? {
        error: u.error,
        location: u.location,
        revalidation: u.revalidation
      } : {
        error: u.error !== void 0 ? u.error : r.error,
        location: r.location,
        revalidation: u.revalidation || r.revalidation
      };
    }
    componentDidCatch(u, r) {
      this.props.onError ? this.props.onError(u, r) : console.error("React Router caught the following error during render", u);
    }
    render() {
      let u = this.state.error;
      if (this.context && typeof u == "object" && u && "digest" in u && typeof u.digest == "string") {
        const o = Jg(u.digest);
        o && (u = o);
      }
      let r = u !== void 0 ? x.createElement(Ql.Provider, {
        value: this.props.routeContext
      }, x.createElement(Ic.Provider, {
        value: u,
        children: this.props.component
      })) : this.props.children;
      return this.context ? x.createElement(ep, {
        error: u
      }, r) : r;
    }
  };
  ay.contextType = km;
  var qc = /* @__PURE__ */ new WeakMap();
  function ep({ children: u, error: r }) {
    let { basename: o } = x.useContext(nl);
    if (typeof r == "object" && r && "digest" in r && typeof r.digest == "string") {
      let f = Kg(r.digest);
      if (f) {
        let s = qc.get(r);
        if (s) throw s;
        let d = Bm(f.location, o);
        if (wm && !qc.get(r)) if (d.isExternal || f.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const m = Promise.resolve().then(() => window.__reactRouterDataRouter.navigate(d.to, {
            replace: f.replace
          }));
          throw qc.set(r, m), m;
        }
        return x.createElement("meta", {
          httpEquiv: "refresh",
          content: `0;url=${d.absoluteURL || d.to}`
        });
      }
    }
    return u;
  }
  function tp({ routeContext: u, match: r, children: o }) {
    let f = x.useContext(Va);
    return f && f.static && f.staticContext && (r.route.errorElement || r.route.ErrorBoundary) && (f.staticContext._deepestRenderedBoundaryId = r.route.id), x.createElement(Ql.Provider, {
      value: u
    }, o);
  }
  function lp(u, r = [], o) {
    let f = o == null ? void 0 : o.state;
    if (u == null) {
      if (!f) return null;
      if (f.errors) u = f.matches;
      else if (r.length === 0 && !f.initialized && f.matches.length > 0) u = f.matches;
      else return null;
    }
    let s = u, d = f == null ? void 0 : f.errors;
    if (d != null) {
      let M = s.findIndex((S) => S.route.id && (d == null ? void 0 : d[S.route.id]) !== void 0);
      pe(M >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(",")}`), s = s.slice(0, Math.min(s.length, M + 1));
    }
    let m = false, g = -1;
    if (o && f) {
      m = f.renderFallback;
      for (let M = 0; M < s.length; M++) {
        let S = s[M];
        if ((S.route.HydrateFallback || S.route.hydrateFallbackElement) && (g = M), S.route.id) {
          let { loaderData: N, errors: L } = f, G = S.route.loader && !N.hasOwnProperty(S.route.id) && (!L || L[S.route.id] === void 0);
          if (S.route.lazy || G) {
            o.isStatic && (m = true), g >= 0 ? s = s.slice(0, g + 1) : s = [
              s[0]
            ];
            break;
          }
        }
      }
    }
    let v = o == null ? void 0 : o.onError, y = f && v ? (M, S) => {
      var _a, _b;
      v(M, {
        location: f.location,
        params: ((_b = (_a = f.matches) == null ? void 0 : _a[0]) == null ? void 0 : _b.params) ?? {},
        unstable_pattern: qu(f.matches),
        errorInfo: S
      });
    } : void 0;
    return s.reduceRight((M, S, N) => {
      let L, G = false, Q = null, q = null;
      f && (L = d && S.route.id ? d[S.route.id] : void 0, Q = S.route.errorElement || Ig, m && (g < 0 && N === 0 ? (iy("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration"), G = true, q = null) : g === N && (G = true, q = S.route.hydrateFallbackElement || null)));
      let $ = r.concat(s.slice(0, N + 1)), W = () => {
        let I;
        return L ? I = Q : G ? I = q : S.route.Component ? I = x.createElement(S.route.Component, null) : S.route.element ? I = S.route.element : I = M, x.createElement(tp, {
          match: S,
          routeContext: {
            outlet: M,
            matches: $,
            isDataRoute: f != null
          },
          children: I
        });
      };
      return f && (S.route.ErrorBoundary || S.route.errorElement || N === 0) ? x.createElement(ay, {
        location: f.location,
        revalidation: f.revalidation,
        component: Q,
        error: L,
        children: W(),
        routeContext: {
          outlet: null,
          matches: $,
          isDataRoute: true
        },
        onError: y
      }) : W();
    }, null);
  }
  function eo(u) {
    return `${u} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
  }
  function ny(u) {
    let r = x.useContext(Va);
    return pe(r, eo(u)), r;
  }
  function uy(u) {
    let r = x.useContext(Gu);
    return pe(r, eo(u)), r;
  }
  function ap(u) {
    let r = x.useContext(Ql);
    return pe(r, eo(u)), r;
  }
  function to(u) {
    let r = ap(u), o = r.matches[r.matches.length - 1];
    return pe(o.route.id, `${u} can only be used on routes that contain a unique "id"`), o.route.id;
  }
  function np() {
    return to("useRouteId");
  }
  function up() {
    var _a;
    let u = x.useContext(Ic), r = uy("useRouteError"), o = to("useRouteError");
    return u !== void 0 ? u : (_a = r.errors) == null ? void 0 : _a[o];
  }
  var ip = 0;
  Ip = function(u) {
    let { router: r, basename: o } = ny("useBlocker"), f = uy("useBlocker"), [s, d] = x.useState(""), m = x.useCallback((g) => {
      if (typeof u != "function") return !!u;
      if (o === "/") return u(g);
      let { currentLocation: v, nextLocation: y, historyAction: M } = g;
      return u({
        currentLocation: {
          ...v,
          pathname: jt(v.pathname, o) || v.pathname
        },
        nextLocation: {
          ...y,
          pathname: jt(y.pathname, o) || y.pathname
        },
        historyAction: M
      });
    }, [
      o,
      u
    ]);
    return x.useEffect(() => {
      let g = String(++ip);
      return d(g), () => r.deleteBlocker(g);
    }, [
      r
    ]), x.useEffect(() => {
      s !== "" && r.getBlocker(s, m);
    }, [
      r,
      s,
      m
    ]), s && f.blockers.has(s) ? f.blockers.get(s) : xn;
  };
  function rp() {
    let { router: u } = ny("useNavigate"), r = to("useNavigate"), o = x.useRef(false);
    return ty(() => {
      o.current = true;
    }), x.useCallback(async (s, d = {}) => {
      rt(o.current, ey), o.current && (typeof s == "number" ? await u.navigate(s) : await u.navigate(s, {
        fromRouteId: r,
        ...d
      }));
    }, [
      u,
      r
    ]);
  }
  var Em = {};
  function iy(u, r, o) {
    !r && !Em[u] && (Em[u] = true, rt(false, o));
  }
  var Rm = {};
  function zm(u, r) {
    !u && !Rm[r] && (Rm[r] = true, console.warn(r));
  }
  var fp = "useOptimistic", Tm = D0[fp], cp = () => {
  };
  function op(u) {
    return Tm ? Tm(u) : [
      u,
      cp
    ];
  }
  function ry(u) {
    let r = {
      hasErrorBoundary: u.hasErrorBoundary || u.ErrorBoundary != null || u.errorElement != null
    };
    return u.Component && (u.element && rt(false, "You should not include both `Component` and `element` on your route - `Component` will be used."), Object.assign(r, {
      element: x.createElement(u.Component),
      Component: void 0
    })), u.HydrateFallback && (u.hydrateFallbackElement && rt(false, "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."), Object.assign(r, {
      hydrateFallbackElement: x.createElement(u.HydrateFallback),
      HydrateFallback: void 0
    })), u.ErrorBoundary && (u.errorElement && rt(false, "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."), Object.assign(r, {
      errorElement: x.createElement(u.ErrorBoundary),
      ErrorBoundary: void 0
    })), r;
  }
  var fy = [
    "HydrateFallback",
    "hydrateFallbackElement"
  ], sp = class {
    constructor() {
      this.status = "pending", this.promise = new Promise((u, r) => {
        this.resolve = (o) => {
          this.status === "pending" && (this.status = "resolved", u(o));
        }, this.reject = (o) => {
          this.status === "pending" && (this.status = "rejected", r(o));
        };
      });
    }
  };
  e1 = function({ router: u, flushSync: r, onError: o, unstable_useTransitions: f }) {
    f = Xg() || f;
    let [d, m] = x.useState(u.state), [g, v] = op(d), [y, M] = x.useState(), [S, N] = x.useState({
      isTransitioning: false
    }), [L, G] = x.useState(), [Q, q] = x.useState(), [$, W] = x.useState(), I = x.useRef(/* @__PURE__ */ new Map()), Re = x.useCallback((D, { deletedFetchers: ze, newErrors: Ue, flushSync: Ve, viewTransitionOpts: me }) => {
      Ue && o && Object.values(Ue).forEach((xe) => {
        var _a;
        return o(xe, {
          location: D.location,
          params: ((_a = D.matches[0]) == null ? void 0 : _a.params) ?? {},
          unstable_pattern: qu(D.matches)
        });
      }), D.fetchers.forEach((xe, he) => {
        xe.data !== void 0 && I.current.set(he, xe.data);
      }), ze.forEach((xe) => I.current.delete(xe)), zm(Ve === false || r != null, 'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.');
      let et = u.window != null && u.window.document != null && typeof u.window.document.startViewTransition == "function";
      if (zm(me == null || et, "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."), !me || !et) {
        r && Ve ? r(() => m(D)) : f === false ? m(D) : x.startTransition(() => {
          f === true && v((xe) => Mm(xe, D)), m(D);
        });
        return;
      }
      if (r && Ve) {
        r(() => {
          Q && (L == null ? void 0 : L.resolve(), Q.skipTransition()), N({
            isTransitioning: true,
            flushSync: true,
            currentLocation: me.currentLocation,
            nextLocation: me.nextLocation
          });
        });
        let xe = u.window.document.startViewTransition(() => {
          r(() => m(D));
        });
        xe.finished.finally(() => {
          r(() => {
            G(void 0), q(void 0), M(void 0), N({
              isTransitioning: false
            });
          });
        }), r(() => q(xe));
        return;
      }
      Q ? (L == null ? void 0 : L.resolve(), Q.skipTransition(), W({
        state: D,
        currentLocation: me.currentLocation,
        nextLocation: me.nextLocation
      })) : (M(D), N({
        isTransitioning: true,
        flushSync: false,
        currentLocation: me.currentLocation,
        nextLocation: me.nextLocation
      }));
    }, [
      u.window,
      r,
      Q,
      L,
      f,
      v,
      o
    ]);
    x.useLayoutEffect(() => u.subscribe(Re), [
      u,
      Re
    ]), x.useEffect(() => {
      S.isTransitioning && !S.flushSync && G(new sp());
    }, [
      S
    ]), x.useEffect(() => {
      if (L && y && u.window) {
        let D = y, ze = L.promise, Ue = u.window.document.startViewTransition(async () => {
          f === false ? m(D) : x.startTransition(() => {
            f === true && v((Ve) => Mm(Ve, D)), m(D);
          }), await ze;
        });
        Ue.finished.finally(() => {
          G(void 0), q(void 0), M(void 0), N({
            isTransitioning: false
          });
        }), q(Ue);
      }
    }, [
      y,
      L,
      u.window,
      f,
      v
    ]), x.useEffect(() => {
      L && y && g.location.key === y.location.key && L.resolve();
    }, [
      L,
      Q,
      g.location,
      y
    ]), x.useEffect(() => {
      !S.isTransitioning && $ && (M($.state), N({
        isTransitioning: true,
        flushSync: false,
        currentLocation: $.currentLocation,
        nextLocation: $.nextLocation
      }), W(void 0));
    }, [
      S.isTransitioning,
      $
    ]);
    let ye = x.useMemo(() => ({
      createHref: u.createHref,
      encodeLocation: u.encodeLocation,
      go: (D) => u.navigate(D),
      push: (D, ze, Ue) => u.navigate(D, {
        state: ze,
        preventScrollReset: Ue == null ? void 0 : Ue.preventScrollReset
      }),
      replace: (D, ze, Ue) => u.navigate(D, {
        replace: true,
        state: ze,
        preventScrollReset: Ue == null ? void 0 : Ue.preventScrollReset
      })
    }), [
      u
    ]), be = u.basename || "/", ue = x.useMemo(() => ({
      router: u,
      navigator: ye,
      static: false,
      basename: be,
      onError: o
    }), [
      u,
      ye,
      be,
      o
    ]);
    return x.createElement(x.Fragment, null, x.createElement(Va.Provider, {
      value: ue
    }, x.createElement(Gu.Provider, {
      value: g
    }, x.createElement(Pm.Provider, {
      value: I.current
    }, x.createElement(Pc.Provider, {
      value: S
    }, x.createElement(yp, {
      basename: be,
      location: g.location,
      navigationType: g.historyAction,
      navigator: ye,
      unstable_useTransitions: f
    }, x.createElement(dp, {
      routes: u.routes,
      future: u.future,
      state: g,
      isStatic: false,
      onError: o
    })))))), null);
  };
  function Mm(u, r) {
    return {
      ...u,
      navigation: r.navigation.state !== "idle" ? r.navigation : u.navigation,
      revalidation: r.revalidation !== "idle" ? r.revalidation : u.revalidation,
      actionData: r.navigation.state !== "submitting" ? r.actionData : u.actionData,
      fetchers: r.fetchers
    };
  }
  var dp = x.memo(hp);
  function hp({ routes: u, future: r, state: o, isStatic: f, onError: s }) {
    return ly(u, void 0, {
      state: o,
      isStatic: f,
      onError: s
    });
  }
  mp = function(u) {
    pe(false, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
  };
  function yp({ basename: u = "/", children: r = null, location: o, navigationType: f = "POP", navigator: s, static: d = false, unstable_useTransitions: m }) {
    pe(!Qu(), "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
    let g = u.replace(/^\/*/, "/"), v = x.useMemo(() => ({
      basename: g,
      navigator: s,
      static: d,
      unstable_useTransitions: m,
      future: {}
    }), [
      g,
      s,
      d,
      m
    ]);
    typeof o == "string" && (o = hl(o));
    let { pathname: y = "/", search: M = "", hash: S = "", state: N = null, key: L = "default", unstable_mask: G } = o, Q = x.useMemo(() => {
      let q = jt(y, g);
      return q == null ? null : {
        location: {
          pathname: q,
          search: M,
          hash: S,
          state: N,
          key: L,
          unstable_mask: G
        },
        navigationType: f
      };
    }, [
      g,
      y,
      M,
      S,
      N,
      L,
      f,
      G
    ]);
    return rt(Q != null, `<Router basename="${g}"> is not able to match the URL "${y}${M}${S}" because it does not start with the basename, so the <Router> won't render anything.`), Q == null ? null : x.createElement(nl.Provider, {
      value: v
    }, x.createElement(Xu.Provider, {
      children: r,
      value: Q
    }));
  }
  t1 = function({ children: u, location: r }) {
    return kg(Zc(u), r);
  };
  function Zc(u, r = []) {
    let o = [];
    return x.Children.forEach(u, (f, s) => {
      if (!x.isValidElement(f)) return;
      let d = [
        ...r,
        s
      ];
      if (f.type === x.Fragment) {
        o.push.apply(o, Zc(f.props.children, d));
        return;
      }
      pe(f.type === mp, `[${typeof f.type == "string" ? f.type : f.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`), pe(!f.props.index || !f.props.children, "An index route cannot have child routes.");
      let m = {
        id: f.props.id || d.join("-"),
        caseSensitive: f.props.caseSensitive,
        element: f.props.element,
        Component: f.props.Component,
        index: f.props.index,
        path: f.props.path,
        middleware: f.props.middleware,
        loader: f.props.loader,
        action: f.props.action,
        hydrateFallbackElement: f.props.hydrateFallbackElement,
        HydrateFallback: f.props.HydrateFallback,
        errorElement: f.props.errorElement,
        ErrorBoundary: f.props.ErrorBoundary,
        hasErrorBoundary: f.props.hasErrorBoundary === true || f.props.ErrorBoundary != null || f.props.errorElement != null,
        shouldRevalidate: f.props.shouldRevalidate,
        handle: f.props.handle,
        lazy: f.props.lazy
      };
      f.props.children && (m.children = Zc(f.props.children, d)), o.push(m);
    }), o;
  }
  var hr = "get", mr = "application/x-www-form-urlencoded";
  function gr(u) {
    return typeof HTMLElement < "u" && u instanceof HTMLElement;
  }
  function vp(u) {
    return gr(u) && u.tagName.toLowerCase() === "button";
  }
  function gp(u) {
    return gr(u) && u.tagName.toLowerCase() === "form";
  }
  function pp(u) {
    return gr(u) && u.tagName.toLowerCase() === "input";
  }
  function bp(u) {
    return !!(u.metaKey || u.altKey || u.ctrlKey || u.shiftKey);
  }
  function Sp(u, r) {
    return u.button === 0 && (!r || r === "_self") && !bp(u);
  }
  var sr = null;
  function Ep() {
    if (sr === null) try {
      new FormData(document.createElement("form"), 0), sr = false;
    } catch {
      sr = true;
    }
    return sr;
  }
  var Rp = /* @__PURE__ */ new Set([
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  ]);
  function Gc(u) {
    return u != null && !Rp.has(u) ? (rt(false, `"${u}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${mr}"`), null) : u;
  }
  function zp(u, r) {
    let o, f, s, d, m;
    if (gp(u)) {
      let g = u.getAttribute("action");
      f = g ? jt(g, r) : null, o = u.getAttribute("method") || hr, s = Gc(u.getAttribute("enctype")) || mr, d = new FormData(u);
    } else if (vp(u) || pp(u) && (u.type === "submit" || u.type === "image")) {
      let g = u.form;
      if (g == null) throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
      let v = u.getAttribute("formaction") || g.getAttribute("action");
      if (f = v ? jt(v, r) : null, o = u.getAttribute("formmethod") || g.getAttribute("method") || hr, s = Gc(u.getAttribute("formenctype")) || Gc(g.getAttribute("enctype")) || mr, d = new FormData(g, u), !Ep()) {
        let { name: y, type: M, value: S } = u;
        if (M === "image") {
          let N = y ? `${y}.` : "";
          d.append(`${N}x`, "0"), d.append(`${N}y`, "0");
        } else y && d.append(y, S);
      }
    } else {
      if (gr(u)) throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
      o = hr, f = null, s = mr, m = u;
    }
    return d && s === "text/plain" && (m = d, d = void 0), {
      action: f,
      method: o.toLowerCase(),
      encType: s,
      formData: d,
      body: m
    };
  }
  Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
  function lo(u, r) {
    if (u === false || u === null || typeof u > "u") throw new Error(r);
  }
  function Tp(u, r, o, f) {
    let s = typeof u == "string" ? new URL(u, typeof window > "u" ? "server://singlefetch/" : window.location.origin) : u;
    return o ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${f}` : s.pathname = `${s.pathname}.${f}` : s.pathname === "/" ? s.pathname = `_root.${f}` : r && jt(s.pathname, r) === "/" ? s.pathname = `${r.replace(/\/$/, "")}/_root.${f}` : s.pathname = `${s.pathname.replace(/\/$/, "")}.${f}`, s;
  }
  async function Mp(u, r) {
    if (u.id in r) return r[u.id];
    try {
      let o = await import(u.module).then(async (m) => {
        await m.__tla;
        return m;
      });
      return r[u.id] = o, o;
    } catch (o) {
      return console.error(`Error loading route module \`${u.module}\`, reloading page...`), console.error(o), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
      });
    }
  }
  function Dp(u) {
    return u == null ? false : u.href == null ? u.rel === "preload" && typeof u.imageSrcSet == "string" && typeof u.imageSizes == "string" : typeof u.rel == "string" && typeof u.href == "string";
  }
  async function Ap(u, r, o) {
    let f = await Promise.all(u.map(async (s) => {
      let d = r.routes[s.route.id];
      if (d) {
        let m = await Mp(d, o);
        return m.links ? m.links() : [];
      }
      return [];
    }));
    return Up(f.flat(1).filter(Dp).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map((s) => s.rel === "stylesheet" ? {
      ...s,
      rel: "prefetch",
      as: "style"
    } : {
      ...s,
      rel: "prefetch"
    }));
  }
  function Dm(u, r, o, f, s, d) {
    let m = (v, y) => o[y] ? v.route.id !== o[y].route.id : true, g = (v, y) => {
      var _a;
      return o[y].pathname !== v.pathname || ((_a = o[y].route.path) == null ? void 0 : _a.endsWith("*")) && o[y].params["*"] !== v.params["*"];
    };
    return d === "assets" ? r.filter((v, y) => m(v, y) || g(v, y)) : d === "data" ? r.filter((v, y) => {
      var _a;
      let M = f.routes[v.route.id];
      if (!M || !M.hasLoader) return false;
      if (m(v, y) || g(v, y)) return true;
      if (v.route.shouldRevalidate) {
        let S = v.route.shouldRevalidate({
          currentUrl: new URL(s.pathname + s.search + s.hash, window.origin),
          currentParams: ((_a = o[0]) == null ? void 0 : _a.params) || {},
          nextUrl: new URL(u, window.origin),
          nextParams: v.params,
          defaultShouldRevalidate: true
        });
        if (typeof S == "boolean") return S;
      }
      return true;
    }) : [];
  }
  function Op(u, r, { includeHydrateFallback: o } = {}) {
    return _p(u.map((f) => {
      let s = r.routes[f.route.id];
      if (!s) return [];
      let d = [
        s.module
      ];
      return s.clientActionModule && (d = d.concat(s.clientActionModule)), s.clientLoaderModule && (d = d.concat(s.clientLoaderModule)), o && s.hydrateFallbackModule && (d = d.concat(s.hydrateFallbackModule)), s.imports && (d = d.concat(s.imports)), d;
    }).flat(1));
  }
  function _p(u) {
    return [
      ...new Set(u)
    ];
  }
  function Cp(u) {
    let r = {}, o = Object.keys(u).sort();
    for (let f of o) r[f] = u[f];
    return r;
  }
  function Up(u, r) {
    let o = /* @__PURE__ */ new Set();
    return new Set(r), u.reduce((f, s) => {
      let d = JSON.stringify(Cp(s));
      return o.has(d) || (o.add(d), f.push({
        key: d,
        link: s
      })), f;
    }, []);
  }
  function cy() {
    let u = x.useContext(Va);
    return lo(u, "You must render this element inside a <DataRouterContext.Provider> element"), u;
  }
  function xp() {
    let u = x.useContext(Gu);
    return lo(u, "You must render this element inside a <DataRouterStateContext.Provider> element"), u;
  }
  var ao = x.createContext(void 0);
  ao.displayName = "FrameworkContext";
  function oy() {
    let u = x.useContext(ao);
    return lo(u, "You must render this element inside a <HydratedRouter> element"), u;
  }
  function Np(u, r) {
    let o = x.useContext(ao), [f, s] = x.useState(false), [d, m] = x.useState(false), { onFocus: g, onBlur: v, onMouseEnter: y, onMouseLeave: M, onTouchStart: S } = r, N = x.useRef(null);
    x.useEffect(() => {
      if (u === "render" && m(true), u === "viewport") {
        let Q = ($) => {
          $.forEach((W) => {
            m(W.isIntersecting);
          });
        }, q = new IntersectionObserver(Q, {
          threshold: 0.5
        });
        return N.current && q.observe(N.current), () => {
          q.disconnect();
        };
      }
    }, [
      u
    ]), x.useEffect(() => {
      if (f) {
        let Q = setTimeout(() => {
          m(true);
        }, 100);
        return () => {
          clearTimeout(Q);
        };
      }
    }, [
      f
    ]);
    let L = () => {
      s(true);
    }, G = () => {
      s(false), m(false);
    };
    return o ? u !== "intent" ? [
      d,
      N,
      {}
    ] : [
      d,
      N,
      {
        onFocus: Nu(g, L),
        onBlur: Nu(v, G),
        onMouseEnter: Nu(y, L),
        onMouseLeave: Nu(M, G),
        onTouchStart: Nu(S, L)
      }
    ] : [
      false,
      N,
      {}
    ];
  }
  function Nu(u, r) {
    return (o) => {
      u && u(o), o.defaultPrevented || r(o);
    };
  }
  function Hp({ page: u, ...r }) {
    let { router: o } = cy(), f = x.useMemo(() => pa(o.routes, u, o.basename), [
      o.routes,
      u,
      o.basename
    ]);
    return f ? x.createElement(wp, {
      page: u,
      matches: f,
      ...r
    }) : null;
  }
  function Lp(u) {
    let { manifest: r, routeModules: o } = oy(), [f, s] = x.useState([]);
    return x.useEffect(() => {
      let d = false;
      return Ap(u, r, o).then((m) => {
        d || s(m);
      }), () => {
        d = true;
      };
    }, [
      u,
      r,
      o
    ]), f;
  }
  function wp({ page: u, matches: r, ...o }) {
    let f = Ea(), { future: s, manifest: d, routeModules: m } = oy(), { basename: g } = cy(), { loaderData: v, matches: y } = xp(), M = x.useMemo(() => Dm(u, r, y, d, f, "data"), [
      u,
      r,
      y,
      d,
      f
    ]), S = x.useMemo(() => Dm(u, r, y, d, f, "assets"), [
      u,
      r,
      y,
      d,
      f
    ]), N = x.useMemo(() => {
      if (u === f.pathname + f.search + f.hash) return [];
      let Q = /* @__PURE__ */ new Set(), q = false;
      if (r.forEach((W) => {
        var _a;
        let I = d.routes[W.route.id];
        !I || !I.hasLoader || (!M.some((Re) => Re.route.id === W.route.id) && W.route.id in v && ((_a = m[W.route.id]) == null ? void 0 : _a.shouldRevalidate) || I.hasClientLoader ? q = true : Q.add(W.route.id));
      }), Q.size === 0) return [];
      let $ = Tp(u, g, s.unstable_trailingSlashAwareDataRequests, "data");
      return q && Q.size > 0 && $.searchParams.set("_routes", r.filter((W) => Q.has(W.route.id)).map((W) => W.route.id).join(",")), [
        $.pathname + $.search
      ];
    }, [
      g,
      s.unstable_trailingSlashAwareDataRequests,
      v,
      f,
      d,
      M,
      r,
      u,
      m
    ]), L = x.useMemo(() => Op(S, d), [
      S,
      d
    ]), G = Lp(S);
    return x.createElement(x.Fragment, null, N.map((Q) => x.createElement("link", {
      key: Q,
      rel: "prefetch",
      as: "fetch",
      href: Q,
      ...o
    })), L.map((Q) => x.createElement("link", {
      key: Q,
      rel: "modulepreload",
      href: Q,
      ...o
    })), G.map(({ key: Q, link: q }) => x.createElement("link", {
      key: Q,
      nonce: o.nonce,
      ...q,
      crossOrigin: q.crossOrigin ?? o.crossOrigin
    })));
  }
  function Bp(...u) {
    return (r) => {
      u.forEach((o) => {
        typeof o == "function" ? o(r) : o != null && (o.current = r);
      });
    };
  }
  var jp = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
  try {
    jp && (window.__reactRouterVersion = "7.13.1");
  } catch {
  }
  l1 = function(u, r) {
    return Qm({
      basename: r == null ? void 0 : r.basename,
      getContext: r == null ? void 0 : r.getContext,
      future: r == null ? void 0 : r.future,
      history: H0({
        window: r == null ? void 0 : r.window
      }),
      hydrationData: (r == null ? void 0 : r.hydrationData) || sy(),
      routes: u,
      mapRouteProperties: ry,
      hydrationRouteProperties: fy,
      dataStrategy: r == null ? void 0 : r.dataStrategy,
      patchRoutesOnNavigation: r == null ? void 0 : r.patchRoutesOnNavigation,
      window: r == null ? void 0 : r.window,
      unstable_instrumentations: r == null ? void 0 : r.unstable_instrumentations
    }).initialize();
  };
  a1 = function(u, r) {
    return Qm({
      basename: r == null ? void 0 : r.basename,
      getContext: r == null ? void 0 : r.getContext,
      future: r == null ? void 0 : r.future,
      history: L0({
        window: r == null ? void 0 : r.window
      }),
      hydrationData: (r == null ? void 0 : r.hydrationData) || sy(),
      routes: u,
      mapRouteProperties: ry,
      hydrationRouteProperties: fy,
      dataStrategy: r == null ? void 0 : r.dataStrategy,
      patchRoutesOnNavigation: r == null ? void 0 : r.patchRoutesOnNavigation,
      window: r == null ? void 0 : r.window,
      unstable_instrumentations: r == null ? void 0 : r.unstable_instrumentations
    }).initialize();
  };
  function sy() {
    let u = window == null ? void 0 : window.__staticRouterHydrationData;
    return u && u.errors && (u = {
      ...u,
      errors: Yp(u.errors)
    }), u;
  }
  function Yp(u) {
    if (!u) return null;
    let r = Object.entries(u), o = {};
    for (let [f, s] of r) if (s && s.__type === "RouteErrorResponse") o[f] = new Yu(s.status, s.statusText, s.data, s.internal === true);
    else if (s && s.__type === "Error") {
      if (s.__subType) {
        let d = window[s.__subType];
        if (typeof d == "function") try {
          let m = new d(s.message);
          m.stack = "", o[f] = m;
        } catch {
        }
      }
      if (o[f] == null) {
        let d = new Error(s.message);
        d.stack = "", o[f] = d;
      }
    } else o[f] = s;
    return o;
  }
  let dy;
  dy = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
  hy = x.forwardRef(function({ onClick: r, discover: o = "render", prefetch: f = "none", relative: s, reloadDocument: d, replace: m, unstable_mask: g, state: v, target: y, to: M, preventScrollReset: S, viewTransition: N, unstable_defaultShouldRevalidate: L, ...G }, Q) {
    let { basename: q, navigator: $, unstable_useTransitions: W } = x.useContext(nl), I = typeof M == "string" && dy.test(M), Re = Bm(M, q);
    M = Re.to;
    let ye = Fg(M, {
      relative: s
    }), be = Ea(), ue = null;
    if (g) {
      let he = vr(g, [], be.unstable_mask ? be.unstable_mask.pathname : "/", true);
      q !== "/" && (he.pathname = he.pathname === "/" ? q : sl([
        q,
        he.pathname
      ])), ue = $.createHref(he);
    }
    let [D, ze, Ue] = Np(f, G), Ve = Qp(M, {
      replace: m,
      unstable_mask: g,
      state: v,
      target: y,
      preventScrollReset: S,
      relative: s,
      viewTransition: N,
      unstable_defaultShouldRevalidate: L,
      unstable_useTransitions: W
    });
    function me(he) {
      r && r(he), he.defaultPrevented || Ve(he);
    }
    let et = !(Re.isExternal || d), xe = x.createElement("a", {
      ...G,
      ...Ue,
      href: (et ? ue : void 0) || Re.absoluteURL || ye,
      onClick: et ? me : r,
      ref: Bp(Q, ze),
      target: y,
      "data-discover": !I && o === "render" ? "true" : void 0
    });
    return D && !I ? x.createElement(x.Fragment, null, xe, x.createElement(Hp, {
      page: ye
    })) : xe;
  });
  hy.displayName = "Link";
  var qp = x.forwardRef(function({ "aria-current": r = "page", caseSensitive: o = false, className: f = "", end: s = false, style: d, to: m, viewTransition: g, children: v, ...y }, M) {
    let S = Vu(m, {
      relative: y.relative
    }), N = Ea(), L = x.useContext(Gu), { navigator: G, basename: Q } = x.useContext(nl), q = L != null && Fp(S) && g === true, $ = G.encodeLocation ? G.encodeLocation(S).pathname : S.pathname, W = N.pathname, I = L && L.navigation && L.navigation.location ? L.navigation.location.pathname : null;
    o || (W = W.toLowerCase(), I = I ? I.toLowerCase() : null, $ = $.toLowerCase()), I && Q && (I = jt(I, Q) || I);
    const Re = $ !== "/" && $.endsWith("/") ? $.length - 1 : $.length;
    let ye = W === $ || !s && W.startsWith($) && W.charAt(Re) === "/", be = I != null && (I === $ || !s && I.startsWith($) && I.charAt($.length) === "/"), ue = {
      isActive: ye,
      isPending: be,
      isTransitioning: q
    }, D = ye ? r : void 0, ze;
    typeof f == "function" ? ze = f(ue) : ze = [
      f,
      ye ? "active" : null,
      be ? "pending" : null,
      q ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let Ue = typeof d == "function" ? d(ue) : d;
    return x.createElement(hy, {
      ...y,
      "aria-current": D,
      className: ze,
      ref: M,
      style: Ue,
      to: m,
      viewTransition: g
    }, typeof v == "function" ? v(ue) : v);
  });
  qp.displayName = "NavLink";
  var Gp = x.forwardRef(({ discover: u = "render", fetcherKey: r, navigate: o, reloadDocument: f, replace: s, state: d, method: m = hr, action: g, onSubmit: v, relative: y, preventScrollReset: M, viewTransition: S, unstable_defaultShouldRevalidate: N, ...L }, G) => {
    let { unstable_useTransitions: Q } = x.useContext(nl), q = Kp(), $ = Jp(g, {
      relative: y
    }), W = m.toLowerCase() === "get" ? "get" : "post", I = typeof g == "string" && dy.test(g), Re = (ye) => {
      if (v && v(ye), ye.defaultPrevented) return;
      ye.preventDefault();
      let be = ye.nativeEvent.submitter, ue = (be == null ? void 0 : be.getAttribute("formmethod")) || m, D = () => q(be || ye.currentTarget, {
        fetcherKey: r,
        method: ue,
        navigate: o,
        replace: s,
        state: d,
        relative: y,
        preventScrollReset: M,
        viewTransition: S,
        unstable_defaultShouldRevalidate: N
      });
      Q && o !== false ? x.startTransition(() => D()) : D();
    };
    return x.createElement("form", {
      ref: G,
      method: W,
      action: $,
      onSubmit: f ? v : Re,
      ...L,
      "data-discover": !I && u === "render" ? "true" : void 0
    });
  });
  Gp.displayName = "Form";
  function Xp(u) {
    return `${u} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
  }
  function my(u) {
    let r = x.useContext(Va);
    return pe(r, Xp(u)), r;
  }
  function Qp(u, { target: r, replace: o, unstable_mask: f, state: s, preventScrollReset: d, relative: m, viewTransition: g, unstable_defaultShouldRevalidate: v, unstable_useTransitions: y } = {}) {
    let M = $g(), S = Ea(), N = Vu(u, {
      relative: m
    });
    return x.useCallback((L) => {
      if (Sp(L, r)) {
        L.preventDefault();
        let G = o !== void 0 ? o : dl(S) === dl(N), Q = () => M(u, {
          replace: G,
          unstable_mask: f,
          state: s,
          preventScrollReset: d,
          relative: m,
          viewTransition: g,
          unstable_defaultShouldRevalidate: v
        });
        y ? x.startTransition(() => Q()) : Q();
      }
    }, [
      S,
      M,
      N,
      o,
      f,
      s,
      r,
      u,
      d,
      m,
      g,
      v,
      y
    ]);
  }
  var Vp = 0, Zp = () => `__${String(++Vp)}__`;
  function Kp() {
    let { router: u } = my("useSubmit"), { basename: r } = x.useContext(nl), o = np(), f = u.fetch, s = u.navigate;
    return x.useCallback(async (d, m = {}) => {
      let { action: g, method: v, encType: y, formData: M, body: S } = zp(d, r);
      if (m.navigate === false) {
        let N = m.fetcherKey || Zp();
        await f(N, o, m.action || g, {
          unstable_defaultShouldRevalidate: m.unstable_defaultShouldRevalidate,
          preventScrollReset: m.preventScrollReset,
          formData: M,
          body: S,
          formMethod: m.method || v,
          formEncType: m.encType || y,
          flushSync: m.flushSync
        });
      } else await s(m.action || g, {
        unstable_defaultShouldRevalidate: m.unstable_defaultShouldRevalidate,
        preventScrollReset: m.preventScrollReset,
        formData: M,
        body: S,
        formMethod: m.method || v,
        formEncType: m.encType || y,
        replace: m.replace,
        state: m.state,
        fromRouteId: o,
        flushSync: m.flushSync,
        viewTransition: m.viewTransition
      });
    }, [
      f,
      s,
      r,
      o
    ]);
  }
  function Jp(u, { relative: r } = {}) {
    let { basename: o } = x.useContext(nl), f = x.useContext(Ql);
    pe(f, "useFormAction must be used inside a RouteContext");
    let [s] = f.matches.slice(-1), d = {
      ...Vu(u || ".", {
        relative: r
      })
    }, m = Ea();
    if (u == null) {
      d.search = m.search;
      let g = new URLSearchParams(d.search), v = g.getAll("index");
      if (v.some((M) => M === "")) {
        g.delete("index"), v.filter((S) => S).forEach((S) => g.append("index", S));
        let M = g.toString();
        d.search = M ? `?${M}` : "";
      }
    }
    return (!u || u === ".") && s.route.index && (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"), o !== "/" && (d.pathname = d.pathname === "/" ? o : sl([
      o,
      d.pathname
    ])), dl(d);
  }
  function Fp(u, { relative: r } = {}) {
    let o = x.useContext(Pc);
    pe(o != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
    let { basename: f } = my("useViewTransitionState"), s = Vu(u, {
      relative: r
    });
    if (!o.isTransitioning) return false;
    let d = jt(o.currentLocation.pathname, f) || o.currentLocation.pathname, m = jt(o.nextLocation.pathname, f) || o.nextLocation.pathname;
    return yr(s.pathname, m) != null || yr(s.pathname, d) != null;
  }
  $p = Om();
  n1 = Am($p);
})();
export {
  n1 as $,
  hy as L,
  D0 as R,
  __tla,
  $p as a,
  M0 as b,
  Pp as c,
  Kc as d,
  Wp as e,
  Ea as f,
  Am as g,
  Ip as h,
  t1 as i,
  kp as j,
  mp as k,
  a1 as l,
  l1 as m,
  e1 as n,
  x as r,
  $g as u
};
