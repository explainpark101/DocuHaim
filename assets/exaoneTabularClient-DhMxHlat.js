import { O as h, P as y, Q as g, R as $, E as w } from "./index-BebLgvYF.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-react-BPvvDyqO.js";
import "./vendor-lucide-B8TfEQX9.js";
import "./bootSplash-Z2krRgC9.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-radix-CN5WtDh3.js";
function b(r) {
  return !r || typeof r != "object" || Array.isArray(r) ? null : r;
}
function A(r, n) {
  return String(n || "").trim() || r;
}
function N(r) {
  const n = r instanceof Error ? r.message : String(r || "");
  return r instanceof TypeError || /failed to fetch|networkerror|load failed/i.test(n) ? ["EXAONE Tabular \uC11C\uBC84\uC5D0 \uC5F0\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.", "\uBE0C\uB77C\uC6B0\uC800 CORS \uD5C8\uC6A9 \uC5EC\uBD80\uC640 API \uD0A4\uB97C \uD655\uC778\uD558\uC138\uC694.", "\uBB38\uC11C: https://docs.exaone.ai/ko/docs/exaone-tabular"].join(`
`) : n || "EXAONE Tabular \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.";
}
async function _(r) {
  try {
    const n = await r.json(), a = b(n);
    if (!a) return r.statusText;
    if (typeof a.description == "string" && a.description.trim()) return a.description.trim();
    if (typeof a.message == "string" && a.message.trim()) return a.message.trim();
    const i = a.error;
    if (typeof i == "string" && i.trim()) return i.trim();
    if (i && typeof i == "object") {
      const e = i.message;
      if (typeof e == "string" && e.trim()) return e.trim();
    }
  } catch {
  }
  return r.statusText || `HTTP ${r.status}`;
}
function u(r) {
  return String(r ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();
}
function d(r, n) {
  if (!r.length) return -1;
  let a = 0, i = Math.abs((r[0] ?? 0) - n);
  for (let e = 1; e < r.length; e += 1) {
    const t = Math.abs((r[e] ?? 0) - n);
    t < i && (a = e, i = t);
  }
  return a;
}
function m(r) {
  return Number.isFinite(r) ? Math.abs(r) >= 1e3 || Number.isInteger(r) ? String(r) : r.toFixed(6).replace(/\.?0+$/, "") : "";
}
function O(r, n, a) {
  var _a, _b;
  const i = a.data ?? {}, e = Array.isArray(i.target_columns) && i.target_columns[0] ? String(i.target_columns[0]) : "target", t = [`### EXAONE Tabular \xB7 ${r} (${n})`, ""];
  if (r === "classification" && n === "class" && Array.isArray(i.labels)) return t.push(`| row | ${u(e)} |`), t.push("| --- | --- |"), i.labels.forEach((o, s) => {
    const c = Array.isArray(o) ? o[0] : o;
    t.push(`| ${s + 1} | ${u(c)} |`);
  }), `${t.join(`
`)}
`;
  if (r === "classification" && n === "probability" && Array.isArray(i.probabilities)) {
    const s = ["row", ...(Array.isArray((_a = i.classes) == null ? void 0 : _a[0]) ? i.classes[0] : []).map((c) => u(c))];
    return t.push(`| ${s.join(" | ")} |`), t.push(`| ${s.map(() => "---").join(" | ")} |`), i.probabilities.forEach((c, f) => {
      const l = Array.isArray(c == null ? void 0 : c[0]) ? c[0] : [], E = [String(f + 1), ...l.map((p) => u(m(Number(p))))];
      t.push(`| ${E.join(" | ")} |`);
    }), `${t.join(`
`)}
`;
  }
  if (r === "regression" && n === "point" && Array.isArray(i.predictions)) return t.push(`| row | ${u(e)} |`), t.push("| --- | --- |"), i.predictions.forEach((o, s) => {
    const c = Array.isArray(o) ? o[0] : o;
    t.push(`| ${s + 1} | ${u(m(Number(c)))} |`);
  }), `${t.join(`
`)}
`;
  if (r === "regression" && n === "full" && Array.isArray(i.quantiles) && Array.isArray((_b = i.quantile_levels) == null ? void 0 : _b[0])) {
    const o = i.quantile_levels[0], s = d(o, 0.05), c = d(o, 0.5), f = d(o, 0.95);
    return t.push("| row | p05 | p50 | p95 |"), t.push("| --- | --- | --- | --- |"), i.quantiles.forEach((l, E) => {
      const p = Array.isArray(l == null ? void 0 : l[0]) ? l[0] : [];
      t.push(`| ${E + 1} | ${u(m(Number(p[s] ?? "")))} | ${u(m(Number(p[c] ?? "")))} | ${u(m(Number(p[f] ?? "")))} |`);
    }), t.push(""), t.push("_Full quantile distribution truncated to p05 / p50 / p95 for readability._"), `${t.join(`
`)}
`;
  }
  return t.push("```json"), t.push(JSON.stringify(a, null, 2)), t.push("```"), `${t.join(`
`)}
`;
}
function P(r) {
  if (!g(r)) return null;
  const n = $(r);
  return n ? { task: n, defaultOutputType: n === "classification" ? "class" : "point" } : null;
}
async function k(r) {
  const n = String(r.apiKey || "").trim();
  if (!n) throw new Error("EXAONE API \uD0A4\uB97C \uC785\uB825\uD558\uC138\uC694.");
  const a = String(r.targetColumn || "").trim();
  if (!a) throw new Error("\uD0C0\uAE43 \uCEEC\uB7FC\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694.");
  if (!r.trainFile) throw new Error("\uD559\uC2B5\uC6A9 CSV(train_file)\uB97C \uC120\uD0DD\uD558\uC138\uC694.");
  if (!r.testFile) throw new Error("\uC608\uCE21\uC6A9 CSV(test_file)\uB97C \uC120\uD0DD\uD558\uC138\uC694.");
  const i = `${w}/tabular/${r.task}`, e = new FormData();
  e.append("train_file", r.trainFile, A("train.csv", r.trainFileName)), e.append("test_file", r.testFile, A("test.csv", r.testFileName)), e.append("mode", "default"), e.append("output_type", r.outputType), e.append("target_columns", a);
  let t;
  try {
    t = await fetch(i, { method: "POST", headers: { Authorization: `Bearer ${n}` }, body: e, ...r.signal ? { signal: r.signal } : {} });
  } catch (l) {
    throw new Error(N(l));
  }
  if (!t.ok) {
    const l = await _(t);
    throw t.status === 401 || t.status === 403 ? new Error(`EXAONE API \uD0A4 \uAD8C\uD55C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.

${l}`) : new Error(`EXAONE Tabular \uC624\uB958 (${t.status}): ${l}`);
  }
  let o;
  try {
    o = await t.json();
  } catch {
    throw new Error("EXAONE Tabular \uC751\uB2F5\uC744 JSON\uC73C\uB85C \uD30C\uC2F1\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  }
  const s = b(o) ?? {}, c = typeof s.result_code == "number" ? s.result_code : t.status;
  if (c !== 200) {
    const l = typeof s.description == "string" && s.description.trim() || `result_code=${c}`;
    throw new Error(`EXAONE Tabular \uC624\uB958 (${c}): ${l}`);
  }
  const f = O(r.task, r.outputType, s);
  if (!f.trim()) throw new Error("EXAONE Tabular\uAC00 \uBE48 \uC608\uCE21 \uACB0\uACFC\uB97C \uBC18\uD658\uD588\uC2B5\uB2C8\uB2E4.");
  return { response: s, markdown: f };
}
function D(r) {
  return String(r || "").trim() === h;
}
function L(r) {
  return String(r || "").trim() === y;
}
export {
  O as formatExaoneTabularMarkdown,
  D as isExaoneTabularClassificationModel,
  L as isExaoneTabularRegressionModel,
  P as resolveExaoneTabularRequestFromModel,
  k as runExaoneTabularPredict
};
