const m = "s3haim_local_llm_model_aliases", p = "s3haim-local-llm-model-aliases-changed";
function a() {
  return { "mlx-vlm": {}, "llama-cpp": {} };
}
function u(t) {
  return !t || typeof t != "object" || Array.isArray(t) ? null : t;
}
function c(t) {
  const e = u(t);
  if (!e) return {};
  const r = {};
  for (const [n, o] of Object.entries(e)) {
    const l = String(n || "").trim();
    if (!l) continue;
    const i = typeof o == "string" ? o.trim() : "";
    i && (r[l] = i);
  }
  return r;
}
function L(t) {
  const e = u(t);
  return e ? { "mlx-vlm": c(e["mlx-vlm"]), "llama-cpp": c(e["llama-cpp"]) } : a();
}
function s() {
  try {
    const t = localStorage.getItem(m);
    return t ? L(JSON.parse(t)) : a();
  } catch {
    return a();
  }
}
function S(t) {
  localStorage.setItem(m, JSON.stringify(t)), window.dispatchEvent(new CustomEvent(p));
}
function g(t, e) {
  const r = String(e || "").trim();
  return r && s()[t][r] || "";
}
function A(t, e, r) {
  const n = String(e || "").trim();
  if (!n) return;
  const o = String(r || "").trim(), l = s(), i = { ...l[t] };
  o ? i[n] = o : delete i[n], S({ ...l, [t]: i });
}
function y(t, e) {
  const r = String(e || "").trim();
  return r ? g(t, r) || r : "";
}
function M(t, e, r = []) {
  const n = String(e || "").trim();
  if (!n) return "";
  const o = r.find((i) => i.id === n);
  if (o) return o.id;
  const l = r.find((i) => String(i.displayName || "").trim() === n);
  if (l) return l.id;
  if (t) {
    const i = s()[t];
    if (Object.prototype.hasOwnProperty.call(i, n)) return n;
    for (const [f, d] of Object.entries(i)) if (d === n) return f;
  }
  return n;
}
function _(t, e) {
  return e.map((r) => {
    const n = String(r.id || "").trim();
    return n ? { ...r, displayName: y(t, n) } : r;
  });
}
export {
  p as L,
  g,
  y as l,
  M as r,
  A as s,
  _ as w
};
