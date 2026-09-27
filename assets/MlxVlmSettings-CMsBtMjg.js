import { j as e, r as t, e as st } from "./vendor-react-BDjpSibw.js";
import { S as Ve, a as Ee, b as Oe } from "./SettingsCollapsibleHeading-Bf-Q8gfJ.js";
import { bT as lt, bU as ye, bV as nt, I as R, bs as rt, bW as ot, bX as dt, bY as it, bZ as ct, b_ as je, b$ as ut, c0 as mt, c1 as K, c2 as xt, bn as te, c3 as pt, c4 as gt, c5 as ke, c6 as ft, c7 as bt, c8 as ht, c9 as vt, ca as wt, cb as Re, j as W, cc as yt, b4 as ne, cd as jt, ce as kt, cf as St, cg as Mt, ch as Nt, ci as Ct, cj as Lt, ck as It, cl as ae, cm as Ae, cn as Vt, co as Se, cp as Et, cq as Ot, cr as Rt, cs as At, b5 as Me, ct as Dt, cu as Pt, cv as Tt, cw as Ht, cx as Ft, cy as Bt, i as Ne, bN as Ce, cz as _t } from "./index-ahe6T7wM.js";
import { a as De, L as zt, M as Pe } from "./MlxVlmDownloadButtonContent-BzgiCxqo.js";
import { L as Le, g as Ut } from "./localLlmModelAliases-EglLH-3U.js";
import { J as $t, T as Gt, n as Ie, H as Xt, z as qt, a3 as Wt, L as se, am as Kt } from "./vendor-lucide-DgWK5x8G.js";
import { b as Qt, d as Yt, e as Jt, R as Zt, Y as ea, P as ta, C as aa, x as sa } from "./vendor-radix-qpbG9kXl.js";
import "./vendor-motion-Djo_xQxQ.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
function T({ title: a, subtitle: l, open: r, onOpenChange: n, children: d, className: c = "", contentClassName: u = "space-y-3 p-3 pt-0" }) {
  return e.jsxs(Ve, { contentKey: a, open: r, onOpenChange: n, className: ["rounded-md border border-emerald-200/80 bg-white/60 dark:border-emerald-900/40 dark:bg-odp-bgSoft/40", c].filter(Boolean).join(" "), children: [e.jsx(Ee, { subtitle: l, align: "start", chevronSize: 14, titleAs: "span", className: "flex w-full items-start gap-2 px-3 py-2.5 text-left transition hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20", titleClassName: "text-xs font-semibold text-gray-800 dark:text-odp-fgStrong", children: a }), e.jsx(Oe, { children: e.jsx("div", { className: u, children: d }) })] });
}
function la({ settings: a, disabled: l = false, onChange: r }) {
  return e.jsxs("div", { className: "space-y-4", children: [e.jsxs("div", { children: [e.jsx("label", { className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted", children: "HF download workers (parallel threads)" }), e.jsx("input", { type: "number", min: 1, max: 32, value: a.hfDownloadMaxWorkers, disabled: l, onChange: (n) => r({ ...a, hfDownloadMaxWorkers: Number.parseInt(n.target.value, 10) || 16 }), className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft" }), e.jsxs("p", { className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted", children: ["Passed to ", e.jsx("code", { className: "text-[10px]", children: "hf download --max-workers" }), ". Default 16 (HF CLI default is 8). Range 1\u201332."] })] }), e.jsxs("div", { children: [e.jsx("label", { className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted", children: "Hugging Face token (optional)" }), e.jsx("input", { type: "password", value: a.hfToken, disabled: l, onChange: (n) => r({ ...a, hfToken: n.target.value }), placeholder: "hf_\u2026", autoComplete: "off", spellCheck: false, className: "w-full rounded border px-3 py-2 font-mono text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft" }), e.jsxs("p", { className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted", children: ["Passed as ", e.jsx("code", { className: "text-[10px]", children: "HF_TOKEN" }), " to", " ", e.jsx("code", { className: "text-[10px]", children: "hf download" }), ". Improves rate limits; leave empty for anonymous downloads."] })] }), e.jsxs("div", { children: [e.jsx("label", { className: "mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted", children: "Adapter path (optional)" }), e.jsx("input", { type: "text", value: a.adapterPath, disabled: l, onChange: (n) => r({ ...a, adapterPath: n.target.value }), placeholder: "/path/to/lora-adapter", className: "w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft" }), e.jsx("p", { className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted", children: "Low-rank adapter weights passed to mlx_vlm.generate when loading the model." })] })] });
}
function na() {
  const [a, l] = t.useState(() => ye());
  return t.useEffect(() => nt(() => l(ye())), []), a;
}
function ra({ repoId: a, progress: l, aborting: r = false, open: n, onOpenChange: d }) {
  const c = na(), u = r ? "Aborting\u2026" : (l == null ? void 0 : l.label) || "Preparing\u2026", o = l && l.totalBytes > 0 ? Math.min(100, Math.max(0, Math.round(l.percent))) : null, w = r ? "\uB2E4\uC6B4\uB85C\uB4DC\uB97C \uC911\uB2E8\uD558\uB294 \uC911\u2026" : "hf download / mlx_vlm.convert raw \uCD9C\uB825\uC774 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4.";
  return e.jsx(De, { title: "\uB2E4\uC6B4\uB85C\uB4DC \uB85C\uADF8", subtitle: a, lines: c, emptyHint: w, open: n, onOpenChange: d, onClear: lt, headerExtra: o == null ? e.jsx("span", { className: "font-mono text-[10px] tabular-nums text-gray-600 dark:text-odp-muted", children: u }) : null, beforeLog: o != null ? e.jsxs("div", { className: "space-y-1", children: [e.jsxs("div", { className: "flex items-center justify-between gap-2 text-[10px] tabular-nums text-gray-600 dark:text-odp-muted", children: [e.jsxs("span", { className: "font-semibold text-gray-800 dark:text-odp-fg", children: [o, "%"] }), e.jsx("span", { className: "truncate font-mono", children: u })] }), e.jsx("div", { className: "h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-odp-bgSoft", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": o, "aria-label": "Download progress", children: e.jsx("div", { className: "h-full rounded-full bg-emerald-500 transition-[width] duration-300 ease-out", style: { width: `${o}%` } }) })] }) : null });
}
function oa({ models: a, selectedId: l, cacheBytesByModelId: r = {}, disabled: n = false, deleteBusy: d = false, scanBusy: c, isModelInUse: u, onRefresh: o, onSelect: w, onRequestDelete: h }) {
  const [y, p] = t.useState(0);
  return t.useEffect(() => {
    const m = () => p((x) => x + 1);
    return window.addEventListener(Le, m), () => window.removeEventListener(Le, m);
  }, []), e.jsxs(e.Fragment, { children: [e.jsxs("div", { className: "mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5", children: [e.jsx("p", { className: "text-[11px] text-gray-500 dark:text-odp-muted", children: "\uC11C\uBC84 \uC2DC\uC791 \uC2DC \uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. \uC120\uD0DD \uD574\uC81C\uD558\uBA74 \uBAA8\uB378 \uC5C6\uC774 \uB458 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uBCC4\uCE6D\uC740 \uC774 \uAE30\uAE30 localStorage\uC5D0\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4." }), e.jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [l ? e.jsx(R, { type: "button", variant: "tertiary", size: "sm", disabled: n || d, onClick: () => w(""), children: "\uC120\uD0DD \uD574\uC81C" }) : null, e.jsxs(R, { type: "button", variant: "secondary", size: "sm", disabled: n || c || d, onClick: o, children: [e.jsx($t, { size: 14, className: c ? "animate-spin" : "" }), "Refresh"] })] })] }), a.length === 0 ? e.jsx("p", { className: "text-[11px] text-gray-500 dark:text-odp-muted", children: "\uC124\uCE58\uB41C \uBAA8\uB378\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC544\uB798\uC5D0\uC11C Hugging Face \uAC80\uC0C9 \uB610\uB294 URL \uBD99\uC5EC\uB123\uAE30\uB85C \uCD94\uAC00\uD558\uC138\uC694." }) : e.jsx(Qt, { value: l, onValueChange: w, className: "max-h-64 space-y-1.5 overflow-y-auto", disabled: n || d, children: a.map((m) => {
    const x = u(m.id), k = r[m.id] ?? r[m.repoId || ""] ?? 0, v = k > 0 ? rt(k) : m.source === "local" ? null : "\u2014", C = Ut("mlx-vlm", m.id);
    return e.jsxs("div", { className: "flex items-start gap-2 rounded border border-gray-200 bg-white px-2.5 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: [e.jsxs("label", { className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2", children: [e.jsx(Yt, { value: m.id, className: "mt-0.5 size-3.5 shrink-0 rounded-full border border-gray-400 bg-white data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft", "aria-label": m.id, children: e.jsx(Jt, { className: "relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white" }) }), e.jsxs("span", { className: "min-w-0 flex-1 text-[11px] leading-snug text-gray-700 dark:text-odp-fg", children: [e.jsx("span", { className: "block truncate font-medium", children: C || m.id }), C ? e.jsx("span", { className: "block truncate text-gray-500 dark:text-odp-muted", children: m.id }) : null, e.jsxs("span", { className: "text-gray-500 dark:text-odp-muted", children: [m.source === "local" ? "local path" : "Hugging Face cache", v ? ` \xB7 ${v}` : "", x ? " \xB7 \uC11C\uBC84 \uC0AC\uC6A9 \uC911" : ""] }), e.jsx(zt, { scope: "mlx-vlm", modelId: m.id, disabled: n || d })] })] }), e.jsx(R, { type: "button", variant: "secondary", size: "sm", disabled: n || d || x, onClick: () => h(m), "aria-label": `${m.id} \uC0AD\uC81C`, title: x ? "\uC11C\uBC84\uB97C \uC911\uC9C0\uD55C \uB4A4 \uC0AD\uC81C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." : "\uBAA8\uB378 \uC0AD\uC81C", className: "shrink-0 text-red-700 hover:text-red-800 dark:text-red-300 dark:hover:text-red-200", children: e.jsx(Gt, { size: 14 }) })] }, m.id);
  }) })] });
}
function Te({ hit: a, className: l = "" }) {
  const r = ot(a), n = a.feasibility ?? "unknown", d = a.downloads != null ? `${a.downloads.toLocaleString()} downloads` : null;
  return e.jsxs("div", { className: `space-y-0.5 text-[10px] leading-snug ${l}`.trim(), children: [d ? e.jsx("div", { className: "text-gray-500 dark:text-odp-muted", children: d }) : null, r ? e.jsx("div", { className: dt(n), children: r }) : e.jsx("div", { className: "text-gray-500 dark:text-odp-muted", children: "\uC6A9\uB7C9 \uC815\uBCF4 \uBD88\uB7EC\uC624\uB294 \uC911\u2026" })] });
}
function da({ value: a, onChange: l, error: r, preview: n, previewBusy: d, disabled: c = false, cliAvailable: u, downloadBusy: o, isActiveDownload: w = false, isAborting: h = false, downloadProgressLabel: y = "", isDownloaded: p = false, onDownload: m }) {
  const x = w && !h, k = h ? "aborting" : x ? "downloading" : p ? "downloaded" : "download";
  return e.jsxs(e.Fragment, { children: [e.jsxs("div", { className: "flex flex-wrap gap-2", children: [e.jsx("input", { type: "text", value: a, onChange: (v) => l(v.target.value), placeholder: "https://huggingface.co/mlx-community/\u2026 or org/model", disabled: c, className: "min-w-0 flex-1 rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft" }), e.jsx(R, { type: "button", variant: p && !o ? "tertiary" : "secondary", size: "sm", className: o ? "min-w-38 font-mono tabular-nums transition-none" : p ? "text-emerald-700 transition-none dark:text-emerald-300" : "transition-none", disabled: c || !u || h || o && !w || !a.trim(), onClick: m, children: e.jsx(Pe, { mode: k, progressLabel: x ? y : "", paste: true }) })] }), r ? e.jsx("p", { className: "mt-1 text-[11px] text-red-600 dark:text-red-400", children: r }) : null, d ? e.jsx("p", { className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted", children: "\uBAA8\uB378 \uC815\uBCF4 \uBD88\uB7EC\uC624\uB294 \uC911\u2026" }) : n ? e.jsx("div", { className: "mt-2 rounded border border-gray-200 bg-white px-2.5 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: e.jsx(Te, { hit: n }) }) : null] });
}
function ia({ query: a, onQueryChange: l, onSearch: r, memoryBudgetLabel: n, results: d, searchBusy: c, searchError: u, disabled: o = false, cliAvailable: w, downloadBusy: h, downloadingRepoId: y = "", abortingRepoId: p = "", downloadProgressLabel: m = "", isModelDownloaded: x, onDownload: k }) {
  return e.jsxs(e.Fragment, { children: [e.jsx("div", { className: "mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5", children: e.jsx("span", { className: "text-[10px] text-gray-500 dark:text-odp-muted", children: n }) }), e.jsxs("div", { className: "flex flex-wrap gap-2", children: [e.jsxs("div", { className: "relative min-w-0 flex-1", children: [e.jsx(Ie, { size: 14, className: "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400", "aria-hidden": true }), e.jsx("input", { type: "search", value: a, onChange: (v) => l(v.target.value), onKeyDown: (v) => {
    v.key === "Enter" && (v.preventDefault(), !o && !c && r());
  }, placeholder: "e.g. Llama 3.2 4bit", disabled: o || c, className: "w-full rounded border py-2 pl-8 pr-3 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), e.jsxs(R, { type: "button", variant: "secondary", size: "sm", disabled: o || c || !a.trim(), onClick: r, children: [e.jsx(Ie, { size: 14 }), "\uAC80\uC0C9"] })] }), c ? e.jsx("p", { className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted", children: "Searching\u2026" }) : null, u ? e.jsx("p", { className: "mt-1 text-[11px] text-red-600 dark:text-red-400", children: u }) : null, d.length > 0 ? e.jsx("ul", { className: "mt-2 max-h-48 space-y-1 overflow-y-auto", children: d.map((v) => {
    const C = p === v.id, b = h && y === v.id, M = !b && !C && x(v.id), V = C ? "aborting" : b ? "downloading" : M ? "downloaded" : "download";
    return e.jsxs("li", { className: "flex items-center justify-between gap-2 rounded border border-gray-200 bg-white px-2.5 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: [e.jsxs("div", { className: "min-w-0 flex-1", children: [e.jsx("div", { className: "truncate text-[11px] font-medium text-gray-800 dark:text-odp-fgStrong", children: v.id }), e.jsx(Te, { hit: v })] }), e.jsx(R, { type: "button", variant: M ? "tertiary" : "secondary", size: "sm", className: b ? "min-w-[9.5rem] font-mono tabular-nums transition-none" : M ? "text-emerald-700 transition-none dark:text-emerald-300" : "transition-none", disabled: o || !w || C || h && !b, onClick: () => k(v), children: e.jsx(Pe, { mode: V, progressLabel: b && !C ? m : "" }) })] }, v.id);
  }) }) : null] });
}
function ca({ settings: a, onSettingsChange: l, cliAvailable: r, serverRunning: n = false, serverLoadedModels: d = [], disabled: c = false }) {
  var _a, _b;
  const [u, o] = t.useState(a.installedModels), [w, h] = t.useState(false), [y, p] = t.useState(""), [m, x] = t.useState([]), [k, v] = t.useState(false), [C, b] = t.useState(""), [M, V] = t.useState(""), [A, N] = t.useState(""), [E, U] = t.useState(false), [H, $] = t.useState(false), [S, D] = t.useState(null), [j, f] = t.useState(null), [L, G] = t.useState(null), [P, Q] = t.useState(""), X = t.useRef(""), [F, Y] = t.useState(null), [He, Fe] = t.useState("RAM \uC815\uBCF4 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"), [re, J] = t.useState(null), [Be, Z] = t.useState(false), [_e, oe] = t.useState(true), [ze, de] = t.useState(false), [Ue, ie] = t.useState(false), [$e, ee] = t.useState(true), [Ge, Xe] = t.useState({}), O = t.useCallback(async () => {
    h(true);
    try {
      const { settings: s, models: i } = await it();
      l(s), o(i);
      const g = await ct(i);
      Xe(g);
    } finally {
      h(false);
    }
  }, [l]);
  t.useEffect(() => {
    const s = (i) => {
      var _a2, _b2;
      const g = (_b2 = (_a2 = i.detail) == null ? void 0 : _a2.modelId) == null ? void 0 : _b2.trim();
      oe(true), de(false), ie(true), ee(true), g && (V(yt(g)), N(""));
    };
    return window.addEventListener(je, s), () => window.removeEventListener(je, s);
  }, []), t.useEffect(() => {
    ut().then((s) => {
      Fe(mt(s));
    });
  }, []), t.useEffect(() => {
    const s = () => {
      const i = ne();
      l(i), O();
    };
    return window.addEventListener(K, s), () => window.removeEventListener(K, s);
  }, [l, O]), t.useEffect(() => {
    O();
  }, [O]);
  const ce = t.useRef(null), ue = t.useRef(null), qe = t.useCallback(() => {
    var _a2;
    const s = y.trim();
    if (!s) {
      x([]), b("");
      return;
    }
    (_a2 = ce.current) == null ? void 0 : _a2.abort();
    const i = new AbortController();
    ce.current = i, v(true), b(""), xt(s, { signal: i.signal }).then((g) => {
      i.signal.aborted || (x(g), g.length || b("\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."));
    }).catch((g) => {
      i.signal.aborted || (b(g instanceof Error ? g.message : "Search failed."), x([]));
    }).finally(() => {
      i.signal.aborted || v(false);
    });
  }, [y]);
  t.useEffect(() => {
    const s = te(M);
    if (!s) {
      J(null), Z(false);
      return;
    }
    const i = window.setTimeout(() => {
      var _a2;
      (_a2 = ue.current) == null ? void 0 : _a2.abort();
      const g = new AbortController();
      ue.current = g, Z(true), pt(s, g.signal).then((I) => {
        g.signal.aborted || J(I);
      }).catch(() => {
        g.signal.aborted || J(null);
      }).finally(() => {
        g.signal.aborted || Z(false);
      });
    }, 400);
    return () => window.clearTimeout(i);
  }, [M]);
  const me = a.selectedModelId, B = t.useMemo(() => {
    const s = /* @__PURE__ */ new Set(), i = [];
    for (const g of u) s.has(g.id) || (s.add(g.id), i.push(g));
    return i;
  }, [u]), xe = (s, i) => {
    Lt(s);
    const g = It(s, i ?? null), I = ke(s, B);
    f({ repoId: s, mode: g, hit: i ?? null, redownload: I });
  }, pe = (s, i) => {
    G({ repoId: s, mode: i });
  }, We = (s) => {
    if (!P) {
      if (E && (S == null ? void 0 : S.repoId) === s.id) {
        pe(s.id, S.mode);
        return;
      }
      xe(s.id, s);
    }
  }, Ke = () => {
    if (P) return;
    N("");
    const s = te(M);
    if (!s) {
      N("Hugging Face model URL or org/model id is invalid.");
      return;
    }
    if (E && (S == null ? void 0 : S.repoId) === s) {
      pe(s, S.mode);
      return;
    }
    xe(s, re);
  }, Qe = async () => {
    if (!j) return;
    const { repoId: s, mode: i, hit: g } = j;
    f(null), U(true), ee(true);
    let I = (g == null ? void 0 : g.diskBytes) ?? 0;
    I <= 0 && (I = await jt(s, { ...g ? { hit: g } : {} }));
    const tt = I > 0 ? kt(0, I) : null;
    D({ repoId: s, mode: i, progress: tt });
    try {
      const z = await St(s, { mode: i, ...g ? { hit: g } : {}, ...I > 0 ? { expectedTotalBytes: I } : {}, onProgress: (at) => {
        X.current !== s && D((q) => !q || q.repoId !== s ? q : { ...q, progress: at });
      } });
      l(z), V(""), await O();
    } catch (z) {
      if (Mt(z)) {
        await O();
        return;
      }
      alert(z instanceof Error ? z.message : "Download failed.");
    } finally {
      X.current = "", Q(""), U(false), D(null);
    }
  }, Ye = async () => {
    if (!L) return;
    const { repoId: s } = L;
    G(null), X.current = s, Q(s);
    try {
      await Nt(s);
    } catch (i) {
      X.current = "", Q(""), alert(i instanceof Error ? i.message : "Failed to abort download.");
    }
  }, Je = async () => {
    if (!F) return;
    const s = F;
    Y(null), $(true);
    try {
      const i = await Ct(s.repoId || s.id, { serverStatus: { running: n, loaded: n, models: d } });
      l(i), await O();
    } catch (i) {
      alert(i instanceof Error ? i.message : "Delete failed.");
    } finally {
      $(false);
    }
  }, ge = t.useMemo(() => ({ running: n, loaded: n, models: d }), [n, d]), Ze = t.useCallback((s) => gt(s, a, ge), [a, ge]), fe = t.useCallback((s) => ke(s, B), [B]), be = j ? j.redownload ? ft(j.repoId, j.mode, j.hit) : bt(j.repoId, j.mode, j.hit) : null, he = F ? ht(F.id) : null, ve = L ? vt(L.repoId, L.mode) : null, _ = te(M) ?? "", we = !!(E && (S == null ? void 0 : S.repoId) && _ && S.repoId === _), et = !!(P && _ && P === _);
  return e.jsxs("div", { className: "space-y-2", children: [e.jsx(T, { title: "\uC124\uCE58\uB41C \uBAA8\uB378", subtitle: `${B.length}\uAC1C \xB7 ${me ? "\uC120\uD0DD\uB428" : "\uBAA8\uB378 \uBBF8\uC120\uD0DD"}`, open: _e, onOpenChange: oe, children: e.jsx(oa, { models: B, selectedId: me, cacheBytesByModelId: Ge, disabled: c, deleteBusy: H, scanBusy: w, isModelInUse: Ze, onRefresh: () => {
    O();
  }, onSelect: (s) => {
    const i = wt(a, s);
    Re(i), l(i);
  }, onRequestDelete: Y }) }), e.jsx(T, { title: "Hugging Face \uAC80\uC0C9 (MLX)", subtitle: "\uBAA8\uB378 \uC6A9\uB7C9 \xB7 \uC608\uC0C1 RAM \xB7 \uC2E4\uD589 \uAC00\uB2A5\uC131", open: ze, onOpenChange: de, children: e.jsx(ia, { query: y, onQueryChange: p, onSearch: qe, memoryBudgetLabel: He, results: m, searchBusy: k, searchError: C, disabled: c, cliAvailable: r, downloadBusy: E, downloadingRepoId: (S == null ? void 0 : S.repoId) ?? "", abortingRepoId: P, downloadProgressLabel: ((_a = S == null ? void 0 : S.progress) == null ? void 0 : _a.label) ?? "", isModelDownloaded: fe, onDownload: We }) }), e.jsx(T, { title: "URL / repo id \uBD99\uC5EC\uB123\uAE30", subtitle: "Hugging Face \uB9C1\uD06C \uB610\uB294 org/model", open: Ue, onOpenChange: ie, children: e.jsx(da, { value: M, onChange: (s) => {
    V(s), N("");
  }, error: A, preview: re, previewBusy: Be, disabled: c, cliAvailable: r, downloadBusy: E, isActiveDownload: we, isAborting: et, downloadProgressLabel: we ? ((_b = S == null ? void 0 : S.progress) == null ? void 0 : _b.label) ?? "" : "", isDownloaded: fe(_), onDownload: Ke }) }), E && S ? e.jsx(ra, { repoId: S.repoId, progress: S.progress, aborting: P === S.repoId, open: $e, onOpenChange: ee }) : null, e.jsx(W, { isOpen: !!j, title: (be == null ? void 0 : be.title) || "Download model", message: (be == null ? void 0 : be.message) || "", confirmLabel: (j == null ? void 0 : j.redownload) ? j.mode === "convert" ? "Re-convert" : "Redownload" : (j == null ? void 0 : j.mode) === "convert" ? "Convert" : "Download", cancelLabel: "Cancel", onConfirm: () => {
    Qe();
  }, onCancel: () => f(null) }), e.jsx(W, { isOpen: !!L, title: (ve == null ? void 0 : ve.title) || "Abort download", message: (ve == null ? void 0 : ve.message) || "", confirmLabel: "Abort", cancelLabel: "Cancel", variant: "danger", onConfirm: () => {
    Ye();
  }, onCancel: () => G(null) }), e.jsx(W, { isOpen: !!F, title: (he == null ? void 0 : he.title) || "Delete model", message: (he == null ? void 0 : he.message) || "", confirmLabel: "Delete", cancelLabel: "Cancel", variant: "danger", onConfirm: () => {
    Je();
  }, onCancel: () => Y(null) })] });
}
function ua({ busy: a, cliAvailable: l, canStart: r, runtimeLoaded: n, workerRunning: d, loadedModels: c, onStart: u, onStop: o }) {
  const [w, h] = t.useState(false);
  return e.jsxs(e.Fragment, { children: [e.jsxs("div", { className: "flex flex-wrap gap-2", children: [e.jsxs(R, { type: "button", variant: "primary", size: "sm", disabled: a || !l || !r || n, onClick: () => {
    u();
  }, children: [e.jsx(Xt, { size: 14 }), "Load model"] }), e.jsxs(R, { type: "button", variant: "secondary", size: "sm", disabled: a || !d, onClick: () => h(true), children: [e.jsx(qt, { size: 14 }), "Unload"] })] }), n && c.length > 0 ? e.jsxs("p", { className: "text-[11px] text-gray-500 dark:text-odp-muted", children: ["Loaded in worker: ", c.join(", ")] }) : d ? e.jsx("p", { className: "text-[11px] text-amber-700 dark:text-amber-300", children: "Worker is running but no model is loaded. Check the server log below or use Unload to stop the worker." }) : e.jsx("p", { className: "text-[11px] text-gray-500 dark:text-odp-muted", children: "Loads the selected model once into a local worker using mlx_vlm.generate. AI Assist calls the worker directly (no HTTP server)." }), e.jsx(W, { isOpen: w, title: "Unload MLX-VLM model", message: "Unload the model from the local MLX-VLM worker?", confirmLabel: "Unload", cancelLabel: "Cancel", variant: "danger", onConfirm: () => {
    h(false), o();
  }, onCancel: () => h(false) })] });
}
function ma() {
  const [a, l] = t.useState(() => Se());
  return t.useEffect(() => Ae(() => l(Se())), []), a;
}
function xa({ serverRunning: a, managedByApp: l, open: r, onOpenChange: n }) {
  const d = ma(), [c, u] = t.useState(() => l || ae());
  t.useEffect(() => {
    u(l || ae());
  }, [l, a]), t.useEffect(() => Ae(() => {
    u(ae());
  }), []);
  const o = a ? c ? "\uC11C\uBC84 \uB85C\uADF8\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\u2026" : "\uC678\uBD80\uC5D0\uC11C \uC2E4\uD589 \uC911\uC778 \uC11C\uBC84\uB294 \uC774 \uC571\uC5D0\uC11C \uB85C\uADF8\uB97C \uAC00\uC838\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." : "Load model\uC744 \uC2E4\uD589\uD558\uBA74 mlx_vlm.generate worker raw \uCD9C\uB825\uC774 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4.";
  return e.jsx(De, { title: "\uC11C\uBC84 \uB85C\uADF8", ...a ? { subtitle: c ? "\uC571 \uAD00\uB9AC worker" : "\uC678\uBD80 \uD504\uB85C\uC138\uC2A4" } : {}, lines: d, emptyHint: o, open: r, onOpenChange: n, onClear: Vt });
}
const pa = 250, ga = "z-100001 max-w-[min(92vw,360px)] rounded-md border border-gray-200 bg-white px-3 py-2.5 text-[11px] leading-relaxed text-gray-700 shadow-md outline-none dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", fa = "inline-flex shrink-0 items-center justify-center rounded-full border border-emerald-300/80 bg-white/80 p-1 text-emerald-800 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:border-emerald-800/60 dark:bg-odp-bgSoft dark:text-emerald-200 dark:hover:bg-emerald-950/40", le = "mt-1.5 inline-flex items-center gap-1.5 rounded border border-emerald-300/80 bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-900 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-100 dark:hover:bg-emerald-950/60";
function ba({ toolkit: a, onRefresh: l }) {
  const [r, n] = t.useState(null), [d, c] = t.useState(""), u = t.useCallback(async (y, p) => {
    n(y), c("");
    try {
      await p({ onOutput: (m) => {
        c((x) => x + m);
      } }), await l();
    } catch (m) {
      const x = m instanceof Error ? m.message : "Install failed.";
      c((k) => `${k}${x}
`);
    } finally {
      n(null);
    }
  }, [l]), o = (a == null ? void 0 : a.uvAvailable) === true, w = (a == null ? void 0 : a.mlxVlmInstalled) === true, h = (a == null ? void 0 : a.hfHubInstalled) === true;
  return e.jsxs(e.Fragment, { children: [e.jsx("p", { className: "mb-2 font-semibold text-gray-800 dark:text-odp-fgStrong", children: "uv + uv tool run" }), e.jsxs("p", { className: "mb-2 text-[10px] text-gray-500 dark:text-odp-muted", children: ["\uC774 \uC571\uC740 GUI PATH \uB300\uC2E0 ", e.jsx("code", { className: "rounded px-0.5", children: "uv tool run --from \u2026" }), "\uB85C mlx-vlm / huggingface-hub CLI\uB97C \uC2E4\uD589\uD569\uB2C8\uB2E4."] }), e.jsxs("ol", { className: "list-decimal space-y-2 pl-4", children: [e.jsxs("li", { children: ["uv \uC124\uCE58 (Mac)", e.jsx("pre", { className: "mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft", children: "curl -LsSf https://astral.sh/uv/install.sh | sh" }), o ? e.jsxs("p", { className: "mt-1 text-[10px] text-emerald-700 dark:text-emerald-300", children: ["uv ready", (a == null ? void 0 : a.uvPath) ? `: ${a.uvPath}` : ""] }) : e.jsxs("button", { type: "button", className: le, disabled: r != null, onClick: () => {
    u("uv", Et);
  }, children: [r === "uv" ? e.jsx(se, { size: 12, className: "animate-spin" }) : null, "uv \uC124\uCE58"] })] }), e.jsxs("li", { children: ["PATH \uB4F1\uB85D (", e.jsx("code", { className: "rounded px-0.5", children: "~/.zshrc" }), " \uB4F1, \uD130\uBBF8\uB110\uC6A9)", e.jsx("pre", { className: "mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft", children: `export PATH="$HOME/.local/bin:$PATH"
# \uB610\uB294
source "$HOME/.local/bin/env"` })] }), e.jsxs("li", { children: ["\uB3C4\uAD6C \uC124\uCE58 (\uB85C\uCEEC\uC5D0 \uC5C6\uC744 \uB54C)", e.jsx("pre", { className: "mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft", children: `uv tool install mlx-vlm --with jinja2
uv tool install huggingface-hub` }), e.jsxs("p", { className: "mt-1 text-[10px] text-gray-500 dark:text-odp-muted", children: ["\uCC44\uD305 \uD15C\uD50C\uB9BF\uC6A9 ", e.jsx("code", { className: "rounded px-0.5", children: "jinja2" }), "\uB3C4 \uD568\uAED8 \uC124\uCE58\uD569\uB2C8\uB2E4."] }), o && !w ? e.jsxs("button", { type: "button", className: le, disabled: r != null, onClick: () => {
    u("mlx-vlm", Ot);
  }, children: [r === "mlx-vlm" ? e.jsx(se, { size: 12, className: "animate-spin" }) : null, "mlx-vlm \uC124\uCE58"] }) : null, o && !h ? e.jsxs("button", { type: "button", className: le, disabled: r != null, onClick: () => {
    u("huggingface-hub", Rt);
  }, children: [r === "huggingface-hub" ? e.jsx(se, { size: 12, className: "animate-spin" }) : null, "huggingface-hub \uC124\uCE58"] }) : null, o && w && h ? e.jsx("p", { className: "mt-1 text-[10px] text-emerald-700 dark:text-emerald-300", children: "mlx-vlm \xB7 huggingface-hub installed" }) : null] }), e.jsxs("li", { children: ["\uC2E4\uD589 \uC608 (\uC571 \uB0B4\uBD80\uC640 \uB3D9\uC77C)", e.jsx("pre", { className: "mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft", children: `uv tool run --from mlx-vlm mlx_vlm.generate --help
uv tool run --from huggingface-hub hf download org/model` })] })] }), d ? e.jsx("pre", { className: "mt-2 max-h-28 overflow-auto rounded bg-gray-100 px-2 py-1 font-mono text-[9px] text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted", children: d }) : null] });
}
function ha({ toolkit: a, onRefresh: l }) {
  const [r, n] = t.useState(false), [d, c] = t.useState(false), u = t.useRef(null), o = t.useCallback(() => {
    u.current && (clearTimeout(u.current), u.current = null);
  }, []), w = t.useCallback(() => {
    o(), u.current = setTimeout(() => n(true), pa);
  }, [o]), h = t.useCallback(() => {
    o(), d || n(false);
  }, [o, d]), y = t.useCallback((x) => {
    n(x), x || c(false);
  }, []), p = t.useCallback(() => {
    o(), c((x) => {
      const k = !x;
      return n(k), k;
    });
  }, [o]), m = t.useCallback(() => {
    o(), n(true);
  }, [o]);
  return e.jsxs(Zt, { open: r, onOpenChange: y, modal: false, children: [e.jsx(ea, { asChild: true, children: e.jsx("button", { type: "button", "aria-label": "MLX-VLM \uC124\uCE58 \uBC29\uBC95", "aria-expanded": r, "aria-haspopup": "dialog", className: fa, onMouseEnter: w, onMouseLeave: h, onFocus: m, onClick: p, children: e.jsx(Wt, { size: 14 }) }) }), e.jsx(ta, { children: e.jsxs(aa, { side: "bottom", align: "end", sideOffset: 6, className: ga, onMouseEnter: () => {
    o(), n(true);
  }, onMouseLeave: h, onOpenAutoFocus: (x) => x.preventDefault(), children: [e.jsx(ba, { toolkit: a, onRefresh: l }), e.jsx(sa, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function va({ toolkit: a, cliAvailable: l, cliDetail: r, runtimeLoaded: n, workerRunning: d = false, loadedModel: c, onRefresh: u }) {
  const o = (a == null ? void 0 : a.hfHubRunnable) === true;
  return e.jsxs(e.Fragment, { children: [e.jsxs("div", { className: "mb-1 flex items-start justify-between gap-3", children: [e.jsxs("p", { className: "text-xs leading-relaxed text-gray-600 dark:text-odp-muted", children: ["Apple Silicon\uC5D0\uC11C", " ", e.jsx("code", { className: "rounded bg-white/80 px-1 dark:bg-odp-bgSoft", children: "uv tool run --from mlx-vlm" }), "\uC73C\uB85C \uB85C\uCEEC MLX \uBAA8\uB378\uC744 \uC2E4\uD589\uD569\uB2C8\uB2E4. \uCD94\uB860\uC740", " ", e.jsx("code", { className: "rounded bg-white/80 px-1 dark:bg-odp-bgSoft", children: "mlx_vlm.generate" }), "\uC6CC\uCEE4\uB97C \uC9C1\uC811 \uD638\uCD9C\uD569\uB2C8\uB2E4. Hugging Face \uBAA8\uB378\uC740", " ", e.jsx("code", { className: "rounded bg-white/80 px-1 dark:bg-odp-bgSoft", children: "uv tool run --from huggingface-hub hf" }), "\uB85C \uB2E4\uC6B4\uB85C\uB4DC\uD569\uB2C8\uB2E4."] }), e.jsx(ha, { toolkit: a, onRefresh: u })] }), e.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-[11px]", children: [e.jsxs("span", { className: ["rounded-full px-2 py-0.5 font-medium", (a == null ? void 0 : a.uvAvailable) ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" : "bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted"].join(" "), children: ["uv: ", (a == null ? void 0 : a.uvAvailable) ? "ready" : "missing"] }), e.jsxs("span", { className: ["rounded-full px-2 py-0.5 font-medium", l ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" : "bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted"].join(" "), children: ["mlx-vlm: ", l ? "ready" : "missing"] }), e.jsxs("span", { className: ["rounded-full px-2 py-0.5 font-medium", o ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" : "bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted"].join(" "), children: ["hf: ", o ? "ready" : "missing"] }), e.jsxs("span", { className: ["rounded-full px-2 py-0.5 font-medium", n ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200" : d ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200" : "bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted"].join(" "), children: ["Runtime:", " ", n ? `loaded \xB7 ${c}` : d ? "worker running" : "not loaded"] })] }), !l && r ? e.jsxs("p", { className: "text-[11px] text-amber-700 dark:text-amber-300", children: [r, " \xB7 \uC6B0\uCE21 ", e.jsx("span", { className: "font-medium", children: "?" }), " \uB3C4\uC6C0\uB9D0\uC5D0\uC11C uv / \uB3C4\uAD6C \uC124\uCE58\uB97C \uC2E4\uD589\uD558\uC138\uC694."] }) : l && r ? e.jsx("p", { className: "text-[10px] text-gray-500 dark:text-odp-muted", children: r }) : null] });
}
function wa() {
  return e.jsxs("span", { className: "flex min-w-0 items-center gap-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong", children: [e.jsx(Kt, { size: 16 }), "MLX-VLM (Tauri macOS)"] });
}
function Aa() {
  const a = st(), [l, r] = t.useState(false), [n, d] = t.useState(true), [c, u] = t.useState(true), [o, w] = t.useState(true), [h, y] = t.useState(true), [p, m] = t.useState(() => ne()), [x, k] = t.useState(null), [v, C] = t.useState(null), [b, M] = t.useState({ loaded: false, workerRunning: false, models: [], running: false }), [V, A] = t.useState(false), N = t.useCallback(async () => {
    const [f, L] = await Promise.all([At(), Me(p)]);
    k(f), C({ available: f.available, ...f.detail ? { detail: f.detail } : {} }), M(L);
  }, [p]), E = t.useCallback(async () => {
    A(true), y(true);
    try {
      await Dt(p), Pt();
    } catch (f) {
      Tt(f).suggestRedownload && (Ht(p.selectedModelId), r(true), u(true)), alert(Ft(f, p.selectedModelId));
    } finally {
      await N(), A(false);
    }
  }, [N, p]), U = t.useCallback(async () => {
    A(true);
    try {
      await Bt(), await N();
    } catch (f) {
      alert(f instanceof Error ? f.message : "Failed to stop MLX-VLM runtime.");
    } finally {
      A(false);
    }
  }, [N]);
  if (t.useEffect(() => {
    if (!Ne()) return;
    N();
    const f = window.setInterval(() => {
      Me(p).then(M);
    }, 5e3);
    return () => window.clearInterval(f);
  }, [N, p]), t.useEffect(() => {
    b.workerRunning && y(true);
  }, [b.workerRunning]), t.useEffect(() => {
    const f = () => m(ne());
    return window.addEventListener(K, f), () => window.removeEventListener(K, f);
  }, []), t.useEffect(() => {
    String(a.hash || "").replace(/^#/, "") === "settings-mlx-vlm" && (r(true), u(true));
  }, [a.hash]), t.useEffect(() => {
    const f = (L) => {
      var _a;
      ((_a = L.detail) == null ? void 0 : _a.sectionId) === "settings-mlx-vlm" && (r(true), u(true));
    };
    return window.addEventListener(Ce, f), () => window.removeEventListener(Ce, f);
  }, []), !Ne()) return null;
  const H = (x == null ? void 0 : x.available) === true, $ = (x == null ? void 0 : x.hfHubRunnable) === true, S = H && $, D = b.models[0] || p.selectedModelId.trim() || "\uBAA8\uB378 \uBBF8\uC120\uD0DD", j = (f) => {
    Re(f), m(f);
  };
  return e.jsxs(Ve, { id: "settings-mlx-vlm", contentKey: "settings-mlx-vlm-panel", open: l, onOpenChange: r, tabIndex: -1, className: "scroll-mt-4 rounded-lg border border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/50 dark:bg-emerald-950/25", children: [e.jsx(Ee, { unstyled: true, className: "flex w-full items-center gap-2 px-4 py-3 text-left transition hover:bg-emerald-100/50 dark:hover:bg-emerald-950/30", children: e.jsx(wa, {}) }), e.jsx(Oe, { children: e.jsxs("div", { className: "space-y-3 border-t border-emerald-200/80 px-4 pb-4 pt-3 dark:border-emerald-900/40", children: [e.jsx(va, { toolkit: x, cliAvailable: H, ...(v == null ? void 0 : v.detail) ? { cliDetail: v.detail } : {}, runtimeLoaded: b.loaded, loadedModel: D, workerRunning: b.workerRunning, onRefresh: N }), e.jsx(T, { title: "\uC5F0\uACB0 \uC124\uC815", subtitle: p.hfToken.trim() ? "HF token set" : p.adapterPath.trim() ? "adapter configured" : "optional token / adapter", open: n, onOpenChange: d, children: e.jsx(la, { settings: p, disabled: V || b.loaded, onChange: j }) }), e.jsx(T, { title: "\uBAA8\uB378", subtitle: "\uC124\uCE58 \xB7 \uAC80\uC0C9 \xB7 \uB2E4\uC6B4\uB85C\uB4DC", open: c, onOpenChange: u, children: e.jsx(ca, { settings: p, onSettingsChange: m, cliAvailable: S, serverRunning: b.loaded, serverLoadedModels: b.models, disabled: V }) }), e.jsxs(T, { title: "\uB7F0\uD0C0\uC784", subtitle: b.loaded ? `loaded \xB7 ${D}` : b.workerRunning ? "worker running \xB7 model not loaded" : "not loaded", open: o, onOpenChange: w, children: [e.jsx(ua, { busy: V, cliAvailable: H, canStart: !!p.selectedModelId.trim(), runtimeLoaded: b.loaded, workerRunning: b.workerRunning, loadedModels: b.models, onStart: E, onStop: U }), e.jsx(xa, { serverRunning: b.workerRunning, managedByApp: _t(), open: h, onOpenChange: y })] })] }) })] });
}
export {
  Aa as default
};
