const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-katex-NqpuB_gR.js","assets/vendor-katex-BEb3btRr.css","assets/vendor-mermaid-KdBUx0hU.js","assets/vendor-aws-Cvd3RhZI.js","assets/vendor-react-BDjpSibw.js"])))=>i.map(i=>d[i]);
import { _ as x } from "./vendor-aws-Cvd3RhZI.js";
import { r as E } from "./mermaidTheme-Deyx0OD8.js";
let H, O, D, v, m, W;
let __tla = (async () => {
  const _ = /\$\$([\s\S]*?)\$\$/g;
  let l = null;
  function T() {
    return l || (l = x(() => import("./vendor-katex-NqpuB_gR.js").then((e) => e.a), __vite__mapDeps([0,1])).then((e) => e.default)), l;
  }
  async function z(e) {
    let t = e;
    if (/\$\$/.test(e)) {
      const r = await T();
      t = e.replace(_, (n, a) => {
        try {
          return r.renderToString(String(a).trim(), {
            throwOnError: false,
            displayMode: true,
            output: "mathml"
          }).replace(/\n/g, " ").replace(/<annotation[\s\S]*?<\/annotation>/g, "").replace(/"/g, "'");
        } catch {
          return `$$${a}$$`;
        }
      });
    }
    return t = t.replace(/\\"/g, "#quot;"), t = t.replace(/\\n/g, "<br/>"), t;
  }
  function C(e) {
    const t = e.render.bind(e);
    e.render = async (r, n, a) => t(r, await z(n), a);
  }
  const L = 64, s = /* @__PURE__ */ new Map();
  function P(e) {
    const t = String(e || "");
    let r = 2166136261;
    for (let n = 0; n < t.length; n += 1) {
      const a = t.charCodeAt(n);
      r ^= a, r = Math.imul(r, 16777619);
    }
    return (r >>> 0).toString(16).padStart(8, "0");
  }
  function A(e, t) {
    return `${e}:${P(t)}:${t.length}`;
  }
  function g(e, t) {
    const r = s.get(A(e, t));
    return !r || r.source !== t ? null : r.svgHtml;
  }
  function M(e, t, r) {
    const n = A(e, t);
    for (s.has(n) && s.delete(n), s.set(n, {
      svgHtml: r,
      source: t
    }); s.size > L; ) {
      const a = s.keys().next().value;
      if (a == null) break;
      s.delete(a);
    }
  }
  let f = null, y = null, b = 0;
  function w() {
    return b += 1, `haim-mermaid-${Date.now().toString(36)}-${b}`;
  }
  async function I() {
    return f || (f = x(() => import("./vendor-mermaid-KdBUx0hU.js").then(async (m2) => {
      await m2.__tla;
      return m2;
    }), __vite__mapDeps([2,3,4])).then((e) => {
      const t = e.default ?? e;
      return C(t), t;
    })), f;
  }
  function S(e) {
    return E(e);
  }
  async function $(e) {
    const t = await I();
    return y !== e && (t.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: e
    }), y = e), t;
  }
  m = function(e) {
    return !(e instanceof HTMLElement) || !e.classList.contains("md-editor-mermaid") || e.getAttribute("data-processed") != null || e.getAttribute("data-haim-mermaid-image") === "1" || e.getAttribute("data-closed") === "false" || e.tagName !== "DIV" && e.tagName !== "P" ? false : e.closest("[data-haim-mermaid-embed]") ? true : !!(e.textContent || e.innerText || "").trim();
  };
  function R(e) {
    var _a;
    const t = e.closest("[data-haim-mermaid-embed]");
    return t ? (((_a = t.querySelector(".haim-mermaid-embed-pre")) == null ? void 0 : _a.textContent) || "").trim() : "";
  }
  v = function(e) {
    const t = (e.getAttribute("data-content") || "").trim();
    if (t) return t;
    const r = R(e);
    return r || (e.textContent || e.innerText || "").trim();
  };
  function h(e, t, r, n, a) {
    var _a;
    const i = document.createElement("p");
    i.className = "md-editor-mermaid", i.setAttribute("data-processed", ""), i.setAttribute("data-content", t), i.setAttribute("data-haim-mermaid-lazy", "1"), i.setAttribute("data-mermaid-theme", r);
    const c = n.getAttribute("data-line");
    c != null && i.setAttribute("data-line", c);
    const u = n.getAttribute("data-haim-imgbb-replace-key");
    u && i.setAttribute("data-haim-imgbb-replace-key", u);
    const o = n.getAttribute("data-mermaid-width"), d = n.getAttribute("data-mermaid-height");
    return o && i.setAttribute("data-mermaid-width", o), d && i.setAttribute("data-mermaid-height", d), (o || d) && (i.setAttribute("data-mermaid-sized", "1"), o && (i.style.width = o), d && (i.style.height = d), i.style.maxWidth = "100%", i.style.overflow = "hidden"), i.innerHTML = e, (_a = i.children[0]) == null ? void 0 : _a.removeAttribute("height"), a == null ? void 0 : a(i), i;
  }
  function k(e) {
    if (!m(e)) return null;
    const t = v(e);
    if (!t) return null;
    const r = S(e), n = g(r, t);
    if (!n) return null;
    const a = h(n, t, r, e);
    return e.replaceWith(a), a;
  }
  H = function(e) {
    if (!e) return 0;
    let t = 0;
    const r = [
      ...e.querySelectorAll(".md-editor-mermaid")
    ].filter((n) => m(n));
    for (const n of r) k(n) && (t += 1);
    return t;
  };
  W = async function(e) {
    if (!m(e)) return null;
    const t = v(e);
    if (!t) return null;
    const r = S(e), n = g(r, t);
    if (n) {
      const o = h(n, t, r, e);
      return e.replaceWith(o), o;
    }
    const a = await $(r), i = document.createElement("div"), c = Math.max(document.body.offsetWidth, 1366), u = Math.max(document.body.offsetHeight, 768);
    i.style.cssText = `width:${c}px;height:${u}px;position:fixed;z-index:-10000;top:-10000px;left:0;`, document.body.appendChild(i);
    try {
      const { svg: o, bindFunctions: d } = await a.render(w(), t, i);
      M(r, t, o);
      const p = h(o, t, r, e, d);
      return e.replaceWith(p), p;
    } catch (o) {
      return console.warn("[lazyMermaid] render failed", o), e.setAttribute("data-haim-mermaid-error", "1"), null;
    } finally {
      i.remove();
    }
  };
  O = async function(e) {
    if (!e) return;
    H(e);
    const t = [
      ...e.querySelectorAll(".md-editor-mermaid")
    ].filter((r) => m(r));
    for (const r of t) await W(r);
  };
  D = async function(e, t = "default") {
    const r = (e || "").trim();
    if (!r) return null;
    const n = g(t, r);
    if (n) return n;
    const a = await $(t), i = document.createElement("div"), c = Math.max(document.body.offsetWidth, 1366), u = Math.max(document.body.offsetHeight, 768);
    i.style.cssText = `width:${c}px;height:${u}px;position:fixed;z-index:-10000;top:-10000px;left:0;`, document.body.appendChild(i);
    try {
      const { svg: o } = await a.render(w(), r, i);
      return M(t, r, o), o;
    } catch (o) {
      return console.warn("[lazyMermaid] source render failed", o), null;
    } finally {
      i.remove();
    }
  };
})();
export {
  __tla,
  H as a,
  O as b,
  D as c,
  v as g,
  m as i,
  W as r
};
