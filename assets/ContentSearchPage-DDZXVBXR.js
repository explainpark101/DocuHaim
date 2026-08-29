import { j as t, u as P, e as $, r } from "./vendor-react-BFxggocB.js";
import { I as z, J as l, S as A, K as D, N as H, O as Q, Q as B, U as G } from "./index-DPH8WKK6.js";
import { M as U, b as F, c as J, X as K, L as V } from "./vendor-lucide-BiQHrkcf.js";
import "./vendor-md-editor-B7IajafM.js";
import "./vendor-aws-CXsSaYOG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-ACO_3onn.js";
import "./vendor-google-genai-DGp6lEvQ.js";
function W({ lines: a, query: i, terms: c }) {
  return t.jsx("div", { className: "overflow-x-auto font-mono text-[12px] leading-5", children: a.map((s) => t.jsxs("div", { className: `flex min-w-0 gap-3 px-3 py-0.5 ${s.isMatch ? "bg-amber-50/90 dark:bg-amber-500/10" : "text-gray-500 dark:text-odp-muted"}`, children: [t.jsx("span", { className: "w-9 shrink-0 select-none text-right tabular-nums text-gray-400 dark:text-odp-muted", children: s.lineNumber }), t.jsx("pre", { className: "min-w-0 flex-1 whitespace-pre-wrap break-words font-mono text-[12px] leading-5 text-gray-800 dark:text-odp-fg", dangerouslySetInnerHTML: { __html: z(s.text, c, i) } })] }, `${s.lineNumber}:${s.text.slice(0, 24)}`)) });
}
function X({ title: a, path: i, kind: c, matchCount: s, regions: f, query: h, terms: b, onOpen: u }) {
  const o = c === "chat" ? U : F;
  return t.jsxs("article", { className: "overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: [t.jsxs("button", { type: "button", onClick: u, className: "flex w-full items-start gap-2 border-b border-gray-100 px-3 py-2.5 text-left hover:bg-gray-50 dark:border-odp-borderSoft dark:hover:bg-odp-focusBg/40", children: [t.jsx(o, { size: 16, className: "mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted", "aria-hidden": true }), t.jsxs("span", { className: "min-w-0 flex-1", children: [t.jsx("span", { className: "block truncate text-sm font-semibold text-gray-900 dark:text-odp-fgStrong", children: a }), t.jsx("span", { className: "block truncate text-xs text-gray-500 dark:text-odp-muted", children: i })] }), t.jsxs("span", { className: "shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600 dark:bg-odp-borderStrong dark:text-odp-muted", children: [s, "\uAC74"] })] }), t.jsx("div", { className: "divide-y divide-gray-100 dark:divide-odp-borderSoft", children: f.map((d, x) => t.jsxs("div", { children: [x > 0 ? t.jsx("div", { className: "px-3 py-1 text-center text-[11px] text-gray-400 dark:text-odp-muted", children: "\u22EF" }) : null, t.jsx(W, { lines: d.lines, query: h, terms: b })] }, `${d.startLine}-${d.endLine}-${x}`)) })] });
}
const Y = 500;
function Z(a) {
  return a.enabled ? a.loaded ? a.contentSearchMode === "index" ? "\uC5ED\uC0C9\uC778 \uBCF8\uBB38 \uAC80\uC0C9" : a.contentSearchMode === "live" ? "\uBCF8\uBB38 \uC9C1\uC811 \uAC80\uC0C9(\uD3F4\uBC31)" : "\uBCF8\uBB38 \uAC80\uC0C9 \uBD88\uAC00 \xB7 \uD30C\uC77C\uBA85\xB7\uACBD\uB85C\uB294 Advanced Search \uC0AC\uC6A9" : "\uC0C9\uC778 \uB85C\uB4DC \uC911\u2026" : "\uC5ED\uC0C9\uC778 \uAEBC\uC9D0 \xB7 \uC9C1\uC811 \uC2A4\uCE94\uB9CC \uAC00\uB2A5";
}
function ce({ storageMode: a, s3Tree: i, localTree: c, webdavTree: s, sessionWorkspaces: f, onOpenFile: h, isActive: b = true }) {
  const u = P(), [o, d] = $(), x = o.get("q") || "", [p, k] = r.useState(x), [m, N] = r.useState(x), [w, C] = r.useState([]), [S, v] = r.useState(false), [M, E] = r.useState([]), [q, R] = r.useState(() => l.getStatus()), j = r.useRef(0);
  r.useEffect(() => l.subscribe(() => {
    R(l.getStatus());
  }), []), r.useEffect(() => {
    l.isEnabled() && l.ensureLoaded();
  }, []), r.useEffect(() => {
    const e = o.get("q") || "";
    k(e), N(e);
  }, [o]), r.useEffect(() => {
    const e = window.setTimeout(() => {
      N(p.trim());
      const n = p.trim(), y = o.get("q") || "";
      n !== y && (n ? d({ q: n }, { replace: true }) : d({}, { replace: true }));
    }, Y);
    return () => window.clearTimeout(e);
  }, [p, o, d]);
  const L = r.useCallback(() => {
    const e = [];
    a === A ? e.push(c || []) : a === D ? e.push(s || []) : e.push(i || []);
    for (const n of H(f)) e.push(Q(n));
    return e;
  }, [a, i, c, s, f]);
  r.useEffect(() => {
    if (!b) return;
    const e = m, n = ++j.current;
    if (!e) {
      C([]), v(false), E([]);
      return;
    }
    v(true), (async () => {
      const y = await B(e, []), I = y.length > 0 ? y.map((g) => g.toLowerCase()) : e.toLowerCase().split(/\s+/).map((g) => g.trim()).filter((g) => g.length >= 2);
      if (n !== j.current) return;
      E(I);
      const O = await l.searchContentPage(e, L(), 60);
      n === j.current && (C(O), v(false));
    })();
  }, [m, L, b]);
  const T = r.useMemo(() => m ? S ? "\uAC80\uC0C9 \uC911\u2026" : "\uC77C\uCE58\uD558\uB294 \uBCF8\uBB38\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uBA74 \uBCFC\uD2B8 \uBCF8\uBB38\uC5D0\uC11C \uC77C\uCE58 \uAD6C\uAC04\uC744 \uCC3E\uC2B5\uB2C8\uB2E4.", [m, S]), _ = r.useCallback((e) => {
    if (e.kind === "chat" && e.messageId) {
      u(`/chat#msg-${e.messageId}`);
      return;
    }
    e.path && h(e.path);
  }, [u, h]);
  return t.jsxs("div", { className: "flex h-full min-h-0 flex-col overflow-hidden bg-white dark:bg-odp-bgSofter", children: [t.jsxs("div", { className: "border-b border-gray-200 px-4 py-3 dark:border-odp-borderSoft", children: [t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5", children: [t.jsx("h1", { className: "shrink-0 text-base font-semibold text-gray-900 dark:text-odp-fgStrong", children: "\uBCF8\uBB38 \uAC80\uC0C9" }), t.jsx("span", { className: "text-xs text-gray-500 dark:text-odp-muted", children: Z(q) })] }), t.jsxs("div", { className: "mt-3 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: [t.jsx(J, { size: 16, className: "shrink-0 text-gray-400", "aria-hidden": true }), t.jsx("input", { type: "search", value: p, onChange: (e) => k(e.target.value), placeholder: "\uBCF8\uBB38 \uAC80\uC0C9\u2026", className: "min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-odp-fg", "aria-label": "\uBCF8\uBB38 \uAC80\uC0C9" }), p ? t.jsx("button", { type: "button", "aria-label": "\uAC80\uC0C9\uC5B4 \uC9C0\uC6B0\uAE30", onClick: () => {
    k(""), u(G(""), { replace: true });
  }, className: "rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-odp-focusBg dark:hover:text-odp-fg", children: t.jsx(K, { size: 14, "aria-hidden": true }) }) : null, S ? t.jsx(V, { size: 16, className: "shrink-0 animate-spin text-gray-400" }) : null] })] }), t.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto px-4 py-4", children: w.length === 0 ? t.jsx("p", { className: "text-sm text-gray-500 dark:text-odp-muted", children: T }) : t.jsx("div", { className: "flex flex-col gap-4", children: w.map((e) => t.jsx(X, { title: e.title, path: e.path, kind: e.kind, matchCount: e.matchCount, regions: e.regions, query: m, terms: M, onOpen: () => _(e) }, e.docId)) }) })] });
}
export {
  ce as default
};
