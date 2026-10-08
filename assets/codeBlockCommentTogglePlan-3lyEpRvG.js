const p = { js: "javascript", mjs: "javascript", cjs: "javascript", jsx: "javascript", ts: "typescript", tsx: "typescript", py: "python", sh: "bash", zsh: "bash", ksh: "bash", yml: "yaml", md: "markdown", htm: "xml", html: "xml", svg: "xml", cs: "csharp", "c++": "cpp", "c#": "csharp", rb: "ruby", rs: "rust", kt: "kotlin", ps1: "powershell", pwsh: "powershell" }, s = "//", r = "#", a = "--", b = ";", k = "%%", d = "'", o = { open: "/*", close: "*/" }, g = { open: "<!--", close: "-->" }, x = { javascript: { line: s, block: o }, typescript: { line: s, block: o }, java: { line: s, block: o }, c: { line: s, block: o }, cpp: { line: s, block: o }, csharp: { line: s, block: o }, go: { line: s, block: o }, rust: { line: s, block: o }, kotlin: { line: s, block: o }, swift: { line: s, block: o }, php: { line: s, block: o }, "php-template": { line: s, block: o }, objectivec: { line: s, block: o }, arduino: { line: s, block: o }, less: { line: s, block: o }, scss: { line: s, block: o }, json: { line: s, block: o }, wasm: { line: s, block: o }, python: { line: r }, "python-repl": { line: r }, ruby: { line: r }, bash: { line: r }, shell: { line: r }, yaml: { line: r }, makefile: { line: r }, r: { line: r }, perl: { line: r }, graphql: { line: r }, powershell: { line: r }, sql: { line: a }, lua: { line: a }, ini: { line: b }, vbnet: { line: d }, mermaid: { line: k }, css: { block: o }, xml: { block: g }, markdown: { block: g } }, u = { line: s, block: o };
function L(c) {
  const t = String(c ?? "").trim().toLowerCase();
  return t ? p[t] ?? t : "";
}
function C(c) {
  const t = L(c);
  if (!t) return { ...u };
  const l = x[t];
  return l ? { ...l } : { ...u };
}
function E(c, t) {
  var _a;
  if (!t || c.length === 0) return null;
  const l = [];
  let i = 1e9;
  for (const n of c) {
    const e = ((_a = /^\s*/.exec(n.text)) == null ? void 0 : _a[0].length) ?? 0, m = e === n.text.length, h = n.text.slice(e, e + t.length) === t ? e : -1;
    e < n.text.length && e < i && (i = e), l.push({ from: n.from, text: n.text, comment: h, indent: e, empty: m, single: false });
  }
  if (i < 1e9) for (const n of l) n.indent < n.text.length && (n.indent = i);
  if (l.length === 1 && (l[0].single = true), l.some((n) => n.comment < 0 && (!n.empty || n.single))) {
    const n = [];
    for (const e of l) (e.single || !e.empty) && n.push({ from: e.from + e.indent, insert: `${t} ` });
    return n.length > 0 ? n : null;
  }
  if (l.some((n) => n.comment >= 0)) {
    const n = [];
    for (const e of l) {
      if (e.comment < 0) continue;
      let m = e.from + e.comment, h = m + t.length;
      e.text[e.comment + t.length] === " " && (h += 1), n.push({ from: m, to: h, insert: "" });
    }
    return n.length > 0 ? n : null;
  }
  return null;
}
function y(c, t, l) {
  var _a, _b;
  const { from: i, to: f, content: n } = c;
  if (n.length < t.length + l.length) return null;
  const e = ((_a = /^\s*/.exec(n)) == null ? void 0 : _a[0].length) ?? 0, m = ((_b = /\s*$/.exec(n)) == null ? void 0 : _b[0].length) ?? 0, h = n.length - m - l.length;
  return n.slice(e, e + t.length) === t && h >= e + t.length && n.slice(h, h + l.length) === l ? { openPos: i + e + t.length, openMargin: /\s/.test(n.charAt(e + t.length)) ? 1 : 0, closePos: f - m - l.length, closeMargin: h > 0 && /\s/.test(n.charAt(h - 1)) ? 1 : 0 } : null;
}
function w(c, t, l) {
  if (!t || !l || c.length === 0) return null;
  const i = c.map((n) => y(n, t, l));
  if (!i.every((n) => n)) {
    const n = [];
    for (let e = 0; e < c.length; e += 1) {
      if (i[e]) continue;
      const m = c[e];
      n.push({ from: m.from, insert: `${t} ` }, { from: m.to, insert: ` ${l}` });
    }
    return n.length > 0 ? n : null;
  }
  const f = [];
  for (let n = 0; n < i.length; n += 1) {
    const e = i[n];
    e && f.push({ from: e.openPos - t.length, to: e.openPos + e.openMargin, insert: "" }, { from: e.closePos - e.closeMargin, to: e.closePos + l.length, insert: "" });
  }
  return f.length > 0 ? f : null;
}
function A(c) {
  return [...c].sort((t, l) => l.from - t.from || (l.to ?? l.from) - (t.to ?? t.from));
}
export {
  w as a,
  E as p,
  C as r,
  A as s
};
