import { r as a, j as t } from "./vendor-react-BPvvDyqO.js";
import { u as z, a as M, E as N } from "./vendor-tiptap-DxyadcB3.js";
import { c as S, g as E, i as P } from "./style-CMXP10cY.js";
import { C as D } from "./ChatWithMyselfPane-KfQ9ZCpH.js";
import { M as R, N as L } from "./index-BYVoYwQr.js";
import { U as H, R as U, B as q, c as O, I as G, d as I, Q as _, e as $, f as Q, g as V, h as T, i as Y } from "./vendor-lucide-BnjwTb2j.js";
import { v as F, w as W, x as J, y as K, z as X, A as Z } from "./vendor-radix-8kjzYRrX.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./vendor-codemirror-V7b8BJE-.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./index-flVIUjar.js";
import "./downloadImageSrc-Bi9SPN-h.js";
import "./Kbd-Cnuyx3cZ.js";
import "./bootSplash-Z2krRgC9.js";
import "./emojiShortcode-CZFZfFoz.js";
import "./WikiImageSizeModal-D7MjzOqH.js";
import "./vendor-image-crop-ROMAbiiY.js";
import "./cropPadImage-DJj-DEqh.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-cH2hWJjX.js";
import "./styleResolve-FWe9FNWf.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./mdEditorSelectionWrap-DR6lJ0QV.js";
import "./haimCodeTabSettings-BI7a8VYQ.js";
import "./codeBlockCommentTogglePlan-3lyEpRvG.js";
import "./haimCodeBlockLanguages-BStQPvla.js";
import "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./wikiImageResolver-BX0McZ8Q.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./ImageLightboxDownloadButton-Du86xHy8.js";
import "./ChatImageBackgroundPicker-1mpdWz4d.js";
import "./appStatusBar-COMHAiNk.js";
import "./useWikiImageHydration-BrPEAfu4.js";
import "./useDocumentTheme-DQfdY-Tj.js";
import "./useLazyMermaidRender-BEGREvhj.js";
import "./vendor-emoji-M0OGAF7J.js";
import "./emojiFrequent-y5DMPBh4.js";
import "./vendor-react-aria-C_4vZMwZ.js";
function ee(r) {
  const c = r.dom.closest(".chat-composer-haim-scroll");
  if (!(c instanceof HTMLElement)) return false;
  let i;
  try {
    i = r.coordsAtPos(r.state.selection.head);
  } catch {
    return true;
  }
  const d = c.getBoundingClientRect(), n = 8;
  return i.top < d.top + n ? c.scrollTop -= d.top + n - i.top : i.bottom > d.bottom - n && (c.scrollTop += i.bottom - (d.bottom - n)), i.left < d.left + n ? c.scrollLeft -= d.left + n - i.left : i.right > d.right - n && (c.scrollLeft += i.right - (d.right - n)), true;
}
function l({ label: r, active: c = false, disabled: i = false, onClick: d, children: n }) {
  return t.jsxs(W, { children: [t.jsx(J, { asChild: true, children: t.jsx("button", { type: "button", "aria-label": r, disabled: i, onClick: () => d(), className: `inline-flex h-7 w-7 items-center justify-center rounded border text-gray-700 dark:text-odp-fg ${c ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/40" : "border-transparent hover:bg-gray-100 dark:hover:bg-odp-bgSoft"} disabled:opacity-40`, children: n }) }), t.jsx(K, { children: t.jsxs(X, { side: "top", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [r, t.jsx(Z, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Qe({ value: r, onChange: c, theme: i, showToolbar: d = true, onUploadImg: n }) {
  const j = a.useRef(c);
  j.current = c;
  const x = a.useRef(r);
  x.current = r;
  const h = a.useRef(r || ""), b = a.useRef(false), m = a.useRef(null), [g, A] = a.useState(() => R());
  a.useEffect(() => {
    const e = () => A(R());
    return window.addEventListener(L, e), () => window.removeEventListener(L, e);
  }, []);
  const C = a.useMemo(() => S({ placeholder: "\uCC44\uD305\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", profile: "composer", typographyRules: g }), []), o = z({ extensions: C, content: r || "", contentType: "markdown", immediatelyRender: false, editorProps: { attributes: { class: `haim-editor-prose prose dark:prose-invert max-w-none focus:outline-none min-h-[4rem] px-2.5 py-2 text-sm ${i === "dark" ? "haim-editor--dark" : ""}` }, handleScrollToSelection: (e) => ee(e) } }, [C]);
  a.useEffect(() => {
    o && o.commands.setHaimTypographyRules(g);
  }, [o, g]);
  const k = a.useCallback(() => {
    if (!o) return;
    const e = E(o);
    h.current = e, e !== x.current && (x.current = e, j.current(e));
  }, [o]);
  a.useEffect(() => {
    if (!o) return;
    const e = o.view.dom, s = () => {
      b.current = true;
    }, f = () => {
      b.current = false, k();
    };
    e.addEventListener("compositionstart", s), e.addEventListener("compositionend", f);
    const p = () => {
      b.current || (m.current && clearTimeout(m.current), m.current = setTimeout(() => {
        m.current = null, k();
      }, 300));
    };
    return o.on("update", p), () => {
      o.off("update", p), e.removeEventListener("compositionstart", s), e.removeEventListener("compositionend", f), m.current && clearTimeout(m.current);
    };
  }, [o, k]), a.useEffect(() => {
    if (!o) return;
    const e = r || "";
    if (e === h.current) return;
    if (E(o) === e) {
      h.current = e;
      return;
    }
    h.current = e, P(o);
    try {
      o.commands.setContent(e, { contentType: "markdown", emitUpdate: false });
    } catch {
    }
  }, [o, r]), a.useEffect(() => {
    if (!o || !n) return;
    const e = o.view.dom, s = (f) => {
      var _a;
      const p = (_a = f.clipboardData) == null ? void 0 : _a.items;
      if (!p) return;
      const v = [];
      for (const y of p) if (y.type.startsWith("image/")) {
        const w = y.getAsFile();
        w && v.push(w);
      }
      v.length && (f.preventDefault(), n(v, () => {
      }));
    };
    return e.addEventListener("paste", s), () => e.removeEventListener("paste", s);
  }, [o, n]);
  const B = M({ editor: o, selector: ({ editor: e }) => e ? { bold: e.isActive("bold"), italic: e.isActive("italic"), underline: e.isActive("underline"), strike: e.isActive("strike"), code: e.isActive("code"), bullet: e.isActive("bulletList"), ordered: e.isActive("orderedList"), task: e.isActive("taskList"), quote: e.isActive("blockquote"), link: e.isActive("link"), canUndo: e.can().undo(), canRedo: e.can().redo() } : null });
  if (!o) return t.jsx(D, { value: r, onChange: c, fillParent: true });
  const u = B;
  return t.jsxs("div", { className: `chat-composer-haim flex h-full min-h-0 w-full flex-1 flex-col ${i === "dark" ? "haim-editor--dark" : ""}`, children: [d ? t.jsx(F, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs("div", { "data-composer-toolbar": "", className: "flex h-8 shrink-0 items-center gap-0.5 overflow-x-auto border-b border-slate-300 bg-slate-50 px-1 dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: [t.jsx(l, { label: "\uC2E4\uD589 \uCDE8\uC18C", disabled: !(u == null ? void 0 : u.canUndo), onClick: () => o.chain().focus().undo().run(), children: t.jsx(H, { size: 13 }) }), t.jsx(l, { label: "\uB2E4\uC2DC \uC2E4\uD589", disabled: !(u == null ? void 0 : u.canRedo), onClick: () => o.chain().focus().redo().run(), children: t.jsx(U, { size: 13 }) }), t.jsx("span", { className: "mx-0.5 h-3.5 w-px bg-slate-300 dark:bg-odp-borderStrong" }), t.jsx(l, { label: "\uAD75\uAC8C", active: !!(u == null ? void 0 : u.bold), onClick: () => o.chain().focus().toggleBold().run(), children: t.jsx(q, { size: 13 }) }), t.jsx(l, { label: "\uBC11\uC904", active: !!(u == null ? void 0 : u.underline), onClick: () => o.chain().focus().toggleUnderline().run(), children: t.jsx(O, { size: 13 }) }), t.jsx(l, { label: "\uAE30\uC6B8\uC784", active: !!(u == null ? void 0 : u.italic), onClick: () => o.chain().focus().toggleItalic().run(), children: t.jsx(G, { size: 13 }) }), t.jsx(l, { label: "\uCDE8\uC18C\uC120", active: !!(u == null ? void 0 : u.strike), onClick: () => o.chain().focus().toggleStrike().run(), children: t.jsx(I, { size: 13 }) }), t.jsx(l, { label: "\uC778\uC6A9", active: !!(u == null ? void 0 : u.quote), onClick: () => o.chain().focus().toggleBlockquote().run(), children: t.jsx(_, { size: 13 }) }), t.jsx(l, { label: "\uAE00\uBA38\uB9AC", active: !!(u == null ? void 0 : u.bullet), onClick: () => o.chain().focus().toggleBulletList().run(), children: t.jsx($, { size: 13 }) }), t.jsx(l, { label: "\uBC88\uD638 \uBAA9\uB85D", active: !!(u == null ? void 0 : u.ordered), onClick: () => o.chain().focus().toggleOrderedList().run(), children: t.jsx(Q, { size: 13 }) }), t.jsx(l, { label: "\uD560 \uC77C", active: !!(u == null ? void 0 : u.task), onClick: () => o.chain().focus().toggleTaskList().run(), children: t.jsx(V, { size: 13 }) }), t.jsx(l, { label: "\uC778\uB77C\uC778 \uCF54\uB4DC", active: !!(u == null ? void 0 : u.code), onClick: () => o.chain().focus().toggleCode().run(), children: t.jsx(T, { size: 13 }) }), t.jsx(l, { label: "\uCF54\uB4DC \uBE14\uB85D", onClick: () => o.chain().focus().toggleCodeBlock().run(), children: t.jsx(T, { size: 13, className: "opacity-70" }) }), t.jsx(l, { label: "\uB9C1\uD06C", active: !!(u == null ? void 0 : u.link), onClick: () => {
    const e = o.getAttributes("link").href, s = window.prompt("URL", e || "https://");
    if (s !== null) {
      if (s === "") {
        o.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      o.chain().focus().extendMarkRange("link").setLink({ href: s }).run();
    }
  }, children: t.jsx(Y, { size: 13 }) })] }) }) : null, t.jsx("div", { className: "chat-composer-haim-scroll relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain [overflow-anchor:none]", onMouseDown: (e) => {
    const s = e.target;
    s instanceof Element && (s.closest(".ProseMirror, button, a, input, textarea") || (e.preventDefault(), o.chain().focus("end").run()));
  }, children: t.jsx(N, { editor: o, className: "haim-editor-content min-h-full w-full flex-1" }) })] });
}
export {
  Qe as default
};
