import { f as Y, g as Q } from "./previewSelectionSync-CKoD-Cmu.js";
import { a9 as J } from "./index-CJ1EaoQk.js";
function Z(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t];
    for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
  }
  return e;
}
function w(e, t) {
  return Array(t + 1).join(e);
}
function H(e) {
  return e.replace(/^\n*/, "");
}
function F(e) {
  for (var t = e.length; t > 0 && e[t - 1] === `
`; ) t--;
  return e.substring(0, t);
}
function _(e) {
  return F(H(e));
}
var ee = ["ADDRESS", "ARTICLE", "ASIDE", "AUDIO", "BLOCKQUOTE", "BODY", "CANVAS", "CENTER", "DD", "DIR", "DIV", "DL", "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HGROUP", "HR", "HTML", "ISINDEX", "LI", "MAIN", "MENU", "NAV", "NOFRAMES", "NOSCRIPT", "OL", "OUTPUT", "P", "PRE", "SECTION", "TABLE", "TBODY", "TD", "TFOOT", "TH", "THEAD", "TR", "UL"];
function S(e) {
  return C(e, ee);
}
var V = ["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"];
function U(e) {
  return C(e, V);
}
function te(e) {
  return q(e, V);
}
var W = ["A", "TABLE", "THEAD", "TBODY", "TFOOT", "TH", "TD", "IFRAME", "SCRIPT", "AUDIO", "VIDEO"];
function re(e) {
  return C(e, W);
}
function ne(e) {
  return q(e, W);
}
function C(e, t) {
  return t.indexOf(e.nodeName) >= 0;
}
function q(e, t) {
  return e.getElementsByTagName && t.some(function(r) {
    return e.getElementsByTagName(r).length;
  });
}
var ie = [[/\\/g, "\\\\"], [/\*/g, "\\*"], [/^-/g, "\\-"], [/^\+ /g, "\\+ "], [/^(=+)/g, "\\$1"], [/^(#{1,6}) /g, "\\$1 "], [/`/g, "\\`"], [/^~~~/g, "\\~~~"], [/\[/g, "\\["], [/\]/g, "\\]"], [/^>/g, "\\>"], [/_/g, "\\_"], [/^(\d+)\. /g, "$1\\. "]];
function X(e) {
  return ie.reduce(function(t, r) {
    return t.replace(r[0], r[1]);
  }, e);
}
var u = {};
u.paragraph = { filter: "p", replacement: function(e) {
  return `

` + e + `

`;
} };
u.lineBreak = { filter: "br", replacement: function(e, t, r) {
  return r.br + `
`;
} };
u.heading = { filter: ["h1", "h2", "h3", "h4", "h5", "h6"], replacement: function(e, t, r) {
  var n = Number(t.nodeName.charAt(1));
  if (r.headingStyle === "setext" && n < 3) {
    var i = w(n === 1 ? "=" : "-", e.length);
    return `

` + e + `
` + i + `

`;
  } else return `

` + w("#", n) + " " + e + `

`;
} };
u.blockquote = { filter: "blockquote", replacement: function(e) {
  return e = _(e).replace(/^/gm, "> "), `

` + e + `

`;
} };
u.list = { filter: ["ul", "ol"], replacement: function(e, t) {
  var r = t.parentNode;
  return r.nodeName === "LI" && r.lastElementChild === t ? `
` + e : `

` + e + `

`;
} };
u.listItem = { filter: "li", replacement: function(e, t, r) {
  var n = r.bulletListMarker + "   ", i = t.parentNode;
  if (i.nodeName === "OL") {
    var a = i.getAttribute("start"), o = Array.prototype.indexOf.call(i.children, t);
    n = (a ? Number(a) + o : o + 1) + ".  ";
  }
  var s = /\n$/.test(e);
  return e = _(e) + (s ? `
` : ""), e = e.replace(/\n/gm, `
` + " ".repeat(n.length)), n + e + (t.nextSibling ? `
` : "");
} };
u.indentedCodeBlock = { filter: function(e, t) {
  return t.codeBlockStyle === "indented" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
}, replacement: function(e, t, r) {
  return `

    ` + t.firstChild.textContent.replace(/\n/g, `
    `) + `

`;
} };
u.fencedCodeBlock = { filter: function(e, t) {
  return t.codeBlockStyle === "fenced" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
}, replacement: function(e, t, r) {
  for (var n = t.firstChild.getAttribute("class") || "", i = (n.match(/language-(\S+)/) || [null, ""])[1], a = t.firstChild.textContent, o = r.fence.charAt(0), s = 3, l = new RegExp("^" + o + "{3,}", "gm"), f; f = l.exec(a); ) f[0].length >= s && (s = f[0].length + 1);
  var m = w(o, s);
  return `

` + m + i + `
` + a.replace(/\n$/, "") + `
` + m + `

`;
} };
u.horizontalRule = { filter: "hr", replacement: function(e, t, r) {
  return `

` + r.hr + `

`;
} };
u.inlineLink = { filter: function(e, t) {
  return t.linkStyle === "inlined" && e.nodeName === "A" && e.getAttribute("href");
}, replacement: function(e, t) {
  var r = D(t.getAttribute("href")), n = L(A(t.getAttribute("title"))), i = n ? ' "' + n + '"' : "";
  return "[" + e + "](" + r + i + ")";
} };
u.referenceLink = { filter: function(e, t) {
  return t.linkStyle === "referenced" && e.nodeName === "A" && e.getAttribute("href");
}, replacement: function(e, t, r) {
  var n = D(t.getAttribute("href")), i = A(t.getAttribute("title"));
  i && (i = ' "' + L(i) + '"');
  var a, o;
  switch (r.linkReferenceStyle) {
    case "collapsed":
      a = "[" + e + "][]", o = "[" + e + "]: " + n + i;
      break;
    case "shortcut":
      a = "[" + e + "]", o = "[" + e + "]: " + n + i;
      break;
    default:
      var s = this.references.length + 1;
      a = "[" + e + "][" + s + "]", o = "[" + s + "]: " + n + i;
  }
  return this.references.push(o), a;
}, references: [], append: function(e) {
  var t = "";
  return this.references.length && (t = `

` + this.references.join(`
`) + `

`, this.references = []), t;
} };
u.emphasis = { filter: ["em", "i"], replacement: function(e, t, r) {
  return e.trim() ? r.emDelimiter + e + r.emDelimiter : "";
} };
u.strong = { filter: ["strong", "b"], replacement: function(e, t, r) {
  return e.trim() ? r.strongDelimiter + e + r.strongDelimiter : "";
} };
u.code = { filter: function(e) {
  var t = e.previousSibling || e.nextSibling, r = e.parentNode.nodeName === "PRE" && !t;
  return e.nodeName === "CODE" && !r;
}, replacement: function(e) {
  if (!e) return "";
  e = e.replace(/\r?\n|\r/g, " ");
  for (var t = /^`|^ .*?[^ ].* $|`$/.test(e) ? " " : "", r = "`", n = e.match(/`+/gm) || []; n.indexOf(r) !== -1; ) r = r + "`";
  return r + t + e + t + r;
} };
u.image = { filter: "img", replacement: function(e, t) {
  var r = X(A(t.getAttribute("alt"))), n = D(t.getAttribute("src") || ""), i = A(t.getAttribute("title")), a = i ? ' "' + L(i) + '"' : "";
  return n ? "![" + r + "](" + n + a + ")" : "";
} };
function A(e) {
  return e ? e.replace(/(\n+\s*)+/g, `
`) : "";
}
function D(e) {
  var t = e.replace(/([<>()])/g, "\\$1");
  return t.indexOf(" ") >= 0 ? "<" + t + ">" : t;
}
function L(e) {
  return e.replace(/"/g, '\\"');
}
function K(e) {
  this.options = e, this._keep = [], this._remove = [], this.blankRule = { replacement: e.blankReplacement }, this.keepReplacement = e.keepReplacement, this.defaultRule = { replacement: e.defaultReplacement }, this.array = [];
  for (var t in e.rules) this.array.push(e.rules[t]);
}
K.prototype = { add: function(e, t) {
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
  return (t = k(this.array, e, this.options)) || (t = k(this._keep, e, this.options)) || (t = k(this._remove, e, this.options)) ? t : this.defaultRule;
}, forEach: function(e) {
  for (var t = 0; t < this.array.length; t++) e(this.array[t], t);
} };
function k(e, t, r) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    if (ae(i, t, r)) return i;
  }
}
function ae(e, t, r) {
  var n = e.filter;
  if (typeof n == "string") {
    if (n === t.nodeName.toLowerCase()) return true;
  } else if (Array.isArray(n)) {
    if (n.indexOf(t.nodeName.toLowerCase()) > -1) return true;
  } else if (typeof n == "function") {
    if (n.call(e, t, r)) return true;
  } else throw new TypeError("`filter` needs to be a string, array, or function");
}
function oe(e) {
  var t = e.element, r = e.isBlock, n = e.isVoid, i = e.isPre || function(N) {
    return N.nodeName === "PRE";
  };
  if (!(!t.firstChild || i(t))) {
    for (var a = null, o = false, s = null, l = x(s, t, i); l !== t; ) {
      if (l.nodeType === 3 || l.nodeType === 4) {
        var f = l.data.replace(/[ \r\n\t]+/g, " ");
        if ((!a || / $/.test(a.data)) && !o && f[0] === " " && (f = f.substr(1)), !f) {
          l = T(l);
          continue;
        }
        l.data = f, a = l;
      } else if (l.nodeType === 1) r(l) || l.nodeName === "BR" ? (a && (a.data = a.data.replace(/ $/, "")), a = null, o = false) : n(l) || i(l) ? (a = null, o = true) : a && (o = false);
      else {
        l = T(l);
        continue;
      }
      var m = x(s, l, i);
      s = l, l = m;
    }
    a && (a.data = a.data.replace(/ $/, ""), a.data || T(a));
  }
}
function T(e) {
  var t = e.nextSibling || e.parentNode;
  return e.parentNode.removeChild(e), t;
}
function x(e, t, r) {
  return e && e.parentNode === t || r(t) ? t.nextSibling || t.parentNode : t.firstChild || t.nextSibling || t.parentNode;
}
var P = typeof window < "u" ? window : {};
function le() {
  var e = P.DOMParser, t = false;
  try {
    new e().parseFromString("", "text/html") && (t = true);
  } catch {
  }
  return t;
}
function se() {
  var e = function() {
  };
  return ce() ? e.prototype.parseFromString = function(t) {
    var r = new window.ActiveXObject("htmlfile");
    return r.designMode = "on", r.open(), r.write(t), r.close(), r;
  } : e.prototype.parseFromString = function(t) {
    var r = document.implementation.createHTMLDocument("");
    return r.open(), r.write(t), r.close(), r;
  }, e;
}
function ce() {
  var e = false;
  try {
    document.implementation.createHTMLDocument("").open();
  } catch {
    P.ActiveXObject && (e = true);
  }
  return e;
}
var ue = le() ? P.DOMParser : se();
function fe(e, t) {
  var r;
  if (typeof e == "string") {
    var n = de().parseFromString('<x-turndown id="turndown-root">' + e + "</x-turndown>", "text/html");
    r = n.getElementById("turndown-root");
  } else r = e.cloneNode(true);
  return oe({ element: r, isBlock: S, isVoid: U, isPre: t.preformattedCode ? me : null }), r;
}
var R;
function de() {
  return R = R || new ue(), R;
}
function me(e) {
  return e.nodeName === "PRE" || e.nodeName === "CODE";
}
function pe(e, t) {
  return e.isBlock = S(e), e.isCode = e.nodeName === "CODE" || e.parentNode.isCode, e.isBlank = he(e), e.flankingWhitespace = ge(e, t), e;
}
function he(e) {
  return !U(e) && !re(e) && /^\s*$/i.test(e.textContent) && !te(e) && !ne(e);
}
function ge(e, t) {
  if (e.isBlock || t.preformattedCode && e.isCode) return { leading: "", trailing: "" };
  var r = ve(e.textContent);
  return r.leadingAscii && I("left", e, t) && (r.leading = r.leadingNonAscii), r.trailingAscii && I("right", e, t) && (r.trailing = r.trailingNonAscii), { leading: r.leading, trailing: r.trailing };
}
function ve(e) {
  var t = e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
  return { leading: t[1], leadingAscii: t[2], leadingNonAscii: t[3], trailing: t[4], trailingNonAscii: t[5], trailingAscii: t[6] };
}
function I(e, t, r) {
  var n, i, a;
  return e === "left" ? (n = t.previousSibling, i = / $/) : (n = t.nextSibling, i = /^ /), n && (n.nodeType === 3 ? a = i.test(n.nodeValue) : r.preformattedCode && n.nodeName === "CODE" ? a = false : n.nodeType === 1 && !S(n) && (a = i.test(n.textContent))), a;
}
var Ae = Array.prototype.reduce;
function E(e) {
  if (!(this instanceof E)) return new E(e);
  var t = { rules: u, headingStyle: "setext", hr: "* * *", bulletListMarker: "*", codeBlockStyle: "indented", fence: "```", emDelimiter: "_", strongDelimiter: "**", linkStyle: "inlined", linkReferenceStyle: "full", br: "  ", preformattedCode: false, blankReplacement: function(r, n) {
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
  this.options = Z({}, t, e), this.rules = new K(this.options);
}
E.prototype = { turndown: function(e) {
  if (!ye(e)) throw new TypeError(e + " is not a string, or an element/document/fragment node.");
  if (e === "") return "";
  var t = G.call(this, new fe(e, this.options));
  return Ee.call(this, t);
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
  return X(e);
} };
function G(e) {
  var t = this;
  return Ae.call(e.childNodes, function(r, n) {
    n = new pe(n, t.options);
    var i = "";
    return n.nodeType === 3 ? i = n.isCode ? n.nodeValue : t.escape(n.nodeValue) : n.nodeType === 1 && (i = be.call(t, n)), j(r, i);
  }, "");
}
function Ee(e) {
  var t = this;
  return this.rules.forEach(function(r) {
    typeof r.append == "function" && (e = j(e, r.append(t.options)));
  }), e.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
}
function be(e) {
  var t = this.rules.forNode(e), r = G.call(this, e), n = e.flankingWhitespace;
  return (n.leading || n.trailing) && (r = r.trim()), n.leading + t.replacement(r, e, this.options) + n.trailing;
}
function j(e, t) {
  var r = F(e), n = H(t), i = Math.max(e.length - r.length, t.length - n.length), a = `

`.substring(0, i);
  return r + a + n;
}
function ye(e) {
  return e != null && (typeof e == "string" || e.nodeType && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11));
}
const b = "data-mirror-edit", p = "data-mirror-edit-active", Ne = "a, button, input, textarea, select, label, .md-editor-code-action, [data-transform-handle], table, .md-editor-mermaid, .md-editor-katex, .md-editor-code, pre, [data-note-cover]";
function Pe(e) {
  return e instanceof Element ? !!(e.closest(`[${p}]`) || e.closest(`[${b}]`)) : false;
}
function Be(e) {
  return !!(e == null ? void 0 : e.querySelector(`[${p}]`));
}
function Me(e) {
  var _a, _b;
  return e ? !!((_b = (e instanceof Element && e.classList.contains("md-editor") ? e : null) || ((_a = e.querySelector) == null ? void 0 : _a.call(e, ".md-editor")) || (e instanceof Element ? e.closest(".md-editor") : null)) == null ? void 0 : _b.classList.contains("md-editor-previewOnly")) : false;
}
function ke(e) {
  const t = e.match(/^(.*?)(\n*)$/s);
  return { body: (t == null ? void 0 : t[1]) ?? e, trailing: (t == null ? void 0 : t[2]) ?? "" };
}
function Te(e) {
  var _a;
  const t = [/^(#{1,6}[ \t]+)/, /^([ \t]*[-*+][ \t]+\[[ xX~]\][ \t]+)/, /^([ \t]*[-*+][ \t]+)/, /^([ \t]*\d+\.[ \t]+)/, /^(>[ \t]?)/];
  for (const r of t) {
    const i = (_a = e.match(r)) == null ? void 0 : _a[1];
    if (i) return { prefix: i, content: e.slice(i.length) };
  }
  return { prefix: "", content: e };
}
function Re(e) {
  return e instanceof Element ? e.closest(`[${p}]`) ? false : !!e.closest(Ne) : true;
}
const y = new E({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-", emDelimiter: "*", strongDelimiter: "**" });
y.keep(["u", "sub", "sup"]);
y.addRule("wikiImageData", { filter: (e) => {
  var _a;
  return e.nodeName !== "IMG" ? false : !!((_a = e.getAttribute) == null ? void 0 : _a.call(e, "data-wiki-path"));
}, replacement: (e, t) => {
  const r = t;
  return J({ path: r.getAttribute("data-wiki-path"), width: r.getAttribute("data-wiki-width"), height: r.getAttribute("data-wiki-height"), background: r.getAttribute("data-wiki-bg") });
} });
y.addRule("deepHeading", { filter: (e) => {
  var _a;
  if (!(e == null ? void 0 : e.nodeName)) return false;
  const t = Number((_a = e.getAttribute) == null ? void 0 : _a.call(e, "data-heading-level"));
  return !!(Number.isInteger(t) && t >= 7);
}, replacement: (e, t) => {
  var _a;
  const r = Number((_a = t.getAttribute) == null ? void 0 : _a.call(t, "data-heading-level")), n = Number.isInteger(r) && r >= 1 ? r : 6;
  return `${"#".repeat(n)} ${e.trim()}`;
} });
function we(e, t) {
  let r = e.trim();
  return t && (/^#{1,6}[ \t]+/.test(t) ? r = r.replace(/^#{1,6}[ \t]+/, "") : /\[[ xX~]\]/.test(t) ? r = r.replace(/^([-*+]|\d+\.)[ \t]+\[[ xX~]\][ \t]+/, "") : /^([ \t]*[-*+][ \t]+)/.test(t) || /^([ \t]*\d+\.[ \t]+)/.test(t) ? r = r.replace(/^([-*+]|\d+\.)[ \t]+/, "") : /^>[ \t]?/.test(t) && (r = r.replace(/^(>[ \t]?)+/gm, "").trim())), r;
}
function Se(e, t) {
  if (!/\[[ xX~]\]/.test(e)) return e;
  const r = t.querySelector('input[type="checkbox"]');
  if (!(r instanceof HTMLInputElement)) return e;
  const n = r.getAttribute("data-status");
  let i = " ";
  return n === "doing" || r.indeterminate ? i = "~" : n === "done" || r.checked ? i = "x" : n === "todo" ? i = " " : i = r.checked ? "x" : " ", e.replace(/\[[ xX~]\]/, `[${i}]`);
}
function Ce(e, t) {
  const { prefix: r } = Te(t), n = e.cloneNode(true);
  n.removeAttribute(p), n.removeAttribute(b), n.removeAttribute("contenteditable"), n.removeAttribute("spellcheck");
  const i = Se(r, n);
  n.querySelectorAll('input[type="checkbox"]').forEach((m) => m.remove()), n.querySelectorAll(".md-preview-heading-fold-chevron, .md-heading-fold, .md-editor-code-action, [data-transform-handle], button").forEach((m) => m.remove());
  const a = e.tagName.toLowerCase(), s = /^h[1-6]$/.test(a) || a === "p" || a === "li" || a === "blockquote" || a === "td" || a === "th" ? n.innerHTML : n.outerHTML;
  let l = y.turndown(s || "");
  l = l.replace(/^\n+|\n+$/g, ""), l = we(l, i);
  const f = Number(e.getAttribute("data-heading-level"));
  return Number.isInteger(f) && f >= 7 ? `${"#".repeat(f)} ${l.replace(/^#{1,6}[ \t]+/, "").trim()}` : i ? `${i}${l}` : l;
}
let d = null;
function g(e) {
  const t = d;
  d = null, t && (t.cleanup(), t.block.isConnected && (t.block.removeAttribute(p), t.block.removeAttribute(b), t.block.removeAttribute("contenteditable"), t.block.removeAttribute("spellcheck"), e && (t.block.innerHTML = t.snapshotHtml)));
}
function h(e) {
  const t = d;
  if (!t) return;
  const n = `${Ce(t.block, t.snapshotBody)}${t.trailing}`, { from: i, to: a } = t, o = e.state.doc.sliceString(i, a);
  if (n === o) {
    g(true);
    return;
  }
  g(false), e.dispatch({ changes: { from: i, to: a, insert: n }, selection: { anchor: i + n.length } });
}
function $(e, t, r) {
  var _a;
  const n = (_a = window.getSelection) == null ? void 0 : _a.call(window);
  if (!n) return;
  try {
    const a = document;
    if (typeof a.caretRangeFromPoint == "function") {
      const o = a.caretRangeFromPoint(t, r);
      if (o && e.contains(o.startContainer)) {
        n.removeAllRanges(), n.addRange(o);
        return;
      }
    }
    if (typeof a.caretPositionFromPoint == "function") {
      const o = a.caretPositionFromPoint(t, r);
      if ((o == null ? void 0 : o.offsetNode) && e.contains(o.offsetNode)) {
        const s = document.createRange();
        s.setStart(o.offsetNode, o.offset), s.collapse(true), n.removeAllRanges(), n.addRange(s);
        return;
      }
    }
  } catch {
  }
  const i = document.createRange();
  i.selectNodeContents(e), i.collapse(false), n.removeAllRanges(), n.addRange(i);
}
function z(e, t, r, n, i) {
  if (d) {
    if (d.block === e) return $(e, n, i), true;
    h(t);
  }
  const a = Number(e.getAttribute("data-line"));
  if (!Number.isFinite(a)) return false;
  const { from: o, to: s } = Q(t, r, a, a), l = t.state.doc.sliceString(o, s);
  if (!l && o === s) return false;
  const { body: f, trailing: m } = ke(l), N = e.innerHTML;
  e.setAttribute(p, "1"), e.setAttribute(b, "1"), e.setAttribute("contenteditable", "true"), e.setAttribute("spellcheck", "true"), e.setAttribute("aria-label", "Mirror Edit"), e.querySelectorAll(".md-preview-heading-fold-chevron, button").forEach((c) => {
    c instanceof HTMLElement && (c.contentEditable = "false");
  });
  const B = (c) => {
    if (c.key === "Escape") {
      c.preventDefault(), c.stopPropagation(), g(true);
      return;
    }
    if (c.key === "Enter" && (c.metaKey || c.ctrlKey)) {
      c.preventDefault(), c.stopPropagation(), h(t);
      return;
    }
    const v = e.tagName.toLowerCase();
    c.key === "Enter" && !c.shiftKey && /^h[1-6]$/.test(v) && (c.preventDefault(), c.stopPropagation(), h(t));
  }, M = (c) => {
    var _a;
    const v = (_a = c.clipboardData) == null ? void 0 : _a.getData("text/plain");
    v != null && (c.preventDefault(), document.execCommand("insertText", false, v));
  }, O = () => {
    window.setTimeout(() => {
      (d == null ? void 0 : d.block) === e && (e.contains(document.activeElement) || h(t));
    }, 0);
  };
  return e.addEventListener("keydown", B), e.addEventListener("paste", M), e.addEventListener("blur", O), d = { block: e, snapshotHtml: N, snapshotBody: f, from: o, to: s, trailing: m, cleanup: () => {
    e.removeEventListener("keydown", B), e.removeEventListener("paste", M), e.removeEventListener("blur", O);
  } }, requestAnimationFrame(() => {
    e.focus(), $(e, n, i);
  }), true;
}
function Oe(e, t) {
  const r = (n) => {
    if (!t.isEnabled() || Re(n.target)) return;
    const i = t.getPreviewRoot();
    if (!i || !(n.target instanceof Node) || !i.contains(n.target)) return;
    const a = Y(n.target, i);
    if (!a) return;
    const o = t.getView();
    o && (n.preventDefault(), n.stopPropagation(), z(a, o, i, n.clientX, n.clientY));
  };
  return e.addEventListener("dblclick", r, true), () => {
    e.removeEventListener("dblclick", r, true), d && g(true);
  };
}
function xe() {
  g(true);
}
function Ie(e) {
  return !e || !d ? false : (h(e), true);
}
function $e(e, t, r, n, i) {
  return z(e, t, r, n, i);
}
function He() {
  d && (d.block.isConnected || (d.cleanup(), d = null));
}
export {
  Be as a,
  Oe as b,
  xe as c,
  He as d,
  Pe as e,
  $e as f,
  Ie as g,
  Me as i
};
