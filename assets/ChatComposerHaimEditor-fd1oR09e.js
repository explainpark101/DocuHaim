import { r as a, j as e } from "./vendor-react-BDjpSibw.js";
import { u as E, a as R, E as B } from "./vendor-tiptap-Cwq5MbeS.js";
import { c as z, g as w, i as A } from "./style-C5R1jrH9.js";
import { L as N, U as S, R as T, B as U, c as M, I as D, d as q, Q as P, e as H, f as O, g as $, h as L, i as Q } from "./vendor-lucide-DgRPSpKt.js";
import { h as F, i as I, j as W, k as G, l as J, A as K } from "./vendor-radix-qpbG9kXl.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Cy0EGwO-.js";
import "./vendor-codemirror-Cs6dUi8u.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./vendor-motion-Djo_xQxQ.js";
import "./index-CUaeQqoG.js";
import "./index-BF8EnhwI.js";
import "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./Kbd-zJP-p1De.js";
import "./WikiImageSizeModal-CFgFwQjh.js";
import "./vendor-image-crop-BD82vq0Q.js";
import "./cropPadImage-CpyUDqDt.js";
import "./noteCoverPlaceholderMarkdownIt-JbOPnRKr.js";
import "./toHtml-C4jHCOXi.js";
import "./styleResolve-wfRpwUCS.js";
import "./lazyMermaid-CFU1x6wk.js";
import "./mermaidTheme-Deyx0OD8.js";
function o({ label: s, active: m = false, disabled: f = false, onClick: p, children: c }) {
  return e.jsxs(I, { children: [e.jsx(W, { asChild: true, children: e.jsx("button", { type: "button", "aria-label": s, disabled: f, onClick: () => p(), className: `inline-flex h-7 w-7 items-center justify-center rounded border text-gray-700 dark:text-odp-fg ${m ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/40" : "border-transparent hover:bg-gray-100 dark:hover:bg-odp-bgSoft"} disabled:opacity-40`, children: c }) }), e.jsx(G, { children: e.jsxs(J, { side: "top", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [s, e.jsx(K, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function ve({ value: s, onChange: m, theme: f, showToolbar: p = true, onUploadImg: c }) {
  const b = a.useRef(m);
  b.current = m;
  const g = a.useRef(s);
  g.current = s;
  const x = a.useRef(false), l = a.useRef(null), v = a.useMemo(() => z({ placeholder: "\uBA54\uC2DC\uC9C0 \uC785\uB825\u2026", profile: "composer" }), []), t = E({ extensions: v, content: s || "", contentType: "markdown", immediatelyRender: false, editorProps: { attributes: { class: `haim-editor-prose prose dark:prose-invert max-w-none focus:outline-none min-h-[4rem] px-2.5 py-2 text-sm ${f === "dark" ? "haim-editor--dark" : ""}` } } }, [v]), h = a.useCallback(() => {
    if (!t) return;
    const r = w(t);
    r !== g.current && b.current(r);
  }, [t]);
  a.useEffect(() => {
    if (!t) return;
    const r = t.view.dom, n = () => {
      x.current = true;
    }, d = () => {
      x.current = false, h();
    };
    r.addEventListener("compositionstart", n), r.addEventListener("compositionend", d);
    const u = () => {
      x.current || (l.current && clearTimeout(l.current), l.current = setTimeout(() => {
        l.current = null, h();
      }, 120));
    };
    return t.on("update", u), () => {
      t.off("update", u), r.removeEventListener("compositionstart", n), r.removeEventListener("compositionend", d), l.current && clearTimeout(l.current);
    };
  }, [t, h]), a.useEffect(() => {
    !t || w(t) === (s || "") || (A(t), t.commands.setContent(s || "", { contentType: "markdown", emitUpdate: false }));
  }, [t, s]), a.useEffect(() => {
    if (!t || !c) return;
    const r = t.view.dom, n = (d) => {
      var _a;
      const u = (_a = d.clipboardData) == null ? void 0 : _a.items;
      if (!u) return;
      const k = [];
      for (const j of u) if (j.type.startsWith("image/")) {
        const C = j.getAsFile();
        C && k.push(C);
      }
      k.length && (d.preventDefault(), c(k, () => {
      }));
    };
    return r.addEventListener("paste", n), () => r.removeEventListener("paste", n);
  }, [t, c]);
  const y = R({ editor: t, selector: ({ editor: r }) => r ? { bold: r.isActive("bold"), italic: r.isActive("italic"), underline: r.isActive("underline"), strike: r.isActive("strike"), code: r.isActive("code"), bullet: r.isActive("bulletList"), ordered: r.isActive("orderedList"), task: r.isActive("taskList"), quote: r.isActive("blockquote"), link: r.isActive("link"), canUndo: r.can().undo(), canRedo: r.can().redo() } : null });
  if (!t) return e.jsxs("div", { className: "flex h-full min-h-0 flex-1 items-center gap-2 px-2.5", role: "status", "aria-live": "polite", "aria-busy": "true", children: [e.jsx(N, { size: 14, className: "shrink-0 animate-spin text-gray-400 dark:text-gray-500", "aria-hidden": true }), e.jsx("span", { className: "text-sm text-gray-400 dark:text-odp-muted", children: "Haim Editor \uB85C\uB529 \uC911\u2026" })] });
  const i = y;
  return e.jsxs("div", { className: `chat-composer-haim flex h-full min-h-0 w-full flex-col ${f === "dark" ? "haim-editor--dark" : ""}`, children: [p ? e.jsx(F, { delayDuration: 250, skipDelayDuration: 0, children: e.jsxs("div", { className: "flex h-8 shrink-0 items-center gap-0.5 overflow-x-auto border-b border-slate-300 bg-slate-50 px-1 dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: [e.jsx(o, { label: "\uC2E4\uD589 \uCDE8\uC18C", disabled: !(i == null ? void 0 : i.canUndo), onClick: () => t.chain().focus().undo().run(), children: e.jsx(S, { size: 13 }) }), e.jsx(o, { label: "\uB2E4\uC2DC \uC2E4\uD589", disabled: !(i == null ? void 0 : i.canRedo), onClick: () => t.chain().focus().redo().run(), children: e.jsx(T, { size: 13 }) }), e.jsx("span", { className: "mx-0.5 h-3.5 w-px bg-slate-300 dark:bg-odp-borderStrong" }), e.jsx(o, { label: "\uAD75\uAC8C", active: !!(i == null ? void 0 : i.bold), onClick: () => t.chain().focus().toggleBold().run(), children: e.jsx(U, { size: 13 }) }), e.jsx(o, { label: "\uBC11\uC904", active: !!(i == null ? void 0 : i.underline), onClick: () => t.chain().focus().toggleUnderline().run(), children: e.jsx(M, { size: 13 }) }), e.jsx(o, { label: "\uAE30\uC6B8\uC784", active: !!(i == null ? void 0 : i.italic), onClick: () => t.chain().focus().toggleItalic().run(), children: e.jsx(D, { size: 13 }) }), e.jsx(o, { label: "\uCDE8\uC18C\uC120", active: !!(i == null ? void 0 : i.strike), onClick: () => t.chain().focus().toggleStrike().run(), children: e.jsx(q, { size: 13 }) }), e.jsx(o, { label: "\uC778\uC6A9", active: !!(i == null ? void 0 : i.quote), onClick: () => t.chain().focus().toggleBlockquote().run(), children: e.jsx(P, { size: 13 }) }), e.jsx(o, { label: "\uAE00\uBA38\uB9AC", active: !!(i == null ? void 0 : i.bullet), onClick: () => t.chain().focus().toggleBulletList().run(), children: e.jsx(H, { size: 13 }) }), e.jsx(o, { label: "\uBC88\uD638 \uBAA9\uB85D", active: !!(i == null ? void 0 : i.ordered), onClick: () => t.chain().focus().toggleOrderedList().run(), children: e.jsx(O, { size: 13 }) }), e.jsx(o, { label: "\uD560 \uC77C", active: !!(i == null ? void 0 : i.task), onClick: () => t.chain().focus().toggleTaskList().run(), children: e.jsx($, { size: 13 }) }), e.jsx(o, { label: "\uC778\uB77C\uC778 \uCF54\uB4DC", active: !!(i == null ? void 0 : i.code), onClick: () => t.chain().focus().toggleCode().run(), children: e.jsx(L, { size: 13 }) }), e.jsx(o, { label: "\uCF54\uB4DC \uBE14\uB85D", onClick: () => t.chain().focus().toggleCodeBlock().run(), children: e.jsx(L, { size: 13, className: "opacity-70" }) }), e.jsx(o, { label: "\uB9C1\uD06C", active: !!(i == null ? void 0 : i.link), onClick: () => {
    const r = t.getAttributes("link").href, n = window.prompt("URL", r || "https://");
    if (n !== null) {
      if (n === "") {
        t.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      t.chain().focus().extendMarkRange("link").setLink({ href: n }).run();
    }
  }, children: e.jsx(Q, { size: 13 }) })] }) }) : null, e.jsx("div", { className: "min-h-0 flex-1 overflow-auto", children: e.jsx(B, { editor: t, className: "h-full" }) })] });
}
export {
  ve as default
};
