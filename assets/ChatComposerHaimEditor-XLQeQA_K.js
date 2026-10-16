import { r as o, j as e } from "./vendor-react-ChQ1w2We.js";
import { u as z, a as N, E as S } from "./vendor-tiptap-CEo_3qRU.js";
import { c as M, g as w, i as P } from "./style-D8DiM_mE.js";
import { C as H } from "./ChatWithMyselfPane-DXV2V1BA.js";
import { M as R, N as L } from "./index-DesdSF2E.js";
import { U, R as D, B as q, e as O, I as G, f as _, Q as $, g as I, h as Q, i as Y, j as A, k as F } from "./vendor-lucide-BB1m8XvN.js";
import { P as V, n as W, T as J, p as K, C as X, A as Z } from "./vendor-radix-BQ9XceqC.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-C3cP4Xc_.js";
import "./vendor-codemirror-CohftLwi.js";
import "./vendor-aws-DKtg11UV.js";
import "./vendor-motion-L8D9Iqni.js";
import "./index-CKoETpyT.js";
import "./Kbd-B19j6vi0.js";
import "./copyImageToClipboard-CKuwKuUE.js";
import "./bootSplash-Dmg87Il5.js";
import "./emojiShortcode-Dqx6Py2y.js";
import "./WikiImageSizeModal-UMyc6IWL.js";
import "./vendor-image-crop-DjbagF75.js";
import "./cropPadImage-BA8bMDl-.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-EdBrDdxS.js";
import "./styleResolve-D0L3f7_b.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./mdEditorSelectionWrap-Ce3ZFYGa.js";
import "./haimCodeTabSettings-BI7a8VYQ.js";
import "./codeBlockCommentTogglePlan-3lyEpRvG.js";
import "./haimCodeBlockLanguages-BStQPvla.js";
import "./lazyMermaid-DNlwk8Oz.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./wikiImageResolver-CSw6ITHK.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./ImageLightboxCopyButton-pqlGST_k.js";
import "./ChatImageBackgroundPicker-DpyuwDGg.js";
import "./appStatusBar-COMHAiNk.js";
import "./useDocumentTheme-TGVJJDCu.js";
import "./useWikiImageHydration-K_C7BqEn.js";
import "./useLazyMermaidRender-DGltcr6x.js";
import "./vendor-emoji-C0IzJRFE.js";
import "./emojiFrequent-mVz8d07Z.js";
import "./vendor-react-aria-CmxHUWrQ.js";
function i({ label: s, active: l = false, disabled: p = false, onClick: h, children: d }) {
  return e.jsxs(W, { children: [e.jsx(J, { asChild: true, children: e.jsx("button", { type: "button", "aria-label": s, disabled: p, onClick: () => h(), className: `inline-flex h-7 w-7 items-center justify-center rounded border text-gray-700 dark:text-odp-fg ${l ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/40" : "border-transparent hover:bg-gray-100 dark:hover:bg-odp-bgSoft"} disabled:opacity-40`, children: d }) }), e.jsx(K, { children: e.jsxs(X, { side: "top", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [s, e.jsx(Z, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Ie({ value: s, onChange: l, theme: p, showToolbar: h = true, onUploadImg: d }) {
  const j = o.useRef(l);
  j.current = l;
  const x = o.useRef(s);
  x.current = s;
  const f = o.useRef(s || ""), b = o.useRef(false), c = o.useRef(null), [k, B] = o.useState(() => R());
  o.useEffect(() => {
    const r = () => B(R());
    return window.addEventListener(L, r), () => window.removeEventListener(L, r);
  }, []);
  const C = o.useMemo(() => M({ placeholder: "\uCC44\uD305\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", profile: "composer", typographyRules: k }), []), t = z({ extensions: C, content: s || "", contentType: "markdown", immediatelyRender: false, editorProps: { attributes: { class: `haim-editor-prose prose dark:prose-invert max-w-none focus:outline-none min-h-[4rem] px-2.5 py-2 text-sm ${p === "dark" ? "haim-editor--dark" : ""}` } } }, [C]);
  o.useEffect(() => {
    t && t.commands.setHaimTypographyRules(k);
  }, [t, k]);
  const g = o.useCallback(() => {
    if (!t) return;
    const r = w(t);
    f.current = r, r !== x.current && (x.current = r, j.current(r));
  }, [t]);
  o.useEffect(() => {
    if (!t) return;
    const r = t.view.dom, a = () => {
      b.current = true;
    }, u = () => {
      b.current = false, g();
    };
    r.addEventListener("compositionstart", a), r.addEventListener("compositionend", u);
    const m = () => {
      b.current || (c.current && clearTimeout(c.current), c.current = setTimeout(() => {
        c.current = null, g();
      }, 300));
    };
    return t.on("update", m), () => {
      t.off("update", m), r.removeEventListener("compositionstart", a), r.removeEventListener("compositionend", u), c.current && clearTimeout(c.current);
    };
  }, [t, g]), o.useEffect(() => {
    if (!t) return;
    const r = s || "";
    if (r === f.current) return;
    if (w(t) === r) {
      f.current = r;
      return;
    }
    f.current = r, P(t), t.commands.setContent(r, { contentType: "markdown", emitUpdate: false });
  }, [t, s]), o.useEffect(() => {
    if (!t || !d) return;
    const r = t.view.dom, a = (u) => {
      var _a;
      const m = (_a = u.clipboardData) == null ? void 0 : _a.items;
      if (!m) return;
      const v = [];
      for (const y of m) if (y.type.startsWith("image/")) {
        const E = y.getAsFile();
        E && v.push(E);
      }
      v.length && (u.preventDefault(), d(v, () => {
      }));
    };
    return r.addEventListener("paste", a), () => r.removeEventListener("paste", a);
  }, [t, d]);
  const T = N({ editor: t, selector: ({ editor: r }) => r ? { bold: r.isActive("bold"), italic: r.isActive("italic"), underline: r.isActive("underline"), strike: r.isActive("strike"), code: r.isActive("code"), bullet: r.isActive("bulletList"), ordered: r.isActive("orderedList"), task: r.isActive("taskList"), quote: r.isActive("blockquote"), link: r.isActive("link"), canUndo: r.can().undo(), canRedo: r.can().redo() } : null });
  if (!t) return e.jsx(H, { value: s, onChange: l, fillParent: true });
  const n = T;
  return e.jsxs("div", { className: `chat-composer-haim flex h-full min-h-0 w-full flex-col ${p === "dark" ? "haim-editor--dark" : ""}`, children: [h ? e.jsx(V, { delayDuration: 250, skipDelayDuration: 0, children: e.jsxs("div", { "data-composer-toolbar": "", className: "flex h-8 shrink-0 items-center gap-0.5 overflow-x-auto border-b border-slate-300 bg-slate-50 px-1 dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: [e.jsx(i, { label: "\uC2E4\uD589 \uCDE8\uC18C", disabled: !(n == null ? void 0 : n.canUndo), onClick: () => t.chain().focus().undo().run(), children: e.jsx(U, { size: 13 }) }), e.jsx(i, { label: "\uB2E4\uC2DC \uC2E4\uD589", disabled: !(n == null ? void 0 : n.canRedo), onClick: () => t.chain().focus().redo().run(), children: e.jsx(D, { size: 13 }) }), e.jsx("span", { className: "mx-0.5 h-3.5 w-px bg-slate-300 dark:bg-odp-borderStrong" }), e.jsx(i, { label: "\uAD75\uAC8C", active: !!(n == null ? void 0 : n.bold), onClick: () => t.chain().focus().toggleBold().run(), children: e.jsx(q, { size: 13 }) }), e.jsx(i, { label: "\uBC11\uC904", active: !!(n == null ? void 0 : n.underline), onClick: () => t.chain().focus().toggleUnderline().run(), children: e.jsx(O, { size: 13 }) }), e.jsx(i, { label: "\uAE30\uC6B8\uC784", active: !!(n == null ? void 0 : n.italic), onClick: () => t.chain().focus().toggleItalic().run(), children: e.jsx(G, { size: 13 }) }), e.jsx(i, { label: "\uCDE8\uC18C\uC120", active: !!(n == null ? void 0 : n.strike), onClick: () => t.chain().focus().toggleStrike().run(), children: e.jsx(_, { size: 13 }) }), e.jsx(i, { label: "\uC778\uC6A9", active: !!(n == null ? void 0 : n.quote), onClick: () => t.chain().focus().toggleBlockquote().run(), children: e.jsx($, { size: 13 }) }), e.jsx(i, { label: "\uAE00\uBA38\uB9AC", active: !!(n == null ? void 0 : n.bullet), onClick: () => t.chain().focus().toggleBulletList().run(), children: e.jsx(I, { size: 13 }) }), e.jsx(i, { label: "\uBC88\uD638 \uBAA9\uB85D", active: !!(n == null ? void 0 : n.ordered), onClick: () => t.chain().focus().toggleOrderedList().run(), children: e.jsx(Q, { size: 13 }) }), e.jsx(i, { label: "\uD560 \uC77C", active: !!(n == null ? void 0 : n.task), onClick: () => t.chain().focus().toggleTaskList().run(), children: e.jsx(Y, { size: 13 }) }), e.jsx(i, { label: "\uC778\uB77C\uC778 \uCF54\uB4DC", active: !!(n == null ? void 0 : n.code), onClick: () => t.chain().focus().toggleCode().run(), children: e.jsx(A, { size: 13 }) }), e.jsx(i, { label: "\uCF54\uB4DC \uBE14\uB85D", onClick: () => t.chain().focus().toggleCodeBlock().run(), children: e.jsx(A, { size: 13, className: "opacity-70" }) }), e.jsx(i, { label: "\uB9C1\uD06C", active: !!(n == null ? void 0 : n.link), onClick: () => {
    const r = t.getAttributes("link").href, a = window.prompt("URL", r || "https://");
    if (a !== null) {
      if (a === "") {
        t.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      t.chain().focus().extendMarkRange("link").setLink({ href: a }).run();
    }
  }, children: e.jsx(F, { size: 13 }) })] }) }) : null, e.jsx("div", { className: "chat-composer-haim-scroll relative min-h-0 flex-1 overflow-y-auto overscroll-contain", children: e.jsx(S, { editor: t, className: "haim-editor-content min-h-full" }) })] });
}
export {
  Ie as default
};
