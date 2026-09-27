import { j as r } from "./vendor-react-BDjpSibw.js";
function i({ children: e, className: t = "" }) {
  return r.jsx("kbd", { className: ["inline-flex shrink-0 min-w-7 items-center justify-center whitespace-nowrap rounded-md border border-b-2 border-gray-300 bg-linear-to-b from-white to-gray-100 px-2 py-1 font-mono text-xs font-semibold leading-none text-ink shadow-[0_1px_0_rgba(15,23,42,0.06)] dark:border-odp-borderStrong dark:from-odp-surface dark:to-odp-bgSoft dark:text-odp-fgStrong", t].filter(Boolean).join(" "), children: e });
}
function d({ keys: e, className: t = "" }) {
  return r.jsx("span", { className: `inline-flex max-w-full flex-wrap items-center gap-x-0.5 gap-y-1 ${t}`, children: e.map((o, n) => r.jsxs("span", { className: "inline-flex shrink-0 items-center gap-0.5", children: [n > 0 ? r.jsx("span", { className: "px-0.5 text-xs text-gray-400 dark:text-odp-muted", "aria-hidden": true, children: "+" }) : null, r.jsx(i, { children: o })] }, n)) });
}
function a() {
  if (typeof navigator > "u") return false;
  const e = navigator.platform || "", t = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(e) || /Mac OS/i.test(t);
}
function l() {
  return a() ? "\u2318" : "Ctrl";
}
function f() {
  return a() ? "\u2325" : "Alt";
}
export {
  i as K,
  d as a,
  f as b,
  l as g
};
