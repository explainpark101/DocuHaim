const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/window-DBZdCc_s.js","assets/core-DhEqZVGG.js","assets/event-BK_86lmQ.js","assets/image-DNK7xb7J.js"])))=>i.map(i=>d[i]);
import { _ as s } from "./vendor-aws-Cvd3RhZI.js";
import { i as e, m as w, __tla as __tla_0 } from "./bootSplash-B8aCHT5v.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const o = e();
  o.setStatus("\uC2DC\uC791 \uD654\uBA74 \uC900\uBE44 \uC911\u2026");
  async function _() {
    const a = window;
    if (!(!("__TAURI_INTERNALS__" in a) && !("__TAURI__" in a))) try {
      const { getCurrentWindow: t } = await s(async () => {
        const { getCurrentWindow: n } = await import("./window-DBZdCc_s.js").then((r) => r.w);
        return {
          getCurrentWindow: n
        };
      }, __vite__mapDeps([0,1,2,3])), i = t();
      await i.show();
      try {
        await i.setFocus();
      } catch {
      }
      w(), o.setStatus("\uC571 \uBAA8\uB4C8 \uB85C\uB529 \uC911\u2026"), o.setProgress(0.08);
    } catch (t) {
      console.warn("[earlyBoot] show window failed", t);
    }
  }
  _();
});
