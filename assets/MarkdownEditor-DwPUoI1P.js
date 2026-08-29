var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { j as o, r as a, u as vo, a as ko, c as Cs } from "./vendor-react-BFxggocB.js";
import { B as Es, D as Jn, S as Co, l as Lt, F as Eo, G as cr, W as Ss, H as So, J as It, M as it, O as No, j as er, V as jo, P as Mo, m as Ie, Q as Ns, R as js, T as Ms, U as Rs, X as Ts, Y as wn, Z as ur, $ as Ls, a0 as Ps, c as As, a1 as Ds, a2 as Ro, v as Is, a3 as Fs, a4 as $s, K as _s, a5 as Hs, a6 as Os, a7 as Bs, a8 as Ks, a9 as zs, aa as Vs, ab as Ws, ac as qs, ad as Us, ae as Xs, af as Ys, ag as Gs, ah as Qs, ai as Zs, aj as Js, ak as ei, al as ti, am as ni, an as ri, ao as oi } from "./vendor-md-editor-B7IajafM.js";
import { k as si, ct as To, cu as ln, cv as Fe, cw as Lo, aj as ht, cx as dr, cy as ii, aq as Po, ar as Ao, cz as fr, cA as ai, a1 as Ft, am as li, cB as mr, D as pr, cC as ci, cD as ui, cE as di, cF as hr, cG as Do, cH as fi, cI as mi, cJ as pi, cK as hi, cL as gi, cM as Io, cN as xi, ad as nn, bb as Fo, cO as bi, cP as wi, cQ as yi, m as vi, cR as gr, cS as ki, cT as Ci, v as Ei, _ as yn, cU as Si, Z as vn, cV as Ni, w as kn, u as ji, bi as $o, bO as zn, cW as Mi, bk as rn, cX as xr, cY as Ri, cZ as Ti, c_ as Li, c$ as Pi, bP as Ai, d0 as Di, d1 as Vn, ae as Ii, bG as tr, a9 as nr, d2 as Fi, d3 as $i, d4 as _i, bT as Hi, aX as Oi, cn as Bi, bL as _o, d5 as Tt, d6 as Ki, d7 as zi, d8 as Vi, bQ as Wi, c5 as qi, d9 as Ho, da as Ui, db as Xi, dc as br, dd as Yi, de as Gi, A as Qi, c2 as Zi, df as Ut, b_ as Ji, dg as ea, dh as jt, di as ta, dj as na, dk as ra, cd as wr, au as Cn, cf as En, av as oa, cg as yr, ch as sa, aw as ia, ax as aa, ab as la, ay as ca, as as ua, at as da, T as fa, M as ma, cp as pa, dl as ha, dm as ga, dn as Sn, dp as Nn, dq as vr, dr as kr, ds as jn, dt as Cr, du as xa, dv as Er, dw as Sr, cq as ba, aA as wa, cr as ya, dx as va, dy as ka, dz as Ca, dA as Ea, dB as Nr, dC as We, dD as Sa, dE as Mn, dF as Rn, dG as Na } from "./index-DPH8WKK6.js";
import { S as ja, ax as Ma, ay as jr, az as Tn, aj as Ln, aA as Ra, c as Ta, aB as rr, aC as La, J as Oo, aD as Pa, aE as Aa, X as cn, y as Da, aF as Ia, aG as Fa, k as un, aH as $a, aI as _a, aJ as Bo, aK as Ha, D as Oa, aL as on, am as Ba, an as Ka, av as Mr, aM as Pn, aN as Rr, aO as za, ae as Va, l as Wa, aP as Tr, aQ as qa, aR as Ua, aS as Xa, aT as Ya, a4 as gt, R as Ga, L as Qa } from "./vendor-lucide-BiQHrkcf.js";
import { b as Ko, M as An, N as Dn, r as Za, s as Ja, t as el, v as tl, w as nl, x as rl, y as ol, z as sl, B as il, D as al, S as or, g as sr, d as Wn, T as qn, e as Un, f as Xn, A as Yn, l as ll, F as qe, L as ot, m as Xt, G as cl, H as ul, I as dl, E as fl, Q as Lr, U as ml, V as pl, W as hl, X as gl, Y as Pr } from "./vendor-radix-ACO_3onn.js";
import { M as xl } from "./MdEditorToolbarTooltips-Os9IjsFy.js";
import { a as bl, h as wl, P as yl, H as vl } from "./previewFootnoteScroll-Di1g0QJJ.js";
import { N as kl, u as Cl, W as El } from "./useTocTitleWrap-DULyMXvh.js";
import { H as In, T as Sl } from "./TableStyleTemplateEditor-X98IRn6i.js";
import { a as dn } from "./vendor-motion-b8oTnHK_.js";
import { c as Nl } from "./clipboardImageFiles-DyzjhMlJ.js";
import { u as jl } from "./useWikiImageHydration-B8bs0Nrl.js";
import "./vendor-aws-CXsSaYOG.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-google-genai-DGp6lEvQ.js";
import "./vendor-image-crop-2jwX4VUM.js";
import "./storageImageHydration-DE_R_4mx.js";
import "./index-moa0c9-p.js";
function zo(e, t, n) {
  const r = si(e);
  if (!r.length) return null;
  const i = [...n.querySelectorAll("table")], s = i.indexOf(t);
  let l = s >= 0 ? r[s] : void 0;
  if (!l) {
    const p = i.filter((m) => m.getAttribute("data-haim-table") === "1").indexOf(t);
    p >= 0 && (l = r.filter((b) => b.meta != null)[p]);
  }
  return !l && r.length === 1 && (l = r[0]), l ?? null;
}
function Ml(e, t) {
  const n = {};
  for (const [r, i] of Object.entries(e)) {
    const s = ln(r);
    if (!s) continue;
    const l = s.r >= t ? s.r + 1 : s.r;
    n[Fe(l, s.c)] = i;
  }
  return n;
}
function Rl(e, t) {
  const n = {};
  for (const [r, i] of Object.entries(e)) {
    const s = ln(r);
    if (!s) continue;
    const l = s.c >= t ? s.c + 1 : s.c;
    n[Fe(s.r, l)] = i;
  }
  return n;
}
function Tl(e, t) {
  const n = {};
  for (const [r, i] of Object.entries(e)) {
    const s = ln(r);
    if (!s || s.r === t) continue;
    const l = s.r > t ? s.r - 1 : s.r;
    n[Fe(l, s.c)] = i;
  }
  return n;
}
function Ll(e, t) {
  const n = {};
  for (const [r, i] of Object.entries(e)) {
    const s = ln(r);
    if (!s || s.c === t) continue;
    const l = s.c > t ? s.c - 1 : s.c;
    n[Fe(s.r, l)] = i;
  }
  return n;
}
function Pl(e, t) {
  return e.map((n) => n.r >= t ? { ...n, r: n.r + 1 } : n.r + n.rowspan > t ? { ...n, rowspan: n.rowspan + 1 } : n);
}
function Al(e, t) {
  return e.map((n) => n.c >= t ? { ...n, c: n.c + 1 } : n.c + n.colspan > t ? { ...n, colspan: n.colspan + 1 } : n);
}
function xt(e) {
  return e.rowspan < 1 || e.colspan < 1 || e.rowspan === 1 && e.colspan === 1 ? null : e;
}
function Dl(e, t) {
  const n = [];
  for (const r of e) {
    if (r.r > t) {
      const i = xt({ ...r, r: r.r - 1 });
      i && n.push(i);
      continue;
    }
    if (r.r === t) {
      if (r.rowspan <= 1) continue;
      const i = xt({ ...r, rowspan: r.rowspan - 1 });
      i && n.push(i);
      continue;
    }
    if (r.r < t && r.r + r.rowspan > t) {
      const i = xt({ ...r, rowspan: r.rowspan - 1 });
      i && n.push(i);
      continue;
    }
    n.push(r);
  }
  return n;
}
function Il(e, t) {
  const n = [];
  for (const r of e) {
    if (r.c > t) {
      const i = xt({ ...r, c: r.c - 1 });
      i && n.push(i);
      continue;
    }
    if (r.c === t) {
      if (r.colspan <= 1) continue;
      const i = xt({ ...r, colspan: r.colspan - 1 });
      i && n.push(i);
      continue;
    }
    if (r.c < t && r.c + r.colspan > t) {
      const i = xt({ ...r, colspan: r.colspan - 1 });
      i && n.push(i);
      continue;
    }
    n.push(r);
  }
  return n;
}
function Fl(e, t, n) {
  const r = t.merges.filter((u) => u.r === n && u.rowspan > 1);
  if (r.length === 0) return { grid: e, meta: t };
  const i = e.rows.map((u) => [...u]), s = { ...t.cells }, l = n + 1;
  for (const u of r) {
    const p = i[n], m = i[l];
    if (!p || !m) continue;
    for (; m.length <= u.c; ) m.push("");
    for (; p.length <= u.c; ) p.push("");
    const b = p[u.c] ?? "";
    b && (m[u.c] = b, p[u.c] = "");
    const T = Fe(n, u.c), N = Fe(l, u.c), R = s[T];
    R && (s[N] = { ...R }, delete s[T]);
  }
  return { grid: { rows: i, aligns: [...e.aligns] }, meta: { ...t, cells: s } };
}
function $l(e, t, n) {
  const r = t.merges.filter((l) => l.c === n && l.colspan > 1);
  if (r.length === 0) return { grid: e, meta: t };
  const i = e.rows.map((l) => [...l]), s = { ...t.cells };
  for (const l of r) {
    const u = i[l.r];
    if (!u) continue;
    for (; u.length <= l.c + 1; ) u.push("");
    const p = u[l.c] ?? "";
    p && (u[l.c + 1] = p, u[l.c] = "");
    const m = Fe(l.r, n), b = Fe(l.r, n + 1), T = s[m];
    T && (s[b] = { ...T }, delete s[m]);
  }
  return { grid: { rows: i, aligns: [...e.aligns] }, meta: { ...t, cells: s } };
}
function _l(e, t, n) {
  const r = Math.max(1, ...e.rows.map((b) => b.length), e.aligns.length, 1), i = e.rows.length, s = Math.max(0, Math.min(n, i)), l = Array.from({ length: r }, () => ""), u = [...e.rows.slice(0, s), l, ...e.rows.slice(s)];
  let p = t.headerRows, m = t.footerRows;
  return s < p ? p += 1 : m > 0 && s >= i - m && (m += 1), { grid: { rows: u, aligns: [...e.aligns] }, meta: (() => {
    var _a2;
    const b = { ...t, headerRows: p, footerRows: m, merges: Pl(t.merges, s), cells: Ml(t.cells, s) };
    if ((_a2 = t.rowHeights) == null ? void 0 : _a2.length) {
      const T = To(t.rowHeights, s);
      T && (b.rowHeights = T);
    }
    return b;
  })() };
}
function Hl(e, t, n) {
  const r = Math.max(1, ...e.rows.map((u) => u.length), e.aligns.length, 1), i = Math.max(0, Math.min(n, r)), s = e.rows.map((u) => {
    const p = [...u];
    for (; p.length < r; ) p.push("");
    return p.splice(i, 0, ""), p;
  });
  s.length === 0 && s.push(Array.from({ length: r + 1 }, () => ""));
  const l = [...e.aligns];
  for (; l.length < r; ) l.push(null);
  return l.splice(i, 0, null), { grid: { rows: s, aligns: l }, meta: (() => {
    var _a2;
    const u = { ...t, merges: Al(t.merges, i), cells: Rl(t.cells, i) };
    if ((_a2 = t.colWidths) == null ? void 0 : _a2.length) {
      const p = To(t.colWidths, i);
      p && (u.colWidths = p);
    }
    return u;
  })() };
}
function Ol(e, t, n) {
  var _a2;
  const r = e.rows.length;
  if (r <= 1) return { grid: e, meta: t };
  if (n < 0 || n >= r) return { grid: e, meta: t };
  const i = Fl(e, t, n), s = [...i.grid.rows.slice(0, n), ...i.grid.rows.slice(n + 1)];
  let l = i.meta.headerRows, u = i.meta.footerRows;
  n < l ? l = Math.max(0, l - 1) : u > 0 && n >= r - u && (u = Math.max(0, u - 1));
  const p = s.length;
  l + u > p && (u = Math.max(0, p - l));
  const m = { ...i.meta, headerRows: l, footerRows: u, merges: Dl(i.meta.merges, n), cells: Tl(i.meta.cells, n) };
  if ((_a2 = i.meta.rowHeights) == null ? void 0 : _a2.length) {
    const b = Lo(i.meta.rowHeights, n);
    b ? m.rowHeights = b : delete m.rowHeights;
  }
  return { grid: { rows: s, aligns: [...i.grid.aligns] }, meta: m };
}
function Bl(e, t, n) {
  var _a2;
  const r = Math.max(1, ...e.rows.map((p) => p.length), e.aligns.length, 1);
  if (r <= 1) return { grid: e, meta: t };
  if (n < 0 || n >= r) return { grid: e, meta: t };
  const i = $l(e, t, n), s = i.grid.rows.map((p) => {
    const m = [...p];
    for (; m.length < r; ) m.push("");
    return m.splice(n, 1), m;
  }), l = [...i.grid.aligns];
  for (; l.length < r; ) l.push(null);
  l.splice(n, 1);
  const u = { ...i.meta, merges: Il(i.meta.merges, n), cells: Ll(i.meta.cells, n) };
  if ((_a2 = i.meta.colWidths) == null ? void 0 : _a2.length) {
    const p = Lo(i.meta.colWidths, n);
    p ? u.colWidths = p : delete u.colWidths;
  }
  return { grid: { rows: s, aligns: l }, meta: u };
}
function Kl(e, t, n) {
  const r = [...new Set(n.filter((s) => Number.isInteger(s) && s >= 0))].sort((s, l) => l - s);
  let i = { grid: e, meta: t };
  for (const s of r) {
    if (i.grid.rows.length <= 1) break;
    i = Ol(i.grid, i.meta, s);
  }
  return i;
}
function zl(e, t, n) {
  const r = [...new Set(n.filter((s) => Number.isInteger(s) && s >= 0))].sort((s, l) => l - s);
  let i = { grid: e, meta: t };
  for (const s of r) {
    if (Math.max(1, ...i.grid.rows.map((u) => u.length), i.grid.aligns.length, 1) <= 1) break;
    i = Bl(i.grid, i.meta, s);
  }
  return i;
}
function Vl(e) {
  return String(e || "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96) || "doc";
}
function Wl(e) {
  return `md-ed-${Vl(e)}`;
}
function ql(e) {
  const t = `${e}-h`;
  return (n, r, i) => {
    const s = Number.isInteger(i) ? i : 0, l = typeof n == "object" && n !== null ? Number(n.index) : NaN, u = Number.isInteger(l) ? l : s;
    return `${t}-${u}`;
  };
}
const Ar = ".md-editor-catalog-link", Ul = "md-preview-heading-folded", Dr = "md-preview-heading-section-hidden", Xl = 2;
function Yl(e, t) {
  const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
  return n.top - r.top + t.scrollTop;
}
function Gl(e) {
  for (let t = 0; t < 8; t += 1) {
    const n = getComputedStyle(e);
    if (!(e.classList.contains(Dr) || e.hasAttribute("hidden") || n.display === "none")) break;
    let i = false, s = e;
    for (; s && !i; ) {
      if (s instanceof HTMLElement && (s.classList.contains(Dr) || s.hasAttribute("hidden"))) {
        let u = s.previousElementSibling;
        for (; u; ) {
          if (u instanceof HTMLElement && u.classList.contains(Ul)) {
            const p = u.querySelector(":scope > .md-preview-heading-fold-chevron");
            p instanceof HTMLButtonElement && (p.click(), i = true);
            break;
          }
          u = u.previousElementSibling;
        }
      }
      s = s.parentElement;
    }
    if (!i) break;
  }
}
function Ql(e, t) {
  const n = (r) => {
    var _a2;
    if (r.button !== 0) return;
    const i = r.target;
    if (!(i instanceof Element)) return;
    const s = i.closest(Ar);
    if (!(s instanceof HTMLElement) || !e.contains(s)) return;
    const u = Array.from(e.querySelectorAll(Ar)).indexOf(s);
    if (u < 0) return;
    const p = t.mdHeadingId({ index: u + 1 }), m = t.getEditorRoot(), b = ((_a2 = m == null ? void 0 : m.querySelector) == null ? void 0 : _a2.call(m, `#${CSS.escape(p)}`)) ?? null;
    if (!b || m && !m.contains(b)) return;
    r.preventDefault(), r.stopPropagation(), typeof r.stopImmediatePropagation == "function" && r.stopImmediatePropagation(), Gl(b);
    const T = ht(b);
    if (!T) {
      b.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    const N = b.previousElementSibling ? 0 : Number.parseFloat(getComputedStyle(b).marginBlockStart || "0") || 0, R = Yl(b, T) - Xl - N;
    T.scrollTo({ top: Math.max(0, R), behavior: "smooth" });
  };
  return e.addEventListener("click", n, true), () => {
    e.removeEventListener("click", n, true);
  };
}
function Zl({ onToggle: e, active: t = false }) {
  return o.jsx("button", { type: "button", className: ["md-editor-toolbar-item", t ? "md-editor-toolbar-active bg-violet-200! hover:bg-violet-300! dark:bg-violet-800/85! dark:hover:bg-violet-700/90!" : ""].filter(Boolean).join(" "), onClick: () => e == null ? void 0 : e(), title: t ? "AI \uB3C4\uC6B0\uBBF8 \uB2EB\uAE30" : "AI \uB3C4\uC6B0\uBBF8", "aria-label": t ? "AI \uB3C4\uC6B0\uBBF8 \uB2EB\uAE30" : "AI \uB3C4\uC6B0\uBBF8", "aria-pressed": t, children: o.jsx(ja, { className: "md-editor-icon", size: 16 }) });
}
function Jl(e) {
  const t = String(e ?? "").split(`
`), n = [];
  let r = { name: "\uC77C\uBC18 / \uBBF8\uBD84\uB958", tasks: [] }, i = 0, s = 0;
  t.forEach((u, p) => {
    const m = u.match(/^(#{1,6})\s+(.*)/);
    if (m) {
      (r.tasks.length > 0 || r.name !== "\uC77C\uBC18 / \uBBF8\uBD84\uB958") && n.push(r), r = { name: m[2].trim(), tasks: [] };
      return;
    }
    const b = u.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX])\]\s+(.*)/);
    if (b) {
      const T = Math.floor(b[1].length / 2), N = b[3].toLowerCase() === "x", R = b[4].trim();
      i += 1, N && (s += 1), r.tasks.push({ id: `line-${p}`, lineIndex: p, indent: T, completed: N, text: R, rawLine: u });
    }
  }), r.tasks.length > 0 && n.push(r);
  const l = i > 0 ? Math.round(s / i * 100) : 0;
  return { categories: n, totalTasks: i, completedTasks: s, pendingTasks: i - s, percentage: l };
}
function ec(e, t) {
  const n = String(e ?? "").split(`
`);
  if (t < 0 || t >= n.length) return e;
  const r = n[t];
  if (r.includes("[ ]")) n[t] = r.replace("[ ]", "[x]");
  else if (r.includes("[x]")) n[t] = r.replace("[x]", "[ ]");
  else if (r.includes("[X]")) n[t] = r.replace("[X]", "[ ]");
  else return e;
  return n.join(`
`);
}
function tc({ markdown: e = "", onMarkdownChange: t }) {
  const [n, r] = a.useState(""), [i, s] = a.useState("all"), [l, u] = a.useState({}), [p, m] = a.useState("dashboard"), b = a.useMemo(() => Jl(e), [e]);
  a.useEffect(() => {
    const S = {};
    b.categories.forEach((L) => {
      S[L.name] = true;
    }), u(S);
  }, [b.categories.length]);
  const T = (S) => {
    typeof t == "function" && t(ec(e, S));
  }, N = (S) => {
    u((L) => ({ ...L, [S]: !L[S] }));
  }, R = (S) => {
    const L = S.text.toLowerCase().includes(n.toLowerCase()), K = i === "all" ? true : i === "completed" ? S.completed : !S.completed;
    return L && K;
  };
  return o.jsxs("div", { className: "space-y-3 text-xs text-slate-100", children: [o.jsxs("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: [o.jsxs("div", { className: "col-span-2 sm:col-span-1 relative overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3", children: [o.jsx("div", { className: "pointer-events-none absolute -right-2 -top-2 opacity-10", children: o.jsx(Ma, { className: "h-16 w-16 text-indigo-400" }) }), o.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-indigo-300", children: "\uC804\uCCB4 \uC9C4\uD589\uB960" }), o.jsx("div", { className: "my-1.5 flex items-baseline gap-1", children: o.jsxs("span", { className: "text-3xl font-extrabold text-white", children: [b.percentage, "%"] }) }), o.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-slate-800", children: o.jsx("div", { className: "h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out", style: { width: `${b.percentage}%` } }) })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-slate-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uCD1D \uD0DC\uC2A4\uD06C" }), o.jsx(jr, { className: "h-3.5 w-3.5 text-slate-500" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-slate-100", children: [b.totalTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-emerald-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC644\uB8CC\uB428" }), o.jsx(Tn, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-emerald-400", children: [b.completedTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-amber-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC9C4\uD589 \uC608\uC815" }), o.jsx(Ln, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-amber-400", children: [b.pendingTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] })] }), o.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2", children: [o.jsxs("div", { className: "flex rounded-lg border border-slate-800 bg-slate-900 p-0.5", children: [o.jsxs("button", { type: "button", onClick: () => m("dashboard"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${p === "dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(Ra, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCE74\uD14C\uACE0\uB9AC" })] }), o.jsxs("button", { type: "button", onClick: () => m("checklist"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${p === "checklist" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(jr, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8" })] })] }), o.jsxs("div", { className: "flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5", children: [o.jsxs("div", { className: "relative min-w-[120px] flex-1", children: [o.jsx(Ta, { className: "absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" }), o.jsx("input", { type: "text", value: n, onChange: (S) => r(S.target.value), placeholder: "\uAC80\uC0C9...", className: "w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none" })] }), o.jsxs("select", { value: i, onChange: (S) => s(S.target.value), className: "rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none", children: [o.jsx("option", { value: "all", children: "\uC804\uCCB4" }), o.jsx("option", { value: "completed", children: "\uC644\uB8CC\uB9CC" }), o.jsx("option", { value: "pending", children: "\uBBF8\uC644\uB8CC\uB9CC" })] })] })] }), p === "dashboard" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5", children: b.categories.length === 0 ? o.jsxs("div", { className: "py-8 text-center text-slate-500", children: [o.jsx(rr, { className: "mx-auto mb-2 h-8 w-8 opacity-40" }), o.jsx("p", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD56D\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), o.jsx("code", { className: "mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400", children: "- [ ] \uD560 \uC77C" })] }) : b.categories.map((S, L) => {
    const K = S.tasks.length, F = S.tasks.filter((P) => P.completed).length, Z = K > 0 ? Math.round(F / K * 100) : 0, J = !!l[S.name], v = S.tasks.filter(R);
    return n && v.length === 0 ? null : o.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70", children: [o.jsxs("button", { type: "button", onClick: () => N(S.name), className: "flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40", children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [o.jsx("span", { className: "shrink-0 text-slate-500", children: J ? o.jsx(La, { className: "h-3.5 w-3.5" }) : o.jsx(Oo, { className: "h-3.5 w-3.5" }) }), o.jsx("span", { className: "truncate text-[12px] font-semibold text-slate-200", children: S.name })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [o.jsxs("span", { className: "text-[10px] font-medium text-slate-400", children: [o.jsx("strong", { className: "text-slate-200", children: F }), " / ", K] }), o.jsxs("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${Z === 100 ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border border-indigo-500/20 bg-indigo-500/10 text-indigo-400"}`, children: [Z, "%"] })] })] }), J && o.jsx("div", { className: "space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2", children: v.length === 0 ? o.jsx("p", { className: "py-1 pl-5 text-[11px] text-slate-500", children: "\uC870\uAC74\uC5D0 \uC77C\uCE58\uD558\uB294 \uD0DC\uC2A4\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : v.map((P) => o.jsxs("button", { type: "button", onClick: () => T(P.lineIndex), style: { paddingLeft: `${P.indent * 12 + 8}px` }, className: "flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50", children: [o.jsx("span", { className: "mt-0.5 shrink-0 text-slate-400", children: P.completed ? o.jsx(Tn, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(Ln, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${P.completed ? "text-slate-500 line-through" : "text-slate-300"}`, children: P.text })] }, P.id)) })] }, `${S.name}-${L}`);
  }) }), p === "checklist" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5", children: b.categories.map((S, L) => {
    const K = S.tasks.filter(R);
    return K.length === 0 ? null : o.jsxs("div", { className: "space-y-1", children: [o.jsxs("div", { className: "sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400", children: [S.name, " (", K.length, ")"] }), K.map((F) => o.jsxs("button", { type: "button", onClick: () => T(F.lineIndex), style: { paddingLeft: `${F.indent * 10 + 6}px` }, className: "flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60", children: [o.jsx("span", { className: "mt-0.5 shrink-0", children: F.completed ? o.jsx(Tn, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(Ln, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${F.completed ? "text-slate-500 line-through" : "text-slate-200"}`, children: F.text })] }, F.id))] }, `${S.name}-list-${L}`);
  }) })] })] });
}
const Vo = "s3haim-checklist-progress-modal-position", Fn = { leftVw: 58, topVh: 14 };
function nc() {
  try {
    const e = localStorage.getItem(Vo);
    if (!e) return { ...Fn };
    const t = JSON.parse(e), n = Number(t == null ? void 0 : t.leftVw), r = Number(t == null ? void 0 : t.topVh);
    return !Number.isFinite(n) || !Number.isFinite(r) ? { ...Fn } : { leftVw: Math.min(95, Math.max(0, n)), topVh: Math.min(95, Math.max(0, r)) };
  } catch {
    return { ...Fn };
  }
}
function rc({ leftVw: e, topVh: t }) {
  try {
    localStorage.setItem(Vo, JSON.stringify({ leftVw: Math.min(95, Math.max(0, e)), topVh: Math.min(95, Math.max(0, t)) }));
  } catch {
  }
}
const Wo = "(max-width: 768px)", oc = 5;
function Ir() {
  return typeof window < "u" && window.matchMedia(Wo).matches;
}
function sc({ editorRef: e, onChange: t, open: n, onOpenChange: r }) {
  const [i, s] = a.useState(() => nc()), [l, u] = a.useState(""), [p, m] = a.useState({ from: 0, to: 0 }), b = a.useRef({ active: false, startX: 0, startY: 0, startLeftVw: 0, startTopVh: 0 }), T = a.useCallback(() => {
    const { text: L, from: K, to: F } = dr(e);
    return u(L), m({ from: K, to: F }), L;
  }, [e]);
  a.useEffect(() => {
    if (n) {
      if (Ir()) {
        r == null ? void 0 : r(false);
        return;
      }
      T();
    }
  }, [n, T, r]), a.useEffect(() => {
    if (!n) return;
    const L = window.matchMedia(Wo), K = (F) => {
      F.matches && (r == null ? void 0 : r(false));
    };
    return L.addEventListener("change", K), () => L.removeEventListener("change", K);
  }, [n, r]);
  const N = a.useCallback((L) => {
    if (L.button !== 0) return;
    L.preventDefault();
    const K = L.clientX, F = L.clientY;
    b.current = { active: true, startX: K, startY: F, startLeftVw: i.leftVw, startTopVh: i.topVh };
    const Z = (v) => {
      if (!b.current.active) return;
      Math.hypot(v.clientX - K, v.clientY - F) <= oc;
      const P = window.innerWidth || 1, Q = window.innerHeight || 1, z = (v.clientX - b.current.startX) / P * 100, H = (v.clientY - b.current.startY) / Q * 100;
      s({ leftVw: Math.min(92, Math.max(0, b.current.startLeftVw + z)), topVh: Math.min(90, Math.max(0, b.current.startTopVh + H)) });
    }, J = () => {
      b.current.active && (b.current.active = false, document.removeEventListener("pointermove", Z), document.removeEventListener("pointerup", J), s((v) => (rc(v), v)));
    };
    document.addEventListener("pointermove", Z), document.addEventListener("pointerup", J);
  }, [i.leftVw, i.topVh]), R = a.useCallback((L) => {
    u(L);
    const { view: K } = dr(e), { from: F, to: Z } = p;
    ii(K, F, Z, L, t) && m({ from: F, to: F + L.length });
  }, [e, p, t]), S = () => {
    r == null ? void 0 : r(false);
  };
  return !n || Ir() ? null : o.jsxs("div", { className: "fixed z-[10050] w-[min(92vw,440px)] rounded-lg border border-indigo-400/40 bg-slate-950/95 shadow-2xl backdrop-blur-md", style: { left: `${i.leftVw}vw`, top: `${i.topVh}vh` }, role: "dialog", "aria-modal": "false", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: [o.jsxs("div", { className: "flex cursor-grab items-center justify-between gap-2 border-b border-indigo-500/30 bg-indigo-950/50 px-3 py-2 active:cursor-grabbing", onPointerDown: N, children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-indigo-100", children: [o.jsx(Pa, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), o.jsx(rr, { size: 16, className: "shrink-0", "aria-hidden": true }), o.jsx("span", { className: "truncate", children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960" })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [o.jsxs("button", { type: "button", onPointerDown: (L) => L.stopPropagation(), onClick: T, className: "inline-flex items-center gap-1 rounded px-1.5 py-1 text-[11px] text-indigo-200 hover:bg-indigo-900/50", title: "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", "aria-label": "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", children: [o.jsx(Aa, { size: 14 }), o.jsx("span", { className: "hidden sm:inline", children: "\uC0C8\uB85C\uACE0\uCE68" })] }), o.jsx("button", { type: "button", onPointerDown: (L) => L.stopPropagation(), onClick: S, className: "rounded p-1 text-indigo-200 hover:bg-indigo-900/50", title: "\uB2EB\uAE30", "aria-label": "\uB2EB\uAE30", children: o.jsx(cn, { size: 15 }) })] })] }), o.jsx("div", { className: "max-h-[min(72vh,640px)] overflow-y-auto p-3", children: l.trim() ? o.jsx(tc, { markdown: l, onMarkdownChange: R }) : o.jsxs("p", { className: "rounded-lg border border-dashed border-slate-700 bg-slate-900/60 px-3 py-6 text-center text-xs text-slate-400", children: ["\uC5D0\uB514\uD130\uC5D0\uC11C \uCCB4\uD06C\uB9AC\uC2A4\uD2B8\uAC00 \uD3EC\uD568\uB41C \uD14D\uC2A4\uD2B8\uB97C \uC120\uD0DD\uD55C \uB4A4", o.jsx("br", {}), "\uD234\uBC14 \uBC84\uD2BC\uC744 \uB204\uB974\uAC70\uB098 \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694."] }) })] });
}
const ic = "(max-width: 768px)";
function ac() {
  return typeof window < "u" && window.matchMedia(ic).matches;
}
function lc({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item max-md:hidden", onClick: () => {
    ac() || (e == null ? void 0 : e());
  }, title: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: o.jsx(rr, { className: "md-editor-icon", size: 16 }) });
}
function cc({ value: e = "", theme: t = "light", currentFile: n = null, disabled: r, trigger: i }) {
  const s = vo(), l = a.useCallback(() => {
    r || (Po({ currentFile: n, editorContent: e }), s(Ao(n == null ? void 0 : n.id), { state: { value: e, theme: t, currentFile: n } }));
  }, [s, e, t, r, n]);
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: l, disabled: r, title: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", "aria-label": "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", children: i ?? o.jsx(Da, { className: "md-editor-icon", size: 16 }) });
}
function uc({ editorRef: e }) {
  const t = a.useCallback(() => {
    var _a2, _b, _c2, _d2;
    const n = ((_a2 = e.current) == null ? void 0 : _a2.value) ?? e.current;
    if (!n) return;
    const r = `

<pgbr/>

`;
    if (typeof n.insert == "function") {
      n.insert(() => ({ targetValue: r, select: false, deviationStart: 0, deviationEnd: 0 })), (_b = n.focus) == null ? void 0 : _b.call(n);
      return;
    }
    const i = (_c2 = n.getEditorView) == null ? void 0 : _c2.call(n);
    i && (i.dispatch(i.state.replaceSelection(r)), (_d2 = i.focus) == null ? void 0 : _d2.call(i));
  }, [e]);
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: t, title: "Insert print page break (<pgbr/>)", "aria-label": "Insert print page break", children: o.jsx(Ia, { className: "md-editor-icon", size: 16 }) });
}
function dc({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", title: "\uCD5C\uB300 heading \uBCC0\uACBD", "aria-label": "\uCD5C\uB300 heading \uBCC0\uACBD", onClick: () => e(), children: o.jsx(Fa, { className: "md-editor-icon", size: 16 }) });
}
const fc = [{ value: "selection", title: "\uC120\uD0DD \uC601\uC5ED", description: "\uD604\uC7AC \uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uB9CC \uBCC0\uACBD" }, { value: "document", title: "\uC804\uCCB4 \uBB38\uC11C", description: "\uBB38\uC11C \uC804\uCCB4 heading\uC744 \uBCC0\uACBD" }], mc = [{ value: "flat", title: "1. \uD615\uC2DD", description: "\uCD5C\uB300 heading\uC744 \uD55C \uC790\uB9AC \uBC88\uD638\uB85C \uC2DC\uC791" }, { value: "nested", title: "2.1. \uD615\uC2DD", description: "heading \uC218\uC900\uB9CC\uD07C \uBC88\uD638\uB97C \uBD99\uC784" }], pc = [{ value: 1, title: "1\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 1. / 1.1. \u2026" }, { value: 2, title: "2\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 2. / 2.1. \u2026" }], hc = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), gc = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Fr = "z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function xc({ isOpen: e, markdown: t, selectedMarkdown: n = "", onClose: r, onApply: i }) {
  const s = n.length > 0, [l, u] = a.useState("document"), [p, m] = a.useState(1), [b, T] = a.useState(false), [N, R] = a.useState("nested"), [S, L] = a.useState(1), K = l === "selection" ? n : t;
  a.useEffect(() => {
    if (!e) return;
    const v = s ? "selection" : "document";
    u(v), m(fr(v === "selection" ? n : t)), T(false), R("nested"), L(1);
  }, [e, t, n, s]), a.useEffect(() => {
    if (!e) return;
    const v = (z) => {
      const H = z;
      return (H == null ? void 0 : H.closest) ? !!H.closest('.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]') : false;
    }, P = () => {
      const z = document.activeElement;
      z && v(z) && typeof z.blur == "function" && z.blur();
    };
    P();
    const Q = (z) => {
      if (z.metaKey || z.ctrlKey || z.altKey) return;
      const H = z.key;
      if (H >= "1" && H <= "9") {
        const E = Number(H);
        mr(E) && (z.preventDefault(), z.stopPropagation(), z.stopImmediatePropagation(), m(E));
        return;
      }
      z.key === "Escape" || z.key === "Enter" || v(z.target) && (z.preventDefault(), z.stopPropagation(), z.stopImmediatePropagation(), P());
    };
    return window.addEventListener("keydown", Q, true), () => window.removeEventListener("keydown", Q, true);
  }, [e]);
  const F = a.useMemo(() => ai(K, p, { maxLevel: hr, renumberOutline: b, outlineStyle: N, outlineStart: S }), [K, p, b, N, S]), Z = (v) => {
    if (v !== "selection" && v !== "document" || v === "selection" && !s) return;
    u(v), m(fr(v === "selection" ? n : t));
  }, J = () => {
    if (!F.sourceMax) return;
    const v = di(K, p, { maxLevel: hr, renumberOutline: b, outlineStyle: N, outlineStart: S });
    v !== K && i(v, l), r();
  };
  return o.jsx(Ft, { isOpen: e, onClose: r, onConfirm: J, contentClassName: "max-w-3xl", children: o.jsx(Ko, { delayDuration: 250, skipDelayDuration: 0, children: o.jsxs("div", { className: "flex min-h-0 flex-1 flex-col p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uCD5C\uB300 heading \uBCC0\uACBD" }), o.jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-odp-muted", children: ["\uAC10\uC9C0\uB41C \uCD5C\uB300 heading\uC744 \uC120\uD0DD\uD55C \uB2E8\uACC4\uB85C \uBC14\uAFB8\uACE0, \uD558\uC704 heading\uB3C4 \uAC19\uC740 \uAC04\uACA9\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.", " ", "\uC22B\uC790 \uD0A4 1\u20139\uB85C \uCD5C\uB300 heading\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC801\uC6A9 \uBC94\uC704" }), o.jsx(An, { className: "flex items-center gap-2", value: l, onValueChange: Z, "aria-label": "\uCD5C\uB300 heading \uC801\uC6A9 \uBC94\uC704", children: fc.map((v) => {
    const P = l === v.value, Q = v.value === "selection" && !s;
    return o.jsx(Dn, { value: v.value, disabled: Q, className: ["flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", P ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: P ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: v.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: v.value === "selection" && !s ? "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" : v.description })] }) }, v.value);
  }) })] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("label", { htmlFor: "editor-heading-max", className: "mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading" }), o.jsxs(Za, { value: String(p), onValueChange: (v) => {
    const P = Number(v);
    mr(P) && m(P);
  }, children: [o.jsxs(Ja, { id: "editor-heading-max", "aria-label": "\uCD5C\uB300 heading", className: "inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [o.jsx(el, {}), o.jsx(tl, { className: "text-gray-500", children: o.jsx(Oo, { size: 14 }) })] }), o.jsx(nl, { children: o.jsx(rl, { className: "z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: o.jsx(ol, { className: "p-1", children: li.map((v) => o.jsxs(sl, { value: String(v), className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [o.jsx(il, { className: "absolute left-1.5 inline-flex items-center", children: o.jsx(un, { size: 12 }) }), o.jsx(al, { children: `h${v}` })] }, v)) }) }) })] })] }), o.jsxs("div", { className: "mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft", children: [o.jsxs("div", { className: "flex items-center justify-between gap-3", children: [o.jsxs("div", { className: "min-w-0", children: [o.jsx("div", { className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: "outline \uBC88\uD638 \uB9DE\uCD94\uAE30" }), o.jsx("p", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC55E\uC758 1. / 2.1. \uAC19\uC740 \uBC88\uD638\uB97C \uD604\uC7AC heading \uC218\uC900\uC5D0 \uB9DE\uAC8C \uB2E4\uC2DC \uBD99\uC785\uB2C8\uB2E4." })] }), o.jsx(or, { className: hc(b), checked: b, onCheckedChange: T, "aria-label": "outline \uBC88\uD638 \uB9DE\uCD94\uAE30", children: o.jsx(sr, { className: gc }) })] }), b ? o.jsxs("div", { className: "mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60", children: [o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD" }), o.jsx(An, { className: "flex items-center gap-2", value: N, onValueChange: (v) => {
    (v === "flat" || v === "nested") && R(v);
  }, "aria-label": "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD", children: mc.map((v) => {
    const P = N === v.value;
    return o.jsx(Dn, { value: v.value, className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", P ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: P ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: v.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: v.description })] }) }, v.value);
  }) })] }), o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), o.jsx(An, { className: "flex items-center gap-2", value: String(S), onValueChange: (v) => {
    v === "1" && L(1), v === "2" && L(2);
  }, "aria-label": "\uCD5C\uB300 heading \uC2DC\uC791 \uBC88\uD638", children: pc.map((v) => {
    const P = S === v.value;
    return o.jsx(Dn, { value: String(v.value), className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", P ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: P ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: v.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: v.description })] }) }, v.value);
  }) })] })] }) : null] }), o.jsx("div", { className: "mt-4 min-h-0", children: F.rows.length ? o.jsx("div", { className: "max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-odp-borderSoft", children: o.jsxs("table", { className: "w-full table-fixed border-collapse text-left text-sm", children: [o.jsx("thead", { className: "sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft", children: o.jsxs("tr", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874 \uC81C\uBAA9" }), o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD\uB420 \uC81C\uBAA9" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD" })] }) }), o.jsx("tbody", { children: F.rows.map((v, P) => o.jsxs("tr", { className: "border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60", children: [o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(Wn, { children: [o.jsx(qn, { asChild: true, children: o.jsx("span", { className: "block truncate", children: v.text || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(Un, { children: o.jsxs(Xn, { side: "top", sideOffset: 6, className: Fr, children: [v.text || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(Yn, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(Wn, { children: [o.jsx(qn, { asChild: true, children: o.jsx("span", { className: "block truncate", children: v.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(Un, { children: o.jsxs(Xn, { side: "top", sideOffset: 6, className: Fr, children: [v.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(Yn, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted", children: ["h", v.from] }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: ["h", v.to] })] }, `${v.from}-${P}-${v.text}`)) })] }) }) : o.jsx("p", { className: "rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted", children: l === "selection" ? "\uC120\uD0DD \uC601\uC5ED\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBB38\uC11C\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) }), o.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [o.jsxs(pr, { type: "button", variant: "secondary", size: "md", onClick: r, children: [o.jsx(ci, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs(pr, { type: "button", variant: "primary", size: "md", onClick: J, disabled: !F.sourceMax, children: [o.jsx(ui, { size: 16 }), "\uC801\uC6A9"] })] })] }) }) });
}
function fn({ checked: e = false, onChange: t, theme: n = "light", title: r, ariaLabel: i, icon: s }) {
  const l = n === "dark", u = i || r;
  return o.jsx("span", { className: "md-editor-toolbar-item inline-flex items-center !w-auto !min-w-0 px-1", title: r, children: o.jsxs("label", { className: "inline-flex shrink-0 cursor-pointer select-none items-center gap-1", onMouseDown: (p) => {
    p.preventDefault();
  }, children: [o.jsx(s, { className: `md-editor-icon shrink-0 ${l ? "text-odp-muted" : "text-gray-500"}`, size: 16, "aria-hidden": true }), o.jsx(or, { checked: e, onCheckedChange: (p) => t == null ? void 0 : t(!!p), "aria-label": u, className: ["relative h-4 w-7 rounded-full border-0 outline-none transition-colors", "focus-visible:ring-2 focus-visible:ring-blue-400", e ? "bg-blue-600 dark:bg-blue-500" : l ? "bg-odp-borderStrong" : "bg-gray-300"].join(" "), children: o.jsx(sr, { className: ["block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform", "data-[state=checked]:translate-x-3.5"].join(" ") }) })] }) });
}
function bc({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(fn, { checked: e, onChange: t, theme: n, icon: $a, title: e ? "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8 \uCF1C\uC9D0" : "\uBAA9\uCC28 \uC81C\uBAA9 \uB9D0\uC904\uC784(...)", ariaLabel: "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8" });
}
function wc({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(fn, { checked: e, onChange: t, theme: n, icon: _a, title: e ? "base64 \uC774\uBBF8\uC9C0 \uC811\uD798" : "base64 \uC774\uBBF8\uC9C0 \uD3BC\uCE68", ariaLabel: "base64 \uC774\uBBF8\uC9C0 \uC811\uAE30" });
}
function yc({ checked: e = true, onChange: t, theme: n = "light" }) {
  return o.jsx(fn, { checked: e, onChange: t, theme: n, icon: Bo, title: e ? "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uCF1C\uC9D0" : "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uAEBC\uC9D0", ariaLabel: "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C" });
}
function vc({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(fn, { checked: e, onChange: t, theme: n, icon: Ha, title: e ? "Mirror Edit on \u2014 dual caret + instant preview sync" : "Mirror Edit off", ariaLabel: "Mirror Edit" });
}
function kc({ onRequestLink: e, onRequestUpload: t, onRequestClip: n, disabled: r = false }) {
  const [i, s] = a.useState(false), l = a.useRef(null), u = a.useRef(null), p = a.useCallback(() => s(false), []);
  return o.jsxs(o.Fragment, { children: [o.jsx(Es, { title: "\uC774\uBBF8\uC9C0", visible: i, onChange: s, disabled: r, overlay: o.jsxs("ul", { className: "md-editor-menu", role: "menu", onClick: p, children: [o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => e(), onKeyDown: (m) => {
    (m.key === "Enter" || m.key === " ") && (m.preventDefault(), e());
  }, children: "\uB9C1\uD06C \uCD94\uAC00" }), o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => {
    var _a2;
    return (_a2 = l.current) == null ? void 0 : _a2.click();
  }, onKeyDown: (m) => {
    var _a2;
    (m.key === "Enter" || m.key === " ") && (m.preventDefault(), (_a2 = l.current) == null ? void 0 : _a2.click());
  }, children: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC" }), o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => {
    var _a2;
    return (_a2 = u.current) == null ? void 0 : _a2.click();
  }, onKeyDown: (m) => {
    var _a2;
    (m.key === "Enter" || m.key === " ") && (m.preventDefault(), (_a2 = u.current) == null ? void 0 : _a2.click());
  }, children: "\uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC" })] }), children: o.jsx(Oa, { className: "md-editor-icon", size: 16, "aria-hidden": true }) }), o.jsx("input", { ref: l, type: "file", accept: "image/*", multiple: true, className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (m) => {
    const b = Array.from(m.target.files || []);
    m.target.value = "", b.length && t(b);
  } }), o.jsx("input", { ref: u, type: "file", accept: "image/*", className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (m) => {
    var _a2;
    const b = (_a2 = m.target.files) == null ? void 0 : _a2[0];
    m.target.value = "", b && n(b);
  } })] });
}
function Cc({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, i] = a.useState(""), [s, l] = a.useState(""), [u, p] = a.useState("");
  a.useEffect(() => {
    e && (i(""), l(""), p(""));
  }, [e]);
  const m = () => {
    const b = s.trim();
    if (!b) {
      p("\uC774\uBBF8\uC9C0 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ desc: r.trim(), url: b }), t();
  };
  return o.jsx(Ft, { isOpen: e, onClose: t, onConfirm: m, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C" }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC124\uBA85 (alt)" }), o.jsx("input", { type: "text", value: r, onChange: (b) => i(b.target.value), placeholder: "\uC120\uD0DD", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL" }), o.jsx("input", { type: "text", value: s, onChange: (b) => l(b.target.value), placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), u ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: u }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(cn, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: m, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(un, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function Ec({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, i] = a.useState(""), [s, l] = a.useState(""), [u, p] = a.useState(""), m = a.useRef(null);
  a.useEffect(() => {
    if (!e) return;
    i(""), l(""), p("");
    const N = window.setTimeout(() => {
      var _a2;
      return (_a2 = m.current) == null ? void 0 : _a2.focus();
    }, 40);
    return () => window.clearTimeout(N);
  }, [e]);
  const b = () => {
    const N = r.trim(), R = s.trim();
    if (!N && !R) {
      p("\uAC01\uC8FC \uC81C\uBAA9 \uB610\uB294 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ line1: N, line2: R }), t();
  }, T = (N) => {
    N.key === "Enter" && (!(N.metaKey || N.ctrlKey) || N.altKey || N.shiftKey || N.nativeEvent.isComposing || N.keyCode === 229 || (N.preventDefault(), N.stopPropagation(), b()));
  };
  return o.jsx(Ft, { isOpen: e, onClose: t, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uAC01\uC8FC \uC0BD\uC785" }), o.jsxs("p", { className: "text-xs leading-5 text-gray-500 dark:text-odp-muted", children: ["\uCCAB \uC904\uC740 \uC81C\uBAA9, \uB458\uC9F8 \uC904\uC740 URL\uC785\uB2C8\uB2E4. \uBCF8\uBB38 \uCEE4\uC11C\uC5D0", " ", o.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "[^N]" }), "\uC774 \uB4E4\uC5B4\uAC00\uACE0, \uBB38\uC11C \uD558\uB2E8 Sources\uC5D0 \uB450 \uC904\uC774 \uCD94\uAC00\uB429\uB2C8\uB2E4. Ctrl+Enter \uB610\uB294 \u2318+Enter\uB85C \uC0BD\uC785\uD569\uB2C8\uB2E4."] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC81C\uBAA9 (1\uC904)" }), o.jsx("input", { ref: m, type: "text", value: r, onChange: (N) => {
    i(N.target.value), u && p("");
  }, onKeyDown: T, placeholder: "\uC608: docs.docker.com - Compose services", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL (2\uC904)" }), o.jsx("input", { type: "text", value: s, onChange: (N) => {
    l(N.target.value), u && p("");
  }, onKeyDown: T, placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), u ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: u }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(cn, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: b, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(un, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function Sc({ isOpen: e, file: t, onClose: n, onConfirm: r }) {
  const [i, s] = a.useState("");
  return a.useEffect(() => {
    if (!e || !t) {
      s("");
      return;
    }
    const l = URL.createObjectURL(t);
    return s(l), () => {
      URL.revokeObjectURL(l);
    };
  }, [e, t]), o.jsx(Ft, { isOpen: e && !!t, onClose: n, contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: i ? o.jsx(kl, { imageSrc: i, ...(t == null ? void 0 : t.name) ? { fileName: t.name } : {}, onCancel: n, onConfirm: r }) : null });
}
const qo = "s3haim_md_editor_base64_image_fold";
function Gn() {
  if (typeof window > "u") return true;
  try {
    const e = window.localStorage.getItem(qo);
    return e === null ? true : e === "1";
  } catch {
    return true;
  }
}
function Nc(e) {
  if (!(typeof window > "u")) try {
    window.localStorage.setItem(qo, e ? "1" : "0");
  } catch {
  }
}
function jc() {
  const [e, t] = a.useState(Gn), n = a.useCallback((r) => {
    t((i) => {
      const s = typeof r == "function" ? r(i) : !!r;
      return Nc(s), s;
    });
  }, []);
  return [e, n];
}
function Mc() {
  const [e, t] = a.useState(Do);
  a.useEffect(() => fi((r) => {
    t(r);
  }), []);
  const n = a.useCallback((r) => {
    t((i) => {
      const s = typeof r == "function" ? r(i) : !!r;
      return mi(s), s;
    });
  }, []);
  return [e, n];
}
function Rc() {
  const [e, t] = a.useState(pi);
  a.useEffect(() => hi((r) => {
    t(r);
  }), []);
  const n = a.useCallback((r) => {
    t((i) => {
      const s = typeof r == "function" ? r(i) : !!r;
      return gi(s), s;
    });
  }, []);
  return [e, n];
}
const Tc = 48, $r = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi, Uo = Eo.define(), Xo = Eo.define(), Yo = new Jn();
function Lc(e) {
  const t = [];
  $r.lastIndex = 0;
  let n;
  for (; (n = $r.exec(e)) !== null; ) {
    const r = n[1] ?? "image", i = n[2] ?? "";
    if (i.length < Tc) continue;
    const s = n[0], l = s.length - i.length, u = n.index + l;
    t.push({ from: u, to: n.index + s.length, mime: r });
  }
  return t;
}
function Pc(e, t) {
  const n = Math.round(t * 3 / 4), r = n >= 1024 * 1024 ? `${(n / (1024 * 1024)).toFixed(1)}MB` : n >= 1024 ? `${Math.max(1, Math.round(n / 1024))}KB` : `${n}B`;
  return `\u2026${e} ${r}\u2026`;
}
class Ac extends Ss {
  constructor(t, n, r) {
    super(), this.label = t, this.from = n, this.to = r;
  }
  toDOM(t) {
    const n = document.createElement("span");
    return n.textContent = this.label, n.className = "cm-base64-image-fold", n.title = "Click to expand base64 image data", n.addEventListener("mousedown", (r) => {
      r.preventDefault(), r.stopPropagation(), t.dispatch({ selection: { anchor: this.from }, effects: Uo.of({ from: this.from, to: this.to }) }), t.focus();
    }), n.addEventListener("click", (r) => {
      r.preventDefault();
    }), n;
  }
  ignoreEvent() {
    return false;
  }
  eq(t) {
    return this.label === t.label && this.from === t.from && this.to === t.to;
  }
}
function Dc(e, t, n) {
  return e.some((r) => r.from === t && r.to === n);
}
function _r(e, t) {
  const n = [], r = [];
  for (let i = 1; i <= e.doc.lines; i += 1) {
    const s = e.doc.line(i);
    for (const l of Lc(s.text)) {
      const u = s.from + l.from, p = s.from + l.to;
      if (Dc(t, u, p)) {
        r.push({ from: u, to: p });
        continue;
      }
      n.push(cr.replace({ widget: new Ac(Pc(l.mime, p - u), u, p) }).range(u, p));
    }
  }
  return { deco: cr.set(n, true), expanded: r };
}
const Go = Co.define({ create(e) {
  return _r(e, []);
}, update(e, t) {
  let n = e.expanded;
  t.docChanged && n.length && (n = n.map(({ from: i, to: s }) => ({ from: t.changes.mapPos(i, 1), to: t.changes.mapPos(s, -1) })).filter(({ from: i, to: s }) => i < s));
  let r = n !== e.expanded;
  for (const i of t.effects) i.is(Uo) ? (n = [{ from: i.value.from, to: i.value.to }], r = true) : i.is(Xo) && n.length > 0 && (n = [], r = true);
  return t.docChanged || r ? _r(t.state, n) : e;
}, provide: (e) => Lt.decorations.from(e, (t) => t.deco) }), Ic = Lt.domEventHandlers({ mousedown(e, t) {
  const n = t.state.field(Go, false);
  if (!n || n.expanded.length === 0) return false;
  const r = e.target;
  if (!(r instanceof Node) || !t.dom.contains(r)) return false;
  const i = t.posAtDOM(r, 0);
  return i !== -1 && n.expanded.some(({ from: s, to: l }) => i >= s && i <= l) || t.dispatch({ effects: Xo.of(null) }), false;
} });
function Qo() {
  return [Go, Ic];
}
function Fc(e) {
  return Yo.of(e ? Qo() : []);
}
function $c(e, t) {
  if (e) try {
    e.dispatch({ effects: Yo.reconfigure(t ? Qo() : []) });
  } catch {
  }
}
const Zo = new Jn();
function _c(e, t, n) {
  let r = false;
  return Mo(e).between(t, n, () => {
    r = true;
  }), r;
}
function Hc(e) {
  const t = [], n = e.doc.toString();
  return er(e).iterate({ enter(r) {
    if (r.name !== "FencedCode") return;
    const i = Io(n, r.from, r.to);
    i && t.push(i);
  } }), t;
}
function Jo(e, t, n) {
  return e.some((r) => r.from === t && r.to === n);
}
const es = Co.define({ create() {
  return [];
}, update(e, t) {
  let n = e;
  t.docChanged && n.length && (n = n.map(({ from: i, to: s }) => ({ from: t.changes.mapPos(i, 1), to: t.changes.mapPos(s, -1) })).filter(({ from: i, to: s }) => i < s));
  let r = n !== e;
  for (const i of t.effects) if (i.is(It)) Jo(n, i.value.from, i.value.to) || (n = [...n, i.value], r = true);
  else if (i.is(it)) {
    const s = n.filter((l) => l.from !== i.value.from || l.to !== i.value.to);
    s.length !== n.length && (n = s, r = true);
  }
  return r ? n : e;
} });
function Hr(e) {
  const t = e.state.field(es), n = [];
  for (const r of Hc(e.state)) Jo(t, r.from, r.to) || _c(e.state, r.from, r.to) || n.push(it.of(r));
  n.length > 0 && e.dispatch({ effects: n });
}
const Oc = jo.fromClass(class {
  constructor(e) {
    Hr(e);
  }
  update(e) {
    e.docChanged && Hr(e.view);
  }
}), Bc = No.of((e, t) => {
  const n = e.doc.toString();
  let r = null;
  return er(e).iterate({ enter(i) {
    if (i.name !== "FencedCode" || e.doc.lineAt(i.from).from !== t) return;
    const l = Io(n, i.from, i.to);
    if (l) return r = l, false;
  } }), r;
});
function ts() {
  return [es, So(), Bc, Oc];
}
function Kc(e) {
  return Zo.of(e ? ts() : []);
}
function zc(e, t) {
  if (e) try {
    e.dispatch({ effects: Zo.reconfigure(t ? ts() : []) });
  } catch {
  }
}
const Vc = `<br/>
`;
function Wc(e) {
  if (!xi() || !(e == null ? void 0 : e.state)) return false;
  const t = e.state.selection.main, n = Vc;
  return e.dispatch({ changes: { from: t.from, to: t.to, insert: n }, selection: Ie.cursor(t.from + n.length), scrollIntoView: true }), true;
}
const Or = 80, qc = 350;
function Br(e) {
  return JSON.stringify(e);
}
function Kr(e) {
  try {
    const t = JSON.parse(e);
    return !t || typeof t != "object" || !t.meta || typeof t.meta != "object" || !t.grid || !Array.isArray(t.grid.rows) ? null : t;
  } catch {
    return null;
  }
}
function Uc(e) {
  return !Array.isArray(e) || e.length === 0 ? [] : e.length <= Or ? e : e.slice(e.length - Or);
}
function Xc(e, t, n) {
  const r = Array.isArray(e) && e.length > 0 ? e : [];
  if (r.length === 0) return { stack: [n], index: 0, changed: true };
  const i = Math.max(0, Math.min(t, r.length - 1));
  if (r[i] === n) return { stack: r, index: i, changed: false };
  const s = r.slice(0, i + 1);
  s.push(n);
  const l = Uc(s);
  return { stack: l, index: l.length - 1, changed: true };
}
function Yc({ enabled: e, historyKey: t, meta: n, grid: r, applySnapshot: i }) {
  const s = a.useRef([]), l = a.useRef(0), u = a.useRef(false), p = a.useRef(false), m = a.useRef(null), b = a.useRef(null), T = a.useRef(i);
  T.current = i;
  const [N, R] = a.useState(0), S = a.useCallback(() => R((z) => z + 1), []), L = a.useCallback(() => {
    m.current && (clearTimeout(m.current), m.current = null);
  }, []), K = a.useCallback(() => Br({ meta: n, grid: r }), [r, n]), F = a.useCallback(() => {
    L();
    const z = b.current;
    if (z == null) return;
    b.current = null;
    const H = Xc(s.current, l.current, z);
    H.changed && (s.current = H.stack, l.current = H.index, S());
  }, [S, L]);
  a.useEffect(() => {
    if (!e) {
      L(), b.current = null, s.current = [], l.current = 0, p.current = false, S();
      return;
    }
    if (t <= 0) return;
    L(), b.current = null;
    const z = Br({ meta: n, grid: r });
    s.current = [z], l.current = 0, p.current = true, S();
  }, [e, t, S, L]), a.useEffect(() => {
    if (!e || !p.current || u.current) return;
    const z = K();
    if (s.current[l.current] !== z) return b.current = z, L(), m.current = setTimeout(() => {
      m.current = null, F();
    }, qc), () => {
      L();
    };
  }, [L, K, e, F, r, n]);
  const Z = a.useCallback(() => {
    !e || !p.current || u.current || (b.current = K(), F());
  }, [K, e, F]), J = a.useCallback(() => {
    if (F(), l.current <= 0) return false;
    l.current -= 1;
    const z = s.current[l.current], H = z ? Kr(z) : null;
    return H ? (u.current = true, T.current(H), S(), requestAnimationFrame(() => {
      u.current = false;
    }), true) : false;
  }, [S, F]), v = a.useCallback(() => {
    if (F(), l.current >= s.current.length - 1) return false;
    l.current += 1;
    const z = s.current[l.current], H = z ? Kr(z) : null;
    return H ? (u.current = true, T.current(H), S(), requestAnimationFrame(() => {
      u.current = false;
    }), true) : false;
  }, [S, F]), P = e && p.current && l.current > 0, Q = e && p.current && l.current < s.current.length - 1;
  return { undo: J, redo: v, canUndo: P, canRedo: Q, recordNow: Z, flushPendingRecord: F };
}
const Gc = ["thead", "tbody", "tfoot"], $n = 10, zr = 36, Vr = 44, bt = 4, Yt = 14, Qc = "h-3.5 w-3.5 shrink-0", ie = "h-3 w-3 shrink-0", _n = "__none__", Zc = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), Jc = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Wr = 288, ns = 200, eu = 480, tu = 380, nu = 560, qr = 16, Mt = 6, ru = [{ value: "full", label: "\uD398\uC774\uC9C0 \uC804\uCCB4 (full)" }, { value: "fit", label: "\uB0B4\uC6A9\uB9CC\uD07C (fit)" }], ou = [{ value: "left", label: "\uC67C\uCABD" }, { value: "right", label: "\uC624\uB978\uCABD" }], su = "pointer-events-none z-100050 max-w-[240px] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", iu = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", Ur = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", rs = typeof navigator < "u" && (/Mac|iPhone|iPad|iPod/i.test(navigator.platform) || /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent ?? "")), at = rs ? "\u2318" : "Ctrl", au = `${at}+E`, lu = `${at}+Shift+E`, cu = `${at}+Shift+>`, uu = `${at}+Shift+<`, Hn = `${at}+Z`, On = rs ? `${at}+Shift+Z` : `${at}+Y`, du = 14;
function fu(e, t, n = du) {
  const r = (e || "").trim(), i = /^(\d+(?:\.\d+)?)(px|%|em|rem|pt)?$/i.exec(r), s = ((i == null ? void 0 : i[2]) || "px").toLowerCase(), l = i ? Number(i[1]) : n, u = s === "em" || s === "rem" ? 0.1 : 1, p = s === "em" || s === "rem" ? 0.5 : s === "%" ? 50 : 8;
  let m = (Number.isFinite(l) ? l : n) + t * u;
  return m = Math.max(p, m), s === "em" || s === "rem" ? m = Math.round(m * 10) / 10 : m = Math.round(m), `${m}${s}`;
}
function st({ icon: e, children: t }) {
  return o.jsxs("span", { className: "inline-flex items-center gap-1", children: [o.jsx("span", { className: "inline-flex shrink-0 text-gray-400 dark:text-odp-muted", "aria-hidden": true, children: e }), t] });
}
function pt(e) {
  return Math.min(eu, Math.max(ns, Math.round(e)));
}
function Xr({ onDelta: e, ariaLabel: t }) {
  const n = a.useRef(0);
  return o.jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": t, className: "group relative hidden w-1.5 shrink-0 cursor-col-resize touch-none select-none landscape:flex", onPointerDown: (r) => {
    r.preventDefault(), r.stopPropagation(), r.currentTarget.setPointerCapture(r.pointerId), n.current = r.clientX;
  }, onPointerMove: (r) => {
    if (!r.currentTarget.hasPointerCapture(r.pointerId)) return;
    const i = r.clientX - n.current;
    n.current = r.clientX, i !== 0 && e(i);
  }, onPointerUp: (r) => {
    r.currentTarget.hasPointerCapture(r.pointerId) && r.currentTarget.releasePointerCapture(r.pointerId);
  }, onPointerCancel: (r) => {
    r.currentTarget.hasPointerCapture(r.pointerId) && r.currentTarget.releasePointerCapture(r.pointerId);
  }, children: o.jsx("span", { className: "absolute inset-y-2 left-1/2 w-px -translate-x-1/2 rounded-full bg-gray-300 transition-colors group-hover:bg-blue-400 group-active:bg-blue-500 dark:bg-odp-borderStrong dark:group-hover:bg-blue-400", "aria-hidden": true }) });
}
function mu(e, t) {
  return e === 0 ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC704\uC5D0 \uD589 \uCD94\uAC00" : e === t ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC544\uB798\uC5D0 \uD589 \uCD94\uAC00" : `\uB354\uBE14\uD074\uB9AD: ${e}\uD589 \uC704\uC5D0 \uD589 \uCD94\uAC00`;
}
function pu(e, t) {
  return e === 0 ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uC55E\uC5D0 \uC5F4 \uCD94\uAC00" : e === t ? "\uB354\uBE14\uD074\uB9AD: \uB9E8 \uB4A4\uC5D0 \uC5F4 \uCD94\uAC00" : `\uB354\uBE14\uD074\uB9AD: ${e}\uC5F4 \uC55E\uC5D0 \uC5F4 \uCD94\uAC00`;
}
function Yr(e) {
  return e === "row" ? "\uB4DC\uB798\uADF8: \uD589 \uB192\uC774 \uC870\uC808" : "\uB4DC\uB798\uADF8: \uC5F4 \uB108\uBE44 \uC870\uC808";
}
function Gr(e, t, n, r, i, s) {
  const l = r.left - i.left, u = t - i.top, p = r.width, m = Math.min(Math.max(n - i.left, l), l + p);
  return { kind: "row", index: e, x: m, y: u, edge: { left: l, top: u - bt / 2, width: p, height: bt }, ghost: { left: l, top: u - zr / 2, width: p, height: zr }, label: mu(e, s) };
}
function Qr(e, t, n, r, i, s) {
  const l = r.top - i.top, u = t - i.left, p = r.height, m = Math.min(Math.max(n - i.top, l), l + p);
  return { kind: "col", index: e, x: u, y: m, edge: { left: u - bt / 2, top: l, width: bt, height: p }, ghost: { left: u - Vr / 2, top: l, width: Vr, height: p }, label: pu(e, s) };
}
function hu({ tip: e, onDoubleClick: t, style: n }) {
  return o.jsxs(Wn, { open: true, children: [o.jsx(qn, { asChild: true, children: o.jsx("button", { type: "button", "aria-label": e, style: n, onClick: (r) => {
    r.preventDefault(), r.stopPropagation();
  }, onDoubleClick: (r) => {
    r.preventDefault(), r.stopPropagation(), t();
  }, onMouseDown: (r) => {
    r.preventDefault(), r.stopPropagation();
  }, onPointerDown: (r) => {
    r.preventDefault(), r.stopPropagation();
  }, "data-haim-edge-add": "", className: "haim-table-insert-btn pointer-events-auto absolute z-30 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-400/80 bg-white text-blue-600 shadow-sm hover:bg-blue-50 dark:border-blue-400/70 dark:bg-odp-surface dark:text-blue-300 dark:hover:bg-blue-950/60", children: o.jsx(Ga, { className: "h-3 w-3", "aria-hidden": true }) }) }), o.jsx(Un, { children: o.jsxs(Xn, { className: su, side: "top", sideOffset: 8, children: [e, o.jsx(Yn, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function gu({ insert: e, tip: t, allowResize: n, onDoubleClickInsert: r, onResizePointerDown: i }) {
  const s = e.kind === "row", l = s ? { left: e.edge.left, top: e.edge.top + bt / 2 - Yt / 2, width: e.edge.width, height: Yt } : { left: e.edge.left + bt / 2 - Yt / 2, top: e.edge.top, width: Yt, height: e.edge.height };
  return o.jsx("div", { role: "presentation", title: t, "data-haim-edge-hit": "", className: `pointer-events-auto absolute z-[25] ${n ? s ? "cursor-row-resize" : "cursor-col-resize" : "cursor-pointer"}`, style: { left: l.left, top: l.top, width: l.width, height: l.height }, onMouseDown: (u) => {
    u.preventDefault(), u.stopPropagation();
  }, onPointerDown: (u) => {
    if (u.preventDefault(), u.stopPropagation(), u.button !== 0 || u.detail >= 2 || !n) return;
    const p = u.clientX, m = u.clientY, b = u;
    let T = false;
    const N = () => {
      document.removeEventListener("pointermove", R, true), document.removeEventListener("pointerup", S, true), document.removeEventListener("pointercancel", S, true);
    }, R = (L) => {
      T || Math.abs(L.clientX - p) < 3 && Math.abs(L.clientY - m) < 3 || (T = true, N(), i(b));
    }, S = () => {
      N();
    };
    document.addEventListener("pointermove", R, true), document.addEventListener("pointerup", S, true), document.addEventListener("pointercancel", S, true);
  }, onDoubleClick: (u) => {
    u.preventDefault(), u.stopPropagation(), r();
  } });
}
function xu({ insert: e }) {
  const t = `${e.kind}-${e.index}`;
  return o.jsxs("div", { "data-haim-insert-preview": "", className: "contents", children: [o.jsx("div", { "aria-hidden": true, className: `pointer-events-none absolute z-10 rounded-sm border border-transparent bg-blue-400/[0.04] dark:bg-blue-400/[0.06] ${e.kind === "row" ? "haim-table-insert-ghost-row" : "haim-table-insert-ghost-col"}`, style: { left: e.ghost.left, top: e.ghost.top, width: e.ghost.width, height: e.ghost.height } }, `ghost-${t}`), o.jsx("div", { "aria-hidden": true, className: "haim-table-insert-glow pointer-events-none absolute z-[11] rounded-full", style: { left: e.edge.left, top: e.edge.top, width: e.edge.width, height: e.edge.height } }, `glow-${t}`)] });
}
function bu({ kind: e, indices: t, table: n, wrap: r, colCount: i }) {
  const [s, l] = a.useState([]);
  return a.useEffect(() => {
    if (!n || !r || !t.length) {
      l([]);
      return;
    }
    const u = () => {
      const p = r.getBoundingClientRect(), m = n.getBoundingClientRect(), b = [];
      if (e === "row") for (const T of t) {
        const N = n.rows[T];
        if (!N) continue;
        const R = N.getBoundingClientRect();
        b.push({ left: m.left - p.left, top: R.top - p.top, width: m.width, height: Math.max(1, R.height) });
      }
      else {
        const T = os(n, i);
        for (const N of t) {
          const R = T[N], S = T[N + 1];
          R == null || S == null || b.push({ left: R - p.left, top: m.top - p.top, width: Math.max(1, S - R), height: m.height });
        }
      }
      l(b);
    };
    return u(), window.addEventListener("resize", u), () => window.removeEventListener("resize", u);
  }, [i, t, e, n, r]), s.length ? o.jsx("div", { "data-haim-delete-preview": "", className: "pointer-events-none absolute inset-0 z-20", "aria-hidden": true, children: s.map((u, p) => o.jsx("div", { className: "absolute rounded-sm bg-red-500/25 ring-1 ring-inset ring-red-500/50 dark:bg-red-500/30 dark:ring-red-400/40", style: { left: u.left, top: u.top, width: u.width, height: u.height } }, `${e}-${t[p] ?? p}`)) }) : null;
}
function wu(e) {
  const t = [...e.rows];
  if (!t.length) return [];
  const n = [];
  for (let r = 0; r < t.length; r += 1) n.push(t[r].getBoundingClientRect().top);
  return n.push(t[t.length - 1].getBoundingClientRect().bottom), n;
}
function os(e, t) {
  const n = e.getBoundingClientRect(), r = [];
  for (let l = 0; l < t; l += 1) {
    const u = e.querySelectorAll(`[data-edit-c="${l}"]`);
    let p = null;
    u.forEach((m) => {
      const b = m.getBoundingClientRect();
      (p == null || b.left < p) && (p = b.left);
    }), p != null ? r.push(p) : r.push(n.left + n.width * l / Math.max(t, 1));
  }
  let i = n.right;
  return e.querySelectorAll(`[data-edit-c="${t - 1}"]`).forEach((l) => {
    const u = l.getBoundingClientRect();
    u.right > i && (i = u.right);
  }), r.push(i), r;
}
function yu(e, t, n) {
  var _a2, _b;
  if (!n.length || typeof document > "u") return null;
  const i = (_b = (_a2 = document.elementFromPoint(e, t)) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "td[data-edit-r][data-edit-c]");
  if (!i) return null;
  const s = Number(i.getAttribute("data-edit-r")), l = Number(i.getAttribute("data-edit-c"));
  return !Number.isInteger(s) || !Number.isInteger(l) ? null : Ti(n, s, l);
}
function Zr(e, t, n) {
  return e === "col" ? n.colspan > 1 && n.c < t && t < n.c + n.colspan : n.rowspan > 1 && n.r < t && t < n.r + n.rowspan;
}
function Rt(e, t, n, r, i, s, l) {
  const u = e.getBoundingClientRect(), p = t.getBoundingClientRect(), m = $n + 2;
  if (n < u.left - m || n > u.right + m || r < u.top - m || r > u.bottom + m) return null;
  const b = wu(e), T = os(e, s), N = yu(n, r, l);
  let R = null;
  for (let L = 0; L < b.length; L += 1) {
    if (N && Zr("row", L, N)) continue;
    const K = b[L], F = Math.abs(r - K);
    F <= $n && n >= u.left - m && n <= u.right + m && (!R || F < R.dist) && (R = { index: L, dist: F, y: K });
  }
  let S = null;
  for (let L = 0; L < T.length; L += 1) {
    if (N && Zr("col", L, N)) continue;
    const K = T[L], F = Math.abs(n - K);
    F <= $n && r >= u.top - m && r <= u.bottom + m && (!S || F < S.dist) && (S = { index: L, dist: F, x: K });
  }
  return R && S ? R.dist <= S.dist ? Gr(R.index, R.y, n, u, p, i) : Qr(S.index, S.x, r, u, p, s) : R ? Gr(R.index, R.y, n, u, p, i) : S ? Qr(S.index, S.x, r, u, p, s) : null;
}
function vu({ isOpen: e, initialMeta: t, initialGrid: n, onClose: r, onSave: i }) {
  var _a2, _b, _c2, _d2, _e2, _f;
  const [s, l] = a.useState(nn()), [u, p] = a.useState(n), [m, b] = a.useState(null), [T, N] = a.useState(false), [R, S] = a.useState("thead"), [L, K] = a.useState([]), [F, Z] = a.useState(false), [J, v] = a.useState(null), [P, Q] = a.useState(null), [z, H] = a.useState(false), [E, V] = a.useState(0), [Y, ne] = a.useState(null), [se, ee] = a.useState(null), ye = a.useRef(null), [G, re] = a.useState(null), oe = G !== null, q = Fo(), [ae, Ue] = a.useState(Wr), [Le, Xe] = a.useState(Wr), [je, ve] = a.useState(false), [Ne, _e] = a.useState(false), [O, $] = a.useState(() => typeof window < "u" ? window.innerWidth : 1280), [U, W] = a.useState(() => typeof window < "u" ? window.matchMedia("(orientation: landscape)").matches : true), me = a.useRef(null), pe = a.useRef(null), he = a.useRef(null), He = a.useRef(null), $e = a.useRef(false), Me = a.useRef(null), fe = a.useRef(null), Oe = a.useRef(false), Pe = a.useRef(false), Ye = a.useRef({ x: 0, y: 0 });
  He.current = P, $e.current = T, fe.current = m, Oe.current = je, Pe.current = oe, ye.current = se;
  const Ge = a.useRef(t), ge = a.useRef(n);
  Ge.current = t, ge.current = n, a.useEffect(() => {
    if (!e) return;
    const d = Ge.current, c = ge.current;
    l(d ? { ...d } : nn()), p({ rows: c.rows.map((g) => [...g]), aligns: [...c.aligns] }), b(null), N(false), Me.current = null, Q(null), ve(false), _e(false), re(null), ee(null), V((g) => g + 1), bi().then((g) => K(g.templates)), wi().then((g) => yi(g));
  }, [e]);
  const Qe = a.useCallback((d) => {
    l(d.meta), p({ rows: d.grid.rows.map((c) => [...c]), aligns: [...d.grid.aligns ?? []] }), b(null), N(false), Me.current = null, Q(null);
  }, []), { undo: kt, redo: Ae, canUndo: Ze, canRedo: Ct, recordNow: _t } = Yc({ enabled: e, historyKey: E, meta: s, grid: u, applySnapshot: Qe }), ct = a.useRef(false);
  a.useEffect(() => {
    ct.current && !z && _t(), ct.current = z;
  }, [z, _t]), a.useEffect(() => {
    if (!e) return;
    const d = (c) => {
      if (!(c.metaKey || c.ctrlKey) || c.altKey) return;
      const k = c.key.toLowerCase(), C = k === "z" && !c.shiftKey, A = k === "y" || k === "z" && c.shiftKey;
      !C && !A || (c.preventDefault(), c.stopPropagation(), c.stopImmediatePropagation(), A ? Ae() : kt());
    };
    return window.addEventListener("keydown", d, true), () => window.removeEventListener("keydown", d, true);
  }, [e, Ae, kt]), a.useEffect(() => {
    if (!e || typeof window > "u") return;
    const d = window.matchMedia("(orientation: landscape)"), c = () => {
      $(window.innerWidth), W(d.matches);
    };
    return c(), window.addEventListener("resize", c), d.addEventListener("change", c), () => {
      window.removeEventListener("resize", c), d.removeEventListener("change", c);
    };
  }, [e]);
  const ke = a.useMemo(() => vi(s.merges), [s.merges]), xe = u.rows.length, de = Math.max(1, ...u.rows.map((d) => d.length), u.aligns.length), Ce = a.useMemo(() => {
    if (!m) return [];
    const d = [], c = Math.min(m.r0, m.r1), g = Math.min(m.c0, m.c1), k = Math.max(m.r0, m.r1), C = Math.max(m.c0, m.c1);
    for (let A = c; A <= k; A += 1) for (let I = g; I <= C; I += 1) ke.has(`${A},${I}`) || d.push({ r: A, c: I });
    return d;
  }, [m, ke]), le = Ce[0] ?? null, ut = !!le, Et = a.useRef(ae), Ke = a.useRef(Le);
  Et.current = ae, Ke.current = Le;
  const dt = a.useMemo(() => {
    const d = O * 0.95;
    return Math.max(ns, d - qr - Mt - tu);
  }, [O]), Ht = a.useCallback((d) => {
    const c = Et.current, g = Ke.current, k = c + g;
    let C = pt(c + d), A = pt(k - C);
    C = pt(k - A), A = pt(k - C), Ue(C), Xe(A);
  }, []), Ot = a.useCallback((d) => {
    Xe((c) => {
      const g = pt(c + d);
      if (ae + Mt + g <= dt) return g;
      const C = dt - ae - Mt;
      return pt(C);
    });
  }, [dt, ae]), mn = a.useMemo(() => {
    const d = O * 0.95;
    if (!U) return { width: d, maxWidth: "95dvw", height: "95dvh", maxHeight: "95dvh" };
    const c = ae + Mt + Le;
    return { width: Math.min(d, qr + c + Mt + nu), maxWidth: "95dvw", height: "95dvh", maxHeight: "95dvh" };
  }, [Le, U, ae, O]), ft = a.useMemo(() => le ? s.cells[Fe(le.r, le.c)] ?? {} : {}, [s.cells, le]), Re = a.useCallback((d) => {
    Ce.length && l((c) => {
      const g = { ...c.cells };
      for (const { r: k, c: C } of Ce) {
        const A = Fe(k, C);
        gr(d) ? delete g[A] : g[A] = d;
      }
      return { ...c, cells: g };
    });
  }, [Ce]), ue = a.useCallback((d) => {
    p(d.grid), l(d.meta), b(null), N(false), Me.current = null, Q(null);
  }, []), Ee = a.useRef(u), Be = a.useRef(s);
  Ee.current = u, Be.current = s;
  const Je = a.useCallback((d) => {
    ue(_l(Ee.current, Be.current, d));
  }, [ue]), Bt = a.useCallback((d) => {
    ue(Hl(Ee.current, Be.current, d));
  }, [ue]), Kt = a.useCallback((d) => {
    const c = fe.current;
    let g, k;
    if (c) g = Math.min(c.r0, c.r1), k = Math.max(c.r0, c.r1), d != null && (d < g || d > k) && (g = d, k = d);
    else if (d != null) g = d, k = d;
    else {
      const I = ye.current;
      (I == null ? void 0 : I.kind) === "row" && I.indices.length && (ee(null), ne({ kind: "row", indices: [...I.indices] }));
      return;
    }
    const C = [];
    for (let I = g; I <= k; I += 1) C.push(I);
    const A = Ee.current.rows.length;
    A <= 1 || C.length === 0 || C.length >= A || (ee(null), ne({ kind: "row", indices: C }));
  }, []), et = a.useCallback((d) => {
    const c = fe.current;
    let g, k;
    if (c) g = Math.min(c.c0, c.c1), k = Math.max(c.c0, c.c1), d != null && (d < g || d > k) && (g = d, k = d);
    else if (d != null) g = d, k = d;
    else {
      const I = ye.current;
      (I == null ? void 0 : I.kind) === "col" && I.indices.length && (ee(null), ne({ kind: "col", indices: [...I.indices] }));
      return;
    }
    const C = [];
    for (let I = g; I <= k; I += 1) C.push(I);
    const A = Math.max(1, ...Ee.current.rows.map((I) => I.length), Ee.current.aligns.length, 1);
    A <= 1 || C.length === 0 || C.length >= A || (ee(null), ne({ kind: "col", indices: C }));
  }, []), zt = a.useCallback((d) => {
    const c = fe.current;
    let g, k;
    c ? (g = Math.min(c.r0, c.r1), k = Math.max(c.r0, c.r1), (d < g || d > k) && (g = d, k = d)) : (g = d, k = d);
    const C = [];
    for (let I = g; I <= k; I += 1) C.push(I);
    const A = Ee.current.rows.length;
    if (A <= 1 || C.length === 0 || C.length >= A) {
      ee(null);
      return;
    }
    ee({ kind: "row", indices: C });
  }, []), Vt = a.useCallback((d) => {
    const c = fe.current;
    let g, k;
    c ? (g = Math.min(c.c0, c.c1), k = Math.max(c.c0, c.c1), (d < g || d > k) && (g = d, k = d)) : (g = d, k = d);
    const C = [];
    for (let I = g; I <= k; I += 1) C.push(I);
    const A = Math.max(1, ...Ee.current.rows.map((I) => I.length), Ee.current.aligns.length, 1);
    if (A <= 1 || C.length === 0 || C.length >= A) {
      ee(null);
      return;
    }
    ee({ kind: "col", indices: C });
  }, []), ze = a.useCallback(() => {
    ee(null);
  }, []), pn = a.useCallback(() => {
    Y && (Y.kind === "row" ? ue(Kl(Ee.current, Be.current, Y.indices)) : ue(zl(Ee.current, Be.current, Y.indices)), ne(null), ee(null));
  }, [ue, Y]), hn = !!(m && !(m.r0 === m.r1 && m.c0 === m.c1)), Te = a.useCallback(() => {
    !m || m.r0 === m.r1 && m.c0 === m.c1 || l((d) => ({ ...d, merges: ki(d.merges, m.r0, m.c0, m.r1, m.c1) }));
  }, [m]), mt = a.useCallback(() => {
    m && l((d) => ({ ...d, merges: Ci(d.merges, m.r0, m.c0, m.r1, m.c1) }));
  }, [m]), Wt = a.useCallback((d) => {
    Ce.length && l((c) => {
      var _a3;
      const g = { ...c.cells }, k = (_a3 = c.style) == null ? void 0 : _a3.fontSize;
      for (const { r: C, c: A } of Ce) {
        const I = Fe(C, A), be = g[I] ?? {};
        g[I] = { ...be, fontSize: fu(be.fontSize ?? k, d) };
      }
      return { ...c, cells: g };
    });
  }, [Ce]);
  a.useEffect(() => {
    if (!e) return;
    const d = (c) => {
      if (!(!(c.metaKey || c.ctrlKey) || c.altKey)) {
        if (c.shiftKey) {
          const g = c.code === "Period" || c.key === ">" || c.key === ".", k = c.code === "Comma" || c.key === "<" || c.key === ",";
          if (g || k) {
            if (!Ce.length) return;
            c.preventDefault(), c.stopPropagation(), Wt(g ? 1 : -1);
            return;
          }
        }
        c.code !== "KeyE" && c.key.toLowerCase() !== "e" || (c.preventDefault(), c.stopPropagation(), c.shiftKey ? mt() : Te());
      }
    };
    return window.addEventListener("keydown", d, true), () => window.removeEventListener("keydown", d, true);
  }, [e, Te, Wt, Ce.length, mt]);
  const gn = a.useCallback((d) => {
    var _a3, _b2;
    if (Pe.current) {
      Q(null);
      return;
    }
    if (T || z) {
      T && Q(null);
      return;
    }
    if ((_b2 = (_a3 = d.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-add], [data-haim-edge-hit]")) return;
    const c = he.current, g = pe.current;
    if (!c || !g) return;
    const k = Rt(c, g, d.clientX, d.clientY, xe, de, s.merges);
    Q((C) => k ? C && C.kind === k.kind && C.index === k.index ? C.x === k.x && C.y === k.y ? C : { ...C, x: k.x, y: k.y } : k : null);
  }, [de, z, s.merges, T, xe]), xn = a.useCallback((d, c) => {
    var _a3, _b2;
    if (c.index === 0 || Pe.current) return;
    d.preventDefault(), d.stopPropagation();
    const g = he.current;
    if (!g) return;
    const k = c.index - 1;
    let C = 0, A = 0;
    if (c.kind === "col") {
      const _ = (_a3 = g.querySelector(`[data-edit-c="${k}"]`)) == null ? void 0 : _a3.getBoundingClientRect();
      if (!_) return;
      C = _.left;
    } else {
      const _ = (_b2 = g.rows[k]) == null ? void 0 : _b2.getBoundingClientRect();
      if (!_) return;
      A = _.top;
    }
    H(true), N(false), Q(null);
    const I = (Se) => {
      let _ = 24;
      c.kind === "col" ? _ = Se.clientX - C : _ = Se.clientY - A, _ = Math.max(24, Math.round(_)), l((we) => c.kind === "col" ? { ...we, colWidths: xr(we.colWidths, k, _) } : { ...we, rowHeights: xr(we.rowHeights, k, _) });
    }, be = () => {
      document.removeEventListener("pointermove", I, true), document.removeEventListener("pointerup", be, true), document.removeEventListener("pointercancel", be, true), H(false);
    };
    document.addEventListener("pointermove", I, true), document.addEventListener("pointerup", be, true), document.addEventListener("pointercancel", be, true);
  }, []), Ve = a.useCallback((d, c, g) => {
    p((k) => {
      const C = Math.max(1, ...k.rows.map((be) => be.length), k.aligns.length), A = k.rows.map((be) => [...be]);
      for (; A.length <= d; ) A.push(Array(C).fill(""));
      const I = [...A[d] ?? Array(C).fill("")];
      for (; I.length < C; ) I.push("");
      return I[c] = g, A[d] = I, { ...k, rows: A };
    });
  }, []), tt = a.useCallback((d, c) => {
    const g = he.current;
    if (!g) return;
    const k = g.querySelector(`td[data-edit-r="${d}"][data-edit-c="${c}"] input`);
    k && (b({ r0: d, c0: c, r1: d, c1: c }), Me.current = { r: d, c }, N(false), Q(null), requestAnimationFrame(() => {
      k.focus(), k.select();
    }));
  }, []), nt = a.useCallback((d, c) => {
    b({ r0: d, c0: c, r1: d, c1: c }), Me.current = { r: d, c }, N(false), Q(null);
  }, []), rt = a.useCallback(() => {
    var _a3;
    b(null), N(false), Me.current = null;
    const d = document.activeElement;
    ((_a3 = d == null ? void 0 : d.closest) == null ? void 0 : _a3.call(d, "td[data-edit-r]")) && d.blur();
  }, []), qt = a.useCallback((d, c) => {
    const g = Me.current;
    if (!g) {
      nt(d, c);
      return;
    }
    b({ r0: g.r, c0: g.c, r1: d, c1: c }), N(false), Q(null);
  }, [nt]), St = a.useCallback((d, c) => {
    var _a3;
    b({ r0: d, c0: c, r1: d, c1: c }), Me.current = { r: d, c }, N(true), Q(null);
    const g = document.activeElement;
    ((_a3 = g == null ? void 0 : g.closest) == null ? void 0 : _a3.call(g, "td[data-edit-r]")) && g.blur();
  }, []), bn = a.useCallback((d, c) => {
    $e.current && b((g) => g && { ...g, r1: d, c1: c });
  }, []);
  a.useEffect(() => {
    if (!T) return;
    const d = () => N(false);
    return window.addEventListener("mouseup", d, true), window.addEventListener("pointerup", d, true), () => {
      window.removeEventListener("mouseup", d, true), window.removeEventListener("pointerup", d, true);
    };
  }, [T]), a.useEffect(() => {
    if (!e) return;
    const d = (C) => {
      var _a3, _b2, _c3;
      const A = C;
      if (!A) return false;
      const I = ((_b2 = (_a3 = A.tagName) == null ? void 0 : _a3.toLowerCase) == null ? void 0 : _b2.call(_a3)) ?? "";
      return I === "input" || I === "textarea" || I === "select" || A.isContentEditable ? true : !!((_c3 = A.closest) == null ? void 0 : _c3.call(A, 'input, textarea, select, [contenteditable="true"]'));
    }, c = (C) => {
      C.code !== "Space" && C.key !== " " || C.repeat || d(C.target) || fe.current || (C.preventDefault(), ve(true));
    }, g = (C) => {
      C.code !== "Space" && C.key !== " " || ve(false);
    }, k = () => ve(false);
    return window.addEventListener("keydown", c, true), window.addEventListener("keyup", g, true), window.addEventListener("blur", k), () => {
      window.removeEventListener("keydown", c, true), window.removeEventListener("keyup", g, true), window.removeEventListener("blur", k), ve(false);
    };
  }, [e]), a.useEffect(() => {
    m && ve(false);
  }, [m]);
  const f = a.useCallback(() => {
    _e(false);
  }, []), h = a.useCallback((d) => {
    const c = me.current;
    if (!c) return;
    const g = d.button === 1, k = d.button === 0 && je && !fe.current;
    if (g || k) {
      d.preventDefault(), d.stopPropagation(), Q(null), Ye.current = { x: d.clientX, y: d.clientY }, _e(true), c.setPointerCapture(d.pointerId);
      return;
    }
  }, [je]), x = a.useCallback((d) => {
    if (!Ne) return;
    const c = me.current;
    if (!c) return;
    const g = d.clientX - Ye.current.x, k = d.clientY - Ye.current.y;
    Ye.current = { x: d.clientX, y: d.clientY }, c.scrollLeft -= g, c.scrollTop -= k;
  }, [Ne]), w = a.useCallback((d) => {
    if (!Ne) return;
    const c = me.current;
    (c == null ? void 0 : c.hasPointerCapture(d.pointerId)) && c.releasePointerCapture(d.pointerId), f();
  }, [f, Ne]), y = a.useCallback((d) => {
    if (d.button !== 0 || je || Ne) return;
    const c = d.target;
    c && (c.closest("[data-haim-table-sidebars]") || c.closest("[data-haim-table-canvas] table, [data-haim-edge-hit], [data-haim-edge-add], [data-haim-insert-preview]") || fe.current && rt());
  }, [rt, Ne, je]), M = a.useCallback((d, c, g, k) => {
    let C = d + g, A = c + k;
    for (; C >= 0 && C < xe && A >= 0 && A < de; ) {
      if (!ke.has(`${C},${A}`)) {
        tt(C, A);
        return;
      }
      C += g, A += k;
    }
  }, [de, ke, tt, xe]), j = a.useCallback((d, c, g) => {
    if (d.nativeEvent.isComposing) return;
    if (d.key === "Enter") {
      d.preventDefault(), d.stopPropagation(), d.shiftKey ? M(c, g, -1, 0) : M(c, g, 1, 0);
      return;
    }
    if (!d.altKey) return;
    let k = 0, C = 0;
    if (d.key === "ArrowUp") k = -1;
    else if (d.key === "ArrowDown") k = 1;
    else if (d.key === "ArrowLeft") C = -1;
    else if (d.key === "ArrowRight") C = 1;
    else return;
    d.preventDefault(), d.stopPropagation(), M(c, g, k, C);
  }, [M]), D = a.useMemo(() => {
    var _a3;
    return le ? ((_a3 = u.rows[le.r]) == null ? void 0 : _a3[le.c]) ?? "" : "";
  }, [u.rows, le]), B = a.useMemo(() => s.templateId ? L.find((d) => d.id === s.templateId) ?? null : null, [s.templateId, L]), X = a.useCallback((d, c) => {
    const g = Ei({ row: d, col: c, rowCount: xe, colCount: de, meta: s, template: B }), k = {};
    return g.bg && (k.backgroundColor = g.bg), g.color && (k.color = g.color), g.fontFamily && (k.fontFamily = g.fontFamily), g.fontSize && (k.fontSize = g.fontSize), g.fontWeight && (k.fontWeight = g.fontWeight), k;
  }, [B, de, s, xe]), ce = (d, c) => {
    if (!m) return false;
    const g = Math.min(m.r0, m.r1), k = Math.min(m.c0, m.c1), C = Math.max(m.r0, m.r1), A = Math.max(m.c0, m.c1);
    return d >= g && d <= C && c >= k && c <= A;
  }, te = (d) => d === "thead" ? o.jsx(Pn, { className: ie, "aria-hidden": true }) : d === "tfoot" ? o.jsx(Rr, { className: ie, "aria-hidden": true }) : o.jsx(Tr, { className: ie, "aria-hidden": true });
  return o.jsxs(o.Fragment, { children: [o.jsxs(Ft, { isOpen: e, onClose: () => {
    if (Y !== null) {
      ne(null);
      return;
    }
    r();
  }, overlayClassName: "p-[2.5dvh]", contentClassName: "h-[95dvh] max-h-[95dvh] max-w-[95dvw]", contentStyle: mn, resizeHeight: true, children: [o.jsxs(ll, { className: "flex h-full min-h-0 flex-col", onSubmit: (d) => d.preventDefault(), onPointerDownCapture: y, children: [o.jsxs("header", { className: "flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-3 py-2 dark:border-odp-border", children: [o.jsxs("h2", { className: "inline-flex items-center gap-1.5 text-sm font-bold text-gray-800 dark:text-odp-fgStrong", children: [o.jsx(on, { className: Qc, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1"] }), o.jsxs("div", { className: "flex items-center gap-2", children: [o.jsxs("button", { type: "button", disabled: !Ze, title: `\uC2E4\uD589 \uCDE8\uC18C (${Hn})`, "aria-label": `\uC2E4\uD589 \uCDE8\uC18C (${Hn})`, onClick: () => kt(), className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(Ba, { className: ie, "aria-hidden": true }), "\uC2E4\uD589 \uCDE8\uC18C"] }), o.jsxs("button", { type: "button", disabled: !Ct, title: `\uB2E4\uC2DC \uC2E4\uD589 (${On})`, "aria-label": `\uB2E4\uC2DC \uC2E4\uD589 (${On})`, onClick: () => Ae(), className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(Ka, { className: ie, "aria-hidden": true }), "\uB2E4\uC2DC \uC2E4\uD589"] }), o.jsxs("button", { type: "button", onClick: r, className: "inline-flex items-center gap-1 rounded px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(cn, { className: ie, "aria-hidden": true }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: () => i(s, u), className: "inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700", children: [o.jsx(un, { className: ie, "aria-hidden": true }), "\uC801\uC6A9"] })] })] }), o.jsxs("div", { className: "flex min-h-0 flex-1 flex-col landscape:flex-row", children: [o.jsxs("div", { "data-haim-table-sidebars": "", className: "order-2 flex max-h-[42%] min-h-0 w-full shrink-0 flex-col gap-2 overflow-hidden border-t border-gray-100 bg-gray-50/80 p-2 dark:border-odp-border dark:bg-odp-bgSoft/40 portrait:max-h-[42%] landscape:order-1 landscape:max-h-none landscape:w-auto landscape:flex-row landscape:gap-0 landscape:border-t-0 landscape:border-r-0", children: [o.jsxs("aside", { className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-surface landscape:flex-none landscape:shrink-0", style: U ? { width: ae } : void 0, children: [o.jsx("div", { className: "sticky top-0 z-[1] border-b border-gray-100 bg-white px-2.5 py-1.5 dark:border-odp-border dark:bg-odp-surface", children: o.jsxs("h3", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong", children: [o.jsx(on, { className: ie, "aria-hidden": true }), "\uD45C \xB7 \uADF8\uB8F9"] }) }), o.jsxs("div", { className: "space-y-2 p-2.5", children: [o.jsxs("div", { className: "flex flex-wrap gap-2", children: [o.jsxs(qe, { name: "template", className: "flex min-w-0 flex-1 flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ot, { asChild: true, children: o.jsx("span", { children: o.jsx(st, { icon: o.jsx(Mr, { className: ie }), children: "\uD15C\uD50C\uB9BF" }) }) }), o.jsx(yn, { "aria-label": "\uD45C \uD15C\uD50C\uB9BF", value: s.templateId ?? _n, onValueChange: (d) => {
    if (d === _n) {
      l((g) => {
        const k = { ...g };
        return delete k.templateId, k;
      });
      return;
    }
    const c = L.find((g) => g.id === d);
    c && l((g) => Si(g, c));
  }, options: [{ value: _n, label: "\uD15C\uD50C\uB9BF \uC5C6\uC74C" }, ...L.map((d) => ({ value: d.id, label: d.name }))], className: "w-full min-w-0" })] }), o.jsxs("button", { type: "button", className: "mt-auto inline-flex h-8 items-center gap-1 self-end rounded-md bg-gray-100 px-2 text-[11px] dark:bg-odp-bgSoft", onClick: () => {
    v({ id: `template-${Date.now().toString(36)}`, name: "\uC0C8 \uD15C\uD50C\uB9BF", sections: {}, rules: [] }), Z(true);
  }, children: [o.jsx(Mr, { className: ie, "aria-hidden": true }), "\uAD00\uB9AC"] })] }), o.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [o.jsxs(qe, { name: "noHeader", className: "col-span-2 flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ot, { asChild: true, children: o.jsx("span", { children: o.jsx(st, { icon: o.jsx(Pn, { className: ie }), children: "noHeader" }) }) }), o.jsxs("label", { className: "flex cursor-pointer items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-2 py-1.5 dark:border-odp-borderSoft dark:bg-odp-surface", children: [o.jsx("span", { className: "min-w-0 text-[11px] leading-snug text-gray-600 dark:text-odp-muted", children: "thead/th \uC5C6\uC774 \uBAA8\uB450 tbody/td" }), o.jsx(or, { className: Zc(!!s.noHeader), checked: !!s.noHeader, onCheckedChange: (d) => l((c) => {
    if (d) return { ...c, noHeader: true };
    const { noHeader: g, ...k } = c;
    return k;
  }), "aria-label": "noHeader", children: o.jsx(sr, { className: Jc }) })] })] }), o.jsxs(qe, { name: "headerRows", className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${s.noHeader ? "opacity-40" : ""}`, children: [o.jsx(ot, { asChild: true, children: o.jsx("span", { children: o.jsx(st, { icon: o.jsx(Pn, { className: ie }), children: "headerRows" }) }) }), o.jsx(Xt, { asChild: true, children: o.jsx("input", { type: "number", min: 0, max: xe, value: s.headerRows, disabled: !!s.noHeader, onChange: (d) => l((c) => ({ ...c, headerRows: Math.max(0, Number(d.target.value) || 0) })), className: vn }) })] }), o.jsxs(qe, { name: "footerRows", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ot, { asChild: true, children: o.jsx("span", { children: o.jsx(st, { icon: o.jsx(Rr, { className: ie }), children: "footerRows" }) }) }), o.jsx(Xt, { asChild: true, children: o.jsx("input", { type: "number", min: 0, max: xe, value: s.footerRows, onChange: (d) => l((c) => ({ ...c, footerRows: Math.max(0, Number(d.target.value) || 0) })), className: vn }) })] }), o.jsxs(qe, { name: "width", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ot, { asChild: true, children: o.jsx("span", { children: o.jsx(st, { icon: o.jsx(za, { className: ie }), children: "\uB108\uBE44" }) }) }), o.jsx(yn, { "aria-label": "\uD45C \uB108\uBE44", value: s.width, onValueChange: (d) => l((c) => ({ ...c, width: d === "fit" ? "fit" : "full" })), options: [...ru], className: "w-full" })] }), o.jsxs(qe, { name: "align", className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${s.width !== "fit" ? "opacity-40" : ""}`, children: [o.jsx(ot, { asChild: true, children: o.jsx("span", { children: o.jsx(st, { icon: s.align === "right" ? o.jsx(Va, { className: ie }) : o.jsx(Wa, { className: ie }), children: "\uC815\uB82C" }) }) }), o.jsx(yn, { "aria-label": "\uD45C \uC815\uB82C", value: s.align, disabled: s.width !== "fit", onValueChange: (d) => l((c) => ({ ...c, align: d === "right" ? "right" : "left" })), options: [...ou], className: "w-full" })] })] }), o.jsxs("div", { className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border", children: [o.jsx("p", { className: "text-[10px] font-medium text-gray-600 dark:text-odp-muted", children: "\uD45C \uAE30\uBCF8 \uD3F0\uD2B8\xB7\uC2A4\uD0C0\uC77C" }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: "\uC140\xB7\uADF8\uB8F9 \uAC12\uC774 \uC788\uC73C\uBA74 \uADF8\uCABD\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4." }), o.jsx(In, { compact: true, idPrefix: "table-edit-table", value: s.style ?? {}, onChange: (d) => l((c) => ({ ...c, style: gr(d) ? {} : d })) })] }), o.jsxs("div", { className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border", children: [o.jsxs("p", { className: "inline-flex items-center gap-1 text-[10px] font-medium text-gray-600 dark:text-odp-muted", children: [o.jsx(Tr, { className: ie, "aria-hidden": true }), "\uADF8\uB8F9 \uC2A4\uD0C0\uC77C"] }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: "thead / tbody / tfoot \uAD6C\uC5ED" }), o.jsx("div", { className: "mb-1 flex flex-wrap gap-1", children: Gc.map((d) => o.jsxs("button", { type: "button", onClick: () => S(d), className: `inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] ${R === d ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-odp-bgSoft"}`, children: [te(d), d] }, d)) }), o.jsx(In, { compact: true, idPrefix: `table-edit-${R}`, value: s.sections[R] ?? {}, onChange: (d) => l((c) => ({ ...c, sections: { ...c.sections, [R]: d } })) })] })] })] }), o.jsx(Xr, { ariaLabel: "\uD45C \uC0AC\uC774\uB4DC\uBC14\uC640 \uC140 \uC0AC\uC774\uB4DC\uBC14 \uC0AC\uC774 \uB108\uBE44 \uC870\uC808", onDelta: Ht }), o.jsx("aside", { "aria-hidden": !ut, className: `flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-blue-200 bg-white dark:border-blue-900/50 dark:bg-odp-surface landscape:flex-none landscape:shrink-0 ${ut ? "" : "pointer-events-none portrait:hidden landscape:invisible"}`, style: U ? { width: Le } : void 0, children: le ? o.jsxs(o.Fragment, { children: [o.jsx("div", { className: "sticky top-0 z-[1] border-b border-blue-100 bg-white px-2.5 py-1.5 dark:border-blue-900/40 dark:bg-odp-surface", children: o.jsxs("h3", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong", children: [o.jsx(qa, { className: ie, "aria-hidden": true }), "\uC140", o.jsxs("span", { className: "font-normal text-gray-400 dark:text-odp-muted", children: ["(", le.r + 1, "\uD589 ", le.c + 1, "\uC5F4", Ce.length > 1 ? ` \xB7 ${Ce.length}\uCE78` : "", ")"] })] }) }), o.jsxs("div", { className: "space-y-2 p-2.5", children: [o.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [o.jsxs("button", { type: "button", disabled: !hn, title: `\uBCD1\uD569 (${au})`, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft", onClick: Te, children: [o.jsx(Ua, { className: ie, "aria-hidden": true }), "\uBCD1\uD569"] }), o.jsxs("button", { type: "button", disabled: !m, title: `\uBCD1\uD569 \uD574\uC81C (${lu})`, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft", onClick: mt, children: [o.jsx(Xa, { className: ie, "aria-hidden": true }), "\uBCD1\uD569 \uD574\uC81C"] })] }), o.jsxs("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: ["\uAE00\uC790 \uD06C\uAE30: ", cu, " / ", uu] }), o.jsxs(qe, { name: "cell-text", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(ot, { asChild: true, children: o.jsx("span", { children: o.jsx(st, { icon: o.jsx(Bo, { className: ie }), children: "\uC140 \uD14D\uC2A4\uD2B8" }) }) }), o.jsx(Xt, { asChild: true, children: o.jsx("input", { type: "text", value: D, onChange: (d) => Ve(le.r, le.c, d.target.value), placeholder: "\uC140 \uB0B4\uC6A9 \uC785\uB825", className: Ni }) })] }), o.jsx(In, { compact: true, idPrefix: "table-edit-cell", value: ft, onChange: Re })] })] }) : null }), o.jsx(Xr, { ariaLabel: "\uC0AC\uC774\uB4DC\uBC14\uC640 \uD45C \uC0AC\uC774 \uB108\uBE44 \uC870\uC808", onDelta: Ot })] }), o.jsxs("div", { ref: me, "data-haim-table-canvas": "", className: `order-1 flex min-h-0 min-w-0 flex-1 flex-col overflow-auto border-t border-gray-100 p-3 landscape:order-2 landscape:border-t-0 landscape:border-l dark:border-odp-border ${Ne ? "cursor-grabbing select-none" : je && !m ? "cursor-grab select-none" : ""}`, onMouseLeave: () => {
    z || Q(null);
  }, onPointerDown: h, onPointerMove: x, onPointerUp: w, onPointerCancel: w, onAuxClick: (d) => {
    d.button === 1 && d.preventDefault();
  }, children: [o.jsxs("p", { className: "mb-2 inline-flex shrink-0 items-center gap-1 text-[10px] text-gray-400", children: [o.jsx(Ya, { className: ie, "aria-hidden": true }), "\uB354\uBE14\uD074\uB9AD \uB4DC\uB798\uADF8\xB7Shift+\uD074\uB9AD: \uBC94\uC704 \uC120\uD0DD \xB7 \uC6B0\uD074\uB9AD: \uD589/\uC5F4 \uC0AD\uC81C \xB7 \uD720\uD074\uB9AD/\uC2A4\uD398\uC774\uC2A4+\uB4DC\uB798\uADF8: \uD328\uB2DD \xB7 ", Hn, "/", On, ": \uC2E4\uD589 \uCDE8\uC18C/\uB2E4\uC2DC \uC2E4\uD589 \xB7 \uD14C\uB450\uB9AC \uB354\uBE14\uD074\uB9AD: \uD589\xB7\uC5F4 \uCD94\uAC00"] }), o.jsx("div", { ref: pe, className: "relative inline-block min-w-full p-5", "data-haim-inserting": (P == null ? void 0 : P.kind) ?? void 0, onMouseMove: gn, onMouseLeave: () => {
    z || Q(null);
  }, children: o.jsxs(Ko, { delayDuration: 0, skipDelayDuration: 0, children: [o.jsxs("table", { ref: he, className: `border-collapse text-sm ${((_a2 = s.colWidths) == null ? void 0 : _a2.some((d) => d && d.trim())) ? "w-max max-w-full" : "w-full"}`, style: { tableLayout: ((_b = s.colWidths) == null ? void 0 : _b.some((d) => d && d.trim())) || ((_c2 = s.rowHeights) == null ? void 0 : _c2.some((d) => d && d.trim())) ? "fixed" : void 0, ...((_d2 = s.style) == null ? void 0 : _d2.fontFamily) ? { fontFamily: s.style.fontFamily } : {}, ...((_e2 = s.style) == null ? void 0 : _e2.fontSize) ? { fontSize: s.style.fontSize } : {}, ...((_f = s.style) == null ? void 0 : _f.fontWeight) ? { fontWeight: s.style.fontWeight } : {} }, children: [o.jsx("colgroup", { children: Array.from({ length: de }, (d, c) => {
    const g = kn(s.colWidths, c);
    return o.jsx("col", { style: g ? { width: g } : void 0 }, c);
  }) }), o.jsx("tbody", { children: u.rows.map((d, c) => {
    const g = kn(s.rowHeights, c);
    return o.jsx("tr", { style: g ? { height: g } : void 0, children: Array.from({ length: de }, (k, C) => {
      if (ke.has(`${c},${C}`)) return null;
      const A = ji(s.merges, c, C), I = ce(c, C), be = kn(s.colWidths, C), Se = o.jsx("td", { "data-edit-r": c, "data-edit-c": C, colSpan: A == null ? void 0 : A.colspan, rowSpan: A == null ? void 0 : A.rowspan, className: `min-h-11 cursor-pointer border-2 border-gray-300 p-0 transition-[box-shadow,outline-color] dark:border-odp-borderStrong ${be ? "" : "min-w-28"} ${I ? "relative z-[1] outline outline-2 outline-offset-[-2px] outline-blue-500 ring-0" : "hover:relative hover:z-[1] hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-blue-400/70"}`, onContextMenu: () => {
        ce(c, C) || nt(c, C), q && (re({ r: c, c: C }), Q(null));
      }, onMouseDown: (_) => {
        var _a3, _b2;
        if (_.button === 1 || _.button !== 0 || Pe.current || Oe.current && !fe.current) return;
        if ((_b2 = (_a3 = _.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-hit], [data-haim-edge-add]")) {
          _.preventDefault();
          return;
        }
        {
          const De = he.current, Nt = pe.current;
          if (De && Nt && Rt(De, Nt, _.clientX, _.clientY, xe, de, s.merges)) {
            _.preventDefault();
            return;
          }
        }
        if (_.shiftKey) {
          _.preventDefault(), qt(c, C);
          return;
        }
        if (_.detail >= 2) {
          _.preventDefault(), St(c, C);
          return;
        }
        nt(c, C);
      }, onDoubleClick: (_) => {
        const we = he.current, De = pe.current;
        if (we && De && Rt(we, De, _.clientX, _.clientY, xe, de, s.merges)) {
          _.preventDefault(), _.stopPropagation();
          return;
        }
        _.preventDefault(), St(c, C);
      }, onMouseEnter: () => {
        bn(c, C);
      }, children: o.jsx(qe, { name: `cell-${c}-${C}`, className: "contents", children: o.jsx(Xt, { asChild: true, children: o.jsx("input", { type: "text", value: d[C] ?? "", onChange: (_) => Ve(c, C, _.target.value), onKeyDown: (_) => j(_, c, C), onMouseDown: (_) => {
        var _a3, _b2;
        if (_.button !== 1 && _.button === 0 && !Pe.current && !(Oe.current && !fe.current)) {
          if ((_b2 = (_a3 = _.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-hit], [data-haim-edge-add]")) {
            _.preventDefault(), _.stopPropagation();
            return;
          }
          {
            const we = he.current, De = pe.current;
            if (we && De && Rt(we, De, _.clientX, _.clientY, xe, de, s.merges)) {
              _.preventDefault(), _.stopPropagation();
              return;
            }
          }
          if (_.shiftKey) {
            _.preventDefault(), _.stopPropagation(), qt(c, C);
            return;
          }
          if (_.detail >= 2) {
            _.preventDefault();
            return;
          }
          _.stopPropagation();
        }
      }, onDoubleClick: (_) => {
        const we = he.current, De = pe.current;
        if (we && De && Rt(we, De, _.clientX, _.clientY, xe, de, s.merges)) {
          _.preventDefault(), _.stopPropagation();
          return;
        }
        _.preventDefault(), _.stopPropagation(), St(c, C);
      }, onFocus: () => {
        $e.current || Oe.current && !fe.current || nt(c, C);
      }, className: `${vn} h-full min-h-11 w-full cursor-pointer border-transparent bg-transparent px-2 text-sm focus:cursor-text focus:border-gray-300 focus:bg-white/90 dark:focus:bg-odp-bgSoft/90 ${be ? "" : "min-w-28"}`, style: { ...X(c, C), ...g ? { height: g } : {} } }) }) }) }, C);
      return q ? Se : o.jsxs(cl, { onOpenChange: (_) => {
        re(_ ? { r: c, c: C } : null), _ ? Q(null) : ze();
      }, children: [o.jsx(ul, { asChild: true, children: Se }), o.jsx(dl, { children: o.jsxs(fl, { className: iu, onCloseAutoFocus: (_) => _.preventDefault(), children: [o.jsxs(Lr, { className: Ur, disabled: xe <= 1, onPointerEnter: () => zt(c), onPointerLeave: ze, onFocus: () => zt(c), onBlur: ze, onSelect: () => {
        Kt(c);
      }, children: [o.jsx(gt, { className: ie, "aria-hidden": true }), "\uD589 \uC0AD\uC81C"] }), o.jsxs(Lr, { className: Ur, disabled: de <= 1, onPointerEnter: () => Vt(C), onPointerLeave: ze, onFocus: () => Vt(C), onBlur: ze, onSelect: () => {
        et(C);
      }, children: [o.jsx(gt, { className: ie, "aria-hidden": true }), "\uC5F4 \uC0AD\uC81C"] })] }) })] }, C);
    }) }, c);
  }) })] }), se ? o.jsx(bu, { kind: se.kind, indices: se.indices, table: he.current, wrap: pe.current, colCount: de }) : null, q && G ? o.jsxs($o, { open: oe, onOpenChange: (d) => {
    d || (re(null), ze());
  }, title: `${G.r + 1}\uD589 ${G.c + 1}\uC5F4`, subtitle: "\uD45C \uD3B8\uC9D1 \uC140", children: [o.jsxs("button", { type: "button", className: zn, disabled: xe <= 1, onClick: () => {
    Kt(G.r), re(null);
  }, children: [o.jsx(gt, { className: ie, "aria-hidden": true }), "\uD589 \uC0AD\uC81C"] }), o.jsxs("button", { type: "button", className: zn, disabled: de <= 1, onClick: () => {
    et(G.c), re(null);
  }, children: [o.jsx(gt, { className: ie, "aria-hidden": true }), "\uC5F4 \uC0AD\uC81C"] })] }) : null, P && !oe ? o.jsxs(o.Fragment, { children: [o.jsx(xu, { insert: P }, `preview-${P.kind}-${P.index}`), o.jsx(gu, { insert: P, allowResize: P.index !== 0, tip: P.index === 0 ? P.label : `${P.label} \xB7 ${Yr(P.kind)}`, onDoubleClickInsert: () => {
    const { kind: d, index: c } = P;
    d === "row" ? Je(c) : Bt(c);
  }, onResizePointerDown: (d) => xn(d, P) }, `hit-${P.kind}-${P.index}`), o.jsx(hu, { tip: P.index === 0 ? P.label : `${P.label} \xB7 ${Yr(P.kind)}`, onDoubleClick: () => {
    const { kind: d, index: c } = P;
    d === "row" ? Je(c) : Bt(c);
  }, style: { left: P.x, top: P.y } }, `btn-${P.kind}-${P.index}`)] }) : null] }) })] })] })] }), o.jsx(Sl, { isOpen: F, template: J, onClose: () => {
    Z(false), v(null);
  }, onSave: (d) => {
    const g = [...Ri().templates.filter((k) => k.id !== (J == null ? void 0 : J.id) && k.id !== d.id), d];
    Mi({ templates: g }).then((k) => {
      K(k.templates), Z(false), v(null);
    });
  } })] }), typeof document < "u" ? ko.createPortal(o.jsx("div", { className: "relative z-[100060]", children: o.jsx(rn, { isOpen: Y !== null, variant: "danger", title: (Y == null ? void 0 : Y.kind) === "col" ? "\uC5F4 \uC0AD\uC81C" : "\uD589 \uC0AD\uC81C", message: (Y == null ? void 0 : Y.kind) === "col" ? Y.indices.length > 1 ? `\uC120\uD0DD\uD55C ${Y.indices.length}\uAC1C \uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(Y.indices[0] ?? 0) + 1}\uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : Y ? Y.indices.length > 1 ? `\uC120\uD0DD\uD55C ${Y.indices.length}\uAC1C \uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(Y.indices[0] ?? 0) + 1}\uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : "", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", onConfirm: pn, onCancel: () => ne(null) }) }), document.body) : null] });
}
const ku = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", Jr = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-800 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-surface", eo = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", Gt = "h-3.5 w-3.5 shrink-0";
function Cu({ containerRef: e, getMarkdown: t, setMarkdown: n, onEditTable: r, onEditFailed: i }) {
  const s = Fo(), [l, u] = a.useState(false), [p, m] = a.useState(null), [b, T] = a.useState(null), N = a.useRef(null);
  N.current = p;
  const R = a.useCallback((v) => {
    m(v), u(true);
  }, []);
  a.useEffect(() => {
    const v = e.current;
    if (!v) return;
    const P = () => v.querySelector(".md-editor-preview"), Q = (G) => {
      var _a2, _b, _c2, _d2;
      if ((_b = (_a2 = G.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const re = P(), oe = (_d2 = (_c2 = G.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "table");
      !(oe instanceof HTMLTableElement) || !(re == null ? void 0 : re.contains(oe)) || (G.preventDefault(), G.stopPropagation(), R({ table: oe, previewRoot: re, x: G.clientX, y: G.clientY }));
    };
    let z = null, H = null, E = false, V = null;
    const Y = () => {
      z && clearTimeout(z), z = null, H = null, V = null;
    }, ne = (G) => {
      var _a2, _b;
      if (G.pointerType === "mouse") return;
      const re = P();
      if (!re) return;
      const oe = (_b = (_a2 = G.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "table");
      !(oe instanceof HTMLTableElement) || !re.contains(oe) || (Y(), E = false, V = oe, H = { x: G.clientX, y: G.clientY }, z = setTimeout(() => {
        E = true, Li();
        const q = P();
        V && q && R({ table: V, previewRoot: q, x: (H == null ? void 0 : H.x) ?? G.clientX, y: (H == null ? void 0 : H.y) ?? G.clientY });
      }, Pi));
    }, se = (G) => {
      if (!H) return;
      const re = G.clientX - H.x, oe = G.clientY - H.y;
      re * re + oe * oe > 100 && Y();
    }, ee = (G) => {
      E && (G.preventDefault(), G.stopPropagation()), Y(), E = false;
    }, ye = (G) => {
      var _a2, _b;
      const re = P(), oe = (_b = (_a2 = G.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "table");
      oe && (re == null ? void 0 : re.contains(oe)) && window.matchMedia("(pointer: coarse)").matches && G.preventDefault();
    };
    return v.addEventListener("contextmenu", Q, true), v.addEventListener("pointerdown", ne), v.addEventListener("pointermove", se), v.addEventListener("pointerup", ee), v.addEventListener("pointercancel", ee), v.addEventListener("contextmenu", ye, true), () => {
      Y(), v.removeEventListener("contextmenu", Q, true), v.removeEventListener("pointerdown", ne), v.removeEventListener("pointermove", se), v.removeEventListener("pointerup", ee), v.removeEventListener("pointercancel", ee), v.removeEventListener("contextmenu", ye, true);
    };
  }, [e, R]);
  const S = () => {
    const v = N.current;
    if (!v) return;
    r(v.table, v.previewRoot) || (i == null ? void 0 : i());
  }, L = () => {
    const v = N.current;
    if (!v) return;
    const P = zo(t(), v.table, v.previewRoot);
    if (!P) {
      i == null ? void 0 : i();
      return;
    }
    T(P);
  }, K = () => {
    if (!b) return;
    const v = Di(t(), b);
    n(v), T(null);
  }, F = p ?? { x: 0, y: 0 }, Z = () => {
    u(false), m(null);
  }, J = o.jsxs(o.Fragment, { children: [o.jsxs("button", { type: "button", className: s ? Ai : Jr, onClick: () => {
    S(), Z();
  }, children: [o.jsx(on, { className: Gt, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1\uAE30"] }), o.jsxs("button", { type: "button", className: s ? zn : eo, onClick: () => {
    L(), Z();
  }, children: [o.jsx(gt, { className: Gt, "aria-hidden": true }), "\uD45C \uC0AD\uC81C"] })] });
  return o.jsxs(o.Fragment, { children: [s ? o.jsx($o, { open: l, onOpenChange: (v) => {
    u(v), v || m(null);
  }, title: "\uBBF8\uB9AC\uBCF4\uAE30 \uD45C", subtitle: "\uB9C8\uD06C\uB2E4\uC6B4 \uD14C\uC774\uBE14", children: J }) : o.jsxs(ml, { open: l, onOpenChange: (v) => {
    u(v), v || m(null);
  }, modal: true, children: [o.jsx(pl, { asChild: true, children: o.jsx("button", { type: "button", "aria-hidden": true, tabIndex: -1, className: "pointer-events-none fixed h-px w-px opacity-0", style: { left: F.x, top: F.y } }) }), o.jsx(hl, { children: o.jsxs(gl, { className: ku, side: "bottom", align: "start", sideOffset: 2, collisionPadding: 12, onCloseAutoFocus: (v) => v.preventDefault(), children: [o.jsxs(Pr, { className: Jr, onSelect: S, children: [o.jsx(on, { className: Gt, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1\uAE30"] }), o.jsxs(Pr, { className: eo, onSelect: L, children: [o.jsx(gt, { className: Gt, "aria-hidden": true }), "\uD45C \uC0AD\uC81C"] })] }) })] }), o.jsx(rn, { isOpen: b !== null, variant: "danger", title: "\uD45C \uC0AD\uC81C", message: "\uC774 \uD45C\uB97C \uB9C8\uD06C\uB2E4\uC6B4\uC5D0\uC11C \uC0AD\uC81C\uD560\uAE4C\uC694?", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", onConfirm: K, onCancel: () => T(null) })] });
}
function Eu(e) {
  const [t, n] = a.useState(null), r = a.useRef(e.getMarkdown), i = a.useRef(e.setMarkdown);
  r.current = e.getMarkdown, i.current = e.setMarkdown;
  const s = a.useCallback((m, b = m) => {
    const T = r.current(), N = Vn(T, m, b);
    return N ? (n({ block: N, meta: N.meta ?? nn(), grid: N.grid }), true) : false;
  }, []), l = a.useCallback((m, b) => {
    const T = r.current(), N = zo(T, m, b);
    return N ? (n({ block: N, meta: N.meta ?? nn(), grid: N.grid }), true) : false;
  }, []), u = a.useCallback(() => n(null), []), p = a.useCallback((m, b) => {
    if (!t) return;
    const T = r.current(), N = Vn(T, t.block.start, t.block.start + 1) ?? t.block, R = Ii(T, N, m, b);
    i.current(R), n(null);
  }, [t]);
  return { editState: t, openAtOffset: s, openPreviewTable: l, close: u, apply: p, isOpen: !!t };
}
const ss = new nr("s3haim-note-cover-fold");
ss.version(1).stores({ folds: "key, updatedAt" });
const is = ss.folds;
function Su(e, t) {
  return `cover-fold:${tr(e, t)}`;
}
function Nu(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Su(e.type, e.id);
}
async function ju(e) {
  if (!e) return null;
  const t = await is.get(e);
  return !t || typeof t.collapsed != "boolean" ? null : t.collapsed;
}
async function Mu(e, t) {
  e && await is.put({ key: e, collapsed: !!t, updatedAt: Date.now() });
}
function wt(e) {
  const t = Math.min(e.length, 2e6);
  return Fi(e.sliceString(0, t));
}
function lt(e) {
  const t = wt(e.doc);
  if (!t) return null;
  const n = e.doc.lineAt(t.from);
  return n.to >= t.to ? null : { from: n.to, to: t.to };
}
function Pt(e, t) {
  let n = false;
  return Mo(e).between(t.from, t.to, () => {
    n = true;
  }), n;
}
function Ru(e, t) {
  return e.from === t.from && e.to === t.to;
}
function Tu(e, t) {
  const n = e.doc.lineAt(t);
  let r = false;
  return er(e).iterate({ from: n.from, to: Math.min(n.to, n.from + 1), enter(i) {
    const s = i.type.name;
    if (s.startsWith("ATXHeading") || s.startsWith("SetextHeading")) return r = true, false;
  } }), r;
}
function Bn(e, t) {
  const n = wt(e.doc);
  if (n) {
    const s = e.doc.lineAt(n.from);
    if (t === s.from) {
      const l = lt(e);
      if (l) return { ...l, kind: "cover" };
    }
    if (t >= n.from && t < n.to) return null;
  }
  if (!Tu(e, t)) return null;
  const r = e.doc.lineAt(t), i = Rs(e, r.from, r.to);
  return !i || i.from >= i.to ? null : { ...i, kind: "heading" };
}
const At = Ns.define({ combine: (e) => e[e.length - 1] ?? null }), as = new Jn();
function Lu(e) {
  return as.of(At.of(e));
}
function Pu(e, t) {
  e.dispatch({ effects: as.reconfigure(At.of(t)) });
}
function Au(e, t) {
  const n = document.createElement("button");
  n.type = "button", n.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${t}`;
  const r = t === "cover" ? e ? "\uD45C\uC9C0 \uC811\uAE30" : "\uD45C\uC9C0 \uD3BC\uCE58\uAE30" : e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30";
  n.setAttribute("aria-label", r), n.title = r, n.dataset.foldKind = t, n.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const i = n.querySelector("svg");
  return i && (i.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", i.style.transformOrigin = "50% 50%"), n;
}
class to extends Ts {
  constructor(t, n) {
    super(), this.open = t, this.kind = n;
  }
  eq(t) {
    return this.open === t.open && this.kind === t.kind;
  }
  toDOM() {
    return Au(this.open, this.kind);
  }
}
let Qn = 0;
function ls(e, t) {
  const n = e.coordsAtPos(t.from), r = e.coordsAtPos(t.to);
  if (!n || !r) return null;
  const i = e.contentDOM.getBoundingClientRect(), s = Math.min(n.top, r.top), l = Math.max(n.bottom, r.bottom), u = Math.max(0, l - s);
  if (u < 2) return null;
  const p = document.createElement("div");
  return p.className = "cm-note-cover-fold-motion", p.style.cssText = ["position:fixed", `top:${s}px`, `left:${i.left}px`, `width:${Math.max(0, i.width)}px`, `height:${u}px`, "overflow:hidden", "pointer-events:none", "z-index:6", "background:var(--md-bk-color, var(--cm-background, #fff))"].join(";"), document.body.appendChild(p), p;
}
async function Du(e, t) {
  const n = ++Qn, r = ls(e, t);
  if (!r) {
    e.dispatch({ effects: it.of(t) });
    return;
  }
  try {
    await dn(r, { height: 0, opacity: 0.35 }, { duration: 0.22, ease: "easeInOut" });
  } catch {
  }
  n === Qn && lt(e.state) && e.dispatch({ effects: it.of(t) }), r.remove();
}
async function Iu(e, t) {
  ++Qn, e.dispatch({ effects: It.of(t) });
  const n = lt(e.state);
  if (!n) return;
  const r = ls(e, n);
  if (r) {
    try {
      await dn(r, { height: 0, opacity: 0 }, { duration: 0.22, ease: "easeInOut" });
    } catch {
    }
    r.remove();
  }
}
function cs(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.querySelector) == null ? void 0 : _a2.call(e, "svg");
  n instanceof SVGElement && dn(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" });
}
function no(e, t) {
  const n = Pt(e.state, t);
  return e.dispatch({ effects: n ? It.of(t) : it.of(t) }), true;
}
function ro(e) {
  const t = lt(e.state);
  if (!t) return false;
  const r = !Pt(e.state, t), i = e.dom.querySelector('.cm-note-cover-fold-chevron[data-fold-kind="cover"]');
  return cs(i, !r), (async () => {
    r ? await Du(e, t) : await Iu(e, t);
    const s = e.state.facet(At);
    s && Mu(s, r);
  })(), true;
}
function Fu(e, t) {
  const n = lt(e.state);
  if (!n) return;
  const r = Pt(e.state, n);
  t && !r ? e.dispatch({ effects: it.of(n) }) : !t && r && e.dispatch({ effects: It.of(n) });
}
function $u() {
  return jo.fromClass(class {
    constructor(e) {
      __publicField(this, "lastKey", null);
      __publicField(this, "hadCover", false);
      __publicField(this, "loadGen", 0);
      this.view = e, this.syncKeyAndMaybeRestore();
    }
    update(e) {
      const t = e.state.facet(At) !== this.lastKey, r = !!wt(e.state.doc), i = r && !this.hadCover;
      this.hadCover = r, (t || i) && this.syncKeyAndMaybeRestore();
    }
    syncKeyAndMaybeRestore() {
      const e = this.view.state.facet(At);
      this.lastKey = e;
      const t = wt(this.view.state.doc);
      if (this.hadCover = !!t, !e || !t) return;
      const n = ++this.loadGen;
      ju(e).then((r) => {
        n === this.loadGen && r != null && Fu(this.view, r);
      });
    }
  });
}
function _u(e) {
  return e.transactions.some((t) => t.effects.some((n) => n.is(it) || n.is(It)));
}
function Hu() {
  return [Lu(null), So({ preparePlaceholder(e, t) {
    const n = lt(e);
    return n && Ru(n, t) ? "cover" : "heading";
  }, placeholderDOM(e, t, n) {
    const r = document.createElement("span");
    return r.className = "cm-foldPlaceholder", r.textContent = n === "cover" ? "\u2026\uD45C\uC9C0\u2026" : "\u2026", r.setAttribute("aria-hidden", "true"), r.onclick = t, r;
  } }), No.of((e, t) => {
    const n = wt(e.doc);
    if (!n) return null;
    const r = e.doc.lineAt(n.from);
    return t !== r.from ? null : lt(e);
  }), js({ class: "cm-note-cover-fold-gutter", lineMarker(e, t) {
    const n = Bn(e.state, t.from);
    if (!n) return null;
    const r = !Pt(e.state, n);
    return new to(r, n.kind);
  }, lineMarkerChange: (e) => e.docChanged || e.viewportChanged || _u(e), initialSpacer: () => new to(true, "heading"), domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = Bn(e.state, t.from);
    if (!r) return false;
    if (r.kind === "cover") {
      if (!ro(e)) return false;
    } else {
      const i = n.target instanceof Element ? n.target.closest(".cm-note-cover-fold-chevron") : null;
      cs(i, Pt(e.state, r)), no(e, r);
    }
    return n.preventDefault(), n.stopPropagation(), true;
  } } }), Ms({ domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = wt(e.state.doc);
    if (r && t.from >= r.from && t.from < r.to) return ro(e) ? (n.preventDefault(), true) : false;
    const i = Bn(e.state, t.from);
    return !i || i.kind !== "heading" ? false : (no(e, i), n.preventDefault(), true);
  } } }), $u(), Lt.theme({ ".cm-note-cover-fold-gutter": { width: "1.1rem" }, ".cm-note-cover-fold-gutter .cm-gutterElement": { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }, ".cm-note-cover-fold-chevron": { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", padding: "0", margin: "0", border: "none", background: "transparent", color: "inherit", opacity: "0.65", cursor: "pointer", lineHeight: "1" }, ".cm-note-cover-fold-chevron:hover": { opacity: "1" }, ".cm-note-cover-fold-chevron svg": { display: "block" } })];
}
function Ou({ cover: e, getPresignedUrl: t }) {
  const n = $i(e.pageSizeId) ? e.pageSizeId : _i, r = a.useMemo(() => ({ ...Hi(), pageSizeId: n }), [n]), i = a.useMemo(() => Oi(n), [n]), s = a.useMemo(() => Bi(r), [r]);
  return o.jsx("div", { className: "md-note-cover-preview-light w-full bg-white text-gray-900", "data-note-cover-preview": "1", "data-color-mode": "light", "data-cover-page-size": n, style: s, children: o.jsx(bl, { cover: e, getPresignedUrl: t, className: "md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]", style: { width: "100%", height: "auto", aspectRatio: `${i.widthMm} / ${i.heightMm}` } }) });
}
const sn = /* @__PURE__ */ new WeakMap(), Bu = "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026", Ku = "\uD45C\uC9C0";
function us(e) {
  const t = sn.get(e);
  t && (t.unmount(), sn.delete(e));
}
function oo(e, t) {
  if (!e) return;
  const n = e.querySelector(".md-note-cover-placeholder__fallback");
  n && (n.textContent = t);
}
function so(e, t) {
  e && (e.classList.toggle("md-note-cover-placeholder--pending", t === "pending"), e.classList.toggle("md-note-cover-placeholder--ready", t === "ready"), e.classList.toggle("md-note-cover-placeholder--empty", t === "empty"), t === "pending" ? oo(e, Bu) : t === "empty" && oo(e, Ku));
}
function zu(e, t, n) {
  let r = sn.get(e);
  r || (r = Cs.createRoot(e), sn.set(e, r)), r.render(a.createElement(Ou, { cover: t, getPresignedUrl: n ?? void 0 }));
}
function Vu(e, t, n, r) {
  if (!e || typeof e.querySelectorAll != "function") return 0;
  const { cover: i } = _o(t ?? ""), s = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  if (!(i == null ? void 0 : i.enabled)) {
    for (const l of s) {
      us(l);
      const u = l.closest("[data-note-cover-placeholder]");
      so(u, "empty");
    }
    return 0;
  }
  for (const l of s) {
    const u = l.closest("[data-note-cover-placeholder]");
    so(u, "ready"), zu(l, i, n);
  }
  return s.length;
}
function Wu(e) {
  if (!e || typeof e.querySelectorAll != "function") return;
  const t = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  for (const n of t) us(n);
}
const qu = "h1, h2, h3, h4, h5, h6", ds = "md-preview-heading-fold-chevron", io = "md-preview-heading-foldable", Qt = "md-preview-heading-folded", Uu = "md-preview-heading-section-hidden", tn = "data-md-preview-heading-fold";
function Xu(e) {
  if (!e) return false;
  const t = e.tagName;
  return t === "H1" || t === "H2" || t === "H3" || t === "H4" || t === "H5" || t === "H6";
}
function ao(e) {
  const t = e.getAttribute("data-heading-level");
  if (t) {
    const r = Number(t);
    if (Number.isFinite(r) && r >= 1) return r;
  }
  const n = Number(e.tagName.slice(1));
  return Number.isFinite(n) && n >= 1 ? n : 6;
}
function Yu(e, t) {
  return e.id || `md-preview-heading-${t}`;
}
function fs(e) {
  const t = ao(e), n = [];
  let r = e.nextElementSibling;
  for (; r && !(Xu(r) && ao(r) <= t || r.hasAttribute("data-note-cover-placeholder")); ) r instanceof HTMLElement && n.push(r), r = r.nextElementSibling;
  return n;
}
function Gu(e) {
  return !!e.closest("[data-note-cover-placeholder], [data-note-cover-preview]");
}
function ms(e) {
  return Array.from(e.querySelectorAll(qu)).filter((t) => !(!(t instanceof HTMLElement) || Gu(t)));
}
function Qu(e) {
  if (!e || typeof e.querySelectorAll != "function") return false;
  const t = ms(e);
  for (const n of t) if (n.getAttribute(tn) !== "1" && fs(n).length > 0) return true;
  return false;
}
function Zu(e) {
  const t = document.createElement("button");
  t.type = "button", t.className = `${ds} cursor-pointer`, t.setAttribute("aria-label", e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), t.title = e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30", t.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const n = t.querySelector("svg");
  return n && (n.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", n.style.transformOrigin = "50% 50%"), t;
}
function Ju(e, t) {
  const n = e.querySelector("svg");
  n instanceof SVGElement && (dn(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" }), e.setAttribute("aria-label", t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), e.title = t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30");
}
function Kn(e, t) {
  for (const n of e) n.classList.toggle(Uu, t), t ? n.setAttribute("hidden", "") : n.removeAttribute("hidden");
}
function ed(e, t = {}) {
  if (!e || typeof e.querySelectorAll != "function") return () => {
  };
  const n = new Set(Array.from(t.collapsedIds ?? []).filter((s) => typeof s == "string" && s)), r = [];
  return ms(e).forEach((s, l) => {
    var _a2;
    if (s.getAttribute(tn) === "1") return;
    const u = fs(s);
    if (u.length === 0) return;
    const p = Yu(s, l);
    s.id || (s.id = p), s.setAttribute(tn, "1"), s.classList.add(io), (_a2 = s.querySelector(`:scope > .${ds}`)) == null ? void 0 : _a2.remove();
    const b = !n.has(p), T = Zu(b);
    s.insertBefore(T, s.firstChild);
    const N = (S) => {
      s.classList.toggle(Qt, S), Kn(u, S), Ju(T, !S);
    };
    b || (s.classList.add(Qt), Kn(u, true));
    const R = (S) => {
      var _a3;
      S.preventDefault(), S.stopPropagation();
      const L = !s.classList.contains(Qt);
      N(L), L ? n.add(p) : n.delete(p), (_a3 = t.onCollapsedChange) == null ? void 0 : _a3.call(t, Array.from(n));
    };
    T.addEventListener("click", R), r.push(() => {
      T.removeEventListener("click", R), T.remove(), s.classList.remove(io, Qt), s.removeAttribute(tn), Kn(u, false);
    });
  }), () => {
    for (const s of r) s();
  };
}
const ps = new nr("s3haim-preview-heading-fold");
ps.version(1).stores({ folds: "key, updatedAt" });
const hs = ps.folds;
function td(e, t) {
  return `heading-fold:${tr(e, t)}`;
}
function nd(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : td(e.type, e.id);
}
async function rd(e) {
  if (!e) return null;
  const t = await hs.get(e);
  return !t || !Array.isArray(t.collapsedIds) ? null : t.collapsedIds.filter((n) => typeof n == "string" && n.length > 0);
}
async function od(e, t) {
  e && await hs.put({ key: e, collapsedIds: Array.from(new Set(t.filter(Boolean))), updatedAt: Date.now() });
}
const an = /* @__PURE__ */ new Set();
function sd(e) {
  return an.add(e), () => {
    an.delete(e);
  };
}
function id(e) {
  if (!(!e.selectionSet && !e.docChanged) && !(e.view.composing || e.view.compositionStarted) && an.size !== 0) for (const t of an) try {
    t(e.view, e);
  } catch {
  }
}
const ad = [0, 16, 48, 100, 180, 320];
function ld(e) {
  let t = [], n = null, r = null, i = false, s = false;
  function l() {
    for (const R of t) clearTimeout(R);
    t = [];
  }
  function u() {
    if (s) return false;
    const R = e.getPreviewRoot(), S = e.getView();
    return !R || !S || Tt(R) ? false : Ki(S, R, { allowCollapsed: true });
  }
  function p() {
    i || s || (i = true, requestAnimationFrame(() => {
      i = false, u();
    }));
  }
  function m(R) {
    n && r === R || (n == null ? void 0 : n.disconnect(), r = R, n = new MutationObserver((S) => {
      S.some((K) => {
        const F = [...K.addedNodes, ...K.removedNodes];
        return F.length === 0 ? K.type === "characterData" || K.type === "attributes" : F.some((Z) => {
          var _a2, _b;
          return Z instanceof Element ? !(Z.hasAttribute("data-preview-caret-mirror") || Z.hasAttribute("data-preview-sel-mirror") || ((_a2 = Z.classList) == null ? void 0 : _a2.contains("s3haim-preview-caret-mirror")) || ((_b = Z.classList) == null ? void 0 : _b.contains("s3haim-preview-sel-mirror"))) : true;
        });
      }) && p();
    }), n.observe(R, { childList: true, subtree: true, characterData: true }));
  }
  function b(R) {
    if (s) return;
    const S = e.getPreviewRoot();
    if (S && m(S), u(), !!(R == null ? void 0 : R.withRetries)) {
      l();
      for (const L of ad) t.push(setTimeout(() => {
        if (s) return;
        const K = e.getPreviewRoot();
        K && m(K), u();
      }, L));
    }
  }
  function T() {
    s = true, l(), n == null ? void 0 : n.disconnect(), n = null, r = null, i = false;
  }
  const N = e.getPreviewRoot();
  return N && m(N), b({ withRetries: true }), { schedule: b, stop: T };
}
const lo = [0, 16, 48, 120, 280], cd = 50, ud = 40, co = 32, dd = 32;
function uo(e) {
  return !!(e == null ? void 0 : e.isConnected);
}
function Zn(e, t) {
  const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
  return n.top - r.top + t.scrollTop;
}
function fo(e, t) {
  const n = Math.max(0, t);
  Math.abs(e.scrollTop - n) < 0.5 || (e.scrollTop = n, Math.abs(e.scrollTop - n) > 1 && e.scrollTo(0, n));
}
function gs(e) {
  const t = [];
  for (const r of e.querySelectorAll("[data-line]")) r instanceof HTMLElement && t.push(r);
  const n = t.filter((r) => {
    let i = r.parentElement;
    for (; i && i !== e; ) {
      if (i.hasAttribute("data-line")) return false;
      i = i.parentElement;
    }
    return true;
  });
  return n.length > 0 ? n : t;
}
function fd(e, t) {
  let n = null, r = -1;
  for (const i of gs(e)) {
    const s = Number(i.getAttribute("data-line"));
    Number.isFinite(s) && s <= t && s >= r && (n = i, r = s);
  }
  return n;
}
function md(e, t, n) {
  let r = null, i = -1, s = -1 / 0;
  for (const l of gs(e)) {
    const u = Number(l.getAttribute("data-line"));
    if (!Number.isFinite(u)) continue;
    const p = Zn(l, t);
    p <= n && p >= s && (r = l, i = u, s = p);
  }
  return !r || i < 0 ? null : { el: r, line0: i };
}
function pd(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.dom) == null ? void 0 : _a2.closest(".md-editor");
  if (n instanceof HTMLElement) return n;
  const r = t == null ? void 0 : t.closest(".md-editor");
  return r instanceof HTMLElement ? r : null;
}
function hd(e) {
  let t = false, n = [], r = null, i = 0, s = null, l = 0, u = 0, p = null, m = null, b = null, T = null, N = null, R = "none", S = false;
  function L() {
    for (const O of n) clearTimeout(O);
    n = [];
  }
  function K() {
    r != null && (clearTimeout(r), r = null), i = 0;
  }
  function F() {
    s != null && (clearTimeout(s), s = null);
  }
  function Z() {
    l && cancelAnimationFrame(l), u && cancelAnimationFrame(u), l = 0, u = 0;
  }
  function J(O) {
    F(), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        s = setTimeout(() => {
          s = null, R === O && (R = "none");
        }, dd);
      });
    });
  }
  function v(O) {
    return O.scrollDOM;
  }
  function P(O) {
    return uo(T) ? T : uo(m) ? m : ht(O);
  }
  function Q(O) {
    if (!(O instanceof Node)) return null;
    const $ = e.getView(), U = e.getPreviewRoot();
    if ($ && (O === $.scrollDOM || $.dom.contains(O))) return "editor";
    if (U) {
      const W = U.closest(".md-editor-preview-wrapper") ?? U;
      if (O === W || W.contains(O)) return "preview";
    }
    return null;
  }
  function z(O, $) {
    if (O !== "preview" || !($ instanceof HTMLElement)) return;
    const U = e.getPreviewRoot();
    if (!U) return;
    const W = ht(U);
    W && ($ === W || $.contains(W)) && (T = $);
  }
  function H(O, $) {
    if (!($ instanceof HTMLElement)) return false;
    if (O === "editor") {
      const me = e.getView();
      return !!(me && ($ === me.scrollDOM || $.contains(me.scrollDOM)));
    }
    const U = e.getPreviewRoot(), W = U ? ht(U) : null;
    return !!(W && ($ === W || $.contains(W)));
  }
  function E() {
    if (S) return false;
    const O = e.getPreviewRoot(), $ = e.getView();
    if (!O || !$ || R === "preview" || R !== "none" && R !== "follow") return false;
    R = "follow";
    const U = zi($, O);
    return J("follow"), U;
  }
  function V() {
    t || S || (t = true, requestAnimationFrame(() => {
      t = false, E();
    }));
  }
  function Y() {
    const O = e.getPreviewRoot(), $ = e.getView();
    if (!O || !$) return;
    const U = v($), W = P(O);
    if (!W) return;
    const me = U.scrollTop, pe = $.lineBlockAtHeight(me), he = $.state.doc.lineAt(pe.from).number - 1, He = fd(O, he);
    if (!He) return;
    const $e = pe.height > 0 ? Math.max(0, Math.min(1, (me - pe.top) / pe.height)) : 0, fe = Zn(He, W) + He.offsetHeight * $e - co;
    fo(W, fe);
  }
  function ne() {
    const O = e.getPreviewRoot(), $ = e.getView();
    if (!O || !$) return;
    const U = v($), W = P(O);
    if (!W) return;
    const me = W.scrollTop + co, pe = md(O, W, me);
    if (!pe) return;
    const { el: he, line0: He } = pe, $e = Math.min(Math.max(1, He + 1), $.state.doc.lines), Me = $.state.doc.line($e), fe = $.lineBlockAt(Me.from), Oe = Zn(he, W), Pe = he.offsetHeight > 0 ? Math.max(0, Math.min(1, (me - Oe) / he.offsetHeight)) : 0;
    fo(U, fe.top + fe.height * Pe);
  }
  function se() {
    if (!S && !(R === "preview" || R === "follow")) {
      R = "editor";
      try {
        Y();
      } finally {
        J("editor");
      }
    }
  }
  function ee() {
    if (!S && !(R === "editor" || R === "follow")) {
      R = "preview";
      try {
        ne();
      } finally {
        J("preview");
      }
    }
  }
  function ye() {
    S || R === "preview" || R === "follow" || l || (l = requestAnimationFrame(() => {
      l = 0, se();
    }));
  }
  function G() {
    S || R === "editor" || R === "follow" || u || (u = requestAnimationFrame(() => {
      u = 0, ee();
    }));
  }
  function re(O) {
    const $ = Q(O.target);
    !$ || !H($, O.target) || (z($, O.target), $ === "editor" ? ye() : G());
  }
  function oe(O) {
    const $ = Q(O.target);
    $ && requestAnimationFrame(() => {
      const U = e.getView(), W = e.getPreviewRoot();
      $ === "editor" && U ? ye() : $ === "preview" && W && (z("preview", ht(W)), G());
    });
  }
  function q(O) {
    const $ = O.target;
    if ($ instanceof HTMLImageElement && (N == null ? void 0 : N.contains($))) {
      V(), L();
      for (const U of lo) n.push(setTimeout(() => E(), U));
    }
  }
  function ae(O) {
    const $ = O.scrollDOM;
    return $ instanceof HTMLElement ? (p === $ || (p && p.removeEventListener("scroll", re), p = $, $.addEventListener("scroll", re, { passive: true })), true) : false;
  }
  function Ue(O) {
    const $ = ht(O);
    return $ ? (m === $ || (m && m.removeEventListener("scroll", re), m = $, T = $, $.addEventListener("scroll", re, { passive: true })), true) : false;
  }
  function Le(O, $) {
    const U = pd(O, $);
    return U ? (b === U || (b && (b.removeEventListener("scroll", re, true), b.removeEventListener("wheel", oe, true), b.removeEventListener("touchmove", oe, true)), b = U, U.addEventListener("scroll", re, { capture: true, passive: true }), U.addEventListener("wheel", oe, { capture: true, passive: true }), U.addEventListener("touchmove", oe, { capture: true, passive: true })), true) : false;
  }
  function Xe(O) {
    N !== O && (N && (N.removeEventListener("load", q, true), N.removeEventListener("error", q, true)), N = O, O.addEventListener("load", q, true), O.addEventListener("error", q, true));
  }
  function je() {
    S || r != null || i >= ud || (r = setTimeout(() => {
      if (r = null, i += 1, S) return;
      ve() || je();
    }, cd));
  }
  function ve() {
    if (S) return false;
    const O = e.getView(), $ = e.getPreviewRoot();
    let U = true;
    return O && ae(O) || (U = false), $ ? (Ue($) || (U = false), Xe($)) : U = false, Le(O, $) || (U = false), U;
  }
  function Ne(O) {
    if (!S && (ve() || je(), E(), !!(O == null ? void 0 : O.withRetries))) {
      L();
      for (const $ of lo) n.push(setTimeout(() => {
        S || (ve() || je(), E());
      }, $));
    }
  }
  function _e() {
    S = true, L(), K(), F(), Z(), p && (p.removeEventListener("scroll", re), p = null), m && (m.removeEventListener("scroll", re), m = null), b && (b.removeEventListener("scroll", re, true), b.removeEventListener("wheel", oe, true), b.removeEventListener("touchmove", oe, true), b = null), N && (N.removeEventListener("load", q, true), N.removeEventListener("error", q, true), N = null), T = null, t = false, R = "none";
  }
  return K(), ve() || je(), Ne({ withRetries: true }), { schedule: Ne, stop: _e };
}
const Dt = new nr("s3haim-editor-undo-history");
Dt.version(1).stores({ histories: "key, updatedAt" });
const mo = 100, xs = 10080 * 60 * 1e3, gd = 500;
function xd(e, t) {
  return tr(e, t);
}
function bd(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" ? null : xd(e.type, e.id);
}
async function wd(e) {
  if (!e) return null;
  const t = await Dt.histories.get(e);
  return t ? typeof t.updatedAt == "number" && Date.now() - t.updatedAt > xs ? (await Dt.histories.delete(e), null) : !Array.isArray(t.stack) || t.stack.length === 0 ? null : t : null;
}
function ir(e) {
  return Array.isArray(e) ? e.length <= mo ? e : e.slice(e.length - mo) : [""];
}
async function po({ key: e, stack: t, index: n }) {
  if (!e) return;
  const r = ir(t), i = Math.max(0, Math.min(n ?? r.length - 1, r.length - 1));
  await Dt.histories.put({ key: e, stack: r, index: i, updatedAt: Date.now() });
}
async function yd() {
  const e = Date.now() - xs;
  await Dt.histories.where("updatedAt").below(e).delete();
}
function Zt(e, t, n) {
  const r = Array.isArray(e) && e.length > 0 ? [...e] : [""];
  let i = Math.max(0, Math.min(t, r.length - 1));
  const s = n ?? "";
  if (r[i] === s) return { stack: r, index: i };
  const l = r.lastIndexOf(s);
  if (l >= 0) return { stack: r, index: l };
  const u = r.slice(0, i + 1);
  u.push(s);
  const p = ir(u);
  return { stack: p, index: p.length - 1 };
}
function vd(e, t, n) {
  const r = n ?? "", i = Array.isArray(e) && e.length > 0 ? e : [""], s = Math.max(0, Math.min(t, i.length - 1));
  if (i[s] === r) return { stack: i, index: s, changed: false };
  for (let p = s - 1; p >= 0; p -= 1) if (i[p] === r) return { stack: i, index: p, changed: true };
  for (let p = s + 1; p < i.length; p += 1) if (i[p] === r) return { stack: i, index: p, changed: true };
  const l = i.slice(0, s + 1);
  l.push(r);
  const u = ir(l);
  return { stack: u, index: u.length - 1, changed: true };
}
function kd(e, t, n) {
  if (!(e == null ? void 0 : e.state) || !Array.isArray(t) || t.length === 0) return n == null ? void 0 : n(), false;
  const r = t[t.length - 1] ?? "";
  if (t.length === 1) return e.state.doc.toString() !== r && e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: r }, annotations: [wn.addToHistory.of(false)] }), n == null ? void 0 : n(), true;
  e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: t[0] ?? "" }, annotations: [wn.addToHistory.of(false), ur.of("full")] }), n == null ? void 0 : n();
  for (let s = 1; s < t.length; s += 1) {
    const l = t[s] ?? "";
    e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: l }, annotations: [ur.of("full")] });
  }
  return e.state.doc.toString() !== r && e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: r }, annotations: [wn.addToHistory.of(false)] }), true;
}
function ho(e) {
  return e && typeof e.resetHistory == "function" ? () => e.resetHistory() : null;
}
function Cd(e) {
  var _a2;
  return e ? ((_a2 = e.getEditorView) == null ? void 0 : _a2.call(e)) ?? null : null;
}
function go(e) {
  var _a2;
  return ((_a2 = e == null ? void 0 : e.current) == null ? void 0 : _a2.value) ?? (e == null ? void 0 : e.current) ?? null;
}
function Ed({ currentFile: e, value: t, onChange: n, editorRef: r, enabled: i = true }) {
  const s = i ? bd(e) : null, l = a.useRef([""]), u = a.useRef(0), p = a.useRef(null), m = a.useRef(false), b = a.useRef(null), T = a.useRef(null), N = a.useRef(t), R = a.useRef(false), S = a.useRef(null), L = a.useRef(0), K = a.useRef(t);
  N.current = t;
  const F = a.useCallback(async (H, E, V) => {
    if (H) try {
      await po({ key: H, stack: E, index: V });
    } catch (Y) {
      console.warn("[editor-undo-history] save failed:", Y);
    }
  }, []), Z = a.useCallback((H, E, V) => {
    H && (T.current && clearTimeout(T.current), T.current = setTimeout(() => {
      T.current = null, F(H, E, V);
    }, 300));
  }, [F]), J = a.useCallback(() => {
    b.current && (clearTimeout(b.current), b.current = null);
  }, []), v = a.useCallback(() => {
    const H = N.current ?? "", E = Zt(l.current, u.current, H);
    return l.current = E.stack, u.current = E.index, E;
  }, []), P = a.useCallback((H) => {
    const E = go(r), V = Cd(E), Y = ho(E);
    if (!V) return false;
    const ne = ++L.current;
    m.current = true;
    try {
      kd(V, H, Y ?? void 0);
    } finally {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          L.current === ne && (m.current = false);
        });
      });
    }
    return true;
  }, [r]), Q = a.useCallback((H, E) => {
    var _a2, _b;
    const V = N.current ?? "", Y = ((_a2 = E == null ? void 0 : E.stack) == null ? void 0 : _a2.length) ? E.stack : [V], ne = ((_b = E == null ? void 0 : E.stack) == null ? void 0 : _b.length) ? E.index ?? E.stack.length - 1 : 0, se = Zt(Y, ne, V);
    l.current = se.stack, u.current = se.index, S.current = H, R.current = false, K.current = V;
    const ee = se.stack.slice(0, se.index + 1), ye = (G) => {
      p.current === H && (P(ee) || G <= 0 || setTimeout(() => ye(G - 1), 50));
    };
    ye(40), Z(H, se.stack, se.index);
  }, [P, Z]);
  return a.useEffect(() => {
    i && yd().catch(() => {
    });
  }, [i]), a.useEffect(() => {
    var _a2;
    if (!i) return;
    const H = p.current, E = s;
    if (J(), T.current && (clearTimeout(T.current), T.current = null), H && H !== E) {
      const se = v();
      F(H, se.stack, se.index);
    }
    p.current = E, S.current = null, R.current = false;
    const V = go(r);
    if ((_a2 = ho(V)) == null ? void 0 : _a2(), !E) {
      l.current = [N.current ?? ""], u.current = 0;
      return;
    }
    const Y = ++L.current;
    let ne = false;
    return (async () => {
      let se = null;
      try {
        se = await wd(E);
      } catch (ee) {
        console.warn("[editor-undo-history] load failed:", ee);
      }
      ne || L.current !== Y || p.current === E && Q(E, se);
    })(), () => {
      ne = true;
    };
  }, [i, s, r, J, v, F, Q]), a.useEffect(() => {
    if (!i || !s || S.current !== s || R.current || m.current || t === K.current) return;
    const H = t ?? "";
    K.current = H;
    const E = Zt(l.current, u.current, H);
    l.current = E.stack, u.current = E.index, P(E.stack.slice(0, E.index + 1)), Z(s, E.stack, E.index);
  }, [i, s, t, P, Z]), a.useEffect(() => {
    if (i) return () => {
      J(), T.current && (clearTimeout(T.current), T.current = null);
      const H = p.current;
      if (!H) return;
      const E = Zt(l.current, u.current, N.current ?? "");
      po({ key: H, stack: E.stack, index: E.index }).catch(() => {
      });
    };
  }, [i, J]), { onChange: a.useCallback((H) => {
    m.current || (K.current = H, R.current = true, n == null ? void 0 : n(H), !(!i || !p.current) && (J(), b.current = setTimeout(() => {
      if (b.current = null, m.current) return;
      const E = p.current;
      if (!E) return;
      const V = vd(l.current, u.current, H);
      V.changed && (l.current = V.stack, u.current = V.index, Z(E, V.stack, V.index));
    }, gd)));
  }, [i, n, J, Z]) };
}
const ar = /^(\s*)([-+*])(\s+)(.*)$/, lr = /^(\s*)(\d+)([.)])(\s+)(.*)$/, bs = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX])\](.*)$/, Sd = /^(#{1,10})\s+(.*)$/;
function Nd(e) {
  if (!e) return false;
  const t = e[0];
  return [...e].every((n) => n === t);
}
function ws(e, t, n, r, i) {
  const s = t - r.length, l = n + i.length;
  if (s < 0 || l > e.length || e.sliceString(s, t) !== r || e.sliceString(n, l) !== i) return false;
  if (r === i && Nd(r)) {
    const u = r[0] ?? "";
    if (s > 0 && e.sliceString(s - 1, s) === u || l < e.length && e.sliceString(l, l + 1) === u) return false;
  }
  return true;
}
function jd(e, t, n, r) {
  const { from: i, to: s, empty: l } = t;
  if (l) {
    const m = `${n}${r}`;
    return { change: { from: i, to: s, insert: m }, next: Ie.cursor(i + n.length) };
  }
  const u = e.sliceString(i, s);
  if (u.length >= n.length + r.length && u.startsWith(n) && u.endsWith(r)) {
    const m = u.slice(n.length, u.length - r.length);
    return { change: { from: i, to: s, insert: m }, next: Ie.range(i, i + m.length) };
  }
  if (ws(e, i, s, n, r)) {
    const m = i - n.length, b = s + r.length;
    return { change: { from: m, to: b, insert: u }, next: Ie.range(m, m + u.length) };
  }
  const p = `${n}${u}${r}`;
  return { change: { from: i, to: s, insert: p }, next: Ie.range(i + n.length, i + n.length + u.length) };
}
function Md(e, t) {
  if (t.empty) return null;
  const n = e.sliceString(t.from, t.to);
  if (!n) return null;
  let r = "`";
  for (; n.includes(r); ) r += "`";
  if (!n.includes(`
`) && n.startsWith(r) && n.endsWith(r) && n.length > r.length * 2) {
    const l = n.slice(r.length, n.length - r.length);
    return { change: { from: t.from, to: t.to, insert: l }, next: Ie.range(t.from, t.from + l.length) };
  }
  if (ws(e, t.from, t.to, r, r)) {
    const l = t.from - r.length, u = t.to + r.length;
    return { change: { from: l, to: u, insert: n }, next: Ie.range(l, l + n.length) };
  }
  const s = `${r}${n}${r}`;
  return { change: { from: t.from, to: t.to, insert: s }, next: Ie.range(t.from + r.length, t.from + r.length + n.length) };
}
function ys(e, t) {
  if (!t.length) return false;
  const n = t.map((i) => i.change).filter((i) => !!i).sort((i, s) => i.from - s.from);
  if (!n.length) return false;
  const r = t.map((i) => i.next);
  return e.dispatch({ changes: n, selection: Ie.create(r, e.state.selection.mainIndex) }), true;
}
function yt(e, t, n = t) {
  if (!(e == null ? void 0 : e.state) || !t) return false;
  const r = e.state.selection.ranges.map((i) => jd(e.state.doc, i, t, n));
  return ys(e, r);
}
function Rd(e) {
  return yt(e, "**");
}
function Td(e) {
  return yt(e, "*");
}
function Ld(e) {
  return yt(e, "~~");
}
function Pd(e) {
  return yt(e, "<u>", "</u>");
}
function Ad(e) {
  return yt(e, "^");
}
function Dd(e) {
  return yt(e, "~");
}
function vs(e) {
  if (!(e == null ? void 0 : e.state)) return false;
  const t = e.state.selection.ranges.map((n) => Md(e.state.doc, n) ?? { next: n });
  return ys(e, t);
}
function Id(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e.state.selection.ranges) {
    const r = e.state.doc.lineAt(n.from).number, i = e.state.doc.lineAt(n.to).number;
    for (let s = r; s <= i; s += 1) t.add(s);
  }
  return [...t].sort((n, r) => n - r);
}
function $t(e, t) {
  if (!(e == null ? void 0 : e.state)) return false;
  const n = [];
  for (const r of Id(e)) {
    const i = e.state.doc.line(r), s = t(i.text);
    s !== null && s !== i.text && n.push({ from: i.from, to: i.to, insert: s });
  }
  return n.length ? (e.dispatch({ changes: n }), true) : false;
}
function Fd(e) {
  const t = e.match(ar);
  if (t) return `${t[1] ?? ""}1. ${t[4] ?? ""}`;
  const n = e.match(lr);
  return n ? `${n[1] ?? ""}- ${n[5] ?? ""}` : null;
}
function $d(e) {
  const t = e.match(bs);
  if (!t) return null;
  const n = t[1] ?? "", r = t[2] ?? " ", i = t[3] ?? "";
  return `${n}[${r === " " ? "x" : " "}]${i}`;
}
function _d(e) {
  return $t(e, Fd);
}
function Hd(e) {
  return $t(e, $d);
}
function Od(e) {
  return $t(e, (t) => {
    const n = t.match(ar);
    if (n) {
      const i = n[1] ?? "", s = n[4] ?? "";
      return bs.test(t) ? `${i}- ${s.replace(/^\[[ xX]\]\s?/, "")}` : `${i}${s}`;
    }
    const r = t.match(lr);
    return r ? `${r[1] ?? ""}- ${r[5] ?? ""}` : `- ${t}`;
  });
}
function Bd(e) {
  return $t(e, (t) => {
    const n = t.match(lr);
    if (n) return `${n[1] ?? ""}${n[5] ?? ""}`;
    const r = t.match(ar);
    return r ? `${r[1] ?? ""}1. ${r[4] ?? ""}` : `1. ${t}`;
  });
}
function xo(e, t) {
  if (t < 1 || t > 10) return false;
  const n = "#".repeat(t);
  return $t(e, (r) => {
    var _a2;
    const i = r.match(Sd);
    return i ? ((_a2 = i[1]) == null ? void 0 : _a2.length) === t ? i[2] ?? "" : `${n} ${i[2] ?? ""}` : `${n} ${r}`;
  });
}
function vt(e, t, n = t) {
  if (!(e == null ? void 0 : e.state) || !t) return false;
  const r = e.state.changeByRange((i) => {
    if (i.empty) return { range: i };
    const s = e.state.doc.sliceString(i.from, i.to), l = `${t}${s}${n}`;
    return { changes: { from: i.from, to: i.to, insert: l }, range: Ie.range(i.from + t.length, i.from + t.length + s.length) };
  });
  return r.changes.empty ? false : (e.dispatch(r), true);
}
function Kd(e) {
  return vt(e, "$");
}
function zd(e) {
  return vt(e, "[", "]");
}
function Vd(e) {
  return vt(e, "(", ")");
}
function Wd(e) {
  return vt(e, "{", "}");
}
function bo(e) {
  return vt(e, "'");
}
function wo(e) {
  return vt(e, '"');
}
const qd = "s3haim_md_editor_toc_width", Ud = 360;
function yo(e) {
  const t = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), n = [];
  (t ? e.metaKey : e.ctrlKey) && n.push("mod"), e.altKey && n.push("alt"), e.shiftKey && n.push("shift");
  const r = (e.key || "").toLowerCase();
  return !r || r === "shift" || r === "control" || r === "alt" || r === "meta" || (n.push(r), n.length <= 1) ? null : n.join("+");
}
function Jt(e) {
  return !e || typeof e != "string" ? "" : e.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
}
const Xd = $s({ nonTightLists: false });
function Yd(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const { state: t } = e, n = (_b = (_a2 = t.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof n != "number") return;
  const r = t.doc.lineAt(n);
  if (!/^(\s*)([-+*]|\d+[.)]|\[[ xX]\])/.test(r.text) || r.number < 2) return;
  const i = t.doc.line(r.number - 1);
  if (i.text.trim() !== "") return;
  const s = r.from - i.from;
  e.dispatch({ changes: { from: i.from, to: r.from, insert: "" }, selection: Ie.cursor(n - s) });
}
function Gd(e) {
  return Xd(e) ? (Yd(e), true) : Wc(e) ? true : Fs(e);
}
const Qd = Ds.highest(Ro.of([{ key: "Enter", run: Gd }]));
function Zd(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const t = (_b = (_a2 = e.state.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof t != "number") return;
  const n = e.state.doc.lineAt(t);
  e.dispatch({ changes: { from: n.from, to: n.from, insert: `
` }, selection: { anchor: n.from } });
}
function Jd(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return false;
  const { key: t, code: n } = e;
  return t === "`" || t === "?" || t === "\\" || n === "Backquote" || n === "IntlBackslash";
}
function ks(e, t) {
  if (t.defaultPrevented || t.ctrlKey || t.metaKey || t.altKey || t.isComposing) return false;
  switch (t.key) {
    case "$":
      return Kd(e);
    case "[":
      return zd(e);
    case "(":
      return Vd(e);
    case "{":
      return Wd(e);
    case "'":
      return bo(e);
    case '"':
      return wo(e);
    default:
      return t.code === "Quote" ? t.shiftKey ? wo(e) : bo(e) : false;
  }
}
function en(e, t) {
  return Na() ? t(e) : false;
}
const ef = [{ key: "Alt-h", preventDefault: true, run: (e) => en(e, ti) }, { key: "Alt-j", preventDefault: true, run: (e) => en(e, ni) }, { key: "Alt-k", preventDefault: true, run: (e) => en(e, ri) }, { key: "Alt-l", preventDefault: true, run: (e) => en(e, oi) }];
Is({ editorConfig: { languageUserDefined: { "ko-KR": _s }, renderDelay: Ho() ? 500 : 0 }, codeMirrorExtensions(e, { keyBindings: t }) {
  const n = [...e].filter((s) => s.type !== "keymap" && s.type !== "linkShortener" && s.type !== "lineNumbers"), r = (t || []).filter((s) => {
    const l = String((s == null ? void 0 : s.key) || "").toLowerCase(), u = String((s == null ? void 0 : s.mac) || "").toLowerCase();
    return l !== "ctrl-d" && l !== "mod-d" && u !== "cmd-d" && l !== "ctrl-b" && l !== "mod-b" && u !== "cmd-b" && l !== "ctrl-u" && l !== "mod-u" && u !== "cmd-u" && l !== "ctrl-o" && l !== "mod-o" && u !== "cmd-o" && l !== "ctrl-arrowup" && l !== "mod-arrowup" && u !== "cmd-arrowup" && l !== "ctrl-arrowdown" && l !== "mod-arrowdown" && u !== "cmd-arrowdown" && !/^ctrl-[0-9]$/.test(l) && !/^mod-[0-9]$/.test(l) && !/^cmd-[0-9]$/.test(u);
  }), i = [{ key: "ArrowLeft", run: (s) => Nr(s, -1) }, { key: "ArrowRight", run: (s) => Nr(s, 1) }, { key: "Ctrl-ArrowLeft", mac: "Alt-ArrowLeft", run: (s) => We(s, -1, Xs), shift: (s) => We(s, -1, Us) }, { key: "Ctrl-ArrowRight", mac: "Alt-ArrowRight", run: (s) => We(s, 1, Gs), shift: (s) => We(s, 1, Ys) }, { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: (s) => We(s, -1, Zs), shift: (s) => We(s, -1, Qs) }, { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: (s) => We(s, 1, ei), shift: (s) => We(s, 1, Js) }, ...ef, { key: "Alt--", preventDefault: true, run: _d }, { key: "Ctrl-Tab", run: Hd }, { key: "Ctrl-d", mac: "Cmd-d", preventDefault: true, run: (s) => (Bs(s), true) }, { key: "Ctrl-b", mac: "Cmd-b", preventDefault: true, run: Rd }, { key: "Ctrl-i", mac: "Cmd-i", preventDefault: true, run: Td }, { key: "Ctrl-u", mac: "Cmd-u", preventDefault: true, run: Pd, shift: Od }, { key: "Ctrl-o", mac: "Cmd-o", preventDefault: true, run: Bd }, { key: "Shift-Ctrl-s", mac: "Shift-Cmd-s", preventDefault: true, run: Ld }, { key: "Ctrl-ArrowUp", mac: "Cmd-ArrowUp", preventDefault: true, run: Ad }, { key: "Ctrl-ArrowDown", mac: "Cmd-ArrowDown", preventDefault: true, run: Dd }, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => ({ key: `Ctrl-${s}`, mac: `Cmd-${s}`, preventDefault: true, run: (l) => xo(l, s) })), { key: "Ctrl-0", mac: "Cmd-0", preventDefault: true, run: (s) => xo(s, 10) }, { any: (s, l) => (l.ctrlKey || l.metaKey) && l.altKey && l.code === "KeyC" ? vs(s) : ks(s, l) }, { key: "Mod-Alt-ArrowUp", run: Hs }, { key: "Mod-Alt-ArrowDown", run: Os }, ...r];
  return n.some((s) => s.type === "drawSelection") || n.push({ type: "drawSelection", extension: Ks() }), n.push({ type: "markdownSingleNewlineEnter", extension: Qd }, { type: "lineNumbers", extension: Hu() }, { type: "allowMultipleSelections", extension: zs.allowMultipleSelections.of(true) }, { type: "clickAddsSelectionRange", extension: Lt.clickAddsSelectionRange.of((s) => {
    const l = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    return s.altKey || (l ? s.metaKey : s.ctrlKey);
  }) }, { type: "multiCursorPreview", extension: Vs({ minSelectionLength: 2, maxMatches: 200 }) }, { type: "keymap", extension: Ro.of(i) }, { type: "base64ImageFold", extension: Fc(Gn()) }, { type: "mermaidBase64Fold", extension: Kc(Gn()) }, { type: "autocompleteGate", extension: Lt.updateListener.of((s) => {
    id(s), !Do() && Ws(s.state) === "active" && qs(s.view);
  }) }), n;
}, markdownItPlugins(e) {
  return Ea(e);
} });
function vf({ value: e, onChange: t, onSave: n, theme: r = "light", currentFile: i = null, previewOnly: s = false, isMobileLayout: l = false, onUploadImage: u, isUploadingEditorImage: p = false, uploadImagePercent: m = 0, onCancelUploadImage: b, onResolveWikiImageUrl: T, snippetConfig: N = { snippets: [] }, llmProviderProfiles: R = [], getImgbbApiKey: S, onOpenViewPath: L, onRequestConvertAllImagesToWiki: K, onRegisterConvertAllImagesToWiki: F, isActiveFile: Z = true }) {
  var _a2, _b;
  const J = Vi(), v = vo(), { showAlert: P } = Wi(), Q = a.useId(), z = a.useMemo(() => Wl(Q), [Q]), H = a.useMemo(() => ql(z), [z]), E = a.useRef(null), V = a.useRef(null), Y = a.useRef(null), ne = a.useRef(null), se = a.useRef(N), ee = a.useRef(e), ye = a.useRef(i), G = a.useRef(r), re = a.useRef("");
  a.useEffect(() => {
    ee.current = e, ye.current = i, G.current = r;
  }, [e, i, r]), a.useEffect(() => {
    const { issues: f } = _o(e ?? "");
    if (!f.length) {
      re.current = "";
      return;
    }
    const h = qi(f);
    h !== re.current && (re.current = h, P({ title: "Cover syntax error", message: `note-cover has invalid syntax.

${h}` }));
  }, [e, P]);
  const oe = a.useCallback((f = {}) => {
    const h = ee.current ?? "", x = ye.current;
    Po({ currentFile: x, editorContent: h }), v(Ao(x == null ? void 0 : x.id), { state: { value: h, theme: G.current === "dark" ? "dark" : "light", currentFile: x, ...f.openCoverEdit ? { openCoverEdit: true } : {} } });
  }, [v]), { onChange: q } = Ed({ currentFile: i, value: e, onChange: t, editorRef: E, enabled: !s }), ae = Eu({ getMarkdown: () => ee.current ?? "", setMarkdown: (f) => {
    typeof t == "function" && t(f);
  } }), Ue = a.useRef(ae.openAtOffset), Le = a.useRef(ae.openPreviewTable);
  a.useEffect(() => {
    Ue.current = ae.openAtOffset, Le.current = ae.openPreviewTable;
  }, [ae.openAtOffset, ae.openPreviewTable]);
  const Xe = a.useRef(null), [je, ve] = a.useState(false), [Ne, _e] = a.useState(null), O = a.useRef(() => {
  }), [$, U] = a.useState(false), [W, me] = a.useState(null), [pe, he] = a.useState(0), [He, $e] = a.useState(false), [Me, fe] = a.useState(false), Oe = a.useRef({ from: 0, to: 0 }), Pe = a.useRef(q);
  a.useEffect(() => {
    Pe.current = q;
  }, [q]);
  const [Ye, Ge] = a.useState(null), [ge, Qe] = a.useState(null), [kt, Ae] = a.useState(false), [Ze, Ct] = a.useState(null), [_t, ct] = a.useState(false), [ke, xe] = a.useState(null), [de, Ce] = a.useState(null), le = a.useRef(null), [ut, Et] = Cl(), [Ke, dt] = jc(), [Ht, Ot] = Mc(), [mn, ft] = Rc(), Re = a.useMemo(() => Ho(), []), ue = Re ? false : mn, Ee = a.useRef(null);
  a.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3, _b2, _c2;
      const y = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      y && (Ee.current = y.state.selection);
    }, h = (w) => {
      !(w.metaKey || w.ctrlKey) || w.altKey || w.shiftKey || w.key.toLowerCase() === "k" && f();
    };
    window.addEventListener("keydown", h, true);
    const x = Ui(f);
    return () => {
      window.removeEventListener("keydown", h, true), x();
    };
  }, [s]), a.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3;
      return ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current;
    }, h = () => {
      var _a3, _b2;
      const D = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3), B = Ee.current;
      !D || !B || D.dispatch({ selection: B, scrollIntoView: true });
    }, x = (j) => {
      var _a3;
      const D = f();
      D && (h(), (_a3 = D.focus) == null ? void 0 : _a3.call(D), typeof D.execCommand == "function" && D.execCommand(j));
    }, w = () => {
      var _a3, _b2, _c2;
      const j = f();
      if (!j) return;
      const D = `

<pgbr/>

`;
      if (typeof j.insert == "function") {
        j.insert(() => ({ targetValue: D, select: false, deviationStart: 0, deviationEnd: 0 })), (_a3 = j.focus) == null ? void 0 : _a3.call(j);
        return;
      }
      const B = (_b2 = j.getEditorView) == null ? void 0 : _b2.call(j);
      B && (B.dispatch(B.state.replaceSelection(D)), (_c2 = B.focus) == null ? void 0 : _c2.call(B));
    }, y = (j = {}) => {
      oe(j);
    }, M = {};
    for (const j of Xi) j.directive && (M[j.id] = () => x(j.directive));
    return M["editor-revoke"] = () => {
      var _a3, _b2;
      h();
      const j = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      j && (j.focus(), Ls(j));
    }, M["editor-next"] = () => {
      var _a3, _b2;
      h();
      const j = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      j && (j.focus(), Ps(j));
    }, M["editor-llm-assist"] = () => {
      var _a3;
      return (_a3 = J == null ? void 0 : J.toggleAssist) == null ? void 0 : _a3.call(J);
    }, M["editor-export-pdf"] = y, M["editor-pgbr"] = () => {
      h(), w();
    }, M["editor-heading-remap"] = () => {
      h(), O.current();
    }, M["editor-checklist-progress"] = () => U(true), M["editor-table-edit"] = () => {
      var _a3, _b2;
      h();
      const j = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      if (!j) return;
      const { from: D, to: B } = j.state.selection.main;
      Ue.current(D, B) || P({ title: "No table", message: "No haim-table found at the cursor or selection position." });
    }, M["editor-image-upload"] = () => {
      const j = document.createElement("input");
      j.type = "file", j.accept = "image/*", j.multiple = true, j.onchange = () => {
        var _a3;
        const D = Array.from(j.files || []);
        D.length && ((_a3 = Xe.current) == null ? void 0 : _a3.call(Xe, D));
      }, j.click();
    }, M["editor-image-clip"] = () => {
      const j = document.createElement("input");
      j.type = "file", j.accept = "image/*", j.onchange = () => {
        var _a3;
        const D = (_a3 = j.files) == null ? void 0 : _a3[0];
        D && Ge(D);
      }, j.click();
    }, M["editor-convert-all-images-to-wiki"] = () => {
      typeof K == "function" && K();
    }, M["editor-insert-footnote"] = () => {
      br({ mode: "footnote-insert" });
    }, M["editor-insert-circle-number"] = (j) => {
      var _a3, _b2, _c2;
      const D = typeof j == "string" ? j : "";
      if (!D) {
        br({ mode: "circle-number" });
        return;
      }
      h();
      const X = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      X && (X.dispatch(X.state.replaceSelection(D)), (_c2 = X.focus) == null ? void 0 : _c2.call(X));
    }, M["editor-insert-snippet"] = (j) => {
      var _a3, _b2, _c2;
      const D = typeof j == "string" ? j : "";
      if (!D) return;
      h();
      const X = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      X && (X.dispatch(X.state.replaceSelection(D)), (_c2 = X.focus) == null ? void 0 : _c2.call(X));
    }, Yi(M);
  }, [s, oe, P, K, J]);
  const Be = J == null ? void 0 : J.registerEditorBridge;
  a.useEffect(() => {
    if (s || !Z || !Be) return;
    const f = () => {
      const h = E.current;
      if (!h) return null;
      if (typeof h.getEditorView == "function" || typeof h.getSelectedText == "function") return h;
      const x = h.value;
      return x && (typeof x.getEditorView == "function" || typeof x.getSelectedText == "function") ? x : null;
    };
    return Be({ editorRef: E, getEditorApi: f, onChange: q, getMarkdown: () => {
      var _a3, _b2, _c2, _d2, _e2, _f;
      return ((_f = (_e2 = (_d2 = (_c2 = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3)) == null ? void 0 : _c2.state) == null ? void 0 : _d2.doc) == null ? void 0 : _e2.toString) == null ? void 0 : _f.call(_e2)) ?? ee.current ?? "";
    } });
  }, [s, Z, Be, q]), a.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3, _b2, _c2;
      return ((_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? null;
    }, h = () => {
      const w = f(), y = Ee.current;
      !w || !y || w.dispatch({ selection: y, scrollIntoView: true });
    }, x = (w, y) => {
      var _a3, _b2;
      const M = f();
      M && (M.dispatch({ changes: { from: 0, to: M.state.doc.length, insert: w }, selection: { anchor: y }, scrollIntoView: true }), (_a3 = M.focus) == null ? void 0 : _a3.call(M)), (_b2 = Pe.current) == null ? void 0 : _b2.call(Pe, w);
    };
    return Gi({ getMarkdown: () => {
      var _a3;
      return ((_a3 = f()) == null ? void 0 : _a3.state.doc.toString()) ?? ee.current ?? "";
    }, insertExisting: (w) => {
      h();
      const y = f(), M = (y == null ? void 0 : y.state.doc.toString()) ?? ee.current ?? "", j = y == null ? void 0 : y.state.selection.main, D = Sa(M, (j == null ? void 0 : j.from) ?? 0, (j == null ? void 0 : j.to) ?? 0, w);
      x(D.next, D.caret);
    }, openCompose: () => {
      var _a3;
      h();
      const y = (_a3 = f()) == null ? void 0 : _a3.state.selection.main;
      Oe.current = { from: (y == null ? void 0 : y.from) ?? 0, to: (y == null ? void 0 : y.to) ?? 0 }, fe(true);
    } });
  }, [s]);
  const { width: Je, isResizing: Bt, handleProps: Kt } = Qi({ storageKey: qd, defaultWidth: Ud, minWidth: 160, collapseBelowWidth: 80, maxWidth: 640, edge: "right", onCollapseBelowMin: () => {
    var _a3, _b2, _c2;
    (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.toggleCatalog) == null ? void 0 : _c2.call(_b2, false);
  } }), et = a.useMemo(() => {
    const { meta: f } = Zi(e ?? "");
    return f;
  }, [e]), zt = a.useMemo(() => {
    const f = et == null ? void 0 : et.fonts;
    return f ? { "--print-font-body": Ut(f.body), "--print-font-heading": Ut(f.heading), "--print-font-bold": Ut(f.bold), "--print-font-code": Ut(f.code, "mono") } : {};
  }, [et]);
  a.useEffect(() => {
    se.current = N || { snippets: [] };
  }, [N]), a.useEffect(() => {
    const f = () => {
      var _a3, _b2, _c2;
      const y = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return y ? ($c(y, Ke), zc(y, Ke), true) : false;
    };
    if (f()) return;
    const h = window.setTimeout(f, 50), x = window.setTimeout(f, 250);
    return () => {
      window.clearTimeout(h), window.clearTimeout(x);
    };
  }, [Ke]), a.useEffect(() => {
    const f = V.current;
    if (!f) return;
    const h = () => {
      const w = f.querySelector(".md-editor-catalog-fixed, .md-editor-catalog-flat");
      xe((y) => y === w ? y : w);
    };
    h();
    const x = new MutationObserver(h);
    return x.observe(f, { childList: true, subtree: true }), () => x.disconnect();
  }, []), a.useEffect(() => {
    const f = V.current;
    f && f.style.setProperty("--md-catalog-width", `${Je}px`);
  }, [Je]), a.useLayoutEffect(() => {
    if (!ke) {
      Ce(null);
      return;
    }
    const f = () => {
      const w = ke.getBoundingClientRect();
      if (w.width <= 0 || w.height <= 0) {
        Ce(null);
        return;
      }
      Ce({ top: w.top, left: w.left, height: w.height });
    };
    f();
    const h = new ResizeObserver(f);
    h.observe(ke);
    const x = V.current;
    return x && h.observe(x), window.addEventListener("resize", f), window.addEventListener("scroll", f, true), () => {
      h.disconnect(), window.removeEventListener("resize", f), window.removeEventListener("scroll", f, true);
    };
  }, [ke, Je]), a.useEffect(() => {
    if (ke) return Ql(ke, { getEditorRoot: () => V.current, mdHeadingId: (f) => H(f) });
  }, [ke, H]), jl(V, e, T, (i == null ? void 0 : i.id) ?? null), Ji(V, { layoutKey: r }), a.useEffect(() => {
    const f = V.current;
    if (!f || !e) return;
    let h = 0;
    const x = () => {
      Vu(f, e, T);
    }, w = () => {
      const B = f.querySelectorAll("[data-note-cover-mount]");
      !B.length || !(f.querySelector(".md-note-cover-placeholder--pending") || [...B].some((ce) => ce.childNodes.length === 0)) || h || (h = window.requestAnimationFrame(() => {
        h = 0, x();
      }));
    }, M = [0, 80, 280, 600, 1100, 2e3].map((B) => setTimeout(x, B)), j = f.querySelector(".md-editor-preview") || f, D = typeof MutationObserver < "u" ? new MutationObserver(w) : null;
    return D == null ? void 0 : D.observe(j, { childList: true, subtree: true }), () => {
      h && window.cancelAnimationFrame(h), M.forEach((B) => clearTimeout(B)), D == null ? void 0 : D.disconnect();
    };
  }, [e, T, i == null ? void 0 : i.id]), a.useEffect(() => {
    const f = V.current;
    return () => {
      Wu(f);
    };
  }, []), a.useEffect(() => {
    if (s) return;
    const f = Nu(i), h = () => {
      var _a3, _b2, _c2;
      const y = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return y ? (Pu(y, f), true) : false;
    };
    if (h()) return;
    const x = [50, 200, 500, 1e3].map((w) => setTimeout(h, w));
    return () => x.forEach((w) => clearTimeout(w));
  }, [i == null ? void 0 : i.id, i == null ? void 0 : i.type, s]), a.useEffect(() => {
    var _a3, _b2, _c2;
    if (s) return;
    const h = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    ea(h);
  }, [i == null ? void 0 : i.id, s]), a.useEffect(() => {
    if (s) return;
    let f = null, h = null;
    const x = () => {
      var _a3, _b2, _c2;
      const M = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return !M || M === h ? !!M : (f == null ? void 0 : f(), h = M, f = ga(M), true);
    };
    if (x()) return () => {
      f == null ? void 0 : f();
    };
    const w = [50, 200, 500, 1e3].map((y) => setTimeout(x, y));
    return () => {
      w.forEach((y) => clearTimeout(y)), f == null ? void 0 : f();
    };
  }, [s, i == null ? void 0 : i.id]), a.useEffect(() => {
    const f = V.current;
    if (!f) return;
    const h = nd(i), x = { current: [] };
    let w = false, y = null, M = null, j = [];
    const D = () => f.querySelector(".md-editor-preview"), B = () => {
      if (w) return;
      const te = D();
      if (!te || !Qu(te)) return;
      const d = ed(te, { collapsedIds: x.current, onCollapsedChange: (g) => {
        x.current = g, h && od(h, g);
      } }), c = y;
      y = () => {
        c == null ? void 0 : c(), d();
      };
    }, X = (te) => {
      !te || M || typeof MutationObserver > "u" || (M = new MutationObserver(B), M.observe(te, { childList: true, subtree: true }));
    };
    return (async () => {
      if (h) {
        const te = await rd(h);
        if (w) return;
        te && (x.current = te);
      }
      w || (X(D()), B(), j = [80, 250, 600].map((te) => setTimeout(() => {
        w || (X(D()), B());
      }, te)));
    })(), () => {
      w = true, j.forEach((te) => clearTimeout(te)), M == null ? void 0 : M.disconnect(), M = null, y == null ? void 0 : y(), y = null;
    };
  }, [i == null ? void 0 : i.id, i == null ? void 0 : i.type]), a.useEffect(() => {
    var _a3, _b2, _c2;
    if (!s) return;
    (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c2.call(_b2, true);
  }, [s]), a.useEffect(() => {
    if (!l || s || !(i == null ? void 0 : i.id)) return;
    ft(false);
    const f = () => {
      var _a3, _b2, _c2;
      (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c2.call(_b2, true);
    };
    f();
    const h = [80, 240, 600].map((x) => setTimeout(f, x));
    return () => {
      h.forEach((x) => clearTimeout(x));
    };
  }, [l, s, i == null ? void 0 : i.id, ft]), a.useEffect(() => {
    if (s || Re) return;
    const f = V.current;
    if (!f) return;
    const h = () => f.querySelector(".md-editor-preview"), x = () => ue;
    let w = null;
    const y = (c) => c instanceof Element ? Sn(c) ? true : !!c.closest("a, button, input, textarea, select, .md-editor-code-action, [data-transform-handle]") : false, M = (c) => {
      var _a3, _b2, _c2, _d2, _e2, _f;
      const g = h();
      if (!g || Tt(g)) return;
      if (!x()) {
        const I = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window);
        (I == null ? void 0 : I.rangeCount) && g.contains(I.getRangeAt(0).commonAncestorContainer) && !I.getRangeAt(0).collapsed ? jn(g, { allowCollapsed: false }) : jt(g);
        return;
      }
      const k = (_b2 = window.getSelection) == null ? void 0 : _b2.call(window);
      if (!k || k.rangeCount === 0) {
        if (!(c instanceof Element) || !c.closest("td, th")) return;
      } else {
        const I = k.getRangeAt(0);
        if (!g.contains(I.commonAncestorContainer) && !(c instanceof Element && c.closest("td, th"))) return;
      }
      const A = (_e2 = (_d2 = ((_c2 = E.current) == null ? void 0 : _c2.value) ?? E.current) == null ? void 0 : _d2.getEditorView) == null ? void 0 : _e2.call(_d2);
      A && ((k == null ? void 0 : k.rangeCount) && g.contains(k.getRangeAt(0).commonAncestorContainer) && jn(g, { allowCollapsed: true }), Cr(A, g, { focus: true, target: c }), Mn(), (_f = ne.current) == null ? void 0 : _f.schedule({ withRetries: true }));
    }, j = (c) => c.button === 2 || c.button === 0 && c.ctrlKey, D = (c, g) => Er(g, c.clientX, c.clientY) ? true : Sr(c.clientX, c.clientY) ? Ca(g) : false, B = (c) => {
      var _a3, _b2, _c2, _d2;
      const g = h();
      if (!g) return;
      const k = c.target;
      if (!(k instanceof Node)) return;
      if (g.contains(k) && j(c)) {
        D(c, g);
        return;
      }
      if (g.contains(k)) {
        w = { x: c.clientX, y: c.clientY }, !Sn(k) && !x() && jt(g);
        return;
      }
      if (w = null, (_d2 = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) == null ? void 0 : _d2.dom.contains(k)) {
        if (j(c)) return;
        Rn(), x() || jt(g);
      }
    }, X = (c) => {
      const g = h();
      !g || !(c.target instanceof Node) || !g.contains(c.target) || D(c, g);
    }, ce = (c) => {
      var _a3, _b2, _c2;
      if (j(c)) return;
      const g = h();
      if (!(!g || !(c.target instanceof Node) || !g.contains(c.target)) && !y(c.target)) {
        if (Nn(f)) {
          const k = !!(w && Math.hypot(c.clientX - w.x, c.clientY - w.y) > 6);
          if (w = null, !x() || k) return;
          const A = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), I = c.target instanceof Element ? vr(c.target, g) : null;
          A && I && (Mn(), kr(I, A, g, c.clientX, c.clientY));
          return;
        }
        w = null, requestAnimationFrame(() => M(c.target));
      }
    }, te = (c) => {
      var _a3, _b2, _c2, _d2;
      const g = h();
      if (!(!g || !(c.target instanceof Node) || !g.contains(c.target)) && !y(c.target)) {
        if (Nn(f)) {
          if (!x()) return;
          const C = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), A = (_d2 = c.changedTouches) == null ? void 0 : _d2[0], I = c.target instanceof Element ? vr(c.target, g) : null;
          C && I && A && (Mn(), kr(I, C, g, A.clientX, A.clientY));
          return;
        }
        requestAnimationFrame(() => M(c.target));
      }
    }, d = (c) => {
      var _a3, _b2, _c2, _d2, _e2;
      if (!x() || c.isComposing || c.keyCode === 229 || c.key === "Process" || (c.metaKey || c.ctrlKey) && (c.key === "s" || c.key === "S" || c.code === "KeyS") || Sn(c.target)) return;
      const g = h();
      if (!g || Tt(g) || Nn(f)) return;
      const k = c.target, C = k instanceof Node && g.contains(k), A = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), I = (A == null ? void 0 : A.rangeCount) > 0 && g.contains(A.getRangeAt(0).commonAncestorContainer);
      if (!C && !I) return;
      const Se = (_d2 = (_c2 = ((_b2 = E.current) == null ? void 0 : _b2.value) ?? E.current) == null ? void 0 : _c2.getEditorView) == null ? void 0 : _d2.call(_c2);
      Se && (Se.hasFocus || (I ? (jn(g, { allowCollapsed: true }), Cr(Se, g, { focus: true }), (_e2 = ne.current) == null ? void 0 : _e2.schedule({ withRetries: true })) : Se.focus()));
    };
    return f.addEventListener("mousedown", B, true), f.addEventListener("contextmenu", X, true), f.addEventListener("mouseup", ce), f.addEventListener("touchend", te, { passive: true }), f.addEventListener("keydown", d, true), () => {
      jt(h()), f.removeEventListener("mousedown", B, true), f.removeEventListener("contextmenu", X, true), f.removeEventListener("mouseup", ce), f.removeEventListener("touchend", te), f.removeEventListener("keydown", d, true);
    };
  }, [s, ue, Re]), a.useEffect(() => {
    var _a3, _b2, _c2, _d2;
    if (s) {
      (_a3 = Y.current) == null ? void 0 : _a3.stop(), Y.current = null, (_b2 = ne.current) == null ? void 0 : _b2.stop(), ne.current = null, Rn();
      return;
    }
    const f = V.current, h = () => {
      var _a4;
      return (_a4 = f ?? V.current) == null ? void 0 : _a4.querySelector(".md-editor-preview");
    }, x = () => {
      var _a4, _b3, _c3;
      return (_c3 = (_b3 = ((_a4 = E.current) == null ? void 0 : _a4.value) ?? E.current) == null ? void 0 : _b3.getEditorView) == null ? void 0 : _c3.call(_b3);
    };
    (_c2 = Y.current) == null ? void 0 : _c2.stop();
    const w = hd({ getPreviewRoot: h, getView: x });
    Y.current = w, (_d2 = ne.current) == null ? void 0 : _d2.stop(), ne.current = null, ue ? ne.current = ld({ getPreviewRoot: h, getView: x }) : Rn();
    const y = sd((M, j) => {
      var _a4;
      const D = x();
      !D || M !== D || (w.schedule({ withRetries: j.docChanged }), ue && ((_a4 = ne.current) == null ? void 0 : _a4.schedule({ withRetries: j.docChanged })));
    });
    return () => {
      var _a4, _b3;
      y(), (_a4 = ne.current) == null ? void 0 : _a4.stop(), ne.current = null, (_b3 = Y.current) == null ? void 0 : _b3.stop(), Y.current = null;
    };
  }, [s, ue]), a.useEffect(() => {
    if (s || Re || !ue) {
      ta();
      return;
    }
    const f = V.current;
    if (f) return na(f, { getPreviewRoot: () => f.querySelector(".md-editor-preview"), getView: () => {
      var _a3, _b2, _c2;
      return (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    }, isEnabled: () => ue });
  }, [s, ue, Re]), a.useEffect(() => {
    var _a3, _b2, _c2;
    const h = (_a3 = V.current) == null ? void 0 : _a3.querySelector(".md-editor-preview");
    if (ra(), !!h && ((_b2 = Y.current) == null ? void 0 : _b2.schedule({ withRetries: true }), !Re)) {
      if (ue && !Tt(h)) {
        (_c2 = ne.current) == null ? void 0 : _c2.schedule({ withRetries: true });
        return;
      }
      ue || jt(h);
    }
  }, [e, i == null ? void 0 : i.id, ue, Re]), a.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3;
      const h = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current;
      return (h == null ? void 0 : h.domEventHandlers) ? (h.domEventHandlers({ paste: (x, w) => {
        const y = x.clipboardData;
        if (!y || !w) return;
        const M = Nl(y);
        if (M.length && typeof u == "function") {
          if (p) return x.preventDefault(), false;
          x.preventDefault();
          const D = w;
          return u(M).then((B) => {
            var _a4, _b2, _c2;
            if (!(B == null ? void 0 : B.length)) return;
            const X = B.map((d) => `![[${d}]]`).join(`
`), te = ((_c2 = (_b2 = ((_a4 = E.current) == null ? void 0 : _a4.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? D;
            te && te.dispatch(te.state.replaceSelection(X));
          }), false;
        }
        const j = y.getData("text/plain") ?? "";
        if (j) return x.preventDefault(), w.dispatch(w.state.replaceSelection(j)), false;
      }, keydown: (x, w) => {
        var _a4;
        if (!w) return;
        if (!w.composing && Jd(x) && vs(w) || !w.composing && ks(w, x)) return x.preventDefault(), x.stopPropagation(), true;
        const y = yo(x);
        if (!y) return;
        if (y === "mod+shift+enter") return x.preventDefault(), x.stopPropagation(), Zd(w), false;
        if (y === "mod+s") return;
        const j = ((_a4 = se.current) == null ? void 0 : _a4.snippets) || [], D = Jt(y), B = j.find((X) => Jt(X.prefix) === D && (X.body || "").trim());
        if (B) return x.preventDefault(), x.stopPropagation(), w.dispatch(w.state.replaceSelection(B.body)), false;
      } }), true) : false;
    };
    if (!f()) {
      const h = setTimeout(f, 100);
      return () => clearTimeout(h);
    }
  }, [s, u, p]), a.useEffect(() => {
    if (s) return;
    const f = (h) => {
      var _a3, _b2, _c2, _d2, _e2, _f;
      const x = yo(h);
      if (!x || x === "mod+s") return;
      const y = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      if (!y) return;
      const M = V.current, j = h.target;
      if (!(M == null ? void 0 : M.contains(j)) && !((_d2 = y.dom) == null ? void 0 : _d2.contains(j))) return;
      const B = ((_e2 = se.current) == null ? void 0 : _e2.snippets) || [], X = Jt(x), ce = B.find((te) => Jt(te.prefix) === X && (te.body || "").trim());
      ce && (h.preventDefault(), h.stopPropagation(), (_f = h.stopImmediatePropagation) == null ? void 0 : _f.call(h), y.dispatch(y.state.replaceSelection(ce.body)));
    };
    return document.addEventListener("keydown", f, true), () => document.removeEventListener("keydown", f, true);
  }, [s, N]), a.useEffect(() => {
    if (typeof n != "function") return;
    const f = (h) => {
      var _a3, _b2, _c2, _d2, _e2;
      if (!(h.ctrlKey || h.metaKey) || h.altKey || h.key !== "s" && h.key !== "S" && h.code !== "KeyS") return;
      const x = V.current;
      if (!x) return;
      const w = h.target, y = w instanceof Node && x.contains(w), M = x.querySelector(".md-editor-preview"), j = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), D = !!(M && (j == null ? void 0 : j.rangeCount) && M.contains(j.getRangeAt(0).commonAncestorContainer));
      if (!y && !D && !Tt(M)) return;
      h.preventDefault(), h.stopPropagation(), (_b2 = h.stopImmediatePropagation) == null ? void 0 : _b2.call(h);
      const X = (_e2 = (_d2 = ((_c2 = E.current) == null ? void 0 : _c2.value) ?? E.current) == null ? void 0 : _d2.getEditorView) == null ? void 0 : _e2.call(_d2);
      xa(X), n();
    };
    return document.addEventListener("keydown", f, true), () => document.removeEventListener("keydown", f, true);
  }, [n]), a.useEffect(() => {
    const f = V.current;
    if (!f) return;
    const h = (x) => {
      var _a3, _b2, _c2, _d2, _e2, _f, _g, _h, _i2;
      const w = f.querySelector(".md-editor-preview"), y = (_b2 = (_a3 = x.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "table");
      if (y && w && w.contains(y) || w && (Er(w, x.clientX, x.clientY) || Sr(x.clientX, x.clientY))) return;
      const M = (_d2 = (_c2 = x.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, ".cm-editor");
      if (M && f.contains(M)) {
        const ce = (_g = (_f = ((_e2 = E.current) == null ? void 0 : _e2.value) ?? E.current) == null ? void 0 : _f.getEditorView) == null ? void 0 : _g.call(_f);
        if (ce) {
          const { from: te, to: d } = ce.state.selection.main, c = ee.current ?? "";
          if (Vn(c, te, d)) {
            x.preventDefault(), Ue.current(te, d);
            return;
          }
        }
      }
      const j = (_i2 = (_h = x.target) == null ? void 0 : _h.closest) == null ? void 0 : _i2.call(_h, "img[data-wiki-path], img[data-md-src]");
      if (!j || !f.contains(j)) return;
      const D = ba(j);
      if (!D.kind || !D.key) return;
      x.preventDefault();
      const B = D.kind === "wiki" ? wa(f, j, D.key) : ya(f, j, D.key);
      me({ kind: D.kind, key: D.key, width: D.width, height: D.height, occurrence: B, imageSrc: j.currentSrc || j.src || "" });
    };
    return f.addEventListener("contextmenu", h), () => f.removeEventListener("contextmenu", h);
  }, [P]), a.useEffect(() => {
    const f = V.current;
    if (!f) return;
    const h = (x) => {
      var _a3, _b2, _c2, _d2;
      if ((_b2 = (_a3 = x.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const w = f.querySelector(".md-editor-preview"), y = (_d2 = (_c2 = x.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "table");
      if (!y || !w || !w.contains(y)) return;
      x.preventDefault(), x.stopPropagation(), Le.current(y, w) || P({ title: "No table", message: "No haim-table found at this position. Click inside a table cell and try again." });
    };
    return f.addEventListener("dblclick", h, true), () => f.removeEventListener("dblclick", h, true);
  }, [P]), a.useEffect(() => {
    const f = V.current;
    if (f) return wl(f);
  }, []), a.useEffect(() => {
    const f = () => {
      he((h) => h + 1);
    };
    return window.addEventListener(wr, f), () => {
      window.removeEventListener(wr, f);
    };
  }, []), a.useEffect(() => {
    const f = V.current;
    if (!f) return;
    const h = (y) => {
      (y.classList.contains("md-note-cover-placeholder--ready") || y.classList.contains("md-note-cover-placeholder--empty") || y.classList.contains("md-note-cover-placeholder--pending")) && ct(true);
    }, x = (y) => {
      var _a3, _b2, _c2, _d2, _e2, _f;
      const M = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      if (M && f.contains(M)) {
        y.preventDefault(), y.stopPropagation(), h(M);
        return;
      }
      const j = (_d2 = (_c2 = y.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "[data-chat-saved-note]");
      if (j && f.contains(j)) {
        y.preventDefault(), y.stopPropagation(), v(va({ id: j.getAttribute("data-chat-id") || "", href: j.getAttribute("data-chat-href") || j.getAttribute("href") || "" }));
        return;
      }
      const D = (_f = (_e2 = y.target) == null ? void 0 : _e2.closest) == null ? void 0 : _f.call(_e2, "a[href]");
      if (!D || !f.contains(D) || y.metaKey || y.ctrlKey || y.shiftKey || y.altKey || typeof y.button == "number" && y.button !== 0 || D.hasAttribute("data-md-footnote-to")) return;
      const B = D.getAttribute("href") || "", X = ka(B, { currentViewPath: (i == null ? void 0 : i.type) ? i.id : null });
      if (X.kind !== "app") return;
      if (y.preventDefault(), y.stopPropagation(), X.viewPath && typeof L == "function") {
        L(X.viewPath);
        return;
      }
      const ce = X.search || "", te = X.hash || "";
      v(`${X.pathname || "/"}${ce}${te}`);
    }, w = (y) => {
      var _a3, _b2;
      if (y.key !== "Enter" && y.key !== " ") return;
      const M = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      !M || !f.contains(M) || (y.preventDefault(), y.stopPropagation(), h(M));
    };
    return f.addEventListener("click", x), f.addEventListener("keydown", w), () => {
      f.removeEventListener("click", x), f.removeEventListener("keydown", w);
    };
  }, [v, i == null ? void 0 : i.id, i == null ? void 0 : i.type, L]);
  const Vt = a.useCallback(({ width: f, height: h }) => {
    const x = W;
    if (!(x == null ? void 0 : x.key) || typeof q != "function") return;
    const w = x.kind === "wiki" ? Cn(e, { path: x.key, occurrence: x.occurrence ?? 0, width: f, height: h }) : En(e, { src: x.key, occurrence: x.occurrence ?? 0, width: f, height: h });
    w.updated && w.markdown !== e && q(w.markdown);
  }, [W, q, e]), ze = a.useCallback(async ({ file: f }) => {
    var _a3;
    const h = W;
    if (!(h == null ? void 0 : h.key) || typeof u != "function") throw new Error("Upload handler not available.");
    const w = (_a3 = await u([f])) == null ? void 0 : _a3[0];
    if (!w) throw new Error("Upload succeeded but no path was returned.");
    if (typeof q != "function") return;
    const y = h.kind === "wiki" ? oa(e, { path: h.key, occurrence: h.occurrence ?? 0, nextPath: w }) : yr(e, { src: h.key, occurrence: h.occurrence ?? 0, nextPath: w });
    y.updated && y.markdown !== e && q(y.markdown);
  }, [q, u, e, W]), pn = a.useCallback(async ({ width: f, height: h }) => {
    var _a3;
    const x = W;
    if (!(x == null ? void 0 : x.key) || x.kind !== "markdown") throw new Error("Cannot convert: not a markdown image.");
    if (typeof q != "function") throw new Error("Cannot apply change.");
    const w = await sa({ markdownSrc: x.key, displaySrc: x.imageSrc, currentNotePath: (i == null ? void 0 : i.id) ?? null });
    let y = "";
    if (w.mode === "path") y = w.path;
    else {
      if (typeof u != "function") throw new Error("Upload handler not available.");
      if (y = ((_a3 = await u([w.file])) == null ? void 0 : _a3[0]) || "", !y) throw new Error("Upload succeeded but no path was returned.");
    }
    const M = yr(e, { src: x.key, occurrence: x.occurrence ?? 0, nextPath: y, width: f, height: h });
    M.updated && M.markdown !== e && q(M.markdown);
  }, [i == null ? void 0 : i.id, q, u, e, W]), hn = a.useCallback(async ({ width: f, height: h }) => {
    const x = W;
    if (!(x == null ? void 0 : x.key) || !(x == null ? void 0 : x.kind)) throw new Error("Cannot convert: image target is missing.");
    if (typeof q != "function") throw new Error("Cannot apply change.");
    const w = typeof S == "function" ? String(await Promise.resolve(S()) || "").trim() : "";
    if (!w) throw new Error("ImgBB API key is missing. Please add it in settings.");
    const y = ia({ path: x.key, imageSrc: x.imageSrc });
    if (!y) throw new Error("Cannot determine image source URL for upload.");
    const j = (await aa({ apiKey: w, image: y, name: la(x.key) ? "image" : void 0 })).url, D = x.occurrence ?? 0;
    let B = e;
    const X = x.kind === "wiki" ? Cn(B, { path: x.key, occurrence: D, width: f, height: h }) : En(B, { src: x.key, occurrence: D, width: f, height: h });
    X.updated && (B = X.markdown);
    const ce = await ca(B, { kind: x.kind === "wiki" ? "wiki" : "markdown", key: x.key, occurrence: D }, j);
    if (!ce.updated && B === e) throw new Error("ImgBB upload succeeded but markdown could not be updated.");
    q(ce.markdown);
  }, [S, q, e, W]);
  a.useEffect(() => {
    if (typeof F == "function") return F(async () => {
      if (s) throw new Error("Cannot convert images in preview-only mode.");
      if (typeof q != "function") throw new Error("Cannot apply change.");
      if (!ua(e)) return { markdown: e, converted: 0, failed: [] };
      const f = await da(e, { currentNotePath: (i == null ? void 0 : i.id) ?? null, uploadFiles: async (h) => {
        if (typeof u != "function") throw new Error("Upload handler not available.");
        return u(h);
      } });
      return f.markdown !== e && q(f.markdown), f;
    }), () => F(null);
  }, [i == null ? void 0 : i.id, q, F, u, s, e]);
  const Te = a.useCallback((f) => {
    const h = V.current;
    if (!h || !(f == null ? void 0 : f.kind) || !(f == null ? void 0 : f.key)) return null;
    const x = f.kind === "wiki" ? "img[data-wiki-path]" : "img[data-md-src]";
    return [...h.querySelectorAll(x)].filter((M) => (f.kind === "wiki" ? M.getAttribute("data-wiki-path") : M.getAttribute("data-md-src")) === f.key)[f.occurrence ?? 0] ?? null;
  }, []), mt = a.useCallback(({ kind: f, key: h, occurrence: x, widthPx: w, heightPx: y }) => {
    if (!h || typeof q != "function") return false;
    const M = Number.isFinite(w) ? `${Math.round(w)}px` : null, j = Number.isFinite(y) ? `${Math.round(y)}px` : null, D = f === "wiki" ? Cn(e, { path: h, occurrence: x, width: M, height: j }) : En(e, { src: h, occurrence: x, width: M, height: j });
    return D.updated && D.markdown !== e ? (q(D.markdown), true) : false;
  }, [q, e]), Wt = a.useCallback(() => {
    const f = W;
    if (!(f == null ? void 0 : f.kind) || !(f == null ? void 0 : f.key)) return;
    const h = Te(f);
    if (!h) return;
    const x = h.getBoundingClientRect(), w = Math.max(24, Math.round(x.width)), y = Math.max(24, Math.round(x.height)), M = { kind: f.kind, key: f.key, occurrence: f.occurrence ?? 0, widthPx: w, heightPx: y, originalWidthPx: w, originalHeightPx: y };
    h.style.width = `${w}px`, h.style.height = `${y}px`, le.current = M, Qe(M), Ae(false);
  }, [Te, W]);
  a.useEffect(() => {
    if (!ge) {
      Ct(null);
      return;
    }
    const f = Te(ge);
    if (!f) {
      Qe(null), Ct(null);
      return;
    }
    let h = 0;
    const x = () => {
      const w = f.getBoundingClientRect();
      Ct({ left: w.left, top: w.top, width: w.width, height: w.height }), h = requestAnimationFrame(x);
    };
    return h = requestAnimationFrame(x), () => cancelAnimationFrame(h);
  }, [ge, Te]), a.useEffect(() => {
    if (!ge) return;
    const f = Te(ge);
    if (!f) return;
    const h = (y) => {
      var _a3, _b2;
      const M = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]");
      if (!M) return;
      y.preventDefault();
      const j = M.getAttribute("data-transform-handle");
      if (!j) return;
      const D = y.pointerType === "touch", B = le.current || ge, X = y.clientX, ce = y.clientY, te = B.heightPx > 0 ? B.widthPx / B.heightPx : 1, d = (g) => {
        const k = g.clientX - X, C = g.clientY - ce;
        let A = B.widthPx, I = B.heightPx;
        if (j.includes("e") && (A = B.widthPx + k), j.includes("w") && (A = B.widthPx - k), j.includes("s") && (I = B.heightPx + C), j.includes("n") && (I = B.heightPx - C), A = Math.max(24, A), I = Math.max(24, I), D || g.shiftKey) {
          const _ = Math.abs((A - B.widthPx) / Math.max(1, B.widthPx)), we = Math.abs((I - B.heightPx) / Math.max(1, B.heightPx));
          _ >= we ? I = Math.max(24, A / Math.max(1e-4, te)) : A = Math.max(24, I * te);
        }
        A = Math.max(24, Math.round(A)), I = Math.max(24, Math.round(I)), f.style.width = `${A}px`, f.style.height = `${I}px`;
        const Se = { ...le.current || B, widthPx: A, heightPx: I };
        le.current = Se, Qe(Se);
      }, c = () => {
        document.removeEventListener("pointermove", d, true), document.removeEventListener("pointerup", c, true);
      };
      document.addEventListener("pointermove", d, true), document.addEventListener("pointerup", c, true);
    }, x = (y) => {
      y.key === "Enter" && (y.preventDefault(), Ae(true));
    }, w = (y) => {
      var _a3, _b2, _c2, _d2;
      const M = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]"), j = (_d2 = (_c2 = y.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "img[data-wiki-path], img[data-md-src]");
      M || j === f || Ae(true);
    };
    return document.addEventListener("pointerdown", h, true), document.addEventListener("pointerdown", w, true), document.addEventListener("keydown", x, true), () => {
      document.removeEventListener("pointerdown", h, true), document.removeEventListener("pointerdown", w, true), document.removeEventListener("keydown", x, true);
    };
  }, [ge, Te]);
  const gn = a.useCallback(() => {
    const f = le.current || ge;
    f && (mt(f), Qe(null), le.current = null, Ae(false));
  }, [mt, ge]), xn = a.useCallback(() => {
    const f = le.current || ge;
    if (!f) return;
    const h = Te(f);
    h && (h.style.width = `${f.originalWidthPx}px`, h.style.height = `${f.originalHeightPx}px`), Qe(null), le.current = null, Ae(false);
  }, [Te, ge]), Ve = a.useCallback((f) => {
    var _a3, _b2, _c2, _d2;
    const h = String(f || "");
    if (!h) return;
    const x = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current;
    if (typeof (x == null ? void 0 : x.insert) == "function") {
      x.insert(() => ({ targetValue: h, select: false, deviationStart: 0, deviationEnd: 0 })), (_b2 = x.focus) == null ? void 0 : _b2.call(x);
      return;
    }
    const w = (_c2 = x == null ? void 0 : x.getEditorView) == null ? void 0 : _c2.call(x);
    w && (w.dispatch(w.state.replaceSelection(h)), (_d2 = w.focus) == null ? void 0 : _d2.call(w));
  }, []), tt = a.useCallback(async (f) => {
    if (!(f == null ? void 0 : f.length) || typeof u != "function" || p) return;
    const h = await u(f);
    (h == null ? void 0 : h.length) && Ve(`${h.map((x) => `![[${x}]]`).join(`
`)}
`);
  }, [Ve, p, u]);
  a.useEffect(() => {
    Xe.current = tt;
  }, [tt]);
  const nt = a.useCallback(async (f) => {
    var _a3;
    if (!f || typeof u != "function") throw new Error("Upload handler not available.");
    const x = (_a3 = await u([f])) == null ? void 0 : _a3[0];
    if (!x) throw new Error("Upload succeeded but no path was returned.");
    Ve(`![[${x}]]
`), Ge(null);
  }, [Ve, u]), rt = a.useCallback(() => {
    var _a3, _b2, _c2;
    const h = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    let x = null;
    if (h) {
      const { from: w, to: y } = h.state.selection.main;
      w !== y && (x = { from: w, to: y, text: h.state.doc.sliceString(w, y) });
    }
    _e(x), ve(true);
  }, []);
  a.useEffect(() => {
    O.current = rt;
  }, [rt]);
  const qt = a.useMemo(() => [o.jsx(cc, { value: e, theme: r, currentFile: i, language: "ko-KR" }, "export-pdf"), o.jsx(uc, { editorRef: E }, "insert-pgbr"), o.jsx(dc, { onOpen: rt }, "heading-remap"), o.jsx(Zl, { active: !!(J == null ? void 0 : J.open), onToggle: () => {
    var _a3;
    (_a3 = J == null ? void 0 : J.toggleAssist) == null ? void 0 : _a3.call(J);
  } }, "llm-assist"), o.jsx(lc, { onOpen: () => {
    U(true);
  } }, "checklist-progress"), o.jsx(bc, { checked: ut, onChange: Et, theme: r }, "toc-title-wrap"), o.jsx(wc, { checked: Ke, onChange: dt, theme: r }, "base64-image-fold"), o.jsx(yc, { checked: Ht, onChange: Ot, theme: r }, "editor-autocomplete"), Re ? null : o.jsx(vc, { checked: ue, onChange: ft, theme: r }, "mirror-edit"), o.jsx(kc, { disabled: typeof u != "function", onRequestLink: () => $e(true), onRequestUpload: (f) => {
    tt(f);
  }, onRequestClip: (f) => Ge(f) }, "image-toolbar")], [e, r, i, ut, Et, Ke, dt, Ht, Ot, Re, ue, ft, u, tt, rt, J == null ? void 0 : J.open, J == null ? void 0 : J.toggleAssist]), St = a.useMemo(() => ["bold", "underline", "italic", "-", "strikeThrough", "sub", "sup", "quote", "unorderedList", "orderedList", "task", "-", "codeRow", "code", "link", 9, "table", "mermaid", "katex", 1, 2, 3, 4, "-", "revoke", "next", 0, "=", 6, 7, ...Re ? [] : [8], "pageFullscreen", "fullscreen", "previewOnly", "preview", "htmlPreview", ...ke ? [5] : [], "catalog"], [ke, Re]), bn = a.useMemo(() => {
    if (typeof u == "function") return async (f, h) => {
      if (p) return;
      const x = await u(f);
      (x == null ? void 0 : x.length) && h(x.map((w) => `![[${w}]]`));
    };
  }, [u, p]);
  return o.jsxs("div", { ref: V, className: `h-full w-full flex flex-col relative${ut ? " toc-titles-wrap" : ""}`, style: { "--md-catalog-width": `${Je}px`, ...zt }, children: [(et == null ? void 0 : et.webfontCss) ? o.jsx("style", { "data-s3haim-document-webfonts": "1", children: et.webfontCss }) : null, de && ko.createPortal(o.jsx(fa, { handleProps: Kt, isResizing: Bt, visibleOnHover: true, label: "TOC resize handle", style: { position: "fixed", top: de.top, left: de.left, height: de.height, bottom: "auto", zIndex: 10003 } }), document.body), p && o.jsxs("div", { className: "absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center gap-2 py-2 text-sm bg-blue-300/40 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 border-b border-blue-500/20", "aria-live": "polite", children: [o.jsx(Qa, { size: 16, className: "animate-spin shrink-0" }), o.jsxs("span", { children: ["Uploading image... ", Math.max(0, Math.min(100, Math.round(m))), "%"] }), typeof b == "function" && o.jsx("button", { type: "button", onClick: b, className: "ml-2 rounded-md border border-blue-600/50 bg-white/80 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-white dark:border-blue-300/40 dark:bg-blue-950/60 dark:text-blue-100 dark:hover:bg-blue-950", children: "Cancel" })] }), o.jsx(As, { ref: E, id: z, modelValue: e, onChange: q, mdHeadingId: H, className: "h-full! max-h-dvh", theme: r, language: "ko-KR", codeTheme: pa, customIcon: ma, previewOnly: s, noMermaid: true, autoDetectCode: true, scrollAuto: false, footers: ["markdownTotal"], toolbars: St, defToolbars: qt, onUploadImg: bn }, `footnotes-${pe}`), o.jsx(xl, { containerRef: V }), o.jsx(yl, { containerRef: V }), o.jsx(El, { isOpen: !!W, onClose: () => me(null), path: (W == null ? void 0 : W.key) ?? "", kind: (W == null ? void 0 : W.kind) ?? "wiki", initialWidth: (W == null ? void 0 : W.width) ?? "", initialHeight: (W == null ? void 0 : W.height) ?? "", imageSrc: (W == null ? void 0 : W.imageSrc) ?? "", onApply: Vt, onStartFreeTransform: Wt, onCrop: ze, onConvertToWiki: pn, onConvertToImgbb: hn }, W ? `${W.kind}|${W.key}|${W.width ?? ""}|${W.height ?? ""}|${W.occurrence ?? 0}` : "wiki-image-size-modal"), o.jsx(Cc, { isOpen: He, onClose: () => $e(false), onConfirm: ({ desc: f, url: h }) => {
    Ve(`![${f || ""}](${h})
`);
  } }), o.jsx(Ec, { isOpen: Me, onClose: () => fe(false), onConfirm: ({ line1: f, line2: h }) => {
    var _a3, _b2, _c2, _d2, _e2;
    const w = (_c2 = (_b2 = ((_a3 = E.current) == null ? void 0 : _a3.value) ?? E.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), y = (w == null ? void 0 : w.state.doc.toString()) ?? ee.current ?? "", { from: M, to: j } = Oe.current, D = ha(y, M, j, f, h);
    w && (w.dispatch({ changes: { from: 0, to: w.state.doc.length, insert: D.next }, selection: { anchor: D.caret }, scrollIntoView: true }), (_d2 = w.focus) == null ? void 0 : _d2.call(w)), (_e2 = Pe.current) == null ? void 0 : _e2.call(Pe, D.next);
  } }), o.jsx(Sc, { isOpen: !!Ye, file: Ye, onClose: () => Ge(null), onConfirm: nt }), o.jsx(vu, { isOpen: ae.isOpen, initialMeta: ((_a2 = ae.editState) == null ? void 0 : _a2.meta) ?? null, initialGrid: ((_b = ae.editState) == null ? void 0 : _b.grid) ?? { rows: [[""]], aligns: [null] }, onClose: ae.close, onSave: ae.apply }), o.jsx(Cu, { containerRef: V, getMarkdown: () => ee.current ?? "", setMarkdown: (f) => {
    typeof q == "function" ? q(f) : typeof t == "function" && t(f);
  }, onEditTable: (f, h) => Le.current(f, h), onEditFailed: () => {
    P({ title: "? ??", message: "? ?? ???? ?? ?? ?????. ??? ??? ??? ??? ???." });
  } }), o.jsx(vl, { containerRef: V, getMarkdown: () => ee.current ?? "", setMarkdown: (f) => {
    typeof q == "function" && q(f);
  }, enabled: !ae.isOpen }), ge && Ze && o.jsx("div", { className: "fixed z-70 pointer-events-none border-2 border-blue-500", style: { left: `${Ze.left}px`, top: `${Ze.top}px`, width: `${Ze.width}px`, height: `${Ze.height}px` }, children: ["nw", "ne", "sw", "se"].map((f) => o.jsx("button", { type: "button", "data-transform-handle": f, className: "absolute pointer-events-auto h-3 w-3 rounded-full bg-blue-600 border border-white", style: { left: f.includes("w") ? "-7px" : "auto", right: f.includes("e") ? "-7px" : "auto", top: f.includes("n") ? "-7px" : "auto", bottom: f.includes("s") ? "-7px" : "auto", cursor: f === "nw" || f === "se" ? "nwse-resize" : "nesw-resize" }, "aria-label": `transform-${f}` }, f)) }), ge && o.jsxs("button", { type: "button", onClick: () => Ae(true), className: "fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm", children: [o.jsx("span", { className: "block font-semibold mb-1", children: "Free transform guide" }), o.jsx("span", { className: "block", children: "- Shift + drag: keep aspect ratio / plain drag: ignore ratio" }), o.jsx("span", { className: "block", children: "- Touch drag: keeps aspect ratio" }), o.jsx("span", { className: "block", children: "- Click elsewhere (including this banner): confirm transform" })] }), o.jsx(rn, { isOpen: _t, title: "Cover export", message: "You need to open the Export PDF page to export the cover. Continue?", confirmLabel: "Continue", cancelLabel: "Cancel", onConfirm: () => {
    ct(false), oe({ openCoverEdit: true });
  }, onCancel: () => ct(false) }), o.jsx(rn, { isOpen: kt, title: "Save transform", message: "How would you like to handle the current transform?", confirmLabel: "Apply", cancelLabel: "Keep editing", discardLabel: "Reset transform", onConfirm: gn, onCancel: () => Ae(false), onDiscard: xn }), o.jsx(xc, { isOpen: je, markdown: e, selectedMarkdown: (Ne == null ? void 0 : Ne.text) ?? "", onClose: () => {
    ve(false), _e(null);
  }, onApply: (f, h) => {
    if (h === "selection" && Ne) {
      const { from: x, to: w } = Ne, y = ee.current ?? e, M = `${y.slice(0, x)}${f}${y.slice(w)}`;
      M !== y && q(M);
    } else f !== e && q(f);
    ve(false), _e(null);
  } }), o.jsx(sc, { editorRef: E, onChange: q, open: $, onOpenChange: U })] });
}
export {
  vf as default
};
