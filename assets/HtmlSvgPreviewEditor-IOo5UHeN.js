import { r as l, j as e } from "./vendor-react-kfkzeLNk.js";
import T from "./MonacoTextEditor-nPxXEzNf.js";
import { E as N, F as _, T as W } from "./index-BnDr9Xzt.js";
import { E as V, F as D, C as P } from "./vendor-lucide-C7LgkNTS.js";
import "./vendor-monaco-XCd7mX2R.js";
import "./vendor-md-editor-CX3gheyO.js";
import "./vendor-aws-DeZVuVOC.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-jUlp7ZOS.js";
import "./vendor-radix-BHltGsrZ.js";
import "./vendor-google-genai-BXoTgYIl.js";
const n = ["dual", "editor", "preview"], z = "s3haim_html_svg_preview_width", R = 280;
function C(i, t) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  html, body {
    margin: 0;
    width: 100%;
    height: 100%;
    background: ${t === "dark" ? "#0f1419" : "#ffffff"};
    color: ${t === "dark" ? "#e7e9ea" : "#111827"};
  }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    box-sizing: border-box;
    padding: 1rem;
  }
  body > svg {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
</style>
</head>
<body>${i ?? ""}</body>
</html>`;
}
function w(i, t, r) {
  return t === "svg" ? C(i, r) : i ?? "";
}
const b = { dual: { label: "\uC591\uBA74\uBCF4\uAE30", icon: P, title: "\uC591\uBA74\uBCF4\uAE30 (\uB2E4\uC74C: \uD14D\uC2A4\uD2B8\uC5D0\uB514\uD130)" }, editor: { label: "\uD14D\uC2A4\uD2B8\uC5D0\uB514\uD130", icon: D, title: "\uD14D\uC2A4\uD2B8\uC5D0\uB514\uD130 (\uB2E4\uC74C: \uBBF8\uB9AC\uBCF4\uAE30)" }, preview: { label: "\uBBF8\uB9AC\uBCF4\uAE30", icon: V, title: "\uBBF8\uB9AC\uBCF4\uAE30 (\uB2E4\uC74C: \uC591\uBA74\uBCF4\uAE30)" } };
function U({ value: i = "", mode: t = "html", theme: r = "light", readOnly: c = false, onChange: x, onSave: g }) {
  const [o, p] = l.useState("dual"), [m, u] = l.useState(() => w(i, t, r)), { width: v, isResizing: E, handleProps: y } = N({ storageKey: z, defaultWidth: 480, minWidth: 200, maxWidth: 960, edge: "right" }), j = t === "svg" ? "xml" : "html", a = o === "dual" || o === "editor", h = o === "dual" || o === "preview";
  l.useEffect(() => {
    const d = window.setTimeout(() => {
      u(w(i, t, r));
    }, R);
    return () => window.clearTimeout(d);
  }, [i, t, r]);
  const S = () => {
    p((d) => {
      const k = n.indexOf(d);
      return n[(k + 1) % n.length];
    });
  }, s = b[o] ?? b.dual, M = s.icon, f = l.useMemo(() => t === "svg" ? "SVG preview" : "HTML preview", [t]);
  return e.jsxs("div", { className: "flex h-full min-h-0 flex-1 flex-col overflow-hidden", children: [e.jsxs("div", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-gray-50/90 px-3 py-1.5 dark:border-odp-borderSoft dark:bg-odp-bgSoft/90", role: "toolbar", "aria-label": t === "svg" ? "SVG editor" : "HTML editor", children: [e.jsx("span", { className: "text-xs font-medium text-gray-600 dark:text-odp-muted", children: t === "svg" ? "SVG" : "HTML" }), e.jsxs(_, { type: "button", variant: "secondary", size: "sm", onClick: S, title: s.title, "aria-label": s.title, children: [e.jsx(M, { size: 14, "aria-hidden": true }), e.jsxs("span", { className: "hidden sm:inline", children: [" ", s.label] })] })] }), e.jsxs("div", { className: "flex min-h-0 flex-1 overflow-hidden", children: [a && e.jsx("div", { className: "flex min-h-0 min-w-0 flex-1 flex-col p-2", children: e.jsx(T, { value: i, language: j, theme: r, readOnly: c, onChange: x, onSave: g }) }), a && h && e.jsxs("div", { className: "relative shrink-0 border-l border-gray-200 dark:border-odp-borderSoft", style: { width: v }, children: [e.jsx(W, { handleProps: y, isResizing: E, label: "Resize preview panel" }), e.jsx("iframe", { title: f, srcDoc: m, sandbox: "allow-scripts allow-forms allow-modals", className: "h-full w-full border-0 bg-white dark:bg-odp-bg" })] }), !a && h && e.jsx("div", { className: "min-h-0 min-w-0 flex-1 overflow-hidden", children: e.jsx("iframe", { title: f, srcDoc: m, sandbox: "allow-scripts allow-forms allow-modals", className: "h-full w-full border-0 bg-white dark:bg-odp-bg" }) })] })] });
}
export {
  U as default
};
