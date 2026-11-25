import { r as o, j as a } from "./vendor-react-BPvvDyqO.js";
import { i as K, p as ee, a as te, s as oe, b as E, c as se, d as g, L as re, e as ne, f as ae, g as le, h as j } from "./llmAssistUiMode-luhuf21-.js";
import { r as O } from "./llmAssistImages-DG7rjEWr.js";
import { g as I, a as V, l as T } from "./index-CWHwu_I1.js";
import { L as _, n as y } from "./openaiCompatibleClient-IkbPXGDQ.js";
import { S as ie, X as ce } from "./vendor-lucide-Bo8me5Pj.js";
import "./vendor-aws-hJDgVEKM.js";
import "./bootSplash-Z2krRgC9.js";
import "./useLazyMermaidRender-BEGREvhj.js";
import "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./OpenAiCompatibleModelSelect-CsiqNDhn.js";
import "./geminiClient-pbSziARa.js";
import "./vendor-google-genai-BsvcYwA0.js";
import "./localLlmModelAliases-EglLH-3U.js";
import "./vendor-radix-ClWfNC7b.js";
import "./LlamaCppModelSelect-bL-K8PuL.js";
import "./vendor-motion-Bv-XITR_.js";
import "./ImageLightboxDownloadButton-23zf-_De.js";
import "./Kbd-Cnuyx3cZ.js";
import "./downloadImageSrc-CrSy4xG_.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
typeof document < "u" && V(T());
const q = { selectedText: "", selectionRange: { from: 0, to: 0 }, attachedImages: [], instruction: "", systemPrompt: I(), requestOptions: { ..._ }, result: "", resultViewMode: "text", loading: false, error: "", templates: [], selectedTemplateId: "", templateName: "", editingTemplateId: null, profiles: [], selectedProfileId: "", model: "", theme: T(), uiMode: "edit", chatMessages: [], chatDraft: "", chatLoading: false, chatError: "", chatReferences: [], chatImages: [], chatThreads: [], activeThreadId: null, canInsertIntoDocument: true };
function de(r) {
  return Array.isArray(r) ? r.map((i) => {
    if (!i || typeof i != "object") return null;
    const l = i, d = l.role === "assistant" ? "assistant" : l.role === "user" ? "user" : null;
    return d ? { id: typeof l.id == "string" ? l.id : `msg-${Math.random().toString(36).slice(2)}`, role: d, content: typeof l.content == "string" ? l.content : "" } : null;
  }).filter((i) => i !== null) : [];
}
function qe() {
  const [r, i] = o.useState(q), [l, d] = o.useState(""), [x, S] = o.useState(() => I()), [C, w] = o.useState(() => ({ ..._ })), [F, A] = o.useState(""), [U, R] = o.useState(""), [z, v] = o.useState("text"), [M, m] = o.useState(""), [p, u] = o.useState(""), [h, P] = o.useState("edit"), [B, b] = o.useState(""), [G, W] = o.useState(false), [c, Y] = o.useState(false), f = o.useRef(false);
  o.useEffect(() => (document.documentElement.classList.add("llm-assist-popout-window"), () => {
    document.documentElement.classList.remove("llm-assist-popout-window");
  }), []), o.useEffect(() => {
    K().then(Y);
  }, []), o.useEffect(() => {
    V(r.theme);
  }, [r.theme]);
  const t = o.useCallback((e, s = {}) => {
    ee(e, s);
  }, []), L = o.useCallback((e) => {
    const s = { ...q, ...e, resultViewMode: e.resultViewMode === "preview" || e.resultViewMode === "text" ? e.resultViewMode : "text", uiMode: te(e.uiMode) ? e.uiMode : "edit", chatMessages: de(e.chatMessages), chatDraft: typeof e.chatDraft == "string" ? e.chatDraft : "", chatLoading: !!e.chatLoading, chatError: typeof e.chatError == "string" ? e.chatError : "", chatReferences: Array.isArray(e.chatReferences) ? e.chatReferences.filter((n) => n && typeof n.id == "string" && typeof n.text == "string") : [], chatImages: Array.isArray(e.chatImages) ? e.chatImages : [], chatThreads: Array.isArray(e.chatThreads) ? e.chatThreads : [], activeThreadId: typeof e.activeThreadId == "string" ? e.activeThreadId : null, canInsertIntoDocument: e.canInsertIntoDocument !== false, profiles: Array.isArray(e.profiles) ? e.profiles : [], attachedImages: Array.isArray(e.attachedImages) ? e.attachedImages : [], templates: Array.isArray(e.templates) ? e.templates : [], theme: e.theme === "dark" || e.theme === "light" ? e.theme : T(), systemPrompt: typeof e.systemPrompt == "string" ? e.systemPrompt : I(), requestOptions: y(e.requestOptions), instruction: typeof e.instruction == "string" ? e.instruction : "", result: typeof e.result == "string" ? e.result : "", selectedText: typeof e.selectedText == "string" ? e.selectedText : "", selectedProfileId: typeof e.selectedProfileId == "string" ? e.selectedProfileId : "", model: typeof e.model == "string" ? e.model : "", templateName: typeof e.templateName == "string" ? e.templateName : "", selectedTemplateId: typeof e.selectedTemplateId == "string" ? e.selectedTemplateId : "", editingTemplateId: typeof e.editingTemplateId == "string" ? e.editingTemplateId : null, loading: !!e.loading, error: typeof e.error == "string" ? e.error : "", selectionRange: e.selectionRange && typeof e.selectionRange == "object" && typeof e.selectionRange.from == "number" && typeof e.selectionRange.to == "number" ? e.selectionRange : { from: 0, to: 0 } };
    i(s), d(s.instruction), S(s.systemPrompt), w(y(s.requestOptions)), A(s.templateName), R(s.result), v(s.resultViewMode), m(s.model || ""), u(s.selectedProfileId || ""), P(s.uiMode), b(s.chatDraft), W(true);
  }, []);
  o.useEffect(() => {
    let e = () => {
    }, s = false;
    return oe((n) => {
      if (n.type === j.SYNC && n.state) {
        L(n.state);
        return;
      }
      n.type === j.PARENT_CLOSING && (c ? g() : window.close());
    }).then((n) => {
      if (s) {
        n();
        return;
      }
      e = n;
    }), () => {
      s = true, e();
    };
  }, [L, c]), o.useEffect(() => {
    if (!f.current) {
      if (c) {
        f.current = true, E();
        return;
      }
      !window.opener || window.opener.closed || (f.current = true, E());
    }
  }, [c]), o.useEffect(() => {
    if (c) {
      const s = setInterval(() => {
        se().then((n) => {
          n || g();
        });
      }, 500);
      return () => clearInterval(s);
    }
    const e = setInterval(() => {
      (!window.opener || window.opener.closed) && window.close();
    }, 500);
    return () => clearInterval(e);
  }, [c]);
  const Z = o.useCallback((e) => {
    d(e), t("set-instruction", { value: e });
  }, [t]), N = o.useCallback((e) => {
    S(e), t("set-system-prompt", { value: e });
  }, [t]), D = o.useCallback((e) => {
    const s = y(e);
    w(s), t("set-request-options", { value: s });
  }, [t]), $ = o.useCallback((e) => {
    A(e), t("set-template-name", { value: e });
  }, [t]), Q = o.useCallback((e) => {
    R(e), t("set-result", { value: e });
  }, [t]), X = o.useCallback((e) => {
    P(e), t("set-ui-mode", { value: e });
  }, [t]), H = o.useCallback((e) => {
    b(e), t("set-chat-draft", { value: e });
  }, [t]), J = () => {
    t("close"), c ? g() : window.close();
  }, k = (r.profiles || []).find((e) => e.id === p) || null;
  return a.jsxs(re, { className: "llm-assist-popout-page flex min-h-0 flex-1 flex-col overflow-hidden bg-white dark:bg-odp-bgSofter", onFilesDrop: async (e) => {
    try {
      const s = await O(e);
      s.length && t("add-images", { images: s });
    } catch {
    }
  }, children: [a.jsxs("header", { className: "flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-4 py-2.5 dark:border-violet-800/50 dark:bg-violet-950/40", children: [a.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100", children: [a.jsx(ie, { size: 16, className: "shrink-0", "aria-hidden": true }), a.jsx("span", { className: "truncate", children: "AI \uB3C4\uC6B0\uBBF8" }), a.jsx(ne, { value: h, onChange: X }), !G && a.jsx("span", { className: "text-[10px] font-normal text-violet-600 dark:text-violet-300", children: "\uC5F0\uACB0 \uC911\u2026" })] }), a.jsx("button", { type: "button", onClick: J, className: "rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50", "aria-label": "\uB2EB\uAE30", children: a.jsx(ce, { size: 16 }) })] }), a.jsx("main", { className: `min-h-0 flex-1 p-4 ${h === "chat" ? "flex flex-col overflow-hidden" : "overflow-y-auto"}`, children: h === "chat" ? a.jsx(ae, { profiles: r.profiles, selectedProfileId: p, onSelectedProfileIdChange: (e) => {
    u(e), t("set-llm-profile-id", { value: e });
  }, selectedProfile: k, model: M, onModelChange: (e) => {
    m(e), t("set-model", { value: e });
  }, systemPrompt: x, onSystemPromptChange: N, requestOptions: C, onRequestOptionsChange: D, messages: r.chatMessages, draft: B, onDraftChange: H, references: r.chatReferences, onRemoveReference: (e) => t("remove-chat-reference", { id: e }), attachedImages: r.chatImages, onAddImages: async (e) => {
    if (!(e == null ? void 0 : e.length)) return;
    const s = await O(e);
    s.length && t("add-chat-images", { images: s });
  }, onRemoveImage: (e) => t("remove-chat-image", { id: e }), threads: r.chatThreads, activeThreadId: r.activeThreadId, onSelectThread: (e) => t("select-chat-thread", { id: e }), onDeleteThread: (e) => t("delete-chat-thread", { id: e }), onNewThread: () => t("new-chat-thread"), loading: r.chatLoading, error: r.chatError, onSend: () => t("send-chat"), onCancel: () => t("cancel-chat"), canInsertIntoDocument: r.canInsertIntoDocument !== false, onCopyMessage: (e) => t("copy-chat-message", { id: e.id }), onResendMessage: (e) => t("resend-chat-message", { id: e }), onRegenerateMessage: (e) => t("regenerate-chat-message", { id: e }), onApplyResult: (e) => t("apply-chat-result", { content: e }), onAppendResult: (e) => t("append-chat-result", { content: e }), onCreateNoteFromResult: (e) => t("create-note-from-chat-result", { content: e }), modelSelectAutoLoad: false }) : a.jsx(le, { theme: r.theme, profiles: r.profiles, selectedProfileId: p, onSelectedProfileIdChange: (e) => {
    u(e), t("set-llm-profile-id", { value: e });
  }, selectedProfile: k, model: M, onModelChange: (e) => {
    m(e), t("set-model", { value: e });
  }, selectedText: r.selectedText, onSelectedTextChange: (e) => t("set-selected-text", { value: e }), onRefreshSelection: () => t("refresh-selection"), attachedImages: r.attachedImages || [], onAddImages: async (e) => t("add-images", { images: e }), onRemoveImage: (e) => t("remove-image", { id: e }), instruction: l, onInstructionChange: Z, systemPrompt: x, onSystemPromptChange: N, requestOptions: C, onRequestOptionsChange: D, result: U, onResultChange: Q, resultViewMode: z, onResultViewModeChange: (e) => {
    v(e), t("set-result-view-mode", { value: e });
  }, loading: r.loading, error: r.error, templates: r.templates, selectedTemplateId: r.selectedTemplateId, onLoadTemplate: (e) => t("load-template", { id: e }), templateName: F, onTemplateNameChange: $, editingTemplateId: r.editingTemplateId, onSaveTemplate: () => t("save-template"), onNewTemplate: () => t("new-template"), onDeleteTemplate: () => t("delete-template"), onRun: () => t("run"), onCancelGeneration: () => t("cancel-run"), onApplyResult: () => t("apply-result"), onAppendResult: () => t("append-result"), onCopyResult: () => t("copy-result"), onCreateNoteFromResult: () => t("create-note-from-result"), remoteMode: true, modelSelectAutoLoad: false, enableImageDropZone: false }) })] });
}
export {
  qe as default
};
