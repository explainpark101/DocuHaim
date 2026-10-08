const s = "__plain__", l = ["arduino", "bash", "c", "cpp", "csharp", "css", "diff", "go", "graphql", "ini", "java", "javascript", "json", "kotlin", "less", "lua", "makefile", "markdown", "objectivec", "perl", "php", "php-template", "python", "python-repl", "r", "ruby", "rust", "scss", "shell", "sql", "swift", "typescript", "vbnet", "wasm", "xml", "yaml"];
function c(n) {
  const t = String(n ?? "").trim();
  return !t || t === s ? null : t;
}
function u(n) {
  return String(n ?? "").trim() || s;
}
function m(n) {
  const t = /* @__PURE__ */ new Set(), a = [], r = (e, o) => {
    t.has(e) || (t.add(e), a.push({ value: e, label: o }));
  };
  r(s, "plain"), r("mermaid", "mermaid");
  for (const e of l) r(e, e);
  const i = String(n ?? "").trim();
  return i && r(i, i), a;
}
function p(n, t) {
  const a = String(t ?? "").trim().toLowerCase();
  return a ? n.filter((r) => {
    const i = r.value.toLowerCase(), e = r.label.toLowerCase();
    return i.includes(a) || e.includes(a);
  }) : [...n];
}
function d(n) {
  const t = String(n ?? "").trim();
  return !t || t === s ? "plain" : t;
}
export {
  l as H,
  s as a,
  m as b,
  p as f,
  d as h,
  c as l,
  u as s
};
