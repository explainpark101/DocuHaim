import { r as n, j as t } from "./vendor-react-BPvvDyqO.js";
import { u as z, a as N, E as S } from "./vendor-tiptap-CCuN4hjl.js";
import { c as M, g as w, i as P } from "./style-B4dxmevl.js";
import { C as H } from "./ChatWithMyselfPane-CsOVW8W9.js";
import { M as R, N as L } from "./index-BWRKY1kH.js";
import { U, R as D, B as q, e as O, I as G, f as I, Q as _, g as $, h as Q, i as V, j as T, k as Y } from "./vendor-lucide-WaT9JbCs.js";
import { P as F, n as W, T as J, p as K, C as X, A as Z } from "./vendor-radix-D1Cm_mSM.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Dm7Q9DxH.js";
import "./vendor-codemirror-hMVyL7k-.js";
import "./vendor-aws-hJDgVEKM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./index-flVIUjar.js";
import "./Kbd-Cnuyx3cZ.js";
import "./copyImageToClipboard-CSIFGHOw.js";
import "./bootSplash-CNqesnab.js";
import "./emojiShortcode-CsHTmfPL.js";
import "./WikiImageSizeModal-BwUb0in7.js";
import "./vendor-image-crop-ROMAbiiY.js";
import "./cropPadImage-BrjdQMO6.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-Ds4gmJ8u.js";
import "./styleResolve-DXt-c61e.js";
import "./core-BUhCcD2K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./mdEditorSelectionWrap-Dw_M3bkD.js";
import "./haimCodeTabSettings-BI7a8VYQ.js";
import "./codeBlockCommentTogglePlan-3lyEpRvG.js";
import "./haimCodeBlockLanguages-BStQPvla.js";
import "./lazyMermaid-BcnyKPEC.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./wikiImageResolver-D-wkk78M.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./ImageLightboxCopyButton-ynJaiOc5.js";
import "./ChatImageBackgroundPicker-89IUnkSA.js";
import "./appStatusBar-COMHAiNk.js";
import "./useWikiImageHydration-DPvOWmIp.js";
import "./useDocumentTheme-BPcviFpf.js";
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
  const l = c.getBoundingClientRect(), s = 8;
  return i.top < l.top + s ? c.scrollTop -= l.top + s - i.top : i.bottom > l.bottom - s && (c.scrollTop += i.bottom - (l.bottom - s)), i.left < l.left + s ? c.scrollLeft -= l.left + s - i.left : i.right > l.right - s && (c.scrollLeft += i.right - (l.right - s)), true;
}
function a({ label: r, active: c = false, disabled: i = false, onClick: l, children: s }) {
  return t.jsxs(W, { children: [t.jsx(J, { asChild: true, children: t.jsx("button", { type: "button", "aria-label": r, disabled: i, onClick: () => l(), className: `inline-flex h-7 w-7 items-center justify-center rounded border text-gray-700 dark:text-odp-fg ${c ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/40" : "border-transparent hover:bg-gray-100 dark:hover:bg-odp-bgSoft"} disabled:opacity-40`, children: s }) }), t.jsx(K, { children: t.jsxs(X, { side: "top", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [r, t.jsx(Z, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Qe({ value: r, onChange: c, theme: i, showToolbar: l = true, onUploadImg: s }) {
  const j = n.useRef(c);
  j.current = c;
  const x = n.useRef(r);
  x.current = r;
  const h = n.useRef(r || ""), b = n.useRef(false), m = n.useRef(null), [g, A] = n.useState(() => R());
  n.useEffect(() => {
    const e = () => A(R());
    return window.addEventListener(L, e), () => window.removeEventListener(L, e);
  }, []);
  const C = n.useMemo(() => M({ placeholder: "\uCC44\uD305\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", profile: "composer", typographyRules: g }), []), o = z({ extensions: C, content: r || "", contentType: "markdown", immediatelyRender: false, editorProps: { attributes: { class: `haim-editor-prose prose dark:prose-invert max-w-none focus:outline-none min-h-[4rem] px-2.5 py-2 text-sm ${i === "dark" ? "haim-editor--dark" : ""}` }, handleScrollToSelection: (e) => ee(e) } }, [C]);
  n.useEffect(() => {
    o && o.commands.setHaimTypographyRules(g);
  }, [o, g]);
  const k = n.useCallback(() => {
    if (!o) return;
    const e = w(o);
    h.current = e, e !== x.current && (x.current = e, j.current(e));
  }, [o]);
  n.useEffect(() => {
    if (!o) return;
    const e = o.view.dom, u = () => {
      b.current = true;
    }, p = () => {
      b.current = false, k();
    };
    e.addEventListener("compositionstart", u), e.addEventListener("compositionend", p);
    const f = () => {
      b.current || (m.current && clearTimeout(m.current), m.current = setTimeout(() => {
        m.current = null, k();
      }, 300));
    };
    return o.on("update", f), () => {
      o.off("update", f), e.removeEventListener("compositionstart", u), e.removeEventListener("compositionend", p), m.current && clearTimeout(m.current);
    };
  }, [o, k]), n.useEffect(() => {
    if (!o) return;
    const e = r || "";
    if (e === h.current) return;
    if (w(o) === e) {
      h.current = e;
      return;
    }
    h.current = e, P(o);
    try {
      o.commands.setContent(e, { contentType: "markdown", emitUpdate: false });
    } catch {
    }
  }, [o, r]), n.useEffect(() => {
    if (!o || !s) return;
    const e = o.view.dom, u = (p) => {
      var _a;
      const f = (_a = p.clipboardData) == null ? void 0 : _a.items;
      if (!f) return;
      const v = [];
      for (const y of f) if (y.type.startsWith("image/")) {
        const E = y.getAsFile();
        E && v.push(E);
      }
      v.length && (p.preventDefault(), s(v, () => {
      }));
    };
    return e.addEventListener("paste", u), () => e.removeEventListener("paste", u);
  }, [o, s]);
  const B = N({ editor: o, selector: ({ editor: e }) => e ? { bold: e.isActive("bold"), italic: e.isActive("italic"), underline: e.isActive("underline"), strike: e.isActive("strike"), code: e.isActive("code"), bullet: e.isActive("bulletList"), ordered: e.isActive("orderedList"), task: e.isActive("taskList"), quote: e.isActive("blockquote"), link: e.isActive("link"), canUndo: e.can().undo(), canRedo: e.can().redo() } : null });
  if (!o) return t.jsx(H, { value: r, onChange: c, fillParent: true });
  const d = B;
  return t.jsxs("div", { className: `chat-composer-haim flex h-full min-h-0 w-full flex-col ${i === "dark" ? "haim-editor--dark" : ""}`, children: [l ? t.jsx(F, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs("div", { "data-composer-toolbar": "", className: "flex h-8 shrink-0 items-center gap-0.5 overflow-x-auto border-b border-slate-300 bg-slate-50 px-1 dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: [t.jsx(a, { label: "\uC2E4\uD589 \uCDE8\uC18C", disabled: !(d == null ? void 0 : d.canUndo), onClick: () => o.chain().focus().undo().run(), children: t.jsx(U, { size: 13 }) }), t.jsx(a, { label: "\uB2E4\uC2DC \uC2E4\uD589", disabled: !(d == null ? void 0 : d.canRedo), onClick: () => o.chain().focus().redo().run(), children: t.jsx(D, { size: 13 }) }), t.jsx("span", { className: "mx-0.5 h-3.5 w-px bg-slate-300 dark:bg-odp-borderStrong" }), t.jsx(a, { label: "\uAD75\uAC8C", active: !!(d == null ? void 0 : d.bold), onClick: () => o.chain().focus().toggleBold().run(), children: t.jsx(q, { size: 13 }) }), t.jsx(a, { label: "\uBC11\uC904", active: !!(d == null ? void 0 : d.underline), onClick: () => o.chain().focus().toggleUnderline().run(), children: t.jsx(O, { size: 13 }) }), t.jsx(a, { label: "\uAE30\uC6B8\uC784", active: !!(d == null ? void 0 : d.italic), onClick: () => o.chain().focus().toggleItalic().run(), children: t.jsx(G, { size: 13 }) }), t.jsx(a, { label: "\uCDE8\uC18C\uC120", active: !!(d == null ? void 0 : d.strike), onClick: () => o.chain().focus().toggleStrike().run(), children: t.jsx(I, { size: 13 }) }), t.jsx(a, { label: "\uC778\uC6A9", active: !!(d == null ? void 0 : d.quote), onClick: () => o.chain().focus().toggleBlockquote().run(), children: t.jsx(_, { size: 13 }) }), t.jsx(a, { label: "\uAE00\uBA38\uB9AC", active: !!(d == null ? void 0 : d.bullet), onClick: () => o.chain().focus().toggleBulletList().run(), children: t.jsx($, { size: 13 }) }), t.jsx(a, { label: "\uBC88\uD638 \uBAA9\uB85D", active: !!(d == null ? void 0 : d.ordered), onClick: () => o.chain().focus().toggleOrderedList().run(), children: t.jsx(Q, { size: 13 }) }), t.jsx(a, { label: "\uD560 \uC77C", active: !!(d == null ? void 0 : d.task), onClick: () => o.chain().focus().toggleTaskList().run(), children: t.jsx(V, { size: 13 }) }), t.jsx(a, { label: "\uC778\uB77C\uC778 \uCF54\uB4DC", active: !!(d == null ? void 0 : d.code), onClick: () => o.chain().focus().toggleCode().run(), children: t.jsx(T, { size: 13 }) }), t.jsx(a, { label: "\uCF54\uB4DC \uBE14\uB85D", onClick: () => o.chain().focus().toggleCodeBlock().run(), children: t.jsx(T, { size: 13, className: "opacity-70" }) }), t.jsx(a, { label: "\uB9C1\uD06C", active: !!(d == null ? void 0 : d.link), onClick: () => {
    const e = o.getAttributes("link").href, u = window.prompt("URL", e || "https://");
    if (u !== null) {
      if (u === "") {
        o.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      o.chain().focus().extendMarkRange("link").setLink({ href: u }).run();
    }
  }, children: t.jsx(Y, { size: 13 }) })] }) }) : null, t.jsx("div", { className: "chat-composer-haim-scroll relative min-h-0 flex-1 overflow-y-auto overscroll-contain [overflow-anchor:none]", children: t.jsx(S, { editor: o, className: "haim-editor-content min-h-full" }) })] });
}
export {
  Qe as default
};
