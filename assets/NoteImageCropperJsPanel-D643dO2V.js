const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-image-crop-BfNSF_Kw.js","assets/vendor-react-kfkzeLNk.js"])))=>i.map(i=>d[i]);
import { _ as T, __tla as __tla_0 } from "./vendor-md-editor-s4d4kGNQ.js";
import { r as a, j as n, __tla as __tla_1 } from "./vendor-react-kfkzeLNk.js";
import { f as A } from "./storageImageHydration-BvL--2Mk.js";
import { L as P, A as D, a as Y } from "./vendor-lucide-CtwzAVi_.js";
import { S as M, g as O } from "./vendor-radix-DN5L22zk.js";
import { __tla as __tla_2 } from "./index-DYAN1ttx.js";
import "./vendor-aws-DPH4gJ3K.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-9P87yVtW.js";
import "./vendor-google-genai-BXoTgYIl.js";
let ne;
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
  })()
]).then(async () => {
  const $ = "relative h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent bg-gray-300 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:bg-blue-600 dark:bg-odp-borderStrong dark:data-[state=checked]:bg-blue-500", X = "block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]", B = {
    backgroundColor: "#ffffff",
    backgroundImage: [
      "linear-gradient(45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)",
      "linear-gradient(45deg, transparent 75%, #d4d4d4 75%)",
      "linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"
    ].join(","),
    backgroundSize: "16px 16px",
    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px"
  }, F = `
<cropper-canvas background style="width:100%;height:100%;">
  <cropper-image rotatable scalable skewable translatable></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection initial-coverage="0.85" movable resizable outlined>
    <cropper-grid role="grid" covered></cropper-grid>
    <cropper-crosshair centered></cropper-crosshair>
    <cropper-handle action="move" plain></cropper-handle>
    <cropper-handle action="n-resize"></cropper-handle>
    <cropper-handle action="e-resize"></cropper-handle>
    <cropper-handle action="s-resize"></cropper-handle>
    <cropper-handle action="w-resize"></cropper-handle>
    <cropper-handle action="ne-resize" theme-color="#3b82f6"></cropper-handle>
    <cropper-handle action="nw-resize" theme-color="#3b82f6"></cropper-handle>
    <cropper-handle action="se-resize" theme-color="#3b82f6"></cropper-handle>
    <cropper-handle action="sw-resize" theme-color="#3b82f6"></cropper-handle>
  </cropper-selection>
</cropper-canvas>
`, G = `
:host([action="ne-resize"]),
:host([action="nw-resize"]),
:host([action="se-resize"]),
:host([action="sw-resize"]) {
  height: 28px;
  width: 28px;
  z-index: 2;
}
:host([action="ne-resize"]):after,
:host([action="nw-resize"]):after,
:host([action="se-resize"]):after,
:host([action="sw-resize"]):after {
  height: 14px;
  width: 14px;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.9);
}
:host([action="ne-resize"]) { top: -12px; right: -12px; }
:host([action="nw-resize"]) { top: -12px; left: -12px; }
:host([action="se-resize"]) { bottom: -12px; right: -12px; }
:host([action="sw-resize"]) { bottom: -12px; left: -12px; }
@media (pointer: coarse) {
  :host([action="ne-resize"]),
  :host([action="nw-resize"]),
  :host([action="se-resize"]),
  :host([action="sw-resize"]) {
    height: 36px;
    width: 36px;
  }
  :host([action="ne-resize"]):after,
  :host([action="nw-resize"]):after,
  :host([action="se-resize"]):after,
  :host([action="sw-resize"]):after {
    height: 16px;
    width: 16px;
  }
  :host([action="ne-resize"]) { top: -14px; right: -14px; }
  :host([action="nw-resize"]) { top: -14px; left: -14px; }
  :host([action="se-resize"]) { bottom: -14px; right: -14px; }
  :host([action="sw-resize"]) { bottom: -14px; left: -14px; }
}
`, H = /* @__PURE__ */ new Set([
    "ne-resize",
    "nw-resize",
    "se-resize",
    "sw-resize"
  ]);
  function q(s) {
    s && s.querySelectorAll("cropper-handle").forEach((h) => {
      var _a;
      const u = h, g = u.getAttribute("action") || "";
      H.has(g) && ((_a = u.$addStyles) == null ? void 0 : _a.call(u, G));
    });
  }
  const S = 1;
  function J(s, h) {
    const u = h[0] ?? 1, g = h[1] ?? 0, p = Math.hypot(u, g) || 1;
    return {
      width: Math.max(1, Math.round(s.width / p)),
      height: Math.max(1, Math.round(s.height / p))
    };
  }
  ne = function({ imageSrc: s, fileName: h, onCancel: u, onConfirm: g }) {
    const p = a.useRef(null), k = a.useRef(null), d = a.useRef(null), [b, v] = a.useState(false), [E, C] = a.useState(""), [w, j] = a.useState(false), [I, N] = a.useState(""), [y, L] = a.useState(true);
    a.useEffect(() => {
      v(false), C(""), j(false), N(""), L(true);
    }, [
      s
    ]), a.useEffect(() => {
      let t = false, r = null;
      const o = async () => {
        var _a;
        v(false), C("");
        try {
          const { default: i } = await T(async () => {
            const { default: l } = await import("./vendor-image-crop-BfNSF_Kw.js").then((m) => m.c);
            return {
              default: l
            };
          }, __vite__mapDeps([0,1]));
          if (t || !k.current) return;
          (_a = d.current) == null ? void 0 : _a.destroy(), d.current = null, r = new i(k.current, {
            ...p.current ? {
              container: p.current
            } : {},
            template: F
          });
          const c = r.getCropperImage();
          if (c && await c.$ready(), t) {
            r.destroy();
            return;
          }
          q(r.getCropperSelection()), d.current = r, v(true);
        } catch (i) {
          t || C(i instanceof Error ? i.message : "Cropper.js 2\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. bun install \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
        }
      }, f = window.requestAnimationFrame(() => {
        o();
      });
      return () => {
        t = true, window.cancelAnimationFrame(f), r == null ? void 0 : r.destroy(), d.current === r && (d.current = null);
      };
    }, [
      s
    ]), a.useEffect(() => {
      if (!b) return;
      const t = p.current, r = d.current;
      if (!t || !r) return;
      const o = {
        active: false,
        pointerId: -1,
        lastX: 0,
        lastY: 0
      }, f = (e) => {
        if (o.active) {
          if (o.active = false, e && o.pointerId === e.pointerId) try {
            t.releasePointerCapture(e.pointerId);
          } catch {
          }
          o.pointerId = -1, t.style.cursor = "";
        }
      }, i = (e) => {
        if (!(e.button !== S || (e.preventDefault(), e.stopPropagation(), !r.getCropperImage()))) {
          o.active = true, o.pointerId = e.pointerId, o.lastX = e.clientX, o.lastY = e.clientY;
          try {
            t.setPointerCapture(e.pointerId);
          } catch {
          }
          t.style.cursor = "grabbing";
        }
      }, c = (e) => {
        if (!o.active || e.pointerId !== o.pointerId) return;
        e.preventDefault();
        const x = r.getCropperImage();
        if (!x) return;
        const z = e.clientX - o.lastX, R = e.clientY - o.lastY;
        o.lastX = e.clientX, o.lastY = e.clientY, (z !== 0 || R !== 0) && x.$move(z, R);
      }, l = (e) => {
        e.pointerId !== o.pointerId && e.button !== S || f(e);
      }, m = (e) => {
        e.button === S && (e.preventDefault(), e.stopPropagation());
      };
      return t.addEventListener("pointerdown", i, true), t.addEventListener("pointermove", c, true), t.addEventListener("pointerup", l, true), t.addEventListener("pointercancel", l, true), t.addEventListener("auxclick", m, true), () => {
        f(), t.removeEventListener("pointerdown", i, true), t.removeEventListener("pointermove", c, true), t.removeEventListener("pointerup", l, true), t.removeEventListener("pointercancel", l, true), t.removeEventListener("auxclick", m, true);
      };
    }, [
      b
    ]);
    const _ = async () => {
      const t = d.current;
      if (!(!t || w || !b)) {
        j(true), N("");
        try {
          const r = t.getCropperSelection(), o = t.getCropperImage();
          if (!r || !o) throw new Error("\uC790\uB974\uAE30 \uC601\uC5ED\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
          const f = o.$getTransform(), i = J(r, f), c = await r.$toCanvas({
            width: i.width,
            height: i.height,
            ...y ? {} : {
              beforeDraw: (x, z) => {
                x.fillStyle = "#ffffff", x.fillRect(0, 0, z.width, z.height);
              }
            }
          });
          if (!c || c.width < 1 || c.height < 1) throw new Error("\uC790\uB978 \uC601\uC5ED\uC744 \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
          const l = (h || "image").replace(/\.[^.]+$/, "") || "image", { file: m, area: e } = await A(c, {
            keepTransparency: y,
            fileName: y ? `${l}-crop.png` : `${l}-crop.jpg`
          });
          await g(m, {
            x: r.x,
            y: r.y,
            width: e.width,
            height: e.height
          });
        } catch (r) {
          N(r instanceof Error ? r.message : String(r)), j(false);
        }
      }
    };
    return n.jsxs("div", {
      className: "flex min-h-0 flex-1 flex-col gap-3",
      children: [
        n.jsx("p", {
          className: "shrink-0 text-xs text-gray-500 dark:text-odp-muted",
          children: "Cropper.js 2 \uBC29\uC2DD\uC785\uB2C8\uB2E4. \uBC15\uC2A4\uB97C \uB4DC\uB798\uADF8\uD574 \uC790\uB974\uACE0, \uD720\uB85C \uD655\uB300\xB7\uCD95\uC18C\uD558\uC138\uC694. \uD720 \uD074\uB9AD(\uC911\uD074\uB9AD) \uB4DC\uB798\uADF8\uB85C \uBC30\uACBD \uC774\uBBF8\uC9C0\uB97C \uD328\uB2DD\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uACB0\uACFC\uB294 \uC6D0\uBCF8 \uD574\uC0C1\uB3C4\uB85C \uC800\uC7A5\uB429\uB2C8\uB2E4."
        }),
        n.jsxs("div", {
          ref: p,
          className: "relative min-h-[220px] w-full flex-1 overflow-hidden rounded-lg [&_cropper-canvas]:h-full! [&_cropper-canvas]:w-full!",
          style: y ? B : {
            backgroundColor: "#ffffff"
          },
          children: [
            n.jsx("img", {
              ref: k,
              src: s,
              alt: "",
              className: "block max-h-full max-w-full",
              crossOrigin: "anonymous"
            }, s),
            !b && !E ? n.jsxs("div", {
              className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-white/60 text-sm text-neutral-500 dark:bg-black/40 dark:text-neutral-300",
              children: [
                n.jsx(P, {
                  size: 18,
                  className: "mr-2 animate-spin"
                }),
                "\uC900\uBE44 \uC911\u2026"
              ]
            }) : null
          ]
        }),
        n.jsxs("label", {
          className: "flex shrink-0 cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 dark:border-odp-borderSoft",
          children: [
            n.jsxs("span", {
              className: "min-w-0",
              children: [
                n.jsx("span", {
                  className: "block text-xs font-medium text-gray-800 dark:text-odp-fgStrong",
                  children: "PNG \uD22C\uBA85 \uBC30\uACBD \uC720\uC9C0"
                }),
                n.jsx("span", {
                  className: "mt-0.5 block text-[10px] text-gray-500 dark:text-odp-muted",
                  children: "\uB044\uBA74 \uD770 \uBC30\uACBD JPEG\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4."
                })
              ]
            }),
            n.jsx(M, {
              className: $,
              checked: y,
              onCheckedChange: (t) => L(!!t),
              "aria-label": "PNG \uD22C\uBA85 \uBC30\uACBD \uC720\uC9C0",
              children: n.jsx(O, {
                className: X
              })
            })
          ]
        }),
        E ? n.jsx("p", {
          className: "shrink-0 text-xs text-red-600 dark:text-red-300",
          children: E
        }) : null,
        I ? n.jsx("p", {
          className: "shrink-0 text-xs text-red-600 dark:text-red-300",
          children: I
        }) : null,
        n.jsxs("div", {
          className: "flex shrink-0 justify-end gap-2",
          children: [
            n.jsxs("button", {
              type: "button",
              onClick: u,
              disabled: w,
              className: "inline-flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 hover:bg-gray-200 disabled:opacity-50 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg",
              children: [
                n.jsx(D, {
                  size: 16
                }),
                "\uB4A4\uB85C"
              ]
            }),
            n.jsxs("button", {
              type: "button",
              onClick: () => {
                _();
              },
              disabled: w || !b,
              className: "inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",
              children: [
                w ? n.jsx(P, {
                  size: 16,
                  className: "animate-spin"
                }) : n.jsx(Y, {
                  size: 16
                }),
                w ? "\uC801\uC6A9 \uC911\u2026" : "\uC790\uB974\uAE30 \uC801\uC6A9"
              ]
            })
          ]
        })
      ]
    });
  };
});
export {
  __tla,
  ne as default
};
