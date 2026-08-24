import { r as s, j as a } from "./vendor-react-SY5QCjFA.js";
import { p as x, L as r, a as E, i as L } from "./LlmAssistPanel-CfO4JZCO.js";
import { dr as S, ds as I } from "./index-BDGl3GOe.js";
import { a7 as P, X as V } from "./vendor-lucide-DyPOSMSJ.js";
import "./vendor-md-editor-D4hOzNKK.js";
import "./useLazyMermaidRender-D8-Hda1W.js";
import "./OpenAiCompatibleModelSelect-CWys2Jou.js";
import "./vendor-radix-BgY9OwZN.js";
import "./vendor-aws-bxAUTq4h.js";
import "./llmAssistImages-Ca7ILDRO.js";
import "./vendor-motion-YU7ZxHqi.js";
import "./vendor-zip-Bez6qchM.js";
typeof document < "u" && S(I());
const w = { selectedText: "", selectionRange: { from: 0, to: 0 }, attachedImages: [], instruction: "", result: "", resultViewMode: "text", loading: false, error: "", templates: [], selectedTemplateId: "", templateName: "", editingTemplateId: null, profiles: [], selectedProfileId: "", model: "", theme: I() };
function _(o, i = {}) {
  !window.opener || window.opener.closed || x(window.opener, r.ACTION, { action: o, payload: i });
}
function U() {
  const [o, i] = s.useState(w), [T, d] = s.useState(""), [b, m] = s.useState(""), [C, c] = s.useState(""), [N, p] = s.useState("text"), [v, u] = s.useState(""), [f, g] = s.useState(""), [R, k] = s.useState(false), h = s.useRef(false);
  s.useEffect(() => {
    S(o.theme);
  }, [o.theme]);
  const t = s.useCallback((e, n = {}) => {
    _(e, n);
  }, []);
  s.useEffect(() => {
    const e = (n) => {
      if (n.origin === window.location.origin && L(n.data)) {
        if (n.data.type === r.SYNC && n.data.state) {
          const l = { ...w, ...n.data.state };
          i(l), d(l.instruction), m(l.templateName), c(l.result), p(l.resultViewMode), u(l.model || ""), g(l.selectedProfileId || ""), k(true);
          return;
        }
        n.data.type === r.PARENT_CLOSING && window.close();
      }
    };
    return window.addEventListener("message", e), () => window.removeEventListener("message", e);
  }, []), s.useEffect(() => {
    h.current || !window.opener || window.opener.closed || (h.current = true, x(window.opener, r.READY));
  }, []), s.useEffect(() => {
    const e = setInterval(() => {
      (!window.opener || window.opener.closed) && window.close();
    }, 500);
    return () => clearInterval(e);
  }, []);
  const A = s.useCallback((e) => {
    d(e), t("set-instruction", { value: e });
  }, [t]), M = s.useCallback((e) => {
    m(e), t("set-template-name", { value: e });
  }, [t]), j = s.useCallback((e) => {
    c(e), t("set-result", { value: e });
  }, [t]), y = () => {
    t("close"), window.close();
  };
  return a.jsxs("div", { className: "llm-assist-popout-page flex min-h-screen flex-col bg-white dark:bg-odp-bgSofter", children: [a.jsxs("header", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-violet-200/60 bg-violet-50/90 px-4 py-2.5 dark:border-violet-800/50 dark:bg-violet-950/40", children: [a.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [a.jsx(P, { size: 16, className: "shrink-0", "aria-hidden": true }), a.jsx("span", { className: "truncate", children: "AI \uB3C4\uC6B0\uBBF8" }), !R && a.jsx("span", { className: "text-[10px] font-normal text-violet-600 dark:text-violet-300", children: "\uC5F0\uACB0 \uC911\u2026" })] }), a.jsx("button", { type: "button", onClick: y, className: "rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", title: "\uB2EB\uAE30", "aria-label": "\uB2EB\uAE30", children: a.jsx(V, { size: 16 }) })] }), a.jsx("main", { className: "min-h-0 flex-1 overflow-y-auto p-4", children: a.jsx(E, { theme: o.theme, profiles: o.profiles || [], selectedProfileId: f, onSelectedProfileIdChange: (e) => {
    g(e), t("set-llm-profile-id", { value: e });
  }, selectedProfile: (o.profiles || []).find((e) => e.id === f) || null, model: v, onModelChange: (e) => {
    u(e), t("set-model", { value: e });
  }, selectedText: o.selectedText, onRefreshSelection: () => t("refresh-selection"), attachedImages: o.attachedImages || [], onAddImages: async (e) => t("add-images", { images: e }), onRemoveImage: (e) => t("remove-image", { id: e }), instruction: T, onInstructionChange: A, result: C, onResultChange: j, resultViewMode: N, onResultViewModeChange: (e) => {
    p(e), t("set-result-view-mode", { value: e });
  }, loading: o.loading, error: o.error, templates: o.templates, selectedTemplateId: o.selectedTemplateId, onLoadTemplate: (e) => t("load-template", { id: e }), templateName: b, onTemplateNameChange: M, editingTemplateId: o.editingTemplateId, onSaveTemplate: () => t("save-template"), onNewTemplate: () => t("new-template"), onDeleteTemplate: () => t("delete-template"), onRun: () => t("run"), onApplyResult: () => t("apply-result"), remoteMode: true, modelSelectAutoLoad: false }) })] });
}
export {
  U as default
};
