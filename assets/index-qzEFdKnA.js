import { j as i } from "./index-CxSNwP6k.js";
import { I as t, t as e } from "./image-CD5vxEK4.js";
import "./vendor-react-kfkzeLNk.js";
import "./vendor-md-editor-BDWDGvn8.js";
import "./vendor-aws-BG4gQ5qJ.js";
import "./vendor-lucide-DL-f4Fg7.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-jUlp7ZOS.js";
import "./vendor-radix-DRr4EGX0.js";
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
