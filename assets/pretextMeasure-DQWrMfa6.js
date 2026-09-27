function h(o) {
  if (typeof document > "u") return () => 0;
  const t = document.createElement("canvas").getContext("2d");
  return t ? (t.font = o || "14px sans-serif", (s) => s ? t.measureText(s).width : 0) : () => 0;
}
function m(o) {
  if (typeof window > "u") return "14px sans-serif";
  const e = window.getComputedStyle(o), t = e.fontWeight || "400", s = e.fontSize || "14px", c = e.fontFamily || "sans-serif";
  return `${t} ${s} ${c}`;
}
function d(o, e, t) {
  if (t <= 0 || !o || e(o) <= t) return 1;
  const s = o.split(/(\s+)/).filter((r) => r.length > 0);
  let c = 0, i = "";
  const f = (r) => {
    r && (c += 1);
  }, u = (r) => {
    let n = "";
    for (const a of r) {
      const l = n + a;
      if (!n || e(l) <= t) {
        n = l;
        continue;
      }
      f(n), n = a;
    }
    i = n;
  };
  for (const r of s) {
    const n = i + r;
    if (e(n) <= t) {
      i = n;
      continue;
    }
    if (i.trim() && (f(i), i = ""), e(r) > t) {
      u(r);
      continue;
    }
    i = r;
  }
  return (i.trim() || c === 0) && f(i || o), Math.max(1, c);
}
function g(o, e, t) {
  const s = h(e), c = String(o || "").split(`
`);
  return c.length === 0 ? 1 : c.reduce((i, f) => i + d(f, s, t), 0);
}
function p(o, e) {
  const { font: t, contentWidth: s, lineHeightPx: c, paddingY: i = 0, minHeight: f = 0, maxHeight: u } = e;
  let n = g(o, t, s) * c + i;
  return f > 0 && (n = Math.max(f, n)), typeof u == "number" && u > 0 && (n = Math.min(u, n)), Math.ceil(n);
}
export {
  h as c,
  m as f,
  p as m
};
