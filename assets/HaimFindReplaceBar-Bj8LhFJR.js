import { r as t, j as e } from "./vendor-react-BDjpSibw.js";
import { j as b, k as x, l as g, X as m } from "./vendor-lucide-DgWK5x8G.js";
import "./vendor-aws-Cvd3RhZI.js";
function y({ editor: r, onClose: l }) {
  const [n, c] = t.useState(""), [o, d] = t.useState(""), [s, u] = t.useState(false), [i, p] = t.useState(0);
  return t.useEffect(() => {
    var _a;
    r.commands.setSearchTerm(n);
    const a = r.storage.findAndReplace;
    p(((_a = a == null ? void 0 : a.results) == null ? void 0 : _a.length) ?? 0);
  }, [r, n, s]), t.useEffect(() => {
    r.commands.setCaseSensitive(s);
  }, [r, s]), t.useEffect(() => {
    r.commands.setReplaceTerm(o);
  }, [r, o]), t.useEffect(() => () => {
    r.commands.clearSearch();
  }, [r]), e.jsxs("div", { className: "flex shrink-0 flex-wrap items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-2 py-1.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: [e.jsx("input", { type: "search", value: n, onChange: (a) => c(a.target.value), placeholder: "\uCC3E\uAE30", "aria-label": "\uCC3E\uAE30", className: "h-7 min-w-[8rem] flex-1 rounded border border-gray-300 bg-white px-2 text-xs dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", autoFocus: true }), e.jsx("input", { type: "text", value: o, onChange: (a) => d(a.target.value), placeholder: "\uBC14\uAFB8\uAE30", "aria-label": "\uBC14\uAFB8\uAE30", className: "h-7 min-w-[8rem] flex-1 rounded border border-gray-300 bg-white px-2 text-xs dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg" }), e.jsxs("label", { className: "inline-flex items-center gap-1 text-[11px] text-gray-600 dark:text-odp-muted", children: [e.jsx("input", { type: "checkbox", checked: s, onChange: (a) => u(a.target.checked) }), "\uB300\uC18C\uBB38\uC790"] }), e.jsxs("span", { className: "text-[11px] tabular-nums text-gray-500 dark:text-odp-muted", children: [i, "\uAC74"] }), e.jsx("button", { type: "button", "aria-label": "\uC774\uC804", className: "inline-flex h-7 w-7 items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: () => r.commands.goToPreviousResult(), children: e.jsx(b, { size: 14 }) }), e.jsx("button", { type: "button", "aria-label": "\uB2E4\uC74C", className: "inline-flex h-7 w-7 items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: () => r.commands.goToNextResult(), children: e.jsx(x, { size: 14 }) }), e.jsxs("button", { type: "button", "aria-label": "\uBC14\uAFB8\uAE30", className: "inline-flex h-7 items-center gap-1 rounded px-2 text-xs hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: () => r.commands.replace(), children: [e.jsx(g, { size: 12 }), "\uBC14\uAFB8\uAE30"] }), e.jsx("button", { type: "button", "aria-label": "\uBAA8\uB450 \uBC14\uAFB8\uAE30", className: "inline-flex h-7 items-center rounded px-2 text-xs hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: () => r.commands.replaceAll(), children: "\uBAA8\uB450" }), e.jsx("button", { type: "button", "aria-label": "\uB2EB\uAE30", className: "inline-flex h-7 w-7 items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-odp-borderStrong", onClick: l, children: e.jsx(m, { size: 14 }) })] });
}
export {
  y as default
};
