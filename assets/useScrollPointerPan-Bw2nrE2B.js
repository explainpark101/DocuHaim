import { r as P } from "./vendor-react-BDjpSibw.js";
function k(t) {
  return t instanceof HTMLElement ? !!t.closest('textarea, input, select, [contenteditable="true"]') : false;
}
function I(t, p = true, u = {}) {
  const n = u.spaceDrag !== false, l = u.middleClick !== false, o = u.primaryDrag === true, i = u.axis ?? "both", y = u.shouldIgnorePrimaryTarget;
  P.useEffect(() => {
    if (!p || !t || !n && !l && !o) return;
    let a = false, r = null;
    const s = () => {
      if (r) {
        t.style.cursor = "grabbing", t.style.userSelect = "none";
        return;
      }
      if (n && a || o) {
        t.style.cursor = "grab", t.style.userSelect = "";
        return;
      }
      t.style.cursor = "", t.style.userSelect = "";
    }, L = () => {
      if (r) {
        try {
          t.releasePointerCapture(r.pointerId);
        } catch {
        }
        r = null, s();
      }
    }, m = (e) => {
      if (n && !(e.code !== "Space" && e.key !== " ") && !k(e.target)) {
        if (e.repeat) {
          e.preventDefault();
          return;
        }
        a = true, e.preventDefault(), s();
      }
    }, E = (e) => {
      n && (e.code !== "Space" && e.key !== " " || (a = false, r || s()));
    }, w = () => {
      a = false, L(), s();
    }, D = () => {
      const e = t.scrollWidth > t.clientWidth + 1, c = t.scrollHeight > t.clientHeight + 1;
      return i === "x" ? e : i === "y" ? c : e || c;
    }, g = (e) => {
      if (e.pointerType === "touch") return;
      const c = l && e.button === 1, f = n && e.button === 0 && a, x = o && e.button === 0 && !a && !(y == null ? void 0 : y(e.target));
      if (!(!c && !f && !x) && !k(e.target) && D()) {
        c && e.preventDefault(), (f || x) && e.preventDefault(), e.stopPropagation(), r = { pointerId: e.pointerId, lastX: e.clientX, lastY: e.clientY };
        try {
          t.setPointerCapture(e.pointerId);
        } catch {
        }
        s();
      }
    }, v = (e) => {
      if (!r || e.pointerId !== r.pointerId) return;
      const c = e.clientX - r.lastX, f = e.clientY - r.lastY;
      r.lastX = e.clientX, r.lastY = e.clientY, (i === "x" || i === "both") && (t.scrollLeft -= c), (i === "y" || i === "both") && (t.scrollTop -= f);
    }, d = (e) => {
      !r || e.pointerId !== r.pointerId || L();
    }, b = () => {
      r = null, s();
    }, h = (e) => {
      l && e.button === 1 && e.preventDefault();
    };
    return n && (window.addEventListener("keydown", m, true), window.addEventListener("keyup", E, true), window.addEventListener("blur", w)), t.addEventListener("pointerdown", g, true), t.addEventListener("pointermove", v), t.addEventListener("pointerup", d), t.addEventListener("pointercancel", d), t.addEventListener("lostpointercapture", b), l && t.addEventListener("auxclick", h), s(), () => {
      n && (window.removeEventListener("keydown", m, true), window.removeEventListener("keyup", E, true), window.removeEventListener("blur", w)), t.removeEventListener("pointerdown", g, true), t.removeEventListener("pointermove", v), t.removeEventListener("pointerup", d), t.removeEventListener("pointercancel", d), t.removeEventListener("lostpointercapture", b), l && t.removeEventListener("auxclick", h), t.style.cursor = "", t.style.userSelect = "";
    };
  }, [t, p, n, l, o, i, y]);
}
export {
  I as u
};
