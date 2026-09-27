const r = "#export-pdf-preview, [data-export-pdf-preview], .export-pdf-paper-content, .export-pdf-pages";
function n(e) {
  return typeof document > "u" ? false : e instanceof Element && e.closest(r) ? true : !!document.getElementById("export-pdf-preview");
}
function d(e) {
  if (n(e)) return "default";
  if (e instanceof Element) {
    const t = (e.getAttribute("data-mermaid-theme") || "").trim();
    if (t === "dark") return "dark";
    if (t === "default") return "default";
  }
  return typeof document < "u" && document.documentElement.classList.contains("dark") ? "dark" : "default";
}
export {
  d as r
};
