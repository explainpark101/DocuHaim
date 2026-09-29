import { r as t, j as e, u as ke } from "./vendor-react-BDjpSibw.js";
import { ag as ve, a2 as F, p as ye, a3 as ee, av as ae, aw as Se, ax as je, ay as we, t as T, az as D, aA as U, aB as H, aC as te, aD as Ce, aE as re, aF as Ee, aG as Me, aH as Ne, aI as Ie, aJ as Ae, aK as Pe, aL as Re, aM as se, aN as ne, j as _e } from "./index-B8271DNI.js";
import { c as Fe } from "./OpenAiCompatibleModelSelect-Bz-odwDm.js";
import { D as Te, L as $, z as le, y as De, H as Oe, J as ze } from "./vendor-lucide-CbEk5sea.js";
import { r as q, L as oe, l as Be, w as Ge } from "./localLlmModelAliases-EglLH-3U.js";
function Xe(l) {
  const [r, o] = t.useState(() => F()), s = t.useMemo(() => {
    var _a;
    return ((_a = ye(l, r)) == null ? void 0 : _a.id) ?? "";
  }, [l, r]), n = t.useCallback((c) => {
    ee(c), o(F());
  }, []), i = t.useCallback(() => {
    o(F());
  }, []);
  return t.useEffect(() => {
    const c = () => o(F());
    return window.addEventListener(ae, c), () => window.removeEventListener(ae, c);
  }, []), t.useEffect(() => {
    s && s !== r && (ee(s), o(s));
  }, [r, s]), [s, n, i];
}
function Qe({ profiles: l, value: r, onChange: o, className: s = "" }) {
  const n = t.useMemo(() => l.map((d) => ({ value: d.id, label: d.kind === "openai-compatible" ? `${d.name} \xB7 OpenAI \uD638\uD658` : d.kind === "mlx-vlm" ? `${d.name} \xB7 MLX-VLM` : d.kind === "llama-cpp" ? `${d.name} \xB7 llama.cpp` : `${d.name} \xB7 Gemini` })), [l]);
  if (!n.length) return e.jsx("p", { className: `text-[11px] text-amber-700 dark:text-amber-300 ${s}`.trim(), children: "\uC800\uC7A5\uB41C \uC81C\uACF5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uCD94\uAC00\uD558\uC138\uC694." });
  const i = n[0], c = n.some((d) => d.value === r) ? r : (i == null ? void 0 : i.value) ?? "";
  return e.jsx(ve, { value: c, onValueChange: o, options: n, placeholder: "\uC81C\uACF5\uC790 \uC120\uD0DD", "aria-label": "AI \uC81C\uACF5\uC790", className: `w-full ${s}`.trim() });
}
function Ve({ error: l, modelId: r = "", suggestRedownload: o = true, className: s = "" }) {
  const n = ke(), i = r.trim(), c = o && Se(l), d = () => {
    je(i || void 0), n(we);
  };
  return e.jsxs("div", { className: s, children: [e.jsx("p", { className: "text-[11px] text-red-600 dark:text-red-400", children: l }), c ? e.jsxs("div", { className: "mt-1.5 rounded border border-amber-200 bg-amber-50/80 p-2 dark:border-amber-900/50 dark:bg-amber-950/30", children: [e.jsxs("p", { className: "text-[11px] leading-relaxed text-amber-900 dark:text-amber-100", children: ["\uBAA8\uB378 \uD30C\uC77C\uC774 \uC5C6\uAC70\uB098 \uC190\uC0C1\uB418\uC5C8\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uBAA8\uB378\uC744", " ", e.jsx("strong", { className: "font-semibold", children: "\uB2E4\uC2DC \uB2E4\uC6B4\uB85C\uB4DC" }), "\uD55C \uB4A4 \uB85C\uB4DC\uB97C \uC2E4\uD589\uD574 \uBCF4\uC138\uC694.", i ? e.jsxs(e.Fragment, { children: [e.jsx("br", {}), e.jsxs("span", { className: "text-amber-800/90 dark:text-amber-200/90", children: ["\uBAA8\uB378: ", i] })] }) : null] }), e.jsxs("button", { type: "button", onClick: d, className: "mt-1.5 inline-flex items-center gap-1 rounded border border-amber-300 bg-white px-2 py-1 text-[11px] font-medium text-amber-900 hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100 dark:hover:bg-amber-950/70", children: [e.jsx(Te, { size: 12, "aria-hidden": true }), "\uC124\uC815\uC5D0\uC11C \uBAA8\uB378 \uB2E4\uC2DC \uB2E4\uC6B4\uB85C\uB4DC"] })] }) : null] });
}
function de(l, r) {
  const o = /* @__PURE__ */ new Set();
  for (const s of l) {
    const n = String(s.repoId || s.id || "").trim();
    n && o.add(n);
  }
  for (const s of r) {
    const n = String(s || "").trim();
    n && o.add(n);
  }
  return Ge("llama-cpp", [...o].sort((s, n) => s.localeCompare(n)).map((s) => ({ id: s, displayName: s })));
}
function A(l, r = D()) {
  const o = String(l || "").trim();
  if (!o) return "";
  const s = r.installedModels.find((i) => i.localPath === o);
  if (s) return s.repoId || s.id;
  const n = r.installedModels.find((i) => i.id === o || i.repoId === o);
  return n ? n.repoId || n.id : o;
}
function We({ value: l, onChange: r, autoLoad: o = true, className: s = "" }) {
  const [n, i] = t.useState([]), [c, d] = t.useState(false), [b, P] = t.useState(false), [O, J] = t.useState(false), [K, z] = t.useState(""), [X, x] = t.useState(""), [B, h] = t.useState(""), [w, g] = t.useState(false), [Q, v] = t.useState(false), [ie, G] = t.useState(false), L = t.useRef(0), y = t.useRef(null), S = t.useMemo(() => q("llama-cpp", l, n), [n, l]), ce = t.useCallback((a) => {
    r == null ? void 0 : r(q("llama-cpp", a, n));
  }, [r, n]);
  t.useEffect(() => {
    !r || !S || S === l.trim() || r(S);
  }, [S, r, l]);
  const m = t.useCallback(async () => {
    if (T()) {
      d(true), z("");
      try {
        const a = D(), f = await U(a), j = f.models[0] || "";
        h(j), g(f.serverRunning || f.loaded), v(H());
        const p = de(a.installedModels, [a.selectedModelId, A(j, a)]), u = q("llama-cpp", l, p);
        i(de(a.installedModels, [a.selectedModelId, u, A(j, a)])), !a.installedModels.length && !a.selectedModelId.trim() && !u.trim() && z("\uC124\uCE58\uB41C llama.cpp \uBAA8\uB378\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815 > llama.cpp\uC5D0\uC11C \uBAA8\uB378\uC744 \uCD94\uAC00\uD558\uC138\uC694.");
      } catch (a) {
        z(a instanceof Error ? a.message : "llama.cpp \uBAA8\uB378 \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        d(false);
      }
    }
  }, [l]), me = t.useCallback(async (a) => {
    var _a;
    if (!T()) return;
    const f = String(a || "").trim();
    if (!f) return;
    const j = D(), p = te(j, f);
    Ce(p);
    const u = re(p);
    if (!u) {
      x("\uC120\uD0DD\uD55C \uBAA8\uB378\uC758 GGUF \uACBD\uB85C\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return;
    }
    const M = await U(p);
    if (M.loaded && M.models[0] === u) {
      h(u), g(true), x(""), r == null ? void 0 : r(f);
      return;
    }
    const N = L.current + 1;
    L.current = N, (_a = y.current) == null ? void 0 : _a.abort();
    const _ = new AbortController();
    y.current = _, P(true), x("");
    try {
      const I = await Ee(p);
      if (!I.available) throw new Error(I.detail || "llama-server\uB97C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uBC14\uC774\uB108\uB9AC \uACBD\uB85C\uB97C \uD655\uC778\uD558\uC138\uC694.");
      if (L.current !== N || (await Me(p, { signal: _.signal }), L.current !== N)) return;
      const V = await U(p);
      h(V.models[0] || u), g(V.serverRunning || V.loaded), v(H()), r == null ? void 0 : r(f), Ne(), await m();
    } catch (I) {
      if (L.current !== N) return;
      if (Ie(I) || _.signal.aborted) {
        x("");
        return;
      }
      x(Ae(I).message);
    } finally {
      y.current === _ && (y.current = null), L.current === N && P(false);
    }
  }, [r, m]), pe = t.useCallback(async () => {
    var _a;
    L.current += 1, (_a = y.current) == null ? void 0 : _a.abort(), y.current = null, x(""), P(true);
    try {
      await Pe(), h(""), g(false), v(false), await m();
    } catch (a) {
      x(a instanceof Error ? a.message : "llama.cpp \uB85C\uB4DC\uB97C \uC911\uB2E8\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
    } finally {
      P(false);
    }
  }, [m]), W = t.useCallback(async () => {
    if (T()) {
      J(true), x("");
      try {
        await Re(), h(""), g(false), v(false), await m();
      } catch (a) {
        x(a instanceof Error ? a.message : "llama.cpp \uC11C\uBC84\uB97C \uC911\uC9C0\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      } finally {
        J(false);
      }
    }
  }, [m]);
  t.useEffect(() => {
    o && m();
  }, [o, m]), t.useEffect(() => {
    const a = () => {
      m();
    };
    return window.addEventListener(se, a), window.addEventListener(oe, a), () => {
      window.removeEventListener(se, a), window.removeEventListener(oe, a);
    };
  }, [m]), t.useEffect(() => {
    const a = (f) => {
      var _a;
      const p = (_a = f.detail) == null ? void 0 : _a.modelPath;
      if (p == null) {
        h(""), g(false), v(false);
        return;
      }
      const u = String(p).trim();
      h(u), g(!!u), v(H());
      const M = A(u);
      !l.trim() && M && (r == null ? void 0 : r(M));
    };
    return window.addEventListener(ne, a), () => window.removeEventListener(ne, a);
  }, [r, l]), t.useEffect(() => {
    const a = A(B);
    !a || l.trim() || (r == null ? void 0 : r(a));
  }, [B, r, l]);
  const ue = t.useCallback(() => {
    G(false), W();
  }, [W]);
  if (!T()) return e.jsx("p", { className: "text-[11px] text-gray-500 dark:text-odp-muted", children: "llama.cpp \uB85C\uCEEC \uC11C\uBC84\uB294 Tauri \uB370\uC2A4\uD06C\uD1B1 \uBE4C\uB4DC\uC5D0\uC11C\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." });
  const fe = c || b || O, C = S.trim(), xe = D(), R = C ? re(te(xe, C)) : "", k = B.trim(), Y = !!(R && k && R === k && w), Z = !!(k && R && k !== R && w), be = !!(k && w && (Y || Z)), E = Y && (w && Q), he = () => {
    if (b) {
      pe();
      return;
    }
    if (E) {
      G(true);
      return;
    }
    me(C);
  }, ge = O || !b && !E && !C, Le = b ? "Abort llama.cpp model load" : E ? "Unload llama.cpp model" : "Load llama.cpp model";
  return e.jsxs("div", { className: s, children: [e.jsxs("div", { className: "flex items-center gap-2", children: [e.jsx(Fe, { value: S, options: n, loading: c, maxItems: 200, aliasScope: "llama-cpp", onChange: ce, placeholder: "llama.cpp model id", className: "min-w-0 flex-1" }), e.jsx("button", { type: "button", onClick: he, disabled: ge, "aria-label": Le, className: ["group inline-flex shrink-0 items-center gap-1 rounded border px-2 py-1.5 text-[11px] font-medium", "disabled:cursor-not-allowed disabled:opacity-50", b ? "border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100 dark:hover:bg-amber-950/60" : E ? "border-sky-300 bg-sky-50 text-sky-800 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200 dark:hover:border-odp-borderStrong dark:hover:bg-odp-bgSoft dark:hover:text-odp-muted" : "border-sky-300 bg-sky-50 text-sky-800 hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200 dark:hover:bg-sky-950/60"].join(" "), children: O ? e.jsxs(e.Fragment, { children: [e.jsx($, { size: 14, className: "animate-spin", "aria-hidden": true }), "\uC5B8\uB85C\uB4DC \uC911\u2026"] }) : b ? e.jsxs(e.Fragment, { children: [e.jsx(le, { size: 14, "aria-hidden": true }), "\uC911\uB2E8"] }) : E ? e.jsxs(e.Fragment, { children: [e.jsxs("span", { className: "inline-flex items-center gap-1 group-hover:hidden", children: [e.jsx(De, { size: 14, "aria-hidden": true }), "\uB85C\uB4DC\uB428"] }), e.jsxs("span", { className: "hidden items-center gap-1 group-hover:inline-flex", children: [e.jsx(le, { size: 14, "aria-hidden": true }), "\uC5B8\uB85C\uB4DC"] })] }) : e.jsxs(e.Fragment, { children: [e.jsx(Oe, { size: 14, "aria-hidden": true }), "\uB85C\uB4DC"] }) }), e.jsx("button", { type: "button", onClick: () => {
    m();
  }, disabled: fe, "aria-label": "Refresh llama.cpp models", className: "inline-flex shrink-0 items-center justify-center rounded border border-gray-300 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: c ? e.jsx($, { size: 14, className: "animate-spin" }) : e.jsx(ze, { size: 14 }) })] }), K ? e.jsx("p", { className: "mt-1 text-[11px] text-amber-700 dark:text-amber-300", children: K }) : null, X ? e.jsx(Ve, { className: "mt-1", error: X, modelId: C }) : null, b ? e.jsxs("p", { className: "mt-1 inline-flex items-center gap-1 text-[11px] text-gray-600 dark:text-odp-muted", children: [e.jsx($, { size: 12, className: "animate-spin", "aria-hidden": true }), "\uC11C\uBC84 \uC2DC\uC791 \uBC0F \uBAA8\uB378 \uB85C\uB4DC \uC911\u2026 \uC911\uB2E8\uD558\uB824\uBA74 \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694."] }) : be ? e.jsxs("div", { className: "mt-1 space-y-0.5", children: [e.jsxs("p", { className: "text-[11px] text-sky-700 dark:text-sky-300", children: ["\uB85C\uB4DC\uB428 \xB7", " ", Be("llama-cpp", A(k) || k)] }), Z ? e.jsx("p", { className: "text-[11px] text-amber-700 dark:text-amber-300", children: "\uC120\uD0DD\uD55C \uBAA8\uB378\uACFC \uB2E4\uB985\uB2C8\uB2E4. \uB85C\uB4DC \uBC84\uD2BC\uC73C\uB85C \uC804\uD658\uD558\uC138\uC694." }) : null] }) : w && !Q ? e.jsx("p", { className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted", children: "\uC678\uBD80 llama.cpp \uC11C\uBC84\uAC00 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4. \uC571\uC5D0\uC11C \uC2DC\uC791\uD55C \uC11C\uBC84\uB9CC \uC5B8\uB85C\uB4DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }) : e.jsx("p", { className: "mt-1 text-[11px] text-gray-500 dark:text-odp-muted", children: "\uBAA8\uB378\uC744 \uC120\uD0DD\uD55C \uB4A4 \uB85C\uB4DC \uBC84\uD2BC\uC73C\uB85C \uC11C\uBC84\uB97C \uC2DC\uC791\uD558\uC138\uC694." }), e.jsx(_e, { isOpen: ie, title: "llama.cpp \uBAA8\uB378 \uC5B8\uB85C\uB4DC", message: "\uC571\uC5D0\uC11C \uC2DC\uC791\uD55C llama.cpp \uC11C\uBC84\uB97C \uC911\uC9C0\uD558\uACE0 \uBAA8\uB378\uC744 \uBA54\uBAA8\uB9AC\uC5D0\uC11C \uB0B4\uB9B4\uAE4C\uC694?", confirmLabel: "\uC5B8\uB85C\uB4DC", cancelLabel: "\uCDE8\uC18C", variant: "danger", onConfirm: ue, onCancel: () => G(false) })] });
}
export {
  Qe as L,
  We as a,
  Xe as u
};
