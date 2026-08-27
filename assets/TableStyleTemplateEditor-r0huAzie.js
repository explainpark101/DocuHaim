import { j as e, r as h } from "./vendor-react-kfkzeLNk.js";
import { K as R, N as O, O as L, H as F, I as A, J as D, Q as V, S as I, U as W, V as M } from "./index-BnDr9Xzt.js";
import { t as B, O as G } from "./index-DKf8xmDw.js";
import { P as K, b as P, c as U, d as X, T as q, e as J, B as Q, f as Z } from "./vendor-lucide-C7LgkNTS.js";
import { l as ee, F as w, L as T, m as te, h as se, b as re, d as ae, T as le, i as oe, e as ne, f as de, A as ie, j as ce, k as xe } from "./vendor-radix-BHltGsrZ.js";
const $ = "__none__", H = [{ value: $, label: "\uAE30\uBCF8" }, ...V.map((t) => ({ value: t.value, label: t.label })), { value: "normal", label: "normal" }, { value: "bold", label: "bold" }], ue = "z-100050 rounded-md border border-gray-200 bg-white px-2 py-1 font-mono text-[11px] text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function E({ icon: t, children: l }) {
  return e.jsxs("span", { className: "inline-flex items-center gap-1", children: [e.jsx("span", { className: "inline-flex shrink-0 text-gray-400 dark:text-odp-muted", "aria-hidden": true, children: t }), l] });
}
function v({ id: t, label: l, icon: x, value: n, onChange: f }) {
  const [m, o] = h.useState(false), u = F(n), a = A(u), S = !!n, j = u ?? ((n == null ? void 0 : n.trim()) || null), N = (p) => {
    const C = F(p.startsWith("#") ? p : `#${p}`);
    C && f(C);
  };
  return e.jsxs(w, { name: t, className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [e.jsx(T, { asChild: true, children: e.jsx("span", { children: e.jsx(E, { icon: x, children: l }) }) }), e.jsxs("span", { className: "flex items-center gap-1", children: [e.jsxs(se, { open: m, onOpenChange: o, modal: true, children: [e.jsx(re, { delayDuration: 300, children: e.jsxs(ae, { ...m || !j ? { open: false } : {}, children: [e.jsx(le, { asChild: true, children: e.jsx(oe, { asChild: true, children: e.jsx("button", { id: t, type: "button", "aria-label": `${l} \uC0C9 \uC120\uD0DD${j ? `: ${j}` : ""}`, "aria-expanded": m, className: "h-7 w-8 shrink-0 cursor-pointer rounded-md border border-gray-300 bg-white p-0.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: e.jsxs("span", { className: "relative block h-full w-full overflow-hidden rounded-sm border border-black/10", children: [e.jsx("span", { "aria-hidden": true, className: "absolute inset-0", style: D }), e.jsx("span", { "aria-hidden": true, className: "absolute inset-0", style: { backgroundColor: S && u ? u : "transparent" } })] }) }) }) }), j ? e.jsx(ne, { children: e.jsxs(de, { className: ue, side: "top", sideOffset: 6, children: [j, e.jsx(ie, { className: "fill-white dark:fill-odp-surface" })] }) }) : null] }) }), e.jsx(ce, { children: e.jsxs(xe, { side: "bottom", align: "start", sideOffset: 6, collisionPadding: 12, className: "z-100050 w-54 rounded-xl border border-gray-200 bg-white p-2.5 text-gray-800 shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg", onOpenAutoFocus: (p) => p.preventDefault(), children: [e.jsx("div", { className: "[&_.react-colorful]:h-40 [&_.react-colorful]:w-full", children: e.jsx(B, { color: a, onChange: N }) }), e.jsx(G, { color: a, onChange: N, prefixed: true, alpha: true, placeholder: "#rrggbbaa", "aria-label": `${l} HEX`, className: `mt-2 font-mono ${O} w-full` })] }) })] }), S ? e.jsxs("button", { type: "button", className: "inline-flex items-center gap-0.5 text-[10px] text-gray-400 hover:text-gray-600", onClick: () => f(void 0), children: [e.jsx(Z, { className: "h-3 w-3", "aria-hidden": true }), "clear"] }) : null] })] });
}
function k(t, l, x) {
  const n = { ...t };
  return x === void 0 || x === "" ? delete n[l] : n[l] = x, n;
}
function Y({ value: t, onChange: l, fontOptions: x, idPrefix: n = "haim-style", compact: f = false }) {
  var _a;
  const m = f ? "gap-1.5" : "gap-2", o = "h-3 w-3", u = ((_a = t.fontWeight) == null ? void 0 : _a.trim()) || $;
  return e.jsxs(ee, { className: `grid grid-cols-2 ${m} sm:grid-cols-3`, onSubmit: (a) => a.preventDefault(), children: [e.jsx(v, { id: `${n}-bg`, label: "\uBC30\uACBD", icon: e.jsx(K, { className: o }), value: t.bg, onChange: (a) => l(k(t, "bg", a)) }), e.jsx(v, { id: `${n}-border-inner`, label: "\uB0B4\uBD80 border", icon: e.jsx(P, { className: o }), value: t.borderInner, onChange: (a) => l(k(t, "borderInner", a)) }), e.jsx(v, { id: `${n}-border-outer`, label: "\uC678\uBD80 border", icon: e.jsx(U, { className: o }), value: t.borderOuter, onChange: (a) => l(k(t, "borderOuter", a)) }), e.jsx(v, { id: `${n}-color`, label: "\uAE00\uC790\uC0C9", icon: e.jsx(X, { className: o }), value: t.color, onChange: (a) => l(k(t, "color", a)) }), e.jsxs(w, { name: `${n}-font-family`, className: "col-span-2 flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted sm:col-span-1", children: [e.jsx(T, { asChild: true, children: e.jsx("span", { children: e.jsx(E, { icon: e.jsx(q, { className: o }), children: "font-family" }) }) }), e.jsx(R, { id: `${n}-font-family`, value: t.fontFamily ?? "", onChange: (a) => l(k(t, "fontFamily", a.trim() || void 0)), ...x !== void 0 ? { options: x } : {}, inputClassName: O })] }), e.jsxs(w, { name: `${n}-font-size`, className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [e.jsx(T, { asChild: true, children: e.jsx("span", { children: e.jsx(E, { icon: e.jsx(J, { className: o }), children: "font-size" }) }) }), e.jsx(te, { asChild: true, children: e.jsx("input", { id: `${n}-font-size`, type: "text", value: t.fontSize ?? "", placeholder: "14px", onChange: (a) => l(k(t, "fontSize", a.target.value.trim() || void 0)), className: O }) })] }), e.jsxs(w, { name: `${n}-font-weight`, className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [e.jsx(T, { asChild: true, children: e.jsx("span", { children: e.jsx(E, { icon: e.jsx(Q, { className: o }), children: "font-weight" }) }) }), e.jsx(L, { id: `${n}-font-weight`, "aria-label": "font-weight", value: H.some((a) => a.value === u) ? u : $, onValueChange: (a) => l(k(t, "fontWeight", a === $ ? void 0 : a)), options: H, className: "h-7 w-full" })] })] });
}
const me = ["thead", "tbody", "tfoot"];
function pe() {
  return { rows: "odd" };
}
function ye({ isOpen: t, template: l, onClose: x, onSave: n }) {
  var _a;
  const [f, m] = h.useState("gui"), [o, u] = h.useState(null), [a, S] = h.useState(""), [j, N] = h.useState(null), [p, C] = h.useState("thead");
  h.useEffect(() => {
    !t || !l || (u({ ...l, sections: { ...l.sections }, rules: [...l.rules ?? []] }), S(I({ templates: [l] })), N(null), m("gui"));
  }, [t, l]);
  const _ = h.useCallback((s) => {
    S(I({ templates: [s] }));
  }, []), y = h.useCallback((s) => {
    u((r) => {
      if (!r) return r;
      const d = s(r);
      return _(d), d;
    });
  }, [_]), z = () => {
    try {
      const r = M(a).templates[0];
      if (!r) {
        N("YAML must contain at least one template");
        return;
      }
      const d = { ...r, id: (o == null ? void 0 : o.id) || r.id, name: r.name || (o == null ? void 0 : o.name) || r.id };
      u(d), N(null), m("gui");
    } catch (s) {
      N(s instanceof Error ? s.message : String(s));
    }
  };
  return o ? e.jsx(W, { isOpen: t, onClose: x, contentClassName: "max-w-2xl w-[min(96vw,42rem)]", children: e.jsxs("div", { className: "flex max-h-[85vh] flex-col gap-3 p-4", children: [e.jsxs("div", { className: "flex items-center justify-between gap-2", children: [e.jsx("h2", { className: "text-sm font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uD45C \uC2A4\uD0C0\uC77C \uD15C\uD50C\uB9BF" }), e.jsxs("div", { className: "flex gap-1 text-xs", children: [e.jsx("button", { type: "button", className: `rounded px-2 py-1 ${f === "gui" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-odp-bgSoft"}`, onClick: () => m("gui"), children: "GUI" }), e.jsx("button", { type: "button", className: `rounded px-2 py-1 ${f === "yaml" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-odp-bgSoft"}`, onClick: () => {
    _(o), m("yaml");
  }, children: "YAML" })] })] }), e.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [e.jsxs("label", { className: "text-[10px] text-gray-500", children: ["id", e.jsx("input", { value: o.id, onChange: (s) => y((r) => ({ ...r, id: s.target.value.trim() })), className: "mt-0.5 w-full rounded border border-gray-200 px-2 py-1 text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), e.jsxs("label", { className: "text-[10px] text-gray-500", children: ["name", e.jsx("input", { value: o.name, onChange: (s) => y((r) => ({ ...r, name: s.target.value })), className: "mt-0.5 w-full rounded border border-gray-200 px-2 py-1 text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] })] }), f === "yaml" ? e.jsxs("div", { className: "flex min-h-0 flex-1 flex-col gap-2", children: [e.jsx("textarea", { value: a, onChange: (s) => S(s.target.value), className: "min-h-[280px] flex-1 rounded border border-gray-200 bg-white p-2 font-mono text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg", spellCheck: false }), j ? e.jsx("p", { className: "text-xs text-red-600", children: j }) : null, e.jsx("button", { type: "button", onClick: z, className: "self-start rounded bg-gray-800 px-3 py-1.5 text-xs text-white dark:bg-odp-fgStrong dark:text-odp-bg", children: "YAML \uC801\uC6A9" })] }) : e.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto space-y-4", children: [e.jsxs("div", { children: [e.jsx("div", { className: "mb-2 flex gap-1", children: me.map((s) => e.jsx("button", { type: "button", onClick: () => C(s), className: `rounded px-2 py-1 text-[11px] ${p === s ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-odp-bgSoft"}`, children: s }, s)) }), e.jsx(Y, { idPrefix: `tpl-section-${p}`, value: ((_a = o.sections) == null ? void 0 : _a[p]) ?? {}, onChange: (s) => y((r) => ({ ...r, sections: { ...r.sections, [p]: s } })) })] }), e.jsxs("div", { children: [e.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [e.jsx("h3", { className: "text-xs font-semibold text-gray-700 dark:text-odp-fg", children: "Rules (nth)" }), e.jsx("button", { type: "button", className: "rounded bg-gray-100 px-2 py-0.5 text-[11px] dark:bg-odp-bgSoft", onClick: () => y((s) => ({ ...s, rules: [...s.rules ?? [], pe()] })), children: "+ rule" })] }), e.jsx("div", { className: "space-y-3", children: (o.rules ?? []).map((s, r) => e.jsxs("div", { className: "rounded border border-gray-200 p-2 dark:border-odp-borderStrong", children: [e.jsxs("div", { className: "mb-2 flex items-center gap-2", children: [e.jsxs("label", { className: "text-[10px] text-gray-500", children: ["rows", e.jsx("input", { value: s.rows ?? "", onChange: (d) => y((b) => {
    const i = [...b.rules ?? []], c = { ...i[r] }, g = d.target.value.trim();
    return g ? c.rows = g : delete c.rows, i[r] = c, { ...b, rules: i };
  }), placeholder: "odd / 2n+1", className: "ml-1 w-24 rounded border border-gray-200 px-1 py-0.5 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), e.jsxs("label", { className: "text-[10px] text-gray-500", children: ["cols", e.jsx("input", { value: s.cols ?? "", onChange: (d) => y((b) => {
    const i = [...b.rules ?? []], c = { ...i[r] }, g = d.target.value.trim();
    return g ? c.cols = g : delete c.cols, i[r] = c, { ...b, rules: i };
  }), placeholder: "1", className: "ml-1 w-16 rounded border border-gray-200 px-1 py-0.5 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), e.jsx("button", { type: "button", className: "ml-auto text-[10px] text-red-500", onClick: () => y((d) => ({ ...d, rules: (d.rules ?? []).filter((b, i) => i !== r) })), children: "\uC0AD\uC81C" })] }), e.jsx(Y, { compact: true, idPrefix: `tpl-rule-${r}`, value: s, onChange: (d) => y((b) => {
    const i = [...b.rules ?? []], c = i[r], g = { ...d };
    return c.rows && (g.rows = c.rows), c.cols && (g.cols = c.cols), i[r] = g, { ...b, rules: i };
  }) })] }, r)) })] })] }), e.jsxs("div", { className: "flex justify-end gap-2 border-t border-gray-100 pt-2 dark:border-odp-border", children: [e.jsx("button", { type: "button", onClick: x, className: "rounded px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: "\uCDE8\uC18C" }), e.jsx("button", { type: "button", onClick: () => {
    o.id.trim() && n({ ...o, id: o.id.trim(), name: o.name.trim() || o.id });
  }, className: "rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700", children: "\uC800\uC7A5" })] })] }) }) : null;
}
export {
  Y as H,
  ye as T
};
