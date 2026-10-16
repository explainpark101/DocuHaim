import { r as t, j as a } from "./vendor-react-ChQ1w2We.js";
import { t as h, I as w } from "./vendor-excalidraw-Dwo-wDXy.js";
import { ak as v } from "./index-DesdSF2E.js";
import "./vendor-aws-DKtg11UV.js";
import "./vendor-radix-BQ9XceqC.js";
import "./vendor-mermaid-D8XgPlSD.js";
import "./vendor-lucide-BB1m8XvN.js";
import "./bootSplash-Dmg87Il5.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-L8D9Iqni.js";
import "./vendor-markdown-it-BSFfF5B5.js";
function R(c, s, n = {}) {
  return h(c, s, n);
}
const k = 500;
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
      const E = R(e, r, m ?? {});
      (_a = u.current) == null ? void 0 : _a.call(u, E);
    }, k));
  };
  t.useEffect(() => {
    if (n || typeof o != "function") return;
    const e = (r) => {
      var _a;
      !(r.metaKey || r.ctrlKey) || r.key.toLowerCase() !== "s" || (r.preventDefault(), r.stopPropagation(), (_a = f.current) == null ? void 0 : _a.call(f));
    };
    return window.addEventListener("keydown", e, true), () => window.removeEventListener("keydown", e, true);
  }, [n, o]);
  const x = s === "dark" ? "dark" : "light";
  return a.jsx("div", { className: "flex h-full min-h-0 flex-1 flex-col overflow-hidden", children: a.jsx("div", { className: "relative min-h-0 flex-1", children: a.jsx("div", { className: "absolute inset-0", children: a.jsx(w, { initialData: d, theme: x, viewModeEnabled: n, langCode: "ko", UIOptions: { canvasActions: { loadScene: false, saveToActiveFile: false, toggleTheme: false } }, onChange: p }) }) }) });
}
export {
  U as default
};
