const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/window-DBZdCc_s.js","assets/core-DhEqZVGG.js","assets/event-BK_86lmQ.js","assets/image-DNK7xb7J.js"])))=>i.map(i=>d[i]);
import { _ as V } from "./vendor-aws-Cvd3RhZI.js";
let D, ae, ie, re, oe;
let __tla = (async () => {
  D = function() {
    return typeof window > "u" ? false : "__TAURI_INTERNALS__" in window || "__TAURI__" in window;
  };
  const N = 15e3;
  let C = false, h = null;
  async function z() {
    if (D() && !C) {
      C = true, h != null && (clearTimeout(h), h = null);
      try {
        const { getCurrentWindow: e } = await V(async () => {
          const { getCurrentWindow: o } = await import("./window-DBZdCc_s.js").then((l) => l.w);
          return {
            getCurrentWindow: o
          };
        }, __vite__mapDeps([0,1,2,3])), t = e();
        await t.show();
        try {
          await t.setFocus();
        } catch {
        }
      } catch (e) {
        console.warn("[revealTauriMainWindow] show failed", e);
      }
    }
  }
  re = function() {
    D() && (C = true, h != null && (clearTimeout(h), h = null));
  };
  oe = function() {
    D() && (h == null && !C && (h = setTimeout(() => {
      z();
    }, N)), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        z();
      });
    }));
  };
  const j = "boot-manifest", H = [
    {
      re: /earlyBoot/i,
      label: "\uC2DC\uC791 \uD654\uBA74"
    },
    {
      re: /bootSplash/i,
      label: "\uC9C4\uD589\uB960 UI"
    },
    {
      re: /vendor-react/i,
      label: "React \uB7F0\uD0C0\uC784"
    },
    {
      re: /vendor-lucide/i,
      label: "\uC544\uC774\uCF58"
    },
    {
      re: /vendor-aws/i,
      label: "\uC2A4\uD1A0\uB9AC\uC9C0 SDK"
    },
    {
      re: /vendor-motion/i,
      label: "\uC560\uB2C8\uBA54\uC774\uC158"
    },
    {
      re: /vendor-radix/i,
      label: "UI \uCEF4\uD3EC\uB10C\uD2B8"
    },
    {
      re: /vendor-zip/i,
      label: "\uC555\uCD95 \uC720\uD2F8"
    },
    {
      re: /vendor-markdown-it/i,
      label: "Markdown \uC5D4\uC9C4"
    },
    {
      re: /vendor-md-editor/i,
      label: "\uB9C8\uD06C\uB2E4\uC6B4 \uC5D0\uB514\uD130"
    },
    {
      re: /vendor-codemirror/i,
      label: "\uCF54\uB4DC \uC5D0\uB514\uD130"
    },
    {
      re: /vendor-tiptap/i,
      label: "Haim \uC5D0\uB514\uD130"
    },
    {
      re: /vendor-katex/i,
      label: "\uC218\uC2DD \uB80C\uB354\uB7EC"
    },
    {
      re: /vendor-mermaid/i,
      label: "\uB2E4\uC774\uC5B4\uADF8\uB7A8"
    },
    {
      re: /vendor-google-genai/i,
      label: "AI SDK"
    },
    {
      re: /vendor-react-aria/i,
      label: "\uC811\uADFC\uC131 UI"
    },
    {
      re: /vendor-emoji/i,
      label: "\uC774\uBAA8\uC9C0"
    },
    {
      re: /mdEditorConfig/i,
      label: "\uC5D0\uB514\uD130 \uC124\uC815"
    },
    {
      re: /clipboardImageFiles/i,
      label: "\uC5D0\uB514\uD130 \uD655\uC7A5"
    },
    {
      re: /index-.*\.css/i,
      label: "\uC2A4\uD0C0\uC77C\uC2DC\uD2B8"
    },
    {
      re: /assets\/index-[^/]+\.js/i,
      label: "\uC571 \uCF54\uC5B4"
    },
    {
      re: /\/src\/main\./i,
      label: "\uC571 \uCF54\uC5B4"
    },
    {
      re: /\/src\/boot\/earlyBoot/i,
      label: "\uC2DC\uC791 \uD654\uBA74"
    },
    {
      re: /\.css$/i,
      label: "\uC2A4\uD0C0\uC77C\uC2DC\uD2B8"
    },
    {
      re: /\.js$/i,
      label: "\uC2A4\uD06C\uB9BD\uD2B8"
    }
  ];
  function I(e) {
    const t = (e.split("?")[0] || e).replace(/\\/g, "/");
    for (const { re: l, label: u } of H) if (l.test(t)) return u;
    const o = t.split("/").pop() || t;
    return o.length > 36 ? `${o.slice(0, 34)}\u2026` : o;
  }
  function _(e) {
    return !Number.isFinite(e) || e < 0 ? "0 B" : e < 1024 ? `${Math.round(e)} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(e < 10 * 1024 ? 1 : 0)} KB` : `${(e / (1024 * 1024)).toFixed(2)} MB`;
  }
  const K = 3800, B = [
    "Ctrl/Cmd+K \u2014 Advanced Search\uC5D0\uC11C \uD30C\uC77C\xB7\uBA85\uB839\xB7\uC124\uC815\uAE4C\uC9C0 \uD55C\uBC29\uC5D0 \uCC3E\uC544\uC694. \uB9C8\uC6B0\uC2A4 \uC190\uC808\uC758 \uC2DC\uC791\uC810\uC774\uC8E0",
    "\uC124\uC815 \uC774\uB984\uB9CC \uCCD0\uB3C4 \uCF1C\uAE30/\uB044\uAE30\uB9CC \uC608\uC058\uAC8C \uBCF4\uC5EC\uC918\uC694. \uAC80\uC0C9\uC774 \uB108\uBB34 \uB611\uB611\uD574\uC11C \uC0B4\uC9DD \uBB34\uC12D\uB124\uC694",
    "\uC774\uBBF8\uC9C0 \uB123\uACE0 \uC2F6\uC73C\uBA74 ![[\uACBD\uB85C]] \uC704\uD0A4 \uBB38\uBC95\uC744 \uC368 \uBCF4\uC138\uC694. \uB9C8\uD06C\uB2E4\uC6B4\uC774 \uAC11\uC790\uAE30 \uC778\uC2A4\uD0C0\uAC00 \uB418\uB294 \uB9C8\uBC95\uC774\uC5D0\uC694",
    "\uBBF8\uB9AC\uBCF4\uAE30 \uD45C \uAE38\uAC8C \uB204\uB974\uBA74 \uC140 \uD3B8\uC9D1\xB7\uC815\uB82C \uBA54\uB274\uAC00 \uC5F4\uB824\uC694. \uD45C\uAC00 \uAC11\uC790\uAE30 \uD611\uC870\uC801\uC774 \uB418\uC8E0",
    "PDF \uD398\uC774\uC9C0 \uB04A\uACE0 \uC2F6\uC744 \uB54C <pgbr/> \uD55C \uC904\uC774\uBA74 \uCDA9\uBD84\uD574\uC694. \uD398\uC774\uC9C0 \uBE0C\uB808\uC774\uD06C\uC758 \uC815\uC11D\uC774\uC790 \uCD5C\uAC15\uC774\uC8E0",
    "\uB098\uC640\uC758 \uCC44\uD305\uB3C4 \uB0A0\uC9DC\uBCC4 Markdown\uC73C\uB85C \uC313\uC5EC\uC694. \uD63C\uC7A3\uB9D0\uC774 \uBB38\uC11C\uAC00 \uB418\uB294 \uAE30\uC801\uC774\uB124\uC694",
    "\uAD75\uAC8C Ctrl/Cmd+B, \uAE30\uC6B8\uC784 Ctrl/Cmd+I \u2014 \uC190\uC740 \uD0A4\uBCF4\uB4DC\uC5D0, \uB9C8\uC74C\uC740 \uC790\uC720\uB85C\uC6CC\uC694",
    "\uC0AC\uC774\uB4DC\uBC14\uC5D0\uC11C \uAE38\uAC8C \uB204\uB974\uBA74 \uC774\uB3D9\xB7\uC774\uB984 \uBCC0\uACBD\xB7\uC0AD\uC81C\uAC00 \uD55C \uC190\uC5D0 \uAC00\uB2A5\uD574\uC694. \uC778\uC0DD \uC815\uB9AC\uC758 \uC2DC\uC791\uC774\uC8E0",
    "Export PDF\uC5D0\uC11C \uC6A9\uC9C0\xB7\uC5EC\uBC31\uC744 \uBC14\uAFD4 \uBCF4\uC138\uC694. \uC778\uC1C4 \uBBF8\uB9AC\uBCF4\uAE30\uAC00 \uAC11\uC790\uAE30 \uC9C4\uC9C0\uD574\uC9C0\uB124\uC694",
    "\uC124\uC815 \u2192 \uC6F9\uD3F0\uD2B8: CSS \uD55C \uD329 \uCD94\uAC00\uD558\uBA74 FontFamily\uC5D0 \uBC14\uB85C \uB4F1\uC7A5\uD574\uC694. \uD3F0\uD2B8 \uC218\uC9D1\uAC00\uC758 \uB099\uC6D0\uC774\uC5D0\uC694",
    "\uB178\uD2B8 \uCEE4\uBC84\uB294 <!-- note-cover --> \uBE14\uB85D\uC73C\uB85C \uCCAB\uC778\uC0C1\uC744 \uB9CC\uB4E4\uC5B4\uC694. \uCCAB\uC778\uC0C1\uC774 \uACE7 \uC778\uC0DD\uC774\uC8E0",
    "Haim \uC5D0\uB514\uD130\uC640 \uD074\uB798\uC2DD Markdown \uC5D0\uB514\uD130 \u2014 \uCDE8\uD5A5\uB300\uB85C \uC804\uD658\uD574 \uBCF4\uC138\uC694. \uC2E4\uD5D8 \uC815\uC2E0\uC740 \uC120\uD0DD\uC774\uC5D0\uC694",
    "\uAC80\uC0C9\uC740 \uC624\uD0C0\uC5D0\uB3C4 \uC5B4\uB290 \uC815\uB3C4 \uAD00\uB300\uD574\uC694. \uB300\uCDA9 \uCCD0\uB3C4 \uCC3E\uC544\uC8FC\uB294 \uB530\uB73B\uD55C \uAC10\uC131\uC774\uC8E0",
    "\uC800\uC7A5\uC18C\uB294 S3 \xB7 \uB85C\uCEEC \xB7 WebDAV \u2014 \uC791\uC5C5 \uBC29\uC2DD\uC5D0 \uB9DE\uAC8C \uACE8\uB77C \uBCF4\uC138\uC694. \uB370\uC774\uD130\uB294 \uB2F9\uC2E0\uC758 \uBC29\uC2DD\uB300\uB85C\uC608\uC694",
    "\uB85C\uB529\uC774 \uAE38\uC218\uB85D \uCEE4\uD53C\uAC00 \uB9DB\uC788\uC5B4\uC9C4\uB2E4\uB294 \uC804\uC124\u2026 \uC544\uC9C1\uC740 \uAC00\uC124 \uB2E8\uACC4\uC608\uC694. \uC2E4\uD5D8 \uC911\uC774\uC8E0"
  ], q = 48e3, $ = 18e4, Y = 0.86, J = 0.012, G = 400;
  function g(e) {
    return Number.isFinite(e) ? Math.min(1, Math.max(0, e)) : 0;
  }
  function Q() {
    try {
      return false;
    } catch {
      return false;
    }
  }
  function U() {
    var _a;
    const e = document.getElementById(j);
    if (!((_a = e == null ? void 0 : e.textContent) == null ? void 0 : _a.trim())) return null;
    try {
      const t = JSON.parse(e.textContent);
      return (t == null ? void 0 : t.version) !== 1 || !Array.isArray(t.assets) || !(t.totalBytes > 0) || t.assets.length === 0 ? null : t;
    } catch {
      return null;
    }
  }
  function X(e) {
    let t = e.split("?")[0] || e;
    try {
      t = new URL(e, location.href).pathname;
    } catch {
    }
    return t.replace(/^\//, "");
  }
  function Z(e, t) {
    const o = X(e), l = t.get(o);
    if (l) return l;
    for (const u of t.values()) if (o.endsWith(u.file) || o.endsWith(`/${u.file}`)) return u;
  }
  function ee(e) {
    const t = (e.split("?")[0] || e).toLowerCase();
    return !!(/\.(js|mjs|css|wasm|tsx?|jsx?)(\?|$)/i.test(t) || t.includes("/assets/") || t.includes("/src/") || t.includes("/node_modules/") || t.includes("/@fs/") || t.includes("/@id/") || t.includes("/@vite/"));
  }
  function te(e, t) {
    if (typeof t == "number" && t > 0) return t;
    const o = (e.split("?")[0] || e).toLowerCase();
    return o.endsWith(".css") ? 24e3 : o.includes("/src/") ? 16e3 : q;
  }
  ie = function() {
    if (typeof window < "u" && window.__docuhaimBootSplash) return window.__docuhaimBootSplash;
    const e = document.getElementById("boot-splash-status"), t = document.getElementById("boot-splash-detail"), o = document.getElementById("boot-splash-pct"), l = document.getElementById("boot-splash-bar-fill"), u = document.getElementById("boot-splash-bar"), R = Q(), S = R ? null : U(), A = /* @__PURE__ */ new Map();
    for (const n of (S == null ? void 0 : S.assets) || []) A.set(n.file.replace(/^\//, ""), n);
    const p = !!(S && S.totalBytes > 0 && A.size > 0), k = R || !p;
    let i = p ? S.totalBytes : 0, s = 0, v = 0, d = 0.04, b = false, y = "", E = 0, w = null, M = null;
    const x = /* @__PURE__ */ new Set(), F = () => {
      b || !e || B.length === 0 || (e.textContent = B[E % B.length] || "");
    }, L = () => {
      if (b) return;
      let n;
      if (p) n = g(Math.max(d, i > 0 ? s / i : d));
      else {
        const a = Math.max(i, s + $, 1);
        n = g(Math.max(d, s / a));
      }
      const r = Math.round(n * 100);
      return l && (l.style.width = `${r}%`), u && u.setAttribute("aria-valuenow", String(r)), o && (o.textContent = `${r}%`), r;
    }, O = (n) => {
      if (!(b || !t)) {
        if (n != null) {
          t.textContent = n;
          return;
        }
        if (L(), p) {
          const r = y ? ` \xB7 ${y}` : "";
          t.textContent = `${_(s)} / ${_(i)}${r}`;
          return;
        }
        if (v > 0) {
          const r = y ? ` \xB7 ${y}` : "", a = Math.max(i, s + $);
          t.textContent = `${_(s)} / ~${_(a)}${r}`;
          return;
        }
        t.textContent = "\uBAA8\uB4C8\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026";
      }
    }, f = (n) => {
      b || (L(), O(n));
    }, T = (n, r) => {
      if (b || !n) return;
      if (p) {
        const m = Z(n, A);
        if (!m) {
          y = I(n), f();
          return;
        }
        if (x.has(m.file)) return;
        x.add(m.file), s += m.bytes, v += 1, y = m.label || I(m.file), f();
        return;
      }
      if (!ee(n)) return;
      let a = n;
      try {
        a = new URL(n, location.href).href;
      } catch {
      }
      if (x.has(a)) return;
      x.add(a);
      const c = te(n, r);
      s += c, v += 1, i = Math.max(i, s) + $, y = I(a), d = Math.max(d, g(1 - Math.exp(-v * 0.11)) * 0.72), f();
    }, W = () => {
      w != null && (clearInterval(w), w = null), M != null && (clearInterval(M), M = null);
    }, P = {
      setStatus(n, r) {
        f(r ?? n);
      },
      setProgress(n) {
        d = Math.max(d, g(n)), f();
      },
      markResource: T,
      complete() {
        b = true, W(), d = 1, p ? s = i : i = Math.max(i, s), l && (l.style.width = "100%"), u && u.setAttribute("aria-valuenow", "100"), o && (o.textContent = "100%"), e && (e.textContent = "\uAC70\uC758 \uC644\uB8CC\u2026"), t && (t.textContent = p ? `${_(i)} / ${_(i)}` : "\uB85C\uB529 \uC644\uB8CC");
      }
    };
    E = Math.floor(Math.random() * B.length), F(), w = setInterval(() => {
      E = (E + 1) % B.length, F();
    }, K), k ? (f("\uBAA8\uB4C8\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\u2026"), M = setInterval(() => {
      b || (d = Math.min(Y, d + J), i > s + 8e3 && (i = Math.max(s + 8e3, i - 12e3)), f());
    }, G)) : f(`0 B / ${_(i)}`), document.querySelectorAll('link[rel="modulepreload"], link[rel="stylesheet"][href]').forEach((n) => {
      const r = n, a = r.href;
      if (!a) return;
      const c = () => T(a);
      r.addEventListener("load", c, {
        once: true
      }), r.addEventListener("error", c, {
        once: true
      });
    });
    try {
      new PerformanceObserver((r) => {
        for (const a of r.getEntries()) {
          const c = a, m = typeof c.transferSize == "number" && c.transferSize > 0 ? c.transferSize : typeof c.encodedBodySize == "number" && c.encodedBodySize > 0 ? c.encodedBodySize : void 0;
          T(a.name, m);
        }
      }).observe({
        type: "resource",
        buffered: true
      });
    } catch {
    }
    try {
      for (const n of performance.getEntriesByType("resource")) {
        const r = n, a = typeof r.transferSize == "number" && r.transferSize > 0 ? r.transferSize : typeof r.encodedBodySize == "number" && r.encodedBodySize > 0 ? r.encodedBodySize : void 0;
        T(n.name, a);
      }
    } catch {
    }
    return window.__docuhaimBootSplash = P, P;
  };
  ae = function() {
    return typeof window < "u" ? window.__docuhaimBootSplash : void 0;
  };
})();
export {
  __tla,
  D as a,
  ae as g,
  ie as i,
  re as m,
  oe as s
};
