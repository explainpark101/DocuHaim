import { r as n, j as e } from "./vendor-react-BPvvDyqO.js";
import { N as T, T as $, O as j } from "./index-Cc1jKdr9.js";
import { Q as H } from "./QuizLlmModelPicker-BlDLwc6d.js";
import { Q } from "./QuizPane-DdUy3rT0.js";
import { X as R, S as W } from "./vendor-lucide-BMfkLP2z.js";
import "./vendor-aws-hJDgVEKM.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-radix-C_q1g830.js";
import "./OpenAiCompatibleModelSelect-CNVPsjM1.js";
import "./geminiClient-DXF3HNWj.js";
import "./vendor-google-genai-BsvcYwA0.js";
import "./openaiCompatibleClient-DDjC_ayR.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./LlamaCppModelSelect-CcvgaduJ.js";
import "./resolveVaultFileNode-DrX64KGs.js";
import "./useDocumentTheme-CuHWaX7F.js";
import "./useWikiImageHydration-C0sh6LLO.js";
import "./wikiImageResolver-DARcjyxH.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./mlxVlmGenerateClient-Dyocp-TM.js";
const A = 320, L = $;
function O(i, r) {
  if (r === "followup") return "\uCD94\uAC00 \uC9C8\uBB38";
  const t = i ? "\uC815\uB2F5 \uBD84\uC11D" : "\uC624\uB2F5 \uBD84\uC11D";
  return r === "regenerate" ? `${t} \uC7AC\uC0DD\uC131` : t;
}
function _({ open: i, question: r, option: t, mode: c, existingAnalysis: b = "", llmProfiles: N, profileId: w, model: y, onProfileIdChange: v, onModelChange: z, busy: s, onClose: f, onGenerate: m }) {
  const [a, h] = n.useState(""), { width: u, handleProps: S, isResizing: g } = T({ storageKey: "quiz-choice-analysis-dock-width", defaultWidth: A, minWidth: 260, maxWidth: 560, edge: "right" }), o = r != null && t != null && t === r.answer, k = O(o, c), p = o ? "border-emerald-200 dark:border-emerald-900/60" : "border-rose-200 dark:border-rose-900/60", C = o ? "bg-emerald-50 dark:bg-emerald-950/40" : "bg-rose-50 dark:bg-rose-950/40", D = o ? "text-emerald-900 dark:text-emerald-100" : "text-rose-900 dark:text-rose-100", l = c === "followup", x = l, E = !s && (!x || a.trim().length > 0);
  n.useEffect(() => {
    i && h("");
  }, [i, r == null ? void 0 : r.id, t, c]);
  const K = n.useCallback((d) => {
    s || x && !a.trim() || d.key !== "Enter" || !d.metaKey && !d.ctrlKey || (d.preventDefault(), m(a));
  }, [s, m, a, x]), P = i && r != null && t != null;
  return e.jsx(Q, { motionKey: "quiz-choice-analysis-dock", open: P, width: u, isResizing: g, "aria-label": k, className: `flex h-full shrink-0 flex-col overflow-hidden border-l bg-white shadow-lg dark:bg-odp-surface ${p}`, children: r != null && t != null ? e.jsxs("div", { className: "relative h-full min-h-0", style: { width: u }, children: [e.jsx(L, { edge: "left", handleProps: S, isResizing: g, visibleOnHover: true, label: "\uBD84\uC11D \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), e.jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [e.jsxs("div", { className: `flex items-center justify-between border-b px-3 py-2.5 ${p}`, children: [e.jsx("div", { className: "min-w-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: k }), e.jsx("button", { type: "button", "aria-label": "\uBD84\uC11D \uD328\uB110 \uB2EB\uAE30", className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg", onClick: f, disabled: s, children: e.jsx(R, { size: 16 }) })] }), e.jsxs("div", { className: "min-h-0 flex-1 space-y-3 overflow-y-auto p-3", children: [e.jsxs("div", { className: `rounded-lg px-2.5 py-2 text-[11px] ${C} ${D}`, children: [e.jsxs("div", { className: "font-semibold", children: [r.displayLabel, "\uBC88 \xB7 ", t, "\uBC88 \uBCF4\uAE30", o ? " (\uC815\uB2F5)" : ""] }), e.jsx("p", { className: "mt-1 line-clamp-3 opacity-90", children: r.question })] }), l && b.trim() ? e.jsxs("div", { className: "rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-[10px] text-slate-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-muted", children: [e.jsx("div", { className: "mb-1 font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uAE30\uC874 \uBD84\uC11D" }), e.jsx("p", { className: "line-clamp-6 whitespace-pre-wrap", children: b.trim() })] }) : null, e.jsx(H, { profiles: N, profileId: w, model: y, onProfileIdChange: v, onModelChange: z, disabled: s, autoLoadModels: false }), e.jsxs("label", { className: "block space-y-1.5", children: [e.jsxs("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: [l ? "\uCD94\uAC00 \uC9C8\uBB38" : "\uAD81\uAE08\uD55C \uC810", e.jsx("span", { className: "ml-1 font-normal text-slate-500 dark:text-odp-muted", children: l ? "(\uD544\uC218)" : "(\uC120\uD0DD)" })] }), e.jsx("textarea", { className: "quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", placeholder: l ? "\uC608: \uC9C0\uB2C8 \uC9C0\uC218\uC640 \uC5D4\uD2B8\uB85C\uD53C\uC758 \uC218\uC2DD\uC801 \uCC28\uC774\uAC00 \uBB54\uAC00\uC694?" : o ? "\uBE44\uC6CC \uB450\uBA74 \uC815\uB2F5/\uC624\uB2F5 \uC774\uC720\uB97C \uAE30\uBCF8 \uC124\uBA85\uD569\uB2C8\uB2E4. \uC608: \uC65C \uC774 \uBCF4\uAE30\uAC00 \uC815\uB2F5\uC778\uC9C0\u2026" : "\uBE44\uC6CC \uB450\uBA74 \uC624\uB2F5 \uC774\uC720\uB97C \uAE30\uBCF8 \uC124\uBA85\uD569\uB2C8\uB2E4. \uC608: 2\uBC88\uACFC 3\uBC88\uC758 \uCC28\uC774\u2026", value: a, disabled: s, onChange: (d) => h(d.target.value), onKeyDown: K }), e.jsxs("p", { className: "text-[10px] text-slate-500 dark:text-odp-muted", children: [l ? "\uAE30\uC874 \uBD84\uC11D\uACFC \uBB38\uC81C \uB0B4\uC6A9\uC744 \uBC14\uD0D5\uC73C\uB85C \uB2F5\uBCC0\uD569\uB2C8\uB2E4." : "\uBE44\uC6CC \uB450\uACE0 \uC0DD\uC131\uD558\uBA74 \uAE30\uBCF8 \uD504\uB86C\uD504\uD2B8\uB85C \uC124\uBA85\uD569\uB2C8\uB2E4.", " ", e.jsx("kbd", { className: "rounded border border-slate-300 bg-slate-100 px-1 py-px font-mono text-[9px] dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: "\u2318/Ctrl+Enter" }), "\uB85C \uBC14\uB85C \uC0DD\uC131\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] })] })] }), e.jsxs("div", { className: `flex gap-2 border-t p-3 ${p}`, children: [e.jsx(j, { type: "button", variant: "secondary", size: "sm", className: "flex-1", disabled: s, onClick: f, children: "\uCDE8\uC18C" }), e.jsxs(j, { type: "button", variant: "primary", size: "sm", className: "flex-1", disabled: !E, onClick: () => m(a), children: [e.jsx(W, { size: 14 }), s ? "\uC0DD\uC131 \uC911\u2026" : l ? "\uB2F5\uBCC0 \uC0DD\uC131" : "\uC0DD\uC131"] })] })] })] }) : null });
}
const pe = n.memo(_);
export {
  pe as default
};
