import { r as c, j as a } from "./vendor-react-BLJzfvPB.js";
import { O as o, M as m, G as x } from "./OpenAiCompatibleModelSelect-J5DeiUdB.js";
import { L as d, a as L } from "./LlamaCppModelSelect-D2jBNOI2.js";
import { o as u, L as j, p as b, e as f } from "./index-CzDTh_Dm.js";
import { b as g } from "./bootSplash-QPCcRCUR.js";
function k({ profiles: i, profileId: r, model: s, onProfileIdChange: n, onModelChange: l, disabled: p = false, autoLoadModels: t = true }) {
  const e = c.useMemo(() => u(i, r), [i, r]);
  return a.jsxs("div", { className: `space-y-2 ${p ? "pointer-events-none opacity-60" : ""}`, children: [a.jsxs("label", { className: "block space-y-1", children: [a.jsx("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uC81C\uACF5\uC790" }), a.jsx(d, { profiles: i, value: r, onChange: n, className: "text-xs" })] }), e ? a.jsxs("label", { className: "block space-y-1", children: [a.jsx("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uBAA8\uB378" }), e.kind === j ? a.jsx(o, { reloadKey: `${e.id}:${e.baseUrl || ""}`, getBaseUrl: () => e.baseUrl || "", getApiKey: () => e.apiKey || "", value: s, onChange: l, autoLoad: t }, `${e.id}-openai`) : e.kind === b ? g() ? a.jsx(L, { value: s, onChange: l, autoLoad: t }, `${e.id}-llama-cpp`) : a.jsx(o, { reloadKey: `${e.id}:${e.baseUrl || ""}`, getBaseUrl: () => e.baseUrl || "", getApiKey: () => e.apiKey || "", value: s, onChange: l, autoLoad: t, aliasScope: "llama-cpp" }, `${e.id}-llama-cpp-remote`) : e.kind === f ? a.jsx(m, { value: s, onChange: l, autoLoad: t, autoLoadModelOnSelect: false }, `${e.id}-mlx`) : a.jsx(x, { getGeminiApiKey: () => e.apiKey || "", profileId: e.id, value: s, onChange: l, autoLoad: t }, `${e.id}-gemini`)] }) : null] });
}
export {
  k as Q
};
