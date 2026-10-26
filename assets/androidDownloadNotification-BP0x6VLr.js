const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-C8CrLveq.js","assets/core-BUhCcD2K.js"])))=>i.map(i=>d[i]);
import { _ as d } from "./vendor-aws-hJDgVEKM.js";
import { a as f, __tla as __tla_0 } from "./bootSplash-Z2krRgC9.js";
let l, w;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const e = "downloads";
  let s = "", c = 0;
  l = async function() {
    if (!f()) return false;
    try {
      const n = await d(() => import("./index-C8CrLveq.js"), __vite__mapDeps([0,1]));
      let t = await n.isPermissionGranted();
      return t || (t = await n.requestPermission() === "granted"), t;
    } catch {
      return false;
    }
  };
  w = async function(n, t = "\uB2E4\uC6B4\uB85C\uB4DC \uC644\uB8CC") {
    if (!f()) return;
    const i = n.trim() || "\uD30C\uC77C", a = `${t}\0${i}`, r = Date.now();
    if (!(a === s && r - c < 1500)) {
      s = a, c = r;
      try {
        if (!await l()) return;
        const o = await d(() => import("./index-C8CrLveq.js"), __vite__mapDeps([0,1]));
        await o.createChannel({
          id: e,
          name: "\uB2E4\uC6B4\uB85C\uB4DC",
          importance: o.Importance.High
        }), o.sendNotification({
          title: t,
          body: i,
          channelId: e
        });
      } catch {
      }
    }
  };
});
export {
  __tla,
  l as ensureAndroidDownloadNotificationPermission,
  w as notifyAndroidDownloadedFile
};
