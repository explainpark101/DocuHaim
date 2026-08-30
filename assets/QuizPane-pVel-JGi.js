import { j as t, r as i } from "./vendor-react-BFxggocB.js";
import { A as cn, m as We } from "./vendor-motion-b8oTnHK_.js";
import { fF as Je, fG as Pt, fH as dn, fI as un, b6 as Ho, A as ct, T as At, fJ as gr, D as F, dM as Ko, fK as Vo, fL as Xo, fM as Zo, fN as ns, fO as ss, fP as hr, a7 as rs, d5 as xn, fQ as Yo, fR as ei, aP as Jn, ca as ti, fS as ni, fT as Hn, fU as Qn, fV as si, fW as Ze, fX as ri, fY as oi, fZ as br, f_ as kr, f$ as Kn, g0 as ii, g1 as Vn, g2 as zt, g3 as ai, g4 as $e, g5 as li, g6 as it, g7 as os, g8 as is, g9 as wr, ga as yr, gb as vr, gc as Sr, gd as jr, ge as ci, gf as Cr, gg as Nr, gh as Ct, gi as di, gj as Tn, gk as ui, gl as fi, gm as mi, gn as pi, go as Gs, gp as xi, gq as Xn, gr as gi, gs as Ws, gt as hi, gu as Zn, gv as wt, gw as bi, gx as yt, gy as $t, gz as Nt, gA as ki, gB as wi, gC as Kt, gD as yi, U as sn, gE as rn, gF as on, gG as vi, V as an, bS as Si, dt as ji, ds as Ci, gH as Ni, gI as $i, gJ as vt, gK as _n, gL as Pi, gM as zi, gN as Ei, gO as Ii, gP as Ri, gQ as Mi, gR as Ai, gS as Li, gT as Oi, gU as Qi, gV as Ti, gW as _i } from "./index-DGkRmTW6.js";
import { X as Be, L as gn, aU as as, k as $r, aV as Et, aj as Di, S as Qe, ai as Js, a9 as Yn, x as Fi, aW as Hs, aX as Bi, aY as qi, a8 as Ui, aZ as Gi, a4 as Wi, a_ as hn, a$ as Pr, au as zr, b0 as Ji, b1 as Er, E as Hi, b2 as Ki, b as Vi, t as Ir, b3 as Xi, b4 as Zi, a3 as Ks, b5 as Yi } from "./vendor-lucide-D7vvAA4A.js";
import { b as It, a2 as ea, a3 as ta, d as Ie, T as Re, e as Me, f as Ae, A as Le, M as na, N as sa, S as ra, g as oa, w as ia, x as aa, y as la, z as ca, B as Vs } from "./vendor-radix-ClPHWmRP.js";
import { ao as da, v as ua, K as fa } from "./vendor-md-editor-CRNS8cBC.js";
import { u as ma } from "./preview-CucMEii9.js";
import { u as pa } from "./useWikiImageHydration-BVq2uqvJ.js";
import "./vendor-aws-CacdPxb-.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-google-genai-DGp6lEvQ.js";
import "./storageImageHydration-BMAQ94VI.js";
const Rr = i.createContext({});
function xa({ value: e, children: n }) {
  return t.jsx(Rr.Provider, { value: e, children: n });
}
function ga() {
  return i.useContext(Rr);
}
function Te(e, n = 4) {
  if (e.kind !== "choice") return Je(n);
  const s = (e.options || []).filter((o) => String(o || "").trim()).length, r = Math.max(s, (e.options || []).length);
  return r >= Pt ? Je(r) : Je(n);
}
function Mr(e, n = 4) {
  const s = Je(n), r = e.length ? e[e.length - 1] : null;
  return r ? r.kind === "subjective" ? { kind: "subjective", answerStyle: r.answerStyle === "essay" ? "essay" : "short", choiceCount: s } : { kind: "choice", answerStyle: "short", choiceCount: Te(r, s) } : { kind: "choice", answerStyle: "short", choiceCount: s };
}
function Xs(e, n) {
  const s = Mr(n, e.choiceCount);
  return { ...e, choiceCount: s.choiceCount };
}
function Ye(e, n) {
  const s = Je(n), r = [...e];
  for (; r.length < s; ) r.push("");
  return r.slice(0, s);
}
function Ar() {
  const [e, n] = i.useState(() => dn());
  return i.useEffect(() => {
    const s = () => n(dn());
    return window.addEventListener(un, s), () => window.removeEventListener(un, s);
  }, []), e;
}
const Lr = [0.32, 0.72, 0, 1], ha = { duration: 0 };
function ba(e) {
  return e ? { type: "spring", stiffness: 380, damping: 36 } : { type: "tween", duration: 0.22, ease: Lr };
}
const ka = Ho() ? { type: "tween", duration: 0.2, ease: Lr } : { type: "spring", stiffness: 420, damping: 34 };
function wa(e, n = {}) {
  const { isResizing: s = false, edge: r = "right" } = n, o = n.useLayoutWidthAnim ?? dn(), a = s ? ha : ba(o);
  if (o) return { style: void 0, initial: { width: 0, opacity: 0.85 }, animate: { width: e, opacity: 1 }, exit: { width: 0, opacity: 0.85 }, transition: a };
  const c = r === "right" ? "100%" : "-100%";
  return { style: { width: e, flexShrink: 0, overflow: "hidden", willChange: "transform" }, initial: { x: c, opacity: 0.92 }, animate: { x: 0, opacity: 1 }, exit: { x: c, opacity: 0.92 }, transition: a };
}
function ya() {
  return { initial: { y: 48, opacity: 0, scale: 0.98 }, animate: { y: 0, opacity: 1, scale: 1 }, exit: { y: 48, opacity: 0, scale: 0.98 }, transition: ka };
}
function va(e, n) {
  return n ?? dn() ? { initial: { opacity: 0, x: 12 }, animate: { opacity: 1, x: 0 }, transition: { delay: Math.min(e, 12) * 0.03, duration: 0.18 } } : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.14, delay: Math.min(e, 8) * 0.02 } };
}
function Lt({ motionKey: e, open: n, width: s, isResizing: r = false, edge: o = "right", className: a, "aria-label": c, children: f }) {
  const u = Ar(), d = wa(s, { isResizing: r, edge: o, useLayoutWidthAnim: u });
  return t.jsx(cn, { initial: false, children: n ? u ? t.jsx(We.aside, { role: "complementary", "aria-label": c, className: a, initial: d.initial, animate: d.animate, exit: d.exit, transition: d.transition, children: f }, e) : t.jsx(We.aside, { role: "complementary", "aria-label": c, className: a, style: { width: s, flexShrink: 0, overflow: "hidden", willChange: "transform" }, initial: d.initial, animate: d.animate, exit: d.exit, transition: d.transition, children: f }, e) : null });
}
const Sa = 360, ja = At;
function Ca(e) {
  return e === "subjective-essay" ? { kind: "subjective", answerStyle: "essay" } : e === "subjective-short" ? { kind: "subjective", answerStyle: "short" } : { kind: "choice", answerStyle: "short" };
}
function Na(e) {
  return e && e.kind === "subjective" ? e.answerStyle === "essay" ? "subjective-essay" : "subjective-short" : "choice";
}
function $a({ open: e, question: n, defaultChoiceCount: s, busy: r = false, onClose: o, onSubmit: a }) {
  const [c, f] = i.useState("choice"), [u, d] = i.useState(s), [x, m] = i.useState(""), { width: g, handleProps: w, isResizing: v } = ct({ storageKey: "quiz-derived-question-dock-width", defaultWidth: Sa, minWidth: 280, maxWidth: 560, edge: "right" }), y = i.useMemo(() => n ? Te(n, s) : s, [s, n]);
  i.useEffect(() => {
    e && (f(Na(n)), d(y), m(""));
  }, [e, n, y]);
  const { kind: z, answerStyle: N } = Ca(c), j = (n == null ? void 0 : n.displayLabel) || (n == null ? void 0 : n.id) || "", b = () => {
    a({ kind: z, choiceCount: Je(u), ...z === "subjective" ? { answerStyle: N } : {}, ...x.trim() ? { userPrompt: x.trim() } : {} });
  }, $ = e && n != null;
  return t.jsx(Lt, { motionKey: "quiz-derived-question-dock", open: $, width: g, isResizing: v, "aria-label": "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131", className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-violet-200 bg-white shadow-lg dark:border-violet-900/60 dark:bg-odp-surface", children: n != null ? t.jsxs("div", { className: "relative h-full min-h-0", style: { width: g }, children: [t.jsx(ja, { edge: "left", handleProps: w, isResizing: v, visibleOnHover: true, label: "\uD30C\uC0DD\uBB38\uC81C \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [t.jsxs("div", { className: "flex items-center justify-between border-b border-violet-200 px-3 py-2.5 dark:border-violet-900/60", children: [t.jsxs("div", { className: "min-w-0", children: [t.jsx("div", { className: "text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131" }), j ? t.jsxs("p", { className: "text-[11px] text-slate-500 dark:text-odp-muted", children: [j, "\uBC88 \uBB38\uD56D"] }) : null] }), t.jsx("button", { type: "button", "aria-label": "\uD30C\uC0DD\uBB38\uC81C \uD328\uB110 \uB2EB\uAE30", className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg", onClick: o, disabled: r, children: t.jsx(Be, { size: 16 }) })] }), t.jsxs("div", { className: "min-h-0 flex-1 space-y-3 overflow-y-auto p-3", children: [t.jsxs("div", { className: "rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-2 text-[11px] text-violet-950 dark:border-violet-800/70 dark:bg-violet-950/45 dark:text-violet-100", children: [t.jsx("p", { className: "font-semibold", children: "\uC6D0\uBCF8 \uBB38\uD56D" }), t.jsx("p", { className: "mt-1 line-clamp-4 opacity-90", children: n.question })] }), t.jsx("p", { className: "text-xs text-slate-600 dark:text-odp-muted", children: "\uC6D0\uBCF8 \uBB38\uD56D\uC744 \uBC14\uD0D5\uC73C\uB85C \uC720\uD615\uC744 \uBC14\uAFB8\uAC70\uB098 \uC694\uAD6C\uC0AC\uD56D\uC744 \uCD94\uAC00\uD574 \uC0C8 \uD30C\uC0DD \uBB38\uD56D\uC744 \uC0DD\uC131\uD569\uB2C8\uB2E4." }), t.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [[["choice", "\uAC1D\uAD00\uC2DD"], ["subjective-short", "\uB2E8\uB2F5\uD615"], ["subjective-essay", "\uC11C\uC220\uD615"]].map(([k, S]) => {
    const I = c === k;
    return t.jsx("button", { type: "button", disabled: r, className: `rounded-lg border px-3 py-1.5 text-xs font-semibold ${I ? "border-violet-500 bg-violet-50 text-violet-900 dark:bg-violet-950/40 dark:text-violet-100" : "border-slate-200 bg-white text-slate-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"}`, onClick: () => f(k), children: S }, k);
  }), z === "choice" ? t.jsxs("label", { className: "ml-auto flex items-center gap-1.5 text-xs text-slate-600 dark:text-odp-muted", children: ["\uBCF4\uAE30", t.jsx("select", { className: "rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: u, disabled: r, onChange: (k) => d(Number(k.target.value) || u), children: Array.from({ length: gr - Pt + 1 }, (k, S) => Pt + S).map((k) => t.jsxs("option", { value: k, children: [k, "\uC9C0\uC120\uB2E4"] }, k)) })] }) : null] }), t.jsxs("label", { className: "block space-y-1.5", children: [t.jsxs("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: ["\uCD94\uAC00 \uC694\uAD6C\uC0AC\uD56D", t.jsx("span", { className: "ml-1 font-normal text-slate-500 dark:text-odp-muted", children: "(\uC120\uD0DD)" })] }), t.jsx("textarea", { className: "quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", placeholder: "\uC608: \uACC4\uC0B0 \uC704\uC8FC\uB85C \uBC14\uAFB8\uACE0, \uC624\uB2F5 \uBCF4\uAE30\uB294 \uD5F7\uAC08\uB9AC\uAC8C \uAD6C\uC131\uD574 \uC8FC\uC138\uC694.", value: x, disabled: r, onChange: (k) => m(k.target.value) })] })] }), t.jsxs("div", { className: "flex gap-2 border-t border-violet-200 p-3 dark:border-violet-900/60", children: [t.jsx(F, { type: "button", variant: "secondary", size: "sm", className: "flex-1", disabled: r, onClick: o, children: "\uCDE8\uC18C" }), t.jsxs(F, { type: "button", variant: "primary", size: "sm", className: "flex-1", disabled: r, onClick: b, children: [r ? t.jsx(gn, { size: 14, className: "animate-spin", "aria-hidden": true }) : t.jsx(as, { size: 14 }), r ? "\uC0DD\uC131 \uC911\u2026" : "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131"] })] })] })] }) : null });
}
const Pa = i.memo($a);
function Rt(e) {
  const n = String(e || "").trim();
  if (!n) return "";
  const s = n.lastIndexOf("/");
  return s >= 0 ? n.slice(s + 1) : n;
}
const za = "z-100001 max-w-[min(92vw,420px)] break-all rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", Ea = "flex w-full items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-2 py-1.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100", Ia = "inline-flex max-w-full items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100", Ra = "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-violet-400 bg-white outline-none focus-visible:ring-2 focus-visible:ring-violet-400 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600 dark:border-violet-600 dark:bg-odp-bgSoft dark:data-[state=checked]:border-violet-500 dark:data-[state=checked]:bg-violet-500";
function Ma({ path: e, isDock: n, onPreview: s, muted: r }) {
  const o = Rt(e), a = n ? `min-w-0 flex-1 truncate text-left hover:underline${r ? " opacity-60" : ""}` : `min-w-0 max-w-full truncate hover:underline${r ? " opacity-60" : ""}`, c = s ? t.jsx("button", { type: "button", className: a, onClick: () => s(e), children: o }) : t.jsx("span", { className: a, children: o });
  return t.jsxs(Ie, { children: [t.jsx(Re, { asChild: true, children: c }), t.jsx(Me, { children: t.jsxs(Ae, { side: "top", sideOffset: 6, className: za, children: [e, t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Or({ paths: e, onRemove: n, onOpenPicker: s, onPreview: r, isPathEnabled: o, onToggleEnabled: a, label: c = "\uADFC\uAC70 \uBB38\uC11C", emptyHint: f = "\uC120\uD0DD\uB41C \uADFC\uAC70 \uBB38\uC11C \uC5C6\uC74C", layout: u = "chips" }) {
  const d = u === "dock", x = d && !!a;
  return t.jsx(It, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs("div", { className: "space-y-1.5", children: [t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: c }), s ? t.jsx(F, { type: "button", variant: "secondary", size: "sm", onClick: s, children: "\uC120\uD0DD" }) : null] }), e.length === 0 ? t.jsx("p", { className: "text-[11px] text-gray-500 dark:text-odp-muted", children: f }) : t.jsx("ul", { className: d ? "flex flex-col gap-1.5" : "flex flex-wrap gap-1.5", children: e.map((m) => {
    const g = o ? o(m) : true, w = d ? `${Ea}${g ? "" : " opacity-70"}` : Ia;
    return t.jsxs("li", { className: w, children: [x ? t.jsx(ea, { className: Ra, checked: g, onCheckedChange: (v) => a == null ? void 0 : a(m, v === true), "aria-label": `${m} ${g ? "\uC0AC\uC6A9 \uC911" : "\uC0AC\uC6A9 \uC548 \uD568"}`, children: t.jsx(ta, { className: "text-white", children: t.jsx($r, { size: 10, strokeWidth: 3 }) }) }) : null, t.jsx(Ma, { path: m, isDock: d, onPreview: r, muted: x && !g }), n ? t.jsx("button", { type: "button", "aria-label": `${m} \uC81C\uAC70`, className: d ? "ml-auto shrink-0 rounded-md p-1.5 hover:bg-violet-200/80 dark:hover:bg-violet-900" : "shrink-0 rounded p-0.5 hover:bg-violet-200/80 dark:hover:bg-violet-900", onClick: () => n(m), children: t.jsx(Be, { size: d ? 14 : 12 }) }) : null] }, m);
  }) })] }) });
}
ua({ editorConfig: { languageUserDefined: { "ko-KR": fa } } });
function Aa({ text: e, previewId: n, className: s = "", getPresignedUrl: r, currentNotePath: o }) {
  const a = ma(), c = i.useRef(null), f = i.useMemo(() => String(e || ""), [e]), u = ga(), d = r ?? u.getPresignedUrl, x = o ?? u.currentNotePath ?? null;
  return pa(c, f, d, x), t.jsx("div", { ref: c, className: `quiz-md-preview markdown-content ${s}`, children: t.jsx(da, { id: n, modelValue: f, theme: a === "dark" ? "dark" : "light", previewTheme: "default", codeTheme: Ko, language: "ko-KR", showCodeRowNumber: false, noImgZoomIn: true, iconfontType: void 0, sanitize: (m) => m }) });
}
const _e = i.memo(Aa), La = /\*\(\s*정답\s*\)\*|\(\s*정답\s*\)|\[\s*정답\s*\]|\*\s*정답\s*\*/;
function Oa(e) {
  return e.replace(/\*\(\s*정답\s*\)\*/g, "").replace(/\(\s*정답\s*\)/g, "").replace(/\[\s*정답\s*\]/g, "").replace(/\*\s*정답\s*\*/g, "").replace(/\*\*(.*?)\*\*/g, "$1").replace(/__(.*?)__/g, "$1").trim();
}
function Qa(e) {
  let n = e.trim();
  const s = n.match(/^\[단답형\]\s*(.*)$/i);
  if (s) return { kind: "subjective", answerStyle: "short", question: (s[1] || "").trim() };
  const r = n.match(/^\[(?:주관식|서술형)\]\s*(.*)$/i);
  return r ? { kind: "subjective", answerStyle: "essay", question: (r[1] || "").trim() } : { kind: "choice", question: n };
}
const Zs = /\*{0,2}\s*📖\s*모범\s*답안\s*:?\s*\*{0,2}/, Ys = /\*{0,2}\s*💡\s*접근\s*Point!?\s*\*{0,2}/, er = /\*{0,2}\s*📖\s*해설\s*:?\s*\*{0,2}/, fn = /\*{0,2}\s*📚\s*근거\s*문서\s*:?\s*\*{0,2}/;
function Ta(e) {
  const n = e.join(`
`);
  if (!fn.test(n) && !n.includes("\u{1F4DA} \uADFC\uAC70 \uBB38\uC11C")) return;
  const s = n.split(fn)[1] ?? "", r = [];
  for (const o of s.split(`
`)) {
    const a = o.trim().match(/^[-*]\s+(.+)$/);
    if (a == null ? void 0 : a[1]) {
      const c = a[1].trim().replace(/\\/g, "/").replace(/^\/+/, "");
      c && r.push(c);
    }
  }
  return r.length > 0 ? r : void 0;
}
function Vt(e) {
  return String(e || "").replace(/^\*+\s*/, "").replace(/\s*\*+$/, "").trim();
}
function _a(e) {
  const n = e.join(`
`).trim();
  if (!n) return { point: "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.", explanation: "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." };
  let s, r = n;
  if (Zs.test(r)) {
    const f = r.split(Zs), d = (f[1] || "").trim().split(/(?=\*{0,2}\s*(?:💡\s*접근\s*Point!?|📖\s*해설|📚\s*근거\s*문서))/);
    s = Vt(d[0] || ""), r = [f[0], ...d.slice(1)].join(`
`).trim();
  }
  r = (r.split(fn)[0] || "").trim();
  let a = "", c = "";
  if (Ys.test(r) || er.test(r)) {
    const f = r.split(er), u = f[0] || "";
    c = Vt(f.slice(1).join(`
`)), a = Vt(u.replace(Ys, ""));
  } else c = Vt(r);
  return { point: a || "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.", explanation: c || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.", ...s ? { modelAnswer: s } : {} };
}
const Da = /^<!--\s*quiz-q-meta\s+([\s\S]*?)-->\s*$/;
function Fa(e) {
  try {
    const n = JSON.parse(e);
    if (!n || typeof n != "object") return null;
    const r = n.similarOf;
    if (!r || typeof r != "object") return {};
    const o = r, a = String(o.id || o.displayLabel || "").trim(), c = String(o.displayLabel || o.id || "").trim();
    return !a && !c ? {} : { similarOf: { id: a || c, displayLabel: c || a } };
  } catch {
    return null;
  }
}
function Ba(e) {
  var _a2, _b;
  const s = (_b = (_a2 = String(e || "").match(/^(.+)-(?:유사|파생)\d+$/)) == null ? void 0 : _a2[1]) == null ? void 0 : _b.trim();
  if (s) return { id: s, displayLabel: s };
}
function tr(e, n) {
  return !n && !e ? e : e ? `${e}
${n}` : n;
}
function qa(e) {
  return /^1\.\s+/.test(e.trim());
}
function Ua(e) {
  const n = e.trim();
  return n.startsWith(">") || /^\*\*정답:\*\*/.test(n);
}
function ln(e) {
  return e.trim().replace(/^>\s?/, "");
}
function Ga(e) {
  const n = ln(e);
  return fn.test(n) || n.includes("\u{1F4DA} \uADFC\uAC70 \uBB38\uC11C");
}
function Wa(e) {
  return e.trim().startsWith(">");
}
function Ja(e, n) {
  const s = e.trim();
  if (!s || !/^#+/.test(s)) return null;
  const r = s.split(`
`);
  let o = String(n + 1), a = o, c = "", f = null;
  const u = [];
  let d = 1, x;
  const m = [];
  let g = "choice", w, v, y = false, z = false, N = false;
  for (const T of r) {
    const O = T.trim(), _ = O.match(Da);
    if (_ == null ? void 0 : _[1]) {
      const P = Fa(_[1]);
      (P == null ? void 0 : P.similarOf) && (v = P.similarOf);
      continue;
    }
    const J = O.match(/^#+\s*(?:🔖\s*)?(\d+(?:-(?:유사|파생)\d+)?)\.?(.*)/);
    if (J) {
      a = (J[1] || "").trim(), o = a;
      const P = Qa((J[2] || "").trim());
      g = P.kind, w = P.answerStyle, c = P.question, y = true, z = true, N = false;
      continue;
    }
    if (!y) continue;
    if (N) {
      if (Wa(O)) {
        m.push(ln(O));
        continue;
      }
      N = false;
    }
    if (z) {
      if (Ga(O)) {
        z = false, N = true, m.push(ln(O));
        continue;
      }
      if (qa(O)) z = false;
      else if (g === "subjective" && Ua(O)) z = false;
      else if (O.startsWith("![")) {
        c = tr(c, O);
        const P = O.match(/!\[.*?\]\((.*?)\)/);
        (P == null ? void 0 : P[1]) && !f && (f = P[1]);
        continue;
      } else {
        if (!O && !c) continue;
        if (z) {
          c = tr(c, O);
          continue;
        }
      }
    }
    if (O.startsWith("![")) {
      const P = O.match(/!\[.*?\]\((.*?)\)/);
      (P == null ? void 0 : P[1]) && (f = P[1]);
      continue;
    }
    const V = O.match(/^\*\*정답:\*\*\s*(.*)$/);
    if (V) {
      x = (V[1] || "").trim();
      continue;
    }
    if (/^\d+\.\s+/.test(O)) {
      const P = O.match(/^(\d+)\.\s+(.*)/);
      if (P) {
        const Q = Number.parseInt(P[1] || "0", 10), W = (P[2] || "").trim(), D = La.test(W);
        u.push(Oa(W)), D && (d = Q);
      }
      continue;
    }
    O.startsWith(">") && m.push(ln(O));
  }
  const { point: j, explanation: b, modelAnswer: $ } = _a(m), k = Ta(m), S = x || $;
  let I = g, M = w;
  return I === "choice" && u.length === 0 && S && (I = "subjective", M = x ? "short" : "essay"), I === "choice" && u.length === 0 && !S || I === "subjective" && !c || I === "choice" && (!c || u.length === 0) ? null : (v || (v = Ba(a)), c = c.trimEnd(), { id: o, displayLabel: a, kind: I, question: c, image: f, point: j, explanation: b, ...I === "subjective" && M ? { answerStyle: M } : {}, ...I === "choice" ? { options: u, answer: d } : {}, ...I === "subjective" && S ? { modelAnswer: S } : {}, ...k ? { sourcePaths: k } : {}, ...v ? { similarOf: v, isGenerated: true } : {} });
}
function ot(e) {
  const { config: n, body: s } = Vo(e), { session: r, body: o } = Xo(s), a = [];
  o.split(/(?=^#+\s*(?:🔖\s*)?\d+)/m).forEach((d, x) => {
    const m = Ja(d, x);
    m && a.push(m);
  });
  const f = new Set(a.map((d) => d.id)), u = r && f.size > 0 ? Zo(r, f, a) : r;
  return { config: ss(n), questions: a, session: u && !ns(u) ? u : null };
}
function Xt(e, n) {
  return (n == null ? void 0 : n.sourcePaths) && n.sourcePaths.length > 0 ? [...n.sourcePaths] : hr(e);
}
function es(e) {
  let n = 0;
  for (const s of e) {
    const r = String(s.displayLabel || "").match(/^(\d+)/);
    if (r == null ? void 0 : r[1]) {
      const o = Number.parseInt(r[1], 10);
      Number.isFinite(o) && o > n && (n = o);
    }
  }
  return String(n + 1);
}
function Qr(e, n) {
  const s = String(e.displayLabel || n || "1").trim() || "1", r = String(e.point || "").trim() || "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.", o = String(e.explanation || "").trim() || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.", a = e.sourcePaths && e.sourcePaths.length > 0 ? [...e.sourcePaths] : void 0;
  if (e.kind === "subjective") {
    const f = e.answerStyle || "short";
    return { id: s, displayLabel: s, kind: "subjective", answerStyle: f, question: String(e.question || "").trim(), modelAnswer: String(e.modelAnswer || "").trim(), point: r, explanation: o, ...a ? { sourcePaths: a } : {} };
  }
  const c = (e.options || []).map((f) => String(f || "").trim());
  return { id: s, displayLabel: s, kind: "choice", question: String(e.question || "").trim(), options: c, answer: e.answer && e.answer >= 1 ? e.answer : 1, point: r, explanation: o, ...a ? { sourcePaths: a } : {} };
}
function Ha(e) {
  if (!String(e.question || "").trim()) return "\uC9C8\uBB38 \uBCF8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694.";
  if (e.kind === "choice") {
    const n = (e.options || []).map((o) => String(o || "").trim());
    if (n.filter(Boolean).length < 2) return "\uAC1D\uAD00\uC2DD\uC740 \uCD5C\uC18C 2\uAC1C \uC120\uD0DD\uC9C0\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4.";
    const r = e.answer || 0;
    return r < 1 || r > n.length || !n[r - 1] ? "\uC815\uB2F5 \uC120\uD0DD\uC9C0\uB97C \uC9C0\uC815\uD558\uC138\uC694." : null;
  }
  return String(e.modelAnswer || "").trim() ? null : e.answerStyle === "essay" ? "\uBAA8\uBC94 \uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694." : "\uC815\uB2F5\uC744 \uC785\uB825\uD558\uC138\uC694.";
}
function Ka(e, n) {
  const s = e.kind || "choice", r = e.answerStyle === "essay" ? "essay" : "short", o = s === "choice" ? Je(Math.max(n, (e.options || []).filter(Boolean).length)) : n, a = s === "choice" ? Ye(e.options || [], o) : [];
  return { kind: s, answerStyle: r, question: e.question ?? "", options: a, answer: e.answer && e.answer >= 1 ? Math.min(o, e.answer) : 1, modelAnswer: e.modelAnswer ?? "", point: e.point ?? "", explanation: e.explanation ?? "", choiceCount: o };
}
function Va({ isOpen: e, onClose: n, styleTemplate: s, initial: r, nextLabel: o, onSubmit: a, onOpenSourcePicker: c, onFixWithAi: f }) {
  const u = !!r, [d, x] = i.useState((r == null ? void 0 : r.kind) || s.kind), [m, g] = i.useState((r == null ? void 0 : r.answerStyle) || s.answerStyle), [w, v] = i.useState(() => r ? Te(r, s.choiceCount) : s.choiceCount), [y, z] = i.useState((r == null ? void 0 : r.question) || ""), [N, j] = i.useState(() => Ye((r == null ? void 0 : r.options) || [], r ? Te(r, s.choiceCount) : s.choiceCount)), [b, $] = i.useState((r == null ? void 0 : r.answer) || 1), [k, S] = i.useState((r == null ? void 0 : r.modelAnswer) || ""), [I, M] = i.useState((r == null ? void 0 : r.point) || ""), [B, T] = i.useState((r == null ? void 0 : r.explanation) || ""), [O, _] = i.useState((r == null ? void 0 : r.sourcePaths) || []), [J, V] = i.useState(""), [P, Q] = i.useState(false), [W, D] = i.useState(""), [te, oe] = i.useState(false), He = i.useCallback((A) => {
    const q = Je(A);
    v(q), j((ce) => Ye(ce, q)), $((ce) => Math.min(Math.max(1, ce), q));
  }, []);
  i.useEffect(() => {
    if (!e) {
      Q(false), D(""), oe(false), V("");
      return;
    }
    if (r) {
      const A = Te(r, s.choiceCount);
      x(r.kind), g(r.answerStyle === "essay" ? "essay" : "short"), v(A), z(r.question || ""), j(Ye(r.options || [], A)), $(r.answer || 1), S(r.modelAnswer || ""), M(r.point || ""), T(r.explanation || ""), _(r.sourcePaths || []);
    } else x(s.kind), g(s.answerStyle), v(s.choiceCount), z(""), j(Ye([], s.choiceCount)), $(1), S(""), M(""), T(""), _([]);
    Q(false), D(""), V("");
  }, [e, r, s]);
  const Y = i.useMemo(() => {
    const A = { kind: d, displayLabel: (r == null ? void 0 : r.displayLabel) || o, question: y, point: I, explanation: B, sourcePaths: O };
    return d === "subjective" ? { ...A, answerStyle: m, modelAnswer: k } : { ...A, options: Ye(N, w), answer: b };
  }, [d, m, r == null ? void 0 : r.displayLabel, o, y, N, w, b, k, I, B, O]), E = () => {
    const A = Ha(Y);
    if (A) {
      V(A);
      return;
    }
    const q = Qr(Y, o);
    r && (q.id = r.id, q.displayLabel = r.displayLabel), a(q), n();
  }, se = async () => {
    if (!(!f || te)) {
      V(""), oe(true);
      try {
        const A = await f({ instructions: W, form: Y });
        if (!A) return;
        const q = Ka(A, w);
        x(q.kind), g(q.answerStyle), v(q.choiceCount), z(q.question), j(q.options), $(q.answer), S(q.modelAnswer), M(q.point), T(q.explanation), Q(false);
      } catch (A) {
        V((A instanceof Error ? A.message : "") || "\uBB38\uC81C \uACE0\uCE58\uAE30\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        oe(false);
      }
    }
  };
  return t.jsx(rs, { isOpen: e, onClose: n, contentClassName: "quiz-pane max-w-2xl max-h-[90vh]", children: t.jsxs("div", { className: "flex max-h-[min(80vh,720px)] flex-col gap-3 overflow-y-auto p-4 text-sm", children: [t.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [t.jsx("h2", { className: "text-base font-bold text-gray-900 dark:text-odp-fgStrong", children: u ? "\uBB38\uC81C \uC218\uC815" : "\uBB38\uC81C \uCD94\uAC00" }), u && f ? t.jsxs(F, { type: "button", variant: P ? "primary" : "secondary", size: "sm", "aria-pressed": P, disabled: te, onClick: () => Q((A) => !A), children: [t.jsx(Et, { size: 14 }), "\uBB38\uC81C \uACE0\uCE58\uAE30"] }) : null] }), u && P && f ? t.jsxs("div", { className: "space-y-2 rounded-xl border border-violet-200 bg-violet-50/80 p-3 dark:border-violet-900/60 dark:bg-violet-950/25", children: [t.jsx("p", { className: "text-xs text-violet-900 dark:text-violet-100", children: "\uD604\uC7AC \uBB38\uD56D\uC744 \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB294 \uAC83\uC73C\uB85C \uBCF4\uACE0 AI\uAC00 \uAD50\uC815\uD569\uB2C8\uB2E4. \uC694\uAD6C\uC0AC\uD56D\uC744 \uC801\uC73C\uBA74 \uBB38\uD56D \uBC29\uD5A5\xB7\uC8FC\uC81C\xB7\uB09C\uC774\uB3C4\uB97C \uC870\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-violet-900 dark:text-violet-100", children: "\uC218\uC815 \uC694\uAD6C\uC0AC\uD56D (\uC120\uD0DD)" }), t.jsx("textarea", { className: "min-h-16 w-full rounded-lg border border-violet-200 bg-white p-2 text-xs dark:border-violet-800 dark:bg-odp-bgSoft", placeholder: "\uC608: \uACC4\uC0B0 \uACFC\uC815\uC744 \uB2E8\uC21C\uD654\uD558\uACE0, \uC624\uB2F5 \uBCF4\uAE30\uB97C \uB354 \uADF8\uB7F4\uB4EF\uD558\uAC8C \uBC14\uAFD4 \uC8FC\uC138\uC694.", value: W, onChange: (A) => D(A.target.value), disabled: te })] }), t.jsx("div", { className: "flex justify-end", children: t.jsxs(F, { type: "button", variant: "primary", size: "sm", disabled: te, onClick: () => {
    se();
  }, children: [te ? t.jsx(gn, { size: 14, className: "animate-spin", "aria-hidden": true }) : t.jsx(Et, { size: 14 }), te ? "\uACE0\uCE58\uB294 \uC911\u2026" : "AI\uB85C \uACE0\uCE58\uAE30"] }) })] }) : null, t.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [[["choice", "\uAC1D\uAD00\uC2DD"], ["subjective-short", "\uB2E8\uB2F5\uD615"], ["subjective-essay", "\uC11C\uC220\uD615"]].map(([A, q]) => {
    const ce = A === "choice" ? d === "choice" : d === "subjective" && m === (A === "subjective-short" ? "short" : "essay");
    return t.jsx("button", { type: "button", className: `rounded-lg border px-3 py-1.5 text-xs font-semibold ${ce ? "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-100" : "border-gray-200 bg-white text-gray-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"}`, onClick: () => {
      A === "choice" ? x("choice") : (x("subjective"), g(A === "subjective-short" ? "short" : "essay"));
    }, children: q }, A);
  }), d === "choice" ? t.jsxs("label", { className: "ml-auto flex items-center gap-1.5 text-xs text-gray-600 dark:text-odp-muted", children: ["\uBCF4\uAE30", t.jsx("select", { className: "rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: w, onChange: (A) => He(Number(A.target.value) || w), children: Array.from({ length: gr - Pt + 1 }, (A, q) => Pt + q).map((A) => t.jsxs("option", { value: A, children: [A, "\uC9C0\uC120\uB2E4"] }, A)) })] }) : null] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uC9C8\uBB38 (Markdown)" }), t.jsx("textarea", { className: "min-h-24 w-full rounded-lg border border-gray-300 bg-white p-2 font-mono text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: y, onChange: (A) => z(A.target.value) }), y.trim() ? t.jsx(_e, { text: y, previewId: "quiz-add-q-preview", className: "rounded border border-gray-100 p-2 text-xs dark:border-odp-borderSoft" }) : null] }), d === "choice" ? t.jsxs("div", { className: "space-y-2", children: [t.jsxs("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: ["\uC120\uD0DD\uC9C0 (", w, "\uC9C0\uC120\uB2E4)"] }), N.map((A, q) => t.jsxs("div", { className: "flex items-start gap-2", children: [t.jsx("input", { type: "radio", name: "quiz-add-answer", checked: b === q + 1, onChange: () => $(q + 1), className: "mt-2", "aria-label": `${q + 1}\uBC88 \uC815\uB2F5` }), t.jsx("textarea", { className: "min-h-10 flex-1 rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: A, placeholder: `${q + 1}\uBC88`, onChange: (ce) => {
    const ae = [...N];
    ae[q] = ce.target.value, j(ae);
  } })] }, q))] }) : t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: m === "essay" ? "\uBAA8\uBC94 \uB2F5\uC548" : "\uC815\uB2F5" }), m === "essay" ? t.jsx("textarea", { className: "min-h-20 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: k, onChange: (A) => S(A.target.value) }) : t.jsx("input", { className: "w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: k, onChange: (A) => S(A.target.value) })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uC811\uADFC Point (\uC120\uD0DD)" }), t.jsx("textarea", { className: "min-h-14 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: I, onChange: (A) => M(A.target.value) })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uD574\uC124 (\uC120\uD0DD)" }), t.jsx("textarea", { className: "min-h-14 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: B, onChange: (A) => T(A.target.value) })] }), t.jsx(Or, { paths: O, onRemove: (A) => _((q) => q.filter((ce) => ce !== A)), onOpenPicker: () => c(O, (A) => _(A)), label: "\uBB38\uD56D \uADFC\uAC70 \uBB38\uC11C (\uC120\uD0DD)" }), J ? t.jsx("p", { className: "text-xs font-medium text-rose-600", children: J }) : null, t.jsxs("div", { className: "flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-odp-borderSoft", children: [t.jsx(F, { type: "button", variant: "secondary", onClick: n, disabled: te, children: "\uCDE8\uC18C" }), t.jsxs(F, { type: "button", variant: "primary", onClick: E, disabled: te, children: [u ? t.jsx(xn, { size: 14 }) : t.jsx(Yo, { size: 14 }), u ? "\uC800\uC7A5" : "\uCD94\uAC00"] })] })] }) });
}
function Xa(e, n) {
  const s = [...e];
  let r = Number.parseInt(es(e), 10) || 1;
  for (const o of n) {
    const a = String(r);
    s.push({ ...o, id: o.isGenerated ? o.id : a, displayLabel: a }), r += 1;
  }
  return s;
}
function Za(e, n, s) {
  return s.mode === "replace" ? { config: s.mergeConfig !== false ? ss({ ...e.config, ...n.config, sourcePaths: n.config.sourcePaths.length > 0 ? n.config.sourcePaths : e.config.sourcePaths }) : e.config, questions: n.questions.map((o) => ({ ...o })) } : { config: e.config, questions: Xa(e.questions, n.questions) };
}
const Ya = `### 1. \uB9F5\uB9AC\uB4C0\uC2A4\uC5D0 \uB300\uD55C \uC124\uBA85\uC73C\uB85C \uAC00\uC7A5 \uC801\uC808\uD55C \uAC83\uC740?

1. Map \uB2E8\uACC4\uC5D0\uC11C \uD0A4-\uAC12 \uBCC0\uD658 \uD6C4 Reduce\uC5D0\uC11C \uC9D1\uACC4\uD55C\uB2E4. *(\uC815\uB2F5)*
2. \uC2E4\uC2DC\uAC04 \uC2A4\uD2B8\uB9AC\uBC0D \uC804\uC6A9\uC774\uB2E4.
3. Reduce\uAC00 Map\uBCF4\uB2E4 \uBA3C\uC800 \uC218\uD589\uB41C\uB2E4.
4. \uB2E8\uC77C \uC11C\uBC84\uC5D0\uC11C\uB9CC \uC2E4\uD589\uB41C\uB2E4.

> **\u{1F4A1} \uC811\uADFC Point!**
> Map \u2192 Shuffle \u2192 Reduce
>
> **\u{1F4D6} \uD574\uC124:**
> \uB9F5\uB9AC\uB4C0\uC2A4\uB294 \uBD84\uC0B0 \uCC98\uB9AC \uD504\uB85C\uADF8\uB798\uBC0D \uBAA8\uB378\uC774\uB2E4.
`;
function el({ isOpen: e, onClose: n, current: s, onApply: r }) {
  const [o, a] = i.useState(""), [c, f] = i.useState("append"), [u, d] = i.useState(""), [x, m] = i.useState(false), g = (v = false) => {
    const y = ot(o);
    if (!y.questions.length) {
      d("\uD30C\uC2F1\uB41C \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uB9C8\uD06C\uB2E4\uC6B4 \uD615\uC2DD\uC744 \uD655\uC778\uD558\uC138\uC694.");
      return;
    }
    if (c === "replace" && !v) {
      m(true);
      return;
    }
    const z = Za(s, y, { mode: c, mergeConfig: c === "replace" });
    r(z, c), n();
  }, w = (v) => {
    if (!v) return;
    const y = new FileReader();
    y.onload = () => {
      a(String(y.result || "")), d("");
    }, y.readAsText(v, "UTF-8");
  };
  return t.jsxs(t.Fragment, { children: [t.jsx(rs, { isOpen: e, onClose: n, contentClassName: "quiz-pane max-w-3xl max-h-[90vh]", children: t.jsxs("div", { className: "flex max-h-[min(80vh,720px)] flex-col gap-3 p-4 text-sm", children: [t.jsx("h2", { className: "text-base font-bold text-gray-900 dark:text-odp-fgStrong", children: "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30" }), t.jsx("p", { className: "text-xs text-gray-600 dark:text-odp-muted", children: "`.quiz.md` \uBCF8\uBB38\uC744 \uBD99\uC5EC\uB123\uAC70\uB098 \uD30C\uC77C\uC744 \uBD88\uB7EC\uC624\uC138\uC694. \uC5EC\uB7EC \uBB38\uD56D\uC744 \uD55C \uBC88\uC5D0 \uB4F1\uB85D\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), t.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs", children: [t.jsxs(F, { type: "button", variant: "secondary", onClick: () => {
    var _a2;
    return (_a2 = document.getElementById("quiz-bulk-file")) == null ? void 0 : _a2.click();
  }, children: [t.jsx(ei, { size: 14 }), "\uD30C\uC77C \uBD88\uB7EC\uC624\uAE30"] }), t.jsx("input", { id: "quiz-bulk-file", type: "file", accept: ".md,.quiz.md,.txt,.markdown", className: "hidden", onChange: (v) => {
    var _a2;
    return w(((_a2 = v.target.files) == null ? void 0 : _a2[0]) || null);
  } }), t.jsx(F, { type: "button", variant: "tertiary", onClick: () => {
    a(Ya), d("");
  }, children: "\uC0D8\uD50C \uBD88\uB7EC\uC624\uAE30" }), t.jsxs("div", { className: "ml-auto flex gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-odp-bgSoft", children: [t.jsx("button", { type: "button", className: `rounded-md px-2 py-1 font-semibold ${c === "append" ? "bg-white shadow-sm dark:bg-odp-surface" : "text-gray-600 dark:text-odp-muted"}`, onClick: () => f("append"), children: "\uCD94\uAC00" }), t.jsx("button", { type: "button", className: `rounded-md px-2 py-1 font-semibold ${c === "replace" ? "bg-white shadow-sm dark:bg-odp-surface" : "text-gray-600 dark:text-odp-muted"}`, onClick: () => f("replace"), children: "\uAD50\uCCB4" })] })] }), t.jsx("textarea", { className: "min-h-64 w-full rounded-xl border border-gray-300 bg-slate-50 p-3 font-mono text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: o, onChange: (v) => {
    a(v.target.value), d("");
  }, placeholder: "\uB9C8\uD06C\uB2E4\uC6B4 \uBB38\uC81C \uBAA9\uB85D\uC744 \uBD99\uC5EC\uB123\uC73C\uC138\uC694\u2026" }), u ? t.jsx("p", { className: "text-xs font-medium text-rose-600", children: u }) : null, t.jsxs("div", { className: "flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-odp-borderSoft", children: [t.jsx(F, { type: "button", variant: "secondary", onClick: n, children: "\uCDE8\uC18C" }), t.jsxs(F, { type: "button", variant: "primary", onClick: () => g(false), children: [t.jsx(xn, { size: 14 }), "\uC801\uC6A9"] })] })] }) }), t.jsx(Jn, { isOpen: x, variant: "danger", title: "\uBB38\uD56D \uC804\uCCB4 \uAD50\uCCB4", message: "\uAE30\uC874 \uBB38\uD56D\uC744 \uBAA8\uB450 \uC9C0\uC6B0\uACE0 \uBD99\uC5EC\uB123\uC740 \uB0B4\uC6A9\uC73C\uB85C \uAD50\uCCB4\uD560\uAE4C\uC694? \uD480\uC774 \uC9C4\uD589 \uAE30\uB85D\uB3C4 \uCD08\uAE30\uD654\uB429\uB2C8\uB2E4.", confirmLabel: "\uAD50\uCCB4", cancelLabel: "\uCDE8\uC18C", onConfirm: () => {
    m(false), g(true);
  }, onCancel: () => m(false) })] });
}
function nr(e, n) {
  const s = [], r = (o) => {
    for (const a of o) if (a.type === "folder" && a.children) r(a.children);
    else if (a.type === "file") {
      if (!(a.path || a.name || "").toLowerCase().endsWith(".md") || n && a.path === n || ni(a.path) && n && a.path === n) continue;
      s.push(a);
    }
  };
  return r(e || []), s;
}
function tl({ isOpen: e, onClose: n, tree: s, selected: r, excludePath: o, onConfirm: a, onExpandFolder: c, onDropHostChange: f, onRegisterDropPathsMerge: u }) {
  const [d, x] = i.useState(r), [m, g] = i.useState(""), w = i.useMemo(() => Array.isArray(s) ? s : [], [s]);
  i.useEffect(() => {
    e && x(r);
  }, [e, r]);
  const v = i.useCallback((N) => {
    N.length && x((j) => {
      const b = new Set(j);
      for (const $ of N) b.add($);
      return [...b].sort(($, k) => $.localeCompare(k));
    });
  }, []);
  i.useEffect(() => (u == null ? void 0 : u(v), () => u == null ? void 0 : u(null)), [v, u]), i.useEffect(() => () => f == null ? void 0 : f(null), [f]);
  const y = i.useMemo(() => {
    var _a2;
    if (!m) return w;
    const N = (j) => {
      for (const b of j) {
        if (b.path === m) return b;
        if (b.children) {
          const $ = N(b.children);
          if ($) return $;
        }
      }
      return null;
    };
    return ((_a2 = N(w)) == null ? void 0 : _a2.children) || [];
  }, [w, m]), z = (N) => {
    x((j) => j.includes(N) ? j.filter((b) => b !== N) : [...j, N]);
  };
  return t.jsx(rs, { isOpen: e, onClose: n, contentClassName: "quiz-pane max-w-lg max-h-[90vh]", children: t.jsxs("div", { className: "flex max-h-[min(75vh,640px)] flex-col gap-3 p-4 text-sm", children: [t.jsx("h2", { className: "text-base font-bold text-gray-900 dark:text-odp-fgStrong", children: "\uADFC\uAC70 \uBB38\uC11C \uC120\uD0DD" }), t.jsx("p", { className: "text-xs text-gray-600 dark:text-odp-muted", children: "vault\uC758 `.md` \uD30C\uC77C\uC744 \uB2E4\uC911 \uC120\uD0DD\uD558\uAC70\uB098, \uC0AC\uC774\uB4DC\uBC14\uC5D0\uC11C \uB04C\uC5B4\uB2E4 \uB193\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (\uD604\uC7AC quiz \uD30C\uC77C\uC740 \uC81C\uC678)" }), m ? t.jsx("button", { type: "button", className: "text-left text-xs text-blue-600 hover:underline", onClick: () => {
    const N = m.replace(/\/$/, "").split("/").filter(Boolean);
    N.pop(), g(N.length ? `${N.join("/")}/` : "");
  }, children: "\u2190 \uC0C1\uC704 \uD3F4\uB354" }) : null, t.jsx("div", { ref: f, className: "relative min-h-48 flex-1", children: t.jsxs("ul", { className: "h-full min-h-48 space-y-1 overflow-y-auto rounded-lg border border-gray-200 p-2 dark:border-odp-borderSoft", children: [y.map((N) => {
    if (N.type === "folder") return t.jsx("li", { children: t.jsxs("button", { type: "button", className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg", onClick: async () => {
      await (c == null ? void 0 : c(N)), g(N.path.endsWith("/") ? N.path : `${N.path}/`);
    }, children: [t.jsx(ti, { size: 14 }), N.name] }) }, N.path);
    if (!(N.path || "").toLowerCase().endsWith(".md") || o && N.path === o) return null;
    const b = d.includes(N.path);
    return t.jsx("li", { children: t.jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg", children: [t.jsx("input", { type: "checkbox", checked: b, onChange: () => z(N.path) }), t.jsx("span", { className: "truncate", children: N.name })] }) }, N.path);
  }), y.length === 0 ? t.jsx("li", { className: "px-2 py-6 text-center text-xs text-gray-400", children: "\uD56D\uBAA9 \uC5C6\uC74C" }) : null] }) }), t.jsxs("p", { className: "text-[11px] text-gray-500 dark:text-odp-muted", children: [d.length, "\uAC1C \uC120\uD0DD\uB428", nr(w, o).length ? ` / vault md ${nr(w, o).length}\uAC1C` : ""] }), t.jsxs("div", { className: "flex justify-end gap-2", children: [t.jsx(F, { type: "button", variant: "secondary", onClick: n, children: "\uCDE8\uC18C" }), t.jsxs(F, { type: "button", variant: "primary", onClick: () => {
    a(d), n();
  }, children: [t.jsx(xn, { size: 14 }), "\uC801\uC6A9"] })] })] }) });
}
function nl(e) {
  switch (e) {
    case "running":
      return t.jsx(gn, { size: 13, className: "animate-spin text-violet-600 dark:text-violet-300" });
    case "done":
      return t.jsx($r, { size: 13, className: "text-emerald-600 dark:text-emerald-400" });
    case "error":
      return t.jsx(Be, { size: 13, className: "text-rose-600 dark:text-rose-400" });
    case "skipped":
      return t.jsx(Fi, { size: 13, className: "text-slate-400 dark:text-odp-muted" });
    default:
      return t.jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600", "aria-hidden": true });
  }
}
function Zt({ title: e, body: n }) {
  return n.trim() ? t.jsxs("div", { className: "space-y-1", children: [t.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-odp-muted", children: e }), t.jsx("pre", { className: "max-h-40 overflow-auto rounded border border-slate-200 bg-slate-50 p-2 font-mono text-[10px] leading-snug text-slate-800 dark:border-odp-borderSoft dark:bg-odp-bg dark:text-odp-fg", children: n })] }) : null;
}
function sl({ step: e }) {
  var _a2, _b, _c2, _d2;
  return !!((_a2 = e.systemPrompt) == null ? void 0 : _a2.trim()) || !!((_b = e.llmInstruction) == null ? void 0 : _b.trim()) || !!((_c2 = e.llmResponse) == null ? void 0 : _c2.trim()) || !!((_d2 = e.error) == null ? void 0 : _d2.trim()) ? t.jsxs("div", { className: "space-y-2", children: [t.jsx(Zt, { title: "System prompt", body: e.systemPrompt || "" }), t.jsx(Zt, { title: "Instruction / input", body: e.llmInstruction || "" }), t.jsx(Zt, { title: "Model response / artifact", body: e.llmResponse || "" }), e.error ? t.jsx(Zt, { title: "Error", body: e.error }) : null] }) : t.jsx("p", { className: "text-[10px] text-slate-400 dark:text-odp-muted", children: "\uC800\uC7A5\uB41C \uD504\uB86C\uD504\uD2B8/\uC751\uB2F5 \uC5C6\uC74C" });
}
function rl({ step: e, showDetail: n }) {
  const s = e.error || e.detail;
  return t.jsxs("li", { className: "space-y-1.5 py-0.5", children: [t.jsxs("div", { className: "flex items-start gap-2", children: [t.jsx("span", { className: "mt-0.5 shrink-0", children: nl(e.status) }), t.jsxs("div", { className: "min-w-0 flex-1", children: [t.jsxs("p", { className: `text-[11px] font-medium leading-snug ${e.status === "error" ? "text-rose-700 dark:text-rose-300" : e.status === "skipped" ? "text-slate-400 dark:text-odp-muted" : "text-slate-700 dark:text-odp-fg"}`, children: [e.label, e.status === "running" ? t.jsx("span", { className: "ml-1 font-normal text-violet-600 dark:text-violet-300", children: "\uC9C4\uD589 \uC911" }) : null] }), s ? t.jsx("p", { className: `mt-0.5 truncate text-[10px] leading-snug ${e.status === "error" ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-odp-muted"}`, title: s, children: s }) : null] })] }), n ? t.jsx("div", { className: "ml-5 rounded-md border border-slate-100 bg-slate-50/80 p-2 dark:border-odp-borderSoft dark:bg-odp-bg/60", children: t.jsx(sl, { step: e }) }) : null] });
}
function ol({ job: e, detailOpen: n, onToggleDetail: s, onRemove: r }) {
  const o = e.kind === "similar" ? "\uC720\uC0AC\uBB38\uC81C" : e.kind === "derived" ? "\uD30C\uC0DD\uBB38\uC81C" : "\uADFC\uAC70 \uCD9C\uC81C", a = e.kind === "similar" ? t.jsx(Et, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-300" }) : e.kind === "derived" ? t.jsx(as, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-300" }) : t.jsx(Qe, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-300" });
  return t.jsxs("article", { className: `rounded-lg border px-2.5 py-2 ${e.status === "error" ? "border-rose-200 bg-rose-50/80 dark:border-rose-900/50 dark:bg-rose-950/30" : e.status === "done" ? "border-emerald-200/80 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20" : "border-slate-200 bg-white/90 dark:border-odp-borderSoft dark:bg-odp-bgSoft/90"}`, children: [t.jsxs("div", { className: "mb-1.5 flex items-start gap-2", children: [a, t.jsxs("div", { className: "min-w-0 flex-1", children: [t.jsxs("p", { className: "text-xs font-bold text-slate-900 dark:text-odp-fgStrong", children: [o, e.questionLabel ? t.jsxs("span", { className: "font-semibold text-violet-700 dark:text-violet-300", children: [" ", "\xB7 ", e.questionLabel] }) : null, e.status === "running" ? t.jsx("span", { className: "ml-1 text-[10px] font-medium text-violet-600 dark:text-violet-300", children: "\uC9C4\uD589 \uC911" }) : null, e.status === "done" && e.resultLabel ? t.jsxs("span", { className: "ml-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-300", children: ["\u2192 ", e.resultLabel] }) : null] }), t.jsx("p", { className: "truncate text-[11px] text-slate-600 dark:text-odp-muted", title: e.questionPreview, children: e.questionPreview }), e.status === "error" && e.error ? t.jsx("p", { className: "mt-1 text-[10px] leading-snug text-rose-700 dark:text-rose-300", children: e.error }) : null, e.logPath ? t.jsxs("p", { className: "mt-1 truncate font-mono text-[10px] text-slate-500 dark:text-odp-muted", title: e.logPath, children: ["log: ", e.logPath] }) : null] }), t.jsxs("div", { className: "flex shrink-0 flex-col gap-0.5", children: [t.jsx("button", { type: "button", onClick: s, className: "rounded p-1 text-slate-500 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-expanded": n, "aria-label": n ? "\uC790\uC138\uD788 \uBCF4\uAE30 \uC811\uAE30" : "\uC790\uC138\uD788 \uBCF4\uAE30", children: n ? t.jsx(Js, { size: 14 }) : t.jsx(Yn, { size: 14 }) }), e.status !== "running" ? t.jsx("button", { type: "button", onClick: r, className: "rounded p-1 text-slate-500 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": "\uBAA9\uB85D\uC5D0\uC11C \uC81C\uAC70", children: t.jsx(Be, { size: 14 }) }) : null] })] }), t.jsx("div", { className: "mb-1.5 flex justify-end", children: t.jsxs(F, { type: "button", variant: "tertiary", size: "sm", onClick: s, children: [n ? t.jsx(Js, { size: 14 }) : t.jsx(Yn, { size: 14 }), n ? "\uC811\uAE30" : "\uC790\uC138\uD788 \uBCF4\uAE30"] }) }), t.jsx("ul", { className: "space-y-0.5 border-t border-slate-100 pt-1.5 dark:border-odp-borderSoft", children: e.steps.map((c) => t.jsx(rl, { step: c, showDetail: n }, c.id)) })] });
}
function il({ jobs: e, isOpen: n, size: s, onClose: r, onResize: o, onRemoveJob: a, onClearFinished: c, onUserEngage: f, onPointerEngageChange: u, onFocusEngageChange: d }) {
  const x = i.useRef(null), [m, g] = i.useState({}), w = i.useRef({ mode: null, startX: 0, startY: 0, startW: 0, startH: 0 }), v = (k) => {
    g((S) => {
      const I = { ...S };
      return I[k] ? delete I[k] : I[k] = true, I;
    });
  }, y = i.useCallback((k, S) => {
    S.preventDefault(), S.stopPropagation(), w.current = { mode: k, startX: S.clientX, startY: S.clientY, startW: s.width, startH: s.height };
    const I = (B) => {
      const T = w.current;
      if (!T.mode) return;
      const O = T.startX - B.clientX, _ = T.startY - B.clientY;
      let J = T.startW, V = T.startH;
      (T.mode === "width" || T.mode === "both") && (J = T.startW + O), (T.mode === "height" || T.mode === "both") && (V = T.startH + _), o({ width: J, height: V });
    }, M = () => {
      w.current.mode = null, document.removeEventListener("pointermove", I), document.removeEventListener("pointerup", M);
    };
    document.addEventListener("pointermove", I), document.addEventListener("pointerup", M);
  }, [o, s.height, s.width]), z = e.filter((k) => k.status === "running").length, N = e.filter((k) => k.status === "done").length, j = e.filter((k) => k.status === "error").length, b = e.some((k) => k.status !== "running"), $ = ya();
  return t.jsx(cn, { children: n ? t.jsxs(We.div, { ref: x, role: "dialog", "aria-modal": "false", "aria-label": "\uBB38\uC81C \uC0DD\uC131 \uB300\uAE30\uC5F4", className: "fixed bottom-4 right-4 z-10050 flex flex-col overflow-hidden rounded-xl border border-violet-300/60 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-800/50 dark:bg-odp-bgSoft/95", style: { width: s.width, height: s.height }, initial: $.initial, animate: $.animate, exit: $.exit, transition: $.transition, onMouseEnter: () => u == null ? void 0 : u(true), onMouseLeave: () => u == null ? void 0 : u(false), onFocusCapture: () => d == null ? void 0 : d(true), onBlurCapture: (k) => {
    k.currentTarget.contains(k.relatedTarget) || (d == null ? void 0 : d(false));
  }, onPointerDown: () => f == null ? void 0 : f(), children: [t.jsx("div", { className: "absolute left-0 top-0 z-20 h-3 w-3 cursor-nwse-resize touch-none", "aria-hidden": true, onPointerDown: (k) => y("both", k) }), t.jsx("div", { className: "absolute left-0 right-0 top-0 z-10 h-2 cursor-ns-resize touch-none", "aria-hidden": true, onPointerDown: (k) => y("height", k) }), t.jsx("div", { className: "absolute bottom-0 left-0 top-0 z-10 w-2 cursor-ew-resize touch-none", "aria-hidden": true, onPointerDown: (k) => y("width", k) }), t.jsxs("div", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-violet-200/70 bg-violet-50/90 px-3 py-2 dark:border-violet-900/40 dark:bg-violet-950/40", children: [t.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-950 dark:text-violet-100", children: [t.jsx(Di, { size: 16, className: "shrink-0 opacity-50", "aria-hidden": true }), t.jsx(Qe, { size: 16, className: "shrink-0", "aria-hidden": true }), t.jsx("span", { className: "truncate", children: "\uBB38\uC81C \uC0DD\uC131 \uB300\uAE30\uC5F4" })] }), t.jsx("button", { type: "button", onClick: r, className: "rounded p-1 text-violet-900 hover:bg-violet-100 dark:text-violet-100 dark:hover:bg-violet-900/50", "aria-label": "\uD328\uB110 \uB2EB\uAE30", children: t.jsx(Be, { size: 15 }) })] }), t.jsx("div", { className: "shrink-0 border-b border-slate-200/80 px-3 py-1.5 text-[11px] text-slate-600 dark:border-odp-borderSoft dark:text-odp-muted", children: e.length === 0 ? "\uC9C4\uD589 \uC911\uC778 \uC0DD\uC131 \uC791\uC5C5\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" : `\uC9C4\uD589 ${z} \xB7 \uC644\uB8CC ${N}${j > 0 ? ` \xB7 \uC2E4\uD328 ${j}` : ""}` }), t.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-3", children: e.length === 0 ? t.jsxs("p", { className: "py-6 text-center text-xs text-slate-500 dark:text-odp-muted", children: ["\uC720\uC0AC\uBB38\uC81C \uB610\uB294 \uADFC\uAC70 \uCD9C\uC81C\xB7\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131\uC744 \uC2E4\uD589\uD558\uBA74", t.jsx("br", {}), "\uB2E8\uACC4\uBCC4 \uC9C4\uD589 \uC0C1\uD669\uC774 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4."] }) : t.jsx("ul", { className: "space-y-2", children: e.map((k) => t.jsx("li", { children: t.jsx(ol, { job: k, detailOpen: !!m[k.id], onToggleDetail: () => v(k.id), onRemove: () => a(k.id) }) }, k.id)) }) }), t.jsxs("div", { className: "flex shrink-0 justify-end gap-2 border-t border-slate-200/80 px-3 py-2 dark:border-odp-borderSoft", children: [b ? t.jsxs(F, { type: "button", variant: "tertiary", size: "sm", onClick: c, children: [t.jsx(Be, { size: 14 }), "\uC644\uB8CC \uD56D\uBAA9 \uBE44\uC6B0\uAE30"] }) : null, t.jsxs(F, { type: "button", variant: "secondary", size: "sm", onClick: r, children: [t.jsx(xn, { size: 14 }), "\uB2EB\uAE30"] })] })] }, "quiz-gen-queue-panel") : null });
}
const Yt = "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function al({ stopwatch: e, onRequestStart: n }) {
  const { displayMs: s, running: r, started: o, start: a, pause: c, resume: f, stop: u } = e, d = n ?? a;
  return o ? t.jsx(It, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs("div", { className: "flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: [t.jsx(Hs, { size: 14, className: `shrink-0 ${r ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500"}`, "aria-hidden": true }), t.jsx("span", { className: `min-w-[3.25rem] font-mono text-sm font-bold tabular-nums ${r ? "text-emerald-700 dark:text-emerald-300" : "text-slate-700 dark:text-odp-fgStrong"}`, "aria-live": "polite", children: Hn(s) }), r ? t.jsxs(Ie, { children: [t.jsx(Re, { asChild: true, children: t.jsx(F, { type: "button", variant: "secondary", size: "sm", onClick: c, "aria-label": "\uC77C\uC2DC\uC815\uC9C0", children: t.jsx(Bi, { size: 14 }) }) }), t.jsx(Me, { children: t.jsxs(Ae, { side: "bottom", sideOffset: 6, className: Yt, children: ["\uC77C\uC2DC\uC815\uC9C0", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : t.jsxs(Ie, { children: [t.jsx(Re, { asChild: true, children: t.jsx(F, { type: "button", variant: "secondary", size: "sm", onClick: f, "aria-label": "\uC7AC\uAC1C", children: t.jsx(qi, { size: 14 }) }) }), t.jsx(Me, { children: t.jsxs(Ae, { side: "bottom", sideOffset: 6, className: Yt, children: ["\uC7AC\uAC1C", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }), t.jsxs(Ie, { children: [t.jsx(Re, { asChild: true, children: t.jsx(F, { type: "button", variant: "tertiary", size: "sm", onClick: u, "aria-label": "\uC815\uC9C0", children: t.jsx(Ui, { size: 14 }) }) }), t.jsx(Me, { children: t.jsxs(Ae, { side: "bottom", sideOffset: 6, className: Yt, children: ["\uC815\uC9C0", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }) }) : t.jsx(It, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs(Ie, { children: [t.jsx(Re, { asChild: true, children: t.jsxs(F, { type: "button", variant: "secondary", size: "sm", onClick: d, children: [t.jsx(Hs, { size: 14 }), t.jsx("span", { className: "hidden md:inline", children: "\uC2DC\uD5D8 \uC2A4\uD1B1\uC6CC\uCE58" })] }) }), t.jsx(Me, { children: t.jsxs(Ae, { side: "bottom", sideOffset: 6, className: Yt, children: ["\uC2DC\uD5D8 \uC2DC\uAC04 \uCE21\uC815 \uC2DC\uC791", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }) });
}
function ll({ log: e }) {
  const n = (e == null ? void 0 : e.events) ?? [], s = (e == null ? void 0 : e.questionEntries) ?? [], r = i.useMemo(() => {
    const o = [...n.map((a) => ({ kind: "event", at: a.at, data: a })), ...s.map((a) => ({ kind: "question", at: a.at, data: a }))];
    return o.sort((a, c) => a.at.localeCompare(c.at)), o;
  }, [n, s]);
  return r.length ? t.jsxs("div", { className: "space-y-2 border-t border-slate-100 pt-3 dark:border-odp-borderSoft", children: [t.jsx("h4", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uD480\uC774 \uC2DC\uAC04 \uAE30\uB85D" }), t.jsx("ol", { className: "max-h-40 space-y-1 overflow-y-auto text-[11px] text-slate-600 dark:text-odp-muted", children: r.map((o, a) => {
    if (o.kind === "event") {
      const f = o.data;
      return t.jsxs("li", { className: "font-mono leading-relaxed", children: [t.jsx("span", { className: "text-slate-500 dark:text-odp-muted", children: Qn(f.at) }), " \xB7 ", t.jsx("span", { className: "font-semibold text-slate-700 dark:text-odp-fgStrong", children: si[f.type] }), " \xB7 ", t.jsx("span", { className: "tabular-nums text-blue-600 dark:text-blue-400", children: Hn(f.elapsedMs) })] }, `ev-${f.at}-${f.type}-${a}`);
    }
    const c = o.data;
    return t.jsxs("li", { className: "font-mono leading-relaxed", children: [t.jsx("span", { className: "text-slate-500 dark:text-odp-muted", children: Qn(c.at) }), " \xB7 ", t.jsxs("span", { className: "font-semibold text-violet-700 dark:text-violet-300", children: ["\uBB38\uC81C ", c.displayLabel] }), " \xB7 ", t.jsx("span", { className: "tabular-nums text-blue-600 dark:text-blue-400", children: Hn(c.durationMs) }), t.jsxs("span", { className: "text-slate-400 dark:text-odp-muted", children: [" ", "(~", Qn(c.endedAt), ")"] })] }, `q-${c.questionId}-${c.at}-${a}`);
  }) })] }) : null;
}
const cl = "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", dl = "\uC2DC\uD5D8\uC774 \uB05D\uB09C \uB4A4\uC5D0 \uC804\uCCB4 \uCC44\uC810\uC744 \uD574\uC8FC\uC138\uC694";
function sr({ examInProgress: e, disabled: n, children: s, ...r }) {
  const o = !!n || e, a = t.jsx(F, { type: "button", ...r, disabled: o, children: s });
  return e ? t.jsxs(Ie, { children: [t.jsx(Re, { asChild: true, children: t.jsx("span", { className: "inline-flex", children: a }) }), t.jsx(Me, { children: t.jsxs(Ae, { side: "top", sideOffset: 6, className: cl, children: [dl, t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : a;
}
const at = `You analyze exam multiple-choice items for similar-question generation.
Return JSON only. No markdown fences or extra text.

Schema:
{
  "coreCategory": "one-line core concept / topic category",
  "isCalculation": boolean,
  "variables": [
    {
      "id": "short id",
      "description": "what the parameter represents",
      "originalValue": number or string,
      "min": number,
      "max": number,
      "step": number (optional, default 1 for numeric),
      "unit": "optional unit label"
    }
  ]
}

Rules:
- coreCategory: the essential knowledge domain (not the full question text).
- isCalculation: true when solving requires numeric computation or formula application.
- When isCalculation is false, variables should be [].
- When isCalculation is true, list every key numeric/parameter value in the stem and options that should vary.
- min/max must be a plausible variation range that still keeps the item solvable; include originalValue within [min,max].
- Use numeric min/max/step for quantities; originalValue may be string only for non-numeric labels (then min/max may be ignored).`;
function Tr(e) {
  return e && typeof e == "object" ? e : {};
}
function ul(e) {
  if (typeof e == "number" && Number.isFinite(e)) return e;
  if (typeof e == "string" && e.trim()) return e.trim();
  const n = Number(e);
  return Number.isFinite(n) ? n : String(e ?? "").trim();
}
function fl(e, n) {
  const s = Tr(e), r = String(s.id || s.name || `var${n + 1}`).trim();
  if (!r) return null;
  const o = String(s.description || s.label || r).trim() || r, a = ul(s.originalValue ?? s.value), c = Number(s.min), f = Number(s.max), u = Number.isFinite(c) ? c : 0, d = Number.isFinite(f) ? f : u, x = Number(s.step), m = Number.isFinite(x) && x > 0 ? x : 1, g = typeof s.unit == "string" && s.unit.trim() ? s.unit.trim() : void 0;
  return { id: r, description: o, originalValue: a, min: u, max: d, step: m, ...g ? { unit: g } : {} };
}
function _r(e) {
  const n = Tr(e), s = String(n.coreCategory || n.category || n.topic || "").trim() || "general concept", r = !!(n.isCalculation ?? n.isCalc ?? n.calculation), a = (Array.isArray(n.variables) ? n.variables : []).map((c, f) => fl(c, f)).filter((c) => c != null);
  return { coreCategory: s, isCalculation: r, variables: r ? a : [] };
}
function ml(e, n, s, r) {
  const o = Math.min(e, n), a = Math.max(e, n), c = s > 0 ? s : 1, f = Math.floor((a - o) / c);
  if (f < 0 || f === 0) return o;
  let u = o, d = 0;
  do {
    const x = Math.floor(Math.random() * (f + 1));
    u = o + x * c, d += 1;
  } while (d < 24 && typeof r == "number" && Number.isFinite(r) && u === r && f > 0);
  return u;
}
function Dr(e) {
  return e.map((n) => {
    if (typeof n.originalValue == "number" && Number.isFinite(n.originalValue)) {
      const s = ml(n.min, n.max, n.step ?? 1, n.originalValue);
      return { id: n.id, description: n.description, value: s, originalValue: n.originalValue, ...n.unit ? { unit: n.unit } : {} };
    }
    return { id: n.id, description: n.description, value: n.originalValue, originalValue: n.originalValue, ...n.unit ? { unit: n.unit } : {} };
  });
}
function lt(e) {
  const n = ["[\uBB38\uD56D \uBD84\uC11D \uACB0\uACFC]", `\uD575\uC2EC \uBC94\uC8FC: ${e.coreCategory}`, `\uACC4\uC0B0 \uBB38\uC81C: ${e.isCalculation ? "\uC608" : "\uC544\uB2C8\uC624"}`];
  if (e.isCalculation && e.variables.length > 0) {
    n.push("\uD575\uC2EC \uBCC0\uC218:");
    for (const s of e.variables) {
      const r = s.unit ? ` ${s.unit}` : "";
      n.push(`- ${s.id} (${s.description}): \uC6D0\uBCF8=${String(s.originalValue)}${r}, \uBC94\uC704=${s.min}~${s.max}, step=${s.step ?? 1}`);
    }
  }
  return n.join(`
`);
}
function Fr(e) {
  if (!e.length) return "";
  const n = ["[\uBB34\uC791\uC704 \uC0D8\uD50C\uB9C1 \uBCC0\uC218 \u2014 \uC2E0\uADDC \uBB38\uD56D\uC5D0 \uBC18\uB4DC\uC2DC \uBC18\uC601]"];
  for (const s of e) {
    const r = s.unit ? ` ${s.unit}` : "";
    n.push(`- ${s.id} (${s.description}): ${String(s.value)}${r} (\uC6D0\uBCF8: ${String(s.originalValue)}${r})`);
  }
  return n.join(`
`);
}
const pl = ["\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694.", "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694."], xl = ["\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."], gl = 12, hl = 24;
function dt(e) {
  const n = String(e || "").trim();
  return !n || n.length < gl ? true : pl.some((s) => n === s);
}
function ut(e) {
  const n = String(e || "").trim();
  return !n || n.length < hl ? true : xl.some((s) => n === s);
}
function mn(e) {
  return !dt(String(e.point || "")) && !ut(String(e.explanation || ""));
}
function Br(e) {
  return `${String(e || "").trim()}

[\uC720\uC0AC\uBB38\uD56D \uC0DD\uC131 \u2014 \uD544\uC218]
- \uC2E0\uADDC \uBB38\uD56D\uB9C8\uB2E4 point(\uC811\uADFC Point)\uC640 explanation(\uD574\uC124)\uC744 \uBC18\uB4DC\uC2DC \uD568\uAED8 \uC791\uC131\uD569\uB2C8\uB2E4. \uB458 \uC911 \uD558\uB098\uB77C\uB3C4 \uBE44\uC6B0\uAC70\uB098 placeholder\uB85C \uCC44\uC6B0\uBA74 \uC548 \uB429\uB2C8\uB2E4.
- point: \uC2E0\uADDC \uBB38\uD56D\uC758 \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C \uC791\uC131\uD569\uB2C8\uB2E4(1~3\uAC1C \uBD88\uB9BF \uB610\uB294 1~2\uBB38\uC7A5).
  - \uC218\uD5D8\uC790\uAC00 \uC720\uC0AC\uD55C \uB2E4\uB978 \uBB38\uC81C\uB97C \uB9CC\uB098\uB354\uB77C\uB3C4, \uBB34\uC5C7\uC744 \uBA3C\uC800 \uD310\uBCC4\xB7\uC5F0\uACB0\xB7\uAC80\uD1A0\uD574\uC57C \uD558\uB294\uC9C0 \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC \uC9DA\uC2B5\uB2C8\uB2E4.
  - \uC804\uCCB4 \uD480\uC774 \uACFC\uC815\uC774\uB098 \uC815\uB2F5\uC744 \uADF8\uB300\uB85C \uB178\uCD9C\uD558\uC9C0 \uB9C8\uC138\uC694.
- explanation: \uC815\uB2F5 \uADFC\uAC70, \uC624\uB2F5 \uD568\uC815, \uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124\uC744 \uC791\uC131\uD569\uB2C8\uB2E4. \uB9C8\uD06C\uB2E4\uC6B4 \uC0AC\uC6A9 \uAC00\uB2A5.
- \uC6D0\uBCF8 \uBB38\uD56D\uC758 point/\uD574\uC124\uC744 \uADF8\uB300\uB85C \uBCF5\uC0AC\uD558\uC9C0 \uB9D0\uACE0, \uC2E0\uADDC \uBB38\uD56D\xB7\uC120\uD0DD\uC9C0\xB7\uC815\uB2F5\uC5D0 \uB9DE\uAC8C \uC0C8\uB85C \uC791\uC131\uD569\uB2C8\uB2E4.
- options \uAC01 \uD56D\uBAA9\uC5D0\uB294 \uBCF4\uAE30 \uBC88\uD638 \uC811\uB450\uC0AC(1., 2., a., \uAC00. \uB4F1)\uB97C \uB123\uC9C0 \uB9C8\uC138\uC694. \uC120\uD0DD\uC9C0 \uBCF8\uBB38\uB9CC \uC791\uC131\uD569\uB2C8\uB2E4.`;
}
function qr(e) {
  var _a2;
  const n = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), s = String(e.explanation || "").trim();
  return `${n ? `[\uADFC\uAC70 \uBC1C\uCDCC]
${n}

\uBC1C\uCDCC \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.

` : ""}[\uC6D0\uBCF8 \uBB38\uC81C]
\uC9C8\uBB38: ${e.question}
\uBCF4\uAE30: ${e.options.map((r, o) => `${o + 1}. ${r}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88
\uC811\uADFC Point: ${e.point || ""}
${s ? `\uD574\uC124: ${s}
` : ""}
\uC704 \uBB38\uD56D\uC744 \uBD84\uC11D\uD558\uC5EC JSON \uC2A4\uD0A4\uB9C8\uC5D0 \uB9DE\uAC8C\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
}
function bl(e) {
  var _a2;
  const n = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), s = String(e.explanation || "").trim();
  return `${n ? `[\uADFC\uAC70 \uBC1C\uCDCC]
${n}

\uBC1C\uCDCC \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.

` : ""}[\uC6D0\uBCF8 \uBB38\uC81C]
\uC9C8\uBB38: ${e.question}
\uBCF4\uAE30: ${e.options.map((r, o) => `${o + 1}. ${r}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88
\uC811\uADFC Point: ${e.point || ""}
${s ? `\uD574\uC124: ${s}
` : ""}
${e.analysisBlock}

${e.sampledBlock}

${e.complexity}
\uBCF4\uAE30 \uAC1C\uC218: ${e.choiceCount}
\uC774\uBC88 \uC2E0\uADDC \uBB38\uC81C\uC758 \uC815\uB2F5 \uBC88\uD638\uB294 \uBC18\uB4DC\uC2DC ${e.targetAnswer}\uBC88\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.

\uB3D9\uC77C\uD55C \uD575\uC2EC \uBC94\uC8FC \uB0B4\uC5D0\uC11C \uC6D0\uBCF8\uACFC \uB2E4\uB978 \uC218\uCE58/\uC0AC\uB840/\uD45C\uD604\uC758 \uC720\uC0AC \uBB38\uD56D\uC744 \uC791\uC131\uD558\uC138\uC694.

[\uD544\uC218 \u2014 point / explanation]
- JSON\uC758 point\uC640 explanation\uC744 \uBC18\uB4DC\uC2DC \uD568\uAED8 \uCC44\uC6B0\uC138\uC694. \uB458 \uC911 \uD558\uB098\uB77C\uB3C4 \uBE44\uC6B0\uBA74 \uC548 \uB429\uB2C8\uB2E4.
- point(\uC811\uADFC Point): \uC2E0\uADDC \uBB38\uD56D\uC758 \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C \uC791\uC131\uD558\uC138\uC694.
  - \uC218\uD5D8\uC790\uAC00 \uC720\uC0AC\uD55C \uB2E4\uB978 \uBB38\uC81C\uB97C \uB9CC\uB098\uB354\uB77C\uB3C4 \uBB34\uC5C7\uC744 \uBA3C\uC800 \uD310\uBCC4\xB7\uC5F0\uACB0\xB7\uAC80\uD1A0\uD574\uC57C \uD558\uB294\uC9C0 \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC 1~3\uAC1C \uBD88\uB9BF(\uB610\uB294 1~2\uBB38\uC7A5)\uC73C\uB85C \uC81C\uC2DC\uD558\uC138\uC694.
  - \uC804\uCCB4 \uD480\uC774\uB098 \uC815\uB2F5\uC744 \uADF8\uB300\uB85C \uC801\uC9C0 \uB9C8\uC138\uC694. \uC6D0\uBCF8 \uC811\uADFC Point\uB97C \uBCF5\uC0AC\uD558\uC9C0 \uB9C8\uC138\uC694.
- explanation(\uD574\uC124): \uC815\uB2F5 \uADFC\uAC70, \uC624\uB2F5 \uD568\uC815, \uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124\uC744 \uC791\uC131\uD558\uC138\uC694.
- \uC6D0\uBCF8 \uD574\uC124/\uC811\uADFC Point\uB97C \uADF8\uB300\uB85C \uBCF5\uC0AC\uD558\uC9C0 \uB9D0\uACE0, \uC2E0\uADDC \uBB38\uD56D\xB7\uC120\uD0DD\uC9C0\xB7\uC815\uB2F5\uC5D0 \uB9DE\uAC8C \uC0C8\uB85C \uC791\uC131\uD558\uC138\uC694.
- options \uAC01 \uD56D\uBAA9\uC5D0\uB294 1., a. \uAC19\uC740 \uBC88\uD638\xB7\uAE30\uD638 \uC811\uB450\uC0AC \uC5C6\uC774 \uC120\uD0DD\uC9C0 \uBCF8\uBB38\uB9CC \uC791\uC131\uD558\uC138\uC694.

JSON\uB9CC \uBC18\uD658:
{"question":"...","options":[${Array.from({ length: e.choiceCount }, () => '"..."').join(",")}],"answer":${e.targetAnswer},"point":"...","explanation":"..."}`;
}
function Ur(e) {
  const n = [];
  return e.missingPoint && n.push("point(\uC811\uADFC Point)"), e.missingExplanation && n.push("explanation(\uD574\uC124)"), `[\uC2E0\uADDC \uC720\uC0AC \uBB38\uD56D]
\uC9C8\uBB38: ${e.question}
\uBCF4\uAE30: ${e.options.map((s, r) => `${r + 1}. ${s}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88

${e.analysisBlock}

\uC704 \uBB38\uD56D\uC5D0 \uB300\uD574 \uB204\uB77D\uB41C ${n.join(" \uBC0F ")}\uC744(\uB97C) \uC791\uC131\uD558\uC138\uC694.
- point: \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C(1~3\uAC1C \uBD88\uB9BF \uB610\uB294 1~2\uBB38\uC7A5). \uC720\uC0AC \uC720\uD615\uC5D0\uC11C \uBB34\uC5C7\uC744 \uBA3C\uC800 \uC0DD\uAC01\uD574\uC57C \uD558\uB294\uC9C0 \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC.
- explanation: \uC815\uB2F5 \uADFC\uAC70\xB7\uD568\uC815\xB7\uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124.

JSON\uB9CC \uBC18\uD658:
{"point":"...","explanation":"..."}`;
}
function kl(e) {
  var _a2;
  const n = e.question, s = [];
  e.missingPoint && s.push("point(\uC811\uADFC Point)"), e.missingExplanation && s.push("explanation(\uD574\uC124)");
  let r = "";
  if (n.kind === "choice") {
    const f = n.options || [];
    r = `\uC9C8\uBB38: ${n.question}
\uBCF4\uAE30: ${f.map((u, d) => `${d + 1}. ${u}`).join(" | ")}
\uC815\uB2F5: ${n.answer ?? 1}\uBC88`;
  } else r = `\uC9C8\uBB38: ${n.question}
${n.modelAnswer ? `\uBAA8\uBC94 \uB2F5\uC548: ${n.modelAnswer}
` : ""}`;
  const o = [];
  !e.missingPoint && String(n.point || "").trim() && o.push(`\uC811\uADFC Point: ${n.point}`), !e.missingExplanation && String(n.explanation || "").trim() && o.push(`\uD574\uC124: ${n.explanation}`);
  const a = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), c = o.length > 0 ? `
[\uAE30\uC874 \uB0B4\uC6A9 \u2014 \uADF8\uB300\uB85C \uC720\uC9C0]
${o.join(`
`)}
` : "";
  return `${a ? `[\uADFC\uAC70 \uBC1C\uCDCC]
${a}

\uBC1C\uCDCC \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.

` : ""}[\uBB38\uD56D]
${r}
${c}
\uC704 \uBB38\uD56D\uC5D0 \uB300\uD574 \uB204\uB77D\uB41C ${s.join(" \uBC0F ")}\uC744(\uB97C) \uC791\uC131\uD558\uC138\uC694.
- point: \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C(1~3\uAC1C \uBD88\uB9BF \uB610\uB294 1~2\uBB38\uC7A5). \uC720\uC0AC \uC720\uD615\uC5D0\uC11C \uBB34\uC5C7\uC744 \uBA3C\uC800 \uC0DD\uAC01\uD574\uC57C \uD558\uB294\uC9C0 \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC. \uC804\uCCB4 \uD480\uC774\uB098 \uC815\uB2F5\uC744 \uADF8\uB300\uB85C \uB178\uCD9C\uD558\uC9C0 \uB9C8\uC138\uC694.
- explanation: \uC815\uB2F5 \uADFC\uAC70\xB7\uD568\uC815\xB7\uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124. \uB9C8\uD06C\uB2E4\uC6B4 \uC0AC\uC6A9 \uAC00\uB2A5.

JSON\uB9CC \uBC18\uD658:
{"point":"...","explanation":"..."}`;
}
function wl({ question: e, busyKey: n, showContent: s = true, onGenerate: r }) {
  const o = dt(e.point || ""), a = ut(e.explanation || ""), c = o || a;
  if (!s && !c) return null;
  const f = `sections-${e.id}`, u = n === f, d = c ? t.jsxs("div", { className: "flex justify-end gap-2", children: [o && a ? t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: u, onClick: () => r("both"), children: [t.jsx(Qe, { size: 14 }), u ? "\uC0DD\uC131 \uC911\u2026" : "\uC811\uADFC Point\xB7\uD574\uC124 \uC0DD\uC131"] }) : null, o && !a ? t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: u, onClick: () => r("point"), children: [t.jsx(Qe, { size: 14 }), u ? "\uC0DD\uC131 \uC911\u2026" : "\uC811\uADFC Point \uC0DD\uC131"] }) : null, a && !o ? t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: u, onClick: () => r("explanation"), children: [t.jsx(Qe, { size: 14 }), u ? "\uC0DD\uC131 \uC911\u2026" : "\uD574\uC124 \uC0DD\uC131"] }) : null] }) : null;
  return s ? t.jsxs("div", { className: "mt-2 flex flex-col space-y-2 rounded-xl bg-slate-50 p-3 text-xs dark:bg-odp-bgSoft", children: [t.jsx("div", { className: "font-bold text-slate-800 dark:text-odp-fgStrong", children: "\uC811\uADFC Point \xB7 \uD574\uC124" }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 font-bold text-amber-800", children: "\uC811\uADFC Point!" }), o ? t.jsx("p", { className: "text-[11px] italic text-slate-500 dark:text-odp-muted", children: "\uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }) : t.jsx(_e, { text: e.point, previewId: `qp-${e.id}` })] }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 font-bold text-slate-800 dark:text-odp-fgStrong", children: "\uD574\uC124" }), a ? t.jsx("p", { className: "text-[11px] italic text-slate-500 dark:text-odp-muted", children: "\uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }) : t.jsx(_e, { text: e.explanation, previewId: `qe-${e.id}` })] }), e.kind === "subjective" && e.modelAnswer ? t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 font-bold", children: "\uBAA8\uBC94 \uB2F5\uC548" }), t.jsx(_e, { text: e.modelAnswer, previewId: `qm-${e.id}` })] }) : null, d] }) : t.jsxs("div", { className: "mt-3 flex flex-col rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950 dark:border-amber-800/70 dark:bg-amber-950/45 dark:text-amber-100", children: [t.jsx("div", { className: "mb-2 font-bold text-amber-800 dark:text-amber-200", children: "\uC811\uADFC Point \xB7 \uD574\uC124" }), t.jsx("p", { className: "mb-3 text-[11px] text-amber-700/90 dark:text-amber-200/80", children: o && a ? "\uC811\uADFC Point\uC640 \uD574\uC124\uC774 \uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." : o ? "\uC811\uADFC Point\uAC00 \uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." : "\uD574\uC124\uC774 \uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }), d] });
}
const yl = "relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-400 data-[state=checked]:border-rose-500 data-[state=checked]:bg-rose-500 data-[state=checked]:text-white border-rose-200 bg-white text-rose-800 hover:bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-100 dark:hover:bg-rose-950/50 dark:data-[state=checked]:border-rose-500 dark:data-[state=checked]:bg-rose-600", vl = "relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100 dark:hover:bg-emerald-950/50 dark:data-[state=checked]:border-emerald-500 dark:data-[state=checked]:bg-emerald-600";
function Sl({ question: e, focusOption: n, onFocusOptionChange: s, wrongExps: r, busyKey: o, onOpenAnalysisDock: a }) {
  var _a2;
  const c = ((_a2 = e.options) == null ? void 0 : _a2.length) || 0;
  if (c <= 0) return null;
  const f = Ze(e.id, n), u = r[f], d = u !== void 0, x = o === f, m = n === e.answer, g = m ? "\uC815\uB2F5 \uBD84\uC11D" : "\uC624\uB2F5 \uBD84\uC11D", w = m ? "mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/45 dark:text-emerald-100" : "mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100", v = m ? "font-bold text-emerald-800 dark:text-emerald-200" : "font-bold text-rose-800 dark:text-rose-200", y = m ? "text-[11px] font-semibold text-emerald-700 dark:text-emerald-200" : "text-[11px] font-semibold text-rose-700 dark:text-rose-200", z = m ? "text-[11px] text-emerald-700/90 dark:text-emerald-200/80" : "text-[11px] text-rose-700/90 dark:text-rose-200/80", N = m ? "text-[10px] font-medium text-emerald-500 dark:text-emerald-300" : "text-[10px] font-medium text-rose-500 dark:text-rose-300", j = m ? "bg-emerald-500 dark:bg-emerald-300" : "bg-rose-500 dark:bg-rose-300", b = m ? "ring-emerald-50 dark:ring-emerald-950" : "ring-rose-50 dark:ring-rose-950";
  return t.jsxs("div", { className: w, children: [t.jsxs("div", { className: "mb-2 flex flex-wrap items-center justify-between gap-2", children: [t.jsx("div", { className: v, children: g }), t.jsx(na, { className: "flex flex-wrap items-center gap-1", value: String(n), onValueChange: ($) => {
    const k = Number.parseInt($, 10);
    Number.isFinite(k) && k >= 1 && s(k);
  }, "aria-label": `${e.displayLabel}\uBC88 \uBCF4\uAE30 \uC120\uD0DD`, children: Array.from({ length: c }, ($, k) => {
    const S = k + 1, I = Ze(e.id, S), M = r[I] !== void 0 && String(r[I] || "").trim(), B = S === e.answer, T = B ? vl : yl;
    return t.jsxs(sa, { value: String(S), className: `${T} ${M ? "pr-2 pl-2" : ""}`, "aria-label": `${S}\uBC88${B ? " (\uC815\uB2F5)" : ""}${M ? ", \uBD84\uC11D \uC800\uC7A5\uB428" : ""}`, children: [t.jsx("span", { children: S }), M ? t.jsx("span", { className: `absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ${b}`, "aria-hidden": true }) : null] }, S);
  }) })] }), d ? t.jsxs("div", { children: [t.jsxs("div", { className: "mb-1.5 flex flex-wrap items-center gap-2", children: [t.jsxs("span", { className: y, children: [n, "\uBC88", m ? " \xB7 \uC815\uB2F5 \uBCF4\uAE30" : " \xB7 \uC624\uB2F5 \uBCF4\uAE30"] }), x ? t.jsxs("span", { className: `inline-flex items-center gap-1 ${N}`, children: [t.jsx("span", { className: `h-1.5 w-1.5 animate-pulse rounded-full ${j}` }), "\uC0DD\uC131 \uC911"] }) : null] }), t.jsx("div", { className: "[&_.md-editor-preview]:text-inherit [&_.md-editor-preview]:!bg-transparent [&_.md-editor]:!bg-transparent", children: u ? t.jsx(_e, { text: u, previewId: `wx-${e.id}-${n}` }) : t.jsx("p", { className: `${z} opacity-80`, children: "\uBD84\uC11D\uC744 \uC0DD\uC131\uD558\uB294 \uC911\u2026" }) }), t.jsxs("div", { className: "mt-2 flex flex-wrap gap-1.5", children: [t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: x, onClick: () => a(n, "followup"), children: [t.jsx(Gi, { size: 14 }), "\uCD94\uAC00\uC9C8\uBB38"] }), t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: x, onClick: () => a(n, "regenerate"), children: [t.jsx(Wi, { size: 14 }), "\uC7AC\uC0DD\uC131"] })] })] }) : t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [t.jsxs("p", { className: z, children: [n, "\uBC88 \uBCF4\uAE30 \uBD84\uC11D\uC744 \uC0DD\uC131\uD569\uB2C8\uB2E4."] }), t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: x, onClick: () => a(n, "create"), children: [x ? t.jsx(Qe, { size: 14, className: "animate-pulse" }) : t.jsx(Et, { size: 14 }), "\uBD84\uC11D \uC0DD\uC131"] })] })] });
}
function jl({ questionId: e, value: n, onSave: s }) {
  const r = String(n || ""), o = r.trim().length > 0, a = `qmemo-${e}`, [c, f] = i.useState(false), [u, d] = i.useState("");
  i.useEffect(() => {
    c || d(r);
  }, [r, c]);
  const x = () => {
    d(""), f(true);
  }, m = () => {
    d(r), f(true);
  }, g = () => {
    s(u), f(false);
  };
  return t.jsx("div", { className: "mt-3 border-t border-slate-200 pt-3 dark:border-odp-borderSoft", children: c ? t.jsxs("div", { className: "space-y-2 rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60", children: [t.jsxs("label", { className: "block space-y-1.5", children: [t.jsxs("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: ["\uBA54\uBAA8", t.jsx("span", { className: "ml-1 font-normal text-slate-500 dark:text-odp-muted", children: "(Markdown)" })] }), t.jsx("textarea", { className: "quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft", placeholder: "\uBB38\uC81C\uC5D0 \uB300\uD55C \uBA54\uBAA8\uB97C Markdown\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.", value: u, onChange: (w) => d(w.target.value), autoFocus: true })] }), t.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [t.jsx(F, { type: "button", variant: "primary", size: "sm", onClick: g, children: "\uC800\uC7A5\uD558\uAE30" }), t.jsx(F, { type: "button", variant: "secondary", size: "sm", onClick: () => {
    d(r), f(false);
  }, children: "\uCDE8\uC18C" })] })] }) : t.jsxs(t.Fragment, { children: [o ? t.jsx("div", { className: "mb-2 rounded-lg border border-slate-200 bg-white p-2.5 text-sm dark:border-odp-borderSoft dark:bg-odp-bg", children: t.jsx(_e, { text: r, previewId: a }) }) : null, t.jsxs(F, { type: "button", variant: "secondary", size: "sm", onClick: o ? m : x, children: [t.jsx(hn, { size: 14 }), o ? "\uBA54\uBAA8\uC218\uC815" : "\uBA54\uBAA8\uC791\uC131"] })] }) });
}
const Cl = 400;
function Nl(e, n, s) {
  const [r, o] = i.useState(n), a = i.useRef(n), c = i.useRef(null);
  i.useEffect(() => {
    n !== a.current && (a.current = n, o(n));
  }, [n]);
  const f = i.useCallback(() => {
    c.current != null && (clearTimeout(c.current), c.current = null), r !== a.current && (a.current = r, s(e, r));
  }, [r, s, e]), u = i.useCallback((d) => {
    o(d), c.current != null && clearTimeout(c.current), c.current = setTimeout(() => {
      c.current = null, d !== a.current && (a.current = d, s(e, d));
    }, Cl);
  }, [s, e]);
  return i.useEffect(() => () => {
    c.current != null && clearTimeout(c.current);
  }, []), { draft: r, handleChange: u, flush: f };
}
const ts = "data-quiz-q-track", $l = 0.12;
function Pl({ scrollRootRef: e, questions: n, running: s, getElapsedMs: r, timeLog: o, onLogChange: a }) {
  const c = i.useRef(o), f = i.useRef(a), u = i.useRef(r), d = i.useRef(n), x = i.useRef(null), m = i.useRef(null), g = i.useRef(/* @__PURE__ */ new Map());
  c.current = o, f.current = a, u.current = r, d.current = n;
  const w = i.useCallback((j) => {
    const b = x.current;
    if (!b) return;
    x.current = null, m.current = null;
    const $ = u.current(), k = Math.max(0, $ - b.elapsedMs);
    if (k < ri) return;
    const S = { questionId: b.questionId, displayLabel: b.displayLabel, at: b.at, endedAt: j ?? (/* @__PURE__ */ new Date()).toISOString(), durationMs: k }, I = oi(c.current, S);
    f.current(I);
  }, []), v = i.useCallback((j, b) => {
    var _a2;
    ((_a2 = x.current) == null ? void 0 : _a2.questionId) !== j && (x.current = { questionId: j, displayLabel: b, at: (/* @__PURE__ */ new Date()).toISOString(), elapsedMs: u.current() }, m.current = j);
  }, []), y = i.useCallback(() => {
    let j = null, b = 0;
    for (const [$, k] of g.current) k > b && (b = k, j = $);
    return b >= $l ? j : null;
  }, []), z = i.useCallback((j) => {
    if (!s || j === m.current) return;
    if (w(), !j) {
      m.current = null;
      return;
    }
    const b = d.current.find(($) => $.id === j);
    b && v(b.id, b.displayLabel);
  }, [w, s, v]);
  i.useEffect(() => {
    if (!s) {
      w(), g.current.clear();
      return;
    }
    z(y());
  }, [s, w, z, y]);
  const N = n.map((j) => j.id).join("\0");
  i.useEffect(() => {
    const j = e.current;
    if (!j || !s) return;
    const b = new Set(d.current.map((S) => S.id));
    g.current = new Map([...g.current.entries()].filter(([S]) => b.has(S)));
    const $ = new IntersectionObserver((S) => {
      for (const I of S) {
        const M = I.target.getAttribute(ts);
        M && g.current.set(M, I.intersectionRatio);
      }
      z(y());
    }, { root: j, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
    return j.querySelectorAll(`[${ts}]`).forEach((S) => $.observe(S)), () => {
      $.disconnect();
    };
  }, [e, N, s, z, y]);
}
const rr = ts;
function zl({ question: e, userAnswer: n, isSubmitted: s, isQuestionGraded: r, subjectiveGrade: o, showExplanation: a, wrongExpsForQuestion: c, wrongExpFocusOption: f, questionMemo: u, busyId: d, examInProgress: x, isFresh: m, onClearFresh: g, onAnswerCommit: w, onSelectOption: v, onEditQuestion: y, onGradeChoice: z, onGradeSubjective: N, onRetry: j, onToggleExplanation: b, onSimilar: $, onDerived: k, onGenerateSections: S, onWrongExpFocusChange: I, onOpenAnalysisDock: M, onMemoSave: B }) {
  const T = String(n ?? ""), { draft: O, handleChange: _, flush: J } = Nl(e.id, T, w), V = n !== void 0 && String(n).trim() !== "", P = s || r, { isWrong: Q, isCorrect: W, gradeLabel: D } = i.useMemo(() => {
    let Y = false, E = false, se = null;
    if (e.kind === "choice" && P && V && (E = n === e.answer, Y = !E), e.kind === "subjective" && P && (E = (o == null ? void 0 : o.verdict) === "correct", Y = (o == null ? void 0 : o.verdict) === "wrong"), P) if (e.kind === "choice") V ? E ? se = "\uC815\uB2F5" : se = "\uC624\uB2F5" : se = "\uBBF8\uCC44\uC810";
    else {
      const A = o == null ? void 0 : o.verdict;
      A === "correct" ? se = "\uC815\uB2F5" : A === "partial" ? se = "\uBD80\uBD84\uC815\uB2F5" : A === "wrong" && (se = "\uC624\uB2F5");
    }
    return { isWrong: Y, isCorrect: E, gradeLabel: se };
  }, [V, P, e.answer, e.kind, o == null ? void 0 : o.verdict, n]), te = n, oe = ["relative rounded-2xl border bg-white p-5 pr-16 shadow-xs dark:bg-odp-surface", P ? W ? "border-emerald-300" : Q ? "border-rose-300" : "border-slate-200 dark:border-odp-borderSoft" : "border-slate-200 dark:border-odp-borderSoft", e.isGenerated ? "border-purple-300 dark:border-purple-700" : "", m ? "ring-2 ring-purple-300/70 dark:ring-purple-500/50" : ""].filter(Boolean).join(" "), He = t.jsxs(t.Fragment, { children: [t.jsxs(F, { type: "button", variant: "tertiary", size: "sm", className: "absolute top-3 right-3 z-10", onClick: () => y(e), children: [t.jsx(hn, { size: 14 }), "\uC218\uC815"] }), t.jsx("div", { className: "mb-3", children: t.jsxs("h3", { className: "text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: [t.jsxs("span", { className: "mr-1.5 inline-flex items-center gap-1.5 align-middle", children: [t.jsxs("span", { children: [e.displayLabel, "."] }), D ? t.jsx("span", { className: `rounded-md px-2 py-0.5 text-[10px] font-bold ${D === "\uC815\uB2F5" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200" : D === "\uC624\uB2F5" ? "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200" : D === "\uBD80\uBD84\uC815\uB2F5" ? "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200" : "bg-slate-100 text-slate-700 dark:bg-odp-bgSoft dark:text-odp-muted"}`, children: D }) : null] }), e.kind === "subjective" ? e.answerStyle === "essay" ? "[\uC8FC\uAD00\uC2DD] " : "[\uB2E8\uB2F5\uD615] " : "", t.jsx("span", { className: "font-medium", children: t.jsx(_e, { text: e.question, previewId: `qq-${e.id}`, className: "inline" }) })] }) }), e.kind === "choice" ? t.jsx("div", { className: "space-y-2", children: (e.options || []).map((Y, E) => {
    const se = E + 1, A = te === se, q = P, ce = e.answer === se;
    let ae = "border-slate-200 bg-white hover:bg-slate-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft";
    return A && !q && (ae = "border-blue-500 bg-blue-50 ring-1 ring-blue-500 dark:bg-blue-950/30"), q && ce ? ae = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:bg-emerald-950/30" : q && A && !ce && (ae = "border-rose-400 bg-rose-50 dark:bg-rose-950/30"), t.jsxs("button", { type: "button", className: `flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm ${ae}`, onClick: () => v(e.id, se), children: [t.jsx("span", { className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold", children: se }), t.jsx("div", { className: "min-w-0 flex-1", children: t.jsx(_e, { text: Y, previewId: `qo-${e.id}-${se}` }) })] }, se);
  }) }) : t.jsxs("div", { className: "space-y-2", children: [e.answerStyle === "essay" ? t.jsx("textarea", { className: "quiz-body-field min-h-24 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: O, disabled: P, onChange: (Y) => _(Y.target.value), onBlur: J, placeholder: "\uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694" }) : t.jsx("input", { className: "quiz-body-field w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: O, disabled: P, onChange: (Y) => _(Y.target.value), onBlur: J, placeholder: "\uB2E8\uB2F5 \uC785\uB825" }), o ? t.jsxs("div", { className: `rounded-xl border p-3 text-xs ${o.verdict === "correct" ? "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/45 dark:text-emerald-100" : o.verdict === "partial" ? "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-800/70 dark:bg-amber-950/45 dark:text-amber-100" : "border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100"}`, children: [t.jsxs("div", { className: "mb-1 font-bold", children: [o.verdict, " \xB7 ", o.score, "\uC810"] }), t.jsx("div", { className: "[&_.md-editor-preview]:text-inherit [&_.md-editor-preview]:!bg-transparent [&_.md-editor]:!bg-transparent", children: t.jsx(_e, { text: o.feedback || "", previewId: `qg-${e.id}` }) })] }) : null] }), t.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-1.5", children: [P ? t.jsxs(F, { type: "button", variant: "secondary", size: "sm", onClick: () => j(e), children: [t.jsx(zr, { size: 14 }), "\uB2E4\uC2DC\uD480\uAE30"] }) : e.kind === "choice" ? t.jsxs(sr, { examInProgress: x, size: "sm", disabled: !V, onClick: () => z(e), className: "!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700", children: [t.jsx(Pr, { size: 14 }), "\uCC44\uC810"] }) : t.jsxs(sr, { examInProgress: x, size: "sm", disabled: d === e.id || !O.trim(), onClick: () => {
    J(), N(e, O);
  }, className: "!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700", children: [t.jsx(Qe, { size: 14 }), "AI \uCC44\uC810"] }), t.jsxs(F, { type: "button", variant: "secondary", size: "sm", onClick: () => b(e.id), children: [t.jsx(Ji, { size: 14 }), a ? "\uD574\uC124 \uC811\uAE30" : "\uD574\uC124 \uBCF4\uAE30"] }), e.kind === "choice" ? t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: d === `sim-${e.id}`, onClick: () => $(e), children: [t.jsx(Et, { size: 14 }), "\uC720\uC0AC\uBB38\uC81C"] }) : null, t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: d === `derived-${e.id}`, onClick: () => k(e), children: [t.jsx(as, { size: 14 }), "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131"] })] }), P ? t.jsx(wl, { question: e, busyKey: d, showContent: a, onGenerate: (Y) => S(e, Y) }) : null, P && e.kind === "choice" ? t.jsx(Sl, { question: e, focusOption: f, onFocusOptionChange: (Y) => I(e.id, Y), wrongExps: c, busyKey: d, onOpenAnalysisDock: (Y, E) => M(e.id, Y, E) }) : null, t.jsx(jl, { questionId: e.id, value: u, onSave: (Y) => B(e.id, Y) })] });
  return m ? t.jsx(We.div, { id: `q-card-${e.id}`, [rr]: e.id, initial: { opacity: 0, y: 36, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 340, damping: 26 }, onAnimationComplete: g, className: oe, children: He }) : t.jsx("div", { id: `q-card-${e.id}`, [rr]: e.id, className: oe, children: He });
}
const El = i.memo(zl), Il = 12;
function Rl(e, n, s, r, o, a) {
  var _a2;
  const c = s[e.id] !== void 0 && String(s[e.id]).trim() !== "", f = !!(a || r[e.id]);
  if (n === "unanswered" && c) return false;
  if (n !== "wrong") return true;
  let u = false;
  return e.kind === "choice" && f && c && (u = s[e.id] !== e.answer), e.kind === "subjective" && f && (u = ((_a2 = o[e.id]) == null ? void 0 : _a2.verdict) === "wrong"), f && u;
}
function or(e, n, s) {
  const r = document.getElementById(`q-card-${n}`);
  if (!r) return false;
  if (!e) return r.scrollIntoView({ behavior: s, block: "start" }), true;
  const o = e.getBoundingClientRect(), a = r.getBoundingClientRect(), c = e.scrollTop + (a.top - o.top) - Il;
  return e.scrollTo({ top: Math.max(0, c), behavior: s }), true;
}
const Ml = i.memo(i.forwardRef(function({ questions: n, filter: s, scrollRef: r, userAnswers: o, graded: a, subjGrades: c, isSubmitted: f, expVisible: u, wrongExpsByQuestion: d, questionMemos: x, freshQuestionIds: m, busyId: g, examInProgress: w, resolveWrongExpFocusOption: v, onAnswerCommit: y, onSelectOption: z, onEditQuestion: N, onGradeChoice: j, onGradeSubjective: b, onRetry: $, onToggleExplanation: k, onSimilar: S, onDerived: I, onGenerateSections: M, onWrongExpFocusChange: B, onOpenAnalysisDock: T, onMemoSave: O, onClearFresh: _ }, J) {
  const V = i.useMemo(() => n.filter((Q) => Rl(Q, s, o, a, c, f)), [s, a, f, n, c, o]), P = i.useCallback((Q) => {
    if (!V.some((te) => te.id === Q)) return false;
    const D = r.current;
    return or(D, Q, "smooth") || requestAnimationFrame(() => {
      or(D, Q, "smooth");
    }), true;
  }, [r, V]);
  return i.useImperativeHandle(J, () => ({ scrollToQuestionId: P }), [P]), V.length === 0 ? null : t.jsx("div", { className: "space-y-4", children: V.map((Q) => {
    const W = o[Q.id], D = !!(f || a[Q.id]);
    return t.jsx(El, { question: Q, userAnswer: o[Q.id], isSubmitted: f, isQuestionGraded: D, subjectiveGrade: c[Q.id], showExplanation: !!u[Q.id], wrongExpsForQuestion: d[Q.id] ?? {}, wrongExpFocusOption: v(Q, typeof W == "number" ? W : void 0), questionMemo: x[Q.id] || "", busyId: g, examInProgress: w, isFresh: !!m[Q.id], onClearFresh: () => _(Q.id), onAnswerCommit: y, onSelectOption: z, onEditQuestion: N, onGradeChoice: j, onGradeSubjective: b, onRetry: $, onToggleExplanation: k, onSimilar: S, onDerived: I, onGenerateSections: M, onWrongExpFocusChange: B, onOpenAnalysisDock: T, onMemoSave: O }, Q.id);
  }) });
})), Al = 320, Ll = At;
function Ol(e, n) {
  if (n === "followup") return "\uCD94\uAC00 \uC9C8\uBB38";
  const s = e ? "\uC815\uB2F5 \uBD84\uC11D" : "\uC624\uB2F5 \uBD84\uC11D";
  return n === "regenerate" ? `${s} \uC7AC\uC0DD\uC131` : s;
}
function Ql({ open: e, question: n, option: s, mode: r, existingAnalysis: o = "", llmProfiles: a, profileId: c, model: f, onProfileIdChange: u, onModelChange: d, busy: x, onClose: m, onGenerate: g }) {
  const [w, v] = i.useState(""), { width: y, handleProps: z, isResizing: N } = ct({ storageKey: "quiz-choice-analysis-dock-width", defaultWidth: Al, minWidth: 260, maxWidth: 560, edge: "right" }), j = n != null && s != null && s === n.answer, b = Ol(j, r), $ = j ? "border-emerald-200 dark:border-emerald-900/60" : "border-rose-200 dark:border-rose-900/60", k = j ? "bg-emerald-50 dark:bg-emerald-950/40" : "bg-rose-50 dark:bg-rose-950/40", S = j ? "text-emerald-900 dark:text-emerald-100" : "text-rose-900 dark:text-rose-100", I = r === "followup", M = I, B = !x && (!M || w.trim().length > 0);
  i.useEffect(() => {
    e && v("");
  }, [e, n == null ? void 0 : n.id, s, r]);
  const T = i.useCallback((_) => {
    x || M && !w.trim() || _.key !== "Enter" || !_.metaKey && !_.ctrlKey || (_.preventDefault(), g(w));
  }, [x, g, w, M]), O = e && n != null && s != null;
  return t.jsx(Lt, { motionKey: "quiz-choice-analysis-dock", open: O, width: y, isResizing: N, "aria-label": b, className: `flex h-full shrink-0 flex-col overflow-hidden border-l bg-white shadow-lg dark:bg-odp-surface ${$}`, children: n != null && s != null ? t.jsxs("div", { className: "relative h-full min-h-0", style: { width: y }, children: [t.jsx(Ll, { edge: "left", handleProps: z, isResizing: N, visibleOnHover: true, label: "\uBD84\uC11D \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [t.jsxs("div", { className: `flex items-center justify-between border-b px-3 py-2.5 ${$}`, children: [t.jsx("div", { className: "min-w-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: b }), t.jsx("button", { type: "button", "aria-label": "\uBD84\uC11D \uD328\uB110 \uB2EB\uAE30", className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg", onClick: m, disabled: x, children: t.jsx(Be, { size: 16 }) })] }), t.jsxs("div", { className: "min-h-0 flex-1 space-y-3 overflow-y-auto p-3", children: [t.jsxs("div", { className: `rounded-lg px-2.5 py-2 text-[11px] ${k} ${S}`, children: [t.jsxs("div", { className: "font-semibold", children: [n.displayLabel, "\uBC88 \xB7 ", s, "\uBC88 \uBCF4\uAE30", j ? " (\uC815\uB2F5)" : ""] }), t.jsx("p", { className: "mt-1 line-clamp-3 opacity-90", children: n.question })] }), I && o.trim() ? t.jsxs("div", { className: "rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-[10px] text-slate-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-muted", children: [t.jsx("div", { className: "mb-1 font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uAE30\uC874 \uBD84\uC11D" }), t.jsx("p", { className: "line-clamp-6 whitespace-pre-wrap", children: o.trim() })] }) : null, t.jsx(br, { profiles: a, profileId: c, model: f, onProfileIdChange: u, onModelChange: d, disabled: x, autoLoadModels: false }), t.jsxs("label", { className: "block space-y-1.5", children: [t.jsxs("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: [I ? "\uCD94\uAC00 \uC9C8\uBB38" : "\uAD81\uAE08\uD55C \uC810", t.jsx("span", { className: "ml-1 font-normal text-slate-500 dark:text-odp-muted", children: I ? "(\uD544\uC218)" : "(\uC120\uD0DD)" })] }), t.jsx("textarea", { className: "quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", placeholder: I ? "\uC608: \uC9C0\uB2C8 \uC9C0\uC218\uC640 \uC5D4\uD2B8\uB85C\uD53C\uC758 \uC218\uC2DD\uC801 \uCC28\uC774\uAC00 \uBB54\uAC00\uC694?" : j ? "\uBE44\uC6CC \uB450\uBA74 \uC815\uB2F5/\uC624\uB2F5 \uC774\uC720\uB97C \uAE30\uBCF8 \uC124\uBA85\uD569\uB2C8\uB2E4. \uC608: \uC65C \uC774 \uBCF4\uAE30\uAC00 \uC815\uB2F5\uC778\uC9C0\u2026" : "\uBE44\uC6CC \uB450\uBA74 \uC624\uB2F5 \uC774\uC720\uB97C \uAE30\uBCF8 \uC124\uBA85\uD569\uB2C8\uB2E4. \uC608: 2\uBC88\uACFC 3\uBC88\uC758 \uCC28\uC774\u2026", value: w, disabled: x, onChange: (_) => v(_.target.value), onKeyDown: T }), t.jsxs("p", { className: "text-[10px] text-slate-500 dark:text-odp-muted", children: [I ? "\uAE30\uC874 \uBD84\uC11D\uACFC \uBB38\uC81C \uB0B4\uC6A9\uC744 \uBC14\uD0D5\uC73C\uB85C \uB2F5\uBCC0\uD569\uB2C8\uB2E4." : "\uBE44\uC6CC \uB450\uACE0 \uC0DD\uC131\uD558\uBA74 \uAE30\uBCF8 \uD504\uB86C\uD504\uD2B8\uB85C \uC124\uBA85\uD569\uB2C8\uB2E4.", " ", t.jsx("kbd", { className: "rounded border border-slate-300 bg-slate-100 px-1 py-px font-mono text-[9px] dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: "\u2318/Ctrl+Enter" }), "\uB85C \uBC14\uB85C \uC0DD\uC131\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] })] })] }), t.jsxs("div", { className: `flex gap-2 border-t p-3 ${$}`, children: [t.jsx(F, { type: "button", variant: "secondary", size: "sm", className: "flex-1", disabled: x, onClick: m, children: "\uCDE8\uC18C" }), t.jsxs(F, { type: "button", variant: "primary", size: "sm", className: "flex-1", disabled: !B, onClick: () => g(w), children: [t.jsx(Qe, { size: 14 }), x ? "\uC0DD\uC131 \uC911\u2026" : I ? "\uB2F5\uBCC0 \uC0DD\uC131" : "\uC0DD\uC131"] })] })] })] }) : null });
}
const Tl = i.memo(Ql);
function _l({ disabled: e = false, onGenerate: n }) {
  const [s, r] = i.useState("");
  return t.jsxs("div", { className: "space-y-2 border-t border-slate-100 pt-3 dark:border-odp-borderSoft", children: [t.jsx("label", { htmlFor: "quiz-source-generate-topic", className: "block text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uADFC\uAC70\uB85C \uBB38\uC81C \uC0DD\uC131" }), t.jsx("input", { id: "quiz-source-generate-topic", className: "w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", placeholder: "\uC8FC\uC81C (\uC120\uD0DD)", value: s, onChange: (o) => r(o.target.value) }), t.jsxs(F, { type: "button", variant: "secondary", size: "sm", className: "w-full", disabled: e, onClick: () => {
    n(s);
  }, children: [t.jsx(Qe, { size: 14 }), "\uADFC\uAC70\uB85C \uBB38\uC81C \uCD94\uAC00"] })] });
}
const Dl = i.memo(_l);
function Fl(e, n) {
  var _a2;
  if (!(n.isSubmitted || !!n.gradedQuestions[e.id])) return false;
  if (e.kind === "choice") {
    const r = n.userAnswers[e.id];
    return r != null && String(r).trim() !== "" && r !== e.answer;
  }
  return ((_a2 = n.subjectiveGrades[e.id]) == null ? void 0 : _a2.verdict) === "wrong";
}
function Bl(e) {
  return e.questions.filter((n) => Fl(n, e));
}
function ql(e) {
  return e.map((n, s) => {
    const r = String(s + 1);
    return { ...n, id: r, displayLabel: r };
  });
}
function Ul(e, n) {
  const s = Bl({ questions: e.questions, userAnswers: n.userAnswers, gradedQuestions: n.gradedQuestions, isSubmitted: n.isSubmitted, subjectiveGrades: n.subjectiveGrades });
  if (!s.length) return null;
  const r = ql(s), o = ss({ ...e.config, sourcePaths: [...e.config.sourcePaths] });
  return { markdown: kr(o, r, Kn), questions: r, config: o };
}
function Gl(e) {
  return e.toLowerCase().endsWith(Vn) ? e.slice(0, -Vn.length) : e.replace(/\.md$/i, "");
}
function ir(e, n) {
  const s = String(e || "").trim().replace(/\\/g, "/"), r = s.lastIndexOf("/"), o = r >= 0 ? s.slice(0, r + 1) : "", a = Gl(ii(s)), c = n != null && n > 1 ? `-\uD2C0\uB9B0\uBB38\uC81C-${n}` : "-\uD2C0\uB9B0\uBB38\uC81C";
  return `${o}${a}${c}${Vn}`;
}
async function Wl(e, n) {
  const s = ir(e);
  if (!await n(s)) return s;
  for (let r = 2; r < 100; r += 1) {
    const o = ir(e, r);
    if (!await n(o)) return o;
  }
  throw new Error("\uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uD034\uC988 \uD30C\uC77C \uC774\uB984\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
}
function pn(e) {
  return e != null && String(e).trim() !== "";
}
function Dn(e) {
  const n = {};
  for (const s of e.questions) {
    const r = pn(e.userAnswers[s.id]);
    (e.isSubmitted && s.kind === "choice" ? true : !!e.gradedQuestions[s.id]) ? n[s.id] = true : r && (n[s.id] = false);
  }
  return zt({ userAnswers: e.userAnswers, gradedQuestions: n, subjectiveGrades: e.subjectiveGrades, isSubmitted: e.isSubmitted, ...e.timeLog ? { timeLog: e.timeLog } : {}, ...e.wrongChoiceExplanations ? { wrongChoiceExplanations: e.wrongChoiceExplanations } : {}, ...e.questionMemos ? { questionMemos: e.questionMemos } : {} });
}
function ar(e, n) {
  const s = zt(e ?? Kn), r = zt(n ?? Kn);
  return JSON.stringify(s) === JSON.stringify(r);
}
function Jl(e) {
  return e != null && !ns(e);
}
const Hl = 320, Gr = "s3haim_quiz_source_remove_confirm", Kl = At, Vl = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-violet-400", e ? "border-violet-500 bg-violet-500 shadow-sm dark:border-violet-500 dark:bg-violet-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), Xl = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
function Wr() {
  try {
    return localStorage.getItem(Gr) === "true";
  } catch {
    return false;
  }
}
function Zl(e) {
  try {
    localStorage.setItem(Gr, String(e));
  } catch {
  }
}
function Yl({ open: e, docConfig: n, sourcePathUsage: s, busyGenSources: r, onClose: o, onPreview: a, onRemove: c, onToggleEnabled: f, onOpenPicker: u, onGenerateFromTopic: d, onDropHostChange: x }) {
  const [m, g] = i.useState(Wr), { width: w, handleProps: v, isResizing: y } = ct({ storageKey: "quiz-sources-dock-width", defaultWidth: Hl, minWidth: 240, maxWidth: 520, edge: "right" }), z = i.useCallback((N) => {
    g(N), Zl(N);
  }, []);
  return t.jsx(Lt, { motionKey: "quiz-sources-dock", open: e, width: w, isResizing: y, "aria-label": "\uD30C\uC77C \uADFC\uAC70 \uBB38\uC11C", className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface", children: t.jsxs("div", { className: "relative flex h-full min-h-0 flex-col", style: { width: w }, children: [t.jsx(Kl, { edge: "left", handleProps: v, isResizing: y, visibleOnHover: true, label: "\uD30C\uC77C \uADFC\uAC70 \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsxs("div", { className: "border-b border-slate-200 dark:border-odp-borderSoft", children: [t.jsxs("div", { className: "flex items-center justify-between px-3 py-2.5", children: [t.jsxs("div", { className: "flex min-w-0 items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: [t.jsx(Er, { size: 16, className: "shrink-0 text-violet-600 dark:text-violet-400" }), t.jsx("span", { className: "truncate", children: "\uD30C\uC77C \uADFC\uAC70" }), s.total > 0 ? t.jsxs("span", { className: "ml-0.5 inline-flex shrink-0 items-baseline gap-0.5 rounded-md bg-violet-100 px-1.5 py-0.5 text-[11px] font-bold tabular-nums dark:bg-violet-950/70", "aria-label": `\uB4F1\uB85D ${s.total}\uAC1C \uC911 ${s.active}\uAC1C \uC0AC\uC6A9 \uC911`, children: [t.jsx("span", { className: "text-violet-600 dark:text-violet-400", children: s.active }), t.jsx("span", { className: "font-medium text-slate-400", children: "/" }), t.jsx("span", { className: "text-slate-700 dark:text-slate-200", children: s.total }), t.jsx("span", { className: "ml-0.5 text-[9px] font-semibold text-violet-700 dark:text-violet-300", children: "\uC0AC\uC6A9" })] }) : null] }), t.jsx("button", { type: "button", "aria-label": "\uADFC\uAC70 \uD328\uB110 \uB2EB\uAE30", className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg", onClick: o, children: t.jsx(Be, { size: 16 }) })] }), t.jsxs("div", { className: "flex items-center justify-between gap-3 px-3 pb-2.5", children: [t.jsx("label", { htmlFor: "quiz-source-remove-confirm", className: "text-[11px] font-medium text-slate-600 dark:text-odp-muted", children: "\uC0AD\uC81C \uC2DC \uD655\uC778" }), t.jsx(ra, { id: "quiz-source-remove-confirm", className: Vl(m), checked: m, onCheckedChange: z, "aria-label": "\uADFC\uAC70 \uBB38\uC11C \uC0AD\uC81C \uC2DC \uD655\uC778", children: t.jsx(oa, { className: Xl }) })] })] }), t.jsxs("div", { ref: x, className: "relative min-h-0 flex-1 space-y-4 overflow-y-auto p-3", children: [t.jsx(Or, { layout: "dock", paths: n.sourcePaths, label: "\uC120\uD0DD\uB41C \uBB38\uC11C", onPreview: a, onRemove: c, isPathEnabled: (N) => ai(n, N), onToggleEnabled: f, onOpenPicker: u }), t.jsx(Dl, { disabled: r, onGenerate: d })] })] }) });
}
const ec = i.memo(Yl), tc = /* @__PURE__ */ new Set(["markdown", "json", "html", "svg", "raw"]), Fn = "h-full min-h-[240px] w-full resize-none border-0 bg-transparent p-3 font-mono text-xs text-slate-800 outline-none dark:text-odp-fgStrong";
function nc(e) {
  return tc.has(String(e || ""));
}
function sc({ payload: e, editMode: n, editContent: s, onEditContentChange: r }) {
  const o = e.currentFile.viewer, a = i.useMemo(() => `vault-preview-${e.currentFile.id.replace(/[^\w-]+/g, "-")}`, [e.currentFile.id]);
  return e.needsEncMdPassword ? t.jsx("div", { className: "p-4 text-sm text-slate-600 dark:text-odp-muted", children: "\uC554\uD638\uD654\uB41C \uB178\uD2B8\uC785\uB2C8\uB2E4. \uBBF8\uB9AC\uBCF4\uAE30\uB97C \uBCF4\uB824\uBA74 \u300C\uC774 \uBB38\uC11C \uC5F4\uAE30\u300D\uB85C \uD3B8\uC9D1\uAE30\uC5D0\uC11C \uC554\uD638\uB97C \uC785\uB825\uD558\uC138\uC694." }) : o === "image" && e.currentFile.objectUrl ? t.jsx("div", { className: "flex min-h-0 flex-1 items-center justify-center overflow-auto p-3", children: t.jsx("img", { src: e.currentFile.objectUrl, alt: e.currentFile.name, className: "max-h-full max-w-full object-contain" }) }) : o === "pdf" && e.currentFile.objectUrl ? t.jsx("iframe", { title: e.currentFile.name, src: e.currentFile.objectUrl, className: "h-full min-h-[240px] w-full border-0" }) : o === "audio" && e.currentFile.objectUrl ? t.jsx("div", { className: "p-4", children: t.jsx("audio", { controls: true, className: "w-full", src: e.currentFile.objectUrl, children: "\uC624\uB514\uC624\uB97C \uC7AC\uC0DD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }) }) : o === "video" && e.currentFile.objectUrl ? t.jsx("div", { className: "p-2", children: t.jsx("video", { controls: true, className: "max-h-full w-full", src: e.currentFile.objectUrl, children: "\uB3D9\uC601\uC0C1\uC744 \uC7AC\uC0DD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }) }) : o === "markdown" ? n ? t.jsx("textarea", { className: Fn, value: s, onChange: (c) => r(c.target.value), spellCheck: false }) : t.jsx("div", { className: "markdown-content p-3", children: t.jsx(_e, { text: s, previewId: a }) }) : o === "html" || o === "svg" ? n ? t.jsx("textarea", { className: Fn, value: s, onChange: (c) => r(c.target.value), spellCheck: false }) : t.jsx("iframe", { title: e.currentFile.name, srcDoc: s, sandbox: "", className: "h-full min-h-[240px] w-full border-0 bg-white" }) : n ? t.jsx("textarea", { className: Fn, value: s, onChange: (c) => r(c.target.value), spellCheck: false }) : t.jsx("pre", { className: "overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-xs text-slate-800 dark:text-odp-fgStrong", children: s });
}
const rc = At, St = "z-100001 max-w-[min(92vw,420px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function oc({ path: e, onClose: n, loadDocument: s, onOpenDocument: r, onOpenInNewTab: o, embedded: a = false, width: c, resizeHandleProps: f, isResizing: u, resizeEdge: d = "right" }) {
  const [x, m] = i.useState(null), [g, w] = i.useState(true), [v, y] = i.useState(""), [z, N] = i.useState(false), [j, b] = i.useState(""), $ = ct({ storageKey: a ? void 0 : "vault-document-preview-panel-width", defaultWidth: 400, minWidth: 280, maxWidth: 640, edge: d === "left" ? "left" : "right" }), k = c ?? $.width, S = f ?? $.handleProps, I = u ?? $.isResizing;
  i.useEffect(() => {
    let O = false, _;
    return w(true), y(""), N(false), (async () => {
      var _a2;
      try {
        const J = await s(e);
        if (O) {
          (_a2 = J == null ? void 0 : J.revoke) == null ? void 0 : _a2.call(J);
          return;
        }
        _ = J == null ? void 0 : J.revoke, m(J), b((J == null ? void 0 : J.content) ?? ""), J || y("\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      } catch (J) {
        O || (m(null), b(""), y(J instanceof Error ? J.message : "\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        O || w(false);
      }
    })(), () => {
      O = true, _ == null ? void 0 : _();
    };
  }, [e, s]);
  const M = i.useCallback(() => {
    N((O) => !O);
  }, []), B = Rt(e), T = x ? nc(x.currentFile.viewer) : false;
  return t.jsxs("aside", { className: `relative flex h-full flex-col overflow-hidden bg-white dark:bg-odp-surface ${a ? "min-w-0" : "shrink-0 border-r border-slate-200 dark:border-odp-borderSoft"}`, style: a ? void 0 : { width: k }, "aria-label": "\uBB38\uC11C \uBBF8\uB9AC\uBCF4\uAE30", children: [t.jsx(rc, { edge: d, handleProps: S, isResizing: I, visibleOnHover: true, label: "\uBBF8\uB9AC\uBCF4\uAE30 \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsx("div", { className: "flex items-center gap-1 border-b border-slate-200 px-2 py-2 dark:border-odp-borderSoft", children: t.jsxs(It, { delayDuration: 250, skipDelayDuration: 0, children: [t.jsxs(Ie, { children: [t.jsx(Re, { asChild: true, children: t.jsx("div", { className: "min-w-0 flex-1 truncate px-1 text-xs font-semibold text-slate-800 dark:text-odp-fgStrong", children: B }) }), t.jsx(Me, { children: t.jsxs(Ae, { side: "bottom", sideOffset: 6, className: St, children: [e, t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }), T ? t.jsxs(Ie, { children: [t.jsx(Re, { asChild: true, children: t.jsx("button", { type: "button", className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": z ? "\uBBF8\uB9AC\uBCF4\uAE30 \uBAA8\uB4DC" : "\uD3B8\uC9D1 \uBAA8\uB4DC", onClick: M, children: z ? t.jsx(Hi, { size: 15 }) : t.jsx(hn, { size: 15 }) }) }), t.jsx(Me, { children: t.jsxs(Ae, { side: "bottom", sideOffset: 6, className: St, children: [z ? "\uBBF8\uB9AC\uBCF4\uAE30 \uBAA8\uB4DC" : "\uD3B8\uC9D1 \uBAA8\uB4DC", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : null, o ? t.jsxs(Ie, { children: [t.jsx(Re, { asChild: true, children: t.jsx("button", { type: "button", className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": "\uC0C8 \uD0ED\uC73C\uB85C \uC5F4\uAE30", onClick: () => o(e), children: t.jsx(Ki, { size: 15 }) }) }), t.jsx(Me, { children: t.jsxs(Ae, { side: "bottom", sideOffset: 6, className: St, children: ["\uC0C8 \uD0ED\uC73C\uB85C \uC5F4\uAE30", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : null, r ? t.jsxs(Ie, { children: [t.jsx(Re, { asChild: true, children: t.jsx("button", { type: "button", className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": "\uC774 \uBB38\uC11C \uC5F4\uAE30", onClick: () => r(e), children: t.jsx(Vi, { size: 15 }) }) }), t.jsx(Me, { children: t.jsxs(Ae, { side: "bottom", sideOffset: 6, className: St, children: ["\uC774 \uBB38\uC11C \uC5F4\uAE30", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : null, t.jsxs(Ie, { children: [t.jsx(Re, { asChild: true, children: t.jsx("button", { type: "button", className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": "\uBBF8\uB9AC\uBCF4\uAE30 \uB2EB\uAE30", onClick: n, children: t.jsx(Be, { size: 15 }) }) }), t.jsx(Me, { children: t.jsxs(Ae, { side: "bottom", sideOffset: 6, className: St, children: ["\uB2EB\uAE30", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }) }), t.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto", children: g ? t.jsxs("div", { className: "flex h-full items-center justify-center gap-2 p-6 text-xs text-slate-500 dark:text-odp-muted", children: [t.jsx(gn, { size: 16, className: "animate-spin", "aria-hidden": true }), "\uBD88\uB7EC\uC624\uB294 \uC911\u2026"] }) : v ? t.jsx("div", { className: "p-4 text-sm text-rose-600 dark:text-rose-400", children: v }) : x ? t.jsx(sc, { payload: x, editMode: z, editContent: j, onEditContentChange: b }) : null })] });
}
const ic = 400;
function ac({ path: e, onClose: n, loadDocument: s, onOpenDocument: r, onOpenInNewTab: o }) {
  const { width: a, handleProps: c, isResizing: f } = ct({ storageKey: "quiz-source-preview-dock-width", defaultWidth: ic, minWidth: 280, maxWidth: 640, edge: "left" });
  return t.jsx(Lt, { motionKey: "quiz-source-preview-dock", open: e != null, width: a, isResizing: f, "aria-label": "\uADFC\uAC70 \uBB38\uC11C \uBBF8\uB9AC\uBCF4\uAE30", className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface", children: e ? t.jsx("div", { className: "relative h-full min-h-0", style: { width: a }, children: t.jsx(oc, { embedded: true, path: e, width: a, resizeHandleProps: c, isResizing: f, resizeEdge: "left", onClose: n, loadDocument: s, onOpenDocument: r, onOpenInNewTab: o }) }) : null });
}
const lc = i.memo(ac), lr = { correct: "bg-emerald-500", partial: "bg-amber-500", wrong: "bg-rose-500", ungraded: "bg-slate-400 dark:bg-slate-500" }, cr = { correct: "\uC815\uB2F5", partial: "\uBD80\uBD84", wrong: "\uC624\uB2F5", ungraded: "\uBBF8\uCC44\uC810" };
function cc(e) {
  return e ? typeof e.score == "number" && Number.isFinite(e.score) ? Math.min(100, Math.max(0, e.score)) / 100 : e.verdict === "correct" ? 1 : e.verdict === "partial" ? 0.5 : 0 : null;
}
function dc(e) {
  var _a2;
  const { question: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a } = e, c = o || r[n.id], f = pn(s[n.id]);
  if (!c) return f ? "ungraded" : null;
  if (n.kind === "choice") return f ? s[n.id] === n.answer ? "correct" : "wrong" : null;
  const u = (_a2 = a[n.id]) == null ? void 0 : _a2.verdict;
  return u === "correct" ? "correct" : u === "partial" ? "partial" : u === "wrong" ? "wrong" : null;
}
function uc(e) {
  const { questions: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a } = e;
  let c = 0, f = 0, u = 0, d = 0, x = 0, m = 0;
  for (const v of n) {
    const y = s[v.id] !== void 0 && s[v.id] !== null && String(s[v.id]).trim() !== "";
    if (y && (d += 1), !(o || r[v.id])) continue;
    if (v.kind === "choice") {
      m += 1, s[v.id] === v.answer ? (c += 1, x += 1) : y && (f += 1);
      continue;
    }
    const N = a[v.id], j = cc(N);
    j != null && (m += 1, x += j, (N == null ? void 0 : N.verdict) === "correct" ? c += 1 : (N == null ? void 0 : N.verdict) === "partial" ? u += 1 : f += 1);
  }
  const g = n.length, w = g > 0 && m > 0 ? Math.round(x / g * 100) : null;
  return { correct: c, wrong: f, partial: u, answered: d, total: g, scorePercent: w };
}
const fc = 288, mc = At, pc = ["ungraded", "correct", "partial", "wrong"], xc = { ungraded: "bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:text-slate-200 dark:ring-slate-600", correct: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800", partial: "bg-amber-50 text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800", wrong: "bg-rose-50 text-rose-800 ring-1 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-800" }, gc = "bg-slate-100 text-slate-400 ring-1 ring-transparent dark:bg-odp-bgSoft dark:text-odp-muted";
function hc({ open: e, questions: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a, onClose: c, onNavigate: f }) {
  const [u, d] = i.useState({ ungraded: true, correct: true, partial: true, wrong: true }), { width: x, handleProps: m, isResizing: g } = ct({ storageKey: "quiz-toc-dock-width", defaultWidth: fc, minWidth: 220, maxWidth: 480, edge: "right" }), w = i.useCallback((y) => {
    d((z) => ({ ...z, [y]: !z[y] }));
  }, []), v = Ar();
  return t.jsx(Lt, { motionKey: "quiz-toc-dock", open: e, width: x, isResizing: g, "aria-label": "\uBB38\uC81C \uBAA9\uCC28", className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface", children: t.jsxs("div", { className: "relative flex h-full min-h-0 flex-col", style: { width: x }, children: [t.jsx(mc, { edge: "left", handleProps: m, isResizing: g, visibleOnHover: true, label: "\uBAA9\uCC28 \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsxs("div", { className: "border-b border-slate-200 dark:border-odp-borderSoft", children: [t.jsxs("div", { className: "flex items-center justify-between px-3 py-2.5", children: [t.jsxs("div", { className: "flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: [t.jsx(Ir, { size: 16, className: "text-slate-600 dark:text-odp-muted" }), "\uBB38\uC81C \uBAA9\uCC28"] }), t.jsx("button", { type: "button", "aria-label": "\uBAA9\uCC28 \uD328\uB110 \uB2EB\uAE30", className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg", onClick: c, children: t.jsx(Be, { size: 16 }) })] }), t.jsx("div", { className: "flex flex-wrap items-center gap-1 px-3 pb-2.5", children: pc.map((y) => {
    const z = u[y];
    return t.jsxs("button", { type: "button", "aria-pressed": z, "aria-label": `\uBAA9\uCC28 ${cr[y]} ${z ? "\uD45C\uC2DC" : "\uC228\uAE40"}`, className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors ${z ? xc[y] : gc}`, onClick: () => w(y), children: [t.jsx("span", { className: `h-2 w-2 shrink-0 rounded-full ${z ? lr[y] : "bg-slate-300 dark:bg-slate-600"}`, "aria-hidden": true }), cr[y]] }, y);
  }) })] }), t.jsx("ul", { className: "min-h-0 flex-1 space-y-1 overflow-y-auto p-3 text-xs", children: n.map((y, z) => {
    var _a2, _b;
    const N = !!y.similarOf, j = /-파생\d+$/u.test(String(y.displayLabel || "")) ? "\uD30C\uC0DD\uBB38\uC81C" : "\uC720\uC0AC\uBB38\uC81C", b = dc({ question: y, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a });
    if (b && !u[b]) return null;
    const $ = t.jsxs("button", { type: "button", className: `flex w-full items-center gap-2 rounded py-1.5 text-left hover:bg-slate-100 dark:hover:bg-odp-focusBg ${N ? "ml-3 border-l-2 border-violet-300 pl-2.5 text-[11px] text-violet-900 dark:border-violet-600 dark:text-violet-200" : "px-2"}`, title: N ? `${((_a2 = y.similarOf) == null ? void 0 : _a2.displayLabel) || ((_b = y.similarOf) == null ? void 0 : _b.id)}\uC758 ${j}` : void 0, onClick: () => f(y.id), children: [t.jsx("span", { className: "flex h-4 w-2 shrink-0 items-center justify-center", "aria-hidden": true, children: b ? t.jsx("span", { className: `h-2 w-2 rounded-full ${lr[b]}` }) : null }), t.jsxs("span", { className: "min-w-0 truncate", children: [N ? t.jsx("span", { className: "mr-1 text-violet-400 dark:text-violet-500", children: "\u21B3" }) : null, y.displayLabel, ". ", y.question.slice(0, 40)] })] }), k = va(z, v);
    return t.jsx(We.li, { initial: k.initial, animate: k.animate, transition: k.transition, children: $ }, y.id);
  }) })] }) });
}
const bc = i.memo(hc);
async function Jr(e, n) {
  const s = [];
  for (const r of e) {
    const o = String(r || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
    if (o) try {
      const a = await n(o);
      typeof a == "string" && a.length > 0 && s.push({ path: o, text: a });
    } catch {
    }
  }
  return s;
}
function Hr(e) {
  const n = [], s = /* @__PURE__ */ new Set();
  for (const r of e) {
    const o = String(r || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
    !o || s.has(o) || (s.add(o), n.push(o));
  }
  return n;
}
function kc(e) {
  return String(e || "").toLowerCase().split(/[^\p{L}\p{N}]+/u).map((n) => n.trim()).filter((n) => n.length >= 2).slice(0, 16);
}
function wc(e, n) {
  if (n.length === 0) return 1;
  const s = e.toLowerCase();
  let r = 0;
  for (const o of n) s.includes(o) && (r += 1);
  return r;
}
async function bn(e) {
  const n = $e(), s = e.topK ?? n.ragTopK, r = e.maxChars ?? n.ragMaxChars, o = Hr(e.sourcePaths);
  if (o.length === 0) return { chunks: [], usedFallback: false };
  const a = await Jr(o, e.readText);
  if (a.length === 0) return { chunks: [], usedFallback: true };
  const c = kc(e.query), f = [];
  for (const x of a) li(x.text, 12e3).forEach((g, w) => {
    g.trim() && f.push({ path: x.path, excerpt: g, chunkIndex: w, score: wc(g, c) });
  });
  f.sort((x, m) => (m.score || 0) - (x.score || 0));
  const u = [];
  let d = 0;
  for (const x of f) {
    if (u.length >= s) break;
    if (d + x.excerpt.length > r) {
      const m = r - d;
      if (m < 200) break;
      u.push({ ...x, excerpt: x.excerpt.slice(0, m) });
      break;
    }
    u.push(x), d += x.excerpt.length;
  }
  return { chunks: u, usedFallback: true };
}
function kn(e) {
  return e.length ? e.map((n) => `---
[${n.path}]
${n.excerpt}
`).join(`
`) : "";
}
async function yc(e, n, s) {
  const r = $e(), o = Math.max(4e3, s ?? Math.min(r.ragMaxChars, 2e5)), a = Hr(e);
  return a.length ? (await Jr(a, n)).map((f) => ({ path: f.path, text: f.text.length > o ? `${f.text.slice(0, o)}

\u2026(truncated)` : f.text })) : [];
}
function vc(e) {
  return e.kind === "subjective" ? e.answerStyle === "essay" ? "\uC11C\uC220\uD615 \uC8FC\uAD00\uC2DD" : "\uB2E8\uB2F5\uD615 \uC8FC\uAD00\uC2DD" : `${e.choiceCount}\uC9C0\uC120\uB2E4 \uAC1D\uAD00\uC2DD`;
}
function Sc(e) {
  return `${Br(e)}

[\uD30C\uC0DD\uBB38\uD56D \uC0DD\uC131 \u2014 \uCD94\uAC00 \uADDC\uCE59]
- \uC6D0\uBCF8 \uBB38\uD56D\uC758 \uD559\uC2B5 \uBAA9\uD45C\xB7\uD575\uC2EC \uAC1C\uB150\uC744 \uC720\uC9C0\uD558\uB418, \uC9C0\uC815\uB41C **\uCD9C\uC81C \uC720\uD615**\uC5D0 \uB9DE\uB294 \uC0C8 \uBB38\uD56D\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.
- \uAC1D\uAD00\uC2DD \u2194 \uC8FC\uAD00\uC2DD \uBCC0\uD658\uC774 \uC694\uCCAD\uB418\uBA74, \uB3D9\uC77C \uAC1C\uB150\uC744 \uD574\uB2F9 \uC720\uD615\uC5D0 \uB9DE\uAC8C \uC7AC\uAD6C\uC131\uD558\uC138\uC694.
- \uC0AC\uC6A9\uC790 \uCD94\uAC00 \uC694\uAD6C\uC0AC\uD56D\uC774 \uC788\uC73C\uBA74 \uBC18\uB4DC\uC2DC \uBC18\uC601\uD558\uC138\uC694.`;
}
function jc(e) {
  var _a2;
  const n = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), s = String(e.explanation || "").trim(), r = String(e.target.userPrompt || "").trim(), o = vc(e.target), a = e.sourceKind === "subjective" ? e.sourceAnswerStyle === "essay" ? "\uC11C\uC220\uD615 \uC8FC\uAD00\uC2DD" : "\uB2E8\uB2F5\uD615 \uC8FC\uAD00\uC2DD" : `${e.options.length || e.target.choiceCount}\uC9C0\uC120\uB2E4 \uAC1D\uAD00\uC2DD`, c = e.sourceKind === "choice" && e.options.length > 0 ? `\uBCF4\uAE30: ${e.options.map((d, x) => `${x + 1}. ${d}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88
` : "";
  let f;
  if (e.target.kind === "subjective") f = `{"kind":"subjective","answerStyle":"${e.target.answerStyle === "essay" ? "essay" : "short"}","question":"...","modelAnswer":"...","point":"...","explanation":"..."}`;
  else {
    const d = e.target.choiceCount, x = e.targetAnswer ?? 1;
    f = `{"kind":"choice","question":"...","options":[${Array.from({ length: d }, () => '"..."').join(",")}],"answer":${x},"point":"...","explanation":"..."}`;
  }
  const u = e.target.kind === "choice" && e.targetAnswer != null ? `\uC774\uBC88 \uC2E0\uADDC \uBB38\uC81C\uC758 \uC815\uB2F5 \uBC88\uD638\uB294 \uBC18\uB4DC\uC2DC ${e.targetAnswer}\uBC88\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.
` : "";
  return `${n ? `[\uADFC\uAC70 \uBC1C\uCDCC]
${n}

\uBC1C\uCDCC \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.

` : ""}[\uC6D0\uBCF8 \uBB38\uC81C \u2014 ${a}]
\uC9C8\uBB38: ${e.question}
${c}\uC811\uADFC Point: ${e.point || ""}
${s ? `\uD574\uC124: ${s}
` : ""}
${e.analysisBlock}

${e.sampledBlock}

${e.complexity}

[\uD30C\uC0DD \uBB38\uD56D \uC694\uAD6C\uC0AC\uD56D]
- \uCD9C\uC81C \uC720\uD615: ${o}
${r ? `- \uC0AC\uC6A9\uC790 \uC694\uAD6C\uC0AC\uD56D:
${r}
` : ""}
\uC6D0\uBCF8\uACFC \uB2E4\uB978 \uC218\uCE58\xB7\uC0AC\uB840\xB7\uD45C\uD604\uC744 \uC0AC\uC6A9\uD558\uB418, \uB3D9\uC77C\uD55C \uD575\uC2EC \uD559\uC2B5 \uBAA9\uD45C\uB97C \uAC80\uC99D\uD558\uB294 \uD30C\uC0DD \uBB38\uD56D\uC744 \uC791\uC131\uD558\uC138\uC694.
${u}
[\uD544\uC218 \u2014 point / explanation]
- JSON\uC758 point\uC640 explanation\uC744 \uBC18\uB4DC\uC2DC \uD568\uAED8 \uCC44\uC6B0\uC138\uC694.
- point: \uC2E0\uADDC \uBB38\uD56D\uC758 \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C(1~3\uAC1C \uBD88\uB9BF \uB610\uB294 1~2\uBB38\uC7A5).
- explanation: \uC815\uB2F5 \uADFC\uAC70\uC640 \uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124.
- options \uAC01 \uD56D\uBAA9\uC5D0\uB294 1., a. \uAC19\uC740 \uBC88\uD638\xB7\uAE30\uD638 \uC811\uB450\uC0AC \uC5C6\uC774 \uC120\uD0DD\uC9C0 \uBCF8\uBB38\uB9CC \uC791\uC131\uD558\uC138\uC694.

JSON\uB9CC \uBC18\uD658:
${f}`;
}
function Cc(e, n) {
  const s = String(n || "").trim().replace(/-(?:유사|파생)\d+$/u, "") || "1", r = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), o = new RegExp(`^${r}-\uD30C\uC0DD(\\d+)$`);
  let a = 0;
  for (const c of e) {
    const f = String(c.displayLabel || "").match(o);
    (f == null ? void 0 : f[1]) && (a = Math.max(a, Number.parseInt(f[1], 10)));
  }
  return `${s}-\uD30C\uC0DD${a + 1}`;
}
const dr = ".quiz", Nc = 96e3;
function Kr(e) {
  return String(e || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
}
function $c(e) {
  const s = Kr(e).replace(/\.quiz\.md$/i, "");
  return s ? `${dr}/${s}` : dr;
}
function Pc(e) {
  return String(e || "").trim().replace(/[^a-zA-Z0-9._-]+/g, "_") || "log";
}
function zc(e, n) {
  return `${$c(e)}/${Pc(n)}.md`;
}
function le(e, n = Nc) {
  const s = String(e || "");
  return s.length <= n ? s : `${s.slice(0, n)}

\u2026 (${s.length - n} characters truncated)`;
}
function Bn(e, n) {
  const s = le(n);
  return s.trim() ? `### ${e}

\`\`\`text
${s.replace(/```/g, "`\u200B``")}
\`\`\`
` : "";
}
function Ec(e, n) {
  const s = `- status: ${e.status}`, r = e.detail ? `- detail: ${e.detail}` : "", o = e.error ? `- error: ${e.error}` : "", a = [`## Step ${n + 1}: ${e.label} (${e.id})`, "", s, r, o, ""];
  return e.systemPrompt && a.push(Bn("System prompt", e.systemPrompt)), e.llmInstruction && a.push(Bn("Instruction / input", e.llmInstruction)), e.llmResponse && a.push(Bn("Model response / artifact", e.llmResponse)), a.filter(Boolean).join(`
`);
}
function Ic(e, n) {
  const s = ["# Quiz generation log", "", `- quiz file: ${Kr(n)}`, `- job id: ${e.id}`, `- kind: ${e.kind}`, ...e.questionLabel ? [`- source label: ${e.questionLabel}`] : [], ...e.resultLabel ? [`- result label: ${e.resultLabel}`] : [], ...e.resultQuestionId ? [`- result question id: ${e.resultQuestionId}`] : [], `- job status: ${e.status}`, `- created at: ${new Date(e.createdAt).toISOString()}`, ...e.error ? [`- job error: ${e.error}`] : [], "", "## Question preview", "", le(e.questionPreview, 4e3), "", "---", ""];
  return e.steps.forEach((r, o) => {
    s.push(Ec(r, o)), s.push("---", "");
  }), `${s.join(`
`).trimEnd()}
`;
}
async function Rc(e) {
  const n = zc(e.quizFilePath, e.logKey), s = Ic(e.job, e.quizFilePath);
  return await e.writeText(n, s), n;
}
const Mc = /^\d+\.\s*[a-zA-Z]\.\s*/, Ac = /^(?:\(\s*\d+\s*\)|\d+\)|\d+\.)\s*/, Lc = /^[a-zA-Z](?:\)|\.)\s*/, Oc = /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫]\s*/u, Qc = /^[가나다라마바사아자차카타파하](?:\)|\.)\s*/u;
function Tc(e) {
  let n = String(e || "").trim();
  if (!n) return n;
  for (let s = 0; s < 4; s += 1) {
    const r = n;
    if (n = n.replace(Mc, "").replace(Ac, "").replace(Lc, "").replace(Oc, "").replace(Qc, "").trim(), n === r) break;
  }
  return n;
}
const en = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uCD9C\uC81C\uC6A9 \uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uAC00\uC785\uB2C8\uB2E4.
\uC8FC\uC5B4\uC9C4 \uC6D0\uBB38\uC5D0\uC11C \uCD9C\uC81C\uC5D0 \uD544\uC694\uD55C \uAC1C\uB150\xB7\uC815\uC758\xB7\uACF5\uC2DD\xB7\uC808\uCC28\xB7\uC0AC\uB840\uB9CC \uC8FC\uC81C\uBCC4\uB85C \uC815\uB9AC\uD558\uC138\uC694.
- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC0AC\uC2E4\uC744 \uB9CC\uB4E4\uC9C0 \uB9C8\uC138\uC694.
- \uC218\uC2DD\uC740 \uC6D0\uBB38 \uD45C\uAE30\uB97C \uC720\uC9C0\uD558\uC138\uC694 ($...$ / $$...$$).
- \uC751\uB2F5\uC740 \uB9C8\uD06C\uB2E4\uC6B4 \uC694\uC57D\uBB38\uB9CC \uC791\uC131\uD558\uC138\uC694. JSON\xB7\uCF54\uB4DC\uD39C\uC2A4\xB7\uC11C\uB450\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.`;
function _c(e, n, s) {
  return e === "subjective" ? `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uCD9C\uC81C\uC704\uC6D0\uC785\uB2C8\uB2E4. \uC81C\uACF5\uB41C \uADFC\uAC70 \uC694\uC57D\uBCF8\uB9CC \uC0AC\uC6A9\uD574 \uBB38\uD56D\uC744 \uB9CC\uB4DC\uB2C8\uB2E4.
\uC694\uC57D\uBCF8 \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.
\uC751\uB2F5\uC740 JSON \uBC30\uC5F4\uB9CC \uBC18\uD658\uD558\uC138\uC694. \uB2E4\uB978 \uD14D\uC2A4\uD2B8\xB7\uB9C8\uD06C\uB2E4\uC6B4\xB7\uCF54\uB4DC\uD39C\uC2A4\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.
\uC2A4\uD0A4\uB9C8:
[{"kind":"subjective","answerStyle":"short"|"essay","question":"...","modelAnswer":"...","point":"...","explanation":"..."}]
\uC815\uD655\uD788 ${s}\uAC1C \uBB38\uD56D\uC744 \uBC18\uD658\uD558\uC138\uC694.` : `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uCD9C\uC81C\uC704\uC6D0\uC785\uB2C8\uB2E4. \uC81C\uACF5\uB41C \uADFC\uAC70 \uC694\uC57D\uBCF8\uB9CC \uC0AC\uC6A9\uD574 \uAC1D\uAD00\uC2DD \uBB38\uD56D\uC744 \uB9CC\uB4ED\uB2C8\uB2E4.
\uC694\uC57D\uBCF8 \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.
\uC120\uD0DD\uC9C0(options) \uC548\uC5D0\uC11C\uB294 \uC778\uB77C\uC778 \uC218\uC2DD($...$)\uB9CC \uC0AC\uC6A9\uD558\uC138\uC694.
options \uAC01 \uD56D\uBAA9\uC5D0\uB294 \uBCF4\uAE30 \uBC88\uD638 \uC811\uB450\uC0AC(1., 2., a., \uAC00. \uB4F1)\uB97C \uB123\uC9C0 \uB9C8\uC138\uC694. \uC120\uD0DD\uC9C0 \uBCF8\uBB38\uB9CC \uC791\uC131\uD569\uB2C8\uB2E4.
\uC751\uB2F5\uC740 JSON \uBC30\uC5F4\uB9CC \uBC18\uD658\uD558\uC138\uC694. \uB2E4\uB978 \uD14D\uC2A4\uD2B8\xB7\uB9C8\uD06C\uB2E4\uC6B4\xB7\uCF54\uB4DC\uD39C\uC2A4\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.
\uC2A4\uD0A4\uB9C8:
[{"question":"...","options":[${Array.from({ length: n }, () => '"..."').join(",")}],"answer":1,"point":"...","explanation":"..."}]
- options \uAE38\uC774\uB294 \uC815\uD655\uD788 ${n}
- answer\uB294 1~${n} \uC815\uC218
\uC815\uD655\uD788 ${s}\uAC1C \uBB38\uD56D\uC744 \uBC18\uD658\uD558\uC138\uC694.`;
}
function Dc(e) {
  return e.length ? e.slice(0, 8).map((n, s) => {
    const r = `${s + 1}. [${n.kind}${n.answerStyle ? `/${n.answerStyle}` : ""}] ${n.question}`;
    if (n.kind === "choice") {
      const o = (n.options || []).map((a, c) => `   ${c + 1}. ${a}${n.answer === c + 1 ? " (\uC815\uB2F5)" : ""}`).join(`
`);
      return `${r}
${o}
   Point: ${n.point || ""}`;
    }
    return `${r}
   \uBAA8\uBC94\uB2F5\uC548: ${n.modelAnswer || ""}
   Point: ${n.point || ""}`;
  }).join(`

`) : "(\uC81C\uC2DC \uBB38\uD56D \uC5C6\uC74C \u2014 \uBB38\uC11C\uC758 \uD575\uC2EC \uAC1C\uB150 \uC911\uC2EC\uC73C\uB85C \uC694\uC57D)";
}
async function Fc(e, n) {
  var _a2, _b, _c2;
  const s = $e(), r = Array.isArray(e) ? e : [], o = it(r, ((_a2 = n == null ? void 0 : n.profileId) == null ? void 0 : _a2.trim()) || s.profileId || os());
  if (!o) return { ready: false, message: "AI \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\xB7\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." };
  const a = (((_b = n == null ? void 0 : n.model) == null ? void 0 : _b.trim()) || ((_c2 = s.modelId) == null ? void 0 : _c2.trim()) || is(o.id, o.kind)).trim();
  if (o.kind === wr) {
    const c = yr(), f = await vr(c);
    if (!f.running) return { ready: false, message: "MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." };
    const u = a || c.selectedModelId || f.models[0] || "";
    return u ? { ready: true, profile: o, model: u } : { ready: false, message: "\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694." };
  }
  if (o.kind === Sr) {
    const c = jr();
    let f = [];
    try {
      const d = await ci(c);
      if (f = Array.isArray(d.models) ? d.models : [], !d.running && !c.selectedModelId && !a) return { ready: false, message: "llama.cpp \uBAA8\uB378\uC774 \uC900\uBE44\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\xB7\uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." };
    } catch {
      if (!c.selectedModelId && !a) return { ready: false, message: "llama.cpp \uBAA8\uB378\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694." };
    }
    const u = a || c.selectedModelId || f[0] || "";
    return u ? { ready: true, profile: o, model: u } : { ready: false, message: "\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694." };
  }
  return o.kind === Cr ? (o.baseUrl || "").trim() ? a ? { ready: true, profile: o, model: a } : { ready: false, message: "\uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uACE0\uB978 \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." } : { ready: false, message: "OpenAI \uD638\uD658 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uB610\uB294 AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\uB97C \uD655\uC778\uD558\uC138\uC694." } : a ? ((o.apiKey || "").trim(), { ready: true, profile: o, model: a }) : { ready: false, message: "Gemini \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uACE0\uB978 \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." };
}
function Bc(e) {
  const n = String(e || "");
  return /제공자|프로필|모델을 선택|모델이 로드|모델이 준비|API 키|Endpoint URL|AI 도우미에서/i.test(n);
}
function De(e) {
  const n = String(e || "").trim();
  if (!n) throw new Error("\uBE48 LLM \uC751\uB2F5");
  try {
    return JSON.parse(n);
  } catch {
    const s = n.indexOf("{"), r = n.lastIndexOf("}");
    if (s >= 0 && r > s) return JSON.parse(n.slice(s, r + 1));
    const o = n.indexOf("["), a = n.lastIndexOf("]");
    if (o >= 0 && a > o) return JSON.parse(n.slice(o, a + 1));
    throw new Error("JSON \uD30C\uC2F1 \uC2E4\uD328");
  }
}
function qc(e) {
  const n = e && typeof e == "object" ? e : {}, s = String(n.verdict || "wrong"), r = s === "correct" || s === "partial" ? s : "wrong", o = Math.min(100, Math.max(0, Number(n.score) || (r === "correct" ? 100 : r === "partial" ? 50 : 0))), a = String(n.feedback || "").trim() || "\uCC44\uC810 \uD53C\uB4DC\uBC31\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.", c = String(n.rationale || "").trim();
  return c ? { verdict: r, score: o, feedback: a, rationale: c } : { verdict: r, score: o, feedback: a };
}
function tn(e, n) {
  const s = { ...e };
  return n.signal && (s.signal = n.signal), n.onChunk && (s.onChunk = n.onChunk), s;
}
async function Se(e) {
  var _a2, _b, _c2;
  const n = $e(), s = Array.isArray(e.profiles) ? e.profiles : [], r = it(s, ((_a2 = e.profileId) == null ? void 0 : _a2.trim()) || n.profileId || os());
  if (!r) throw new Error("AI \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\xB7\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
  const o = (((_b = e.model) == null ? void 0 : _b.trim()) || ((_c2 = n.modelId) == null ? void 0 : _c2.trim()) || is(r.id, r.kind)).trim(), a = (e.systemPrompt || n.systemPrompt || "").trim(), c = e.instruction.trim(), f = { temperature: typeof e.temperature == "number" ? e.temperature : n.temperature }, u = {};
  if (e.signal && (u.signal = e.signal), e.onChunk && (u.onChunk = e.onChunk), r.kind === Cr) {
    const d = (r.baseUrl || "").trim();
    if (!d) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
    return Ct(r.id, o), di(o), Tn(r.id, () => r.apiKey || "", (x) => Gs(tn({ baseUrl: d, apiKey: x, model: o, instruction: c, systemPrompt: a, selectedText: "", requestOptions: f }, u)), { allowEmpty: true, missingKeyMessage: "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
  }
  if (r.kind === Sr) {
    const d = jr(), x = await ui(d, e.signal ? { signal: e.signal } : {}), m = (r.baseUrl || x.baseUrl || "").trim();
    if (!m) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    const g = o.trim() || d.selectedModelId || x.models[0] || "";
    if (!g) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
    return Ct(r.id, g), Tn(r.id, () => r.apiKey || d.apiKey || "no-key-required", (w) => Gs(tn({ baseUrl: m, apiKey: w, model: g, instruction: c, systemPrompt: a, selectedText: "", requestOptions: f }, u)), { allowEmpty: true, missingKeyMessage: "llama.cpp API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." });
  }
  if (r.kind === wr) {
    const d = yr(), x = await vr(d);
    if (!x.running) throw new Error("MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
    const m = o.trim() || d.selectedModelId || x.models[0] || "";
    if (!m) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
    return Ct(r.id, m), fi(tn({ instruction: c, systemPrompt: a, selectedText: "", requestOptions: f }, u));
  }
  if (mi(o)) throw new Error("\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
  return Ct(r.id, o), pi(o), Tn(r.id, () => r.apiKey || "", (d) => xi(tn({ apiKey: d, model: o, instruction: c, systemPrompt: a, selectedText: "", requestOptions: f }, u)), { missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
}
function Mt(e, n, s) {
  const r = e && typeof e == "object" ? e : {};
  if ((r.kind === "subjective" ? "subjective" : (Array.isArray(r.options), "choice")) === "subjective") return { kind: "subjective", answerStyle: r.answerStyle === "essay" ? "essay" : "short", question: String(r.question || "").trim(), modelAnswer: String(r.modelAnswer || r.answer || "").trim(), point: String(r.point || "\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694."), explanation: String(r.explanation || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.") };
  const a = Array.isArray(r.options) ? r.options.map((f) => Tc(String(f || ""))).slice(0, n) : [];
  for (; a.length < Math.min(2, n); ) a.push("");
  const c = Number.parseInt(String(r.answer ?? s), 10) || s;
  return { kind: "choice", question: String(r.question || "").trim(), options: a, answer: Math.min(n, Math.max(1, c)), point: String(r.point || "\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694."), explanation: String(r.explanation || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."), isGenerated: true };
}
function je(e, n, s, r, o) {
  var _a2, _b;
  const a = { profiles: e, instruction: n, systemPrompt: s, temperature: r };
  return (o == null ? void 0 : o.signal) && (a.signal = o.signal), (o == null ? void 0 : o.onChunk) && (a.onChunk = o.onChunk), ((_a2 = o == null ? void 0 : o.profileId) == null ? void 0 : _a2.trim()) && (a.profileId = o.profileId.trim()), ((_b = o == null ? void 0 : o.model) == null ? void 0 : _b.trim()) && (a.model = o.model.trim()), a;
}
function Fe(e) {
  return e ? { signal: e } : void 0;
}
function ls(e) {
  var _a2, _b;
  const n = {};
  return e.signal && (n.signal = e.signal), e.onChunk && (n.onChunk = e.onChunk), ((_a2 = e.profileId) == null ? void 0 : _a2.trim()) && (n.profileId = e.profileId.trim()), ((_b = e.model) == null ? void 0 : _b.trim()) && (n.model = e.model.trim()), n.signal || n.onChunk || n.profileId || n.model ? n : void 0;
}
async function ur(e) {
  const n = $e(), s = e.question, o = `\uB2E4\uC74C ${s.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615"} \uC8FC\uAD00\uC2DD \uBB38\uD56D\uC758 \uC218\uD5D8\uC790 \uB2F5\uC548\uC744 \uCC44\uC810\uD558\uC138\uC694.

[\uBB38\uC81C]
${s.question}

[\uBAA8\uBC94 \uB2F5\uC548 / \uC815\uB2F5]
${s.modelAnswer || ""}

[\uC811\uADFC Point]
${s.point || ""}

[\uD574\uC124]
${s.explanation || ""}

[\uC218\uD5D8\uC790 \uB2F5\uC548]
${e.userAnswer}

\uCC44\uC810 \uADDC\uCE59:
- \uB2E8\uB2F5\uD615: \uB3D9\uC758\uC5B4\xB7\uD45C\uAE30 \uCC28\uC774(\uB300\uC18C\uBB38\uC790, \uACF5\uBC31, \uB2E8\uC704)\uB97C \uC778\uC815\uD558\uC138\uC694.
- \uC11C\uC220\uD615: \uBAA8\uBC94 \uB2F5\uC548\uACFC \uC811\uADFC Point\uC758 \uD575\uC2EC\uC774 \uD3EC\uD568\uB418\uBA74 partial \uC774\uC0C1\uC744 \uC8FC\uC138\uC694.
- score\uB294 0~100 (correct\u226590, partial 40~89, wrong<40).

JSON\uB9CC \uBC18\uD658:
{"verdict":"correct"|"partial"|"wrong","score":0,"feedback":"...","rationale":"..."}`, a = await Se(je(e.profiles, o, "\uB2F9\uC2E0\uC740 \uACF5\uC815\uD55C \uC2DC\uD5D8 \uCC44\uC810\uC704\uC6D0\uC785\uB2C8\uB2E4. JSON\uB9CC \uBC18\uD658\uD558\uC138\uC694.", n.gradeTemperature, Fe(e.signal)));
  return qc(De(a));
}
async function Uc(e) {
  var _a2;
  const n = e.question, s = n.options || [], r = e.selectedOption, o = r === n.answer, a = ((_a2 = e.userInstructions) == null ? void 0 : _a2.trim()) ? `
[\uC218\uD5D8\uC790 \uCD94\uAC00 \uC9C8\uBB38]
${e.userInstructions.trim()}
\uC704 \uC9C8\uBB38\uC5D0\uB3C4 \uB2F5\uBCC0\uD558\uC138\uC694.` : "", f = `${o ? `\uC218\uD5D8\uC790\uAC00 ${r}\uBC88(\uC815\uB2F5)\uC744 \uACE8\uB790\uC2B5\uB2C8\uB2E4. \uC65C \uC815\uB2F5\uC778\uC9C0, \uB2E4\uB978 \uBCF4\uAE30\uAC00 \uC65C \uD2C0\uB838\uB294\uC9C0 \uC124\uBA85\uD558\uC138\uC694.` : `\uC218\uD5D8\uC790\uAC00 ${r}\uBC88\uC744 \uACE8\uB790\uC2B5\uB2C8\uB2E4. \uC65C \uC624\uB2F5\uC778\uC9C0 \uC124\uBA85\uD558\uC138\uC694.`}

[\uBB38\uC81C] ${n.question}
[\uBCF4\uAE30]
${s.map((u, d) => `${d + 1}. ${u}`).join(`
`)}
[\uC815\uB2F5] ${n.answer}\uBC88
[\uC120\uD0DD\uD55C \uBCF4\uAE30] ${r}\uBC88 (${s[r - 1] || ""})
[\uAE30\uC874 \uD574\uC124] ${n.explanation || ""}
${a}

\uC124\uBA85 \uD14D\uC2A4\uD2B8\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
  return Se(je(e.profiles, f, "\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124 \uC791\uC131\uC790\uC785\uB2C8\uB2E4.", 0.5, ls({ signal: e.signal, onChunk: e.onChunk, profileId: e.profileId, model: e.model })));
}
async function Gc(e) {
  const n = e.question, s = n.options || [], r = e.selectedOption, o = `\uC218\uD5D8\uC790\uAC00 \uAC1D\uAD00\uC2DD \uBB38\uC81C \uD480\uC774 \uD6C4 \uC544\uB798 \uBD84\uC11D \uB0B4\uC6A9\uC744 \uC77D\uACE0 \uCD94\uAC00 \uC9C8\uBB38\uC744 \uD588\uC2B5\uB2C8\uB2E4. \uBB38\uC81C, \uBCF4\uAE30, \uAE30\uC874 \uBD84\uC11D\uB9CC \uADFC\uAC70\uB85C \uCD94\uAC00 \uC9C8\uBB38\uC5D0 \uB2F5\uD558\uC138\uC694.

[\uBB38\uC81C]
${n.question}

[\uBCF4\uAE30]
${s.map((a, c) => `${c + 1}. ${a}`).join(`
`)}

[\uC815\uB2F5] ${n.answer}\uBC88
[\uC218\uD5D8\uC790\uAC00 \uC120\uD0DD\uD55C \uBCF4\uAE30] ${r}\uBC88 (${s[r - 1] || ""})
[\uAE30\uC874 \uD574\uC124] ${n.explanation || ""}

[\uAE30\uC874 \uC624\uB2F5/\uC815\uB2F5 \uBD84\uC11D]
${e.existingAnalysis.trim()}

[\uC218\uD5D8\uC790 \uCD94\uAC00 \uC9C8\uBB38]
${e.userQuestion.trim()}

\uC751\uB2F5 \uD615\uC2DD (\uBC18\uB4DC\uC2DC \uC900\uC218):
- \uCCAB \uC904\uC740 \uBC18\uB4DC\uC2DC **[\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0: {\uC9C8\uBB38 \uC694\uC57D}]** \uD615\uC2DD (\uB9C8\uD06C\uB2E4\uC6B4 \uBCFC\uB4DC, \uD55C \uC904)
- \uC9C8\uBB38 \uC694\uC57D\uC740 \uC218\uD5D8\uC790 \uC9C8\uBB38\uC758 \uD575\uC2EC\uC744 \uC9E7\uAC8C \uC694\uC57D (\uC608: \uC9C0\uB2C8 \uC9C0\uC218\uC640 \uC5D4\uD2B8\uB85C\uD53C\uC758 \uC218\uC2DD\uC801 \uCC28\uC774)
- \uADF8 \uB2E4\uC74C \uC904\uBD80\uD130 \uB2F5\uBCC0 \uBCF8\uBB38 (\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uB2A5)
- \uC11C\uB450 \uC124\uBA85\uC774\uB098 JSON\uC740 \uB123\uC9C0 \uB9C8\uC138\uC694.`;
  return Se(je(e.profiles, o, "\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124 \uD29C\uD130\uC785\uB2C8\uB2E4. \uBB38\uC81C\uC640 \uAE30\uC874 \uBD84\uC11D \uB0B4\uC6A9\uB9CC \uADFC\uAC70\uB85C \uB2F5\uD558\uC138\uC694.", 0.5, ls({ signal: e.signal, onChunk: e.onChunk, profileId: e.profileId, model: e.model })));
}
async function Wc(e) {
  const n = $e(), s = e.question, r = Te(s, e.config.choiceCount || 4), o = Math.floor(Math.random() * r) + 1, a = (s.options || []).map((S) => String(S || "")), c = s.answer && s.answer >= 1 ? s.answer : 1, f = (S) => {
    var _a2;
    return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, S);
  };
  let u = "";
  const d = e.sourcePaths || [];
  if (d.length > 0 && e.readText) {
    f({ step: "rag", status: "running", detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026" });
    const { chunks: S } = await bn({ sourcePaths: d, query: `${s.question}
${s.point || ""}`, readText: e.readText });
    u = kn(S), f({ step: "rag", status: "done", detail: S.length > 0 ? `${S.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C", llmInstruction: `query: ${s.question}`, llmResponse: le(u || "(no excerpts)") });
  }
  const x = n.calcComplexity === "hand" ? "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5]" : "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uACC4\uC0B0\uAE30 \uD544\uC218]", m = qr({ question: s.question, options: a, answer: c, point: s.point || "", explanation: s.explanation || "", ...u ? { ragBlock: u } : {} }), g = Math.min(n.temperature, 0.6);
  f({ step: "analysis", status: "running", detail: "LLM \uBB38\uD56D \uBD84\uC11D \uC911\u2026", llmInstruction: m, systemPrompt: at });
  const w = await Se(je(e.profiles, m, at, g, Fe(e.signal))), v = _r(De(w));
  f({ step: "analysis", status: "done", detail: `${v.coreCategory}${v.isCalculation ? " \xB7 \uACC4\uC0B0\uBB38\uC81C" : ""}`, llmInstruction: m, llmResponse: le(w), systemPrompt: at });
  const y = lt(v);
  let z = "";
  if (v.isCalculation && v.variables.length > 0) {
    f({ step: "randomize", status: "running", detail: "\uC218\uCE58 \uBCC0\uC218 \uC0D8\uD50C\uB9C1\u2026" });
    const S = Dr(v.variables);
    z = Fr(S);
    const I = S.map((M) => `${M.id}=${M.value}${M.unit ? M.unit : ""}`).join(", ");
    f({ step: "randomize", status: "done", detail: I, llmInstruction: lt(v), llmResponse: le(JSON.stringify({ samples: S, variables: v.variables }, null, 2)) });
  } else f({ step: "randomize", status: "skipped", detail: "\uBE44\uACC4\uC0B0 \uBB38\uD56D", llmResponse: le(lt(v)) });
  const N = bl({ question: s.question, options: a, answer: c, point: s.point || "", explanation: s.explanation || "", choiceCount: r, targetAnswer: o, complexity: x, analysisBlock: y, sampledBlock: z, ...u ? { ragBlock: u } : {} }), j = Br(n.systemPrompt || Nr);
  f({ step: "generate", status: "running", detail: "LLM \uBB38\uD56D \uC791\uC131 \uC911\u2026", llmInstruction: N, systemPrompt: j });
  const b = await Se(je(e.profiles, N, j, n.temperature, Fe(e.signal))), $ = De(b);
  f({ step: "generate", status: "done", detail: `\uC815\uB2F5 ${o}\uBC88`, llmInstruction: N, llmResponse: le(b), systemPrompt: j });
  let k = Mt($, r, o);
  if (!mn(k)) {
    const S = dt(k.point), I = ut(k.explanation), M = Ur({ question: k.question, options: k.options || [], answer: k.answer || o, analysisBlock: y, missingPoint: S, missingExplanation: I });
    f({ step: "generate", status: "running", detail: "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC911\u2026", llmInstruction: M, systemPrompt: j });
    const B = await Se(je(e.profiles, M, j, Math.min(n.temperature, 0.8), Fe(e.signal))), T = De(B), O = T && typeof T == "object" ? T : {};
    S && typeof O.point == "string" && O.point.trim() && (k = { ...k, point: String(O.point).trim() }), I && typeof O.explanation == "string" && O.explanation.trim() && (k = { ...k, explanation: String(O.explanation).trim() }), f({ step: "generate", status: "done", detail: mn(k) ? "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC644\uB8CC" : "\uD574\uC124\xB7\uC811\uADFC Point \uC77C\uBD80 \uBCF4\uC644", llmInstruction: M, llmResponse: le(B), systemPrompt: j });
  }
  return { ...k, isGenerated: true };
}
async function Jc(e) {
  const n = $e(), s = e.question, r = Te(s, e.config.choiceCount || 4), o = e.target.kind === "choice" ? Je(e.target.choiceCount) : r, a = e.target.kind === "choice" ? Math.floor(Math.random() * o) + 1 : 1, c = (s.options || []).map((I) => String(I || "")), f = s.answer && s.answer >= 1 ? s.answer : 1, u = (I) => {
    var _a2;
    return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, I);
  };
  let d = "";
  const x = e.sourcePaths || [];
  if (x.length > 0 && e.readText) {
    u({ step: "rag", status: "running", detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026" });
    const I = [s.question, s.point || "", e.target.userPrompt || ""].filter(Boolean).join(`
`), { chunks: M } = await bn({ sourcePaths: x, query: I, readText: e.readText });
    d = kn(M), u({ step: "rag", status: "done", detail: M.length > 0 ? `${M.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C", llmInstruction: `query: ${I}`, llmResponse: le(d || "(no excerpts)") });
  }
  const m = n.calcComplexity === "hand" ? "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5]" : "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uACC4\uC0B0\uAE30 \uD544\uC218]", g = qr({ question: s.question, options: c, answer: s.kind === "choice" ? f : 1, point: s.point || "", explanation: s.explanation || "", ...d ? { ragBlock: d } : {} }), w = Math.min(n.temperature, 0.6);
  u({ step: "analysis", status: "running", detail: "LLM \uBB38\uD56D \uBD84\uC11D \uC911\u2026", llmInstruction: g, systemPrompt: at });
  const v = await Se(je(e.profiles, g, at, w, Fe(e.signal))), y = _r(De(v));
  u({ step: "analysis", status: "done", detail: `${y.coreCategory}${y.isCalculation ? " \xB7 \uACC4\uC0B0\uBB38\uC81C" : ""}`, llmInstruction: g, llmResponse: le(v), systemPrompt: at });
  const z = lt(y);
  let N = "";
  if (y.isCalculation && y.variables.length > 0) {
    u({ step: "randomize", status: "running", detail: "\uC218\uCE58 \uBCC0\uC218 \uC0D8\uD50C\uB9C1\u2026" });
    const I = Dr(y.variables);
    N = Fr(I);
    const M = I.map((B) => `${B.id}=${B.value}${B.unit ? B.unit : ""}`).join(", ");
    u({ step: "randomize", status: "done", detail: M, llmInstruction: lt(y), llmResponse: le(JSON.stringify({ samples: I, variables: y.variables }, null, 2)) });
  } else u({ step: "randomize", status: "skipped", detail: "\uBE44\uACC4\uC0B0 \uBB38\uD56D", llmResponse: le(lt(y)) });
  const j = jc({ question: s.question, options: c, answer: s.kind === "choice" ? f : 1, point: s.point || "", explanation: s.explanation || "", sourceKind: s.kind, ...s.answerStyle ? { sourceAnswerStyle: s.answerStyle } : {}, target: e.target, complexity: m, analysisBlock: z, sampledBlock: N, ...e.target.kind === "choice" ? { targetAnswer: a } : {}, ...d ? { ragBlock: d } : {} }), b = Sc(n.systemPrompt || Nr);
  u({ step: "generate", status: "running", detail: "\uD30C\uC0DD \uBB38\uD56D \uC791\uC131 \uC911\u2026", llmInstruction: j, systemPrompt: b });
  const $ = await Se(je(e.profiles, j, b, n.temperature, Fe(e.signal))), k = De($);
  u({ step: "generate", status: "done", detail: e.target.kind === "choice" ? `\uC815\uB2F5 ${a}\uBC88 \xB7 ${o}\uC9C0\uC120\uB2E4` : e.target.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615", llmInstruction: j, llmResponse: le($), systemPrompt: b });
  let S = Mt(k, o, a);
  if (e.target.kind === "subjective" ? S = { kind: "subjective", answerStyle: e.target.answerStyle === "essay" ? "essay" : "short", question: S.question, modelAnswer: S.modelAnswer || "", point: S.point, explanation: S.explanation, isGenerated: true } : S = { kind: "choice", question: S.question, options: Ye(S.options || [], o), answer: Math.min(o, Math.max(1, S.answer || a)), point: S.point, explanation: S.explanation, isGenerated: true }, !mn(S)) {
    const I = dt(S.point), M = ut(S.explanation), B = Ur({ question: S.question, options: S.kind === "choice" ? S.options || [] : [], answer: S.kind === "choice" && S.answer ? S.answer : a, analysisBlock: z, missingPoint: I, missingExplanation: M });
    u({ step: "generate", status: "running", detail: "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC911\u2026", llmInstruction: B, systemPrompt: b });
    const T = await Se(je(e.profiles, B, b, Math.min(n.temperature, 0.8), Fe(e.signal))), O = De(T), _ = O && typeof O == "object" ? O : {};
    I && typeof _.point == "string" && _.point.trim() && (S = { ...S, point: String(_.point).trim() }), M && typeof _.explanation == "string" && _.explanation.trim() && (S = { ...S, explanation: String(_.explanation).trim() }), u({ step: "generate", status: "done", detail: mn(S) ? "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC644\uB8CC" : "\uD574\uC124\xB7\uC811\uADFC Point \uC77C\uBD80 \uBCF4\uC644", llmInstruction: B, llmResponse: le(T), systemPrompt: b });
  }
  return { ...S, isGenerated: true };
}
const Hc = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124\xB7\uC811\uADFC Point \uC791\uC131\uC790\uC785\uB2C8\uB2E4.
\uC8FC\uC5B4\uC9C4 \uBB38\uD56D\uB9CC \uADFC\uAC70\uB85C \uC811\uADFC Point\uC640 \uD574\uC124\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.
- \uC811\uADFC Point: \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C. \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC.
- \uD574\uC124: \uC815\uB2F5 \uADFC\uAC70\xB7\uD568\uC815\xB7\uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124. \uB9C8\uD06C\uB2E4\uC6B4 \uC0AC\uC6A9 \uAC00\uB2A5.
- placeholder \uBB38\uAD6C\uB098 \uBE48 \uBB38\uC790\uC5F4\uB85C \uCC44\uC6B0\uC9C0 \uB9C8\uC138\uC694.
\uC751\uB2F5\uC740 \uC694\uCCAD\uB41C JSON\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
async function Kc(e) {
  var _a2;
  const n = $e(), s = e.question;
  if (!e.missingPoint && !e.missingExplanation) return {};
  let r = "";
  const o = e.sourcePaths || [];
  if (o.length > 0 && e.readText) {
    const x = [s.question, s.point || "", s.explanation || ""].filter(Boolean).join(`
`), { chunks: m } = await bn({ sourcePaths: o, query: x, readText: e.readText });
    r = kn(m);
  }
  const a = kl({ question: s, missingPoint: e.missingPoint, missingExplanation: e.missingExplanation, ...r ? { ragBlock: r } : {} }), c = await Se(je(e.profiles, a, ((_a2 = n.systemPrompt) == null ? void 0 : _a2.trim()) || Hc, Math.min(n.temperature, 0.8), ls({ signal: e.signal, profileId: e.profileId, model: e.model }))), f = De(c), u = f && typeof f == "object" && !Array.isArray(f) ? f : {}, d = {};
  return e.missingPoint && typeof u.point == "string" && u.point.trim() && !dt(u.point) && (d.point = String(u.point).trim()), e.missingExplanation && typeof u.explanation == "string" && u.explanation.trim() && !ut(u.explanation) && (d.explanation = String(u.explanation).trim()), d;
}
async function Vc(e) {
  var _a2, _b, _c2, _d2;
  const n = $e(), s = Array.isArray(e.exampleQuestions) ? e.exampleQuestions : [], r = [...s].reverse().find((b) => b.kind === "choice"), o = r ? Te(r, e.config.choiceCount || 4) : e.config.choiceCount || 4, a = Math.min(5, Math.max(1, e.count || 1)), c = e.kind || "choice", f = (e.topic || "").trim(), u = (b) => {
    var _a3;
    return (_a3 = e.onStep) == null ? void 0 : _a3.call(e, b);
  };
  u({ step: "load_sources", status: "running", detail: "\uBB38\uC11C \uC77D\uAE30 \uC911\u2026" }), (_a2 = e.onProgress) == null ? void 0 : _a2.call(e, "\uADFC\uAC70 \uBB38\uC11C \uB85C\uB4DC \uC911\u2026");
  const d = await yc(e.sourcePaths, e.readText, n.ragMaxChars);
  if (!d.length) throw u({ step: "load_sources", status: "error", error: "\uADFC\uAC70 \uBB38\uC11C\uC5D0\uC11C \uB0B4\uC6A9\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4." }), new Error("\uADFC\uAC70 \uBB38\uC11C\uC5D0\uC11C \uB0B4\uC6A9\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  u({ step: "load_sources", status: "done", detail: `${d.length}\uAC1C \uBB38\uC11C`, llmResponse: le(d.map((b) => `- ${b.path} (${b.text.length.toLocaleString()} chars)`).join(`
`)) });
  const x = Dc(s), m = [];
  let g = "";
  for (let b = 0; b < d.length; b += 1) {
    const $ = d[b];
    if (!$) continue;
    if ((_b = e.signal) == null ? void 0 : _b.aborted) throw new DOMException("Aborted", "AbortError");
    const k = `\uBB38\uC11C \uC694\uC57D ${b + 1}/${d.length}: ${$.path}`, S = `[\uCD9C\uC81C \uCC38\uACE0 \uBB38\uD56D \uC608\uC2DC]
\uC81C\uC2DC\uB41C \uBB38\uD56D \uC2A4\uD0C0\uC77C\xB7\uAC1C\uB150 \uBC94\uC704\uB97C \uCC38\uACE0\uD574, \uC544\uB798 \uC6D0\uBB38\uC5D0\uC11C \uCD9C\uC81C\uC5D0 \uD544\uC694\uD55C \uC815\uBCF4\uB9CC \uC8FC\uC81C\uBCC4\uB85C \uC0C1\uC138 \uC694\uC57D\uD558\uC138\uC694.

${x}

[\uC0AC\uC6A9\uC790 \uC8FC\uC81C]
${f || "(\uC608\uC2DC \uBB38\uD56D\xB7\uBB38\uC11C \uD575\uC2EC \uAC1C\uB150)"}

[\uADFC\uAC70 \uBB38\uC11C \uACBD\uB85C]
${$.path}

[\uADFC\uAC70 \uBB38\uC11C \uBCF8\uBB38]
${$.text}

\uC704 \uBCF8\uBB38\uC744 \uC8FC\uC81C\uBCC4 \uB9C8\uD06C\uB2E4\uC6B4 \uC694\uC57D\uC73C\uB85C\uB9CC \uC791\uC131\uD558\uC138\uC694.`;
    u({ step: "summarize", status: "running", detail: k, llmInstruction: S, systemPrompt: en, ...g ? { llmResponse: g } : {} }), (_c2 = e.onProgress) == null ? void 0 : _c2.call(e, k);
    const I = await Se(je(e.profiles, S, en, Math.min(n.temperature, 0.7), Fe(e.signal))), M = String(I || "").trim();
    M && (m.push({ path: $.path, summary: M }), g += `### ${$.path}

${le(M, 24e3)}

---

`, u({ step: "summarize", status: "running", detail: k, llmInstruction: S, systemPrompt: en, llmResponse: g }));
  }
  if (!m.length) throw u({ step: "summarize", status: "error", error: "\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." }), new Error("\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
  u({ step: "summarize", status: "done", detail: `${m.length}\uAC1C \uC694\uC57D \uC644\uB8CC`, llmResponse: le(g), systemPrompt: en }), (_d2 = e.onProgress) == null ? void 0 : _d2.call(e, "\uC694\uC57D\uBCF8\uC73C\uB85C \uBB38\uD56D \uC0DD\uC131 \uC911\u2026");
  const w = m.map((b, $) => `### \uC694\uC57D\uBCF8 ${$ + 1}
\uACBD\uB85C: ${b.path}

${b.summary}`).join(`

---

`), v = `[\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uBCF8 (${m.length}\uAC1C)]
\uC544\uB798 \uC694\uC57D\uBCF8\uB9CC \uC0AC\uC2E4 \uADFC\uAC70\uB85C \uC0AC\uC6A9\uD558\uC138\uC694. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9\uC740 \uC4F0\uC9C0 \uB9C8\uC138\uC694.

${w}

[\uCD9C\uC81C \uC9C0\uC2DC]
\uC8FC\uC81C: ${f || "(\uC694\uC57D\uBCF8\uC758 \uD575\uC2EC \uAC1C\uB150)"}
\uBB38\uD56D \uC720\uD615: ${c === "subjective" ? "\uC8FC\uAD00\uC2DD" : `\uAC1D\uAD00\uC2DD ${o}\uC9C0\uC120\uB2E4`}
\uC0DD\uC131 \uAC1C\uC218: ${a}

\uAE30\uC874 \uBB38\uD56D \uC2A4\uD0C0\uC77C \uCC38\uACE0:
${x}

JSON \uBC30\uC5F4\uB9CC \uBC18\uD658\uD558\uC138\uC694.`, y = _c(c, o, a);
  u({ step: "generate", status: "running", detail: "LLM \uBB38\uD56D \uC791\uC131 \uC911\u2026", llmInstruction: v, systemPrompt: y });
  const z = await Se(je(e.profiles, v, y, n.temperature, Fe(e.signal))), N = De(z), j = Array.isArray(N) ? N : [N];
  return u({ step: "generate", status: "done", detail: `${Math.min(j.length, a)}\uAC1C \uBB38\uD56D`, llmInstruction: v, llmResponse: le(z), systemPrompt: y }), j.slice(0, a).map((b, $) => {
    if (c === "subjective") {
      const k = b && typeof b == "object" ? { ...b, kind: "subjective" } : { kind: "subjective" };
      return { ...Mt(k, o, $ % o + 1), isGenerated: true };
    }
    return { ...Mt(b, o, $ % o + 1), isGenerated: true };
  });
}
const Xc = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uBB38\uD56D \uD3B8\uC9D1\uC790\uC785\uB2C8\uB2E4. \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB294 \uBB38\uD56D\uC744 \uAD50\uC815\xB7\uC7AC\uC791\uC131\uD569\uB2C8\uB2E4.
- \uC0AC\uC2E4 \uAD00\uACC4\uB97C \uBC14\uB85C\uC7A1\uACE0, \uC9C0\uBB38\xB7\uC120\uD0DD\uC9C0\xB7\uC815\uB2F5\xB7\uD574\uC124\uC774 \uC2DC\uD5D8\uC5D0 \uC4F8 \uC218 \uC788\uC744 \uB9CC\uD07C \uC644\uACB0\uB418\uAC8C \uB9CC\uB4DC\uC138\uC694.
- \uC0AC\uC6A9\uC790\uAC00 \uBC29\uD5A5\uC744 \uC81C\uC2DC\uD558\uBA74 \uADF8\uC5D0 \uB9DE\uAC8C \uC8FC\uC81C\xB7\uB09C\uC774\uB3C4\xB7\uD615\uC2DD\uC744 \uC870\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.
- \uADFC\uAC70 \uBC1C\uCDCC\uAC00 \uC788\uC73C\uBA74 \uADF8 \uBC94\uC704 \uC548\uC5D0\uC11C\uB9CC \uC0AC\uC2E4\uC744 \uC0AC\uC6A9\uD558\uC138\uC694. \uC5C6\uB294 \uB0B4\uC6A9\uC744 \uC9C0\uC5B4\uB0B4\uC9C0 \uB9C8\uC138\uC694.
- \uAC1D\uAD00\uC2DD \uC120\uD0DD\uC9C0 \uC548\uC5D0\uC11C\uB294 \uC778\uB77C\uC778 \uC218\uC2DD($...$)\uB9CC \uC0AC\uC6A9\uD558\uC138\uC694.
- \uC751\uB2F5\uC740 JSON \uAC1D\uCCB4 \uD558\uB098\uB9CC \uBC18\uD658\uD558\uC138\uC694. \uB2E4\uB978 \uD14D\uC2A4\uD2B8\xB7\uB9C8\uD06C\uB2E4\uC6B4\xB7\uCF54\uB4DC\uD39C\uC2A4\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.`;
function Zc(e, n) {
  const s = [`[\uC720\uD615] ${e.kind}${e.kind === "subjective" ? ` / ${e.answerStyle || "short"}` : ""}`, `[\uC9C8\uBB38]
${e.question || "(\uBE44\uC5B4 \uC788\uC74C)"}`];
  if (e.kind === "choice") {
    const r = e.options || [];
    s.push("[\uC120\uD0DD\uC9C0]");
    for (let o = 0; o < n; o += 1) {
      const a = r[o] || "(\uBE44\uC5B4 \uC788\uC74C)", c = e.answer === o + 1 ? " \u2190 \uD604\uC7AC \uC815\uB2F5" : "";
      s.push(`${o + 1}. ${a}${c}`);
    }
  } else s.push(`[\uBAA8\uBC94 \uB2F5\uC548 / \uC815\uB2F5]
${e.modelAnswer || "(\uBE44\uC5B4 \uC788\uC74C)"}`);
  return s.push(`[\uC811\uADFC Point]
${e.point || "(\uC5C6\uC74C)"}`), s.push(`[\uD574\uC124]
${e.explanation || "(\uC5C6\uC74C)"}`), s.join(`

`);
}
function Yc(e) {
  const n = e.config.choiceCount || 4, s = e.question, r = String(e.userInstructions || "").trim(), o = s.kind === "subjective" ? `\uC8FC\uAD00\uC2DD(${s.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615"})\uC744 \uC720\uC9C0\uD558\uC138\uC694. \uC0AC\uC6A9\uC790\uAC00 \uC720\uD615 \uBCC0\uACBD\uC744 \uBA85\uC2DC\uD558\uC9C0 \uC54A\uC558\uB2E4\uBA74 \uAC1D\uAD00\uC2DD\uC73C\uB85C \uBC14\uAFB8\uC9C0 \uB9C8\uC138\uC694.` : `\uAC1D\uAD00\uC2DD ${n}\uC9C0\uC120\uB2E4\uB97C \uC720\uC9C0\uD558\uC138\uC694. options \uAE38\uC774\uB294 \uC815\uD655\uD788 ${n}, answer\uB294 1~${n} \uC815\uC218\uC785\uB2C8\uB2E4.`, a = s.kind === "subjective" ? '{"kind":"subjective","answerStyle":"short"|"essay","question":"...","modelAnswer":"...","point":"...","explanation":"..."}' : `{"kind":"choice","question":"...","options":[${Array.from({ length: n }, () => '"..."').join(",")}],"answer":1,"point":"...","explanation":"..."}`;
  return `\uB2E4\uC74C \uBB38\uD56D\uC740 \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB2E4\uACE0 \uAC04\uC8FC\uB429\uB2C8\uB2E4. \uAD50\uC815\uB41C \uC644\uC131 \uBB38\uD56D\uC744 JSON\uC73C\uB85C \uBC18\uD658\uD558\uC138\uC694.

${Zc(s, n)}

${r ? `[\uC0AC\uC6A9\uC790 \uC694\uAD6C\uC0AC\uD56D]
${r}
` : ""}${e.ragBlock ? `
[\uADFC\uAC70 \uBC1C\uCDCC]
${e.ragBlock}
` : ""}
\uADDC\uCE59:
- ${o}
- \uC9C8\uBB38\xB7\uD574\uC124\xB7Point\uB294 \uB9C8\uD06C\uB2E4\uC6B4\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.
- \uC0AC\uC6A9\uC790 \uC694\uAD6C\uC0AC\uD56D\uC774 \uC788\uC73C\uBA74 \uBB38\uD56D \uBC29\uD5A5\xB7\uC8FC\uC81C\xB7\uB09C\uC774\uB3C4\uC5D0 \uBC18\uC601\uD558\uC138\uC694.
- \uC2A4\uD0A4\uB9C8: ${a}`;
}
async function ed(e) {
  const n = $e(), s = e.question, r = Te(s, e.config.choiceCount || 4), o = (g) => {
    var _a2;
    return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, g);
  }, a = s.kind === "choice" && s.answer && s.answer >= 1 ? Math.min(r, s.answer) : 1;
  let c = "";
  const f = e.sourcePaths || [];
  if (f.length > 0 && e.readText) {
    o({ step: "rag", status: "running", detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026" });
    const g = [s.question, s.point || "", String(e.userInstructions || "").trim()].filter(Boolean).join(`
`), { chunks: w } = await bn({ sourcePaths: f, query: g, readText: e.readText });
    c = kn(w), o({ step: "rag", status: "done", detail: w.length > 0 ? `${w.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C" });
  } else o({ step: "rag", status: "skipped", detail: "\uADFC\uAC70 \uC5C6\uC74C" });
  const u = Yc({ question: s, config: e.config, ...String(e.userInstructions || "").trim() ? { userInstructions: String(e.userInstructions).trim() } : {}, ...c ? { ragBlock: c } : {} });
  o({ step: "generate", status: "running", detail: "\uBB38\uD56D \uAD50\uC815 \uC911\u2026" });
  const d = await Se(je(e.profiles, u, Xc, n.temperature, Fe(e.signal))), x = De(d), m = x && typeof x == "object" && !Array.isArray(x) ? x : Array.isArray(x) && x[0] ? x[0] : x;
  return o({ step: "generate", status: "done", detail: "\uAD50\uC815 \uC644\uB8CC" }), Mt(m, r, a);
}
function td(e) {
  const n = Array.from({ length: e }, (s, r) => r);
  for (let s = n.length - 1; s > 0; s -= 1) {
    const r = Math.floor(Math.random() * (s + 1)), o = n[s];
    n[s] = n[r], n[r] = o;
  }
  return n;
}
function nd(e) {
  const n = /* @__PURE__ */ new Map();
  for (let s = 0; s < e.length; s += 1) {
    const r = e[s];
    n.set(r + 1, s + 1);
  }
  return n;
}
function sd(e, n) {
  if (e.kind !== "choice") return null;
  const s = e.options || [];
  if (s.length < 2) return null;
  const r = n ?? td(s.length);
  if (r.length !== s.length) return null;
  const o = r.map((d) => s[d] ?? ""), a = Math.max(0, (e.answer ?? 1) - 1), c = r.indexOf(a), f = c >= 0 ? c + 1 : e.answer, u = nd(r);
  return { question: { ...e, options: o, ...f != null ? { answer: f } : {} }, oldToNew: u };
}
function rd(e, n) {
  if (typeof e != "number" || !Number.isFinite(e)) return e;
  const s = Math.round(e);
  return n.get(s) ?? e;
}
function od(e, n) {
  const s = {};
  for (const [r, o] of Object.entries(e)) {
    const a = r.lastIndexOf("_");
    if (a <= 0) continue;
    const c = r.slice(0, a), f = Number.parseInt(r.slice(a + 1), 10);
    if (!c || !Number.isFinite(f) || f < 1) continue;
    const u = n.get(c);
    if (!u) {
      s[r] = o;
      continue;
    }
    const d = u.get(f);
    d != null && (s[Ze(c, d)] = o);
  }
  return s;
}
function id(e, n) {
  const s = {};
  for (const [r, o] of Object.entries(e)) {
    const a = n.get(r);
    if (!a) {
      s[r] = o;
      continue;
    }
    const c = a.get(o);
    c != null && (s[r] = c);
  }
  return s;
}
function ad(e) {
  const n = /* @__PURE__ */ new Map();
  let s = 0;
  const r = e.questions.map((u) => {
    var _a2;
    const d = sd(u, (_a2 = e.permutationByQuestionId) == null ? void 0 : _a2.get(u.id));
    return d ? (n.set(u.id, d.oldToNew), s += 1, d.question) : u;
  }), o = { ...e.userAnswers };
  for (const u of e.questions) {
    if (u.kind !== "choice") continue;
    const d = n.get(u.id);
    if (!d) continue;
    const x = rd(o[u.id], d);
    x !== void 0 && (o[u.id] = x);
  }
  const a = od(e.wrongExps, n), c = id(e.wrongExpFocus, n), f = Xn(a);
  return { questions: r, userAnswers: o, wrongExps: a, wrongExpFocus: c, wrongChoiceExplanations: f, optionMapsByQuestionId: n, shuffledQuestionCount: s };
}
function ld(e, n, s) {
  const r = s.get(e);
  return r ? r.get(n) ?? null : n;
}
function fr(e, n, s) {
  const r = it(e, n);
  if (!r) return "";
  const o = String(s || "").trim();
  if (o) return o;
  const a = is(r.id, r.kind).trim();
  return a || hi(r.kind);
}
function cd(e) {
  const [n, s] = i.useState(""), [r, o] = i.useState(""), a = i.useCallback(() => {
    var _a2;
    const d = $e(), m = ((_a2 = it(e, d.profileId || os())) == null ? void 0 : _a2.id) ?? "";
    s(m), o(fr(e, m, d.modelId));
  }, [e]);
  i.useEffect(() => {
    a();
    const d = () => a();
    return window.addEventListener(un, d), () => window.removeEventListener(un, d);
  }, [a]);
  const c = i.useCallback((d) => {
    const x = d.trim();
    s(x), gi(x);
    const m = it(e, x), g = m ? fr(e, m.id, null) : "";
    o(g), Ws({ profileId: x || null, modelId: g || null });
  }, [e]), f = i.useCallback((d) => {
    const x = d.trim();
    o(x), Ws({ modelId: x || null });
    const m = it(e, n);
    m && Ct(m.id, x);
  }, [e, n]), u = i.useMemo(() => {
    const d = {}, x = n.trim(), m = r.trim();
    return x && (d.profileId = x), m && (d.model = m), d;
  }, [n, r]);
  return { profileId: n, model: r, onProfileIdChange: c, onModelChange: f, llmOpts: u, syncFromSettings: a };
}
const dd = 0.12;
function mr(e, n, s, r = 0) {
  const [o, a] = i.useState(true), c = i.useRef(true);
  return i.useEffect(() => {
    if (!s) {
      c.current = true, a(true);
      return;
    }
    let f = 0, u = null;
    const d = (w) => {
      c.current !== w && (c.current = w, a(w));
    }, x = () => {
      u == null ? void 0 : u.disconnect();
      const w = e.current, v = n.current;
      !w || !v || (u = new IntersectionObserver(([y]) => {
        y && (cancelAnimationFrame(f), f = requestAnimationFrame(() => {
          d(y.isIntersecting);
        }));
      }, { root: w, threshold: dd }), u.observe(v));
    };
    x();
    const m = e.current, g = typeof ResizeObserver < "u" && m != null ? new ResizeObserver(() => {
      x();
    }) : null;
    return m != null && (g == null ? void 0 : g.observe(m)), () => {
      cancelAnimationFrame(f), u == null ? void 0 : u.disconnect(), g == null ? void 0 : g.disconnect();
    };
  }, [s, r, e, n]), o;
}
function ud({ profiles: e, profileId: n, model: s, onProfileIdChange: r, onModelChange: o, busy: a = false }) {
  return t.jsxs("section", { "aria-label": "\uD034\uC988 AI \uC81C\uACF5\uC790", className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-odp-borderSoft dark:bg-odp-surface", children: [t.jsxs("div", { className: "mb-3 flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-odp-fgStrong", children: [t.jsx(Xi, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-400", "aria-hidden": true }), "AI \uC81C\uACF5\uC790"] }), t.jsx(br, { profiles: e, profileId: n, model: s, onProfileIdChange: r, onModelChange: o, disabled: a })] });
}
const fd = i.memo(ud);
function md(e) {
  return Vr(e).map((n) => n.id === "generate" ? { ...n, label: "\uD30C\uC0DD \uBB38\uD56D \uC0DD\uC131" } : n);
}
function Vr(e) {
  const n = [];
  return e && n.push({ id: "rag", label: "\uADFC\uAC70 \uBC1C\uCDCC", status: "pending" }), n.push({ id: "analysis", label: "\uBB38\uD56D \uAD6C\uC870 \uBD84\uC11D", status: "pending" }, { id: "randomize", label: "\uBCC0\uC218 \uC0D8\uD50C\uB9C1", status: "pending" }, { id: "generate", label: "\uC720\uC0AC \uBB38\uD56D \uC0DD\uC131", status: "pending" }, { id: "finalize", label: "\uBB38\uD56D \uCD94\uAC00", status: "pending" }), n;
}
function pd() {
  return [{ id: "load_sources", label: "\uADFC\uAC70 \uBB38\uC11C \uB85C\uB4DC", status: "pending" }, { id: "summarize", label: "\uBB38\uC11C \uC694\uC57D", status: "pending" }, { id: "generate", label: "\uBB38\uD56D \uC0DD\uC131", status: "pending" }, { id: "finalize", label: "\uBB38\uD56D \uCD94\uAC00", status: "pending" }];
}
function nn(e, n = 72) {
  const s = String(e || "").replace(/\s+/g, " ").trim();
  return s.length <= n ? s : `${s.slice(0, n - 1)}\u2026`;
}
const Xr = "s3haim_quiz_gen_queue_panel_size", xd = 280, gd = 180, qn = 380, Un = 320;
function Zr(e) {
  const n = Math.min(window.innerWidth * 0.92, 720), s = Math.min(window.innerHeight * 0.72, 640);
  return { width: Math.min(n, Math.max(xd, Math.round(e.width))), height: Math.min(s, Math.max(gd, Math.round(e.height))) };
}
function hd() {
  try {
    const e = typeof window < "u" ? window.localStorage.getItem(Xr) : null;
    if (!e) return { width: qn, height: Un };
    const n = JSON.parse(e);
    return Zr({ width: Number(n.width) || qn, height: Number(n.height) || Un });
  } catch {
    return { width: qn, height: Un };
  }
}
function bd(e) {
  try {
    typeof window < "u" && window.localStorage.setItem(Xr, JSON.stringify(e));
  } catch {
  }
}
function kd(e, n) {
  const s = e.steps.map((r) => {
    if (r.id !== n.step) return r;
    const o = { ...r, status: n.status };
    return n.detail !== void 0 && (o.detail = n.detail), n.error !== void 0 && (o.error = n.error), n.llmInstruction !== void 0 && (o.llmInstruction = n.llmInstruction), n.llmResponse !== void 0 && (o.llmResponse = n.llmResponse), n.systemPrompt !== void 0 && (o.systemPrompt = n.systemPrompt), n.status === "running" && delete o.error, o;
  });
  return { ...e, steps: s };
}
function Gn() {
  return `quiz-gen-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function wd() {
  const [e, n] = i.useState([]), s = i.useRef(e);
  s.current = e;
  const [r, o] = i.useState(false), [a, c] = i.useState(() => hd()), f = i.useRef(false), u = i.useRef(false), d = i.useRef(false), x = i.useRef(0), m = i.useCallback((P) => {
    const Q = Zr(P);
    c(Q), bd(Q);
  }, []), g = i.useCallback(() => {
    f.current = true;
  }, []), w = i.useCallback((P) => {
    u.current = P;
  }, []), v = i.useCallback((P) => {
    d.current = P;
  }, []), y = i.useCallback(() => u.current || d.current, []), z = i.useCallback(() => {
    f.current = true, o(true);
  }, []), N = i.useCallback(() => {
    f.current = false, u.current = false, d.current = false, o(false);
  }, []), j = i.useCallback(() => {
    o(true);
  }, []), b = i.useCallback((P) => s.current.find((Q) => Q.id === P) ?? null, []), $ = i.useCallback((P) => {
    const Q = Gn(), W = { id: Q, kind: "similar", questionLabel: P.displayLabel, questionPreview: nn(P.preview), status: "running", steps: Vr(P.hasRag), createdAt: Date.now() };
    return n((D) => [W, ...D]), j(), Q;
  }, [j]), k = i.useCallback((P) => {
    const Q = Gn(), W = { id: Q, kind: "derived", questionLabel: P.displayLabel, questionPreview: nn(P.preview), status: "running", steps: md(P.hasRag), createdAt: Date.now() };
    return n((D) => [W, ...D]), j(), Q;
  }, [j]), S = i.useCallback((P) => {
    var _a2;
    const Q = Gn(), W = ((_a2 = P.topic) == null ? void 0 : _a2.trim()) || nn(P.preview) || "\uADFC\uAC70 \uAE30\uBC18 \uCD9C\uC81C", D = { id: Q, kind: "source", questionPreview: nn(W), status: "running", steps: pd(), createdAt: Date.now() };
    return n((te) => [D, ...te]), j(), Q;
  }, [j]), I = i.useCallback((P, Q) => {
    n((W) => W.map((D) => D.id === P ? kd(D, Q) : D));
  }, []), M = i.useCallback((P, Q) => {
    n((W) => W.map((D) => D.id === P ? { ...D, logPath: Q } : D));
  }, []), B = i.useCallback((P, Q) => {
    n((W) => W.map((D) => D.id === P ? { ...D, resultQuestionId: Q } : D));
  }, []), T = i.useCallback((P, Q) => {
    n((W) => W.map((D) => D.id === P ? { ...D, status: "done", ...Q ? { resultLabel: Q } : {} } : D));
  }, []), O = i.useCallback((P, Q) => {
    n((W) => W.map((D) => D.id === P ? { ...D, status: "error", error: Q } : D));
  }, []), _ = i.useCallback((P) => {
    n((Q) => Q.filter((W) => W.id !== P));
  }, []), J = i.useCallback(() => {
    n((P) => P.filter((Q) => Q.status === "running"));
  }, []), V = e.some((P) => P.status === "running");
  return i.useEffect(() => {
    const P = e.filter((D) => D.status === "running").length, Q = x.current > 0;
    if (x.current = P, !r || !Q || P > 0 || f.current || y()) return;
    const W = window.requestAnimationFrame(() => {
      f.current || y() || N();
    });
    return () => window.cancelAnimationFrame(W);
  }, [N, y, e, r]), { jobs: e, panelOpen: r, panelSize: a, setPanelSize: m, openPanel: z, closePanel: N, setPanelOpen: o, markPanelUserEngaged: g, markPanelPointerEngaged: w, markPanelFocusEngaged: v, getJob: b, createSimilarJob: $, createDerivedJob: k, createSourceJob: S, updateJobStep: I, setJobLogPath: M, setJobResultQuestionId: B, completeJob: T, failJob: O, removeJob: _, clearFinishedJobs: J, hasActiveJobs: V };
}
function Wn(e, n, s) {
  return !e || s == null ? n : n + Math.max(0, Date.now() - s);
}
function yd({ initialLog: e, hydrateKey: n = 0, onLogChange: s }) {
  const [r, o] = i.useState(() => Zn(e ?? $t())), [a, c] = i.useState(0), f = i.useRef(null), u = i.useRef(s), d = i.useRef(e);
  u.current = s, d.current = e;
  const x = wt(r), m = r.events.length > 0, g = bi(r), w = yt(r);
  i.useEffect(() => {
    const b = Zn(d.current ?? $t());
    o(b), wt(b) ? f.current = Date.now() : f.current = null;
  }, [n]), i.useEffect(() => {
    if (!x) return;
    const b = window.setInterval(() => c(($) => $ + 1), 200);
    return () => window.clearInterval(b);
  }, [x]);
  const v = i.useMemo(() => Wn(x, w, f.current), [x, w, a]), y = i.useCallback(() => {
    f.current = Date.now(), o((b) => {
      var _a2;
      const $ = Nt(b, "start", 0);
      return (_a2 = u.current) == null ? void 0 : _a2.call(u, $), $;
    });
  }, []), z = i.useCallback(() => {
    o((b) => {
      var _a2;
      if (!wt(b)) return b;
      const $ = Wn(true, yt(b), f.current);
      f.current = null;
      const k = Nt(b, "pause", $);
      return (_a2 = u.current) == null ? void 0 : _a2.call(u, k), k;
    });
  }, []), N = i.useCallback(() => {
    o((b) => {
      var _a2;
      if (wt(b)) return b;
      const $ = yt(b);
      f.current = Date.now();
      const k = Nt(b, "resume", $);
      return (_a2 = u.current) == null ? void 0 : _a2.call(u, k), k;
    });
  }, []), j = i.useCallback(() => {
    o((b) => {
      var _a2;
      const $ = wt(b) ? Wn(true, yt(b), f.current) : yt(b);
      f.current = null;
      const k = Nt(b, "stop", $);
      return (_a2 = u.current) == null ? void 0 : _a2.call(u, k), k;
    });
  }, []);
  return { log: r, displayMs: v, running: x, started: m, examInProgress: g, start: y, pause: z, resume: N, stop: j };
}
function vd(e) {
  const n = e.lastIndexOf(".");
  return n >= 0 ? e.slice(n + 1).toLowerCase() : "";
}
function jt(e) {
  if (e) try {
    URL.revokeObjectURL(e);
  } catch {
  }
}
async function Sd({ backend: e, storageType: n, path: s }) {
  var _a2, _b;
  if (!e || !s) return null;
  const r = Rt(s), o = vd(r), a = [...ki], c = ["mp4", "webm", "ogv", "mov", "mkv"], f = ["m4a", "mp3", "wav", "ogg", "aac", "flac", "weba"];
  if (a.includes(o) && e.getObjectUrl) {
    let m = await e.getObjectUrl(s);
    if (o === "heic" || o === "heif") {
      const w = await ((_a2 = e.readBytes) == null ? void 0 : _a2.call(e, s));
      if (w == null ? void 0 : w.body) {
        jt(m);
        const v = w.body instanceof Uint8Array ? w.body : new Uint8Array(w.body), y = v.buffer.slice(v.byteOffset, v.byteOffset + v.byteLength);
        m = await wi(new Blob([y]), r);
      }
    }
    const g = await ((_b = e.head) == null ? void 0 : _b.call(e, s));
    return { currentFile: { type: n, id: s, name: r, viewer: "image", objectUrl: m, size: (g == null ? void 0 : g.contentLength) ?? null }, content: "", revoke: () => jt(m) };
  }
  if (o === "pdf" && e.readBytes) {
    const { body: m, contentLength: g } = await e.readBytes(s), w = m instanceof Uint8Array ? m : new Uint8Array(m), v = w.buffer.slice(w.byteOffset, w.byteOffset + w.byteLength), y = new Blob([v], { type: "application/pdf" }), z = URL.createObjectURL(y);
    return { currentFile: { type: n, id: s, name: r, viewer: "pdf", objectUrl: z, size: g ?? null }, content: "", revoke: () => jt(z) };
  }
  if (f.includes(o) && e.getObjectUrl) {
    const m = await e.getObjectUrl(s);
    return { currentFile: { type: n, id: s, name: r, viewer: "audio", objectUrl: m }, content: "", revoke: () => jt(m) };
  }
  if (c.includes(o) && e.getObjectUrl) {
    const m = await e.getObjectUrl(s);
    return { currentFile: { type: n, id: s, name: r, viewer: "video", objectUrl: m }, content: "", revoke: () => jt(m) };
  }
  if (!e.readText) return null;
  if (o === "json") {
    const { text: m, contentLength: g, lastModified: w } = await e.readText(s);
    let v = m;
    if (m.length <= 1e5) try {
      v = JSON.stringify(JSON.parse(m), null, 2);
    } catch {
      v = m;
    }
    return { currentFile: { type: n, id: s, name: r, viewer: "json", content: v, ...g != null ? { size: g } : {}, ...w != null ? { lastModified: w } : {} }, content: v };
  }
  if (o === "html" || o === "htm" || o === "svg") {
    const { text: m, contentLength: g, lastModified: w } = await e.readText(s);
    return { currentFile: { type: n, id: s, name: r, viewer: o === "svg" ? "svg" : "html", content: m, ...g != null ? { size: g } : {}, ...w != null ? { lastModified: w } : {} }, content: m };
  }
  if (o === "md" || o === "markdown" || o === "" || Kt(s) || Kt(r)) {
    const { text: m, contentLength: g, lastModified: w } = await e.readText(s);
    if (Kt(s) || Kt(r)) {
      const v = await yi(s, m);
      return v.status === "need-password" ? { currentFile: { type: n, id: s, name: r, viewer: "markdown", content: "", ...g != null ? { size: g } : {}, encMd: true, ...w != null ? { lastModified: w } : {} }, content: "", needsEncMdPassword: true } : { currentFile: { type: n, id: s, name: r, viewer: "markdown", content: v.text, ...g != null ? { size: g } : {}, encMd: true, ...w != null ? { lastModified: w } : {} }, content: v.text };
    }
    return { currentFile: { type: n, id: s, name: r, viewer: "markdown", content: m, ...g != null ? { size: g } : {}, ...w != null ? { lastModified: w } : {} }, content: m };
  }
  const { text: u, contentLength: d, lastModified: x } = await e.readText(s);
  return { currentFile: { type: n, id: s, name: r, viewer: "raw", content: u, ...d != null ? { size: d } : {}, ...x != null ? { lastModified: x } : {} }, content: u };
}
async function jd(e, n) {
  const s = String(e || "").trim();
  if (!s) return null;
  const { storageType: r, localTree: o, webdavTree: a, s3Tree: c, localRootHandle: f } = n;
  let u = null;
  return r === sn ? u = rn(o, s) || on(o, s) || (f ? await vi(f, s) : null) : r === an ? u = rn(a, s) || on(a, s) : u = rn(c, s) || on(c, s), (u == null ? void 0 : u.type) !== "file" ? { type: "file", path: s, name: Rt(s) } : { type: "file", path: String(u.path || s), name: String(u.name || Rt(s)), ...u.lastModified != null ? { lastModified: u.lastModified } : {} };
}
const Cd = 2e4, pr = "flex h-6 max-h-6 min-w-0 items-center overflow-hidden", Nd = "z-100010 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", xr = "flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-gray-800 outline-none hover:bg-gray-100 focus:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg dark:focus:bg-odp-focusBg";
function _d({ content: e, onChange: n, onSave: s, currentFile: r, onResolveWikiImageUrl: o, llmProviderProfiles: a = [], isActiveFile: c = true, registerToolbar: f, registerFileManagement: u }) {
  const { showToast: d } = Si(), { showAlert: x } = ji(), m = Ci(), g = wd(), { storageMode: w, s3Tree: v, localTree: y, webdavTree: z, localRootHandle: N, getBackendForType: j, loadLocalFolderChildren: b, loadWebdavFolderChildren: $ } = Ni(), { openAdvancedSearchFile: k, selectFileRaw: S } = $i(), I = i.useCallback((l) => {
    m == null ? void 0 : m.openAssist(), d({ message: l || "AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\xB7\uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.", durationMs: 3500 });
  }, [m, d]), M = cd(a), B = i.useCallback(async (l) => {
    const p = await Fc(a, { ...M.llmOpts, ...l });
    return p.ready ? true : (I(p.message), false);
  }, [a, I, M.llmOpts]), T = i.useCallback((l, p, h) => {
    const C = (p instanceof Error ? p.message : "") || h;
    if (Bc(C)) {
      I(C);
      return;
    }
    if (C.length >= 48 || C.includes(`
`)) {
      x({ title: l, message: C });
      return;
    }
    d({ message: C, durationMs: 4e3 });
  }, [I, x, d]), O = i.useMemo(() => w === sn ? y : w === an ? z : v, [w, y, z, v]), _ = w === sn ? "local" : w === an ? "webdav" : "s3", J = _, V = i.useCallback(async (l) => {
    const p = j(_);
    return Sd({ backend: p, storageType: J, path: l });
  }, [j, _, J]), P = i.useCallback((l) => {
    k(l);
  }, [k]), Q = i.useCallback(async (l) => {
    const p = await jd(l, { storageType: J, localTree: y, webdavTree: z, s3Tree: v, localRootHandle: N });
    if (p) {
      await S(_, p, { background: true });
      return;
    }
    k(l);
  }, [J, y, z, v, N, S, _, k]), W = i.useCallback((l) => {
    mt(true), pt(l);
  }, []), D = i.useCallback(() => {
    mt(false), pt(null);
  }, []), te = i.useCallback(async (l) => {
    const p = j(_);
    if (!(p == null ? void 0 : p.readText)) return null;
    const { text: h } = await p.readText(l);
    return typeof h == "string" ? h : null;
  }, [j, _]), oe = i.useCallback(async (l, p) => {
    const h = r == null ? void 0 : r.id;
    if (!h) return;
    await new Promise((R) => {
      window.setTimeout(R, 0);
    });
    const C = g.getJob(l);
    if (!C) return;
    const L = j(_);
    if (L == null ? void 0 : L.writeText) try {
      const R = await Rc({ quizFilePath: h, logKey: p, job: C, writeText: (U, G) => L.writeText(U, G, "text/markdown; charset=utf-8") });
      g.setJobLogPath(l, R);
    } catch {
    }
  }, [r == null ? void 0 : r.id, g, j, _]), He = i.useCallback((l, p, h) => {
    g.updateJobStep(l, h), oe(l, p);
  }, [g, oe]), Y = i.useCallback(async (l) => {
    w === sn ? await (b == null ? void 0 : b(l)) : w === an && await ($ == null ? void 0 : $(l));
  }, [w, b, $]), [E, se] = i.useState(() => ot(e)), A = i.useRef(e), q = i.useRef(false), ce = i.useRef(false), ae = i.useRef(null), fe = i.useRef(E);
  fe.current = E;
  const [re, Ke] = i.useState({}), [de, qe] = i.useState({}), cs = i.useRef(de);
  cs.current = de;
  const [Yr, Pe] = i.useState({}), [ue, wn] = i.useState({}), [Oe, we] = i.useState({}), et = i.useRef(Oe);
  et.current = Oe;
  const [Ot, nt] = i.useState({}), [me, Ue] = i.useState(null), [pe, tt] = i.useState({}), [xe, Qt] = i.useState(false), [yn, ft] = i.useState("all"), [vn, ds] = i.useState(false), [Tt, mt] = i.useState(false), [eo, pt] = i.useState(null), [to, Sn] = i.useState(false), [xt, jn] = i.useState(null), [Ve, ge] = i.useState(null), [us, _t] = i.useState(false), [he, Dt] = i.useState(null), [st, Cn] = i.useState(null), [fs, Nn] = i.useState(false), [Ge, Ft] = i.useState(null), [no, Bt] = i.useState({}), $n = i.useRef(null), Pn = i.useRef(null), Ce = i.useRef(null), gt = i.useRef(null), ms = i.useRef(null), ps = i.useRef(null), [ye, ht] = i.useState(() => $t()), [so, zn] = i.useState(0), ie = yd({ initialLog: ye, hydrateKey: so, onLogChange: ht }), xs = i.useRef(() => 0);
  xs.current = () => ie.displayMs;
  const ro = i.useMemo(() => E.questions.map((l) => ({ id: l.id, displayLabel: l.displayLabel })), [E.questions]);
  Pl({ scrollRootRef: gt, questions: ro, running: ie.running, getElapsedMs: () => xs.current(), timeLog: ye, onLogChange: ht });
  const Xe = i.useCallback(() => Dn({ questions: fe.current.questions, userAnswers: re, gradedQuestions: de, subjectiveGrades: pe, isSubmitted: xe, ..._n(ye) ? {} : { timeLog: ye }, wrongChoiceExplanations: Xn(Oe), ...vt(ue) ? {} : { questionMemos: ue } }), [re, de, pe, xe, ye, Oe, ue]), qt = i.useCallback(() => {
    if (!ce.current || !c) return false;
    const l = Xe();
    if (!Jl(l)) return false;
    const p = ot(A.current).session;
    if (!ar(l, p)) return true;
    const h = typeof (r == null ? void 0 : r.content) == "string" ? r.content : "";
    if (!h) return true;
    const C = ot(h).session;
    return !ar(l, C);
  }, [Xe, r == null ? void 0 : r.content, c]), Ut = i.useCallback((l) => {
    const p = Zn(l == null ? void 0 : l.timeLog);
    if (ht(p), zn((C) => C + 1), !l || ns(l)) {
      Ke({}), qe({}), Pe({}), we({}), nt({}), Ue(null), wn({}), tt({}), Qt(false);
      return;
    }
    Ke({ ...l.userAnswers }), qe({ ...l.gradedQuestions }), tt({ ...l.subjectiveGrades }), Qt(l.isSubmitted), we(Pi(l.wrongChoiceExplanations)), wn({ ...l.questionMemos ?? {} }), nt({}), Ue(null);
    const h = {};
    for (const [C, L] of Object.entries(l.gradedQuestions)) L && (h[C] = true);
    Pe(h);
  }, []), be = i.useCallback((l, p) => {
    const h = kr(l.config, l.questions, p);
    q.current = true, A.current = h, n(h);
  }, [n]), Gt = i.useCallback(() => {
    if (!ce.current) return;
    ae.current != null && (clearTimeout(ae.current), ae.current = null);
    const l = Xe();
    be(fe.current, l);
  }, [Xe, be]), rt = i.useCallback(async (l) => {
    if (!(!$e().autoSaveOnAiGenerate || typeof s != "function")) {
      if (l) {
        const p = Dn({ questions: fe.current.questions, userAnswers: re, gradedQuestions: de, subjectiveGrades: pe, isSubmitted: xe, ..._n(ye) ? {} : { timeLog: ye }, wrongChoiceExplanations: Xn(l), ...vt(ue) ? {} : { questionMemos: ue } });
        be(fe.current, p);
      } else Gt();
      await s(null, { skipCoverChangeCheck: true, skipSuffixCheck: true, contentOverride: A.current });
    }
  }, [Gt, de, xe, s, be, pe, ye, re, ue]);
  i.useEffect(() => {
    if (e === A.current) return;
    if (A.current = e, q.current) {
      q.current = false;
      return;
    }
    const l = ot(e);
    se(l), Ut(l.session);
  }, [e, Ut]), i.useEffect(() => {
    const l = ot(A.current);
    Ut(l.session), ce.current = true;
  }, [Ut]), i.useEffect(() => {
    if (!ce.current) return;
    const l = Xe();
    return ae.current != null && clearTimeout(ae.current), ae.current = setTimeout(() => {
      ae.current = null, be(fe.current, l);
    }, Cd), () => {
      ae.current != null && (clearTimeout(ae.current), ae.current = null);
    };
  }, [re, de, pe, xe, ye, Oe, ue, Xe, be]);
  const gs = i.useCallback(async () => {
    const l = Ul(fe.current, { questions: fe.current.questions, userAnswers: re, gradedQuestions: de, isSubmitted: xe, subjectiveGrades: pe });
    if (!l) {
      d({ message: "\uCD94\uCD9C\uD560 \uD2C0\uB9B0 \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uCC44\uC810 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.", durationMs: 3500 });
      return;
    }
    const p = r == null ? void 0 : r.id;
    if (!p) return;
    const h = j(_);
    if (!(h == null ? void 0 : h.writeText)) {
      d({ message: "\uC800\uC7A5\uC18C\uC5D0 \uC4F8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.", durationMs: 3e3 });
      return;
    }
    try {
      const C = await Wl(p, async (L) => {
        if (!h.head) return false;
        try {
          return await h.head(L), true;
        } catch {
          return false;
        }
      });
      await h.writeText(C, l.markdown, "text/markdown; charset=utf-8"), await k(C), d({ message: `\uD2C0\uB9B0 \uBB38\uC81C ${l.questions.length}\uAC1C\uB97C \uC0C8 \uD034\uC988\uB85C \uCD94\uCD9C\uD588\uC2B5\uB2C8\uB2E4.`, durationMs: 4e3 });
    } catch (C) {
      T("\uD2C0\uB9B0\uBB38\uC81C \uCD94\uCD9C", C, "\uD30C\uC77C\uC744 \uC0DD\uC131\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [re, de, xe, pe, r == null ? void 0 : r.id, j, _, k, d, T]);
  i.useEffect(() => {
    if (!c) return;
    const l = (p) => {
      qt() && (p.preventDefault(), p.returnValue = "");
    };
    return window.addEventListener("beforeunload", l), () => window.removeEventListener("beforeunload", l);
  }, [c, qt]);
  const ke = i.useCallback((l) => {
    const p = { ...l, config: Xs(l.config, l.questions) };
    fe.current = p, se(p);
    const h = Xe();
    be(p, h);
  }, [Xe, be]), hs = i.useCallback(() => {
    const l = fe.current, p = ad({ questions: l.questions, userAnswers: re, wrongExps: Oe, wrongExpFocus: Ot });
    if (p.shuffledQuestionCount <= 0) {
      d({ message: "\uC120\uD0DD\uC9C0\uAC00 2\uAC1C \uC774\uC0C1\uC778 \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", durationMs: 2800 });
      return;
    }
    Ke(p.userAnswers), we(p.wrongExps), nt(p.wrongExpFocus), Ue((L) => {
      if (!L) return null;
      const R = ld(L.questionId, L.option, p.optionMapsByQuestionId);
      return R == null ? null : { ...L, option: R };
    });
    const h = { ...l, questions: p.questions, config: Xs(l.config, p.questions) };
    se(h);
    const C = Dn({ questions: h.questions, userAnswers: p.userAnswers, gradedQuestions: de, subjectiveGrades: pe, isSubmitted: xe, ..._n(ye) ? {} : { timeLog: ye }, wrongChoiceExplanations: p.wrongChoiceExplanations, ...vt(ue) ? {} : { questionMemos: ue } });
    be(h, C), d({ message: `${p.shuffledQuestionCount}\uAC1C \uBB38\uD56D\uC758 \uC120\uD0DD\uC9C0 \uC21C\uC11C\uB97C \uBCC0\uACBD\uD588\uC2B5\uB2C8\uB2E4.`, durationMs: 3200 });
  }, [re, Oe, Ot, de, pe, xe, ye, ue, be, d]);
  i.useEffect(() => {
    if (!(!c || !u)) return u({ extractWrongQuestions: gs, shuffleChoiceOptions: hs, hasUnsavedProgress: qt, flushBeforeSave: Gt }), () => u(null);
  }, [c, u, gs, hs, qt, Gt]);
  const En = i.useCallback((l) => {
    const p = fe.current;
    ke({ ...p, config: zi(p.config, l) }), pt((h) => h === l ? null : h);
  }, [ke]), oo = i.useCallback((l, p) => {
    const h = fe.current;
    ke({ ...h, config: Ei(h.config, l, p) });
  }, [ke]), io = i.useCallback((l) => {
    if (Wr()) {
      jn(l);
      return;
    }
    En(l);
  }, [En]), { setQuizSourceDropActive: In, setQuizSourceDropHost: Wt, handleRegisterQuizSourceDrop: Rn } = Ii(), bs = i.useRef(null), ks = i.useRef(null), ws = i.useRef(null), ys = i.useRef(null), vs = i.useRef(Ge);
  vs.current = Ge;
  const Jt = i.useCallback(() => {
    const l = bs.current ?? ks.current;
    ws.current !== l && (ws.current = l, Wt(l));
  }, [Wt]), ao = i.useCallback((l) => {
    bs.current = l, Jt();
  }, [Jt]), lo = i.useCallback((l) => {
    ks.current = l, Jt();
  }, [Jt]);
  i.useEffect(() => () => Wt(null), [Wt]);
  const Ss = i.useCallback((l, p) => l !== _ ? null : rn(O, p) || on(O, p), [_, O]), js = (r == null ? void 0 : r.id) || null, Cs = i.useCallback((l) => {
    var _a2;
    if (!l.length) return;
    const p = vs.current;
    if (p == null ? void 0 : p.onDone) {
      const L = new Set(p.paths);
      for (const R of l) L.add(R);
      p.onDone([...L].sort((R, U) => R.localeCompare(U))), d({ message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`, durationMs: 2500 });
      return;
    }
    if (p) {
      (_a2 = ys.current) == null ? void 0 : _a2.call(ys, l), d({ message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`, durationMs: 2500 });
      return;
    }
    const h = fe.current, C = [.../* @__PURE__ */ new Set([...h.config.sourcePaths, ...l])].sort((L, R) => L.localeCompare(R));
    ke({ ...h, config: { ...h.config, sourcePaths: C } }), d({ message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`, durationMs: 2500 });
  }, [ke, d]), Ns = i.useCallback((l) => {
    const p = Ri(l, Ss, { excludePath: js });
    p.length && Cs(p);
  }, [js, Ss, Cs]);
  i.useEffect(() => (Rn(Ns), () => Rn(null)), [Rn, Ns]), i.useEffect(() => (In(c && (!!Ge || Tt)), () => In(false)), [c, Ge, Tt, In]);
  const H = i.useMemo(() => uc({ questions: E.questions, userAnswers: re, gradedQuestions: de, isSubmitted: xe, subjectiveGrades: pe }), [E.questions, re, de, xe, pe]), $s = c && H.total > 0, co = mr(gt, ms, $s, E.questions.length), uo = mr(gt, ps, $s, E.questions.length), fo = i.useMemo(() => Mr(E.questions, E.config.choiceCount), [E.questions, E.config.choiceCount]), Ps = i.useMemo(() => Mi(E.config), [E.config.sourcePaths, E.config.disabledSourcePaths]), mo = i.useMemo(() => {
    const l = {};
    for (const [p, h] of Object.entries(Oe)) {
      const C = p.indexOf("_"), L = C >= 0 ? p.slice(0, C) : p, R = l[L] ?? (l[L] = {});
      R[p] = h;
    }
    return l;
  }, [Oe]), Ht = i.useMemo(() => me && E.questions.find((l) => l.id === me.questionId) || null, [me, E.questions]), po = i.useCallback((l, p, h) => {
    Ue({ questionId: l, option: p, mode: h });
  }, []), ve = a, zs = i.useCallback(() => {
    Ke({}), qe({}), Pe({}), we({}), nt({}), Ue(null), tt({}), Qt(false), ht($t()), zn((l) => l + 1), be(fe.current, zt({ ...vt(ue) ? {} : { questionMemos: ue } }));
  }, [be, ue]), xo = i.useCallback(() => {
    Ke({}), qe({}), Pe({}), we({}), nt({}), Ue(null), tt({}), Qt(false);
    const l = Nt($t(), "start", 0);
    ht(l), zn((p) => p + 1), be(fe.current, zt({ timeLog: l, ...vt(ue) ? {} : { questionMemos: ue } }));
  }, [be, ue]), Es = i.useMemo(() => E.questions.some((l) => pn(re[l.id])), [E.questions, re]), Is = i.useCallback(() => {
    if (Es) {
      Sn(true);
      return;
    }
    ie.start();
  }, [Es, ie]);
  i.useEffect(() => {
    if (!(!c || !f)) return f(t.jsx(al, { stopwatch: ie, onRequestStart: Is })), () => f(null);
  }, [c, f, ie.displayMs, ie.running, ie.started, ie.start, ie.pause, ie.resume, ie.stop, Is]);
  const go = i.useCallback((l) => {
    qe((p) => {
      const h = { ...p };
      return delete h[l.id], h;
    }), tt((p) => {
      const h = { ...p };
      return delete h[l.id], h;
    }), Pe((p) => {
      const h = { ...p };
      return delete h[l.id], h;
    }), we((p) => {
      const h = { ...p };
      for (const C of Object.keys(h)) (C === l.id || C.startsWith(`${l.id}_`)) && delete h[C];
      return h;
    });
  }, []), ho = i.useCallback((l, p) => {
    cs.current[l] || Ke((h) => ({ ...h, [l]: p }));
  }, []), bo = i.useCallback((l) => {
    ie.examInProgress || (qe((p) => ({ ...p, [l.id]: true })), Pe((p) => ({ ...p, [l.id]: true })));
  }, [ie.examInProgress]), ko = i.useCallback(async (l, p) => {
    var _a2;
    if (ie.examInProgress) return;
    const h = String(p ?? re[l.id] ?? "").trim();
    if (!h) {
      d({ message: "\uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694.", durationMs: 2200 });
      return;
    }
    if (!await B()) return;
    ge(l.id), (_a2 = Ce.current) == null ? void 0 : _a2.abort();
    const C = new AbortController();
    Ce.current = C;
    try {
      const L = await ur({ profiles: ve, question: l, userAnswer: h, signal: C.signal });
      tt((R) => ({ ...R, [l.id]: L })), qe((R) => ({ ...R, [l.id]: true })), Pe((R) => ({ ...R, [l.id]: true })), p !== void 0 && Ke((R) => ({ ...R, [l.id]: p })), d({ message: "\uC8FC\uAD00\uC2DD \uCC44\uC810 \uC644\uB8CC", durationMs: 2200 });
    } catch (L) {
      T("\uCC44\uC810 \uC2E4\uD328", L, "\uCC44\uC810 \uC2E4\uD328");
    } finally {
      ge(null);
    }
  }, [B, ve, T, d, ie.examInProgress, re]), wo = i.useCallback((l, p) => {
    Ke((h) => h[l] === p ? h : { ...h, [l]: p });
  }, []), yo = i.useCallback((l) => {
    Dt(l), _t(true);
  }, []), vo = i.useCallback((l) => {
    Pe((p) => ({ ...p, [l]: !p[l] }));
  }, []), So = i.useCallback((l) => {
    Cn(l);
  }, []), jo = i.useCallback((l, p) => {
    nt((h) => ({ ...h, [l]: p }));
  }, []), Co = i.useCallback((l, p) => {
    wn((h) => {
      if (!p.trim()) {
        const { [l]: L, ...R } = h;
        return R;
      }
      return { ...h, [l]: p };
    });
  }, []), No = i.useCallback((l) => {
    Bt((p) => {
      if (!p[l]) return p;
      const h = { ...p };
      return delete h[l], h;
    });
  }, []), bt = i.useCallback((l) => {
    var _a2;
    ((_a2 = $n.current) == null ? void 0 : _a2.scrollToQuestionId(l)) || (Pn.current = l);
  }, []);
  i.useEffect(() => {
    var _a2;
    const l = Pn.current;
    l && ((_a2 = $n.current) == null ? void 0 : _a2.scrollToQuestionId(l)) && (Pn.current = null);
  }, [E.questions, yn, re, de, xe, pe]);
  const $o = async () => {
    ie.examInProgress && ie.stop();
    const l = E.questions.filter((C) => !(!pn(re[C.id]) || de[C.id] || C.kind === "subjective" && pe[C.id]));
    if (l.length === 0) {
      d({ message: "\uCC44\uC810\uD560 \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.", durationMs: 2200 });
      return;
    }
    const p = l.filter((C) => C.kind === "choice"), h = l.filter((C) => C.kind === "subjective");
    if (p.length > 0 && (qe((C) => {
      const L = { ...C };
      for (const R of p) L[R.id] = true;
      return L;
    }), Pe((C) => {
      const L = { ...C };
      for (const R of p) L[R.id] = true;
      return L;
    })), h.length > 0) {
      if (!await B()) return;
      for (const C of h) {
        const L = String(re[C.id] || "").trim();
        if (L) try {
          const R = await ur({ profiles: ve, question: C, userAnswer: L });
          tt((U) => ({ ...U, [C.id]: R })), qe((U) => ({ ...U, [C.id]: true })), Pe((U) => ({ ...U, [C.id]: true }));
        } catch {
        }
      }
    }
    d({ message: `${l.length}\uAC1C \uD56D\uBAA9 \uCC44\uC810 \uC644\uB8CC`, durationMs: 2200 });
  }, Rs = async (l) => {
    if (!await B()) return;
    ge(`sim-${l.id}`);
    const p = Xt(E.config, l), h = g.createSimilarJob({ displayLabel: String(l.displayLabel || l.id), preview: l.question, hasRag: p.length > 0 }), C = h;
    try {
      const L = await Wc({ profiles: ve, question: l, config: E.config, sourcePaths: p, readText: te, onStep: (X) => He(h, C, X) }), R = String(l.displayLabel || l.id).split("-\uC720\uC0AC")[0] || "1";
      let U = 0;
      const G = new RegExp(`^${R.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-\uC720\uC0AC(\\d+)$`);
      for (const X of E.questions) {
        const ze = String(X.displayLabel).match(G);
        (ze == null ? void 0 : ze[1]) && (U = Math.max(U, Number.parseInt(ze[1], 10)));
      }
      const Z = `${R}-\uC720\uC0AC${U + 1}`, ee = { ...L, id: `gen-${Date.now()}`, displayLabel: Z, isGenerated: true, similarOf: { id: l.id, displayLabel: String(l.displayLabel || l.id) }, ...p.length ? { sourcePaths: p } : {} };
      g.updateJobStep(h, { step: "finalize", status: "running", detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026" }), oe(h, ee.id);
      const K = E.questions.findIndex((X) => X.id === l.id), ne = [...E.questions];
      ne.splice(K + 1, 0, ee), ft("all"), Bt((X) => ({ ...X, [ee.id]: true })), ke({ ...E, questions: ne }), g.setJobResultQuestionId(h, ee.id), g.updateJobStep(h, { step: "finalize", status: "done", detail: Z, llmResponse: JSON.stringify(ee, null, 2) }), g.completeJob(h, Z), oe(h, ee.id), d({ message: `${Z} \uC720\uC0AC\uBB38\uC81C \uCD94\uAC00`, durationMs: 2500 }), await rt(), window.setTimeout(() => {
        bt(ee.id);
      }, 80);
    } catch (L) {
      const R = (L instanceof Error ? L.message : "") || "\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
      g.failJob(h, R), oe(h, C), T("\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", L, "\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
    } finally {
      ge(null);
    }
  }, Ms = async (l, p) => {
    var _a2;
    const h = M.llmOpts;
    if (!await B(h)) return;
    const C = (p === "point" || p === "both") && dt(l.point || ""), L = (p === "explanation" || p === "both") && ut(l.explanation || "");
    if (!C && !L) {
      d({ message: "\uC774\uBBF8 \uC811\uADFC Point\uC640 \uD574\uC124\uC774 \uC788\uC2B5\uB2C8\uB2E4.", durationMs: 2200 });
      return;
    }
    const R = `sections-${l.id}`;
    ge(R), (_a2 = Ce.current) == null ? void 0 : _a2.abort();
    const U = new AbortController();
    Ce.current = U;
    try {
      const G = Xt(E.config, l), Z = await Kc({ profiles: ve, question: l, missingPoint: C, missingExplanation: L, sourcePaths: G, readText: te, ...h, signal: U.signal });
      if (!Z.point && !Z.explanation) {
        d({ message: "\uC0DD\uC131\uB41C \uB0B4\uC6A9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.", durationMs: 2500 });
        return;
      }
      const ee = E.questions.map((ne) => ne.id !== l.id ? ne : { ...ne, ...Z.point ? { point: Z.point } : {}, ...Z.explanation ? { explanation: Z.explanation } : {} });
      ke({ ...E, questions: ee }), Pe((ne) => ({ ...ne, [l.id]: true }));
      const K = [];
      Z.point && K.push("\uC811\uADFC Point"), Z.explanation && K.push("\uD574\uC124"), d({ message: `${K.join("\xB7")} \uC0DD\uC131 \uC644\uB8CC`, durationMs: 2200 }), await rt();
    } catch (G) {
      if (U.signal.aborted) return;
      T("\uC811\uADFC Point\xB7\uD574\uC124 \uC0DD\uC131 \uC2E4\uD328", G, "\uC0DD\uC131 \uC2E4\uD328");
    } finally {
      ge(null);
    }
  }, As = async (l, p) => {
    if (!await B()) return;
    ge(`derived-${l.id}`);
    const h = Xt(E.config, l), C = g.createDerivedJob({ displayLabel: String(l.displayLabel || l.id), preview: l.question, hasRag: h.length > 0 }), L = C;
    try {
      const R = await Jc({ profiles: ve, question: l, config: E.config, target: p, sourcePaths: h, readText: te, onStep: (K) => He(C, L, K) }), U = Cc(E.questions, String(l.displayLabel || l.id)), G = { ...R, id: `gen-${Date.now()}`, displayLabel: U, isGenerated: true, similarOf: { id: l.id, displayLabel: String(l.displayLabel || l.id) }, ...h.length ? { sourcePaths: h } : {} };
      g.updateJobStep(C, { step: "finalize", status: "running", detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026" }), oe(C, G.id);
      const Z = E.questions.findIndex((K) => K.id === l.id), ee = [...E.questions];
      ee.splice(Z + 1, 0, G), ft("all"), Bt((K) => ({ ...K, [G.id]: true })), ke({ ...E, questions: ee }), g.setJobResultQuestionId(C, G.id), g.updateJobStep(C, { step: "finalize", status: "done", detail: U, llmResponse: JSON.stringify(G, null, 2) }), g.completeJob(C, U), oe(C, G.id), Cn(null), d({ message: `${U} \uD30C\uC0DD\uBB38\uC81C \uCD94\uAC00`, durationMs: 2500 }), await rt(), window.setTimeout(() => {
        bt(G.id);
      }, 80);
    } catch (R) {
      const U = (R instanceof Error ? R.message : "") || "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
      g.failJob(C, U), oe(C, L), T("\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", R, "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
    } finally {
      ge(null);
    }
  }, Po = i.useCallback((l, p) => {
    var _a2;
    const h = Ot[l.id], C = ((_a2 = l.options) == null ? void 0 : _a2.length) || 0;
    return h != null && h >= 1 && h <= C ? h : p != null && p >= 1 && p <= C ? p : 1;
  }, [Ot]), Ls = async (l, p, h, C = "create") => {
    var _a2, _b;
    const L = p === l.answer, R = M.llmOpts;
    if (C === "followup") {
      const K = String(h || "").trim();
      if (!K) {
        d({ message: "\uCD94\uAC00 \uC9C8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694.", durationMs: 2200 });
        return;
      }
      if (!await B(R)) return;
      const ne = Ze(l.id, p), X = String(et.current[ne] || "").trim();
      if (!X) {
        d({ message: "\uBA3C\uC800 \uBD84\uC11D\uC744 \uC0DD\uC131\uD558\uC138\uC694.", durationMs: 2200 });
        return;
      }
      ge(ne), (_a2 = Ce.current) == null ? void 0 : _a2.abort();
      const ze = new AbortController();
      Ce.current = ze;
      const Ne = K.slice(0, 60);
      try {
        const Ee = await Gc({ profiles: ve, question: l, selectedOption: p, existingAnalysis: X, userQuestion: K, ...R, signal: ze.signal, onChunk: (Go) => {
          const Wo = Ai(X, Go);
          we((Jo) => ({ ...Jo, [ne]: Wo }));
        } }), kt = Li(Ee, Ne), Uo = Oi(X, kt, Ne), On = { ...et.current, [ne]: Uo };
        et.current = On, we(On), Ue(null), await rt(On);
      } catch (Ee) {
        if (ze.signal.aborted) return;
        we((kt) => ({ ...kt, [ne]: X })), T("\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0 \uC2E4\uD328", Ee, "\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0 \uC2E4\uD328");
      } finally {
        ge(null);
      }
      return;
    }
    const U = Qi(h, L);
    if (!await B(R)) return;
    const G = Ze(l.id, p), Z = C === "regenerate" ? String(et.current[G] || "").trim() : "";
    ge(G), C !== "regenerate" && we((K) => ({ ...K, [G]: "" })), (_b = Ce.current) == null ? void 0 : _b.abort();
    const ee = new AbortController();
    Ce.current = ee;
    try {
      const K = await Uc({ profiles: ve, question: l, selectedOption: p, userInstructions: U, ...R, signal: ee.signal, onChunk: (ze) => {
        const Ne = C === "regenerate" ? Ti(Z, ze) : ze;
        we((Ee) => ({ ...Ee, [G]: Ne }));
      } }), ne = C === "regenerate" ? _i(Z, K) : K, X = { ...et.current, [G]: ne };
      et.current = X, we(X), Ue(null), await rt(X);
    } catch (K) {
      if (ee.signal.aborted) return;
      we((ne) => {
        const X = { ...ne };
        return C === "regenerate" && Z ? X[G] = Z : String(X[G] || "").trim() || delete X[G], X;
      }), T("\uC624\uB2F5 \uD574\uC124 \uC2E4\uD328", K, "\uC624\uB2F5 \uD574\uC124 \uC2E4\uD328");
    } finally {
      ge(null);
    }
  }, Os = async (l) => {
    var _a2, _b, _c2;
    const p = E.config.sourcePaths.length, h = hr(E.config);
    if (!p) {
      mt(true), d({ message: "\uD30C\uC77C \uADFC\uAC70 \uBB38\uC11C\uB97C \uBA3C\uC800 \uC120\uD0DD\uD558\uC138\uC694.", durationMs: 2800 });
      return;
    }
    if (!h.length) {
      mt(true), d({ message: "\uC0AC\uC6A9 \uC911\uC778 \uADFC\uAC70 \uBB38\uC11C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uCCB4\uD06C\uBC15\uC2A4\uB85C \uADFC\uAC70\uB97C \uD65C\uC131\uD654\uD558\uC138\uC694.", durationMs: 3200 });
      return;
    }
    if (!await B()) return;
    ge("gen-sources"), (_a2 = Ce.current) == null ? void 0 : _a2.abort();
    const C = new AbortController();
    Ce.current = C;
    const L = g.createSourceJob({ preview: ((_b = E.questions[0]) == null ? void 0 : _b.question) || "\uADFC\uAC70 \uAE30\uBC18 \uCD9C\uC81C", topic: l }), R = L;
    try {
      const U = await Vc({ profiles: ve, config: E.config, sourcePaths: h, topic: l, kind: "choice", count: 1, exampleQuestions: E.questions, readText: te, signal: C.signal, onStep: (Ne) => He(L, R, Ne) });
      if (!U.length) throw new Error("\uC0DD\uC131\uB41C \uBB38\uD56D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
      const G = Number.parseInt(es(E.questions), 10) || 1, Z = Date.now(), ee = U.map((Ne, Ee) => ({ ...Ne, id: `gen-src-${Z}-${Ee}`, displayLabel: String(G + Ee), isGenerated: true, ...h.length ? { sourcePaths: [...h] } : {} })), K = (_c2 = ee[0]) == null ? void 0 : _c2.id, ne = ee.map((Ne) => Ne.displayLabel).join(", "), X = K || L;
      g.updateJobStep(L, { step: "finalize", status: "running", detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026" }), oe(L, X);
      const ze = [...E.questions, ...ee];
      ft("all"), K && Bt((Ne) => {
        const Ee = { ...Ne };
        for (const kt of ee) Ee[kt.id] = true;
        return Ee;
      }), ke({ ...E, questions: ze }), K && g.setJobResultQuestionId(L, K), g.updateJobStep(L, { step: "finalize", status: "done", detail: ne, llmResponse: JSON.stringify(ee, null, 2) }), g.completeJob(L, ne), oe(L, X), d({ message: `\uADFC\uAC70 \uAE30\uBC18 \uBB38\uC81C ${ee.length}\uAC1C \uCD94\uAC00`, durationMs: 2500 }), await rt(), K && window.setTimeout(() => {
        bt(K);
      }, 80);
    } catch (U) {
      if (C.signal.aborted) {
        g.failJob(L, "\uCDE8\uC18C\uB428"), oe(L, R);
        return;
      }
      const G = (U instanceof Error ? U.message : "") || "\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
      g.failJob(L, G), oe(L, R), T("\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", U, "\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
    } finally {
      ge(null);
    }
  }, Qs = i.useRef(Os);
  Qs.current = Os;
  const zo = i.useCallback((l) => {
    Qs.current(l);
  }, []), Eo = i.useCallback(async ({ instructions: l, form: p }) => {
    var _a2, _b;
    if (!he || !await B()) return null;
    (_a2 = Ce.current) == null ? void 0 : _a2.abort();
    const h = new AbortController();
    Ce.current = h;
    const C = Qr(p, he.displayLabel);
    C.id = he.id, C.displayLabel = he.displayLabel, he.similarOf && (C.similarOf = he.similarOf), he.isGenerated && (C.isGenerated = he.isGenerated);
    const L = Xt(E.config, C);
    try {
      const R = await ed({ profiles: ve, question: C, config: E.config, userInstructions: l, sourcePaths: L, readText: te, signal: h.signal }), U = Te(C, E.config.choiceCount), G = { kind: R.kind, displayLabel: he.displayLabel, question: R.question, point: R.point, explanation: R.explanation, ...((_b = p.sourcePaths) == null ? void 0 : _b.length) ? { sourcePaths: p.sourcePaths } : {} };
      if (R.kind === "subjective") G.answerStyle = R.answerStyle === "essay" ? "essay" : "short", G.modelAnswer = R.modelAnswer || "";
      else {
        const Z = [...R.options || []];
        G.options = Ye(Z, U), G.answer = R.answer && R.answer >= 1 ? R.answer : 1;
      }
      return d({ message: "\uBB38\uD56D\uC744 \uAD50\uC815\uD588\uC2B5\uB2C8\uB2E4. \uB0B4\uC6A9\uC744 \uD655\uC778\uD55C \uB4A4 \uC800\uC7A5\uD558\uC138\uC694.", durationMs: 3200 }), G;
    } catch (R) {
      return h.signal.aborted || T("\uBB38\uC81C \uACE0\uCE58\uAE30 \uC2E4\uD328", R, "\uBB38\uC81C \uACE0\uCE58\uAE30 \uC2E4\uD328"), null;
    }
  }, [E.config, he, B, ve, te, T, d]), Io = i.useMemo(() => ({ getPresignedUrl: o, currentNotePath: (r == null ? void 0 : r.id) ?? null }), [r == null ? void 0 : r.id, o]), Ts = i.useRef(Ls);
  Ts.current = Ls;
  const _s = i.useRef(Rs);
  _s.current = Rs;
  const Ds = i.useRef(Ms);
  Ds.current = Ms;
  const Fs = i.useRef(Ht);
  Fs.current = Ht;
  const Mn = i.useRef(me);
  Mn.current = me;
  const An = i.useRef(st);
  An.current = st;
  const Bs = i.useRef(As);
  Bs.current = As;
  const Ro = i.useCallback((l) => {
    _s.current(l);
  }, []), Mo = i.useCallback((l, p) => {
    Ds.current(l, p);
  }, []), Ao = i.useCallback((l) => {
    const p = Fs.current, h = Mn.current;
    !p || !h || Ts.current(p, h.option, l, h.mode);
  }, []), Lo = i.useCallback(() => {
    const l = Mn.current;
    if (!l) return;
    const p = Ze(l.questionId, l.option);
    Ve !== p && Ue(null);
  }, [Ve]), Oo = i.useCallback(() => {
    const l = An.current;
    l && Ve === `derived-${l.id}` || Cn(null);
  }, [Ve]), Qo = i.useCallback((l) => {
    const p = An.current;
    p && Bs.current(p, l);
  }, []), To = i.useCallback(() => ds(false), []), _o = i.useCallback((l) => {
    ft("all"), bt(l);
  }, [bt]), Do = i.useCallback(() => {
    Ft({ paths: fe.current.config.sourcePaths, scope: "file" });
  }, []), Fo = i.useCallback(() => {
    pt(null);
  }, []);
  if (!c) return t.jsx("div", { className: "quiz-pane flex flex-1 items-center justify-center text-sm text-gray-400", children: "\uD0ED\uC744 \uC120\uD0DD\uD558\uBA74 \uD034\uC988\uAC00 \uC5F4\uB9BD\uB2C8\uB2E4" });
  const Ln = H.total > 0 ? Math.round(H.answered / H.total * 100) : 0, qs = H.total > 0 && !co, Us = H.total > 0 && !uo, Bo = ie.examInProgress, qo = t.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-slate-500 dark:text-odp-muted", "aria-label": `\uC815\uB2F5 ${H.correct}, \uBD80\uBD84\uC815\uB2F5 ${H.partial}, \uC624\uB2F5 ${H.wrong}`, children: [t.jsxs("span", { children: ["\uC815\uB2F5", " ", t.jsx("span", { className: "font-bold tabular-nums text-emerald-600 dark:text-emerald-400", children: H.correct })] }), t.jsx("span", { className: "text-slate-300 dark:text-odp-borderSoft", "aria-hidden": true, children: "|" }), t.jsxs("span", { children: ["\uBD80\uBD84", " ", t.jsx("span", { className: "font-bold tabular-nums text-amber-600 dark:text-amber-400", children: H.partial })] }), t.jsx("span", { className: "text-slate-300 dark:text-odp-borderSoft", "aria-hidden": true, children: "|" }), t.jsxs("span", { children: ["\uC624\uB2F5", " ", t.jsx("span", { className: "font-bold tabular-nums text-rose-500 dark:text-rose-400", children: H.wrong })] })] });
  return t.jsx(xa, { value: Io, children: t.jsx(It, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs("div", { className: "quiz-pane relative flex min-h-0 min-w-0 max-w-full flex-1 flex-col overflow-hidden bg-slate-50 dark:bg-odp-bg", children: [t.jsx("div", { className: "min-w-0 shrink-0 border-b border-slate-200 bg-white/90 px-4 py-3 dark:border-odp-borderSoft dark:bg-odp-surface", children: t.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2 overflow-hidden", children: [t.jsxs("div", { className: "mr-auto flex min-w-0 flex-1 basis-full items-center gap-2 sm:basis-auto sm:gap-3", children: [t.jsx(Zi, { className: "shrink-0 text-blue-600", size: 18 }), t.jsx("span", { className: "shrink-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: "\uD034\uC988 \uBAA8\uB4DC" }), H.total > 0 ? t.jsx("div", { className: `${pr} flex-1`, "aria-hidden": !qs, children: t.jsx(cn, { initial: false, children: qs ? t.jsxs(We.div, { className: "flex w-full min-w-0 items-center gap-2 overflow-hidden sm:gap-3", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2, ease: "easeOut" }, children: [t.jsxs("p", { className: "hidden shrink-0 overflow-hidden text-xs whitespace-nowrap text-slate-600 dark:text-odp-muted md:inline", children: ["\uCD1D", " ", t.jsx("span", { className: "font-semibold text-slate-800 dark:text-odp-fgStrong", children: H.total }), "\uBB38\uD56D \uC911", " ", t.jsx("span", { className: "font-semibold text-blue-600 dark:text-blue-400", children: H.answered }), "\uBB38\uD56D \uD480\uC774"] }), t.jsxs("span", { className: "shrink-0 text-xs font-semibold whitespace-nowrap tabular-nums text-slate-600 dark:text-odp-muted md:hidden", children: [H.answered, "/", H.total] }), t.jsx("div", { className: "h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-odp-bgSoft", role: "progressbar", "aria-valuenow": H.answered, "aria-valuemin": 0, "aria-valuemax": H.total, "aria-label": `\uD480\uC774 \uC9C4\uD589 ${H.answered} / ${H.total}`, children: t.jsx(We.div, { className: "h-full rounded-full bg-blue-500", initial: false, animate: { width: `${Ln}%` }, transition: { duration: 0.3, ease: "easeOut" } }) }), t.jsxs("span", { className: "shrink-0 text-[11px] font-medium whitespace-nowrap tabular-nums text-slate-500 dark:text-odp-muted", children: [Ln, "%"] })] }, "quiz-header-progress") : null }) }) : null] }), H.total > 0 ? t.jsx("div", { className: `${pr} shrink-0`, "aria-hidden": !Us, children: t.jsx(cn, { initial: false, children: Us ? t.jsx(We.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2, ease: "easeOut" }, className: "overflow-hidden whitespace-nowrap", children: qo }, "quiz-header-score") : null }) }) : null, t.jsxs(ia, { children: [t.jsx(aa, { asChild: true, children: t.jsxs(F, { type: "button", variant: "secondary", size: "sm", children: [t.jsx(Ks, { size: 14 }), "\uBB38\uC81C \uCD94\uAC00", t.jsx(Yn, { size: 14, className: "opacity-70", "aria-hidden": true })] }) }), t.jsx(la, { children: t.jsxs(ca, { className: Nd, sideOffset: 6, align: "start", children: [t.jsxs(Vs, { className: xr, onSelect: () => {
    Dt(null), _t(true);
  }, children: [t.jsx(hn, { size: 14, "aria-hidden": true }), "\uC9C1\uC811\uCD94\uAC00"] }), t.jsxs(Vs, { className: xr, onSelect: () => Nn(true), children: [t.jsx(Yi, { size: 14, "aria-hidden": true }), "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30"] })] }) })] }), t.jsxs(F, { type: "button", variant: "secondary", size: "sm", onClick: zs, children: [t.jsx(zr, { size: 14 }), "\uCD08\uAE30\uD654"] }), t.jsxs(F, { type: "button", variant: "primary", size: "sm", onClick: () => {
    $o();
  }, children: [t.jsx(Pr, { size: 14 }), "\uC804\uCCB4 \uCC44\uC810"] }), t.jsxs(F, { type: "button", variant: Ps.active > 0 ? "primary" : "secondary", size: "sm", "aria-pressed": Tt, onClick: () => {
    mt((l) => (l && pt(null), !l));
  }, children: [t.jsx(Er, { size: 14 }), "\uADFC\uAC70"] }), t.jsx(F, { type: "button", variant: vn ? "primary" : "tertiary", size: "sm", "aria-label": "\uBAA9\uCC28", "aria-pressed": vn, onClick: () => ds((l) => !l), children: t.jsx(Ir, { size: 14 }) })] }) }), t.jsxs("div", { className: "flex min-h-0 flex-1 overflow-hidden", children: [t.jsx("div", { className: "relative min-h-0 min-w-0 flex-1", children: t.jsx("div", { ref: gt, className: "h-full min-h-0 overflow-y-auto px-4 py-4", children: t.jsxs("div", { className: "mx-auto max-w-3xl space-y-4", children: [t.jsx(fd, { profiles: ve, profileId: M.profileId, model: M.model, onProfileIdChange: M.onProfileIdChange, onModelChange: M.onModelChange }), t.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-odp-borderSoft dark:bg-odp-surface", children: [t.jsxs("div", { ref: ms, children: [t.jsxs("div", { className: "mb-2 flex justify-between text-xs font-semibold text-slate-600 dark:text-odp-muted", children: [t.jsx("span", { children: "\uD480\uC774 \uC9C4\uD589\uB960" }), t.jsxs("span", { children: [H.answered, " / ", H.total] })] }), t.jsx("div", { className: "mb-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-odp-bgSoft", children: t.jsx(We.div, { className: "h-full rounded-full bg-blue-500", initial: false, animate: { width: `${Ln}%` }, transition: { duration: 0.3, ease: "easeOut" } }) })] }), t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [t.jsxs("div", { className: "flex gap-4 text-center text-xs", children: [t.jsxs("div", { children: [t.jsx("div", { className: "text-xl font-black text-slate-800 dark:text-odp-fgStrong", children: H.scorePercent != null ? `${H.scorePercent}\uC810` : "-" }), t.jsx("div", { className: "text-[10px] text-slate-400", children: "\uC810\uC218" })] }), t.jsxs("div", { ref: ps, className: "flex gap-4 text-center text-xs", children: [t.jsxs("div", { children: [t.jsx("div", { className: "text-lg font-bold text-emerald-600", children: H.correct }), t.jsx("div", { className: "text-[10px] text-slate-400", children: "\uC815\uB2F5" })] }), t.jsxs("div", { children: [t.jsx("div", { className: "text-lg font-bold text-amber-600", children: H.partial }), t.jsx("div", { className: "text-[10px] text-slate-400", children: "\uBD80\uBD84" })] }), t.jsxs("div", { children: [t.jsx("div", { className: "text-lg font-bold text-rose-500", children: H.wrong }), t.jsx("div", { className: "text-[10px] text-slate-400", children: "\uC624\uB2F5" })] })] })] }), t.jsx("div", { className: "flex gap-1 rounded-xl bg-slate-100 p-1 text-xs dark:bg-odp-bgSoft", children: [["all", "\uC804\uCCB4"], ["wrong", "\uC624\uB2F5\uB9CC"], ["unanswered", "\uBBF8\uD480\uC774"]].map(([l, p]) => t.jsx("button", { type: "button", className: `rounded-lg px-2.5 py-1 font-medium ${yn === l ? "bg-white shadow-sm dark:bg-odp-surface" : "text-slate-600 dark:text-odp-muted"}`, onClick: () => ft(l), children: p }, l)) })] }), t.jsx(ll, { log: ye })] }), E.questions.length === 0 ? t.jsxs("div", { className: "rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-odp-borderSoft dark:bg-odp-surface", children: [t.jsx("p", { className: "mb-3 text-sm font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uB4F1\uB85D\uB41C \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" }), t.jsxs("div", { className: "flex flex-wrap justify-center gap-2", children: [t.jsxs(F, { type: "button", variant: "primary", onClick: () => _t(true), children: [t.jsx(Ks, { size: 14 }), "\uBB38\uC81C \uCD94\uAC00"] }), t.jsx(F, { type: "button", variant: "secondary", onClick: () => Nn(true), children: "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30" })] })] }) : null, E.questions.length > 0 ? t.jsx(Ml, { ref: $n, questions: E.questions, filter: yn, scrollRef: gt, userAnswers: re, graded: de, subjGrades: pe, isSubmitted: xe, expVisible: Yr, wrongExpsByQuestion: mo, questionMemos: ue, freshQuestionIds: no, busyId: Ve, examInProgress: Bo, resolveWrongExpFocusOption: Po, onAnswerCommit: wo, onSelectOption: ho, onEditQuestion: yo, onGradeChoice: bo, onGradeSubjective: ko, onRetry: go, onToggleExplanation: vo, onSimilar: Ro, onDerived: So, onGenerateSections: Mo, onWrongExpFocusChange: jo, onOpenAnalysisDock: po, onMemoSave: Co, onClearFresh: No }) : null] }) }) }), t.jsx(Pa, { open: st != null, question: st, defaultChoiceCount: E.config.choiceCount || 4, busy: st != null && Ve === `derived-${st.id}`, onClose: Oo, onSubmit: Qo }), t.jsx(Tl, { open: !!(me && Ht), question: Ht, option: (me == null ? void 0 : me.option) ?? null, mode: (me == null ? void 0 : me.mode) ?? "create", existingAnalysis: me && me.mode === "followup" ? String(Oe[Ze(me.questionId, me.option)] || "") : "", llmProfiles: ve, profileId: M.profileId, model: M.model, onProfileIdChange: M.onProfileIdChange, onModelChange: M.onModelChange, busy: me != null && Ve === Ze(me.questionId, me.option), onClose: Lo, onGenerate: Ao }), t.jsx(lc, { path: eo, onClose: Fo, loadDocument: V, onOpenDocument: P, onOpenInNewTab: Q }), t.jsx(ec, { open: Tt, docConfig: E.config, sourcePathUsage: Ps, busyGenSources: Ve === "gen-sources", onClose: D, onPreview: W, onRemove: io, onToggleEnabled: oo, onOpenPicker: Do, onGenerateFromTopic: zo, onDropHostChange: lo }), t.jsx(bc, { open: vn, questions: E.questions, userAnswers: re, gradedQuestions: de, isSubmitted: xe, subjectiveGrades: pe, onClose: To, onNavigate: _o })] }), us ? t.jsx(Va, { isOpen: us, onClose: () => {
    _t(false), Dt(null);
  }, styleTemplate: fo, initial: he, nextLabel: es(E.questions), onSubmit: (l) => {
    ke(he ? { ...E, questions: E.questions.map((p) => p.id === he.id ? l : p) } : { ...E, questions: [...E.questions, l] }), Dt(null);
  }, onOpenSourcePicker: (l, p) => Ft({ paths: l, scope: "question", onDone: p }), ...he ? { onFixWithAi: Eo } : {} }) : null, fs ? t.jsx(el, { isOpen: fs, onClose: () => Nn(false), current: E, onApply: (l, p) => {
    ke(l), p === "replace" && zs(), d({ message: `\uBB38\uC81C ${l.questions.length}\uAC1C \uC801\uC6A9`, durationMs: 2500 });
  } }) : null, Ge ? t.jsx(tl, { isOpen: true, onClose: () => Ft(null), tree: O, selected: Ge.paths, excludePath: (r == null ? void 0 : r.id) || null, onExpandFolder: Y, onDropHostChange: ao, onRegisterDropPathsMerge: (l) => {
    ys.current = l;
  }, onConfirm: (l) => {
    Ge.onDone ? Ge.onDone(l) : Ge.scope === "file" && ke({ ...E, config: { ...E.config, sourcePaths: l } }), Ft(null);
  } }) : null, t.jsx(Jn, { isOpen: to, title: "\uC2DC\uD5D8 \uC2DC\uC791", message: "\uCD08\uAE30\uD654\uD558\uACE0 \uC2DC\uD5D8\uC744 \uC2DC\uC791\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?", confirmLabel: "\uC2DC\uC791", cancelLabel: "\uCDE8\uC18C", variant: "danger", onConfirm: () => {
    Sn(false), xo();
  }, onCancel: () => Sn(false) }), t.jsx(Jn, { isOpen: xt != null, title: "\uADFC\uAC70 \uBB38\uC11C \uC81C\uAC70", message: xt ? `\u300C${xt}\u300D\uC744(\uB97C) \uD30C\uC77C \uADFC\uAC70\uC5D0\uC11C \uC81C\uAC70\uD560\uAE4C\uC694?` : "", confirmLabel: "\uC81C\uAC70", cancelLabel: "\uCDE8\uC18C", variant: "danger", onConfirm: () => {
    xt && En(xt), jn(null);
  }, onCancel: () => jn(null) }), t.jsx(il, { jobs: g.jobs, isOpen: g.panelOpen, size: g.panelSize, onClose: g.closePanel, onResize: g.setPanelSize, onRemoveJob: g.removeJob, onClearFinished: g.clearFinishedJobs, onUserEngage: g.markPanelUserEngaged, onPointerEngageChange: g.markPanelPointerEngaged, onFocusEngageChange: g.markPanelFocusEngaged }), !g.panelOpen && g.jobs.length > 0 ? t.jsxs("button", { type: "button", className: "fixed bottom-4 right-4 z-10049 flex items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-2 text-xs font-semibold text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 dark:border-violet-700/60", onClick: g.openPanel, onMouseEnter: () => g.markPanelPointerEngaged(true), onMouseLeave: () => g.markPanelPointerEngaged(false), onFocus: () => g.markPanelFocusEngaged(true), onBlur: () => g.markPanelFocusEngaged(false), "aria-label": "\uBB38\uC81C \uC0DD\uC131 \uB300\uAE30\uC5F4 \uC5F4\uAE30", children: [t.jsx(Qe, { size: 14 }), "\uC0DD\uC131 \uB300\uAE30\uC5F4", g.hasActiveJobs ? t.jsx("span", { className: "rounded-full bg-violet-400/30 px-1.5 py-0.5 text-[10px] font-bold", children: "\uC9C4\uD589" }) : null] }) : null] }) }) });
}
export {
  _d as default
};
