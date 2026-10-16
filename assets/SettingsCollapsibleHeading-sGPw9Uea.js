import { j as e, r } from "./vendor-react-ChQ1w2We.js";
import { A, m as E } from "./vendor-motion-L8D9Iqni.js";
import { m as N, z as L } from "./vendor-lucide-BB1m8XvN.js";
const O = [0.4, 0, 0.2, 1], T = { duration: 0.24, ease: O }, j = r.createContext(null);
function w({ value: t, children: s }) {
  return e.jsx(j.Provider, { value: t, children: s });
}
function _() {
  const t = r.useContext(j);
  if (!t) throw new Error("SettingsCollapsible components must be used within SettingsCollapsibleContainer.");
  return t;
}
function K() {
  return r.useContext(j);
}
function z({ as: t = "div", children: s, id: n, contentKey: c, defaultOpen: o = false, open: a, onOpenChange: i, className: m = "", tabIndex: p, onSubmit: f, "aria-labelledby": g }) {
  const [d, S] = r.useState(o), u = a !== void 0, l = u ? a : d, C = r.useCallback((x) => {
    const v = typeof x == "function" ? x(l) : x;
    u || S(v), i == null ? void 0 : i(v);
  }, [u, i, l]), h = r.useCallback(() => {
    C((x) => !x);
  }, [C]), y = c ?? (typeof n == "string" ? n : "settings-collapse"), k = r.useMemo(() => ({ open: l, setOpen: C, toggle: h, contentKey: y }), [y, l, C, h]), b = { ...n ? { id: n } : {}, ...p !== void 0 ? { tabIndex: p } : {}, ...g ? { "aria-labelledby": g } : {}, className: m };
  return e.jsx(w, { value: k, children: t === "form" ? e.jsx("form", { ...b, onSubmit: f, children: s }) : t === "section" ? e.jsx("section", { ...b, children: s }) : e.jsx("div", { ...b, children: s }) });
}
function F({ open: t, contentKey: s, children: n, className: c = "" }) {
  const o = K(), a = t ?? (o == null ? void 0 : o.open) ?? false, i = s ?? (o == null ? void 0 : o.contentKey) ?? "settings-collapse";
  return e.jsx(A, { initial: false, children: a ? e.jsx(E.div, { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: T, className: `overflow-hidden ${c}`, children: n }, i) : null });
}
const P = "flex w-full items-center gap-2 text-left", U = "text-sm font-bold text-gray-700 dark:text-odp-fgStrong";
function I({ children: t, subtitle: s, className: n = P, titleClassName: c = U, titleAs: o = "h3", chevronSize: a = 16, id: i, controlsId: m, align: p = "center", unstyled: f = false, trailing: g = null }) {
  const { open: d, toggle: S } = _(), u = p === "start" ? "items-start" : "items-center", l = p === "start" ? "mt-0.5" : "";
  return e.jsxs("button", { type: "button", onClick: S, "aria-expanded": d, ...i ? { id: i } : {}, ...m ? { "aria-controls": m } : {}, className: [n, u].filter(Boolean).join(" "), children: [d ? e.jsx(N, { size: a, className: `${l} shrink-0 text-gray-500 dark:text-odp-muted` }) : e.jsx(L, { size: a, className: `${l} shrink-0 text-gray-500 dark:text-odp-muted` }), s ? e.jsxs("span", { className: "min-w-0", children: [f ? t : e.jsx(o, { className: `block ${c}`, children: t }), e.jsx("span", { className: "mt-0.5 block text-[10px] leading-snug text-gray-500 dark:text-odp-muted", children: s })] }) : f ? t : e.jsx(o, { className: c, children: t }), g] });
}
export {
  z as S,
  I as a,
  F as b
};
