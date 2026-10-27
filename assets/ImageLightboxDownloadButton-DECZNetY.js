import { r as n, j as e } from "./vendor-react-BPvvDyqO.js";
import { g as y } from "./Kbd-Cnuyx3cZ.js";
import { c as j, i as C, d as k } from "./downloadImageSrc-CZMxKG_A.js";
import { j as D, k as v, D as L } from "./vendor-lucide-BnjwTb2j.js";
import { v as f, w as h, x as p, y as b, z as w, A as g } from "./vendor-radix-8kjzYRrX.js";
function R({ src: a, className: d = "" }) {
  const [s, r] = n.useState("idle"), i = n.useRef(a);
  i.current = a;
  const t = n.useRef(null), u = () => {
    const o = i.current;
    o && (t.current && clearTimeout(t.current), r("idle"), j(o).then(() => {
      r("done"), t.current = setTimeout(() => r("idle"), 1600);
    }).catch(() => {
      r("error"), t.current = setTimeout(() => r("idle"), 2e3);
    }));
  };
  n.useEffect(() => {
    const o = (l) => {
      if (!C(l)) return;
      const c = l.target;
      if (c instanceof HTMLElement) {
        const m = c.tagName.toLowerCase();
        if (m === "input" || m === "textarea" || c.isContentEditable) return;
      }
      l.preventDefault(), l.stopPropagation(), u();
    };
    return window.addEventListener("keydown", o, true), () => {
      window.removeEventListener("keydown", o, true), t.current && clearTimeout(t.current);
    };
  }, []);
  const x = s === "done" ? "\uBCF5\uC0AC\uB428" : s === "error" ? "\uBCF5\uC0AC \uC2E4\uD328" : `\uC774\uBBF8\uC9C0 \uBCF5\uC0AC (${y()}+C)`;
  return e.jsx(f, { delayDuration: 250, skipDelayDuration: 0, children: e.jsxs(h, { children: [e.jsx(p, { asChild: true, children: e.jsx("button", { type: "button", className: `${d} inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80`, "aria-label": x, onClick: (o) => {
    o.stopPropagation(), u();
  }, children: s === "done" ? e.jsx(D, { size: 18 }) : e.jsx(v, { size: 18 }) }) }), e.jsx(b, { children: e.jsxs(w, { side: "bottom", sideOffset: 6, className: "z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow", children: [x, e.jsx(g, { className: "fill-neutral-900" })] }) })] }) });
}
function S({ src: a, className: d = "" }) {
  const [s, r] = n.useState(false), i = () => {
    !a || s || (r(true), k(a).catch((t) => {
      console.error("Image download failed:", t);
    }).finally(() => r(false)));
  };
  return e.jsx(f, { delayDuration: 250, skipDelayDuration: 0, children: e.jsxs(h, { children: [e.jsx(p, { asChild: true, children: e.jsx("button", { type: "button", className: `${d} inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 disabled:opacity-50`, "aria-label": "\uC774\uBBF8\uC9C0 \uB2E4\uC6B4\uB85C\uB4DC", disabled: s, onClick: (t) => {
    t.stopPropagation(), i();
  }, children: e.jsx(L, { size: 18 }) }) }), e.jsx(b, { children: e.jsxs(w, { side: "bottom", sideOffset: 6, className: "z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow", children: ["\uC774\uBBF8\uC9C0 \uB2E4\uC6B4\uB85C\uB4DC", e.jsx(g, { className: "fill-neutral-900" })] }) })] }) });
}
export {
  S as I,
  R as a
};
