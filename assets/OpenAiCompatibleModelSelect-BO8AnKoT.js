import { r as t, j as e, f as xe } from "./vendor-react-BPvvDyqO.js";
import { l as be, i as ne } from "./geminiClient-B6xcTe0y.js";
import { be as pe, bf as Y, bg as ge, bh as he, bi as ye, bj as Me, bk as ke, bl as ve, bm as Z, bn as ee, bo as Le, bp as je, bq as Ne, br as we, bs as te, bt as re, p as Ee, bu as Ce } from "./index-DD9YmsNw.js";
import { L as U, N as J, D as Se, C as Ve, J as Ie, K as Ae } from "./vendor-lucide-Bo8me5Pj.js";
import { b as H } from "./bootSplash-Z2krRgC9.js";
import { r as O, L as K, l as Re, w as oe, g as De } from "./localLlmModelAliases-EglLH-3U.js";
import { l as Oe } from "./openaiCompatibleClient-j-YmhId7.js";
import { n as Be, E as Fe, P as _e, C as Pe } from "./vendor-radix-ClWfNC7b.js";
let $ = null, se = null, P = null;
function Te(l) {
  return ne(l.id) ? `${l.displayName} (\uBB34\uB8CC \uD50C\uB79C \uBBF8\uC9C0\uC6D0)` : l.displayName;
}
function G(l, d) {
  const n = /* @__PURE__ */ new Map();
  for (const i of l) n.set(i.id, i);
  return d && !n.has(d) && n.set(d, { id: d, displayName: d }), [...n.values()].sort((i, a) => i.displayName.localeCompare(a.displayName, "ko"));
}
function We({ getGeminiApiKey: l, profileId: d = "gemini", value: n, onChange: i, autoLoad: a = false, className: u = "" }) {
  var _a;
  const m = t.useRef(l);
  m.current = l;
  const x = t.useRef(n);
  t.useEffect(() => {
    x.current = n;
  }, [n]);
  const [C, f] = t.useState(() => G(Y, n)), [V, j] = t.useState(false), [A, h] = t.useState(""), N = t.useCallback(async ({ force: s = false } = {}) => {
    var _a2;
    const p = m.current;
    if (typeof p != "function") {
      h("API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
      return;
    }
    const M = (_a2 = await Promise.resolve(p())) == null ? void 0 : _a2.trim();
    if (!M) {
      h("API \uD0A4\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
      return;
    }
    j(true), h("");
    try {
      if (!s && $ && se === M) {
        f(G($, x.current));
        return;
      }
      if (P && P.key === M) {
        const I = await P.promise;
        f(G(I, x.current));
        return;
      }
      const b = pe(d, p, (I) => be(I));
      P = { key: M, promise: b };
      const k = await b;
      $ = k, se = M, f(G(k, x.current));
    } catch (b) {
      h((b == null ? void 0 : b.message) || "\uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."), f(G(Y, x.current));
    } finally {
      j(false), P && P.key === M && (P = null);
    }
  }, [d]);
  t.useEffect(() => {
    f((s) => G(s, n));
  }, [n]), t.useEffect(() => {
    a && N();
  }, [a, N]);
  const w = (s) => {
    ge(s), i == null ? void 0 : i(s);
  }, y = C.some((s) => s.id === n) ? n : ((_a = C[0]) == null ? void 0 : _a.id) ?? "";
  return e.jsxs("div", { className: u, children: [e.jsxs("div", { className: "flex items-center gap-2", children: [e.jsx("select", { value: y, onChange: (s) => w(s.target.value), className: "min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft", children: C.map((s) => e.jsx("option", { value: s.id, children: Te(s) }, s.id)) }), e.jsxs("button", { type: "button", onClick: () => {
    N({ force: true });
  }, disabled: V, className: "inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft", title: "AI Studio \uBAA8\uB378 \uBAA9\uB85D \uC0C8\uB85C\uACE0\uCE68", children: [V ? e.jsx(U, { size: 14, className: "animate-spin" }) : e.jsx(J, { size: 14 }), "\uC0C8\uB85C\uACE0\uCE68"] })] }), A && e.jsx("p", { className: "mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300", children: A }), ne(n) && e.jsx("p", { className: "mt-1.5 text-[11px] text-amber-700 dark:text-amber-300", children: "\uC774 \uBAA8\uB378\uC740 \uBB34\uB8CC \uD50C\uB79C\uC5D0\uC11C \uD560\uB2F9\uB7C9\uC774 0\uC77C \uC218 \uC788\uC2B5\uB2C8\uB2E4. Gemini 2.0 Flash \uC0AC\uC6A9\uC744 \uAD8C\uC7A5\uD569\uB2C8\uB2E4." })] });
}
function le({ value: l, onChange: d, onPick: n, onInputBlur: i, options: a, loading: u = false, placeholder: m = "", className: x = "", maxItems: C = 30, aliasScope: f }) {
  const [V, j] = t.useState(false), [A, h] = t.useState(false), [N, w] = t.useState(""), y = t.useRef(null), s = t.useMemo(() => O(f, l, a), [f, a, l]), p = t.useMemo(() => a.find((r) => r.id === s), [s, a]), M = (p == null ? void 0 : p.displayName) || s, b = A ? N : M, k = String(b || "").trim().toLowerCase(), I = t.useCallback((r) => {
    const o = O(f, r, a);
    return o !== s && (d == null ? void 0 : d(o)), o;
  }, [f, s, d, a]), S = t.useMemo(() => (k ? a.filter((o) => {
    const T = (o.id || "").toLowerCase(), X = (o.displayName || "").toLowerCase();
    return T.includes(k) || X.includes(k);
  }) : [...a]).slice(0, Math.max(1, C)), [a, k, C]), g = t.useCallback((r) => {
    const o = O(f, r, a);
    w(o), h(false), o !== s && (d == null ? void 0 : d(o)), n == null ? void 0 : n(o), j(false);
  }, [f, s, d, n, a]), v = t.useCallback((r) => {
    var _a;
    return r instanceof Node ? !!((_a = y.current) == null ? void 0 : _a.contains(r)) : false;
  }, []), E = !u && (k ? S.length === 0 : a.length === 0), F = k ? "\uC77C\uCE58\uD558\uB294 \uBAA8\uB378\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBAA8\uB378 \uBAA9\uB85D\uC774 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.";
  return e.jsxs(Be, { open: V, onOpenChange: j, modal: false, children: [e.jsx(Fe, { asChild: true, children: e.jsx("input", { ref: y, type: "text", autoComplete: "off", spellCheck: false, value: b, onFocus: () => {
    h(true), w(s), j(true);
  }, onChange: (r) => {
    w(r.target.value), V || j(true);
  }, onBlur: () => {
    h(false), I(N), w(""), i == null ? void 0 : i();
  }, placeholder: m, "aria-label": (p == null ? void 0 : p.displayName) && p.displayName !== s ? "\uBAA8\uB378" : "\uBAA8\uB378 ID", "aria-expanded": V, "aria-haspopup": "listbox", className: `min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft ${x}`.trim() }) }), e.jsx(_e, { children: e.jsx(Pe, { className: "z-100050 max-h-72 min-w-48 overflow-auto rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", side: "bottom", align: "start", sideOffset: 4, onOpenAutoFocus: (r) => r.preventDefault(), onCloseAutoFocus: (r) => r.preventDefault(), onFocusOutside: (r) => {
    (document.activeElement === y.current || v(r.target)) && r.preventDefault();
  }, onPointerDownOutside: (r) => {
    v(r.target) && r.preventDefault();
  }, onInteractOutside: (r) => {
    v(r.target) && r.preventDefault();
  }, children: u ? e.jsx("div", { className: "px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted", children: "\uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026" }) : E ? e.jsx("div", { className: "cursor-default select-none rounded px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted", children: F }) : e.jsx("ul", { role: "listbox", "aria-label": "\uBAA8\uB378 \uBAA9\uB85D", children: S.map((r) => e.jsx("li", { children: e.jsx("button", { type: "button", role: "option", "aria-selected": r.id === s, onMouseDown: (o) => o.preventDefault(), onClick: () => g(r.id), className: "flex w-full cursor-pointer select-none items-center rounded px-2 py-1.5 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg", children: r.displayName }) }, r.id)) }) }) })] });
}
function Xe({ error: l, modelId: d = "", suggestRedownload: n = true, className: i = "" }) {
  const a = xe(), u = d.trim(), m = n && he(l), x = () => {
    ye(u || void 0), a(Me);
  };
  return e.jsxs("div", { className: i, children: [e.jsx("p", { className: "text-[11px] text-red-600 dark:text-red-400", children: l }), m ? e.jsxs("div", { className: "mt-1.5 rounded border border-amber-200 bg-amber-50/80 p-2 dark:border-amber-900/50 dark:bg-amber-950/30", children: [e.jsxs("p", { className: "text-[11px] leading-relaxed text-amber-900 dark:text-amber-100", children: ["\uCE90\uC2DC\uAC00 \uC190\uC0C1\uB418\uC5C8\uAC70\uB098 \uB2E4\uC6B4\uB85C\uB4DC\uAC00 \uB04A\uACBC\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uBAA8\uB378\uC744", " ", e.jsx("strong", { className: "font-semibold", children: "\uB2E4\uC2DC \uB2E4\uC6B4\uB85C\uB4DC" }), "\uD55C \uB4A4 Load model\uC744 \uC2E4\uD589\uD574 \uBCF4\uC138\uC694.", u ? e.jsxs(e.Fragment, { children: [e.jsx("br", {}), e.jsxs("span", { className: "text-amber-800/90 dark:text-amber-200/90", children: ["\uBAA8\uB378: ", u] })] }) : null] }), e.jsxs("button", { type: "button", onClick: x, className: "mt-1.5 inline-flex items-center gap-1 rounded border border-amber-300 bg-white px-2 py-1 text-[11px] font-medium text-amber-900 hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100 dark:hover:bg-amber-950/70", children: [e.jsx(Se, { size: 12, "aria-hidden": true }), "\uC124\uC815\uC5D0\uC11C \uBAA8\uB378 \uB2E4\uC2DC \uB2E4\uC6B4\uB85C\uB4DC"] })] }) : null] });
}
function ae(l, d) {
  const n = /* @__PURE__ */ new Set();
  for (const i of l) {
    const a = String(i.repoId || i.id || "").trim();
    a && n.add(a);
  }
  for (const i of d) {
    const a = String(i || "").trim();
    a && n.add(a);
  }
  return oe("mlx-vlm", [...n].sort((i, a) => i.localeCompare(a)).map((i) => ({ id: i, displayName: i })));
}
function Ye({ value: l, onChange: d, autoLoad: n = true, autoLoadModelOnSelect: i = false, className: a = "" }) {
  const [u, m] = t.useState([]), [x, C] = t.useState(false), [f, V] = t.useState(false), [j, A] = t.useState(false), [h, N] = t.useState(""), [w, y] = t.useState(""), [s, p] = t.useState(""), [M, b] = t.useState(false), [k, I] = t.useState(false), S = t.useRef(0), g = t.useMemo(() => O("mlx-vlm", l, u), [u, l]), v = t.useCallback((c) => {
    d == null ? void 0 : d(O("mlx-vlm", c, u));
  }, [d, u]);
  t.useEffect(() => {
    !d || !g || g === l.trim() || d(g);
  }, [g, d, l]);
  const E = t.useCallback(async () => {
    if (H()) {
      C(true), N("");
      try {
        const c = ke(), [{ models: L }, D] = await Promise.all([ve(), Z(c)]);
        p(D.models[0] || ""), b(ee());
        const R = ae(L, [c.selectedModelId, ...D.models]), z = O("mlx-vlm", l, R);
        m(ae(L, [c.selectedModelId, z, ...D.models])), !L.length && !c.selectedModelId.trim() && !z.trim() && N("\uC124\uCE58\uB41C MLX \uBAA8\uB378\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815 > MLX-VLM\uC5D0\uC11C \uBAA8\uB378\uC744 \uCD94\uAC00\uD558\uC138\uC694.");
      } catch (c) {
        N(c instanceof Error ? c.message : "MLX \uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        C(false);
      }
    }
  }, [l]), F = t.useCallback(async (c) => {
    if (!H()) return;
    const L = String(c || "").trim();
    if (!L) return;
    const D = await Z();
    if (D.running && D.models[0] === L) {
      p(L), y("");
      return;
    }
    const R = S.current + 1;
    S.current = R, V(true), y("");
    try {
      const z = await Le(L);
      if (S.current !== R) return;
      p(z.model), je(), await E();
    } catch (z) {
      if (S.current !== R) return;
      y(Ne(z).message);
    } finally {
      S.current === R && V(false);
    }
  }, [E]), r = t.useCallback(async () => {
    if (H()) {
      A(true), y("");
      try {
        await we(), p(""), b(false), await E();
      } catch (c) {
        y(c instanceof Error ? c.message : "MLX-VLM \uBAA8\uB378\uC744 \uC5B8\uB85C\uB4DC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        A(false);
      }
    }
  }, [E]), o = t.useCallback((c) => {
    i && F(c);
  }, [i, F]);
  t.useEffect(() => {
    n && E();
  }, [n, E]), t.useEffect(() => {
    const c = () => {
      E();
    };
    return window.addEventListener(te, c), window.addEventListener(K, c), () => {
      window.removeEventListener(te, c), window.removeEventListener(K, c);
    };
  }, [E]), t.useEffect(() => {
    const c = (L) => {
      var _a;
      const D = (_a = L.detail) == null ? void 0 : _a.modelId;
      if (D == null) {
        p(""), b(false);
        return;
      }
      const R = String(D).trim();
      p(R), b(ee()), !l.trim() && R && (d == null ? void 0 : d(R));
    };
    return window.addEventListener(re, c), () => window.removeEventListener(re, c);
  }, [d, l]), t.useEffect(() => {
    !s || l.trim() || (d == null ? void 0 : d(s));
  }, [s, d, l]), t.useEffect(() => {
    if (!i || x || f) return;
    const c = g.trim();
    c && u.some((L) => L.id === c) && o(c);
  }, [i, x, f, o, u, g]);
  const T = t.useCallback((c) => {
    const L = O("mlx-vlm", c, u);
    o(L);
  }, [o, u]), X = t.useCallback(() => {
    o(g);
  }, [g, o]), de = t.useCallback(() => {
    I(false), r();
  }, [r]);
  if (!H()) return e.jsx("p", { className: "text-[11px] text-gray-500 dark:text-odp-muted", children: "MLX-VLM\uC740 Tauri macOS \uBE4C\uB4DC\uC5D0\uC11C\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." });
  const ie = x || f || j, _ = g.trim(), B = s.trim(), Q = !!(_ && B && _ === B), W = !!(B && _ && B !== _), ce = !!(B && (Q || W)), q = Q && !!(B && M), me = () => {
    if (q) {
      I(true);
      return;
    }
    F(_);
  }, ue = j || !q && !_, fe = q ? "Unload MLX model" : "Load MLX model";
  return e.jsxs("div", { className: a, children: [e.jsxs("div", { className: "flex items-center gap-2", children: [e.jsx(le, { value: g, options: u, loading: x, maxItems: 200, aliasScope: "mlx-vlm", onChange: v, onPick: T, onInputBlur: X, placeholder: "MLX model id", className: "min-w-0 flex-1" }), e.jsx("button", { type: "button", onClick: me, disabled: ue, "aria-label": fe, className: ["group inline-flex shrink-0 items-center gap-1 rounded border px-2 py-1.5 text-[11px] font-medium", "disabled:cursor-not-allowed disabled:opacity-50", q ? "border-emerald-300 bg-emerald-50 text-emerald-800 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:border-odp-borderStrong dark:hover:bg-odp-bgSoft dark:hover:text-odp-muted" : "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/60"].join(" "), children: j ? e.jsxs(e.Fragment, { children: [e.jsx(U, { size: 14, className: "animate-spin", "aria-hidden": true }), "\uC5B8\uB85C\uB4DC \uC911\u2026"] }) : f ? e.jsxs(e.Fragment, { children: [e.jsx(U, { size: 14, className: "animate-spin", "aria-hidden": true }), "\uB85C\uB4DC \uC911\u2026"] }) : q ? e.jsxs(e.Fragment, { children: [e.jsxs("span", { className: "inline-flex items-center gap-1 group-hover:hidden", children: [e.jsx(Ve, { size: 14, "aria-hidden": true }), "\uB85C\uB4DC\uB428"] }), e.jsxs("span", { className: "hidden items-center gap-1 group-hover:inline-flex", children: [e.jsx(Ie, { size: 14, "aria-hidden": true }), "\uC5B8\uB85C\uB4DC"] })] }) : e.jsxs(e.Fragment, { children: [e.jsx(Ae, { size: 14, "aria-hidden": true }), "\uB85C\uB4DC"] }) }), e.jsx("button", { type: "button", onClick: () => {
    E();
  }, disabled: ie, "aria-label": "Refresh MLX models", className: "inline-flex shrink-0 items-center justify-center rounded border border-gray-300 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: x ? e.jsx(U, { size: 14, className: "animate-spin" }) : e.jsx(J, { size: 14 }) })] }), h ? e.jsx("p", { className: "mt-1 text-[11px] text-amber-700 dark:text-amber-300", children: h }) : null, w ? e.jsx(Xe, { className: "mt-1", error: w, modelId: _ }) : null, f ? e.jsxs("p", { className: "mt-1 inline-flex items-center gap-1 text-[11px] text-gray-600 dark:text-odp-muted", children: [e.jsx(U, { size: 12, className: "animate-spin", "aria-hidden": true }), "\uBAA8\uB378 \uB85C\uB4DC \uC911\u2026"] }) : ce ? e.jsxs("div", { className: "mt-1 space-y-0.5", children: [e.jsxs("p", { className: "text-[11px] text-emerald-700 dark:text-emerald-300", children: ["\uB85C\uB4DC\uB428 \xB7 ", Re("mlx-vlm", B)] }), W ? e.jsx("p", { className: "text-[11px] text-amber-700 dark:text-amber-300", children: "\uC120\uD0DD\uD55C \uBAA8\uB378\uACFC \uB2E4\uB985\uB2C8\uB2E4. \uB85C\uB4DC \uBC84\uD2BC\uC73C\uB85C \uC804\uD658\uD558\uC138\uC694." }) : null] }) : B && !M ? e.jsx("p", { className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted", children: "\uC678\uBD80 MLX-VLM \uC6CC\uCEE4\uAC00 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4. \uC571\uC5D0\uC11C \uC2DC\uC791\uD55C \uBAA8\uB378\uB9CC \uC5B8\uB85C\uB4DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }) : e.jsx("p", { className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted", children: "\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB85C\uB4DC \uBC84\uD2BC\uC744 \uB20C\uB7EC \uBA54\uBAA8\uB9AC\uC5D0 \uC62C\uB9AC\uC138\uC694." }), e.jsx(Ee, { isOpen: k, title: "MLX-VLM \uBAA8\uB378 \uC5B8\uB85C\uB4DC", message: "\uB85C\uCEEC MLX-VLM \uC6CC\uCEE4\uC5D0\uC11C \uBAA8\uB378\uC744 \uBA54\uBAA8\uB9AC\uC5D0\uC11C \uB0B4\uB9B4\uAE4C\uC694?", confirmLabel: "\uC5B8\uB85C\uB4DC", cancelLabel: "\uCDE8\uC18C", variant: "danger", onConfirm: de, onCancel: () => I(false) })] });
}
function Ze({ getBaseUrl: l, getApiKey: d, value: n, onChange: i, autoLoad: a = false, reloadKey: u = "", aliasScope: m, listModels: x, emptyBaseUrlMessage: C = "Endpoint URL\uC744 \uBA3C\uC800 \uC785\uB825\uD558\uC138\uC694.", placeholder: f = "\uBAA8\uB378 ID \uC9C1\uC811 \uC785\uB825 (\uC608: gpt-4o-mini)", helpText: V = "\uC0C8\uB85C\uACE0\uCE68\uC73C\uB85C \uC11C\uBC84 \uBAA8\uB378\uC744 \uAC00\uC838\uC624\uAC70\uB098, \uBAA8\uB378 ID\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694.", className: j = "" }) {
  const A = t.useRef(l), h = t.useRef(d), N = t.useRef(x);
  A.current = l, h.current = d, N.current = x;
  const [w, y] = t.useState([]), [s, p] = t.useState(false), [M, b] = t.useState(""), [k, I] = t.useState(0), S = t.useCallback(async () => {
    var _a, _b;
    const r = (_a = await Promise.resolve(A.current())) == null ? void 0 : _a.trim();
    if (!r) {
      b(C);
      return;
    }
    p(true), b("");
    try {
      const o = ((_b = await Promise.resolve(h.current())) == null ? void 0 : _b.trim()) ?? "", T = N.current, X = T ? await T({ baseUrl: r, apiKey: o }) : await Oe(r, o);
      y(X), X.length || b("\uBAA8\uB378 \uBAA9\uB85D\uC774 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4. \uBAA8\uB378 ID\uB97C \uC9C1\uC811 \uC785\uB825\uD558\uC138\uC694.");
    } catch (o) {
      b(o instanceof Error ? o.message : "\uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    } finally {
      p(false);
    }
  }, [C]);
  t.useEffect(() => {
    y([]), b("");
  }, [u]), t.useEffect(() => {
    a && S();
  }, [a, S, u]), t.useEffect(() => {
    if (!m) return;
    const r = () => I((o) => o + 1);
    return window.addEventListener(K, r), () => window.removeEventListener(K, r);
  }, [m]);
  const g = t.useMemo(() => m ? oe(m, w) : w, [m, k, w]), v = t.useMemo(() => O(m, n, g), [m, g, n]), E = t.useMemo(() => {
    if (!m) return "";
    const r = v;
    return r ? De(m, r) : "";
  }, [m, k, v]), F = (r) => {
    const o = O(m, r, g);
    Ce(o), i == null ? void 0 : i(o);
  };
  return t.useEffect(() => {
    !i || !v || v === n.trim() || i(v);
  }, [v, i, n]), e.jsxs("div", { className: j, children: [e.jsxs("div", { className: "flex items-center gap-2", children: [e.jsx(le, { value: v, onChange: F, options: g, loading: s, ...m ? { aliasScope: m } : {}, placeholder: f }), e.jsxs("button", { type: "button", onClick: () => {
    S();
  }, disabled: s, className: "inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft", "aria-label": "\uBAA8\uB378 \uBAA9\uB85D \uC0C8\uB85C\uACE0\uCE68", children: [s ? e.jsx(U, { size: 14, className: "animate-spin" }) : e.jsx(J, { size: 14 }), "\uC0C8\uB85C\uACE0\uCE68"] })] }), E ? e.jsxs("p", { className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted", children: ["\uC6D0\uBCF8 ID \xB7 ", v] }) : null, e.jsx("p", { className: "mt-1.5 text-[11px] text-gray-500 dark:text-odp-muted", children: V }), M ? e.jsx("p", { className: "mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300", children: M }) : null] });
}
export {
  We as G,
  Ye as M,
  Ze as O,
  le as a
};
