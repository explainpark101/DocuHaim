const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DGsX52eZ.js","assets/index-yE085Wbj.js","assets/vendor-aws-hJDgVEKM.js","assets/vendor-react-BPvvDyqO.js","assets/vendor-lucide-Bo8me5Pj.js","assets/bootSplash-Z2krRgC9.js","assets/core-BUhCcD2K.js","assets/vendor-zip-Bez6qchM.js","assets/vendor-motion-Bv-XITR_.js","assets/vendor-markdown-it-Dg5Isw3B.js","assets/vendor-radix-ClWfNC7b.js","assets/index-xDBSQWt7.css"])))=>i.map(i=>d[i]);
import { _ } from "./vendor-aws-hJDgVEKM.js";
import { n as a, b as y, j as h, __tla as __tla_0 } from "./index-yE085Wbj.js";
import { invoke as e } from "./core-BUhCcD2K.js";
import { a as n, __tla as __tla_1 } from "./bootSplash-Z2krRgC9.js";
import { __tla as __tla_2 } from "./vendor-react-BPvvDyqO.js";
import "./vendor-lucide-Bo8me5Pj.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-Bv-XITR_.js";
import "./vendor-markdown-it-Dg5Isw3B.js";
import "./vendor-radix-ClWfNC7b.js";
let v, j;
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
  v = async function() {
    if (!n()) return false;
    try {
      return await e("android_ensure_storage_permission"), true;
    } catch (t) {
      return console.warn("Android storage permission request failed:", t), false;
    }
  };
  j = async function(t, o) {
    if (!n()) return {
      ok: false,
      savedName: o
    };
    const i = a(String(o || "download").trim() || "download");
    if (!await v()) throw new Error("\uC800\uC7A5\uC18C \uAD8C\uD55C\uC774 \uD544\uC694\uD569\uB2C8\uB2E4. \uC124\uC815\uC5D0\uC11C \uAD8C\uD55C\uC744 \uD5C8\uC6A9\uD55C \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.");
    const s = a(await y()), d = `dl-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`, r = a(await h(s, d)), { writeFile: m, remove: c, exists: w } = await _(async () => {
      const { writeFile: f, remove: p, exists: u } = await import("./index-DGsX52eZ.js");
      return {
        writeFile: f,
        remove: p,
        exists: u
      };
    }, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])), l = new Uint8Array(await t.arrayBuffer());
    try {
      return await m(r, l), await e("android_save_file_to_downloads", {
        path: r,
        fileName: i
      }), {
        ok: true,
        savedName: i
      };
    } finally {
      try {
        await w(r) && await c(r);
      } catch {
      }
    }
  };
});
export {
  __tla,
  v as ensureAndroidStoragePermission,
  j as writeBlobToAndroidPublicDownloads
};
