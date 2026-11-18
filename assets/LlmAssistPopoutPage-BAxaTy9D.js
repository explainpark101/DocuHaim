import { r as o, j as n } from "./vendor-react-BPvvDyqO.js";
import { i as J, p as K, a as ee, s as te, b as j, c as oe, d as g, L as se, e as re, f as ne, g as le, h as D } from "./llmAssistUiMode-8rgwoxzD.js";
import { r as ae } from "./llmAssistImages-DG7rjEWr.js";
import { g as x, a as q, l as S } from "./index-Cc1jKdr9.js";
import { L as V, n as y } from "./openaiCompatibleClient-DDjC_ayR.js";
import { S as ie, X as de } from "./vendor-lucide-BMfkLP2z.js";
import "./vendor-aws-hJDgVEKM.js";
import "./bootSplash-Z2krRgC9.js";
import "./useLazyMermaidRender-BEGREvhj.js";
import "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./OpenAiCompatibleModelSelect-CNVPsjM1.js";
import "./geminiClient-DXF3HNWj.js";
import "./vendor-google-genai-BsvcYwA0.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./vendor-radix-C_q1g830.js";
import "./LlamaCppModelSelect-CcvgaduJ.js";
import "./vendor-motion-Bv-XITR_.js";
import "./ImageLightboxDownloadButton-BrJHusbw.js";
import "./Kbd-Cnuyx3cZ.js";
import "./downloadImageSrc-BqWro2Ax.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
typeof document < "u" && q(S());
const O = { selectedText: "", selectionRange: { from: 0, to: 0 }, attachedImages: [], instruction: "", systemPrompt: x(), requestOptions: { ...V }, result: "", resultViewMode: "text", loading: false, error: "", templates: [], selectedTemplateId: "", templateName: "", editingTemplateId: null, profiles: [], selectedProfileId: "", model: "", theme: S(), uiMode: "edit", chatMessages: [], chatDraft: "", chatLoading: false, chatError: "" };
function me(r) {
  return Array.isArray(r) ? r.map((i) => {
    if (!i || typeof i != "object") return null;
    const a = i, m = a.role === "assistant" ? "assistant" : a.role === "user" ? "user" : null;
    return m ? { id: typeof a.id == "string" ? a.id : `msg-${Math.random().toString(36).slice(2)}`, role: m, content: typeof a.content == "string" ? a.content : "" } : null;
  }).filter((i) => i !== null) : [];
}
function qe() {
  const [r, i] = o.useState(O), [a, m] = o.useState(""), [C, I] = o.useState(() => x()), [w, T] = o.useState(() => ({ ...V })), [_, A] = o.useState(""), [U, P] = o.useState(""), [F, M] = o.useState("text"), [b, c] = o.useState(""), [p, u] = o.useState(""), [f, R] = o.useState("edit"), [z, L] = o.useState(""), [B, G] = o.useState(false), [d, W] = o.useState(false), h = o.useRef(false);
  o.useEffect(() => (document.documentElement.classList.add("llm-assist-popout-window"), () => {
    document.documentElement.classList.remove("llm-assist-popout-window");
  }), []), o.useEffect(() => {
    J().then(W);
  }, []), o.useEffect(() => {
    q(r.theme);
  }, [r.theme]);
  const t = o.useCallback((e, s = {}) => {
    K(e, s);
  }, []), v = o.useCallback((e) => {
    const s = { ...O, ...e, resultViewMode: e.resultViewMode === "preview" || e.resultViewMode === "text" ? e.resultViewMode : "text", uiMode: ee(e.uiMode) ? e.uiMode : "edit", chatMessages: me(e.chatMessages), chatDraft: typeof e.chatDraft == "string" ? e.chatDraft : "", chatLoading: !!e.chatLoading, chatError: typeof e.chatError == "string" ? e.chatError : "", profiles: Array.isArray(e.profiles) ? e.profiles : [], attachedImages: Array.isArray(e.attachedImages) ? e.attachedImages : [], templates: Array.isArray(e.templates) ? e.templates : [], theme: e.theme === "dark" || e.theme === "light" ? e.theme : S(), systemPrompt: typeof e.systemPrompt == "string" ? e.systemPrompt : x(), requestOptions: y(e.requestOptions), instruction: typeof e.instruction == "string" ? e.instruction : "", result: typeof e.result == "string" ? e.result : "", selectedText: typeof e.selectedText == "string" ? e.selectedText : "", selectedProfileId: typeof e.selectedProfileId == "string" ? e.selectedProfileId : "", model: typeof e.model == "string" ? e.model : "", templateName: typeof e.templateName == "string" ? e.templateName : "", selectedTemplateId: typeof e.selectedTemplateId == "string" ? e.selectedTemplateId : "", editingTemplateId: typeof e.editingTemplateId == "string" ? e.editingTemplateId : null, loading: !!e.loading, error: typeof e.error == "string" ? e.error : "", selectionRange: e.selectionRange && typeof e.selectionRange == "object" && typeof e.selectionRange.from == "number" && typeof e.selectionRange.to == "number" ? e.selectionRange : { from: 0, to: 0 } };
    i(s), m(s.instruction), I(s.systemPrompt), T(y(s.requestOptions)), A(s.templateName), P(s.result), M(s.resultViewMode), c(s.model || ""), u(s.selectedProfileId || ""), R(s.uiMode), L(s.chatDraft), G(true);
  }, []);
  o.useEffect(() => {
    let e = () => {
    }, s = false;
    return te((l) => {
      if (l.type === D.SYNC && l.state) {
        v(l.state);
        return;
      }
      l.type === D.PARENT_CLOSING && (d ? g() : window.close());
    }).then((l) => {
      if (s) {
        l();
        return;
      }
      e = l;
    }), () => {
      s = true, e();
    };
  }, [v, d]), o.useEffect(() => {
    if (!h.current) {
      if (d) {
        h.current = true, j();
        return;
      }
      !window.opener || window.opener.closed || (h.current = true, j());
    }
  }, [d]), o.useEffect(() => {
    if (d) {
      const s = setInterval(() => {
        oe().then((l) => {
          l || g();
        });
      }, 500);
      return () => clearInterval(s);
    }
    const e = setInterval(() => {
      (!window.opener || window.opener.closed) && window.close();
    }, 500);
    return () => clearInterval(e);
  }, [d]);
  const Y = o.useCallback((e) => {
    m(e), t("set-instruction", { value: e });
  }, [t]), N = o.useCallback((e) => {
    I(e), t("set-system-prompt", { value: e });
  }, [t]), k = o.useCallback((e) => {
    const s = y(e);
    T(s), t("set-request-options", { value: s });
  }, [t]), Z = o.useCallback((e) => {
    A(e), t("set-template-name", { value: e });
  }, [t]), $ = o.useCallback((e) => {
    P(e), t("set-result", { value: e });
  }, [t]), Q = o.useCallback((e) => {
    R(e), t("set-ui-mode", { value: e });
  }, [t]), X = o.useCallback((e) => {
    L(e), t("set-chat-draft", { value: e });
  }, [t]), H = () => {
    t("close"), d ? g() : window.close();
  }, E = (r.profiles || []).find((e) => e.id === p) || null;
  return n.jsxs(se, { className: "llm-assist-popout-page flex min-h-0 flex-1 flex-col overflow-hidden bg-white dark:bg-odp-bgSofter", onFilesDrop: async (e) => {
    try {
      const s = await ae(e);
      s.length && t("add-images", { images: s });
    } catch {
    }
  }, children: [n.jsxs("header", { className: "flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-4 py-2.5 dark:border-violet-800/50 dark:bg-violet-950/40", children: [n.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [n.jsx(ie, { size: 16, className: "shrink-0", "aria-hidden": true }), n.jsx("span", { className: "truncate", children: "AI \uB3C4\uC6B0\uBBF8" }), n.jsx(re, { value: f, onChange: Q }), !B && n.jsx("span", { className: "text-[10px] font-normal text-violet-600 dark:text-violet-300", children: "\uC5F0\uACB0 \uC911\u2026" })] }), n.jsx("button", { type: "button", onClick: H, className: "rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", "aria-label": "\uB2EB\uAE30", children: n.jsx(de, { size: 16 }) })] }), n.jsx("main", { className: `min-h-0 flex-1 p-4 ${f === "chat" ? "flex flex-col overflow-hidden" : "overflow-y-auto"}`, children: f === "chat" ? n.jsx(ne, { profiles: r.profiles, selectedProfileId: p, onSelectedProfileIdChange: (e) => {
    u(e), t("set-llm-profile-id", { value: e });
  }, selectedProfile: E, model: b, onModelChange: (e) => {
    c(e), t("set-model", { value: e });
  }, systemPrompt: C, onSystemPromptChange: N, requestOptions: w, onRequestOptionsChange: k, messages: r.chatMessages, draft: z, onDraftChange: X, loading: r.chatLoading, error: r.chatError, onSend: () => t("send-chat"), onCancel: () => t("cancel-chat"), onClearMessages: () => t("clear-chat"), modelSelectAutoLoad: false }) : n.jsx(le, { theme: r.theme, profiles: r.profiles, selectedProfileId: p, onSelectedProfileIdChange: (e) => {
    u(e), t("set-llm-profile-id", { value: e });
  }, selectedProfile: E, model: b, onModelChange: (e) => {
    c(e), t("set-model", { value: e });
  }, selectedText: r.selectedText, onSelectedTextChange: (e) => t("set-selected-text", { value: e }), onRefreshSelection: () => t("refresh-selection"), attachedImages: r.attachedImages || [], onAddImages: async (e) => t("add-images", { images: e }), onRemoveImage: (e) => t("remove-image", { id: e }), instruction: a, onInstructionChange: Y, systemPrompt: C, onSystemPromptChange: N, requestOptions: w, onRequestOptionsChange: k, result: U, onResultChange: $, resultViewMode: F, onResultViewModeChange: (e) => {
    M(e), t("set-result-view-mode", { value: e });
  }, loading: r.loading, error: r.error, templates: r.templates, selectedTemplateId: r.selectedTemplateId, onLoadTemplate: (e) => t("load-template", { id: e }), templateName: _, onTemplateNameChange: Z, editingTemplateId: r.editingTemplateId, onSaveTemplate: () => t("save-template"), onNewTemplate: () => t("new-template"), onDeleteTemplate: () => t("delete-template"), onRun: () => t("run"), onCancelGeneration: () => t("cancel-run"), onApplyResult: () => t("apply-result"), onAppendResult: () => t("append-result"), onCopyResult: () => t("copy-result"), onCreateNoteFromResult: () => t("create-note-from-result"), remoteMode: true, modelSelectAutoLoad: false, enableImageDropZone: false }) })] });
}
export {
  qe as default
};
