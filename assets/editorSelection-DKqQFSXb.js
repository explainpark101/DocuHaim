import { E as ne, S as ie, C as oe } from "./vendor-codemirror-CmNIsAMQ.js";
import { f as ae, g as se } from "./previewSelectionSync-EVhjTAmT.js";
import { aH as le, aI as L, aJ as ce } from "./index-CfCFWUoL.js";
function ue(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t];
    for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
  }
  return e;
}
function D(e, t) {
  return Array(t + 1).join(e);
}
function W(e) {
  return e.replace(/^\n*/, "");
}
function q(e) {
  for (var t = e.length; t > 0 && e[t - 1] === `
`; ) t--;
  return e.substring(0, t);
}
function j(e) {
  return q(W(e));
}
var fe = ["ADDRESS", "ARTICLE", "ASIDE", "AUDIO", "BLOCKQUOTE", "BODY", "CANVAS", "CENTER", "DD", "DIR", "DIV", "DL", "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HGROUP", "HR", "HTML", "ISINDEX", "LI", "MAIN", "MENU", "NAV", "NOFRAMES", "NOSCRIPT", "OL", "OUTPUT", "P", "PRE", "SECTION", "TABLE", "TBODY", "TD", "TFOOT", "TH", "THEAD", "TR", "UL"];
function M(e) {
  return P(e, fe);
}
var K = ["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"];
function X(e) {
  return P(e, K);
}
function de(e) {
  return Y(e, K);
}
var G = ["A", "TABLE", "THEAD", "TBODY", "TFOOT", "TH", "TD", "IFRAME", "SCRIPT", "AUDIO", "VIDEO"];
function me(e) {
  return P(e, G);
}
function pe(e) {
  return Y(e, G);
}
function P(e, t) {
  return t.indexOf(e.nodeName) >= 0;
}
function Y(e, t) {
  return e.getElementsByTagName && t.some(function(r) {
    return e.getElementsByTagName(r).length;
  });
}
var he = [[/\\/g, "\\\\"], [/\*/g, "\\*"], [/^-/g, "\\-"], [/^\+ /g, "\\+ "], [/^(=+)/g, "\\$1"], [/^(#{1,6}) /g, "\\$1 "], [/`/g, "\\`"], [/^~~~/g, "\\~~~"], [/\[/g, "\\["], [/\]/g, "\\]"], [/^>/g, "\\>"], [/_/g, "\\_"], [/^(\d+)\. /g, "$1\\. "]];
function z(e) {
  return he.reduce(function(t, r) {
    return t.replace(r[0], r[1]);
  }, e);
}
var p = {};
p.paragraph = { filter: "p", replacement: function(e) {
  return `

` + e + `

`;
} };
p.lineBreak = { filter: "br", replacement: function(e, t, r) {
  return r.br + `
`;
} };
p.heading = { filter: ["h1", "h2", "h3", "h4", "h5", "h6"], replacement: function(e, t, r) {
  var n = Number(t.nodeName.charAt(1));
  if (r.headingStyle === "setext" && n < 3) {
    var i = D(n === 1 ? "=" : "-", e.length);
    return `

` + e + `
` + i + `

`;
  } else return `

` + D("#", n) + " " + e + `

`;
} };
p.blockquote = { filter: "blockquote", replacement: function(e) {
  return e = j(e).replace(/^/gm, "> "), `

` + e + `

`;
} };
p.list = { filter: ["ul", "ol"], replacement: function(e, t) {
  var r = t.parentNode;
  return r.nodeName === "LI" && r.lastElementChild === t ? `
` + e : `

` + e + `

`;
} };
p.listItem = { filter: "li", replacement: function(e, t, r) {
  var n = r.bulletListMarker + "   ", i = t.parentNode;
  if (i.nodeName === "OL") {
    var o = i.getAttribute("start"), a = Array.prototype.indexOf.call(i.children, t);
    n = (o ? Number(o) + a : a + 1) + ".  ";
  }
  var l = /\n$/.test(e);
  return e = j(e) + (l ? `
` : ""), e = e.replace(/\n/gm, `
` + " ".repeat(n.length)), n + e + (t.nextSibling ? `
` : "");
} };
p.indentedCodeBlock = { filter: function(e, t) {
  return t.codeBlockStyle === "indented" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
}, replacement: function(e, t, r) {
  return `

    ` + t.firstChild.textContent.replace(/\n/g, `
    `) + `

`;
} };
p.fencedCodeBlock = { filter: function(e, t) {
  return t.codeBlockStyle === "fenced" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
}, replacement: function(e, t, r) {
  for (var n = t.firstChild.getAttribute("class") || "", i = (n.match(/language-(\S+)/) || [null, ""])[1], o = t.firstChild.textContent, a = r.fence.charAt(0), l = 3, s = new RegExp("^" + a + "{3,}", "gm"), c; c = s.exec(o); ) c[0].length >= l && (l = c[0].length + 1);
  var u = D(a, l);
  return `

` + u + i + `
` + o.replace(/\n$/, "") + `
` + u + `

`;
} };
p.horizontalRule = { filter: "hr", replacement: function(e, t, r) {
  return `

` + r.hr + `

`;
} };
p.inlineLink = { filter: function(e, t) {
  return t.linkStyle === "inlined" && e.nodeName === "A" && e.getAttribute("href");
}, replacement: function(e, t) {
  var r = B(t.getAttribute("href")), n = O(T(t.getAttribute("title"))), i = n ? ' "' + n + '"' : "";
  return "[" + e + "](" + r + i + ")";
} };
p.referenceLink = { filter: function(e, t) {
  return t.linkStyle === "referenced" && e.nodeName === "A" && e.getAttribute("href");
}, replacement: function(e, t, r) {
  var n = B(t.getAttribute("href")), i = T(t.getAttribute("title"));
  i && (i = ' "' + O(i) + '"');
  var o, a;
  switch (r.linkReferenceStyle) {
    case "collapsed":
      o = "[" + e + "][]", a = "[" + e + "]: " + n + i;
      break;
    case "shortcut":
      o = "[" + e + "]", a = "[" + e + "]: " + n + i;
      break;
    default:
      var l = this.references.length + 1;
      o = "[" + e + "][" + l + "]", a = "[" + l + "]: " + n + i;
  }
  return this.references.push(a), o;
}, references: [], append: function(e) {
  var t = "";
  return this.references.length && (t = `

` + this.references.join(`
`) + `

`, this.references = []), t;
} };
p.emphasis = { filter: ["em", "i"], replacement: function(e, t, r) {
  return e.trim() ? r.emDelimiter + e + r.emDelimiter : "";
} };
p.strong = { filter: ["strong", "b"], replacement: function(e, t, r) {
  return e.trim() ? r.strongDelimiter + e + r.strongDelimiter : "";
} };
p.code = { filter: function(e) {
  var t = e.previousSibling || e.nextSibling, r = e.parentNode.nodeName === "PRE" && !t;
  return e.nodeName === "CODE" && !r;
}, replacement: function(e) {
  if (!e) return "";
  e = e.replace(/\r?\n|\r/g, " ");
  for (var t = /^`|^ .*?[^ ].* $|`$/.test(e) ? " " : "", r = "`", n = e.match(/`+/gm) || []; n.indexOf(r) !== -1; ) r = r + "`";
  return r + t + e + t + r;
} };
p.image = { filter: "img", replacement: function(e, t) {
  var r = z(T(t.getAttribute("alt"))), n = B(t.getAttribute("src") || ""), i = T(t.getAttribute("title")), o = i ? ' "' + O(i) + '"' : "";
  return n ? "![" + r + "](" + n + o + ")" : "";
} };
function T(e) {
  return e ? e.replace(/(\n+\s*)+/g, `
`) : "";
}
function B(e) {
  var t = e.replace(/([<>()])/g, "\\$1");
  return t.indexOf(" ") >= 0 ? "<" + t + ">" : t;
}
function O(e) {
  return e.replace(/"/g, '\\"');
}
function J(e) {
  this.options = e, this._keep = [], this._remove = [], this.blankRule = { replacement: e.blankReplacement }, this.keepReplacement = e.keepReplacement, this.defaultRule = { replacement: e.defaultReplacement }, this.array = [];
  for (var t in e.rules) this.array.push(e.rules[t]);
}
J.prototype = { add: function(e, t) {
  this.array.unshift(t);
}, keep: function(e) {
  this._keep.unshift({ filter: e, replacement: this.keepReplacement });
}, remove: function(e) {
  this._remove.unshift({ filter: e, replacement: function() {
    return "";
  } });
}, forNode: function(e) {
  if (e.isBlank) return this.blankRule;
  var t;
  return (t = x(this.array, e, this.options)) || (t = x(this._keep, e, this.options)) || (t = x(this._remove, e, this.options)) ? t : this.defaultRule;
}, forEach: function(e) {
  for (var t = 0; t < this.array.length; t++) e(this.array[t], t);
} };
function x(e, t, r) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    if (ge(i, t, r)) return i;
  }
}
function ge(e, t, r) {
  var n = e.filter;
  if (typeof n == "string") {
    if (n === t.nodeName.toLowerCase()) return true;
  } else if (Array.isArray(n)) {
    if (n.indexOf(t.nodeName.toLowerCase()) > -1) return true;
  } else if (typeof n == "function") {
    if (n.call(e, t, r)) return true;
  } else throw new TypeError("`filter` needs to be a string, array, or function");
}
function ve(e) {
  var t = e.element, r = e.isBlock, n = e.isVoid, i = e.isPre || function(d) {
    return d.nodeName === "PRE";
  };
  if (!(!t.firstChild || i(t))) {
    for (var o = null, a = false, l = null, s = $(l, t, i); s !== t; ) {
      if (s.nodeType === 3 || s.nodeType === 4) {
        var c = s.data.replace(/[ \r\n\t]+/g, " ");
        if ((!o || / $/.test(o.data)) && !a && c[0] === " " && (c = c.substr(1)), !c) {
          s = C(s);
          continue;
        }
        s.data = c, o = s;
      } else if (s.nodeType === 1) r(s) || s.nodeName === "BR" ? (o && (o.data = o.data.replace(/ $/, "")), o = null, a = false) : n(s) || i(s) ? (o = null, a = true) : o && (a = false);
      else {
        s = C(s);
        continue;
      }
      var u = $(l, s, i);
      l = s, s = u;
    }
    o && (o.data = o.data.replace(/ $/, ""), o.data || C(o));
  }
}
function C(e) {
  var t = e.nextSibling || e.parentNode;
  return e.parentNode.removeChild(e), t;
}
function $(e, t, r) {
  return e && e.parentNode === t || r(t) ? t.nextSibling || t.parentNode : t.firstChild || t.nextSibling || t.parentNode;
}
var F = typeof window < "u" ? window : {};
function Ee() {
  var e = F.DOMParser, t = false;
  try {
    new e().parseFromString("", "text/html") && (t = true);
  } catch {
  }
  return t;
}
function Ae() {
  var e = function() {
  };
  return ye() ? e.prototype.parseFromString = function(t) {
    var r = new window.ActiveXObject("htmlfile");
    return r.designMode = "on", r.open(), r.write(t), r.close(), r;
  } : e.prototype.parseFromString = function(t) {
    var r = document.implementation.createHTMLDocument("");
    return r.open(), r.write(t), r.close(), r;
  }, e;
}
function ye() {
  var e = false;
  try {
    document.implementation.createHTMLDocument("").open();
  } catch {
    F.ActiveXObject && (e = true);
  }
  return e;
}
var be = Ee() ? F.DOMParser : Ae();
function Te(e, t) {
  var r;
  if (typeof e == "string") {
    var n = Se().parseFromString('<x-turndown id="turndown-root">' + e + "</x-turndown>", "text/html");
    r = n.getElementById("turndown-root");
  } else r = e.cloneNode(true);
  return ve({ element: r, isBlock: M, isVoid: X, isPre: t.preformattedCode ? Re : null }), r;
}
var w;
function Se() {
  return w = w || new be(), w;
}
function Re(e) {
  return e.nodeName === "PRE" || e.nodeName === "CODE";
}
function Ne(e, t) {
  return e.isBlock = M(e), e.isCode = e.nodeName === "CODE" || e.parentNode.isCode, e.isBlank = ke(e), e.flankingWhitespace = xe(e, t), e;
}
function ke(e) {
  return !X(e) && !me(e) && /^\s*$/i.test(e.textContent) && !de(e) && !pe(e);
}
function xe(e, t) {
  if (e.isBlock || t.preformattedCode && e.isCode) return { leading: "", trailing: "" };
  var r = Ce(e.textContent);
  return r.leadingAscii && H("left", e, t) && (r.leading = r.leadingNonAscii), r.trailingAscii && H("right", e, t) && (r.trailing = r.trailingNonAscii), { leading: r.leading, trailing: r.trailing };
}
function Ce(e) {
  var t = e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
  return { leading: t[1], leadingAscii: t[2], leadingNonAscii: t[3], trailing: t[4], trailingNonAscii: t[5], trailingAscii: t[6] };
}
function H(e, t, r) {
  var n, i, o;
  return e === "left" ? (n = t.previousSibling, i = / $/) : (n = t.nextSibling, i = /^ /), n && (n.nodeType === 3 ? o = i.test(n.nodeValue) : r.preformattedCode && n.nodeName === "CODE" ? o = false : n.nodeType === 1 && !M(n) && (o = i.test(n.textContent))), o;
}
var we = Array.prototype.reduce;
function S(e) {
  if (!(this instanceof S)) return new S(e);
  var t = { rules: p, headingStyle: "setext", hr: "* * *", bulletListMarker: "*", codeBlockStyle: "indented", fence: "```", emDelimiter: "_", strongDelimiter: "**", linkStyle: "inlined", linkReferenceStyle: "full", br: "  ", preformattedCode: false, blankReplacement: function(r, n) {
    return n.isBlock ? `

` : "";
  }, keepReplacement: function(r, n) {
    return n.isBlock ? `

` + n.outerHTML + `

` : n.outerHTML;
  }, defaultReplacement: function(r, n) {
    return n.isBlock ? `

` + r + `

` : r;
  } };
  this.options = ue({}, t, e), this.rules = new J(this.options);
}
S.prototype = { turndown: function(e) {
  if (!Me(e)) throw new TypeError(e + " is not a string, or an element/document/fragment node.");
  if (e === "") return "";
  var t = Q.call(this, new Te(e, this.options));
  return De.call(this, t);
}, use: function(e) {
  if (Array.isArray(e)) for (var t = 0; t < e.length; t++) this.use(e[t]);
  else if (typeof e == "function") e(this);
  else throw new TypeError("plugin must be a Function or an Array of Functions");
  return this;
}, addRule: function(e, t) {
  return this.rules.add(e, t), this;
}, keep: function(e) {
  return this.rules.keep(e), this;
}, remove: function(e) {
  return this.rules.remove(e), this;
}, escape: function(e) {
  return z(e);
} };
function Q(e) {
  var t = this;
  return we.call(e.childNodes, function(r, n) {
    n = new Ne(n, t.options);
    var i = "";
    return n.nodeType === 3 ? i = n.isCode ? n.nodeValue : t.escape(n.nodeValue) : n.nodeType === 1 && (i = Le.call(t, n)), Z(r, i);
  }, "");
}
function De(e) {
  var t = this;
  return this.rules.forEach(function(r) {
    typeof r.append == "function" && (e = Z(e, r.append(t.options)));
  }), e.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
}
function Le(e) {
  var t = this.rules.forNode(e), r = Q.call(this, e), n = e.flankingWhitespace;
  return (n.leading || n.trailing) && (r = r.trim()), n.leading + t.replacement(r, e, this.options) + n.trailing;
}
function Z(e, t) {
  var r = q(e), n = W(t), i = Math.max(e.length - r.length, t.length - n.length), o = `

`.substring(0, i);
  return r + o + n;
}
function Me(e) {
  return e != null && (typeof e == "string" || e.nodeType && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11));
}
const N = "data-mirror-edit", A = "data-mirror-edit-active", Pe = "a, button, input, textarea, select, label, .md-editor-code-action, [data-transform-handle], table, .md-editor-mermaid, .md-editor-katex, .md-editor-code, pre, [data-note-cover]";
function Qe(e) {
  return e instanceof Element ? !!(e.closest(`[${A}]`) || e.closest(`[${N}]`)) : false;
}
function Ze(e) {
  return !!(e == null ? void 0 : e.querySelector(`[${A}]`));
}
function Be(e) {
  var _a, _b;
  return e ? !!((_b = (e instanceof Element && e.classList.contains("md-editor") ? e : null) || ((_a = e.querySelector) == null ? void 0 : _a.call(e, ".md-editor")) || (e instanceof Element ? e.closest(".md-editor") : null)) == null ? void 0 : _b.classList.contains("md-editor-previewOnly")) : false;
}
function Oe(e) {
  const t = e.match(/^(.*?)(\n*)$/s);
  return { body: (t == null ? void 0 : t[1]) ?? e, trailing: (t == null ? void 0 : t[2]) ?? "" };
}
function Fe(e) {
  var _a;
  const t = [/^(#{1,6}[ \t]+)/, /^([ \t]*[-*+][ \t]+\[[ xX]\][ \t]+)/, /^([ \t]*[-*+][ \t]+)/, /^([ \t]*\d+\.[ \t]+)/, /^(>[ \t]?)/];
  for (const r of t) {
    const i = (_a = e.match(r)) == null ? void 0 : _a[1];
    if (i) return { prefix: i, content: e.slice(i.length) };
  }
  return { prefix: "", content: e };
}
function Ie(e) {
  return e instanceof Element ? e.closest(`[${A}]`) ? false : !!e.closest(Pe) : true;
}
const k = new S({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-", emDelimiter: "*", strongDelimiter: "**" });
k.keep(["u", "sub", "sup"]);
k.addRule("wikiImageData", { filter: (e) => {
  var _a;
  return e.nodeName !== "IMG" ? false : !!((_a = e.getAttribute) == null ? void 0 : _a.call(e, "data-wiki-path"));
}, replacement: (e, t) => {
  const r = t;
  return le({ path: r.getAttribute("data-wiki-path"), width: r.getAttribute("data-wiki-width"), height: r.getAttribute("data-wiki-height"), background: r.getAttribute("data-wiki-bg") });
} });
k.addRule("deepHeading", { filter: (e) => {
  var _a;
  if (!(e == null ? void 0 : e.nodeName)) return false;
  const t = Number((_a = e.getAttribute) == null ? void 0 : _a.call(e, "data-heading-level"));
  return !!(Number.isInteger(t) && t >= 7);
}, replacement: (e, t) => {
  var _a;
  const r = Number((_a = t.getAttribute) == null ? void 0 : _a.call(t, "data-heading-level")), n = Number.isInteger(r) && r >= 1 ? r : 6;
  return `${"#".repeat(n)} ${e.trim()}`;
} });
function $e(e, t) {
  let r = e.trim();
  return t && (/^#{1,6}[ \t]+/.test(t) ? r = r.replace(/^#{1,6}[ \t]+/, "") : /\[[ xX]\]/.test(t) ? r = r.replace(/^([-*+]|\d+\.)[ \t]+\[[ xX]\][ \t]+/, "") : /^([ \t]*[-*+][ \t]+)/.test(t) || /^([ \t]*\d+\.[ \t]+)/.test(t) ? r = r.replace(/^([-*+]|\d+\.)[ \t]+/, "") : /^>[ \t]?/.test(t) && (r = r.replace(/^(>[ \t]?)+/gm, "").trim())), r;
}
function He(e, t) {
  if (!/\[[ xX]\]/.test(e)) return e;
  const r = t.querySelector('input[type="checkbox"]');
  if (!(r instanceof HTMLInputElement)) return e;
  const n = r.checked;
  return e.replace(/\[[ xX]\]/, n ? "[x]" : "[ ]");
}
function Ve(e, t) {
  const { prefix: r } = Fe(t), n = e.cloneNode(true);
  n.removeAttribute(A), n.removeAttribute(N), n.removeAttribute("contenteditable"), n.removeAttribute("spellcheck");
  const i = He(r, n);
  n.querySelectorAll('input[type="checkbox"]').forEach((u) => u.remove()), n.querySelectorAll(".md-preview-heading-fold-chevron, .md-heading-fold, .md-editor-code-action, [data-transform-handle], button").forEach((u) => u.remove());
  const o = e.tagName.toLowerCase(), l = /^h[1-6]$/.test(o) || o === "p" || o === "li" || o === "blockquote" || o === "td" || o === "th" ? n.innerHTML : n.outerHTML;
  let s = k.turndown(l || "");
  s = s.replace(/^\n+|\n+$/g, ""), s = $e(s, i);
  const c = Number(e.getAttribute("data-heading-level"));
  return Number.isInteger(c) && c >= 7 ? `${"#".repeat(c)} ${s.replace(/^#{1,6}[ \t]+/, "").trim()}` : i ? `${i}${s}` : s;
}
let h = null;
function b(e) {
  const t = h;
  h = null, t && (t.cleanup(), t.block.isConnected && (t.block.removeAttribute(A), t.block.removeAttribute(N), t.block.removeAttribute("contenteditable"), t.block.removeAttribute("spellcheck"), e && (t.block.innerHTML = t.snapshotHtml)));
}
function y(e) {
  const t = h;
  if (!t) return;
  const n = `${Ve(t.block, t.snapshotBody)}${t.trailing}`, { from: i, to: o } = t, a = e.state.doc.sliceString(i, o);
  if (n === a) {
    b(true);
    return;
  }
  b(false), e.dispatch({ changes: { from: i, to: o, insert: n }, selection: { anchor: i + n.length } });
}
function V(e, t, r) {
  var _a;
  const n = (_a = window.getSelection) == null ? void 0 : _a.call(window);
  if (!n) return;
  try {
    const o = document;
    if (typeof o.caretRangeFromPoint == "function") {
      const a = o.caretRangeFromPoint(t, r);
      if (a && e.contains(a.startContainer)) {
        n.removeAllRanges(), n.addRange(a);
        return;
      }
    }
    if (typeof o.caretPositionFromPoint == "function") {
      const a = o.caretPositionFromPoint(t, r);
      if ((a == null ? void 0 : a.offsetNode) && e.contains(a.offsetNode)) {
        const l = document.createRange();
        l.setStart(a.offsetNode, a.offset), l.collapse(true), n.removeAllRanges(), n.addRange(l);
        return;
      }
    }
  } catch {
  }
  const i = document.createRange();
  i.selectNodeContents(e), i.collapse(false), n.removeAllRanges(), n.addRange(i);
}
function ee(e, t, r, n, i) {
  if (h) {
    if (h.block === e) return V(e, n, i), true;
    y(t);
  }
  const o = Number(e.getAttribute("data-line"));
  if (!Number.isFinite(o)) return false;
  const { from: a, to: l } = se(t, r, o, o), s = t.state.doc.sliceString(a, l);
  if (!s && a === l) return false;
  const { body: c, trailing: u } = Oe(s), d = e.innerHTML;
  e.setAttribute(A, "1"), e.setAttribute(N, "1"), e.setAttribute("contenteditable", "true"), e.setAttribute("spellcheck", "true"), e.setAttribute("aria-label", "Mirror Edit"), e.querySelectorAll(".md-preview-heading-fold-chevron, button").forEach((f) => {
    f instanceof HTMLElement && (f.contentEditable = "false");
  });
  const v = (f) => {
    if (f.key === "Escape") {
      f.preventDefault(), f.stopPropagation(), b(true);
      return;
    }
    if (f.key === "Enter" && (f.metaKey || f.ctrlKey)) {
      f.preventDefault(), f.stopPropagation(), y(t);
      return;
    }
    const E = e.tagName.toLowerCase();
    f.key === "Enter" && !f.shiftKey && /^h[1-6]$/.test(E) && (f.preventDefault(), f.stopPropagation(), y(t));
  }, m = (f) => {
    var _a;
    const E = (_a = f.clipboardData) == null ? void 0 : _a.getData("text/plain");
    E != null && (f.preventDefault(), document.execCommand("insertText", false, E));
  }, g = () => {
    window.setTimeout(() => {
      (h == null ? void 0 : h.block) === e && (e.contains(document.activeElement) || y(t));
    }, 0);
  };
  return e.addEventListener("keydown", v), e.addEventListener("paste", m), e.addEventListener("blur", g), h = { block: e, snapshotHtml: d, snapshotBody: c, from: a, to: l, trailing: u, cleanup: () => {
    e.removeEventListener("keydown", v), e.removeEventListener("paste", m), e.removeEventListener("blur", g);
  } }, requestAnimationFrame(() => {
    e.focus(), V(e, n, i);
  }), true;
}
function et(e, t) {
  const r = (n) => {
    if (!t.isEnabled() || Ie(n.target)) return;
    const i = t.getPreviewRoot();
    if (!i || !(n.target instanceof Node) || !i.contains(n.target)) return;
    const o = ae(n.target, i);
    if (!o) return;
    const a = t.getView();
    a && (n.preventDefault(), n.stopPropagation(), ee(o, a, i, n.clientX, n.clientY));
  };
  return e.addEventListener("dblclick", r, true), () => {
    e.removeEventListener("dblclick", r, true), h && b(true);
  };
}
function tt() {
  b(true);
}
function rt(e) {
  return !e || !h ? false : (y(e), true);
}
function nt(e, t, r, n, i) {
  return ee(e, t, r, n, i);
}
function it() {
  h && (h.block.isConnected || (h.cleanup(), h = null));
}
function _(e) {
  if (!e || typeof e != "object") return false;
  const t = e;
  return typeof t.getEditorView == "function" || typeof t.getSelectedText == "function";
}
function te(e) {
  const t = e == null ? void 0 : e.current;
  if (!t || typeof t != "object") return null;
  if (_(t)) return t;
  const r = t.value;
  return _(r) ? r : null;
}
function re(e) {
  return te(e);
}
const _e = [50, 200, 500, 1e3];
function Ue(e, t = null) {
  if (t == null ? void 0 : t.dom) return t.dom.closest(".md-editor");
  const r = re(e);
  return typeof Element < "u" && (r == null ? void 0 : r.root) instanceof Element ? r.root : null;
}
function We(e, { view: t = null, documentKey: r = null } = {}) {
  var _a;
  const n = t ?? I(e, { documentKey: r }).view, i = Ue(e, n);
  return Be(i) ? true : ((_a = L(n, r)) == null ? void 0 : _a.everFocused) ? false : (n == null ? void 0 : n.state, true);
}
function qe(e, t) {
  return e ? e.endsWith(`
`) ? t : `
${t}` : t;
}
function je(e, t) {
  if (!e) return t;
  const r = e.endsWith(`
`) ? "" : `
`;
  return `${e}${r}${t}`;
}
function R(e, t, r) {
  const n = Math.max(0, Math.min(t, e)), i = Math.max(n, Math.min(r, e));
  return { from: n, to: i };
}
function Ke(e, t, r, n, i) {
  if (typeof i != "function") return false;
  const o = R(e.length, t, r), a = `${e.slice(0, o.from)}${n}${e.slice(o.to)}`;
  return i(a), true;
}
function ot({ editorRef: e, result: t, onChange: r, getMarkdown: n, forceAppendAtEnd: i = false, documentKey: o = null }) {
  var _a, _b, _c;
  const a = I(e, { documentKey: o }), { view: l } = a;
  if (i || We(e, { view: l, documentKey: o })) {
    const g = ((_c = (_b = (_a = l == null ? void 0 : l.state) == null ? void 0 : _a.doc) == null ? void 0 : _b.toString) == null ? void 0 : _c.call(_b)) ?? (typeof n == "function" ? n() : ""), f = qe(g, t);
    if (l == null ? void 0 : l.state) {
      const E = g.length;
      return U(l, E, E, f, r);
    }
    return typeof r == "function" ? (r(je(g, t)), true) : false;
  }
  const c = L(l, o);
  let u = a.from, d = a.to;
  if ((!(l == null ? void 0 : l.hasFocus) && (c == null ? void 0 : c.everFocused) || u === d && (c == null ? void 0 : c.everFocused)) && (u = c.from, d = c.to), !(c == null ? void 0 : c.everFocused) && u === d && !a.text.trim()) return false;
  if (l == null ? void 0 : l.state) {
    const g = l.state.doc.length, f = R(g, u, d);
    return U(l, f.from, f.to, t, r);
  }
  const m = typeof n == "function" ? n() : "";
  return Ke(m, u, d, t, r);
}
function Xe(e, t, r) {
  var _a, _b;
  const n = e.state.selection.main, i = !!e.hasFocus, o = L(e, r);
  if (i) {
    const s = e.state.doc.sliceString(n.from, n.to);
    if (s) return { text: s, from: n.from, to: n.to, view: e };
    if (o == null ? void 0 : o.everFocused) {
      const u = e.state.doc.length, { from: d, to: v } = R(u, o.from, o.to);
      return { text: e.state.doc.sliceString(d, v), from: d, to: v, view: e };
    }
    const c = ((_a = t == null ? void 0 : t.getSelectedText) == null ? void 0 : _a.call(t)) ?? "";
    return c ? { text: c, from: n.from, to: n.to, view: e } : { text: "", from: n.from, to: n.to, view: e };
  }
  if (o == null ? void 0 : o.everFocused) {
    const s = e.state.doc.length, { from: c, to: u } = R(s, o.from, o.to);
    return { text: e.state.doc.sliceString(c, u), from: c, to: u, view: e };
  }
  const a = e.state.doc.sliceString(n.from, n.to);
  if (a) return { text: a, from: n.from, to: n.to, view: e };
  const l = ((_b = t == null ? void 0 : t.getSelectedText) == null ? void 0 : _b.call(t)) ?? "";
  return l ? { text: l, from: n.from, to: n.to, view: e } : { text: a, from: n.from, to: n.to, view: e };
}
function I(e, t) {
  var _a, _b, _c;
  const r = (t == null ? void 0 : t.documentKey) ?? null, n = ((_a = t == null ? void 0 : t.getEditorApi) == null ? void 0 : _a.call(t)) ?? te(e), i = ((_b = n == null ? void 0 : n.getEditorView) == null ? void 0 : _b.call(n)) ?? null;
  if (i == null ? void 0 : i.state) return Xe(i, n, r);
  const o = ce(r);
  return (o == null ? void 0 : o.everFocused) ? { text: "", from: o.from, to: o.to, view: null } : { text: ((_c = n == null ? void 0 : n.getSelectedText) == null ? void 0 : _c.call(n)) ?? "", from: 0, to: 0, view: null };
}
function Ge(e) {
  var _a, _b;
  return ((_b = (_a = re(e)) == null ? void 0 : _a.getEditorView) == null ? void 0 : _b.call(_a)) ?? null;
}
function at(e, t, r) {
  let n = false, i = null, o = null;
  const a = [], l = (r == null ? void 0 : r.documentKey) ?? null, s = () => {
    n || t(I(e, { documentKey: l }));
  }, c = () => {
    o == null ? void 0 : o(), o = null, i = null;
  };
  let u = null, d = false;
  const v = () => {
    if (n) return true;
    const m = Ge(e);
    if (!m || m === i) return !!m;
    c(), i = m, d = false, u || (u = new oe());
    const g = u, f = ne.updateListener.of((E) => {
      E.selectionSet && s();
    });
    if (d) try {
      m.dispatch({ effects: g.reconfigure(f) });
    } catch {
      d = false;
    }
    if (!d) try {
      m.dispatch({ effects: ie.appendConfig.of(g.of(f)) }), d = true;
    } catch {
      return s(), true;
    }
    return o = () => {
      if (d) {
        try {
          m.dispatch({ effects: g.reconfigure([]) });
        } catch {
        }
        d = false;
      }
    }, s(), true;
  };
  if (!v()) for (const m of _e) a.push(setTimeout(() => {
    n || v();
  }, m));
  return () => {
    n = true;
    for (const m of a) clearTimeout(m);
    c();
  };
}
function U(e, t, r, n, i) {
  var _a;
  return (e == null ? void 0 : e.state) ? (e.dispatch({ changes: { from: t, to: r, insert: n }, selection: { anchor: t + n.length } }), (_a = e.focus) == null ? void 0 : _a.call(e), i == null ? void 0 : i(e.state.doc.toString()), true) : false;
}
export {
  ot as a,
  et as b,
  tt as c,
  it as d,
  Qe as e,
  Be as f,
  I as g,
  nt as h,
  Ze as i,
  rt as j,
  U as r,
  at as s
};
