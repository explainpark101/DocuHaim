import { r as o, j as e } from "./vendor-react-BDjpSibw.js";
import { u as z, a as N, E as S } from "./vendor-tiptap-Dthoom2y.js";
import { c as P, g as y, i as M } from "./style-Chfkj2dp.js";
import { C as H } from "./ChatWithMyselfPane-D2RhMI-w.js";
import { P as R, Q as L } from "./index-BpNs1tUw.js";
import { U, R as D, B as q, c as O, I as G, d as Q, Q as _, e as $, f as I, g as Y, h as A, i as F } from "./vendor-lucide-CbEk5sea.js";
import { h as V, i as W, j as J, k as K, l as X, A as Z } from "./vendor-radix-DuLpLUUM.js";
import "./vendor-katex-NqpuB_gR.js";
import "./vendor-highlight-Cy0EGwO-.js";
import "./vendor-codemirror-D25dVEXW.js";
import "./vendor-aws-Cvd3RhZI.js";
import "./vendor-motion-Dw-WnPM7.js";
import "./index-De3wkM3r.js";
import "./Kbd-zJP-p1De.js";
import "./taskCheckboxStatus-DlXLsCJg.js";
import "./WikiImageSizeModal-BshgOECk.js";
import "./vendor-image-crop-BD82vq0Q.js";
import "./cropPadImage-B_yjUTte.js";
import "./pretextMeasure-CjJHEvjB.js";
import "./toHtml-03m-jm-p.js";
import "./styleResolve-n_EfM8bf.js";
import "./bootSplash-B8aCHT5v.js";
import "./core-DhEqZVGG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-markdown-it-BSFfF5B5.js";
import "./haimCodeBlockLanguages-C4u7NjrS.js";
import "./lazyMermaid-CFU1x6wk.js";
import "./mermaidTheme-Deyx0OD8.js";
import "./wikiImageResolver-O0N5FH4J.js";
import "./wikiImageSettings-Cji60Ojw.js";
import "./ChatImageBackgroundPicker-DUk_ijHn.js";
import "./appStatusBar-COMHAiNk.js";
import "./useDocumentTheme-D-EikLhE.js";
import "./useWikiImageHydration-BEaofKQU.js";
import "./useLazyMermaidRender-CMWw-qPT.js";
import "./vendor-emoji-CkoxFqjQ.js";
import "./emojiFrequent-CFB0dRnA.js";
import "./vendor-react-aria-Ca5SAAo0.js";
function i({ label: n, active: l = false, disabled: p = false, onClick: h, children: d }) {
  return e.jsxs(W, { children: [e.jsx(J, { asChild: true, children: e.jsx("button", { type: "button", "aria-label": n, disabled: p, onClick: () => h(), className: `inline-flex h-7 w-7 items-center justify-center rounded border text-gray-700 dark:text-odp-fg ${l ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/40" : "border-transparent hover:bg-gray-100 dark:hover:bg-odp-bgSoft"} disabled:opacity-40`, children: d }) }), e.jsx(K, { children: e.jsxs(X, { side: "top", sideOffset: 6, className: "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg", children: [n, e.jsx(Z, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function qe({ value: n, onChange: l, theme: p, showToolbar: h = true, onUploadImg: d }) {
  const j = o.useRef(l);
  j.current = l;
  const x = o.useRef(n);
  x.current = n;
  const f = o.useRef(n || ""), b = o.useRef(false), c = o.useRef(null), [k, B] = o.useState(() => R());
  o.useEffect(() => {
    const r = () => B(R());
    return window.addEventListener(L, r), () => window.removeEventListener(L, r);
  }, []);
  const C = o.useMemo(() => P({ placeholder: "\uCC44\uD305\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", profile: "composer", typographyRules: k }), []), t = z({ extensions: C, content: n || "", contentType: "markdown", immediatelyRender: false, editorProps: { attributes: { class: `haim-editor-prose prose dark:prose-invert max-w-none focus:outline-none min-h-[4rem] px-2.5 py-2 text-sm ${p === "dark" ? "haim-editor--dark" : ""}` } } }, [C]);
  o.useEffect(() => {
    t && t.commands.setHaimTypographyRules(k);
  }, [t, k]);
  const g = o.useCallback(() => {
    if (!t) return;
    const r = y(t);
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
    const r = n || "";
    if (r === f.current) return;
    if (y(t) === r) {
      f.current = r;
      return;
    }
    f.current = r, M(t), t.commands.setContent(r, { contentType: "markdown", emitUpdate: false });
  }, [t, n]), o.useEffect(() => {
    if (!t || !d) return;
    const r = t.view.dom, a = (u) => {
      var _a;
      const m = (_a = u.clipboardData) == null ? void 0 : _a.items;
      if (!m) return;
      const v = [];
      for (const E of m) if (E.type.startsWith("image/")) {
        const w = E.getAsFile();
        w && v.push(w);
      }
      v.length && (u.preventDefault(), d(v, () => {
      }));
    };
    return r.addEventListener("paste", a), () => r.removeEventListener("paste", a);
  }, [t, d]);
  const T = N({ editor: t, selector: ({ editor: r }) => r ? { bold: r.isActive("bold"), italic: r.isActive("italic"), underline: r.isActive("underline"), strike: r.isActive("strike"), code: r.isActive("code"), bullet: r.isActive("bulletList"), ordered: r.isActive("orderedList"), task: r.isActive("taskList"), quote: r.isActive("blockquote"), link: r.isActive("link"), canUndo: r.can().undo(), canRedo: r.can().redo() } : null });
  if (!t) return e.jsx(H, { value: n, onChange: l, fillParent: true });
  const s = T;
  return e.jsxs("div", { className: `chat-composer-haim flex h-full min-h-0 w-full flex-col ${p === "dark" ? "haim-editor--dark" : ""}`, children: [h ? e.jsx(V, { delayDuration: 250, skipDelayDuration: 0, children: e.jsxs("div", { "data-composer-toolbar": "", className: "flex h-8 shrink-0 items-center gap-0.5 overflow-x-auto border-b border-slate-300 bg-slate-50 px-1 dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: [e.jsx(i, { label: "\uC2E4\uD589 \uCDE8\uC18C", disabled: !(s == null ? void 0 : s.canUndo), onClick: () => t.chain().focus().undo().run(), children: e.jsx(U, { size: 13 }) }), e.jsx(i, { label: "\uB2E4\uC2DC \uC2E4\uD589", disabled: !(s == null ? void 0 : s.canRedo), onClick: () => t.chain().focus().redo().run(), children: e.jsx(D, { size: 13 }) }), e.jsx("span", { className: "mx-0.5 h-3.5 w-px bg-slate-300 dark:bg-odp-borderStrong" }), e.jsx(i, { label: "\uAD75\uAC8C", active: !!(s == null ? void 0 : s.bold), onClick: () => t.chain().focus().toggleBold().run(), children: e.jsx(q, { size: 13 }) }), e.jsx(i, { label: "\uBC11\uC904", active: !!(s == null ? void 0 : s.underline), onClick: () => t.chain().focus().toggleUnderline().run(), children: e.jsx(O, { size: 13 }) }), e.jsx(i, { label: "\uAE30\uC6B8\uC784", active: !!(s == null ? void 0 : s.italic), onClick: () => t.chain().focus().toggleItalic().run(), children: e.jsx(G, { size: 13 }) }), e.jsx(i, { label: "\uCDE8\uC18C\uC120", active: !!(s == null ? void 0 : s.strike), onClick: () => t.chain().focus().toggleStrike().run(), children: e.jsx(Q, { size: 13 }) }), e.jsx(i, { label: "\uC778\uC6A9", active: !!(s == null ? void 0 : s.quote), onClick: () => t.chain().focus().toggleBlockquote().run(), children: e.jsx(_, { size: 13 }) }), e.jsx(i, { label: "\uAE00\uBA38\uB9AC", active: !!(s == null ? void 0 : s.bullet), onClick: () => t.chain().focus().toggleBulletList().run(), children: e.jsx($, { size: 13 }) }), e.jsx(i, { label: "\uBC88\uD638 \uBAA9\uB85D", active: !!(s == null ? void 0 : s.ordered), onClick: () => t.chain().focus().toggleOrderedList().run(), children: e.jsx(I, { size: 13 }) }), e.jsx(i, { label: "\uD560 \uC77C", active: !!(s == null ? void 0 : s.task), onClick: () => t.chain().focus().toggleTaskList().run(), children: e.jsx(Y, { size: 13 }) }), e.jsx(i, { label: "\uC778\uB77C\uC778 \uCF54\uB4DC", active: !!(s == null ? void 0 : s.code), onClick: () => t.chain().focus().toggleCode().run(), children: e.jsx(A, { size: 13 }) }), e.jsx(i, { label: "\uCF54\uB4DC \uBE14\uB85D", onClick: () => t.chain().focus().toggleCodeBlock().run(), children: e.jsx(A, { size: 13, className: "opacity-70" }) }), e.jsx(i, { label: "\uB9C1\uD06C", active: !!(s == null ? void 0 : s.link), onClick: () => {
    const r = t.getAttributes("link").href, a = window.prompt("URL", r || "https://");
    if (a !== null) {
      if (a === "") {
        t.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      t.chain().focus().extendMarkRange("link").setLink({ href: a }).run();
    }
  }, children: e.jsx(F, { size: 13 }) })] }) }) : null, e.jsx("div", { className: "min-h-0 flex-1 overflow-hidden", children: e.jsx(S, { editor: t, className: "h-full" }) })] });
}
export {
  qe as default
};
