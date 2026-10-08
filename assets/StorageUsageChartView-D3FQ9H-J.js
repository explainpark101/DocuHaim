import { j as t } from "./vendor-react-BLJzfvPB.js";
import { f as l } from "./SettingsPage-mir0BjA-.js";
import { R as m, B as d, X as h, Y as c, T as s, a as x, C as n, P as u, b as g, L as f } from "./vendor-recharts-DkxceWoF.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./index-CSFc8FdZ.js";
import "./vendor-lucide--whUmDUa.js";
import "./bootSplash-QPCcRCUR.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-DSEw68MZ.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-4pFcYp0u.js";
import "./WebfontCssEditorModal-DikLToXF.js";
import "./vendor-codemirror-C7kLKAJE.js";
import "./SettingsCollapsibleHeading-DTzvr_SS.js";
import "./TableStyleTemplateEditor-DMz6L0Mu.js";
import "./index-Dj2EGo58.js";
import "./haimCodeBlockLanguages-BStQPvla.js";
import "./haimCodeTabSettings-BI7a8VYQ.js";
import "./settingsPageScroll-B8Cqlh2L.js";
import "./QuizSettings-HZMzq2i4.js";
import "./QuizLlmModelPicker-B7bQ_IH6.js";
import "./OpenAiCompatibleModelSelect-CdR4lnZL.js";
import "./vendor-google-genai-CCGW7xFw.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./LlamaCppModelSelect-CWbyxJs4.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./LlmProviderProfilesSettings-DcpUdbmL.js";
import "./MlxVlmSettings-B6iJnZ-R.js";
import "./MlxVlmDownloadButtonContent-BqJMuMZT.js";
import "./LlamaCppSettings-DXNCyDgX.js";
import "./vendor-react-aria-Bh-vrwqW.js";
import "./vendor-mermaid-BabYrQ_n.js";
import "./vendor-tiptap-B9z9WF3R.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-CyieoItt.js";
function p({ active: e, payload: i }) {
  var _a;
  if (!e || !(i == null ? void 0 : i.length)) return null;
  const o = i[0], a = (o == null ? void 0 : o.name) ?? ((_a = o == null ? void 0 : o.payload) == null ? void 0 : _a.name) ?? "", r = Number((o == null ? void 0 : o.value) ?? 0);
  return t.jsxs("div", { className: "rounded border border-gray-200 bg-white px-2 py-1 text-[11px] shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [t.jsx("div", { className: "font-semibold", children: a }), t.jsx("div", { className: "tabular-nums text-gray-600 dark:text-odp-muted", children: l(r) })] });
}
function rt({ kind: e, data: i }) {
  if (e === "bar") return t.jsx(m, { width: "100%", height: 176, children: t.jsxs(d, { data: i, margin: { top: 8, right: 8, left: 0, bottom: 4 }, children: [t.jsx(h, { dataKey: "name", tick: { fontSize: 10 }, interval: 0, angle: -25, textAnchor: "end", height: 48 }), t.jsx(c, { tick: { fontSize: 10 }, width: 44, tickFormatter: (r) => l(Number(r)) }), t.jsx(s, { content: t.jsx(p, {}) }), t.jsx(x, { dataKey: "value", radius: [3, 3, 0, 0], children: i.map((r) => t.jsx(n, { fill: r.fill }, `bar-${r.name}`)) })] }) });
  const a = e === "donut" ? "52%" : 0;
  return t.jsx(m, { width: "100%", height: 176, children: t.jsxs(u, { children: [t.jsx(g, { data: i, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", innerRadius: a, outerRadius: "78%", paddingAngle: 1, stroke: "transparent", children: i.map((r) => t.jsx(n, { fill: r.fill }, `slice-${r.name}`)) }), t.jsx(s, { content: t.jsx(p, {}) }), t.jsx(f, { verticalAlign: "bottom", height: 28, wrapperStyle: { fontSize: 10 } })] }) });
}
export {
  rt as default
};
