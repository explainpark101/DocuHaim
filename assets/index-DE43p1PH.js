import { j as i } from "./index-DGkRmTW6.js";
import { I as t, t as e } from "./image-BNLmCCJ_.js";
import "./vendor-react-BFxggocB.js";
import "./vendor-md-editor-CRNS8cBC.js";
import "./vendor-aws-CacdPxb-.js";
import "./vendor-lucide-D7vvAA4A.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-ClPHWmRP.js";
import "./vendor-google-genai-DGp6lEvQ.js";
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
