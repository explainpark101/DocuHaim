import { r as s, j as n } from "./vendor-react-kfkzeLNk.js";
import { L as b, g as d, i as Y, a as v, p as Z, n as w, s as B, b as C, c as Q, d as m, e as X, f as H, r as J, l as R, h as y } from "./index-RydzSnnb.js";
import { S as K, X as $ } from "./vendor-lucide-DsWVGDs1.js";
import "./vendor-md-editor-BebLMpT_.js";
import "./vendor-aws-BPUgBAdC.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-9P87yVtW.js";
import "./vendor-radix-BWhlk-Y9.js";
import "./vendor-google-genai-BXoTgYIl.js";
typeof document < "u" && v(R());
const P = { selectedText: "", selectionRange: { from: 0, to: 0 }, attachedImages: [], instruction: "", systemPrompt: d(), requestOptions: { ...b }, result: "", resultViewMode: "text", loading: false, error: "", templates: [], selectedTemplateId: "", templateName: "", editingTemplateId: null, profiles: [], selectedProfileId: "", model: "", theme: R() };
function me() {
  const [a, A] = s.useState(P), [N, c] = s.useState(""), [L, p] = s.useState(() => d()), [k, u] = s.useState(() => ({ ...b })), [j, f] = s.useState(""), [E, h] = s.useState(""), [M, g] = s.useState("text"), [O, S] = s.useState(""), [x, I] = s.useState(""), [q, _] = s.useState(false), [r, D] = s.useState(false), i = s.useRef(false);
  s.useEffect(() => {
    Y().then(D);
  }, []), s.useEffect(() => {
    v(a.theme);
  }, [a.theme]);
  const t = s.useCallback((e, o = {}) => {
    Z(e, o);
  }, []), T = s.useCallback((e) => {
    const o = { ...P, ...e };
    A(o), c(o.instruction), p(typeof o.systemPrompt == "string" ? o.systemPrompt : d()), u(w(o.requestOptions)), f(o.templateName), h(o.result), g(o.resultViewMode), S(o.model || ""), I(o.selectedProfileId || ""), _(true);
  }, []);
  s.useEffect(() => {
    let e = () => {
    }, o = false;
    return B((l) => {
      if (l.type === y.SYNC && l.state) {
        T(l.state);
        return;
      }
      l.type === y.PARENT_CLOSING && (r ? m() : window.close());
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
          l || m();
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
    const o = w(e);
    u(o), t("set-request-options", { value: o });
  }, [t]), G = s.useCallback((e) => {
    f(e), t("set-template-name", { value: e });
  }, [t]), U = s.useCallback((e) => {
    h(e), t("set-result", { value: e });
  }, [t]), W = () => {
    t("close"), r ? m() : window.close();
  };
  return n.jsxs(X, { className: "llm-assist-popout-page flex min-h-screen flex-col bg-white dark:bg-odp-bgSofter", onFilesDrop: async (e) => {
    try {
      const o = await J(e);
      o.length && t("add-images", { images: o });
    } catch {
    }
  }, children: [n.jsxs("header", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-violet-200/60 bg-violet-50/90 px-4 py-2.5 dark:border-violet-800/50 dark:bg-violet-950/40", children: [n.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [n.jsx(K, { size: 16, className: "shrink-0", "aria-hidden": true }), n.jsx("span", { className: "truncate", children: "AI \uB3C4\uC6B0\uBBF8" }), !q && n.jsx("span", { className: "text-[10px] font-normal text-violet-600 dark:text-violet-300", children: "\uC5F0\uACB0 \uC911\u2026" })] }), n.jsx("button", { type: "button", onClick: W, className: "rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", title: "\uB2EB\uAE30", "aria-label": "\uB2EB\uAE30", children: n.jsx($, { size: 16 }) })] }), n.jsx("main", { className: "min-h-0 flex-1 overflow-y-auto p-4", children: n.jsx(H, { theme: a.theme, profiles: a.profiles || [], selectedProfileId: x, onSelectedProfileIdChange: (e) => {
    I(e), t("set-llm-profile-id", { value: e });
  }, selectedProfile: (a.profiles || []).find((e) => e.id === x) || null, model: O, onModelChange: (e) => {
    S(e), t("set-model", { value: e });
  }, selectedText: a.selectedText, onRefreshSelection: () => t("refresh-selection"), attachedImages: a.attachedImages || [], onAddImages: async (e) => t("add-images", { images: e }), onRemoveImage: (e) => t("remove-image", { id: e }), instruction: N, onInstructionChange: F, systemPrompt: L, onSystemPromptChange: V, requestOptions: k, onRequestOptionsChange: z, result: E, onResultChange: U, resultViewMode: M, onResultViewModeChange: (e) => {
    g(e), t("set-result-view-mode", { value: e });
  }, loading: a.loading, error: a.error, templates: a.templates, selectedTemplateId: a.selectedTemplateId, onLoadTemplate: (e) => t("load-template", { id: e }), templateName: j, onTemplateNameChange: G, editingTemplateId: a.editingTemplateId, onSaveTemplate: () => t("save-template"), onNewTemplate: () => t("new-template"), onDeleteTemplate: () => t("delete-template"), onRun: () => t("run"), onCancelGeneration: () => t("cancel-run"), onApplyResult: () => t("apply-result"), onAppendResult: () => t("append-result"), onCopyResult: () => t("copy-result"), onCreateNoteFromResult: () => t("create-note-from-result"), remoteMode: true, modelSelectAutoLoad: false, enableImageDropZone: false }) })] });
}
export {
  me as default
};
