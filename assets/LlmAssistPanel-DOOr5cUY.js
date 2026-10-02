const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/webviewWindow-0EP45WND.js","assets/webview-CJ618jKN.js","assets/window-DBZdCc_s.js","assets/core-DhEqZVGG.js","assets/event-BK_86lmQ.js","assets/image-DNK7xb7J.js"])))=>i.map(i=>d[i]);
import { _ as D } from "./vendor-aws-Cvd3RhZI.js";
import { d as S, b as It, __tla as __tla_0 } from "./bootSplash-QPCcRCUR.js";
import { r as s, j as e, a as Mt, __tla as __tla_1 } from "./vendor-react-BDjpSibw.js";
import { ae as zt, G as Wt, b2 as $t, cQ as Ut, g as ye, L as Kt, p as Bt, e as Ft, i as Vt, cR as Yt, cS as Gt, __tla as __tla_2 } from "./index-5g86w2Ie.js";
import { u as qt, M as Jt } from "./useLazyMermaidRender-CMWw-qPT.js";
import { h as J, r as se, j as H, p as ve, n as Xe, k as Qe, l as Ht, m as Xt, O as Ie, M as Qt, G as Zt, __tla as __tla_3 } from "./OpenAiCompatibleModelSelect-DPN7i5b_.js";
import { L as er, a as tr } from "./LlamaCppModelSelect-BfEq1CsT.js";
import { r as ke, a as rr, e as ar } from "./llmAssistImages-DG7rjEWr.js";
import { E as ne, j as sr, x as nr, y as or, z as ir, A as lr, b as dr, a as cr, k as ur, d as pr, h as mr, F as xr } from "./vendor-codemirror-0YdHorwW.js";
import { A as Ze, m as Se } from "./vendor-motion-Dw-WnPM7.js";
import { a9 as br, k as Me, e as fr, aa as gr, T as et, a7 as ze, a as tt, O as hr, N as rt, X as at, ab as yr, ac as vr, ad as kr, J as jr, Y as wr, L as je, ae as Sr, af as Nr, ag as _r, ah as Cr, ai as Lr, j as Ar, aj as Er, w as Tr, S as We, m as Pr, E as Or, ak as $e, al as Rr, am as Dr, an as Ir, ao as Mr, o as zr } from "./vendor-lucide-Cix55NOo.js";
import { p as Wr, q as $r, r as Ue, s as Ke, h as st, y as Ur, z as Kr, B as Br, D as Fr, E as Vr, G as Yr, H as Gr, J as qr, i as ie, j as le, k as de, l as ce, A as ue, K as Jr, M as Hr, N as Xr, O as Qr, Q as Zr, U as ea, V as ta, W as ra, X as aa } from "./vendor-radix-DuLpLUUM.js";
let Aa, is, Xa, Qa, ds, v, as, ts, rs, Ha, ns, Za, ss, es, ls, os;
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
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_3;
    } catch {
    }
  })()
]).then(async () => {
  let Q;
  Q = "s3haim-llm-assist";
  v = {
    READY: `${Q}:ready`,
    SYNC: `${Q}:sync`,
    ACTION: `${Q}:action`,
    PARENT_CLOSING: `${Q}:parent-closing`
  };
  function sa(t) {
    return !!(t && typeof t.type == "string" && t.type.startsWith(Q));
  }
  function na() {
    if (S()) {
      const a = new URL(window.location.href);
      return a.hash = "#/llm-assist-popout", a.toString();
    }
    const r = `${"/DocuHaim/".replace(/\/$/, "") || "/"}/llm-assist-popout`.replace(/\/+/g, "/");
    return new URL(r, window.location.origin).toString();
  }
  const nt = "s3haim-llm-assist", ot = "popup=yes,width=480,height=820,menubar=no,toolbar=no,location=no,status=no,resizable=yes";
  function pe(t, r, a = {}) {
    !t || t.closed || t.postMessage({
      type: r,
      ...a
    }, window.location.origin);
  }
  const Z = nt, it = "main";
  function Y(t) {
    if (!sa(t)) return null;
    const r = t, a = {
      type: String(r.type)
    };
    return r.state && typeof r.state == "object" && (a.state = r.state), typeof r.action == "string" && (a.action = r.action), r.payload && typeof r.payload == "object" && (a.payload = r.payload), a;
  }
  function oa(t) {
    const r = {};
    for (const a of t.split(",")) {
      const [l, o] = a.trim().split("="), d = l == null ? void 0 : l.trim().toLowerCase(), n = o == null ? void 0 : o.trim();
      !d || !n || (d === "width" && (r.width = Number(n)), d === "height" && (r.height = Number(n)), d === "resizable" && (r.resizable = n === "yes" || n === "true" || n === "1"));
    }
    return r;
  }
  async function Ne() {
    const { WebviewWindow: t } = await D(async () => {
      const { WebviewWindow: r } = await import("./webviewWindow-0EP45WND.js");
      return {
        WebviewWindow: r
      };
    }, __vite__mapDeps([0,1,2,3,4,5]));
    return t.getByLabel(Z);
  }
  Ha = async function() {
    if (!S()) return false;
    const { getCurrentWebviewWindow: t } = await D(async () => {
      const { getCurrentWebviewWindow: r } = await import("./webviewWindow-0EP45WND.js");
      return {
        getCurrentWebviewWindow: r
      };
    }, __vite__mapDeps([0,1,2,3,4,5]));
    return t().label === Z;
  };
  Xa = async function() {
    if (!S()) return true;
    const { WebviewWindow: t } = await D(async () => {
      const { WebviewWindow: a } = await import("./webviewWindow-0EP45WND.js");
      return {
        WebviewWindow: a
      };
    }, __vite__mapDeps([0,1,2,3,4,5]));
    return await t.getByLabel(it) !== null;
  };
  async function ia() {
    const { WebviewWindow: t } = await D(async () => {
      const { WebviewWindow: o } = await import("./webviewWindow-0EP45WND.js");
      return {
        WebviewWindow: o
      };
    }, __vite__mapDeps([0,1,2,3,4,5])), r = await t.getByLabel(Z);
    if (r) return await r.setFocus(), true;
    const a = oa(ot), l = new t(Z, {
      url: "/#/llm-assist-popout",
      width: a.width ?? 480,
      height: a.height ?? 820,
      resizable: a.resizable ?? true,
      center: true,
      title: "AI \uB3C4\uC6B0\uBBF8"
    });
    return await new Promise((o) => {
      let d = false;
      const n = (u) => {
        d || (d = true, o(u));
      };
      l.once("tauri://created", () => n(true)), l.once("tauri://error", (u) => {
        console.warn("LLM assist Tauri popout failed:", u), n(false);
      }), window.setTimeout(() => n(true), 4e3);
    });
  }
  async function la() {
    const t = await Ne();
    t && await t.setFocus();
  }
  async function da() {
    return await Ne() !== null;
  }
  async function lt() {
    const t = await Ne();
    if (t) try {
      await t.close();
    } catch {
    }
  }
  Qa = async function() {
    if (!S()) return;
    const { getCurrentWebviewWindow: t } = await D(async () => {
      const { getCurrentWebviewWindow: r } = await import("./webviewWindow-0EP45WND.js");
      return {
        getCurrentWebviewWindow: r
      };
    }, __vite__mapDeps([0,1,2,3,4,5]));
    try {
      await t().close();
    } catch {
    }
  };
  function dt(t, r = {}) {
    (async () => {
      try {
        const { emitTo: a } = await D(async () => {
          const { emitTo: l } = await import("./event-BK_86lmQ.js");
          return {
            emitTo: l
          };
        }, __vite__mapDeps([4,3]));
        await a(Z, t, r);
      } catch (a) {
        console.warn("LLM assist emit to popout failed:", a);
      }
    })();
  }
  function ct(t, r = {}) {
    (async () => {
      try {
        const { emitTo: a } = await D(async () => {
          const { emitTo: l } = await import("./event-BK_86lmQ.js");
          return {
            emitTo: l
          };
        }, __vite__mapDeps([4,3]));
        await a(it, t, r);
      } catch (a) {
        console.warn("LLM assist emit to main failed:", a);
      }
    })();
  }
  async function ca(t) {
    const { getCurrentWebviewWindow: r } = await D(async () => {
      const { getCurrentWebviewWindow: d } = await import("./webviewWindow-0EP45WND.js");
      return {
        getCurrentWebviewWindow: d
      };
    }, __vite__mapDeps([0,1,2,3,4,5])), a = r(), l = await a.listen(v.READY, (d) => {
      const n = Y({
        type: v.READY,
        ...d.payload
      });
      n && t(n);
    }), o = await a.listen(v.ACTION, (d) => {
      const n = Y({
        type: v.ACTION,
        ...d.payload
      });
      n && t(n);
    });
    return () => {
      l(), o();
    };
  }
  async function ua(t) {
    const { getCurrentWebviewWindow: r } = await D(async () => {
      const { getCurrentWebviewWindow: d } = await import("./webviewWindow-0EP45WND.js");
      return {
        getCurrentWebviewWindow: d
      };
    }, __vite__mapDeps([0,1,2,3,4,5])), a = r(), l = await a.listen(v.SYNC, (d) => {
      const n = Y({
        type: v.SYNC,
        ...d.payload
      });
      n && t(n);
    }), o = await a.listen(v.PARENT_CLOSING, (d) => {
      const n = Y({
        type: v.PARENT_CLOSING,
        ...d.payload
      });
      n && t(n);
    });
    return () => {
      l(), o();
    };
  }
  Za = async function(t) {
    if (S()) {
      await la();
      return;
    }
    t && !t.closed && t.focus();
  };
  es = async function() {
    if (S()) return await ia() ? "tauri" : null;
    const t = na();
    return window.open(t, nt, ot);
  };
  ts = async function(t) {
    if (S()) {
      await lt();
      return;
    }
    if (t && !t.closed) try {
      t.close();
    } catch {
    }
  };
  rs = async function(t) {
    return S() ? da() : !!(t && !t.closed);
  };
  as = function(t, r) {
    if (S()) {
      dt(v.SYNC, {
        state: r
      });
      return;
    }
    !t || t.closed || pe(t, v.SYNC, {
      state: r
    });
  };
  ss = function(t) {
    if (S()) {
      dt(v.PARENT_CLOSING, {}), lt();
      return;
    }
    if (!(!t || t.closed)) {
      pe(t, v.PARENT_CLOSING);
      try {
        t.close();
      } catch {
      }
    }
  };
  ns = async function(t) {
    if (S()) return ca(t);
    const r = (a) => {
      if (a.origin !== window.location.origin) return;
      const l = Y(a.data);
      l && (l.type === v.READY || l.type === v.ACTION) && (l.source = a.source && typeof a.source.postMessage == "function" ? a.source : null, t(l));
    };
    return window.addEventListener("message", r), () => window.removeEventListener("message", r);
  };
  os = async function(t) {
    if (S()) return ua(t);
    const r = (a) => {
      if (a.origin !== window.location.origin) return;
      const l = Y(a.data);
      l && (l.type === v.SYNC || l.type === v.PARENT_CLOSING) && t(l);
    };
    return window.addEventListener("message", r), () => window.removeEventListener("message", r);
  };
  is = function() {
    if (S()) {
      ct(v.READY, {});
      return;
    }
    !window.opener || window.opener.closed || pe(window.opener, v.READY);
  };
  ls = function(t, r = {}) {
    if (S()) {
      ct(v.ACTION, {
        action: t,
        payload: r
      });
      return;
    }
    !window.opener || window.opener.closed || pe(window.opener, v.ACTION, {
      action: t,
      payload: r
    });
  };
  function pa({ value: t, onChange: r, className: a = "" }) {
    const l = s.useRef(null), o = s.useRef(null), d = s.useRef(r);
    return d.current = r, s.useEffect(() => {
      const n = l.current;
      if (!n) return;
      const u = new ne({
        parent: n,
        state: sr.create({
          doc: t,
          extensions: [
            or(),
            ir(),
            lr(),
            dr(),
            cr(),
            ur.of([
              ...pr,
              ...mr
            ]),
            xr(),
            nr,
            ne.lineWrapping,
            ne.updateListener.of((x) => {
              x.docChanged && d.current(x.state.doc.toString());
            }),
            ne.theme({
              "&": {
                height: "100%",
                fontSize: "12px"
              },
              ".cm-scroller": {
                overflow: "auto",
                fontFamily: "JetBrains Mono, D2Coding, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              },
              "&.cm-focused": {
                outline: "none"
              }
            })
          ]
        })
      });
      return o.current = u, () => {
        u.destroy(), o.current = null;
      };
    }, []), s.useEffect(() => {
      const n = o.current;
      if (!n) return;
      const u = n.state.doc.toString();
      u !== t && n.dispatch({
        changes: {
          from: 0,
          to: u.length,
          insert: t
        }
      });
    }, [
      t
    ]), e.jsx("div", {
      ref: l,
      className: `min-h-0 overflow-hidden rounded border border-gray-700/80 ${a}`
    });
  }
  const ma = [
    0.4,
    0,
    0.2,
    1
  ];
  function ut({ open: t, children: r, className: a = "" }) {
    return e.jsx(Ze, {
      initial: false,
      children: t ? e.jsx(Se.div, {
        initial: {
          height: 0,
          opacity: 0
        },
        animate: {
          height: "auto",
          opacity: 1
        },
        exit: {
          height: 0,
          opacity: 0
        },
        transition: {
          duration: 0.24,
          ease: ma
        },
        className: `overflow-hidden ${a}`,
        children: r
      }, "llm-assist-collapse") : null
    });
  }
  const Be = 80, xa = 350;
  function Fe(t) {
    return JSON.stringify(t);
  }
  function Ve(t) {
    try {
      const r = JSON.parse(t);
      return !r || typeof r != "object" || r.tab !== "fields" && r.tab !== "json" || !Array.isArray(r.entries) || typeof r.jsonText != "string" ? null : r;
    } catch {
      return null;
    }
  }
  function ba(t) {
    return !Array.isArray(t) || t.length === 0 ? [] : t.length <= Be ? t : t.slice(t.length - Be);
  }
  function fa(t, r, a) {
    const l = Array.isArray(t) && t.length > 0 ? t : [];
    if (l.length === 0) return {
      stack: [
        a
      ],
      index: 0,
      changed: true
    };
    const o = Math.max(0, Math.min(r, l.length - 1));
    if (l[o] === a) return {
      stack: l,
      index: o,
      changed: false
    };
    const d = l.slice(0, o + 1);
    d.push(a);
    const n = ba(d);
    return {
      stack: n,
      index: n.length - 1,
      changed: true
    };
  }
  function ga({ enabled: t, historyKey: r, tab: a, entries: l, jsonText: o, applySnapshot: d }) {
    const n = s.useRef([]), u = s.useRef(0), x = s.useRef(false), N = s.useRef(false), f = s.useRef(null), h = s.useRef(null), g = s.useRef(d);
    g.current = d;
    const [C, K] = s.useState(0), y = s.useCallback(() => K((b) => b + 1), []), w = s.useCallback(() => {
      f.current && (clearTimeout(f.current), f.current = null);
    }, []), O = s.useCallback(() => Fe({
      tab: a,
      entries: l,
      jsonText: o
    }), [
      l,
      o,
      a
    ]), _ = s.useCallback(() => {
      w();
      const b = h.current;
      if (b == null) return;
      h.current = null;
      const k = fa(n.current, u.current, b);
      k.changed && (n.current = k.stack, u.current = k.index, y());
    }, [
      y,
      w
    ]);
    s.useEffect(() => {
      if (!t) {
        w(), h.current = null, n.current = [], u.current = 0, N.current = false, y();
        return;
      }
      if (r <= 0) return;
      w(), h.current = null;
      const b = Fe({
        tab: a,
        entries: l,
        jsonText: o
      });
      n.current = [
        b
      ], u.current = 0, N.current = true, y();
    }, [
      t,
      r,
      y,
      w
    ]), s.useEffect(() => {
      if (!t || !N.current || x.current) return;
      const b = O();
      if (n.current[u.current] !== b) return h.current = b, w(), f.current = setTimeout(() => {
        f.current = null, _();
      }, xa), () => {
        w();
      };
    }, [
      w,
      O,
      t,
      _,
      l,
      o,
      a
    ]);
    const B = s.useCallback(() => {
      !t || !N.current || x.current || (h.current = O(), _());
    }, [
      O,
      t,
      _
    ]), L = s.useCallback(() => {
      if (_(), u.current <= 0) return false;
      u.current -= 1;
      const b = n.current[u.current], k = b ? Ve(b) : null;
      return k ? (x.current = true, g.current({
        tab: k.tab,
        entries: k.entries.map((c) => ({
          ...c
        })),
        jsonText: k.jsonText
      }), y(), requestAnimationFrame(() => {
        x.current = false;
      }), true) : false;
    }, [
      y,
      _
    ]), R = s.useCallback(() => {
      if (_(), u.current >= n.current.length - 1) return false;
      u.current += 1;
      const b = n.current[u.current], k = b ? Ve(b) : null;
      return k ? (x.current = true, g.current({
        tab: k.tab,
        entries: k.entries.map((c) => ({
          ...c
        })),
        jsonText: k.jsonText
      }), y(), requestAnimationFrame(() => {
        x.current = false;
      }), true) : false;
    }, [
      y,
      _
    ]), T = t && N.current && u.current > 0, W = t && N.current && u.current < n.current.length - 1;
    return {
      undo: L,
      redo: R,
      canUndo: T,
      canRedo: W,
      recordNow: B
    };
  }
  const ha = {
    temperature: {
      summary: "\uCD9C\uB825 \uBB34\uC791\uC704\uC131(\uCC3D\uC758\uC131)\uC744 \uC870\uC808\uD569\uB2C8\uB2E4.",
      detail: "\uB0AE\uC744\uC218\uB85D \uACB0\uC815\uC801\uC774\uACE0 \uC77C\uAD00\uB41C \uB2F5\uBCC0, \uB192\uC744\uC218\uB85D \uB2E4\uC591\uD558\uACE0 \uCC3D\uC758\uC801\uC778 \uB2F5\uBCC0\uC774 \uB098\uC635\uB2C8\uB2E4. \uC77C\uBC18\uC801\uC73C\uB85C 0~2 \uBC94\uC704\uB97C \uC0AC\uC6A9\uD558\uBA70, top_p\uC640 \uB3D9\uC2DC\uC5D0 \uD06C\uAC8C \uC870\uC815\uD558\uC9C0 \uC54A\uB294 \uAC83\uC774 \uC88B\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 0.4)"
    },
    top_p: {
      summary: "\uB204\uC801 \uD655\uB960 \uC0C1\uC704 \uD1A0\uD070\uB9CC \uC0D8\uD50C\uB9C1\uD569\uB2C8\uB2E4.",
      detail: "nucleus sampling\uC73C\uB85C, \uB204\uC801 \uD655\uB960\uC774 top_p \uC774\uD558\uC778 \uD1A0\uD070 \uC9D1\uD569\uC5D0\uC11C\uB9CC \uB2E4\uC74C \uD1A0\uD070\uC744 \uACE0\uB985\uB2C8\uB2E4. 0~1 \uBC94\uC704\uC774\uBA70 temperature \uB300\uC2E0 \uC774 \uAC12\uB9CC \uC870\uC815\uD558\uB294 \uACBD\uC6B0\uAC00 \uB9CE\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 0.9)"
    },
    top_k: {
      summary: "\uC0C1\uC704 K\uAC1C \uD1A0\uD070\uB9CC \uD6C4\uBCF4\uB85C \uC81C\uD55C\uD569\uB2C8\uB2E4.",
      detail: "\uAC00\uC7A5 \uD655\uB960\uC774 \uB192\uC740 K\uAC1C \uD1A0\uD070\uB9CC \uB2E4\uC74C \uD1A0\uD070 \uD6C4\uBCF4\uB85C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. OpenAI \uACF5\uC2DD API\uC5D0\uB294 \uC5C6\uACE0 vLLM \uB4F1 \uB85C\uCEEC \uCD94\uB860 \uC11C\uBC84\uC5D0\uC11C \uD754\uD788 \uC9C0\uC6D0\uD569\uB2C8\uB2E4. 0 \uB610\uB294 -1\uC740 \uBE44\uD65C\uC131\uD654\uB97C \uC758\uBBF8\uD558\uB294 \uACBD\uC6B0\uAC00 \uB9CE\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 40)"
    },
    min_p: {
      summary: "\uCD5C\uACE0 \uD655\uB960 \uB300\uBE44 \uB0AE\uC740 \uD1A0\uD070\uC744 \uC81C\uC678\uD569\uB2C8\uB2E4.",
      detail: "\uCD5C\uACE0 \uD655\uB960 \uD1A0\uD070 \xD7 min_p\uBCF4\uB2E4 \uB0AE\uC740 \uD655\uB960\uC758 \uD1A0\uD070\uC744 \uD6C4\uBCF4\uC5D0\uC11C \uC81C\uAC70\uD569\uB2C8\uB2E4. vLLM \uB4F1\uC5D0\uC11C \uC9C0\uC6D0\uD558\uB294 \uCD5C\uC18C \uD655\uB960 \uC0D8\uD50C\uB9C1 \uBC29\uC2DD\uC785\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 0.05)"
    },
    typical_p: {
      summary: "typical sampling\uC73C\uB85C \uD754\uD55C \uD1A0\uD070\uC744 \uC120\uD638\uD569\uB2C8\uB2E4.",
      detail: "\uAC01 \uD1A0\uD070\uC758 \uC815\uBCF4 \uC774\uB860\uC801 \uAE30\uB300\uAC12\uACFC \uC2E4\uC81C \uD655\uB960 \uCC28\uC774\uB97C \uAE30\uC900\uC73C\uB85C \uC0D8\uD50C\uB9C1\uD569\uB2C8\uB2E4. \uB85C\uCEEC \uCD94\uB860 \uC5D4\uC9C4\uC5D0\uC11C \uC9C0\uC6D0\uD558\uB294 \uACBD\uC6B0\uAC00 \uC788\uC73C\uBA70, \uBAA8\uB378/\uC11C\uBC84\uB9C8\uB2E4 \uB3D9\uC791\uC774 \uB2E4\uB97C \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 0.95)"
    },
    max_tokens: {
      summary: "\uC0DD\uC131\uD560 \uCD5C\uB300 \uD1A0\uD070 \uC218\uB97C \uC81C\uD55C\uD569\uB2C8\uB2E4.",
      detail: "\uC644\uC131(completion)\uC5D0 \uD5C8\uC6A9\uB418\uB294 \uCD5C\uB300 \uD1A0\uD070 \uC218\uC785\uB2C8\uB2E4. OpenAI \uD638\uD658 API\uC5D0\uC11C \uAC00\uC7A5 \uD754\uD55C \uAE38\uC774 \uC81C\uD55C \uD544\uB4DC\uC774\uBA70, \uBE44\uC6A9\uACFC \uC751\uB2F5 \uAE38\uC774\uB97C \uC9C1\uC811 \uC81C\uC5B4\uD569\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 1024)"
    },
    max_completion_tokens: {
      summary: "\uC644\uC131 \uD1A0\uD070 \uC0C1\uD55C(\uC2E0\uADDC OpenAI \uC2A4\uD0C0\uC77C)\uC785\uB2C8\uB2E4.",
      detail: "\uC77C\uBD80 \uCD5C\uC2E0 \uBAA8\uB378/API\uB294 max_tokens \uB300\uC2E0 max_completion_tokens\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uC11C\uBC84\uAC00 \uB458 \uC911 \uD558\uB098\uB9CC \uC778\uC2DD\uD560 \uC218 \uC788\uC73C\uBBC0\uB85C \uBB38\uC11C\uB97C \uD655\uC778\uD558\uC138\uC694.",
      valuePlaceholder: "number (\uC608: 1024)"
    },
    n: {
      summary: "\uD55C \uC694\uCCAD\uC5D0\uC11C \uC0DD\uC131\uD560 \uC751\uB2F5 \uAC1C\uC218\uC785\uB2C8\uB2E4.",
      detail: "\uAE30\uBCF8\uAC12\uC740 1\uC785\uB2C8\uB2E4. 1\uBCF4\uB2E4 \uD06C\uBA74 \uC5EC\uB7EC completion\uC744 \uBC18\uD658\uD558\uBA70, \uD1A0\uD070 \uC0AC\uC6A9\uB7C9\uACFC \uBE44\uC6A9\uC774 \uADF8\uB9CC\uD07C \uB298\uC5B4\uB0A9\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 1)"
    },
    frequency_penalty: {
      summary: "\uC774\uBBF8 \uC790\uC8FC \uB098\uC628 \uD1A0\uD070\uC758 \uC7AC\uB4F1\uC7A5\uC744 \uC5B5\uC81C\uD569\uB2C8\uB2E4.",
      detail: "\uC0DD\uC131 \uD14D\uC2A4\uD2B8\uC5D0\uC11C \uB4F1\uC7A5 \uBE48\uB3C4\uAC00 \uB192\uC740 \uD1A0\uD070\uC5D0 \uD328\uB110\uD2F0\uB97C \uC90D\uB2C8\uB2E4. \uBC18\uBCF5 \uD45C\uD604\uC744 \uC904\uC774\uACE0 \uC2F6\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 0.5)"
    },
    presence_penalty: {
      summary: "\uD55C \uBC88\uC774\uB77C\uB3C4 \uB098\uC628 \uD1A0\uD070\uC758 \uC7AC\uB4F1\uC7A5\uC744 \uC5B5\uC81C\uD569\uB2C8\uB2E4.",
      detail: "\uC774\uBBF8 \uB4F1\uC7A5\uD55C \uD1A0\uD070(\uC8FC\uC81C/\uB2E8\uC5B4)\uC758 \uC7AC\uC0AC\uC6A9\uC744 \uC904\uC5EC \uC0C8\uB85C\uC6B4 \uD45C\uD604\uC774\uB098 \uC8FC\uC81C\uB85C \uC774\uB3D9\uD558\uB3C4\uB85D \uC720\uB3C4\uD569\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 0.5)"
    },
    repetition_penalty: {
      summary: "\uBC18\uBCF5 \uD1A0\uD070\uC5D0 \uB300\uD55C \uC77C\uBC18 \uD328\uB110\uD2F0\uC785\uB2C8\uB2E4.",
      detail: "Hugging Face / vLLM \uC2A4\uD0C0\uC77C \uCD94\uB860\uC5D0\uC11C \uD754\uD569\uB2C8\uB2E4. 1.0\uC774\uBA74 \uD328\uB110\uD2F0 \uC5C6\uC74C, 1\uBCF4\uB2E4 \uD06C\uBA74 \uBC18\uBCF5\uC744 \uC5B5\uC81C\uD569\uB2C8\uB2E4. OpenAI \uD45C\uC900 \uD544\uB4DC\uB294 \uC544\uB2D9\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 1.1)"
    },
    seed: {
      summary: "\uC0D8\uD50C\uB9C1 \uC2DC\uB4DC\uB85C \uC7AC\uD604\uC131\uC744 \uB192\uC785\uB2C8\uB2E4.",
      detail: "\uAC19\uC740 seed\uC640 \uB3D9\uC77C \uC870\uAC74\uC774\uBA74 \uBE44\uC2B7\uD55C \uACB0\uACFC\uB97C \uAE30\uB300\uD560 \uC218 \uC788\uC9C0\uB9CC, \uC11C\uBC84/\uBAA8\uB378/\uBCD1\uB82C \uCC98\uB9AC\uC5D0 \uB530\uB77C \uC644\uC804\uD55C \uC7AC\uD604\uC740 \uBCF4\uC7A5\uB418\uC9C0 \uC54A\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 42)"
    },
    min_tokens: {
      summary: "\uCD5C\uC18C \uC0DD\uC131 \uD1A0\uD070 \uC218\uB97C \uC9C0\uC815\uD569\uB2C8\uB2E4.",
      detail: "EOS\uB098 stop \uC870\uAC74\uC774 \uB098\uC624\uAE30 \uC804\uAE4C\uC9C0 \uCD5C\uC18C\uD55C \uC774 \uD1A0\uD070 \uC218\uB9CC\uD07C\uC740 \uC0DD\uC131\uD558\uB3C4\uB85D \uD569\uB2C8\uB2E4. vLLM \uB4F1 \uB85C\uCEEC \uCD94\uB860\uC5D0\uC11C \uC9C0\uC6D0\uD558\uB294 \uACBD\uC6B0\uAC00 \uC788\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 1)"
    },
    stop: {
      summary: "\uC9C0\uC815 \uBB38\uC790\uC5F4\uC774 \uB098\uC624\uBA74 \uC0DD\uC131\uC744 \uC911\uB2E8\uD569\uB2C8\uB2E4.",
      detail: "\uBB38\uC790\uC5F4 \uD558\uB098 \uB610\uB294 \uBC30\uC5F4\uC744 \uC9C0\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uD574\uB2F9 \uC2DC\uD000\uC2A4\uAC00 \uCD9C\uB825\uB418\uBA74 \uC0DD\uC131\uC774 \uC885\uB8CC\uB429\uB2C8\uB2E4.",
      valuePlaceholder: 'string | string[] (\uC608: "\\n")'
    },
    stop_token_ids: {
      summary: "\uC9C0\uC815 \uD1A0\uD070 ID\uAC00 \uB098\uC624\uBA74 \uC0DD\uC131\uC744 \uC911\uB2E8\uD569\uB2C8\uB2E4.",
      detail: "\uBB38\uC790\uC5F4 stop \uB300\uC2E0 \uD1A0\uD070 ID\uB85C \uC911\uB2E8 \uC870\uAC74\uC744 \uC9C0\uC815\uD569\uB2C8\uB2E4. vLLM \uB4F1 \uB85C\uCEEC \uCD94\uB860 \uD655\uC7A5 \uC635\uC158\uC785\uB2C8\uB2E4.",
      valuePlaceholder: "number[] (\uC608: [128001])"
    },
    ignore_eos: {
      summary: "EOS \uD1A0\uD070\uC744 \uBB34\uC2DC\uD558\uACE0 \uACC4\uC18D \uC0DD\uC131\uD569\uB2C8\uB2E4.",
      detail: "\uBAA8\uB378\uC758 \uC885\uB8CC(EOS) \uD1A0\uD070\uC744 \uB9CC\uB098\uB3C4 \uB2E4\uB978 \uC911\uB2E8 \uC870\uAC74(max_tokens, stop \uB4F1)\uAE4C\uC9C0 \uC0DD\uC131\uC744 \uC774\uC5B4\uAC11\uB2C8\uB2E4.",
      valuePlaceholder: "boolean (\uC608: true)"
    },
    logprobs: {
      summary: "\uD1A0\uD070\uBCC4 \uB85C\uADF8 \uD655\uB960\uC744 \uBC18\uD658\uD569\uB2C8\uB2E4.",
      detail: "true\uC774\uBA74 \uAC01 \uCD9C\uB825 \uD1A0\uD070\uC758 log probability \uC815\uBCF4\uB97C \uC751\uB2F5\uC5D0 \uD3EC\uD568\uD569\uB2C8\uB2E4. \uB514\uBC84\uAE45\uC774\uB098 \uD655\uB960 \uBD84\uC11D\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      valuePlaceholder: "boolean (\uC608: true)"
    },
    top_logprobs: {
      summary: "\uAC01 \uC704\uCE58\uC5D0\uC11C \uC0C1\uC704 \uB300\uC548 \uD1A0\uD070 logprob\uB97C \uBC18\uD658\uD569\uB2C8\uB2E4.",
      detail: "logprobs\uAC00 \uCF1C\uC838 \uC788\uC744 \uB54C, \uAC01 \uD1A0\uD070 \uC704\uCE58\uB9C8\uB2E4 \uC0C1\uC704 N\uAC1C \uB300\uC548\uC758 log probability\uB97C \uD568\uAED8 \uBC1B\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 5)"
    },
    prompt_logprobs: {
      summary: "\uD504\uB86C\uD504\uD2B8 \uD1A0\uD070\uC758 logprob\uB97C \uBC18\uD658\uD569\uB2C8\uB2E4.",
      detail: "\uC785\uB825 \uD504\uB86C\uD504\uD2B8 \uAC01 \uD1A0\uD070\uC5D0 \uB300\uD55C log probability\uB97C \uC751\uB2F5\uC5D0 \uD3EC\uD568\uD569\uB2C8\uB2E4. vLLM \uB4F1 \uB85C\uCEEC \uCD94\uB860 \uD655\uC7A5\uC785\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 0)"
    },
    verbosity: {
      summary: "\uCD9C\uB825 \uC0C1\uC138\uB3C4 \uC218\uC900\uC744 \uC870\uC808\uD569\uB2C8\uB2E4.",
      detail: "\uC77C\uBD80 OpenAI \uBAA8\uB378\uC5D0\uC11C low / medium / high\uB85C \uC751\uB2F5 \uAE38\uC774\xB7\uC0C1\uC138\uB3C4\uB97C \uC870\uC808\uD569\uB2C8\uB2E4. \uC9C0\uC6D0 \uBAA8\uB378\uACFC \uAC12\uC740 \uC81C\uACF5\uC790\uB9C8\uB2E4 \uB2E4\uB985\uB2C8\uB2E4.",
      valuePlaceholder: '"low" | "medium" | "high"'
    },
    reasoning_effort: {
      summary: "\uCD94\uB860(\uC0AC\uACE0) \uBAA8\uB378\uC758 \uB178\uB825 \uC218\uC900\uC744 \uC124\uC815\uD569\uB2C8\uB2E4.",
      detail: "reasoning-capable \uBAA8\uB378\uC5D0\uC11C \uB0B4\uBD80 \uCD94\uB860 \uAE4A\uC774\uB97C none / low / medium / high \uB4F1\uC73C\uB85C \uC870\uC808\uD569\uB2C8\uB2E4. \uC815\uD655\uD55C \uAC12\uACFC \uC758\uBBF8\uB294 \uBAA8\uB378\xB7\uC81C\uACF5\uC790\uC5D0 \uB530\uB77C \uB2E4\uB985\uB2C8\uB2E4.",
      valuePlaceholder: '"none" | "low" | "medium" | "high"'
    },
    thinking_token_budget: {
      summary: "\uB0B4\uBD80 \uC0AC\uACE0(thinking) \uD1A0\uD070 \uC608\uC0B0\uC744 \uC9C0\uC815\uD569\uB2C8\uB2E4.",
      detail: "\uCD94\uB860/\uC0AC\uACE0 \uAD6C\uAC04\uC5D0 \uD560\uB2F9\uD560 \uCD5C\uB300 \uD1A0\uD070 \uC218\uC785\uB2C8\uB2E4. \uB85C\uCEEC \uCD94\uB860 \uC5D4\uC9C4\uC774\uB098 thinking \uBAA8\uB378\uC5D0\uC11C \uC9C0\uC6D0\uD558\uB294 \uACBD\uC6B0\uAC00 \uC788\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 1024)"
    },
    include_reasoning: {
      summary: "\uC751\uB2F5\uC5D0 \uCD94\uB860/\uC0AC\uACE0 \uB0B4\uC6A9\uC744 \uD3EC\uD568\uD560\uC9C0 \uC124\uC815\uD569\uB2C8\uB2E4.",
      detail: "\uBAA8\uB378\uC774 \uB0B4\uBD80 reasoning\uC744 \uBCC4\uB3C4 \uD544\uB4DC\uB85C \uBC18\uD658\uD558\uB3C4\uB85D \uC694\uCCAD\uD569\uB2C8\uB2E4. \uC81C\uACF5\uC790\xB7\uBAA8\uB378 \uC9C0\uC6D0 \uC5EC\uBD80\uC5D0 \uB530\uB77C \uB3D9\uC791\uC774 \uB2EC\uB77C\uC9D1\uB2C8\uB2E4.",
      valuePlaceholder: "boolean (\uC608: true)"
    },
    use_beam_search: {
      summary: "\uC0D8\uD50C\uB9C1 \uB300\uC2E0 \uBE54 \uC11C\uCE58\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
      detail: "\uD655\uB960\uC801 \uC0D8\uD50C\uB9C1 \uB300\uC2E0 \uBE54 \uC11C\uCE58\uB85C \uC5EC\uB7EC \uD6C4\uBCF4 \uACBD\uB85C\uB97C \uD0D0\uC0C9\uD569\uB2C8\uB2E4. \uC8FC\uB85C vLLM \uB4F1 \uB85C\uCEEC \uCD94\uB860\uC5D0\uC11C \uC9C0\uC6D0\uD558\uBA70, \uC0DD\uC131 \uC18D\uB3C4\uC640 \uBE44\uC6A9\uC774 \uB2EC\uB77C\uC9C8 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "boolean (\uC608: false)"
    },
    length_penalty: {
      summary: "\uBE54 \uC11C\uCE58 \uC2DC \uC2DC\uD000\uC2A4 \uAE38\uC774 \uD328\uB110\uD2F0\uB97C \uC801\uC6A9\uD569\uB2C8\uB2E4.",
      detail: "use_beam_search\uAC00 \uCF1C\uC838 \uC788\uC744 \uB54C \uAE34/\uC9E7\uC740 \uC2DC\uD000\uC2A4\uB97C \uC120\uD638\uD558\uB3C4\uB85D \uC810\uC218\uB97C \uC870\uC815\uD569\uB2C8\uB2E4. 1.0\uC774 \uC911\uB9BD\uC5D0 \uAC00\uAE5D\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 1.0)"
    },
    response_format: {
      summary: "\uCD9C\uB825 \uD615\uC2DD(JSON \uB4F1)\uC744 \uC9C0\uC815\uD569\uB2C8\uB2E4.",
      detail: '\uC608: { "type": "text" }, { "type": "json_object" }, json_schema \uB4F1. \uAD6C\uC870\uD654\uB41C \uCD9C\uB825\uC774 \uD544\uC694\uD560 \uB54C \uC0AC\uC6A9\uD558\uBA70, \uBAA8\uB378\uC774 \uD574\uB2F9 \uD615\uC2DD\uC744 \uC9C0\uC6D0\uD574\uC57C \uD569\uB2C8\uB2E4.',
      valuePlaceholder: 'object (\uC608: {"type":"json_object"})'
    },
    user: {
      summary: "\uCD5C\uC885 \uC0AC\uC6A9\uC790 \uC2DD\uBCC4\uC790(\uC81C\uACF5\uC790 \uBA54\uD0C0\uB370\uC774\uD130)\uC785\uB2C8\uB2E4.",
      detail: "OpenAI \uD638\uD658 API\uC758 end-user ID \uD544\uB4DC\uC785\uB2C8\uB2E4. \uB0A8\uC6A9 \uBC29\uC9C0\xB7\uAC10\uC0AC \uBAA9\uC801\uC73C\uB85C \uC81C\uACF5\uC790\uAC00 \uC0AC\uC6A9\uD560 \uC218 \uC788\uC73C\uBA70, \uC571 \uB3D9\uC791 \uC790\uCCB4\uB97C \uBC14\uAFB8\uC9C0\uB294 \uC54A\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: 'string (\uC608: "user-123")'
    },
    truncate_prompt_tokens: {
      summary: "\uD504\uB86C\uD504\uD2B8\uB97C \uCD5C\uB300 \uD1A0\uD070 \uC218\uB85C \uC798\uB77C\uB0C5\uB2C8\uB2E4.",
      detail: "\uCEE8\uD14D\uC2A4\uD2B8\uAC00 \uAE38 \uB54C \uC55E/\uB4A4\uB97C \uC798\uB77C \uBAA8\uB378 \uD55C\uB3C4\uC5D0 \uB9DE\uCDA5\uB2C8\uB2E4. -1\uC740 \uC798\uB77C\uB0B4\uC9C0 \uC54A\uC74C\uC744 \uC758\uBBF8\uD558\uB294 \uAD6C\uD604\uB3C4 \uC788\uC2B5\uB2C8\uB2E4.",
      valuePlaceholder: "number (\uC608: 4096)"
    },
    truncation_side: {
      summary: "\uD504\uB86C\uD504\uD2B8\uB97C \uC790\uB97C \uB54C left \uB610\uB294 right\uB97C \uC120\uD0DD\uD569\uB2C8\uB2E4.",
      detail: "truncate_prompt_tokens\uC640 \uD568\uAED8 \uC0AC\uC6A9\uD569\uB2C8\uB2E4. left\uB294 \uC55E\uBD80\uBD84\uC744, right\uB294 \uB4B7\uBD80\uBD84\uC744 \uC720\uC9C0\uD558\uB294 \uC2DD\uC73C\uB85C \uC798\uB77C\uB0C5\uB2C8\uB2E4.",
      valuePlaceholder: '"left" | "right"'
    },
    skip_special_tokens: {
      summary: "\uB514\uCF54\uB529 \uC2DC \uD2B9\uC218 \uD1A0\uD070\uC744 \uCD9C\uB825\uC5D0\uC11C \uC81C\uAC70\uD569\uB2C8\uB2E4.",
      detail: "BOS/EOS \uB4F1 \uD2B9\uC218 \uD1A0\uD070\uC744 \uCD5C\uC885 \uD14D\uC2A4\uD2B8\uC5D0 \uD3EC\uD568\uD558\uC9C0 \uC54A\uB3C4\uB85D \uD569\uB2C8\uB2E4. \uB85C\uCEEC \uCD94\uB860 \uC5D4\uC9C4\uC5D0\uC11C \uD754\uD55C \uC635\uC158\uC785\uB2C8\uB2E4.",
      valuePlaceholder: "boolean (\uC608: true)"
    },
    echo: {
      summary: "\uC785\uB825 \uD504\uB86C\uD504\uD2B8\uB97C \uC751\uB2F5\uC5D0 \uD568\uAED8 \uBC18\uD658\uD569\uB2C8\uB2E4.",
      detail: "completion API\uC5D0\uC11C \uD504\uB86C\uD504\uD2B8\uC640 \uC0DD\uC131 \uACB0\uACFC\uB97C \uD55C \uBC88\uC5D0 \uBC1B\uC744 \uB54C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uCC44\uD305 API\uC5D0\uC11C\uB294 \uB35C \uD754\uD569\uB2C8\uB2E4.",
      valuePlaceholder: "boolean (\uC608: false)"
    }
  }, Ye = {
    detail: "\uC81C\uC548 \uBAA9\uB85D\uC5D0 \uC5C6\uB294 key\uB3C4 OpenAI \uD638\uD658 \uC694\uCCAD \uBCF8\uBB38\uC5D0 \uADF8\uB300\uB85C \uD569\uCCD0\uC9D1\uB2C8\uB2E4. \uC11C\uBC84/\uBAA8\uB378\uC774 \uC9C0\uC6D0\uD558\uB294\uC9C0\uB294 \uC81C\uACF5\uC790 \uBB38\uC11C\uB97C \uD655\uC778\uD558\uC138\uC694. \uAC12\uC740 JSON \uB9AC\uD130\uB7F4(\uC22B\uC790, \uBD88\uB9AC\uC5B8, \uBC30\uC5F4, \uAC1D\uCCB4) \uB610\uB294 \uBB38\uC790\uC5F4\uB85C \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
    valuePlaceholder: 'JSON \uAC12 (\uC608: 0.4, true, "text", [1,2])'
  }, ya = {
    summary: "\uC635\uC158 \uD0A4\uB97C \uC120\uD0DD\uD558\uAC70\uB098 \uC785\uB825\uD558\uC138\uC694.",
    detail: "\uC81C\uC548 \uBAA9\uB85D\uC5D0\uC11C key\uB97C \uACE0\uB974\uAC70\uB098 \uC9C1\uC811 \uC785\uB825\uD55C \uB4A4 value\uB97C \uC124\uC815\uD569\uB2C8\uB2E4. key\uAC00 \uBE44\uC5B4 \uC788\uC73C\uBA74 \uC694\uCCAD\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
    valuePlaceholder: "value (\uD0A4 \uC120\uD0DD \uD6C4 \uD615\uC2DD \uD45C\uC2DC)"
  };
  function oe(t) {
    const r = t.trim();
    if (!r) return ya;
    const a = ha[r];
    return a || {
      summary: `\uC0AC\uC6A9\uC790 \uC815\uC758 \uC635\uC158 "${r}"\uC785\uB2C8\uB2E4.`,
      detail: `${Ye.detail}

\uD604\uC7AC key: ${r}`,
      valuePlaceholder: Ye.valuePlaceholder
    };
  }
  function va(t) {
    return oe(t).valuePlaceholder;
  }
  function ka(t) {
    const r = t.trim(), a = r ? `OpenAI API ${r} parameter LLM` : "OpenAI chat completion API parameters";
    return `https://www.google.com/search?q=${encodeURIComponent(a)}`;
  }
  const Ge = "z-100010 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong", ja = "z-100011 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong", wa = "cursor-pointer rounded px-2 py-1 text-[11px] outline-none data-disabled:cursor-not-allowed data-disabled:opacity-40 data-highlighted:bg-violet-50 dark:data-highlighted:bg-violet-950/40", Sa = "\uC81C\uC548 \uBAA9\uB85D\uC5D0 \uC5C6\uB294 key\uB97C \uC9C1\uC811 \uC785\uB825\uD569\uB2C8\uB2E4.", Na = "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800/80 dark:text-red-400 dark:hover:bg-red-950/40", qe = "inline-flex flex-1 items-center justify-center gap-1 rounded px-2 py-1 text-[11px] font-medium outline-none transition data-[state=inactive]:text-gray-500 data-[state=active]:bg-violet-600 data-[state=active]:text-white dark:data-[state=inactive]:text-odp-muted dark:data-[state=active]:text-white", _a = "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft", U = "__custom__";
  function Ca(t) {
    return t && Qe.includes(t) ? t : U;
  }
  function Je(t) {
    try {
      return JSON.stringify(Xe(t));
    } catch {
      return "";
    }
  }
  function He({ value: t, label: r, tip: a, dimmed: l = false }) {
    return e.jsxs(ie, {
      children: [
        e.jsx(le, {
          asChild: true,
          children: e.jsx(Jr, {
            value: t,
            className: `${wa}${l ? " opacity-40" : ""}`,
            children: e.jsx(Hr, {
              children: r
            })
          })
        }),
        e.jsx(de, {
          children: e.jsxs(ce, {
            side: "left",
            sideOffset: 8,
            className: ja,
            children: [
              a,
              e.jsx(ue, {
                className: "fill-white dark:fill-odp-surface"
              })
            ]
          })
        })
      ]
    });
  }
  function La({ value: t, onChange: r }) {
    const [a, l] = s.useState(false), [o, d] = s.useState("fields"), [n, u] = s.useState(null), [x, N] = s.useState(0), [f, h] = s.useState(() => J(t)), [g, C] = s.useState(() => se(t)), [K, y] = s.useState(""), w = s.useRef(f);
    w.current = f, s.useEffect(() => {
      a && N((c) => c + 1);
    }, [
      a
    ]);
    const O = s.useCallback((c) => {
      if (d(c.tab), h(c.entries.map((m) => ({
        ...m
      }))), C(c.jsonText), c.tab === "fields") {
        const m = H(c.entries);
        y(""), r(m);
        return;
      }
      const p = ve(c.jsonText);
      if (p.ok) {
        y(""), h(J(p.options)), r(p.options);
        return;
      }
      y(p.error), r(H(c.entries));
    }, [
      r
    ]), { undo: _, redo: B } = ga({
      enabled: a,
      historyKey: x,
      tab: o,
      entries: f,
      jsonText: g,
      applySnapshot: O
    });
    s.useEffect(() => {
      const c = Xe(t), p = H(w.current);
      Je(c) !== Je(p) && (h(J(c)), C(se(c)), y(""), a && N((m) => m + 1));
    }, [
      t,
      a
    ]);
    const L = s.useMemo(() => new Set(f.map((c) => c.key.trim()).filter(Boolean)), [
      f
    ]), R = (c) => {
      h(c);
      const p = H(c);
      C(se(p)), y(""), r(p);
    }, T = (c) => {
      C(c);
      const p = ve(c);
      if (!p.ok) {
        y(p.error);
        return;
      }
      y(""), h(J(p.options)), r(p.options);
    }, W = Object.keys(t || {}).length, b = n !== null ? oe(n) : null, k = n !== null && n.trim() ? n.trim() : "\uC635\uC158 \uD0A4";
    return s.useEffect(() => {
      if (!a || n !== null) return;
      const c = (p) => {
        if (!(p.metaKey || p.ctrlKey) || p.altKey) return;
        const j = p.key.toLowerCase(), A = j === "z" && !p.shiftKey, ee = j === "y" || j === "z" && p.shiftKey;
        if (!(!A && !ee)) {
          if (o === "json") {
            const te = p.target;
            if (te instanceof Element && te.closest(".cm-editor")) return;
          }
          p.preventDefault(), p.stopPropagation(), p.stopImmediatePropagation(), ee ? B() : _();
        }
      };
      return window.addEventListener("keydown", c, true), () => window.removeEventListener("keydown", c, true);
    }, [
      n,
      a,
      B,
      o,
      _
    ]), e.jsxs("div", {
      className: `rounded border border-gray-200 dark:border-odp-borderSoft ${a ? "" : "bg-slate-300/90 dark:bg-slate-950/40"}`,
      children: [
        e.jsxs("button", {
          type: "button",
          onClick: () => l((c) => !c),
          className: `flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-1 px-2 py-1.5 text-left font-semibold text-gray-700 dark:text-odp-fgStrong ${a ? "rounded-t bg-transparent" : "rounded"}`,
          "aria-expanded": a,
          children: [
            e.jsxs("span", {
              className: "shrink-0 whitespace-nowrap",
              children: [
                e.jsxs("span", {
                  className: "inline-flex items-center gap-1",
                  children: [
                    e.jsx(br, {
                      size: 13,
                      className: "shrink-0 opacity-70",
                      "aria-hidden": true
                    }),
                    "\uACE0\uAE09 \uC124\uC815"
                  ]
                }),
                !a && W > 0 ? e.jsxs("span", {
                  className: "ml-1 font-normal text-gray-500 dark:text-odp-muted",
                  children: [
                    "(",
                    W,
                    ")"
                  ]
                }) : null
              ]
            }),
            e.jsx(Me, {
              size: 14,
              "aria-hidden": true,
              className: `shrink-0 opacity-70 transition-transform ${a ? "rotate-180" : ""}`
            })
          ]
        }),
        e.jsx(ut, {
          open: a,
          children: e.jsxs("div", {
            className: "space-y-2 border-t border-gray-200 px-2 pb-2 pt-2 dark:border-odp-borderSoft",
            children: [
              e.jsx("p", {
                className: "text-[10px] leading-snug text-gray-500 dark:text-odp-muted",
                children: "LLM \uC694\uCCAD\uC5D0 \uD569\uCCD0\uC9C0\uB294 \uC0DD\uC131 \uC635\uC158\uC785\uB2C8\uB2E4. \uC81C\uC548 \uBAA9\uB85D \uC678 key\uB3C4 \uCD94\uAC00\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
              }),
              e.jsxs(Wr, {
                value: o,
                onValueChange: (c) => {
                  const p = c === "json" ? "json" : "fields";
                  if (p === "json") C(se(H(f))), y("");
                  else {
                    const m = ve(g);
                    m.ok && (h(J(m.options)), y(""));
                  }
                  d(p);
                },
                children: [
                  e.jsxs($r, {
                    className: "flex gap-1 rounded border border-gray-200 p-0.5 dark:border-odp-borderSoft",
                    children: [
                      e.jsxs(Ue, {
                        value: "fields",
                        className: qe,
                        children: [
                          e.jsx(fr, {
                            size: 12,
                            "aria-hidden": true,
                            className: "opacity-80"
                          }),
                          "\uD544\uB4DC"
                        ]
                      }),
                      e.jsxs(Ue, {
                        value: "json",
                        className: qe,
                        children: [
                          e.jsx(gr, {
                            size: 12,
                            "aria-hidden": true,
                            className: "opacity-80"
                          }),
                          "JSON"
                        ]
                      })
                    ]
                  }),
                  e.jsxs(Ke, {
                    value: "fields",
                    className: "mt-2 space-y-2 outline-none",
                    children: [
                      e.jsx(st, {
                        delayDuration: 250,
                        skipDelayDuration: 0,
                        children: f.map((c) => {
                          const p = Ca(c.key);
                          return e.jsxs("div", {
                            className: "space-y-1 rounded border border-gray-100 p-1.5 dark:border-odp-borderSoft/60",
                            children: [
                              e.jsxs("div", {
                                className: "flex flex-wrap items-start gap-x-1 gap-y-1",
                                children: [
                                  e.jsxs(Ur, {
                                    value: p,
                                    onValueChange: (m) => {
                                      m !== U && L.has(m) && c.key !== m || R(f.map((j) => j.id !== c.id ? j : m === U ? {
                                        ...j,
                                        key: p === U ? j.key : ""
                                      } : {
                                        ...j,
                                        key: m
                                      }));
                                    },
                                    children: [
                                      e.jsxs(Kr, {
                                        className: "inline-flex h-7 min-w-[8rem] flex-1 items-center justify-between gap-1 rounded border border-gray-300 bg-white px-2 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                                        "aria-label": "\uC635\uC158 \uD0A4",
                                        children: [
                                          e.jsx(Br, {
                                            placeholder: "key \uC120\uD0DD"
                                          }),
                                          e.jsx(Fr, {
                                            children: e.jsx(Me, {
                                              size: 12,
                                              "aria-hidden": true
                                            })
                                          })
                                        ]
                                      }),
                                      e.jsx(Vr, {
                                        children: e.jsx(Yr, {
                                          className: "z-100010 max-h-64 overflow-auto rounded border border-gray-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface",
                                          position: "popper",
                                          sideOffset: 4,
                                          children: e.jsxs(Gr, {
                                            className: "p-1",
                                            children: [
                                              Qe.map((m) => e.jsx(He, {
                                                value: m,
                                                label: m,
                                                tip: oe(m).summary,
                                                dimmed: L.has(m) && c.key !== m
                                              }, m)),
                                              e.jsx(qr, {
                                                className: "my-1 h-px bg-gray-200 dark:bg-odp-borderSoft"
                                              }),
                                              e.jsx(He, {
                                                value: U,
                                                label: "\uC9C1\uC811 \uC785\uB825\u2026",
                                                tip: Sa
                                              })
                                            ]
                                          })
                                        })
                                      })
                                    ]
                                  }),
                                  e.jsxs(ie, {
                                    children: [
                                      e.jsx(le, {
                                        asChild: true,
                                        children: e.jsx("button", {
                                          type: "button",
                                          onClick: () => {
                                            const m = f.filter((j) => j.id !== c.id);
                                            R(m.length ? m : Ht());
                                          },
                                          className: Na,
                                          "aria-label": "\uD589 \uC0AD\uC81C",
                                          children: e.jsx(et, {
                                            size: 12,
                                            "aria-hidden": true
                                          })
                                        })
                                      }),
                                      e.jsx(de, {
                                        children: e.jsxs(ce, {
                                          side: "top",
                                          sideOffset: 4,
                                          className: Ge,
                                          children: [
                                            "\uD589 \uC0AD\uC81C",
                                            e.jsx(ue, {
                                              className: "fill-white dark:fill-odp-surface"
                                            })
                                          ]
                                        })
                                      })
                                    ]
                                  }),
                                  e.jsxs(ie, {
                                    children: [
                                      e.jsx(le, {
                                        asChild: true,
                                        children: e.jsx("button", {
                                          type: "button",
                                          onClick: () => u(c.key),
                                          className: _a,
                                          "aria-label": `${c.key.trim() || "\uC635\uC158"} \uC124\uBA85`,
                                          children: e.jsx(ze, {
                                            size: 12,
                                            "aria-hidden": true
                                          })
                                        })
                                      }),
                                      e.jsx(de, {
                                        children: e.jsxs(ce, {
                                          side: "top",
                                          sideOffset: 4,
                                          className: Ge,
                                          children: [
                                            oe(c.key).summary,
                                            e.jsx(ue, {
                                              className: "fill-white dark:fill-odp-surface"
                                            })
                                          ]
                                        })
                                      })
                                    ]
                                  })
                                ]
                              }),
                              p === U ? e.jsx("input", {
                                type: "text",
                                value: c.key,
                                onChange: (m) => {
                                  const j = m.target.value;
                                  R(f.map((A) => A.id === c.id ? {
                                    ...A,
                                    key: j
                                  } : A));
                                },
                                placeholder: "custom key",
                                className: "w-full rounded border border-gray-300 bg-white px-2 py-1 font-mono text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                              }) : null,
                              e.jsx("input", {
                                type: "text",
                                value: c.valueText,
                                onChange: (m) => {
                                  const j = m.target.value;
                                  R(f.map((A) => A.id === c.id ? {
                                    ...A,
                                    valueText: j
                                  } : A));
                                },
                                placeholder: va(c.key),
                                className: "w-full rounded border border-gray-300 bg-white px-2 py-1 font-mono text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                              })
                            ]
                          }, c.id);
                        })
                      }),
                      e.jsxs("button", {
                        type: "button",
                        onClick: () => R([
                          ...f,
                          Xt()
                        ]),
                        className: "inline-flex w-full items-center justify-center gap-1 rounded border border-dashed border-gray-300 px-2 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft",
                        children: [
                          e.jsx(tt, {
                            size: 12,
                            "aria-hidden": true
                          }),
                          "\uC635\uC158 \uCD94\uAC00"
                        ]
                      })
                    ]
                  }),
                  e.jsxs(Ke, {
                    value: "json",
                    className: "mt-2 outline-none",
                    children: [
                      e.jsx("div", {
                        className: "h-40",
                        children: e.jsx(pa, {
                          value: g,
                          onChange: T,
                          className: "h-full"
                        })
                      }),
                      K ? e.jsx("p", {
                        className: "mt-1 text-[10px] text-red-600 dark:text-red-400",
                        children: K
                      }) : e.jsx("p", {
                        className: "mt-1 text-[10px] text-gray-500 dark:text-odp-muted",
                        children: "\uC720\uD6A8\uD55C JSON \uAC1D\uCCB4\uB85C \uC800\uC7A5\uB429\uB2C8\uB2E4. \uC81C\uC548\uB418\uC9C0 \uC54A\uC740 key\uB3C4 \uADF8\uB300\uB85C \uC804\uC1A1\uB429\uB2C8\uB2E4."
                      })
                    ]
                  })
                ]
              })
            ]
          })
        }),
        e.jsx(zt, {
          isOpen: n !== null,
          onClose: () => u(null),
          resizable: false,
          contentClassName: "max-w-md max-h-[90vh]",
          children: e.jsxs("div", {
            className: "p-6",
            children: [
              e.jsx("div", {
                className: "mb-3 flex justify-center",
                children: e.jsx("div", {
                  className: "flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-300",
                  children: e.jsx(ze, {
                    size: 24,
                    "aria-hidden": true
                  })
                })
              }),
              e.jsx("h2", {
                className: "mb-2 text-center text-lg font-bold text-gray-800 dark:text-odp-fgStrong",
                children: k
              }),
              b ? e.jsx("p", {
                className: "mb-5 text-start text-sm leading-relaxed whitespace-pre-line break-keep text-gray-600 dark:text-gray-400",
                children: b.detail
              }) : null,
              e.jsxs("div", {
                className: "flex flex-wrap justify-center gap-2",
                children: [
                  e.jsxs(Wt, {
                    variant: "secondary",
                    onClick: () => u(null),
                    children: [
                      e.jsx($t, {
                        size: 14,
                        "aria-hidden": true
                      }),
                      "\uB2EB\uAE30"
                    ]
                  }),
                  e.jsxs("a", {
                    href: ka(n ?? ""),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 dark:bg-blue-600 dark:hover:bg-blue-700",
                    children: [
                      e.jsx(Ut, {
                        size: 14,
                        "aria-hidden": true
                      }),
                      "Google\uC5D0\uC11C \uAC80\uC0C9"
                    ]
                  })
                ]
              })
            ]
          })
        })
      ]
    });
  }
  function we(t) {
    return t ? [
      ...t.types
    ].includes("Files") : false;
  }
  Aa = function({ children: t, className: r = "", disabled: a = false, onFilesDrop: l }) {
    const [o, d] = s.useState(false), n = s.useRef(0);
    s.useEffect(() => {
      a && (n.current = 0, d(false));
    }, [
      a
    ]);
    const u = s.useCallback(() => {
      n.current = 0, d(false);
    }, []), x = s.useCallback((g) => {
      a || !we(g.dataTransfer) || (g.preventDefault(), g.stopPropagation(), n.current += 1, d(true));
    }, [
      a
    ]), N = s.useCallback((g) => {
      a || (g.preventDefault(), g.stopPropagation(), n.current = Math.max(0, n.current - 1), n.current === 0 && d(false));
    }, [
      a
    ]), f = s.useCallback((g) => {
      a || !we(g.dataTransfer) || (g.preventDefault(), g.stopPropagation(), g.dataTransfer && (g.dataTransfer.dropEffect = "copy"), o || d(true));
    }, [
      a,
      o
    ]), h = s.useCallback((g) => {
      var _a2;
      if (a || !we(g.dataTransfer)) return;
      g.preventDefault(), g.stopPropagation(), u();
      const C = (_a2 = g.dataTransfer) == null ? void 0 : _a2.files;
      (C == null ? void 0 : C.length) && l(C);
    }, [
      a,
      l,
      u
    ]);
    return e.jsxs("div", {
      className: `relative ${r}`.trim(),
      onDragEnter: x,
      onDragLeave: N,
      onDragOverCapture: f,
      onDropCapture: h,
      children: [
        t,
        o ? e.jsx("div", {
          className: "pointer-events-none absolute inset-0 z-90 flex items-center justify-center bg-violet-100/85 px-4 dark:bg-violet-950/90",
          "aria-hidden": true,
          children: e.jsxs("div", {
            className: "flex max-w-sm flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-violet-500 bg-white/95 px-8 py-7 text-center shadow-lg dark:border-violet-400 dark:bg-odp-bgSoft/95",
            children: [
              e.jsx("div", {
                className: "flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-300",
                children: e.jsx(hr, {
                  size: 24,
                  "aria-hidden": true
                })
              }),
              e.jsxs("div", {
                className: "space-y-1",
                children: [
                  e.jsx("p", {
                    className: "text-sm font-semibold text-gray-800 dark:text-odp-fgStrong",
                    children: "\uC5EC\uAE30\uC5D0 \uB193\uAE30"
                  }),
                  e.jsxs("p", {
                    className: "flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400",
                    children: [
                      e.jsx(rt, {
                        size: 12,
                        "aria-hidden": true
                      }),
                      "AI \uC785\uB825 \uC774\uBBF8\uC9C0\uB85C \uCD94\uAC00\uB429\uB2C8\uB2E4"
                    ]
                  })
                ]
              })
            ]
          })
        }) : null
      ]
    });
  };
  const pt = [
    0.22,
    1,
    0.36,
    1
  ], Ea = {
    duration: 0.2,
    ease: pt
  }, Ta = {
    duration: 0.28,
    ease: pt
  }, Pa = {
    backgroundColor: "#ffffff",
    backgroundImage: [
      "linear-gradient(45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)",
      "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"
    ].join(","),
    backgroundSize: "16px 16px",
    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px"
  };
  function Oa({ src: t, alt: r = "", open: a, onClose: l }) {
    const o = !!(a && t);
    return e.jsx(Xr, {
      open: o,
      onOpenChange: (d) => {
        d || l();
      },
      children: e.jsx(Ze, {
        children: o ? e.jsxs(Qr, {
          forceMount: true,
          children: [
            e.jsx(Zr, {
              asChild: true,
              forceMount: true,
              children: e.jsx(Se.div, {
                className: "fixed inset-0 z-100060 bg-black/85",
                initial: {
                  opacity: 0
                },
                animate: {
                  opacity: 1
                },
                exit: {
                  opacity: 0
                },
                transition: Ea
              })
            }),
            e.jsx(ea, {
              asChild: true,
              forceMount: true,
              onOpenAutoFocus: (d) => d.preventDefault(),
              children: e.jsxs(Se.div, {
                className: "fixed inset-0 z-100061 flex flex-col outline-none",
                "aria-label": "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30",
                initial: {
                  opacity: 0,
                  scale: 0.98
                },
                animate: {
                  opacity: 1,
                  scale: 1
                },
                exit: {
                  opacity: 0,
                  scale: 0.98
                },
                transition: Ta,
                children: [
                  e.jsx(ta, {
                    className: "sr-only",
                    children: "\uC774\uBBF8\uC9C0 \uD06C\uAC8C \uBCF4\uAE30"
                  }),
                  e.jsx(ra, {
                    className: "sr-only",
                    children: "\uC785\uB825 \uC774\uBBF8\uC9C0\uB97C \uD655\uB300\uD574 \uBCF4\uB294 \uD654\uBA74\uC785\uB2C8\uB2E4. Esc \uB610\uB294 \uB2EB\uAE30\uB85C \uC885\uB8CC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                  }),
                  e.jsx("button", {
                    type: "button",
                    className: "absolute inset-0 cursor-zoom-out",
                    "aria-label": "\uB2EB\uAE30",
                    onClick: () => l()
                  }),
                  e.jsx("div", {
                    className: "pointer-events-none relative z-1 flex min-h-0 min-w-0 flex-1 items-center justify-center p-4 sm:p-8",
                    children: t ? e.jsx("div", {
                      className: "pointer-events-auto max-h-full max-w-full overflow-hidden shadow-2xl",
                      style: Pa,
                      onClick: (d) => d.stopPropagation(),
                      children: e.jsx("img", {
                        src: t,
                        alt: r || "",
                        className: "block h-auto w-auto max-h-[min(88vh,100%)] max-w-full object-contain",
                        draggable: false
                      })
                    }) : null
                  }),
                  e.jsx(aa, {
                    asChild: true,
                    children: e.jsx("button", {
                      type: "button",
                      className: "absolute right-3 top-3 z-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80",
                      "aria-label": "\uB2EB\uAE30",
                      children: e.jsx(at, {
                        size: 20
                      })
                    })
                  })
                ]
              })
            })
          ]
        }, "llm-assist-image-lightbox") : null
      })
    });
  }
  const Ra = 400;
  function X(t, r = false) {
    const a = s.useRef(t);
    a.current = t;
    const l = s.useRef(0), o = s.useCallback(() => {
      var _a2;
      if (r) return;
      const x = Date.now();
      x - l.current < Ra || (l.current = x, (_a2 = a.current) == null ? void 0 : _a2.call(a));
    }, [
      r
    ]), d = s.useCallback((x) => {
      x.stopPropagation();
    }, []), n = s.useCallback((x) => {
      x.stopPropagation(), !(r || x.button !== 0) && (x.preventDefault(), o());
    }, [
      r,
      o
    ]), u = s.useCallback((x) => {
      x.stopPropagation(), x.detail === 0 && o();
    }, [
      o
    ]);
    return {
      onPointerDown: d,
      onMouseDown: n,
      onClick: u
    };
  }
  const Da = "llm-assist-result-preview", Ia = "shrink-0 opacity-70";
  function z({ icon: t, children: r, className: a = "" }) {
    return e.jsxs("span", {
      className: `inline-flex items-center gap-1 font-semibold text-gray-700 dark:text-odp-fgStrong ${a}`,
      children: [
        t ? e.jsx(t, {
          size: 13,
          className: Ia,
          "aria-hidden": true
        }) : null,
        r
      ]
    });
  }
  ds = function({ theme: t = "light", profiles: r = [], selectedProfileId: a = "", onSelectedProfileIdChange: l = () => {
  }, selectedProfile: o = null, model: d = "", onModelChange: n = () => {
  }, selectedText: u, onSelectedTextChange: x, onRefreshSelection: N, attachedImages: f = [], onAddImages: h, onRemoveImage: g, onClearImages: C, instruction: K, onInstructionChange: y, systemPrompt: w = "", onSystemPromptChange: O, requestOptions: _ = {
    temperature: 0.4
  }, onRequestOptionsChange: B, result: L, onResultChange: R, resultViewMode: T = "text", onResultViewModeChange: W, loading: b = false, error: k = "", templates: c = [], selectedTemplateId: p = "", onLoadTemplate: m, templateName: j = "", onTemplateNameChange: A, editingTemplateId: ee = null, onSaveTemplate: te, onNewTemplate: mt, onDeleteTemplate: xt, onRun: me, onCancelGeneration: bt, onApplyResult: ft, onAppendResult: gt, onCopyResult: ht, onCreateNoteFromResult: yt, presentation: xe = "floating", canInsertIntoDocument: vt = true, remoteMode: kt = false, modelSelectAutoLoad: G = true, enableImageDropZone: jt = true }) {
    const wt = b || (kt ? false : !L), be = s.useRef(null), _e = s.useRef(null), re = s.useRef(null), [Ce, $] = s.useState(""), [P, F] = s.useState(false), [q, St] = s.useState(false), [Nt, ae] = s.useState(false), [fe, Le] = s.useState(null), Ae = s.useRef(0), Ee = s.useCallback(() => {
      Ae.current = Date.now() + 100;
    }, []), I = s.useCallback(() => Date.now() < Ae.current, []);
    s.useEffect(() => {
      b || ae(false);
    }, [
      b
    ]), qt(_e, {
      layoutKey: `${t}|${L || ""}|${T}`
    });
    const Te = s.useCallback(async (i) => {
      if (!(!(i == null ? void 0 : i.length) || !h)) {
        $(""), F(true);
        try {
          const E = await ke(i);
          await h(E);
        } catch (E) {
          $(E instanceof Error ? E.message : "\uC774\uBBF8\uC9C0\uB97C \uCD94\uAC00\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        } finally {
          F(false), re.current && (re.current.value = "");
        }
      }
    }, [
      h
    ]), _t = s.useCallback(async () => {
      if (!(!h || P)) {
        $(""), F(true);
        try {
          const i = await rr();
          if (!i.length) {
            $("\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uC774\uBBF8\uC9C0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. Ctrl/Cmd+V\uB85C \uBD99\uC5EC\uB123\uC744 \uC218\uB3C4 \uC788\uC2B5\uB2C8\uB2E4.");
            return;
          }
          const E = await ke(i);
          await h(E);
        } catch (i) {
          $(i instanceof Error ? i.message : "\uD074\uB9BD\uBCF4\uB4DC \uC774\uBBF8\uC9C0\uB97C \uBD99\uC5EC\uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        } finally {
          F(false);
        }
      }
    }, [
      h,
      P
    ]);
    s.useEffect(() => {
      const i = async (E) => {
        if (!h || !be.current || !(E.target instanceof Node) || !be.current.contains(E.target) || P) return;
        const De = ar(E.clipboardData ?? null);
        if (De.length) {
          E.preventDefault(), $(""), F(true);
          try {
            const he = await ke(De);
            await h(he);
          } catch (he) {
            $((he == null ? void 0 : he.message) || "\uD074\uB9BD\uBCF4\uB4DC \uC774\uBBF8\uC9C0\uB97C \uBD99\uC5EC\uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
          } finally {
            F(false);
          }
        }
      };
      return document.addEventListener("paste", i), () => document.removeEventListener("paste", i);
    }, [
      h,
      P
    ]);
    const ge = w.trim() === ye(), M = !L, Ct = X(ft, M), Lt = X(ht, M), At = X(gt, M), Et = X(yt, M), V = X(() => me == null ? void 0 : me(), !!(b || !o)), Tt = s.useCallback((i) => {
      I() || V.onPointerDown(i);
    }, [
      I,
      V
    ]), Pt = s.useCallback((i) => {
      I() || b || !o || i.button !== 0 || (Ee(), V.onMouseDown(i));
    }, [
      I,
      Ee,
      V,
      b,
      o
    ]), Ot = s.useCallback((i) => {
      I() || V.onClick(i);
    }, [
      I,
      V
    ]), Rt = s.useCallback(() => {
      I() || ae(true);
    }, [
      I
    ]), Dt = s.useCallback((i) => {
      i.key !== "Enter" || i.nativeEvent.isComposing || (i.metaKey || i.ctrlKey) && (i.preventDefault(), !(b || !o) && (me == null ? void 0 : me()));
    }, [
      b,
      me,
      o
    ]), Pe = e.jsxs("button", {
      type: "button",
      disabled: ge,
      onClick: () => O == null ? void 0 : O(ye()),
      className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[10px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft dark:disabled:hover:bg-transparent",
      "aria-label": "\uAE30\uBCF8\uAC12\uC73C\uB85C \uB418\uB3CC\uB9AC\uAE30",
      children: [
        e.jsx(zr, {
          size: 11,
          "aria-hidden": true
        }),
        "\uAE30\uBCF8\uAC12\uC73C\uB85C \uB418\uB3CC\uB9AC\uAE30"
      ]
    }), Oe = e.jsxs("div", {
      ref: be,
      className: "space-y-3 text-xs",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx("label", {
              className: "mb-1 block",
              children: e.jsx(z, {
                icon: yr,
                children: "\uC81C\uACF5\uC790"
              })
            }),
            e.jsx(er, {
              profiles: r,
              value: a,
              onChange: l
            })
          ]
        }),
        o ? e.jsxs("div", {
          children: [
            e.jsx("label", {
              className: "mb-1 block",
              children: e.jsx(z, {
                icon: vr,
                children: "\uBAA8\uB378"
              })
            }),
            o.kind === Kt ? e.jsx(Ie, {
              reloadKey: `${o.id}:${o.baseUrl || ""}`,
              getBaseUrl: () => o.baseUrl || "",
              getApiKey: () => o.apiKey || "",
              value: d,
              onChange: n,
              autoLoad: G
            }, `${o.id}-openai`) : o.kind === Bt ? It() ? e.jsx(tr, {
              value: d,
              onChange: n,
              autoLoad: G
            }, `${o.id}-llama-cpp`) : e.jsx(Ie, {
              reloadKey: `${o.id}:${o.baseUrl || ""}`,
              getBaseUrl: () => o.baseUrl || "",
              getApiKey: () => o.apiKey || "",
              value: d,
              onChange: n,
              autoLoad: G,
              aliasScope: "llama-cpp"
            }, `${o.id}-llama-cpp-remote`) : o.kind === Ft ? e.jsx(Qt, {
              value: d,
              onChange: n,
              autoLoad: G,
              autoLoadModelOnSelect: false
            }, `${o.id}-mlx`) : e.jsx(Zt, {
              getGeminiApiKey: () => o.apiKey || "",
              profileId: o.id,
              value: d,
              onChange: n,
              autoLoad: G
            }, `${o.id}-gemini`)
          ]
        }) : null,
        e.jsxs("div", {
          children: [
            e.jsxs("div", {
              className: "mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5",
              children: [
                e.jsx("label", {
                  className: "shrink-0 whitespace-nowrap",
                  children: e.jsx(z, {
                    icon: kr,
                    children: "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8"
                  })
                }),
                e.jsxs("button", {
                  type: "button",
                  onClick: N,
                  className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                  children: [
                    e.jsx(jr, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "\uC0C8\uB85C\uACE0\uCE68"
                  ]
                })
              ]
            }),
            e.jsx("textarea", {
              readOnly: !x,
              value: u,
              onChange: (i) => x == null ? void 0 : x(i.target.value),
              rows: 4,
              className: "w-full resize-y rounded border border-gray-200 bg-gray-50 px-2 py-1.5 text-[11px] leading-relaxed text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
              placeholder: "\uC120\uD0DD\uB41C \uD14D\uC2A4\uD2B8\uAC00 \uC5C6\uC5B4\uB3C4, \uC785\uB825\uD55C \uC9C0\uC2DC\uC0AC\uD56D\uC73C\uB85C \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsxs("div", {
              className: "mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5",
              children: [
                e.jsx("label", {
                  className: "shrink-0 whitespace-nowrap",
                  children: e.jsxs(z, {
                    icon: wr,
                    children: [
                      "\uC785\uB825 \uC774\uBBF8\uC9C0",
                      f.length > 0 ? e.jsxs("span", {
                        className: "ml-1 font-normal text-gray-500 dark:text-odp-muted",
                        children: [
                          "(",
                          f.length,
                          ")"
                        ]
                      }) : null
                    ]
                  })
                }),
                e.jsxs("div", {
                  className: "flex min-w-0 flex-wrap items-center justify-end gap-1",
                  children: [
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        _t();
                      },
                      disabled: P,
                      className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                      children: [
                        P ? e.jsx(je, {
                          size: 12,
                          className: "animate-spin"
                        }) : e.jsx(Sr, {
                          size: 12
                        }),
                        "\uD074\uB9BD\uBCF4\uB4DC\uC5D0\uC11C \uBD99\uC5EC\uB123\uAE30"
                      ]
                    }),
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        var _a2;
                        return (_a2 = re.current) == null ? void 0 : _a2.click();
                      },
                      disabled: P,
                      className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                      children: [
                        P ? e.jsx(je, {
                          size: 12,
                          className: "animate-spin"
                        }) : e.jsx(rt, {
                          size: 12
                        }),
                        "\uCD94\uAC00"
                      ]
                    }),
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => C == null ? void 0 : C(),
                      disabled: !f.length || P,
                      className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                      title: "\uCCA8\uBD80 \uC774\uBBF8\uC9C0 \uBAA8\uB450 \uC81C\uAC70",
                      children: [
                        e.jsx(Nr, {
                          size: 12,
                          "aria-hidden": true
                        }),
                        "\uCD08\uAE30\uD654"
                      ]
                    })
                  ]
                })
              ]
            }),
            e.jsx("input", {
              ref: re,
              type: "file",
              accept: "image/jpeg,image/png,image/webp,image/gif",
              multiple: true,
              className: "hidden",
              onChange: (i) => {
                Te(i.target.files);
              }
            }),
            e.jsx("div", {
              className: `rounded border border-dashed p-2 dark:border-odp-borderSoft ${f.length ? "border-gray-200 bg-gray-50/50 dark:bg-odp-bgSoft/40" : "border-gray-300 bg-gray-50 dark:bg-odp-bgSoft"}`,
              children: f.length ? e.jsx("div", {
                className: "grid grid-cols-2 gap-2",
                children: f.map((i) => e.jsxs("div", {
                  className: "relative overflow-hidden rounded border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft",
                  children: [
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => Le(i),
                      className: "group relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-violet-500",
                      "aria-label": `${i.name} \uD06C\uAC8C \uBCF4\uAE30`,
                      children: [
                        e.jsx("img", {
                          src: i.previewDataUrl,
                          alt: "",
                          className: "h-24 w-full object-cover"
                        }),
                        e.jsx("span", {
                          className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25",
                          "aria-hidden": true,
                          children: e.jsx(_r, {
                            size: 22,
                            className: "text-white opacity-0 drop-shadow-md transition-opacity group-hover:opacity-100"
                          })
                        })
                      ]
                    }),
                    e.jsx("div", {
                      className: "truncate px-1.5 py-0.5 text-[10px] text-gray-600 dark:text-odp-muted",
                      title: i.name,
                      children: i.name
                    }),
                    e.jsx("button", {
                      type: "button",
                      onClick: () => g == null ? void 0 : g(i.id),
                      className: "absolute right-1 top-1 z-1 rounded bg-black/55 p-0.5 text-white hover:bg-black/75",
                      title: "\uC774\uBBF8\uC9C0 \uC81C\uAC70",
                      "aria-label": "\uC774\uBBF8\uC9C0 \uC81C\uAC70",
                      children: e.jsx(at, {
                        size: 12
                      })
                    })
                  ]
                }, i.id))
              }) : e.jsxs("p", {
                className: "py-3 text-center text-[11px] text-gray-500 dark:text-odp-muted",
                children: [
                  "AI \uB3C4\uC6B0\uBBF8 \uC5B4\uB514\uC5D0\uB4E0 \uC774\uBBF8\uC9C0\uB97C \uB193\uAC70\uB098 \u300C\uCD94\uAC00\u300D\uB85C \uC120\uD0DD\uD558\uC138\uC694.",
                  e.jsx("br", {}),
                  "\u300C\uD074\uB9BD\uBCF4\uB4DC\uC5D0\uC11C \uBD99\uC5EC\uB123\uAE30\u300D\uB610\uB294 Ctrl+V\uB85C \uBD99\uC5EC\uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
                ]
              })
            }),
            Ce && e.jsx("p", {
              className: "mt-1 text-[10px] text-red-600 dark:text-red-400",
              children: Ce
            })
          ]
        }),
        e.jsxs("div", {
          className: "space-y-2 rounded border border-gray-200 p-2 dark:border-odp-borderSoft",
          children: [
            e.jsxs("div", {
              className: "flex flex-wrap items-center gap-x-2 gap-y-1.5",
              children: [
                e.jsx("label", {
                  className: "shrink-0 whitespace-nowrap",
                  children: e.jsx(z, {
                    icon: Cr,
                    children: "\uD15C\uD50C\uB9BF"
                  })
                }),
                e.jsxs("select", {
                  value: p,
                  onChange: (i) => m == null ? void 0 : m(i.target.value),
                  className: "min-w-0 flex-1 basis-48 rounded border border-gray-300 bg-white px-2 py-1 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft",
                  children: [
                    e.jsx("option", {
                      value: "",
                      children: "\u2014 \uBD88\uB7EC\uC624\uAE30 \u2014"
                    }),
                    c.map((i) => e.jsx("option", {
                      value: i.id,
                      children: i.name
                    }, i.id))
                  ]
                })
              ]
            }),
            e.jsxs("p", {
              className: "text-[10px] leading-snug text-gray-500 dark:text-odp-muted",
              children: [
                "\uC6D0\uACA9 \uC800\uC7A5\uC18C",
                " ",
                e.jsx("code", {
                  className: "rounded bg-gray-100 px-1 dark:bg-odp-bgSoft",
                  children: ".settings/llm-prompt-templates.json"
                }),
                "\uC5D0 \uB3D9\uAE30\uD654\uB429\uB2C8\uB2E4."
              ]
            }),
            e.jsx("input", {
              type: "text",
              value: j,
              onChange: (i) => A == null ? void 0 : A(i.target.value),
              placeholder: "\uD15C\uD50C\uB9BF \uC774\uB984",
              className: "w-full rounded border border-gray-300 bg-white px-2 py-1 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            }),
            e.jsxs("div", {
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: () => St((i) => !i),
                  className: `mb-1 flex w-full items-center justify-between gap-x-2 gap-y-1 rounded px-2 py-1.5 text-left font-semibold text-gray-700 dark:text-odp-fgStrong ${q ? "bg-transparent" : "bg-slate-300/90 dark:bg-slate-950/40"}`,
                  "aria-expanded": q,
                  children: [
                    e.jsxs("span", {
                      className: "min-w-0 shrink-0 whitespace-nowrap",
                      children: [
                        e.jsx(z, {
                          icon: Lr,
                          children: "\uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8"
                        }),
                        !q && w.trim() ? e.jsx("span", {
                          className: "ml-1 font-normal text-gray-500 dark:text-odp-muted",
                          children: ge ? "(\uAE30\uBCF8)" : "(\uC218\uC815\uB428)"
                        }) : null
                      ]
                    }),
                    e.jsx(Ar, {
                      size: 14,
                      "aria-hidden": true,
                      className: `shrink-0 opacity-70 transition-transform ${q ? "rotate-180" : ""}`
                    })
                  ]
                }),
                e.jsx(ut, {
                  open: q,
                  children: e.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      e.jsx("p", {
                        className: "text-[10px] leading-snug text-gray-500 dark:text-odp-muted",
                        children: "\uD15C\uD50C\uB9BF\uB9C8\uB2E4 \uB2E4\uB974\uAC8C \uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uBE44\uC6B0\uBA74 \uC2DC\uC2A4\uD15C \uD504\uB86C\uD504\uD2B8 \uC5C6\uC774 \uC2E4\uD589\uB429\uB2C8\uB2E4."
                      }),
                      e.jsx("textarea", {
                        value: w,
                        onChange: (i) => O == null ? void 0 : O(i.target.value),
                        rows: 10,
                        placeholder: ye(),
                        className: "w-full resize-y rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] leading-relaxed dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                      }),
                      e.jsx("div", {
                        className: "flex justify-end",
                        children: ge ? e.jsx(st, {
                          delayDuration: 250,
                          skipDelayDuration: 0,
                          children: e.jsxs(ie, {
                            children: [
                              e.jsx(le, {
                                asChild: true,
                                children: e.jsx("span", {
                                  className: "inline-flex cursor-not-allowed",
                                  children: Pe
                                })
                              }),
                              e.jsx(de, {
                                children: e.jsxs(ce, {
                                  side: "top",
                                  sideOffset: 6,
                                  className: "z-100010 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong",
                                  children: [
                                    "\uC774\uBBF8 \uAE30\uBCF8\uAC12\uC785\uB2C8\uB2E4.",
                                    e.jsx(ue, {
                                      className: "fill-white dark:fill-odp-surface"
                                    })
                                  ]
                                })
                              })
                            ]
                          })
                        }) : Pe
                      })
                    ]
                  })
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx("label", {
                  className: "mb-1 block",
                  children: e.jsx(z, {
                    icon: Er,
                    children: "\uC9C0\uC2DC\uC0AC\uD56D"
                  })
                }),
                e.jsx("textarea", {
                  value: K,
                  onChange: (i) => y == null ? void 0 : y(i.target.value),
                  onKeyDown: Dt,
                  rows: 4,
                  placeholder: "\uC9C0\uC2DC\uC0AC\uD56D (\uC608: \uC774\uBBF8\uC9C0\uB97C \uC124\uBA85\uD558\uAC70\uB098, \uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8\uB97C \uB2E4\uC2DC \uC368 \uC8FC\uC138\uC694)",
                  className: "w-full resize-y rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] leading-relaxed dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                })
              ]
            }),
            e.jsxs("div", {
              className: "flex flex-wrap gap-1.5 justify-end",
              children: [
                e.jsxs("button", {
                  type: "button",
                  onClick: mt,
                  className: "inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft",
                  children: [
                    e.jsx(tt, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "\uC0C8 \uD15C\uD50C\uB9BF"
                  ]
                }),
                e.jsxs("button", {
                  type: "button",
                  onClick: te,
                  className: "inline-flex items-center gap-1 rounded bg-violet-600 px-2 py-1 text-[11px] text-white hover:bg-violet-700",
                  children: [
                    e.jsx(Tr, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "\uD15C\uD50C\uB9BF \uC800\uC7A5"
                  ]
                }),
                ee && e.jsxs("button", {
                  type: "button",
                  onClick: xt,
                  className: "inline-flex items-center gap-1 rounded border border-red-300 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-500/40 dark:text-red-400",
                  children: [
                    e.jsx(et, {
                      size: 12,
                      "aria-hidden": true
                    }),
                    "\uC0AD\uC81C"
                  ]
                })
              ]
            }),
            e.jsx(La, {
              value: _,
              onChange: (i) => B == null ? void 0 : B(i)
            })
          ]
        }),
        b ? e.jsxs("button", {
          type: "button",
          onClick: Rt,
          disabled: !o,
          className: "flex w-full items-center justify-center gap-2 rounded bg-violet-700 px-3 py-2 text-sm font-medium text-white hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60",
          "aria-label": "\uC0DD\uC131 \uC911 \u2014 \uD074\uB9AD\uD558\uC5EC \uCDE8\uC18C",
          children: [
            e.jsx(je, {
              size: 16,
              className: "animate-spin",
              "aria-hidden": true
            }),
            "\uC0DD\uC131 \uC911\u2026"
          ]
        }) : e.jsxs("button", {
          type: "button",
          onPointerDown: Tt,
          onMouseDown: Pt,
          onClick: Ot,
          disabled: !o,
          className: "flex w-full items-center justify-center gap-2 rounded bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60",
          children: [
            e.jsx(We, {
              size: 16,
              "aria-hidden": true
            }),
            "\uC2E4\uD589"
          ]
        }),
        typeof document < "u" ? Mt.createPortal(e.jsx(Vt, {
          isOpen: Nt,
          title: "\uC0DD\uC131 \uCDE8\uC18C",
          message: "\uC9C4\uD589 \uC911\uC778 \uC0DD\uC131\uC744 \uCDE8\uC18C\uD560\uAE4C\uC694? \uC9C0\uAE08\uAE4C\uC9C0 \uBC1B\uC740 \uACB0\uACFC\uB294 \uC720\uC9C0\uB429\uB2C8\uB2E4.",
          confirmLabel: "\uC0DD\uC131 \uCDE8\uC18C",
          cancelLabel: "\uACC4\uC18D \uC0DD\uC131",
          variant: "danger",
          onConfirm: () => {
            ae(false), bt == null ? void 0 : bt();
          },
          onCancel: () => ae(false)
        }), document.body) : null,
        k && e.jsx("p", {
          className: "rounded border border-red-200 bg-red-50 px-2 py-1.5 text-[11px] whitespace-pre-line text-red-700 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-300",
          children: k
        }),
        e.jsxs("div", {
          children: [
            e.jsxs("div", {
              className: "mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5",
              children: [
                e.jsx("label", {
                  className: "shrink-0 whitespace-nowrap",
                  children: e.jsx(z, {
                    icon: We,
                    children: "\uACB0\uACFC"
                  })
                }),
                e.jsxs("div", {
                  className: "inline-flex rounded border border-gray-300 dark:border-odp-borderStrong",
                  children: [
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => W == null ? void 0 : W("text"),
                      className: `inline-flex items-center gap-1 px-2 py-0.5 text-[10px] ${T === "text" ? "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-100" : "text-gray-600 hover:bg-gray-50 dark:text-odp-muted dark:hover:bg-odp-bgSoft"}`,
                      "aria-pressed": T === "text",
                      children: [
                        e.jsx(Pr, {
                          size: 11,
                          "aria-hidden": true
                        }),
                        "\uD14D\uC2A4\uD2B8"
                      ]
                    }),
                    e.jsxs("button", {
                      type: "button",
                      onClick: () => W == null ? void 0 : W("preview"),
                      className: `inline-flex items-center gap-1 border-l border-gray-300 px-2 py-0.5 text-[10px] dark:border-odp-borderStrong ${T === "preview" ? "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-100" : "text-gray-600 hover:bg-gray-50 dark:text-odp-muted dark:hover:bg-odp-bgSoft"}`,
                      "aria-pressed": T === "preview",
                      children: [
                        e.jsx(Or, {
                          size: 11,
                          "aria-hidden": true
                        }),
                        "\uBBF8\uB9AC\uBCF4\uAE30"
                      ]
                    })
                  ]
                })
              ]
            }),
            T === "preview" ? e.jsx("div", {
              ref: _e,
              className: "min-h-32 max-h-64 overflow-auto rounded border border-gray-200 bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft",
              children: L ? e.jsx(Yt, {
                id: Da,
                theme: t === "dark" ? "dark" : "light",
                language: "ko-KR",
                codeTheme: Gt,
                customIcon: Jt,
                value: L,
                noMermaid: true,
                codeFoldable: false,
                showCodeRowNumber: false
              }) : e.jsx("p", {
                className: "px-2 py-3 text-[11px] text-gray-500 dark:text-odp-muted",
                children: "\uC2E4\uD589 \uD6C4 \uACB0\uACFC\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4."
              })
            }) : e.jsx("textarea", {
              readOnly: wt,
              value: L,
              onChange: (i) => R == null ? void 0 : R(i.target.value),
              rows: 6,
              className: "w-full resize-y rounded border border-gray-200 bg-gray-50 px-2 py-1.5 text-[11px] leading-relaxed text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg",
              placeholder: "\uC2E4\uD589 \uD6C4 \uACB0\uACFC\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4."
            }),
            e.jsxs("div", {
              className: "mt-2 flex flex-wrap gap-1.5",
              children: [
                vt ? e.jsxs(e.Fragment, {
                  children: [
                    e.jsx("button", {
                      type: "button",
                      disabled: M,
                      ...Ct,
                      className: [
                        "inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-[11px] font-medium disabled:cursor-not-allowed disabled:opacity-50",
                        xe !== "floating" ? u.trim() ? "border-violet-400 bg-violet-50 text-violet-800 hover:bg-violet-100 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60" : "border-sky-400 bg-sky-50 text-sky-800 hover:bg-sky-100 dark:border-sky-600 dark:bg-sky-950/50 dark:text-sky-100 dark:hover:bg-sky-900/60" : "border-violet-400 bg-violet-50 text-violet-800 hover:bg-violet-100 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60"
                      ].join(" "),
                      children: xe !== "floating" ? u.trim() ? e.jsxs(e.Fragment, {
                        children: [
                          e.jsx($e, {
                            size: 14,
                            "aria-hidden": true
                          }),
                          "\uB300\uCCB4\uD558\uAE30"
                        ]
                      }) : e.jsxs(e.Fragment, {
                        children: [
                          e.jsx(Rr, {
                            size: 14,
                            "aria-hidden": true
                          }),
                          "\uC0BD\uC785\uD558\uAE30"
                        ]
                      }) : e.jsxs(e.Fragment, {
                        children: [
                          e.jsx($e, {
                            size: 14,
                            "aria-hidden": true
                          }),
                          "\uC120\uD0DD \uC601\uC5ED \uBC14\uAFD4\uCE58\uAE30"
                        ]
                      })
                    }),
                    e.jsxs("button", {
                      type: "button",
                      disabled: M,
                      ...At,
                      className: "inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60",
                      children: [
                        e.jsx(Dr, {
                          size: 14,
                          "aria-hidden": true
                        }),
                        "\uBB38\uC11C \uAC00\uC7A5 \uD558\uB2E8\uC5D0 \uC0BD\uC785"
                      ]
                    })
                  ]
                }) : null,
                xe !== "floating" ? e.jsxs("button", {
                  type: "button",
                  disabled: M,
                  ...Lt,
                  className: "inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60",
                  children: [
                    e.jsx(Ir, {
                      size: 14,
                      "aria-hidden": true
                    }),
                    "\uBCF5\uC0AC\uD558\uAE30"
                  ]
                }) : null,
                e.jsxs("button", {
                  type: "button",
                  disabled: M,
                  ...Et,
                  className: "inline-flex items-center gap-1.5 rounded border border-emerald-400 bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-800 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-100 dark:hover:bg-emerald-900/60",
                  children: [
                    e.jsx(Mr, {
                      size: 14,
                      "aria-hidden": true
                    }),
                    "\uC0C8 \uB178\uD2B8\uB85C"
                  ]
                })
              ]
            })
          ]
        })
      ]
    }), Re = e.jsx(Oa, {
      src: (fe == null ? void 0 : fe.previewDataUrl) ?? null,
      alt: (fe == null ? void 0 : fe.name) ?? "",
      open: !!fe,
      onClose: () => Le(null)
    });
    return jt ? e.jsxs(Aa, {
      className: "min-h-0",
      disabled: !h || P,
      onFilesDrop: (i) => {
        Te(i);
      },
      children: [
        Oe,
        Re
      ]
    }) : e.jsxs(e.Fragment, {
      children: [
        Oe,
        Re
      ]
    });
  };
});
export {
  Aa as L,
  __tla,
  is as a,
  Xa as b,
  Qa as c,
  ds as d,
  v as e,
  as as f,
  ts as g,
  rs as h,
  Ha as i,
  ns as j,
  Za as k,
  ss as n,
  es as o,
  ls as p,
  os as s
};
