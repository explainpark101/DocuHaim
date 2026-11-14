import { r as d, j as a } from "./vendor-react-BPvvDyqO.js";
import { O as r, M as L, G as u } from "./OpenAiCompatibleModelSelect-BuEuB2ht.js";
import { L as f, a as P } from "./LlamaCppModelSelect-DP1c1DGV.js";
import { q as j, L as k, e as n, i as E, t as p, u as g, f as v } from "./index-BebLgvYF.js";
import { c as y } from "./bootSplash-Z2krRgC9.js";
function b({ profiles: i, profileId: o, model: s, onProfileIdChange: c, onModelChange: l, disabled: m = false, autoLoadModels: t = true }) {
  const e = d.useMemo(() => j(i, o), [i, o]);
  return a.jsxs("div", { className: `space-y-2 ${m ? "pointer-events-none opacity-60" : ""}`, children: [a.jsxs("label", { className: "block space-y-1", children: [a.jsx("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uC81C\uACF5\uC790" }), a.jsx(f, { profiles: i, value: o, onChange: c, className: "text-xs" })] }), e ? a.jsxs("label", { className: "block space-y-1", children: [a.jsx("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uBAA8\uB378" }), e.kind === k || e.kind === n ? a.jsx(r, { reloadKey: `${e.id}:${p(e)}`, getBaseUrl: () => p(e), getApiKey: () => e.apiKey || "", ...e.kind === n ? { listModels: ({ apiKey: x }) => E(x), placeholder: "\uBAA8\uB378 ID (\uC608: k-exaone_v2.5)", helpText: "\uC0C8\uB85C\uACE0\uCE68\uC73C\uB85C EXAONE \uBAA8\uB378\uC744 \uBD88\uB7EC\uC624\uAC70\uB098, \uBAA8\uB378 ID\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694." } : {}, value: s, onChange: l, autoLoad: t }, `${e.id}-${e.kind}`) : e.kind === g ? y() ? a.jsx(P, { value: s, onChange: l, autoLoad: t }, `${e.id}-llama-cpp`) : a.jsx(r, { reloadKey: `${e.id}:${e.baseUrl || ""}`, getBaseUrl: () => e.baseUrl || "", getApiKey: () => e.apiKey || "", value: s, onChange: l, autoLoad: t, aliasScope: "llama-cpp" }, `${e.id}-llama-cpp-remote`) : e.kind === v ? a.jsx(L, { value: s, onChange: l, autoLoad: t, autoLoadModelOnSelect: false }, `${e.id}-mlx`) : a.jsx(u, { getGeminiApiKey: () => e.apiKey || "", profileId: e.id, value: s, onChange: l, autoLoad: t }, `${e.id}-gemini`)] }) : null] });
}
export {
  b as Q
};
