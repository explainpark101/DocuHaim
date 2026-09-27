function h(o) {
  if (typeof document > "u") return () => 0;
  const t = document.createElement("canvas").getContext("2d");
  return t ? (t.font = o || "14px sans-serif", (n) => n ? t.measureText(n).width : 0) : () => 0;
}
function w(o) {
  if (typeof window > "u") return "14px sans-serif";
  const e = window.getComputedStyle(o), t = e.fontWeight || "400", n = e.fontSize || "14px", s = e.fontFamily || "sans-serif";
  return `${t} ${n} ${s}`;
}
function d(o, e = 4) {
  const t = Math.max(1, Math.floor(e) || 4);
  let n = "", s = 0;
  for (const c of o) {
    if (c === "	") {
      const r = t - s % t;
      n += " ".repeat(r), s += r;
      continue;
    }
    if (c === `
`) {
      n += c, s = 0;
      continue;
    }
    n += c, s += 1;
  }
  return n;
}
function g(o, e, t) {
  if (t <= 0) return 1;
  const n = o;
  if (!n || e(n) <= t) return 1;
  const s = n.split(/(\s+)/).filter((i) => i.length > 0);
  let c = 0, r = "";
  const f = (i) => {
    i && (c += 1);
  }, u = (i) => {
    let a = "";
    for (const l of i) {
      const p = a + l;
      if (!a || e(p) <= t) {
        a = p;
        continue;
      }
      f(a), a = l;
    }
    r = a;
  };
  for (const i of s) {
    const a = r + i;
    if (e(a) <= t) {
      r = a;
      continue;
    }
    if (r.length > 0 && (f(r), r = ""), e(i) > t) {
      u(i);
      continue;
    }
    r = i;
  }
  return (r.length > 0 || c === 0) && f(r || n), Math.max(1, c);
}
function m(o, e, t) {
  return g(o, e, t);
}
function x(o, e, t) {
  const n = h(e), s = String(o || "").split(`
`);
  return s.length === 0 ? 1 : s.reduce((c, r) => c + m(r, n, t), 0);
}
function P(o, e, t, n = 4) {
  const s = h(e);
  return (o.length === 0 ? [""] : String(o).split(`
`)).map((r) => g(d(r, n), s, t));
}
function M(o, e) {
  const { font: t, contentWidth: n, lineHeightPx: s, paddingY: c = 0, minHeight: r = 0, maxHeight: f } = e;
  let i = x(o, t, n) * s + c;
  return r > 0 && (i = Math.max(r, i)), typeof f == "number" && f > 0 && (i = Math.min(f, i)), Math.ceil(i);
}
export {
  h as a,
  P as c,
  w as f,
  M as m
};
