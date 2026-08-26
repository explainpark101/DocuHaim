var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { j as o, r as l, u as vo, a as ko, c as Cs } from "./vendor-react-kfkzeLNk.js";
import { B as Es, D as Zn, S as Co, l as Lt, F as Eo, G as cr, W as Ss, H as So, J as It, M as st, O as No, j as er, V as jo, P as Mo, m as De, Q as Ns, R as js, T as Ms, U as Rs, X as Ts, Y as wn, Z as ur, $ as Ls, a0 as Ps, c as As, a1 as Ds, a2 as Ro, v as Is, a3 as $s, a4 as Fs, K as _s, a5 as Hs, a6 as Os, a7 as Bs, a8 as Ks, a9 as zs, aa as Vs, ab as Ws, ac as qs, ad as Us, ae as Xs, af as Ys, ag as Gs, ah as Qs, ai as Js, aj as Zs, ak as ea, al as ta, am as na, an as ra, ao as oa } from "./vendor-md-editor-DoTGZ8bs.js";
import { o as sa, dN as To, dO as dn, dP as Ie, dQ as Lo, aa as pt, dR as dr, dS as aa, ah as Po, ai as Ao, dT as fr, dU as ia, U as $t, ad as la, dV as mr, F as pr, dW as ca, dX as ua, dY as da, dZ as hr, d_ as Do, d$ as fa, e0 as ma, e1 as pa, e2 as ha, e3 as ga, e4 as Io, e5 as xa, a4 as sn, cC as $o, aA as ba, au as wa, e6 as ya, q as va, e7 as gr, e8 as ka, e9 as Ca, x as Ea, O as yn, ea as Sa, N as vn, eb as Na, y as kn, w as ja, cJ as Fo, dc as zn, aC as Ma, ay as an, ec as xr, aB as Ra, ed as Ta, ee as La, ef as Pa, dd as Aa, eg as Da, eh as Vn, a5 as Ia, d4 as tr, a0 as nr, ei as $a, ej as Fa, ek as _a, dg as Ha, cn as Oa, dI as Ba, d9 as _o, el as Tt, em as Ka, en as za, eo as Va, de as Wa, dv as qa, ep as Ho, eq as Ua, er as Xa, es as br, et as Ya, eu as Ga, E as Qa, ds as Ja, dH as Gt, dn as Za, ev as ei, ew as jt, ex as ti, ey as ni, ez as ri, bD as wr, al as Cn, dA as En, am as oi, dB as yr, dC as si, an as ai, ao as ii, a2 as li, ap as ci, aj as ui, ak as di, T as fi, M as mi, dK as pi, eA as hi, eB as gi, eC as Sn, eD as Nn, eE as vr, eF as kr, eG as jn, eH as Cr, eI as xi, eJ as Er, eK as Sr, dL as bi, ar as wi, dM as yi, eL as vi, eM as ki, eN as Ci, eO as Ei, eP as Nr, eQ as qe, eR as Si, eS as Mn, eT as Rn, bw as Ni } from "./index-fzELaopj.js";
import { S as ji, ax as Mi, ay as jr, az as Tn, aj as Ln, aA as Ri, O as Ti, aB as rr, aC as Li, J as Oo, aD as Pi, R as Ai, X as fn, v as Di, aE as Ii, aF as $i, i as mn, aG as Fi, aH as _i, aI as Bo, aJ as Hi, x as Oi, aK as ln, am as Bi, an as Ki, av as Mr, aL as Pn, aM as Rr, aN as zi, ag as Vi, j as Wi, aO as Tr, aP as qi, aQ as Ui, aR as Xi, aS as Yi, G as ht, z as Gi, L as Qi } from "./vendor-lucide-CSj-QTDy.js";
import { d as Ko, r as An, s as Dn, B as Ji, E as Zi, G as el, H as tl, I as nl, J as rl, K as ol, M as sl, N as al, Q as il, S as or, b as sr, e as Wn, T as qn, f as Un, g as Xn, A as Yn, l as ll, F as Ue, L as rt, m as Qt, V as cl, W as ul, X as dl, U as fl, _ as Lr, $ as ml, a0 as pl, a1 as hl, a2 as gl, a3 as Pr } from "./vendor-radix-CfNC5VTn.js";
import { M as xl } from "./MdEditorToolbarTooltips-CcE6Uj1N.js";
import { a as bl, h as wl, P as yl, H as vl } from "./previewFootnoteScroll-DUtt1tAh.js";
import { N as kl, u as Cl, W as El } from "./useTocTitleWrap-KXvSYMor.js";
import { H as In, T as Sl } from "./TableStyleTemplateEditor-DryKYQMe.js";
import { a as pn } from "./vendor-motion-9P87yVtW.js";
import { c as Nl } from "./clipboardImageFiles-Z5kExWaF.js";
import { u as jl } from "./useWikiImageHydration-DSGw4sJQ.js";
import "./vendor-aws-Dvf7OCCI.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-google-genai-BXoTgYIl.js";
import "./vendor-image-crop-BfNSF_Kw.js";
import "./storageImageHydration-C92fQ93M.js";
import "./index-DKf8xmDw.js";
function zo(e, t, n) {
  const r = sa(e);
  if (!r.length) return null;
  const a = [...n.querySelectorAll("table")], s = a.indexOf(t);
  let c = s >= 0 ? r[s] : void 0;
  if (!c) {
    const p = a.filter((m) => m.getAttribute("data-haim-table") === "1").indexOf(t);
    p >= 0 && (c = r.filter((x) => x.meta != null)[p]);
  }
  return !c && r.length === 1 && (c = r[0]), c ?? null;
}
function Ml(e, t) {
  const n = {};
  for (const [r, a] of Object.entries(e)) {
    const s = dn(r);
    if (!s) continue;
    const c = s.r >= t ? s.r + 1 : s.r;
    n[Ie(c, s.c)] = a;
  }
  return n;
}
function Rl(e, t) {
  const n = {};
  for (const [r, a] of Object.entries(e)) {
    const s = dn(r);
    if (!s) continue;
    const c = s.c >= t ? s.c + 1 : s.c;
    n[Ie(s.r, c)] = a;
  }
  return n;
}
function Tl(e, t) {
  const n = {};
  for (const [r, a] of Object.entries(e)) {
    const s = dn(r);
    if (!s || s.r === t) continue;
    const c = s.r > t ? s.r - 1 : s.r;
    n[Ie(c, s.c)] = a;
  }
  return n;
}
function Ll(e, t) {
  const n = {};
  for (const [r, a] of Object.entries(e)) {
    const s = dn(r);
    if (!s || s.c === t) continue;
    const c = s.c > t ? s.c - 1 : s.c;
    n[Ie(s.r, c)] = a;
  }
  return n;
}
function Pl(e, t) {
  return e.map((n) => n.r >= t ? { ...n, r: n.r + 1 } : n.r + n.rowspan > t ? { ...n, rowspan: n.rowspan + 1 } : n);
}
function Al(e, t) {
  return e.map((n) => n.c >= t ? { ...n, c: n.c + 1 } : n.c + n.colspan > t ? { ...n, colspan: n.colspan + 1 } : n);
}
function gt(e) {
  return e.rowspan < 1 || e.colspan < 1 || e.rowspan === 1 && e.colspan === 1 ? null : e;
}
function Dl(e, t) {
  const n = [];
  for (const r of e) {
    if (r.r > t) {
      const a = gt({ ...r, r: r.r - 1 });
      a && n.push(a);
      continue;
    }
    if (r.r === t) {
      if (r.rowspan <= 1) continue;
      const a = gt({ ...r, rowspan: r.rowspan - 1 });
      a && n.push(a);
      continue;
    }
    if (r.r < t && r.r + r.rowspan > t) {
      const a = gt({ ...r, rowspan: r.rowspan - 1 });
      a && n.push(a);
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
      const a = gt({ ...r, c: r.c - 1 });
      a && n.push(a);
      continue;
    }
    if (r.c === t) {
      if (r.colspan <= 1) continue;
      const a = gt({ ...r, colspan: r.colspan - 1 });
      a && n.push(a);
      continue;
    }
    if (r.c < t && r.c + r.colspan > t) {
      const a = gt({ ...r, colspan: r.colspan - 1 });
      a && n.push(a);
      continue;
    }
    n.push(r);
  }
  return n;
}
function $l(e, t, n) {
  const r = t.merges.filter((u) => u.r === n && u.rowspan > 1);
  if (r.length === 0) return { grid: e, meta: t };
  const a = e.rows.map((u) => [...u]), s = { ...t.cells }, c = n + 1;
  for (const u of r) {
    const p = a[n], m = a[c];
    if (!p || !m) continue;
    for (; m.length <= u.c; ) m.push("");
    for (; p.length <= u.c; ) p.push("");
    const x = p[u.c] ?? "";
    x && (m[u.c] = x, p[u.c] = "");
    const T = Ie(n, u.c), j = Ie(c, u.c), R = s[T];
    R && (s[j] = { ...R }, delete s[T]);
  }
  return { grid: { rows: a, aligns: [...e.aligns] }, meta: { ...t, cells: s } };
}
function Fl(e, t, n) {
  const r = t.merges.filter((c) => c.c === n && c.colspan > 1);
  if (r.length === 0) return { grid: e, meta: t };
  const a = e.rows.map((c) => [...c]), s = { ...t.cells };
  for (const c of r) {
    const u = a[c.r];
    if (!u) continue;
    for (; u.length <= c.c + 1; ) u.push("");
    const p = u[c.c] ?? "";
    p && (u[c.c + 1] = p, u[c.c] = "");
    const m = Ie(c.r, n), x = Ie(c.r, n + 1), T = s[m];
    T && (s[x] = { ...T }, delete s[m]);
  }
  return { grid: { rows: a, aligns: [...e.aligns] }, meta: { ...t, cells: s } };
}
function _l(e, t, n) {
  const r = Math.max(1, ...e.rows.map((x) => x.length), e.aligns.length, 1), a = e.rows.length, s = Math.max(0, Math.min(n, a)), c = Array.from({ length: r }, () => ""), u = [...e.rows.slice(0, s), c, ...e.rows.slice(s)];
  let p = t.headerRows, m = t.footerRows;
  return s < p ? p += 1 : m > 0 && s >= a - m && (m += 1), { grid: { rows: u, aligns: [...e.aligns] }, meta: (() => {
    var _a2;
    const x = { ...t, headerRows: p, footerRows: m, merges: Pl(t.merges, s), cells: Ml(t.cells, s) };
    if ((_a2 = t.rowHeights) == null ? void 0 : _a2.length) {
      const T = To(t.rowHeights, s);
      T && (x.rowHeights = T);
    }
    return x;
  })() };
}
function Hl(e, t, n) {
  const r = Math.max(1, ...e.rows.map((u) => u.length), e.aligns.length, 1), a = Math.max(0, Math.min(n, r)), s = e.rows.map((u) => {
    const p = [...u];
    for (; p.length < r; ) p.push("");
    return p.splice(a, 0, ""), p;
  });
  s.length === 0 && s.push(Array.from({ length: r + 1 }, () => ""));
  const c = [...e.aligns];
  for (; c.length < r; ) c.push(null);
  return c.splice(a, 0, null), { grid: { rows: s, aligns: c }, meta: (() => {
    var _a2;
    const u = { ...t, merges: Al(t.merges, a), cells: Rl(t.cells, a) };
    if ((_a2 = t.colWidths) == null ? void 0 : _a2.length) {
      const p = To(t.colWidths, a);
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
  const a = $l(e, t, n), s = [...a.grid.rows.slice(0, n), ...a.grid.rows.slice(n + 1)];
  let c = a.meta.headerRows, u = a.meta.footerRows;
  n < c ? c = Math.max(0, c - 1) : u > 0 && n >= r - u && (u = Math.max(0, u - 1));
  const p = s.length;
  c + u > p && (u = Math.max(0, p - c));
  const m = { ...a.meta, headerRows: c, footerRows: u, merges: Dl(a.meta.merges, n), cells: Tl(a.meta.cells, n) };
  if ((_a2 = a.meta.rowHeights) == null ? void 0 : _a2.length) {
    const x = Lo(a.meta.rowHeights, n);
    x ? m.rowHeights = x : delete m.rowHeights;
  }
  return { grid: { rows: s, aligns: [...a.grid.aligns] }, meta: m };
}
function Bl(e, t, n) {
  var _a2;
  const r = Math.max(1, ...e.rows.map((p) => p.length), e.aligns.length, 1);
  if (r <= 1) return { grid: e, meta: t };
  if (n < 0 || n >= r) return { grid: e, meta: t };
  const a = Fl(e, t, n), s = a.grid.rows.map((p) => {
    const m = [...p];
    for (; m.length < r; ) m.push("");
    return m.splice(n, 1), m;
  }), c = [...a.grid.aligns];
  for (; c.length < r; ) c.push(null);
  c.splice(n, 1);
  const u = { ...a.meta, merges: Il(a.meta.merges, n), cells: Ll(a.meta.cells, n) };
  if ((_a2 = a.meta.colWidths) == null ? void 0 : _a2.length) {
    const p = Lo(a.meta.colWidths, n);
    p ? u.colWidths = p : delete u.colWidths;
  }
  return { grid: { rows: s, aligns: c }, meta: u };
}
function Kl(e, t, n) {
  const r = [...new Set(n.filter((s) => Number.isInteger(s) && s >= 0))].sort((s, c) => c - s);
  let a = { grid: e, meta: t };
  for (const s of r) {
    if (a.grid.rows.length <= 1) break;
    a = Ol(a.grid, a.meta, s);
  }
  return a;
}
function zl(e, t, n) {
  const r = [...new Set(n.filter((s) => Number.isInteger(s) && s >= 0))].sort((s, c) => c - s);
  let a = { grid: e, meta: t };
  for (const s of r) {
    if (Math.max(1, ...a.grid.rows.map((u) => u.length), a.grid.aligns.length, 1) <= 1) break;
    a = Bl(a.grid, a.meta, s);
  }
  return a;
}
function Vl(e) {
  return String(e || "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96) || "doc";
}
function Wl(e) {
  return `md-ed-${Vl(e)}`;
}
function ql(e) {
  const t = `${e}-h`;
  return (n, r, a) => {
    const s = Number.isInteger(a) ? a : 0, c = typeof n == "object" && n !== null ? Number(n.index) : NaN, u = Number.isInteger(c) ? c : s;
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
    let a = false, s = e;
    for (; s && !a; ) {
      if (s instanceof HTMLElement && (s.classList.contains(Dr) || s.hasAttribute("hidden"))) {
        let u = s.previousElementSibling;
        for (; u; ) {
          if (u instanceof HTMLElement && u.classList.contains(Ul)) {
            const p = u.querySelector(":scope > .md-preview-heading-fold-chevron");
            p instanceof HTMLButtonElement && (p.click(), a = true);
            break;
          }
          u = u.previousElementSibling;
        }
      }
      s = s.parentElement;
    }
    if (!a) break;
  }
}
function Ql(e, t) {
  const n = (r) => {
    var _a2;
    if (r.button !== 0) return;
    const a = r.target;
    if (!(a instanceof Element)) return;
    const s = a.closest(Ar);
    if (!(s instanceof HTMLElement) || !e.contains(s)) return;
    const u = Array.from(e.querySelectorAll(Ar)).indexOf(s);
    if (u < 0) return;
    const p = t.mdHeadingId({ index: u + 1 }), m = t.getEditorRoot(), x = ((_a2 = m == null ? void 0 : m.querySelector) == null ? void 0 : _a2.call(m, `#${CSS.escape(p)}`)) ?? null;
    if (!x || m && !m.contains(x)) return;
    r.preventDefault(), r.stopPropagation(), typeof r.stopImmediatePropagation == "function" && r.stopImmediatePropagation(), Gl(x);
    const T = pt(x);
    if (!T) {
      x.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    const j = x.previousElementSibling ? 0 : Number.parseFloat(getComputedStyle(x).marginBlockStart || "0") || 0, R = Yl(x, T) - Xl - j;
    T.scrollTo({ top: Math.max(0, R), behavior: "smooth" });
  };
  return e.addEventListener("click", n, true), () => {
    e.removeEventListener("click", n, true);
  };
}
function Jl({ onToggle: e, active: t = false }) {
  return o.jsx("button", { type: "button", className: ["md-editor-toolbar-item", t ? "md-editor-toolbar-active !bg-violet-200 hover:!bg-violet-300 dark:!bg-violet-800/85 dark:hover:!bg-violet-700/90" : ""].filter(Boolean).join(" "), onClick: () => e == null ? void 0 : e(), title: t ? "AI \uB3C4\uC6B0\uBBF8 \uB2EB\uAE30" : "AI \uB3C4\uC6B0\uBBF8", "aria-label": t ? "AI \uB3C4\uC6B0\uBBF8 \uB2EB\uAE30" : "AI \uB3C4\uC6B0\uBBF8", "aria-pressed": t, children: o.jsx(ji, { className: "md-editor-icon", size: 16 }) });
}
function Zl(e) {
  const t = String(e ?? "").split(`
`), n = [];
  let r = { name: "\uC77C\uBC18 / \uBBF8\uBD84\uB958", tasks: [] }, a = 0, s = 0;
  t.forEach((u, p) => {
    const m = u.match(/^(#{1,6})\s+(.*)/);
    if (m) {
      (r.tasks.length > 0 || r.name !== "\uC77C\uBC18 / \uBBF8\uBD84\uB958") && n.push(r), r = { name: m[2].trim(), tasks: [] };
      return;
    }
    const x = u.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX])\]\s+(.*)/);
    if (x) {
      const T = Math.floor(x[1].length / 2), j = x[3].toLowerCase() === "x", R = x[4].trim();
      a += 1, j && (s += 1), r.tasks.push({ id: `line-${p}`, lineIndex: p, indent: T, completed: j, text: R, rawLine: u });
    }
  }), r.tasks.length > 0 && n.push(r);
  const c = a > 0 ? Math.round(s / a * 100) : 0;
  return { categories: n, totalTasks: a, completedTasks: s, pendingTasks: a - s, percentage: c };
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
  const [n, r] = l.useState(""), [a, s] = l.useState("all"), [c, u] = l.useState({}), [p, m] = l.useState("dashboard"), x = l.useMemo(() => Zl(e), [e]);
  l.useEffect(() => {
    const N = {};
    x.categories.forEach((L) => {
      N[L.name] = true;
    }), u(N);
  }, [x.categories.length]);
  const T = (N) => {
    typeof t == "function" && t(ec(e, N));
  }, j = (N) => {
    u((L) => ({ ...L, [N]: !L[N] }));
  }, R = (N) => {
    const L = N.text.toLowerCase().includes(n.toLowerCase()), B = a === "all" ? true : a === "completed" ? N.completed : !N.completed;
    return L && B;
  };
  return o.jsxs("div", { className: "space-y-3 text-xs text-slate-100", children: [o.jsxs("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: [o.jsxs("div", { className: "col-span-2 sm:col-span-1 relative overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3", children: [o.jsx("div", { className: "pointer-events-none absolute -right-2 -top-2 opacity-10", children: o.jsx(Mi, { className: "h-16 w-16 text-indigo-400" }) }), o.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-indigo-300", children: "\uC804\uCCB4 \uC9C4\uD589\uB960" }), o.jsx("div", { className: "my-1.5 flex items-baseline gap-1", children: o.jsxs("span", { className: "text-3xl font-extrabold text-white", children: [x.percentage, "%"] }) }), o.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-slate-800", children: o.jsx("div", { className: "h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out", style: { width: `${x.percentage}%` } }) })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-slate-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uCD1D \uD0DC\uC2A4\uD06C" }), o.jsx(jr, { className: "h-3.5 w-3.5 text-slate-500" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-slate-100", children: [x.totalTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-emerald-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC644\uB8CC\uB428" }), o.jsx(Tn, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-emerald-400", children: [x.completedTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] }), o.jsxs("div", { className: "flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex items-center justify-between text-amber-400", children: [o.jsx("span", { className: "text-[10px] font-medium", children: "\uC9C4\uD589 \uC608\uC815" }), o.jsx(Ln, { className: "h-3.5 w-3.5" })] }), o.jsxs("div", { className: "mt-1 text-xl font-bold text-amber-400", children: [x.pendingTasks, " ", o.jsx("span", { className: "text-[10px] font-normal text-slate-500", children: "\uAC1C" })] })] })] }), o.jsxs("div", { className: "space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3", children: [o.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2", children: [o.jsxs("div", { className: "flex rounded-lg border border-slate-800 bg-slate-900 p-0.5", children: [o.jsxs("button", { type: "button", onClick: () => m("dashboard"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${p === "dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(Ri, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCE74\uD14C\uACE0\uB9AC" })] }), o.jsxs("button", { type: "button", onClick: () => m("checklist"), className: `inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${p === "checklist" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`, children: [o.jsx(jr, { className: "h-3 w-3" }), o.jsx("span", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8" })] })] }), o.jsxs("div", { className: "flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5", children: [o.jsxs("div", { className: "relative min-w-[120px] flex-1", children: [o.jsx(Ti, { className: "absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" }), o.jsx("input", { type: "text", value: n, onChange: (N) => r(N.target.value), placeholder: "\uAC80\uC0C9...", className: "w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none" })] }), o.jsxs("select", { value: a, onChange: (N) => s(N.target.value), className: "rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none", children: [o.jsx("option", { value: "all", children: "\uC804\uCCB4" }), o.jsx("option", { value: "completed", children: "\uC644\uB8CC\uB9CC" }), o.jsx("option", { value: "pending", children: "\uBBF8\uC644\uB8CC\uB9CC" })] })] })] }), p === "dashboard" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5", children: x.categories.length === 0 ? o.jsxs("div", { className: "py-8 text-center text-slate-500", children: [o.jsx(rr, { className: "mx-auto mb-2 h-8 w-8 opacity-40" }), o.jsx("p", { children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD56D\uBAA9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), o.jsx("code", { className: "mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400", children: "- [ ] \uD560 \uC77C" })] }) : x.categories.map((N, L) => {
    const B = N.tasks.length, I = N.tasks.filter((P) => P.completed).length, Z = B > 0 ? Math.round(I / B * 100) : 0, Q = !!c[N.name], k = N.tasks.filter(R);
    return n && k.length === 0 ? null : o.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70", children: [o.jsxs("button", { type: "button", onClick: () => j(N.name), className: "flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40", children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [o.jsx("span", { className: "shrink-0 text-slate-500", children: Q ? o.jsx(Li, { className: "h-3.5 w-3.5" }) : o.jsx(Oo, { className: "h-3.5 w-3.5" }) }), o.jsx("span", { className: "truncate text-[12px] font-semibold text-slate-200", children: N.name })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [o.jsxs("span", { className: "text-[10px] font-medium text-slate-400", children: [o.jsx("strong", { className: "text-slate-200", children: I }), " / ", B] }), o.jsxs("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${Z === 100 ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border border-indigo-500/20 bg-indigo-500/10 text-indigo-400"}`, children: [Z, "%"] })] })] }), Q && o.jsx("div", { className: "space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2", children: k.length === 0 ? o.jsx("p", { className: "py-1 pl-5 text-[11px] text-slate-500", children: "\uC870\uAC74\uC5D0 \uC77C\uCE58\uD558\uB294 \uD0DC\uC2A4\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) : k.map((P) => o.jsxs("button", { type: "button", onClick: () => T(P.lineIndex), style: { paddingLeft: `${P.indent * 12 + 8}px` }, className: "flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50", children: [o.jsx("span", { className: "mt-0.5 shrink-0 text-slate-400", children: P.completed ? o.jsx(Tn, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(Ln, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${P.completed ? "text-slate-500 line-through" : "text-slate-300"}`, children: P.text })] }, P.id)) })] }, `${N.name}-${L}`);
  }) }), p === "checklist" && o.jsx("div", { className: "max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5", children: x.categories.map((N, L) => {
    const B = N.tasks.filter(R);
    return B.length === 0 ? null : o.jsxs("div", { className: "space-y-1", children: [o.jsxs("div", { className: "sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400", children: [N.name, " (", B.length, ")"] }), B.map((I) => o.jsxs("button", { type: "button", onClick: () => T(I.lineIndex), style: { paddingLeft: `${I.indent * 10 + 6}px` }, className: "flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60", children: [o.jsx("span", { className: "mt-0.5 shrink-0", children: I.completed ? o.jsx(Tn, { className: "h-3.5 w-3.5 text-emerald-400" }) : o.jsx(Ln, { className: "h-3.5 w-3.5 text-slate-600" }) }), o.jsx("span", { className: `leading-relaxed ${I.completed ? "text-slate-500 line-through" : "text-slate-200"}`, children: I.text })] }, I.id))] }, `${N.name}-list-${L}`);
  }) })] })] });
}
const Vo = "s3haim-checklist-progress-modal-position", $n = { leftVw: 58, topVh: 14 };
function nc() {
  try {
    const e = localStorage.getItem(Vo);
    if (!e) return { ...$n };
    const t = JSON.parse(e), n = Number(t == null ? void 0 : t.leftVw), r = Number(t == null ? void 0 : t.topVh);
    return !Number.isFinite(n) || !Number.isFinite(r) ? { ...$n } : { leftVw: Math.min(95, Math.max(0, n)), topVh: Math.min(95, Math.max(0, r)) };
  } catch {
    return { ...$n };
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
  const [a, s] = l.useState(() => nc()), [c, u] = l.useState(""), [p, m] = l.useState({ from: 0, to: 0 }), x = l.useRef({ active: false, startX: 0, startY: 0, startLeftVw: 0, startTopVh: 0 }), T = l.useCallback(() => {
    const { text: L, from: B, to: I } = dr(e);
    return u(L), m({ from: B, to: I }), L;
  }, [e]);
  l.useEffect(() => {
    if (n) {
      if (Ir()) {
        r == null ? void 0 : r(false);
        return;
      }
      T();
    }
  }, [n, T, r]), l.useEffect(() => {
    if (!n) return;
    const L = window.matchMedia(Wo), B = (I) => {
      I.matches && (r == null ? void 0 : r(false));
    };
    return L.addEventListener("change", B), () => L.removeEventListener("change", B);
  }, [n, r]);
  const j = l.useCallback((L) => {
    if (L.button !== 0) return;
    L.preventDefault();
    const B = L.clientX, I = L.clientY;
    x.current = { active: true, startX: B, startY: I, startLeftVw: a.leftVw, startTopVh: a.topVh };
    const Z = (k) => {
      if (!x.current.active) return;
      Math.hypot(k.clientX - B, k.clientY - I) <= oc;
      const P = window.innerWidth || 1, J = window.innerHeight || 1, K = (k.clientX - x.current.startX) / P * 100, _ = (k.clientY - x.current.startY) / J * 100;
      s({ leftVw: Math.min(92, Math.max(0, x.current.startLeftVw + K)), topVh: Math.min(90, Math.max(0, x.current.startTopVh + _)) });
    }, Q = () => {
      x.current.active && (x.current.active = false, document.removeEventListener("pointermove", Z), document.removeEventListener("pointerup", Q), s((k) => (rc(k), k)));
    };
    document.addEventListener("pointermove", Z), document.addEventListener("pointerup", Q);
  }, [a.leftVw, a.topVh]), R = l.useCallback((L) => {
    u(L);
    const { view: B } = dr(e), { from: I, to: Z } = p;
    aa(B, I, Z, L, t) && m({ from: I, to: I + L.length });
  }, [e, p, t]), N = () => {
    r == null ? void 0 : r(false);
  };
  return !n || Ir() ? null : o.jsxs("div", { className: "fixed z-[10050] w-[min(92vw,440px)] rounded-lg border border-indigo-400/40 bg-slate-950/95 shadow-2xl backdrop-blur-md", style: { left: `${a.leftVw}vw`, top: `${a.topVh}vh` }, role: "dialog", "aria-modal": "false", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: [o.jsxs("div", { className: "flex cursor-grab items-center justify-between gap-2 border-b border-indigo-500/30 bg-indigo-950/50 px-3 py-2 active:cursor-grabbing", onPointerDown: j, children: [o.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-sm font-semibold text-indigo-100", children: [o.jsx(Pi, { size: 16, className: "shrink-0 opacity-60", "aria-hidden": true }), o.jsx(rr, { size: 16, className: "shrink-0", "aria-hidden": true }), o.jsx("span", { className: "truncate", children: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960" })] }), o.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [o.jsxs("button", { type: "button", onPointerDown: (L) => L.stopPropagation(), onClick: T, className: "inline-flex items-center gap-1 rounded px-1.5 py-1 text-[11px] text-indigo-200 hover:bg-indigo-900/50", title: "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", "aria-label": "\uC120\uD0DD \uC601\uC5ED \uC0C8\uB85C\uACE0\uCE68", children: [o.jsx(Ai, { size: 14 }), o.jsx("span", { className: "hidden sm:inline", children: "\uC0C8\uB85C\uACE0\uCE68" })] }), o.jsx("button", { type: "button", onPointerDown: (L) => L.stopPropagation(), onClick: N, className: "rounded p-1 text-indigo-200 hover:bg-indigo-900/50", title: "\uB2EB\uAE30", "aria-label": "\uB2EB\uAE30", children: o.jsx(fn, { size: 15 }) })] })] }), o.jsx("div", { className: "max-h-[min(72vh,640px)] overflow-y-auto p-3", children: c.trim() ? o.jsx(tc, { markdown: c, onMarkdownChange: R }) : o.jsxs("p", { className: "rounded-lg border border-dashed border-slate-700 bg-slate-900/60 px-3 py-6 text-center text-xs text-slate-400", children: ["\uC5D0\uB514\uD130\uC5D0\uC11C \uCCB4\uD06C\uB9AC\uC2A4\uD2B8\uAC00 \uD3EC\uD568\uB41C \uD14D\uC2A4\uD2B8\uB97C \uC120\uD0DD\uD55C \uB4A4", o.jsx("br", {}), "\uD234\uBC14 \uBC84\uD2BC\uC744 \uB204\uB974\uAC70\uB098 \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694."] }) })] });
}
const ac = "(max-width: 768px)";
function ic() {
  return typeof window < "u" && window.matchMedia(ac).matches;
}
function lc({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item max-md:hidden", onClick: () => {
    ic() || (e == null ? void 0 : e());
  }, title: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", "aria-label": "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uC9C4\uD589\uB960", children: o.jsx(rr, { className: "md-editor-icon", size: 16 }) });
}
function cc({ value: e = "", theme: t = "light", currentFile: n = null, disabled: r, trigger: a }) {
  const s = vo(), c = l.useCallback(() => {
    r || (Po({ currentFile: n, editorContent: e }), s(Ao(n == null ? void 0 : n.id), { state: { value: e, theme: t, currentFile: n } }));
  }, [s, e, t, r, n]);
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: c, disabled: r, title: "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", "aria-label": "PDF\uB85C \uB0B4\uBCF4\uB0B4\uAE30", children: a ?? o.jsx(Di, { className: "md-editor-icon", size: 16 }) });
}
function uc({ editorRef: e }) {
  const t = l.useCallback(() => {
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
    const a = (_c2 = n.getEditorView) == null ? void 0 : _c2.call(n);
    a && (a.dispatch(a.state.replaceSelection(r)), (_d2 = a.focus) == null ? void 0 : _d2.call(a));
  }, [e]);
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", onClick: t, title: "Insert print page break (<pgbr/>)", "aria-label": "Insert print page break", children: o.jsx(Ii, { className: "md-editor-icon", size: 16 }) });
}
function dc({ onOpen: e }) {
  return o.jsx("button", { type: "button", className: "md-editor-toolbar-item", title: "\uCD5C\uB300 heading \uBCC0\uACBD", "aria-label": "\uCD5C\uB300 heading \uBCC0\uACBD", onClick: () => e(), children: o.jsx($i, { className: "md-editor-icon", size: 16 }) });
}
const fc = [{ value: "selection", title: "\uC120\uD0DD \uC601\uC5ED", description: "\uD604\uC7AC \uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uB9CC \uBCC0\uACBD" }, { value: "document", title: "\uC804\uCCB4 \uBB38\uC11C", description: "\uBB38\uC11C \uC804\uCCB4 heading\uC744 \uBCC0\uACBD" }], mc = [{ value: "flat", title: "1. \uD615\uC2DD", description: "\uCD5C\uB300 heading\uC744 \uD55C \uC790\uB9AC \uBC88\uD638\uB85C \uC2DC\uC791" }, { value: "nested", title: "2.1. \uD615\uC2DD", description: "heading \uC218\uC900\uB9CC\uD07C \uBC88\uD638\uB97C \uBD99\uC784" }], pc = [{ value: 1, title: "1\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 1. / 1.1. \u2026" }, { value: 2, title: "2\uBD80\uD130", description: "\uCD5C\uB300 heading\uC774 2. / 2.1. \u2026" }], hc = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), gc = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", $r = "z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong";
function xc({ isOpen: e, markdown: t, selectedMarkdown: n = "", onClose: r, onApply: a }) {
  const s = n.length > 0, [c, u] = l.useState("document"), [p, m] = l.useState(1), [x, T] = l.useState(false), [j, R] = l.useState("nested"), [N, L] = l.useState(1), B = c === "selection" ? n : t;
  l.useEffect(() => {
    if (!e) return;
    const k = s ? "selection" : "document";
    u(k), m(fr(k === "selection" ? n : t)), T(false), R("nested"), L(1);
  }, [e, t, n, s]), l.useEffect(() => {
    if (!e) return;
    const k = (K) => {
      const _ = K;
      return (_ == null ? void 0 : _.closest) ? !!_.closest('.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]') : false;
    }, P = () => {
      const K = document.activeElement;
      K && k(K) && typeof K.blur == "function" && K.blur();
    };
    P();
    const J = (K) => {
      if (K.metaKey || K.ctrlKey || K.altKey) return;
      const _ = K.key;
      if (_ >= "1" && _ <= "9") {
        const C = Number(_);
        mr(C) && (K.preventDefault(), K.stopPropagation(), K.stopImmediatePropagation(), m(C));
        return;
      }
      K.key === "Escape" || K.key === "Enter" || k(K.target) && (K.preventDefault(), K.stopPropagation(), K.stopImmediatePropagation(), P());
    };
    return window.addEventListener("keydown", J, true), () => window.removeEventListener("keydown", J, true);
  }, [e]);
  const I = l.useMemo(() => ia(B, p, { maxLevel: hr, renumberOutline: x, outlineStyle: j, outlineStart: N }), [B, p, x, j, N]), Z = (k) => {
    if (k !== "selection" && k !== "document" || k === "selection" && !s) return;
    u(k), m(fr(k === "selection" ? n : t));
  }, Q = () => {
    if (!I.sourceMax) return;
    const k = da(B, p, { maxLevel: hr, renumberOutline: x, outlineStyle: j, outlineStart: N });
    k !== B && a(k, c), r();
  };
  return o.jsx($t, { isOpen: e, onClose: r, onConfirm: Q, contentClassName: "max-w-3xl", children: o.jsx(Ko, { delayDuration: 250, skipDelayDuration: 0, children: o.jsxs("div", { className: "flex min-h-0 flex-1 flex-col p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uCD5C\uB300 heading \uBCC0\uACBD" }), o.jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-odp-muted", children: ["\uAC10\uC9C0\uB41C \uCD5C\uB300 heading\uC744 \uC120\uD0DD\uD55C \uB2E8\uACC4\uB85C \uBC14\uAFB8\uACE0, \uD558\uC704 heading\uB3C4 \uAC19\uC740 \uAC04\uACA9\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.", " ", "\uC22B\uC790 \uD0A4 1\u20139\uB85C \uCD5C\uB300 heading\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC801\uC6A9 \uBC94\uC704" }), o.jsx(An, { className: "flex items-center gap-2", value: c, onValueChange: Z, "aria-label": "\uCD5C\uB300 heading \uC801\uC6A9 \uBC94\uC704", children: fc.map((k) => {
    const P = c === k.value, J = k.value === "selection" && !s;
    return o.jsx(Dn, { value: k.value, disabled: J, className: ["flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", "disabled:cursor-not-allowed disabled:opacity-40", P ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: P ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: k.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: k.value === "selection" && !s ? "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" : k.description })] }) }, k.value);
  }) })] }), o.jsxs("div", { className: "mt-4", children: [o.jsx("label", { htmlFor: "editor-heading-max", className: "mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading" }), o.jsxs(Ji, { value: String(p), onValueChange: (k) => {
    const P = Number(k);
    mr(P) && m(P);
  }, children: [o.jsxs(Zi, { id: "editor-heading-max", "aria-label": "\uCD5C\uB300 heading", className: "inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", children: [o.jsx(el, {}), o.jsx(tl, { className: "text-gray-500", children: o.jsx(Oo, { size: 14 }) })] }), o.jsx(nl, { children: o.jsx(rl, { className: "z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", position: "popper", sideOffset: 4, children: o.jsx(ol, { className: "p-1", children: la.map((k) => o.jsxs(sl, { value: String(k), className: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg", children: [o.jsx(al, { className: "absolute left-1.5 inline-flex items-center", children: o.jsx(mn, { size: 12 }) }), o.jsx(il, { children: `h${k}` })] }, k)) }) }) })] })] }), o.jsxs("div", { className: "mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft", children: [o.jsxs("div", { className: "flex items-center justify-between gap-3", children: [o.jsxs("div", { className: "min-w-0", children: [o.jsx("div", { className: "text-sm font-medium text-gray-800 dark:text-odp-fgStrong", children: "outline \uBC88\uD638 \uB9DE\uCD94\uAE30" }), o.jsx("p", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: "\uC81C\uBAA9 \uC55E\uC758 1. / 2.1. \uAC19\uC740 \uBC88\uD638\uB97C \uD604\uC7AC heading \uC218\uC900\uC5D0 \uB9DE\uAC8C \uB2E4\uC2DC \uBD99\uC785\uB2C8\uB2E4." })] }), o.jsx(or, { className: hc(x), checked: x, onCheckedChange: T, "aria-label": "outline \uBC88\uD638 \uB9DE\uCD94\uAE30", children: o.jsx(sr, { className: gc }) })] }), x ? o.jsxs("div", { className: "mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60", children: [o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD" }), o.jsx(An, { className: "flex items-center gap-2", value: j, onValueChange: (k) => {
    (k === "flat" || k === "nested") && R(k);
  }, "aria-label": "\uCD5C\uB300 heading \uBC88\uD638 \uD615\uC2DD", children: mc.map((k) => {
    const P = j === k.value;
    return o.jsx(Dn, { value: k.value, className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", P ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: P ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: k.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: k.description })] }) }, k.value);
  }) })] }), o.jsxs("div", { children: [o.jsx("div", { className: "mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted", children: "\uC2DC\uC791 \uBC88\uD638" }), o.jsx(An, { className: "flex items-center gap-2", value: String(N), onValueChange: (k) => {
    k === "1" && L(1), k === "2" && L(2);
  }, "aria-label": "\uCD5C\uB300 heading \uC2DC\uC791 \uBC88\uD638", children: pc.map((k) => {
    const P = N === k.value;
    return o.jsx(Dn, { value: String(k.value), className: ["flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200", "focus-visible:ring-2 focus-visible:ring-blue-500/40", P ? "scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30" : "scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400"].join(" "), children: o.jsxs("div", { className: P ? "" : "opacity-50", children: [o.jsx("div", { className: "font-medium text-sm text-gray-800 dark:text-odp-fgStrong", children: k.title }), o.jsx("div", { className: "mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted", children: k.description })] }) }, k.value);
  }) })] })] }) : null] }), o.jsx("div", { className: "mt-4 min-h-0", children: I.rows.length ? o.jsx("div", { className: "max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-odp-borderSoft", children: o.jsxs("table", { className: "w-full table-fixed border-collapse text-left text-sm", children: [o.jsx("thead", { className: "sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft", children: o.jsxs("tr", { className: "border-b border-gray-200 dark:border-odp-borderSoft", children: [o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874 \uC81C\uBAA9" }), o.jsx("th", { className: "px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD\uB420 \uC81C\uBAA9" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uAE30\uC874" }), o.jsx("th", { className: "w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted", children: "\uBCC0\uACBD" })] }) }), o.jsx("tbody", { children: I.rows.map((k, P) => o.jsxs("tr", { className: "border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60", children: [o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(Wn, { children: [o.jsx(qn, { asChild: true, children: o.jsx("span", { className: "block truncate", children: k.text || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(Un, { children: o.jsxs(Xn, { side: "top", sideOffset: 6, className: $r, children: [k.text || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(Yn, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsx("td", { className: "max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: o.jsxs(Wn, { children: [o.jsx(qn, { asChild: true, children: o.jsx("span", { className: "block truncate", children: k.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)" }) }), o.jsx(Un, { children: o.jsxs(Xn, { side: "top", sideOffset: 6, className: $r, children: [k.nextText || "(\uC81C\uBAA9 \uC5C6\uC74C)", o.jsx(Yn, { className: "fill-white dark:fill-odp-surface" })] }) })] }) }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted", children: ["h", k.from] }), o.jsxs("td", { className: "whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong", children: ["h", k.to] })] }, `${k.from}-${P}-${k.text}`)) })] }) }) : o.jsx("p", { className: "rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted", children: c === "selection" ? "\uC120\uD0DD \uC601\uC5ED\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." : "\uBB38\uC11C\uC5D0 heading\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) }), o.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [o.jsxs(pr, { type: "button", variant: "secondary", size: "md", onClick: r, children: [o.jsx(ca, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs(pr, { type: "button", variant: "primary", size: "md", onClick: Q, disabled: !I.sourceMax, children: [o.jsx(ua, { size: 16 }), "\uC801\uC6A9"] })] })] }) }) });
}
function hn({ checked: e = false, onChange: t, theme: n = "light", title: r, ariaLabel: a, icon: s }) {
  const c = n === "dark", u = a || r;
  return o.jsx("span", { className: "md-editor-toolbar-item inline-flex items-center !w-auto !min-w-0 px-1", title: r, children: o.jsxs("label", { className: "inline-flex shrink-0 cursor-pointer select-none items-center gap-1", onMouseDown: (p) => {
    p.preventDefault();
  }, children: [o.jsx(s, { className: `md-editor-icon shrink-0 ${c ? "text-odp-muted" : "text-gray-500"}`, size: 16, "aria-hidden": true }), o.jsx(or, { checked: e, onCheckedChange: (p) => t == null ? void 0 : t(!!p), "aria-label": u, className: ["relative h-4 w-7 rounded-full border-0 outline-none transition-colors", "focus-visible:ring-2 focus-visible:ring-blue-400", e ? "bg-blue-600 dark:bg-blue-500" : c ? "bg-odp-borderStrong" : "bg-gray-300"].join(" "), children: o.jsx(sr, { className: ["block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform", "data-[state=checked]:translate-x-3.5"].join(" ") }) })] }) });
}
function bc({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(hn, { checked: e, onChange: t, theme: n, icon: Fi, title: e ? "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8 \uCF1C\uC9D0" : "\uBAA9\uCC28 \uC81C\uBAA9 \uB9D0\uC904\uC784(...)", ariaLabel: "\uBAA9\uCC28 \uC81C\uBAA9 \uC904\uBC14\uAFC8" });
}
function wc({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(hn, { checked: e, onChange: t, theme: n, icon: _i, title: e ? "base64 \uC774\uBBF8\uC9C0 \uC811\uD798" : "base64 \uC774\uBBF8\uC9C0 \uD3BC\uCE68", ariaLabel: "base64 \uC774\uBBF8\uC9C0 \uC811\uAE30" });
}
function yc({ checked: e = true, onChange: t, theme: n = "light" }) {
  return o.jsx(hn, { checked: e, onChange: t, theme: n, icon: Bo, title: e ? "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uCF1C\uC9D0" : "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C \uAEBC\uC9D0", ariaLabel: "\uC790\uB3D9\uC644\uC131 \uCD94\uCC9C" });
}
function vc({ checked: e = false, onChange: t, theme: n = "light" }) {
  return o.jsx(hn, { checked: e, onChange: t, theme: n, icon: Hi, title: e ? "Mirror Edit on \u2014 dual caret + instant preview sync" : "Mirror Edit off", ariaLabel: "Mirror Edit" });
}
function kc({ onRequestLink: e, onRequestUpload: t, onRequestClip: n, disabled: r = false }) {
  const [a, s] = l.useState(false), c = l.useRef(null), u = l.useRef(null), p = l.useCallback(() => s(false), []);
  return o.jsxs(o.Fragment, { children: [o.jsx(Es, { title: "\uC774\uBBF8\uC9C0", visible: a, onChange: s, disabled: r, overlay: o.jsxs("ul", { className: "md-editor-menu", role: "menu", onClick: p, children: [o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => e(), onKeyDown: (m) => {
    (m.key === "Enter" || m.key === " ") && (m.preventDefault(), e());
  }, children: "\uB9C1\uD06C \uCD94\uAC00" }), o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => {
    var _a2;
    return (_a2 = c.current) == null ? void 0 : _a2.click();
  }, onKeyDown: (m) => {
    var _a2;
    (m.key === "Enter" || m.key === " ") && (m.preventDefault(), (_a2 = c.current) == null ? void 0 : _a2.click());
  }, children: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC" }), o.jsx("li", { className: "md-editor-menu-item md-editor-menu-item-image", role: "menuitem", tabIndex: 0, onClick: () => {
    var _a2;
    return (_a2 = u.current) == null ? void 0 : _a2.click();
  }, onKeyDown: (m) => {
    var _a2;
    (m.key === "Enter" || m.key === " ") && (m.preventDefault(), (_a2 = u.current) == null ? void 0 : _a2.click());
  }, children: "\uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC" })] }), children: o.jsx(Oi, { className: "md-editor-icon", size: 16, "aria-hidden": true }) }), o.jsx("input", { ref: c, type: "file", accept: "image/*", multiple: true, className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (m) => {
    const x = Array.from(m.target.files || []);
    m.target.value = "", x.length && t(x);
  } }), o.jsx("input", { ref: u, type: "file", accept: "image/*", className: "hidden", tabIndex: -1, "aria-hidden": true, onChange: (m) => {
    var _a2;
    const x = (_a2 = m.target.files) == null ? void 0 : _a2[0];
    m.target.value = "", x && n(x);
  } })] });
}
function Cc({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, a] = l.useState(""), [s, c] = l.useState(""), [u, p] = l.useState("");
  l.useEffect(() => {
    e && (a(""), c(""), p(""));
  }, [e]);
  const m = () => {
    const x = s.trim();
    if (!x) {
      p("\uC774\uBBF8\uC9C0 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ desc: r.trim(), url: x }), t();
  };
  return o.jsx($t, { isOpen: e, onClose: t, onConfirm: m, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C" }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC124\uBA85 (alt)" }), o.jsx("input", { type: "text", value: r, onChange: (x) => a(x.target.value), placeholder: "\uC120\uD0DD", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL" }), o.jsx("input", { type: "text", value: s, onChange: (x) => c(x.target.value), placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), u ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: u }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(fn, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: m, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(mn, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function Ec({ isOpen: e, onClose: t, onConfirm: n }) {
  const [r, a] = l.useState(""), [s, c] = l.useState(""), [u, p] = l.useState(""), m = l.useRef(null);
  l.useEffect(() => {
    if (!e) return;
    a(""), c(""), p("");
    const j = window.setTimeout(() => {
      var _a2;
      return (_a2 = m.current) == null ? void 0 : _a2.focus();
    }, 40);
    return () => window.clearTimeout(j);
  }, [e]);
  const x = () => {
    const j = r.trim(), R = s.trim();
    if (!j && !R) {
      p("\uAC01\uC8FC \uC81C\uBAA9 \uB610\uB294 URL\uC744 \uC785\uB825\uD558\uC138\uC694.");
      return;
    }
    n({ line1: j, line2: R }), t();
  }, T = (j) => {
    j.key === "Enter" && (!(j.metaKey || j.ctrlKey) || j.altKey || j.shiftKey || j.nativeEvent.isComposing || j.keyCode === 229 || (j.preventDefault(), j.stopPropagation(), x()));
  };
  return o.jsx($t, { isOpen: e, onClose: t, ignoreEnterInFields: true, children: o.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [o.jsx("h2", { className: "text-lg font-bold text-gray-800 dark:text-odp-fgStrong", children: "\uAC01\uC8FC \uC0BD\uC785" }), o.jsxs("p", { className: "text-xs leading-5 text-gray-500 dark:text-odp-muted", children: ["\uCCAB \uC904\uC740 \uC81C\uBAA9, \uB458\uC9F8 \uC904\uC740 URL\uC785\uB2C8\uB2E4. \uBCF8\uBB38 \uCEE4\uC11C\uC5D0", " ", o.jsx("code", { className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft", children: "[^N]" }), "\uC774 \uB4E4\uC5B4\uAC00\uACE0, \uBB38\uC11C \uD558\uB2E8 Sources\uC5D0 \uB450 \uC904\uC774 \uCD94\uAC00\uB429\uB2C8\uB2E4. Ctrl+Enter \uB610\uB294 \u2318+Enter\uB85C \uC0BD\uC785\uD569\uB2C8\uB2E4."] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "\uC81C\uBAA9 (1\uC904)" }), o.jsx("input", { ref: m, type: "text", value: r, onChange: (j) => {
    a(j.target.value), u && p("");
  }, onKeyDown: T, placeholder: "\uC608: docs.docker.com - Compose services", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), o.jsxs("label", { className: "block", children: [o.jsx("span", { className: "mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong", children: "URL (2\uC904)" }), o.jsx("input", { type: "text", value: s, onChange: (j) => {
    c(j.target.value), u && p("");
  }, onKeyDown: T, placeholder: "https://\u2026", className: "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-odp-borderStrong dark:bg-odp-bgSoft" })] }), u ? o.jsx("p", { className: "text-xs text-red-600 dark:text-red-300", children: u }) : null, o.jsxs("div", { className: "flex justify-end gap-2", children: [o.jsxs("button", { type: "button", onClick: t, className: "inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg", children: [o.jsx(fn, { size: 16 }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: x, className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700", children: [o.jsx(mn, { size: 16 }), "\uC0BD\uC785"] })] })] }) });
}
function Sc({ isOpen: e, file: t, onClose: n, onConfirm: r }) {
  const [a, s] = l.useState("");
  return l.useEffect(() => {
    if (!e || !t) {
      s("");
      return;
    }
    const c = URL.createObjectURL(t);
    return s(c), () => {
      URL.revokeObjectURL(c);
    };
  }, [e, t]), o.jsx($t, { isOpen: e && !!t, onClose: n, contentClassName: "max-w-2xl w-[min(96vw,42rem)] max-h-[90vh] h-[min(90vh,720px)]", resizeHeight: true, children: a ? o.jsx(kl, { imageSrc: a, ...(t == null ? void 0 : t.name) ? { fileName: t.name } : {}, onCancel: n, onConfirm: r }) : null });
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
  const [e, t] = l.useState(Gn), n = l.useCallback((r) => {
    t((a) => {
      const s = typeof r == "function" ? r(a) : !!r;
      return Nc(s), s;
    });
  }, []);
  return [e, n];
}
function Mc() {
  const [e, t] = l.useState(Do);
  l.useEffect(() => fa((r) => {
    t(r);
  }), []);
  const n = l.useCallback((r) => {
    t((a) => {
      const s = typeof r == "function" ? r(a) : !!r;
      return ma(s), s;
    });
  }, []);
  return [e, n];
}
function Rc() {
  const [e, t] = l.useState(pa);
  l.useEffect(() => ha((r) => {
    t(r);
  }), []);
  const n = l.useCallback((r) => {
    t((a) => {
      const s = typeof r == "function" ? r(a) : !!r;
      return ga(s), s;
    });
  }, []);
  return [e, n];
}
const Tc = 48, Fr = /data:image\/([a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi, Uo = Eo.define(), Xo = Eo.define(), Yo = new Zn();
function Lc(e) {
  const t = [];
  Fr.lastIndex = 0;
  let n;
  for (; (n = Fr.exec(e)) !== null; ) {
    const r = n[1] ?? "image", a = n[2] ?? "";
    if (a.length < Tc) continue;
    const s = n[0], c = s.length - a.length, u = n.index + c;
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
  for (let a = 1; a <= e.doc.lines; a += 1) {
    const s = e.doc.line(a);
    for (const c of Lc(s.text)) {
      const u = s.from + c.from, p = s.from + c.to;
      if (Dc(t, u, p)) {
        r.push({ from: u, to: p });
        continue;
      }
      n.push(cr.replace({ widget: new Ac(Pc(c.mime, p - u), u, p) }).range(u, p));
    }
  }
  return { deco: cr.set(n, true), expanded: r };
}
const Go = Co.define({ create(e) {
  return _r(e, []);
}, update(e, t) {
  let n = e.expanded;
  t.docChanged && n.length && (n = n.map(({ from: a, to: s }) => ({ from: t.changes.mapPos(a, 1), to: t.changes.mapPos(s, -1) })).filter(({ from: a, to: s }) => a < s));
  let r = n !== e.expanded;
  for (const a of t.effects) a.is(Uo) ? (n = [{ from: a.value.from, to: a.value.to }], r = true) : a.is(Xo) && n.length > 0 && (n = [], r = true);
  return t.docChanged || r ? _r(t.state, n) : e;
}, provide: (e) => Lt.decorations.from(e, (t) => t.deco) }), Ic = Lt.domEventHandlers({ mousedown(e, t) {
  const n = t.state.field(Go, false);
  if (!n || n.expanded.length === 0) return false;
  const r = e.target;
  if (!(r instanceof Node) || !t.dom.contains(r)) return false;
  const a = t.posAtDOM(r, 0);
  return a !== -1 && n.expanded.some(({ from: s, to: c }) => a >= s && a <= c) || t.dispatch({ effects: Xo.of(null) }), false;
} });
function Qo() {
  return [Go, Ic];
}
function $c(e) {
  return Yo.of(e ? Qo() : []);
}
function Fc(e, t) {
  if (e) try {
    e.dispatch({ effects: Yo.reconfigure(t ? Qo() : []) });
  } catch {
  }
}
const Jo = new Zn();
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
    const a = Io(n, r.from, r.to);
    a && t.push(a);
  } }), t;
}
function Zo(e, t, n) {
  return e.some((r) => r.from === t && r.to === n);
}
const es = Co.define({ create() {
  return [];
}, update(e, t) {
  let n = e;
  t.docChanged && n.length && (n = n.map(({ from: a, to: s }) => ({ from: t.changes.mapPos(a, 1), to: t.changes.mapPos(s, -1) })).filter(({ from: a, to: s }) => a < s));
  let r = n !== e;
  for (const a of t.effects) if (a.is(It)) Zo(n, a.value.from, a.value.to) || (n = [...n, a.value], r = true);
  else if (a.is(st)) {
    const s = n.filter((c) => c.from !== a.value.from || c.to !== a.value.to);
    s.length !== n.length && (n = s, r = true);
  }
  return r ? n : e;
} });
function Hr(e) {
  const t = e.state.field(es), n = [];
  for (const r of Hc(e.state)) Zo(t, r.from, r.to) || _c(e.state, r.from, r.to) || n.push(st.of(r));
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
  return er(e).iterate({ enter(a) {
    if (a.name !== "FencedCode" || e.doc.lineAt(a.from).from !== t) return;
    const c = Io(n, a.from, a.to);
    if (c) return r = c, false;
  } }), r;
});
function ts() {
  return [es, So(), Bc, Oc];
}
function Kc(e) {
  return Jo.of(e ? ts() : []);
}
function zc(e, t) {
  if (e) try {
    e.dispatch({ effects: Jo.reconfigure(t ? ts() : []) });
  } catch {
  }
}
const Vc = `<br/>
`;
function Wc(e) {
  if (!xa() || !(e == null ? void 0 : e.state)) return false;
  const t = e.state.selection.main, n = Vc;
  return e.dispatch({ changes: { from: t.from, to: t.to, insert: n }, selection: De.cursor(t.from + n.length), scrollIntoView: true }), true;
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
  const a = Math.max(0, Math.min(t, r.length - 1));
  if (r[a] === n) return { stack: r, index: a, changed: false };
  const s = r.slice(0, a + 1);
  s.push(n);
  const c = Uc(s);
  return { stack: c, index: c.length - 1, changed: true };
}
function Yc({ enabled: e, historyKey: t, meta: n, grid: r, applySnapshot: a }) {
  const s = l.useRef([]), c = l.useRef(0), u = l.useRef(false), p = l.useRef(false), m = l.useRef(null), x = l.useRef(null), T = l.useRef(a);
  T.current = a;
  const [j, R] = l.useState(0), N = l.useCallback(() => R((K) => K + 1), []), L = l.useCallback(() => {
    m.current && (clearTimeout(m.current), m.current = null);
  }, []), B = l.useCallback(() => Br({ meta: n, grid: r }), [r, n]), I = l.useCallback(() => {
    L();
    const K = x.current;
    if (K == null) return;
    x.current = null;
    const _ = Xc(s.current, c.current, K);
    _.changed && (s.current = _.stack, c.current = _.index, N());
  }, [N, L]);
  l.useEffect(() => {
    if (!e) {
      L(), x.current = null, s.current = [], c.current = 0, p.current = false, N();
      return;
    }
    if (t <= 0) return;
    L(), x.current = null;
    const K = Br({ meta: n, grid: r });
    s.current = [K], c.current = 0, p.current = true, N();
  }, [e, t, N, L]), l.useEffect(() => {
    if (!e || !p.current || u.current) return;
    const K = B();
    if (s.current[c.current] !== K) return x.current = K, L(), m.current = setTimeout(() => {
      m.current = null, I();
    }, qc), () => {
      L();
    };
  }, [L, B, e, I, r, n]);
  const Z = l.useCallback(() => {
    !e || !p.current || u.current || (x.current = B(), I());
  }, [B, e, I]), Q = l.useCallback(() => {
    if (I(), c.current <= 0) return false;
    c.current -= 1;
    const K = s.current[c.current], _ = K ? Kr(K) : null;
    return _ ? (u.current = true, T.current(_), N(), requestAnimationFrame(() => {
      u.current = false;
    }), true) : false;
  }, [N, I]), k = l.useCallback(() => {
    if (I(), c.current >= s.current.length - 1) return false;
    c.current += 1;
    const K = s.current[c.current], _ = K ? Kr(K) : null;
    return _ ? (u.current = true, T.current(_), N(), requestAnimationFrame(() => {
      u.current = false;
    }), true) : false;
  }, [N, I]), P = e && p.current && c.current > 0, J = e && p.current && c.current < s.current.length - 1;
  return { undo: Q, redo: k, canUndo: P, canRedo: J, recordNow: Z, flushPendingRecord: I };
}
const Gc = ["thead", "tbody", "tfoot"], Fn = 10, zr = 36, Vr = 44, xt = 4, Jt = 14, Qc = "h-3.5 w-3.5 shrink-0", ae = "h-3 w-3 shrink-0", _n = "__none__", Jc = (e) => ["relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400", e ? "border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500" : "border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong"].join(" "), Zc = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", Wr = 288, ns = 200, eu = 480, tu = 380, nu = 560, qr = 16, Mt = 6, ru = [{ value: "full", label: "\uD398\uC774\uC9C0 \uC804\uCCB4 (full)" }, { value: "fit", label: "\uB0B4\uC6A9\uB9CC\uD07C (fit)" }], ou = [{ value: "left", label: "\uC67C\uCABD" }, { value: "right", label: "\uC624\uB978\uCABD" }], su = "pointer-events-none z-100050 max-w-[240px] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong", au = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", Ur = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", rs = typeof navigator < "u" && (/Mac|iPhone|iPad|iPod/i.test(navigator.platform) || /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent ?? "")), at = rs ? "\u2318" : "Ctrl", iu = `${at}+E`, lu = `${at}+Shift+E`, cu = `${at}+Shift+>`, uu = `${at}+Shift+<`, Hn = `${at}+Z`, On = rs ? `${at}+Shift+Z` : `${at}+Y`, du = 14;
function fu(e, t, n = du) {
  const r = (e || "").trim(), a = /^(\d+(?:\.\d+)?)(px|%|em|rem|pt)?$/i.exec(r), s = ((a == null ? void 0 : a[2]) || "px").toLowerCase(), c = a ? Number(a[1]) : n, u = s === "em" || s === "rem" ? 0.1 : 1, p = s === "em" || s === "rem" ? 0.5 : s === "%" ? 50 : 8;
  let m = (Number.isFinite(c) ? c : n) + t * u;
  return m = Math.max(p, m), s === "em" || s === "rem" ? m = Math.round(m * 10) / 10 : m = Math.round(m), `${m}${s}`;
}
function ot({ icon: e, children: t }) {
  return o.jsxs("span", { className: "inline-flex items-center gap-1", children: [o.jsx("span", { className: "inline-flex shrink-0 text-gray-400 dark:text-odp-muted", "aria-hidden": true, children: e }), t] });
}
function mt(e) {
  return Math.min(eu, Math.max(ns, Math.round(e)));
}
function Xr({ onDelta: e, ariaLabel: t }) {
  const n = l.useRef(0);
  return o.jsx("div", { role: "separator", "aria-orientation": "vertical", "aria-label": t, className: "group relative hidden w-1.5 shrink-0 cursor-col-resize touch-none select-none landscape:flex", onPointerDown: (r) => {
    r.preventDefault(), r.stopPropagation(), r.currentTarget.setPointerCapture(r.pointerId), n.current = r.clientX;
  }, onPointerMove: (r) => {
    if (!r.currentTarget.hasPointerCapture(r.pointerId)) return;
    const a = r.clientX - n.current;
    n.current = r.clientX, a !== 0 && e(a);
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
function Gr(e, t, n, r, a, s) {
  const c = r.left - a.left, u = t - a.top, p = r.width, m = Math.min(Math.max(n - a.left, c), c + p);
  return { kind: "row", index: e, x: m, y: u, edge: { left: c, top: u - xt / 2, width: p, height: xt }, ghost: { left: c, top: u - zr / 2, width: p, height: zr }, label: mu(e, s) };
}
function Qr(e, t, n, r, a, s) {
  const c = r.top - a.top, u = t - a.left, p = r.height, m = Math.min(Math.max(n - a.top, c), c + p);
  return { kind: "col", index: e, x: u, y: m, edge: { left: u - xt / 2, top: c, width: xt, height: p }, ghost: { left: u - Vr / 2, top: c, width: Vr, height: p }, label: pu(e, s) };
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
  }, "data-haim-edge-add": "", className: "haim-table-insert-btn pointer-events-auto absolute z-30 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-400/80 bg-white text-blue-600 shadow-sm hover:bg-blue-50 dark:border-blue-400/70 dark:bg-odp-surface dark:text-blue-300 dark:hover:bg-blue-950/60", children: o.jsx(Gi, { className: "h-3 w-3", "aria-hidden": true }) }) }), o.jsx(Un, { children: o.jsxs(Xn, { className: su, side: "top", sideOffset: 8, children: [e, o.jsx(Yn, { className: "fill-white dark:fill-odp-surface" })] }) })] });
}
function gu({ insert: e, tip: t, allowResize: n, onDoubleClickInsert: r, onResizePointerDown: a }) {
  const s = e.kind === "row", c = s ? { left: e.edge.left, top: e.edge.top + xt / 2 - Jt / 2, width: e.edge.width, height: Jt } : { left: e.edge.left + xt / 2 - Jt / 2, top: e.edge.top, width: Jt, height: e.edge.height };
  return o.jsx("div", { role: "presentation", title: t, "data-haim-edge-hit": "", className: `pointer-events-auto absolute z-[25] ${n ? s ? "cursor-row-resize" : "cursor-col-resize" : "cursor-pointer"}`, style: { left: c.left, top: c.top, width: c.width, height: c.height }, onMouseDown: (u) => {
    u.preventDefault(), u.stopPropagation();
  }, onPointerDown: (u) => {
    if (u.preventDefault(), u.stopPropagation(), u.button !== 0 || u.detail >= 2 || !n) return;
    const p = u.clientX, m = u.clientY, x = u;
    let T = false;
    const j = () => {
      document.removeEventListener("pointermove", R, true), document.removeEventListener("pointerup", N, true), document.removeEventListener("pointercancel", N, true);
    }, R = (L) => {
      T || Math.abs(L.clientX - p) < 3 && Math.abs(L.clientY - m) < 3 || (T = true, j(), a(x));
    }, N = () => {
      j();
    };
    document.addEventListener("pointermove", R, true), document.addEventListener("pointerup", N, true), document.addEventListener("pointercancel", N, true);
  }, onDoubleClick: (u) => {
    u.preventDefault(), u.stopPropagation(), r();
  } });
}
function xu({ insert: e }) {
  const t = `${e.kind}-${e.index}`;
  return o.jsxs("div", { "data-haim-insert-preview": "", className: "contents", children: [o.jsx("div", { "aria-hidden": true, className: `pointer-events-none absolute z-10 rounded-sm border border-transparent bg-blue-400/[0.04] dark:bg-blue-400/[0.06] ${e.kind === "row" ? "haim-table-insert-ghost-row" : "haim-table-insert-ghost-col"}`, style: { left: e.ghost.left, top: e.ghost.top, width: e.ghost.width, height: e.ghost.height } }, `ghost-${t}`), o.jsx("div", { "aria-hidden": true, className: "haim-table-insert-glow pointer-events-none absolute z-[11] rounded-full", style: { left: e.edge.left, top: e.edge.top, width: e.edge.width, height: e.edge.height } }, `glow-${t}`)] });
}
function bu({ kind: e, indices: t, table: n, wrap: r, colCount: a }) {
  const [s, c] = l.useState([]);
  return l.useEffect(() => {
    if (!n || !r || !t.length) {
      c([]);
      return;
    }
    const u = () => {
      const p = r.getBoundingClientRect(), m = n.getBoundingClientRect(), x = [];
      if (e === "row") for (const T of t) {
        const j = n.rows[T];
        if (!j) continue;
        const R = j.getBoundingClientRect();
        x.push({ left: m.left - p.left, top: R.top - p.top, width: m.width, height: Math.max(1, R.height) });
      }
      else {
        const T = os(n, a);
        for (const j of t) {
          const R = T[j], N = T[j + 1];
          R == null || N == null || x.push({ left: R - p.left, top: m.top - p.top, width: Math.max(1, N - R), height: m.height });
        }
      }
      c(x);
    };
    return u(), window.addEventListener("resize", u), () => window.removeEventListener("resize", u);
  }, [a, t, e, n, r]), s.length ? o.jsx("div", { "data-haim-delete-preview": "", className: "pointer-events-none absolute inset-0 z-20", "aria-hidden": true, children: s.map((u, p) => o.jsx("div", { className: "absolute rounded-sm bg-red-500/25 ring-1 ring-inset ring-red-500/50 dark:bg-red-500/30 dark:ring-red-400/40", style: { left: u.left, top: u.top, width: u.width, height: u.height } }, `${e}-${t[p] ?? p}`)) }) : null;
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
  for (let c = 0; c < t; c += 1) {
    const u = e.querySelectorAll(`[data-edit-c="${c}"]`);
    let p = null;
    u.forEach((m) => {
      const x = m.getBoundingClientRect();
      (p == null || x.left < p) && (p = x.left);
    }), p != null ? r.push(p) : r.push(n.left + n.width * c / Math.max(t, 1));
  }
  let a = n.right;
  return e.querySelectorAll(`[data-edit-c="${t - 1}"]`).forEach((c) => {
    const u = c.getBoundingClientRect();
    u.right > a && (a = u.right);
  }), r.push(a), r;
}
function yu(e, t, n) {
  var _a2, _b;
  if (!n.length || typeof document > "u") return null;
  const a = (_b = (_a2 = document.elementFromPoint(e, t)) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "td[data-edit-r][data-edit-c]");
  if (!a) return null;
  const s = Number(a.getAttribute("data-edit-r")), c = Number(a.getAttribute("data-edit-c"));
  return !Number.isInteger(s) || !Number.isInteger(c) ? null : Ta(n, s, c);
}
function Jr(e, t, n) {
  return e === "col" ? n.colspan > 1 && n.c < t && t < n.c + n.colspan : n.rowspan > 1 && n.r < t && t < n.r + n.rowspan;
}
function Rt(e, t, n, r, a, s, c) {
  const u = e.getBoundingClientRect(), p = t.getBoundingClientRect(), m = Fn + 2;
  if (n < u.left - m || n > u.right + m || r < u.top - m || r > u.bottom + m) return null;
  const x = wu(e), T = os(e, s), j = yu(n, r, c);
  let R = null;
  for (let L = 0; L < x.length; L += 1) {
    if (j && Jr("row", L, j)) continue;
    const B = x[L], I = Math.abs(r - B);
    I <= Fn && n >= u.left - m && n <= u.right + m && (!R || I < R.dist) && (R = { index: L, dist: I, y: B });
  }
  let N = null;
  for (let L = 0; L < T.length; L += 1) {
    if (j && Jr("col", L, j)) continue;
    const B = T[L], I = Math.abs(n - B);
    I <= Fn && r >= u.top - m && r <= u.bottom + m && (!N || I < N.dist) && (N = { index: L, dist: I, x: B });
  }
  return R && N ? R.dist <= N.dist ? Gr(R.index, R.y, n, u, p, a) : Qr(N.index, N.x, r, u, p, s) : R ? Gr(R.index, R.y, n, u, p, a) : N ? Qr(N.index, N.x, r, u, p, s) : null;
}
function vu({ isOpen: e, initialMeta: t, initialGrid: n, onClose: r, onSave: a }) {
  var _a2, _b, _c2, _d2, _e2, _f;
  const [s, c] = l.useState(sn()), [u, p] = l.useState(n), [m, x] = l.useState(null), [T, j] = l.useState(false), [R, N] = l.useState("thead"), [L, B] = l.useState([]), [I, Z] = l.useState(false), [Q, k] = l.useState(null), [P, J] = l.useState(null), [K, _] = l.useState(false), [C, z] = l.useState(0), [Y, ne] = l.useState(null), [se, ee] = l.useState(null), we = l.useRef(null), [G, re] = l.useState(null), oe = G !== null, q = $o(), [ie, Xe] = l.useState(Wr), [Te, Ye] = l.useState(Wr), [je, ye] = l.useState(false), [Ee, Oe] = l.useState(false), [H, $] = l.useState(() => typeof window < "u" ? window.innerWidth : 1280), [X, W] = l.useState(() => typeof window < "u" ? window.matchMedia("(orientation: landscape)").matches : true), pe = l.useRef(null), he = l.useRef(null), ge = l.useRef(null), Be = l.useRef(null), $e = l.useRef(false), Me = l.useRef(null), me = l.useRef(null), Ke = l.useRef(false), Le = l.useRef(false), Ge = l.useRef({ x: 0, y: 0 });
  Be.current = P, $e.current = T, me.current = m, Ke.current = je, Le.current = oe, we.current = se;
  const Qe = l.useRef(t), xe = l.useRef(n);
  Qe.current = t, xe.current = n, l.useEffect(() => {
    if (!e) return;
    const i = Qe.current, d = xe.current;
    c(i ? { ...i } : sn()), p({ rows: d.rows.map((b) => [...b]), aligns: [...d.aligns] }), x(null), j(false), Me.current = null, J(null), ye(false), Oe(false), re(null), ee(null), z((b) => b + 1), ba().then((b) => B(b.templates)), wa().then((b) => ya(b));
  }, [e]);
  const Je = l.useCallback((i) => {
    c(i.meta), p({ rows: i.grid.rows.map((d) => [...d]), aligns: [...i.grid.aligns ?? []] }), x(null), j(false), Me.current = null, J(null);
  }, []), { undo: vt, redo: Pe, canUndo: Ze, canRedo: kt, recordNow: _t } = Yc({ enabled: e, historyKey: C, meta: s, grid: u, applySnapshot: Je }), lt = l.useRef(false);
  l.useEffect(() => {
    lt.current && !K && _t(), lt.current = K;
  }, [K, _t]), l.useEffect(() => {
    if (!e) return;
    const i = (d) => {
      if (!(d.metaKey || d.ctrlKey) || d.altKey) return;
      const E = d.key.toLowerCase(), v = E === "z" && !d.shiftKey, A = E === "y" || E === "z" && d.shiftKey;
      !v && !A || (d.preventDefault(), d.stopPropagation(), d.stopImmediatePropagation(), A ? Pe() : vt());
    };
    return window.addEventListener("keydown", i, true), () => window.removeEventListener("keydown", i, true);
  }, [e, Pe, vt]), l.useEffect(() => {
    if (!e || typeof window > "u") return;
    const i = window.matchMedia("(orientation: landscape)"), d = () => {
      $(window.innerWidth), W(i.matches);
    };
    return d(), window.addEventListener("resize", d), i.addEventListener("change", d), () => {
      window.removeEventListener("resize", d), i.removeEventListener("change", d);
    };
  }, [e]);
  const ve = l.useMemo(() => va(s.merges), [s.merges]), be = u.rows.length, fe = Math.max(1, ...u.rows.map((i) => i.length), u.aligns.length), ke = l.useMemo(() => {
    if (!m) return [];
    const i = [], d = Math.min(m.r0, m.r1), b = Math.min(m.c0, m.c1), E = Math.max(m.r0, m.r1), v = Math.max(m.c0, m.c1);
    for (let A = d; A <= E; A += 1) for (let V = b; V <= v; V += 1) ve.has(`${A},${V}`) || i.push({ r: A, c: V });
    return i;
  }, [m, ve]), le = ke[0] ?? null, ct = !!le, Ct = l.useRef(ie), Ve = l.useRef(Te);
  Ct.current = ie, Ve.current = Te;
  const ut = l.useMemo(() => {
    const i = H * 0.95;
    return Math.max(ns, i - qr - Mt - tu);
  }, [H]), Ht = l.useCallback((i) => {
    const d = Ct.current, b = Ve.current, E = d + b;
    let v = mt(d + i), A = mt(E - v);
    v = mt(E - A), A = mt(E - v), Xe(v), Ye(A);
  }, []), Ot = l.useCallback((i) => {
    Ye((d) => {
      const b = mt(d + i);
      if (ie + Mt + b <= ut) return b;
      const v = ut - ie - Mt;
      return mt(v);
    });
  }, [ut, ie]), gn = l.useMemo(() => {
    const i = H * 0.95;
    if (!X) return { width: i, maxWidth: "95dvw", height: "95dvh", maxHeight: "95dvh" };
    const d = ie + Mt + Te;
    return { width: Math.min(i, qr + d + Mt + nu), maxWidth: "95dvw", height: "95dvh", maxHeight: "95dvh" };
  }, [Te, X, ie, H]), dt = l.useMemo(() => le ? s.cells[Ie(le.r, le.c)] ?? {} : {}, [s.cells, le]), Re = l.useCallback((i) => {
    ke.length && c((d) => {
      const b = { ...d.cells };
      for (const { r: E, c: v } of ke) {
        const A = Ie(E, v);
        gr(i) ? delete b[A] : b[A] = i;
      }
      return { ...d, cells: b };
    });
  }, [ke]), ue = l.useCallback((i) => {
    p(i.grid), c(i.meta), x(null), j(false), Me.current = null, J(null);
  }, []), Ce = l.useRef(u), Fe = l.useRef(s);
  Ce.current = u, Fe.current = s;
  const Bt = l.useCallback((i) => {
    ue(_l(Ce.current, Fe.current, i));
  }, [ue]), Kt = l.useCallback((i) => {
    ue(Hl(Ce.current, Fe.current, i));
  }, [ue]), et = l.useCallback((i) => {
    const d = me.current;
    let b, E;
    if (d) b = Math.min(d.r0, d.r1), E = Math.max(d.r0, d.r1), i != null && (i < b || i > E) && (b = i, E = i);
    else if (i != null) b = i, E = i;
    else {
      const V = we.current;
      (V == null ? void 0 : V.kind) === "row" && V.indices.length && (ee(null), ne({ kind: "row", indices: [...V.indices] }));
      return;
    }
    const v = [];
    for (let V = b; V <= E; V += 1) v.push(V);
    const A = Ce.current.rows.length;
    A <= 1 || v.length === 0 || v.length >= A || (ee(null), ne({ kind: "row", indices: v }));
  }, []), zt = l.useCallback((i) => {
    const d = me.current;
    let b, E;
    if (d) b = Math.min(d.c0, d.c1), E = Math.max(d.c0, d.c1), i != null && (i < b || i > E) && (b = i, E = i);
    else if (i != null) b = i, E = i;
    else {
      const V = we.current;
      (V == null ? void 0 : V.kind) === "col" && V.indices.length && (ee(null), ne({ kind: "col", indices: [...V.indices] }));
      return;
    }
    const v = [];
    for (let V = b; V <= E; V += 1) v.push(V);
    const A = Math.max(1, ...Ce.current.rows.map((V) => V.length), Ce.current.aligns.length, 1);
    A <= 1 || v.length === 0 || v.length >= A || (ee(null), ne({ kind: "col", indices: v }));
  }, []), Vt = l.useCallback((i) => {
    const d = me.current;
    let b, E;
    d ? (b = Math.min(d.r0, d.r1), E = Math.max(d.r0, d.r1), (i < b || i > E) && (b = i, E = i)) : (b = i, E = i);
    const v = [];
    for (let V = b; V <= E; V += 1) v.push(V);
    const A = Ce.current.rows.length;
    if (A <= 1 || v.length === 0 || v.length >= A) {
      ee(null);
      return;
    }
    ee({ kind: "row", indices: v });
  }, []), Wt = l.useCallback((i) => {
    const d = me.current;
    let b, E;
    d ? (b = Math.min(d.c0, d.c1), E = Math.max(d.c0, d.c1), (i < b || i > E) && (b = i, E = i)) : (b = i, E = i);
    const v = [];
    for (let V = b; V <= E; V += 1) v.push(V);
    const A = Math.max(1, ...Ce.current.rows.map((V) => V.length), Ce.current.aligns.length, 1);
    if (A <= 1 || v.length === 0 || v.length >= A) {
      ee(null);
      return;
    }
    ee({ kind: "col", indices: v });
  }, []), We = l.useCallback(() => {
    ee(null);
  }, []), xn = l.useCallback(() => {
    Y && (Y.kind === "row" ? ue(Kl(Ce.current, Fe.current, Y.indices)) : ue(zl(Ce.current, Fe.current, Y.indices)), ne(null), ee(null));
  }, [ue, Y]), _e = !!(m && !(m.r0 === m.r1 && m.c0 === m.c1)), ft = l.useCallback(() => {
    !m || m.r0 === m.r1 && m.c0 === m.c1 || c((i) => ({ ...i, merges: ka(i.merges, m.r0, m.c0, m.r1, m.c1) }));
  }, [m]), Et = l.useCallback(() => {
    m && c((i) => ({ ...i, merges: Ca(i.merges, m.r0, m.c0, m.r1, m.c1) }));
  }, [m]), qt = l.useCallback((i) => {
    ke.length && c((d) => {
      var _a3;
      const b = { ...d.cells }, E = (_a3 = d.style) == null ? void 0 : _a3.fontSize;
      for (const { r: v, c: A } of ke) {
        const V = Ie(v, A), ce = b[V] ?? {};
        b[V] = { ...ce, fontSize: fu(ce.fontSize ?? E, i) };
      }
      return { ...d, cells: b };
    });
  }, [ke]);
  l.useEffect(() => {
    if (!e) return;
    const i = (d) => {
      if (!(!(d.metaKey || d.ctrlKey) || d.altKey)) {
        if (d.shiftKey) {
          const b = d.code === "Period" || d.key === ">" || d.key === ".", E = d.code === "Comma" || d.key === "<" || d.key === ",";
          if (b || E) {
            if (!ke.length) return;
            d.preventDefault(), d.stopPropagation(), qt(b ? 1 : -1);
            return;
          }
        }
        d.code !== "KeyE" && d.key.toLowerCase() !== "e" || (d.preventDefault(), d.stopPropagation(), d.shiftKey ? Et() : ft());
      }
    };
    return window.addEventListener("keydown", i, true), () => window.removeEventListener("keydown", i, true);
  }, [e, ft, qt, ke.length, Et]);
  const bn = l.useCallback((i) => {
    var _a3, _b2;
    if (Le.current) {
      J(null);
      return;
    }
    if (T || K) {
      T && J(null);
      return;
    }
    if ((_b2 = (_a3 = i.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-add], [data-haim-edge-hit]")) return;
    const d = ge.current, b = he.current;
    if (!d || !b) return;
    const E = Rt(d, b, i.clientX, i.clientY, be, fe, s.merges);
    J((v) => E ? v && v.kind === E.kind && v.index === E.index ? v.x === E.x && v.y === E.y ? v : { ...v, x: E.x, y: E.y } : E : null);
  }, [fe, K, s.merges, T, be]), tt = l.useCallback((i, d) => {
    var _a3, _b2;
    if (d.index === 0 || Le.current) return;
    i.preventDefault(), i.stopPropagation();
    const b = ge.current;
    if (!b) return;
    const E = d.index - 1;
    let v = 0, A = 0;
    if (d.kind === "col") {
      const F = (_a3 = b.querySelector(`[data-edit-c="${E}"]`)) == null ? void 0 : _a3.getBoundingClientRect();
      if (!F) return;
      v = F.left;
    } else {
      const F = (_b2 = b.rows[E]) == null ? void 0 : _b2.getBoundingClientRect();
      if (!F) return;
      A = F.top;
    }
    _(true), j(false), J(null);
    const V = (ze) => {
      let F = 24;
      d.kind === "col" ? F = ze.clientX - v : F = ze.clientY - A, F = Math.max(24, Math.round(F)), c((Ne) => d.kind === "col" ? { ...Ne, colWidths: xr(Ne.colWidths, E, F) } : { ...Ne, rowHeights: xr(Ne.rowHeights, E, F) });
    }, ce = () => {
      document.removeEventListener("pointermove", V, true), document.removeEventListener("pointerup", ce, true), document.removeEventListener("pointercancel", ce, true), _(false);
    };
    document.addEventListener("pointermove", V, true), document.addEventListener("pointerup", ce, true), document.addEventListener("pointercancel", ce, true);
  }, []), nt = l.useCallback((i, d, b) => {
    p((E) => {
      const v = Math.max(1, ...E.rows.map((ce) => ce.length), E.aligns.length), A = E.rows.map((ce) => [...ce]);
      for (; A.length <= i; ) A.push(Array(v).fill(""));
      const V = [...A[i] ?? Array(v).fill("")];
      for (; V.length < v; ) V.push("");
      return V[d] = b, A[i] = V, { ...E, rows: A };
    });
  }, []), Ut = l.useCallback((i, d) => {
    const b = ge.current;
    if (!b) return;
    const E = b.querySelector(`td[data-edit-r="${i}"][data-edit-c="${d}"] input`);
    E && (x({ r0: i, c0: d, r1: i, c1: d }), Me.current = { r: i, c: d }, j(false), J(null), requestAnimationFrame(() => {
      E.focus(), E.select();
    }));
  }, []), He = l.useCallback((i, d) => {
    x({ r0: i, c0: d, r1: i, c1: d }), Me.current = { r: i, c: d }, j(false), J(null);
  }, []), Xt = l.useCallback(() => {
    var _a3;
    x(null), j(false), Me.current = null;
    const i = document.activeElement;
    ((_a3 = i == null ? void 0 : i.closest) == null ? void 0 : _a3.call(i, "td[data-edit-r]")) && i.blur();
  }, []), Yt = l.useCallback((i, d) => {
    const b = Me.current;
    if (!b) {
      He(i, d);
      return;
    }
    x({ r0: b.r, c0: b.c, r1: i, c1: d }), j(false), J(null);
  }, [He]), St = l.useCallback((i, d) => {
    var _a3;
    x({ r0: i, c0: d, r1: i, c1: d }), Me.current = { r: i, c: d }, j(true), J(null);
    const b = document.activeElement;
    ((_a3 = b == null ? void 0 : b.closest) == null ? void 0 : _a3.call(b, "td[data-edit-r]")) && b.blur();
  }, []), f = l.useCallback((i, d) => {
    $e.current && x((b) => b && { ...b, r1: i, c1: d });
  }, []);
  l.useEffect(() => {
    if (!T) return;
    const i = () => j(false);
    return window.addEventListener("mouseup", i, true), window.addEventListener("pointerup", i, true), () => {
      window.removeEventListener("mouseup", i, true), window.removeEventListener("pointerup", i, true);
    };
  }, [T]), l.useEffect(() => {
    if (!e) return;
    const i = (v) => {
      var _a3, _b2, _c3;
      const A = v;
      if (!A) return false;
      const V = ((_b2 = (_a3 = A.tagName) == null ? void 0 : _a3.toLowerCase) == null ? void 0 : _b2.call(_a3)) ?? "";
      return V === "input" || V === "textarea" || V === "select" || A.isContentEditable ? true : !!((_c3 = A.closest) == null ? void 0 : _c3.call(A, 'input, textarea, select, [contenteditable="true"]'));
    }, d = (v) => {
      v.code !== "Space" && v.key !== " " || v.repeat || i(v.target) || me.current || (v.preventDefault(), ye(true));
    }, b = (v) => {
      v.code !== "Space" && v.key !== " " || ye(false);
    }, E = () => ye(false);
    return window.addEventListener("keydown", d, true), window.addEventListener("keyup", b, true), window.addEventListener("blur", E), () => {
      window.removeEventListener("keydown", d, true), window.removeEventListener("keyup", b, true), window.removeEventListener("blur", E), ye(false);
    };
  }, [e]), l.useEffect(() => {
    m && ye(false);
  }, [m]);
  const h = l.useCallback(() => {
    Oe(false);
  }, []), g = l.useCallback((i) => {
    const d = pe.current;
    if (!d) return;
    const b = i.button === 1, E = i.button === 0 && je && !me.current;
    if (b || E) {
      i.preventDefault(), i.stopPropagation(), J(null), Ge.current = { x: i.clientX, y: i.clientY }, Oe(true), d.setPointerCapture(i.pointerId);
      return;
    }
  }, [je]), w = l.useCallback((i) => {
    if (!Ee) return;
    const d = pe.current;
    if (!d) return;
    const b = i.clientX - Ge.current.x, E = i.clientY - Ge.current.y;
    Ge.current = { x: i.clientX, y: i.clientY }, d.scrollLeft -= b, d.scrollTop -= E;
  }, [Ee]), y = l.useCallback((i) => {
    if (!Ee) return;
    const d = pe.current;
    (d == null ? void 0 : d.hasPointerCapture(i.pointerId)) && d.releasePointerCapture(i.pointerId), h();
  }, [h, Ee]), M = l.useCallback((i) => {
    if (i.button !== 0 || je || Ee) return;
    const d = i.target;
    d && (d.closest("[data-haim-table-sidebars]") || d.closest("[data-haim-table-canvas] table, [data-haim-edge-hit], [data-haim-edge-add], [data-haim-insert-preview]") || me.current && Xt());
  }, [Xt, Ee, je]), S = l.useCallback((i, d, b, E) => {
    let v = i + b, A = d + E;
    for (; v >= 0 && v < be && A >= 0 && A < fe; ) {
      if (!ve.has(`${v},${A}`)) {
        Ut(v, A);
        return;
      }
      v += b, A += E;
    }
  }, [fe, ve, Ut, be]), D = l.useCallback((i, d, b) => {
    if (i.nativeEvent.isComposing) return;
    if (i.key === "Enter") {
      i.preventDefault(), i.stopPropagation(), i.shiftKey ? S(d, b, -1, 0) : S(d, b, 1, 0);
      return;
    }
    if (!i.altKey) return;
    let E = 0, v = 0;
    if (i.key === "ArrowUp") E = -1;
    else if (i.key === "ArrowDown") E = 1;
    else if (i.key === "ArrowLeft") v = -1;
    else if (i.key === "ArrowRight") v = 1;
    else return;
    i.preventDefault(), i.stopPropagation(), S(d, b, E, v);
  }, [S]), O = l.useMemo(() => {
    var _a3;
    return le ? ((_a3 = u.rows[le.r]) == null ? void 0 : _a3[le.c]) ?? "" : "";
  }, [u.rows, le]), U = l.useMemo(() => s.templateId ? L.find((i) => i.id === s.templateId) ?? null : null, [s.templateId, L]), de = l.useCallback((i, d) => {
    const b = Ea({ row: i, col: d, rowCount: be, colCount: fe, meta: s, template: U }), E = {};
    return b.bg && (E.backgroundColor = b.bg), b.color && (E.color = b.color), b.fontFamily && (E.fontFamily = b.fontFamily), b.fontSize && (E.fontSize = b.fontSize), b.fontWeight && (E.fontWeight = b.fontWeight), E;
  }, [U, fe, s, be]), te = (i, d) => {
    if (!m) return false;
    const b = Math.min(m.r0, m.r1), E = Math.min(m.c0, m.c1), v = Math.max(m.r0, m.r1), A = Math.max(m.c0, m.c1);
    return i >= b && i <= v && d >= E && d <= A;
  }, Se = (i) => i === "thead" ? o.jsx(Pn, { className: ae, "aria-hidden": true }) : i === "tfoot" ? o.jsx(Rr, { className: ae, "aria-hidden": true }) : o.jsx(Tr, { className: ae, "aria-hidden": true });
  return o.jsxs(o.Fragment, { children: [o.jsxs($t, { isOpen: e, onClose: () => {
    if (Y !== null) {
      ne(null);
      return;
    }
    r();
  }, overlayClassName: "p-[2.5dvh]", contentClassName: "h-[95dvh] max-h-[95dvh] max-w-[95dvw]", contentStyle: gn, resizeHeight: true, children: [o.jsxs(ll, { className: "flex h-full min-h-0 flex-col", onSubmit: (i) => i.preventDefault(), onPointerDownCapture: M, children: [o.jsxs("header", { className: "flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-3 py-2 dark:border-odp-border", children: [o.jsxs("h2", { className: "inline-flex items-center gap-1.5 text-sm font-bold text-gray-800 dark:text-odp-fgStrong", children: [o.jsx(ln, { className: Qc, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1"] }), o.jsxs("div", { className: "flex items-center gap-2", children: [o.jsxs("button", { type: "button", disabled: !Ze, title: `\uC2E4\uD589 \uCDE8\uC18C (${Hn})`, "aria-label": `\uC2E4\uD589 \uCDE8\uC18C (${Hn})`, onClick: () => vt(), className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(Bi, { className: ae, "aria-hidden": true }), "\uC2E4\uD589 \uCDE8\uC18C"] }), o.jsxs("button", { type: "button", disabled: !kt, title: `\uB2E4\uC2DC \uC2E4\uD589 (${On})`, "aria-label": `\uB2E4\uC2DC \uC2E4\uD589 (${On})`, onClick: () => Pe(), className: "inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(Ki, { className: ae, "aria-hidden": true }), "\uB2E4\uC2DC \uC2E4\uD589"] }), o.jsxs("button", { type: "button", onClick: r, className: "inline-flex items-center gap-1 rounded px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft", children: [o.jsx(fn, { className: ae, "aria-hidden": true }), "\uCDE8\uC18C"] }), o.jsxs("button", { type: "button", onClick: () => a(s, u), className: "inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700", children: [o.jsx(mn, { className: ae, "aria-hidden": true }), "\uC801\uC6A9"] })] })] }), o.jsxs("div", { className: "flex min-h-0 flex-1 flex-col landscape:flex-row", children: [o.jsxs("div", { "data-haim-table-sidebars": "", className: "order-2 flex max-h-[42%] min-h-0 w-full shrink-0 flex-col gap-2 overflow-hidden border-t border-gray-100 bg-gray-50/80 p-2 dark:border-odp-border dark:bg-odp-bgSoft/40 portrait:max-h-[42%] landscape:order-1 landscape:max-h-none landscape:w-auto landscape:flex-row landscape:gap-0 landscape:border-t-0 landscape:border-r-0", children: [o.jsxs("aside", { className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-surface landscape:flex-none landscape:shrink-0", style: X ? { width: ie } : void 0, children: [o.jsx("div", { className: "sticky top-0 z-[1] border-b border-gray-100 bg-white px-2.5 py-1.5 dark:border-odp-border dark:bg-odp-surface", children: o.jsxs("h3", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong", children: [o.jsx(ln, { className: ae, "aria-hidden": true }), "\uD45C \xB7 \uADF8\uB8F9"] }) }), o.jsxs("div", { className: "space-y-2 p-2.5", children: [o.jsxs("div", { className: "flex flex-wrap gap-2", children: [o.jsxs(Ue, { name: "template", className: "flex min-w-0 flex-1 flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(rt, { asChild: true, children: o.jsx("span", { children: o.jsx(ot, { icon: o.jsx(Mr, { className: ae }), children: "\uD15C\uD50C\uB9BF" }) }) }), o.jsx(yn, { "aria-label": "\uD45C \uD15C\uD50C\uB9BF", value: s.templateId ?? _n, onValueChange: (i) => {
    if (i === _n) {
      c((b) => {
        const E = { ...b };
        return delete E.templateId, E;
      });
      return;
    }
    const d = L.find((b) => b.id === i);
    d && c((b) => Sa(b, d));
  }, options: [{ value: _n, label: "\uD15C\uD50C\uB9BF \uC5C6\uC74C" }, ...L.map((i) => ({ value: i.id, label: i.name }))], className: "w-full min-w-0" })] }), o.jsxs("button", { type: "button", className: "mt-auto inline-flex h-8 items-center gap-1 self-end rounded-md bg-gray-100 px-2 text-[11px] dark:bg-odp-bgSoft", onClick: () => {
    k({ id: `template-${Date.now().toString(36)}`, name: "\uC0C8 \uD15C\uD50C\uB9BF", sections: {}, rules: [] }), Z(true);
  }, children: [o.jsx(Mr, { className: ae, "aria-hidden": true }), "\uAD00\uB9AC"] })] }), o.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [o.jsxs(Ue, { name: "noHeader", className: "col-span-2 flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(rt, { asChild: true, children: o.jsx("span", { children: o.jsx(ot, { icon: o.jsx(Pn, { className: ae }), children: "noHeader" }) }) }), o.jsxs("label", { className: "flex cursor-pointer items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-2 py-1.5 dark:border-odp-borderSoft dark:bg-odp-surface", children: [o.jsx("span", { className: "min-w-0 text-[11px] leading-snug text-gray-600 dark:text-odp-muted", children: "thead/th \uC5C6\uC774 \uBAA8\uB450 tbody/td" }), o.jsx(or, { className: Jc(!!s.noHeader), checked: !!s.noHeader, onCheckedChange: (i) => c((d) => {
    if (i) return { ...d, noHeader: true };
    const { noHeader: b, ...E } = d;
    return E;
  }), "aria-label": "noHeader", children: o.jsx(sr, { className: Zc }) })] })] }), o.jsxs(Ue, { name: "headerRows", className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${s.noHeader ? "opacity-40" : ""}`, children: [o.jsx(rt, { asChild: true, children: o.jsx("span", { children: o.jsx(ot, { icon: o.jsx(Pn, { className: ae }), children: "headerRows" }) }) }), o.jsx(Qt, { asChild: true, children: o.jsx("input", { type: "number", min: 0, max: be, value: s.headerRows, disabled: !!s.noHeader, onChange: (i) => c((d) => ({ ...d, headerRows: Math.max(0, Number(i.target.value) || 0) })), className: vn }) })] }), o.jsxs(Ue, { name: "footerRows", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(rt, { asChild: true, children: o.jsx("span", { children: o.jsx(ot, { icon: o.jsx(Rr, { className: ae }), children: "footerRows" }) }) }), o.jsx(Qt, { asChild: true, children: o.jsx("input", { type: "number", min: 0, max: be, value: s.footerRows, onChange: (i) => c((d) => ({ ...d, footerRows: Math.max(0, Number(i.target.value) || 0) })), className: vn }) })] }), o.jsxs(Ue, { name: "width", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(rt, { asChild: true, children: o.jsx("span", { children: o.jsx(ot, { icon: o.jsx(zi, { className: ae }), children: "\uB108\uBE44" }) }) }), o.jsx(yn, { "aria-label": "\uD45C \uB108\uBE44", value: s.width, onValueChange: (i) => c((d) => ({ ...d, width: i === "fit" ? "fit" : "full" })), options: [...ru], className: "w-full" })] }), o.jsxs(Ue, { name: "align", className: `flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted ${s.width !== "fit" ? "opacity-40" : ""}`, children: [o.jsx(rt, { asChild: true, children: o.jsx("span", { children: o.jsx(ot, { icon: s.align === "right" ? o.jsx(Vi, { className: ae }) : o.jsx(Wi, { className: ae }), children: "\uC815\uB82C" }) }) }), o.jsx(yn, { "aria-label": "\uD45C \uC815\uB82C", value: s.align, disabled: s.width !== "fit", onValueChange: (i) => c((d) => ({ ...d, align: i === "right" ? "right" : "left" })), options: [...ou], className: "w-full" })] })] }), o.jsxs("div", { className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border", children: [o.jsx("p", { className: "text-[10px] font-medium text-gray-600 dark:text-odp-muted", children: "\uD45C \uAE30\uBCF8 \uD3F0\uD2B8\xB7\uC2A4\uD0C0\uC77C" }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: "\uC140\xB7\uADF8\uB8F9 \uAC12\uC774 \uC788\uC73C\uBA74 \uADF8\uCABD\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4." }), o.jsx(In, { compact: true, idPrefix: "table-edit-table", value: s.style ?? {}, onChange: (i) => c((d) => ({ ...d, style: gr(i) ? {} : i })) })] }), o.jsxs("div", { className: "space-y-1 border-t border-gray-100 pt-2 dark:border-odp-border", children: [o.jsxs("p", { className: "inline-flex items-center gap-1 text-[10px] font-medium text-gray-600 dark:text-odp-muted", children: [o.jsx(Tr, { className: ae, "aria-hidden": true }), "\uADF8\uB8F9 \uC2A4\uD0C0\uC77C"] }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: "thead / tbody / tfoot \uAD6C\uC5ED" }), o.jsx("div", { className: "mb-1 flex flex-wrap gap-1", children: Gc.map((i) => o.jsxs("button", { type: "button", onClick: () => N(i), className: `inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] ${R === i ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-odp-bgSoft"}`, children: [Se(i), i] }, i)) }), o.jsx(In, { compact: true, idPrefix: `table-edit-${R}`, value: s.sections[R] ?? {}, onChange: (i) => c((d) => ({ ...d, sections: { ...d.sections, [R]: i } })) })] })] })] }), o.jsx(Xr, { ariaLabel: "\uD45C \uC0AC\uC774\uB4DC\uBC14\uC640 \uC140 \uC0AC\uC774\uB4DC\uBC14 \uC0AC\uC774 \uB108\uBE44 \uC870\uC808", onDelta: Ht }), o.jsx("aside", { "aria-hidden": !ct, className: `flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-lg border border-blue-200 bg-white dark:border-blue-900/50 dark:bg-odp-surface landscape:flex-none landscape:shrink-0 ${ct ? "" : "pointer-events-none portrait:hidden landscape:invisible"}`, style: X ? { width: Te } : void 0, children: le ? o.jsxs(o.Fragment, { children: [o.jsx("div", { className: "sticky top-0 z-[1] border-b border-blue-100 bg-white px-2.5 py-1.5 dark:border-blue-900/40 dark:bg-odp-surface", children: o.jsxs("h3", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 dark:text-odp-fgStrong", children: [o.jsx(qi, { className: ae, "aria-hidden": true }), "\uC140", o.jsxs("span", { className: "font-normal text-gray-400 dark:text-odp-muted", children: ["(", le.r + 1, "\uD589 ", le.c + 1, "\uC5F4", ke.length > 1 ? ` \xB7 ${ke.length}\uCE78` : "", ")"] })] }) }), o.jsxs("div", { className: "space-y-2 p-2.5", children: [o.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [o.jsxs("button", { type: "button", disabled: !_e, title: `\uBCD1\uD569 (${iu})`, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft", onClick: ft, children: [o.jsx(Ui, { className: ae, "aria-hidden": true }), "\uBCD1\uD569"] }), o.jsxs("button", { type: "button", disabled: !m, title: `\uBCD1\uD569 \uD574\uC81C (${lu})`, className: "inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1.5 text-[11px] disabled:opacity-40 dark:bg-odp-bgSoft", onClick: Et, children: [o.jsx(Xi, { className: ae, "aria-hidden": true }), "\uBCD1\uD569 \uD574\uC81C"] })] }), o.jsxs("p", { className: "text-[10px] text-gray-400 dark:text-odp-muted", children: ["\uAE00\uC790 \uD06C\uAE30: ", cu, " / ", uu] }), o.jsxs(Ue, { name: "cell-text", className: "flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted", children: [o.jsx(rt, { asChild: true, children: o.jsx("span", { children: o.jsx(ot, { icon: o.jsx(Bo, { className: ae }), children: "\uC140 \uD14D\uC2A4\uD2B8" }) }) }), o.jsx(Qt, { asChild: true, children: o.jsx("input", { type: "text", value: O, onChange: (i) => nt(le.r, le.c, i.target.value), placeholder: "\uC140 \uB0B4\uC6A9 \uC785\uB825", className: Na }) })] }), o.jsx(In, { compact: true, idPrefix: "table-edit-cell", value: dt, onChange: Re })] })] }) : null }), o.jsx(Xr, { ariaLabel: "\uC0AC\uC774\uB4DC\uBC14\uC640 \uD45C \uC0AC\uC774 \uB108\uBE44 \uC870\uC808", onDelta: Ot })] }), o.jsxs("div", { ref: pe, "data-haim-table-canvas": "", className: `order-1 flex min-h-0 min-w-0 flex-1 flex-col overflow-auto border-t border-gray-100 p-3 landscape:order-2 landscape:border-t-0 landscape:border-l dark:border-odp-border ${Ee ? "cursor-grabbing select-none" : je && !m ? "cursor-grab select-none" : ""}`, onMouseLeave: () => {
    K || J(null);
  }, onPointerDown: g, onPointerMove: w, onPointerUp: y, onPointerCancel: y, onAuxClick: (i) => {
    i.button === 1 && i.preventDefault();
  }, children: [o.jsxs("p", { className: "mb-2 inline-flex shrink-0 items-center gap-1 text-[10px] text-gray-400", children: [o.jsx(Yi, { className: ae, "aria-hidden": true }), "\uB354\uBE14\uD074\uB9AD \uB4DC\uB798\uADF8\xB7Shift+\uD074\uB9AD: \uBC94\uC704 \uC120\uD0DD \xB7 \uC6B0\uD074\uB9AD: \uD589/\uC5F4 \uC0AD\uC81C \xB7 \uD720\uD074\uB9AD/\uC2A4\uD398\uC774\uC2A4+\uB4DC\uB798\uADF8: \uD328\uB2DD \xB7 ", Hn, "/", On, ": \uC2E4\uD589 \uCDE8\uC18C/\uB2E4\uC2DC \uC2E4\uD589 \xB7 \uD14C\uB450\uB9AC \uB354\uBE14\uD074\uB9AD: \uD589\xB7\uC5F4 \uCD94\uAC00"] }), o.jsx("div", { ref: he, className: "relative inline-block min-w-full p-5", "data-haim-inserting": (P == null ? void 0 : P.kind) ?? void 0, onMouseMove: bn, onMouseLeave: () => {
    K || J(null);
  }, children: o.jsxs(Ko, { delayDuration: 0, skipDelayDuration: 0, children: [o.jsxs("table", { ref: ge, className: `border-collapse text-sm ${((_a2 = s.colWidths) == null ? void 0 : _a2.some((i) => i && i.trim())) ? "w-max max-w-full" : "w-full"}`, style: { tableLayout: ((_b = s.colWidths) == null ? void 0 : _b.some((i) => i && i.trim())) || ((_c2 = s.rowHeights) == null ? void 0 : _c2.some((i) => i && i.trim())) ? "fixed" : void 0, ...((_d2 = s.style) == null ? void 0 : _d2.fontFamily) ? { fontFamily: s.style.fontFamily } : {}, ...((_e2 = s.style) == null ? void 0 : _e2.fontSize) ? { fontSize: s.style.fontSize } : {}, ...((_f = s.style) == null ? void 0 : _f.fontWeight) ? { fontWeight: s.style.fontWeight } : {} }, children: [o.jsx("colgroup", { children: Array.from({ length: fe }, (i, d) => {
    const b = kn(s.colWidths, d);
    return o.jsx("col", { style: b ? { width: b } : void 0 }, d);
  }) }), o.jsx("tbody", { children: u.rows.map((i, d) => {
    const b = kn(s.rowHeights, d);
    return o.jsx("tr", { style: b ? { height: b } : void 0, children: Array.from({ length: fe }, (E, v) => {
      if (ve.has(`${d},${v}`)) return null;
      const A = ja(s.merges, d, v), V = te(d, v), ce = kn(s.colWidths, v), ze = o.jsx("td", { "data-edit-r": d, "data-edit-c": v, colSpan: A == null ? void 0 : A.colspan, rowSpan: A == null ? void 0 : A.rowspan, className: `min-h-11 cursor-pointer border-2 border-gray-300 p-0 transition-[box-shadow,outline-color] dark:border-odp-borderStrong ${ce ? "" : "min-w-28"} ${V ? "relative z-[1] outline outline-2 outline-offset-[-2px] outline-blue-500 ring-0" : "hover:relative hover:z-[1] hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-blue-400/70"}`, onContextMenu: () => {
        te(d, v) || He(d, v), q && (re({ r: d, c: v }), J(null));
      }, onMouseDown: (F) => {
        var _a3, _b2;
        if (F.button === 1 || F.button !== 0 || Le.current || Ke.current && !me.current) return;
        if ((_b2 = (_a3 = F.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-hit], [data-haim-edge-add]")) {
          F.preventDefault();
          return;
        }
        {
          const Ae = ge.current, Nt = he.current;
          if (Ae && Nt && Rt(Ae, Nt, F.clientX, F.clientY, be, fe, s.merges)) {
            F.preventDefault();
            return;
          }
        }
        if (F.shiftKey) {
          F.preventDefault(), Yt(d, v);
          return;
        }
        if (F.detail >= 2) {
          F.preventDefault(), St(d, v);
          return;
        }
        He(d, v);
      }, onDoubleClick: (F) => {
        const Ne = ge.current, Ae = he.current;
        if (Ne && Ae && Rt(Ne, Ae, F.clientX, F.clientY, be, fe, s.merges)) {
          F.preventDefault(), F.stopPropagation();
          return;
        }
        F.preventDefault(), St(d, v);
      }, onMouseEnter: () => {
        f(d, v);
      }, children: o.jsx(Ue, { name: `cell-${d}-${v}`, className: "contents", children: o.jsx(Qt, { asChild: true, children: o.jsx("input", { type: "text", value: i[v] ?? "", onChange: (F) => nt(d, v, F.target.value), onKeyDown: (F) => D(F, d, v), onMouseDown: (F) => {
        var _a3, _b2;
        if (F.button !== 1 && F.button === 0 && !Le.current && !(Ke.current && !me.current)) {
          if ((_b2 = (_a3 = F.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-edge-hit], [data-haim-edge-add]")) {
            F.preventDefault(), F.stopPropagation();
            return;
          }
          {
            const Ne = ge.current, Ae = he.current;
            if (Ne && Ae && Rt(Ne, Ae, F.clientX, F.clientY, be, fe, s.merges)) {
              F.preventDefault(), F.stopPropagation();
              return;
            }
          }
          if (F.shiftKey) {
            F.preventDefault(), F.stopPropagation(), Yt(d, v);
            return;
          }
          if (F.detail >= 2) {
            F.preventDefault();
            return;
          }
          F.stopPropagation();
        }
      }, onDoubleClick: (F) => {
        const Ne = ge.current, Ae = he.current;
        if (Ne && Ae && Rt(Ne, Ae, F.clientX, F.clientY, be, fe, s.merges)) {
          F.preventDefault(), F.stopPropagation();
          return;
        }
        F.preventDefault(), F.stopPropagation(), St(d, v);
      }, onFocus: () => {
        $e.current || Ke.current && !me.current || He(d, v);
      }, className: `${vn} h-full min-h-11 w-full cursor-pointer border-transparent bg-transparent px-2 text-sm focus:cursor-text focus:border-gray-300 focus:bg-white/90 dark:focus:bg-odp-bgSoft/90 ${ce ? "" : "min-w-28"}`, style: { ...de(d, v), ...b ? { height: b } : {} } }) }) }) }, v);
      return q ? ze : o.jsxs(cl, { onOpenChange: (F) => {
        re(F ? { r: d, c: v } : null), F ? J(null) : We();
      }, children: [o.jsx(ul, { asChild: true, children: ze }), o.jsx(dl, { children: o.jsxs(fl, { className: au, onCloseAutoFocus: (F) => F.preventDefault(), children: [o.jsxs(Lr, { className: Ur, disabled: be <= 1, onPointerEnter: () => Vt(d), onPointerLeave: We, onFocus: () => Vt(d), onBlur: We, onSelect: () => {
        et(d);
      }, children: [o.jsx(ht, { className: ae, "aria-hidden": true }), "\uD589 \uC0AD\uC81C"] }), o.jsxs(Lr, { className: Ur, disabled: fe <= 1, onPointerEnter: () => Wt(v), onPointerLeave: We, onFocus: () => Wt(v), onBlur: We, onSelect: () => {
        zt(v);
      }, children: [o.jsx(ht, { className: ae, "aria-hidden": true }), "\uC5F4 \uC0AD\uC81C"] })] }) })] }, v);
    }) }, d);
  }) })] }), se ? o.jsx(bu, { kind: se.kind, indices: se.indices, table: ge.current, wrap: he.current, colCount: fe }) : null, q && G ? o.jsxs(Fo, { open: oe, onOpenChange: (i) => {
    i || (re(null), We());
  }, title: `${G.r + 1}\uD589 ${G.c + 1}\uC5F4`, subtitle: "\uD45C \uD3B8\uC9D1 \uC140", children: [o.jsxs("button", { type: "button", className: zn, disabled: be <= 1, onClick: () => {
    et(G.r), re(null);
  }, children: [o.jsx(ht, { className: ae, "aria-hidden": true }), "\uD589 \uC0AD\uC81C"] }), o.jsxs("button", { type: "button", className: zn, disabled: fe <= 1, onClick: () => {
    zt(G.c), re(null);
  }, children: [o.jsx(ht, { className: ae, "aria-hidden": true }), "\uC5F4 \uC0AD\uC81C"] })] }) : null, P && !oe ? o.jsxs(o.Fragment, { children: [o.jsx(xu, { insert: P }, `preview-${P.kind}-${P.index}`), o.jsx(gu, { insert: P, allowResize: P.index !== 0, tip: P.index === 0 ? P.label : `${P.label} \xB7 ${Yr(P.kind)}`, onDoubleClickInsert: () => {
    const { kind: i, index: d } = P;
    i === "row" ? Bt(d) : Kt(d);
  }, onResizePointerDown: (i) => tt(i, P) }, `hit-${P.kind}-${P.index}`), o.jsx(hu, { tip: P.index === 0 ? P.label : `${P.label} \xB7 ${Yr(P.kind)}`, onDoubleClick: () => {
    const { kind: i, index: d } = P;
    i === "row" ? Bt(d) : Kt(d);
  }, style: { left: P.x, top: P.y } }, `btn-${P.kind}-${P.index}`)] }) : null] }) })] })] })] }), o.jsx(Sl, { isOpen: I, template: Q, onClose: () => {
    Z(false), k(null);
  }, onSave: (i) => {
    const b = [...Ra().templates.filter((E) => E.id !== (Q == null ? void 0 : Q.id) && E.id !== i.id), i];
    Ma({ templates: b }).then((E) => {
      B(E.templates), Z(false), k(null);
    });
  } })] }), typeof document < "u" ? ko.createPortal(o.jsx("div", { className: "relative z-[100060]", children: o.jsx(an, { isOpen: Y !== null, variant: "danger", title: (Y == null ? void 0 : Y.kind) === "col" ? "\uC5F4 \uC0AD\uC81C" : "\uD589 \uC0AD\uC81C", message: (Y == null ? void 0 : Y.kind) === "col" ? Y.indices.length > 1 ? `\uC120\uD0DD\uD55C ${Y.indices.length}\uAC1C \uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(Y.indices[0] ?? 0) + 1}\uC5F4\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : Y ? Y.indices.length > 1 ? `\uC120\uD0DD\uD55C ${Y.indices.length}\uAC1C \uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : `${(Y.indices[0] ?? 0) + 1}\uD589\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?` : "", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", onConfirm: xn, onCancel: () => ne(null) }) }), document.body) : null] });
}
const ku = "z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft", Zr = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-800 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-surface", eo = "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40", Zt = "h-3.5 w-3.5 shrink-0";
function Cu({ containerRef: e, getMarkdown: t, setMarkdown: n, onEditTable: r, onEditFailed: a }) {
  const s = $o(), [c, u] = l.useState(false), [p, m] = l.useState(null), [x, T] = l.useState(null), j = l.useRef(null);
  j.current = p;
  const R = l.useCallback((k) => {
    m(k), u(true);
  }, []);
  l.useEffect(() => {
    const k = e.current;
    if (!k) return;
    const P = () => k.querySelector(".md-editor-preview"), J = (G) => {
      var _a2, _b, _c2, _d2;
      if ((_b = (_a2 = G.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const re = P(), oe = (_d2 = (_c2 = G.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "table");
      !(oe instanceof HTMLTableElement) || !(re == null ? void 0 : re.contains(oe)) || (G.preventDefault(), G.stopPropagation(), R({ table: oe, previewRoot: re, x: G.clientX, y: G.clientY }));
    };
    let K = null, _ = null, C = false, z = null;
    const Y = () => {
      K && clearTimeout(K), K = null, _ = null, z = null;
    }, ne = (G) => {
      var _a2, _b;
      if (G.pointerType === "mouse") return;
      const re = P();
      if (!re) return;
      const oe = (_b = (_a2 = G.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "table");
      !(oe instanceof HTMLTableElement) || !re.contains(oe) || (Y(), C = false, z = oe, _ = { x: G.clientX, y: G.clientY }, K = setTimeout(() => {
        C = true, La();
        const q = P();
        z && q && R({ table: z, previewRoot: q, x: (_ == null ? void 0 : _.x) ?? G.clientX, y: (_ == null ? void 0 : _.y) ?? G.clientY });
      }, Pa));
    }, se = (G) => {
      if (!_) return;
      const re = G.clientX - _.x, oe = G.clientY - _.y;
      re * re + oe * oe > 100 && Y();
    }, ee = (G) => {
      C && (G.preventDefault(), G.stopPropagation()), Y(), C = false;
    }, we = (G) => {
      var _a2, _b;
      const re = P(), oe = (_b = (_a2 = G.target) == null ? void 0 : _a2.closest) == null ? void 0 : _b.call(_a2, "table");
      oe && (re == null ? void 0 : re.contains(oe)) && window.matchMedia("(pointer: coarse)").matches && G.preventDefault();
    };
    return k.addEventListener("contextmenu", J, true), k.addEventListener("pointerdown", ne), k.addEventListener("pointermove", se), k.addEventListener("pointerup", ee), k.addEventListener("pointercancel", ee), k.addEventListener("contextmenu", we, true), () => {
      Y(), k.removeEventListener("contextmenu", J, true), k.removeEventListener("pointerdown", ne), k.removeEventListener("pointermove", se), k.removeEventListener("pointerup", ee), k.removeEventListener("pointercancel", ee), k.removeEventListener("contextmenu", we, true);
    };
  }, [e, R]);
  const N = () => {
    const k = j.current;
    if (!k) return;
    r(k.table, k.previewRoot) || (a == null ? void 0 : a());
  }, L = () => {
    const k = j.current;
    if (!k) return;
    const P = zo(t(), k.table, k.previewRoot);
    if (!P) {
      a == null ? void 0 : a();
      return;
    }
    T(P);
  }, B = () => {
    if (!x) return;
    const k = Da(t(), x);
    n(k), T(null);
  }, I = p ?? { x: 0, y: 0 }, Z = () => {
    u(false), m(null);
  }, Q = o.jsxs(o.Fragment, { children: [o.jsxs("button", { type: "button", className: s ? Aa : Zr, onClick: () => {
    N(), Z();
  }, children: [o.jsx(ln, { className: Zt, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1\uAE30"] }), o.jsxs("button", { type: "button", className: s ? zn : eo, onClick: () => {
    L(), Z();
  }, children: [o.jsx(ht, { className: Zt, "aria-hidden": true }), "\uD45C \uC0AD\uC81C"] })] });
  return o.jsxs(o.Fragment, { children: [s ? o.jsx(Fo, { open: c, onOpenChange: (k) => {
    u(k), k || m(null);
  }, title: "\uBBF8\uB9AC\uBCF4\uAE30 \uD45C", subtitle: "\uB9C8\uD06C\uB2E4\uC6B4 \uD14C\uC774\uBE14", children: Q }) : o.jsxs(ml, { open: c, onOpenChange: (k) => {
    u(k), k || m(null);
  }, modal: true, children: [o.jsx(pl, { asChild: true, children: o.jsx("button", { type: "button", "aria-hidden": true, tabIndex: -1, className: "pointer-events-none fixed h-px w-px opacity-0", style: { left: I.x, top: I.y } }) }), o.jsx(hl, { children: o.jsxs(gl, { className: ku, side: "bottom", align: "start", sideOffset: 2, collisionPadding: 12, onCloseAutoFocus: (k) => k.preventDefault(), children: [o.jsxs(Pr, { className: Zr, onSelect: N, children: [o.jsx(ln, { className: Zt, "aria-hidden": true }), "\uD45C \uD3B8\uC9D1\uAE30"] }), o.jsxs(Pr, { className: eo, onSelect: L, children: [o.jsx(ht, { className: Zt, "aria-hidden": true }), "\uD45C \uC0AD\uC81C"] })] }) })] }), o.jsx(an, { isOpen: x !== null, variant: "danger", title: "\uD45C \uC0AD\uC81C", message: "\uC774 \uD45C\uB97C \uB9C8\uD06C\uB2E4\uC6B4\uC5D0\uC11C \uC0AD\uC81C\uD560\uAE4C\uC694?", confirmLabel: "\uC0AD\uC81C", cancelLabel: "\uCDE8\uC18C", onConfirm: B, onCancel: () => T(null) })] });
}
function Eu(e) {
  const [t, n] = l.useState(null), r = l.useRef(e.getMarkdown), a = l.useRef(e.setMarkdown);
  r.current = e.getMarkdown, a.current = e.setMarkdown;
  const s = l.useCallback((m, x = m) => {
    const T = r.current(), j = Vn(T, m, x);
    return j ? (n({ block: j, meta: j.meta ?? sn(), grid: j.grid }), true) : false;
  }, []), c = l.useCallback((m, x) => {
    const T = r.current(), j = zo(T, m, x);
    return j ? (n({ block: j, meta: j.meta ?? sn(), grid: j.grid }), true) : false;
  }, []), u = l.useCallback(() => n(null), []), p = l.useCallback((m, x) => {
    if (!t) return;
    const T = r.current(), j = Vn(T, t.block.start, t.block.start + 1) ?? t.block, R = Ia(T, j, m, x);
    a.current(R), n(null);
  }, [t]);
  return { editState: t, openAtOffset: s, openPreviewTable: c, close: u, apply: p, isOpen: !!t };
}
const ss = new nr("s3haim-note-cover-fold");
ss.version(1).stores({ folds: "key, updatedAt" });
const as = ss.folds;
function Su(e, t) {
  return `cover-fold:${tr(e, t)}`;
}
function Nu(e) {
  return !(e == null ? void 0 : e.id) || e.type !== "s3" && e.type !== "local" && e.type !== "webdav" ? null : Su(e.type, e.id);
}
async function ju(e) {
  if (!e) return null;
  const t = await as.get(e);
  return !t || typeof t.collapsed != "boolean" ? null : t.collapsed;
}
async function Mu(e, t) {
  e && await as.put({ key: e, collapsed: !!t, updatedAt: Date.now() });
}
function bt(e) {
  const t = Math.min(e.length, 2e6);
  return $a(e.sliceString(0, t));
}
function it(e) {
  const t = bt(e.doc);
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
  return er(e).iterate({ from: n.from, to: Math.min(n.to, n.from + 1), enter(a) {
    const s = a.type.name;
    if (s.startsWith("ATXHeading") || s.startsWith("SetextHeading")) return r = true, false;
  } }), r;
}
function Bn(e, t) {
  const n = bt(e.doc);
  if (n) {
    const s = e.doc.lineAt(n.from);
    if (t === s.from) {
      const c = it(e);
      if (c) return { ...c, kind: "cover" };
    }
    if (t >= n.from && t < n.to) return null;
  }
  if (!Tu(e, t)) return null;
  const r = e.doc.lineAt(t), a = Rs(e, r.from, r.to);
  return !a || a.from >= a.to ? null : { ...a, kind: "heading" };
}
const At = Ns.define({ combine: (e) => e[e.length - 1] ?? null }), is = new Zn();
function Lu(e) {
  return is.of(At.of(e));
}
function Pu(e, t) {
  e.dispatch({ effects: is.reconfigure(At.of(t)) });
}
function Au(e, t) {
  const n = document.createElement("button");
  n.type = "button", n.className = `cm-note-cover-fold-chevron cursor-pointer cm-fold-chevron--${t}`;
  const r = t === "cover" ? e ? "\uD45C\uC9C0 \uC811\uAE30" : "\uD45C\uC9C0 \uD3BC\uCE58\uAE30" : e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30";
  n.setAttribute("aria-label", r), n.title = r, n.dataset.foldKind = t, n.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const a = n.querySelector("svg");
  return a && (a.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", a.style.transformOrigin = "50% 50%"), n;
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
  const a = e.contentDOM.getBoundingClientRect(), s = Math.min(n.top, r.top), c = Math.max(n.bottom, r.bottom), u = Math.max(0, c - s);
  if (u < 2) return null;
  const p = document.createElement("div");
  return p.className = "cm-note-cover-fold-motion", p.style.cssText = ["position:fixed", `top:${s}px`, `left:${a.left}px`, `width:${Math.max(0, a.width)}px`, `height:${u}px`, "overflow:hidden", "pointer-events:none", "z-index:6", "background:var(--md-bk-color, var(--cm-background, #fff))"].join(";"), document.body.appendChild(p), p;
}
async function Du(e, t) {
  const n = ++Qn, r = ls(e, t);
  if (!r) {
    e.dispatch({ effects: st.of(t) });
    return;
  }
  try {
    await pn(r, { height: 0, opacity: 0.35 }, { duration: 0.22, ease: "easeInOut" });
  } catch {
  }
  n === Qn && it(e.state) && e.dispatch({ effects: st.of(t) }), r.remove();
}
async function Iu(e, t) {
  ++Qn, e.dispatch({ effects: It.of(t) });
  const n = it(e.state);
  if (!n) return;
  const r = ls(e, n);
  if (r) {
    try {
      await pn(r, { height: 0, opacity: 0 }, { duration: 0.22, ease: "easeInOut" });
    } catch {
    }
    r.remove();
  }
}
function cs(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.querySelector) == null ? void 0 : _a2.call(e, "svg");
  n instanceof SVGElement && pn(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" });
}
function no(e, t) {
  const n = Pt(e.state, t);
  return e.dispatch({ effects: n ? It.of(t) : st.of(t) }), true;
}
function ro(e) {
  const t = it(e.state);
  if (!t) return false;
  const r = !Pt(e.state, t), a = e.dom.querySelector('.cm-note-cover-fold-chevron[data-fold-kind="cover"]');
  return cs(a, !r), (async () => {
    r ? await Du(e, t) : await Iu(e, t);
    const s = e.state.facet(At);
    s && Mu(s, r);
  })(), true;
}
function $u(e, t) {
  const n = it(e.state);
  if (!n) return;
  const r = Pt(e.state, n);
  t && !r ? e.dispatch({ effects: st.of(n) }) : !t && r && e.dispatch({ effects: It.of(n) });
}
function Fu() {
  return jo.fromClass(class {
    constructor(e) {
      __publicField(this, "lastKey", null);
      __publicField(this, "hadCover", false);
      __publicField(this, "loadGen", 0);
      this.view = e, this.syncKeyAndMaybeRestore();
    }
    update(e) {
      const t = e.state.facet(At) !== this.lastKey, r = !!bt(e.state.doc), a = r && !this.hadCover;
      this.hadCover = r, (t || a) && this.syncKeyAndMaybeRestore();
    }
    syncKeyAndMaybeRestore() {
      const e = this.view.state.facet(At);
      this.lastKey = e;
      const t = bt(this.view.state.doc);
      if (this.hadCover = !!t, !e || !t) return;
      const n = ++this.loadGen;
      ju(e).then((r) => {
        n === this.loadGen && r != null && $u(this.view, r);
      });
    }
  });
}
function _u(e) {
  return e.transactions.some((t) => t.effects.some((n) => n.is(st) || n.is(It)));
}
function Hu() {
  return [Lu(null), So({ preparePlaceholder(e, t) {
    const n = it(e);
    return n && Ru(n, t) ? "cover" : "heading";
  }, placeholderDOM(e, t, n) {
    const r = document.createElement("span");
    return r.className = "cm-foldPlaceholder", r.textContent = n === "cover" ? "\u2026\uD45C\uC9C0\u2026" : "\u2026", r.setAttribute("aria-hidden", "true"), r.onclick = t, r;
  } }), No.of((e, t) => {
    const n = bt(e.doc);
    if (!n) return null;
    const r = e.doc.lineAt(n.from);
    return t !== r.from ? null : it(e);
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
      const a = n.target instanceof Element ? n.target.closest(".cm-note-cover-fold-chevron") : null;
      cs(a, Pt(e.state, r)), no(e, r);
    }
    return n.preventDefault(), n.stopPropagation(), true;
  } } }), Ms({ domEventHandlers: { mousedown(e, t, n) {
    if (!(n instanceof MouseEvent) || n.button !== 0) return false;
    const r = bt(e.state.doc);
    if (r && t.from >= r.from && t.from < r.to) return ro(e) ? (n.preventDefault(), true) : false;
    const a = Bn(e.state, t.from);
    return !a || a.kind !== "heading" ? false : (no(e, a), n.preventDefault(), true);
  } } }), Fu(), Lt.theme({ ".cm-note-cover-fold-gutter": { width: "1.1rem" }, ".cm-note-cover-fold-gutter .cm-gutterElement": { display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }, ".cm-note-cover-fold-chevron": { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1rem", height: "1rem", padding: "0", margin: "0", border: "none", background: "transparent", color: "inherit", opacity: "0.65", cursor: "pointer", lineHeight: "1" }, ".cm-note-cover-fold-chevron:hover": { opacity: "1" }, ".cm-note-cover-fold-chevron svg": { display: "block" } })];
}
function Ou({ cover: e, getPresignedUrl: t }) {
  const n = Fa(e.pageSizeId) ? e.pageSizeId : _a, r = l.useMemo(() => ({ ...Ha(), pageSizeId: n }), [n]), a = l.useMemo(() => Oa(n), [n]), s = l.useMemo(() => Ba(r), [r]);
  return o.jsx("div", { className: "md-note-cover-preview-light w-full bg-white text-gray-900", "data-note-cover-preview": "1", "data-color-mode": "light", "data-cover-page-size": n, style: s, children: o.jsx(bl, { cover: e, getPresignedUrl: t, className: "md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]", style: { width: "100%", height: "auto", aspectRatio: `${a.widthMm} / ${a.heightMm}` } }) });
}
const cn = /* @__PURE__ */ new WeakMap(), Bu = "\uD45C\uC9C0 \uBD88\uB7EC\uC624\uB294 \uC911\u2026", Ku = "\uD45C\uC9C0";
function us(e) {
  const t = cn.get(e);
  t && (t.unmount(), cn.delete(e));
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
  let r = cn.get(e);
  r || (r = Cs.createRoot(e), cn.set(e, r)), r.render(l.createElement(Ou, { cover: t, getPresignedUrl: n ?? void 0 }));
}
function Vu(e, t, n, r) {
  if (!e || typeof e.querySelectorAll != "function") return 0;
  const { cover: a } = _o(t ?? ""), s = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  if (!(a == null ? void 0 : a.enabled)) {
    for (const c of s) {
      us(c);
      const u = c.closest("[data-note-cover-placeholder]");
      so(u, "empty");
    }
    return 0;
  }
  for (const c of s) {
    const u = c.closest("[data-note-cover-placeholder]");
    so(u, "ready"), zu(c, a, n);
  }
  return s.length;
}
function Wu(e) {
  if (!e || typeof e.querySelectorAll != "function") return;
  const t = Array.from(e.querySelectorAll("[data-note-cover-mount]"));
  for (const n of t) us(n);
}
const qu = "h1, h2, h3, h4, h5, h6", ds = "md-preview-heading-fold-chevron", ao = "md-preview-heading-foldable", en = "md-preview-heading-folded", Uu = "md-preview-heading-section-hidden", on = "data-md-preview-heading-fold";
function Xu(e) {
  if (!e) return false;
  const t = e.tagName;
  return t === "H1" || t === "H2" || t === "H3" || t === "H4" || t === "H5" || t === "H6";
}
function io(e) {
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
  const t = io(e), n = [];
  let r = e.nextElementSibling;
  for (; r && !(Xu(r) && io(r) <= t || r.hasAttribute("data-note-cover-placeholder")); ) r instanceof HTMLElement && n.push(r), r = r.nextElementSibling;
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
  for (const n of t) if (n.getAttribute(on) !== "1" && fs(n).length > 0) return true;
  return false;
}
function Ju(e) {
  const t = document.createElement("button");
  t.type = "button", t.className = `${ds} cursor-pointer`, t.setAttribute("aria-label", e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), t.title = e ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30", t.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const n = t.querySelector("svg");
  return n && (n.style.transform = e ? "rotate(0deg)" : "rotate(-90deg)", n.style.transformOrigin = "50% 50%"), t;
}
function Zu(e, t) {
  const n = e.querySelector("svg");
  n instanceof SVGElement && (pn(n, { transform: t ? "rotate(0deg)" : "rotate(-90deg)" }, { duration: 0.18, ease: "easeInOut" }), e.setAttribute("aria-label", t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30"), e.title = t ? "\uD5E4\uB529 \uC811\uAE30" : "\uD5E4\uB529 \uD3BC\uCE58\uAE30");
}
function Kn(e, t) {
  for (const n of e) n.classList.toggle(Uu, t), t ? n.setAttribute("hidden", "") : n.removeAttribute("hidden");
}
function ed(e, t = {}) {
  if (!e || typeof e.querySelectorAll != "function") return () => {
  };
  const n = new Set(Array.from(t.collapsedIds ?? []).filter((s) => typeof s == "string" && s)), r = [];
  return ms(e).forEach((s, c) => {
    var _a2;
    if (s.getAttribute(on) === "1") return;
    const u = fs(s);
    if (u.length === 0) return;
    const p = Yu(s, c);
    s.id || (s.id = p), s.setAttribute(on, "1"), s.classList.add(ao), (_a2 = s.querySelector(`:scope > .${ds}`)) == null ? void 0 : _a2.remove();
    const x = !n.has(p), T = Ju(x);
    s.insertBefore(T, s.firstChild);
    const j = (N) => {
      s.classList.toggle(en, N), Kn(u, N), Zu(T, !N);
    };
    x || (s.classList.add(en), Kn(u, true));
    const R = (N) => {
      var _a3;
      N.preventDefault(), N.stopPropagation();
      const L = !s.classList.contains(en);
      j(L), L ? n.add(p) : n.delete(p), (_a3 = t.onCollapsedChange) == null ? void 0 : _a3.call(t, Array.from(n));
    };
    T.addEventListener("click", R), r.push(() => {
      T.removeEventListener("click", R), T.remove(), s.classList.remove(ao, en), s.removeAttribute(on), Kn(u, false);
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
const un = /* @__PURE__ */ new Set();
function sd(e) {
  return un.add(e), () => {
    un.delete(e);
  };
}
function ad(e) {
  if (!(!e.selectionSet && !e.docChanged) && !(e.view.composing || e.view.compositionStarted) && un.size !== 0) for (const t of un) try {
    t(e.view, e);
  } catch {
  }
}
const id = [0, 16, 48, 100, 180, 320];
function ld(e) {
  let t = [], n = null, r = null, a = false, s = false;
  function c() {
    for (const R of t) clearTimeout(R);
    t = [];
  }
  function u() {
    if (s) return false;
    const R = e.getPreviewRoot(), N = e.getView();
    return !R || !N || Tt(R) ? false : Ka(N, R, { allowCollapsed: true });
  }
  function p() {
    a || s || (a = true, requestAnimationFrame(() => {
      a = false, u();
    }));
  }
  function m(R) {
    n && r === R || (n == null ? void 0 : n.disconnect(), r = R, n = new MutationObserver((N) => {
      N.some((B) => {
        const I = [...B.addedNodes, ...B.removedNodes];
        return I.length === 0 ? B.type === "characterData" || B.type === "attributes" : I.some((Z) => {
          var _a2, _b;
          return Z instanceof Element ? !(Z.hasAttribute("data-preview-caret-mirror") || Z.hasAttribute("data-preview-sel-mirror") || ((_a2 = Z.classList) == null ? void 0 : _a2.contains("s3haim-preview-caret-mirror")) || ((_b = Z.classList) == null ? void 0 : _b.contains("s3haim-preview-sel-mirror"))) : true;
        });
      }) && p();
    }), n.observe(R, { childList: true, subtree: true, characterData: true }));
  }
  function x(R) {
    if (s) return;
    const N = e.getPreviewRoot();
    if (N && m(N), u(), !!(R == null ? void 0 : R.withRetries)) {
      c();
      for (const L of id) t.push(setTimeout(() => {
        if (s) return;
        const B = e.getPreviewRoot();
        B && m(B), u();
      }, L));
    }
  }
  function T() {
    s = true, c(), n == null ? void 0 : n.disconnect(), n = null, r = null, a = false;
  }
  const j = e.getPreviewRoot();
  return j && m(j), x({ withRetries: true }), { schedule: x, stop: T };
}
const lo = [0, 16, 48, 120, 280], cd = 50, ud = 40, co = 32, dd = 32;
function uo(e) {
  return !!(e == null ? void 0 : e.isConnected);
}
function Jn(e, t) {
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
    let a = r.parentElement;
    for (; a && a !== e; ) {
      if (a.hasAttribute("data-line")) return false;
      a = a.parentElement;
    }
    return true;
  });
  return n.length > 0 ? n : t;
}
function fd(e, t) {
  let n = null, r = -1;
  for (const a of gs(e)) {
    const s = Number(a.getAttribute("data-line"));
    Number.isFinite(s) && s <= t && s >= r && (n = a, r = s);
  }
  return n;
}
function md(e, t, n) {
  let r = null, a = -1, s = -1 / 0;
  for (const c of gs(e)) {
    const u = Number(c.getAttribute("data-line"));
    if (!Number.isFinite(u)) continue;
    const p = Jn(c, t);
    p <= n && p >= s && (r = c, a = u, s = p);
  }
  return !r || a < 0 ? null : { el: r, line0: a };
}
function pd(e, t) {
  var _a2;
  const n = (_a2 = e == null ? void 0 : e.dom) == null ? void 0 : _a2.closest(".md-editor");
  if (n instanceof HTMLElement) return n;
  const r = t == null ? void 0 : t.closest(".md-editor");
  return r instanceof HTMLElement ? r : null;
}
function hd(e) {
  let t = false, n = [], r = null, a = 0, s = null, c = 0, u = 0, p = null, m = null, x = null, T = null, j = null, R = "none", N = false;
  function L() {
    for (const H of n) clearTimeout(H);
    n = [];
  }
  function B() {
    r != null && (clearTimeout(r), r = null), a = 0;
  }
  function I() {
    s != null && (clearTimeout(s), s = null);
  }
  function Z() {
    c && cancelAnimationFrame(c), u && cancelAnimationFrame(u), c = 0, u = 0;
  }
  function Q(H) {
    I(), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        s = setTimeout(() => {
          s = null, R === H && (R = "none");
        }, dd);
      });
    });
  }
  function k(H) {
    return H.scrollDOM;
  }
  function P(H) {
    return uo(T) ? T : uo(m) ? m : pt(H);
  }
  function J(H) {
    if (!(H instanceof Node)) return null;
    const $ = e.getView(), X = e.getPreviewRoot();
    if ($ && (H === $.scrollDOM || $.dom.contains(H))) return "editor";
    if (X) {
      const W = X.closest(".md-editor-preview-wrapper") ?? X;
      if (H === W || W.contains(H)) return "preview";
    }
    return null;
  }
  function K(H, $) {
    if (H !== "preview" || !($ instanceof HTMLElement)) return;
    const X = e.getPreviewRoot();
    if (!X) return;
    const W = pt(X);
    W && ($ === W || $.contains(W)) && (T = $);
  }
  function _(H, $) {
    if (!($ instanceof HTMLElement)) return false;
    if (H === "editor") {
      const pe = e.getView();
      return !!(pe && ($ === pe.scrollDOM || $.contains(pe.scrollDOM)));
    }
    const X = e.getPreviewRoot(), W = X ? pt(X) : null;
    return !!(W && ($ === W || $.contains(W)));
  }
  function C() {
    if (N) return false;
    const H = e.getPreviewRoot(), $ = e.getView();
    if (!H || !$ || R === "preview" || R !== "none" && R !== "follow") return false;
    R = "follow";
    const X = za($, H);
    return Q("follow"), X;
  }
  function z() {
    t || N || (t = true, requestAnimationFrame(() => {
      t = false, C();
    }));
  }
  function Y() {
    const H = e.getPreviewRoot(), $ = e.getView();
    if (!H || !$) return;
    const X = k($), W = P(H);
    if (!W) return;
    const pe = X.scrollTop, he = $.lineBlockAtHeight(pe), ge = $.state.doc.lineAt(he.from).number - 1, Be = fd(H, ge);
    if (!Be) return;
    const $e = he.height > 0 ? Math.max(0, Math.min(1, (pe - he.top) / he.height)) : 0, me = Jn(Be, W) + Be.offsetHeight * $e - co;
    fo(W, me);
  }
  function ne() {
    const H = e.getPreviewRoot(), $ = e.getView();
    if (!H || !$) return;
    const X = k($), W = P(H);
    if (!W) return;
    const pe = W.scrollTop + co, he = md(H, W, pe);
    if (!he) return;
    const { el: ge, line0: Be } = he, $e = Math.min(Math.max(1, Be + 1), $.state.doc.lines), Me = $.state.doc.line($e), me = $.lineBlockAt(Me.from), Ke = Jn(ge, W), Le = ge.offsetHeight > 0 ? Math.max(0, Math.min(1, (pe - Ke) / ge.offsetHeight)) : 0;
    fo(X, me.top + me.height * Le);
  }
  function se() {
    if (!N && !(R === "preview" || R === "follow")) {
      R = "editor";
      try {
        Y();
      } finally {
        Q("editor");
      }
    }
  }
  function ee() {
    if (!N && !(R === "editor" || R === "follow")) {
      R = "preview";
      try {
        ne();
      } finally {
        Q("preview");
      }
    }
  }
  function we() {
    N || R === "preview" || R === "follow" || c || (c = requestAnimationFrame(() => {
      c = 0, se();
    }));
  }
  function G() {
    N || R === "editor" || R === "follow" || u || (u = requestAnimationFrame(() => {
      u = 0, ee();
    }));
  }
  function re(H) {
    const $ = J(H.target);
    !$ || !_($, H.target) || (K($, H.target), $ === "editor" ? we() : G());
  }
  function oe(H) {
    const $ = J(H.target);
    $ && requestAnimationFrame(() => {
      const X = e.getView(), W = e.getPreviewRoot();
      $ === "editor" && X ? we() : $ === "preview" && W && (K("preview", pt(W)), G());
    });
  }
  function q(H) {
    const $ = H.target;
    if ($ instanceof HTMLImageElement && (j == null ? void 0 : j.contains($))) {
      z(), L();
      for (const X of lo) n.push(setTimeout(() => C(), X));
    }
  }
  function ie(H) {
    const $ = H.scrollDOM;
    return $ instanceof HTMLElement ? (p === $ || (p && p.removeEventListener("scroll", re), p = $, $.addEventListener("scroll", re, { passive: true })), true) : false;
  }
  function Xe(H) {
    const $ = pt(H);
    return $ ? (m === $ || (m && m.removeEventListener("scroll", re), m = $, T = $, $.addEventListener("scroll", re, { passive: true })), true) : false;
  }
  function Te(H, $) {
    const X = pd(H, $);
    return X ? (x === X || (x && (x.removeEventListener("scroll", re, true), x.removeEventListener("wheel", oe, true), x.removeEventListener("touchmove", oe, true)), x = X, X.addEventListener("scroll", re, { capture: true, passive: true }), X.addEventListener("wheel", oe, { capture: true, passive: true }), X.addEventListener("touchmove", oe, { capture: true, passive: true })), true) : false;
  }
  function Ye(H) {
    j !== H && (j && (j.removeEventListener("load", q, true), j.removeEventListener("error", q, true)), j = H, H.addEventListener("load", q, true), H.addEventListener("error", q, true));
  }
  function je() {
    N || r != null || a >= ud || (r = setTimeout(() => {
      if (r = null, a += 1, N) return;
      ye() || je();
    }, cd));
  }
  function ye() {
    if (N) return false;
    const H = e.getView(), $ = e.getPreviewRoot();
    let X = true;
    return H && ie(H) || (X = false), $ ? (Xe($) || (X = false), Ye($)) : X = false, Te(H, $) || (X = false), X;
  }
  function Ee(H) {
    if (!N && (ye() || je(), C(), !!(H == null ? void 0 : H.withRetries))) {
      L();
      for (const $ of lo) n.push(setTimeout(() => {
        N || (ye() || je(), C());
      }, $));
    }
  }
  function Oe() {
    N = true, L(), B(), I(), Z(), p && (p.removeEventListener("scroll", re), p = null), m && (m.removeEventListener("scroll", re), m = null), x && (x.removeEventListener("scroll", re, true), x.removeEventListener("wheel", oe, true), x.removeEventListener("touchmove", oe, true), x = null), j && (j.removeEventListener("load", q, true), j.removeEventListener("error", q, true), j = null), T = null, t = false, R = "none";
  }
  return B(), ye() || je(), Ee({ withRetries: true }), { schedule: Ee, stop: Oe };
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
function ar(e) {
  return Array.isArray(e) ? e.length <= mo ? e : e.slice(e.length - mo) : [""];
}
async function po({ key: e, stack: t, index: n }) {
  if (!e) return;
  const r = ar(t), a = Math.max(0, Math.min(n ?? r.length - 1, r.length - 1));
  await Dt.histories.put({ key: e, stack: r, index: a, updatedAt: Date.now() });
}
async function yd() {
  const e = Date.now() - xs;
  await Dt.histories.where("updatedAt").below(e).delete();
}
function tn(e, t, n) {
  const r = Array.isArray(e) && e.length > 0 ? [...e] : [""];
  let a = Math.max(0, Math.min(t, r.length - 1));
  const s = n ?? "";
  if (r[a] === s) return { stack: r, index: a };
  const c = r.lastIndexOf(s);
  if (c >= 0) return { stack: r, index: c };
  const u = r.slice(0, a + 1);
  u.push(s);
  const p = ar(u);
  return { stack: p, index: p.length - 1 };
}
function vd(e, t, n) {
  const r = n ?? "", a = Array.isArray(e) && e.length > 0 ? e : [""], s = Math.max(0, Math.min(t, a.length - 1));
  if (a[s] === r) return { stack: a, index: s, changed: false };
  for (let p = s - 1; p >= 0; p -= 1) if (a[p] === r) return { stack: a, index: p, changed: true };
  for (let p = s + 1; p < a.length; p += 1) if (a[p] === r) return { stack: a, index: p, changed: true };
  const c = a.slice(0, s + 1);
  c.push(r);
  const u = ar(c);
  return { stack: u, index: u.length - 1, changed: true };
}
function kd(e, t, n) {
  if (!(e == null ? void 0 : e.state) || !Array.isArray(t) || t.length === 0) return n == null ? void 0 : n(), false;
  const r = t[t.length - 1] ?? "";
  if (t.length === 1) return e.state.doc.toString() !== r && e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: r }, annotations: [wn.addToHistory.of(false)] }), n == null ? void 0 : n(), true;
  e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: t[0] ?? "" }, annotations: [wn.addToHistory.of(false), ur.of("full")] }), n == null ? void 0 : n();
  for (let s = 1; s < t.length; s += 1) {
    const c = t[s] ?? "";
    e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: c }, annotations: [ur.of("full")] });
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
function Ed({ currentFile: e, value: t, onChange: n, editorRef: r, enabled: a = true }) {
  const s = a ? bd(e) : null, c = l.useRef([""]), u = l.useRef(0), p = l.useRef(null), m = l.useRef(false), x = l.useRef(null), T = l.useRef(null), j = l.useRef(t), R = l.useRef(false), N = l.useRef(null), L = l.useRef(0), B = l.useRef(t);
  j.current = t;
  const I = l.useCallback(async (_, C, z) => {
    if (_) try {
      await po({ key: _, stack: C, index: z });
    } catch (Y) {
      console.warn("[editor-undo-history] save failed:", Y);
    }
  }, []), Z = l.useCallback((_, C, z) => {
    _ && (T.current && clearTimeout(T.current), T.current = setTimeout(() => {
      T.current = null, I(_, C, z);
    }, 300));
  }, [I]), Q = l.useCallback(() => {
    x.current && (clearTimeout(x.current), x.current = null);
  }, []), k = l.useCallback(() => {
    const _ = j.current ?? "", C = tn(c.current, u.current, _);
    return c.current = C.stack, u.current = C.index, C;
  }, []), P = l.useCallback((_) => {
    const C = go(r), z = Cd(C), Y = ho(C);
    if (!z) return false;
    const ne = ++L.current;
    m.current = true;
    try {
      kd(z, _, Y ?? void 0);
    } finally {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          L.current === ne && (m.current = false);
        });
      });
    }
    return true;
  }, [r]), J = l.useCallback((_, C) => {
    var _a2, _b;
    const z = j.current ?? "", Y = ((_a2 = C == null ? void 0 : C.stack) == null ? void 0 : _a2.length) ? C.stack : [z], ne = ((_b = C == null ? void 0 : C.stack) == null ? void 0 : _b.length) ? C.index ?? C.stack.length - 1 : 0, se = tn(Y, ne, z);
    c.current = se.stack, u.current = se.index, N.current = _, R.current = false, B.current = z;
    const ee = se.stack.slice(0, se.index + 1), we = (G) => {
      p.current === _ && (P(ee) || G <= 0 || setTimeout(() => we(G - 1), 50));
    };
    we(40), Z(_, se.stack, se.index);
  }, [P, Z]);
  return l.useEffect(() => {
    a && yd().catch(() => {
    });
  }, [a]), l.useEffect(() => {
    var _a2;
    if (!a) return;
    const _ = p.current, C = s;
    if (Q(), T.current && (clearTimeout(T.current), T.current = null), _ && _ !== C) {
      const se = k();
      I(_, se.stack, se.index);
    }
    p.current = C, N.current = null, R.current = false;
    const z = go(r);
    if ((_a2 = ho(z)) == null ? void 0 : _a2(), !C) {
      c.current = [j.current ?? ""], u.current = 0;
      return;
    }
    const Y = ++L.current;
    let ne = false;
    return (async () => {
      let se = null;
      try {
        se = await wd(C);
      } catch (ee) {
        console.warn("[editor-undo-history] load failed:", ee);
      }
      ne || L.current !== Y || p.current === C && J(C, se);
    })(), () => {
      ne = true;
    };
  }, [a, s, r, Q, k, I, J]), l.useEffect(() => {
    if (!a || !s || N.current !== s || R.current || m.current || t === B.current) return;
    const _ = t ?? "";
    B.current = _;
    const C = tn(c.current, u.current, _);
    c.current = C.stack, u.current = C.index, P(C.stack.slice(0, C.index + 1)), Z(s, C.stack, C.index);
  }, [a, s, t, P, Z]), l.useEffect(() => {
    if (a) return () => {
      Q(), T.current && (clearTimeout(T.current), T.current = null);
      const _ = p.current;
      if (!_) return;
      const C = tn(c.current, u.current, j.current ?? "");
      po({ key: _, stack: C.stack, index: C.index }).catch(() => {
      });
    };
  }, [a, Q]), { onChange: l.useCallback((_) => {
    m.current || (B.current = _, R.current = true, n == null ? void 0 : n(_), !(!a || !p.current) && (Q(), x.current = setTimeout(() => {
      if (x.current = null, m.current) return;
      const C = p.current;
      if (!C) return;
      const z = vd(c.current, u.current, _);
      z.changed && (c.current = z.stack, u.current = z.index, Z(C, z.stack, z.index));
    }, gd)));
  }, [a, n, Q, Z]) };
}
const ir = /^(\s*)([-+*])(\s+)(.*)$/, lr = /^(\s*)(\d+)([.)])(\s+)(.*)$/, bs = /^(\s*(?:[-+*]|\d+[.)])\s+)\[([ xX])\](.*)$/, Sd = /^(#{1,10})\s+(.*)$/;
function Nd(e) {
  if (!e) return false;
  const t = e[0];
  return [...e].every((n) => n === t);
}
function ws(e, t, n, r, a) {
  const s = t - r.length, c = n + a.length;
  if (s < 0 || c > e.length || e.sliceString(s, t) !== r || e.sliceString(n, c) !== a) return false;
  if (r === a && Nd(r)) {
    const u = r[0] ?? "";
    if (s > 0 && e.sliceString(s - 1, s) === u || c < e.length && e.sliceString(c, c + 1) === u) return false;
  }
  return true;
}
function jd(e, t, n, r) {
  const { from: a, to: s, empty: c } = t;
  if (c) {
    const m = `${n}${r}`;
    return { change: { from: a, to: s, insert: m }, next: De.cursor(a + n.length) };
  }
  const u = e.sliceString(a, s);
  if (u.length >= n.length + r.length && u.startsWith(n) && u.endsWith(r)) {
    const m = u.slice(n.length, u.length - r.length);
    return { change: { from: a, to: s, insert: m }, next: De.range(a, a + m.length) };
  }
  if (ws(e, a, s, n, r)) {
    const m = a - n.length, x = s + r.length;
    return { change: { from: m, to: x, insert: u }, next: De.range(m, m + u.length) };
  }
  const p = `${n}${u}${r}`;
  return { change: { from: a, to: s, insert: p }, next: De.range(a + n.length, a + n.length + u.length) };
}
function Md(e, t) {
  if (t.empty) return null;
  const n = e.sliceString(t.from, t.to);
  if (!n) return null;
  let r = "`";
  for (; n.includes(r); ) r += "`";
  if (!n.includes(`
`) && n.startsWith(r) && n.endsWith(r) && n.length > r.length * 2) {
    const c = n.slice(r.length, n.length - r.length);
    return { change: { from: t.from, to: t.to, insert: c }, next: De.range(t.from, t.from + c.length) };
  }
  if (ws(e, t.from, t.to, r, r)) {
    const c = t.from - r.length, u = t.to + r.length;
    return { change: { from: c, to: u, insert: n }, next: De.range(c, c + n.length) };
  }
  const s = `${r}${n}${r}`;
  return { change: { from: t.from, to: t.to, insert: s }, next: De.range(t.from + r.length, t.from + r.length + n.length) };
}
function ys(e, t) {
  if (!t.length) return false;
  const n = t.map((a) => a.change).filter((a) => !!a).sort((a, s) => a.from - s.from);
  if (!n.length) return false;
  const r = t.map((a) => a.next);
  return e.dispatch({ changes: n, selection: De.create(r, e.state.selection.mainIndex) }), true;
}
function wt(e, t, n = t) {
  if (!(e == null ? void 0 : e.state) || !t) return false;
  const r = e.state.selection.ranges.map((a) => jd(e.state.doc, a, t, n));
  return ys(e, r);
}
function Rd(e) {
  return wt(e, "**");
}
function Td(e) {
  return wt(e, "*");
}
function Ld(e) {
  return wt(e, "~~");
}
function Pd(e) {
  return wt(e, "<u>", "</u>");
}
function Ad(e) {
  return wt(e, "^");
}
function Dd(e) {
  return wt(e, "~");
}
function vs(e) {
  if (!(e == null ? void 0 : e.state)) return false;
  const t = e.state.selection.ranges.map((n) => Md(e.state.doc, n) ?? { next: n });
  return ys(e, t);
}
function Id(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e.state.selection.ranges) {
    const r = e.state.doc.lineAt(n.from).number, a = e.state.doc.lineAt(n.to).number;
    for (let s = r; s <= a; s += 1) t.add(s);
  }
  return [...t].sort((n, r) => n - r);
}
function Ft(e, t) {
  if (!(e == null ? void 0 : e.state)) return false;
  const n = [];
  for (const r of Id(e)) {
    const a = e.state.doc.line(r), s = t(a.text);
    s !== null && s !== a.text && n.push({ from: a.from, to: a.to, insert: s });
  }
  return n.length ? (e.dispatch({ changes: n }), true) : false;
}
function $d(e) {
  const t = e.match(ir);
  if (t) return `${t[1] ?? ""}1. ${t[4] ?? ""}`;
  const n = e.match(lr);
  return n ? `${n[1] ?? ""}- ${n[5] ?? ""}` : null;
}
function Fd(e) {
  const t = e.match(bs);
  if (!t) return null;
  const n = t[1] ?? "", r = t[2] ?? " ", a = t[3] ?? "";
  return `${n}[${r === " " ? "x" : " "}]${a}`;
}
function _d(e) {
  return Ft(e, $d);
}
function Hd(e) {
  return Ft(e, Fd);
}
function Od(e) {
  return Ft(e, (t) => {
    const n = t.match(ir);
    if (n) {
      const a = n[1] ?? "", s = n[4] ?? "";
      return bs.test(t) ? `${a}- ${s.replace(/^\[[ xX]\]\s?/, "")}` : `${a}${s}`;
    }
    const r = t.match(lr);
    return r ? `${r[1] ?? ""}- ${r[5] ?? ""}` : `- ${t}`;
  });
}
function Bd(e) {
  return Ft(e, (t) => {
    const n = t.match(lr);
    if (n) return `${n[1] ?? ""}${n[5] ?? ""}`;
    const r = t.match(ir);
    return r ? `${r[1] ?? ""}1. ${r[4] ?? ""}` : `1. ${t}`;
  });
}
function xo(e, t) {
  if (t < 1 || t > 10) return false;
  const n = "#".repeat(t);
  return Ft(e, (r) => {
    var _a2;
    const a = r.match(Sd);
    return a ? ((_a2 = a[1]) == null ? void 0 : _a2.length) === t ? a[2] ?? "" : `${n} ${a[2] ?? ""}` : `${n} ${r}`;
  });
}
function yt(e, t, n = t) {
  if (!(e == null ? void 0 : e.state) || !t) return false;
  const r = e.state.changeByRange((a) => {
    if (a.empty) return { range: a };
    const s = e.state.doc.sliceString(a.from, a.to), c = `${t}${s}${n}`;
    return { changes: { from: a.from, to: a.to, insert: c }, range: De.range(a.from + t.length, a.from + t.length + s.length) };
  });
  return r.changes.empty ? false : (e.dispatch(r), true);
}
function Kd(e) {
  return yt(e, "$");
}
function zd(e) {
  return yt(e, "[", "]");
}
function Vd(e) {
  return yt(e, "(", ")");
}
function Wd(e) {
  return yt(e, "{", "}");
}
function bo(e) {
  return yt(e, "'");
}
function wo(e) {
  return yt(e, '"');
}
const qd = "s3haim_md_editor_toc_width", Ud = 360;
function yo(e) {
  const t = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform), n = [];
  (t ? e.metaKey : e.ctrlKey) && n.push("mod"), e.altKey && n.push("alt"), e.shiftKey && n.push("shift");
  const r = (e.key || "").toLowerCase();
  return !r || r === "shift" || r === "control" || r === "alt" || r === "meta" || (n.push(r), n.length <= 1) ? null : n.join("+");
}
function nn(e) {
  return !e || typeof e != "string" ? "" : e.toLowerCase().replace(/\bctrl\b/g, "mod").replace(/\bmeta\b/g, "mod").trim();
}
const Xd = Fs({ nonTightLists: false });
function Yd(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const { state: t } = e, n = (_b = (_a2 = t.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof n != "number") return;
  const r = t.doc.lineAt(n);
  if (!/^(\s*)([-+*]|\d+[.)]|\[[ xX]\])/.test(r.text) || r.number < 2) return;
  const a = t.doc.line(r.number - 1);
  if (a.text.trim() !== "") return;
  const s = r.from - a.from;
  e.dispatch({ changes: { from: a.from, to: r.from, insert: "" }, selection: De.cursor(n - s) });
}
function Gd(e) {
  return Xd(e) ? (Yd(e), true) : Wc(e) ? true : $s(e);
}
const Qd = Ds.highest(Ro.of([{ key: "Enter", run: Gd }]));
function Jd(e) {
  var _a2, _b;
  if (!(e == null ? void 0 : e.state)) return;
  const t = (_b = (_a2 = e.state.selection) == null ? void 0 : _a2.main) == null ? void 0 : _b.head;
  if (typeof t != "number") return;
  const n = e.state.doc.lineAt(t);
  e.dispatch({ changes: { from: n.from, to: n.from, insert: `
` }, selection: { anchor: n.from } });
}
function Zd(e) {
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
function rn(e, t) {
  return Ni() ? t(e) : false;
}
const ef = [{ key: "Alt-h", preventDefault: true, run: (e) => rn(e, ta) }, { key: "Alt-j", preventDefault: true, run: (e) => rn(e, na) }, { key: "Alt-k", preventDefault: true, run: (e) => rn(e, ra) }, { key: "Alt-l", preventDefault: true, run: (e) => rn(e, oa) }];
Is({ editorConfig: { languageUserDefined: { "ko-KR": _s }, renderDelay: Ho() ? 500 : 0 }, codeMirrorExtensions(e, { keyBindings: t }) {
  const n = [...e].filter((s) => s.type !== "keymap" && s.type !== "linkShortener" && s.type !== "lineNumbers"), r = (t || []).filter((s) => {
    const c = String((s == null ? void 0 : s.key) || "").toLowerCase(), u = String((s == null ? void 0 : s.mac) || "").toLowerCase();
    return c !== "ctrl-d" && c !== "mod-d" && u !== "cmd-d" && c !== "ctrl-b" && c !== "mod-b" && u !== "cmd-b" && c !== "ctrl-u" && c !== "mod-u" && u !== "cmd-u" && c !== "ctrl-o" && c !== "mod-o" && u !== "cmd-o" && c !== "ctrl-arrowup" && c !== "mod-arrowup" && u !== "cmd-arrowup" && c !== "ctrl-arrowdown" && c !== "mod-arrowdown" && u !== "cmd-arrowdown" && !/^ctrl-[0-9]$/.test(c) && !/^mod-[0-9]$/.test(c) && !/^cmd-[0-9]$/.test(u);
  }), a = [{ key: "ArrowLeft", run: (s) => Nr(s, -1) }, { key: "ArrowRight", run: (s) => Nr(s, 1) }, { key: "Ctrl-ArrowLeft", mac: "Alt-ArrowLeft", run: (s) => qe(s, -1, Xs), shift: (s) => qe(s, -1, Us) }, { key: "Ctrl-ArrowRight", mac: "Alt-ArrowRight", run: (s) => qe(s, 1, Gs), shift: (s) => qe(s, 1, Ys) }, { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: (s) => qe(s, -1, Js), shift: (s) => qe(s, -1, Qs) }, { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: (s) => qe(s, 1, ea), shift: (s) => qe(s, 1, Zs) }, ...ef, { key: "Alt--", preventDefault: true, run: _d }, { key: "Ctrl-Tab", run: Hd }, { key: "Ctrl-d", mac: "Cmd-d", preventDefault: true, run: (s) => (Bs(s), true) }, { key: "Ctrl-b", mac: "Cmd-b", preventDefault: true, run: Rd }, { key: "Ctrl-i", mac: "Cmd-i", preventDefault: true, run: Td }, { key: "Ctrl-u", mac: "Cmd-u", preventDefault: true, run: Pd, shift: Od }, { key: "Ctrl-o", mac: "Cmd-o", preventDefault: true, run: Bd }, { key: "Shift-Ctrl-s", mac: "Shift-Cmd-s", preventDefault: true, run: Ld }, { key: "Ctrl-ArrowUp", mac: "Cmd-ArrowUp", preventDefault: true, run: Ad }, { key: "Ctrl-ArrowDown", mac: "Cmd-ArrowDown", preventDefault: true, run: Dd }, ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => ({ key: `Ctrl-${s}`, mac: `Cmd-${s}`, preventDefault: true, run: (c) => xo(c, s) })), { key: "Ctrl-0", mac: "Cmd-0", preventDefault: true, run: (s) => xo(s, 10) }, { any: (s, c) => (c.ctrlKey || c.metaKey) && c.altKey && c.code === "KeyC" ? vs(s) : ks(s, c) }, { key: "Mod-Alt-ArrowUp", run: Hs }, { key: "Mod-Alt-ArrowDown", run: Os }, ...r];
  return n.some((s) => s.type === "drawSelection") || n.push({ type: "drawSelection", extension: Ks() }), n.push({ type: "markdownSingleNewlineEnter", extension: Qd }, { type: "lineNumbers", extension: Hu() }, { type: "allowMultipleSelections", extension: zs.allowMultipleSelections.of(true) }, { type: "clickAddsSelectionRange", extension: Lt.clickAddsSelectionRange.of((s) => {
    const c = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    return s.altKey || (c ? s.metaKey : s.ctrlKey);
  }) }, { type: "multiCursorPreview", extension: Vs({ minSelectionLength: 2, maxMatches: 200 }) }, { type: "keymap", extension: Ro.of(a) }, { type: "base64ImageFold", extension: $c(Gn()) }, { type: "mermaidBase64Fold", extension: Kc(Gn()) }, { type: "autocompleteGate", extension: Lt.updateListener.of((s) => {
    ad(s), !Do() && Ws(s.state) === "active" && qs(s.view);
  }) }), n;
}, markdownItPlugins(e) {
  return Ei(e);
} });
function vf({ value: e, onChange: t, onSave: n, theme: r = "light", currentFile: a = null, previewOnly: s = false, isMobileLayout: c = false, onUploadImage: u, isUploadingEditorImage: p = false, uploadImagePercent: m = 0, onCancelUploadImage: x, onResolveWikiImageUrl: T, snippetConfig: j = { snippets: [] }, llmProviderProfiles: R = [], getImgbbApiKey: N, onOpenViewPath: L, onRequestConvertAllImagesToWiki: B, onRegisterConvertAllImagesToWiki: I, isActiveFile: Z = true }) {
  var _a2, _b;
  const Q = Va(), k = vo(), { showAlert: P } = Wa(), J = l.useId(), K = l.useMemo(() => Wl(J), [J]), _ = l.useMemo(() => ql(K), [K]), C = l.useRef(null), z = l.useRef(null), Y = l.useRef(null), ne = l.useRef(null), se = l.useRef(j), ee = l.useRef(e), we = l.useRef(a), G = l.useRef(r), re = l.useRef("");
  l.useEffect(() => {
    ee.current = e, we.current = a, G.current = r;
  }, [e, a, r]), l.useEffect(() => {
    const { issues: f } = _o(e ?? "");
    if (!f.length) {
      re.current = "";
      return;
    }
    const h = qa(f);
    h !== re.current && (re.current = h, P({ title: "Cover syntax error", message: `note-cover has invalid syntax.

${h}` }));
  }, [e, P]);
  const oe = l.useCallback((f = {}) => {
    const h = ee.current ?? "", g = we.current;
    Po({ currentFile: g, editorContent: h }), k(Ao(g == null ? void 0 : g.id), { state: { value: h, theme: G.current === "dark" ? "dark" : "light", currentFile: g, ...f.openCoverEdit ? { openCoverEdit: true } : {} } });
  }, [k]), { onChange: q } = Ed({ currentFile: a, value: e, onChange: t, editorRef: C, enabled: !s }), ie = Eu({ getMarkdown: () => ee.current ?? "", setMarkdown: (f) => {
    typeof t == "function" && t(f);
  } }), Xe = l.useRef(ie.openAtOffset), Te = l.useRef(ie.openPreviewTable);
  l.useEffect(() => {
    Xe.current = ie.openAtOffset, Te.current = ie.openPreviewTable;
  }, [ie.openAtOffset, ie.openPreviewTable]);
  const Ye = l.useRef(null), [je, ye] = l.useState(false), [Ee, Oe] = l.useState(null), H = l.useRef(() => {
  }), [$, X] = l.useState(false), [W, pe] = l.useState(null), [he, ge] = l.useState(0), [Be, $e] = l.useState(false), [Me, me] = l.useState(false), Ke = l.useRef({ from: 0, to: 0 }), Le = l.useRef(q);
  l.useEffect(() => {
    Le.current = q;
  }, [q]);
  const [Ge, Qe] = l.useState(null), [xe, Je] = l.useState(null), [vt, Pe] = l.useState(false), [Ze, kt] = l.useState(null), [_t, lt] = l.useState(false), [ve, be] = l.useState(null), [fe, ke] = l.useState(null), le = l.useRef(null), [ct, Ct] = Cl(), [Ve, ut] = jc(), [Ht, Ot] = Mc(), [gn, dt] = Rc(), Re = l.useMemo(() => Ho(), []), ue = Re ? false : gn, Ce = l.useRef(null);
  l.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3, _b2, _c2;
      const y = (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      y && (Ce.current = y.state.selection);
    }, h = (w) => {
      !(w.metaKey || w.ctrlKey) || w.altKey || w.shiftKey || w.key.toLowerCase() === "k" && f();
    };
    window.addEventListener("keydown", h, true);
    const g = Ua(f);
    return () => {
      window.removeEventListener("keydown", h, true), g();
    };
  }, [s]), l.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3;
      return ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current;
    }, h = () => {
      var _a3, _b2;
      const D = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3), O = Ce.current;
      !D || !O || D.dispatch({ selection: O, scrollIntoView: true });
    }, g = (S) => {
      var _a3;
      const D = f();
      D && (h(), (_a3 = D.focus) == null ? void 0 : _a3.call(D), typeof D.execCommand == "function" && D.execCommand(S));
    }, w = () => {
      var _a3, _b2, _c2;
      const S = f();
      if (!S) return;
      const D = `

<pgbr/>

`;
      if (typeof S.insert == "function") {
        S.insert(() => ({ targetValue: D, select: false, deviationStart: 0, deviationEnd: 0 })), (_a3 = S.focus) == null ? void 0 : _a3.call(S);
        return;
      }
      const O = (_b2 = S.getEditorView) == null ? void 0 : _b2.call(S);
      O && (O.dispatch(O.state.replaceSelection(D)), (_c2 = O.focus) == null ? void 0 : _c2.call(O));
    }, y = (S = {}) => {
      oe(S);
    }, M = {};
    for (const S of Xa) S.directive && (M[S.id] = () => g(S.directive));
    return M["editor-revoke"] = () => {
      var _a3, _b2;
      h();
      const S = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      S && (S.focus(), Ls(S));
    }, M["editor-next"] = () => {
      var _a3, _b2;
      h();
      const S = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      S && (S.focus(), Ps(S));
    }, M["editor-llm-assist"] = () => {
      var _a3;
      return (_a3 = Q == null ? void 0 : Q.toggleAssist) == null ? void 0 : _a3.call(Q);
    }, M["editor-export-pdf"] = y, M["editor-pgbr"] = () => {
      h(), w();
    }, M["editor-heading-remap"] = () => {
      h(), H.current();
    }, M["editor-checklist-progress"] = () => X(true), M["editor-table-edit"] = () => {
      var _a3, _b2;
      h();
      const S = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      if (!S) return;
      const { from: D, to: O } = S.state.selection.main;
      Xe.current(D, O) || P({ title: "No table", message: "No haim-table found at the cursor or selection position." });
    }, M["editor-image-upload"] = () => {
      const S = document.createElement("input");
      S.type = "file", S.accept = "image/*", S.multiple = true, S.onchange = () => {
        var _a3;
        const D = Array.from(S.files || []);
        D.length && ((_a3 = Ye.current) == null ? void 0 : _a3.call(Ye, D));
      }, S.click();
    }, M["editor-image-clip"] = () => {
      const S = document.createElement("input");
      S.type = "file", S.accept = "image/*", S.onchange = () => {
        var _a3;
        const D = (_a3 = S.files) == null ? void 0 : _a3[0];
        D && Qe(D);
      }, S.click();
    }, M["editor-convert-all-images-to-wiki"] = () => {
      typeof B == "function" && B();
    }, M["editor-insert-footnote"] = () => {
      br({ mode: "footnote-insert" });
    }, M["editor-insert-circle-number"] = (S) => {
      var _a3, _b2, _c2;
      const D = typeof S == "string" ? S : "";
      if (!D) {
        br({ mode: "circle-number" });
        return;
      }
      h();
      const U = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      U && (U.dispatch(U.state.replaceSelection(D)), (_c2 = U.focus) == null ? void 0 : _c2.call(U));
    }, M["editor-insert-snippet"] = (S) => {
      var _a3, _b2, _c2;
      const D = typeof S == "string" ? S : "";
      if (!D) return;
      h();
      const U = (_b2 = (_a3 = f()) == null ? void 0 : _a3.getEditorView) == null ? void 0 : _b2.call(_a3);
      U && (U.dispatch(U.state.replaceSelection(D)), (_c2 = U.focus) == null ? void 0 : _c2.call(U));
    }, Ya(M);
  }, [s, oe, P, B, Q]), l.useEffect(() => {
    if (!(s || !Z || !(Q == null ? void 0 : Q.registerEditorBridge))) return Q.registerEditorBridge({ editorRef: C, onChange: q, getMarkdown: () => {
      var _a3, _b2, _c2, _d2, _e2, _f, _g;
      return ((_g = (_f = (_e2 = (_d2 = (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) == null ? void 0 : _d2.state) == null ? void 0 : _e2.doc) == null ? void 0 : _f.toString) == null ? void 0 : _g.call(_f)) ?? ee.current ?? "";
    } });
  }, [s, Z, Q, q]), l.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3, _b2, _c2;
      return ((_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? null;
    }, h = () => {
      const w = f(), y = Ce.current;
      !w || !y || w.dispatch({ selection: y, scrollIntoView: true });
    }, g = (w, y) => {
      var _a3, _b2;
      const M = f();
      M && (M.dispatch({ changes: { from: 0, to: M.state.doc.length, insert: w }, selection: { anchor: y }, scrollIntoView: true }), (_a3 = M.focus) == null ? void 0 : _a3.call(M)), (_b2 = Le.current) == null ? void 0 : _b2.call(Le, w);
    };
    return Ga({ getMarkdown: () => {
      var _a3;
      return ((_a3 = f()) == null ? void 0 : _a3.state.doc.toString()) ?? ee.current ?? "";
    }, insertExisting: (w) => {
      h();
      const y = f(), M = (y == null ? void 0 : y.state.doc.toString()) ?? ee.current ?? "", S = y == null ? void 0 : y.state.selection.main, D = Si(M, (S == null ? void 0 : S.from) ?? 0, (S == null ? void 0 : S.to) ?? 0, w);
      g(D.next, D.caret);
    }, openCompose: () => {
      var _a3;
      h();
      const y = (_a3 = f()) == null ? void 0 : _a3.state.selection.main;
      Ke.current = { from: (y == null ? void 0 : y.from) ?? 0, to: (y == null ? void 0 : y.to) ?? 0 }, me(true);
    } });
  }, [s]);
  const { width: Fe, isResizing: Bt, handleProps: Kt } = Qa({ storageKey: qd, defaultWidth: Ud, minWidth: 160, collapseBelowWidth: 80, maxWidth: 640, edge: "right", onCollapseBelowMin: () => {
    var _a3, _b2, _c2;
    (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.toggleCatalog) == null ? void 0 : _c2.call(_b2, false);
  } }), et = l.useMemo(() => {
    const { meta: f } = Ja(e ?? "");
    return f;
  }, [e]), zt = l.useMemo(() => {
    const f = et == null ? void 0 : et.fonts;
    return f ? { "--print-font-body": Gt(f.body), "--print-font-heading": Gt(f.heading), "--print-font-bold": Gt(f.bold), "--print-font-code": Gt(f.code, "mono") } : {};
  }, [et]);
  l.useEffect(() => {
    se.current = j || { snippets: [] };
  }, [j]), l.useEffect(() => {
    const f = () => {
      var _a3, _b2, _c2;
      const y = (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return y ? (Fc(y, Ve), zc(y, Ve), true) : false;
    };
    if (f()) return;
    const h = window.setTimeout(f, 50), g = window.setTimeout(f, 250);
    return () => {
      window.clearTimeout(h), window.clearTimeout(g);
    };
  }, [Ve]), l.useEffect(() => {
    const f = z.current;
    if (!f) return;
    const h = () => {
      const w = f.querySelector(".md-editor-catalog-fixed, .md-editor-catalog-flat");
      be((y) => y === w ? y : w);
    };
    h();
    const g = new MutationObserver(h);
    return g.observe(f, { childList: true, subtree: true }), () => g.disconnect();
  }, []), l.useEffect(() => {
    const f = z.current;
    f && f.style.setProperty("--md-catalog-width", `${Fe}px`);
  }, [Fe]), l.useLayoutEffect(() => {
    if (!ve) {
      ke(null);
      return;
    }
    const f = () => {
      const w = ve.getBoundingClientRect();
      if (w.width <= 0 || w.height <= 0) {
        ke(null);
        return;
      }
      ke({ top: w.top, left: w.left, height: w.height });
    };
    f();
    const h = new ResizeObserver(f);
    h.observe(ve);
    const g = z.current;
    return g && h.observe(g), window.addEventListener("resize", f), window.addEventListener("scroll", f, true), () => {
      h.disconnect(), window.removeEventListener("resize", f), window.removeEventListener("scroll", f, true);
    };
  }, [ve, Fe]), l.useEffect(() => {
    if (ve) return Ql(ve, { getEditorRoot: () => z.current, mdHeadingId: (f) => _(f) });
  }, [ve, _]), jl(z, e, T, (a == null ? void 0 : a.id) ?? null), Za(z, { layoutKey: `${r}|${e}` }), l.useEffect(() => {
    const f = z.current;
    if (!f || !e) return;
    let h = 0;
    const g = () => {
      Vu(f, e, T);
    }, w = () => {
      const O = f.querySelectorAll("[data-note-cover-mount]");
      !O.length || !(f.querySelector(".md-note-cover-placeholder--pending") || [...O].some((de) => de.childNodes.length === 0)) || h || (h = window.requestAnimationFrame(() => {
        h = 0, g();
      }));
    }, M = [0, 80, 280, 600, 1100, 2e3].map((O) => setTimeout(g, O)), S = f.querySelector(".md-editor-preview") || f, D = typeof MutationObserver < "u" ? new MutationObserver(w) : null;
    return D == null ? void 0 : D.observe(S, { childList: true, subtree: true }), () => {
      h && window.cancelAnimationFrame(h), M.forEach((O) => clearTimeout(O)), D == null ? void 0 : D.disconnect();
    };
  }, [e, T, a == null ? void 0 : a.id]), l.useEffect(() => {
    const f = z.current;
    return () => {
      Wu(f);
    };
  }, []), l.useEffect(() => {
    if (s) return;
    const f = Nu(a), h = () => {
      var _a3, _b2, _c2;
      const y = (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return y ? (Pu(y, f), true) : false;
    };
    if (h()) return;
    const g = [50, 200, 500, 1e3].map((w) => setTimeout(h, w));
    return () => g.forEach((w) => clearTimeout(w));
  }, [a == null ? void 0 : a.id, a == null ? void 0 : a.type, s]), l.useEffect(() => {
    var _a3, _b2, _c2;
    if (s) return;
    const h = (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    ei(h);
  }, [a == null ? void 0 : a.id, s]), l.useEffect(() => {
    if (s) return;
    let f = null, h = null;
    const g = () => {
      var _a3, _b2, _c2;
      const M = (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      return !M || M === h ? !!M : (f == null ? void 0 : f(), h = M, f = gi(M), true);
    };
    if (g()) return () => {
      f == null ? void 0 : f();
    };
    const w = [50, 200, 500, 1e3].map((y) => setTimeout(g, y));
    return () => {
      w.forEach((y) => clearTimeout(y)), f == null ? void 0 : f();
    };
  }, [s, a == null ? void 0 : a.id]), l.useEffect(() => {
    const f = z.current;
    if (!f) return;
    const h = nd(a), g = { current: [] };
    let w = false, y = null, M = null, S = [];
    const D = () => f.querySelector(".md-editor-preview"), O = () => {
      if (w) return;
      const te = D();
      if (!te || !Qu(te)) return;
      const Se = ed(te, { collapsedIds: g.current, onCollapsedChange: (d) => {
        g.current = d, h && od(h, d);
      } }), i = y;
      y = () => {
        i == null ? void 0 : i(), Se();
      };
    }, U = (te) => {
      !te || M || typeof MutationObserver > "u" || (M = new MutationObserver(O), M.observe(te, { childList: true, subtree: true }));
    };
    return (async () => {
      if (h) {
        const te = await rd(h);
        if (w) return;
        te && (g.current = te);
      }
      w || (U(D()), O(), S = [80, 250, 600].map((te) => setTimeout(() => {
        w || (U(D()), O());
      }, te)));
    })(), () => {
      w = true, S.forEach((te) => clearTimeout(te)), M == null ? void 0 : M.disconnect(), M = null, y == null ? void 0 : y(), y = null;
    };
  }, [a == null ? void 0 : a.id, a == null ? void 0 : a.type]), l.useEffect(() => {
    var _a3, _b2, _c2;
    if (!s) return;
    (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c2.call(_b2, true);
  }, [s]), l.useEffect(() => {
    if (!c || s || !(a == null ? void 0 : a.id)) return;
    dt(false);
    const f = () => {
      var _a3, _b2, _c2;
      (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.togglePreviewOnly) == null ? void 0 : _c2.call(_b2, true);
    };
    f();
    const h = [80, 240, 600].map((g) => setTimeout(f, g));
    return () => {
      h.forEach((g) => clearTimeout(g));
    };
  }, [c, s, a == null ? void 0 : a.id, dt]), l.useEffect(() => {
    if (s || Re) return;
    const f = z.current;
    if (!f) return;
    const h = () => f.querySelector(".md-editor-preview"), g = () => ue;
    let w = null;
    const y = (i) => i instanceof Element ? Sn(i) ? true : !!i.closest("a, button, input, textarea, select, .md-editor-code-action, [data-transform-handle]") : false, M = (i) => {
      var _a3, _b2, _c2, _d2, _e2, _f;
      const d = h();
      if (!d || Tt(d)) return;
      if (!g()) {
        const A = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window);
        (A == null ? void 0 : A.rangeCount) && d.contains(A.getRangeAt(0).commonAncestorContainer) && !A.getRangeAt(0).collapsed ? jn(d, { allowCollapsed: false }) : jt(d);
        return;
      }
      const b = (_b2 = window.getSelection) == null ? void 0 : _b2.call(window);
      if (!b || b.rangeCount === 0) {
        if (!(i instanceof Element) || !i.closest("td, th")) return;
      } else {
        const A = b.getRangeAt(0);
        if (!d.contains(A.commonAncestorContainer) && !(i instanceof Element && i.closest("td, th"))) return;
      }
      const v = (_e2 = (_d2 = ((_c2 = C.current) == null ? void 0 : _c2.value) ?? C.current) == null ? void 0 : _d2.getEditorView) == null ? void 0 : _e2.call(_d2);
      v && ((b == null ? void 0 : b.rangeCount) && d.contains(b.getRangeAt(0).commonAncestorContainer) && jn(d, { allowCollapsed: true }), Cr(v, d, { focus: true, target: i }), Mn(), (_f = ne.current) == null ? void 0 : _f.schedule({ withRetries: true }));
    }, S = (i) => i.button === 2 || i.button === 0 && i.ctrlKey, D = (i, d) => Er(d, i.clientX, i.clientY) ? true : Sr(i.clientX, i.clientY) ? Ci(d) : false, O = (i) => {
      var _a3, _b2, _c2, _d2;
      const d = h();
      if (!d) return;
      const b = i.target;
      if (!(b instanceof Node)) return;
      if (d.contains(b) && S(i)) {
        D(i, d);
        return;
      }
      if (d.contains(b)) {
        w = { x: i.clientX, y: i.clientY }, !Sn(b) && !g() && jt(d);
        return;
      }
      if (w = null, (_d2 = (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) == null ? void 0 : _d2.dom.contains(b)) {
        if (S(i)) return;
        Rn(), g() || jt(d);
      }
    }, U = (i) => {
      const d = h();
      !d || !(i.target instanceof Node) || !d.contains(i.target) || D(i, d);
    }, de = (i) => {
      var _a3, _b2, _c2;
      if (S(i)) return;
      const d = h();
      if (!(!d || !(i.target instanceof Node) || !d.contains(i.target)) && !y(i.target)) {
        if (Nn(f)) {
          const b = !!(w && Math.hypot(i.clientX - w.x, i.clientY - w.y) > 6);
          if (w = null, !g() || b) return;
          const v = (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), A = i.target instanceof Element ? vr(i.target, d) : null;
          v && A && (Mn(), kr(A, v, d, i.clientX, i.clientY));
          return;
        }
        w = null, requestAnimationFrame(() => M(i.target));
      }
    }, te = (i) => {
      var _a3, _b2, _c2, _d2;
      const d = h();
      if (!(!d || !(i.target instanceof Node) || !d.contains(i.target)) && !y(i.target)) {
        if (Nn(f)) {
          if (!g()) return;
          const E = (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), v = (_d2 = i.changedTouches) == null ? void 0 : _d2[0], A = i.target instanceof Element ? vr(i.target, d) : null;
          E && A && v && (Mn(), kr(A, E, d, v.clientX, v.clientY));
          return;
        }
        requestAnimationFrame(() => M(i.target));
      }
    }, Se = (i) => {
      var _a3, _b2, _c2, _d2, _e2;
      if (!g() || i.isComposing || i.keyCode === 229 || i.key === "Process" || (i.metaKey || i.ctrlKey) && (i.key === "s" || i.key === "S" || i.code === "KeyS") || Sn(i.target)) return;
      const d = h();
      if (!d || Tt(d) || Nn(f)) return;
      const b = i.target, E = b instanceof Node && d.contains(b), v = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), A = (v == null ? void 0 : v.rangeCount) > 0 && d.contains(v.getRangeAt(0).commonAncestorContainer);
      if (!E && !A) return;
      const ce = (_d2 = (_c2 = ((_b2 = C.current) == null ? void 0 : _b2.value) ?? C.current) == null ? void 0 : _c2.getEditorView) == null ? void 0 : _d2.call(_c2);
      ce && (ce.hasFocus || (A ? (jn(d, { allowCollapsed: true }), Cr(ce, d, { focus: true }), (_e2 = ne.current) == null ? void 0 : _e2.schedule({ withRetries: true })) : ce.focus()));
    };
    return f.addEventListener("mousedown", O, true), f.addEventListener("contextmenu", U, true), f.addEventListener("mouseup", de), f.addEventListener("touchend", te, { passive: true }), f.addEventListener("keydown", Se, true), () => {
      jt(h()), f.removeEventListener("mousedown", O, true), f.removeEventListener("contextmenu", U, true), f.removeEventListener("mouseup", de), f.removeEventListener("touchend", te), f.removeEventListener("keydown", Se, true);
    };
  }, [s, ue, Re]), l.useEffect(() => {
    var _a3, _b2, _c2, _d2;
    if (s) {
      (_a3 = Y.current) == null ? void 0 : _a3.stop(), Y.current = null, (_b2 = ne.current) == null ? void 0 : _b2.stop(), ne.current = null, Rn();
      return;
    }
    const f = z.current, h = () => {
      var _a4;
      return (_a4 = f ?? z.current) == null ? void 0 : _a4.querySelector(".md-editor-preview");
    }, g = () => {
      var _a4, _b3, _c3;
      return (_c3 = (_b3 = ((_a4 = C.current) == null ? void 0 : _a4.value) ?? C.current) == null ? void 0 : _b3.getEditorView) == null ? void 0 : _c3.call(_b3);
    };
    (_c2 = Y.current) == null ? void 0 : _c2.stop();
    const w = hd({ getPreviewRoot: h, getView: g });
    Y.current = w, (_d2 = ne.current) == null ? void 0 : _d2.stop(), ne.current = null, ue ? ne.current = ld({ getPreviewRoot: h, getView: g }) : Rn();
    const y = sd((M, S) => {
      var _a4;
      const D = g();
      !D || M !== D || (w.schedule({ withRetries: S.docChanged }), ue && ((_a4 = ne.current) == null ? void 0 : _a4.schedule({ withRetries: S.docChanged })));
    });
    return () => {
      var _a4, _b3;
      y(), (_a4 = ne.current) == null ? void 0 : _a4.stop(), ne.current = null, (_b3 = Y.current) == null ? void 0 : _b3.stop(), Y.current = null;
    };
  }, [s, ue]), l.useEffect(() => {
    if (s || Re || !ue) {
      ti();
      return;
    }
    const f = z.current;
    if (f) return ni(f, { getPreviewRoot: () => f.querySelector(".md-editor-preview"), getView: () => {
      var _a3, _b2, _c2;
      return (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    }, isEnabled: () => ue });
  }, [s, ue, Re]), l.useEffect(() => {
    var _a3, _b2, _c2;
    const h = (_a3 = z.current) == null ? void 0 : _a3.querySelector(".md-editor-preview");
    if (ri(), !!h && ((_b2 = Y.current) == null ? void 0 : _b2.schedule({ withRetries: true }), !Re)) {
      if (ue && !Tt(h)) {
        (_c2 = ne.current) == null ? void 0 : _c2.schedule({ withRetries: true });
        return;
      }
      ue || jt(h);
    }
  }, [e, a == null ? void 0 : a.id, ue, Re]), l.useEffect(() => {
    if (s) return;
    const f = () => {
      var _a3;
      const h = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current;
      return (h == null ? void 0 : h.domEventHandlers) ? (h.domEventHandlers({ paste: (g, w) => {
        const y = g.clipboardData;
        if (!y || !w) return;
        const M = Nl(y);
        if (M.length && typeof u == "function") {
          if (p) return g.preventDefault(), false;
          g.preventDefault();
          const D = w;
          return u(M).then((O) => {
            var _a4, _b2, _c2;
            if (!(O == null ? void 0 : O.length)) return;
            const U = O.map((Se) => `![[${Se}]]`).join(`
`), te = ((_c2 = (_b2 = ((_a4 = C.current) == null ? void 0 : _a4.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2)) ?? D;
            te && te.dispatch(te.state.replaceSelection(U));
          }), false;
        }
        const S = y.getData("text/plain") ?? "";
        if (S) return g.preventDefault(), w.dispatch(w.state.replaceSelection(S)), false;
      }, keydown: (g, w) => {
        var _a4;
        if (!w) return;
        if (!w.composing && Zd(g) && vs(w) || !w.composing && ks(w, g)) return g.preventDefault(), g.stopPropagation(), true;
        const y = yo(g);
        if (!y) return;
        if (y === "mod+shift+enter") return g.preventDefault(), g.stopPropagation(), Jd(w), false;
        if (y === "mod+s") return;
        const S = ((_a4 = se.current) == null ? void 0 : _a4.snippets) || [], D = nn(y), O = S.find((U) => nn(U.prefix) === D && (U.body || "").trim());
        if (O) return g.preventDefault(), g.stopPropagation(), w.dispatch(w.state.replaceSelection(O.body)), false;
      } }), true) : false;
    };
    if (!f()) {
      const h = setTimeout(f, 100);
      return () => clearTimeout(h);
    }
  }, [s, u, p]), l.useEffect(() => {
    if (s) return;
    const f = (h) => {
      var _a3, _b2, _c2, _d2, _e2, _f;
      const g = yo(h);
      if (!g || g === "mod+s") return;
      const y = (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
      if (!y) return;
      const M = z.current, S = h.target;
      if (!(M == null ? void 0 : M.contains(S)) && !((_d2 = y.dom) == null ? void 0 : _d2.contains(S))) return;
      const O = ((_e2 = se.current) == null ? void 0 : _e2.snippets) || [], U = nn(g), de = O.find((te) => nn(te.prefix) === U && (te.body || "").trim());
      de && (h.preventDefault(), h.stopPropagation(), (_f = h.stopImmediatePropagation) == null ? void 0 : _f.call(h), y.dispatch(y.state.replaceSelection(de.body)));
    };
    return document.addEventListener("keydown", f, true), () => document.removeEventListener("keydown", f, true);
  }, [s, j]), l.useEffect(() => {
    if (typeof n != "function") return;
    const f = (h) => {
      var _a3, _b2, _c2, _d2, _e2;
      if (!(h.ctrlKey || h.metaKey) || h.altKey || h.key !== "s" && h.key !== "S" && h.code !== "KeyS") return;
      const g = z.current;
      if (!g) return;
      const w = h.target, y = w instanceof Node && g.contains(w), M = g.querySelector(".md-editor-preview"), S = (_a3 = window.getSelection) == null ? void 0 : _a3.call(window), D = !!(M && (S == null ? void 0 : S.rangeCount) && M.contains(S.getRangeAt(0).commonAncestorContainer));
      if (!y && !D && !Tt(M)) return;
      h.preventDefault(), h.stopPropagation(), (_b2 = h.stopImmediatePropagation) == null ? void 0 : _b2.call(h);
      const U = (_e2 = (_d2 = ((_c2 = C.current) == null ? void 0 : _c2.value) ?? C.current) == null ? void 0 : _d2.getEditorView) == null ? void 0 : _e2.call(_d2);
      xi(U), n();
    };
    return document.addEventListener("keydown", f, true), () => document.removeEventListener("keydown", f, true);
  }, [n]), l.useEffect(() => {
    const f = z.current;
    if (!f) return;
    const h = (g) => {
      var _a3, _b2, _c2, _d2, _e2, _f, _g, _h, _i2;
      const w = f.querySelector(".md-editor-preview"), y = (_b2 = (_a3 = g.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "table");
      if (y && w && w.contains(y) || w && (Er(w, g.clientX, g.clientY) || Sr(g.clientX, g.clientY))) return;
      const M = (_d2 = (_c2 = g.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, ".cm-editor");
      if (M && f.contains(M)) {
        const de = (_g = (_f = ((_e2 = C.current) == null ? void 0 : _e2.value) ?? C.current) == null ? void 0 : _f.getEditorView) == null ? void 0 : _g.call(_f);
        if (de) {
          const { from: te, to: Se } = de.state.selection.main, i = ee.current ?? "";
          if (Vn(i, te, Se)) {
            g.preventDefault(), Xe.current(te, Se);
            return;
          }
        }
      }
      const S = (_i2 = (_h = g.target) == null ? void 0 : _h.closest) == null ? void 0 : _i2.call(_h, "img[data-wiki-path], img[data-md-src]");
      if (!S || !f.contains(S)) return;
      const D = bi(S);
      if (!D.kind || !D.key) return;
      g.preventDefault();
      const O = D.kind === "wiki" ? wi(f, S, D.key) : yi(f, S, D.key);
      pe({ kind: D.kind, key: D.key, width: D.width, height: D.height, occurrence: O, imageSrc: S.currentSrc || S.src || "" });
    };
    return f.addEventListener("contextmenu", h), () => f.removeEventListener("contextmenu", h);
  }, [P]), l.useEffect(() => {
    const f = z.current;
    if (!f) return;
    const h = (g) => {
      var _a3, _b2, _c2, _d2;
      if ((_b2 = (_a3 = g.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-haim-table-resize-handle], [data-haim-table-resize-overlay]")) return;
      const w = f.querySelector(".md-editor-preview"), y = (_d2 = (_c2 = g.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "table");
      if (!y || !w || !w.contains(y)) return;
      g.preventDefault(), g.stopPropagation(), Te.current(y, w) || P({ title: "No table", message: "No haim-table found at this position. Click inside a table cell and try again." });
    };
    return f.addEventListener("dblclick", h, true), () => f.removeEventListener("dblclick", h, true);
  }, [P]), l.useEffect(() => {
    const f = z.current;
    if (f) return wl(f);
  }, []), l.useEffect(() => {
    const f = () => {
      ge((h) => h + 1);
    };
    return window.addEventListener(wr, f), () => {
      window.removeEventListener(wr, f);
    };
  }, []), l.useEffect(() => {
    const f = z.current;
    if (!f) return;
    const h = (y) => {
      (y.classList.contains("md-note-cover-placeholder--ready") || y.classList.contains("md-note-cover-placeholder--empty") || y.classList.contains("md-note-cover-placeholder--pending")) && lt(true);
    }, g = (y) => {
      var _a3, _b2, _c2, _d2, _e2, _f;
      const M = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      if (M && f.contains(M)) {
        y.preventDefault(), y.stopPropagation(), h(M);
        return;
      }
      const S = (_d2 = (_c2 = y.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "[data-chat-saved-note]");
      if (S && f.contains(S)) {
        y.preventDefault(), y.stopPropagation(), k(vi({ id: S.getAttribute("data-chat-id") || "", href: S.getAttribute("data-chat-href") || S.getAttribute("href") || "" }));
        return;
      }
      const D = (_f = (_e2 = y.target) == null ? void 0 : _e2.closest) == null ? void 0 : _f.call(_e2, "a[href]");
      if (!D || !f.contains(D) || y.metaKey || y.ctrlKey || y.shiftKey || y.altKey || typeof y.button == "number" && y.button !== 0 || D.hasAttribute("data-md-footnote-to")) return;
      const O = D.getAttribute("href") || "", U = ki(O, { currentViewPath: (a == null ? void 0 : a.type) ? a.id : null });
      if (U.kind !== "app") return;
      if (y.preventDefault(), y.stopPropagation(), U.viewPath && typeof L == "function") {
        L(U.viewPath);
        return;
      }
      const de = U.search || "", te = U.hash || "";
      k(`${U.pathname || "/"}${de}${te}`);
    }, w = (y) => {
      var _a3, _b2;
      if (y.key !== "Enter" && y.key !== " ") return;
      const M = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-note-cover-placeholder]");
      !M || !f.contains(M) || (y.preventDefault(), y.stopPropagation(), h(M));
    };
    return f.addEventListener("click", g), f.addEventListener("keydown", w), () => {
      f.removeEventListener("click", g), f.removeEventListener("keydown", w);
    };
  }, [k, a == null ? void 0 : a.id, a == null ? void 0 : a.type, L]);
  const Vt = l.useCallback(({ width: f, height: h }) => {
    const g = W;
    if (!(g == null ? void 0 : g.key) || typeof q != "function") return;
    const w = g.kind === "wiki" ? Cn(e, { path: g.key, occurrence: g.occurrence ?? 0, width: f, height: h }) : En(e, { src: g.key, occurrence: g.occurrence ?? 0, width: f, height: h });
    w.updated && w.markdown !== e && q(w.markdown);
  }, [W, q, e]), Wt = l.useCallback(async ({ file: f }) => {
    var _a3;
    const h = W;
    if (!(h == null ? void 0 : h.key) || typeof u != "function") throw new Error("Upload handler not available.");
    const w = (_a3 = await u([f])) == null ? void 0 : _a3[0];
    if (!w) throw new Error("Upload succeeded but no path was returned.");
    if (typeof q != "function") return;
    const y = h.kind === "wiki" ? oi(e, { path: h.key, occurrence: h.occurrence ?? 0, nextPath: w }) : yr(e, { src: h.key, occurrence: h.occurrence ?? 0, nextPath: w });
    y.updated && y.markdown !== e && q(y.markdown);
  }, [q, u, e, W]), We = l.useCallback(async ({ width: f, height: h }) => {
    var _a3;
    const g = W;
    if (!(g == null ? void 0 : g.key) || g.kind !== "markdown") throw new Error("Cannot convert: not a markdown image.");
    if (typeof q != "function") throw new Error("Cannot apply change.");
    const w = await si({ markdownSrc: g.key, displaySrc: g.imageSrc, currentNotePath: (a == null ? void 0 : a.id) ?? null });
    let y = "";
    if (w.mode === "path") y = w.path;
    else {
      if (typeof u != "function") throw new Error("Upload handler not available.");
      if (y = ((_a3 = await u([w.file])) == null ? void 0 : _a3[0]) || "", !y) throw new Error("Upload succeeded but no path was returned.");
    }
    const M = yr(e, { src: g.key, occurrence: g.occurrence ?? 0, nextPath: y, width: f, height: h });
    M.updated && M.markdown !== e && q(M.markdown);
  }, [a == null ? void 0 : a.id, q, u, e, W]), xn = l.useCallback(async ({ width: f, height: h }) => {
    const g = W;
    if (!(g == null ? void 0 : g.key) || !(g == null ? void 0 : g.kind)) throw new Error("Cannot convert: image target is missing.");
    if (typeof q != "function") throw new Error("Cannot apply change.");
    const w = typeof N == "function" ? String(await Promise.resolve(N()) || "").trim() : "";
    if (!w) throw new Error("ImgBB API key is missing. Please add it in settings.");
    const y = ai({ path: g.key, imageSrc: g.imageSrc });
    if (!y) throw new Error("Cannot determine image source URL for upload.");
    const S = (await ii({ apiKey: w, image: y, name: li(g.key) ? "image" : void 0 })).url, D = g.occurrence ?? 0;
    let O = e;
    const U = g.kind === "wiki" ? Cn(O, { path: g.key, occurrence: D, width: f, height: h }) : En(O, { src: g.key, occurrence: D, width: f, height: h });
    U.updated && (O = U.markdown);
    const de = await ci(O, { kind: g.kind === "wiki" ? "wiki" : "markdown", key: g.key, occurrence: D }, S);
    if (!de.updated && O === e) throw new Error("ImgBB upload succeeded but markdown could not be updated.");
    q(de.markdown);
  }, [N, q, e, W]);
  l.useEffect(() => {
    if (typeof I == "function") return I(async () => {
      if (s) throw new Error("Cannot convert images in preview-only mode.");
      if (typeof q != "function") throw new Error("Cannot apply change.");
      if (!ui(e)) return { markdown: e, converted: 0, failed: [] };
      const f = await di(e, { currentNotePath: (a == null ? void 0 : a.id) ?? null, uploadFiles: async (h) => {
        if (typeof u != "function") throw new Error("Upload handler not available.");
        return u(h);
      } });
      return f.markdown !== e && q(f.markdown), f;
    }), () => I(null);
  }, [a == null ? void 0 : a.id, q, I, u, s, e]);
  const _e = l.useCallback((f) => {
    const h = z.current;
    if (!h || !(f == null ? void 0 : f.kind) || !(f == null ? void 0 : f.key)) return null;
    const g = f.kind === "wiki" ? "img[data-wiki-path]" : "img[data-md-src]";
    return [...h.querySelectorAll(g)].filter((M) => (f.kind === "wiki" ? M.getAttribute("data-wiki-path") : M.getAttribute("data-md-src")) === f.key)[f.occurrence ?? 0] ?? null;
  }, []), ft = l.useCallback(({ kind: f, key: h, occurrence: g, widthPx: w, heightPx: y }) => {
    if (!h || typeof q != "function") return false;
    const M = Number.isFinite(w) ? `${Math.round(w)}px` : null, S = Number.isFinite(y) ? `${Math.round(y)}px` : null, D = f === "wiki" ? Cn(e, { path: h, occurrence: g, width: M, height: S }) : En(e, { src: h, occurrence: g, width: M, height: S });
    return D.updated && D.markdown !== e ? (q(D.markdown), true) : false;
  }, [q, e]), Et = l.useCallback(() => {
    const f = W;
    if (!(f == null ? void 0 : f.kind) || !(f == null ? void 0 : f.key)) return;
    const h = _e(f);
    if (!h) return;
    const g = h.getBoundingClientRect(), w = Math.max(24, Math.round(g.width)), y = Math.max(24, Math.round(g.height)), M = { kind: f.kind, key: f.key, occurrence: f.occurrence ?? 0, widthPx: w, heightPx: y, originalWidthPx: w, originalHeightPx: y };
    h.style.width = `${w}px`, h.style.height = `${y}px`, le.current = M, Je(M), Pe(false);
  }, [_e, W]);
  l.useEffect(() => {
    if (!xe) {
      kt(null);
      return;
    }
    const f = _e(xe);
    if (!f) {
      Je(null), kt(null);
      return;
    }
    let h = 0;
    const g = () => {
      const w = f.getBoundingClientRect();
      kt({ left: w.left, top: w.top, width: w.width, height: w.height }), h = requestAnimationFrame(g);
    };
    return h = requestAnimationFrame(g), () => cancelAnimationFrame(h);
  }, [xe, _e]), l.useEffect(() => {
    if (!xe) return;
    const f = _e(xe);
    if (!f) return;
    const h = (y) => {
      var _a3, _b2;
      const M = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]");
      if (!M) return;
      y.preventDefault();
      const S = M.getAttribute("data-transform-handle");
      if (!S) return;
      const D = y.pointerType === "touch", O = le.current || xe, U = y.clientX, de = y.clientY, te = O.heightPx > 0 ? O.widthPx / O.heightPx : 1, Se = (d) => {
        const b = d.clientX - U, E = d.clientY - de;
        let v = O.widthPx, A = O.heightPx;
        if (S.includes("e") && (v = O.widthPx + b), S.includes("w") && (v = O.widthPx - b), S.includes("s") && (A = O.heightPx + E), S.includes("n") && (A = O.heightPx - E), v = Math.max(24, v), A = Math.max(24, A), D || d.shiftKey) {
          const ze = Math.abs((v - O.widthPx) / Math.max(1, O.widthPx)), F = Math.abs((A - O.heightPx) / Math.max(1, O.heightPx));
          ze >= F ? A = Math.max(24, v / Math.max(1e-4, te)) : v = Math.max(24, A * te);
        }
        v = Math.max(24, Math.round(v)), A = Math.max(24, Math.round(A)), f.style.width = `${v}px`, f.style.height = `${A}px`;
        const ce = { ...le.current || O, widthPx: v, heightPx: A };
        le.current = ce, Je(ce);
      }, i = () => {
        document.removeEventListener("pointermove", Se, true), document.removeEventListener("pointerup", i, true);
      };
      document.addEventListener("pointermove", Se, true), document.addEventListener("pointerup", i, true);
    }, g = (y) => {
      y.key === "Enter" && (y.preventDefault(), Pe(true));
    }, w = (y) => {
      var _a3, _b2, _c2, _d2;
      const M = (_b2 = (_a3 = y.target) == null ? void 0 : _a3.closest) == null ? void 0 : _b2.call(_a3, "[data-transform-handle]"), S = (_d2 = (_c2 = y.target) == null ? void 0 : _c2.closest) == null ? void 0 : _d2.call(_c2, "img[data-wiki-path], img[data-md-src]");
      M || S === f || Pe(true);
    };
    return document.addEventListener("pointerdown", h, true), document.addEventListener("pointerdown", w, true), document.addEventListener("keydown", g, true), () => {
      document.removeEventListener("pointerdown", h, true), document.removeEventListener("pointerdown", w, true), document.removeEventListener("keydown", g, true);
    };
  }, [xe, _e]);
  const qt = l.useCallback(() => {
    const f = le.current || xe;
    f && (ft(f), Je(null), le.current = null, Pe(false));
  }, [ft, xe]), bn = l.useCallback(() => {
    const f = le.current || xe;
    if (!f) return;
    const h = _e(f);
    h && (h.style.width = `${f.originalWidthPx}px`, h.style.height = `${f.originalHeightPx}px`), Je(null), le.current = null, Pe(false);
  }, [_e, xe]), tt = l.useCallback((f) => {
    var _a3, _b2, _c2, _d2;
    const h = String(f || "");
    if (!h) return;
    const g = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current;
    if (typeof (g == null ? void 0 : g.insert) == "function") {
      g.insert(() => ({ targetValue: h, select: false, deviationStart: 0, deviationEnd: 0 })), (_b2 = g.focus) == null ? void 0 : _b2.call(g);
      return;
    }
    const w = (_c2 = g == null ? void 0 : g.getEditorView) == null ? void 0 : _c2.call(g);
    w && (w.dispatch(w.state.replaceSelection(h)), (_d2 = w.focus) == null ? void 0 : _d2.call(w));
  }, []), nt = l.useCallback(async (f) => {
    if (!(f == null ? void 0 : f.length) || typeof u != "function" || p) return;
    const h = await u(f);
    (h == null ? void 0 : h.length) && tt(`${h.map((g) => `![[${g}]]`).join(`
`)}
`);
  }, [tt, p, u]);
  l.useEffect(() => {
    Ye.current = nt;
  }, [nt]);
  const Ut = l.useCallback(async (f) => {
    var _a3;
    if (!f || typeof u != "function") throw new Error("Upload handler not available.");
    const g = (_a3 = await u([f])) == null ? void 0 : _a3[0];
    if (!g) throw new Error("Upload succeeded but no path was returned.");
    tt(`![[${g}]]
`), Qe(null);
  }, [tt, u]), He = l.useCallback(() => {
    var _a3, _b2, _c2;
    const h = (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2);
    let g = null;
    if (h) {
      const { from: w, to: y } = h.state.selection.main;
      w !== y && (g = { from: w, to: y, text: h.state.doc.sliceString(w, y) });
    }
    Oe(g), ye(true);
  }, []);
  l.useEffect(() => {
    H.current = He;
  }, [He]);
  const Xt = l.useMemo(() => [o.jsx(cc, { value: e, theme: r, currentFile: a, language: "ko-KR" }, "export-pdf"), o.jsx(uc, { editorRef: C }, "insert-pgbr"), o.jsx(dc, { onOpen: He }, "heading-remap"), o.jsx(Jl, { active: !!(Q == null ? void 0 : Q.open), onToggle: () => {
    var _a3;
    (_a3 = Q == null ? void 0 : Q.toggleAssist) == null ? void 0 : _a3.call(Q);
  } }, "llm-assist"), o.jsx(lc, { onOpen: () => {
    X(true);
  } }, "checklist-progress"), o.jsx(bc, { checked: ct, onChange: Ct, theme: r }, "toc-title-wrap"), o.jsx(wc, { checked: Ve, onChange: ut, theme: r }, "base64-image-fold"), o.jsx(yc, { checked: Ht, onChange: Ot, theme: r }, "editor-autocomplete"), Re ? null : o.jsx(vc, { checked: ue, onChange: dt, theme: r }, "mirror-edit"), o.jsx(kc, { disabled: typeof u != "function", onRequestLink: () => $e(true), onRequestUpload: (f) => {
    nt(f);
  }, onRequestClip: (f) => Qe(f) }, "image-toolbar")], [e, r, a, ct, Ct, Ve, ut, Ht, Ot, Re, ue, dt, u, nt, He, Q == null ? void 0 : Q.open, Q == null ? void 0 : Q.toggleAssist]), Yt = l.useMemo(() => ["bold", "underline", "italic", "-", "strikeThrough", "sub", "sup", "quote", "unorderedList", "orderedList", "task", "-", "codeRow", "code", "link", 9, "table", "mermaid", "katex", 1, 2, 3, 4, "-", "revoke", "next", 0, "=", 6, 7, ...Re ? [] : [8], "pageFullscreen", "fullscreen", "previewOnly", "preview", "htmlPreview", ...ve ? [5] : [], "catalog"], [ve, Re]), St = l.useMemo(() => {
    if (typeof u == "function") return async (f, h) => {
      if (p) return;
      const g = await u(f);
      (g == null ? void 0 : g.length) && h(g.map((w) => `![[${w}]]`));
    };
  }, [u, p]);
  return o.jsxs("div", { ref: z, className: `h-full w-full flex flex-col relative${ct ? " toc-titles-wrap" : ""}`, style: { "--md-catalog-width": `${Fe}px`, ...zt }, children: [(et == null ? void 0 : et.webfontCss) ? o.jsx("style", { "data-s3haim-document-webfonts": "1", children: et.webfontCss }) : null, fe && ko.createPortal(o.jsx(fi, { handleProps: Kt, isResizing: Bt, visibleOnHover: true, label: "TOC resize handle", style: { position: "fixed", top: fe.top, left: fe.left, height: fe.height, bottom: "auto", zIndex: 10003 } }), document.body), p && o.jsxs("div", { className: "absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center gap-2 py-2 text-sm bg-blue-300/40 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 border-b border-blue-500/20", "aria-live": "polite", children: [o.jsx(Qi, { size: 16, className: "animate-spin shrink-0" }), o.jsxs("span", { children: ["Uploading image... ", Math.max(0, Math.min(100, Math.round(m))), "%"] }), typeof x == "function" && o.jsx("button", { type: "button", onClick: x, className: "ml-2 rounded-md border border-blue-600/50 bg-white/80 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-white dark:border-blue-300/40 dark:bg-blue-950/60 dark:text-blue-100 dark:hover:bg-blue-950", children: "Cancel" })] }), o.jsx(As, { ref: C, id: K, modelValue: e, onChange: q, mdHeadingId: _, className: "h-full! max-h-dvh", theme: r, language: "ko-KR", codeTheme: pi, customIcon: mi, previewOnly: s, noMermaid: true, autoDetectCode: true, scrollAuto: false, footers: ["markdownTotal"], toolbars: Yt, defToolbars: Xt, onUploadImg: St }, `footnotes-${he}`), o.jsx(xl, { containerRef: z }), o.jsx(yl, { containerRef: z }), o.jsx(El, { isOpen: !!W, onClose: () => pe(null), path: (W == null ? void 0 : W.key) ?? "", kind: (W == null ? void 0 : W.kind) ?? "wiki", initialWidth: (W == null ? void 0 : W.width) ?? "", initialHeight: (W == null ? void 0 : W.height) ?? "", imageSrc: (W == null ? void 0 : W.imageSrc) ?? "", onApply: Vt, onStartFreeTransform: Et, onCrop: Wt, onConvertToWiki: We, onConvertToImgbb: xn }, W ? `${W.kind}|${W.key}|${W.width ?? ""}|${W.height ?? ""}|${W.occurrence ?? 0}` : "wiki-image-size-modal"), o.jsx(Cc, { isOpen: Be, onClose: () => $e(false), onConfirm: ({ desc: f, url: h }) => {
    tt(`![${f || ""}](${h})
`);
  } }), o.jsx(Ec, { isOpen: Me, onClose: () => me(false), onConfirm: ({ line1: f, line2: h }) => {
    var _a3, _b2, _c2, _d2, _e2;
    const w = (_c2 = (_b2 = ((_a3 = C.current) == null ? void 0 : _a3.value) ?? C.current) == null ? void 0 : _b2.getEditorView) == null ? void 0 : _c2.call(_b2), y = (w == null ? void 0 : w.state.doc.toString()) ?? ee.current ?? "", { from: M, to: S } = Ke.current, D = hi(y, M, S, f, h);
    w && (w.dispatch({ changes: { from: 0, to: w.state.doc.length, insert: D.next }, selection: { anchor: D.caret }, scrollIntoView: true }), (_d2 = w.focus) == null ? void 0 : _d2.call(w)), (_e2 = Le.current) == null ? void 0 : _e2.call(Le, D.next);
  } }), o.jsx(Sc, { isOpen: !!Ge, file: Ge, onClose: () => Qe(null), onConfirm: Ut }), o.jsx(vu, { isOpen: ie.isOpen, initialMeta: ((_a2 = ie.editState) == null ? void 0 : _a2.meta) ?? null, initialGrid: ((_b = ie.editState) == null ? void 0 : _b.grid) ?? { rows: [[""]], aligns: [null] }, onClose: ie.close, onSave: ie.apply }), o.jsx(Cu, { containerRef: z, getMarkdown: () => ee.current ?? "", setMarkdown: (f) => {
    typeof q == "function" ? q(f) : typeof t == "function" && t(f);
  }, onEditTable: (f, h) => Te.current(f, h), onEditFailed: () => {
    P({ title: "? ??", message: "? ?? ???? ?? ?? ?????. ??? ??? ??? ??? ???." });
  } }), o.jsx(vl, { containerRef: z, getMarkdown: () => ee.current ?? "", setMarkdown: (f) => {
    typeof q == "function" && q(f);
  }, enabled: !ie.isOpen }), xe && Ze && o.jsx("div", { className: "fixed z-70 pointer-events-none border-2 border-blue-500", style: { left: `${Ze.left}px`, top: `${Ze.top}px`, width: `${Ze.width}px`, height: `${Ze.height}px` }, children: ["nw", "ne", "sw", "se"].map((f) => o.jsx("button", { type: "button", "data-transform-handle": f, className: "absolute pointer-events-auto h-3 w-3 rounded-full bg-blue-600 border border-white", style: { left: f.includes("w") ? "-7px" : "auto", right: f.includes("e") ? "-7px" : "auto", top: f.includes("n") ? "-7px" : "auto", bottom: f.includes("s") ? "-7px" : "auto", cursor: f === "nw" || f === "se" ? "nwse-resize" : "nesw-resize" }, "aria-label": `transform-${f}` }, f)) }), xe && o.jsxs("button", { type: "button", onClick: () => Pe(true), className: "fixed z-70 bottom-4 left-1/2 -translate-x-1/2 max-w-[min(92vw,680px)] rounded-lg border border-blue-300/60 bg-blue-950/85 px-3 py-2 text-left text-[11px] leading-4 text-blue-50 shadow-lg backdrop-blur-sm", children: [o.jsx("span", { className: "block font-semibold mb-1", children: "Free transform guide" }), o.jsx("span", { className: "block", children: "- Shift + drag: keep aspect ratio / plain drag: ignore ratio" }), o.jsx("span", { className: "block", children: "- Touch drag: keeps aspect ratio" }), o.jsx("span", { className: "block", children: "- Click elsewhere (including this banner): confirm transform" })] }), o.jsx(an, { isOpen: _t, title: "Cover export", message: "You need to open the Export PDF page to export the cover. Continue?", confirmLabel: "Continue", cancelLabel: "Cancel", onConfirm: () => {
    lt(false), oe({ openCoverEdit: true });
  }, onCancel: () => lt(false) }), o.jsx(an, { isOpen: vt, title: "Save transform", message: "How would you like to handle the current transform?", confirmLabel: "Apply", cancelLabel: "Keep editing", discardLabel: "Reset transform", onConfirm: qt, onCancel: () => Pe(false), onDiscard: bn }), o.jsx(xc, { isOpen: je, markdown: e, selectedMarkdown: (Ee == null ? void 0 : Ee.text) ?? "", onClose: () => {
    ye(false), Oe(null);
  }, onApply: (f, h) => {
    if (h === "selection" && Ee) {
      const { from: g, to: w } = Ee, y = ee.current ?? e, M = `${y.slice(0, g)}${f}${y.slice(w)}`;
      M !== y && q(M);
    } else f !== e && q(f);
    ye(false), Oe(null);
  } }), o.jsx(sc, { editorRef: C, onChange: q, open: $, onOpenChange: X })] });
}
export {
  vf as default
};
