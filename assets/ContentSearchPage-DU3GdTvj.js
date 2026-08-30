import { r, j as t, u as A, e as O } from "./vendor-react-BFxggocB.js";
import { Q as D, S as k, U as H, V as Q, W as B, X as G, Y as X, Z as U, _ as V } from "./index-DGkRmTW6.js";
import { M as W, b as Z, c as F, X as Y, L as J } from "./vendor-lucide-D7vvAA4A.js";
import "./vendor-md-editor-CRNS8cBC.js";
import "./vendor-aws-CacdPxb-.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-ClPHWmRP.js";
import "./vendor-google-genai-DGp6lEvQ.js";
function K({ lines: s, query: c, terms: l }) {
  return t.jsx("div", { className: "overflow-x-auto font-mono text-[12px] leading-5", children: s.map((a) => t.jsxs("div", { className: `flex min-w-0 gap-3 px-3 py-0.5 ${a.isMatch ? "bg-amber-50/90 dark:bg-amber-500/10" : "text-gray-500 dark:text-odp-muted"}`, children: [t.jsx("span", { className: "w-9 shrink-0 select-none text-right tabular-nums text-gray-400 dark:text-odp-muted", children: a.lineNumber }), t.jsx("pre", { className: "min-w-0 flex-1 whitespace-pre-wrap break-words font-mono text-[12px] leading-5 text-gray-800 dark:text-odp-fg", dangerouslySetInnerHTML: { __html: D(a.text, l, c) } })] }, `${a.lineNumber}:${a.text.slice(0, 24)}`)) });
}
function ee({ title: s, path: c, kind: l, matchCount: a, regions: g, query: f, terms: h, onOpen: u }) {
  const o = l === "chat" ? W : Z;
  return t.jsxs("article", { className: "overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: [t.jsxs("button", { type: "button", onClick: u, className: "flex w-full items-start gap-2 border-b border-gray-100 px-3 py-2.5 text-left hover:bg-gray-50 dark:border-odp-borderSoft dark:hover:bg-odp-focusBg/40", children: [t.jsx(o, { size: 16, className: "mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted", "aria-hidden": true }), t.jsxs("span", { className: "min-w-0 flex-1", children: [t.jsx("span", { className: "block truncate text-sm font-semibold text-gray-900 dark:text-odp-fgStrong", children: s }), t.jsx("span", { className: "block truncate text-xs text-gray-500 dark:text-odp-muted", children: c })] }), t.jsxs("span", { className: "shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600 dark:bg-odp-borderStrong dark:text-odp-muted", children: [a, "\uAC74"] })] }), t.jsx("div", { className: "divide-y divide-gray-100 dark:divide-odp-borderSoft", children: g.map((d, x) => t.jsxs("div", { children: [x > 0 ? t.jsx("div", { className: "px-3 py-1 text-center text-[11px] text-gray-400 dark:text-odp-muted", children: "\u22EF" }) : null, t.jsx(K, { lines: d.lines, query: f, terms: h })] }, `${d.startLine}-${d.endLine}-${x}`)) })] });
}
const te = r.memo(ee), re = 500;
function se(s) {
  return s.enabled ? s.loaded ? s.contentSearchMode === "index" ? "\uC5ED\uC0C9\uC778 \uBCF8\uBB38 \uAC80\uC0C9" : s.contentSearchMode === "live" ? "\uBCF8\uBB38 \uC9C1\uC811 \uAC80\uC0C9(\uD3F4\uBC31)" : "\uBCF8\uBB38 \uAC80\uC0C9 \uBD88\uAC00 \xB7 \uD30C\uC77C\uBA85\xB7\uACBD\uB85C\uB294 Advanced Search \uC0AC\uC6A9" : "\uC0C9\uC778 \uB85C\uB4DC \uC911\u2026" : "\uC5ED\uC0C9\uC778 \uAEBC\uC9D0 \xB7 \uC9C1\uC811 \uC2A4\uCE94\uB9CC \uAC00\uB2A5";
}
function pe({ storageMode: s, s3Tree: c, localTree: l, webdavTree: a, sessionWorkspaces: g, onOpenFile: f, isActive: h = true }) {
  const u = A(), [o, d] = O(), x = o.get("q") || "", [p, S] = r.useState(x), [i, w] = r.useState(x), [b, C] = r.useState([]), [v, j] = r.useState(false), [L, E] = r.useState([]), [M, _] = r.useState(() => k.getStatus()), N = r.useRef(0), R = r.useRef(null), [, q] = r.useTransition();
  r.useEffect(() => k.subscribe(() => {
    _(k.getStatus());
  }), []), r.useEffect(() => {
    const e = o.get("q") || "";
    S(e), w(e);
  }, [o]), r.useEffect(() => {
    const e = window.setTimeout(() => {
      w(p.trim());
      const n = p.trim(), y = o.get("q") || "";
      n !== y && (n ? d({ q: n }, { replace: true }) : d({}, { replace: true }));
    }, re);
    return () => window.clearTimeout(e);
  }, [p, o, d]);
  const T = r.useCallback(() => {
    const e = [];
    s === H ? e.push(l || []) : s === Q ? e.push(a || []) : e.push(c || []);
    for (const n of B(g)) e.push(G(n));
    return e;
  }, [s, c, l, a, g]);
  r.useEffect(() => {
    if (!h) return;
    const e = i, n = ++N.current;
    if (!e) {
      C([]), j(false), E([]);
      return;
    }
    j(true), (async () => {
      const y = await X(e, []), P = y.length > 0 ? y.map((m) => m.toLowerCase()) : e.toLowerCase().split(/\s+/).map((m) => m.trim()).filter((m) => m.length >= 2);
      if (n !== N.current) return;
      const z = await k.searchContentPage(e, T(), 60);
      n === N.current && q(() => {
        C(z), E(P), j(false);
      });
    })();
  }, [i, T, h]), r.useEffect(() => {
    var _a;
    !i || b.length === 0 || ((_a = R.current) == null ? void 0 : _a.scrollToIndex(0));
  }, [i, b]);
  const $ = r.useMemo(() => i ? v ? "\uAC80\uC0C9 \uC911\u2026" : "\uC77C\uCE58\uD558\uB294 \uBCF8\uBB38\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uBA74 \uBCFC\uD2B8 \uBCF8\uBB38\uC5D0\uC11C \uC77C\uCE58 \uAD6C\uAC04\uC744 \uCC3E\uC2B5\uB2C8\uB2E4.", [i, v]), I = r.useCallback((e) => {
    if (e.kind === "chat" && e.messageId) {
      u(`/chat#msg-${e.messageId}`);
      return;
    }
    e.path && f(e.path);
  }, [u, f]);
  return t.jsxs("div", { className: "flex h-full min-h-0 flex-col overflow-hidden bg-white dark:bg-odp-bgSofter", children: [t.jsxs("div", { className: "border-b border-gray-200 px-4 py-3 dark:border-odp-borderSoft", children: [t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5", children: [t.jsx("h1", { className: "shrink-0 text-base font-semibold text-gray-900 dark:text-odp-fgStrong", children: "\uBCF8\uBB38 \uAC80\uC0C9" }), t.jsx("span", { className: "text-xs text-gray-500 dark:text-odp-muted", children: se(M) })] }), t.jsxs("div", { className: "mt-3 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: [t.jsx(F, { size: 16, className: "shrink-0 text-gray-400", "aria-hidden": true }), t.jsx("input", { type: "search", value: p, onChange: (e) => S(e.target.value), placeholder: "\uBCF8\uBB38 \uAC80\uC0C9\u2026", className: "min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-odp-fg", "aria-label": "\uBCF8\uBB38 \uAC80\uC0C9" }), p ? t.jsx("button", { type: "button", "aria-label": "\uAC80\uC0C9\uC5B4 \uC9C0\uC6B0\uAE30", onClick: () => {
    S(""), u(U(""), { replace: true });
  }, className: "rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-odp-focusBg dark:hover:text-odp-fg", children: t.jsx(Y, { size: 14, "aria-hidden": true }) }) : null, v ? t.jsx(J, { size: 16, className: "shrink-0 animate-spin text-gray-400" }) : null] })] }), t.jsx("div", { className: "min-h-0 flex-1 overflow-hidden px-4 py-4", children: b.length === 0 ? t.jsx("p", { className: "text-sm text-gray-500 dark:text-odp-muted", children: $ }) : t.jsx(V, { ref: R, className: "h-full overscroll-contain", data: b, style: { overflowX: "clip" }, children: (e) => t.jsx("div", { className: "pb-4", children: t.jsx(te, { title: e.title, path: e.path, kind: e.kind, matchCount: e.matchCount, regions: e.regions, query: i, terms: L, onOpen: () => I(e) }) }, e.docId) }) })] });
}
export {
  pe as default
};
