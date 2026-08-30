import { r as s, j as a } from "./vendor-react-BFxggocB.js";
import { L as P, g as m, i as Y, a as b, p as Z, n as I, s as B, b as C, c as Q, d, e as X, f as H, r as J, l as R, h as v } from "./index-C9Mh46Eg.js";
import { S as K, X as $ } from "./vendor-lucide-C2HsvpdI.js";
import "./vendor-md-editor-DBlhBmzQ.js";
import "./vendor-aws-DgBsOJ1a.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-DqPs8f15.js";
import "./vendor-google-genai-DGp6lEvQ.js";
typeof document < "u" && b(R());
const y = { selectedText: "", selectionRange: { from: 0, to: 0 }, attachedImages: [], instruction: "", systemPrompt: m(), requestOptions: { ...P }, result: "", resultViewMode: "text", loading: false, error: "", templates: [], selectedTemplateId: "", templateName: "", editingTemplateId: null, profiles: [], selectedProfileId: "", model: "", theme: R() };
function de() {
  const [n, A] = s.useState(y), [L, c] = s.useState(""), [N, p] = s.useState(() => m()), [k, u] = s.useState(() => ({ ...P })), [E, f] = s.useState(""), [j, h] = s.useState(""), [M, g] = s.useState("text"), [O, S] = s.useState(""), [x, w] = s.useState(""), [q, _] = s.useState(false), [r, D] = s.useState(false), i = s.useRef(false);
  s.useEffect(() => (document.documentElement.classList.add("llm-assist-popout-window"), () => {
    document.documentElement.classList.remove("llm-assist-popout-window");
  }), []), s.useEffect(() => {
    Y().then(D);
  }, []), s.useEffect(() => {
    b(n.theme);
  }, [n.theme]);
  const t = s.useCallback((e, o = {}) => {
    Z(e, o);
  }, []), T = s.useCallback((e) => {
    const o = { ...y, ...e };
    A(o), c(o.instruction), p(typeof o.systemPrompt == "string" ? o.systemPrompt : m()), u(I(o.requestOptions)), f(o.templateName), h(o.result), g(o.resultViewMode), S(o.model || ""), w(o.selectedProfileId || ""), _(true);
  }, []);
  s.useEffect(() => {
    let e = () => {
    }, o = false;
    return B((l) => {
      if (l.type === v.SYNC && l.state) {
        T(l.state);
        return;
      }
      l.type === v.PARENT_CLOSING && (r ? d() : window.close());
    }).then((l) => {
      if (o) {
        l();
        return;
      }
      e = l;
    }), () => {
      o = true, e();
    };
  }, [T, r]), s.useEffect(() => {
    if (!i.current) {
      if (r) {
        i.current = true, C();
        return;
      }
      !window.opener || window.opener.closed || (i.current = true, C());
    }
  }, [r]), s.useEffect(() => {
    if (r) {
      const o = setInterval(() => {
        Q().then((l) => {
          l || d();
        });
      }, 500);
      return () => clearInterval(o);
    }
    const e = setInterval(() => {
      (!window.opener || window.opener.closed) && window.close();
    }, 500);
    return () => clearInterval(e);
  }, [r]);
  const F = s.useCallback((e) => {
    c(e), t("set-instruction", { value: e });
  }, [t]), V = s.useCallback((e) => {
    p(e), t("set-system-prompt", { value: e });
  }, [t]), z = s.useCallback((e) => {
    const o = I(e);
    u(o), t("set-request-options", { value: o });
  }, [t]), G = s.useCallback((e) => {
    f(e), t("set-template-name", { value: e });
  }, [t]), U = s.useCallback((e) => {
    h(e), t("set-result", { value: e });
  }, [t]), W = () => {
    t("close"), r ? d() : window.close();
  };
  return a.jsxs(X, { className: "llm-assist-popout-page flex min-h-0 flex-1 flex-col overflow-hidden bg-white dark:bg-odp-bgSofter", onFilesDrop: async (e) => {
    try {
      const o = await J(e);
      o.length && t("add-images", { images: o });
    } catch {
    }
  }, children: [a.jsxs("header", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-violet-200/60 bg-violet-50/90 px-4 py-2.5 dark:border-violet-800/50 dark:bg-violet-950/40", children: [a.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [a.jsx(K, { size: 16, className: "shrink-0", "aria-hidden": true }), a.jsx("span", { className: "truncate", children: "AI \uB3C4\uC6B0\uBBF8" }), !q && a.jsx("span", { className: "text-[10px] font-normal text-violet-600 dark:text-violet-300", children: "\uC5F0\uACB0 \uC911\u2026" })] }), a.jsx("button", { type: "button", onClick: W, className: "rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", title: "\uB2EB\uAE30", "aria-label": "\uB2EB\uAE30", children: a.jsx($, { size: 16 }) })] }), a.jsx("main", { className: "min-h-0 flex-1 overflow-y-auto p-4", children: a.jsx(H, { theme: n.theme, profiles: n.profiles || [], selectedProfileId: x, onSelectedProfileIdChange: (e) => {
    w(e), t("set-llm-profile-id", { value: e });
  }, selectedProfile: (n.profiles || []).find((e) => e.id === x) || null, model: O, onModelChange: (e) => {
    S(e), t("set-model", { value: e });
  }, selectedText: n.selectedText, onSelectedTextChange: (e) => t("set-selected-text", { value: e }), onRefreshSelection: () => t("refresh-selection"), attachedImages: n.attachedImages || [], onAddImages: async (e) => t("add-images", { images: e }), onRemoveImage: (e) => t("remove-image", { id: e }), instruction: L, onInstructionChange: F, systemPrompt: N, onSystemPromptChange: V, requestOptions: k, onRequestOptionsChange: z, result: j, onResultChange: U, resultViewMode: M, onResultViewModeChange: (e) => {
    g(e), t("set-result-view-mode", { value: e });
  }, loading: n.loading, error: n.error, templates: n.templates, selectedTemplateId: n.selectedTemplateId, onLoadTemplate: (e) => t("load-template", { id: e }), templateName: E, onTemplateNameChange: G, editingTemplateId: n.editingTemplateId, onSaveTemplate: () => t("save-template"), onNewTemplate: () => t("new-template"), onDeleteTemplate: () => t("delete-template"), onRun: () => t("run"), onCancelGeneration: () => t("cancel-run"), onApplyResult: () => t("apply-result"), onAppendResult: () => t("append-result"), onCopyResult: () => t("copy-result"), onCreateNoteFromResult: () => t("create-note-from-result"), remoteMode: true, modelSelectAutoLoad: false, enableImageDropZone: false }) })] });
}
export {
  de as default
};
