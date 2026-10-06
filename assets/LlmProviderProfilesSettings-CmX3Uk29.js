import { r as s, j as e } from "./vendor-react-BLJzfvPB.js";
import { b as T, d as O, s as P, L as o, e as x, f as u, h as K, i as _, v as V, j as $ } from "./index-BB3Er7Kj.js";
import { G as F, M as X, O as z } from "./OpenAiCompatibleModelSelect-DmeI6nk6.js";
import { S as H, a as q, b as J } from "./SettingsCollapsibleHeading-BhaIL-tj.js";
import { a as Q } from "./bootSplash-QPCcRCUR.js";
import { P as W, T as Y, a as Z } from "./vendor-lucide-DPPF2CDs.js";
import { b as ee, d as N, e as I } from "./vendor-radix-4pFcYp0u.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-DSEw68MZ.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-google-genai-CCGW7xFw.js";
import "./localLlmModelAliases-EglLH-3U.js";
const C = "size-3.5 rounded-full border border-gray-400 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft", L = "relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white";
function te(d) {
  return d === u ? "Google Gemini" : d === x ? "MLX-VLM (local)" : "OpenAI \uD638\uD658";
}
function re() {
  return { id: $(), name: "", kind: o, baseUrl: "", keyInput: "", hasStoredKey: false };
}
function ae(d) {
  return { id: d.id, name: d.name, kind: d.kind, baseUrl: d.baseUrl, keyInput: "", hasStoredKey: !!d.apiKey.trim() };
}
function ke({ profiles: d, onSaveProfiles: M, compact: h = false }) {
  const [A, U] = s.useState(true), [t, l] = s.useState(null), [p, k] = s.useState(null), [m, f] = s.useState(null), [y, D] = s.useState(0), [j, b] = s.useState(""), n = s.useMemo(() => p ? d.find((r) => r.id === p) ?? null : null, [p, d]);
  s.useEffect(() => {
    if (!t) {
      b("");
      return;
    }
    b(T(t.id, t.kind) || O(t.kind));
  }, [t == null ? void 0 : t.id, t == null ? void 0 : t.kind]);
  const v = s.useCallback((r) => {
    t && (b(r), P(t.id, r));
  }, [t]), w = () => {
    k(null), l(re());
  }, R = (r) => {
    k(r.id), l(ae(r));
  }, S = () => {
    l(null), k(null);
  }, G = () => {
    if (!t) return;
    const r = V({ name: t.name, kind: t.kind, baseUrl: t.baseUrl, apiKey: t.keyInput, hasStoredKey: t.hasStoredKey });
    if (r) {
      alert(r);
      return;
    }
    const a = t.keyInput.trim() || ((n == null ? void 0 : n.id) === t.id ? n.apiKey : ""), i = { id: t.id, name: t.name.trim(), kind: t.kind, baseUrl: t.kind === o ? K(t.baseUrl) : "", apiKey: a }, B = d.some((g) => g.id === i.id) ? d.map((g) => g.id === i.id ? i : g) : [...d, i];
    M(B), S();
  }, E = () => {
    if (!m) return;
    const r = d.filter((a) => a.id !== m.id);
    M(r), (t == null ? void 0 : t.id) === m.id && S(), f(null);
  };
  return e.jsxs(H, { id: "settings-llm-providers", contentKey: "settings-llm-providers", open: A, onOpenChange: U, tabIndex: -1, className: "scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface", children: [e.jsx(q, { children: "AI \uB3C4\uC6B0\uBBF8 \uC81C\uACF5\uC790" }), e.jsx(J, { children: e.jsxs(e.Fragment, { children: [h ? null : e.jsxs("p", { className: "text-xs text-gray-600 dark:text-odp-muted", children: ["Gemini\uC640 OpenAI \uD638\uD658 endpoint\uB97C \uC5EC\uB7EC \uAC1C \uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC2E4\uC81C \uC0AC\uC6A9\uD560 \uC81C\uACF5\uC790\uB294 \uC5D0\uB514\uD130 AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uACE0\uB985\uB2C8\uB2E4. API \uD0A4\uB294 \uC5F0\uACB0 \uC815\uBCF4\uC640 \uD568\uAED8 \uC554\uD638\uD654\uB418\uBA70, \uC774 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uD45C\uC2DC\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uC6F9\uC5D0\uC11C\uB294 Gemini \uC694\uCCAD\uC774 Google AI Studio(", e.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "generativelanguage.googleapis.com" }), ")\uB85C \uC9C1\uC811 \uC804\uC1A1\uB429\uB2C8\uB2E4. Tauri \uC571\uC740 \uB124\uC774\uD2F0\uBE0C HTTP\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. OpenAI \uD638\uD658 endpoint\uB294 CORS\uAC00 \uD5C8\uC6A9\uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4."] }), d.length === 0 ? e.jsx("p", { className: "text-xs text-gray-500 dark:text-odp-muted", children: "\uC800\uC7A5\uB41C \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC544\uB798 \uBC84\uD2BC\uC73C\uB85C \uCD94\uAC00\uD558\uC138\uC694." }) : e.jsx("ul", { className: "space-y-1.5", children: d.map((r) => e.jsxs("li", { className: "flex items-center justify-between gap-2 rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: [e.jsxs("div", { className: "min-w-0", children: [e.jsx("div", { className: "truncate text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: r.name }), e.jsxs("div", { className: "truncate text-[11px] text-gray-500 dark:text-odp-muted", children: [te(r.kind), r.kind === o && r.baseUrl ? ` \xB7 ${r.baseUrl}` : r.kind === x ? " \xB7 Apple Silicon local" : ""] })] }), e.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [e.jsxs("button", { type: "button", onClick: () => R(r), className: "inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg", children: [e.jsx(W, { className: "h-3 w-3", "aria-hidden": true }), "\uD3B8\uC9D1"] }), e.jsxs("button", { type: "button", onClick: () => f(r), className: "inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40", children: [e.jsx(Y, { className: "h-3 w-3", "aria-hidden": true }), "\uC0AD\uC81C"] })] })] }, r.id)) }), t ? e.jsxs("div", { className: "space-y-3 rounded border border-gray-200 bg-white p-3 dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: [e.jsx("p", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: p ? "\uC81C\uACF5\uC790 \uD3B8\uC9D1" : "\uC81C\uACF5\uC790 \uCD94\uAC00" }), e.jsxs("div", { children: [e.jsx("label", { className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted", children: "\uC774\uB984" }), e.jsx("input", { type: "text", autoComplete: "off", className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bg", value: t.name, onChange: (r) => l((a) => a && { ...a, name: r.target.value }), placeholder: "\uC608: OpenRouter, \uB85C\uCEEC Ollama" })] }), e.jsxs("div", { children: [e.jsx("p", { className: "mb-1.5 text-xs font-semibold text-gray-600 dark:text-odp-muted", children: "\uC885\uB958" }), e.jsxs(ee, { className: "flex flex-wrap items-center gap-4", value: t.kind, onValueChange: (r) => {
    if (r !== u && r !== o && r !== x) return;
    const a = r, i = O(a);
    l((c) => c && (P(c.id, i), { ...c, kind: a, keyInput: "", hasStoredKey: (n == null ? void 0 : n.kind) === a && !!n.apiKey.trim() })), b(i), D((c) => c + 1);
  }, "aria-label": "\uC81C\uACF5\uC790 \uC885\uB958", children: [e.jsxs("label", { className: "flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg", children: [e.jsx(N, { value: u, className: C, children: e.jsx(I, { className: L }) }), e.jsx("span", { children: "Google Gemini" })] }), e.jsxs("label", { className: "flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg", children: [e.jsx(N, { value: o, className: C, children: e.jsx(I, { className: L }) }), e.jsx("span", { children: "OpenAI \uD638\uD658" })] }), Q() ? e.jsxs("label", { className: "flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg", children: [e.jsx(N, { value: x, className: C, children: e.jsx(I, { className: L }) }), e.jsx("span", { children: "MLX-VLM (\uB85C\uCEEC, Apple Silicon)" })] }) : null] })] }), t.kind === x && !h ? e.jsxs("div", { className: "rounded border border-emerald-200 bg-emerald-50/60 p-2.5 text-[11px] leading-relaxed text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-100", children: ["MLX-VLM \uC11C\uBC84 \uC2DC\uC791\xB7\uBAA8\uB378 \uC124\uCE58\uB294 \uC124\uC815\uC758", " ", e.jsx("a", { href: "#settings-mlx-vlm", className: "underline", children: "MLX-VLM (Tauri macOS)" }), " ", "\uC139\uC158\uC5D0\uC11C \uAD00\uB9AC\uD558\uC138\uC694."] }) : null, t.kind === o ? e.jsxs("div", { children: [e.jsx("label", { className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted", children: "Endpoint URL" }), e.jsx("input", { type: "text", autoComplete: "off", className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bg", value: t.baseUrl, onChange: (r) => l((a) => a && { ...a, baseUrl: r.target.value }), placeholder: "https://api.openai.com/v1" }), h ? null : e.jsx("p", { className: "mt-1.5 text-[11px] text-gray-500 dark:text-odp-muted", children: "\uC608: https://api.openai.com/v1 , https://openrouter.ai/api/v1 , http://localhost:11434/v1" })] }) : null, e.jsxs("div", { children: [e.jsxs("label", { className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted", children: ["API Key", t.kind === o ? " (\uC120\uD0DD)" : ""] }), e.jsx("input", { type: "password", autoComplete: "off", className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bg", value: t.keyInput, onChange: (r) => l((a) => a && { ...a, keyInput: r.target.value }), placeholder: t.hasStoredKey ? "\uC800\uC7A5\uB428 \u2014 \uBCC0\uACBD \uC2DC \uC0C8 \uD0A4 \uC785\uB825" : t.kind === u ? "AI Studio API \uD0A4 \uC785\uB825" : "Bearer \uD1A0\uD070 (\uB85C\uCEEC \uC11C\uBC84\uB294 \uBE44\uC6CC \uB450\uC138\uC694)" })] }), e.jsxs("div", { children: [e.jsx("label", { className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted", children: "\uAE30\uBCF8 \uBAA8\uB378" }), t.kind === u ? e.jsx(F, { getGeminiApiKey: () => t.keyInput.trim() || ((n == null ? void 0 : n.kind) === u ? n.apiKey : ""), profileId: t.id, value: j, onChange: v, autoLoad: t.hasStoredKey || !!t.keyInput.trim() }, `${t.id}-${y}`) : t.kind === x ? e.jsx(X, { value: j, onChange: v, autoLoad: true, autoLoadModelOnSelect: false }, `${t.id}-${y}`) : e.jsx(z, { getBaseUrl: () => t.baseUrl, getApiKey: () => t.keyInput.trim() || ((n == null ? void 0 : n.kind) === o ? n.apiKey : ""), value: j, onChange: v, autoLoad: !!K(t.baseUrl) }, `${t.id}-${y}`)] }), e.jsxs("div", { className: "flex justify-end gap-2 pt-1", children: [e.jsx("button", { type: "button", onClick: S, className: "rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", children: "\uCDE8\uC18C" }), e.jsx("button", { type: "button", onClick: G, className: "rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700", children: "\uC81C\uACF5\uC790 \uC800\uC7A5" })] })] }) : e.jsxs("button", { type: "button", onClick: w, className: "inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs hover:bg-gray-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:hover:bg-odp-focusBg", children: [e.jsx(Z, { className: "h-3.5 w-3.5", "aria-hidden": true }), "\uC81C\uACF5\uC790 \uCD94\uAC00"] })] }) }), A ? null : e.jsxs("p", { className: "text-xs text-gray-500 dark:text-odp-muted", children: [d.length, "\uAC1C \uC800\uC7A5\uB428"] }), e.jsx(_, { isOpen: !!m, title: "\uC81C\uACF5\uC790 \uC0AD\uC81C", message: m ? `"${m.name}" \uC81C\uACF5\uC790\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694?` : "", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", variant: "danger", onConfirm: E, onCancel: () => f(null) })] });
}
export {
  ke as default
};
