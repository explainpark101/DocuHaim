const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-pagedjs-DiDiH2Ep.js","assets/vendor-react-BFxggocB.js"])))=>i.map(i=>d[i]);
import { _ as h, __tla as __tla_0 } from "./vendor-md-editor-B-aq3e3o.js";
import "./vendor-pagedjs-DiDiH2Ep.js";
import { __tla as __tla_1 } from "./vendor-react-BFxggocB.js";
let S;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })()
]).then(async () => {
  const c = 1, C = 3;
  function l(t, e = 0) {
    return {
      node: t,
      offset: e,
      equals(n) {
        return !(!n || this.node && n.node && this.node !== n.node || this.offset != null && n.offset != null && this.offset !== n.offset);
      },
      toJSON(n) {
        var _a, _b, _c;
        if (!this.node) return {};
        let r;
        this.node.nodeType === c && ((_b = (_a = this.node).getAttribute) == null ? void 0 : _b.call(_a, "data-ref")) ? r = this.node.getAttribute("data-ref") ?? void 0 : n && ((_c = this.node.parentElement) == null ? void 0 : _c.getAttribute) && (r = this.node.parentElement.getAttribute("data-ref") ?? void 0);
        let o = 0;
        return this.node.parentElement && (o = Array.from(this.node.parentElement.childNodes).indexOf(this.node)), JSON.stringify({
          node: r,
          index: o,
          offset: this.offset
        });
      }
    };
  }
  function a(t) {
    return t ? t.nodeType === c ? t : t.nodeType === C ? t.parentElement : null : null;
  }
  function f(t) {
    var _a;
    const e = a(t);
    return e ? ((_a = e.classList) == null ? void 0 : _a.contains("export-pdf-code-line")) ? e : typeof e.closest == "function" ? e.closest(".export-pdf-code-line") : null : null;
  }
  const A = ".export-pdf-code-line, .export-pdf-code-lines, .export-pdf-code-body, .export-pdf-code-pre, .export-pdf-code-paged, .md-editor-code", L = ".md-editor-code, .export-pdf-code-paged";
  function d(t) {
    const e = a(t);
    return !e || typeof e.closest != "function" ? null : e.closest(L);
  }
  function u(t) {
    if (!(t == null ? void 0 : t.startContainer)) return null;
    const e = t.startContainer, n = t.startOffset ?? 0;
    if (e.nodeType === c) {
      const r = e.childNodes[n] ?? null, o = f(r);
      if (o) return o;
      if (n > 0) {
        const i = e.childNodes[n - 1] ?? null, s = f(i);
        if (s) return s;
      }
    }
    return f(e);
  }
  function R(t) {
    if (!(t == null ? void 0 : t.startContainer)) return false;
    if (u(t)) return true;
    const e = a(t.startContainer);
    return !!(e && typeof e.closest == "function" && e.closest(A));
  }
  function E(t) {
    if (!(t == null ? void 0 : t.startContainer)) return null;
    const e = u(t);
    if (e) return d(e);
    const n = t.startContainer;
    if (n.nodeType === c) {
      const r = n.childNodes[t.startOffset ?? 0] ?? null, o = d(r);
      if (o) return o;
    }
    return d(n);
  }
  function m(t, e) {
    var _a;
    if (!t || !(e == null ? void 0 : e.startContainer)) return false;
    const n = E(e);
    if (!n) return false;
    if (n === t || n.contains(t)) return true;
    const r = a(t);
    if (!r) return false;
    const o = n.getAttribute("data-ref");
    return !!(o && r.getAttribute("data-ref") === o || o && ((_a = d(r)) == null ? void 0 : _a.getAttribute("data-ref")) === o);
  }
  function _(t, e) {
    if (!t || !e) return false;
    const n = f(t);
    if (!n) return false;
    if (n === e) return true;
    const r = e.parentElement;
    if (!r || n.parentElement !== r) return false;
    const o = Array.from(r.children), i = o.indexOf(n), s = o.indexOf(e);
    return i < 0 || s < 0 ? false : i >= s;
  }
  function y(t, e) {
    var _a, _b;
    if (!t || !e || !((_a = e.classList) == null ? void 0 : _a.contains("export-pdf-code-page-chunk"))) return false;
    const n = d(t);
    if (!((_b = n == null ? void 0 : n.classList) == null ? void 0 : _b.contains("export-pdf-code-page-chunk")) || n === e) return false;
    const r = e.getAttribute("data-export-pdf-code-id"), o = n.getAttribute("data-export-pdf-code-id");
    return !!(r && o && r === o);
  }
  function p(t, e) {
    var _a, _b;
    const n = (_a = t.indexOfRefs) == null ? void 0 : _a[e];
    return n || (((_b = t.querySelector) == null ? void 0 : _b.call(t, `[data-ref='${e}']`)) ?? null);
  }
  function O(t, e) {
    var _a, _b, _c;
    const n = t.getAttribute("data-ref");
    if (n) {
      const o = p(e, n);
      if (o) return l(o, 0);
    }
    let r = t;
    for (; r; ) {
      const o = (_a = r.getAttribute) == null ? void 0 : _a.call(r, "data-ref");
      if (o) {
        const i = p(e, o);
        if (i) return l(i, 0);
      }
      if (((_b = r.classList) == null ? void 0 : _b.contains("md-editor-code")) || ((_c = r.classList) == null ? void 0 : _c.contains("export-pdf-code-paged"))) break;
      r = r.parentElement;
    }
  }
  function b(t, e) {
    var _a, _b, _c;
    if (!(t == null ? void 0 : t.startContainer) || !e) return;
    const n = E(t);
    if (n == null ? void 0 : n.classList.contains("export-pdf-code-page-chunk")) return O(n, e);
    const r = u(t);
    if (!r) return;
    const o = (_a = r.getAttribute) == null ? void 0 : _a.call(r, "data-ref");
    if (!o) return;
    const i = p(e, o);
    if (!(!i || !((_c = (_b = a(i)) == null ? void 0 : _b.classList) == null ? void 0 : _c.contains("export-pdf-code-line")))) return l(i, 0);
  }
  function v(t, e, n) {
    if (!R(e)) return;
    const r = E(e), o = u(e);
    if ((t == null ? void 0 : t.node) && r && y(t.node, r)) return n ? O(r, n) : void 0;
    if (!((t == null ? void 0 : t.node) && !m(t.node, e))) {
      if ((t == null ? void 0 : t.node) && o && m(t.node, e)) {
        const i = f(t.node);
        if (i) {
          const s = i.getAttribute("data-ref"), x = o.getAttribute("data-ref");
          if (s && x && s === x || _(t.node, o)) return;
        } else if ((r == null ? void 0 : r.classList.contains("export-pdf-code-page-chunk")) && (t.node === r || r.contains(t.node))) return;
      }
      return b(e, n);
    }
  }
  function k(t) {
    return class extends t {
      onBreakToken(n, r, o) {
        var _a;
        const i = ((_a = this.chunker) == null ? void 0 : _a.source) ?? null;
        return v(n, r, i);
      }
    };
  }
  let g = false;
  S = async function() {
    const t = await h(() => import("./vendor-pagedjs-DiDiH2Ep.js"), __vite__mapDeps([0,1]));
    if (!g) {
      const e = k(t.Handler);
      t.registerHandlers(e), g = true;
    }
    return t.Previewer;
  };
});
export {
  __tla,
  S as loadPagedJsPreviewer
};
