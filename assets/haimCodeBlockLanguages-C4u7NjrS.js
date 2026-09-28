const A = "s3haim-haim-code-tab", m = "s3haim_haim_code_tab", H = 1, g = 8, h = ["python", "python-repl", "mojo"];
const u = { defaultWidth: 2, pythonFamilyWidth: 4, byLanguage: {} }, d = new Set(h.map((n) => n.toLowerCase())), l = { js: "javascript", mjs: "javascript", cjs: "javascript", jsx: "javascript", ts: "typescript", tsx: "typescript", py: "python" };
function r(n) {
  return Number.isFinite(n) ? Math.min(8, Math.max(1, Math.round(n))) : 2;
}
function f(n) {
  const t = n && typeof n == "object" ? n : {}, e = {};
  if (t.byLanguage && typeof t.byLanguage == "object") for (const [a, i] of Object.entries(t.byLanguage)) {
    const o = String(a || "").trim().toLowerCase();
    !o || typeof i != "number" || (e[o] = r(i));
  }
  return { defaultWidth: r(typeof t.defaultWidth == "number" ? t.defaultWidth : 2), pythonFamilyWidth: r(typeof t.pythonFamilyWidth == "number" ? t.pythonFamilyWidth : 4), byLanguage: e };
}
function T(n, t) {
  if (!t) return;
  if (n[t] != null) return n[t];
  const e = l[t];
  if (e && n[e] != null) return n[e];
  for (const [a, i] of Object.entries(l)) if (i === t && n[a] != null) return n[a];
}
function C(n, t = s()) {
  const e = String(n ?? "").trim().toLowerCase(), a = T(t.byLanguage, e);
  if (a != null) return a;
  const i = l[e] ?? e;
  return d.has(e) || d.has(i) ? t.pythonFamilyWidth : t.defaultWidth;
}
function s() {
  if (typeof window > "u") return { ...u, byLanguage: {} };
  try {
    const n = window.localStorage.getItem(m);
    return n ? f(JSON.parse(n)) : { ...u, byLanguage: {} };
  } catch {
    return { ...u, byLanguage: {} };
  }
}
function _(n) {
  if (typeof window > "u") return;
  const t = f(n);
  try {
    window.localStorage.setItem(m, JSON.stringify(t)), window.dispatchEvent(new CustomEvent(A, { detail: { settings: t } }));
  } catch {
  }
}
function L(n) {
  const t = s();
  _({ ...t, defaultWidth: r(n) });
}
function I(n) {
  const t = s();
  _({ ...t, pythonFamilyWidth: r(n) });
}
function E(n, t) {
  const e = String(n || "").trim().toLowerCase();
  if (!e) return;
  const a = s(), i = { ...a.byLanguage };
  t == null ? delete i[e] : i[e] = r(t), _({ ...a, byLanguage: i });
}
const c = "__plain__", y = ["arduino", "bash", "c", "cpp", "csharp", "css", "diff", "go", "graphql", "ini", "java", "javascript", "json", "kotlin", "less", "lua", "makefile", "markdown", "objectivec", "perl", "php", "php-template", "python", "python-repl", "r", "ruby", "rust", "scss", "shell", "sql", "swift", "typescript", "vbnet", "wasm", "xml", "yaml"];
function b(n) {
  const t = String(n ?? "").trim();
  return !t || t === c ? null : t;
}
function D(n) {
  return String(n ?? "").trim() || c;
}
function O(n) {
  const t = /* @__PURE__ */ new Set(), e = [], a = (o, p) => {
    t.has(o) || (t.add(o), e.push({ value: o, label: p }));
  };
  a(c, "plain"), a("mermaid", "mermaid");
  for (const o of y) a(o, o);
  const i = String(n ?? "").trim();
  return i && a(i, i), e;
}
function M(n, t) {
  const e = String(t ?? "").trim().toLowerCase();
  return e ? n.filter((a) => {
    const i = a.value.toLowerCase(), o = a.label.toLowerCase();
    return i.includes(e) || o.includes(e);
  }) : [...n];
}
function S(n) {
  const t = String(n ?? "").trim();
  return !t || t === c ? "plain" : t;
}
export {
  A as H,
  h as a,
  I as b,
  E as c,
  g as d,
  H as e,
  y as f,
  O as g,
  D as h,
  S as i,
  M as j,
  c as k,
  s as l,
  b as m,
  C as r,
  L as s
};
