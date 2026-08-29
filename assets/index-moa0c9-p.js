import { $ as f, r as s } from "./vendor-react-BFxggocB.js";
function k() {
  return (k = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }).apply(this, arguments);
}
function R(e, t) {
  if (e == null) return {};
  var n, r, a = {}, o = Object.keys(e);
  for (r = 0; r < o.length; r++) t.indexOf(n = o[r]) >= 0 || (a[n] = e[n]);
  return a;
}
function x(e) {
  var t = s.useRef(e), n = s.useRef(function(r) {
    t.current && t.current(r);
  });
  return t.current = e, n.current;
}
var y = function(e, t, n) {
  return t === void 0 && (t = 0), n === void 0 && (n = 1), e > n ? n : e < t ? t : e;
}, N = function(e) {
  return "touches" in e;
}, j = function(e) {
  return e && e.ownerDocument.defaultView || self;
}, q = function(e, t, n) {
  var r = e.getBoundingClientRect(), a = N(t) ? (function(o, u) {
    for (var c = 0; c < o.length; c++) if (o[c].identifier === u) return o[c];
    return o[0];
  })(t.touches, n) : t;
  return { left: y((a.pageX - (r.left + j(e).pageXOffset)) / r.width), top: y((a.pageY - (r.top + j(e).pageYOffset)) / r.height) };
}, $ = function(e) {
  !N(e) && e.preventDefault();
}, L = f.memo(function(e) {
  var t = e.onMove, n = e.onKey, r = e.onEnd, a = R(e, ["onMove", "onKey", "onEnd"]), o = s.useRef(null), u = x(t), c = x(n), l = x(r), i = s.useRef(null), v = s.useRef(false), m = s.useMemo(function() {
    var D = function(p) {
      $(p), (N(p) ? p.touches.length > 0 : p.buttons > 0) && o.current ? u(q(o.current, p, i.current)) : (b(false), l());
    }, w = function() {
      b(false), l();
    };
    function b(p) {
      var h = v.current, E = j(o.current), M = p ? E.addEventListener : E.removeEventListener;
      M(h ? "touchmove" : "mousemove", D), M(h ? "touchend" : "mouseup", w);
    }
    return [function(p) {
      var h = p.nativeEvent, E = o.current;
      if (E && ($(h), !(function(P, U) {
        return U && !N(P);
      })(h, v.current) && E)) {
        if (N(h)) {
          v.current = true;
          var M = h.changedTouches || [];
          M.length && (i.current = M[0].identifier);
        }
        E.focus(), u(q(E, h, i.current)), b(true);
      }
    }, function(p) {
      var h = p.which || p.keyCode;
      h < 37 || h > 40 || (p.preventDefault(), c({ left: h === 39 ? 0.05 : h === 37 ? -0.05 : 0, top: h === 40 ? 0.05 : h === 38 ? -0.05 : 0 }));
    }, function(p) {
      var h = p.which || p.keyCode;
      h >= 37 && h <= 40 && l();
    }, b];
  }, [c, u, l]), _ = m[0], g = m[1], C = m[2], I = m[3];
  return s.useEffect(function() {
    return I;
  }, [I]), f.createElement("div", k({}, a, { onTouchStart: _, onMouseDown: _, className: "react-colorful__interactive", ref: o, onKeyDown: g, onKeyUp: C, tabIndex: 0, role: "slider" }));
}), H = function(e) {
  return e.filter(Boolean).join(" ");
}, S = function(e) {
  var t = e.color, n = e.left, r = e.top, a = r === void 0 ? 0.5 : r, o = H(["react-colorful__pointer", e.className]);
  return f.createElement("div", { className: o, style: { top: 100 * a + "%", left: 100 * n + "%" } }, f.createElement("div", { className: "react-colorful__pointer-fill", style: { backgroundColor: t } }));
}, d = function(e, t, n) {
  return t === void 0 && (t = 0), n === void 0 && (n = Math.pow(10, t)), Math.round(n * e) / n;
}, V = function(e) {
  return J(z(e));
}, z = function(e) {
  return e[0] === "#" && (e = e.substring(1)), e.length < 6 ? { r: parseInt(e[0] + e[0], 16), g: parseInt(e[1] + e[1], 16), b: parseInt(e[2] + e[2], 16), a: e.length === 4 ? d(parseInt(e[3] + e[3], 16) / 255, 2) : 1 } : { r: parseInt(e.substring(0, 2), 16), g: parseInt(e.substring(2, 4), 16), b: parseInt(e.substring(4, 6), 16), a: e.length === 8 ? d(parseInt(e.substring(6, 8), 16) / 255, 2) : 1 };
}, Y = function(e) {
  return W(G(e));
}, X = function(e) {
  var t = e.s, n = e.v, r = e.a, a = (200 - t) * n / 100;
  return { h: d(e.h), s: d(a > 0 && a < 200 ? t * n / 100 / (a <= 100 ? a : 200 - a) * 100 : 0), l: d(a / 2), a: d(r, 2) };
}, B = function(e) {
  var t = X(e);
  return "hsl(" + t.h + ", " + t.s + "%, " + t.l + "%)";
}, K = function(e) {
  var t = X(e);
  return "hsla(" + t.h + ", " + t.s + "%, " + t.l + "%, " + t.a + ")";
}, G = function(e) {
  var t = e.h, n = e.s, r = e.v, a = e.a;
  t = t / 360 * 6, n /= 100, r /= 100;
  var o = Math.floor(t), u = r * (1 - n), c = r * (1 - (t - o) * n), l = r * (1 - (1 - t + o) * n), i = o % 6;
  return { r: d(255 * [r, c, u, u, l, r][i]), g: d(255 * [l, r, r, c, u, u][i]), b: d(255 * [u, u, l, r, r, c][i]), a: d(a, 2) };
}, O = function(e) {
  var t = e.toString(16);
  return t.length < 2 ? "0" + t : t;
}, W = function(e) {
  var t = e.r, n = e.g, r = e.b, a = e.a, o = a < 1 ? O(d(255 * a)) : "";
  return "#" + O(t) + O(n) + O(r) + o;
}, J = function(e) {
  var t = e.r, n = e.g, r = e.b, a = e.a, o = Math.max(t, n, r), u = o - Math.min(t, n, r), c = u ? o === t ? (n - r) / u : o === n ? 2 + (r - t) / u : 4 + (t - n) / u : 0;
  return { h: d(60 * (c < 0 ? c + 6 : c)), s: d(o ? u / o * 100 : 0), v: d(o / 255 * 100), a };
}, Q = f.memo(function(e) {
  var t = e.hue, n = e.onChange, r = e.onChangeEnd, a = H(["react-colorful__hue", e.className]);
  return f.createElement("div", { className: a }, f.createElement(L, { onMove: function(o) {
    n({ h: 360 * o.left });
  }, onKey: function(o) {
    n({ h: y(t + 360 * o.left, 0, 360) });
  }, onEnd: r, "aria-label": "Hue", "aria-valuenow": d(t), "aria-valuemax": "360", "aria-valuemin": "0" }, f.createElement(S, { className: "react-colorful__hue-pointer", left: t / 360, color: B({ h: t, s: 100, v: 100, a: 1 }) })));
}), Z = f.memo(function(e) {
  var t = e.hsva, n = e.onChange, r = e.onChangeEnd, a = { backgroundColor: B({ h: t.h, s: 100, v: 100, a: 1 }) };
  return f.createElement("div", { className: "react-colorful__saturation", style: a }, f.createElement(L, { onMove: function(o) {
    n({ s: 100 * o.left, v: 100 - 100 * o.top });
  }, onKey: function(o) {
    n({ s: y(t.s + 100 * o.left, 0, 100), v: y(t.v - 100 * o.top, 0, 100) });
  }, onEnd: r, "aria-label": "Color", "aria-valuetext": "Saturation " + d(t.s) + "%, Brightness " + d(t.v) + "%" }, f.createElement(S, { className: "react-colorful__saturation-pointer", top: 1 - t.v / 100, left: t.s / 100, color: B(t) })));
}), F = function(e, t) {
  if (e === t) return true;
  for (var n in e) if (e[n] !== t[n]) return false;
  return true;
}, ee = function(e, t) {
  return e.toLowerCase() === t.toLowerCase() || F(z(e), z(t));
};
function te(e, t, n, r) {
  var a = x(n), o = x(r), u = s.useState(function() {
    return e.toHsva(t);
  }), c = u[0], l = u[1], i = s.useRef({ color: t, hsva: c }), v = s.useRef(false);
  s.useEffect(function() {
    if (!e.equal(t, i.current.color)) {
      var g = e.toHsva(t);
      i.current = { hsva: g, color: t }, l(g), v.current = false;
    }
  }, [t, e]), s.useEffect(function() {
    var g;
    F(c, i.current.hsva) || e.equal(g = e.fromHsva(c), i.current.color) || (i.current = { hsva: c, color: g }, a(g), v.current = true);
  }, [c, e, a]);
  var m = s.useCallback(function(g) {
    l(function(C) {
      return Object.assign({}, C, g);
    });
  }, []), _ = s.useCallback(function() {
    v.current && (v.current = false, o(i.current.color));
  }, [o]);
  return [c, m, _];
}
var ne = typeof window < "u" ? s.useLayoutEffect : s.useEffect, re = function() {
  return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : void 0;
}, A = /* @__PURE__ */ new WeakMap(), oe = function(e) {
  ne(function() {
    var t = e.current;
    if (typeof document < "u" && t) {
      var n = t.getRootNode ? t.getRootNode() : t.ownerDocument, r = n && ("head" in n || "host" in n) ? n : t.ownerDocument;
      if (!A.has(r)) {
        var a = "head" in r ? r.head : r, o = (a.ownerDocument || document).createElement("style");
        o.innerHTML = `.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}`;
        var u = re();
        u && o.setAttribute("nonce", u), A.set(r, o), a.appendChild(o);
      }
    }
  }, []);
}, ae = function(e) {
  var t = e.className, n = e.hsva, r = e.onChange, a = e.onChangeEnd, o = { backgroundImage: "linear-gradient(90deg, " + K(Object.assign({}, n, { a: 0 })) + ", " + K(Object.assign({}, n, { a: 1 })) + ")" }, u = H(["react-colorful__alpha", t]), c = d(100 * n.a);
  return f.createElement("div", { className: u }, f.createElement("div", { className: "react-colorful__alpha-gradient", style: o }), f.createElement(L, { onMove: function(l) {
    r({ a: l.left });
  }, onKey: function(l) {
    r({ a: y(n.a + l.left) });
  }, onEnd: a, "aria-label": "Alpha", "aria-valuetext": c + "%", "aria-valuenow": c, "aria-valuemin": "0", "aria-valuemax": "100" }, f.createElement(S, { className: "react-colorful__alpha-pointer", left: n.a, color: K(n) })));
}, ue = function(e) {
  var t = e.className, n = e.colorModel, r = e.color, a = r === void 0 ? n.defaultColor : r, o = e.onChange, u = e.onChangeEnd, c = R(e, ["className", "colorModel", "color", "onChange", "onChangeEnd"]), l = s.useRef(null);
  oe(l);
  var i = te(n, a, o, u), v = i[0], m = i[1], _ = i[2], g = H(["react-colorful", t]);
  return f.createElement("div", k({}, c, { ref: l, className: g }), f.createElement(Z, { hsva: v, onChange: m, onChangeEnd: _ }), f.createElement(Q, { hue: v.h, onChange: m, onChangeEnd: _ }), f.createElement(ae, { hsva: v, onChange: m, onChangeEnd: _, className: "react-colorful__last-control" }));
}, ce = { defaultColor: "0001", toHsva: V, fromHsva: Y, equal: ee }, fe = function(e) {
  return f.createElement(ue, k({}, e, { colorModel: ce }));
}, le = /^#?([0-9A-F]{3,8})$/i, ie = function(e) {
  var t = e.color, n = t === void 0 ? "" : t, r = e.onChange, a = e.onBlur, o = e.escape, u = e.validate, c = e.format, l = e.process, i = R(e, ["color", "onChange", "onBlur", "escape", "validate", "format", "process"]), v = s.useState(function() {
    return o(n);
  }), m = v[0], _ = v[1], g = x(r), C = x(a), I = s.useCallback(function(w) {
    var b = o(w.target.value);
    _(b), u(b) && g(l ? l(b) : b);
  }, [o, l, u, g]), D = s.useCallback(function(w) {
    u(w.target.value) || _(o(n)), C(w);
  }, [n, o, u, C]);
  return s.useEffect(function() {
    _(o(n));
  }, [n, o]), f.createElement("input", k({}, i, { value: c ? c(m) : m, spellCheck: "false", onChange: I, onBlur: D }));
}, T = function(e) {
  return "#" + e;
}, ve = function(e) {
  var t = e.prefixed, n = e.alpha, r = R(e, ["prefixed", "alpha"]), a = s.useCallback(function(u) {
    return u.replace(/([^0-9A-F]+)/gi, "").substring(0, n ? 8 : 6);
  }, [n]), o = s.useCallback(function(u) {
    return (function(c, l) {
      var i = le.exec(c), v = i ? i[1].length : 0;
      return v === 3 || v === 6 || !!l && v === 4 || !!l && v === 8;
    })(u, n);
  }, [n]);
  return f.createElement(ie, k({}, r, { escape: a, format: t ? T : void 0, process: T, validate: o }));
};
export {
  ve as O,
  fe as t
};
