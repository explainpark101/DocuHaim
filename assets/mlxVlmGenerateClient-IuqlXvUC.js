import { t as g, b as p, a as f } from "./OpenAiCompatibleModelSelect-J5DeiUdB.js";
import { k as x, m as d } from "./index-CzDTh_Dm.js";
async function w({ instruction: s, systemPrompt: o, selectedText: n, images: i, requestOptions: a, onChunk: r, signal: t }) {
  const e = String(s || "").trim(), l = String(n || "").trim(), m = x(i);
  if (!e) throw new Error("\uC9C0\uC2DC\uC0AC\uD56D\uC744 \uC785\uB825\uD558\uC138\uC694.");
  g(t);
  const c = p({ instruction: e, selectedText: l, hasImages: m.length > 0 });
  return d({ prompt: c, systemPrompt: (o ?? "").trim(), images: m, generateOptions: f(a ?? {}), resetCache: true, ...r ? { onChunk: r } : {}, ...t ? { signal: t } : {} });
}
export {
  w as g
};
