import { j as t, r as l } from "./vendor-react-BFxggocB.js";
import { A as Xe, m as $e } from "./vendor-motion-b8oTnHK_.js";
import { dM as Co, e7 as Je, e8 as Pt, A as it, T as ms, e9 as ur, D as Q, ea as $o, eb as Po, ec as zo, ed as Zs, ee as Ys, ef as mr, a7 as en, d5 as fs, eg as Io, eh as Eo, aP as Fs, ca as Ao, ei as Mo, ej as Us, ek as Ms, el as Lo, em as Ze, en as fr, eo as pr, ep as Gs, eq as Oo, er as Ws, es as zt, et as Pe, eu as Ro, ev as at, ew as tn, ex as sn, ey as xr, ez as hr, eA as gr, eB as br, eC as kr, eD as To, eE as wr, eF as yr, eG as Nt, eH as _o, eI as Ls, eJ as Tn, eK as Qo, eL as Do, eM as qo, eN as Bo, eO as Fo, eP as Js, eQ as _n, eR as Uo, eS as Qn, eT as Go, eU as Hs, eV as wt, eW as Wo, eX as yt, eY as $t, eZ as Ct, e_ as Jo, e$ as Ho, f0 as Vo, f1 as Ko, f2 as Vt, f3 as Xo, U as ns, f4 as rs, f5 as os, f6 as Zo, V as is, bS as Yo, dt as ei, ds as ti, f7 as si, f8 as ni, f9 as vt, fa as Os, fb as ri, fc as oi, fd as ii, fe as ai, ff as li, fg as ci, fh as di, fi as ui, fj as mi, fk as fi, fl as pi, fm as xi, fn as hi } from "./index-RtVxfB8B.js";
import { ao as gi, v as bi, K as ki } from "./vendor-md-editor-B8SO9Xt5.js";
import { u as wi } from "./preview-BmQvb8zY.js";
import { u as yi } from "./useWikiImageHydration-v3BH5dN6.js";
import { X as qe, L as ps, ap as nn, k as vr, aq as It, aj as vi, S as Re, ai as Dn, a9 as Vs, x as ji, ar as qn, as as Si, at as Ni, a8 as Ci, au as $i, a4 as Pi, av as ls, aw as zi, E as Ii, ax as Ei, b as Ai, ay as Mi, a3 as Bn, az as Li, aA as Fn, aB as Un, aC as Gn, t as Wn, aD as Oi } from "./vendor-lucide-BNj_ckSR.js";
import { b as Et, a2 as Ri, a3 as Ti, d as Ie, T as Ee, e as Ae, f as Me, A as Le, M as _i, N as Qi, w as Di, x as qi, y as Bi, z as Fi, B as Jn, S as Ui, g as Gi } from "./vendor-radix-j_e9Isqx.js";
import "./vendor-aws-BCHf6c5E.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-google-genai-DGp6lEvQ.js";
import "./storageImageHydration-My9gZQJ0.js";
const jr = l.createContext({});
function Wi({ value: e, children: s }) {
  return t.jsx(jr.Provider, { value: e, children: s });
}
function Ji() {
  return l.useContext(jr);
}
bi({ editorConfig: { languageUserDefined: { "ko-KR": ki } } });
function Te({ text: e, previewId: s, className: n = "", getPresignedUrl: r, currentNotePath: o }) {
  const a = wi(), c = l.useRef(null), m = l.useMemo(() => String(e || ""), [e]), u = Ji(), d = r ?? u.getPresignedUrl, h = o ?? u.currentNotePath ?? null;
  return yi(c, m, d, h), t.jsx("div", { ref: c, className: `quiz-md-preview markdown-content ${n}`, children: t.jsx(gi, { id: s, modelValue: m, theme: a === "dark" ? "dark" : "light", previewTheme: "default", codeTheme: Co, language: "ko-KR", showCodeRowNumber: false, noImgZoomIn: true, iconfontType: void 0, sanitize: (f) => f }) });
}
function _e(e, s = 4) {
  if (e.kind !== "choice") return Je(s);
  const n = (e.options || []).filter((o) => String(o || "").trim()).length, r = Math.max(n, (e.options || []).length);
  return r >= Pt ? Je(r) : Je(s);
}
function Sr(e, s = 4) {
  const n = Je(s), r = e.length ? e[e.length - 1] : null;
  return r ? r.kind === "subjective" ? { kind: "subjective", answerStyle: r.answerStyle === "essay" ? "essay" : "short", choiceCount: n } : { kind: "choice", answerStyle: "short", choiceCount: _e(r, n) } : { kind: "choice", answerStyle: "short", choiceCount: n };
}
function Hn(e, s) {
  const n = Sr(s, e.choiceCount);
  return { ...e, choiceCount: n.choiceCount };
}
function Ye(e, s) {
  const n = Je(s), r = [...e];
  for (; r.length < n; ) r.push("");
  return r.slice(0, n);
}
const Hi = 360, Vi = ms;
function Ki(e) {
  return e === "subjective-essay" ? { kind: "subjective", answerStyle: "essay" } : e === "subjective-short" ? { kind: "subjective", answerStyle: "short" } : { kind: "choice", answerStyle: "short" };
}
function Xi(e) {
  return e && e.kind === "subjective" ? e.answerStyle === "essay" ? "subjective-essay" : "subjective-short" : "choice";
}
function Zi({ open: e, question: s, defaultChoiceCount: n, busy: r = false, onClose: o, onSubmit: a }) {
  const [c, m] = l.useState("choice"), [u, d] = l.useState(n), [h, f] = l.useState(""), { width: x, handleProps: v, isResizing: y } = it({ storageKey: "quiz-derived-question-dock-width", defaultWidth: Hi, minWidth: 280, maxWidth: 560, edge: "right" }), C = l.useMemo(() => s ? _e(s, n) : n, [n, s]);
  l.useEffect(() => {
    e && (m(Xi(s)), d(C), f(""));
  }, [e, s, C]);
  const { kind: P, answerStyle: j } = Ki(c), N = (s == null ? void 0 : s.displayLabel) || (s == null ? void 0 : s.id) || "", w = () => {
    a({ kind: P, choiceCount: Je(u), ...P === "subjective" ? { answerStyle: j } : {}, ...h.trim() ? { userPrompt: h.trim() } : {} });
  };
  return t.jsx(Xe, { initial: false, children: e && s ? t.jsx($e.aside, { role: "complementary", "aria-label": "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131", className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-violet-200 bg-white shadow-lg dark:border-violet-900/60 dark:bg-odp-surface", initial: { width: 0, opacity: 0.85 }, animate: { width: x, opacity: 1 }, exit: { width: 0, opacity: 0.85 }, transition: y ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 36 }, children: t.jsxs("div", { className: "relative h-full min-h-0", style: { width: x }, children: [t.jsx(Vi, { edge: "left", handleProps: v, isResizing: y, visibleOnHover: true, label: "\uD30C\uC0DD\uBB38\uC81C \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [t.jsxs("div", { className: "flex items-center justify-between border-b border-violet-200 px-3 py-2.5 dark:border-violet-900/60", children: [t.jsxs("div", { className: "min-w-0", children: [t.jsx("div", { className: "text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131" }), N ? t.jsxs("p", { className: "text-[11px] text-slate-500 dark:text-odp-muted", children: [N, "\uBC88 \uBB38\uD56D"] }) : null] }), t.jsx("button", { type: "button", "aria-label": "\uD30C\uC0DD\uBB38\uC81C \uD328\uB110 \uB2EB\uAE30", className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg", onClick: o, disabled: r, children: t.jsx(qe, { size: 16 }) })] }), t.jsxs("div", { className: "min-h-0 flex-1 space-y-3 overflow-y-auto p-3", children: [t.jsxs("div", { className: "rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-2 text-[11px] text-violet-950 dark:border-violet-800/70 dark:bg-violet-950/45 dark:text-violet-100", children: [t.jsx("p", { className: "font-semibold", children: "\uC6D0\uBCF8 \uBB38\uD56D" }), t.jsx("p", { className: "mt-1 line-clamp-4 opacity-90", children: s.question })] }), t.jsx("p", { className: "text-xs text-slate-600 dark:text-odp-muted", children: "\uC6D0\uBCF8 \uBB38\uD56D\uC744 \uBC14\uD0D5\uC73C\uB85C \uC720\uD615\uC744 \uBC14\uAFB8\uAC70\uB098 \uC694\uAD6C\uC0AC\uD56D\uC744 \uCD94\uAC00\uD574 \uC0C8 \uD30C\uC0DD \uBB38\uD56D\uC744 \uC0DD\uC131\uD569\uB2C8\uB2E4." }), t.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [[["choice", "\uAC1D\uAD00\uC2DD"], ["subjective-short", "\uB2E8\uB2F5\uD615"], ["subjective-essay", "\uC11C\uC220\uD615"]].map(([k, $]) => {
    const S = c === k;
    return t.jsx("button", { type: "button", disabled: r, className: `rounded-lg border px-3 py-1.5 text-xs font-semibold ${S ? "border-violet-500 bg-violet-50 text-violet-900 dark:bg-violet-950/40 dark:text-violet-100" : "border-slate-200 bg-white text-slate-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"}`, onClick: () => m(k), children: $ }, k);
  }), P === "choice" ? t.jsxs("label", { className: "ml-auto flex items-center gap-1.5 text-xs text-slate-600 dark:text-odp-muted", children: ["\uBCF4\uAE30", t.jsx("select", { className: "rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: u, disabled: r, onChange: (k) => d(Number(k.target.value) || u), children: Array.from({ length: ur - Pt + 1 }, (k, $) => Pt + $).map((k) => t.jsxs("option", { value: k, children: [k, "\uC9C0\uC120\uB2E4"] }, k)) })] }) : null] }), t.jsxs("label", { className: "block space-y-1.5", children: [t.jsxs("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: ["\uCD94\uAC00 \uC694\uAD6C\uC0AC\uD56D", t.jsx("span", { className: "ml-1 font-normal text-slate-500 dark:text-odp-muted", children: "(\uC120\uD0DD)" })] }), t.jsx("textarea", { className: "quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", placeholder: "\uC608: \uACC4\uC0B0 \uC704\uC8FC\uB85C \uBC14\uAFB8\uACE0, \uC624\uB2F5 \uBCF4\uAE30\uB294 \uD5F7\uAC08\uB9AC\uAC8C \uAD6C\uC131\uD574 \uC8FC\uC138\uC694.", value: h, disabled: r, onChange: (k) => f(k.target.value) })] })] }), t.jsxs("div", { className: "flex gap-2 border-t border-violet-200 p-3 dark:border-violet-900/60", children: [t.jsx(Q, { type: "button", variant: "secondary", size: "sm", className: "flex-1", disabled: r, onClick: o, children: "\uCDE8\uC18C" }), t.jsxs(Q, { type: "button", variant: "primary", size: "sm", className: "flex-1", disabled: r, onClick: w, children: [r ? t.jsx(ps, { size: 14, className: "animate-spin", "aria-hidden": true }) : t.jsx(nn, { size: 14 }), r ? "\uC0DD\uC131 \uC911\u2026" : "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131"] })] })] })] }) }, "quiz-derived-question-dock") : null });
}
function At(e) {
  const s = String(e || "").trim();
  if (!s) return "";
  const n = s.lastIndexOf("/");
  return n >= 0 ? s.slice(n + 1) : s;
}
const Yi = "z-100001 max-w-[min(92vw,420px)] break-all rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", ea = "flex w-full items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-2 py-1.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100", ta = "inline-flex max-w-full items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100", sa = "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-violet-400 bg-white outline-none focus-visible:ring-2 focus-visible:ring-violet-400 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600 dark:border-violet-600 dark:bg-odp-bgSoft dark:data-[state=checked]:border-violet-500 dark:data-[state=checked]:bg-violet-500";
function na({ path: e, isDock: s, onPreview: n, muted: r }) {
  const o = At(e), a = s ? `min-w-0 flex-1 truncate text-left hover:underline${r ? " opacity-60" : ""}` : `min-w-0 max-w-full truncate hover:underline${r ? " opacity-60" : ""}`, c = n ? t.jsx("button", { type: "button", className: a, onClick: () => n(e), children: o }) : t.jsx("span", { className: a, children: o });
  return t.jsxs(Ie, { children: [t.jsx(Ee, { asChild: true, children: c }), t.jsx(Ae, { children: t.jsxs(Me, { side: "top", sideOffset: 6, className: Yi, children: [e, t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function Nr({ paths: e, onRemove: s, onOpenPicker: n, onPreview: r, isPathEnabled: o, onToggleEnabled: a, label: c = "\uADFC\uAC70 \uBB38\uC11C", emptyHint: m = "\uC120\uD0DD\uB41C \uADFC\uAC70 \uBB38\uC11C \uC5C6\uC74C", layout: u = "chips" }) {
  const d = u === "dock", h = d && !!a;
  return t.jsx(Et, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs("div", { className: "space-y-1.5", children: [t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: c }), n ? t.jsx(Q, { type: "button", variant: "secondary", size: "sm", onClick: n, children: "\uC120\uD0DD" }) : null] }), e.length === 0 ? t.jsx("p", { className: "text-[11px] text-gray-500 dark:text-odp-muted", children: m }) : t.jsx("ul", { className: d ? "flex flex-col gap-1.5" : "flex flex-wrap gap-1.5", children: e.map((f) => {
    const x = o ? o(f) : true, v = d ? `${ea}${x ? "" : " opacity-70"}` : ta;
    return t.jsxs("li", { className: v, children: [h ? t.jsx(Ri, { className: sa, checked: x, onCheckedChange: (y) => a == null ? void 0 : a(f, y === true), "aria-label": `${f} ${x ? "\uC0AC\uC6A9 \uC911" : "\uC0AC\uC6A9 \uC548 \uD568"}`, children: t.jsx(Ti, { className: "text-white", children: t.jsx(vr, { size: 10, strokeWidth: 3 }) }) }) : null, t.jsx(na, { path: f, isDock: d, onPreview: r, muted: h && !x }), s ? t.jsx("button", { type: "button", "aria-label": `${f} \uC81C\uAC70`, className: d ? "ml-auto shrink-0 rounded-md p-1.5 hover:bg-violet-200/80 dark:hover:bg-violet-900" : "shrink-0 rounded p-0.5 hover:bg-violet-200/80 dark:hover:bg-violet-900", onClick: () => s(f), children: t.jsx(qe, { size: d ? 14 : 12 }) }) : null] }, f);
  }) })] }) });
}
const ra = /\*\(\s*정답\s*\)\*|\(\s*정답\s*\)|\[\s*정답\s*\]|\*\s*정답\s*\*/;
function oa(e) {
  return e.replace(/\*\(\s*정답\s*\)\*/g, "").replace(/\(\s*정답\s*\)/g, "").replace(/\[\s*정답\s*\]/g, "").replace(/\*\s*정답\s*\*/g, "").replace(/\*\*(.*?)\*\*/g, "$1").replace(/__(.*?)__/g, "$1").trim();
}
function ia(e) {
  let s = e.trim();
  const n = s.match(/^\[단답형\]\s*(.*)$/i);
  if (n) return { kind: "subjective", answerStyle: "short", question: (n[1] || "").trim() };
  const r = s.match(/^\[(?:주관식|서술형)\]\s*(.*)$/i);
  return r ? { kind: "subjective", answerStyle: "essay", question: (r[1] || "").trim() } : { kind: "choice", question: s };
}
const Vn = /\*{0,2}\s*📖\s*모범\s*답안\s*:?\s*\*{0,2}/, Kn = /\*{0,2}\s*💡\s*접근\s*Point!?\s*\*{0,2}/, Xn = /\*{0,2}\s*📖\s*해설\s*:?\s*\*{0,2}/, cs = /\*{0,2}\s*📚\s*근거\s*문서\s*:?\s*\*{0,2}/;
function aa(e) {
  const s = e.join(`
`);
  if (!cs.test(s) && !s.includes("\u{1F4DA} \uADFC\uAC70 \uBB38\uC11C")) return;
  const n = s.split(cs)[1] ?? "", r = [];
  for (const o of n.split(`
`)) {
    const a = o.trim().match(/^[-*]\s+(.+)$/);
    if (a == null ? void 0 : a[1]) {
      const c = a[1].trim().replace(/\\/g, "/").replace(/^\/+/, "");
      c && r.push(c);
    }
  }
  return r.length > 0 ? r : void 0;
}
function Kt(e) {
  return String(e || "").replace(/^\*+\s*/, "").replace(/\s*\*+$/, "").trim();
}
function la(e) {
  const s = e.join(`
`).trim();
  if (!s) return { point: "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.", explanation: "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." };
  let n, r = s;
  if (Vn.test(r)) {
    const m = r.split(Vn), d = (m[1] || "").trim().split(/(?=\*{0,2}\s*(?:💡\s*접근\s*Point!?|📖\s*해설|📚\s*근거\s*문서))/);
    n = Kt(d[0] || ""), r = [m[0], ...d.slice(1)].join(`
`).trim();
  }
  r = (r.split(cs)[0] || "").trim();
  let a = "", c = "";
  if (Kn.test(r) || Xn.test(r)) {
    const m = r.split(Xn), u = m[0] || "";
    c = Kt(m.slice(1).join(`
`)), a = Kt(u.replace(Kn, ""));
  } else c = Kt(r);
  return { point: a || "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.", explanation: c || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.", ...n ? { modelAnswer: n } : {} };
}
const ca = /^<!--\s*quiz-q-meta\s+([\s\S]*?)-->\s*$/;
function da(e) {
  try {
    const s = JSON.parse(e);
    if (!s || typeof s != "object") return null;
    const r = s.similarOf;
    if (!r || typeof r != "object") return {};
    const o = r, a = String(o.id || o.displayLabel || "").trim(), c = String(o.displayLabel || o.id || "").trim();
    return !a && !c ? {} : { similarOf: { id: a || c, displayLabel: c || a } };
  } catch {
    return null;
  }
}
function ua(e) {
  var _a2, _b;
  const n = (_b = (_a2 = String(e || "").match(/^(.+)-(?:유사|파생)\d+$/)) == null ? void 0 : _a2[1]) == null ? void 0 : _b.trim();
  if (n) return { id: n, displayLabel: n };
}
function Zn(e, s) {
  return !s && !e ? e : e ? `${e}
${s}` : s;
}
function ma(e) {
  return /^1\.\s+/.test(e.trim());
}
function fa(e) {
  const s = e.trim();
  return s.startsWith(">") || /^\*\*정답:\*\*/.test(s);
}
function as(e) {
  return e.trim().replace(/^>\s?/, "");
}
function pa(e) {
  const s = as(e);
  return cs.test(s) || s.includes("\u{1F4DA} \uADFC\uAC70 \uBB38\uC11C");
}
function xa(e) {
  return e.trim().startsWith(">");
}
function ha(e, s) {
  const n = e.trim();
  if (!n || !/^#+/.test(n)) return null;
  const r = n.split(`
`);
  let o = String(s + 1), a = o, c = "", m = null;
  const u = [];
  let d = 1, h;
  const f = [];
  let x = "choice", v, y, C = false, P = false, j = false;
  for (const W of r) {
    const M = W.trim(), U = M.match(ca);
    if (U == null ? void 0 : U[1]) {
      const E = da(U[1]);
      (E == null ? void 0 : E.similarOf) && (y = E.similarOf);
      continue;
    }
    const Y = M.match(/^#+\s*(?:🔖\s*)?(\d+(?:-(?:유사|파생)\d+)?)\.?(.*)/);
    if (Y) {
      a = (Y[1] || "").trim(), o = a;
      const E = ia((Y[2] || "").trim());
      x = E.kind, v = E.answerStyle, c = E.question, C = true, P = true, j = false;
      continue;
    }
    if (!C) continue;
    if (j) {
      if (xa(M)) {
        f.push(as(M));
        continue;
      }
      j = false;
    }
    if (P) {
      if (pa(M)) {
        P = false, j = true, f.push(as(M));
        continue;
      }
      if (ma(M)) P = false;
      else if (x === "subjective" && fa(M)) P = false;
      else if (M.startsWith("![")) {
        c = Zn(c, M);
        const E = M.match(/!\[.*?\]\((.*?)\)/);
        (E == null ? void 0 : E[1]) && !m && (m = E[1]);
        continue;
      } else {
        if (!M && !c) continue;
        if (P) {
          c = Zn(c, M);
          continue;
        }
      }
    }
    if (M.startsWith("![")) {
      const E = M.match(/!\[.*?\]\((.*?)\)/);
      (E == null ? void 0 : E[1]) && (m = E[1]);
      continue;
    }
    const je = M.match(/^\*\*정답:\*\*\s*(.*)$/);
    if (je) {
      h = (je[1] || "").trim();
      continue;
    }
    if (/^\d+\.\s+/.test(M)) {
      const E = M.match(/^(\d+)\.\s+(.*)/);
      if (E) {
        const B = Number.parseInt(E[1] || "0", 10), Z = (E[2] || "").trim(), J = ra.test(Z);
        u.push(oa(Z)), J && (d = B);
      }
      continue;
    }
    M.startsWith(">") && f.push(as(M));
  }
  const { point: N, explanation: w, modelAnswer: k } = la(f), $ = aa(f), S = h || k;
  let O = x, L = v;
  return O === "choice" && u.length === 0 && S && (O = "subjective", L = h ? "short" : "essay"), O === "choice" && u.length === 0 && !S || O === "subjective" && !c || O === "choice" && (!c || u.length === 0) ? null : (y || (y = ua(a)), c = c.trimEnd(), { id: o, displayLabel: a, kind: O, question: c, image: m, point: N, explanation: w, ...O === "subjective" && L ? { answerStyle: L } : {}, ...O === "choice" ? { options: u, answer: d } : {}, ...O === "subjective" && S ? { modelAnswer: S } : {}, ...$ ? { sourcePaths: $ } : {}, ...y ? { similarOf: y, isGenerated: true } : {} });
}
function ot(e) {
  const { config: s, body: n } = $o(e), { session: r, body: o } = Po(n), a = [];
  o.split(/(?=^#+\s*(?:🔖\s*)?\d+)/m).forEach((d, h) => {
    const f = ha(d, h);
    f && a.push(f);
  });
  const m = new Set(a.map((d) => d.id)), u = r && m.size > 0 ? zo(r, m, a) : r;
  return { config: Ys(s), questions: a, session: u && !Zs(u) ? u : null };
}
function Xt(e, s) {
  return (s == null ? void 0 : s.sourcePaths) && s.sourcePaths.length > 0 ? [...s.sourcePaths] : mr(e);
}
function Ks(e) {
  let s = 0;
  for (const n of e) {
    const r = String(n.displayLabel || "").match(/^(\d+)/);
    if (r == null ? void 0 : r[1]) {
      const o = Number.parseInt(r[1], 10);
      Number.isFinite(o) && o > s && (s = o);
    }
  }
  return String(s + 1);
}
function Cr(e, s) {
  const n = String(e.displayLabel || s || "1").trim() || "1", r = String(e.point || "").trim() || "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694.", o = String(e.explanation || "").trim() || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.", a = e.sourcePaths && e.sourcePaths.length > 0 ? [...e.sourcePaths] : void 0;
  if (e.kind === "subjective") {
    const m = e.answerStyle || "short";
    return { id: n, displayLabel: n, kind: "subjective", answerStyle: m, question: String(e.question || "").trim(), modelAnswer: String(e.modelAnswer || "").trim(), point: r, explanation: o, ...a ? { sourcePaths: a } : {} };
  }
  const c = (e.options || []).map((m) => String(m || "").trim());
  return { id: n, displayLabel: n, kind: "choice", question: String(e.question || "").trim(), options: c, answer: e.answer && e.answer >= 1 ? e.answer : 1, point: r, explanation: o, ...a ? { sourcePaths: a } : {} };
}
function ga(e) {
  if (!String(e.question || "").trim()) return "\uC9C8\uBB38 \uBCF8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694.";
  if (e.kind === "choice") {
    const s = (e.options || []).map((o) => String(o || "").trim());
    if (s.filter(Boolean).length < 2) return "\uAC1D\uAD00\uC2DD\uC740 \uCD5C\uC18C 2\uAC1C \uC120\uD0DD\uC9C0\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4.";
    const r = e.answer || 0;
    return r < 1 || r > s.length || !s[r - 1] ? "\uC815\uB2F5 \uC120\uD0DD\uC9C0\uB97C \uC9C0\uC815\uD558\uC138\uC694." : null;
  }
  return String(e.modelAnswer || "").trim() ? null : e.answerStyle === "essay" ? "\uBAA8\uBC94 \uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694." : "\uC815\uB2F5\uC744 \uC785\uB825\uD558\uC138\uC694.";
}
function ba(e, s) {
  const n = e.kind || "choice", r = e.answerStyle === "essay" ? "essay" : "short", o = n === "choice" ? Je(Math.max(s, (e.options || []).filter(Boolean).length)) : s, a = n === "choice" ? Ye(e.options || [], o) : [];
  return { kind: n, answerStyle: r, question: e.question ?? "", options: a, answer: e.answer && e.answer >= 1 ? Math.min(o, e.answer) : 1, modelAnswer: e.modelAnswer ?? "", point: e.point ?? "", explanation: e.explanation ?? "", choiceCount: o };
}
function ka({ isOpen: e, onClose: s, styleTemplate: n, initial: r, nextLabel: o, onSubmit: a, onOpenSourcePicker: c, onFixWithAi: m }) {
  const u = !!r, [d, h] = l.useState((r == null ? void 0 : r.kind) || n.kind), [f, x] = l.useState((r == null ? void 0 : r.answerStyle) || n.answerStyle), [v, y] = l.useState(() => r ? _e(r, n.choiceCount) : n.choiceCount), [C, P] = l.useState((r == null ? void 0 : r.question) || ""), [j, N] = l.useState(() => Ye((r == null ? void 0 : r.options) || [], r ? _e(r, n.choiceCount) : n.choiceCount)), [w, k] = l.useState((r == null ? void 0 : r.answer) || 1), [$, S] = l.useState((r == null ? void 0 : r.modelAnswer) || ""), [O, L] = l.useState((r == null ? void 0 : r.point) || ""), [_, W] = l.useState((r == null ? void 0 : r.explanation) || ""), [M, U] = l.useState((r == null ? void 0 : r.sourcePaths) || []), [Y, je] = l.useState(""), [E, B] = l.useState(false), [Z, J] = l.useState(""), [oe, le] = l.useState(false), mt = l.useCallback((R) => {
    const H = Je(R);
    y(H), N((ue) => Ye(ue, H)), k((ue) => Math.min(Math.max(1, ue), H));
  }, []);
  l.useEffect(() => {
    if (!e) {
      B(false), J(""), le(false), je("");
      return;
    }
    if (r) {
      const R = _e(r, n.choiceCount);
      h(r.kind), x(r.answerStyle === "essay" ? "essay" : "short"), y(R), P(r.question || ""), N(Ye(r.options || [], R)), k(r.answer || 1), S(r.modelAnswer || ""), L(r.point || ""), W(r.explanation || ""), U(r.sourcePaths || []);
    } else h(n.kind), x(n.answerStyle), y(n.choiceCount), P(""), N(Ye([], n.choiceCount)), k(1), S(""), L(""), W(""), U([]);
    B(false), J(""), je("");
  }, [e, r, n]);
  const ft = l.useMemo(() => {
    const R = { kind: d, displayLabel: (r == null ? void 0 : r.displayLabel) || o, question: C, point: O, explanation: _, sourcePaths: M };
    return d === "subjective" ? { ...R, answerStyle: f, modelAnswer: $ } : { ...R, options: Ye(j, v), answer: w };
  }, [d, f, r == null ? void 0 : r.displayLabel, o, C, j, v, w, $, O, _, M]), z = () => {
    const R = ga(ft);
    if (R) {
      je(R);
      return;
    }
    const H = Cr(ft, o);
    r && (H.id = r.id, H.displayLabel = r.displayLabel), a(H), s();
  }, pt = async () => {
    if (!(!m || oe)) {
      je(""), le(true);
      try {
        const R = await m({ instructions: Z, form: ft });
        if (!R) return;
        const H = ba(R, v);
        h(H.kind), x(H.answerStyle), y(H.choiceCount), P(H.question), N(H.options), k(H.answer), S(H.modelAnswer), L(H.point), W(H.explanation), B(false);
      } catch (R) {
        je((R instanceof Error ? R.message : "") || "\uBB38\uC81C \uACE0\uCE58\uAE30\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        le(false);
      }
    }
  };
  return t.jsx(en, { isOpen: e, onClose: s, contentClassName: "quiz-pane max-w-2xl max-h-[90vh]", children: t.jsxs("div", { className: "flex max-h-[min(80vh,720px)] flex-col gap-3 overflow-y-auto p-4 text-sm", children: [t.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [t.jsx("h2", { className: "text-base font-bold text-gray-900 dark:text-odp-fgStrong", children: u ? "\uBB38\uC81C \uC218\uC815" : "\uBB38\uC81C \uCD94\uAC00" }), u && m ? t.jsxs(Q, { type: "button", variant: E ? "primary" : "secondary", size: "sm", "aria-pressed": E, disabled: oe, onClick: () => B((R) => !R), children: [t.jsx(It, { size: 14 }), "\uBB38\uC81C \uACE0\uCE58\uAE30"] }) : null] }), u && E && m ? t.jsxs("div", { className: "space-y-2 rounded-xl border border-violet-200 bg-violet-50/80 p-3 dark:border-violet-900/60 dark:bg-violet-950/25", children: [t.jsx("p", { className: "text-xs text-violet-900 dark:text-violet-100", children: "\uD604\uC7AC \uBB38\uD56D\uC744 \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB294 \uAC83\uC73C\uB85C \uBCF4\uACE0 AI\uAC00 \uAD50\uC815\uD569\uB2C8\uB2E4. \uC694\uAD6C\uC0AC\uD56D\uC744 \uC801\uC73C\uBA74 \uBB38\uD56D \uBC29\uD5A5\xB7\uC8FC\uC81C\xB7\uB09C\uC774\uB3C4\uB97C \uC870\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-violet-900 dark:text-violet-100", children: "\uC218\uC815 \uC694\uAD6C\uC0AC\uD56D (\uC120\uD0DD)" }), t.jsx("textarea", { className: "min-h-16 w-full rounded-lg border border-violet-200 bg-white p-2 text-xs dark:border-violet-800 dark:bg-odp-bgSoft", placeholder: "\uC608: \uACC4\uC0B0 \uACFC\uC815\uC744 \uB2E8\uC21C\uD654\uD558\uACE0, \uC624\uB2F5 \uBCF4\uAE30\uB97C \uB354 \uADF8\uB7F4\uB4EF\uD558\uAC8C \uBC14\uAFD4 \uC8FC\uC138\uC694.", value: Z, onChange: (R) => J(R.target.value), disabled: oe })] }), t.jsx("div", { className: "flex justify-end", children: t.jsxs(Q, { type: "button", variant: "primary", size: "sm", disabled: oe, onClick: () => {
    pt();
  }, children: [oe ? t.jsx(ps, { size: 14, className: "animate-spin", "aria-hidden": true }) : t.jsx(It, { size: 14 }), oe ? "\uACE0\uCE58\uB294 \uC911\u2026" : "AI\uB85C \uACE0\uCE58\uAE30"] }) })] }) : null, t.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [[["choice", "\uAC1D\uAD00\uC2DD"], ["subjective-short", "\uB2E8\uB2F5\uD615"], ["subjective-essay", "\uC11C\uC220\uD615"]].map(([R, H]) => {
    const ue = R === "choice" ? d === "choice" : d === "subjective" && f === (R === "subjective-short" ? "short" : "essay");
    return t.jsx("button", { type: "button", className: `rounded-lg border px-3 py-1.5 text-xs font-semibold ${ue ? "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-100" : "border-gray-200 bg-white text-gray-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg"}`, onClick: () => {
      R === "choice" ? h("choice") : (h("subjective"), x(R === "subjective-short" ? "short" : "essay"));
    }, children: H }, R);
  }), d === "choice" ? t.jsxs("label", { className: "ml-auto flex items-center gap-1.5 text-xs text-gray-600 dark:text-odp-muted", children: ["\uBCF4\uAE30", t.jsx("select", { className: "rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: v, onChange: (R) => mt(Number(R.target.value) || v), children: Array.from({ length: ur - Pt + 1 }, (R, H) => Pt + H).map((R) => t.jsxs("option", { value: R, children: [R, "\uC9C0\uC120\uB2E4"] }, R)) })] }) : null] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uC9C8\uBB38 (Markdown)" }), t.jsx("textarea", { className: "min-h-24 w-full rounded-lg border border-gray-300 bg-white p-2 font-mono text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: C, onChange: (R) => P(R.target.value) }), C.trim() ? t.jsx(Te, { text: C, previewId: "quiz-add-q-preview", className: "rounded border border-gray-100 p-2 text-xs dark:border-odp-borderSoft" }) : null] }), d === "choice" ? t.jsxs("div", { className: "space-y-2", children: [t.jsxs("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: ["\uC120\uD0DD\uC9C0 (", v, "\uC9C0\uC120\uB2E4)"] }), j.map((R, H) => t.jsxs("div", { className: "flex items-start gap-2", children: [t.jsx("input", { type: "radio", name: "quiz-add-answer", checked: w === H + 1, onChange: () => k(H + 1), className: "mt-2", "aria-label": `${H + 1}\uBC88 \uC815\uB2F5` }), t.jsx("textarea", { className: "min-h-10 flex-1 rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: R, placeholder: `${H + 1}\uBC88`, onChange: (ue) => {
    const he = [...j];
    he[H] = ue.target.value, N(he);
  } })] }, H))] }) : t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: f === "essay" ? "\uBAA8\uBC94 \uB2F5\uC548" : "\uC815\uB2F5" }), f === "essay" ? t.jsx("textarea", { className: "min-h-20 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: $, onChange: (R) => S(R.target.value) }) : t.jsx("input", { className: "w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: $, onChange: (R) => S(R.target.value) })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uC811\uADFC Point (\uC120\uD0DD)" }), t.jsx("textarea", { className: "min-h-14 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: O, onChange: (R) => L(R.target.value) })] }), t.jsxs("label", { className: "block space-y-1", children: [t.jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fgStrong", children: "\uD574\uC124 (\uC120\uD0DD)" }), t.jsx("textarea", { className: "min-h-14 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: _, onChange: (R) => W(R.target.value) })] }), t.jsx(Nr, { paths: M, onRemove: (R) => U((H) => H.filter((ue) => ue !== R)), onOpenPicker: () => c(M, (R) => U(R)), label: "\uBB38\uD56D \uADFC\uAC70 \uBB38\uC11C (\uC120\uD0DD)" }), Y ? t.jsx("p", { className: "text-xs font-medium text-rose-600", children: Y }) : null, t.jsxs("div", { className: "flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-odp-borderSoft", children: [t.jsx(Q, { type: "button", variant: "secondary", onClick: s, disabled: oe, children: "\uCDE8\uC18C" }), t.jsxs(Q, { type: "button", variant: "primary", onClick: z, disabled: oe, children: [u ? t.jsx(fs, { size: 14 }) : t.jsx(Io, { size: 14 }), u ? "\uC800\uC7A5" : "\uCD94\uAC00"] })] })] }) });
}
function wa(e, s) {
  const n = [...e];
  let r = Number.parseInt(Ks(e), 10) || 1;
  for (const o of s) {
    const a = String(r);
    n.push({ ...o, id: o.isGenerated ? o.id : a, displayLabel: a }), r += 1;
  }
  return n;
}
function ya(e, s, n) {
  return n.mode === "replace" ? { config: n.mergeConfig !== false ? Ys({ ...e.config, ...s.config, sourcePaths: s.config.sourcePaths.length > 0 ? s.config.sourcePaths : e.config.sourcePaths }) : e.config, questions: s.questions.map((o) => ({ ...o })) } : { config: e.config, questions: wa(e.questions, s.questions) };
}
const va = `### 1. \uB9F5\uB9AC\uB4C0\uC2A4\uC5D0 \uB300\uD55C \uC124\uBA85\uC73C\uB85C \uAC00\uC7A5 \uC801\uC808\uD55C \uAC83\uC740?

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
function ja({ isOpen: e, onClose: s, current: n, onApply: r }) {
  const [o, a] = l.useState(""), [c, m] = l.useState("append"), [u, d] = l.useState(""), [h, f] = l.useState(false), x = (y = false) => {
    const C = ot(o);
    if (!C.questions.length) {
      d("\uD30C\uC2F1\uB41C \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uB9C8\uD06C\uB2E4\uC6B4 \uD615\uC2DD\uC744 \uD655\uC778\uD558\uC138\uC694.");
      return;
    }
    if (c === "replace" && !y) {
      f(true);
      return;
    }
    const P = ya(n, C, { mode: c, mergeConfig: c === "replace" });
    r(P, c), s();
  }, v = (y) => {
    if (!y) return;
    const C = new FileReader();
    C.onload = () => {
      a(String(C.result || "")), d("");
    }, C.readAsText(y, "UTF-8");
  };
  return t.jsxs(t.Fragment, { children: [t.jsx(en, { isOpen: e, onClose: s, contentClassName: "quiz-pane max-w-3xl max-h-[90vh]", children: t.jsxs("div", { className: "flex max-h-[min(80vh,720px)] flex-col gap-3 p-4 text-sm", children: [t.jsx("h2", { className: "text-base font-bold text-gray-900 dark:text-odp-fgStrong", children: "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30" }), t.jsx("p", { className: "text-xs text-gray-600 dark:text-odp-muted", children: "`.quiz.md` \uBCF8\uBB38\uC744 \uBD99\uC5EC\uB123\uAC70\uB098 \uD30C\uC77C\uC744 \uBD88\uB7EC\uC624\uC138\uC694. \uC5EC\uB7EC \uBB38\uD56D\uC744 \uD55C \uBC88\uC5D0 \uB4F1\uB85D\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), t.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs", children: [t.jsxs(Q, { type: "button", variant: "secondary", onClick: () => {
    var _a2;
    return (_a2 = document.getElementById("quiz-bulk-file")) == null ? void 0 : _a2.click();
  }, children: [t.jsx(Eo, { size: 14 }), "\uD30C\uC77C \uBD88\uB7EC\uC624\uAE30"] }), t.jsx("input", { id: "quiz-bulk-file", type: "file", accept: ".md,.quiz.md,.txt,.markdown", className: "hidden", onChange: (y) => {
    var _a2;
    return v(((_a2 = y.target.files) == null ? void 0 : _a2[0]) || null);
  } }), t.jsx(Q, { type: "button", variant: "tertiary", onClick: () => {
    a(va), d("");
  }, children: "\uC0D8\uD50C \uBD88\uB7EC\uC624\uAE30" }), t.jsxs("div", { className: "ml-auto flex gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-odp-bgSoft", children: [t.jsx("button", { type: "button", className: `rounded-md px-2 py-1 font-semibold ${c === "append" ? "bg-white shadow-sm dark:bg-odp-surface" : "text-gray-600 dark:text-odp-muted"}`, onClick: () => m("append"), children: "\uCD94\uAC00" }), t.jsx("button", { type: "button", className: `rounded-md px-2 py-1 font-semibold ${c === "replace" ? "bg-white shadow-sm dark:bg-odp-surface" : "text-gray-600 dark:text-odp-muted"}`, onClick: () => m("replace"), children: "\uAD50\uCCB4" })] })] }), t.jsx("textarea", { className: "min-h-64 w-full rounded-xl border border-gray-300 bg-slate-50 p-3 font-mono text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: o, onChange: (y) => {
    a(y.target.value), d("");
  }, placeholder: "\uB9C8\uD06C\uB2E4\uC6B4 \uBB38\uC81C \uBAA9\uB85D\uC744 \uBD99\uC5EC\uB123\uC73C\uC138\uC694\u2026" }), u ? t.jsx("p", { className: "text-xs font-medium text-rose-600", children: u }) : null, t.jsxs("div", { className: "flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-odp-borderSoft", children: [t.jsx(Q, { type: "button", variant: "secondary", onClick: s, children: "\uCDE8\uC18C" }), t.jsxs(Q, { type: "button", variant: "primary", onClick: () => x(false), children: [t.jsx(fs, { size: 14 }), "\uC801\uC6A9"] })] })] }) }), t.jsx(Fs, { isOpen: h, variant: "danger", title: "\uBB38\uD56D \uC804\uCCB4 \uAD50\uCCB4", message: "\uAE30\uC874 \uBB38\uD56D\uC744 \uBAA8\uB450 \uC9C0\uC6B0\uACE0 \uBD99\uC5EC\uB123\uC740 \uB0B4\uC6A9\uC73C\uB85C \uAD50\uCCB4\uD560\uAE4C\uC694? \uD480\uC774 \uC9C4\uD589 \uAE30\uB85D\uB3C4 \uCD08\uAE30\uD654\uB429\uB2C8\uB2E4.", confirmLabel: "\uAD50\uCCB4", cancelLabel: "\uCDE8\uC18C", onConfirm: () => {
    f(false), x(true);
  }, onCancel: () => f(false) })] });
}
function Yn(e, s) {
  const n = [], r = (o) => {
    for (const a of o) if (a.type === "folder" && a.children) r(a.children);
    else if (a.type === "file") {
      if (!(a.path || a.name || "").toLowerCase().endsWith(".md") || s && a.path === s || Mo(a.path) && s && a.path === s) continue;
      n.push(a);
    }
  };
  return r(e || []), n;
}
function Sa({ isOpen: e, onClose: s, tree: n, selected: r, excludePath: o, onConfirm: a, onExpandFolder: c, onDropHostChange: m, onRegisterDropPathsMerge: u }) {
  const [d, h] = l.useState(r), [f, x] = l.useState(""), v = l.useMemo(() => Array.isArray(n) ? n : [], [n]);
  l.useEffect(() => {
    e && h(r);
  }, [e, r]);
  const y = l.useCallback((j) => {
    j.length && h((N) => {
      const w = new Set(N);
      for (const k of j) w.add(k);
      return [...w].sort((k, $) => k.localeCompare($));
    });
  }, []);
  l.useEffect(() => (u == null ? void 0 : u(y), () => u == null ? void 0 : u(null)), [y, u]), l.useEffect(() => () => m == null ? void 0 : m(null), [m]);
  const C = l.useMemo(() => {
    var _a2;
    if (!f) return v;
    const j = (N) => {
      for (const w of N) {
        if (w.path === f) return w;
        if (w.children) {
          const k = j(w.children);
          if (k) return k;
        }
      }
      return null;
    };
    return ((_a2 = j(v)) == null ? void 0 : _a2.children) || [];
  }, [v, f]), P = (j) => {
    h((N) => N.includes(j) ? N.filter((w) => w !== j) : [...N, j]);
  };
  return t.jsx(en, { isOpen: e, onClose: s, contentClassName: "quiz-pane max-w-lg max-h-[90vh]", children: t.jsxs("div", { className: "flex max-h-[min(75vh,640px)] flex-col gap-3 p-4 text-sm", children: [t.jsx("h2", { className: "text-base font-bold text-gray-900 dark:text-odp-fgStrong", children: "\uADFC\uAC70 \uBB38\uC11C \uC120\uD0DD" }), t.jsx("p", { className: "text-xs text-gray-600 dark:text-odp-muted", children: "vault\uC758 `.md` \uD30C\uC77C\uC744 \uB2E4\uC911 \uC120\uD0DD\uD558\uAC70\uB098, \uC0AC\uC774\uB4DC\uBC14\uC5D0\uC11C \uB04C\uC5B4\uB2E4 \uB193\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (\uD604\uC7AC quiz \uD30C\uC77C\uC740 \uC81C\uC678)" }), f ? t.jsx("button", { type: "button", className: "text-left text-xs text-blue-600 hover:underline", onClick: () => {
    const j = f.replace(/\/$/, "").split("/").filter(Boolean);
    j.pop(), x(j.length ? `${j.join("/")}/` : "");
  }, children: "\u2190 \uC0C1\uC704 \uD3F4\uB354" }) : null, t.jsx("div", { ref: m, className: "relative min-h-48 flex-1", children: t.jsxs("ul", { className: "h-full min-h-48 space-y-1 overflow-y-auto rounded-lg border border-gray-200 p-2 dark:border-odp-borderSoft", children: [C.map((j) => {
    if (j.type === "folder") return t.jsx("li", { children: t.jsxs("button", { type: "button", className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg", onClick: async () => {
      await (c == null ? void 0 : c(j)), x(j.path.endsWith("/") ? j.path : `${j.path}/`);
    }, children: [t.jsx(Ao, { size: 14 }), j.name] }) }, j.path);
    if (!(j.path || "").toLowerCase().endsWith(".md") || o && j.path === o) return null;
    const w = d.includes(j.path);
    return t.jsx("li", { children: t.jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-odp-focusBg", children: [t.jsx("input", { type: "checkbox", checked: w, onChange: () => P(j.path) }), t.jsx("span", { className: "truncate", children: j.name })] }) }, j.path);
  }), C.length === 0 ? t.jsx("li", { className: "px-2 py-6 text-center text-xs text-gray-400", children: "\uD56D\uBAA9 \uC5C6\uC74C" }) : null] }) }), t.jsxs("p", { className: "text-[11px] text-gray-500 dark:text-odp-muted", children: [d.length, "\uAC1C \uC120\uD0DD\uB428", Yn(v, o).length ? ` / vault md ${Yn(v, o).length}\uAC1C` : ""] }), t.jsxs("div", { className: "flex justify-end gap-2", children: [t.jsx(Q, { type: "button", variant: "secondary", onClick: s, children: "\uCDE8\uC18C" }), t.jsxs(Q, { type: "button", variant: "primary", onClick: () => {
    a(d), s();
  }, children: [t.jsx(fs, { size: 14 }), "\uC801\uC6A9"] })] })] }) });
}
function Na(e) {
  switch (e) {
    case "running":
      return t.jsx(ps, { size: 13, className: "animate-spin text-violet-600 dark:text-violet-300" });
    case "done":
      return t.jsx(vr, { size: 13, className: "text-emerald-600 dark:text-emerald-400" });
    case "error":
      return t.jsx(qe, { size: 13, className: "text-rose-600 dark:text-rose-400" });
    case "skipped":
      return t.jsx(ji, { size: 13, className: "text-slate-400 dark:text-odp-muted" });
    default:
      return t.jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600", "aria-hidden": true });
  }
}
function Zt({ title: e, body: s }) {
  return s.trim() ? t.jsxs("div", { className: "space-y-1", children: [t.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-odp-muted", children: e }), t.jsx("pre", { className: "max-h-40 overflow-auto rounded border border-slate-200 bg-slate-50 p-2 font-mono text-[10px] leading-snug text-slate-800 dark:border-odp-borderSoft dark:bg-odp-bg dark:text-odp-fg", children: s })] }) : null;
}
function Ca({ step: e }) {
  var _a2, _b, _c2, _d;
  return !!((_a2 = e.systemPrompt) == null ? void 0 : _a2.trim()) || !!((_b = e.llmInstruction) == null ? void 0 : _b.trim()) || !!((_c2 = e.llmResponse) == null ? void 0 : _c2.trim()) || !!((_d = e.error) == null ? void 0 : _d.trim()) ? t.jsxs("div", { className: "space-y-2", children: [t.jsx(Zt, { title: "System prompt", body: e.systemPrompt || "" }), t.jsx(Zt, { title: "Instruction / input", body: e.llmInstruction || "" }), t.jsx(Zt, { title: "Model response / artifact", body: e.llmResponse || "" }), e.error ? t.jsx(Zt, { title: "Error", body: e.error }) : null] }) : t.jsx("p", { className: "text-[10px] text-slate-400 dark:text-odp-muted", children: "\uC800\uC7A5\uB41C \uD504\uB86C\uD504\uD2B8/\uC751\uB2F5 \uC5C6\uC74C" });
}
function $a({ step: e, showDetail: s }) {
  const n = e.error || e.detail;
  return t.jsxs("li", { className: "space-y-1.5 py-0.5", children: [t.jsxs("div", { className: "flex items-start gap-2", children: [t.jsx("span", { className: "mt-0.5 shrink-0", children: Na(e.status) }), t.jsxs("div", { className: "min-w-0 flex-1", children: [t.jsxs("p", { className: `text-[11px] font-medium leading-snug ${e.status === "error" ? "text-rose-700 dark:text-rose-300" : e.status === "skipped" ? "text-slate-400 dark:text-odp-muted" : "text-slate-700 dark:text-odp-fg"}`, children: [e.label, e.status === "running" ? t.jsx("span", { className: "ml-1 font-normal text-violet-600 dark:text-violet-300", children: "\uC9C4\uD589 \uC911" }) : null] }), n ? t.jsx("p", { className: `mt-0.5 truncate text-[10px] leading-snug ${e.status === "error" ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-odp-muted"}`, title: n, children: n }) : null] })] }), s ? t.jsx("div", { className: "ml-5 rounded-md border border-slate-100 bg-slate-50/80 p-2 dark:border-odp-borderSoft dark:bg-odp-bg/60", children: t.jsx(Ca, { step: e }) }) : null] });
}
function Pa({ job: e, detailOpen: s, onToggleDetail: n, onRemove: r }) {
  const o = e.kind === "similar" ? "\uC720\uC0AC\uBB38\uC81C" : e.kind === "derived" ? "\uD30C\uC0DD\uBB38\uC81C" : "\uADFC\uAC70 \uCD9C\uC81C", a = e.kind === "similar" ? t.jsx(It, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-300" }) : e.kind === "derived" ? t.jsx(nn, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-300" }) : t.jsx(Re, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-300" });
  return t.jsxs("article", { className: `rounded-lg border px-2.5 py-2 ${e.status === "error" ? "border-rose-200 bg-rose-50/80 dark:border-rose-900/50 dark:bg-rose-950/30" : e.status === "done" ? "border-emerald-200/80 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20" : "border-slate-200 bg-white/90 dark:border-odp-borderSoft dark:bg-odp-bgSoft/90"}`, children: [t.jsxs("div", { className: "mb-1.5 flex items-start gap-2", children: [a, t.jsxs("div", { className: "min-w-0 flex-1", children: [t.jsxs("p", { className: "text-xs font-bold text-slate-900 dark:text-odp-fgStrong", children: [o, e.questionLabel ? t.jsxs("span", { className: "font-semibold text-violet-700 dark:text-violet-300", children: [" ", "\xB7 ", e.questionLabel] }) : null, e.status === "running" ? t.jsx("span", { className: "ml-1 text-[10px] font-medium text-violet-600 dark:text-violet-300", children: "\uC9C4\uD589 \uC911" }) : null, e.status === "done" && e.resultLabel ? t.jsxs("span", { className: "ml-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-300", children: ["\u2192 ", e.resultLabel] }) : null] }), t.jsx("p", { className: "truncate text-[11px] text-slate-600 dark:text-odp-muted", title: e.questionPreview, children: e.questionPreview }), e.status === "error" && e.error ? t.jsx("p", { className: "mt-1 text-[10px] leading-snug text-rose-700 dark:text-rose-300", children: e.error }) : null, e.logPath ? t.jsxs("p", { className: "mt-1 truncate font-mono text-[10px] text-slate-500 dark:text-odp-muted", title: e.logPath, children: ["log: ", e.logPath] }) : null] }), t.jsxs("div", { className: "flex shrink-0 flex-col gap-0.5", children: [t.jsx("button", { type: "button", onClick: n, className: "rounded p-1 text-slate-500 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-expanded": s, "aria-label": s ? "\uC790\uC138\uD788 \uBCF4\uAE30 \uC811\uAE30" : "\uC790\uC138\uD788 \uBCF4\uAE30", children: s ? t.jsx(Dn, { size: 14 }) : t.jsx(Vs, { size: 14 }) }), e.status !== "running" ? t.jsx("button", { type: "button", onClick: r, className: "rounded p-1 text-slate-500 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": "\uBAA9\uB85D\uC5D0\uC11C \uC81C\uAC70", children: t.jsx(qe, { size: 14 }) }) : null] })] }), t.jsx("div", { className: "mb-1.5 flex justify-end", children: t.jsxs(Q, { type: "button", variant: "tertiary", size: "sm", onClick: n, children: [s ? t.jsx(Dn, { size: 14 }) : t.jsx(Vs, { size: 14 }), s ? "\uC811\uAE30" : "\uC790\uC138\uD788 \uBCF4\uAE30"] }) }), t.jsx("ul", { className: "space-y-0.5 border-t border-slate-100 pt-1.5 dark:border-odp-borderSoft", children: e.steps.map((c) => t.jsx($a, { step: c, showDetail: s }, c.id)) })] });
}
function za({ jobs: e, isOpen: s, size: n, onClose: r, onResize: o, onRemoveJob: a, onClearFinished: c, onUserEngage: m, onPointerEngageChange: u, onFocusEngageChange: d }) {
  const h = l.useRef(null), [f, x] = l.useState({}), v = l.useRef({ mode: null, startX: 0, startY: 0, startW: 0, startH: 0 }), y = (k) => {
    x(($) => {
      const S = { ...$ };
      return S[k] ? delete S[k] : S[k] = true, S;
    });
  }, C = l.useCallback((k, $) => {
    $.preventDefault(), $.stopPropagation(), v.current = { mode: k, startX: $.clientX, startY: $.clientY, startW: n.width, startH: n.height };
    const S = (L) => {
      const _ = v.current;
      if (!_.mode) return;
      const W = _.startX - L.clientX, M = _.startY - L.clientY;
      let U = _.startW, Y = _.startH;
      (_.mode === "width" || _.mode === "both") && (U = _.startW + W), (_.mode === "height" || _.mode === "both") && (Y = _.startH + M), o({ width: U, height: Y });
    }, O = () => {
      v.current.mode = null, document.removeEventListener("pointermove", S), document.removeEventListener("pointerup", O);
    };
    document.addEventListener("pointermove", S), document.addEventListener("pointerup", O);
  }, [o, n.height, n.width]), P = e.filter((k) => k.status === "running").length, j = e.filter((k) => k.status === "done").length, N = e.filter((k) => k.status === "error").length, w = e.some((k) => k.status !== "running");
  return t.jsx(Xe, { children: s ? t.jsxs($e.div, { ref: h, role: "dialog", "aria-modal": "false", "aria-label": "\uBB38\uC81C \uC0DD\uC131 \uB300\uAE30\uC5F4", className: "fixed bottom-4 right-4 z-10050 flex flex-col overflow-hidden rounded-xl border border-violet-300/60 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-800/50 dark:bg-odp-bgSoft/95", style: { width: n.width, height: n.height }, initial: { y: 48, opacity: 0, scale: 0.98 }, animate: { y: 0, opacity: 1, scale: 1 }, exit: { y: 48, opacity: 0, scale: 0.98 }, transition: { type: "spring", stiffness: 420, damping: 34 }, onMouseEnter: () => u == null ? void 0 : u(true), onMouseLeave: () => u == null ? void 0 : u(false), onFocusCapture: () => d == null ? void 0 : d(true), onBlurCapture: (k) => {
    k.currentTarget.contains(k.relatedTarget) || (d == null ? void 0 : d(false));
  }, onPointerDown: () => m == null ? void 0 : m(), children: [t.jsx("div", { className: "absolute left-0 top-0 z-20 h-3 w-3 cursor-nwse-resize touch-none", "aria-hidden": true, onPointerDown: (k) => C("both", k) }), t.jsx("div", { className: "absolute left-0 right-0 top-0 z-10 h-2 cursor-ns-resize touch-none", "aria-hidden": true, onPointerDown: (k) => C("height", k) }), t.jsx("div", { className: "absolute bottom-0 left-0 top-0 z-10 w-2 cursor-ew-resize touch-none", "aria-hidden": true, onPointerDown: (k) => C("width", k) }), t.jsxs("div", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-violet-200/70 bg-violet-50/90 px-3 py-2 dark:border-violet-900/40 dark:bg-violet-950/40", children: [t.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-950 dark:text-violet-100", children: [t.jsx(vi, { size: 16, className: "shrink-0 opacity-50", "aria-hidden": true }), t.jsx(Re, { size: 16, className: "shrink-0", "aria-hidden": true }), t.jsx("span", { className: "truncate", children: "\uBB38\uC81C \uC0DD\uC131 \uB300\uAE30\uC5F4" })] }), t.jsx("button", { type: "button", onClick: r, className: "rounded p-1 text-violet-900 hover:bg-violet-100 dark:text-violet-100 dark:hover:bg-violet-900/50", "aria-label": "\uD328\uB110 \uB2EB\uAE30", children: t.jsx(qe, { size: 15 }) })] }), t.jsx("div", { className: "shrink-0 border-b border-slate-200/80 px-3 py-1.5 text-[11px] text-slate-600 dark:border-odp-borderSoft dark:text-odp-muted", children: e.length === 0 ? "\uC9C4\uD589 \uC911\uC778 \uC0DD\uC131 \uC791\uC5C5\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" : `\uC9C4\uD589 ${P} \xB7 \uC644\uB8CC ${j}${N > 0 ? ` \xB7 \uC2E4\uD328 ${N}` : ""}` }), t.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-3", children: e.length === 0 ? t.jsxs("p", { className: "py-6 text-center text-xs text-slate-500 dark:text-odp-muted", children: ["\uC720\uC0AC\uBB38\uC81C \uB610\uB294 \uADFC\uAC70 \uCD9C\uC81C\xB7\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131\uC744 \uC2E4\uD589\uD558\uBA74", t.jsx("br", {}), "\uB2E8\uACC4\uBCC4 \uC9C4\uD589 \uC0C1\uD669\uC774 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4."] }) : t.jsx("ul", { className: "space-y-2", children: e.map((k) => t.jsx("li", { children: t.jsx(Pa, { job: k, detailOpen: !!f[k.id], onToggleDetail: () => y(k.id), onRemove: () => a(k.id) }) }, k.id)) }) }), t.jsxs("div", { className: "flex shrink-0 justify-end gap-2 border-t border-slate-200/80 px-3 py-2 dark:border-odp-borderSoft", children: [w ? t.jsxs(Q, { type: "button", variant: "tertiary", size: "sm", onClick: c, children: [t.jsx(qe, { size: 14 }), "\uC644\uB8CC \uD56D\uBAA9 \uBE44\uC6B0\uAE30"] }) : null, t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", onClick: r, children: [t.jsx(fs, { size: 14 }), "\uB2EB\uAE30"] })] })] }, "quiz-gen-queue-panel") : null });
}
const Yt = "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function Ia({ stopwatch: e, onRequestStart: s }) {
  const { displayMs: n, running: r, started: o, start: a, pause: c, resume: m, stop: u } = e, d = s ?? a;
  return o ? t.jsx(Et, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs("div", { className: "flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: [t.jsx(qn, { size: 14, className: `shrink-0 ${r ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500"}`, "aria-hidden": true }), t.jsx("span", { className: `min-w-[3.25rem] font-mono text-sm font-bold tabular-nums ${r ? "text-emerald-700 dark:text-emerald-300" : "text-slate-700 dark:text-odp-fgStrong"}`, "aria-live": "polite", children: Us(n) }), r ? t.jsxs(Ie, { children: [t.jsx(Ee, { asChild: true, children: t.jsx(Q, { type: "button", variant: "secondary", size: "sm", onClick: c, "aria-label": "\uC77C\uC2DC\uC815\uC9C0", children: t.jsx(Si, { size: 14 }) }) }), t.jsx(Ae, { children: t.jsxs(Me, { side: "bottom", sideOffset: 6, className: Yt, children: ["\uC77C\uC2DC\uC815\uC9C0", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : t.jsxs(Ie, { children: [t.jsx(Ee, { asChild: true, children: t.jsx(Q, { type: "button", variant: "secondary", size: "sm", onClick: m, "aria-label": "\uC7AC\uAC1C", children: t.jsx(Ni, { size: 14 }) }) }), t.jsx(Ae, { children: t.jsxs(Me, { side: "bottom", sideOffset: 6, className: Yt, children: ["\uC7AC\uAC1C", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }), t.jsxs(Ie, { children: [t.jsx(Ee, { asChild: true, children: t.jsx(Q, { type: "button", variant: "tertiary", size: "sm", onClick: u, "aria-label": "\uC815\uC9C0", children: t.jsx(Ci, { size: 14 }) }) }), t.jsx(Ae, { children: t.jsxs(Me, { side: "bottom", sideOffset: 6, className: Yt, children: ["\uC815\uC9C0", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }) }) : t.jsx(Et, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs(Ie, { children: [t.jsx(Ee, { asChild: true, children: t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", onClick: d, children: [t.jsx(qn, { size: 14 }), t.jsx("span", { className: "hidden md:inline", children: "\uC2DC\uD5D8 \uC2A4\uD1B1\uC6CC\uCE58" })] }) }), t.jsx(Ae, { children: t.jsxs(Me, { side: "bottom", sideOffset: 6, className: Yt, children: ["\uC2DC\uD5D8 \uC2DC\uAC04 \uCE21\uC815 \uC2DC\uC791", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }) });
}
function Ea({ log: e }) {
  const s = (e == null ? void 0 : e.events) ?? [], n = (e == null ? void 0 : e.questionEntries) ?? [], r = l.useMemo(() => {
    const o = [...s.map((a) => ({ kind: "event", at: a.at, data: a })), ...n.map((a) => ({ kind: "question", at: a.at, data: a }))];
    return o.sort((a, c) => a.at.localeCompare(c.at)), o;
  }, [s, n]);
  return r.length ? t.jsxs("div", { className: "space-y-2 border-t border-slate-100 pt-3 dark:border-odp-borderSoft", children: [t.jsx("h4", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uD480\uC774 \uC2DC\uAC04 \uAE30\uB85D" }), t.jsx("ol", { className: "max-h-40 space-y-1 overflow-y-auto text-[11px] text-slate-600 dark:text-odp-muted", children: r.map((o, a) => {
    if (o.kind === "event") {
      const m = o.data;
      return t.jsxs("li", { className: "font-mono leading-relaxed", children: [t.jsx("span", { className: "text-slate-500 dark:text-odp-muted", children: Ms(m.at) }), " \xB7 ", t.jsx("span", { className: "font-semibold text-slate-700 dark:text-odp-fgStrong", children: Lo[m.type] }), " \xB7 ", t.jsx("span", { className: "tabular-nums text-blue-600 dark:text-blue-400", children: Us(m.elapsedMs) })] }, `ev-${m.at}-${m.type}-${a}`);
    }
    const c = o.data;
    return t.jsxs("li", { className: "font-mono leading-relaxed", children: [t.jsx("span", { className: "text-slate-500 dark:text-odp-muted", children: Ms(c.at) }), " \xB7 ", t.jsxs("span", { className: "font-semibold text-violet-700 dark:text-violet-300", children: ["\uBB38\uC81C ", c.displayLabel] }), " \xB7 ", t.jsx("span", { className: "tabular-nums text-blue-600 dark:text-blue-400", children: Us(c.durationMs) }), t.jsxs("span", { className: "text-slate-400 dark:text-odp-muted", children: [" ", "(~", Ms(c.endedAt), ")"] })] }, `q-${c.questionId}-${c.at}-${a}`);
  }) })] }) : null;
}
const Aa = "relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-400 data-[state=checked]:border-rose-500 data-[state=checked]:bg-rose-500 data-[state=checked]:text-white border-rose-200 bg-white text-rose-800 hover:bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-100 dark:hover:bg-rose-950/50 dark:data-[state=checked]:border-rose-500 dark:data-[state=checked]:bg-rose-600", Ma = "relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100 dark:hover:bg-emerald-950/50 dark:data-[state=checked]:border-emerald-500 dark:data-[state=checked]:bg-emerald-600";
function La({ question: e, focusOption: s, onFocusOptionChange: n, wrongExps: r, busyKey: o, onOpenAnalysisDock: a }) {
  var _a2;
  const c = ((_a2 = e.options) == null ? void 0 : _a2.length) || 0;
  if (c <= 0) return null;
  const m = Ze(e.id, s), u = r[m], d = u !== void 0, h = o === m, f = s === e.answer, x = f ? "\uC815\uB2F5 \uBD84\uC11D" : "\uC624\uB2F5 \uBD84\uC11D", v = f ? "mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/45 dark:text-emerald-100" : "mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100", y = f ? "font-bold text-emerald-800 dark:text-emerald-200" : "font-bold text-rose-800 dark:text-rose-200", C = f ? "text-[11px] font-semibold text-emerald-700 dark:text-emerald-200" : "text-[11px] font-semibold text-rose-700 dark:text-rose-200", P = f ? "text-[11px] text-emerald-700/90 dark:text-emerald-200/80" : "text-[11px] text-rose-700/90 dark:text-rose-200/80", j = f ? "text-[10px] font-medium text-emerald-500 dark:text-emerald-300" : "text-[10px] font-medium text-rose-500 dark:text-rose-300", N = f ? "bg-emerald-500 dark:bg-emerald-300" : "bg-rose-500 dark:bg-rose-300", w = f ? "ring-emerald-50 dark:ring-emerald-950" : "ring-rose-50 dark:ring-rose-950";
  return t.jsxs("div", { className: v, children: [t.jsxs("div", { className: "mb-2 flex flex-wrap items-center justify-between gap-2", children: [t.jsx("div", { className: y, children: x }), t.jsx(_i, { className: "flex flex-wrap items-center gap-1", value: String(s), onValueChange: (k) => {
    const $ = Number.parseInt(k, 10);
    Number.isFinite($) && $ >= 1 && n($);
  }, "aria-label": `${e.displayLabel}\uBC88 \uBCF4\uAE30 \uC120\uD0DD`, children: Array.from({ length: c }, (k, $) => {
    const S = $ + 1, O = Ze(e.id, S), L = r[O] !== void 0 && String(r[O] || "").trim(), _ = S === e.answer, W = _ ? Ma : Aa;
    return t.jsxs(Qi, { value: String(S), className: `${W} ${L ? "pr-2 pl-2" : ""}`, "aria-label": `${S}\uBC88${_ ? " (\uC815\uB2F5)" : ""}${L ? ", \uBD84\uC11D \uC800\uC7A5\uB428" : ""}`, children: [t.jsx("span", { children: S }), L ? t.jsx("span", { className: `absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ${w}`, "aria-hidden": true }) : null] }, S);
  }) })] }), d ? t.jsxs("div", { children: [t.jsxs("div", { className: "mb-1.5 flex flex-wrap items-center gap-2", children: [t.jsxs("span", { className: C, children: [s, "\uBC88", f ? " \xB7 \uC815\uB2F5 \uBCF4\uAE30" : " \xB7 \uC624\uB2F5 \uBCF4\uAE30"] }), h ? t.jsxs("span", { className: `inline-flex items-center gap-1 ${j}`, children: [t.jsx("span", { className: `h-1.5 w-1.5 animate-pulse rounded-full ${N}` }), "\uC0DD\uC131 \uC911"] }) : null] }), t.jsx("div", { className: "[&_.md-editor-preview]:text-inherit [&_.md-editor-preview]:!bg-transparent [&_.md-editor]:!bg-transparent", children: u ? t.jsx(Te, { text: u, previewId: `wx-${e.id}-${s}` }) : t.jsx("p", { className: `${P} opacity-80`, children: "\uBD84\uC11D\uC744 \uC0DD\uC131\uD558\uB294 \uC911\u2026" }) }), t.jsxs("div", { className: "mt-2 flex flex-wrap gap-1.5", children: [t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", disabled: h, onClick: () => a(s, "followup"), children: [t.jsx($i, { size: 14 }), "\uCD94\uAC00\uC9C8\uBB38"] }), t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", disabled: h, onClick: () => a(s, "regenerate"), children: [t.jsx(Pi, { size: 14 }), "\uC7AC\uC0DD\uC131"] })] })] }) : t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [t.jsxs("p", { className: P, children: [s, "\uBC88 \uBCF4\uAE30 \uBD84\uC11D\uC744 \uC0DD\uC131\uD569\uB2C8\uB2E4."] }), t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", disabled: h, onClick: () => a(s, "create"), children: [h ? t.jsx(Re, { size: 14, className: "animate-pulse" }) : t.jsx(It, { size: 14 }), "\uBD84\uC11D \uC0DD\uC131"] })] })] });
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
function $r(e) {
  return e && typeof e == "object" ? e : {};
}
function Oa(e) {
  if (typeof e == "number" && Number.isFinite(e)) return e;
  if (typeof e == "string" && e.trim()) return e.trim();
  const s = Number(e);
  return Number.isFinite(s) ? s : String(e ?? "").trim();
}
function Ra(e, s) {
  const n = $r(e), r = String(n.id || n.name || `var${s + 1}`).trim();
  if (!r) return null;
  const o = String(n.description || n.label || r).trim() || r, a = Oa(n.originalValue ?? n.value), c = Number(n.min), m = Number(n.max), u = Number.isFinite(c) ? c : 0, d = Number.isFinite(m) ? m : u, h = Number(n.step), f = Number.isFinite(h) && h > 0 ? h : 1, x = typeof n.unit == "string" && n.unit.trim() ? n.unit.trim() : void 0;
  return { id: r, description: o, originalValue: a, min: u, max: d, step: f, ...x ? { unit: x } : {} };
}
function Pr(e) {
  const s = $r(e), n = String(s.coreCategory || s.category || s.topic || "").trim() || "general concept", r = !!(s.isCalculation ?? s.isCalc ?? s.calculation), a = (Array.isArray(s.variables) ? s.variables : []).map((c, m) => Ra(c, m)).filter((c) => c != null);
  return { coreCategory: n, isCalculation: r, variables: r ? a : [] };
}
function Ta(e, s, n, r) {
  const o = Math.min(e, s), a = Math.max(e, s), c = n > 0 ? n : 1, m = Math.floor((a - o) / c);
  if (m < 0 || m === 0) return o;
  let u = o, d = 0;
  do {
    const h = Math.floor(Math.random() * (m + 1));
    u = o + h * c, d += 1;
  } while (d < 24 && typeof r == "number" && Number.isFinite(r) && u === r && m > 0);
  return u;
}
function zr(e) {
  return e.map((s) => {
    if (typeof s.originalValue == "number" && Number.isFinite(s.originalValue)) {
      const n = Ta(s.min, s.max, s.step ?? 1, s.originalValue);
      return { id: s.id, description: s.description, value: n, originalValue: s.originalValue, ...s.unit ? { unit: s.unit } : {} };
    }
    return { id: s.id, description: s.description, value: s.originalValue, originalValue: s.originalValue, ...s.unit ? { unit: s.unit } : {} };
  });
}
function ct(e) {
  const s = ["[\uBB38\uD56D \uBD84\uC11D \uACB0\uACFC]", `\uD575\uC2EC \uBC94\uC8FC: ${e.coreCategory}`, `\uACC4\uC0B0 \uBB38\uC81C: ${e.isCalculation ? "\uC608" : "\uC544\uB2C8\uC624"}`];
  if (e.isCalculation && e.variables.length > 0) {
    s.push("\uD575\uC2EC \uBCC0\uC218:");
    for (const n of e.variables) {
      const r = n.unit ? ` ${n.unit}` : "";
      s.push(`- ${n.id} (${n.description}): \uC6D0\uBCF8=${String(n.originalValue)}${r}, \uBC94\uC704=${n.min}~${n.max}, step=${n.step ?? 1}`);
    }
  }
  return s.join(`
`);
}
function Ir(e) {
  if (!e.length) return "";
  const s = ["[\uBB34\uC791\uC704 \uC0D8\uD50C\uB9C1 \uBCC0\uC218 \u2014 \uC2E0\uADDC \uBB38\uD56D\uC5D0 \uBC18\uB4DC\uC2DC \uBC18\uC601]"];
  for (const n of e) {
    const r = n.unit ? ` ${n.unit}` : "";
    s.push(`- ${n.id} (${n.description}): ${String(n.value)}${r} (\uC6D0\uBCF8: ${String(n.originalValue)}${r})`);
  }
  return s.join(`
`);
}
const _a = ["\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694.", "\uBB38\uD56D \uD575\uC2EC \uC811\uADFC\uBC95\uC744 \uD655\uC778\uD558\uC138\uC694."], Qa = ["\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."], Da = 12, qa = 24;
function dt(e) {
  const s = String(e || "").trim();
  return !s || s.length < Da ? true : _a.some((n) => s === n);
}
function ut(e) {
  const s = String(e || "").trim();
  return !s || s.length < qa ? true : Qa.some((n) => s === n);
}
function ds(e) {
  return !dt(String(e.point || "")) && !ut(String(e.explanation || ""));
}
function Er(e) {
  return `${String(e || "").trim()}

[\uC720\uC0AC\uBB38\uD56D \uC0DD\uC131 \u2014 \uD544\uC218]
- \uC2E0\uADDC \uBB38\uD56D\uB9C8\uB2E4 point(\uC811\uADFC Point)\uC640 explanation(\uD574\uC124)\uC744 \uBC18\uB4DC\uC2DC \uD568\uAED8 \uC791\uC131\uD569\uB2C8\uB2E4. \uB458 \uC911 \uD558\uB098\uB77C\uB3C4 \uBE44\uC6B0\uAC70\uB098 placeholder\uB85C \uCC44\uC6B0\uBA74 \uC548 \uB429\uB2C8\uB2E4.
- point: \uC2E0\uADDC \uBB38\uD56D\uC758 \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C \uC791\uC131\uD569\uB2C8\uB2E4(1~3\uAC1C \uBD88\uB9BF \uB610\uB294 1~2\uBB38\uC7A5).
  - \uC218\uD5D8\uC790\uAC00 \uC720\uC0AC\uD55C \uB2E4\uB978 \uBB38\uC81C\uB97C \uB9CC\uB098\uB354\uB77C\uB3C4, \uBB34\uC5C7\uC744 \uBA3C\uC800 \uD310\uBCC4\xB7\uC5F0\uACB0\xB7\uAC80\uD1A0\uD574\uC57C \uD558\uB294\uC9C0 \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC \uC9DA\uC2B5\uB2C8\uB2E4.
  - \uC804\uCCB4 \uD480\uC774 \uACFC\uC815\uC774\uB098 \uC815\uB2F5\uC744 \uADF8\uB300\uB85C \uB178\uCD9C\uD558\uC9C0 \uB9C8\uC138\uC694.
- explanation: \uC815\uB2F5 \uADFC\uAC70, \uC624\uB2F5 \uD568\uC815, \uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124\uC744 \uC791\uC131\uD569\uB2C8\uB2E4. \uB9C8\uD06C\uB2E4\uC6B4 \uC0AC\uC6A9 \uAC00\uB2A5.
- \uC6D0\uBCF8 \uBB38\uD56D\uC758 point/\uD574\uC124\uC744 \uADF8\uB300\uB85C \uBCF5\uC0AC\uD558\uC9C0 \uB9D0\uACE0, \uC2E0\uADDC \uBB38\uD56D\xB7\uC120\uD0DD\uC9C0\xB7\uC815\uB2F5\uC5D0 \uB9DE\uAC8C \uC0C8\uB85C \uC791\uC131\uD569\uB2C8\uB2E4.`;
}
function Ar(e) {
  var _a2;
  const s = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), n = String(e.explanation || "").trim();
  return `${s ? `[\uADFC\uAC70 \uBC1C\uCDCC]
${s}

\uBC1C\uCDCC \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.

` : ""}[\uC6D0\uBCF8 \uBB38\uC81C]
\uC9C8\uBB38: ${e.question}
\uBCF4\uAE30: ${e.options.map((r, o) => `${o + 1}. ${r}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88
\uC811\uADFC Point: ${e.point || ""}
${n ? `\uD574\uC124: ${n}
` : ""}
\uC704 \uBB38\uD56D\uC744 \uBD84\uC11D\uD558\uC5EC JSON \uC2A4\uD0A4\uB9C8\uC5D0 \uB9DE\uAC8C\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
}
function Ba(e) {
  var _a2;
  const s = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), n = String(e.explanation || "").trim();
  return `${s ? `[\uADFC\uAC70 \uBC1C\uCDCC]
${s}

\uBC1C\uCDCC \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.

` : ""}[\uC6D0\uBCF8 \uBB38\uC81C]
\uC9C8\uBB38: ${e.question}
\uBCF4\uAE30: ${e.options.map((r, o) => `${o + 1}. ${r}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88
\uC811\uADFC Point: ${e.point || ""}
${n ? `\uD574\uC124: ${n}
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

JSON\uB9CC \uBC18\uD658:
{"question":"...","options":[${Array.from({ length: e.choiceCount }, () => '"..."').join(",")}],"answer":${e.targetAnswer},"point":"...","explanation":"..."}`;
}
function Mr(e) {
  const s = [];
  return e.missingPoint && s.push("point(\uC811\uADFC Point)"), e.missingExplanation && s.push("explanation(\uD574\uC124)"), `[\uC2E0\uADDC \uC720\uC0AC \uBB38\uD56D]
\uC9C8\uBB38: ${e.question}
\uBCF4\uAE30: ${e.options.map((n, r) => `${r + 1}. ${n}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88

${e.analysisBlock}

\uC704 \uBB38\uD56D\uC5D0 \uB300\uD574 \uB204\uB77D\uB41C ${s.join(" \uBC0F ")}\uC744(\uB97C) \uC791\uC131\uD558\uC138\uC694.
- point: \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C(1~3\uAC1C \uBD88\uB9BF \uB610\uB294 1~2\uBB38\uC7A5). \uC720\uC0AC \uC720\uD615\uC5D0\uC11C \uBB34\uC5C7\uC744 \uBA3C\uC800 \uC0DD\uAC01\uD574\uC57C \uD558\uB294\uC9C0 \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC.
- explanation: \uC815\uB2F5 \uADFC\uAC70\xB7\uD568\uC815\xB7\uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124.

JSON\uB9CC \uBC18\uD658:
{"point":"...","explanation":"..."}`;
}
function Fa(e) {
  var _a2;
  const s = e.question, n = [];
  e.missingPoint && n.push("point(\uC811\uADFC Point)"), e.missingExplanation && n.push("explanation(\uD574\uC124)");
  let r = "";
  if (s.kind === "choice") {
    const m = s.options || [];
    r = `\uC9C8\uBB38: ${s.question}
\uBCF4\uAE30: ${m.map((u, d) => `${d + 1}. ${u}`).join(" | ")}
\uC815\uB2F5: ${s.answer ?? 1}\uBC88`;
  } else r = `\uC9C8\uBB38: ${s.question}
${s.modelAnswer ? `\uBAA8\uBC94 \uB2F5\uC548: ${s.modelAnswer}
` : ""}`;
  const o = [];
  !e.missingPoint && String(s.point || "").trim() && o.push(`\uC811\uADFC Point: ${s.point}`), !e.missingExplanation && String(s.explanation || "").trim() && o.push(`\uD574\uC124: ${s.explanation}`);
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
\uC704 \uBB38\uD56D\uC5D0 \uB300\uD574 \uB204\uB77D\uB41C ${n.join(" \uBC0F ")}\uC744(\uB97C) \uC791\uC131\uD558\uC138\uC694.
- point: \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C(1~3\uAC1C \uBD88\uB9BF \uB610\uB294 1~2\uBB38\uC7A5). \uC720\uC0AC \uC720\uD615\uC5D0\uC11C \uBB34\uC5C7\uC744 \uBA3C\uC800 \uC0DD\uAC01\uD574\uC57C \uD558\uB294\uC9C0 \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC. \uC804\uCCB4 \uD480\uC774\uB098 \uC815\uB2F5\uC744 \uADF8\uB300\uB85C \uB178\uCD9C\uD558\uC9C0 \uB9C8\uC138\uC694.
- explanation: \uC815\uB2F5 \uADFC\uAC70\xB7\uD568\uC815\xB7\uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124. \uB9C8\uD06C\uB2E4\uC6B4 \uC0AC\uC6A9 \uAC00\uB2A5.

JSON\uB9CC \uBC18\uD658:
{"point":"...","explanation":"..."}`;
}
function Ua({ question: e, busyKey: s, showContent: n = true, onGenerate: r }) {
  const o = dt(e.point || ""), a = ut(e.explanation || ""), c = o || a;
  if (!n && !c) return null;
  const m = `sections-${e.id}`, u = s === m, d = c ? t.jsxs("div", { className: "flex justify-end gap-2", children: [o && a ? t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", disabled: u, onClick: () => r("both"), children: [t.jsx(Re, { size: 14 }), u ? "\uC0DD\uC131 \uC911\u2026" : "\uC811\uADFC Point\xB7\uD574\uC124 \uC0DD\uC131"] }) : null, o && !a ? t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", disabled: u, onClick: () => r("point"), children: [t.jsx(Re, { size: 14 }), u ? "\uC0DD\uC131 \uC911\u2026" : "\uC811\uADFC Point \uC0DD\uC131"] }) : null, a && !o ? t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", disabled: u, onClick: () => r("explanation"), children: [t.jsx(Re, { size: 14 }), u ? "\uC0DD\uC131 \uC911\u2026" : "\uD574\uC124 \uC0DD\uC131"] }) : null] }) : null;
  return n ? t.jsxs("div", { className: "mt-2 flex flex-col space-y-2 rounded-xl bg-slate-50 p-3 text-xs dark:bg-odp-bgSoft", children: [t.jsx("div", { className: "font-bold text-slate-800 dark:text-odp-fgStrong", children: "\uC811\uADFC Point \xB7 \uD574\uC124" }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 font-bold text-amber-800", children: "\uC811\uADFC Point!" }), o ? t.jsx("p", { className: "text-[11px] italic text-slate-500 dark:text-odp-muted", children: "\uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }) : t.jsx(Te, { text: e.point, previewId: `qp-${e.id}` })] }), t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 font-bold text-slate-800 dark:text-odp-fgStrong", children: "\uD574\uC124" }), a ? t.jsx("p", { className: "text-[11px] italic text-slate-500 dark:text-odp-muted", children: "\uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }) : t.jsx(Te, { text: e.explanation, previewId: `qe-${e.id}` })] }), e.kind === "subjective" && e.modelAnswer ? t.jsxs("div", { children: [t.jsx("div", { className: "mb-1 font-bold", children: "\uBAA8\uBC94 \uB2F5\uC548" }), t.jsx(Te, { text: e.modelAnswer, previewId: `qm-${e.id}` })] }) : null, d] }) : t.jsxs("div", { className: "mt-3 flex flex-col rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950 dark:border-amber-800/70 dark:bg-amber-950/45 dark:text-amber-100", children: [t.jsx("div", { className: "mb-2 font-bold text-amber-800 dark:text-amber-200", children: "\uC811\uADFC Point \xB7 \uD574\uC124" }), t.jsx("p", { className: "mb-3 text-[11px] text-amber-700/90 dark:text-amber-200/80", children: o && a ? "\uC811\uADFC Point\uC640 \uD574\uC124\uC774 \uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." : o ? "\uC811\uADFC Point\uAC00 \uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." : "\uD574\uC124\uC774 \uC544\uC9C1 \uC0DD\uC131\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }), d] });
}
function Ga({ questionId: e, value: s, onSave: n }) {
  const r = String(s || ""), o = r.trim().length > 0, a = `qmemo-${e}`, [c, m] = l.useState(false), [u, d] = l.useState("");
  l.useEffect(() => {
    c || d(r);
  }, [r, c]);
  const h = () => {
    d(""), m(true);
  }, f = () => {
    d(r), m(true);
  }, x = () => {
    n(u), m(false);
  };
  return t.jsx("div", { className: "mt-3 border-t border-slate-200 pt-3 dark:border-odp-borderSoft", children: c ? t.jsxs("div", { className: "space-y-2 rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60", children: [t.jsxs("label", { className: "block space-y-1.5", children: [t.jsxs("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: ["\uBA54\uBAA8", t.jsx("span", { className: "ml-1 font-normal text-slate-500 dark:text-odp-muted", children: "(Markdown)" })] }), t.jsx("textarea", { className: "quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft", placeholder: "\uBB38\uC81C\uC5D0 \uB300\uD55C \uBA54\uBAA8\uB97C Markdown\uC73C\uB85C \uC791\uC131\uD558\uC138\uC694.", value: u, onChange: (v) => d(v.target.value), autoFocus: true })] }), t.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [t.jsx(Q, { type: "button", variant: "primary", size: "sm", onClick: x, children: "\uC800\uC7A5\uD558\uAE30" }), t.jsx(Q, { type: "button", variant: "secondary", size: "sm", onClick: () => {
    d(r), m(false);
  }, children: "\uCDE8\uC18C" })] })] }) : t.jsxs(t.Fragment, { children: [o ? t.jsx("div", { className: "mb-2 rounded-lg border border-slate-200 bg-white p-2.5 text-sm dark:border-odp-borderSoft dark:bg-odp-bg", children: t.jsx(Te, { text: r, previewId: a }) }) : null, t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", onClick: o ? f : h, children: [t.jsx(ls, { size: 14 }), o ? "\uBA54\uBAA8\uC218\uC815" : "\uBA54\uBAA8\uC791\uC131"] })] }) });
}
const Wa = 320, Ja = ms;
function Ha(e, s) {
  if (s === "followup") return "\uCD94\uAC00 \uC9C8\uBB38";
  const n = e ? "\uC815\uB2F5 \uBD84\uC11D" : "\uC624\uB2F5 \uBD84\uC11D";
  return s === "regenerate" ? `${n} \uC7AC\uC0DD\uC131` : n;
}
function Va({ open: e, question: s, option: n, mode: r, prompt: o, existingAnalysis: a = "", llmProfiles: c, profileId: m, model: u, onProfileIdChange: d, onModelChange: h, busy: f, onPromptChange: x, onClose: v, onGenerate: y }) {
  const { width: C, handleProps: P, isResizing: j } = it({ storageKey: "quiz-choice-analysis-dock-width", defaultWidth: Wa, minWidth: 260, maxWidth: 560, edge: "right" }), N = s != null && n != null && n === s.answer, w = Ha(N, r), k = N ? "border-emerald-200 dark:border-emerald-900/60" : "border-rose-200 dark:border-rose-900/60", $ = N ? "bg-emerald-50 dark:bg-emerald-950/40" : "bg-rose-50 dark:bg-rose-950/40", S = N ? "text-emerald-900 dark:text-emerald-100" : "text-rose-900 dark:text-rose-100", O = r === "followup", L = O, _ = !f && (!L || o.trim().length > 0), W = l.useCallback((M) => {
    f || L && !o.trim() || M.key !== "Enter" || !M.metaKey && !M.ctrlKey || (M.preventDefault(), y());
  }, [f, y, o, L]);
  return t.jsx(Xe, { initial: false, children: e && s && n != null ? t.jsx($e.aside, { role: "complementary", "aria-label": w, className: `flex h-full shrink-0 flex-col overflow-hidden border-l bg-white shadow-lg dark:bg-odp-surface ${k}`, initial: { width: 0, opacity: 0.85 }, animate: { width: C, opacity: 1 }, exit: { width: 0, opacity: 0.85 }, transition: j ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 36 }, children: t.jsxs("div", { className: "relative h-full min-h-0", style: { width: C }, children: [t.jsx(Ja, { edge: "left", handleProps: P, isResizing: j, visibleOnHover: true, label: "\uBD84\uC11D \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [t.jsxs("div", { className: `flex items-center justify-between border-b px-3 py-2.5 ${k}`, children: [t.jsx("div", { className: "min-w-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: w }), t.jsx("button", { type: "button", "aria-label": "\uBD84\uC11D \uD328\uB110 \uB2EB\uAE30", className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg", onClick: v, disabled: f, children: t.jsx(qe, { size: 16 }) })] }), t.jsxs("div", { className: "min-h-0 flex-1 space-y-3 overflow-y-auto p-3", children: [t.jsxs("div", { className: `rounded-lg px-2.5 py-2 text-[11px] ${$} ${S}`, children: [t.jsxs("div", { className: "font-semibold", children: [s.displayLabel, "\uBC88 \xB7 ", n, "\uBC88 \uBCF4\uAE30", N ? " (\uC815\uB2F5)" : ""] }), t.jsx("p", { className: "mt-1 line-clamp-3 opacity-90", children: s.question })] }), O && a.trim() ? t.jsxs("div", { className: "rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-[10px] text-slate-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-muted", children: [t.jsx("div", { className: "mb-1 font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uAE30\uC874 \uBD84\uC11D" }), t.jsx("p", { className: "line-clamp-6 whitespace-pre-wrap", children: a.trim() })] }) : null, t.jsx(fr, { profiles: c, profileId: m, model: u, onProfileIdChange: d, onModelChange: h, disabled: f }), t.jsxs("label", { className: "block space-y-1.5", children: [t.jsxs("span", { className: "text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: [O ? "\uCD94\uAC00 \uC9C8\uBB38" : "\uAD81\uAE08\uD55C \uC810", t.jsx("span", { className: "ml-1 font-normal text-slate-500 dark:text-odp-muted", children: O ? "(\uD544\uC218)" : "(\uC120\uD0DD)" })] }), t.jsx("textarea", { className: "quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", placeholder: O ? "\uC608: \uC9C0\uB2C8 \uC9C0\uC218\uC640 \uC5D4\uD2B8\uB85C\uD53C\uC758 \uC218\uC2DD\uC801 \uCC28\uC774\uAC00 \uBB54\uAC00\uC694?" : N ? "\uBE44\uC6CC \uB450\uBA74 \uC815\uB2F5/\uC624\uB2F5 \uC774\uC720\uB97C \uAE30\uBCF8 \uC124\uBA85\uD569\uB2C8\uB2E4. \uC608: \uC65C \uC774 \uBCF4\uAE30\uAC00 \uC815\uB2F5\uC778\uC9C0\u2026" : "\uBE44\uC6CC \uB450\uBA74 \uC624\uB2F5 \uC774\uC720\uB97C \uAE30\uBCF8 \uC124\uBA85\uD569\uB2C8\uB2E4. \uC608: 2\uBC88\uACFC 3\uBC88\uC758 \uCC28\uC774\u2026", value: o, disabled: f, onChange: (M) => x(M.target.value), onKeyDown: W }), t.jsxs("p", { className: "text-[10px] text-slate-500 dark:text-odp-muted", children: [O ? "\uAE30\uC874 \uBD84\uC11D\uACFC \uBB38\uC81C \uB0B4\uC6A9\uC744 \uBC14\uD0D5\uC73C\uB85C \uB2F5\uBCC0\uD569\uB2C8\uB2E4." : "\uBE44\uC6CC \uB450\uACE0 \uC0DD\uC131\uD558\uBA74 \uAE30\uBCF8 \uD504\uB86C\uD504\uD2B8\uB85C \uC124\uBA85\uD569\uB2C8\uB2E4.", " ", t.jsx("kbd", { className: "rounded border border-slate-300 bg-slate-100 px-1 py-px font-mono text-[9px] dark:border-odp-borderSoft dark:bg-odp-bgSoft", children: "\u2318/Ctrl+Enter" }), "\uB85C \uBC14\uB85C \uC0DD\uC131\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] })] })] }), t.jsxs("div", { className: `flex gap-2 border-t p-3 ${k}`, children: [t.jsx(Q, { type: "button", variant: "secondary", size: "sm", className: "flex-1", disabled: f, onClick: v, children: "\uCDE8\uC18C" }), t.jsxs(Q, { type: "button", variant: "primary", size: "sm", className: "flex-1", disabled: !_, onClick: y, children: [t.jsx(Re, { size: 14 }), f ? "\uC0DD\uC131 \uC911\u2026" : O ? "\uB2F5\uBCC0 \uC0DD\uC131" : "\uC0DD\uC131"] })] })] })] }) }, "quiz-choice-analysis-dock") : null });
}
const Ka = "z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", Xa = "\uC2DC\uD5D8\uC774 \uB05D\uB09C \uB4A4\uC5D0 \uC804\uCCB4 \uCC44\uC810\uC744 \uD574\uC8FC\uC138\uC694";
function er({ examInProgress: e, disabled: s, children: n, ...r }) {
  const o = !!s || e, a = t.jsx(Q, { type: "button", ...r, disabled: o, children: n });
  return e ? t.jsxs(Ie, { children: [t.jsx(Ee, { asChild: true, children: t.jsx("span", { className: "inline-flex", children: a }) }), t.jsx(Ae, { children: t.jsxs(Me, { side: "top", sideOffset: 6, className: Ka, children: [Xa, t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : a;
}
function Za(e, s) {
  var _a2;
  if (!(s.isSubmitted || !!s.gradedQuestions[e.id])) return false;
  if (e.kind === "choice") {
    const r = s.userAnswers[e.id];
    return r != null && String(r).trim() !== "" && r !== e.answer;
  }
  return ((_a2 = s.subjectiveGrades[e.id]) == null ? void 0 : _a2.verdict) === "wrong";
}
function Ya(e) {
  return e.questions.filter((s) => Za(s, e));
}
function el(e) {
  return e.map((s, n) => {
    const r = String(n + 1);
    return { ...s, id: r, displayLabel: r };
  });
}
function tl(e, s) {
  const n = Ya({ questions: e.questions, userAnswers: s.userAnswers, gradedQuestions: s.gradedQuestions, isSubmitted: s.isSubmitted, subjectiveGrades: s.subjectiveGrades });
  if (!n.length) return null;
  const r = el(n), o = Ys({ ...e.config, sourcePaths: [...e.config.sourcePaths] });
  return { markdown: pr(o, r, Gs), questions: r, config: o };
}
function sl(e) {
  return e.toLowerCase().endsWith(Ws) ? e.slice(0, -Ws.length) : e.replace(/\.md$/i, "");
}
function tr(e, s) {
  const n = String(e || "").trim().replace(/\\/g, "/"), r = n.lastIndexOf("/"), o = r >= 0 ? n.slice(0, r + 1) : "", a = sl(Oo(n)), c = s != null && s > 1 ? `-\uD2C0\uB9B0\uBB38\uC81C-${s}` : "-\uD2C0\uB9B0\uBB38\uC81C";
  return `${o}${a}${c}${Ws}`;
}
async function nl(e, s) {
  const n = tr(e);
  if (!await s(n)) return n;
  for (let r = 2; r < 100; r += 1) {
    const o = tr(e, r);
    if (!await s(o)) return o;
  }
  throw new Error("\uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uD034\uC988 \uD30C\uC77C \uC774\uB984\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
}
function us(e) {
  return e != null && String(e).trim() !== "";
}
function Rs(e) {
  const s = {};
  for (const n of e.questions) {
    const r = us(e.userAnswers[n.id]);
    (e.isSubmitted && n.kind === "choice" ? true : !!e.gradedQuestions[n.id]) ? s[n.id] = true : r && (s[n.id] = false);
  }
  return zt({ userAnswers: e.userAnswers, gradedQuestions: s, subjectiveGrades: e.subjectiveGrades, isSubmitted: e.isSubmitted, ...e.timeLog ? { timeLog: e.timeLog } : {}, ...e.wrongChoiceExplanations ? { wrongChoiceExplanations: e.wrongChoiceExplanations } : {}, ...e.questionMemos ? { questionMemos: e.questionMemos } : {} });
}
function sr(e, s) {
  const n = zt(e ?? Gs), r = zt(s ?? Gs);
  return JSON.stringify(n) === JSON.stringify(r);
}
function rl(e) {
  return e != null && !Zs(e);
}
const nr = { correct: "bg-emerald-500", partial: "bg-amber-500", wrong: "bg-rose-500", ungraded: "bg-slate-400 dark:bg-slate-500" }, rr = { correct: "\uC815\uB2F5", partial: "\uBD80\uBD84", wrong: "\uC624\uB2F5", ungraded: "\uBBF8\uCC44\uC810" };
function ol(e) {
  return e ? typeof e.score == "number" && Number.isFinite(e.score) ? Math.min(100, Math.max(0, e.score)) / 100 : e.verdict === "correct" ? 1 : e.verdict === "partial" ? 0.5 : 0 : null;
}
function il(e) {
  var _a2;
  const { question: s, userAnswers: n, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a } = e, c = o || r[s.id], m = us(n[s.id]);
  if (!c) return m ? "ungraded" : null;
  if (s.kind === "choice") return m ? n[s.id] === s.answer ? "correct" : "wrong" : null;
  const u = (_a2 = a[s.id]) == null ? void 0 : _a2.verdict;
  return u === "correct" ? "correct" : u === "partial" ? "partial" : u === "wrong" ? "wrong" : null;
}
function al(e) {
  const { questions: s, userAnswers: n, gradedQuestions: r, isSubmitted: o, subjectiveGrades: a } = e;
  let c = 0, m = 0, u = 0, d = 0, h = 0, f = 0;
  for (const y of s) {
    const C = n[y.id] !== void 0 && n[y.id] !== null && String(n[y.id]).trim() !== "";
    if (C && (d += 1), !(o || r[y.id])) continue;
    if (y.kind === "choice") {
      f += 1, n[y.id] === y.answer ? (c += 1, h += 1) : C && (m += 1);
      continue;
    }
    const j = a[y.id], N = ol(j);
    N != null && (f += 1, h += N, (j == null ? void 0 : j.verdict) === "correct" ? c += 1 : (j == null ? void 0 : j.verdict) === "partial" ? u += 1 : m += 1);
  }
  const x = s.length, v = x > 0 && f > 0 ? Math.round(h / x * 100) : null;
  return { correct: c, wrong: m, partial: u, answered: d, total: x, scorePercent: v };
}
async function Lr(e, s) {
  const n = [];
  for (const r of e) {
    const o = String(r || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
    if (o) try {
      const a = await s(o);
      typeof a == "string" && a.length > 0 && n.push({ path: o, text: a });
    } catch {
    }
  }
  return n;
}
function Or(e) {
  const s = [], n = /* @__PURE__ */ new Set();
  for (const r of e) {
    const o = String(r || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
    !o || n.has(o) || (n.add(o), s.push(o));
  }
  return s;
}
function ll(e) {
  return String(e || "").toLowerCase().split(/[^\p{L}\p{N}]+/u).map((s) => s.trim()).filter((s) => s.length >= 2).slice(0, 16);
}
function cl(e, s) {
  if (s.length === 0) return 1;
  const n = e.toLowerCase();
  let r = 0;
  for (const o of s) n.includes(o) && (r += 1);
  return r;
}
async function xs(e) {
  const s = Pe(), n = e.topK ?? s.ragTopK, r = e.maxChars ?? s.ragMaxChars, o = Or(e.sourcePaths);
  if (o.length === 0) return { chunks: [], usedFallback: false };
  const a = await Lr(o, e.readText);
  if (a.length === 0) return { chunks: [], usedFallback: true };
  const c = ll(e.query), m = [];
  for (const h of a) Ro(h.text, 12e3).forEach((x, v) => {
    x.trim() && m.push({ path: h.path, excerpt: x, chunkIndex: v, score: cl(x, c) });
  });
  m.sort((h, f) => (f.score || 0) - (h.score || 0));
  const u = [];
  let d = 0;
  for (const h of m) {
    if (u.length >= n) break;
    if (d + h.excerpt.length > r) {
      const f = r - d;
      if (f < 200) break;
      u.push({ ...h, excerpt: h.excerpt.slice(0, f) });
      break;
    }
    u.push(h), d += h.excerpt.length;
  }
  return { chunks: u, usedFallback: true };
}
function hs(e) {
  return e.length ? e.map((s) => `---
[${s.path}]
${s.excerpt}
`).join(`
`) : "";
}
async function dl(e, s, n) {
  const r = Pe(), o = Math.max(4e3, n ?? Math.min(r.ragMaxChars, 2e5)), a = Or(e);
  return a.length ? (await Lr(a, s)).map((m) => ({ path: m.path, text: m.text.length > o ? `${m.text.slice(0, o)}

\u2026(truncated)` : m.text })) : [];
}
function ul(e) {
  return e.kind === "subjective" ? e.answerStyle === "essay" ? "\uC11C\uC220\uD615 \uC8FC\uAD00\uC2DD" : "\uB2E8\uB2F5\uD615 \uC8FC\uAD00\uC2DD" : `${e.choiceCount}\uC9C0\uC120\uB2E4 \uAC1D\uAD00\uC2DD`;
}
function ml(e) {
  return `${Er(e)}

[\uD30C\uC0DD\uBB38\uD56D \uC0DD\uC131 \u2014 \uCD94\uAC00 \uADDC\uCE59]
- \uC6D0\uBCF8 \uBB38\uD56D\uC758 \uD559\uC2B5 \uBAA9\uD45C\xB7\uD575\uC2EC \uAC1C\uB150\uC744 \uC720\uC9C0\uD558\uB418, \uC9C0\uC815\uB41C **\uCD9C\uC81C \uC720\uD615**\uC5D0 \uB9DE\uB294 \uC0C8 \uBB38\uD56D\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.
- \uAC1D\uAD00\uC2DD \u2194 \uC8FC\uAD00\uC2DD \uBCC0\uD658\uC774 \uC694\uCCAD\uB418\uBA74, \uB3D9\uC77C \uAC1C\uB150\uC744 \uD574\uB2F9 \uC720\uD615\uC5D0 \uB9DE\uAC8C \uC7AC\uAD6C\uC131\uD558\uC138\uC694.
- \uC0AC\uC6A9\uC790 \uCD94\uAC00 \uC694\uAD6C\uC0AC\uD56D\uC774 \uC788\uC73C\uBA74 \uBC18\uB4DC\uC2DC \uBC18\uC601\uD558\uC138\uC694.`;
}
function fl(e) {
  var _a2;
  const s = (_a2 = e.ragBlock) == null ? void 0 : _a2.trim(), n = String(e.explanation || "").trim(), r = String(e.target.userPrompt || "").trim(), o = ul(e.target), a = e.sourceKind === "subjective" ? e.sourceAnswerStyle === "essay" ? "\uC11C\uC220\uD615 \uC8FC\uAD00\uC2DD" : "\uB2E8\uB2F5\uD615 \uC8FC\uAD00\uC2DD" : `${e.options.length || e.target.choiceCount}\uC9C0\uC120\uB2E4 \uAC1D\uAD00\uC2DD`, c = e.sourceKind === "choice" && e.options.length > 0 ? `\uBCF4\uAE30: ${e.options.map((d, h) => `${h + 1}. ${d}`).join(" | ")}
\uC815\uB2F5: ${e.answer}\uBC88
` : "";
  let m;
  if (e.target.kind === "subjective") m = `{"kind":"subjective","answerStyle":"${e.target.answerStyle === "essay" ? "essay" : "short"}","question":"...","modelAnswer":"...","point":"...","explanation":"..."}`;
  else {
    const d = e.target.choiceCount, h = e.targetAnswer ?? 1;
    m = `{"kind":"choice","question":"...","options":[${Array.from({ length: d }, () => '"..."').join(",")}],"answer":${h},"point":"...","explanation":"..."}`;
  }
  const u = e.target.kind === "choice" && e.targetAnswer != null ? `\uC774\uBC88 \uC2E0\uADDC \uBB38\uC81C\uC758 \uC815\uB2F5 \uBC88\uD638\uB294 \uBC18\uB4DC\uC2DC ${e.targetAnswer}\uBC88\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.
` : "";
  return `${s ? `[\uADFC\uAC70 \uBC1C\uCDCC]
${s}

\uBC1C\uCDCC \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.

` : ""}[\uC6D0\uBCF8 \uBB38\uC81C \u2014 ${a}]
\uC9C8\uBB38: ${e.question}
${c}\uC811\uADFC Point: ${e.point || ""}
${n ? `\uD574\uC124: ${n}
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

JSON\uB9CC \uBC18\uD658:
${m}`;
}
function pl(e, s) {
  const n = String(s || "").trim().replace(/-(?:유사|파생)\d+$/u, "") || "1", r = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), o = new RegExp(`^${r}-\uD30C\uC0DD(\\d+)$`);
  let a = 0;
  for (const c of e) {
    const m = String(c.displayLabel || "").match(o);
    (m == null ? void 0 : m[1]) && (a = Math.max(a, Number.parseInt(m[1], 10)));
  }
  return `${n}-\uD30C\uC0DD${a + 1}`;
}
const or = ".quiz", xl = 96e3;
function Rr(e) {
  return String(e || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
}
function hl(e) {
  const n = Rr(e).replace(/\.quiz\.md$/i, "");
  return n ? `${or}/${n}` : or;
}
function gl(e) {
  return String(e || "").trim().replace(/[^a-zA-Z0-9._-]+/g, "_") || "log";
}
function bl(e, s) {
  return `${hl(e)}/${gl(s)}.md`;
}
function re(e, s = xl) {
  const n = String(e || "");
  return n.length <= s ? n : `${n.slice(0, s)}

\u2026 (${n.length - s} characters truncated)`;
}
function Ts(e, s) {
  const n = re(s);
  return n.trim() ? `### ${e}

\`\`\`text
${n.replace(/```/g, "`\u200B``")}
\`\`\`
` : "";
}
function kl(e, s) {
  const n = `- status: ${e.status}`, r = e.detail ? `- detail: ${e.detail}` : "", o = e.error ? `- error: ${e.error}` : "", a = [`## Step ${s + 1}: ${e.label} (${e.id})`, "", n, r, o, ""];
  return e.systemPrompt && a.push(Ts("System prompt", e.systemPrompt)), e.llmInstruction && a.push(Ts("Instruction / input", e.llmInstruction)), e.llmResponse && a.push(Ts("Model response / artifact", e.llmResponse)), a.filter(Boolean).join(`
`);
}
function wl(e, s) {
  const n = ["# Quiz generation log", "", `- quiz file: ${Rr(s)}`, `- job id: ${e.id}`, `- kind: ${e.kind}`, ...e.questionLabel ? [`- source label: ${e.questionLabel}`] : [], ...e.resultLabel ? [`- result label: ${e.resultLabel}`] : [], ...e.resultQuestionId ? [`- result question id: ${e.resultQuestionId}`] : [], `- job status: ${e.status}`, `- created at: ${new Date(e.createdAt).toISOString()}`, ...e.error ? [`- job error: ${e.error}`] : [], "", "## Question preview", "", re(e.questionPreview, 4e3), "", "---", ""];
  return e.steps.forEach((r, o) => {
    n.push(kl(r, o)), n.push("---", "");
  }), `${n.join(`
`).trimEnd()}
`;
}
async function yl(e) {
  const s = bl(e.quizFilePath, e.logKey), n = wl(e.job, e.quizFilePath);
  return await e.writeText(s, n), s;
}
const es = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uCD9C\uC81C\uC6A9 \uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uAC00\uC785\uB2C8\uB2E4.
\uC8FC\uC5B4\uC9C4 \uC6D0\uBB38\uC5D0\uC11C \uCD9C\uC81C\uC5D0 \uD544\uC694\uD55C \uAC1C\uB150\xB7\uC815\uC758\xB7\uACF5\uC2DD\xB7\uC808\uCC28\xB7\uC0AC\uB840\uB9CC \uC8FC\uC81C\uBCC4\uB85C \uC815\uB9AC\uD558\uC138\uC694.
- \uC6D0\uBB38\uC5D0 \uC5C6\uB294 \uC0AC\uC2E4\uC744 \uB9CC\uB4E4\uC9C0 \uB9C8\uC138\uC694.
- \uC218\uC2DD\uC740 \uC6D0\uBB38 \uD45C\uAE30\uB97C \uC720\uC9C0\uD558\uC138\uC694 ($...$ / $$...$$).
- \uC751\uB2F5\uC740 \uB9C8\uD06C\uB2E4\uC6B4 \uC694\uC57D\uBB38\uB9CC \uC791\uC131\uD558\uC138\uC694. JSON\xB7\uCF54\uB4DC\uD39C\uC2A4\xB7\uC11C\uB450\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.`;
function vl(e, s, n) {
  return e === "subjective" ? `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uCD9C\uC81C\uC704\uC6D0\uC785\uB2C8\uB2E4. \uC81C\uACF5\uB41C \uADFC\uAC70 \uC694\uC57D\uBCF8\uB9CC \uC0AC\uC6A9\uD574 \uBB38\uD56D\uC744 \uB9CC\uB4DC\uB2C8\uB2E4.
\uC694\uC57D\uBCF8 \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.
\uC751\uB2F5\uC740 JSON \uBC30\uC5F4\uB9CC \uBC18\uD658\uD558\uC138\uC694. \uB2E4\uB978 \uD14D\uC2A4\uD2B8\xB7\uB9C8\uD06C\uB2E4\uC6B4\xB7\uCF54\uB4DC\uD39C\uC2A4\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.
\uC2A4\uD0A4\uB9C8:
[{"kind":"subjective","answerStyle":"short"|"essay","question":"...","modelAnswer":"...","point":"...","explanation":"..."}]
\uC815\uD655\uD788 ${n}\uAC1C \uBB38\uD56D\uC744 \uBC18\uD658\uD558\uC138\uC694.` : `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uCD9C\uC81C\uC704\uC6D0\uC785\uB2C8\uB2E4. \uC81C\uACF5\uB41C \uADFC\uAC70 \uC694\uC57D\uBCF8\uB9CC \uC0AC\uC6A9\uD574 \uAC1D\uAD00\uC2DD \uBB38\uD56D\uC744 \uB9CC\uB4ED\uB2C8\uB2E4.
\uC694\uC57D\uBCF8 \uBC16\uC758 \uC0AC\uC2E4\uC740 \uC0AC\uC6A9\uD558\uC9C0 \uB9C8\uC138\uC694.
\uC120\uD0DD\uC9C0(options) \uC548\uC5D0\uC11C\uB294 \uC778\uB77C\uC778 \uC218\uC2DD($...$)\uB9CC \uC0AC\uC6A9\uD558\uC138\uC694.
\uC751\uB2F5\uC740 JSON \uBC30\uC5F4\uB9CC \uBC18\uD658\uD558\uC138\uC694. \uB2E4\uB978 \uD14D\uC2A4\uD2B8\xB7\uB9C8\uD06C\uB2E4\uC6B4\xB7\uCF54\uB4DC\uD39C\uC2A4\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.
\uC2A4\uD0A4\uB9C8:
[{"question":"...","options":[${Array.from({ length: s }, () => '"..."').join(",")}],"answer":1,"point":"...","explanation":"..."}]
- options \uAE38\uC774\uB294 \uC815\uD655\uD788 ${s}
- answer\uB294 1~${s} \uC815\uC218
\uC815\uD655\uD788 ${n}\uAC1C \uBB38\uD56D\uC744 \uBC18\uD658\uD558\uC138\uC694.`;
}
function jl(e) {
  return e.length ? e.slice(0, 8).map((s, n) => {
    const r = `${n + 1}. [${s.kind}${s.answerStyle ? `/${s.answerStyle}` : ""}] ${s.question}`;
    if (s.kind === "choice") {
      const o = (s.options || []).map((a, c) => `   ${c + 1}. ${a}${s.answer === c + 1 ? " (\uC815\uB2F5)" : ""}`).join(`
`);
      return `${r}
${o}
   Point: ${s.point || ""}`;
    }
    return `${r}
   \uBAA8\uBC94\uB2F5\uC548: ${s.modelAnswer || ""}
   Point: ${s.point || ""}`;
  }).join(`

`) : "(\uC81C\uC2DC \uBB38\uD56D \uC5C6\uC74C \u2014 \uBB38\uC11C\uC758 \uD575\uC2EC \uAC1C\uB150 \uC911\uC2EC\uC73C\uB85C \uC694\uC57D)";
}
async function Sl(e, s) {
  var _a2, _b, _c2;
  const n = Pe(), r = Array.isArray(e) ? e : [], o = at(r, ((_a2 = s == null ? void 0 : s.profileId) == null ? void 0 : _a2.trim()) || n.profileId || tn());
  if (!o) return { ready: false, message: "AI \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\xB7\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." };
  const a = (((_b = s == null ? void 0 : s.model) == null ? void 0 : _b.trim()) || ((_c2 = n.modelId) == null ? void 0 : _c2.trim()) || sn(o.id, o.kind)).trim();
  if (o.kind === xr) {
    const c = hr(), m = await gr(c);
    if (!m.running) return { ready: false, message: "MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." };
    const u = a || c.selectedModelId || m.models[0] || "";
    return u ? { ready: true, profile: o, model: u } : { ready: false, message: "\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694." };
  }
  if (o.kind === br) {
    const c = kr();
    let m = [];
    try {
      const d = await To(c);
      if (m = Array.isArray(d.models) ? d.models : [], !d.running && !c.selectedModelId && !a) return { ready: false, message: "llama.cpp \uBAA8\uB378\uC774 \uC900\uBE44\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\xB7\uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." };
    } catch {
      if (!c.selectedModelId && !a) return { ready: false, message: "llama.cpp \uBAA8\uB378\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694." };
    }
    const u = a || c.selectedModelId || m[0] || "";
    return u ? { ready: true, profile: o, model: u } : { ready: false, message: "\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694." };
  }
  return o.kind === wr ? (o.baseUrl || "").trim() ? a ? { ready: true, profile: o, model: a } : { ready: false, message: "\uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uACE0\uB978 \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." } : { ready: false, message: "OpenAI \uD638\uD658 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uB610\uB294 AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\uB97C \uD655\uC778\uD558\uC138\uC694." } : a ? ((o.apiKey || "").trim(), { ready: true, profile: o, model: a }) : { ready: false, message: "Gemini \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uACE0\uB978 \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694." };
}
function Nl(e) {
  const s = String(e || "");
  return /제공자|프로필|모델을 선택|모델이 로드|모델이 준비|API 키|Endpoint URL|AI 도우미에서/i.test(s);
}
function Qe(e) {
  const s = String(e || "").trim();
  if (!s) throw new Error("\uBE48 LLM \uC751\uB2F5");
  try {
    return JSON.parse(s);
  } catch {
    const n = s.indexOf("{"), r = s.lastIndexOf("}");
    if (n >= 0 && r > n) return JSON.parse(s.slice(n, r + 1));
    const o = s.indexOf("["), a = s.lastIndexOf("]");
    if (o >= 0 && a > o) return JSON.parse(s.slice(o, a + 1));
    throw new Error("JSON \uD30C\uC2F1 \uC2E4\uD328");
  }
}
function Cl(e) {
  const s = e && typeof e == "object" ? e : {}, n = String(s.verdict || "wrong"), r = n === "correct" || n === "partial" ? n : "wrong", o = Math.min(100, Math.max(0, Number(s.score) || (r === "correct" ? 100 : r === "partial" ? 50 : 0))), a = String(s.feedback || "").trim() || "\uCC44\uC810 \uD53C\uB4DC\uBC31\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.", c = String(s.rationale || "").trim();
  return c ? { verdict: r, score: o, feedback: a, rationale: c } : { verdict: r, score: o, feedback: a };
}
function ts(e, s) {
  const n = { ...e };
  return s.signal && (n.signal = s.signal), s.onChunk && (n.onChunk = s.onChunk), n;
}
async function ye(e) {
  var _a2, _b, _c2;
  const s = Pe(), n = Array.isArray(e.profiles) ? e.profiles : [], r = at(n, ((_a2 = e.profileId) == null ? void 0 : _a2.trim()) || s.profileId || tn());
  if (!r) throw new Error("AI \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uC81C\uACF5\uC790\xB7\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
  const o = (((_b = e.model) == null ? void 0 : _b.trim()) || ((_c2 = s.modelId) == null ? void 0 : _c2.trim()) || sn(r.id, r.kind)).trim(), a = (e.systemPrompt || s.systemPrompt || "").trim(), c = e.instruction.trim(), m = { temperature: typeof e.temperature == "number" ? e.temperature : s.temperature }, u = {};
  if (e.signal && (u.signal = e.signal), e.onChunk && (u.onChunk = e.onChunk), r.kind === wr) {
    const d = (r.baseUrl || "").trim();
    if (!d) throw new Error("\uC120\uD0DD\uD55C \uC81C\uACF5\uC790\uC758 Endpoint URL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
    return Nt(r.id, o), _o(o), Ls(r.id, () => r.apiKey || "", (h) => Tn(ts({ baseUrl: d, apiKey: h, model: o, instruction: c, systemPrompt: a, selectedText: "", requestOptions: m }, u)), { allowEmpty: true, missingKeyMessage: "OpenAI \uD638\uD658 API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
  }
  if (r.kind === br) {
    const d = kr(), h = await Qo(d, e.signal ? { signal: e.signal } : {}), f = (r.baseUrl || h.baseUrl || "").trim();
    if (!f) throw new Error("llama.cpp \uC11C\uBC84 URL\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    const x = o.trim() || d.selectedModelId || h.models[0] || "";
    if (!x) throw new Error("\uC0AC\uC6A9\uD560 \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
    return Nt(r.id, x), Ls(r.id, () => r.apiKey || d.apiKey || "no-key-required", (v) => Tn(ts({ baseUrl: f, apiKey: v, model: x, instruction: c, systemPrompt: a, selectedText: "", requestOptions: m }, u)), { allowEmpty: true, missingKeyMessage: "llama.cpp API \uD0A4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." });
  }
  if (r.kind === xr) {
    const d = hr(), h = await gr(d);
    if (!h.running) throw new Error("MLX-VLM \uBAA8\uB378\uC774 \uB85C\uB4DC\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
    const f = o.trim() || d.selectedModelId || h.models[0] || "";
    if (!f) throw new Error("\uC0AC\uC6A9\uD560 MLX \uBAA8\uB378\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
    return Nt(r.id, f), Do(ts({ instruction: c, systemPrompt: a, selectedText: "", requestOptions: m }, u));
  }
  if (qo(o)) throw new Error("\uC120\uD0DD\uD55C \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
  return Nt(r.id, o), Bo(o), Ls(r.id, () => r.apiKey || "", (d) => Fo(ts({ apiKey: d, model: o, instruction: c, systemPrompt: a, selectedText: "", requestOptions: m }, u)), { missingKeyMessage: "Google AI Studio API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC124\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC785\uB825\uD558\uC138\uC694." });
}
function Mt(e, s, n) {
  const r = e && typeof e == "object" ? e : {};
  if ((r.kind === "subjective" ? "subjective" : (Array.isArray(r.options), "choice")) === "subjective") return { kind: "subjective", answerStyle: r.answerStyle === "essay" ? "essay" : "short", question: String(r.question || "").trim(), modelAnswer: String(r.modelAnswer || r.answer || "").trim(), point: String(r.point || "\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694."), explanation: String(r.explanation || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.") };
  const a = Array.isArray(r.options) ? r.options.map((m) => String(m || "")).slice(0, s) : [];
  for (; a.length < Math.min(2, s); ) a.push("");
  const c = Number.parseInt(String(r.answer ?? n), 10) || n;
  return { kind: "choice", question: String(r.question || "").trim(), options: a, answer: Math.min(s, Math.max(1, c)), point: String(r.point || "\uD575\uC2EC \uAC1C\uB150\uC744 \uD30C\uC545\uD558\uC138\uC694."), explanation: String(r.explanation || "\uD574\uC124\uC774 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."), isGenerated: true };
}
function ve(e, s, n, r, o) {
  var _a2, _b;
  const a = { profiles: e, instruction: s, systemPrompt: n, temperature: r };
  return (o == null ? void 0 : o.signal) && (a.signal = o.signal), (o == null ? void 0 : o.onChunk) && (a.onChunk = o.onChunk), ((_a2 = o == null ? void 0 : o.profileId) == null ? void 0 : _a2.trim()) && (a.profileId = o.profileId.trim()), ((_b = o == null ? void 0 : o.model) == null ? void 0 : _b.trim()) && (a.model = o.model.trim()), a;
}
function De(e) {
  return e ? { signal: e } : void 0;
}
function rn(e) {
  var _a2, _b;
  const s = {};
  return e.signal && (s.signal = e.signal), e.onChunk && (s.onChunk = e.onChunk), ((_a2 = e.profileId) == null ? void 0 : _a2.trim()) && (s.profileId = e.profileId.trim()), ((_b = e.model) == null ? void 0 : _b.trim()) && (s.model = e.model.trim()), s.signal || s.onChunk || s.profileId || s.model ? s : void 0;
}
async function ir(e) {
  const s = Pe(), n = e.question, o = `\uB2E4\uC74C ${n.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615"} \uC8FC\uAD00\uC2DD \uBB38\uD56D\uC758 \uC218\uD5D8\uC790 \uB2F5\uC548\uC744 \uCC44\uC810\uD558\uC138\uC694.

[\uBB38\uC81C]
${n.question}

[\uBAA8\uBC94 \uB2F5\uC548 / \uC815\uB2F5]
${n.modelAnswer || ""}

[\uC811\uADFC Point]
${n.point || ""}

[\uD574\uC124]
${n.explanation || ""}

[\uC218\uD5D8\uC790 \uB2F5\uC548]
${e.userAnswer}

\uCC44\uC810 \uADDC\uCE59:
- \uB2E8\uB2F5\uD615: \uB3D9\uC758\uC5B4\xB7\uD45C\uAE30 \uCC28\uC774(\uB300\uC18C\uBB38\uC790, \uACF5\uBC31, \uB2E8\uC704)\uB97C \uC778\uC815\uD558\uC138\uC694.
- \uC11C\uC220\uD615: \uBAA8\uBC94 \uB2F5\uC548\uACFC \uC811\uADFC Point\uC758 \uD575\uC2EC\uC774 \uD3EC\uD568\uB418\uBA74 partial \uC774\uC0C1\uC744 \uC8FC\uC138\uC694.
- score\uB294 0~100 (correct\u226590, partial 40~89, wrong<40).

JSON\uB9CC \uBC18\uD658:
{"verdict":"correct"|"partial"|"wrong","score":0,"feedback":"...","rationale":"..."}`, a = await ye(ve(e.profiles, o, "\uB2F9\uC2E0\uC740 \uACF5\uC815\uD55C \uC2DC\uD5D8 \uCC44\uC810\uC704\uC6D0\uC785\uB2C8\uB2E4. JSON\uB9CC \uBC18\uD658\uD558\uC138\uC694.", s.gradeTemperature, De(e.signal)));
  return Cl(Qe(a));
}
async function $l(e) {
  var _a2;
  const s = e.question, n = s.options || [], r = e.selectedOption, o = r === s.answer, a = ((_a2 = e.userInstructions) == null ? void 0 : _a2.trim()) ? `
[\uC218\uD5D8\uC790 \uCD94\uAC00 \uC9C8\uBB38]
${e.userInstructions.trim()}
\uC704 \uC9C8\uBB38\uC5D0\uB3C4 \uB2F5\uBCC0\uD558\uC138\uC694.` : "", m = `${o ? `\uC218\uD5D8\uC790\uAC00 ${r}\uBC88(\uC815\uB2F5)\uC744 \uACE8\uB790\uC2B5\uB2C8\uB2E4. \uC65C \uC815\uB2F5\uC778\uC9C0, \uB2E4\uB978 \uBCF4\uAE30\uAC00 \uC65C \uD2C0\uB838\uB294\uC9C0 \uC124\uBA85\uD558\uC138\uC694.` : `\uC218\uD5D8\uC790\uAC00 ${r}\uBC88\uC744 \uACE8\uB790\uC2B5\uB2C8\uB2E4. \uC65C \uC624\uB2F5\uC778\uC9C0 \uC124\uBA85\uD558\uC138\uC694.`}

[\uBB38\uC81C] ${s.question}
[\uBCF4\uAE30]
${n.map((u, d) => `${d + 1}. ${u}`).join(`
`)}
[\uC815\uB2F5] ${s.answer}\uBC88
[\uC120\uD0DD\uD55C \uBCF4\uAE30] ${r}\uBC88 (${n[r - 1] || ""})
[\uAE30\uC874 \uD574\uC124] ${s.explanation || ""}
${a}

\uC124\uBA85 \uD14D\uC2A4\uD2B8\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
  return ye(ve(e.profiles, m, "\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124 \uC791\uC131\uC790\uC785\uB2C8\uB2E4.", 0.5, rn({ signal: e.signal, onChunk: e.onChunk, profileId: e.profileId, model: e.model })));
}
async function Pl(e) {
  const s = e.question, n = s.options || [], r = e.selectedOption, o = `\uC218\uD5D8\uC790\uAC00 \uAC1D\uAD00\uC2DD \uBB38\uC81C \uD480\uC774 \uD6C4 \uC544\uB798 \uBD84\uC11D \uB0B4\uC6A9\uC744 \uC77D\uACE0 \uCD94\uAC00 \uC9C8\uBB38\uC744 \uD588\uC2B5\uB2C8\uB2E4. \uBB38\uC81C, \uBCF4\uAE30, \uAE30\uC874 \uBD84\uC11D\uB9CC \uADFC\uAC70\uB85C \uCD94\uAC00 \uC9C8\uBB38\uC5D0 \uB2F5\uD558\uC138\uC694.

[\uBB38\uC81C]
${s.question}

[\uBCF4\uAE30]
${n.map((a, c) => `${c + 1}. ${a}`).join(`
`)}

[\uC815\uB2F5] ${s.answer}\uBC88
[\uC218\uD5D8\uC790\uAC00 \uC120\uD0DD\uD55C \uBCF4\uAE30] ${r}\uBC88 (${n[r - 1] || ""})
[\uAE30\uC874 \uD574\uC124] ${s.explanation || ""}

[\uAE30\uC874 \uC624\uB2F5/\uC815\uB2F5 \uBD84\uC11D]
${e.existingAnalysis.trim()}

[\uC218\uD5D8\uC790 \uCD94\uAC00 \uC9C8\uBB38]
${e.userQuestion.trim()}

\uC751\uB2F5 \uD615\uC2DD (\uBC18\uB4DC\uC2DC \uC900\uC218):
- \uCCAB \uC904\uC740 \uBC18\uB4DC\uC2DC **[\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0: {\uC9C8\uBB38 \uC694\uC57D}]** \uD615\uC2DD (\uB9C8\uD06C\uB2E4\uC6B4 \uBCFC\uB4DC, \uD55C \uC904)
- \uC9C8\uBB38 \uC694\uC57D\uC740 \uC218\uD5D8\uC790 \uC9C8\uBB38\uC758 \uD575\uC2EC\uC744 \uC9E7\uAC8C \uC694\uC57D (\uC608: \uC9C0\uB2C8 \uC9C0\uC218\uC640 \uC5D4\uD2B8\uB85C\uD53C\uC758 \uC218\uC2DD\uC801 \uCC28\uC774)
- \uADF8 \uB2E4\uC74C \uC904\uBD80\uD130 \uB2F5\uBCC0 \uBCF8\uBB38 (\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uB2A5)
- \uC11C\uB450 \uC124\uBA85\uC774\uB098 JSON\uC740 \uB123\uC9C0 \uB9C8\uC138\uC694.`;
  return ye(ve(e.profiles, o, "\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124 \uD29C\uD130\uC785\uB2C8\uB2E4. \uBB38\uC81C\uC640 \uAE30\uC874 \uBD84\uC11D \uB0B4\uC6A9\uB9CC \uADFC\uAC70\uB85C \uB2F5\uD558\uC138\uC694.", 0.5, rn({ signal: e.signal, onChunk: e.onChunk, profileId: e.profileId, model: e.model })));
}
async function zl(e) {
  const s = Pe(), n = e.question, r = _e(n, e.config.choiceCount || 4), o = Math.floor(Math.random() * r) + 1, a = (n.options || []).map((S) => String(S || "")), c = n.answer && n.answer >= 1 ? n.answer : 1, m = (S) => {
    var _a2;
    return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, S);
  };
  let u = "";
  const d = e.sourcePaths || [];
  if (d.length > 0 && e.readText) {
    m({ step: "rag", status: "running", detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026" });
    const { chunks: S } = await xs({ sourcePaths: d, query: `${n.question}
${n.point || ""}`, readText: e.readText });
    u = hs(S), m({ step: "rag", status: "done", detail: S.length > 0 ? `${S.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C", llmInstruction: `query: ${n.question}`, llmResponse: re(u || "(no excerpts)") });
  }
  const h = s.calcComplexity === "hand" ? "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5]" : "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uACC4\uC0B0\uAE30 \uD544\uC218]", f = Ar({ question: n.question, options: a, answer: c, point: n.point || "", explanation: n.explanation || "", ...u ? { ragBlock: u } : {} }), x = Math.min(s.temperature, 0.6);
  m({ step: "analysis", status: "running", detail: "LLM \uBB38\uD56D \uBD84\uC11D \uC911\u2026", llmInstruction: f, systemPrompt: lt });
  const v = await ye(ve(e.profiles, f, lt, x, De(e.signal))), y = Pr(Qe(v));
  m({ step: "analysis", status: "done", detail: `${y.coreCategory}${y.isCalculation ? " \xB7 \uACC4\uC0B0\uBB38\uC81C" : ""}`, llmInstruction: f, llmResponse: re(v), systemPrompt: lt });
  const C = ct(y);
  let P = "";
  if (y.isCalculation && y.variables.length > 0) {
    m({ step: "randomize", status: "running", detail: "\uC218\uCE58 \uBCC0\uC218 \uC0D8\uD50C\uB9C1\u2026" });
    const S = zr(y.variables);
    P = Ir(S);
    const O = S.map((L) => `${L.id}=${L.value}${L.unit ? L.unit : ""}`).join(", ");
    m({ step: "randomize", status: "done", detail: O, llmInstruction: ct(y), llmResponse: re(JSON.stringify({ samples: S, variables: y.variables }, null, 2)) });
  } else m({ step: "randomize", status: "skipped", detail: "\uBE44\uACC4\uC0B0 \uBB38\uD56D", llmResponse: re(ct(y)) });
  const j = Ba({ question: n.question, options: a, answer: c, point: n.point || "", explanation: n.explanation || "", choiceCount: r, targetAnswer: o, complexity: h, analysisBlock: C, sampledBlock: P, ...u ? { ragBlock: u } : {} }), N = Er(s.systemPrompt || yr);
  m({ step: "generate", status: "running", detail: "LLM \uBB38\uD56D \uC791\uC131 \uC911\u2026", llmInstruction: j, systemPrompt: N });
  const w = await ye(ve(e.profiles, j, N, s.temperature, De(e.signal))), k = Qe(w);
  m({ step: "generate", status: "done", detail: `\uC815\uB2F5 ${o}\uBC88`, llmInstruction: j, llmResponse: re(w), systemPrompt: N });
  let $ = Mt(k, r, o);
  if (!ds($)) {
    const S = dt($.point), O = ut($.explanation), L = Mr({ question: $.question, options: $.options || [], answer: $.answer || o, analysisBlock: C, missingPoint: S, missingExplanation: O });
    m({ step: "generate", status: "running", detail: "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC911\u2026", llmInstruction: L, systemPrompt: N });
    const _ = await ye(ve(e.profiles, L, N, Math.min(s.temperature, 0.8), De(e.signal))), W = Qe(_), M = W && typeof W == "object" ? W : {};
    S && typeof M.point == "string" && M.point.trim() && ($ = { ...$, point: String(M.point).trim() }), O && typeof M.explanation == "string" && M.explanation.trim() && ($ = { ...$, explanation: String(M.explanation).trim() }), m({ step: "generate", status: "done", detail: ds($) ? "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC644\uB8CC" : "\uD574\uC124\xB7\uC811\uADFC Point \uC77C\uBD80 \uBCF4\uC644", llmInstruction: L, llmResponse: re(_), systemPrompt: N });
  }
  return { ...$, isGenerated: true };
}
async function Il(e) {
  const s = Pe(), n = e.question, r = _e(n, e.config.choiceCount || 4), o = e.target.kind === "choice" ? Je(e.target.choiceCount) : r, a = e.target.kind === "choice" ? Math.floor(Math.random() * o) + 1 : 1, c = (n.options || []).map((O) => String(O || "")), m = n.answer && n.answer >= 1 ? n.answer : 1, u = (O) => {
    var _a2;
    return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, O);
  };
  let d = "";
  const h = e.sourcePaths || [];
  if (h.length > 0 && e.readText) {
    u({ step: "rag", status: "running", detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026" });
    const O = [n.question, n.point || "", e.target.userPrompt || ""].filter(Boolean).join(`
`), { chunks: L } = await xs({ sourcePaths: h, query: O, readText: e.readText });
    d = hs(L), u({ step: "rag", status: "done", detail: L.length > 0 ? `${L.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C", llmInstruction: `query: ${O}`, llmResponse: re(d || "(no excerpts)") });
  }
  const f = s.calcComplexity === "hand" ? "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uC190\uC73C\uB85C \uACC4\uC0B0 \uAC00\uB2A5]" : "[\uACC4\uC0B0 \uB09C\uC774\uB3C4: \uACC4\uC0B0\uAE30 \uD544\uC218]", x = Ar({ question: n.question, options: c, answer: n.kind === "choice" ? m : 1, point: n.point || "", explanation: n.explanation || "", ...d ? { ragBlock: d } : {} }), v = Math.min(s.temperature, 0.6);
  u({ step: "analysis", status: "running", detail: "LLM \uBB38\uD56D \uBD84\uC11D \uC911\u2026", llmInstruction: x, systemPrompt: lt });
  const y = await ye(ve(e.profiles, x, lt, v, De(e.signal))), C = Pr(Qe(y));
  u({ step: "analysis", status: "done", detail: `${C.coreCategory}${C.isCalculation ? " \xB7 \uACC4\uC0B0\uBB38\uC81C" : ""}`, llmInstruction: x, llmResponse: re(y), systemPrompt: lt });
  const P = ct(C);
  let j = "";
  if (C.isCalculation && C.variables.length > 0) {
    u({ step: "randomize", status: "running", detail: "\uC218\uCE58 \uBCC0\uC218 \uC0D8\uD50C\uB9C1\u2026" });
    const O = zr(C.variables);
    j = Ir(O);
    const L = O.map((_) => `${_.id}=${_.value}${_.unit ? _.unit : ""}`).join(", ");
    u({ step: "randomize", status: "done", detail: L, llmInstruction: ct(C), llmResponse: re(JSON.stringify({ samples: O, variables: C.variables }, null, 2)) });
  } else u({ step: "randomize", status: "skipped", detail: "\uBE44\uACC4\uC0B0 \uBB38\uD56D", llmResponse: re(ct(C)) });
  const N = fl({ question: n.question, options: c, answer: n.kind === "choice" ? m : 1, point: n.point || "", explanation: n.explanation || "", sourceKind: n.kind, ...n.answerStyle ? { sourceAnswerStyle: n.answerStyle } : {}, target: e.target, complexity: f, analysisBlock: P, sampledBlock: j, ...e.target.kind === "choice" ? { targetAnswer: a } : {}, ...d ? { ragBlock: d } : {} }), w = ml(s.systemPrompt || yr);
  u({ step: "generate", status: "running", detail: "\uD30C\uC0DD \uBB38\uD56D \uC791\uC131 \uC911\u2026", llmInstruction: N, systemPrompt: w });
  const k = await ye(ve(e.profiles, N, w, s.temperature, De(e.signal))), $ = Qe(k);
  u({ step: "generate", status: "done", detail: e.target.kind === "choice" ? `\uC815\uB2F5 ${a}\uBC88 \xB7 ${o}\uC9C0\uC120\uB2E4` : e.target.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615", llmInstruction: N, llmResponse: re(k), systemPrompt: w });
  let S = Mt($, o, a);
  if (e.target.kind === "subjective" ? S = { kind: "subjective", answerStyle: e.target.answerStyle === "essay" ? "essay" : "short", question: S.question, modelAnswer: S.modelAnswer || "", point: S.point, explanation: S.explanation, isGenerated: true } : S = { kind: "choice", question: S.question, options: Ye(S.options || [], o), answer: Math.min(o, Math.max(1, S.answer || a)), point: S.point, explanation: S.explanation, isGenerated: true }, !ds(S)) {
    const O = dt(S.point), L = ut(S.explanation), _ = Mr({ question: S.question, options: S.kind === "choice" ? S.options || [] : [], answer: S.kind === "choice" && S.answer ? S.answer : a, analysisBlock: P, missingPoint: O, missingExplanation: L });
    u({ step: "generate", status: "running", detail: "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC911\u2026", llmInstruction: _, systemPrompt: w });
    const W = await ye(ve(e.profiles, _, w, Math.min(s.temperature, 0.8), De(e.signal))), M = Qe(W), U = M && typeof M == "object" ? M : {};
    O && typeof U.point == "string" && U.point.trim() && (S = { ...S, point: String(U.point).trim() }), L && typeof U.explanation == "string" && U.explanation.trim() && (S = { ...S, explanation: String(U.explanation).trim() }), u({ step: "generate", status: "done", detail: ds(S) ? "\uD574\uC124\xB7\uC811\uADFC Point \uBCF4\uC644 \uC644\uB8CC" : "\uD574\uC124\xB7\uC811\uADFC Point \uC77C\uBD80 \uBCF4\uC644", llmInstruction: _, llmResponse: re(W), systemPrompt: w });
  }
  return { ...S, isGenerated: true };
}
const El = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uD574\uC124\xB7\uC811\uADFC Point \uC791\uC131\uC790\uC785\uB2C8\uB2E4.
\uC8FC\uC5B4\uC9C4 \uBB38\uD56D\uB9CC \uADFC\uAC70\uB85C \uC811\uADFC Point\uC640 \uD574\uC124\uC744 \uC791\uC131\uD569\uB2C8\uB2E4.
- \uC811\uADFC Point: \uCD9C\uC81C \uC758\uB3C4\uB97C \uB9E4\uC6B0 \uAC04\uACB0\uD558\uAC8C. \uD575\uC2EC \uC0AC\uACE0 \uD3EC\uC778\uD2B8\uB9CC.
- \uD574\uC124: \uC815\uB2F5 \uADFC\uAC70\xB7\uD568\uC815\xB7\uD480\uC774 \uD750\uB984\uC774 \uB4DC\uB7EC\uB098\uB294 \uC644\uACB0\uB41C \uD574\uC124. \uB9C8\uD06C\uB2E4\uC6B4 \uC0AC\uC6A9 \uAC00\uB2A5.
- placeholder \uBB38\uAD6C\uB098 \uBE48 \uBB38\uC790\uC5F4\uB85C \uCC44\uC6B0\uC9C0 \uB9C8\uC138\uC694.
\uC751\uB2F5\uC740 \uC694\uCCAD\uB41C JSON\uB9CC \uBC18\uD658\uD558\uC138\uC694.`;
async function Al(e) {
  var _a2;
  const s = Pe(), n = e.question;
  if (!e.missingPoint && !e.missingExplanation) return {};
  let r = "";
  const o = e.sourcePaths || [];
  if (o.length > 0 && e.readText) {
    const h = [n.question, n.point || "", n.explanation || ""].filter(Boolean).join(`
`), { chunks: f } = await xs({ sourcePaths: o, query: h, readText: e.readText });
    r = hs(f);
  }
  const a = Fa({ question: n, missingPoint: e.missingPoint, missingExplanation: e.missingExplanation, ...r ? { ragBlock: r } : {} }), c = await ye(ve(e.profiles, a, ((_a2 = s.systemPrompt) == null ? void 0 : _a2.trim()) || El, Math.min(s.temperature, 0.8), rn({ signal: e.signal, profileId: e.profileId, model: e.model }))), m = Qe(c), u = m && typeof m == "object" && !Array.isArray(m) ? m : {}, d = {};
  return e.missingPoint && typeof u.point == "string" && u.point.trim() && !dt(u.point) && (d.point = String(u.point).trim()), e.missingExplanation && typeof u.explanation == "string" && u.explanation.trim() && !ut(u.explanation) && (d.explanation = String(u.explanation).trim()), d;
}
async function Ml(e) {
  var _a2, _b, _c2, _d;
  const s = Pe(), n = Array.isArray(e.exampleQuestions) ? e.exampleQuestions : [], r = [...n].reverse().find((w) => w.kind === "choice"), o = r ? _e(r, e.config.choiceCount || 4) : e.config.choiceCount || 4, a = Math.min(5, Math.max(1, e.count || 1)), c = e.kind || "choice", m = (e.topic || "").trim(), u = (w) => {
    var _a3;
    return (_a3 = e.onStep) == null ? void 0 : _a3.call(e, w);
  };
  u({ step: "load_sources", status: "running", detail: "\uBB38\uC11C \uC77D\uAE30 \uC911\u2026" }), (_a2 = e.onProgress) == null ? void 0 : _a2.call(e, "\uADFC\uAC70 \uBB38\uC11C \uB85C\uB4DC \uC911\u2026");
  const d = await dl(e.sourcePaths, e.readText, s.ragMaxChars);
  if (!d.length) throw u({ step: "load_sources", status: "error", error: "\uADFC\uAC70 \uBB38\uC11C\uC5D0\uC11C \uB0B4\uC6A9\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4." }), new Error("\uADFC\uAC70 \uBB38\uC11C\uC5D0\uC11C \uB0B4\uC6A9\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
  u({ step: "load_sources", status: "done", detail: `${d.length}\uAC1C \uBB38\uC11C`, llmResponse: re(d.map((w) => `- ${w.path} (${w.text.length.toLocaleString()} chars)`).join(`
`)) });
  const h = jl(n), f = [];
  let x = "";
  for (let w = 0; w < d.length; w += 1) {
    const k = d[w];
    if (!k) continue;
    if ((_b = e.signal) == null ? void 0 : _b.aborted) throw new DOMException("Aborted", "AbortError");
    const $ = `\uBB38\uC11C \uC694\uC57D ${w + 1}/${d.length}: ${k.path}`, S = `[\uCD9C\uC81C \uCC38\uACE0 \uBB38\uD56D \uC608\uC2DC]
\uC81C\uC2DC\uB41C \uBB38\uD56D \uC2A4\uD0C0\uC77C\xB7\uAC1C\uB150 \uBC94\uC704\uB97C \uCC38\uACE0\uD574, \uC544\uB798 \uC6D0\uBB38\uC5D0\uC11C \uCD9C\uC81C\uC5D0 \uD544\uC694\uD55C \uC815\uBCF4\uB9CC \uC8FC\uC81C\uBCC4\uB85C \uC0C1\uC138 \uC694\uC57D\uD558\uC138\uC694.

${h}

[\uC0AC\uC6A9\uC790 \uC8FC\uC81C]
${m || "(\uC608\uC2DC \uBB38\uD56D\xB7\uBB38\uC11C \uD575\uC2EC \uAC1C\uB150)"}

[\uADFC\uAC70 \uBB38\uC11C \uACBD\uB85C]
${k.path}

[\uADFC\uAC70 \uBB38\uC11C \uBCF8\uBB38]
${k.text}

\uC704 \uBCF8\uBB38\uC744 \uC8FC\uC81C\uBCC4 \uB9C8\uD06C\uB2E4\uC6B4 \uC694\uC57D\uC73C\uB85C\uB9CC \uC791\uC131\uD558\uC138\uC694.`;
    u({ step: "summarize", status: "running", detail: $, llmInstruction: S, systemPrompt: es, ...x ? { llmResponse: x } : {} }), (_c2 = e.onProgress) == null ? void 0 : _c2.call(e, $);
    const O = await ye(ve(e.profiles, S, es, Math.min(s.temperature, 0.7), De(e.signal))), L = String(O || "").trim();
    L && (f.push({ path: k.path, summary: L }), x += `### ${k.path}

${re(L, 24e3)}

---

`, u({ step: "summarize", status: "running", detail: $, llmInstruction: S, systemPrompt: es, llmResponse: x }));
  }
  if (!f.length) throw u({ step: "summarize", status: "error", error: "\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." }), new Error("\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
  u({ step: "summarize", status: "done", detail: `${f.length}\uAC1C \uC694\uC57D \uC644\uB8CC`, llmResponse: re(x), systemPrompt: es }), (_d = e.onProgress) == null ? void 0 : _d.call(e, "\uC694\uC57D\uBCF8\uC73C\uB85C \uBB38\uD56D \uC0DD\uC131 \uC911\u2026");
  const v = f.map((w, k) => `### \uC694\uC57D\uBCF8 ${k + 1}
\uACBD\uB85C: ${w.path}

${w.summary}`).join(`

---

`), y = `[\uADFC\uAC70 \uBB38\uC11C \uC694\uC57D\uBCF8 (${f.length}\uAC1C)]
\uC544\uB798 \uC694\uC57D\uBCF8\uB9CC \uC0AC\uC2E4 \uADFC\uAC70\uB85C \uC0AC\uC6A9\uD558\uC138\uC694. \uC694\uC57D\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9\uC740 \uC4F0\uC9C0 \uB9C8\uC138\uC694.

${v}

[\uCD9C\uC81C \uC9C0\uC2DC]
\uC8FC\uC81C: ${m || "(\uC694\uC57D\uBCF8\uC758 \uD575\uC2EC \uAC1C\uB150)"}
\uBB38\uD56D \uC720\uD615: ${c === "subjective" ? "\uC8FC\uAD00\uC2DD" : `\uAC1D\uAD00\uC2DD ${o}\uC9C0\uC120\uB2E4`}
\uC0DD\uC131 \uAC1C\uC218: ${a}

\uAE30\uC874 \uBB38\uD56D \uC2A4\uD0C0\uC77C \uCC38\uACE0:
${h}

JSON \uBC30\uC5F4\uB9CC \uBC18\uD658\uD558\uC138\uC694.`, C = vl(c, o, a);
  u({ step: "generate", status: "running", detail: "LLM \uBB38\uD56D \uC791\uC131 \uC911\u2026", llmInstruction: y, systemPrompt: C });
  const P = await ye(ve(e.profiles, y, C, s.temperature, De(e.signal))), j = Qe(P), N = Array.isArray(j) ? j : [j];
  return u({ step: "generate", status: "done", detail: `${Math.min(N.length, a)}\uAC1C \uBB38\uD56D`, llmInstruction: y, llmResponse: re(P), systemPrompt: C }), N.slice(0, a).map((w, k) => {
    if (c === "subjective") {
      const $ = w && typeof w == "object" ? { ...w, kind: "subjective" } : { kind: "subjective" };
      return { ...Mt($, o, k % o + 1), isGenerated: true };
    }
    return { ...Mt(w, o, k % o + 1), isGenerated: true };
  });
}
const Ll = `\uB2F9\uC2E0\uC740 \uC2DC\uD5D8 \uBB38\uD56D \uD3B8\uC9D1\uC790\uC785\uB2C8\uB2E4. \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB294 \uBB38\uD56D\uC744 \uAD50\uC815\xB7\uC7AC\uC791\uC131\uD569\uB2C8\uB2E4.
- \uC0AC\uC2E4 \uAD00\uACC4\uB97C \uBC14\uB85C\uC7A1\uACE0, \uC9C0\uBB38\xB7\uC120\uD0DD\uC9C0\xB7\uC815\uB2F5\xB7\uD574\uC124\uC774 \uC2DC\uD5D8\uC5D0 \uC4F8 \uC218 \uC788\uC744 \uB9CC\uD07C \uC644\uACB0\uB418\uAC8C \uB9CC\uB4DC\uC138\uC694.
- \uC0AC\uC6A9\uC790\uAC00 \uBC29\uD5A5\uC744 \uC81C\uC2DC\uD558\uBA74 \uADF8\uC5D0 \uB9DE\uAC8C \uC8FC\uC81C\xB7\uB09C\uC774\uB3C4\xB7\uD615\uC2DD\uC744 \uC870\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.
- \uADFC\uAC70 \uBC1C\uCDCC\uAC00 \uC788\uC73C\uBA74 \uADF8 \uBC94\uC704 \uC548\uC5D0\uC11C\uB9CC \uC0AC\uC2E4\uC744 \uC0AC\uC6A9\uD558\uC138\uC694. \uC5C6\uB294 \uB0B4\uC6A9\uC744 \uC9C0\uC5B4\uB0B4\uC9C0 \uB9C8\uC138\uC694.
- \uAC1D\uAD00\uC2DD \uC120\uD0DD\uC9C0 \uC548\uC5D0\uC11C\uB294 \uC778\uB77C\uC778 \uC218\uC2DD($...$)\uB9CC \uC0AC\uC6A9\uD558\uC138\uC694.
- \uC751\uB2F5\uC740 JSON \uAC1D\uCCB4 \uD558\uB098\uB9CC \uBC18\uD658\uD558\uC138\uC694. \uB2E4\uB978 \uD14D\uC2A4\uD2B8\xB7\uB9C8\uD06C\uB2E4\uC6B4\xB7\uCF54\uB4DC\uD39C\uC2A4\uB294 \uAE08\uC9C0\uD569\uB2C8\uB2E4.`;
function Ol(e, s) {
  const n = [`[\uC720\uD615] ${e.kind}${e.kind === "subjective" ? ` / ${e.answerStyle || "short"}` : ""}`, `[\uC9C8\uBB38]
${e.question || "(\uBE44\uC5B4 \uC788\uC74C)"}`];
  if (e.kind === "choice") {
    const r = e.options || [];
    n.push("[\uC120\uD0DD\uC9C0]");
    for (let o = 0; o < s; o += 1) {
      const a = r[o] || "(\uBE44\uC5B4 \uC788\uC74C)", c = e.answer === o + 1 ? " \u2190 \uD604\uC7AC \uC815\uB2F5" : "";
      n.push(`${o + 1}. ${a}${c}`);
    }
  } else n.push(`[\uBAA8\uBC94 \uB2F5\uC548 / \uC815\uB2F5]
${e.modelAnswer || "(\uBE44\uC5B4 \uC788\uC74C)"}`);
  return n.push(`[\uC811\uADFC Point]
${e.point || "(\uC5C6\uC74C)"}`), n.push(`[\uD574\uC124]
${e.explanation || "(\uC5C6\uC74C)"}`), n.join(`

`);
}
function Rl(e) {
  const s = e.config.choiceCount || 4, n = e.question, r = String(e.userInstructions || "").trim(), o = n.kind === "subjective" ? `\uC8FC\uAD00\uC2DD(${n.answerStyle === "essay" ? "\uC11C\uC220\uD615" : "\uB2E8\uB2F5\uD615"})\uC744 \uC720\uC9C0\uD558\uC138\uC694. \uC0AC\uC6A9\uC790\uAC00 \uC720\uD615 \uBCC0\uACBD\uC744 \uBA85\uC2DC\uD558\uC9C0 \uC54A\uC558\uB2E4\uBA74 \uAC1D\uAD00\uC2DD\uC73C\uB85C \uBC14\uAFB8\uC9C0 \uB9C8\uC138\uC694.` : `\uAC1D\uAD00\uC2DD ${s}\uC9C0\uC120\uB2E4\uB97C \uC720\uC9C0\uD558\uC138\uC694. options \uAE38\uC774\uB294 \uC815\uD655\uD788 ${s}, answer\uB294 1~${s} \uC815\uC218\uC785\uB2C8\uB2E4.`, a = n.kind === "subjective" ? '{"kind":"subjective","answerStyle":"short"|"essay","question":"...","modelAnswer":"...","point":"...","explanation":"..."}' : `{"kind":"choice","question":"...","options":[${Array.from({ length: s }, () => '"..."').join(",")}],"answer":1,"point":"...","explanation":"..."}`;
  return `\uB2E4\uC74C \uBB38\uD56D\uC740 \uBD88\uC644\uC804\uD558\uAC70\uB098 \uC624\uB958\uAC00 \uC788\uB2E4\uACE0 \uAC04\uC8FC\uB429\uB2C8\uB2E4. \uAD50\uC815\uB41C \uC644\uC131 \uBB38\uD56D\uC744 JSON\uC73C\uB85C \uBC18\uD658\uD558\uC138\uC694.

${Ol(n, s)}

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
async function Tl(e) {
  const s = Pe(), n = e.question, r = _e(n, e.config.choiceCount || 4), o = (x) => {
    var _a2;
    return (_a2 = e.onStep) == null ? void 0 : _a2.call(e, x);
  }, a = n.kind === "choice" && n.answer && n.answer >= 1 ? Math.min(r, n.answer) : 1;
  let c = "";
  const m = e.sourcePaths || [];
  if (m.length > 0 && e.readText) {
    o({ step: "rag", status: "running", detail: "\uADFC\uAC70 \uBB38\uC11C \uAC80\uC0C9 \uC911\u2026" });
    const x = [n.question, n.point || "", String(e.userInstructions || "").trim()].filter(Boolean).join(`
`), { chunks: v } = await xs({ sourcePaths: m, query: x, readText: e.readText });
    c = hs(v), o({ step: "rag", status: "done", detail: v.length > 0 ? `${v.length}\uAC1C \uBC1C\uCDCC` : "\uBC1C\uCDCC \uC5C6\uC74C" });
  } else o({ step: "rag", status: "skipped", detail: "\uADFC\uAC70 \uC5C6\uC74C" });
  const u = Rl({ question: n, config: e.config, ...String(e.userInstructions || "").trim() ? { userInstructions: String(e.userInstructions).trim() } : {}, ...c ? { ragBlock: c } : {} });
  o({ step: "generate", status: "running", detail: "\uBB38\uD56D \uAD50\uC815 \uC911\u2026" });
  const d = await ye(ve(e.profiles, u, Ll, s.temperature, De(e.signal))), h = Qe(d), f = h && typeof h == "object" && !Array.isArray(h) ? h : Array.isArray(h) && h[0] ? h[0] : h;
  return o({ step: "generate", status: "done", detail: "\uAD50\uC815 \uC644\uB8CC" }), Mt(f, r, a);
}
function _l(e) {
  const s = Array.from({ length: e }, (n, r) => r);
  for (let n = s.length - 1; n > 0; n -= 1) {
    const r = Math.floor(Math.random() * (n + 1)), o = s[n];
    s[n] = s[r], s[r] = o;
  }
  return s;
}
function Ql(e) {
  const s = /* @__PURE__ */ new Map();
  for (let n = 0; n < e.length; n += 1) {
    const r = e[n];
    s.set(r + 1, n + 1);
  }
  return s;
}
function Dl(e, s) {
  if (e.kind !== "choice") return null;
  const n = e.options || [];
  if (n.length < 2) return null;
  const r = s ?? _l(n.length);
  if (r.length !== n.length) return null;
  const o = r.map((d) => n[d] ?? ""), a = Math.max(0, (e.answer ?? 1) - 1), c = r.indexOf(a), m = c >= 0 ? c + 1 : e.answer, u = Ql(r);
  return { question: { ...e, options: o, ...m != null ? { answer: m } : {} }, oldToNew: u };
}
function ql(e, s) {
  if (typeof e != "number" || !Number.isFinite(e)) return e;
  const n = Math.round(e);
  return s.get(n) ?? e;
}
function Bl(e, s) {
  const n = {};
  for (const [r, o] of Object.entries(e)) {
    const a = r.lastIndexOf("_");
    if (a <= 0) continue;
    const c = r.slice(0, a), m = Number.parseInt(r.slice(a + 1), 10);
    if (!c || !Number.isFinite(m) || m < 1) continue;
    const u = s.get(c);
    if (!u) {
      n[r] = o;
      continue;
    }
    const d = u.get(m);
    d != null && (n[Ze(c, d)] = o);
  }
  return n;
}
function Fl(e, s) {
  const n = {};
  for (const [r, o] of Object.entries(e)) {
    const a = s.get(r);
    if (!a) {
      n[r] = o;
      continue;
    }
    const c = a.get(o);
    c != null && (n[r] = c);
  }
  return n;
}
function Ul(e) {
  const s = /* @__PURE__ */ new Map();
  let n = 0;
  const r = e.questions.map((u) => {
    const d = Dl(u);
    return d ? (s.set(u.id, d.oldToNew), n += 1, d.question) : u;
  }), o = { ...e.userAnswers };
  for (const u of e.questions) {
    if (u.kind !== "choice") continue;
    const d = s.get(u.id);
    if (!d) continue;
    const h = ql(o[u.id], d);
    h !== void 0 && (o[u.id] = h);
  }
  const a = Bl(e.wrongExps, s), c = Fl(e.wrongExpFocus, s), m = Js(a);
  return { questions: r, userAnswers: o, wrongExps: a, wrongExpFocus: c, wrongChoiceExplanations: m, optionMapsByQuestionId: s, shuffledQuestionCount: n };
}
function Gl(e, s, n) {
  const r = n.get(e);
  return r ? r.get(s) ?? null : s;
}
function ar(e, s, n) {
  const r = at(e, s);
  if (!r) return "";
  const o = String(n || "").trim();
  if (o) return o;
  const a = sn(r.id, r.kind).trim();
  return a || Go(r.kind);
}
function Wl(e) {
  const [s, n] = l.useState(""), [r, o] = l.useState(""), a = l.useCallback(() => {
    var _a2;
    const d = Pe(), f = ((_a2 = at(e, d.profileId || tn())) == null ? void 0 : _a2.id) ?? "";
    n(f), o(ar(e, f, d.modelId));
  }, [e]);
  l.useEffect(() => {
    a();
    const d = () => a();
    return window.addEventListener(_n, d), () => window.removeEventListener(_n, d);
  }, [a]);
  const c = l.useCallback((d) => {
    const h = d.trim();
    n(h), Uo(h);
    const f = at(e, h), x = f ? ar(e, f.id, null) : "";
    o(x), Qn({ profileId: h || null, modelId: x || null });
  }, [e]), m = l.useCallback((d) => {
    const h = d.trim();
    o(h), Qn({ modelId: h || null });
    const f = at(e, s);
    f && Nt(f.id, h);
  }, [e, s]), u = l.useMemo(() => {
    const d = {}, h = s.trim(), f = r.trim();
    return h && (d.profileId = h), f && (d.model = f), d;
  }, [s, r]);
  return { profileId: s, model: r, onProfileIdChange: c, onModelChange: m, llmOpts: u, syncFromSettings: a };
}
function Jl({ profiles: e, profileId: s, model: n, onProfileIdChange: r, onModelChange: o, busy: a = false }) {
  return t.jsxs("section", { "aria-label": "\uD034\uC988 AI \uC81C\uACF5\uC790", className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-odp-borderSoft dark:bg-odp-surface", children: [t.jsxs("div", { className: "mb-3 flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-odp-fgStrong", children: [t.jsx(zi, { size: 14, className: "shrink-0 text-violet-600 dark:text-violet-400", "aria-hidden": true }), "AI \uC81C\uACF5\uC790"] }), t.jsx(fr, { profiles: e, profileId: s, model: n, onProfileIdChange: r, onModelChange: o, disabled: a })] });
}
const Hl = /* @__PURE__ */ new Set(["markdown", "json", "html", "svg", "raw"]), _s = "h-full min-h-[240px] w-full resize-none border-0 bg-transparent p-3 font-mono text-xs text-slate-800 outline-none dark:text-odp-fgStrong";
function Vl(e) {
  return Hl.has(String(e || ""));
}
function Kl({ payload: e, editMode: s, editContent: n, onEditContentChange: r }) {
  const o = e.currentFile.viewer, a = l.useMemo(() => `vault-preview-${e.currentFile.id.replace(/[^\w-]+/g, "-")}`, [e.currentFile.id]);
  return e.needsEncMdPassword ? t.jsx("div", { className: "p-4 text-sm text-slate-600 dark:text-odp-muted", children: "\uC554\uD638\uD654\uB41C \uB178\uD2B8\uC785\uB2C8\uB2E4. \uBBF8\uB9AC\uBCF4\uAE30\uB97C \uBCF4\uB824\uBA74 \u300C\uC774 \uBB38\uC11C \uC5F4\uAE30\u300D\uB85C \uD3B8\uC9D1\uAE30\uC5D0\uC11C \uC554\uD638\uB97C \uC785\uB825\uD558\uC138\uC694." }) : o === "image" && e.currentFile.objectUrl ? t.jsx("div", { className: "flex min-h-0 flex-1 items-center justify-center overflow-auto p-3", children: t.jsx("img", { src: e.currentFile.objectUrl, alt: e.currentFile.name, className: "max-h-full max-w-full object-contain" }) }) : o === "pdf" && e.currentFile.objectUrl ? t.jsx("iframe", { title: e.currentFile.name, src: e.currentFile.objectUrl, className: "h-full min-h-[240px] w-full border-0" }) : o === "audio" && e.currentFile.objectUrl ? t.jsx("div", { className: "p-4", children: t.jsx("audio", { controls: true, className: "w-full", src: e.currentFile.objectUrl, children: "\uC624\uB514\uC624\uB97C \uC7AC\uC0DD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }) }) : o === "video" && e.currentFile.objectUrl ? t.jsx("div", { className: "p-2", children: t.jsx("video", { controls: true, className: "max-h-full w-full", src: e.currentFile.objectUrl, children: "\uB3D9\uC601\uC0C1\uC744 \uC7AC\uC0DD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }) }) : o === "markdown" ? s ? t.jsx("textarea", { className: _s, value: n, onChange: (c) => r(c.target.value), spellCheck: false }) : t.jsx("div", { className: "markdown-content p-3", children: t.jsx(Te, { text: n, previewId: a }) }) : o === "html" || o === "svg" ? s ? t.jsx("textarea", { className: _s, value: n, onChange: (c) => r(c.target.value), spellCheck: false }) : t.jsx("iframe", { title: e.currentFile.name, srcDoc: n, sandbox: "", className: "h-full min-h-[240px] w-full border-0 bg-white" }) : s ? t.jsx("textarea", { className: _s, value: n, onChange: (c) => r(c.target.value), spellCheck: false }) : t.jsx("pre", { className: "overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-xs text-slate-800 dark:text-odp-fgStrong", children: n });
}
const Xl = ms, jt = "z-100001 max-w-[min(92vw,420px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function Zl({ path: e, onClose: s, loadDocument: n, onOpenDocument: r, onOpenInNewTab: o, embedded: a = false, width: c, resizeHandleProps: m, isResizing: u, resizeEdge: d = "right" }) {
  const [h, f] = l.useState(null), [x, v] = l.useState(true), [y, C] = l.useState(""), [P, j] = l.useState(false), [N, w] = l.useState(""), k = it({ storageKey: a ? void 0 : "vault-document-preview-panel-width", defaultWidth: 400, minWidth: 280, maxWidth: 640, edge: d === "left" ? "left" : "right" }), $ = c ?? k.width, S = m ?? k.handleProps, O = u ?? k.isResizing;
  l.useEffect(() => {
    let M = false, U;
    return v(true), C(""), j(false), (async () => {
      var _a2;
      try {
        const Y = await n(e);
        if (M) {
          (_a2 = Y == null ? void 0 : Y.revoke) == null ? void 0 : _a2.call(Y);
          return;
        }
        U = Y == null ? void 0 : Y.revoke, f(Y), w((Y == null ? void 0 : Y.content) ?? ""), Y || C("\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      } catch (Y) {
        M || (f(null), w(""), C(Y instanceof Error ? Y.message : "\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."));
      } finally {
        M || v(false);
      }
    })(), () => {
      M = true, U == null ? void 0 : U();
    };
  }, [e, n]);
  const L = l.useCallback(() => {
    j((M) => !M);
  }, []), _ = At(e), W = h ? Vl(h.currentFile.viewer) : false;
  return t.jsxs("aside", { className: `relative flex h-full flex-col overflow-hidden bg-white dark:bg-odp-surface ${a ? "min-w-0" : "shrink-0 border-r border-slate-200 dark:border-odp-borderSoft"}`, style: a ? void 0 : { width: $ }, "aria-label": "\uBB38\uC11C \uBBF8\uB9AC\uBCF4\uAE30", children: [t.jsx(Xl, { edge: d, handleProps: S, isResizing: O, visibleOnHover: true, label: "\uBBF8\uB9AC\uBCF4\uAE30 \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsx("div", { className: "flex items-center gap-1 border-b border-slate-200 px-2 py-2 dark:border-odp-borderSoft", children: t.jsxs(Et, { delayDuration: 250, skipDelayDuration: 0, children: [t.jsxs(Ie, { children: [t.jsx(Ee, { asChild: true, children: t.jsx("div", { className: "min-w-0 flex-1 truncate px-1 text-xs font-semibold text-slate-800 dark:text-odp-fgStrong", children: _ }) }), t.jsx(Ae, { children: t.jsxs(Me, { side: "bottom", sideOffset: 6, className: jt, children: [e, t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }), W ? t.jsxs(Ie, { children: [t.jsx(Ee, { asChild: true, children: t.jsx("button", { type: "button", className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": P ? "\uBBF8\uB9AC\uBCF4\uAE30 \uBAA8\uB4DC" : "\uD3B8\uC9D1 \uBAA8\uB4DC", onClick: L, children: P ? t.jsx(Ii, { size: 15 }) : t.jsx(ls, { size: 15 }) }) }), t.jsx(Ae, { children: t.jsxs(Me, { side: "bottom", sideOffset: 6, className: jt, children: [P ? "\uBBF8\uB9AC\uBCF4\uAE30 \uBAA8\uB4DC" : "\uD3B8\uC9D1 \uBAA8\uB4DC", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : null, o ? t.jsxs(Ie, { children: [t.jsx(Ee, { asChild: true, children: t.jsx("button", { type: "button", className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": "\uC0C8 \uD0ED\uC73C\uB85C \uC5F4\uAE30", onClick: () => o(e), children: t.jsx(Ei, { size: 15 }) }) }), t.jsx(Ae, { children: t.jsxs(Me, { side: "bottom", sideOffset: 6, className: jt, children: ["\uC0C8 \uD0ED\uC73C\uB85C \uC5F4\uAE30", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : null, r ? t.jsxs(Ie, { children: [t.jsx(Ee, { asChild: true, children: t.jsx("button", { type: "button", className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": "\uC774 \uBB38\uC11C \uC5F4\uAE30", onClick: () => r(e), children: t.jsx(Ai, { size: 15 }) }) }), t.jsx(Ae, { children: t.jsxs(Me, { side: "bottom", sideOffset: 6, className: jt, children: ["\uC774 \uBB38\uC11C \uC5F4\uAE30", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] }) : null, t.jsxs(Ie, { children: [t.jsx(Ee, { asChild: true, children: t.jsx("button", { type: "button", className: "shrink-0 rounded p-1.5 text-slate-600 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg", "aria-label": "\uBBF8\uB9AC\uBCF4\uAE30 \uB2EB\uAE30", onClick: s, children: t.jsx(qe, { size: 15 }) }) }), t.jsx(Ae, { children: t.jsxs(Me, { side: "bottom", sideOffset: 6, className: jt, children: ["\uB2EB\uAE30", t.jsx(Le, { className: "fill-white dark:fill-odp-surface" })] }) })] })] }) }), t.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto", children: x ? t.jsxs("div", { className: "flex h-full items-center justify-center gap-2 p-6 text-xs text-slate-500 dark:text-odp-muted", children: [t.jsx(ps, { size: 16, className: "animate-spin", "aria-hidden": true }), "\uBD88\uB7EC\uC624\uB294 \uC911\u2026"] }) : y ? t.jsx("div", { className: "p-4 text-sm text-rose-600 dark:text-rose-400", children: y }) : h ? t.jsx(Kl, { payload: h, editMode: P, editContent: N, onEditContentChange: w }) : null })] });
}
function Yl(e) {
  return Tr(e).map((s) => s.id === "generate" ? { ...s, label: "\uD30C\uC0DD \uBB38\uD56D \uC0DD\uC131" } : s);
}
function Tr(e) {
  const s = [];
  return e && s.push({ id: "rag", label: "\uADFC\uAC70 \uBC1C\uCDCC", status: "pending" }), s.push({ id: "analysis", label: "\uBB38\uD56D \uAD6C\uC870 \uBD84\uC11D", status: "pending" }, { id: "randomize", label: "\uBCC0\uC218 \uC0D8\uD50C\uB9C1", status: "pending" }, { id: "generate", label: "\uC720\uC0AC \uBB38\uD56D \uC0DD\uC131", status: "pending" }, { id: "finalize", label: "\uBB38\uD56D \uCD94\uAC00", status: "pending" }), s;
}
function ec() {
  return [{ id: "load_sources", label: "\uADFC\uAC70 \uBB38\uC11C \uB85C\uB4DC", status: "pending" }, { id: "summarize", label: "\uBB38\uC11C \uC694\uC57D", status: "pending" }, { id: "generate", label: "\uBB38\uD56D \uC0DD\uC131", status: "pending" }, { id: "finalize", label: "\uBB38\uD56D \uCD94\uAC00", status: "pending" }];
}
function ss(e, s = 72) {
  const n = String(e || "").replace(/\s+/g, " ").trim();
  return n.length <= s ? n : `${n.slice(0, s - 1)}\u2026`;
}
const _r = "s3haim_quiz_gen_queue_panel_size", tc = 280, sc = 180, Qs = 380, Ds = 320;
function Qr(e) {
  const s = Math.min(window.innerWidth * 0.92, 720), n = Math.min(window.innerHeight * 0.72, 640);
  return { width: Math.min(s, Math.max(tc, Math.round(e.width))), height: Math.min(n, Math.max(sc, Math.round(e.height))) };
}
function nc() {
  try {
    const e = typeof window < "u" ? window.localStorage.getItem(_r) : null;
    if (!e) return { width: Qs, height: Ds };
    const s = JSON.parse(e);
    return Qr({ width: Number(s.width) || Qs, height: Number(s.height) || Ds });
  } catch {
    return { width: Qs, height: Ds };
  }
}
function rc(e) {
  try {
    typeof window < "u" && window.localStorage.setItem(_r, JSON.stringify(e));
  } catch {
  }
}
function oc(e, s) {
  const n = e.steps.map((r) => {
    if (r.id !== s.step) return r;
    const o = { ...r, status: s.status };
    return s.detail !== void 0 && (o.detail = s.detail), s.error !== void 0 && (o.error = s.error), s.llmInstruction !== void 0 && (o.llmInstruction = s.llmInstruction), s.llmResponse !== void 0 && (o.llmResponse = s.llmResponse), s.systemPrompt !== void 0 && (o.systemPrompt = s.systemPrompt), s.status === "running" && delete o.error, o;
  });
  return { ...e, steps: n };
}
function qs() {
  return `quiz-gen-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function ic() {
  const [e, s] = l.useState([]), n = l.useRef(e);
  n.current = e;
  const [r, o] = l.useState(false), [a, c] = l.useState(() => nc()), m = l.useRef(false), u = l.useRef(false), d = l.useRef(false), h = l.useRef(0), f = l.useCallback((E) => {
    const B = Qr(E);
    c(B), rc(B);
  }, []), x = l.useCallback(() => {
    m.current = true;
  }, []), v = l.useCallback((E) => {
    u.current = E;
  }, []), y = l.useCallback((E) => {
    d.current = E;
  }, []), C = l.useCallback(() => u.current || d.current, []), P = l.useCallback(() => {
    m.current = true, o(true);
  }, []), j = l.useCallback(() => {
    m.current = false, u.current = false, d.current = false, o(false);
  }, []), N = l.useCallback(() => {
    o(true);
  }, []), w = l.useCallback((E) => n.current.find((B) => B.id === E) ?? null, []), k = l.useCallback((E) => {
    const B = qs(), Z = { id: B, kind: "similar", questionLabel: E.displayLabel, questionPreview: ss(E.preview), status: "running", steps: Tr(E.hasRag), createdAt: Date.now() };
    return s((J) => [Z, ...J]), N(), B;
  }, [N]), $ = l.useCallback((E) => {
    const B = qs(), Z = { id: B, kind: "derived", questionLabel: E.displayLabel, questionPreview: ss(E.preview), status: "running", steps: Yl(E.hasRag), createdAt: Date.now() };
    return s((J) => [Z, ...J]), N(), B;
  }, [N]), S = l.useCallback((E) => {
    var _a2;
    const B = qs(), Z = ((_a2 = E.topic) == null ? void 0 : _a2.trim()) || ss(E.preview) || "\uADFC\uAC70 \uAE30\uBC18 \uCD9C\uC81C", J = { id: B, kind: "source", questionPreview: ss(Z), status: "running", steps: ec(), createdAt: Date.now() };
    return s((oe) => [J, ...oe]), N(), B;
  }, [N]), O = l.useCallback((E, B) => {
    s((Z) => Z.map((J) => J.id === E ? oc(J, B) : J));
  }, []), L = l.useCallback((E, B) => {
    s((Z) => Z.map((J) => J.id === E ? { ...J, logPath: B } : J));
  }, []), _ = l.useCallback((E, B) => {
    s((Z) => Z.map((J) => J.id === E ? { ...J, resultQuestionId: B } : J));
  }, []), W = l.useCallback((E, B) => {
    s((Z) => Z.map((J) => J.id === E ? { ...J, status: "done", ...B ? { resultLabel: B } : {} } : J));
  }, []), M = l.useCallback((E, B) => {
    s((Z) => Z.map((J) => J.id === E ? { ...J, status: "error", error: B } : J));
  }, []), U = l.useCallback((E) => {
    s((B) => B.filter((Z) => Z.id !== E));
  }, []), Y = l.useCallback(() => {
    s((E) => E.filter((B) => B.status === "running"));
  }, []), je = e.some((E) => E.status === "running");
  return l.useEffect(() => {
    const E = e.filter((J) => J.status === "running").length, B = h.current > 0;
    if (h.current = E, !r || !B || E > 0 || m.current || C()) return;
    const Z = window.requestAnimationFrame(() => {
      m.current || C() || j();
    });
    return () => window.cancelAnimationFrame(Z);
  }, [j, C, e, r]), { jobs: e, panelOpen: r, panelSize: a, setPanelSize: f, openPanel: P, closePanel: j, setPanelOpen: o, markPanelUserEngaged: x, markPanelPointerEngaged: v, markPanelFocusEngaged: y, getJob: w, createSimilarJob: k, createDerivedJob: $, createSourceJob: S, updateJobStep: O, setJobLogPath: L, setJobResultQuestionId: _, completeJob: W, failJob: M, removeJob: U, clearFinishedJobs: Y, hasActiveJobs: je };
}
function Bs(e, s, n) {
  return !e || n == null ? s : s + Math.max(0, Date.now() - n);
}
function ac({ initialLog: e, hydrateKey: s = 0, onLogChange: n }) {
  const [r, o] = l.useState(() => Hs(e ?? $t())), [a, c] = l.useState(0), m = l.useRef(null), u = l.useRef(n), d = l.useRef(e);
  u.current = n, d.current = e;
  const h = wt(r), f = r.events.length > 0, x = Wo(r), v = yt(r);
  l.useEffect(() => {
    const w = Hs(d.current ?? $t());
    o(w), wt(w) ? m.current = Date.now() : m.current = null;
  }, [s]), l.useEffect(() => {
    if (!h) return;
    const w = window.setInterval(() => c((k) => k + 1), 200);
    return () => window.clearInterval(w);
  }, [h]);
  const y = l.useMemo(() => Bs(h, v, m.current), [h, v, a]), C = l.useCallback(() => {
    m.current = Date.now(), o((w) => {
      var _a2;
      const k = Ct(w, "start", 0);
      return (_a2 = u.current) == null ? void 0 : _a2.call(u, k), k;
    });
  }, []), P = l.useCallback(() => {
    o((w) => {
      var _a2;
      if (!wt(w)) return w;
      const k = Bs(true, yt(w), m.current);
      m.current = null;
      const $ = Ct(w, "pause", k);
      return (_a2 = u.current) == null ? void 0 : _a2.call(u, $), $;
    });
  }, []), j = l.useCallback(() => {
    o((w) => {
      var _a2;
      if (wt(w)) return w;
      const k = yt(w);
      m.current = Date.now();
      const $ = Ct(w, "resume", k);
      return (_a2 = u.current) == null ? void 0 : _a2.call(u, $), $;
    });
  }, []), N = l.useCallback(() => {
    o((w) => {
      var _a2;
      const k = wt(w) ? Bs(true, yt(w), m.current) : yt(w);
      m.current = null;
      const $ = Ct(w, "stop", k);
      return (_a2 = u.current) == null ? void 0 : _a2.call(u, $), $;
    });
  }, []);
  return { log: r, displayMs: y, running: h, started: f, examInProgress: x, start: C, pause: P, resume: j, stop: N };
}
const Xs = "data-quiz-q-track", lc = 0.12;
function cc({ scrollRootRef: e, questions: s, running: n, getElapsedMs: r, timeLog: o, onLogChange: a }) {
  const c = l.useRef(o), m = l.useRef(a), u = l.useRef(r), d = l.useRef(null), h = l.useRef(null), f = l.useRef(/* @__PURE__ */ new Map());
  c.current = o, m.current = a, u.current = r;
  const x = l.useCallback((P) => {
    const j = d.current;
    if (!j) return;
    d.current = null, h.current = null;
    const N = u.current(), w = Math.max(0, N - j.elapsedMs);
    if (w < Jo) return;
    const k = { questionId: j.questionId, displayLabel: j.displayLabel, at: j.at, endedAt: P ?? (/* @__PURE__ */ new Date()).toISOString(), durationMs: w }, $ = Ho(c.current, k);
    m.current($);
  }, []), v = l.useCallback((P, j) => {
    var _a2;
    ((_a2 = d.current) == null ? void 0 : _a2.questionId) !== P && (d.current = { questionId: P, displayLabel: j, at: (/* @__PURE__ */ new Date()).toISOString(), elapsedMs: u.current() }, h.current = P);
  }, []), y = l.useCallback(() => {
    let P = null, j = 0;
    for (const [N, w] of f.current) w > j && (j = w, P = N);
    return j >= lc ? P : null;
  }, []), C = l.useCallback((P) => {
    if (!n || P === h.current) return;
    if (x(), !P) {
      h.current = null;
      return;
    }
    const j = s.find((N) => N.id === P);
    j && v(j.id, j.displayLabel);
  }, [x, s, n, v]);
  l.useEffect(() => {
    if (!n) {
      x(), f.current.clear();
      return;
    }
    C(y());
  }, [n, x, C, y]), l.useEffect(() => {
    const P = e.current;
    if (!P || !n) return;
    const j = new Set(s.map((k) => k.id));
    f.current = new Map([...f.current.entries()].filter(([k]) => j.has(k)));
    const N = new IntersectionObserver((k) => {
      for (const $ of k) {
        const S = $.target.getAttribute(Xs);
        S && f.current.set(S, $.intersectionRatio);
      }
      C(y());
    }, { root: P, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
    return P.querySelectorAll(`[${Xs}]`).forEach((k) => N.observe(k)), () => {
      N.disconnect();
    };
  }, [e, s, n, C, y]);
}
const dc = Xs;
function uc(e) {
  const s = e.lastIndexOf(".");
  return s >= 0 ? e.slice(s + 1).toLowerCase() : "";
}
function St(e) {
  if (e) try {
    URL.revokeObjectURL(e);
  } catch {
  }
}
async function mc({ backend: e, storageType: s, path: n }) {
  var _a2, _b;
  if (!e || !n) return null;
  const r = At(n), o = uc(r), a = [...Vo], c = ["mp4", "webm", "ogv", "mov", "mkv"], m = ["m4a", "mp3", "wav", "ogg", "aac", "flac", "weba"];
  if (a.includes(o) && e.getObjectUrl) {
    let f = await e.getObjectUrl(n);
    if (o === "heic" || o === "heif") {
      const v = await ((_a2 = e.readBytes) == null ? void 0 : _a2.call(e, n));
      if (v == null ? void 0 : v.body) {
        St(f);
        const y = v.body instanceof Uint8Array ? v.body : new Uint8Array(v.body), C = y.buffer.slice(y.byteOffset, y.byteOffset + y.byteLength);
        f = await Ko(new Blob([C]), r);
      }
    }
    const x = await ((_b = e.head) == null ? void 0 : _b.call(e, n));
    return { currentFile: { type: s, id: n, name: r, viewer: "image", objectUrl: f, size: (x == null ? void 0 : x.contentLength) ?? null }, content: "", revoke: () => St(f) };
  }
  if (o === "pdf" && e.readBytes) {
    const { body: f, contentLength: x } = await e.readBytes(n), v = f instanceof Uint8Array ? f : new Uint8Array(f), y = v.buffer.slice(v.byteOffset, v.byteOffset + v.byteLength), C = new Blob([y], { type: "application/pdf" }), P = URL.createObjectURL(C);
    return { currentFile: { type: s, id: n, name: r, viewer: "pdf", objectUrl: P, size: x ?? null }, content: "", revoke: () => St(P) };
  }
  if (m.includes(o) && e.getObjectUrl) {
    const f = await e.getObjectUrl(n);
    return { currentFile: { type: s, id: n, name: r, viewer: "audio", objectUrl: f }, content: "", revoke: () => St(f) };
  }
  if (c.includes(o) && e.getObjectUrl) {
    const f = await e.getObjectUrl(n);
    return { currentFile: { type: s, id: n, name: r, viewer: "video", objectUrl: f }, content: "", revoke: () => St(f) };
  }
  if (!e.readText) return null;
  if (o === "json") {
    const { text: f, contentLength: x, lastModified: v } = await e.readText(n);
    let y = f;
    if (f.length <= 1e5) try {
      y = JSON.stringify(JSON.parse(f), null, 2);
    } catch {
      y = f;
    }
    return { currentFile: { type: s, id: n, name: r, viewer: "json", content: y, ...x != null ? { size: x } : {}, ...v != null ? { lastModified: v } : {} }, content: y };
  }
  if (o === "html" || o === "htm" || o === "svg") {
    const { text: f, contentLength: x, lastModified: v } = await e.readText(n);
    return { currentFile: { type: s, id: n, name: r, viewer: o === "svg" ? "svg" : "html", content: f, ...x != null ? { size: x } : {}, ...v != null ? { lastModified: v } : {} }, content: f };
  }
  if (o === "md" || o === "markdown" || o === "" || Vt(n) || Vt(r)) {
    const { text: f, contentLength: x, lastModified: v } = await e.readText(n);
    if (Vt(n) || Vt(r)) {
      const y = await Xo(n, f);
      return y.status === "need-password" ? { currentFile: { type: s, id: n, name: r, viewer: "markdown", content: "", ...x != null ? { size: x } : {}, encMd: true, ...v != null ? { lastModified: v } : {} }, content: "", needsEncMdPassword: true } : { currentFile: { type: s, id: n, name: r, viewer: "markdown", content: y.text, ...x != null ? { size: x } : {}, encMd: true, ...v != null ? { lastModified: v } : {} }, content: y.text };
    }
    return { currentFile: { type: s, id: n, name: r, viewer: "markdown", content: f, ...x != null ? { size: x } : {}, ...v != null ? { lastModified: v } : {} }, content: f };
  }
  const { text: u, contentLength: d, lastModified: h } = await e.readText(n);
  return { currentFile: { type: s, id: n, name: r, viewer: "raw", content: u, ...d != null ? { size: d } : {}, ...h != null ? { lastModified: h } : {} }, content: u };
}
async function fc(e, s) {
  const n = String(e || "").trim();
  if (!n) return null;
  const { storageType: r, localTree: o, webdavTree: a, s3Tree: c, localRootHandle: m } = s;
  let u = null;
  return r === ns ? u = rs(o, n) || os(o, n) || (m ? await Zo(m, n) : null) : r === is ? u = rs(a, n) || os(a, n) : u = rs(c, n) || os(c, n), (u == null ? void 0 : u.type) !== "file" ? { type: "file", path: n, name: At(n) } : { type: "file", path: String(u.path || n), name: String(u.name || At(n)), ...u.lastModified != null ? { lastModified: u.lastModified } : {} };
}
const pc = 320, xc = 288, hc = 400, lr = ms, gc = ["ungraded", "correct", "partial", "wrong"], bc = { ungraded: "bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:text-slate-200 dark:ring-slate-600", correct: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800", partial: "bg-amber-50 text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800", wrong: "bg-rose-50 text-rose-800 ring-1 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-800" }, kc = "bg-slate-100 text-slate-400 ring-1 ring-transparent dark:bg-odp-bgSoft dark:text-odp-muted", wc = 2e4, Dr = "s3haim_quiz_source_remove_confirm", cr = "flex h-6 max-h-6 min-w-0 items-center overflow-hidden", yc = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-violet-400", e ? "border-violet-500 bg-violet-500 shadow-sm dark:border-violet-500 dark:bg-violet-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), vc = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]";
function jc() {
  try {
    return localStorage.getItem(Dr) === "true";
  } catch {
    return false;
  }
}
function Sc(e) {
  try {
    localStorage.setItem(Dr, String(e));
  } catch {
  }
}
const Nc = "z-100010 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", dr = "flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-gray-800 outline-none hover:bg-gray-100 focus:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg dark:focus:bg-odp-focusBg";
function _c({ content: e, onChange: s, onSave: n, currentFile: r, onResolveWikiImageUrl: o, llmProviderProfiles: a = [], isActiveFile: c = true, registerToolbar: m, registerFileManagement: u }) {
  const { showToast: d } = Yo(), { showAlert: h } = ei(), f = ti(), x = ic(), { storageMode: v, s3Tree: y, localTree: C, webdavTree: P, localRootHandle: j, getBackendForType: N, loadLocalFolderChildren: w, loadWebdavFolderChildren: k } = si(), { openAdvancedSearchFile: $, selectFileRaw: S } = ni(), O = l.useCallback((i) => {
    f == null ? void 0 : f.openAssist(), d({ message: i || "AI \uB3C4\uC6B0\uBBF8\uC5D0\uC11C \uBAA8\uB378\uC744 \uB85C\uB4DC\xB7\uC120\uD0DD\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.", durationMs: 3500 });
  }, [f, d]), L = Wl(a), _ = l.useCallback(async (i) => {
    const p = await Sl(a, { ...L.llmOpts, ...i });
    return p.ready ? true : (O(p.message), false);
  }, [a, O, L.llmOpts]), W = l.useCallback((i, p, g) => {
    const b = (p instanceof Error ? p.message : "") || g;
    if (Nl(b)) {
      O(b);
      return;
    }
    if (b.length >= 48 || b.includes(`
`)) {
      h({ title: i, message: b });
      return;
    }
    d({ message: b, durationMs: 4e3 });
  }, [O, h, d]), M = l.useMemo(() => v === ns ? C : v === is ? P : y, [v, C, P, y]), U = v === ns ? "local" : v === is ? "webdav" : "s3", Y = U, je = l.useCallback(async (i) => {
    const p = N(U);
    return mc({ backend: p, storageType: Y, path: i });
  }, [N, U, Y]), E = l.useCallback((i) => {
    $(i);
  }, [$]), B = l.useCallback(async (i) => {
    const p = await fc(i, { storageType: Y, localTree: C, webdavTree: P, s3Tree: y, localRootHandle: j });
    if (p) {
      await S(U, p, { background: true });
      return;
    }
    $(i);
  }, [Y, C, P, y, j, S, U, $]), Z = l.useCallback((i) => {
    ht(true), gt(i);
  }, []), J = l.useCallback(() => {
    ht(false), gt(null);
  }, []), oe = l.useCallback(async (i) => {
    const p = N(U);
    if (!(p == null ? void 0 : p.readText)) return null;
    const { text: g } = await p.readText(i);
    return typeof g == "string" ? g : null;
  }, [N, U]), le = l.useCallback(async (i, p) => {
    const g = r == null ? void 0 : r.id;
    if (!g) return;
    await new Promise((A) => {
      window.setTimeout(A, 0);
    });
    const b = x.getJob(i);
    if (!b) return;
    const I = N(U);
    if (I == null ? void 0 : I.writeText) try {
      const A = await yl({ quizFilePath: g, logKey: p, job: b, writeText: (G, F) => I.writeText(G, F, "text/markdown; charset=utf-8") });
      x.setJobLogPath(i, A);
    } catch {
    }
  }, [r == null ? void 0 : r.id, x, N, U]), mt = l.useCallback((i, p, g) => {
    x.updateJobStep(i, g), le(i, p);
  }, [x, le]), ft = l.useCallback(async (i) => {
    v === ns ? await (w == null ? void 0 : w(i)) : v === is && await (k == null ? void 0 : k(i));
  }, [v, w, k]), [z, pt] = l.useState(() => ot(e)), R = l.useRef(e), H = l.useRef(false), ue = l.useRef(false), he = l.useRef(null), ce = l.useRef(z);
  ce.current = z;
  const [ee, He] = l.useState({}), [de, Be] = l.useState({}), [qr, ze] = l.useState({}), [ie, gs] = l.useState({}), [Fe, ge] = l.useState({}), et = l.useRef(Fe);
  et.current = Fe;
  const [Lt, st] = l.useState({}), [ne, Ue] = l.useState(null), [on, Ge] = l.useState(""), [se, tt] = l.useState({}), [be, Ot] = l.useState(false), [bs, xt] = l.useState("all"), [ks, an] = l.useState(false), [ln, Br] = l.useState({ ungraded: true, correct: true, partial: true, wrong: true }), [Rt, ht] = l.useState(false), [cn, gt] = l.useState(null), { width: ws, handleProps: Fr, isResizing: Ur } = it({ storageKey: "quiz-source-preview-dock-width", defaultWidth: hc, minWidth: 280, maxWidth: 640, edge: "left" }), { width: dn, handleProps: Gr, isResizing: un } = it({ storageKey: "quiz-sources-dock-width", defaultWidth: pc, minWidth: 240, maxWidth: 520, edge: "right" }), { width: mn, handleProps: Wr, isResizing: fn } = it({ storageKey: "quiz-toc-dock-width", defaultWidth: xc, minWidth: 220, maxWidth: 480, edge: "right" }), [Jr, ys] = l.useState(false), [Tt, Hr] = l.useState(jc), [bt, vs] = l.useState(null), [Oe, me] = l.useState(null), [pn, _t] = l.useState(false), [fe, Qt] = l.useState(null), [Ve, js] = l.useState(null), [xn, Ss] = l.useState(false), [We, Dt] = l.useState(null), [Ns, Vr] = l.useState(""), [Kr, qt] = l.useState({}), Se = l.useRef(null), Bt = l.useRef(null), hn = l.useRef(null), gn = l.useRef(null), [Xr, bn] = l.useState(true), [Zr, kn] = l.useState(true), [ke, kt] = l.useState(() => $t()), [Yr, Cs] = l.useState(0), ae = ac({ initialLog: ke, hydrateKey: Yr, onLogChange: kt }), wn = l.useRef(() => 0);
  wn.current = () => ae.displayMs, cc({ scrollRootRef: Bt, questions: z.questions.map((i) => ({ id: i.id, displayLabel: i.displayLabel })), running: ae.running, getElapsedMs: () => wn.current(), timeLog: ke, onLogChange: kt });
  const Ke = l.useCallback(() => Rs({ questions: ce.current.questions, userAnswers: ee, gradedQuestions: de, subjectiveGrades: se, isSubmitted: be, ...Os(ke) ? {} : { timeLog: ke }, wrongChoiceExplanations: Js(Fe), ...vt(ie) ? {} : { questionMemos: ie } }), [ee, de, se, be, ke, Fe, ie]), Ft = l.useCallback(() => {
    if (!ue.current || !c) return false;
    const i = Ke();
    if (!rl(i)) return false;
    const p = ot(R.current).session;
    if (!sr(i, p)) return true;
    const g = typeof (r == null ? void 0 : r.content) == "string" ? r.content : "";
    if (!g) return true;
    const b = ot(g).session;
    return !sr(i, b);
  }, [Ke, r == null ? void 0 : r.content, c]), Ut = l.useCallback((i) => {
    const p = Hs(i == null ? void 0 : i.timeLog);
    if (kt(p), Cs((b) => b + 1), !i || Zs(i)) {
      He({}), Be({}), ze({}), ge({}), st({}), Ue(null), Ge(""), gs({}), tt({}), Ot(false);
      return;
    }
    He({ ...i.userAnswers }), Be({ ...i.gradedQuestions }), tt({ ...i.subjectiveGrades }), Ot(i.isSubmitted), ge(ri(i.wrongChoiceExplanations)), gs({ ...i.questionMemos ?? {} }), st({}), Ue(null), Ge("");
    const g = {};
    for (const [b, I] of Object.entries(i.gradedQuestions)) I && (g[b] = true);
    ze(g);
  }, []), pe = l.useCallback((i, p) => {
    const g = pr(i.config, i.questions, p);
    H.current = true, R.current = g, s(g);
  }, [s]), Gt = l.useCallback(() => {
    if (!ue.current) return;
    he.current != null && (clearTimeout(he.current), he.current = null);
    const i = Ke();
    pe(ce.current, i);
  }, [Ke, pe]), nt = l.useCallback(async (i) => {
    if (!(!Pe().autoSaveOnAiGenerate || typeof n != "function")) {
      if (i) {
        const p = Rs({ questions: ce.current.questions, userAnswers: ee, gradedQuestions: de, subjectiveGrades: se, isSubmitted: be, ...Os(ke) ? {} : { timeLog: ke }, wrongChoiceExplanations: Js(i), ...vt(ie) ? {} : { questionMemos: ie } });
        pe(ce.current, p);
      } else Gt();
      await n(null, { skipCoverChangeCheck: true, skipSuffixCheck: true, contentOverride: R.current });
    }
  }, [Gt, de, be, n, pe, se, ke, ee, ie]);
  l.useEffect(() => {
    if (e === R.current) return;
    if (R.current = e, H.current) {
      H.current = false;
      return;
    }
    const i = ot(e);
    pt(i), Ut(i.session);
  }, [e, Ut]), l.useEffect(() => {
    const i = ot(R.current);
    Ut(i.session), ue.current = true;
  }, [Ut]), l.useEffect(() => {
    if (!ue.current) return;
    const i = Ke();
    return he.current != null && clearTimeout(he.current), he.current = setTimeout(() => {
      he.current = null, pe(ce.current, i);
    }, wc), () => {
      he.current != null && (clearTimeout(he.current), he.current = null);
    };
  }, [ee, de, se, be, ke, Fe, ie, Ke, pe]);
  const yn = l.useCallback(async () => {
    const i = tl(ce.current, { questions: ce.current.questions, userAnswers: ee, gradedQuestions: de, isSubmitted: be, subjectiveGrades: se });
    if (!i) {
      d({ message: "\uCD94\uCD9C\uD560 \uD2C0\uB9B0 \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uCC44\uC810 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.", durationMs: 3500 });
      return;
    }
    const p = r == null ? void 0 : r.id;
    if (!p) return;
    const g = N(U);
    if (!(g == null ? void 0 : g.writeText)) {
      d({ message: "\uC800\uC7A5\uC18C\uC5D0 \uC4F8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.", durationMs: 3e3 });
      return;
    }
    try {
      const b = await nl(p, async (I) => {
        if (!g.head) return false;
        try {
          return await g.head(I), true;
        } catch {
          return false;
        }
      });
      await g.writeText(b, i.markdown, "text/markdown; charset=utf-8"), await $(b), d({ message: `\uD2C0\uB9B0 \uBB38\uC81C ${i.questions.length}\uAC1C\uB97C \uC0C8 \uD034\uC988\uB85C \uCD94\uCD9C\uD588\uC2B5\uB2C8\uB2E4.`, durationMs: 4e3 });
    } catch (b) {
      W("\uD2C0\uB9B0\uBB38\uC81C \uCD94\uCD9C", b, "\uD30C\uC77C\uC744 \uC0DD\uC131\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    }
  }, [ee, de, be, se, r == null ? void 0 : r.id, N, U, $, d, W]);
  l.useEffect(() => {
    if (!c) return;
    const i = (p) => {
      Ft() && (p.preventDefault(), p.returnValue = "");
    };
    return window.addEventListener("beforeunload", i), () => window.removeEventListener("beforeunload", i);
  }, [c, Ft]);
  const xe = l.useCallback((i) => {
    const p = { ...i, config: Hn(i.config, i.questions) };
    ce.current = p, pt(p);
    const g = Ke();
    pe(p, g);
  }, [Ke, pe]), vn = l.useCallback(() => {
    const i = ce.current, p = Ul({ questions: i.questions, userAnswers: ee, wrongExps: Fe, wrongExpFocus: Lt });
    if (p.shuffledQuestionCount <= 0) {
      d({ message: "\uC120\uD0DD\uC9C0\uAC00 2\uAC1C \uC774\uC0C1\uC778 \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", durationMs: 2800 });
      return;
    }
    He(p.userAnswers), ge(p.wrongExps), st(p.wrongExpFocus), Ue((I) => {
      if (!I) return null;
      const A = Gl(I.questionId, I.option, p.optionMapsByQuestionId);
      return A == null ? null : { ...I, option: A };
    });
    const g = { ...i, questions: p.questions, config: Hn(i.config, p.questions) };
    pt(g);
    const b = Rs({ questions: g.questions, userAnswers: p.userAnswers, gradedQuestions: de, subjectiveGrades: se, isSubmitted: be, ...Os(ke) ? {} : { timeLog: ke }, wrongChoiceExplanations: p.wrongChoiceExplanations, ...vt(ie) ? {} : { questionMemos: ie } });
    pe(g, b), d({ message: `${p.shuffledQuestionCount}\uAC1C \uBB38\uD56D\uC758 \uC120\uD0DD\uC9C0 \uC21C\uC11C\uB97C \uBCC0\uACBD\uD588\uC2B5\uB2C8\uB2E4.`, durationMs: 3200 });
  }, [ee, Fe, Lt, de, se, be, ke, ie, pe, d]);
  l.useEffect(() => {
    if (!(!c || !u)) return u({ extractWrongQuestions: yn, shuffleChoiceOptions: vn, hasUnsavedProgress: Ft, flushBeforeSave: Gt }), () => u(null);
  }, [c, u, yn, vn, Ft, Gt]);
  const $s = l.useCallback((i) => {
    const p = ce.current;
    xe({ ...p, config: oi(p.config, i) }), gt((g) => g === i ? null : g);
  }, [xe]), eo = l.useCallback((i, p) => {
    const g = ce.current;
    xe({ ...g, config: ii(g.config, i, p) });
  }, [xe]), to = l.useCallback((i) => {
    if (Tt) {
      vs(i);
      return;
    }
    $s(i);
  }, [Tt, $s]), { setQuizSourceDropActive: Ps, setQuizSourceDropHost: Wt, handleRegisterQuizSourceDrop: zs } = ai(), jn = l.useRef(null), Sn = l.useRef(null), Nn = l.useRef(null), Cn = l.useRef(We);
  Cn.current = We;
  const Jt = l.useCallback(() => {
    Wt(jn.current ?? Sn.current);
  }, [Wt]), so = l.useCallback((i) => {
    jn.current = i, Jt();
  }, [Jt]), no = l.useCallback((i) => {
    Sn.current = i, Jt();
  }, [Jt]);
  l.useEffect(() => () => Wt(null), [Wt]);
  const $n = l.useCallback((i, p) => i !== U ? null : rs(M, p) || os(M, p), [U, M]), Pn = (r == null ? void 0 : r.id) || null, zn = l.useCallback((i) => {
    var _a2;
    if (!i.length) return;
    const p = Cn.current;
    if (p == null ? void 0 : p.onDone) {
      const I = new Set(p.paths);
      for (const A of i) I.add(A);
      p.onDone([...I].sort((A, G) => A.localeCompare(G))), d({ message: `\uADFC\uAC70 \uBB38\uC11C ${i.length}\uAC1C \uCD94\uAC00`, durationMs: 2500 });
      return;
    }
    if (p) {
      (_a2 = Nn.current) == null ? void 0 : _a2.call(Nn, i), d({ message: `\uADFC\uAC70 \uBB38\uC11C ${i.length}\uAC1C \uCD94\uAC00`, durationMs: 2500 });
      return;
    }
    const g = ce.current, b = [.../* @__PURE__ */ new Set([...g.config.sourcePaths, ...i])].sort((I, A) => I.localeCompare(A));
    xe({ ...g, config: { ...g.config, sourcePaths: b } }), d({ message: `\uADFC\uAC70 \uBB38\uC11C ${i.length}\uAC1C \uCD94\uAC00`, durationMs: 2500 });
  }, [xe, d]), In = l.useCallback((i) => {
    const p = li(i, $n, { excludePath: Pn });
    p.length && zn(p);
  }, [Pn, $n, zn]);
  l.useEffect(() => (zs(In), () => zs(null)), [zs, In]), l.useEffect(() => (Ps(c && (!!We || Rt)), () => Ps(false)), [c, We, Rt, Ps]);
  const V = l.useMemo(() => al({ questions: z.questions, userAnswers: ee, gradedQuestions: de, isSubmitted: be, subjectiveGrades: se }), [z.questions, ee, de, be, se]), ro = l.useMemo(() => Sr(z.questions, z.config.choiceCount), [z.questions, z.config.choiceCount]), rt = l.useMemo(() => ci(z.config), [z.config.sourcePaths, z.config.disabledSourcePaths]), Ht = l.useMemo(() => ne && z.questions.find((i) => i.id === ne.questionId) || null, [ne, z.questions]), oo = l.useCallback((i, p, g) => {
    Ge(""), Ue({ questionId: i, option: p, mode: g });
  }, []);
  l.useEffect(() => {
    if (!c || V.total <= 0) {
      bn(true);
      return;
    }
    const i = Bt.current, p = hn.current;
    if (!i || !p) return;
    const g = new IntersectionObserver(([b]) => {
      b && bn(b.isIntersecting);
    }, { root: i, threshold: 0.12 });
    return g.observe(p), () => g.disconnect();
  }, [c, V.total, z.questions.length]), l.useEffect(() => {
    if (!c || V.total <= 0) {
      kn(true);
      return;
    }
    const i = Bt.current, p = gn.current;
    if (!i || !p) return;
    const g = new IntersectionObserver(([b]) => {
      b && kn(b.isIntersecting);
    }, { root: i, threshold: 0.12 });
    return g.observe(p), () => g.disconnect();
  }, [c, V.total, z.questions.length]);
  const Ne = a, En = l.useCallback(() => {
    He({}), Be({}), ze({}), ge({}), st({}), Ue(null), Ge(""), tt({}), Ot(false), kt($t()), Cs((i) => i + 1), pe(ce.current, zt({ ...vt(ie) ? {} : { questionMemos: ie } }));
  }, [pe, ie]), io = l.useCallback(() => {
    He({}), Be({}), ze({}), ge({}), st({}), Ue(null), Ge(""), tt({}), Ot(false);
    const i = Ct($t(), "start", 0);
    kt(i), Cs((p) => p + 1), pe(ce.current, zt({ timeLog: i, ...vt(ie) ? {} : { questionMemos: ie } }));
  }, [pe, ie]), An = l.useMemo(() => z.questions.some((i) => us(ee[i.id])), [z.questions, ee]), Mn = l.useCallback(() => {
    if (An) {
      ys(true);
      return;
    }
    ae.start();
  }, [An, ae]);
  l.useEffect(() => {
    if (!(!c || !m)) return m(t.jsx(Ia, { stopwatch: ae, onRequestStart: Mn })), () => m(null);
  }, [c, m, ae.displayMs, ae.running, ae.started, ae.start, ae.pause, ae.resume, ae.stop, Mn]);
  const ao = (i) => {
    Be((p) => {
      const g = { ...p };
      return delete g[i.id], g;
    }), tt((p) => {
      const g = { ...p };
      return delete g[i.id], g;
    }), ze((p) => {
      const g = { ...p };
      return delete g[i.id], g;
    }), ge((p) => {
      const g = { ...p };
      for (const b of Object.keys(g)) (b === i.id || b.startsWith(`${i.id}_`)) && delete g[b];
      return g;
    });
  }, lo = (i, p) => {
    de[i] || He((g) => ({ ...g, [i]: p }));
  }, co = (i) => {
    ae.examInProgress || (Be((p) => ({ ...p, [i.id]: true })), ze((p) => ({ ...p, [i.id]: true })));
  }, uo = async (i) => {
    var _a2;
    if (ae.examInProgress) return;
    const p = String(ee[i.id] || "").trim();
    if (!p) {
      d({ message: "\uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694.", durationMs: 2200 });
      return;
    }
    if (!await _()) return;
    me(i.id), (_a2 = Se.current) == null ? void 0 : _a2.abort();
    const g = new AbortController();
    Se.current = g;
    try {
      const b = await ir({ profiles: Ne, question: i, userAnswer: p, signal: g.signal });
      tt((I) => ({ ...I, [i.id]: b })), Be((I) => ({ ...I, [i.id]: true })), ze((I) => ({ ...I, [i.id]: true })), d({ message: "\uC8FC\uAD00\uC2DD \uCC44\uC810 \uC644\uB8CC", durationMs: 2200 });
    } catch (b) {
      W("\uCC44\uC810 \uC2E4\uD328", b, "\uCC44\uC810 \uC2E4\uD328");
    } finally {
      me(null);
    }
  }, mo = async () => {
    ae.examInProgress && ae.stop();
    const i = z.questions.filter((b) => !(!us(ee[b.id]) || de[b.id] || b.kind === "subjective" && se[b.id]));
    if (i.length === 0) {
      d({ message: "\uCC44\uC810\uD560 \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.", durationMs: 2200 });
      return;
    }
    const p = i.filter((b) => b.kind === "choice"), g = i.filter((b) => b.kind === "subjective");
    if (p.length > 0 && (Be((b) => {
      const I = { ...b };
      for (const A of p) I[A.id] = true;
      return I;
    }), ze((b) => {
      const I = { ...b };
      for (const A of p) I[A.id] = true;
      return I;
    })), g.length > 0) {
      if (!await _()) return;
      for (const b of g) {
        const I = String(ee[b.id] || "").trim();
        if (I) try {
          const A = await ir({ profiles: Ne, question: b, userAnswer: I });
          tt((G) => ({ ...G, [b.id]: A })), Be((G) => ({ ...G, [b.id]: true })), ze((G) => ({ ...G, [b.id]: true }));
        } catch {
        }
      }
    }
    d({ message: `${i.length}\uAC1C \uD56D\uBAA9 \uCC44\uC810 \uC644\uB8CC`, durationMs: 2200 });
  }, fo = async (i) => {
    if (!await _()) return;
    me(`sim-${i.id}`);
    const p = Xt(z.config, i), g = x.createSimilarJob({ displayLabel: String(i.displayLabel || i.id), preview: i.question, hasRag: p.length > 0 }), b = g;
    try {
      const I = await zl({ profiles: Ne, question: i, config: z.config, sourcePaths: p, readText: oe, onStep: (X) => mt(g, b, X) }), A = String(i.displayLabel || i.id).split("-\uC720\uC0AC")[0] || "1";
      let G = 0;
      const F = new RegExp(`^${A.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-\uC720\uC0AC(\\d+)$`);
      for (const X of z.questions) {
        const te = String(X.displayLabel).match(F);
        (te == null ? void 0 : te[1]) && (G = Math.max(G, Number.parseInt(te[1], 10)));
      }
      const D = `${A}-\uC720\uC0AC${G + 1}`, T = { ...I, id: `gen-${Date.now()}`, displayLabel: D, isGenerated: true, similarOf: { id: i.id, displayLabel: String(i.displayLabel || i.id) }, ...p.length ? { sourcePaths: p } : {} };
      x.updateJobStep(g, { step: "finalize", status: "running", detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026" }), le(g, T.id);
      const q = z.questions.findIndex((X) => X.id === i.id), K = [...z.questions];
      K.splice(q + 1, 0, T), xt("all"), qt((X) => ({ ...X, [T.id]: true })), xe({ ...z, questions: K }), x.setJobResultQuestionId(g, T.id), x.updateJobStep(g, { step: "finalize", status: "done", detail: D, llmResponse: JSON.stringify(T, null, 2) }), x.completeJob(g, D), le(g, T.id), d({ message: `${D} \uC720\uC0AC\uBB38\uC81C \uCD94\uAC00`, durationMs: 2500 }), await nt(), window.setTimeout(() => {
        var _a2;
        (_a2 = document.getElementById(`q-card-${T.id}`)) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 80);
    } catch (I) {
      const A = (I instanceof Error ? I.message : "") || "\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
      x.failJob(g, A), le(g, b), W("\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", I, "\uC720\uC0AC\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
    } finally {
      me(null);
    }
  }, po = async (i, p) => {
    var _a2;
    const g = L.llmOpts;
    if (!await _(g)) return;
    const b = (p === "point" || p === "both") && dt(i.point || ""), I = (p === "explanation" || p === "both") && ut(i.explanation || "");
    if (!b && !I) {
      d({ message: "\uC774\uBBF8 \uC811\uADFC Point\uC640 \uD574\uC124\uC774 \uC788\uC2B5\uB2C8\uB2E4.", durationMs: 2200 });
      return;
    }
    const A = `sections-${i.id}`;
    me(A), (_a2 = Se.current) == null ? void 0 : _a2.abort();
    const G = new AbortController();
    Se.current = G;
    try {
      const F = Xt(z.config, i), D = await Al({ profiles: Ne, question: i, missingPoint: b, missingExplanation: I, sourcePaths: F, readText: oe, ...g, signal: G.signal });
      if (!D.point && !D.explanation) {
        d({ message: "\uC0DD\uC131\uB41C \uB0B4\uC6A9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.", durationMs: 2500 });
        return;
      }
      const T = z.questions.map((K) => K.id !== i.id ? K : { ...K, ...D.point ? { point: D.point } : {}, ...D.explanation ? { explanation: D.explanation } : {} });
      xe({ ...z, questions: T }), ze((K) => ({ ...K, [i.id]: true }));
      const q = [];
      D.point && q.push("\uC811\uADFC Point"), D.explanation && q.push("\uD574\uC124"), d({ message: `${q.join("\xB7")} \uC0DD\uC131 \uC644\uB8CC`, durationMs: 2200 }), await nt();
    } catch (F) {
      if (G.signal.aborted) return;
      W("\uC811\uADFC Point\xB7\uD574\uC124 \uC0DD\uC131 \uC2E4\uD328", F, "\uC0DD\uC131 \uC2E4\uD328");
    } finally {
      me(null);
    }
  }, xo = async (i, p) => {
    if (!await _()) return;
    me(`derived-${i.id}`);
    const g = Xt(z.config, i), b = x.createDerivedJob({ displayLabel: String(i.displayLabel || i.id), preview: i.question, hasRag: g.length > 0 }), I = b;
    try {
      const A = await Il({ profiles: Ne, question: i, config: z.config, target: p, sourcePaths: g, readText: oe, onStep: (q) => mt(b, I, q) }), G = pl(z.questions, String(i.displayLabel || i.id)), F = { ...A, id: `gen-${Date.now()}`, displayLabel: G, isGenerated: true, similarOf: { id: i.id, displayLabel: String(i.displayLabel || i.id) }, ...g.length ? { sourcePaths: g } : {} };
      x.updateJobStep(b, { step: "finalize", status: "running", detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026" }), le(b, F.id);
      const D = z.questions.findIndex((q) => q.id === i.id), T = [...z.questions];
      T.splice(D + 1, 0, F), xt("all"), qt((q) => ({ ...q, [F.id]: true })), xe({ ...z, questions: T }), x.setJobResultQuestionId(b, F.id), x.updateJobStep(b, { step: "finalize", status: "done", detail: G, llmResponse: JSON.stringify(F, null, 2) }), x.completeJob(b, G), le(b, F.id), js(null), d({ message: `${G} \uD30C\uC0DD\uBB38\uC81C \uCD94\uAC00`, durationMs: 2500 }), await nt(), window.setTimeout(() => {
        var _a2;
        (_a2 = document.getElementById(`q-card-${F.id}`)) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 80);
    } catch (A) {
      const G = (A instanceof Error ? A.message : "") || "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
      x.failJob(b, G), le(b, I), W("\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", A, "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
    } finally {
      me(null);
    }
  }, ho = l.useCallback((i, p) => {
    var _a2;
    const g = Lt[i.id], b = ((_a2 = i.options) == null ? void 0 : _a2.length) || 0;
    return g != null && g >= 1 && g <= b ? g : p != null && p >= 1 && p <= b ? p : 1;
  }, [Lt]), go = async (i, p, g, b = "create") => {
    var _a2, _b;
    const I = p === i.answer, A = L.llmOpts;
    if (b === "followup") {
      const q = String(g || "").trim();
      if (!q) {
        d({ message: "\uCD94\uAC00 \uC9C8\uBB38\uC744 \uC785\uB825\uD558\uC138\uC694.", durationMs: 2200 });
        return;
      }
      if (!await _(A)) return;
      const K = Ze(i.id, p), X = String(et.current[K] || "").trim();
      if (!X) {
        d({ message: "\uBA3C\uC800 \uBD84\uC11D\uC744 \uC0DD\uC131\uD558\uC138\uC694.", durationMs: 2200 });
        return;
      }
      me(K), (_a2 = Se.current) == null ? void 0 : _a2.abort();
      const te = new AbortController();
      Se.current = te;
      const we = q.slice(0, 60);
      try {
        const Ce = await Pl({ profiles: Ne, question: i, selectedOption: p, existingAnalysis: X, userQuestion: q, ...A, signal: te.signal, onChunk: (jo) => {
          const So = ui(X, jo);
          ge((No) => ({ ...No, [K]: So }));
        } }), Es = mi(Ce, we), vo = fi(X, Es, we), As = { ...et.current, [K]: vo };
        et.current = As, ge(As), Ue(null), Ge(""), await nt(As);
      } catch (Ce) {
        if (te.signal.aborted) return;
        ge((Es) => ({ ...Es, [K]: X })), W("\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0 \uC2E4\uD328", Ce, "\uCD94\uAC00 \uC9C8\uBB38 \uB2F5\uBCC0 \uC2E4\uD328");
      } finally {
        me(null);
      }
      return;
    }
    const G = pi(g, I);
    if (!await _(A)) return;
    const F = Ze(i.id, p), D = b === "regenerate" ? String(et.current[F] || "").trim() : "";
    me(F), b !== "regenerate" && ge((q) => ({ ...q, [F]: "" })), (_b = Se.current) == null ? void 0 : _b.abort();
    const T = new AbortController();
    Se.current = T;
    try {
      const q = await $l({ profiles: Ne, question: i, selectedOption: p, userInstructions: G, ...A, signal: T.signal, onChunk: (te) => {
        const we = b === "regenerate" ? xi(D, te) : te;
        ge((Ce) => ({ ...Ce, [F]: we }));
      } }), K = b === "regenerate" ? hi(D, q) : q, X = { ...et.current, [F]: K };
      et.current = X, ge(X), Ue(null), Ge(""), await nt(X);
    } catch (q) {
      if (T.signal.aborted) return;
      ge((K) => {
        const X = { ...K };
        return b === "regenerate" && D ? X[F] = D : String(X[F] || "").trim() || delete X[F], X;
      }), W("\uC624\uB2F5 \uD574\uC124 \uC2E4\uD328", q, "\uC624\uB2F5 \uD574\uC124 \uC2E4\uD328");
    } finally {
      me(null);
    }
  }, bo = async () => {
    var _a2, _b, _c2;
    const i = z.config.sourcePaths.length, p = mr(z.config);
    if (!i) {
      ht(true), d({ message: "\uD30C\uC77C \uADFC\uAC70 \uBB38\uC11C\uB97C \uBA3C\uC800 \uC120\uD0DD\uD558\uC138\uC694.", durationMs: 2800 });
      return;
    }
    if (!p.length) {
      ht(true), d({ message: "\uC0AC\uC6A9 \uC911\uC778 \uADFC\uAC70 \uBB38\uC11C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uCCB4\uD06C\uBC15\uC2A4\uB85C \uADFC\uAC70\uB97C \uD65C\uC131\uD654\uD558\uC138\uC694.", durationMs: 3200 });
      return;
    }
    if (!await _()) return;
    me("gen-sources"), (_a2 = Se.current) == null ? void 0 : _a2.abort();
    const g = new AbortController();
    Se.current = g;
    const b = x.createSourceJob({ preview: ((_b = z.questions[0]) == null ? void 0 : _b.question) || "\uADFC\uAC70 \uAE30\uBC18 \uCD9C\uC81C", topic: Ns }), I = b;
    try {
      const A = await Ml({ profiles: Ne, config: z.config, sourcePaths: p, topic: Ns, kind: "choice", count: 1, exampleQuestions: z.questions, readText: oe, signal: g.signal, onStep: (te) => mt(b, I, te) });
      if (!A.length) throw new Error("\uC0DD\uC131\uB41C \uBB38\uD56D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
      const G = Number.parseInt(Ks(z.questions), 10) || 1, F = Date.now(), D = A.map((te, we) => ({ ...te, id: `gen-src-${F}-${we}`, displayLabel: String(G + we), isGenerated: true, ...p.length ? { sourcePaths: [...p] } : {} })), T = (_c2 = D[0]) == null ? void 0 : _c2.id, q = D.map((te) => te.displayLabel).join(", "), K = T || b;
      x.updateJobStep(b, { step: "finalize", status: "running", detail: "\uBB38\uC11C\uC5D0 \uCD94\uAC00 \uC911\u2026" }), le(b, K);
      const X = [...z.questions, ...D];
      xt("all"), T && qt((te) => {
        const we = { ...te };
        for (const Ce of D) we[Ce.id] = true;
        return we;
      }), xe({ ...z, questions: X }), T && x.setJobResultQuestionId(b, T), x.updateJobStep(b, { step: "finalize", status: "done", detail: q, llmResponse: JSON.stringify(D, null, 2) }), x.completeJob(b, q), le(b, K), d({ message: `\uADFC\uAC70 \uAE30\uBC18 \uBB38\uC81C ${D.length}\uAC1C \uCD94\uAC00`, durationMs: 2500 }), await nt(), T && window.setTimeout(() => {
        var _a3;
        (_a3 = document.getElementById(`q-card-${T}`)) == null ? void 0 : _a3.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 80);
    } catch (A) {
      if (g.signal.aborted) {
        x.failJob(b, "\uCDE8\uC18C\uB428"), le(b, I);
        return;
      }
      const G = (A instanceof Error ? A.message : "") || "\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328";
      x.failJob(b, G), le(b, I), W("\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328", A, "\uBB38\uC81C \uC0DD\uC131 \uC2E4\uD328");
    } finally {
      me(null);
    }
  }, ko = l.useCallback(async ({ instructions: i, form: p }) => {
    var _a2, _b;
    if (!fe || !await _()) return null;
    (_a2 = Se.current) == null ? void 0 : _a2.abort();
    const g = new AbortController();
    Se.current = g;
    const b = Cr(p, fe.displayLabel);
    b.id = fe.id, b.displayLabel = fe.displayLabel, fe.similarOf && (b.similarOf = fe.similarOf), fe.isGenerated && (b.isGenerated = fe.isGenerated);
    const I = Xt(z.config, b);
    try {
      const A = await Tl({ profiles: Ne, question: b, config: z.config, userInstructions: i, sourcePaths: I, readText: oe, signal: g.signal }), G = _e(b, z.config.choiceCount), F = { kind: A.kind, displayLabel: fe.displayLabel, question: A.question, point: A.point, explanation: A.explanation, ...((_b = p.sourcePaths) == null ? void 0 : _b.length) ? { sourcePaths: p.sourcePaths } : {} };
      if (A.kind === "subjective") F.answerStyle = A.answerStyle === "essay" ? "essay" : "short", F.modelAnswer = A.modelAnswer || "";
      else {
        const D = [...A.options || []];
        F.options = Ye(D, G), F.answer = A.answer && A.answer >= 1 ? A.answer : 1;
      }
      return d({ message: "\uBB38\uD56D\uC744 \uAD50\uC815\uD588\uC2B5\uB2C8\uB2E4. \uB0B4\uC6A9\uC744 \uD655\uC778\uD55C \uB4A4 \uC800\uC7A5\uD558\uC138\uC694.", durationMs: 3200 }), F;
    } catch (A) {
      return g.signal.aborted || W("\uBB38\uC81C \uACE0\uCE58\uAE30 \uC2E4\uD328", A, "\uBB38\uC81C \uACE0\uCE58\uAE30 \uC2E4\uD328"), null;
    }
  }, [z.config, fe, _, Ne, oe, W, d]);
  if (!c) return t.jsx("div", { className: "quiz-pane flex flex-1 items-center justify-center text-sm text-gray-400", children: "\uD0ED\uC744 \uC120\uD0DD\uD558\uBA74 \uD034\uC988\uAC00 \uC5F4\uB9BD\uB2C8\uB2E4" });
  const Is = V.total > 0 ? Math.round(V.answered / V.total * 100) : 0, Ln = V.total > 0 && !Xr, On = V.total > 0 && !Zr, Rn = ae.examInProgress, wo = t.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-slate-500 dark:text-odp-muted", "aria-label": `\uC815\uB2F5 ${V.correct}, \uBD80\uBD84\uC815\uB2F5 ${V.partial}, \uC624\uB2F5 ${V.wrong}`, children: [t.jsxs("span", { children: ["\uC815\uB2F5", " ", t.jsx("span", { className: "font-bold tabular-nums text-emerald-600 dark:text-emerald-400", children: V.correct })] }), t.jsx("span", { className: "text-slate-300 dark:text-odp-borderSoft", "aria-hidden": true, children: "|" }), t.jsxs("span", { children: ["\uBD80\uBD84", " ", t.jsx("span", { className: "font-bold tabular-nums text-amber-600 dark:text-amber-400", children: V.partial })] }), t.jsx("span", { className: "text-slate-300 dark:text-odp-borderSoft", "aria-hidden": true, children: "|" }), t.jsxs("span", { children: ["\uC624\uB2F5", " ", t.jsx("span", { className: "font-bold tabular-nums text-rose-500 dark:text-rose-400", children: V.wrong })] })] }), yo = l.useMemo(() => ({ getPresignedUrl: o, currentNotePath: (r == null ? void 0 : r.id) ?? null }), [r == null ? void 0 : r.id, o]);
  return t.jsx(Wi, { value: yo, children: t.jsx(Et, { delayDuration: 250, skipDelayDuration: 0, children: t.jsxs("div", { className: "quiz-pane relative flex min-h-0 flex-1 flex-col overflow-hidden bg-slate-50 dark:bg-odp-bg", children: [t.jsx("div", { className: "shrink-0 border-b border-slate-200 bg-white/90 px-4 py-3 dark:border-odp-borderSoft dark:bg-odp-surface", children: t.jsxs("div", { className: "flex flex-wrap items-center gap-2 overflow-hidden", children: [t.jsxs("div", { className: "mr-auto flex min-w-0 flex-1 basis-full items-center gap-2 sm:basis-auto sm:gap-3", children: [t.jsx(Mi, { className: "shrink-0 text-blue-600", size: 18 }), t.jsx("span", { className: "shrink-0 text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: "\uD034\uC988 \uBAA8\uB4DC" }), V.total > 0 ? t.jsx("div", { className: `${cr} flex-1`, "aria-hidden": !Ln, children: t.jsx(Xe, { initial: false, children: Ln ? t.jsxs($e.div, { className: "flex w-full min-w-0 items-center gap-2 overflow-hidden sm:gap-3", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2, ease: "easeOut" }, children: [t.jsxs("p", { className: "hidden shrink-0 overflow-hidden text-xs whitespace-nowrap text-slate-600 dark:text-odp-muted md:inline", children: ["\uCD1D", " ", t.jsx("span", { className: "font-semibold text-slate-800 dark:text-odp-fgStrong", children: V.total }), "\uBB38\uD56D \uC911", " ", t.jsx("span", { className: "font-semibold text-blue-600 dark:text-blue-400", children: V.answered }), "\uBB38\uD56D \uD480\uC774"] }), t.jsxs("span", { className: "shrink-0 text-xs font-semibold whitespace-nowrap tabular-nums text-slate-600 dark:text-odp-muted md:hidden", children: [V.answered, "/", V.total] }), t.jsx("div", { className: "h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-odp-bgSoft", role: "progressbar", "aria-valuenow": V.answered, "aria-valuemin": 0, "aria-valuemax": V.total, "aria-label": `\uD480\uC774 \uC9C4\uD589 ${V.answered} / ${V.total}`, children: t.jsx($e.div, { className: "h-full rounded-full bg-blue-500", initial: false, animate: { width: `${Is}%` }, transition: { duration: 0.3, ease: "easeOut" } }) }), t.jsxs("span", { className: "shrink-0 text-[11px] font-medium whitespace-nowrap tabular-nums text-slate-500 dark:text-odp-muted", children: [Is, "%"] })] }, "quiz-header-progress") : null }) }) : null] }), V.total > 0 ? t.jsx("div", { className: `${cr} shrink-0`, "aria-hidden": !On, children: t.jsx(Xe, { initial: false, children: On ? t.jsx($e.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2, ease: "easeOut" }, className: "overflow-hidden whitespace-nowrap", children: wo }, "quiz-header-score") : null }) }) : null, t.jsxs(Di, { children: [t.jsx(qi, { asChild: true, children: t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", children: [t.jsx(Bn, { size: 14 }), "\uBB38\uC81C \uCD94\uAC00", t.jsx(Vs, { size: 14, className: "opacity-70", "aria-hidden": true })] }) }), t.jsx(Bi, { children: t.jsxs(Fi, { className: Nc, sideOffset: 6, align: "start", children: [t.jsxs(Jn, { className: dr, onSelect: () => {
    Qt(null), _t(true);
  }, children: [t.jsx(ls, { size: 14, "aria-hidden": true }), "\uC9C1\uC811\uCD94\uAC00"] }), t.jsxs(Jn, { className: dr, onSelect: () => Ss(true), children: [t.jsx(Li, { size: 14, "aria-hidden": true }), "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30"] })] }) })] }), t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", onClick: En, children: [t.jsx(Fn, { size: 14 }), "\uCD08\uAE30\uD654"] }), t.jsxs(Q, { type: "button", variant: "primary", size: "sm", onClick: () => {
    mo();
  }, children: [t.jsx(Un, { size: 14 }), "\uC804\uCCB4 \uCC44\uC810"] }), t.jsxs(Q, { type: "button", variant: rt.active > 0 ? "primary" : "secondary", size: "sm", "aria-pressed": Rt, onClick: () => {
    ht((i) => (i && gt(null), !i));
  }, children: [t.jsx(Gn, { size: 14 }), "\uADFC\uAC70"] }), t.jsx(Q, { type: "button", variant: ks ? "primary" : "tertiary", size: "sm", "aria-label": "\uBAA9\uCC28", "aria-pressed": ks, onClick: () => an((i) => !i), children: t.jsx(Wn, { size: 14 }) })] }) }), t.jsxs("div", { className: "flex min-h-0 flex-1 overflow-hidden", children: [t.jsx("div", { className: "relative min-h-0 min-w-0 flex-1", children: t.jsx("div", { ref: Bt, className: "h-full min-h-0 overflow-y-auto px-4 py-4", children: t.jsxs("div", { className: "mx-auto max-w-3xl space-y-4", children: [t.jsx(Jl, { profiles: Ne, profileId: L.profileId, model: L.model, onProfileIdChange: L.onProfileIdChange, onModelChange: L.onModelChange }), t.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-odp-borderSoft dark:bg-odp-surface", children: [t.jsxs("div", { ref: hn, children: [t.jsxs("div", { className: "mb-2 flex justify-between text-xs font-semibold text-slate-600 dark:text-odp-muted", children: [t.jsx("span", { children: "\uD480\uC774 \uC9C4\uD589\uB960" }), t.jsxs("span", { children: [V.answered, " / ", V.total] })] }), t.jsx("div", { className: "mb-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-odp-bgSoft", children: t.jsx($e.div, { className: "h-full rounded-full bg-blue-500", initial: false, animate: { width: `${Is}%` }, transition: { duration: 0.3, ease: "easeOut" } }) })] }), t.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [t.jsxs("div", { className: "flex gap-4 text-center text-xs", children: [t.jsxs("div", { children: [t.jsx("div", { className: "text-xl font-black text-slate-800 dark:text-odp-fgStrong", children: V.scorePercent != null ? `${V.scorePercent}\uC810` : "-" }), t.jsx("div", { className: "text-[10px] text-slate-400", children: "\uC810\uC218" })] }), t.jsxs("div", { ref: gn, className: "flex gap-4 text-center text-xs", children: [t.jsxs("div", { children: [t.jsx("div", { className: "text-lg font-bold text-emerald-600", children: V.correct }), t.jsx("div", { className: "text-[10px] text-slate-400", children: "\uC815\uB2F5" })] }), t.jsxs("div", { children: [t.jsx("div", { className: "text-lg font-bold text-amber-600", children: V.partial }), t.jsx("div", { className: "text-[10px] text-slate-400", children: "\uBD80\uBD84" })] }), t.jsxs("div", { children: [t.jsx("div", { className: "text-lg font-bold text-rose-500", children: V.wrong }), t.jsx("div", { className: "text-[10px] text-slate-400", children: "\uC624\uB2F5" })] })] })] }), t.jsx("div", { className: "flex gap-1 rounded-xl bg-slate-100 p-1 text-xs dark:bg-odp-bgSoft", children: [["all", "\uC804\uCCB4"], ["wrong", "\uC624\uB2F5\uB9CC"], ["unanswered", "\uBBF8\uD480\uC774"]].map(([i, p]) => t.jsx("button", { type: "button", className: `rounded-lg px-2.5 py-1 font-medium ${bs === i ? "bg-white shadow-sm dark:bg-odp-surface" : "text-slate-600 dark:text-odp-muted"}`, onClick: () => xt(i), children: p }, i)) })] }), t.jsx(Ea, { log: ke })] }), z.questions.length === 0 ? t.jsxs("div", { className: "rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-odp-borderSoft dark:bg-odp-surface", children: [t.jsx("p", { className: "mb-3 text-sm font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uB4F1\uB85D\uB41C \uBB38\uC81C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" }), t.jsxs("div", { className: "flex flex-wrap justify-center gap-2", children: [t.jsxs(Q, { type: "button", variant: "primary", onClick: () => _t(true), children: [t.jsx(Bn, { size: 14 }), "\uBB38\uC81C \uCD94\uAC00"] }), t.jsx(Q, { type: "button", variant: "secondary", onClick: () => Ss(true), children: "\uB9C8\uD06C\uB2E4\uC6B4 \uAC00\uC838\uC624\uAE30" })] })] }) : null, z.questions.map((i) => {
    var _a2, _b, _c2, _d, _e2, _f;
    const p = ee[i.id] !== void 0 && String(ee[i.id]).trim() !== "", g = be || de[i.id];
    let b = false, I = false;
    if (i.kind === "choice" && g && p && (I = ee[i.id] === i.answer, b = !I), i.kind === "subjective" && g) {
      const T = se[i.id];
      I = (T == null ? void 0 : T.verdict) === "correct", b = (T == null ? void 0 : T.verdict) === "wrong";
    }
    if (bs === "wrong" && !(g && b) || bs === "unanswered" && p) return null;
    const A = qr[i.id], G = ee[i.id], F = !!Kr[i.id];
    let D = null;
    if (g) if (i.kind === "choice") p ? I ? D = "\uC815\uB2F5" : D = "\uC624\uB2F5" : D = "\uBBF8\uCC44\uC810";
    else {
      const T = (_a2 = se[i.id]) == null ? void 0 : _a2.verdict;
      T === "correct" ? D = "\uC815\uB2F5" : T === "partial" ? D = "\uBD80\uBD84\uC815\uB2F5" : T === "wrong" && (D = "\uC624\uB2F5");
    }
    return t.jsxs($e.div, { id: `q-card-${i.id}`, [dc]: i.id, initial: F ? { opacity: 0, y: 36, scale: 0.96 } : false, animate: { opacity: 1, y: 0, scale: 1 }, transition: F ? { type: "spring", stiffness: 340, damping: 26 } : { duration: 0 }, onAnimationComplete: () => {
      F && qt((T) => {
        if (!T[i.id]) return T;
        const q = { ...T };
        return delete q[i.id], q;
      });
    }, className: `relative rounded-2xl border bg-white p-5 pr-16 shadow-xs dark:bg-odp-surface ${g ? I ? "border-emerald-300" : b ? "border-rose-300" : "border-slate-200 dark:border-odp-borderSoft" : "border-slate-200 dark:border-odp-borderSoft"} ${i.isGenerated ? "border-purple-300 dark:border-purple-700" : ""} ${F ? "ring-2 ring-purple-300/70 dark:ring-purple-500/50" : ""}`, children: [t.jsxs(Q, { type: "button", variant: "tertiary", size: "sm", className: "absolute top-3 right-3 z-10", onClick: () => {
      Qt(i), _t(true);
    }, children: [t.jsx(ls, { size: 14 }), "\uC218\uC815"] }), t.jsx("div", { className: "mb-3", children: t.jsxs("h3", { className: "text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: [t.jsxs("span", { className: "mr-1.5 inline-flex items-center gap-1.5 align-middle", children: [t.jsxs("span", { children: [i.displayLabel, "."] }), D ? t.jsx("span", { className: `rounded-md px-2 py-0.5 text-[10px] font-bold ${D === "\uC815\uB2F5" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200" : D === "\uC624\uB2F5" ? "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200" : D === "\uBD80\uBD84\uC815\uB2F5" ? "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200" : "bg-slate-100 text-slate-700 dark:bg-odp-bgSoft dark:text-odp-muted"}`, children: D }) : null] }), i.kind === "subjective" ? i.answerStyle === "essay" ? "[\uC8FC\uAD00\uC2DD] " : "[\uB2E8\uB2F5\uD615] " : "", t.jsx("span", { className: "font-medium", children: t.jsx(Te, { text: i.question, previewId: `qq-${i.id}`, className: "inline" }) })] }) }), i.kind === "choice" ? t.jsx("div", { className: "space-y-2", children: (i.options || []).map((T, q) => {
      const K = q + 1, X = G === K, te = g, we = i.answer === K;
      let Ce = "border-slate-200 bg-white hover:bg-slate-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft";
      return X && !te && (Ce = "border-blue-500 bg-blue-50 ring-1 ring-blue-500 dark:bg-blue-950/30"), te && we ? Ce = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:bg-emerald-950/30" : te && X && !we && (Ce = "border-rose-400 bg-rose-50 dark:bg-rose-950/30"), t.jsxs("button", { type: "button", className: `flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm ${Ce}`, onClick: () => lo(i.id, K), children: [t.jsx("span", { className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold", children: K }), t.jsx("div", { className: "min-w-0 flex-1", children: t.jsx(Te, { text: T, previewId: `qo-${i.id}-${K}` }) })] }, K);
    }) }) : t.jsxs("div", { className: "space-y-2", children: [i.answerStyle === "essay" ? t.jsx("textarea", { className: "quiz-body-field min-h-24 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: String(ee[i.id] || ""), disabled: g, onChange: (T) => He((q) => ({ ...q, [i.id]: T.target.value })), placeholder: "\uB2F5\uC548\uC744 \uC785\uB825\uD558\uC138\uC694" }) : t.jsx("input", { className: "quiz-body-field w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft", value: String(ee[i.id] || ""), disabled: g, onChange: (T) => He((q) => ({ ...q, [i.id]: T.target.value })), placeholder: "\uB2E8\uB2F5 \uC785\uB825" }), se[i.id] ? t.jsxs("div", { className: `rounded-xl border p-3 text-xs ${((_b = se[i.id]) == null ? void 0 : _b.verdict) === "correct" ? "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/45 dark:text-emerald-100" : ((_c2 = se[i.id]) == null ? void 0 : _c2.verdict) === "partial" ? "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-800/70 dark:bg-amber-950/45 dark:text-amber-100" : "border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100"}`, children: [t.jsxs("div", { className: "mb-1 font-bold", children: [(_d = se[i.id]) == null ? void 0 : _d.verdict, " \xB7", " ", (_e2 = se[i.id]) == null ? void 0 : _e2.score, "\uC810"] }), t.jsx("div", { className: "[&_.md-editor-preview]:text-inherit [&_.md-editor-preview]:!bg-transparent [&_.md-editor]:!bg-transparent", children: t.jsx(Te, { text: ((_f = se[i.id]) == null ? void 0 : _f.feedback) || "", previewId: `qg-${i.id}` }) })] }) : null] }), t.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-1.5", children: [g ? t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", onClick: () => ao(i), children: [t.jsx(Fn, { size: 14 }), "\uB2E4\uC2DC\uD480\uAE30"] }) : i.kind === "choice" ? t.jsxs(er, { examInProgress: Rn, size: "sm", disabled: !p, onClick: () => co(i), className: "!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700", children: [t.jsx(Un, { size: 14 }), "\uCC44\uC810"] }) : t.jsxs(er, { examInProgress: Rn, size: "sm", disabled: Oe === i.id || !p, onClick: () => {
      uo(i);
    }, className: "!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700", children: [t.jsx(Re, { size: 14 }), "AI \uCC44\uC810"] }), t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", onClick: () => ze((T) => ({ ...T, [i.id]: !T[i.id] })), children: [t.jsx(Oi, { size: 14 }), A ? "\uD574\uC124 \uC811\uAE30" : "\uD574\uC124 \uBCF4\uAE30"] }), i.kind === "choice" ? t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", disabled: Oe === `sim-${i.id}`, onClick: () => {
      fo(i);
    }, children: [t.jsx(It, { size: 14 }), "\uC720\uC0AC\uBB38\uC81C"] }) : null, t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", disabled: Oe === `derived-${i.id}`, onClick: () => js(i), children: [t.jsx(nn, { size: 14 }), "\uD30C\uC0DD\uBB38\uC81C \uC0DD\uC131"] })] }), g ? t.jsx(Ua, { question: i, busyKey: Oe, showContent: !!A, onGenerate: (T) => {
      po(i, T);
    } }) : null, g && i.kind === "choice" ? t.jsx(La, { question: i, focusOption: ho(i, typeof G == "number" ? G : void 0), onFocusOptionChange: (T) => st((q) => ({ ...q, [i.id]: T })), wrongExps: Fe, busyKey: Oe, onOpenAnalysisDock: (T, q) => oo(i.id, T, q) }) : null, t.jsx(Ga, { questionId: i.id, value: ie[i.id] || "", onSave: (T) => gs((q) => {
      if (!T.trim()) {
        const { [i.id]: X, ...te } = q;
        return te;
      }
      return { ...q, [i.id]: T };
    }) })] }, i.id);
  })] }) }) }), t.jsx(Zi, { open: Ve != null, question: Ve, defaultChoiceCount: z.config.choiceCount || 4, busy: Ve != null && Oe === `derived-${Ve.id}`, onClose: () => {
    Ve && Oe === `derived-${Ve.id}` || js(null);
  }, onSubmit: (i) => {
    Ve && xo(Ve, i);
  } }), t.jsx(Va, { open: !!(ne && Ht), question: Ht, option: (ne == null ? void 0 : ne.option) ?? null, mode: (ne == null ? void 0 : ne.mode) ?? "create", prompt: on, existingAnalysis: ne && ne.mode === "followup" ? String(Fe[Ze(ne.questionId, ne.option)] || "") : "", llmProfiles: Ne, profileId: L.profileId, model: L.model, onProfileIdChange: L.onProfileIdChange, onModelChange: L.onModelChange, busy: ne != null && Oe === Ze(ne.questionId, ne.option), onPromptChange: Ge, onClose: () => {
    ne && Oe === Ze(ne.questionId, ne.option) || (Ue(null), Ge(""));
  }, onGenerate: () => {
    !Ht || !ne || go(Ht, ne.option, on, ne.mode);
  } }), t.jsx(Xe, { initial: false, children: cn ? t.jsx($e.aside, { role: "complementary", "aria-label": "\uADFC\uAC70 \uBB38\uC11C \uBBF8\uB9AC\uBCF4\uAE30", className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface", initial: { width: 0, opacity: 0.85 }, animate: { width: ws, opacity: 1 }, exit: { width: 0, opacity: 0.85 }, transition: { type: "spring", stiffness: 380, damping: 36 }, children: t.jsx("div", { className: "relative h-full min-h-0", style: { width: ws }, children: t.jsx(Zl, { embedded: true, path: cn, width: ws, resizeHandleProps: Fr, isResizing: Ur, resizeEdge: "left", onClose: () => gt(null), loadDocument: je, onOpenDocument: E, onOpenInNewTab: B }) }) }, "quiz-source-preview-dock") : null }), t.jsx(Xe, { initial: false, children: Rt ? t.jsx($e.aside, { role: "complementary", "aria-label": "\uD30C\uC77C \uADFC\uAC70 \uBB38\uC11C", className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface", initial: { width: 0, opacity: 0.85 }, animate: { width: dn, opacity: 1 }, exit: { width: 0, opacity: 0.85 }, transition: un ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 36 }, children: t.jsxs("div", { className: "relative flex h-full min-h-0 flex-col", style: { width: dn }, children: [t.jsx(lr, { edge: "left", handleProps: Gr, isResizing: un, visibleOnHover: true, label: "\uD30C\uC77C \uADFC\uAC70 \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsxs("div", { className: "border-b border-slate-200 dark:border-odp-borderSoft", children: [t.jsxs("div", { className: "flex items-center justify-between px-3 py-2.5", children: [t.jsxs("div", { className: "flex min-w-0 items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: [t.jsx(Gn, { size: 16, className: "shrink-0 text-violet-600 dark:text-violet-400" }), t.jsx("span", { className: "truncate", children: "\uD30C\uC77C \uADFC\uAC70" }), rt.total > 0 ? t.jsxs("span", { className: "ml-0.5 inline-flex shrink-0 items-baseline gap-0.5 rounded-md bg-violet-100 px-1.5 py-0.5 text-[11px] font-bold tabular-nums dark:bg-violet-950/70", "aria-label": `\uB4F1\uB85D ${rt.total}\uAC1C \uC911 ${rt.active}\uAC1C \uC0AC\uC6A9 \uC911`, children: [t.jsx("span", { className: "text-violet-600 dark:text-violet-400", children: rt.active }), t.jsx("span", { className: "font-medium text-slate-400", children: "/" }), t.jsx("span", { className: "text-slate-700 dark:text-slate-200", children: rt.total }), t.jsx("span", { className: "ml-0.5 text-[9px] font-semibold text-violet-700 dark:text-violet-300", children: "\uC0AC\uC6A9" })] }) : null] }), t.jsx("button", { type: "button", "aria-label": "\uADFC\uAC70 \uD328\uB110 \uB2EB\uAE30", className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg", onClick: J, children: t.jsx(qe, { size: 16 }) })] }), t.jsxs("div", { className: "flex items-center justify-between gap-3 px-3 pb-2.5", children: [t.jsx("label", { htmlFor: "quiz-source-remove-confirm", className: "text-[11px] font-medium text-slate-600 dark:text-odp-muted", children: "\uC0AD\uC81C \uC2DC \uD655\uC778" }), t.jsx(Ui, { id: "quiz-source-remove-confirm", className: yc(Tt), checked: Tt, onCheckedChange: (i) => {
    Hr(i), Sc(i);
  }, "aria-label": "\uADFC\uAC70 \uBB38\uC11C \uC0AD\uC81C \uC2DC \uD655\uC778", children: t.jsx(Gi, { className: vc }) })] })] }), t.jsxs("div", { ref: no, className: "relative min-h-0 flex-1 space-y-4 overflow-y-auto p-3", children: [t.jsx(Nr, { layout: "dock", paths: z.config.sourcePaths, label: "\uC120\uD0DD\uB41C \uBB38\uC11C", onPreview: Z, onRemove: to, isPathEnabled: (i) => di(z.config, i), onToggleEnabled: eo, onOpenPicker: () => Dt({ paths: z.config.sourcePaths, scope: "file" }) }), t.jsxs("div", { className: "space-y-2 border-t border-slate-100 pt-3 dark:border-odp-borderSoft", children: [t.jsx("label", { className: "block text-xs font-semibold text-slate-700 dark:text-odp-fgStrong", children: "\uADFC\uAC70\uB85C \uBB38\uC81C \uC0DD\uC131" }), t.jsx("input", { className: "w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft", placeholder: "\uC8FC\uC81C (\uC120\uD0DD)", value: Ns, onChange: (i) => Vr(i.target.value) }), t.jsxs(Q, { type: "button", variant: "secondary", size: "sm", className: "w-full", disabled: Oe === "gen-sources", onClick: () => {
    bo();
  }, children: [t.jsx(Re, { size: 14 }), "\uADFC\uAC70\uB85C \uBB38\uC81C \uCD94\uAC00"] })] })] })] }) }, "quiz-sources-dock") : null }), t.jsx(Xe, { initial: false, children: ks ? t.jsx($e.aside, { role: "complementary", "aria-label": "\uBB38\uC81C \uBAA9\uCC28", className: "flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface", initial: { width: 0, opacity: 0.85 }, animate: { width: mn, opacity: 1 }, exit: { width: 0, opacity: 0.85 }, transition: fn ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 36 }, children: t.jsxs("div", { className: "relative flex h-full min-h-0 flex-col", style: { width: mn }, children: [t.jsx(lr, { edge: "left", handleProps: Wr, isResizing: fn, visibleOnHover: true, label: "\uBAA9\uCC28 \uD328\uB110 \uB108\uBE44 \uC870\uC808" }), t.jsxs("div", { className: "border-b border-slate-200 dark:border-odp-borderSoft", children: [t.jsxs("div", { className: "flex items-center justify-between px-3 py-2.5", children: [t.jsxs("div", { className: "flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-odp-fgStrong", children: [t.jsx(Wn, { size: 16, className: "text-slate-600 dark:text-odp-muted" }), "\uBB38\uC81C \uBAA9\uCC28"] }), t.jsx("button", { type: "button", "aria-label": "\uBAA9\uCC28 \uD328\uB110 \uB2EB\uAE30", className: "rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg", onClick: () => an(false), children: t.jsx(qe, { size: 16 }) })] }), t.jsx("div", { className: "flex flex-wrap items-center gap-1 px-3 pb-2.5", children: gc.map((i) => {
    const p = ln[i];
    return t.jsxs("button", { type: "button", "aria-pressed": p, "aria-label": `\uBAA9\uCC28 ${rr[i]} ${p ? "\uD45C\uC2DC" : "\uC228\uAE40"}`, className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors ${p ? bc[i] : kc}`, onClick: () => Br((g) => ({ ...g, [i]: !g[i] })), children: [t.jsx("span", { className: `h-2 w-2 shrink-0 rounded-full ${p ? nr[i] : "bg-slate-300 dark:bg-slate-600"}`, "aria-hidden": true }), rr[i]] }, i);
  }) })] }), t.jsx("ul", { className: "min-h-0 flex-1 space-y-1 overflow-y-auto p-3 text-xs", children: z.questions.map((i, p) => {
    var _a2, _b;
    const g = !!i.similarOf, b = /-파생\d+$/u.test(String(i.displayLabel || "")) ? "\uD30C\uC0DD\uBB38\uC81C" : "\uC720\uC0AC\uBB38\uC81C", I = il({ question: i, userAnswers: ee, gradedQuestions: de, isSubmitted: be, subjectiveGrades: se });
    return I && !ln[I] ? null : t.jsx($e.li, { initial: { opacity: 0, x: 12 }, animate: { opacity: 1, x: 0 }, transition: { delay: Math.min(p, 12) * 0.03, duration: 0.18 }, children: t.jsxs("button", { type: "button", className: `flex w-full items-center gap-2 rounded py-1.5 text-left hover:bg-slate-100 dark:hover:bg-odp-focusBg ${g ? "ml-3 border-l-2 border-violet-300 pl-2.5 text-[11px] text-violet-900 dark:border-violet-600 dark:text-violet-200" : "px-2"}`, title: g ? `${((_a2 = i.similarOf) == null ? void 0 : _a2.displayLabel) || ((_b = i.similarOf) == null ? void 0 : _b.id)}\uC758 ${b}` : void 0, onClick: () => {
      var _a3;
      (_a3 = document.getElementById(`q-card-${i.id}`)) == null ? void 0 : _a3.scrollIntoView({ behavior: "smooth", block: "center" }), xt("all");
    }, children: [t.jsx("span", { className: "flex h-4 w-2 shrink-0 items-center justify-center", "aria-hidden": true, children: I ? t.jsx("span", { className: `h-2 w-2 rounded-full ${nr[I]}` }) : null }), t.jsxs("span", { className: "min-w-0 truncate", children: [g ? t.jsx("span", { className: "mr-1 text-violet-400 dark:text-violet-500", children: "\u21B3" }) : null, i.displayLabel, ". ", i.question.slice(0, 40)] })] }) }, i.id);
  }) })] }) }, "quiz-toc-dock") : null })] }), pn ? t.jsx(ka, { isOpen: pn, onClose: () => {
    _t(false), Qt(null);
  }, styleTemplate: ro, initial: fe, nextLabel: Ks(z.questions), onSubmit: (i) => {
    xe(fe ? { ...z, questions: z.questions.map((p) => p.id === fe.id ? i : p) } : { ...z, questions: [...z.questions, i] }), Qt(null);
  }, onOpenSourcePicker: (i, p) => Dt({ paths: i, scope: "question", onDone: p }), ...fe ? { onFixWithAi: ko } : {} }) : null, xn ? t.jsx(ja, { isOpen: xn, onClose: () => Ss(false), current: z, onApply: (i, p) => {
    xe(i), p === "replace" && En(), d({ message: `\uBB38\uC81C ${i.questions.length}\uAC1C \uC801\uC6A9`, durationMs: 2500 });
  } }) : null, We ? t.jsx(Sa, { isOpen: true, onClose: () => Dt(null), tree: M, selected: We.paths, excludePath: (r == null ? void 0 : r.id) || null, onExpandFolder: ft, onDropHostChange: so, onRegisterDropPathsMerge: (i) => {
    Nn.current = i;
  }, onConfirm: (i) => {
    We.onDone ? We.onDone(i) : We.scope === "file" && xe({ ...z, config: { ...z.config, sourcePaths: i } }), Dt(null);
  } }) : null, t.jsx(Fs, { isOpen: Jr, title: "\uC2DC\uD5D8 \uC2DC\uC791", message: "\uCD08\uAE30\uD654\uD558\uACE0 \uC2DC\uD5D8\uC744 \uC2DC\uC791\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?", confirmLabel: "\uC2DC\uC791", cancelLabel: "\uCDE8\uC18C", variant: "danger", onConfirm: () => {
    ys(false), io();
  }, onCancel: () => ys(false) }), t.jsx(Fs, { isOpen: bt != null, title: "\uADFC\uAC70 \uBB38\uC11C \uC81C\uAC70", message: bt ? `\u300C${bt}\u300D\uC744(\uB97C) \uD30C\uC77C \uADFC\uAC70\uC5D0\uC11C \uC81C\uAC70\uD560\uAE4C\uC694?` : "", confirmLabel: "\uC81C\uAC70", cancelLabel: "\uCDE8\uC18C", variant: "danger", onConfirm: () => {
    bt && $s(bt), vs(null);
  }, onCancel: () => vs(null) }), t.jsx(za, { jobs: x.jobs, isOpen: x.panelOpen, size: x.panelSize, onClose: x.closePanel, onResize: x.setPanelSize, onRemoveJob: x.removeJob, onClearFinished: x.clearFinishedJobs, onUserEngage: x.markPanelUserEngaged, onPointerEngageChange: x.markPanelPointerEngaged, onFocusEngageChange: x.markPanelFocusEngaged }), !x.panelOpen && x.jobs.length > 0 ? t.jsxs("button", { type: "button", className: "fixed bottom-4 right-4 z-10049 flex items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-2 text-xs font-semibold text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 dark:border-violet-700/60", onClick: x.openPanel, onMouseEnter: () => x.markPanelPointerEngaged(true), onMouseLeave: () => x.markPanelPointerEngaged(false), onFocus: () => x.markPanelFocusEngaged(true), onBlur: () => x.markPanelFocusEngaged(false), "aria-label": "\uBB38\uC81C \uC0DD\uC131 \uB300\uAE30\uC5F4 \uC5F4\uAE30", children: [t.jsx(Re, { size: 14 }), "\uC0DD\uC131 \uB300\uAE30\uC5F4", x.hasActiveJobs ? t.jsx("span", { className: "rounded-full bg-violet-400/30 px-1.5 py-0.5 text-[10px] font-bold", children: "\uC9C4\uD589" }) : null] }) : null] }) }) });
}
export {
  _c as default
};
