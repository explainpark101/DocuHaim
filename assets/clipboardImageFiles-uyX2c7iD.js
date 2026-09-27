var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as u, j as n, c as Oe } from "./vendor-react-BDjpSibw.js";
import { cJ as q, cK as He, ae as _, cL as $e, cM as X, I as Y, cN as Ue, cO as Ge, cP as Ve, cQ as Z, c as We, n as R, C as J, cR as Q, cS as ee, cT as qe, cU as Xe, aI as Ye, cV as Ze, cW as Je, cX as Qe, cY as et, cZ as tt, c_ as rt, c$ as ot } from "./index-Bi820a2m.js";
import { k as nt, y as H, X as be, an as at, L as st } from "./vendor-lucide-DgWK5x8G.js";
import { h as dt, b as D, d as B, y as lt, z as it, B as ct, D as ft, E as ut, G as mt, H as gt, K as ht, Z as xt, M as pt, S as bt, g as yt, i as te, j as re, k as oe, l as ne, A as ae } from "./vendor-radix-qpbG9kXl.js";
import { N as vt } from "./WikiImageSizeModal-CqFylg4e.js";
import { t as kt, O as St } from "./index-CUaeQqoG.js";
import { C as $, g as ye, E as U, S as ve, D as se, W as jt, G as ke, I as A, J as j, K as Se, L as G, V as je, M as Ne, N as Nt, y as wt, O as Ct, P as Et, Q as Mt } from "./vendor-codemirror-CmNIsAMQ.js";
import { m as we } from "./appMarkdownItPlugins-BRP-7WaU.js";
import { a as V } from "./vendor-motion-Djo_xQxQ.js";
import { C as It } from "./TableEditModal-Ck_3uQ1m.js";
const Ft = [{ value: "selection", title: "\uC120\uD0DD \uC601\uC5ED", description: "\uD604\uC7AC \uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uB9CC \uBCC0\uACBD" }, { value: "document", title: "\uC804\uCCB4 \uBB38\uC11C", description: "\uBB38\uC11C \uC804\uCCB4 heading\uC744 \uBCC0\uACBD" }], At = [{ value: "flat", title: "1. \uD615\uC2DD", description: "\uCD5C\uB300 heading\uC744 \uD55C \uC790\uB9AC \uBC88\uD638\uB85C \uC2DC\uC791" }, { value: "nested", title: "2.1. \uD615\uC2DD", description: "heading \uC218\uC900\uB9CC\uD07C \uBC88\uD638\uB97C \uBD99\uC784" }], Pt = [{ value: 1, title: "1\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 1. / 1.1. \u2026" }, { value: 2, title: "2\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 2. / 2.1. \u2026" }], Lt = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), _t = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", de = "z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function kr({ isOpen: e, markdown: t, selectedMarkdown: r = "", onClose: o, onApply: a }) {
  const s = r.length > 0, [i, f] = u.useState("document"), [c, x] = u.useState(1), [h, y] = u.useState(false), [p, w] = u.useState("nested"), [b, v] = u.useState(1), k = i === "selection" ? r : t;
  u.useEffect(() => {
    if (!e) return;
    const l = s ? "selection" : "document";
    f(l), x(q(l === "selection" ? r : t)), y(false), w("nested"), v(1);
  }, [e, t, r, s]), u.useEffect(() => {
    if (!e) return;
    const l = (m) => {
      const C = m;
      return (C == null ? void 0 : C.closest) ? !!C.closest('.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]') : false;
    }, d = () => {
      const m = document.activeElement;
      m && l(m) && typeof m.blur == "function" && m.blur();
    };
    d();
    const g = (m) => {
      if (m.metaKey || m.ctrlKey || m.altKey) return;
      const C = m.key;
      if (C >= "1" && C <= "9") {
        const W = Number(C);
        X(W) && (m.preventDefault(), m.stopPropagation(), m.stopImmediatePropagation(), x(W));
        return;
      }
      m.key === "Escape" || m.key === "Enter" || l(m.target) && (m.preventDefault(), m.stopPropagation(), m.stopImmediatePropagation(), d());
    };
    return window.addEventListener("keydown", g, true), () => window.removeEventListener("keydown", g, true);
  }, [e]);
  const S = u.useMemo(() => He(k, c, { maxLevel: Z, renumberOutline: h, outlineStyle: p, outlineStart: b }), [k, c, h, p, b]), P = (l) => {
    if (l !== "selection" && l !== "document" || l === "selection" && !s) return;
    f(l), x(q(l === "selection" ? r : t));
  }, M = () => {
    if (!S.sourceMax) return;
    const l = Ve(k, c, { maxLevel: Z, renumberOutline: h, outlineStyle: p, outlineStart: b });
    l !== k && a(l, i), o();
  };
  return n.jsx(_, { isOpen: e, onClose: o, onConfirm: M, contentClassName: "max-w-3xl", children: n.jsx(dt, { delayDuration: 250, skipDelayDuration: 0, children: n.jsxs("div", { className: "flex min-h-0 flex-1 flex-col p-6", children: [n.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uCD5C\uB300 heading \uBCC0\uACBD" }), n.jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-odp-muted", children: ["\uAC10\uC9C0\uB41C \uCD5C\uB300 heading\uC744 \uC120\uD0DD\uD55C \uB2E8\uACC4\uB85C \uBC14\uAFB8\uACE0, \uD558\uC704 heading\uB3C4 \uAC19\uC740 \uAC04\uACA9\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.", " ", "\uC22B\uC790 \uD0A4 1\u20139\uB85C \uCD5C\uB300 heading\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), n.jsxs("div", { className: "mt-4", children: [n.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC801\uC6A9 \uBC94\uC704" }), n.jsx(D, { className: "flex items-center gap-2", value: i, onValueChange: P, "aria-label": "\uCD5C\uB300 heading \uC801\uC6A9 \uBC94\uC704", children: Ft.map((l) => {
    const d = i === l.value, g = l.value === "selection" && !s;
    return n.jsx(B, { value: l.value, disabled: g, className: ["flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", d ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: n.jsxs("div", { className: d ? "" : "opacity-50", children: [n.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: l.title }), n.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: l.value === "selection" && !s ? "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" : l.description })] }) }, l.value);
  }) })] }), n.jsxs("div", { className: "mt-4", children: [n.jsx("label", { htmlFor: "editor-heading-max", className: "mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading" }), n.jsxs(lt, { value: String(c), onValueChange: (l) => {
    const d = Number(l);
    X(d) && x(d);
  }, children: [n.jsxs(it, { id: "editor-heading-max", "aria-label": "\uCD5C\uB300 heading", className: "inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [n.jsx(ct, {}), n.jsx(ft, { className: "text-gray-500", children: n.jsx(nt, { size: 14 }) })] }), n.jsx(ut, { children: n.jsx(mt, { className: "z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: n.jsx(gt, { className: "p-1", children: $e.map((l) => n.jsxs(ht, { value: String(l), className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [n.jsx(xt, { className: "absolute left-1.5 inline-flex items-center", children: n.jsx(H, { size: 12 }) }), n.jsx(pt, { children: `h${l}` })] }, l)) }) }) })] })] }), n.jsxs("div", { className: "mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft", children: [n.jsxs("div", { className: "flex items-center justify-between gap-3", children: [n.jsxs("div", { className: "min-w-0", children: [n.jsx("div", { className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: "outline \uBC88\uD638 \uB9DE\uCD94\uAE30" }), n.jsx("p", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC55E\uC758 1. / 2.1. \uAC19\uC740 \uBC88\uD638\uB97C \uD604\uC7AC heading \uC218\uC900\uC5D0 \uB9DE\uAC8C \uB2E4\uC2DC \uBD99\uC785\uB2C8\uB2E4." })] }), n.jsx(bt, { className: Lt(h), checked: h, onCheckedChange: y, "aria-label": "outline \uBC88\uD638 \uB9DE\uCD94\uAE30", children: n.jsx(yt, { className: _t }) })] }), h ? n.jsxs("div", { className: "mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60", children: [n.jsxs("div", { children: [n.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD" }), n.jsx(D, { className: "flex items-center gap-2", value: p, onValueChange: (l) => {
    (l === "flat" || l === "nested") && w(l);
  }, "aria-label": "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD", children: At.map((l) => {
    const d = p === l.value;
    return n.jsx(B, { value: l.value, className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", d ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: n.jsxs("div", { className: d ? "" : "opacity-50", children: [n.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: l.title }), n.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: l.description })] }) }, l.value);
  }) })] }), n.jsxs("div", { children: [n.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), n.jsx(D, { className: "flex items-center gap-2", value: String(b), onValueChange: (l) => {
    l === "1" && v(1), l === "2" && v(2);
  }, "aria-label": "\uCD5C\uB300 heading \uC2DC\uC791 \uBC88\uD638", children: Pt.map((l) => {
    const d = b === l.value;
    return n.jsx(B, { value: String(l.value), className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", d ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: n.jsxs("div", { className: d ? "" : "opacity-50", children: [n.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: l.title }), n.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: l.description })] }) }, l.value);
  }) })] })] }) : null] }), n.jsx("div", { className: "mt-4 min-h-0", children: S.rows.length ? n.jsx("div", { className: "max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-odp-borderSoft", children: n.jsxs("table", { className: "w-full table-fixed border-collapse text-left text-sm", children: [n.jsx("thead", { className: "sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft", children: n.jsxs("tr", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [n.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874 \uC81C\uBAA9" }), n.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD\uB420 \uC81C\uBAA9" }), n.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874" }), n.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD" })] }) }), n.jsx("tbody", { children: S.rows.map((l, d) => n.jsxs("tr", { className: "border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60", children: [n.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: n.jsxs(te, { children: [n.jsx(re, { asChild: true, children: n.jsx("span", { className: "block truncate", children: l.text || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), n.jsx(oe, { children: n.jsxs(ne, { side: "top", sideOffset: 6, className: de, children: [l.text || "(\uC81C\uBAA9 \uC5C6\uC74C)", n.jsx(ae, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), n.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: n.jsxs(te, { children: [n.jsx(re, { asChild: true, children: n.jsx("span", { className: "block truncate", children: l.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), n.jsx(oe, { children: n.jsxs(ne, { side: "top", sideOffset: 6, className: de, children: [l.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)", n.jsx(ae, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), n.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted", children: ["h", l.from] }), n.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: ["h", l.to] })] }, `${l.from}-${d}-${l.text}`)) })] }) }) : n.jsx("p", { className: "rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted", children: i === "selection" ? "\uC120\uD0DD \uC601\uC5ED\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBB38\uC11C\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) }), n.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [n.jsxs(Y, { type: "button", variant: "secondary", size: "md", onClick: o, children: [n.jsx(Ue, { size: 16 }), "\uCDE8\uC18C"] }), n.jsxs(Y, { type: "button", variant: "primary", size: "md", onClick: M, disabled: !S.sourceMax, children: [n.jsx(Ge, { size: 16 }), "\uC801\uC6A9"] })] })] }) }) });
}
function Sr({ isOpen: e, onClose: t, onConfirm: r }) {
  const [o, a] = u.useState(""), [s, i] = u.useState(""), [f, c] = u.useState("");
  u.useEffect(() => {
    e && (a(""), i(""), c(""));
  }, [e]);
  const x = () => {
    const h = s.trim();
    if (!h) {
      c("\uC774\uBBF8\uC9C0 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    r({ desc: o.trim(), url: h }), t();
  };
  return n.jsx(_, { isOpen: e, onClose: t, onConfirm: x, ignoreEnterInFields: true, children: n.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [n.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C" }), n.jsxs("label", { className: "block", children: [n.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC124\uBA85 (alt)" }), n.jsx("input", { type: "text", value: o, onChange: (h) => a(h.target.value), placeholder: "\uC120\uD0DD", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), n.jsxs("label", { className: "block", children: [n.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL" }), n.jsx("input", { type: "text", value: s, onChange: (h) => i(h.target.value), placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), f ? n.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: f }) : null, n.jsxs("div", { className: "flex justify-end gap-2", children: [n.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [n.jsx(be, { size: 16 }), "\uCDE8\uC18C"] }), n.jsxs("button", { type: "button", onClick: x, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [n.jsx(H, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function jr({ isOpen: e, file: t, onClose: r, onConfirm: o }) {
  const [a, s] = u.useState("");
  return u.useEffect(() => {
    if (!e || !t) {
      s("");
      return;
    }
    const i = URL.createObjectURL(t);
    return s(i), () => {
      URL.revokeObjectURL(i);
    };
  }, [e, t]), n.jsx(_, { isOpen: e && !!t, onClose: r, contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: a ? n.jsx(vt, { imageSrc: a, ...(t == null ? void 0 : t.name) ? { fileName: t.name } : {}, onCancel: r, onConfirm: o }) : null });
}
const Rt = 8192, Dt = 16;
function le(e) {
  return Math.min(Rt, Math.max(Dt, Math.round(e)));
}
function Bt(e) {
  const t = (e || "#ffffff").trim();
  return /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(t) ? t : "#ffffff";
}
async function ie(e) {
  const t = le(e.width), r = le(e.height), o = Bt(e.background ?? "#ffffff"), a = document.createElement("canvas");
  a.width = t, a.height = r;
  const s = a.getContext("2d");
  if (!s) throw new Error("Canvas 2D unavailable");
  s.clearRect(0, 0, t, r), s.fillStyle = o, s.fillRect(0, 0, t, r);
  const i = await new Promise((f) => {
    a.toBlob((c) => f(c), "image/png");
  });
  if (!i) throw new Error("Failed to encode whiteboard PNG");
  return new File([i], `whiteboard-${t}x${r}.png`, { type: "image/png" });
}
const Tt = [{ id: "hd", label: "1280\xD7720", width: 1280, height: 720 }, { id: "fhd", label: "1920\xD71080", width: 1920, height: 1080 }, { id: "sq", label: "1080\xD71080", width: 1080, height: 1080 }, { id: "a4", label: "A4~", width: 794, height: 1123 }], Kt = [{ id: "white", label: "\uD770\uC0C9", value: "#ffffffff" }, { id: "paper", label: "\uD06C\uB9BC", value: "#fff8e7ff" }, { id: "gray", label: "\uD68C\uC0C9", value: "#f3f4f6ff" }, { id: "black", label: "\uAC80\uC815", value: "#111827ff" }, { id: "clear", label: "\uD22C\uBA85", value: "#00000000" }];
function Nr({ isOpen: e, onClose: t, onConfirm: r, disabled: o = false }) {
  const [a, s] = u.useState(1920), [i, f] = u.useState(1080), [c, x] = u.useState("#ffffffff"), [h, y] = u.useState(""), [p, w] = u.useState(false), [b, v] = u.useState("");
  u.useEffect(() => {
    e && (s(1920), f(1080), x("#ffffffff"), y(""), w(false));
  }, [e]);
  const k = We(R(c) || "#ffffffff");
  u.useEffect(() => {
    if (!e) {
      v("");
      return;
    }
    let d = false, g = "";
    return (async () => {
      try {
        const m = await ie({ width: a, height: i, background: c });
        if (d) return;
        g = URL.createObjectURL(m), v(g);
      } catch {
        d || v("");
      }
    })(), () => {
      d = true, g && URL.revokeObjectURL(g);
    };
  }, [e, a, i, c]);
  const S = u.useMemo(() => {
    const g = Math.min(1, 220 / Math.max(a, i, 1));
    return { width: Math.max(24, Math.round(a * g)), height: Math.max(24, Math.round(i * g)) };
  }, [a, i]), P = async () => {
    if (!(o || p)) {
      if (a < 16 || i < 16) {
        y("\uD06C\uAE30\uB294 16px \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.");
        return;
      }
      w(true), y("");
      try {
        const d = await ie({ width: a, height: i, background: c });
        await r(d), t();
      } catch (d) {
        y(d instanceof Error ? d.message : "\uD654\uC774\uD2B8\uBCF4\uB4DC\uB97C \uB123\uB294 \uB370 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        w(false);
      }
    }
  }, M = (d) => {
    d.key === "Enter" && (!(d.metaKey || d.ctrlKey) || d.altKey || d.shiftKey || d.nativeEvent.isComposing || d.keyCode === 229 || (d.preventDefault(), d.stopPropagation(), P()));
  }, l = p || o;
  return n.jsx(_, { isOpen: e, onClose: t, ignoreEnterInFields: true, children: n.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [n.jsxs("div", { className: "flex items-center gap-2", children: [n.jsx(at, { size: 20, className: "text-gray-700 dark:text-odp-fgStrong", "aria-hidden": true }), n.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uB9CC\uB4E4\uAE30" })] }), n.jsxs("p", { className: "text-xs leading-5 text-gray-500 dark:text-odp-muted", children: ["\uBE48 \uCE94\uBC84\uC2A4 PNG\uB97C \uB9CC\uB4E4\uC5B4 \uB178\uD2B8\uC5D0", " ", n.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "![[path]]" }), " ", "\uB85C \uB123\uC740 \uB4A4, \uD06C\uAC8C \uBCF4\uAE30(\uB354\uBE14\uD074\uB9AD)\uC5D0\uC11C \uBC14\uB85C \uADF8\uB9B4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), n.jsx("div", { className: "flex flex-wrap gap-1.5", children: Tt.map((d) => n.jsx("button", { type: "button", disabled: l, className: `rounded-md border px-2 py-1 text-[11px] ${a === d.width && i === d.height ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200" : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"}`, onClick: () => {
    s(d.width), f(d.height);
  }, children: d.label }, d.id)) }), n.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [n.jsxs("label", { className: "block", children: [n.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uB108\uBE44 (px)" }), n.jsx("input", { type: "number", min: 16, max: 8192, value: a, disabled: l, onChange: (d) => s(Number(d.target.value) || 16), onKeyDown: M, className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), n.jsxs("label", { className: "block", children: [n.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uB192\uC774 (px)" }), n.jsx("input", { type: "number", min: 16, max: 8192, value: i, disabled: l, onChange: (d) => f(Number(d.target.value) || 16), onKeyDown: M, className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] })] }), n.jsxs("div", { className: "flex flex-col gap-2", children: [n.jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uBC30\uACBD\uC0C9" }), n.jsx("div", { className: "flex flex-wrap gap-1.5", children: Kt.map((d) => n.jsxs("button", { type: "button", disabled: l, "aria-label": d.label, className: `inline-flex h-8 items-center gap-1.5 rounded-md border px-2 text-[11px] ${c.toLowerCase() === d.value ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/40" : "border-gray-300 dark:border-odp-borderStrong"}`, onClick: () => x(d.value), children: [n.jsx("span", { className: "inline-block h-4 w-4 overflow-hidden rounded border border-black/10", style: J, children: n.jsx("span", { className: "block h-full w-full", style: { backgroundColor: d.value } }) }), d.label] }, d.id)) }), n.jsxs("div", { className: "rounded-md border border-gray-200 p-3 dark:border-odp-borderStrong", children: [n.jsx("div", { className: "[&_.react-colorful]:h-36 [&_.react-colorful]:w-full", children: n.jsx(kt, { color: k, onChange: (d) => {
    const g = R(d.startsWith("#") ? d : `#${d}`);
    g && x(g);
  } }) }), n.jsx(St, { alpha: true, prefixed: true, color: k, onChange: (d) => {
    const g = R(d.startsWith("#") ? d : `#${d}`);
    g && x(g);
  }, className: "mt-2 w-full rounded border border-gray-300 bg-white px-2 py-1.5 font-mono text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] })] }), n.jsxs("div", { className: "flex flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 p-4 dark:border-odp-borderStrong", style: J, children: [b ? n.jsx("img", { src: b, alt: "\uD654\uC774\uD2B8\uBCF4\uB4DC \uBBF8\uB9AC\uBCF4\uAE30", style: { width: S.width, height: S.height }, className: "object-contain shadow-sm" }) : n.jsx("div", { className: "flex h-28 w-40 items-center justify-center text-xs text-gray-400", children: "\uBBF8\uB9AC\uBCF4\uAE30" }), n.jsxs("span", { className: "text-[10px] text-gray-500 dark:text-odp-muted", children: [a, " \xD7 ", i, "px"] })] }), h ? n.jsx("p", { className: "text-xs text-red-600 dark:text-red-400", children: h }) : null, n.jsxs("div", { className: "flex justify-end gap-2", children: [n.jsxs("button", { type: "button", onClick: t, disabled: p, className: "inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft", children: [n.jsx(be, { size: 14, "aria-hidden": true }), "\uCDE8\uC18C"] }), n.jsxs("button", { type: "button", onClick: () => {
    P();
  }, disabled: l, className: "inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50", children: [p ? n.jsx(st, { size: 14, className: "animate-spin", "aria-hidden": true }) : n.jsx(H, { size: 14, "aria-hidden": true }), "\uC0BD\uC785"] })] })] }) });
}
function wr() {
  const [e, t] = u.useState(Q);
  u.useEffect(() => {
    const o = () => t(Q());
    return window.addEventListener(ee, o), () => {
      window.removeEventListener(ee, o);
    };
  }, []);
  const r = u.useCallback((o) => {
    t((a) => {
      const s = typeof o == "function" ? o(a) : !!o;
      return qe(s), s;
    });
  }, []);
  return [e, r];
}
const zt = 48, ce = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi, Ce = ve.define(), Ee = ve.define(), Me = new $();
function Ot(e) {
  const t = [];
  ce.lastIndex = 0;
  let r;
  for (; (r = ce.exec(e)) !== null; ) {
    const o = r[1] ?? "image", a = r[2] ?? "";
    if (a.length < zt) continue;
    const s = r[0], i = s.length - a.length, f = r.index + i;
    t.push({ from: f, to: r.index + s.length, mime: o });
  }
  return t;
}
function Ht(e, t) {
  const r = Math.round(t * 3 / 4), o = r >= 1024 * 1024 ? `${(r / (1024 * 1024)).toFixed(1)}MB` : r >= 1024 ? `${Math.max(1, Math.round(r / 1024))}KB` : `${r}B`;
  return `\u2026${e} ${o}\u2026`;
}
class $t extends jt {
  constructor(t, r, o) {
    super(), this.label = t, this.from = r, this.to = o;
  }
  toDOM(t) {
    const r = document.createElement("span");
    return r.textContent = this.label, r.className = "cm-base64-image-fold", r.title = "Click to expand base64 image data", r.addEventListener("mousedown", (o) => {
      o.preventDefault(), o.stopPropagation(), t.dispatch({ selection: { anchor: this.from }, effects: Ce.of({ from: this.from, to: this.to }) }), t.focus();
    }), r.addEventListener("click", (o) => {
      o.preventDefault();
    }), r;
  }
  ignoreEvent() {
    return false;
  }
  eq(t) {
    return this.label === t.label && this.from === t.from && this.to === t.to;
  }
}
function Ut(e, t, r) {
  return e.some((o) => o.from === t && o.to === r);
}
function fe(e, t) {
  const r = [], o = [];
  for (let a = 1; a <= e.doc.lines; a += 1) {
    const s = e.doc.line(a);
    for (const i of Ot(s.text)) {
      const f = s.from + i.from, c = s.from + i.to;
      if (Ut(t, f, c)) {
        o.push({ from: f, to: c });
        continue;
      }
      r.push(se.replace({ widget: new $t(Ht(i.mime, c - f), f, c) }).range(f, c));
    }
  }
  return { deco: se.set(r, true), expanded: o };
}
const Ie = ye.define({ create(e) {
  return fe(e, []);
}, update(e, t) {
  let r = e.expanded;
  t.docChanged && r.length && (r = r.map(({ from: a, to: s }) => ({ from: t.changes.mapPos(a, 1), to: t.changes.mapPos(s, -1) })).filter(({ from: a, to: s }) => a < s));
  let o = r !== e.expanded;
  for (const a of t.effects) a.is(Ce) ? (r = [{ from: a.value.from, to: a.value.to }], o = true) : a.is(Ee) && r.length > 0 && (r = [], o = true);
  return t.docChanged || o ? fe(t.state, r) : e;
}, provide: (e) => U.decorations.from(e, (t) => t.deco) }), Gt = U.domEventHandlers({ mousedown(e, t) {
  const r = t.state.field(Ie, false);
  if (!r || r.expanded.length === 0) return false;
  const o = e.target;
  if (!(o instanceof Node) || !t.dom.contains(o)) return false;
  const a = t.posAtDOM(o, 0);
  return a !== -1 && r.expanded.some(({ from: s, to: i }) => a >= s && a <= i) || t.dispatch({ effects: Ee.of(null) }), false;
} });
function Fe() {
  return [Ie, Gt];
}
function Cr(e) {
  return Me.of(e ? Fe() : []);
}
function Er(e, t) {
  if (e) try {
    e.dispatch({ effects: Me.reconfigure(t ? Fe() : []) });
  } catch {
  }
}
const Ae = new $();
function Vt(e, t, r) {
  let o = false;
  return Ne(e).between(t, r, () => {
    o = true;
  }), o;
}
function Wt(e) {
  const t = [], r = e.doc.toString();
  return G(e).iterate({ enter(o) {
    if (o.name !== "FencedCode") return;
    const a = we(r, o.from, o.to);
    a && t.push(a);
  } }), t;
}
function Pe(e, t, r) {
  return e.some((o) => o.from === t && o.to === r);
}
const Le = ye.define({ create() {
  return [];
}, update(e, t) {
  let r = e;
  t.docChanged && r.length && (r = r.map(({ from: a, to: s }) => ({ from: t.changes.mapPos(a, 1), to: t.changes.mapPos(s, -1) })).filter(({ from: a, to: s }) => a < s));
  let o = r !== e;
  for (const a of t.effects) if (a.is(A)) Pe(r, a.value.from, a.value.to) || (r = [...r, a.value], o = true);
  else if (a.is(j)) {
    const s = r.filter((i) => i.from !== a.value.from || i.to !== a.value.to);
    s.length !== r.length && (r = s, o = true);
  }
  return o ? r : e;
} });
function ue(e) {
  const t = e.state.field(Le), r = [];
  for (const o of Wt(e.state)) Pe(t, o.from, o.to) || Vt(e.state, o.from, o.to) || r.push(j.of(o));
  r.length > 0 && e.dispatch({ effects: r });
}
const qt = je.fromClass(class {
  constructor(e) {
    ue(e);
  }
  update(e) {
    e.docChanged && ue(e.view);
  }
}), Xt = Se.of((e, t) => {
  const r = e.doc.toString();
  let o = null;
  return G(e).iterate({ enter(a) {
    if (a.name !== "FencedCode" || e.doc.lineAt(a.from).from !== t) return;
    const i = we(r, a.from, a.to);
    if (i) return o = i, false;
  } }), o;
});
function _e() {
  return [Le, ke(), Xt, qt];
}
function Mr(e) {
  return Ae.of(e ? _e() : []);
}
function Ir(e, t) {
  if (e) try {
    e.dispatch({ effects: Ae.reconfigure(t ? _e() : []) });
  } catch {
  }
}
const Re = new Ye("s3haim-note-cover-fold");
Re.version(1).stores({ folds: "key, updatedAt" });
const De = Re.folds;
function Yt(e, t) {
  return `cover-fold:${Xe(e, t)}`;
}
function Fr(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Yt(e.type, e.id);
}
async function Zt(e) {
  if (!e) return null;
  const t = await De.get(e);
  return !t || typeof t.collapsed != "boolean" ? null : t.collapsed;
}
async function Jt(e, t) {
  e && await De.put({ key: e, collapsed: !!t, updatedAt: Date.now() });
}
function E(e) {
  const t = Math.min(e.length, 2e6);
  return Ze(e.sliceString(0, t));
}
function N(e) {
  const t = E(e.doc);
  if (!t) return null;
  const r = e.doc.lineAt(t.from);
  return r.to >= t.to ? null : { from: r.to, to: t.to };
}
function I(e, t) {
  let r = false;
  return Ne(e).between(t.from, t.to, () => {
    r = true;
  }), r;
}
function Qt(e, t) {
  return e.from === t.from && e.to === t.to;
}
function er(e, t) {
  const r = e.doc.lineAt(t);
  let o = false;
  return G(e).iterate({ from: r.from, to: Math.min(r.to, r.from + 1), enter(a) {
    const s = a.type.name;
    if (s.startsWith("ATXHeading") || s.startsWith("SetextHeading")) return o = true, false;
  } }), o;
}
function T(e, t) {
  const r = E(e.doc);
  if (r) {
    const s = e.doc.lineAt(r.from);
    if (t === s.from) {
      const i = N(e);
      if (i) return { ...i, kind: "cover" };
    }
    if (t >= r.from && t < r.to) return null;
  }
  if (!er(e, t)) return null;
  const o = e.doc.lineAt(t), a = Mt(e, o.from, o.to);
  return !a || a.from >= a.to ? null : { ...a, kind: "heading" };
}
const F = Et.define({ combine: (e) => e[e.length - 1] ?? null }), Be = new $();
function tr(e) {
  return Be.of(F.of(e));
}
function Ar(e, t) {
  e.dispatch({ effects: Be.reconfigure(F.of(t)) });
}
function rr(e, t) {
  const r = document.createElement("button");
  r.type = "button", r.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${t}`;
  const o = t === "cover" ? e ? "\uD45C\uC9C0 \uC811\uAE30" : "\uD45C\uC9C0 \uD3BC\uCE58\uAE30" : e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30";
  r.setAttribute("aria-label", o), r.title = o, r.dataset.foldKind = t, r.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const a = r.querySelector("svg");
  return a && (a.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", a.style.transformOrigin = "50% 50%"), r;
}
class me extends Ct {
  constructor(t, r) {
    super(), this.open = t, this.kind = r;
  }
  eq(t) {
    return this.open === t.open && this.kind === t.kind;
  }
  toDOM() {
    return rr(this.open, this.kind);
  }
}
let z = 0;
function Te(e, t) {
  const r = e.coordsAtPos(t.from), o = e.coordsAtPos(t.to);
  if (!r || !o) return null;
  const a = e.contentDOM.getBoundingClientRect(), s = Math.min(r.top, o.top), i = Math.max(r.bottom, o.bottom), f = Math.max(0, i - s);
  if (f < 2) return null;
  const c = document.createElement("div");
  return c.className = "cm-note-cover-fold-motion", c.style.cssText = ["position:fixed", `top:${s}px`, `left:${a.left}px`, `width:${Math.max(0, a.width)}px`, `height:${f}px`, "overflow:hidden", "pointer-events:none", "z-index:6", "background:var(--md-bk-color, var(--cm-background, #fff))"].join(";"), document.body.appendChild(c), c;
}
async function or(e, t) {
  const r = ++z, o = Te(e, t);
  if (!o) {
    e.dispatch({ effects: j.of(t) });
    return;
  }
  try {
    await V(o, { height: 0, opacity: 0.35 }, { duration: 0.22, ease: "easeInOut" });
  } catch {
  }
  r === z && N(e.state) && e.dispatch({ effects: j.of(t) }), o.remove();
}
async function nr(e, t) {
  ++z, e.dispatch({ effects: A.of(t) });
  const r = N(e.state);
  if (!r) return;
  const o = Te(e, r);
  if (o) {
    try {
      await V(o, { height: 0, opacity: 0 }, { duration: 0.22, ease: "easeInOut" });
    } catch {
    }
    o.remove();
  }
}
function Ke(e, t) {
  var _a;
  const r = (_a = e == null ? void 0 : e.querySelector) == null ? void 0 : _a.call(e, "svg");
  r instanceof SVGElement && V(r, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" });
}
function ge(e, t) {
  const r = I(e.state, t);
  return e.dispatch({ effects: r ? A.of(t) : j.of(t) }), true;
}
function he(e) {
  const t = N(e.state);
  if (!t) return false;
  const o = !I(e.state, t), a = e.dom.querySelector('.cm-note-cover-fold-chevron[data-fold-kind="cover"]');
  return Ke(a, !o), (async () => {
    o ? await or(e, t) : await nr(e, t);
    const s = e.state.facet(F);
    s && Jt(s, o);
  })(), true;
}
function xe(e, t) {
  const r = N(e.state);
  if (!r) return;
  const o = I(e.state, r);
  t && !o ? e.dispatch({ effects: j.of(r) }) : !t && o && e.dispatch({ effects: A.of(r) });
}
function ar() {
  return je.fromClass(class {
    constructor(e) {
      __publicField(this, "lastKey", null);
      __publicField(this, "hadCover", false);
      __publicField(this, "loadGen", 0);
      this.view = e, this.syncKeyAndMaybeRestore();
    }
    update(e) {
      const t = e.state.facet(F) !== this.lastKey, o = !!E(e.state.doc), a = o && !this.hadCover;
      this.hadCover = o, (t || a) && this.syncKeyAndMaybeRestore();
    }
    syncKeyAndMaybeRestore() {
      const e = this.view.state.facet(F);
      this.lastKey = e;
      const t = E(this.view.state.doc);
      if (this.hadCover = !!t, !t) return;
      if (!e) {
        xe(this.view, true);
        return;
      }
      const r = ++this.loadGen;
      Zt(e).then((o) => {
        r === this.loadGen && xe(this.view, o !== false);
      });
    }
  });
}
function sr(e) {
  return e.transactions.some((t) => t.effects.some((r) => r.is(j) || r.is(A)));
}
function Pr() {
  return [tr(null), ke({ preparePlaceholder(e, t) {
    const r = N(e);
    return r && Qt(r, t) ? "cover" : "heading";
  }, placeholderDOM(e, t, r) {
    const o = document.createElement("span");
    return o.className = "cm-foldPlaceholder", o.textContent = r === "cover" ? "\u2026\uD45C\uC9C0\u2026" : "\u2026", o.setAttribute("aria-hidden", "true"), o.onclick = t, o;
  } }), Se.of((e, t) => {
    const r = E(e.doc);
    if (!r) return null;
    const o = e.doc.lineAt(r.from);
    return t !== o.from ? null : N(e);
  }), Nt({ class: "cm-note-cover-fold-gutter", lineMarker(e, t) {
    const r = T(e.state, t.from);
    if (!r) return null;
    const o = !I(e.state, r);
    return new me(o, r.kind);
  }, lineMarkerChange: (e) => e.docChanged || e.viewportChanged || sr(e), initialSpacer: () => new me(true, "heading"), domEventHandlers: { mousedown(e, t, r) {
    if (!(r instanceof MouseEvent) || r.button !== 0) return false;
    const o = T(e.state, t.from);
    if (!o) return false;
    if (o.kind === "cover") {
      if (!he(e)) return false;
    } else {
      const a = r.target instanceof Element ? r.target.closest(".cm-note-cover-fold-chevron") : null;
      Ke(a, I(e.state, o)), ge(e, o);
    }
    return r.preventDefault(), r.stopPropagation(), true;
  } } }), wt({ domEventHandlers: { mousedown(e, t, r) {
    if (!(r instanceof MouseEvent) || r.button !== 0) return false;
    const o = E(e.state.doc);
    if (o && t.from >= o.from && t.from < o.to) return he(e) ? (r.preventDefault(), true) : false;
    const a = T(e.state, t.from);
    return !a || a.kind !== "heading" ? false : (ge(e, a), r.preventDefault(), true);
  } } }), ar(), U.theme({ ".cm-note-cover-fold-gutter": { width: "1.1rem" }, ".cm-note-cover-fold-gutter .cm-gutterElement": { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }, ".cm-note-cover-fold-chevron": { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", padding: "0", margin: "0", border: "none", background: "transparent", color: "inherit", opacity: "0.65", cursor: "pointer", lineHeight: "1" }, ".cm-note-cover-fold-chevron:hover": { opacity: "1" }, ".cm-note-cover-fold-chevron svg": { display: "block" } })];
}
function dr({ cover: e, getPresignedUrl: t }) {
  const r = Je(e.pageSizeId) ? e.pageSizeId : Qe, o = u.useMemo(() => ({ ...et(), pageSizeId: r }), [r]), a = u.useMemo(() => tt(r), [r]), s = u.useMemo(() => rt(o), [o]);
  return n.jsx("div", { className: "md-note-cover-preview-light w-full bg-white text-gray-900", "data-note-cover-preview": "1", "data-color-mode": "light", "data-cover-page-size": r, style: s, children: n.jsx(It, { cover: e, getPresignedUrl: t, className: "md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]", style: { width: "100%", height: "auto", aspectRatio: `${a.widthMm} / ${a.heightMm}` } }) });
}
const L = /* @__PURE__ */ new WeakMap(), ze = "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026", lr = "\uD45C\uC9C0";
function O(e) {
  const t = L.get(e);
  t && (t.unmount(), L.delete(e));
}
function pe(e, t) {
  if (!e) return;
  const r = e.querySelector(".md-note-cover-placeholder__fallback");
  if (!r) return;
  const o = r.querySelector(".md-note-cover-placeholder__fallback-text");
  if (o) {
    o.textContent = t;
    return;
  }
  r.textContent = t;
}
function ir(e) {
  if (!e) return;
  let t = e.querySelector(".md-note-cover-placeholder__fallback");
  if (t || (t = document.createElement("span"), t.className = "md-note-cover-placeholder__fallback", e.appendChild(t)), t.querySelector(".md-note-cover-placeholder__spinner")) return;
  t.replaceChildren();
  const r = document.createElement("span");
  r.className = "md-note-cover-placeholder__spinner", r.setAttribute("aria-hidden", "true");
  const o = document.createElement("span");
  o.className = "md-note-cover-placeholder__fallback-text", o.textContent = ze, t.append(r, o);
}
function K(e, t) {
  e && (e.classList.toggle("md-note-cover-placeholder--pending", t === "pending"), e.classList.toggle("md-note-cover-placeholder--ready", t === "ready"), e.classList.toggle("md-note-cover-placeholder--empty", t === "empty"), t === "pending" ? (ir(e), pe(e, ze)) : t === "empty" && pe(e, lr));
}
function cr(e, t, r) {
  let o = L.get(e);
  o || (o = Oe.createRoot(e), L.set(e, o)), o.render(u.createElement(dr, { cover: t, getPresignedUrl: r ?? void 0 }));
}
function Lr(e, t, r, o) {
  if (!e || typeof e.querySelectorAll != "function") return 0;
  const a = (o == null ? void 0 : o.load) !== false, { cover: s } = ot(t ?? ""), i = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  if (!(s == null ? void 0 : s.enabled)) {
    for (const f of i) {
      O(f);
      const c = f.closest("[data-note-cover-placeholder]");
      K(c, "empty");
    }
    return 0;
  }
  if (!a) {
    for (const f of i) {
      O(f);
      const c = f.closest("[data-note-cover-placeholder]");
      K(c, "pending");
    }
    return 0;
  }
  for (const f of i) {
    const c = f.closest("[data-note-cover-placeholder]");
    K(c, "ready"), cr(f, s, r);
  }
  return i.length;
}
function _r(e) {
  if (!e || typeof e.querySelectorAll != "function") return;
  const t = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  for (const r of t) O(r);
}
function Rr(e) {
  var _a, _b;
  if (!e) return [];
  const t = [], r = /* @__PURE__ */ new Set(), o = (a) => {
    if (!a || !a.size) return;
    const s = String(a.size);
    r.has(s) || (r.add(s), t.push(a));
  };
  if ((_a = e.files) == null ? void 0 : _a.length) for (const a of e.files) a && (((_b = a.type) == null ? void 0 : _b.startsWith("image/")) || !a.type && a.size > 0) && o(a);
  if (e.items) for (const a of e.items) {
    if (a.kind !== "file") continue;
    const s = a.type || "";
    (s.startsWith("image/") || s === "") && o(a.getAsFile());
  }
  return t;
}
export {
  kr as H,
  Sr as I,
  Nr as W,
  Rr as a,
  Cr as b,
  Pr as c,
  Er as d,
  Ir as e,
  jr as f,
  Fr as g,
  Lr as h,
  Mr as m,
  Ar as s,
  _r as t,
  wr as u
};
