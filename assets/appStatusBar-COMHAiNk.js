const n = "[data-app-status-bar]", a = 28;
function e() {
  const t = document.querySelector(n);
  return t instanceof HTMLElement ? t.getBoundingClientRect().top : window.innerHeight - 28;
}
function r() {
  return Math.max(0, Math.round(window.innerHeight - e()));
}
function o() {
  const t = document.querySelector(n);
  return t instanceof HTMLElement ? t : null;
}
export {
  a as A,
  o as a,
  r as b,
  e as g
};
