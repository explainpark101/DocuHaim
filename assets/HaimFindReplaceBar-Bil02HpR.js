import { r as s, j as r } from "./vendor-react-BPvvDyqO.js";
import { w as j, x as v, y as S, X as w } from "./vendor-lucide-DQG_D8MC.js";
import "./vendor-aws-hJDgVEKM.js";
function R(e) {
  const n = e.key;
  if (typeof n == "string") return n;
  const a = e.spec.key;
  return typeof (a == null ? void 0 : a.key) == "string" ? a.key : "";
}
function C(e) {
  return e.state.plugins.find((n) => R(n).includes("findAndReplace"));
}
function x(e, n) {
  const a = C(e);
  if (!a) return;
  const o = e.state.tr.setMeta(a, n);
  e.view.dispatch(o);
}
function N(e) {
  var _a;
  const n = e.storage.findAndReplace;
  if (!n) return { count: 0, current: null };
  const a = ((_a = n.results) == null ? void 0 : _a.length) ?? 0, o = a > 0 ? n.currentIndex ?? null : null;
  return { count: a, current: o };
}
function D({ editor: e, onClose: n, onQueryState: a }) {
  const [o, g] = s.useState(""), [c, b] = s.useState(""), [l, m] = s.useState(false), [u, f] = s.useState(0), [h, y] = s.useState(null), d = s.useRef(a);
  d.current = a, s.useEffect(() => {
    const t = () => {
      const p = N(e);
      f(p.count), y(p.current);
    };
    return t(), e.on("transaction", t), () => {
      e.off("transaction", t);
    };
  }, [e]), s.useEffect(() => {
    var _a;
    x(e, { searchTerm: o, replaceTerm: c, caseSensitive: l }), (_a = d.current) == null ? void 0 : _a.call(d, { query: o, replace: c, caseSensitive: l });
  }, [e, o, c, l]), s.useEffect(() => () => {
    x(e, { searchTerm: "" });
  }, [e]);
  const k = u > 0 ? `${(h ?? 0) + 1}/${u}` : "0\uAC74", i = (t) => {
    if (t.key === "Escape") {
      t.preventDefault(), n();
      return;
    }
    t.key === "Enter" && (t.preventDefault(), t.shiftKey ? e.commands.goToPreviousResult() : e.commands.goToNextResult());
  };
  return r.jsxs("div", { className: "flex shrink-0 flex-wrap items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-2 py-1.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: [r.jsx("input", { type: "search", value: o, onChange: (t) => g(t.target.value), onKeyDown: i, placeholder: "\uCC3E\uAE30", "aria-label": "\uCC3E\uAE30", className: "h-7 min-w-[8rem] flex-1 rounded border border-gray-300 bg-white px-2 text-xs dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", autoFocus: true }), r.jsx("input", { type: "text", value: c, onChange: (t) => b(t.target.value), onKeyDown: i, placeholder: "\uBC14\uAFB8\uAE30", "aria-label": "\uBC14\uAFB8\uAE30", className: "h-7 min-w-[8rem] flex-1 rounded border border-gray-300 bg-white px-2 text-xs dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg" }), r.jsxs("label", { className: "inline-flex items-center gap-1 text-[11px] text-gray-600 dark:text-odp-muted", children: [r.jsx("input", { type: "checkbox", checked: l, onChange: (t) => m(t.target.checked) }), "\uB300\uC18C\uBB38\uC790"] }), r.jsx("span", { className: "text-[11px] tabular-nums text-gray-500 dark:text-odp-muted", children: k }), r.jsx("button", { type: "button", "aria-label": "\uC774\uC804", className: "inline-flex h-7 w-7 items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: () => e.commands.goToPreviousResult(), children: r.jsx(j, { size: 14 }) }), r.jsx("button", { type: "button", "aria-label": "\uB2E4\uC74C", className: "inline-flex h-7 w-7 items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: () => e.commands.goToNextResult(), children: r.jsx(v, { size: 14 }) }), r.jsxs("button", { type: "button", "aria-label": "\uBC14\uAFB8\uAE30", className: "inline-flex h-7 items-center gap-1 rounded px-2 text-xs hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: () => e.commands.replace(), children: [r.jsx(S, { size: 12 }), "\uBC14\uAFB8\uAE30"] }), r.jsx("button", { type: "button", "aria-label": "\uBAA8\uB450 \uBC14\uAFB8\uAE30", className: "inline-flex h-7 items-center rounded px-2 text-xs hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: () => e.commands.replaceAll(), children: "\uBAA8\uB450" }), r.jsx("button", { type: "button", "aria-label": "\uB2EB\uAE30", className: "inline-flex h-7 w-7 items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: n, children: r.jsx(w, { size: 14 }) })] });
}
export {
  D as default
};
