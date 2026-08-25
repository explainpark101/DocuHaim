import { f3 as a, dC as O, dD as e } from "./index-DZXxTXv9.js";
import { listen as S, once as k, emit as L, emitTo as A, TauriEvent as o } from "./event-Csb6miDR.js";
import "./vendor-react-SY5QCjFA.js";
import "./vendor-md-editor-CyUZNHY0.js";
import "./vendor-aws-BNw5jQBi.js";
import "./vendor-lucide-CLhpI-Mc.js";
import "./vendor-motion-YU7ZxHqi.js";
import "./vendor-radix--fTcLYkF.js";
import "./vendor-zip-Bez6qchM.js";
class x {
  constructor(...i) {
    this.type = "Logical", i.length === 1 ? "Logical" in i[0] ? (this.width = i[0].Logical.width, this.height = i[0].Logical.height) : (this.width = i[0].width, this.height = i[0].height) : (this.width = i[0], this.height = i[1]);
  }
  toPhysical(i) {
    return new h(this.width * i, this.height * i);
  }
  [a]() {
    return { width: this.width, height: this.height };
  }
  toJSON() {
    return this[a]();
  }
}
class h {
  constructor(...i) {
    this.type = "Physical", i.length === 1 ? "Physical" in i[0] ? (this.width = i[0].Physical.width, this.height = i[0].Physical.height) : (this.width = i[0].width, this.height = i[0].height) : (this.width = i[0], this.height = i[1]);
  }
  toLogical(i) {
    return new x(this.width / i, this.height / i);
  }
  [a]() {
    return { width: this.width, height: this.height };
  }
  toJSON() {
    return this[a]();
  }
}
class c {
  constructor(i) {
    this.size = i;
  }
  toLogical(i) {
    return this.size instanceof x ? this.size : this.size.toLogical(i);
  }
  toPhysical(i) {
    return this.size instanceof h ? this.size : this.size.toPhysical(i);
  }
  [a]() {
    return { [`${this.size.type}`]: { width: this.size.width, height: this.size.height } };
  }
  toJSON() {
    return this[a]();
  }
}
class W {
  constructor(...i) {
    this.type = "Logical", i.length === 1 ? "Logical" in i[0] ? (this.x = i[0].Logical.x, this.y = i[0].Logical.y) : (this.x = i[0].x, this.y = i[0].y) : (this.x = i[0], this.y = i[1]);
  }
  toPhysical(i) {
    return new u(this.x * i, this.y * i);
  }
  [a]() {
    return { x: this.x, y: this.y };
  }
  toJSON() {
    return this[a]();
  }
}
class u {
  constructor(...i) {
    this.type = "Physical", i.length === 1 ? "Physical" in i[0] ? (this.x = i[0].Physical.x, this.y = i[0].Physical.y) : (this.x = i[0].x, this.y = i[0].y) : (this.x = i[0], this.y = i[1]);
  }
  toLogical(i) {
    return new W(this.x / i, this.y / i);
  }
  [a]() {
    return { x: this.x, y: this.y };
  }
  toJSON() {
    return this[a]();
  }
}
class d {
  constructor(i) {
    this.position = i;
  }
  toLogical(i) {
    return this.position instanceof W ? this.position : this.position.toLogical(i);
  }
  toPhysical(i) {
    return this.position instanceof u ? this.position : this.position.toPhysical(i);
  }
  [a]() {
    return { [`${this.position.type}`]: { x: this.position.x, y: this.position.y } };
  }
  toJSON() {
    return this[a]();
  }
}
class w extends O {
  constructor(i) {
    super(i);
  }
  static async new(i, n, l) {
    return e("plugin:image|new", { rgba: b(i), width: n, height: l }).then((r) => new w(r));
  }
  static async fromBytes(i) {
    return e("plugin:image|from_bytes", { bytes: b(i) }).then((n) => new w(n));
  }
  static async fromPath(i) {
    return e("plugin:image|from_path", { path: i }).then((n) => new w(n));
  }
  async rgba() {
    return e("plugin:image|rgba", { rid: this.rid }).then((i) => new Uint8Array(i));
  }
  async size() {
    return e("plugin:image|size", { rid: this.rid });
  }
}
function b(t) {
  return t == null ? null : typeof t == "string" ? t : t instanceof w ? t.rid : t;
}
var _;
(function(t) {
  t[t.Critical = 1] = "Critical", t[t.Informational = 2] = "Informational";
})(_ || (_ = {}));
class I {
  constructor(i) {
    this._preventDefault = false, this.event = i.event, this.id = i.id;
  }
  preventDefault() {
    this._preventDefault = true;
  }
  isPreventDefault() {
    return this._preventDefault;
  }
}
var m;
(function(t) {
  t.None = "none", t.Normal = "normal", t.Indeterminate = "indeterminate", t.Paused = "paused", t.Error = "error";
})(m || (m = {}));
function T() {
  return new C(window.__TAURI_INTERNALS__.metadata.currentWindow.label, { skip: true });
}
async function y() {
  return e("plugin:window|get_all_windows").then((t) => t.map((i) => new C(i, { skip: true })));
}
const g = ["tauri://created", "tauri://error"];
class C {
  constructor(i, n = {}) {
    var l;
    this.label = i, this.listeners = /* @__PURE__ */ Object.create(null), (n == null ? void 0 : n.skip) || e("plugin:window|create", { options: { ...n, parent: typeof n.parent == "string" ? n.parent : (l = n.parent) === null || l === void 0 ? void 0 : l.label, label: i } }).then(async () => this.emit("tauri://created")).catch(async (r) => this.emit("tauri://error", r));
  }
  static async getByLabel(i) {
    var n;
    return (n = (await y()).find((l) => l.label === i)) !== null && n !== void 0 ? n : null;
  }
  static getCurrent() {
    return T();
  }
  static async getAll() {
    return y();
  }
  static async getFocusedWindow() {
    for (const i of await y()) if (await i.isFocused()) return i;
    return null;
  }
  async listen(i, n) {
    return this._handleTauriEvent(i, n) ? () => {
      const l = this.listeners[i];
      l.splice(l.indexOf(n), 1);
    } : S(i, n, { target: { kind: "Window", label: this.label } });
  }
  async once(i, n) {
    return this._handleTauriEvent(i, n) ? () => {
      const l = this.listeners[i];
      l.splice(l.indexOf(n), 1);
    } : k(i, n, { target: { kind: "Window", label: this.label } });
  }
  async emit(i, n) {
    if (g.includes(i)) {
      for (const l of this.listeners[i] || []) l({ event: i, id: -1, payload: n });
      return;
    }
    return L(i, n);
  }
  async emitTo(i, n, l) {
    if (g.includes(n)) {
      for (const r of this.listeners[n] || []) r({ event: n, id: -1, payload: l });
      return;
    }
    return A(i, n, l);
  }
  _handleTauriEvent(i, n) {
    return g.includes(i) ? (i in this.listeners ? this.listeners[i].push(n) : this.listeners[i] = [n], true) : false;
  }
  async scaleFactor() {
    return e("plugin:window|scale_factor", { label: this.label });
  }
  async innerPosition() {
    return e("plugin:window|inner_position", { label: this.label }).then((i) => new u(i));
  }
  async outerPosition() {
    return e("plugin:window|outer_position", { label: this.label }).then((i) => new u(i));
  }
  async innerSize() {
    return e("plugin:window|inner_size", { label: this.label }).then((i) => new h(i));
  }
  async outerSize() {
    return e("plugin:window|outer_size", { label: this.label }).then((i) => new h(i));
  }
  async isFullscreen() {
    return e("plugin:window|is_fullscreen", { label: this.label });
  }
  async isMinimized() {
    return e("plugin:window|is_minimized", { label: this.label });
  }
  async isMaximized() {
    return e("plugin:window|is_maximized", { label: this.label });
  }
  async isFocused() {
    return e("plugin:window|is_focused", { label: this.label });
  }
  async isDecorated() {
    return e("plugin:window|is_decorated", { label: this.label });
  }
  async isResizable() {
    return e("plugin:window|is_resizable", { label: this.label });
  }
  async isMaximizable() {
    return e("plugin:window|is_maximizable", { label: this.label });
  }
  async isMinimizable() {
    return e("plugin:window|is_minimizable", { label: this.label });
  }
  async isClosable() {
    return e("plugin:window|is_closable", { label: this.label });
  }
  async isVisible() {
    return e("plugin:window|is_visible", { label: this.label });
  }
  async title() {
    return e("plugin:window|title", { label: this.label });
  }
  async theme() {
    return e("plugin:window|theme", { label: this.label });
  }
  async isAlwaysOnTop() {
    return e("plugin:window|is_always_on_top", { label: this.label });
  }
  async activityName() {
    return e("plugin:window|activity_name", { label: this.label });
  }
  async sceneIdentifier() {
    return e("plugin:window|scene_identifier", { label: this.label });
  }
  async center() {
    return e("plugin:window|center", { label: this.label });
  }
  async requestUserAttention(i) {
    let n = null;
    return i && (i === _.Critical ? n = { type: "Critical" } : n = { type: "Informational" }), e("plugin:window|request_user_attention", { label: this.label, value: n });
  }
  async setResizable(i) {
    return e("plugin:window|set_resizable", { label: this.label, value: i });
  }
  async setEnabled(i) {
    return e("plugin:window|set_enabled", { label: this.label, value: i });
  }
  async isEnabled() {
    return e("plugin:window|is_enabled", { label: this.label });
  }
  async setMaximizable(i) {
    return e("plugin:window|set_maximizable", { label: this.label, value: i });
  }
  async setMinimizable(i) {
    return e("plugin:window|set_minimizable", { label: this.label, value: i });
  }
  async setClosable(i) {
    return e("plugin:window|set_closable", { label: this.label, value: i });
  }
  async setTitle(i) {
    return e("plugin:window|set_title", { label: this.label, value: i });
  }
  async maximize() {
    return e("plugin:window|maximize", { label: this.label });
  }
  async unmaximize() {
    return e("plugin:window|unmaximize", { label: this.label });
  }
  async toggleMaximize() {
    return e("plugin:window|toggle_maximize", { label: this.label });
  }
  async minimize() {
    return e("plugin:window|minimize", { label: this.label });
  }
  async unminimize() {
    return e("plugin:window|unminimize", { label: this.label });
  }
  async show() {
    return e("plugin:window|show", { label: this.label });
  }
  async hide() {
    return e("plugin:window|hide", { label: this.label });
  }
  async close() {
    return e("plugin:window|close", { label: this.label });
  }
  async destroy() {
    return e("plugin:window|destroy", { label: this.label });
  }
  async setDecorations(i) {
    return e("plugin:window|set_decorations", { label: this.label, value: i });
  }
  async setShadow(i) {
    return e("plugin:window|set_shadow", { label: this.label, value: i });
  }
  async setEffects(i) {
    return e("plugin:window|set_effects", { label: this.label, value: i });
  }
  async clearEffects() {
    return e("plugin:window|set_effects", { label: this.label, value: null });
  }
  async setAlwaysOnTop(i) {
    return e("plugin:window|set_always_on_top", { label: this.label, value: i });
  }
  async setAlwaysOnBottom(i) {
    return e("plugin:window|set_always_on_bottom", { label: this.label, value: i });
  }
  async setContentProtected(i) {
    return e("plugin:window|set_content_protected", { label: this.label, value: i });
  }
  async setSize(i) {
    return e("plugin:window|set_size", { label: this.label, value: i instanceof c ? i : new c(i) });
  }
  async setMinSize(i) {
    return e("plugin:window|set_min_size", { label: this.label, value: i instanceof c ? i : i ? new c(i) : null });
  }
  async setMaxSize(i) {
    return e("plugin:window|set_max_size", { label: this.label, value: i instanceof c ? i : i ? new c(i) : null });
  }
  async setSizeConstraints(i) {
    function n(l) {
      return l ? { Logical: l } : null;
    }
    return e("plugin:window|set_size_constraints", { label: this.label, value: { minWidth: n(i == null ? void 0 : i.minWidth), minHeight: n(i == null ? void 0 : i.minHeight), maxWidth: n(i == null ? void 0 : i.maxWidth), maxHeight: n(i == null ? void 0 : i.maxHeight) } });
  }
  async setPosition(i) {
    return e("plugin:window|set_position", { label: this.label, value: i instanceof d ? i : new d(i) });
  }
  async setFullscreen(i) {
    return e("plugin:window|set_fullscreen", { label: this.label, value: i });
  }
  async setSimpleFullscreen(i) {
    return e("plugin:window|set_simple_fullscreen", { label: this.label, value: i });
  }
  async setFocus() {
    return e("plugin:window|set_focus", { label: this.label });
  }
  async setFocusable(i) {
    return e("plugin:window|set_focusable", { label: this.label, value: i });
  }
  async setIcon(i) {
    return e("plugin:window|set_icon", { label: this.label, value: b(i) });
  }
  async setSkipTaskbar(i) {
    return e("plugin:window|set_skip_taskbar", { label: this.label, value: i });
  }
  async setCursorGrab(i) {
    return e("plugin:window|set_cursor_grab", { label: this.label, value: i });
  }
  async setCursorVisible(i) {
    return e("plugin:window|set_cursor_visible", { label: this.label, value: i });
  }
  async setCursorIcon(i) {
    return e("plugin:window|set_cursor_icon", { label: this.label, value: i });
  }
  async setBackgroundColor(i) {
    return e("plugin:window|set_background_color", { color: i });
  }
  async setCursorPosition(i) {
    return e("plugin:window|set_cursor_position", { label: this.label, value: i instanceof d ? i : new d(i) });
  }
  async setIgnoreCursorEvents(i) {
    return e("plugin:window|set_ignore_cursor_events", { label: this.label, value: i });
  }
  async startDragging() {
    return e("plugin:window|start_dragging", { label: this.label });
  }
  async startResizeDragging(i) {
    return e("plugin:window|start_resize_dragging", { label: this.label, value: i });
  }
  async setBadgeCount(i) {
    return e("plugin:window|set_badge_count", { label: this.label, value: i });
  }
  async setBadgeLabel(i) {
    return e("plugin:window|set_badge_label", { label: this.label, value: i });
  }
  async setOverlayIcon(i) {
    return e("plugin:window|set_overlay_icon", { label: this.label, value: i ? b(i) : void 0 });
  }
  async setProgressBar(i) {
    return e("plugin:window|set_progress_bar", { label: this.label, value: i });
  }
  async setVisibleOnAllWorkspaces(i) {
    return e("plugin:window|set_visible_on_all_workspaces", { label: this.label, value: i });
  }
  async setTitleBarStyle(i) {
    return e("plugin:window|set_title_bar_style", { label: this.label, value: i });
  }
  async setTheme(i) {
    return e("plugin:window|set_theme", { label: this.label, value: i });
  }
  async onResized(i) {
    return this.listen(o.WINDOW_RESIZED, (n) => {
      n.payload = new h(n.payload), i(n);
    });
  }
  async onMoved(i) {
    return this.listen(o.WINDOW_MOVED, (n) => {
      n.payload = new u(n.payload), i(n);
    });
  }
  async onCloseRequested(i) {
    return this.listen(o.WINDOW_CLOSE_REQUESTED, async (n) => {
      const l = new I(n);
      await i(l), l.isPreventDefault() || await this.destroy();
    });
  }
  async onDragDropEvent(i) {
    const n = await this.listen(o.DRAG_ENTER, (s) => {
      i({ ...s, payload: { type: "enter", paths: s.payload.paths, position: new u(s.payload.position) } });
    }), l = await this.listen(o.DRAG_OVER, (s) => {
      i({ ...s, payload: { type: "over", position: new u(s.payload.position) } });
    }), r = await this.listen(o.DRAG_DROP, (s) => {
      i({ ...s, payload: { type: "drop", paths: s.payload.paths, position: new u(s.payload.position) } });
    }), P = await this.listen(o.DRAG_LEAVE, (s) => {
      i({ ...s, payload: { type: "leave" } });
    });
    return () => {
      n(), r(), l(), P();
    };
  }
  async onFocusChanged(i) {
    const n = await this.listen(o.WINDOW_FOCUS, (r) => {
      i({ ...r, payload: true });
    }), l = await this.listen(o.WINDOW_BLUR, (r) => {
      i({ ...r, payload: false });
    });
    return () => {
      n(), l();
    };
  }
  async onScaleChanged(i) {
    return this.listen(o.WINDOW_SCALE_FACTOR_CHANGED, i);
  }
  async onThemeChanged(i) {
    return this.listen(o.WINDOW_THEME_CHANGED, i);
  }
}
var v;
(function(t) {
  t.Disabled = "disabled", t.Throttle = "throttle", t.Suspend = "suspend";
})(v || (v = {}));
var f;
(function(t) {
  t.Default = "default", t.FluentOverlay = "fluentOverlay";
})(f || (f = {}));
var z;
(function(t) {
  t.AppearanceBased = "appearanceBased", t.Light = "light", t.Dark = "dark", t.MediumLight = "mediumLight", t.UltraDark = "ultraDark", t.Titlebar = "titlebar", t.Selection = "selection", t.Menu = "menu", t.Popover = "popover", t.Sidebar = "sidebar", t.HeaderView = "headerView", t.Sheet = "sheet", t.WindowBackground = "windowBackground", t.HudWindow = "hudWindow", t.FullScreenUI = "fullScreenUI", t.Tooltip = "tooltip", t.ContentBackground = "contentBackground", t.UnderWindowBackground = "underWindowBackground", t.UnderPageBackground = "underPageBackground", t.Mica = "mica", t.Blur = "blur", t.Acrylic = "acrylic", t.Tabbed = "tabbed", t.TabbedDark = "tabbedDark", t.TabbedLight = "tabbedLight";
})(z || (z = {}));
var D;
(function(t) {
  t.FollowsWindowActiveState = "followsWindowActiveState", t.Active = "active", t.Inactive = "inactive";
})(D || (D = {}));
function p(t) {
  return t === null ? null : { name: t.name, scaleFactor: t.scaleFactor, position: new u(t.position), size: new h(t.size), workArea: { position: new u(t.workArea.position), size: new h(t.workArea.size) } };
}
async function G() {
  return e("plugin:window|current_monitor").then(p);
}
async function J() {
  return e("plugin:window|primary_monitor").then(p);
}
async function q(t, i) {
  return e("plugin:window|monitor_from_point", { x: t, y: i }).then(p);
}
async function Z() {
  return e("plugin:window|available_monitors").then((t) => t.map(p));
}
async function $() {
  return e("plugin:window|cursor_position").then((t) => new u(t));
}
export {
  I as CloseRequestedEvent,
  z as Effect,
  D as EffectState,
  W as LogicalPosition,
  x as LogicalSize,
  u as PhysicalPosition,
  h as PhysicalSize,
  m as ProgressBarStatus,
  _ as UserAttentionType,
  C as Window,
  Z as availableMonitors,
  G as currentMonitor,
  $ as cursorPosition,
  y as getAllWindows,
  T as getCurrentWindow,
  q as monitorFromPoint,
  J as primaryMonitor
};
