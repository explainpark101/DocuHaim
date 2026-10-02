const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/window-DBZdCc_s.js","assets/core-DhEqZVGG.js","assets/event-BK_86lmQ.js","assets/image-DNK7xb7J.js"])))=>i.map(i=>d[i]);
import { _ as a } from "./vendor-aws-Cvd3RhZI.js";
import { i as s, m as w, __tla as __tla_0 } from "./bootSplash-QPCcRCUR.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const t = s();
  t.setStatus("\uC2DC\uC791 \uD654\uBA74 \uC900\uBE44 \uC911\u2026");
  function u() {
    return typeof navigator > "u" ? false : /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "");
  }
  async function d() {
    const o = window;
    if (!(!("__TAURI_INTERNALS__" in o) && !("__TAURI__" in o))) {
      if (u()) {
        t.setStatus("\uC571 \uBAA8\uB4C8 \uB85C\uB529 \uC911\u2026"), t.setProgress(0.08);
        return;
      }
      try {
        const { getCurrentWindow: i } = await a(async () => {
          const { getCurrentWindow: n } = await import("./window-DBZdCc_s.js").then((r) => r.w);
          return {
            getCurrentWindow: n
          };
        }, __vite__mapDeps([0,1,2,3])), e = i();
        await e.show();
        try {
          await e.setFocus();
        } catch {
        }
        w(), t.setStatus("\uC571 \uBAA8\uB4C8 \uB85C\uB529 \uC911\u2026"), t.setProgress(0.08);
      } catch (i) {
        console.warn("[earlyBoot] show window failed", i);
      }
    }
  }
  d();
});
