import { r, j as f } from "./vendor-react-SY5QCjFA.js";
import { F as y } from "./vendor-monaco-KBbFQb8S.js";
function E({ value: l = "", language: s = "plaintext", theme: c = "light", readOnly: n = false, onChange: m, onSave: o, className: d = "" }) {
  const i = r.useRef(null), a = r.useRef(null), p = c === "dark" ? "vs-dark" : "vs", x = r.useMemo(() => ({ readOnly: n, minimap: { enabled: false }, scrollBeyondLastLine: false, fontSize: 13, lineNumbers: "on", wordWrap: "on", automaticLayout: true }), [n]);
  return r.useEffect(() => {
    const t = i.current;
    if (!t || typeof o != "function" || n) return;
    const u = (e) => {
      var _a;
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "Enter") {
        e.preventDefault(), (_a = a.current) == null ? void 0 : _a.trigger("keyboard", "editor.action.insertLineBefore", null);
        return;
      }
      (e.ctrlKey || e.metaKey) && e.key === "s" && (e.preventDefault(), o());
    };
    return t.addEventListener("keydown", u, true), () => t.removeEventListener("keydown", u, true);
  }, [o, n]), f.jsx("div", { ref: i, className: `flex-1 min-h-0 flex flex-col ${d}`.trim(), children: f.jsx(y, { height: "100%", defaultLanguage: s, language: s, value: l, theme: p, options: x, onChange: m, onMount: (t) => {
    a.current = t;
  }, loading: null }) });
}
export {
  E as default
};
