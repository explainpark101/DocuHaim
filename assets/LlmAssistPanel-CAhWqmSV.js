import { fs as ae, fU as j, e_ as oe, fV as T, fW as $, fX as se, e1 as de, Q as ne } from "./index-BegHbZbw.js";
import { r as o, j as e } from "./vendor-react-SY5QCjFA.js";
import { o as le } from "./vendor-md-editor-CyUZNHY0.js";
import { u as ie, M as pe } from "./useLazyMermaidRender-BErEWCVR.js";
import { O as ce, G as xe } from "./OpenAiCompatibleModelSelect-DcASc1vD.js";
import { r as D, L, e as be } from "./llmAssistImages-Ca7ILDRO.js";
import { ap as ge, v as M, _ as ue, X as me, a7 as fe, f as he, E as ye, bt as ve } from "./vendor-lucide-DpPvFd8E.js";
function Ae(a) {
  const [s, d] = o.useState(() => j()), n = o.useMemo(() => {
    var _a;
    return ((_a = oe(a, s)) == null ? void 0 : _a.id) ?? "";
  }, [a, s]), t = o.useCallback((l) => {
    T(l), d(j());
  }, []), x = o.useCallback(() => {
    d(j());
  }, []);
  return o.useEffect(() => {
    const l = () => d(j());
    return window.addEventListener($, l), () => window.removeEventListener($, l);
  }, []), o.useEffect(() => {
    n && n !== s && (T(n), d(n));
  }, [s, n]), [n, t, x];
}
function ke({ profiles: a, value: s, onChange: d, className: n = "" }) {
  const t = o.useMemo(() => a.map((i) => ({ value: i.id, label: i.kind === "openai-compatible" ? `${i.name} \xB7 OpenAI \uD638\uD658` : `${i.name} \xB7 Gemini` })), [a]);
  if (!t.length) return e.jsx("p", { className: `text-[11px] text-amber-700 dark:text-amber-300 ${n}`.trim(), children: "\uC800\uC7A5\uB41C \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uCD94\uAC00\uD558\uC138\uC694." });
  const x = t[0], l = t.some((i) => i.value === s) ? s : (x == null ? void 0 : x.value) ?? "";
  return e.jsx(ae, { value: l, onValueChange: d, options: t, placeholder: "\uC81C\uACF5\uC790 \uC120\uD0DD", "aria-label": "AI \uC81C\uACF5\uC790", className: `w-full ${n}`.trim() });
}
const m = "s3haim-llm-assist", Ie = { READY: `${m}:ready`, SYNC: `${m}:sync`, ACTION: `${m}:action`, PARENT_CLOSING: `${m}:parent-closing` };
function Oe(a) {
  return !!(a && typeof a.type == "string" && a.type.startsWith(m));
}
function Te() {
  if (se()) {
    const d = new URL(window.location.href);
    return d.hash = "#/llm-assist-popout", d.toString();
  }
  const s = `${"/DocuHaim/".replace(/\/$/, "") || "/"}/llm-assist-popout`.replace(/\/+/g, "/");
  return new URL(s, window.location.origin).toString();
}
const $e = "s3haim-llm-assist", De = "popup=yes,width=480,height=820,menubar=no,toolbar=no,location=no,status=no,resizable=yes";
function Me(a, s, d = {}) {
  !a || a.closed || a.postMessage({ type: s, ...d }, window.location.origin);
}
const je = "llm-assist-result-preview";
function Pe({ theme: a = "light", profiles: s = [], selectedProfileId: d = "", onSelectedProfileIdChange: n = () => {
}, selectedProfile: t = null, model: x = "", onModelChange: l, selectedText: i, onRefreshSelection: P, attachedImages: p = [], onAddImages: b, onRemoveImage: z, instruction: U, onInstructionChange: F, result: g, onResultChange: G, resultViewMode: u = "text", onResultViewModeChange: C, loading: S = false, error: E = "", templates: K = [], selectedTemplateId: H = "", onLoadTemplate: B, templateName: W = "", onTemplateNameChange: X, editingTemplateId: Y = null, onSaveTemplate: Q, onNewTemplate: V, onDeleteTemplate: q, onRun: J, onApplyResult: Z, remoteMode: ee = false, modelSelectAutoLoad: _ = true }) {
  const re = ee ? false : !g, N = o.useRef(null), R = o.useRef(null), f = o.useRef(null), h = o.useRef(p.length), [A, y] = o.useState(""), [v, k] = o.useState(false);
  ie(R, { layoutKey: `${a}|${g || ""}|${u}` }), o.useEffect(() => {
    h.current = p.length;
  }, [p.length]);
  const I = o.useCallback(async (r) => {
    if (!(!(r == null ? void 0 : r.length) || !b)) {
      y(""), k(true);
      try {
        const c = await D(r, h.current);
        await b(c);
      } catch (c) {
        y((c == null ? void 0 : c.message) || "\uC774\uBBF8\uC9C0\uB97C \uCD94\uAC00\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      } finally {
        k(false), f.current && (f.current.value = "");
      }
    }
  }, [b]), te = async (r) => {
    var _a;
    r.preventDefault(), r.stopPropagation(), await I((_a = r.dataTransfer) == null ? void 0 : _a.files);
  };
  return o.useEffect(() => {
    const r = async (c) => {
      if (!b || !N.current || !N.current.contains(c.target) || v || h.current >= L) return;
      const O = be(c.clipboardData);
      if (O.length) {
        c.preventDefault(), y(""), k(true);
        try {
          const w = await D(O, h.current);
          await b(w);
        } catch (w) {
          y((w == null ? void 0 : w.message) || "\uD074\uB9BD\uBCF4\uB4DC \uC774\uBBF8\uC9C0\uB97C \uBD99\uC5EC\uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        } finally {
          k(false);
        }
      }
    };
    return document.addEventListener("paste", r), () => document.removeEventListener("paste", r);
  }, [b, v]), e.jsxs("div", { ref: N, className: "space-y-3 text-xs", children: [e.jsxs("div", { children: [e.jsx("label", { className: "mb-1 block font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uC81C\uACF5\uC790" }), e.jsx(ke, { profiles: s, value: d, onChange: n })] }), t ? e.jsxs("div", { children: [e.jsx("label", { className: "mb-1 block font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uBAA8\uB378" }), t.kind === de ? e.jsx(ce, { reloadKey: `${t.id}:${t.baseUrl || ""}`, getBaseUrl: () => t.baseUrl || "", getApiKey: () => t.apiKey || "", value: x, onChange: l, autoLoad: _ }, `${t.id}-openai`) : e.jsx(xe, { getGeminiApiKey: () => t.apiKey || "", profileId: t.id, value: x, onChange: l, autoLoad: _ }, `${t.id}-gemini`)] }) : null, e.jsxs("div", { children: [e.jsxs("div", { className: "mb-1 flex items-center justify-between gap-2", children: [e.jsx("label", { className: "font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8" }), e.jsxs("button", { type: "button", onClick: P, className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft", children: [e.jsx(ge, { size: 12, "aria-hidden": true }), "\uC0C8\uB85C\uACE0\uCE68"] })] }), e.jsx("textarea", { readOnly: true, value: i, rows: 4, className: "w-full resize-y rounded border border-gray-200 bg-gray-50 px-2 py-1.5 text-[11px] leading-relaxed text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg", placeholder: "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC5B4\uB3C4, \uC785\uB825\uD55C \uC9C0\uC2DC\uC0AC\uD56D\uC73C\uB85C \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." })] }), e.jsxs("div", { children: [e.jsxs("div", { className: "mb-1 flex items-center justify-between gap-2", children: [e.jsxs("label", { className: "font-semibold text-gray-700 dark:text-odp-fgStrong", children: ["\uC785\uB825 \uC774\uBBF8\uC9C0", e.jsxs("span", { className: "ml-1 font-normal text-gray-500 dark:text-odp-muted", children: ["(", p.length, "/", L, ")"] })] }), e.jsxs("button", { type: "button", onClick: () => {
    var _a;
    return (_a = f.current) == null ? void 0 : _a.click();
  }, disabled: v || p.length >= L, className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft", children: [v ? e.jsx(M, { size: 12, className: "animate-spin" }) : e.jsx(ue, { size: 12 }), "\uCD94\uAC00"] })] }), e.jsx("input", { ref: f, type: "file", accept: "image/jpeg,image/png,image/webp,image/gif", multiple: true, className: "hidden", onChange: (r) => I(r.target.files) }), e.jsx("div", { onDragOver: (r) => {
    r.preventDefault(), r.stopPropagation();
  }, onDrop: te, className: `rounded border border-dashed p-2 dark:border-odp-borderSoft ${p.length ? "border-gray-200 bg-gray-50/50 dark:bg-odp-bgSoft/40" : "border-gray-300 bg-gray-50 dark:bg-odp-bgSoft"}`, children: p.length ? e.jsx("div", { className: "grid grid-cols-2 gap-2", children: p.map((r) => e.jsxs("div", { className: "relative overflow-hidden rounded border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: [e.jsx("img", { src: r.previewDataUrl, alt: r.name, className: "h-24 w-full object-cover" }), e.jsx("div", { className: "truncate px-1.5 py-0.5 text-[10px] text-gray-600 dark:text-odp-muted", title: r.name, children: r.name }), e.jsx("button", { type: "button", onClick: () => z == null ? void 0 : z(r.id), className: "absolute right-1 top-1 rounded bg-black/55 p-0.5 text-white hover:bg-black/75", title: "\uC774\uBBF8\uC9C0 \uC81C\uAC70", "aria-label": "\uC774\uBBF8\uC9C0 \uC81C\uAC70", children: e.jsx(me, { size: 12 }) })] }, r.id)) }) : e.jsxs("p", { className: "py-3 text-center text-[11px] text-gray-500 dark:text-odp-muted", children: ["\uC774\uBBF8\uC9C0\uB97C \uB4DC\uB798\uADF8\uD558\uAC70\uB098 \u300C\uCD94\uAC00\u300D\uB85C \uC120\uD0DD\uD558\uC138\uC694.", e.jsx("br", {}), "Ctrl+V\uB85C \uD074\uB9BD\uBCF4\uB4DC \uC774\uBBF8\uC9C0\uB97C \uBD99\uC5EC\uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }) }), A && e.jsx("p", { className: "mt-1 text-[10px] text-red-600 dark:text-red-400", children: A })] }), e.jsxs("div", { className: "space-y-2 rounded border border-gray-200 p-2 dark:border-odp-borderSoft", children: [e.jsxs("div", { className: "flex items-center gap-2", children: [e.jsx("label", { className: "shrink-0 font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uD15C\uD50C\uB9BF" }), e.jsxs("select", { value: H, onChange: (r) => B == null ? void 0 : B(r.target.value), className: "min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: [e.jsx("option", { value: "", children: "\u2014 \uBD88\uB7EC\uC624\uAE30 \u2014" }), K.map((r) => e.jsx("option", { value: r.id, children: r.name }, r.id))] })] }), e.jsxs("p", { className: "text-[10px] leading-snug text-gray-500 dark:text-odp-muted", children: ["\uC6D0\uACA9 \uC800\uC7A5\uC18C", " ", e.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: ".settings/llm-prompt-templates.json" }), "\uC5D0 \uB3D9\uAE30\uD654\uB429\uB2C8\uB2E4."] }), e.jsx("input", { type: "text", value: W, onChange: (r) => X == null ? void 0 : X(r.target.value), placeholder: "\uD15C\uD50C\uB9BF \uC774\uB984", className: "w-full rounded border border-gray-300 bg-white px-2 py-1 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft" }), e.jsx("textarea", { value: U, onChange: (r) => F == null ? void 0 : F(r.target.value), rows: 4, placeholder: "\uC9C0\uC2DC\uC0AC\uD56D (\uC608: \uC774\uBBF8\uC9C0\uB97C \uC124\uBA85\uD558\uAC70\uB098, \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uB97C \uB2E4\uC2DC \uC368 \uC8FC\uC138\uC694)", className: "w-full resize-y rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] leading-relaxed dark:border-odp-borderStrong dark:bg-odp-bgSoft" }), e.jsxs("div", { className: "flex flex-wrap gap-1.5 justify-end", children: [e.jsx("button", { type: "button", onClick: Q, className: "rounded bg-violet-600 px-2 py-1 text-[11px] text-white hover:bg-violet-700", children: "\uD15C\uD50C\uB9BF \uC800\uC7A5" }), e.jsx("button", { type: "button", onClick: V, className: "rounded border border-gray-300 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft", children: "\uC0C8 \uD15C\uD50C\uB9BF" }), Y && e.jsx("button", { type: "button", onClick: q, className: "rounded border border-red-300 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-500/40 dark:text-red-400", children: "\uC0AD\uC81C" })] })] }), e.jsxs("button", { type: "button", onClick: J, disabled: S || !t, className: "flex w-full items-center justify-center gap-2 rounded bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60", children: [S ? e.jsx(M, { size: 16, className: "animate-spin" }) : e.jsx(fe, { size: 16 }), S ? "\uC0DD\uC131 \uC911\u2026" : "Gemini \uC2E4\uD589"] }), E && e.jsx("p", { className: "rounded border border-red-200 bg-red-50 px-2 py-1.5 text-[11px] whitespace-pre-line text-red-700 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-300", children: E }), e.jsxs("div", { children: [e.jsxs("div", { className: "mb-1 flex items-center justify-between gap-2", children: [e.jsx("label", { className: "font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uACB0\uACFC" }), e.jsxs("div", { className: "inline-flex rounded border border-gray-300 dark:border-odp-borderStrong", children: [e.jsxs("button", { type: "button", onClick: () => C == null ? void 0 : C("text"), className: `inline-flex items-center gap-1 px-2 py-0.5 text-[10px] ${u === "text" ? "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-100" : "text-gray-600 hover:bg-gray-50 dark:text-odp-muted dark:hover:bg-odp-bgSoft"}`, "aria-pressed": u === "text", children: [e.jsx(he, { size: 11, "aria-hidden": true }), "\uD14D\uC2A4\uD2B8"] }), e.jsxs("button", { type: "button", onClick: () => C == null ? void 0 : C("preview"), className: `inline-flex items-center gap-1 border-l border-gray-300 px-2 py-0.5 text-[10px] dark:border-odp-borderStrong ${u === "preview" ? "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-100" : "text-gray-600 hover:bg-gray-50 dark:text-odp-muted dark:hover:bg-odp-bgSoft"}`, "aria-pressed": u === "preview", children: [e.jsx(ye, { size: 11, "aria-hidden": true }), "\uBBF8\uB9AC\uBCF4\uAE30"] })] })] }), u === "preview" ? e.jsx("div", { ref: R, className: "min-h-32 max-h-64 overflow-auto rounded border border-gray-200 bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: g ? e.jsx(le, { id: je, theme: a, language: "ko-KR", codeTheme: ne, customIcon: pe, value: g, noMermaid: true, codeFoldable: false, showCodeRowNumber: false }) : e.jsx("p", { className: "px-2 py-3 text-[11px] text-gray-500 dark:text-odp-muted", children: "\uC2E4\uD589 \uD6C4 \uACB0\uACFC\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4." }) }) : e.jsx("textarea", { readOnly: re, value: g, onChange: (r) => G == null ? void 0 : G(r.target.value), rows: 6, className: "w-full resize-y rounded border border-gray-200 bg-gray-50 px-2 py-1.5 text-[11px] leading-relaxed text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg", placeholder: "\uC2E4\uD589 \uD6C4 \uACB0\uACFC\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4." }), e.jsxs("button", { type: "button", onClick: Z, disabled: !g, className: "mt-2 inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60", children: [e.jsx(ve, { size: 14, "aria-hidden": true }), "\uC120\uD0DD \uC601\uC5ED \uBC14\uAFD4\uCE58\uAE30"] })] })] });
}
export {
  Ie as L,
  Pe as a,
  $e as b,
  De as c,
  Te as g,
  Oe as i,
  Me as p,
  Ae as u
};
