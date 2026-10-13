import { j as t } from "./vendor-react-ChQ1w2We.js";
import { J as d } from "./index-DBT6Tkco.js";
import { R as s, B as h, X as p, Y as c, T as n, a as x, C as m, P as u, b as g, L as f } from "./vendor-recharts-DFld3ky4.js";
import "./vendor-aws-DKtg11UV.js";
import "./vendor-lucide-Dbi0QnKF.js";
import "./bootSplash-Dmg87Il5.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-L8D9Iqni.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./vendor-radix-DFHhpIsj.js";
import "./vendor-mermaid-D8XgPlSD.js";
import "./vendor-tiptap-BiD2it08.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-C3cP4Xc_.js";
import "./vendor-codemirror-CohftLwi.js";
function l({ active: i, payload: r }) {
  var _a;
  if (!i || !(r == null ? void 0 : r.length)) return null;
  const a = r[0], o = (a == null ? void 0 : a.name) ?? ((_a = a == null ? void 0 : a.payload) == null ? void 0 : _a.name) ?? "", e = Number((a == null ? void 0 : a.value) ?? 0);
  return t.jsxs("div", { className: "rounded border border-gray-200 bg-white px-2 py-1 text-[11px] shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [t.jsx("div", { className: "font-semibold", children: o }), t.jsx("div", { className: "tabular-nums text-gray-600 dark:text-odp-muted", children: d(e) })] });
}
function T({ kind: i, data: r }) {
  if (i === "bar") return t.jsx(s, { width: "100%", height: 176, children: t.jsxs(h, { data: r, margin: { top: 8, right: 8, left: 0, bottom: 4 }, children: [t.jsx(p, { dataKey: "name", tick: { fontSize: 10 }, interval: 0, angle: -25, textAnchor: "end", height: 48 }), t.jsx(c, { tick: { fontSize: 10 }, width: 44, tickFormatter: (e) => d(Number(e)) }), t.jsx(n, { content: t.jsx(l, {}) }), t.jsx(x, { dataKey: "value", radius: [3, 3, 0, 0], children: r.map((e) => t.jsx(m, { fill: e.fill }, `bar-${e.name}`)) })] }) });
  const o = i === "donut" ? "52%" : 0;
  return t.jsx(s, { width: "100%", height: 176, children: t.jsxs(u, { children: [t.jsx(g, { data: r, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", innerRadius: o, outerRadius: "78%", paddingAngle: 1, stroke: "transparent", children: r.map((e) => t.jsx(m, { fill: e.fill }, `slice-${e.name}`)) }), t.jsx(n, { content: t.jsx(l, {}) }), t.jsx(f, { verticalAlign: "bottom", height: 28, wrapperStyle: { fontSize: 10 } })] }) });
}
export {
  T as default
};
