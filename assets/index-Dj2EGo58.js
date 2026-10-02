import { R as s, r as f } from "./vendor-react-BLJzfvPB.js";
function E() {
  return (E = Object.assign || function(e) {
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
  var t = f.useRef(e), n = f.useRef(function(r) {
    t.current && t.current(r);
  });
  return t.current = e, n.current;
}
var k = function(e, t, n) {
  return t === void 0 && (t = 0), n === void 0 && (n = 1), e > n ? n : e < t ? t : e;
}, M = function(e) {
  return "touches" in e;
}, j = function(e) {
  return e && e.ownerDocument.defaultView || self;
}, S = function(e, t, n) {
  var r = e.getBoundingClientRect(), a = M(t) ? (function(o, u) {
    for (var l = 0; l < o.length; l++) if (o[l].identifier === u) return o[l];
    return o[0];
  })(t.touches, n) : t;
  return { left: k((a.pageX - (r.left + j(e).pageXOffset)) / r.width), top: k((a.pageY - (r.top + j(e).pageYOffset)) / r.height) };
}, A = function(e) {
  !M(e) && e.preventDefault();
}, L = s.memo(function(e) {
  var t = e.onMove, n = e.onKey, r = e.onEnd, a = R(e, ["onMove", "onKey", "onEnd"]), o = f.useRef(null), u = x(t), l = x(n), c = x(r), i = f.useRef(null), h = f.useRef(false), p = f.useMemo(function() {
    var D = function(m) {
      A(m), (M(m) ? m.touches.length > 0 : m.buttons > 0) && o.current ? u(S(o.current, m, i.current)) : (b(false), c());
    }, y = function() {
      b(false), c();
    };
    function b(m) {
      var v = h.current, C = j(o.current), N = m ? C.addEventListener : C.removeEventListener;
      N(v ? "touchmove" : "mousemove", D), N(v ? "touchend" : "mouseup", y);
    }
    return [function(m) {
      var v = m.nativeEvent, C = o.current;
      if (C && (A(v), !(function(W, Z) {
        return Z && !M(W);
      })(v, h.current) && C)) {
        if (M(v)) {
          h.current = true;
          var N = v.changedTouches || [];
          N.length && (i.current = N[0].identifier);
        }
        C.focus(), u(S(C, v, i.current)), b(true);
      }
    }, function(m) {
      var v = m.which || m.keyCode;
      v < 37 || v > 40 || (m.preventDefault(), l({ left: v === 39 ? 0.05 : v === 37 ? -0.05 : 0, top: v === 40 ? 0.05 : v === 38 ? -0.05 : 0 }));
    }, function(m) {
      var v = m.which || m.keyCode;
      v >= 37 && v <= 40 && c();
    }, b];
  }, [l, u, c]), _ = p[0], g = p[1], w = p[2], I = p[3];
  return f.useEffect(function() {
    return I;
  }, [I]), s.createElement("div", E({}, a, { onTouchStart: _, onMouseDown: _, className: "react-colorful__interactive", ref: o, onKeyDown: g, onKeyUp: w, tabIndex: 0, role: "slider" }));
}), H = function(e) {
  return e.filter(Boolean).join(" ");
}, q = function(e) {
  var t = e.color, n = e.left, r = e.top, a = r === void 0 ? 0.5 : r, o = H(["react-colorful__pointer", e.className]);
  return s.createElement("div", { className: o, style: { top: 100 * a + "%", left: 100 * n + "%" } }, s.createElement("div", { className: "react-colorful__pointer-fill", style: { backgroundColor: t } }));
}, d = function(e, t, n) {
  return t === void 0 && (t = 0), n === void 0 && (n = Math.pow(10, t)), Math.round(n * e) / n;
}, F = function(e) {
  return ne(z(e));
}, z = function(e) {
  return e[0] === "#" && (e = e.substring(1)), e.length < 6 ? { r: parseInt(e[0] + e[0], 16), g: parseInt(e[1] + e[1], 16), b: parseInt(e[2] + e[2], 16), a: e.length === 4 ? d(parseInt(e[3] + e[3], 16) / 255, 2) : 1 } : { r: parseInt(e.substring(0, 2), 16), g: parseInt(e.substring(2, 4), 16), b: parseInt(e.substring(4, 6), 16), a: e.length === 8 ? d(parseInt(e.substring(6, 8), 16) / 255, 2) : 1 };
}, P = function(e) {
  return te(ee(e));
}, U = function(e) {
  var t = e.s, n = e.v, r = e.a, a = (200 - t) * n / 100;
  return { h: d(e.h), s: d(a > 0 && a < 200 ? t * n / 100 / (a <= 100 ? a : 200 - a) * 100 : 0), l: d(a / 2), a: d(r, 2) };
}, B = function(e) {
  var t = U(e);
  return "hsl(" + t.h + ", " + t.s + "%, " + t.l + "%)";
}, K = function(e) {
  var t = U(e);
  return "hsla(" + t.h + ", " + t.s + "%, " + t.l + "%, " + t.a + ")";
}, ee = function(e) {
  var t = e.h, n = e.s, r = e.v, a = e.a;
  t = t / 360 * 6, n /= 100, r /= 100;
  var o = Math.floor(t), u = r * (1 - n), l = r * (1 - (t - o) * n), c = r * (1 - (1 - t + o) * n), i = o % 6;
  return { r: d(255 * [r, l, u, u, c, r][i]), g: d(255 * [c, r, r, l, u, u][i]), b: d(255 * [u, u, c, r, r, l][i]), a: d(a, 2) };
}, O = function(e) {
  var t = e.toString(16);
  return t.length < 2 ? "0" + t : t;
}, te = function(e) {
  var t = e.r, n = e.g, r = e.b, a = e.a, o = a < 1 ? O(d(255 * a)) : "";
  return "#" + O(t) + O(n) + O(r) + o;
}, ne = function(e) {
  var t = e.r, n = e.g, r = e.b, a = e.a, o = Math.max(t, n, r), u = o - Math.min(t, n, r), l = u ? o === t ? (n - r) / u : o === n ? 2 + (r - t) / u : 4 + (t - n) / u : 0;
  return { h: d(60 * (l < 0 ? l + 6 : l)), s: d(o ? u / o * 100 : 0), v: d(o / 255 * 100), a };
}, V = s.memo(function(e) {
  var t = e.hue, n = e.onChange, r = e.onChangeEnd, a = H(["react-colorful__hue", e.className]);
  return s.createElement("div", { className: a }, s.createElement(L, { onMove: function(o) {
    n({ h: 360 * o.left });
  }, onKey: function(o) {
    n({ h: k(t + 360 * o.left, 0, 360) });
  }, onEnd: r, "aria-label": "Hue", "aria-valuenow": d(t), "aria-valuemax": "360", "aria-valuemin": "0" }, s.createElement(q, { className: "react-colorful__hue-pointer", left: t / 360, color: B({ h: t, s: 100, v: 100, a: 1 }) })));
}), Y = s.memo(function(e) {
  var t = e.hsva, n = e.onChange, r = e.onChangeEnd, a = { backgroundColor: B({ h: t.h, s: 100, v: 100, a: 1 }) };
  return s.createElement("div", { className: "react-colorful__saturation", style: a }, s.createElement(L, { onMove: function(o) {
    n({ s: 100 * o.left, v: 100 - 100 * o.top });
  }, onKey: function(o) {
    n({ s: k(t.s + 100 * o.left, 0, 100), v: k(t.v - 100 * o.top, 0, 100) });
  }, onEnd: r, "aria-label": "Color", "aria-valuetext": "Saturation " + d(t.s) + "%, Brightness " + d(t.v) + "%" }, s.createElement(q, { className: "react-colorful__saturation-pointer", top: 1 - t.v / 100, left: t.s / 100, color: B(t) })));
}), $ = function(e, t) {
  if (e === t) return true;
  for (var n in e) if (e[n] !== t[n]) return false;
  return true;
}, G = function(e, t) {
  return e.toLowerCase() === t.toLowerCase() || $(z(e), z(t));
};
function J(e, t, n, r) {
  var a = x(n), o = x(r), u = f.useState(function() {
    return e.toHsva(t);
  }), l = u[0], c = u[1], i = f.useRef({ color: t, hsva: l }), h = f.useRef(false);
  f.useEffect(function() {
    if (!e.equal(t, i.current.color)) {
      var g = e.toHsva(t);
      i.current = { hsva: g, color: t }, c(g), h.current = false;
    }
  }, [t, e]), f.useEffect(function() {
    var g;
    $(l, i.current.hsva) || e.equal(g = e.fromHsva(l), i.current.color) || (i.current = { hsva: l, color: g }, a(g), h.current = true);
  }, [l, e, a]);
  var p = f.useCallback(function(g) {
    c(function(w) {
      return Object.assign({}, w, g);
    });
  }, []), _ = f.useCallback(function() {
    h.current && (h.current = false, o(i.current.color));
  }, [o]);
  return [l, p, _];
}
var re = typeof window < "u" ? f.useLayoutEffect : f.useEffect, oe = function() {
  return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : void 0;
}, T = /* @__PURE__ */ new WeakMap(), Q = function(e) {
  re(function() {
    var t = e.current;
    if (typeof document < "u" && t) {
      var n = t.getRootNode ? t.getRootNode() : t.ownerDocument, r = n && ("head" in n || "host" in n) ? n : t.ownerDocument;
      if (!T.has(r)) {
        var a = "head" in r ? r.head : r, o = (a.ownerDocument || document).createElement("style");
        o.innerHTML = `.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}`;
        var u = oe();
        u && o.setAttribute("nonce", u), T.set(r, o), a.appendChild(o);
      }
    }
  }, []);
}, ae = function(e) {
  var t = e.className, n = e.colorModel, r = e.color, a = r === void 0 ? n.defaultColor : r, o = e.onChange, u = e.onChangeEnd, l = R(e, ["className", "colorModel", "color", "onChange", "onChangeEnd"]), c = f.useRef(null);
  Q(c);
  var i = J(n, a, o, u), h = i[0], p = i[1], _ = i[2], g = H(["react-colorful", t]);
  return s.createElement("div", E({}, l, { ref: c, className: g }), s.createElement(Y, { hsva: h, onChange: p, onChangeEnd: _ }), s.createElement(V, { hue: h.h, onChange: p, onChangeEnd: _, className: "react-colorful__last-control" }));
}, ue = { defaultColor: "000", toHsva: F, fromHsva: function(e) {
  return P({ h: e.h, s: e.s, v: e.v, a: 1 });
}, equal: G }, ve = function(e) {
  return s.createElement(ae, E({}, e, { colorModel: ue }));
}, le = function(e) {
  var t = e.className, n = e.hsva, r = e.onChange, a = e.onChangeEnd, o = { backgroundImage: "linear-gradient(90deg, " + K(Object.assign({}, n, { a: 0 })) + ", " + K(Object.assign({}, n, { a: 1 })) + ")" }, u = H(["react-colorful__alpha", t]), l = d(100 * n.a);
  return s.createElement("div", { className: u }, s.createElement("div", { className: "react-colorful__alpha-gradient", style: o }), s.createElement(L, { onMove: function(c) {
    r({ a: c.left });
  }, onKey: function(c) {
    r({ a: k(n.a + c.left) });
  }, onEnd: a, "aria-label": "Alpha", "aria-valuetext": l + "%", "aria-valuenow": l, "aria-valuemin": "0", "aria-valuemax": "100" }, s.createElement(q, { className: "react-colorful__alpha-pointer", left: n.a, color: K(n) })));
}, ce = function(e) {
  var t = e.className, n = e.colorModel, r = e.color, a = r === void 0 ? n.defaultColor : r, o = e.onChange, u = e.onChangeEnd, l = R(e, ["className", "colorModel", "color", "onChange", "onChangeEnd"]), c = f.useRef(null);
  Q(c);
  var i = J(n, a, o, u), h = i[0], p = i[1], _ = i[2], g = H(["react-colorful", t]);
  return s.createElement("div", E({}, l, { ref: c, className: g }), s.createElement(Y, { hsva: h, onChange: p, onChangeEnd: _ }), s.createElement(V, { hue: h.h, onChange: p, onChangeEnd: _ }), s.createElement(le, { hsva: h, onChange: p, onChangeEnd: _, className: "react-colorful__last-control" }));
}, ie = { defaultColor: "0001", toHsva: F, fromHsva: P, equal: G }, de = function(e) {
  return s.createElement(ce, E({}, e, { colorModel: ie }));
}, se = /^#?([0-9A-F]{3,8})$/i, fe = function(e) {
  var t = e.color, n = t === void 0 ? "" : t, r = e.onChange, a = e.onBlur, o = e.escape, u = e.validate, l = e.format, c = e.process, i = R(e, ["color", "onChange", "onBlur", "escape", "validate", "format", "process"]), h = f.useState(function() {
    return o(n);
  }), p = h[0], _ = h[1], g = x(r), w = x(a), I = f.useCallback(function(y) {
    var b = o(y.target.value);
    _(b), u(b) && g(c ? c(b) : b);
  }, [o, c, u, g]), D = f.useCallback(function(y) {
    u(y.target.value) || _(o(n)), w(y);
  }, [n, o, u, w]);
  return f.useEffect(function() {
    _(o(n));
  }, [n, o]), s.createElement("input", E({}, i, { value: l ? l(p) : p, spellCheck: "false", onChange: I, onBlur: D }));
}, X = function(e) {
  return "#" + e;
}, ge = function(e) {
  var t = e.prefixed, n = e.alpha, r = R(e, ["prefixed", "alpha"]), a = f.useCallback(function(u) {
    return u.replace(/([^0-9A-F]+)/gi, "").substring(0, n ? 8 : 6);
  }, [n]), o = f.useCallback(function(u) {
    return (function(l, c) {
      var i = se.exec(l), h = i ? i[1].length : 0;
      return h === 3 || h === 6 || !!c && h === 4 || !!c && h === 8;
    })(u, n);
  }, [n]);
  return s.createElement(fe, E({}, r, { escape: a, format: t ? X : void 0, process: X, validate: o }));
};
export {
  ge as O,
  ve as Z,
  de as t
};
