import { j as i } from "./index-DgMMigqL.js";
import { I as t, t as e } from "./image-CpbnWuhJ.js";
import "./vendor-react-BwEIQNKH.js";
import "./vendor-md-editor-pmGM35s5.js";
import "./vendor-aws-DI8kybWK.js";
import "./vendor-lucide-B-9DwWUo.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-CLW0brs2.js";
import "./vendor-radix-krusovOJ.js";
import "./vendor-google-genai-Bp0rxPXM.js";
async function s(a, r) {
  await i("plugin:clipboard-manager|write_text", { label: r == null ? void 0 : r.label, text: a });
}
async function f() {
  return await i("plugin:clipboard-manager|read_text");
}
async function b(a) {
  await i("plugin:clipboard-manager|write_image", { image: e(a) });
}
async function y() {
  return await i("plugin:clipboard-manager|read_image").then((a) => new t(a));
}
async function x(a, r) {
  await i("plugin:clipboard-manager|write_html", { html: a, altText: r });
}
async function I() {
  await i("plugin:clipboard-manager|clear");
}
export {
  I as clear,
  y as readImage,
  f as readText,
  x as writeHtml,
  b as writeImage,
  s as writeText
};
