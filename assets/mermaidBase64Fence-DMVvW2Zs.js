const m = /^Mermaid!\[\]\((data:image\/[^)]+)\)\s*$/i, l = /^!\[\]\((data:image\/[^)]+)\)\s*$/i, u = /data:image\/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]{48,}/i;
function c(n) {
  return /^mermaid$/i.test(n.trim());
}
function d(n, t) {
  const e = t.trim();
  return m.test(e) || c(n) && l.test(e) || c(n) && u.test(e) ? true : /^Mermaid!\[\]\(/i.test(e) && u.test(e);
}
function M(n) {
  const t = n.trim(), e = m.exec(t);
  if (e == null ? void 0 : e[1]) return e[1];
  const r = l.exec(t);
  return (r == null ? void 0 : r[1]) ? r[1] : null;
}
function g(n) {
  var _a;
  return ((_a = /^data:image\/([a-z0-9.+-]+)/i.exec(n)) == null ? void 0 : _a[1]) ?? "image";
}
function A(n) {
  const t = Math.round(n * 3 / 4);
  return t >= 1024 * 1024 ? `${(t / (1024 * 1024)).toFixed(1)}MB` : t >= 1024 ? `${Math.max(1, Math.round(t / 1024))}KB` : `${t}B`;
}
function $(n) {
  var _a;
  const t = n.trim(), e = M(t);
  if (e) {
    const a = ((_a = e.match(/;base64,([A-Za-z0-9+/=]+)/i)) == null ? void 0 : _a[1]) ?? "";
    return `![](\u2026${g(e)} ${A(a.length)}\u2026)`;
  }
  if (u.test(t)) return "\u2026base64 payload\u2026";
  const r = t.split(`
`).length;
  return r > 1 ? `${r} lines` : t.length > 48 ? `${t.slice(0, 40)}\u2026` : t;
}
function h(n, t, e) {
  const r = n.slice(t, e), a = /^```([^\n]*)\n([\s\S]*)\n?```$/.exec(r);
  if (!a) return null;
  const o = a[1] ?? "", f = a[2] ?? "";
  if (!d(o, f)) return null;
  let i = t;
  for (; i < e && n[i] !== `
`; ) i += 1;
  if (i >= e) return null;
  i += 1;
  let s = e;
  for (; s > t && n[s - 1] !== `
`; ) s -= 1;
  return s <= i ? null : { from: i, to: s };
}
export {
  d as a,
  M as e,
  c as i,
  h as m,
  $ as s
};
