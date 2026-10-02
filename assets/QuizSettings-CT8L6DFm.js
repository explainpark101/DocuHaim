import { r as s, j as e } from "./vendor-react-BLJzfvPB.js";
import { S as v, a as I, b as T } from "./SettingsCollapsibleHeading-BhaIL-tj.js";
import { W as f, X as h, Y as A, o as b, _ as E, b as y, d as S, $ as L, s as M, G as z, a0 as F, a1 as k } from "./index-_Cgkc3J6.js";
import { Q as R } from "./QuizLlmModelPicker-CJGBTkke.js";
import { f as H, m as G } from "./pretextMeasure-CjJHEvjB.js";
import { o as _ } from "./vendor-lucide-DPPF2CDs.js";
import { S as j, g as N } from "./vendor-radix-4pFcYp0u.js";
import "./vendor-motion-DSEw68MZ.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./bootSplash-QPCcRCUR.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./OpenAiCompatibleModelSelect-CJ9WFsn1.js";
import "./vendor-google-genai-CCGW7xFw.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./LlamaCppModelSelect-4r7qGvFy.js";
function O(d, m = {}) {
  const g = s.useRef(null), { minHeight: r = 112, maxHeight: c } = m, [a, x] = s.useState(r), p = s.useCallback(() => {
    const l = g.current;
    if (!l) return;
    const i = window.getComputedStyle(l), t = (parseFloat(i.paddingTop) || 0) + (parseFloat(i.paddingBottom) || 0), o = (parseFloat(i.paddingLeft) || 0) + (parseFloat(i.paddingRight) || 0), n = parseFloat(i.lineHeight) || (parseFloat(i.fontSize) || 12) * 1.2, u = Math.max(0, l.clientWidth - o), C = H(l);
    x(G(d, { font: C, contentWidth: u, lineHeightPx: n, paddingY: t, minHeight: r, ...typeof c == "number" ? { maxHeight: c } : {} }));
  }, [d, r, c]);
  return s.useLayoutEffect(() => {
    p();
  }, [p]), s.useEffect(() => {
    const l = g.current;
    if (!l || typeof ResizeObserver > "u") return;
    const i = new ResizeObserver(() => p());
    return i.observe(l), () => i.disconnect();
  }, [p]), { textareaRef: g, height: a, remeasure: p };
}
const w = "w-full resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-2 text-xs leading-relaxed dark:border-odp-borderSoft dark:bg-odp-bgSoft", Q = s.forwardRef(function({ value: m = "", minHeight: g = 112, maxHeight: r, layoutKey: c, className: a = "", style: x, ...p }, l) {
  const i = String(m ?? ""), { textareaRef: t, height: o, remeasure: n } = O(i, { minHeight: g, ...typeof r == "number" ? { maxHeight: r } : {} });
  return s.useImperativeHandle(l, () => ({ remeasure: n }), [n]), s.useLayoutEffect(() => {
    c !== void 0 && n();
  }, [c, n]), e.jsx("textarea", { ...p, ref: t, value: m, className: a ? `${w} ${a}` : w, style: { ...x, height: o } });
});
function se({ llmProviderProfiles: d = [] }) {
  const [m, g] = s.useState(true), [r, c] = s.useState(() => f());
  s.useEffect(() => {
    const t = () => c(f());
    return window.addEventListener(h, t), () => window.removeEventListener(h, t);
  }, []);
  const a = s.useCallback((t) => {
    c(A(t));
  }, []), x = s.useMemo(() => {
    var _a;
    return ((_a = b(d, r.profileId || E())) == null ? void 0 : _a.id) ?? "";
  }, [d, r.profileId]), p = s.useMemo(() => {
    const t = String(r.modelId || "").trim();
    if (t) return t;
    const o = b(d, x);
    return o ? y(o.id, o.kind) || S(o.kind) : "";
  }, [d, x, r.modelId]), l = s.useCallback((t) => {
    const o = t.trim();
    L(o);
    const n = b(d, o), u = n ? y(n.id, n.kind) || S(n.kind) : "";
    a({ profileId: o || null, modelId: u.trim() || null });
  }, [d, a]), i = s.useCallback((t) => {
    const o = t.trim(), n = b(d, x);
    n && M(n.id, o), a({ modelId: o || null });
  }, [d, x, a]);
  return e.jsx("div", { id: "settings-quiz", tabIndex: -1, className: "scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong", children: e.jsxs(v, { open: m, onOpenChange: g, children: [e.jsx(I, { children: "\uD034\uC988 (quiz.md)" }), e.jsxs(T, { children: [e.jsx("p", { className: "mb-4 text-xs text-gray-600 dark:text-odp-muted", children: "AI \uCD9C\uC81C\xB7\uC8FC\uAD00\uC2DD \uCC44\uC810\xB7\uADFC\uAC70 \uBB38\uC11C(RAG)\uC5D0 \uC0AC\uC6A9\uD558\uB294 \uC804\uC5ED \uAE30\uBCF8\uAC12\uC785\uB2C8\uB2E4. \uBCF4\uAE30 \uAC1C\uC218\uC640 \uADFC\uAC70 \uD30C\uC77C \uBAA9\uB85D\uC740 \uAC01 `.quiz.md` \uD30C\uC77C\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4." }), e.jsxs("div", { className: "mb-4 space-y-2", children: [e.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "AI \uC81C\uACF5\uC790" }), e.jsx(R, { profiles: d, profileId: x, model: p, onProfileIdChange: l, onModelChange: i }), e.jsx("p", { className: "text-[11px] text-gray-500 dark:text-odp-muted", children: "\uD034\uC988 \uBAA8\uB4DC \uCD9C\uC81C\xB7\uCC44\uC810\xB7\uBCF4\uAE30 \uBD84\uC11D\uC5D0 \uC0AC\uC6A9\uD560 \uAE30\uBCF8 \uC81C\uACF5\uC790\uC640 \uBAA8\uB378\uC785\uB2C8\uB2E4." })] }), e.jsxs("label", { className: "mb-4 block space-y-1.5", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uCD9C\uC81C Temperature" }), e.jsx("span", { className: "font-mono text-xs text-blue-600", children: r.temperature.toFixed(1) })] }), e.jsx("input", { type: "range", min: 0, max: 2, step: 0.1, value: r.temperature, onChange: (t) => a({ temperature: Number(t.target.value) }), className: "w-full accent-blue-600" })] }), e.jsxs("label", { className: "mb-4 block space-y-1.5", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uC8FC\uAD00\uC2DD \uCC44\uC810 Temperature" }), e.jsx("span", { className: "font-mono text-xs text-blue-600", children: r.gradeTemperature.toFixed(2) })] }), e.jsx("input", { type: "range", min: 0, max: 1, step: 0.05, value: r.gradeTemperature, onChange: (t) => a({ gradeTemperature: Number(t.target.value) }), className: "w-full accent-blue-600" })] }), e.jsxs("div", { className: "mb-4 space-y-2", children: [e.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uACC4\uC0B0 \uBB38\uC81C \uB09C\uC774\uB3C4" }), e.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [e.jsx("button", { type: "button", className: `rounded-xl border px-3 py-2 text-xs font-bold ${r.calcComplexity === "hand" ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft"}`, onClick: () => a({ calcComplexity: "hand" }), children: "\uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5" }), e.jsx("button", { type: "button", className: `rounded-xl border px-3 py-2 text-xs font-bold ${r.calcComplexity === "calculator" ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft"}`, onClick: () => a({ calcComplexity: "calculator" }), children: "\uACC4\uC0B0\uAE30 \uD544\uC218" })] })] }), e.jsxs("div", { className: "mb-4 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: [e.jsxs("div", { className: "min-w-0", children: [e.jsx("p", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uD328\uB110 width spring \uC560\uB2C8\uBA54\uC774\uC158" }), e.jsx("p", { className: "mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted", children: "\uCF1C\uBA74 \uC0AC\uC774\uB4DC \uD328\uB110\uC774 \uB108\uBE44 spring\uC73C\uB85C \uC5F4\uB9BD\uB2C8\uB2E4. Safari\xB7WebView\uC5D0\uC11C\uB294 \uBB34\uAC70\uC6B8 \uC218 \uC788\uC5B4 \uAE30\uBCF8\uC740 \uC2AC\uB77C\uC774\uB4DC(translate) \uBC29\uC2DD\uC785\uB2C8\uB2E4." })] }), e.jsx(j, { className: `relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400 ${r.dockWidthSpringAnim ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"}`, checked: r.dockWidthSpringAnim, onCheckedChange: (t) => a({ dockWidthSpringAnim: t }), "aria-label": "\uD328\uB110 width spring \uC560\uB2C8\uBA54\uC774\uC158", children: e.jsx(N, { className: "block size-4 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[18px]" }) })] }), e.jsxs("div", { className: "mb-4 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: [e.jsxs("div", { className: "min-w-0", children: [e.jsx("p", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "AI \uC0DD\uC131 \uC644\uB8CC \uC2DC \uC790\uB3D9 \uC800\uC7A5" }), e.jsx("p", { className: "mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted", children: "\uC720\uC0AC\uBB38\uC81C\xB7\uADFC\uAC70 \uCD9C\uC81C\xB7\uBCF4\uAE30 \uBD84\uC11D\xB7\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uB4F1 AI \uC0DD\uC131\uC774 \uB05D\uB098\uBA74 \uD034\uC988 \uD30C\uC77C\uC744 \uC989\uC2DC \uC800\uC7A5\uD569\uB2C8\uB2E4." })] }), e.jsx(j, { className: `relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400 ${r.autoSaveOnAiGenerate ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"}`, checked: r.autoSaveOnAiGenerate, onCheckedChange: (t) => a({ autoSaveOnAiGenerate: t }), "aria-label": "AI \uC0DD\uC131 \uC644\uB8CC \uC2DC \uC790\uB3D9 \uC800\uC7A5", children: e.jsx(N, { className: "block size-4 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[18px]" }) })] }), e.jsxs("label", { className: "mb-4 block space-y-1.5", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uCD9C\uC81C \uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8" }), e.jsxs(z, { type: "button", variant: "tertiary", size: "sm", onClick: () => a({ systemPrompt: F }), children: [e.jsx(_, { size: 12 }), "\uAE30\uBCF8\uAC12"] })] }), e.jsx(Q, { layoutKey: m, minHeight: 112, value: r.systemPrompt, onChange: (t) => a({ systemPrompt: t.target.value }) })] }), e.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [e.jsxs("label", { className: "block space-y-1", children: [e.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "RAG topK" }), e.jsx("input", { type: "number", min: 1, max: 64, className: "w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: r.ragTopK, onChange: (t) => a({ ragTopK: Number(t.target.value) || k.ragTopK }) })] }), e.jsxs("label", { className: "block space-y-1", children: [e.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "RAG maxChars" }), e.jsx("input", { type: "number", min: 2e3, max: 5e5, step: 1e3, className: "w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: r.ragMaxChars, onChange: (t) => a({ ragMaxChars: Number(t.target.value) || k.ragMaxChars }) })] })] })] })] }) });
}
export {
  se as default
};
