import { j as t, r as i } from "./vendor-react-BwEIQNKH.js";
import { A as dn, m as He } from "./vendor-motion-CLW0brs2.js";
import { eh as Ke, ei as Et, ej as un, ek as fn, aP as gr, D as dt, T as Lt, el as br, E as F, dV as Vo, em as Xo, en as Zo, eo as Yo, ep as ss, eq as rs, er as kr, a0 as os, d5 as hn, es as ei, et as ti, at as Hn, c9 as ni, eu as si, ev as Kn, ew as Tn, ex as ri, ey as Ye, ez as oi, eA as ii, eB as wr, eC as yr, eD as Vn, eE as ai, eF as Xn, eG as zt, eH as li, eI as Pe, eJ as ci, eK as at, eL as is, eM as as, eN as vr, eO as Sr, eP as jr, eQ as Cr, eR as Nr, eS as di, eT as $r, eU as Pr, eV as Nt, eW as ui, eX as _n, eY as fi, eZ as mi, e_ as pi, e$ as xi, f0 as Ws, f1 as hi, f2 as Zn, f3 as gi, f4 as Js, f5 as bi, f6 as Yn, f7 as yt, f8 as ki, f9 as vt, fa as Pt, fb as $t, fc as wi, fd as yi, fe as Vt, ff as vi, S as rn, fg as on, fh as an, fi as Si, J as ln, bR as ji, dv as Ci, du as Ni, fj as $i, fk as Pi, fl as St, fm as Dn, fn as Ei, fo as zi, fp as Ii, fq as Ri, fr as Mi, fs as Ai, ft as Li, fu as Oi, fv as Qi, fw as Ti, fx as _i, fy as Di } from "./index-bQvC9Gon.js";
import { X as Ue, L as gn, aa as ls, k as Er, ab as It, a2 as Fi, S as _e, a1 as Hs, O as es, ac as qi, ad as Ks, ae as Bi, af as Ui, N as Gi, ag as Wi, G as Ji, ah as bn, ai as zr, aj as Ir, ak as Hi, al as Rr, E as Ki, am as Vi, b as Xi, an as Mr, ao as Zi, ap as Yi, y as Vs, aq as ea } from "./vendor-lucide-MLE-4ziu.js";
import { d as Rt, X as ta, Y as na, e as Re, f as Me, g as Ae, h as Le, A as Oe, v as sa, w as ra, S as oa, a as ia, q as aa, r as la, s as ca, t as da, u as Xs } from "./vendor-radix-DOgSp64j.js";
import { an as ua, v as fa, K as ma } from "./vendor-md-editor-D3gQZdJY.js";
import { u as pa } from "./preview-G8eW1fdi.js";
import { u as xa } from "./useWikiImageHydration-CInHcJLA.js";
import "./vendor-aws-u6g9QQ6G.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-google-genai-Bp0rxPXM.js";
const Ar = i.createContext({ hydrationEnabled: true });
function ha({ value: e, children: n }) {
  return t.jsx(Ar.Provider, { value: e, children: n });
}
function ga() {
  return i.useContext(Ar);
}
function De(e, n = 4) {
  if (e.kind !== "choice") return Ke(n);
  const s = (e.options || []).filter((o) => String(o || "").trim()).length, r = Math.max(s, (e.options || []).length);
  return r >= Et ? Ke(r) : Ke(n);
}
function Lr(e, n = 4) {
  const s = Ke(n), r = e.length ? e[e.length - 1] : null;
  return r ? r.kind === "subjective" ? { kind: "subjective", answerStyle: r.answerStyle === "essay" ? "essay" : "short", choiceCount: s } : { kind: "choice", answerStyle: "short", choiceCount: De(r, s) } : { kind: "choice", answerStyle: "short", choiceCount: s };
}
function Zs(e, n) {
  const s = Lr(n, e.choiceCount);
  return { ...e, choiceCount: s.choiceCount };
}
function et(e, n) {
  const s = Ke(n), r = [...e];
  for (; r.length < s; ) r.push("");
  return r.slice(0, s);
}
function Or() {
  const [e, n] = i.useState(() => un());
  return i.useEffect(() => {
    const s = () => n(un());
    return window.addEventListener(fn, s), () => window.removeEventListener(fn, s);
  }, []), e;
}
const Qr = [0.32, 0.72, 0, 1], ba = { duration: 0 };
function ka(e) {
  return e ? { type: "spring", stiffness: 380, damping: 36 } : { type: "tween", duration: 0.22, ease: Qr };
}
const wa = gr() ? { type: "tween", duration: 0.2, ease: Qr } : { type: "spring", stiffness: 420, damping: 34 };
function ya(e, n = {}) {
  const { isResizing: s = false, edge: r = "right" } = n, o = n.useLayoutWidthAnim ?? un(), a = s ? ba : ka(o);
  if (o) return { style: void 0, initial: { width: 0, opacity: 0.85 }, animate: { width: e, opacity: 1 }, exit: { width: 0, opacity: 0.85 }, transition: a };
  const c = r === "right" ? "100%" : "-100%";
  return { style: { width: e, flexShrink: 0, overflow: "hidden", willChange: "transform" }, initial: { x: c, opacity: 0.92 }, animate: { x: 0, opacity: 1 }, exit: { x: c, opacity: 0.92 }, transition: a };
}
function va() {
  return { initial: { y: 48, opacity: 0, scale: 0.98 }, animate: { y: 0, opacity: 1, scale: 1 }, exit: { y: 48, opacity: 0, scale: 0.98 }, transition: wa };
}
function Sa(e, n) {
  return n ?? un() ? { initial: { opacity: 0, x: 12 }, animate: { opacity: 1, x: 0 }, transition: { delay: Math.min(e, 12) * 0.03, duration: 0.18 } } : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.14, delay: Math.min(e, 8) * 0.02 } };
}
function Ot({ motionKey: e, open: n, width: s, isResizing: r = false, edge: o = "right", className: a, "aria-label": c, children: d }) {
  const u = Or(), f = ya(s, { isResizing: r, edge: o, useLayoutWidthAnim: u });
  return t.jsx(dn, { initial: false, children: n ? u ? t.jsx(He.aside, { role: "complementary", "aria-label": c, className: a, initial: f.initial, animate: f.animate, exit: f.exit, transition: f.transition, children: d }, e) : t.jsx(He.aside, { role: "complementary", "aria-label": c, className: a, style: { width: s, flexShrink: 0, overflow: "hidden", willChange: "transform" }, initial: f.initial, animate: f.animate, exit: f.exit, transition: f.transition, children: d }, e) : null });
}
const ja = 360, Ca = Lt;
function Na(e) {
  return e === "subjective-essay" ? { kind: "subjective", answerStyle: "essay" } : e === "subjective-short" ? { kind: "subjective", answerStyle: "short" } : { kind: "choice", answerStyle: "short" };
}
function $a(e) {
  return e && e.kind === "subjective" ? e.answerStyle === "essay" ? "subjective-essay" : "subjective-short" : "choice";
}
function Pa({ open: e, question: n, defaultChoiceCount: s, busy: r = false, onClose: o, onSubmit: a }) {
  const [c, d] = i.useState("choice"), [u, f] = i.useState(s), [m, p] = i.useState(""), { width: k, handleProps: h, isResizing: y } = dt({ storageKey: "quiz-derived-question-dock-width", defaultWidth: ja, minWidth: 280, maxWidth: 560, edge: "right" }), v = i.useMemo(() => n ? De(n, s) : s, [s, n]);
  i.useEffect(() => {
    e && (d($a(n)), f(v), p(""));
  }, [e, n, v]);
  const { kind: z, answerStyle: C } = Na(c), N = (n == null ? void 0 : n.displayLabel) || (n == null ? void 0 : n.id) || "", g = () => {
    a({ kind: z, choiceCount: Ke(u), ...z === "subjective" ? { answerStyle: C } : {}, ...m.trim() ? { userPrompt: m.trim() } : {} });
  }, $ = e && n != null;
  return t.jsx(Ot, { motionKey: "quiz-derived-question-dock", open: $, width: k, isResizing: y, "aria-label": "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131", className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-violet-200 bg-white shadow-lg dark:border-violet-900/60 dark:bg-odp-surface", children: n != null ? t.jsxs("div", { className: "relative h-full min-h-0", style: { width: k }, children: [t.jsx(Ca, { edge: "left", handleProps: h, isResizing: y, visibleOnHover: true, label: "\uD30C\uC0DD\uBB38\uC81C \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [t.jsxs("div", { className: "flex items-center justify-between border-b border-violet-200 px-3 py-2.5 dark:border-violet-900/60", children: [t.jsxs("div", { className: "min-w-0", children: [t.jsx("div", { className: "text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131" }), N ? t.jsxs("p", { className: "text-[11px] text-slate-500 dark:text-odp-muted", children: [N, "\uBC88 \uBB38\uD56D"] }) : null] }), t.jsx("button", { type: "button", "aria-label": "\uD30C\uC0DD\uBB38\uC81C \uD328\uB110 \uB2EB\uAE30", className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg", onClick: o, disabled: r, children: t.jsx(Ue, { size: 16 }) })] }), t.jsxs("div", { className: "min-h-0 flex-1 space-y-3 overflow-y-auto p-3", children: [t.jsxs("div", { className: "rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-2 text-[11px] text-violet-950 dark:border-violet-800/70 dark:bg-violet-950/45 dark:text-violet-100", children: [t.jsx("p", { className: "font-semibold", children: "\uC6D0\uBCF8 \uBB38\uD56D" }), t.jsx("p", { className: "mt-1 line-clamp-4 opacity-90", children: n.question })] }), t.jsx("p", { className: "text-xs text-slate-600 dark:text-odp-muted", children: "\uC6D0\uBCF8 \uBB38\uD56D\uC744 \uBC14\uD0D5\uC73C\uB85C \uC720\uD615\uC744 \uBC14\uAFB8\uAC70\uB098 \uC694\uAD6C\uC0AC\uD56D\uC744 \uCD94\uAC00\uD574 \uC0C8 \uD30C\uC0DD \uBB38\uD56D\uC744 \uC0DD\uC131\uD569\uB2C8\uB2E4." }), t.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [[["choice", "\uAC1D\uAD00\uC2DD"], ["subjective-short", "\uB2E8\uB2F5\uD615"], ["subjective-essay", "\uC11C\uC220\uD615"]].map(([w, S]) => {
    const I = c === w;
    return t.jsx("button", { type: "button", disabled: r, className: `rounded-lg border px-3 py-1.5 text-xs font-semibold ${I ? "border-violet-500 bg-violet-50 text-violet-900 dark:bg-violet-950/40 dark:text-violet-100" : "border-slate-200 bg-white text-slate-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"}`, onClick: () => d(w), children: S }, w);
  }), z === "choice" ? t.jsxs("label", { className: "ml-auto flex items-center gap-1.5 text-xs text-slate-600 dark:text-odp-muted", children: ["\uBCF4\uAE30", t.jsx("select", { className: "rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: u, disabled: r, onChange: (w) => f(Number(w.target.value) || u), children: Array.from({ length: br - Et + 1 }, (w, S) => Et + S).map((w) => t.jsxs("option", { value: w, children: [w, "\uC9C0\uC120\uB2E4"] }, w)) })] }) : null] }), t.jsxs("label", { className: "block space-y-1.5", children: [t.jsxs("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: ["\uCD94\uAC00 \uC694\uAD6C\uC0AC\uD56D", t.jsx("span", { className: "ml-1 font-normal text-slate-500 dark:text-odp-muted", children: "(\uC120\uD0DD)" })] }), t.jsx("textarea", { className: "quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", placeholder: "\uC608: \uACC4\uC0B0 \uC704\uC8FC\uB85C \uBC14\uAFB8\uACE0, \uC624\uB2F5 \uBCF4\uAE30\uB294 \uD5F7\uAC08\uB9AC\uAC8C \uAD6C\uC131\uD574 \uC8FC\uC138\uC694.", value: m, disabled: r, onChange: (w) => p(w.target.value) })] })] }), t.jsxs("div", { className: "flex gap-2 border-t border-violet-200 p-3 dark:border-violet-900/60", children: [t.jsx(F, { type: "button", variant: "secondary", size: "sm", className: "flex-1", disabled: r, onClick: o, children: "\uCDE8\uC18C" }), t.jsxs(F, { type: "button", variant: "primary", size: "sm", className: "flex-1", disabled: r, onClick: g, children: [r ? t.jsx(gn, { size: 14, className: "animate-spin", "aria-hidden": true }) : t.jsx(ls, { size: 14 }), r ? "\uC0DD\uC131 \uC911\u2026" : "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131"] })] })] })] }) : null });
}
const Ea = i.memo(Pa);
function Mt(e) {
  const n = String(e || "").trim();
  if (!n) return "";
  const s = n.lastIndexOf("/");
  return s >= 0 ? n.slice(s + 1) : n;
}
const za = "z-100001 max-w-[min(92vw,420px)] break-all rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", Ia = "flex w-full items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-2 py-1.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100", Ra = "inline-flex max-w-full items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100", Ma = "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-violet-400 bg-white outline-none focus-visible:ring-2 focus-visible:ring-violet-400 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600 dark:border-violet-600 dark:bg-odp-bgSoft dark:data-[state=checked]:border-violet-500 dark:data-[state=checked]:bg-violet-500";
function Aa({ path: e, isDock: n, onPreview: s, muted: r }) {
  const o = Mt(e), a = n ? `min-w-0 flex-1 truncate text-left hover:underline${r ? " opacity-60" : ""}` : `min-w-0 max-w-full truncate hover:underline${r ? " opacity-60" : ""}`, c = s ? t.jsx("button", { type: "button", className: a, onClick: () => s(e), children: o }) : t.jsx("span", { className: a, children: o });
  return t.jsxs(Re, { children: [t.jsx(Me, { asChild: true, children: c }), t.jsx(Ae, { children: t.jsxs(Le, { side: "top", sideOffset: 6, className: za, children: [e, t.jsx(Oe, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Tr({ paths: e, onRemove: n, onOpenPicker: s, onPreview: r, isPathEnabled: o, onToggleEnabled: a, label: c = "\uADFC\uAC70 \uBB38\uC11C", emptyHint: d = "\uC120\uD0DD\uB41C \uADFC\uAC70 \uBB38\uC11C \uC5C6\uC74C", layout: u = "chips" }) {
  const f = u === "dock", m = f && !!a;
  return t.jsx(Rt, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs("div", { className: "space-y-1.5", children: [t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: c }), s ? t.jsx(F, { type: "button", variant: "secondary", size: "sm", onClick: s, children: "\uC120\uD0DD" }) : null] }), e.length === 0 ? t.jsx("p", { className: "text-[11px] text-gray-500 dark:text-odp-muted", children: d }) : t.jsx("ul", { className: f ? "flex flex-col gap-1.5" : "flex flex-wrap gap-1.5", children: e.map((p) => {
    const k = o ? o(p) : true, h = f ? `${Ia}${k ? "" : " opacity-70"}` : Ra;
    return t.jsxs("li", { className: h, children: [m ? t.jsx(ta, { className: Ma, checked: k, onCheckedChange: (y) => a == null ? void 0 : a(p, y === true), "aria-label": `${p} ${k ? "\uC0AC\uC6A9 \uC911" : "\uC0AC\uC6A9 \uC548 \uD568"}`, children: t.jsx(na, { className: "text-white", children: t.jsx(Er, { size: 10, strokeWidth: 3 }) }) }) : null, t.jsx(Aa, { path: p, isDock: f, onPreview: r, muted: m && !k }), n ? t.jsx("button", { type: "button", "aria-label": `${p} \uC81C\uAC70`, className: f ? "ml-auto shrink-0 rounded-md p-1.5 hover:bg-violet-200/80 dark:hover:bg-violet-900" : "shrink-0 rounded p-0.5 hover:bg-violet-200/80 dark:hover:bg-violet-900", onClick: () => n(p), children: t.jsx(Ue, { size: f ? 14 : 12 }) }) : null] }, p);
  }) })] }) });
}
fa({ editorConfig: { languageUserDefined: { "ko-KR": ma } } });
function La({ text: e, previewId: n, className: s = "", getPresignedUrl: r, currentNotePath: o }) {
  const a = pa(), c = i.useRef(null), d = i.useMemo(() => String(e || ""), [e]), u = ga(), f = r ?? u.getPresignedUrl, m = o ?? u.currentNotePath ?? null, p = u.hydrationEnabled !== false;
  return xa(c, d, f, m, { enabled: p }), t.jsx("div", { ref: c, className: `quiz-md-preview markdown-content ${s}`, children: t.jsx(ua, { id: n, modelValue: d, theme: a === "dark" ? "dark" : "light", previewTheme: "default", codeTheme: Vo, language: "ko-KR", showCodeRowNumber: false, noImgZoomIn: true, iconfontType: void 0, sanitize: (k) => k }) });
}
const Fe = i.memo(La), Oa = /\*\(\s*정답\s*\)\*|\(\s*정답\s*\)|\[\s*정답\s*\]|\*\s*정답\s*\*/;
function Qa(e) {
  return e.replace(/\*\(\s*정답\s*\)\*/g, "").replace(/\(\s*정답\s*\)/g, "").replace(/\[\s*정답\s*\]/g, "").replace(/\*\s*정답\s*\*/g, "").replace(/\*\*(.*?)\*\*/g, "$1").replace(/__(.*?)__/g, "$1").trim();
}
function Ta(e) {
  let n = e.trim();
  const s = n.match(/^\[단답형\]\s*(.*)$/i);
  if (s) return { kind: "subjective", answerStyle: "short", question: (s[1] || "").trim() };
  const r = n.match(/^\[(?:주관식|서술형)\]\s*(.*)$/i);
  return r ? { kind: "subjective", answerStyle: "essay", question: (r[1] || "").trim() } : { kind: "choice", question: n };
}
const Ys = /\*{0,2}\s*📖\s*모범\s*답안\s*:?\s*\*{0,2}/, er = /\*{0,2}\s*💡\s*접근\s*Point!?\s*\*{0,2}/, tr = /\*{0,2}\s*📖\s*해설\s*:?\s*\*{0,2}/, mn = /\*{0,2}\s*📚\s*근거\s*문서\s*:?\s*\*{0,2}/;
function _a(e) {
  const n = e.join(`
`);
  if (!mn.test(n) && !n.includes("\u{1F4DA} \uADFC\uAC70 \uBB38\uC11C")) return;
  const s = n.split(mn)[1] ?? "", r = [];
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
function Xt(e) {
  return String(e || "").replace(/^\*+\s*/, "").replace(/\s*\*+$/, "").trim();
}
function Da(e) {
  const n = e.join(`
`).trim();
  if (!n) return { point: "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.", explanation: "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." };
  let s, r = n;
  if (Ys.test(r)) {
    const d = r.split(Ys), f = (d[1] || "").trim().split(/(?=\*{0,2}\s*(?:💡\s*접근\s*Point!?|📖\s*해설|📚\s*근거\s*문서))/);
    s = Xt(f[0] || ""), r = [d[0], ...f.slice(1)].join(`
`).trim();
  }
  r = (r.split(mn)[0] || "").trim();
  let a = "", c = "";
  if (er.test(r) || tr.test(r)) {
    const d = r.split(tr), u = d[0] || "";
    c = Xt(d.slice(1).join(`
`)), a = Xt(u.replace(er, ""));
  } else c = Xt(r);
  return { point: a || "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.", explanation: c || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.", ...s ? { modelAnswer: s } : {} };
}
const Fa = /^<!--\s*quiz-q-meta\s+([\s\S]*?)-->\s*$/;
function qa(e) {
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
function nr(e, n) {
  return !n && !e ? e : e ? `${e}
${n}` : n;
}
function Ua(e) {
  return /^1\.\s+/.test(e.trim());
}
function Ga(e) {
  const n = e.trim();
  return n.startsWith(">") || /^\*\*정답:\*\*/.test(n);
}
function cn(e) {
  return e.trim().replace(/^>\s?/, "");
}
function Wa(e) {
  const n = cn(e);
  return mn.test(n) || n.includes("\u{1F4DA} \uADFC\uAC70 \uBB38\uC11C");
}
function Ja(e) {
  return e.trim().startsWith(">");
}
function Ha(e, n) {
  const s = e.trim();
  if (!s || !/^#+/.test(s)) return null;
  const r = s.split(`
`);
  let o = String(n + 1), a = o, c = "", d = null;
  const u = [];
  let f = 1, m;
  const p = [];
  let k = "choice", h, y, v = false, z = false, C = false;
  for (const T of r) {
    const R = T.trim(), U = R.match(Fa);
    if (U == null ? void 0 : U[1]) {
      const E = qa(U[1]);
      (E == null ? void 0 : E.similarOf) && (y = E.similarOf);
      continue;
    }
    const B = R.match(/^#+\s*(?:🔖\s*)?(\d+(?:-(?:유사|파생)\d+)?)\.?(.*)/);
    if (B) {
      a = (B[1] || "").trim(), o = a;
      const E = Ta((B[2] || "").trim());
      k = E.kind, h = E.answerStyle, c = E.question, v = true, z = true, C = false;
      continue;
    }
    if (!v) continue;
    if (C) {
      if (Ja(R)) {
        p.push(cn(R));
        continue;
      }
      C = false;
    }
    if (z) {
      if (Wa(R)) {
        z = false, C = true, p.push(cn(R));
        continue;
      }
      if (Ua(R)) z = false;
      else if (k === "subjective" && Ga(R)) z = false;
      else if (R.startsWith("![")) {
        c = nr(c, R);
        const E = R.match(/!\[.*?\]\((.*?)\)/);
        (E == null ? void 0 : E[1]) && !d && (d = E[1]);
        continue;
      } else {
        if (!R && !c) continue;
        if (z) {
          c = nr(c, R);
          continue;
        }
      }
    }
    if (R.startsWith("![")) {
      const E = R.match(/!\[.*?\]\((.*?)\)/);
      (E == null ? void 0 : E[1]) && (d = E[1]);
      continue;
    }
    const V = R.match(/^\*\*정답:\*\*\s*(.*)$/);
    if (V) {
      m = (V[1] || "").trim();
      continue;
    }
    if (/^\d+\.\s+/.test(R)) {
      const E = R.match(/^(\d+)\.\s+(.*)/);
      if (E) {
        const L = Number.parseInt(E[1] || "0", 10), J = (E[2] || "").trim(), _ = Oa.test(J);
        u.push(Qa(J)), _ && (f = L);
      }
      continue;
    }
    R.startsWith(">") && p.push(cn(R));
  }
  const { point: N, explanation: g, modelAnswer: $ } = Da(p), w = _a(p), S = m || $;
  let I = k, Q = h;
  return I === "choice" && u.length === 0 && S && (I = "subjective", Q = m ? "short" : "essay"), I === "choice" && u.length === 0 && !S || I === "subjective" && !c || I === "choice" && (!c || u.length === 0) ? null : (y || (y = Ba(a)), c = c.trimEnd(), { id: o, displayLabel: a, kind: I, question: c, image: d, point: N, explanation: g, ...I === "subjective" && Q ? { answerStyle: Q } : {}, ...I === "choice" ? { options: u, answer: f } : {}, ...I === "subjective" && S ? { modelAnswer: S } : {}, ...w ? { sourcePaths: w } : {}, ...y ? { similarOf: y, isGenerated: true } : {} });
}
function it(e) {
  const { config: n, body: s } = Xo(e), { session: r, body: o } = Zo(s), a = [];
  o.split(/(?=^#+\s*(?:🔖\s*)?\d+)/m).forEach((f, m) => {
    const p = Ha(f, m);
    p && a.push(p);
  });
  const d = new Set(a.map((f) => f.id)), u = r && d.size > 0 ? Yo(r, d, a) : r;
  return { config: rs(n), questions: a, session: u && !ss(u) ? u : null };
}
function Zt(e, n) {
  return (n == null ? void 0 : n.sourcePaths) && n.sourcePaths.length > 0 ? [...n.sourcePaths] : kr(e);
}
function ts(e) {
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
function _r(e, n) {
  const s = String(e.displayLabel || n || "1").trim() || "1", r = String(e.point || "").trim() || "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.", o = String(e.explanation || "").trim() || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.", a = e.sourcePaths && e.sourcePaths.length > 0 ? [...e.sourcePaths] : void 0;
  if (e.kind === "subjective") {
    const d = e.answerStyle || "short";
    return { id: s, displayLabel: s, kind: "subjective", answerStyle: d, question: String(e.question || "").trim(), modelAnswer: String(e.modelAnswer || "").trim(), point: r, explanation: o, ...a ? { sourcePaths: a } : {} };
  }
  const c = (e.options || []).map((d) => String(d || "").trim());
  return { id: s, displayLabel: s, kind: "choice", question: String(e.question || "").trim(), options: c, answer: e.answer && e.answer >= 1 ? e.answer : 1, point: r, explanation: o, ...a ? { sourcePaths: a } : {} };
}
function Ka(e) {
  if (!String(e.question || "").trim()) return "\uC9C8\uBB38 \uBCF8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694.";
  if (e.kind === "choice") {
    const n = (e.options || []).map((o) => String(o || "").trim());
    if (n.filter(Boolean).length < 2) return "\uAC1D\uAD00\uC2DD\uC740 \uCD5C\uC18C 2\uAC1C \uC120\uD0DD\uC9C0\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4.";
    const r = e.answer || 0;
    return r < 1 || r > n.length || !n[r - 1] ? "\uC815\uB2F5 \uC120\uD0DD\uC9C0\uB97C \uC9C0\uC815\uD558\uC138\uC694." : null;
  }
  return String(e.modelAnswer || "").trim() ? null : e.answerStyle === "essay" ? "\uBAA8\uBC94 \uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694." : "\uC815\uB2F5\uC744 \uC785\uB825\uD558\uC138\uC694.";
}
function Va(e, n) {
  const s = e.kind || "choice", r = e.answerStyle === "essay" ? "essay" : "short", o = s === "choice" ? Ke(Math.max(n, (e.options || []).filter(Boolean).length)) : n, a = s === "choice" ? et(e.options || [], o) : [];
  return { kind: s, answerStyle: r, question: e.question ?? "", options: a, answer: e.answer && e.answer >= 1 ? Math.min(o, e.answer) : 1, modelAnswer: e.modelAnswer ?? "", point: e.point ?? "", explanation: e.explanation ?? "", choiceCount: o };
}
function Xa({ isOpen: e, onClose: n, styleTemplate: s, initial: r, nextLabel: o, onSubmit: a, onOpenSourcePicker: c, onFixWithAi: d }) {
  const u = !!r, [f, m] = i.useState((r == null ? void 0 : r.kind) || s.kind), [p, k] = i.useState((r == null ? void 0 : r.answerStyle) || s.answerStyle), [h, y] = i.useState(() => r ? De(r, s.choiceCount) : s.choiceCount), [v, z] = i.useState((r == null ? void 0 : r.question) || ""), [C, N] = i.useState(() => et((r == null ? void 0 : r.options) || [], r ? De(r, s.choiceCount) : s.choiceCount)), [g, $] = i.useState((r == null ? void 0 : r.answer) || 1), [w, S] = i.useState((r == null ? void 0 : r.modelAnswer) || ""), [I, Q] = i.useState((r == null ? void 0 : r.point) || ""), [D, T] = i.useState((r == null ? void 0 : r.explanation) || ""), [R, U] = i.useState((r == null ? void 0 : r.sourcePaths) || []), [B, V] = i.useState(""), [E, L] = i.useState(false), [J, _] = i.useState(""), [le, be] = i.useState(false), oe = i.useCallback((O) => {
    const q = Ke(O);
    y(q), N((ce) => et(ce, q)), $((ce) => Math.min(Math.max(1, ce), q));
  }, []);
  i.useEffect(() => {
    if (!e) {
      L(false), _(""), be(false), V("");
      return;
    }
    if (r) {
      const O = De(r, s.choiceCount);
      m(r.kind), k(r.answerStyle === "essay" ? "essay" : "short"), y(O), z(r.question || ""), N(et(r.options || [], O)), $(r.answer || 1), S(r.modelAnswer || ""), Q(r.point || ""), T(r.explanation || ""), U(r.sourcePaths || []);
    } else m(s.kind), k(s.answerStyle), y(s.choiceCount), z(""), N(et([], s.choiceCount)), $(1), S(""), Q(""), T(""), U([]);
    L(false), _(""), V("");
  }, [e, r, s]);
  const X = i.useMemo(() => {
    const O = { kind: f, displayLabel: (r == null ? void 0 : r.displayLabel) || o, question: v, point: I, explanation: D, sourcePaths: R };
    return f === "subjective" ? { ...O, answerStyle: p, modelAnswer: w } : { ...O, options: et(C, h), answer: g };
  }, [f, p, r == null ? void 0 : r.displayLabel, o, v, C, h, g, w, I, D, R]), ke = () => {
    const O = Ka(X);
    if (O) {
      V(O);
      return;
    }
    const q = _r(X, o);
    r && (q.id = r.id, q.displayLabel = r.displayLabel), a(q), n();
  }, P = async () => {
    if (!(!d || le)) {
      V(""), be(true);
      try {
        const O = await d({ instructions: J, form: X });
        if (!O) return;
        const q = Va(O, h);
        m(q.kind), k(q.answerStyle), y(q.choiceCount), z(q.question), N(q.options), $(q.answer), S(q.modelAnswer), Q(q.point), T(q.explanation), L(false);
      } catch (O) {
        V((O instanceof Error ? O.message : "") || "\uBB38\uC81C \uACE0\uCE58\uAE30\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        be(false);
      }
    }
  };
  return t.jsx(os, { isOpen: e, onClose: n, contentClassName: "quiz-pane max-w-2xl max-h-[90vh]", children: t.jsxs("div", { className: "flex max-h-[min(80vh,720px)] flex-col gap-3 overflow-y-auto p-4 text-sm", children: [t.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [t.jsx("h2", { className: "text-base font-bold text-gray-900 dark:text-odp-fgStrong", children: u ? "\uBB38\uC81C \uC218\uC815" : "\uBB38\uC81C \uCD94\uAC00" }), u && d ? t.jsxs(F, { type: "button", variant: E ? "primary" : "secondary", size: "sm", "aria-pressed": E, disabled: le, onClick: () => L((O) => !O), children: [t.jsx(It, { size: 14 }), "\uBB38\uC81C \uACE0\uCE58\uAE30"] }) : null] }), u && E && d ? t.jsxs("div", { className: "space-y-2 rounded-xl border border-violet-200 bg-violet-50/80 p-3 dark:border-violet-900/60 dark:bg-violet-950/25", children: [t.jsx("p", { className: "text-xs text-violet-900 dark:text-violet-100", children: "\uD604\uC7AC \uBB38\uD56D\uC744 \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB294 \uAC83\uC73C\uB85C \uBCF4\uACE0 AI\uAC00 \uAD50\uC815\uD569\uB2C8\uB2E4. \uC694\uAD6C\uC0AC\uD56D\uC744 \uC801\uC73C\uBA74 \uBB38\uD56D \uBC29\uD5A5\xB7\uC8FC\uC81C\xB7\uB09C\uC774\uB3C4\uB97C \uC870\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-violet-900 dark:text-violet-100", children: "\uC218\uC815 \uC694\uAD6C\uC0AC\uD56D (\uC120\uD0DD)" }), t.jsx("textarea", { className: "min-h-16 w-full rounded-lg border border-violet-200 bg-white p-2 text-xs dark:border-violet-800 dark:bg-odp-bgSoft", placeholder: "\uC608: \uACC4\uC0B0 \uACFC\uC815\uC744 \uB2E8\uC21C\uD654\uD558\uACE0, \uC624\uB2F5 \uBCF4\uAE30\uB97C \uB354 \uADF8\uB7F4\uB4EF\uD558\uAC8C \uBC14\uAFD4 \uC8FC\uC138\uC694.", value: J, onChange: (O) => _(O.target.value), disabled: le })] }), t.jsx("div", { className: "flex justify-end", children: t.jsxs(F, { type: "button", variant: "primary", size: "sm", disabled: le, onClick: () => {
    P();
  }, children: [le ? t.jsx(gn, { size: 14, className: "animate-spin", "aria-hidden": true }) : t.jsx(It, { size: 14 }), le ? "\uACE0\uCE58\uB294 \uC911\u2026" : "AI\uB85C \uACE0\uCE58\uAE30"] }) })] }) : null, t.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [[["choice", "\uAC1D\uAD00\uC2DD"], ["subjective-short", "\uB2E8\uB2F5\uD615"], ["subjective-essay", "\uC11C\uC220\uD615"]].map(([O, q]) => {
    const ce = O === "choice" ? f === "choice" : f === "subjective" && p === (O === "subjective-short" ? "short" : "essay");
    return t.jsx("button", { type: "button", className: `rounded-lg border px-3 py-1.5 text-xs font-semibold ${ce ? "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-100" : "border-gray-200 bg-white text-gray-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"}`, onClick: () => {
      O === "choice" ? m("choice") : (m("subjective"), k(O === "subjective-short" ? "short" : "essay"));
    }, children: q }, O);
  }), f === "choice" ? t.jsxs("label", { className: "ml-auto flex items-center gap-1.5 text-xs text-gray-600 dark:text-odp-muted", children: ["\uBCF4\uAE30", t.jsx("select", { className: "rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: h, onChange: (O) => oe(Number(O.target.value) || h), children: Array.from({ length: br - Et + 1 }, (O, q) => Et + q).map((O) => t.jsxs("option", { value: O, children: [O, "\uC9C0\uC120\uB2E4"] }, O)) })] }) : null] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uC9C8\uBB38 (Markdown)" }), t.jsx("textarea", { className: "min-h-24 w-full rounded-lg border border-gray-300 bg-white p-2 font-mono text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: v, onChange: (O) => z(O.target.value) }), v.trim() ? t.jsx(Fe, { text: v, previewId: "quiz-add-q-preview", className: "rounded border border-gray-100 p-2 text-xs dark:border-odp-borderSoft" }) : null] }), f === "choice" ? t.jsxs("div", { className: "space-y-2", children: [t.jsxs("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: ["\uC120\uD0DD\uC9C0 (", h, "\uC9C0\uC120\uB2E4)"] }), C.map((O, q) => t.jsxs("div", { className: "flex items-start gap-2", children: [t.jsx("input", { type: "radio", name: "quiz-add-answer", checked: g === q + 1, onChange: () => $(q + 1), className: "mt-2", "aria-label": `${q + 1}\uBC88 \uC815\uB2F5` }), t.jsx("textarea", { className: "min-h-10 flex-1 rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: O, placeholder: `${q + 1}\uBC88`, onChange: (ce) => {
    const Ce = [...C];
    Ce[q] = ce.target.value, N(Ce);
  } })] }, q))] }) : t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: p === "essay" ? "\uBAA8\uBC94 \uB2F5\uC548" : "\uC815\uB2F5" }), p === "essay" ? t.jsx("textarea", { className: "min-h-20 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: w, onChange: (O) => S(O.target.value) }) : t.jsx("input", { className: "w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: w, onChange: (O) => S(O.target.value) })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uC811\uADFC Point (\uC120\uD0DD)" }), t.jsx("textarea", { className: "min-h-14 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: I, onChange: (O) => Q(O.target.value) })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uD574\uC124 (\uC120\uD0DD)" }), t.jsx("textarea", { className: "min-h-14 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: D, onChange: (O) => T(O.target.value) })] }), t.jsx(Tr, { paths: R, onRemove: (O) => U((q) => q.filter((ce) => ce !== O)), onOpenPicker: () => c(R, (O) => U(O)), label: "\uBB38\uD56D \uADFC\uAC70 \uBB38\uC11C (\uC120\uD0DD)" }), B ? t.jsx("p", { className: "text-xs font-medium text-rose-600", children: B }) : null, t.jsxs("div", { className: "flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-odp-borderSoft", children: [t.jsx(F, { type: "button", variant: "secondary", onClick: n, disabled: le, children: "\uCDE8\uC18C" }), t.jsxs(F, { type: "button", variant: "primary", onClick: ke, disabled: le, children: [u ? t.jsx(hn, { size: 14 }) : t.jsx(ei, { size: 14 }), u ? "\uC800\uC7A5" : "\uCD94\uAC00"] })] })] }) });
}
function Za(e, n) {
  const s = [...e];
  let r = Number.parseInt(ts(e), 10) || 1;
  for (const o of n) {
    const a = String(r);
    s.push({ ...o, id: o.isGenerated ? o.id : a, displayLabel: a }), r += 1;
  }
  return s;
}
function Ya(e, n, s) {
  return s.mode === "replace" ? { config: s.mergeConfig !== false ? rs({ ...e.config, ...n.config, sourcePaths: n.config.sourcePaths.length > 0 ? n.config.sourcePaths : e.config.sourcePaths }) : e.config, questions: n.questions.map((o) => ({ ...o })) } : { config: e.config, questions: Za(e.questions, n.questions) };
}
const el = `### 1. \uB9F5\uB9AC\uB4C0\uC2A4\uC5D0 \uB300\uD55C \uC124\uBA85\uC73C\uB85C \uAC00\uC7A5 \uC801\uC808\uD55C \uAC83\uC740?

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
function tl({ isOpen: e, onClose: n, current: s, onApply: r }) {
  const [o, a] = i.useState(""), [c, d] = i.useState("append"), [u, f] = i.useState(""), [m, p] = i.useState(false), k = (y = false) => {
    const v = it(o);
    if (!v.questions.length) {
      f("\uD30C\uC2F1\uB41C \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uB9C8\uD06C\uB2E4\uC6B4 \uD615\uC2DD\uC744 \uD655\uC778\uD558\uC138\uC694.");
      return;
    }
    if (c === "replace" && !y) {
      p(true);
      return;
    }
    const z = Ya(s, v, { mode: c, mergeConfig: c === "replace" });
    r(z, c), n();
  }, h = (y) => {
    if (!y) return;
    const v = new FileReader();
    v.onload = () => {
      a(String(v.result || "")), f("");
    }, v.readAsText(y, "UTF-8");
  };
  return t.jsxs(t.Fragment, { children: [t.jsx(os, { isOpen: e, onClose: n, contentClassName: "quiz-pane max-w-3xl max-h-[90vh]", children: t.jsxs("div", { className: "flex max-h-[min(80vh,720px)] flex-col gap-3 p-4 text-sm", children: [t.jsx("h2", { className: "text-base font-bold text-gray-900 dark:text-odp-fgStrong", children: "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30" }), t.jsx("p", { className: "text-xs text-gray-600 dark:text-odp-muted", children: "`.quiz.md` \uBCF8\uBB38\uC744 \uBD99\uC5EC\uB123\uAC70\uB098 \uD30C\uC77C\uC744 \uBD88\uB7EC\uC624\uC138\uC694. \uC5EC\uB7EC \uBB38\uD56D\uC744 \uD55C \uBC88\uC5D0 \uB4F1\uB85D\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), t.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs", children: [t.jsxs(F, { type: "button", variant: "secondary", onClick: () => {
    var _a2;
    return (_a2 = document.getElementById("quiz-bulk-file")) == null ? void 0 : _a2.click();
  }, children: [t.jsx(ti, { size: 14 }), "\uD30C\uC77C \uBD88\uB7EC\uC624\uAE30"] }), t.jsx("input", { id: "quiz-bulk-file", type: "file", accept: ".md,.quiz.md,.txt,.markdown", className: "hidden", onChange: (y) => {
    var _a2;
    return h(((_a2 = y.target.files) == null ? void 0 : _a2[0]) || null);
  } }), t.jsx(F, { type: "button", variant: "tertiary", onClick: () => {
    a(el), f("");
  }, children: "\uC0D8\uD50C \uBD88\uB7EC\uC624\uAE30" }), t.jsxs("div", { className: "ml-auto flex gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-odp-bgSoft", children: [t.jsx("button", { type: "button", className: `rounded-md px-2 py-1 font-semibold ${c === "append" ? "bg-white shadow-sm dark:bg-odp-surface" : "text-gray-600 dark:text-odp-muted"}`, onClick: () => d("append"), children: "\uCD94\uAC00" }), t.jsx("button", { type: "button", className: `rounded-md px-2 py-1 font-semibold ${c === "replace" ? "bg-white shadow-sm dark:bg-odp-surface" : "text-gray-600 dark:text-odp-muted"}`, onClick: () => d("replace"), children: "\uAD50\uCCB4" })] })] }), t.jsx("textarea", { className: "min-h-64 w-full rounded-xl border border-gray-300 bg-slate-50 p-3 font-mono text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: o, onChange: (y) => {
    a(y.target.value), f("");
  }, placeholder: "\uB9C8\uD06C\uB2E4\uC6B4 \uBB38\uC81C \uBAA9\uB85D\uC744 \uBD99\uC5EC\uB123\uC73C\uC138\uC694\u2026" }), u ? t.jsx("p", { className: "text-xs font-medium text-rose-600", children: u }) : null, t.jsxs("div", { className: "flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-odp-borderSoft", children: [t.jsx(F, { type: "button", variant: "secondary", onClick: n, children: "\uCDE8\uC18C" }), t.jsxs(F, { type: "button", variant: "primary", onClick: () => k(false), children: [t.jsx(hn, { size: 14 }), "\uC801\uC6A9"] })] })] }) }), t.jsx(Hn, { isOpen: m, variant: "danger", title: "\uBB38\uD56D \uC804\uCCB4 \uAD50\uCCB4", message: "\uAE30\uC874 \uBB38\uD56D\uC744 \uBAA8\uB450 \uC9C0\uC6B0\uACE0 \uBD99\uC5EC\uB123\uC740 \uB0B4\uC6A9\uC73C\uB85C \uAD50\uCCB4\uD560\uAE4C\uC694? \uD480\uC774 \uC9C4\uD589 \uAE30\uB85D\uB3C4 \uCD08\uAE30\uD654\uB429\uB2C8\uB2E4.", confirmLabel: "\uAD50\uCCB4", cancelLabel: "\uCDE8\uC18C", onConfirm: () => {
    p(false), k(true);
  }, onCancel: () => p(false) })] });
}
function sr(e, n) {
  const s = [], r = (o) => {
    for (const a of o) if (a.type === "folder" && a.children) r(a.children);
    else if (a.type === "file") {
      if (!(a.path || a.name || "").toLowerCase().endsWith(".md") || n && a.path === n || si(a.path) && n && a.path === n) continue;
      s.push(a);
    }
  };
  return r(e || []), s;
}
function nl({ isOpen: e, onClose: n, tree: s, selected: r, excludePath: o, onConfirm: a, onExpandFolder: c, onDropHostChange: d, onRegisterDropPathsMerge: u }) {
  const [f, m] = i.useState(r), [p, k] = i.useState(""), h = i.useMemo(() => Array.isArray(s) ? s : [], [s]);
  i.useEffect(() => {
    e && m(r);
  }, [e, r]);
  const y = i.useCallback((C) => {
    C.length && m((N) => {
      const g = new Set(N);
      for (const $ of C) g.add($);
      return [...g].sort(($, w) => $.localeCompare(w));
    });
  }, []);
  i.useEffect(() => (u == null ? void 0 : u(y), () => u == null ? void 0 : u(null)), [y, u]), i.useEffect(() => () => d == null ? void 0 : d(null), [d]);
  const v = i.useMemo(() => {
    var _a2;
    if (!p) return h;
    const C = (N) => {
      for (const g of N) {
        if (g.path === p) return g;
        if (g.children) {
          const $ = C(g.children);
          if ($) return $;
        }
      }
      return null;
    };
    return ((_a2 = C(h)) == null ? void 0 : _a2.children) || [];
  }, [h, p]), z = (C) => {
    m((N) => N.includes(C) ? N.filter((g) => g !== C) : [...N, C]);
  };
  return t.jsx(os, { isOpen: e, onClose: n, contentClassName: "quiz-pane max-w-lg max-h-[90vh]", children: t.jsxs("div", { className: "flex max-h-[min(75vh,640px)] flex-col gap-3 p-4 text-sm", children: [t.jsx("h2", { className: "text-base font-bold text-gray-900 dark:text-odp-fgStrong", children: "\uADFC\uAC70 \uBB38\uC11C \uC120\uD0DD" }), t.jsx("p", { className: "text-xs text-gray-600 dark:text-odp-muted", children: "vault\uC758 `.md` \uD30C\uC77C\uC744 \uB2E4\uC911 \uC120\uD0DD\uD558\uAC70\uB098, \uC0AC\uC774\uB4DC\uBC14\uC5D0\uC11C \uB04C\uC5B4\uB2E4 \uB193\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (\uD604\uC7AC quiz \uD30C\uC77C\uC740 \uC81C\uC678)" }), p ? t.jsx("button", { type: "button", className: "text-left text-xs text-blue-600 hover:underline", onClick: () => {
    const C = p.replace(/\/$/, "").split("/").filter(Boolean);
    C.pop(), k(C.length ? `${C.join("/")}/` : "");
  }, children: "\u2190 \uC0C1\uC704 \uD3F4\uB354" }) : null, t.jsx("div", { ref: d, className: "relative min-h-48 flex-1", children: t.jsxs("ul", { className: "h-full min-h-48 space-y-1 overflow-y-auto rounded-lg border border-gray-200 p-2 dark:border-odp-borderSoft", children: [v.map((C) => {
    if (C.type === "folder") return t.jsx("li", { children: t.jsxs("button", { type: "button", className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg", onClick: async () => {
      await (c == null ? void 0 : c(C)), k(C.path.endsWith("/") ? C.path : `${C.path}/`);
    }, children: [t.jsx(ni, { size: 14 }), C.name] }) }, C.path);
    if (!(C.path || "").toLowerCase().endsWith(".md") || o && C.path === o) return null;
    const g = f.includes(C.path);
    return t.jsx("li", { children: t.jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg", children: [t.jsx("input", { type: "checkbox", checked: g, onChange: () => z(C.path) }), t.jsx("span", { className: "truncate", children: C.name })] }) }, C.path);
  }), v.length === 0 ? t.jsx("li", { className: "px-2 py-6 text-center text-xs text-gray-400", children: "\uD56D\uBAA9 \uC5C6\uC74C" }) : null] }) }), t.jsxs("p", { className: "text-[11px] text-gray-500 dark:text-odp-muted", children: [f.length, "\uAC1C \uC120\uD0DD\uB428", sr(h, o).length ? ` / vault md ${sr(h, o).length}\uAC1C` : ""] }), t.jsxs("div", { className: "flex justify-end gap-2", children: [t.jsx(F, { type: "button", variant: "secondary", onClick: n, children: "\uCDE8\uC18C" }), t.jsxs(F, { type: "button", variant: "primary", onClick: () => {
    a(f), n();
  }, children: [t.jsx(hn, { size: 14 }), "\uC801\uC6A9"] })] })] }) });
}
function sl(e) {
  switch (e) {
    case "running":
      return t.jsx(gn, { size: 13, className: "animate-spin text-violet-600 dark:text-violet-300" });
    case "done":
      return t.jsx(Er, { size: 13, className: "text-emerald-600 dark:text-emerald-400" });
    case "error":
      return t.jsx(Ue, { size: 13, className: "text-rose-600 dark:text-rose-400" });
    case "skipped":
      return t.jsx(qi, { size: 13, className: "text-slate-400 dark:text-odp-muted" });
    default:
      return t.jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600", "aria-hidden": true });
  }
}
function Yt({ title: e, body: n }) {
  return n.trim() ? t.jsxs("div", { className: "space-y-1", children: [t.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-odp-muted", children: e }), t.jsx("pre", { className: "max-h-40 overflow-auto rounded border border-slate-200 bg-slate-50 p-2 font-mono text-[10px] leading-snug text-slate-800 dark:border-odp-borderSoft dark:bg-odp-bg dark:text-odp-fg", children: n })] }) : null;
}
function rl({ step: e }) {
  var _a2, _b, _c2, _d2;
  return !!((_a2 = e.systemPrompt) == null ? void 0 : _a2.trim()) || !!((_b = e.llmInstruction) == null ? void 0 : _b.trim()) || !!((_c2 = e.llmResponse) == null ? void 0 : _c2.trim()) || !!((_d2 = e.error) == null ? void 0 : _d2.trim()) ? t.jsxs("div", { className: "space-y-2", children: [t.jsx(Yt, { title: "System prompt", body: e.systemPrompt || "" }), t.jsx(Yt, { title: "Instruction / input", body: e.llmInstruction || "" }), t.jsx(Yt, { title: "Model response / artifact", body: e.llmResponse || "" }), e.error ? t.jsx(Yt, { title: "Error", body: e.error }) : null] }) : t.jsx("p", { className: "text-[10px] text-slate-400 dark:text-odp-muted", children: "\uC800\uC7A5\uB41C \uD504\uB86C\uD504\uD2B8/\uC751\uB2F5 \uC5C6\uC74C" });
}
function ol({ step: e, showDetail: n }) {
  const s = e.error || e.detail;
  return t.jsxs("li", { className: "space-y-1.5 py-0.5", children: [t.jsxs("div", { className: "flex items-start gap-2", children: [t.jsx("span", { className: "mt-0.5 shrink-0", children: sl(e.status) }), t.jsxs("div", { className: "min-w-0 flex-1", children: [t.jsxs("p", { className: `text-[11px] font-medium leading-snug ${e.status === "error" ? "text-rose-700 dark:text-rose-300" : e.status === "skipped" ? "text-slate-400 dark:text-odp-muted" : "text-slate-700 dark:text-odp-fg"}`, children: [e.label, e.status === "running" ? t.jsx("span", { className: "ml-1 font-normal text-violet-600 dark:text-violet-300", children: "\uC9C4\uD589 \uC911" }) : null] }), s ? t.jsx("p", { className: `mt-0.5 truncate text-[10px] leading-snug ${e.status === "error" ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-odp-muted"}`, title: s, children: s }) : null] })] }), n ? t.jsx("div", { className: "ml-5 rounded-md border border-slate-100 bg-slate-50/80 p-2 dark:border-odp-borderSoft dark:bg-odp-bg/60", children: t.jsx(rl, { step: e }) }) : null] });
}
function il({ job: e, detailOpen: n, onToggleDetail: s, onRemove: r }) {
  const o = e.kind === "similar" ? "\uC720\uC0AC\uBB38\uC81C" : e.kind === "derived" ? "\uD30C\uC0DD\uBB38\uC81C" : "\uADFC\uAC70 \uCD9C\uC81C", a = e.kind === "similar" ? t.jsx(It, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-300" }) : e.kind === "derived" ? t.jsx(ls, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-300" }) : t.jsx(_e, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-300" });
  return t.jsxs("article", { className: `rounded-lg border px-2.5 py-2 ${e.status === "error" ? "border-rose-200 bg-rose-50/80 dark:border-rose-900/50 dark:bg-rose-950/30" : e.status === "done" ? "border-emerald-200/80 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20" : "border-slate-200 bg-white/90 dark:border-odp-borderSoft dark:bg-odp-bgSoft/90"}`, children: [t.jsxs("div", { className: "mb-1.5 flex items-start gap-2", children: [a, t.jsxs("div", { className: "min-w-0 flex-1", children: [t.jsxs("p", { className: "text-xs font-bold text-slate-900 dark:text-odp-fgStrong", children: [o, e.questionLabel ? t.jsxs("span", { className: "font-semibold text-violet-700 dark:text-violet-300", children: [" ", "\xB7 ", e.questionLabel] }) : null, e.status === "running" ? t.jsx("span", { className: "ml-1 text-[10px] font-medium text-violet-600 dark:text-violet-300", children: "\uC9C4\uD589 \uC911" }) : null, e.status === "done" && e.resultLabel ? t.jsxs("span", { className: "ml-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-300", children: ["\u2192 ", e.resultLabel] }) : null] }), t.jsx("p", { className: "truncate text-[11px] text-slate-600 dark:text-odp-muted", title: e.questionPreview, children: e.questionPreview }), e.status === "error" && e.error ? t.jsx("p", { className: "mt-1 text-[10px] leading-snug text-rose-700 dark:text-rose-300", children: e.error }) : null, e.logPath ? t.jsxs("p", { className: "mt-1 truncate font-mono text-[10px] text-slate-500 dark:text-odp-muted", title: e.logPath, children: ["log: ", e.logPath] }) : null] }), t.jsxs("div", { className: "flex shrink-0 flex-col gap-0.5", children: [t.jsx("button", { type: "button", onClick: s, className: "rounded p-1 text-slate-500 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-expanded": n, "aria-label": n ? "\uC790\uC138\uD788 \uBCF4\uAE30 \uC811\uAE30" : "\uC790\uC138\uD788 \uBCF4\uAE30", children: n ? t.jsx(Hs, { size: 14 }) : t.jsx(es, { size: 14 }) }), e.status !== "running" ? t.jsx("button", { type: "button", onClick: r, className: "rounded p-1 text-slate-500 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": "\uBAA9\uB85D\uC5D0\uC11C \uC81C\uAC70", children: t.jsx(Ue, { size: 14 }) }) : null] })] }), t.jsx("div", { className: "mb-1.5 flex justify-end", children: t.jsxs(F, { type: "button", variant: "tertiary", size: "sm", onClick: s, children: [n ? t.jsx(Hs, { size: 14 }) : t.jsx(es, { size: 14 }), n ? "\uC811\uAE30" : "\uC790\uC138\uD788 \uBCF4\uAE30"] }) }), t.jsx("ul", { className: "space-y-0.5 border-t border-slate-100 pt-1.5 dark:border-odp-borderSoft", children: e.steps.map((c) => t.jsx(ol, { step: c, showDetail: n }, c.id)) })] });
}
function al({ jobs: e, isOpen: n, size: s, onClose: r, onResize: o, onRemoveJob: a, onClearFinished: c, onUserEngage: d, onPointerEngageChange: u, onFocusEngageChange: f }) {
  const m = i.useRef(null), [p, k] = i.useState({}), h = i.useRef({ mode: null, startX: 0, startY: 0, startW: 0, startH: 0 }), y = (w) => {
    k((S) => {
      const I = { ...S };
      return I[w] ? delete I[w] : I[w] = true, I;
    });
  }, v = i.useCallback((w, S) => {
    S.preventDefault(), S.stopPropagation(), h.current = { mode: w, startX: S.clientX, startY: S.clientY, startW: s.width, startH: s.height };
    const I = (D) => {
      const T = h.current;
      if (!T.mode) return;
      const R = T.startX - D.clientX, U = T.startY - D.clientY;
      let B = T.startW, V = T.startH;
      (T.mode === "width" || T.mode === "both") && (B = T.startW + R), (T.mode === "height" || T.mode === "both") && (V = T.startH + U), o({ width: B, height: V });
    }, Q = () => {
      h.current.mode = null, document.removeEventListener("pointermove", I), document.removeEventListener("pointerup", Q);
    };
    document.addEventListener("pointermove", I), document.addEventListener("pointerup", Q);
  }, [o, s.height, s.width]), z = e.filter((w) => w.status === "running").length, C = e.filter((w) => w.status === "done").length, N = e.filter((w) => w.status === "error").length, g = e.some((w) => w.status !== "running"), $ = va();
  return t.jsx(dn, { children: n ? t.jsxs(He.div, { ref: m, role: "dialog", "aria-modal": "false", "aria-label": "\uBB38\uC81C \uC0DD\uC131 \uB300\uAE30\uC5F4", className: "fixed bottom-4 right-4 z-10050 flex flex-col overflow-hidden rounded-xl border border-violet-300/60 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-800/50 dark:bg-odp-bgSoft/95", style: { width: s.width, height: s.height }, initial: $.initial, animate: $.animate, exit: $.exit, transition: $.transition, onMouseEnter: () => u == null ? void 0 : u(true), onMouseLeave: () => u == null ? void 0 : u(false), onFocusCapture: () => f == null ? void 0 : f(true), onBlurCapture: (w) => {
    w.currentTarget.contains(w.relatedTarget) || (f == null ? void 0 : f(false));
  }, onPointerDown: () => d == null ? void 0 : d(), children: [t.jsx("div", { className: "absolute left-0 top-0 z-20 h-3 w-3 cursor-nwse-resize touch-none", "aria-hidden": true, onPointerDown: (w) => v("both", w) }), t.jsx("div", { className: "absolute left-0 right-0 top-0 z-10 h-2 cursor-ns-resize touch-none", "aria-hidden": true, onPointerDown: (w) => v("height", w) }), t.jsx("div", { className: "absolute bottom-0 left-0 top-0 z-10 w-2 cursor-ew-resize touch-none", "aria-hidden": true, onPointerDown: (w) => v("width", w) }), t.jsxs("div", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-violet-200/70 bg-violet-50/90 px-3 py-2 dark:border-violet-900/40 dark:bg-violet-950/40", children: [t.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-950 dark:text-violet-100", children: [t.jsx(Fi, { size: 16, className: "shrink-0 opacity-50", "aria-hidden": true }), t.jsx(_e, { size: 16, className: "shrink-0", "aria-hidden": true }), t.jsx("span", { className: "truncate", children: "\uBB38\uC81C \uC0DD\uC131 \uB300\uAE30\uC5F4" })] }), t.jsx("button", { type: "button", onClick: r, className: "rounded p-1 text-violet-900 hover:bg-violet-100 dark:text-violet-100 dark:hover:bg-violet-900/50", "aria-label": "\uD328\uB110 \uB2EB\uAE30", children: t.jsx(Ue, { size: 15 }) })] }), t.jsx("div", { className: "shrink-0 border-b border-slate-200/80 px-3 py-1.5 text-[11px] text-slate-600 dark:border-odp-borderSoft dark:text-odp-muted", children: e.length === 0 ? "\uC9C4\uD589 \uC911\uC778 \uC0DD\uC131 \uC791\uC5C5\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" : `\uC9C4\uD589 ${z} \xB7 \uC644\uB8CC ${C}${N > 0 ? ` \xB7 \uC2E4\uD328 ${N}` : ""}` }), t.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-3", children: e.length === 0 ? t.jsxs("p", { className: "py-6 text-center text-xs text-slate-500 dark:text-odp-muted", children: ["\uC720\uC0AC\uBB38\uC81C \uB610\uB294 \uADFC\uAC70 \uCD9C\uC81C\xB7\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131\uC744 \uC2E4\uD589\uD558\uBA74", t.jsx("br", {}), "\uB2E8\uACC4\uBCC4 \uC9C4\uD589 \uC0C1\uD669\uC774 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4."] }) : t.jsx("ul", { className: "space-y-2", children: e.map((w) => t.jsx("li", { children: t.jsx(il, { job: w, detailOpen: !!p[w.id], onToggleDetail: () => y(w.id), onRemove: () => a(w.id) }) }, w.id)) }) }), t.jsxs("div", { className: "flex shrink-0 justify-end gap-2 border-t border-slate-200/80 px-3 py-2 dark:border-odp-borderSoft", children: [g ? t.jsxs(F, { type: "button", variant: "tertiary", size: "sm", onClick: c, children: [t.jsx(Ue, { size: 14 }), "\uC644\uB8CC \uD56D\uBAA9 \uBE44\uC6B0\uAE30"] }) : null, t.jsxs(F, { type: "button", variant: "secondary", size: "sm", onClick: r, children: [t.jsx(hn, { size: 14 }), "\uB2EB\uAE30"] })] })] }, "quiz-gen-queue-panel") : null });
}
const en = "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function ll({ stopwatch: e, onRequestStart: n }) {
  const { displayMs: s, running: r, started: o, start: a, pause: c, resume: d, stop: u } = e, f = n ?? a;
  return o ? t.jsx(Rt, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs("div", { className: "flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: [t.jsx(Ks, { size: 14, className: `shrink-0 ${r ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500"}`, "aria-hidden": true }), t.jsx("span", { className: `min-w-[3.25rem] font-mono text-sm font-bold tabular-nums ${r ? "text-emerald-700 dark:text-emerald-300" : "text-slate-700 dark:text-odp-fgStrong"}`, "aria-live": "polite", children: Kn(s) }), r ? t.jsxs(Re, { children: [t.jsx(Me, { asChild: true, children: t.jsx(F, { type: "button", variant: "secondary", size: "sm", onClick: c, "aria-label": "\uC77C\uC2DC\uC815\uC9C0", children: t.jsx(Bi, { size: 14 }) }) }), t.jsx(Ae, { children: t.jsxs(Le, { side: "bottom", sideOffset: 6, className: en, children: ["\uC77C\uC2DC\uC815\uC9C0", t.jsx(Oe, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : t.jsxs(Re, { children: [t.jsx(Me, { asChild: true, children: t.jsx(F, { type: "button", variant: "secondary", size: "sm", onClick: d, "aria-label": "\uC7AC\uAC1C", children: t.jsx(Ui, { size: 14 }) }) }), t.jsx(Ae, { children: t.jsxs(Le, { side: "bottom", sideOffset: 6, className: en, children: ["\uC7AC\uAC1C", t.jsx(Oe, { className: "fill-white dark:fill-odp-surface" })] }) })] }), t.jsxs(Re, { children: [t.jsx(Me, { asChild: true, children: t.jsx(F, { type: "button", variant: "tertiary", size: "sm", onClick: u, "aria-label": "\uC815\uC9C0", children: t.jsx(Gi, { size: 14 }) }) }), t.jsx(Ae, { children: t.jsxs(Le, { side: "bottom", sideOffset: 6, className: en, children: ["\uC815\uC9C0", t.jsx(Oe, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }) }) : t.jsx(Rt, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs(Re, { children: [t.jsx(Me, { asChild: true, children: t.jsxs(F, { type: "button", variant: "secondary", size: "sm", onClick: f, children: [t.jsx(Ks, { size: 14 }), t.jsx("span", { className: "hidden md:inline", children: "\uC2DC\uD5D8 \uC2A4\uD1B1\uC6CC\uCE58" })] }) }), t.jsx(Ae, { children: t.jsxs(Le, { side: "bottom", sideOffset: 6, className: en, children: ["\uC2DC\uD5D8 \uC2DC\uAC04 \uCE21\uC815 \uC2DC\uC791", t.jsx(Oe, { className: "fill-white dark:fill-odp-surface" })] }) })] }) });
}
function cl({ log: e }) {
  const n = (e == null ? void 0 : e.events) ?? [], s = (e == null ? void 0 : e.questionEntries) ?? [], r = i.useMemo(() => {
    const o = [...n.map((a) => ({ kind: "event", at: a.at, data: a })), ...s.map((a) => ({ kind: "question", at: a.at, data: a }))];
    return o.sort((a, c) => a.at.localeCompare(c.at)), o;
  }, [n, s]);
  return r.length ? t.jsxs("div", { className: "space-y-2 border-t border-slate-100 pt-3 dark:border-odp-borderSoft", children: [t.jsx("h4", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uD480\uC774 \uC2DC\uAC04 \uAE30\uB85D" }), t.jsx("ol", { className: "max-h-40 space-y-1 overflow-y-auto text-[11px] text-slate-600 dark:text-odp-muted", children: r.map((o, a) => {
    if (o.kind === "event") {
      const d = o.data;
      return t.jsxs("li", { className: "font-mono leading-relaxed", children: [t.jsx("span", { className: "text-slate-500 dark:text-odp-muted", children: Tn(d.at) }), " \xB7 ", t.jsx("span", { className: "font-semibold text-slate-700 dark:text-odp-fgStrong", children: ri[d.type] }), " \xB7 ", t.jsx("span", { className: "tabular-nums text-blue-600 dark:text-blue-400", children: Kn(d.elapsedMs) })] }, `ev-${d.at}-${d.type}-${a}`);
    }
    const c = o.data;
    return t.jsxs("li", { className: "font-mono leading-relaxed", children: [t.jsx("span", { className: "text-slate-500 dark:text-odp-muted", children: Tn(c.at) }), " \xB7 ", t.jsxs("span", { className: "font-semibold text-violet-700 dark:text-violet-300", children: ["\uBB38\uC81C ", c.displayLabel] }), " \xB7 ", t.jsx("span", { className: "tabular-nums text-blue-600 dark:text-blue-400", children: Kn(c.durationMs) }), t.jsxs("span", { className: "text-slate-400 dark:text-odp-muted", children: [" ", "(~", Tn(c.endedAt), ")"] })] }, `q-${c.questionId}-${c.at}-${a}`);
  }) })] }) : null;
}
const dl = "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", ul = "\uC2DC\uD5D8\uC774 \uB05D\uB09C \uB4A4\uC5D0 \uC804\uCCB4 \uCC44\uC810\uC744 \uD574\uC8FC\uC138\uC694";
function rr({ examInProgress: e, disabled: n, children: s, ...r }) {
  const o = !!n || e, a = t.jsx(F, { type: "button", ...r, disabled: o, children: s });
  return e ? t.jsxs(Re, { children: [t.jsx(Me, { asChild: true, children: t.jsx("span", { className: "inline-flex", children: a }) }), t.jsx(Ae, { children: t.jsxs(Le, { side: "top", sideOffset: 6, className: dl, children: [ul, t.jsx(Oe, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : a;
}
const lt = `You analyze exam multiple-choice items for similar-question generation.
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
function Dr(e) {
  return e && typeof e == "object" ? e : {};
}
function fl(e) {
  if (typeof e == "number" && Number.isFinite(e)) return e;
  if (typeof e == "string" && e.trim()) return e.trim();
  const n = Number(e);
  return Number.isFinite(n) ? n : String(e ?? "").trim();
}
function ml(e, n) {
  const s = Dr(e), r = String(s.id || s.name || `var${n + 1}`).trim();
  if (!r) return null;
  const o = String(s.description || s.label || r).trim() || r, a = fl(s.originalValue ?? s.value), c = Number(s.min), d = Number(s.max), u = Number.isFinite(c) ? c : 0, f = Number.isFinite(d) ? d : u, m = Number(s.step), p = Number.isFinite(m) && m > 0 ? m : 1, k = typeof s.unit == "string" && s.unit.trim() ? s.unit.trim() : void 0;
  return { id: r, description: o, originalValue: a, min: u, max: f, step: p, ...k ? { unit: k } : {} };
}
function Fr(e) {
  const n = Dr(e), s = String(n.coreCategory || n.category || n.topic || "").trim() || "general concept", r = !!(n.isCalculation ?? n.isCalc ?? n.calculation), a = (Array.isArray(n.variables) ? n.variables : []).map((c, d) => ml(c, d)).filter((c) => c != null);
  return { coreCategory: s, isCalculation: r, variables: r ? a : [] };
}
function pl(e, n, s, r) {
  const o = Math.min(e, n), a = Math.max(e, n), c = s > 0 ? s : 1, d = Math.floor((a - o) / c);
  if (d < 0 || d === 0) return o;
  let u = o, f = 0;
  do {
    const m = Math.floor(Math.random() * (d + 1));
    u = o + m * c, f += 1;
  } while (f < 24 && typeof r == "number" && Number.isFinite(r) && u === r && d > 0);
  return u;
}
function qr(e) {
  return e.map((n) => {
    if (typeof n.originalValue == "number" && Number.isFinite(n.originalValue)) {
      const s = pl(n.min, n.max, n.step ?? 1, n.originalValue);
      return { id: n.id, description: n.description, value: s, originalValue: n.originalValue, ...n.unit ? { unit: n.unit } : {} };
    }
    return { id: n.id, description: n.description, value: n.originalValue, originalValue: n.originalValue, ...n.unit ? { unit: n.unit } : {} };
  });
}
function ct(e) {
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
function Br(e) {
  if (!e.length) return "";
  const n = ["[\uBB34\uC791\uC704 \uC0D8\uD50C\uB9C1 \uBCC0\uC218 \u2014 \uC2E0\uADDC \uBB38\uD56D\uC5D0 \uBC18\uB4DC\uC2DC \uBC18\uC601]"];
  for (const s of e) {
    const r = s.unit ? ` ${s.unit}` : "";
    n.push(`- ${s.id} (${s.description}): ${String(s.value)}${r} (\uC6D0\uBCF8: ${String(s.originalValue)}${r})`);
  }
  return n.join(`
`);
}
const xl = ["\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694.", "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694."], hl = ["\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."], gl = 12, bl = 24;
function ut(e) {
  const n = String(e || "").trim();
  return !n || n.length < gl ? true : xl.some((s) => n === s);
}
function ft(e) {
  const n = String(e || "").trim();
  return !n || n.length < bl ? true : hl.some((s) => n === s);
}
function pn(e) {
  return !ut(String(e.point || "")) && !ft(String(e.explanation || ""));
}
function Ur(e) {
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
function Gr(e) {
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
function kl(e) {
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
function Wr(e) {
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
function wl(e) {
  var _a2;
  const n = e.question, s = [];
  e.missingPoint && s.push("point(\uC811\uADFC Point)"), e.missingExplanation && s.push("explanation(\uD574\uC124)");
  let r = "";
  if (n.kind === "choice") {
    const d = n.options || [];
    r = `\uC9C8\uBB38: ${n.question}
\uBCF4\uAE30: ${d.map((u, f) => `${f + 1}. ${u}`).join(" | ")}
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
function yl({ question: e, busyKey: n, showContent: s = true, onGenerate: r }) {
  const o = ut(e.point || ""), a = ft(e.explanation || ""), c = o || a;
  if (!s && !c) return null;
  const d = `sections-${e.id}`, u = n === d, f = c ? t.jsxs("div", { className: "flex justify-end gap-2", children: [o && a ? t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: u, onClick: () => r("both"), children: [t.jsx(_e, { size: 14 }), u ? "\uC0DD\uC131 \uC911\u2026" : "\uC811\uADFC Point\xB7\uD574\uC124 \uC0DD\uC131"] }) : null, o && !a ? t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: u, onClick: () => r("point"), children: [t.jsx(_e, { size: 14 }), u ? "\uC0DD\uC131 \uC911\u2026" : "\uC811\uADFC Point \uC0DD\uC131"] }) : null, a && !o ? t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: u, onClick: () => r("explanation"), children: [t.jsx(_e, { size: 14 }), u ? "\uC0DD\uC131 \uC911\u2026" : "\uD574\uC124 \uC0DD\uC131"] }) : null] }) : null;
  return s ? t.jsxs("div", { className: "mt-2 flex flex-col space-y-2 rounded-xl bg-slate-50 p-3 text-xs dark:bg-odp-bgSoft", children: [t.jsx("div", { className: "font-bold text-slate-800 dark:text-odp-fgStrong", children: "\uC811\uADFC Point \xB7 \uD574\uC124" }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 font-bold text-amber-800", children: "\uC811\uADFC Point!" }), o ? t.jsx("p", { className: "text-[11px] italic text-slate-500 dark:text-odp-muted", children: "\uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }) : t.jsx(Fe, { text: e.point, previewId: `qp-${e.id}` })] }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 font-bold text-slate-800 dark:text-odp-fgStrong", children: "\uD574\uC124" }), a ? t.jsx("p", { className: "text-[11px] italic text-slate-500 dark:text-odp-muted", children: "\uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }) : t.jsx(Fe, { text: e.explanation, previewId: `qe-${e.id}` })] }), e.kind === "subjective" && e.modelAnswer ? t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 font-bold", children: "\uBAA8\uBC94 \uB2F5\uC548" }), t.jsx(Fe, { text: e.modelAnswer, previewId: `qm-${e.id}` })] }) : null, f] }) : t.jsxs("div", { className: "mt-3 flex flex-col rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950 dark:border-amber-800/70 dark:bg-amber-950/45 dark:text-amber-100", children: [t.jsx("div", { className: "mb-2 font-bold text-amber-800 dark:text-amber-200", children: "\uC811\uADFC Point \xB7 \uD574\uC124" }), t.jsx("p", { className: "mb-3 text-[11px] text-amber-700/90 dark:text-amber-200/80", children: o && a ? "\uC811\uADFC Point\uC640 \uD574\uC124\uC774 \uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." : o ? "\uC811\uADFC Point\uAC00 \uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." : "\uD574\uC124\uC774 \uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }), f] });
}
const vl = "relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-400 data-[state=checked]:border-rose-500 data-[state=checked]:bg-rose-500 data-[state=checked]:text-white border-rose-200 bg-white text-rose-800 hover:bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-100 dark:hover:bg-rose-950/50 dark:data-[state=checked]:border-rose-500 dark:data-[state=checked]:bg-rose-600", Sl = "relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100 dark:hover:bg-emerald-950/50 dark:data-[state=checked]:border-emerald-500 dark:data-[state=checked]:bg-emerald-600";
function jl({ question: e, focusOption: n, onFocusOptionChange: s, wrongExps: r, busyKey: o, onOpenAnalysisDock: a }) {
  var _a2;
  const c = ((_a2 = e.options) == null ? void 0 : _a2.length) || 0;
  if (c <= 0) return null;
  const d = Ye(e.id, n), u = r[d], f = u !== void 0, m = o === d, p = n === e.answer, k = p ? "\uC815\uB2F5 \uBD84\uC11D" : "\uC624\uB2F5 \uBD84\uC11D", h = p ? "mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/45 dark:text-emerald-100" : "mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100", y = p ? "font-bold text-emerald-800 dark:text-emerald-200" : "font-bold text-rose-800 dark:text-rose-200", v = p ? "text-[11px] font-semibold text-emerald-700 dark:text-emerald-200" : "text-[11px] font-semibold text-rose-700 dark:text-rose-200", z = p ? "text-[11px] text-emerald-700/90 dark:text-emerald-200/80" : "text-[11px] text-rose-700/90 dark:text-rose-200/80", C = p ? "text-[10px] font-medium text-emerald-500 dark:text-emerald-300" : "text-[10px] font-medium text-rose-500 dark:text-rose-300", N = p ? "bg-emerald-500 dark:bg-emerald-300" : "bg-rose-500 dark:bg-rose-300", g = p ? "ring-emerald-50 dark:ring-emerald-950" : "ring-rose-50 dark:ring-rose-950";
  return t.jsxs("div", { className: h, children: [t.jsxs("div", { className: "mb-2 flex flex-wrap items-center justify-between gap-2", children: [t.jsx("div", { className: y, children: k }), t.jsx(sa, { className: "flex flex-wrap items-center gap-1", value: String(n), onValueChange: ($) => {
    const w = Number.parseInt($, 10);
    Number.isFinite(w) && w >= 1 && s(w);
  }, "aria-label": `${e.displayLabel}\uBC88 \uBCF4\uAE30 \uC120\uD0DD`, children: Array.from({ length: c }, ($, w) => {
    const S = w + 1, I = Ye(e.id, S), Q = r[I] !== void 0 && String(r[I] || "").trim(), D = S === e.answer, T = D ? Sl : vl;
    return t.jsxs(ra, { value: String(S), className: `${T} ${Q ? "pr-2 pl-2" : ""}`, "aria-label": `${S}\uBC88${D ? " (\uC815\uB2F5)" : ""}${Q ? ", \uBD84\uC11D \uC800\uC7A5\uB428" : ""}`, children: [t.jsx("span", { children: S }), Q ? t.jsx("span", { className: `absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ${g}`, "aria-hidden": true }) : null] }, S);
  }) })] }), f ? t.jsxs("div", { children: [t.jsxs("div", { className: "mb-1.5 flex flex-wrap items-center gap-2", children: [t.jsxs("span", { className: v, children: [n, "\uBC88", p ? " \xB7 \uC815\uB2F5 \uBCF4\uAE30" : " \xB7 \uC624\uB2F5 \uBCF4\uAE30"] }), m ? t.jsxs("span", { className: `inline-flex items-center gap-1 ${C}`, children: [t.jsx("span", { className: `h-1.5 w-1.5 animate-pulse rounded-full ${N}` }), "\uC0DD\uC131 \uC911"] }) : null] }), t.jsx("div", { className: "[&_.md-editor-preview]:text-inherit [&_.md-editor-preview]:!bg-transparent [&_.md-editor]:!bg-transparent", children: u ? t.jsx(Fe, { text: u, previewId: `wx-${e.id}-${n}` }) : t.jsx("p", { className: `${z} opacity-80`, children: "\uBD84\uC11D\uC744 \uC0DD\uC131\uD558\uB294 \uC911\u2026" }) }), t.jsxs("div", { className: "mt-2 flex flex-wrap gap-1.5", children: [t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: m, onClick: () => a(n, "followup"), children: [t.jsx(Wi, { size: 14 }), "\uCD94\uAC00\uC9C8\uBB38"] }), t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: m, onClick: () => a(n, "regenerate"), children: [t.jsx(Ji, { size: 14 }), "\uC7AC\uC0DD\uC131"] })] })] }) : t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [t.jsxs("p", { className: z, children: [n, "\uBC88 \uBCF4\uAE30 \uBD84\uC11D\uC744 \uC0DD\uC131\uD569\uB2C8\uB2E4."] }), t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: m, onClick: () => a(n, "create"), children: [m ? t.jsx(_e, { size: 14, className: "animate-pulse" }) : t.jsx(It, { size: 14 }), "\uBD84\uC11D \uC0DD\uC131"] })] })] });
}
function Cl({ questionId: e, value: n, onSave: s }) {
  const r = String(n || ""), o = r.trim().length > 0, a = `qmemo-${e}`, [c, d] = i.useState(false), [u, f] = i.useState("");
  i.useEffect(() => {
    c || f(r);
  }, [r, c]);
  const m = () => {
    f(""), d(true);
  }, p = () => {
    f(r), d(true);
  }, k = () => {
    s(u), d(false);
  };
  return t.jsx("div", { className: "mt-3 border-t border-slate-200 pt-3 dark:border-odp-borderSoft", children: c ? t.jsxs("div", { className: "space-y-2 rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60", children: [t.jsxs("label", { className: "block space-y-1.5", children: [t.jsxs("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: ["\uBA54\uBAA8", t.jsx("span", { className: "ml-1 font-normal text-slate-500 dark:text-odp-muted", children: "(Markdown)" })] }), t.jsx("textarea", { className: "quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft", placeholder: "\uBB38\uC81C\uC5D0 \uB300\uD55C \uBA54\uBAA8\uB97C Markdown\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.", value: u, onChange: (h) => f(h.target.value), autoFocus: true })] }), t.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [t.jsx(F, { type: "button", variant: "primary", size: "sm", onClick: k, children: "\uC800\uC7A5\uD558\uAE30" }), t.jsx(F, { type: "button", variant: "secondary", size: "sm", onClick: () => {
    f(r), d(false);
  }, children: "\uCDE8\uC18C" })] })] }) : t.jsxs(t.Fragment, { children: [o ? t.jsx("div", { className: "mb-2 rounded-lg border border-slate-200 bg-white p-2.5 text-sm dark:border-odp-borderSoft dark:bg-odp-bg", children: t.jsx(Fe, { text: r, previewId: a }) }) : null, t.jsxs(F, { type: "button", variant: "secondary", size: "sm", onClick: o ? p : m, children: [t.jsx(bn, { size: 14 }), o ? "\uBA54\uBAA8\uC218\uC815" : "\uBA54\uBAA8\uC791\uC131"] })] }) });
}
const Nl = 400;
function $l(e, n, s) {
  const [r, o] = i.useState(n), a = i.useRef(n), c = i.useRef(null);
  i.useEffect(() => {
    n !== a.current && (a.current = n, o(n));
  }, [n]);
  const d = i.useCallback(() => {
    c.current != null && (clearTimeout(c.current), c.current = null), r !== a.current && (a.current = r, s(e, r));
  }, [r, s, e]), u = i.useCallback((f) => {
    o(f), c.current != null && clearTimeout(c.current), c.current = setTimeout(() => {
      c.current = null, f !== a.current && (a.current = f, s(e, f));
    }, Nl);
  }, [s, e]);
  return i.useEffect(() => () => {
    c.current != null && clearTimeout(c.current);
  }, []), { draft: r, handleChange: u, flush: d };
}
const ns = "data-quiz-q-track", Pl = 0.12;
function El({ scrollRootRef: e, questions: n, running: s, getElapsedMs: r, timeLog: o, onLogChange: a }) {
  const c = i.useRef(o), d = i.useRef(a), u = i.useRef(r), f = i.useRef(n), m = i.useRef(null), p = i.useRef(null), k = i.useRef(/* @__PURE__ */ new Map());
  c.current = o, d.current = a, u.current = r, f.current = n;
  const h = i.useCallback((N) => {
    const g = m.current;
    if (!g) return;
    m.current = null, p.current = null;
    const $ = u.current(), w = Math.max(0, $ - g.elapsedMs);
    if (w < oi) return;
    const S = { questionId: g.questionId, displayLabel: g.displayLabel, at: g.at, endedAt: N ?? (/* @__PURE__ */ new Date()).toISOString(), durationMs: w }, I = ii(c.current, S);
    d.current(I);
  }, []), y = i.useCallback((N, g) => {
    var _a2;
    ((_a2 = m.current) == null ? void 0 : _a2.questionId) !== N && (m.current = { questionId: N, displayLabel: g, at: (/* @__PURE__ */ new Date()).toISOString(), elapsedMs: u.current() }, p.current = N);
  }, []), v = i.useCallback(() => {
    let N = null, g = 0;
    for (const [$, w] of k.current) w > g && (g = w, N = $);
    return g >= Pl ? N : null;
  }, []), z = i.useCallback((N) => {
    if (!s || N === p.current) return;
    if (h(), !N) {
      p.current = null;
      return;
    }
    const g = f.current.find(($) => $.id === N);
    g && y(g.id, g.displayLabel);
  }, [h, s, y]);
  i.useEffect(() => {
    if (!s) {
      h(), k.current.clear();
      return;
    }
    z(v());
  }, [s, h, z, v]);
  const C = n.map((N) => N.id).join("\0");
  i.useEffect(() => {
    const N = e.current;
    if (!N || !s) return;
    const g = new Set(f.current.map((S) => S.id));
    k.current = new Map([...k.current.entries()].filter(([S]) => g.has(S)));
    const $ = new IntersectionObserver((S) => {
      for (const I of S) {
        const Q = I.target.getAttribute(ns);
        Q && k.current.set(Q, I.intersectionRatio);
      }
      z(v());
    }, { root: N, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
    return N.querySelectorAll(`[${ns}]`).forEach((S) => $.observe(S)), () => {
      $.disconnect();
    };
  }, [e, C, s, z, v]);
}
const or = ns;
function zl({ question: e, userAnswer: n, isSubmitted: s, isQuestionGraded: r, subjectiveGrade: o, showExplanation: a, wrongExpsForQuestion: c, wrongExpFocusOption: d, questionMemo: u, busyId: f, examInProgress: m, isFresh: p, onClearFresh: k, onAnswerCommit: h, onSelectOption: y, onEditQuestion: v, onGradeChoice: z, onGradeSubjective: C, onRetry: N, onToggleExplanation: g, onSimilar: $, onDerived: w, onGenerateSections: S, onWrongExpFocusChange: I, onOpenAnalysisDock: Q, onMemoSave: D }) {
  const T = String(n ?? ""), { draft: R, handleChange: U, flush: B } = $l(e.id, T, h), V = n !== void 0 && String(n).trim() !== "", E = s || r, { isWrong: L, isCorrect: J, gradeLabel: _ } = i.useMemo(() => {
    let X = false, ke = false, P = null;
    if (e.kind === "choice" && E && V && (ke = n === e.answer, X = !ke), e.kind === "subjective" && E && (ke = (o == null ? void 0 : o.verdict) === "correct", X = (o == null ? void 0 : o.verdict) === "wrong"), E) if (e.kind === "choice") V ? ke ? P = "\uC815\uB2F5" : P = "\uC624\uB2F5" : P = "\uBBF8\uCC44\uC810";
    else {
      const O = o == null ? void 0 : o.verdict;
      O === "correct" ? P = "\uC815\uB2F5" : O === "partial" ? P = "\uBD80\uBD84\uC815\uB2F5" : O === "wrong" && (P = "\uC624\uB2F5");
    }
    return { isWrong: X, isCorrect: ke, gradeLabel: P };
  }, [V, E, e.answer, e.kind, o == null ? void 0 : o.verdict, n]), le = n, be = ["relative rounded-2xl border bg-white p-5 pr-16 shadow-xs dark:bg-odp-surface", E ? J ? "border-emerald-300" : L ? "border-rose-300" : "border-slate-200 dark:border-odp-borderSoft" : "border-slate-200 dark:border-odp-borderSoft", e.isGenerated ? "border-purple-300 dark:border-purple-700" : "", p ? "ring-2 ring-purple-300/70 dark:ring-purple-500/50" : ""].filter(Boolean).join(" "), oe = t.jsxs(t.Fragment, { children: [t.jsxs(F, { type: "button", variant: "tertiary", size: "sm", className: "absolute top-3 right-3 z-10", onClick: () => v(e), children: [t.jsx(bn, { size: 14 }), "\uC218\uC815"] }), t.jsx("div", { className: "mb-3", children: t.jsxs("h3", { className: "text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: [t.jsxs("span", { className: "mr-1.5 inline-flex items-center gap-1.5 align-middle", children: [t.jsxs("span", { children: [e.displayLabel, "."] }), _ ? t.jsx("span", { className: `rounded-md px-2 py-0.5 text-[10px] font-bold ${_ === "\uC815\uB2F5" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200" : _ === "\uC624\uB2F5" ? "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200" : _ === "\uBD80\uBD84\uC815\uB2F5" ? "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200" : "bg-slate-100 text-slate-700 dark:bg-odp-bgSoft dark:text-odp-muted"}`, children: _ }) : null] }), e.kind === "subjective" ? e.answerStyle === "essay" ? "[\uC8FC\uAD00\uC2DD] " : "[\uB2E8\uB2F5\uD615] " : "", t.jsx("span", { className: "font-medium", children: t.jsx(Fe, { text: e.question, previewId: `qq-${e.id}`, className: "inline" }) })] }) }), e.kind === "choice" ? t.jsx("div", { className: "space-y-2", children: (e.options || []).map((X, ke) => {
    const P = ke + 1, O = le === P, q = E, ce = e.answer === P;
    let Ce = "border-slate-200 bg-white hover:bg-slate-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft";
    return O && !q && (Ce = "border-blue-500 bg-blue-50 ring-1 ring-blue-500 dark:bg-blue-950/30"), q && ce ? Ce = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:bg-emerald-950/30" : q && O && !ce && (Ce = "border-rose-400 bg-rose-50 dark:bg-rose-950/30"), t.jsxs("button", { type: "button", className: `flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm ${Ce}`, onClick: () => y(e.id, P), children: [t.jsx("span", { className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold", children: P }), t.jsx("div", { className: "min-w-0 flex-1", children: t.jsx(Fe, { text: X, previewId: `qo-${e.id}-${P}` }) })] }, P);
  }) }) : t.jsxs("div", { className: "space-y-2", children: [e.answerStyle === "essay" ? t.jsx("textarea", { className: "quiz-body-field min-h-24 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: R, disabled: E, onChange: (X) => U(X.target.value), onBlur: B, placeholder: "\uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694" }) : t.jsx("input", { className: "quiz-body-field w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: R, disabled: E, onChange: (X) => U(X.target.value), onBlur: B, placeholder: "\uB2E8\uB2F5 \uC785\uB825" }), o ? t.jsxs("div", { className: `rounded-xl border p-3 text-xs ${o.verdict === "correct" ? "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/45 dark:text-emerald-100" : o.verdict === "partial" ? "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-800/70 dark:bg-amber-950/45 dark:text-amber-100" : "border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100"}`, children: [t.jsxs("div", { className: "mb-1 font-bold", children: [o.verdict, " \xB7 ", o.score, "\uC810"] }), t.jsx("div", { className: "[&_.md-editor-preview]:text-inherit [&_.md-editor-preview]:!bg-transparent [&_.md-editor]:!bg-transparent", children: t.jsx(Fe, { text: o.feedback || "", previewId: `qg-${e.id}` }) })] }) : null] }), t.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-1.5", children: [E ? t.jsxs(F, { type: "button", variant: "secondary", size: "sm", onClick: () => N(e), children: [t.jsx(Ir, { size: 14 }), "\uB2E4\uC2DC\uD480\uAE30"] }) : e.kind === "choice" ? t.jsxs(rr, { examInProgress: m, size: "sm", disabled: !V, onClick: () => z(e), className: "!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700", children: [t.jsx(zr, { size: 14 }), "\uCC44\uC810"] }) : t.jsxs(rr, { examInProgress: m, size: "sm", disabled: f === e.id || !R.trim(), onClick: () => {
    B(), C(e, R);
  }, className: "!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700", children: [t.jsx(_e, { size: 14 }), "AI \uCC44\uC810"] }), t.jsxs(F, { type: "button", variant: "secondary", size: "sm", onClick: () => g(e.id), children: [t.jsx(Hi, { size: 14 }), a ? "\uD574\uC124 \uC811\uAE30" : "\uD574\uC124 \uBCF4\uAE30"] }), e.kind === "choice" ? t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: f === `sim-${e.id}`, onClick: () => $(e), children: [t.jsx(It, { size: 14 }), "\uC720\uC0AC\uBB38\uC81C"] }) : null, t.jsxs(F, { type: "button", variant: "secondary", size: "sm", disabled: f === `derived-${e.id}`, onClick: () => w(e), children: [t.jsx(ls, { size: 14 }), "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131"] })] }), E ? t.jsx(yl, { question: e, busyKey: f, showContent: a, onGenerate: (X) => S(e, X) }) : null, E && e.kind === "choice" ? t.jsx(jl, { question: e, focusOption: d, onFocusOptionChange: (X) => I(e.id, X), wrongExps: c, busyKey: f, onOpenAnalysisDock: (X, ke) => Q(e.id, X, ke) }) : null, t.jsx(Cl, { questionId: e.id, value: u, onSave: (X) => D(e.id, X) })] });
  return p ? t.jsx(He.div, { id: `q-card-${e.id}`, [or]: e.id, initial: { opacity: 0, y: 36, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 340, damping: 26 }, onAnimationComplete: k, className: be, children: oe }) : t.jsx("div", { id: `q-card-${e.id}`, [or]: e.id, className: be, children: oe });
}
const Il = i.memo(zl), Rl = 12;
function Ml(e, n, s, r, o, a) {
  var _a2;
  const c = s[e.id] !== void 0 && String(s[e.id]).trim() !== "", d = !!(a || r[e.id]);
  if (n === "unanswered" && c) return false;
  if (n !== "wrong") return true;
  let u = false;
  return e.kind === "choice" && d && c && (u = s[e.id] !== e.answer), e.kind === "subjective" && d && (u = ((_a2 = o[e.id]) == null ? void 0 : _a2.verdict) === "wrong"), d && u;
}
function ir(e, n, s) {
  const r = document.getElementById(`q-card-${n}`);
  if (!r) return false;
  if (!e) return r.scrollIntoView({ behavior: s, block: "start" }), true;
  const o = e.getBoundingClientRect(), a = r.getBoundingClientRect(), c = e.scrollTop + (a.top - o.top) - Rl;
  return e.scrollTo({ top: Math.max(0, c), behavior: s }), true;
}
const Al = i.memo(i.forwardRef(function({ questions: n, filter: s, scrollRef: r, userAnswers: o, graded: a, subjGrades: c, isSubmitted: d, expVisible: u, wrongExpsByQuestion: f, questionMemos: m, freshQuestionIds: p, busyId: k, examInProgress: h, resolveWrongExpFocusOption: y, onAnswerCommit: v, onSelectOption: z, onEditQuestion: C, onGradeChoice: N, onGradeSubjective: g, onRetry: $, onToggleExplanation: w, onSimilar: S, onDerived: I, onGenerateSections: Q, onWrongExpFocusChange: D, onOpenAnalysisDock: T, onMemoSave: R, onClearFresh: U }, B) {
  const V = i.useMemo(() => n.filter((L) => Ml(L, s, o, a, c, d)), [s, a, d, n, c, o]), E = i.useCallback((L) => {
    if (!V.some((le) => le.id === L)) return false;
    const _ = r.current;
    return ir(_, L, "smooth") || requestAnimationFrame(() => {
      ir(_, L, "smooth");
    }), true;
  }, [r, V]);
  return i.useImperativeHandle(B, () => ({ scrollToQuestionId: E }), [E]), V.length === 0 ? null : t.jsx("div", { className: "space-y-4", children: V.map((L) => {
    const J = o[L.id], _ = !!(d || a[L.id]);
    return t.jsx(Il, { question: L, userAnswer: o[L.id], isSubmitted: d, isQuestionGraded: _, subjectiveGrade: c[L.id], showExplanation: !!u[L.id], wrongExpsForQuestion: f[L.id] ?? {}, wrongExpFocusOption: y(L, typeof J == "number" ? J : void 0), questionMemo: m[L.id] || "", busyId: k, examInProgress: h, isFresh: !!p[L.id], onClearFresh: () => U(L.id), onAnswerCommit: v, onSelectOption: z, onEditQuestion: C, onGradeChoice: N, onGradeSubjective: g, onRetry: $, onToggleExplanation: w, onSimilar: S, onDerived: I, onGenerateSections: Q, onWrongExpFocusChange: D, onOpenAnalysisDock: T, onMemoSave: R }, L.id);
  }) });
})), Ll = 320, Ol = Lt;
function Ql(e, n) {
  if (n === "followup") return "\uCD94\uAC00 \uC9C8\uBB38";
  const s = e ? "\uC815\uB2F5 \uBD84\uC11D" : "\uC624\uB2F5 \uBD84\uC11D";
  return n === "regenerate" ? `${s} \uC7AC\uC0DD\uC131` : s;
}
function Tl({ open: e, question: n, option: s, mode: r, existingAnalysis: o = "", llmProfiles: a, profileId: c, model: d, onProfileIdChange: u, onModelChange: f, busy: m, onClose: p, onGenerate: k }) {
  const [h, y] = i.useState(""), { width: v, handleProps: z, isResizing: C } = dt({ storageKey: "quiz-choice-analysis-dock-width", defaultWidth: Ll, minWidth: 260, maxWidth: 560, edge: "right" }), N = n != null && s != null && s === n.answer, g = Ql(N, r), $ = N ? "border-emerald-200 dark:border-emerald-900/60" : "border-rose-200 dark:border-rose-900/60", w = N ? "bg-emerald-50 dark:bg-emerald-950/40" : "bg-rose-50 dark:bg-rose-950/40", S = N ? "text-emerald-900 dark:text-emerald-100" : "text-rose-900 dark:text-rose-100", I = r === "followup", Q = I, D = !m && (!Q || h.trim().length > 0);
  i.useEffect(() => {
    e && y("");
  }, [e, n == null ? void 0 : n.id, s, r]);
  const T = i.useCallback((U) => {
    m || Q && !h.trim() || U.key !== "Enter" || !U.metaKey && !U.ctrlKey || (U.preventDefault(), k(h));
  }, [m, k, h, Q]), R = e && n != null && s != null;
  return t.jsx(Ot, { motionKey: "quiz-choice-analysis-dock", open: R, width: v, isResizing: C, "aria-label": g, className: `flex h-full shrink-0 flex-col overflow-hidden border-l bg-white shadow-lg dark:bg-odp-surface ${$}`, children: n != null && s != null ? t.jsxs("div", { className: "relative h-full min-h-0", style: { width: v }, children: [t.jsx(Ol, { edge: "left", handleProps: z, isResizing: C, visibleOnHover: true, label: "\uBD84\uC11D \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [t.jsxs("div", { className: `flex items-center justify-between border-b px-3 py-2.5 ${$}`, children: [t.jsx("div", { className: "min-w-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: g }), t.jsx("button", { type: "button", "aria-label": "\uBD84\uC11D \uD328\uB110 \uB2EB\uAE30", className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg", onClick: p, disabled: m, children: t.jsx(Ue, { size: 16 }) })] }), t.jsxs("div", { className: "min-h-0 flex-1 space-y-3 overflow-y-auto p-3", children: [t.jsxs("div", { className: `rounded-lg px-2.5 py-2 text-[11px] ${w} ${S}`, children: [t.jsxs("div", { className: "font-semibold", children: [n.displayLabel, "\uBC88 \xB7 ", s, "\uBC88 \uBCF4\uAE30", N ? " (\uC815\uB2F5)" : ""] }), t.jsx("p", { className: "mt-1 line-clamp-3 opacity-90", children: n.question })] }), I && o.trim() ? t.jsxs("div", { className: "rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-[10px] text-slate-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-muted", children: [t.jsx("div", { className: "mb-1 font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uAE30\uC874 \uBD84\uC11D" }), t.jsx("p", { className: "line-clamp-6 whitespace-pre-wrap", children: o.trim() })] }) : null, t.jsx(wr, { profiles: a, profileId: c, model: d, onProfileIdChange: u, onModelChange: f, disabled: m, autoLoadModels: false }), t.jsxs("label", { className: "block space-y-1.5", children: [t.jsxs("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: [I ? "\uCD94\uAC00 \uC9C8\uBB38" : "\uAD81\uAE08\uD55C \uC810", t.jsx("span", { className: "ml-1 font-normal text-slate-500 dark:text-odp-muted", children: I ? "(\uD544\uC218)" : "(\uC120\uD0DD)" })] }), t.jsx("textarea", { className: "quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", placeholder: I ? "\uC608: \uC9C0\uB2C8 \uC9C0\uC218\uC640 \uC5D4\uD2B8\uB85C\uD53C\uC758 \uC218\uC2DD\uC801 \uCC28\uC774\uAC00 \uBB54\uAC00\uC694?" : N ? "\uBE44\uC6CC \uB450\uBA74 \uC815\uB2F5/\uC624\uB2F5 \uC774\uC720\uB97C \uAE30\uBCF8 \uC124\uBA85\uD569\uB2C8\uB2E4. \uC608: \uC65C \uC774 \uBCF4\uAE30\uAC00 \uC815\uB2F5\uC778\uC9C0\u2026" : "\uBE44\uC6CC \uB450\uBA74 \uC624\uB2F5 \uC774\uC720\uB97C \uAE30\uBCF8 \uC124\uBA85\uD569\uB2C8\uB2E4. \uC608: 2\uBC88\uACFC 3\uBC88\uC758 \uCC28\uC774\u2026", value: h, disabled: m, onChange: (U) => y(U.target.value), onKeyDown: T }), t.jsxs("p", { className: "text-[10px] text-slate-500 dark:text-odp-muted", children: [I ? "\uAE30\uC874 \uBD84\uC11D\uACFC \uBB38\uC81C \uB0B4\uC6A9\uC744 \uBC14\uD0D5\uC73C\uB85C \uB2F5\uBCC0\uD569\uB2C8\uB2E4." : "\uBE44\uC6CC \uB450\uACE0 \uC0DD\uC131\uD558\uBA74 \uAE30\uBCF8 \uD504\uB86C\uD504\uD2B8\uB85C \uC124\uBA85\uD569\uB2C8\uB2E4.", " ", t.jsx("kbd", { className: "rounded border border-slate-300 bg-slate-100 px-1 py-px font-mono text-[9px] dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: "\u2318/Ctrl+Enter" }), "\uB85C \uBC14\uB85C \uC0DD\uC131\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] })] })] }), t.jsxs("div", { className: `flex gap-2 border-t p-3 ${$}`, children: [t.jsx(F, { type: "button", variant: "secondary", size: "sm", className: "flex-1", disabled: m, onClick: p, children: "\uCDE8\uC18C" }), t.jsxs(F, { type: "button", variant: "primary", size: "sm", className: "flex-1", disabled: !D, onClick: () => k(h), children: [t.jsx(_e, { size: 14 }), m ? "\uC0DD\uC131 \uC911\u2026" : I ? "\uB2F5\uBCC0 \uC0DD\uC131" : "\uC0DD\uC131"] })] })] })] }) : null });
}
const _l = i.memo(Tl);
function Dl({ disabled: e = false, onGenerate: n }) {
  const [s, r] = i.useState("");
  return t.jsxs("div", { className: "space-y-2 border-t border-slate-100 pt-3 dark:border-odp-borderSoft", children: [t.jsx("label", { htmlFor: "quiz-source-generate-topic", className: "block text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uADFC\uAC70\uB85C \uBB38\uC81C \uC0DD\uC131" }), t.jsx("input", { id: "quiz-source-generate-topic", className: "w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", placeholder: "\uC8FC\uC81C (\uC120\uD0DD)", value: s, onChange: (o) => r(o.target.value) }), t.jsxs(F, { type: "button", variant: "secondary", size: "sm", className: "w-full", disabled: e, onClick: () => {
    n(s);
  }, children: [t.jsx(_e, { size: 14 }), "\uADFC\uAC70\uB85C \uBB38\uC81C \uCD94\uAC00"] })] });
}
const Fl = i.memo(Dl);
function ql(e, n) {
  var _a2;
  if (!(n.isSubmitted || !!n.gradedQuestions[e.id])) return false;
  if (e.kind === "choice") {
    const r = n.userAnswers[e.id];
    return r != null && String(r).trim() !== "" && r !== e.answer;
  }
  return ((_a2 = n.subjectiveGrades[e.id]) == null ? void 0 : _a2.verdict) === "wrong";
}
function Bl(e) {
  return e.questions.filter((n) => ql(n, e));
}
function Ul(e) {
  return e.map((n, s) => {
    const r = String(s + 1);
    return { ...n, id: r, displayLabel: r };
  });
}
function Gl(e, n) {
  const s = Bl({ questions: e.questions, userAnswers: n.userAnswers, gradedQuestions: n.gradedQuestions, isSubmitted: n.isSubmitted, subjectiveGrades: n.subjectiveGrades });
  if (!s.length) return null;
  const r = Ul(s), o = rs({ ...e.config, sourcePaths: [...e.config.sourcePaths] });
  return { markdown: yr(o, r, Vn), questions: r, config: o };
}
function Wl(e) {
  return e.toLowerCase().endsWith(Xn) ? e.slice(0, -Xn.length) : e.replace(/\.md$/i, "");
}
function ar(e, n) {
  const s = String(e || "").trim().replace(/\\/g, "/"), r = s.lastIndexOf("/"), o = r >= 0 ? s.slice(0, r + 1) : "", a = Wl(ai(s)), c = n != null && n > 1 ? `-\uD2C0\uB9B0\uBB38\uC81C-${n}` : "-\uD2C0\uB9B0\uBB38\uC81C";
  return `${o}${a}${c}${Xn}`;
}
async function Jl(e, n) {
  const s = ar(e);
  if (!await n(s)) return s;
  for (let r = 2; r < 100; r += 1) {
    const o = ar(e, r);
    if (!await n(o)) return o;
  }
  throw new Error("\uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uD034\uC988 \uD30C\uC77C \uC774\uB984\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
}
function xn(e) {
  return e != null && String(e).trim() !== "";
}
function Fn(e) {
  const n = {};
  for (const s of e.questions) {
    const r = xn(e.userAnswers[s.id]);
    (e.isSubmitted && s.kind === "choice" ? true : !!e.gradedQuestions[s.id]) ? n[s.id] = true : r && (n[s.id] = false);
  }
  return zt({ userAnswers: e.userAnswers, gradedQuestions: n, subjectiveGrades: e.subjectiveGrades, isSubmitted: e.isSubmitted, ...e.timeLog ? { timeLog: e.timeLog } : {}, ...e.wrongChoiceExplanations ? { wrongChoiceExplanations: e.wrongChoiceExplanations } : {}, ...e.questionMemos ? { questionMemos: e.questionMemos } : {} });
}
function lr(e, n) {
  const s = zt(e ?? Vn), r = zt(n ?? Vn);
  return JSON.stringify(s) === JSON.stringify(r);
}
function Hl(e) {
  return e != null && !ss(e);
}
const Kl = 320, Jr = "s3haim_quiz_source_remove_confirm", Vl = Lt, Xl = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-violet-400", e ? "border-violet-500 bg-violet-500 shadow-sm dark:border-violet-500 dark:bg-violet-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), Zl = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
function Hr() {
  try {
    return localStorage.getItem(Jr) === "true";
  } catch {
    return false;
  }
}
function Yl(e) {
  try {
    localStorage.setItem(Jr, String(e));
  } catch {
  }
}
function ec({ open: e, docConfig: n, sourcePathUsage: s, busyGenSources: r, onClose: o, onPreview: a, onRemove: c, onToggleEnabled: d, onOpenPicker: u, onGenerateFromTopic: f, onDropHostChange: m }) {
  const [p, k] = i.useState(Hr), { width: h, handleProps: y, isResizing: v } = dt({ storageKey: "quiz-sources-dock-width", defaultWidth: Kl, minWidth: 240, maxWidth: 520, edge: "right" }), z = i.useCallback((C) => {
    k(C), Yl(C);
  }, []);
  return t.jsx(Ot, { motionKey: "quiz-sources-dock", open: e, width: h, isResizing: v, "aria-label": "\uD30C\uC77C \uADFC\uAC70 \uBB38\uC11C", className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface", children: t.jsxs("div", { className: "relative flex h-full min-h-0 flex-col", style: { width: h }, children: [t.jsx(Vl, { edge: "left", handleProps: y, isResizing: v, visibleOnHover: true, label: "\uD30C\uC77C \uADFC\uAC70 \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsxs("div", { className: "border-b border-slate-200 dark:border-odp-borderSoft", children: [t.jsxs("div", { className: "flex items-center justify-between px-3 py-2.5", children: [t.jsxs("div", { className: "flex min-w-0 items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: [t.jsx(Rr, { size: 16, className: "shrink-0 text-violet-600 dark:text-violet-400" }), t.jsx("span", { className: "truncate", children: "\uD30C\uC77C \uADFC\uAC70" }), s.total > 0 ? t.jsxs("span", { className: "ml-0.5 inline-flex shrink-0 items-baseline gap-0.5 rounded-md bg-violet-100 px-1.5 py-0.5 text-[11px] font-bold tabular-nums dark:bg-violet-950/70", "aria-label": `\uB4F1\uB85D ${s.total}\uAC1C \uC911 ${s.active}\uAC1C \uC0AC\uC6A9 \uC911`, children: [t.jsx("span", { className: "text-violet-600 dark:text-violet-400", children: s.active }), t.jsx("span", { className: "font-medium text-slate-400", children: "/" }), t.jsx("span", { className: "text-slate-700 dark:text-slate-200", children: s.total }), t.jsx("span", { className: "ml-0.5 text-[9px] font-semibold text-violet-700 dark:text-violet-300", children: "\uC0AC\uC6A9" })] }) : null] }), t.jsx("button", { type: "button", "aria-label": "\uADFC\uAC70 \uD328\uB110 \uB2EB\uAE30", className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg", onClick: o, children: t.jsx(Ue, { size: 16 }) })] }), t.jsxs("div", { className: "flex items-center justify-between gap-3 px-3 pb-2.5", children: [t.jsx("label", { htmlFor: "quiz-source-remove-confirm", className: "text-[11px] font-medium text-slate-600 dark:text-odp-muted", children: "\uC0AD\uC81C \uC2DC \uD655\uC778" }), t.jsx(oa, { id: "quiz-source-remove-confirm", className: Xl(p), checked: p, onCheckedChange: z, "aria-label": "\uADFC\uAC70 \uBB38\uC11C \uC0AD\uC81C \uC2DC \uD655\uC778", children: t.jsx(ia, { className: Zl }) })] })] }), t.jsxs("div", { ref: m, className: "relative min-h-0 flex-1 space-y-4 overflow-y-auto p-3", children: [t.jsx(Tr, { layout: "dock", paths: n.sourcePaths, label: "\uC120\uD0DD\uB41C \uBB38\uC11C", onPreview: a, onRemove: c, isPathEnabled: (C) => li(n, C), onToggleEnabled: d, onOpenPicker: u }), t.jsx(Fl, { disabled: r, onGenerate: f })] })] }) });
}
const tc = i.memo(ec), nc = /* @__PURE__ */ new Set(["markdown", "json", "html", "svg", "raw"]), qn = "h-full min-h-[240px] w-full resize-none border-0 bg-transparent p-3 font-mono text-xs text-slate-800 outline-none dark:text-odp-fgStrong";
function sc(e) {
  return nc.has(String(e || ""));
}
function rc({ payload: e, editMode: n, editContent: s, onEditContentChange: r }) {
  const o = e.currentFile.viewer, a = i.useMemo(() => `vault-preview-${e.currentFile.id.replace(/[^\w-]+/g, "-")}`, [e.currentFile.id]);
  return e.needsEncMdPassword ? t.jsx("div", { className: "p-4 text-sm text-slate-600 dark:text-odp-muted", children: "\uC554\uD638\uD654\uB41C \uB178\uD2B8\uC785\uB2C8\uB2E4. \uBBF8\uB9AC\uBCF4\uAE30\uB97C \uBCF4\uB824\uBA74 \u300C\uC774 \uBB38\uC11C \uC5F4\uAE30\u300D\uB85C \uD3B8\uC9D1\uAE30\uC5D0\uC11C \uC554\uD638\uB97C \uC785\uB825\uD558\uC138\uC694." }) : o === "image" && e.currentFile.objectUrl ? t.jsx("div", { className: "flex min-h-0 flex-1 items-center justify-center overflow-auto p-3", children: t.jsx("img", { src: e.currentFile.objectUrl, alt: e.currentFile.name, className: "max-h-full max-w-full object-contain" }) }) : o === "pdf" && e.currentFile.objectUrl ? t.jsx("iframe", { title: e.currentFile.name, src: e.currentFile.objectUrl, className: "h-full min-h-[240px] w-full border-0" }) : o === "audio" && e.currentFile.objectUrl ? t.jsx("div", { className: "p-4", children: t.jsx("audio", { controls: true, className: "w-full", src: e.currentFile.objectUrl, children: "\uC624\uB514\uC624\uB97C \uC7AC\uC0DD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }) }) : o === "video" && e.currentFile.objectUrl ? t.jsx("div", { className: "p-2", children: t.jsx("video", { controls: true, className: "max-h-full w-full", src: e.currentFile.objectUrl, children: "\uB3D9\uC601\uC0C1\uC744 \uC7AC\uC0DD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }) }) : o === "markdown" ? n ? t.jsx("textarea", { className: qn, value: s, onChange: (c) => r(c.target.value), spellCheck: false }) : t.jsx("div", { className: "markdown-content p-3", children: t.jsx(Fe, { text: s, previewId: a }) }) : o === "html" || o === "svg" ? n ? t.jsx("textarea", { className: qn, value: s, onChange: (c) => r(c.target.value), spellCheck: false }) : t.jsx("iframe", { title: e.currentFile.name, srcDoc: s, sandbox: "", className: "h-full min-h-[240px] w-full border-0 bg-white" }) : n ? t.jsx("textarea", { className: qn, value: s, onChange: (c) => r(c.target.value), spellCheck: false }) : t.jsx("pre", { className: "overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-xs text-slate-800 dark:text-odp-fgStrong", children: s });
}
const oc = Lt, jt = "z-100001 max-w-[min(92vw,420px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function ic({ path: e, onClose: n, loadDocument: s, onOpenDocument: r, onOpenInNewTab: o, embedded: a = false, width: c, resizeHandleProps: d, isResizing: u, resizeEdge: f = "right" }) {
  const [m, p] = i.useState(null), [k, h] = i.useState(true), [y, v] = i.useState(""), [z, C] = i.useState(false), [N, g] = i.useState(""), $ = dt({ storageKey: a ? void 0 : "vault-document-preview-panel-width", defaultWidth: 400, minWidth: 280, maxWidth: 640, edge: f === "left" ? "left" : "right" }), w = c ?? $.width, S = d ?? $.handleProps, I = u ?? $.isResizing;
  i.useEffect(() => {
    let R = false, U;
    return h(true), v(""), C(false), (async () => {
      var _a2;
      try {
        const B = await s(e);
        if (R) {
          (_a2 = B == null ? void 0 : B.revoke) == null ? void 0 : _a2.call(B);
          return;
        }
        U = B == null ? void 0 : B.revoke, p(B), g((B == null ? void 0 : B.content) ?? ""), B || v("\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      } catch (B) {
        R || (p(null), g(""), v(B instanceof Error ? B.message : "\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        R || h(false);
      }
    })(), () => {
      R = true, U == null ? void 0 : U();
    };
  }, [e, s]);
  const Q = i.useCallback(() => {
    C((R) => !R);
  }, []), D = Mt(e), T = m ? sc(m.currentFile.viewer) : false;
  return t.jsxs("aside", { className: `relative flex h-full flex-col overflow-hidden bg-white dark:bg-odp-surface ${a ? "min-w-0" : "shrink-0 border-r border-slate-200 dark:border-odp-borderSoft"}`, style: a ? void 0 : { width: w }, "aria-label": "\uBB38\uC11C \uBBF8\uB9AC\uBCF4\uAE30", children: [t.jsx(oc, { edge: f, handleProps: S, isResizing: I, visibleOnHover: true, label: "\uBBF8\uB9AC\uBCF4\uAE30 \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsx("div", { className: "flex items-center gap-1 border-b border-slate-200 px-2 py-2 dark:border-odp-borderSoft", children: t.jsxs(Rt, { delayDuration: 250, skipDelayDuration: 0, children: [t.jsxs(Re, { children: [t.jsx(Me, { asChild: true, children: t.jsx("div", { className: "min-w-0 flex-1 truncate px-1 text-xs font-semibold text-slate-800 dark:text-odp-fgStrong", children: D }) }), t.jsx(Ae, { children: t.jsxs(Le, { side: "bottom", sideOffset: 6, className: jt, children: [e, t.jsx(Oe, { className: "fill-white dark:fill-odp-surface" })] }) })] }), T ? t.jsxs(Re, { children: [t.jsx(Me, { asChild: true, children: t.jsx("button", { type: "button", className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": z ? "\uBBF8\uB9AC\uBCF4\uAE30 \uBAA8\uB4DC" : "\uD3B8\uC9D1 \uBAA8\uB4DC", onClick: Q, children: z ? t.jsx(Ki, { size: 15 }) : t.jsx(bn, { size: 15 }) }) }), t.jsx(Ae, { children: t.jsxs(Le, { side: "bottom", sideOffset: 6, className: jt, children: [z ? "\uBBF8\uB9AC\uBCF4\uAE30 \uBAA8\uB4DC" : "\uD3B8\uC9D1 \uBAA8\uB4DC", t.jsx(Oe, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : null, o ? t.jsxs(Re, { children: [t.jsx(Me, { asChild: true, children: t.jsx("button", { type: "button", className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": "\uC0C8 \uD0ED\uC73C\uB85C \uC5F4\uAE30", onClick: () => o(e), children: t.jsx(Vi, { size: 15 }) }) }), t.jsx(Ae, { children: t.jsxs(Le, { side: "bottom", sideOffset: 6, className: jt, children: ["\uC0C8 \uD0ED\uC73C\uB85C \uC5F4\uAE30", t.jsx(Oe, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : null, r ? t.jsxs(Re, { children: [t.jsx(Me, { asChild: true, children: t.jsx("button", { type: "button", className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": "\uC774 \uBB38\uC11C \uC5F4\uAE30", onClick: () => r(e), children: t.jsx(Xi, { size: 15 }) }) }), t.jsx(Ae, { children: t.jsxs(Le, { side: "bottom", sideOffset: 6, className: jt, children: ["\uC774 \uBB38\uC11C \uC5F4\uAE30", t.jsx(Oe, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : null, t.jsxs(Re, { children: [t.jsx(Me, { asChild: true, children: t.jsx("button", { type: "button", className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": "\uBBF8\uB9AC\uBCF4\uAE30 \uB2EB\uAE30", onClick: n, children: t.jsx(Ue, { size: 15 }) }) }), t.jsx(Ae, { children: t.jsxs(Le, { side: "bottom", sideOffset: 6, className: jt, children: ["\uB2EB\uAE30", t.jsx(Oe, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }) }), t.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto", children: k ? t.jsxs("div", { className: "flex h-full items-center justify-center gap-2 p-6 text-xs text-slate-500 dark:text-odp-muted", children: [t.jsx(gn, { size: 16, className: "animate-spin", "aria-hidden": true }), "\uBD88\uB7EC\uC624\uB294 \uC911\u2026"] }) : y ? t.jsx("div", { className: "p-4 text-sm text-rose-600 dark:text-rose-400", children: y }) : m ? t.jsx(rc, { payload: m, editMode: z, editContent: N, onEditContentChange: g }) : null })] });
}
const ac = 400;
function lc({ path: e, onClose: n, loadDocument: s, onOpenDocument: r, onOpenInNewTab: o }) {
  const { width: a, handleProps: c, isResizing: d } = dt({ storageKey: "quiz-source-preview-dock-width", defaultWidth: ac, minWidth: 280, maxWidth: 640, edge: "left" });
  return t.jsx(Ot, { motionKey: "quiz-source-preview-dock", open: e != null, width: a, isResizing: d, "aria-label": "\uADFC\uAC70 \uBB38\uC11C \uBBF8\uB9AC\uBCF4\uAE30", className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface", children: e ? t.jsx("div", { className: "relative h-full min-h-0", style: { width: a }, children: t.jsx(ic, { embedded: true, path: e, width: a, resizeHandleProps: c, isResizing: d, resizeEdge: "left", onClose: n, loadDocument: s, onOpenDocument: r, onOpenInNewTab: o }) }) : null });
}
const cc = i.memo(lc), cr = { correct: "bg-emerald-500", partial: "bg-amber-500", wrong: "bg-rose-500", ungraded: "bg-slate-400 dark:bg-slate-500" }, dr = { correct: "\uC815\uB2F5", partial: "\uBD80\uBD84", wrong: "\uC624\uB2F5", ungraded: "\uBBF8\uCC44\uC810" };
function dc(e) {
  return e ? typeof e.score == "number" && Number.isFinite(e.score) ? Math.min(100, Math.max(0, e.score)) / 100 : e.verdict === "correct" ? 1 : e.verdict === "partial" ? 0.5 : 0 : null;
}
function uc(e) {
  var _a2;
  const { question: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a } = e, c = o || r[n.id], d = xn(s[n.id]);
  if (!c) return d ? "ungraded" : null;
  if (n.kind === "choice") return d ? s[n.id] === n.answer ? "correct" : "wrong" : null;
  const u = (_a2 = a[n.id]) == null ? void 0 : _a2.verdict;
  return u === "correct" ? "correct" : u === "partial" ? "partial" : u === "wrong" ? "wrong" : null;
}
function fc(e) {
  const { questions: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a } = e;
  let c = 0, d = 0, u = 0, f = 0, m = 0, p = 0;
  for (const y of n) {
    const v = s[y.id] !== void 0 && s[y.id] !== null && String(s[y.id]).trim() !== "";
    if (v && (f += 1), !(o || r[y.id])) continue;
    if (y.kind === "choice") {
      p += 1, s[y.id] === y.answer ? (c += 1, m += 1) : v && (d += 1);
      continue;
    }
    const C = a[y.id], N = dc(C);
    N != null && (p += 1, m += N, (C == null ? void 0 : C.verdict) === "correct" ? c += 1 : (C == null ? void 0 : C.verdict) === "partial" ? u += 1 : d += 1);
  }
  const k = n.length, h = k > 0 && p > 0 ? Math.round(m / k * 100) : null;
  return { correct: c, wrong: d, partial: u, answered: f, total: k, scorePercent: h };
}
const mc = 288, pc = Lt, xc = ["ungraded", "correct", "partial", "wrong"], hc = { ungraded: "bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:text-slate-200 dark:ring-slate-600", correct: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800", partial: "bg-amber-50 text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800", wrong: "bg-rose-50 text-rose-800 ring-1 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-800" }, gc = "bg-slate-100 text-slate-400 ring-1 ring-transparent dark:bg-odp-bgSoft dark:text-odp-muted";
function bc({ open: e, questions: n, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a, onClose: c, onNavigate: d }) {
  const [u, f] = i.useState({ ungraded: true, correct: true, partial: true, wrong: true }), { width: m, handleProps: p, isResizing: k } = dt({ storageKey: "quiz-toc-dock-width", defaultWidth: mc, minWidth: 220, maxWidth: 480, edge: "right" }), h = i.useCallback((v) => {
    f((z) => ({ ...z, [v]: !z[v] }));
  }, []), y = Or();
  return t.jsx(Ot, { motionKey: "quiz-toc-dock", open: e, width: m, isResizing: k, "aria-label": "\uBB38\uC81C \uBAA9\uCC28", className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface", children: t.jsxs("div", { className: "relative flex h-full min-h-0 flex-col", style: { width: m }, children: [t.jsx(pc, { edge: "left", handleProps: p, isResizing: k, visibleOnHover: true, label: "\uBAA9\uCC28 \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsxs("div", { className: "border-b border-slate-200 dark:border-odp-borderSoft", children: [t.jsxs("div", { className: "flex items-center justify-between px-3 py-2.5", children: [t.jsxs("div", { className: "flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: [t.jsx(Mr, { size: 16, className: "text-slate-600 dark:text-odp-muted" }), "\uBB38\uC81C \uBAA9\uCC28"] }), t.jsx("button", { type: "button", "aria-label": "\uBAA9\uCC28 \uD328\uB110 \uB2EB\uAE30", className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg", onClick: c, children: t.jsx(Ue, { size: 16 }) })] }), t.jsx("div", { className: "flex flex-wrap items-center gap-1 px-3 pb-2.5", children: xc.map((v) => {
    const z = u[v];
    return t.jsxs("button", { type: "button", "aria-pressed": z, "aria-label": `\uBAA9\uCC28 ${dr[v]} ${z ? "\uD45C\uC2DC" : "\uC228\uAE40"}`, className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors ${z ? hc[v] : gc}`, onClick: () => h(v), children: [t.jsx("span", { className: `h-2 w-2 shrink-0 rounded-full ${z ? cr[v] : "bg-slate-300 dark:bg-slate-600"}`, "aria-hidden": true }), dr[v]] }, v);
  }) })] }), t.jsx("ul", { className: "min-h-0 flex-1 space-y-1 overflow-y-auto p-3 text-xs", children: n.map((v, z) => {
    var _a2, _b;
    const C = !!v.similarOf, N = /-파생\d+$/u.test(String(v.displayLabel || "")) ? "\uD30C\uC0DD\uBB38\uC81C" : "\uC720\uC0AC\uBB38\uC81C", g = uc({ question: v, userAnswers: s, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a });
    if (g && !u[g]) return null;
    const $ = t.jsxs("button", { type: "button", className: `flex w-full items-center gap-2 rounded py-1.5 text-left hover:bg-slate-100 dark:hover:bg-odp-focusBg ${C ? "ml-3 border-l-2 border-violet-300 pl-2.5 text-[11px] text-violet-900 dark:border-violet-600 dark:text-violet-200" : "px-2"}`, title: C ? `${((_a2 = v.similarOf) == null ? void 0 : _a2.displayLabel) || ((_b = v.similarOf) == null ? void 0 : _b.id)}\uC758 ${N}` : void 0, onClick: () => d(v.id), children: [t.jsx("span", { className: "flex h-4 w-2 shrink-0 items-center justify-center", "aria-hidden": true, children: g ? t.jsx("span", { className: `h-2 w-2 rounded-full ${cr[g]}` }) : null }), t.jsxs("span", { className: "min-w-0 truncate", children: [C ? t.jsx("span", { className: "mr-1 text-violet-400 dark:text-violet-500", children: "\u21B3" }) : null, v.displayLabel, ". ", v.question.slice(0, 40)] })] }), w = Sa(z, y);
    return t.jsx(He.li, { initial: w.initial, animate: w.animate, transition: w.transition, children: $ }, v.id);
  }) })] }) });
}
const kc = i.memo(bc);
async function Kr(e, n) {
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
function Vr(e) {
  const n = [], s = /* @__PURE__ */ new Set();
  for (const r of e) {
    const o = String(r || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
    !o || s.has(o) || (s.add(o), n.push(o));
  }
  return n;
}
function wc(e) {
  return String(e || "").toLowerCase().split(/[^\p{L}\p{N}]+/u).map((n) => n.trim()).filter((n) => n.length >= 2).slice(0, 16);
}
function yc(e, n) {
  if (n.length === 0) return 1;
  const s = e.toLowerCase();
  let r = 0;
  for (const o of n) s.includes(o) && (r += 1);
  return r;
}
async function kn(e) {
  const n = Pe(), s = e.topK ?? n.ragTopK, r = e.maxChars ?? n.ragMaxChars, o = Vr(e.sourcePaths);
  if (o.length === 0) return { chunks: [], usedFallback: false };
  const a = await Kr(o, e.readText);
  if (a.length === 0) return { chunks: [], usedFallback: true };
  const c = wc(e.query), d = [];
  for (const m of a) ci(m.text, 12e3).forEach((k, h) => {
    k.trim() && d.push({ path: m.path, excerpt: k, chunkIndex: h, score: yc(k, c) });
  });
  d.sort((m, p) => (p.score || 0) - (m.score || 0));
  const u = [];
  let f = 0;
  for (const m of d) {
    if (u.length >= s) break;
    if (f + m.excerpt.length > r) {
      const p = r - f;
      if (p < 200) break;
      u.push({ ...m, excerpt: m.excerpt.slice(0, p) });
      break;
    }
    u.push(m), f += m.excerpt.length;
  }
  return { chunks: u, usedFallback: true };
}
function wn(e) {
  return e.length ? e.map((n) => `---
[${n.path}]
${n.excerpt}
`).join(`
`) : "";
}
async function vc(e, n, s) {
  const r = Pe(), o = Math.max(4e3, s ?? Math.min(r.ragMaxChars, 2e5)), a = Vr(e);
  return a.length ? (await Kr(a, n)).map((d) => ({ path: d.path, text: d.text.length > o ? `${d.text.slice(0, o)}

\u2026(truncated)` : d.text })) : [];
}
function Sc(e) {
  return e.kind === "subjective" ? e.answerStyle === "essay" ? "\uC11C\uC220\uD615 \uC8FC\uAD00\uC2DD" : "\uB2E8\uB2F5\uD615 \uC8FC\uAD00\uC2DD" : `${e.choiceCount}\uC9C0\uC120\uB2E4 \uAC1D\uAD00\uC2DD`;
}
function jc(e) {
  return `${Ur(e)}

[\uD30C\uC0DD\uBB38\uD56D \uC0DD\uC131 \u2014 \uCD94\uAC00 \uADDC\uCE59]
- \uC6D0\uBCF8 \uBB38\uD56D\uC758 \uD559\uC2B5 \uBAA9\uD45C\xB7\uD575\uC2EC \uAC1C\uB150\uC744 \uC720\uC9C0\uD558\uB418, \uC9C0\uC815\uB41C **\uCD9C\uC81C \uC720\uD615**\uC5D0 \uB9DE\uB294 \uC0C8 \uBB38\uD56D\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.
- \uAC1D\uAD00\uC2DD \u2194 \uC8FC\uAD00\uC2DD \uBCC0\uD658\uC774 \uC694\uCCAD\uB418\uBA74, \uB3D9\uC77C \uAC1C\uB150\uC744 \uD574\uB2F9 \uC720\uD615\uC5D0 \uB9DE\uAC8C \uC7AC\uAD6C\uC131\uD558\uC138\uC694.
- \uC0AC\uC6A9\uC790 \uCD94\uAC00 \uC694\uAD6C\uC0AC\uD56D\uC774 \uC788\uC73C\uBA74 \uBC18\uB4DC\uC2DC \uBC18\uC601\uD558\uC138\uC694.`;
}
function Cc(e) {
  var _a2;
  const n = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), s = String(e.explanation || "").trim(), r = String(e.target.userPrompt || "").trim(), o = Sc(e.target), a = e.sourceKind === "subjective" ? e.sourceAnswerStyle === "essay" ? "\uC11C\uC220\uD615 \uC8FC\uAD00\uC2DD" : "\uB2E8\uB2F5\uD615 \uC8FC\uAD00\uC2DD" : `${e.options.length || e.target.choiceCount}\uC9C0\uC120\uB2E4 \uAC1D\uAD00\uC2DD`, c = e.sourceKind === "choice" && e.options.length > 0 ? `\uBCF4\uAE30: ${e.options.map((f, m) => `${m + 1}. ${f}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88
` : "";
  let d;
  if (e.target.kind === "subjective") d = `{"kind":"subjective","answerStyle":"${e.target.answerStyle === "essay" ? "essay" : "short"}","question":"...","modelAnswer":"...","point":"...","explanation":"..."}`;
  else {
    const f = e.target.choiceCount, m = e.targetAnswer ?? 1;
    d = `{"kind":"choice","question":"...","options":[${Array.from({ length: f }, () => '"..."').join(",")}],"answer":${m},"point":"...","explanation":"..."}`;
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
${d}`;
}
function Nc(e, n) {
  const s = String(n || "").trim().replace(/-(?:유사|파생)\d+$/u, "") || "1", r = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), o = new RegExp(`^${r}-\uD30C\uC0DD(\\d+)$`);
  let a = 0;
  for (const c of e) {
    const d = String(c.displayLabel || "").match(o);
    (d == null ? void 0 : d[1]) && (a = Math.max(a, Number.parseInt(d[1], 10)));
  }
  return `${s}-\uD30C\uC0DD${a + 1}`;
}
const ur = ".quiz", $c = 96e3;
function Xr(e) {
  return String(e || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
}
function Pc(e) {
  const s = Xr(e).replace(/\.quiz\.md$/i, "");
  return s ? `${ur}/${s}` : ur;
}
function Ec(e) {
  return String(e || "").trim().replace(/[^a-zA-Z0-9._-]+/g, "_") || "log";
}
function zc(e, n) {
  return `${Pc(e)}/${Ec(n)}.md`;
}
function re(e, n = $c) {
  const s = String(e || "");
  return s.length <= n ? s : `${s.slice(0, n)}

\u2026 (${s.length - n} characters truncated)`;
}
function Bn(e, n) {
  const s = re(n);
  return s.trim() ? `### ${e}

\`\`\`text
${s.replace(/```/g, "`\u200B``")}
\`\`\`
` : "";
}
function Ic(e, n) {
  const s = `- status: ${e.status}`, r = e.detail ? `- detail: ${e.detail}` : "", o = e.error ? `- error: ${e.error}` : "", a = [`## Step ${n + 1}: ${e.label} (${e.id})`, "", s, r, o, ""];
  return e.systemPrompt && a.push(Bn("System prompt", e.systemPrompt)), e.llmInstruction && a.push(Bn("Instruction / input", e.llmInstruction)), e.llmResponse && a.push(Bn("Model response / artifact", e.llmResponse)), a.filter(Boolean).join(`
`);
}
function Rc(e, n) {
  const s = ["# Quiz generation log", "", `- quiz file: ${Xr(n)}`, `- job id: ${e.id}`, `- kind: ${e.kind}`, ...e.questionLabel ? [`- source label: ${e.questionLabel}`] : [], ...e.resultLabel ? [`- result label: ${e.resultLabel}`] : [], ...e.resultQuestionId ? [`- result question id: ${e.resultQuestionId}`] : [], `- job status: ${e.status}`, `- created at: ${new Date(e.createdAt).toISOString()}`, ...e.error ? [`- job error: ${e.error}`] : [], "", "## Question preview", "", re(e.questionPreview, 4e3), "", "---", ""];
  return e.steps.forEach((r, o) => {
    s.push(Ic(r, o)), s.push("---", "");
  }), `${s.join(`
`).trimEnd()}
`;
}
async function Mc(e) {
  const n = zc(e.quizFilePath, e.logKey), s = Rc(e.job, e.quizFilePath);
  return await e.writeText(n, s), n;
}
const Ac = /^\d+\.\s*[a-zA-Z]\.\s*/, Lc = /^(?:\(\s*\d+\s*\)|\d+\)|\d+\.)\s*/, Oc = /^[a-zA-Z](?:\)|\.)\s*/, Qc = /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫]\s*/u, Tc = /^[가나다라마바사아자차카타파하](?:\)|\.)\s*/u;
function _c(e) {
  let n = String(e || "").trim();
  if (!n) return n;
  for (let s = 0; s < 4; s += 1) {
    const r = n;
    if (n = n.replace(Ac, "").replace(Lc, "").replace(Oc, "").replace(Qc, "").replace(Tc, "").trim(), n === r) break;
  }
  return n;
}
const tn = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uCD9C\uC81C\uC6A9 \uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uAC00\uC785\uB2C8\uB2E4.
\uC8FC\uC5B4\uC9C4 \uC6D0\uBB38\uC5D0\uC11C \uCD9C\uC81C\uC5D0 \uD544\uC694\uD55C \uAC1C\uB150\xB7\uC815\uC758\xB7\uACF5\uC2DD\xB7\uC808\uCC28\xB7\uC0AC\uB840\uB9CC \uC8FC\uC81C\uBCC4\uB85C \uC815\uB9AC\uD558\uC138\uC694.
- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC0AC\uC2E4\uC744 \uB9CC\uB4E4\uC9C0 \uB9C8\uC138\uC694.
- \uC218\uC2DD\uC740 \uC6D0\uBB38 \uD45C\uAE30\uB97C \uC720\uC9C0\uD558\uC138\uC694 ($...$ / $$...$$).
- \uC751\uB2F5\uC740 \uB9C8\uD06C\uB2E4\uC6B4 \uC694\uC57D\uBB38\uB9CC \uC791\uC131\uD558\uC138\uC694. JSON\xB7\uCF54\uB4DC\uD39C\uC2A4\xB7\uC11C\uB450\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.`;
function Dc(e, n, s) {
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
function Fc(e) {
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
async function qc(e, n) {
  var _a2, _b, _c2;
  const s = Pe(), r = Array.isArray(e) ? e : [], o = at(r, ((_a2 = n == null ? void 0 : n.profileId) == null ? void 0 : _a2.trim()) || s.profileId || is());
  if (!o) return { ready: false, message: "AI \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\xB7\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." };
  const a = (((_b = n == null ? void 0 : n.model) == null ? void 0 : _b.trim()) || ((_c2 = s.modelId) == null ? void 0 : _c2.trim()) || as(o.id, o.kind)).trim();
  if (o.kind === vr) {
    const c = Sr(), d = await jr(c);
    if (!d.running) return { ready: false, message: "MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." };
    const u = a || c.selectedModelId || d.models[0] || "";
    return u ? { ready: true, profile: o, model: u } : { ready: false, message: "\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694." };
  }
  if (o.kind === Cr) {
    const c = Nr();
    let d = [];
    try {
      const f = await di(c);
      if (d = Array.isArray(f.models) ? f.models : [], !f.running && !c.selectedModelId && !a) return { ready: false, message: "llama.cpp \uBAA8\uB378\uC774 \uC900\uBE44\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\xB7\uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." };
    } catch {
      if (!c.selectedModelId && !a) return { ready: false, message: "llama.cpp \uBAA8\uB378\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694." };
    }
    const u = a || c.selectedModelId || d[0] || "";
    return u ? { ready: true, profile: o, model: u } : { ready: false, message: "\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694." };
  }
  return o.kind === $r ? (o.baseUrl || "").trim() ? a ? { ready: true, profile: o, model: a } : { ready: false, message: "\uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uACE0\uB978 \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." } : { ready: false, message: "OpenAI \uD638\uD658 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uB610\uB294 AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\uB97C \uD655\uC778\uD558\uC138\uC694." } : a ? ((o.apiKey || "").trim(), { ready: true, profile: o, model: a }) : { ready: false, message: "Gemini \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uACE0\uB978 \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." };
}
function Bc(e) {
  const n = String(e || "");
  return /제공자|프로필|모델을 선택|모델이 로드|모델이 준비|API 키|Endpoint URL|AI 도우미에서/i.test(n);
}
function qe(e) {
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
function Uc(e) {
  const n = e && typeof e == "object" ? e : {}, s = String(n.verdict || "wrong"), r = s === "correct" || s === "partial" ? s : "wrong", o = Math.min(100, Math.max(0, Number(n.score) || (r === "correct" ? 100 : r === "partial" ? 50 : 0))), a = String(n.feedback || "").trim() || "\uCC44\uC810 \uD53C\uB4DC\uBC31\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.", c = String(n.rationale || "").trim();
  return c ? { verdict: r, score: o, feedback: a, rationale: c } : { verdict: r, score: o, feedback: a };
}
function nn(e, n) {
  const s = { ...e };
  return n.signal && (s.signal = n.signal), n.onChunk && (s.onChunk = n.onChunk), s;
}
async function Se(e) {
  var _a2, _b, _c2;
  const n = Pe(), s = Array.isArray(e.profiles) ? e.profiles : [], r = at(s, ((_a2 = e.profileId) == null ? void 0 : _a2.trim()) || n.profileId || is());
  if (!r) throw new Error("AI \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\xB7\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
  const o = (((_b = e.model) == null ? void 0 : _b.trim()) || ((_c2 = n.modelId) == null ? void 0 : _c2.trim()) || as(r.id, r.kind)).trim(), a = (e.systemPrompt || n.systemPrompt || "").trim(), c = e.instruction.trim(), d = { temperature: typeof e.temperature == "number" ? e.temperature : n.temperature }, u = {};
  if (e.signal && (u.signal = e.signal), e.onChunk && (u.onChunk = e.onChunk), r.kind === $r) {
    const f = (r.baseUrl || "").trim();
    if (!f) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
    return Nt(r.id, o), ui(o), _n(r.id, () => r.apiKey || "", (m) => Ws(nn({ baseUrl: f, apiKey: m, model: o, instruction: c, systemPrompt: a, selectedText: "", requestOptions: d }, u)), { allowEmpty: true, missingKeyMessage: "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
  }
  if (r.kind === Cr) {
    const f = Nr(), m = await fi(f, e.signal ? { signal: e.signal } : {}), p = (r.baseUrl || m.baseUrl || "").trim();
    if (!p) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    const k = o.trim() || f.selectedModelId || m.models[0] || "";
    if (!k) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
    return Nt(r.id, k), _n(r.id, () => r.apiKey || f.apiKey || "no-key-required", (h) => Ws(nn({ baseUrl: p, apiKey: h, model: k, instruction: c, systemPrompt: a, selectedText: "", requestOptions: d }, u)), { allowEmpty: true, missingKeyMessage: "llama.cpp API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." });
  }
  if (r.kind === vr) {
    const f = Sr(), m = await jr(f);
    if (!m.running) throw new Error("MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
    const p = o.trim() || f.selectedModelId || m.models[0] || "";
    if (!p) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
    return Nt(r.id, p), mi(nn({ instruction: c, systemPrompt: a, selectedText: "", requestOptions: d }, u));
  }
  if (pi(o)) throw new Error("\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
  return Nt(r.id, o), xi(o), _n(r.id, () => r.apiKey || "", (f) => hi(nn({ apiKey: f, model: o, instruction: c, systemPrompt: a, selectedText: "", requestOptions: d }, u)), { missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
}
function At(e, n, s) {
  const r = e && typeof e == "object" ? e : {};
  if ((r.kind === "subjective" ? "subjective" : (Array.isArray(r.options), "choice")) === "subjective") return { kind: "subjective", answerStyle: r.answerStyle === "essay" ? "essay" : "short", question: String(r.question || "").trim(), modelAnswer: String(r.modelAnswer || r.answer || "").trim(), point: String(r.point || "\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694."), explanation: String(r.explanation || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.") };
  const a = Array.isArray(r.options) ? r.options.map((d) => _c(String(d || ""))).slice(0, n) : [];
  for (; a.length < Math.min(2, n); ) a.push("");
  const c = Number.parseInt(String(r.answer ?? s), 10) || s;
  return { kind: "choice", question: String(r.question || "").trim(), options: a, answer: Math.min(n, Math.max(1, c)), point: String(r.point || "\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694."), explanation: String(r.explanation || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."), isGenerated: true };
}
function je(e, n, s, r, o) {
  var _a2, _b;
  const a = { profiles: e, instruction: n, systemPrompt: s, temperature: r };
  return (o == null ? void 0 : o.signal) && (a.signal = o.signal), (o == null ? void 0 : o.onChunk) && (a.onChunk = o.onChunk), ((_a2 = o == null ? void 0 : o.profileId) == null ? void 0 : _a2.trim()) && (a.profileId = o.profileId.trim()), ((_b = o == null ? void 0 : o.model) == null ? void 0 : _b.trim()) && (a.model = o.model.trim()), a;
}
function Be(e) {
  return e ? { signal: e } : void 0;
}
function cs(e) {
  var _a2, _b;
  const n = {};
  return e.signal && (n.signal = e.signal), e.onChunk && (n.onChunk = e.onChunk), ((_a2 = e.profileId) == null ? void 0 : _a2.trim()) && (n.profileId = e.profileId.trim()), ((_b = e.model) == null ? void 0 : _b.trim()) && (n.model = e.model.trim()), n.signal || n.onChunk || n.profileId || n.model ? n : void 0;
}
async function fr(e) {
  const n = Pe(), s = e.question, o = `\uB2E4\uC74C ${s.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615"} \uC8FC\uAD00\uC2DD \uBB38\uD56D\uC758 \uC218\uD5D8\uC790 \uB2F5\uC548\uC744 \uCC44\uC810\uD558\uC138\uC694.

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
{"verdict":"correct"|"partial"|"wrong","score":0,"feedback":"...","rationale":"..."}`, a = await Se(je(e.profiles, o, "\uB2F9\uC2E0\uC740 \uACF5\uC815\uD55C \uC2DC\uD5D8 \uCC44\uC810\uC704\uC6D0\uC785\uB2C8\uB2E4. JSON\uB9CC \uBC18\uD658\uD558\uC138\uC694.", n.gradeTemperature, Be(e.signal)));
  return Uc(qe(a));
}
async function Gc(e) {
  var _a2;
  const n = e.question, s = n.options || [], r = e.selectedOption, o = r === n.answer, a = ((_a2 = e.userInstructions) == null ? void 0 : _a2.trim()) ? `
[\uC218\uD5D8\uC790 \uCD94\uAC00 \uC9C8\uBB38]
${e.userInstructions.trim()}
\uC704 \uC9C8\uBB38\uC5D0\uB3C4 \uB2F5\uBCC0\uD558\uC138\uC694.` : "", d = `${o ? `\uC218\uD5D8\uC790\uAC00 ${r}\uBC88(\uC815\uB2F5)\uC744 \uACE8\uB790\uC2B5\uB2C8\uB2E4. \uC65C \uC815\uB2F5\uC778\uC9C0, \uB2E4\uB978 \uBCF4\uAE30\uAC00 \uC65C \uD2C0\uB838\uB294\uC9C0 \uC124\uBA85\uD558\uC138\uC694.` : `\uC218\uD5D8\uC790\uAC00 ${r}\uBC88\uC744 \uACE8\uB790\uC2B5\uB2C8\uB2E4. \uC65C \uC624\uB2F5\uC778\uC9C0 \uC124\uBA85\uD558\uC138\uC694.`}

[\uBB38\uC81C] ${n.question}
[\uBCF4\uAE30]
${s.map((u, f) => `${f + 1}. ${u}`).join(`
`)}
[\uC815\uB2F5] ${n.answer}\uBC88
[\uC120\uD0DD\uD55C \uBCF4\uAE30] ${r}\uBC88 (${s[r - 1] || ""})
[\uAE30\uC874 \uD574\uC124] ${n.explanation || ""}
${a}

\uC124\uBA85 \uD14D\uC2A4\uD2B8\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
  return Se(je(e.profiles, d, "\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124 \uC791\uC131\uC790\uC785\uB2C8\uB2E4.", 0.5, cs({ signal: e.signal, onChunk: e.onChunk, profileId: e.profileId, model: e.model })));
}
async function Wc(e) {
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
  return Se(je(e.profiles, o, "\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124 \uD29C\uD130\uC785\uB2C8\uB2E4. \uBB38\uC81C\uC640 \uAE30\uC874 \uBD84\uC11D \uB0B4\uC6A9\uB9CC \uADFC\uAC70\uB85C \uB2F5\uD558\uC138\uC694.", 0.5, cs({ signal: e.signal, onChunk: e.onChunk, profileId: e.profileId, model: e.model })));
}
async function Jc(e) {
  const n = Pe(), s = e.question, r = De(s, e.config.choiceCount || 4), o = Math.floor(Math.random() * r) + 1, a = (s.options || []).map((S) => String(S || "")), c = s.answer && s.answer >= 1 ? s.answer : 1, d = (S) => {
    var _a2;
    return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, S);
  };
  let u = "";
  const f = e.sourcePaths || [];
  if (f.length > 0 && e.readText) {
    d({ step: "rag", status: "running", detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026" });
    const { chunks: S } = await kn({ sourcePaths: f, query: `${s.question}
${s.point || ""}`, readText: e.readText });
    u = wn(S), d({ step: "rag", status: "done", detail: S.length > 0 ? `${S.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C", llmInstruction: `query: ${s.question}`, llmResponse: re(u || "(no excerpts)") });
  }
  const m = n.calcComplexity === "hand" ? "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5]" : "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uACC4\uC0B0\uAE30 \uD544\uC218]", p = Gr({ question: s.question, options: a, answer: c, point: s.point || "", explanation: s.explanation || "", ...u ? { ragBlock: u } : {} }), k = Math.min(n.temperature, 0.6);
  d({ step: "analysis", status: "running", detail: "LLM \uBB38\uD56D \uBD84\uC11D \uC911\u2026", llmInstruction: p, systemPrompt: lt });
  const h = await Se(je(e.profiles, p, lt, k, Be(e.signal))), y = Fr(qe(h));
  d({ step: "analysis", status: "done", detail: `${y.coreCategory}${y.isCalculation ? " \xB7 \uACC4\uC0B0\uBB38\uC81C" : ""}`, llmInstruction: p, llmResponse: re(h), systemPrompt: lt });
  const v = ct(y);
  let z = "";
  if (y.isCalculation && y.variables.length > 0) {
    d({ step: "randomize", status: "running", detail: "\uC218\uCE58 \uBCC0\uC218 \uC0D8\uD50C\uB9C1\u2026" });
    const S = qr(y.variables);
    z = Br(S);
    const I = S.map((Q) => `${Q.id}=${Q.value}${Q.unit ? Q.unit : ""}`).join(", ");
    d({ step: "randomize", status: "done", detail: I, llmInstruction: ct(y), llmResponse: re(JSON.stringify({ samples: S, variables: y.variables }, null, 2)) });
  } else d({ step: "randomize", status: "skipped", detail: "\uBE44\uACC4\uC0B0 \uBB38\uD56D", llmResponse: re(ct(y)) });
  const C = kl({ question: s.question, options: a, answer: c, point: s.point || "", explanation: s.explanation || "", choiceCount: r, targetAnswer: o, complexity: m, analysisBlock: v, sampledBlock: z, ...u ? { ragBlock: u } : {} }), N = Ur(n.systemPrompt || Pr);
  d({ step: "generate", status: "running", detail: "LLM \uBB38\uD56D \uC791\uC131 \uC911\u2026", llmInstruction: C, systemPrompt: N });
  const g = await Se(je(e.profiles, C, N, n.temperature, Be(e.signal))), $ = qe(g);
  d({ step: "generate", status: "done", detail: `\uC815\uB2F5 ${o}\uBC88`, llmInstruction: C, llmResponse: re(g), systemPrompt: N });
  let w = At($, r, o);
  if (!pn(w)) {
    const S = ut(w.point), I = ft(w.explanation), Q = Wr({ question: w.question, options: w.options || [], answer: w.answer || o, analysisBlock: v, missingPoint: S, missingExplanation: I });
    d({ step: "generate", status: "running", detail: "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC911\u2026", llmInstruction: Q, systemPrompt: N });
    const D = await Se(je(e.profiles, Q, N, Math.min(n.temperature, 0.8), Be(e.signal))), T = qe(D), R = T && typeof T == "object" ? T : {};
    S && typeof R.point == "string" && R.point.trim() && (w = { ...w, point: String(R.point).trim() }), I && typeof R.explanation == "string" && R.explanation.trim() && (w = { ...w, explanation: String(R.explanation).trim() }), d({ step: "generate", status: "done", detail: pn(w) ? "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC644\uB8CC" : "\uD574\uC124\xB7\uC811\uADFC Point \uC77C\uBD80 \uBCF4\uC644", llmInstruction: Q, llmResponse: re(D), systemPrompt: N });
  }
  return { ...w, isGenerated: true };
}
async function Hc(e) {
  const n = Pe(), s = e.question, r = De(s, e.config.choiceCount || 4), o = e.target.kind === "choice" ? Ke(e.target.choiceCount) : r, a = e.target.kind === "choice" ? Math.floor(Math.random() * o) + 1 : 1, c = (s.options || []).map((I) => String(I || "")), d = s.answer && s.answer >= 1 ? s.answer : 1, u = (I) => {
    var _a2;
    return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, I);
  };
  let f = "";
  const m = e.sourcePaths || [];
  if (m.length > 0 && e.readText) {
    u({ step: "rag", status: "running", detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026" });
    const I = [s.question, s.point || "", e.target.userPrompt || ""].filter(Boolean).join(`
`), { chunks: Q } = await kn({ sourcePaths: m, query: I, readText: e.readText });
    f = wn(Q), u({ step: "rag", status: "done", detail: Q.length > 0 ? `${Q.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C", llmInstruction: `query: ${I}`, llmResponse: re(f || "(no excerpts)") });
  }
  const p = n.calcComplexity === "hand" ? "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5]" : "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uACC4\uC0B0\uAE30 \uD544\uC218]", k = Gr({ question: s.question, options: c, answer: s.kind === "choice" ? d : 1, point: s.point || "", explanation: s.explanation || "", ...f ? { ragBlock: f } : {} }), h = Math.min(n.temperature, 0.6);
  u({ step: "analysis", status: "running", detail: "LLM \uBB38\uD56D \uBD84\uC11D \uC911\u2026", llmInstruction: k, systemPrompt: lt });
  const y = await Se(je(e.profiles, k, lt, h, Be(e.signal))), v = Fr(qe(y));
  u({ step: "analysis", status: "done", detail: `${v.coreCategory}${v.isCalculation ? " \xB7 \uACC4\uC0B0\uBB38\uC81C" : ""}`, llmInstruction: k, llmResponse: re(y), systemPrompt: lt });
  const z = ct(v);
  let C = "";
  if (v.isCalculation && v.variables.length > 0) {
    u({ step: "randomize", status: "running", detail: "\uC218\uCE58 \uBCC0\uC218 \uC0D8\uD50C\uB9C1\u2026" });
    const I = qr(v.variables);
    C = Br(I);
    const Q = I.map((D) => `${D.id}=${D.value}${D.unit ? D.unit : ""}`).join(", ");
    u({ step: "randomize", status: "done", detail: Q, llmInstruction: ct(v), llmResponse: re(JSON.stringify({ samples: I, variables: v.variables }, null, 2)) });
  } else u({ step: "randomize", status: "skipped", detail: "\uBE44\uACC4\uC0B0 \uBB38\uD56D", llmResponse: re(ct(v)) });
  const N = Cc({ question: s.question, options: c, answer: s.kind === "choice" ? d : 1, point: s.point || "", explanation: s.explanation || "", sourceKind: s.kind, ...s.answerStyle ? { sourceAnswerStyle: s.answerStyle } : {}, target: e.target, complexity: p, analysisBlock: z, sampledBlock: C, ...e.target.kind === "choice" ? { targetAnswer: a } : {}, ...f ? { ragBlock: f } : {} }), g = jc(n.systemPrompt || Pr);
  u({ step: "generate", status: "running", detail: "\uD30C\uC0DD \uBB38\uD56D \uC791\uC131 \uC911\u2026", llmInstruction: N, systemPrompt: g });
  const $ = await Se(je(e.profiles, N, g, n.temperature, Be(e.signal))), w = qe($);
  u({ step: "generate", status: "done", detail: e.target.kind === "choice" ? `\uC815\uB2F5 ${a}\uBC88 \xB7 ${o}\uC9C0\uC120\uB2E4` : e.target.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615", llmInstruction: N, llmResponse: re($), systemPrompt: g });
  let S = At(w, o, a);
  if (e.target.kind === "subjective" ? S = { kind: "subjective", answerStyle: e.target.answerStyle === "essay" ? "essay" : "short", question: S.question, modelAnswer: S.modelAnswer || "", point: S.point, explanation: S.explanation, isGenerated: true } : S = { kind: "choice", question: S.question, options: et(S.options || [], o), answer: Math.min(o, Math.max(1, S.answer || a)), point: S.point, explanation: S.explanation, isGenerated: true }, !pn(S)) {
    const I = ut(S.point), Q = ft(S.explanation), D = Wr({ question: S.question, options: S.kind === "choice" ? S.options || [] : [], answer: S.kind === "choice" && S.answer ? S.answer : a, analysisBlock: z, missingPoint: I, missingExplanation: Q });
    u({ step: "generate", status: "running", detail: "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC911\u2026", llmInstruction: D, systemPrompt: g });
    const T = await Se(je(e.profiles, D, g, Math.min(n.temperature, 0.8), Be(e.signal))), R = qe(T), U = R && typeof R == "object" ? R : {};
    I && typeof U.point == "string" && U.point.trim() && (S = { ...S, point: String(U.point).trim() }), Q && typeof U.explanation == "string" && U.explanation.trim() && (S = { ...S, explanation: String(U.explanation).trim() }), u({ step: "generate", status: "done", detail: pn(S) ? "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC644\uB8CC" : "\uD574\uC124\xB7\uC811\uADFC Point \uC77C\uBD80 \uBCF4\uC644", llmInstruction: D, llmResponse: re(T), systemPrompt: g });
  }
  return { ...S, isGenerated: true };
}
const Kc = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124\xB7\uC811\uADFC Point \uC791\uC131\uC790\uC785\uB2C8\uB2E4.
\uC8FC\uC5B4\uC9C4 \uBB38\uD56D\uB9CC \uADFC\uAC70\uB85C \uC811\uADFC Point\uC640 \uD574\uC124\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.
- \uC811\uADFC Point: \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C. \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC.
- \uD574\uC124: \uC815\uB2F5 \uADFC\uAC70\xB7\uD568\uC815\xB7\uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124. \uB9C8\uD06C\uB2E4\uC6B4 \uC0AC\uC6A9 \uAC00\uB2A5.
- placeholder \uBB38\uAD6C\uB098 \uBE48 \uBB38\uC790\uC5F4\uB85C \uCC44\uC6B0\uC9C0 \uB9C8\uC138\uC694.
\uC751\uB2F5\uC740 \uC694\uCCAD\uB41C JSON\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
async function Vc(e) {
  var _a2;
  const n = Pe(), s = e.question;
  if (!e.missingPoint && !e.missingExplanation) return {};
  let r = "";
  const o = e.sourcePaths || [];
  if (o.length > 0 && e.readText) {
    const m = [s.question, s.point || "", s.explanation || ""].filter(Boolean).join(`
`), { chunks: p } = await kn({ sourcePaths: o, query: m, readText: e.readText });
    r = wn(p);
  }
  const a = wl({ question: s, missingPoint: e.missingPoint, missingExplanation: e.missingExplanation, ...r ? { ragBlock: r } : {} }), c = await Se(je(e.profiles, a, ((_a2 = n.systemPrompt) == null ? void 0 : _a2.trim()) || Kc, Math.min(n.temperature, 0.8), cs({ signal: e.signal, profileId: e.profileId, model: e.model }))), d = qe(c), u = d && typeof d == "object" && !Array.isArray(d) ? d : {}, f = {};
  return e.missingPoint && typeof u.point == "string" && u.point.trim() && !ut(u.point) && (f.point = String(u.point).trim()), e.missingExplanation && typeof u.explanation == "string" && u.explanation.trim() && !ft(u.explanation) && (f.explanation = String(u.explanation).trim()), f;
}
async function Xc(e) {
  var _a2, _b, _c2, _d2;
  const n = Pe(), s = Array.isArray(e.exampleQuestions) ? e.exampleQuestions : [], r = [...s].reverse().find((g) => g.kind === "choice"), o = r ? De(r, e.config.choiceCount || 4) : e.config.choiceCount || 4, a = Math.min(5, Math.max(1, e.count || 1)), c = e.kind || "choice", d = (e.topic || "").trim(), u = (g) => {
    var _a3;
    return (_a3 = e.onStep) == null ? void 0 : _a3.call(e, g);
  };
  u({ step: "load_sources", status: "running", detail: "\uBB38\uC11C \uC77D\uAE30 \uC911\u2026" }), (_a2 = e.onProgress) == null ? void 0 : _a2.call(e, "\uADFC\uAC70 \uBB38\uC11C \uB85C\uB4DC \uC911\u2026");
  const f = await vc(e.sourcePaths, e.readText, n.ragMaxChars);
  if (!f.length) throw u({ step: "load_sources", status: "error", error: "\uADFC\uAC70 \uBB38\uC11C\uC5D0\uC11C \uB0B4\uC6A9\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4." }), new Error("\uADFC\uAC70 \uBB38\uC11C\uC5D0\uC11C \uB0B4\uC6A9\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  u({ step: "load_sources", status: "done", detail: `${f.length}\uAC1C \uBB38\uC11C`, llmResponse: re(f.map((g) => `- ${g.path} (${g.text.length.toLocaleString()} chars)`).join(`
`)) });
  const m = Fc(s), p = [];
  let k = "";
  for (let g = 0; g < f.length; g += 1) {
    const $ = f[g];
    if (!$) continue;
    if ((_b = e.signal) == null ? void 0 : _b.aborted) throw new DOMException("Aborted", "AbortError");
    const w = `\uBB38\uC11C \uC694\uC57D ${g + 1}/${f.length}: ${$.path}`, S = `[\uCD9C\uC81C \uCC38\uACE0 \uBB38\uD56D \uC608\uC2DC]
\uC81C\uC2DC\uB41C \uBB38\uD56D \uC2A4\uD0C0\uC77C\xB7\uAC1C\uB150 \uBC94\uC704\uB97C \uCC38\uACE0\uD574, \uC544\uB798 \uC6D0\uBB38\uC5D0\uC11C \uCD9C\uC81C\uC5D0 \uD544\uC694\uD55C \uC815\uBCF4\uB9CC \uC8FC\uC81C\uBCC4\uB85C \uC0C1\uC138 \uC694\uC57D\uD558\uC138\uC694.

${m}

[\uC0AC\uC6A9\uC790 \uC8FC\uC81C]
${d || "(\uC608\uC2DC \uBB38\uD56D\xB7\uBB38\uC11C \uD575\uC2EC \uAC1C\uB150)"}

[\uADFC\uAC70 \uBB38\uC11C \uACBD\uB85C]
${$.path}

[\uADFC\uAC70 \uBB38\uC11C \uBCF8\uBB38]
${$.text}

\uC704 \uBCF8\uBB38\uC744 \uC8FC\uC81C\uBCC4 \uB9C8\uD06C\uB2E4\uC6B4 \uC694\uC57D\uC73C\uB85C\uB9CC \uC791\uC131\uD558\uC138\uC694.`;
    u({ step: "summarize", status: "running", detail: w, llmInstruction: S, systemPrompt: tn, ...k ? { llmResponse: k } : {} }), (_c2 = e.onProgress) == null ? void 0 : _c2.call(e, w);
    const I = await Se(je(e.profiles, S, tn, Math.min(n.temperature, 0.7), Be(e.signal))), Q = String(I || "").trim();
    Q && (p.push({ path: $.path, summary: Q }), k += `### ${$.path}

${re(Q, 24e3)}

---

`, u({ step: "summarize", status: "running", detail: w, llmInstruction: S, systemPrompt: tn, llmResponse: k }));
  }
  if (!p.length) throw u({ step: "summarize", status: "error", error: "\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." }), new Error("\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
  u({ step: "summarize", status: "done", detail: `${p.length}\uAC1C \uC694\uC57D \uC644\uB8CC`, llmResponse: re(k), systemPrompt: tn }), (_d2 = e.onProgress) == null ? void 0 : _d2.call(e, "\uC694\uC57D\uBCF8\uC73C\uB85C \uBB38\uD56D \uC0DD\uC131 \uC911\u2026");
  const h = p.map((g, $) => `### \uC694\uC57D\uBCF8 ${$ + 1}
\uACBD\uB85C: ${g.path}

${g.summary}`).join(`

---

`), y = `[\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uBCF8 (${p.length}\uAC1C)]
\uC544\uB798 \uC694\uC57D\uBCF8\uB9CC \uC0AC\uC2E4 \uADFC\uAC70\uB85C \uC0AC\uC6A9\uD558\uC138\uC694. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9\uC740 \uC4F0\uC9C0 \uB9C8\uC138\uC694.

${h}

[\uCD9C\uC81C \uC9C0\uC2DC]
\uC8FC\uC81C: ${d || "(\uC694\uC57D\uBCF8\uC758 \uD575\uC2EC \uAC1C\uB150)"}
\uBB38\uD56D \uC720\uD615: ${c === "subjective" ? "\uC8FC\uAD00\uC2DD" : `\uAC1D\uAD00\uC2DD ${o}\uC9C0\uC120\uB2E4`}
\uC0DD\uC131 \uAC1C\uC218: ${a}

\uAE30\uC874 \uBB38\uD56D \uC2A4\uD0C0\uC77C \uCC38\uACE0:
${m}

JSON \uBC30\uC5F4\uB9CC \uBC18\uD658\uD558\uC138\uC694.`, v = Dc(c, o, a);
  u({ step: "generate", status: "running", detail: "LLM \uBB38\uD56D \uC791\uC131 \uC911\u2026", llmInstruction: y, systemPrompt: v });
  const z = await Se(je(e.profiles, y, v, n.temperature, Be(e.signal))), C = qe(z), N = Array.isArray(C) ? C : [C];
  return u({ step: "generate", status: "done", detail: `${Math.min(N.length, a)}\uAC1C \uBB38\uD56D`, llmInstruction: y, llmResponse: re(z), systemPrompt: v }), N.slice(0, a).map((g, $) => {
    if (c === "subjective") {
      const w = g && typeof g == "object" ? { ...g, kind: "subjective" } : { kind: "subjective" };
      return { ...At(w, o, $ % o + 1), isGenerated: true };
    }
    return { ...At(g, o, $ % o + 1), isGenerated: true };
  });
}
const Zc = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uBB38\uD56D \uD3B8\uC9D1\uC790\uC785\uB2C8\uB2E4. \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB294 \uBB38\uD56D\uC744 \uAD50\uC815\xB7\uC7AC\uC791\uC131\uD569\uB2C8\uB2E4.
- \uC0AC\uC2E4 \uAD00\uACC4\uB97C \uBC14\uB85C\uC7A1\uACE0, \uC9C0\uBB38\xB7\uC120\uD0DD\uC9C0\xB7\uC815\uB2F5\xB7\uD574\uC124\uC774 \uC2DC\uD5D8\uC5D0 \uC4F8 \uC218 \uC788\uC744 \uB9CC\uD07C \uC644\uACB0\uB418\uAC8C \uB9CC\uB4DC\uC138\uC694.
- \uC0AC\uC6A9\uC790\uAC00 \uBC29\uD5A5\uC744 \uC81C\uC2DC\uD558\uBA74 \uADF8\uC5D0 \uB9DE\uAC8C \uC8FC\uC81C\xB7\uB09C\uC774\uB3C4\xB7\uD615\uC2DD\uC744 \uC870\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.
- \uADFC\uAC70 \uBC1C\uCDCC\uAC00 \uC788\uC73C\uBA74 \uADF8 \uBC94\uC704 \uC548\uC5D0\uC11C\uB9CC \uC0AC\uC2E4\uC744 \uC0AC\uC6A9\uD558\uC138\uC694. \uC5C6\uB294 \uB0B4\uC6A9\uC744 \uC9C0\uC5B4\uB0B4\uC9C0 \uB9C8\uC138\uC694.
- \uAC1D\uAD00\uC2DD \uC120\uD0DD\uC9C0 \uC548\uC5D0\uC11C\uB294 \uC778\uB77C\uC778 \uC218\uC2DD($...$)\uB9CC \uC0AC\uC6A9\uD558\uC138\uC694.
- \uC751\uB2F5\uC740 JSON \uAC1D\uCCB4 \uD558\uB098\uB9CC \uBC18\uD658\uD558\uC138\uC694. \uB2E4\uB978 \uD14D\uC2A4\uD2B8\xB7\uB9C8\uD06C\uB2E4\uC6B4\xB7\uCF54\uB4DC\uD39C\uC2A4\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.`;
function Yc(e, n) {
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
function ed(e) {
  const n = e.config.choiceCount || 4, s = e.question, r = String(e.userInstructions || "").trim(), o = s.kind === "subjective" ? `\uC8FC\uAD00\uC2DD(${s.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615"})\uC744 \uC720\uC9C0\uD558\uC138\uC694. \uC0AC\uC6A9\uC790\uAC00 \uC720\uD615 \uBCC0\uACBD\uC744 \uBA85\uC2DC\uD558\uC9C0 \uC54A\uC558\uB2E4\uBA74 \uAC1D\uAD00\uC2DD\uC73C\uB85C \uBC14\uAFB8\uC9C0 \uB9C8\uC138\uC694.` : `\uAC1D\uAD00\uC2DD ${n}\uC9C0\uC120\uB2E4\uB97C \uC720\uC9C0\uD558\uC138\uC694. options \uAE38\uC774\uB294 \uC815\uD655\uD788 ${n}, answer\uB294 1~${n} \uC815\uC218\uC785\uB2C8\uB2E4.`, a = s.kind === "subjective" ? '{"kind":"subjective","answerStyle":"short"|"essay","question":"...","modelAnswer":"...","point":"...","explanation":"..."}' : `{"kind":"choice","question":"...","options":[${Array.from({ length: n }, () => '"..."').join(",")}],"answer":1,"point":"...","explanation":"..."}`;
  return `\uB2E4\uC74C \uBB38\uD56D\uC740 \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB2E4\uACE0 \uAC04\uC8FC\uB429\uB2C8\uB2E4. \uAD50\uC815\uB41C \uC644\uC131 \uBB38\uD56D\uC744 JSON\uC73C\uB85C \uBC18\uD658\uD558\uC138\uC694.

${Yc(s, n)}

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
async function td(e) {
  const n = Pe(), s = e.question, r = De(s, e.config.choiceCount || 4), o = (k) => {
    var _a2;
    return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, k);
  }, a = s.kind === "choice" && s.answer && s.answer >= 1 ? Math.min(r, s.answer) : 1;
  let c = "";
  const d = e.sourcePaths || [];
  if (d.length > 0 && e.readText) {
    o({ step: "rag", status: "running", detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026" });
    const k = [s.question, s.point || "", String(e.userInstructions || "").trim()].filter(Boolean).join(`
`), { chunks: h } = await kn({ sourcePaths: d, query: k, readText: e.readText });
    c = wn(h), o({ step: "rag", status: "done", detail: h.length > 0 ? `${h.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C" });
  } else o({ step: "rag", status: "skipped", detail: "\uADFC\uAC70 \uC5C6\uC74C" });
  const u = ed({ question: s, config: e.config, ...String(e.userInstructions || "").trim() ? { userInstructions: String(e.userInstructions).trim() } : {}, ...c ? { ragBlock: c } : {} });
  o({ step: "generate", status: "running", detail: "\uBB38\uD56D \uAD50\uC815 \uC911\u2026" });
  const f = await Se(je(e.profiles, u, Zc, n.temperature, Be(e.signal))), m = qe(f), p = m && typeof m == "object" && !Array.isArray(m) ? m : Array.isArray(m) && m[0] ? m[0] : m;
  return o({ step: "generate", status: "done", detail: "\uAD50\uC815 \uC644\uB8CC" }), At(p, r, a);
}
function nd(e) {
  const n = Array.from({ length: e }, (s, r) => r);
  for (let s = n.length - 1; s > 0; s -= 1) {
    const r = Math.floor(Math.random() * (s + 1)), o = n[s];
    n[s] = n[r], n[r] = o;
  }
  return n;
}
function sd(e) {
  const n = /* @__PURE__ */ new Map();
  for (let s = 0; s < e.length; s += 1) {
    const r = e[s];
    n.set(r + 1, s + 1);
  }
  return n;
}
function rd(e, n) {
  if (e.kind !== "choice") return null;
  const s = e.options || [];
  if (s.length < 2) return null;
  const r = n ?? nd(s.length);
  if (r.length !== s.length) return null;
  const o = r.map((f) => s[f] ?? ""), a = Math.max(0, (e.answer ?? 1) - 1), c = r.indexOf(a), d = c >= 0 ? c + 1 : e.answer, u = sd(r);
  return { question: { ...e, options: o, ...d != null ? { answer: d } : {} }, oldToNew: u };
}
function od(e, n) {
  if (typeof e != "number" || !Number.isFinite(e)) return e;
  const s = Math.round(e);
  return n.get(s) ?? e;
}
function id(e, n) {
  const s = {};
  for (const [r, o] of Object.entries(e)) {
    const a = r.lastIndexOf("_");
    if (a <= 0) continue;
    const c = r.slice(0, a), d = Number.parseInt(r.slice(a + 1), 10);
    if (!c || !Number.isFinite(d) || d < 1) continue;
    const u = n.get(c);
    if (!u) {
      s[r] = o;
      continue;
    }
    const f = u.get(d);
    f != null && (s[Ye(c, f)] = o);
  }
  return s;
}
function ad(e, n) {
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
function ld(e) {
  const n = /* @__PURE__ */ new Map();
  let s = 0;
  const r = e.questions.map((u) => {
    var _a2;
    const f = rd(u, (_a2 = e.permutationByQuestionId) == null ? void 0 : _a2.get(u.id));
    return f ? (n.set(u.id, f.oldToNew), s += 1, f.question) : u;
  }), o = { ...e.userAnswers };
  for (const u of e.questions) {
    if (u.kind !== "choice") continue;
    const f = n.get(u.id);
    if (!f) continue;
    const m = od(o[u.id], f);
    m !== void 0 && (o[u.id] = m);
  }
  const a = id(e.wrongExps, n), c = ad(e.wrongExpFocus, n), d = Zn(a);
  return { questions: r, userAnswers: o, wrongExps: a, wrongExpFocus: c, wrongChoiceExplanations: d, optionMapsByQuestionId: n, shuffledQuestionCount: s };
}
function cd(e, n, s) {
  const r = s.get(e);
  return r ? r.get(n) ?? null : n;
}
function mr(e, n, s) {
  const r = at(e, n);
  if (!r) return "";
  const o = String(s || "").trim();
  if (o) return o;
  const a = as(r.id, r.kind).trim();
  return a || bi(r.kind);
}
function dd(e) {
  const [n, s] = i.useState(""), [r, o] = i.useState(""), a = i.useCallback(() => {
    var _a2;
    const f = Pe(), p = ((_a2 = at(e, f.profileId || is())) == null ? void 0 : _a2.id) ?? "";
    s(p), o(mr(e, p, f.modelId));
  }, [e]);
  i.useEffect(() => {
    a();
    const f = () => a();
    return window.addEventListener(fn, f), () => window.removeEventListener(fn, f);
  }, [a]);
  const c = i.useCallback((f) => {
    const m = f.trim();
    s(m), gi(m);
    const p = at(e, m), k = p ? mr(e, p.id, null) : "";
    o(k), Js({ profileId: m || null, modelId: k || null });
  }, [e]), d = i.useCallback((f) => {
    const m = f.trim();
    o(m), Js({ modelId: m || null });
    const p = at(e, n);
    p && Nt(p.id, m);
  }, [e, n]), u = i.useMemo(() => {
    const f = {}, m = n.trim(), p = r.trim();
    return m && (f.profileId = m), p && (f.model = p), f;
  }, [n, r]);
  return { profileId: n, model: r, onProfileIdChange: c, onModelChange: d, llmOpts: u, syncFromSettings: a };
}
const ud = 0.12;
function pr(e, n, s, r = 0) {
  const [o, a] = i.useState(true), c = i.useRef(true);
  return i.useEffect(() => {
    if (!s) {
      c.current = true, a(true);
      return;
    }
    let d = 0, u = null;
    const f = (h) => {
      c.current !== h && (c.current = h, a(h));
    }, m = () => {
      u == null ? void 0 : u.disconnect();
      const h = e.current, y = n.current;
      !h || !y || (u = new IntersectionObserver(([v]) => {
        v && (cancelAnimationFrame(d), d = requestAnimationFrame(() => {
          f(v.isIntersecting);
        }));
      }, { root: h, threshold: ud }), u.observe(y));
    };
    m();
    const p = e.current, k = typeof ResizeObserver < "u" && p != null ? new ResizeObserver(() => {
      m();
    }) : null;
    return p != null && (k == null ? void 0 : k.observe(p)), () => {
      cancelAnimationFrame(d), u == null ? void 0 : u.disconnect(), k == null ? void 0 : k.disconnect();
    };
  }, [s, r, e, n]), o;
}
function fd({ profiles: e, profileId: n, model: s, onProfileIdChange: r, onModelChange: o, busy: a = false }) {
  return t.jsxs("section", { "aria-label": "\uD034\uC988 AI \uC81C\uACF5\uC790", className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-odp-borderSoft dark:bg-odp-surface", children: [t.jsxs("div", { className: "mb-3 flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-odp-fgStrong", children: [t.jsx(Zi, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-400", "aria-hidden": true }), "AI \uC81C\uACF5\uC790"] }), t.jsx(wr, { profiles: e, profileId: n, model: s, onProfileIdChange: r, onModelChange: o, disabled: a })] });
}
const md = i.memo(fd);
function pd(e) {
  return Zr(e).map((n) => n.id === "generate" ? { ...n, label: "\uD30C\uC0DD \uBB38\uD56D \uC0DD\uC131" } : n);
}
function Zr(e) {
  const n = [];
  return e && n.push({ id: "rag", label: "\uADFC\uAC70 \uBC1C\uCDCC", status: "pending" }), n.push({ id: "analysis", label: "\uBB38\uD56D \uAD6C\uC870 \uBD84\uC11D", status: "pending" }, { id: "randomize", label: "\uBCC0\uC218 \uC0D8\uD50C\uB9C1", status: "pending" }, { id: "generate", label: "\uC720\uC0AC \uBB38\uD56D \uC0DD\uC131", status: "pending" }, { id: "finalize", label: "\uBB38\uD56D \uCD94\uAC00", status: "pending" }), n;
}
function xd() {
  return [{ id: "load_sources", label: "\uADFC\uAC70 \uBB38\uC11C \uB85C\uB4DC", status: "pending" }, { id: "summarize", label: "\uBB38\uC11C \uC694\uC57D", status: "pending" }, { id: "generate", label: "\uBB38\uD56D \uC0DD\uC131", status: "pending" }, { id: "finalize", label: "\uBB38\uD56D \uCD94\uAC00", status: "pending" }];
}
function sn(e, n = 72) {
  const s = String(e || "").replace(/\s+/g, " ").trim();
  return s.length <= n ? s : `${s.slice(0, n - 1)}\u2026`;
}
const Yr = "s3haim_quiz_gen_queue_panel_size", hd = 280, gd = 180, Un = 380, Gn = 320;
function eo(e) {
  const n = Math.min(window.innerWidth * 0.92, 720), s = Math.min(window.innerHeight * 0.72, 640);
  return { width: Math.min(n, Math.max(hd, Math.round(e.width))), height: Math.min(s, Math.max(gd, Math.round(e.height))) };
}
function bd() {
  try {
    const e = typeof window < "u" ? window.localStorage.getItem(Yr) : null;
    if (!e) return { width: Un, height: Gn };
    const n = JSON.parse(e);
    return eo({ width: Number(n.width) || Un, height: Number(n.height) || Gn });
  } catch {
    return { width: Un, height: Gn };
  }
}
function kd(e) {
  try {
    typeof window < "u" && window.localStorage.setItem(Yr, JSON.stringify(e));
  } catch {
  }
}
function wd(e, n) {
  const s = e.steps.map((r) => {
    if (r.id !== n.step) return r;
    const o = { ...r, status: n.status };
    return n.detail !== void 0 && (o.detail = n.detail), n.error !== void 0 && (o.error = n.error), n.llmInstruction !== void 0 && (o.llmInstruction = n.llmInstruction), n.llmResponse !== void 0 && (o.llmResponse = n.llmResponse), n.systemPrompt !== void 0 && (o.systemPrompt = n.systemPrompt), n.status === "running" && delete o.error, o;
  });
  return { ...e, steps: s };
}
function Wn() {
  return `quiz-gen-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function yd() {
  const [e, n] = i.useState([]), s = i.useRef(e);
  s.current = e;
  const [r, o] = i.useState(false), [a, c] = i.useState(() => bd()), d = i.useRef(false), u = i.useRef(false), f = i.useRef(false), m = i.useRef(0), p = i.useCallback((E) => {
    const L = eo(E);
    c(L), kd(L);
  }, []), k = i.useCallback(() => {
    d.current = true;
  }, []), h = i.useCallback((E) => {
    u.current = E;
  }, []), y = i.useCallback((E) => {
    f.current = E;
  }, []), v = i.useCallback(() => u.current || f.current, []), z = i.useCallback(() => {
    d.current = true, o(true);
  }, []), C = i.useCallback(() => {
    d.current = false, u.current = false, f.current = false, o(false);
  }, []), N = i.useCallback(() => {
    o(true);
  }, []), g = i.useCallback((E) => s.current.find((L) => L.id === E) ?? null, []), $ = i.useCallback((E) => {
    const L = Wn(), J = { id: L, kind: "similar", questionLabel: E.displayLabel, questionPreview: sn(E.preview), status: "running", steps: Zr(E.hasRag), createdAt: Date.now() };
    return n((_) => [J, ..._]), N(), L;
  }, [N]), w = i.useCallback((E) => {
    const L = Wn(), J = { id: L, kind: "derived", questionLabel: E.displayLabel, questionPreview: sn(E.preview), status: "running", steps: pd(E.hasRag), createdAt: Date.now() };
    return n((_) => [J, ..._]), N(), L;
  }, [N]), S = i.useCallback((E) => {
    var _a2;
    const L = Wn(), J = ((_a2 = E.topic) == null ? void 0 : _a2.trim()) || sn(E.preview) || "\uADFC\uAC70 \uAE30\uBC18 \uCD9C\uC81C", _ = { id: L, kind: "source", questionPreview: sn(J), status: "running", steps: xd(), createdAt: Date.now() };
    return n((le) => [_, ...le]), N(), L;
  }, [N]), I = i.useCallback((E, L) => {
    n((J) => J.map((_) => _.id === E ? wd(_, L) : _));
  }, []), Q = i.useCallback((E, L) => {
    n((J) => J.map((_) => _.id === E ? { ..._, logPath: L } : _));
  }, []), D = i.useCallback((E, L) => {
    n((J) => J.map((_) => _.id === E ? { ..._, resultQuestionId: L } : _));
  }, []), T = i.useCallback((E, L) => {
    n((J) => J.map((_) => _.id === E ? { ..._, status: "done", ...L ? { resultLabel: L } : {} } : _));
  }, []), R = i.useCallback((E, L) => {
    n((J) => J.map((_) => _.id === E ? { ..._, status: "error", error: L } : _));
  }, []), U = i.useCallback((E) => {
    n((L) => L.filter((J) => J.id !== E));
  }, []), B = i.useCallback(() => {
    n((E) => E.filter((L) => L.status === "running"));
  }, []), V = e.some((E) => E.status === "running");
  return i.useEffect(() => {
    const E = e.filter((_) => _.status === "running").length, L = m.current > 0;
    if (m.current = E, !r || !L || E > 0 || d.current || v()) return;
    const J = window.requestAnimationFrame(() => {
      d.current || v() || C();
    });
    return () => window.cancelAnimationFrame(J);
  }, [C, v, e, r]), { jobs: e, panelOpen: r, panelSize: a, setPanelSize: p, openPanel: z, closePanel: C, setPanelOpen: o, markPanelUserEngaged: k, markPanelPointerEngaged: h, markPanelFocusEngaged: y, getJob: g, createSimilarJob: $, createDerivedJob: w, createSourceJob: S, updateJobStep: I, setJobLogPath: Q, setJobResultQuestionId: D, completeJob: T, failJob: R, removeJob: U, clearFinishedJobs: B, hasActiveJobs: V };
}
function Jn(e, n, s) {
  return !e || s == null ? n : n + Math.max(0, Date.now() - s);
}
function vd({ initialLog: e, hydrateKey: n = 0, onLogChange: s }) {
  const [r, o] = i.useState(() => Yn(e ?? Pt())), [a, c] = i.useState(0), d = i.useRef(null), u = i.useRef(s), f = i.useRef(e);
  u.current = s, f.current = e;
  const m = yt(r), p = r.events.length > 0, k = ki(r), h = vt(r);
  i.useEffect(() => {
    const g = Yn(f.current ?? Pt());
    o(g), yt(g) ? d.current = Date.now() : d.current = null;
  }, [n]), i.useEffect(() => {
    if (!m) return;
    const g = window.setInterval(() => c(($) => $ + 1), 200);
    return () => window.clearInterval(g);
  }, [m]);
  const y = i.useMemo(() => Jn(m, h, d.current), [m, h, a]), v = i.useCallback(() => {
    d.current = Date.now(), o((g) => {
      var _a2;
      const $ = $t(g, "start", 0);
      return (_a2 = u.current) == null ? void 0 : _a2.call(u, $), $;
    });
  }, []), z = i.useCallback(() => {
    o((g) => {
      var _a2;
      if (!yt(g)) return g;
      const $ = Jn(true, vt(g), d.current);
      d.current = null;
      const w = $t(g, "pause", $);
      return (_a2 = u.current) == null ? void 0 : _a2.call(u, w), w;
    });
  }, []), C = i.useCallback(() => {
    o((g) => {
      var _a2;
      if (yt(g)) return g;
      const $ = vt(g);
      d.current = Date.now();
      const w = $t(g, "resume", $);
      return (_a2 = u.current) == null ? void 0 : _a2.call(u, w), w;
    });
  }, []), N = i.useCallback(() => {
    o((g) => {
      var _a2;
      const $ = yt(g) ? Jn(true, vt(g), d.current) : vt(g);
      d.current = null;
      const w = $t(g, "stop", $);
      return (_a2 = u.current) == null ? void 0 : _a2.call(u, w), w;
    });
  }, []);
  return { log: r, displayMs: y, running: m, started: p, examInProgress: k, start: v, pause: z, resume: C, stop: N };
}
function Sd(e) {
  const n = e.lastIndexOf(".");
  return n >= 0 ? e.slice(n + 1).toLowerCase() : "";
}
function Ct(e) {
  if (e) try {
    URL.revokeObjectURL(e);
  } catch {
  }
}
async function jd({ backend: e, storageType: n, path: s }) {
  var _a2, _b;
  if (!e || !s) return null;
  const r = Mt(s), o = Sd(r), a = [...wi], c = ["mp4", "webm", "ogv", "mov", "mkv"], d = ["m4a", "mp3", "wav", "ogg", "aac", "flac", "weba"];
  if (a.includes(o) && e.getObjectUrl) {
    let p = await e.getObjectUrl(s);
    if (o === "heic" || o === "heif") {
      const h = await ((_a2 = e.readBytes) == null ? void 0 : _a2.call(e, s));
      if (h == null ? void 0 : h.body) {
        Ct(p);
        const y = h.body instanceof Uint8Array ? h.body : new Uint8Array(h.body), v = y.buffer.slice(y.byteOffset, y.byteOffset + y.byteLength);
        p = await yi(new Blob([v]), r);
      }
    }
    const k = await ((_b = e.head) == null ? void 0 : _b.call(e, s));
    return { currentFile: { type: n, id: s, name: r, viewer: "image", objectUrl: p, size: (k == null ? void 0 : k.contentLength) ?? null }, content: "", revoke: () => Ct(p) };
  }
  if (o === "pdf" && e.readBytes) {
    const { body: p, contentLength: k } = await e.readBytes(s), h = p instanceof Uint8Array ? p : new Uint8Array(p), y = h.buffer.slice(h.byteOffset, h.byteOffset + h.byteLength), v = new Blob([y], { type: "application/pdf" }), z = URL.createObjectURL(v);
    return { currentFile: { type: n, id: s, name: r, viewer: "pdf", objectUrl: z, size: k ?? null }, content: "", revoke: () => Ct(z) };
  }
  if (d.includes(o) && e.getObjectUrl) {
    const p = await e.getObjectUrl(s);
    return { currentFile: { type: n, id: s, name: r, viewer: "audio", objectUrl: p }, content: "", revoke: () => Ct(p) };
  }
  if (c.includes(o) && e.getObjectUrl) {
    const p = await e.getObjectUrl(s);
    return { currentFile: { type: n, id: s, name: r, viewer: "video", objectUrl: p }, content: "", revoke: () => Ct(p) };
  }
  if (!e.readText) return null;
  if (o === "json") {
    const { text: p, contentLength: k, lastModified: h } = await e.readText(s);
    let y = p;
    if (p.length <= 1e5) try {
      y = JSON.stringify(JSON.parse(p), null, 2);
    } catch {
      y = p;
    }
    return { currentFile: { type: n, id: s, name: r, viewer: "json", content: y, ...k != null ? { size: k } : {}, ...h != null ? { lastModified: h } : {} }, content: y };
  }
  if (o === "html" || o === "htm" || o === "svg") {
    const { text: p, contentLength: k, lastModified: h } = await e.readText(s);
    return { currentFile: { type: n, id: s, name: r, viewer: o === "svg" ? "svg" : "html", content: p, ...k != null ? { size: k } : {}, ...h != null ? { lastModified: h } : {} }, content: p };
  }
  if (o === "md" || o === "markdown" || o === "" || Vt(s) || Vt(r)) {
    const { text: p, contentLength: k, lastModified: h } = await e.readText(s);
    if (Vt(s) || Vt(r)) {
      const y = await vi(s, p);
      return y.status === "need-password" ? { currentFile: { type: n, id: s, name: r, viewer: "markdown", content: "", ...k != null ? { size: k } : {}, encMd: true, ...h != null ? { lastModified: h } : {} }, content: "", needsEncMdPassword: true } : { currentFile: { type: n, id: s, name: r, viewer: "markdown", content: y.text, ...k != null ? { size: k } : {}, encMd: true, ...h != null ? { lastModified: h } : {} }, content: y.text };
    }
    return { currentFile: { type: n, id: s, name: r, viewer: "markdown", content: p, ...k != null ? { size: k } : {}, ...h != null ? { lastModified: h } : {} }, content: p };
  }
  const { text: u, contentLength: f, lastModified: m } = await e.readText(s);
  return { currentFile: { type: n, id: s, name: r, viewer: "raw", content: u, ...f != null ? { size: f } : {}, ...m != null ? { lastModified: m } : {} }, content: u };
}
async function Cd(e, n) {
  const s = String(e || "").trim();
  if (!s) return null;
  const { storageType: r, localTree: o, webdavTree: a, s3Tree: c, localRootHandle: d } = n;
  let u = null;
  return r === rn ? u = on(o, s) || an(o, s) || (d ? await Si(d, s) : null) : r === ln ? u = on(a, s) || an(a, s) : u = on(c, s) || an(c, s), (u == null ? void 0 : u.type) !== "file" ? { type: "file", path: s, name: Mt(s) } : { type: "file", path: String(u.path || s), name: String(u.name || Mt(s)), ...u.lastModified != null ? { lastModified: u.lastModified } : {} };
}
const Nd = 2e4, xr = "flex h-6 max-h-6 min-w-0 items-center overflow-hidden", $d = "z-100010 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", hr = "flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-gray-800 outline-none hover:bg-gray-100 focus:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg dark:focus:bg-odp-focusBg";
function _d({ content: e, onChange: n, onSave: s, currentFile: r, onResolveWikiImageUrl: o, llmProviderProfiles: a = [], isActiveFile: c = true, isSurfaceLive: d = true, registerToolbar: u, registerFileManagement: f }) {
  const { showToast: m } = ji(), { showAlert: p } = Ci(), k = Ni(), h = yd(), { storageMode: y, s3Tree: v, localTree: z, webdavTree: C, localRootHandle: N, getBackendForType: g, loadLocalFolderChildren: $, loadWebdavFolderChildren: w } = $i(), { openAdvancedSearchFile: S, selectFileRaw: I } = Pi(), Q = i.useCallback((l) => {
    k == null ? void 0 : k.openAssist(), m({ message: l || "AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\xB7\uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.", durationMs: 3500 });
  }, [k, m]), D = dd(a), T = i.useCallback(async (l) => {
    const x = await qc(a, { ...D.llmOpts, ...l });
    return x.ready ? true : (Q(x.message), false);
  }, [a, Q, D.llmOpts]), R = i.useCallback((l, x, b) => {
    const j = (x instanceof Error ? x.message : "") || b;
    if (Bc(j)) {
      Q(j);
      return;
    }
    if (j.length >= 48 || j.includes(`
`)) {
      p({ title: l, message: j });
      return;
    }
    m({ message: j, durationMs: 4e3 });
  }, [Q, p, m]), U = i.useMemo(() => y === rn ? z : y === ln ? C : v, [y, z, C, v]), B = y === rn ? "local" : y === ln ? "webdav" : "s3", V = B, E = i.useCallback(async (l) => {
    const x = g(B);
    return jd({ backend: x, storageType: V, path: l });
  }, [g, B, V]), L = i.useCallback((l) => {
    S(l);
  }, [S]), J = i.useCallback(async (l) => {
    const x = await Cd(l, { storageType: V, localTree: z, webdavTree: C, s3Tree: v, localRootHandle: N });
    if (x) {
      await I(B, x, { background: true });
      return;
    }
    S(l);
  }, [V, z, C, v, N, I, B, S]), _ = i.useCallback((l) => {
    pt(true), xt(l);
  }, []), le = i.useCallback(() => {
    pt(false), xt(null);
  }, []), be = i.useCallback(async (l) => {
    const x = g(B);
    if (!(x == null ? void 0 : x.readText)) return null;
    const { text: b } = await x.readText(l);
    return typeof b == "string" ? b : null;
  }, [g, B]), oe = i.useCallback(async (l, x) => {
    const b = r == null ? void 0 : r.id;
    if (!b) return;
    await new Promise((M) => {
      window.setTimeout(M, 0);
    });
    const j = h.getJob(l);
    if (!j) return;
    const A = g(B);
    if (A == null ? void 0 : A.writeText) try {
      const M = await Mc({ quizFilePath: b, logKey: x, job: j, writeText: (G, W) => A.writeText(G, W, "text/markdown; charset=utf-8") });
      h.setJobLogPath(l, M);
    } catch {
    }
  }, [r == null ? void 0 : r.id, h, g, B]), X = i.useCallback((l, x, b) => {
    h.updateJobStep(l, b), oe(l, x);
  }, [h, oe]), ke = i.useCallback(async (l) => {
    y === rn ? await ($ == null ? void 0 : $(l)) : y === ln && await (w == null ? void 0 : w(l));
  }, [y, $, w]), [P, O] = i.useState(() => it(e)), q = i.useRef(e), ce = i.useRef(false), Ce = i.useRef(false), Qe = i.useRef(null), de = i.useRef(P);
  de.current = P;
  const [ne, Ve] = i.useState({}), [ie, Ge] = i.useState({}), ds = i.useRef(ie);
  ds.current = ie;
  const [to, Ee] = i.useState({}), [ae, yn] = i.useState({}), [Te, we] = i.useState({}), tt = i.useRef(Te);
  tt.current = Te;
  const [Qt, st] = i.useState({}), [ue, We] = i.useState(null), [fe, nt] = i.useState({}), [me, Tt] = i.useState(false), [vn, mt] = i.useState("all"), [Sn, us] = i.useState(false), [_t, pt] = i.useState(false), [no, xt] = i.useState(null), [so, jn] = i.useState(false), [ht, Cn] = i.useState(null), [Xe, pe] = i.useState(null), [fs, Dt] = i.useState(false), [xe, Ft] = i.useState(null), [rt, Nn] = i.useState(null), [ms, $n] = i.useState(false), [Je, qt] = i.useState(null), [ro, Bt] = i.useState({}), Pn = i.useRef(null), En = i.useRef(null), Ne = i.useRef(null), gt = i.useRef(null), ps = i.useRef(null), xs = i.useRef(null), [ye, bt] = i.useState(() => Pt()), [oo, zn] = i.useState(0), se = vd({ initialLog: ye, hydrateKey: oo, onLogChange: bt }), hs = i.useRef(() => 0);
  hs.current = () => se.displayMs;
  const io = i.useMemo(() => P.questions.map((l) => ({ id: l.id, displayLabel: l.displayLabel })), [P.questions]);
  El({ scrollRootRef: gt, questions: io, running: se.running, getElapsedMs: () => hs.current(), timeLog: ye, onLogChange: bt });
  const Ze = i.useCallback(() => Fn({ questions: de.current.questions, userAnswers: ne, gradedQuestions: ie, subjectiveGrades: fe, isSubmitted: me, ...Dn(ye) ? {} : { timeLog: ye }, wrongChoiceExplanations: Zn(Te), ...St(ae) ? {} : { questionMemos: ae } }), [ne, ie, fe, me, ye, Te, ae]), Ut = i.useCallback(() => {
    if (!Ce.current || !c) return false;
    const l = Ze();
    if (!Hl(l)) return false;
    const x = it(q.current).session;
    if (!lr(l, x)) return true;
    const b = typeof (r == null ? void 0 : r.content) == "string" ? r.content : "";
    if (!b) return true;
    const j = it(b).session;
    return !lr(l, j);
  }, [Ze, r == null ? void 0 : r.content, c]), Gt = i.useCallback((l) => {
    const x = Yn(l == null ? void 0 : l.timeLog);
    if (bt(x), zn((j) => j + 1), !l || ss(l)) {
      Ve({}), Ge({}), Ee({}), we({}), st({}), We(null), yn({}), nt({}), Tt(false);
      return;
    }
    Ve({ ...l.userAnswers }), Ge({ ...l.gradedQuestions }), nt({ ...l.subjectiveGrades }), Tt(l.isSubmitted), we(Ei(l.wrongChoiceExplanations)), yn({ ...l.questionMemos ?? {} }), st({}), We(null);
    const b = {};
    for (const [j, A] of Object.entries(l.gradedQuestions)) A && (b[j] = true);
    Ee(b);
  }, []), he = i.useCallback((l, x) => {
    const b = yr(l.config, l.questions, x);
    ce.current = true, q.current = b, n(b);
  }, [n]), Wt = i.useCallback(() => {
    if (!Ce.current) return;
    Qe.current != null && (clearTimeout(Qe.current), Qe.current = null);
    const l = Ze();
    he(de.current, l);
  }, [Ze, he]), ot = i.useCallback(async (l) => {
    if (!(!Pe().autoSaveOnAiGenerate || typeof s != "function")) {
      if (l) {
        const x = Fn({ questions: de.current.questions, userAnswers: ne, gradedQuestions: ie, subjectiveGrades: fe, isSubmitted: me, ...Dn(ye) ? {} : { timeLog: ye }, wrongChoiceExplanations: Zn(l), ...St(ae) ? {} : { questionMemos: ae } });
        he(de.current, x);
      } else Wt();
      await s(null, { skipCoverChangeCheck: true, skipSuffixCheck: true, contentOverride: q.current });
    }
  }, [Wt, ie, me, s, he, fe, ye, ne, ae]);
  i.useEffect(() => {
    if (e === q.current) return;
    if (q.current = e, ce.current) {
      ce.current = false;
      return;
    }
    const l = it(e);
    O(l), Gt(l.session);
  }, [e, Gt]), i.useEffect(() => {
    const l = it(q.current);
    Gt(l.session), Ce.current = true;
  }, [Gt]), i.useEffect(() => {
    if (!Ce.current) return;
    const l = Ze();
    return Qe.current != null && clearTimeout(Qe.current), Qe.current = setTimeout(() => {
      Qe.current = null, he(de.current, l);
    }, Nd), () => {
      Qe.current != null && (clearTimeout(Qe.current), Qe.current = null);
    };
  }, [ne, ie, fe, me, ye, Te, ae, Ze, he]);
  const gs = i.useCallback(async () => {
    const l = Gl(de.current, { questions: de.current.questions, userAnswers: ne, gradedQuestions: ie, isSubmitted: me, subjectiveGrades: fe });
    if (!l) {
      m({ message: "\uCD94\uCD9C\uD560 \uD2C0\uB9B0 \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uCC44\uC810 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.", durationMs: 3500 });
      return;
    }
    const x = r == null ? void 0 : r.id;
    if (!x) return;
    const b = g(B);
    if (!(b == null ? void 0 : b.writeText)) {
      m({ message: "\uC800\uC7A5\uC18C\uC5D0 \uC4F8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.", durationMs: 3e3 });
      return;
    }
    try {
      const j = await Jl(x, async (A) => {
        if (!b.head) return false;
        try {
          return await b.head(A), true;
        } catch {
          return false;
        }
      });
      await b.writeText(j, l.markdown, "text/markdown; charset=utf-8"), await S(j), m({ message: `\uD2C0\uB9B0 \uBB38\uC81C ${l.questions.length}\uAC1C\uB97C \uC0C8 \uD034\uC988\uB85C \uCD94\uCD9C\uD588\uC2B5\uB2C8\uB2E4.`, durationMs: 4e3 });
    } catch (j) {
      R("\uD2C0\uB9B0\uBB38\uC81C \uCD94\uCD9C", j, "\uD30C\uC77C\uC744 \uC0DD\uC131\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [ne, ie, me, fe, r == null ? void 0 : r.id, g, B, S, m, R]);
  i.useEffect(() => {
    if (!c || gr()) return;
    const l = (x) => {
      Ut() && (x.preventDefault(), x.returnValue = "");
    };
    return window.addEventListener("beforeunload", l), () => window.removeEventListener("beforeunload", l);
  }, [c, Ut]);
  const ge = i.useCallback((l) => {
    const x = { ...l, config: Zs(l.config, l.questions) };
    de.current = x, O(x);
    const b = Ze();
    he(x, b);
  }, [Ze, he]), bs = i.useCallback(() => {
    const l = de.current, x = ld({ questions: l.questions, userAnswers: ne, wrongExps: Te, wrongExpFocus: Qt });
    if (x.shuffledQuestionCount <= 0) {
      m({ message: "\uC120\uD0DD\uC9C0\uAC00 2\uAC1C \uC774\uC0C1\uC778 \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", durationMs: 2800 });
      return;
    }
    Ve(x.userAnswers), we(x.wrongExps), st(x.wrongExpFocus), We((A) => {
      if (!A) return null;
      const M = cd(A.questionId, A.option, x.optionMapsByQuestionId);
      return M == null ? null : { ...A, option: M };
    });
    const b = { ...l, questions: x.questions, config: Zs(l.config, x.questions) };
    O(b);
    const j = Fn({ questions: b.questions, userAnswers: x.userAnswers, gradedQuestions: ie, subjectiveGrades: fe, isSubmitted: me, ...Dn(ye) ? {} : { timeLog: ye }, wrongChoiceExplanations: x.wrongChoiceExplanations, ...St(ae) ? {} : { questionMemos: ae } });
    he(b, j), m({ message: `${x.shuffledQuestionCount}\uAC1C \uBB38\uD56D\uC758 \uC120\uD0DD\uC9C0 \uC21C\uC11C\uB97C \uBCC0\uACBD\uD588\uC2B5\uB2C8\uB2E4.`, durationMs: 3200 });
  }, [ne, Te, Qt, ie, fe, me, ye, ae, he, m]);
  i.useEffect(() => {
    if (!(!c || !d || !f)) return f({ extractWrongQuestions: gs, shuffleChoiceOptions: bs, hasUnsavedProgress: Ut, flushBeforeSave: Wt }), () => f(null);
  }, [c, d, f, gs, bs, Ut, Wt]);
  const In = i.useCallback((l) => {
    const x = de.current;
    ge({ ...x, config: zi(x.config, l) }), xt((b) => b === l ? null : b);
  }, [ge]), ao = i.useCallback((l, x) => {
    const b = de.current;
    ge({ ...b, config: Ii(b.config, l, x) });
  }, [ge]), lo = i.useCallback((l) => {
    if (Hr()) {
      Cn(l);
      return;
    }
    In(l);
  }, [In]), { setQuizSourceDropActive: Rn, setQuizSourceDropHost: Jt, handleRegisterQuizSourceDrop: Mn } = Ri(), ks = i.useRef(null), ws = i.useRef(null), ys = i.useRef(null), vs = i.useRef(null), Ss = i.useRef(Je);
  Ss.current = Je;
  const Ht = i.useCallback(() => {
    const l = ks.current ?? ws.current;
    ys.current !== l && (ys.current = l, Jt(l));
  }, [Jt]), co = i.useCallback((l) => {
    ks.current = l, Ht();
  }, [Ht]), uo = i.useCallback((l) => {
    ws.current = l, Ht();
  }, [Ht]);
  i.useEffect(() => () => Jt(null), [Jt]);
  const js = i.useCallback((l, x) => l !== B ? null : on(U, x) || an(U, x), [B, U]), Cs = (r == null ? void 0 : r.id) || null, Ns = i.useCallback((l) => {
    var _a2;
    if (!l.length) return;
    const x = Ss.current;
    if (x == null ? void 0 : x.onDone) {
      const A = new Set(x.paths);
      for (const M of l) A.add(M);
      x.onDone([...A].sort((M, G) => M.localeCompare(G))), m({ message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`, durationMs: 2500 });
      return;
    }
    if (x) {
      (_a2 = vs.current) == null ? void 0 : _a2.call(vs, l), m({ message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`, durationMs: 2500 });
      return;
    }
    const b = de.current, j = [.../* @__PURE__ */ new Set([...b.config.sourcePaths, ...l])].sort((A, M) => A.localeCompare(M));
    ge({ ...b, config: { ...b.config, sourcePaths: j } }), m({ message: `\uADFC\uAC70 \uBB38\uC11C ${l.length}\uAC1C \uCD94\uAC00`, durationMs: 2500 });
  }, [ge, m]), $s = i.useCallback((l) => {
    const x = Mi(l, js, { excludePath: Cs });
    x.length && Ns(x);
  }, [Cs, js, Ns]);
  i.useEffect(() => (Mn($s), () => Mn(null)), [Mn, $s]), i.useEffect(() => (Rn(c && d && (!!Je || _t)), () => Rn(false)), [c, d, Je, _t, Rn]);
  const H = i.useMemo(() => fc({ questions: P.questions, userAnswers: ne, gradedQuestions: ie, isSubmitted: me, subjectiveGrades: fe }), [P.questions, ne, ie, me, fe]), Ps = c && d && H.total > 0, fo = pr(gt, ps, Ps, P.questions.length), mo = pr(gt, xs, Ps, P.questions.length), po = i.useMemo(() => Lr(P.questions, P.config.choiceCount), [P.questions, P.config.choiceCount]), Es = i.useMemo(() => Ai(P.config), [P.config.sourcePaths, P.config.disabledSourcePaths]), xo = i.useMemo(() => {
    const l = {};
    for (const [x, b] of Object.entries(Te)) {
      const j = x.indexOf("_"), A = j >= 0 ? x.slice(0, j) : x, M = l[A] ?? (l[A] = {});
      M[x] = b;
    }
    return l;
  }, [Te]), Kt = i.useMemo(() => ue && P.questions.find((l) => l.id === ue.questionId) || null, [ue, P.questions]), ho = i.useCallback((l, x, b) => {
    We({ questionId: l, option: x, mode: b });
  }, []), ve = a, zs = i.useCallback(() => {
    Ve({}), Ge({}), Ee({}), we({}), st({}), We(null), nt({}), Tt(false), bt(Pt()), zn((l) => l + 1), he(de.current, zt({ ...St(ae) ? {} : { questionMemos: ae } }));
  }, [he, ae]), go = i.useCallback(() => {
    Ve({}), Ge({}), Ee({}), we({}), st({}), We(null), nt({}), Tt(false);
    const l = $t(Pt(), "start", 0);
    bt(l), zn((x) => x + 1), he(de.current, zt({ timeLog: l, ...St(ae) ? {} : { questionMemos: ae } }));
  }, [he, ae]), Is = i.useMemo(() => P.questions.some((l) => xn(ne[l.id])), [P.questions, ne]), Rs = i.useCallback(() => {
    if (Is) {
      jn(true);
      return;
    }
    se.start();
  }, [Is, se]);
  i.useEffect(() => {
    if (!(!c || !d || !u)) return u(t.jsx(ll, { stopwatch: se, onRequestStart: Rs })), () => u(null);
  }, [c, d, u, se.displayMs, se.running, se.started, se.start, se.pause, se.resume, se.stop, Rs]);
  const bo = i.useCallback((l) => {
    Ge((x) => {
      const b = { ...x };
      return delete b[l.id], b;
    }), nt((x) => {
      const b = { ...x };
      return delete b[l.id], b;
    }), Ee((x) => {
      const b = { ...x };
      return delete b[l.id], b;
    }), we((x) => {
      const b = { ...x };
      for (const j of Object.keys(b)) (j === l.id || j.startsWith(`${l.id}_`)) && delete b[j];
      return b;
    });
  }, []), ko = i.useCallback((l, x) => {
    ds.current[l] || Ve((b) => ({ ...b, [l]: x }));
  }, []), wo = i.useCallback((l) => {
    se.examInProgress || (Ge((x) => ({ ...x, [l.id]: true })), Ee((x) => ({ ...x, [l.id]: true })));
  }, [se.examInProgress]), yo = i.useCallback(async (l, x) => {
    var _a2;
    if (se.examInProgress) return;
    const b = String(x ?? ne[l.id] ?? "").trim();
    if (!b) {
      m({ message: "\uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694.", durationMs: 2200 });
      return;
    }
    if (!await T()) return;
    pe(l.id), (_a2 = Ne.current) == null ? void 0 : _a2.abort();
    const j = new AbortController();
    Ne.current = j;
    try {
      const A = await fr({ profiles: ve, question: l, userAnswer: b, signal: j.signal });
      nt((M) => ({ ...M, [l.id]: A })), Ge((M) => ({ ...M, [l.id]: true })), Ee((M) => ({ ...M, [l.id]: true })), x !== void 0 && Ve((M) => ({ ...M, [l.id]: x })), m({ message: "\uC8FC\uAD00\uC2DD \uCC44\uC810 \uC644\uB8CC", durationMs: 2200 });
    } catch (A) {
      R("\uCC44\uC810 \uC2E4\uD328", A, "\uCC44\uC810 \uC2E4\uD328");
    } finally {
      pe(null);
    }
  }, [T, ve, R, m, se.examInProgress, ne]), vo = i.useCallback((l, x) => {
    Ve((b) => b[l] === x ? b : { ...b, [l]: x });
  }, []), So = i.useCallback((l) => {
    Ft(l), Dt(true);
  }, []), jo = i.useCallback((l) => {
    Ee((x) => ({ ...x, [l]: !x[l] }));
  }, []), Co = i.useCallback((l) => {
    Nn(l);
  }, []), No = i.useCallback((l, x) => {
    st((b) => ({ ...b, [l]: x }));
  }, []), $o = i.useCallback((l, x) => {
    yn((b) => {
      if (!x.trim()) {
        const { [l]: A, ...M } = b;
        return M;
      }
      return { ...b, [l]: x };
    });
  }, []), Po = i.useCallback((l) => {
    Bt((x) => {
      if (!x[l]) return x;
      const b = { ...x };
      return delete b[l], b;
    });
  }, []), kt = i.useCallback((l) => {
    var _a2;
    ((_a2 = Pn.current) == null ? void 0 : _a2.scrollToQuestionId(l)) || (En.current = l);
  }, []);
  i.useEffect(() => {
    var _a2;
    const l = En.current;
    l && ((_a2 = Pn.current) == null ? void 0 : _a2.scrollToQuestionId(l)) && (En.current = null);
  }, [P.questions, vn, ne, ie, me, fe]);
  const Eo = async () => {
    se.examInProgress && se.stop();
    const l = P.questions.filter((j) => !(!xn(ne[j.id]) || ie[j.id] || j.kind === "subjective" && fe[j.id]));
    if (l.length === 0) {
      m({ message: "\uCC44\uC810\uD560 \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.", durationMs: 2200 });
      return;
    }
    const x = l.filter((j) => j.kind === "choice"), b = l.filter((j) => j.kind === "subjective");
    if (x.length > 0 && (Ge((j) => {
      const A = { ...j };
      for (const M of x) A[M.id] = true;
      return A;
    }), Ee((j) => {
      const A = { ...j };
      for (const M of x) A[M.id] = true;
      return A;
    })), b.length > 0) {
      if (!await T()) return;
      for (const j of b) {
        const A = String(ne[j.id] || "").trim();
        if (A) try {
          const M = await fr({ profiles: ve, question: j, userAnswer: A });
          nt((G) => ({ ...G, [j.id]: M })), Ge((G) => ({ ...G, [j.id]: true })), Ee((G) => ({ ...G, [j.id]: true }));
        } catch {
        }
      }
    }
    m({ message: `${l.length}\uAC1C \uD56D\uBAA9 \uCC44\uC810 \uC644\uB8CC`, durationMs: 2200 });
  }, Ms = async (l) => {
    if (!await T()) return;
    pe(`sim-${l.id}`);
    const x = Zt(P.config, l), b = h.createSimilarJob({ displayLabel: String(l.displayLabel || l.id), preview: l.question, hasRag: x.length > 0 }), j = b;
    try {
      const A = await Jc({ profiles: ve, question: l, config: P.config, sourcePaths: x, readText: be, onStep: (Z) => X(b, j, Z) }), M = String(l.displayLabel || l.id).split("-\uC720\uC0AC")[0] || "1";
      let G = 0;
      const W = new RegExp(`^${M.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-\uC720\uC0AC(\\d+)$`);
      for (const Z of P.questions) {
        const ze = String(Z.displayLabel).match(W);
        (ze == null ? void 0 : ze[1]) && (G = Math.max(G, Number.parseInt(ze[1], 10)));
      }
      const Y = `${M}-\uC720\uC0AC${G + 1}`, ee = { ...A, id: `gen-${Date.now()}`, displayLabel: Y, isGenerated: true, similarOf: { id: l.id, displayLabel: String(l.displayLabel || l.id) }, ...x.length ? { sourcePaths: x } : {} };
      h.updateJobStep(b, { step: "finalize", status: "running", detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026" }), oe(b, ee.id);
      const K = P.questions.findIndex((Z) => Z.id === l.id), te = [...P.questions];
      te.splice(K + 1, 0, ee), mt("all"), Bt((Z) => ({ ...Z, [ee.id]: true })), ge({ ...P, questions: te }), h.setJobResultQuestionId(b, ee.id), h.updateJobStep(b, { step: "finalize", status: "done", detail: Y, llmResponse: JSON.stringify(ee, null, 2) }), h.completeJob(b, Y), oe(b, ee.id), m({ message: `${Y} \uC720\uC0AC\uBB38\uC81C \uCD94\uAC00`, durationMs: 2500 }), await ot(), window.setTimeout(() => {
        kt(ee.id);
      }, 80);
    } catch (A) {
      const M = (A instanceof Error ? A.message : "") || "\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
      h.failJob(b, M), oe(b, j), R("\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", A, "\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
    } finally {
      pe(null);
    }
  }, As = async (l, x) => {
    var _a2;
    const b = D.llmOpts;
    if (!await T(b)) return;
    const j = (x === "point" || x === "both") && ut(l.point || ""), A = (x === "explanation" || x === "both") && ft(l.explanation || "");
    if (!j && !A) {
      m({ message: "\uC774\uBBF8 \uC811\uADFC Point\uC640 \uD574\uC124\uC774 \uC788\uC2B5\uB2C8\uB2E4.", durationMs: 2200 });
      return;
    }
    const M = `sections-${l.id}`;
    pe(M), (_a2 = Ne.current) == null ? void 0 : _a2.abort();
    const G = new AbortController();
    Ne.current = G;
    try {
      const W = Zt(P.config, l), Y = await Vc({ profiles: ve, question: l, missingPoint: j, missingExplanation: A, sourcePaths: W, readText: be, ...b, signal: G.signal });
      if (!Y.point && !Y.explanation) {
        m({ message: "\uC0DD\uC131\uB41C \uB0B4\uC6A9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.", durationMs: 2500 });
        return;
      }
      const ee = P.questions.map((te) => te.id !== l.id ? te : { ...te, ...Y.point ? { point: Y.point } : {}, ...Y.explanation ? { explanation: Y.explanation } : {} });
      ge({ ...P, questions: ee }), Ee((te) => ({ ...te, [l.id]: true }));
      const K = [];
      Y.point && K.push("\uC811\uADFC Point"), Y.explanation && K.push("\uD574\uC124"), m({ message: `${K.join("\xB7")} \uC0DD\uC131 \uC644\uB8CC`, durationMs: 2200 }), await ot();
    } catch (W) {
      if (G.signal.aborted) return;
      R("\uC811\uADFC Point\xB7\uD574\uC124 \uC0DD\uC131 \uC2E4\uD328", W, "\uC0DD\uC131 \uC2E4\uD328");
    } finally {
      pe(null);
    }
  }, Ls = async (l, x) => {
    if (!await T()) return;
    pe(`derived-${l.id}`);
    const b = Zt(P.config, l), j = h.createDerivedJob({ displayLabel: String(l.displayLabel || l.id), preview: l.question, hasRag: b.length > 0 }), A = j;
    try {
      const M = await Hc({ profiles: ve, question: l, config: P.config, target: x, sourcePaths: b, readText: be, onStep: (K) => X(j, A, K) }), G = Nc(P.questions, String(l.displayLabel || l.id)), W = { ...M, id: `gen-${Date.now()}`, displayLabel: G, isGenerated: true, similarOf: { id: l.id, displayLabel: String(l.displayLabel || l.id) }, ...b.length ? { sourcePaths: b } : {} };
      h.updateJobStep(j, { step: "finalize", status: "running", detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026" }), oe(j, W.id);
      const Y = P.questions.findIndex((K) => K.id === l.id), ee = [...P.questions];
      ee.splice(Y + 1, 0, W), mt("all"), Bt((K) => ({ ...K, [W.id]: true })), ge({ ...P, questions: ee }), h.setJobResultQuestionId(j, W.id), h.updateJobStep(j, { step: "finalize", status: "done", detail: G, llmResponse: JSON.stringify(W, null, 2) }), h.completeJob(j, G), oe(j, W.id), Nn(null), m({ message: `${G} \uD30C\uC0DD\uBB38\uC81C \uCD94\uAC00`, durationMs: 2500 }), await ot(), window.setTimeout(() => {
        kt(W.id);
      }, 80);
    } catch (M) {
      const G = (M instanceof Error ? M.message : "") || "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
      h.failJob(j, G), oe(j, A), R("\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", M, "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
    } finally {
      pe(null);
    }
  }, zo = i.useCallback((l, x) => {
    var _a2;
    const b = Qt[l.id], j = ((_a2 = l.options) == null ? void 0 : _a2.length) || 0;
    return b != null && b >= 1 && b <= j ? b : x != null && x >= 1 && x <= j ? x : 1;
  }, [Qt]), Os = async (l, x, b, j = "create") => {
    var _a2, _b;
    const A = x === l.answer, M = D.llmOpts;
    if (j === "followup") {
      const K = String(b || "").trim();
      if (!K) {
        m({ message: "\uCD94\uAC00 \uC9C8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694.", durationMs: 2200 });
        return;
      }
      if (!await T(M)) return;
      const te = Ye(l.id, x), Z = String(tt.current[te] || "").trim();
      if (!Z) {
        m({ message: "\uBA3C\uC800 \uBD84\uC11D\uC744 \uC0DD\uC131\uD558\uC138\uC694.", durationMs: 2200 });
        return;
      }
      pe(te), (_a2 = Ne.current) == null ? void 0 : _a2.abort();
      const ze = new AbortController();
      Ne.current = ze;
      const $e = K.slice(0, 60);
      try {
        const Ie = await Wc({ profiles: ve, question: l, selectedOption: x, existingAnalysis: Z, userQuestion: K, ...M, signal: ze.signal, onChunk: (Jo) => {
          const Ho = Li(Z, Jo);
          we((Ko) => ({ ...Ko, [te]: Ho }));
        } }), wt = Oi(Ie, $e), Wo = Qi(Z, wt, $e), Qn = { ...tt.current, [te]: Wo };
        tt.current = Qn, we(Qn), We(null), await ot(Qn);
      } catch (Ie) {
        if (ze.signal.aborted) return;
        we((wt) => ({ ...wt, [te]: Z })), R("\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0 \uC2E4\uD328", Ie, "\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0 \uC2E4\uD328");
      } finally {
        pe(null);
      }
      return;
    }
    const G = Ti(b, A);
    if (!await T(M)) return;
    const W = Ye(l.id, x), Y = j === "regenerate" ? String(tt.current[W] || "").trim() : "";
    pe(W), j !== "regenerate" && we((K) => ({ ...K, [W]: "" })), (_b = Ne.current) == null ? void 0 : _b.abort();
    const ee = new AbortController();
    Ne.current = ee;
    try {
      const K = await Gc({ profiles: ve, question: l, selectedOption: x, userInstructions: G, ...M, signal: ee.signal, onChunk: (ze) => {
        const $e = j === "regenerate" ? _i(Y, ze) : ze;
        we((Ie) => ({ ...Ie, [W]: $e }));
      } }), te = j === "regenerate" ? Di(Y, K) : K, Z = { ...tt.current, [W]: te };
      tt.current = Z, we(Z), We(null), await ot(Z);
    } catch (K) {
      if (ee.signal.aborted) return;
      we((te) => {
        const Z = { ...te };
        return j === "regenerate" && Y ? Z[W] = Y : String(Z[W] || "").trim() || delete Z[W], Z;
      }), R("\uC624\uB2F5 \uD574\uC124 \uC2E4\uD328", K, "\uC624\uB2F5 \uD574\uC124 \uC2E4\uD328");
    } finally {
      pe(null);
    }
  }, Qs = async (l) => {
    var _a2, _b, _c2;
    const x = P.config.sourcePaths.length, b = kr(P.config);
    if (!x) {
      pt(true), m({ message: "\uD30C\uC77C \uADFC\uAC70 \uBB38\uC11C\uB97C \uBA3C\uC800 \uC120\uD0DD\uD558\uC138\uC694.", durationMs: 2800 });
      return;
    }
    if (!b.length) {
      pt(true), m({ message: "\uC0AC\uC6A9 \uC911\uC778 \uADFC\uAC70 \uBB38\uC11C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uCCB4\uD06C\uBC15\uC2A4\uB85C \uADFC\uAC70\uB97C \uD65C\uC131\uD654\uD558\uC138\uC694.", durationMs: 3200 });
      return;
    }
    if (!await T()) return;
    pe("gen-sources"), (_a2 = Ne.current) == null ? void 0 : _a2.abort();
    const j = new AbortController();
    Ne.current = j;
    const A = h.createSourceJob({ preview: ((_b = P.questions[0]) == null ? void 0 : _b.question) || "\uADFC\uAC70 \uAE30\uBC18 \uCD9C\uC81C", topic: l }), M = A;
    try {
      const G = await Xc({ profiles: ve, config: P.config, sourcePaths: b, topic: l, kind: "choice", count: 1, exampleQuestions: P.questions, readText: be, signal: j.signal, onStep: ($e) => X(A, M, $e) });
      if (!G.length) throw new Error("\uC0DD\uC131\uB41C \uBB38\uD56D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
      const W = Number.parseInt(ts(P.questions), 10) || 1, Y = Date.now(), ee = G.map(($e, Ie) => ({ ...$e, id: `gen-src-${Y}-${Ie}`, displayLabel: String(W + Ie), isGenerated: true, ...b.length ? { sourcePaths: [...b] } : {} })), K = (_c2 = ee[0]) == null ? void 0 : _c2.id, te = ee.map(($e) => $e.displayLabel).join(", "), Z = K || A;
      h.updateJobStep(A, { step: "finalize", status: "running", detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026" }), oe(A, Z);
      const ze = [...P.questions, ...ee];
      mt("all"), K && Bt(($e) => {
        const Ie = { ...$e };
        for (const wt of ee) Ie[wt.id] = true;
        return Ie;
      }), ge({ ...P, questions: ze }), K && h.setJobResultQuestionId(A, K), h.updateJobStep(A, { step: "finalize", status: "done", detail: te, llmResponse: JSON.stringify(ee, null, 2) }), h.completeJob(A, te), oe(A, Z), m({ message: `\uADFC\uAC70 \uAE30\uBC18 \uBB38\uC81C ${ee.length}\uAC1C \uCD94\uAC00`, durationMs: 2500 }), await ot(), K && window.setTimeout(() => {
        kt(K);
      }, 80);
    } catch (G) {
      if (j.signal.aborted) {
        h.failJob(A, "\uCDE8\uC18C\uB428"), oe(A, M);
        return;
      }
      const W = (G instanceof Error ? G.message : "") || "\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
      h.failJob(A, W), oe(A, M), R("\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", G, "\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
    } finally {
      pe(null);
    }
  }, Ts = i.useRef(Qs);
  Ts.current = Qs;
  const Io = i.useCallback((l) => {
    Ts.current(l);
  }, []), Ro = i.useCallback(async ({ instructions: l, form: x }) => {
    var _a2, _b;
    if (!xe || !await T()) return null;
    (_a2 = Ne.current) == null ? void 0 : _a2.abort();
    const b = new AbortController();
    Ne.current = b;
    const j = _r(x, xe.displayLabel);
    j.id = xe.id, j.displayLabel = xe.displayLabel, xe.similarOf && (j.similarOf = xe.similarOf), xe.isGenerated && (j.isGenerated = xe.isGenerated);
    const A = Zt(P.config, j);
    try {
      const M = await td({ profiles: ve, question: j, config: P.config, userInstructions: l, sourcePaths: A, readText: be, signal: b.signal }), G = De(j, P.config.choiceCount), W = { kind: M.kind, displayLabel: xe.displayLabel, question: M.question, point: M.point, explanation: M.explanation, ...((_b = x.sourcePaths) == null ? void 0 : _b.length) ? { sourcePaths: x.sourcePaths } : {} };
      if (M.kind === "subjective") W.answerStyle = M.answerStyle === "essay" ? "essay" : "short", W.modelAnswer = M.modelAnswer || "";
      else {
        const Y = [...M.options || []];
        W.options = et(Y, G), W.answer = M.answer && M.answer >= 1 ? M.answer : 1;
      }
      return m({ message: "\uBB38\uD56D\uC744 \uAD50\uC815\uD588\uC2B5\uB2C8\uB2E4. \uB0B4\uC6A9\uC744 \uD655\uC778\uD55C \uB4A4 \uC800\uC7A5\uD558\uC138\uC694.", durationMs: 3200 }), W;
    } catch (M) {
      return b.signal.aborted || R("\uBB38\uC81C \uACE0\uCE58\uAE30 \uC2E4\uD328", M, "\uBB38\uC81C \uACE0\uCE58\uAE30 \uC2E4\uD328"), null;
    }
  }, [P.config, xe, T, ve, be, R, m]), Mo = i.useMemo(() => ({ getPresignedUrl: o, currentNotePath: (r == null ? void 0 : r.id) ?? null, hydrationEnabled: d }), [r == null ? void 0 : r.id, d, o]), _s = i.useRef(Os);
  _s.current = Os;
  const Ds = i.useRef(Ms);
  Ds.current = Ms;
  const Fs = i.useRef(As);
  Fs.current = As;
  const qs = i.useRef(Kt);
  qs.current = Kt;
  const An = i.useRef(ue);
  An.current = ue;
  const Ln = i.useRef(rt);
  Ln.current = rt;
  const Bs = i.useRef(Ls);
  Bs.current = Ls;
  const Ao = i.useCallback((l) => {
    Ds.current(l);
  }, []), Lo = i.useCallback((l, x) => {
    Fs.current(l, x);
  }, []), Oo = i.useCallback((l) => {
    const x = qs.current, b = An.current;
    !x || !b || _s.current(x, b.option, l, b.mode);
  }, []), Qo = i.useCallback(() => {
    const l = An.current;
    if (!l) return;
    const x = Ye(l.questionId, l.option);
    Xe !== x && We(null);
  }, [Xe]), To = i.useCallback(() => {
    const l = Ln.current;
    l && Xe === `derived-${l.id}` || Nn(null);
  }, [Xe]), _o = i.useCallback((l) => {
    const x = Ln.current;
    x && Bs.current(x, l);
  }, []), Do = i.useCallback(() => us(false), []), Fo = i.useCallback((l) => {
    mt("all"), kt(l);
  }, [kt]), qo = i.useCallback(() => {
    qt({ paths: de.current.config.sourcePaths, scope: "file" });
  }, []), Bo = i.useCallback(() => {
    xt(null);
  }, []);
  if (!c) return t.jsx("div", { className: "quiz-pane flex flex-1 items-center justify-center text-sm text-gray-400", children: "\uD0ED\uC744 \uC120\uD0DD\uD558\uBA74 \uD034\uC988\uAC00 \uC5F4\uB9BD\uB2C8\uB2E4" });
  const On = H.total > 0 ? Math.round(H.answered / H.total * 100) : 0, Us = H.total > 0 && !fo, Gs = H.total > 0 && !mo, Uo = se.examInProgress, Go = t.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-slate-500 dark:text-odp-muted", "aria-label": `\uC815\uB2F5 ${H.correct}, \uBD80\uBD84\uC815\uB2F5 ${H.partial}, \uC624\uB2F5 ${H.wrong}`, children: [t.jsxs("span", { children: ["\uC815\uB2F5", " ", t.jsx("span", { className: "font-bold tabular-nums text-emerald-600 dark:text-emerald-400", children: H.correct })] }), t.jsx("span", { className: "text-slate-300 dark:text-odp-borderSoft", "aria-hidden": true, children: "|" }), t.jsxs("span", { children: ["\uBD80\uBD84", " ", t.jsx("span", { className: "font-bold tabular-nums text-amber-600 dark:text-amber-400", children: H.partial })] }), t.jsx("span", { className: "text-slate-300 dark:text-odp-borderSoft", "aria-hidden": true, children: "|" }), t.jsxs("span", { children: ["\uC624\uB2F5", " ", t.jsx("span", { className: "font-bold tabular-nums text-rose-500 dark:text-rose-400", children: H.wrong })] })] });
  return t.jsx(ha, { value: Mo, children: t.jsx(Rt, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs("div", { className: `quiz-pane relative flex min-h-0 min-w-0 max-w-full flex-1 flex-col overflow-hidden bg-slate-50 dark:bg-odp-bg${d ? "" : " pointer-events-none"}`, ...d ? {} : { inert: true }, "aria-hidden": d ? void 0 : true, children: [t.jsx("div", { className: "min-w-0 shrink-0 border-b border-slate-200 bg-white/90 px-4 py-3 dark:border-odp-borderSoft dark:bg-odp-surface", children: t.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2 overflow-hidden", children: [t.jsxs("div", { className: "mr-auto flex min-w-0 flex-1 basis-full items-center gap-2 sm:basis-auto sm:gap-3", children: [t.jsx(Yi, { className: "shrink-0 text-blue-600", size: 18 }), t.jsx("span", { className: "shrink-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: "\uD034\uC988 \uBAA8\uB4DC" }), H.total > 0 ? t.jsx("div", { className: `${xr} flex-1`, "aria-hidden": !Us, children: t.jsx(dn, { initial: false, children: Us ? t.jsxs(He.div, { className: "flex w-full min-w-0 items-center gap-2 overflow-hidden sm:gap-3", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2, ease: "easeOut" }, children: [t.jsxs("p", { className: "hidden shrink-0 overflow-hidden text-xs whitespace-nowrap text-slate-600 dark:text-odp-muted md:inline", children: ["\uCD1D", " ", t.jsx("span", { className: "font-semibold text-slate-800 dark:text-odp-fgStrong", children: H.total }), "\uBB38\uD56D \uC911", " ", t.jsx("span", { className: "font-semibold text-blue-600 dark:text-blue-400", children: H.answered }), "\uBB38\uD56D \uD480\uC774"] }), t.jsxs("span", { className: "shrink-0 text-xs font-semibold whitespace-nowrap tabular-nums text-slate-600 dark:text-odp-muted md:hidden", children: [H.answered, "/", H.total] }), t.jsx("div", { className: "h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-odp-bgSoft", role: "progressbar", "aria-valuenow": H.answered, "aria-valuemin": 0, "aria-valuemax": H.total, "aria-label": `\uD480\uC774 \uC9C4\uD589 ${H.answered} / ${H.total}`, children: t.jsx(He.div, { className: "h-full rounded-full bg-blue-500", initial: false, animate: { width: `${On}%` }, transition: { duration: 0.3, ease: "easeOut" } }) }), t.jsxs("span", { className: "shrink-0 text-[11px] font-medium whitespace-nowrap tabular-nums text-slate-500 dark:text-odp-muted", children: [On, "%"] })] }, "quiz-header-progress") : null }) }) : null] }), H.total > 0 ? t.jsx("div", { className: `${xr} shrink-0`, "aria-hidden": !Gs, children: t.jsx(dn, { initial: false, children: Gs ? t.jsx(He.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2, ease: "easeOut" }, className: "overflow-hidden whitespace-nowrap", children: Go }, "quiz-header-score") : null }) }) : null, t.jsxs(aa, { children: [t.jsx(la, { asChild: true, children: t.jsxs(F, { type: "button", variant: "secondary", size: "sm", children: [t.jsx(Vs, { size: 14 }), "\uBB38\uC81C \uCD94\uAC00", t.jsx(es, { size: 14, className: "opacity-70", "aria-hidden": true })] }) }), t.jsx(ca, { children: t.jsxs(da, { className: $d, sideOffset: 6, align: "start", children: [t.jsxs(Xs, { className: hr, onSelect: () => {
    Ft(null), Dt(true);
  }, children: [t.jsx(bn, { size: 14, "aria-hidden": true }), "\uC9C1\uC811\uCD94\uAC00"] }), t.jsxs(Xs, { className: hr, onSelect: () => $n(true), children: [t.jsx(ea, { size: 14, "aria-hidden": true }), "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30"] })] }) })] }), t.jsxs(F, { type: "button", variant: "secondary", size: "sm", onClick: zs, children: [t.jsx(Ir, { size: 14 }), "\uCD08\uAE30\uD654"] }), t.jsxs(F, { type: "button", variant: "primary", size: "sm", onClick: () => {
    Eo();
  }, children: [t.jsx(zr, { size: 14 }), "\uC804\uCCB4 \uCC44\uC810"] }), t.jsxs(F, { type: "button", variant: Es.active > 0 ? "primary" : "secondary", size: "sm", "aria-pressed": _t, onClick: () => {
    pt((l) => (l && xt(null), !l));
  }, children: [t.jsx(Rr, { size: 14 }), "\uADFC\uAC70"] }), t.jsx(F, { type: "button", variant: Sn ? "primary" : "tertiary", size: "sm", "aria-label": "\uBAA9\uCC28", "aria-pressed": Sn, onClick: () => us((l) => !l), children: t.jsx(Mr, { size: 14 }) })] }) }), t.jsxs("div", { className: "flex min-h-0 flex-1 overflow-hidden", children: [t.jsx("div", { className: "relative min-h-0 min-w-0 flex-1", children: t.jsx("div", { ref: gt, className: "h-full min-h-0 overflow-y-auto px-4 py-4", children: t.jsxs("div", { className: "mx-auto max-w-3xl space-y-4", children: [t.jsx(md, { profiles: ve, profileId: D.profileId, model: D.model, onProfileIdChange: D.onProfileIdChange, onModelChange: D.onModelChange }), t.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-odp-borderSoft dark:bg-odp-surface", children: [t.jsxs("div", { ref: ps, children: [t.jsxs("div", { className: "mb-2 flex justify-between text-xs font-semibold text-slate-600 dark:text-odp-muted", children: [t.jsx("span", { children: "\uD480\uC774 \uC9C4\uD589\uB960" }), t.jsxs("span", { children: [H.answered, " / ", H.total] })] }), t.jsx("div", { className: "mb-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-odp-bgSoft", children: t.jsx(He.div, { className: "h-full rounded-full bg-blue-500", initial: false, animate: { width: `${On}%` }, transition: { duration: 0.3, ease: "easeOut" } }) })] }), t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [t.jsxs("div", { className: "flex gap-4 text-center text-xs", children: [t.jsxs("div", { children: [t.jsx("div", { className: "text-xl font-black text-slate-800 dark:text-odp-fgStrong", children: H.scorePercent != null ? `${H.scorePercent}\uC810` : "-" }), t.jsx("div", { className: "text-[10px] text-slate-400", children: "\uC810\uC218" })] }), t.jsxs("div", { ref: xs, className: "flex gap-4 text-center text-xs", children: [t.jsxs("div", { children: [t.jsx("div", { className: "text-lg font-bold text-emerald-600", children: H.correct }), t.jsx("div", { className: "text-[10px] text-slate-400", children: "\uC815\uB2F5" })] }), t.jsxs("div", { children: [t.jsx("div", { className: "text-lg font-bold text-amber-600", children: H.partial }), t.jsx("div", { className: "text-[10px] text-slate-400", children: "\uBD80\uBD84" })] }), t.jsxs("div", { children: [t.jsx("div", { className: "text-lg font-bold text-rose-500", children: H.wrong }), t.jsx("div", { className: "text-[10px] text-slate-400", children: "\uC624\uB2F5" })] })] })] }), t.jsx("div", { className: "flex gap-1 rounded-xl bg-slate-100 p-1 text-xs dark:bg-odp-bgSoft", children: [["all", "\uC804\uCCB4"], ["wrong", "\uC624\uB2F5\uB9CC"], ["unanswered", "\uBBF8\uD480\uC774"]].map(([l, x]) => t.jsx("button", { type: "button", className: `rounded-lg px-2.5 py-1 font-medium ${vn === l ? "bg-white shadow-sm dark:bg-odp-surface" : "text-slate-600 dark:text-odp-muted"}`, onClick: () => mt(l), children: x }, l)) })] }), t.jsx(cl, { log: ye })] }), P.questions.length === 0 ? t.jsxs("div", { className: "rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-odp-borderSoft dark:bg-odp-surface", children: [t.jsx("p", { className: "mb-3 text-sm font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uB4F1\uB85D\uB41C \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" }), t.jsxs("div", { className: "flex flex-wrap justify-center gap-2", children: [t.jsxs(F, { type: "button", variant: "primary", onClick: () => Dt(true), children: [t.jsx(Vs, { size: 14 }), "\uBB38\uC81C \uCD94\uAC00"] }), t.jsx(F, { type: "button", variant: "secondary", onClick: () => $n(true), children: "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30" })] })] }) : null, P.questions.length > 0 ? t.jsx(Al, { ref: Pn, questions: P.questions, filter: vn, scrollRef: gt, userAnswers: ne, graded: ie, subjGrades: fe, isSubmitted: me, expVisible: to, wrongExpsByQuestion: xo, questionMemos: ae, freshQuestionIds: ro, busyId: Xe, examInProgress: Uo, resolveWrongExpFocusOption: zo, onAnswerCommit: vo, onSelectOption: ko, onEditQuestion: So, onGradeChoice: wo, onGradeSubjective: yo, onRetry: bo, onToggleExplanation: jo, onSimilar: Ao, onDerived: Co, onGenerateSections: Lo, onWrongExpFocusChange: No, onOpenAnalysisDock: ho, onMemoSave: $o, onClearFresh: Po }) : null] }) }) }), t.jsx(Ea, { open: rt != null, question: rt, defaultChoiceCount: P.config.choiceCount || 4, busy: rt != null && Xe === `derived-${rt.id}`, onClose: To, onSubmit: _o }), t.jsx(_l, { open: !!(ue && Kt), question: Kt, option: (ue == null ? void 0 : ue.option) ?? null, mode: (ue == null ? void 0 : ue.mode) ?? "create", existingAnalysis: ue && ue.mode === "followup" ? String(Te[Ye(ue.questionId, ue.option)] || "") : "", llmProfiles: ve, profileId: D.profileId, model: D.model, onProfileIdChange: D.onProfileIdChange, onModelChange: D.onModelChange, busy: ue != null && Xe === Ye(ue.questionId, ue.option), onClose: Qo, onGenerate: Oo }), t.jsx(cc, { path: no, onClose: Bo, loadDocument: E, onOpenDocument: L, onOpenInNewTab: J }), t.jsx(tc, { open: _t, docConfig: P.config, sourcePathUsage: Es, busyGenSources: Xe === "gen-sources", onClose: le, onPreview: _, onRemove: lo, onToggleEnabled: ao, onOpenPicker: qo, onGenerateFromTopic: Io, onDropHostChange: uo }), t.jsx(kc, { open: Sn, questions: P.questions, userAnswers: ne, gradedQuestions: ie, isSubmitted: me, subjectiveGrades: fe, onClose: Do, onNavigate: Fo })] }), fs ? t.jsx(Xa, { isOpen: fs, onClose: () => {
    Dt(false), Ft(null);
  }, styleTemplate: po, initial: xe, nextLabel: ts(P.questions), onSubmit: (l) => {
    ge(xe ? { ...P, questions: P.questions.map((x) => x.id === xe.id ? l : x) } : { ...P, questions: [...P.questions, l] }), Ft(null);
  }, onOpenSourcePicker: (l, x) => qt({ paths: l, scope: "question", onDone: x }), ...xe ? { onFixWithAi: Ro } : {} }) : null, ms ? t.jsx(tl, { isOpen: ms, onClose: () => $n(false), current: P, onApply: (l, x) => {
    ge(l), x === "replace" && zs(), m({ message: `\uBB38\uC81C ${l.questions.length}\uAC1C \uC801\uC6A9`, durationMs: 2500 });
  } }) : null, Je ? t.jsx(nl, { isOpen: true, onClose: () => qt(null), tree: U, selected: Je.paths, excludePath: (r == null ? void 0 : r.id) || null, onExpandFolder: ke, onDropHostChange: co, onRegisterDropPathsMerge: (l) => {
    vs.current = l;
  }, onConfirm: (l) => {
    Je.onDone ? Je.onDone(l) : Je.scope === "file" && ge({ ...P, config: { ...P.config, sourcePaths: l } }), qt(null);
  } }) : null, t.jsx(Hn, { isOpen: so, title: "\uC2DC\uD5D8 \uC2DC\uC791", message: "\uCD08\uAE30\uD654\uD558\uACE0 \uC2DC\uD5D8\uC744 \uC2DC\uC791\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?", confirmLabel: "\uC2DC\uC791", cancelLabel: "\uCDE8\uC18C", variant: "danger", onConfirm: () => {
    jn(false), go();
  }, onCancel: () => jn(false) }), t.jsx(Hn, { isOpen: ht != null, title: "\uADFC\uAC70 \uBB38\uC11C \uC81C\uAC70", message: ht ? `\u300C${ht}\u300D\uC744(\uB97C) \uD30C\uC77C \uADFC\uAC70\uC5D0\uC11C \uC81C\uAC70\uD560\uAE4C\uC694?` : "", confirmLabel: "\uC81C\uAC70", cancelLabel: "\uCDE8\uC18C", variant: "danger", onConfirm: () => {
    ht && In(ht), Cn(null);
  }, onCancel: () => Cn(null) }), t.jsx(al, { jobs: h.jobs, isOpen: h.panelOpen, size: h.panelSize, onClose: h.closePanel, onResize: h.setPanelSize, onRemoveJob: h.removeJob, onClearFinished: h.clearFinishedJobs, onUserEngage: h.markPanelUserEngaged, onPointerEngageChange: h.markPanelPointerEngaged, onFocusEngageChange: h.markPanelFocusEngaged }), !h.panelOpen && h.jobs.length > 0 ? t.jsxs("button", { type: "button", className: "fixed bottom-4 right-4 z-10049 flex items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-2 text-xs font-semibold text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 dark:border-violet-700/60", onClick: h.openPanel, onMouseEnter: () => h.markPanelPointerEngaged(true), onMouseLeave: () => h.markPanelPointerEngaged(false), onFocus: () => h.markPanelFocusEngaged(true), onBlur: () => h.markPanelFocusEngaged(false), "aria-label": "\uBB38\uC81C \uC0DD\uC131 \uB300\uAE30\uC5F4 \uC5F4\uAE30", children: [t.jsx(_e, { size: 14 }), "\uC0DD\uC131 \uB300\uAE30\uC5F4", h.hasActiveJobs ? t.jsx("span", { className: "rounded-full bg-violet-400/30 px-1.5 py-0.5 text-[10px] font-bold", children: "\uC9C4\uD589" }) : null] }) : null] }) }) });
}
export {
  _d as default
};
