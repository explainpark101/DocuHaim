import { j as i } from "./index-y-7LfBXB.js";
import { I as t, t as e } from "./image-C8xmFaGu.js";
import "./vendor-react-kfkzeLNk.js";
import "./vendor-md-editor-3uoZigMr.js";
import "./vendor-aws-DoHMlT-9.js";
import "./vendor-lucide-MHeIhp6j.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-9P87yVtW.js";
import "./vendor-radix-BympcaAE.js";
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
