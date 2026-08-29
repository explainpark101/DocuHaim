import { g as Le, r as N } from "./vendor-react-BFxggocB.js";
var At, Vt;
function je() {
  if (Vt) return At;
  Vt = 1;
  var h = false, t, e, i, s, n, o, r, l, a, c, d, p, f, u, C;
  function m() {
    if (!h) {
      h = true;
      var v = navigator.userAgent, g = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(v), b = /(Mac OS X)|(Windows)|(Linux)/.exec(v);
      if (p = /\b(iPhone|iP[ao]d)/.exec(v), f = /\b(iP[ao]d)/.exec(v), c = /Android/i.exec(v), u = /FBAN\/\w+;/i.exec(v), C = /Mobile/i.exec(v), d = !!/Win64/.exec(v), g) {
        t = g[1] ? parseFloat(g[1]) : g[5] ? parseFloat(g[5]) : NaN, t && document && document.documentMode && (t = document.documentMode);
        var E = /(?:Trident\/(\d+.\d+))/.exec(v);
        o = E ? parseFloat(E[1]) + 4 : t, e = g[2] ? parseFloat(g[2]) : NaN, i = g[3] ? parseFloat(g[3]) : NaN, s = g[4] ? parseFloat(g[4]) : NaN, s ? (g = /(?:Chrome\/(\d+\.\d+))/.exec(v), n = g && g[1] ? parseFloat(g[1]) : NaN) : n = NaN;
      } else t = e = i = n = s = NaN;
      if (b) {
        if (b[1]) {
          var T = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(v);
          r = T ? parseFloat(T[1].replace("_", ".")) : true;
        } else r = false;
        l = !!b[2], a = !!b[3];
      } else r = l = a = false;
    }
  }
  var w = { ie: function() {
    return m() || t;
  }, ieCompatibilityMode: function() {
    return m() || o > t;
  }, ie64: function() {
    return w.ie() && d;
  }, firefox: function() {
    return m() || e;
  }, opera: function() {
    return m() || i;
  }, webkit: function() {
    return m() || s;
  }, safari: function() {
    return w.webkit();
  }, chrome: function() {
    return m() || n;
  }, windows: function() {
    return m() || l;
  }, osx: function() {
    return m() || r;
  }, linux: function() {
    return m() || a;
  }, iphone: function() {
    return m() || p;
  }, mobile: function() {
    return m() || p || f || c || C;
  }, nativeApp: function() {
    return m() || u;
  }, android: function() {
    return m() || c;
  }, ipad: function() {
    return m() || f;
  } };
  return At = w, At;
}
var Rt, Jt;
function Xe() {
  if (Jt) return Rt;
  Jt = 1;
  var h = !!(typeof window < "u" && window.document && window.document.createElement), t = { canUseDOM: h, canUseWorkers: typeof Worker < "u", canUseEventListeners: h && !!(window.addEventListener || window.attachEvent), canUseViewport: h && !!window.screen, isInWorker: !h };
  return Rt = t, Rt;
}
var xt, Qt;
function He() {
  if (Qt) return xt;
  Qt = 1;
  var h = Xe(), t;
  h.canUseDOM && (t = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== true);
  function e(i, s) {
    if (!h.canUseDOM || s && !("addEventListener" in document)) return false;
    var n = "on" + i, o = n in document;
    if (!o) {
      var r = document.createElement("div");
      r.setAttribute(n, "return;"), o = typeof r[n] == "function";
    }
    return !o && t && i === "wheel" && (o = document.implementation.hasFeature("Events.wheel", "3.0")), o;
  }
  return xt = e, xt;
}
var zt, te;
function Ye() {
  if (te) return zt;
  te = 1;
  var h = je(), t = He(), e = 10, i = 40, s = 800;
  function n(o) {
    var r = 0, l = 0, a = 0, c = 0;
    return "detail" in o && (l = o.detail), "wheelDelta" in o && (l = -o.wheelDelta / 120), "wheelDeltaY" in o && (l = -o.wheelDeltaY / 120), "wheelDeltaX" in o && (r = -o.wheelDeltaX / 120), "axis" in o && o.axis === o.HORIZONTAL_AXIS && (r = l, l = 0), a = r * e, c = l * e, "deltaY" in o && (c = o.deltaY), "deltaX" in o && (a = o.deltaX), (a || c) && o.deltaMode && (o.deltaMode == 1 ? (a *= i, c *= i) : (a *= s, c *= s)), a && !r && (r = a < 1 ? -1 : 1), c && !l && (l = c < 1 ? -1 : 1), { spinX: r, spinY: l, pixelX: a, pixelY: c };
  }
  return n.getEventType = function() {
    return h.firefox() ? "DOMMouseScroll" : t("wheel") ? "wheel" : "mousewheel";
  }, zt = n, zt;
}
var Pt, ee;
function Fe() {
  return ee || (ee = 1, Pt = Ye()), Pt;
}
var Ue = Fe();
const Ze = Le(Ue);
function it(h) {
  "@babel/helpers - typeof";
  return it = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, it(h);
}
function qe(h, t) {
  if (it(h) != "object" || !h) return h;
  var e = h[Symbol.toPrimitive];
  if (e !== void 0) {
    var i = e.call(h, t);
    if (it(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(h);
}
function Be(h) {
  var t = qe(h, "string");
  return it(t) == "symbol" ? t : t + "";
}
function Ge(h, t, e) {
  return (t = Be(t)) in h ? Object.defineProperty(h, t, { value: e, enumerable: true, configurable: true, writable: true }) : h[t] = e, h;
}
function ie(h, t) {
  var e = Object.keys(h);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(h);
    t && (i = i.filter(function(s) {
      return Object.getOwnPropertyDescriptor(h, s).enumerable;
    })), e.push.apply(e, i);
  }
  return e;
}
function A(h) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ie(Object(e), true).forEach(function(i) {
      Ge(h, i, e[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(h, Object.getOwnPropertyDescriptors(e)) : ie(Object(e)).forEach(function(i) {
      Object.defineProperty(h, i, Object.getOwnPropertyDescriptor(e, i));
    });
  }
  return h;
}
function Ke(h, t, e, i, s, n = 0) {
  const { width: o, height: r } = J(h, t, n), l = Math.min(o, e), a = Math.min(r, i);
  return l > a * s ? { width: a * s, height: a } : { width: l, height: l / s };
}
function Ve(h) {
  return h.width > h.height ? h.width / h.naturalWidth : h.height / h.naturalHeight;
}
function Q(h, t, e, i, s = 0) {
  const { width: n, height: o } = J(t.width, t.height, s);
  return { x: se(h.x, n, e.width, i), y: se(h.y, o, e.height, i) };
}
function se(h, t, e, i) {
  const s = Math.abs(t * i / 2 - e / 2);
  return pt(h, -s, s);
}
function ne(h, t) {
  return Math.sqrt(Math.pow(h.y - t.y, 2) + Math.pow(h.x - t.x, 2));
}
function oe(h, t) {
  return Math.atan2(t.y - h.y, t.x - h.x) * 180 / Math.PI;
}
function Je(h, t, e, i, s, n = 0, o = true) {
  const r = o ? Qe : ti, l = J(t.width, t.height, n), a = J(t.naturalWidth, t.naturalHeight, n), c = { x: r(100, ((l.width - e.width / s) / 2 - h.x / s) / l.width * 100), y: r(100, ((l.height - e.height / s) / 2 - h.y / s) / l.height * 100), width: r(100, e.width / l.width * 100 / s), height: r(100, e.height / l.height * 100 / s) }, d = Math.round(r(a.width, c.width * a.width / 100)), p = Math.round(r(a.height, c.height * a.height / 100)), f = a.width >= a.height * i ? { width: Math.round(p * i), height: p } : { width: d, height: Math.round(d / i) };
  return { croppedAreaPercentages: c, croppedAreaPixels: A(A({}, f), {}, { x: Math.round(r(a.width - f.width, c.x * a.width / 100)), y: Math.round(r(a.height - f.height, c.y * a.height / 100)) }) };
}
function Qe(h, t) {
  return Math.min(h, Math.max(0, t));
}
function ti(h, t) {
  return t;
}
function ei(h, t, e, i, s, n) {
  const o = J(t.width, t.height, e), r = pt(i.width / o.width * (100 / h.width), s, n);
  return { crop: { x: r * o.width / 2 - i.width / 2 - o.width * r * (h.x / 100), y: r * o.height / 2 - i.height / 2 - o.height * r * (h.y / 100) }, zoom: r };
}
function ii(h, t, e) {
  const i = Ve(t);
  return e.height > e.width ? e.height / (h.height * i) : e.width / (h.width * i);
}
function si(h, t, e = 0, i, s, n) {
  const o = J(t.naturalWidth, t.naturalHeight, e), r = pt(ii(h, t, i), s, n), l = i.height > i.width ? i.height / h.height : i.width / h.width;
  return { crop: { x: ((o.width - h.width) / 2 - h.x) * l, y: ((o.height - h.height) / 2 - h.y) * l }, zoom: r };
}
function re(h, t) {
  return { x: (t.x + h.x) / 2, y: (t.y + h.y) / 2 };
}
function ni(h) {
  return h * Math.PI / 180;
}
function J(h, t, e) {
  const i = ni(e);
  return { width: Math.abs(Math.cos(i) * h) + Math.abs(Math.sin(i) * t), height: Math.abs(Math.sin(i) * h) + Math.abs(Math.cos(i) * t) };
}
function pt(h, t, e) {
  return Math.min(Math.max(h, t), e);
}
function at(...h) {
  return h.filter((t) => typeof t == "string" && t.length > 0).join(" ").trim();
}
var oi = `.reactEasyCrop_Container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  user-select: none;
  touch-action: none;
  cursor: move;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reactEasyCrop_Image,
.reactEasyCrop_Video {
  will-change: transform; /* this improves performances and prevent painting issues on iOS Chrome */
  max-width: unset; /* prevent global img/video reset rules from constraining the cropper media */
}

.reactEasyCrop_Contain {
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.reactEasyCrop_Cover_Horizontal {
  width: 100%;
  height: auto;
}
.reactEasyCrop_Cover_Vertical {
  width: auto;
  height: 100%;
}

.reactEasyCrop_CropArea {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  box-shadow: 0 0 0 9999em;
  color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.reactEasyCrop_CropAreaRound {
  border-radius: 50%;
}

.reactEasyCrop_CropAreaGrid::before {
  content: ' ';
  box-sizing: border-box;
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  top: 0;
  bottom: 0;
  left: 33.33%;
  right: 33.33%;
  border-top: 0;
  border-bottom: 0;
}

.reactEasyCrop_CropAreaGrid::after {
  content: ' ';
  box-sizing: border-box;
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  top: 33.33%;
  bottom: 33.33%;
  left: 0;
  right: 0;
  border-left: 0;
  border-right: 0;
}
`;
const ri = 250, ai = 1, hi = 3, ci = 1;
var ft = class k extends N.Component {
  constructor(...t) {
    super(...t), this.cropperRef = N.createRef(), this.imageRef = N.createRef(), this.videoRef = N.createRef(), this.containerPosition = { x: 0, y: 0 }, this.containerRef = null, this.styleRef = null, this.containerRect = null, this.mediaSize = { width: 0, height: 0, naturalWidth: 0, naturalHeight: 0 }, this.dragStartPosition = { x: 0, y: 0 }, this.dragStartCrop = { x: 0, y: 0 }, this.gestureZoomStart = 0, this.gestureRotationStart = 0, this.isTouching = false, this.lastPinchDistance = 0, this.lastPinchRotation = 0, this.rafDragTimeout = null, this.rafPinchTimeout = null, this.wheelTimer = null, this.resizeEmitTimer = null, this.currentDoc = typeof document < "u" ? document : null, this.currentWindow = typeof window < "u" ? window : null, this.resizeObserver = null, this.previousCropSize = null, this.isInitialized = false, this.dragInteractionSource = null, this.state = { cropSize: null, hasWheelJustStarted: false, mediaObjectFit: void 0 }, this.initResizeObserver = () => {
      if (typeof window.ResizeObserver > "u" || !this.containerRef) return;
      let e = true;
      this.resizeObserver = new window.ResizeObserver((i) => {
        if (e) {
          e = false;
          return;
        }
        this.computeSizes({ isResizeTriggered: true });
      }), this.resizeObserver.observe(this.containerRef);
    }, this.onWindowResize = () => {
      this.computeSizes({ isResizeTriggered: true });
    }, this.preventZoomSafari = (e) => e.preventDefault(), this.cleanEvents = () => {
      this.currentDoc && (this.currentDoc.removeEventListener("mousemove", this.onMouseMove), this.currentDoc.removeEventListener("mouseup", this.onDragStopped), this.currentDoc.removeEventListener("touchmove", this.onTouchMove), this.currentDoc.removeEventListener("touchend", this.onDragStopped), this.currentDoc.removeEventListener("gesturechange", this.onGestureChange), this.currentDoc.removeEventListener("gestureend", this.onGestureEnd), this.currentDoc.removeEventListener("scroll", this.onScroll));
    }, this.clearScrollEvent = () => {
      this.containerRef && this.containerRef.removeEventListener("wheel", this.onWheel), this.wheelTimer && clearTimeout(this.wheelTimer);
    }, this.onMediaLoad = () => {
      const e = this.computeSizes();
      e && (this.previousCropSize = e, this.emitCropData(), this.setInitialCrop(e), this.isInitialized = true), this.props.onMediaLoaded && this.props.onMediaLoaded(this.mediaSize);
    }, this.setInitialCrop = (e) => {
      if (this.props.initialCroppedAreaPercentages) {
        const { crop: i, zoom: s } = ei(this.props.initialCroppedAreaPercentages, this.mediaSize, this.props.rotation, e, this.props.minZoom, this.props.maxZoom);
        this.props.onCropChange(i), this.props.onZoomChange && this.props.onZoomChange(s);
      } else if (this.props.initialCroppedAreaPixels) {
        const { crop: i, zoom: s } = si(this.props.initialCroppedAreaPixels, this.mediaSize, this.props.rotation, e, this.props.minZoom, this.props.maxZoom);
        this.props.onCropChange(i), this.props.onZoomChange && this.props.onZoomChange(s);
      }
    }, this.computeSizes = ({ isResizeTriggered: e = false } = {}) => {
      const i = this.imageRef.current || this.videoRef.current;
      if (i && this.containerRef) {
        var s, n, o, r, l, a;
        this.containerRect = this.containerRef.getBoundingClientRect(), this.saveContainerPosition();
        const c = this.containerRect.width / this.containerRect.height, d = ((s = this.imageRef.current) === null || s === void 0 ? void 0 : s.naturalWidth) || ((n = this.videoRef.current) === null || n === void 0 ? void 0 : n.videoWidth) || 0, p = ((o = this.imageRef.current) === null || o === void 0 ? void 0 : o.naturalHeight) || ((r = this.videoRef.current) === null || r === void 0 ? void 0 : r.videoHeight) || 0, f = i.offsetWidth < d || i.offsetHeight < p, u = d / p;
        let C;
        if (f) switch (this.state.mediaObjectFit) {
          default:
          case "contain":
            C = c > u ? { width: this.containerRect.height * u, height: this.containerRect.height } : { width: this.containerRect.width, height: this.containerRect.width / u };
            break;
          case "horizontal-cover":
            C = { width: this.containerRect.width, height: this.containerRect.width / u };
            break;
          case "vertical-cover":
            C = { width: this.containerRect.height * u, height: this.containerRect.height };
            break;
        }
        else C = { width: i.offsetWidth, height: i.offsetHeight };
        this.mediaSize = A(A({}, C), {}, { naturalWidth: d, naturalHeight: p }), this.props.setMediaSize && this.props.setMediaSize(this.mediaSize);
        const m = this.props.cropSize ? this.props.cropSize : Ke(this.mediaSize.width, this.mediaSize.height, this.containerRect.width, this.containerRect.height, this.props.aspect, this.props.rotation);
        return (((l = this.state.cropSize) === null || l === void 0 ? void 0 : l.height) !== m.height || ((a = this.state.cropSize) === null || a === void 0 ? void 0 : a.width) !== m.width) && this.props.onCropSizeChange && this.props.onCropSizeChange(m), this.setState({ cropSize: m }, () => this.recomputeCropPosition({ isResizeTriggered: e })), this.props.setCropSize && this.props.setCropSize(m), m;
      }
    }, this.saveContainerPosition = () => {
      if (this.containerRef) {
        const e = this.containerRef.getBoundingClientRect();
        this.containerPosition = { x: e.left, y: e.top };
      }
    }, this.onMouseDown = (e) => {
      this.currentDoc && (e.preventDefault(), this.currentDoc.addEventListener("mousemove", this.onMouseMove), this.currentDoc.addEventListener("mouseup", this.onDragStopped), this.saveContainerPosition(), this.onDragStart(k.getMousePoint(e), "mouse"));
    }, this.onMouseMove = (e) => this.onDrag(k.getMousePoint(e)), this.onScroll = (e) => {
      this.currentDoc && (e.preventDefault(), this.saveContainerPosition());
    }, this.onTouchStart = (e) => {
      this.currentDoc && (this.isTouching = true, !(this.props.onTouchRequest && !this.props.onTouchRequest(e)) && (this.currentDoc.addEventListener("touchmove", this.onTouchMove, { passive: false }), this.currentDoc.addEventListener("touchend", this.onDragStopped), this.saveContainerPosition(), e.touches.length === 2 ? this.onPinchStart(e) : e.touches.length === 1 && this.onDragStart(k.getTouchPoint(e.touches[0]), "touch")));
    }, this.onTouchMove = (e) => {
      e.preventDefault(), e.touches.length === 2 ? this.onPinchMove(e) : e.touches.length === 1 && this.onDrag(k.getTouchPoint(e.touches[0]));
    }, this.onGestureStart = (e) => {
      this.currentDoc && (e.preventDefault(), this.currentDoc.addEventListener("gesturechange", this.onGestureChange), this.currentDoc.addEventListener("gestureend", this.onGestureEnd), this.gestureZoomStart = this.props.zoom, this.gestureRotationStart = this.props.rotation);
    }, this.onGestureChange = (e) => {
      if (e.preventDefault(), this.isTouching) return;
      const i = k.getMousePoint(e), s = this.gestureZoomStart - 1 + e.scale;
      if (this.setNewZoom(s, i, { shouldUpdatePosition: true }), this.props.onRotationChange) {
        const n = this.gestureRotationStart + e.rotation;
        this.props.onRotationChange(n);
      }
    }, this.onGestureEnd = (e) => {
      this.cleanEvents();
    }, this.onDragStart = ({ x: e, y: i }, s) => {
      var n, o;
      this.dragStartPosition = { x: e, y: i }, this.dragStartCrop = A({}, this.props.crop), this.dragInteractionSource = s, (n = (o = this.props).onInteractionStart) === null || n === void 0 || n.call(o, { source: s });
    }, this.onDrag = ({ x: e, y: i }) => {
      this.currentWindow && (this.rafDragTimeout && this.currentWindow.cancelAnimationFrame(this.rafDragTimeout), this.rafDragTimeout = this.currentWindow.requestAnimationFrame(() => {
        if (!this.state.cropSize || e === void 0 || i === void 0) return;
        const s = e - this.dragStartPosition.x, n = i - this.dragStartPosition.y, o = { x: this.dragStartCrop.x + s, y: this.dragStartCrop.y + n }, r = this.props.restrictPosition ? Q(o, this.mediaSize, this.state.cropSize, this.props.zoom, this.props.rotation) : o;
        this.props.onCropChange(r);
      }));
    }, this.onDragStopped = () => {
      var e, i, s;
      this.isTouching = false, this.cleanEvents(), this.emitCropData(), (e = (i = this.props).onInteractionEnd) === null || e === void 0 || e.call(i, { source: (s = this.dragInteractionSource) !== null && s !== void 0 ? s : "mouse" }), this.dragInteractionSource = null;
    }, this.onWheel = (e) => {
      if (!this.currentWindow || this.props.onWheelRequest && !this.props.onWheelRequest(e)) return;
      e.preventDefault();
      const i = k.getMousePoint(e), { pixelY: s } = Ze(e), n = this.props.zoom - s * this.props.zoomSpeed / 200;
      this.setNewZoom(n, i, { shouldUpdatePosition: true }), this.state.hasWheelJustStarted || this.setState({ hasWheelJustStarted: true }, () => {
        var o, r;
        return (o = (r = this.props).onInteractionStart) === null || o === void 0 ? void 0 : o.call(r, { source: "wheel" });
      }), this.wheelTimer && clearTimeout(this.wheelTimer), this.wheelTimer = this.currentWindow.setTimeout(() => this.setState({ hasWheelJustStarted: false }, () => {
        var o, r;
        return (o = (r = this.props).onInteractionEnd) === null || o === void 0 ? void 0 : o.call(r, { source: "wheel" });
      }), 250);
    }, this.getPointOnContainer = ({ x: e, y: i }, s) => {
      if (!this.containerRect) throw new Error("The Cropper is not mounted");
      return { x: this.containerRect.width / 2 - (e - s.x), y: this.containerRect.height / 2 - (i - s.y) };
    }, this.getPointOnMedia = ({ x: e, y: i }) => {
      const { crop: s, zoom: n } = this.props;
      return { x: (e + s.x) / n, y: (i + s.y) / n };
    }, this.setNewZoom = (e, i, { shouldUpdatePosition: s = true } = {}) => {
      if (!this.state.cropSize || !this.props.onZoomChange) return;
      const n = pt(e, this.props.minZoom, this.props.maxZoom);
      if (s) {
        const o = this.getPointOnContainer(i, this.containerPosition), r = this.getPointOnMedia(o), l = { x: r.x * n - o.x, y: r.y * n - o.y }, a = this.props.restrictPosition ? Q(l, this.mediaSize, this.state.cropSize, n, this.props.rotation) : l;
        this.props.onCropChange(a);
      }
      this.props.onZoomChange(n);
    }, this.getCropData = () => this.state.cropSize ? Je(this.props.restrictPosition ? Q(this.props.crop, this.mediaSize, this.state.cropSize, this.props.zoom, this.props.rotation) : this.props.crop, this.mediaSize, this.state.cropSize, this.getAspect(), this.props.zoom, this.props.rotation, this.props.restrictPosition) : null, this.emitCropData = () => {
      this.resizeEmitTimer && (clearTimeout(this.resizeEmitTimer), this.resizeEmitTimer = null);
      const e = this.getCropData();
      if (!e) return;
      const { croppedAreaPercentages: i, croppedAreaPixels: s } = e;
      this.props.onCropComplete && this.props.onCropComplete(i, s), this.props.onCropAreaChange && this.props.onCropAreaChange(i, s);
    }, this.emitCropAreaChange = () => {
      const e = this.getCropData();
      if (!e) return;
      const { croppedAreaPercentages: i, croppedAreaPixels: s } = e;
      this.props.onCropAreaChange && this.props.onCropAreaChange(i, s);
    }, this.recomputeCropPosition = ({ isResizeTriggered: e = false } = {}) => {
      var i, s;
      if (!this.state.cropSize) return;
      let n = this.props.crop;
      if (this.isInitialized && (!((i = this.previousCropSize) === null || i === void 0) && i.width) && (!((s = this.previousCropSize) === null || s === void 0) && s.height) && (Math.abs(this.previousCropSize.width - this.state.cropSize.width) > 1e-6 || Math.abs(this.previousCropSize.height - this.state.cropSize.height) > 1e-6)) {
        const r = this.state.cropSize.width / this.previousCropSize.width, l = this.state.cropSize.height / this.previousCropSize.height;
        n = { x: this.props.crop.x * r, y: this.props.crop.y * l };
      }
      const o = this.props.restrictPosition ? Q(n, this.mediaSize, this.state.cropSize, this.props.zoom, this.props.rotation) : n;
      this.previousCropSize = this.state.cropSize, this.props.onCropChange(o), e ? this.debouncedEmitCropData() : this.emitCropData();
    }, this.debouncedEmitCropData = () => {
      this.currentWindow && (this.resizeEmitTimer && clearTimeout(this.resizeEmitTimer), this.resizeEmitTimer = this.currentWindow.setTimeout(() => {
        this.emitCropData();
      }, ri));
    }, this.onKeyDown = (e) => {
      const { crop: i, onCropChange: s, keyboardStep: n, zoom: o, rotation: r } = this.props;
      let l = n;
      if (!this.state.cropSize) return;
      e.shiftKey && (l *= 0.2);
      let a = A({}, i);
      switch (e.key) {
        case "ArrowUp":
          a.y -= l, e.preventDefault();
          break;
        case "ArrowDown":
          a.y += l, e.preventDefault();
          break;
        case "ArrowLeft":
          a.x -= l, e.preventDefault();
          break;
        case "ArrowRight":
          a.x += l, e.preventDefault();
          break;
        default:
          return;
      }
      if (this.props.restrictPosition && (a = Q(a, this.mediaSize, this.state.cropSize, o, r)), !e.repeat) {
        var c, d;
        (c = (d = this.props).onInteractionStart) === null || c === void 0 || c.call(d, { source: "keyboard" });
      }
      s(a);
    }, this.onKeyUp = (e) => {
      var i, s;
      switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
          e.preventDefault();
          break;
        default:
          return;
      }
      this.emitCropData(), (i = (s = this.props).onInteractionEnd) === null || i === void 0 || i.call(s, { source: "keyboard" });
    };
  }
  componentDidMount() {
    !this.currentDoc || !this.currentWindow || (this.containerRef && (this.containerRef.ownerDocument && (this.currentDoc = this.containerRef.ownerDocument), this.currentDoc.defaultView && (this.currentWindow = this.currentDoc.defaultView), this.initResizeObserver(), typeof window.ResizeObserver > "u" && this.currentWindow.addEventListener("resize", this.onWindowResize), this.props.zoomWithScroll && this.containerRef.addEventListener("wheel", this.onWheel, { passive: false }), this.containerRef.addEventListener("gesturestart", this.onGestureStart)), this.currentDoc.addEventListener("scroll", this.onScroll), this.props.disableAutomaticStylesInjection || (this.styleRef = this.currentDoc.createElement("style"), this.styleRef.setAttribute("type", "text/css"), this.props.nonce && this.styleRef.setAttribute("nonce", this.props.nonce), this.styleRef.innerHTML = oi, this.currentDoc.head.appendChild(this.styleRef)), this.imageRef.current && this.imageRef.current.complete && this.onMediaLoad(), this.props.setImageRef && this.props.setImageRef(this.imageRef), this.props.setVideoRef && this.props.setVideoRef(this.videoRef), this.props.setCropperRef && this.props.setCropperRef(this.cropperRef));
  }
  componentWillUnmount() {
    var t;
    if (!(!this.currentDoc || !this.currentWindow)) {
      if (typeof window.ResizeObserver > "u" && this.currentWindow.removeEventListener("resize", this.onWindowResize), (t = this.resizeObserver) === null || t === void 0 || t.disconnect(), this.resizeEmitTimer && clearTimeout(this.resizeEmitTimer), this.containerRef && this.containerRef.removeEventListener("gesturestart", this.preventZoomSafari), this.styleRef) {
        var e;
        (e = this.styleRef.parentNode) === null || e === void 0 || e.removeChild(this.styleRef);
      }
      this.cleanEvents(), this.props.zoomWithScroll && this.clearScrollEvent();
    }
  }
  componentDidUpdate(t) {
    var e, i, s, n, o, r, l, a;
    if (t.rotation !== this.props.rotation ? (this.computeSizes(), this.recomputeCropPosition()) : t.aspect !== this.props.aspect ? this.computeSizes() : t.objectFit !== this.props.objectFit ? this.computeSizes() : t.zoom !== this.props.zoom ? this.recomputeCropPosition() : ((e = t.cropSize) === null || e === void 0 ? void 0 : e.height) !== ((i = this.props.cropSize) === null || i === void 0 ? void 0 : i.height) || ((s = t.cropSize) === null || s === void 0 ? void 0 : s.width) !== ((n = this.props.cropSize) === null || n === void 0 ? void 0 : n.width) ? this.computeSizes() : (((o = t.crop) === null || o === void 0 ? void 0 : o.x) !== ((r = this.props.crop) === null || r === void 0 ? void 0 : r.x) || ((l = t.crop) === null || l === void 0 ? void 0 : l.y) !== ((a = this.props.crop) === null || a === void 0 ? void 0 : a.y)) && this.emitCropAreaChange(), t.zoomWithScroll !== this.props.zoomWithScroll && this.containerRef && (this.props.zoomWithScroll ? this.containerRef.addEventListener("wheel", this.onWheel, { passive: false }) : this.clearScrollEvent()), t.video !== this.props.video) {
      var c;
      (c = this.videoRef.current) === null || c === void 0 || c.load();
    }
    const d = this.getObjectFit();
    d !== this.state.mediaObjectFit && this.setState({ mediaObjectFit: d }, this.computeSizes);
  }
  getAspect() {
    const { cropSize: t, aspect: e } = this.props;
    return t ? t.width / t.height : e;
  }
  getObjectFit() {
    if (this.props.objectFit === "cover") {
      if ((this.imageRef.current || this.videoRef.current) && this.containerRef) {
        var t, e, i, s;
        this.containerRect = this.containerRef.getBoundingClientRect();
        const n = this.containerRect.width / this.containerRect.height;
        return (((t = this.imageRef.current) === null || t === void 0 ? void 0 : t.naturalWidth) || ((e = this.videoRef.current) === null || e === void 0 ? void 0 : e.videoWidth) || 0) / (((i = this.imageRef.current) === null || i === void 0 ? void 0 : i.naturalHeight) || ((s = this.videoRef.current) === null || s === void 0 ? void 0 : s.videoHeight) || 0) < n ? "horizontal-cover" : "vertical-cover";
      }
      return "horizontal-cover";
    }
    return this.props.objectFit;
  }
  onPinchStart(t) {
    const e = k.getTouchPoint(t.touches[0]), i = k.getTouchPoint(t.touches[1]);
    this.lastPinchDistance = ne(e, i), this.lastPinchRotation = oe(e, i), this.onDragStart(re(e, i), "touch");
  }
  onPinchMove(t) {
    if (!this.currentDoc || !this.currentWindow) return;
    const e = k.getTouchPoint(t.touches[0]), i = k.getTouchPoint(t.touches[1]), s = re(e, i);
    this.onDrag(s), this.rafPinchTimeout && this.currentWindow.cancelAnimationFrame(this.rafPinchTimeout), this.rafPinchTimeout = this.currentWindow.requestAnimationFrame(() => {
      const n = ne(e, i), o = this.props.zoom * (n / this.lastPinchDistance);
      this.setNewZoom(o, s, { shouldUpdatePosition: false }), this.lastPinchDistance = n;
      const r = oe(e, i), l = this.props.rotation + (r - this.lastPinchRotation);
      this.props.onRotationChange && this.props.onRotationChange(l), this.lastPinchRotation = r;
    });
  }
  render() {
    var t;
    const { image: e, video: i, mediaProps: s, cropperProps: n, transform: o, crop: { x: r, y: l }, rotation: a, zoom: c, cropShape: d, showGrid: p, roundCropAreaPixels: f, style: { containerStyle: u, cropAreaStyle: C, mediaStyle: m }, classes: { containerClassName: w, cropAreaClassName: v, mediaClassName: g } } = this.props, b = (t = this.state.mediaObjectFit) !== null && t !== void 0 ? t : this.getObjectFit();
    return N.createElement("div", { onMouseDown: this.onMouseDown, onTouchStart: this.onTouchStart, ref: (E) => this.containerRef = E, "data-testid": "container", style: u, className: at("reactEasyCrop_Container", w) }, e ? N.createElement("img", A(A({ alt: "", className: at("reactEasyCrop_Image", b === "contain" && "reactEasyCrop_Contain", b === "horizontal-cover" && "reactEasyCrop_Cover_Horizontal", b === "vertical-cover" && "reactEasyCrop_Cover_Vertical", g) }, s), {}, { src: e, ref: this.imageRef, style: A(A({}, m), {}, { transform: o || `translate(${r}px, ${l}px) rotate(${a}deg) scale(${c})` }), onLoad: this.onMediaLoad })) : i && N.createElement("video", A(A({ autoPlay: true, playsInline: true, loop: true, muted: true, className: at("reactEasyCrop_Video", b === "contain" && "reactEasyCrop_Contain", b === "horizontal-cover" && "reactEasyCrop_Cover_Horizontal", b === "vertical-cover" && "reactEasyCrop_Cover_Vertical", g) }, s), {}, { ref: this.videoRef, onLoadedMetadata: this.onMediaLoad, style: A(A({}, m), {}, { transform: o || `translate(${r}px, ${l}px) rotate(${a}deg) scale(${c})` }), controls: false }), (Array.isArray(i) ? i : [{ src: i }]).map((E) => N.createElement("source", A({ key: E.src }, E)))), this.state.cropSize && N.createElement("div", A({ ref: this.cropperRef, style: A(A({}, C), {}, { width: f ? Math.round(this.state.cropSize.width) : this.state.cropSize.width, height: f ? Math.round(this.state.cropSize.height) : this.state.cropSize.height }), tabIndex: 0, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp, "data-testid": "cropper", className: at("reactEasyCrop_CropArea", d === "round" && "reactEasyCrop_CropAreaRound", p && "reactEasyCrop_CropAreaGrid", v) }, n)));
  }
};
ft.defaultProps = { zoom: 1, rotation: 0, aspect: 4 / 3, maxZoom: hi, minZoom: ai, cropShape: "rect", objectFit: "contain", showGrid: true, style: {}, classes: {}, mediaProps: {}, cropperProps: {}, zoomSpeed: 1, restrictPosition: true, zoomWithScroll: true, keyboardStep: ci };
ft.getMousePoint = (h) => ({ x: Number(h.clientX), y: Number(h.clientY) });
ft.getTouchPoint = (h) => ({ x: Number(h.clientX), y: Number(h.clientY) });
var Oi = ft;
const rt = typeof window < "u" && typeof window.document < "u", P = rt ? window : {}, mt = rt ? "ontouchstart" in P.document.documentElement : false, gt = rt ? "PointerEvent" in P : false, L = "cropper", q = `${L}-canvas`, Ee = `${L}-crosshair`, ye = `${L}-grid`, Se = `${L}-handle`, F = `${L}-image`, M = `${L}-selection`, Te = `${L}-shade`, Ae = `${L}-viewer`, st = "select", Zt = "move", U = "scale", dt = "rotate", nt = "transform", I = "none", Dt = "n-resize", Ot = "e-resize", kt = "s-resize", Mt = "w-resize", B = "ne-resize", G = "nw-resize", K = "se-resize", V = "sw-resize", Re = "action", xe = mt ? "touchend touchcancel" : "mouseup", ze = mt ? "touchmove" : "mousemove", Pe = mt ? "touchstart" : "mousedown", _t = gt ? "pointerdown" : Pe, Nt = gt ? "pointermove" : ze, It = gt ? "pointerup pointercancel" : xe, Wt = "error", Lt = "keydown", H = "load", jt = "resize", Xt = "wheel", Z = "action", j = "actionend", De = "actionmove", X = "actionstart", W = "change", ut = "transform";
function tt(h) {
  return typeof h == "string";
}
const qt = Number.isNaN || P.isNaN;
function $(h) {
  return typeof h == "number" && !qt(h);
}
function R(h) {
  return $(h) && h > 0 && h < 1 / 0;
}
function Oe(h) {
  return typeof h > "u";
}
function Bt(h) {
  return typeof h == "object" && h !== null;
}
const { hasOwnProperty: li } = Object.prototype;
function ot(h) {
  if (!Bt(h)) return false;
  try {
    const { constructor: t } = h, { prototype: e } = t;
    return t && e && li.call(e, "isPrototypeOf");
  } catch {
    return false;
  }
}
function vt(h) {
  return typeof h == "function";
}
function Y(h) {
  return typeof h == "object" && h !== null && h.nodeType === 1;
}
const di = /([a-z\d])([A-Z])/g;
function Ht(h) {
  return String(h).replace(di, "$1-$2").toLowerCase();
}
const ui = /-[A-z\d]/g;
function Yt(h) {
  return h.replace(ui, (t) => t.slice(1).toUpperCase());
}
const ke = /\s\s*/;
function y(h, t, e, i) {
  t.trim().split(ke).forEach((s) => {
    h.removeEventListener(s, e, i);
  });
}
function S(h, t, e, i) {
  t.trim().split(ke).forEach((s) => {
    h.addEventListener(s, e, i);
  });
}
function Ft(h, t, e, i) {
  S(h, t, e, Object.assign(Object.assign({}, i), { once: true }));
}
const pi = { bubbles: true, cancelable: true, composed: true };
function Me(h, t, e, i) {
  return h.dispatchEvent(new CustomEvent(t, Object.assign(Object.assign(Object.assign({}, pi), { detail: e }), i)));
}
function _e(h) {
  return typeof h.composedPath == "function" && h.composedPath().find(Y) || h.target;
}
const ae = Promise.resolve();
function Ne(h, t) {
  return t ? ae.then(h ? t.bind(h) : t) : ae;
}
function Gt(h) {
  const t = h.getRootNode();
  switch (t.nodeType) {
    case 1:
      return t.ownerDocument;
    case 9:
      return t;
    case 11:
      return t;
  }
  return null;
}
function Ut(h) {
  const { documentElement: t } = h.ownerDocument, e = h.getBoundingClientRect();
  return { left: e.left + (P.pageXOffset - t.clientLeft), top: e.top + (P.pageYOffset - t.clientTop) };
}
const fi = /deg|g?rad|turn$/i;
function lt(h) {
  const t = parseFloat(h) || 0;
  if (t !== 0) {
    const [e = "rad"] = String(h).match(fi) || [];
    switch (e.toLowerCase()) {
      case "deg":
        return t / 360 * (Math.PI * 2);
      case "grad":
        return t / 400 * (Math.PI * 2);
      case "turn":
        return t * (Math.PI * 2);
    }
  }
  return t;
}
const he = "contain", mi = "cover";
function et(h, t = he) {
  const { aspectRatio: e } = h;
  let { width: i, height: s } = h;
  const n = R(i), o = R(s);
  if (n && o) {
    const r = s * e;
    t === he && r > i || t === mi && r < i ? s = i / e : i = s * e;
  } else n ? s = i / e : o && (i = s * e);
  return { width: i, height: s };
}
function Kt(h, ...t) {
  if (t.length === 0) return h;
  const [e, i, s, n, o, r] = h, [l, a, c, d, p, f] = t[0];
  return h = [e * l + s * a, i * l + n * a, e * c + s * d, i * c + n * d, e * p + s * f + o, i * p + n * f + r], Kt(h, ...t.slice(1));
}
var gi = ":host([hidden]){display:none!important}";
const vi = /left|top|width|height/i, ce = "open", ht = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new Map(), de = P.document && Array.isArray(P.document.adoptedStyleSheets) && "replaceSync" in P.CSSStyleSheet.prototype;
class _ extends HTMLElement {
  get $sharedStyle() {
    return `${this.themeColor ? `:host{--theme-color: ${this.themeColor};}` : ""}${gi}`;
  }
  constructor() {
    var t, e;
    super(), this.shadowRootMode = ce, this.slottable = true;
    const i = (e = (t = Object.getPrototypeOf(this)) === null || t === void 0 ? void 0 : t.constructor) === null || e === void 0 ? void 0 : e.$name;
    i && le.set(i, this.tagName.toLowerCase());
  }
  static get observedAttributes() {
    return ["shadow-root-mode", "slottable", "theme-color"];
  }
  attributeChangedCallback(t, e, i) {
    if (Object.is(i, e)) return;
    const s = Yt(t), n = this[s];
    let o = i;
    switch (typeof n) {
      case "boolean":
        o = i !== null && i !== "false";
        break;
      case "number":
        o = Number(i);
        break;
    }
    if (this[s] = o, t === "theme-color") {
      const r = ct.get(this), l = this.$sharedStyle;
      r && l && (de ? r.replaceSync(l) : r.textContent = l);
    }
  }
  $propertyChangedCallback(t, e, i) {
    if (!Object.is(i, e)) switch (t = Ht(t), typeof i) {
      case "boolean":
        i === true ? this.hasAttribute(t) || this.setAttribute(t, "") : this.removeAttribute(t);
        break;
      case "number":
        qt(i) ? i = "" : i = String(i);
      default:
        i ? this.getAttribute(t) !== i && this.setAttribute(t, i) : this.removeAttribute(t);
    }
  }
  connectedCallback() {
    Object.getPrototypeOf(this).constructor.observedAttributes.forEach((e) => {
      const i = Yt(e);
      let s = this[i];
      Oe(s) || this.$propertyChangedCallback(i, void 0, s), Object.defineProperty(this, i, { enumerable: true, configurable: true, get() {
        return s;
      }, set(n) {
        const o = s;
        s = n, this.$propertyChangedCallback(i, o, n);
      } });
    });
    const t = this.shadowRoot || this.attachShadow({ mode: this.shadowRootMode || ce });
    if (ht.set(this, t), ct.set(this, this.$addStyles(this.$sharedStyle)), this.$style && this.$addStyles(this.$style), this.$template) {
      const e = document.createElement("template");
      e.innerHTML = this.$template, t.appendChild(e.content);
    }
    if (this.slottable) {
      const e = document.createElement("slot");
      t.appendChild(e);
    }
  }
  disconnectedCallback() {
    ct.has(this) && ct.delete(this), ht.has(this) && ht.delete(this);
  }
  $getTagNameOf(t) {
    var e;
    return (e = le.get(t)) !== null && e !== void 0 ? e : t;
  }
  $setStyles(t) {
    return Object.keys(t).forEach((e) => {
      let i = t[e];
      $(i) && (i !== 0 && vi.test(e) ? i = `${i}px` : i = String(i)), this.style[e] = i;
    }), this;
  }
  $getShadowRoot() {
    return this.shadowRoot || ht.get(this);
  }
  $addStyles(t) {
    let e;
    const i = this.$getShadowRoot();
    return de ? (e = new CSSStyleSheet(), e.replaceSync(t), i.adoptedStyleSheets = i.adoptedStyleSheets.concat(e)) : (e = document.createElement("style"), e.textContent = t, i.appendChild(e)), e;
  }
  $emit(t, e, i) {
    return Me(this, t, e, i);
  }
  $nextTick(t) {
    return Ne(this, t);
  }
  static $define(t, e) {
    Bt(t) && (e = t, t = ""), t || (t = this.$name || this.name), t = Ht(t), rt && P.customElements && !P.customElements.get(t) && customElements.define(t, this, e);
  }
}
_.$version = "2.1.1";
var bi = ':host{display:block;min-height:100px;min-width:200px;overflow:hidden;position:relative;touch-action:none;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host([background]){background-color:#fff;background-image:repeating-linear-gradient(45deg,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc),repeating-linear-gradient(45deg,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc);background-image:repeating-conic-gradient(#ccc 0 25%,#fff 0 50%);background-position:0 0,.5rem .5rem;background-size:1rem 1rem}:host([disabled]){pointer-events:none}:host([disabled]):after{bottom:0;content:"";cursor:not-allowed;display:block;left:0;pointer-events:none;position:absolute;right:0;top:0}';
class bt extends _ {
  constructor() {
    super(...arguments), this.$onPointerDown = null, this.$onPointerMove = null, this.$onPointerUp = null, this.$onWheel = null, this.$wheeling = false, this.$pointers = /* @__PURE__ */ new Map(), this.$style = bi, this.$action = I, this.background = false, this.disabled = false, this.scaleStep = 0.1, this.themeColor = "#39f";
  }
  static get observedAttributes() {
    return super.observedAttributes.concat(["background", "disabled", "scale-step"]);
  }
  connectedCallback() {
    super.connectedCallback(), this.disabled || this.$bind();
  }
  disconnectedCallback() {
    this.disabled || this.$unbind(), super.disconnectedCallback();
  }
  $propertyChangedCallback(t, e, i) {
    Object.is(i, e) || (super.$propertyChangedCallback(t, e, i), t === "disabled" && (i ? this.$unbind() : this.$bind()));
  }
  $bind() {
    this.$onPointerDown || (this.$onPointerDown = this.$handlePointerDown.bind(this), S(this, _t, this.$onPointerDown)), this.$onPointerMove || (this.$onPointerMove = this.$handlePointerMove.bind(this), S(this.ownerDocument, Nt, this.$onPointerMove)), this.$onPointerUp || (this.$onPointerUp = this.$handlePointerUp.bind(this), S(this.ownerDocument, It, this.$onPointerUp)), this.$onWheel || (this.$onWheel = this.$handleWheel.bind(this), S(this, Xt, this.$onWheel, { passive: false, capture: true }));
  }
  $unbind() {
    this.$onPointerDown && (y(this, _t, this.$onPointerDown), this.$onPointerDown = null), this.$onPointerMove && (y(this.ownerDocument, Nt, this.$onPointerMove), this.$onPointerMove = null), this.$onPointerUp && (y(this.ownerDocument, It, this.$onPointerUp), this.$onPointerUp = null), this.$onWheel && (y(this, Xt, this.$onWheel, { capture: true }), this.$onWheel = null);
  }
  $handlePointerDown(t) {
    const { buttons: e, button: i, type: s } = t;
    if (this.disabled || (s === "pointerdown" && t.pointerType === "mouse" || s === "mousedown") && ($(e) && e !== 1 || $(i) && i !== 0 || t.ctrlKey)) return;
    const { $pointers: n } = this;
    let o = "";
    if (t.changedTouches) Array.from(t.changedTouches).forEach(({ identifier: r, pageX: l, pageY: a }) => {
      n.set(r, { startX: l, startY: a, endX: l, endY: a });
    });
    else {
      const { pointerId: r = 0, pageX: l, pageY: a } = t;
      n.set(r, { startX: l, startY: a, endX: l, endY: a });
    }
    n.size > 1 ? o = nt : Y(t.target) && (o = t.target.action || t.target.getAttribute(Re) || ""), this.$emit(X, { action: o, relatedEvent: t }) !== false && (t.preventDefault(), this.$action = o, this.style.willChange = "transform");
  }
  $handlePointerMove(t) {
    const { $action: e, $pointers: i } = this;
    if (this.disabled || e === I || i.size === 0 || this.$emit(De, { action: e, relatedEvent: t }) === false) return;
    if (t.preventDefault(), t.changedTouches) Array.from(t.changedTouches).forEach(({ identifier: n, pageX: o, pageY: r }) => {
      const l = i.get(n);
      l && Object.assign(l, { endX: o, endY: r });
    });
    else {
      const { pointerId: n = 0, pageX: o, pageY: r } = t, l = i.get(n);
      l && Object.assign(l, { endX: o, endY: r });
    }
    const s = { action: e, relatedEvent: t };
    if (e === nt) {
      const n = new Map(i);
      let o = 0, r = 0, l = 0, a = 0, c = t.pageX, d = t.pageY;
      i.forEach((u, C) => {
        n.delete(C), n.forEach((m) => {
          let w = m.startX - u.startX, v = m.startY - u.startY, g = m.endX - u.endX, b = m.endY - u.endY, E = 0, T = 0, x = 0, z = 0;
          if (w === 0 ? v < 0 ? x = Math.PI * 2 : v > 0 && (x = Math.PI) : w > 0 ? x = Math.PI / 2 + Math.atan(v / w) : w < 0 && (x = Math.PI * 1.5 + Math.atan(v / w)), g === 0 ? b < 0 ? z = Math.PI * 2 : b > 0 && (z = Math.PI) : g > 0 ? z = Math.PI / 2 + Math.atan(b / g) : g < 0 && (z = Math.PI * 1.5 + Math.atan(b / g)), z > 0 || x > 0) {
            const D = z - x, O = Math.abs(D);
            O > o && (o = O, l = D, c = (u.startX + m.startX) / 2, d = (u.startY + m.startY) / 2);
          }
          if (w = Math.abs(w), v = Math.abs(v), g = Math.abs(g), b = Math.abs(b), w > 0 && v > 0 ? E = Math.sqrt(w * w + v * v) : w > 0 ? E = w : v > 0 && (E = v), g > 0 && b > 0 ? T = Math.sqrt(g * g + b * b) : g > 0 ? T = g : b > 0 && (T = b), E > 0 && T > 0) {
            const D = (T - E) / E, O = Math.abs(D);
            O > r && (r = O, a = D, c = (u.startX + m.startX) / 2, d = (u.startY + m.startY) / 2);
          }
        });
      });
      const p = o > 0, f = r > 0;
      p && f ? (s.rotate = l, s.scale = a, s.centerX = c, s.centerY = d) : p ? (s.action = dt, s.rotate = l, s.centerX = c, s.centerY = d) : f ? (s.action = U, s.scale = a, s.centerX = c, s.centerY = d) : s.action = I;
    } else {
      const [n] = Array.from(i.values());
      Object.assign(s, n);
    }
    i.forEach((n) => {
      n.startX = n.endX, n.startY = n.endY;
    }), s.action !== I && this.$emit(Z, s, { cancelable: false });
  }
  $handlePointerUp(t) {
    const { $action: e, $pointers: i } = this;
    if (!(this.disabled || e === I) && this.$emit(j, { action: e, relatedEvent: t }) !== false) {
      if (t.preventDefault(), t.changedTouches) Array.from(t.changedTouches).forEach(({ identifier: s }) => {
        i.delete(s);
      });
      else {
        const { pointerId: s = 0 } = t;
        i.delete(s);
      }
      i.size === 0 && (this.style.willChange = "", this.$action = I);
    }
  }
  $handleWheel(t) {
    if (this.disabled || (t.preventDefault(), this.$wheeling)) return;
    this.$wheeling = true, setTimeout(() => {
      this.$wheeling = false;
    }, 50);
    const i = (t.deltaY > 0 ? -1 : 1) * this.scaleStep;
    this.$emit(Z, { action: U, scale: i, relatedEvent: t }, { cancelable: false });
  }
  $setAction(t) {
    return tt(t) && (this.$action = t), this;
  }
  $toCanvas(t) {
    return new Promise((e, i) => {
      if (!this.isConnected) {
        i(new Error("The current element is not connected to the DOM."));
        return;
      }
      const s = document.createElement("canvas");
      let n = this.offsetWidth, o = this.offsetHeight, r = 1;
      ot(t) && (R(t.width) || R(t.height)) && ({ width: n, height: o } = et({ aspectRatio: n / o, width: t.width, height: t.height }), r = n / this.offsetWidth), s.width = n, s.height = o;
      const l = this.querySelector(this.$getTagNameOf(F));
      if (!l) {
        e(s);
        return;
      }
      l.$ready().then((a) => {
        const c = s.getContext("2d");
        if (c) {
          const [d, p, f, u, C, m] = l.$getTransform();
          let w = C, v = m, g = a.naturalWidth, b = a.naturalHeight;
          r !== 1 && (w *= r, v *= r, g *= r, b *= r);
          const E = g / 2, T = b / 2;
          c.fillStyle = "transparent", c.fillRect(0, 0, n, o), ot(t) && vt(t.beforeDraw) && t.beforeDraw.call(this, c, s), c.save(), c.translate(E, T), c.transform(d, p, f, u, w, v), c.translate(-E, -T), c.drawImage(a, 0, 0, g, b), c.restore();
        }
        e(s);
      }).catch(i);
    });
  }
}
bt.$name = q;
bt.$version = "2.1.1";
var $i = ":host{display:inline-block}img{display:block;height:100%;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}";
const ue = /* @__PURE__ */ new WeakMap(), pe = ["alt", "crossorigin", "decoding", "elementtiming", "fetchpriority", "loading", "referrerpolicy", "sizes", "src", "srcset"];
class $t extends _ {
  constructor() {
    super(...arguments), this.$isReady = false, this.$matrix = [1, 0, 0, 1, 0, 0], this.$onLoad = null, this.$onCanvasAction = null, this.$onCanvasActionEnd = null, this.$onCanvasActionStart = null, this.$actionStartTarget = null, this.$style = $i, this.$image = new Image(), this.initialCenterSize = "contain", this.rotatable = false, this.scalable = false, this.skewable = false, this.slottable = false, this.translatable = false, this.alt = "", this.crossorigin = "", this.decoding = "", this.elementtiming = "", this.fetchpriority = "", this.loading = "", this.referrerpolicy = "", this.sizes = "", this.src = "", this.srcset = "";
  }
  set $canvas(t) {
    ue.set(this, t);
  }
  get $canvas() {
    return ue.get(this);
  }
  static get observedAttributes() {
    return super.observedAttributes.concat(pe, ["initial-center-size", "rotatable", "scalable", "skewable", "translatable"]);
  }
  attributeChangedCallback(t, e, i) {
    Object.is(i, e) || (super.attributeChangedCallback(t, e, i), pe.includes(t) && this.$image.setAttribute(t, i));
  }
  $propertyChangedCallback(t, e, i) {
    if (!Object.is(i, e)) switch (super.$propertyChangedCallback(t, e, i), t) {
      case "initialCenterSize":
        this.$nextTick(() => {
          this.$center(i);
        });
        break;
      case "src":
        this.$isReady = false;
        break;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    const { $image: t } = this, e = this.closest(this.$getTagNameOf(q));
    e && (this.$canvas = e, this.$setStyles({ display: "block", position: "absolute" }), this.$onCanvasActionStart = (i) => {
      var s, n;
      this.$actionStartTarget = (n = (s = i.detail) === null || s === void 0 ? void 0 : s.relatedEvent) === null || n === void 0 ? void 0 : n.target;
    }, this.$onCanvasActionEnd = () => {
      this.$actionStartTarget = null;
    }, this.$onCanvasAction = this.$handleAction.bind(this), S(e, X, this.$onCanvasActionStart), S(e, j, this.$onCanvasActionEnd), S(e, Z, this.$onCanvasAction)), this.$onLoad = this.$handleLoad.bind(this), S(t, H, this.$onLoad), this.$getShadowRoot().appendChild(t);
  }
  disconnectedCallback() {
    const { $image: t, $canvas: e } = this;
    e && (this.$onCanvasActionStart && (y(e, X, this.$onCanvasActionStart), this.$onCanvasActionStart = null), this.$onCanvasActionEnd && (y(e, j, this.$onCanvasActionEnd), this.$onCanvasActionEnd = null), this.$onCanvasAction && (y(e, Z, this.$onCanvasAction), this.$onCanvasAction = null)), t && this.$onLoad && (y(t, H, this.$onLoad), this.$onLoad = null), this.$getShadowRoot().removeChild(t), super.disconnectedCallback();
  }
  $handleLoad() {
    const { $image: t } = this;
    this.$setStyles({ width: t.naturalWidth, height: t.naturalHeight }), this.$canvas && this.$center(this.initialCenterSize), this.$isReady = true;
  }
  $handleAction(t) {
    if (this.hidden || !(this.rotatable || this.scalable || this.translatable)) return;
    const { $canvas: e } = this, { detail: i } = t;
    if (i) {
      const { relatedEvent: s } = i;
      let { action: n } = i;
      switch (n === nt && (!this.rotatable || !this.scalable) && (this.rotatable ? n = dt : this.scalable ? n = U : n = I), n) {
        case Zt:
          if (this.translatable) {
            let o = null;
            s && (o = s.target.closest(this.$getTagNameOf(M))), o || (o = e.querySelector(this.$getTagNameOf(M))), o && o.multiple && !o.active && (o = e.querySelector(`${this.$getTagNameOf(M)}[active]`)), (!o || o.hidden || !o.movable || o.dynamic || !(this.$actionStartTarget && o.contains(this.$actionStartTarget))) && this.$move(i.endX - i.startX, i.endY - i.startY);
          }
          break;
        case dt:
          if (this.rotatable) if (s) {
            const { x: o, y: r } = this.getBoundingClientRect();
            this.$rotate(i.rotate, s.clientX - o, s.clientY - r);
          } else this.$rotate(i.rotate);
          break;
        case U:
          if (this.scalable) if (s) {
            const o = s.target.closest(this.$getTagNameOf(M));
            if (!o || !o.zoomable || o.zoomable && o.dynamic) {
              const { x: r, y: l } = this.getBoundingClientRect();
              this.$zoom(i.scale, s.clientX - r, s.clientY - l);
            }
          } else this.$zoom(i.scale);
          break;
        case nt:
          if (this.rotatable && this.scalable) {
            const { rotate: o } = i;
            let { scale: r } = i;
            r < 0 ? r = 1 / (1 - r) : r += 1;
            const l = Math.cos(o), a = Math.sin(o), [c, d, p, f] = [l * r, a * r, -a * r, l * r];
            if (s) {
              const u = this.getBoundingClientRect(), C = s.clientX - u.x, m = s.clientY - u.y, [w, v, g, b] = this.$matrix, E = u.width / 2, T = u.height / 2, x = C - E, z = m - T, D = (x * b - g * z) / (w * b - g * v), O = (z * w - v * x) / (w * b - g * v);
              this.$transform(c, d, p, f, D * (1 - c) + O * p, O * (1 - f) + D * d);
            } else this.$transform(c, d, p, f, 0, 0);
          }
          break;
      }
    }
  }
  $ready(t) {
    const { $image: e } = this, i = new Promise((s, n) => {
      const o = new Error("Failed to load the image source");
      if (e.complete) e.naturalWidth > 0 && e.naturalHeight > 0 ? s(e) : n(o);
      else {
        const r = () => {
          y(e, Wt, l), setTimeout(() => {
            s(e);
          });
        }, l = () => {
          y(e, H, r), n(o);
        };
        Ft(e, H, r), Ft(e, Wt, l);
      }
    });
    return vt(t) && i.then((s) => (t(s), s)), i;
  }
  $center(t) {
    const { parentElement: e } = this;
    if (!e) return this;
    const i = e.getBoundingClientRect(), s = i.width, n = i.height, { x: o, y: r, width: l, height: a } = this.getBoundingClientRect(), c = o + l / 2, d = r + a / 2, p = i.x + s / 2, f = i.y + n / 2, { translatable: u } = this;
    if (!u && !this.$isReady && (this.translatable = true, this.$nextTick(() => {
      this.translatable = u;
    })), this.$move(p - c, f - d), t && (l !== s || a !== n)) {
      const C = s / l, m = n / a, { scalable: w } = this;
      switch (t && !w && !this.$isReady && (this.scalable = true, this.$nextTick(() => {
        this.scalable = w;
      })), t) {
        case "cover":
          this.$scale(Math.max(C, m));
          break;
        case "contain":
          this.$scale(Math.min(C, m));
          break;
      }
    }
    return this;
  }
  $move(t, e = t) {
    if (this.translatable && $(t) && $(e)) {
      const [i, s, n, o] = this.$matrix, r = (t * o - n * e) / (i * o - n * s), l = (e * i - s * t) / (i * o - n * s);
      this.$translate(r, l);
    }
    return this;
  }
  $moveTo(t, e = t) {
    if (this.translatable && $(t) && $(e)) {
      const [i, s, n, o] = this.$matrix, r = (t * o - n * e) / (i * o - n * s), l = (e * i - s * t) / (i * o - n * s);
      this.$setTransform(i, s, n, o, r, l);
    }
    return this;
  }
  $rotate(t, e, i) {
    if (this.rotatable) {
      const s = lt(t), n = Math.cos(s), o = Math.sin(s), [r, l, a, c] = [n, o, -o, n];
      if ($(e) && $(i)) {
        const [d, p, f, u] = this.$matrix, { width: C, height: m } = this.getBoundingClientRect(), w = C / 2, v = m / 2, g = e - w, b = i - v, E = (g * u - f * b) / (d * u - f * p), T = (b * d - p * g) / (d * u - f * p);
        this.$transform(r, l, a, c, E * (1 - r) - T * a, T * (1 - c) - E * l);
      } else this.$transform(r, l, a, c, 0, 0);
    }
    return this;
  }
  $zoom(t, e, i) {
    if (!this.scalable || t === 0) return this;
    if (t < 0 ? t = 1 / (1 - t) : t += 1, $(e) && $(i)) {
      const [s, n, o, r] = this.$matrix, { width: l, height: a } = this.getBoundingClientRect(), c = l / 2, d = a / 2, p = e - c, f = i - d, u = (p * r - o * f) / (s * r - o * n), C = (f * s - n * p) / (s * r - o * n);
      this.$transform(t, 0, 0, t, u * (1 - t), C * (1 - t));
    } else this.$scale(t);
    return this;
  }
  $scale(t, e = t) {
    return this.scalable && this.$transform(t, 0, 0, e, 0, 0), this;
  }
  $skew(t, e = 0) {
    if (this.skewable) {
      const i = lt(t), s = lt(e);
      this.$transform(1, Math.tan(s), Math.tan(i), 1, 0, 0);
    }
    return this;
  }
  $translate(t, e = t) {
    return this.translatable && $(t) && $(e) && this.$transform(1, 0, 0, 1, t, e), this;
  }
  $transform(t, e, i, s, n, o) {
    return $(t) && $(e) && $(i) && $(s) && $(n) && $(o) ? this.$setTransform(Kt(this.$matrix, [t, e, i, s, n, o])) : this;
  }
  $setTransform(t, e, i, s, n, o) {
    if ((this.rotatable || this.scalable || this.skewable || this.translatable) && (Array.isArray(t) && ([t, e, i, s, n, o] = t), $(t) && $(e) && $(i) && $(s) && $(n) && $(o))) {
      const r = [...this.$matrix], l = [t, e, i, s, n, o];
      if (this.$emit(ut, { matrix: l, oldMatrix: r }) === false) return this;
      this.$matrix = l, this.style.transform = `matrix(${l.join(", ")})`;
    }
    return this;
  }
  $getTransform() {
    return this.$matrix.slice();
  }
  $resetTransform() {
    return this.$setTransform([1, 0, 0, 1, 0, 0]);
  }
}
$t.$name = F;
$t.$version = "2.1.1";
var wi = ":host{display:block;height:0;left:0;outline:var(--theme-color) solid 1px;position:relative;top:0;width:0}:host([transparent]){outline-color:transparent}";
const fe = /* @__PURE__ */ new WeakMap();
class wt extends _ {
  constructor() {
    super(...arguments), this.$onWindowResize = null, this.$onCanvasActionEnd = null, this.$onCanvasActionStart = null, this.$onSelectionChange = null, this.$style = wi, this.x = 0, this.y = 0, this.width = 0, this.height = 0, this.slottable = false, this.themeColor = "rgba(0, 0, 0, 0.65)";
  }
  set $canvas(t) {
    fe.set(this, t);
  }
  get $canvas() {
    return fe.get(this);
  }
  static get observedAttributes() {
    return super.observedAttributes.concat(["height", "width", "x", "y"]);
  }
  connectedCallback() {
    super.connectedCallback();
    const t = this.closest(this.$getTagNameOf(q));
    if (t) {
      this.$canvas = t, this.style.position = "absolute";
      const e = t.querySelector(this.$getTagNameOf(M));
      e && (this.$onWindowResize = this.$render.bind(this), this.$onCanvasActionStart = (i) => {
        e.hidden && i.detail.action === st && (this.hidden = false);
      }, this.$onCanvasActionEnd = (i) => {
        e.hidden && i.detail.action === st && (this.hidden = true);
      }, this.$onSelectionChange = (i) => {
        const { x: s, y: n, width: o, height: r } = i.defaultPrevented ? e : i.detail;
        this.$change(s, n, o, r), (e.hidden || s === 0 && n === 0 && o === 0 && r === 0) && (this.hidden = true);
      }, S(window, jt, this.$onWindowResize), S(t, X, this.$onCanvasActionStart), S(t, j, this.$onCanvasActionEnd), S(t, W, this.$onSelectionChange));
    }
    this.$render();
  }
  disconnectedCallback() {
    const { $canvas: t } = this;
    t && (this.$onWindowResize && (y(window, jt, this.$onWindowResize), this.$onWindowResize = null), this.$onCanvasActionStart && (y(t, X, this.$onCanvasActionStart), this.$onCanvasActionStart = null), this.$onCanvasActionEnd && (y(t, j, this.$onCanvasActionEnd), this.$onCanvasActionEnd = null), this.$onSelectionChange && (y(t, W, this.$onSelectionChange), this.$onSelectionChange = null)), super.disconnectedCallback();
  }
  $change(t, e, i = this.width, s = this.height) {
    return !$(t) || !$(e) || !$(i) || !$(s) || t === this.x && e === this.y && i === this.width && s === this.height ? this : (this.hidden && (this.hidden = false), this.x = t, this.y = e, this.width = i, this.height = s, this.$render());
  }
  $reset() {
    return this.$change(0, 0, 0, 0);
  }
  $render() {
    return this.$setStyles({ transform: `translate(${this.x}px, ${this.y}px)`, width: this.width, height: this.height, outlineWidth: P.innerWidth * P.devicePixelRatio });
  }
}
wt.$name = Te;
wt.$version = "2.1.1";
var Ci = ':host{background-color:var(--theme-color);display:block}:host([action=move]),:host([action=select]){height:100%;left:0;position:absolute;top:0;width:100%}:host([action=move]){cursor:move}:host([action=select]){cursor:crosshair}:host([action$=-resize]){background-color:transparent;height:15px;position:absolute;width:15px}:host([action$=-resize]):after{background-color:var(--theme-color);content:"";display:block;height:5px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:5px}:host([action=n-resize]),:host([action=s-resize]){cursor:ns-resize;left:50%;transform:translateX(-50%);width:100%}:host([action=n-resize]){top:-8px}:host([action=s-resize]){bottom:-8px}:host([action=e-resize]),:host([action=w-resize]){cursor:ew-resize;height:100%;top:50%;transform:translateY(-50%)}:host([action=e-resize]){right:-8px}:host([action=w-resize]){left:-8px}:host([action=ne-resize]){cursor:nesw-resize;right:-8px;top:-8px}:host([action=nw-resize]){cursor:nwse-resize;left:-8px;top:-8px}:host([action=se-resize]){bottom:-8px;cursor:nwse-resize;right:-8px}:host([action=se-resize]):after{height:15px;width:15px}@media (pointer:coarse){:host([action=se-resize]):after{height:10px;width:10px}}@media (pointer:fine){:host([action=se-resize]):after{height:5px;width:5px}}:host([action=sw-resize]){bottom:-8px;cursor:nesw-resize;left:-8px}:host([plain]){background-color:transparent}';
class Ct extends _ {
  constructor() {
    super(...arguments), this.$onCanvasCropEnd = null, this.$onCanvasCropStart = null, this.$style = Ci, this.action = I, this.plain = false, this.slottable = false, this.themeColor = "rgba(51, 153, 255, 0.5)";
  }
  static get observedAttributes() {
    return super.observedAttributes.concat(["action", "plain"]);
  }
}
Ct.$name = Se;
Ct.$version = "2.1.1";
var Ei = ':host{display:block;left:0;position:relative;right:0}:host([outlined]){outline:1px solid var(--theme-color)}:host([multiple]){outline:1px dashed hsla(0,0%,100%,.5)}:host([multiple]):after{bottom:0;content:"";cursor:pointer;display:block;left:0;position:absolute;right:0;top:0}:host([multiple][active]){outline-color:var(--theme-color);z-index:1}:host([multiple])>*{visibility:hidden}:host([multiple][active])>*{visibility:visible}:host([multiple][active]):after{display:none}';
const me = /* @__PURE__ */ new WeakMap();
class Et extends _ {
  constructor() {
    super(...arguments), this.$onCanvasAction = null, this.$onCanvasActionStart = null, this.$onCanvasActionEnd = null, this.$onDocumentKeyDown = null, this.$action = "", this.$actionStartTarget = null, this.$changing = false, this.$style = Ei, this.$initialSelection = { x: 0, y: 0, width: 0, height: 0 }, this.x = 0, this.y = 0, this.width = 0, this.height = 0, this.aspectRatio = NaN, this.initialAspectRatio = NaN, this.initialCoverage = NaN, this.active = false, this.linked = false, this.dynamic = false, this.movable = false, this.resizable = false, this.zoomable = false, this.multiple = false, this.keyboard = false, this.outlined = false, this.precise = false;
  }
  set $canvas(t) {
    me.set(this, t);
  }
  get $canvas() {
    return me.get(this);
  }
  static get observedAttributes() {
    return super.observedAttributes.concat(["active", "aspect-ratio", "dynamic", "height", "initial-aspect-ratio", "initial-coverage", "keyboard", "linked", "movable", "multiple", "outlined", "precise", "resizable", "width", "x", "y", "zoomable"]);
  }
  $propertyChangedCallback(t, e, i) {
    if (!Object.is(i, e)) switch (super.$propertyChangedCallback(t, e, i), t) {
      case "x":
      case "y":
      case "width":
      case "height":
        this.$changing || this.$nextTick(() => {
          this.$change(this.x, this.y, this.width, this.height, this.aspectRatio, true);
        });
        break;
      case "aspectRatio":
      case "initialAspectRatio":
        this.$nextTick(() => {
          this.$initSelection();
        });
        break;
      case "initialCoverage":
        this.$nextTick(() => {
          R(i) && i <= 1 && this.$initSelection(true, true);
        });
        break;
      case "keyboard":
        this.$nextTick(() => {
          this.$canvas && (i ? this.$onDocumentKeyDown || (this.$onDocumentKeyDown = this.$handleKeyDown.bind(this), S(this.ownerDocument, Lt, this.$onDocumentKeyDown)) : this.$onDocumentKeyDown && (y(this.ownerDocument, Lt, this.$onDocumentKeyDown), this.$onDocumentKeyDown = null));
        });
        break;
      case "multiple":
        this.$nextTick(() => {
          if (this.$canvas) {
            const s = this.$getSelections();
            i ? (s.forEach((n) => {
              n.active = false;
            }), this.active = true, this.$emit(W, { x: this.x, y: this.y, width: this.width, height: this.height })) : (this.active = false, s.slice(1).forEach((n) => {
              this.$removeSelection(n);
            }));
          }
        });
        break;
      case "precise":
        this.$nextTick(() => {
          this.$change(this.x, this.y);
        });
        break;
      case "linked":
        i && (this.dynamic = true);
        break;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    const t = this.closest(this.$getTagNameOf(q));
    t ? (this.$canvas = t, this.$setStyles({ position: "absolute", transform: `translate(${this.x}px, ${this.y}px)` }), this.hidden || this.$render(), this.$initSelection(true), this.$onCanvasActionStart = this.$handleActionStart.bind(this), this.$onCanvasActionEnd = this.$handleActionEnd.bind(this), this.$onCanvasAction = this.$handleAction.bind(this), S(t, X, this.$onCanvasActionStart), S(t, j, this.$onCanvasActionEnd), S(t, Z, this.$onCanvasAction)) : this.$render();
  }
  disconnectedCallback() {
    const { $canvas: t } = this;
    t && (this.$onCanvasActionStart && (y(t, X, this.$onCanvasActionStart), this.$onCanvasActionStart = null), this.$onCanvasActionEnd && (y(t, j, this.$onCanvasActionEnd), this.$onCanvasActionEnd = null), this.$onCanvasAction && (y(t, Z, this.$onCanvasAction), this.$onCanvasAction = null)), super.disconnectedCallback();
  }
  $getSelections() {
    let t = [];
    return this.parentElement && (t = Array.from(this.parentElement.querySelectorAll(this.$getTagNameOf(M)))), t;
  }
  $initSelection(t = false, e = false) {
    const { initialCoverage: i, parentElement: s } = this;
    if (R(i) && s) {
      const n = this.aspectRatio || this.initialAspectRatio;
      let o = (e ? 0 : this.width) || s.offsetWidth * i, r = (e ? 0 : this.height) || s.offsetHeight * i;
      R(n) && ({ width: o, height: r } = et({ aspectRatio: n, width: o, height: r })), this.$change(this.x, this.y, o, r), t && this.$center(), this.$initialSelection = { x: this.x, y: this.y, width: this.width, height: this.height };
    }
  }
  $createSelection() {
    const t = this.cloneNode(true);
    return this.hasAttribute("id") && t.removeAttribute("id"), t.initialCoverage = NaN, this.active = false, this.parentElement && this.parentElement.insertBefore(t, this.nextSibling), t;
  }
  $removeSelection(t = this) {
    if (this.parentElement) {
      const e = this.$getSelections();
      if (e.length > 1) {
        const i = e.indexOf(t), s = e[i + 1] || e[i - 1];
        s && (t.active = false, this.parentElement.removeChild(t), s.active = true, s.$emit(W, { x: s.x, y: s.y, width: s.width, height: s.height }));
      } else this.$clear();
    }
  }
  $handleActionStart(t) {
    var e, i;
    const s = (i = (e = t.detail) === null || e === void 0 ? void 0 : e.relatedEvent) === null || i === void 0 ? void 0 : i.target;
    this.$action = "", this.$actionStartTarget = s, !this.hidden && this.multiple && !this.active && s === this && this.parentElement && (this.$getSelections().forEach((n) => {
      n.active = false;
    }), this.active = true, this.$emit(W, { x: this.x, y: this.y, width: this.width, height: this.height }));
  }
  $handleAction(t) {
    const { currentTarget: e, detail: i } = t;
    if (!e || !i) return;
    const { relatedEvent: s } = i;
    let { action: n } = i;
    const o = s ? _e(s) : null;
    if (!n && this.multiple && (n = this.$action || (o == null ? void 0 : o.action), this.$action = n), !n || this.hidden && n !== st || this.multiple && !this.active && n !== U) return;
    const { width: r, height: l } = this;
    let a = i.endX - i.startX, c = i.endY - i.startY, { aspectRatio: d } = this;
    switch (!R(d) && s.shiftKey && (d = R(r) && R(l) ? r / l : 1), n) {
      case st:
        if (a !== 0 || c !== 0) {
          a === 0 ? a = c : c === 0 && (c = a);
          const { $canvas: p } = this, f = Ut(e);
          (this.multiple && !this.hidden ? this.$createSelection() : this).$change(i.startX - f.left, i.startY - f.top, Math.abs(a), Math.abs(c), d), a < 0 ? c < 0 ? n = G : c > 0 && (n = V) : a > 0 && (c < 0 ? n = B : c > 0 && (n = K)), p && (p.$action = n);
        }
        break;
      case Zt:
        this.movable && (this.dynamic || this.$actionStartTarget && this.contains(this.$actionStartTarget)) && this.$move(a, c);
        break;
      case U:
        if (s && this.zoomable && (this.dynamic || this.contains(s.target))) {
          const p = Ut(e);
          this.$zoom(i.scale, s.pageX - p.left, s.pageY - p.top);
        }
        break;
      default:
        this.$resize(n, a, c, d);
    }
  }
  $handleActionEnd() {
    this.$action = "", this.$actionStartTarget = null;
  }
  $handleKeyDown(t) {
    if (this.hidden || !this.keyboard || this.multiple && !this.active || t.defaultPrevented) return;
    const { activeElement: e } = document;
    if (!(e && (["INPUT", "TEXTAREA"].includes(e.tagName) || ["true", "plaintext-only"].includes(e.contentEditable)))) switch (t.key) {
      case "Backspace":
        t.metaKey && (t.preventDefault(), this.$removeSelection());
        break;
      case "Delete":
        t.preventDefault(), this.$removeSelection();
        break;
      case "ArrowLeft":
        t.preventDefault(), this.$move(-1, 0);
        break;
      case "ArrowRight":
        t.preventDefault(), this.$move(1, 0);
        break;
      case "ArrowUp":
        t.preventDefault(), this.$move(0, -1);
        break;
      case "ArrowDown":
        t.preventDefault(), this.$move(0, 1);
        break;
      case "+":
        t.preventDefault(), this.$zoom(0.1);
        break;
      case "-":
        t.preventDefault(), this.$zoom(-0.1);
        break;
    }
  }
  $center() {
    const { parentElement: t } = this;
    if (!t) return this;
    const e = (t.offsetWidth - this.width) / 2, i = (t.offsetHeight - this.height) / 2;
    return this.$change(e, i);
  }
  $move(t, e = t) {
    return this.$moveTo(this.x + t, this.y + e);
  }
  $moveTo(t, e = t) {
    return this.movable ? this.$change(t, e) : this;
  }
  $resize(t, e = 0, i = 0, s = this.aspectRatio) {
    if (!this.resizable) return this;
    const n = R(s), { $canvas: o } = this;
    let { x: r, y: l, width: a, height: c } = this;
    switch (t) {
      case Dt:
        l += i, c -= i, c < 0 && (t = kt, c = -c, l -= c), n && (e = i * s, r += e / 2, a -= e, a < 0 && (a = -a, r -= a));
        break;
      case Ot:
        a += e, a < 0 && (t = Mt, a = -a, r -= a), n && (i = e / s, l -= i / 2, c += i, c < 0 && (c = -c, l -= c));
        break;
      case kt:
        c += i, c < 0 && (t = Dt, c = -c, l -= c), n && (e = i * s, r -= e / 2, a += e, a < 0 && (a = -a, r -= a));
        break;
      case Mt:
        r += e, a -= e, a < 0 && (t = Ot, a = -a, r -= a), n && (i = e / s, l += i / 2, c -= i, c < 0 && (c = -c, l -= c));
        break;
      case B:
        n && (i = -e / s), l += i, c -= i, a += e, a < 0 && c < 0 ? (t = V, a = -a, c = -c, r -= a, l -= c) : a < 0 ? (t = G, a = -a, r -= a) : c < 0 && (t = K, c = -c, l -= c);
        break;
      case G:
        n && (i = e / s), r += e, l += i, a -= e, c -= i, a < 0 && c < 0 ? (t = K, a = -a, c = -c, r -= a, l -= c) : a < 0 ? (t = B, a = -a, r -= a) : c < 0 && (t = V, c = -c, l -= c);
        break;
      case K:
        n && (i = e / s), a += e, c += i, a < 0 && c < 0 ? (t = G, a = -a, c = -c, r -= a, l -= c) : a < 0 ? (t = V, a = -a, r -= a) : c < 0 && (t = B, c = -c, l -= c);
        break;
      case V:
        n && (i = -e / s), r += e, a -= e, c += i, a < 0 && c < 0 ? (t = B, a = -a, c = -c, r -= a, l -= c) : a < 0 ? (t = K, a = -a, r -= a) : c < 0 && (t = G, c = -c, l -= c);
        break;
    }
    return o && o.$setAction(t), this.$change(r, l, a, c);
  }
  $zoom(t, e, i) {
    if (!this.zoomable || t === 0) return this;
    t < 0 ? t = 1 / (1 - t) : t += 1;
    const { width: s, height: n } = this, o = s * t, r = n * t;
    let l = this.x, a = this.y;
    return $(e) && $(i) ? (l -= (o - s) * ((e - this.x) / s), a -= (r - n) * ((i - this.y) / n)) : (l -= (o - s) / 2, a -= (r - n) / 2), this.$change(l, a, o, r);
  }
  $change(t, e, i = this.width, s = this.height, n = this.aspectRatio, o = false) {
    return this.$changing || !$(t) || !$(e) || !$(i) || !$(s) || i < 0 || s < 0 ? this : (R(n) && ({ width: i, height: s } = et({ aspectRatio: n, width: i, height: s }, "cover")), this.precise || (t = Math.round(t), e = Math.round(e), i = Math.round(i), s = Math.round(s)), t === this.x && e === this.y && i === this.width && s === this.height && Object.is(n, this.aspectRatio) && !o ? this : (this.hidden && (this.hidden = false), this.$emit(W, { x: t, y: e, width: i, height: s }) === false ? this : (this.$changing = true, this.x = t, this.y = e, this.width = i, this.height = s, this.$changing = false, this.$render())));
  }
  $reset() {
    const { x: t, y: e, width: i, height: s } = this.$initialSelection;
    return this.$change(t, e, i, s);
  }
  $clear() {
    return this.$change(0, 0, 0, 0, NaN, true), this.hidden = true, this;
  }
  $render() {
    return this.$setStyles({ transform: `translate(${this.x}px, ${this.y}px)`, width: this.width, height: this.height });
  }
  $toCanvas(t) {
    return new Promise((e, i) => {
      if (!this.isConnected) {
        i(new Error("The current element is not connected to the DOM."));
        return;
      }
      const s = document.createElement("canvas");
      let { width: n, height: o } = this, r = 1;
      if (ot(t) && (R(t.width) || R(t.height)) && ({ width: n, height: o } = et({ aspectRatio: n / o, width: t.width, height: t.height }), r = n / this.width), s.width = n, s.height = o, !this.$canvas) {
        e(s);
        return;
      }
      const l = this.$canvas.querySelector(this.$getTagNameOf(F));
      if (!l) {
        e(s);
        return;
      }
      l.$ready().then((a) => {
        const c = s.getContext("2d");
        if (c) {
          const [d, p, f, u, C, m] = l.$getTransform(), w = -this.x, v = -this.y, g = (w * u - f * v) / (d * u - f * p), b = (v * d - p * w) / (d * u - f * p);
          let E = d * g + f * b + C, T = p * g + u * b + m, x = a.naturalWidth, z = a.naturalHeight;
          r !== 1 && (E *= r, T *= r, x *= r, z *= r);
          const D = x / 2, O = z / 2;
          c.fillStyle = "transparent", c.fillRect(0, 0, n, o), ot(t) && vt(t.beforeDraw) && t.beforeDraw.call(this, c, s), c.save(), c.translate(D, O), c.transform(d, p, f, u, E, T), c.translate(-D, -O), c.drawImage(a, 0, 0, x, z), c.restore();
        }
        e(s);
      }).catch(i);
    });
  }
}
Et.$name = M;
Et.$version = "2.1.1";
var yi = ":host{display:flex;flex-direction:column;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host([bordered]){border:1px dashed var(--theme-color)}:host([covered]){bottom:0;left:0;position:absolute;right:0;top:0}:host>span{display:flex;flex:1}:host>span+span{border-top:1px dashed var(--theme-color)}:host>span>span{flex:1}:host>span>span+span{border-left:1px dashed var(--theme-color)}";
class yt extends _ {
  constructor() {
    super(...arguments), this.$style = yi, this.bordered = false, this.columns = 3, this.covered = false, this.rows = 3, this.slottable = false, this.themeColor = "rgba(238, 238, 238, 0.5)";
  }
  static get observedAttributes() {
    return super.observedAttributes.concat(["bordered", "columns", "covered", "rows"]);
  }
  $propertyChangedCallback(t, e, i) {
    Object.is(i, e) || (super.$propertyChangedCallback(t, e, i), (t === "rows" || t === "columns") && this.$nextTick(() => {
      this.$render();
    }));
  }
  connectedCallback() {
    super.connectedCallback(), this.$render();
  }
  $render() {
    const t = this.$getShadowRoot(), e = document.createDocumentFragment();
    for (let i = 0; i < this.rows; i += 1) {
      const s = document.createElement("span");
      s.setAttribute("role", "row");
      for (let n = 0; n < this.columns; n += 1) {
        const o = document.createElement("span");
        o.setAttribute("role", "gridcell"), s.appendChild(o);
      }
      e.appendChild(s);
    }
    t && (t.innerHTML = "", t.appendChild(e));
  }
}
yt.$name = ye;
yt.$version = "2.1.1";
var Si = ':host{display:inline-block;height:1em;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle;width:1em}:host:after,:host:before{background-color:var(--theme-color);content:"";display:block;position:absolute}:host:before{height:1px;left:0;top:50%;transform:translateY(-50%);width:100%}:host:after{height:100%;left:50%;top:0;transform:translateX(-50%);width:1px}:host([centered]){left:50%;position:absolute;top:50%;transform:translate(-50%,-50%)}';
class St extends _ {
  constructor() {
    super(...arguments), this.$style = Si, this.centered = false, this.slottable = false, this.themeColor = "rgba(238, 238, 238, 0.5)";
  }
  static get observedAttributes() {
    return super.observedAttributes.concat(["centered"]);
  }
}
St.$name = Ee;
St.$version = "2.1.1";
var Ti = ":host{display:block;height:100%;overflow:hidden;position:relative;width:100%}";
const ge = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), Ai = "both", Ri = "horizontal", we = "vertical", xi = "none";
class Tt extends _ {
  constructor() {
    super(...arguments), this.$onSelectionChange = null, this.$onSourceImageLoad = null, this.$onSourceImageTransform = null, this.$scale = 1, this.$style = Ti, this.resize = we, this.selection = "", this.slottable = false;
  }
  set $image(t) {
    ve.set(this, t);
  }
  get $image() {
    return ve.get(this);
  }
  set $sourceImage(t) {
    $e.set(this, t);
  }
  get $sourceImage() {
    return $e.get(this);
  }
  set $canvas(t) {
    ge.set(this, t);
  }
  get $canvas() {
    return ge.get(this);
  }
  set $selection(t) {
    be.set(this, t);
  }
  get $selection() {
    return be.get(this);
  }
  static get observedAttributes() {
    return super.observedAttributes.concat(["resize", "selection"]);
  }
  connectedCallback() {
    var t, e;
    super.connectedCallback();
    let i = null;
    if (this.selection ? i = (e = (t = Gt(this)) === null || t === void 0 ? void 0 : t.querySelector(this.selection)) !== null && e !== void 0 ? e : null : i = this.closest(this.$getTagNameOf(M)), Y(i)) {
      this.$selection = i, this.$onSelectionChange = this.$handleSelectionChange.bind(this), S(i, W, this.$onSelectionChange);
      const s = i.closest(this.$getTagNameOf(q));
      if (s) {
        this.$canvas = s;
        const n = s.querySelector(this.$getTagNameOf(F));
        n && (this.$sourceImage = n, this.$image = n.cloneNode(true), this.$getShadowRoot().appendChild(this.$image), this.$onSourceImageLoad = this.$handleSourceImageLoad.bind(this), this.$onSourceImageTransform = this.$handleSourceImageTransform.bind(this), S(n.$image, H, this.$onSourceImageLoad), S(n, ut, this.$onSourceImageTransform));
      }
      this.$render();
    }
  }
  disconnectedCallback() {
    const { $selection: t, $sourceImage: e } = this;
    t && this.$onSelectionChange && (y(t, W, this.$onSelectionChange), this.$onSelectionChange = null), e && this.$onSourceImageLoad && (y(e.$image, H, this.$onSourceImageLoad), this.$onSourceImageLoad = null), e && this.$onSourceImageTransform && (y(e, ut, this.$onSourceImageTransform), this.$onSourceImageTransform = null), super.disconnectedCallback();
  }
  $handleSelectionChange(t) {
    this.$render(t.defaultPrevented ? this.$selection : t.detail);
  }
  $handleSourceImageLoad() {
    const { $image: t, $sourceImage: e } = this, i = t.getAttribute("src"), s = e.getAttribute("src");
    s && s !== i && (t.setAttribute("src", s), t.$ready(() => {
      this.$render();
    }));
  }
  $handleSourceImageTransform(t) {
    this.$render(void 0, t.detail.matrix);
  }
  $render(t, e) {
    const { $canvas: i, $selection: s } = this;
    !t && !s.hidden && (t = s), (!t || t.x === 0 && t.y === 0 && t.width === 0 && t.height === 0) && (t = { x: 0, y: 0, width: i.offsetWidth, height: i.offsetHeight });
    const { x: n, y: o, width: r, height: l } = t, a = {}, { clientWidth: c, clientHeight: d } = this;
    let p = c, f = d, u = NaN;
    switch (this.resize) {
      case Ai:
        u = 1, p = r, f = l, a.width = r, a.height = l;
        break;
      case Ri:
        u = l > 0 ? d / l : 0, p = r * u, a.width = p;
        break;
      case we:
        u = r > 0 ? c / r : 0, f = l * u, a.height = f;
        break;
      case xi:
      default:
        c > 0 ? u = r > 0 ? c / r : 0 : d > 0 && (u = l > 0 ? d / l : 0);
    }
    this.$scale = u, this.$setStyles(a), this.$sourceImage && setTimeout(() => {
      this.$transformImageByOffset(e ?? this.$sourceImage.$getTransform(), -n, -o);
    });
  }
  $transformImageByOffset(t, e, i) {
    const { $image: s, $scale: n, $sourceImage: o } = this;
    if (o && s && n >= 0) {
      const [r, l, a, c, d, p] = t, f = (e * c - a * i) / (r * c - a * l), u = (i * r - l * e) / (r * c - a * l), C = r * f + a * u + d, m = l * f + c * u + p;
      o.$ready((w) => {
        this.$setStyles.call(s, { width: w.naturalWidth * n, height: w.naturalHeight * n });
      }), s.$setTransform(r, l, a, c, C * n, m * n);
    }
  }
}
Tt.$name = Ae;
Tt.$version = "2.1.1";
var Ie = '<cropper-canvas background><cropper-image rotatable scalable skewable translatable></cropper-image><cropper-shade hidden></cropper-shade><cropper-handle action="select" plain></cropper-handle><cropper-selection initial-coverage="0.5" movable resizable><cropper-grid role="grid" bordered covered></cropper-grid><cropper-crosshair centered></cropper-crosshair><cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle><cropper-handle action="n-resize"></cropper-handle><cropper-handle action="e-resize"></cropper-handle><cropper-handle action="s-resize"></cropper-handle><cropper-handle action="w-resize"></cropper-handle><cropper-handle action="ne-resize"></cropper-handle><cropper-handle action="nw-resize"></cropper-handle><cropper-handle action="se-resize"></cropper-handle><cropper-handle action="sw-resize"></cropper-handle></cropper-selection></cropper-canvas>';
const zi = /^img|canvas$/, Pi = /<(\/?(?:script|style)[^>]*)>/gi, Ce = { template: Ie };
bt.$define();
St.$define();
yt.$define();
Ct.$define();
$t.$define();
Et.$define();
wt.$define();
Tt.$define();
class We {
  constructor(t, e) {
    var i;
    if (this.options = Ce, tt(t) && (t = document.querySelector(t)), !Y(t) || !zi.test(t.localName)) throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = t, e = Object.assign(Object.assign({}, Ce), e), this.options = e;
    let { container: s } = e;
    if (s && (tt(s) && (s = (i = Gt(t)) === null || i === void 0 ? void 0 : i.querySelector(s)), !Y(s))) throw new Error("The `container` option must be an element or a valid selector.");
    Y(s) || (t.parentElement ? s = t.parentElement : s = t.ownerDocument.body), this.container = s;
    const n = t.localName;
    let o = "";
    n === "img" ? { src: o } = t : n === "canvas" && window.HTMLCanvasElement && (o = t.toDataURL());
    const { template: r } = e;
    if (r && tt(r)) {
      const l = document.createElement("template"), a = document.createDocumentFragment();
      l.innerHTML = r.replace(Pi, "&lt;$1&gt;"), a.appendChild(l.content), Array.from(a.querySelectorAll(F)).forEach((c) => {
        c.setAttribute("src", o), c.setAttribute("alt", t.alt || "The image to crop"), n === "img" && ["crossorigin", "decoding", "elementtiming", "fetchpriority", "loading", "referrerpolicy", "sizes", "srcset"].forEach((d) => {
          t.hasAttribute(d) && c.setAttribute(d, t.getAttribute(d) || "");
        });
      }), t.parentElement ? (t.style.display = "none", s.insertBefore(a, t.nextSibling)) : s.appendChild(a);
    }
  }
  getCropperCanvas() {
    return this.container.querySelector(q);
  }
  getCropperImage() {
    return this.container.querySelector(F);
  }
  getCropperSelection() {
    return this.container.querySelector(M);
  }
  getCropperSelections() {
    return this.container.querySelectorAll(M);
  }
  destroy() {
    var t;
    const e = this.getCropperCanvas();
    e && ((t = e.parentElement) === null || t === void 0 || t.removeChild(e)), this.element && (this.element.style.display = "");
  }
}
We.version = "2.1.1";
const ki = Object.freeze(Object.defineProperty({ __proto__: null, ACTION_MOVE: Zt, ACTION_NONE: I, ACTION_RESIZE_EAST: Ot, ACTION_RESIZE_NORTH: Dt, ACTION_RESIZE_NORTHEAST: B, ACTION_RESIZE_NORTHWEST: G, ACTION_RESIZE_SOUTH: kt, ACTION_RESIZE_SOUTHEAST: K, ACTION_RESIZE_SOUTHWEST: V, ACTION_RESIZE_WEST: Mt, ACTION_ROTATE: dt, ACTION_SCALE: U, ACTION_SELECT: st, ACTION_TRANSFORM: nt, ATTRIBUTE_ACTION: Re, CROPPER_CANVAS: q, CROPPER_CROSSHAIR: Ee, CROPPER_GIRD: ye, CROPPER_HANDLE: Se, CROPPER_IMAGE: F, CROPPER_SELECTION: M, CROPPER_SHADE: Te, CROPPER_VIEWER: Ae, CropperCanvas: bt, CropperCrosshair: St, CropperElement: _, CropperGrid: yt, CropperHandle: Ct, CropperImage: $t, CropperSelection: Et, CropperShade: wt, CropperViewer: Tt, DEFAULT_TEMPLATE: Ie, EVENT_ACTION: Z, EVENT_ACTION_END: j, EVENT_ACTION_MOVE: De, EVENT_ACTION_START: X, EVENT_CHANGE: W, EVENT_ERROR: Wt, EVENT_KEYDOWN: Lt, EVENT_LOAD: H, EVENT_POINTER_DOWN: _t, EVENT_POINTER_MOVE: Nt, EVENT_POINTER_UP: It, EVENT_RESIZE: jt, EVENT_TOUCH_END: xe, EVENT_TOUCH_MOVE: ze, EVENT_TOUCH_START: Pe, EVENT_TRANSFORM: ut, EVENT_WHEEL: Xt, HAS_POINTER_EVENT: gt, IS_BROWSER: rt, IS_TOUCH_DEVICE: mt, NAMESPACE: L, WINDOW: P, default: We, emit: Me, getAdjustedSizes: et, getComposedPathTarget: _e, getOffset: Ut, getRootDocument: Gt, isElement: Y, isFunction: vt, isNaN: qt, isNumber: $, isObject: Bt, isPlainObject: ot, isPositiveNumber: R, isString: tt, isUndefined: Oe, multiplyMatrices: Kt, nextTick: Ne, off: y, on: S, once: Ft, toAngleInRadian: lt, toCamelCase: Yt, toKebabCase: Ht }, Symbol.toStringTag, { value: "Module" }));
export {
  ki as c,
  si as g,
  Oi as s
};
