import { r as t, j as a } from "./vendor-react-BPvvDyqO.js";
import { t as E, I as w } from "./vendor-excalidraw-RLZ6WJHD.js";
import { ah as v } from "./index-BYVoYwQr.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-radix-8kjzYRrX.js";
import "./vendor-mermaid-8Q64NnGn.js";
import "./vendor-lucide-BnjwTb2j.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-BSFfF5B5.js";
function R(c, s, n = {}) {
  return E(c, s, n);
}
const g = 500;
function U({ value: c = "", theme: s = "light", readOnly: n = false, onChange: l, onSave: o }) {
  const u = t.useRef(l), f = t.useRef(o), i = t.useRef(null);
  t.useEffect(() => {
    u.current = l;
  }, [l]), t.useEffect(() => {
    f.current = o;
  }, [o]), t.useEffect(() => () => {
    i.current && clearTimeout(i.current);
  }, []);
  const d = t.useRef((() => {
    const e = v(c);
    return { elements: e.elements, appState: { ...e.appState, theme: s === "dark" ? "dark" : "light" }, files: e.files, scrollToContent: true };
  })()).current, p = (e, r, m) => {
    n || (i.current && clearTimeout(i.current), i.current = setTimeout(() => {
      var _a;
      const x = R(e, r, m ?? {});
      (_a = u.current) == null ? void 0 : _a.call(u, x);
    }, g));
  };
  t.useEffect(() => {
    if (n || typeof o != "function") return;
    const e = (r) => {
      var _a;
      !(r.metaKey || r.ctrlKey) || r.key.toLowerCase() !== "s" || (r.preventDefault(), r.stopPropagation(), (_a = f.current) == null ? void 0 : _a.call(f));
    };
    return window.addEventListener("keydown", e, true), () => window.removeEventListener("keydown", e, true);
  }, [n, o]);
  const h = s === "dark" ? "dark" : "light";
  return a.jsx("div", { className: "flex h-full min-h-0 flex-1 flex-col overflow-hidden", children: a.jsx("div", { className: "relative min-h-0 flex-1", children: a.jsx("div", { className: "absolute inset-0", children: a.jsx(w, { initialData: d, theme: h, viewModeEnabled: n, langCode: "ko", UIOptions: { canvasActions: { loadScene: false, saveToActiveFile: false, toggleTheme: false } }, onChange: p }) }) }) });
}
export {
  U as default
};
