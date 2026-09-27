import { r as a, j as e } from "./vendor-react-BDjpSibw.js";
import { u as B, a as y, E as z } from "./vendor-tiptap-C36_9pH2.js";
import { c as A, g as R, i as T } from "./style-Dhjn2fhV.js";
import { C as N } from "./ChatWithMyselfPane-BSq3jnVD.js";
import { U as S, R as M, B as U, c as P, I as D, d as q, Q as O, e as $, f as H, g as Q, h as E, i as F } from "./vendor-lucide-DgWK5x8G.js";
import { h as I, i as W, j as G, k as J, l as K, A as V } from "./vendor-radix-qpbG9kXl.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Cy0EGwO-.js";
import "./vendor-codemirror-CmNIsAMQ.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./vendor-motion-Djo_xQxQ.js";
import "./index-CUaeQqoG.js";
import "./index-Bi820a2m.js";
import "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./Kbd-zJP-p1De.js";
import "./WikiImageSizeModal-CqFylg4e.js";
import "./vendor-image-crop-BD82vq0Q.js";
import "./cropPadImage-wnyK5ooF.js";
import "./noteCoverPlaceholderMarkdownIt-JbOPnRKr.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-CLUdBs2z.js";
import "./styleResolve-DoqNWjkh.js";
import "./lazyMermaid-CFU1x6wk.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./wikiImageResolver-BTpOjDAV.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./ChatImageBackgroundPicker-CjkXbevy.js";
import "./appStatusBar-COMHAiNk.js";
import "./useDocumentTheme-BW9djUOW.js";
import "./useWikiImageHydration-h_4KoYXY.js";
import "./useLazyMermaidRender-CMWw-qPT.js";
import "./vendor-emoji-CkoxFqjQ.js";
import "./vendor-react-aria-Ca5SAAo0.js";
function o({ label: n, active: l = false, disabled: f = false, onClick: x, children: d }) {
  return e.jsxs(W, { children: [e.jsx(G, { asChild: true, children: e.jsx("button", { type: "button", "aria-label": n, disabled: f, onClick: () => x(), className: `inline-flex h-7 w-7 items-center justify-center rounded border text-gray-700 dark:text-odp-fg ${l ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/40" : "border-transparent hover:bg-gray-100 dark:hover:bg-odp-bgSoft"} disabled:opacity-40`, children: d }) }), e.jsx(J, { children: e.jsxs(K, { side: "top", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [n, e.jsx(V, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Se({ value: n, onChange: l, theme: f, showToolbar: x = true, onUploadImg: d }) {
  const j = a.useRef(l);
  j.current = l;
  const h = a.useRef(n);
  h.current = n;
  const p = a.useRef(n || ""), k = a.useRef(false), c = a.useRef(null), v = a.useMemo(() => A({ placeholder: "\uBA54\uC2DC\uC9C0 \uC785\uB825\u2026", profile: "composer" }), []), t = B({ extensions: v, content: n || "", contentType: "markdown", immediatelyRender: false, editorProps: { attributes: { class: `haim-editor-prose prose dark:prose-invert max-w-none focus:outline-none min-h-[4rem] px-2.5 py-2 text-sm ${f === "dark" ? "haim-editor--dark" : ""}` } } }, [v]), b = a.useCallback(() => {
    if (!t) return;
    const r = R(t);
    p.current = r, r !== h.current && (h.current = r, j.current(r));
  }, [t]);
  a.useEffect(() => {
    if (!t) return;
    const r = t.view.dom, s = () => {
      k.current = true;
    }, u = () => {
      k.current = false, b();
    };
    r.addEventListener("compositionstart", s), r.addEventListener("compositionend", u);
    const m = () => {
      k.current || (c.current && clearTimeout(c.current), c.current = setTimeout(() => {
        c.current = null, b();
      }, 300));
    };
    return t.on("update", m), () => {
      t.off("update", m), r.removeEventListener("compositionstart", s), r.removeEventListener("compositionend", u), c.current && clearTimeout(c.current);
    };
  }, [t, b]), a.useEffect(() => {
    if (!t) return;
    const r = n || "";
    if (r === p.current) return;
    if (R(t) === r) {
      p.current = r;
      return;
    }
    p.current = r, T(t), t.commands.setContent(r, { contentType: "markdown", emitUpdate: false });
  }, [t, n]), a.useEffect(() => {
    if (!t || !d) return;
    const r = t.view.dom, s = (u) => {
      var _a;
      const m = (_a = u.clipboardData) == null ? void 0 : _a.items;
      if (!m) return;
      const g = [];
      for (const C of m) if (C.type.startsWith("image/")) {
        const w = C.getAsFile();
        w && g.push(w);
      }
      g.length && (u.preventDefault(), d(g, () => {
      }));
    };
    return r.addEventListener("paste", s), () => r.removeEventListener("paste", s);
  }, [t, d]);
  const L = y({ editor: t, selector: ({ editor: r }) => r ? { bold: r.isActive("bold"), italic: r.isActive("italic"), underline: r.isActive("underline"), strike: r.isActive("strike"), code: r.isActive("code"), bullet: r.isActive("bulletList"), ordered: r.isActive("orderedList"), task: r.isActive("taskList"), quote: r.isActive("blockquote"), link: r.isActive("link"), canUndo: r.can().undo(), canRedo: r.can().redo() } : null });
  if (!t) return e.jsx(N, { value: n, onChange: l, fillParent: true });
  const i = L;
  return e.jsxs("div", { className: `chat-composer-haim flex h-full min-h-0 w-full flex-col ${f === "dark" ? "haim-editor--dark" : ""}`, children: [x ? e.jsx(I, { delayDuration: 250, skipDelayDuration: 0, children: e.jsxs("div", { className: "flex h-8 shrink-0 items-center gap-0.5 overflow-x-auto border-b border-slate-300 bg-slate-50 px-1 dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: [e.jsx(o, { label: "\uC2E4\uD589 \uCDE8\uC18C", disabled: !(i == null ? void 0 : i.canUndo), onClick: () => t.chain().focus().undo().run(), children: e.jsx(S, { size: 13 }) }), e.jsx(o, { label: "\uB2E4\uC2DC \uC2E4\uD589", disabled: !(i == null ? void 0 : i.canRedo), onClick: () => t.chain().focus().redo().run(), children: e.jsx(M, { size: 13 }) }), e.jsx("span", { className: "mx-0.5 h-3.5 w-px bg-slate-300 dark:bg-odp-borderStrong" }), e.jsx(o, { label: "\uAD75\uAC8C", active: !!(i == null ? void 0 : i.bold), onClick: () => t.chain().focus().toggleBold().run(), children: e.jsx(U, { size: 13 }) }), e.jsx(o, { label: "\uBC11\uC904", active: !!(i == null ? void 0 : i.underline), onClick: () => t.chain().focus().toggleUnderline().run(), children: e.jsx(P, { size: 13 }) }), e.jsx(o, { label: "\uAE30\uC6B8\uC784", active: !!(i == null ? void 0 : i.italic), onClick: () => t.chain().focus().toggleItalic().run(), children: e.jsx(D, { size: 13 }) }), e.jsx(o, { label: "\uCDE8\uC18C\uC120", active: !!(i == null ? void 0 : i.strike), onClick: () => t.chain().focus().toggleStrike().run(), children: e.jsx(q, { size: 13 }) }), e.jsx(o, { label: "\uC778\uC6A9", active: !!(i == null ? void 0 : i.quote), onClick: () => t.chain().focus().toggleBlockquote().run(), children: e.jsx(O, { size: 13 }) }), e.jsx(o, { label: "\uAE00\uBA38\uB9AC", active: !!(i == null ? void 0 : i.bullet), onClick: () => t.chain().focus().toggleBulletList().run(), children: e.jsx($, { size: 13 }) }), e.jsx(o, { label: "\uBC88\uD638 \uBAA9\uB85D", active: !!(i == null ? void 0 : i.ordered), onClick: () => t.chain().focus().toggleOrderedList().run(), children: e.jsx(H, { size: 13 }) }), e.jsx(o, { label: "\uD560 \uC77C", active: !!(i == null ? void 0 : i.task), onClick: () => t.chain().focus().toggleTaskList().run(), children: e.jsx(Q, { size: 13 }) }), e.jsx(o, { label: "\uC778\uB77C\uC778 \uCF54\uB4DC", active: !!(i == null ? void 0 : i.code), onClick: () => t.chain().focus().toggleCode().run(), children: e.jsx(E, { size: 13 }) }), e.jsx(o, { label: "\uCF54\uB4DC \uBE14\uB85D", onClick: () => t.chain().focus().toggleCodeBlock().run(), children: e.jsx(E, { size: 13, className: "opacity-70" }) }), e.jsx(o, { label: "\uB9C1\uD06C", active: !!(i == null ? void 0 : i.link), onClick: () => {
    const r = t.getAttributes("link").href, s = window.prompt("URL", r || "https://");
    if (s !== null) {
      if (s === "") {
        t.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      t.chain().focus().extendMarkRange("link").setLink({ href: s }).run();
    }
  }, children: e.jsx(F, { size: 13 }) })] }) }) : null, e.jsx("div", { className: "min-h-0 flex-1 overflow-auto", children: e.jsx(z, { editor: t, className: "h-full" }) })] });
}
export {
  Se as default
};
