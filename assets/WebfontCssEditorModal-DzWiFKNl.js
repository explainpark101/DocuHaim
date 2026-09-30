import { r, j as e } from "./vendor-react-BDjpSibw.js";
import { al as N, aj as v, am as S, an as w } from "./index-C7uJeeaR.js";
import { E as p, j as k, x as C, y as E, z as M, A as R, b as F, a as L, k as A, d as B, h as D, B as W } from "./vendor-codemirror-0YdHorwW.js";
import { t as _, a as z, X as y, w as K } from "./vendor-lucide-BXdwsXhs.js";
import { m as P, F as X, L as G, n as I } from "./vendor-radix-DuLpLUUM.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Dw-WnPM7.js";
import "./vendor-markdown-it-BSFfF5B5.js";
function J({ value: o, onChange: a, className: d = "" }) {
  const m = r.useRef(null), s = r.useRef(null), i = r.useRef(a);
  return i.current = a, r.useEffect(() => {
    const n = m.current;
    if (!n) return;
    const l = new p({ parent: n, state: k.create({ doc: o, extensions: [E(), M(), R(), F(), L(), A.of([...B, ...D]), W(), C, p.lineWrapping, p.updateListener.of((c) => {
      c.docChanged && i.current(c.state.doc.toString());
    }), p.theme({ "&": { height: "100%", fontSize: "12px" }, ".cm-scroller": { overflow: "auto", fontFamily: "JetBrains Mono, D2Coding, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }, "&.cm-focused": { outline: "none" } })] }) });
    return s.current = l, () => {
      l.destroy(), s.current = null;
    };
  }, []), r.useEffect(() => {
    const n = s.current;
    if (!n) return;
    const l = n.state.doc.toString();
    l !== o && n.dispatch({ changes: { from: 0, to: l.length, insert: o } });
  }, [o]), e.jsx("div", { ref: m, className: `min-h-0 overflow-hidden rounded border border-gray-700/80 ${d}` });
}
const T = "";
function re({ isOpen: o, initialFile: a = null, onClose: d, onSaved: m }) {
  const [s, i] = r.useState(""), [n, l] = r.useState(""), [c, f] = r.useState(false), [g, x] = r.useState(null);
  r.useEffect(() => {
    o && (i((a == null ? void 0 : a.css) ?? ""), l((a == null ? void 0 : a.name) ?? ""), x(null), f(false));
  }, [o, a]);
  const u = r.useMemo(() => N(s), [s]), h = !!(a == null ? void 0 : a.id), j = async () => {
    if (!s.trim()) {
      x("CSS\uB97C \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    f(true), x(null);
    try {
      const t = { css: s };
      (a == null ? void 0 : a.id) && (t.id = a.id);
      const b = n.trim();
      b && (t.name = b), await w(t), m == null ? void 0 : m(u), d();
    } catch (t) {
      x(t instanceof Error ? t.message : String(t));
    } finally {
      f(false);
    }
  };
  return e.jsx(v, { isOpen: o, onClose: d, contentClassName: "max-w-2xl w-[min(96vw,40rem)]", children: e.jsxs(P, { className: "flex max-h-[85vh] flex-col gap-3 p-4", onSubmit: (t) => {
    t.preventDefault(), j();
  }, children: [e.jsxs("div", { className: "flex items-start justify-between gap-2", children: [e.jsxs("div", { children: [e.jsxs("h2", { className: "inline-flex items-center gap-1.5 text-sm font-bold text-gray-800 dark:text-odp-fgStrong", children: [h ? e.jsx(_, { className: "h-3.5 w-3.5", "aria-hidden": true }) : e.jsx(z, { className: "h-3.5 w-3.5", "aria-hidden": true }), h ? "\uC6F9\uD3F0\uD2B8 \uD3B8\uC9D1" : "\uC6F9\uD3F0\uD2B8 \uCD94\uAC00"] }), e.jsxs("p", { className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted", children: ["`@font-face` / `@import` CSS\uB97C \uC800\uC7A5\uD558\uBA74 vault\uC758", " ", e.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: ".settings/webfonts/" }), "\uC5D0 \uAC1C\uBCC4 \uD30C\uC77C\uB85C \uCD94\uAC00\uB429\uB2C8\uB2E4.", " ", e.jsx("a", { href: "https://noonnu.cc/", target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 underline dark:text-blue-400", children: "noonnu.cc" }), " ", "\uB610\uB294", " ", e.jsx("a", { href: "https://fonts.google.com/", target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 underline dark:text-blue-400", children: "google fonts" }), "\uC5D0\uC11C \uCC3E\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] })] }), e.jsx("button", { type: "button", onClick: d, className: "rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-odp-focusBg", "aria-label": "\uB2EB\uAE30", children: e.jsx(y, { className: "h-4 w-4" }) })] }), e.jsxs(X, { name: "display-name", className: "flex flex-col gap-0.5 text-[11px] text-gray-600 dark:text-odp-muted", children: [e.jsx(G, { children: "\uD45C\uC2DC \uC774\uB984 (\uBE44\uC6B0\uBA74 \uAC10\uC9C0\uB41C font-family \uC0AC\uC6A9)" }), e.jsx(I, { asChild: true, children: e.jsx("input", { type: "text", value: n, onChange: (t) => l(t.target.value), placeholder: u[0] ?? "MyFont", className: S }) })] }), e.jsxs("div", { className: "flex min-h-0 flex-1 flex-col gap-1", children: [e.jsx("span", { className: "text-[11px] font-medium text-gray-600 dark:text-odp-muted", children: "CSS" }), e.jsx(J, { value: s, onChange: i, className: "h-[min(50vh,22rem)]" }), !s.trim() && !h ? e.jsx("p", { className: "whitespace-pre-wrap font-mono text-[10px] text-gray-400", children: T }) : null] }), e.jsxs("div", { className: "rounded border border-gray-100 bg-gray-50 px-2 py-1.5 dark:border-odp-border dark:bg-odp-bgSoft/50", children: [e.jsx("div", { className: "mb-1 text-[10px] font-semibold text-gray-500 dark:text-odp-muted", children: "\uAC10\uC9C0\uB41C font-family" }), u.length === 0 ? e.jsx("p", { className: "text-[10px] text-gray-400", children: "`@font-face`\uC758 font-family\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4." }) : e.jsx("ul", { className: "flex flex-wrap gap-1", children: u.map((t) => e.jsx("li", { className: "rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] dark:border-odp-borderStrong dark:bg-odp-bg", style: { fontFamily: t }, children: t }, t)) })] }), g ? e.jsx("p", { className: "text-xs text-red-600 dark:text-red-400", role: "alert", children: g }) : null, e.jsxs("div", { className: "flex justify-end gap-2 border-t border-gray-100 pt-2 dark:border-odp-border", children: [e.jsxs("button", { type: "button", onClick: d, className: "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-odp-muted", children: [e.jsx(y, { className: "h-3 w-3", "aria-hidden": true }), "\uCDE8\uC18C"] }), e.jsx("button", { type: "submit", disabled: c, className: "inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50", children: c ? "\uC800\uC7A5 \uC911\u2026" : e.jsxs(e.Fragment, { children: [e.jsx(K, { className: "h-3 w-3", "aria-hidden": true }), "\uC800\uC7A5"] }) })] })] }) });
}
export {
  re as WebfontCssEditorModal
};
