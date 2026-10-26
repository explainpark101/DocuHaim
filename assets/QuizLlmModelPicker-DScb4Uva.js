import { r as p, j as a } from "./vendor-react-BPvvDyqO.js";
import { O as o, M as m, G as x } from "./OpenAiCompatibleModelSelect-C6yz_Q8k.js";
import { L as d, a as L } from "./LlamaCppModelSelect-pmkC_39k.js";
import { o as u, L as j, p as f, e as g } from "./index-BYVoYwQr.js";
import { c as y } from "./bootSplash-Z2krRgC9.js";
function k({ profiles: i, profileId: r, model: s, onProfileIdChange: c, onModelChange: l, disabled: n = false, autoLoadModels: t = true }) {
  const e = p.useMemo(() => u(i, r), [i, r]);
  return a.jsxs("div", { className: `space-y-2 ${n ? "pointer-events-none opacity-60" : ""}`, children: [a.jsxs("label", { className: "block space-y-1", children: [a.jsx("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uC81C\uACF5\uC790" }), a.jsx(d, { profiles: i, value: r, onChange: c, className: "text-xs" })] }), e ? a.jsxs("label", { className: "block space-y-1", children: [a.jsx("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uBAA8\uB378" }), e.kind === j ? a.jsx(o, { reloadKey: `${e.id}:${e.baseUrl || ""}`, getBaseUrl: () => e.baseUrl || "", getApiKey: () => e.apiKey || "", value: s, onChange: l, autoLoad: t }, `${e.id}-openai`) : e.kind === f ? y() ? a.jsx(L, { value: s, onChange: l, autoLoad: t }, `${e.id}-llama-cpp`) : a.jsx(o, { reloadKey: `${e.id}:${e.baseUrl || ""}`, getBaseUrl: () => e.baseUrl || "", getApiKey: () => e.apiKey || "", value: s, onChange: l, autoLoad: t, aliasScope: "llama-cpp" }, `${e.id}-llama-cpp-remote`) : e.kind === g ? a.jsx(m, { value: s, onChange: l, autoLoad: t, autoLoadModelOnSelect: false }, `${e.id}-mlx`) : a.jsx(x, { getGeminiApiKey: () => e.apiKey || "", profileId: e.id, value: s, onChange: l, autoLoad: t }, `${e.id}-gemini`)] }) : null] });
}
export {
  k as Q
};
