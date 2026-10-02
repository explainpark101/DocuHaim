import { $ as f, a as o } from "./vendor-emoji-CK-opFvR.js";
const r = ["white_check_mark", "x", "+1", "heart", "thinking_face"];
function i() {
  if (!(typeof window > "u")) try {
    const c = f.get("frequently");
    if (!c) {
      const e = {};
      r.forEach((t, n) => {
        e[t] = 200 - n;
      }), (o.DEFAULTS || []).forEach((t, n) => {
        e[t] == null && (e[t] = Math.max(1, 40 - n));
      }), f.set("frequently", e);
      return;
    }
    for (const e of r) c[e] == null && o.add(e);
  } catch {
  }
}
export {
  i as e
};
