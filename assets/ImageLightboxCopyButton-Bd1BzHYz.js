import { r as n, j as e } from "./vendor-react-BPvvDyqO.js";
import { g as f } from "./Kbd-Cnuyx3cZ.js";
import { c as x, i as h } from "./copyImageToClipboard-CSIFGHOw.js";
import { C as g, a as b } from "./vendor-lucide-DBE8vF92.js";
import { P as w, n as y, T as C, p as j, C as T, A as k } from "./vendor-radix-D1Cm_mSM.js";
function P({ src: c, className: p = "absolute right-14 top-3 z-2" }) {
  const [a, o] = n.useState("idle"), u = n.useRef(c);
  u.current = c;
  const r = n.useRef(null), l = () => {
    const t = u.current;
    t && (r.current && clearTimeout(r.current), o("idle"), x(t).then(() => {
      o("done"), r.current = setTimeout(() => o("idle"), 1600);
    }).catch(() => {
      o("error"), r.current = setTimeout(() => o("idle"), 2e3);
    }));
  };
  n.useEffect(() => {
    const t = (s) => {
      if (!h(s)) return;
      const i = s.target;
      if (i instanceof HTMLElement) {
        const m = i.tagName.toLowerCase();
        if (m === "input" || m === "textarea" || i.isContentEditable) return;
      }
      s.preventDefault(), s.stopPropagation(), l();
    };
    return window.addEventListener("keydown", t, true), () => {
      window.removeEventListener("keydown", t, true), r.current && clearTimeout(r.current);
    };
  }, []);
  const d = a === "done" ? "\uBCF5\uC0AC\uB428" : a === "error" ? "\uBCF5\uC0AC \uC2E4\uD328" : `\uC774\uBBF8\uC9C0 \uBCF5\uC0AC (${f()}+C)`;
  return e.jsx(w, { delayDuration: 250, skipDelayDuration: 0, children: e.jsxs(y, { children: [e.jsx(C, { asChild: true, children: e.jsx("button", { type: "button", className: `${p} inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80`, "aria-label": d, onClick: (t) => {
    t.stopPropagation(), l();
  }, children: a === "done" ? e.jsx(g, { size: 18 }) : e.jsx(b, { size: 18 }) }) }), e.jsx(j, { children: e.jsxs(T, { side: "bottom", sideOffset: 6, className: "z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow", children: [d, e.jsx(k, { className: "fill-neutral-900" })] }) })] }) });
}
export {
  P as I
};
