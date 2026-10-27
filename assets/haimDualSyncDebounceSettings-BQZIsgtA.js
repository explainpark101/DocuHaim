const t = "s3haim_haim_dual_sync_debounce_ms", a = "s3haim-haim-dual-sync-debounce", D = 150, E = 0, o = 2e3;
function e(_) {
  return Number.isFinite(_) ? Math.min(2e3, Math.max(0, Math.round(_))) : 150;
}
function A() {
  if (typeof window > "u") return 150;
  try {
    const _ = window.localStorage.getItem(t);
    return _ == null || _ === "" ? 150 : e(Number(_));
  } catch {
  }
  return 150;
}
function c(_) {
  if (typeof window > "u") return;
  const n = e(_);
  try {
    window.localStorage.setItem(t, String(n)), window.dispatchEvent(new CustomEvent(a, { detail: { ms: n } }));
  } catch {
  }
}
export {
  D as H,
  a,
  o as b,
  E as c,
  A as l,
  c as s
};
