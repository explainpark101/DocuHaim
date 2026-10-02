let zy, w0, B0, i1, d1, S1, o1, p1, wm, Vl, h1, s1, y1, Tp, ju, yp, g1, v1, m1, x, b1, sy, E1;
let __tla = (async () => {
  function x0(u, r) {
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
  o1 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
  wm = function(u) {
    return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
  };
  var Uc = {
    exports: {}
  }, Cu = {};
  var Jh;
  function N0() {
    if (Jh) return Cu;
    Jh = 1;
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
  var Fh;
  function H0() {
    return Fh || (Fh = 1, Uc.exports = N0()), Uc.exports;
  }
  let xc, pe;
  s1 = H0();
  xc = {
    exports: {}
  };
  pe = {};
  var $h;
  function L0() {
    if ($h) return pe;
    $h = 1;
    var u = /* @__PURE__ */ Symbol.for("react.transitional.element"), r = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), f = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.consumer"), m = /* @__PURE__ */ Symbol.for("react.context"), g = /* @__PURE__ */ Symbol.for("react.forward_ref"), v = /* @__PURE__ */ Symbol.for("react.suspense"), y = /* @__PURE__ */ Symbol.for("react.memo"), T = /* @__PURE__ */ Symbol.for("react.lazy"), S = /* @__PURE__ */ Symbol.for("react.activity"), A = Symbol.iterator;
    function H(E) {
      return E === null || typeof E != "object" ? null : (E = A && E[A] || E["@@iterator"], typeof E == "function" ? E : null);
    }
    var q = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    }, X = Object.assign, G = {};
    function $(E, B, K) {
      this.props = E, this.context = B, this.refs = G, this.updater = K || q;
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
    function k(E, B, K) {
      this.props = E, this.context = B, this.refs = G, this.updater = K || q;
    }
    var ge = k.prototype = new W();
    ge.constructor = k, X(ge, $.prototype), ge.isPureReactComponent = true;
    var me = Array.isArray;
    function oe() {
    }
    var le = {
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
    function ve(E) {
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
      return typeof E == "object" && E !== null && E.key != null ? ve("" + E.key) : B.toString(36);
    }
    function ye(E) {
      switch (E.status) {
        case "fulfilled":
          return E.value;
        case "rejected":
          throw E.reason;
        default:
          switch (typeof E.status == "string" ? E.then(oe, oe) : (E.status = "pending", E.then(function(B) {
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
    function N(E, B, K, F, se) {
      var he = typeof E;
      (he === "undefined" || he === "boolean") && (E = null);
      var Te = false;
      if (E === null) Te = true;
      else switch (he) {
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
            case T:
              return Te = E._init, N(Te(E._payload), B, K, F, se);
          }
      }
      if (Te) return se = se(E), Te = F === "" ? "." + xe(E, 0) : F, me(se) ? (K = "", Te != null && (K = Te.replace(et, "$&/") + "/"), N(se, B, K, "", function(Ra) {
        return Ra;
      })) : se != null && (Ve(se) && (se = Ue(se, K + (se.key == null || E && E.key === se.key ? "" : ("" + se.key).replace(et, "$&/") + "/") + Te)), B.push(se)), 1;
      Te = 0;
      var ft = F === "" ? "." : F + ":";
      if (me(E)) for (var Ze = 0; Ze < E.length; Ze++) F = E[Ze], he = ft + xe(F, Ze), Te += N(F, B, K, he, se);
      else if (Ze = H(E), typeof Ze == "function") for (E = Ze.call(E), Ze = 0; !(F = E.next()).done; ) F = F.value, he = ft + xe(F, Ze++), Te += N(F, B, K, he, se);
      else if (he === "object") {
        if (typeof E.then == "function") return N(ye(E), B, K, F, se);
        throw B = String(E), Error("Objects are not valid as a React child (found: " + (B === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : B) + "). If you meant to render a collection of children, use an array instead.");
      }
      return Te;
    }
    function V(E, B, K) {
      if (E == null) return E;
      var F = [], se = 0;
      return N(E, F, "", "", function(he) {
        return B.call(K, he, se++);
      }), F;
    }
    function ae(E) {
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
    var ne = typeof reportError == "function" ? reportError : function(E) {
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
    }, Ee = {
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
    return pe.Activity = S, pe.Children = Ee, pe.Component = $, pe.Fragment = o, pe.Profiler = s, pe.PureComponent = k, pe.StrictMode = f, pe.Suspense = v, pe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = le, pe.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(E) {
        return le.H.useMemoCache(E);
      }
    }, pe.cache = function(E) {
      return function() {
        return E.apply(null, arguments);
      };
    }, pe.cacheSignal = function() {
      return null;
    }, pe.cloneElement = function(E, B, K) {
      if (E == null) throw Error("The argument must be a React element, but you passed " + E + ".");
      var F = X({}, E.props), se = E.key;
      if (B != null) for (he in B.key !== void 0 && (se = "" + B.key), B) !D.call(B, he) || he === "key" || he === "__self" || he === "__source" || he === "ref" && B.ref === void 0 || (F[he] = B[he]);
      var he = arguments.length - 2;
      if (he === 1) F.children = K;
      else if (1 < he) {
        for (var Te = Array(he), ft = 0; ft < he; ft++) Te[ft] = arguments[ft + 2];
        F.children = Te;
      }
      return ze(E.type, se, F);
    }, pe.createContext = function(E) {
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
    }, pe.createElement = function(E, B, K) {
      var F, se = {}, he = null;
      if (B != null) for (F in B.key !== void 0 && (he = "" + B.key), B) D.call(B, F) && F !== "key" && F !== "__self" && F !== "__source" && (se[F] = B[F]);
      var Te = arguments.length - 2;
      if (Te === 1) se.children = K;
      else if (1 < Te) {
        for (var ft = Array(Te), Ze = 0; Ze < Te; Ze++) ft[Ze] = arguments[Ze + 2];
        se.children = ft;
      }
      if (E && E.defaultProps) for (F in Te = E.defaultProps, Te) se[F] === void 0 && (se[F] = Te[F]);
      return ze(E, he, se);
    }, pe.createRef = function() {
      return {
        current: null
      };
    }, pe.forwardRef = function(E) {
      return {
        $$typeof: g,
        render: E
      };
    }, pe.isValidElement = Ve, pe.lazy = function(E) {
      return {
        $$typeof: T,
        _payload: {
          _status: -1,
          _result: E
        },
        _init: ae
      };
    }, pe.memo = function(E, B) {
      return {
        $$typeof: y,
        type: E,
        compare: B === void 0 ? null : B
      };
    }, pe.startTransition = function(E) {
      var B = le.T, K = {};
      le.T = K;
      try {
        var F = E(), se = le.S;
        se !== null && se(K, F), typeof F == "object" && F !== null && typeof F.then == "function" && F.then(oe, ne);
      } catch (he) {
        ne(he);
      } finally {
        B !== null && K.types !== null && (B.types = K.types), le.T = B;
      }
    }, pe.unstable_useCacheRefresh = function() {
      return le.H.useCacheRefresh();
    }, pe.use = function(E) {
      return le.H.use(E);
    }, pe.useActionState = function(E, B, K) {
      return le.H.useActionState(E, B, K);
    }, pe.useCallback = function(E, B) {
      return le.H.useCallback(E, B);
    }, pe.useContext = function(E) {
      return le.H.useContext(E);
    }, pe.useDebugValue = function() {
    }, pe.useDeferredValue = function(E, B) {
      return le.H.useDeferredValue(E, B);
    }, pe.useEffect = function(E, B) {
      return le.H.useEffect(E, B);
    }, pe.useEffectEvent = function(E) {
      return le.H.useEffectEvent(E);
    }, pe.useId = function() {
      return le.H.useId();
    }, pe.useImperativeHandle = function(E, B, K) {
      return le.H.useImperativeHandle(E, B, K);
    }, pe.useInsertionEffect = function(E, B) {
      return le.H.useInsertionEffect(E, B);
    }, pe.useLayoutEffect = function(E, B) {
      return le.H.useLayoutEffect(E, B);
    }, pe.useMemo = function(E, B) {
      return le.H.useMemo(E, B);
    }, pe.useOptimistic = function(E, B) {
      return le.H.useOptimistic(E, B);
    }, pe.useReducer = function(E, B, K) {
      return le.H.useReducer(E, B, K);
    }, pe.useRef = function(E) {
      return le.H.useRef(E);
    }, pe.useState = function(E) {
      return le.H.useState(E);
    }, pe.useSyncExternalStore = function(E, B, K) {
      return le.H.useSyncExternalStore(E, B, K);
    }, pe.useTransition = function() {
      return le.H.useTransition();
    }, pe.version = "19.2.4", pe;
  }
  var Wh;
  function Yu() {
    return Wh || (Wh = 1, xc.exports = L0()), xc.exports;
  }
  x = Yu();
  w0 = wm(x);
  B0 = x0({
    __proto__: null,
    default: w0
  }, [
    x
  ]);
  var Nc = {
    exports: {}
  }, Uu = {}, Hc = {
    exports: {}
  }, Lc = {};
  var kh;
  function j0() {
    return kh || (kh = 1, (function(u) {
      function r(N, V) {
        var ae = N.length;
        N.push(V);
        e: for (; 0 < ae; ) {
          var ne = ae - 1 >>> 1, Ee = N[ne];
          if (0 < s(Ee, V)) N[ne] = V, N[ae] = Ee, ae = ne;
          else break e;
        }
      }
      function o(N) {
        return N.length === 0 ? null : N[0];
      }
      function f(N) {
        if (N.length === 0) return null;
        var V = N[0], ae = N.pop();
        if (ae !== V) {
          N[0] = ae;
          e: for (var ne = 0, Ee = N.length, E = Ee >>> 1; ne < E; ) {
            var B = 2 * (ne + 1) - 1, K = N[B], F = B + 1, se = N[F];
            if (0 > s(K, ae)) F < Ee && 0 > s(se, K) ? (N[ne] = se, N[F] = ae, ne = F) : (N[ne] = K, N[B] = ae, ne = B);
            else if (F < Ee && 0 > s(se, ae)) N[ne] = se, N[F] = ae, ne = F;
            else break e;
          }
        }
        return V;
      }
      function s(N, V) {
        var ae = N.sortIndex - V.sortIndex;
        return ae !== 0 ? ae : N.id - V.id;
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
      var v = [], y = [], T = 1, S = null, A = 3, H = false, q = false, X = false, G = false, $ = typeof setTimeout == "function" ? setTimeout : null, W = typeof clearTimeout == "function" ? clearTimeout : null, k = typeof setImmediate < "u" ? setImmediate : null;
      function ge(N) {
        for (var V = o(y); V !== null; ) {
          if (V.callback === null) f(y);
          else if (V.startTime <= N) f(y), V.sortIndex = V.expirationTime, r(v, V);
          else break;
          V = o(y);
        }
      }
      function me(N) {
        if (X = false, ge(N), !q) if (o(v) !== null) q = true, oe || (oe = true, ve());
        else {
          var V = o(y);
          V !== null && ye(me, V.startTime - N);
        }
      }
      var oe = false, le = -1, D = 5, ze = -1;
      function Ue() {
        return G ? true : !(u.unstable_now() - ze < D);
      }
      function Ve() {
        if (G = false, oe) {
          var N = u.unstable_now();
          ze = N;
          var V = true;
          try {
            e: {
              q = false, X && (X = false, W(le), le = -1), H = true;
              var ae = A;
              try {
                t: {
                  for (ge(N), S = o(v); S !== null && !(S.expirationTime > N && Ue()); ) {
                    var ne = S.callback;
                    if (typeof ne == "function") {
                      S.callback = null, A = S.priorityLevel;
                      var Ee = ne(S.expirationTime <= N);
                      if (N = u.unstable_now(), typeof Ee == "function") {
                        S.callback = Ee, ge(N), V = true;
                        break t;
                      }
                      S === o(v) && f(v), ge(N);
                    } else f(v);
                    S = o(v);
                  }
                  if (S !== null) V = true;
                  else {
                    var E = o(y);
                    E !== null && ye(me, E.startTime - N), V = false;
                  }
                }
                break e;
              } finally {
                S = null, A = ae, H = false;
              }
              V = void 0;
            }
          } finally {
            V ? ve() : oe = false;
          }
        }
      }
      var ve;
      if (typeof k == "function") ve = function() {
        k(Ve);
      };
      else if (typeof MessageChannel < "u") {
        var et = new MessageChannel(), xe = et.port2;
        et.port1.onmessage = Ve, ve = function() {
          xe.postMessage(null);
        };
      } else ve = function() {
        $(Ve, 0);
      };
      function ye(N, V) {
        le = $(function() {
          N(u.unstable_now());
        }, V);
      }
      u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(N) {
        N.callback = null;
      }, u.unstable_forceFrameRate = function(N) {
        0 > N || 125 < N ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < N ? Math.floor(1e3 / N) : 5;
      }, u.unstable_getCurrentPriorityLevel = function() {
        return A;
      }, u.unstable_next = function(N) {
        switch (A) {
          case 1:
          case 2:
          case 3:
            var V = 3;
            break;
          default:
            V = A;
        }
        var ae = A;
        A = V;
        try {
          return N();
        } finally {
          A = ae;
        }
      }, u.unstable_requestPaint = function() {
        G = true;
      }, u.unstable_runWithPriority = function(N, V) {
        switch (N) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            N = 3;
        }
        var ae = A;
        A = N;
        try {
          return V();
        } finally {
          A = ae;
        }
      }, u.unstable_scheduleCallback = function(N, V, ae) {
        var ne = u.unstable_now();
        switch (typeof ae == "object" && ae !== null ? (ae = ae.delay, ae = typeof ae == "number" && 0 < ae ? ne + ae : ne) : ae = ne, N) {
          case 1:
            var Ee = -1;
            break;
          case 2:
            Ee = 250;
            break;
          case 5:
            Ee = 1073741823;
            break;
          case 4:
            Ee = 1e4;
            break;
          default:
            Ee = 5e3;
        }
        return Ee = ae + Ee, N = {
          id: T++,
          callback: V,
          priorityLevel: N,
          startTime: ae,
          expirationTime: Ee,
          sortIndex: -1
        }, ae > ne ? (N.sortIndex = ae, r(y, N), o(v) === null && N === o(y) && (X ? (W(le), le = -1) : X = true, ye(me, ae - ne))) : (N.sortIndex = Ee, r(v, N), q || H || (q = true, oe || (oe = true, ve()))), N;
      }, u.unstable_shouldYield = Ue, u.unstable_wrapCallback = function(N) {
        var V = A;
        return function() {
          var ae = A;
          A = V;
          try {
            return N.apply(this, arguments);
          } finally {
            A = ae;
          }
        };
      };
    })(Lc)), Lc;
  }
  var Ph;
  function Y0() {
    return Ph || (Ph = 1, Hc.exports = j0()), Hc.exports;
  }
  var wc = {
    exports: {}
  }, Dt = {};
  var Ih;
  function q0() {
    if (Ih) return Dt;
    Ih = 1;
    var u = Yu();
    function r(v) {
      var y = "https://react.dev/errors/" + v;
      if (1 < arguments.length) {
        y += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var T = 2; T < arguments.length; T++) y += "&args[]=" + encodeURIComponent(arguments[T]);
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
    function d(v, y, T) {
      var S = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: s,
        key: S == null ? null : "" + S,
        children: v,
        containerInfo: y,
        implementation: T
      };
    }
    var m = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function g(v, y) {
      if (v === "font") return "";
      if (typeof y == "string") return y === "use-credentials" ? y : "";
    }
    return Dt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f, Dt.createPortal = function(v, y) {
      var T = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11) throw Error(r(299));
      return d(v, y, null, T);
    }, Dt.flushSync = function(v) {
      var y = m.T, T = f.p;
      try {
        if (m.T = null, f.p = 2, v) return v();
      } finally {
        m.T = y, f.p = T, f.d.f();
      }
    }, Dt.preconnect = function(v, y) {
      typeof v == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, f.d.C(v, y));
    }, Dt.prefetchDNS = function(v) {
      typeof v == "string" && f.d.D(v);
    }, Dt.preinit = function(v, y) {
      if (typeof v == "string" && y && typeof y.as == "string") {
        var T = y.as, S = g(T, y.crossOrigin), A = typeof y.integrity == "string" ? y.integrity : void 0, H = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
        T === "style" ? f.d.S(v, typeof y.precedence == "string" ? y.precedence : void 0, {
          crossOrigin: S,
          integrity: A,
          fetchPriority: H
        }) : T === "script" && f.d.X(v, {
          crossOrigin: S,
          integrity: A,
          fetchPriority: H,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0
        });
      }
    }, Dt.preinitModule = function(v, y) {
      if (typeof v == "string") if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var T = g(y.as, y.crossOrigin);
          f.d.M(v, {
            crossOrigin: T,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0
          });
        }
      } else y == null && f.d.M(v);
    }, Dt.preload = function(v, y) {
      if (typeof v == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
        var T = y.as, S = g(T, y.crossOrigin);
        f.d.L(v, T, {
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
        var T = g(y.as, y.crossOrigin);
        f.d.m(v, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: T,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0
        });
      } else f.d.m(v);
    }, Dt.requestFormReset = function(v) {
      f.d.r(v);
    }, Dt.unstable_batchedUpdates = function(v, y) {
      return v(y);
    }, Dt.useFormState = function(v, y, T) {
      return m.H.useFormState(v, y, T);
    }, Dt.useFormStatus = function() {
      return m.H.useHostTransitionStatus();
    }, Dt.version = "19.2.4", Dt;
  }
  var em;
  function Bm() {
    if (em) return wc.exports;
    em = 1;
    function u() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (r) {
        console.error(r);
      }
    }
    return u(), wc.exports = q0(), wc.exports;
  }
  var tm;
  function G0() {
    if (tm) return Uu;
    tm = 1;
    var u = Y0(), r = Yu(), o = Bm();
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
    function T(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (t = T(e), t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var S = Object.assign, A = /* @__PURE__ */ Symbol.for("react.element"), H = /* @__PURE__ */ Symbol.for("react.transitional.element"), q = /* @__PURE__ */ Symbol.for("react.portal"), X = /* @__PURE__ */ Symbol.for("react.fragment"), G = /* @__PURE__ */ Symbol.for("react.strict_mode"), $ = /* @__PURE__ */ Symbol.for("react.profiler"), W = /* @__PURE__ */ Symbol.for("react.consumer"), k = /* @__PURE__ */ Symbol.for("react.context"), ge = /* @__PURE__ */ Symbol.for("react.forward_ref"), me = /* @__PURE__ */ Symbol.for("react.suspense"), oe = /* @__PURE__ */ Symbol.for("react.suspense_list"), le = /* @__PURE__ */ Symbol.for("react.memo"), D = /* @__PURE__ */ Symbol.for("react.lazy"), ze = /* @__PURE__ */ Symbol.for("react.activity"), Ue = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Ve = Symbol.iterator;
    function ve(e) {
      return e === null || typeof e != "object" ? null : (e = Ve && e[Ve] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var et = /* @__PURE__ */ Symbol.for("react.client.reference");
    function xe(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.$$typeof === et ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case X:
          return "Fragment";
        case $:
          return "Profiler";
        case G:
          return "StrictMode";
        case me:
          return "Suspense";
        case oe:
          return "SuspenseList";
        case ze:
          return "Activity";
      }
      if (typeof e == "object") switch (e.$$typeof) {
        case q:
          return "Portal";
        case k:
          return e.displayName || "Context";
        case W:
          return (e._context.displayName || "Context") + ".Consumer";
        case ge:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case le:
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
    var ye = Array.isArray, N = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ae = {
      pending: false,
      data: null,
      method: null,
      action: null
    }, ne = [], Ee = -1;
    function E(e) {
      return {
        current: e
      };
    }
    function B(e) {
      0 > Ee || (e.current = ne[Ee], ne[Ee] = null, Ee--);
    }
    function K(e, t) {
      Ee++, ne[Ee] = e.current, e.current = t;
    }
    var F = E(null), se = E(null), he = E(null), Te = E(null);
    function ft(e, t) {
      switch (K(he, t), K(se, e), K(F, null), t.nodeType) {
        case 9:
        case 11:
          e = (e = t.documentElement) && (e = e.namespaceURI) ? vh(e) : 0;
          break;
        default:
          if (e = t.tagName, t = t.namespaceURI) t = vh(t), e = gh(t, e);
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
      B(F), B(se), B(he);
    }
    function Ra(e) {
      e.memoizedState !== null && K(Te, e);
      var t = F.current, l = gh(t, e.type);
      t !== l && (K(se, e), K(F, l));
    }
    function Za(e) {
      se.current === e && (B(F), B(se)), Te.current === e && (B(Te), Du._currentValue = ae);
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
                  } catch (L) {
                    var C = L;
                  }
                  Reflect.construct(e, [], Y);
                } else {
                  try {
                    Y.call();
                  } catch (L) {
                    C = L;
                  }
                  e.call(Y.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (L) {
                  C = L;
                }
                (Y = e()) && typeof Y.catch == "function" && Y.catch(function() {
                });
              }
            } catch (L) {
              if (L && C && typeof L.stack == "string") return [
                L.stack,
                C.stack
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
    function Ku(e) {
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
    var Yn = Object.prototype.hasOwnProperty, Ja = u.unstable_scheduleCallback, qn = u.unstable_cancelCallback, Sr = u.unstable_shouldYield, br = u.unstable_requestPaint, _t = u.unstable_now, Rl = u.unstable_getCurrentPriorityLevel, Zl = u.unstable_ImmediatePriority, Gn = u.unstable_UserBlockingPriority, Kl = u.unstable_NormalPriority, ul = u.unstable_LowPriority, Jt = u.unstable_IdlePriority, Ju = u.log, Er = u.unstable_setDisableYieldValue, zl = null, Ot = null;
    function gt(e) {
      if (typeof Ju == "function" && Er(e), Ot && typeof Ot.setStrictMode == "function") try {
        Ot.setStrictMode(zl, e);
      } catch {
      }
    }
    var Tt = Math.clz32 ? Math.clz32 : Rr, Fu = Math.log, $u = Math.LN2;
    function Rr(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (Fu(e) / $u | 0) | 0;
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
    function Jl(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function zr(e, t) {
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
    function Fl(e) {
      for (var t = [], l = 0; 31 > l; l++) t.push(e);
      return t;
    }
    function ml(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function Wu(e, t, l, a, n, i) {
      var c = e.pendingLanes;
      e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
      var h = e.entanglements, p = e.expirationTimes, O = e.hiddenUpdates;
      for (l = c & ~l; 0 < l; ) {
        var w = 31 - Tt(l), Y = 1 << w;
        h[w] = 0, p[w] = -1;
        var C = O[w];
        if (C !== null) for (O[w] = null, w = 0; w < C.length; w++) {
          var L = C[w];
          L !== null && (L.lane &= -536870913);
        }
        l &= ~Y;
      }
      a !== 0 && ku(e, a, 0), i !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(c & ~t));
    }
    function ku(e, t, l) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var a = 31 - Tt(t);
      e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | l & 261930;
    }
    function Pu(e, t) {
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
    function U(e) {
      return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
    }
    function Q() {
      var e = V.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : qh(e.type));
    }
    function Z(e, t) {
      var l = V.p;
      try {
        return V.p = e, t();
      } finally {
        V.p = l;
      }
    }
    var ee = Math.random().toString(36).slice(2), J = "__reactFiber$" + ee, P = "__reactProps$" + ee, I = "__reactContainer$" + ee, re = "__reactEvents$" + ee, ce = "__reactListeners$" + ee, ie = "__reactHandles$" + ee, Le = "__reactResources$" + ee, Me = "__reactMarker$" + ee;
    function Ke(e) {
      delete e[J], delete e[P], delete e[re], delete e[ce], delete e[ie];
    }
    function $e(e) {
      var t = e[J];
      if (t) return t;
      for (var l = e.parentNode; l; ) {
        if (t = l[I] || l[J]) {
          if (l = t.alternate, t.child !== null || l !== null && l.child !== null) for (e = Th(e); e !== null; ) {
            if (l = e[J]) return l;
            e = Th(e);
          }
          return t;
        }
        e = l, l = e.parentNode;
      }
      return null;
    }
    function tt(e) {
      if (e = e[J] || e[I]) {
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
    var $l = /* @__PURE__ */ new Set(), rl = {};
    function pt(e, t) {
      yl(e, t), yl(e + "Capture", t);
    }
    function yl(e, t) {
      for (rl[e] = t, e = 0; e < t.length; e++) $l.add(t[e]);
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
    function ut(e, t, l) {
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
    function Iu(e) {
      if (!e) return false;
      var t = e._valueTracker;
      if (!t) return true;
      var l = t.getValue(), a = "";
      return e && (a = We(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== l ? (t.setValue(e), true) : false;
    }
    function ei(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Dy = /[\n"\\]/g;
    function Ft(e) {
      return e.replace(Dy, function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      });
    }
    function Tr(e, t, l, a, n, i, c, h) {
      e.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? e.type = c : e.removeAttribute("type"), t != null ? c === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + ct(t)) : e.value !== "" + ct(t) && (e.value = "" + ct(t)) : c !== "submit" && c !== "reset" || e.removeAttribute("value"), t != null ? Mr(e, c, ct(t)) : l != null ? Mr(e, c, ct(l)) : a != null && e.removeAttribute("value"), n == null && i != null && (e.defaultChecked = !!i), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.name = "" + ct(h) : e.removeAttribute("name");
    }
    function co(e, t, l, a, n, i, c, h) {
      if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.type = i), t != null || l != null) {
        if (!(i !== "submit" && i !== "reset" || t != null)) {
          ka(e);
          return;
        }
        l = l != null ? "" + ct(l) : "", t = t != null ? "" + ct(t) : l, h || t === e.value || (e.value = t), e.defaultValue = t;
      }
      a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = h ? e.checked : !!a, e.defaultChecked = !!a, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.name = c), ka(e);
    }
    function Mr(e, t, l) {
      t === "number" && ei(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
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
    function oo(e, t, l) {
      if (t != null && (t = "" + ct(t), t !== e.value && (e.value = t), l == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = l != null ? "" + ct(l) : "";
    }
    function so(e, t, l, a) {
      if (t == null) {
        if (a != null) {
          if (l != null) throw Error(f(92));
          if (ye(a)) {
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
    var Ay = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
    function ho(e, t, l) {
      var a = t.indexOf("--") === 0;
      l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || Ay.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
    }
    function mo(e, t, l) {
      if (t != null && typeof t != "object") throw Error(f(62));
      if (e = e.style, l != null) {
        for (var a in l) !l.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
        for (var n in t) a = t[n], t.hasOwnProperty(n) && l[n] !== a && ho(e, n, a);
      } else for (var i in t) t.hasOwnProperty(i) && ho(e, i, t[i]);
    }
    function Dr(e) {
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
    var _y = /* @__PURE__ */ new Map([
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
    ]), Oy = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function ti(e) {
      return Oy.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function Ml() {
    }
    var Ar = null;
    function _r(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var en = null, tn = null;
    function yo(e) {
      var t = tt(e);
      if (t && (e = t.stateNode)) {
        var l = e[P] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (Tr(e, l.value, l.defaultValue, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name), t = l.name, l.type === "radio" && t != null) {
              for (l = e; l.parentNode; ) l = l.parentNode;
              for (l = l.querySelectorAll('input[name="' + Ft("" + t) + '"][type="radio"]'), t = 0; t < l.length; t++) {
                var a = l[t];
                if (a !== e && a.form === e.form) {
                  var n = a[P] || null;
                  if (!n) throw Error(f(90));
                  Tr(a, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name);
                }
              }
              for (t = 0; t < l.length; t++) a = l[t], a.form === e.form && Iu(a);
            }
            break e;
          case "textarea":
            oo(e, l.value, l.defaultValue);
            break e;
          case "select":
            t = l.value, t != null && Pa(e, !!l.multiple, t, false);
        }
      }
    }
    var Or = false;
    function vo(e, t, l) {
      if (Or) return e(t, l);
      Or = true;
      try {
        var a = e(t);
        return a;
      } finally {
        if (Or = false, (en !== null || tn !== null) && (Xi(), en && (t = en, e = tn, tn = en = null, yo(t), e))) for (t = 0; t < e.length; t++) yo(e[t]);
      }
    }
    function Qn(e, t) {
      var l = e.stateNode;
      if (l === null) return null;
      var a = l[P] || null;
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
    var Dl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Cr = false;
    if (Dl) try {
      var Vn = {};
      Object.defineProperty(Vn, "passive", {
        get: function() {
          Cr = true;
        }
      }), window.addEventListener("test", Vn, Vn), window.removeEventListener("test", Vn, Vn);
    } catch {
      Cr = false;
    }
    var Wl = null, Ur = null, li = null;
    function go() {
      if (li) return li;
      var e, t = Ur, l = t.length, a, n = "value" in Wl ? Wl.value : Wl.textContent, i = n.length;
      for (e = 0; e < l && t[e] === n[e]; e++) ;
      var c = l - e;
      for (a = 1; a <= c && t[l - a] === n[i - a]; a++) ;
      return li = n.slice(e, 1 < a ? 1 - a : void 0);
    }
    function ai(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function ni() {
      return true;
    }
    function po() {
      return false;
    }
    function xt(e) {
      function t(l, a, n, i, c) {
        this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = i, this.target = c, this.currentTarget = null;
        for (var h in e) e.hasOwnProperty(h) && (l = e[h], this[h] = l ? l(i) : i[h]);
        return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === false) ? ni : po, this.isPropagationStopped = po, this;
      }
      return S(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = true;
          var l = this.nativeEvent;
          l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = false), this.isDefaultPrevented = ni);
        },
        stopPropagation: function() {
          var l = this.nativeEvent;
          l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = true), this.isPropagationStopped = ni);
        },
        persist: function() {
        },
        isPersistent: ni
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
    }, ui = xt(Aa), Zn = S({}, Aa, {
      view: 0,
      detail: 0
    }), Cy = xt(Zn), xr, Nr, Kn, ii = S({}, Zn, {
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
      getModifierState: Lr,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== Kn && (Kn && e.type === "mousemove" ? (xr = e.screenX - Kn.screenX, Nr = e.screenY - Kn.screenY) : Nr = xr = 0, Kn = e), xr);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Nr;
      }
    }), So = xt(ii), Uy = S({}, ii, {
      dataTransfer: 0
    }), xy = xt(Uy), Ny = S({}, Zn, {
      relatedTarget: 0
    }), Hr = xt(Ny), Hy = S({}, Aa, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Ly = xt(Hy), wy = S({}, Aa, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), By = xt(wy), jy = S({}, Aa, {
      data: 0
    }), bo = xt(jy), Yy = {
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
    }, qy = {
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
    }, Gy = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Xy(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = Gy[e]) ? !!t[e] : false;
    }
    function Lr() {
      return Xy;
    }
    var Qy = S({}, Zn, {
      key: function(e) {
        if (e.key) {
          var t = Yy[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = ai(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? qy[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Lr,
      charCode: function(e) {
        return e.type === "keypress" ? ai(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? ai(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Vy = xt(Qy), Zy = S({}, ii, {
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
    }), Eo = xt(Zy), Ky = S({}, Zn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Lr
    }), Jy = xt(Ky), Fy = S({}, Aa, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), $y = xt(Fy), Wy = S({}, ii, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), ky = xt(Wy), Py = S({}, Aa, {
      newState: 0,
      oldState: 0
    }), Iy = xt(Py), ev = [
      9,
      13,
      27,
      32
    ], wr = Dl && "CompositionEvent" in window, Jn = null;
    Dl && "documentMode" in document && (Jn = document.documentMode);
    var tv = Dl && "TextEvent" in window && !Jn, Ro = Dl && (!wr || Jn && 8 < Jn && 11 >= Jn), zo = " ", To = false;
    function Mo(e, t) {
      switch (e) {
        case "keyup":
          return ev.indexOf(t.keyCode) !== -1;
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
    function Do(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    var ln = false;
    function lv(e, t) {
      switch (e) {
        case "compositionend":
          return Do(t);
        case "keypress":
          return t.which !== 32 ? null : (To = true, zo);
        case "textInput":
          return e = t.data, e === zo && To ? null : e;
        default:
          return null;
      }
    }
    function av(e, t) {
      if (ln) return e === "compositionend" || !wr && Mo(e, t) ? (e = go(), li = Ur = Wl = null, ln = false, e) : null;
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
          return Ro && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var nv = {
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
    function Ao(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!nv[e.type] : t === "textarea";
    }
    function _o(e, t, l, a) {
      en ? tn ? tn.push(a) : tn = [
        a
      ] : en = a, t = $i(t, "onChange"), 0 < t.length && (l = new ui("onChange", "change", null, l, a), e.push({
        event: l,
        listeners: t
      }));
    }
    var Fn = null, $n = null;
    function uv(e) {
      oh(e, 0);
    }
    function ri(e) {
      var t = He(e);
      if (Iu(t)) return e;
    }
    function Oo(e, t) {
      if (e === "change") return t;
    }
    var Co = false;
    if (Dl) {
      var Br;
      if (Dl) {
        var jr = "oninput" in document;
        if (!jr) {
          var Uo = document.createElement("div");
          Uo.setAttribute("oninput", "return;"), jr = typeof Uo.oninput == "function";
        }
        Br = jr;
      } else Br = false;
      Co = Br && (!document.documentMode || 9 < document.documentMode);
    }
    function xo() {
      Fn && (Fn.detachEvent("onpropertychange", No), $n = Fn = null);
    }
    function No(e) {
      if (e.propertyName === "value" && ri($n)) {
        var t = [];
        _o(t, $n, e, _r(e)), vo(uv, t);
      }
    }
    function iv(e, t, l) {
      e === "focusin" ? (xo(), Fn = t, $n = l, Fn.attachEvent("onpropertychange", No)) : e === "focusout" && xo();
    }
    function rv(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown") return ri($n);
    }
    function fv(e, t) {
      if (e === "click") return ri(t);
    }
    function cv(e, t) {
      if (e === "input" || e === "change") return ri(t);
    }
    function ov(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Yt = typeof Object.is == "function" ? Object.is : ov;
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
    function Ho(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Lo(e, t) {
      var l = Ho(e);
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
        l = Ho(l);
      }
    }
    function wo(e, t) {
      return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? wo(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
    }
    function Bo(e) {
      e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
      for (var t = ei(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var l = typeof t.contentWindow.location.href == "string";
        } catch {
          l = false;
        }
        if (l) e = t.contentWindow;
        else break;
        t = ei(e.document);
      }
      return t;
    }
    function Yr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    var sv = Dl && "documentMode" in document && 11 >= document.documentMode, an = null, qr = null, kn = null, Gr = false;
    function jo(e, t, l) {
      var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
      Gr || an == null || an !== ei(a) || (a = an, "selectionStart" in a && Yr(a) ? a = {
        start: a.selectionStart,
        end: a.selectionEnd
      } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      }), kn && Wn(kn, a) || (kn = a, a = $i(qr, "onSelect"), 0 < a.length && (t = new ui("onSelect", "select", null, t, l), e.push({
        event: t,
        listeners: a
      }), t.target = an)));
    }
    function _a(e, t) {
      var l = {};
      return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
    }
    var nn = {
      animationend: _a("Animation", "AnimationEnd"),
      animationiteration: _a("Animation", "AnimationIteration"),
      animationstart: _a("Animation", "AnimationStart"),
      transitionrun: _a("Transition", "TransitionRun"),
      transitionstart: _a("Transition", "TransitionStart"),
      transitioncancel: _a("Transition", "TransitionCancel"),
      transitionend: _a("Transition", "TransitionEnd")
    }, Xr = {}, Yo = {};
    Dl && (Yo = document.createElement("div").style, "AnimationEvent" in window || (delete nn.animationend.animation, delete nn.animationiteration.animation, delete nn.animationstart.animation), "TransitionEvent" in window || delete nn.transitionend.transition);
    function Oa(e) {
      if (Xr[e]) return Xr[e];
      if (!nn[e]) return e;
      var t = nn[e], l;
      for (l in t) if (t.hasOwnProperty(l) && l in Yo) return Xr[e] = t[l];
      return e;
    }
    var qo = Oa("animationend"), Go = Oa("animationiteration"), Xo = Oa("animationstart"), dv = Oa("transitionrun"), hv = Oa("transitionstart"), mv = Oa("transitioncancel"), Qo = Oa("transitionend"), Vo = /* @__PURE__ */ new Map(), Qr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    Qr.push("scrollEnd");
    function fl(e, t) {
      Vo.set(e, t), pt(t, [
        e
      ]);
    }
    var fi = typeof reportError == "function" ? reportError : function(e) {
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
    }, $t = [], un = 0, Vr = 0;
    function ci() {
      for (var e = un, t = Vr = un = 0; t < e; ) {
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
        i !== 0 && Zo(l, n, i);
      }
    }
    function oi(e, t, l, a) {
      $t[un++] = e, $t[un++] = t, $t[un++] = l, $t[un++] = a, Vr |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
    }
    function Zr(e, t, l, a) {
      return oi(e, t, l, a), si(e);
    }
    function Ca(e, t) {
      return oi(e, null, null, t), si(e);
    }
    function Zo(e, t, l) {
      e.lanes |= l;
      var a = e.alternate;
      a !== null && (a.lanes |= l);
      for (var n = false, i = e.return; i !== null; ) i.childLanes |= l, a = i.alternate, a !== null && (a.childLanes |= l), i.tag === 22 && (e = i.stateNode, e === null || e._visibility & 1 || (n = true)), e = i, i = i.return;
      return e.tag === 3 ? (i = e.stateNode, n && t !== null && (n = 31 - Tt(l), e = i.hiddenUpdates, a = e[n], a === null ? e[n] = [
        t
      ] : a.push(t), t.lane = l | 536870912), i) : null;
    }
    function si(e) {
      if (50 < Su) throw Su = 0, tc = null, Error(f(185));
      for (var t = e.return; t !== null; ) e = t, t = e.return;
      return e.tag === 3 ? e.stateNode : null;
    }
    var rn = {};
    function yv(e, t, l, a) {
      this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function qt(e, t, l, a) {
      return new yv(e, t, l, a);
    }
    function Kr(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function Al(e, t) {
      var l = e.alternate;
      return l === null ? (l = qt(e.tag, t, e.key, e.mode), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
    }
    function Ko(e, t) {
      e.flags &= 65011714;
      var l = e.alternate;
      return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }), e;
    }
    function di(e, t, l, a, n, i) {
      var c = 0;
      if (a = e, typeof e == "function") Kr(e) && (c = 1);
      else if (typeof e == "string") c = b0(e, l, F.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else e: switch (e) {
        case ze:
          return e = qt(31, l, t, n), e.elementType = ze, e.lanes = i, e;
        case X:
          return Ua(l.children, n, i, t);
        case G:
          c = 8, n |= 24;
          break;
        case $:
          return e = qt(12, l, t, n | 2), e.elementType = $, e.lanes = i, e;
        case me:
          return e = qt(13, l, t, n), e.elementType = me, e.lanes = i, e;
        case oe:
          return e = qt(19, l, t, n), e.elementType = oe, e.lanes = i, e;
        default:
          if (typeof e == "object" && e !== null) switch (e.$$typeof) {
            case k:
              c = 10;
              break e;
            case W:
              c = 9;
              break e;
            case ge:
              c = 11;
              break e;
            case le:
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
    function Jr(e, t, l) {
      return e = qt(6, e, null, t), e.lanes = l, e;
    }
    function Jo(e) {
      var t = qt(18, null, null, 0);
      return t.stateNode = e, t;
    }
    function Fr(e, t, l) {
      return t = qt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = l, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    var Fo = /* @__PURE__ */ new WeakMap();
    function Wt(e, t) {
      if (typeof e == "object" && e !== null) {
        var l = Fo.get(e);
        return l !== void 0 ? l : (t = {
          value: e,
          source: t,
          stack: Ku(t)
        }, Fo.set(e, t), t);
      }
      return {
        value: e,
        source: t,
        stack: Ku(t)
      };
    }
    var fn = [], cn = 0, hi = null, Pn = 0, kt = [], Pt = 0, kl = null, gl = 1, pl = "";
    function _l(e, t) {
      fn[cn++] = Pn, fn[cn++] = hi, hi = e, Pn = t;
    }
    function $o(e, t, l) {
      kt[Pt++] = gl, kt[Pt++] = pl, kt[Pt++] = kl, kl = e;
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
    function $r(e) {
      e.return !== null && (_l(e, 1), $o(e, 1, 0));
    }
    function Wr(e) {
      for (; e === hi; ) hi = fn[--cn], fn[cn] = null, Pn = fn[--cn], fn[cn] = null;
      for (; e === kl; ) kl = kt[--Pt], kt[Pt] = null, pl = kt[--Pt], kt[Pt] = null, gl = kt[--Pt], kt[Pt] = null;
    }
    function Wo(e, t) {
      kt[Pt++] = gl, kt[Pt++] = pl, kt[Pt++] = kl, gl = t.id, pl = t.overflow, kl = e;
    }
    var bt = null, ke = null, Ne = false, Pl = null, It = false, kr = Error(f(519));
    function Il(e) {
      var t = Error(f(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
      throw In(Wt(t, e)), kr;
    }
    function ko(e) {
      var t = e.stateNode, l = e.type, a = e.memoizedProps;
      switch (t[J] = e, t[P] = a, l) {
        case "dialog":
          _e("cancel", t), _e("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          _e("load", t);
          break;
        case "video":
        case "audio":
          for (l = 0; l < Eu.length; l++) _e(Eu[l], t);
          break;
        case "source":
          _e("error", t);
          break;
        case "img":
        case "image":
        case "link":
          _e("error", t), _e("load", t);
          break;
        case "details":
          _e("toggle", t);
          break;
        case "input":
          _e("invalid", t), co(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, true);
          break;
        case "select":
          _e("invalid", t);
          break;
        case "textarea":
          _e("invalid", t), so(t, a.value, a.defaultValue, a.children);
      }
      l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === true || mh(t.textContent, l) ? (a.popover != null && (_e("beforetoggle", t), _e("toggle", t)), a.onScroll != null && _e("scroll", t), a.onScrollEnd != null && _e("scrollend", t), a.onClick != null && (t.onclick = Ml), t = true) : t = false, t || Il(e, true);
    }
    function Po(e) {
      for (bt = e.return; bt; ) switch (bt.tag) {
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
          bt = bt.return;
      }
    }
    function on(e) {
      if (e !== bt) return false;
      if (!Ne) return Po(e), Ne = true, false;
      var t = e.tag, l;
      if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || vc(e.type, e.memoizedProps)), l = !l), l && ke && Il(e), Po(e), t === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(317));
        ke = zh(e);
      } else if (t === 31) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(317));
        ke = zh(e);
      } else t === 27 ? (t = ke, ha(e.type) ? (e = Ec, Ec = null, ke = e) : ke = t) : ke = bt ? tl(e.stateNode.nextSibling) : null;
      return true;
    }
    function xa() {
      ke = bt = null, Ne = false;
    }
    function Pr() {
      var e = Pl;
      return e !== null && (wt === null ? wt = e : wt.push.apply(wt, e), Pl = null), e;
    }
    function In(e) {
      Pl === null ? Pl = [
        e
      ] : Pl.push(e);
    }
    var Ir = E(null), Na = null, Ol = null;
    function ea(e, t, l) {
      K(Ir, t._currentValue), t._currentValue = l;
    }
    function Cl(e) {
      e._currentValue = Ir.current, B(Ir);
    }
    function ef(e, t, l) {
      for (; e !== null; ) {
        var a = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === l) break;
        e = e.return;
      }
    }
    function tf(e, t, l, a) {
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
              i.lanes |= l, h = i.alternate, h !== null && (h.lanes |= l), ef(i.return, l, e), a || (c = null);
              break e;
            }
            i = h.next;
          }
        } else if (n.tag === 18) {
          if (c = n.return, c === null) throw Error(f(341));
          c.lanes |= l, i = c.alternate, i !== null && (i.lanes |= l), ef(c, l, e), c = null;
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
      e !== null && tf(t, e, l, a), t.flags |= 262144;
    }
    function mi(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!Yt(e.context._currentValue, e.memoizedValue)) return true;
        e = e.next;
      }
      return false;
    }
    function Ha(e) {
      Na = e, Ol = null, e = e.dependencies, e !== null && (e.firstContext = null);
    }
    function Et(e) {
      return Io(Na, e);
    }
    function yi(e, t) {
      return Na === null && Ha(e), Io(e, t);
    }
    function Io(e, t) {
      var l = t._currentValue;
      if (t = {
        context: t,
        memoizedValue: l,
        next: null
      }, Ol === null) {
        if (e === null) throw Error(f(308));
        Ol = t, e.dependencies = {
          lanes: 0,
          firstContext: t
        }, e.flags |= 524288;
      } else Ol = Ol.next = t;
      return l;
    }
    var vv = typeof AbortController < "u" ? AbortController : function() {
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
    }, gv = u.unstable_scheduleCallback, pv = u.unstable_NormalPriority, ot = {
      $$typeof: k,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
    function lf() {
      return {
        controller: new vv(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function eu(e) {
      e.refCount--, e.refCount === 0 && gv(pv, function() {
        e.controller.abort();
      });
    }
    var tu = null, af = 0, dn = 0, hn = null;
    function Sv(e, t) {
      if (tu === null) {
        var l = tu = [];
        af = 0, dn = rc(), hn = {
          status: "pending",
          value: void 0,
          then: function(a) {
            l.push(a);
          }
        };
      }
      return af++, t.then(es, es), t;
    }
    function es() {
      if (--af === 0 && tu !== null) {
        hn !== null && (hn.status = "fulfilled");
        var e = tu;
        tu = null, dn = 0, hn = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function bv(e, t) {
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
    var ts = N.S;
    N.S = function(e, t) {
      jd = _t(), typeof t == "object" && t !== null && typeof t.then == "function" && Sv(e, t), ts !== null && ts(e, t);
    };
    var La = E(null);
    function nf() {
      var e = La.current;
      return e !== null ? e : Je.pooledCache;
    }
    function vi(e, t) {
      t === null ? K(La, La.current) : K(La, t.pool);
    }
    function ls() {
      var e = nf();
      return e === null ? null : {
        parent: ot._currentValue,
        pool: e
      };
    }
    var mn = Error(f(460)), uf = Error(f(474)), gi = Error(f(542)), pi = {
      then: function() {
      }
    };
    function as(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function ns(e, t, l) {
      switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(Ml, Ml), t = l), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, is(e), e;
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
              throw e = t.reason, is(e), e;
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
    function us() {
      if (Ba === null) throw Error(f(459));
      var e = Ba;
      return Ba = null, e;
    }
    function is(e) {
      if (e === mn || e === gi) throw Error(f(483));
    }
    var yn = null, lu = 0;
    function Si(e) {
      var t = lu;
      return lu += 1, yn === null && (yn = []), ns(yn, e, t);
    }
    function au(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function bi(e, t) {
      throw t.$$typeof === A ? Error(f(525)) : (e = Object.prototype.toString.call(t), Error(f(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
    }
    function rs(e) {
      function t(M, R) {
        if (e) {
          var _ = M.deletions;
          _ === null ? (M.deletions = [
            R
          ], M.flags |= 16) : _.push(R);
        }
      }
      function l(M, R) {
        if (!e) return null;
        for (; R !== null; ) t(M, R), R = R.sibling;
        return null;
      }
      function a(M) {
        for (var R = /* @__PURE__ */ new Map(); M !== null; ) M.key !== null ? R.set(M.key, M) : R.set(M.index, M), M = M.sibling;
        return R;
      }
      function n(M, R) {
        return M = Al(M, R), M.index = 0, M.sibling = null, M;
      }
      function i(M, R, _) {
        return M.index = _, e ? (_ = M.alternate, _ !== null ? (_ = _.index, _ < R ? (M.flags |= 67108866, R) : _) : (M.flags |= 67108866, R)) : (M.flags |= 1048576, R);
      }
      function c(M) {
        return e && M.alternate === null && (M.flags |= 67108866), M;
      }
      function h(M, R, _, j) {
        return R === null || R.tag !== 6 ? (R = Jr(_, M.mode, j), R.return = M, R) : (R = n(R, _), R.return = M, R);
      }
      function p(M, R, _, j) {
        var fe = _.type;
        return fe === X ? w(M, R, _.props.children, j, _.key) : R !== null && (R.elementType === fe || typeof fe == "object" && fe !== null && fe.$$typeof === D && wa(fe) === R.type) ? (R = n(R, _.props), au(R, _), R.return = M, R) : (R = di(_.type, _.key, _.props, null, M.mode, j), au(R, _), R.return = M, R);
      }
      function O(M, R, _, j) {
        return R === null || R.tag !== 4 || R.stateNode.containerInfo !== _.containerInfo || R.stateNode.implementation !== _.implementation ? (R = Fr(_, M.mode, j), R.return = M, R) : (R = n(R, _.children || []), R.return = M, R);
      }
      function w(M, R, _, j, fe) {
        return R === null || R.tag !== 7 ? (R = Ua(_, M.mode, j, fe), R.return = M, R) : (R = n(R, _), R.return = M, R);
      }
      function Y(M, R, _) {
        if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint") return R = Jr("" + R, M.mode, _), R.return = M, R;
        if (typeof R == "object" && R !== null) {
          switch (R.$$typeof) {
            case H:
              return _ = di(R.type, R.key, R.props, null, M.mode, _), au(_, R), _.return = M, _;
            case q:
              return R = Fr(R, M.mode, _), R.return = M, R;
            case D:
              return R = wa(R), Y(M, R, _);
          }
          if (ye(R) || ve(R)) return R = Ua(R, M.mode, _, null), R.return = M, R;
          if (typeof R.then == "function") return Y(M, Si(R), _);
          if (R.$$typeof === k) return Y(M, yi(M, R), _);
          bi(M, R);
        }
        return null;
      }
      function C(M, R, _, j) {
        var fe = R !== null ? R.key : null;
        if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint") return fe !== null ? null : h(M, R, "" + _, j);
        if (typeof _ == "object" && _ !== null) {
          switch (_.$$typeof) {
            case H:
              return _.key === fe ? p(M, R, _, j) : null;
            case q:
              return _.key === fe ? O(M, R, _, j) : null;
            case D:
              return _ = wa(_), C(M, R, _, j);
          }
          if (ye(_) || ve(_)) return fe !== null ? null : w(M, R, _, j, null);
          if (typeof _.then == "function") return C(M, R, Si(_), j);
          if (_.$$typeof === k) return C(M, R, yi(M, _), j);
          bi(M, _);
        }
        return null;
      }
      function L(M, R, _, j, fe) {
        if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint") return M = M.get(_) || null, h(R, M, "" + j, fe);
        if (typeof j == "object" && j !== null) {
          switch (j.$$typeof) {
            case H:
              return M = M.get(j.key === null ? _ : j.key) || null, p(R, M, j, fe);
            case q:
              return M = M.get(j.key === null ? _ : j.key) || null, O(R, M, j, fe);
            case D:
              return j = wa(j), L(M, R, _, j, fe);
          }
          if (ye(j) || ve(j)) return M = M.get(_) || null, w(R, M, j, fe, null);
          if (typeof j.then == "function") return L(M, R, _, Si(j), fe);
          if (j.$$typeof === k) return L(M, R, _, yi(R, j), fe);
          bi(R, j);
        }
        return null;
      }
      function te(M, R, _, j) {
        for (var fe = null, we = null, ue = R, Re = R = 0, Ce = null; ue !== null && Re < _.length; Re++) {
          ue.index > Re ? (Ce = ue, ue = null) : Ce = ue.sibling;
          var Be = C(M, ue, _[Re], j);
          if (Be === null) {
            ue === null && (ue = Ce);
            break;
          }
          e && ue && Be.alternate === null && t(M, ue), R = i(Be, R, Re), we === null ? fe = Be : we.sibling = Be, we = Be, ue = Ce;
        }
        if (Re === _.length) return l(M, ue), Ne && _l(M, Re), fe;
        if (ue === null) {
          for (; Re < _.length; Re++) ue = Y(M, _[Re], j), ue !== null && (R = i(ue, R, Re), we === null ? fe = ue : we.sibling = ue, we = ue);
          return Ne && _l(M, Re), fe;
        }
        for (ue = a(ue); Re < _.length; Re++) Ce = L(ue, M, Re, _[Re], j), Ce !== null && (e && Ce.alternate !== null && ue.delete(Ce.key === null ? Re : Ce.key), R = i(Ce, R, Re), we === null ? fe = Ce : we.sibling = Ce, we = Ce);
        return e && ue.forEach(function(pa) {
          return t(M, pa);
        }), Ne && _l(M, Re), fe;
      }
      function de(M, R, _, j) {
        if (_ == null) throw Error(f(151));
        for (var fe = null, we = null, ue = R, Re = R = 0, Ce = null, Be = _.next(); ue !== null && !Be.done; Re++, Be = _.next()) {
          ue.index > Re ? (Ce = ue, ue = null) : Ce = ue.sibling;
          var pa = C(M, ue, Be.value, j);
          if (pa === null) {
            ue === null && (ue = Ce);
            break;
          }
          e && ue && pa.alternate === null && t(M, ue), R = i(pa, R, Re), we === null ? fe = pa : we.sibling = pa, we = pa, ue = Ce;
        }
        if (Be.done) return l(M, ue), Ne && _l(M, Re), fe;
        if (ue === null) {
          for (; !Be.done; Re++, Be = _.next()) Be = Y(M, Be.value, j), Be !== null && (R = i(Be, R, Re), we === null ? fe = Be : we.sibling = Be, we = Be);
          return Ne && _l(M, Re), fe;
        }
        for (ue = a(ue); !Be.done; Re++, Be = _.next()) Be = L(ue, M, Re, Be.value, j), Be !== null && (e && Be.alternate !== null && ue.delete(Be.key === null ? Re : Be.key), R = i(Be, R, Re), we === null ? fe = Be : we.sibling = Be, we = Be);
        return e && ue.forEach(function(U0) {
          return t(M, U0);
        }), Ne && _l(M, Re), fe;
      }
      function Qe(M, R, _, j) {
        if (typeof _ == "object" && _ !== null && _.type === X && _.key === null && (_ = _.props.children), typeof _ == "object" && _ !== null) {
          switch (_.$$typeof) {
            case H:
              e: {
                for (var fe = _.key; R !== null; ) {
                  if (R.key === fe) {
                    if (fe = _.type, fe === X) {
                      if (R.tag === 7) {
                        l(M, R.sibling), j = n(R, _.props.children), j.return = M, M = j;
                        break e;
                      }
                    } else if (R.elementType === fe || typeof fe == "object" && fe !== null && fe.$$typeof === D && wa(fe) === R.type) {
                      l(M, R.sibling), j = n(R, _.props), au(j, _), j.return = M, M = j;
                      break e;
                    }
                    l(M, R);
                    break;
                  } else t(M, R);
                  R = R.sibling;
                }
                _.type === X ? (j = Ua(_.props.children, M.mode, j, _.key), j.return = M, M = j) : (j = di(_.type, _.key, _.props, null, M.mode, j), au(j, _), j.return = M, M = j);
              }
              return c(M);
            case q:
              e: {
                for (fe = _.key; R !== null; ) {
                  if (R.key === fe) if (R.tag === 4 && R.stateNode.containerInfo === _.containerInfo && R.stateNode.implementation === _.implementation) {
                    l(M, R.sibling), j = n(R, _.children || []), j.return = M, M = j;
                    break e;
                  } else {
                    l(M, R);
                    break;
                  }
                  else t(M, R);
                  R = R.sibling;
                }
                j = Fr(_, M.mode, j), j.return = M, M = j;
              }
              return c(M);
            case D:
              return _ = wa(_), Qe(M, R, _, j);
          }
          if (ye(_)) return te(M, R, _, j);
          if (ve(_)) {
            if (fe = ve(_), typeof fe != "function") throw Error(f(150));
            return _ = fe.call(_), de(M, R, _, j);
          }
          if (typeof _.then == "function") return Qe(M, R, Si(_), j);
          if (_.$$typeof === k) return Qe(M, R, yi(M, _), j);
          bi(M, _);
        }
        return typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint" ? (_ = "" + _, R !== null && R.tag === 6 ? (l(M, R.sibling), j = n(R, _), j.return = M, M = j) : (l(M, R), j = Jr(_, M.mode, j), j.return = M, M = j), c(M)) : l(M, R);
      }
      return function(M, R, _, j) {
        try {
          lu = 0;
          var fe = Qe(M, R, _, j);
          return yn = null, fe;
        } catch (ue) {
          if (ue === mn || ue === gi) throw ue;
          var we = qt(29, ue, null, M.mode);
          return we.lanes = j, we.return = M, we;
        }
      };
    }
    var ja = rs(true), fs = rs(false), ta = false;
    function rf(e) {
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
    function ff(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null
      });
    }
    function la(e) {
      return {
        lane: e,
        tag: 0,
        payload: null,
        callback: null,
        next: null
      };
    }
    function aa(e, t, l) {
      var a = e.updateQueue;
      if (a === null) return null;
      if (a = a.shared, (je & 2) !== 0) {
        var n = a.pending;
        return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = si(e), Zo(e, null, l), t;
      }
      return oi(e, a, t, l), si(e);
    }
    function nu(e, t, l) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
        var a = t.lanes;
        a &= e.pendingLanes, l |= a, t.lanes = l, Pu(e, l);
      }
    }
    function cf(e, t) {
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
    var of = false;
    function uu() {
      if (of) {
        var e = hn;
        if (e !== null) throw e;
      }
    }
    function iu(e, t, l, a) {
      of = false;
      var n = e.updateQueue;
      ta = false;
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
          var C = h.lane & -536870913, L = C !== h.lane;
          if (L ? (Oe & C) === C : (a & C) === C) {
            C !== 0 && C === dn && (of = true), w !== null && (w = w.next = {
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: null,
              next: null
            });
            e: {
              var te = e, de = h;
              C = t;
              var Qe = l;
              switch (de.tag) {
                case 1:
                  if (te = de.payload, typeof te == "function") {
                    Y = te.call(Qe, Y, C);
                    break e;
                  }
                  Y = te;
                  break e;
                case 3:
                  te.flags = te.flags & -65537 | 128;
                case 0:
                  if (te = de.payload, C = typeof te == "function" ? te.call(Qe, Y, C) : te, C == null) break e;
                  Y = S({}, Y, C);
                  break e;
                case 2:
                  ta = true;
              }
            }
            C = h.callback, C !== null && (e.flags |= 64, L && (e.flags |= 8192), L = n.callbacks, L === null ? n.callbacks = [
              C
            ] : L.push(C));
          } else L = {
            lane: C,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          }, w === null ? (O = w = L, p = Y) : w = w.next = L, c |= C;
          if (h = h.next, h === null) {
            if (h = n.shared.pending, h === null) break;
            L = h, h = L.next, L.next = null, n.lastBaseUpdate = L, n.shared.pending = null;
          }
        } while (true);
        w === null && (p = Y), n.baseState = p, n.firstBaseUpdate = O, n.lastBaseUpdate = w, i === null && (n.shared.lanes = 0), fa |= c, e.lanes = c, e.memoizedState = Y;
      }
    }
    function cs(e, t) {
      if (typeof e != "function") throw Error(f(191, e));
      e.call(t);
    }
    function os(e, t) {
      var l = e.callbacks;
      if (l !== null) for (e.callbacks = null, e = 0; e < l.length; e++) cs(l[e], t);
    }
    var vn = E(null), Ei = E(0);
    function ss(e, t) {
      e = Yl, K(Ei, e), K(vn, t), Yl = e | t.baseLanes;
    }
    function sf() {
      K(Ei, Yl), K(vn, vn.current);
    }
    function df() {
      Yl = Ei.current, B(vn), B(Ei);
    }
    var Gt = E(null), el = null;
    function na(e) {
      var t = e.alternate;
      K(it, it.current & 1), K(Gt, e), el === null && (t === null || vn.current !== null || t.memoizedState !== null) && (el = e);
    }
    function hf(e) {
      K(it, it.current), K(Gt, e), el === null && (el = e);
    }
    function ds(e) {
      e.tag === 22 ? (K(it, it.current), K(Gt, e), el === null && (el = e)) : ua();
    }
    function ua() {
      K(it, it.current), K(Gt, Gt.current);
    }
    function Xt(e) {
      B(Gt), el === e && (el = null), B(it);
    }
    var it = E(0);
    function Ri(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var l = t.memoizedState;
          if (l !== null && (l = l.dehydrated, l === null || Sc(l) || bc(l))) return t;
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
    var Ul = 0, Se = null, Ge = null, st = null, zi = false, gn = false, Ya = false, Ti = 0, ru = 0, pn = null, Ev = 0;
    function lt() {
      throw Error(f(321));
    }
    function mf(e, t) {
      if (t === null) return false;
      for (var l = 0; l < t.length && l < e.length; l++) if (!Yt(e[l], t[l])) return false;
      return true;
    }
    function yf(e, t, l, a, n, i) {
      return Ul = i, Se = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, N.H = e === null || e.memoizedState === null ? $s : Cf, Ya = false, i = l(a, n), Ya = false, gn && (i = ms(t, l, a, n)), hs(e), i;
    }
    function hs(e) {
      N.H = ou;
      var t = Ge !== null && Ge.next !== null;
      if (Ul = 0, st = Ge = Se = null, zi = false, ru = 0, pn = null, t) throw Error(f(300));
      e === null || dt || (e = e.dependencies, e !== null && mi(e) && (dt = true));
    }
    function ms(e, t, l, a) {
      Se = e;
      var n = 0;
      do {
        if (gn && (pn = null), ru = 0, gn = false, 25 <= n) throw Error(f(301));
        if (n += 1, st = Ge = null, e.updateQueue != null) {
          var i = e.updateQueue;
          i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
        }
        N.H = Ws, i = t(l, a);
      } while (gn);
      return i;
    }
    function Rv() {
      var e = N.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? fu(t) : t, e = e.useState()[0], (Ge !== null ? Ge.memoizedState : null) !== e && (Se.flags |= 1024), t;
    }
    function vf() {
      var e = Ti !== 0;
      return Ti = 0, e;
    }
    function gf(e, t, l) {
      t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
    }
    function pf(e) {
      if (zi) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        zi = false;
      }
      Ul = 0, st = Ge = Se = null, gn = false, ru = Ti = 0, pn = null;
    }
    function Ct() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return st === null ? Se.memoizedState = st = e : st = st.next = e, st;
    }
    function rt() {
      if (Ge === null) {
        var e = Se.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = Ge.next;
      var t = st === null ? Se.memoizedState : st.next;
      if (t !== null) st = t, Ge = e;
      else {
        if (e === null) throw Se.alternate === null ? Error(f(467)) : Error(f(310));
        Ge = e, e = {
          memoizedState: Ge.memoizedState,
          baseState: Ge.baseState,
          baseQueue: Ge.baseQueue,
          queue: Ge.queue,
          next: null
        }, st === null ? Se.memoizedState = st = e : st = st.next = e;
      }
      return st;
    }
    function Mi() {
      return {
        lastEffect: null,
        events: null,
        stores: null,
        memoCache: null
      };
    }
    function fu(e) {
      var t = ru;
      return ru += 1, pn === null && (pn = []), e = ns(pn, e, t), t = Se, (st === null ? t.memoizedState : st.next) === null && (t = t.alternate, N.H = t === null || t.memoizedState === null ? $s : Cf), e;
    }
    function Di(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return fu(e);
        if (e.$$typeof === k) return Et(e);
      }
      throw Error(f(438, String(e)));
    }
    function Sf(e) {
      var t = null, l = Se.updateQueue;
      if (l !== null && (t = l.memoCache), t == null) {
        var a = Se.alternate;
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
      }), l === null && (l = Mi(), Se.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0) for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = Ue;
      return t.index++, l;
    }
    function xl(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Ai(e) {
      var t = rt();
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
          if (Y !== O.lane ? (Oe & Y) === Y : (Ul & Y) === Y) {
            var C = O.revertLane;
            if (C === 0) p !== null && (p = p.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }), Y === dn && (w = true);
            else if ((Ul & C) === C) {
              O = O.next, C === dn && (w = true);
              continue;
            } else Y = {
              lane: 0,
              revertLane: O.revertLane,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }, p === null ? (h = p = Y, c = i) : p = p.next = Y, Se.lanes |= C, fa |= C;
            Y = O.action, Ya && l(i, Y), i = O.hasEagerState ? O.eagerState : l(i, Y);
          } else C = {
            lane: Y,
            revertLane: O.revertLane,
            gesture: O.gesture,
            action: O.action,
            hasEagerState: O.hasEagerState,
            eagerState: O.eagerState,
            next: null
          }, p === null ? (h = p = C, c = i) : p = p.next = C, Se.lanes |= Y, fa |= Y;
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
    function Ef(e) {
      var t = rt(), l = t.queue;
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
    function ys(e, t, l) {
      var a = Se, n = rt(), i = Ne;
      if (i) {
        if (l === void 0) throw Error(f(407));
        l = l();
      } else l = t();
      var c = !Yt((Ge || n).memoizedState, l);
      if (c && (n.memoizedState = l, dt = true), n = n.queue, Tf(ps.bind(null, a, n, e), [
        e
      ]), n.getSnapshot !== t || c || st !== null && st.memoizedState.tag & 1) {
        if (a.flags |= 2048, Sn(9, {
          destroy: void 0
        }, gs.bind(null, a, n, l, t), null), Je === null) throw Error(f(349));
        i || (Ul & 127) !== 0 || vs(a, t, l);
      }
      return l;
    }
    function vs(e, t, l) {
      e.flags |= 16384, e = {
        getSnapshot: t,
        value: l
      }, t = Se.updateQueue, t === null ? (t = Mi(), Se.updateQueue = t, t.stores = [
        e
      ]) : (l = t.stores, l === null ? t.stores = [
        e
      ] : l.push(e));
    }
    function gs(e, t, l, a) {
      t.value = l, t.getSnapshot = a, Ss(t) && bs(e);
    }
    function ps(e, t, l) {
      return l(function() {
        Ss(t) && bs(e);
      });
    }
    function Ss(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var l = t();
        return !Yt(e, l);
      } catch {
        return true;
      }
    }
    function bs(e) {
      var t = Ca(e, 2);
      t !== null && Bt(t, e, 2);
    }
    function Rf(e) {
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
    function Es(e, t, l, a) {
      return e.baseState = l, bf(e, Ge, typeof a == "function" ? a : xl);
    }
    function zv(e, t, l, a, n) {
      if (Ci(e)) throw Error(f(485));
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
        N.T !== null ? l(true) : i.isTransition = false, a(i), l = t.pending, l === null ? (i.next = t.pending = i, Rs(t, i)) : (i.next = l.next, t.pending = l.next = i);
      }
    }
    function Rs(e, t) {
      var l = t.action, a = t.payload, n = e.state;
      if (t.isTransition) {
        var i = N.T, c = {};
        N.T = c;
        try {
          var h = l(n, a), p = N.S;
          p !== null && p(c, h), zs(e, t, h);
        } catch (O) {
          zf(e, t, O);
        } finally {
          i !== null && c.types !== null && (i.types = c.types), N.T = i;
        }
      } else try {
        i = l(n, a), zs(e, t, i);
      } catch (O) {
        zf(e, t, O);
      }
    }
    function zs(e, t, l) {
      l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(function(a) {
        Ts(e, t, a);
      }, function(a) {
        return zf(e, t, a);
      }) : Ts(e, t, l);
    }
    function Ts(e, t, l) {
      t.status = "fulfilled", t.value = l, Ms(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Rs(e, l)));
    }
    function zf(e, t, l) {
      var a = e.pending;
      if (e.pending = null, a !== null) {
        a = a.next;
        do
          t.status = "rejected", t.reason = l, Ms(t), t = t.next;
        while (t !== a);
      }
      e.action = null;
    }
    function Ms(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function Ds(e, t) {
      return t;
    }
    function As(e, t) {
      if (Ne) {
        var l = Je.formState;
        if (l !== null) {
          e: {
            var a = Se;
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
              Il(a);
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
        lastRenderedReducer: Ds,
        lastRenderedState: t
      }, l.queue = a, l = Ks.bind(null, Se, a), a.dispatch = l, a = Rf(false), i = Of.bind(null, Se, false, a.queue), a = Ct(), n = {
        state: t,
        dispatch: null,
        action: e,
        pending: null
      }, a.queue = n, l = zv.bind(null, Se, n, i, l), n.dispatch = l, a.memoizedState = e, [
        t,
        l,
        false
      ];
    }
    function _s(e) {
      var t = rt();
      return Os(t, Ge, e);
    }
    function Os(e, t, l) {
      if (t = bf(e, t, Ds)[0], e = Ai(xl)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
        var a = fu(t);
      } catch (c) {
        throw c === mn ? gi : c;
      }
      else a = t;
      t = rt();
      var n = t.queue, i = n.dispatch;
      return l !== t.memoizedState && (Se.flags |= 2048, Sn(9, {
        destroy: void 0
      }, Tv.bind(null, n, l), null)), [
        a,
        i,
        e
      ];
    }
    function Tv(e, t) {
      e.action = t;
    }
    function Cs(e) {
      var t = rt(), l = Ge;
      if (l !== null) return Os(t, l, e);
      rt(), t = t.memoizedState, l = rt();
      var a = l.queue.dispatch;
      return l.memoizedState = e, [
        t,
        a,
        false
      ];
    }
    function Sn(e, t, l, a) {
      return e = {
        tag: e,
        create: l,
        deps: a,
        inst: t,
        next: null
      }, t = Se.updateQueue, t === null && (t = Mi(), Se.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (a = l.next, l.next = e, e.next = a, t.lastEffect = e), e;
    }
    function Us() {
      return rt().memoizedState;
    }
    function _i(e, t, l, a) {
      var n = Ct();
      Se.flags |= e, n.memoizedState = Sn(1 | t, {
        destroy: void 0
      }, l, a === void 0 ? null : a);
    }
    function Oi(e, t, l, a) {
      var n = rt();
      a = a === void 0 ? null : a;
      var i = n.memoizedState.inst;
      Ge !== null && a !== null && mf(a, Ge.memoizedState.deps) ? n.memoizedState = Sn(t, i, l, a) : (Se.flags |= e, n.memoizedState = Sn(1 | t, i, l, a));
    }
    function xs(e, t) {
      _i(8390656, 8, e, t);
    }
    function Tf(e, t) {
      Oi(2048, 8, e, t);
    }
    function Mv(e) {
      Se.flags |= 4;
      var t = Se.updateQueue;
      if (t === null) t = Mi(), Se.updateQueue = t, t.events = [
        e
      ];
      else {
        var l = t.events;
        l === null ? t.events = [
          e
        ] : l.push(e);
      }
    }
    function Ns(e) {
      var t = rt().memoizedState;
      return Mv({
        ref: t,
        nextImpl: e
      }), function() {
        if ((je & 2) !== 0) throw Error(f(440));
        return t.impl.apply(void 0, arguments);
      };
    }
    function Hs(e, t) {
      return Oi(4, 2, e, t);
    }
    function Ls(e, t) {
      return Oi(4, 4, e, t);
    }
    function ws(e, t) {
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
    function Bs(e, t, l) {
      l = l != null ? l.concat([
        e
      ]) : null, Oi(4, 4, ws.bind(null, t, e), l);
    }
    function Mf() {
    }
    function js(e, t) {
      var l = rt();
      t = t === void 0 ? null : t;
      var a = l.memoizedState;
      return t !== null && mf(t, a[1]) ? a[0] : (l.memoizedState = [
        e,
        t
      ], e);
    }
    function Ys(e, t) {
      var l = rt();
      t = t === void 0 ? null : t;
      var a = l.memoizedState;
      if (t !== null && mf(t, a[1])) return a[0];
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
    function Df(e, t, l) {
      return l === void 0 || (Ul & 1073741824) !== 0 && (Oe & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = qd(), Se.lanes |= e, fa |= e, l);
    }
    function qs(e, t, l, a) {
      return Yt(l, t) ? l : vn.current !== null ? (e = Df(e, l, a), Yt(e, t) || (dt = true), e) : (Ul & 42) === 0 || (Ul & 1073741824) !== 0 && (Oe & 261930) === 0 ? (dt = true, e.memoizedState = l) : (e = qd(), Se.lanes |= e, fa |= e, t);
    }
    function Gs(e, t, l, a, n) {
      var i = V.p;
      V.p = i !== 0 && 8 > i ? i : 8;
      var c = N.T, h = {};
      N.T = h, Of(e, false, t, l);
      try {
        var p = n(), O = N.S;
        if (O !== null && O(h, p), p !== null && typeof p == "object" && typeof p.then == "function") {
          var w = bv(p, a);
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
        V.p = i, c !== null && h.types !== null && (c.types = h.types), N.T = c;
      }
    }
    function Dv() {
    }
    function Af(e, t, l, a) {
      if (e.tag !== 5) throw Error(f(476));
      var n = Xs(e).queue;
      Gs(e, n, t, ae, l === null ? Dv : function() {
        return Qs(e), l(a);
      });
    }
    function Xs(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: ae,
        baseState: ae,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: xl,
          lastRenderedState: ae
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
    function Qs(e) {
      var t = Xs(e);
      t.next === null && (t = e.alternate.memoizedState), cu(e, t.next.queue, {}, Zt());
    }
    function _f() {
      return Et(Du);
    }
    function Vs() {
      return rt().memoizedState;
    }
    function Zs() {
      return rt().memoizedState;
    }
    function Av(e) {
      for (var t = e.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var l = Zt();
            e = la(l);
            var a = aa(t, e, l);
            a !== null && (Bt(a, t, l), nu(a, t, l)), t = {
              cache: lf()
            }, e.payload = t;
            return;
        }
        t = t.return;
      }
    }
    function _v(e, t, l) {
      var a = Zt();
      l = {
        lane: a,
        revertLane: 0,
        gesture: null,
        action: l,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, Ci(e) ? Js(t, l) : (l = Zr(e, t, l, a), l !== null && (Bt(l, e, a), Fs(l, t, a)));
    }
    function Ks(e, t, l) {
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
      if (Ci(e)) Js(t, n);
      else {
        var i = e.alternate;
        if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
          var c = t.lastRenderedState, h = i(c, l);
          if (n.hasEagerState = true, n.eagerState = h, Yt(h, c)) return oi(e, t, n, 0), Je === null && ci(), false;
        } catch {
        }
        if (l = Zr(e, t, n, a), l !== null) return Bt(l, e, a), Fs(l, t, a), true;
      }
      return false;
    }
    function Of(e, t, l, a) {
      if (a = {
        lane: 2,
        revertLane: rc(),
        gesture: null,
        action: a,
        hasEagerState: false,
        eagerState: null,
        next: null
      }, Ci(e)) {
        if (t) throw Error(f(479));
      } else t = Zr(e, l, a, 2), t !== null && Bt(t, e, 2);
    }
    function Ci(e) {
      var t = e.alternate;
      return e === Se || t !== null && t === Se;
    }
    function Js(e, t) {
      gn = zi = true;
      var l = e.pending;
      l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
    }
    function Fs(e, t, l) {
      if ((l & 4194048) !== 0) {
        var a = t.lanes;
        a &= e.pendingLanes, l |= a, t.lanes = l, Pu(e, l);
      }
    }
    var ou = {
      readContext: Et,
      use: Di,
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
    var $s = {
      readContext: Et,
      use: Di,
      useCallback: function(e, t) {
        return Ct().memoizedState = [
          e,
          t === void 0 ? null : t
        ], e;
      },
      useContext: Et,
      useEffect: xs,
      useImperativeHandle: function(e, t, l) {
        l = l != null ? l.concat([
          e
        ]) : null, _i(4194308, 4, ws.bind(null, t, e), l);
      },
      useLayoutEffect: function(e, t) {
        return _i(4194308, 4, e, t);
      },
      useInsertionEffect: function(e, t) {
        _i(4, 2, e, t);
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
        }, a.queue = e, e = e.dispatch = _v.bind(null, Se, e), [
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
        e = Rf(e);
        var t = e.queue, l = Ks.bind(null, Se, t);
        return t.dispatch = l, [
          e.memoizedState,
          l
        ];
      },
      useDebugValue: Mf,
      useDeferredValue: function(e, t) {
        var l = Ct();
        return Df(l, e, t);
      },
      useTransition: function() {
        var e = Rf(false);
        return e = Gs.bind(null, Se, e.queue, true, false), Ct().memoizedState = e, [
          false,
          e
        ];
      },
      useSyncExternalStore: function(e, t, l) {
        var a = Se, n = Ct();
        if (Ne) {
          if (l === void 0) throw Error(f(407));
          l = l();
        } else {
          if (l = t(), Je === null) throw Error(f(349));
          (Oe & 127) !== 0 || vs(a, t, l);
        }
        n.memoizedState = l;
        var i = {
          value: l,
          getSnapshot: t
        };
        return n.queue = i, xs(ps.bind(null, a, i, e), [
          e
        ]), a.flags |= 2048, Sn(9, {
          destroy: void 0
        }, gs.bind(null, a, i, l, t), null), l;
      },
      useId: function() {
        var e = Ct(), t = Je.identifierPrefix;
        if (Ne) {
          var l = pl, a = gl;
          l = (a & ~(1 << 32 - Tt(a) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Ti++, 0 < l && (t += "H" + l.toString(32)), t += "_";
        } else l = Ev++, t = "_" + t + "r_" + l.toString(32) + "_";
        return e.memoizedState = t;
      },
      useHostTransitionStatus: _f,
      useFormState: As,
      useActionState: As,
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
        return t.queue = l, t = Of.bind(null, Se, true, l), l.dispatch = t, [
          e,
          t
        ];
      },
      useMemoCache: Sf,
      useCacheRefresh: function() {
        return Ct().memoizedState = Av.bind(null, Se);
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
    }, Cf = {
      readContext: Et,
      use: Di,
      useCallback: js,
      useContext: Et,
      useEffect: Tf,
      useImperativeHandle: Bs,
      useInsertionEffect: Hs,
      useLayoutEffect: Ls,
      useMemo: Ys,
      useReducer: Ai,
      useRef: Us,
      useState: function() {
        return Ai(xl);
      },
      useDebugValue: Mf,
      useDeferredValue: function(e, t) {
        var l = rt();
        return qs(l, Ge.memoizedState, e, t);
      },
      useTransition: function() {
        var e = Ai(xl)[0], t = rt().memoizedState;
        return [
          typeof e == "boolean" ? e : fu(e),
          t
        ];
      },
      useSyncExternalStore: ys,
      useId: Vs,
      useHostTransitionStatus: _f,
      useFormState: _s,
      useActionState: _s,
      useOptimistic: function(e, t) {
        var l = rt();
        return Es(l, Ge, e, t);
      },
      useMemoCache: Sf,
      useCacheRefresh: Zs
    };
    Cf.useEffectEvent = Ns;
    var Ws = {
      readContext: Et,
      use: Di,
      useCallback: js,
      useContext: Et,
      useEffect: Tf,
      useImperativeHandle: Bs,
      useInsertionEffect: Hs,
      useLayoutEffect: Ls,
      useMemo: Ys,
      useReducer: Ef,
      useRef: Us,
      useState: function() {
        return Ef(xl);
      },
      useDebugValue: Mf,
      useDeferredValue: function(e, t) {
        var l = rt();
        return Ge === null ? Df(l, e, t) : qs(l, Ge.memoizedState, e, t);
      },
      useTransition: function() {
        var e = Ef(xl)[0], t = rt().memoizedState;
        return [
          typeof e == "boolean" ? e : fu(e),
          t
        ];
      },
      useSyncExternalStore: ys,
      useId: Vs,
      useHostTransitionStatus: _f,
      useFormState: Cs,
      useActionState: Cs,
      useOptimistic: function(e, t) {
        var l = rt();
        return Ge !== null ? Es(l, Ge, e, t) : (l.baseState = e, [
          e,
          l.queue.dispatch
        ]);
      },
      useMemoCache: Sf,
      useCacheRefresh: Zs
    };
    Ws.useEffectEvent = Ns;
    function Uf(e, t, l, a) {
      t = e.memoizedState, l = l(a, t), l = l == null ? t : S({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
    }
    var xf = {
      enqueueSetState: function(e, t, l) {
        e = e._reactInternals;
        var a = Zt(), n = la(a);
        n.payload = t, l != null && (n.callback = l), t = aa(e, n, a), t !== null && (Bt(t, e, a), nu(t, e, a));
      },
      enqueueReplaceState: function(e, t, l) {
        e = e._reactInternals;
        var a = Zt(), n = la(a);
        n.tag = 1, n.payload = t, l != null && (n.callback = l), t = aa(e, n, a), t !== null && (Bt(t, e, a), nu(t, e, a));
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var l = Zt(), a = la(l);
        a.tag = 2, t != null && (a.callback = t), t = aa(e, a, l), t !== null && (Bt(t, e, l), nu(t, e, l));
      }
    };
    function ks(e, t, l, a, n, i, c) {
      return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, i, c) : t.prototype && t.prototype.isPureReactComponent ? !Wn(l, a) || !Wn(n, i) : true;
    }
    function Ps(e, t, l, a) {
      e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a), t.state !== e && xf.enqueueReplaceState(t, t.state, null);
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
    function Is(e) {
      fi(e);
    }
    function ed(e) {
      console.error(e);
    }
    function td(e) {
      fi(e);
    }
    function Ui(e, t) {
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
    function ld(e, t, l) {
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
    function Nf(e, t, l) {
      return l = la(l), l.tag = 3, l.payload = {
        element: null
      }, l.callback = function() {
        Ui(e, t);
      }, l;
    }
    function ad(e) {
      return e = la(e), e.tag = 3, e;
    }
    function nd(e, t, l, a) {
      var n = l.type.getDerivedStateFromError;
      if (typeof n == "function") {
        var i = a.value;
        e.payload = function() {
          return n(i);
        }, e.callback = function() {
          ld(t, l, a);
        };
      }
      var c = l.stateNode;
      c !== null && typeof c.componentDidCatch == "function" && (e.callback = function() {
        ld(t, l, a), typeof n != "function" && (ca === null ? ca = /* @__PURE__ */ new Set([
          this
        ]) : ca.add(this));
        var h = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: h !== null ? h : ""
        });
      });
    }
    function Ov(e, t, l, a, n) {
      if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
        if (t = l.alternate, t !== null && sn(t, l, n, true), l = Gt.current, l !== null) {
          switch (l.tag) {
            case 31:
            case 13:
              return el === null ? Qi() : l.alternate === null && at === 0 && (at = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === pi ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([
                a
              ]) : t.add(a), nc(e, a, n)), false;
            case 22:
              return l.flags |= 65536, a === pi ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([
                  a
                ])
              }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([
                a
              ]) : l.add(a)), nc(e, a, n)), false;
          }
          throw Error(f(435, l.tag));
        }
        return nc(e, a, n), Qi(), false;
      }
      if (Ne) return t = Gt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== kr && (e = Error(f(422), {
        cause: a
      }), In(Wt(e, l)))) : (a !== kr && (t = Error(f(423), {
        cause: a
      }), In(Wt(t, l))), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, a = Wt(a, l), n = Nf(e.stateNode, a, n), cf(e, n), at !== 4 && (at = 2)), false;
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
            return l.flags |= 65536, e = n & -n, l.lanes |= e, e = Nf(l.stateNode, a, e), cf(l, e), false;
          case 1:
            if (t = l.type, i = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (ca === null || !ca.has(i)))) return l.flags |= 65536, n &= -n, l.lanes |= n, n = ad(n), nd(n, e, l, a), cf(l, n), false;
        }
        l = l.return;
      } while (l !== null);
      return false;
    }
    var Hf = Error(f(461)), dt = false;
    function Rt(e, t, l, a) {
      t.child = e === null ? fs(t, null, l, a) : ja(t, e.child, l, a);
    }
    function ud(e, t, l, a, n) {
      l = l.render;
      var i = t.ref;
      if ("ref" in a) {
        var c = {};
        for (var h in a) h !== "ref" && (c[h] = a[h]);
      } else c = a;
      return Ha(t), a = yf(e, t, l, c, i, n), h = vf(), e !== null && !dt ? (gf(e, t, n), Nl(e, t, n)) : (Ne && h && $r(t), t.flags |= 1, Rt(e, t, a, n), t.child);
    }
    function id(e, t, l, a, n) {
      if (e === null) {
        var i = l.type;
        return typeof i == "function" && !Kr(i) && i.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = i, rd(e, t, i, a, n)) : (e = di(l.type, null, a, t, t.mode, n), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (i = e.child, !Xf(e, n)) {
        var c = i.memoizedProps;
        if (l = l.compare, l = l !== null ? l : Wn, l(c, a) && e.ref === t.ref) return Nl(e, t, n);
      }
      return t.flags |= 1, e = Al(i, a), e.ref = t.ref, e.return = t, t.child = e;
    }
    function rd(e, t, l, a, n) {
      if (e !== null) {
        var i = e.memoizedProps;
        if (Wn(i, a) && e.ref === t.ref) if (dt = false, t.pendingProps = a = i, Xf(e, n)) (e.flags & 131072) !== 0 && (dt = true);
        else return t.lanes = e.lanes, Nl(e, t, n);
      }
      return Lf(e, t, l, a, n);
    }
    function fd(e, t, l, a) {
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
          return cd(e, t, i, l, a);
        }
        if ((l & 536870912) !== 0) t.memoizedState = {
          baseLanes: 0,
          cachePool: null
        }, e !== null && vi(t, i !== null ? i.cachePool : null), i !== null ? ss(t, i) : sf(), ds(t);
        else return a = t.lanes = 536870912, cd(e, t, i !== null ? i.baseLanes | l : l, l, a);
      } else i !== null ? (vi(t, i.cachePool), ss(t, i), ua(), t.memoizedState = null) : (e !== null && vi(t, null), sf(), ua());
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
    function cd(e, t, l, a, n) {
      var i = nf();
      return i = i === null ? null : {
        parent: ot._currentValue,
        pool: i
      }, t.memoizedState = {
        baseLanes: l,
        cachePool: i
      }, e !== null && vi(t, null), sf(), ds(t), e !== null && sn(e, t, a, true), t.childLanes = n, null;
    }
    function xi(e, t) {
      return t = Hi({
        mode: t.mode,
        children: t.children
      }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
    }
    function od(e, t, l) {
      return ja(t, e.child, null, l), e = xi(t, t.pendingProps), e.flags |= 2, Xt(t), t.memoizedState = null, e;
    }
    function Cv(e, t, l) {
      var a = t.pendingProps, n = (t.flags & 128) !== 0;
      if (t.flags &= -129, e === null) {
        if (Ne) {
          if (a.mode === "hidden") return e = xi(t, a), t.lanes = 536870912, su(null, e);
          if (hf(t), (e = ke) ? (e = Rh(e, It), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: kl !== null ? {
              id: gl,
              overflow: pl
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, l = Jo(e), l.return = t, t.child = l, bt = t, ke = null)) : e = null, e === null) throw Il(t);
          return t.lanes = 536870912, null;
        }
        return xi(t, a);
      }
      var i = e.memoizedState;
      if (i !== null) {
        var c = i.dehydrated;
        if (hf(t), n) if (t.flags & 256) t.flags &= -257, t = od(e, t, l);
        else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
        else throw Error(f(558));
        else if (dt || sn(e, t, l, false), n = (l & e.childLanes) !== 0, dt || n) {
          if (a = Je, a !== null && (c = b(a, l), c !== 0 && c !== i.retryLane)) throw i.retryLane = c, Ca(e, c), Bt(a, e, c), Hf;
          Qi(), t = od(e, t, l);
        } else e = i.treeContext, ke = tl(c.nextSibling), bt = t, Ne = true, Pl = null, It = false, e !== null && Wo(t, e), t = xi(t, a), t.flags |= 4096;
        return t;
      }
      return e = Al(e.child, {
        mode: a.mode,
        children: a.children
      }), e.ref = t.ref, t.child = e, e.return = t, e;
    }
    function Ni(e, t) {
      var l = t.ref;
      if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof l != "function" && typeof l != "object") throw Error(f(284));
        (e === null || e.ref !== l) && (t.flags |= 4194816);
      }
    }
    function Lf(e, t, l, a, n) {
      return Ha(t), l = yf(e, t, l, a, void 0, n), a = vf(), e !== null && !dt ? (gf(e, t, n), Nl(e, t, n)) : (Ne && a && $r(t), t.flags |= 1, Rt(e, t, l, n), t.child);
    }
    function sd(e, t, l, a, n, i) {
      return Ha(t), t.updateQueue = null, l = ms(t, a, l, n), hs(e), a = vf(), e !== null && !dt ? (gf(e, t, i), Nl(e, t, i)) : (Ne && a && $r(t), t.flags |= 1, Rt(e, t, l, i), t.child);
    }
    function dd(e, t, l, a, n) {
      if (Ha(t), t.stateNode === null) {
        var i = rn, c = l.contextType;
        typeof c == "object" && c !== null && (i = Et(c)), i = new l(a, i), t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = xf, t.stateNode = i, i._reactInternals = t, i = t.stateNode, i.props = a, i.state = t.memoizedState, i.refs = {}, rf(t), c = l.contextType, i.context = typeof c == "object" && c !== null ? Et(c) : rn, i.state = t.memoizedState, c = l.getDerivedStateFromProps, typeof c == "function" && (Uf(t, l, c, a), i.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (c = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), c !== i.state && xf.enqueueReplaceState(i, i.state, null), iu(t, a, i, n), uu(), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308), a = true;
      } else if (e === null) {
        i = t.stateNode;
        var h = t.memoizedProps, p = qa(l, h);
        i.props = p;
        var O = i.context, w = l.contextType;
        c = rn, typeof w == "object" && w !== null && (c = Et(w));
        var Y = l.getDerivedStateFromProps;
        w = typeof Y == "function" || typeof i.getSnapshotBeforeUpdate == "function", h = t.pendingProps !== h, w || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (h || O !== c) && Ps(t, i, a, c), ta = false;
        var C = t.memoizedState;
        i.state = C, iu(t, a, i, n), uu(), O = t.memoizedState, h || C !== O || ta ? (typeof Y == "function" && (Uf(t, l, Y, a), O = t.memoizedState), (p = ta || ks(t, l, p, a, C, O, c)) ? (w || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = O), i.props = a, i.state = O, i.context = c, a = p) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), a = false);
      } else {
        i = t.stateNode, ff(e, t), c = t.memoizedProps, w = qa(l, c), i.props = w, Y = t.pendingProps, C = i.context, O = l.contextType, p = rn, typeof O == "object" && O !== null && (p = Et(O)), h = l.getDerivedStateFromProps, (O = typeof h == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (c !== Y || C !== p) && Ps(t, i, a, p), ta = false, C = t.memoizedState, i.state = C, iu(t, a, i, n), uu();
        var L = t.memoizedState;
        c !== Y || C !== L || ta || e !== null && e.dependencies !== null && mi(e.dependencies) ? (typeof h == "function" && (Uf(t, l, h, a), L = t.memoizedState), (w = ta || ks(t, l, w, a, C, L, p) || e !== null && e.dependencies !== null && mi(e.dependencies)) ? (O || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, L, p), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, L, p)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || c === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = L), i.props = a, i.state = L, i.context = p, a = w) : (typeof i.componentDidUpdate != "function" || c === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), a = false);
      }
      return i = a, Ni(e, t), a = (t.flags & 128) !== 0, i || a ? (i = t.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : i.render(), t.flags |= 1, e !== null && a ? (t.child = ja(t, e.child, null, n), t.child = ja(t, null, l, n)) : Rt(e, t, l, n), t.memoizedState = i.state, e = t.child) : e = Nl(e, t, n), e;
    }
    function hd(e, t, l, a) {
      return xa(), t.flags |= 256, Rt(e, t, l, a), t.child;
    }
    var wf = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    };
    function Bf(e) {
      return {
        baseLanes: e,
        cachePool: ls()
      };
    }
    function jf(e, t, l) {
      return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Vt), e;
    }
    function md(e, t, l) {
      var a = t.pendingProps, n = false, i = (t.flags & 128) !== 0, c;
      if ((c = i) || (c = e !== null && e.memoizedState === null ? false : (it.current & 2) !== 0), c && (n = true, t.flags &= -129), c = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (Ne) {
          if (n ? na(t) : ua(), (e = ke) ? (e = Rh(e, It), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
            dehydrated: e,
            treeContext: kl !== null ? {
              id: gl,
              overflow: pl
            } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, l = Jo(e), l.return = t, t.child = l, bt = t, ke = null)) : e = null, e === null) throw Il(t);
          return bc(e) ? t.lanes = 32 : t.lanes = 536870912, null;
        }
        var h = a.children;
        return a = a.fallback, n ? (ua(), n = t.mode, h = Hi({
          mode: "hidden",
          children: h
        }, n), a = Ua(a, n, l, null), h.return = t, a.return = t, h.sibling = a, t.child = h, a = t.child, a.memoizedState = Bf(l), a.childLanes = jf(e, c, l), t.memoizedState = wf, su(null, a)) : (na(t), Yf(t, h));
      }
      var p = e.memoizedState;
      if (p !== null && (h = p.dehydrated, h !== null)) {
        if (i) t.flags & 256 ? (na(t), t.flags &= -257, t = qf(e, t, l)) : t.memoizedState !== null ? (ua(), t.child = e.child, t.flags |= 128, t = null) : (ua(), h = a.fallback, n = t.mode, a = Hi({
          mode: "visible",
          children: a.children
        }, n), h = Ua(h, n, l, null), h.flags |= 2, a.return = t, h.return = t, a.sibling = h, t.child = a, ja(t, e.child, null, l), a = t.child, a.memoizedState = Bf(l), a.childLanes = jf(e, c, l), t.memoizedState = wf, t = su(null, a));
        else if (na(t), bc(h)) {
          if (c = h.nextSibling && h.nextSibling.dataset, c) var O = c.dgst;
          c = O, a = Error(f(419)), a.stack = "", a.digest = c, In({
            value: a,
            source: null,
            stack: null
          }), t = qf(e, t, l);
        } else if (dt || sn(e, t, l, false), c = (l & e.childLanes) !== 0, dt || c) {
          if (c = Je, c !== null && (a = b(c, l), a !== 0 && a !== p.retryLane)) throw p.retryLane = a, Ca(e, a), Bt(c, e, a), Hf;
          Sc(h) || Qi(), t = qf(e, t, l);
        } else Sc(h) ? (t.flags |= 192, t.child = e.child, t = null) : (e = p.treeContext, ke = tl(h.nextSibling), bt = t, Ne = true, Pl = null, It = false, e !== null && Wo(t, e), t = Yf(t, a.children), t.flags |= 4096);
        return t;
      }
      return n ? (ua(), h = a.fallback, n = t.mode, p = e.child, O = p.sibling, a = Al(p, {
        mode: "hidden",
        children: a.children
      }), a.subtreeFlags = p.subtreeFlags & 65011712, O !== null ? h = Al(O, h) : (h = Ua(h, n, l, null), h.flags |= 2), h.return = t, a.return = t, a.sibling = h, t.child = a, su(null, a), a = t.child, h = e.child.memoizedState, h === null ? h = Bf(l) : (n = h.cachePool, n !== null ? (p = ot._currentValue, n = n.parent !== p ? {
        parent: p,
        pool: p
      } : n) : n = ls(), h = {
        baseLanes: h.baseLanes | l,
        cachePool: n
      }), a.memoizedState = h, a.childLanes = jf(e, c, l), t.memoizedState = wf, su(e.child, a)) : (na(t), l = e.child, e = l.sibling, l = Al(l, {
        mode: "visible",
        children: a.children
      }), l.return = t, l.sibling = null, e !== null && (c = t.deletions, c === null ? (t.deletions = [
        e
      ], t.flags |= 16) : c.push(e)), t.child = l, t.memoizedState = null, l);
    }
    function Yf(e, t) {
      return t = Hi({
        mode: "visible",
        children: t
      }, e.mode), t.return = e, e.child = t;
    }
    function Hi(e, t) {
      return e = qt(22, e, null, t), e.lanes = 0, e;
    }
    function qf(e, t, l) {
      return ja(t, e.child, null, l), e = Yf(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
    }
    function yd(e, t, l) {
      e.lanes |= t;
      var a = e.alternate;
      a !== null && (a.lanes |= t), ef(e.return, t, l);
    }
    function Gf(e, t, l, a, n, i) {
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
    function vd(e, t, l) {
      var a = t.pendingProps, n = a.revealOrder, i = a.tail;
      a = a.children;
      var c = it.current, h = (c & 2) !== 0;
      if (h ? (c = c & 1 | 2, t.flags |= 128) : c &= 1, K(it, c), Rt(e, t, a, l), a = Ne ? Pn : 0, !h && e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && yd(e, l, t);
        else if (e.tag === 19) yd(e, l, t);
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
          for (l = t.child, n = null; l !== null; ) e = l.alternate, e !== null && Ri(e) === null && (n = l), l = l.sibling;
          l = n, l === null ? (n = t.child, t.child = null) : (n = l.sibling, l.sibling = null), Gf(t, false, n, l, i, a);
          break;
        case "backwards":
        case "unstable_legacy-backwards":
          for (l = null, n = t.child, t.child = null; n !== null; ) {
            if (e = n.alternate, e !== null && Ri(e) === null) {
              t.child = n;
              break;
            }
            e = n.sibling, n.sibling = l, l = n, n = e;
          }
          Gf(t, true, l, null, i, a);
          break;
        case "together":
          Gf(t, false, null, null, void 0, a);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function Nl(e, t, l) {
      if (e !== null && (t.dependencies = e.dependencies), fa |= t.lanes, (l & t.childLanes) === 0) if (e !== null) {
        if (sn(e, t, l, false), (l & t.childLanes) === 0) return null;
      } else return null;
      if (e !== null && t.child !== e.child) throw Error(f(153));
      if (t.child !== null) {
        for (e = t.child, l = Al(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; ) e = e.sibling, l = l.sibling = Al(e, e.pendingProps), l.return = t;
        l.sibling = null;
      }
      return t.child;
    }
    function Xf(e, t) {
      return (e.lanes & t) !== 0 ? true : (e = e.dependencies, !!(e !== null && mi(e)));
    }
    function Uv(e, t, l) {
      switch (t.tag) {
        case 3:
          ft(t, t.stateNode.containerInfo), ea(t, ot, e.memoizedState.cache), xa();
          break;
        case 27:
        case 5:
          Ra(t);
          break;
        case 4:
          ft(t, t.stateNode.containerInfo);
          break;
        case 10:
          ea(t, t.type, t.memoizedProps.value);
          break;
        case 31:
          if (t.memoizedState !== null) return t.flags |= 128, hf(t), null;
          break;
        case 13:
          var a = t.memoizedState;
          if (a !== null) return a.dehydrated !== null ? (na(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? md(e, t, l) : (na(t), e = Nl(e, t, l), e !== null ? e.sibling : null);
          na(t);
          break;
        case 19:
          var n = (e.flags & 128) !== 0;
          if (a = (l & t.childLanes) !== 0, a || (sn(e, t, l, false), a = (l & t.childLanes) !== 0), n) {
            if (a) return vd(e, t, l);
            t.flags |= 128;
          }
          if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), K(it, it.current), a) break;
          return null;
        case 22:
          return t.lanes = 0, fd(e, t, l, t.pendingProps);
        case 24:
          ea(t, ot, e.memoizedState.cache);
      }
      return Nl(e, t, l);
    }
    function gd(e, t, l) {
      if (e !== null) if (e.memoizedProps !== t.pendingProps) dt = true;
      else {
        if (!Xf(e, l) && (t.flags & 128) === 0) return dt = false, Uv(e, t, l);
        dt = (e.flags & 131072) !== 0;
      }
      else dt = false, Ne && (t.flags & 1048576) !== 0 && $o(t, Pn, t.index);
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: {
            var a = t.pendingProps;
            if (e = wa(t.elementType), t.type = e, typeof e == "function") Kr(e) ? (a = qa(e, a), t.tag = 1, t = dd(null, t, e, a, l)) : (t.tag = 0, t = Lf(null, t, e, a, l));
            else {
              if (e != null) {
                var n = e.$$typeof;
                if (n === ge) {
                  t.tag = 11, t = ud(null, t, e, a, l);
                  break e;
                } else if (n === le) {
                  t.tag = 14, t = id(null, t, e, a, l);
                  break e;
                }
              }
              throw t = xe(e) || e, Error(f(306, t, ""));
            }
          }
          return t;
        case 0:
          return Lf(e, t, t.type, t.pendingProps, l);
        case 1:
          return a = t.type, n = qa(a, t.pendingProps), dd(e, t, a, n, l);
        case 3:
          e: {
            if (ft(t, t.stateNode.containerInfo), e === null) throw Error(f(387));
            a = t.pendingProps;
            var i = t.memoizedState;
            n = i.element, ff(e, t), iu(t, a, null, l);
            var c = t.memoizedState;
            if (a = c.cache, ea(t, ot, a), a !== i.cache && tf(t, [
              ot
            ], l, true), uu(), a = c.element, i.isDehydrated) if (i = {
              element: a,
              isDehydrated: false,
              cache: c.cache
            }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
              t = hd(e, t, a, l);
              break e;
            } else if (a !== n) {
              n = Wt(Error(f(424)), t), In(n), t = hd(e, t, a, l);
              break e;
            } else for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, ke = tl(e.firstChild), bt = t, Ne = true, Pl = null, It = true, l = fs(t, null, a, l), t.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
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
          return Ni(e, t), e === null ? (l = _h(t.type, null, t.pendingProps, null)) ? t.memoizedState = l : Ne || (l = t.type, e = t.pendingProps, a = Wi(he.current).createElement(l), a[J] = t, a[P] = e, zt(a, l, e), Fe(a), t.stateNode = a) : t.memoizedState = _h(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
        case 27:
          return Ra(t), e === null && Ne && (a = t.stateNode = Mh(t.type, t.pendingProps, he.current), bt = t, It = true, n = ke, ha(t.type) ? (Ec = n, ke = tl(a.firstChild)) : ke = n), Rt(e, t, t.pendingProps.children, l), Ni(e, t), e === null && (t.flags |= 4194304), t.child;
        case 5:
          return e === null && Ne && ((n = a = ke) && (a = r0(a, t.type, t.pendingProps, It), a !== null ? (t.stateNode = a, bt = t, ke = tl(a.firstChild), It = false, n = true) : n = false), n || Il(t)), Ra(t), n = t.type, i = t.pendingProps, c = e !== null ? e.memoizedProps : null, a = i.children, vc(n, i) ? a = null : c !== null && vc(n, c) && (t.flags |= 32), t.memoizedState !== null && (n = yf(e, t, Rv, null, null, l), Du._currentValue = n), Ni(e, t), Rt(e, t, a, l), t.child;
        case 6:
          return e === null && Ne && ((e = l = ke) && (l = f0(l, t.pendingProps, It), l !== null ? (t.stateNode = l, bt = t, ke = null, e = true) : e = false), e || Il(t)), null;
        case 13:
          return md(e, t, l);
        case 4:
          return ft(t, t.stateNode.containerInfo), a = t.pendingProps, e === null ? t.child = ja(t, null, a, l) : Rt(e, t, a, l), t.child;
        case 11:
          return ud(e, t, t.type, t.pendingProps, l);
        case 7:
          return Rt(e, t, t.pendingProps, l), t.child;
        case 8:
          return Rt(e, t, t.pendingProps.children, l), t.child;
        case 12:
          return Rt(e, t, t.pendingProps.children, l), t.child;
        case 10:
          return a = t.pendingProps, ea(t, t.type, a.value), Rt(e, t, a.children, l), t.child;
        case 9:
          return n = t.type._context, a = t.pendingProps.children, Ha(t), n = Et(n), a = a(n), t.flags |= 1, Rt(e, t, a, l), t.child;
        case 14:
          return id(e, t, t.type, t.pendingProps, l);
        case 15:
          return rd(e, t, t.type, t.pendingProps, l);
        case 19:
          return vd(e, t, l);
        case 31:
          return Cv(e, t, l);
        case 22:
          return fd(e, t, l, t.pendingProps);
        case 24:
          return Ha(t), a = Et(ot), e === null ? (n = nf(), n === null && (n = Je, i = lf(), n.pooledCache = i, i.refCount++, i !== null && (n.pooledCacheLanes |= l), n = i), t.memoizedState = {
            parent: a,
            cache: n
          }, rf(t), ea(t, ot, n)) : ((e.lanes & l) !== 0 && (ff(e, t), iu(t, null, null, l), uu()), n = e.memoizedState, i = t.memoizedState, n.parent !== a ? (n = {
            parent: a,
            cache: a
          }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), ea(t, ot, a)) : (a = i.cache, ea(t, ot, a), a !== n.cache && tf(t, [
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
    function Qf(e, t, l, a, n) {
      if ((t = (e.mode & 32) !== 0) && (t = false), t) {
        if (e.flags |= 16777216, (n & 335544128) === n) if (e.stateNode.complete) e.flags |= 8192;
        else if (Vd()) e.flags |= 8192;
        else throw Ba = pi, uf;
      } else e.flags &= -16777217;
    }
    function pd(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
      else if (e.flags |= 16777216, !Nh(t)) if (Vd()) e.flags |= 8192;
      else throw Ba = pi, uf;
    }
    function Li(e, t) {
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
    function xv(e, t, l) {
      var a = t.pendingProps;
      switch (Wr(t), t.tag) {
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
          return l = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Cl(ot), Ze(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (on(t) ? Hl(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Pr())), Pe(t), null;
        case 26:
          var n = t.type, i = t.memoizedState;
          return e === null ? (Hl(t), i !== null ? (Pe(t), pd(t, i)) : (Pe(t), Qf(t, n, null, a, l))) : i ? i !== e.memoizedState ? (Hl(t), Pe(t), pd(t, i)) : (Pe(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && Hl(t), Pe(t), Qf(t, n, e, a, l)), null;
        case 27:
          if (Za(t), l = he.current, n = t.type, e !== null && t.stateNode != null) e.memoizedProps !== a && Hl(t);
          else {
            if (!a) {
              if (t.stateNode === null) throw Error(f(166));
              return Pe(t), null;
            }
            e = F.current, on(t) ? ko(t) : (e = Mh(n, a, l), t.stateNode = e, Hl(t));
          }
          return Pe(t), null;
        case 5:
          if (Za(t), n = t.type, e !== null && t.stateNode != null) e.memoizedProps !== a && Hl(t);
          else {
            if (!a) {
              if (t.stateNode === null) throw Error(f(166));
              return Pe(t), null;
            }
            if (i = F.current, on(t)) ko(t);
            else {
              var c = Wi(he.current);
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
              i[J] = t, i[P] = a;
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
          return Pe(t), Qf(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l), null;
        case 6:
          if (e && t.stateNode != null) e.memoizedProps !== a && Hl(t);
          else {
            if (typeof a != "string" && t.stateNode === null) throw Error(f(166));
            if (e = he.current, on(t)) {
              if (e = t.stateNode, l = t.memoizedProps, a = null, n = bt, n !== null) switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
              e[J] = t, e = !!(e.nodeValue === l || a !== null && a.suppressHydrationWarning === true || mh(e.nodeValue, l)), e || Il(t, true);
            } else e = Wi(e).createTextNode(a), e[J] = t, t.stateNode = e;
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
            } else l = Pr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = true;
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
            } else n = Pr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = true;
            if (!n) return t.flags & 256 ? (Xt(t), t) : (Xt(t), null);
          }
          return Xt(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = a !== null, e = e !== null && e.memoizedState !== null, l && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), i = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (i = a.memoizedState.cachePool.pool), i !== n && (a.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Li(t, t.updateQueue), Pe(t), null);
        case 4:
          return Ze(), e === null && sc(t.stateNode.containerInfo), Pe(t), null;
        case 10:
          return Cl(t.type), Pe(t), null;
        case 19:
          if (B(it), a = t.memoizedState, a === null) return Pe(t), null;
          if (n = (t.flags & 128) !== 0, i = a.rendering, i === null) if (n) du(a, false);
          else {
            if (at !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
              if (i = Ri(e), i !== null) {
                for (t.flags |= 128, du(a, false), e = i.updateQueue, t.updateQueue = e, Li(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; ) Ko(l, e), l = l.sibling;
                return K(it, it.current & 1 | 2), Ne && _l(t, a.treeForkCount), t.child;
              }
              e = e.sibling;
            }
            a.tail !== null && _t() > qi && (t.flags |= 128, n = true, du(a, false), t.lanes = 4194304);
          }
          else {
            if (!n) if (e = Ri(i), e !== null) {
              if (t.flags |= 128, n = true, e = e.updateQueue, t.updateQueue = e, Li(t, e), du(a, true), a.tail === null && a.tailMode === "hidden" && !i.alternate && !Ne) return Pe(t), null;
            } else 2 * _t() - a.renderingStartTime > qi && l !== 536870912 && (t.flags |= 128, n = true, du(a, false), t.lanes = 4194304);
            a.isBackwards ? (i.sibling = t.child, t.child = i) : (e = a.last, e !== null ? e.sibling = i : t.child = i, a.last = i);
          }
          return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = _t(), e.sibling = null, l = it.current, K(it, n ? l & 1 | 2 : l & 1), Ne && _l(t, a.treeForkCount), e) : (Pe(t), null);
        case 22:
        case 23:
          return Xt(t), df(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Pe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Pe(t), l = t.updateQueue, l !== null && Li(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== l && (t.flags |= 2048), e !== null && B(La), null;
        case 24:
          return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Cl(ot), Pe(t), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(f(156, t.tag));
    }
    function Nv(e, t) {
      switch (Wr(t), t.tag) {
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
          return B(it), null;
        case 4:
          return Ze(), null;
        case 10:
          return Cl(t.type), null;
        case 22:
        case 23:
          return Xt(t), df(), e !== null && B(La), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 24:
          return Cl(ot), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function Sd(e, t) {
      switch (Wr(t), t.tag) {
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
          B(it);
          break;
        case 10:
          Cl(t.type);
          break;
        case 22:
        case 23:
          Xt(t), df(), e !== null && B(La);
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
    function ia(e, t, l) {
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
    function bd(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var l = e.stateNode;
        try {
          os(t, l);
        } catch (a) {
          qe(e, e.return, a);
        }
      }
    }
    function Ed(e, t, l) {
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
    function Sl(e, t) {
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
    function Rd(e) {
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
    function Vf(e, t, l) {
      try {
        var a = e.stateNode;
        t0(a, e.type, l, t), a[P] = t;
      } catch (n) {
        qe(e, e.return, n);
      }
    }
    function zd(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ha(e.type) || e.tag === 4;
    }
    function Zf(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || zd(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.tag === 27 && ha(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Kf(e, t, l) {
      var a = e.tag;
      if (a === 5 || a === 6) e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = Ml));
      else if (a !== 4 && (a === 27 && ha(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null)) for (Kf(e, t, l), e = e.sibling; e !== null; ) Kf(e, t, l), e = e.sibling;
    }
    function wi(e, t, l) {
      var a = e.tag;
      if (a === 5 || a === 6) e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
      else if (a !== 4 && (a === 27 && ha(e.type) && (l = e.stateNode), e = e.child, e !== null)) for (wi(e, t, l), e = e.sibling; e !== null; ) wi(e, t, l), e = e.sibling;
    }
    function Td(e) {
      var t = e.stateNode, l = e.memoizedProps;
      try {
        for (var a = e.type, n = t.attributes; n.length; ) t.removeAttributeNode(n[0]);
        zt(t, a, l), t[J] = e, t[P] = l;
      } catch (i) {
        qe(e, e.return, i);
      }
    }
    var Ll = false, ht = false, Jf = false, Md = typeof WeakSet == "function" ? WeakSet : Set, St = null;
    function Hv(e, t) {
      if (e = e.containerInfo, mc = ar, e = Bo(e), Yr(e)) {
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
            var c = 0, h = -1, p = -1, O = 0, w = 0, Y = e, C = null;
            t: for (; ; ) {
              for (var L; Y !== l || n !== 0 && Y.nodeType !== 3 || (h = c + n), Y !== i || a !== 0 && Y.nodeType !== 3 || (p = c + a), Y.nodeType === 3 && (c += Y.nodeValue.length), (L = Y.firstChild) !== null; ) C = Y, Y = L;
              for (; ; ) {
                if (Y === e) break t;
                if (C === l && ++O === n && (h = c), C === i && ++w === a && (p = c), (L = Y.nextSibling) !== null) break;
                Y = C, C = Y.parentNode;
              }
              Y = L;
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
      for (yc = {
        focusedElem: e,
        selectionRange: l
      }, ar = false, St = t; St !== null; ) if (t = St, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, St = e;
      else for (; St !== null; ) {
        switch (t = St, i = t.alternate, e = t.flags, t.tag) {
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
              } catch (de) {
                qe(l, l.return, de);
              }
            }
            break;
          case 3:
            if ((e & 1024) !== 0) {
              if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9) pc(e);
              else if (l === 1) switch (e.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  pc(e);
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
          e.return = t.return, St = e;
          break;
        }
        St = t.return;
      }
    }
    function Dd(e, t, l) {
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
          a & 64 && bd(l), a & 512 && mu(l, l.return);
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
              os(e, t);
            } catch (c) {
              qe(l, l.return, c);
            }
          }
          break;
        case 27:
          t === null && a & 4 && Td(l);
        case 26:
        case 5:
          Bl(e, l), t === null && a & 4 && Rd(l), a & 512 && mu(l, l.return);
          break;
        case 12:
          Bl(e, l);
          break;
        case 31:
          Bl(e, l), a & 4 && Od(e, l);
          break;
        case 13:
          Bl(e, l), a & 4 && Cd(e, l), a & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = Qv.bind(null, l), c0(e, l))));
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
    function Ad(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, Ad(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ke(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    var Ie = null, Nt = false;
    function wl(e, t, l) {
      for (l = l.child; l !== null; ) _d(e, t, l), l = l.sibling;
    }
    function _d(e, t, l) {
      if (Ot && typeof Ot.onCommitFiberUnmount == "function") try {
        Ot.onCommitFiberUnmount(zl, l);
      } catch {
      }
      switch (l.tag) {
        case 26:
          ht || Sl(l, t), wl(e, t, l), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
          break;
        case 27:
          ht || Sl(l, t);
          var a = Ie, n = Nt;
          ha(l.type) && (Ie = l.stateNode, Nt = false), wl(e, t, l), zu(l.stateNode), Ie = a, Nt = n;
          break;
        case 5:
          ht || Sl(l, t);
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
          Ie !== null && (Nt ? (e = Ie, bh(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.stateNode), Un(e)) : bh(Ie, l.stateNode));
          break;
        case 4:
          a = Ie, n = Nt, Ie = l.stateNode.containerInfo, Nt = true, wl(e, t, l), Ie = a, Nt = n;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          ia(2, l, t), ht || ia(4, l, t), wl(e, t, l);
          break;
        case 1:
          ht || (Sl(l, t), a = l.stateNode, typeof a.componentWillUnmount == "function" && Ed(l, t, a)), wl(e, t, l);
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
    function Od(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
        e = e.dehydrated;
        try {
          Un(e);
        } catch (l) {
          qe(t, t.return, l);
        }
      }
    }
    function Cd(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
        Un(e);
      } catch (l) {
        qe(t, t.return, l);
      }
    }
    function Lv(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new Md()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Md()), t;
        default:
          throw Error(f(435, e.tag));
      }
    }
    function Bi(e, t) {
      var l = Lv(e);
      t.forEach(function(a) {
        if (!l.has(a)) {
          l.add(a);
          var n = Vv.bind(null, e, a);
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
              if (ha(h.type)) {
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
        _d(i, c, n), Ie = null, Nt = false, i = n.alternate, i !== null && (i.return = null), n.return = null;
      }
      if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) Ud(t, e), t = t.sibling;
    }
    var cl = null;
    function Ud(e, t) {
      var l = e.alternate, a = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ht(t, e), Lt(e), a & 4 && (ia(3, e, e.return), hu(3, e), ia(5, e, e.return));
          break;
        case 1:
          Ht(t, e), Lt(e), a & 512 && (ht || l === null || Sl(l, l.return)), a & 64 && Ll && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
          break;
        case 26:
          var n = cl;
          if (Ht(t, e), Lt(e), a & 512 && (ht || l === null || Sl(l, l.return)), a & 4) {
            var i = l !== null ? l.memoizedState : null;
            if (a = e.memoizedState, l === null) if (a === null) if (e.stateNode === null) {
              e: {
                a = e.type, l = e.memoizedProps, n = n.ownerDocument || n;
                t: switch (a) {
                  case "title":
                    i = n.getElementsByTagName("title")[0], (!i || i[Me] || i[J] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = n.createElement(a), n.head.insertBefore(i, n.querySelector("head > title"))), zt(i, a, l), i[J] = e, Fe(i), a = i;
                    break e;
                  case "link":
                    var c = Uh("link", "href", n).get(a + (l.href || ""));
                    if (c) {
                      for (var h = 0; h < c.length; h++) if (i = c[h], i.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && i.getAttribute("rel") === (l.rel == null ? null : l.rel) && i.getAttribute("title") === (l.title == null ? null : l.title) && i.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                        c.splice(h, 1);
                        break t;
                      }
                    }
                    i = n.createElement(a), zt(i, a, l), n.head.appendChild(i);
                    break;
                  case "meta":
                    if (c = Uh("meta", "content", n).get(a + (l.content || ""))) {
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
            } else xh(n, e.type, e.stateNode);
            else e.stateNode = Ch(n, a, e.memoizedProps);
            else i !== a ? (i === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : i.count--, a === null ? xh(n, e.type, e.stateNode) : Ch(n, a, e.memoizedProps)) : a === null && e.stateNode !== null && Vf(e, e.memoizedProps, l.memoizedProps);
          }
          break;
        case 27:
          Ht(t, e), Lt(e), a & 512 && (ht || l === null || Sl(l, l.return)), l !== null && a & 4 && Vf(e, e.memoizedProps, l.memoizedProps);
          break;
        case 5:
          if (Ht(t, e), Lt(e), a & 512 && (ht || l === null || Sl(l, l.return)), e.flags & 32) {
            n = e.stateNode;
            try {
              Ia(n, "");
            } catch (te) {
              qe(e, e.return, te);
            }
          }
          a & 4 && e.stateNode != null && (n = e.memoizedProps, Vf(e, n, l !== null ? l.memoizedProps : n)), a & 1024 && (Jf = true);
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
          if (Ii = null, n = cl, cl = ki(t.containerInfo), Ht(t, e), cl = n, Lt(e), a & 4 && l !== null && l.memoizedState.isDehydrated) try {
            Un(t.containerInfo);
          } catch (te) {
            qe(e, e.return, te);
          }
          Jf && (Jf = false, xd(e));
          break;
        case 4:
          a = cl, cl = ki(e.stateNode.containerInfo), Ht(t, e), Lt(e), cl = a;
          break;
        case 12:
          Ht(t, e), Lt(e);
          break;
        case 31:
          Ht(t, e), Lt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Bi(e, a)));
          break;
        case 13:
          Ht(t, e), Lt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Yi = _t()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Bi(e, a)));
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
                    var Y = p.memoizedProps.style, C = Y != null && Y.hasOwnProperty("display") ? Y.display : null;
                    h.style.display = C == null || typeof C == "boolean" ? "" : ("" + C).trim();
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
                  var L = p.stateNode;
                  n ? Eh(L, true) : Eh(p.stateNode, false);
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
          a & 4 && (a = e.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, Bi(e, l))));
          break;
        case 19:
          Ht(t, e), Lt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Bi(e, a)));
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
            if (zd(a)) {
              l = a;
              break;
            }
            a = a.return;
          }
          if (l == null) throw Error(f(160));
          switch (l.tag) {
            case 27:
              var n = l.stateNode, i = Zf(e);
              wi(e, i, n);
              break;
            case 5:
              var c = l.stateNode;
              l.flags & 32 && (Ia(c, ""), l.flags &= -33);
              var h = Zf(e);
              wi(e, h, c);
              break;
            case 3:
            case 4:
              var p = l.stateNode.containerInfo, O = Zf(e);
              Kf(e, O, p);
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
    function xd(e) {
      if (e.subtreeFlags & 1024) for (e = e.child; e !== null; ) {
        var t = e;
        xd(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
    }
    function Bl(e, t) {
      if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) Dd(e, t.alternate, t), t = t.sibling;
    }
    function Ga(e) {
      for (e = e.child; e !== null; ) {
        var t = e;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ia(4, t, t.return), Ga(t);
            break;
          case 1:
            Sl(t, t.return);
            var l = t.stateNode;
            typeof l.componentWillUnmount == "function" && Ed(t, t.return, l), Ga(t);
            break;
          case 27:
            zu(t.stateNode);
          case 26:
          case 5:
            Sl(t, t.return), Ga(t);
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
                if (p !== null) for (n.shared.hiddenCallbacks = null, n = 0; n < p.length; n++) cs(p[n], h);
              } catch (O) {
                qe(a, a.return, O);
              }
            }
            l && c & 64 && bd(i), mu(i, i.return);
            break;
          case 27:
            Td(i);
          case 26:
          case 5:
            jl(n, i, l), l && a === null && c & 4 && Rd(i), mu(i, i.return);
            break;
          case 12:
            jl(n, i, l);
            break;
          case 31:
            jl(n, i, l), l && c & 4 && Od(n, i);
            break;
          case 13:
            jl(n, i, l), l && c & 4 && Cd(n, i);
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
    function Ff(e, t) {
      var l = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && eu(l));
    }
    function $f(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && eu(e));
    }
    function ol(e, t, l, a) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) Nd(e, t, l, a), t = t.sibling;
    }
    function Nd(e, t, l, a) {
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
          i = t.stateNode, c = t.alternate, t.memoizedState !== null ? i._visibility & 2 ? ol(e, t, l, a) : yu(e, t) : i._visibility & 2 ? ol(e, t, l, a) : (i._visibility |= 2, bn(e, t, l, a, (t.subtreeFlags & 10256) !== 0 || false)), n & 2048 && Ff(c, t);
          break;
        case 24:
          ol(e, t, l, a), n & 2048 && $f(t.alternate, t);
          break;
        default:
          ol(e, t, l, a);
      }
    }
    function bn(e, t, l, a, n) {
      for (n = n && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
        var i = e, c = t, h = l, p = a, O = c.flags;
        switch (c.tag) {
          case 0:
          case 11:
          case 15:
            bn(i, c, h, p, n), hu(8, c);
            break;
          case 23:
            break;
          case 22:
            var w = c.stateNode;
            c.memoizedState !== null ? w._visibility & 2 ? bn(i, c, h, p, n) : yu(i, c) : (w._visibility |= 2, bn(i, c, h, p, n)), n && O & 2048 && Ff(c.alternate, c);
            break;
          case 24:
            bn(i, c, h, p, n), n && O & 2048 && $f(c.alternate, c);
            break;
          default:
            bn(i, c, h, p, n);
        }
        t = t.sibling;
      }
    }
    function yu(e, t) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
        var l = e, a = t, n = a.flags;
        switch (a.tag) {
          case 22:
            yu(l, a), n & 2048 && Ff(a.alternate, a);
            break;
          case 24:
            yu(l, a), n & 2048 && $f(a.alternate, a);
            break;
          default:
            yu(l, a);
        }
        t = t.sibling;
      }
    }
    var vu = 8192;
    function En(e, t, l) {
      if (e.subtreeFlags & vu) for (e = e.child; e !== null; ) Hd(e, t, l), e = e.sibling;
    }
    function Hd(e, t, l) {
      switch (e.tag) {
        case 26:
          En(e, t, l), e.flags & vu && e.memoizedState !== null && E0(l, cl, e.memoizedState, e.memoizedProps);
          break;
        case 5:
          En(e, t, l);
          break;
        case 3:
        case 4:
          var a = cl;
          cl = ki(e.stateNode.containerInfo), En(e, t, l), cl = a;
          break;
        case 22:
          e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = vu, vu = 16777216, En(e, t, l), vu = a) : En(e, t, l));
          break;
        default:
          En(e, t, l);
      }
    }
    function Ld(e) {
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
          St = a, Bd(a, e);
        }
        Ld(e);
      }
      if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) wd(e), e = e.sibling;
    }
    function wd(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          gu(e), e.flags & 2048 && ia(9, e, e.return);
          break;
        case 3:
          gu(e);
          break;
        case 12:
          gu(e);
          break;
        case 22:
          var t = e.stateNode;
          e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, ji(e)) : gu(e);
          break;
        default:
          gu(e);
      }
    }
    function ji(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null) for (var l = 0; l < t.length; l++) {
          var a = t[l];
          St = a, Bd(a, e);
        }
        Ld(e);
      }
      for (e = e.child; e !== null; ) {
        switch (t = e, t.tag) {
          case 0:
          case 11:
          case 15:
            ia(8, t, t.return), ji(t);
            break;
          case 22:
            l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, ji(t));
            break;
          default:
            ji(t);
        }
        e = e.sibling;
      }
    }
    function Bd(e, t) {
      for (; St !== null; ) {
        var l = St;
        switch (l.tag) {
          case 0:
          case 11:
          case 15:
            ia(8, l, t);
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
        if (a = l.child, a !== null) a.return = l, St = a;
        else e: for (l = e; St !== null; ) {
          a = St;
          var n = a.sibling, i = a.return;
          if (Ad(a), a === l) {
            St = null;
            break e;
          }
          if (n !== null) {
            n.return = i, St = n;
            break e;
          }
          St = i;
        }
      }
    }
    var wv = {
      getCacheForType: function(e) {
        var t = Et(ot), l = t.data.get(e);
        return l === void 0 && (l = e(), t.data.set(e, l)), l;
      },
      cacheSignal: function() {
        return Et(ot).controller.signal;
      }
    }, Bv = typeof WeakMap == "function" ? WeakMap : Map, je = 0, Je = null, Ae = null, Oe = 0, Ye = 0, Qt = null, ra = false, Rn = false, Wf = false, Yl = 0, at = 0, fa = 0, Xa = 0, kf = 0, Vt = 0, zn = 0, pu = null, wt = null, Pf = false, Yi = 0, jd = 0, qi = 1 / 0, Gi = null, ca = null, vt = 0, oa = null, Tn = null, ql = 0, If = 0, ec = null, Yd = null, Su = 0, tc = null;
    function Zt() {
      return (je & 2) !== 0 && Oe !== 0 ? Oe & -Oe : N.T !== null ? rc() : Q();
    }
    function qd() {
      if (Vt === 0) if ((Oe & 536870912) === 0 || Ne) {
        var e = Tl;
        Tl <<= 1, (Tl & 3932160) === 0 && (Tl = 262144), Vt = e;
      } else Vt = 536870912;
      return e = Gt.current, e !== null && (e.flags |= 32), Vt;
    }
    function Bt(e, t, l) {
      (e === Je && (Ye === 2 || Ye === 9) || e.cancelPendingCommit !== null) && (Mn(e, 0), sa(e, Oe, Vt, false)), ml(e, l), ((je & 2) === 0 || e !== Je) && (e === Je && ((je & 2) === 0 && (Xa |= l), at === 4 && sa(e, Oe, Vt, false)), bl(e));
    }
    function Gd(e, t, l) {
      if ((je & 6) !== 0) throw Error(f(327));
      var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Jl(e, t), n = a ? qv(e, t) : ac(e, t, true), i = a;
      do {
        if (n === 0) {
          Rn && !a && sa(e, t, 0, false);
          break;
        } else {
          if (l = e.current.alternate, i && !jv(l)) {
            n = ac(e, t, false), i = false;
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
                if (p && (Mn(h, c).flags |= 256), c = ac(h, c, false), c !== 2) {
                  if (Wf && !p) {
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
            Mn(e, 0), sa(e, t, 0, true);
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
                sa(a, t, Vt, !ra);
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
            if ((t & 62914560) === t && (n = Yi + 300 - _t(), 10 < n)) {
              if (sa(a, t, Vt, !ra), Fa(a, 0, true) !== 0) break e;
              ql = t, a.timeoutHandle = ph(Xd.bind(null, a, l, wt, Gi, Pf, t, Vt, Xa, zn, ra, i, "Throttled", -0, 0), n);
              break e;
            }
            Xd(a, l, wt, Gi, Pf, t, Vt, Xa, zn, ra, i, null, -0, 0);
          }
        }
        break;
      } while (true);
      bl(e);
    }
    function Xd(e, t, l, a, n, i, c, h, p, O, w, Y, C, L) {
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
        }, Hd(t, i, Y);
        var te = (i & 62914560) === i ? Yi - _t() : (i & 4194048) === i ? jd - _t() : 0;
        if (te = R0(Y, te), te !== null) {
          ql = i, e.cancelPendingCommit = te(Wd.bind(null, e, t, i, l, a, n, c, h, p, w, Y, null, C, L)), sa(e, i, c, !O);
          return;
        }
      }
      Wd(e, t, i, l, a, n, c, h, p);
    }
    function jv(e) {
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
    function sa(e, t, l, a) {
      t &= ~kf, t &= ~Xa, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
      for (var n = t; 0 < n; ) {
        var i = 31 - Tt(n), c = 1 << i;
        a[i] = -1, n &= ~c;
      }
      l !== 0 && ku(e, l, t);
    }
    function Xi() {
      return (je & 6) === 0 ? (bu(0), false) : true;
    }
    function lc() {
      if (Ae !== null) {
        if (Ye === 0) var e = Ae.return;
        else e = Ae, Ol = Na = null, pf(e), yn = null, lu = 0, e = Ae;
        for (; e !== null; ) Sd(e.alternate, e), e = e.return;
        Ae = null;
      }
    }
    function Mn(e, t) {
      var l = e.timeoutHandle;
      l !== -1 && (e.timeoutHandle = -1, n0(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), ql = 0, lc(), Je = e, Ae = l = Al(e.current, null), Oe = t, Ye = 0, Qt = null, ra = false, Rn = Jl(e, t), Wf = false, zn = Vt = kf = Xa = fa = at = 0, wt = pu = null, Pf = false, (t & 8) !== 0 && (t |= t & 32);
      var a = e.entangledLanes;
      if (a !== 0) for (e = e.entanglements, a &= t; 0 < a; ) {
        var n = 31 - Tt(a), i = 1 << n;
        t |= e[n], a &= ~i;
      }
      return Yl = t, ci(), l;
    }
    function Qd(e, t) {
      Se = null, N.H = ou, t === mn || t === gi ? (t = us(), Ye = 3) : t === uf ? (t = us(), Ye = 4) : Ye = t === Hf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Qt = t, Ae === null && (at = 1, Ui(e, Wt(t, e.current)));
    }
    function Vd() {
      var e = Gt.current;
      return e === null ? true : (Oe & 4194048) === Oe ? el === null : (Oe & 62914560) === Oe || (Oe & 536870912) !== 0 ? e === el : false;
    }
    function Zd() {
      var e = N.H;
      return N.H = ou, e === null ? ou : e;
    }
    function Kd() {
      var e = N.A;
      return N.A = wv, e;
    }
    function Qi() {
      at = 4, ra || (Oe & 4194048) !== Oe && Gt.current !== null || (Rn = true), (fa & 134217727) === 0 && (Xa & 134217727) === 0 || Je === null || sa(Je, Oe, Vt, false);
    }
    function ac(e, t, l) {
      var a = je;
      je |= 2;
      var n = Zd(), i = Kd();
      (Je !== e || Oe !== t) && (Gi = null, Mn(e, t)), t = false;
      var c = at;
      e: do
        try {
          if (Ye !== 0 && Ae !== null) {
            var h = Ae, p = Qt;
            switch (Ye) {
              case 8:
                lc(), c = 6;
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
          Yv(), c = at;
          break;
        } catch (w) {
          Qd(e, w);
        }
      while (true);
      return t && e.shellSuspendCounter++, Ol = Na = null, je = a, N.H = n, N.A = i, Ae === null && (Je = null, Oe = 0, ci()), c;
    }
    function Yv() {
      for (; Ae !== null; ) Jd(Ae);
    }
    function qv(e, t) {
      var l = je;
      je |= 2;
      var a = Zd(), n = Kd();
      Je !== e || Oe !== t ? (Gi = null, qi = _t() + 500, Mn(e, t)) : Rn = Jl(e, t);
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
                if (as(i)) {
                  Ye = 0, Qt = null, Fd(t);
                  break;
                }
                t = function() {
                  Ye !== 2 && Ye !== 9 || Je !== e || (Ye = 7), bl(e);
                }, i.then(t, t);
                break e;
              case 3:
                Ye = 7;
                break e;
              case 4:
                Ye = 5;
                break e;
              case 7:
                as(i) ? (Ye = 0, Qt = null, Fd(t)) : (Ye = 0, Qt = null, Dn(e, t, i, 7));
                break;
              case 5:
                var c = null;
                switch (Ae.tag) {
                  case 26:
                    c = Ae.memoizedState;
                  case 5:
                  case 27:
                    var h = Ae;
                    if (c ? Nh(c) : h.stateNode.complete) {
                      Ye = 0, Qt = null;
                      var p = h.sibling;
                      if (p !== null) Ae = p;
                      else {
                        var O = h.return;
                        O !== null ? (Ae = O, Vi(O)) : Ae = null;
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
                lc(), at = 6;
                break e;
              default:
                throw Error(f(462));
            }
          }
          Gv();
          break;
        } catch (w) {
          Qd(e, w);
        }
      while (true);
      return Ol = Na = null, N.H = a, N.A = n, je = l, Ae !== null ? 0 : (Je = null, Oe = 0, ci(), at);
    }
    function Gv() {
      for (; Ae !== null && !Sr(); ) Jd(Ae);
    }
    function Jd(e) {
      var t = gd(e.alternate, e, Yl);
      e.memoizedProps = e.pendingProps, t === null ? Vi(e) : Ae = t;
    }
    function Fd(e) {
      var t = e, l = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = sd(l, t, t.pendingProps, t.type, void 0, Oe);
          break;
        case 11:
          t = sd(l, t, t.pendingProps, t.type.render, t.ref, Oe);
          break;
        case 5:
          pf(t);
        default:
          Sd(l, t), t = Ae = Ko(t, Yl), t = gd(l, t, Yl);
      }
      e.memoizedProps = e.pendingProps, t === null ? Vi(e) : Ae = t;
    }
    function Dn(e, t, l, a) {
      Ol = Na = null, pf(t), yn = null, lu = 0;
      var n = t.return;
      try {
        if (Ov(e, n, t, l, Oe)) {
          at = 1, Ui(e, Wt(l, e.current)), Ae = null;
          return;
        }
      } catch (i) {
        if (n !== null) throw Ae = n, i;
        at = 1, Ui(e, Wt(l, e.current)), Ae = null;
        return;
      }
      t.flags & 32768 ? (Ne || a === 1 ? e = true : Rn || (Oe & 536870912) !== 0 ? e = false : (ra = e = true, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Gt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), $d(t, e)) : Vi(t);
    }
    function Vi(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          $d(t, ra);
          return;
        }
        e = t.return;
        var l = xv(t.alternate, t, Yl);
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
    function $d(e, t) {
      do {
        var l = Nv(e.alternate, e);
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
    function Wd(e, t, l, a, n, i, c, h, p) {
      e.cancelPendingCommit = null;
      do
        Zi();
      while (vt !== 0);
      if ((je & 6) !== 0) throw Error(f(327));
      if (t !== null) {
        if (t === e.current) throw Error(f(177));
        if (i = t.lanes | t.childLanes, i |= Vr, Wu(e, l, i, c, h, p), e === Je && (Ae = Je = null, Oe = 0), Tn = t, oa = e, ql = l, If = i, ec = n, Yd = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Zv(Kl, function() {
          return th(), null;
        })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
          a = N.T, N.T = null, n = V.p, V.p = 2, c = je, je |= 4;
          try {
            Hv(e, t, l);
          } finally {
            je = c, V.p = n, N.T = a;
          }
        }
        vt = 1, kd(), Pd(), Id();
      }
    }
    function kd() {
      if (vt === 1) {
        vt = 0;
        var e = oa, t = Tn, l = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || l) {
          l = N.T, N.T = null;
          var a = V.p;
          V.p = 2;
          var n = je;
          je |= 4;
          try {
            Ud(t, e);
            var i = yc, c = Bo(e.containerInfo), h = i.focusedElem, p = i.selectionRange;
            if (c !== h && h && h.ownerDocument && wo(h.ownerDocument.documentElement, h)) {
              if (p !== null && Yr(h)) {
                var O = p.start, w = p.end;
                if (w === void 0 && (w = O), "selectionStart" in h) h.selectionStart = O, h.selectionEnd = Math.min(w, h.value.length);
                else {
                  var Y = h.ownerDocument || document, C = Y && Y.defaultView || window;
                  if (C.getSelection) {
                    var L = C.getSelection(), te = h.textContent.length, de = Math.min(p.start, te), Qe = p.end === void 0 ? de : Math.min(p.end, te);
                    !L.extend && de > Qe && (c = Qe, Qe = de, de = c);
                    var M = Lo(h, de), R = Lo(h, Qe);
                    if (M && R && (L.rangeCount !== 1 || L.anchorNode !== M.node || L.anchorOffset !== M.offset || L.focusNode !== R.node || L.focusOffset !== R.offset)) {
                      var _ = Y.createRange();
                      _.setStart(M.node, M.offset), L.removeAllRanges(), de > Qe ? (L.addRange(_), L.extend(R.node, R.offset)) : (_.setEnd(R.node, R.offset), L.addRange(_));
                    }
                  }
                }
              }
              for (Y = [], L = h; L = L.parentNode; ) L.nodeType === 1 && Y.push({
                element: L,
                left: L.scrollLeft,
                top: L.scrollTop
              });
              for (typeof h.focus == "function" && h.focus(), h = 0; h < Y.length; h++) {
                var j = Y[h];
                j.element.scrollLeft = j.left, j.element.scrollTop = j.top;
              }
            }
            ar = !!mc, yc = mc = null;
          } finally {
            je = n, V.p = a, N.T = l;
          }
        }
        e.current = t, vt = 2;
      }
    }
    function Pd() {
      if (vt === 2) {
        vt = 0;
        var e = oa, t = Tn, l = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || l) {
          l = N.T, N.T = null;
          var a = V.p;
          V.p = 2;
          var n = je;
          je |= 4;
          try {
            Dd(e, t.alternate, t);
          } finally {
            je = n, V.p = a, N.T = l;
          }
        }
        vt = 3;
      }
    }
    function Id() {
      if (vt === 4 || vt === 3) {
        vt = 0, br();
        var e = oa, t = Tn, l = ql, a = Yd;
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? vt = 5 : (vt = 0, Tn = oa = null, eh(e, e.pendingLanes));
        var n = e.pendingLanes;
        if (n === 0 && (ca = null), U(l), t = t.stateNode, Ot && typeof Ot.onCommitFiberRoot == "function") try {
          Ot.onCommitFiberRoot(zl, t, void 0, (t.current.flags & 128) === 128);
        } catch {
        }
        if (a !== null) {
          t = N.T, n = V.p, V.p = 2, N.T = null;
          try {
            for (var i = e.onRecoverableError, c = 0; c < a.length; c++) {
              var h = a[c];
              i(h.value, {
                componentStack: h.stack
              });
            }
          } finally {
            N.T = t, V.p = n;
          }
        }
        (ql & 3) !== 0 && Zi(), bl(e), n = e.pendingLanes, (l & 261930) !== 0 && (n & 42) !== 0 ? e === tc ? Su++ : (Su = 0, tc = e) : Su = 0, bu(0);
      }
    }
    function eh(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, eu(t)));
    }
    function Zi() {
      return kd(), Pd(), Id(), th();
    }
    function th() {
      if (vt !== 5) return false;
      var e = oa, t = If;
      If = 0;
      var l = U(ql), a = N.T, n = V.p;
      try {
        V.p = 32 > l ? 32 : l, N.T = null, l = ec, ec = null;
        var i = oa, c = ql;
        if (vt = 0, Tn = oa = null, ql = 0, (je & 6) !== 0) throw Error(f(331));
        var h = je;
        if (je |= 4, wd(i.current), Nd(i, i.current, c, l), je = h, bu(0, false), Ot && typeof Ot.onPostCommitFiberRoot == "function") try {
          Ot.onPostCommitFiberRoot(zl, i);
        } catch {
        }
        return true;
      } finally {
        V.p = n, N.T = a, eh(e, t);
      }
    }
    function lh(e, t, l) {
      t = Wt(l, t), t = Nf(e.stateNode, t, 2), e = aa(e, t, 2), e !== null && (ml(e, 2), bl(e));
    }
    function qe(e, t, l) {
      if (e.tag === 3) lh(e, e, l);
      else for (; t !== null; ) {
        if (t.tag === 3) {
          lh(t, e, l);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ca === null || !ca.has(a))) {
            e = Wt(l, e), l = ad(2), a = aa(t, l, 2), a !== null && (nd(l, a, t, e), ml(a, 2), bl(a));
            break;
          }
        }
        t = t.return;
      }
    }
    function nc(e, t, l) {
      var a = e.pingCache;
      if (a === null) {
        a = e.pingCache = new Bv();
        var n = /* @__PURE__ */ new Set();
        a.set(t, n);
      } else n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
      n.has(l) || (Wf = true, n.add(l), e = Xv.bind(null, e, t, l), t.then(e, e));
    }
    function Xv(e, t, l) {
      var a = e.pingCache;
      a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Je === e && (Oe & l) === l && (at === 4 || at === 3 && (Oe & 62914560) === Oe && 300 > _t() - Yi ? (je & 2) === 0 && Mn(e, 0) : kf |= l, zn === Oe && (zn = 0)), bl(e);
    }
    function ah(e, t) {
      t === 0 && (t = Xn()), e = Ca(e, t), e !== null && (ml(e, t), bl(e));
    }
    function Qv(e) {
      var t = e.memoizedState, l = 0;
      t !== null && (l = t.retryLane), ah(e, l);
    }
    function Vv(e, t) {
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
      a !== null && a.delete(t), ah(e, l);
    }
    function Zv(e, t) {
      return Ja(e, t);
    }
    var Ki = null, An = null, uc = false, Ji = false, ic = false, da = 0;
    function bl(e) {
      e !== An && e.next === null && (An === null ? Ki = An = e : An = An.next = e), Ji = true, uc || (uc = true, Jv());
    }
    function bu(e, t) {
      if (!ic && Ji) {
        ic = true;
        do
          for (var l = false, a = Ki; a !== null; ) {
            if (e !== 0) {
              var n = a.pendingLanes;
              if (n === 0) var i = 0;
              else {
                var c = a.suspendedLanes, h = a.pingedLanes;
                i = (1 << 31 - Tt(42 | e) + 1) - 1, i &= n & ~(c & ~h), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
              }
              i !== 0 && (l = true, rh(a, i));
            } else i = Oe, i = Fa(a, a === Je ? i : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), (i & 3) === 0 || Jl(a, i) || (l = true, rh(a, i));
            a = a.next;
          }
        while (l);
        ic = false;
      }
    }
    function Kv() {
      nh();
    }
    function nh() {
      Ji = uc = false;
      var e = 0;
      da !== 0 && a0() && (e = da);
      for (var t = _t(), l = null, a = Ki; a !== null; ) {
        var n = a.next, i = uh(a, t);
        i === 0 ? (a.next = null, l === null ? Ki = n : l.next = n, n === null && (An = l)) : (l = a, (e !== 0 || (i & 3) !== 0) && (Ji = true)), a = n;
      }
      vt !== 0 && vt !== 5 || bu(e), da !== 0 && (da = 0);
    }
    function uh(e, t) {
      for (var l = e.suspendedLanes, a = e.pingedLanes, n = e.expirationTimes, i = e.pendingLanes & -62914561; 0 < i; ) {
        var c = 31 - Tt(i), h = 1 << c, p = n[c];
        p === -1 ? ((h & l) === 0 || (h & a) !== 0) && (n[c] = zr(h, t)) : p <= t && (e.expiredLanes |= h), i &= ~h;
      }
      if (t = Je, l = Oe, l = Fa(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), a = e.callbackNode, l === 0 || e === t && (Ye === 2 || Ye === 9) || e.cancelPendingCommit !== null) return a !== null && a !== null && qn(a), e.callbackNode = null, e.callbackPriority = 0;
      if ((l & 3) === 0 || Jl(e, l)) {
        if (t = l & -l, t === e.callbackPriority) return t;
        switch (a !== null && qn(a), U(l)) {
          case 2:
          case 8:
            l = Gn;
            break;
          case 32:
            l = Kl;
            break;
          case 268435456:
            l = Jt;
            break;
          default:
            l = Kl;
        }
        return a = ih.bind(null, e), l = Ja(l, a), e.callbackPriority = t, e.callbackNode = l, t;
      }
      return a !== null && a !== null && qn(a), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function ih(e, t) {
      if (vt !== 0 && vt !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
      var l = e.callbackNode;
      if (Zi() && e.callbackNode !== l) return null;
      var a = Oe;
      return a = Fa(e, e === Je ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), a === 0 ? null : (Gd(e, a, t), uh(e, _t()), e.callbackNode != null && e.callbackNode === l ? ih.bind(null, e) : null);
    }
    function rh(e, t) {
      if (Zi()) return null;
      Gd(e, t, true);
    }
    function Jv() {
      u0(function() {
        (je & 6) !== 0 ? Ja(Zl, Kv) : nh();
      });
    }
    function rc() {
      if (da === 0) {
        var e = dn;
        e === 0 && (e = za, za <<= 1, (za & 261888) === 0 && (za = 256)), da = e;
      }
      return da;
    }
    function fh(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ti("" + e);
    }
    function ch(e, t) {
      var l = t.ownerDocument.createElement("input");
      return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
    }
    function Fv(e, t, l, a, n) {
      if (t === "submit" && l && l.stateNode === n) {
        var i = fh((n[P] || null).action), c = a.submitter;
        c && (t = (t = c[P] || null) ? fh(t.formAction) : c.getAttribute("formAction"), t !== null && (i = t, c = null));
        var h = new ui("action", "action", null, a, n);
        e.push({
          event: h,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (a.defaultPrevented) {
                  if (da !== 0) {
                    var p = c ? ch(n, c) : new FormData(n);
                    Af(l, {
                      pending: true,
                      data: p,
                      method: n.method,
                      action: i
                    }, null, p);
                  }
                } else typeof i == "function" && (h.preventDefault(), p = c ? ch(n, c) : new FormData(n), Af(l, {
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
    for (var fc = 0; fc < Qr.length; fc++) {
      var cc = Qr[fc], $v = cc.toLowerCase(), Wv = cc[0].toUpperCase() + cc.slice(1);
      fl($v, "on" + Wv);
    }
    fl(qo, "onAnimationEnd"), fl(Go, "onAnimationIteration"), fl(Xo, "onAnimationStart"), fl("dblclick", "onDoubleClick"), fl("focusin", "onFocus"), fl("focusout", "onBlur"), fl(dv, "onTransitionRun"), fl(hv, "onTransitionStart"), fl(mv, "onTransitionCancel"), fl(Qo, "onTransitionEnd"), yl("onMouseEnter", [
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
    var Eu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), kv = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Eu));
    function oh(e, t) {
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
              fi(w);
            }
            n.currentTarget = null, i = p;
          }
          else for (c = 0; c < a.length; c++) {
            if (h = a[c], p = h.instance, O = h.currentTarget, h = h.listener, p !== i && n.isPropagationStopped()) break e;
            i = h, n.currentTarget = O;
            try {
              i(n);
            } catch (w) {
              fi(w);
            }
            n.currentTarget = null, i = p;
          }
        }
      }
    }
    function _e(e, t) {
      var l = t[re];
      l === void 0 && (l = t[re] = /* @__PURE__ */ new Set());
      var a = e + "__bubble";
      l.has(a) || (sh(t, e, 2, false), l.add(a));
    }
    function oc(e, t, l) {
      var a = 0;
      t && (a |= 4), sh(l, e, a, t);
    }
    var Fi = "_reactListening" + Math.random().toString(36).slice(2);
    function sc(e) {
      if (!e[Fi]) {
        e[Fi] = true, $l.forEach(function(l) {
          l !== "selectionchange" && (kv.has(l) || oc(l, false, e), oc(l, true, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Fi] || (t[Fi] = true, oc("selectionchange", false, t));
      }
    }
    function sh(e, t, l, a) {
      switch (qh(t)) {
        case 2:
          var n = M0;
          break;
        case 8:
          n = D0;
          break;
        default:
          n = Dc;
      }
      l = n.bind(null, t, l, e), n = void 0, !Cr || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = true), a ? n !== void 0 ? e.addEventListener(t, l, {
        capture: true,
        passive: n
      }) : e.addEventListener(t, l, true) : n !== void 0 ? e.addEventListener(t, l, {
        passive: n
      }) : e.addEventListener(t, l, false);
    }
    function dc(e, t, l, a, n) {
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
      vo(function() {
        var O = i, w = _r(l), Y = [];
        e: {
          var C = Vo.get(e);
          if (C !== void 0) {
            var L = ui, te = e;
            switch (e) {
              case "keypress":
                if (ai(l) === 0) break e;
              case "keydown":
              case "keyup":
                L = Vy;
                break;
              case "focusin":
                te = "focus", L = Hr;
                break;
              case "focusout":
                te = "blur", L = Hr;
                break;
              case "beforeblur":
              case "afterblur":
                L = Hr;
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
                L = So;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                L = xy;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                L = Jy;
                break;
              case qo:
              case Go:
              case Xo:
                L = Ly;
                break;
              case Qo:
                L = $y;
                break;
              case "scroll":
              case "scrollend":
                L = Cy;
                break;
              case "wheel":
                L = ky;
                break;
              case "copy":
              case "cut":
              case "paste":
                L = By;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                L = Eo;
                break;
              case "toggle":
              case "beforetoggle":
                L = Iy;
            }
            var de = (t & 4) !== 0, Qe = !de && (e === "scroll" || e === "scrollend"), M = de ? C !== null ? C + "Capture" : null : C;
            de = [];
            for (var R = O, _; R !== null; ) {
              var j = R;
              if (_ = j.stateNode, j = j.tag, j !== 5 && j !== 26 && j !== 27 || _ === null || M === null || (j = Qn(R, M), j != null && de.push(Ru(R, j, _))), Qe) break;
              R = R.return;
            }
            0 < de.length && (C = new L(C, te, null, l, w), Y.push({
              event: C,
              listeners: de
            }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (C = e === "mouseover" || e === "pointerover", L = e === "mouseout" || e === "pointerout", C && l !== Ar && (te = l.relatedTarget || l.fromElement) && ($e(te) || te[I])) break e;
            if ((L || C) && (C = w.window === w ? w : (C = w.ownerDocument) ? C.defaultView || C.parentWindow : window, L ? (te = l.relatedTarget || l.toElement, L = O, te = te ? $e(te) : null, te !== null && (Qe = d(te), de = te.tag, te !== Qe || de !== 5 && de !== 27 && de !== 6) && (te = null)) : (L = null, te = O), L !== te)) {
              if (de = So, j = "onMouseLeave", M = "onMouseEnter", R = "mouse", (e === "pointerout" || e === "pointerover") && (de = Eo, j = "onPointerLeave", M = "onPointerEnter", R = "pointer"), Qe = L == null ? C : He(L), _ = te == null ? C : He(te), C = new de(j, R + "leave", L, l, w), C.target = Qe, C.relatedTarget = _, j = null, $e(w) === O && (de = new de(M, R + "enter", te, l, w), de.target = _, de.relatedTarget = Qe, j = de), Qe = j, L && te) t: {
                for (de = Pv, M = L, R = te, _ = 0, j = M; j; j = de(j)) _++;
                j = 0;
                for (var fe = R; fe; fe = de(fe)) j++;
                for (; 0 < _ - j; ) M = de(M), _--;
                for (; 0 < j - _; ) R = de(R), j--;
                for (; _--; ) {
                  if (M === R || R !== null && M === R.alternate) {
                    de = M;
                    break t;
                  }
                  M = de(M), R = de(R);
                }
                de = null;
              }
              else de = null;
              L !== null && dh(Y, C, L, de, false), te !== null && Qe !== null && dh(Y, Qe, te, de, true);
            }
          }
          e: {
            if (C = O ? He(O) : window, L = C.nodeName && C.nodeName.toLowerCase(), L === "select" || L === "input" && C.type === "file") var we = Oo;
            else if (Ao(C)) if (Co) we = cv;
            else {
              we = rv;
              var ue = iv;
            }
            else L = C.nodeName, !L || L.toLowerCase() !== "input" || C.type !== "checkbox" && C.type !== "radio" ? O && Dr(O.elementType) && (we = Oo) : we = fv;
            if (we && (we = we(e, O))) {
              _o(Y, we, l, w);
              break e;
            }
            ue && ue(e, C, O), e === "focusout" && O && C.type === "number" && O.memoizedProps.value != null && Mr(C, "number", C.value);
          }
          switch (ue = O ? He(O) : window, e) {
            case "focusin":
              (Ao(ue) || ue.contentEditable === "true") && (an = ue, qr = O, kn = null);
              break;
            case "focusout":
              kn = qr = an = null;
              break;
            case "mousedown":
              Gr = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Gr = false, jo(Y, l, w);
              break;
            case "selectionchange":
              if (sv) break;
            case "keydown":
            case "keyup":
              jo(Y, l, w);
          }
          var Re;
          if (wr) e: {
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
          else ln ? Mo(e, l) && (Ce = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (Ce = "onCompositionStart");
          Ce && (Ro && l.locale !== "ko" && (ln || Ce !== "onCompositionStart" ? Ce === "onCompositionEnd" && ln && (Re = go()) : (Wl = w, Ur = "value" in Wl ? Wl.value : Wl.textContent, ln = true)), ue = $i(O, Ce), 0 < ue.length && (Ce = new bo(Ce, e, null, l, w), Y.push({
            event: Ce,
            listeners: ue
          }), Re ? Ce.data = Re : (Re = Do(l), Re !== null && (Ce.data = Re)))), (Re = tv ? lv(e, l) : av(e, l)) && (Ce = $i(O, "onBeforeInput"), 0 < Ce.length && (ue = new bo("onBeforeInput", "beforeinput", null, l, w), Y.push({
            event: ue,
            listeners: Ce
          }), ue.data = Re)), Fv(Y, e, O, l, w);
        }
        oh(Y, t);
      });
    }
    function Ru(e, t, l) {
      return {
        instance: e,
        listener: t,
        currentTarget: l
      };
    }
    function $i(e, t) {
      for (var l = t + "Capture", a = []; e !== null; ) {
        var n = e, i = n.stateNode;
        if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || i === null || (n = Qn(e, l), n != null && a.unshift(Ru(e, n, i)), n = Qn(e, t), n != null && a.push(Ru(e, n, i))), e.tag === 3) return a;
        e = e.return;
      }
      return [];
    }
    function Pv(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function dh(e, t, l, a, n) {
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
    var Iv = /\r\n?/g, e0 = /\u0000|\uFFFD/g;
    function hh(e) {
      return (typeof e == "string" ? e : "" + e).replace(Iv, `
`).replace(e0, "");
    }
    function mh(e, t) {
      return t = hh(t), hh(e) === t;
    }
    function Xe(e, t, l, a, n, i) {
      switch (l) {
        case "children":
          typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Ia(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Ia(e, "" + a);
          break;
        case "className":
          ut(e, "class", a);
          break;
        case "tabIndex":
          ut(e, "tabindex", a);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          ut(e, l, a);
          break;
        case "style":
          mo(e, a, i);
          break;
        case "data":
          if (t !== "object") {
            ut(e, "data", a);
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
          a = ti("" + a), e.setAttribute(l, a);
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
          a = ti("" + a), e.setAttribute(l, a);
          break;
        case "onClick":
          a != null && (e.onclick = Ml);
          break;
        case "onScroll":
          a != null && _e("scroll", e);
          break;
        case "onScrollEnd":
          a != null && _e("scrollend", e);
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
          l = ti("" + a), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l);
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
          _e("beforetoggle", e), _e("toggle", e), De(e, "popover", a);
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
          (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = _y.get(l) || l, De(e, l, a));
      }
    }
    function hc(e, t, l, a, n, i) {
      switch (l) {
        case "style":
          mo(e, a, i);
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
          a != null && _e("scroll", e);
          break;
        case "onScrollEnd":
          a != null && _e("scrollend", e);
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
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), t = l.slice(2, n ? l.length - 7 : void 0), i = e[P] || null, i = i != null ? i[l] : null, typeof i == "function" && e.removeEventListener(t, i, n), typeof a == "function")) {
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
          _e("error", e), _e("load", e);
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
          _e("invalid", e);
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
          co(e, i, h, p, O, c, n, false);
          return;
        case "select":
          _e("invalid", e), a = c = i = null;
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
          _e("invalid", e), i = n = a = null;
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
          so(e, a, n, i);
          return;
        case "option":
          for (p in l) l.hasOwnProperty(p) && (a = l[p], a != null) && (p === "selected" ? e.selected = a && typeof a != "function" && typeof a != "symbol" : Xe(e, t, p, a, l, null));
          return;
        case "dialog":
          _e("beforetoggle", e), _e("toggle", e), _e("cancel", e), _e("close", e);
          break;
        case "iframe":
        case "object":
          _e("load", e);
          break;
        case "video":
        case "audio":
          for (a = 0; a < Eu.length; a++) _e(Eu[a], e);
          break;
        case "image":
          _e("error", e), _e("load", e);
          break;
        case "details":
          _e("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          _e("error", e), _e("load", e);
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
          if (Dr(t)) {
            for (w in l) l.hasOwnProperty(w) && (a = l[w], a !== void 0 && hc(e, t, w, a, l, void 0));
            return;
          }
      }
      for (h in l) l.hasOwnProperty(h) && (a = l[h], a != null && Xe(e, t, h, a, l, null));
    }
    function t0(e, t, l, a) {
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
          for (L in l) {
            var Y = l[L];
            if (l.hasOwnProperty(L) && Y != null) switch (L) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                p = Y;
              default:
                a.hasOwnProperty(L) || Xe(e, t, L, null, a, Y);
            }
          }
          for (var C in a) {
            var L = a[C];
            if (Y = l[C], a.hasOwnProperty(C) && (L != null || Y != null)) switch (C) {
              case "type":
                i = L;
                break;
              case "name":
                n = L;
                break;
              case "checked":
                O = L;
                break;
              case "defaultChecked":
                w = L;
                break;
              case "value":
                c = L;
                break;
              case "defaultValue":
                h = L;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (L != null) throw Error(f(137, t));
                break;
              default:
                L !== Y && Xe(e, t, C, L, a, Y);
            }
          }
          Tr(e, c, h, p, O, w, i, n);
          return;
        case "select":
          L = c = h = C = null;
          for (i in l) if (p = l[i], l.hasOwnProperty(i) && p != null) switch (i) {
            case "value":
              break;
            case "multiple":
              L = p;
            default:
              a.hasOwnProperty(i) || Xe(e, t, i, null, a, p);
          }
          for (n in a) if (i = a[n], p = l[n], a.hasOwnProperty(n) && (i != null || p != null)) switch (n) {
            case "value":
              C = i;
              break;
            case "defaultValue":
              h = i;
              break;
            case "multiple":
              c = i;
            default:
              i !== p && Xe(e, t, n, i, a, p);
          }
          t = h, l = c, a = L, C != null ? Pa(e, !!l, C, false) : !!a != !!l && (t != null ? Pa(e, !!l, t, true) : Pa(e, !!l, l ? [] : "", false));
          return;
        case "textarea":
          L = C = null;
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
              C = n;
              break;
            case "defaultValue":
              L = n;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (n != null) throw Error(f(91));
              break;
            default:
              n !== i && Xe(e, t, c, n, a, i);
          }
          oo(e, C, L);
          return;
        case "option":
          for (var te in l) C = l[te], l.hasOwnProperty(te) && C != null && !a.hasOwnProperty(te) && (te === "selected" ? e.selected = false : Xe(e, t, te, null, a, C));
          for (p in a) C = a[p], L = l[p], a.hasOwnProperty(p) && C !== L && (C != null || L != null) && (p === "selected" ? e.selected = C && typeof C != "function" && typeof C != "symbol" : Xe(e, t, p, C, a, L));
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
          for (var de in l) C = l[de], l.hasOwnProperty(de) && C != null && !a.hasOwnProperty(de) && Xe(e, t, de, null, a, C);
          for (O in a) if (C = a[O], L = l[O], a.hasOwnProperty(O) && C !== L && (C != null || L != null)) switch (O) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (C != null) throw Error(f(137, t));
              break;
            default:
              Xe(e, t, O, C, a, L);
          }
          return;
        default:
          if (Dr(t)) {
            for (var Qe in l) C = l[Qe], l.hasOwnProperty(Qe) && C !== void 0 && !a.hasOwnProperty(Qe) && hc(e, t, Qe, void 0, a, C);
            for (w in a) C = a[w], L = l[w], !a.hasOwnProperty(w) || C === L || C === void 0 && L === void 0 || hc(e, t, w, C, a, L);
            return;
          }
      }
      for (var M in l) C = l[M], l.hasOwnProperty(M) && C != null && !a.hasOwnProperty(M) && Xe(e, t, M, null, a, C);
      for (Y in a) C = a[Y], L = l[Y], !a.hasOwnProperty(Y) || C === L || C == null && L == null || Xe(e, t, Y, C, a, L);
    }
    function yh(e) {
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
    function l0() {
      if (typeof performance.getEntriesByType == "function") {
        for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
          var n = l[a], i = n.transferSize, c = n.initiatorType, h = n.duration;
          if (i && h && yh(c)) {
            for (c = 0, h = n.responseEnd, a += 1; a < l.length; a++) {
              var p = l[a], O = p.startTime;
              if (O > h) break;
              var w = p.transferSize, Y = p.initiatorType;
              w && yh(Y) && (p = p.responseEnd, c += w * (p < h ? 1 : (h - O) / (p - O)));
            }
            if (--a, t += 8 * (i + c) / (n.duration / 1e3), e++, 10 < e) break;
          }
        }
        if (0 < e) return t / e / 1e6;
      }
      return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
    }
    var mc = null, yc = null;
    function Wi(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function vh(e) {
      switch (e) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function gh(e, t) {
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
    function vc(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    var gc = null;
    function a0() {
      var e = window.event;
      return e && e.type === "popstate" ? e === gc ? false : (gc = e, true) : (gc = null, false);
    }
    var ph = typeof setTimeout == "function" ? setTimeout : void 0, n0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Sh = typeof Promise == "function" ? Promise : void 0, u0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Sh < "u" ? function(e) {
      return Sh.resolve(null).then(e).catch(i0);
    } : ph;
    function i0(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function ha(e) {
      return e === "head";
    }
    function bh(e, t) {
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
    function Eh(e, t) {
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
    function pc(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var l = t;
        switch (t = t.nextSibling, l.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            pc(l), Ke(l);
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
    function r0(e, t, l, a) {
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
    function f0(e, t, l) {
      if (t === "") return null;
      for (; e.nodeType !== 3; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = tl(e.nextSibling), e === null)) return null;
      return e;
    }
    function Rh(e, t) {
      for (; e.nodeType !== 8; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = tl(e.nextSibling), e === null)) return null;
      return e;
    }
    function Sc(e) {
      return e.data === "$?" || e.data === "$~";
    }
    function bc(e) {
      return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
    }
    function c0(e, t) {
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
    var Ec = null;
    function zh(e) {
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
    function Th(e) {
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
    function Mh(e, t, l) {
      switch (t = Wi(l), e) {
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
    var ll = /* @__PURE__ */ new Map(), Dh = /* @__PURE__ */ new Set();
    function ki(e) {
      return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
    }
    var Gl = V.d;
    V.d = {
      f: o0,
      r: s0,
      D: d0,
      C: h0,
      L: m0,
      m: y0,
      X: g0,
      S: v0,
      M: p0
    };
    function o0() {
      var e = Gl.f(), t = Xi();
      return e || t;
    }
    function s0(e) {
      var t = tt(e);
      t !== null && t.tag === 5 && t.type === "form" ? Qs(t) : Gl.r(e);
    }
    var _n = typeof document > "u" ? null : document;
    function Ah(e, t, l) {
      var a = _n;
      if (a && typeof t == "string" && t) {
        var n = Ft(t);
        n = 'link[rel="' + e + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), Dh.has(n) || (Dh.add(n), e = {
          rel: e,
          crossOrigin: l,
          href: t
        }, a.querySelector(n) === null && (t = a.createElement("link"), zt(t, "link", e), Fe(t), a.head.appendChild(t)));
      }
    }
    function d0(e) {
      Gl.D(e), Ah("dns-prefetch", e, null);
    }
    function h0(e, t) {
      Gl.C(e, t), Ah("preconnect", e, t);
    }
    function m0(e, t, l) {
      Gl.L(e, t, l);
      var a = _n;
      if (a && e && t) {
        var n = 'link[rel="preload"][as="' + Ft(t) + '"]';
        t === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + Ft(l.imageSrcSet) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + Ft(l.imageSizes) + '"]')) : n += '[href="' + Ft(e) + '"]';
        var i = n;
        switch (t) {
          case "style":
            i = On(e);
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
    function y0(e, t) {
      Gl.m(e, t);
      var l = _n;
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
    function v0(e, t, l) {
      Gl.S(e, t, l);
      var a = _n;
      if (a && e) {
        var n = yt(a).hoistableStyles, i = On(e);
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
            }, l), (l = ll.get(i)) && Rc(e, l);
            var p = c = a.createElement("link");
            Fe(p), zt(p, "link", e), p._p = new Promise(function(O, w) {
              p.onload = O, p.onerror = w;
            }), p.addEventListener("load", function() {
              h.loading |= 1;
            }), p.addEventListener("error", function() {
              h.loading |= 2;
            }), h.loading |= 4, Pi(c, t, a);
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
    function g0(e, t) {
      Gl.X(e, t);
      var l = _n;
      if (l && e) {
        var a = yt(l).hoistableScripts, n = Cn(e), i = a.get(n);
        i || (i = l.querySelector(Mu(n)), i || (e = S({
          src: e,
          async: true
        }, t), (t = ll.get(n)) && zc(e, t), i = l.createElement("script"), Fe(i), zt(i, "link", e), l.head.appendChild(i)), i = {
          type: "script",
          instance: i,
          count: 1,
          state: null
        }, a.set(n, i));
      }
    }
    function p0(e, t) {
      Gl.M(e, t);
      var l = _n;
      if (l && e) {
        var a = yt(l).hoistableScripts, n = Cn(e), i = a.get(n);
        i || (i = l.querySelector(Mu(n)), i || (e = S({
          src: e,
          async: true,
          type: "module"
        }, t), (t = ll.get(n)) && zc(e, t), i = l.createElement("script"), Fe(i), zt(i, "link", e), l.head.appendChild(i)), i = {
          type: "script",
          instance: i,
          count: 1,
          state: null
        }, a.set(n, i));
      }
    }
    function _h(e, t, l, a) {
      var n = (n = he.current) ? ki(n) : null;
      if (!n) throw Error(f(446));
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof l.precedence == "string" && typeof l.href == "string" ? (t = On(l.href), l = yt(n).hoistableStyles, a = l.get(t), a || (a = {
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
            e = On(l.href);
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
            }, ll.set(e, l), i || S0(n, e, l, c.state))), t && a === null) throw Error(f(528, ""));
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
    function On(e) {
      return 'href="' + Ft(e) + '"';
    }
    function Tu(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function Oh(e) {
      return S({}, e, {
        "data-precedence": e.precedence,
        precedence: null
      });
    }
    function S0(e, t, l, a) {
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
    function Ch(e, t, l) {
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
          return a = (e.ownerDocument || e).createElement("style"), Fe(a), zt(a, "style", n), Pi(a, l.precedence, e), t.instance = a;
        case "stylesheet":
          n = On(l.href);
          var i = e.querySelector(Tu(n));
          if (i) return t.state.loading |= 4, t.instance = i, Fe(i), i;
          a = Oh(l), (n = ll.get(n)) && Rc(a, n), i = (e.ownerDocument || e).createElement("link"), Fe(i);
          var c = i;
          return c._p = new Promise(function(h, p) {
            c.onload = h, c.onerror = p;
          }), zt(i, "link", a), t.state.loading |= 4, Pi(i, l.precedence, e), t.instance = i;
        case "script":
          return i = Cn(l.src), (n = e.querySelector(Mu(i))) ? (t.instance = n, Fe(n), n) : (a = l, (n = ll.get(i)) && (a = S({}, l), zc(a, n)), e = e.ownerDocument || e, n = e.createElement("script"), Fe(n), zt(n, "link", a), e.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(f(443, t.type));
      }
      else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Pi(a, l.precedence, e));
      return t.instance;
    }
    function Pi(e, t, l) {
      for (var a = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), n = a.length ? a[a.length - 1] : null, i = n, c = 0; c < a.length; c++) {
        var h = a[c];
        if (h.dataset.precedence === t) i = h;
        else if (i !== n) break;
      }
      i ? i.parentNode.insertBefore(e, i.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
    }
    function Rc(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
    }
    function zc(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
    }
    var Ii = null;
    function Uh(e, t, l) {
      if (Ii === null) {
        var a = /* @__PURE__ */ new Map(), n = Ii = /* @__PURE__ */ new Map();
        n.set(l, a);
      } else n = Ii, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
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
    function xh(e, t, l) {
      e = e.ownerDocument || e, e.head.insertBefore(l, t === "title" ? e.querySelector("head > title") : null);
    }
    function b0(e, t, l) {
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
    function Nh(e) {
      return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
    }
    function E0(e, t, l, a) {
      if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== false) && (l.state.loading & 4) === 0) {
        if (l.instance === null) {
          var n = On(a.href), i = t.querySelector(Tu(n));
          if (i) {
            t = i._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = er.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = i, Fe(i);
            return;
          }
          i = t.ownerDocument || t, a = Oh(a), (n = ll.get(n)) && Rc(a, n), i = i.createElement("link"), Fe(i);
          var c = i;
          c._p = new Promise(function(h, p) {
            c.onload = h, c.onerror = p;
          }), zt(i, "link", a), l.instance = i;
        }
        e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = er.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
      }
    }
    var Tc = 0;
    function R0(e, t) {
      return e.stylesheets && e.count === 0 && lr(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
        var a = setTimeout(function() {
          if (e.stylesheets && lr(e, e.stylesheets), e.unsuspend) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        }, 6e4 + t);
        0 < e.imgBytes && Tc === 0 && (Tc = 62500 * l0());
        var n = setTimeout(function() {
          if (e.waitingForImages = false, e.count === 0 && (e.stylesheets && lr(e, e.stylesheets), e.unsuspend)) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        }, (e.imgBytes > Tc ? 50 : 800) + t);
        return e.unsuspend = l, function() {
          e.unsuspend = null, clearTimeout(a), clearTimeout(n);
        };
      } : null;
    }
    function er() {
      if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
        if (this.stylesheets) lr(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          this.unsuspend = null, e();
        }
      }
    }
    var tr = null;
    function lr(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, tr = /* @__PURE__ */ new Map(), t.forEach(z0, e), tr = null, er.call(e));
    }
    function z0(e, t) {
      if (!(t.state.loading & 4)) {
        var l = tr.get(e);
        if (l) var a = l.get(null);
        else {
          l = /* @__PURE__ */ new Map(), tr.set(e, l);
          for (var n = e.querySelectorAll("link[data-precedence],style[data-precedence]"), i = 0; i < n.length; i++) {
            var c = n[i];
            (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (l.set(c.dataset.precedence, c), a = c);
          }
          a && l.set(null, a);
        }
        n = t.instance, c = n.getAttribute("data-precedence"), i = l.get(c) || a, i === a && l.set(null, n), l.set(c, n), this.count++, a = er.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), i ? i.parentNode.insertBefore(n, i.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
      }
    }
    var Du = {
      $$typeof: k,
      Provider: null,
      Consumer: null,
      _currentValue: ae,
      _currentValue2: ae,
      _threadCount: 0
    };
    function T0(e, t, l, a, n, i, c, h, p) {
      this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Fl(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Fl(0), this.hiddenUpdates = Fl(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = i, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = p, this.incompleteTransitions = /* @__PURE__ */ new Map();
    }
    function Hh(e, t, l, a, n, i, c, h, p, O, w, Y) {
      return e = new T0(e, t, l, c, p, O, w, Y, h), t = 1, i === true && (t |= 24), i = qt(3, null, null, t), e.current = i, i.stateNode = e, t = lf(), t.refCount++, e.pooledCache = t, t.refCount++, i.memoizedState = {
        element: a,
        isDehydrated: l,
        cache: t
      }, rf(i), e;
    }
    function Lh(e) {
      return e ? (e = rn, e) : rn;
    }
    function wh(e, t, l, a, n, i) {
      n = Lh(n), a.context === null ? a.context = n : a.pendingContext = n, a = la(t), a.payload = {
        element: l
      }, i = i === void 0 ? null : i, i !== null && (a.callback = i), l = aa(e, a, t), l !== null && (Bt(l, e, t), nu(l, e, t));
    }
    function Bh(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var l = e.retryLane;
        e.retryLane = l !== 0 && l < t ? l : t;
      }
    }
    function Mc(e, t) {
      Bh(e, t), (e = e.alternate) && Bh(e, t);
    }
    function jh(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = Ca(e, 67108864);
        t !== null && Bt(t, e, 67108864), Mc(e, 67108864);
      }
    }
    function Yh(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = Zt();
        t = z(t);
        var l = Ca(e, t);
        l !== null && Bt(l, e, t), Mc(e, t);
      }
    }
    var ar = true;
    function M0(e, t, l, a) {
      var n = N.T;
      N.T = null;
      var i = V.p;
      try {
        V.p = 2, Dc(e, t, l, a);
      } finally {
        V.p = i, N.T = n;
      }
    }
    function D0(e, t, l, a) {
      var n = N.T;
      N.T = null;
      var i = V.p;
      try {
        V.p = 8, Dc(e, t, l, a);
      } finally {
        V.p = i, N.T = n;
      }
    }
    function Dc(e, t, l, a) {
      if (ar) {
        var n = Ac(a);
        if (n === null) dc(e, t, a, nr, l), Gh(e, a);
        else if (_0(n, e, t, l, a)) a.stopPropagation();
        else if (Gh(e, a), t & 4 && -1 < A0.indexOf(e)) {
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
                    bl(i), (je & 6) === 0 && (qi = _t() + 500, bu(0));
                  }
                }
                break;
              case 31:
              case 13:
                h = Ca(i, 2), h !== null && Bt(h, i, 2), Xi(), Mc(i, 2);
            }
            if (i = Ac(a), i === null && dc(e, t, a, nr, l), i === n) break;
            n = i;
          }
          n !== null && a.stopPropagation();
        } else dc(e, t, a, null, l);
      }
    }
    function Ac(e) {
      return e = _r(e), _c(e);
    }
    var nr = null;
    function _c(e) {
      if (nr = null, e = $e(e), e !== null) {
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
      return nr = e, null;
    }
    function qh(e) {
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
            case Zl:
              return 2;
            case Gn:
              return 8;
            case Kl:
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
    var Oc = false, ma = null, ya = null, va = null, Au = /* @__PURE__ */ new Map(), _u = /* @__PURE__ */ new Map(), ga = [], A0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function Gh(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          ma = null;
          break;
        case "dragenter":
        case "dragleave":
          ya = null;
          break;
        case "mouseover":
        case "mouseout":
          va = null;
          break;
        case "pointerover":
        case "pointerout":
          Au.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          _u.delete(t.pointerId);
      }
    }
    function Ou(e, t, l, a, n, i) {
      return e === null || e.nativeEvent !== i ? (e = {
        blockedOn: t,
        domEventName: l,
        eventSystemFlags: a,
        nativeEvent: i,
        targetContainers: [
          n
        ]
      }, t !== null && (t = tt(t), t !== null && jh(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
    }
    function _0(e, t, l, a, n) {
      switch (t) {
        case "focusin":
          return ma = Ou(ma, e, t, l, a, n), true;
        case "dragenter":
          return ya = Ou(ya, e, t, l, a, n), true;
        case "mouseover":
          return va = Ou(va, e, t, l, a, n), true;
        case "pointerover":
          var i = n.pointerId;
          return Au.set(i, Ou(Au.get(i) || null, e, t, l, a, n)), true;
        case "gotpointercapture":
          return i = n.pointerId, _u.set(i, Ou(_u.get(i) || null, e, t, l, a, n)), true;
      }
      return false;
    }
    function Xh(e) {
      var t = $e(e.target);
      if (t !== null) {
        var l = d(t);
        if (l !== null) {
          if (t = l.tag, t === 13) {
            if (t = m(l), t !== null) {
              e.blockedOn = t, Z(e.priority, function() {
                Yh(l);
              });
              return;
            }
          } else if (t === 31) {
            if (t = g(l), t !== null) {
              e.blockedOn = t, Z(e.priority, function() {
                Yh(l);
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
    function ur(e) {
      if (e.blockedOn !== null) return false;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var l = Ac(e.nativeEvent);
        if (l === null) {
          l = e.nativeEvent;
          var a = new l.constructor(l.type, l);
          Ar = a, l.target.dispatchEvent(a), Ar = null;
        } else return t = tt(l), t !== null && jh(t), e.blockedOn = l, false;
        t.shift();
      }
      return true;
    }
    function Qh(e, t, l) {
      ur(e) && l.delete(t);
    }
    function O0() {
      Oc = false, ma !== null && ur(ma) && (ma = null), ya !== null && ur(ya) && (ya = null), va !== null && ur(va) && (va = null), Au.forEach(Qh), _u.forEach(Qh);
    }
    function ir(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Oc || (Oc = true, u.unstable_scheduleCallback(u.unstable_NormalPriority, O0)));
    }
    var rr = null;
    function Vh(e) {
      rr !== e && (rr = e, u.unstable_scheduleCallback(u.unstable_NormalPriority, function() {
        rr === e && (rr = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], a = e[t + 1], n = e[t + 2];
          if (typeof a != "function") {
            if (_c(a || l) === null) continue;
            break;
          }
          var i = tt(l);
          i !== null && (e.splice(t, 3), t -= 3, Af(i, {
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
        return ir(p, e);
      }
      ma !== null && ir(ma, e), ya !== null && ir(ya, e), va !== null && ir(va, e), Au.forEach(t), _u.forEach(t);
      for (var l = 0; l < ga.length; l++) {
        var a = ga[l];
        a.blockedOn === e && (a.blockedOn = null);
      }
      for (; 0 < ga.length && (l = ga[0], l.blockedOn === null); ) Xh(l), l.blockedOn === null && ga.shift();
      if (l = (e.ownerDocument || e).$$reactFormReplay, l != null) for (a = 0; a < l.length; a += 3) {
        var n = l[a], i = l[a + 1], c = n[P] || null;
        if (typeof i == "function") c || Vh(l);
        else if (c) {
          var h = null;
          if (i && i.hasAttribute("formAction")) {
            if (n = i, c = i[P] || null) h = c.formAction;
            else if (_c(n) !== null) continue;
          } else h = c.action;
          typeof h == "function" ? l[a + 1] = h : (l.splice(a, 3), a -= 3), Vh(l);
        }
      }
    }
    function Zh() {
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
    function Cc(e) {
      this._internalRoot = e;
    }
    fr.prototype.render = Cc.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error(f(409));
      var l = t.current, a = Zt();
      wh(l, a, e, t, null, null);
    }, fr.prototype.unmount = Cc.prototype.unmount = function() {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        wh(e.current, 2, null, e, null, null), Xi(), t[I] = null;
      }
    };
    function fr(e) {
      this._internalRoot = e;
    }
    fr.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = Q();
        e = {
          blockedOn: null,
          target: e,
          priority: t
        };
        for (var l = 0; l < ga.length && t !== 0 && t < ga[l].priority; l++) ;
        ga.splice(l, 0, e), l === 0 && Xh(e);
      }
    };
    var Kh = r.version;
    if (Kh !== "19.2.4") throw Error(f(527, Kh, "19.2.4"));
    V.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0) throw typeof e.render == "function" ? Error(f(188)) : (e = Object.keys(e).join(","), Error(f(268, e)));
      return e = y(t), e = e !== null ? T(e) : null, e = e === null ? null : e.stateNode, e;
    };
    var C0 = {
      bundleType: 0,
      version: "19.2.4",
      rendererPackageName: "react-dom",
      currentDispatcherRef: N,
      reconcilerVersion: "19.2.4"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var cr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!cr.isDisabled && cr.supportsFiber) try {
        zl = cr.inject(C0), Ot = cr;
      } catch {
      }
    }
    return Uu.createRoot = function(e, t) {
      if (!s(e)) throw Error(f(299));
      var l = false, a = "", n = Is, i = ed, c = td;
      return t != null && (t.unstable_strictMode === true && (l = true), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (i = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = Hh(e, 1, false, null, null, l, a, null, n, i, c, Zh), e[I] = t.current, sc(e), new Cc(t);
    }, Uu.hydrateRoot = function(e, t, l) {
      if (!s(e)) throw Error(f(299));
      var a = false, n = "", i = Is, c = ed, h = td, p = null;
      return l != null && (l.unstable_strictMode === true && (a = true), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (i = l.onUncaughtError), l.onCaughtError !== void 0 && (c = l.onCaughtError), l.onRecoverableError !== void 0 && (h = l.onRecoverableError), l.formState !== void 0 && (p = l.formState)), t = Hh(e, 1, true, t, l ?? null, a, n, p, i, c, h, Zh), t.context = Lh(null), l = t.current, a = Zt(), a = z(a), n = la(a), n.callback = null, aa(l, n, a), l = a, t.current.lanes = l, ml(t, l), bl(t), e[I] = t.current, sc(e), new fr(t);
    }, Uu.version = "19.2.4", Uu;
  }
  var lm;
  function X0() {
    if (lm) return Nc.exports;
    lm = 1;
    function u() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (r) {
        console.error(r);
      }
    }
    return u(), Nc.exports = G0(), Nc.exports;
  }
  d1 = X0();
  var jm = (u) => {
    throw TypeError(u);
  }, Q0 = (u, r, o) => r.has(u) || jm("Cannot " + o), Bc = (u, r, o) => (Q0(u, r, "read from private field"), o ? o.call(u) : r.get(u)), V0 = (u, r, o) => r.has(u) ? jm("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(u) : r.set(u, o), am = "popstate";
  function nm(u) {
    return typeof u == "object" && u != null && "pathname" in u && "search" in u && "hash" in u && "state" in u && "key" in u;
  }
  function Z0(u = {}) {
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
    return Ym(r, o, null, u);
  }
  function K0(u = {}) {
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
      nt(s.pathname.charAt(0) === "/", `relative pathnames are not supported in hash history.push(${JSON.stringify(d)})`);
    }
    return Ym(r, o, f, u);
  }
  function be(u, r) {
    if (u === false || u === null || typeof u > "u") throw new Error(r);
  }
  function nt(u, r) {
    if (!u) {
      typeof console < "u" && console.warn(r);
      try {
        throw new Error(r);
      } catch {
      }
    }
  }
  function J0() {
    return Math.random().toString(36).substring(2, 10);
  }
  function um(u, r) {
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
      key: r && r.key || f || J0(),
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
  function Ym(u, r, o, f = {}) {
    let { window: s = document.defaultView, v5Compat: d = false } = f, m = s.history, g = "POP", v = null, y = T();
    y == null && (y = 0, m.replaceState({
      ...m.state,
      idx: y
    }, ""));
    function T() {
      return (m.state || {
        idx: null
      }).idx;
    }
    function S() {
      g = "POP";
      let G = T(), $ = G == null ? null : G - y;
      y = G, v && v({
        action: g,
        location: X.location,
        delta: $
      });
    }
    function A(G, $) {
      g = "PUSH";
      let W = nm(G) ? G : wn(X.location, G, $);
      o && o(W, G), y = T() + 1;
      let k = um(W, y), ge = X.createHref(W.unstable_mask || W);
      try {
        m.pushState(k, "", ge);
      } catch (me) {
        if (me instanceof DOMException && me.name === "DataCloneError") throw me;
        s.location.assign(ge);
      }
      d && v && v({
        action: g,
        location: X.location,
        delta: 1
      });
    }
    function H(G, $) {
      g = "REPLACE";
      let W = nm(G) ? G : wn(X.location, G, $);
      o && o(W, G), y = T();
      let k = um(W, y), ge = X.createHref(W.unstable_mask || W);
      m.replaceState(k, "", ge), d && v && v({
        action: g,
        location: X.location,
        delta: 0
      });
    }
    function q(G) {
      return qm(G);
    }
    let X = {
      get action() {
        return g;
      },
      get location() {
        return u(s, m);
      },
      listen(G) {
        if (v) throw new Error("A history only accepts one active listener");
        return s.addEventListener(am, S), v = G, () => {
          s.removeEventListener(am, S), v = null;
        };
      },
      createHref(G) {
        return r(s, G);
      },
      createURL: q,
      encodeLocation(G) {
        let $ = q(G);
        return {
          pathname: $.pathname,
          search: $.search,
          hash: $.hash
        };
      },
      push: A,
      replace: H,
      go(G) {
        return m.go(G);
      }
    };
    return X;
  }
  function qm(u, r = false) {
    let o = "http://localhost";
    typeof window < "u" && (o = window.location.origin !== "null" ? window.location.origin : window.location.href), be(o, "No window.location.(origin|href) available to create URL");
    let f = typeof u == "string" ? u : dl(u);
    return f = f.replace(/ $/, "%20"), !r && f.startsWith("//") && (f = o + f), new URL(f, o);
  }
  var Hu, im = class {
    constructor(u) {
      if (V0(this, Hu, /* @__PURE__ */ new Map()), u) for (let [r, o] of u) this.set(r, o);
    }
    get(u) {
      if (Bc(this, Hu).has(u)) return Bc(this, Hu).get(u);
      if (u.defaultValue !== void 0) return u.defaultValue;
      throw new Error("No value found for context");
    }
    set(u, r) {
      Bc(this, Hu).set(u, r);
    }
  };
  Hu = /* @__PURE__ */ new WeakMap();
  var F0 = /* @__PURE__ */ new Set([
    "lazy",
    "caseSensitive",
    "path",
    "id",
    "index",
    "children"
  ]);
  function $0(u) {
    return F0.has(u);
  }
  var W0 = /* @__PURE__ */ new Set([
    "lazy",
    "caseSensitive",
    "path",
    "id",
    "index",
    "middleware",
    "children"
  ]);
  function k0(u) {
    return W0.has(u);
  }
  function P0(u) {
    return u.index === true;
  }
  function Bu(u, r, o = [], f = {}, s = false) {
    return u.map((d, m) => {
      let g = [
        ...o,
        String(m)
      ], v = typeof d.id == "string" ? d.id : g.join("-");
      if (be(d.index !== true || !d.children, "Cannot specify children on an index route"), be(s || !f[v], `Found a route id collision on id "${v}".  Route id's must be globally unique within Data Router usages`), P0(d)) {
        let y = {
          ...d,
          id: v
        };
        return f[v] = rm(y, r(y)), y;
      } else {
        let y = {
          ...d,
          id: v,
          children: void 0
        };
        return f[v] = rm(y, r(y)), d.children && (y.children = Bu(d.children, r, g, f, s)), y;
      }
    });
  }
  function rm(u, r) {
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
  function Sa(u, r, o = "/") {
    return Lu(u, r, o, false);
  }
  function Lu(u, r, o, f) {
    let s = typeof r == "string" ? hl(r) : r, d = jt(s.pathname || "/", o);
    if (d == null) return null;
    let m = Gm(u);
    eg(m);
    let g = null;
    for (let v = 0; g == null && v < m.length; ++v) {
      let y = sg(d);
      g = cg(m[v], y, f);
    }
    return g;
  }
  function I0(u, r) {
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
  function Gm(u, r = [], o = [], f = "", s = false) {
    let d = (m, g, v = s, y) => {
      let T = {
        relativePath: y === void 0 ? m.path || "" : y,
        caseSensitive: m.caseSensitive === true,
        childrenIndex: g,
        route: m
      };
      if (T.relativePath.startsWith("/")) {
        if (!T.relativePath.startsWith(f) && v) return;
        be(T.relativePath.startsWith(f), `Absolute route path "${T.relativePath}" nested under path "${f}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`), T.relativePath = T.relativePath.slice(f.length);
      }
      let S = sl([
        f,
        T.relativePath
      ]), A = o.concat(T);
      m.children && m.children.length > 0 && (be(m.index !== true, `Index routes must not have child routes. Please remove all child routes from route path "${S}".`), Gm(m.children, r, A, S, v)), !(m.path == null && !m.index) && r.push({
        path: S,
        score: rg(S, m.index),
        routesMeta: A
      });
    };
    return u.forEach((m, g) => {
      var _a;
      if (m.path === "" || !((_a = m.path) == null ? void 0 : _a.includes("?"))) d(m, g);
      else for (let v of Xm(m.path)) d(m, g, true, v);
    }), r;
  }
  function Xm(u) {
    let r = u.split("/");
    if (r.length === 0) return [];
    let [o, ...f] = r, s = o.endsWith("?"), d = o.replace(/\?$/, "");
    if (f.length === 0) return s ? [
      d,
      ""
    ] : [
      d
    ];
    let m = Xm(f.join("/")), g = [];
    return g.push(...m.map((v) => v === "" ? d : [
      d,
      v
    ].join("/"))), s && g.push(...m), g.map((v) => u.startsWith("/") && v === "" ? "/" : v);
  }
  function eg(u) {
    u.sort((r, o) => r.score !== o.score ? o.score - r.score : fg(r.routesMeta.map((f) => f.childrenIndex), o.routesMeta.map((f) => f.childrenIndex)));
  }
  var tg = /^:[\w-]+$/, lg = 3, ag = 2, ng = 1, ug = 10, ig = -2, fm = (u) => u === "*";
  function rg(u, r) {
    let o = u.split("/"), f = o.length;
    return o.some(fm) && (f += ig), r && (f += ag), o.filter((s) => !fm(s)).reduce((s, d) => s + (tg.test(d) ? lg : d === "" ? ng : ug), f);
  }
  function fg(u, r) {
    return u.length === r.length && u.slice(0, -1).every((f, s) => f === r[s]) ? u[u.length - 1] - r[r.length - 1] : 0;
  }
  function cg(u, r, o = false) {
    let { routesMeta: f } = u, s = {}, d = "/", m = [];
    for (let g = 0; g < f.length; ++g) {
      let v = f[g], y = g === f.length - 1, T = d === "/" ? r : r.slice(d.length) || "/", S = vr({
        path: v.relativePath,
        caseSensitive: v.caseSensitive,
        end: y
      }, T), A = v.route;
      if (!S && y && o && !f[f.length - 1].route.index && (S = vr({
        path: v.relativePath,
        caseSensitive: v.caseSensitive,
        end: false
      }, T)), !S) return null;
      Object.assign(s, S.params), m.push({
        params: s,
        pathname: sl([
          d,
          S.pathname
        ]),
        pathnameBase: mg(sl([
          d,
          S.pathnameBase
        ])),
        route: A
      }), S.pathnameBase !== "/" && (d = sl([
        d,
        S.pathnameBase
      ]));
    }
    return m;
  }
  function vr(u, r) {
    typeof u == "string" && (u = {
      path: u,
      caseSensitive: false,
      end: true
    });
    let [o, f] = og(u.path, u.caseSensitive, u.end), s = r.match(o);
    if (!s) return null;
    let d = s[0], m = d.replace(/(.)\/+$/, "$1"), g = s.slice(1);
    return {
      params: f.reduce((y, { paramName: T, isOptional: S }, A) => {
        if (T === "*") {
          let q = g[A] || "";
          m = d.slice(0, d.length - q.length).replace(/(.)\/+$/, "$1");
        }
        const H = g[A];
        return S && !H ? y[T] = void 0 : y[T] = (H || "").replace(/%2F/g, "/"), y;
      }, {}),
      pathname: d,
      pathnameBase: m,
      pattern: u
    };
  }
  function og(u, r = false, o = true) {
    nt(u === "*" || !u.endsWith("*") || u.endsWith("/*"), `Route path "${u}" will be treated as if it were "${u.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${u.replace(/\*$/, "/*")}".`);
    let f = [], s = "^" + u.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (m, g, v, y, T) => {
      if (f.push({
        paramName: g,
        isOptional: v != null
      }), v) {
        let S = T.charAt(y + m.length);
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
  function sg(u) {
    try {
      return u.split("/").map((r) => decodeURIComponent(r).replace(/\//g, "%2F")).join("/");
    } catch (r) {
      return nt(false, `The URL path "${u}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`), u;
    }
  }
  function jt(u, r) {
    if (r === "/") return u;
    if (!u.toLowerCase().startsWith(r.toLowerCase())) return null;
    let o = r.endsWith("/") ? r.length - 1 : r.length, f = u.charAt(o);
    return f && f !== "/" ? null : u.slice(o) || "/";
  }
  function dg({ basename: u, pathname: r }) {
    return r === "/" ? u : sl([
      u,
      r
    ]);
  }
  var Qm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Pc = (u) => Qm.test(u);
  function hg(u, r = "/") {
    let { pathname: o, search: f = "", hash: s = "" } = typeof u == "string" ? hl(u) : u, d;
    return o ? (o = o.replace(/\/\/+/g, "/"), o.startsWith("/") ? d = cm(o.substring(1), "/") : d = cm(o, r)) : d = r, {
      pathname: d,
      search: yg(f),
      hash: vg(s)
    };
  }
  function cm(u, r) {
    let o = r.replace(/\/+$/, "").split("/");
    return u.split("/").forEach((s) => {
      s === ".." ? o.length > 1 && o.pop() : s !== "." && o.push(s);
    }), o.length > 1 ? o.join("/") : "/";
  }
  function jc(u, r, o, f) {
    return `Cannot include a '${u}' character in a manually specified \`to.${r}\` field [${JSON.stringify(f)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
  }
  function Vm(u) {
    return u.filter((r, o) => o === 0 || r.route.path && r.route.path.length > 0);
  }
  function Ic(u) {
    let r = Vm(u);
    return r.map((o, f) => f === r.length - 1 ? o.pathname : o.pathnameBase);
  }
  function gr(u, r, o, f = false) {
    let s;
    typeof u == "string" ? s = hl(u) : (s = {
      ...u
    }, be(!s.pathname || !s.pathname.includes("?"), jc("?", "pathname", "search", s)), be(!s.pathname || !s.pathname.includes("#"), jc("#", "pathname", "hash", s)), be(!s.search || !s.search.includes("#"), jc("#", "search", "hash", s)));
    let d = u === "" || s.pathname === "", m = d ? "/" : s.pathname, g;
    if (m == null) g = o;
    else {
      let S = r.length - 1;
      if (!f && m.startsWith("..")) {
        let A = m.split("/");
        for (; A[0] === ".."; ) A.shift(), S -= 1;
        s.pathname = A.join("/");
      }
      g = S >= 0 ? r[S] : "/";
    }
    let v = hg(s, g), y = m && m !== "/" && m.endsWith("/"), T = (d || m === ".") && o.endsWith("/");
    return !v.pathname.endsWith("/") && (y || T) && (v.pathname += "/"), v;
  }
  var sl = (u) => u.join("/").replace(/\/\/+/g, "/"), mg = (u) => u.replace(/\/+$/, "").replace(/^\/*/, "/"), yg = (u) => !u || u === "?" ? "" : u.startsWith("?") ? u : "?" + u, vg = (u) => !u || u === "#" ? "" : u.startsWith("#") ? u : "#" + u, qu = class {
    constructor(u, r, o, f = false) {
      this.status = u, this.statusText = r || "", this.internal = f, o instanceof Error ? (this.data = o.toString(), this.error = o) : this.data = o;
    }
  };
  ju = function(u) {
    return u != null && typeof u.status == "number" && typeof u.statusText == "string" && typeof u.internal == "boolean" && "data" in u;
  };
  function Gu(u) {
    return u.map((r) => r.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/";
  }
  var Zm = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
  function Km(u, r) {
    let o = u;
    if (typeof o != "string" || !Qm.test(o)) return {
      absoluteURL: void 0,
      isExternal: false,
      to: o
    };
    let f = o, s = false;
    if (Zm) try {
      let d = new URL(window.location.href), m = o.startsWith("//") ? new URL(d.protocol + o) : new URL(o), g = jt(m.pathname, r);
      m.origin === d.origin && g != null ? o = g + m.search + m.hash : s = true;
    } catch {
      nt(false, `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`);
    }
    return {
      absoluteURL: f,
      isExternal: s,
      to: o
    };
  }
  var Ea = /* @__PURE__ */ Symbol("Uninstrumented");
  function gg(u, r) {
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
        let m = d[Ea] ?? d, g = Hn(o[s], m, (...v) => om(v[0]));
        g && (s === "loader" && m.hydrate === true && (g.hydrate = true), g[Ea] = m, f[s] = g);
      }
    }), r.middleware && r.middleware.length > 0 && o.middleware.length > 0 && (f.middleware = r.middleware.map((s) => {
      let d = s[Ea] ?? s, m = Hn(o.middleware, d, (...g) => om(g[0]));
      return m ? (m[Ea] = d, m) : s;
    })), f;
  }
  function pg(u, r) {
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
      let f = u.navigate[Ea] ?? u.navigate, s = Hn(o.navigate, f, (...d) => {
        let [m, g] = d;
        return {
          to: typeof m == "number" || typeof m == "string" ? m : m ? dl(m) : ".",
          ...sm(u, g ?? {})
        };
      });
      s && (s[Ea] = f, u.navigate = s);
    }
    if (o.fetch.length > 0) {
      let f = u.fetch[Ea] ?? u.fetch, s = Hn(o.fetch, f, (...d) => {
        let [m, , g, v] = d;
        return {
          href: g ?? ".",
          fetcherKey: m,
          ...sm(u, v ?? {})
        };
      });
      s && (s[Ea] = f, u.fetch = s);
    }
    return u;
  }
  function Hn(u, r, o) {
    return u.length === 0 ? null : async (...f) => {
      let s = await Jm(u, o(...f), () => r(...f), u.length - 1);
      if (s.type === "error") throw s.value;
      return s.value;
    };
  }
  async function Jm(u, r, o, f) {
    let s = u[f], d;
    if (s) {
      let m, g = async () => (m ? console.error("You cannot call instrumented handlers more than once") : m = Jm(u, r, o, f - 1), d = await m, be(d, "Expected a result"), d.type === "error" && d.value instanceof Error ? {
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
  function om(u) {
    let { request: r, context: o, params: f, unstable_pattern: s } = u;
    return {
      request: Sg(r),
      params: {
        ...f
      },
      unstable_pattern: s,
      context: bg(o)
    };
  }
  function sm(u, r) {
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
  function Sg(u) {
    return {
      method: u.method,
      url: u.url,
      headers: {
        get: (...r) => u.headers.get(...r)
      }
    };
  }
  function bg(u) {
    if (Rg(u)) {
      let r = {
        ...u
      };
      return Object.freeze(r), r;
    } else return {
      get: (r) => u.get(r)
    };
  }
  var Eg = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
  function Rg(u) {
    if (u === null || typeof u != "object") return false;
    const r = Object.getPrototypeOf(u);
    return r === Object.prototype || r === null || Object.getOwnPropertyNames(r).sort().join("\0") === Eg;
  }
  var Fm = [
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
  ], zg = new Set(Fm), Tg = [
    "GET",
    ...Fm
  ], Mg = new Set(Tg), $m = /* @__PURE__ */ new Set([
    301,
    302,
    303,
    307,
    308
  ]), Dg = /* @__PURE__ */ new Set([
    307,
    308
  ]), Yc = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  }, Ag = {
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
  }, _g = (u) => ({
    hasErrorBoundary: !!u.hasErrorBoundary
  }), Wm = "remix-router-transitions", km = /* @__PURE__ */ Symbol("ResetLoaderData");
  function Pm(u) {
    const r = u.window ? u.window : typeof window < "u" ? window : void 0, o = typeof r < "u" && typeof r.document < "u" && typeof r.document.createElement < "u";
    be(u.routes.length > 0, "You must provide a non-empty routes array to createRouter");
    let f = u.hydrationRouteProperties || [], s = u.mapRouteProperties || _g, d = s;
    if (u.unstable_instrumentations) {
      let b = u.unstable_instrumentations;
      d = (z) => ({
        ...s(z),
        ...gg(b.map((U) => U.route).filter(Boolean), z)
      });
    }
    let m = {}, g = Bu(u.routes, d, void 0, m), v, y = u.basename || "/";
    y.startsWith("/") || (y = `/${y}`);
    let T = u.dataStrategy || Ng, S = {
      ...u.future
    }, A = null, H = /* @__PURE__ */ new Set(), q = null, X = null, G = null, $ = u.hydrationData != null, W = Sa(g, u.history.location, y), k = false, ge = null, me, oe;
    if (W == null && !u.patchRoutesOnNavigation) {
      let b = al(404, {
        pathname: u.history.location.pathname
      }), { matches: z, route: U } = or(g);
      me = true, oe = !me, W = z, ge = {
        [U.id]: b
      };
    } else if (W && !u.hydrationData && Fl(W, g, u.history.location.pathname).active && (W = null), W) if (W.some((b) => b.route.lazy)) me = false, oe = !me;
    else if (!W.some((b) => eo(b.route))) me = true, oe = !me;
    else {
      let b = u.hydrationData ? u.hydrationData.loaderData : null, z = u.hydrationData ? u.hydrationData.errors : null, U = W;
      if (z) {
        let Q = W.findIndex((Z) => z[Z.route.id] !== void 0);
        U = U.slice(0, Q + 1);
      }
      oe = false, me = U.every((Q) => {
        let Z = Im(Q.route, b, z);
        return oe = oe || Z.renderFallback, !Z.shouldLoad;
      });
    }
    else {
      me = false, oe = !me, W = [];
      let b = Fl(null, g, u.history.location.pathname);
      b.active && b.matches && (k = true, W = b.matches);
    }
    let le, D = {
      historyAction: u.history.action,
      location: u.history.location,
      matches: W,
      initialized: me,
      renderFallback: oe,
      navigation: Yc,
      restoreScrollPosition: u.hydrationData != null ? false : null,
      preventScrollReset: false,
      revalidation: "idle",
      loaderData: u.hydrationData && u.hydrationData.loaderData || {},
      actionData: u.hydrationData && u.hydrationData.actionData || null,
      errors: u.hydrationData && u.hydrationData.errors || ge,
      fetchers: /* @__PURE__ */ new Map(),
      blockers: /* @__PURE__ */ new Map()
    }, ze = "POP", Ue = null, Ve = false, ve, et = false, xe = /* @__PURE__ */ new Map(), ye = null, N = false, V = false, ae = /* @__PURE__ */ new Set(), ne = /* @__PURE__ */ new Map(), Ee = 0, E = -1, B = /* @__PURE__ */ new Map(), K = /* @__PURE__ */ new Set(), F = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), he = /* @__PURE__ */ new Set(), Te = /* @__PURE__ */ new Map(), ft, Ze = null;
    function Ra() {
      if (A = u.history.listen(({ action: b, location: z, delta: U }) => {
        if (ft) {
          ft(), ft = void 0;
          return;
        }
        nt(Te.size === 0 || U != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
        let Q = Ta({
          currentLocation: D.location,
          nextLocation: z,
          historyAction: b
        });
        if (Q && U != null) {
          let Z = new Promise((ee) => {
            ft = ee;
          });
          u.history.go(U * -1), Tl(Q, {
            state: "blocked",
            location: z,
            proceed() {
              Tl(Q, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: z
              }), Z.then(() => u.history.go(U));
            },
            reset() {
              let ee = new Map(D.blockers);
              ee.set(Q, xn), mt({
                blockers: ee
              });
            }
          }), Ue == null ? void 0 : Ue.resolve(), Ue = null;
          return;
        }
        return El(b, z);
      }), o) {
        kg(r, xe);
        let b = () => Pg(r, xe);
        r.addEventListener("pagehide", b), ye = () => r.removeEventListener("pagehide", b);
      }
      return D.initialized || El("POP", D.location, {
        initialHydration: true
      }), le;
    }
    function Za() {
      A && A(), ye && ye(), H.clear(), ve && ve.abort(), D.fetchers.forEach((b, z) => zl(z)), D.blockers.forEach((b, z) => za(z));
    }
    function Bn(b) {
      return H.add(b), () => H.delete(b);
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
      let U = [], Q = [];
      D.fetchers.forEach((Z, ee) => {
        Z.state === "idle" && (he.has(ee) ? U.push(ee) : Q.push(ee));
      }), he.forEach((Z) => {
        !D.fetchers.has(Z) && !ne.has(Z) && U.push(Z);
      }), [
        ...H
      ].forEach((Z) => Z(D, {
        deletedFetchers: U,
        newErrors: b.errors ?? null,
        viewTransitionOpts: z.viewTransitionOpts,
        flushSync: z.flushSync === true
      })), U.forEach((Z) => zl(Z)), Q.forEach((Z) => D.fetchers.delete(Z));
    }
    function Ut(b, z, { flushSync: U } = {}) {
      var _a, _b;
      let Q = D.actionData != null && D.navigation.formMethod != null && At(D.navigation.formMethod) && D.navigation.state === "loading" && ((_a = b.state) == null ? void 0 : _a._isRedirect) !== true, Z;
      z.actionData ? Object.keys(z.actionData).length > 0 ? Z = z.actionData : Z = null : Q ? Z = D.actionData : Z = null;
      let ee = z.loaderData ? Em(D.loaderData, z.loaderData, z.matches || [], z.errors) : D.loaderData, J = D.blockers;
      J.size > 0 && (J = new Map(J), J.forEach((ce, ie) => J.set(ie, xn)));
      let P = N ? false : Xn(b, z.matches || D.matches), I = Ve === true || D.navigation.formMethod != null && At(D.navigation.formMethod) && ((_b = b.state) == null ? void 0 : _b._isRedirect) !== true;
      v && (g = v, v = void 0), N || ze === "POP" || (ze === "PUSH" ? u.history.push(b, b.state) : ze === "REPLACE" && u.history.replace(b, b.state));
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
        navigation: Yc,
        revalidation: "idle",
        restoreScrollPosition: P,
        preventScrollReset: I,
        blockers: J
      }, {
        viewTransitionOpts: re,
        flushSync: U === true
      }), ze = "POP", Ve = false, et = false, N = false, V = false, Ue == null ? void 0 : Ue.resolve(), Ue = null, Ze == null ? void 0 : Ze.resolve(), Ze = null;
    }
    async function Ka(b, z) {
      if (Ue == null ? void 0 : Ue.resolve(), Ue = null, typeof b == "number") {
        Ue || (Ue = Mm());
        let Ke = Ue.promise;
        return u.history.go(b), Ke;
      }
      let U = Jc(D.location, D.matches, y, b, z == null ? void 0 : z.fromRouteId, z == null ? void 0 : z.relative), { path: Q, submission: Z, error: ee } = dm(false, U, z), J;
      (z == null ? void 0 : z.unstable_mask) && (J = {
        pathname: "",
        search: "",
        hash: "",
        ...typeof z.unstable_mask == "string" ? hl(z.unstable_mask) : {
          ...D.location.unstable_mask,
          ...z.unstable_mask
        }
      });
      let P = D.location, I = wn(P, Q, z && z.state, void 0, J);
      I = {
        ...I,
        ...u.history.encodeLocation(I)
      };
      let re = z && z.replace != null ? z.replace : void 0, ce = "PUSH";
      re === true ? ce = "REPLACE" : re === false || Z != null && At(Z.formMethod) && Z.formAction === D.location.pathname + D.location.search && (ce = "REPLACE");
      let ie = z && "preventScrollReset" in z ? z.preventScrollReset === true : void 0, Le = (z && z.flushSync) === true, Me = Ta({
        currentLocation: P,
        nextLocation: I,
        historyAction: ce
      });
      if (Me) {
        Tl(Me, {
          state: "blocked",
          location: I,
          proceed() {
            Tl(Me, {
              state: "proceeding",
              proceed: void 0,
              reset: void 0,
              location: I
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
      await El(ce, I, {
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
      Ze || (Ze = Mm()), Kl(), mt({
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
    async function El(b, z, U) {
      ve && ve.abort(), ve = null, ze = b, N = (U && U.startUninterruptedRevalidation) === true, zr(D.location, D.matches), Ve = (U && U.preventScrollReset) === true, et = (U && U.enableViewTransition) === true;
      let Q = v || g, Z = U && U.overrideNavigation, ee = (U == null ? void 0 : U.initialHydration) && D.matches && D.matches.length > 0 && !k ? D.matches : Sa(Q, z, y), J = (U && U.flushSync) === true;
      if (ee && D.initialized && !V && Gg(D.location, z) && !(U && U.submission && At(U.submission.formMethod))) {
        Ut(z, {
          matches: ee
        }, {
          flushSync: J
        });
        return;
      }
      let P = Fl(ee, Q, z.pathname);
      if (P.active && P.matches && (ee = P.matches), !ee) {
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
      ve = new AbortController();
      let I = Nn(u.history, z, ve.signal, U && U.submission), re = u.getContext ? await u.getContext() : new im(), ce;
      if (U && U.pendingError) ce = [
        ba(ee).route.id,
        {
          type: "error",
          error: U.pendingError
        }
      ];
      else if (U && U.submission && At(U.submission.formMethod)) {
        let $e = await Ku(I, z, U.submission, ee, re, P.active, U && U.initialHydration === true, {
          replace: U.replace,
          flushSync: J
        });
        if ($e.shortCircuited) return;
        if ($e.pendingActionResult) {
          let [tt, He] = $e.pendingActionResult;
          if (Kt(He) && ju(He.error) && He.error.status === 404) {
            ve = null, Ut(z, {
              matches: $e.matches,
              loaderData: {},
              errors: {
                [tt]: He.error
              }
            });
            return;
          }
        }
        ee = $e.matches || ee, ce = $e.pendingActionResult, Z = qc(z, U.submission), J = false, P.active = false, I = Nn(u.history, I.url, I.signal);
      }
      let { shortCircuited: ie, matches: Le, loaderData: Me, errors: Ke } = await Yn(I, z, ee, re, P.active, Z, U && U.submission, U && U.fetcherSubmission, U && U.replace, U && U.initialHydration === true, J, ce, U && U.callSiteDefaultShouldRevalidate);
      ie || (ve = null, Ut(z, {
        matches: Le || ee,
        ...Rm(ce),
        loaderData: Me,
        errors: Ke
      }));
    }
    async function Ku(b, z, U, Q, Z, ee, J, P = {}) {
      Kl();
      let I = $g(z, U);
      if (mt({
        navigation: I
      }, {
        flushSync: P.flushSync === true
      }), ee) {
        let ie = await ml(Q, z.pathname, b.signal);
        if (ie.type === "aborted") return {
          shortCircuited: true
        };
        if (ie.type === "error") {
          if (ie.partialMatches.length === 0) {
            let { matches: Me, route: Ke } = or(g);
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
        } else if (ie.matches) Q = ie.matches;
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
      let re, ce = hr(Q, z);
      if (!ce.route.action && !ce.route.lazy) re = {
        type: "error",
        error: al(405, {
          method: b.method,
          pathname: z.pathname,
          routeId: ce.route.id
        })
      };
      else {
        let ie = Ln(d, m, b, Q, ce, J ? [] : f, Z), Le = await Zl(b, ie, Z, null);
        if (re = Le[ce.route.id], !re) {
          for (let Me of Q) if (Le[Me.route.id]) {
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
        return P && P.replace != null ? ie = P.replace : ie = pm(re.response.headers.get("Location"), new URL(b.url), y, u.history) === D.location.pathname + D.location.search, await Rl(b, re, true, {
          submission: U,
          replace: ie
        }), {
          shortCircuited: true
        };
      }
      if (Kt(re)) {
        let ie = ba(Q, ce.route.id);
        return (P && P.replace) !== true && (ze = "PUSH"), {
          matches: Q,
          pendingActionResult: [
            ie.route.id,
            re,
            ce.route.id
          ]
        };
      }
      return {
        matches: Q,
        pendingActionResult: [
          ce.route.id,
          re
        ]
      };
    }
    async function Yn(b, z, U, Q, Z, ee, J, P, I, re, ce, ie, Le) {
      let Me = ee || qc(z, J), Ke = J || P || Tm(Me), $e = !N && !re;
      if (Z) {
        if ($e) {
          let ut = Ja(ie);
          mt({
            navigation: Me,
            ...ut !== void 0 ? {
              actionData: ut
            } : {}
          }, {
            flushSync: ce
          });
        }
        let De = await ml(U, z.pathname, b.signal);
        if (De.type === "aborted") return {
          shortCircuited: true
        };
        if (De.type === "error") {
          if (De.partialMatches.length === 0) {
            let { matches: Mt, route: ct } = or(g);
            return {
              matches: Mt,
              loaderData: {},
              errors: {
                [ct.id]: De.error
              }
            };
          }
          let ut = ba(De.partialMatches).route.id;
          return {
            matches: De.partialMatches,
            loaderData: {},
            errors: {
              [ut]: De.error
            }
          };
        } else if (De.matches) U = De.matches;
        else {
          let { error: ut, notFoundMatches: Mt, route: ct } = il(z.pathname);
          return {
            matches: Mt,
            loaderData: {},
            errors: {
              [ct.id]: ut
            }
          };
        }
      }
      let tt = v || g, { dsMatches: He, revalidatingFetchers: yt } = hm(b, Q, d, m, u.history, D, U, Ke, z, re ? [] : f, re === true, V, ae, he, F, K, tt, y, u.patchRoutesOnNavigation != null, ie, Le);
      if (E = ++Ee, !u.dataStrategy && !He.some((De) => De.shouldLoad) && !He.some((De) => De.route.middleware && De.route.middleware.length > 0) && yt.length === 0) {
        let De = Fu();
        return Ut(z, {
          matches: U,
          loaderData: {},
          errors: ie && Kt(ie[1]) ? {
            [ie[0]]: ie[1].error
          } : null,
          ...Rm(ie),
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
          let ut = Ja(ie);
          ut !== void 0 && (De.actionData = ut);
        }
        yt.length > 0 && (De.fetchers = qn(yt)), mt(De, {
          flushSync: ce
        });
      }
      yt.forEach((De) => {
        gt(De.key), De.controller && ne.set(De.key, De.controller);
      });
      let Fe = () => yt.forEach((De) => gt(De.key));
      ve && ve.signal.addEventListener("abort", Fe);
      let { loaderResults: $l, fetcherResults: rl } = await Gn(He, yt, b, Q);
      if (b.signal.aborted) return {
        shortCircuited: true
      };
      ve && ve.signal.removeEventListener("abort", Fe), yt.forEach((De) => ne.delete(De.key));
      let pt = sr($l);
      if (pt) return await Rl(b, pt.result, true, {
        replace: I
      }), {
        shortCircuited: true
      };
      if (pt = sr(rl), pt) return K.add(pt.key), await Rl(b, pt.result, true, {
        replace: I
      }), {
        shortCircuited: true
      };
      let { loaderData: yl, errors: Ma } = bm(D, U, $l, ie, yt, rl);
      re && D.errors && (Ma = {
        ...D.errors,
        ...Ma
      });
      let vl = Fu(), Da = $u(E), $a = vl || Da || yt.length > 0;
      return {
        matches: U,
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
        let U = D.fetchers.get(z.key), Q = xu(void 0, U ? U.data : void 0);
        D.fetchers.set(z.key, Q);
      }), new Map(D.fetchers);
    }
    async function Sr(b, z, U, Q) {
      gt(b);
      let Z = (Q && Q.flushSync) === true, ee = v || g, J = Jc(D.location, D.matches, y, U, z, Q == null ? void 0 : Q.relative), P = Sa(ee, J, y), I = Fl(P, ee, J);
      if (I.active && I.matches && (P = I.matches), !P) {
        Jt(b, z, al(404, {
          pathname: J
        }), {
          flushSync: Z
        });
        return;
      }
      let { path: re, submission: ce, error: ie } = dm(true, J, Q);
      if (ie) {
        Jt(b, z, ie, {
          flushSync: Z
        });
        return;
      }
      let Le = u.getContext ? await u.getContext() : new im(), Me = (Q && Q.preventScrollReset) === true;
      if (ce && At(ce.formMethod)) {
        await br(b, z, re, P, Le, I.active, Z, Me, ce, Q && Q.unstable_defaultShouldRevalidate);
        return;
      }
      F.set(b, {
        routeId: z,
        path: re
      }), await _t(b, z, re, P, Le, I.active, Z, Me, ce);
    }
    async function br(b, z, U, Q, Z, ee, J, P, I, re) {
      Kl(), F.delete(b);
      let ce = D.fetchers.get(b);
      ul(b, Wg(I, ce), {
        flushSync: J
      });
      let ie = new AbortController(), Le = Nn(u.history, U, ie.signal, I);
      if (ee) {
        let We = await ml(Q, new URL(Le.url).pathname, Le.signal, b);
        if (We.type === "aborted") return;
        if (We.type === "error") {
          Jt(b, z, We.error, {
            flushSync: J
          });
          return;
        } else if (We.matches) Q = We.matches;
        else {
          Jt(b, z, al(404, {
            pathname: U
          }), {
            flushSync: J
          });
          return;
        }
      }
      let Me = hr(Q, U);
      if (!Me.route.action && !Me.route.lazy) {
        let We = al(405, {
          method: I.formMethod,
          pathname: U,
          routeId: z
        });
        Jt(b, z, We, {
          flushSync: J
        });
        return;
      }
      ne.set(b, ie);
      let Ke = Ee, $e = Ln(d, m, Le, Q, Me, f, Z), tt = await Zl(Le, $e, Z, b), He = tt[Me.route.id];
      if (!He) {
        for (let We of $e) if (tt[We.route.id]) {
          He = tt[We.route.id];
          break;
        }
      }
      if (Le.signal.aborted) {
        ne.get(b) === ie && ne.delete(b);
        return;
      }
      if (he.has(b)) {
        if (Qa(He) || Kt(He)) {
          ul(b, Xl(void 0));
          return;
        }
      } else {
        if (Qa(He)) if (ne.delete(b), E > Ke) {
          ul(b, Xl(void 0));
          return;
        } else return K.add(b), ul(b, xu(I)), Rl(Le, He, false, {
          fetcherSubmission: I,
          preventScrollReset: P
        });
        if (Kt(He)) {
          Jt(b, z, He.error);
          return;
        }
      }
      let yt = D.navigation.location || D.location, Fe = Nn(u.history, yt, ie.signal), $l = v || g, rl = D.navigation.state !== "idle" ? Sa($l, D.navigation.location, y) : D.matches;
      be(rl, "Didn't find any matches after fetcher action");
      let pt = ++Ee;
      B.set(b, pt);
      let yl = xu(I, He.data);
      D.fetchers.set(b, yl);
      let { dsMatches: Ma, revalidatingFetchers: vl } = hm(Fe, Z, d, m, u.history, D, rl, I, yt, f, false, V, ae, he, F, K, $l, y, u.patchRoutesOnNavigation != null, [
        Me.route.id,
        He
      ], re);
      vl.filter((We) => We.key !== b).forEach((We) => {
        let Wa = We.key, ka = D.fetchers.get(Wa), Iu = xu(void 0, ka ? ka.data : void 0);
        D.fetchers.set(Wa, Iu), gt(Wa), We.controller && ne.set(Wa, We.controller);
      }), mt({
        fetchers: new Map(D.fetchers)
      });
      let Da = () => vl.forEach((We) => gt(We.key));
      ie.signal.addEventListener("abort", Da);
      let { loaderResults: $a, fetcherResults: De } = await Gn(Ma, vl, Fe, Z);
      if (ie.signal.aborted) return;
      if (ie.signal.removeEventListener("abort", Da), B.delete(b), ne.delete(b), vl.forEach((We) => ne.delete(We.key)), D.fetchers.has(b)) {
        let We = Xl(He.data);
        D.fetchers.set(b, We);
      }
      let ut = sr($a);
      if (ut) return Rl(Fe, ut.result, false, {
        preventScrollReset: P
      });
      if (ut = sr(De), ut) return K.add(ut.key), Rl(Fe, ut.result, false, {
        preventScrollReset: P
      });
      let { loaderData: Mt, errors: ct } = bm(D, rl, $a, void 0, vl, De);
      $u(pt), D.navigation.state === "loading" && pt > E ? (be(ze, "Expected pending action"), ve && ve.abort(), Ut(D.navigation.location, {
        matches: rl,
        loaderData: Mt,
        errors: ct,
        fetchers: new Map(D.fetchers)
      })) : (mt({
        errors: ct,
        loaderData: Em(D.loaderData, Mt, rl, ct),
        fetchers: new Map(D.fetchers)
      }), V = false);
    }
    async function _t(b, z, U, Q, Z, ee, J, P, I) {
      let re = D.fetchers.get(b);
      ul(b, xu(I, re ? re.data : void 0), {
        flushSync: J
      });
      let ce = new AbortController(), ie = Nn(u.history, U, ce.signal);
      if (ee) {
        let He = await ml(Q, new URL(ie.url).pathname, ie.signal, b);
        if (He.type === "aborted") return;
        if (He.type === "error") {
          Jt(b, z, He.error, {
            flushSync: J
          });
          return;
        } else if (He.matches) Q = He.matches;
        else {
          Jt(b, z, al(404, {
            pathname: U
          }), {
            flushSync: J
          });
          return;
        }
      }
      let Le = hr(Q, U);
      ne.set(b, ce);
      let Me = Ee, Ke = Ln(d, m, ie, Q, Le, f, Z), tt = (await Zl(ie, Ke, Z, b))[Le.route.id];
      if (ne.get(b) === ce && ne.delete(b), !ie.signal.aborted) {
        if (he.has(b)) {
          ul(b, Xl(void 0));
          return;
        }
        if (Qa(tt)) if (E > Me) {
          ul(b, Xl(void 0));
          return;
        } else {
          K.add(b), await Rl(ie, tt, false, {
            preventScrollReset: P
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
    async function Rl(b, z, U, { submission: Q, fetcherSubmission: Z, preventScrollReset: ee, replace: J } = {}) {
      U || (Ue == null ? void 0 : Ue.resolve(), Ue = null), z.response.headers.has("X-Remix-Revalidate") && (V = true);
      let P = z.response.headers.get("Location");
      be(P, "Expected a Location header on the redirect Response"), P = pm(P, new URL(b.url), y, u.history);
      let I = wn(D.location, P, {
        _isRedirect: true
      });
      if (o) {
        let Ke = false;
        if (z.response.headers.has("X-Remix-Reload-Document")) Ke = true;
        else if (Pc(P)) {
          const $e = qm(P, true);
          Ke = $e.origin !== r.location.origin || jt($e.pathname, y) == null;
        }
        if (Ke) {
          J ? r.location.replace(P) : r.location.assign(P);
          return;
        }
      }
      ve = null;
      let re = J === true || z.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: ce, formAction: ie, formEncType: Le } = D.navigation;
      !Q && !Z && ce && ie && Le && (Q = Tm(D.navigation));
      let Me = Q || Z;
      if (Dg.has(z.response.status) && Me && At(Me.formMethod)) await El(re, I, {
        submission: {
          ...Me,
          formAction: P
        },
        preventScrollReset: ee || Ve,
        enableViewTransition: U ? et : void 0
      });
      else {
        let Ke = qc(I, Q);
        await El(re, I, {
          overrideNavigation: Ke,
          fetcherSubmission: Z,
          preventScrollReset: ee || Ve,
          enableViewTransition: U ? et : void 0
        });
      }
    }
    async function Zl(b, z, U, Q) {
      var _a;
      let Z, ee = {};
      try {
        Z = await Lg(T, b, z, Q, U, false);
      } catch (J) {
        return z.filter((P) => P.shouldLoad).forEach((P) => {
          ee[P.route.id] = {
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
      for (let [J, P] of Object.entries(Z)) if (Zg(P)) {
        let I = P.result;
        ee[J] = {
          type: "redirect",
          response: Yg(I, b, J, z, y)
        };
      } else ee[J] = await jg(P);
      return ee;
    }
    async function Gn(b, z, U, Q) {
      let Z = Zl(U, b, Q, null), ee = Promise.all(z.map(async (I) => {
        if (I.matches && I.match && I.request && I.controller) {
          let ce = (await Zl(I.request, I.matches, Q, I.key))[I.match.route.id];
          return {
            [I.key]: ce
          };
        } else return Promise.resolve({
          [I.key]: {
            type: "error",
            error: al(404, {
              pathname: I.path
            })
          }
        });
      })), J = await Z, P = (await ee).reduce((I, re) => Object.assign(I, re), {});
      return {
        loaderResults: J,
        fetcherResults: P
      };
    }
    function Kl() {
      V = true, F.forEach((b, z) => {
        ne.has(z) && ae.add(z), gt(z);
      });
    }
    function ul(b, z, U = {}) {
      D.fetchers.set(b, z), mt({
        fetchers: new Map(D.fetchers)
      }, {
        flushSync: (U && U.flushSync) === true
      });
    }
    function Jt(b, z, U, Q = {}) {
      let Z = ba(D.matches, z);
      zl(b), mt({
        errors: {
          [Z.route.id]: U
        },
        fetchers: new Map(D.fetchers)
      }, {
        flushSync: (Q && Q.flushSync) === true
      });
    }
    function Ju(b) {
      return se.set(b, (se.get(b) || 0) + 1), he.has(b) && he.delete(b), D.fetchers.get(b) || Ag;
    }
    function Er(b, z) {
      gt(b, z == null ? void 0 : z.reason), ul(b, Xl(null));
    }
    function zl(b) {
      let z = D.fetchers.get(b);
      ne.has(b) && !(z && z.state === "loading" && B.has(b)) && gt(b), F.delete(b), B.delete(b), K.delete(b), he.delete(b), ae.delete(b), D.fetchers.delete(b);
    }
    function Ot(b) {
      let z = (se.get(b) || 0) - 1;
      z <= 0 ? (se.delete(b), he.add(b)) : se.set(b, z), mt({
        fetchers: new Map(D.fetchers)
      });
    }
    function gt(b, z) {
      let U = ne.get(b);
      U && (U.abort(z), ne.delete(b));
    }
    function Tt(b) {
      for (let z of b) {
        let U = Ju(z), Q = Xl(U.data);
        D.fetchers.set(z, Q);
      }
    }
    function Fu() {
      let b = [], z = false;
      for (let U of K) {
        let Q = D.fetchers.get(U);
        be(Q, `Expected fetcher: ${U}`), Q.state === "loading" && (K.delete(U), b.push(U), z = true);
      }
      return Tt(b), z;
    }
    function $u(b) {
      let z = [];
      for (let [U, Q] of B) if (Q < b) {
        let Z = D.fetchers.get(U);
        be(Z, `Expected fetcher: ${U}`), Z.state === "loading" && (gt(U), B.delete(U), z.push(U));
      }
      return Tt(z), z.length > 0;
    }
    function Rr(b, z) {
      let U = D.blockers.get(b) || xn;
      return Te.get(b) !== z && Te.set(b, z), U;
    }
    function za(b) {
      D.blockers.delete(b), Te.delete(b);
    }
    function Tl(b, z) {
      let U = D.blockers.get(b) || xn;
      be(U.state === "unblocked" && z.state === "blocked" || U.state === "blocked" && z.state === "blocked" || U.state === "blocked" && z.state === "proceeding" || U.state === "blocked" && z.state === "unblocked" || U.state === "proceeding" && z.state === "unblocked", `Invalid blocker state transition: ${U.state} -> ${z.state}`);
      let Q = new Map(D.blockers);
      Q.set(b, z), mt({
        blockers: Q
      });
    }
    function Ta({ currentLocation: b, nextLocation: z, historyAction: U }) {
      if (Te.size === 0) return;
      Te.size > 1 && nt(false, "A router only supports one blocker at a time");
      let Q = Array.from(Te.entries()), [Z, ee] = Q[Q.length - 1], J = D.blockers.get(Z);
      if (!(J && J.state === "proceeding") && ee({
        currentLocation: b,
        nextLocation: z,
        historyAction: U
      })) return Z;
    }
    function il(b) {
      let z = al(404, {
        pathname: b
      }), U = v || g, { matches: Q, route: Z } = or(U);
      return {
        notFoundMatches: Q,
        route: Z,
        error: z
      };
    }
    function Fa(b, z, U) {
      if (q = b, G = z, X = U || null, !$ && D.navigation === Yc) {
        $ = true;
        let Q = Xn(D.location, D.matches);
        Q != null && mt({
          restoreScrollPosition: Q
        });
      }
      return () => {
        q = null, G = null, X = null;
      };
    }
    function Jl(b, z) {
      return X && X(b, z.map((Q) => I0(Q, D.loaderData))) || b.key;
    }
    function zr(b, z) {
      if (q && G) {
        let U = Jl(b, z);
        q[U] = G();
      }
    }
    function Xn(b, z) {
      if (q) {
        let U = Jl(b, z), Q = q[U];
        if (typeof Q == "number") return Q;
      }
      return null;
    }
    function Fl(b, z, U) {
      if (u.patchRoutesOnNavigation) if (b) {
        if (Object.keys(b[0].params).length > 0) return {
          active: true,
          matches: Lu(z, U, y, true)
        };
      } else return {
        active: true,
        matches: Lu(z, U, y, true) || []
      };
      return {
        active: false,
        matches: null
      };
    }
    async function ml(b, z, U, Q) {
      if (!u.patchRoutesOnNavigation) return {
        type: "success",
        matches: b
      };
      let Z = b;
      for (; ; ) {
        let ee = v == null, J = v || g, P = m;
        try {
          await u.patchRoutesOnNavigation({
            signal: U,
            path: z,
            matches: Z,
            fetcherKey: Q,
            patch: (ce, ie) => {
              U.aborted || mm(ce, ie, J, P, d, false);
            }
          });
        } catch (ce) {
          return {
            type: "error",
            error: ce,
            partialMatches: Z
          };
        } finally {
          ee && !U.aborted && (g = [
            ...g
          ]);
        }
        if (U.aborted) return {
          type: "aborted"
        };
        let I = Sa(J, z, y), re = null;
        if (I) {
          if (Object.keys(I[0].params).length === 0) return {
            type: "success",
            matches: I
          };
          if (re = Lu(J, z, y, true), !(re && Z.length < re.length && Wu(Z, re.slice(0, Z.length)))) return {
            type: "success",
            matches: I
          };
        }
        if (re || (re = Lu(J, z, y, true)), !re || Wu(Z, re)) return {
          type: "success",
          matches: null
        };
        Z = re;
      }
    }
    function Wu(b, z) {
      return b.length === z.length && b.every((U, Q) => U.route.id === z[Q].route.id);
    }
    function ku(b) {
      m = {}, v = Bu(b, d, void 0, m);
    }
    function Pu(b, z, U = false) {
      let Q = v == null;
      mm(b, z, v || g, m, d, U), Q && (g = [
        ...g
      ], mt({}));
    }
    return le = {
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
      fetch: Sr,
      revalidate: jn,
      createHref: (b) => u.history.createHref(b),
      encodeLocation: (b) => u.history.encodeLocation(b),
      getFetcher: Ju,
      resetFetcher: Er,
      deleteFetcher: Ot,
      dispose: Za,
      getBlocker: Rr,
      deleteBlocker: za,
      patchRoutes: Pu,
      _internalFetchControllers: ne,
      _internalSetRoutes: ku,
      _internalSetStateDoNotUseOrYouWillBreakYourApp(b) {
        mt(b);
      }
    }, u.unstable_instrumentations && (le = pg(le, u.unstable_instrumentations.map((b) => b.router).filter(Boolean))), le;
  }
  function Og(u) {
    return u != null && ("formData" in u && u.formData != null || "body" in u && u.body !== void 0);
  }
  function Jc(u, r, o, f, s, d) {
    let m, g;
    if (s) {
      m = [];
      for (let y of r) if (m.push(y), y.route.id === s) {
        g = y;
        break;
      }
    } else m = r, g = r[r.length - 1];
    let v = gr(f || ".", Ic(m), jt(u.pathname, o) || u.pathname, d === "path");
    if (f == null && (v.search = u.search, v.hash = u.hash), (f == null || f === "" || f === ".") && g) {
      let y = lo(v.search);
      if (g.route.index && !y) v.search = v.search ? v.search.replace(/^\?/, "?index&") : "?index";
      else if (!g.route.index && y) {
        let T = new URLSearchParams(v.search), S = T.getAll("index");
        T.delete("index"), S.filter((H) => H).forEach((H) => T.append("index", H));
        let A = T.toString();
        v.search = A ? `?${A}` : "";
      }
    }
    return o !== "/" && (v.pathname = dg({
      basename: o,
      pathname: v.pathname
    })), dl(v);
  }
  function dm(u, r, o) {
    if (!o || !Og(o)) return {
      path: r
    };
    if (o.formMethod && !Fg(o.formMethod)) return {
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
    }), d = (o.formMethod || "get").toUpperCase(), m = uy(r);
    if (o.body !== void 0) {
      if (o.formEncType === "text/plain") {
        if (!At(d)) return f();
        let S = typeof o.body == "string" ? o.body : o.body instanceof FormData || o.body instanceof URLSearchParams ? Array.from(o.body.entries()).reduce((A, [H, q]) => `${A}${H}=${q}
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
    be(typeof FormData == "function", "FormData is not available in this environment");
    let g, v;
    if (o.formData) g = $c(o.formData), v = o.formData;
    else if (o.body instanceof FormData) g = $c(o.body), v = o.body;
    else if (o.body instanceof URLSearchParams) g = o.body, v = Sm(g);
    else if (o.body == null) g = new URLSearchParams(), v = new FormData();
    else try {
      g = new URLSearchParams(o.body), v = Sm(g);
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
    let T = hl(r);
    return u && T.search && lo(T.search) && g.append("index", ""), T.search = `?${g}`, {
      path: dl(T),
      submission: y
    };
  }
  function hm(u, r, o, f, s, d, m, g, v, y, T, S, A, H, q, X, G, $, W, k, ge) {
    var _a;
    let me = k ? Kt(k[1]) ? k[1].error : k[1].data : void 0, oe = s.createURL(d.location), le = s.createURL(v), D;
    if (T && d.errors) {
      let ye = Object.keys(d.errors)[0];
      D = m.findIndex((N) => N.route.id === ye);
    } else if (k && Kt(k[1])) {
      let ye = k[0];
      D = m.findIndex((N) => N.route.id === ye) - 1;
    }
    let ze = k ? k[1].statusCode : void 0, Ue = ze && ze >= 400, Ve = {
      currentUrl: oe,
      currentParams: ((_a = d.matches[0]) == null ? void 0 : _a.params) || {},
      nextUrl: le,
      nextParams: m[0].params,
      ...g,
      actionResult: me,
      actionStatus: ze
    }, ve = Gu(m), et = m.map((ye, N) => {
      let { route: V } = ye, ae = null;
      if (D != null && N > D) ae = false;
      else if (V.lazy) ae = true;
      else if (!eo(V)) ae = false;
      else if (T) {
        let { shouldLoad: B } = Im(V, d.loaderData, d.errors);
        ae = B;
      } else Cg(d.loaderData, d.matches[N], ye) && (ae = true);
      if (ae !== null) return Fc(o, f, u, ve, ye, y, r, ae);
      let ne = false;
      typeof ge == "boolean" ? ne = ge : Ue ? ne = false : (S || oe.pathname + oe.search === le.pathname + le.search || oe.search !== le.search || Ug(d.matches[N], ye)) && (ne = true);
      let Ee = {
        ...Ve,
        defaultShouldRevalidate: ne
      }, E = wu(ye, Ee);
      return Fc(o, f, u, ve, ye, y, r, E, Ee, ge);
    }), xe = [];
    return q.forEach((ye, N) => {
      if (T || !m.some((F) => F.route.id === ye.routeId) || H.has(N)) return;
      let V = d.fetchers.get(N), ae = V && V.state !== "idle" && V.data === void 0, ne = Sa(G, ye.path, $);
      if (!ne) {
        if (W && ae) return;
        xe.push({
          key: N,
          routeId: ye.routeId,
          path: ye.path,
          matches: null,
          match: null,
          request: null,
          controller: null
        });
        return;
      }
      if (X.has(N)) return;
      let Ee = hr(ne, ye.path), E = new AbortController(), B = Nn(s, ye.path, E.signal), K = null;
      if (A.has(N)) A.delete(N), K = Ln(o, f, B, ne, Ee, y, r);
      else if (ae) S && (K = Ln(o, f, B, ne, Ee, y, r));
      else {
        let F;
        typeof ge == "boolean" ? F = ge : Ue ? F = false : F = S;
        let se = {
          ...Ve,
          defaultShouldRevalidate: F
        };
        wu(Ee, se) && (K = Ln(o, f, B, ne, Ee, y, r, se));
      }
      K && xe.push({
        key: N,
        routeId: ye.routeId,
        path: ye.path,
        matches: K,
        match: Ee,
        request: B,
        controller: E
      });
    }), {
      dsMatches: et,
      revalidatingFetchers: xe
    };
  }
  function eo(u) {
    return u.loader != null || u.middleware != null && u.middleware.length > 0;
  }
  function Im(u, r, o) {
    if (u.lazy) return {
      shouldLoad: true,
      renderFallback: true
    };
    if (!eo(u)) return {
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
  function Cg(u, r, o) {
    let f = !r || o.route.id !== r.route.id, s = !u.hasOwnProperty(o.route.id);
    return f || s;
  }
  function Ug(u, r) {
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
  function mm(u, r, o, f, s, d) {
    let m;
    if (u) {
      let y = f[u];
      be(y, `No route found to patch children into: routeId = ${u}`), y.children || (y.children = []), m = y.children;
    } else m = o;
    let g = [], v = [];
    if (r.forEach((y) => {
      let T = m.find((S) => ey(y, S));
      T ? v.push({
        existingRoute: T,
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
      let { existingRoute: T, newRoute: S } = v[y], A = T, [H] = Bu([
        S
      ], s, [], {}, true);
      Object.assign(A, {
        element: H.element ? H.element : A.element,
        errorElement: H.errorElement ? H.errorElement : A.errorElement,
        hydrateFallbackElement: H.hydrateFallbackElement ? H.hydrateFallbackElement : A.hydrateFallbackElement
      });
    }
  }
  function ey(u, r) {
    var _a;
    return "id" in u && "id" in r && u.id === r.id ? true : u.index === r.index && u.path === r.path && u.caseSensitive === r.caseSensitive ? (!u.children || u.children.length === 0) && (!r.children || r.children.length === 0) ? true : ((_a = u.children) == null ? void 0 : _a.every((o, f) => {
      var _a2;
      return (_a2 = r.children) == null ? void 0 : _a2.some((s) => ey(o, s));
    })) ?? false : false;
  }
  var ym = /* @__PURE__ */ new WeakMap(), ty = ({ key: u, route: r, manifest: o, mapRouteProperties: f }) => {
    let s = o[r.id];
    if (be(s, "No route found in manifest"), !s.lazy || typeof s.lazy != "object") return;
    let d = s.lazy[u];
    if (!d) return;
    let m = ym.get(s);
    m || (m = {}, ym.set(s, m));
    let g = m[u];
    if (g) return g;
    let v = (async () => {
      let y = $0(u), S = s[u] !== void 0 && u !== "hasErrorBoundary";
      if (y) nt(!y, "Route property " + u + " is not a supported lazy route property. This property will be ignored."), m[u] = Promise.resolve();
      else if (S) nt(false, `Route "${s.id}" has a static property "${u}" defined. The lazy property will be ignored.`);
      else {
        let A = await d();
        A != null && (Object.assign(s, {
          [u]: A
        }), Object.assign(s, f(s)));
      }
      typeof s.lazy == "object" && (s.lazy[u] = void 0, Object.values(s.lazy).every((A) => A === void 0) && (s.lazy = void 0));
    })();
    return m[u] = v, v;
  }, vm = /* @__PURE__ */ new WeakMap();
  function xg(u, r, o, f, s) {
    let d = o[u.id];
    if (be(d, "No route found in manifest"), !u.lazy) return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
    if (typeof u.lazy == "function") {
      let T = vm.get(d);
      if (T) return {
        lazyRoutePromise: T,
        lazyHandlerPromise: T
      };
      let S = (async () => {
        be(typeof u.lazy == "function", "No lazy route function found");
        let A = await u.lazy(), H = {};
        for (let q in A) {
          let X = A[q];
          if (X === void 0) continue;
          let G = k0(q), W = d[q] !== void 0 && q !== "hasErrorBoundary";
          G ? nt(!G, "Route property " + q + " is not a supported property to be returned from a lazy route function. This property will be ignored.") : W ? nt(!W, `Route "${d.id}" has a static property "${q}" defined but its lazy function is also returning a value for this property. The lazy route property "${q}" will be ignored.`) : H[q] = X;
        }
        Object.assign(d, H), Object.assign(d, {
          ...f(d),
          lazy: void 0
        });
      })();
      return vm.set(d, S), S.catch(() => {
      }), {
        lazyRoutePromise: S,
        lazyHandlerPromise: S
      };
    }
    let m = Object.keys(u.lazy), g = [], v;
    for (let T of m) {
      if (s && s.includes(T)) continue;
      let S = ty({
        key: T,
        route: u,
        manifest: o,
        mapRouteProperties: f
      });
      S && (g.push(S), T === r && (v = S));
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
  async function gm(u) {
    let r = u.matches.filter((s) => s.shouldLoad), o = {};
    return (await Promise.all(r.map((s) => s.resolve()))).forEach((s, d) => {
      o[r[d].route.id] = s;
    }), o;
  }
  async function Ng(u) {
    return u.matches.some((r) => r.route.middleware) ? ly(u, () => gm(u)) : gm(u);
  }
  function ly(u, r) {
    return Hg(u, r, (f) => {
      if (Jg(f)) throw f;
      return f;
    }, Qg, o);
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
  async function Hg(u, r, o, f, s) {
    let { matches: d, request: m, params: g, context: v, unstable_pattern: y } = u, T = d.flatMap((A) => A.route.middleware ? A.route.middleware.map((H) => [
      A.route.id,
      H
    ]) : []);
    return await ay({
      request: m,
      params: g,
      context: v,
      unstable_pattern: y
    }, T, r, o, f, s);
  }
  async function ay(u, r, o, f, s, d, m = 0) {
    let { request: g } = u;
    if (g.signal.aborted) throw g.signal.reason ?? new Error(`Request aborted: ${g.method} ${g.url}`);
    let v = r[m];
    if (!v) return await o();
    let [y, T] = v, S, A = async () => {
      if (S) throw new Error("You may only call `next()` once per middleware");
      try {
        return S = {
          value: await ay(u, r, o, f, s, d, m + 1)
        }, S.value;
      } catch (H) {
        return S = {
          value: await d(H, y, S)
        }, S.value;
      }
    };
    try {
      let H = await T(u, A), q = H != null ? f(H) : void 0;
      return s(q) ? q : S ? q ?? S.value : (S = {
        value: await A()
      }, S.value);
    } catch (H) {
      return await d(H, y, S);
    }
  }
  function ny(u, r, o, f, s) {
    let d = ty({
      key: "middleware",
      route: f.route,
      manifest: r,
      mapRouteProperties: u
    }), m = xg(f.route, At(o.method) ? "action" : "loader", r, u, s);
    return {
      middleware: d,
      route: m.lazyRoutePromise,
      handler: m.lazyHandlerPromise
    };
  }
  function Fc(u, r, o, f, s, d, m, g, v = null, y) {
    let T = false, S = ny(u, r, o, s, d);
    return {
      ...s,
      _lazyPromises: S,
      shouldLoad: g,
      shouldRevalidateArgs: v,
      shouldCallHandler(A) {
        return T = true, v ? typeof y == "boolean" ? wu(s, {
          ...v,
          defaultShouldRevalidate: y
        }) : typeof A == "boolean" ? wu(s, {
          ...v,
          defaultShouldRevalidate: A
        }) : wu(s, v) : g;
      },
      resolve(A) {
        let { lazy: H, loader: q, middleware: X } = s.route, G = T || g || A && !At(o.method) && (H || q), $ = X && X.length > 0 && !q && !H;
        return G && (At(o.method) || !$) ? wg({
          request: o,
          unstable_pattern: f,
          match: s,
          lazyHandlerPromise: S == null ? void 0 : S.handler,
          lazyRoutePromise: S == null ? void 0 : S.route,
          handlerOverride: A,
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
      _lazyPromises: ny(u, r, o, v, d),
      resolve: () => Promise.resolve({
        type: "data",
        result: void 0
      })
    } : Fc(u, r, o, Gu(f), v, d, m, true, g));
  }
  async function Lg(u, r, o, f, s, d) {
    o.some((y) => {
      var _a;
      return (_a = y._lazyPromises) == null ? void 0 : _a.middleware;
    }) && await Promise.all(o.map((y) => {
      var _a;
      return (_a = y._lazyPromises) == null ? void 0 : _a.middleware;
    }));
    let m = {
      request: r,
      unstable_pattern: Gu(o),
      params: o[0].params,
      context: s,
      matches: o
    }, v = await u({
      ...m,
      fetcherKey: f,
      runClientMiddleware: (y) => {
        let T = m;
        return ly(T, () => y({
          ...T,
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
  async function wg({ request: u, unstable_pattern: r, match: o, lazyHandlerPromise: f, lazyRoutePromise: s, handlerOverride: d, scopedContext: m }) {
    let g, v, y = At(u.method), T = y ? "action" : "loader", S = (A) => {
      let H, q = new Promise(($, W) => H = W);
      v = () => H(), u.signal.addEventListener("abort", v);
      let X = ($) => typeof A != "function" ? Promise.reject(new Error(`You cannot call the handler for a route which defines a boolean "${T}" [routeId: ${o.route.id}]`)) : A({
        request: u,
        unstable_pattern: r,
        params: o.params,
        context: m
      }, ...$ !== void 0 ? [
        $
      ] : []), G = (async () => {
        try {
          return {
            type: "data",
            result: await (d ? d((W) => X(W)) : X())
          };
        } catch ($) {
          return {
            type: "error",
            result: $
          };
        }
      })();
      return Promise.race([
        G,
        q
      ]);
    };
    try {
      let A = y ? o.route.action : o.route.loader;
      if (f || s) if (A) {
        let H, [q] = await Promise.all([
          S(A).catch((X) => {
            H = X;
          }),
          f,
          s
        ]);
        if (H !== void 0) throw H;
        g = q;
      } else {
        await f;
        let H = y ? o.route.action : o.route.loader;
        if (H) [g] = await Promise.all([
          S(H),
          s
        ]);
        else if (T === "action") {
          let q = new URL(u.url), X = q.pathname + q.search;
          throw al(405, {
            method: u.method,
            pathname: X,
            routeId: o.route.id
          });
        } else return {
          type: "data",
          result: void 0
        };
      }
      else if (A) g = await S(A);
      else {
        let H = new URL(u.url), q = H.pathname + H.search;
        throw al(404, {
          pathname: q
        });
      }
    } catch (A) {
      return {
        type: "error",
        result: A
      };
    } finally {
      v && u.signal.removeEventListener("abort", v);
    }
    return g;
  }
  async function Bg(u) {
    let r = u.headers.get("Content-Type");
    return r && /\bapplication\/json\b/.test(r) ? u.body == null ? null : u.json() : u.text();
  }
  async function jg(u) {
    var _a, _b, _c, _d, _e;
    let { result: r, type: o } = u;
    if (to(r)) {
      let f;
      try {
        f = await Bg(r);
      } catch (s) {
        return {
          type: "error",
          error: s
        };
      }
      return o === "error" ? {
        type: "error",
        error: new qu(r.status, r.statusText, f),
        statusCode: r.status,
        headers: r.headers
      } : {
        type: "data",
        data: f,
        statusCode: r.status,
        headers: r.headers
      };
    }
    return o === "error" ? zm(r) ? r.data instanceof Error ? {
      type: "error",
      error: r.data,
      statusCode: (_a = r.init) == null ? void 0 : _a.status,
      headers: ((_b = r.init) == null ? void 0 : _b.headers) ? new Headers(r.init.headers) : void 0
    } : {
      type: "error",
      error: Xg(r),
      statusCode: ju(r) ? r.status : void 0,
      headers: ((_c = r.init) == null ? void 0 : _c.headers) ? new Headers(r.init.headers) : void 0
    } : {
      type: "error",
      error: r,
      statusCode: ju(r) ? r.status : void 0
    } : zm(r) ? {
      type: "data",
      data: r.data,
      statusCode: (_d = r.init) == null ? void 0 : _d.status,
      headers: ((_e = r.init) == null ? void 0 : _e.headers) ? new Headers(r.init.headers) : void 0
    } : {
      type: "data",
      data: r
    };
  }
  function Yg(u, r, o, f, s) {
    let d = u.headers.get("Location");
    if (be(d, "Redirects returned/thrown from loaders/actions must have a Location header"), !Pc(d)) {
      let m = f.slice(0, f.findIndex((g) => g.route.id === o) + 1);
      d = Jc(new URL(r.url), m, s, d), u.headers.set("Location", d);
    }
    return u;
  }
  function pm(u, r, o, f) {
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
    if (Pc(u)) {
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
    let s = u.createURL(uy(r)).toString(), d = {
      signal: o
    };
    if (f && At(f.formMethod)) {
      let { formMethod: m, formEncType: g } = f;
      d.method = m.toUpperCase(), g === "application/json" ? (d.headers = new Headers({
        "Content-Type": g
      }), d.body = JSON.stringify(f.json)) : g === "text/plain" ? d.body = f.text : g === "application/x-www-form-urlencoded" && f.formData ? d.body = $c(f.formData) : d.body = f.formData;
    }
    return new Request(s, d);
  }
  function $c(u) {
    let r = new URLSearchParams();
    for (let [o, f] of u.entries()) r.append(o, typeof f == "string" ? f : f.name);
    return r;
  }
  function Sm(u) {
    let r = new FormData();
    for (let [o, f] of u.entries()) r.append(o, f);
    return r;
  }
  function qg(u, r, o, f = false, s = false) {
    let d = {}, m = null, g, v = false, y = {}, T = o && Kt(o[1]) ? o[1].error : void 0;
    return u.forEach((S) => {
      if (!(S.route.id in r)) return;
      let A = S.route.id, H = r[A];
      if (be(!Qa(H), "Cannot handle redirect results in processLoaderData"), Kt(H)) {
        let q = H.error;
        if (T !== void 0 && (q = T, T = void 0), m = m || {}, s) m[A] = q;
        else {
          let X = ba(u, A);
          m[X.route.id] == null && (m[X.route.id] = q);
        }
        f || (d[A] = km), v || (v = true, g = ju(H.error) ? H.error.status : 500), H.headers && (y[A] = H.headers);
      } else d[A] = H.data, H.statusCode && H.statusCode !== 200 && !v && (g = H.statusCode), H.headers && (y[A] = H.headers);
    }), T !== void 0 && o && (m = {
      [o[0]]: T
    }, o[2] && (d[o[2]] = void 0)), {
      loaderData: d,
      errors: m,
      statusCode: g || 200,
      loaderHeaders: y
    };
  }
  function bm(u, r, o, f, s, d) {
    let { loaderData: m, errors: g } = qg(r, o, f);
    return s.filter((v) => !v.matches || v.matches.some((y) => y.shouldLoad)).forEach((v) => {
      let { key: y, match: T, controller: S } = v;
      if (S && S.signal.aborted) return;
      let A = d[y];
      if (be(A, "Did not find corresponding fetcher result"), Kt(A)) {
        let H = ba(u.matches, T == null ? void 0 : T.route.id);
        g && g[H.route.id] || (g = {
          ...g,
          [H.route.id]: A.error
        }), u.fetchers.delete(y);
      } else if (Qa(A)) be(false, "Unhandled fetcher revalidation redirect");
      else {
        let H = Xl(A.data);
        u.fetchers.set(y, H);
      }
    }), {
      loaderData: m,
      errors: g
    };
  }
  function Em(u, r, o, f) {
    let s = Object.entries(r).filter(([, d]) => d !== km).reduce((d, [m, g]) => (d[m] = g, d), {});
    for (let d of o) {
      let m = d.route.id;
      if (!r.hasOwnProperty(m) && u.hasOwnProperty(m) && d.route.loader && (s[m] = u[m]), f && f.hasOwnProperty(m)) break;
    }
    return s;
  }
  function Rm(u) {
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
  function or(u) {
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
    return u === 400 ? (m = "Bad Request", f && r && o ? g = `You made a ${f} request to "${r}" but did not provide a \`loader\` for route "${o}", so there is no way to handle the request.` : s === "invalid-body" && (g = "Unable to encode submission body")) : u === 403 ? (m = "Forbidden", g = `Route "${o}" does not match URL "${r}"`) : u === 404 ? (m = "Not Found", g = `No route matches URL "${r}"`) : u === 405 && (m = "Method Not Allowed", f && r && o ? g = `You made a ${f.toUpperCase()} request to "${r}" but did not provide an \`action\` for route "${o}", so there is no way to handle the request.` : f && (g = `Invalid request method "${f.toUpperCase()}"`)), new qu(u || 500, m, new Error(g), true);
  }
  function sr(u) {
    let r = Object.entries(u);
    for (let o = r.length - 1; o >= 0; o--) {
      let [f, s] = r[o];
      if (Qa(s)) return {
        key: f,
        result: s
      };
    }
  }
  function uy(u) {
    let r = typeof u == "string" ? hl(u) : u;
    return dl({
      ...r,
      hash: ""
    });
  }
  function Gg(u, r) {
    return u.pathname !== r.pathname || u.search !== r.search ? false : u.hash === "" ? r.hash !== "" : u.hash === r.hash ? true : r.hash !== "";
  }
  function Xg(u) {
    var _a, _b;
    return new qu(((_a = u.init) == null ? void 0 : _a.status) ?? 500, ((_b = u.init) == null ? void 0 : _b.statusText) ?? "Internal Server Error", u.data);
  }
  function Qg(u) {
    return u != null && typeof u == "object" && Object.entries(u).every(([r, o]) => typeof r == "string" && Vg(o));
  }
  function Vg(u) {
    return u != null && typeof u == "object" && "type" in u && "result" in u && (u.type === "data" || u.type === "error");
  }
  function Zg(u) {
    return to(u.result) && $m.has(u.result.status);
  }
  function Kt(u) {
    return u.type === "error";
  }
  function Qa(u) {
    return (u && u.type) === "redirect";
  }
  function zm(u) {
    return typeof u == "object" && u != null && "type" in u && "data" in u && "init" in u && u.type === "DataWithResponseInit";
  }
  function to(u) {
    return u != null && typeof u.status == "number" && typeof u.statusText == "string" && typeof u.headers == "object" && typeof u.body < "u";
  }
  function Kg(u) {
    return $m.has(u);
  }
  function Jg(u) {
    return to(u) && Kg(u.status) && u.headers.has("Location");
  }
  function Fg(u) {
    return Mg.has(u.toUpperCase());
  }
  function At(u) {
    return zg.has(u.toUpperCase());
  }
  function lo(u) {
    return new URLSearchParams(u).getAll("index").some((r) => r === "");
  }
  function hr(u, r) {
    let o = typeof r == "string" ? hl(r).search : r.search;
    if (u[u.length - 1].route.index && lo(o || "")) return u[u.length - 1];
    let f = Vm(u);
    return f[f.length - 1];
  }
  function Tm(u) {
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
  function qc(u, r) {
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
  function $g(u, r) {
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
  function Wg(u, r) {
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
  function kg(u, r) {
    try {
      let o = u.sessionStorage.getItem(Wm);
      if (o) {
        let f = JSON.parse(o);
        for (let [s, d] of Object.entries(f || {})) d && Array.isArray(d) && r.set(s, new Set(d || []));
      }
    } catch {
    }
  }
  function Pg(u, r) {
    if (r.size > 0) {
      let o = {};
      for (let [f, s] of r) o[f] = [
        ...s
      ];
      try {
        u.sessionStorage.setItem(Wm, JSON.stringify(o));
      } catch (f) {
        nt(false, `Failed to save applied view transitions in sessionStorage (${f}).`);
      }
    }
  }
  function Mm() {
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
  var Xu = x.createContext(null);
  Xu.displayName = "DataRouterState";
  var iy = x.createContext(false);
  function Ig() {
    return x.useContext(iy);
  }
  var ao = x.createContext({
    isTransitioning: false
  });
  ao.displayName = "ViewTransition";
  var ry = x.createContext(/* @__PURE__ */ new Map());
  ry.displayName = "Fetchers";
  var ep = x.createContext(null);
  ep.displayName = "Await";
  var nl = x.createContext(null);
  nl.displayName = "Navigation";
  var Qu = x.createContext(null);
  Qu.displayName = "Location";
  var Ql = x.createContext({
    outlet: null,
    matches: [],
    isDataRoute: false
  });
  Ql.displayName = "Route";
  var no = x.createContext(null);
  no.displayName = "RouteError";
  var fy = "REACT_ROUTER_ERROR", tp = "REDIRECT", lp = "ROUTE_ERROR_RESPONSE";
  function ap(u) {
    if (u.startsWith(`${fy}:${tp}:{`)) try {
      let r = JSON.parse(u.slice(28));
      if (typeof r == "object" && r && typeof r.status == "number" && typeof r.statusText == "string" && typeof r.location == "string" && typeof r.reloadDocument == "boolean" && typeof r.replace == "boolean") return r;
    } catch {
    }
  }
  function np(u) {
    if (u.startsWith(`${fy}:${lp}:{`)) try {
      let r = JSON.parse(u.slice(40));
      if (typeof r == "object" && r && typeof r.status == "number" && typeof r.statusText == "string") return new qu(r.status, r.statusText, r.data);
    } catch {
    }
  }
  function up(u, { relative: r } = {}) {
    be(Vu(), "useHref() may be used only in the context of a <Router> component.");
    let { basename: o, navigator: f } = x.useContext(nl), { hash: s, pathname: d, search: m } = Zu(u, {
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
  function Vu() {
    return x.useContext(Qu) != null;
  }
  Vl = function() {
    return be(Vu(), "useLocation() may be used only in the context of a <Router> component."), x.useContext(Qu).location;
  };
  var cy = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
  function oy(u) {
    x.useContext(nl).static || x.useLayoutEffect(u);
  }
  sy = function() {
    let { isDataRoute: u } = x.useContext(Ql);
    return u ? gp() : ip();
  };
  function ip() {
    be(Vu(), "useNavigate() may be used only in the context of a <Router> component.");
    let u = x.useContext(Va), { basename: r, navigator: o } = x.useContext(nl), { matches: f } = x.useContext(Ql), { pathname: s } = Vl(), d = JSON.stringify(Ic(f)), m = x.useRef(false);
    return oy(() => {
      m.current = true;
    }), x.useCallback((v, y = {}) => {
      if (nt(m.current, cy), !m.current) return;
      if (typeof v == "number") {
        o.go(v);
        return;
      }
      let T = gr(v, JSON.parse(d), s, y.relative === "path");
      u == null && r !== "/" && (T.pathname = T.pathname === "/" ? r : sl([
        r,
        T.pathname
      ])), (y.replace ? o.replace : o.push)(T, y.state, y);
    }, [
      r,
      o,
      d,
      s,
      u
    ]);
  }
  x.createContext(null);
  function Zu(u, { relative: r } = {}) {
    let { matches: o } = x.useContext(Ql), { pathname: f } = Vl(), s = JSON.stringify(Ic(o));
    return x.useMemo(() => gr(u, JSON.parse(s), f, r === "path"), [
      u,
      s,
      f,
      r
    ]);
  }
  function rp(u, r) {
    return dy(u, r);
  }
  function dy(u, r, o) {
    var _a;
    be(Vu(), "useRoutes() may be used only in the context of a <Router> component.");
    let { navigator: f } = x.useContext(nl), { matches: s } = x.useContext(Ql), d = s[s.length - 1], m = d ? d.params : {}, g = d ? d.pathname : "/", v = d ? d.pathnameBase : "/", y = d && d.route;
    {
      let G = y && y.path || "";
      vy(g, !y || G.endsWith("*") || G.endsWith("*?"), `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${G}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${G}"> to <Route path="${G === "/" ? "*" : `${G}/*`}">.`);
    }
    let T = Vl(), S;
    if (r) {
      let G = typeof r == "string" ? hl(r) : r;
      be(v === "/" || ((_a = G.pathname) == null ? void 0 : _a.startsWith(v)), `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${v}" but pathname "${G.pathname}" was given in the \`location\` prop.`), S = G;
    } else S = T;
    let A = S.pathname || "/", H = A;
    if (v !== "/") {
      let G = v.replace(/^\//, "").split("/");
      H = "/" + A.replace(/^\//, "").split("/").slice(G.length).join("/");
    }
    let q = Sa(u, {
      pathname: H
    });
    nt(y || q != null, `No routes matched location "${S.pathname}${S.search}${S.hash}" `), nt(q == null || q[q.length - 1].route.element !== void 0 || q[q.length - 1].route.Component !== void 0 || q[q.length - 1].route.lazy !== void 0, `Matched leaf route at location "${S.pathname}${S.search}${S.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);
    let X = dp(q && q.map((G) => Object.assign({}, G, {
      params: Object.assign({}, m, G.params),
      pathname: sl([
        v,
        f.encodeLocation ? f.encodeLocation(G.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : G.pathname
      ]),
      pathnameBase: G.pathnameBase === "/" ? v : sl([
        v,
        f.encodeLocation ? f.encodeLocation(G.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : G.pathnameBase
      ])
    })), s, o);
    return r && X ? x.createElement(Qu.Provider, {
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
    }, X) : X;
  }
  function fp() {
    let u = yp(), r = ju(u) ? `${u.status} ${u.statusText}` : u instanceof Error ? u.message : JSON.stringify(u), o = u instanceof Error ? u.stack : null, f = "rgba(200,200,200, 0.5)", s = {
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
  var cp = x.createElement(fp, null), hy = class extends x.Component {
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
        const o = np(u.digest);
        o && (u = o);
      }
      let r = u !== void 0 ? x.createElement(Ql.Provider, {
        value: this.props.routeContext
      }, x.createElement(no.Provider, {
        value: u,
        children: this.props.component
      })) : this.props.children;
      return this.context ? x.createElement(op, {
        error: u
      }, r) : r;
    }
  };
  hy.contextType = iy;
  var Gc = /* @__PURE__ */ new WeakMap();
  function op({ children: u, error: r }) {
    let { basename: o } = x.useContext(nl);
    if (typeof r == "object" && r && "digest" in r && typeof r.digest == "string") {
      let f = ap(r.digest);
      if (f) {
        let s = Gc.get(r);
        if (s) throw s;
        let d = Km(f.location, o);
        if (Zm && !Gc.get(r)) if (d.isExternal || f.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const m = Promise.resolve().then(() => window.__reactRouterDataRouter.navigate(d.to, {
            replace: f.replace
          }));
          throw Gc.set(r, m), m;
        }
        return x.createElement("meta", {
          httpEquiv: "refresh",
          content: `0;url=${d.absoluteURL || d.to}`
        });
      }
    }
    return u;
  }
  function sp({ routeContext: u, match: r, children: o }) {
    let f = x.useContext(Va);
    return f && f.static && f.staticContext && (r.route.errorElement || r.route.ErrorBoundary) && (f.staticContext._deepestRenderedBoundaryId = r.route.id), x.createElement(Ql.Provider, {
      value: u
    }, o);
  }
  function dp(u, r = [], o) {
    let f = o == null ? void 0 : o.state;
    if (u == null) {
      if (!f) return null;
      if (f.errors) u = f.matches;
      else if (r.length === 0 && !f.initialized && f.matches.length > 0) u = f.matches;
      else return null;
    }
    let s = u, d = f == null ? void 0 : f.errors;
    if (d != null) {
      let T = s.findIndex((S) => S.route.id && (d == null ? void 0 : d[S.route.id]) !== void 0);
      be(T >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(",")}`), s = s.slice(0, Math.min(s.length, T + 1));
    }
    let m = false, g = -1;
    if (o && f) {
      m = f.renderFallback;
      for (let T = 0; T < s.length; T++) {
        let S = s[T];
        if ((S.route.HydrateFallback || S.route.hydrateFallbackElement) && (g = T), S.route.id) {
          let { loaderData: A, errors: H } = f, q = S.route.loader && !A.hasOwnProperty(S.route.id) && (!H || H[S.route.id] === void 0);
          if (S.route.lazy || q) {
            o.isStatic && (m = true), g >= 0 ? s = s.slice(0, g + 1) : s = [
              s[0]
            ];
            break;
          }
        }
      }
    }
    let v = o == null ? void 0 : o.onError, y = f && v ? (T, S) => {
      var _a, _b;
      v(T, {
        location: f.location,
        params: ((_b = (_a = f.matches) == null ? void 0 : _a[0]) == null ? void 0 : _b.params) ?? {},
        unstable_pattern: Gu(f.matches),
        errorInfo: S
      });
    } : void 0;
    return s.reduceRight((T, S, A) => {
      let H, q = false, X = null, G = null;
      f && (H = d && S.route.id ? d[S.route.id] : void 0, X = S.route.errorElement || cp, m && (g < 0 && A === 0 ? (vy("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration"), q = true, G = null) : g === A && (q = true, G = S.route.hydrateFallbackElement || null)));
      let $ = r.concat(s.slice(0, A + 1)), W = () => {
        let k;
        return H ? k = X : q ? k = G : S.route.Component ? k = x.createElement(S.route.Component, null) : S.route.element ? k = S.route.element : k = T, x.createElement(sp, {
          match: S,
          routeContext: {
            outlet: T,
            matches: $,
            isDataRoute: f != null
          },
          children: k
        });
      };
      return f && (S.route.ErrorBoundary || S.route.errorElement || A === 0) ? x.createElement(hy, {
        location: f.location,
        revalidation: f.revalidation,
        component: X,
        error: H,
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
  function uo(u) {
    return `${u} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
  }
  function my(u) {
    let r = x.useContext(Va);
    return be(r, uo(u)), r;
  }
  function yy(u) {
    let r = x.useContext(Xu);
    return be(r, uo(u)), r;
  }
  function hp(u) {
    let r = x.useContext(Ql);
    return be(r, uo(u)), r;
  }
  function io(u) {
    let r = hp(u), o = r.matches[r.matches.length - 1];
    return be(o.route.id, `${u} can only be used on routes that contain a unique "id"`), o.route.id;
  }
  function mp() {
    return io("useRouteId");
  }
  yp = function() {
    var _a;
    let u = x.useContext(no), r = yy("useRouteError"), o = io("useRouteError");
    return u !== void 0 ? u : (_a = r.errors) == null ? void 0 : _a[o];
  };
  var vp = 0;
  h1 = function(u) {
    let { router: r, basename: o } = my("useBlocker"), f = yy("useBlocker"), [s, d] = x.useState(""), m = x.useCallback((g) => {
      if (typeof u != "function") return !!u;
      if (o === "/") return u(g);
      let { currentLocation: v, nextLocation: y, historyAction: T } = g;
      return u({
        currentLocation: {
          ...v,
          pathname: jt(v.pathname, o) || v.pathname
        },
        nextLocation: {
          ...y,
          pathname: jt(y.pathname, o) || y.pathname
        },
        historyAction: T
      });
    }, [
      o,
      u
    ]);
    return x.useEffect(() => {
      let g = String(++vp);
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
  function gp() {
    let { router: u } = my("useNavigate"), r = io("useNavigate"), o = x.useRef(false);
    return oy(() => {
      o.current = true;
    }), x.useCallback(async (s, d = {}) => {
      nt(o.current, cy), o.current && (typeof s == "number" ? await u.navigate(s) : await u.navigate(s, {
        fromRouteId: r,
        ...d
      }));
    }, [
      u,
      r
    ]);
  }
  var Dm = {};
  function vy(u, r, o) {
    !r && !Dm[u] && (Dm[u] = true, nt(false, o));
  }
  var Am = {};
  function _m(u, r) {
    !u && !Am[r] && (Am[r] = true, console.warn(r));
  }
  var pp = "useOptimistic", Om = B0[pp], Sp = () => {
  };
  function bp(u) {
    return Om ? Om(u) : [
      u,
      Sp
    ];
  }
  function gy(u) {
    let r = {
      hasErrorBoundary: u.hasErrorBoundary || u.ErrorBoundary != null || u.errorElement != null
    };
    return u.Component && (u.element && nt(false, "You should not include both `Component` and `element` on your route - `Component` will be used."), Object.assign(r, {
      element: x.createElement(u.Component),
      Component: void 0
    })), u.HydrateFallback && (u.hydrateFallbackElement && nt(false, "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."), Object.assign(r, {
      hydrateFallbackElement: x.createElement(u.HydrateFallback),
      HydrateFallback: void 0
    })), u.ErrorBoundary && (u.errorElement && nt(false, "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."), Object.assign(r, {
      errorElement: x.createElement(u.ErrorBoundary),
      ErrorBoundary: void 0
    })), r;
  }
  var py = [
    "HydrateFallback",
    "hydrateFallbackElement"
  ], Ep = class {
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
  m1 = function({ router: u, flushSync: r, onError: o, unstable_useTransitions: f }) {
    f = Ig() || f;
    let [d, m] = x.useState(u.state), [g, v] = bp(d), [y, T] = x.useState(), [S, A] = x.useState({
      isTransitioning: false
    }), [H, q] = x.useState(), [X, G] = x.useState(), [$, W] = x.useState(), k = x.useRef(/* @__PURE__ */ new Map()), ge = x.useCallback((D, { deletedFetchers: ze, newErrors: Ue, flushSync: Ve, viewTransitionOpts: ve }) => {
      Ue && o && Object.values(Ue).forEach((xe) => {
        var _a;
        return o(xe, {
          location: D.location,
          params: ((_a = D.matches[0]) == null ? void 0 : _a.params) ?? {},
          unstable_pattern: Gu(D.matches)
        });
      }), D.fetchers.forEach((xe, ye) => {
        xe.data !== void 0 && k.current.set(ye, xe.data);
      }), ze.forEach((xe) => k.current.delete(xe)), _m(Ve === false || r != null, 'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.');
      let et = u.window != null && u.window.document != null && typeof u.window.document.startViewTransition == "function";
      if (_m(ve == null || et, "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."), !ve || !et) {
        r && Ve ? r(() => m(D)) : f === false ? m(D) : x.startTransition(() => {
          f === true && v((xe) => Cm(xe, D)), m(D);
        });
        return;
      }
      if (r && Ve) {
        r(() => {
          X && (H == null ? void 0 : H.resolve(), X.skipTransition()), A({
            isTransitioning: true,
            flushSync: true,
            currentLocation: ve.currentLocation,
            nextLocation: ve.nextLocation
          });
        });
        let xe = u.window.document.startViewTransition(() => {
          r(() => m(D));
        });
        xe.finished.finally(() => {
          r(() => {
            q(void 0), G(void 0), T(void 0), A({
              isTransitioning: false
            });
          });
        }), r(() => G(xe));
        return;
      }
      X ? (H == null ? void 0 : H.resolve(), X.skipTransition(), W({
        state: D,
        currentLocation: ve.currentLocation,
        nextLocation: ve.nextLocation
      })) : (T(D), A({
        isTransitioning: true,
        flushSync: false,
        currentLocation: ve.currentLocation,
        nextLocation: ve.nextLocation
      }));
    }, [
      u.window,
      r,
      X,
      H,
      f,
      v,
      o
    ]);
    x.useLayoutEffect(() => u.subscribe(ge), [
      u,
      ge
    ]), x.useEffect(() => {
      S.isTransitioning && !S.flushSync && q(new Ep());
    }, [
      S
    ]), x.useEffect(() => {
      if (H && y && u.window) {
        let D = y, ze = H.promise, Ue = u.window.document.startViewTransition(async () => {
          f === false ? m(D) : x.startTransition(() => {
            f === true && v((Ve) => Cm(Ve, D)), m(D);
          }), await ze;
        });
        Ue.finished.finally(() => {
          q(void 0), G(void 0), T(void 0), A({
            isTransitioning: false
          });
        }), G(Ue);
      }
    }, [
      y,
      H,
      u.window,
      f,
      v
    ]), x.useEffect(() => {
      H && y && g.location.key === y.location.key && H.resolve();
    }, [
      H,
      X,
      g.location,
      y
    ]), x.useEffect(() => {
      !S.isTransitioning && $ && (T($.state), A({
        isTransitioning: true,
        flushSync: false,
        currentLocation: $.currentLocation,
        nextLocation: $.nextLocation
      }), W(void 0));
    }, [
      S.isTransitioning,
      $
    ]);
    let me = x.useMemo(() => ({
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
    ]), oe = u.basename || "/", le = x.useMemo(() => ({
      router: u,
      navigator: me,
      static: false,
      basename: oe,
      onError: o
    }), [
      u,
      me,
      oe,
      o
    ]);
    return x.createElement(x.Fragment, null, x.createElement(Va.Provider, {
      value: le
    }, x.createElement(Xu.Provider, {
      value: g
    }, x.createElement(ry.Provider, {
      value: k.current
    }, x.createElement(ao.Provider, {
      value: S
    }, x.createElement(Mp, {
      basename: oe,
      location: g.location,
      navigationType: g.historyAction,
      navigator: me,
      unstable_useTransitions: f
    }, x.createElement(Rp, {
      routes: u.routes,
      future: u.future,
      state: g,
      isStatic: false,
      onError: o
    })))))), null);
  };
  function Cm(u, r) {
    return {
      ...u,
      navigation: r.navigation.state !== "idle" ? r.navigation : u.navigation,
      revalidation: r.revalidation !== "idle" ? r.revalidation : u.revalidation,
      actionData: r.navigation.state !== "submitting" ? r.actionData : u.actionData,
      fetchers: r.fetchers
    };
  }
  var Rp = x.memo(zp);
  function zp({ routes: u, future: r, state: o, isStatic: f, onError: s }) {
    return dy(u, void 0, {
      state: o,
      isStatic: f,
      onError: s
    });
  }
  Tp = function(u) {
    be(false, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
  };
  function Mp({ basename: u = "/", children: r = null, location: o, navigationType: f = "POP", navigator: s, static: d = false, unstable_useTransitions: m }) {
    be(!Vu(), "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
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
    let { pathname: y = "/", search: T = "", hash: S = "", state: A = null, key: H = "default", unstable_mask: q } = o, X = x.useMemo(() => {
      let G = jt(y, g);
      return G == null ? null : {
        location: {
          pathname: G,
          search: T,
          hash: S,
          state: A,
          key: H,
          unstable_mask: q
        },
        navigationType: f
      };
    }, [
      g,
      y,
      T,
      S,
      A,
      H,
      f,
      q
    ]);
    return nt(X != null, `<Router basename="${g}"> is not able to match the URL "${y}${T}${S}" because it does not start with the basename, so the <Router> won't render anything.`), X == null ? null : x.createElement(nl.Provider, {
      value: v
    }, x.createElement(Qu.Provider, {
      children: r,
      value: X
    }));
  }
  y1 = function({ children: u, location: r }) {
    return rp(Wc(u), r);
  };
  function Wc(u, r = []) {
    let o = [];
    return x.Children.forEach(u, (f, s) => {
      if (!x.isValidElement(f)) return;
      let d = [
        ...r,
        s
      ];
      if (f.type === x.Fragment) {
        o.push.apply(o, Wc(f.props.children, d));
        return;
      }
      be(f.type === Tp, `[${typeof f.type == "string" ? f.type : f.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`), be(!f.props.index || !f.props.children, "An index route cannot have child routes.");
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
      f.props.children && (m.children = Wc(f.props.children, d)), o.push(m);
    }), o;
  }
  var mr = "get", yr = "application/x-www-form-urlencoded";
  function pr(u) {
    return typeof HTMLElement < "u" && u instanceof HTMLElement;
  }
  function Dp(u) {
    return pr(u) && u.tagName.toLowerCase() === "button";
  }
  function Ap(u) {
    return pr(u) && u.tagName.toLowerCase() === "form";
  }
  function _p(u) {
    return pr(u) && u.tagName.toLowerCase() === "input";
  }
  function Op(u) {
    return !!(u.metaKey || u.altKey || u.ctrlKey || u.shiftKey);
  }
  function Cp(u, r) {
    return u.button === 0 && (!r || r === "_self") && !Op(u);
  }
  function kc(u = "") {
    return new URLSearchParams(typeof u == "string" || Array.isArray(u) || u instanceof URLSearchParams ? u : Object.keys(u).reduce((r, o) => {
      let f = u[o];
      return r.concat(Array.isArray(f) ? f.map((s) => [
        o,
        s
      ]) : [
        [
          o,
          f
        ]
      ]);
    }, []));
  }
  function Up(u, r) {
    let o = kc(u);
    return r && r.forEach((f, s) => {
      o.has(s) || r.getAll(s).forEach((d) => {
        o.append(s, d);
      });
    }), o;
  }
  var dr = null;
  function xp() {
    if (dr === null) try {
      new FormData(document.createElement("form"), 0), dr = false;
    } catch {
      dr = true;
    }
    return dr;
  }
  var Np = /* @__PURE__ */ new Set([
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  ]);
  function Xc(u) {
    return u != null && !Np.has(u) ? (nt(false, `"${u}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${yr}"`), null) : u;
  }
  function Hp(u, r) {
    let o, f, s, d, m;
    if (Ap(u)) {
      let g = u.getAttribute("action");
      f = g ? jt(g, r) : null, o = u.getAttribute("method") || mr, s = Xc(u.getAttribute("enctype")) || yr, d = new FormData(u);
    } else if (Dp(u) || _p(u) && (u.type === "submit" || u.type === "image")) {
      let g = u.form;
      if (g == null) throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
      let v = u.getAttribute("formaction") || g.getAttribute("action");
      if (f = v ? jt(v, r) : null, o = u.getAttribute("formmethod") || g.getAttribute("method") || mr, s = Xc(u.getAttribute("formenctype")) || Xc(g.getAttribute("enctype")) || yr, d = new FormData(g, u), !xp()) {
        let { name: y, type: T, value: S } = u;
        if (T === "image") {
          let A = y ? `${y}.` : "";
          d.append(`${A}x`, "0"), d.append(`${A}y`, "0");
        } else y && d.append(y, S);
      }
    } else {
      if (pr(u)) throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
      o = mr, f = null, s = yr, m = u;
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
  function ro(u, r) {
    if (u === false || u === null || typeof u > "u") throw new Error(r);
  }
  function Lp(u, r, o, f) {
    let s = typeof u == "string" ? new URL(u, typeof window > "u" ? "server://singlefetch/" : window.location.origin) : u;
    return o ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${f}` : s.pathname = `${s.pathname}.${f}` : s.pathname === "/" ? s.pathname = `_root.${f}` : r && jt(s.pathname, r) === "/" ? s.pathname = `${r.replace(/\/$/, "")}/_root.${f}` : s.pathname = `${s.pathname.replace(/\/$/, "")}.${f}`, s;
  }
  async function wp(u, r) {
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
  function Bp(u) {
    return u == null ? false : u.href == null ? u.rel === "preload" && typeof u.imageSrcSet == "string" && typeof u.imageSizes == "string" : typeof u.rel == "string" && typeof u.href == "string";
  }
  async function jp(u, r, o) {
    let f = await Promise.all(u.map(async (s) => {
      let d = r.routes[s.route.id];
      if (d) {
        let m = await wp(d, o);
        return m.links ? m.links() : [];
      }
      return [];
    }));
    return Xp(f.flat(1).filter(Bp).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map((s) => s.rel === "stylesheet" ? {
      ...s,
      rel: "prefetch",
      as: "style"
    } : {
      ...s,
      rel: "prefetch"
    }));
  }
  function Um(u, r, o, f, s, d) {
    let m = (v, y) => o[y] ? v.route.id !== o[y].route.id : true, g = (v, y) => {
      var _a;
      return o[y].pathname !== v.pathname || ((_a = o[y].route.path) == null ? void 0 : _a.endsWith("*")) && o[y].params["*"] !== v.params["*"];
    };
    return d === "assets" ? r.filter((v, y) => m(v, y) || g(v, y)) : d === "data" ? r.filter((v, y) => {
      var _a;
      let T = f.routes[v.route.id];
      if (!T || !T.hasLoader) return false;
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
  function Yp(u, r, { includeHydrateFallback: o } = {}) {
    return qp(u.map((f) => {
      let s = r.routes[f.route.id];
      if (!s) return [];
      let d = [
        s.module
      ];
      return s.clientActionModule && (d = d.concat(s.clientActionModule)), s.clientLoaderModule && (d = d.concat(s.clientLoaderModule)), o && s.hydrateFallbackModule && (d = d.concat(s.hydrateFallbackModule)), s.imports && (d = d.concat(s.imports)), d;
    }).flat(1));
  }
  function qp(u) {
    return [
      ...new Set(u)
    ];
  }
  function Gp(u) {
    let r = {}, o = Object.keys(u).sort();
    for (let f of o) r[f] = u[f];
    return r;
  }
  function Xp(u, r) {
    let o = /* @__PURE__ */ new Set();
    return new Set(r), u.reduce((f, s) => {
      let d = JSON.stringify(Gp(s));
      return o.has(d) || (o.add(d), f.push({
        key: d,
        link: s
      })), f;
    }, []);
  }
  function Sy() {
    let u = x.useContext(Va);
    return ro(u, "You must render this element inside a <DataRouterContext.Provider> element"), u;
  }
  function Qp() {
    let u = x.useContext(Xu);
    return ro(u, "You must render this element inside a <DataRouterStateContext.Provider> element"), u;
  }
  var fo = x.createContext(void 0);
  fo.displayName = "FrameworkContext";
  function by() {
    let u = x.useContext(fo);
    return ro(u, "You must render this element inside a <HydratedRouter> element"), u;
  }
  function Vp(u, r) {
    let o = x.useContext(fo), [f, s] = x.useState(false), [d, m] = x.useState(false), { onFocus: g, onBlur: v, onMouseEnter: y, onMouseLeave: T, onTouchStart: S } = r, A = x.useRef(null);
    x.useEffect(() => {
      if (u === "render" && m(true), u === "viewport") {
        let X = ($) => {
          $.forEach((W) => {
            m(W.isIntersecting);
          });
        }, G = new IntersectionObserver(X, {
          threshold: 0.5
        });
        return A.current && G.observe(A.current), () => {
          G.disconnect();
        };
      }
    }, [
      u
    ]), x.useEffect(() => {
      if (f) {
        let X = setTimeout(() => {
          m(true);
        }, 100);
        return () => {
          clearTimeout(X);
        };
      }
    }, [
      f
    ]);
    let H = () => {
      s(true);
    }, q = () => {
      s(false), m(false);
    };
    return o ? u !== "intent" ? [
      d,
      A,
      {}
    ] : [
      d,
      A,
      {
        onFocus: Nu(g, H),
        onBlur: Nu(v, q),
        onMouseEnter: Nu(y, H),
        onMouseLeave: Nu(T, q),
        onTouchStart: Nu(S, H)
      }
    ] : [
      false,
      A,
      {}
    ];
  }
  function Nu(u, r) {
    return (o) => {
      u && u(o), o.defaultPrevented || r(o);
    };
  }
  function Zp({ page: u, ...r }) {
    let { router: o } = Sy(), f = x.useMemo(() => Sa(o.routes, u, o.basename), [
      o.routes,
      u,
      o.basename
    ]);
    return f ? x.createElement(Jp, {
      page: u,
      matches: f,
      ...r
    }) : null;
  }
  function Kp(u) {
    let { manifest: r, routeModules: o } = by(), [f, s] = x.useState([]);
    return x.useEffect(() => {
      let d = false;
      return jp(u, r, o).then((m) => {
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
  function Jp({ page: u, matches: r, ...o }) {
    let f = Vl(), { future: s, manifest: d, routeModules: m } = by(), { basename: g } = Sy(), { loaderData: v, matches: y } = Qp(), T = x.useMemo(() => Um(u, r, y, d, f, "data"), [
      u,
      r,
      y,
      d,
      f
    ]), S = x.useMemo(() => Um(u, r, y, d, f, "assets"), [
      u,
      r,
      y,
      d,
      f
    ]), A = x.useMemo(() => {
      if (u === f.pathname + f.search + f.hash) return [];
      let X = /* @__PURE__ */ new Set(), G = false;
      if (r.forEach((W) => {
        var _a;
        let k = d.routes[W.route.id];
        !k || !k.hasLoader || (!T.some((ge) => ge.route.id === W.route.id) && W.route.id in v && ((_a = m[W.route.id]) == null ? void 0 : _a.shouldRevalidate) || k.hasClientLoader ? G = true : X.add(W.route.id));
      }), X.size === 0) return [];
      let $ = Lp(u, g, s.unstable_trailingSlashAwareDataRequests, "data");
      return G && X.size > 0 && $.searchParams.set("_routes", r.filter((W) => X.has(W.route.id)).map((W) => W.route.id).join(",")), [
        $.pathname + $.search
      ];
    }, [
      g,
      s.unstable_trailingSlashAwareDataRequests,
      v,
      f,
      d,
      T,
      r,
      u,
      m
    ]), H = x.useMemo(() => Yp(S, d), [
      S,
      d
    ]), q = Kp(S);
    return x.createElement(x.Fragment, null, A.map((X) => x.createElement("link", {
      key: X,
      rel: "prefetch",
      as: "fetch",
      href: X,
      ...o
    })), H.map((X) => x.createElement("link", {
      key: X,
      rel: "modulepreload",
      href: X,
      ...o
    })), q.map(({ key: X, link: G }) => x.createElement("link", {
      key: X,
      nonce: o.nonce,
      ...G,
      crossOrigin: G.crossOrigin ?? o.crossOrigin
    })));
  }
  function Fp(...u) {
    return (r) => {
      u.forEach((o) => {
        typeof o == "function" ? o(r) : o != null && (o.current = r);
      });
    };
  }
  var $p = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
  try {
    $p && (window.__reactRouterVersion = "7.13.1");
  } catch {
  }
  v1 = function(u, r) {
    return Pm({
      basename: r == null ? void 0 : r.basename,
      getContext: r == null ? void 0 : r.getContext,
      future: r == null ? void 0 : r.future,
      history: Z0({
        window: r == null ? void 0 : r.window
      }),
      hydrationData: (r == null ? void 0 : r.hydrationData) || Ey(),
      routes: u,
      mapRouteProperties: gy,
      hydrationRouteProperties: py,
      dataStrategy: r == null ? void 0 : r.dataStrategy,
      patchRoutesOnNavigation: r == null ? void 0 : r.patchRoutesOnNavigation,
      window: r == null ? void 0 : r.window,
      unstable_instrumentations: r == null ? void 0 : r.unstable_instrumentations
    }).initialize();
  };
  g1 = function(u, r) {
    return Pm({
      basename: r == null ? void 0 : r.basename,
      getContext: r == null ? void 0 : r.getContext,
      future: r == null ? void 0 : r.future,
      history: K0({
        window: r == null ? void 0 : r.window
      }),
      hydrationData: (r == null ? void 0 : r.hydrationData) || Ey(),
      routes: u,
      mapRouteProperties: gy,
      hydrationRouteProperties: py,
      dataStrategy: r == null ? void 0 : r.dataStrategy,
      patchRoutesOnNavigation: r == null ? void 0 : r.patchRoutesOnNavigation,
      window: r == null ? void 0 : r.window,
      unstable_instrumentations: r == null ? void 0 : r.unstable_instrumentations
    }).initialize();
  };
  function Ey() {
    let u = window == null ? void 0 : window.__staticRouterHydrationData;
    return u && u.errors && (u = {
      ...u,
      errors: Wp(u.errors)
    }), u;
  }
  function Wp(u) {
    if (!u) return null;
    let r = Object.entries(u), o = {};
    for (let [f, s] of r) if (s && s.__type === "RouteErrorResponse") o[f] = new qu(s.status, s.statusText, s.data, s.internal === true);
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
  let Ry;
  Ry = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
  zy = x.forwardRef(function({ onClick: r, discover: o = "render", prefetch: f = "none", relative: s, reloadDocument: d, replace: m, unstable_mask: g, state: v, target: y, to: T, preventScrollReset: S, viewTransition: A, unstable_defaultShouldRevalidate: H, ...q }, X) {
    let { basename: G, navigator: $, unstable_useTransitions: W } = x.useContext(nl), k = typeof T == "string" && Ry.test(T), ge = Km(T, G);
    T = ge.to;
    let me = up(T, {
      relative: s
    }), oe = Vl(), le = null;
    if (g) {
      let ye = gr(g, [], oe.unstable_mask ? oe.unstable_mask.pathname : "/", true);
      G !== "/" && (ye.pathname = ye.pathname === "/" ? G : sl([
        G,
        ye.pathname
      ])), le = $.createHref(ye);
    }
    let [D, ze, Ue] = Vp(f, q), Ve = e1(T, {
      replace: m,
      unstable_mask: g,
      state: v,
      target: y,
      preventScrollReset: S,
      relative: s,
      viewTransition: A,
      unstable_defaultShouldRevalidate: H,
      unstable_useTransitions: W
    });
    function ve(ye) {
      r && r(ye), ye.defaultPrevented || Ve(ye);
    }
    let et = !(ge.isExternal || d), xe = x.createElement("a", {
      ...q,
      ...Ue,
      href: (et ? le : void 0) || ge.absoluteURL || me,
      onClick: et ? ve : r,
      ref: Fp(X, ze),
      target: y,
      "data-discover": !k && o === "render" ? "true" : void 0
    });
    return D && !k ? x.createElement(x.Fragment, null, xe, x.createElement(Zp, {
      page: me
    })) : xe;
  });
  zy.displayName = "Link";
  var kp = x.forwardRef(function({ "aria-current": r = "page", caseSensitive: o = false, className: f = "", end: s = false, style: d, to: m, viewTransition: g, children: v, ...y }, T) {
    let S = Zu(m, {
      relative: y.relative
    }), A = Vl(), H = x.useContext(Xu), { navigator: q, basename: X } = x.useContext(nl), G = H != null && u1(S) && g === true, $ = q.encodeLocation ? q.encodeLocation(S).pathname : S.pathname, W = A.pathname, k = H && H.navigation && H.navigation.location ? H.navigation.location.pathname : null;
    o || (W = W.toLowerCase(), k = k ? k.toLowerCase() : null, $ = $.toLowerCase()), k && X && (k = jt(k, X) || k);
    const ge = $ !== "/" && $.endsWith("/") ? $.length - 1 : $.length;
    let me = W === $ || !s && W.startsWith($) && W.charAt(ge) === "/", oe = k != null && (k === $ || !s && k.startsWith($) && k.charAt($.length) === "/"), le = {
      isActive: me,
      isPending: oe,
      isTransitioning: G
    }, D = me ? r : void 0, ze;
    typeof f == "function" ? ze = f(le) : ze = [
      f,
      me ? "active" : null,
      oe ? "pending" : null,
      G ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let Ue = typeof d == "function" ? d(le) : d;
    return x.createElement(zy, {
      ...y,
      "aria-current": D,
      className: ze,
      ref: T,
      style: Ue,
      to: m,
      viewTransition: g
    }, typeof v == "function" ? v(le) : v);
  });
  kp.displayName = "NavLink";
  var Pp = x.forwardRef(({ discover: u = "render", fetcherKey: r, navigate: o, reloadDocument: f, replace: s, state: d, method: m = mr, action: g, onSubmit: v, relative: y, preventScrollReset: T, viewTransition: S, unstable_defaultShouldRevalidate: A, ...H }, q) => {
    let { unstable_useTransitions: X } = x.useContext(nl), G = a1(), $ = n1(g, {
      relative: y
    }), W = m.toLowerCase() === "get" ? "get" : "post", k = typeof g == "string" && Ry.test(g), ge = (me) => {
      if (v && v(me), me.defaultPrevented) return;
      me.preventDefault();
      let oe = me.nativeEvent.submitter, le = (oe == null ? void 0 : oe.getAttribute("formmethod")) || m, D = () => G(oe || me.currentTarget, {
        fetcherKey: r,
        method: le,
        navigate: o,
        replace: s,
        state: d,
        relative: y,
        preventScrollReset: T,
        viewTransition: S,
        unstable_defaultShouldRevalidate: A
      });
      X && o !== false ? x.startTransition(() => D()) : D();
    };
    return x.createElement("form", {
      ref: q,
      method: W,
      action: $,
      onSubmit: f ? v : ge,
      ...H,
      "data-discover": !k && u === "render" ? "true" : void 0
    });
  });
  Pp.displayName = "Form";
  function Ip(u) {
    return `${u} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
  }
  function Ty(u) {
    let r = x.useContext(Va);
    return be(r, Ip(u)), r;
  }
  function e1(u, { target: r, replace: o, unstable_mask: f, state: s, preventScrollReset: d, relative: m, viewTransition: g, unstable_defaultShouldRevalidate: v, unstable_useTransitions: y } = {}) {
    let T = sy(), S = Vl(), A = Zu(u, {
      relative: m
    });
    return x.useCallback((H) => {
      if (Cp(H, r)) {
        H.preventDefault();
        let q = o !== void 0 ? o : dl(S) === dl(A), X = () => T(u, {
          replace: q,
          unstable_mask: f,
          state: s,
          preventScrollReset: d,
          relative: m,
          viewTransition: g,
          unstable_defaultShouldRevalidate: v
        });
        y ? x.startTransition(() => X()) : X();
      }
    }, [
      S,
      T,
      A,
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
  p1 = function(u) {
    nt(typeof URLSearchParams < "u", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");
    let r = x.useRef(kc(u)), o = x.useRef(false), f = Vl(), s = x.useMemo(() => Up(f.search, o.current ? null : r.current), [
      f.search
    ]), d = sy(), m = x.useCallback((g, v) => {
      const y = kc(typeof g == "function" ? g(new URLSearchParams(s)) : g);
      o.current = true, d("?" + y, v);
    }, [
      d,
      s
    ]);
    return [
      s,
      m
    ];
  };
  var t1 = 0, l1 = () => `__${String(++t1)}__`;
  function a1() {
    let { router: u } = Ty("useSubmit"), { basename: r } = x.useContext(nl), o = mp(), f = u.fetch, s = u.navigate;
    return x.useCallback(async (d, m = {}) => {
      let { action: g, method: v, encType: y, formData: T, body: S } = Hp(d, r);
      if (m.navigate === false) {
        let A = m.fetcherKey || l1();
        await f(A, o, m.action || g, {
          unstable_defaultShouldRevalidate: m.unstable_defaultShouldRevalidate,
          preventScrollReset: m.preventScrollReset,
          formData: T,
          body: S,
          formMethod: m.method || v,
          formEncType: m.encType || y,
          flushSync: m.flushSync
        });
      } else await s(m.action || g, {
        unstable_defaultShouldRevalidate: m.unstable_defaultShouldRevalidate,
        preventScrollReset: m.preventScrollReset,
        formData: T,
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
  function n1(u, { relative: r } = {}) {
    let { basename: o } = x.useContext(nl), f = x.useContext(Ql);
    be(f, "useFormAction must be used inside a RouteContext");
    let [s] = f.matches.slice(-1), d = {
      ...Zu(u || ".", {
        relative: r
      })
    }, m = Vl();
    if (u == null) {
      d.search = m.search;
      let g = new URLSearchParams(d.search), v = g.getAll("index");
      if (v.some((T) => T === "")) {
        g.delete("index"), v.filter((S) => S).forEach((S) => g.append("index", S));
        let T = g.toString();
        d.search = T ? `?${T}` : "";
      }
    }
    return (!u || u === ".") && s.route.index && (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"), o !== "/" && (d.pathname = d.pathname === "/" ? o : sl([
      o,
      d.pathname
    ])), dl(d);
  }
  function u1(u, { relative: r } = {}) {
    let o = x.useContext(ao);
    be(o != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
    let { basename: f } = Ty("useViewTransitionState"), s = Zu(u, {
      relative: r
    });
    if (!o.isTransitioning) return false;
    let d = jt(o.currentLocation.pathname, f) || o.currentLocation.pathname, m = jt(o.nextLocation.pathname, f) || o.nextLocation.pathname;
    return vr(s.pathname, m) != null || vr(s.pathname, d) != null;
  }
  i1 = Bm();
  S1 = wm(i1);
  var Qc = {
    exports: {}
  }, Vc = {};
  var xm;
  function r1() {
    if (xm) return Vc;
    xm = 1;
    var u = Yu();
    function r(S, A) {
      return S === A && (S !== 0 || 1 / S === 1 / A) || S !== S && A !== A;
    }
    var o = typeof Object.is == "function" ? Object.is : r, f = u.useState, s = u.useEffect, d = u.useLayoutEffect, m = u.useDebugValue;
    function g(S, A) {
      var H = A(), q = f({
        inst: {
          value: H,
          getSnapshot: A
        }
      }), X = q[0].inst, G = q[1];
      return d(function() {
        X.value = H, X.getSnapshot = A, v(X) && G({
          inst: X
        });
      }, [
        S,
        H,
        A
      ]), s(function() {
        return v(X) && G({
          inst: X
        }), S(function() {
          v(X) && G({
            inst: X
          });
        });
      }, [
        S
      ]), m(H), H;
    }
    function v(S) {
      var A = S.getSnapshot;
      S = S.value;
      try {
        var H = A();
        return !o(S, H);
      } catch {
        return true;
      }
    }
    function y(S, A) {
      return A();
    }
    var T = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? y : g;
    return Vc.useSyncExternalStore = u.useSyncExternalStore !== void 0 ? u.useSyncExternalStore : T, Vc;
  }
  var Nm;
  function My() {
    return Nm || (Nm = 1, Qc.exports = r1()), Qc.exports;
  }
  let Zc, Kc;
  b1 = My();
  Zc = {
    exports: {}
  };
  Kc = {};
  var Hm;
  function f1() {
    if (Hm) return Kc;
    Hm = 1;
    var u = Yu(), r = My();
    function o(y, T) {
      return y === T && (y !== 0 || 1 / y === 1 / T) || y !== y && T !== T;
    }
    var f = typeof Object.is == "function" ? Object.is : o, s = r.useSyncExternalStore, d = u.useRef, m = u.useEffect, g = u.useMemo, v = u.useDebugValue;
    return Kc.useSyncExternalStoreWithSelector = function(y, T, S, A, H) {
      var q = d(null);
      if (q.current === null) {
        var X = {
          hasValue: false,
          value: null
        };
        q.current = X;
      } else X = q.current;
      q = g(function() {
        function $(oe) {
          if (!W) {
            if (W = true, k = oe, oe = A(oe), H !== void 0 && X.hasValue) {
              var le = X.value;
              if (H(le, oe)) return ge = le;
            }
            return ge = oe;
          }
          if (le = ge, f(k, oe)) return le;
          var D = A(oe);
          return H !== void 0 && H(le, D) ? (k = oe, le) : (k = oe, ge = D);
        }
        var W = false, k, ge, me = S === void 0 ? null : S;
        return [
          function() {
            return $(T());
          },
          me === null ? void 0 : function() {
            return $(me());
          }
        ];
      }, [
        T,
        S,
        A,
        H
      ]);
      var G = s(y, q[0], q[1]);
      return m(function() {
        X.hasValue = true, X.value = G;
      }, [
        G
      ]), v(G), G;
    }, Kc;
  }
  var Lm;
  function c1() {
    return Lm || (Lm = 1, Zc.exports = f1()), Zc.exports;
  }
  E1 = c1();
})();
export {
  zy as L,
  w0 as R,
  __tla,
  B0 as a,
  i1 as b,
  d1 as c,
  S1 as d,
  o1 as e,
  p1 as f,
  wm as g,
  Vl as h,
  h1 as i,
  s1 as j,
  y1 as k,
  Tp as l,
  ju as m,
  yp as n,
  g1 as o,
  v1 as p,
  m1 as q,
  x as r,
  b1 as s,
  sy as u,
  E1 as w
};
