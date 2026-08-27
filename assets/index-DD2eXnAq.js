import { j as i } from "./index-CaS1IMRb.js";
import { I as t, t as e } from "./image-sJc326Ay.js";
import "./vendor-react-kfkzeLNk.js";
import "./vendor-md-editor-FJV153Jl.js";
import "./vendor-aws-BZmJI9DS.js";
import "./vendor-lucide-CPdXFatZ.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-jUlp7ZOS.js";
import "./vendor-radix-DlfIFeUY.js";
import "./vendor-google-genai-BXoTgYIl.js";
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
