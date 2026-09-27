let O = class Dn extends Error {
  constructor(e, t) {
    var a = "KaTeX parse error: " + e, n, i, s = t && t.loc;
    if (s && s.start <= s.end) {
      var l = s.lexer.input;
      n = s.start, i = s.end, n === l.length ? a += " at end of input: " : a += " at position " + (n + 1) + ": ";
      var h = l.slice(n, i).replace(/[^]/g, "$&\u0332"), d;
      n > 15 ? d = "\u2026" + l.slice(n - 15, n) : d = l.slice(0, n);
      var f;
      i + 15 < l.length ? f = l.slice(i, i + 15) + "\u2026" : f = l.slice(i), a += d + h + f;
    }
    super(a), this.name = "ParseError", this.position = void 0, this.length = void 0, this.rawMessage = void 0, Object.setPrototypeOf(this, Dn.prototype), this.position = n, n != null && i != null && (this.length = i - n), this.rawMessage = e;
  }
};
var Rs = /([A-Z])/g, Is = (r) => r.replace(Rs, "-$1").toLowerCase(), Fs = { "&": "&amp;", ">": "&gt;", "<": "&lt;", '"': "&quot;", "'": "&#x27;" }, Os = /[&><"']/g, U0 = (r) => String(r).replace(Os, (e) => Fs[e]), kr = (r) => r.type === "ordgroup" || r.type === "color" ? r.body.length === 1 ? kr(r.body[0]) : r : r.type === "font" ? kr(r.body) : r, $s = /* @__PURE__ */ new Set(["mathord", "textord", "atom"]), Ge = (r) => $s.has(kr(r).type), Hs = (r) => {
  var e = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(r);
  return e ? e[2] !== ":" || !/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(e[1]) ? null : e[1].toLowerCase() : "_relative";
}, Mr = { displayMode: { type: "boolean", description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.", cli: "-d, --display-mode" }, output: { type: { enum: ["htmlAndMathml", "html", "mathml"] }, description: "Determines the markup language of the output.", cli: "-F, --format <type>" }, leqno: { type: "boolean", description: "Render display math in leqno style (left-justified tags)." }, fleqn: { type: "boolean", description: "Render display math flush left." }, throwOnError: { type: "boolean", default: true, cli: "-t, --no-throw-on-error", cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error." }, errorColor: { type: "string", default: "#cc0000", cli: "-c, --error-color <color>", cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.", cliProcessor: (r) => "#" + r }, macros: { type: "object", cli: "-m, --macro <def>", cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).", cliDefault: [], cliProcessor: (r, e) => (e.push(r), e) }, minRuleThickness: { type: "number", description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.", processor: (r) => Math.max(0, r), cli: "--min-rule-thickness <size>", cliProcessor: parseFloat }, colorIsTextColor: { type: "boolean", description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.", cli: "-b, --color-is-text-color" }, strict: { type: [{ enum: ["warn", "ignore", "error"] }, "boolean", "function"], description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.", cli: "-S, --strict", cliDefault: false }, trust: { type: ["boolean", "function"], description: "Trust the input, enabling all HTML features such as \\url.", cli: "-T, --trust" }, maxSize: { type: "number", default: 1 / 0, description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large", processor: (r) => Math.max(0, r), cli: "-s, --max-size <n>", cliProcessor: parseInt }, maxExpand: { type: "number", default: 1e3, description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.", processor: (r) => Math.max(0, r), cli: "-e, --max-expand <n>", cliProcessor: (r) => r === "Infinity" ? 1 / 0 : parseInt(r) }, globalGroup: { type: "boolean", cli: false } };
function Ls(r) {
  if (typeof r != "string") return r.enum[0];
  switch (r) {
    case "boolean":
      return false;
    case "string":
      return "";
    case "number":
      return 0;
    case "object":
      return {};
    default:
      throw new Error("Unexpected schema type; settings must declare an explicit default.");
  }
}
function Ps(r) {
  if (Object.prototype.hasOwnProperty.call(r, "default") && r.default !== void 0) return r.default;
  var e = Array.isArray(r.type) ? r.type[0] : r.type;
  return Ls(e);
}
function Gs(r, e, t, a) {
  var n = Object.prototype.hasOwnProperty.call(t, e) ? t[e] : void 0, i = Object.prototype.hasOwnProperty.call(a, "processor") ? a.processor : void 0;
  r[e] = n !== void 0 ? i ? i(n) : n : Ps(a);
}
let Ta = class {
  constructor(e) {
    e === void 0 && (e = {}), this.displayMode = void 0, this.output = void 0, this.leqno = void 0, this.fleqn = void 0, this.throwOnError = void 0, this.errorColor = void 0, this.macros = void 0, this.minRuleThickness = void 0, this.colorIsTextColor = void 0, this.strict = void 0, this.trust = void 0, this.maxSize = void 0, this.maxExpand = void 0, this.globalGroup = void 0, e = e || {};
    for (var t of Object.keys(Mr)) {
      var a = Mr[t];
      a && Gs(this, t, e, a);
    }
  }
  reportNonstrict(e, t, a) {
    var n = this.strict;
    if (typeof n == "function" && (n = n(e, t, a)), !(!n || n === "ignore")) {
      if (n === true || n === "error") throw new O("LaTeX-incompatible input and strict mode is set to 'error': " + (t + " [" + e + "]"), a);
      n === "warn" ? typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (t + " [" + e + "]")) : typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + n + "': " + t + " [" + e + "]"));
    }
  }
  useStrictBehavior(e, t, a) {
    var n = this.strict;
    if (typeof n == "function") try {
      n = n(e, t, a);
    } catch {
      n = "error";
    }
    return !n || n === "ignore" ? false : n === true || n === "error" ? true : n === "warn" ? (typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (t + " [" + e + "]")), false) : (typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + n + "': " + t + " [" + e + "]")), false);
  }
  isTrusted(e) {
    if ("url" in e && e.url && !e.protocol) {
      var t = Hs(e.url);
      if (t == null) return false;
      e.protocol = t;
    }
    var a = typeof this.trust == "function" ? this.trust(e) : this.trust;
    return !!a;
  }
}, je = class {
  constructor(e, t, a) {
    this.id = void 0, this.size = void 0, this.cramped = void 0, this.id = e, this.size = t, this.cramped = a;
  }
  sup() {
    return ye[Us[this.id]];
  }
  sub() {
    return ye[Vs[this.id]];
  }
  fracNum() {
    return ye[Xs[this.id]];
  }
  fracDen() {
    return ye[Ys[this.id]];
  }
  cramp() {
    return ye[Ws[this.id]];
  }
  text() {
    return ye[js[this.id]];
  }
  isTight() {
    return this.size >= 2;
  }
};
var Ba = 0, Tr = 1, St = 2, $e = 3, Jt = 4, de = 5, At = 6, K0 = 7, ye = [new je(Ba, 0, false), new je(Tr, 0, true), new je(St, 1, false), new je($e, 1, true), new je(Jt, 2, false), new je(de, 2, true), new je(At, 3, false), new je(K0, 3, true)], Us = [Jt, de, Jt, de, At, K0, At, K0], Vs = [de, de, de, de, K0, K0, K0, K0], Xs = [St, $e, Jt, de, At, K0, At, K0], Ys = [$e, $e, de, de, K0, K0, K0, K0], Ws = [Tr, Tr, $e, $e, de, de, K0, K0], js = [Ba, Tr, St, $e, St, $e, St, $e], n0 = { DISPLAY: ye[Ba], TEXT: ye[St], SCRIPT: ye[Jt], SCRIPTSCRIPT: ye[At] }, X1 = [{ name: "latin", blocks: [[256, 591], [768, 879]] }, { name: "cyrillic", blocks: [[1024, 1279]] }, { name: "armenian", blocks: [[1328, 1423]] }, { name: "brahmic", blocks: [[2304, 4255]] }, { name: "georgian", blocks: [[4256, 4351]] }, { name: "cjk", blocks: [[12288, 12543], [19968, 40879], [65280, 65376]] }, { name: "hangul", blocks: [[44032, 55215]] }];
function Zs(r) {
  for (var e = 0; e < X1.length; e++) for (var t = X1[e], a = 0; a < t.blocks.length; a++) {
    var n = t.blocks[a];
    if (r >= n[0] && r <= n[1]) return t.name;
  }
  return null;
}
var Sr = [];
X1.forEach((r) => r.blocks.forEach((e) => Sr.push(...e)));
function qn(r) {
  for (var e = 0; e < Sr.length; e += 2) if (r >= Sr[e] && r <= Sr[e + 1]) return true;
  return false;
}
var F0 = (r) => r + " " + r, wt = 80, Ks = function(e, t) {
  return "M95," + (622 + e + t) + `
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l` + e / 2.075 + " -" + e + `
c5.3,-9.3,12,-14,20,-14
H400000v` + (40 + e) + `H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M` + (834 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, Js = function(e, t) {
  return "M263," + (601 + e + t) + `c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l` + e / 2.084 + " -" + e + `
c4.7,-7.3,11,-11,19,-11
H40000v` + (40 + e) + `H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, Qs = function(e, t) {
  return "M983 " + (10 + e + t) + `
l` + e / 3.13 + " -" + e + `
c4,-6.7,10,-10,18,-10 H400000v` + (40 + e) + `
H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7
s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744
c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30
c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722
c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5
c53.7,-170.3,84.5,-266.8,92.5,-289.5z
M` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, _s = function(e, t) {
  return "M424," + (2398 + e + t) + `
c-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514
c0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20
s-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121
s209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081
l` + e / 4.223 + " -" + e + `c4,-6.7,10,-10,18,-10 H400000
v` + (40 + e) + `H1014.6
s-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185
c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2z M` + (1001 + e) + " " + t + `
h400000v` + (40 + e) + "h-400000z";
}, el = function(e, t) {
  return "M473," + (2713 + e + t) + `
c339.3,-1799.3,509.3,-2700,510,-2702 l` + e / 5.298 + " -" + e + `
c3.3,-7.3,9.3,-11,18,-11 H400000v` + (40 + e) + `H1017.7
s-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200
c0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26
s76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,
606zM` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "H1017.7z";
}, tl = function(e) {
  var t = e / 2;
  return "M400000 " + e + " H0 L" + t + " 0 l65 45 L145 " + (e - 80) + " H400000z";
}, rl = function(e, t, a) {
  var n = a - 54 - t - e;
  return "M702 " + (e + t) + "H400000" + (40 + e) + `
H742v` + n + `l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1
h-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170
c-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667
219 661 l218 661zM702 ` + t + "H400000v" + (40 + e) + "H742z";
}, al = function(e, t, a) {
  t = 1e3 * t;
  var n = "";
  switch (e) {
    case "sqrtMain":
      n = Ks(t, wt);
      break;
    case "sqrtSize1":
      n = Js(t, wt);
      break;
    case "sqrtSize2":
      n = Qs(t, wt);
      break;
    case "sqrtSize3":
      n = _s(t, wt);
      break;
    case "sqrtSize4":
      n = el(t, wt);
      break;
    case "sqrtTall":
      n = rl(t, wt, a);
  }
  return n;
}, nl = function(e, t) {
  switch (e) {
    case "\u239C":
      return F0("M291 0 H417 V" + t + " H291z");
    case "\u2223":
      return F0("M145 0 H188 V" + t + " H145z");
    case "\u2225":
      return F0("M145 0 H188 V" + t + " H145z") + F0("M367 0 H410 V" + t + " H367z");
    case "\u239F":
      return F0("M457 0 H583 V" + t + " H457z");
    case "\u23A2":
      return F0("M319 0 H403 V" + t + " H319z");
    case "\u23A5":
      return F0("M263 0 H347 V" + t + " H263z");
    case "\u23AA":
      return F0("M384 0 H504 V" + t + " H384z");
    case "\u23D0":
      return F0("M312 0 H355 V" + t + " H312z");
    case "\u2016":
      return F0("M257 0 H300 V" + t + " H257z") + F0("M478 0 H521 V" + t + " H478z");
    default:
      return "";
  }
}, i4 = { doubleleftarrow: `M262 157
l10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3
 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28
 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5
c2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5
 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87
-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7
-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z
m8 0v40h399730v-40zm0 194v40h399730v-40z`, doublerightarrow: `M399738 392l
-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5
 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88
-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68
-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18
-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782
c-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3
-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z`, leftarrow: `M400000 241H110l3-3c68.7-52.7 113.7-120
 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8
-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247
c-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208
 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3
 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202
 l-3-3h399890zM100 241v40h399900v-40z`, leftbrace: `M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117
-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7
 5-6 9-10 13-.7 1-7.3 1-20 1H6z`, leftbraceunder: `M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13
 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688
 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7
-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z`, leftgroup: `M400000 80
H435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0
 435 0h399565z`, leftgroupunder: `M400000 262
H435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219
 435 219h399565z`, leftharpoon: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3
-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5
-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7
-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z`, leftharpoonplus: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5
 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3
-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7
-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z
m0 0v40h400000v-40z`, leftharpoondown: `M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333
 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5
 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667
-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z`, leftharpoondownplus: `M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12
 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7
-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0
v40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z`, lefthook: `M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5
-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3
-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21
 71.5 23h399859zM103 281v-40h399897v40z`, leftlinesegment: F0("M40 281 V428 H0 V94 H40 V241 H400000 v40z"), leftbracketunder: F0("M0 0 h120 V290 H399995 v120 H0z"), leftbracketover: F0("M0 440 h120 V150 H399995 v-120 H0z"), leftmapsto: F0("M40 281 V448H0V74H40V241H400000v40z"), leftToFrom: `M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23
-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8
c28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3
 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z`, longequal: F0("M0 50 h400000 v40H0z m0 194h40000v40H0z"), midbrace: `M200428 334
c-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14
-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7
 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11
 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z`, midbraceunder: `M199572 214
c100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14
 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3
 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0
-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z`, oiintSize1: `M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6
-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z
m368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8
60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z`, oiintSize2: `M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8
-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z
m502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2
c0 110 84 276 504 276s502.4-166 502.4-276z`, oiiintSize1: `M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6
-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z
m525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0
85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z`, oiiintSize2: `M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8
-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z
m770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1
c0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z`, rightarrow: `M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z`, rightbrace: `M400000 542l
-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5
s-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1
c124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z`, rightbraceunder: `M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3
 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237
-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z`, rightgroup: `M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0
 3-1 3-3v-38c-76-158-257-219-435-219H0z`, rightgroupunder: `M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18
 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z`, rightharpoon: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3
-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2
-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58
 69.2 92 94.5zm0 0v40h399900v-40z`, rightharpoonplus: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11
-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7
 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z
m0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z`, rightharpoondown: `M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8
 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5
-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95
-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z`, rightharpoondownplus: `M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8
 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3
 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3
-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z
m0-194v40h400000v-40zm0 0v40h400000v-40z`, righthook: `M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3
 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0
-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21
 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z`, rightlinesegment: F0("M399960 241 V94 h40 V428 h-40 V281 H0 v-40z"), rightbracketunder: F0("M399995 0 h-120 V290 H0 v120 H400000z"), rightbracketover: F0("M399995 440 h-120 V150 H0 v-120 H399995z"), rightToFrom: `M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23
 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32
-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142
-167z M100 147v40h399900v-40zM0 341v40h399900v-40z`, twoheadleftarrow: `M0 167c68 40
 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69
-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3
-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19
-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101
 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z`, twoheadrightarrow: `M400000 167
c-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3
 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42
 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333
-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70
 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z`, tilde1: `M200 55.538c-77 0-168 73.953-177 73.953-3 0-7
-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0
 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0
 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128
-68.267.847-113-73.952-191-73.952z`, tilde2: `M344 55.266c-142 0-300.638 81.316-311.5 86.418
-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9
 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114
c1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751
 181.476 676 181.476c-149 0-189-126.21-332-126.21z`, tilde3: `M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457
-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0
 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697
 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696
 -338 0-409-156.573-744-156.573z`, tilde4: `M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345
-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409
 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9
 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409
 -175.236-744-175.236z`, vec: `M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z`, widehat1: `M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22
c-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z`, widehat2: `M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`, widehat3: `M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`, widehat4: `M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`, widecheck1: `M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,
-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z`, widecheck2: `M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`, widecheck3: `M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`, widecheck4: `M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`, baraboveleftarrow: `M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202
c4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5
c-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130
s-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47
121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6
s2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11
c0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z
M100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z`, rightarrowabovebar: `M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32
-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0
13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39
-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5
-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z`, baraboveshortleftharpoon: `M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17
c2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21
c-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40
c-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z
M0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z`, rightharpoonaboveshortbar: `M0,241 l0,40c399126,0,399993,0,399993,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z`, shortbaraboveleftharpoon: `M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,
1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,
-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z
M93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z`, shortrightharpoonabovebar: `M53,241l0,40c398570,0,399437,0,399437,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z` }, il = function(e, t) {
  switch (e) {
    case "lbrack":
      return "M403 1759 V84 H666 V0 H319 V1759 v" + t + ` v1759 v84 h347 v-84
H403z M403 1759 V0 H319 V1759 v` + t + " v1759 v84 h84z";
    case "rbrack":
      return "M347 1759 V0 H0 V84 H263 V1759 v" + t + ` v1759 H0 v84 H347z
M347 1759 V0 H263 V1759 v` + t + " v1759 h84z";
    case "vert":
      return "M145 15 v585 v" + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` + t + " v585 h43z";
    case "doublevert":
      return "M145 15 v585 v" + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` + t + ` v585 h43z
M367 15 v585 v` + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M410 15 H367 v585 v` + t + " v585 h43z";
    case "lfloor":
      return "M319 602 V0 H403 V602 v" + t + ` v1715 h263 v84 H319z
MM319 602 V0 H403 V602 v` + t + " v1715 H319z";
    case "rfloor":
      return "M319 602 V0 H403 V602 v" + t + ` v1799 H0 v-84 H319z
MM319 602 V0 H403 V602 v` + t + " v1715 H319z";
    case "lceil":
      return "M403 1759 V84 H666 V0 H319 V1759 v" + t + ` v602 h84z
M403 1759 V0 H319 V1759 v` + t + " v602 h84z";
    case "rceil":
      return "M347 1759 V0 H0 V84 H263 V1759 v" + t + ` v602 h84z
M347 1759 V0 h-84 V1759 v` + t + " v602 h84z";
    case "lparen":
      return `M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1
c-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,
-36,557 l0,` + (t + 84) + `c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,
949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9
c0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,
-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189
l0,-` + (t + 92) + `c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,
-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z`;
    case "rparen":
      return `M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,
63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5
c11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0,` + (t + 9) + `
c-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664
c-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11
c0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17
c242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558
l0,-` + (t + 144) + `c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,
-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z`;
    default:
      throw new Error("Unknown stretchy delimiter.");
  }
};
function sl(r) {
  return "toText" in r;
}
let qt = class {
  constructor(e) {
    this.children = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.children = e, this.classes = [], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = {};
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    for (var e = document.createDocumentFragment(), t = 0; t < this.children.length; t++) e.appendChild(this.children[t].toNode());
    return e;
  }
  toMarkup() {
    for (var e = "", t = 0; t < this.children.length; t++) e += this.children[t].toMarkup();
    return e;
  }
  toText() {
    return this.children.map((e) => {
      if (sl(e)) return e.toText();
      throw new Error("Expected MathDomNode with toText, got " + e.constructor.name);
    }).join("");
  }
};
var Y1 = { pt: 1, mm: 7227 / 2540, cm: 7227 / 254, in: 72.27, bp: 803 / 800, pc: 12, dd: 1238 / 1157, cc: 14856 / 1157, nd: 685 / 642, nc: 1370 / 107, sp: 1 / 65536, px: 803 / 800 }, ll = { ex: true, em: true, mu: true }, En = function(e) {
  return typeof e != "string" && (e = e.unit), e in Y1 || e in ll || e === "ex";
}, A0 = function(e, t) {
  var a;
  if (e.unit in Y1) a = Y1[e.unit] / t.fontMetrics().ptPerEm / t.sizeMultiplier;
  else if (e.unit === "mu") a = t.fontMetrics().cssEmPerMu;
  else {
    var n;
    if (t.style.isTight() ? n = t.havingStyle(t.style.text()) : n = t, e.unit === "ex") a = n.fontMetrics().xHeight;
    else if (e.unit === "em") a = n.fontMetrics().quad;
    else throw new O("Invalid unit: '" + e.unit + "'");
    n !== t && (a *= n.sizeMultiplier / t.sizeMultiplier);
  }
  return Math.min(e.number * a, t.maxSize);
}, G = function(e) {
  return +e.toFixed(4) + "em";
}, et = function(e) {
  return e.filter((t) => t).join(" ");
}, Ca = function(e) {
  var t = "";
  for (var a of Object.keys(e)) {
    var n = e[a];
    n !== void 0 && (t += Is(a) + ":" + n + ";");
  }
  return t;
}, Nn = function(e, t, a) {
  if (this.classes = e || [], this.attributes = {}, this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = a || {}, t) {
    t.style.isTight() && this.classes.push("mtight");
    var n = t.getColor();
    n && (this.style.color = n);
  }
}, Rn = function(e) {
  var t = document.createElement(e);
  t.className = et(this.classes), Object.assign(t.style, this.style);
  for (var a of Object.keys(this.attributes)) t.setAttribute(a, this.attributes[a]);
  for (var n = 0; n < this.children.length; n++) t.appendChild(this.children[n].toNode());
  return t;
}, ul = /[\s"'>/=\x00-\x1f]/, In = function(e) {
  var t = "<" + e;
  this.classes.length && (t += ' class="' + U0(et(this.classes)) + '"');
  var a = Ca(this.style);
  a && (t += ' style="' + U0(a) + '"');
  for (var n of Object.keys(this.attributes)) {
    if (ul.test(n)) throw new O("Invalid attribute name '" + n + "'");
    t += " " + n + '="' + U0(this.attributes[n]) + '"';
  }
  t += ">";
  for (var i = 0; i < this.children.length; i++) t += this.children[i].toMarkup();
  return t += "</" + e + ">", t;
};
let Et = class {
  constructor(e, t, a, n) {
    this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.width = void 0, this.maxFontSize = void 0, this.style = void 0, this.italic = void 0, Nn.call(this, e, a, n), this.children = t || [];
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    return Rn.call(this, "span");
  }
  toMarkup() {
    return In.call(this, "span");
  }
}, Ir = class {
  constructor(e, t, a, n) {
    this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, Nn.call(this, t, n), this.children = a || [], this.setAttribute("href", e);
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    return Rn.call(this, "a");
  }
  toMarkup() {
    return In.call(this, "a");
  }
}, ol = class {
  constructor(e, t, a) {
    this.src = void 0, this.alt = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.alt = t, this.src = e, this.classes = ["mord"], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = a;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    var e = document.createElement("img");
    return e.src = this.src, e.alt = this.alt, e.className = "mord", Object.assign(e.style, this.style), e;
  }
  toMarkup() {
    var e = '<img src="' + U0(this.src) + '"' + (' alt="' + U0(this.alt) + '"'), t = Ca(this.style);
    return t && (e += ' style="' + U0(t) + '"'), e += "'/>", e;
  }
};
var hl = { \u00EE: "\u0131\u0302", \u00EF: "\u0131\u0308", \u00ED: "\u0131\u0301", \u00EC: "\u0131\u0300" };
let se = class {
  constructor(e, t, a, n, i, s, l, h) {
    this.text = void 0, this.height = void 0, this.depth = void 0, this.italic = void 0, this.skew = void 0, this.width = void 0, this.maxFontSize = void 0, this.classes = void 0, this.style = void 0, this.text = e, this.height = t || 0, this.depth = a || 0, this.italic = n || 0, this.skew = i || 0, this.width = s || 0, this.classes = l || [], this.style = h || {}, this.maxFontSize = 0;
    var d = Zs(this.text.charCodeAt(0));
    d && this.classes.push(d + "_fallback"), /[îïíì]/.test(this.text) && (this.text = hl[this.text]);
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    var e = document.createTextNode(this.text), t = null;
    return this.italic > 0 && (t = document.createElement("span"), t.style.marginRight = G(this.italic)), this.classes.length > 0 && (t = t || document.createElement("span"), t.className = et(this.classes)), Object.keys(this.style).length > 0 && (t = t || document.createElement("span"), Object.assign(t.style, this.style)), t ? (t.appendChild(e), t) : e;
  }
  toMarkup() {
    var e = false, t = "<span";
    this.classes.length && (e = true, t += ' class="', t += U0(et(this.classes)), t += '"');
    var a = "";
    this.italic > 0 && (a += "margin-right:" + G(this.italic) + ";"), a += Ca(this.style), a && (e = true, t += ' style="' + U0(a) + '"');
    var n = U0(this.text);
    return e ? (t += ">", t += n, t += "</span>", t) : n;
  }
}, Le = class {
  constructor(e, t) {
    this.children = void 0, this.attributes = void 0, this.children = e || [], this.attributes = t || {};
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "svg");
    for (var a of Object.keys(this.attributes)) t.setAttribute(a, this.attributes[a]);
    for (var n = 0; n < this.children.length; n++) t.appendChild(this.children[n].toNode());
    return t;
  }
  toMarkup() {
    var e = '<svg xmlns="http://www.w3.org/2000/svg"';
    for (var t of Object.keys(this.attributes)) e += " " + t + '="' + U0(this.attributes[t]) + '"';
    e += ">";
    for (var a = 0; a < this.children.length; a++) e += this.children[a].toMarkup();
    return e += "</svg>", e;
  }
}, tt = class {
  constructor(e, t) {
    this.pathName = void 0, this.alternate = void 0, this.pathName = e, this.alternate = t;
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "path");
    return this.alternate ? t.setAttribute("d", this.alternate) : t.setAttribute("d", i4[this.pathName]), t;
  }
  toMarkup() {
    return this.alternate ? '<path d="' + U0(this.alternate) + '"/>' : '<path d="' + U0(i4[this.pathName]) + '"/>';
  }
}, W1 = class {
  constructor(e) {
    this.attributes = void 0, this.attributes = e || {};
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "line");
    for (var a of Object.keys(this.attributes)) t.setAttribute(a, this.attributes[a]);
    return t;
  }
  toMarkup() {
    var e = "<line";
    for (var t of Object.keys(this.attributes)) e += " " + t + '="' + U0(this.attributes[t]) + '"';
    return e += "/>", e;
  }
};
function ml(r) {
  if (r instanceof se) return r;
  throw new Error("Expected symbolNode but got " + String(r) + ".");
}
function cl(r) {
  if (r instanceof Et) return r;
  throw new Error("Expected span<HtmlDomNode> but got " + String(r) + ".");
}
var dl = (r) => r instanceof Et || r instanceof Ir || r instanceof qt, we = { "AMS-Regular": { 32: [0, 0, 0, 0, 0.25], 65: [0, 0.68889, 0, 0, 0.72222], 66: [0, 0.68889, 0, 0, 0.66667], 67: [0, 0.68889, 0, 0, 0.72222], 68: [0, 0.68889, 0, 0, 0.72222], 69: [0, 0.68889, 0, 0, 0.66667], 70: [0, 0.68889, 0, 0, 0.61111], 71: [0, 0.68889, 0, 0, 0.77778], 72: [0, 0.68889, 0, 0, 0.77778], 73: [0, 0.68889, 0, 0, 0.38889], 74: [0.16667, 0.68889, 0, 0, 0.5], 75: [0, 0.68889, 0, 0, 0.77778], 76: [0, 0.68889, 0, 0, 0.66667], 77: [0, 0.68889, 0, 0, 0.94445], 78: [0, 0.68889, 0, 0, 0.72222], 79: [0.16667, 0.68889, 0, 0, 0.77778], 80: [0, 0.68889, 0, 0, 0.61111], 81: [0.16667, 0.68889, 0, 0, 0.77778], 82: [0, 0.68889, 0, 0, 0.72222], 83: [0, 0.68889, 0, 0, 0.55556], 84: [0, 0.68889, 0, 0, 0.66667], 85: [0, 0.68889, 0, 0, 0.72222], 86: [0, 0.68889, 0, 0, 0.72222], 87: [0, 0.68889, 0, 0, 1], 88: [0, 0.68889, 0, 0, 0.72222], 89: [0, 0.68889, 0, 0, 0.72222], 90: [0, 0.68889, 0, 0, 0.66667], 107: [0, 0.68889, 0, 0, 0.55556], 160: [0, 0, 0, 0, 0.25], 165: [0, 0.675, 0.025, 0, 0.75], 174: [0.15559, 0.69224, 0, 0, 0.94666], 240: [0, 0.68889, 0, 0, 0.55556], 295: [0, 0.68889, 0, 0, 0.54028], 710: [0, 0.825, 0, 0, 2.33334], 732: [0, 0.9, 0, 0, 2.33334], 770: [0, 0.825, 0, 0, 2.33334], 771: [0, 0.9, 0, 0, 2.33334], 989: [0.08167, 0.58167, 0, 0, 0.77778], 1008: [0, 0.43056, 0.04028, 0, 0.66667], 8245: [0, 0.54986, 0, 0, 0.275], 8463: [0, 0.68889, 0, 0, 0.54028], 8487: [0, 0.68889, 0, 0, 0.72222], 8498: [0, 0.68889, 0, 0, 0.55556], 8502: [0, 0.68889, 0, 0, 0.66667], 8503: [0, 0.68889, 0, 0, 0.44445], 8504: [0, 0.68889, 0, 0, 0.66667], 8513: [0, 0.68889, 0, 0, 0.63889], 8592: [-0.03598, 0.46402, 0, 0, 0.5], 8594: [-0.03598, 0.46402, 0, 0, 0.5], 8602: [-0.13313, 0.36687, 0, 0, 1], 8603: [-0.13313, 0.36687, 0, 0, 1], 8606: [0.01354, 0.52239, 0, 0, 1], 8608: [0.01354, 0.52239, 0, 0, 1], 8610: [0.01354, 0.52239, 0, 0, 1.11111], 8611: [0.01354, 0.52239, 0, 0, 1.11111], 8619: [0, 0.54986, 0, 0, 1], 8620: [0, 0.54986, 0, 0, 1], 8621: [-0.13313, 0.37788, 0, 0, 1.38889], 8622: [-0.13313, 0.36687, 0, 0, 1], 8624: [0, 0.69224, 0, 0, 0.5], 8625: [0, 0.69224, 0, 0, 0.5], 8630: [0, 0.43056, 0, 0, 1], 8631: [0, 0.43056, 0, 0, 1], 8634: [0.08198, 0.58198, 0, 0, 0.77778], 8635: [0.08198, 0.58198, 0, 0, 0.77778], 8638: [0.19444, 0.69224, 0, 0, 0.41667], 8639: [0.19444, 0.69224, 0, 0, 0.41667], 8642: [0.19444, 0.69224, 0, 0, 0.41667], 8643: [0.19444, 0.69224, 0, 0, 0.41667], 8644: [0.1808, 0.675, 0, 0, 1], 8646: [0.1808, 0.675, 0, 0, 1], 8647: [0.1808, 0.675, 0, 0, 1], 8648: [0.19444, 0.69224, 0, 0, 0.83334], 8649: [0.1808, 0.675, 0, 0, 1], 8650: [0.19444, 0.69224, 0, 0, 0.83334], 8651: [0.01354, 0.52239, 0, 0, 1], 8652: [0.01354, 0.52239, 0, 0, 1], 8653: [-0.13313, 0.36687, 0, 0, 1], 8654: [-0.13313, 0.36687, 0, 0, 1], 8655: [-0.13313, 0.36687, 0, 0, 1], 8666: [0.13667, 0.63667, 0, 0, 1], 8667: [0.13667, 0.63667, 0, 0, 1], 8669: [-0.13313, 0.37788, 0, 0, 1], 8672: [-0.064, 0.437, 0, 0, 1.334], 8674: [-0.064, 0.437, 0, 0, 1.334], 8705: [0, 0.825, 0, 0, 0.5], 8708: [0, 0.68889, 0, 0, 0.55556], 8709: [0.08167, 0.58167, 0, 0, 0.77778], 8717: [0, 0.43056, 0, 0, 0.42917], 8722: [-0.03598, 0.46402, 0, 0, 0.5], 8724: [0.08198, 0.69224, 0, 0, 0.77778], 8726: [0.08167, 0.58167, 0, 0, 0.77778], 8733: [0, 0.69224, 0, 0, 0.77778], 8736: [0, 0.69224, 0, 0, 0.72222], 8737: [0, 0.69224, 0, 0, 0.72222], 8738: [0.03517, 0.52239, 0, 0, 0.72222], 8739: [0.08167, 0.58167, 0, 0, 0.22222], 8740: [0.25142, 0.74111, 0, 0, 0.27778], 8741: [0.08167, 0.58167, 0, 0, 0.38889], 8742: [0.25142, 0.74111, 0, 0, 0.5], 8756: [0, 0.69224, 0, 0, 0.66667], 8757: [0, 0.69224, 0, 0, 0.66667], 8764: [-0.13313, 0.36687, 0, 0, 0.77778], 8765: [-0.13313, 0.37788, 0, 0, 0.77778], 8769: [-0.13313, 0.36687, 0, 0, 0.77778], 8770: [-0.03625, 0.46375, 0, 0, 0.77778], 8774: [0.30274, 0.79383, 0, 0, 0.77778], 8776: [-0.01688, 0.48312, 0, 0, 0.77778], 8778: [0.08167, 0.58167, 0, 0, 0.77778], 8782: [0.06062, 0.54986, 0, 0, 0.77778], 8783: [0.06062, 0.54986, 0, 0, 0.77778], 8785: [0.08198, 0.58198, 0, 0, 0.77778], 8786: [0.08198, 0.58198, 0, 0, 0.77778], 8787: [0.08198, 0.58198, 0, 0, 0.77778], 8790: [0, 0.69224, 0, 0, 0.77778], 8791: [0.22958, 0.72958, 0, 0, 0.77778], 8796: [0.08198, 0.91667, 0, 0, 0.77778], 8806: [0.25583, 0.75583, 0, 0, 0.77778], 8807: [0.25583, 0.75583, 0, 0, 0.77778], 8808: [0.25142, 0.75726, 0, 0, 0.77778], 8809: [0.25142, 0.75726, 0, 0, 0.77778], 8812: [0.25583, 0.75583, 0, 0, 0.5], 8814: [0.20576, 0.70576, 0, 0, 0.77778], 8815: [0.20576, 0.70576, 0, 0, 0.77778], 8816: [0.30274, 0.79383, 0, 0, 0.77778], 8817: [0.30274, 0.79383, 0, 0, 0.77778], 8818: [0.22958, 0.72958, 0, 0, 0.77778], 8819: [0.22958, 0.72958, 0, 0, 0.77778], 8822: [0.1808, 0.675, 0, 0, 0.77778], 8823: [0.1808, 0.675, 0, 0, 0.77778], 8828: [0.13667, 0.63667, 0, 0, 0.77778], 8829: [0.13667, 0.63667, 0, 0, 0.77778], 8830: [0.22958, 0.72958, 0, 0, 0.77778], 8831: [0.22958, 0.72958, 0, 0, 0.77778], 8832: [0.20576, 0.70576, 0, 0, 0.77778], 8833: [0.20576, 0.70576, 0, 0, 0.77778], 8840: [0.30274, 0.79383, 0, 0, 0.77778], 8841: [0.30274, 0.79383, 0, 0, 0.77778], 8842: [0.13597, 0.63597, 0, 0, 0.77778], 8843: [0.13597, 0.63597, 0, 0, 0.77778], 8847: [0.03517, 0.54986, 0, 0, 0.77778], 8848: [0.03517, 0.54986, 0, 0, 0.77778], 8858: [0.08198, 0.58198, 0, 0, 0.77778], 8859: [0.08198, 0.58198, 0, 0, 0.77778], 8861: [0.08198, 0.58198, 0, 0, 0.77778], 8862: [0, 0.675, 0, 0, 0.77778], 8863: [0, 0.675, 0, 0, 0.77778], 8864: [0, 0.675, 0, 0, 0.77778], 8865: [0, 0.675, 0, 0, 0.77778], 8872: [0, 0.69224, 0, 0, 0.61111], 8873: [0, 0.69224, 0, 0, 0.72222], 8874: [0, 0.69224, 0, 0, 0.88889], 8876: [0, 0.68889, 0, 0, 0.61111], 8877: [0, 0.68889, 0, 0, 0.61111], 8878: [0, 0.68889, 0, 0, 0.72222], 8879: [0, 0.68889, 0, 0, 0.72222], 8882: [0.03517, 0.54986, 0, 0, 0.77778], 8883: [0.03517, 0.54986, 0, 0, 0.77778], 8884: [0.13667, 0.63667, 0, 0, 0.77778], 8885: [0.13667, 0.63667, 0, 0, 0.77778], 8888: [0, 0.54986, 0, 0, 1.11111], 8890: [0.19444, 0.43056, 0, 0, 0.55556], 8891: [0.19444, 0.69224, 0, 0, 0.61111], 8892: [0.19444, 0.69224, 0, 0, 0.61111], 8901: [0, 0.54986, 0, 0, 0.27778], 8903: [0.08167, 0.58167, 0, 0, 0.77778], 8905: [0.08167, 0.58167, 0, 0, 0.77778], 8906: [0.08167, 0.58167, 0, 0, 0.77778], 8907: [0, 0.69224, 0, 0, 0.77778], 8908: [0, 0.69224, 0, 0, 0.77778], 8909: [-0.03598, 0.46402, 0, 0, 0.77778], 8910: [0, 0.54986, 0, 0, 0.76042], 8911: [0, 0.54986, 0, 0, 0.76042], 8912: [0.03517, 0.54986, 0, 0, 0.77778], 8913: [0.03517, 0.54986, 0, 0, 0.77778], 8914: [0, 0.54986, 0, 0, 0.66667], 8915: [0, 0.54986, 0, 0, 0.66667], 8916: [0, 0.69224, 0, 0, 0.66667], 8918: [0.0391, 0.5391, 0, 0, 0.77778], 8919: [0.0391, 0.5391, 0, 0, 0.77778], 8920: [0.03517, 0.54986, 0, 0, 1.33334], 8921: [0.03517, 0.54986, 0, 0, 1.33334], 8922: [0.38569, 0.88569, 0, 0, 0.77778], 8923: [0.38569, 0.88569, 0, 0, 0.77778], 8926: [0.13667, 0.63667, 0, 0, 0.77778], 8927: [0.13667, 0.63667, 0, 0, 0.77778], 8928: [0.30274, 0.79383, 0, 0, 0.77778], 8929: [0.30274, 0.79383, 0, 0, 0.77778], 8934: [0.23222, 0.74111, 0, 0, 0.77778], 8935: [0.23222, 0.74111, 0, 0, 0.77778], 8936: [0.23222, 0.74111, 0, 0, 0.77778], 8937: [0.23222, 0.74111, 0, 0, 0.77778], 8938: [0.20576, 0.70576, 0, 0, 0.77778], 8939: [0.20576, 0.70576, 0, 0, 0.77778], 8940: [0.30274, 0.79383, 0, 0, 0.77778], 8941: [0.30274, 0.79383, 0, 0, 0.77778], 8994: [0.19444, 0.69224, 0, 0, 0.77778], 8995: [0.19444, 0.69224, 0, 0, 0.77778], 9416: [0.15559, 0.69224, 0, 0, 0.90222], 9484: [0, 0.69224, 0, 0, 0.5], 9488: [0, 0.69224, 0, 0, 0.5], 9492: [0, 0.37788, 0, 0, 0.5], 9496: [0, 0.37788, 0, 0, 0.5], 9585: [0.19444, 0.68889, 0, 0, 0.88889], 9586: [0.19444, 0.74111, 0, 0, 0.88889], 9632: [0, 0.675, 0, 0, 0.77778], 9633: [0, 0.675, 0, 0, 0.77778], 9650: [0, 0.54986, 0, 0, 0.72222], 9651: [0, 0.54986, 0, 0, 0.72222], 9654: [0.03517, 0.54986, 0, 0, 0.77778], 9660: [0, 0.54986, 0, 0, 0.72222], 9661: [0, 0.54986, 0, 0, 0.72222], 9664: [0.03517, 0.54986, 0, 0, 0.77778], 9674: [0.11111, 0.69224, 0, 0, 0.66667], 9733: [0.19444, 0.69224, 0, 0, 0.94445], 10003: [0, 0.69224, 0, 0, 0.83334], 10016: [0, 0.69224, 0, 0, 0.83334], 10731: [0.11111, 0.69224, 0, 0, 0.66667], 10846: [0.19444, 0.75583, 0, 0, 0.61111], 10877: [0.13667, 0.63667, 0, 0, 0.77778], 10878: [0.13667, 0.63667, 0, 0, 0.77778], 10885: [0.25583, 0.75583, 0, 0, 0.77778], 10886: [0.25583, 0.75583, 0, 0, 0.77778], 10887: [0.13597, 0.63597, 0, 0, 0.77778], 10888: [0.13597, 0.63597, 0, 0, 0.77778], 10889: [0.26167, 0.75726, 0, 0, 0.77778], 10890: [0.26167, 0.75726, 0, 0, 0.77778], 10891: [0.48256, 0.98256, 0, 0, 0.77778], 10892: [0.48256, 0.98256, 0, 0, 0.77778], 10901: [0.13667, 0.63667, 0, 0, 0.77778], 10902: [0.13667, 0.63667, 0, 0, 0.77778], 10933: [0.25142, 0.75726, 0, 0, 0.77778], 10934: [0.25142, 0.75726, 0, 0, 0.77778], 10935: [0.26167, 0.75726, 0, 0, 0.77778], 10936: [0.26167, 0.75726, 0, 0, 0.77778], 10937: [0.26167, 0.75726, 0, 0, 0.77778], 10938: [0.26167, 0.75726, 0, 0, 0.77778], 10949: [0.25583, 0.75583, 0, 0, 0.77778], 10950: [0.25583, 0.75583, 0, 0, 0.77778], 10955: [0.28481, 0.79383, 0, 0, 0.77778], 10956: [0.28481, 0.79383, 0, 0, 0.77778], 57350: [0.08167, 0.58167, 0, 0, 0.22222], 57351: [0.08167, 0.58167, 0, 0, 0.38889], 57352: [0.08167, 0.58167, 0, 0, 0.77778], 57353: [0, 0.43056, 0.04028, 0, 0.66667], 57356: [0.25142, 0.75726, 0, 0, 0.77778], 57357: [0.25142, 0.75726, 0, 0, 0.77778], 57358: [0.41951, 0.91951, 0, 0, 0.77778], 57359: [0.30274, 0.79383, 0, 0, 0.77778], 57360: [0.30274, 0.79383, 0, 0, 0.77778], 57361: [0.41951, 0.91951, 0, 0, 0.77778], 57366: [0.25142, 0.75726, 0, 0, 0.77778], 57367: [0.25142, 0.75726, 0, 0, 0.77778], 57368: [0.25142, 0.75726, 0, 0, 0.77778], 57369: [0.25142, 0.75726, 0, 0, 0.77778], 57370: [0.13597, 0.63597, 0, 0, 0.77778], 57371: [0.13597, 0.63597, 0, 0, 0.77778] }, "Caligraphic-Regular": { 32: [0, 0, 0, 0, 0.25], 65: [0, 0.68333, 0, 0.19445, 0.79847], 66: [0, 0.68333, 0.03041, 0.13889, 0.65681], 67: [0, 0.68333, 0.05834, 0.13889, 0.52653], 68: [0, 0.68333, 0.02778, 0.08334, 0.77139], 69: [0, 0.68333, 0.08944, 0.11111, 0.52778], 70: [0, 0.68333, 0.09931, 0.11111, 0.71875], 71: [0.09722, 0.68333, 0.0593, 0.11111, 0.59487], 72: [0, 0.68333, 965e-5, 0.11111, 0.84452], 73: [0, 0.68333, 0.07382, 0, 0.54452], 74: [0.09722, 0.68333, 0.18472, 0.16667, 0.67778], 75: [0, 0.68333, 0.01445, 0.05556, 0.76195], 76: [0, 0.68333, 0, 0.13889, 0.68972], 77: [0, 0.68333, 0, 0.13889, 1.2009], 78: [0, 0.68333, 0.14736, 0.08334, 0.82049], 79: [0, 0.68333, 0.02778, 0.11111, 0.79611], 80: [0, 0.68333, 0.08222, 0.08334, 0.69556], 81: [0.09722, 0.68333, 0, 0.11111, 0.81667], 82: [0, 0.68333, 0, 0.08334, 0.8475], 83: [0, 0.68333, 0.075, 0.13889, 0.60556], 84: [0, 0.68333, 0.25417, 0, 0.54464], 85: [0, 0.68333, 0.09931, 0.08334, 0.62583], 86: [0, 0.68333, 0.08222, 0, 0.61278], 87: [0, 0.68333, 0.08222, 0.08334, 0.98778], 88: [0, 0.68333, 0.14643, 0.13889, 0.7133], 89: [0.09722, 0.68333, 0.08222, 0.08334, 0.66834], 90: [0, 0.68333, 0.07944, 0.13889, 0.72473], 160: [0, 0, 0, 0, 0.25] }, "Fraktur-Regular": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69141, 0, 0, 0.29574], 34: [0, 0.69141, 0, 0, 0.21471], 38: [0, 0.69141, 0, 0, 0.73786], 39: [0, 0.69141, 0, 0, 0.21201], 40: [0.24982, 0.74947, 0, 0, 0.38865], 41: [0.24982, 0.74947, 0, 0, 0.38865], 42: [0, 0.62119, 0, 0, 0.27764], 43: [0.08319, 0.58283, 0, 0, 0.75623], 44: [0, 0.10803, 0, 0, 0.27764], 45: [0.08319, 0.58283, 0, 0, 0.75623], 46: [0, 0.10803, 0, 0, 0.27764], 47: [0.24982, 0.74947, 0, 0, 0.50181], 48: [0, 0.47534, 0, 0, 0.50181], 49: [0, 0.47534, 0, 0, 0.50181], 50: [0, 0.47534, 0, 0, 0.50181], 51: [0.18906, 0.47534, 0, 0, 0.50181], 52: [0.18906, 0.47534, 0, 0, 0.50181], 53: [0.18906, 0.47534, 0, 0, 0.50181], 54: [0, 0.69141, 0, 0, 0.50181], 55: [0.18906, 0.47534, 0, 0, 0.50181], 56: [0, 0.69141, 0, 0, 0.50181], 57: [0.18906, 0.47534, 0, 0, 0.50181], 58: [0, 0.47534, 0, 0, 0.21606], 59: [0.12604, 0.47534, 0, 0, 0.21606], 61: [-0.13099, 0.36866, 0, 0, 0.75623], 63: [0, 0.69141, 0, 0, 0.36245], 65: [0, 0.69141, 0, 0, 0.7176], 66: [0, 0.69141, 0, 0, 0.88397], 67: [0, 0.69141, 0, 0, 0.61254], 68: [0, 0.69141, 0, 0, 0.83158], 69: [0, 0.69141, 0, 0, 0.66278], 70: [0.12604, 0.69141, 0, 0, 0.61119], 71: [0, 0.69141, 0, 0, 0.78539], 72: [0.06302, 0.69141, 0, 0, 0.7203], 73: [0, 0.69141, 0, 0, 0.55448], 74: [0.12604, 0.69141, 0, 0, 0.55231], 75: [0, 0.69141, 0, 0, 0.66845], 76: [0, 0.69141, 0, 0, 0.66602], 77: [0, 0.69141, 0, 0, 1.04953], 78: [0, 0.69141, 0, 0, 0.83212], 79: [0, 0.69141, 0, 0, 0.82699], 80: [0.18906, 0.69141, 0, 0, 0.82753], 81: [0.03781, 0.69141, 0, 0, 0.82699], 82: [0, 0.69141, 0, 0, 0.82807], 83: [0, 0.69141, 0, 0, 0.82861], 84: [0, 0.69141, 0, 0, 0.66899], 85: [0, 0.69141, 0, 0, 0.64576], 86: [0, 0.69141, 0, 0, 0.83131], 87: [0, 0.69141, 0, 0, 1.04602], 88: [0, 0.69141, 0, 0, 0.71922], 89: [0.18906, 0.69141, 0, 0, 0.83293], 90: [0.12604, 0.69141, 0, 0, 0.60201], 91: [0.24982, 0.74947, 0, 0, 0.27764], 93: [0.24982, 0.74947, 0, 0, 0.27764], 94: [0, 0.69141, 0, 0, 0.49965], 97: [0, 0.47534, 0, 0, 0.50046], 98: [0, 0.69141, 0, 0, 0.51315], 99: [0, 0.47534, 0, 0, 0.38946], 100: [0, 0.62119, 0, 0, 0.49857], 101: [0, 0.47534, 0, 0, 0.40053], 102: [0.18906, 0.69141, 0, 0, 0.32626], 103: [0.18906, 0.47534, 0, 0, 0.5037], 104: [0.18906, 0.69141, 0, 0, 0.52126], 105: [0, 0.69141, 0, 0, 0.27899], 106: [0, 0.69141, 0, 0, 0.28088], 107: [0, 0.69141, 0, 0, 0.38946], 108: [0, 0.69141, 0, 0, 0.27953], 109: [0, 0.47534, 0, 0, 0.76676], 110: [0, 0.47534, 0, 0, 0.52666], 111: [0, 0.47534, 0, 0, 0.48885], 112: [0.18906, 0.52396, 0, 0, 0.50046], 113: [0.18906, 0.47534, 0, 0, 0.48912], 114: [0, 0.47534, 0, 0, 0.38919], 115: [0, 0.47534, 0, 0, 0.44266], 116: [0, 0.62119, 0, 0, 0.33301], 117: [0, 0.47534, 0, 0, 0.5172], 118: [0, 0.52396, 0, 0, 0.5118], 119: [0, 0.52396, 0, 0, 0.77351], 120: [0.18906, 0.47534, 0, 0, 0.38865], 121: [0.18906, 0.47534, 0, 0, 0.49884], 122: [0.18906, 0.47534, 0, 0, 0.39054], 160: [0, 0, 0, 0, 0.25], 8216: [0, 0.69141, 0, 0, 0.21471], 8217: [0, 0.69141, 0, 0, 0.21471], 58112: [0, 0.62119, 0, 0, 0.49749], 58113: [0, 0.62119, 0, 0, 0.4983], 58114: [0.18906, 0.69141, 0, 0, 0.33328], 58115: [0.18906, 0.69141, 0, 0, 0.32923], 58116: [0.18906, 0.47534, 0, 0, 0.50343], 58117: [0, 0.69141, 0, 0, 0.33301], 58118: [0, 0.62119, 0, 0, 0.33409], 58119: [0, 0.47534, 0, 0, 0.50073] }, "Main-Bold": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.35], 34: [0, 0.69444, 0, 0, 0.60278], 35: [0.19444, 0.69444, 0, 0, 0.95833], 36: [0.05556, 0.75, 0, 0, 0.575], 37: [0.05556, 0.75, 0, 0, 0.95833], 38: [0, 0.69444, 0, 0, 0.89444], 39: [0, 0.69444, 0, 0, 0.31944], 40: [0.25, 0.75, 0, 0, 0.44722], 41: [0.25, 0.75, 0, 0, 0.44722], 42: [0, 0.75, 0, 0, 0.575], 43: [0.13333, 0.63333, 0, 0, 0.89444], 44: [0.19444, 0.15556, 0, 0, 0.31944], 45: [0, 0.44444, 0, 0, 0.38333], 46: [0, 0.15556, 0, 0, 0.31944], 47: [0.25, 0.75, 0, 0, 0.575], 48: [0, 0.64444, 0, 0, 0.575], 49: [0, 0.64444, 0, 0, 0.575], 50: [0, 0.64444, 0, 0, 0.575], 51: [0, 0.64444, 0, 0, 0.575], 52: [0, 0.64444, 0, 0, 0.575], 53: [0, 0.64444, 0, 0, 0.575], 54: [0, 0.64444, 0, 0, 0.575], 55: [0, 0.64444, 0, 0, 0.575], 56: [0, 0.64444, 0, 0, 0.575], 57: [0, 0.64444, 0, 0, 0.575], 58: [0, 0.44444, 0, 0, 0.31944], 59: [0.19444, 0.44444, 0, 0, 0.31944], 60: [0.08556, 0.58556, 0, 0, 0.89444], 61: [-0.10889, 0.39111, 0, 0, 0.89444], 62: [0.08556, 0.58556, 0, 0, 0.89444], 63: [0, 0.69444, 0, 0, 0.54305], 64: [0, 0.69444, 0, 0, 0.89444], 65: [0, 0.68611, 0, 0, 0.86944], 66: [0, 0.68611, 0, 0, 0.81805], 67: [0, 0.68611, 0, 0, 0.83055], 68: [0, 0.68611, 0, 0, 0.88194], 69: [0, 0.68611, 0, 0, 0.75555], 70: [0, 0.68611, 0, 0, 0.72361], 71: [0, 0.68611, 0, 0, 0.90416], 72: [0, 0.68611, 0, 0, 0.9], 73: [0, 0.68611, 0, 0, 0.43611], 74: [0, 0.68611, 0, 0, 0.59444], 75: [0, 0.68611, 0, 0, 0.90138], 76: [0, 0.68611, 0, 0, 0.69166], 77: [0, 0.68611, 0, 0, 1.09166], 78: [0, 0.68611, 0, 0, 0.9], 79: [0, 0.68611, 0, 0, 0.86388], 80: [0, 0.68611, 0, 0, 0.78611], 81: [0.19444, 0.68611, 0, 0, 0.86388], 82: [0, 0.68611, 0, 0, 0.8625], 83: [0, 0.68611, 0, 0, 0.63889], 84: [0, 0.68611, 0, 0, 0.8], 85: [0, 0.68611, 0, 0, 0.88472], 86: [0, 0.68611, 0.01597, 0, 0.86944], 87: [0, 0.68611, 0.01597, 0, 1.18888], 88: [0, 0.68611, 0, 0, 0.86944], 89: [0, 0.68611, 0.02875, 0, 0.86944], 90: [0, 0.68611, 0, 0, 0.70277], 91: [0.25, 0.75, 0, 0, 0.31944], 92: [0.25, 0.75, 0, 0, 0.575], 93: [0.25, 0.75, 0, 0, 0.31944], 94: [0, 0.69444, 0, 0, 0.575], 95: [0.31, 0.13444, 0.03194, 0, 0.575], 97: [0, 0.44444, 0, 0, 0.55902], 98: [0, 0.69444, 0, 0, 0.63889], 99: [0, 0.44444, 0, 0, 0.51111], 100: [0, 0.69444, 0, 0, 0.63889], 101: [0, 0.44444, 0, 0, 0.52708], 102: [0, 0.69444, 0.10903, 0, 0.35139], 103: [0.19444, 0.44444, 0.01597, 0, 0.575], 104: [0, 0.69444, 0, 0, 0.63889], 105: [0, 0.69444, 0, 0, 0.31944], 106: [0.19444, 0.69444, 0, 0, 0.35139], 107: [0, 0.69444, 0, 0, 0.60694], 108: [0, 0.69444, 0, 0, 0.31944], 109: [0, 0.44444, 0, 0, 0.95833], 110: [0, 0.44444, 0, 0, 0.63889], 111: [0, 0.44444, 0, 0, 0.575], 112: [0.19444, 0.44444, 0, 0, 0.63889], 113: [0.19444, 0.44444, 0, 0, 0.60694], 114: [0, 0.44444, 0, 0, 0.47361], 115: [0, 0.44444, 0, 0, 0.45361], 116: [0, 0.63492, 0, 0, 0.44722], 117: [0, 0.44444, 0, 0, 0.63889], 118: [0, 0.44444, 0.01597, 0, 0.60694], 119: [0, 0.44444, 0.01597, 0, 0.83055], 120: [0, 0.44444, 0, 0, 0.60694], 121: [0.19444, 0.44444, 0.01597, 0, 0.60694], 122: [0, 0.44444, 0, 0, 0.51111], 123: [0.25, 0.75, 0, 0, 0.575], 124: [0.25, 0.75, 0, 0, 0.31944], 125: [0.25, 0.75, 0, 0, 0.575], 126: [0.35, 0.34444, 0, 0, 0.575], 160: [0, 0, 0, 0, 0.25], 163: [0, 0.69444, 0, 0, 0.86853], 168: [0, 0.69444, 0, 0, 0.575], 172: [0, 0.44444, 0, 0, 0.76666], 176: [0, 0.69444, 0, 0, 0.86944], 177: [0.13333, 0.63333, 0, 0, 0.89444], 184: [0.17014, 0, 0, 0, 0.51111], 198: [0, 0.68611, 0, 0, 1.04166], 215: [0.13333, 0.63333, 0, 0, 0.89444], 216: [0.04861, 0.73472, 0, 0, 0.89444], 223: [0, 0.69444, 0, 0, 0.59722], 230: [0, 0.44444, 0, 0, 0.83055], 247: [0.13333, 0.63333, 0, 0, 0.89444], 248: [0.09722, 0.54167, 0, 0, 0.575], 305: [0, 0.44444, 0, 0, 0.31944], 338: [0, 0.68611, 0, 0, 1.16944], 339: [0, 0.44444, 0, 0, 0.89444], 567: [0.19444, 0.44444, 0, 0, 0.35139], 710: [0, 0.69444, 0, 0, 0.575], 711: [0, 0.63194, 0, 0, 0.575], 713: [0, 0.59611, 0, 0, 0.575], 714: [0, 0.69444, 0, 0, 0.575], 715: [0, 0.69444, 0, 0, 0.575], 728: [0, 0.69444, 0, 0, 0.575], 729: [0, 0.69444, 0, 0, 0.31944], 730: [0, 0.69444, 0, 0, 0.86944], 732: [0, 0.69444, 0, 0, 0.575], 733: [0, 0.69444, 0, 0, 0.575], 915: [0, 0.68611, 0, 0, 0.69166], 916: [0, 0.68611, 0, 0, 0.95833], 920: [0, 0.68611, 0, 0, 0.89444], 923: [0, 0.68611, 0, 0, 0.80555], 926: [0, 0.68611, 0, 0, 0.76666], 928: [0, 0.68611, 0, 0, 0.9], 931: [0, 0.68611, 0, 0, 0.83055], 933: [0, 0.68611, 0, 0, 0.89444], 934: [0, 0.68611, 0, 0, 0.83055], 936: [0, 0.68611, 0, 0, 0.89444], 937: [0, 0.68611, 0, 0, 0.83055], 8211: [0, 0.44444, 0.03194, 0, 0.575], 8212: [0, 0.44444, 0.03194, 0, 1.14999], 8216: [0, 0.69444, 0, 0, 0.31944], 8217: [0, 0.69444, 0, 0, 0.31944], 8220: [0, 0.69444, 0, 0, 0.60278], 8221: [0, 0.69444, 0, 0, 0.60278], 8224: [0.19444, 0.69444, 0, 0, 0.51111], 8225: [0.19444, 0.69444, 0, 0, 0.51111], 8242: [0, 0.55556, 0, 0, 0.34444], 8407: [0, 0.72444, 0.15486, 0, 0.575], 8463: [0, 0.69444, 0, 0, 0.66759], 8465: [0, 0.69444, 0, 0, 0.83055], 8467: [0, 0.69444, 0, 0, 0.47361], 8472: [0.19444, 0.44444, 0, 0, 0.74027], 8476: [0, 0.69444, 0, 0, 0.83055], 8501: [0, 0.69444, 0, 0, 0.70277], 8592: [-0.10889, 0.39111, 0, 0, 1.14999], 8593: [0.19444, 0.69444, 0, 0, 0.575], 8594: [-0.10889, 0.39111, 0, 0, 1.14999], 8595: [0.19444, 0.69444, 0, 0, 0.575], 8596: [-0.10889, 0.39111, 0, 0, 1.14999], 8597: [0.25, 0.75, 0, 0, 0.575], 8598: [0.19444, 0.69444, 0, 0, 1.14999], 8599: [0.19444, 0.69444, 0, 0, 1.14999], 8600: [0.19444, 0.69444, 0, 0, 1.14999], 8601: [0.19444, 0.69444, 0, 0, 1.14999], 8636: [-0.10889, 0.39111, 0, 0, 1.14999], 8637: [-0.10889, 0.39111, 0, 0, 1.14999], 8640: [-0.10889, 0.39111, 0, 0, 1.14999], 8641: [-0.10889, 0.39111, 0, 0, 1.14999], 8656: [-0.10889, 0.39111, 0, 0, 1.14999], 8657: [0.19444, 0.69444, 0, 0, 0.70277], 8658: [-0.10889, 0.39111, 0, 0, 1.14999], 8659: [0.19444, 0.69444, 0, 0, 0.70277], 8660: [-0.10889, 0.39111, 0, 0, 1.14999], 8661: [0.25, 0.75, 0, 0, 0.70277], 8704: [0, 0.69444, 0, 0, 0.63889], 8706: [0, 0.69444, 0.06389, 0, 0.62847], 8707: [0, 0.69444, 0, 0, 0.63889], 8709: [0.05556, 0.75, 0, 0, 0.575], 8711: [0, 0.68611, 0, 0, 0.95833], 8712: [0.08556, 0.58556, 0, 0, 0.76666], 8715: [0.08556, 0.58556, 0, 0, 0.76666], 8722: [0.13333, 0.63333, 0, 0, 0.89444], 8723: [0.13333, 0.63333, 0, 0, 0.89444], 8725: [0.25, 0.75, 0, 0, 0.575], 8726: [0.25, 0.75, 0, 0, 0.575], 8727: [-0.02778, 0.47222, 0, 0, 0.575], 8728: [-0.02639, 0.47361, 0, 0, 0.575], 8729: [-0.02639, 0.47361, 0, 0, 0.575], 8730: [0.18, 0.82, 0, 0, 0.95833], 8733: [0, 0.44444, 0, 0, 0.89444], 8734: [0, 0.44444, 0, 0, 1.14999], 8736: [0, 0.69224, 0, 0, 0.72222], 8739: [0.25, 0.75, 0, 0, 0.31944], 8741: [0.25, 0.75, 0, 0, 0.575], 8743: [0, 0.55556, 0, 0, 0.76666], 8744: [0, 0.55556, 0, 0, 0.76666], 8745: [0, 0.55556, 0, 0, 0.76666], 8746: [0, 0.55556, 0, 0, 0.76666], 8747: [0.19444, 0.69444, 0.12778, 0, 0.56875], 8764: [-0.10889, 0.39111, 0, 0, 0.89444], 8768: [0.19444, 0.69444, 0, 0, 0.31944], 8771: [222e-5, 0.50222, 0, 0, 0.89444], 8773: [0.027, 0.638, 0, 0, 0.894], 8776: [0.02444, 0.52444, 0, 0, 0.89444], 8781: [222e-5, 0.50222, 0, 0, 0.89444], 8801: [222e-5, 0.50222, 0, 0, 0.89444], 8804: [0.19667, 0.69667, 0, 0, 0.89444], 8805: [0.19667, 0.69667, 0, 0, 0.89444], 8810: [0.08556, 0.58556, 0, 0, 1.14999], 8811: [0.08556, 0.58556, 0, 0, 1.14999], 8826: [0.08556, 0.58556, 0, 0, 0.89444], 8827: [0.08556, 0.58556, 0, 0, 0.89444], 8834: [0.08556, 0.58556, 0, 0, 0.89444], 8835: [0.08556, 0.58556, 0, 0, 0.89444], 8838: [0.19667, 0.69667, 0, 0, 0.89444], 8839: [0.19667, 0.69667, 0, 0, 0.89444], 8846: [0, 0.55556, 0, 0, 0.76666], 8849: [0.19667, 0.69667, 0, 0, 0.89444], 8850: [0.19667, 0.69667, 0, 0, 0.89444], 8851: [0, 0.55556, 0, 0, 0.76666], 8852: [0, 0.55556, 0, 0, 0.76666], 8853: [0.13333, 0.63333, 0, 0, 0.89444], 8854: [0.13333, 0.63333, 0, 0, 0.89444], 8855: [0.13333, 0.63333, 0, 0, 0.89444], 8856: [0.13333, 0.63333, 0, 0, 0.89444], 8857: [0.13333, 0.63333, 0, 0, 0.89444], 8866: [0, 0.69444, 0, 0, 0.70277], 8867: [0, 0.69444, 0, 0, 0.70277], 8868: [0, 0.69444, 0, 0, 0.89444], 8869: [0, 0.69444, 0, 0, 0.89444], 8900: [-0.02639, 0.47361, 0, 0, 0.575], 8901: [-0.02639, 0.47361, 0, 0, 0.31944], 8902: [-0.02778, 0.47222, 0, 0, 0.575], 8968: [0.25, 0.75, 0, 0, 0.51111], 8969: [0.25, 0.75, 0, 0, 0.51111], 8970: [0.25, 0.75, 0, 0, 0.51111], 8971: [0.25, 0.75, 0, 0, 0.51111], 8994: [-0.13889, 0.36111, 0, 0, 1.14999], 8995: [-0.13889, 0.36111, 0, 0, 1.14999], 9651: [0.19444, 0.69444, 0, 0, 1.02222], 9657: [-0.02778, 0.47222, 0, 0, 0.575], 9661: [0.19444, 0.69444, 0, 0, 1.02222], 9667: [-0.02778, 0.47222, 0, 0, 0.575], 9711: [0.19444, 0.69444, 0, 0, 1.14999], 9824: [0.12963, 0.69444, 0, 0, 0.89444], 9825: [0.12963, 0.69444, 0, 0, 0.89444], 9826: [0.12963, 0.69444, 0, 0, 0.89444], 9827: [0.12963, 0.69444, 0, 0, 0.89444], 9837: [0, 0.75, 0, 0, 0.44722], 9838: [0.19444, 0.69444, 0, 0, 0.44722], 9839: [0.19444, 0.69444, 0, 0, 0.44722], 10216: [0.25, 0.75, 0, 0, 0.44722], 10217: [0.25, 0.75, 0, 0, 0.44722], 10815: [0, 0.68611, 0, 0, 0.9], 10927: [0.19667, 0.69667, 0, 0, 0.89444], 10928: [0.19667, 0.69667, 0, 0, 0.89444], 57376: [0.19444, 0.69444, 0, 0, 0] }, "Main-BoldItalic": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0.11417, 0, 0.38611], 34: [0, 0.69444, 0.07939, 0, 0.62055], 35: [0.19444, 0.69444, 0.06833, 0, 0.94444], 37: [0.05556, 0.75, 0.12861, 0, 0.94444], 38: [0, 0.69444, 0.08528, 0, 0.88555], 39: [0, 0.69444, 0.12945, 0, 0.35555], 40: [0.25, 0.75, 0.15806, 0, 0.47333], 41: [0.25, 0.75, 0.03306, 0, 0.47333], 42: [0, 0.75, 0.14333, 0, 0.59111], 43: [0.10333, 0.60333, 0.03306, 0, 0.88555], 44: [0.19444, 0.14722, 0, 0, 0.35555], 45: [0, 0.44444, 0.02611, 0, 0.41444], 46: [0, 0.14722, 0, 0, 0.35555], 47: [0.25, 0.75, 0.15806, 0, 0.59111], 48: [0, 0.64444, 0.13167, 0, 0.59111], 49: [0, 0.64444, 0.13167, 0, 0.59111], 50: [0, 0.64444, 0.13167, 0, 0.59111], 51: [0, 0.64444, 0.13167, 0, 0.59111], 52: [0.19444, 0.64444, 0.13167, 0, 0.59111], 53: [0, 0.64444, 0.13167, 0, 0.59111], 54: [0, 0.64444, 0.13167, 0, 0.59111], 55: [0.19444, 0.64444, 0.13167, 0, 0.59111], 56: [0, 0.64444, 0.13167, 0, 0.59111], 57: [0, 0.64444, 0.13167, 0, 0.59111], 58: [0, 0.44444, 0.06695, 0, 0.35555], 59: [0.19444, 0.44444, 0.06695, 0, 0.35555], 61: [-0.10889, 0.39111, 0.06833, 0, 0.88555], 63: [0, 0.69444, 0.11472, 0, 0.59111], 64: [0, 0.69444, 0.09208, 0, 0.88555], 65: [0, 0.68611, 0, 0, 0.86555], 66: [0, 0.68611, 0.0992, 0, 0.81666], 67: [0, 0.68611, 0.14208, 0, 0.82666], 68: [0, 0.68611, 0.09062, 0, 0.87555], 69: [0, 0.68611, 0.11431, 0, 0.75666], 70: [0, 0.68611, 0.12903, 0, 0.72722], 71: [0, 0.68611, 0.07347, 0, 0.89527], 72: [0, 0.68611, 0.17208, 0, 0.8961], 73: [0, 0.68611, 0.15681, 0, 0.47166], 74: [0, 0.68611, 0.145, 0, 0.61055], 75: [0, 0.68611, 0.14208, 0, 0.89499], 76: [0, 0.68611, 0, 0, 0.69777], 77: [0, 0.68611, 0.17208, 0, 1.07277], 78: [0, 0.68611, 0.17208, 0, 0.8961], 79: [0, 0.68611, 0.09062, 0, 0.85499], 80: [0, 0.68611, 0.0992, 0, 0.78721], 81: [0.19444, 0.68611, 0.09062, 0, 0.85499], 82: [0, 0.68611, 0.02559, 0, 0.85944], 83: [0, 0.68611, 0.11264, 0, 0.64999], 84: [0, 0.68611, 0.12903, 0, 0.7961], 85: [0, 0.68611, 0.17208, 0, 0.88083], 86: [0, 0.68611, 0.18625, 0, 0.86555], 87: [0, 0.68611, 0.18625, 0, 1.15999], 88: [0, 0.68611, 0.15681, 0, 0.86555], 89: [0, 0.68611, 0.19803, 0, 0.86555], 90: [0, 0.68611, 0.14208, 0, 0.70888], 91: [0.25, 0.75, 0.1875, 0, 0.35611], 93: [0.25, 0.75, 0.09972, 0, 0.35611], 94: [0, 0.69444, 0.06709, 0, 0.59111], 95: [0.31, 0.13444, 0.09811, 0, 0.59111], 97: [0, 0.44444, 0.09426, 0, 0.59111], 98: [0, 0.69444, 0.07861, 0, 0.53222], 99: [0, 0.44444, 0.05222, 0, 0.53222], 100: [0, 0.69444, 0.10861, 0, 0.59111], 101: [0, 0.44444, 0.085, 0, 0.53222], 102: [0.19444, 0.69444, 0.21778, 0, 0.4], 103: [0.19444, 0.44444, 0.105, 0, 0.53222], 104: [0, 0.69444, 0.09426, 0, 0.59111], 105: [0, 0.69326, 0.11387, 0, 0.35555], 106: [0.19444, 0.69326, 0.1672, 0, 0.35555], 107: [0, 0.69444, 0.11111, 0, 0.53222], 108: [0, 0.69444, 0.10861, 0, 0.29666], 109: [0, 0.44444, 0.09426, 0, 0.94444], 110: [0, 0.44444, 0.09426, 0, 0.64999], 111: [0, 0.44444, 0.07861, 0, 0.59111], 112: [0.19444, 0.44444, 0.07861, 0, 0.59111], 113: [0.19444, 0.44444, 0.105, 0, 0.53222], 114: [0, 0.44444, 0.11111, 0, 0.50167], 115: [0, 0.44444, 0.08167, 0, 0.48694], 116: [0, 0.63492, 0.09639, 0, 0.385], 117: [0, 0.44444, 0.09426, 0, 0.62055], 118: [0, 0.44444, 0.11111, 0, 0.53222], 119: [0, 0.44444, 0.11111, 0, 0.76777], 120: [0, 0.44444, 0.12583, 0, 0.56055], 121: [0.19444, 0.44444, 0.105, 0, 0.56166], 122: [0, 0.44444, 0.13889, 0, 0.49055], 126: [0.35, 0.34444, 0.11472, 0, 0.59111], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.69444, 0.11473, 0, 0.59111], 176: [0, 0.69444, 0, 0, 0.94888], 184: [0.17014, 0, 0, 0, 0.53222], 198: [0, 0.68611, 0.11431, 0, 1.02277], 216: [0.04861, 0.73472, 0.09062, 0, 0.88555], 223: [0.19444, 0.69444, 0.09736, 0, 0.665], 230: [0, 0.44444, 0.085, 0, 0.82666], 248: [0.09722, 0.54167, 0.09458, 0, 0.59111], 305: [0, 0.44444, 0.09426, 0, 0.35555], 338: [0, 0.68611, 0.11431, 0, 1.14054], 339: [0, 0.44444, 0.085, 0, 0.82666], 567: [0.19444, 0.44444, 0.04611, 0, 0.385], 710: [0, 0.69444, 0.06709, 0, 0.59111], 711: [0, 0.63194, 0.08271, 0, 0.59111], 713: [0, 0.59444, 0.10444, 0, 0.59111], 714: [0, 0.69444, 0.08528, 0, 0.59111], 715: [0, 0.69444, 0, 0, 0.59111], 728: [0, 0.69444, 0.10333, 0, 0.59111], 729: [0, 0.69444, 0.12945, 0, 0.35555], 730: [0, 0.69444, 0, 0, 0.94888], 732: [0, 0.69444, 0.11472, 0, 0.59111], 733: [0, 0.69444, 0.11472, 0, 0.59111], 915: [0, 0.68611, 0.12903, 0, 0.69777], 916: [0, 0.68611, 0, 0, 0.94444], 920: [0, 0.68611, 0.09062, 0, 0.88555], 923: [0, 0.68611, 0, 0, 0.80666], 926: [0, 0.68611, 0.15092, 0, 0.76777], 928: [0, 0.68611, 0.17208, 0, 0.8961], 931: [0, 0.68611, 0.11431, 0, 0.82666], 933: [0, 0.68611, 0.10778, 0, 0.88555], 934: [0, 0.68611, 0.05632, 0, 0.82666], 936: [0, 0.68611, 0.10778, 0, 0.88555], 937: [0, 0.68611, 0.0992, 0, 0.82666], 8211: [0, 0.44444, 0.09811, 0, 0.59111], 8212: [0, 0.44444, 0.09811, 0, 1.18221], 8216: [0, 0.69444, 0.12945, 0, 0.35555], 8217: [0, 0.69444, 0.12945, 0, 0.35555], 8220: [0, 0.69444, 0.16772, 0, 0.62055], 8221: [0, 0.69444, 0.07939, 0, 0.62055] }, "Main-Italic": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0.12417, 0, 0.30667], 34: [0, 0.69444, 0.06961, 0, 0.51444], 35: [0.19444, 0.69444, 0.06616, 0, 0.81777], 37: [0.05556, 0.75, 0.13639, 0, 0.81777], 38: [0, 0.69444, 0.09694, 0, 0.76666], 39: [0, 0.69444, 0.12417, 0, 0.30667], 40: [0.25, 0.75, 0.16194, 0, 0.40889], 41: [0.25, 0.75, 0.03694, 0, 0.40889], 42: [0, 0.75, 0.14917, 0, 0.51111], 43: [0.05667, 0.56167, 0.03694, 0, 0.76666], 44: [0.19444, 0.10556, 0, 0, 0.30667], 45: [0, 0.43056, 0.02826, 0, 0.35778], 46: [0, 0.10556, 0, 0, 0.30667], 47: [0.25, 0.75, 0.16194, 0, 0.51111], 48: [0, 0.64444, 0.13556, 0, 0.51111], 49: [0, 0.64444, 0.13556, 0, 0.51111], 50: [0, 0.64444, 0.13556, 0, 0.51111], 51: [0, 0.64444, 0.13556, 0, 0.51111], 52: [0.19444, 0.64444, 0.13556, 0, 0.51111], 53: [0, 0.64444, 0.13556, 0, 0.51111], 54: [0, 0.64444, 0.13556, 0, 0.51111], 55: [0.19444, 0.64444, 0.13556, 0, 0.51111], 56: [0, 0.64444, 0.13556, 0, 0.51111], 57: [0, 0.64444, 0.13556, 0, 0.51111], 58: [0, 0.43056, 0.0582, 0, 0.30667], 59: [0.19444, 0.43056, 0.0582, 0, 0.30667], 61: [-0.13313, 0.36687, 0.06616, 0, 0.76666], 63: [0, 0.69444, 0.1225, 0, 0.51111], 64: [0, 0.69444, 0.09597, 0, 0.76666], 65: [0, 0.68333, 0, 0, 0.74333], 66: [0, 0.68333, 0.10257, 0, 0.70389], 67: [0, 0.68333, 0.14528, 0, 0.71555], 68: [0, 0.68333, 0.09403, 0, 0.755], 69: [0, 0.68333, 0.12028, 0, 0.67833], 70: [0, 0.68333, 0.13305, 0, 0.65277], 71: [0, 0.68333, 0.08722, 0, 0.77361], 72: [0, 0.68333, 0.16389, 0, 0.74333], 73: [0, 0.68333, 0.15806, 0, 0.38555], 74: [0, 0.68333, 0.14028, 0, 0.525], 75: [0, 0.68333, 0.14528, 0, 0.76888], 76: [0, 0.68333, 0, 0, 0.62722], 77: [0, 0.68333, 0.16389, 0, 0.89666], 78: [0, 0.68333, 0.16389, 0, 0.74333], 79: [0, 0.68333, 0.09403, 0, 0.76666], 80: [0, 0.68333, 0.10257, 0, 0.67833], 81: [0.19444, 0.68333, 0.09403, 0, 0.76666], 82: [0, 0.68333, 0.03868, 0, 0.72944], 83: [0, 0.68333, 0.11972, 0, 0.56222], 84: [0, 0.68333, 0.13305, 0, 0.71555], 85: [0, 0.68333, 0.16389, 0, 0.74333], 86: [0, 0.68333, 0.18361, 0, 0.74333], 87: [0, 0.68333, 0.18361, 0, 0.99888], 88: [0, 0.68333, 0.15806, 0, 0.74333], 89: [0, 0.68333, 0.19383, 0, 0.74333], 90: [0, 0.68333, 0.14528, 0, 0.61333], 91: [0.25, 0.75, 0.1875, 0, 0.30667], 93: [0.25, 0.75, 0.10528, 0, 0.30667], 94: [0, 0.69444, 0.06646, 0, 0.51111], 95: [0.31, 0.12056, 0.09208, 0, 0.51111], 97: [0, 0.43056, 0.07671, 0, 0.51111], 98: [0, 0.69444, 0.06312, 0, 0.46], 99: [0, 0.43056, 0.05653, 0, 0.46], 100: [0, 0.69444, 0.10333, 0, 0.51111], 101: [0, 0.43056, 0.07514, 0, 0.46], 102: [0.19444, 0.69444, 0.21194, 0, 0.30667], 103: [0.19444, 0.43056, 0.08847, 0, 0.46], 104: [0, 0.69444, 0.07671, 0, 0.51111], 105: [0, 0.65536, 0.1019, 0, 0.30667], 106: [0.19444, 0.65536, 0.14467, 0, 0.30667], 107: [0, 0.69444, 0.10764, 0, 0.46], 108: [0, 0.69444, 0.10333, 0, 0.25555], 109: [0, 0.43056, 0.07671, 0, 0.81777], 110: [0, 0.43056, 0.07671, 0, 0.56222], 111: [0, 0.43056, 0.06312, 0, 0.51111], 112: [0.19444, 0.43056, 0.06312, 0, 0.51111], 113: [0.19444, 0.43056, 0.08847, 0, 0.46], 114: [0, 0.43056, 0.10764, 0, 0.42166], 115: [0, 0.43056, 0.08208, 0, 0.40889], 116: [0, 0.61508, 0.09486, 0, 0.33222], 117: [0, 0.43056, 0.07671, 0, 0.53666], 118: [0, 0.43056, 0.10764, 0, 0.46], 119: [0, 0.43056, 0.10764, 0, 0.66444], 120: [0, 0.43056, 0.12042, 0, 0.46389], 121: [0.19444, 0.43056, 0.08847, 0, 0.48555], 122: [0, 0.43056, 0.12292, 0, 0.40889], 126: [0.35, 0.31786, 0.11585, 0, 0.51111], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.66786, 0.10474, 0, 0.51111], 176: [0, 0.69444, 0, 0, 0.83129], 184: [0.17014, 0, 0, 0, 0.46], 198: [0, 0.68333, 0.12028, 0, 0.88277], 216: [0.04861, 0.73194, 0.09403, 0, 0.76666], 223: [0.19444, 0.69444, 0.10514, 0, 0.53666], 230: [0, 0.43056, 0.07514, 0, 0.71555], 248: [0.09722, 0.52778, 0.09194, 0, 0.51111], 338: [0, 0.68333, 0.12028, 0, 0.98499], 339: [0, 0.43056, 0.07514, 0, 0.71555], 710: [0, 0.69444, 0.06646, 0, 0.51111], 711: [0, 0.62847, 0.08295, 0, 0.51111], 713: [0, 0.56167, 0.10333, 0, 0.51111], 714: [0, 0.69444, 0.09694, 0, 0.51111], 715: [0, 0.69444, 0, 0, 0.51111], 728: [0, 0.69444, 0.10806, 0, 0.51111], 729: [0, 0.66786, 0.11752, 0, 0.30667], 730: [0, 0.69444, 0, 0, 0.83129], 732: [0, 0.66786, 0.11585, 0, 0.51111], 733: [0, 0.69444, 0.1225, 0, 0.51111], 915: [0, 0.68333, 0.13305, 0, 0.62722], 916: [0, 0.68333, 0, 0, 0.81777], 920: [0, 0.68333, 0.09403, 0, 0.76666], 923: [0, 0.68333, 0, 0, 0.69222], 926: [0, 0.68333, 0.15294, 0, 0.66444], 928: [0, 0.68333, 0.16389, 0, 0.74333], 931: [0, 0.68333, 0.12028, 0, 0.71555], 933: [0, 0.68333, 0.11111, 0, 0.76666], 934: [0, 0.68333, 0.05986, 0, 0.71555], 936: [0, 0.68333, 0.11111, 0, 0.76666], 937: [0, 0.68333, 0.10257, 0, 0.71555], 8211: [0, 0.43056, 0.09208, 0, 0.51111], 8212: [0, 0.43056, 0.09208, 0, 1.02222], 8216: [0, 0.69444, 0.12417, 0, 0.30667], 8217: [0, 0.69444, 0.12417, 0, 0.30667], 8220: [0, 0.69444, 0.1685, 0, 0.51444], 8221: [0, 0.69444, 0.06961, 0, 0.51444], 8463: [0, 0.68889, 0, 0, 0.54028] }, "Main-Regular": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.27778], 34: [0, 0.69444, 0, 0, 0.5], 35: [0.19444, 0.69444, 0, 0, 0.83334], 36: [0.05556, 0.75, 0, 0, 0.5], 37: [0.05556, 0.75, 0, 0, 0.83334], 38: [0, 0.69444, 0, 0, 0.77778], 39: [0, 0.69444, 0, 0, 0.27778], 40: [0.25, 0.75, 0, 0, 0.38889], 41: [0.25, 0.75, 0, 0, 0.38889], 42: [0, 0.75, 0, 0, 0.5], 43: [0.08333, 0.58333, 0, 0, 0.77778], 44: [0.19444, 0.10556, 0, 0, 0.27778], 45: [0, 0.43056, 0, 0, 0.33333], 46: [0, 0.10556, 0, 0, 0.27778], 47: [0.25, 0.75, 0, 0, 0.5], 48: [0, 0.64444, 0, 0, 0.5], 49: [0, 0.64444, 0, 0, 0.5], 50: [0, 0.64444, 0, 0, 0.5], 51: [0, 0.64444, 0, 0, 0.5], 52: [0, 0.64444, 0, 0, 0.5], 53: [0, 0.64444, 0, 0, 0.5], 54: [0, 0.64444, 0, 0, 0.5], 55: [0, 0.64444, 0, 0, 0.5], 56: [0, 0.64444, 0, 0, 0.5], 57: [0, 0.64444, 0, 0, 0.5], 58: [0, 0.43056, 0, 0, 0.27778], 59: [0.19444, 0.43056, 0, 0, 0.27778], 60: [0.0391, 0.5391, 0, 0, 0.77778], 61: [-0.13313, 0.36687, 0, 0, 0.77778], 62: [0.0391, 0.5391, 0, 0, 0.77778], 63: [0, 0.69444, 0, 0, 0.47222], 64: [0, 0.69444, 0, 0, 0.77778], 65: [0, 0.68333, 0, 0, 0.75], 66: [0, 0.68333, 0, 0, 0.70834], 67: [0, 0.68333, 0, 0, 0.72222], 68: [0, 0.68333, 0, 0, 0.76389], 69: [0, 0.68333, 0, 0, 0.68056], 70: [0, 0.68333, 0, 0, 0.65278], 71: [0, 0.68333, 0, 0, 0.78472], 72: [0, 0.68333, 0, 0, 0.75], 73: [0, 0.68333, 0, 0, 0.36111], 74: [0, 0.68333, 0, 0, 0.51389], 75: [0, 0.68333, 0, 0, 0.77778], 76: [0, 0.68333, 0, 0, 0.625], 77: [0, 0.68333, 0, 0, 0.91667], 78: [0, 0.68333, 0, 0, 0.75], 79: [0, 0.68333, 0, 0, 0.77778], 80: [0, 0.68333, 0, 0, 0.68056], 81: [0.19444, 0.68333, 0, 0, 0.77778], 82: [0, 0.68333, 0, 0, 0.73611], 83: [0, 0.68333, 0, 0, 0.55556], 84: [0, 0.68333, 0, 0, 0.72222], 85: [0, 0.68333, 0, 0, 0.75], 86: [0, 0.68333, 0.01389, 0, 0.75], 87: [0, 0.68333, 0.01389, 0, 1.02778], 88: [0, 0.68333, 0, 0, 0.75], 89: [0, 0.68333, 0.025, 0, 0.75], 90: [0, 0.68333, 0, 0, 0.61111], 91: [0.25, 0.75, 0, 0, 0.27778], 92: [0.25, 0.75, 0, 0, 0.5], 93: [0.25, 0.75, 0, 0, 0.27778], 94: [0, 0.69444, 0, 0, 0.5], 95: [0.31, 0.12056, 0.02778, 0, 0.5], 97: [0, 0.43056, 0, 0, 0.5], 98: [0, 0.69444, 0, 0, 0.55556], 99: [0, 0.43056, 0, 0, 0.44445], 100: [0, 0.69444, 0, 0, 0.55556], 101: [0, 0.43056, 0, 0, 0.44445], 102: [0, 0.69444, 0.07778, 0, 0.30556], 103: [0.19444, 0.43056, 0.01389, 0, 0.5], 104: [0, 0.69444, 0, 0, 0.55556], 105: [0, 0.66786, 0, 0, 0.27778], 106: [0.19444, 0.66786, 0, 0, 0.30556], 107: [0, 0.69444, 0, 0, 0.52778], 108: [0, 0.69444, 0, 0, 0.27778], 109: [0, 0.43056, 0, 0, 0.83334], 110: [0, 0.43056, 0, 0, 0.55556], 111: [0, 0.43056, 0, 0, 0.5], 112: [0.19444, 0.43056, 0, 0, 0.55556], 113: [0.19444, 0.43056, 0, 0, 0.52778], 114: [0, 0.43056, 0, 0, 0.39167], 115: [0, 0.43056, 0, 0, 0.39445], 116: [0, 0.61508, 0, 0, 0.38889], 117: [0, 0.43056, 0, 0, 0.55556], 118: [0, 0.43056, 0.01389, 0, 0.52778], 119: [0, 0.43056, 0.01389, 0, 0.72222], 120: [0, 0.43056, 0, 0, 0.52778], 121: [0.19444, 0.43056, 0.01389, 0, 0.52778], 122: [0, 0.43056, 0, 0, 0.44445], 123: [0.25, 0.75, 0, 0, 0.5], 124: [0.25, 0.75, 0, 0, 0.27778], 125: [0.25, 0.75, 0, 0, 0.5], 126: [0.35, 0.31786, 0, 0, 0.5], 160: [0, 0, 0, 0, 0.25], 163: [0, 0.69444, 0, 0, 0.76909], 167: [0.19444, 0.69444, 0, 0, 0.44445], 168: [0, 0.66786, 0, 0, 0.5], 172: [0, 0.43056, 0, 0, 0.66667], 176: [0, 0.69444, 0, 0, 0.75], 177: [0.08333, 0.58333, 0, 0, 0.77778], 182: [0.19444, 0.69444, 0, 0, 0.61111], 184: [0.17014, 0, 0, 0, 0.44445], 198: [0, 0.68333, 0, 0, 0.90278], 215: [0.08333, 0.58333, 0, 0, 0.77778], 216: [0.04861, 0.73194, 0, 0, 0.77778], 223: [0, 0.69444, 0, 0, 0.5], 230: [0, 0.43056, 0, 0, 0.72222], 247: [0.08333, 0.58333, 0, 0, 0.77778], 248: [0.09722, 0.52778, 0, 0, 0.5], 305: [0, 0.43056, 0, 0, 0.27778], 338: [0, 0.68333, 0, 0, 1.01389], 339: [0, 0.43056, 0, 0, 0.77778], 567: [0.19444, 0.43056, 0, 0, 0.30556], 710: [0, 0.69444, 0, 0, 0.5], 711: [0, 0.62847, 0, 0, 0.5], 713: [0, 0.56778, 0, 0, 0.5], 714: [0, 0.69444, 0, 0, 0.5], 715: [0, 0.69444, 0, 0, 0.5], 728: [0, 0.69444, 0, 0, 0.5], 729: [0, 0.66786, 0, 0, 0.27778], 730: [0, 0.69444, 0, 0, 0.75], 732: [0, 0.66786, 0, 0, 0.5], 733: [0, 0.69444, 0, 0, 0.5], 915: [0, 0.68333, 0, 0, 0.625], 916: [0, 0.68333, 0, 0, 0.83334], 920: [0, 0.68333, 0, 0, 0.77778], 923: [0, 0.68333, 0, 0, 0.69445], 926: [0, 0.68333, 0, 0, 0.66667], 928: [0, 0.68333, 0, 0, 0.75], 931: [0, 0.68333, 0, 0, 0.72222], 933: [0, 0.68333, 0, 0, 0.77778], 934: [0, 0.68333, 0, 0, 0.72222], 936: [0, 0.68333, 0, 0, 0.77778], 937: [0, 0.68333, 0, 0, 0.72222], 8211: [0, 0.43056, 0.02778, 0, 0.5], 8212: [0, 0.43056, 0.02778, 0, 1], 8216: [0, 0.69444, 0, 0, 0.27778], 8217: [0, 0.69444, 0, 0, 0.27778], 8220: [0, 0.69444, 0, 0, 0.5], 8221: [0, 0.69444, 0, 0, 0.5], 8224: [0.19444, 0.69444, 0, 0, 0.44445], 8225: [0.19444, 0.69444, 0, 0, 0.44445], 8230: [0, 0.123, 0, 0, 1.172], 8242: [0, 0.55556, 0, 0, 0.275], 8407: [0, 0.71444, 0.15382, 0, 0.5], 8463: [0, 0.68889, 0, 0, 0.54028], 8465: [0, 0.69444, 0, 0, 0.72222], 8467: [0, 0.69444, 0, 0.11111, 0.41667], 8472: [0.19444, 0.43056, 0, 0.11111, 0.63646], 8476: [0, 0.69444, 0, 0, 0.72222], 8501: [0, 0.69444, 0, 0, 0.61111], 8592: [-0.13313, 0.36687, 0, 0, 1], 8593: [0.19444, 0.69444, 0, 0, 0.5], 8594: [-0.13313, 0.36687, 0, 0, 1], 8595: [0.19444, 0.69444, 0, 0, 0.5], 8596: [-0.13313, 0.36687, 0, 0, 1], 8597: [0.25, 0.75, 0, 0, 0.5], 8598: [0.19444, 0.69444, 0, 0, 1], 8599: [0.19444, 0.69444, 0, 0, 1], 8600: [0.19444, 0.69444, 0, 0, 1], 8601: [0.19444, 0.69444, 0, 0, 1], 8614: [0.011, 0.511, 0, 0, 1], 8617: [0.011, 0.511, 0, 0, 1.126], 8618: [0.011, 0.511, 0, 0, 1.126], 8636: [-0.13313, 0.36687, 0, 0, 1], 8637: [-0.13313, 0.36687, 0, 0, 1], 8640: [-0.13313, 0.36687, 0, 0, 1], 8641: [-0.13313, 0.36687, 0, 0, 1], 8652: [0.011, 0.671, 0, 0, 1], 8656: [-0.13313, 0.36687, 0, 0, 1], 8657: [0.19444, 0.69444, 0, 0, 0.61111], 8658: [-0.13313, 0.36687, 0, 0, 1], 8659: [0.19444, 0.69444, 0, 0, 0.61111], 8660: [-0.13313, 0.36687, 0, 0, 1], 8661: [0.25, 0.75, 0, 0, 0.61111], 8704: [0, 0.69444, 0, 0, 0.55556], 8706: [0, 0.69444, 0.05556, 0.08334, 0.5309], 8707: [0, 0.69444, 0, 0, 0.55556], 8709: [0.05556, 0.75, 0, 0, 0.5], 8711: [0, 0.68333, 0, 0, 0.83334], 8712: [0.0391, 0.5391, 0, 0, 0.66667], 8715: [0.0391, 0.5391, 0, 0, 0.66667], 8722: [0.08333, 0.58333, 0, 0, 0.77778], 8723: [0.08333, 0.58333, 0, 0, 0.77778], 8725: [0.25, 0.75, 0, 0, 0.5], 8726: [0.25, 0.75, 0, 0, 0.5], 8727: [-0.03472, 0.46528, 0, 0, 0.5], 8728: [-0.05555, 0.44445, 0, 0, 0.5], 8729: [-0.05555, 0.44445, 0, 0, 0.5], 8730: [0.2, 0.8, 0, 0, 0.83334], 8733: [0, 0.43056, 0, 0, 0.77778], 8734: [0, 0.43056, 0, 0, 1], 8736: [0, 0.69224, 0, 0, 0.72222], 8739: [0.25, 0.75, 0, 0, 0.27778], 8741: [0.25, 0.75, 0, 0, 0.5], 8743: [0, 0.55556, 0, 0, 0.66667], 8744: [0, 0.55556, 0, 0, 0.66667], 8745: [0, 0.55556, 0, 0, 0.66667], 8746: [0, 0.55556, 0, 0, 0.66667], 8747: [0.19444, 0.69444, 0.11111, 0, 0.41667], 8764: [-0.13313, 0.36687, 0, 0, 0.77778], 8768: [0.19444, 0.69444, 0, 0, 0.27778], 8771: [-0.03625, 0.46375, 0, 0, 0.77778], 8773: [-0.022, 0.589, 0, 0, 0.778], 8776: [-0.01688, 0.48312, 0, 0, 0.77778], 8781: [-0.03625, 0.46375, 0, 0, 0.77778], 8784: [-0.133, 0.673, 0, 0, 0.778], 8801: [-0.03625, 0.46375, 0, 0, 0.77778], 8804: [0.13597, 0.63597, 0, 0, 0.77778], 8805: [0.13597, 0.63597, 0, 0, 0.77778], 8810: [0.0391, 0.5391, 0, 0, 1], 8811: [0.0391, 0.5391, 0, 0, 1], 8826: [0.0391, 0.5391, 0, 0, 0.77778], 8827: [0.0391, 0.5391, 0, 0, 0.77778], 8834: [0.0391, 0.5391, 0, 0, 0.77778], 8835: [0.0391, 0.5391, 0, 0, 0.77778], 8838: [0.13597, 0.63597, 0, 0, 0.77778], 8839: [0.13597, 0.63597, 0, 0, 0.77778], 8846: [0, 0.55556, 0, 0, 0.66667], 8849: [0.13597, 0.63597, 0, 0, 0.77778], 8850: [0.13597, 0.63597, 0, 0, 0.77778], 8851: [0, 0.55556, 0, 0, 0.66667], 8852: [0, 0.55556, 0, 0, 0.66667], 8853: [0.08333, 0.58333, 0, 0, 0.77778], 8854: [0.08333, 0.58333, 0, 0, 0.77778], 8855: [0.08333, 0.58333, 0, 0, 0.77778], 8856: [0.08333, 0.58333, 0, 0, 0.77778], 8857: [0.08333, 0.58333, 0, 0, 0.77778], 8866: [0, 0.69444, 0, 0, 0.61111], 8867: [0, 0.69444, 0, 0, 0.61111], 8868: [0, 0.69444, 0, 0, 0.77778], 8869: [0, 0.69444, 0, 0, 0.77778], 8872: [0.249, 0.75, 0, 0, 0.867], 8900: [-0.05555, 0.44445, 0, 0, 0.5], 8901: [-0.05555, 0.44445, 0, 0, 0.27778], 8902: [-0.03472, 0.46528, 0, 0, 0.5], 8904: [5e-3, 0.505, 0, 0, 0.9], 8942: [0.03, 0.903, 0, 0, 0.278], 8943: [-0.19, 0.313, 0, 0, 1.172], 8945: [-0.1, 0.823, 0, 0, 1.282], 8968: [0.25, 0.75, 0, 0, 0.44445], 8969: [0.25, 0.75, 0, 0, 0.44445], 8970: [0.25, 0.75, 0, 0, 0.44445], 8971: [0.25, 0.75, 0, 0, 0.44445], 8994: [-0.14236, 0.35764, 0, 0, 1], 8995: [-0.14236, 0.35764, 0, 0, 1], 9136: [0.244, 0.744, 0, 0, 0.412], 9137: [0.244, 0.745, 0, 0, 0.412], 9651: [0.19444, 0.69444, 0, 0, 0.88889], 9657: [-0.03472, 0.46528, 0, 0, 0.5], 9661: [0.19444, 0.69444, 0, 0, 0.88889], 9667: [-0.03472, 0.46528, 0, 0, 0.5], 9711: [0.19444, 0.69444, 0, 0, 1], 9824: [0.12963, 0.69444, 0, 0, 0.77778], 9825: [0.12963, 0.69444, 0, 0, 0.77778], 9826: [0.12963, 0.69444, 0, 0, 0.77778], 9827: [0.12963, 0.69444, 0, 0, 0.77778], 9837: [0, 0.75, 0, 0, 0.38889], 9838: [0.19444, 0.69444, 0, 0, 0.38889], 9839: [0.19444, 0.69444, 0, 0, 0.38889], 10216: [0.25, 0.75, 0, 0, 0.38889], 10217: [0.25, 0.75, 0, 0, 0.38889], 10222: [0.244, 0.744, 0, 0, 0.412], 10223: [0.244, 0.745, 0, 0, 0.412], 10229: [0.011, 0.511, 0, 0, 1.609], 10230: [0.011, 0.511, 0, 0, 1.638], 10231: [0.011, 0.511, 0, 0, 1.859], 10232: [0.024, 0.525, 0, 0, 1.609], 10233: [0.024, 0.525, 0, 0, 1.638], 10234: [0.024, 0.525, 0, 0, 1.858], 10236: [0.011, 0.511, 0, 0, 1.638], 10815: [0, 0.68333, 0, 0, 0.75], 10927: [0.13597, 0.63597, 0, 0, 0.77778], 10928: [0.13597, 0.63597, 0, 0, 0.77778], 57376: [0.19444, 0.69444, 0, 0, 0] }, "Math-BoldItalic": { 32: [0, 0, 0, 0, 0.25], 48: [0, 0.44444, 0, 0, 0.575], 49: [0, 0.44444, 0, 0, 0.575], 50: [0, 0.44444, 0, 0, 0.575], 51: [0.19444, 0.44444, 0, 0, 0.575], 52: [0.19444, 0.44444, 0, 0, 0.575], 53: [0.19444, 0.44444, 0, 0, 0.575], 54: [0, 0.64444, 0, 0, 0.575], 55: [0.19444, 0.44444, 0, 0, 0.575], 56: [0, 0.64444, 0, 0, 0.575], 57: [0.19444, 0.44444, 0, 0, 0.575], 65: [0, 0.68611, 0, 0, 0.86944], 66: [0, 0.68611, 0.04835, 0, 0.8664], 67: [0, 0.68611, 0.06979, 0, 0.81694], 68: [0, 0.68611, 0.03194, 0, 0.93812], 69: [0, 0.68611, 0.05451, 0, 0.81007], 70: [0, 0.68611, 0.15972, 0, 0.68889], 71: [0, 0.68611, 0, 0, 0.88673], 72: [0, 0.68611, 0.08229, 0, 0.98229], 73: [0, 0.68611, 0.07778, 0, 0.51111], 74: [0, 0.68611, 0.10069, 0, 0.63125], 75: [0, 0.68611, 0.06979, 0, 0.97118], 76: [0, 0.68611, 0, 0, 0.75555], 77: [0, 0.68611, 0.11424, 0, 1.14201], 78: [0, 0.68611, 0.11424, 0, 0.95034], 79: [0, 0.68611, 0.03194, 0, 0.83666], 80: [0, 0.68611, 0.15972, 0, 0.72309], 81: [0.19444, 0.68611, 0, 0, 0.86861], 82: [0, 0.68611, 421e-5, 0, 0.87235], 83: [0, 0.68611, 0.05382, 0, 0.69271], 84: [0, 0.68611, 0.15972, 0, 0.63663], 85: [0, 0.68611, 0.11424, 0, 0.80027], 86: [0, 0.68611, 0.25555, 0, 0.67778], 87: [0, 0.68611, 0.15972, 0, 1.09305], 88: [0, 0.68611, 0.07778, 0, 0.94722], 89: [0, 0.68611, 0.25555, 0, 0.67458], 90: [0, 0.68611, 0.06979, 0, 0.77257], 97: [0, 0.44444, 0, 0, 0.63287], 98: [0, 0.69444, 0, 0, 0.52083], 99: [0, 0.44444, 0, 0, 0.51342], 100: [0, 0.69444, 0, 0, 0.60972], 101: [0, 0.44444, 0, 0, 0.55361], 102: [0.19444, 0.69444, 0.11042, 0, 0.56806], 103: [0.19444, 0.44444, 0.03704, 0, 0.5449], 104: [0, 0.69444, 0, 0, 0.66759], 105: [0, 0.69326, 0, 0, 0.4048], 106: [0.19444, 0.69326, 0.0622, 0, 0.47083], 107: [0, 0.69444, 0.01852, 0, 0.6037], 108: [0, 0.69444, 88e-4, 0, 0.34815], 109: [0, 0.44444, 0, 0, 1.0324], 110: [0, 0.44444, 0, 0, 0.71296], 111: [0, 0.44444, 0, 0, 0.58472], 112: [0.19444, 0.44444, 0, 0, 0.60092], 113: [0.19444, 0.44444, 0.03704, 0, 0.54213], 114: [0, 0.44444, 0.03194, 0, 0.5287], 115: [0, 0.44444, 0, 0, 0.53125], 116: [0, 0.63492, 0, 0, 0.41528], 117: [0, 0.44444, 0, 0, 0.68102], 118: [0, 0.44444, 0.03704, 0, 0.56666], 119: [0, 0.44444, 0.02778, 0, 0.83148], 120: [0, 0.44444, 0, 0, 0.65903], 121: [0.19444, 0.44444, 0.03704, 0, 0.59028], 122: [0, 0.44444, 0.04213, 0, 0.55509], 160: [0, 0, 0, 0, 0.25], 915: [0, 0.68611, 0.15972, 0, 0.65694], 916: [0, 0.68611, 0, 0, 0.95833], 920: [0, 0.68611, 0.03194, 0, 0.86722], 923: [0, 0.68611, 0, 0, 0.80555], 926: [0, 0.68611, 0.07458, 0, 0.84125], 928: [0, 0.68611, 0.08229, 0, 0.98229], 931: [0, 0.68611, 0.05451, 0, 0.88507], 933: [0, 0.68611, 0.15972, 0, 0.67083], 934: [0, 0.68611, 0, 0, 0.76666], 936: [0, 0.68611, 0.11653, 0, 0.71402], 937: [0, 0.68611, 0.04835, 0, 0.8789], 945: [0, 0.44444, 0, 0, 0.76064], 946: [0.19444, 0.69444, 0.03403, 0, 0.65972], 947: [0.19444, 0.44444, 0.06389, 0, 0.59003], 948: [0, 0.69444, 0.03819, 0, 0.52222], 949: [0, 0.44444, 0, 0, 0.52882], 950: [0.19444, 0.69444, 0.06215, 0, 0.50833], 951: [0.19444, 0.44444, 0.03704, 0, 0.6], 952: [0, 0.69444, 0.03194, 0, 0.5618], 953: [0, 0.44444, 0, 0, 0.41204], 954: [0, 0.44444, 0, 0, 0.66759], 955: [0, 0.69444, 0, 0, 0.67083], 956: [0.19444, 0.44444, 0, 0, 0.70787], 957: [0, 0.44444, 0.06898, 0, 0.57685], 958: [0.19444, 0.69444, 0.03021, 0, 0.50833], 959: [0, 0.44444, 0, 0, 0.58472], 960: [0, 0.44444, 0.03704, 0, 0.68241], 961: [0.19444, 0.44444, 0, 0, 0.6118], 962: [0.09722, 0.44444, 0.07917, 0, 0.42361], 963: [0, 0.44444, 0.03704, 0, 0.68588], 964: [0, 0.44444, 0.13472, 0, 0.52083], 965: [0, 0.44444, 0.03704, 0, 0.63055], 966: [0.19444, 0.44444, 0, 0, 0.74722], 967: [0.19444, 0.44444, 0, 0, 0.71805], 968: [0.19444, 0.69444, 0.03704, 0, 0.75833], 969: [0, 0.44444, 0.03704, 0, 0.71782], 977: [0, 0.69444, 0, 0, 0.69155], 981: [0.19444, 0.69444, 0, 0, 0.7125], 982: [0, 0.44444, 0.03194, 0, 0.975], 1009: [0.19444, 0.44444, 0, 0, 0.6118], 1013: [0, 0.44444, 0, 0, 0.48333], 57649: [0, 0.44444, 0, 0, 0.39352], 57911: [0.19444, 0.44444, 0, 0, 0.43889] }, "Math-Italic": { 32: [0, 0, 0, 0, 0.25], 48: [0, 0.43056, 0, 0, 0.5], 49: [0, 0.43056, 0, 0, 0.5], 50: [0, 0.43056, 0, 0, 0.5], 51: [0.19444, 0.43056, 0, 0, 0.5], 52: [0.19444, 0.43056, 0, 0, 0.5], 53: [0.19444, 0.43056, 0, 0, 0.5], 54: [0, 0.64444, 0, 0, 0.5], 55: [0.19444, 0.43056, 0, 0, 0.5], 56: [0, 0.64444, 0, 0, 0.5], 57: [0.19444, 0.43056, 0, 0, 0.5], 65: [0, 0.68333, 0, 0.13889, 0.75], 66: [0, 0.68333, 0.05017, 0.08334, 0.75851], 67: [0, 0.68333, 0.07153, 0.08334, 0.71472], 68: [0, 0.68333, 0.02778, 0.05556, 0.82792], 69: [0, 0.68333, 0.05764, 0.08334, 0.7382], 70: [0, 0.68333, 0.13889, 0.08334, 0.64306], 71: [0, 0.68333, 0, 0.08334, 0.78625], 72: [0, 0.68333, 0.08125, 0.05556, 0.83125], 73: [0, 0.68333, 0.07847, 0.11111, 0.43958], 74: [0, 0.68333, 0.09618, 0.16667, 0.55451], 75: [0, 0.68333, 0.07153, 0.05556, 0.84931], 76: [0, 0.68333, 0, 0.02778, 0.68056], 77: [0, 0.68333, 0.10903, 0.08334, 0.97014], 78: [0, 0.68333, 0.10903, 0.08334, 0.80347], 79: [0, 0.68333, 0.02778, 0.08334, 0.76278], 80: [0, 0.68333, 0.13889, 0.08334, 0.64201], 81: [0.19444, 0.68333, 0, 0.08334, 0.79056], 82: [0, 0.68333, 773e-5, 0.08334, 0.75929], 83: [0, 0.68333, 0.05764, 0.08334, 0.6132], 84: [0, 0.68333, 0.13889, 0.08334, 0.58438], 85: [0, 0.68333, 0.10903, 0.02778, 0.68278], 86: [0, 0.68333, 0.22222, 0, 0.58333], 87: [0, 0.68333, 0.13889, 0, 0.94445], 88: [0, 0.68333, 0.07847, 0.08334, 0.82847], 89: [0, 0.68333, 0.22222, 0, 0.58056], 90: [0, 0.68333, 0.07153, 0.08334, 0.68264], 97: [0, 0.43056, 0, 0, 0.52859], 98: [0, 0.69444, 0, 0, 0.42917], 99: [0, 0.43056, 0, 0.05556, 0.43276], 100: [0, 0.69444, 0, 0.16667, 0.52049], 101: [0, 0.43056, 0, 0.05556, 0.46563], 102: [0.19444, 0.69444, 0.10764, 0.16667, 0.48959], 103: [0.19444, 0.43056, 0.03588, 0.02778, 0.47697], 104: [0, 0.69444, 0, 0, 0.57616], 105: [0, 0.65952, 0, 0, 0.34451], 106: [0.19444, 0.65952, 0.05724, 0, 0.41181], 107: [0, 0.69444, 0.03148, 0, 0.5206], 108: [0, 0.69444, 0.01968, 0.08334, 0.29838], 109: [0, 0.43056, 0, 0, 0.87801], 110: [0, 0.43056, 0, 0, 0.60023], 111: [0, 0.43056, 0, 0.05556, 0.48472], 112: [0.19444, 0.43056, 0, 0.08334, 0.50313], 113: [0.19444, 0.43056, 0.03588, 0.08334, 0.44641], 114: [0, 0.43056, 0.02778, 0.05556, 0.45116], 115: [0, 0.43056, 0, 0.05556, 0.46875], 116: [0, 0.61508, 0, 0.08334, 0.36111], 117: [0, 0.43056, 0, 0.02778, 0.57246], 118: [0, 0.43056, 0.03588, 0.02778, 0.48472], 119: [0, 0.43056, 0.02691, 0.08334, 0.71592], 120: [0, 0.43056, 0, 0.02778, 0.57153], 121: [0.19444, 0.43056, 0.03588, 0.05556, 0.49028], 122: [0, 0.43056, 0.04398, 0.05556, 0.46505], 160: [0, 0, 0, 0, 0.25], 915: [0, 0.68333, 0.13889, 0.08334, 0.61528], 916: [0, 0.68333, 0, 0.16667, 0.83334], 920: [0, 0.68333, 0.02778, 0.08334, 0.76278], 923: [0, 0.68333, 0, 0.16667, 0.69445], 926: [0, 0.68333, 0.07569, 0.08334, 0.74236], 928: [0, 0.68333, 0.08125, 0.05556, 0.83125], 931: [0, 0.68333, 0.05764, 0.08334, 0.77986], 933: [0, 0.68333, 0.13889, 0.05556, 0.58333], 934: [0, 0.68333, 0, 0.08334, 0.66667], 936: [0, 0.68333, 0.11, 0.05556, 0.61222], 937: [0, 0.68333, 0.05017, 0.08334, 0.7724], 945: [0, 0.43056, 37e-4, 0.02778, 0.6397], 946: [0.19444, 0.69444, 0.05278, 0.08334, 0.56563], 947: [0.19444, 0.43056, 0.05556, 0, 0.51773], 948: [0, 0.69444, 0.03785, 0.05556, 0.44444], 949: [0, 0.43056, 0, 0.08334, 0.46632], 950: [0.19444, 0.69444, 0.07378, 0.08334, 0.4375], 951: [0.19444, 0.43056, 0.03588, 0.05556, 0.49653], 952: [0, 0.69444, 0.02778, 0.08334, 0.46944], 953: [0, 0.43056, 0, 0.05556, 0.35394], 954: [0, 0.43056, 0, 0, 0.57616], 955: [0, 0.69444, 0, 0, 0.58334], 956: [0.19444, 0.43056, 0, 0.02778, 0.60255], 957: [0, 0.43056, 0.06366, 0.02778, 0.49398], 958: [0.19444, 0.69444, 0.04601, 0.11111, 0.4375], 959: [0, 0.43056, 0, 0.05556, 0.48472], 960: [0, 0.43056, 0.03588, 0, 0.57003], 961: [0.19444, 0.43056, 0, 0.08334, 0.51702], 962: [0.09722, 0.43056, 0.07986, 0.08334, 0.36285], 963: [0, 0.43056, 0.03588, 0, 0.57141], 964: [0, 0.43056, 0.1132, 0.02778, 0.43715], 965: [0, 0.43056, 0.03588, 0.02778, 0.54028], 966: [0.19444, 0.43056, 0, 0.08334, 0.65417], 967: [0.19444, 0.43056, 0, 0.05556, 0.62569], 968: [0.19444, 0.69444, 0.03588, 0.11111, 0.65139], 969: [0, 0.43056, 0.03588, 0, 0.62245], 977: [0, 0.69444, 0, 0.08334, 0.59144], 981: [0.19444, 0.69444, 0, 0.08334, 0.59583], 982: [0, 0.43056, 0.02778, 0, 0.82813], 1009: [0.19444, 0.43056, 0, 0.08334, 0.51702], 1013: [0, 0.43056, 0, 0.05556, 0.4059], 57649: [0, 0.43056, 0, 0.02778, 0.32246], 57911: [0.19444, 0.43056, 0, 0.08334, 0.38403] }, "SansSerif-Bold": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.36667], 34: [0, 0.69444, 0, 0, 0.55834], 35: [0.19444, 0.69444, 0, 0, 0.91667], 36: [0.05556, 0.75, 0, 0, 0.55], 37: [0.05556, 0.75, 0, 0, 1.02912], 38: [0, 0.69444, 0, 0, 0.83056], 39: [0, 0.69444, 0, 0, 0.30556], 40: [0.25, 0.75, 0, 0, 0.42778], 41: [0.25, 0.75, 0, 0, 0.42778], 42: [0, 0.75, 0, 0, 0.55], 43: [0.11667, 0.61667, 0, 0, 0.85556], 44: [0.10556, 0.13056, 0, 0, 0.30556], 45: [0, 0.45833, 0, 0, 0.36667], 46: [0, 0.13056, 0, 0, 0.30556], 47: [0.25, 0.75, 0, 0, 0.55], 48: [0, 0.69444, 0, 0, 0.55], 49: [0, 0.69444, 0, 0, 0.55], 50: [0, 0.69444, 0, 0, 0.55], 51: [0, 0.69444, 0, 0, 0.55], 52: [0, 0.69444, 0, 0, 0.55], 53: [0, 0.69444, 0, 0, 0.55], 54: [0, 0.69444, 0, 0, 0.55], 55: [0, 0.69444, 0, 0, 0.55], 56: [0, 0.69444, 0, 0, 0.55], 57: [0, 0.69444, 0, 0, 0.55], 58: [0, 0.45833, 0, 0, 0.30556], 59: [0.10556, 0.45833, 0, 0, 0.30556], 61: [-0.09375, 0.40625, 0, 0, 0.85556], 63: [0, 0.69444, 0, 0, 0.51945], 64: [0, 0.69444, 0, 0, 0.73334], 65: [0, 0.69444, 0, 0, 0.73334], 66: [0, 0.69444, 0, 0, 0.73334], 67: [0, 0.69444, 0, 0, 0.70278], 68: [0, 0.69444, 0, 0, 0.79445], 69: [0, 0.69444, 0, 0, 0.64167], 70: [0, 0.69444, 0, 0, 0.61111], 71: [0, 0.69444, 0, 0, 0.73334], 72: [0, 0.69444, 0, 0, 0.79445], 73: [0, 0.69444, 0, 0, 0.33056], 74: [0, 0.69444, 0, 0, 0.51945], 75: [0, 0.69444, 0, 0, 0.76389], 76: [0, 0.69444, 0, 0, 0.58056], 77: [0, 0.69444, 0, 0, 0.97778], 78: [0, 0.69444, 0, 0, 0.79445], 79: [0, 0.69444, 0, 0, 0.79445], 80: [0, 0.69444, 0, 0, 0.70278], 81: [0.10556, 0.69444, 0, 0, 0.79445], 82: [0, 0.69444, 0, 0, 0.70278], 83: [0, 0.69444, 0, 0, 0.61111], 84: [0, 0.69444, 0, 0, 0.73334], 85: [0, 0.69444, 0, 0, 0.76389], 86: [0, 0.69444, 0.01528, 0, 0.73334], 87: [0, 0.69444, 0.01528, 0, 1.03889], 88: [0, 0.69444, 0, 0, 0.73334], 89: [0, 0.69444, 0.0275, 0, 0.73334], 90: [0, 0.69444, 0, 0, 0.67223], 91: [0.25, 0.75, 0, 0, 0.34306], 93: [0.25, 0.75, 0, 0, 0.34306], 94: [0, 0.69444, 0, 0, 0.55], 95: [0.35, 0.10833, 0.03056, 0, 0.55], 97: [0, 0.45833, 0, 0, 0.525], 98: [0, 0.69444, 0, 0, 0.56111], 99: [0, 0.45833, 0, 0, 0.48889], 100: [0, 0.69444, 0, 0, 0.56111], 101: [0, 0.45833, 0, 0, 0.51111], 102: [0, 0.69444, 0.07639, 0, 0.33611], 103: [0.19444, 0.45833, 0.01528, 0, 0.55], 104: [0, 0.69444, 0, 0, 0.56111], 105: [0, 0.69444, 0, 0, 0.25556], 106: [0.19444, 0.69444, 0, 0, 0.28611], 107: [0, 0.69444, 0, 0, 0.53056], 108: [0, 0.69444, 0, 0, 0.25556], 109: [0, 0.45833, 0, 0, 0.86667], 110: [0, 0.45833, 0, 0, 0.56111], 111: [0, 0.45833, 0, 0, 0.55], 112: [0.19444, 0.45833, 0, 0, 0.56111], 113: [0.19444, 0.45833, 0, 0, 0.56111], 114: [0, 0.45833, 0.01528, 0, 0.37222], 115: [0, 0.45833, 0, 0, 0.42167], 116: [0, 0.58929, 0, 0, 0.40417], 117: [0, 0.45833, 0, 0, 0.56111], 118: [0, 0.45833, 0.01528, 0, 0.5], 119: [0, 0.45833, 0.01528, 0, 0.74445], 120: [0, 0.45833, 0, 0, 0.5], 121: [0.19444, 0.45833, 0.01528, 0, 0.5], 122: [0, 0.45833, 0, 0, 0.47639], 126: [0.35, 0.34444, 0, 0, 0.55], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.69444, 0, 0, 0.55], 176: [0, 0.69444, 0, 0, 0.73334], 180: [0, 0.69444, 0, 0, 0.55], 184: [0.17014, 0, 0, 0, 0.48889], 305: [0, 0.45833, 0, 0, 0.25556], 567: [0.19444, 0.45833, 0, 0, 0.28611], 710: [0, 0.69444, 0, 0, 0.55], 711: [0, 0.63542, 0, 0, 0.55], 713: [0, 0.63778, 0, 0, 0.55], 728: [0, 0.69444, 0, 0, 0.55], 729: [0, 0.69444, 0, 0, 0.30556], 730: [0, 0.69444, 0, 0, 0.73334], 732: [0, 0.69444, 0, 0, 0.55], 733: [0, 0.69444, 0, 0, 0.55], 915: [0, 0.69444, 0, 0, 0.58056], 916: [0, 0.69444, 0, 0, 0.91667], 920: [0, 0.69444, 0, 0, 0.85556], 923: [0, 0.69444, 0, 0, 0.67223], 926: [0, 0.69444, 0, 0, 0.73334], 928: [0, 0.69444, 0, 0, 0.79445], 931: [0, 0.69444, 0, 0, 0.79445], 933: [0, 0.69444, 0, 0, 0.85556], 934: [0, 0.69444, 0, 0, 0.79445], 936: [0, 0.69444, 0, 0, 0.85556], 937: [0, 0.69444, 0, 0, 0.79445], 8211: [0, 0.45833, 0.03056, 0, 0.55], 8212: [0, 0.45833, 0.03056, 0, 1.10001], 8216: [0, 0.69444, 0, 0, 0.30556], 8217: [0, 0.69444, 0, 0, 0.30556], 8220: [0, 0.69444, 0, 0, 0.55834], 8221: [0, 0.69444, 0, 0, 0.55834] }, "SansSerif-Italic": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0.05733, 0, 0.31945], 34: [0, 0.69444, 316e-5, 0, 0.5], 35: [0.19444, 0.69444, 0.05087, 0, 0.83334], 36: [0.05556, 0.75, 0.11156, 0, 0.5], 37: [0.05556, 0.75, 0.03126, 0, 0.83334], 38: [0, 0.69444, 0.03058, 0, 0.75834], 39: [0, 0.69444, 0.07816, 0, 0.27778], 40: [0.25, 0.75, 0.13164, 0, 0.38889], 41: [0.25, 0.75, 0.02536, 0, 0.38889], 42: [0, 0.75, 0.11775, 0, 0.5], 43: [0.08333, 0.58333, 0.02536, 0, 0.77778], 44: [0.125, 0.08333, 0, 0, 0.27778], 45: [0, 0.44444, 0.01946, 0, 0.33333], 46: [0, 0.08333, 0, 0, 0.27778], 47: [0.25, 0.75, 0.13164, 0, 0.5], 48: [0, 0.65556, 0.11156, 0, 0.5], 49: [0, 0.65556, 0.11156, 0, 0.5], 50: [0, 0.65556, 0.11156, 0, 0.5], 51: [0, 0.65556, 0.11156, 0, 0.5], 52: [0, 0.65556, 0.11156, 0, 0.5], 53: [0, 0.65556, 0.11156, 0, 0.5], 54: [0, 0.65556, 0.11156, 0, 0.5], 55: [0, 0.65556, 0.11156, 0, 0.5], 56: [0, 0.65556, 0.11156, 0, 0.5], 57: [0, 0.65556, 0.11156, 0, 0.5], 58: [0, 0.44444, 0.02502, 0, 0.27778], 59: [0.125, 0.44444, 0.02502, 0, 0.27778], 61: [-0.13, 0.37, 0.05087, 0, 0.77778], 63: [0, 0.69444, 0.11809, 0, 0.47222], 64: [0, 0.69444, 0.07555, 0, 0.66667], 65: [0, 0.69444, 0, 0, 0.66667], 66: [0, 0.69444, 0.08293, 0, 0.66667], 67: [0, 0.69444, 0.11983, 0, 0.63889], 68: [0, 0.69444, 0.07555, 0, 0.72223], 69: [0, 0.69444, 0.11983, 0, 0.59722], 70: [0, 0.69444, 0.13372, 0, 0.56945], 71: [0, 0.69444, 0.11983, 0, 0.66667], 72: [0, 0.69444, 0.08094, 0, 0.70834], 73: [0, 0.69444, 0.13372, 0, 0.27778], 74: [0, 0.69444, 0.08094, 0, 0.47222], 75: [0, 0.69444, 0.11983, 0, 0.69445], 76: [0, 0.69444, 0, 0, 0.54167], 77: [0, 0.69444, 0.08094, 0, 0.875], 78: [0, 0.69444, 0.08094, 0, 0.70834], 79: [0, 0.69444, 0.07555, 0, 0.73611], 80: [0, 0.69444, 0.08293, 0, 0.63889], 81: [0.125, 0.69444, 0.07555, 0, 0.73611], 82: [0, 0.69444, 0.08293, 0, 0.64584], 83: [0, 0.69444, 0.09205, 0, 0.55556], 84: [0, 0.69444, 0.13372, 0, 0.68056], 85: [0, 0.69444, 0.08094, 0, 0.6875], 86: [0, 0.69444, 0.1615, 0, 0.66667], 87: [0, 0.69444, 0.1615, 0, 0.94445], 88: [0, 0.69444, 0.13372, 0, 0.66667], 89: [0, 0.69444, 0.17261, 0, 0.66667], 90: [0, 0.69444, 0.11983, 0, 0.61111], 91: [0.25, 0.75, 0.15942, 0, 0.28889], 93: [0.25, 0.75, 0.08719, 0, 0.28889], 94: [0, 0.69444, 0.0799, 0, 0.5], 95: [0.35, 0.09444, 0.08616, 0, 0.5], 97: [0, 0.44444, 981e-5, 0, 0.48056], 98: [0, 0.69444, 0.03057, 0, 0.51667], 99: [0, 0.44444, 0.08336, 0, 0.44445], 100: [0, 0.69444, 0.09483, 0, 0.51667], 101: [0, 0.44444, 0.06778, 0, 0.44445], 102: [0, 0.69444, 0.21705, 0, 0.30556], 103: [0.19444, 0.44444, 0.10836, 0, 0.5], 104: [0, 0.69444, 0.01778, 0, 0.51667], 105: [0, 0.67937, 0.09718, 0, 0.23889], 106: [0.19444, 0.67937, 0.09162, 0, 0.26667], 107: [0, 0.69444, 0.08336, 0, 0.48889], 108: [0, 0.69444, 0.09483, 0, 0.23889], 109: [0, 0.44444, 0.01778, 0, 0.79445], 110: [0, 0.44444, 0.01778, 0, 0.51667], 111: [0, 0.44444, 0.06613, 0, 0.5], 112: [0.19444, 0.44444, 0.0389, 0, 0.51667], 113: [0.19444, 0.44444, 0.04169, 0, 0.51667], 114: [0, 0.44444, 0.10836, 0, 0.34167], 115: [0, 0.44444, 0.0778, 0, 0.38333], 116: [0, 0.57143, 0.07225, 0, 0.36111], 117: [0, 0.44444, 0.04169, 0, 0.51667], 118: [0, 0.44444, 0.10836, 0, 0.46111], 119: [0, 0.44444, 0.10836, 0, 0.68334], 120: [0, 0.44444, 0.09169, 0, 0.46111], 121: [0.19444, 0.44444, 0.10836, 0, 0.46111], 122: [0, 0.44444, 0.08752, 0, 0.43472], 126: [0.35, 0.32659, 0.08826, 0, 0.5], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.67937, 0.06385, 0, 0.5], 176: [0, 0.69444, 0, 0, 0.73752], 184: [0.17014, 0, 0, 0, 0.44445], 305: [0, 0.44444, 0.04169, 0, 0.23889], 567: [0.19444, 0.44444, 0.04169, 0, 0.26667], 710: [0, 0.69444, 0.0799, 0, 0.5], 711: [0, 0.63194, 0.08432, 0, 0.5], 713: [0, 0.60889, 0.08776, 0, 0.5], 714: [0, 0.69444, 0.09205, 0, 0.5], 715: [0, 0.69444, 0, 0, 0.5], 728: [0, 0.69444, 0.09483, 0, 0.5], 729: [0, 0.67937, 0.07774, 0, 0.27778], 730: [0, 0.69444, 0, 0, 0.73752], 732: [0, 0.67659, 0.08826, 0, 0.5], 733: [0, 0.69444, 0.09205, 0, 0.5], 915: [0, 0.69444, 0.13372, 0, 0.54167], 916: [0, 0.69444, 0, 0, 0.83334], 920: [0, 0.69444, 0.07555, 0, 0.77778], 923: [0, 0.69444, 0, 0, 0.61111], 926: [0, 0.69444, 0.12816, 0, 0.66667], 928: [0, 0.69444, 0.08094, 0, 0.70834], 931: [0, 0.69444, 0.11983, 0, 0.72222], 933: [0, 0.69444, 0.09031, 0, 0.77778], 934: [0, 0.69444, 0.04603, 0, 0.72222], 936: [0, 0.69444, 0.09031, 0, 0.77778], 937: [0, 0.69444, 0.08293, 0, 0.72222], 8211: [0, 0.44444, 0.08616, 0, 0.5], 8212: [0, 0.44444, 0.08616, 0, 1], 8216: [0, 0.69444, 0.07816, 0, 0.27778], 8217: [0, 0.69444, 0.07816, 0, 0.27778], 8220: [0, 0.69444, 0.14205, 0, 0.5], 8221: [0, 0.69444, 316e-5, 0, 0.5] }, "SansSerif-Regular": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.31945], 34: [0, 0.69444, 0, 0, 0.5], 35: [0.19444, 0.69444, 0, 0, 0.83334], 36: [0.05556, 0.75, 0, 0, 0.5], 37: [0.05556, 0.75, 0, 0, 0.83334], 38: [0, 0.69444, 0, 0, 0.75834], 39: [0, 0.69444, 0, 0, 0.27778], 40: [0.25, 0.75, 0, 0, 0.38889], 41: [0.25, 0.75, 0, 0, 0.38889], 42: [0, 0.75, 0, 0, 0.5], 43: [0.08333, 0.58333, 0, 0, 0.77778], 44: [0.125, 0.08333, 0, 0, 0.27778], 45: [0, 0.44444, 0, 0, 0.33333], 46: [0, 0.08333, 0, 0, 0.27778], 47: [0.25, 0.75, 0, 0, 0.5], 48: [0, 0.65556, 0, 0, 0.5], 49: [0, 0.65556, 0, 0, 0.5], 50: [0, 0.65556, 0, 0, 0.5], 51: [0, 0.65556, 0, 0, 0.5], 52: [0, 0.65556, 0, 0, 0.5], 53: [0, 0.65556, 0, 0, 0.5], 54: [0, 0.65556, 0, 0, 0.5], 55: [0, 0.65556, 0, 0, 0.5], 56: [0, 0.65556, 0, 0, 0.5], 57: [0, 0.65556, 0, 0, 0.5], 58: [0, 0.44444, 0, 0, 0.27778], 59: [0.125, 0.44444, 0, 0, 0.27778], 61: [-0.13, 0.37, 0, 0, 0.77778], 63: [0, 0.69444, 0, 0, 0.47222], 64: [0, 0.69444, 0, 0, 0.66667], 65: [0, 0.69444, 0, 0, 0.66667], 66: [0, 0.69444, 0, 0, 0.66667], 67: [0, 0.69444, 0, 0, 0.63889], 68: [0, 0.69444, 0, 0, 0.72223], 69: [0, 0.69444, 0, 0, 0.59722], 70: [0, 0.69444, 0, 0, 0.56945], 71: [0, 0.69444, 0, 0, 0.66667], 72: [0, 0.69444, 0, 0, 0.70834], 73: [0, 0.69444, 0, 0, 0.27778], 74: [0, 0.69444, 0, 0, 0.47222], 75: [0, 0.69444, 0, 0, 0.69445], 76: [0, 0.69444, 0, 0, 0.54167], 77: [0, 0.69444, 0, 0, 0.875], 78: [0, 0.69444, 0, 0, 0.70834], 79: [0, 0.69444, 0, 0, 0.73611], 80: [0, 0.69444, 0, 0, 0.63889], 81: [0.125, 0.69444, 0, 0, 0.73611], 82: [0, 0.69444, 0, 0, 0.64584], 83: [0, 0.69444, 0, 0, 0.55556], 84: [0, 0.69444, 0, 0, 0.68056], 85: [0, 0.69444, 0, 0, 0.6875], 86: [0, 0.69444, 0.01389, 0, 0.66667], 87: [0, 0.69444, 0.01389, 0, 0.94445], 88: [0, 0.69444, 0, 0, 0.66667], 89: [0, 0.69444, 0.025, 0, 0.66667], 90: [0, 0.69444, 0, 0, 0.61111], 91: [0.25, 0.75, 0, 0, 0.28889], 93: [0.25, 0.75, 0, 0, 0.28889], 94: [0, 0.69444, 0, 0, 0.5], 95: [0.35, 0.09444, 0.02778, 0, 0.5], 97: [0, 0.44444, 0, 0, 0.48056], 98: [0, 0.69444, 0, 0, 0.51667], 99: [0, 0.44444, 0, 0, 0.44445], 100: [0, 0.69444, 0, 0, 0.51667], 101: [0, 0.44444, 0, 0, 0.44445], 102: [0, 0.69444, 0.06944, 0, 0.30556], 103: [0.19444, 0.44444, 0.01389, 0, 0.5], 104: [0, 0.69444, 0, 0, 0.51667], 105: [0, 0.67937, 0, 0, 0.23889], 106: [0.19444, 0.67937, 0, 0, 0.26667], 107: [0, 0.69444, 0, 0, 0.48889], 108: [0, 0.69444, 0, 0, 0.23889], 109: [0, 0.44444, 0, 0, 0.79445], 110: [0, 0.44444, 0, 0, 0.51667], 111: [0, 0.44444, 0, 0, 0.5], 112: [0.19444, 0.44444, 0, 0, 0.51667], 113: [0.19444, 0.44444, 0, 0, 0.51667], 114: [0, 0.44444, 0.01389, 0, 0.34167], 115: [0, 0.44444, 0, 0, 0.38333], 116: [0, 0.57143, 0, 0, 0.36111], 117: [0, 0.44444, 0, 0, 0.51667], 118: [0, 0.44444, 0.01389, 0, 0.46111], 119: [0, 0.44444, 0.01389, 0, 0.68334], 120: [0, 0.44444, 0, 0, 0.46111], 121: [0.19444, 0.44444, 0.01389, 0, 0.46111], 122: [0, 0.44444, 0, 0, 0.43472], 126: [0.35, 0.32659, 0, 0, 0.5], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.67937, 0, 0, 0.5], 176: [0, 0.69444, 0, 0, 0.66667], 184: [0.17014, 0, 0, 0, 0.44445], 305: [0, 0.44444, 0, 0, 0.23889], 567: [0.19444, 0.44444, 0, 0, 0.26667], 710: [0, 0.69444, 0, 0, 0.5], 711: [0, 0.63194, 0, 0, 0.5], 713: [0, 0.60889, 0, 0, 0.5], 714: [0, 0.69444, 0, 0, 0.5], 715: [0, 0.69444, 0, 0, 0.5], 728: [0, 0.69444, 0, 0, 0.5], 729: [0, 0.67937, 0, 0, 0.27778], 730: [0, 0.69444, 0, 0, 0.66667], 732: [0, 0.67659, 0, 0, 0.5], 733: [0, 0.69444, 0, 0, 0.5], 915: [0, 0.69444, 0, 0, 0.54167], 916: [0, 0.69444, 0, 0, 0.83334], 920: [0, 0.69444, 0, 0, 0.77778], 923: [0, 0.69444, 0, 0, 0.61111], 926: [0, 0.69444, 0, 0, 0.66667], 928: [0, 0.69444, 0, 0, 0.70834], 931: [0, 0.69444, 0, 0, 0.72222], 933: [0, 0.69444, 0, 0, 0.77778], 934: [0, 0.69444, 0, 0, 0.72222], 936: [0, 0.69444, 0, 0, 0.77778], 937: [0, 0.69444, 0, 0, 0.72222], 8211: [0, 0.44444, 0.02778, 0, 0.5], 8212: [0, 0.44444, 0.02778, 0, 1], 8216: [0, 0.69444, 0, 0, 0.27778], 8217: [0, 0.69444, 0, 0, 0.27778], 8220: [0, 0.69444, 0, 0, 0.5], 8221: [0, 0.69444, 0, 0, 0.5] }, "Script-Regular": { 32: [0, 0, 0, 0, 0.25], 65: [0, 0.7, 0.22925, 0, 0.80253], 66: [0, 0.7, 0.04087, 0, 0.90757], 67: [0, 0.7, 0.1689, 0, 0.66619], 68: [0, 0.7, 0.09371, 0, 0.77443], 69: [0, 0.7, 0.18583, 0, 0.56162], 70: [0, 0.7, 0.13634, 0, 0.89544], 71: [0, 0.7, 0.17322, 0, 0.60961], 72: [0, 0.7, 0.29694, 0, 0.96919], 73: [0, 0.7, 0.19189, 0, 0.80907], 74: [0.27778, 0.7, 0.19189, 0, 1.05159], 75: [0, 0.7, 0.31259, 0, 0.91364], 76: [0, 0.7, 0.19189, 0, 0.87373], 77: [0, 0.7, 0.15981, 0, 1.08031], 78: [0, 0.7, 0.3525, 0, 0.9015], 79: [0, 0.7, 0.08078, 0, 0.73787], 80: [0, 0.7, 0.08078, 0, 1.01262], 81: [0, 0.7, 0.03305, 0, 0.88282], 82: [0, 0.7, 0.06259, 0, 0.85], 83: [0, 0.7, 0.19189, 0, 0.86767], 84: [0, 0.7, 0.29087, 0, 0.74697], 85: [0, 0.7, 0.25815, 0, 0.79996], 86: [0, 0.7, 0.27523, 0, 0.62204], 87: [0, 0.7, 0.27523, 0, 0.80532], 88: [0, 0.7, 0.26006, 0, 0.94445], 89: [0, 0.7, 0.2939, 0, 0.70961], 90: [0, 0.7, 0.24037, 0, 0.8212], 160: [0, 0, 0, 0, 0.25] }, "Size1-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [0.35001, 0.85, 0, 0, 0.45834], 41: [0.35001, 0.85, 0, 0, 0.45834], 47: [0.35001, 0.85, 0, 0, 0.57778], 91: [0.35001, 0.85, 0, 0, 0.41667], 92: [0.35001, 0.85, 0, 0, 0.57778], 93: [0.35001, 0.85, 0, 0, 0.41667], 123: [0.35001, 0.85, 0, 0, 0.58334], 125: [0.35001, 0.85, 0, 0, 0.58334], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.72222, 0, 0, 0.55556], 732: [0, 0.72222, 0, 0, 0.55556], 770: [0, 0.72222, 0, 0, 0.55556], 771: [0, 0.72222, 0, 0, 0.55556], 8214: [-99e-5, 0.601, 0, 0, 0.77778], 8593: [1e-5, 0.6, 0, 0, 0.66667], 8595: [1e-5, 0.6, 0, 0, 0.66667], 8657: [1e-5, 0.6, 0, 0, 0.77778], 8659: [1e-5, 0.6, 0, 0, 0.77778], 8719: [0.25001, 0.75, 0, 0, 0.94445], 8720: [0.25001, 0.75, 0, 0, 0.94445], 8721: [0.25001, 0.75, 0, 0, 1.05556], 8730: [0.35001, 0.85, 0, 0, 1], 8739: [-599e-5, 0.606, 0, 0, 0.33333], 8741: [-599e-5, 0.606, 0, 0, 0.55556], 8747: [0.30612, 0.805, 0.19445, 0, 0.47222], 8748: [0.306, 0.805, 0.19445, 0, 0.47222], 8749: [0.306, 0.805, 0.19445, 0, 0.47222], 8750: [0.30612, 0.805, 0.19445, 0, 0.47222], 8896: [0.25001, 0.75, 0, 0, 0.83334], 8897: [0.25001, 0.75, 0, 0, 0.83334], 8898: [0.25001, 0.75, 0, 0, 0.83334], 8899: [0.25001, 0.75, 0, 0, 0.83334], 8968: [0.35001, 0.85, 0, 0, 0.47222], 8969: [0.35001, 0.85, 0, 0, 0.47222], 8970: [0.35001, 0.85, 0, 0, 0.47222], 8971: [0.35001, 0.85, 0, 0, 0.47222], 9168: [-99e-5, 0.601, 0, 0, 0.66667], 10216: [0.35001, 0.85, 0, 0, 0.47222], 10217: [0.35001, 0.85, 0, 0, 0.47222], 10752: [0.25001, 0.75, 0, 0, 1.11111], 10753: [0.25001, 0.75, 0, 0, 1.11111], 10754: [0.25001, 0.75, 0, 0, 1.11111], 10756: [0.25001, 0.75, 0, 0, 0.83334], 10758: [0.25001, 0.75, 0, 0, 0.83334] }, "Size2-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [0.65002, 1.15, 0, 0, 0.59722], 41: [0.65002, 1.15, 0, 0, 0.59722], 47: [0.65002, 1.15, 0, 0, 0.81111], 91: [0.65002, 1.15, 0, 0, 0.47222], 92: [0.65002, 1.15, 0, 0, 0.81111], 93: [0.65002, 1.15, 0, 0, 0.47222], 123: [0.65002, 1.15, 0, 0, 0.66667], 125: [0.65002, 1.15, 0, 0, 0.66667], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.75, 0, 0, 1], 732: [0, 0.75, 0, 0, 1], 770: [0, 0.75, 0, 0, 1], 771: [0, 0.75, 0, 0, 1], 8719: [0.55001, 1.05, 0, 0, 1.27778], 8720: [0.55001, 1.05, 0, 0, 1.27778], 8721: [0.55001, 1.05, 0, 0, 1.44445], 8730: [0.65002, 1.15, 0, 0, 1], 8747: [0.86225, 1.36, 0.44445, 0, 0.55556], 8748: [0.862, 1.36, 0.44445, 0, 0.55556], 8749: [0.862, 1.36, 0.44445, 0, 0.55556], 8750: [0.86225, 1.36, 0.44445, 0, 0.55556], 8896: [0.55001, 1.05, 0, 0, 1.11111], 8897: [0.55001, 1.05, 0, 0, 1.11111], 8898: [0.55001, 1.05, 0, 0, 1.11111], 8899: [0.55001, 1.05, 0, 0, 1.11111], 8968: [0.65002, 1.15, 0, 0, 0.52778], 8969: [0.65002, 1.15, 0, 0, 0.52778], 8970: [0.65002, 1.15, 0, 0, 0.52778], 8971: [0.65002, 1.15, 0, 0, 0.52778], 10216: [0.65002, 1.15, 0, 0, 0.61111], 10217: [0.65002, 1.15, 0, 0, 0.61111], 10752: [0.55001, 1.05, 0, 0, 1.51112], 10753: [0.55001, 1.05, 0, 0, 1.51112], 10754: [0.55001, 1.05, 0, 0, 1.51112], 10756: [0.55001, 1.05, 0, 0, 1.11111], 10758: [0.55001, 1.05, 0, 0, 1.11111] }, "Size3-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [0.95003, 1.45, 0, 0, 0.73611], 41: [0.95003, 1.45, 0, 0, 0.73611], 47: [0.95003, 1.45, 0, 0, 1.04445], 91: [0.95003, 1.45, 0, 0, 0.52778], 92: [0.95003, 1.45, 0, 0, 1.04445], 93: [0.95003, 1.45, 0, 0, 0.52778], 123: [0.95003, 1.45, 0, 0, 0.75], 125: [0.95003, 1.45, 0, 0, 0.75], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.75, 0, 0, 1.44445], 732: [0, 0.75, 0, 0, 1.44445], 770: [0, 0.75, 0, 0, 1.44445], 771: [0, 0.75, 0, 0, 1.44445], 8730: [0.95003, 1.45, 0, 0, 1], 8968: [0.95003, 1.45, 0, 0, 0.58334], 8969: [0.95003, 1.45, 0, 0, 0.58334], 8970: [0.95003, 1.45, 0, 0, 0.58334], 8971: [0.95003, 1.45, 0, 0, 0.58334], 10216: [0.95003, 1.45, 0, 0, 0.75], 10217: [0.95003, 1.45, 0, 0, 0.75] }, "Size4-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [1.25003, 1.75, 0, 0, 0.79167], 41: [1.25003, 1.75, 0, 0, 0.79167], 47: [1.25003, 1.75, 0, 0, 1.27778], 91: [1.25003, 1.75, 0, 0, 0.58334], 92: [1.25003, 1.75, 0, 0, 1.27778], 93: [1.25003, 1.75, 0, 0, 0.58334], 123: [1.25003, 1.75, 0, 0, 0.80556], 125: [1.25003, 1.75, 0, 0, 0.80556], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.825, 0, 0, 1.8889], 732: [0, 0.825, 0, 0, 1.8889], 770: [0, 0.825, 0, 0, 1.8889], 771: [0, 0.825, 0, 0, 1.8889], 8730: [1.25003, 1.75, 0, 0, 1], 8968: [1.25003, 1.75, 0, 0, 0.63889], 8969: [1.25003, 1.75, 0, 0, 0.63889], 8970: [1.25003, 1.75, 0, 0, 0.63889], 8971: [1.25003, 1.75, 0, 0, 0.63889], 9115: [0.64502, 1.155, 0, 0, 0.875], 9116: [1e-5, 0.6, 0, 0, 0.875], 9117: [0.64502, 1.155, 0, 0, 0.875], 9118: [0.64502, 1.155, 0, 0, 0.875], 9119: [1e-5, 0.6, 0, 0, 0.875], 9120: [0.64502, 1.155, 0, 0, 0.875], 9121: [0.64502, 1.155, 0, 0, 0.66667], 9122: [-99e-5, 0.601, 0, 0, 0.66667], 9123: [0.64502, 1.155, 0, 0, 0.66667], 9124: [0.64502, 1.155, 0, 0, 0.66667], 9125: [-99e-5, 0.601, 0, 0, 0.66667], 9126: [0.64502, 1.155, 0, 0, 0.66667], 9127: [1e-5, 0.9, 0, 0, 0.88889], 9128: [0.65002, 1.15, 0, 0, 0.88889], 9129: [0.90001, 0, 0, 0, 0.88889], 9130: [0, 0.3, 0, 0, 0.88889], 9131: [1e-5, 0.9, 0, 0, 0.88889], 9132: [0.65002, 1.15, 0, 0, 0.88889], 9133: [0.90001, 0, 0, 0, 0.88889], 9143: [0.88502, 0.915, 0, 0, 1.05556], 10216: [1.25003, 1.75, 0, 0, 0.80556], 10217: [1.25003, 1.75, 0, 0, 0.80556], 57344: [-499e-5, 0.605, 0, 0, 1.05556], 57345: [-499e-5, 0.605, 0, 0, 1.05556], 57680: [0, 0.12, 0, 0, 0.45], 57681: [0, 0.12, 0, 0, 0.45], 57682: [0, 0.12, 0, 0, 0.45], 57683: [0, 0.12, 0, 0, 0.45] }, "Typewriter-Regular": { 32: [0, 0, 0, 0, 0.525], 33: [0, 0.61111, 0, 0, 0.525], 34: [0, 0.61111, 0, 0, 0.525], 35: [0, 0.61111, 0, 0, 0.525], 36: [0.08333, 0.69444, 0, 0, 0.525], 37: [0.08333, 0.69444, 0, 0, 0.525], 38: [0, 0.61111, 0, 0, 0.525], 39: [0, 0.61111, 0, 0, 0.525], 40: [0.08333, 0.69444, 0, 0, 0.525], 41: [0.08333, 0.69444, 0, 0, 0.525], 42: [0, 0.52083, 0, 0, 0.525], 43: [-0.08056, 0.53055, 0, 0, 0.525], 44: [0.13889, 0.125, 0, 0, 0.525], 45: [-0.08056, 0.53055, 0, 0, 0.525], 46: [0, 0.125, 0, 0, 0.525], 47: [0.08333, 0.69444, 0, 0, 0.525], 48: [0, 0.61111, 0, 0, 0.525], 49: [0, 0.61111, 0, 0, 0.525], 50: [0, 0.61111, 0, 0, 0.525], 51: [0, 0.61111, 0, 0, 0.525], 52: [0, 0.61111, 0, 0, 0.525], 53: [0, 0.61111, 0, 0, 0.525], 54: [0, 0.61111, 0, 0, 0.525], 55: [0, 0.61111, 0, 0, 0.525], 56: [0, 0.61111, 0, 0, 0.525], 57: [0, 0.61111, 0, 0, 0.525], 58: [0, 0.43056, 0, 0, 0.525], 59: [0.13889, 0.43056, 0, 0, 0.525], 60: [-0.05556, 0.55556, 0, 0, 0.525], 61: [-0.19549, 0.41562, 0, 0, 0.525], 62: [-0.05556, 0.55556, 0, 0, 0.525], 63: [0, 0.61111, 0, 0, 0.525], 64: [0, 0.61111, 0, 0, 0.525], 65: [0, 0.61111, 0, 0, 0.525], 66: [0, 0.61111, 0, 0, 0.525], 67: [0, 0.61111, 0, 0, 0.525], 68: [0, 0.61111, 0, 0, 0.525], 69: [0, 0.61111, 0, 0, 0.525], 70: [0, 0.61111, 0, 0, 0.525], 71: [0, 0.61111, 0, 0, 0.525], 72: [0, 0.61111, 0, 0, 0.525], 73: [0, 0.61111, 0, 0, 0.525], 74: [0, 0.61111, 0, 0, 0.525], 75: [0, 0.61111, 0, 0, 0.525], 76: [0, 0.61111, 0, 0, 0.525], 77: [0, 0.61111, 0, 0, 0.525], 78: [0, 0.61111, 0, 0, 0.525], 79: [0, 0.61111, 0, 0, 0.525], 80: [0, 0.61111, 0, 0, 0.525], 81: [0.13889, 0.61111, 0, 0, 0.525], 82: [0, 0.61111, 0, 0, 0.525], 83: [0, 0.61111, 0, 0, 0.525], 84: [0, 0.61111, 0, 0, 0.525], 85: [0, 0.61111, 0, 0, 0.525], 86: [0, 0.61111, 0, 0, 0.525], 87: [0, 0.61111, 0, 0, 0.525], 88: [0, 0.61111, 0, 0, 0.525], 89: [0, 0.61111, 0, 0, 0.525], 90: [0, 0.61111, 0, 0, 0.525], 91: [0.08333, 0.69444, 0, 0, 0.525], 92: [0.08333, 0.69444, 0, 0, 0.525], 93: [0.08333, 0.69444, 0, 0, 0.525], 94: [0, 0.61111, 0, 0, 0.525], 95: [0.09514, 0, 0, 0, 0.525], 96: [0, 0.61111, 0, 0, 0.525], 97: [0, 0.43056, 0, 0, 0.525], 98: [0, 0.61111, 0, 0, 0.525], 99: [0, 0.43056, 0, 0, 0.525], 100: [0, 0.61111, 0, 0, 0.525], 101: [0, 0.43056, 0, 0, 0.525], 102: [0, 0.61111, 0, 0, 0.525], 103: [0.22222, 0.43056, 0, 0, 0.525], 104: [0, 0.61111, 0, 0, 0.525], 105: [0, 0.61111, 0, 0, 0.525], 106: [0.22222, 0.61111, 0, 0, 0.525], 107: [0, 0.61111, 0, 0, 0.525], 108: [0, 0.61111, 0, 0, 0.525], 109: [0, 0.43056, 0, 0, 0.525], 110: [0, 0.43056, 0, 0, 0.525], 111: [0, 0.43056, 0, 0, 0.525], 112: [0.22222, 0.43056, 0, 0, 0.525], 113: [0.22222, 0.43056, 0, 0, 0.525], 114: [0, 0.43056, 0, 0, 0.525], 115: [0, 0.43056, 0, 0, 0.525], 116: [0, 0.55358, 0, 0, 0.525], 117: [0, 0.43056, 0, 0, 0.525], 118: [0, 0.43056, 0, 0, 0.525], 119: [0, 0.43056, 0, 0, 0.525], 120: [0, 0.43056, 0, 0, 0.525], 121: [0.22222, 0.43056, 0, 0, 0.525], 122: [0, 0.43056, 0, 0, 0.525], 123: [0.08333, 0.69444, 0, 0, 0.525], 124: [0.08333, 0.69444, 0, 0, 0.525], 125: [0.08333, 0.69444, 0, 0, 0.525], 126: [0, 0.61111, 0, 0, 0.525], 127: [0, 0.61111, 0, 0, 0.525], 160: [0, 0, 0, 0, 0.525], 176: [0, 0.61111, 0, 0, 0.525], 184: [0.19445, 0, 0, 0, 0.525], 305: [0, 0.43056, 0, 0, 0.525], 567: [0.22222, 0.43056, 0, 0, 0.525], 711: [0, 0.56597, 0, 0, 0.525], 713: [0, 0.56555, 0, 0, 0.525], 714: [0, 0.61111, 0, 0, 0.525], 715: [0, 0.61111, 0, 0, 0.525], 728: [0, 0.61111, 0, 0, 0.525], 730: [0, 0.61111, 0, 0, 0.525], 770: [0, 0.61111, 0, 0, 0.525], 771: [0, 0.61111, 0, 0, 0.525], 776: [0, 0.61111, 0, 0, 0.525], 915: [0, 0.61111, 0, 0, 0.525], 916: [0, 0.61111, 0, 0, 0.525], 920: [0, 0.61111, 0, 0, 0.525], 923: [0, 0.61111, 0, 0, 0.525], 926: [0, 0.61111, 0, 0, 0.525], 928: [0, 0.61111, 0, 0, 0.525], 931: [0, 0.61111, 0, 0, 0.525], 933: [0, 0.61111, 0, 0, 0.525], 934: [0, 0.61111, 0, 0, 0.525], 936: [0, 0.61111, 0, 0, 0.525], 937: [0, 0.61111, 0, 0, 0.525], 8216: [0, 0.61111, 0, 0, 0.525], 8217: [0, 0.61111, 0, 0, 0.525], 8242: [0, 0.61111, 0, 0, 0.525], 9251: [0.11111, 0.21944, 0, 0, 0.525] } }, f1 = { slant: [0.25, 0.25, 0.25], space: [0, 0, 0], stretch: [0, 0, 0], shrink: [0, 0, 0], xHeight: [0.431, 0.431, 0.431], quad: [1, 1.171, 1.472], extraSpace: [0, 0, 0], num1: [0.677, 0.732, 0.925], num2: [0.394, 0.384, 0.387], num3: [0.444, 0.471, 0.504], denom1: [0.686, 0.752, 1.025], denom2: [0.345, 0.344, 0.532], sup1: [0.413, 0.503, 0.504], sup2: [0.363, 0.431, 0.404], sup3: [0.289, 0.286, 0.294], sub1: [0.15, 0.143, 0.2], sub2: [0.247, 0.286, 0.4], supDrop: [0.386, 0.353, 0.494], subDrop: [0.05, 0.071, 0.1], delim1: [2.39, 1.7, 1.98], delim2: [1.01, 1.157, 1.42], axisHeight: [0.25, 0.25, 0.25], defaultRuleThickness: [0.04, 0.049, 0.049], bigOpSpacing1: [0.111, 0.111, 0.111], bigOpSpacing2: [0.166, 0.166, 0.166], bigOpSpacing3: [0.2, 0.2, 0.2], bigOpSpacing4: [0.6, 0.611, 0.611], bigOpSpacing5: [0.1, 0.143, 0.143], sqrtRuleThickness: [0.04, 0.04, 0.04], ptPerEm: [10, 10, 10], doubleRuleSep: [0.2, 0.2, 0.2], arrayRuleWidth: [0.04, 0.04, 0.04], fboxsep: [0.3, 0.3, 0.3], fboxrule: [0.04, 0.04, 0.04] }, s4 = { \u00C5: "A", \u00D0: "D", \u00DE: "o", \u00E5: "a", \u00F0: "d", \u00FE: "o", \u0410: "A", \u0411: "B", \u0412: "B", \u0413: "F", \u0414: "A", \u0415: "E", \u0416: "K", \u0417: "3", \u0418: "N", \u0419: "N", \u041A: "K", \u041B: "N", \u041C: "M", \u041D: "H", \u041E: "O", \u041F: "N", \u0420: "P", \u0421: "C", \u0422: "T", \u0423: "y", \u0424: "O", \u0425: "X", \u0426: "U", \u0427: "h", \u0428: "W", \u0429: "W", \u042A: "B", \u042B: "X", \u042C: "B", \u042D: "3", \u042E: "X", \u042F: "R", \u0430: "a", \u0431: "b", \u0432: "a", \u0433: "r", \u0434: "y", \u0435: "e", \u0436: "m", \u0437: "e", \u0438: "n", \u0439: "n", \u043A: "n", \u043B: "n", \u043C: "m", \u043D: "n", \u043E: "o", \u043F: "n", \u0440: "p", \u0441: "c", \u0442: "o", \u0443: "y", \u0444: "b", \u0445: "x", \u0446: "n", \u0447: "n", \u0448: "w", \u0449: "w", \u044A: "a", \u044B: "m", \u044C: "a", \u044D: "e", \u044E: "m", \u044F: "r" };
function Fn(r, e) {
  we[r] = e;
}
function Da(r, e, t) {
  if (!we[e]) throw new Error("Font metrics not found for font: " + e + ".");
  var a = r.charCodeAt(0), n = we[e][a];
  if (!n && r[0] in s4 && (a = s4[r[0]].charCodeAt(0), n = we[e][a]), !n && t === "text" && qn(a) && (n = we[e][77]), n) return { depth: n[0], height: n[1], italic: n[2], skew: n[3], width: n[4] };
}
var v1 = {};
function fl(r) {
  var e;
  if (r >= 5 ? e = 0 : r >= 3 ? e = 1 : e = 2, !v1[e]) {
    var t = v1[e] = { cssEmPerMu: f1.quad[e] / 18 };
    for (var a of Object.keys(f1)) t[a] = f1[a][e];
  }
  return v1[e];
}
var g0 = { math: {}, text: {} };
function u(r, e, t, a, n, i) {
  g0[r][n] = { font: e, group: t, replace: a }, i && a && (g0[r][a] = g0[r][n]);
}
var m = "math", N = "text", v = "main", k = "ams", y0 = "accent-token", Z = "bin", Q0 = "close", Nt = "inner", e0 = "mathord", R0 = "op-token", ue = "open", nr = "punct", z = "rel", Ue = "spacing", M = "textord";
u(m, v, z, "\u2261", "\\equiv", true);
u(m, v, z, "\u227A", "\\prec", true);
u(m, v, z, "\u227B", "\\succ", true);
u(m, v, z, "\u223C", "\\sim", true);
u(m, v, z, "\u22A5", "\\perp");
u(m, v, z, "\u2AAF", "\\preceq", true);
u(m, v, z, "\u2AB0", "\\succeq", true);
u(m, v, z, "\u2243", "\\simeq", true);
u(m, v, z, "\u2223", "\\mid", true);
u(m, v, z, "\u226A", "\\ll", true);
u(m, v, z, "\u226B", "\\gg", true);
u(m, v, z, "\u224D", "\\asymp", true);
u(m, v, z, "\u2225", "\\parallel");
u(m, v, z, "\u22C8", "\\bowtie", true);
u(m, v, z, "\u2323", "\\smile", true);
u(m, v, z, "\u2291", "\\sqsubseteq", true);
u(m, v, z, "\u2292", "\\sqsupseteq", true);
u(m, v, z, "\u2250", "\\doteq", true);
u(m, v, z, "\u2322", "\\frown", true);
u(m, v, z, "\u220B", "\\ni", true);
u(m, v, z, "\u221D", "\\propto", true);
u(m, v, z, "\u22A2", "\\vdash", true);
u(m, v, z, "\u22A3", "\\dashv", true);
u(m, v, z, "\u220B", "\\owns");
u(m, v, nr, ".", "\\ldotp");
u(m, v, nr, "\u22C5", "\\cdotp");
u(m, v, nr, "\u22C5", "\xB7");
u(N, v, M, "\u22C5", "\xB7");
u(m, v, M, "#", "\\#");
u(N, v, M, "#", "\\#");
u(m, v, M, "&", "\\&");
u(N, v, M, "&", "\\&");
u(m, v, M, "\u2135", "\\aleph", true);
u(m, v, M, "\u2200", "\\forall", true);
u(m, v, M, "\u210F", "\\hbar", true);
u(m, v, M, "\u2203", "\\exists", true);
u(m, v, M, "\u2207", "\\nabla", true);
u(m, v, M, "\u266D", "\\flat", true);
u(m, v, M, "\u2113", "\\ell", true);
u(m, v, M, "\u266E", "\\natural", true);
u(m, v, M, "\u2663", "\\clubsuit", true);
u(m, v, M, "\u2118", "\\wp", true);
u(m, v, M, "\u266F", "\\sharp", true);
u(m, v, M, "\u2662", "\\diamondsuit", true);
u(m, v, M, "\u211C", "\\Re", true);
u(m, v, M, "\u2661", "\\heartsuit", true);
u(m, v, M, "\u2111", "\\Im", true);
u(m, v, M, "\u2660", "\\spadesuit", true);
u(m, v, M, "\xA7", "\\S", true);
u(N, v, M, "\xA7", "\\S");
u(m, v, M, "\xB6", "\\P", true);
u(N, v, M, "\xB6", "\\P");
u(m, v, M, "\u2020", "\\dag");
u(N, v, M, "\u2020", "\\dag");
u(N, v, M, "\u2020", "\\textdagger");
u(m, v, M, "\u2021", "\\ddag");
u(N, v, M, "\u2021", "\\ddag");
u(N, v, M, "\u2021", "\\textdaggerdbl");
u(m, v, Q0, "\u23B1", "\\rmoustache", true);
u(m, v, ue, "\u23B0", "\\lmoustache", true);
u(m, v, Q0, "\u27EF", "\\rgroup", true);
u(m, v, ue, "\u27EE", "\\lgroup", true);
u(m, v, Z, "\u2213", "\\mp", true);
u(m, v, Z, "\u2296", "\\ominus", true);
u(m, v, Z, "\u228E", "\\uplus", true);
u(m, v, Z, "\u2293", "\\sqcap", true);
u(m, v, Z, "\u2217", "\\ast");
u(m, v, Z, "\u2294", "\\sqcup", true);
u(m, v, Z, "\u25EF", "\\bigcirc", true);
u(m, v, Z, "\u2219", "\\bullet", true);
u(m, v, Z, "\u2021", "\\ddagger");
u(m, v, Z, "\u2240", "\\wr", true);
u(m, v, Z, "\u2A3F", "\\amalg");
u(m, v, Z, "&", "\\And");
u(m, v, z, "\u27F5", "\\longleftarrow", true);
u(m, v, z, "\u21D0", "\\Leftarrow", true);
u(m, v, z, "\u27F8", "\\Longleftarrow", true);
u(m, v, z, "\u27F6", "\\longrightarrow", true);
u(m, v, z, "\u21D2", "\\Rightarrow", true);
u(m, v, z, "\u27F9", "\\Longrightarrow", true);
u(m, v, z, "\u2194", "\\leftrightarrow", true);
u(m, v, z, "\u27F7", "\\longleftrightarrow", true);
u(m, v, z, "\u21D4", "\\Leftrightarrow", true);
u(m, v, z, "\u27FA", "\\Longleftrightarrow", true);
u(m, v, z, "\u21A6", "\\mapsto", true);
u(m, v, z, "\u27FC", "\\longmapsto", true);
u(m, v, z, "\u2197", "\\nearrow", true);
u(m, v, z, "\u21A9", "\\hookleftarrow", true);
u(m, v, z, "\u21AA", "\\hookrightarrow", true);
u(m, v, z, "\u2198", "\\searrow", true);
u(m, v, z, "\u21BC", "\\leftharpoonup", true);
u(m, v, z, "\u21C0", "\\rightharpoonup", true);
u(m, v, z, "\u2199", "\\swarrow", true);
u(m, v, z, "\u21BD", "\\leftharpoondown", true);
u(m, v, z, "\u21C1", "\\rightharpoondown", true);
u(m, v, z, "\u2196", "\\nwarrow", true);
u(m, v, z, "\u21CC", "\\rightleftharpoons", true);
u(m, k, z, "\u226E", "\\nless", true);
u(m, k, z, "\uE010", "\\@nleqslant");
u(m, k, z, "\uE011", "\\@nleqq");
u(m, k, z, "\u2A87", "\\lneq", true);
u(m, k, z, "\u2268", "\\lneqq", true);
u(m, k, z, "\uE00C", "\\@lvertneqq");
u(m, k, z, "\u22E6", "\\lnsim", true);
u(m, k, z, "\u2A89", "\\lnapprox", true);
u(m, k, z, "\u2280", "\\nprec", true);
u(m, k, z, "\u22E0", "\\npreceq", true);
u(m, k, z, "\u22E8", "\\precnsim", true);
u(m, k, z, "\u2AB9", "\\precnapprox", true);
u(m, k, z, "\u2241", "\\nsim", true);
u(m, k, z, "\uE006", "\\@nshortmid");
u(m, k, z, "\u2224", "\\nmid", true);
u(m, k, z, "\u22AC", "\\nvdash", true);
u(m, k, z, "\u22AD", "\\nvDash", true);
u(m, k, z, "\u22EA", "\\ntriangleleft");
u(m, k, z, "\u22EC", "\\ntrianglelefteq", true);
u(m, k, z, "\u228A", "\\subsetneq", true);
u(m, k, z, "\uE01A", "\\@varsubsetneq");
u(m, k, z, "\u2ACB", "\\subsetneqq", true);
u(m, k, z, "\uE017", "\\@varsubsetneqq");
u(m, k, z, "\u226F", "\\ngtr", true);
u(m, k, z, "\uE00F", "\\@ngeqslant");
u(m, k, z, "\uE00E", "\\@ngeqq");
u(m, k, z, "\u2A88", "\\gneq", true);
u(m, k, z, "\u2269", "\\gneqq", true);
u(m, k, z, "\uE00D", "\\@gvertneqq");
u(m, k, z, "\u22E7", "\\gnsim", true);
u(m, k, z, "\u2A8A", "\\gnapprox", true);
u(m, k, z, "\u2281", "\\nsucc", true);
u(m, k, z, "\u22E1", "\\nsucceq", true);
u(m, k, z, "\u22E9", "\\succnsim", true);
u(m, k, z, "\u2ABA", "\\succnapprox", true);
u(m, k, z, "\u2246", "\\ncong", true);
u(m, k, z, "\uE007", "\\@nshortparallel");
u(m, k, z, "\u2226", "\\nparallel", true);
u(m, k, z, "\u22AF", "\\nVDash", true);
u(m, k, z, "\u22EB", "\\ntriangleright");
u(m, k, z, "\u22ED", "\\ntrianglerighteq", true);
u(m, k, z, "\uE018", "\\@nsupseteqq");
u(m, k, z, "\u228B", "\\supsetneq", true);
u(m, k, z, "\uE01B", "\\@varsupsetneq");
u(m, k, z, "\u2ACC", "\\supsetneqq", true);
u(m, k, z, "\uE019", "\\@varsupsetneqq");
u(m, k, z, "\u22AE", "\\nVdash", true);
u(m, k, z, "\u2AB5", "\\precneqq", true);
u(m, k, z, "\u2AB6", "\\succneqq", true);
u(m, k, z, "\uE016", "\\@nsubseteqq");
u(m, k, Z, "\u22B4", "\\unlhd");
u(m, k, Z, "\u22B5", "\\unrhd");
u(m, k, z, "\u219A", "\\nleftarrow", true);
u(m, k, z, "\u219B", "\\nrightarrow", true);
u(m, k, z, "\u21CD", "\\nLeftarrow", true);
u(m, k, z, "\u21CF", "\\nRightarrow", true);
u(m, k, z, "\u21AE", "\\nleftrightarrow", true);
u(m, k, z, "\u21CE", "\\nLeftrightarrow", true);
u(m, k, z, "\u25B3", "\\vartriangle");
u(m, k, M, "\u210F", "\\hslash");
u(m, k, M, "\u25BD", "\\triangledown");
u(m, k, M, "\u25CA", "\\lozenge");
u(m, k, M, "\u24C8", "\\circledS");
u(m, k, M, "\xAE", "\\circledR");
u(N, k, M, "\xAE", "\\circledR");
u(m, k, M, "\u2221", "\\measuredangle", true);
u(m, k, M, "\u2204", "\\nexists");
u(m, k, M, "\u2127", "\\mho");
u(m, k, M, "\u2132", "\\Finv", true);
u(m, k, M, "\u2141", "\\Game", true);
u(m, k, M, "\u2035", "\\backprime");
u(m, k, M, "\u25B2", "\\blacktriangle");
u(m, k, M, "\u25BC", "\\blacktriangledown");
u(m, k, M, "\u25A0", "\\blacksquare");
u(m, k, M, "\u29EB", "\\blacklozenge");
u(m, k, M, "\u2605", "\\bigstar");
u(m, k, M, "\u2222", "\\sphericalangle", true);
u(m, k, M, "\u2201", "\\complement", true);
u(m, k, M, "\xF0", "\\eth", true);
u(N, v, M, "\xF0", "\xF0");
u(m, k, M, "\u2571", "\\diagup");
u(m, k, M, "\u2572", "\\diagdown");
u(m, k, M, "\u25A1", "\\square");
u(m, k, M, "\u25A1", "\\Box");
u(m, k, M, "\u25CA", "\\Diamond");
u(m, k, M, "\xA5", "\\yen", true);
u(N, k, M, "\xA5", "\\yen", true);
u(m, k, M, "\u2713", "\\checkmark", true);
u(N, k, M, "\u2713", "\\checkmark");
u(m, k, M, "\u2136", "\\beth", true);
u(m, k, M, "\u2138", "\\daleth", true);
u(m, k, M, "\u2137", "\\gimel", true);
u(m, k, M, "\u03DD", "\\digamma", true);
u(m, k, M, "\u03F0", "\\varkappa");
u(m, k, ue, "\u250C", "\\@ulcorner", true);
u(m, k, Q0, "\u2510", "\\@urcorner", true);
u(m, k, ue, "\u2514", "\\@llcorner", true);
u(m, k, Q0, "\u2518", "\\@lrcorner", true);
u(m, k, z, "\u2266", "\\leqq", true);
u(m, k, z, "\u2A7D", "\\leqslant", true);
u(m, k, z, "\u2A95", "\\eqslantless", true);
u(m, k, z, "\u2272", "\\lesssim", true);
u(m, k, z, "\u2A85", "\\lessapprox", true);
u(m, k, z, "\u224A", "\\approxeq", true);
u(m, k, Z, "\u22D6", "\\lessdot");
u(m, k, z, "\u22D8", "\\lll", true);
u(m, k, z, "\u2276", "\\lessgtr", true);
u(m, k, z, "\u22DA", "\\lesseqgtr", true);
u(m, k, z, "\u2A8B", "\\lesseqqgtr", true);
u(m, k, z, "\u2251", "\\doteqdot");
u(m, k, z, "\u2253", "\\risingdotseq", true);
u(m, k, z, "\u2252", "\\fallingdotseq", true);
u(m, k, z, "\u223D", "\\backsim", true);
u(m, k, z, "\u22CD", "\\backsimeq", true);
u(m, k, z, "\u2AC5", "\\subseteqq", true);
u(m, k, z, "\u22D0", "\\Subset", true);
u(m, k, z, "\u228F", "\\sqsubset", true);
u(m, k, z, "\u227C", "\\preccurlyeq", true);
u(m, k, z, "\u22DE", "\\curlyeqprec", true);
u(m, k, z, "\u227E", "\\precsim", true);
u(m, k, z, "\u2AB7", "\\precapprox", true);
u(m, k, z, "\u22B2", "\\vartriangleleft");
u(m, k, z, "\u22B4", "\\trianglelefteq");
u(m, k, z, "\u22A8", "\\vDash", true);
u(m, k, z, "\u22AA", "\\Vvdash", true);
u(m, k, z, "\u2323", "\\smallsmile");
u(m, k, z, "\u2322", "\\smallfrown");
u(m, k, z, "\u224F", "\\bumpeq", true);
u(m, k, z, "\u224E", "\\Bumpeq", true);
u(m, k, z, "\u2267", "\\geqq", true);
u(m, k, z, "\u2A7E", "\\geqslant", true);
u(m, k, z, "\u2A96", "\\eqslantgtr", true);
u(m, k, z, "\u2273", "\\gtrsim", true);
u(m, k, z, "\u2A86", "\\gtrapprox", true);
u(m, k, Z, "\u22D7", "\\gtrdot");
u(m, k, z, "\u22D9", "\\ggg", true);
u(m, k, z, "\u2277", "\\gtrless", true);
u(m, k, z, "\u22DB", "\\gtreqless", true);
u(m, k, z, "\u2A8C", "\\gtreqqless", true);
u(m, k, z, "\u2256", "\\eqcirc", true);
u(m, k, z, "\u2257", "\\circeq", true);
u(m, k, z, "\u225C", "\\triangleq", true);
u(m, k, z, "\u223C", "\\thicksim");
u(m, k, z, "\u2248", "\\thickapprox");
u(m, k, z, "\u2AC6", "\\supseteqq", true);
u(m, k, z, "\u22D1", "\\Supset", true);
u(m, k, z, "\u2290", "\\sqsupset", true);
u(m, k, z, "\u227D", "\\succcurlyeq", true);
u(m, k, z, "\u22DF", "\\curlyeqsucc", true);
u(m, k, z, "\u227F", "\\succsim", true);
u(m, k, z, "\u2AB8", "\\succapprox", true);
u(m, k, z, "\u22B3", "\\vartriangleright");
u(m, k, z, "\u22B5", "\\trianglerighteq");
u(m, k, z, "\u22A9", "\\Vdash", true);
u(m, k, z, "\u2223", "\\shortmid");
u(m, k, z, "\u2225", "\\shortparallel");
u(m, k, z, "\u226C", "\\between", true);
u(m, k, z, "\u22D4", "\\pitchfork", true);
u(m, k, z, "\u221D", "\\varpropto");
u(m, k, z, "\u25C0", "\\blacktriangleleft");
u(m, k, z, "\u2234", "\\therefore", true);
u(m, k, z, "\u220D", "\\backepsilon");
u(m, k, z, "\u25B6", "\\blacktriangleright");
u(m, k, z, "\u2235", "\\because", true);
u(m, k, z, "\u22D8", "\\llless");
u(m, k, z, "\u22D9", "\\gggtr");
u(m, k, Z, "\u22B2", "\\lhd");
u(m, k, Z, "\u22B3", "\\rhd");
u(m, k, z, "\u2242", "\\eqsim", true);
u(m, v, z, "\u22C8", "\\Join");
u(m, k, z, "\u2251", "\\Doteq", true);
u(m, k, Z, "\u2214", "\\dotplus", true);
u(m, k, Z, "\u2216", "\\smallsetminus");
u(m, k, Z, "\u22D2", "\\Cap", true);
u(m, k, Z, "\u22D3", "\\Cup", true);
u(m, k, Z, "\u2A5E", "\\doublebarwedge", true);
u(m, k, Z, "\u229F", "\\boxminus", true);
u(m, k, Z, "\u229E", "\\boxplus", true);
u(m, k, Z, "\u22C7", "\\divideontimes", true);
u(m, k, Z, "\u22C9", "\\ltimes", true);
u(m, k, Z, "\u22CA", "\\rtimes", true);
u(m, k, Z, "\u22CB", "\\leftthreetimes", true);
u(m, k, Z, "\u22CC", "\\rightthreetimes", true);
u(m, k, Z, "\u22CF", "\\curlywedge", true);
u(m, k, Z, "\u22CE", "\\curlyvee", true);
u(m, k, Z, "\u229D", "\\circleddash", true);
u(m, k, Z, "\u229B", "\\circledast", true);
u(m, k, Z, "\u22C5", "\\centerdot");
u(m, k, Z, "\u22BA", "\\intercal", true);
u(m, k, Z, "\u22D2", "\\doublecap");
u(m, k, Z, "\u22D3", "\\doublecup");
u(m, k, Z, "\u22A0", "\\boxtimes", true);
u(m, k, z, "\u21E2", "\\dashrightarrow", true);
u(m, k, z, "\u21E0", "\\dashleftarrow", true);
u(m, k, z, "\u21C7", "\\leftleftarrows", true);
u(m, k, z, "\u21C6", "\\leftrightarrows", true);
u(m, k, z, "\u21DA", "\\Lleftarrow", true);
u(m, k, z, "\u219E", "\\twoheadleftarrow", true);
u(m, k, z, "\u21A2", "\\leftarrowtail", true);
u(m, k, z, "\u21AB", "\\looparrowleft", true);
u(m, k, z, "\u21CB", "\\leftrightharpoons", true);
u(m, k, z, "\u21B6", "\\curvearrowleft", true);
u(m, k, z, "\u21BA", "\\circlearrowleft", true);
u(m, k, z, "\u21B0", "\\Lsh", true);
u(m, k, z, "\u21C8", "\\upuparrows", true);
u(m, k, z, "\u21BF", "\\upharpoonleft", true);
u(m, k, z, "\u21C3", "\\downharpoonleft", true);
u(m, v, z, "\u22B6", "\\origof", true);
u(m, v, z, "\u22B7", "\\imageof", true);
u(m, k, z, "\u22B8", "\\multimap", true);
u(m, k, z, "\u21AD", "\\leftrightsquigarrow", true);
u(m, k, z, "\u21C9", "\\rightrightarrows", true);
u(m, k, z, "\u21C4", "\\rightleftarrows", true);
u(m, k, z, "\u21A0", "\\twoheadrightarrow", true);
u(m, k, z, "\u21A3", "\\rightarrowtail", true);
u(m, k, z, "\u21AC", "\\looparrowright", true);
u(m, k, z, "\u21B7", "\\curvearrowright", true);
u(m, k, z, "\u21BB", "\\circlearrowright", true);
u(m, k, z, "\u21B1", "\\Rsh", true);
u(m, k, z, "\u21CA", "\\downdownarrows", true);
u(m, k, z, "\u21BE", "\\upharpoonright", true);
u(m, k, z, "\u21C2", "\\downharpoonright", true);
u(m, k, z, "\u21DD", "\\rightsquigarrow", true);
u(m, k, z, "\u21DD", "\\leadsto");
u(m, k, z, "\u21DB", "\\Rrightarrow", true);
u(m, k, z, "\u21BE", "\\restriction");
u(m, v, M, "\u2018", "`");
u(m, v, M, "$", "\\$");
u(N, v, M, "$", "\\$");
u(N, v, M, "$", "\\textdollar");
u(m, v, M, "%", "\\%");
u(N, v, M, "%", "\\%");
u(m, v, M, "_", "\\_");
u(N, v, M, "_", "\\_");
u(N, v, M, "_", "\\textunderscore");
u(m, v, M, "\u2220", "\\angle", true);
u(m, v, M, "\u221E", "\\infty", true);
u(m, v, M, "\u2032", "\\prime");
u(m, v, M, "\u25B3", "\\triangle");
u(m, v, M, "\u0393", "\\Gamma", true);
u(m, v, M, "\u0394", "\\Delta", true);
u(m, v, M, "\u0398", "\\Theta", true);
u(m, v, M, "\u039B", "\\Lambda", true);
u(m, v, M, "\u039E", "\\Xi", true);
u(m, v, M, "\u03A0", "\\Pi", true);
u(m, v, M, "\u03A3", "\\Sigma", true);
u(m, v, M, "\u03A5", "\\Upsilon", true);
u(m, v, M, "\u03A6", "\\Phi", true);
u(m, v, M, "\u03A8", "\\Psi", true);
u(m, v, M, "\u03A9", "\\Omega", true);
u(m, v, M, "A", "\u0391");
u(m, v, M, "B", "\u0392");
u(m, v, M, "E", "\u0395");
u(m, v, M, "Z", "\u0396");
u(m, v, M, "H", "\u0397");
u(m, v, M, "I", "\u0399");
u(m, v, M, "K", "\u039A");
u(m, v, M, "M", "\u039C");
u(m, v, M, "N", "\u039D");
u(m, v, M, "O", "\u039F");
u(m, v, M, "P", "\u03A1");
u(m, v, M, "T", "\u03A4");
u(m, v, M, "X", "\u03A7");
u(m, v, M, "\xAC", "\\neg", true);
u(m, v, M, "\xAC", "\\lnot");
u(m, v, M, "\u22A4", "\\top");
u(m, v, M, "\u22A5", "\\bot");
u(m, v, M, "\u2205", "\\emptyset");
u(m, k, M, "\u2205", "\\varnothing");
u(m, v, e0, "\u03B1", "\\alpha", true);
u(m, v, e0, "\u03B2", "\\beta", true);
u(m, v, e0, "\u03B3", "\\gamma", true);
u(m, v, e0, "\u03B4", "\\delta", true);
u(m, v, e0, "\u03F5", "\\epsilon", true);
u(m, v, e0, "\u03B6", "\\zeta", true);
u(m, v, e0, "\u03B7", "\\eta", true);
u(m, v, e0, "\u03B8", "\\theta", true);
u(m, v, e0, "\u03B9", "\\iota", true);
u(m, v, e0, "\u03BA", "\\kappa", true);
u(m, v, e0, "\u03BB", "\\lambda", true);
u(m, v, e0, "\u03BC", "\\mu", true);
u(m, v, e0, "\u03BD", "\\nu", true);
u(m, v, e0, "\u03BE", "\\xi", true);
u(m, v, e0, "\u03BF", "\\omicron", true);
u(m, v, e0, "\u03C0", "\\pi", true);
u(m, v, e0, "\u03C1", "\\rho", true);
u(m, v, e0, "\u03C3", "\\sigma", true);
u(m, v, e0, "\u03C4", "\\tau", true);
u(m, v, e0, "\u03C5", "\\upsilon", true);
u(m, v, e0, "\u03D5", "\\phi", true);
u(m, v, e0, "\u03C7", "\\chi", true);
u(m, v, e0, "\u03C8", "\\psi", true);
u(m, v, e0, "\u03C9", "\\omega", true);
u(m, v, e0, "\u03B5", "\\varepsilon", true);
u(m, v, e0, "\u03D1", "\\vartheta", true);
u(m, v, e0, "\u03D6", "\\varpi", true);
u(m, v, e0, "\u03F1", "\\varrho", true);
u(m, v, e0, "\u03C2", "\\varsigma", true);
u(m, v, e0, "\u03C6", "\\varphi", true);
u(m, v, Z, "\u2217", "*", true);
u(m, v, Z, "+", "+");
u(m, v, Z, "\u2212", "-", true);
u(m, v, Z, "\u22C5", "\\cdot", true);
u(m, v, Z, "\u2218", "\\circ", true);
u(m, v, Z, "\xF7", "\\div", true);
u(m, v, Z, "\xB1", "\\pm", true);
u(m, v, Z, "\xD7", "\\times", true);
u(m, v, Z, "\u2229", "\\cap", true);
u(m, v, Z, "\u222A", "\\cup", true);
u(m, v, Z, "\u2216", "\\setminus", true);
u(m, v, Z, "\u2227", "\\land");
u(m, v, Z, "\u2228", "\\lor");
u(m, v, Z, "\u2227", "\\wedge", true);
u(m, v, Z, "\u2228", "\\vee", true);
u(m, v, M, "\u221A", "\\surd");
u(m, v, ue, "\u27E8", "\\langle", true);
u(m, v, ue, "\u2223", "\\lvert");
u(m, v, ue, "\u2225", "\\lVert");
u(m, v, Q0, "?", "?");
u(m, v, Q0, "!", "!");
u(m, v, Q0, "\u27E9", "\\rangle", true);
u(m, v, Q0, "\u2223", "\\rvert");
u(m, v, Q0, "\u2225", "\\rVert");
u(m, v, z, "=", "=");
u(m, v, z, ":", ":");
u(m, v, z, "\u2248", "\\approx", true);
u(m, v, z, "\u2245", "\\cong", true);
u(m, v, z, "\u2265", "\\ge");
u(m, v, z, "\u2265", "\\geq", true);
u(m, v, z, "\u2190", "\\gets");
u(m, v, z, ">", "\\gt", true);
u(m, v, z, "\u2208", "\\in", true);
u(m, v, z, "\uE020", "\\@not");
u(m, v, z, "\u2282", "\\subset", true);
u(m, v, z, "\u2283", "\\supset", true);
u(m, v, z, "\u2286", "\\subseteq", true);
u(m, v, z, "\u2287", "\\supseteq", true);
u(m, k, z, "\u2288", "\\nsubseteq", true);
u(m, k, z, "\u2289", "\\nsupseteq", true);
u(m, v, z, "\u22A8", "\\models");
u(m, v, z, "\u2190", "\\leftarrow", true);
u(m, v, z, "\u2264", "\\le");
u(m, v, z, "\u2264", "\\leq", true);
u(m, v, z, "<", "\\lt", true);
u(m, v, z, "\u2192", "\\rightarrow", true);
u(m, v, z, "\u2192", "\\to");
u(m, k, z, "\u2271", "\\ngeq", true);
u(m, k, z, "\u2270", "\\nleq", true);
u(m, v, Ue, "\xA0", "\\ ");
u(m, v, Ue, "\xA0", "\\space");
u(m, v, Ue, "\xA0", "\\nobreakspace");
u(N, v, Ue, "\xA0", "\\ ");
u(N, v, Ue, "\xA0", " ");
u(N, v, Ue, "\xA0", "\\space");
u(N, v, Ue, "\xA0", "\\nobreakspace");
u(m, v, Ue, "", "\\nobreak");
u(m, v, Ue, "", "\\allowbreak");
u(m, v, nr, ",", ",");
u(m, v, nr, ";", ";");
u(m, k, Z, "\u22BC", "\\barwedge", true);
u(m, k, Z, "\u22BB", "\\veebar", true);
u(m, v, Z, "\u2299", "\\odot", true);
u(m, v, Z, "\u2295", "\\oplus", true);
u(m, v, Z, "\u2297", "\\otimes", true);
u(m, v, M, "\u2202", "\\partial", true);
u(m, v, Z, "\u2298", "\\oslash", true);
u(m, k, Z, "\u229A", "\\circledcirc", true);
u(m, k, Z, "\u22A1", "\\boxdot", true);
u(m, v, Z, "\u25B3", "\\bigtriangleup");
u(m, v, Z, "\u25BD", "\\bigtriangledown");
u(m, v, Z, "\u2020", "\\dagger");
u(m, v, Z, "\u22C4", "\\diamond");
u(m, v, Z, "\u22C6", "\\star");
u(m, v, Z, "\u25C3", "\\triangleleft");
u(m, v, Z, "\u25B9", "\\triangleright");
u(m, v, ue, "{", "\\{");
u(N, v, M, "{", "\\{");
u(N, v, M, "{", "\\textbraceleft");
u(m, v, Q0, "}", "\\}");
u(N, v, M, "}", "\\}");
u(N, v, M, "}", "\\textbraceright");
u(m, v, ue, "{", "\\lbrace");
u(m, v, Q0, "}", "\\rbrace");
u(m, v, ue, "[", "\\lbrack", true);
u(N, v, M, "[", "\\lbrack", true);
u(m, v, Q0, "]", "\\rbrack", true);
u(N, v, M, "]", "\\rbrack", true);
u(m, v, ue, "(", "\\lparen", true);
u(m, v, Q0, ")", "\\rparen", true);
u(N, v, M, "<", "\\textless", true);
u(N, v, M, ">", "\\textgreater", true);
u(m, v, ue, "\u230A", "\\lfloor", true);
u(m, v, Q0, "\u230B", "\\rfloor", true);
u(m, v, ue, "\u2308", "\\lceil", true);
u(m, v, Q0, "\u2309", "\\rceil", true);
u(m, v, M, "\\", "\\backslash");
u(m, v, M, "\u2223", "|");
u(m, v, M, "\u2223", "\\vert");
u(N, v, M, "|", "\\textbar", true);
u(m, v, M, "\u2225", "\\|");
u(m, v, M, "\u2225", "\\Vert");
u(N, v, M, "\u2225", "\\textbardbl");
u(N, v, M, "~", "\\textasciitilde");
u(N, v, M, "\\", "\\textbackslash");
u(N, v, M, "^", "\\textasciicircum");
u(m, v, z, "\u2191", "\\uparrow", true);
u(m, v, z, "\u21D1", "\\Uparrow", true);
u(m, v, z, "\u2193", "\\downarrow", true);
u(m, v, z, "\u21D3", "\\Downarrow", true);
u(m, v, z, "\u2195", "\\updownarrow", true);
u(m, v, z, "\u21D5", "\\Updownarrow", true);
u(m, v, R0, "\u2210", "\\coprod");
u(m, v, R0, "\u22C1", "\\bigvee");
u(m, v, R0, "\u22C0", "\\bigwedge");
u(m, v, R0, "\u2A04", "\\biguplus");
u(m, v, R0, "\u22C2", "\\bigcap");
u(m, v, R0, "\u22C3", "\\bigcup");
u(m, v, R0, "\u222B", "\\int");
u(m, v, R0, "\u222B", "\\intop");
u(m, v, R0, "\u222C", "\\iint");
u(m, v, R0, "\u222D", "\\iiint");
u(m, v, R0, "\u220F", "\\prod");
u(m, v, R0, "\u2211", "\\sum");
u(m, v, R0, "\u2A02", "\\bigotimes");
u(m, v, R0, "\u2A01", "\\bigoplus");
u(m, v, R0, "\u2A00", "\\bigodot");
u(m, v, R0, "\u222E", "\\oint");
u(m, v, R0, "\u222F", "\\oiint");
u(m, v, R0, "\u2230", "\\oiiint");
u(m, v, R0, "\u2A06", "\\bigsqcup");
u(m, v, R0, "\u222B", "\\smallint");
u(N, v, Nt, "\u2026", "\\textellipsis");
u(m, v, Nt, "\u2026", "\\mathellipsis");
u(N, v, Nt, "\u2026", "\\ldots", true);
u(m, v, Nt, "\u2026", "\\ldots", true);
u(m, v, Nt, "\u22EF", "\\@cdots", true);
u(m, v, Nt, "\u22F1", "\\ddots", true);
u(m, v, M, "\u22EE", "\\varvdots");
u(N, v, M, "\u22EE", "\\varvdots");
u(m, v, y0, "\u02CA", "\\acute");
u(m, v, y0, "\u02CB", "\\grave");
u(m, v, y0, "\xA8", "\\ddot");
u(m, v, y0, "~", "\\tilde");
u(m, v, y0, "\u02C9", "\\bar");
u(m, v, y0, "\u02D8", "\\breve");
u(m, v, y0, "\u02C7", "\\check");
u(m, v, y0, "^", "\\hat");
u(m, v, y0, "\u20D7", "\\vec");
u(m, v, y0, "\u02D9", "\\dot");
u(m, v, y0, "\u02DA", "\\mathring");
u(m, v, e0, "\uE131", "\\@imath");
u(m, v, e0, "\uE237", "\\@jmath");
u(m, v, M, "\u0131", "\u0131");
u(m, v, M, "\u0237", "\u0237");
u(N, v, M, "\u0131", "\\i", true);
u(N, v, M, "\u0237", "\\j", true);
u(N, v, M, "\xDF", "\\ss", true);
u(N, v, M, "\xE6", "\\ae", true);
u(N, v, M, "\u0153", "\\oe", true);
u(N, v, M, "\xF8", "\\o", true);
u(N, v, M, "\xC6", "\\AE", true);
u(N, v, M, "\u0152", "\\OE", true);
u(N, v, M, "\xD8", "\\O", true);
u(N, v, y0, "\u02CA", "\\'");
u(N, v, y0, "\u02CB", "\\`");
u(N, v, y0, "\u02C6", "\\^");
u(N, v, y0, "\u02DC", "\\~");
u(N, v, y0, "\u02C9", "\\=");
u(N, v, y0, "\u02D8", "\\u");
u(N, v, y0, "\u02D9", "\\.");
u(N, v, y0, "\xB8", "\\c");
u(N, v, y0, "\u02DA", "\\r");
u(N, v, y0, "\u02C7", "\\v");
u(N, v, y0, "\xA8", '\\"');
u(N, v, y0, "\u02DD", "\\H");
u(N, v, y0, "\u25EF", "\\textcircled");
var On = { "--": true, "---": true, "``": true, "''": true };
u(N, v, M, "\u2013", "--", true);
u(N, v, M, "\u2013", "\\textendash");
u(N, v, M, "\u2014", "---", true);
u(N, v, M, "\u2014", "\\textemdash");
u(N, v, M, "\u2018", "`", true);
u(N, v, M, "\u2018", "\\textquoteleft");
u(N, v, M, "\u2019", "'", true);
u(N, v, M, "\u2019", "\\textquoteright");
u(N, v, M, "\u201C", "``", true);
u(N, v, M, "\u201C", "\\textquotedblleft");
u(N, v, M, "\u201D", "''", true);
u(N, v, M, "\u201D", "\\textquotedblright");
u(m, v, M, "\xB0", "\\degree", true);
u(N, v, M, "\xB0", "\\degree");
u(N, v, M, "\xB0", "\\textdegree", true);
u(m, v, M, "\xA3", "\\pounds");
u(m, v, M, "\xA3", "\\mathsterling", true);
u(N, v, M, "\xA3", "\\pounds");
u(N, v, M, "\xA3", "\\textsterling", true);
u(m, k, M, "\u2720", "\\maltese");
u(N, k, M, "\u2720", "\\maltese");
var l4 = '0123456789/@."';
for (var p1 = 0; p1 < l4.length; p1++) {
  var u4 = l4.charAt(p1);
  u(m, v, M, u4, u4);
}
var o4 = '0123456789!@*()-=+";:?/.,';
for (var g1 = 0; g1 < o4.length; g1++) {
  var h4 = o4.charAt(g1);
  u(N, v, M, h4, h4);
}
var Br = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
for (var b1 = 0; b1 < Br.length; b1++) {
  var lr = Br.charAt(b1);
  u(m, v, e0, lr, lr), u(N, v, M, lr, lr);
}
u(m, k, M, "C", "\u2102");
u(N, k, M, "C", "\u2102");
u(m, k, M, "H", "\u210D");
u(N, k, M, "H", "\u210D");
u(m, k, M, "N", "\u2115");
u(N, k, M, "N", "\u2115");
u(m, k, M, "P", "\u2119");
u(N, k, M, "P", "\u2119");
u(m, k, M, "Q", "\u211A");
u(N, k, M, "Q", "\u211A");
u(m, k, M, "R", "\u211D");
u(N, k, M, "R", "\u211D");
u(m, k, M, "Z", "\u2124");
u(N, k, M, "Z", "\u2124");
u(m, v, e0, "h", "\u210E");
u(N, v, e0, "h", "\u210E");
var r0;
for (var Y0 = 0; Y0 < Br.length; Y0++) {
  var T0 = Br.charAt(Y0);
  r0 = String.fromCharCode(55349, 56320 + Y0), u(m, v, e0, T0, r0), u(N, v, M, T0, r0), r0 = String.fromCharCode(55349, 56372 + Y0), u(m, v, e0, T0, r0), u(N, v, M, T0, r0), r0 = String.fromCharCode(55349, 56424 + Y0), u(m, v, e0, T0, r0), u(N, v, M, T0, r0), r0 = String.fromCharCode(55349, 56580 + Y0), u(m, v, e0, T0, r0), u(N, v, M, T0, r0), r0 = String.fromCharCode(55349, 56684 + Y0), u(m, v, e0, T0, r0), u(N, v, M, T0, r0), r0 = String.fromCharCode(55349, 56736 + Y0), u(m, v, e0, T0, r0), u(N, v, M, T0, r0), r0 = String.fromCharCode(55349, 56788 + Y0), u(m, v, e0, T0, r0), u(N, v, M, T0, r0), r0 = String.fromCharCode(55349, 56840 + Y0), u(m, v, e0, T0, r0), u(N, v, M, T0, r0), r0 = String.fromCharCode(55349, 56944 + Y0), u(m, v, e0, T0, r0), u(N, v, M, T0, r0), Y0 < 26 && (r0 = String.fromCharCode(55349, 56632 + Y0), u(m, v, e0, T0, r0), u(N, v, M, T0, r0), r0 = String.fromCharCode(55349, 56476 + Y0), u(m, v, e0, T0, r0), u(N, v, M, T0, r0));
}
r0 = "\u{1D55C}";
u(m, v, e0, "k", r0);
u(N, v, M, "k", r0);
for (var ct = 0; ct < 10; ct++) {
  var Ze = ct.toString();
  r0 = String.fromCharCode(55349, 57294 + ct), u(m, v, e0, Ze, r0), u(N, v, M, Ze, r0), r0 = String.fromCharCode(55349, 57314 + ct), u(m, v, e0, Ze, r0), u(N, v, M, Ze, r0), r0 = String.fromCharCode(55349, 57324 + ct), u(m, v, e0, Ze, r0), u(N, v, M, Ze, r0), r0 = String.fromCharCode(55349, 57334 + ct), u(m, v, e0, Ze, r0), u(N, v, M, Ze, r0);
}
var j1 = "\xD0\xDE\xFE";
for (var y1 = 0; y1 < j1.length; y1++) {
  var ur = j1.charAt(y1);
  u(m, v, e0, ur, ur), u(N, v, M, ur, ur);
}
var Z1 = { mathClass: "mathbf", textClass: "textbf", font: "Main-Bold" }, m4 = { mathClass: "mathnormal", textClass: "textit", font: "Math-Italic" }, c4 = { mathClass: "boldsymbol", textClass: "boldsymbol", font: "Main-BoldItalic" }, vl = { mathClass: "mathscr", textClass: "textscr", font: "Script-Regular" }, gt = { mathClass: "", textClass: "", font: "" }, d4 = { mathClass: "mathfrak", textClass: "textfrak", font: "Fraktur-Regular" }, f4 = { mathClass: "mathbb", textClass: "textbb", font: "AMS-Regular" }, v4 = { mathClass: "mathboldfrak", textClass: "textboldfrak", font: "Fraktur-Regular" }, K1 = { mathClass: "mathsf", textClass: "textsf", font: "SansSerif-Regular" }, J1 = { mathClass: "mathboldsf", textClass: "textboldsf", font: "SansSerif-Bold" }, p4 = { mathClass: "mathitsf", textClass: "textitsf", font: "SansSerif-Italic" }, Q1 = { mathClass: "mathtt", textClass: "texttt", font: "Typewriter-Regular" }, g4 = [Z1, Z1, m4, m4, c4, c4, vl, gt, gt, gt, d4, d4, f4, f4, v4, v4, K1, K1, J1, J1, p4, p4, gt, gt, Q1, Q1], pl = [Z1, gt, K1, J1, Q1], gl = (r) => {
  var e = r.charCodeAt(0), t = r.charCodeAt(1), a = (e - 55296) * 1024 + (t - 56320) + 65536;
  if (119808 <= a && a < 120484) {
    var n = Math.floor((a - 119808) / 26);
    return g4[n];
  } else if (120782 <= a && a <= 120831) {
    var i = Math.floor((a - 120782) / 10);
    return pl[i];
  } else {
    if (a === 120485 || a === 120486) return g4[0];
    if (120486 < a && a < 120782) return gt;
    throw new O("Unsupported character: " + r);
  }
}, Fr = function(e, t, a) {
  if (g0[a][e]) {
    var n = g0[a][e].replace;
    n && (e = n);
  }
  return { value: e, metrics: Da(e, t, a) };
}, j0 = function(e, t, a, n, i) {
  var s = Fr(e, t, a), l = s.metrics;
  e = s.value;
  var h;
  if (l) {
    var d = l.italic;
    (a === "text" || n && n.font === "mathit") && (d = 0), h = new se(e, l.height, l.depth, d, l.skew, l.width, i);
  } else typeof console < "u" && console.warn("No character metrics " + ("for '" + e + "' in style '" + t + "' and mode '" + a + "'")), h = new se(e, 0, 0, 0, 0, 0, i);
  if (n) {
    h.maxFontSize = n.sizeMultiplier, n.style.isTight() && h.classes.push("mtight");
    var f = n.getColor();
    f && (h.style.color = f);
  }
  return h;
}, qa = function(e, t, a, n) {
  return n === void 0 && (n = []), a.font === "boldsymbol" && Fr(e, "Main-Bold", t).metrics ? j0(e, "Main-Bold", t, a, n.concat(["mathbf"])) : e === "\\" || g0[t][e].font === "main" ? j0(e, "Main-Regular", t, a, n) : j0(e, "AMS-Regular", t, a, n.concat(["amsrm"]));
}, bl = function(e, t, a) {
  return a !== "textord" && Fr(e, "Math-BoldItalic", t).metrics ? { fontName: "Math-BoldItalic", fontClass: "boldsymbol" } : { fontName: "Main-Bold", fontClass: "mathbf" };
}, Or = function(e, t) {
  var a = e.type === "mathord" ? "mathord" : "textord", n = e.mode, i = e.text, s = ["mord"], l = t.font, h = t.fontFamily, d = t.fontWeight, f = t.fontShape, y = n === "math" || n === "text" && !!l, x = y ? l : h, w = "", B = "";
  if (i.charCodeAt(0) === 55349) {
    var C = gl(i);
    w = C.font, B = C[n + "Class"];
  }
  if (w) return j0(i, w, n, t, s.concat(B));
  if (x) {
    var D, q;
    if (x === "boldsymbol") {
      var E = bl(i, n, a);
      D = E.fontName, q = [E.fontClass];
    } else y ? (D = _1[l].fontName, q = [l]) : (D = or(h, d, f), q = [h, d, f]);
    if (Fr(i, D, n).metrics) return j0(i, D, n, t, s.concat(q));
    if (Object.prototype.hasOwnProperty.call(On, i) && D.slice(0, 10) === "Typewriter") {
      for (var P = [], V = 0; V < i.length; V++) P.push(j0(i[V], D, n, t, s.concat(q)));
      return Ve(P);
    }
  }
  if (a === "mathord") return j0(i, "Math-Italic", n, t, s.concat(["mathnormal"]));
  if (a === "textord") {
    var X = g0[n][i] && g0[n][i].font;
    if (X === "ams") {
      var Y = or("amsrm", d, f);
      return j0(i, Y, n, t, s.concat("amsrm", d, f));
    } else if (X === "main" || !X) {
      var J = or("textrm", d, f);
      return j0(i, J, n, t, s.concat(d, f));
    } else {
      var Q = or(X, d, f);
      return j0(i, Q, n, t, s.concat(Q, d, f));
    }
  } else throw new Error("unexpected type: " + a + " in makeOrd");
}, yl = (r, e) => {
  if (et(r.classes) !== et(e.classes) || r.skew !== e.skew || r.maxFontSize !== e.maxFontSize || r.italic !== 0 && r.hasClass("mathnormal")) return false;
  if (r.classes.length === 1) {
    var t = r.classes[0];
    if (t === "mbin" || t === "mord") return false;
  }
  for (var a of Object.keys(r.style)) if (r.style[a] !== e.style[a]) return false;
  for (var n of Object.keys(e.style)) if (r.style[n] !== e.style[n]) return false;
  return true;
}, $n = (r) => {
  for (var e = 0; e < r.length - 1; e++) {
    var t = r[e], a = r[e + 1];
    t instanceof se && a instanceof se && yl(t, a) && (t.text += a.text, t.height = Math.max(t.height, a.height), t.depth = Math.max(t.depth, a.depth), t.italic = a.italic, r.splice(e + 1, 1), e--);
  }
  return r;
}, Ea = function(e) {
  for (var t = 0, a = 0, n = 0, i = 0; i < e.children.length; i++) {
    var s = e.children[i];
    s.height > t && (t = s.height), s.depth > a && (a = s.depth), s.maxFontSize > n && (n = s.maxFontSize);
  }
  e.height = t, e.depth = a, e.maxFontSize = n;
}, I = function(e, t, a, n) {
  var i = new Et(e, t, a, n);
  return Ea(i), i;
}, rt = (r, e, t, a) => new Et(r, e, t, a), Mt = function(e, t, a) {
  var n = I([e], [], t);
  return n.height = Math.max(a || t.fontMetrics().defaultRuleThickness, t.minRuleThickness), n.style.borderBottomWidth = G(n.height), n.maxFontSize = 1, n;
}, xl = function(e, t, a, n) {
  var i = new Ir(e, t, a, n);
  return Ea(i), i;
}, Ve = function(e) {
  var t = new qt(e);
  return Ea(t), t;
}, Tt = function(e, t) {
  return e instanceof qt ? I([], [e], t) : e;
}, wl = function(e) {
  if (e.positionType === "individualShift") {
    for (var t = e.children, a = [t[0]], n = -t[0].shift - t[0].elem.depth, i = n, s = 1; s < t.length; s++) {
      var l = -t[s].shift - i - t[s].elem.depth, h = l - (t[s - 1].elem.height + t[s - 1].elem.depth);
      i = i + l, a.push({ type: "kern", size: h }), a.push(t[s]);
    }
    return { children: a, depth: n };
  }
  var d;
  if (e.positionType === "top") {
    for (var f = e.positionData, y = 0; y < e.children.length; y++) {
      var x = e.children[y];
      f -= x.type === "kern" ? x.size : x.elem.height + x.elem.depth;
    }
    d = f;
  } else if (e.positionType === "bottom") d = -e.positionData;
  else {
    var w = e.children[0];
    if (w.type !== "elem") throw new Error('First child must have type "elem".');
    if (e.positionType === "shift") d = -w.elem.depth - e.positionData;
    else if (e.positionType === "firstBaseline") d = -w.elem.depth;
    else throw new Error("Invalid positionType " + e.positionType + ".");
  }
  return { children: e.children, depth: d };
}, m0 = function(e, t) {
  for (var a = wl(e), n = a.children, i = a.depth, s = 0, l = 0; l < n.length; l++) {
    var h = n[l];
    if (h.type === "elem") {
      var d = h.elem;
      s = Math.max(s, d.maxFontSize, d.height);
    }
  }
  s += 2;
  var f = I(["pstrut"], []);
  f.style.height = G(s);
  for (var y = [], x = i, w = i, B = i, C = 0; C < n.length; C++) {
    var D = n[C];
    if (D.type === "kern") B += D.size;
    else {
      var q = D.elem, E = D.wrapperClasses || [], P = D.wrapperStyle || {}, V = I(E, [f, q], void 0, P);
      V.style.top = G(-s - B - q.depth), D.marginLeft && (V.style.marginLeft = D.marginLeft), D.marginRight && (V.style.marginRight = D.marginRight), y.push(V), B += q.height + q.depth;
    }
    x = Math.min(x, B), w = Math.max(w, B);
  }
  var X = I(["vlist"], y);
  X.style.height = G(w);
  var Y;
  if (x < 0) {
    var J = I([], []), Q = I(["vlist"], [J]);
    Q.style.height = G(-x);
    var _ = I(["vlist-s"], [new se("\u200B")]);
    Y = [I(["vlist-r"], [X, _]), I(["vlist-r"], [Q])];
  } else Y = [I(["vlist-r"], [X])];
  var u0 = I(["vlist-t"], Y);
  return Y.length === 2 && u0.classes.push("vlist-t2"), u0.height = w, u0.depth = -x, u0;
}, Hn = (r, e) => {
  var t = I(["mspace"], [], e), a = A0(r, e);
  return t.style.marginRight = G(a), t;
}, or = (r, e, t) => {
  var a, n;
  switch (r) {
    case "amsrm":
      a = "AMS";
      break;
    case "textrm":
      a = "Main";
      break;
    case "textsf":
      a = "SansSerif";
      break;
    case "texttt":
      a = "Typewriter";
      break;
    default:
      a = r;
  }
  return e === "textbf" && t === "textit" ? n = "BoldItalic" : e === "textbf" ? n = "Bold" : t === "textit" ? n = "Italic" : n = "Regular", a + "-" + n;
}, _1 = { mathbf: { variant: "bold", fontName: "Main-Bold" }, mathrm: { variant: "normal", fontName: "Main-Regular" }, textit: { variant: "italic", fontName: "Main-Italic" }, mathit: { variant: "italic", fontName: "Main-Italic" }, mathnormal: { variant: "italic", fontName: "Math-Italic" }, mathsfit: { variant: "sans-serif-italic", fontName: "SansSerif-Italic" }, mathbb: { variant: "double-struck", fontName: "AMS-Regular" }, mathcal: { variant: "script", fontName: "Caligraphic-Regular" }, mathfrak: { variant: "fraktur", fontName: "Fraktur-Regular" }, mathscr: { variant: "script", fontName: "Script-Regular" }, mathsf: { variant: "sans-serif", fontName: "SansSerif-Regular" }, mathtt: { variant: "monospace", fontName: "Typewriter-Regular" } }, Ln = { vec: ["vec", 0.471, 0.714], oiintSize1: ["oiintSize1", 0.957, 0.499], oiintSize2: ["oiintSize2", 1.472, 0.659], oiiintSize1: ["oiiintSize1", 1.304, 0.499], oiiintSize2: ["oiiintSize2", 1.98, 0.659] }, Pn = function(e, t) {
  var a = Ln[e], n = a[0], i = a[1], s = a[2], l = new tt(n), h = new Le([l], { width: G(i), height: G(s), style: "width:" + G(i), viewBox: "0 0 " + 1e3 * i + " " + 1e3 * s, preserveAspectRatio: "xMinYMin" }), d = rt(["katex-overlay"], [h], t);
  return d.height = s, d.style.height = G(s), d.style.width = G(i), d;
}, S0 = { number: 3, unit: "mu" }, dt = { number: 4, unit: "mu" }, Ie = { number: 5, unit: "mu" }, kl = { mord: { mop: S0, mbin: dt, mrel: Ie, minner: S0 }, mop: { mord: S0, mop: S0, mrel: Ie, minner: S0 }, mbin: { mord: dt, mop: dt, mopen: dt, minner: dt }, mrel: { mord: Ie, mop: Ie, mopen: Ie, minner: Ie }, mopen: {}, mclose: { mop: S0, mbin: dt, mrel: Ie, minner: S0 }, mpunct: { mord: S0, mop: S0, mrel: Ie, mopen: S0, mclose: S0, mpunct: S0, minner: S0 }, minner: { mord: S0, mop: S0, mbin: dt, mrel: Ie, mopen: S0, mpunct: S0, minner: S0 } }, Sl = { mord: { mop: S0 }, mop: { mord: S0, mop: S0 }, mbin: {}, mrel: {}, mopen: {}, mclose: { mop: S0 }, mpunct: {}, minner: { mop: S0 } }, Gn = {}, Qt = {}, _t = {};
function W(r) {
  for (var e = r.type, t = r.names, a = r.htmlBuilder, n = r.mathmlBuilder, i = 0; i < t.length; ++i) Gn[t[i]] = r;
  e && (a && (Qt[e] = a), n && (_t[e] = n));
}
function yt(r) {
  var e = r.type, t = r.htmlBuilder, a = r.mathmlBuilder;
  t && (Qt[e] = t), a && (_t[e] = a);
}
var er = function(e) {
  return e.type === "ordgroup" && e.body.length === 1 ? e.body[0] : e;
}, D0 = function(e) {
  return e.type === "ordgroup" ? e.body : [e];
}, zl = /* @__PURE__ */ new Set(["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"]), Al = /* @__PURE__ */ new Set(["rightmost", "mrel", "mclose", "mpunct"]), Ml = { display: n0.DISPLAY, text: n0.TEXT, script: n0.SCRIPT, scriptscript: n0.SCRIPTSCRIPT }, Tl = { mord: "mord", mop: "mop", mbin: "mbin", mrel: "mrel", mopen: "mopen", mclose: "mclose", mpunct: "mpunct", minner: "minner" }, $0 = function(e, t, a, n) {
  n === void 0 && (n = [null, null]);
  for (var i = [], s = 0; s < e.length; s++) {
    var l = h0(e[s], t);
    if (l instanceof qt) {
      var h = l.children;
      i.push(...h);
    } else i.push(l);
  }
  if ($n(i), !a) return i;
  var d = t;
  if (e.length === 1) {
    var f = e[0];
    f.type === "sizing" ? d = t.havingSize(f.size) : f.type === "styling" && (d = t.havingStyle(Ml[f.style]));
  }
  var y = I([n[0] || "leftmost"], [], t), x = I([n[1] || "rightmost"], [], t), w = a === "root";
  return ea(i, (B, C) => {
    var D = C.classes[0], q = B.classes[0];
    D === "mbin" && Al.has(q) ? C.classes[0] = "mord" : q === "mbin" && zl.has(D) && (B.classes[0] = "mord");
  }, { node: y }, x, w), ea(i, (B, C) => {
    var D, q, E = ra(C), P = ra(B), V = E && P ? B.hasClass("mtight") ? (D = Sl[E]) == null ? void 0 : D[P] : (q = kl[E]) == null ? void 0 : q[P] : null;
    if (V) return Hn(V, d);
  }, { node: y }, x, w), i;
}, ea = function(e, t, a, n, i) {
  n && e.push(n);
  for (var s = 0; s < e.length; s++) {
    var l = e[s], h = Un(l);
    if (h) {
      ea(h.children, t, a, null, i);
      continue;
    }
    var d = !l.hasClass("mspace");
    if (d) {
      var f = t(l, a.node);
      f && (a.insertAfter ? a.insertAfter(f) : (e.unshift(f), s++));
    }
    d ? a.node = l : i && l.hasClass("katex-newline") && (a.node = I(["leftmost"])), a.insertAfter = /* @__PURE__ */ ((y) => (x) => {
      e.splice(y + 1, 0, x), s++;
    })(s);
  }
  n && e.pop();
}, Un = function(e) {
  return e instanceof qt || e instanceof Ir || e instanceof Et && e.hasClass("enclosing") ? e : null;
}, ta = function(e, t) {
  var a = Un(e);
  if (a) {
    var n = a.children;
    if (n.length) {
      if (t === "right") return ta(n[n.length - 1], "right");
      if (t === "left") return ta(n[0], "left");
    }
  }
  return e;
}, ra = function(e, t) {
  if (!e) return null;
  t && (e = ta(e, t));
  var a = e.classes[0];
  return Tl[a] || null;
}, tr = function(e, t) {
  var a = ["nulldelimiter"].concat(e.baseSizingClasses());
  return I(t.concat(a));
}, h0 = function(e, t, a) {
  if (!e) return I();
  if (Qt[e.type]) {
    var n = Qt[e.type](e, t);
    if (a && t.size !== a.size) {
      n = I(t.sizingClasses(a), [n], t);
      var i = t.sizeMultiplier / a.sizeMultiplier;
      n.height *= i, n.depth *= i;
    }
    return n;
  } else throw new O("Got group of unknown type: '" + e.type + "'");
};
function hr(r, e) {
  var t = I(["katex-base"], r, e), a = I(["katex-strut"]);
  return a.style.height = G(t.height + t.depth), t.depth && (a.style.verticalAlign = G(-t.depth)), t.children.unshift(a), t;
}
function aa(r, e) {
  var t = null;
  r.length === 1 && r[0].type === "tag" && (t = r[0].tag, r = r[0].body);
  var a = $0(r, e, "root"), n;
  a.length === 2 && a[1].hasClass("katex-tag") && (n = a.pop());
  for (var i = [], s = [], l = 0; l < a.length; l++) if (s.push(a[l]), a[l].hasClass("mbin") || a[l].hasClass("mrel") || a[l].hasClass("allowbreak")) {
    for (var h = false; l < a.length - 1 && a[l + 1].hasClass("mspace") && !a[l + 1].hasClass("katex-newline"); ) l++, s.push(a[l]), a[l].hasClass("nobreak") && (h = true);
    h || (i.push(hr(s, e)), s = []);
  } else a[l].hasClass("katex-newline") && (s.pop(), s.length > 0 && (i.push(hr(s, e)), s = []), i.push(a[l]));
  s.length > 0 && i.push(hr(s, e));
  var d;
  t ? (d = hr($0(t, e, true), e), d.classes = ["katex-tag"], i.push(d)) : n && i.push(n);
  var f = I(["katex-html"], i);
  if (f.setAttribute("aria-hidden", "true"), d) {
    var y = d.children[0];
    y.style.height = G(f.height + f.depth), f.depth && (y.style.verticalAlign = G(-f.depth));
  }
  return f;
}
function Vn(r) {
  return new qt(r);
}
let H = class {
  constructor(e, t, a) {
    this.type = void 0, this.attributes = void 0, this.children = void 0, this.classes = void 0, this.type = e, this.attributes = {}, this.children = t || [], this.classes = a || [];
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  toNode() {
    var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
    for (var t of Object.entries(this.attributes)) {
      var a = t[0], n = t[1];
      e.setAttribute(a, n);
    }
    this.classes.length > 0 && (e.className = et(this.classes));
    for (var i = 0; i < this.children.length; i++) if (this.children[i] instanceof q0 && this.children[i + 1] instanceof q0) {
      for (var s = this.children[i].toText() + this.children[++i].toText(); this.children[i + 1] instanceof q0; ) s += this.children[++i].toText();
      e.appendChild(new q0(s).toNode());
    } else e.appendChild(this.children[i].toNode());
    return e;
  }
  toMarkup() {
    var e = "<" + this.type;
    for (var t of Object.entries(this.attributes)) {
      var a = t[0], n = t[1];
      e += " " + a + '="', e += U0(n), e += '"';
    }
    this.classes.length > 0 && (e += ' class ="' + U0(et(this.classes)) + '"'), e += ">";
    for (var i = 0; i < this.children.length; i++) e += this.children[i].toMarkup();
    return e += "</" + this.type + ">", e;
  }
  toText() {
    return this.children.map((e) => e.toText()).join("");
  }
}, q0 = class {
  constructor(e) {
    this.text = void 0, this.text = e;
  }
  toNode() {
    return document.createTextNode(this.text);
  }
  toMarkup() {
    return U0(this.toText());
  }
  toText() {
    return this.text;
  }
}, Xn = class {
  constructor(e) {
    this.width = void 0, this.character = void 0, this.width = e, e >= 0.05555 && e <= 0.05556 ? this.character = "\u200A" : e >= 0.1666 && e <= 0.1667 ? this.character = "\u2009" : e >= 0.2222 && e <= 0.2223 ? this.character = "\u2005" : e >= 0.2777 && e <= 0.2778 ? this.character = "\u2005\u200A" : e >= -0.05556 && e <= -0.05555 ? this.character = "\u200A\u2063" : e >= -0.1667 && e <= -0.1666 ? this.character = "\u2009\u2063" : e >= -0.2223 && e <= -0.2222 ? this.character = "\u205F\u2063" : e >= -0.2778 && e <= -0.2777 ? this.character = "\u2005\u2063" : this.character = null;
  }
  toNode() {
    if (this.character) return document.createTextNode(this.character);
    var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
    return e.setAttribute("width", G(this.width)), e;
  }
  toMarkup() {
    return this.character ? "<mtext>" + this.character + "</mtext>" : '<mspace width="' + G(this.width) + '"/>';
  }
  toText() {
    return this.character ? this.character : " ";
  }
};
var Bl = /* @__PURE__ */ new Set(["\\imath", "\\jmath"]), Cl = /* @__PURE__ */ new Set(["mrow", "mtable"]), ve = function(e, t, a) {
  var n, i;
  return g0[t][e] && g0[t][e].replace && e.charCodeAt(0) !== 55349 && !(Object.prototype.hasOwnProperty.call(On, e) && ((a == null || (n = a.fontFamily) == null ? void 0 : n.slice(4, 6)) === "tt" || (a == null || (i = a.font) == null ? void 0 : i.slice(4, 6)) === "tt")) && (e = g0[t][e].replace), new q0(e);
}, Na = function(e) {
  return e.length === 1 ? e[0] : new H("mrow", e);
}, Dl = { mathit: "italic", boldsymbol: (r) => r.type === "textord" ? "bold" : "bold-italic", mathbf: "bold", mathbb: "double-struck", mathsfit: "sans-serif-italic", mathfrak: "fraktur", mathscr: "script", mathcal: "script", mathsf: "sans-serif", mathtt: "monospace" }, Ra = (r, e) => {
  if (r.mode === "text") {
    if (e.fontFamily === "texttt") return "monospace";
    if (e.fontFamily === "textsf") return e.fontShape === "textit" && e.fontWeight === "textbf" ? "sans-serif-bold-italic" : e.fontShape === "textit" ? "sans-serif-italic" : e.fontWeight === "textbf" ? "bold-sans-serif" : "sans-serif";
    if (e.fontShape === "textit" && e.fontWeight === "textbf") return "bold-italic";
    if (e.fontShape === "textit") return "italic";
    if (e.fontWeight === "textbf") return "bold";
  }
  var t = e.font;
  if (!t || t === "mathnormal") return null;
  var a = r.mode, n = Dl[t];
  if (n) return typeof n == "function" ? n(r) : n;
  var i = r.text;
  if (Bl.has(i)) return null;
  if (g0[a][i]) {
    var s = g0[a][i].replace;
    s && (i = s);
  }
  var l = _1[t].fontName;
  return Da(i, l, a) ? _1[t].variant : null;
};
function x1(r) {
  if (!r) return false;
  if (r.type === "mi" && r.children.length === 1) {
    var e = r.children[0];
    return e instanceof q0 && e.text === ".";
  } else if (r.type === "mo" && r.children.length === 1 && r.getAttribute("separator") === "true" && r.getAttribute("lspace") === "0em" && r.getAttribute("rspace") === "0em") {
    var t = r.children[0];
    return t instanceof q0 && t.text === ",";
  } else return false;
}
var oe = function(e, t, a) {
  if (e.length === 1) {
    var n = f0(e[0], t);
    return a && n instanceof H && n.type === "mo" && (n.setAttribute("lspace", "0em"), n.setAttribute("rspace", "0em")), [n];
  }
  for (var i = [], s, l = 0; l < e.length; l++) {
    var h = f0(e[l], t);
    if (h instanceof H && s instanceof H) {
      if (h.type === "mtext" && s.type === "mtext" && h.getAttribute("mathvariant") === s.getAttribute("mathvariant")) {
        s.children.push(...h.children);
        continue;
      } else if (h.type === "mn" && s.type === "mn") {
        s.children.push(...h.children);
        continue;
      } else if (x1(h) && s.type === "mn") {
        s.children.push(...h.children);
        continue;
      } else if (h.type === "mn" && x1(s)) h.children = [...s.children, ...h.children], i.pop();
      else if ((h.type === "msup" || h.type === "msub") && h.children.length >= 1 && (s.type === "mn" || x1(s))) {
        var d = h.children[0];
        d instanceof H && d.type === "mn" && (d.children = [...s.children, ...d.children], i.pop());
      } else if (s.type === "mi" && s.children.length === 1) {
        var f = s.children[0];
        if (f instanceof q0 && f.text === "\u0338" && (h.type === "mo" || h.type === "mi" || h.type === "mn")) {
          var y = h.children[0];
          y instanceof q0 && y.text.length > 0 && (y.text = y.text.slice(0, 1) + "\u0338" + y.text.slice(1), i.pop());
        }
      }
    }
    i.push(h), s = h;
  }
  return i;
}, at = function(e, t, a) {
  return Na(oe(e, t, a));
}, f0 = function(e, t) {
  if (!e) return new H("mrow");
  if (_t[e.type]) return _t[e.type](e, t);
  throw new O("Got group of unknown type: '" + e.type + "'");
};
function b4(r, e, t, a, n) {
  var i = oe(r, t), s;
  i.length === 1 && i[0] instanceof H && Cl.has(i[0].type) ? s = i[0] : s = new H("mrow", i);
  var l = new H("annotation", [new q0(e)]);
  l.setAttribute("encoding", "application/x-tex");
  var h = new H("semantics", [s, l]), d = new H("math", [h]);
  d.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"), a && d.setAttribute("display", "block");
  var f = n ? "katex" : "katex-mathml";
  return I([f], [d]);
}
var ql = [[1, 1, 1], [2, 1, 1], [3, 1, 1], [4, 2, 1], [5, 2, 1], [6, 3, 1], [7, 4, 2], [8, 6, 3], [9, 7, 6], [10, 8, 7], [11, 10, 9]], y4 = [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.2, 1.44, 1.728, 2.074, 2.488], x4 = function(e, t) {
  return t.size < 2 ? e : ql[e - 1][t.size - 1];
};
let Yn = class pt {
  constructor(e) {
    this.style = void 0, this.color = void 0, this.size = void 0, this.textSize = void 0, this.phantom = void 0, this.font = void 0, this.fontFamily = void 0, this.fontWeight = void 0, this.fontShape = void 0, this.sizeMultiplier = void 0, this.maxSize = void 0, this.minRuleThickness = void 0, this._fontMetrics = void 0, this.style = e.style, this.color = e.color, this.size = e.size || pt.BASESIZE, this.textSize = e.textSize || this.size, this.phantom = !!e.phantom, this.font = e.font || "", this.fontFamily = e.fontFamily || "", this.fontWeight = e.fontWeight || "", this.fontShape = e.fontShape || "", this.sizeMultiplier = y4[this.size - 1], this.maxSize = e.maxSize, this.minRuleThickness = e.minRuleThickness, this._fontMetrics = void 0;
  }
  extend(e) {
    var t = { style: this.style, size: this.size, textSize: this.textSize, color: this.color, phantom: this.phantom, font: this.font, fontFamily: this.fontFamily, fontWeight: this.fontWeight, fontShape: this.fontShape, maxSize: this.maxSize, minRuleThickness: this.minRuleThickness };
    return Object.assign(t, e), new pt(t);
  }
  havingStyle(e) {
    return this.style === e ? this : this.extend({ style: e, size: x4(this.textSize, e) });
  }
  havingCrampedStyle() {
    return this.havingStyle(this.style.cramp());
  }
  havingSize(e) {
    return this.size === e && this.textSize === e ? this : this.extend({ style: this.style.text(), size: e, textSize: e, sizeMultiplier: y4[e - 1] });
  }
  havingBaseStyle(e) {
    e = e || this.style.text();
    var t = x4(pt.BASESIZE, e);
    return this.size === t && this.textSize === pt.BASESIZE && this.style === e ? this : this.extend({ style: e, size: t });
  }
  havingBaseSizing() {
    var e;
    switch (this.style.id) {
      case 4:
      case 5:
        e = 3;
        break;
      case 6:
      case 7:
        e = 1;
        break;
      default:
        e = 6;
    }
    return this.extend({ style: this.style.text(), size: e });
  }
  withColor(e) {
    return this.extend({ color: e });
  }
  withPhantom() {
    return this.extend({ phantom: true });
  }
  withFont(e) {
    return this.extend({ font: e });
  }
  withTextFontFamily(e) {
    return this.extend({ fontFamily: e, font: "" });
  }
  withTextFontWeight(e) {
    return this.extend({ fontWeight: e, font: "" });
  }
  withTextFontShape(e) {
    return this.extend({ fontShape: e, font: "" });
  }
  sizingClasses(e) {
    return e.size !== this.size ? ["katex-sizing", "reset-size" + e.size, "size" + this.size] : [];
  }
  baseSizingClasses() {
    return this.size !== pt.BASESIZE ? ["katex-sizing", "reset-size" + this.size, "size" + pt.BASESIZE] : [];
  }
  fontMetrics() {
    return this._fontMetrics || (this._fontMetrics = fl(this.size)), this._fontMetrics;
  }
  getColor() {
    return this.phantom ? "transparent" : this.color;
  }
};
Yn.BASESIZE = 6;
var Wn = function(e) {
  return new Yn({ style: e.displayMode ? n0.DISPLAY : n0.TEXT, maxSize: e.maxSize, minRuleThickness: e.minRuleThickness });
}, jn = function(e, t) {
  if (t.displayMode) {
    var a = ["katex-display"];
    t.leqno && a.push("leqno"), t.fleqn && a.push("fleqn"), e = I(a, [e]);
  }
  return e;
}, El = function(e, t, a) {
  var n = Wn(a), i;
  if (a.output === "mathml") return b4(e, t, n, a.displayMode, true);
  if (a.output === "html") {
    var s = aa(e, n);
    i = I(["katex"], [s]);
  } else {
    var l = b4(e, t, n, a.displayMode, false), h = aa(e, n);
    i = I(["katex"], [l, h]);
  }
  return jn(i, a);
}, Nl = function(e, t, a) {
  var n = Wn(a), i = aa(e, n), s = I(["katex"], [i]);
  return jn(s, a);
}, Rl = { widehat: "^", widecheck: "\u02C7", widetilde: "~", utilde: "~", overleftarrow: "\u2190", underleftarrow: "\u2190", xleftarrow: "\u2190", overrightarrow: "\u2192", underrightarrow: "\u2192", xrightarrow: "\u2192", underbrace: "\u23DF", overbrace: "\u23DE", underbracket: "\u23B5", overbracket: "\u23B4", overgroup: "\u23E0", undergroup: "\u23E1", overleftrightarrow: "\u2194", underleftrightarrow: "\u2194", xleftrightarrow: "\u2194", Overrightarrow: "\u21D2", xRightarrow: "\u21D2", overleftharpoon: "\u21BC", xleftharpoonup: "\u21BC", overrightharpoon: "\u21C0", xrightharpoonup: "\u21C0", xLeftarrow: "\u21D0", xLeftrightarrow: "\u21D4", xhookleftarrow: "\u21A9", xhookrightarrow: "\u21AA", xmapsto: "\u21A6", xrightharpoondown: "\u21C1", xleftharpoondown: "\u21BD", xrightleftharpoons: "\u21CC", xleftrightharpoons: "\u21CB", xtwoheadleftarrow: "\u219E", xtwoheadrightarrow: "\u21A0", xlongequal: "=", xtofrom: "\u21C4", xrightleftarrows: "\u21C4", xrightequilibrium: "\u21CC", xleftequilibrium: "\u21CB", "\\cdrightarrow": "\u2192", "\\cdleftarrow": "\u2190", "\\cdlongequal": "=" }, $r = function(e) {
  var t = new H("mo", [new q0(Rl[e.replace(/^\\/, "")])]);
  return t.setAttribute("stretchy", "true"), t;
}, Il = { overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"], overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"], underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"], underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"], xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"], "\\cdrightarrow": [["rightarrow"], 3, 522, "xMaxYMin"], xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"], "\\cdleftarrow": [["leftarrow"], 3, 522, "xMinYMin"], Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"], xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"], xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"], overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"], xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"], xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"], overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"], xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"], xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"], xlongequal: [["longequal"], 0.888, 334, "xMinYMin"], "\\cdlongequal": [["longequal"], 3, 334, "xMinYMin"], xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"], xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"], overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522], overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548], underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548], underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522], xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522], xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560], xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716], xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716], xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522], xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522], overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522], underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522], overbracket: [["leftbracketover", "rightbracketover"], 1.6, 440], underbracket: [["leftbracketunder", "rightbracketunder"], 1.6, 410], overgroup: [["leftgroup", "rightgroup"], 0.888, 342], undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342], xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522], xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528], xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901], xrightequilibrium: [["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716], xleftequilibrium: [["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716] }, Fl = /* @__PURE__ */ new Set(["widehat", "widecheck", "widetilde", "utilde"]), Hr = function(e, t) {
  function a() {
    var h = 4e5, d = e.label.slice(1);
    if (Fl.has(d) && "base" in e) {
      var f = e.base.type === "ordgroup" ? e.base.body.length : 1, y, x, w;
      if (f > 5) d === "widehat" || d === "widecheck" ? (y = 420, h = 2364, w = 0.42, x = d + "4") : (y = 312, h = 2340, w = 0.34, x = "tilde4");
      else {
        var B = [1, 1, 2, 2, 3, 3][f];
        d === "widehat" || d === "widecheck" ? (h = [0, 1062, 2364, 2364, 2364][B], y = [0, 239, 300, 360, 420][B], w = [0, 0.24, 0.3, 0.3, 0.36, 0.42][B], x = d + B) : (h = [0, 600, 1033, 2339, 2340][B], y = [0, 260, 286, 306, 312][B], w = [0, 0.26, 0.286, 0.3, 0.306, 0.34][B], x = "tilde" + B);
      }
      var C = new tt(x), D = new Le([C], { width: "100%", height: G(w), viewBox: "0 0 " + h + " " + y, preserveAspectRatio: "none" });
      return { span: rt([], [D], t), minWidth: 0, height: w };
    } else {
      var q = [], E = Il[d];
      if (!E) throw new Error('No SVG data for "' + d + '".');
      var P = E[0], V = E[1], X = E[2], Y = X / 1e3, J = P.length, Q, _;
      if (J === 1) {
        if (E.length !== 4) throw new Error('Expected 4-tuple for single-path SVG data "' + d + '".');
        Q = ["hide-tail"], _ = [E[3]];
      } else if (J === 2) Q = ["halfarrow-left", "halfarrow-right"], _ = ["xMinYMin", "xMaxYMin"];
      else if (J === 3) Q = ["brace-left", "brace-center", "brace-right"], _ = ["xMinYMin", "xMidYMin", "xMaxYMin"];
      else throw new Error(`Correct katexImagesData or update code here to support
                    ` + J + " children.");
      for (var u0 = 0; u0 < J; u0++) {
        var v0 = new tt(P[u0]), s0 = new Le([v0], { width: "400em", height: G(Y), viewBox: "0 0 " + h + " " + X, preserveAspectRatio: _[u0] + " slice" }), X0 = rt([Q[u0]], [s0], t);
        if (J === 1) return { span: X0, minWidth: V, height: Y };
        X0.style.height = G(Y), q.push(X0);
      }
      return { span: I(["katex-stretchy"], q, t), minWidth: V, height: Y };
    }
  }
  var n = a(), i = n.span, s = n.minWidth, l = n.height;
  return i.height = l, i.style.height = G(l), s > 0 && (i.style.minWidth = G(s)), i;
}, Ol = function(e, t, a, n, i) {
  var s, l = e.height + e.depth + a + n;
  if (/fbox|color|angl/.test(t)) {
    if (s = I(["katex-stretchy", t], [], i), t === "fbox") {
      var h = i.color && i.getColor();
      h && (s.style.borderColor = h);
    }
  } else {
    var d = [];
    /^[bx]cancel$/.test(t) && d.push(new W1({ x1: "0", y1: "0", x2: "100%", y2: "100%", "stroke-width": "0.046em" })), /^x?cancel$/.test(t) && d.push(new W1({ x1: "0", y1: "100%", x2: "100%", y2: "0", "stroke-width": "0.046em" }));
    var f = new Le(d, { width: "100%", height: G(l) });
    s = rt([], [f], i);
  }
  return s.height = l, s.style.height = G(l), s;
}, $l = ["bin", "close", "inner", "open", "punct", "rel"], Hl = ["accent-token", "mathord", "op-token", "spacing", "textord"], Ll = new Set($l), Pl = new Set(Hl);
function Gl(r) {
  return Ll.has(r);
}
function o0(r, e) {
  if (!r || r.type !== e) throw new Error("Expected node of type " + e + ", but got " + (r ? "node of type " + r.type : String(r)));
  return r;
}
function Lr(r) {
  var e = Pr(r);
  if (!e) throw new Error("Expected node of symbol group type, but got " + (r ? "node of type " + r.type : String(r)));
  return e;
}
function Pr(r) {
  return r.type === "atom" || Pl.has(r.type) ? r : null;
}
function Ia(r, e, t) {
  var a = "";
  for (var n of r.body) if (n.type === "textord") a += n.text;
  else if (t && n.type === "spacing" && n.text === " ") a += " ";
  else throw new O(e, r);
  return a;
}
var Zn = (r) => {
  if (r instanceof se) return r;
  if (dl(r) && r.children.length === 1) return Zn(r.children[0]);
}, Kn = (r, e) => {
  var t, a, n;
  r && r.type === "supsub" ? (a = o0(r.base, "accent"), t = a.base, r.base = t, n = cl(h0(r, e)), r.base = a) : (a = o0(r, "accent"), t = a.base);
  var i = h0(t, e.havingCrampedStyle()), s = a.isShifty && Ge(t), l = 0;
  if (s) {
    var h, d;
    l = (h = (d = Zn(i)) == null ? void 0 : d.skew) != null ? h : 0;
  }
  var f = a.label === "\\c", y = f ? i.height + i.depth : Math.min(i.height, e.fontMetrics().xHeight), x;
  if (a.isStretchy) x = Hr(a, e), x = m0({ positionType: "firstBaseline", children: [{ type: "elem", elem: i }, { type: "elem", elem: x, wrapperClasses: ["svg-align"], wrapperStyle: l > 0 ? { width: "calc(100% - " + G(2 * l) + ")", marginLeft: G(2 * l) } : void 0 }] });
  else {
    var w, B;
    a.label === "\\vec" ? (w = Pn("vec", e), B = Ln.vec[1]) : (w = Or({ type: "textord", mode: a.mode, text: a.label }, e), w = ml(w), w.italic = 0, B = w.width, f && (y += w.depth)), x = I(["accent-body"], [w]);
    var C = a.label === "\\textcircled";
    C && (x.classes.push("accent-full"), y = i.height);
    var D = l;
    C || (D -= B / 2), x.style.left = G(D), a.label === "\\textcircled" && (x.style.top = ".2em"), x = m0({ positionType: "firstBaseline", children: [{ type: "elem", elem: i }, { type: "kern", size: -y }, { type: "elem", elem: x }] });
  }
  var q = I(["mord", "katex-accent"], [x], e);
  return n ? (n.children[0] = q, n.height = Math.max(q.height, n.height), n.classes[0] = "mord", n) : q;
}, Ul = (r, e) => {
  var t = r.isStretchy ? $r(r.label) : new H("mo", [ve(r.label, r.mode)]), a = new H("mover", [f0(r.base, e), t]);
  return a.setAttribute("accent", "true"), a;
}, Vl = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map((r) => "\\" + r).join("|"));
W({ type: "accent", names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"], numArgs: 1, handler: (r, e) => {
  var t = er(e[0]), a = !Vl.test(r.funcName), n = !a || r.funcName === "\\widehat" || r.funcName === "\\widetilde" || r.funcName === "\\widecheck";
  return { type: "accent", mode: r.parser.mode, label: r.funcName, isStretchy: a, isShifty: n, base: t };
}, htmlBuilder: Kn, mathmlBuilder: Ul });
W({ type: "accent", names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\c", "\\r", "\\H", "\\v", "\\textcircled"], numArgs: 1, allowedInText: true, allowedInMath: true, argTypes: ["primitive"], handler: (r, e) => {
  var t = e[0], a = r.parser.mode;
  return a === "math" && (r.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + r.funcName + " works only in text mode"), a = "text"), { type: "accent", mode: a, label: r.funcName, isStretchy: false, isShifty: true, base: t };
} });
W({ type: "accentUnder", names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"], numArgs: 1, handler: (r, e) => {
  var t = r.parser, a = r.funcName, n = e[0];
  return { type: "accentUnder", mode: t.mode, label: a, base: n };
}, htmlBuilder: (r, e) => {
  var t = h0(r.base, e), a = Hr(r, e), n = r.label === "\\utilde" ? 0.12 : 0, i = m0({ positionType: "top", positionData: t.height, children: [{ type: "elem", elem: a, wrapperClasses: ["svg-align"] }, { type: "kern", size: n }, { type: "elem", elem: t }] });
  return I(["mord", "accentunder"], [i], e);
}, mathmlBuilder: (r, e) => {
  var t = $r(r.label), a = new H("munder", [f0(r.base, e), t]);
  return a.setAttribute("accentunder", "true"), a;
} });
var mr = (r) => {
  var e = new H("mpadded", r ? [r] : []);
  return e.setAttribute("width", "+0.6em"), e.setAttribute("lspace", "0.3em"), e;
};
W({ type: "xArrow", names: ["\\xleftarrow", "\\xrightarrow", "\\xLeftarrow", "\\xRightarrow", "\\xleftrightarrow", "\\xLeftrightarrow", "\\xhookleftarrow", "\\xhookrightarrow", "\\xmapsto", "\\xrightharpoondown", "\\xrightharpoonup", "\\xleftharpoondown", "\\xleftharpoonup", "\\xrightleftharpoons", "\\xleftrightharpoons", "\\xlongequal", "\\xtwoheadrightarrow", "\\xtwoheadleftarrow", "\\xtofrom", "\\xrightleftarrows", "\\xrightequilibrium", "\\xleftequilibrium", "\\\\cdrightarrow", "\\\\cdleftarrow", "\\\\cdlongequal"], numArgs: 1, numOptionalArgs: 1, handler(r, e, t) {
  var a = r.parser, n = r.funcName;
  return { type: "xArrow", mode: a.mode, label: n, body: e[0], below: t[0] };
}, htmlBuilder(r, e) {
  var t = e.style, a = e.havingStyle(t.sup()), n = Tt(h0(r.body, a, e), e), i = r.label.slice(0, 2) === "\\x" ? "x" : "cd";
  n.classes.push(i + "-arrow-pad");
  var s;
  r.below && (a = e.havingStyle(t.sub()), s = Tt(h0(r.below, a, e), e), s.classes.push(i + "-arrow-pad"));
  var l = Hr(r, e), h = -e.fontMetrics().axisHeight + 0.5 * l.height, d = -e.fontMetrics().axisHeight - 0.5 * l.height - 0.111;
  (n.depth > 0.25 || r.label === "\\xleftequilibrium") && (d -= n.depth);
  var f;
  if (s) {
    var y = -e.fontMetrics().axisHeight + s.height + 0.5 * l.height + 0.111;
    f = m0({ positionType: "individualShift", children: [{ type: "elem", elem: n, shift: d }, { type: "elem", elem: l, shift: h, wrapperClasses: ["svg-align"] }, { type: "elem", elem: s, shift: y }] });
  } else f = m0({ positionType: "individualShift", children: [{ type: "elem", elem: n, shift: d }, { type: "elem", elem: l, shift: h, wrapperClasses: ["svg-align"] }] });
  return I(["mrel", "x-arrow"], [f], e);
}, mathmlBuilder(r, e) {
  var t = $r(r.label);
  t.setAttribute("minsize", r.label.charAt(0) === "x" ? "1.75em" : "3.0em");
  var a;
  if (r.body) {
    var n = mr(f0(r.body, e));
    if (r.below) {
      var i = mr(f0(r.below, e));
      a = new H("munderover", [t, i, n]);
    } else a = new H("mover", [t, n]);
  } else if (r.below) {
    var s = mr(f0(r.below, e));
    a = new H("munder", [t, s]);
  } else a = mr(), a = new H("mover", [t, a]);
  return a;
} });
function Xl(r, e) {
  var t = $0(r.body, e, true);
  return I([r.mclass], t, e);
}
function Yl(r, e) {
  var t, a = oe(r.body, e);
  return r.mclass === "minner" ? t = new H("mpadded", a) : r.mclass === "mord" ? r.isCharacterBox ? (t = a[0], t.type = "mi") : t = new H("mi", a) : (r.isCharacterBox ? (t = a[0], t.type = "mo") : t = new H("mo", a), r.mclass === "mbin" ? (t.attributes.lspace = "0.22em", t.attributes.rspace = "0.22em") : r.mclass === "mpunct" ? (t.attributes.lspace = "0em", t.attributes.rspace = "0.17em") : (r.mclass === "mopen" || r.mclass === "mclose") && (t.attributes.lspace = "0em", t.attributes.rspace = "0em")), t;
}
W({ type: "mclass", names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"], numArgs: 1, primitive: true, handler(r, e) {
  var t = r.parser, a = r.funcName, n = e[0];
  return { type: "mclass", mode: t.mode, mclass: "m" + a.slice(5), body: D0(n), isCharacterBox: Ge(n) };
}, htmlBuilder: Xl, mathmlBuilder: Yl });
var Gr = (r) => {
  var e = r.type === "ordgroup" && r.body.length ? r.body[0] : r;
  return e.type === "atom" && (e.family === "bin" || e.family === "rel") ? "m" + e.family : "mord";
};
W({ type: "mclass", names: ["\\@binrel"], numArgs: 2, handler(r, e) {
  var t = r.parser;
  return { type: "mclass", mode: t.mode, mclass: Gr(e[0]), body: D0(e[1]), isCharacterBox: Ge(e[1]) };
} });
W({ type: "mclass", names: ["\\stackrel", "\\overset", "\\underset"], numArgs: 2, handler(r, e) {
  var t = r.parser, a = r.funcName, n = e[1], i = e[0], s;
  a !== "\\stackrel" ? s = Gr(n) : s = "mrel";
  var l = { type: "op", mode: n.mode, limits: true, alwaysHandleSupSub: true, parentIsSupSub: false, symbol: false, suppressBaseShift: a !== "\\stackrel", body: D0(n) }, h = a === "\\underset" ? { type: "supsub", mode: i.mode, base: l, sub: i } : { type: "supsub", mode: i.mode, base: l, sup: i };
  return { type: "mclass", mode: t.mode, mclass: s, body: [h], isCharacterBox: Ge(h) };
} });
W({ type: "pmb", names: ["\\pmb"], numArgs: 1, allowedInText: true, handler(r, e) {
  var t = r.parser;
  return { type: "pmb", mode: t.mode, mclass: Gr(e[0]), body: D0(e[0]) };
}, htmlBuilder(r, e) {
  var t = $0(r.body, e, true), a = I([r.mclass], t, e);
  return a.style.textShadow = "0.02em 0.01em 0.04px", a;
}, mathmlBuilder(r, e) {
  var t = oe(r.body, e), a = new H("mstyle", t);
  return a.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px"), a;
} });
var Wl = { ">": "\\\\cdrightarrow", "<": "\\\\cdleftarrow", "=": "\\\\cdlongequal", A: "\\uparrow", V: "\\downarrow", "|": "\\Vert", ".": "no arrow" }, w4 = () => ({ type: "styling", body: [], mode: "math", style: "display", resetFont: true }), k4 = (r) => r.type === "textord" && r.text === "@", jl = (r, e) => (r.type === "mathord" || r.type === "atom") && r.text === e;
function Zl(r, e, t) {
  var a = Wl[r];
  switch (a) {
    case "\\\\cdrightarrow":
    case "\\\\cdleftarrow":
      return t.callFunction(a, [e[0]], [e[1]]);
    case "\\uparrow":
    case "\\downarrow": {
      var n = t.callFunction("\\\\cdleft", [e[0]], []), i = { type: "atom", text: a, mode: "math", family: "rel" }, s = t.callFunction("\\Big", [i], []), l = t.callFunction("\\\\cdright", [e[1]], []), h = { type: "ordgroup", mode: "math", body: [n, s, l] };
      return t.callFunction("\\\\cdparent", [h], []);
    }
    case "\\\\cdlongequal":
      return t.callFunction("\\\\cdlongequal", [], []);
    case "\\Vert": {
      var d = { type: "textord", text: "\\Vert", mode: "math" };
      return t.callFunction("\\Big", [d], []);
    }
    default:
      return { type: "textord", text: " ", mode: "math" };
  }
}
function Kl(r) {
  var e = [];
  for (r.gullet.beginGroup(), r.gullet.macros.set("\\cr", "\\\\\\relax"), r.gullet.beginGroup(); ; ) {
    e.push(r.parseExpression(false, "\\\\")), r.gullet.endGroup(), r.gullet.beginGroup();
    var t = r.fetch().text;
    if (t === "&" || t === "\\\\") r.consume();
    else if (t === "\\end") {
      e[e.length - 1].length === 0 && e.pop();
      break;
    } else throw new O("Expected \\\\ or \\cr or \\end", r.nextToken);
  }
  for (var a = [], n = [a], i = 0; i < e.length; i++) {
    for (var s = e[i], l = w4(), h = 0; h < s.length; h++) if (!k4(s[h])) l.body.push(s[h]);
    else {
      a.push(l), h += 1;
      var d = Lr(s[h]).text, f = new Array(2);
      if (f[0] = { type: "ordgroup", mode: "math", body: [] }, f[1] = { type: "ordgroup", mode: "math", body: [] }, !"=|.".includes(d)) if ("<>AV".includes(d)) for (var y = 0; y < 2; y++) {
        for (var x = true, w = h + 1; w < s.length; w++) {
          if (jl(s[w], d)) {
            x = false, h = w;
            break;
          }
          if (k4(s[w])) throw new O("Missing a " + d + " character to complete a CD arrow.", s[w]);
          f[y].body.push(s[w]);
        }
        if (x) throw new O("Missing a " + d + " character to complete a CD arrow.", s[h]);
      }
      else throw new O('Expected one of "<>AV=|." after @', s[h]);
      var B = Zl(d, f, r), C = { type: "styling", body: [B], mode: "math", style: "display", resetFont: true };
      a.push(C), l = w4();
    }
    i % 2 === 0 ? a.push(l) : a.shift(), a = [], n.push(a);
  }
  r.gullet.endGroup(), r.gullet.endGroup();
  var D = new Array(n[0].length).fill({ type: "align", align: "c", pregap: 0.25, postgap: 0.25 });
  return { type: "array", mode: "math", body: n, arraystretch: 1, addJot: true, rowGaps: [null], cols: D, colSeparationType: "CD", hLinesBeforeRow: new Array(n.length + 1).fill([]) };
}
W({ type: "cdlabel", names: ["\\\\cdleft", "\\\\cdright"], numArgs: 1, handler(r, e) {
  var t = r.parser, a = r.funcName;
  return { type: "cdlabel", mode: t.mode, side: a.slice(4), label: e[0] };
}, htmlBuilder(r, e) {
  var t = e.havingStyle(e.style.sup()), a = Tt(h0(r.label, t, e), e);
  return a.classes.push("cd-label-" + r.side), a.style.bottom = G(0.8 - a.depth), a.height = 0, a.depth = 0, a;
}, mathmlBuilder(r, e) {
  var t = new H("mrow", [f0(r.label, e)]);
  return t = new H("mpadded", [t]), t.setAttribute("width", "0"), r.side === "left" && t.setAttribute("lspace", "-1width"), t.setAttribute("voffset", "0.7em"), t = new H("mstyle", [t]), t.setAttribute("displaystyle", "false"), t.setAttribute("scriptlevel", "1"), t;
} });
W({ type: "cdlabelparent", names: ["\\\\cdparent"], numArgs: 1, handler(r, e) {
  var t = r.parser;
  return { type: "cdlabelparent", mode: t.mode, fragment: e[0] };
}, htmlBuilder(r, e) {
  var t = Tt(h0(r.fragment, e), e);
  return t.classes.push("cd-vert-arrow"), t;
}, mathmlBuilder(r, e) {
  return new H("mrow", [f0(r.fragment, e)]);
} });
W({ type: "textord", names: ["\\@char"], numArgs: 1, allowedInText: true, handler(r, e) {
  var t = r.parser, a = o0(e[0], "ordgroup"), n = Ia(a, "\\@char has non-numeric argument"), i = parseInt(n), s;
  if (isNaN(i)) throw new O("\\@char has non-numeric argument " + n);
  if (i < 0 || i > 1114111) throw new O("\\@char with invalid code point " + n);
  return i <= 65535 ? s = String.fromCharCode(i) : (i -= 65536, s = String.fromCharCode((i >> 10) + 55296, (i & 1023) + 56320)), { type: "textord", mode: t.mode, text: s };
} });
var Jl = (r, e) => {
  var t = $0(r.body, e.withColor(r.color), false);
  return Ve(t);
}, Ql = (r, e) => {
  var t = oe(r.body, e.withColor(r.color)), a = new H("mstyle", t);
  return a.setAttribute("mathcolor", r.color), a;
};
W({ type: "color", names: ["\\textcolor"], numArgs: 2, allowedInText: true, argTypes: ["color", "original"], handler(r, e) {
  var t = r.parser, a = o0(e[0], "color-token").color, n = e[1];
  return { type: "color", mode: t.mode, color: a, body: D0(n) };
}, htmlBuilder: Jl, mathmlBuilder: Ql });
W({ type: "color", names: ["\\color"], numArgs: 1, allowedInText: true, argTypes: ["color"], handler(r, e) {
  var t = r.parser, a = r.breakOnTokenText, n = o0(e[0], "color-token").color;
  t.gullet.macros.set("\\current@color", n);
  var i = t.parseExpression(true, a);
  return { type: "color", mode: t.mode, color: n, body: i };
} });
W({ type: "cr", names: ["\\\\"], numArgs: 0, numOptionalArgs: 0, allowedInText: true, handler(r, e, t) {
  var a = r.parser, n = a.gullet.future().text === "[" ? a.parseSizeGroup(true) : null, i = !a.settings.displayMode || !a.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
  return { type: "cr", mode: a.mode, newLine: i, size: n && o0(n, "size").value };
}, htmlBuilder(r, e) {
  var t = I(["mspace"], [], e);
  return r.newLine && (t.classes.push("katex-newline"), r.size && (t.style.marginTop = G(A0(r.size, e)))), t;
}, mathmlBuilder(r, e) {
  var t = new H("mspace");
  return r.newLine && (t.setAttribute("linebreak", "newline"), r.size && t.setAttribute("height", G(A0(r.size, e)))), t;
} });
var na = { "\\global": "\\global", "\\long": "\\\\globallong", "\\\\globallong": "\\\\globallong", "\\def": "\\gdef", "\\gdef": "\\gdef", "\\edef": "\\xdef", "\\xdef": "\\xdef", "\\let": "\\\\globallet", "\\futurelet": "\\\\globalfuture" }, Jn = (r) => {
  var e = r.text;
  if (/^(?:[\\{}$&#^_]|EOF)$/.test(e)) throw new O("Expected a control sequence", r);
  return e;
}, _l = (r) => {
  var e = r.gullet.popToken();
  return e.text === "=" && (e = r.gullet.popToken(), e.text === " " && (e = r.gullet.popToken())), e;
}, Qn = (r, e, t, a) => {
  var n = r.gullet.macros.get(t.text);
  n == null && (t.noexpand = true, n = { tokens: [t], numArgs: 0, unexpandable: !r.gullet.isExpandable(t.text) }), r.gullet.macros.set(e, n, a);
};
W({ type: "internal", names: ["\\global", "\\long", "\\\\globallong"], numArgs: 0, allowedInText: true, handler(r) {
  var e = r.parser, t = r.funcName;
  e.consumeSpaces();
  var a = e.fetch();
  if (na[a.text]) return (t === "\\global" || t === "\\\\globallong") && (a.text = na[a.text]), o0(e.parseFunction(), "internal");
  throw new O("Invalid token after macro prefix", a);
} });
W({ type: "internal", names: ["\\def", "\\gdef", "\\edef", "\\xdef"], numArgs: 0, allowedInText: true, primitive: true, handler(r) {
  var e = r.parser, t = r.funcName, a = e.gullet.popToken(), n = a.text;
  if (/^(?:[\\{}$&#^_]|EOF)$/.test(n)) throw new O("Expected a control sequence", a);
  for (var i = 0, s, l = [[]]; e.gullet.future().text !== "{"; ) if (a = e.gullet.popToken(), a.text === "#") {
    if (e.gullet.future().text === "{") {
      s = e.gullet.future(), l[i].push("{");
      break;
    }
    if (a = e.gullet.popToken(), !/^[1-9]$/.test(a.text)) throw new O('Invalid argument number "' + a.text + '"');
    if (parseInt(a.text) !== i + 1) throw new O('Argument number "' + a.text + '" out of order');
    i++, l.push([]);
  } else {
    if (a.text === "EOF") throw new O("Expected a macro definition");
    l[i].push(a.text);
  }
  var h = e.gullet.consumeArg(), d = h.tokens;
  return s && d.unshift(s), (t === "\\edef" || t === "\\xdef") && (d = e.gullet.expandTokens(d), d.reverse()), e.gullet.macros.set(n, { tokens: d, numArgs: i, delimiters: l }, t === na[t]), { type: "internal", mode: e.mode };
} });
W({ type: "internal", names: ["\\let", "\\\\globallet"], numArgs: 0, allowedInText: true, primitive: true, handler(r) {
  var e = r.parser, t = r.funcName, a = Jn(e.gullet.popToken());
  e.gullet.consumeSpaces();
  var n = _l(e);
  return Qn(e, a, n, t === "\\\\globallet"), { type: "internal", mode: e.mode };
} });
W({ type: "internal", names: ["\\futurelet", "\\\\globalfuture"], numArgs: 0, allowedInText: true, primitive: true, handler(r) {
  var e = r.parser, t = r.funcName, a = Jn(e.gullet.popToken()), n = e.gullet.popToken(), i = e.gullet.popToken();
  return Qn(e, a, i, t === "\\\\globalfuture"), e.gullet.pushToken(i), e.gullet.pushToken(n), { type: "internal", mode: e.mode };
} });
var Wt = function(e, t, a) {
  var n = g0.math[e] && g0.math[e].replace, i = Da(n || e, t, a);
  if (!i) throw new Error("Unsupported symbol " + e + " and font size " + t + ".");
  return i;
}, Fa = function(e, t, a, n) {
  var i = a.havingBaseStyle(t), s = I(n.concat(i.sizingClasses(a)), [e], a), l = i.sizeMultiplier / a.sizeMultiplier;
  return s.height *= l, s.depth *= l, s.maxFontSize = i.sizeMultiplier, s;
}, _n = function(e, t, a) {
  var n = t.havingBaseStyle(a), i = (1 - t.sizeMultiplier / n.sizeMultiplier) * t.fontMetrics().axisHeight;
  e.classes.push("delimcenter"), e.style.top = G(i), e.height -= i, e.depth += i;
}, e2 = function(e, t, a, n, i, s) {
  var l = j0(e, "Main-Regular", i, n), h = Fa(l, t, n, s);
  return _n(h, n, t), h;
}, t2 = function(e, t, a, n) {
  return j0(e, "Size" + t + "-Regular", a, n);
}, ei = function(e, t, a, n, i, s) {
  var l = t2(e, t, i, n), h = Fa(I(["delimsizing", "size" + t], [l], n), n0.TEXT, n, s);
  return a && _n(h, n, n0.TEXT), h;
}, w1 = function(e, t, a) {
  var n;
  t === "Size1-Regular" ? n = "delim-size1" : n = "delim-size4";
  var i = I(["delimsizinginner", n], [I([], [j0(e, t, a)])]);
  return { type: "elem", elem: i };
}, k1 = function(e, t, a) {
  var n = we["Size4-Regular"][e.charCodeAt(0)] ? we["Size4-Regular"][e.charCodeAt(0)][4] : we["Size1-Regular"][e.charCodeAt(0)][4], i = new tt("inner", nl(e, Math.round(1e3 * t))), s = new Le([i], { width: G(n), height: G(t), style: "width:" + G(n), viewBox: "0 0 " + 1e3 * n + " " + Math.round(1e3 * t), preserveAspectRatio: "xMinYMin" }), l = rt([], [s], a);
  return l.height = t, l.style.height = G(t), l.style.width = G(n), { type: "elem", elem: l };
}, ia = 8e-3, cr = { type: "kern", size: -1 * ia }, r2 = /* @__PURE__ */ new Set(["|", "\\lvert", "\\rvert", "\\vert"]), a2 = /* @__PURE__ */ new Set(["\\|", "\\lVert", "\\rVert", "\\Vert"]), ti = function(e, t, a, n, i, s) {
  var l, h, d, f, y = "", x = 0;
  l = d = f = e, h = null;
  var w = "Size1-Regular";
  e === "\\uparrow" ? d = f = "\u23D0" : e === "\\Uparrow" ? d = f = "\u2016" : e === "\\downarrow" ? l = d = "\u23D0" : e === "\\Downarrow" ? l = d = "\u2016" : e === "\\updownarrow" ? (l = "\\uparrow", d = "\u23D0", f = "\\downarrow") : e === "\\Updownarrow" ? (l = "\\Uparrow", d = "\u2016", f = "\\Downarrow") : r2.has(e) ? (d = "\u2223", y = "vert", x = 333) : a2.has(e) ? (d = "\u2225", y = "doublevert", x = 556) : e === "[" || e === "\\lbrack" ? (l = "\u23A1", d = "\u23A2", f = "\u23A3", w = "Size4-Regular", y = "lbrack", x = 667) : e === "]" || e === "\\rbrack" ? (l = "\u23A4", d = "\u23A5", f = "\u23A6", w = "Size4-Regular", y = "rbrack", x = 667) : e === "\\lfloor" || e === "\u230A" ? (d = l = "\u23A2", f = "\u23A3", w = "Size4-Regular", y = "lfloor", x = 667) : e === "\\lceil" || e === "\u2308" ? (l = "\u23A1", d = f = "\u23A2", w = "Size4-Regular", y = "lceil", x = 667) : e === "\\rfloor" || e === "\u230B" ? (d = l = "\u23A5", f = "\u23A6", w = "Size4-Regular", y = "rfloor", x = 667) : e === "\\rceil" || e === "\u2309" ? (l = "\u23A4", d = f = "\u23A5", w = "Size4-Regular", y = "rceil", x = 667) : e === "(" || e === "\\lparen" ? (l = "\u239B", d = "\u239C", f = "\u239D", w = "Size4-Regular", y = "lparen", x = 875) : e === ")" || e === "\\rparen" ? (l = "\u239E", d = "\u239F", f = "\u23A0", w = "Size4-Regular", y = "rparen", x = 875) : e === "\\{" || e === "\\lbrace" ? (l = "\u23A7", h = "\u23A8", f = "\u23A9", d = "\u23AA", w = "Size4-Regular") : e === "\\}" || e === "\\rbrace" ? (l = "\u23AB", h = "\u23AC", f = "\u23AD", d = "\u23AA", w = "Size4-Regular") : e === "\\lgroup" || e === "\u27EE" ? (l = "\u23A7", f = "\u23A9", d = "\u23AA", w = "Size4-Regular") : e === "\\rgroup" || e === "\u27EF" ? (l = "\u23AB", f = "\u23AD", d = "\u23AA", w = "Size4-Regular") : e === "\\lmoustache" || e === "\u23B0" ? (l = "\u23A7", f = "\u23AD", d = "\u23AA", w = "Size4-Regular") : (e === "\\rmoustache" || e === "\u23B1") && (l = "\u23AB", f = "\u23A9", d = "\u23AA", w = "Size4-Regular");
  var B = Wt(l, w, i), C = B.height + B.depth, D = Wt(d, w, i), q = D.height + D.depth, E = Wt(f, w, i), P = E.height + E.depth, V = 0, X = 1;
  if (h !== null) {
    var Y = Wt(h, w, i);
    V = Y.height + Y.depth, X = 2;
  }
  var J = C + P + V, Q = Math.max(0, Math.ceil((t - J) / (X * q))), _ = J + Q * X * q, u0 = n.fontMetrics().axisHeight;
  a && (u0 *= n.sizeMultiplier);
  var v0 = _ / 2 - u0, s0 = [];
  if (y.length > 0) {
    var X0 = _ - C - P, C0 = Math.round(_ * 1e3), w0 = il(y, Math.round(X0 * 1e3)), L0 = new tt(y, w0), te = G(x / 1e3), re = G(C0 / 1e3), ht = new Le([L0], { width: te, height: re, viewBox: "0 0 " + x + " " + C0 }), P0 = rt([], [ht], n);
    P0.height = C0 / 1e3, P0.style.width = te, P0.style.height = re, s0.push({ type: "elem", elem: P0 });
  } else {
    if (s0.push(w1(f, w, i)), s0.push(cr), h === null) {
      var G0 = _ - C - P + 2 * ia;
      s0.push(k1(d, G0, n));
    } else {
      var ge = (_ - C - P - V) / 2 + 2 * ia;
      s0.push(k1(d, ge, n)), s0.push(cr), s0.push(w1(h, w, i)), s0.push(cr), s0.push(k1(d, ge, n));
    }
    s0.push(cr), s0.push(w1(l, w, i));
  }
  var k0 = n.havingBaseStyle(n0.TEXT), Ce = m0({ positionType: "bottom", positionData: v0, children: s0 });
  return Fa(I(["delimsizing", "mult"], [Ce], k0), n0.TEXT, n, s);
}, S1 = 80, z1 = 0.08, A1 = function(e, t, a, n, i) {
  var s = al(e, n, a), l = new tt(e, s), h = new Le([l], { width: "400em", height: G(t), viewBox: "0 0 400000 " + a, preserveAspectRatio: "xMinYMin slice" });
  return rt(["hide-tail"], [h], i);
}, n2 = function(e, t) {
  var a = t.havingBaseSizing(), n = si("\\surd", e * a.sizeMultiplier, ii, a), i = a.sizeMultiplier, s = Math.max(0, t.minRuleThickness - t.fontMetrics().sqrtRuleThickness), l, h, d, f, y;
  return n.type === "small" ? (f = 1e3 + 1e3 * s + S1, e < 1 ? i = 1 : e < 1.4 && (i = 0.7), h = (1 + s + z1) / i, d = (1 + s) / i, l = A1("sqrtMain", h, f, s, t), l.style.minWidth = "0.853em", y = 0.833 / i) : n.type === "large" ? (f = (1e3 + S1) * Zt[n.size], d = (Zt[n.size] + s) / i, h = (Zt[n.size] + s + z1) / i, l = A1("sqrtSize" + n.size, h, f, s, t), l.style.minWidth = "1.02em", y = 1 / i) : (h = e + s + z1, d = e + s, f = Math.floor(1e3 * e + s) + S1, l = A1("sqrtTall", h, f, s, t), l.style.minWidth = "0.742em", y = 1.056), l.height = d, l.style.height = G(h), { span: l, advanceWidth: y, ruleWidth: (t.fontMetrics().sqrtRuleThickness + s) * i };
}, ri = /* @__PURE__ */ new Set(["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230A", "\u230B", "\\lceil", "\\rceil", "\u2308", "\u2309", "\\surd"]), i2 = /* @__PURE__ */ new Set(["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27EE", "\u27EF", "\\lmoustache", "\\rmoustache", "\u23B0", "\u23B1"]), ai = /* @__PURE__ */ new Set(["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"]), Zt = [0, 1.2, 1.8, 2.4, 3], ni = function(e, t, a, n, i) {
  if (e === "<" || e === "\\lt" || e === "\u27E8" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "\u27E9") && (e = "\\rangle"), ri.has(e) || ai.has(e)) return ei(e, t, false, a, n, i);
  if (i2.has(e)) return ti(e, Zt[t], false, a, n, i);
  throw new O("Illegal delimiter: '" + e + "'");
}, s2 = [{ type: "small", style: n0.SCRIPTSCRIPT }, { type: "small", style: n0.SCRIPT }, { type: "small", style: n0.TEXT }, { type: "large", size: 1 }, { type: "large", size: 2 }, { type: "large", size: 3 }, { type: "large", size: 4 }], l2 = [{ type: "small", style: n0.SCRIPTSCRIPT }, { type: "small", style: n0.SCRIPT }, { type: "small", style: n0.TEXT }, { type: "stack" }], ii = [{ type: "small", style: n0.SCRIPTSCRIPT }, { type: "small", style: n0.SCRIPT }, { type: "small", style: n0.TEXT }, { type: "large", size: 1 }, { type: "large", size: 2 }, { type: "large", size: 3 }, { type: "large", size: 4 }, { type: "stack" }], u2 = function(e) {
  if (e.type === "small") return "Main-Regular";
  if (e.type === "large") return "Size" + e.size + "-Regular";
  if (e.type === "stack") return "Size4-Regular";
  var t = e.type;
  throw new Error("Add support for delim type '" + t + "' here.");
}, si = function(e, t, a, n) {
  for (var i = Math.min(2, 3 - n.style.size), s = i; s < a.length; s++) {
    var l = a[s];
    if (l.type === "stack") break;
    var h = Wt(e, u2(l), "math"), d = h.height + h.depth;
    if (l.type === "small") {
      var f = n.havingBaseStyle(l.style);
      d *= f.sizeMultiplier;
    }
    if (d > t) return l;
  }
  return a[a.length - 1];
}, sa = function(e, t, a, n, i, s) {
  e === "<" || e === "\\lt" || e === "\u27E8" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "\u27E9") && (e = "\\rangle");
  var l;
  ai.has(e) ? l = s2 : ri.has(e) ? l = ii : l = l2;
  var h = si(e, t, l, n);
  return h.type === "small" ? e2(e, h.style, a, n, i, s) : h.type === "large" ? ei(e, h.size, a, n, i, s) : ti(e, t, a, n, i, s);
}, M1 = function(e, t, a, n, i, s) {
  var l = n.fontMetrics().axisHeight * n.sizeMultiplier, h = 901, d = 5 / n.fontMetrics().ptPerEm, f = Math.max(t - l, a + l), y = Math.max(f / 500 * h, 2 * f - d);
  return sa(e, y, true, n, i, s);
}, S4 = { "\\bigl": { mclass: "mopen", size: 1 }, "\\Bigl": { mclass: "mopen", size: 2 }, "\\biggl": { mclass: "mopen", size: 3 }, "\\Biggl": { mclass: "mopen", size: 4 }, "\\bigr": { mclass: "mclose", size: 1 }, "\\Bigr": { mclass: "mclose", size: 2 }, "\\biggr": { mclass: "mclose", size: 3 }, "\\Biggr": { mclass: "mclose", size: 4 }, "\\bigm": { mclass: "mrel", size: 1 }, "\\Bigm": { mclass: "mrel", size: 2 }, "\\biggm": { mclass: "mrel", size: 3 }, "\\Biggm": { mclass: "mrel", size: 4 }, "\\big": { mclass: "mord", size: 1 }, "\\Big": { mclass: "mord", size: 2 }, "\\bigg": { mclass: "mord", size: 3 }, "\\Bigg": { mclass: "mord", size: 4 } }, o2 = /* @__PURE__ */ new Set(["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230A", "\u230B", "\\lceil", "\\rceil", "\u2308", "\u2309", "<", ">", "\\langle", "\u27E8", "\\rangle", "\u27E9", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27EE", "\u27EF", "\\lmoustache", "\\rmoustache", "\u23B0", "\u23B1", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."]);
function z4(r) {
  return "isMiddle" in r;
}
function Ur(r, e) {
  var t = Pr(r);
  if (t && o2.has(t.text)) return t;
  throw t ? new O("Invalid delimiter '" + t.text + "' after '" + e.funcName + "'", r) : new O("Invalid delimiter type '" + r.type + "'", r);
}
W({ type: "delimsizing", names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"], numArgs: 1, argTypes: ["primitive"], handler: (r, e) => {
  var t = Ur(er(e[0]), r);
  return { type: "delimsizing", mode: r.parser.mode, size: S4[r.funcName].size, mclass: S4[r.funcName].mclass, delim: t.text };
}, htmlBuilder: (r, e) => r.delim === "." ? I([r.mclass]) : ni(r.delim, r.size, e, r.mode, [r.mclass]), mathmlBuilder: (r) => {
  var e = [];
  r.delim !== "." && e.push(ve(r.delim, r.mode));
  var t = new H("mo", e);
  r.mclass === "mopen" || r.mclass === "mclose" ? t.setAttribute("fence", "true") : t.setAttribute("fence", "false"), t.setAttribute("stretchy", "true");
  var a = G(Zt[r.size]);
  return t.setAttribute("minsize", a), t.setAttribute("maxsize", a), t;
} });
function A4(r) {
  if (!r.body) throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
}
W({ type: "leftright-right", names: ["\\right"], numArgs: 1, primitive: true, handler: (r, e) => {
  var t = r.parser.gullet.macros.get("\\current@color");
  if (t && typeof t != "string") throw new O("\\current@color set to non-string in \\right");
  return { type: "leftright-right", mode: r.parser.mode, delim: Ur(e[0], r).text, color: t };
} });
W({ type: "leftright", names: ["\\left"], numArgs: 1, primitive: true, handler: (r, e) => {
  var t = Ur(e[0], r), a = r.parser;
  ++a.leftrightDepth;
  var n = a.parseExpression(false);
  --a.leftrightDepth, a.expect("\\right", false);
  var i = o0(a.parseFunction(), "leftright-right");
  return { type: "leftright", mode: a.mode, body: n, left: t.text, right: i.delim, rightColor: i.color };
}, htmlBuilder: (r, e) => {
  A4(r);
  for (var t = $0(r.body, e, true, ["mopen", "mclose"]), a = 0, n = 0, i = false, s = 0; s < t.length; s++) {
    var l = t[s];
    z4(l) ? i = true : (a = Math.max(t[s].height, a), n = Math.max(t[s].depth, n));
  }
  a *= e.sizeMultiplier, n *= e.sizeMultiplier;
  var h;
  if (r.left === "." ? h = tr(e, ["mopen"]) : h = M1(r.left, a, n, e, r.mode, ["mopen"]), t.unshift(h), i) for (var d = 1; d < t.length; d++) {
    var f = t[d];
    if (z4(f)) {
      var y = f.isMiddle;
      t[d] = M1(y.delim, a, n, y.options, r.mode, []);
    }
  }
  var x;
  if (r.right === ".") x = tr(e, ["mclose"]);
  else {
    var w = r.rightColor ? e.withColor(r.rightColor) : e;
    x = M1(r.right, a, n, w, r.mode, ["mclose"]);
  }
  return t.push(x), I(["minner"], t, e);
}, mathmlBuilder: (r, e) => {
  A4(r);
  var t = oe(r.body, e);
  if (r.left !== ".") {
    var a = new H("mo", [ve(r.left, r.mode)]);
    a.setAttribute("fence", "true"), t.unshift(a);
  }
  if (r.right !== ".") {
    var n = new H("mo", [ve(r.right, r.mode)]);
    n.setAttribute("fence", "true"), r.rightColor && n.setAttribute("mathcolor", r.rightColor), t.push(n);
  }
  return Na(t);
} });
W({ type: "middle", names: ["\\middle"], numArgs: 1, primitive: true, handler: (r, e) => {
  var t = Ur(e[0], r);
  if (!r.parser.leftrightDepth) throw new O("\\middle without preceding \\left", t);
  return { type: "middle", mode: r.parser.mode, delim: t.text };
}, htmlBuilder: (r, e) => {
  var t;
  return r.delim === "." ? t = tr(e, []) : (t = ni(r.delim, 1, e, r.mode, []), t.isMiddle = { delim: r.delim, options: e }), t;
}, mathmlBuilder: (r, e) => {
  var t = r.delim === "\\vert" || r.delim === "|" ? ve("|", "text") : ve(r.delim, r.mode), a = new H("mo", [t]);
  return a.setAttribute("fence", "true"), a.setAttribute("lspace", "0.05em"), a.setAttribute("rspace", "0.05em"), a;
} });
var h2 = (r, e) => {
  var t = Tt(h0(r.body, e), e), a = r.label.slice(1), n = e.sizeMultiplier, i, s, l = Ge(r.body);
  if (a === "sout") i = I(["katex-stretchy", "katex-sout"]), i.height = e.fontMetrics().defaultRuleThickness / n, s = -0.5 * e.fontMetrics().xHeight;
  else if (a === "phase") {
    var h = A0({ number: 0.6, unit: "pt" }, e), d = A0({ number: 0.35, unit: "ex" }, e), f = e.havingBaseSizing();
    n = n / f.sizeMultiplier;
    var y = t.height + t.depth + h + d;
    t.style.paddingLeft = G(y / 2 + h);
    var x = Math.floor(1e3 * y * n), w = tl(x), B = new Le([new tt("phase", w)], { width: "400em", height: G(x / 1e3), viewBox: "0 0 400000 " + x, preserveAspectRatio: "xMinYMin slice" });
    i = rt(["hide-tail"], [B], e), i.style.height = G(y), s = t.depth + h + d;
  } else {
    /cancel/.test(a) ? l || t.classes.push("cancel-pad") : a === "angl" ? t.classes.push("anglpad") : t.classes.push("boxpad");
    var C, D, q = 0;
    /box/.test(a) ? (q = Math.max(e.fontMetrics().fboxrule, e.minRuleThickness), C = e.fontMetrics().fboxsep + (a === "colorbox" ? 0 : q), D = C) : a === "angl" ? (q = Math.max(e.fontMetrics().defaultRuleThickness, e.minRuleThickness), C = 4 * q, D = Math.max(0, 0.25 - t.depth)) : (C = l ? 0.2 : 0, D = C), i = Ol(t, a, C, D, e), /fbox|boxed|fcolorbox/.test(a) ? (i.style.borderStyle = "solid", i.style.borderWidth = G(q)) : a === "angl" && q !== 0.049 && (i.style.borderTopWidth = G(q), i.style.borderRightWidth = G(q)), s = t.depth + D, r.backgroundColor && (i.style.backgroundColor = r.backgroundColor, r.borderColor && (i.style.borderColor = r.borderColor));
  }
  var E;
  if (r.backgroundColor) E = m0({ positionType: "individualShift", children: [{ type: "elem", elem: i, shift: s }, { type: "elem", elem: t, shift: 0 }] });
  else {
    var P = /cancel|phase/.test(a) ? ["svg-align"] : [];
    E = m0({ positionType: "individualShift", children: [{ type: "elem", elem: t, shift: 0 }, { type: "elem", elem: i, shift: s, wrapperClasses: P }] });
  }
  return /cancel/.test(a) && (E.height = t.height, E.depth = t.depth), /cancel/.test(a) && !l ? I(["mord", "cancel-lap"], [E], e) : I(["mord"], [E], e);
}, m2 = (r, e) => {
  var t, a = new H(r.label.includes("colorbox") ? "mpadded" : "menclose", [f0(r.body, e)]);
  switch (r.label) {
    case "\\cancel":
      a.setAttribute("notation", "updiagonalstrike");
      break;
    case "\\bcancel":
      a.setAttribute("notation", "downdiagonalstrike");
      break;
    case "\\phase":
      a.setAttribute("notation", "phasorangle");
      break;
    case "\\sout":
      a.setAttribute("notation", "horizontalstrike");
      break;
    case "\\fbox":
      a.setAttribute("notation", "box");
      break;
    case "\\angl":
      a.setAttribute("notation", "actuarial");
      break;
    case "\\fcolorbox":
    case "\\colorbox":
      if (t = e.fontMetrics().fboxsep * e.fontMetrics().ptPerEm, a.setAttribute("width", "+" + 2 * t + "pt"), a.setAttribute("height", "+" + 2 * t + "pt"), a.setAttribute("lspace", t + "pt"), a.setAttribute("voffset", t + "pt"), r.label === "\\fcolorbox") {
        var n = Math.max(e.fontMetrics().fboxrule, e.minRuleThickness);
        a.setAttribute("style", "border: " + G(n) + " solid " + r.borderColor);
      }
      break;
    case "\\xcancel":
      a.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
      break;
  }
  return r.backgroundColor && a.setAttribute("mathbackground", r.backgroundColor), a;
};
W({ type: "enclose", names: ["\\colorbox"], numArgs: 2, allowedInText: true, argTypes: ["color", "hbox"], handler(r, e, t) {
  var a = r.parser, n = r.funcName, i = o0(e[0], "color-token").color, s = e[1];
  return { type: "enclose", mode: a.mode, label: n, backgroundColor: i, body: s };
}, htmlBuilder: h2, mathmlBuilder: m2 });
W({ type: "enclose", names: ["\\fcolorbox"], numArgs: 3, allowedInText: true, argTypes: ["color", "color", "hbox"], handler(r, e, t) {
  var a = r.parser, n = r.funcName, i = o0(e[0], "color-token").color, s = o0(e[1], "color-token").color, l = e[2];
  return { type: "enclose", mode: a.mode, label: n, backgroundColor: s, borderColor: i, body: l };
} });
W({ type: "enclose", names: ["\\fbox"], numArgs: 1, argTypes: ["hbox"], allowedInText: true, handler(r, e) {
  var t = r.parser;
  return { type: "enclose", mode: t.mode, label: "\\fbox", body: e[0] };
} });
W({ type: "enclose", names: ["\\cancel", "\\bcancel", "\\xcancel", "\\phase"], numArgs: 1, handler(r, e) {
  var t = r.parser, a = r.funcName, n = e[0];
  return { type: "enclose", mode: t.mode, label: a, body: n };
} });
W({ type: "enclose", names: ["\\sout"], numArgs: 1, allowedInText: true, handler(r, e) {
  var t = r.parser, a = r.funcName;
  t.mode === "math" && t.settings.reportNonstrict("mathVsSout", "LaTeX's \\sout works only in text mode");
  var n = e[0];
  return { type: "enclose", mode: t.mode, label: a, body: n };
} });
W({ type: "enclose", names: ["\\angl"], numArgs: 1, argTypes: ["hbox"], allowedInText: false, handler(r, e) {
  var t = r.parser;
  return { type: "enclose", mode: t.mode, label: "\\angl", body: e[0] };
} });
var li = {};
function Se(r) {
  for (var e = r.type, t = r.names, a = r.props, n = r.handler, i = r.htmlBuilder, s = r.mathmlBuilder, l = { type: e, numArgs: a.numArgs || 0, allowedInText: false, numOptionalArgs: 0, handler: n }, h = 0; h < t.length; ++h) li[t[h]] = l;
  i && (Qt[e] = i), s && (_t[e] = s);
}
var ui = {};
function g(r, e) {
  ui[r] = e;
}
let ce = class oi {
  constructor(e, t, a) {
    this.lexer = void 0, this.start = void 0, this.end = void 0, this.lexer = e, this.start = t, this.end = a;
  }
  static range(e, t) {
    return t ? !e || !e.loc || !t.loc || e.loc.lexer !== t.loc.lexer ? null : new oi(e.loc.lexer, e.loc.start, t.loc.end) : e && e.loc;
  }
}, be = class hi {
  constructor(e, t) {
    this.text = void 0, this.loc = void 0, this.noexpand = void 0, this.treatAsRelax = void 0, this.text = e, this.loc = t;
  }
  range(e, t) {
    return new hi(t, ce.range(this, e));
  }
};
function M4(r) {
  var e = [];
  r.consumeSpaces();
  var t = r.fetch().text;
  for (t === "\\relax" && (r.consume(), r.consumeSpaces(), t = r.fetch().text); t === "\\hline" || t === "\\hdashline"; ) r.consume(), e.push(t === "\\hdashline"), r.consumeSpaces(), t = r.fetch().text;
  return e;
}
var Vr = (r) => {
  var e = r.parser.settings;
  if (!e.displayMode) throw new O("{" + r.envName + "} can be used only in display mode.");
}, c2 = /* @__PURE__ */ new Set(["gather", "gather*"]);
function Oa(r) {
  if (!r.includes("ed")) return !r.includes("*");
}
function ut(r, e, t) {
  var a = e.hskipBeforeAndAfter, n = e.addJot, i = e.cols, s = e.arraystretch, l = e.colSeparationType, h = e.autoTag, d = e.singleRow, f = e.emptySingleRow, y = e.maxNumCols, x = e.leqno;
  if (r.gullet.beginGroup(), d || r.gullet.macros.set("\\cr", "\\\\\\relax"), !s) {
    var w = r.gullet.expandMacroAsText("\\arraystretch");
    if (w == null) s = 1;
    else if (s = parseFloat(w), !s || s < 0) throw new O("Invalid \\arraystretch: " + w);
  }
  r.gullet.beginGroup();
  var B = [], C = [B], D = [], q = [], E = h != null ? [] : void 0;
  function P() {
    h && r.gullet.macros.set("\\@eqnsw", "1", true);
  }
  function V() {
    E && (r.gullet.macros.get("\\df@tag") ? (E.push(r.subparse([new be("\\df@tag")])), r.gullet.macros.set("\\df@tag", void 0, true)) : E.push(!!h && r.gullet.macros.get("\\@eqnsw") === "1"));
  }
  for (P(), q.push(M4(r)); ; ) {
    var X = r.parseExpression(false, d ? "\\end" : "\\\\");
    r.gullet.endGroup(), r.gullet.beginGroup();
    var Y = { type: "ordgroup", mode: r.mode, body: X };
    t && (Y = { type: "styling", mode: r.mode, style: t, resetFont: true, body: [Y] }), B.push(Y);
    var J = r.fetch().text;
    if (J === "&") {
      if (y && B.length === y) {
        if (d || l) throw new O("Too many tab characters: &", r.nextToken);
        r.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.");
      }
      r.consume();
    } else if (J === "\\end") {
      V(), B.length === 1 && Y.type === "styling" && Y.body.length === 1 && Y.body[0].type === "ordgroup" && Y.body[0].body.length === 0 && (C.length > 1 || !f) && !Array.isArray(E == null ? void 0 : E[E.length - 1]) && !(h && (E == null ? void 0 : E[E.length - 1]) === true) && C.pop(), q.length < C.length + 1 && q.push([]);
      break;
    } else if (J === "\\\\") {
      r.consume();
      var Q = void 0;
      r.gullet.future().text !== " " && (Q = r.parseSizeGroup(true)), D.push(Q ? Q.value : null), V(), q.push(M4(r)), B = [], C.push(B), P();
    } else throw new O("Expected & or \\\\ or \\cr or \\end", r.nextToken);
  }
  return r.gullet.endGroup(), r.gullet.endGroup(), { type: "array", mode: r.mode, addJot: n, arraystretch: s, body: C, cols: i, rowGaps: D, hskipBeforeAndAfter: a, hLinesBeforeRow: q, colSeparationType: l, tags: E, leqno: x };
}
function $a(r) {
  return r.slice(0, 1) === "d" ? "display" : "text";
}
var ze = function(e, t) {
  var a, n, i = e.body.length, s = e.hLinesBeforeRow, l = 0, h = new Array(i), d = [], f = Math.max(t.fontMetrics().arrayRuleWidth, t.minRuleThickness), y = 1 / t.fontMetrics().ptPerEm, x = 5 * y;
  if (e.colSeparationType && e.colSeparationType === "small") {
    var w = t.havingStyle(n0.SCRIPT).sizeMultiplier;
    x = 0.2778 * (w / t.sizeMultiplier);
  }
  var B = e.colSeparationType === "CD" ? A0({ number: 3, unit: "ex" }, t) : 12 * y, C = 3 * y, D = e.arraystretch * B, q = 0.7 * D, E = 0.3 * D, P = 0;
  function V(Ne) {
    for (var Re = 0; Re < Ne.length; ++Re) Re > 0 && (P += 0.25), d.push({ pos: P, isDashed: Ne[Re] });
  }
  for (V(s[0]), a = 0; a < e.body.length; ++a) {
    var X = e.body[a], Y = q, J = E;
    l < X.length && (l = X.length);
    var Q = { cells: new Array(X.length), height: 0, depth: 0, pos: 0 };
    for (n = 0; n < X.length; ++n) {
      var _ = h0(X[n], t);
      J < _.depth && (J = _.depth), Y < _.height && (Y = _.height), Q.cells[n] = _;
    }
    var u0 = e.rowGaps[a], v0 = 0;
    u0 && (v0 = A0(u0, t), v0 > 0 && (v0 += E, J < v0 && (J = v0), v0 = 0)), e.addJot && a < e.body.length - 1 && (J += C), Q.height = Y, Q.depth = J, P += Y, Q.pos = P, P += J + v0, h[a] = Q, V(s[a + 1]);
  }
  var s0 = P / 2 + t.fontMetrics().axisHeight, X0 = e.cols || [], C0 = [], w0, L0, te = [];
  if (e.tags && e.tags.some((Ne) => Ne)) for (a = 0; a < i; ++a) {
    var re = h[a], ht = re.pos - s0, P0 = e.tags[a], G0 = void 0;
    P0 === true ? G0 = I(["eqn-num"], [], t) : P0 === false ? G0 = I([], [], t) : G0 = I([], $0(P0, t, true), t), G0.depth = re.depth, G0.height = re.height, te.push({ type: "elem", elem: G0, shift: ht });
  }
  for (n = 0, L0 = 0; n < l || L0 < X0.length; ++n, ++L0) {
    for (var ge, k0 = X0[L0], Ce = true; (($t = k0) == null ? void 0 : $t.type) === "separator"; ) {
      var $t;
      if (Ce || (w0 = I(["arraycolsep"], []), w0.style.width = G(t.fontMetrics().doubleRuleSep), C0.push(w0)), k0.separator === "|" || k0.separator === ":") {
        var s1 = k0.separator === "|" ? "solid" : "dashed", ae = I(["vertical-separator"], [], t);
        ae.style.height = G(P), ae.style.borderRightWidth = G(f), ae.style.borderRightStyle = s1, ae.style.margin = "0 " + G(-f / 2);
        var Ht = P - s0;
        Ht && (ae.style.verticalAlign = G(-Ht)), C0.push(ae);
      } else throw new O("Invalid separator type: " + k0.separator);
      L0++, k0 = X0[L0], Ce = false;
    }
    if (!(n >= l)) {
      var ne = void 0;
      if (n > 0 || e.hskipBeforeAndAfter) {
        var Lt, Pt;
        ne = (Lt = (Pt = k0) == null ? void 0 : Pt.pregap) != null ? Lt : x, ne !== 0 && (w0 = I(["arraycolsep"], []), w0.style.width = G(ne), C0.push(w0));
      }
      var Gt = [];
      for (a = 0; a < i; ++a) {
        var De = h[a], qe = De.cells[n];
        if (qe) {
          var l1 = De.pos - s0;
          qe.depth = De.depth, qe.height = De.height, Gt.push({ type: "elem", elem: qe, shift: l1 });
        }
      }
      var u1 = m0({ positionType: "individualShift", children: Gt }), o1 = I(["col-align-" + (((ge = k0) == null ? void 0 : ge.align) || "c")], [u1]);
      if (C0.push(o1), n < l - 1 || e.hskipBeforeAndAfter) {
        var Ut, Vt;
        ne = (Ut = (Vt = k0) == null ? void 0 : Vt.postgap) != null ? Ut : x, ne !== 0 && (w0 = I(["arraycolsep"], []), w0.style.width = G(ne), C0.push(w0));
      }
    }
  }
  var Ee = I(["mtable"], C0);
  if (d.length > 0) {
    for (var h1 = Mt("katex-hline", t, f), m1 = Mt("katex-hdashline", t, f), mt = [{ type: "elem", elem: Ee, shift: 0 }]; d.length > 0; ) {
      var Xt = d.pop(), Yt = Xt.pos - s0;
      Xt.isDashed ? mt.push({ type: "elem", elem: m1, shift: Yt }) : mt.push({ type: "elem", elem: h1, shift: Yt });
    }
    Ee = m0({ positionType: "individualShift", children: mt });
  }
  if (te.length === 0) return I(["mord"], [Ee], t);
  var c1 = m0({ positionType: "individualShift", children: te }), d1 = I(["katex-tag"], [c1], t);
  return Ve([Ee, d1]);
}, d2 = { c: "center ", l: "left ", r: "right " }, Ae = function(e, t) {
  for (var a = [], n = new H("mtd", [], ["mtr-glue"]), i = new H("mtd", [], ["mml-eqn-num"]), s = 0; s < e.body.length; s++) {
    for (var l = e.body[s], h = [], d = 0; d < l.length; d++) h.push(new H("mtd", [f0(l[d], t)]));
    e.tags && e.tags[s] && (h.unshift(n), h.push(n), e.leqno ? h.unshift(i) : h.push(i)), a.push(new H("mtr", h));
  }
  var f = new H("mtable", a), y = e.arraystretch === 0.5 ? 0.1 : 0.16 + e.arraystretch - 1 + (e.addJot ? 0.09 : 0);
  f.setAttribute("rowspacing", G(y));
  var x = "", w = "";
  if (e.cols && e.cols.length > 0) {
    var B = e.cols, C = "", D = false, q = 0, E = B.length;
    B[0].type === "separator" && (x += "top ", q = 1), B[B.length - 1].type === "separator" && (x += "bottom ", E -= 1);
    for (var P = q; P < E; P++) {
      var V = B[P];
      V.type === "align" ? (w += d2[V.align], D && (C += "none "), D = true) : V.type === "separator" && D && (C += V.separator === "|" ? "solid " : "dashed ", D = false);
    }
    f.setAttribute("columnalign", w.trim()), /[sd]/.test(C) && f.setAttribute("columnlines", C.trim());
  }
  if (e.colSeparationType === "align") {
    for (var X = e.cols || [], Y = "", J = 1; J < X.length; J++) Y += J % 2 ? "0em " : "1em ";
    f.setAttribute("columnspacing", Y.trim());
  } else e.colSeparationType === "alignat" || e.colSeparationType === "gather" ? f.setAttribute("columnspacing", "0em") : e.colSeparationType === "small" ? f.setAttribute("columnspacing", "0.2778em") : e.colSeparationType === "CD" ? f.setAttribute("columnspacing", "0.5em") : f.setAttribute("columnspacing", "1em");
  var Q = "", _ = e.hLinesBeforeRow;
  x += _[0].length > 0 ? "left " : "", x += _[_.length - 1].length > 0 ? "right " : "";
  for (var u0 = 1; u0 < _.length - 1; u0++) Q += _[u0].length === 0 ? "none " : _[u0][0] ? "dashed " : "solid ";
  return /[sd]/.test(Q) && f.setAttribute("rowlines", Q.trim()), x !== "" && (f = new H("menclose", [f]), f.setAttribute("notation", x.trim())), e.arraystretch && e.arraystretch < 1 && (f = new H("mstyle", [f]), f.setAttribute("scriptlevel", "1")), f;
}, mi = function(e, t) {
  e.envName.includes("ed") || Vr(e);
  var a = [], n = e.envName === "split", i = ut(e.parser, { cols: a, addJot: true, autoTag: n ? void 0 : Oa(e.envName), emptySingleRow: true, colSeparationType: e.envName.includes("at") ? "alignat" : "align", maxNumCols: n ? 2 : void 0, leqno: e.parser.settings.leqno }, "display"), s = 0, l = 0, h = { type: "ordgroup", mode: e.mode, body: [] };
  if (t[0] && t[0].type === "ordgroup") {
    var d = "Number of columns should be a positive integer", f = Ia(t[0], d);
    if (!/^[0-9]+$/.test(f) || Number(f) < 1) throw new O(d, t[0]);
    s = Number(f), l = s * 2;
  }
  var y = !l;
  i.body.forEach(function(C) {
    for (var D = 1; D < C.length; D += 2) {
      var q = o0(C[D], "styling"), E = o0(q.body[0], "ordgroup");
      E.body.unshift(h);
    }
    if (y) l < C.length && (l = C.length);
    else {
      var P = C.length / 2;
      if (s < P) throw new O("Too many math in a row: " + ("expected " + s + ", but got " + P), C[0]);
    }
  });
  for (var x = 0; x < l; ++x) {
    var w = "r", B = 0;
    x % 2 === 1 ? w = "l" : x > 0 && y && (B = 1), a[x] = { type: "align", align: w, pregap: B, postgap: 0 };
  }
  return i.colSeparationType = y ? "align" : "alignat", i;
};
Se({ type: "array", names: ["array", "darray"], props: { numArgs: 1 }, handler(r, e) {
  var t = Pr(e[0]), a = t ? [e[0]] : o0(e[0], "ordgroup").body, n = a.map(function(s) {
    var l = Lr(s), h = l.text;
    if ("lcr".includes(h)) return { type: "align", align: h };
    if (h === "|") return { type: "separator", separator: "|" };
    if (h === ":") return { type: "separator", separator: ":" };
    throw new O("Unknown column alignment: " + h, s);
  }), i = { cols: n, hskipBeforeAndAfter: true, maxNumCols: n.length };
  return ut(r.parser, i, $a(r.envName));
}, htmlBuilder: ze, mathmlBuilder: Ae });
Se({ type: "array", names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix*", "pmatrix*", "bmatrix*", "Bmatrix*", "vmatrix*", "Vmatrix*"], props: { numArgs: 0 }, handler(r) {
  var e = { matrix: null, pmatrix: ["(", ")"], bmatrix: ["[", "]"], Bmatrix: ["\\{", "\\}"], vmatrix: ["|", "|"], Vmatrix: ["\\Vert", "\\Vert"] }[r.envName.replace("*", "")], t = "c", a = { hskipBeforeAndAfter: false, cols: [{ type: "align", align: t }] };
  if (r.envName.charAt(r.envName.length - 1) === "*") {
    var n = r.parser;
    if (n.consumeSpaces(), n.fetch().text === "[") {
      if (n.consume(), n.consumeSpaces(), t = n.fetch().text, !"lcr".includes(t)) throw new O("Expected l or c or r", n.nextToken);
      n.consume(), n.consumeSpaces(), n.expect("]"), n.consume(), a.cols = [{ type: "align", align: t }];
    }
  }
  var i = ut(r.parser, a, $a(r.envName)), s = Math.max(0, ...i.body.map((l) => l.length));
  return i.cols = new Array(s).fill({ type: "align", align: t }), e ? { type: "leftright", mode: r.mode, body: [i], left: e[0], right: e[1], rightColor: void 0 } : i;
}, htmlBuilder: ze, mathmlBuilder: Ae });
Se({ type: "array", names: ["smallmatrix"], props: { numArgs: 0 }, handler(r) {
  var e = { arraystretch: 0.5 }, t = ut(r.parser, e, "script");
  return t.colSeparationType = "small", t;
}, htmlBuilder: ze, mathmlBuilder: Ae });
Se({ type: "array", names: ["subarray"], props: { numArgs: 1 }, handler(r, e) {
  var t = Pr(e[0]), a = t ? [e[0]] : o0(e[0], "ordgroup").body, n = a.map(function(l) {
    var h = Lr(l), d = h.text;
    if ("lc".includes(d)) return { type: "align", align: d };
    throw new O("Unknown column alignment: " + d, l);
  });
  if (n.length > 1) throw new O("{subarray} can contain only one column");
  var i = { cols: n, hskipBeforeAndAfter: false, arraystretch: 0.5 }, s = ut(r.parser, i, "script");
  if (s.body.length > 0 && s.body[0].length > 1) throw new O("{subarray} can contain only one column");
  return s;
}, htmlBuilder: ze, mathmlBuilder: Ae });
Se({ type: "array", names: ["cases", "dcases", "rcases", "drcases"], props: { numArgs: 0 }, handler(r) {
  var e = { arraystretch: 1.2, cols: [{ type: "align", align: "l", pregap: 0, postgap: 1 }, { type: "align", align: "l", pregap: 0, postgap: 0 }] }, t = ut(r.parser, e, $a(r.envName));
  return { type: "leftright", mode: r.mode, body: [t], left: r.envName.includes("r") ? "." : "\\{", right: r.envName.includes("r") ? "\\}" : ".", rightColor: void 0 };
}, htmlBuilder: ze, mathmlBuilder: Ae });
Se({ type: "array", names: ["align", "align*", "aligned", "split"], props: { numArgs: 0 }, handler: mi, htmlBuilder: ze, mathmlBuilder: Ae });
Se({ type: "array", names: ["gathered", "gather", "gather*"], props: { numArgs: 0 }, handler(r) {
  c2.has(r.envName) && Vr(r);
  var e = { cols: [{ type: "align", align: "c" }], addJot: true, colSeparationType: "gather", autoTag: Oa(r.envName), emptySingleRow: true, leqno: r.parser.settings.leqno };
  return ut(r.parser, e, "display");
}, htmlBuilder: ze, mathmlBuilder: Ae });
Se({ type: "array", names: ["alignat", "alignat*", "alignedat"], props: { numArgs: 1 }, handler: mi, htmlBuilder: ze, mathmlBuilder: Ae });
Se({ type: "array", names: ["equation", "equation*"], props: { numArgs: 0 }, handler(r) {
  Vr(r);
  var e = { autoTag: Oa(r.envName), emptySingleRow: true, singleRow: true, maxNumCols: 1, leqno: r.parser.settings.leqno };
  return ut(r.parser, e, "display");
}, htmlBuilder: ze, mathmlBuilder: Ae });
Se({ type: "array", names: ["CD"], props: { numArgs: 0 }, handler(r) {
  return Vr(r), Kl(r.parser);
}, htmlBuilder: ze, mathmlBuilder: Ae });
g("\\nonumber", "\\gdef\\@eqnsw{0}");
g("\\notag", "\\nonumber");
W({ type: "text", names: ["\\hline", "\\hdashline"], numArgs: 0, allowedInText: true, allowedInMath: true, handler(r, e) {
  throw new O(r.funcName + " valid only within array environment");
} });
var T4 = li;
W({ type: "environment", names: ["\\begin", "\\end"], numArgs: 1, argTypes: ["text"], handler(r, e) {
  var t = r.parser, a = r.funcName, n = e[0];
  if (n.type !== "ordgroup") throw new O("Invalid environment name", n);
  var i = Ia(n, "Environment name should contain only text characters and spaces", true);
  if (a === "\\begin") {
    if (!Object.prototype.hasOwnProperty.call(T4, i)) throw new O("No such environment: " + i, n);
    var s = T4[i], l = t.parseArguments("\\begin{" + i + "}", s), h = l.args, d = l.optArgs, f = { mode: t.mode, envName: i, parser: t }, y = s.handler(f, h, d);
    t.expect("\\end", false);
    var x = t.nextToken, w = o0(t.parseFunction(), "environment");
    if (w.name !== i) throw new O("Mismatch: \\begin{" + i + "} matched by \\end{" + w.name + "}", x);
    return y;
  }
  return { type: "environment", mode: t.mode, name: i, nameGroup: n };
} });
var f2 = (r, e) => {
  var t = r.font, a = e.withFont(t);
  return h0(r.body, a);
}, v2 = (r, e) => {
  var t = r.font, a = e.withFont(t);
  return f0(r.body, a);
}, B4 = { "\\Bbb": "\\mathbb", "\\bold": "\\mathbf", "\\frak": "\\mathfrak" };
W({ type: "font", names: ["\\mathrm", "\\mathit", "\\mathbf", "\\mathnormal", "\\mathsfit", "\\mathbb", "\\mathcal", "\\mathfrak", "\\mathscr", "\\mathsf", "\\mathtt", "\\Bbb", "\\bold", "\\frak"], numArgs: 1, allowedInArgument: true, handler: (r, e) => {
  var t = r.parser, a = r.funcName, n = er(e[0]), i = a in B4 ? B4[a] : a;
  return { type: "font", mode: t.mode, font: i.slice(1), body: n };
}, htmlBuilder: f2, mathmlBuilder: v2 });
W({ type: "mclass", names: ["\\boldsymbol", "\\bm"], numArgs: 1, handler: (r, e) => {
  var t = r.parser, a = e[0];
  return { type: "mclass", mode: t.mode, mclass: Gr(a), body: [{ type: "font", mode: t.mode, font: "boldsymbol", body: a }], isCharacterBox: Ge(a) };
} });
W({ type: "font", names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"], numArgs: 0, allowedInText: true, handler: (r, e) => {
  var t = r.parser, a = r.funcName, n = r.breakOnTokenText, i = t.mode, s = t.parseExpression(true, n);
  return { type: "font", mode: i, font: "math" + a.slice(1), body: { type: "ordgroup", mode: t.mode, body: s } };
} });
var p2 = (r, e) => {
  var t = e.style, a = t.fracNum(), n = t.fracDen(), i;
  i = e.havingStyle(a);
  var s = h0(r.numer, i, e);
  if (r.continued) {
    var l = 8.5 / e.fontMetrics().ptPerEm, h = 3.5 / e.fontMetrics().ptPerEm;
    s.height = s.height < l ? l : s.height, s.depth = s.depth < h ? h : s.depth;
  }
  i = e.havingStyle(n);
  var d = h0(r.denom, i, e), f, y, x;
  r.hasBarLine ? (r.barSize ? (y = A0(r.barSize, e), f = Mt("frac-line", e, y)) : f = Mt("frac-line", e), y = f.height, x = f.height) : (f = null, y = 0, x = e.fontMetrics().defaultRuleThickness);
  var w, B, C;
  t.size === n0.DISPLAY.size ? (w = e.fontMetrics().num1, y > 0 ? B = 3 * x : B = 7 * x, C = e.fontMetrics().denom1) : (y > 0 ? (w = e.fontMetrics().num2, B = x) : (w = e.fontMetrics().num3, B = 3 * x), C = e.fontMetrics().denom2);
  var D;
  if (f) {
    var E = e.fontMetrics().axisHeight;
    w - s.depth - (E + 0.5 * y) < B && (w += B - (w - s.depth - (E + 0.5 * y))), E - 0.5 * y - (d.height - C) < B && (C += B - (E - 0.5 * y - (d.height - C)));
    var P = -(E - 0.5 * y);
    D = m0({ positionType: "individualShift", children: [{ type: "elem", elem: d, shift: C }, { type: "elem", elem: f, shift: P }, { type: "elem", elem: s, shift: -w }] });
  } else {
    var q = w - s.depth - (d.height - C);
    q < B && (w += 0.5 * (B - q), C += 0.5 * (B - q)), D = m0({ positionType: "individualShift", children: [{ type: "elem", elem: d, shift: C }, { type: "elem", elem: s, shift: -w }] });
  }
  i = e.havingStyle(t), D.height *= i.sizeMultiplier / e.sizeMultiplier, D.depth *= i.sizeMultiplier / e.sizeMultiplier;
  var V;
  t.size === n0.DISPLAY.size ? V = e.fontMetrics().delim1 : t.size === n0.SCRIPTSCRIPT.size ? V = e.havingStyle(n0.SCRIPT).fontMetrics().delim2 : V = e.fontMetrics().delim2;
  var X, Y;
  return r.leftDelim == null ? X = tr(e, ["mopen"]) : X = sa(r.leftDelim, V, true, e.havingStyle(t), r.mode, ["mopen"]), r.continued ? Y = I([]) : r.rightDelim == null ? Y = tr(e, ["mclose"]) : Y = sa(r.rightDelim, V, true, e.havingStyle(t), r.mode, ["mclose"]), I(["mord"].concat(i.sizingClasses(e)), [X, I(["mfrac"], [D]), Y], e);
}, g2 = (r, e) => {
  var t = new H("mfrac", [f0(r.numer, e), f0(r.denom, e)]);
  if (!r.hasBarLine) t.setAttribute("linethickness", "0px");
  else if (r.barSize) {
    var a = A0(r.barSize, e);
    t.setAttribute("linethickness", G(a));
  }
  if (r.leftDelim != null || r.rightDelim != null) {
    var n = [];
    if (r.leftDelim != null) {
      var i = new H("mo", [new q0(r.leftDelim.replace("\\", ""))]);
      i.setAttribute("fence", "true"), n.push(i);
    }
    if (n.push(t), r.rightDelim != null) {
      var s = new H("mo", [new q0(r.rightDelim.replace("\\", ""))]);
      s.setAttribute("fence", "true"), n.push(s);
    }
    return Na(n);
  }
  return t;
}, ci = (r, e) => {
  if (!e) return r;
  var t = { type: "styling", mode: r.mode, style: e, body: [r] };
  return t;
};
W({ type: "genfrac", names: ["\\cfrac", "\\dfrac", "\\frac", "\\tfrac", "\\dbinom", "\\binom", "\\tbinom", "\\\\atopfrac", "\\\\bracefrac", "\\\\brackfrac"], numArgs: 2, allowedInArgument: true, handler: (r, e) => {
  var t = r.parser, a = r.funcName, n = e[0], i = e[1], s, l = null, h = null;
  switch (a) {
    case "\\cfrac":
    case "\\dfrac":
    case "\\frac":
    case "\\tfrac":
      s = true;
      break;
    case "\\\\atopfrac":
      s = false;
      break;
    case "\\dbinom":
    case "\\binom":
    case "\\tbinom":
      s = false, l = "(", h = ")";
      break;
    case "\\\\bracefrac":
      s = false, l = "\\{", h = "\\}";
      break;
    case "\\\\brackfrac":
      s = false, l = "[", h = "]";
      break;
    default:
      throw new Error("Unrecognized genfrac command");
  }
  var d = a === "\\cfrac", f = null;
  return d || a.startsWith("\\d") ? f = "display" : a.startsWith("\\t") && (f = "text"), ci({ type: "genfrac", mode: t.mode, numer: n, denom: i, continued: d, hasBarLine: s, leftDelim: l, rightDelim: h, barSize: null }, f);
}, htmlBuilder: p2, mathmlBuilder: g2 });
W({ type: "infix", names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"], numArgs: 0, infix: true, handler(r) {
  var e = r.parser, t = r.funcName, a = r.token, n;
  switch (t) {
    case "\\over":
      n = "\\frac";
      break;
    case "\\choose":
      n = "\\binom";
      break;
    case "\\atop":
      n = "\\\\atopfrac";
      break;
    case "\\brace":
      n = "\\\\bracefrac";
      break;
    case "\\brack":
      n = "\\\\brackfrac";
      break;
    default:
      throw new Error("Unrecognized infix genfrac command");
  }
  return { type: "infix", mode: e.mode, replaceWith: n, token: a };
} });
var C4 = ["display", "text", "script", "scriptscript"], D4 = function(e) {
  var t = null;
  return e.length > 0 && (t = e, t = t === "." ? null : t), t;
};
W({ type: "genfrac", names: ["\\genfrac"], numArgs: 6, allowedInArgument: true, argTypes: ["math", "math", "size", "text", "math", "math"], handler(r, e) {
  var t = r.parser, a = e[4], n = e[5], i = er(e[0]), s = i.type === "atom" && i.family === "open" ? D4(i.text) : null, l = er(e[1]), h = l.type === "atom" && l.family === "close" ? D4(l.text) : null, d = o0(e[2], "size"), f, y = null;
  d.isBlank ? f = true : (y = d.value, f = y.number > 0);
  var x = null, w = e[3];
  if (w.type === "ordgroup") {
    if (w.body.length > 0) {
      var B = o0(w.body[0], "textord");
      x = C4[Number(B.text)];
    }
  } else w = o0(w, "textord"), x = C4[Number(w.text)];
  return ci({ type: "genfrac", mode: t.mode, numer: a, denom: n, continued: false, hasBarLine: f, barSize: y, leftDelim: s, rightDelim: h }, x);
} });
W({ type: "infix", names: ["\\above"], numArgs: 1, argTypes: ["size"], infix: true, handler(r, e) {
  var t = r.parser;
  r.funcName;
  var a = r.token;
  return { type: "infix", mode: t.mode, replaceWith: "\\\\abovefrac", size: o0(e[0], "size").value, token: a };
} });
W({ type: "genfrac", names: ["\\\\abovefrac"], numArgs: 3, argTypes: ["math", "size", "math"], handler: (r, e) => {
  var t = r.parser;
  r.funcName;
  var a = e[0], n = o0(e[1], "infix").size;
  if (!n) throw new Error("\\\\abovefrac expected size, but got " + String(n));
  var i = e[2], s = n.number > 0;
  return { type: "genfrac", mode: t.mode, numer: a, denom: i, continued: false, hasBarLine: s, barSize: n, leftDelim: null, rightDelim: null };
} });
var di = (r, e) => {
  var t = e.style, a, n;
  r.type === "supsub" ? (a = r.sup ? h0(r.sup, e.havingStyle(t.sup()), e) : h0(r.sub, e.havingStyle(t.sub()), e), n = o0(r.base, "horizBrace")) : n = o0(r, "horizBrace");
  var i = h0(n.base, e.havingBaseStyle(n0.DISPLAY)), s = Hr(n, e), l;
  if (n.isOver ? l = m0({ positionType: "firstBaseline", children: [{ type: "elem", elem: i }, { type: "kern", size: 0.1 }, { type: "elem", elem: s, wrapperClasses: ["svg-align"] }] }) : l = m0({ positionType: "bottom", positionData: i.depth + 0.1 + s.height, children: [{ type: "elem", elem: s, wrapperClasses: ["svg-align"] }, { type: "kern", size: 0.1 }, { type: "elem", elem: i }] }), a) {
    var h = I(["minner", n.isOver ? "mover" : "munder"], [l], e);
    n.isOver ? l = m0({ positionType: "firstBaseline", children: [{ type: "elem", elem: h }, { type: "kern", size: 0.2 }, { type: "elem", elem: a }] }) : l = m0({ positionType: "bottom", positionData: h.depth + 0.2 + a.height + a.depth, children: [{ type: "elem", elem: a }, { type: "kern", size: 0.2 }, { type: "elem", elem: h }] });
  }
  return I(["minner", n.isOver ? "mover" : "munder"], [l], e);
}, b2 = (r, e) => {
  var t = $r(r.label);
  return new H(r.isOver ? "mover" : "munder", [f0(r.base, e), t]);
};
W({ type: "horizBrace", names: ["\\overbrace", "\\underbrace", "\\overbracket", "\\underbracket"], numArgs: 1, handler(r, e) {
  var t = r.parser, a = r.funcName;
  return { type: "horizBrace", mode: t.mode, label: a, isOver: a.includes("\\over"), base: e[0] };
}, htmlBuilder: di, mathmlBuilder: b2 });
W({ type: "href", names: ["\\href"], numArgs: 2, argTypes: ["url", "original"], allowedInText: true, handler: (r, e) => {
  var t = r.parser, a = e[1], n = o0(e[0], "url").url;
  return t.settings.isTrusted({ command: "\\href", url: n }) ? { type: "href", mode: t.mode, href: n, body: D0(a) } : t.formatUnsupportedCmd("\\href");
}, htmlBuilder: (r, e) => {
  var t = $0(r.body, e, false);
  return xl(r.href, [], t, e);
}, mathmlBuilder: (r, e) => {
  var t = at(r.body, e);
  return t instanceof H || (t = new H("mrow", [t])), t.setAttribute("href", r.href), t;
} });
W({ type: "href", names: ["\\url"], numArgs: 1, argTypes: ["url"], allowedInText: true, handler: (r, e) => {
  var t = r.parser, a = o0(e[0], "url").url;
  if (!t.settings.isTrusted({ command: "\\url", url: a })) return t.formatUnsupportedCmd("\\url");
  for (var n = [], i = 0; i < a.length; i++) {
    var s = a[i];
    s === "~" && (s = "\\textasciitilde"), n.push({ type: "textord", mode: "text", text: s });
  }
  var l = { type: "text", mode: t.mode, font: "\\texttt", body: n };
  return { type: "href", mode: t.mode, href: a, body: D0(l) };
} });
W({ type: "hbox", names: ["\\hbox"], numArgs: 1, argTypes: ["text"], allowedInText: true, primitive: true, handler(r, e) {
  var t = r.parser;
  return { type: "hbox", mode: t.mode, body: D0(e[0]) };
}, htmlBuilder(r, e) {
  var t = $0(r.body, e.withFont(""), false);
  return Ve(t);
}, mathmlBuilder(r, e) {
  return new H("mrow", oe(r.body, e.withFont("")));
} });
W({ type: "html", names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"], numArgs: 2, argTypes: ["raw", "original"], allowedInText: true, handler: (r, e) => {
  var t = r.parser, a = r.funcName;
  r.token;
  var n = o0(e[0], "raw").string, i = e[1];
  t.settings.strict && t.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
  var s, l = {};
  switch (a) {
    case "\\htmlClass":
      l.class = n, s = { command: "\\htmlClass", class: n };
      break;
    case "\\htmlId":
      l.id = n, s = { command: "\\htmlId", id: n };
      break;
    case "\\htmlStyle":
      l.style = n, s = { command: "\\htmlStyle", style: n };
      break;
    case "\\htmlData": {
      for (var h = "{,}", d = [], f = "", y = 0; y < n.length; y++) n.startsWith(h, y) ? (f += ",", y += h.length - 1) : n[y] === "," ? (d.push(f), f = "") : f += n[y];
      d.push(f);
      for (var x = 0; x < d.length; x++) {
        var w = d[x], B = w.indexOf("=");
        if (B < 0) throw new O("\\htmlData key/value '" + w + "' missing equals sign");
        var C = w.slice(0, B), D = w.slice(B + 1);
        l["data-" + C.trim()] = D;
      }
      s = { command: "\\htmlData", attributes: l };
      break;
    }
    default:
      throw new Error("Unrecognized html command");
  }
  return t.settings.isTrusted(s) ? { type: "html", mode: t.mode, attributes: l, body: D0(i) } : t.formatUnsupportedCmd(a);
}, htmlBuilder: (r, e) => {
  var t = $0(r.body, e, false), a = ["enclosing"];
  r.attributes.class && a.push(...r.attributes.class.trim().split(/\s+/));
  var n = I(a, t, e);
  for (var i of Object.entries(r.attributes)) {
    var s = i[0], l = i[1];
    s !== "class" && n.setAttribute(s, l);
  }
  return n;
}, mathmlBuilder: (r, e) => at(r.body, e) });
W({ type: "htmlmathml", names: ["\\html@mathml"], numArgs: 2, allowedInArgument: true, allowedInText: true, handler: (r, e) => {
  var t = r.parser;
  return { type: "htmlmathml", mode: t.mode, html: D0(e[0]), mathml: D0(e[1]) };
}, htmlBuilder: (r, e) => {
  var t = $0(r.html, e, false);
  return Ve(t);
}, mathmlBuilder: (r, e) => at(r.mathml, e) });
var T1 = function(e) {
  if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e)) return { number: +e, unit: "bp" };
  var t = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e);
  if (!t) throw new O("Invalid size: '" + e + "' in \\includegraphics");
  var a = { number: +(t[1] + t[2]), unit: t[3] };
  if (!En(a)) throw new O("Invalid unit: '" + a.unit + "' in \\includegraphics.");
  return a;
};
W({ type: "includegraphics", names: ["\\includegraphics"], numArgs: 1, numOptionalArgs: 1, argTypes: ["raw", "url"], allowedInText: false, handler: (r, e, t) => {
  var a = r.parser, n = { number: 0, unit: "em" }, i = { number: 0.9, unit: "em" }, s = { number: 0, unit: "em" }, l = "";
  if (t[0]) for (var h = o0(t[0], "raw").string, d = h.split(","), f = 0; f < d.length; f++) {
    var y = d[f].split("=");
    if (y.length === 2) {
      var x = y[1].trim();
      switch (y[0].trim()) {
        case "alt":
          l = x;
          break;
        case "width":
          n = T1(x);
          break;
        case "height":
          i = T1(x);
          break;
        case "totalheight":
          s = T1(x);
          break;
        default:
          throw new O("Invalid key: '" + y[0] + "' in \\includegraphics.");
      }
    }
  }
  var w = o0(e[0], "url").url;
  return l === "" && (l = w, l = l.replace(/^.*[\\/]/, ""), l = l.substring(0, l.lastIndexOf("."))), a.settings.isTrusted({ command: "\\includegraphics", url: w }) ? { type: "includegraphics", mode: a.mode, alt: l, width: n, height: i, totalheight: s, src: w } : a.formatUnsupportedCmd("\\includegraphics");
}, htmlBuilder: (r, e) => {
  var t = A0(r.height, e), a = 0;
  r.totalheight.number > 0 && (a = A0(r.totalheight, e) - t);
  var n = 0;
  r.width.number > 0 && (n = A0(r.width, e));
  var i = { height: G(t + a) };
  n > 0 && (i.width = G(n)), a > 0 && (i.verticalAlign = G(-a));
  var s = new ol(r.src, r.alt, i);
  return s.height = t, s.depth = a, s;
}, mathmlBuilder: (r, e) => {
  var t = new H("mglyph", []);
  t.setAttribute("alt", r.alt);
  var a = A0(r.height, e), n = 0;
  if (r.totalheight.number > 0 && (n = A0(r.totalheight, e) - a, t.setAttribute("valign", G(-n))), t.setAttribute("height", G(a + n)), r.width.number > 0) {
    var i = A0(r.width, e);
    t.setAttribute("width", G(i));
  }
  return t.setAttribute("src", r.src), t;
} });
W({ type: "kern", names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"], numArgs: 1, argTypes: ["size"], primitive: true, allowedInText: true, handler(r, e) {
  var t = r.parser, a = r.funcName, n = o0(e[0], "size");
  if (t.settings.strict) {
    var i = a[1] === "m", s = n.value.unit === "mu";
    i ? (s || t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " supports only mu units, " + ("not " + n.value.unit + " units")), t.mode !== "math" && t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " works only in math mode")) : s && t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " doesn't support mu units");
  }
  return { type: "kern", mode: t.mode, dimension: n.value };
}, htmlBuilder(r, e) {
  return Hn(r.dimension, e);
}, mathmlBuilder(r, e) {
  var t = A0(r.dimension, e);
  return new Xn(t);
} });
W({ type: "lap", names: ["\\mathllap", "\\mathrlap", "\\mathclap"], numArgs: 1, allowedInText: true, handler: (r, e) => {
  var t = r.parser, a = r.funcName, n = e[0];
  return { type: "lap", mode: t.mode, alignment: a.slice(5), body: n };
}, htmlBuilder: (r, e) => {
  var t;
  r.alignment === "clap" ? (t = I([], [h0(r.body, e)]), t = I(["katex-inner"], [t], e)) : t = I(["katex-inner"], [h0(r.body, e)]);
  var a = I(["katex-fix"], []), n = I([r.alignment], [t, a], e), i = I(["katex-strut"]);
  return i.style.height = G(n.height + n.depth), n.depth && (i.style.verticalAlign = G(-n.depth)), n.children.unshift(i), n = I(["katex-thinbox"], [n], e), I(["mord", "katex-vbox"], [n], e);
}, mathmlBuilder: (r, e) => {
  var t = new H("mpadded", [f0(r.body, e)]);
  if (r.alignment !== "rlap") {
    var a = r.alignment === "llap" ? "-1" : "-0.5";
    t.setAttribute("lspace", a + "width");
  }
  return t.setAttribute("width", "0px"), t;
} });
W({ type: "styling", names: ["\\(", "$"], numArgs: 0, allowedInText: true, allowedInMath: false, handler(r, e) {
  var t = r.funcName, a = r.parser, n = a.mode;
  a.switchMode("math");
  var i = t === "\\(" ? "\\)" : "$", s = a.parseExpression(false, i);
  return a.expect(i), a.switchMode(n), { type: "styling", mode: a.mode, style: "text", resetFont: true, body: s };
} });
W({ type: "text", names: ["\\)", "\\]"], numArgs: 0, allowedInText: true, allowedInMath: false, handler(r, e) {
  throw new O("Mismatched " + r.funcName);
} });
var q4 = (r, e) => {
  switch (e.style.size) {
    case n0.DISPLAY.size:
      return r.display;
    case n0.TEXT.size:
      return r.text;
    case n0.SCRIPT.size:
      return r.script;
    case n0.SCRIPTSCRIPT.size:
      return r.scriptscript;
    default:
      return r.text;
  }
};
W({ type: "mathchoice", names: ["\\mathchoice"], numArgs: 4, primitive: true, handler: (r, e) => {
  var t = r.parser;
  return { type: "mathchoice", mode: t.mode, display: D0(e[0]), text: D0(e[1]), script: D0(e[2]), scriptscript: D0(e[3]) };
}, htmlBuilder: (r, e) => {
  var t = q4(r, e), a = $0(t, e, false);
  return Ve(a);
}, mathmlBuilder: (r, e) => {
  var t = q4(r, e);
  return at(t, e);
} });
var fi = (r, e, t, a, n, i, s) => {
  r = I([], [r]);
  var l = t && Ge(t), h, d;
  if (e) {
    var f = h0(e, a.havingStyle(n.sup()), a);
    d = { elem: f, kern: Math.max(a.fontMetrics().bigOpSpacing1, a.fontMetrics().bigOpSpacing3 - f.depth) };
  }
  if (t) {
    var y = h0(t, a.havingStyle(n.sub()), a);
    h = { elem: y, kern: Math.max(a.fontMetrics().bigOpSpacing2, a.fontMetrics().bigOpSpacing4 - y.height) };
  }
  var x;
  if (d && h) {
    var w = a.fontMetrics().bigOpSpacing5 + h.elem.height + h.elem.depth + h.kern + r.depth + s;
    x = m0({ positionType: "bottom", positionData: w, children: [{ type: "kern", size: a.fontMetrics().bigOpSpacing5 }, { type: "elem", elem: h.elem, marginLeft: G(-i) }, { type: "kern", size: h.kern }, { type: "elem", elem: r }, { type: "kern", size: d.kern }, { type: "elem", elem: d.elem, marginLeft: G(i) }, { type: "kern", size: a.fontMetrics().bigOpSpacing5 }] });
  } else if (h) {
    var B = r.height - s;
    x = m0({ positionType: "top", positionData: B, children: [{ type: "kern", size: a.fontMetrics().bigOpSpacing5 }, { type: "elem", elem: h.elem, marginLeft: G(-i) }, { type: "kern", size: h.kern }, { type: "elem", elem: r }] });
  } else if (d) {
    var C = r.depth + s;
    x = m0({ positionType: "bottom", positionData: C, children: [{ type: "elem", elem: r }, { type: "kern", size: d.kern }, { type: "elem", elem: d.elem, marginLeft: G(i) }, { type: "kern", size: a.fontMetrics().bigOpSpacing5 }] });
  } else return r;
  var D = [x];
  if (h && i !== 0 && !l) {
    var q = I(["mspace"], [], a);
    q.style.marginRight = G(i), D.unshift(q);
  }
  return I(["mop", "op-limits"], D, a);
}, vi = /* @__PURE__ */ new Set(["\\smallint"]), pi = (r, e) => {
  var t, a, n = false, i;
  r.type === "supsub" ? (t = r.sup, a = r.sub, i = o0(r.base, "op"), n = true) : i = o0(r, "op");
  var s = e.style, l = false;
  s.size === n0.DISPLAY.size && i.symbol && !vi.has(i.name) && (l = true);
  var h, d;
  if (i.symbol) {
    var f = l ? "Size2-Regular" : "Size1-Regular", y = "";
    if ((i.name === "\\oiint" || i.name === "\\oiiint") && (y = i.name.slice(1), i.name = y === "oiint" ? "\\iint" : "\\iiint"), h = j0(i.name, f, "math", e, ["mop", "op-symbol", l ? "large-op" : "small-op"]), d = h.italic, y.length > 0) {
      var x = Pn(y + "Size" + (l ? "2" : "1"), e);
      h = m0({ positionType: "individualShift", children: [{ type: "elem", elem: h, shift: 0 }, { type: "elem", elem: x, shift: l ? 0.08 : 0 }] }), i.name = "\\" + y, h.classes.unshift("mop"), h.italic = d;
    }
  } else if (i.body) {
    var w = $0(i.body, e, true);
    w.length === 1 && w[0] instanceof se ? (h = w[0], h.classes[0] = "mop") : h = I(["mop"], w, e);
  } else {
    for (var B = [], C = 1; C < i.name.length; C++) B.push(qa(i.name[C], i.mode, e));
    h = I(["mop"], B, e);
  }
  var D = 0, q = 0;
  if ((h instanceof se || i.name === "\\oiint" || i.name === "\\oiiint") && !i.suppressBaseShift) {
    var E;
    D = (h.height - h.depth) / 2 - e.fontMetrics().axisHeight, q = (E = h.italic) != null ? E : 0;
  }
  return n ? fi(h, t, a, e, s, q, D) : (D && (h.style.position = "relative", h.style.top = G(D)), h);
}, y2 = (r, e) => {
  var t;
  if (r.symbol) t = new H("mo", [ve(r.name, r.mode)]), vi.has(r.name) && t.setAttribute("largeop", "false");
  else if (r.body) t = new H("mo", oe(r.body, e));
  else {
    t = new H("mi", [new q0(r.name.slice(1))]);
    var a = new H("mo", [ve("\u2061", "text")]);
    r.parentIsSupSub ? t = new H("mrow", [t, a]) : t = Vn([t, a]);
  }
  return t;
}, x2 = { "\u220F": "\\prod", "\u2210": "\\coprod", "\u2211": "\\sum", "\u22C0": "\\bigwedge", "\u22C1": "\\bigvee", "\u22C2": "\\bigcap", "\u22C3": "\\bigcup", "\u2A00": "\\bigodot", "\u2A01": "\\bigoplus", "\u2A02": "\\bigotimes", "\u2A04": "\\biguplus", "\u2A06": "\\bigsqcup" };
W({ type: "op", names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "\u220F", "\u2210", "\u2211", "\u22C0", "\u22C1", "\u22C2", "\u22C3", "\u2A00", "\u2A01", "\u2A02", "\u2A04", "\u2A06"], numArgs: 0, handler: (r, e) => {
  var t = r.parser, a = r.funcName, n = a;
  return n.length === 1 && (n = x2[n]), { type: "op", mode: t.mode, limits: true, parentIsSupSub: false, symbol: true, name: n };
}, htmlBuilder: pi, mathmlBuilder: y2 });
W({ type: "op", names: ["\\mathop"], numArgs: 1, primitive: true, handler: (r, e) => {
  var t = r.parser, a = e[0];
  return { type: "op", mode: t.mode, limits: false, parentIsSupSub: false, symbol: false, body: D0(a) };
} });
var w2 = { "\u222B": "\\int", "\u222C": "\\iint", "\u222D": "\\iiint", "\u222E": "\\oint", "\u222F": "\\oiint", "\u2230": "\\oiiint" };
W({ type: "op", names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"], numArgs: 0, handler(r) {
  var e = r.parser, t = r.funcName;
  return { type: "op", mode: e.mode, limits: false, parentIsSupSub: false, symbol: false, name: t };
} });
W({ type: "op", names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"], numArgs: 0, handler(r) {
  var e = r.parser, t = r.funcName;
  return { type: "op", mode: e.mode, limits: true, parentIsSupSub: false, symbol: false, name: t };
} });
W({ type: "op", names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "\u222B", "\u222C", "\u222D", "\u222E", "\u222F", "\u2230"], numArgs: 0, allowedInArgument: true, handler(r) {
  var e = r.parser, t = r.funcName, a = t;
  return a.length === 1 && (a = w2[a]), { type: "op", mode: e.mode, limits: false, parentIsSupSub: false, symbol: true, name: a };
} });
var gi = (r, e) => {
  var t, a, n = false, i;
  r.type === "supsub" ? (t = r.sup, a = r.sub, i = o0(r.base, "operatorname"), n = true) : i = o0(r, "operatorname");
  var s;
  if (i.body.length > 0) {
    for (var l = i.body.map((y) => {
      var x = "text" in y ? y.text : void 0;
      return typeof x == "string" ? { type: "textord", mode: y.mode, text: x } : y;
    }), h = $0(l, e.withFont("mathrm"), true), d = 0; d < h.length; d++) {
      var f = h[d];
      f instanceof se && (f.text = f.text.replace(/\u2212/, "-").replace(/\u2217/, "*"));
    }
    s = I(["mop"], h, e);
  } else s = I(["mop"], [], e);
  return n ? fi(s, t, a, e, e.style, 0, 0) : s;
}, k2 = (r, e) => {
  for (var t = oe(r.body, e.withFont("mathrm")), a = true, n = 0; n < t.length; n++) {
    var i = t[n];
    if (!(i instanceof Xn)) if (i instanceof H) switch (i.type) {
      case "mi":
      case "mn":
      case "mspace":
      case "mtext":
        break;
      case "mo": {
        var s = i.children[0];
        i.children.length === 1 && s instanceof q0 ? s.text = s.text.replace(/\u2212/, "-").replace(/\u2217/, "*") : a = false;
        break;
      }
      default:
        a = false;
    }
    else a = false;
  }
  if (a) {
    var l = t.map((f) => f.toText()).join("");
    t = [new q0(l)];
  }
  var h = new H("mi", t);
  h.setAttribute("mathvariant", "normal");
  var d = new H("mo", [ve("\u2061", "text")]);
  return r.parentIsSupSub ? new H("mrow", [h, d]) : Vn([h, d]);
};
W({ type: "operatorname", names: ["\\operatorname@", "\\operatornamewithlimits"], numArgs: 1, handler: (r, e) => {
  var t = r.parser, a = r.funcName, n = e[0];
  return { type: "operatorname", mode: t.mode, body: D0(n), alwaysHandleSupSub: a === "\\operatornamewithlimits", limits: false, parentIsSupSub: false };
}, htmlBuilder: gi, mathmlBuilder: k2 });
g("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
yt({ type: "ordgroup", htmlBuilder(r, e) {
  return r.semisimple ? Ve($0(r.body, e, false)) : I(["mord"], $0(r.body, e, true), e);
}, mathmlBuilder(r, e) {
  return at(r.body, e, true);
} });
W({ type: "overline", names: ["\\overline"], numArgs: 1, handler(r, e) {
  var t = r.parser, a = e[0];
  return { type: "overline", mode: t.mode, body: a };
}, htmlBuilder(r, e) {
  var t = h0(r.body, e.havingCrampedStyle()), a = Mt("overline-line", e), n = e.fontMetrics().defaultRuleThickness, i = m0({ positionType: "firstBaseline", children: [{ type: "elem", elem: t }, { type: "kern", size: 3 * n }, { type: "elem", elem: a }, { type: "kern", size: n }] });
  return I(["mord", "katex-overline"], [i], e);
}, mathmlBuilder(r, e) {
  var t = new H("mo", [new q0("\u203E")]);
  t.setAttribute("stretchy", "true");
  var a = new H("mover", [f0(r.body, e), t]);
  return a.setAttribute("accent", "true"), a;
} });
W({ type: "phantom", names: ["\\phantom"], numArgs: 1, allowedInText: true, handler: (r, e) => {
  var t = r.parser, a = e[0];
  return { type: "phantom", mode: t.mode, body: D0(a) };
}, htmlBuilder: (r, e) => {
  var t = $0(r.body, e.withPhantom(), false);
  return Ve(t);
}, mathmlBuilder: (r, e) => {
  var t = oe(r.body, e);
  return new H("mphantom", t);
} });
g("\\hphantom", "\\smash{\\phantom{#1}}");
W({ type: "vphantom", names: ["\\vphantom"], numArgs: 1, allowedInText: true, handler: (r, e) => {
  var t = r.parser, a = e[0];
  return { type: "vphantom", mode: t.mode, body: a };
}, htmlBuilder: (r, e) => {
  var t = I(["katex-inner"], [h0(r.body, e.withPhantom())]), a = I(["katex-fix"], []);
  return I(["mord", "rlap"], [t, a], e);
}, mathmlBuilder: (r, e) => {
  var t = oe(D0(r.body), e), a = new H("mphantom", t), n = new H("mpadded", [a]);
  return n.setAttribute("width", "0px"), n;
} });
W({ type: "raisebox", names: ["\\raisebox"], numArgs: 2, argTypes: ["size", "hbox"], allowedInText: true, handler(r, e) {
  var t = r.parser, a = o0(e[0], "size").value, n = e[1];
  return { type: "raisebox", mode: t.mode, dy: a, body: n };
}, htmlBuilder(r, e) {
  var t = h0(r.body, e), a = A0(r.dy, e);
  return m0({ positionType: "shift", positionData: -a, children: [{ type: "elem", elem: t }] });
}, mathmlBuilder(r, e) {
  var t = new H("mpadded", [f0(r.body, e)]), a = r.dy.number + r.dy.unit;
  return t.setAttribute("voffset", a), t;
} });
var bi = (r, e) => {
  var t = r.parser;
  return { type: "reflectbox", mode: t.mode, body: e[0] };
};
W({ type: "reflectbox", names: ["\\reflectbox"], numArgs: 1, argTypes: ["hbox"], allowedInText: true, handler: bi, htmlBuilder(r, e) {
  return I(["mord", "reflectbox"], [h0(r.body, e)], e);
}, mathmlBuilder(r, e) {
  return f0(r.body, e);
} });
W({ type: "reflectbox", names: ["\\mathreflectbox"], numArgs: 1, argTypes: ["math"], handler: bi });
W({ type: "internal", names: ["\\relax"], numArgs: 0, allowedInText: true, allowedInArgument: true, handler(r) {
  var e = r.parser;
  return { type: "internal", mode: e.mode };
} });
W({ type: "rule", names: ["\\rule"], numArgs: 2, numOptionalArgs: 1, allowedInText: true, allowedInMath: true, argTypes: ["size", "size", "size"], handler(r, e, t) {
  var a = r.parser, n = t[0], i = o0(e[0], "size"), s = o0(e[1], "size");
  return { type: "rule", mode: a.mode, shift: n && o0(n, "size").value, width: i.value, height: s.value };
}, htmlBuilder(r, e) {
  var t = I(["mord", "katex-rule"], [], e), a = A0(r.width, e), n = A0(r.height, e), i = r.shift ? A0(r.shift, e) : 0;
  return t.style.borderRightWidth = G(a), t.style.borderTopWidth = G(n), t.style.bottom = G(i), t.width = a, t.height = n + i, t.depth = -i, t.maxFontSize = n * 1.125 * e.sizeMultiplier, t;
}, mathmlBuilder(r, e) {
  var t = A0(r.width, e), a = A0(r.height, e), n = r.shift ? A0(r.shift, e) : 0, i = e.color && e.getColor() || "black", s = new H("mspace");
  s.setAttribute("mathbackground", i), s.setAttribute("width", G(t)), s.setAttribute("height", G(a));
  var l = new H("mpadded", [s]);
  return n >= 0 ? l.setAttribute("height", G(n)) : (l.setAttribute("height", G(n)), l.setAttribute("depth", G(-n))), l.setAttribute("voffset", G(n)), l;
} });
function yi(r, e, t) {
  for (var a = $0(r, e, false), n = e.sizeMultiplier / t.sizeMultiplier, i = 0; i < a.length; i++) {
    var s = a[i].classes.indexOf("katex-sizing");
    s < 0 ? Array.prototype.push.apply(a[i].classes, e.sizingClasses(t)) : a[i].classes[s + 1] === "reset-size" + e.size && (a[i].classes[s + 1] = "reset-size" + t.size), a[i].height *= n, a[i].depth *= n;
  }
  return Ve(a);
}
var E4 = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"], S2 = (r, e) => {
  var t = e.havingSize(r.size);
  return yi(r.body, t, e);
};
W({ type: "sizing", names: E4, numArgs: 0, allowedInText: true, handler: (r, e) => {
  var t = r.breakOnTokenText, a = r.funcName, n = r.parser, i = n.parseExpression(false, t);
  return { type: "sizing", mode: n.mode, size: E4.indexOf(a) + 1, body: i };
}, htmlBuilder: S2, mathmlBuilder: (r, e) => {
  var t = e.havingSize(r.size), a = oe(r.body, t), n = new H("mstyle", a);
  return n.setAttribute("mathsize", G(t.sizeMultiplier)), n;
} });
W({ type: "smash", names: ["\\smash"], numArgs: 1, numOptionalArgs: 1, allowedInText: true, handler: (r, e, t) => {
  var a = r.parser, n = false, i = false, s = t[0] && o0(t[0], "ordgroup");
  if (s) for (var l, h = 0; h < s.body.length; ++h) {
    var d = s.body[h];
    if (l = Lr(d).text, l === "t") n = true;
    else if (l === "b") i = true;
    else {
      n = false, i = false;
      break;
    }
  }
  else n = true, i = true;
  var f = e[0];
  return { type: "smash", mode: a.mode, body: f, smashHeight: n, smashDepth: i };
}, htmlBuilder: (r, e) => {
  var t = I([], [h0(r.body, e)]);
  if (!r.smashHeight && !r.smashDepth) return t;
  if (r.smashHeight && (t.height = 0), r.smashDepth && (t.depth = 0), r.smashHeight && r.smashDepth) return I(["mord", "katex-smash"], [t], e);
  if (t.children) for (var a = 0; a < t.children.length; a++) r.smashHeight && (t.children[a].height = 0), r.smashDepth && (t.children[a].depth = 0);
  var n = m0({ positionType: "firstBaseline", children: [{ type: "elem", elem: t }] });
  return I(["mord"], [n], e);
}, mathmlBuilder: (r, e) => {
  var t = new H("mpadded", [f0(r.body, e)]);
  return r.smashHeight && t.setAttribute("height", "0px"), r.smashDepth && t.setAttribute("depth", "0px"), t;
} });
W({ type: "sqrt", names: ["\\sqrt"], numArgs: 1, numOptionalArgs: 1, handler(r, e, t) {
  var a = r.parser, n = t[0], i = e[0];
  return { type: "sqrt", mode: a.mode, body: i, index: n };
}, htmlBuilder(r, e) {
  var t = h0(r.body, e.havingCrampedStyle());
  t.height === 0 && (t.height = e.fontMetrics().xHeight), t = Tt(t, e);
  var a = e.fontMetrics(), n = a.defaultRuleThickness, i = n;
  e.style.id < n0.TEXT.id && (i = e.fontMetrics().xHeight);
  var s = n + i / 4, l = t.height + t.depth + s + n, h = n2(l, e), d = h.span, f = h.ruleWidth, y = h.advanceWidth, x = d.height - f;
  x > t.height + t.depth + s && (s = (s + x - t.height - t.depth) / 2);
  var w = d.height - t.height - s - f;
  t.style.paddingLeft = G(y);
  var B = m0({ positionType: "firstBaseline", children: [{ type: "elem", elem: t, wrapperClasses: ["svg-align"] }, { type: "kern", size: -(t.height + w) }, { type: "elem", elem: d }, { type: "kern", size: f }] });
  if (r.index) {
    var C = e.havingStyle(n0.SCRIPTSCRIPT), D = h0(r.index, C, e), q = 0.6 * (B.height - B.depth), E = m0({ positionType: "shift", positionData: -q, children: [{ type: "elem", elem: D }] }), P = I(["katex-root"], [E]);
    return I(["mord", "sqrt"], [P, B], e);
  } else return I(["mord", "sqrt"], [B], e);
}, mathmlBuilder(r, e) {
  var t = r.body, a = r.index;
  return a ? new H("mroot", [f0(t, e), f0(a, e)]) : new H("msqrt", [f0(t, e)]);
} });
var la = { display: n0.DISPLAY, text: n0.TEXT, script: n0.SCRIPT, scriptscript: n0.SCRIPTSCRIPT };
function z2(r) {
  return r in la;
}
W({ type: "styling", names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"], numArgs: 0, allowedInText: true, primitive: true, handler(r, e) {
  var t = r.breakOnTokenText, a = r.funcName, n = r.parser, i = n.parseExpression(true, t), s = a.slice(1, a.length - 5);
  if (!z2(s)) throw new Error("Unknown style: " + s);
  return { type: "styling", mode: n.mode, style: s, body: i };
}, htmlBuilder(r, e) {
  var t = la[r.style], a = e.havingStyle(t);
  return r.resetFont && (a = a.withFont("")), yi(r.body, a, e);
}, mathmlBuilder(r, e) {
  var t = la[r.style], a = e.havingStyle(t);
  r.resetFont && (a = a.withFont(""));
  var n = oe(r.body, a), i = new H("mstyle", n), s = { display: ["0", "true"], text: ["0", "false"], script: ["1", "false"], scriptscript: ["2", "false"] }, l = s[r.style];
  return i.setAttribute("scriptlevel", l[0]), i.setAttribute("displaystyle", l[1]), i;
} });
var A2 = function(e, t) {
  var a = e.base;
  if (a) if (a.type === "op") {
    var n = a.limits && (t.style.size === n0.DISPLAY.size || a.alwaysHandleSupSub);
    return n ? pi : null;
  } else if (a.type === "operatorname") {
    var i = a.alwaysHandleSupSub && (t.style.size === n0.DISPLAY.size || a.limits);
    return i ? gi : null;
  } else {
    if (a.type === "accent") return Ge(a.base) ? Kn : null;
    if (a.type === "horizBrace") {
      var s = !e.sub;
      return s === a.isOver ? di : null;
    } else return null;
  }
  else return null;
};
yt({ type: "supsub", htmlBuilder(r, e) {
  var t = A2(r, e);
  if (t) return t(r, e);
  var a = r.base, n = r.sup, i = r.sub, s = h0(a, e), l, h, d = e.fontMetrics(), f = 0, y = 0, x = a && Ge(a);
  if (n) {
    var w = e.havingStyle(e.style.sup());
    l = h0(n, w, e), x || (f = s.height - w.fontMetrics().supDrop * w.sizeMultiplier / e.sizeMultiplier);
  }
  if (i) {
    var B = e.havingStyle(e.style.sub());
    h = h0(i, B, e), x || (y = s.depth + B.fontMetrics().subDrop * B.sizeMultiplier / e.sizeMultiplier);
  }
  var C;
  e.style === n0.DISPLAY ? C = d.sup1 : e.style.cramped ? C = d.sup3 : C = d.sup2;
  var D = e.sizeMultiplier, q = G(0.5 / d.ptPerEm / D), E = null;
  if (h) {
    var P = r.base && r.base.type === "op" && r.base.name && (r.base.name === "\\oiint" || r.base.name === "\\oiiint");
    if (s instanceof se || P) {
      var V;
      E = G(-((V = s.italic) != null ? V : 0));
    }
  }
  var X;
  if (l && h) {
    f = Math.max(f, C, l.depth + 0.25 * d.xHeight), y = Math.max(y, d.sub2);
    var Y = d.defaultRuleThickness, J = 4 * Y;
    if (f - l.depth - (h.height - y) < J) {
      y = J - (f - l.depth) + h.height;
      var Q = 0.8 * d.xHeight - (f - l.depth);
      Q > 0 && (f += Q, y -= Q);
    }
    var _ = [{ type: "elem", elem: h, shift: y, marginRight: q, marginLeft: E }, { type: "elem", elem: l, shift: -f, marginRight: q }];
    X = m0({ positionType: "individualShift", children: _ });
  } else if (h) {
    y = Math.max(y, d.sub1, h.height - 0.8 * d.xHeight);
    var u0 = [{ type: "elem", elem: h, marginLeft: E, marginRight: q }];
    X = m0({ positionType: "shift", positionData: y, children: u0 });
  } else if (l) f = Math.max(f, C, l.depth + 0.25 * d.xHeight), X = m0({ positionType: "shift", positionData: -f, children: [{ type: "elem", elem: l, marginRight: q }] });
  else throw new Error("supsub must have either sup or sub.");
  var v0 = ra(s, "right") || "mord";
  return I([v0], [s, I(["msupsub"], [X])], e);
}, mathmlBuilder(r, e) {
  var t = false, a, n;
  r.base && r.base.type === "horizBrace" && (n = !!r.sup, n === r.base.isOver && (t = true, a = r.base.isOver)), r.base && (r.base.type === "op" || r.base.type === "operatorname") && (r.base.parentIsSupSub = true);
  var i = [f0(r.base, e)];
  r.sub && i.push(f0(r.sub, e)), r.sup && i.push(f0(r.sup, e));
  var s;
  if (t) s = a ? "mover" : "munder";
  else if (r.sub) if (r.sup) {
    var d = r.base;
    d && d.type === "op" && d.limits && e.style === n0.DISPLAY || d && d.type === "operatorname" && d.alwaysHandleSupSub && (e.style === n0.DISPLAY || d.limits) ? s = "munderover" : s = "msubsup";
  } else {
    var h = r.base;
    h && h.type === "op" && h.limits && (e.style === n0.DISPLAY || h.alwaysHandleSupSub) || h && h.type === "operatorname" && h.alwaysHandleSupSub && (h.limits || e.style === n0.DISPLAY) ? s = "munder" : s = "msub";
  }
  else {
    var l = r.base;
    l && l.type === "op" && l.limits && (e.style === n0.DISPLAY || l.alwaysHandleSupSub) || l && l.type === "operatorname" && l.alwaysHandleSupSub && (l.limits || e.style === n0.DISPLAY) ? s = "mover" : s = "msup";
  }
  return new H(s, i);
} });
yt({ type: "atom", htmlBuilder(r, e) {
  return qa(r.text, r.mode, e, ["m" + r.family]);
}, mathmlBuilder(r, e) {
  var t = new H("mo", [ve(r.text, r.mode)]);
  if (r.family === "bin") {
    var a = Ra(r, e);
    a === "bold-italic" && t.setAttribute("mathvariant", a);
  } else r.family === "punct" ? t.setAttribute("separator", "true") : (r.family === "open" || r.family === "close") && t.setAttribute("stretchy", "false");
  return t;
} });
var xi = { mi: "italic", mn: "normal", mtext: "normal" };
yt({ type: "mathord", htmlBuilder(r, e) {
  return Or(r, e);
}, mathmlBuilder(r, e) {
  var t = new H("mi", [ve(r.text, r.mode, e)]), a = Ra(r, e) || "italic";
  return a !== xi[t.type] && t.setAttribute("mathvariant", a), t;
} });
yt({ type: "textord", htmlBuilder(r, e) {
  return Or(r, e);
}, mathmlBuilder(r, e) {
  var t = ve(r.text, r.mode, e), a = Ra(r, e) || "normal", n;
  return r.mode === "text" ? n = new H("mtext", [t]) : /[0-9]/.test(r.text) ? n = new H("mn", [t]) : r.text === "\\prime" ? n = new H("mo", [t]) : n = new H("mi", [t]), a !== xi[n.type] && n.setAttribute("mathvariant", a), n;
} });
var N4 = /* @__PURE__ */ new Map([["\\nobreak", "nobreak"], ["\\allowbreak", "allowbreak"]]), R4 = /* @__PURE__ */ new Map([[" ", {}], ["\\ ", {}], ["~", { className: "nobreak" }], ["\\space", {}], ["\\nobreakspace", { className: "nobreak" }]]);
yt({ type: "spacing", htmlBuilder(r, e) {
  var t = R4.get(r.text), a = N4.get(r.text);
  if (t) {
    var n = t.className || "";
    if (r.mode === "text") {
      var i = Or(r, e);
      return i.classes.push(n), i;
    } else return I(["mspace", n], [qa(r.text, r.mode, e)], e);
  } else {
    if (a) return I(["mspace", a], [], e);
    throw new O('Unknown type of space "' + r.text + '"');
  }
}, mathmlBuilder(r, e) {
  var t;
  if (R4.has(r.text)) t = new H("mtext", [new q0("\xA0")]);
  else {
    if (N4.has(r.text)) return new H("mspace");
    throw new O('Unknown type of space "' + r.text + '"');
  }
  return t;
} });
var I4 = () => {
  var r = new H("mtd", []);
  return r.setAttribute("width", "50%"), r;
};
yt({ type: "tag", mathmlBuilder(r, e) {
  var t = new H("mtable", [new H("mtr", [I4(), new H("mtd", [at(r.body, e)]), I4(), new H("mtd", [at(r.tag, e)])])]);
  return t.setAttribute("width", "100%"), t;
} });
var F4 = { "\\text": void 0, "\\textrm": "textrm", "\\textsf": "textsf", "\\texttt": "texttt", "\\textnormal": "textrm" }, O4 = { "\\textbf": "textbf", "\\textmd": "textmd" }, M2 = { "\\textit": "textit", "\\textup": "textup" }, $4 = (r, e) => {
  var t = r.font;
  if (t) {
    if (F4[t]) return e.withTextFontFamily(F4[t]);
    if (O4[t]) return e.withTextFontWeight(O4[t]);
    if (t === "\\emph") return e.fontShape === "textit" ? e.withTextFontShape("textup") : e.withTextFontShape("textit");
  } else return e;
  return e.withTextFontShape(M2[t]);
};
W({ type: "text", names: ["\\text", "\\textrm", "\\textsf", "\\texttt", "\\textnormal", "\\textbf", "\\textmd", "\\textit", "\\textup", "\\emph"], numArgs: 1, argTypes: ["text"], allowedInArgument: true, allowedInText: true, handler(r, e) {
  var t = r.parser, a = r.funcName, n = e[0];
  return { type: "text", mode: t.mode, body: D0(n), font: a };
}, htmlBuilder(r, e) {
  var t = $4(r, e), a = $0(r.body, t, true);
  return I(["mord", "text"], a, t);
}, mathmlBuilder(r, e) {
  var t = $4(r, e);
  return at(r.body, t);
} });
W({ type: "underline", names: ["\\underline"], numArgs: 1, allowedInText: true, handler(r, e) {
  var t = r.parser;
  return { type: "underline", mode: t.mode, body: e[0] };
}, htmlBuilder(r, e) {
  var t = h0(r.body, e), a = Mt("underline-line", e), n = e.fontMetrics().defaultRuleThickness, i = m0({ positionType: "top", positionData: t.height, children: [{ type: "kern", size: n }, { type: "elem", elem: a }, { type: "kern", size: 3 * n }, { type: "elem", elem: t }] });
  return I(["mord", "katex-underline"], [i], e);
}, mathmlBuilder(r, e) {
  var t = new H("mo", [new q0("\u203E")]);
  t.setAttribute("stretchy", "true");
  var a = new H("munder", [f0(r.body, e), t]);
  return a.setAttribute("accentunder", "true"), a;
} });
W({ type: "vcenter", names: ["\\vcenter"], numArgs: 1, argTypes: ["original"], allowedInText: false, handler(r, e) {
  var t = r.parser;
  return { type: "vcenter", mode: t.mode, body: e[0] };
}, htmlBuilder(r, e) {
  var t = h0(r.body, e), a = e.fontMetrics().axisHeight, n = 0.5 * (t.height - a - (t.depth + a));
  return m0({ positionType: "shift", positionData: n, children: [{ type: "elem", elem: t }] });
}, mathmlBuilder(r, e) {
  var t = new H("mpadded", [f0(r.body, e)], ["vcenter"]);
  return new H("mrow", [t]);
} });
W({ type: "verb", names: ["\\verb"], numArgs: 0, allowedInText: true, handler(r, e, t) {
  throw new O("\\verb ended by end of line instead of matching delimiter");
}, htmlBuilder(r, e) {
  for (var t = H4(r), a = [], n = e.havingStyle(e.style.text()), i = 0; i < t.length; i++) {
    var s = t[i];
    s === "~" && (s = "\\textasciitilde"), a.push(j0(s, "Typewriter-Regular", r.mode, n, ["mord", "texttt"]));
  }
  return I(["mord", "text"].concat(n.sizingClasses(e)), $n(a), n);
}, mathmlBuilder(r, e) {
  var t = new q0(H4(r)), a = new H("mtext", [t]);
  return a.setAttribute("mathvariant", "monospace"), a;
} });
var H4 = (r) => r.body.replace(/ /g, r.star ? "\u2423" : "\xA0"), Qe = Gn, wi = `[ \r
	]`, T2 = "\\\\[a-zA-Z@]+", B2 = "\\\\[^\uD800-\uDFFF]", C2 = "(" + T2 + ")" + wi + "*", D2 = `\\\\(
|[ \r	]+
?)[ \r	]*`, ua = "[\u0300-\u036F]", q2 = new RegExp(ua + "+$"), E2 = "(" + wi + "+)|" + (D2 + "|") + "([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]" + (ua + "*") + "|[\uD800-\uDBFF][\uDC00-\uDFFF]" + (ua + "*") + "|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" + ("|" + C2) + ("|" + B2 + ")");
let L4 = class {
  constructor(e, t) {
    this.input = void 0, this.settings = void 0, this.tokenRegex = void 0, this.catcodes = void 0, this.input = e, this.settings = t, this.tokenRegex = new RegExp(E2, "g"), this.catcodes = { "%": 14, "~": 13 };
  }
  setCatcode(e, t) {
    this.catcodes[e] = t;
  }
  lex() {
    var e = this.input, t = this.tokenRegex.lastIndex;
    if (t === e.length) return new be("EOF", new ce(this, t, t));
    var a = this.tokenRegex.exec(e);
    if (a === null || a.index !== t) throw new O("Unexpected character: '" + e[t] + "'", new be(e[t], new ce(this, t, t + 1)));
    var n = a[6] || a[3] || (a[2] ? "\\ " : " ");
    if (this.catcodes[n] === 14) {
      var i = e.indexOf(`
`, this.tokenRegex.lastIndex);
      return i === -1 ? (this.tokenRegex.lastIndex = e.length, this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")) : this.tokenRegex.lastIndex = i + 1, this.lex();
    }
    return new be(n, new ce(this, t, this.tokenRegex.lastIndex));
  }
}, N2 = class {
  constructor(e, t) {
    e === void 0 && (e = {}), t === void 0 && (t = {}), this.current = void 0, this.builtins = void 0, this.undefStack = void 0, this.current = t, this.builtins = e, this.undefStack = [];
  }
  beginGroup() {
    this.undefStack.push({});
  }
  endGroup() {
    if (this.undefStack.length === 0) throw new O("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
    var e = this.undefStack.pop();
    for (var t of Object.keys(e)) e[t] === void 0 ? delete this.current[t] : this.current[t] = e[t];
  }
  endGroups() {
    for (; this.undefStack.length > 0; ) this.endGroup();
  }
  has(e) {
    return Object.prototype.hasOwnProperty.call(this.current, e) || Object.prototype.hasOwnProperty.call(this.builtins, e);
  }
  get(e) {
    return Object.prototype.hasOwnProperty.call(this.current, e) ? this.current[e] : Object.prototype.hasOwnProperty.call(this.builtins, e) ? this.builtins[e] : void 0;
  }
  set(e, t, a) {
    if (a === void 0 && (a = false), a) {
      for (var n = 0; n < this.undefStack.length; n++) delete this.undefStack[n][e];
      this.undefStack.length > 0 && (this.undefStack[this.undefStack.length - 1][e] = t);
    } else {
      var i = this.undefStack[this.undefStack.length - 1];
      i && !Object.prototype.hasOwnProperty.call(i, e) && (i[e] = Object.prototype.hasOwnProperty.call(this.current, e) ? this.current[e] : void 0);
    }
    t == null ? delete this.current[e] : this.current[e] = t;
  }
};
var R2 = ui;
g("\\noexpand", function(r) {
  var e = r.popToken();
  return r.isExpandable(e.text) && (e.noexpand = true, e.treatAsRelax = true), { tokens: [e], numArgs: 0 };
});
g("\\expandafter", function(r) {
  var e = r.popToken();
  return r.expandOnce(true), { tokens: [e], numArgs: 0 };
});
g("\\@firstoftwo", function(r) {
  var e = r.consumeArgs(2);
  return { tokens: e[0], numArgs: 0 };
});
g("\\@secondoftwo", function(r) {
  var e = r.consumeArgs(2);
  return { tokens: e[1], numArgs: 0 };
});
g("\\@ifnextchar", function(r) {
  var e = r.consumeArgs(3);
  r.consumeSpaces();
  var t = r.future();
  return e[0].length === 1 && e[0][0].text === t.text ? { tokens: e[1], numArgs: 0 } : { tokens: e[2], numArgs: 0 };
});
g("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
g("\\TextOrMath", function(r) {
  var e = r.consumeArgs(2);
  return r.mode === "text" ? { tokens: e[0], numArgs: 0 } : { tokens: e[1], numArgs: 0 };
});
var P4 = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15 };
g("\\char", function(r) {
  var e = r.popToken(), t, a = 0;
  if (e.text === "'") t = 8, e = r.popToken();
  else if (e.text === '"') t = 16, e = r.popToken();
  else if (e.text === "`") if (e = r.popToken(), e.text[0] === "\\") a = e.text.charCodeAt(1);
  else {
    if (e.text === "EOF") throw new O("\\char` missing argument");
    a = e.text.charCodeAt(0);
  }
  else t = 10;
  if (t) {
    if (a = P4[e.text], a == null || a >= t) throw new O("Invalid base-" + t + " digit " + e.text);
    for (var n; (n = P4[r.future().text]) != null && n < t; ) a *= t, a += n, r.popToken();
  }
  return "\\@char{" + a + "}";
});
var Ha = (r, e, t, a) => {
  var n = r.consumeArg().tokens;
  if (n.length !== 1) throw new O("\\newcommand's first argument must be a macro name");
  var i = n[0].text, s = r.isDefined(i);
  if (s && !e) throw new O("\\newcommand{" + i + "} attempting to redefine " + (i + "; use \\renewcommand"));
  if (!s && !t) throw new O("\\renewcommand{" + i + "} when command " + i + " does not yet exist; use \\newcommand");
  var l = 0;
  if (n = r.consumeArg().tokens, n.length === 1 && n[0].text === "[") {
    for (var h = "", d = r.expandNextToken(); d.text !== "]" && d.text !== "EOF"; ) h += d.text, d = r.expandNextToken();
    if (!h.match(/^\s*[0-9]+\s*$/)) throw new O("Invalid number of arguments: " + h);
    l = parseInt(h), n = r.consumeArg().tokens;
  }
  return s && a || r.macros.set(i, { tokens: n, numArgs: l }), "";
};
g("\\newcommand", (r) => Ha(r, false, true, false));
g("\\renewcommand", (r) => Ha(r, true, false, false));
g("\\providecommand", (r) => Ha(r, true, true, true));
g("\\message", (r) => {
  var e = r.consumeArgs(1)[0];
  return console.log(e.reverse().map((t) => t.text).join("")), "";
});
g("\\errmessage", (r) => {
  var e = r.consumeArgs(1)[0];
  return console.error(e.reverse().map((t) => t.text).join("")), "";
});
g("\\show", (r) => {
  var e = r.popToken(), t = e.text;
  return console.log(e, r.macros.get(t), Qe[t], g0.math[t], g0.text[t]), "";
});
g("\\bgroup", "{");
g("\\egroup", "}");
g("~", "\\nobreakspace");
g("\\lq", "`");
g("\\rq", "'");
g("\\aa", "\\r a");
g("\\AA", "\\r A");
g("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`\xA9}");
g("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
g("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`\xAE}");
g("\u212C", "\\mathscr{B}");
g("\u2130", "\\mathscr{E}");
g("\u2131", "\\mathscr{F}");
g("\u210B", "\\mathscr{H}");
g("\u2110", "\\mathscr{I}");
g("\u2112", "\\mathscr{L}");
g("\u2133", "\\mathscr{M}");
g("\u211B", "\\mathscr{R}");
g("\u212D", "\\mathfrak{C}");
g("\u210C", "\\mathfrak{H}");
g("\u2128", "\\mathfrak{Z}");
g("\\Bbbk", "\\Bbb{k}");
g("\\llap", "\\mathllap{\\textrm{#1}}");
g("\\rlap", "\\mathrlap{\\textrm{#1}}");
g("\\clap", "\\mathclap{\\textrm{#1}}");
g("\\mathstrut", "\\vphantom{(}");
g("\\underbar", "\\underline{\\text{#1}}");
g("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}\\nobreak}{\\char"338}');
g("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`\u2260}}");
g("\\ne", "\\neq");
g("\u2260", "\\neq");
g("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`\u2209}}");
g("\u2209", "\\notin");
g("\u2258", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`\u2258}}");
g("\u2259", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`\u2258}}");
g("\u225A", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`\u225A}}");
g("\u225B", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`\u225B}}");
g("\u225D", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`\u225D}}");
g("\u225E", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`\u225E}}");
g("\u225F", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`\u225F}}");
g("\u27C2", "\\perp");
g("\u203C", "\\mathclose{!\\mkern-0.8mu!}");
g("\u220C", "\\notni");
g("\u231C", "\\ulcorner");
g("\u231D", "\\urcorner");
g("\u231E", "\\llcorner");
g("\u231F", "\\lrcorner");
g("\xA9", "\\copyright");
g("\xAE", "\\textregistered");
g("\\ulcorner", '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}');
g("\\urcorner", '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}');
g("\\llcorner", '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}');
g("\\lrcorner", '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}');
g("\\vdots", "{\\varvdots\\rule{0pt}{15pt}}");
g("\u22EE", "\\vdots");
g("\\varGamma", "\\mathit{\\Gamma}");
g("\\varDelta", "\\mathit{\\Delta}");
g("\\varTheta", "\\mathit{\\Theta}");
g("\\varLambda", "\\mathit{\\Lambda}");
g("\\varXi", "\\mathit{\\Xi}");
g("\\varPi", "\\mathit{\\Pi}");
g("\\varSigma", "\\mathit{\\Sigma}");
g("\\varUpsilon", "\\mathit{\\Upsilon}");
g("\\varPhi", "\\mathit{\\Phi}");
g("\\varPsi", "\\mathit{\\Psi}");
g("\\varOmega", "\\mathit{\\Omega}");
g("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
g("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax");
g("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
g("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
g("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
g("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
g("\\dddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ...}}{#1}}");
g("\\ddddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ....}}{#1}}");
var G4 = { ",": "\\dotsc", "\\not": "\\dotsb", "+": "\\dotsb", "=": "\\dotsb", "<": "\\dotsb", ">": "\\dotsb", "-": "\\dotsb", "*": "\\dotsb", ":": "\\dotsb", "\\DOTSB": "\\dotsb", "\\coprod": "\\dotsb", "\\bigvee": "\\dotsb", "\\bigwedge": "\\dotsb", "\\biguplus": "\\dotsb", "\\bigcap": "\\dotsb", "\\bigcup": "\\dotsb", "\\prod": "\\dotsb", "\\sum": "\\dotsb", "\\bigotimes": "\\dotsb", "\\bigoplus": "\\dotsb", "\\bigodot": "\\dotsb", "\\bigsqcup": "\\dotsb", "\\And": "\\dotsb", "\\longrightarrow": "\\dotsb", "\\Longrightarrow": "\\dotsb", "\\longleftarrow": "\\dotsb", "\\Longleftarrow": "\\dotsb", "\\longleftrightarrow": "\\dotsb", "\\Longleftrightarrow": "\\dotsb", "\\mapsto": "\\dotsb", "\\longmapsto": "\\dotsb", "\\hookrightarrow": "\\dotsb", "\\doteq": "\\dotsb", "\\mathbin": "\\dotsb", "\\mathrel": "\\dotsb", "\\relbar": "\\dotsb", "\\Relbar": "\\dotsb", "\\xrightarrow": "\\dotsb", "\\xleftarrow": "\\dotsb", "\\DOTSI": "\\dotsi", "\\int": "\\dotsi", "\\oint": "\\dotsi", "\\iint": "\\dotsi", "\\iiint": "\\dotsi", "\\iiiint": "\\dotsi", "\\idotsint": "\\dotsi", "\\DOTSX": "\\dotsx" }, I2 = /* @__PURE__ */ new Set(["bin", "rel"]);
g("\\dots", function(r) {
  var e = "\\dotso", t = r.expandAfterFuture().text;
  return t in G4 ? e = G4[t] : (t.slice(0, 4) === "\\not" || t in g0.math && I2.has(g0.math[t].group)) && (e = "\\dotsb"), e;
});
var La = { ")": true, "]": true, "\\rbrack": true, "\\}": true, "\\rbrace": true, "\\rangle": true, "\\rceil": true, "\\rfloor": true, "\\rgroup": true, "\\rmoustache": true, "\\right": true, "\\bigr": true, "\\biggr": true, "\\Bigr": true, "\\Biggr": true, $: true, ";": true, ".": true, ",": true };
g("\\dotso", function(r) {
  var e = r.future().text;
  return e in La ? "\\ldots\\," : "\\ldots";
});
g("\\dotsc", function(r) {
  var e = r.future().text;
  return e in La && e !== "," ? "\\ldots\\," : "\\ldots";
});
g("\\cdots", function(r) {
  var e = r.future().text;
  return e in La ? "\\@cdots\\," : "\\@cdots";
});
g("\\dotsb", "\\cdots");
g("\\dotsm", "\\cdots");
g("\\dotsi", "\\!\\cdots");
g("\\dotsx", "\\ldots\\,");
g("\\DOTSI", "\\relax");
g("\\DOTSB", "\\relax");
g("\\DOTSX", "\\relax");
g("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
g("\\,", "\\tmspace+{3mu}{.1667em}");
g("\\thinspace", "\\,");
g("\\>", "\\mskip{4mu}");
g("\\:", "\\tmspace+{4mu}{.2222em}");
g("\\medspace", "\\:");
g("\\;", "\\tmspace+{5mu}{.2777em}");
g("\\thickspace", "\\;");
g("\\!", "\\tmspace-{3mu}{.1667em}");
g("\\negthinspace", "\\!");
g("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
g("\\negthickspace", "\\tmspace-{5mu}{.277em}");
g("\\enspace", "\\kern.5em ");
g("\\enskip", "\\hskip.5em\\relax");
g("\\quad", "\\hskip1em\\relax");
g("\\qquad", "\\hskip2em\\relax");
g("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
g("\\tag@paren", "\\tag@literal{({#1})}");
g("\\tag@literal", (r) => {
  if (r.macros.get("\\df@tag")) throw new O("Multiple \\tag");
  return "\\gdef\\df@tag{\\text{#1}}";
});
g("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");
g("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
g("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
g("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");
g("\\newline", "\\\\\\relax");
g("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
var ki = G(we["Main-Regular"][84][1] - 0.7 * we["Main-Regular"][65][1]);
g("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + ki + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}");
g("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + ki + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}");
g("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
g("\\@hspace", "\\hskip #1\\relax");
g("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
g("\\ordinarycolon", ":");
g("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
g("\\dblcolon", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}');
g("\\coloneqq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}');
g("\\Coloneqq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}');
g("\\coloneq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}');
g("\\Coloneq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}');
g("\\eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}');
g("\\Eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}');
g("\\eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}');
g("\\Eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}');
g("\\colonapprox", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}');
g("\\Colonapprox", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}');
g("\\colonsim", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}');
g("\\Colonsim", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}');
g("\u2237", "\\dblcolon");
g("\u2239", "\\eqcolon");
g("\u2254", "\\coloneqq");
g("\u2255", "\\eqqcolon");
g("\u2A74", "\\Coloneqq");
g("\\ratio", "\\vcentcolon");
g("\\coloncolon", "\\dblcolon");
g("\\colonequals", "\\coloneqq");
g("\\coloncolonequals", "\\Coloneqq");
g("\\equalscolon", "\\eqqcolon");
g("\\equalscoloncolon", "\\Eqqcolon");
g("\\colonminus", "\\coloneq");
g("\\coloncolonminus", "\\Coloneq");
g("\\minuscolon", "\\eqcolon");
g("\\minuscoloncolon", "\\Eqcolon");
g("\\coloncolonapprox", "\\Colonapprox");
g("\\coloncolonsim", "\\Colonsim");
g("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
g("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
g("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
g("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");
g("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`\u220C}}");
g("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
g("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
g("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
g("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
g("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
g("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
g("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
g("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
g("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{\u2269}");
g("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{\u2268}");
g("\\ngeqq", "\\html@mathml{\\@ngeqq}{\u2271}");
g("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{\u2271}");
g("\\nleqq", "\\html@mathml{\\@nleqq}{\u2270}");
g("\\nleqslant", "\\html@mathml{\\@nleqslant}{\u2270}");
g("\\nshortmid", "\\html@mathml{\\@nshortmid}{\u2224}");
g("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{\u2226}");
g("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{\u2288}");
g("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{\u2289}");
g("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{\u228A}");
g("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{\u2ACB}");
g("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{\u228B}");
g("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{\u2ACC}");
g("\\imath", "\\html@mathml{\\@imath}{\u0131}");
g("\\jmath", "\\html@mathml{\\@jmath}{\u0237}");
g("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`\u27E6}}");
g("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`\u27E7}}");
g("\u27E6", "\\llbracket");
g("\u27E7", "\\rrbracket");
g("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`\u2983}}");
g("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`\u2984}}");
g("\u21A4", "\\mapsfrom");
g("\\mapsfrom", "\\html@mathml{\\mathrel{\\mathreflectbox{\\mapsto}}}{\\mathrel{\\char`\u21A4}}");
g("\u2983", "\\lBrace");
g("\u2984", "\\rBrace");
g("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`\u29B5}}");
g("\u29B5", "\\minuso");
g("\\darr", "\\downarrow");
g("\\dArr", "\\Downarrow");
g("\\Darr", "\\Downarrow");
g("\\lang", "\\langle");
g("\\rang", "\\rangle");
g("\\uarr", "\\uparrow");
g("\\uArr", "\\Uparrow");
g("\\Uarr", "\\Uparrow");
g("\\N", "\\mathbb{N}");
g("\\R", "\\mathbb{R}");
g("\\Z", "\\mathbb{Z}");
g("\\alef", "\\aleph");
g("\\alefsym", "\\aleph");
g("\\Alpha", "\\mathrm{A}");
g("\\Beta", "\\mathrm{B}");
g("\\bull", "\\bullet");
g("\\Chi", "\\mathrm{X}");
g("\\clubs", "\\clubsuit");
g("\\cnums", "\\mathbb{C}");
g("\\Complex", "\\mathbb{C}");
g("\\Dagger", "\\ddagger");
g("\\diamonds", "\\diamondsuit");
g("\\empty", "\\emptyset");
g("\\Epsilon", "\\mathrm{E}");
g("\\Eta", "\\mathrm{H}");
g("\\exist", "\\exists");
g("\\harr", "\\leftrightarrow");
g("\\hArr", "\\Leftrightarrow");
g("\\Harr", "\\Leftrightarrow");
g("\\hearts", "\\heartsuit");
g("\\image", "\\Im");
g("\\infin", "\\infty");
g("\\Iota", "\\mathrm{I}");
g("\\isin", "\\in");
g("\\Kappa", "\\mathrm{K}");
g("\\larr", "\\leftarrow");
g("\\lArr", "\\Leftarrow");
g("\\Larr", "\\Leftarrow");
g("\\lrarr", "\\leftrightarrow");
g("\\lrArr", "\\Leftrightarrow");
g("\\Lrarr", "\\Leftrightarrow");
g("\\Mu", "\\mathrm{M}");
g("\\natnums", "\\mathbb{N}");
g("\\Nu", "\\mathrm{N}");
g("\\Omicron", "\\mathrm{O}");
g("\\plusmn", "\\pm");
g("\\rarr", "\\rightarrow");
g("\\rArr", "\\Rightarrow");
g("\\Rarr", "\\Rightarrow");
g("\\real", "\\Re");
g("\\reals", "\\mathbb{R}");
g("\\Reals", "\\mathbb{R}");
g("\\Rho", "\\mathrm{P}");
g("\\sdot", "\\cdot");
g("\\sect", "\\S");
g("\\spades", "\\spadesuit");
g("\\sub", "\\subset");
g("\\sube", "\\subseteq");
g("\\supe", "\\supseteq");
g("\\Tau", "\\mathrm{T}");
g("\\thetasym", "\\vartheta");
g("\\weierp", "\\wp");
g("\\Zeta", "\\mathrm{Z}");
g("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
g("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
g("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
g("\\bra", "\\mathinner{\\langle{#1}|}");
g("\\ket", "\\mathinner{|{#1}\\rangle}");
g("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
g("\\Bra", "\\left\\langle#1\\right|");
g("\\Ket", "\\left|#1\\right\\rangle");
var Si = (r) => (e) => {
  var t = e.consumeArg().tokens, a = e.consumeArg().tokens, n = e.consumeArg().tokens, i = e.consumeArg().tokens, s = e.macros.get("|"), l = e.macros.get("\\|");
  e.macros.beginGroup();
  var h = (y) => (x) => {
    r && (x.macros.set("|", s), n.length && x.macros.set("\\|", l));
    var w = y;
    if (!y && n.length) {
      var B = x.future();
      B.text === "|" && (x.popToken(), w = true);
    }
    return { tokens: w ? n : a, numArgs: 0 };
  };
  e.macros.set("|", h(false)), n.length && e.macros.set("\\|", h(true));
  var d = e.consumeArg().tokens, f = e.expandTokens([...i, ...d, ...t]);
  return e.macros.endGroup(), { tokens: f.reverse(), numArgs: 0 };
};
g("\\bra@ket", Si(false));
g("\\bra@set", Si(true));
g("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");
g("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");
g("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
g("\\angln", "{\\angl n}");
g("\\blue", "\\textcolor{##6495ed}{#1}");
g("\\orange", "\\textcolor{##ffa500}{#1}");
g("\\pink", "\\textcolor{##ff00af}{#1}");
g("\\red", "\\textcolor{##df0030}{#1}");
g("\\green", "\\textcolor{##28ae7b}{#1}");
g("\\gray", "\\textcolor{gray}{#1}");
g("\\purple", "\\textcolor{##9d38bd}{#1}");
g("\\blueA", "\\textcolor{##ccfaff}{#1}");
g("\\blueB", "\\textcolor{##80f6ff}{#1}");
g("\\blueC", "\\textcolor{##63d9ea}{#1}");
g("\\blueD", "\\textcolor{##11accd}{#1}");
g("\\blueE", "\\textcolor{##0c7f99}{#1}");
g("\\tealA", "\\textcolor{##94fff5}{#1}");
g("\\tealB", "\\textcolor{##26edd5}{#1}");
g("\\tealC", "\\textcolor{##01d1c1}{#1}");
g("\\tealD", "\\textcolor{##01a995}{#1}");
g("\\tealE", "\\textcolor{##208170}{#1}");
g("\\greenA", "\\textcolor{##b6ffb0}{#1}");
g("\\greenB", "\\textcolor{##8af281}{#1}");
g("\\greenC", "\\textcolor{##74cf70}{#1}");
g("\\greenD", "\\textcolor{##1fab54}{#1}");
g("\\greenE", "\\textcolor{##0d923f}{#1}");
g("\\goldA", "\\textcolor{##ffd0a9}{#1}");
g("\\goldB", "\\textcolor{##ffbb71}{#1}");
g("\\goldC", "\\textcolor{##ff9c39}{#1}");
g("\\goldD", "\\textcolor{##e07d10}{#1}");
g("\\goldE", "\\textcolor{##a75a05}{#1}");
g("\\redA", "\\textcolor{##fca9a9}{#1}");
g("\\redB", "\\textcolor{##ff8482}{#1}");
g("\\redC", "\\textcolor{##f9685d}{#1}");
g("\\redD", "\\textcolor{##e84d39}{#1}");
g("\\redE", "\\textcolor{##bc2612}{#1}");
g("\\maroonA", "\\textcolor{##ffbde0}{#1}");
g("\\maroonB", "\\textcolor{##ff92c6}{#1}");
g("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
g("\\maroonD", "\\textcolor{##ca337c}{#1}");
g("\\maroonE", "\\textcolor{##9e034e}{#1}");
g("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
g("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
g("\\purpleC", "\\textcolor{##aa87ff}{#1}");
g("\\purpleD", "\\textcolor{##7854ab}{#1}");
g("\\purpleE", "\\textcolor{##543b78}{#1}");
g("\\mintA", "\\textcolor{##f5f9e8}{#1}");
g("\\mintB", "\\textcolor{##edf2df}{#1}");
g("\\mintC", "\\textcolor{##e0e5cc}{#1}");
g("\\grayA", "\\textcolor{##f6f7f7}{#1}");
g("\\grayB", "\\textcolor{##f0f1f2}{#1}");
g("\\grayC", "\\textcolor{##e3e5e6}{#1}");
g("\\grayD", "\\textcolor{##d6d8da}{#1}");
g("\\grayE", "\\textcolor{##babec2}{#1}");
g("\\grayF", "\\textcolor{##888d93}{#1}");
g("\\grayG", "\\textcolor{##626569}{#1}");
g("\\grayH", "\\textcolor{##3b3e40}{#1}");
g("\\grayI", "\\textcolor{##21242c}{#1}");
g("\\kaBlue", "\\textcolor{##314453}{#1}");
g("\\kaGreen", "\\textcolor{##71B307}{#1}");
var zi = { "^": true, _: true, "\\limits": true, "\\nolimits": true };
let F2 = class {
  constructor(e, t, a) {
    this.settings = void 0, this.expansionCount = void 0, this.lexer = void 0, this.macros = void 0, this.stack = void 0, this.mode = void 0, this.settings = t, this.expansionCount = 0, this.feed(e), this.macros = new N2(R2, t.macros), this.mode = a, this.stack = [];
  }
  feed(e) {
    this.lexer = new L4(e, this.settings);
  }
  switchMode(e) {
    this.mode = e;
  }
  beginGroup() {
    this.macros.beginGroup();
  }
  endGroup() {
    this.macros.endGroup();
  }
  endGroups() {
    this.macros.endGroups();
  }
  future() {
    return this.stack.length === 0 && this.pushToken(this.lexer.lex()), this.stack[this.stack.length - 1];
  }
  popToken() {
    return this.future(), this.stack.pop();
  }
  pushToken(e) {
    this.stack.push(e);
  }
  pushTokens(e) {
    this.stack.push(...e);
  }
  scanArgument(e) {
    var t, a, n;
    if (e) {
      if (this.consumeSpaces(), this.future().text !== "[") return null;
      t = this.popToken();
      var i = this.consumeArg(["]"]);
      n = i.tokens, a = i.end;
    } else {
      var s = this.consumeArg();
      n = s.tokens, t = s.start, a = s.end;
    }
    return this.pushToken(new be("EOF", a.loc)), this.pushTokens(n), new be("", ce.range(t, a));
  }
  consumeSpaces() {
    for (; ; ) {
      var e = this.future();
      if (e.text === " ") this.stack.pop();
      else break;
    }
  }
  consumeArg(e) {
    var t = [], a = e && e.length > 0;
    a || this.consumeSpaces();
    var n = this.future(), i, s = 0, l = 0;
    do {
      if (i = this.popToken(), t.push(i), i.text === "{") ++s;
      else if (i.text === "}") {
        if (--s, s === -1) throw new O("Extra }", i);
      } else if (i.text === "EOF") throw new O("Unexpected end of input in a macro argument, expected '" + (e && a ? e[l] : "}") + "'", i);
      if (e && a) if ((s === 0 || s === 1 && e[l] === "{") && i.text === e[l]) {
        if (++l, l === e.length) {
          t.splice(-l, l);
          break;
        }
      } else l = 0;
    } while (s !== 0 || a);
    return n.text === "{" && t[t.length - 1].text === "}" && (t.pop(), t.shift()), t.reverse(), { tokens: t, start: n, end: i };
  }
  consumeArgs(e, t) {
    if (t) {
      if (t.length !== e + 1) throw new O("The length of delimiters doesn't match the number of args!");
      for (var a = t[0], n = 0; n < a.length; n++) {
        var i = this.popToken();
        if (a[n] !== i.text) throw new O("Use of the macro doesn't match its definition", i);
      }
    }
    for (var s = [], l = 0; l < e; l++) s.push(this.consumeArg(t && t[l + 1]).tokens);
    return s;
  }
  countExpansion(e) {
    if (this.expansionCount += e, this.expansionCount > this.settings.maxExpand) throw new O("Too many expansions: infinite loop or need to increase maxExpand setting");
  }
  expandOnce(e) {
    var t = this.popToken(), a = t.text, n = t.noexpand ? null : this._getExpansion(a);
    if (n == null || e && n.unexpandable) {
      if (e && n == null && a[0] === "\\" && !this.isDefined(a)) throw new O("Undefined control sequence: " + a);
      return this.pushToken(t), false;
    }
    this.countExpansion(1);
    var i = n.tokens, s = this.consumeArgs(n.numArgs, n.delimiters);
    if (n.numArgs) {
      i = i.slice();
      for (var l = i.length - 1; l >= 0; --l) {
        var h = i[l];
        if (h.text === "#") {
          if (l === 0) throw new O("Incomplete placeholder at end of macro body", h);
          if (h = i[--l], h.text === "#") i.splice(l + 1, 1);
          else if (/^[1-9]$/.test(h.text)) i.splice(l, 2, ...s[+h.text - 1]);
          else throw new O("Not a valid argument number", h);
        }
      }
    }
    return this.pushTokens(i), i.length;
  }
  expandAfterFuture() {
    return this.expandOnce(), this.future();
  }
  expandNextToken() {
    for (; ; ) if (this.expandOnce() === false) {
      var e = this.stack.pop();
      return e.treatAsRelax && (e.text = "\\relax"), e;
    }
  }
  expandMacro(e) {
    return this.macros.has(e) ? this.expandTokens([new be(e)]) : void 0;
  }
  expandTokens(e) {
    var t = [], a = this.stack.length;
    for (this.pushTokens(e); this.stack.length > a; ) if (this.expandOnce(true) === false) {
      var n = this.stack.pop();
      n.treatAsRelax && (n.noexpand = false, n.treatAsRelax = false), t.push(n);
    }
    return this.countExpansion(t.length), t;
  }
  expandMacroAsText(e) {
    var t = this.expandMacro(e);
    return t && t.map((a) => a.text).join("");
  }
  _getExpansion(e) {
    var t = this.macros.get(e);
    if (t == null) return t;
    if (e.length === 1) {
      var a = this.lexer.catcodes[e];
      if (a != null && a !== 13) return;
    }
    var n = typeof t == "function" ? t(this) : t;
    if (typeof n == "string") {
      var i = 0;
      if (n.includes("#")) for (var s = n.replace(/##/g, ""); s.includes("#" + (i + 1)); ) ++i;
      for (var l = new L4(n, this.settings), h = [], d = l.lex(); d.text !== "EOF"; ) h.push(d), d = l.lex();
      h.reverse();
      var f = { tokens: h, numArgs: i };
      return f;
    }
    return n;
  }
  isDefined(e) {
    return this.macros.has(e) || Object.prototype.hasOwnProperty.call(Qe, e) || Object.prototype.hasOwnProperty.call(g0.math, e) || Object.prototype.hasOwnProperty.call(g0.text, e) || Object.prototype.hasOwnProperty.call(zi, e);
  }
  isExpandable(e) {
    var t = this.macros.get(e);
    return t != null ? typeof t == "string" || typeof t == "function" || !t.unexpandable : Object.prototype.hasOwnProperty.call(Qe, e) && !Qe[e].primitive;
  }
};
var U4 = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/, dr = Object.freeze({ "\u208A": "+", "\u208B": "-", "\u208C": "=", "\u208D": "(", "\u208E": ")", "\u2080": "0", "\u2081": "1", "\u2082": "2", "\u2083": "3", "\u2084": "4", "\u2085": "5", "\u2086": "6", "\u2087": "7", "\u2088": "8", "\u2089": "9", "\u2090": "a", "\u2091": "e", "\u2095": "h", "\u1D62": "i", "\u2C7C": "j", "\u2096": "k", "\u2097": "l", "\u2098": "m", "\u2099": "n", "\u2092": "o", "\u209A": "p", "\u1D63": "r", "\u209B": "s", "\u209C": "t", "\u1D64": "u", "\u1D65": "v", "\u2093": "x", "\u1D66": "\u03B2", "\u1D67": "\u03B3", "\u1D68": "\u03C1", "\u1D69": "\u03D5", "\u1D6A": "\u03C7", "\u207A": "+", "\u207B": "-", "\u207C": "=", "\u207D": "(", "\u207E": ")", "\u2070": "0", "\xB9": "1", "\xB2": "2", "\xB3": "3", "\u2074": "4", "\u2075": "5", "\u2076": "6", "\u2077": "7", "\u2078": "8", "\u2079": "9", "\u1D2C": "A", "\u1D2E": "B", "\u1D30": "D", "\u1D31": "E", "\u1D33": "G", "\u1D34": "H", "\u1D35": "I", "\u1D36": "J", "\u1D37": "K", "\u1D38": "L", "\u1D39": "M", "\u1D3A": "N", "\u1D3C": "O", "\u1D3E": "P", "\u1D3F": "R", "\u1D40": "T", "\u1D41": "U", "\u2C7D": "V", "\u1D42": "W", "\u1D43": "a", "\u1D47": "b", "\u1D9C": "c", "\u1D48": "d", "\u1D49": "e", "\u1DA0": "f", "\u1D4D": "g", \u02B0: "h", "\u2071": "i", \u02B2: "j", "\u1D4F": "k", \u02E1: "l", "\u1D50": "m", \u207F: "n", "\u1D52": "o", "\u1D56": "p", \u02B3: "r", \u02E2: "s", "\u1D57": "t", "\u1D58": "u", "\u1D5B": "v", \u02B7: "w", \u02E3: "x", \u02B8: "y", "\u1DBB": "z", "\u1D5D": "\u03B2", "\u1D5E": "\u03B3", "\u1D5F": "\u03B4", "\u1D60": "\u03D5", "\u1D61": "\u03C7", "\u1DBF": "\u03B8" }), B1 = { "\u0301": { text: "\\'", math: "\\acute" }, "\u0300": { text: "\\`", math: "\\grave" }, "\u0308": { text: '\\"', math: "\\ddot" }, "\u0303": { text: "\\~", math: "\\tilde" }, "\u0304": { text: "\\=", math: "\\bar" }, "\u0306": { text: "\\u", math: "\\breve" }, "\u030C": { text: "\\v", math: "\\check" }, "\u0302": { text: "\\^", math: "\\hat" }, "\u0307": { text: "\\.", math: "\\dot" }, "\u030A": { text: "\\r", math: "\\mathring" }, "\u030B": { text: "\\H" }, "\u0327": { text: "\\c" } }, V4 = { \u00E1: "a\u0301", \u00E0: "a\u0300", \u00E4: "a\u0308", \u01DF: "a\u0308\u0304", \u00E3: "a\u0303", \u0101: "a\u0304", \u0103: "a\u0306", \u1EAF: "a\u0306\u0301", \u1EB1: "a\u0306\u0300", \u1EB5: "a\u0306\u0303", \u01CE: "a\u030C", \u00E2: "a\u0302", \u1EA5: "a\u0302\u0301", \u1EA7: "a\u0302\u0300", \u1EAB: "a\u0302\u0303", \u0227: "a\u0307", \u01E1: "a\u0307\u0304", \u00E5: "a\u030A", \u01FB: "a\u030A\u0301", \u1E03: "b\u0307", \u0107: "c\u0301", \u1E09: "c\u0327\u0301", \u010D: "c\u030C", \u0109: "c\u0302", \u010B: "c\u0307", \u00E7: "c\u0327", \u010F: "d\u030C", \u1E0B: "d\u0307", \u1E11: "d\u0327", \u00E9: "e\u0301", \u00E8: "e\u0300", \u00EB: "e\u0308", \u1EBD: "e\u0303", \u0113: "e\u0304", \u1E17: "e\u0304\u0301", \u1E15: "e\u0304\u0300", \u0115: "e\u0306", \u1E1D: "e\u0327\u0306", \u011B: "e\u030C", \u00EA: "e\u0302", \u1EBF: "e\u0302\u0301", \u1EC1: "e\u0302\u0300", \u1EC5: "e\u0302\u0303", \u0117: "e\u0307", \u0229: "e\u0327", \u1E1F: "f\u0307", \u01F5: "g\u0301", \u1E21: "g\u0304", \u011F: "g\u0306", \u01E7: "g\u030C", \u011D: "g\u0302", \u0121: "g\u0307", \u0123: "g\u0327", \u1E27: "h\u0308", \u021F: "h\u030C", \u0125: "h\u0302", \u1E23: "h\u0307", \u1E29: "h\u0327", \u00ED: "i\u0301", \u00EC: "i\u0300", \u00EF: "i\u0308", \u1E2F: "i\u0308\u0301", \u0129: "i\u0303", \u012B: "i\u0304", \u012D: "i\u0306", \u01D0: "i\u030C", \u00EE: "i\u0302", \u01F0: "j\u030C", \u0135: "j\u0302", \u1E31: "k\u0301", \u01E9: "k\u030C", \u0137: "k\u0327", \u013A: "l\u0301", \u013E: "l\u030C", \u013C: "l\u0327", \u1E3F: "m\u0301", \u1E41: "m\u0307", \u0144: "n\u0301", \u01F9: "n\u0300", \u00F1: "n\u0303", \u0148: "n\u030C", \u1E45: "n\u0307", \u0146: "n\u0327", \u00F3: "o\u0301", \u00F2: "o\u0300", \u00F6: "o\u0308", \u022B: "o\u0308\u0304", \u00F5: "o\u0303", \u1E4D: "o\u0303\u0301", \u1E4F: "o\u0303\u0308", \u022D: "o\u0303\u0304", \u014D: "o\u0304", \u1E53: "o\u0304\u0301", \u1E51: "o\u0304\u0300", \u014F: "o\u0306", \u01D2: "o\u030C", \u00F4: "o\u0302", \u1ED1: "o\u0302\u0301", \u1ED3: "o\u0302\u0300", \u1ED7: "o\u0302\u0303", \u022F: "o\u0307", \u0231: "o\u0307\u0304", \u0151: "o\u030B", \u1E55: "p\u0301", \u1E57: "p\u0307", \u0155: "r\u0301", \u0159: "r\u030C", \u1E59: "r\u0307", \u0157: "r\u0327", \u015B: "s\u0301", \u1E65: "s\u0301\u0307", \u0161: "s\u030C", \u1E67: "s\u030C\u0307", \u015D: "s\u0302", \u1E61: "s\u0307", \u015F: "s\u0327", \u1E97: "t\u0308", \u0165: "t\u030C", \u1E6B: "t\u0307", \u0163: "t\u0327", \u00FA: "u\u0301", \u00F9: "u\u0300", \u00FC: "u\u0308", \u01D8: "u\u0308\u0301", \u01DC: "u\u0308\u0300", \u01D6: "u\u0308\u0304", \u01DA: "u\u0308\u030C", \u0169: "u\u0303", \u1E79: "u\u0303\u0301", \u016B: "u\u0304", \u1E7B: "u\u0304\u0308", \u016D: "u\u0306", \u01D4: "u\u030C", \u00FB: "u\u0302", \u016F: "u\u030A", \u0171: "u\u030B", \u1E7D: "v\u0303", \u1E83: "w\u0301", \u1E81: "w\u0300", \u1E85: "w\u0308", \u0175: "w\u0302", \u1E87: "w\u0307", \u1E98: "w\u030A", \u1E8D: "x\u0308", \u1E8B: "x\u0307", \u00FD: "y\u0301", \u1EF3: "y\u0300", \u00FF: "y\u0308", \u1EF9: "y\u0303", \u0233: "y\u0304", \u0177: "y\u0302", \u1E8F: "y\u0307", \u1E99: "y\u030A", \u017A: "z\u0301", \u017E: "z\u030C", \u1E91: "z\u0302", \u017C: "z\u0307", \u00C1: "A\u0301", \u00C0: "A\u0300", \u00C4: "A\u0308", \u01DE: "A\u0308\u0304", \u00C3: "A\u0303", \u0100: "A\u0304", \u0102: "A\u0306", \u1EAE: "A\u0306\u0301", \u1EB0: "A\u0306\u0300", \u1EB4: "A\u0306\u0303", \u01CD: "A\u030C", \u00C2: "A\u0302", \u1EA4: "A\u0302\u0301", \u1EA6: "A\u0302\u0300", \u1EAA: "A\u0302\u0303", \u0226: "A\u0307", \u01E0: "A\u0307\u0304", \u00C5: "A\u030A", \u01FA: "A\u030A\u0301", \u1E02: "B\u0307", \u0106: "C\u0301", \u1E08: "C\u0327\u0301", \u010C: "C\u030C", \u0108: "C\u0302", \u010A: "C\u0307", \u00C7: "C\u0327", \u010E: "D\u030C", \u1E0A: "D\u0307", \u1E10: "D\u0327", \u00C9: "E\u0301", \u00C8: "E\u0300", \u00CB: "E\u0308", \u1EBC: "E\u0303", \u0112: "E\u0304", \u1E16: "E\u0304\u0301", \u1E14: "E\u0304\u0300", \u0114: "E\u0306", \u1E1C: "E\u0327\u0306", \u011A: "E\u030C", \u00CA: "E\u0302", \u1EBE: "E\u0302\u0301", \u1EC0: "E\u0302\u0300", \u1EC4: "E\u0302\u0303", \u0116: "E\u0307", \u0228: "E\u0327", \u1E1E: "F\u0307", \u01F4: "G\u0301", \u1E20: "G\u0304", \u011E: "G\u0306", \u01E6: "G\u030C", \u011C: "G\u0302", \u0120: "G\u0307", \u0122: "G\u0327", \u1E26: "H\u0308", \u021E: "H\u030C", \u0124: "H\u0302", \u1E22: "H\u0307", \u1E28: "H\u0327", \u00CD: "I\u0301", \u00CC: "I\u0300", \u00CF: "I\u0308", \u1E2E: "I\u0308\u0301", \u0128: "I\u0303", \u012A: "I\u0304", \u012C: "I\u0306", \u01CF: "I\u030C", \u00CE: "I\u0302", \u0130: "I\u0307", \u0134: "J\u0302", \u1E30: "K\u0301", \u01E8: "K\u030C", \u0136: "K\u0327", \u0139: "L\u0301", \u013D: "L\u030C", \u013B: "L\u0327", \u1E3E: "M\u0301", \u1E40: "M\u0307", \u0143: "N\u0301", \u01F8: "N\u0300", \u00D1: "N\u0303", \u0147: "N\u030C", \u1E44: "N\u0307", \u0145: "N\u0327", \u00D3: "O\u0301", \u00D2: "O\u0300", \u00D6: "O\u0308", \u022A: "O\u0308\u0304", \u00D5: "O\u0303", \u1E4C: "O\u0303\u0301", \u1E4E: "O\u0303\u0308", \u022C: "O\u0303\u0304", \u014C: "O\u0304", \u1E52: "O\u0304\u0301", \u1E50: "O\u0304\u0300", \u014E: "O\u0306", \u01D1: "O\u030C", \u00D4: "O\u0302", \u1ED0: "O\u0302\u0301", \u1ED2: "O\u0302\u0300", \u1ED6: "O\u0302\u0303", \u022E: "O\u0307", \u0230: "O\u0307\u0304", \u0150: "O\u030B", \u1E54: "P\u0301", \u1E56: "P\u0307", \u0154: "R\u0301", \u0158: "R\u030C", \u1E58: "R\u0307", \u0156: "R\u0327", \u015A: "S\u0301", \u1E64: "S\u0301\u0307", \u0160: "S\u030C", \u1E66: "S\u030C\u0307", \u015C: "S\u0302", \u1E60: "S\u0307", \u015E: "S\u0327", \u0164: "T\u030C", \u1E6A: "T\u0307", \u0162: "T\u0327", \u00DA: "U\u0301", \u00D9: "U\u0300", \u00DC: "U\u0308", \u01D7: "U\u0308\u0301", \u01DB: "U\u0308\u0300", \u01D5: "U\u0308\u0304", \u01D9: "U\u0308\u030C", \u0168: "U\u0303", \u1E78: "U\u0303\u0301", \u016A: "U\u0304", \u1E7A: "U\u0304\u0308", \u016C: "U\u0306", \u01D3: "U\u030C", \u00DB: "U\u0302", \u016E: "U\u030A", \u0170: "U\u030B", \u1E7C: "V\u0303", \u1E82: "W\u0301", \u1E80: "W\u0300", \u1E84: "W\u0308", \u0174: "W\u0302", \u1E86: "W\u0307", \u1E8C: "X\u0308", \u1E8A: "X\u0307", \u00DD: "Y\u0301", \u1EF2: "Y\u0300", \u0178: "Y\u0308", \u1EF8: "Y\u0303", \u0232: "Y\u0304", \u0176: "Y\u0302", \u1E8E: "Y\u0307", \u0179: "Z\u0301", \u017D: "Z\u030C", \u1E90: "Z\u0302", \u017B: "Z\u0307", \u03AC: "\u03B1\u0301", \u1F70: "\u03B1\u0300", \u1FB1: "\u03B1\u0304", \u1FB0: "\u03B1\u0306", \u03AD: "\u03B5\u0301", \u1F72: "\u03B5\u0300", \u03AE: "\u03B7\u0301", \u1F74: "\u03B7\u0300", \u03AF: "\u03B9\u0301", \u1F76: "\u03B9\u0300", \u03CA: "\u03B9\u0308", \u0390: "\u03B9\u0308\u0301", \u1FD2: "\u03B9\u0308\u0300", \u1FD1: "\u03B9\u0304", \u1FD0: "\u03B9\u0306", \u03CC: "\u03BF\u0301", \u1F78: "\u03BF\u0300", \u03CD: "\u03C5\u0301", \u1F7A: "\u03C5\u0300", \u03CB: "\u03C5\u0308", \u03B0: "\u03C5\u0308\u0301", \u1FE2: "\u03C5\u0308\u0300", \u1FE1: "\u03C5\u0304", \u1FE0: "\u03C5\u0306", \u03CE: "\u03C9\u0301", \u1F7C: "\u03C9\u0300", \u038E: "\u03A5\u0301", \u1FEA: "\u03A5\u0300", \u03AB: "\u03A5\u0308", \u1FE9: "\u03A5\u0304", \u1FE8: "\u03A5\u0306", \u038F: "\u03A9\u0301", \u1FFA: "\u03A9\u0300" };
let Ai = class Mi {
  constructor(e, t) {
    this.mode = void 0, this.gullet = void 0, this.settings = void 0, this.leftrightDepth = void 0, this.nextToken = void 0, this.mode = "math", this.gullet = new F2(e, t, this.mode), this.settings = t, this.leftrightDepth = 0, this.nextToken = null;
  }
  expect(e, t) {
    if (t === void 0 && (t = true), this.fetch().text !== e) throw new O("Expected '" + e + "', got '" + this.fetch().text + "'", this.fetch());
    t && this.consume();
  }
  consume() {
    this.nextToken = null;
  }
  fetch() {
    return this.nextToken == null && (this.nextToken = this.gullet.expandNextToken()), this.nextToken;
  }
  switchMode(e) {
    this.mode = e, this.gullet.switchMode(e);
  }
  parse() {
    this.settings.globalGroup || this.gullet.beginGroup(), this.settings.colorIsTextColor && this.gullet.macros.set("\\color", "\\textcolor");
    try {
      var e = this.parseExpression(false);
      return this.expect("EOF"), this.settings.globalGroup || this.gullet.endGroup(), e;
    } finally {
      this.gullet.endGroups();
    }
  }
  subparse(e) {
    var t = this.nextToken;
    this.consume(), this.gullet.pushToken(new be("}")), this.gullet.pushTokens(e);
    var a = this.parseExpression(false);
    return this.expect("}"), this.nextToken = t, a;
  }
  parseExpression(e, t) {
    for (var a = []; ; ) {
      this.mode === "math" && this.consumeSpaces();
      var n = this.fetch();
      if (Mi.endOfExpression.has(n.text) || t && n.text === t || e && Qe[n.text] && Qe[n.text].infix) break;
      var i = this.parseAtom(t);
      if (i) {
        if (i.type === "internal") continue;
      } else break;
      a.push(i);
    }
    return this.mode === "text" && this.formLigatures(a), this.handleInfixNodes(a);
  }
  handleInfixNodes(e) {
    for (var t = -1, a, n = 0; n < e.length; n++) {
      var i = e[n];
      if (i.type === "infix") {
        if (t !== -1) throw new O("only one infix operator per group", i.token);
        t = n, a = i.replaceWith;
      }
    }
    if (t !== -1 && a) {
      var s, l, h = e.slice(0, t), d = e.slice(t + 1);
      h.length === 1 && h[0].type === "ordgroup" ? s = h[0] : s = { type: "ordgroup", mode: this.mode, body: h }, d.length === 1 && d[0].type === "ordgroup" ? l = d[0] : l = { type: "ordgroup", mode: this.mode, body: d };
      var f;
      return a === "\\\\abovefrac" ? f = this.callFunction(a, [s, e[t], l], []) : f = this.callFunction(a, [s, l], []), [f];
    } else return e;
  }
  handleSupSubscript(e) {
    var t = this.fetch(), a = t.text;
    this.consume(), this.consumeSpaces();
    var n;
    do {
      var i;
      n = this.parseGroup(e);
    } while (((i = n) == null ? void 0 : i.type) === "internal");
    if (!n) throw new O("Expected group after '" + a + "'", t);
    return n;
  }
  formatUnsupportedCmd(e) {
    for (var t = [], a = 0; a < e.length; a++) t.push({ type: "textord", mode: "text", text: e[a] });
    var n = { type: "text", mode: this.mode, body: t }, i = { type: "color", mode: this.mode, color: this.settings.errorColor, body: [n] };
    return i;
  }
  parseAtom(e) {
    var t = this.parseGroup("atom", e);
    if ((t == null ? void 0 : t.type) === "internal" || this.mode === "text") return t;
    for (var a, n; ; ) {
      this.consumeSpaces();
      var i = this.fetch();
      if (i.text === "\\limits" || i.text === "\\nolimits") {
        if (t && t.type === "op") t.limits = i.text === "\\limits", t.alwaysHandleSupSub = true;
        else if (t && t.type === "operatorname") t.alwaysHandleSupSub && (t.limits = i.text === "\\limits");
        else throw new O("Limit controls must follow a math operator", i);
        this.consume();
      } else if (i.text === "^") {
        if (a) throw new O("Double superscript", i);
        a = this.handleSupSubscript("superscript");
      } else if (i.text === "_") {
        if (n) throw new O("Double subscript", i);
        n = this.handleSupSubscript("subscript");
      } else if (i.text === "'") {
        if (a) throw new O("Double superscript", i);
        var s = { type: "textord", mode: this.mode, text: "\\prime" }, l = [s];
        for (this.consume(); this.fetch().text === "'"; ) l.push(s), this.consume();
        this.fetch().text === "^" && l.push(this.handleSupSubscript("superscript")), a = { type: "ordgroup", mode: this.mode, body: l };
      } else if (dr[i.text]) {
        var h = U4.test(i.text), d = [];
        for (d.push(new be(dr[i.text])), this.consume(); ; ) {
          var f = this.fetch().text;
          if (!dr[f] || U4.test(f) !== h) break;
          d.unshift(new be(dr[f])), this.consume();
        }
        var y = this.subparse(d);
        h ? n = { type: "ordgroup", mode: "math", body: y } : a = { type: "ordgroup", mode: "math", body: y };
      } else break;
    }
    return a && n ? { type: "supsub", mode: this.mode, base: t, sup: a, sub: n } : a ? { type: "supsub", mode: this.mode, base: t, sup: a } : n ? { type: "supsub", mode: this.mode, base: t, sub: n } : t;
  }
  parseFunction(e, t) {
    var a = this.fetch(), n = a.text, i = Qe[n];
    if (!i) return null;
    if (this.consume(), t && t !== "atom" && !i.allowedInArgument) throw new O("Got function '" + n + "' with no arguments" + (t ? " as " + t : ""), a);
    if (this.mode === "text" && !i.allowedInText) throw new O("Can't use function '" + n + "' in text mode", a);
    if (this.mode === "math" && i.allowedInMath === false) throw new O("Can't use function '" + n + "' in math mode", a);
    var s = this.parseArguments(n, i), l = s.args, h = s.optArgs;
    return this.callFunction(n, l, h, a, e);
  }
  callFunction(e, t, a, n, i) {
    var s = { funcName: e, parser: this, token: n, breakOnTokenText: i }, l = Qe[e];
    if (l && l.handler) return l.handler(s, t, a);
    throw new O("No function handler for " + e);
  }
  parseArguments(e, t) {
    var a, n = (a = t.numOptionalArgs) != null ? a : 0, i = t.numArgs + n;
    if (i === 0) return { args: [], optArgs: [] };
    for (var s = [], l = [], h = 0; h < i; h++) {
      var d, f = (d = t.argTypes) == null ? void 0 : d[h], y = h < n;
      ("primitive" in t && t.primitive && f == null || t.type === "sqrt" && h === 1 && l[0] == null) && (f = "primitive");
      var x = this.parseGroupOfType("argument to '" + e + "'", f, y);
      if (y) l.push(x);
      else if (x != null) s.push(x);
      else throw new O("Null argument, please report this as a bug");
    }
    return { args: s, optArgs: l };
  }
  parseGroupOfType(e, t, a) {
    switch (t) {
      case "color":
        return this.parseColorGroup(a);
      case "size":
        return this.parseSizeGroup(a);
      case "url":
        return this.parseUrlGroup(a);
      case "math":
      case "text":
        return this.parseArgumentGroup(a, t);
      case "hbox": {
        var n = this.parseArgumentGroup(a, "text");
        return n != null ? { type: "styling", mode: n.mode, body: [n], style: "text", resetFont: true } : null;
      }
      case "raw": {
        var i = this.parseStringGroup(a);
        return i != null ? { type: "raw", mode: "text", string: i.text } : null;
      }
      case "primitive": {
        if (a) throw new O("A primitive argument cannot be optional");
        var s = this.parseGroup(e);
        if (s == null) throw new O("Expected group as " + e, this.fetch());
        return s;
      }
      case "original":
      case void 0:
        return this.parseArgumentGroup(a);
      default:
        throw new O("Unknown group type as " + e, this.fetch());
    }
  }
  consumeSpaces() {
    for (; this.fetch().text === " "; ) this.consume();
  }
  parseStringGroup(e) {
    var t = this.gullet.scanArgument(e);
    if (t == null) return null;
    for (var a = "", n; (n = this.fetch()).text !== "EOF"; ) a += n.text, this.consume();
    return this.consume(), t.text = a, t;
  }
  parseRegexGroup(e, t) {
    for (var a = this.fetch(), n = a, i = "", s; (s = this.fetch()).text !== "EOF" && e.test(i + s.text); ) n = s, i += n.text, this.consume();
    if (i === "") throw new O("Invalid " + t + ": '" + a.text + "'", a);
    return a.range(n, i);
  }
  parseColorGroup(e) {
    var t = this.parseStringGroup(e);
    if (t == null) return null;
    var a = /^(#[a-f0-9]{3,4}|#[a-f0-9]{6}|#[a-f0-9]{8}|[a-f0-9]{6}|[a-z]+)$/i.exec(t.text);
    if (!a) throw new O("Invalid color: '" + t.text + "'", t);
    var n = a[0];
    return /^[0-9a-f]{6}$/i.test(n) && (n = "#" + n), { type: "color-token", mode: this.mode, color: n };
  }
  parseSizeGroup(e) {
    var t, a = false;
    if (this.gullet.consumeSpaces(), !e && this.gullet.future().text !== "{" ? t = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size") : t = this.parseStringGroup(e), !t) return null;
    !e && t.text.length === 0 && (t.text = "0pt", a = true);
    var n = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(t.text);
    if (!n) throw new O("Invalid size: '" + t.text + "'", t);
    var i = { number: +(n[1] + n[2]), unit: n[3] };
    if (!En(i)) throw new O("Invalid unit: '" + i.unit + "'", t);
    return { type: "size", mode: this.mode, value: i, isBlank: a };
  }
  parseUrlGroup(e) {
    this.gullet.lexer.setCatcode("%", 13), this.gullet.lexer.setCatcode("~", 12);
    var t = this.parseStringGroup(e);
    if (this.gullet.lexer.setCatcode("%", 14), this.gullet.lexer.setCatcode("~", 13), t == null) return null;
    var a = t.text.replace(/\\([#$%&~_^{}])/g, "$1");
    return { type: "url", mode: this.mode, url: a };
  }
  parseArgumentGroup(e, t) {
    var a = this.gullet.scanArgument(e);
    if (a == null) return null;
    var n = this.mode;
    t && this.switchMode(t), this.gullet.beginGroup();
    var i = this.parseExpression(false, "EOF");
    this.expect("EOF"), this.gullet.endGroup();
    var s = { type: "ordgroup", mode: this.mode, loc: a.loc, body: i };
    return t && this.switchMode(n), s;
  }
  parseGroup(e, t) {
    var a = this.fetch(), n = a.text, i;
    if (n === "{" || n === "\\begingroup") {
      this.consume();
      var s = n === "{" ? "}" : "\\endgroup";
      this.gullet.beginGroup();
      var l = this.parseExpression(false, s), h = this.fetch();
      this.expect(s), this.gullet.endGroup(), i = { type: "ordgroup", mode: this.mode, loc: ce.range(a, h), body: l, semisimple: n === "\\begingroup" || void 0 };
    } else if (i = this.parseFunction(t, e) || this.parseSymbol(), i == null && n[0] === "\\" && !Object.prototype.hasOwnProperty.call(zi, n)) {
      if (this.settings.throwOnError) throw new O("Undefined control sequence: " + n, a);
      i = this.formatUnsupportedCmd(n), this.consume();
    }
    return i;
  }
  formLigatures(e) {
    for (var t = e.length - 1, a = 0; a < t; ++a) {
      var n = e[a];
      if (n.type === "textord") {
        var i = n.text, s = e[a + 1];
        if (!(!s || s.type !== "textord")) {
          if (i === "-" && s.text === "-") {
            var l = e[a + 2];
            a + 1 < t && l && l.type === "textord" && l.text === "-" ? (e.splice(a, 3, { type: "textord", mode: "text", loc: ce.range(n, l), text: "---" }), t -= 2) : (e.splice(a, 2, { type: "textord", mode: "text", loc: ce.range(n, s), text: "--" }), t -= 1);
          }
          (i === "'" || i === "`") && s.text === i && (e.splice(a, 2, { type: "textord", mode: "text", loc: ce.range(n, s), text: i + i }), t -= 1);
        }
      }
    }
  }
  parseSymbol() {
    var e = this.fetch(), t = e.text;
    if (/^\\verb[^a-zA-Z]/.test(t)) {
      this.consume();
      var a = t.slice(5), n = a.charAt(0) === "*";
      if (n && (a = a.slice(1)), a.length < 2 || a.charAt(0) !== a.slice(-1)) throw new O(`\\verb assertion failed --
                    please report what input caused this bug`);
      return a = a.slice(1, -1), { type: "verb", mode: "text", body: a, star: n };
    }
    Object.prototype.hasOwnProperty.call(V4, t[0]) && !g0[this.mode][t[0]] && (this.settings.strict && this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", 'Accented Unicode text character "' + t[0] + '" used in math mode', e), t = V4[t[0]] + t.slice(1));
    var i = q2.exec(t);
    i && (t = t.substring(0, i.index), t === "i" ? t = "\u0131" : t === "j" && (t = "\u0237"));
    var s;
    if (g0[this.mode][t]) {
      this.settings.strict && this.mode === "math" && j1.includes(t) && this.settings.reportNonstrict("unicodeTextInMathMode", 'Latin-1/Unicode text character "' + t[0] + '" used in math mode', e);
      var l = g0[this.mode][t].group, h = ce.range(e), d;
      Gl(l) ? d = { type: "atom", mode: this.mode, family: l, loc: h, text: t } : d = { type: l, mode: this.mode, loc: h, text: t }, s = d;
    } else if (t.charCodeAt(0) >= 128) this.settings.strict && (qn(t.charCodeAt(0)) ? this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", 'Unicode text character "' + t[0] + '" used in math mode', e) : this.settings.reportNonstrict("unknownSymbol", 'Unrecognized Unicode character "' + t[0] + '"' + (" (" + t.charCodeAt(0) + ")"), e)), s = { type: "textord", mode: "text", loc: ce.range(e), text: t };
    else return null;
    if (this.consume(), i) for (var f = 0; f < i[0].length; f++) {
      var y = i[0][f];
      if (!B1[y]) throw new O("Unknown accent ' " + y + "'", e);
      var x = B1[y][this.mode] || B1[y].text;
      if (!x) throw new O("Accent " + y + " unsupported in " + this.mode + " mode", e);
      s = { type: "accent", mode: this.mode, loc: ce.range(e), label: x, isStretchy: false, isShifty: true, base: s };
    }
    return s;
  }
};
Ai.endOfExpression = /* @__PURE__ */ new Set(["}", "\\endgroup", "\\end", "\\right", "&"]);
var Pa = function(e, t) {
  if (!(typeof e == "string" || e instanceof String)) throw new TypeError("KaTeX can only parse string typed expression");
  var a = new Ai(e, t);
  delete a.gullet.macros.current["\\df@tag"];
  var n = a.parse();
  if (delete a.gullet.macros.current["\\current@color"], delete a.gullet.macros.current["\\color"], a.gullet.macros.get("\\df@tag")) {
    if (!t.displayMode) throw new O("\\tag works only in display equations");
    n = [{ type: "tag", mode: "text", body: n, tag: a.subparse([new be("\\df@tag")]) }];
  }
  return n;
}, Ga = function(e, t, a) {
  t.textContent = "";
  var n = Xr(e, a).toNode();
  t.appendChild(n);
};
typeof document < "u" && document.compatMode !== "CSS1Compat" && (typeof console < "u" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."), Ga = function() {
  throw new O("KaTeX doesn't work in quirks mode.");
});
var Ti = function(e, t) {
  var a = Xr(e, t).toMarkup();
  return a;
}, Bi = function(e, t) {
  var a = new Ta(t);
  return Pa(e, a);
}, Ci = function(e, t, a) {
  if (a.throwOnError || !(e instanceof O)) throw e;
  var n = I(["katex-error"], [new se(t)]);
  return n.setAttribute("title", e.toString()), n.setAttribute("style", "color:" + a.errorColor), n;
}, Xr = function(e, t) {
  var a = new Ta(t);
  try {
    var n = Pa(e, a);
    return El(n, e, a);
  } catch (i) {
    return Ci(i, e, a);
  }
}, Di = function(e, t) {
  var a = new Ta(t);
  try {
    var n = Pa(e, a);
    return Nl(n, e, a);
  } catch (i) {
    return Ci(i, e, a);
  }
}, qi = "0.18.9", Ei = { Span: Et, Anchor: Ir, SymbolNode: se, SvgNode: Le, PathNode: tt, LineNode: W1 }, O2 = { version: qi, render: Ga, renderToString: Ti, ParseError: O, SETTINGS_SCHEMA: Mr, __parse: Bi, __renderToDomTree: Xr, __renderToHTMLTree: Di, __setFontMetrics: Fn, __defineSymbol: u, __defineFunction: W, __defineMacro: g, __domTree: Ei };
const Y3 = Object.freeze(Object.defineProperty({ __proto__: null, ParseError: O, SETTINGS_SCHEMA: Mr, __defineFunction: W, __defineMacro: g, __defineSymbol: u, __domTree: Ei, __parse: Bi, __renderToDomTree: Xr, __renderToHTMLTree: Di, __setFontMetrics: Fn, default: O2, get render() {
  return Ga;
}, renderToString: Ti, version: qi }, Symbol.toStringTag, { value: "Module" }));
class $ extends Error {
  constructor(e, t) {
    var a = "KaTeX parse error: " + e, n, i, s = t && t.loc;
    if (s && s.start <= s.end) {
      var l = s.lexer.input;
      n = s.start, i = s.end, n === l.length ? a += " at end of input: " : a += " at position " + (n + 1) + ": ";
      var h = l.slice(n, i).replace(/[^]/g, "$&\u0332"), d;
      n > 15 ? d = "\u2026" + l.slice(n - 15, n) : d = l.slice(0, n);
      var f;
      i + 15 < l.length ? f = l.slice(i, i + 15) + "\u2026" : f = l.slice(i), a += d + h + f;
    }
    super(a), this.name = "ParseError", this.position = void 0, this.length = void 0, this.rawMessage = void 0, Object.setPrototypeOf(this, $.prototype), this.position = n, n != null && i != null && (this.length = i - n), this.rawMessage = e;
  }
}
var $2 = /([A-Z])/g, H2 = (r) => r.replace($2, "-$1").toLowerCase(), L2 = { "&": "&amp;", ">": "&gt;", "<": "&lt;", '"': "&quot;", "'": "&#x27;" }, P2 = /[&><"']/g, V0 = (r) => String(r).replace(P2, (e) => L2[e]), zr = (r) => r.type === "ordgroup" || r.type === "color" ? r.body.length === 1 ? zr(r.body[0]) : r : r.type === "font" ? zr(r.body) : r, G2 = /* @__PURE__ */ new Set(["mathord", "textord", "atom"]), Xe = (r) => G2.has(zr(r).type), U2 = (r) => {
  var e = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(r);
  return e ? e[2] !== ":" || !/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(e[1]) ? null : e[1].toLowerCase() : "_relative";
}, Cr = { displayMode: { type: "boolean", description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.", cli: "-d, --display-mode" }, output: { type: { enum: ["htmlAndMathml", "html", "mathml"] }, description: "Determines the markup language of the output.", cli: "-F, --format <type>" }, leqno: { type: "boolean", description: "Render display math in leqno style (left-justified tags)." }, fleqn: { type: "boolean", description: "Render display math flush left." }, throwOnError: { type: "boolean", default: true, cli: "-t, --no-throw-on-error", cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error." }, errorColor: { type: "string", default: "#cc0000", cli: "-c, --error-color <color>", cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.", cliProcessor: (r) => "#" + r }, macros: { type: "object", cli: "-m, --macro <def>", cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).", cliDefault: [], cliProcessor: (r, e) => (e.push(r), e) }, minRuleThickness: { type: "number", description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.", processor: (r) => Math.max(0, r), cli: "--min-rule-thickness <size>", cliProcessor: parseFloat }, colorIsTextColor: { type: "boolean", description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.", cli: "-b, --color-is-text-color" }, strict: { type: [{ enum: ["warn", "ignore", "error"] }, "boolean", "function"], description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.", cli: "-S, --strict", cliDefault: false }, trust: { type: ["boolean", "function"], description: "Trust the input, enabling all HTML features such as \\url.", cli: "-T, --trust" }, maxSize: { type: "number", default: 1 / 0, description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large", processor: (r) => Math.max(0, r), cli: "-s, --max-size <n>", cliProcessor: parseInt }, maxExpand: { type: "number", default: 1e3, description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.", processor: (r) => Math.max(0, r), cli: "-e, --max-expand <n>", cliProcessor: (r) => r === "Infinity" ? 1 / 0 : parseInt(r) }, globalGroup: { type: "boolean", cli: false } };
function V2(r) {
  if (typeof r != "string") return r.enum[0];
  switch (r) {
    case "boolean":
      return false;
    case "string":
      return "";
    case "number":
      return 0;
    case "object":
      return {};
    default:
      throw new Error("Unexpected schema type; settings must declare an explicit default.");
  }
}
function X2(r) {
  if (r.default !== void 0) return r.default;
  var e = Array.isArray(r.type) ? r.type[0] : r.type;
  return V2(e);
}
function Y2(r, e, t, a) {
  var n = t[e];
  r[e] = n !== void 0 ? a.processor ? a.processor(n) : n : X2(a);
}
class Ua {
  constructor(e) {
    e === void 0 && (e = {}), this.displayMode = void 0, this.output = void 0, this.leqno = void 0, this.fleqn = void 0, this.throwOnError = void 0, this.errorColor = void 0, this.macros = void 0, this.minRuleThickness = void 0, this.colorIsTextColor = void 0, this.strict = void 0, this.trust = void 0, this.maxSize = void 0, this.maxExpand = void 0, this.globalGroup = void 0, e = e || {};
    for (var t of Object.keys(Cr)) {
      var a = Cr[t];
      a && Y2(this, t, e, a);
    }
  }
  reportNonstrict(e, t, a) {
    var n = this.strict;
    if (typeof n == "function" && (n = n(e, t, a)), !(!n || n === "ignore")) {
      if (n === true || n === "error") throw new $("LaTeX-incompatible input and strict mode is set to 'error': " + (t + " [" + e + "]"), a);
      n === "warn" ? typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (t + " [" + e + "]")) : typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + n + "': " + t + " [" + e + "]"));
    }
  }
  useStrictBehavior(e, t, a) {
    var n = this.strict;
    if (typeof n == "function") try {
      n = n(e, t, a);
    } catch {
      n = "error";
    }
    return !n || n === "ignore" ? false : n === true || n === "error" ? true : n === "warn" ? (typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (t + " [" + e + "]")), false) : (typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + n + "': " + t + " [" + e + "]")), false);
  }
  isTrusted(e) {
    if ("url" in e && e.url && !e.protocol) {
      var t = U2(e.url);
      if (t == null) return false;
      e.protocol = t;
    }
    var a = typeof this.trust == "function" ? this.trust(e) : this.trust;
    return !!a;
  }
}
class Ke {
  constructor(e, t, a) {
    this.id = void 0, this.size = void 0, this.cramped = void 0, this.id = e, this.size = t, this.cramped = a;
  }
  sup() {
    return xe[W2[this.id]];
  }
  sub() {
    return xe[j2[this.id]];
  }
  fracNum() {
    return xe[Z2[this.id]];
  }
  fracDen() {
    return xe[K2[this.id]];
  }
  cramp() {
    return xe[J2[this.id]];
  }
  text() {
    return xe[Q2[this.id]];
  }
  isTight() {
    return this.size >= 2;
  }
}
var Va = 0, Dr = 1, zt = 2, He = 3, rr = 4, fe = 5, Bt = 6, J0 = 7, xe = [new Ke(Va, 0, false), new Ke(Dr, 0, true), new Ke(zt, 1, false), new Ke(He, 1, true), new Ke(rr, 2, false), new Ke(fe, 2, true), new Ke(Bt, 3, false), new Ke(J0, 3, true)], W2 = [rr, fe, rr, fe, Bt, J0, Bt, J0], j2 = [fe, fe, fe, fe, J0, J0, J0, J0], Z2 = [zt, He, rr, fe, Bt, J0, Bt, J0], K2 = [He, He, fe, fe, J0, J0, J0, J0], J2 = [Dr, Dr, He, He, fe, fe, J0, J0], Q2 = [Va, Dr, zt, He, zt, He, zt, He], i0 = { DISPLAY: xe[Va], TEXT: xe[zt], SCRIPT: xe[rr], SCRIPTSCRIPT: xe[Bt] }, oa = [{ name: "latin", blocks: [[256, 591], [768, 879]] }, { name: "cyrillic", blocks: [[1024, 1279]] }, { name: "armenian", blocks: [[1328, 1423]] }, { name: "brahmic", blocks: [[2304, 4255]] }, { name: "georgian", blocks: [[4256, 4351]] }, { name: "cjk", blocks: [[12288, 12543], [19968, 40879], [65280, 65376]] }, { name: "hangul", blocks: [[44032, 55215]] }];
function _2(r) {
  for (var e = 0; e < oa.length; e++) for (var t = oa[e], a = 0; a < t.blocks.length; a++) {
    var n = t.blocks[a];
    if (r >= n[0] && r <= n[1]) return t.name;
  }
  return null;
}
var Ar = [];
oa.forEach((r) => r.blocks.forEach((e) => Ar.push(...e)));
function Ni(r) {
  for (var e = 0; e < Ar.length; e += 2) if (r >= Ar[e] && r <= Ar[e + 1]) return true;
  return false;
}
var O0 = (r) => r + " " + r, kt = 80, e5 = function(e, t) {
  return "M95," + (622 + e + t) + `
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l` + e / 2.075 + " -" + e + `
c5.3,-9.3,12,-14,20,-14
H400000v` + (40 + e) + `H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M` + (834 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, t5 = function(e, t) {
  return "M263," + (601 + e + t) + `c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l` + e / 2.084 + " -" + e + `
c4.7,-7.3,11,-11,19,-11
H40000v` + (40 + e) + `H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, r5 = function(e, t) {
  return "M983 " + (10 + e + t) + `
l` + e / 3.13 + " -" + e + `
c4,-6.7,10,-10,18,-10 H400000v` + (40 + e) + `
H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7
s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744
c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30
c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722
c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5
c53.7,-170.3,84.5,-266.8,92.5,-289.5z
M` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, a5 = function(e, t) {
  return "M424," + (2398 + e + t) + `
c-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514
c0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20
s-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121
s209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081
l` + e / 4.223 + " -" + e + `c4,-6.7,10,-10,18,-10 H400000
v` + (40 + e) + `H1014.6
s-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185
c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2z M` + (1001 + e) + " " + t + `
h400000v` + (40 + e) + "h-400000z";
}, n5 = function(e, t) {
  return "M473," + (2713 + e + t) + `
c339.3,-1799.3,509.3,-2700,510,-2702 l` + e / 5.298 + " -" + e + `
c3.3,-7.3,9.3,-11,18,-11 H400000v` + (40 + e) + `H1017.7
s-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200
c0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26
s76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,
606zM` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "H1017.7z";
}, i5 = function(e) {
  var t = e / 2;
  return "M400000 " + e + " H0 L" + t + " 0 l65 45 L145 " + (e - 80) + " H400000z";
}, s5 = function(e, t, a) {
  var n = a - 54 - t - e;
  return "M702 " + (e + t) + "H400000" + (40 + e) + `
H742v` + n + `l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1
h-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170
c-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667
219 661 l218 661zM702 ` + t + "H400000v" + (40 + e) + "H742z";
}, l5 = function(e, t, a) {
  t = 1e3 * t;
  var n = "";
  switch (e) {
    case "sqrtMain":
      n = e5(t, kt);
      break;
    case "sqrtSize1":
      n = t5(t, kt);
      break;
    case "sqrtSize2":
      n = r5(t, kt);
      break;
    case "sqrtSize3":
      n = a5(t, kt);
      break;
    case "sqrtSize4":
      n = n5(t, kt);
      break;
    case "sqrtTall":
      n = s5(t, kt, a);
  }
  return n;
}, u5 = function(e, t) {
  switch (e) {
    case "\u239C":
      return O0("M291 0 H417 V" + t + " H291z");
    case "\u2223":
      return O0("M145 0 H188 V" + t + " H145z");
    case "\u2225":
      return O0("M145 0 H188 V" + t + " H145z") + O0("M367 0 H410 V" + t + " H367z");
    case "\u239F":
      return O0("M457 0 H583 V" + t + " H457z");
    case "\u23A2":
      return O0("M319 0 H403 V" + t + " H319z");
    case "\u23A5":
      return O0("M263 0 H347 V" + t + " H263z");
    case "\u23AA":
      return O0("M384 0 H504 V" + t + " H384z");
    case "\u23D0":
      return O0("M312 0 H355 V" + t + " H312z");
    case "\u2016":
      return O0("M257 0 H300 V" + t + " H257z") + O0("M478 0 H521 V" + t + " H478z");
    default:
      return "";
  }
}, X4 = { doubleleftarrow: `M262 157
l10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3
 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28
 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5
c2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5
 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87
-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7
-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z
m8 0v40h399730v-40zm0 194v40h399730v-40z`, doublerightarrow: `M399738 392l
-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5
 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88
-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68
-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18
-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782
c-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3
-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z`, leftarrow: `M400000 241H110l3-3c68.7-52.7 113.7-120
 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8
-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247
c-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208
 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3
 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202
 l-3-3h399890zM100 241v40h399900v-40z`, leftbrace: `M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117
-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7
 5-6 9-10 13-.7 1-7.3 1-20 1H6z`, leftbraceunder: `M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13
 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688
 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7
-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z`, leftgroup: `M400000 80
H435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0
 435 0h399565z`, leftgroupunder: `M400000 262
H435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219
 435 219h399565z`, leftharpoon: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3
-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5
-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7
-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z`, leftharpoonplus: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5
 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3
-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7
-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z
m0 0v40h400000v-40z`, leftharpoondown: `M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333
 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5
 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667
-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z`, leftharpoondownplus: `M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12
 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7
-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0
v40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z`, lefthook: `M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5
-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3
-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21
 71.5 23h399859zM103 281v-40h399897v40z`, leftlinesegment: O0("M40 281 V428 H0 V94 H40 V241 H400000 v40z"), leftbracketunder: O0("M0 0 h120 V290 H399995 v120 H0z"), leftbracketover: O0("M0 440 h120 V150 H399995 v-120 H0z"), leftmapsto: O0("M40 281 V448H0V74H40V241H400000v40z"), leftToFrom: `M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23
-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8
c28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3
 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z`, longequal: O0("M0 50 h400000 v40H0z m0 194h40000v40H0z"), midbrace: `M200428 334
c-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14
-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7
 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11
 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z`, midbraceunder: `M199572 214
c100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14
 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3
 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0
-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z`, oiintSize1: `M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6
-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z
m368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8
60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z`, oiintSize2: `M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8
-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z
m502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2
c0 110 84 276 504 276s502.4-166 502.4-276z`, oiiintSize1: `M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6
-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z
m525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0
85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z`, oiiintSize2: `M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8
-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z
m770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1
c0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z`, rightarrow: `M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z`, rightbrace: `M400000 542l
-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5
s-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1
c124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z`, rightbraceunder: `M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3
 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237
-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z`, rightgroup: `M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0
 3-1 3-3v-38c-76-158-257-219-435-219H0z`, rightgroupunder: `M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18
 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z`, rightharpoon: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3
-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2
-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58
 69.2 92 94.5zm0 0v40h399900v-40z`, rightharpoonplus: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11
-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7
 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z
m0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z`, rightharpoondown: `M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8
 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5
-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95
-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z`, rightharpoondownplus: `M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8
 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3
 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3
-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z
m0-194v40h400000v-40zm0 0v40h400000v-40z`, righthook: `M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3
 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0
-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21
 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z`, rightlinesegment: O0("M399960 241 V94 h40 V428 h-40 V281 H0 v-40z"), rightbracketunder: O0("M399995 0 h-120 V290 H0 v120 H400000z"), rightbracketover: O0("M399995 440 h-120 V150 H0 v-120 H399995z"), rightToFrom: `M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23
 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32
-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142
-167z M100 147v40h399900v-40zM0 341v40h399900v-40z`, twoheadleftarrow: `M0 167c68 40
 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69
-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3
-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19
-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101
 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z`, twoheadrightarrow: `M400000 167
c-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3
 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42
 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333
-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70
 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z`, tilde1: `M200 55.538c-77 0-168 73.953-177 73.953-3 0-7
-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0
 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0
 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128
-68.267.847-113-73.952-191-73.952z`, tilde2: `M344 55.266c-142 0-300.638 81.316-311.5 86.418
-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9
 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114
c1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751
 181.476 676 181.476c-149 0-189-126.21-332-126.21z`, tilde3: `M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457
-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0
 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697
 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696
 -338 0-409-156.573-744-156.573z`, tilde4: `M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345
-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409
 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9
 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409
 -175.236-744-175.236z`, vec: `M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z`, widehat1: `M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22
c-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z`, widehat2: `M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`, widehat3: `M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`, widehat4: `M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`, widecheck1: `M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,
-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z`, widecheck2: `M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`, widecheck3: `M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`, widecheck4: `M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`, baraboveleftarrow: `M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202
c4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5
c-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130
s-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47
121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6
s2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11
c0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z
M100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z`, rightarrowabovebar: `M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32
-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0
13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39
-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5
-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z`, baraboveshortleftharpoon: `M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17
c2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21
c-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40
c-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z
M0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z`, rightharpoonaboveshortbar: `M0,241 l0,40c399126,0,399993,0,399993,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z`, shortbaraboveleftharpoon: `M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,
1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,
-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z
M93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z`, shortrightharpoonabovebar: `M53,241l0,40c398570,0,399437,0,399437,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z` }, o5 = function(e, t) {
  switch (e) {
    case "lbrack":
      return "M403 1759 V84 H666 V0 H319 V1759 v" + t + ` v1759 v84 h347 v-84
H403z M403 1759 V0 H319 V1759 v` + t + " v1759 v84 h84z";
    case "rbrack":
      return "M347 1759 V0 H0 V84 H263 V1759 v" + t + ` v1759 H0 v84 H347z
M347 1759 V0 H263 V1759 v` + t + " v1759 h84z";
    case "vert":
      return "M145 15 v585 v" + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` + t + " v585 h43z";
    case "doublevert":
      return "M145 15 v585 v" + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` + t + ` v585 h43z
M367 15 v585 v` + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M410 15 H367 v585 v` + t + " v585 h43z";
    case "lfloor":
      return "M319 602 V0 H403 V602 v" + t + ` v1715 h263 v84 H319z
MM319 602 V0 H403 V602 v` + t + " v1715 H319z";
    case "rfloor":
      return "M319 602 V0 H403 V602 v" + t + ` v1799 H0 v-84 H319z
MM319 602 V0 H403 V602 v` + t + " v1715 H319z";
    case "lceil":
      return "M403 1759 V84 H666 V0 H319 V1759 v" + t + ` v602 h84z
M403 1759 V0 H319 V1759 v` + t + " v602 h84z";
    case "rceil":
      return "M347 1759 V0 H0 V84 H263 V1759 v" + t + ` v602 h84z
M347 1759 V0 h-84 V1759 v` + t + " v602 h84z";
    case "lparen":
      return `M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1
c-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,
-36,557 l0,` + (t + 84) + `c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,
949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9
c0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,
-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189
l0,-` + (t + 92) + `c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,
-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z`;
    case "rparen":
      return `M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,
63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5
c11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0,` + (t + 9) + `
c-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664
c-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11
c0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17
c242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558
l0,-` + (t + 144) + `c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,
-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z`;
    default:
      throw new Error("Unknown stretchy delimiter.");
  }
};
function h5(r) {
  return "toText" in r;
}
class Rt {
  constructor(e) {
    this.children = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.children = e, this.classes = [], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = {};
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    for (var e = document.createDocumentFragment(), t = 0; t < this.children.length; t++) e.appendChild(this.children[t].toNode());
    return e;
  }
  toMarkup() {
    for (var e = "", t = 0; t < this.children.length; t++) e += this.children[t].toMarkup();
    return e;
  }
  toText() {
    return this.children.map((e) => {
      if (h5(e)) return e.toText();
      throw new Error("Expected MathDomNode with toText, got " + e.constructor.name);
    }).join("");
  }
}
var ha = { pt: 1, mm: 7227 / 2540, cm: 7227 / 254, in: 72.27, bp: 803 / 800, pc: 12, dd: 1238 / 1157, cc: 14856 / 1157, nd: 685 / 642, nc: 1370 / 107, sp: 1 / 65536, px: 803 / 800 }, m5 = { ex: true, em: true, mu: true }, Ri = function(e) {
  return typeof e != "string" && (e = e.unit), e in ha || e in m5 || e === "ex";
}, M0 = function(e, t) {
  var a;
  if (e.unit in ha) a = ha[e.unit] / t.fontMetrics().ptPerEm / t.sizeMultiplier;
  else if (e.unit === "mu") a = t.fontMetrics().cssEmPerMu;
  else {
    var n;
    if (t.style.isTight() ? n = t.havingStyle(t.style.text()) : n = t, e.unit === "ex") a = n.fontMetrics().xHeight;
    else if (e.unit === "em") a = n.fontMetrics().quad;
    else throw new $("Invalid unit: '" + e.unit + "'");
    n !== t && (a *= n.sizeMultiplier / t.sizeMultiplier);
  }
  return Math.min(e.number * a, t.maxSize);
}, U = function(e) {
  return +e.toFixed(4) + "em";
}, nt = function(e) {
  return e.filter((t) => t).join(" ");
}, Xa = function(e) {
  var t = "";
  for (var a of Object.keys(e)) {
    var n = e[a];
    n !== void 0 && (t += H2(a) + ":" + n + ";");
  }
  return t;
}, Ii = function(e, t, a) {
  if (this.classes = e || [], this.attributes = {}, this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = a || {}, t) {
    t.style.isTight() && this.classes.push("mtight");
    var n = t.getColor();
    n && (this.style.color = n);
  }
}, Fi = function(e) {
  var t = document.createElement(e);
  t.className = nt(this.classes), Object.assign(t.style, this.style);
  for (var a of Object.keys(this.attributes)) t.setAttribute(a, this.attributes[a]);
  for (var n = 0; n < this.children.length; n++) t.appendChild(this.children[n].toNode());
  return t;
}, c5 = /[\s"'>/=\x00-\x1f]/, Oi = function(e) {
  var t = "<" + e;
  this.classes.length && (t += ' class="' + V0(nt(this.classes)) + '"');
  var a = Xa(this.style);
  a && (t += ' style="' + V0(a) + '"');
  for (var n of Object.keys(this.attributes)) {
    if (c5.test(n)) throw new $("Invalid attribute name '" + n + "'");
    t += " " + n + '="' + V0(this.attributes[n]) + '"';
  }
  t += ">";
  for (var i = 0; i < this.children.length; i++) t += this.children[i].toMarkup();
  return t += "</" + e + ">", t;
};
class It {
  constructor(e, t, a, n) {
    this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.width = void 0, this.maxFontSize = void 0, this.style = void 0, this.italic = void 0, Ii.call(this, e, a, n), this.children = t || [];
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    return Fi.call(this, "span");
  }
  toMarkup() {
    return Oi.call(this, "span");
  }
}
class Yr {
  constructor(e, t, a, n) {
    this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, Ii.call(this, t, n), this.children = a || [], this.setAttribute("href", e);
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    return Fi.call(this, "a");
  }
  toMarkup() {
    return Oi.call(this, "a");
  }
}
class d5 {
  constructor(e, t, a) {
    this.src = void 0, this.alt = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.alt = t, this.src = e, this.classes = ["mord"], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = a;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    var e = document.createElement("img");
    return e.src = this.src, e.alt = this.alt, e.className = "mord", Object.assign(e.style, this.style), e;
  }
  toMarkup() {
    var e = '<img src="' + V0(this.src) + '"' + (' alt="' + V0(this.alt) + '"'), t = Xa(this.style);
    return t && (e += ' style="' + V0(t) + '"'), e += "'/>", e;
  }
}
var f5 = { \u00EE: "\u0131\u0302", \u00EF: "\u0131\u0308", \u00ED: "\u0131\u0301", \u00EC: "\u0131\u0300" };
class le {
  constructor(e, t, a, n, i, s, l, h) {
    this.text = void 0, this.height = void 0, this.depth = void 0, this.italic = void 0, this.skew = void 0, this.width = void 0, this.maxFontSize = void 0, this.classes = void 0, this.style = void 0, this.text = e, this.height = t || 0, this.depth = a || 0, this.italic = n || 0, this.skew = i || 0, this.width = s || 0, this.classes = l || [], this.style = h || {}, this.maxFontSize = 0;
    var d = _2(this.text.charCodeAt(0));
    d && this.classes.push(d + "_fallback"), /[îïíì]/.test(this.text) && (this.text = f5[this.text]);
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    var e = document.createTextNode(this.text), t = null;
    return this.italic > 0 && (t = document.createElement("span"), t.style.marginRight = U(this.italic)), this.classes.length > 0 && (t = t || document.createElement("span"), t.className = nt(this.classes)), Object.keys(this.style).length > 0 && (t = t || document.createElement("span"), Object.assign(t.style, this.style)), t ? (t.appendChild(e), t) : e;
  }
  toMarkup() {
    var e = false, t = "<span";
    this.classes.length && (e = true, t += ' class="', t += V0(nt(this.classes)), t += '"');
    var a = "";
    this.italic > 0 && (a += "margin-right:" + U(this.italic) + ";"), a += Xa(this.style), a && (e = true, t += ' style="' + V0(a) + '"');
    var n = V0(this.text);
    return e ? (t += ">", t += n, t += "</span>", t) : n;
  }
}
class Pe {
  constructor(e, t) {
    this.children = void 0, this.attributes = void 0, this.children = e || [], this.attributes = t || {};
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "svg");
    for (var a of Object.keys(this.attributes)) t.setAttribute(a, this.attributes[a]);
    for (var n = 0; n < this.children.length; n++) t.appendChild(this.children[n].toNode());
    return t;
  }
  toMarkup() {
    var e = '<svg xmlns="http://www.w3.org/2000/svg"';
    for (var t of Object.keys(this.attributes)) e += " " + t + '="' + V0(this.attributes[t]) + '"';
    e += ">";
    for (var a = 0; a < this.children.length; a++) e += this.children[a].toMarkup();
    return e += "</svg>", e;
  }
}
class it {
  constructor(e, t) {
    this.pathName = void 0, this.alternate = void 0, this.pathName = e, this.alternate = t;
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "path");
    return this.alternate ? t.setAttribute("d", this.alternate) : t.setAttribute("d", X4[this.pathName]), t;
  }
  toMarkup() {
    return this.alternate ? '<path d="' + V0(this.alternate) + '"/>' : '<path d="' + V0(X4[this.pathName]) + '"/>';
  }
}
class ma {
  constructor(e) {
    this.attributes = void 0, this.attributes = e || {};
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "line");
    for (var a of Object.keys(this.attributes)) t.setAttribute(a, this.attributes[a]);
    return t;
  }
  toMarkup() {
    var e = "<line";
    for (var t of Object.keys(this.attributes)) e += " " + t + '="' + V0(this.attributes[t]) + '"';
    return e += "/>", e;
  }
}
function v5(r) {
  if (r instanceof le) return r;
  throw new Error("Expected symbolNode but got " + String(r) + ".");
}
function p5(r) {
  if (r instanceof It) return r;
  throw new Error("Expected span<HtmlDomNode> but got " + String(r) + ".");
}
var g5 = (r) => r instanceof It || r instanceof Yr || r instanceof Rt, ke = { "AMS-Regular": { 32: [0, 0, 0, 0, 0.25], 65: [0, 0.68889, 0, 0, 0.72222], 66: [0, 0.68889, 0, 0, 0.66667], 67: [0, 0.68889, 0, 0, 0.72222], 68: [0, 0.68889, 0, 0, 0.72222], 69: [0, 0.68889, 0, 0, 0.66667], 70: [0, 0.68889, 0, 0, 0.61111], 71: [0, 0.68889, 0, 0, 0.77778], 72: [0, 0.68889, 0, 0, 0.77778], 73: [0, 0.68889, 0, 0, 0.38889], 74: [0.16667, 0.68889, 0, 0, 0.5], 75: [0, 0.68889, 0, 0, 0.77778], 76: [0, 0.68889, 0, 0, 0.66667], 77: [0, 0.68889, 0, 0, 0.94445], 78: [0, 0.68889, 0, 0, 0.72222], 79: [0.16667, 0.68889, 0, 0, 0.77778], 80: [0, 0.68889, 0, 0, 0.61111], 81: [0.16667, 0.68889, 0, 0, 0.77778], 82: [0, 0.68889, 0, 0, 0.72222], 83: [0, 0.68889, 0, 0, 0.55556], 84: [0, 0.68889, 0, 0, 0.66667], 85: [0, 0.68889, 0, 0, 0.72222], 86: [0, 0.68889, 0, 0, 0.72222], 87: [0, 0.68889, 0, 0, 1], 88: [0, 0.68889, 0, 0, 0.72222], 89: [0, 0.68889, 0, 0, 0.72222], 90: [0, 0.68889, 0, 0, 0.66667], 107: [0, 0.68889, 0, 0, 0.55556], 160: [0, 0, 0, 0, 0.25], 165: [0, 0.675, 0.025, 0, 0.75], 174: [0.15559, 0.69224, 0, 0, 0.94666], 240: [0, 0.68889, 0, 0, 0.55556], 295: [0, 0.68889, 0, 0, 0.54028], 710: [0, 0.825, 0, 0, 2.33334], 732: [0, 0.9, 0, 0, 2.33334], 770: [0, 0.825, 0, 0, 2.33334], 771: [0, 0.9, 0, 0, 2.33334], 989: [0.08167, 0.58167, 0, 0, 0.77778], 1008: [0, 0.43056, 0.04028, 0, 0.66667], 8245: [0, 0.54986, 0, 0, 0.275], 8463: [0, 0.68889, 0, 0, 0.54028], 8487: [0, 0.68889, 0, 0, 0.72222], 8498: [0, 0.68889, 0, 0, 0.55556], 8502: [0, 0.68889, 0, 0, 0.66667], 8503: [0, 0.68889, 0, 0, 0.44445], 8504: [0, 0.68889, 0, 0, 0.66667], 8513: [0, 0.68889, 0, 0, 0.63889], 8592: [-0.03598, 0.46402, 0, 0, 0.5], 8594: [-0.03598, 0.46402, 0, 0, 0.5], 8602: [-0.13313, 0.36687, 0, 0, 1], 8603: [-0.13313, 0.36687, 0, 0, 1], 8606: [0.01354, 0.52239, 0, 0, 1], 8608: [0.01354, 0.52239, 0, 0, 1], 8610: [0.01354, 0.52239, 0, 0, 1.11111], 8611: [0.01354, 0.52239, 0, 0, 1.11111], 8619: [0, 0.54986, 0, 0, 1], 8620: [0, 0.54986, 0, 0, 1], 8621: [-0.13313, 0.37788, 0, 0, 1.38889], 8622: [-0.13313, 0.36687, 0, 0, 1], 8624: [0, 0.69224, 0, 0, 0.5], 8625: [0, 0.69224, 0, 0, 0.5], 8630: [0, 0.43056, 0, 0, 1], 8631: [0, 0.43056, 0, 0, 1], 8634: [0.08198, 0.58198, 0, 0, 0.77778], 8635: [0.08198, 0.58198, 0, 0, 0.77778], 8638: [0.19444, 0.69224, 0, 0, 0.41667], 8639: [0.19444, 0.69224, 0, 0, 0.41667], 8642: [0.19444, 0.69224, 0, 0, 0.41667], 8643: [0.19444, 0.69224, 0, 0, 0.41667], 8644: [0.1808, 0.675, 0, 0, 1], 8646: [0.1808, 0.675, 0, 0, 1], 8647: [0.1808, 0.675, 0, 0, 1], 8648: [0.19444, 0.69224, 0, 0, 0.83334], 8649: [0.1808, 0.675, 0, 0, 1], 8650: [0.19444, 0.69224, 0, 0, 0.83334], 8651: [0.01354, 0.52239, 0, 0, 1], 8652: [0.01354, 0.52239, 0, 0, 1], 8653: [-0.13313, 0.36687, 0, 0, 1], 8654: [-0.13313, 0.36687, 0, 0, 1], 8655: [-0.13313, 0.36687, 0, 0, 1], 8666: [0.13667, 0.63667, 0, 0, 1], 8667: [0.13667, 0.63667, 0, 0, 1], 8669: [-0.13313, 0.37788, 0, 0, 1], 8672: [-0.064, 0.437, 0, 0, 1.334], 8674: [-0.064, 0.437, 0, 0, 1.334], 8705: [0, 0.825, 0, 0, 0.5], 8708: [0, 0.68889, 0, 0, 0.55556], 8709: [0.08167, 0.58167, 0, 0, 0.77778], 8717: [0, 0.43056, 0, 0, 0.42917], 8722: [-0.03598, 0.46402, 0, 0, 0.5], 8724: [0.08198, 0.69224, 0, 0, 0.77778], 8726: [0.08167, 0.58167, 0, 0, 0.77778], 8733: [0, 0.69224, 0, 0, 0.77778], 8736: [0, 0.69224, 0, 0, 0.72222], 8737: [0, 0.69224, 0, 0, 0.72222], 8738: [0.03517, 0.52239, 0, 0, 0.72222], 8739: [0.08167, 0.58167, 0, 0, 0.22222], 8740: [0.25142, 0.74111, 0, 0, 0.27778], 8741: [0.08167, 0.58167, 0, 0, 0.38889], 8742: [0.25142, 0.74111, 0, 0, 0.5], 8756: [0, 0.69224, 0, 0, 0.66667], 8757: [0, 0.69224, 0, 0, 0.66667], 8764: [-0.13313, 0.36687, 0, 0, 0.77778], 8765: [-0.13313, 0.37788, 0, 0, 0.77778], 8769: [-0.13313, 0.36687, 0, 0, 0.77778], 8770: [-0.03625, 0.46375, 0, 0, 0.77778], 8774: [0.30274, 0.79383, 0, 0, 0.77778], 8776: [-0.01688, 0.48312, 0, 0, 0.77778], 8778: [0.08167, 0.58167, 0, 0, 0.77778], 8782: [0.06062, 0.54986, 0, 0, 0.77778], 8783: [0.06062, 0.54986, 0, 0, 0.77778], 8785: [0.08198, 0.58198, 0, 0, 0.77778], 8786: [0.08198, 0.58198, 0, 0, 0.77778], 8787: [0.08198, 0.58198, 0, 0, 0.77778], 8790: [0, 0.69224, 0, 0, 0.77778], 8791: [0.22958, 0.72958, 0, 0, 0.77778], 8796: [0.08198, 0.91667, 0, 0, 0.77778], 8806: [0.25583, 0.75583, 0, 0, 0.77778], 8807: [0.25583, 0.75583, 0, 0, 0.77778], 8808: [0.25142, 0.75726, 0, 0, 0.77778], 8809: [0.25142, 0.75726, 0, 0, 0.77778], 8812: [0.25583, 0.75583, 0, 0, 0.5], 8814: [0.20576, 0.70576, 0, 0, 0.77778], 8815: [0.20576, 0.70576, 0, 0, 0.77778], 8816: [0.30274, 0.79383, 0, 0, 0.77778], 8817: [0.30274, 0.79383, 0, 0, 0.77778], 8818: [0.22958, 0.72958, 0, 0, 0.77778], 8819: [0.22958, 0.72958, 0, 0, 0.77778], 8822: [0.1808, 0.675, 0, 0, 0.77778], 8823: [0.1808, 0.675, 0, 0, 0.77778], 8828: [0.13667, 0.63667, 0, 0, 0.77778], 8829: [0.13667, 0.63667, 0, 0, 0.77778], 8830: [0.22958, 0.72958, 0, 0, 0.77778], 8831: [0.22958, 0.72958, 0, 0, 0.77778], 8832: [0.20576, 0.70576, 0, 0, 0.77778], 8833: [0.20576, 0.70576, 0, 0, 0.77778], 8840: [0.30274, 0.79383, 0, 0, 0.77778], 8841: [0.30274, 0.79383, 0, 0, 0.77778], 8842: [0.13597, 0.63597, 0, 0, 0.77778], 8843: [0.13597, 0.63597, 0, 0, 0.77778], 8847: [0.03517, 0.54986, 0, 0, 0.77778], 8848: [0.03517, 0.54986, 0, 0, 0.77778], 8858: [0.08198, 0.58198, 0, 0, 0.77778], 8859: [0.08198, 0.58198, 0, 0, 0.77778], 8861: [0.08198, 0.58198, 0, 0, 0.77778], 8862: [0, 0.675, 0, 0, 0.77778], 8863: [0, 0.675, 0, 0, 0.77778], 8864: [0, 0.675, 0, 0, 0.77778], 8865: [0, 0.675, 0, 0, 0.77778], 8872: [0, 0.69224, 0, 0, 0.61111], 8873: [0, 0.69224, 0, 0, 0.72222], 8874: [0, 0.69224, 0, 0, 0.88889], 8876: [0, 0.68889, 0, 0, 0.61111], 8877: [0, 0.68889, 0, 0, 0.61111], 8878: [0, 0.68889, 0, 0, 0.72222], 8879: [0, 0.68889, 0, 0, 0.72222], 8882: [0.03517, 0.54986, 0, 0, 0.77778], 8883: [0.03517, 0.54986, 0, 0, 0.77778], 8884: [0.13667, 0.63667, 0, 0, 0.77778], 8885: [0.13667, 0.63667, 0, 0, 0.77778], 8888: [0, 0.54986, 0, 0, 1.11111], 8890: [0.19444, 0.43056, 0, 0, 0.55556], 8891: [0.19444, 0.69224, 0, 0, 0.61111], 8892: [0.19444, 0.69224, 0, 0, 0.61111], 8901: [0, 0.54986, 0, 0, 0.27778], 8903: [0.08167, 0.58167, 0, 0, 0.77778], 8905: [0.08167, 0.58167, 0, 0, 0.77778], 8906: [0.08167, 0.58167, 0, 0, 0.77778], 8907: [0, 0.69224, 0, 0, 0.77778], 8908: [0, 0.69224, 0, 0, 0.77778], 8909: [-0.03598, 0.46402, 0, 0, 0.77778], 8910: [0, 0.54986, 0, 0, 0.76042], 8911: [0, 0.54986, 0, 0, 0.76042], 8912: [0.03517, 0.54986, 0, 0, 0.77778], 8913: [0.03517, 0.54986, 0, 0, 0.77778], 8914: [0, 0.54986, 0, 0, 0.66667], 8915: [0, 0.54986, 0, 0, 0.66667], 8916: [0, 0.69224, 0, 0, 0.66667], 8918: [0.0391, 0.5391, 0, 0, 0.77778], 8919: [0.0391, 0.5391, 0, 0, 0.77778], 8920: [0.03517, 0.54986, 0, 0, 1.33334], 8921: [0.03517, 0.54986, 0, 0, 1.33334], 8922: [0.38569, 0.88569, 0, 0, 0.77778], 8923: [0.38569, 0.88569, 0, 0, 0.77778], 8926: [0.13667, 0.63667, 0, 0, 0.77778], 8927: [0.13667, 0.63667, 0, 0, 0.77778], 8928: [0.30274, 0.79383, 0, 0, 0.77778], 8929: [0.30274, 0.79383, 0, 0, 0.77778], 8934: [0.23222, 0.74111, 0, 0, 0.77778], 8935: [0.23222, 0.74111, 0, 0, 0.77778], 8936: [0.23222, 0.74111, 0, 0, 0.77778], 8937: [0.23222, 0.74111, 0, 0, 0.77778], 8938: [0.20576, 0.70576, 0, 0, 0.77778], 8939: [0.20576, 0.70576, 0, 0, 0.77778], 8940: [0.30274, 0.79383, 0, 0, 0.77778], 8941: [0.30274, 0.79383, 0, 0, 0.77778], 8994: [0.19444, 0.69224, 0, 0, 0.77778], 8995: [0.19444, 0.69224, 0, 0, 0.77778], 9416: [0.15559, 0.69224, 0, 0, 0.90222], 9484: [0, 0.69224, 0, 0, 0.5], 9488: [0, 0.69224, 0, 0, 0.5], 9492: [0, 0.37788, 0, 0, 0.5], 9496: [0, 0.37788, 0, 0, 0.5], 9585: [0.19444, 0.68889, 0, 0, 0.88889], 9586: [0.19444, 0.74111, 0, 0, 0.88889], 9632: [0, 0.675, 0, 0, 0.77778], 9633: [0, 0.675, 0, 0, 0.77778], 9650: [0, 0.54986, 0, 0, 0.72222], 9651: [0, 0.54986, 0, 0, 0.72222], 9654: [0.03517, 0.54986, 0, 0, 0.77778], 9660: [0, 0.54986, 0, 0, 0.72222], 9661: [0, 0.54986, 0, 0, 0.72222], 9664: [0.03517, 0.54986, 0, 0, 0.77778], 9674: [0.11111, 0.69224, 0, 0, 0.66667], 9733: [0.19444, 0.69224, 0, 0, 0.94445], 10003: [0, 0.69224, 0, 0, 0.83334], 10016: [0, 0.69224, 0, 0, 0.83334], 10731: [0.11111, 0.69224, 0, 0, 0.66667], 10846: [0.19444, 0.75583, 0, 0, 0.61111], 10877: [0.13667, 0.63667, 0, 0, 0.77778], 10878: [0.13667, 0.63667, 0, 0, 0.77778], 10885: [0.25583, 0.75583, 0, 0, 0.77778], 10886: [0.25583, 0.75583, 0, 0, 0.77778], 10887: [0.13597, 0.63597, 0, 0, 0.77778], 10888: [0.13597, 0.63597, 0, 0, 0.77778], 10889: [0.26167, 0.75726, 0, 0, 0.77778], 10890: [0.26167, 0.75726, 0, 0, 0.77778], 10891: [0.48256, 0.98256, 0, 0, 0.77778], 10892: [0.48256, 0.98256, 0, 0, 0.77778], 10901: [0.13667, 0.63667, 0, 0, 0.77778], 10902: [0.13667, 0.63667, 0, 0, 0.77778], 10933: [0.25142, 0.75726, 0, 0, 0.77778], 10934: [0.25142, 0.75726, 0, 0, 0.77778], 10935: [0.26167, 0.75726, 0, 0, 0.77778], 10936: [0.26167, 0.75726, 0, 0, 0.77778], 10937: [0.26167, 0.75726, 0, 0, 0.77778], 10938: [0.26167, 0.75726, 0, 0, 0.77778], 10949: [0.25583, 0.75583, 0, 0, 0.77778], 10950: [0.25583, 0.75583, 0, 0, 0.77778], 10955: [0.28481, 0.79383, 0, 0, 0.77778], 10956: [0.28481, 0.79383, 0, 0, 0.77778], 57350: [0.08167, 0.58167, 0, 0, 0.22222], 57351: [0.08167, 0.58167, 0, 0, 0.38889], 57352: [0.08167, 0.58167, 0, 0, 0.77778], 57353: [0, 0.43056, 0.04028, 0, 0.66667], 57356: [0.25142, 0.75726, 0, 0, 0.77778], 57357: [0.25142, 0.75726, 0, 0, 0.77778], 57358: [0.41951, 0.91951, 0, 0, 0.77778], 57359: [0.30274, 0.79383, 0, 0, 0.77778], 57360: [0.30274, 0.79383, 0, 0, 0.77778], 57361: [0.41951, 0.91951, 0, 0, 0.77778], 57366: [0.25142, 0.75726, 0, 0, 0.77778], 57367: [0.25142, 0.75726, 0, 0, 0.77778], 57368: [0.25142, 0.75726, 0, 0, 0.77778], 57369: [0.25142, 0.75726, 0, 0, 0.77778], 57370: [0.13597, 0.63597, 0, 0, 0.77778], 57371: [0.13597, 0.63597, 0, 0, 0.77778] }, "Caligraphic-Regular": { 32: [0, 0, 0, 0, 0.25], 65: [0, 0.68333, 0, 0.19445, 0.79847], 66: [0, 0.68333, 0.03041, 0.13889, 0.65681], 67: [0, 0.68333, 0.05834, 0.13889, 0.52653], 68: [0, 0.68333, 0.02778, 0.08334, 0.77139], 69: [0, 0.68333, 0.08944, 0.11111, 0.52778], 70: [0, 0.68333, 0.09931, 0.11111, 0.71875], 71: [0.09722, 0.68333, 0.0593, 0.11111, 0.59487], 72: [0, 0.68333, 965e-5, 0.11111, 0.84452], 73: [0, 0.68333, 0.07382, 0, 0.54452], 74: [0.09722, 0.68333, 0.18472, 0.16667, 0.67778], 75: [0, 0.68333, 0.01445, 0.05556, 0.76195], 76: [0, 0.68333, 0, 0.13889, 0.68972], 77: [0, 0.68333, 0, 0.13889, 1.2009], 78: [0, 0.68333, 0.14736, 0.08334, 0.82049], 79: [0, 0.68333, 0.02778, 0.11111, 0.79611], 80: [0, 0.68333, 0.08222, 0.08334, 0.69556], 81: [0.09722, 0.68333, 0, 0.11111, 0.81667], 82: [0, 0.68333, 0, 0.08334, 0.8475], 83: [0, 0.68333, 0.075, 0.13889, 0.60556], 84: [0, 0.68333, 0.25417, 0, 0.54464], 85: [0, 0.68333, 0.09931, 0.08334, 0.62583], 86: [0, 0.68333, 0.08222, 0, 0.61278], 87: [0, 0.68333, 0.08222, 0.08334, 0.98778], 88: [0, 0.68333, 0.14643, 0.13889, 0.7133], 89: [0.09722, 0.68333, 0.08222, 0.08334, 0.66834], 90: [0, 0.68333, 0.07944, 0.13889, 0.72473], 160: [0, 0, 0, 0, 0.25] }, "Fraktur-Regular": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69141, 0, 0, 0.29574], 34: [0, 0.69141, 0, 0, 0.21471], 38: [0, 0.69141, 0, 0, 0.73786], 39: [0, 0.69141, 0, 0, 0.21201], 40: [0.24982, 0.74947, 0, 0, 0.38865], 41: [0.24982, 0.74947, 0, 0, 0.38865], 42: [0, 0.62119, 0, 0, 0.27764], 43: [0.08319, 0.58283, 0, 0, 0.75623], 44: [0, 0.10803, 0, 0, 0.27764], 45: [0.08319, 0.58283, 0, 0, 0.75623], 46: [0, 0.10803, 0, 0, 0.27764], 47: [0.24982, 0.74947, 0, 0, 0.50181], 48: [0, 0.47534, 0, 0, 0.50181], 49: [0, 0.47534, 0, 0, 0.50181], 50: [0, 0.47534, 0, 0, 0.50181], 51: [0.18906, 0.47534, 0, 0, 0.50181], 52: [0.18906, 0.47534, 0, 0, 0.50181], 53: [0.18906, 0.47534, 0, 0, 0.50181], 54: [0, 0.69141, 0, 0, 0.50181], 55: [0.18906, 0.47534, 0, 0, 0.50181], 56: [0, 0.69141, 0, 0, 0.50181], 57: [0.18906, 0.47534, 0, 0, 0.50181], 58: [0, 0.47534, 0, 0, 0.21606], 59: [0.12604, 0.47534, 0, 0, 0.21606], 61: [-0.13099, 0.36866, 0, 0, 0.75623], 63: [0, 0.69141, 0, 0, 0.36245], 65: [0, 0.69141, 0, 0, 0.7176], 66: [0, 0.69141, 0, 0, 0.88397], 67: [0, 0.69141, 0, 0, 0.61254], 68: [0, 0.69141, 0, 0, 0.83158], 69: [0, 0.69141, 0, 0, 0.66278], 70: [0.12604, 0.69141, 0, 0, 0.61119], 71: [0, 0.69141, 0, 0, 0.78539], 72: [0.06302, 0.69141, 0, 0, 0.7203], 73: [0, 0.69141, 0, 0, 0.55448], 74: [0.12604, 0.69141, 0, 0, 0.55231], 75: [0, 0.69141, 0, 0, 0.66845], 76: [0, 0.69141, 0, 0, 0.66602], 77: [0, 0.69141, 0, 0, 1.04953], 78: [0, 0.69141, 0, 0, 0.83212], 79: [0, 0.69141, 0, 0, 0.82699], 80: [0.18906, 0.69141, 0, 0, 0.82753], 81: [0.03781, 0.69141, 0, 0, 0.82699], 82: [0, 0.69141, 0, 0, 0.82807], 83: [0, 0.69141, 0, 0, 0.82861], 84: [0, 0.69141, 0, 0, 0.66899], 85: [0, 0.69141, 0, 0, 0.64576], 86: [0, 0.69141, 0, 0, 0.83131], 87: [0, 0.69141, 0, 0, 1.04602], 88: [0, 0.69141, 0, 0, 0.71922], 89: [0.18906, 0.69141, 0, 0, 0.83293], 90: [0.12604, 0.69141, 0, 0, 0.60201], 91: [0.24982, 0.74947, 0, 0, 0.27764], 93: [0.24982, 0.74947, 0, 0, 0.27764], 94: [0, 0.69141, 0, 0, 0.49965], 97: [0, 0.47534, 0, 0, 0.50046], 98: [0, 0.69141, 0, 0, 0.51315], 99: [0, 0.47534, 0, 0, 0.38946], 100: [0, 0.62119, 0, 0, 0.49857], 101: [0, 0.47534, 0, 0, 0.40053], 102: [0.18906, 0.69141, 0, 0, 0.32626], 103: [0.18906, 0.47534, 0, 0, 0.5037], 104: [0.18906, 0.69141, 0, 0, 0.52126], 105: [0, 0.69141, 0, 0, 0.27899], 106: [0, 0.69141, 0, 0, 0.28088], 107: [0, 0.69141, 0, 0, 0.38946], 108: [0, 0.69141, 0, 0, 0.27953], 109: [0, 0.47534, 0, 0, 0.76676], 110: [0, 0.47534, 0, 0, 0.52666], 111: [0, 0.47534, 0, 0, 0.48885], 112: [0.18906, 0.52396, 0, 0, 0.50046], 113: [0.18906, 0.47534, 0, 0, 0.48912], 114: [0, 0.47534, 0, 0, 0.38919], 115: [0, 0.47534, 0, 0, 0.44266], 116: [0, 0.62119, 0, 0, 0.33301], 117: [0, 0.47534, 0, 0, 0.5172], 118: [0, 0.52396, 0, 0, 0.5118], 119: [0, 0.52396, 0, 0, 0.77351], 120: [0.18906, 0.47534, 0, 0, 0.38865], 121: [0.18906, 0.47534, 0, 0, 0.49884], 122: [0.18906, 0.47534, 0, 0, 0.39054], 160: [0, 0, 0, 0, 0.25], 8216: [0, 0.69141, 0, 0, 0.21471], 8217: [0, 0.69141, 0, 0, 0.21471], 58112: [0, 0.62119, 0, 0, 0.49749], 58113: [0, 0.62119, 0, 0, 0.4983], 58114: [0.18906, 0.69141, 0, 0, 0.33328], 58115: [0.18906, 0.69141, 0, 0, 0.32923], 58116: [0.18906, 0.47534, 0, 0, 0.50343], 58117: [0, 0.69141, 0, 0, 0.33301], 58118: [0, 0.62119, 0, 0, 0.33409], 58119: [0, 0.47534, 0, 0, 0.50073] }, "Main-Bold": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.35], 34: [0, 0.69444, 0, 0, 0.60278], 35: [0.19444, 0.69444, 0, 0, 0.95833], 36: [0.05556, 0.75, 0, 0, 0.575], 37: [0.05556, 0.75, 0, 0, 0.95833], 38: [0, 0.69444, 0, 0, 0.89444], 39: [0, 0.69444, 0, 0, 0.31944], 40: [0.25, 0.75, 0, 0, 0.44722], 41: [0.25, 0.75, 0, 0, 0.44722], 42: [0, 0.75, 0, 0, 0.575], 43: [0.13333, 0.63333, 0, 0, 0.89444], 44: [0.19444, 0.15556, 0, 0, 0.31944], 45: [0, 0.44444, 0, 0, 0.38333], 46: [0, 0.15556, 0, 0, 0.31944], 47: [0.25, 0.75, 0, 0, 0.575], 48: [0, 0.64444, 0, 0, 0.575], 49: [0, 0.64444, 0, 0, 0.575], 50: [0, 0.64444, 0, 0, 0.575], 51: [0, 0.64444, 0, 0, 0.575], 52: [0, 0.64444, 0, 0, 0.575], 53: [0, 0.64444, 0, 0, 0.575], 54: [0, 0.64444, 0, 0, 0.575], 55: [0, 0.64444, 0, 0, 0.575], 56: [0, 0.64444, 0, 0, 0.575], 57: [0, 0.64444, 0, 0, 0.575], 58: [0, 0.44444, 0, 0, 0.31944], 59: [0.19444, 0.44444, 0, 0, 0.31944], 60: [0.08556, 0.58556, 0, 0, 0.89444], 61: [-0.10889, 0.39111, 0, 0, 0.89444], 62: [0.08556, 0.58556, 0, 0, 0.89444], 63: [0, 0.69444, 0, 0, 0.54305], 64: [0, 0.69444, 0, 0, 0.89444], 65: [0, 0.68611, 0, 0, 0.86944], 66: [0, 0.68611, 0, 0, 0.81805], 67: [0, 0.68611, 0, 0, 0.83055], 68: [0, 0.68611, 0, 0, 0.88194], 69: [0, 0.68611, 0, 0, 0.75555], 70: [0, 0.68611, 0, 0, 0.72361], 71: [0, 0.68611, 0, 0, 0.90416], 72: [0, 0.68611, 0, 0, 0.9], 73: [0, 0.68611, 0, 0, 0.43611], 74: [0, 0.68611, 0, 0, 0.59444], 75: [0, 0.68611, 0, 0, 0.90138], 76: [0, 0.68611, 0, 0, 0.69166], 77: [0, 0.68611, 0, 0, 1.09166], 78: [0, 0.68611, 0, 0, 0.9], 79: [0, 0.68611, 0, 0, 0.86388], 80: [0, 0.68611, 0, 0, 0.78611], 81: [0.19444, 0.68611, 0, 0, 0.86388], 82: [0, 0.68611, 0, 0, 0.8625], 83: [0, 0.68611, 0, 0, 0.63889], 84: [0, 0.68611, 0, 0, 0.8], 85: [0, 0.68611, 0, 0, 0.88472], 86: [0, 0.68611, 0.01597, 0, 0.86944], 87: [0, 0.68611, 0.01597, 0, 1.18888], 88: [0, 0.68611, 0, 0, 0.86944], 89: [0, 0.68611, 0.02875, 0, 0.86944], 90: [0, 0.68611, 0, 0, 0.70277], 91: [0.25, 0.75, 0, 0, 0.31944], 92: [0.25, 0.75, 0, 0, 0.575], 93: [0.25, 0.75, 0, 0, 0.31944], 94: [0, 0.69444, 0, 0, 0.575], 95: [0.31, 0.13444, 0.03194, 0, 0.575], 97: [0, 0.44444, 0, 0, 0.55902], 98: [0, 0.69444, 0, 0, 0.63889], 99: [0, 0.44444, 0, 0, 0.51111], 100: [0, 0.69444, 0, 0, 0.63889], 101: [0, 0.44444, 0, 0, 0.52708], 102: [0, 0.69444, 0.10903, 0, 0.35139], 103: [0.19444, 0.44444, 0.01597, 0, 0.575], 104: [0, 0.69444, 0, 0, 0.63889], 105: [0, 0.69444, 0, 0, 0.31944], 106: [0.19444, 0.69444, 0, 0, 0.35139], 107: [0, 0.69444, 0, 0, 0.60694], 108: [0, 0.69444, 0, 0, 0.31944], 109: [0, 0.44444, 0, 0, 0.95833], 110: [0, 0.44444, 0, 0, 0.63889], 111: [0, 0.44444, 0, 0, 0.575], 112: [0.19444, 0.44444, 0, 0, 0.63889], 113: [0.19444, 0.44444, 0, 0, 0.60694], 114: [0, 0.44444, 0, 0, 0.47361], 115: [0, 0.44444, 0, 0, 0.45361], 116: [0, 0.63492, 0, 0, 0.44722], 117: [0, 0.44444, 0, 0, 0.63889], 118: [0, 0.44444, 0.01597, 0, 0.60694], 119: [0, 0.44444, 0.01597, 0, 0.83055], 120: [0, 0.44444, 0, 0, 0.60694], 121: [0.19444, 0.44444, 0.01597, 0, 0.60694], 122: [0, 0.44444, 0, 0, 0.51111], 123: [0.25, 0.75, 0, 0, 0.575], 124: [0.25, 0.75, 0, 0, 0.31944], 125: [0.25, 0.75, 0, 0, 0.575], 126: [0.35, 0.34444, 0, 0, 0.575], 160: [0, 0, 0, 0, 0.25], 163: [0, 0.69444, 0, 0, 0.86853], 168: [0, 0.69444, 0, 0, 0.575], 172: [0, 0.44444, 0, 0, 0.76666], 176: [0, 0.69444, 0, 0, 0.86944], 177: [0.13333, 0.63333, 0, 0, 0.89444], 184: [0.17014, 0, 0, 0, 0.51111], 198: [0, 0.68611, 0, 0, 1.04166], 215: [0.13333, 0.63333, 0, 0, 0.89444], 216: [0.04861, 0.73472, 0, 0, 0.89444], 223: [0, 0.69444, 0, 0, 0.59722], 230: [0, 0.44444, 0, 0, 0.83055], 247: [0.13333, 0.63333, 0, 0, 0.89444], 248: [0.09722, 0.54167, 0, 0, 0.575], 305: [0, 0.44444, 0, 0, 0.31944], 338: [0, 0.68611, 0, 0, 1.16944], 339: [0, 0.44444, 0, 0, 0.89444], 567: [0.19444, 0.44444, 0, 0, 0.35139], 710: [0, 0.69444, 0, 0, 0.575], 711: [0, 0.63194, 0, 0, 0.575], 713: [0, 0.59611, 0, 0, 0.575], 714: [0, 0.69444, 0, 0, 0.575], 715: [0, 0.69444, 0, 0, 0.575], 728: [0, 0.69444, 0, 0, 0.575], 729: [0, 0.69444, 0, 0, 0.31944], 730: [0, 0.69444, 0, 0, 0.86944], 732: [0, 0.69444, 0, 0, 0.575], 733: [0, 0.69444, 0, 0, 0.575], 915: [0, 0.68611, 0, 0, 0.69166], 916: [0, 0.68611, 0, 0, 0.95833], 920: [0, 0.68611, 0, 0, 0.89444], 923: [0, 0.68611, 0, 0, 0.80555], 926: [0, 0.68611, 0, 0, 0.76666], 928: [0, 0.68611, 0, 0, 0.9], 931: [0, 0.68611, 0, 0, 0.83055], 933: [0, 0.68611, 0, 0, 0.89444], 934: [0, 0.68611, 0, 0, 0.83055], 936: [0, 0.68611, 0, 0, 0.89444], 937: [0, 0.68611, 0, 0, 0.83055], 8211: [0, 0.44444, 0.03194, 0, 0.575], 8212: [0, 0.44444, 0.03194, 0, 1.14999], 8216: [0, 0.69444, 0, 0, 0.31944], 8217: [0, 0.69444, 0, 0, 0.31944], 8220: [0, 0.69444, 0, 0, 0.60278], 8221: [0, 0.69444, 0, 0, 0.60278], 8224: [0.19444, 0.69444, 0, 0, 0.51111], 8225: [0.19444, 0.69444, 0, 0, 0.51111], 8242: [0, 0.55556, 0, 0, 0.34444], 8407: [0, 0.72444, 0.15486, 0, 0.575], 8463: [0, 0.69444, 0, 0, 0.66759], 8465: [0, 0.69444, 0, 0, 0.83055], 8467: [0, 0.69444, 0, 0, 0.47361], 8472: [0.19444, 0.44444, 0, 0, 0.74027], 8476: [0, 0.69444, 0, 0, 0.83055], 8501: [0, 0.69444, 0, 0, 0.70277], 8592: [-0.10889, 0.39111, 0, 0, 1.14999], 8593: [0.19444, 0.69444, 0, 0, 0.575], 8594: [-0.10889, 0.39111, 0, 0, 1.14999], 8595: [0.19444, 0.69444, 0, 0, 0.575], 8596: [-0.10889, 0.39111, 0, 0, 1.14999], 8597: [0.25, 0.75, 0, 0, 0.575], 8598: [0.19444, 0.69444, 0, 0, 1.14999], 8599: [0.19444, 0.69444, 0, 0, 1.14999], 8600: [0.19444, 0.69444, 0, 0, 1.14999], 8601: [0.19444, 0.69444, 0, 0, 1.14999], 8636: [-0.10889, 0.39111, 0, 0, 1.14999], 8637: [-0.10889, 0.39111, 0, 0, 1.14999], 8640: [-0.10889, 0.39111, 0, 0, 1.14999], 8641: [-0.10889, 0.39111, 0, 0, 1.14999], 8656: [-0.10889, 0.39111, 0, 0, 1.14999], 8657: [0.19444, 0.69444, 0, 0, 0.70277], 8658: [-0.10889, 0.39111, 0, 0, 1.14999], 8659: [0.19444, 0.69444, 0, 0, 0.70277], 8660: [-0.10889, 0.39111, 0, 0, 1.14999], 8661: [0.25, 0.75, 0, 0, 0.70277], 8704: [0, 0.69444, 0, 0, 0.63889], 8706: [0, 0.69444, 0.06389, 0, 0.62847], 8707: [0, 0.69444, 0, 0, 0.63889], 8709: [0.05556, 0.75, 0, 0, 0.575], 8711: [0, 0.68611, 0, 0, 0.95833], 8712: [0.08556, 0.58556, 0, 0, 0.76666], 8715: [0.08556, 0.58556, 0, 0, 0.76666], 8722: [0.13333, 0.63333, 0, 0, 0.89444], 8723: [0.13333, 0.63333, 0, 0, 0.89444], 8725: [0.25, 0.75, 0, 0, 0.575], 8726: [0.25, 0.75, 0, 0, 0.575], 8727: [-0.02778, 0.47222, 0, 0, 0.575], 8728: [-0.02639, 0.47361, 0, 0, 0.575], 8729: [-0.02639, 0.47361, 0, 0, 0.575], 8730: [0.18, 0.82, 0, 0, 0.95833], 8733: [0, 0.44444, 0, 0, 0.89444], 8734: [0, 0.44444, 0, 0, 1.14999], 8736: [0, 0.69224, 0, 0, 0.72222], 8739: [0.25, 0.75, 0, 0, 0.31944], 8741: [0.25, 0.75, 0, 0, 0.575], 8743: [0, 0.55556, 0, 0, 0.76666], 8744: [0, 0.55556, 0, 0, 0.76666], 8745: [0, 0.55556, 0, 0, 0.76666], 8746: [0, 0.55556, 0, 0, 0.76666], 8747: [0.19444, 0.69444, 0.12778, 0, 0.56875], 8764: [-0.10889, 0.39111, 0, 0, 0.89444], 8768: [0.19444, 0.69444, 0, 0, 0.31944], 8771: [222e-5, 0.50222, 0, 0, 0.89444], 8773: [0.027, 0.638, 0, 0, 0.894], 8776: [0.02444, 0.52444, 0, 0, 0.89444], 8781: [222e-5, 0.50222, 0, 0, 0.89444], 8801: [222e-5, 0.50222, 0, 0, 0.89444], 8804: [0.19667, 0.69667, 0, 0, 0.89444], 8805: [0.19667, 0.69667, 0, 0, 0.89444], 8810: [0.08556, 0.58556, 0, 0, 1.14999], 8811: [0.08556, 0.58556, 0, 0, 1.14999], 8826: [0.08556, 0.58556, 0, 0, 0.89444], 8827: [0.08556, 0.58556, 0, 0, 0.89444], 8834: [0.08556, 0.58556, 0, 0, 0.89444], 8835: [0.08556, 0.58556, 0, 0, 0.89444], 8838: [0.19667, 0.69667, 0, 0, 0.89444], 8839: [0.19667, 0.69667, 0, 0, 0.89444], 8846: [0, 0.55556, 0, 0, 0.76666], 8849: [0.19667, 0.69667, 0, 0, 0.89444], 8850: [0.19667, 0.69667, 0, 0, 0.89444], 8851: [0, 0.55556, 0, 0, 0.76666], 8852: [0, 0.55556, 0, 0, 0.76666], 8853: [0.13333, 0.63333, 0, 0, 0.89444], 8854: [0.13333, 0.63333, 0, 0, 0.89444], 8855: [0.13333, 0.63333, 0, 0, 0.89444], 8856: [0.13333, 0.63333, 0, 0, 0.89444], 8857: [0.13333, 0.63333, 0, 0, 0.89444], 8866: [0, 0.69444, 0, 0, 0.70277], 8867: [0, 0.69444, 0, 0, 0.70277], 8868: [0, 0.69444, 0, 0, 0.89444], 8869: [0, 0.69444, 0, 0, 0.89444], 8900: [-0.02639, 0.47361, 0, 0, 0.575], 8901: [-0.02639, 0.47361, 0, 0, 0.31944], 8902: [-0.02778, 0.47222, 0, 0, 0.575], 8968: [0.25, 0.75, 0, 0, 0.51111], 8969: [0.25, 0.75, 0, 0, 0.51111], 8970: [0.25, 0.75, 0, 0, 0.51111], 8971: [0.25, 0.75, 0, 0, 0.51111], 8994: [-0.13889, 0.36111, 0, 0, 1.14999], 8995: [-0.13889, 0.36111, 0, 0, 1.14999], 9651: [0.19444, 0.69444, 0, 0, 1.02222], 9657: [-0.02778, 0.47222, 0, 0, 0.575], 9661: [0.19444, 0.69444, 0, 0, 1.02222], 9667: [-0.02778, 0.47222, 0, 0, 0.575], 9711: [0.19444, 0.69444, 0, 0, 1.14999], 9824: [0.12963, 0.69444, 0, 0, 0.89444], 9825: [0.12963, 0.69444, 0, 0, 0.89444], 9826: [0.12963, 0.69444, 0, 0, 0.89444], 9827: [0.12963, 0.69444, 0, 0, 0.89444], 9837: [0, 0.75, 0, 0, 0.44722], 9838: [0.19444, 0.69444, 0, 0, 0.44722], 9839: [0.19444, 0.69444, 0, 0, 0.44722], 10216: [0.25, 0.75, 0, 0, 0.44722], 10217: [0.25, 0.75, 0, 0, 0.44722], 10815: [0, 0.68611, 0, 0, 0.9], 10927: [0.19667, 0.69667, 0, 0, 0.89444], 10928: [0.19667, 0.69667, 0, 0, 0.89444], 57376: [0.19444, 0.69444, 0, 0, 0] }, "Main-BoldItalic": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0.11417, 0, 0.38611], 34: [0, 0.69444, 0.07939, 0, 0.62055], 35: [0.19444, 0.69444, 0.06833, 0, 0.94444], 37: [0.05556, 0.75, 0.12861, 0, 0.94444], 38: [0, 0.69444, 0.08528, 0, 0.88555], 39: [0, 0.69444, 0.12945, 0, 0.35555], 40: [0.25, 0.75, 0.15806, 0, 0.47333], 41: [0.25, 0.75, 0.03306, 0, 0.47333], 42: [0, 0.75, 0.14333, 0, 0.59111], 43: [0.10333, 0.60333, 0.03306, 0, 0.88555], 44: [0.19444, 0.14722, 0, 0, 0.35555], 45: [0, 0.44444, 0.02611, 0, 0.41444], 46: [0, 0.14722, 0, 0, 0.35555], 47: [0.25, 0.75, 0.15806, 0, 0.59111], 48: [0, 0.64444, 0.13167, 0, 0.59111], 49: [0, 0.64444, 0.13167, 0, 0.59111], 50: [0, 0.64444, 0.13167, 0, 0.59111], 51: [0, 0.64444, 0.13167, 0, 0.59111], 52: [0.19444, 0.64444, 0.13167, 0, 0.59111], 53: [0, 0.64444, 0.13167, 0, 0.59111], 54: [0, 0.64444, 0.13167, 0, 0.59111], 55: [0.19444, 0.64444, 0.13167, 0, 0.59111], 56: [0, 0.64444, 0.13167, 0, 0.59111], 57: [0, 0.64444, 0.13167, 0, 0.59111], 58: [0, 0.44444, 0.06695, 0, 0.35555], 59: [0.19444, 0.44444, 0.06695, 0, 0.35555], 61: [-0.10889, 0.39111, 0.06833, 0, 0.88555], 63: [0, 0.69444, 0.11472, 0, 0.59111], 64: [0, 0.69444, 0.09208, 0, 0.88555], 65: [0, 0.68611, 0, 0, 0.86555], 66: [0, 0.68611, 0.0992, 0, 0.81666], 67: [0, 0.68611, 0.14208, 0, 0.82666], 68: [0, 0.68611, 0.09062, 0, 0.87555], 69: [0, 0.68611, 0.11431, 0, 0.75666], 70: [0, 0.68611, 0.12903, 0, 0.72722], 71: [0, 0.68611, 0.07347, 0, 0.89527], 72: [0, 0.68611, 0.17208, 0, 0.8961], 73: [0, 0.68611, 0.15681, 0, 0.47166], 74: [0, 0.68611, 0.145, 0, 0.61055], 75: [0, 0.68611, 0.14208, 0, 0.89499], 76: [0, 0.68611, 0, 0, 0.69777], 77: [0, 0.68611, 0.17208, 0, 1.07277], 78: [0, 0.68611, 0.17208, 0, 0.8961], 79: [0, 0.68611, 0.09062, 0, 0.85499], 80: [0, 0.68611, 0.0992, 0, 0.78721], 81: [0.19444, 0.68611, 0.09062, 0, 0.85499], 82: [0, 0.68611, 0.02559, 0, 0.85944], 83: [0, 0.68611, 0.11264, 0, 0.64999], 84: [0, 0.68611, 0.12903, 0, 0.7961], 85: [0, 0.68611, 0.17208, 0, 0.88083], 86: [0, 0.68611, 0.18625, 0, 0.86555], 87: [0, 0.68611, 0.18625, 0, 1.15999], 88: [0, 0.68611, 0.15681, 0, 0.86555], 89: [0, 0.68611, 0.19803, 0, 0.86555], 90: [0, 0.68611, 0.14208, 0, 0.70888], 91: [0.25, 0.75, 0.1875, 0, 0.35611], 93: [0.25, 0.75, 0.09972, 0, 0.35611], 94: [0, 0.69444, 0.06709, 0, 0.59111], 95: [0.31, 0.13444, 0.09811, 0, 0.59111], 97: [0, 0.44444, 0.09426, 0, 0.59111], 98: [0, 0.69444, 0.07861, 0, 0.53222], 99: [0, 0.44444, 0.05222, 0, 0.53222], 100: [0, 0.69444, 0.10861, 0, 0.59111], 101: [0, 0.44444, 0.085, 0, 0.53222], 102: [0.19444, 0.69444, 0.21778, 0, 0.4], 103: [0.19444, 0.44444, 0.105, 0, 0.53222], 104: [0, 0.69444, 0.09426, 0, 0.59111], 105: [0, 0.69326, 0.11387, 0, 0.35555], 106: [0.19444, 0.69326, 0.1672, 0, 0.35555], 107: [0, 0.69444, 0.11111, 0, 0.53222], 108: [0, 0.69444, 0.10861, 0, 0.29666], 109: [0, 0.44444, 0.09426, 0, 0.94444], 110: [0, 0.44444, 0.09426, 0, 0.64999], 111: [0, 0.44444, 0.07861, 0, 0.59111], 112: [0.19444, 0.44444, 0.07861, 0, 0.59111], 113: [0.19444, 0.44444, 0.105, 0, 0.53222], 114: [0, 0.44444, 0.11111, 0, 0.50167], 115: [0, 0.44444, 0.08167, 0, 0.48694], 116: [0, 0.63492, 0.09639, 0, 0.385], 117: [0, 0.44444, 0.09426, 0, 0.62055], 118: [0, 0.44444, 0.11111, 0, 0.53222], 119: [0, 0.44444, 0.11111, 0, 0.76777], 120: [0, 0.44444, 0.12583, 0, 0.56055], 121: [0.19444, 0.44444, 0.105, 0, 0.56166], 122: [0, 0.44444, 0.13889, 0, 0.49055], 126: [0.35, 0.34444, 0.11472, 0, 0.59111], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.69444, 0.11473, 0, 0.59111], 176: [0, 0.69444, 0, 0, 0.94888], 184: [0.17014, 0, 0, 0, 0.53222], 198: [0, 0.68611, 0.11431, 0, 1.02277], 216: [0.04861, 0.73472, 0.09062, 0, 0.88555], 223: [0.19444, 0.69444, 0.09736, 0, 0.665], 230: [0, 0.44444, 0.085, 0, 0.82666], 248: [0.09722, 0.54167, 0.09458, 0, 0.59111], 305: [0, 0.44444, 0.09426, 0, 0.35555], 338: [0, 0.68611, 0.11431, 0, 1.14054], 339: [0, 0.44444, 0.085, 0, 0.82666], 567: [0.19444, 0.44444, 0.04611, 0, 0.385], 710: [0, 0.69444, 0.06709, 0, 0.59111], 711: [0, 0.63194, 0.08271, 0, 0.59111], 713: [0, 0.59444, 0.10444, 0, 0.59111], 714: [0, 0.69444, 0.08528, 0, 0.59111], 715: [0, 0.69444, 0, 0, 0.59111], 728: [0, 0.69444, 0.10333, 0, 0.59111], 729: [0, 0.69444, 0.12945, 0, 0.35555], 730: [0, 0.69444, 0, 0, 0.94888], 732: [0, 0.69444, 0.11472, 0, 0.59111], 733: [0, 0.69444, 0.11472, 0, 0.59111], 915: [0, 0.68611, 0.12903, 0, 0.69777], 916: [0, 0.68611, 0, 0, 0.94444], 920: [0, 0.68611, 0.09062, 0, 0.88555], 923: [0, 0.68611, 0, 0, 0.80666], 926: [0, 0.68611, 0.15092, 0, 0.76777], 928: [0, 0.68611, 0.17208, 0, 0.8961], 931: [0, 0.68611, 0.11431, 0, 0.82666], 933: [0, 0.68611, 0.10778, 0, 0.88555], 934: [0, 0.68611, 0.05632, 0, 0.82666], 936: [0, 0.68611, 0.10778, 0, 0.88555], 937: [0, 0.68611, 0.0992, 0, 0.82666], 8211: [0, 0.44444, 0.09811, 0, 0.59111], 8212: [0, 0.44444, 0.09811, 0, 1.18221], 8216: [0, 0.69444, 0.12945, 0, 0.35555], 8217: [0, 0.69444, 0.12945, 0, 0.35555], 8220: [0, 0.69444, 0.16772, 0, 0.62055], 8221: [0, 0.69444, 0.07939, 0, 0.62055] }, "Main-Italic": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0.12417, 0, 0.30667], 34: [0, 0.69444, 0.06961, 0, 0.51444], 35: [0.19444, 0.69444, 0.06616, 0, 0.81777], 37: [0.05556, 0.75, 0.13639, 0, 0.81777], 38: [0, 0.69444, 0.09694, 0, 0.76666], 39: [0, 0.69444, 0.12417, 0, 0.30667], 40: [0.25, 0.75, 0.16194, 0, 0.40889], 41: [0.25, 0.75, 0.03694, 0, 0.40889], 42: [0, 0.75, 0.14917, 0, 0.51111], 43: [0.05667, 0.56167, 0.03694, 0, 0.76666], 44: [0.19444, 0.10556, 0, 0, 0.30667], 45: [0, 0.43056, 0.02826, 0, 0.35778], 46: [0, 0.10556, 0, 0, 0.30667], 47: [0.25, 0.75, 0.16194, 0, 0.51111], 48: [0, 0.64444, 0.13556, 0, 0.51111], 49: [0, 0.64444, 0.13556, 0, 0.51111], 50: [0, 0.64444, 0.13556, 0, 0.51111], 51: [0, 0.64444, 0.13556, 0, 0.51111], 52: [0.19444, 0.64444, 0.13556, 0, 0.51111], 53: [0, 0.64444, 0.13556, 0, 0.51111], 54: [0, 0.64444, 0.13556, 0, 0.51111], 55: [0.19444, 0.64444, 0.13556, 0, 0.51111], 56: [0, 0.64444, 0.13556, 0, 0.51111], 57: [0, 0.64444, 0.13556, 0, 0.51111], 58: [0, 0.43056, 0.0582, 0, 0.30667], 59: [0.19444, 0.43056, 0.0582, 0, 0.30667], 61: [-0.13313, 0.36687, 0.06616, 0, 0.76666], 63: [0, 0.69444, 0.1225, 0, 0.51111], 64: [0, 0.69444, 0.09597, 0, 0.76666], 65: [0, 0.68333, 0, 0, 0.74333], 66: [0, 0.68333, 0.10257, 0, 0.70389], 67: [0, 0.68333, 0.14528, 0, 0.71555], 68: [0, 0.68333, 0.09403, 0, 0.755], 69: [0, 0.68333, 0.12028, 0, 0.67833], 70: [0, 0.68333, 0.13305, 0, 0.65277], 71: [0, 0.68333, 0.08722, 0, 0.77361], 72: [0, 0.68333, 0.16389, 0, 0.74333], 73: [0, 0.68333, 0.15806, 0, 0.38555], 74: [0, 0.68333, 0.14028, 0, 0.525], 75: [0, 0.68333, 0.14528, 0, 0.76888], 76: [0, 0.68333, 0, 0, 0.62722], 77: [0, 0.68333, 0.16389, 0, 0.89666], 78: [0, 0.68333, 0.16389, 0, 0.74333], 79: [0, 0.68333, 0.09403, 0, 0.76666], 80: [0, 0.68333, 0.10257, 0, 0.67833], 81: [0.19444, 0.68333, 0.09403, 0, 0.76666], 82: [0, 0.68333, 0.03868, 0, 0.72944], 83: [0, 0.68333, 0.11972, 0, 0.56222], 84: [0, 0.68333, 0.13305, 0, 0.71555], 85: [0, 0.68333, 0.16389, 0, 0.74333], 86: [0, 0.68333, 0.18361, 0, 0.74333], 87: [0, 0.68333, 0.18361, 0, 0.99888], 88: [0, 0.68333, 0.15806, 0, 0.74333], 89: [0, 0.68333, 0.19383, 0, 0.74333], 90: [0, 0.68333, 0.14528, 0, 0.61333], 91: [0.25, 0.75, 0.1875, 0, 0.30667], 93: [0.25, 0.75, 0.10528, 0, 0.30667], 94: [0, 0.69444, 0.06646, 0, 0.51111], 95: [0.31, 0.12056, 0.09208, 0, 0.51111], 97: [0, 0.43056, 0.07671, 0, 0.51111], 98: [0, 0.69444, 0.06312, 0, 0.46], 99: [0, 0.43056, 0.05653, 0, 0.46], 100: [0, 0.69444, 0.10333, 0, 0.51111], 101: [0, 0.43056, 0.07514, 0, 0.46], 102: [0.19444, 0.69444, 0.21194, 0, 0.30667], 103: [0.19444, 0.43056, 0.08847, 0, 0.46], 104: [0, 0.69444, 0.07671, 0, 0.51111], 105: [0, 0.65536, 0.1019, 0, 0.30667], 106: [0.19444, 0.65536, 0.14467, 0, 0.30667], 107: [0, 0.69444, 0.10764, 0, 0.46], 108: [0, 0.69444, 0.10333, 0, 0.25555], 109: [0, 0.43056, 0.07671, 0, 0.81777], 110: [0, 0.43056, 0.07671, 0, 0.56222], 111: [0, 0.43056, 0.06312, 0, 0.51111], 112: [0.19444, 0.43056, 0.06312, 0, 0.51111], 113: [0.19444, 0.43056, 0.08847, 0, 0.46], 114: [0, 0.43056, 0.10764, 0, 0.42166], 115: [0, 0.43056, 0.08208, 0, 0.40889], 116: [0, 0.61508, 0.09486, 0, 0.33222], 117: [0, 0.43056, 0.07671, 0, 0.53666], 118: [0, 0.43056, 0.10764, 0, 0.46], 119: [0, 0.43056, 0.10764, 0, 0.66444], 120: [0, 0.43056, 0.12042, 0, 0.46389], 121: [0.19444, 0.43056, 0.08847, 0, 0.48555], 122: [0, 0.43056, 0.12292, 0, 0.40889], 126: [0.35, 0.31786, 0.11585, 0, 0.51111], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.66786, 0.10474, 0, 0.51111], 176: [0, 0.69444, 0, 0, 0.83129], 184: [0.17014, 0, 0, 0, 0.46], 198: [0, 0.68333, 0.12028, 0, 0.88277], 216: [0.04861, 0.73194, 0.09403, 0, 0.76666], 223: [0.19444, 0.69444, 0.10514, 0, 0.53666], 230: [0, 0.43056, 0.07514, 0, 0.71555], 248: [0.09722, 0.52778, 0.09194, 0, 0.51111], 338: [0, 0.68333, 0.12028, 0, 0.98499], 339: [0, 0.43056, 0.07514, 0, 0.71555], 710: [0, 0.69444, 0.06646, 0, 0.51111], 711: [0, 0.62847, 0.08295, 0, 0.51111], 713: [0, 0.56167, 0.10333, 0, 0.51111], 714: [0, 0.69444, 0.09694, 0, 0.51111], 715: [0, 0.69444, 0, 0, 0.51111], 728: [0, 0.69444, 0.10806, 0, 0.51111], 729: [0, 0.66786, 0.11752, 0, 0.30667], 730: [0, 0.69444, 0, 0, 0.83129], 732: [0, 0.66786, 0.11585, 0, 0.51111], 733: [0, 0.69444, 0.1225, 0, 0.51111], 915: [0, 0.68333, 0.13305, 0, 0.62722], 916: [0, 0.68333, 0, 0, 0.81777], 920: [0, 0.68333, 0.09403, 0, 0.76666], 923: [0, 0.68333, 0, 0, 0.69222], 926: [0, 0.68333, 0.15294, 0, 0.66444], 928: [0, 0.68333, 0.16389, 0, 0.74333], 931: [0, 0.68333, 0.12028, 0, 0.71555], 933: [0, 0.68333, 0.11111, 0, 0.76666], 934: [0, 0.68333, 0.05986, 0, 0.71555], 936: [0, 0.68333, 0.11111, 0, 0.76666], 937: [0, 0.68333, 0.10257, 0, 0.71555], 8211: [0, 0.43056, 0.09208, 0, 0.51111], 8212: [0, 0.43056, 0.09208, 0, 1.02222], 8216: [0, 0.69444, 0.12417, 0, 0.30667], 8217: [0, 0.69444, 0.12417, 0, 0.30667], 8220: [0, 0.69444, 0.1685, 0, 0.51444], 8221: [0, 0.69444, 0.06961, 0, 0.51444], 8463: [0, 0.68889, 0, 0, 0.54028] }, "Main-Regular": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.27778], 34: [0, 0.69444, 0, 0, 0.5], 35: [0.19444, 0.69444, 0, 0, 0.83334], 36: [0.05556, 0.75, 0, 0, 0.5], 37: [0.05556, 0.75, 0, 0, 0.83334], 38: [0, 0.69444, 0, 0, 0.77778], 39: [0, 0.69444, 0, 0, 0.27778], 40: [0.25, 0.75, 0, 0, 0.38889], 41: [0.25, 0.75, 0, 0, 0.38889], 42: [0, 0.75, 0, 0, 0.5], 43: [0.08333, 0.58333, 0, 0, 0.77778], 44: [0.19444, 0.10556, 0, 0, 0.27778], 45: [0, 0.43056, 0, 0, 0.33333], 46: [0, 0.10556, 0, 0, 0.27778], 47: [0.25, 0.75, 0, 0, 0.5], 48: [0, 0.64444, 0, 0, 0.5], 49: [0, 0.64444, 0, 0, 0.5], 50: [0, 0.64444, 0, 0, 0.5], 51: [0, 0.64444, 0, 0, 0.5], 52: [0, 0.64444, 0, 0, 0.5], 53: [0, 0.64444, 0, 0, 0.5], 54: [0, 0.64444, 0, 0, 0.5], 55: [0, 0.64444, 0, 0, 0.5], 56: [0, 0.64444, 0, 0, 0.5], 57: [0, 0.64444, 0, 0, 0.5], 58: [0, 0.43056, 0, 0, 0.27778], 59: [0.19444, 0.43056, 0, 0, 0.27778], 60: [0.0391, 0.5391, 0, 0, 0.77778], 61: [-0.13313, 0.36687, 0, 0, 0.77778], 62: [0.0391, 0.5391, 0, 0, 0.77778], 63: [0, 0.69444, 0, 0, 0.47222], 64: [0, 0.69444, 0, 0, 0.77778], 65: [0, 0.68333, 0, 0, 0.75], 66: [0, 0.68333, 0, 0, 0.70834], 67: [0, 0.68333, 0, 0, 0.72222], 68: [0, 0.68333, 0, 0, 0.76389], 69: [0, 0.68333, 0, 0, 0.68056], 70: [0, 0.68333, 0, 0, 0.65278], 71: [0, 0.68333, 0, 0, 0.78472], 72: [0, 0.68333, 0, 0, 0.75], 73: [0, 0.68333, 0, 0, 0.36111], 74: [0, 0.68333, 0, 0, 0.51389], 75: [0, 0.68333, 0, 0, 0.77778], 76: [0, 0.68333, 0, 0, 0.625], 77: [0, 0.68333, 0, 0, 0.91667], 78: [0, 0.68333, 0, 0, 0.75], 79: [0, 0.68333, 0, 0, 0.77778], 80: [0, 0.68333, 0, 0, 0.68056], 81: [0.19444, 0.68333, 0, 0, 0.77778], 82: [0, 0.68333, 0, 0, 0.73611], 83: [0, 0.68333, 0, 0, 0.55556], 84: [0, 0.68333, 0, 0, 0.72222], 85: [0, 0.68333, 0, 0, 0.75], 86: [0, 0.68333, 0.01389, 0, 0.75], 87: [0, 0.68333, 0.01389, 0, 1.02778], 88: [0, 0.68333, 0, 0, 0.75], 89: [0, 0.68333, 0.025, 0, 0.75], 90: [0, 0.68333, 0, 0, 0.61111], 91: [0.25, 0.75, 0, 0, 0.27778], 92: [0.25, 0.75, 0, 0, 0.5], 93: [0.25, 0.75, 0, 0, 0.27778], 94: [0, 0.69444, 0, 0, 0.5], 95: [0.31, 0.12056, 0.02778, 0, 0.5], 97: [0, 0.43056, 0, 0, 0.5], 98: [0, 0.69444, 0, 0, 0.55556], 99: [0, 0.43056, 0, 0, 0.44445], 100: [0, 0.69444, 0, 0, 0.55556], 101: [0, 0.43056, 0, 0, 0.44445], 102: [0, 0.69444, 0.07778, 0, 0.30556], 103: [0.19444, 0.43056, 0.01389, 0, 0.5], 104: [0, 0.69444, 0, 0, 0.55556], 105: [0, 0.66786, 0, 0, 0.27778], 106: [0.19444, 0.66786, 0, 0, 0.30556], 107: [0, 0.69444, 0, 0, 0.52778], 108: [0, 0.69444, 0, 0, 0.27778], 109: [0, 0.43056, 0, 0, 0.83334], 110: [0, 0.43056, 0, 0, 0.55556], 111: [0, 0.43056, 0, 0, 0.5], 112: [0.19444, 0.43056, 0, 0, 0.55556], 113: [0.19444, 0.43056, 0, 0, 0.52778], 114: [0, 0.43056, 0, 0, 0.39167], 115: [0, 0.43056, 0, 0, 0.39445], 116: [0, 0.61508, 0, 0, 0.38889], 117: [0, 0.43056, 0, 0, 0.55556], 118: [0, 0.43056, 0.01389, 0, 0.52778], 119: [0, 0.43056, 0.01389, 0, 0.72222], 120: [0, 0.43056, 0, 0, 0.52778], 121: [0.19444, 0.43056, 0.01389, 0, 0.52778], 122: [0, 0.43056, 0, 0, 0.44445], 123: [0.25, 0.75, 0, 0, 0.5], 124: [0.25, 0.75, 0, 0, 0.27778], 125: [0.25, 0.75, 0, 0, 0.5], 126: [0.35, 0.31786, 0, 0, 0.5], 160: [0, 0, 0, 0, 0.25], 163: [0, 0.69444, 0, 0, 0.76909], 167: [0.19444, 0.69444, 0, 0, 0.44445], 168: [0, 0.66786, 0, 0, 0.5], 172: [0, 0.43056, 0, 0, 0.66667], 176: [0, 0.69444, 0, 0, 0.75], 177: [0.08333, 0.58333, 0, 0, 0.77778], 182: [0.19444, 0.69444, 0, 0, 0.61111], 184: [0.17014, 0, 0, 0, 0.44445], 198: [0, 0.68333, 0, 0, 0.90278], 215: [0.08333, 0.58333, 0, 0, 0.77778], 216: [0.04861, 0.73194, 0, 0, 0.77778], 223: [0, 0.69444, 0, 0, 0.5], 230: [0, 0.43056, 0, 0, 0.72222], 247: [0.08333, 0.58333, 0, 0, 0.77778], 248: [0.09722, 0.52778, 0, 0, 0.5], 305: [0, 0.43056, 0, 0, 0.27778], 338: [0, 0.68333, 0, 0, 1.01389], 339: [0, 0.43056, 0, 0, 0.77778], 567: [0.19444, 0.43056, 0, 0, 0.30556], 710: [0, 0.69444, 0, 0, 0.5], 711: [0, 0.62847, 0, 0, 0.5], 713: [0, 0.56778, 0, 0, 0.5], 714: [0, 0.69444, 0, 0, 0.5], 715: [0, 0.69444, 0, 0, 0.5], 728: [0, 0.69444, 0, 0, 0.5], 729: [0, 0.66786, 0, 0, 0.27778], 730: [0, 0.69444, 0, 0, 0.75], 732: [0, 0.66786, 0, 0, 0.5], 733: [0, 0.69444, 0, 0, 0.5], 915: [0, 0.68333, 0, 0, 0.625], 916: [0, 0.68333, 0, 0, 0.83334], 920: [0, 0.68333, 0, 0, 0.77778], 923: [0, 0.68333, 0, 0, 0.69445], 926: [0, 0.68333, 0, 0, 0.66667], 928: [0, 0.68333, 0, 0, 0.75], 931: [0, 0.68333, 0, 0, 0.72222], 933: [0, 0.68333, 0, 0, 0.77778], 934: [0, 0.68333, 0, 0, 0.72222], 936: [0, 0.68333, 0, 0, 0.77778], 937: [0, 0.68333, 0, 0, 0.72222], 8211: [0, 0.43056, 0.02778, 0, 0.5], 8212: [0, 0.43056, 0.02778, 0, 1], 8216: [0, 0.69444, 0, 0, 0.27778], 8217: [0, 0.69444, 0, 0, 0.27778], 8220: [0, 0.69444, 0, 0, 0.5], 8221: [0, 0.69444, 0, 0, 0.5], 8224: [0.19444, 0.69444, 0, 0, 0.44445], 8225: [0.19444, 0.69444, 0, 0, 0.44445], 8230: [0, 0.123, 0, 0, 1.172], 8242: [0, 0.55556, 0, 0, 0.275], 8407: [0, 0.71444, 0.15382, 0, 0.5], 8463: [0, 0.68889, 0, 0, 0.54028], 8465: [0, 0.69444, 0, 0, 0.72222], 8467: [0, 0.69444, 0, 0.11111, 0.41667], 8472: [0.19444, 0.43056, 0, 0.11111, 0.63646], 8476: [0, 0.69444, 0, 0, 0.72222], 8501: [0, 0.69444, 0, 0, 0.61111], 8592: [-0.13313, 0.36687, 0, 0, 1], 8593: [0.19444, 0.69444, 0, 0, 0.5], 8594: [-0.13313, 0.36687, 0, 0, 1], 8595: [0.19444, 0.69444, 0, 0, 0.5], 8596: [-0.13313, 0.36687, 0, 0, 1], 8597: [0.25, 0.75, 0, 0, 0.5], 8598: [0.19444, 0.69444, 0, 0, 1], 8599: [0.19444, 0.69444, 0, 0, 1], 8600: [0.19444, 0.69444, 0, 0, 1], 8601: [0.19444, 0.69444, 0, 0, 1], 8614: [0.011, 0.511, 0, 0, 1], 8617: [0.011, 0.511, 0, 0, 1.126], 8618: [0.011, 0.511, 0, 0, 1.126], 8636: [-0.13313, 0.36687, 0, 0, 1], 8637: [-0.13313, 0.36687, 0, 0, 1], 8640: [-0.13313, 0.36687, 0, 0, 1], 8641: [-0.13313, 0.36687, 0, 0, 1], 8652: [0.011, 0.671, 0, 0, 1], 8656: [-0.13313, 0.36687, 0, 0, 1], 8657: [0.19444, 0.69444, 0, 0, 0.61111], 8658: [-0.13313, 0.36687, 0, 0, 1], 8659: [0.19444, 0.69444, 0, 0, 0.61111], 8660: [-0.13313, 0.36687, 0, 0, 1], 8661: [0.25, 0.75, 0, 0, 0.61111], 8704: [0, 0.69444, 0, 0, 0.55556], 8706: [0, 0.69444, 0.05556, 0.08334, 0.5309], 8707: [0, 0.69444, 0, 0, 0.55556], 8709: [0.05556, 0.75, 0, 0, 0.5], 8711: [0, 0.68333, 0, 0, 0.83334], 8712: [0.0391, 0.5391, 0, 0, 0.66667], 8715: [0.0391, 0.5391, 0, 0, 0.66667], 8722: [0.08333, 0.58333, 0, 0, 0.77778], 8723: [0.08333, 0.58333, 0, 0, 0.77778], 8725: [0.25, 0.75, 0, 0, 0.5], 8726: [0.25, 0.75, 0, 0, 0.5], 8727: [-0.03472, 0.46528, 0, 0, 0.5], 8728: [-0.05555, 0.44445, 0, 0, 0.5], 8729: [-0.05555, 0.44445, 0, 0, 0.5], 8730: [0.2, 0.8, 0, 0, 0.83334], 8733: [0, 0.43056, 0, 0, 0.77778], 8734: [0, 0.43056, 0, 0, 1], 8736: [0, 0.69224, 0, 0, 0.72222], 8739: [0.25, 0.75, 0, 0, 0.27778], 8741: [0.25, 0.75, 0, 0, 0.5], 8743: [0, 0.55556, 0, 0, 0.66667], 8744: [0, 0.55556, 0, 0, 0.66667], 8745: [0, 0.55556, 0, 0, 0.66667], 8746: [0, 0.55556, 0, 0, 0.66667], 8747: [0.19444, 0.69444, 0.11111, 0, 0.41667], 8764: [-0.13313, 0.36687, 0, 0, 0.77778], 8768: [0.19444, 0.69444, 0, 0, 0.27778], 8771: [-0.03625, 0.46375, 0, 0, 0.77778], 8773: [-0.022, 0.589, 0, 0, 0.778], 8776: [-0.01688, 0.48312, 0, 0, 0.77778], 8781: [-0.03625, 0.46375, 0, 0, 0.77778], 8784: [-0.133, 0.673, 0, 0, 0.778], 8801: [-0.03625, 0.46375, 0, 0, 0.77778], 8804: [0.13597, 0.63597, 0, 0, 0.77778], 8805: [0.13597, 0.63597, 0, 0, 0.77778], 8810: [0.0391, 0.5391, 0, 0, 1], 8811: [0.0391, 0.5391, 0, 0, 1], 8826: [0.0391, 0.5391, 0, 0, 0.77778], 8827: [0.0391, 0.5391, 0, 0, 0.77778], 8834: [0.0391, 0.5391, 0, 0, 0.77778], 8835: [0.0391, 0.5391, 0, 0, 0.77778], 8838: [0.13597, 0.63597, 0, 0, 0.77778], 8839: [0.13597, 0.63597, 0, 0, 0.77778], 8846: [0, 0.55556, 0, 0, 0.66667], 8849: [0.13597, 0.63597, 0, 0, 0.77778], 8850: [0.13597, 0.63597, 0, 0, 0.77778], 8851: [0, 0.55556, 0, 0, 0.66667], 8852: [0, 0.55556, 0, 0, 0.66667], 8853: [0.08333, 0.58333, 0, 0, 0.77778], 8854: [0.08333, 0.58333, 0, 0, 0.77778], 8855: [0.08333, 0.58333, 0, 0, 0.77778], 8856: [0.08333, 0.58333, 0, 0, 0.77778], 8857: [0.08333, 0.58333, 0, 0, 0.77778], 8866: [0, 0.69444, 0, 0, 0.61111], 8867: [0, 0.69444, 0, 0, 0.61111], 8868: [0, 0.69444, 0, 0, 0.77778], 8869: [0, 0.69444, 0, 0, 0.77778], 8872: [0.249, 0.75, 0, 0, 0.867], 8900: [-0.05555, 0.44445, 0, 0, 0.5], 8901: [-0.05555, 0.44445, 0, 0, 0.27778], 8902: [-0.03472, 0.46528, 0, 0, 0.5], 8904: [5e-3, 0.505, 0, 0, 0.9], 8942: [0.03, 0.903, 0, 0, 0.278], 8943: [-0.19, 0.313, 0, 0, 1.172], 8945: [-0.1, 0.823, 0, 0, 1.282], 8968: [0.25, 0.75, 0, 0, 0.44445], 8969: [0.25, 0.75, 0, 0, 0.44445], 8970: [0.25, 0.75, 0, 0, 0.44445], 8971: [0.25, 0.75, 0, 0, 0.44445], 8994: [-0.14236, 0.35764, 0, 0, 1], 8995: [-0.14236, 0.35764, 0, 0, 1], 9136: [0.244, 0.744, 0, 0, 0.412], 9137: [0.244, 0.745, 0, 0, 0.412], 9651: [0.19444, 0.69444, 0, 0, 0.88889], 9657: [-0.03472, 0.46528, 0, 0, 0.5], 9661: [0.19444, 0.69444, 0, 0, 0.88889], 9667: [-0.03472, 0.46528, 0, 0, 0.5], 9711: [0.19444, 0.69444, 0, 0, 1], 9824: [0.12963, 0.69444, 0, 0, 0.77778], 9825: [0.12963, 0.69444, 0, 0, 0.77778], 9826: [0.12963, 0.69444, 0, 0, 0.77778], 9827: [0.12963, 0.69444, 0, 0, 0.77778], 9837: [0, 0.75, 0, 0, 0.38889], 9838: [0.19444, 0.69444, 0, 0, 0.38889], 9839: [0.19444, 0.69444, 0, 0, 0.38889], 10216: [0.25, 0.75, 0, 0, 0.38889], 10217: [0.25, 0.75, 0, 0, 0.38889], 10222: [0.244, 0.744, 0, 0, 0.412], 10223: [0.244, 0.745, 0, 0, 0.412], 10229: [0.011, 0.511, 0, 0, 1.609], 10230: [0.011, 0.511, 0, 0, 1.638], 10231: [0.011, 0.511, 0, 0, 1.859], 10232: [0.024, 0.525, 0, 0, 1.609], 10233: [0.024, 0.525, 0, 0, 1.638], 10234: [0.024, 0.525, 0, 0, 1.858], 10236: [0.011, 0.511, 0, 0, 1.638], 10815: [0, 0.68333, 0, 0, 0.75], 10927: [0.13597, 0.63597, 0, 0, 0.77778], 10928: [0.13597, 0.63597, 0, 0, 0.77778], 57376: [0.19444, 0.69444, 0, 0, 0] }, "Math-BoldItalic": { 32: [0, 0, 0, 0, 0.25], 48: [0, 0.44444, 0, 0, 0.575], 49: [0, 0.44444, 0, 0, 0.575], 50: [0, 0.44444, 0, 0, 0.575], 51: [0.19444, 0.44444, 0, 0, 0.575], 52: [0.19444, 0.44444, 0, 0, 0.575], 53: [0.19444, 0.44444, 0, 0, 0.575], 54: [0, 0.64444, 0, 0, 0.575], 55: [0.19444, 0.44444, 0, 0, 0.575], 56: [0, 0.64444, 0, 0, 0.575], 57: [0.19444, 0.44444, 0, 0, 0.575], 65: [0, 0.68611, 0, 0, 0.86944], 66: [0, 0.68611, 0.04835, 0, 0.8664], 67: [0, 0.68611, 0.06979, 0, 0.81694], 68: [0, 0.68611, 0.03194, 0, 0.93812], 69: [0, 0.68611, 0.05451, 0, 0.81007], 70: [0, 0.68611, 0.15972, 0, 0.68889], 71: [0, 0.68611, 0, 0, 0.88673], 72: [0, 0.68611, 0.08229, 0, 0.98229], 73: [0, 0.68611, 0.07778, 0, 0.51111], 74: [0, 0.68611, 0.10069, 0, 0.63125], 75: [0, 0.68611, 0.06979, 0, 0.97118], 76: [0, 0.68611, 0, 0, 0.75555], 77: [0, 0.68611, 0.11424, 0, 1.14201], 78: [0, 0.68611, 0.11424, 0, 0.95034], 79: [0, 0.68611, 0.03194, 0, 0.83666], 80: [0, 0.68611, 0.15972, 0, 0.72309], 81: [0.19444, 0.68611, 0, 0, 0.86861], 82: [0, 0.68611, 421e-5, 0, 0.87235], 83: [0, 0.68611, 0.05382, 0, 0.69271], 84: [0, 0.68611, 0.15972, 0, 0.63663], 85: [0, 0.68611, 0.11424, 0, 0.80027], 86: [0, 0.68611, 0.25555, 0, 0.67778], 87: [0, 0.68611, 0.15972, 0, 1.09305], 88: [0, 0.68611, 0.07778, 0, 0.94722], 89: [0, 0.68611, 0.25555, 0, 0.67458], 90: [0, 0.68611, 0.06979, 0, 0.77257], 97: [0, 0.44444, 0, 0, 0.63287], 98: [0, 0.69444, 0, 0, 0.52083], 99: [0, 0.44444, 0, 0, 0.51342], 100: [0, 0.69444, 0, 0, 0.60972], 101: [0, 0.44444, 0, 0, 0.55361], 102: [0.19444, 0.69444, 0.11042, 0, 0.56806], 103: [0.19444, 0.44444, 0.03704, 0, 0.5449], 104: [0, 0.69444, 0, 0, 0.66759], 105: [0, 0.69326, 0, 0, 0.4048], 106: [0.19444, 0.69326, 0.0622, 0, 0.47083], 107: [0, 0.69444, 0.01852, 0, 0.6037], 108: [0, 0.69444, 88e-4, 0, 0.34815], 109: [0, 0.44444, 0, 0, 1.0324], 110: [0, 0.44444, 0, 0, 0.71296], 111: [0, 0.44444, 0, 0, 0.58472], 112: [0.19444, 0.44444, 0, 0, 0.60092], 113: [0.19444, 0.44444, 0.03704, 0, 0.54213], 114: [0, 0.44444, 0.03194, 0, 0.5287], 115: [0, 0.44444, 0, 0, 0.53125], 116: [0, 0.63492, 0, 0, 0.41528], 117: [0, 0.44444, 0, 0, 0.68102], 118: [0, 0.44444, 0.03704, 0, 0.56666], 119: [0, 0.44444, 0.02778, 0, 0.83148], 120: [0, 0.44444, 0, 0, 0.65903], 121: [0.19444, 0.44444, 0.03704, 0, 0.59028], 122: [0, 0.44444, 0.04213, 0, 0.55509], 160: [0, 0, 0, 0, 0.25], 915: [0, 0.68611, 0.15972, 0, 0.65694], 916: [0, 0.68611, 0, 0, 0.95833], 920: [0, 0.68611, 0.03194, 0, 0.86722], 923: [0, 0.68611, 0, 0, 0.80555], 926: [0, 0.68611, 0.07458, 0, 0.84125], 928: [0, 0.68611, 0.08229, 0, 0.98229], 931: [0, 0.68611, 0.05451, 0, 0.88507], 933: [0, 0.68611, 0.15972, 0, 0.67083], 934: [0, 0.68611, 0, 0, 0.76666], 936: [0, 0.68611, 0.11653, 0, 0.71402], 937: [0, 0.68611, 0.04835, 0, 0.8789], 945: [0, 0.44444, 0, 0, 0.76064], 946: [0.19444, 0.69444, 0.03403, 0, 0.65972], 947: [0.19444, 0.44444, 0.06389, 0, 0.59003], 948: [0, 0.69444, 0.03819, 0, 0.52222], 949: [0, 0.44444, 0, 0, 0.52882], 950: [0.19444, 0.69444, 0.06215, 0, 0.50833], 951: [0.19444, 0.44444, 0.03704, 0, 0.6], 952: [0, 0.69444, 0.03194, 0, 0.5618], 953: [0, 0.44444, 0, 0, 0.41204], 954: [0, 0.44444, 0, 0, 0.66759], 955: [0, 0.69444, 0, 0, 0.67083], 956: [0.19444, 0.44444, 0, 0, 0.70787], 957: [0, 0.44444, 0.06898, 0, 0.57685], 958: [0.19444, 0.69444, 0.03021, 0, 0.50833], 959: [0, 0.44444, 0, 0, 0.58472], 960: [0, 0.44444, 0.03704, 0, 0.68241], 961: [0.19444, 0.44444, 0, 0, 0.6118], 962: [0.09722, 0.44444, 0.07917, 0, 0.42361], 963: [0, 0.44444, 0.03704, 0, 0.68588], 964: [0, 0.44444, 0.13472, 0, 0.52083], 965: [0, 0.44444, 0.03704, 0, 0.63055], 966: [0.19444, 0.44444, 0, 0, 0.74722], 967: [0.19444, 0.44444, 0, 0, 0.71805], 968: [0.19444, 0.69444, 0.03704, 0, 0.75833], 969: [0, 0.44444, 0.03704, 0, 0.71782], 977: [0, 0.69444, 0, 0, 0.69155], 981: [0.19444, 0.69444, 0, 0, 0.7125], 982: [0, 0.44444, 0.03194, 0, 0.975], 1009: [0.19444, 0.44444, 0, 0, 0.6118], 1013: [0, 0.44444, 0, 0, 0.48333], 57649: [0, 0.44444, 0, 0, 0.39352], 57911: [0.19444, 0.44444, 0, 0, 0.43889] }, "Math-Italic": { 32: [0, 0, 0, 0, 0.25], 48: [0, 0.43056, 0, 0, 0.5], 49: [0, 0.43056, 0, 0, 0.5], 50: [0, 0.43056, 0, 0, 0.5], 51: [0.19444, 0.43056, 0, 0, 0.5], 52: [0.19444, 0.43056, 0, 0, 0.5], 53: [0.19444, 0.43056, 0, 0, 0.5], 54: [0, 0.64444, 0, 0, 0.5], 55: [0.19444, 0.43056, 0, 0, 0.5], 56: [0, 0.64444, 0, 0, 0.5], 57: [0.19444, 0.43056, 0, 0, 0.5], 65: [0, 0.68333, 0, 0.13889, 0.75], 66: [0, 0.68333, 0.05017, 0.08334, 0.75851], 67: [0, 0.68333, 0.07153, 0.08334, 0.71472], 68: [0, 0.68333, 0.02778, 0.05556, 0.82792], 69: [0, 0.68333, 0.05764, 0.08334, 0.7382], 70: [0, 0.68333, 0.13889, 0.08334, 0.64306], 71: [0, 0.68333, 0, 0.08334, 0.78625], 72: [0, 0.68333, 0.08125, 0.05556, 0.83125], 73: [0, 0.68333, 0.07847, 0.11111, 0.43958], 74: [0, 0.68333, 0.09618, 0.16667, 0.55451], 75: [0, 0.68333, 0.07153, 0.05556, 0.84931], 76: [0, 0.68333, 0, 0.02778, 0.68056], 77: [0, 0.68333, 0.10903, 0.08334, 0.97014], 78: [0, 0.68333, 0.10903, 0.08334, 0.80347], 79: [0, 0.68333, 0.02778, 0.08334, 0.76278], 80: [0, 0.68333, 0.13889, 0.08334, 0.64201], 81: [0.19444, 0.68333, 0, 0.08334, 0.79056], 82: [0, 0.68333, 773e-5, 0.08334, 0.75929], 83: [0, 0.68333, 0.05764, 0.08334, 0.6132], 84: [0, 0.68333, 0.13889, 0.08334, 0.58438], 85: [0, 0.68333, 0.10903, 0.02778, 0.68278], 86: [0, 0.68333, 0.22222, 0, 0.58333], 87: [0, 0.68333, 0.13889, 0, 0.94445], 88: [0, 0.68333, 0.07847, 0.08334, 0.82847], 89: [0, 0.68333, 0.22222, 0, 0.58056], 90: [0, 0.68333, 0.07153, 0.08334, 0.68264], 97: [0, 0.43056, 0, 0, 0.52859], 98: [0, 0.69444, 0, 0, 0.42917], 99: [0, 0.43056, 0, 0.05556, 0.43276], 100: [0, 0.69444, 0, 0.16667, 0.52049], 101: [0, 0.43056, 0, 0.05556, 0.46563], 102: [0.19444, 0.69444, 0.10764, 0.16667, 0.48959], 103: [0.19444, 0.43056, 0.03588, 0.02778, 0.47697], 104: [0, 0.69444, 0, 0, 0.57616], 105: [0, 0.65952, 0, 0, 0.34451], 106: [0.19444, 0.65952, 0.05724, 0, 0.41181], 107: [0, 0.69444, 0.03148, 0, 0.5206], 108: [0, 0.69444, 0.01968, 0.08334, 0.29838], 109: [0, 0.43056, 0, 0, 0.87801], 110: [0, 0.43056, 0, 0, 0.60023], 111: [0, 0.43056, 0, 0.05556, 0.48472], 112: [0.19444, 0.43056, 0, 0.08334, 0.50313], 113: [0.19444, 0.43056, 0.03588, 0.08334, 0.44641], 114: [0, 0.43056, 0.02778, 0.05556, 0.45116], 115: [0, 0.43056, 0, 0.05556, 0.46875], 116: [0, 0.61508, 0, 0.08334, 0.36111], 117: [0, 0.43056, 0, 0.02778, 0.57246], 118: [0, 0.43056, 0.03588, 0.02778, 0.48472], 119: [0, 0.43056, 0.02691, 0.08334, 0.71592], 120: [0, 0.43056, 0, 0.02778, 0.57153], 121: [0.19444, 0.43056, 0.03588, 0.05556, 0.49028], 122: [0, 0.43056, 0.04398, 0.05556, 0.46505], 160: [0, 0, 0, 0, 0.25], 915: [0, 0.68333, 0.13889, 0.08334, 0.61528], 916: [0, 0.68333, 0, 0.16667, 0.83334], 920: [0, 0.68333, 0.02778, 0.08334, 0.76278], 923: [0, 0.68333, 0, 0.16667, 0.69445], 926: [0, 0.68333, 0.07569, 0.08334, 0.74236], 928: [0, 0.68333, 0.08125, 0.05556, 0.83125], 931: [0, 0.68333, 0.05764, 0.08334, 0.77986], 933: [0, 0.68333, 0.13889, 0.05556, 0.58333], 934: [0, 0.68333, 0, 0.08334, 0.66667], 936: [0, 0.68333, 0.11, 0.05556, 0.61222], 937: [0, 0.68333, 0.05017, 0.08334, 0.7724], 945: [0, 0.43056, 37e-4, 0.02778, 0.6397], 946: [0.19444, 0.69444, 0.05278, 0.08334, 0.56563], 947: [0.19444, 0.43056, 0.05556, 0, 0.51773], 948: [0, 0.69444, 0.03785, 0.05556, 0.44444], 949: [0, 0.43056, 0, 0.08334, 0.46632], 950: [0.19444, 0.69444, 0.07378, 0.08334, 0.4375], 951: [0.19444, 0.43056, 0.03588, 0.05556, 0.49653], 952: [0, 0.69444, 0.02778, 0.08334, 0.46944], 953: [0, 0.43056, 0, 0.05556, 0.35394], 954: [0, 0.43056, 0, 0, 0.57616], 955: [0, 0.69444, 0, 0, 0.58334], 956: [0.19444, 0.43056, 0, 0.02778, 0.60255], 957: [0, 0.43056, 0.06366, 0.02778, 0.49398], 958: [0.19444, 0.69444, 0.04601, 0.11111, 0.4375], 959: [0, 0.43056, 0, 0.05556, 0.48472], 960: [0, 0.43056, 0.03588, 0, 0.57003], 961: [0.19444, 0.43056, 0, 0.08334, 0.51702], 962: [0.09722, 0.43056, 0.07986, 0.08334, 0.36285], 963: [0, 0.43056, 0.03588, 0, 0.57141], 964: [0, 0.43056, 0.1132, 0.02778, 0.43715], 965: [0, 0.43056, 0.03588, 0.02778, 0.54028], 966: [0.19444, 0.43056, 0, 0.08334, 0.65417], 967: [0.19444, 0.43056, 0, 0.05556, 0.62569], 968: [0.19444, 0.69444, 0.03588, 0.11111, 0.65139], 969: [0, 0.43056, 0.03588, 0, 0.62245], 977: [0, 0.69444, 0, 0.08334, 0.59144], 981: [0.19444, 0.69444, 0, 0.08334, 0.59583], 982: [0, 0.43056, 0.02778, 0, 0.82813], 1009: [0.19444, 0.43056, 0, 0.08334, 0.51702], 1013: [0, 0.43056, 0, 0.05556, 0.4059], 57649: [0, 0.43056, 0, 0.02778, 0.32246], 57911: [0.19444, 0.43056, 0, 0.08334, 0.38403] }, "SansSerif-Bold": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.36667], 34: [0, 0.69444, 0, 0, 0.55834], 35: [0.19444, 0.69444, 0, 0, 0.91667], 36: [0.05556, 0.75, 0, 0, 0.55], 37: [0.05556, 0.75, 0, 0, 1.02912], 38: [0, 0.69444, 0, 0, 0.83056], 39: [0, 0.69444, 0, 0, 0.30556], 40: [0.25, 0.75, 0, 0, 0.42778], 41: [0.25, 0.75, 0, 0, 0.42778], 42: [0, 0.75, 0, 0, 0.55], 43: [0.11667, 0.61667, 0, 0, 0.85556], 44: [0.10556, 0.13056, 0, 0, 0.30556], 45: [0, 0.45833, 0, 0, 0.36667], 46: [0, 0.13056, 0, 0, 0.30556], 47: [0.25, 0.75, 0, 0, 0.55], 48: [0, 0.69444, 0, 0, 0.55], 49: [0, 0.69444, 0, 0, 0.55], 50: [0, 0.69444, 0, 0, 0.55], 51: [0, 0.69444, 0, 0, 0.55], 52: [0, 0.69444, 0, 0, 0.55], 53: [0, 0.69444, 0, 0, 0.55], 54: [0, 0.69444, 0, 0, 0.55], 55: [0, 0.69444, 0, 0, 0.55], 56: [0, 0.69444, 0, 0, 0.55], 57: [0, 0.69444, 0, 0, 0.55], 58: [0, 0.45833, 0, 0, 0.30556], 59: [0.10556, 0.45833, 0, 0, 0.30556], 61: [-0.09375, 0.40625, 0, 0, 0.85556], 63: [0, 0.69444, 0, 0, 0.51945], 64: [0, 0.69444, 0, 0, 0.73334], 65: [0, 0.69444, 0, 0, 0.73334], 66: [0, 0.69444, 0, 0, 0.73334], 67: [0, 0.69444, 0, 0, 0.70278], 68: [0, 0.69444, 0, 0, 0.79445], 69: [0, 0.69444, 0, 0, 0.64167], 70: [0, 0.69444, 0, 0, 0.61111], 71: [0, 0.69444, 0, 0, 0.73334], 72: [0, 0.69444, 0, 0, 0.79445], 73: [0, 0.69444, 0, 0, 0.33056], 74: [0, 0.69444, 0, 0, 0.51945], 75: [0, 0.69444, 0, 0, 0.76389], 76: [0, 0.69444, 0, 0, 0.58056], 77: [0, 0.69444, 0, 0, 0.97778], 78: [0, 0.69444, 0, 0, 0.79445], 79: [0, 0.69444, 0, 0, 0.79445], 80: [0, 0.69444, 0, 0, 0.70278], 81: [0.10556, 0.69444, 0, 0, 0.79445], 82: [0, 0.69444, 0, 0, 0.70278], 83: [0, 0.69444, 0, 0, 0.61111], 84: [0, 0.69444, 0, 0, 0.73334], 85: [0, 0.69444, 0, 0, 0.76389], 86: [0, 0.69444, 0.01528, 0, 0.73334], 87: [0, 0.69444, 0.01528, 0, 1.03889], 88: [0, 0.69444, 0, 0, 0.73334], 89: [0, 0.69444, 0.0275, 0, 0.73334], 90: [0, 0.69444, 0, 0, 0.67223], 91: [0.25, 0.75, 0, 0, 0.34306], 93: [0.25, 0.75, 0, 0, 0.34306], 94: [0, 0.69444, 0, 0, 0.55], 95: [0.35, 0.10833, 0.03056, 0, 0.55], 97: [0, 0.45833, 0, 0, 0.525], 98: [0, 0.69444, 0, 0, 0.56111], 99: [0, 0.45833, 0, 0, 0.48889], 100: [0, 0.69444, 0, 0, 0.56111], 101: [0, 0.45833, 0, 0, 0.51111], 102: [0, 0.69444, 0.07639, 0, 0.33611], 103: [0.19444, 0.45833, 0.01528, 0, 0.55], 104: [0, 0.69444, 0, 0, 0.56111], 105: [0, 0.69444, 0, 0, 0.25556], 106: [0.19444, 0.69444, 0, 0, 0.28611], 107: [0, 0.69444, 0, 0, 0.53056], 108: [0, 0.69444, 0, 0, 0.25556], 109: [0, 0.45833, 0, 0, 0.86667], 110: [0, 0.45833, 0, 0, 0.56111], 111: [0, 0.45833, 0, 0, 0.55], 112: [0.19444, 0.45833, 0, 0, 0.56111], 113: [0.19444, 0.45833, 0, 0, 0.56111], 114: [0, 0.45833, 0.01528, 0, 0.37222], 115: [0, 0.45833, 0, 0, 0.42167], 116: [0, 0.58929, 0, 0, 0.40417], 117: [0, 0.45833, 0, 0, 0.56111], 118: [0, 0.45833, 0.01528, 0, 0.5], 119: [0, 0.45833, 0.01528, 0, 0.74445], 120: [0, 0.45833, 0, 0, 0.5], 121: [0.19444, 0.45833, 0.01528, 0, 0.5], 122: [0, 0.45833, 0, 0, 0.47639], 126: [0.35, 0.34444, 0, 0, 0.55], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.69444, 0, 0, 0.55], 176: [0, 0.69444, 0, 0, 0.73334], 180: [0, 0.69444, 0, 0, 0.55], 184: [0.17014, 0, 0, 0, 0.48889], 305: [0, 0.45833, 0, 0, 0.25556], 567: [0.19444, 0.45833, 0, 0, 0.28611], 710: [0, 0.69444, 0, 0, 0.55], 711: [0, 0.63542, 0, 0, 0.55], 713: [0, 0.63778, 0, 0, 0.55], 728: [0, 0.69444, 0, 0, 0.55], 729: [0, 0.69444, 0, 0, 0.30556], 730: [0, 0.69444, 0, 0, 0.73334], 732: [0, 0.69444, 0, 0, 0.55], 733: [0, 0.69444, 0, 0, 0.55], 915: [0, 0.69444, 0, 0, 0.58056], 916: [0, 0.69444, 0, 0, 0.91667], 920: [0, 0.69444, 0, 0, 0.85556], 923: [0, 0.69444, 0, 0, 0.67223], 926: [0, 0.69444, 0, 0, 0.73334], 928: [0, 0.69444, 0, 0, 0.79445], 931: [0, 0.69444, 0, 0, 0.79445], 933: [0, 0.69444, 0, 0, 0.85556], 934: [0, 0.69444, 0, 0, 0.79445], 936: [0, 0.69444, 0, 0, 0.85556], 937: [0, 0.69444, 0, 0, 0.79445], 8211: [0, 0.45833, 0.03056, 0, 0.55], 8212: [0, 0.45833, 0.03056, 0, 1.10001], 8216: [0, 0.69444, 0, 0, 0.30556], 8217: [0, 0.69444, 0, 0, 0.30556], 8220: [0, 0.69444, 0, 0, 0.55834], 8221: [0, 0.69444, 0, 0, 0.55834] }, "SansSerif-Italic": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0.05733, 0, 0.31945], 34: [0, 0.69444, 316e-5, 0, 0.5], 35: [0.19444, 0.69444, 0.05087, 0, 0.83334], 36: [0.05556, 0.75, 0.11156, 0, 0.5], 37: [0.05556, 0.75, 0.03126, 0, 0.83334], 38: [0, 0.69444, 0.03058, 0, 0.75834], 39: [0, 0.69444, 0.07816, 0, 0.27778], 40: [0.25, 0.75, 0.13164, 0, 0.38889], 41: [0.25, 0.75, 0.02536, 0, 0.38889], 42: [0, 0.75, 0.11775, 0, 0.5], 43: [0.08333, 0.58333, 0.02536, 0, 0.77778], 44: [0.125, 0.08333, 0, 0, 0.27778], 45: [0, 0.44444, 0.01946, 0, 0.33333], 46: [0, 0.08333, 0, 0, 0.27778], 47: [0.25, 0.75, 0.13164, 0, 0.5], 48: [0, 0.65556, 0.11156, 0, 0.5], 49: [0, 0.65556, 0.11156, 0, 0.5], 50: [0, 0.65556, 0.11156, 0, 0.5], 51: [0, 0.65556, 0.11156, 0, 0.5], 52: [0, 0.65556, 0.11156, 0, 0.5], 53: [0, 0.65556, 0.11156, 0, 0.5], 54: [0, 0.65556, 0.11156, 0, 0.5], 55: [0, 0.65556, 0.11156, 0, 0.5], 56: [0, 0.65556, 0.11156, 0, 0.5], 57: [0, 0.65556, 0.11156, 0, 0.5], 58: [0, 0.44444, 0.02502, 0, 0.27778], 59: [0.125, 0.44444, 0.02502, 0, 0.27778], 61: [-0.13, 0.37, 0.05087, 0, 0.77778], 63: [0, 0.69444, 0.11809, 0, 0.47222], 64: [0, 0.69444, 0.07555, 0, 0.66667], 65: [0, 0.69444, 0, 0, 0.66667], 66: [0, 0.69444, 0.08293, 0, 0.66667], 67: [0, 0.69444, 0.11983, 0, 0.63889], 68: [0, 0.69444, 0.07555, 0, 0.72223], 69: [0, 0.69444, 0.11983, 0, 0.59722], 70: [0, 0.69444, 0.13372, 0, 0.56945], 71: [0, 0.69444, 0.11983, 0, 0.66667], 72: [0, 0.69444, 0.08094, 0, 0.70834], 73: [0, 0.69444, 0.13372, 0, 0.27778], 74: [0, 0.69444, 0.08094, 0, 0.47222], 75: [0, 0.69444, 0.11983, 0, 0.69445], 76: [0, 0.69444, 0, 0, 0.54167], 77: [0, 0.69444, 0.08094, 0, 0.875], 78: [0, 0.69444, 0.08094, 0, 0.70834], 79: [0, 0.69444, 0.07555, 0, 0.73611], 80: [0, 0.69444, 0.08293, 0, 0.63889], 81: [0.125, 0.69444, 0.07555, 0, 0.73611], 82: [0, 0.69444, 0.08293, 0, 0.64584], 83: [0, 0.69444, 0.09205, 0, 0.55556], 84: [0, 0.69444, 0.13372, 0, 0.68056], 85: [0, 0.69444, 0.08094, 0, 0.6875], 86: [0, 0.69444, 0.1615, 0, 0.66667], 87: [0, 0.69444, 0.1615, 0, 0.94445], 88: [0, 0.69444, 0.13372, 0, 0.66667], 89: [0, 0.69444, 0.17261, 0, 0.66667], 90: [0, 0.69444, 0.11983, 0, 0.61111], 91: [0.25, 0.75, 0.15942, 0, 0.28889], 93: [0.25, 0.75, 0.08719, 0, 0.28889], 94: [0, 0.69444, 0.0799, 0, 0.5], 95: [0.35, 0.09444, 0.08616, 0, 0.5], 97: [0, 0.44444, 981e-5, 0, 0.48056], 98: [0, 0.69444, 0.03057, 0, 0.51667], 99: [0, 0.44444, 0.08336, 0, 0.44445], 100: [0, 0.69444, 0.09483, 0, 0.51667], 101: [0, 0.44444, 0.06778, 0, 0.44445], 102: [0, 0.69444, 0.21705, 0, 0.30556], 103: [0.19444, 0.44444, 0.10836, 0, 0.5], 104: [0, 0.69444, 0.01778, 0, 0.51667], 105: [0, 0.67937, 0.09718, 0, 0.23889], 106: [0.19444, 0.67937, 0.09162, 0, 0.26667], 107: [0, 0.69444, 0.08336, 0, 0.48889], 108: [0, 0.69444, 0.09483, 0, 0.23889], 109: [0, 0.44444, 0.01778, 0, 0.79445], 110: [0, 0.44444, 0.01778, 0, 0.51667], 111: [0, 0.44444, 0.06613, 0, 0.5], 112: [0.19444, 0.44444, 0.0389, 0, 0.51667], 113: [0.19444, 0.44444, 0.04169, 0, 0.51667], 114: [0, 0.44444, 0.10836, 0, 0.34167], 115: [0, 0.44444, 0.0778, 0, 0.38333], 116: [0, 0.57143, 0.07225, 0, 0.36111], 117: [0, 0.44444, 0.04169, 0, 0.51667], 118: [0, 0.44444, 0.10836, 0, 0.46111], 119: [0, 0.44444, 0.10836, 0, 0.68334], 120: [0, 0.44444, 0.09169, 0, 0.46111], 121: [0.19444, 0.44444, 0.10836, 0, 0.46111], 122: [0, 0.44444, 0.08752, 0, 0.43472], 126: [0.35, 0.32659, 0.08826, 0, 0.5], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.67937, 0.06385, 0, 0.5], 176: [0, 0.69444, 0, 0, 0.73752], 184: [0.17014, 0, 0, 0, 0.44445], 305: [0, 0.44444, 0.04169, 0, 0.23889], 567: [0.19444, 0.44444, 0.04169, 0, 0.26667], 710: [0, 0.69444, 0.0799, 0, 0.5], 711: [0, 0.63194, 0.08432, 0, 0.5], 713: [0, 0.60889, 0.08776, 0, 0.5], 714: [0, 0.69444, 0.09205, 0, 0.5], 715: [0, 0.69444, 0, 0, 0.5], 728: [0, 0.69444, 0.09483, 0, 0.5], 729: [0, 0.67937, 0.07774, 0, 0.27778], 730: [0, 0.69444, 0, 0, 0.73752], 732: [0, 0.67659, 0.08826, 0, 0.5], 733: [0, 0.69444, 0.09205, 0, 0.5], 915: [0, 0.69444, 0.13372, 0, 0.54167], 916: [0, 0.69444, 0, 0, 0.83334], 920: [0, 0.69444, 0.07555, 0, 0.77778], 923: [0, 0.69444, 0, 0, 0.61111], 926: [0, 0.69444, 0.12816, 0, 0.66667], 928: [0, 0.69444, 0.08094, 0, 0.70834], 931: [0, 0.69444, 0.11983, 0, 0.72222], 933: [0, 0.69444, 0.09031, 0, 0.77778], 934: [0, 0.69444, 0.04603, 0, 0.72222], 936: [0, 0.69444, 0.09031, 0, 0.77778], 937: [0, 0.69444, 0.08293, 0, 0.72222], 8211: [0, 0.44444, 0.08616, 0, 0.5], 8212: [0, 0.44444, 0.08616, 0, 1], 8216: [0, 0.69444, 0.07816, 0, 0.27778], 8217: [0, 0.69444, 0.07816, 0, 0.27778], 8220: [0, 0.69444, 0.14205, 0, 0.5], 8221: [0, 0.69444, 316e-5, 0, 0.5] }, "SansSerif-Regular": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.31945], 34: [0, 0.69444, 0, 0, 0.5], 35: [0.19444, 0.69444, 0, 0, 0.83334], 36: [0.05556, 0.75, 0, 0, 0.5], 37: [0.05556, 0.75, 0, 0, 0.83334], 38: [0, 0.69444, 0, 0, 0.75834], 39: [0, 0.69444, 0, 0, 0.27778], 40: [0.25, 0.75, 0, 0, 0.38889], 41: [0.25, 0.75, 0, 0, 0.38889], 42: [0, 0.75, 0, 0, 0.5], 43: [0.08333, 0.58333, 0, 0, 0.77778], 44: [0.125, 0.08333, 0, 0, 0.27778], 45: [0, 0.44444, 0, 0, 0.33333], 46: [0, 0.08333, 0, 0, 0.27778], 47: [0.25, 0.75, 0, 0, 0.5], 48: [0, 0.65556, 0, 0, 0.5], 49: [0, 0.65556, 0, 0, 0.5], 50: [0, 0.65556, 0, 0, 0.5], 51: [0, 0.65556, 0, 0, 0.5], 52: [0, 0.65556, 0, 0, 0.5], 53: [0, 0.65556, 0, 0, 0.5], 54: [0, 0.65556, 0, 0, 0.5], 55: [0, 0.65556, 0, 0, 0.5], 56: [0, 0.65556, 0, 0, 0.5], 57: [0, 0.65556, 0, 0, 0.5], 58: [0, 0.44444, 0, 0, 0.27778], 59: [0.125, 0.44444, 0, 0, 0.27778], 61: [-0.13, 0.37, 0, 0, 0.77778], 63: [0, 0.69444, 0, 0, 0.47222], 64: [0, 0.69444, 0, 0, 0.66667], 65: [0, 0.69444, 0, 0, 0.66667], 66: [0, 0.69444, 0, 0, 0.66667], 67: [0, 0.69444, 0, 0, 0.63889], 68: [0, 0.69444, 0, 0, 0.72223], 69: [0, 0.69444, 0, 0, 0.59722], 70: [0, 0.69444, 0, 0, 0.56945], 71: [0, 0.69444, 0, 0, 0.66667], 72: [0, 0.69444, 0, 0, 0.70834], 73: [0, 0.69444, 0, 0, 0.27778], 74: [0, 0.69444, 0, 0, 0.47222], 75: [0, 0.69444, 0, 0, 0.69445], 76: [0, 0.69444, 0, 0, 0.54167], 77: [0, 0.69444, 0, 0, 0.875], 78: [0, 0.69444, 0, 0, 0.70834], 79: [0, 0.69444, 0, 0, 0.73611], 80: [0, 0.69444, 0, 0, 0.63889], 81: [0.125, 0.69444, 0, 0, 0.73611], 82: [0, 0.69444, 0, 0, 0.64584], 83: [0, 0.69444, 0, 0, 0.55556], 84: [0, 0.69444, 0, 0, 0.68056], 85: [0, 0.69444, 0, 0, 0.6875], 86: [0, 0.69444, 0.01389, 0, 0.66667], 87: [0, 0.69444, 0.01389, 0, 0.94445], 88: [0, 0.69444, 0, 0, 0.66667], 89: [0, 0.69444, 0.025, 0, 0.66667], 90: [0, 0.69444, 0, 0, 0.61111], 91: [0.25, 0.75, 0, 0, 0.28889], 93: [0.25, 0.75, 0, 0, 0.28889], 94: [0, 0.69444, 0, 0, 0.5], 95: [0.35, 0.09444, 0.02778, 0, 0.5], 97: [0, 0.44444, 0, 0, 0.48056], 98: [0, 0.69444, 0, 0, 0.51667], 99: [0, 0.44444, 0, 0, 0.44445], 100: [0, 0.69444, 0, 0, 0.51667], 101: [0, 0.44444, 0, 0, 0.44445], 102: [0, 0.69444, 0.06944, 0, 0.30556], 103: [0.19444, 0.44444, 0.01389, 0, 0.5], 104: [0, 0.69444, 0, 0, 0.51667], 105: [0, 0.67937, 0, 0, 0.23889], 106: [0.19444, 0.67937, 0, 0, 0.26667], 107: [0, 0.69444, 0, 0, 0.48889], 108: [0, 0.69444, 0, 0, 0.23889], 109: [0, 0.44444, 0, 0, 0.79445], 110: [0, 0.44444, 0, 0, 0.51667], 111: [0, 0.44444, 0, 0, 0.5], 112: [0.19444, 0.44444, 0, 0, 0.51667], 113: [0.19444, 0.44444, 0, 0, 0.51667], 114: [0, 0.44444, 0.01389, 0, 0.34167], 115: [0, 0.44444, 0, 0, 0.38333], 116: [0, 0.57143, 0, 0, 0.36111], 117: [0, 0.44444, 0, 0, 0.51667], 118: [0, 0.44444, 0.01389, 0, 0.46111], 119: [0, 0.44444, 0.01389, 0, 0.68334], 120: [0, 0.44444, 0, 0, 0.46111], 121: [0.19444, 0.44444, 0.01389, 0, 0.46111], 122: [0, 0.44444, 0, 0, 0.43472], 126: [0.35, 0.32659, 0, 0, 0.5], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.67937, 0, 0, 0.5], 176: [0, 0.69444, 0, 0, 0.66667], 184: [0.17014, 0, 0, 0, 0.44445], 305: [0, 0.44444, 0, 0, 0.23889], 567: [0.19444, 0.44444, 0, 0, 0.26667], 710: [0, 0.69444, 0, 0, 0.5], 711: [0, 0.63194, 0, 0, 0.5], 713: [0, 0.60889, 0, 0, 0.5], 714: [0, 0.69444, 0, 0, 0.5], 715: [0, 0.69444, 0, 0, 0.5], 728: [0, 0.69444, 0, 0, 0.5], 729: [0, 0.67937, 0, 0, 0.27778], 730: [0, 0.69444, 0, 0, 0.66667], 732: [0, 0.67659, 0, 0, 0.5], 733: [0, 0.69444, 0, 0, 0.5], 915: [0, 0.69444, 0, 0, 0.54167], 916: [0, 0.69444, 0, 0, 0.83334], 920: [0, 0.69444, 0, 0, 0.77778], 923: [0, 0.69444, 0, 0, 0.61111], 926: [0, 0.69444, 0, 0, 0.66667], 928: [0, 0.69444, 0, 0, 0.70834], 931: [0, 0.69444, 0, 0, 0.72222], 933: [0, 0.69444, 0, 0, 0.77778], 934: [0, 0.69444, 0, 0, 0.72222], 936: [0, 0.69444, 0, 0, 0.77778], 937: [0, 0.69444, 0, 0, 0.72222], 8211: [0, 0.44444, 0.02778, 0, 0.5], 8212: [0, 0.44444, 0.02778, 0, 1], 8216: [0, 0.69444, 0, 0, 0.27778], 8217: [0, 0.69444, 0, 0, 0.27778], 8220: [0, 0.69444, 0, 0, 0.5], 8221: [0, 0.69444, 0, 0, 0.5] }, "Script-Regular": { 32: [0, 0, 0, 0, 0.25], 65: [0, 0.7, 0.22925, 0, 0.80253], 66: [0, 0.7, 0.04087, 0, 0.90757], 67: [0, 0.7, 0.1689, 0, 0.66619], 68: [0, 0.7, 0.09371, 0, 0.77443], 69: [0, 0.7, 0.18583, 0, 0.56162], 70: [0, 0.7, 0.13634, 0, 0.89544], 71: [0, 0.7, 0.17322, 0, 0.60961], 72: [0, 0.7, 0.29694, 0, 0.96919], 73: [0, 0.7, 0.19189, 0, 0.80907], 74: [0.27778, 0.7, 0.19189, 0, 1.05159], 75: [0, 0.7, 0.31259, 0, 0.91364], 76: [0, 0.7, 0.19189, 0, 0.87373], 77: [0, 0.7, 0.15981, 0, 1.08031], 78: [0, 0.7, 0.3525, 0, 0.9015], 79: [0, 0.7, 0.08078, 0, 0.73787], 80: [0, 0.7, 0.08078, 0, 1.01262], 81: [0, 0.7, 0.03305, 0, 0.88282], 82: [0, 0.7, 0.06259, 0, 0.85], 83: [0, 0.7, 0.19189, 0, 0.86767], 84: [0, 0.7, 0.29087, 0, 0.74697], 85: [0, 0.7, 0.25815, 0, 0.79996], 86: [0, 0.7, 0.27523, 0, 0.62204], 87: [0, 0.7, 0.27523, 0, 0.80532], 88: [0, 0.7, 0.26006, 0, 0.94445], 89: [0, 0.7, 0.2939, 0, 0.70961], 90: [0, 0.7, 0.24037, 0, 0.8212], 160: [0, 0, 0, 0, 0.25] }, "Size1-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [0.35001, 0.85, 0, 0, 0.45834], 41: [0.35001, 0.85, 0, 0, 0.45834], 47: [0.35001, 0.85, 0, 0, 0.57778], 91: [0.35001, 0.85, 0, 0, 0.41667], 92: [0.35001, 0.85, 0, 0, 0.57778], 93: [0.35001, 0.85, 0, 0, 0.41667], 123: [0.35001, 0.85, 0, 0, 0.58334], 125: [0.35001, 0.85, 0, 0, 0.58334], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.72222, 0, 0, 0.55556], 732: [0, 0.72222, 0, 0, 0.55556], 770: [0, 0.72222, 0, 0, 0.55556], 771: [0, 0.72222, 0, 0, 0.55556], 8214: [-99e-5, 0.601, 0, 0, 0.77778], 8593: [1e-5, 0.6, 0, 0, 0.66667], 8595: [1e-5, 0.6, 0, 0, 0.66667], 8657: [1e-5, 0.6, 0, 0, 0.77778], 8659: [1e-5, 0.6, 0, 0, 0.77778], 8719: [0.25001, 0.75, 0, 0, 0.94445], 8720: [0.25001, 0.75, 0, 0, 0.94445], 8721: [0.25001, 0.75, 0, 0, 1.05556], 8730: [0.35001, 0.85, 0, 0, 1], 8739: [-599e-5, 0.606, 0, 0, 0.33333], 8741: [-599e-5, 0.606, 0, 0, 0.55556], 8747: [0.30612, 0.805, 0.19445, 0, 0.47222], 8748: [0.306, 0.805, 0.19445, 0, 0.47222], 8749: [0.306, 0.805, 0.19445, 0, 0.47222], 8750: [0.30612, 0.805, 0.19445, 0, 0.47222], 8896: [0.25001, 0.75, 0, 0, 0.83334], 8897: [0.25001, 0.75, 0, 0, 0.83334], 8898: [0.25001, 0.75, 0, 0, 0.83334], 8899: [0.25001, 0.75, 0, 0, 0.83334], 8968: [0.35001, 0.85, 0, 0, 0.47222], 8969: [0.35001, 0.85, 0, 0, 0.47222], 8970: [0.35001, 0.85, 0, 0, 0.47222], 8971: [0.35001, 0.85, 0, 0, 0.47222], 9168: [-99e-5, 0.601, 0, 0, 0.66667], 10216: [0.35001, 0.85, 0, 0, 0.47222], 10217: [0.35001, 0.85, 0, 0, 0.47222], 10752: [0.25001, 0.75, 0, 0, 1.11111], 10753: [0.25001, 0.75, 0, 0, 1.11111], 10754: [0.25001, 0.75, 0, 0, 1.11111], 10756: [0.25001, 0.75, 0, 0, 0.83334], 10758: [0.25001, 0.75, 0, 0, 0.83334] }, "Size2-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [0.65002, 1.15, 0, 0, 0.59722], 41: [0.65002, 1.15, 0, 0, 0.59722], 47: [0.65002, 1.15, 0, 0, 0.81111], 91: [0.65002, 1.15, 0, 0, 0.47222], 92: [0.65002, 1.15, 0, 0, 0.81111], 93: [0.65002, 1.15, 0, 0, 0.47222], 123: [0.65002, 1.15, 0, 0, 0.66667], 125: [0.65002, 1.15, 0, 0, 0.66667], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.75, 0, 0, 1], 732: [0, 0.75, 0, 0, 1], 770: [0, 0.75, 0, 0, 1], 771: [0, 0.75, 0, 0, 1], 8719: [0.55001, 1.05, 0, 0, 1.27778], 8720: [0.55001, 1.05, 0, 0, 1.27778], 8721: [0.55001, 1.05, 0, 0, 1.44445], 8730: [0.65002, 1.15, 0, 0, 1], 8747: [0.86225, 1.36, 0.44445, 0, 0.55556], 8748: [0.862, 1.36, 0.44445, 0, 0.55556], 8749: [0.862, 1.36, 0.44445, 0, 0.55556], 8750: [0.86225, 1.36, 0.44445, 0, 0.55556], 8896: [0.55001, 1.05, 0, 0, 1.11111], 8897: [0.55001, 1.05, 0, 0, 1.11111], 8898: [0.55001, 1.05, 0, 0, 1.11111], 8899: [0.55001, 1.05, 0, 0, 1.11111], 8968: [0.65002, 1.15, 0, 0, 0.52778], 8969: [0.65002, 1.15, 0, 0, 0.52778], 8970: [0.65002, 1.15, 0, 0, 0.52778], 8971: [0.65002, 1.15, 0, 0, 0.52778], 10216: [0.65002, 1.15, 0, 0, 0.61111], 10217: [0.65002, 1.15, 0, 0, 0.61111], 10752: [0.55001, 1.05, 0, 0, 1.51112], 10753: [0.55001, 1.05, 0, 0, 1.51112], 10754: [0.55001, 1.05, 0, 0, 1.51112], 10756: [0.55001, 1.05, 0, 0, 1.11111], 10758: [0.55001, 1.05, 0, 0, 1.11111] }, "Size3-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [0.95003, 1.45, 0, 0, 0.73611], 41: [0.95003, 1.45, 0, 0, 0.73611], 47: [0.95003, 1.45, 0, 0, 1.04445], 91: [0.95003, 1.45, 0, 0, 0.52778], 92: [0.95003, 1.45, 0, 0, 1.04445], 93: [0.95003, 1.45, 0, 0, 0.52778], 123: [0.95003, 1.45, 0, 0, 0.75], 125: [0.95003, 1.45, 0, 0, 0.75], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.75, 0, 0, 1.44445], 732: [0, 0.75, 0, 0, 1.44445], 770: [0, 0.75, 0, 0, 1.44445], 771: [0, 0.75, 0, 0, 1.44445], 8730: [0.95003, 1.45, 0, 0, 1], 8968: [0.95003, 1.45, 0, 0, 0.58334], 8969: [0.95003, 1.45, 0, 0, 0.58334], 8970: [0.95003, 1.45, 0, 0, 0.58334], 8971: [0.95003, 1.45, 0, 0, 0.58334], 10216: [0.95003, 1.45, 0, 0, 0.75], 10217: [0.95003, 1.45, 0, 0, 0.75] }, "Size4-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [1.25003, 1.75, 0, 0, 0.79167], 41: [1.25003, 1.75, 0, 0, 0.79167], 47: [1.25003, 1.75, 0, 0, 1.27778], 91: [1.25003, 1.75, 0, 0, 0.58334], 92: [1.25003, 1.75, 0, 0, 1.27778], 93: [1.25003, 1.75, 0, 0, 0.58334], 123: [1.25003, 1.75, 0, 0, 0.80556], 125: [1.25003, 1.75, 0, 0, 0.80556], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.825, 0, 0, 1.8889], 732: [0, 0.825, 0, 0, 1.8889], 770: [0, 0.825, 0, 0, 1.8889], 771: [0, 0.825, 0, 0, 1.8889], 8730: [1.25003, 1.75, 0, 0, 1], 8968: [1.25003, 1.75, 0, 0, 0.63889], 8969: [1.25003, 1.75, 0, 0, 0.63889], 8970: [1.25003, 1.75, 0, 0, 0.63889], 8971: [1.25003, 1.75, 0, 0, 0.63889], 9115: [0.64502, 1.155, 0, 0, 0.875], 9116: [1e-5, 0.6, 0, 0, 0.875], 9117: [0.64502, 1.155, 0, 0, 0.875], 9118: [0.64502, 1.155, 0, 0, 0.875], 9119: [1e-5, 0.6, 0, 0, 0.875], 9120: [0.64502, 1.155, 0, 0, 0.875], 9121: [0.64502, 1.155, 0, 0, 0.66667], 9122: [-99e-5, 0.601, 0, 0, 0.66667], 9123: [0.64502, 1.155, 0, 0, 0.66667], 9124: [0.64502, 1.155, 0, 0, 0.66667], 9125: [-99e-5, 0.601, 0, 0, 0.66667], 9126: [0.64502, 1.155, 0, 0, 0.66667], 9127: [1e-5, 0.9, 0, 0, 0.88889], 9128: [0.65002, 1.15, 0, 0, 0.88889], 9129: [0.90001, 0, 0, 0, 0.88889], 9130: [0, 0.3, 0, 0, 0.88889], 9131: [1e-5, 0.9, 0, 0, 0.88889], 9132: [0.65002, 1.15, 0, 0, 0.88889], 9133: [0.90001, 0, 0, 0, 0.88889], 9143: [0.88502, 0.915, 0, 0, 1.05556], 10216: [1.25003, 1.75, 0, 0, 0.80556], 10217: [1.25003, 1.75, 0, 0, 0.80556], 57344: [-499e-5, 0.605, 0, 0, 1.05556], 57345: [-499e-5, 0.605, 0, 0, 1.05556], 57680: [0, 0.12, 0, 0, 0.45], 57681: [0, 0.12, 0, 0, 0.45], 57682: [0, 0.12, 0, 0, 0.45], 57683: [0, 0.12, 0, 0, 0.45] }, "Typewriter-Regular": { 32: [0, 0, 0, 0, 0.525], 33: [0, 0.61111, 0, 0, 0.525], 34: [0, 0.61111, 0, 0, 0.525], 35: [0, 0.61111, 0, 0, 0.525], 36: [0.08333, 0.69444, 0, 0, 0.525], 37: [0.08333, 0.69444, 0, 0, 0.525], 38: [0, 0.61111, 0, 0, 0.525], 39: [0, 0.61111, 0, 0, 0.525], 40: [0.08333, 0.69444, 0, 0, 0.525], 41: [0.08333, 0.69444, 0, 0, 0.525], 42: [0, 0.52083, 0, 0, 0.525], 43: [-0.08056, 0.53055, 0, 0, 0.525], 44: [0.13889, 0.125, 0, 0, 0.525], 45: [-0.08056, 0.53055, 0, 0, 0.525], 46: [0, 0.125, 0, 0, 0.525], 47: [0.08333, 0.69444, 0, 0, 0.525], 48: [0, 0.61111, 0, 0, 0.525], 49: [0, 0.61111, 0, 0, 0.525], 50: [0, 0.61111, 0, 0, 0.525], 51: [0, 0.61111, 0, 0, 0.525], 52: [0, 0.61111, 0, 0, 0.525], 53: [0, 0.61111, 0, 0, 0.525], 54: [0, 0.61111, 0, 0, 0.525], 55: [0, 0.61111, 0, 0, 0.525], 56: [0, 0.61111, 0, 0, 0.525], 57: [0, 0.61111, 0, 0, 0.525], 58: [0, 0.43056, 0, 0, 0.525], 59: [0.13889, 0.43056, 0, 0, 0.525], 60: [-0.05556, 0.55556, 0, 0, 0.525], 61: [-0.19549, 0.41562, 0, 0, 0.525], 62: [-0.05556, 0.55556, 0, 0, 0.525], 63: [0, 0.61111, 0, 0, 0.525], 64: [0, 0.61111, 0, 0, 0.525], 65: [0, 0.61111, 0, 0, 0.525], 66: [0, 0.61111, 0, 0, 0.525], 67: [0, 0.61111, 0, 0, 0.525], 68: [0, 0.61111, 0, 0, 0.525], 69: [0, 0.61111, 0, 0, 0.525], 70: [0, 0.61111, 0, 0, 0.525], 71: [0, 0.61111, 0, 0, 0.525], 72: [0, 0.61111, 0, 0, 0.525], 73: [0, 0.61111, 0, 0, 0.525], 74: [0, 0.61111, 0, 0, 0.525], 75: [0, 0.61111, 0, 0, 0.525], 76: [0, 0.61111, 0, 0, 0.525], 77: [0, 0.61111, 0, 0, 0.525], 78: [0, 0.61111, 0, 0, 0.525], 79: [0, 0.61111, 0, 0, 0.525], 80: [0, 0.61111, 0, 0, 0.525], 81: [0.13889, 0.61111, 0, 0, 0.525], 82: [0, 0.61111, 0, 0, 0.525], 83: [0, 0.61111, 0, 0, 0.525], 84: [0, 0.61111, 0, 0, 0.525], 85: [0, 0.61111, 0, 0, 0.525], 86: [0, 0.61111, 0, 0, 0.525], 87: [0, 0.61111, 0, 0, 0.525], 88: [0, 0.61111, 0, 0, 0.525], 89: [0, 0.61111, 0, 0, 0.525], 90: [0, 0.61111, 0, 0, 0.525], 91: [0.08333, 0.69444, 0, 0, 0.525], 92: [0.08333, 0.69444, 0, 0, 0.525], 93: [0.08333, 0.69444, 0, 0, 0.525], 94: [0, 0.61111, 0, 0, 0.525], 95: [0.09514, 0, 0, 0, 0.525], 96: [0, 0.61111, 0, 0, 0.525], 97: [0, 0.43056, 0, 0, 0.525], 98: [0, 0.61111, 0, 0, 0.525], 99: [0, 0.43056, 0, 0, 0.525], 100: [0, 0.61111, 0, 0, 0.525], 101: [0, 0.43056, 0, 0, 0.525], 102: [0, 0.61111, 0, 0, 0.525], 103: [0.22222, 0.43056, 0, 0, 0.525], 104: [0, 0.61111, 0, 0, 0.525], 105: [0, 0.61111, 0, 0, 0.525], 106: [0.22222, 0.61111, 0, 0, 0.525], 107: [0, 0.61111, 0, 0, 0.525], 108: [0, 0.61111, 0, 0, 0.525], 109: [0, 0.43056, 0, 0, 0.525], 110: [0, 0.43056, 0, 0, 0.525], 111: [0, 0.43056, 0, 0, 0.525], 112: [0.22222, 0.43056, 0, 0, 0.525], 113: [0.22222, 0.43056, 0, 0, 0.525], 114: [0, 0.43056, 0, 0, 0.525], 115: [0, 0.43056, 0, 0, 0.525], 116: [0, 0.55358, 0, 0, 0.525], 117: [0, 0.43056, 0, 0, 0.525], 118: [0, 0.43056, 0, 0, 0.525], 119: [0, 0.43056, 0, 0, 0.525], 120: [0, 0.43056, 0, 0, 0.525], 121: [0.22222, 0.43056, 0, 0, 0.525], 122: [0, 0.43056, 0, 0, 0.525], 123: [0.08333, 0.69444, 0, 0, 0.525], 124: [0.08333, 0.69444, 0, 0, 0.525], 125: [0.08333, 0.69444, 0, 0, 0.525], 126: [0, 0.61111, 0, 0, 0.525], 127: [0, 0.61111, 0, 0, 0.525], 160: [0, 0, 0, 0, 0.525], 176: [0, 0.61111, 0, 0, 0.525], 184: [0.19445, 0, 0, 0, 0.525], 305: [0, 0.43056, 0, 0, 0.525], 567: [0.22222, 0.43056, 0, 0, 0.525], 711: [0, 0.56597, 0, 0, 0.525], 713: [0, 0.56555, 0, 0, 0.525], 714: [0, 0.61111, 0, 0, 0.525], 715: [0, 0.61111, 0, 0, 0.525], 728: [0, 0.61111, 0, 0, 0.525], 730: [0, 0.61111, 0, 0, 0.525], 770: [0, 0.61111, 0, 0, 0.525], 771: [0, 0.61111, 0, 0, 0.525], 776: [0, 0.61111, 0, 0, 0.525], 915: [0, 0.61111, 0, 0, 0.525], 916: [0, 0.61111, 0, 0, 0.525], 920: [0, 0.61111, 0, 0, 0.525], 923: [0, 0.61111, 0, 0, 0.525], 926: [0, 0.61111, 0, 0, 0.525], 928: [0, 0.61111, 0, 0, 0.525], 931: [0, 0.61111, 0, 0, 0.525], 933: [0, 0.61111, 0, 0, 0.525], 934: [0, 0.61111, 0, 0, 0.525], 936: [0, 0.61111, 0, 0, 0.525], 937: [0, 0.61111, 0, 0, 0.525], 8216: [0, 0.61111, 0, 0, 0.525], 8217: [0, 0.61111, 0, 0, 0.525], 8242: [0, 0.61111, 0, 0, 0.525], 9251: [0.11111, 0.21944, 0, 0, 0.525] } }, fr = { slant: [0.25, 0.25, 0.25], space: [0, 0, 0], stretch: [0, 0, 0], shrink: [0, 0, 0], xHeight: [0.431, 0.431, 0.431], quad: [1, 1.171, 1.472], extraSpace: [0, 0, 0], num1: [0.677, 0.732, 0.925], num2: [0.394, 0.384, 0.387], num3: [0.444, 0.471, 0.504], denom1: [0.686, 0.752, 1.025], denom2: [0.345, 0.344, 0.532], sup1: [0.413, 0.503, 0.504], sup2: [0.363, 0.431, 0.404], sup3: [0.289, 0.286, 0.294], sub1: [0.15, 0.143, 0.2], sub2: [0.247, 0.286, 0.4], supDrop: [0.386, 0.353, 0.494], subDrop: [0.05, 0.071, 0.1], delim1: [2.39, 1.7, 1.98], delim2: [1.01, 1.157, 1.42], axisHeight: [0.25, 0.25, 0.25], defaultRuleThickness: [0.04, 0.049, 0.049], bigOpSpacing1: [0.111, 0.111, 0.111], bigOpSpacing2: [0.166, 0.166, 0.166], bigOpSpacing3: [0.2, 0.2, 0.2], bigOpSpacing4: [0.6, 0.611, 0.611], bigOpSpacing5: [0.1, 0.143, 0.143], sqrtRuleThickness: [0.04, 0.04, 0.04], ptPerEm: [10, 10, 10], doubleRuleSep: [0.2, 0.2, 0.2], arrayRuleWidth: [0.04, 0.04, 0.04], fboxsep: [0.3, 0.3, 0.3], fboxrule: [0.04, 0.04, 0.04] }, Y4 = { \u00C5: "A", \u00D0: "D", \u00DE: "o", \u00E5: "a", \u00F0: "d", \u00FE: "o", \u0410: "A", \u0411: "B", \u0412: "B", \u0413: "F", \u0414: "A", \u0415: "E", \u0416: "K", \u0417: "3", \u0418: "N", \u0419: "N", \u041A: "K", \u041B: "N", \u041C: "M", \u041D: "H", \u041E: "O", \u041F: "N", \u0420: "P", \u0421: "C", \u0422: "T", \u0423: "y", \u0424: "O", \u0425: "X", \u0426: "U", \u0427: "h", \u0428: "W", \u0429: "W", \u042A: "B", \u042B: "X", \u042C: "B", \u042D: "3", \u042E: "X", \u042F: "R", \u0430: "a", \u0431: "b", \u0432: "a", \u0433: "r", \u0434: "y", \u0435: "e", \u0436: "m", \u0437: "e", \u0438: "n", \u0439: "n", \u043A: "n", \u043B: "n", \u043C: "m", \u043D: "n", \u043E: "o", \u043F: "n", \u0440: "p", \u0441: "c", \u0442: "o", \u0443: "y", \u0444: "b", \u0445: "x", \u0446: "n", \u0447: "n", \u0448: "w", \u0449: "w", \u044A: "a", \u044B: "m", \u044C: "a", \u044D: "e", \u044E: "m", \u044F: "r" };
function $i(r, e) {
  ke[r] = e;
}
function Ya(r, e, t) {
  if (!ke[e]) throw new Error("Font metrics not found for font: " + e + ".");
  var a = r.charCodeAt(0), n = ke[e][a];
  if (!n && r[0] in Y4 && (a = Y4[r[0]].charCodeAt(0), n = ke[e][a]), !n && t === "text" && Ni(a) && (n = ke[e][77]), n) return { depth: n[0], height: n[1], italic: n[2], skew: n[3], width: n[4] };
}
var C1 = {};
function b5(r) {
  var e;
  if (r >= 5 ? e = 0 : r >= 3 ? e = 1 : e = 2, !C1[e]) {
    var t = C1[e] = { cssEmPerMu: fr.quad[e] / 18 };
    for (var a in fr) fr.hasOwnProperty(a) && (t[a] = fr[a][e]);
  }
  return C1[e];
}
var b0 = { math: {}, text: {} };
function o(r, e, t, a, n, i) {
  b0[r][n] = { font: e, group: t, replace: a }, i && a && (b0[r][a] = b0[r][n]);
}
var c = "math", R = "text", p = "main", S = "ams", x0 = "accent-token", K = "bin", _0 = "close", Ft = "inner", t0 = "mathord", I0 = "op-token", he = "open", ir = "punct", A = "rel", Ye = "spacing", T = "textord";
o(c, p, A, "\u2261", "\\equiv", true);
o(c, p, A, "\u227A", "\\prec", true);
o(c, p, A, "\u227B", "\\succ", true);
o(c, p, A, "\u223C", "\\sim", true);
o(c, p, A, "\u22A5", "\\perp");
o(c, p, A, "\u2AAF", "\\preceq", true);
o(c, p, A, "\u2AB0", "\\succeq", true);
o(c, p, A, "\u2243", "\\simeq", true);
o(c, p, A, "\u2223", "\\mid", true);
o(c, p, A, "\u226A", "\\ll", true);
o(c, p, A, "\u226B", "\\gg", true);
o(c, p, A, "\u224D", "\\asymp", true);
o(c, p, A, "\u2225", "\\parallel");
o(c, p, A, "\u22C8", "\\bowtie", true);
o(c, p, A, "\u2323", "\\smile", true);
o(c, p, A, "\u2291", "\\sqsubseteq", true);
o(c, p, A, "\u2292", "\\sqsupseteq", true);
o(c, p, A, "\u2250", "\\doteq", true);
o(c, p, A, "\u2322", "\\frown", true);
o(c, p, A, "\u220B", "\\ni", true);
o(c, p, A, "\u221D", "\\propto", true);
o(c, p, A, "\u22A2", "\\vdash", true);
o(c, p, A, "\u22A3", "\\dashv", true);
o(c, p, A, "\u220B", "\\owns");
o(c, p, ir, ".", "\\ldotp");
o(c, p, ir, "\u22C5", "\\cdotp");
o(c, p, ir, "\u22C5", "\xB7");
o(R, p, T, "\u22C5", "\xB7");
o(c, p, T, "#", "\\#");
o(R, p, T, "#", "\\#");
o(c, p, T, "&", "\\&");
o(R, p, T, "&", "\\&");
o(c, p, T, "\u2135", "\\aleph", true);
o(c, p, T, "\u2200", "\\forall", true);
o(c, p, T, "\u210F", "\\hbar", true);
o(c, p, T, "\u2203", "\\exists", true);
o(c, p, T, "\u2207", "\\nabla", true);
o(c, p, T, "\u266D", "\\flat", true);
o(c, p, T, "\u2113", "\\ell", true);
o(c, p, T, "\u266E", "\\natural", true);
o(c, p, T, "\u2663", "\\clubsuit", true);
o(c, p, T, "\u2118", "\\wp", true);
o(c, p, T, "\u266F", "\\sharp", true);
o(c, p, T, "\u2662", "\\diamondsuit", true);
o(c, p, T, "\u211C", "\\Re", true);
o(c, p, T, "\u2661", "\\heartsuit", true);
o(c, p, T, "\u2111", "\\Im", true);
o(c, p, T, "\u2660", "\\spadesuit", true);
o(c, p, T, "\xA7", "\\S", true);
o(R, p, T, "\xA7", "\\S");
o(c, p, T, "\xB6", "\\P", true);
o(R, p, T, "\xB6", "\\P");
o(c, p, T, "\u2020", "\\dag");
o(R, p, T, "\u2020", "\\dag");
o(R, p, T, "\u2020", "\\textdagger");
o(c, p, T, "\u2021", "\\ddag");
o(R, p, T, "\u2021", "\\ddag");
o(R, p, T, "\u2021", "\\textdaggerdbl");
o(c, p, _0, "\u23B1", "\\rmoustache", true);
o(c, p, he, "\u23B0", "\\lmoustache", true);
o(c, p, _0, "\u27EF", "\\rgroup", true);
o(c, p, he, "\u27EE", "\\lgroup", true);
o(c, p, K, "\u2213", "\\mp", true);
o(c, p, K, "\u2296", "\\ominus", true);
o(c, p, K, "\u228E", "\\uplus", true);
o(c, p, K, "\u2293", "\\sqcap", true);
o(c, p, K, "\u2217", "\\ast");
o(c, p, K, "\u2294", "\\sqcup", true);
o(c, p, K, "\u25EF", "\\bigcirc", true);
o(c, p, K, "\u2219", "\\bullet", true);
o(c, p, K, "\u2021", "\\ddagger");
o(c, p, K, "\u2240", "\\wr", true);
o(c, p, K, "\u2A3F", "\\amalg");
o(c, p, K, "&", "\\And");
o(c, p, A, "\u27F5", "\\longleftarrow", true);
o(c, p, A, "\u21D0", "\\Leftarrow", true);
o(c, p, A, "\u27F8", "\\Longleftarrow", true);
o(c, p, A, "\u27F6", "\\longrightarrow", true);
o(c, p, A, "\u21D2", "\\Rightarrow", true);
o(c, p, A, "\u27F9", "\\Longrightarrow", true);
o(c, p, A, "\u2194", "\\leftrightarrow", true);
o(c, p, A, "\u27F7", "\\longleftrightarrow", true);
o(c, p, A, "\u21D4", "\\Leftrightarrow", true);
o(c, p, A, "\u27FA", "\\Longleftrightarrow", true);
o(c, p, A, "\u21A6", "\\mapsto", true);
o(c, p, A, "\u27FC", "\\longmapsto", true);
o(c, p, A, "\u2197", "\\nearrow", true);
o(c, p, A, "\u21A9", "\\hookleftarrow", true);
o(c, p, A, "\u21AA", "\\hookrightarrow", true);
o(c, p, A, "\u2198", "\\searrow", true);
o(c, p, A, "\u21BC", "\\leftharpoonup", true);
o(c, p, A, "\u21C0", "\\rightharpoonup", true);
o(c, p, A, "\u2199", "\\swarrow", true);
o(c, p, A, "\u21BD", "\\leftharpoondown", true);
o(c, p, A, "\u21C1", "\\rightharpoondown", true);
o(c, p, A, "\u2196", "\\nwarrow", true);
o(c, p, A, "\u21CC", "\\rightleftharpoons", true);
o(c, S, A, "\u226E", "\\nless", true);
o(c, S, A, "\uE010", "\\@nleqslant");
o(c, S, A, "\uE011", "\\@nleqq");
o(c, S, A, "\u2A87", "\\lneq", true);
o(c, S, A, "\u2268", "\\lneqq", true);
o(c, S, A, "\uE00C", "\\@lvertneqq");
o(c, S, A, "\u22E6", "\\lnsim", true);
o(c, S, A, "\u2A89", "\\lnapprox", true);
o(c, S, A, "\u2280", "\\nprec", true);
o(c, S, A, "\u22E0", "\\npreceq", true);
o(c, S, A, "\u22E8", "\\precnsim", true);
o(c, S, A, "\u2AB9", "\\precnapprox", true);
o(c, S, A, "\u2241", "\\nsim", true);
o(c, S, A, "\uE006", "\\@nshortmid");
o(c, S, A, "\u2224", "\\nmid", true);
o(c, S, A, "\u22AC", "\\nvdash", true);
o(c, S, A, "\u22AD", "\\nvDash", true);
o(c, S, A, "\u22EA", "\\ntriangleleft");
o(c, S, A, "\u22EC", "\\ntrianglelefteq", true);
o(c, S, A, "\u228A", "\\subsetneq", true);
o(c, S, A, "\uE01A", "\\@varsubsetneq");
o(c, S, A, "\u2ACB", "\\subsetneqq", true);
o(c, S, A, "\uE017", "\\@varsubsetneqq");
o(c, S, A, "\u226F", "\\ngtr", true);
o(c, S, A, "\uE00F", "\\@ngeqslant");
o(c, S, A, "\uE00E", "\\@ngeqq");
o(c, S, A, "\u2A88", "\\gneq", true);
o(c, S, A, "\u2269", "\\gneqq", true);
o(c, S, A, "\uE00D", "\\@gvertneqq");
o(c, S, A, "\u22E7", "\\gnsim", true);
o(c, S, A, "\u2A8A", "\\gnapprox", true);
o(c, S, A, "\u2281", "\\nsucc", true);
o(c, S, A, "\u22E1", "\\nsucceq", true);
o(c, S, A, "\u22E9", "\\succnsim", true);
o(c, S, A, "\u2ABA", "\\succnapprox", true);
o(c, S, A, "\u2246", "\\ncong", true);
o(c, S, A, "\uE007", "\\@nshortparallel");
o(c, S, A, "\u2226", "\\nparallel", true);
o(c, S, A, "\u22AF", "\\nVDash", true);
o(c, S, A, "\u22EB", "\\ntriangleright");
o(c, S, A, "\u22ED", "\\ntrianglerighteq", true);
o(c, S, A, "\uE018", "\\@nsupseteqq");
o(c, S, A, "\u228B", "\\supsetneq", true);
o(c, S, A, "\uE01B", "\\@varsupsetneq");
o(c, S, A, "\u2ACC", "\\supsetneqq", true);
o(c, S, A, "\uE019", "\\@varsupsetneqq");
o(c, S, A, "\u22AE", "\\nVdash", true);
o(c, S, A, "\u2AB5", "\\precneqq", true);
o(c, S, A, "\u2AB6", "\\succneqq", true);
o(c, S, A, "\uE016", "\\@nsubseteqq");
o(c, S, K, "\u22B4", "\\unlhd");
o(c, S, K, "\u22B5", "\\unrhd");
o(c, S, A, "\u219A", "\\nleftarrow", true);
o(c, S, A, "\u219B", "\\nrightarrow", true);
o(c, S, A, "\u21CD", "\\nLeftarrow", true);
o(c, S, A, "\u21CF", "\\nRightarrow", true);
o(c, S, A, "\u21AE", "\\nleftrightarrow", true);
o(c, S, A, "\u21CE", "\\nLeftrightarrow", true);
o(c, S, A, "\u25B3", "\\vartriangle");
o(c, S, T, "\u210F", "\\hslash");
o(c, S, T, "\u25BD", "\\triangledown");
o(c, S, T, "\u25CA", "\\lozenge");
o(c, S, T, "\u24C8", "\\circledS");
o(c, S, T, "\xAE", "\\circledR");
o(R, S, T, "\xAE", "\\circledR");
o(c, S, T, "\u2221", "\\measuredangle", true);
o(c, S, T, "\u2204", "\\nexists");
o(c, S, T, "\u2127", "\\mho");
o(c, S, T, "\u2132", "\\Finv", true);
o(c, S, T, "\u2141", "\\Game", true);
o(c, S, T, "\u2035", "\\backprime");
o(c, S, T, "\u25B2", "\\blacktriangle");
o(c, S, T, "\u25BC", "\\blacktriangledown");
o(c, S, T, "\u25A0", "\\blacksquare");
o(c, S, T, "\u29EB", "\\blacklozenge");
o(c, S, T, "\u2605", "\\bigstar");
o(c, S, T, "\u2222", "\\sphericalangle", true);
o(c, S, T, "\u2201", "\\complement", true);
o(c, S, T, "\xF0", "\\eth", true);
o(R, p, T, "\xF0", "\xF0");
o(c, S, T, "\u2571", "\\diagup");
o(c, S, T, "\u2572", "\\diagdown");
o(c, S, T, "\u25A1", "\\square");
o(c, S, T, "\u25A1", "\\Box");
o(c, S, T, "\u25CA", "\\Diamond");
o(c, S, T, "\xA5", "\\yen", true);
o(R, S, T, "\xA5", "\\yen", true);
o(c, S, T, "\u2713", "\\checkmark", true);
o(R, S, T, "\u2713", "\\checkmark");
o(c, S, T, "\u2136", "\\beth", true);
o(c, S, T, "\u2138", "\\daleth", true);
o(c, S, T, "\u2137", "\\gimel", true);
o(c, S, T, "\u03DD", "\\digamma", true);
o(c, S, T, "\u03F0", "\\varkappa");
o(c, S, he, "\u250C", "\\@ulcorner", true);
o(c, S, _0, "\u2510", "\\@urcorner", true);
o(c, S, he, "\u2514", "\\@llcorner", true);
o(c, S, _0, "\u2518", "\\@lrcorner", true);
o(c, S, A, "\u2266", "\\leqq", true);
o(c, S, A, "\u2A7D", "\\leqslant", true);
o(c, S, A, "\u2A95", "\\eqslantless", true);
o(c, S, A, "\u2272", "\\lesssim", true);
o(c, S, A, "\u2A85", "\\lessapprox", true);
o(c, S, A, "\u224A", "\\approxeq", true);
o(c, S, K, "\u22D6", "\\lessdot");
o(c, S, A, "\u22D8", "\\lll", true);
o(c, S, A, "\u2276", "\\lessgtr", true);
o(c, S, A, "\u22DA", "\\lesseqgtr", true);
o(c, S, A, "\u2A8B", "\\lesseqqgtr", true);
o(c, S, A, "\u2251", "\\doteqdot");
o(c, S, A, "\u2253", "\\risingdotseq", true);
o(c, S, A, "\u2252", "\\fallingdotseq", true);
o(c, S, A, "\u223D", "\\backsim", true);
o(c, S, A, "\u22CD", "\\backsimeq", true);
o(c, S, A, "\u2AC5", "\\subseteqq", true);
o(c, S, A, "\u22D0", "\\Subset", true);
o(c, S, A, "\u228F", "\\sqsubset", true);
o(c, S, A, "\u227C", "\\preccurlyeq", true);
o(c, S, A, "\u22DE", "\\curlyeqprec", true);
o(c, S, A, "\u227E", "\\precsim", true);
o(c, S, A, "\u2AB7", "\\precapprox", true);
o(c, S, A, "\u22B2", "\\vartriangleleft");
o(c, S, A, "\u22B4", "\\trianglelefteq");
o(c, S, A, "\u22A8", "\\vDash", true);
o(c, S, A, "\u22AA", "\\Vvdash", true);
o(c, S, A, "\u2323", "\\smallsmile");
o(c, S, A, "\u2322", "\\smallfrown");
o(c, S, A, "\u224F", "\\bumpeq", true);
o(c, S, A, "\u224E", "\\Bumpeq", true);
o(c, S, A, "\u2267", "\\geqq", true);
o(c, S, A, "\u2A7E", "\\geqslant", true);
o(c, S, A, "\u2A96", "\\eqslantgtr", true);
o(c, S, A, "\u2273", "\\gtrsim", true);
o(c, S, A, "\u2A86", "\\gtrapprox", true);
o(c, S, K, "\u22D7", "\\gtrdot");
o(c, S, A, "\u22D9", "\\ggg", true);
o(c, S, A, "\u2277", "\\gtrless", true);
o(c, S, A, "\u22DB", "\\gtreqless", true);
o(c, S, A, "\u2A8C", "\\gtreqqless", true);
o(c, S, A, "\u2256", "\\eqcirc", true);
o(c, S, A, "\u2257", "\\circeq", true);
o(c, S, A, "\u225C", "\\triangleq", true);
o(c, S, A, "\u223C", "\\thicksim");
o(c, S, A, "\u2248", "\\thickapprox");
o(c, S, A, "\u2AC6", "\\supseteqq", true);
o(c, S, A, "\u22D1", "\\Supset", true);
o(c, S, A, "\u2290", "\\sqsupset", true);
o(c, S, A, "\u227D", "\\succcurlyeq", true);
o(c, S, A, "\u22DF", "\\curlyeqsucc", true);
o(c, S, A, "\u227F", "\\succsim", true);
o(c, S, A, "\u2AB8", "\\succapprox", true);
o(c, S, A, "\u22B3", "\\vartriangleright");
o(c, S, A, "\u22B5", "\\trianglerighteq");
o(c, S, A, "\u22A9", "\\Vdash", true);
o(c, S, A, "\u2223", "\\shortmid");
o(c, S, A, "\u2225", "\\shortparallel");
o(c, S, A, "\u226C", "\\between", true);
o(c, S, A, "\u22D4", "\\pitchfork", true);
o(c, S, A, "\u221D", "\\varpropto");
o(c, S, A, "\u25C0", "\\blacktriangleleft");
o(c, S, A, "\u2234", "\\therefore", true);
o(c, S, A, "\u220D", "\\backepsilon");
o(c, S, A, "\u25B6", "\\blacktriangleright");
o(c, S, A, "\u2235", "\\because", true);
o(c, S, A, "\u22D8", "\\llless");
o(c, S, A, "\u22D9", "\\gggtr");
o(c, S, K, "\u22B2", "\\lhd");
o(c, S, K, "\u22B3", "\\rhd");
o(c, S, A, "\u2242", "\\eqsim", true);
o(c, p, A, "\u22C8", "\\Join");
o(c, S, A, "\u2251", "\\Doteq", true);
o(c, S, K, "\u2214", "\\dotplus", true);
o(c, S, K, "\u2216", "\\smallsetminus");
o(c, S, K, "\u22D2", "\\Cap", true);
o(c, S, K, "\u22D3", "\\Cup", true);
o(c, S, K, "\u2A5E", "\\doublebarwedge", true);
o(c, S, K, "\u229F", "\\boxminus", true);
o(c, S, K, "\u229E", "\\boxplus", true);
o(c, S, K, "\u22C7", "\\divideontimes", true);
o(c, S, K, "\u22C9", "\\ltimes", true);
o(c, S, K, "\u22CA", "\\rtimes", true);
o(c, S, K, "\u22CB", "\\leftthreetimes", true);
o(c, S, K, "\u22CC", "\\rightthreetimes", true);
o(c, S, K, "\u22CF", "\\curlywedge", true);
o(c, S, K, "\u22CE", "\\curlyvee", true);
o(c, S, K, "\u229D", "\\circleddash", true);
o(c, S, K, "\u229B", "\\circledast", true);
o(c, S, K, "\u22C5", "\\centerdot");
o(c, S, K, "\u22BA", "\\intercal", true);
o(c, S, K, "\u22D2", "\\doublecap");
o(c, S, K, "\u22D3", "\\doublecup");
o(c, S, K, "\u22A0", "\\boxtimes", true);
o(c, S, A, "\u21E2", "\\dashrightarrow", true);
o(c, S, A, "\u21E0", "\\dashleftarrow", true);
o(c, S, A, "\u21C7", "\\leftleftarrows", true);
o(c, S, A, "\u21C6", "\\leftrightarrows", true);
o(c, S, A, "\u21DA", "\\Lleftarrow", true);
o(c, S, A, "\u219E", "\\twoheadleftarrow", true);
o(c, S, A, "\u21A2", "\\leftarrowtail", true);
o(c, S, A, "\u21AB", "\\looparrowleft", true);
o(c, S, A, "\u21CB", "\\leftrightharpoons", true);
o(c, S, A, "\u21B6", "\\curvearrowleft", true);
o(c, S, A, "\u21BA", "\\circlearrowleft", true);
o(c, S, A, "\u21B0", "\\Lsh", true);
o(c, S, A, "\u21C8", "\\upuparrows", true);
o(c, S, A, "\u21BF", "\\upharpoonleft", true);
o(c, S, A, "\u21C3", "\\downharpoonleft", true);
o(c, p, A, "\u22B6", "\\origof", true);
o(c, p, A, "\u22B7", "\\imageof", true);
o(c, S, A, "\u22B8", "\\multimap", true);
o(c, S, A, "\u21AD", "\\leftrightsquigarrow", true);
o(c, S, A, "\u21C9", "\\rightrightarrows", true);
o(c, S, A, "\u21C4", "\\rightleftarrows", true);
o(c, S, A, "\u21A0", "\\twoheadrightarrow", true);
o(c, S, A, "\u21A3", "\\rightarrowtail", true);
o(c, S, A, "\u21AC", "\\looparrowright", true);
o(c, S, A, "\u21B7", "\\curvearrowright", true);
o(c, S, A, "\u21BB", "\\circlearrowright", true);
o(c, S, A, "\u21B1", "\\Rsh", true);
o(c, S, A, "\u21CA", "\\downdownarrows", true);
o(c, S, A, "\u21BE", "\\upharpoonright", true);
o(c, S, A, "\u21C2", "\\downharpoonright", true);
o(c, S, A, "\u21DD", "\\rightsquigarrow", true);
o(c, S, A, "\u21DD", "\\leadsto");
o(c, S, A, "\u21DB", "\\Rrightarrow", true);
o(c, S, A, "\u21BE", "\\restriction");
o(c, p, T, "\u2018", "`");
o(c, p, T, "$", "\\$");
o(R, p, T, "$", "\\$");
o(R, p, T, "$", "\\textdollar");
o(c, p, T, "%", "\\%");
o(R, p, T, "%", "\\%");
o(c, p, T, "_", "\\_");
o(R, p, T, "_", "\\_");
o(R, p, T, "_", "\\textunderscore");
o(c, p, T, "\u2220", "\\angle", true);
o(c, p, T, "\u221E", "\\infty", true);
o(c, p, T, "\u2032", "\\prime");
o(c, p, T, "\u25B3", "\\triangle");
o(c, p, T, "\u0393", "\\Gamma", true);
o(c, p, T, "\u0394", "\\Delta", true);
o(c, p, T, "\u0398", "\\Theta", true);
o(c, p, T, "\u039B", "\\Lambda", true);
o(c, p, T, "\u039E", "\\Xi", true);
o(c, p, T, "\u03A0", "\\Pi", true);
o(c, p, T, "\u03A3", "\\Sigma", true);
o(c, p, T, "\u03A5", "\\Upsilon", true);
o(c, p, T, "\u03A6", "\\Phi", true);
o(c, p, T, "\u03A8", "\\Psi", true);
o(c, p, T, "\u03A9", "\\Omega", true);
o(c, p, T, "A", "\u0391");
o(c, p, T, "B", "\u0392");
o(c, p, T, "E", "\u0395");
o(c, p, T, "Z", "\u0396");
o(c, p, T, "H", "\u0397");
o(c, p, T, "I", "\u0399");
o(c, p, T, "K", "\u039A");
o(c, p, T, "M", "\u039C");
o(c, p, T, "N", "\u039D");
o(c, p, T, "O", "\u039F");
o(c, p, T, "P", "\u03A1");
o(c, p, T, "T", "\u03A4");
o(c, p, T, "X", "\u03A7");
o(c, p, T, "\xAC", "\\neg", true);
o(c, p, T, "\xAC", "\\lnot");
o(c, p, T, "\u22A4", "\\top");
o(c, p, T, "\u22A5", "\\bot");
o(c, p, T, "\u2205", "\\emptyset");
o(c, S, T, "\u2205", "\\varnothing");
o(c, p, t0, "\u03B1", "\\alpha", true);
o(c, p, t0, "\u03B2", "\\beta", true);
o(c, p, t0, "\u03B3", "\\gamma", true);
o(c, p, t0, "\u03B4", "\\delta", true);
o(c, p, t0, "\u03F5", "\\epsilon", true);
o(c, p, t0, "\u03B6", "\\zeta", true);
o(c, p, t0, "\u03B7", "\\eta", true);
o(c, p, t0, "\u03B8", "\\theta", true);
o(c, p, t0, "\u03B9", "\\iota", true);
o(c, p, t0, "\u03BA", "\\kappa", true);
o(c, p, t0, "\u03BB", "\\lambda", true);
o(c, p, t0, "\u03BC", "\\mu", true);
o(c, p, t0, "\u03BD", "\\nu", true);
o(c, p, t0, "\u03BE", "\\xi", true);
o(c, p, t0, "\u03BF", "\\omicron", true);
o(c, p, t0, "\u03C0", "\\pi", true);
o(c, p, t0, "\u03C1", "\\rho", true);
o(c, p, t0, "\u03C3", "\\sigma", true);
o(c, p, t0, "\u03C4", "\\tau", true);
o(c, p, t0, "\u03C5", "\\upsilon", true);
o(c, p, t0, "\u03D5", "\\phi", true);
o(c, p, t0, "\u03C7", "\\chi", true);
o(c, p, t0, "\u03C8", "\\psi", true);
o(c, p, t0, "\u03C9", "\\omega", true);
o(c, p, t0, "\u03B5", "\\varepsilon", true);
o(c, p, t0, "\u03D1", "\\vartheta", true);
o(c, p, t0, "\u03D6", "\\varpi", true);
o(c, p, t0, "\u03F1", "\\varrho", true);
o(c, p, t0, "\u03C2", "\\varsigma", true);
o(c, p, t0, "\u03C6", "\\varphi", true);
o(c, p, K, "\u2217", "*", true);
o(c, p, K, "+", "+");
o(c, p, K, "\u2212", "-", true);
o(c, p, K, "\u22C5", "\\cdot", true);
o(c, p, K, "\u2218", "\\circ", true);
o(c, p, K, "\xF7", "\\div", true);
o(c, p, K, "\xB1", "\\pm", true);
o(c, p, K, "\xD7", "\\times", true);
o(c, p, K, "\u2229", "\\cap", true);
o(c, p, K, "\u222A", "\\cup", true);
o(c, p, K, "\u2216", "\\setminus", true);
o(c, p, K, "\u2227", "\\land");
o(c, p, K, "\u2228", "\\lor");
o(c, p, K, "\u2227", "\\wedge", true);
o(c, p, K, "\u2228", "\\vee", true);
o(c, p, T, "\u221A", "\\surd");
o(c, p, he, "\u27E8", "\\langle", true);
o(c, p, he, "\u2223", "\\lvert");
o(c, p, he, "\u2225", "\\lVert");
o(c, p, _0, "?", "?");
o(c, p, _0, "!", "!");
o(c, p, _0, "\u27E9", "\\rangle", true);
o(c, p, _0, "\u2223", "\\rvert");
o(c, p, _0, "\u2225", "\\rVert");
o(c, p, A, "=", "=");
o(c, p, A, ":", ":");
o(c, p, A, "\u2248", "\\approx", true);
o(c, p, A, "\u2245", "\\cong", true);
o(c, p, A, "\u2265", "\\ge");
o(c, p, A, "\u2265", "\\geq", true);
o(c, p, A, "\u2190", "\\gets");
o(c, p, A, ">", "\\gt", true);
o(c, p, A, "\u2208", "\\in", true);
o(c, p, A, "\uE020", "\\@not");
o(c, p, A, "\u2282", "\\subset", true);
o(c, p, A, "\u2283", "\\supset", true);
o(c, p, A, "\u2286", "\\subseteq", true);
o(c, p, A, "\u2287", "\\supseteq", true);
o(c, S, A, "\u2288", "\\nsubseteq", true);
o(c, S, A, "\u2289", "\\nsupseteq", true);
o(c, p, A, "\u22A8", "\\models");
o(c, p, A, "\u2190", "\\leftarrow", true);
o(c, p, A, "\u2264", "\\le");
o(c, p, A, "\u2264", "\\leq", true);
o(c, p, A, "<", "\\lt", true);
o(c, p, A, "\u2192", "\\rightarrow", true);
o(c, p, A, "\u2192", "\\to");
o(c, S, A, "\u2271", "\\ngeq", true);
o(c, S, A, "\u2270", "\\nleq", true);
o(c, p, Ye, "\xA0", "\\ ");
o(c, p, Ye, "\xA0", "\\space");
o(c, p, Ye, "\xA0", "\\nobreakspace");
o(R, p, Ye, "\xA0", "\\ ");
o(R, p, Ye, "\xA0", " ");
o(R, p, Ye, "\xA0", "\\space");
o(R, p, Ye, "\xA0", "\\nobreakspace");
o(c, p, Ye, "", "\\nobreak");
o(c, p, Ye, "", "\\allowbreak");
o(c, p, ir, ",", ",");
o(c, p, ir, ";", ";");
o(c, S, K, "\u22BC", "\\barwedge", true);
o(c, S, K, "\u22BB", "\\veebar", true);
o(c, p, K, "\u2299", "\\odot", true);
o(c, p, K, "\u2295", "\\oplus", true);
o(c, p, K, "\u2297", "\\otimes", true);
o(c, p, T, "\u2202", "\\partial", true);
o(c, p, K, "\u2298", "\\oslash", true);
o(c, S, K, "\u229A", "\\circledcirc", true);
o(c, S, K, "\u22A1", "\\boxdot", true);
o(c, p, K, "\u25B3", "\\bigtriangleup");
o(c, p, K, "\u25BD", "\\bigtriangledown");
o(c, p, K, "\u2020", "\\dagger");
o(c, p, K, "\u22C4", "\\diamond");
o(c, p, K, "\u22C6", "\\star");
o(c, p, K, "\u25C3", "\\triangleleft");
o(c, p, K, "\u25B9", "\\triangleright");
o(c, p, he, "{", "\\{");
o(R, p, T, "{", "\\{");
o(R, p, T, "{", "\\textbraceleft");
o(c, p, _0, "}", "\\}");
o(R, p, T, "}", "\\}");
o(R, p, T, "}", "\\textbraceright");
o(c, p, he, "{", "\\lbrace");
o(c, p, _0, "}", "\\rbrace");
o(c, p, he, "[", "\\lbrack", true);
o(R, p, T, "[", "\\lbrack", true);
o(c, p, _0, "]", "\\rbrack", true);
o(R, p, T, "]", "\\rbrack", true);
o(c, p, he, "(", "\\lparen", true);
o(c, p, _0, ")", "\\rparen", true);
o(R, p, T, "<", "\\textless", true);
o(R, p, T, ">", "\\textgreater", true);
o(c, p, he, "\u230A", "\\lfloor", true);
o(c, p, _0, "\u230B", "\\rfloor", true);
o(c, p, he, "\u2308", "\\lceil", true);
o(c, p, _0, "\u2309", "\\rceil", true);
o(c, p, T, "\\", "\\backslash");
o(c, p, T, "\u2223", "|");
o(c, p, T, "\u2223", "\\vert");
o(R, p, T, "|", "\\textbar", true);
o(c, p, T, "\u2225", "\\|");
o(c, p, T, "\u2225", "\\Vert");
o(R, p, T, "\u2225", "\\textbardbl");
o(R, p, T, "~", "\\textasciitilde");
o(R, p, T, "\\", "\\textbackslash");
o(R, p, T, "^", "\\textasciicircum");
o(c, p, A, "\u2191", "\\uparrow", true);
o(c, p, A, "\u21D1", "\\Uparrow", true);
o(c, p, A, "\u2193", "\\downarrow", true);
o(c, p, A, "\u21D3", "\\Downarrow", true);
o(c, p, A, "\u2195", "\\updownarrow", true);
o(c, p, A, "\u21D5", "\\Updownarrow", true);
o(c, p, I0, "\u2210", "\\coprod");
o(c, p, I0, "\u22C1", "\\bigvee");
o(c, p, I0, "\u22C0", "\\bigwedge");
o(c, p, I0, "\u2A04", "\\biguplus");
o(c, p, I0, "\u22C2", "\\bigcap");
o(c, p, I0, "\u22C3", "\\bigcup");
o(c, p, I0, "\u222B", "\\int");
o(c, p, I0, "\u222B", "\\intop");
o(c, p, I0, "\u222C", "\\iint");
o(c, p, I0, "\u222D", "\\iiint");
o(c, p, I0, "\u220F", "\\prod");
o(c, p, I0, "\u2211", "\\sum");
o(c, p, I0, "\u2A02", "\\bigotimes");
o(c, p, I0, "\u2A01", "\\bigoplus");
o(c, p, I0, "\u2A00", "\\bigodot");
o(c, p, I0, "\u222E", "\\oint");
o(c, p, I0, "\u222F", "\\oiint");
o(c, p, I0, "\u2230", "\\oiiint");
o(c, p, I0, "\u2A06", "\\bigsqcup");
o(c, p, I0, "\u222B", "\\smallint");
o(R, p, Ft, "\u2026", "\\textellipsis");
o(c, p, Ft, "\u2026", "\\mathellipsis");
o(R, p, Ft, "\u2026", "\\ldots", true);
o(c, p, Ft, "\u2026", "\\ldots", true);
o(c, p, Ft, "\u22EF", "\\@cdots", true);
o(c, p, Ft, "\u22F1", "\\ddots", true);
o(c, p, T, "\u22EE", "\\varvdots");
o(R, p, T, "\u22EE", "\\varvdots");
o(c, p, x0, "\u02CA", "\\acute");
o(c, p, x0, "\u02CB", "\\grave");
o(c, p, x0, "\xA8", "\\ddot");
o(c, p, x0, "~", "\\tilde");
o(c, p, x0, "\u02C9", "\\bar");
o(c, p, x0, "\u02D8", "\\breve");
o(c, p, x0, "\u02C7", "\\check");
o(c, p, x0, "^", "\\hat");
o(c, p, x0, "\u20D7", "\\vec");
o(c, p, x0, "\u02D9", "\\dot");
o(c, p, x0, "\u02DA", "\\mathring");
o(c, p, t0, "\uE131", "\\@imath");
o(c, p, t0, "\uE237", "\\@jmath");
o(c, p, T, "\u0131", "\u0131");
o(c, p, T, "\u0237", "\u0237");
o(R, p, T, "\u0131", "\\i", true);
o(R, p, T, "\u0237", "\\j", true);
o(R, p, T, "\xDF", "\\ss", true);
o(R, p, T, "\xE6", "\\ae", true);
o(R, p, T, "\u0153", "\\oe", true);
o(R, p, T, "\xF8", "\\o", true);
o(R, p, T, "\xC6", "\\AE", true);
o(R, p, T, "\u0152", "\\OE", true);
o(R, p, T, "\xD8", "\\O", true);
o(R, p, x0, "\u02CA", "\\'");
o(R, p, x0, "\u02CB", "\\`");
o(R, p, x0, "\u02C6", "\\^");
o(R, p, x0, "\u02DC", "\\~");
o(R, p, x0, "\u02C9", "\\=");
o(R, p, x0, "\u02D8", "\\u");
o(R, p, x0, "\u02D9", "\\.");
o(R, p, x0, "\xB8", "\\c");
o(R, p, x0, "\u02DA", "\\r");
o(R, p, x0, "\u02C7", "\\v");
o(R, p, x0, "\xA8", '\\"');
o(R, p, x0, "\u02DD", "\\H");
o(R, p, x0, "\u25EF", "\\textcircled");
var Hi = { "--": true, "---": true, "``": true, "''": true };
o(R, p, T, "\u2013", "--", true);
o(R, p, T, "\u2013", "\\textendash");
o(R, p, T, "\u2014", "---", true);
o(R, p, T, "\u2014", "\\textemdash");
o(R, p, T, "\u2018", "`", true);
o(R, p, T, "\u2018", "\\textquoteleft");
o(R, p, T, "\u2019", "'", true);
o(R, p, T, "\u2019", "\\textquoteright");
o(R, p, T, "\u201C", "``", true);
o(R, p, T, "\u201C", "\\textquotedblleft");
o(R, p, T, "\u201D", "''", true);
o(R, p, T, "\u201D", "\\textquotedblright");
o(c, p, T, "\xB0", "\\degree", true);
o(R, p, T, "\xB0", "\\degree");
o(R, p, T, "\xB0", "\\textdegree", true);
o(c, p, T, "\xA3", "\\pounds");
o(c, p, T, "\xA3", "\\mathsterling", true);
o(R, p, T, "\xA3", "\\pounds");
o(R, p, T, "\xA3", "\\textsterling", true);
o(c, S, T, "\u2720", "\\maltese");
o(R, S, T, "\u2720", "\\maltese");
var W4 = '0123456789/@."';
for (var D1 = 0; D1 < W4.length; D1++) {
  var j4 = W4.charAt(D1);
  o(c, p, T, j4, j4);
}
var Z4 = '0123456789!@*()-=+";:?/.,';
for (var q1 = 0; q1 < Z4.length; q1++) {
  var K4 = Z4.charAt(q1);
  o(R, p, T, K4, K4);
}
var qr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
for (var E1 = 0; E1 < qr.length; E1++) {
  var vr = qr.charAt(E1);
  o(c, p, t0, vr, vr), o(R, p, T, vr, vr);
}
o(c, S, T, "C", "\u2102");
o(R, S, T, "C", "\u2102");
o(c, S, T, "H", "\u210D");
o(R, S, T, "H", "\u210D");
o(c, S, T, "N", "\u2115");
o(R, S, T, "N", "\u2115");
o(c, S, T, "P", "\u2119");
o(R, S, T, "P", "\u2119");
o(c, S, T, "Q", "\u211A");
o(R, S, T, "Q", "\u211A");
o(c, S, T, "R", "\u211D");
o(R, S, T, "R", "\u211D");
o(c, S, T, "Z", "\u2124");
o(R, S, T, "Z", "\u2124");
o(c, p, t0, "h", "\u210E");
o(R, p, t0, "h", "\u210E");
var a0;
for (var W0 = 0; W0 < qr.length; W0++) {
  var B0 = qr.charAt(W0);
  a0 = String.fromCharCode(55349, 56320 + W0), o(c, p, t0, B0, a0), o(R, p, T, B0, a0), a0 = String.fromCharCode(55349, 56372 + W0), o(c, p, t0, B0, a0), o(R, p, T, B0, a0), a0 = String.fromCharCode(55349, 56424 + W0), o(c, p, t0, B0, a0), o(R, p, T, B0, a0), a0 = String.fromCharCode(55349, 56580 + W0), o(c, p, t0, B0, a0), o(R, p, T, B0, a0), a0 = String.fromCharCode(55349, 56684 + W0), o(c, p, t0, B0, a0), o(R, p, T, B0, a0), a0 = String.fromCharCode(55349, 56736 + W0), o(c, p, t0, B0, a0), o(R, p, T, B0, a0), a0 = String.fromCharCode(55349, 56788 + W0), o(c, p, t0, B0, a0), o(R, p, T, B0, a0), a0 = String.fromCharCode(55349, 56840 + W0), o(c, p, t0, B0, a0), o(R, p, T, B0, a0), a0 = String.fromCharCode(55349, 56944 + W0), o(c, p, t0, B0, a0), o(R, p, T, B0, a0), W0 < 26 && (a0 = String.fromCharCode(55349, 56632 + W0), o(c, p, t0, B0, a0), o(R, p, T, B0, a0), a0 = String.fromCharCode(55349, 56476 + W0), o(c, p, t0, B0, a0), o(R, p, T, B0, a0));
}
a0 = "\u{1D55C}";
o(c, p, t0, "k", a0);
o(R, p, T, "k", a0);
for (var ft = 0; ft < 10; ft++) {
  var Je = ft.toString();
  a0 = String.fromCharCode(55349, 57294 + ft), o(c, p, t0, Je, a0), o(R, p, T, Je, a0), a0 = String.fromCharCode(55349, 57314 + ft), o(c, p, t0, Je, a0), o(R, p, T, Je, a0), a0 = String.fromCharCode(55349, 57324 + ft), o(c, p, t0, Je, a0), o(R, p, T, Je, a0), a0 = String.fromCharCode(55349, 57334 + ft), o(c, p, t0, Je, a0), o(R, p, T, Je, a0);
}
var ca = "\xD0\xDE\xFE";
for (var N1 = 0; N1 < ca.length; N1++) {
  var pr = ca.charAt(N1);
  o(c, p, t0, pr, pr), o(R, p, T, pr, pr);
}
var da = { mathClass: "mathbf", textClass: "textbf", font: "Main-Bold" }, J4 = { mathClass: "mathnormal", textClass: "textit", font: "Math-Italic" }, Q4 = { mathClass: "boldsymbol", textClass: "boldsymbol", font: "Main-BoldItalic" }, y5 = { mathClass: "mathscr", textClass: "textscr", font: "Script-Regular" }, bt = { mathClass: "", textClass: "", font: "" }, _4 = { mathClass: "mathfrak", textClass: "textfrak", font: "Fraktur-Regular" }, en = { mathClass: "mathbb", textClass: "textbb", font: "AMS-Regular" }, tn = { mathClass: "mathboldfrak", textClass: "textboldfrak", font: "Fraktur-Regular" }, fa = { mathClass: "mathsf", textClass: "textsf", font: "SansSerif-Regular" }, va = { mathClass: "mathboldsf", textClass: "textboldsf", font: "SansSerif-Bold" }, rn = { mathClass: "mathitsf", textClass: "textitsf", font: "SansSerif-Italic" }, pa = { mathClass: "mathtt", textClass: "texttt", font: "Typewriter-Regular" }, an = [da, da, J4, J4, Q4, Q4, y5, bt, bt, bt, _4, _4, en, en, tn, tn, fa, fa, va, va, rn, rn, bt, bt, pa, pa], x5 = [da, bt, fa, va, pa], w5 = (r) => {
  var e = r.charCodeAt(0), t = r.charCodeAt(1), a = (e - 55296) * 1024 + (t - 56320) + 65536;
  if (119808 <= a && a < 120484) {
    var n = Math.floor((a - 119808) / 26);
    return an[n];
  } else if (120782 <= a && a <= 120831) {
    var i = Math.floor((a - 120782) / 10);
    return x5[i];
  } else {
    if (a === 120485 || a === 120486) return an[0];
    if (120486 < a && a < 120782) return bt;
    throw new $("Unsupported character: " + r);
  }
}, Wr = function(e, t, a) {
  if (b0[a][e]) {
    var n = b0[a][e].replace;
    n && (e = n);
  }
  return { value: e, metrics: Ya(e, t, a) };
}, Z0 = function(e, t, a, n, i) {
  var s = Wr(e, t, a), l = s.metrics;
  e = s.value;
  var h;
  if (l) {
    var d = l.italic;
    (a === "text" || n && n.font === "mathit") && (d = 0), h = new le(e, l.height, l.depth, d, l.skew, l.width, i);
  } else typeof console < "u" && console.warn("No character metrics " + ("for '" + e + "' in style '" + t + "' and mode '" + a + "'")), h = new le(e, 0, 0, 0, 0, 0, i);
  if (n) {
    h.maxFontSize = n.sizeMultiplier, n.style.isTight() && h.classes.push("mtight");
    var f = n.getColor();
    f && (h.style.color = f);
  }
  return h;
}, Wa = function(e, t, a, n) {
  return n === void 0 && (n = []), a.font === "boldsymbol" && Wr(e, "Main-Bold", t).metrics ? Z0(e, "Main-Bold", t, a, n.concat(["mathbf"])) : e === "\\" || b0[t][e].font === "main" ? Z0(e, "Main-Regular", t, a, n) : Z0(e, "AMS-Regular", t, a, n.concat(["amsrm"]));
}, k5 = function(e, t, a) {
  return a !== "textord" && Wr(e, "Math-BoldItalic", t).metrics ? { fontName: "Math-BoldItalic", fontClass: "boldsymbol" } : { fontName: "Main-Bold", fontClass: "mathbf" };
}, jr = function(e, t, a) {
  var n = e.mode, i = e.text, s = ["mord"], { font: l, fontFamily: h, fontWeight: d, fontShape: f } = t, y = n === "math" || n === "text" && !!l, x = y ? l : h, w = "", B = "";
  if (i.charCodeAt(0) === 55349) {
    var C = w5(i);
    w = C.font, B = C[n + "Class"];
  }
  if (w) return Z0(i, w, n, t, s.concat(B));
  if (x) {
    var D, q;
    if (x === "boldsymbol") {
      var E = k5(i, n, a);
      D = E.fontName, q = [E.fontClass];
    } else y ? (D = ga[l].fontName, q = [l]) : (D = gr(h, d, f), q = [h, d, f]);
    if (Wr(i, D, n).metrics) return Z0(i, D, n, t, s.concat(q));
    if (Hi.hasOwnProperty(i) && D.slice(0, 10) === "Typewriter") {
      for (var P = [], V = 0; V < i.length; V++) P.push(Z0(i[V], D, n, t, s.concat(q)));
      return We(P);
    }
  }
  if (a === "mathord") return Z0(i, "Math-Italic", n, t, s.concat(["mathnormal"]));
  if (a === "textord") {
    var X = b0[n][i] && b0[n][i].font;
    if (X === "ams") {
      var Y = gr("amsrm", d, f);
      return Z0(i, Y, n, t, s.concat("amsrm", d, f));
    } else if (X === "main" || !X) {
      var J = gr("textrm", d, f);
      return Z0(i, J, n, t, s.concat(d, f));
    } else {
      var Q = gr(X, d, f);
      return Z0(i, Q, n, t, s.concat(Q, d, f));
    }
  } else throw new Error("unexpected type: " + a + " in makeOrd");
}, S5 = (r, e) => {
  if (nt(r.classes) !== nt(e.classes) || r.skew !== e.skew || r.maxFontSize !== e.maxFontSize || r.italic !== 0 && r.hasClass("mathnormal")) return false;
  if (r.classes.length === 1) {
    var t = r.classes[0];
    if (t === "mbin" || t === "mord") return false;
  }
  for (var a of Object.keys(r.style)) if (r.style[a] !== e.style[a]) return false;
  for (var n of Object.keys(e.style)) if (r.style[n] !== e.style[n]) return false;
  return true;
}, Li = (r) => {
  for (var e = 0; e < r.length - 1; e++) {
    var t = r[e], a = r[e + 1];
    t instanceof le && a instanceof le && S5(t, a) && (t.text += a.text, t.height = Math.max(t.height, a.height), t.depth = Math.max(t.depth, a.depth), t.italic = a.italic, r.splice(e + 1, 1), e--);
  }
  return r;
}, ja = function(e) {
  for (var t = 0, a = 0, n = 0, i = 0; i < e.children.length; i++) {
    var s = e.children[i];
    s.height > t && (t = s.height), s.depth > a && (a = s.depth), s.maxFontSize > n && (n = s.maxFontSize);
  }
  e.height = t, e.depth = a, e.maxFontSize = n;
}, F = function(e, t, a, n) {
  var i = new It(e, t, a, n);
  return ja(i), i;
}, st = (r, e, t, a) => new It(r, e, t, a), Ct = function(e, t, a) {
  var n = F([e], [], t);
  return n.height = Math.max(a || t.fontMetrics().defaultRuleThickness, t.minRuleThickness), n.style.borderBottomWidth = U(n.height), n.maxFontSize = 1, n;
}, z5 = function(e, t, a, n) {
  var i = new Yr(e, t, a, n);
  return ja(i), i;
}, We = function(e) {
  var t = new Rt(e);
  return ja(t), t;
}, Dt = function(e, t) {
  return e instanceof Rt ? F([], [e], t) : e;
}, A5 = function(e) {
  if (e.positionType === "individualShift") {
    for (var t = e.children, a = [t[0]], n = -t[0].shift - t[0].elem.depth, i = n, s = 1; s < t.length; s++) {
      var l = -t[s].shift - i - t[s].elem.depth, h = l - (t[s - 1].elem.height + t[s - 1].elem.depth);
      i = i + l, a.push({ type: "kern", size: h }), a.push(t[s]);
    }
    return { children: a, depth: n };
  }
  var d;
  if (e.positionType === "top") {
    for (var f = e.positionData, y = 0; y < e.children.length; y++) {
      var x = e.children[y];
      f -= x.type === "kern" ? x.size : x.elem.height + x.elem.depth;
    }
    d = f;
  } else if (e.positionType === "bottom") d = -e.positionData;
  else {
    var w = e.children[0];
    if (w.type !== "elem") throw new Error('First child must have type "elem".');
    if (e.positionType === "shift") d = -w.elem.depth - e.positionData;
    else if (e.positionType === "firstBaseline") d = -w.elem.depth;
    else throw new Error("Invalid positionType " + e.positionType + ".");
  }
  return { children: e.children, depth: d };
}, c0 = function(e, t) {
  for (var { children: a, depth: n } = A5(e), i = 0, s = 0; s < a.length; s++) {
    var l = a[s];
    if (l.type === "elem") {
      var h = l.elem;
      i = Math.max(i, h.maxFontSize, h.height);
    }
  }
  i += 2;
  var d = F(["pstrut"], []);
  d.style.height = U(i);
  for (var f = [], y = n, x = n, w = n, B = 0; B < a.length; B++) {
    var C = a[B];
    if (C.type === "kern") w += C.size;
    else {
      var D = C.elem, q = C.wrapperClasses || [], E = C.wrapperStyle || {}, P = F(q, [d, D], void 0, E);
      P.style.top = U(-i - w - D.depth), C.marginLeft && (P.style.marginLeft = C.marginLeft), C.marginRight && (P.style.marginRight = C.marginRight), f.push(P), w += D.height + D.depth;
    }
    y = Math.min(y, w), x = Math.max(x, w);
  }
  var V = F(["vlist"], f);
  V.style.height = U(x);
  var X;
  if (y < 0) {
    var Y = F([], []), J = F(["vlist"], [Y]);
    J.style.height = U(-y);
    var Q = F(["vlist-s"], [new le("\u200B")]);
    X = [F(["vlist-r"], [V, Q]), F(["vlist-r"], [J])];
  } else X = [F(["vlist-r"], [V])];
  var _ = F(["vlist-t"], X);
  return X.length === 2 && _.classes.push("vlist-t2"), _.height = x, _.depth = -y, _;
}, Pi = (r, e) => {
  var t = F(["mspace"], [], e), a = M0(r, e);
  return t.style.marginRight = U(a), t;
}, gr = (r, e, t) => {
  var a, n;
  switch (r) {
    case "amsrm":
      a = "AMS";
      break;
    case "textrm":
      a = "Main";
      break;
    case "textsf":
      a = "SansSerif";
      break;
    case "texttt":
      a = "Typewriter";
      break;
    default:
      a = r;
  }
  return e === "textbf" && t === "textit" ? n = "BoldItalic" : e === "textbf" ? n = "Bold" : t === "textit" ? n = "Italic" : n = "Regular", a + "-" + n;
}, ga = { mathbf: { variant: "bold", fontName: "Main-Bold" }, mathrm: { variant: "normal", fontName: "Main-Regular" }, textit: { variant: "italic", fontName: "Main-Italic" }, mathit: { variant: "italic", fontName: "Main-Italic" }, mathnormal: { variant: "italic", fontName: "Math-Italic" }, mathsfit: { variant: "sans-serif-italic", fontName: "SansSerif-Italic" }, mathbb: { variant: "double-struck", fontName: "AMS-Regular" }, mathcal: { variant: "script", fontName: "Caligraphic-Regular" }, mathfrak: { variant: "fraktur", fontName: "Fraktur-Regular" }, mathscr: { variant: "script", fontName: "Script-Regular" }, mathsf: { variant: "sans-serif", fontName: "SansSerif-Regular" }, mathtt: { variant: "monospace", fontName: "Typewriter-Regular" } }, Gi = { vec: ["vec", 0.471, 0.714], oiintSize1: ["oiintSize1", 0.957, 0.499], oiintSize2: ["oiintSize2", 1.472, 0.659], oiiintSize1: ["oiiintSize1", 1.304, 0.499], oiiintSize2: ["oiiintSize2", 1.98, 0.659] }, Ui = function(e, t) {
  var [a, n, i] = Gi[e], s = new it(a), l = new Pe([s], { width: U(n), height: U(i), style: "width:" + U(n), viewBox: "0 0 " + 1e3 * n + " " + 1e3 * i, preserveAspectRatio: "xMinYMin" }), h = st(["overlay"], [l], t);
  return h.height = i, h.style.height = U(i), h.style.width = U(n), h;
}, z0 = { number: 3, unit: "mu" }, vt = { number: 4, unit: "mu" }, Fe = { number: 5, unit: "mu" }, M5 = { mord: { mop: z0, mbin: vt, mrel: Fe, minner: z0 }, mop: { mord: z0, mop: z0, mrel: Fe, minner: z0 }, mbin: { mord: vt, mop: vt, mopen: vt, minner: vt }, mrel: { mord: Fe, mop: Fe, mopen: Fe, minner: Fe }, mopen: {}, mclose: { mop: z0, mbin: vt, mrel: Fe, minner: z0 }, mpunct: { mord: z0, mop: z0, mrel: Fe, mopen: z0, mclose: z0, mpunct: z0, minner: z0 }, minner: { mord: z0, mop: z0, mbin: vt, mrel: Fe, mopen: z0, mpunct: z0, minner: z0 } }, T5 = { mord: { mop: z0 }, mop: { mord: z0, mop: z0 }, mbin: {}, mrel: {}, mopen: {}, mclose: { mop: z0 }, mpunct: {}, minner: { mop: z0 } }, Vi = {}, Er = {}, Nr = {};
function j(r) {
  for (var { type: e, names: t, props: a, handler: n, htmlBuilder: i, mathmlBuilder: s } = r, l = { type: e, numArgs: a.numArgs, argTypes: a.argTypes, allowedInArgument: !!a.allowedInArgument, allowedInText: !!a.allowedInText, allowedInMath: a.allowedInMath === void 0 ? true : a.allowedInMath, numOptionalArgs: a.numOptionalArgs || 0, infix: !!a.infix, primitive: !!a.primitive, handler: n }, h = 0; h < t.length; ++h) Vi[t[h]] = l;
  e && (i && (Er[e] = i), s && (Nr[e] = s));
}
function xt(r) {
  var { type: e, htmlBuilder: t, mathmlBuilder: a } = r;
  j({ type: e, names: [], props: { numArgs: 0 }, handler() {
    throw new Error("Should never be called.");
  }, htmlBuilder: t, mathmlBuilder: a });
}
var Rr = function(e) {
  return e.type === "ordgroup" && e.body.length === 1 ? e.body[0] : e;
}, E0 = function(e) {
  return e.type === "ordgroup" ? e.body : [e];
}, B5 = /* @__PURE__ */ new Set(["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"]), C5 = /* @__PURE__ */ new Set(["rightmost", "mrel", "mclose", "mpunct"]), D5 = { display: i0.DISPLAY, text: i0.TEXT, script: i0.SCRIPT, scriptscript: i0.SCRIPTSCRIPT }, q5 = { mord: "mord", mop: "mop", mbin: "mbin", mrel: "mrel", mopen: "mopen", mclose: "mclose", mpunct: "mpunct", minner: "minner" }, H0 = function(e, t, a, n) {
  n === void 0 && (n = [null, null]);
  for (var i = [], s = 0; s < e.length; s++) {
    var l = d0(e[s], t);
    if (l instanceof Rt) {
      var h = l.children;
      i.push(...h);
    } else i.push(l);
  }
  if (Li(i), !a) return i;
  var d = t;
  if (e.length === 1) {
    var f = e[0];
    f.type === "sizing" ? d = t.havingSize(f.size) : f.type === "styling" && (d = t.havingStyle(D5[f.style]));
  }
  var y = F([n[0] || "leftmost"], [], t), x = F([n[1] || "rightmost"], [], t), w = a === "root";
  return ba(i, (B, C) => {
    var D = C.classes[0], q = B.classes[0];
    D === "mbin" && C5.has(q) ? C.classes[0] = "mord" : q === "mbin" && B5.has(D) && (B.classes[0] = "mord");
  }, { node: y }, x, w), ba(i, (B, C) => {
    var D, q, E = xa(C), P = xa(B), V = E && P ? B.hasClass("mtight") ? (D = T5[E]) == null ? void 0 : D[P] : (q = M5[E]) == null ? void 0 : q[P] : null;
    if (V) return Pi(V, d);
  }, { node: y }, x, w), i;
}, ba = function(e, t, a, n, i) {
  n && e.push(n);
  for (var s = 0; s < e.length; s++) {
    var l = e[s], h = Xi(l);
    if (h) {
      ba(h.children, t, a, null, i);
      continue;
    }
    var d = !l.hasClass("mspace");
    if (d) {
      var f = t(l, a.node);
      f && (a.insertAfter ? a.insertAfter(f) : (e.unshift(f), s++));
    }
    d ? a.node = l : i && l.hasClass("newline") && (a.node = F(["leftmost"])), a.insertAfter = /* @__PURE__ */ ((y) => (x) => {
      e.splice(y + 1, 0, x), s++;
    })(s);
  }
  n && e.pop();
}, Xi = function(e) {
  return e instanceof Rt || e instanceof Yr || e instanceof It && e.hasClass("enclosing") ? e : null;
}, ya = function(e, t) {
  var a = Xi(e);
  if (a) {
    var n = a.children;
    if (n.length) {
      if (t === "right") return ya(n[n.length - 1], "right");
      if (t === "left") return ya(n[0], "left");
    }
  }
  return e;
}, xa = function(e, t) {
  if (!e) return null;
  t && (e = ya(e, t));
  var a = e.classes[0];
  return q5[a] || null;
}, ar = function(e, t) {
  var a = ["nulldelimiter"].concat(e.baseSizingClasses());
  return F(t.concat(a));
}, d0 = function(e, t, a) {
  if (!e) return F();
  if (Er[e.type]) {
    var n = Er[e.type](e, t);
    if (a && t.size !== a.size) {
      n = F(t.sizingClasses(a), [n], t);
      var i = t.sizeMultiplier / a.sizeMultiplier;
      n.height *= i, n.depth *= i;
    }
    return n;
  } else throw new $("Got group of unknown type: '" + e.type + "'");
};
function br(r, e) {
  var t = F(["base"], r, e), a = F(["strut"]);
  return a.style.height = U(t.height + t.depth), t.depth && (a.style.verticalAlign = U(-t.depth)), t.children.unshift(a), t;
}
function wa(r, e) {
  var t = null;
  r.length === 1 && r[0].type === "tag" && (t = r[0].tag, r = r[0].body);
  var a = H0(r, e, "root"), n;
  a.length === 2 && a[1].hasClass("tag") && (n = a.pop());
  for (var i = [], s = [], l = 0; l < a.length; l++) if (s.push(a[l]), a[l].hasClass("mbin") || a[l].hasClass("mrel") || a[l].hasClass("allowbreak")) {
    for (var h = false; l < a.length - 1 && a[l + 1].hasClass("mspace") && !a[l + 1].hasClass("newline"); ) l++, s.push(a[l]), a[l].hasClass("nobreak") && (h = true);
    h || (i.push(br(s, e)), s = []);
  } else a[l].hasClass("newline") && (s.pop(), s.length > 0 && (i.push(br(s, e)), s = []), i.push(a[l]));
  s.length > 0 && i.push(br(s, e));
  var d;
  t ? (d = br(H0(t, e, true), e), d.classes = ["tag"], i.push(d)) : n && i.push(n);
  var f = F(["katex-html"], i);
  if (f.setAttribute("aria-hidden", "true"), d) {
    var y = d.children[0];
    y.style.height = U(f.height + f.depth), f.depth && (y.style.verticalAlign = U(-f.depth));
  }
  return f;
}
function Yi(r) {
  return new Rt(r);
}
class L {
  constructor(e, t, a) {
    this.type = void 0, this.attributes = void 0, this.children = void 0, this.classes = void 0, this.type = e, this.attributes = {}, this.children = t || [], this.classes = a || [];
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  toNode() {
    var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
    for (var t in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, t) && e.setAttribute(t, this.attributes[t]);
    this.classes.length > 0 && (e.className = nt(this.classes));
    for (var a = 0; a < this.children.length; a++) if (this.children[a] instanceof N0 && this.children[a + 1] instanceof N0) {
      for (var n = this.children[a].toText() + this.children[++a].toText(); this.children[a + 1] instanceof N0; ) n += this.children[++a].toText();
      e.appendChild(new N0(n).toNode());
    } else e.appendChild(this.children[a].toNode());
    return e;
  }
  toMarkup() {
    var e = "<" + this.type;
    for (var t in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, t) && (e += " " + t + '="', e += V0(this.attributes[t]), e += '"');
    this.classes.length > 0 && (e += ' class ="' + V0(nt(this.classes)) + '"'), e += ">";
    for (var a = 0; a < this.children.length; a++) e += this.children[a].toMarkup();
    return e += "</" + this.type + ">", e;
  }
  toText() {
    return this.children.map((e) => e.toText()).join("");
  }
}
class N0 {
  constructor(e) {
    this.text = void 0, this.text = e;
  }
  toNode() {
    return document.createTextNode(this.text);
  }
  toMarkup() {
    return V0(this.toText());
  }
  toText() {
    return this.text;
  }
}
class Wi {
  constructor(e) {
    this.width = void 0, this.character = void 0, this.width = e, e >= 0.05555 && e <= 0.05556 ? this.character = "\u200A" : e >= 0.1666 && e <= 0.1667 ? this.character = "\u2009" : e >= 0.2222 && e <= 0.2223 ? this.character = "\u2005" : e >= 0.2777 && e <= 0.2778 ? this.character = "\u2005\u200A" : e >= -0.05556 && e <= -0.05555 ? this.character = "\u200A\u2063" : e >= -0.1667 && e <= -0.1666 ? this.character = "\u2009\u2063" : e >= -0.2223 && e <= -0.2222 ? this.character = "\u205F\u2063" : e >= -0.2778 && e <= -0.2777 ? this.character = "\u2005\u2063" : this.character = null;
  }
  toNode() {
    if (this.character) return document.createTextNode(this.character);
    var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
    return e.setAttribute("width", U(this.width)), e;
  }
  toMarkup() {
    return this.character ? "<mtext>" + this.character + "</mtext>" : '<mspace width="' + U(this.width) + '"/>';
  }
  toText() {
    return this.character ? this.character : " ";
  }
}
var E5 = /* @__PURE__ */ new Set(["\\imath", "\\jmath"]), N5 = /* @__PURE__ */ new Set(["mrow", "mtable"]), pe = function(e, t, a) {
  return b0[t][e] && b0[t][e].replace && e.charCodeAt(0) !== 55349 && !(Hi.hasOwnProperty(e) && a && (a.fontFamily && a.fontFamily.slice(4, 6) === "tt" || a.font && a.font.slice(4, 6) === "tt")) && (e = b0[t][e].replace), new N0(e);
}, Za = function(e) {
  return e.length === 1 ? e[0] : new L("mrow", e);
}, R5 = { mathit: "italic", boldsymbol: (r) => r.type === "textord" ? "bold" : "bold-italic", mathbf: "bold", mathbb: "double-struck", mathsfit: "sans-serif-italic", mathfrak: "fraktur", mathscr: "script", mathcal: "script", mathsf: "sans-serif", mathtt: "monospace" }, Ka = (r, e) => {
  if (r.mode === "text") {
    if (e.fontFamily === "texttt") return "monospace";
    if (e.fontFamily === "textsf") return e.fontShape === "textit" && e.fontWeight === "textbf" ? "sans-serif-bold-italic" : e.fontShape === "textit" ? "sans-serif-italic" : e.fontWeight === "textbf" ? "bold-sans-serif" : "sans-serif";
    if (e.fontShape === "textit" && e.fontWeight === "textbf") return "bold-italic";
    if (e.fontShape === "textit") return "italic";
    if (e.fontWeight === "textbf") return "bold";
  }
  var t = e.font;
  if (!t || t === "mathnormal") return null;
  var a = r.mode, n = R5[t];
  if (n) return typeof n == "function" ? n(r) : n;
  var i = r.text;
  if (E5.has(i)) return null;
  if (b0[a][i]) {
    var s = b0[a][i].replace;
    s && (i = s);
  }
  var l = ga[t].fontName;
  return Ya(i, l, a) ? ga[t].variant : null;
};
function R1(r) {
  if (!r) return false;
  if (r.type === "mi" && r.children.length === 1) {
    var e = r.children[0];
    return e instanceof N0 && e.text === ".";
  } else if (r.type === "mo" && r.children.length === 1 && r.getAttribute("separator") === "true" && r.getAttribute("lspace") === "0em" && r.getAttribute("rspace") === "0em") {
    var t = r.children[0];
    return t instanceof N0 && t.text === ",";
  } else return false;
}
var me = function(e, t, a) {
  if (e.length === 1) {
    var n = p0(e[0], t);
    return a && n instanceof L && n.type === "mo" && (n.setAttribute("lspace", "0em"), n.setAttribute("rspace", "0em")), [n];
  }
  for (var i = [], s, l = 0; l < e.length; l++) {
    var h = p0(e[l], t);
    if (h instanceof L && s instanceof L) {
      if (h.type === "mtext" && s.type === "mtext" && h.getAttribute("mathvariant") === s.getAttribute("mathvariant")) {
        s.children.push(...h.children);
        continue;
      } else if (h.type === "mn" && s.type === "mn") {
        s.children.push(...h.children);
        continue;
      } else if (R1(h) && s.type === "mn") {
        s.children.push(...h.children);
        continue;
      } else if (h.type === "mn" && R1(s)) h.children = [...s.children, ...h.children], i.pop();
      else if ((h.type === "msup" || h.type === "msub") && h.children.length >= 1 && (s.type === "mn" || R1(s))) {
        var d = h.children[0];
        d instanceof L && d.type === "mn" && (d.children = [...s.children, ...d.children], i.pop());
      } else if (s.type === "mi" && s.children.length === 1) {
        var f = s.children[0];
        if (f instanceof N0 && f.text === "\u0338" && (h.type === "mo" || h.type === "mi" || h.type === "mn")) {
          var y = h.children[0];
          y instanceof N0 && y.text.length > 0 && (y.text = y.text.slice(0, 1) + "\u0338" + y.text.slice(1), i.pop());
        }
      }
    }
    i.push(h), s = h;
  }
  return i;
}, lt = function(e, t, a) {
  return Za(me(e, t, a));
}, p0 = function(e, t) {
  if (!e) return new L("mrow");
  if (Nr[e.type]) return Nr[e.type](e, t);
  throw new $("Got group of unknown type: '" + e.type + "'");
};
function nn(r, e, t, a, n) {
  var i = me(r, t), s;
  i.length === 1 && i[0] instanceof L && N5.has(i[0].type) ? s = i[0] : s = new L("mrow", i);
  var l = new L("annotation", [new N0(e)]);
  l.setAttribute("encoding", "application/x-tex");
  var h = new L("semantics", [s, l]), d = new L("math", [h]);
  d.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"), a && d.setAttribute("display", "block");
  var f = n ? "katex" : "katex-mathml";
  return F([f], [d]);
}
var I5 = [[1, 1, 1], [2, 1, 1], [3, 1, 1], [4, 2, 1], [5, 2, 1], [6, 3, 1], [7, 4, 2], [8, 6, 3], [9, 7, 6], [10, 8, 7], [11, 10, 9]], sn = [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.2, 1.44, 1.728, 2.074, 2.488], ln = function(e, t) {
  return t.size < 2 ? e : I5[e - 1][t.size - 1];
};
class Oe {
  constructor(e) {
    this.style = void 0, this.color = void 0, this.size = void 0, this.textSize = void 0, this.phantom = void 0, this.font = void 0, this.fontFamily = void 0, this.fontWeight = void 0, this.fontShape = void 0, this.sizeMultiplier = void 0, this.maxSize = void 0, this.minRuleThickness = void 0, this._fontMetrics = void 0, this.style = e.style, this.color = e.color, this.size = e.size || Oe.BASESIZE, this.textSize = e.textSize || this.size, this.phantom = !!e.phantom, this.font = e.font || "", this.fontFamily = e.fontFamily || "", this.fontWeight = e.fontWeight || "", this.fontShape = e.fontShape || "", this.sizeMultiplier = sn[this.size - 1], this.maxSize = e.maxSize, this.minRuleThickness = e.minRuleThickness, this._fontMetrics = void 0;
  }
  extend(e) {
    var t = { style: this.style, size: this.size, textSize: this.textSize, color: this.color, phantom: this.phantom, font: this.font, fontFamily: this.fontFamily, fontWeight: this.fontWeight, fontShape: this.fontShape, maxSize: this.maxSize, minRuleThickness: this.minRuleThickness };
    return Object.assign(t, e), new Oe(t);
  }
  havingStyle(e) {
    return this.style === e ? this : this.extend({ style: e, size: ln(this.textSize, e) });
  }
  havingCrampedStyle() {
    return this.havingStyle(this.style.cramp());
  }
  havingSize(e) {
    return this.size === e && this.textSize === e ? this : this.extend({ style: this.style.text(), size: e, textSize: e, sizeMultiplier: sn[e - 1] });
  }
  havingBaseStyle(e) {
    e = e || this.style.text();
    var t = ln(Oe.BASESIZE, e);
    return this.size === t && this.textSize === Oe.BASESIZE && this.style === e ? this : this.extend({ style: e, size: t });
  }
  havingBaseSizing() {
    var e;
    switch (this.style.id) {
      case 4:
      case 5:
        e = 3;
        break;
      case 6:
      case 7:
        e = 1;
        break;
      default:
        e = 6;
    }
    return this.extend({ style: this.style.text(), size: e });
  }
  withColor(e) {
    return this.extend({ color: e });
  }
  withPhantom() {
    return this.extend({ phantom: true });
  }
  withFont(e) {
    return this.extend({ font: e });
  }
  withTextFontFamily(e) {
    return this.extend({ fontFamily: e, font: "" });
  }
  withTextFontWeight(e) {
    return this.extend({ fontWeight: e, font: "" });
  }
  withTextFontShape(e) {
    return this.extend({ fontShape: e, font: "" });
  }
  sizingClasses(e) {
    return e.size !== this.size ? ["sizing", "reset-size" + e.size, "size" + this.size] : [];
  }
  baseSizingClasses() {
    return this.size !== Oe.BASESIZE ? ["sizing", "reset-size" + this.size, "size" + Oe.BASESIZE] : [];
  }
  fontMetrics() {
    return this._fontMetrics || (this._fontMetrics = b5(this.size)), this._fontMetrics;
  }
  getColor() {
    return this.phantom ? "transparent" : this.color;
  }
}
Oe.BASESIZE = 6;
var ji = function(e) {
  return new Oe({ style: e.displayMode ? i0.DISPLAY : i0.TEXT, maxSize: e.maxSize, minRuleThickness: e.minRuleThickness });
}, Zi = function(e, t) {
  if (t.displayMode) {
    var a = ["katex-display"];
    t.leqno && a.push("leqno"), t.fleqn && a.push("fleqn"), e = F(a, [e]);
  }
  return e;
}, F5 = function(e, t, a) {
  var n = ji(a), i;
  if (a.output === "mathml") return nn(e, t, n, a.displayMode, true);
  if (a.output === "html") {
    var s = wa(e, n);
    i = F(["katex"], [s]);
  } else {
    var l = nn(e, t, n, a.displayMode, false), h = wa(e, n);
    i = F(["katex"], [l, h]);
  }
  return Zi(i, a);
}, O5 = function(e, t, a) {
  var n = ji(a), i = wa(e, n), s = F(["katex"], [i]);
  return Zi(s, a);
}, $5 = { widehat: "^", widecheck: "\u02C7", widetilde: "~", utilde: "~", overleftarrow: "\u2190", underleftarrow: "\u2190", xleftarrow: "\u2190", overrightarrow: "\u2192", underrightarrow: "\u2192", xrightarrow: "\u2192", underbrace: "\u23DF", overbrace: "\u23DE", underbracket: "\u23B5", overbracket: "\u23B4", overgroup: "\u23E0", undergroup: "\u23E1", overleftrightarrow: "\u2194", underleftrightarrow: "\u2194", xleftrightarrow: "\u2194", Overrightarrow: "\u21D2", xRightarrow: "\u21D2", overleftharpoon: "\u21BC", xleftharpoonup: "\u21BC", overrightharpoon: "\u21C0", xrightharpoonup: "\u21C0", xLeftarrow: "\u21D0", xLeftrightarrow: "\u21D4", xhookleftarrow: "\u21A9", xhookrightarrow: "\u21AA", xmapsto: "\u21A6", xrightharpoondown: "\u21C1", xleftharpoondown: "\u21BD", xrightleftharpoons: "\u21CC", xleftrightharpoons: "\u21CB", xtwoheadleftarrow: "\u219E", xtwoheadrightarrow: "\u21A0", xlongequal: "=", xtofrom: "\u21C4", xrightleftarrows: "\u21C4", xrightequilibrium: "\u21CC", xleftequilibrium: "\u21CB", "\\cdrightarrow": "\u2192", "\\cdleftarrow": "\u2190", "\\cdlongequal": "=" }, Zr = function(e) {
  var t = new L("mo", [new N0($5[e.replace(/^\\/, "")])]);
  return t.setAttribute("stretchy", "true"), t;
}, H5 = { overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"], overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"], underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"], underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"], xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"], "\\cdrightarrow": [["rightarrow"], 3, 522, "xMaxYMin"], xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"], "\\cdleftarrow": [["leftarrow"], 3, 522, "xMinYMin"], Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"], xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"], xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"], overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"], xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"], xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"], overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"], xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"], xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"], xlongequal: [["longequal"], 0.888, 334, "xMinYMin"], "\\cdlongequal": [["longequal"], 3, 334, "xMinYMin"], xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"], xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"], overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522], overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548], underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548], underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522], xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522], xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560], xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716], xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716], xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522], xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522], overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522], underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522], overbracket: [["leftbracketover", "rightbracketover"], 1.6, 440], underbracket: [["leftbracketunder", "rightbracketunder"], 1.6, 410], overgroup: [["leftgroup", "rightgroup"], 0.888, 342], undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342], xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522], xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528], xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901], xrightequilibrium: [["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716], xleftequilibrium: [["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716] }, L5 = /* @__PURE__ */ new Set(["widehat", "widecheck", "widetilde", "utilde"]), Kr = function(e, t) {
  function a() {
    var l = 4e5, h = e.label.slice(1);
    if (L5.has(h) && "base" in e) {
      var d = e.base.type === "ordgroup" ? e.base.body.length : 1, f, y, x;
      if (d > 5) h === "widehat" || h === "widecheck" ? (f = 420, l = 2364, x = 0.42, y = h + "4") : (f = 312, l = 2340, x = 0.34, y = "tilde4");
      else {
        var w = [1, 1, 2, 2, 3, 3][d];
        h === "widehat" || h === "widecheck" ? (l = [0, 1062, 2364, 2364, 2364][w], f = [0, 239, 300, 360, 420][w], x = [0, 0.24, 0.3, 0.3, 0.36, 0.42][w], y = h + w) : (l = [0, 600, 1033, 2339, 2340][w], f = [0, 260, 286, 306, 312][w], x = [0, 0.26, 0.286, 0.3, 0.306, 0.34][w], y = "tilde" + w);
      }
      var B = new it(y), C = new Pe([B], { width: "100%", height: U(x), viewBox: "0 0 " + l + " " + f, preserveAspectRatio: "none" });
      return { span: st([], [C], t), minWidth: 0, height: x };
    } else {
      var D = [], q = H5[h];
      if (!q) throw new Error('No SVG data for "' + h + '".');
      var [E, P, V] = q, X = V / 1e3, Y = E.length, J, Q;
      if (Y === 1) {
        if (q.length !== 4) throw new Error('Expected 4-tuple for single-path SVG data "' + h + '".');
        J = ["hide-tail"], Q = [q[3]];
      } else if (Y === 2) J = ["halfarrow-left", "halfarrow-right"], Q = ["xMinYMin", "xMaxYMin"];
      else if (Y === 3) J = ["brace-left", "brace-center", "brace-right"], Q = ["xMinYMin", "xMidYMin", "xMaxYMin"];
      else throw new Error(`Correct katexImagesData or update code here to support
                    ` + Y + " children.");
      for (var _ = 0; _ < Y; _++) {
        var u0 = new it(E[_]), v0 = new Pe([u0], { width: "400em", height: U(X), viewBox: "0 0 " + l + " " + V, preserveAspectRatio: Q[_] + " slice" }), s0 = st([J[_]], [v0], t);
        if (Y === 1) return { span: s0, minWidth: P, height: X };
        s0.style.height = U(X), D.push(s0);
      }
      return { span: F(["stretchy"], D, t), minWidth: P, height: X };
    }
  }
  var { span: n, minWidth: i, height: s } = a();
  return n.height = s, n.style.height = U(s), i > 0 && (n.style.minWidth = U(i)), n;
}, P5 = function(e, t, a, n, i) {
  var s, l = e.height + e.depth + a + n;
  if (/fbox|color|angl/.test(t)) {
    if (s = F(["stretchy", t], [], i), t === "fbox") {
      var h = i.color && i.getColor();
      h && (s.style.borderColor = h);
    }
  } else {
    var d = [];
    /^[bx]cancel$/.test(t) && d.push(new ma({ x1: "0", y1: "0", x2: "100%", y2: "100%", "stroke-width": "0.046em" })), /^x?cancel$/.test(t) && d.push(new ma({ x1: "0", y1: "100%", x2: "100%", y2: "0", "stroke-width": "0.046em" }));
    var f = new Pe(d, { width: "100%", height: U(l) });
    s = st([], [f], i);
  }
  return s.height = l, s.style.height = U(l), s;
}, G5 = { bin: 1, close: 1, inner: 1, open: 1, punct: 1, rel: 1 }, U5 = { "accent-token": 1, mathord: 1, "op-token": 1, spacing: 1, textord: 1 };
function V5(r) {
  return r in G5;
}
function l0(r, e) {
  if (!r || r.type !== e) throw new Error("Expected node of type " + e + ", but got " + (r ? "node of type " + r.type : String(r)));
  return r;
}
function Jr(r) {
  var e = Qr(r);
  if (!e) throw new Error("Expected node of symbol group type, but got " + (r ? "node of type " + r.type : String(r)));
  return e;
}
function Qr(r) {
  return r && (r.type === "atom" || U5.hasOwnProperty(r.type)) ? r : null;
}
var Ki = (r) => {
  if (r instanceof le) return r;
  if (g5(r) && r.children.length === 1) return Ki(r.children[0]);
}, Ja = (r, e) => {
  var t, a, n;
  r && r.type === "supsub" ? (a = l0(r.base, "accent"), t = a.base, r.base = t, n = p5(d0(r, e)), r.base = a) : (a = l0(r, "accent"), t = a.base);
  var i = d0(t, e.havingCrampedStyle()), s = a.isShifty && Xe(t), l = 0;
  if (s) {
    var h, d;
    l = (h = (d = Ki(i)) == null ? void 0 : d.skew) != null ? h : 0;
  }
  var f = a.label === "\\c", y = f ? i.height + i.depth : Math.min(i.height, e.fontMetrics().xHeight), x;
  if (a.isStretchy) x = Kr(a, e), x = c0({ positionType: "firstBaseline", children: [{ type: "elem", elem: i }, { type: "elem", elem: x, wrapperClasses: ["svg-align"], wrapperStyle: l > 0 ? { width: "calc(100% - " + U(2 * l) + ")", marginLeft: U(2 * l) } : void 0 }] });
  else {
    var w, B;
    a.label === "\\vec" ? (w = Ui("vec", e), B = Gi.vec[1]) : (w = jr({ mode: a.mode, text: a.label }, e, "textord"), w = v5(w), w.italic = 0, B = w.width, f && (y += w.depth)), x = F(["accent-body"], [w]);
    var C = a.label === "\\textcircled";
    C && (x.classes.push("accent-full"), y = i.height);
    var D = l;
    C || (D -= B / 2), x.style.left = U(D), a.label === "\\textcircled" && (x.style.top = ".2em"), x = c0({ positionType: "firstBaseline", children: [{ type: "elem", elem: i }, { type: "kern", size: -y }, { type: "elem", elem: x }] });
  }
  var q = F(["mord", "accent"], [x], e);
  return n ? (n.children[0] = q, n.height = Math.max(q.height, n.height), n.classes[0] = "mord", n) : q;
}, Ji = (r, e) => {
  var t = r.isStretchy ? Zr(r.label) : new L("mo", [pe(r.label, r.mode)]), a = new L("mover", [p0(r.base, e), t]);
  return a.setAttribute("accent", "true"), a;
}, X5 = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map((r) => "\\" + r).join("|"));
j({ type: "accent", names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"], props: { numArgs: 1 }, handler: (r, e) => {
  var t = Rr(e[0]), a = !X5.test(r.funcName), n = !a || r.funcName === "\\widehat" || r.funcName === "\\widetilde" || r.funcName === "\\widecheck";
  return { type: "accent", mode: r.parser.mode, label: r.funcName, isStretchy: a, isShifty: n, base: t };
}, htmlBuilder: Ja, mathmlBuilder: Ji });
j({ type: "accent", names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\c", "\\r", "\\H", "\\v", "\\textcircled"], props: { numArgs: 1, allowedInText: true, allowedInMath: true, argTypes: ["primitive"] }, handler: (r, e) => {
  var t = e[0], a = r.parser.mode;
  return a === "math" && (r.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + r.funcName + " works only in text mode"), a = "text"), { type: "accent", mode: a, label: r.funcName, isStretchy: false, isShifty: true, base: t };
}, htmlBuilder: Ja, mathmlBuilder: Ji });
j({ type: "accentUnder", names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"], props: { numArgs: 1 }, handler: (r, e) => {
  var { parser: t, funcName: a } = r, n = e[0];
  return { type: "accentUnder", mode: t.mode, label: a, base: n };
}, htmlBuilder: (r, e) => {
  var t = d0(r.base, e), a = Kr(r, e), n = r.label === "\\utilde" ? 0.12 : 0, i = c0({ positionType: "top", positionData: t.height, children: [{ type: "elem", elem: a, wrapperClasses: ["svg-align"] }, { type: "kern", size: n }, { type: "elem", elem: t }] });
  return F(["mord", "accentunder"], [i], e);
}, mathmlBuilder: (r, e) => {
  var t = Zr(r.label), a = new L("munder", [p0(r.base, e), t]);
  return a.setAttribute("accentunder", "true"), a;
} });
var yr = (r) => {
  var e = new L("mpadded", r ? [r] : []);
  return e.setAttribute("width", "+0.6em"), e.setAttribute("lspace", "0.3em"), e;
};
j({ type: "xArrow", names: ["\\xleftarrow", "\\xrightarrow", "\\xLeftarrow", "\\xRightarrow", "\\xleftrightarrow", "\\xLeftrightarrow", "\\xhookleftarrow", "\\xhookrightarrow", "\\xmapsto", "\\xrightharpoondown", "\\xrightharpoonup", "\\xleftharpoondown", "\\xleftharpoonup", "\\xrightleftharpoons", "\\xleftrightharpoons", "\\xlongequal", "\\xtwoheadrightarrow", "\\xtwoheadleftarrow", "\\xtofrom", "\\xrightleftarrows", "\\xrightequilibrium", "\\xleftequilibrium", "\\\\cdrightarrow", "\\\\cdleftarrow", "\\\\cdlongequal"], props: { numArgs: 1, numOptionalArgs: 1 }, handler(r, e, t) {
  var { parser: a, funcName: n } = r;
  return { type: "xArrow", mode: a.mode, label: n, body: e[0], below: t[0] };
}, htmlBuilder(r, e) {
  var t = e.style, a = e.havingStyle(t.sup()), n = Dt(d0(r.body, a, e), e), i = r.label.slice(0, 2) === "\\x" ? "x" : "cd";
  n.classes.push(i + "-arrow-pad");
  var s;
  r.below && (a = e.havingStyle(t.sub()), s = Dt(d0(r.below, a, e), e), s.classes.push(i + "-arrow-pad"));
  var l = Kr(r, e), h = -e.fontMetrics().axisHeight + 0.5 * l.height, d = -e.fontMetrics().axisHeight - 0.5 * l.height - 0.111;
  (n.depth > 0.25 || r.label === "\\xleftequilibrium") && (d -= n.depth);
  var f;
  if (s) {
    var y = -e.fontMetrics().axisHeight + s.height + 0.5 * l.height + 0.111;
    f = c0({ positionType: "individualShift", children: [{ type: "elem", elem: n, shift: d }, { type: "elem", elem: l, shift: h, wrapperClasses: ["svg-align"] }, { type: "elem", elem: s, shift: y }] });
  } else f = c0({ positionType: "individualShift", children: [{ type: "elem", elem: n, shift: d }, { type: "elem", elem: l, shift: h, wrapperClasses: ["svg-align"] }] });
  return F(["mrel", "x-arrow"], [f], e);
}, mathmlBuilder(r, e) {
  var t = Zr(r.label);
  t.setAttribute("minsize", r.label.charAt(0) === "x" ? "1.75em" : "3.0em");
  var a;
  if (r.body) {
    var n = yr(p0(r.body, e));
    if (r.below) {
      var i = yr(p0(r.below, e));
      a = new L("munderover", [t, i, n]);
    } else a = new L("mover", [t, n]);
  } else if (r.below) {
    var s = yr(p0(r.below, e));
    a = new L("munder", [t, s]);
  } else a = yr(), a = new L("mover", [t, a]);
  return a;
} });
function Qi(r, e) {
  var t = H0(r.body, e, true);
  return F([r.mclass], t, e);
}
function _i(r, e) {
  var t, a = me(r.body, e);
  return r.mclass === "minner" ? t = new L("mpadded", a) : r.mclass === "mord" ? r.isCharacterBox ? (t = a[0], t.type = "mi") : t = new L("mi", a) : (r.isCharacterBox ? (t = a[0], t.type = "mo") : t = new L("mo", a), r.mclass === "mbin" ? (t.attributes.lspace = "0.22em", t.attributes.rspace = "0.22em") : r.mclass === "mpunct" ? (t.attributes.lspace = "0em", t.attributes.rspace = "0.17em") : r.mclass === "mopen" || r.mclass === "mclose" ? (t.attributes.lspace = "0em", t.attributes.rspace = "0em") : r.mclass === "minner" && (t.attributes.lspace = "0.0556em", t.attributes.width = "+0.1111em")), t;
}
j({ type: "mclass", names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"], props: { numArgs: 1, primitive: true }, handler(r, e) {
  var { parser: t, funcName: a } = r, n = e[0];
  return { type: "mclass", mode: t.mode, mclass: "m" + a.slice(5), body: E0(n), isCharacterBox: Xe(n) };
}, htmlBuilder: Qi, mathmlBuilder: _i });
var _r = (r) => {
  var e = r.type === "ordgroup" && r.body.length ? r.body[0] : r;
  return e.type === "atom" && (e.family === "bin" || e.family === "rel") ? "m" + e.family : "mord";
};
j({ type: "mclass", names: ["\\@binrel"], props: { numArgs: 2 }, handler(r, e) {
  var { parser: t } = r;
  return { type: "mclass", mode: t.mode, mclass: _r(e[0]), body: E0(e[1]), isCharacterBox: Xe(e[1]) };
} });
j({ type: "mclass", names: ["\\stackrel", "\\overset", "\\underset"], props: { numArgs: 2 }, handler(r, e) {
  var { parser: t, funcName: a } = r, n = e[1], i = e[0], s;
  a !== "\\stackrel" ? s = _r(n) : s = "mrel";
  var l = { type: "op", mode: n.mode, limits: true, alwaysHandleSupSub: true, parentIsSupSub: false, symbol: false, suppressBaseShift: a !== "\\stackrel", body: E0(n) }, h = { type: "supsub", mode: i.mode, base: l, sup: a === "\\underset" ? null : i, sub: a === "\\underset" ? i : null };
  return { type: "mclass", mode: t.mode, mclass: s, body: [h], isCharacterBox: Xe(h) };
}, htmlBuilder: Qi, mathmlBuilder: _i });
j({ type: "pmb", names: ["\\pmb"], props: { numArgs: 1, allowedInText: true }, handler(r, e) {
  var { parser: t } = r;
  return { type: "pmb", mode: t.mode, mclass: _r(e[0]), body: E0(e[0]) };
}, htmlBuilder(r, e) {
  var t = H0(r.body, e, true), a = F([r.mclass], t, e);
  return a.style.textShadow = "0.02em 0.01em 0.04px", a;
}, mathmlBuilder(r, e) {
  var t = me(r.body, e), a = new L("mstyle", t);
  return a.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px"), a;
} });
var Y5 = { ">": "\\\\cdrightarrow", "<": "\\\\cdleftarrow", "=": "\\\\cdlongequal", A: "\\uparrow", V: "\\downarrow", "|": "\\Vert", ".": "no arrow" }, un = () => ({ type: "styling", body: [], mode: "math", style: "display", resetFont: true }), on = (r) => r.type === "textord" && r.text === "@", W5 = (r, e) => (r.type === "mathord" || r.type === "atom") && r.text === e;
function j5(r, e, t) {
  var a = Y5[r];
  switch (a) {
    case "\\\\cdrightarrow":
    case "\\\\cdleftarrow":
      return t.callFunction(a, [e[0]], [e[1]]);
    case "\\uparrow":
    case "\\downarrow": {
      var n = t.callFunction("\\\\cdleft", [e[0]], []), i = { type: "atom", text: a, mode: "math", family: "rel" }, s = t.callFunction("\\Big", [i], []), l = t.callFunction("\\\\cdright", [e[1]], []), h = { type: "ordgroup", mode: "math", body: [n, s, l] };
      return t.callFunction("\\\\cdparent", [h], []);
    }
    case "\\\\cdlongequal":
      return t.callFunction("\\\\cdlongequal", [], []);
    case "\\Vert": {
      var d = { type: "textord", text: "\\Vert", mode: "math" };
      return t.callFunction("\\Big", [d], []);
    }
    default:
      return { type: "textord", text: " ", mode: "math" };
  }
}
function Z5(r) {
  var e = [];
  for (r.gullet.beginGroup(), r.gullet.macros.set("\\cr", "\\\\\\relax"), r.gullet.beginGroup(); ; ) {
    e.push(r.parseExpression(false, "\\\\")), r.gullet.endGroup(), r.gullet.beginGroup();
    var t = r.fetch().text;
    if (t === "&" || t === "\\\\") r.consume();
    else if (t === "\\end") {
      e[e.length - 1].length === 0 && e.pop();
      break;
    } else throw new $("Expected \\\\ or \\cr or \\end", r.nextToken);
  }
  for (var a = [], n = [a], i = 0; i < e.length; i++) {
    for (var s = e[i], l = un(), h = 0; h < s.length; h++) if (!on(s[h])) l.body.push(s[h]);
    else {
      a.push(l), h += 1;
      var d = Jr(s[h]).text, f = new Array(2);
      if (f[0] = { type: "ordgroup", mode: "math", body: [] }, f[1] = { type: "ordgroup", mode: "math", body: [] }, !"=|.".includes(d)) if ("<>AV".includes(d)) for (var y = 0; y < 2; y++) {
        for (var x = true, w = h + 1; w < s.length; w++) {
          if (W5(s[w], d)) {
            x = false, h = w;
            break;
          }
          if (on(s[w])) throw new $("Missing a " + d + " character to complete a CD arrow.", s[w]);
          f[y].body.push(s[w]);
        }
        if (x) throw new $("Missing a " + d + " character to complete a CD arrow.", s[h]);
      }
      else throw new $('Expected one of "<>AV=|." after @', s[h]);
      var B = j5(d, f, r), C = { type: "styling", body: [B], mode: "math", style: "display", resetFont: true };
      a.push(C), l = un();
    }
    i % 2 === 0 ? a.push(l) : a.shift(), a = [], n.push(a);
  }
  r.gullet.endGroup(), r.gullet.endGroup();
  var D = new Array(n[0].length).fill({ type: "align", align: "c", pregap: 0.25, postgap: 0.25 });
  return { type: "array", mode: "math", body: n, arraystretch: 1, addJot: true, rowGaps: [null], cols: D, colSeparationType: "CD", hLinesBeforeRow: new Array(n.length + 1).fill([]) };
}
j({ type: "cdlabel", names: ["\\\\cdleft", "\\\\cdright"], props: { numArgs: 1 }, handler(r, e) {
  var { parser: t, funcName: a } = r;
  return { type: "cdlabel", mode: t.mode, side: a.slice(4), label: e[0] };
}, htmlBuilder(r, e) {
  var t = e.havingStyle(e.style.sup()), a = Dt(d0(r.label, t, e), e);
  return a.classes.push("cd-label-" + r.side), a.style.bottom = U(0.8 - a.depth), a.height = 0, a.depth = 0, a;
}, mathmlBuilder(r, e) {
  var t = new L("mrow", [p0(r.label, e)]);
  return t = new L("mpadded", [t]), t.setAttribute("width", "0"), r.side === "left" && t.setAttribute("lspace", "-1width"), t.setAttribute("voffset", "0.7em"), t = new L("mstyle", [t]), t.setAttribute("displaystyle", "false"), t.setAttribute("scriptlevel", "1"), t;
} });
j({ type: "cdlabelparent", names: ["\\\\cdparent"], props: { numArgs: 1 }, handler(r, e) {
  var { parser: t } = r;
  return { type: "cdlabelparent", mode: t.mode, fragment: e[0] };
}, htmlBuilder(r, e) {
  var t = Dt(d0(r.fragment, e), e);
  return t.classes.push("cd-vert-arrow"), t;
}, mathmlBuilder(r, e) {
  return new L("mrow", [p0(r.fragment, e)]);
} });
j({ type: "textord", names: ["\\@char"], props: { numArgs: 1, allowedInText: true }, handler(r, e) {
  for (var { parser: t } = r, a = l0(e[0], "ordgroup"), n = a.body, i = "", s = 0; s < n.length; s++) {
    var l = l0(n[s], "textord");
    i += l.text;
  }
  var h = parseInt(i), d;
  if (isNaN(h)) throw new $("\\@char has non-numeric argument " + i);
  if (h < 0 || h >= 1114111) throw new $("\\@char with invalid code point " + i);
  return h <= 65535 ? d = String.fromCharCode(h) : (h -= 65536, d = String.fromCharCode((h >> 10) + 55296, (h & 1023) + 56320)), { type: "textord", mode: t.mode, text: d };
} });
var es = (r, e) => {
  var t = H0(r.body, e.withColor(r.color), false);
  return We(t);
}, ts = (r, e) => {
  var t = me(r.body, e.withColor(r.color)), a = new L("mstyle", t);
  return a.setAttribute("mathcolor", r.color), a;
};
j({ type: "color", names: ["\\textcolor"], props: { numArgs: 2, allowedInText: true, argTypes: ["color", "original"] }, handler(r, e) {
  var { parser: t } = r, a = l0(e[0], "color-token").color, n = e[1];
  return { type: "color", mode: t.mode, color: a, body: E0(n) };
}, htmlBuilder: es, mathmlBuilder: ts });
j({ type: "color", names: ["\\color"], props: { numArgs: 1, allowedInText: true, argTypes: ["color"] }, handler(r, e) {
  var { parser: t, breakOnTokenText: a } = r, n = l0(e[0], "color-token").color;
  t.gullet.macros.set("\\current@color", n);
  var i = t.parseExpression(true, a);
  return { type: "color", mode: t.mode, color: n, body: i };
}, htmlBuilder: es, mathmlBuilder: ts });
j({ type: "cr", names: ["\\\\"], props: { numArgs: 0, numOptionalArgs: 0, allowedInText: true }, handler(r, e, t) {
  var { parser: a } = r, n = a.gullet.future().text === "[" ? a.parseSizeGroup(true) : null, i = !a.settings.displayMode || !a.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
  return { type: "cr", mode: a.mode, newLine: i, size: n && l0(n, "size").value };
}, htmlBuilder(r, e) {
  var t = F(["mspace"], [], e);
  return r.newLine && (t.classes.push("newline"), r.size && (t.style.marginTop = U(M0(r.size, e)))), t;
}, mathmlBuilder(r, e) {
  var t = new L("mspace");
  return r.newLine && (t.setAttribute("linebreak", "newline"), r.size && t.setAttribute("height", U(M0(r.size, e)))), t;
} });
var ka = { "\\global": "\\global", "\\long": "\\\\globallong", "\\\\globallong": "\\\\globallong", "\\def": "\\gdef", "\\gdef": "\\gdef", "\\edef": "\\xdef", "\\xdef": "\\xdef", "\\let": "\\\\globallet", "\\futurelet": "\\\\globalfuture" }, rs = (r) => {
  var e = r.text;
  if (/^(?:[\\{}$&#^_]|EOF)$/.test(e)) throw new $("Expected a control sequence", r);
  return e;
}, K5 = (r) => {
  var e = r.gullet.popToken();
  return e.text === "=" && (e = r.gullet.popToken(), e.text === " " && (e = r.gullet.popToken())), e;
}, as = (r, e, t, a) => {
  var n = r.gullet.macros.get(t.text);
  n == null && (t.noexpand = true, n = { tokens: [t], numArgs: 0, unexpandable: !r.gullet.isExpandable(t.text) }), r.gullet.macros.set(e, n, a);
};
j({ type: "internal", names: ["\\global", "\\long", "\\\\globallong"], props: { numArgs: 0, allowedInText: true }, handler(r) {
  var { parser: e, funcName: t } = r;
  e.consumeSpaces();
  var a = e.fetch();
  if (ka[a.text]) return (t === "\\global" || t === "\\\\globallong") && (a.text = ka[a.text]), l0(e.parseFunction(), "internal");
  throw new $("Invalid token after macro prefix", a);
} });
j({ type: "internal", names: ["\\def", "\\gdef", "\\edef", "\\xdef"], props: { numArgs: 0, allowedInText: true, primitive: true }, handler(r) {
  var { parser: e, funcName: t } = r, a = e.gullet.popToken(), n = a.text;
  if (/^(?:[\\{}$&#^_]|EOF)$/.test(n)) throw new $("Expected a control sequence", a);
  for (var i = 0, s, l = [[]]; e.gullet.future().text !== "{"; ) if (a = e.gullet.popToken(), a.text === "#") {
    if (e.gullet.future().text === "{") {
      s = e.gullet.future(), l[i].push("{");
      break;
    }
    if (a = e.gullet.popToken(), !/^[1-9]$/.test(a.text)) throw new $('Invalid argument number "' + a.text + '"');
    if (parseInt(a.text) !== i + 1) throw new $('Argument number "' + a.text + '" out of order');
    i++, l.push([]);
  } else {
    if (a.text === "EOF") throw new $("Expected a macro definition");
    l[i].push(a.text);
  }
  var { tokens: h } = e.gullet.consumeArg();
  return s && h.unshift(s), (t === "\\edef" || t === "\\xdef") && (h = e.gullet.expandTokens(h), h.reverse()), e.gullet.macros.set(n, { tokens: h, numArgs: i, delimiters: l }, t === ka[t]), { type: "internal", mode: e.mode };
} });
j({ type: "internal", names: ["\\let", "\\\\globallet"], props: { numArgs: 0, allowedInText: true, primitive: true }, handler(r) {
  var { parser: e, funcName: t } = r, a = rs(e.gullet.popToken());
  e.gullet.consumeSpaces();
  var n = K5(e);
  return as(e, a, n, t === "\\\\globallet"), { type: "internal", mode: e.mode };
} });
j({ type: "internal", names: ["\\futurelet", "\\\\globalfuture"], props: { numArgs: 0, allowedInText: true, primitive: true }, handler(r) {
  var { parser: e, funcName: t } = r, a = rs(e.gullet.popToken()), n = e.gullet.popToken(), i = e.gullet.popToken();
  return as(e, a, i, t === "\\\\globalfuture"), e.gullet.pushToken(i), e.gullet.pushToken(n), { type: "internal", mode: e.mode };
} });
var jt = function(e, t, a) {
  var n = b0.math[e] && b0.math[e].replace, i = Ya(n || e, t, a);
  if (!i) throw new Error("Unsupported symbol " + e + " and font size " + t + ".");
  return i;
}, Qa = function(e, t, a, n) {
  var i = a.havingBaseStyle(t), s = F(n.concat(i.sizingClasses(a)), [e], a), l = i.sizeMultiplier / a.sizeMultiplier;
  return s.height *= l, s.depth *= l, s.maxFontSize = i.sizeMultiplier, s;
}, ns = function(e, t, a) {
  var n = t.havingBaseStyle(a), i = (1 - t.sizeMultiplier / n.sizeMultiplier) * t.fontMetrics().axisHeight;
  e.classes.push("delimcenter"), e.style.top = U(i), e.height -= i, e.depth += i;
}, J5 = function(e, t, a, n, i, s) {
  var l = Z0(e, "Main-Regular", i, n), h = Qa(l, t, n, s);
  return ns(h, n, t), h;
}, Q5 = function(e, t, a, n) {
  return Z0(e, "Size" + t + "-Regular", a, n);
}, is = function(e, t, a, n, i, s) {
  var l = Q5(e, t, i, n), h = Qa(F(["delimsizing", "size" + t], [l], n), i0.TEXT, n, s);
  return a && ns(h, n, i0.TEXT), h;
}, I1 = function(e, t, a) {
  var n;
  t === "Size1-Regular" ? n = "delim-size1" : n = "delim-size4";
  var i = F(["delimsizinginner", n], [F([], [Z0(e, t, a)])]);
  return { type: "elem", elem: i };
}, F1 = function(e, t, a) {
  var n = ke["Size4-Regular"][e.charCodeAt(0)] ? ke["Size4-Regular"][e.charCodeAt(0)][4] : ke["Size1-Regular"][e.charCodeAt(0)][4], i = new it("inner", u5(e, Math.round(1e3 * t))), s = new Pe([i], { width: U(n), height: U(t), style: "width:" + U(n), viewBox: "0 0 " + 1e3 * n + " " + Math.round(1e3 * t), preserveAspectRatio: "xMinYMin" }), l = st([], [s], a);
  return l.height = t, l.style.height = U(t), l.style.width = U(n), { type: "elem", elem: l };
}, Sa = 8e-3, xr = { type: "kern", size: -1 * Sa }, _5 = /* @__PURE__ */ new Set(["|", "\\lvert", "\\rvert", "\\vert"]), e3 = /* @__PURE__ */ new Set(["\\|", "\\lVert", "\\rVert", "\\Vert"]), ss = function(e, t, a, n, i, s) {
  var l, h, d, f, y = "", x = 0;
  l = d = f = e, h = null;
  var w = "Size1-Regular";
  e === "\\uparrow" ? d = f = "\u23D0" : e === "\\Uparrow" ? d = f = "\u2016" : e === "\\downarrow" ? l = d = "\u23D0" : e === "\\Downarrow" ? l = d = "\u2016" : e === "\\updownarrow" ? (l = "\\uparrow", d = "\u23D0", f = "\\downarrow") : e === "\\Updownarrow" ? (l = "\\Uparrow", d = "\u2016", f = "\\Downarrow") : _5.has(e) ? (d = "\u2223", y = "vert", x = 333) : e3.has(e) ? (d = "\u2225", y = "doublevert", x = 556) : e === "[" || e === "\\lbrack" ? (l = "\u23A1", d = "\u23A2", f = "\u23A3", w = "Size4-Regular", y = "lbrack", x = 667) : e === "]" || e === "\\rbrack" ? (l = "\u23A4", d = "\u23A5", f = "\u23A6", w = "Size4-Regular", y = "rbrack", x = 667) : e === "\\lfloor" || e === "\u230A" ? (d = l = "\u23A2", f = "\u23A3", w = "Size4-Regular", y = "lfloor", x = 667) : e === "\\lceil" || e === "\u2308" ? (l = "\u23A1", d = f = "\u23A2", w = "Size4-Regular", y = "lceil", x = 667) : e === "\\rfloor" || e === "\u230B" ? (d = l = "\u23A5", f = "\u23A6", w = "Size4-Regular", y = "rfloor", x = 667) : e === "\\rceil" || e === "\u2309" ? (l = "\u23A4", d = f = "\u23A5", w = "Size4-Regular", y = "rceil", x = 667) : e === "(" || e === "\\lparen" ? (l = "\u239B", d = "\u239C", f = "\u239D", w = "Size4-Regular", y = "lparen", x = 875) : e === ")" || e === "\\rparen" ? (l = "\u239E", d = "\u239F", f = "\u23A0", w = "Size4-Regular", y = "rparen", x = 875) : e === "\\{" || e === "\\lbrace" ? (l = "\u23A7", h = "\u23A8", f = "\u23A9", d = "\u23AA", w = "Size4-Regular") : e === "\\}" || e === "\\rbrace" ? (l = "\u23AB", h = "\u23AC", f = "\u23AD", d = "\u23AA", w = "Size4-Regular") : e === "\\lgroup" || e === "\u27EE" ? (l = "\u23A7", f = "\u23A9", d = "\u23AA", w = "Size4-Regular") : e === "\\rgroup" || e === "\u27EF" ? (l = "\u23AB", f = "\u23AD", d = "\u23AA", w = "Size4-Regular") : e === "\\lmoustache" || e === "\u23B0" ? (l = "\u23A7", f = "\u23AD", d = "\u23AA", w = "Size4-Regular") : (e === "\\rmoustache" || e === "\u23B1") && (l = "\u23AB", f = "\u23A9", d = "\u23AA", w = "Size4-Regular");
  var B = jt(l, w, i), C = B.height + B.depth, D = jt(d, w, i), q = D.height + D.depth, E = jt(f, w, i), P = E.height + E.depth, V = 0, X = 1;
  if (h !== null) {
    var Y = jt(h, w, i);
    V = Y.height + Y.depth, X = 2;
  }
  var J = C + P + V, Q = Math.max(0, Math.ceil((t - J) / (X * q))), _ = J + Q * X * q, u0 = n.fontMetrics().axisHeight;
  a && (u0 *= n.sizeMultiplier);
  var v0 = _ / 2 - u0, s0 = [];
  if (y.length > 0) {
    var X0 = _ - C - P, C0 = Math.round(_ * 1e3), w0 = o5(y, Math.round(X0 * 1e3)), L0 = new it(y, w0), te = U(x / 1e3), re = U(C0 / 1e3), ht = new Pe([L0], { width: te, height: re, viewBox: "0 0 " + x + " " + C0 }), P0 = st([], [ht], n);
    P0.height = C0 / 1e3, P0.style.width = te, P0.style.height = re, s0.push({ type: "elem", elem: P0 });
  } else {
    if (s0.push(I1(f, w, i)), s0.push(xr), h === null) {
      var G0 = _ - C - P + 2 * Sa;
      s0.push(F1(d, G0, n));
    } else {
      var ge = (_ - C - P - V) / 2 + 2 * Sa;
      s0.push(F1(d, ge, n)), s0.push(xr), s0.push(I1(h, w, i)), s0.push(xr), s0.push(F1(d, ge, n));
    }
    s0.push(xr), s0.push(I1(l, w, i));
  }
  var k0 = n.havingBaseStyle(i0.TEXT), Ce = c0({ positionType: "bottom", positionData: v0, children: s0 });
  return Qa(F(["delimsizing", "mult"], [Ce], k0), i0.TEXT, n, s);
}, O1 = 80, $1 = 0.08, H1 = function(e, t, a, n, i) {
  var s = l5(e, n, a), l = new it(e, s), h = new Pe([l], { width: "400em", height: U(t), viewBox: "0 0 400000 " + a, preserveAspectRatio: "xMinYMin slice" });
  return st(["hide-tail"], [h], i);
}, t3 = function(e, t) {
  var a = t.havingBaseSizing(), n = ms("\\surd", e * a.sizeMultiplier, hs, a), i = a.sizeMultiplier, s = Math.max(0, t.minRuleThickness - t.fontMetrics().sqrtRuleThickness), l, h, d, f, y;
  return n.type === "small" ? (f = 1e3 + 1e3 * s + O1, e < 1 ? i = 1 : e < 1.4 && (i = 0.7), h = (1 + s + $1) / i, d = (1 + s) / i, l = H1("sqrtMain", h, f, s, t), l.style.minWidth = "0.853em", y = 0.833 / i) : n.type === "large" ? (f = (1e3 + O1) * Kt[n.size], d = (Kt[n.size] + s) / i, h = (Kt[n.size] + s + $1) / i, l = H1("sqrtSize" + n.size, h, f, s, t), l.style.minWidth = "1.02em", y = 1 / i) : (h = e + s + $1, d = e + s, f = Math.floor(1e3 * e + s) + O1, l = H1("sqrtTall", h, f, s, t), l.style.minWidth = "0.742em", y = 1.056), l.height = d, l.style.height = U(h), { span: l, advanceWidth: y, ruleWidth: (t.fontMetrics().sqrtRuleThickness + s) * i };
}, ls = /* @__PURE__ */ new Set(["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230A", "\u230B", "\\lceil", "\\rceil", "\u2308", "\u2309", "\\surd"]), r3 = /* @__PURE__ */ new Set(["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27EE", "\u27EF", "\\lmoustache", "\\rmoustache", "\u23B0", "\u23B1"]), us = /* @__PURE__ */ new Set(["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"]), Kt = [0, 1.2, 1.8, 2.4, 3], os = function(e, t, a, n, i) {
  if (e === "<" || e === "\\lt" || e === "\u27E8" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "\u27E9") && (e = "\\rangle"), ls.has(e) || us.has(e)) return is(e, t, false, a, n, i);
  if (r3.has(e)) return ss(e, Kt[t], false, a, n, i);
  throw new $("Illegal delimiter: '" + e + "'");
}, a3 = [{ type: "small", style: i0.SCRIPTSCRIPT }, { type: "small", style: i0.SCRIPT }, { type: "small", style: i0.TEXT }, { type: "large", size: 1 }, { type: "large", size: 2 }, { type: "large", size: 3 }, { type: "large", size: 4 }], n3 = [{ type: "small", style: i0.SCRIPTSCRIPT }, { type: "small", style: i0.SCRIPT }, { type: "small", style: i0.TEXT }, { type: "stack" }], hs = [{ type: "small", style: i0.SCRIPTSCRIPT }, { type: "small", style: i0.SCRIPT }, { type: "small", style: i0.TEXT }, { type: "large", size: 1 }, { type: "large", size: 2 }, { type: "large", size: 3 }, { type: "large", size: 4 }, { type: "stack" }], i3 = function(e) {
  if (e.type === "small") return "Main-Regular";
  if (e.type === "large") return "Size" + e.size + "-Regular";
  if (e.type === "stack") return "Size4-Regular";
  var t = e.type;
  throw new Error("Add support for delim type '" + t + "' here.");
}, ms = function(e, t, a, n) {
  for (var i = Math.min(2, 3 - n.style.size), s = i; s < a.length; s++) {
    var l = a[s];
    if (l.type === "stack") break;
    var h = jt(e, i3(l), "math"), d = h.height + h.depth;
    if (l.type === "small") {
      var f = n.havingBaseStyle(l.style);
      d *= f.sizeMultiplier;
    }
    if (d > t) return l;
  }
  return a[a.length - 1];
}, za = function(e, t, a, n, i, s) {
  e === "<" || e === "\\lt" || e === "\u27E8" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "\u27E9") && (e = "\\rangle");
  var l;
  us.has(e) ? l = a3 : ls.has(e) ? l = hs : l = n3;
  var h = ms(e, t, l, n);
  return h.type === "small" ? J5(e, h.style, a, n, i, s) : h.type === "large" ? is(e, h.size, a, n, i, s) : ss(e, t, a, n, i, s);
}, L1 = function(e, t, a, n, i, s) {
  var l = n.fontMetrics().axisHeight * n.sizeMultiplier, h = 901, d = 5 / n.fontMetrics().ptPerEm, f = Math.max(t - l, a + l), y = Math.max(f / 500 * h, 2 * f - d);
  return za(e, y, true, n, i, s);
}, hn = { "\\bigl": { mclass: "mopen", size: 1 }, "\\Bigl": { mclass: "mopen", size: 2 }, "\\biggl": { mclass: "mopen", size: 3 }, "\\Biggl": { mclass: "mopen", size: 4 }, "\\bigr": { mclass: "mclose", size: 1 }, "\\Bigr": { mclass: "mclose", size: 2 }, "\\biggr": { mclass: "mclose", size: 3 }, "\\Biggr": { mclass: "mclose", size: 4 }, "\\bigm": { mclass: "mrel", size: 1 }, "\\Bigm": { mclass: "mrel", size: 2 }, "\\biggm": { mclass: "mrel", size: 3 }, "\\Biggm": { mclass: "mrel", size: 4 }, "\\big": { mclass: "mord", size: 1 }, "\\Big": { mclass: "mord", size: 2 }, "\\bigg": { mclass: "mord", size: 3 }, "\\Bigg": { mclass: "mord", size: 4 } }, s3 = /* @__PURE__ */ new Set(["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230A", "\u230B", "\\lceil", "\\rceil", "\u2308", "\u2309", "<", ">", "\\langle", "\u27E8", "\\rangle", "\u27E9", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27EE", "\u27EF", "\\lmoustache", "\\rmoustache", "\u23B0", "\u23B1", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."]);
function mn(r) {
  return "isMiddle" in r;
}
function e1(r, e) {
  var t = Qr(r);
  if (t && s3.has(t.text)) return t;
  throw t ? new $("Invalid delimiter '" + t.text + "' after '" + e.funcName + "'", r) : new $("Invalid delimiter type '" + r.type + "'", r);
}
j({ type: "delimsizing", names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"], props: { numArgs: 1, argTypes: ["primitive"] }, handler: (r, e) => {
  var t = e1(e[0], r);
  return { type: "delimsizing", mode: r.parser.mode, size: hn[r.funcName].size, mclass: hn[r.funcName].mclass, delim: t.text };
}, htmlBuilder: (r, e) => r.delim === "." ? F([r.mclass]) : os(r.delim, r.size, e, r.mode, [r.mclass]), mathmlBuilder: (r) => {
  var e = [];
  r.delim !== "." && e.push(pe(r.delim, r.mode));
  var t = new L("mo", e);
  r.mclass === "mopen" || r.mclass === "mclose" ? t.setAttribute("fence", "true") : t.setAttribute("fence", "false"), t.setAttribute("stretchy", "true");
  var a = U(Kt[r.size]);
  return t.setAttribute("minsize", a), t.setAttribute("maxsize", a), t;
} });
function cn(r) {
  if (!r.body) throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
}
j({ type: "leftright-right", names: ["\\right"], props: { numArgs: 1, primitive: true }, handler: (r, e) => {
  var t = r.parser.gullet.macros.get("\\current@color");
  if (t && typeof t != "string") throw new $("\\current@color set to non-string in \\right");
  return { type: "leftright-right", mode: r.parser.mode, delim: e1(e[0], r).text, color: t };
} });
j({ type: "leftright", names: ["\\left"], props: { numArgs: 1, primitive: true }, handler: (r, e) => {
  var t = e1(e[0], r), a = r.parser;
  ++a.leftrightDepth;
  var n = a.parseExpression(false);
  --a.leftrightDepth, a.expect("\\right", false);
  var i = l0(a.parseFunction(), "leftright-right");
  return { type: "leftright", mode: a.mode, body: n, left: t.text, right: i.delim, rightColor: i.color };
}, htmlBuilder: (r, e) => {
  cn(r);
  for (var t = H0(r.body, e, true, ["mopen", "mclose"]), a = 0, n = 0, i = false, s = 0; s < t.length; s++) {
    var l = t[s];
    mn(l) ? i = true : (a = Math.max(t[s].height, a), n = Math.max(t[s].depth, n));
  }
  a *= e.sizeMultiplier, n *= e.sizeMultiplier;
  var h;
  if (r.left === "." ? h = ar(e, ["mopen"]) : h = L1(r.left, a, n, e, r.mode, ["mopen"]), t.unshift(h), i) for (var d = 1; d < t.length; d++) {
    var f = t[d];
    if (mn(f)) {
      var y = f.isMiddle;
      t[d] = L1(y.delim, a, n, y.options, r.mode, []);
    }
  }
  var x;
  if (r.right === ".") x = ar(e, ["mclose"]);
  else {
    var w = r.rightColor ? e.withColor(r.rightColor) : e;
    x = L1(r.right, a, n, w, r.mode, ["mclose"]);
  }
  return t.push(x), F(["minner"], t, e);
}, mathmlBuilder: (r, e) => {
  cn(r);
  var t = me(r.body, e);
  if (r.left !== ".") {
    var a = new L("mo", [pe(r.left, r.mode)]);
    a.setAttribute("fence", "true"), t.unshift(a);
  }
  if (r.right !== ".") {
    var n = new L("mo", [pe(r.right, r.mode)]);
    n.setAttribute("fence", "true"), r.rightColor && n.setAttribute("mathcolor", r.rightColor), t.push(n);
  }
  return Za(t);
} });
j({ type: "middle", names: ["\\middle"], props: { numArgs: 1, primitive: true }, handler: (r, e) => {
  var t = e1(e[0], r);
  if (!r.parser.leftrightDepth) throw new $("\\middle without preceding \\left", t);
  return { type: "middle", mode: r.parser.mode, delim: t.text };
}, htmlBuilder: (r, e) => {
  var t;
  return r.delim === "." ? t = ar(e, []) : (t = os(r.delim, 1, e, r.mode, []), t.isMiddle = { delim: r.delim, options: e }), t;
}, mathmlBuilder: (r, e) => {
  var t = r.delim === "\\vert" || r.delim === "|" ? pe("|", "text") : pe(r.delim, r.mode), a = new L("mo", [t]);
  return a.setAttribute("fence", "true"), a.setAttribute("lspace", "0.05em"), a.setAttribute("rspace", "0.05em"), a;
} });
var t1 = (r, e) => {
  var t = Dt(d0(r.body, e), e), a = r.label.slice(1), n = e.sizeMultiplier, i, s, l = Xe(r.body);
  if (a === "sout") i = F(["stretchy", "sout"]), i.height = e.fontMetrics().defaultRuleThickness / n, s = -0.5 * e.fontMetrics().xHeight;
  else if (a === "phase") {
    var h = M0({ number: 0.6, unit: "pt" }, e), d = M0({ number: 0.35, unit: "ex" }, e), f = e.havingBaseSizing();
    n = n / f.sizeMultiplier;
    var y = t.height + t.depth + h + d;
    t.style.paddingLeft = U(y / 2 + h);
    var x = Math.floor(1e3 * y * n), w = i5(x), B = new Pe([new it("phase", w)], { width: "400em", height: U(x / 1e3), viewBox: "0 0 400000 " + x, preserveAspectRatio: "xMinYMin slice" });
    i = st(["hide-tail"], [B], e), i.style.height = U(y), s = t.depth + h + d;
  } else {
    /cancel/.test(a) ? l || t.classes.push("cancel-pad") : a === "angl" ? t.classes.push("anglpad") : t.classes.push("boxpad");
    var C, D, q = 0;
    /box/.test(a) ? (q = Math.max(e.fontMetrics().fboxrule, e.minRuleThickness), C = e.fontMetrics().fboxsep + (a === "colorbox" ? 0 : q), D = C) : a === "angl" ? (q = Math.max(e.fontMetrics().defaultRuleThickness, e.minRuleThickness), C = 4 * q, D = Math.max(0, 0.25 - t.depth)) : (C = l ? 0.2 : 0, D = C), i = P5(t, a, C, D, e), /fbox|boxed|fcolorbox/.test(a) ? (i.style.borderStyle = "solid", i.style.borderWidth = U(q)) : a === "angl" && q !== 0.049 && (i.style.borderTopWidth = U(q), i.style.borderRightWidth = U(q)), s = t.depth + D, r.backgroundColor && (i.style.backgroundColor = r.backgroundColor, r.borderColor && (i.style.borderColor = r.borderColor));
  }
  var E;
  if (r.backgroundColor) E = c0({ positionType: "individualShift", children: [{ type: "elem", elem: i, shift: s }, { type: "elem", elem: t, shift: 0 }] });
  else {
    var P = /cancel|phase/.test(a) ? ["svg-align"] : [];
    E = c0({ positionType: "individualShift", children: [{ type: "elem", elem: t, shift: 0 }, { type: "elem", elem: i, shift: s, wrapperClasses: P }] });
  }
  return /cancel/.test(a) && (E.height = t.height, E.depth = t.depth), /cancel/.test(a) && !l ? F(["mord", "cancel-lap"], [E], e) : F(["mord"], [E], e);
}, r1 = (r, e) => {
  var t, a = new L(r.label.includes("colorbox") ? "mpadded" : "menclose", [p0(r.body, e)]);
  switch (r.label) {
    case "\\cancel":
      a.setAttribute("notation", "updiagonalstrike");
      break;
    case "\\bcancel":
      a.setAttribute("notation", "downdiagonalstrike");
      break;
    case "\\phase":
      a.setAttribute("notation", "phasorangle");
      break;
    case "\\sout":
      a.setAttribute("notation", "horizontalstrike");
      break;
    case "\\fbox":
      a.setAttribute("notation", "box");
      break;
    case "\\angl":
      a.setAttribute("notation", "actuarial");
      break;
    case "\\fcolorbox":
    case "\\colorbox":
      if (t = e.fontMetrics().fboxsep * e.fontMetrics().ptPerEm, a.setAttribute("width", "+" + 2 * t + "pt"), a.setAttribute("height", "+" + 2 * t + "pt"), a.setAttribute("lspace", t + "pt"), a.setAttribute("voffset", t + "pt"), r.label === "\\fcolorbox") {
        var n = Math.max(e.fontMetrics().fboxrule, e.minRuleThickness);
        a.setAttribute("style", "border: " + U(n) + " solid " + r.borderColor);
      }
      break;
    case "\\xcancel":
      a.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
      break;
  }
  return r.backgroundColor && a.setAttribute("mathbackground", r.backgroundColor), a;
};
j({ type: "enclose", names: ["\\colorbox"], props: { numArgs: 2, allowedInText: true, argTypes: ["color", "hbox"] }, handler(r, e, t) {
  var { parser: a, funcName: n } = r, i = l0(e[0], "color-token").color, s = e[1];
  return { type: "enclose", mode: a.mode, label: n, backgroundColor: i, body: s };
}, htmlBuilder: t1, mathmlBuilder: r1 });
j({ type: "enclose", names: ["\\fcolorbox"], props: { numArgs: 3, allowedInText: true, argTypes: ["color", "color", "hbox"] }, handler(r, e, t) {
  var { parser: a, funcName: n } = r, i = l0(e[0], "color-token").color, s = l0(e[1], "color-token").color, l = e[2];
  return { type: "enclose", mode: a.mode, label: n, backgroundColor: s, borderColor: i, body: l };
}, htmlBuilder: t1, mathmlBuilder: r1 });
j({ type: "enclose", names: ["\\fbox"], props: { numArgs: 1, argTypes: ["hbox"], allowedInText: true }, handler(r, e) {
  var { parser: t } = r;
  return { type: "enclose", mode: t.mode, label: "\\fbox", body: e[0] };
} });
j({ type: "enclose", names: ["\\cancel", "\\bcancel", "\\xcancel", "\\phase"], props: { numArgs: 1 }, handler(r, e) {
  var { parser: t, funcName: a } = r, n = e[0];
  return { type: "enclose", mode: t.mode, label: a, body: n };
}, htmlBuilder: t1, mathmlBuilder: r1 });
j({ type: "enclose", names: ["\\sout"], props: { numArgs: 1, allowedInText: true }, handler(r, e) {
  var { parser: t, funcName: a } = r;
  t.mode === "math" && t.settings.reportNonstrict("mathVsSout", "LaTeX's \\sout works only in text mode");
  var n = e[0];
  return { type: "enclose", mode: t.mode, label: a, body: n };
}, htmlBuilder: t1, mathmlBuilder: r1 });
j({ type: "enclose", names: ["\\angl"], props: { numArgs: 1, argTypes: ["hbox"], allowedInText: false }, handler(r, e) {
  var { parser: t } = r;
  return { type: "enclose", mode: t.mode, label: "\\angl", body: e[0] };
} });
var cs = {};
function Me(r) {
  for (var { type: e, names: t, props: a, handler: n, htmlBuilder: i, mathmlBuilder: s } = r, l = { type: e, numArgs: a.numArgs || 0, allowedInText: false, numOptionalArgs: 0, handler: n }, h = 0; h < t.length; ++h) cs[t[h]] = l;
  i && (Er[e] = i), s && (Nr[e] = s);
}
var ds = {};
function b(r, e) {
  ds[r] = e;
}
class ee {
  constructor(e, t, a) {
    this.lexer = void 0, this.start = void 0, this.end = void 0, this.lexer = e, this.start = t, this.end = a;
  }
  static range(e, t) {
    return t ? !e || !e.loc || !t.loc || e.loc.lexer !== t.loc.lexer ? null : new ee(e.loc.lexer, e.loc.start, t.loc.end) : e && e.loc;
  }
}
class ie {
  constructor(e, t) {
    this.text = void 0, this.loc = void 0, this.noexpand = void 0, this.treatAsRelax = void 0, this.text = e, this.loc = t;
  }
  range(e, t) {
    return new ie(t, ee.range(this, e));
  }
}
function dn(r) {
  var e = [];
  r.consumeSpaces();
  var t = r.fetch().text;
  for (t === "\\relax" && (r.consume(), r.consumeSpaces(), t = r.fetch().text); t === "\\hline" || t === "\\hdashline"; ) r.consume(), e.push(t === "\\hdashline"), r.consumeSpaces(), t = r.fetch().text;
  return e;
}
var a1 = (r) => {
  var e = r.parser.settings;
  if (!e.displayMode) throw new $("{" + r.envName + "} can be used only in display mode.");
}, l3 = /* @__PURE__ */ new Set(["gather", "gather*"]);
function _a(r) {
  if (!r.includes("ed")) return !r.includes("*");
}
function ot(r, e, t) {
  var { hskipBeforeAndAfter: a, addJot: n, cols: i, arraystretch: s, colSeparationType: l, autoTag: h, singleRow: d, emptySingleRow: f, maxNumCols: y, leqno: x } = e;
  if (r.gullet.beginGroup(), d || r.gullet.macros.set("\\cr", "\\\\\\relax"), !s) {
    var w = r.gullet.expandMacroAsText("\\arraystretch");
    if (w == null) s = 1;
    else if (s = parseFloat(w), !s || s < 0) throw new $("Invalid \\arraystretch: " + w);
  }
  r.gullet.beginGroup();
  var B = [], C = [B], D = [], q = [], E = h != null ? [] : void 0;
  function P() {
    h && r.gullet.macros.set("\\@eqnsw", "1", true);
  }
  function V() {
    E && (r.gullet.macros.get("\\df@tag") ? (E.push(r.subparse([new ie("\\df@tag")])), r.gullet.macros.set("\\df@tag", void 0, true)) : E.push(!!h && r.gullet.macros.get("\\@eqnsw") === "1"));
  }
  for (P(), q.push(dn(r)); ; ) {
    var X = r.parseExpression(false, d ? "\\end" : "\\\\");
    r.gullet.endGroup(), r.gullet.beginGroup();
    var Y = { type: "ordgroup", mode: r.mode, body: X };
    t && (Y = { type: "styling", mode: r.mode, style: t, resetFont: true, body: [Y] }), B.push(Y);
    var J = r.fetch().text;
    if (J === "&") {
      if (y && B.length === y) {
        if (d || l) throw new $("Too many tab characters: &", r.nextToken);
        r.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.");
      }
      r.consume();
    } else if (J === "\\end") {
      V(), B.length === 1 && Y.type === "styling" && Y.body.length === 1 && Y.body[0].type === "ordgroup" && Y.body[0].body.length === 0 && (C.length > 1 || !f) && C.pop(), q.length < C.length + 1 && q.push([]);
      break;
    } else if (J === "\\\\") {
      r.consume();
      var Q = void 0;
      r.gullet.future().text !== " " && (Q = r.parseSizeGroup(true)), D.push(Q ? Q.value : null), V(), q.push(dn(r)), B = [], C.push(B), P();
    } else throw new $("Expected & or \\\\ or \\cr or \\end", r.nextToken);
  }
  return r.gullet.endGroup(), r.gullet.endGroup(), { type: "array", mode: r.mode, addJot: n, arraystretch: s, body: C, cols: i, rowGaps: D, hskipBeforeAndAfter: a, hLinesBeforeRow: q, colSeparationType: l, tags: E, leqno: x };
}
function e4(r) {
  return r.slice(0, 1) === "d" ? "display" : "text";
}
var Te = function(e, t) {
  var a, n, i = e.body.length, s = e.hLinesBeforeRow, l = 0, h = new Array(i), d = [], f = Math.max(t.fontMetrics().arrayRuleWidth, t.minRuleThickness), y = 1 / t.fontMetrics().ptPerEm, x = 5 * y;
  if (e.colSeparationType && e.colSeparationType === "small") {
    var w = t.havingStyle(i0.SCRIPT).sizeMultiplier;
    x = 0.2778 * (w / t.sizeMultiplier);
  }
  var B = e.colSeparationType === "CD" ? M0({ number: 3, unit: "ex" }, t) : 12 * y, C = 3 * y, D = e.arraystretch * B, q = 0.7 * D, E = 0.3 * D, P = 0;
  function V(Ne) {
    for (var Re = 0; Re < Ne.length; ++Re) Re > 0 && (P += 0.25), d.push({ pos: P, isDashed: Ne[Re] });
  }
  for (V(s[0]), a = 0; a < e.body.length; ++a) {
    var X = e.body[a], Y = q, J = E;
    l < X.length && (l = X.length);
    var Q = { cells: new Array(X.length), height: 0, depth: 0, pos: 0 };
    for (n = 0; n < X.length; ++n) {
      var _ = d0(X[n], t);
      J < _.depth && (J = _.depth), Y < _.height && (Y = _.height), Q.cells[n] = _;
    }
    var u0 = e.rowGaps[a], v0 = 0;
    u0 && (v0 = M0(u0, t), v0 > 0 && (v0 += E, J < v0 && (J = v0), v0 = 0)), e.addJot && a < e.body.length - 1 && (J += C), Q.height = Y, Q.depth = J, P += Y, Q.pos = P, P += J + v0, h[a] = Q, V(s[a + 1]);
  }
  var s0 = P / 2 + t.fontMetrics().axisHeight, X0 = e.cols || [], C0 = [], w0, L0, te = [];
  if (e.tags && e.tags.some((Ne) => Ne)) for (a = 0; a < i; ++a) {
    var re = h[a], ht = re.pos - s0, P0 = e.tags[a], G0 = void 0;
    P0 === true ? G0 = F(["eqn-num"], [], t) : P0 === false ? G0 = F([], [], t) : G0 = F([], H0(P0, t, true), t), G0.depth = re.depth, G0.height = re.height, te.push({ type: "elem", elem: G0, shift: ht });
  }
  for (n = 0, L0 = 0; n < l || L0 < X0.length; ++n, ++L0) {
    for (var ge, k0 = X0[L0], Ce = true; (($t = k0) == null ? void 0 : $t.type) === "separator"; ) {
      var $t;
      if (Ce || (w0 = F(["arraycolsep"], []), w0.style.width = U(t.fontMetrics().doubleRuleSep), C0.push(w0)), k0.separator === "|" || k0.separator === ":") {
        var s1 = k0.separator === "|" ? "solid" : "dashed", ae = F(["vertical-separator"], [], t);
        ae.style.height = U(P), ae.style.borderRightWidth = U(f), ae.style.borderRightStyle = s1, ae.style.margin = "0 " + U(-f / 2);
        var Ht = P - s0;
        Ht && (ae.style.verticalAlign = U(-Ht)), C0.push(ae);
      } else throw new $("Invalid separator type: " + k0.separator);
      L0++, k0 = X0[L0], Ce = false;
    }
    if (!(n >= l)) {
      var ne = void 0;
      if (n > 0 || e.hskipBeforeAndAfter) {
        var Lt, Pt;
        ne = (Lt = (Pt = k0) == null ? void 0 : Pt.pregap) != null ? Lt : x, ne !== 0 && (w0 = F(["arraycolsep"], []), w0.style.width = U(ne), C0.push(w0));
      }
      var Gt = [];
      for (a = 0; a < i; ++a) {
        var De = h[a], qe = De.cells[n];
        if (qe) {
          var l1 = De.pos - s0;
          qe.depth = De.depth, qe.height = De.height, Gt.push({ type: "elem", elem: qe, shift: l1 });
        }
      }
      var u1 = c0({ positionType: "individualShift", children: Gt }), o1 = F(["col-align-" + (((ge = k0) == null ? void 0 : ge.align) || "c")], [u1]);
      if (C0.push(o1), n < l - 1 || e.hskipBeforeAndAfter) {
        var Ut, Vt;
        ne = (Ut = (Vt = k0) == null ? void 0 : Vt.postgap) != null ? Ut : x, ne !== 0 && (w0 = F(["arraycolsep"], []), w0.style.width = U(ne), C0.push(w0));
      }
    }
  }
  var Ee = F(["mtable"], C0);
  if (d.length > 0) {
    for (var h1 = Ct("hline", t, f), m1 = Ct("hdashline", t, f), mt = [{ type: "elem", elem: Ee, shift: 0 }]; d.length > 0; ) {
      var Xt = d.pop(), Yt = Xt.pos - s0;
      Xt.isDashed ? mt.push({ type: "elem", elem: m1, shift: Yt }) : mt.push({ type: "elem", elem: h1, shift: Yt });
    }
    Ee = c0({ positionType: "individualShift", children: mt });
  }
  if (te.length === 0) return F(["mord"], [Ee], t);
  var c1 = c0({ positionType: "individualShift", children: te }), d1 = F(["tag"], [c1], t);
  return We([Ee, d1]);
}, u3 = { c: "center ", l: "left ", r: "right " }, Be = function(e, t) {
  for (var a = [], n = new L("mtd", [], ["mtr-glue"]), i = new L("mtd", [], ["mml-eqn-num"]), s = 0; s < e.body.length; s++) {
    for (var l = e.body[s], h = [], d = 0; d < l.length; d++) h.push(new L("mtd", [p0(l[d], t)]));
    e.tags && e.tags[s] && (h.unshift(n), h.push(n), e.leqno ? h.unshift(i) : h.push(i)), a.push(new L("mtr", h));
  }
  var f = new L("mtable", a), y = e.arraystretch === 0.5 ? 0.1 : 0.16 + e.arraystretch - 1 + (e.addJot ? 0.09 : 0);
  f.setAttribute("rowspacing", U(y));
  var x = "", w = "";
  if (e.cols && e.cols.length > 0) {
    var B = e.cols, C = "", D = false, q = 0, E = B.length;
    B[0].type === "separator" && (x += "top ", q = 1), B[B.length - 1].type === "separator" && (x += "bottom ", E -= 1);
    for (var P = q; P < E; P++) {
      var V = B[P];
      V.type === "align" ? (w += u3[V.align], D && (C += "none "), D = true) : V.type === "separator" && D && (C += V.separator === "|" ? "solid " : "dashed ", D = false);
    }
    f.setAttribute("columnalign", w.trim()), /[sd]/.test(C) && f.setAttribute("columnlines", C.trim());
  }
  if (e.colSeparationType === "align") {
    for (var X = e.cols || [], Y = "", J = 1; J < X.length; J++) Y += J % 2 ? "0em " : "1em ";
    f.setAttribute("columnspacing", Y.trim());
  } else e.colSeparationType === "alignat" || e.colSeparationType === "gather" ? f.setAttribute("columnspacing", "0em") : e.colSeparationType === "small" ? f.setAttribute("columnspacing", "0.2778em") : e.colSeparationType === "CD" ? f.setAttribute("columnspacing", "0.5em") : f.setAttribute("columnspacing", "1em");
  var Q = "", _ = e.hLinesBeforeRow;
  x += _[0].length > 0 ? "left " : "", x += _[_.length - 1].length > 0 ? "right " : "";
  for (var u0 = 1; u0 < _.length - 1; u0++) Q += _[u0].length === 0 ? "none " : _[u0][0] ? "dashed " : "solid ";
  return /[sd]/.test(Q) && f.setAttribute("rowlines", Q.trim()), x !== "" && (f = new L("menclose", [f]), f.setAttribute("notation", x.trim())), e.arraystretch && e.arraystretch < 1 && (f = new L("mstyle", [f]), f.setAttribute("scriptlevel", "1")), f;
}, fs = function(e, t) {
  e.envName.includes("ed") || a1(e);
  var a = [], n = e.envName.includes("at") ? "alignat" : "align", i = e.envName === "split", s = ot(e.parser, { cols: a, addJot: true, autoTag: i ? void 0 : _a(e.envName), emptySingleRow: true, colSeparationType: n, maxNumCols: i ? 2 : void 0, leqno: e.parser.settings.leqno }, "display"), l = 0, h = 0, d = { type: "ordgroup", mode: e.mode, body: [] };
  if (t[0] && t[0].type === "ordgroup") {
    for (var f = "", y = 0; y < t[0].body.length; y++) {
      var x = l0(t[0].body[y], "textord");
      f += x.text;
    }
    l = Number(f), h = l * 2;
  }
  var w = !h;
  s.body.forEach(function(q) {
    for (var E = 1; E < q.length; E += 2) {
      var P = l0(q[E], "styling"), V = l0(P.body[0], "ordgroup");
      V.body.unshift(d);
    }
    if (w) h < q.length && (h = q.length);
    else {
      var X = q.length / 2;
      if (l < X) throw new $("Too many math in a row: " + ("expected " + l + ", but got " + X), q[0]);
    }
  });
  for (var B = 0; B < h; ++B) {
    var C = "r", D = 0;
    B % 2 === 1 ? C = "l" : B > 0 && w && (D = 1), a[B] = { type: "align", align: C, pregap: D, postgap: 0 };
  }
  return s.colSeparationType = w ? "align" : "alignat", s;
};
Me({ type: "array", names: ["array", "darray"], props: { numArgs: 1 }, handler(r, e) {
  var t = Qr(e[0]), a = t ? [e[0]] : l0(e[0], "ordgroup").body, n = a.map(function(s) {
    var l = Jr(s), h = l.text;
    if ("lcr".includes(h)) return { type: "align", align: h };
    if (h === "|") return { type: "separator", separator: "|" };
    if (h === ":") return { type: "separator", separator: ":" };
    throw new $("Unknown column alignment: " + h, s);
  }), i = { cols: n, hskipBeforeAndAfter: true, maxNumCols: n.length };
  return ot(r.parser, i, e4(r.envName));
}, htmlBuilder: Te, mathmlBuilder: Be });
Me({ type: "array", names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix*", "pmatrix*", "bmatrix*", "Bmatrix*", "vmatrix*", "Vmatrix*"], props: { numArgs: 0 }, handler(r) {
  var e = { matrix: null, pmatrix: ["(", ")"], bmatrix: ["[", "]"], Bmatrix: ["\\{", "\\}"], vmatrix: ["|", "|"], Vmatrix: ["\\Vert", "\\Vert"] }[r.envName.replace("*", "")], t = "c", a = { hskipBeforeAndAfter: false, cols: [{ type: "align", align: t }] };
  if (r.envName.charAt(r.envName.length - 1) === "*") {
    var n = r.parser;
    if (n.consumeSpaces(), n.fetch().text === "[") {
      if (n.consume(), n.consumeSpaces(), t = n.fetch().text, !"lcr".includes(t)) throw new $("Expected l or c or r", n.nextToken);
      n.consume(), n.consumeSpaces(), n.expect("]"), n.consume(), a.cols = [{ type: "align", align: t }];
    }
  }
  var i = ot(r.parser, a, e4(r.envName)), s = Math.max(0, ...i.body.map((l) => l.length));
  return i.cols = new Array(s).fill({ type: "align", align: t }), e ? { type: "leftright", mode: r.mode, body: [i], left: e[0], right: e[1], rightColor: void 0 } : i;
}, htmlBuilder: Te, mathmlBuilder: Be });
Me({ type: "array", names: ["smallmatrix"], props: { numArgs: 0 }, handler(r) {
  var e = { arraystretch: 0.5 }, t = ot(r.parser, e, "script");
  return t.colSeparationType = "small", t;
}, htmlBuilder: Te, mathmlBuilder: Be });
Me({ type: "array", names: ["subarray"], props: { numArgs: 1 }, handler(r, e) {
  var t = Qr(e[0]), a = t ? [e[0]] : l0(e[0], "ordgroup").body, n = a.map(function(l) {
    var h = Jr(l), d = h.text;
    if ("lc".includes(d)) return { type: "align", align: d };
    throw new $("Unknown column alignment: " + d, l);
  });
  if (n.length > 1) throw new $("{subarray} can contain only one column");
  var i = { cols: n, hskipBeforeAndAfter: false, arraystretch: 0.5 }, s = ot(r.parser, i, "script");
  if (s.body.length > 0 && s.body[0].length > 1) throw new $("{subarray} can contain only one column");
  return s;
}, htmlBuilder: Te, mathmlBuilder: Be });
Me({ type: "array", names: ["cases", "dcases", "rcases", "drcases"], props: { numArgs: 0 }, handler(r) {
  var e = { arraystretch: 1.2, cols: [{ type: "align", align: "l", pregap: 0, postgap: 1 }, { type: "align", align: "l", pregap: 0, postgap: 0 }] }, t = ot(r.parser, e, e4(r.envName));
  return { type: "leftright", mode: r.mode, body: [t], left: r.envName.includes("r") ? "." : "\\{", right: r.envName.includes("r") ? "\\}" : ".", rightColor: void 0 };
}, htmlBuilder: Te, mathmlBuilder: Be });
Me({ type: "array", names: ["align", "align*", "aligned", "split"], props: { numArgs: 0 }, handler: fs, htmlBuilder: Te, mathmlBuilder: Be });
Me({ type: "array", names: ["gathered", "gather", "gather*"], props: { numArgs: 0 }, handler(r) {
  l3.has(r.envName) && a1(r);
  var e = { cols: [{ type: "align", align: "c" }], addJot: true, colSeparationType: "gather", autoTag: _a(r.envName), emptySingleRow: true, leqno: r.parser.settings.leqno };
  return ot(r.parser, e, "display");
}, htmlBuilder: Te, mathmlBuilder: Be });
Me({ type: "array", names: ["alignat", "alignat*", "alignedat"], props: { numArgs: 1 }, handler: fs, htmlBuilder: Te, mathmlBuilder: Be });
Me({ type: "array", names: ["equation", "equation*"], props: { numArgs: 0 }, handler(r) {
  a1(r);
  var e = { autoTag: _a(r.envName), emptySingleRow: true, singleRow: true, maxNumCols: 1, leqno: r.parser.settings.leqno };
  return ot(r.parser, e, "display");
}, htmlBuilder: Te, mathmlBuilder: Be });
Me({ type: "array", names: ["CD"], props: { numArgs: 0 }, handler(r) {
  return a1(r), Z5(r.parser);
}, htmlBuilder: Te, mathmlBuilder: Be });
b("\\nonumber", "\\gdef\\@eqnsw{0}");
b("\\notag", "\\nonumber");
j({ type: "text", names: ["\\hline", "\\hdashline"], props: { numArgs: 0, allowedInText: true, allowedInMath: true }, handler(r, e) {
  throw new $(r.funcName + " valid only within array environment");
} });
var fn = cs;
j({ type: "environment", names: ["\\begin", "\\end"], props: { numArgs: 1, argTypes: ["text"] }, handler(r, e) {
  var { parser: t, funcName: a } = r, n = e[0];
  if (n.type !== "ordgroup") throw new $("Invalid environment name", n);
  for (var i = "", s = 0; s < n.body.length; ++s) i += l0(n.body[s], "textord").text;
  if (a === "\\begin") {
    if (!fn.hasOwnProperty(i)) throw new $("No such environment: " + i, n);
    var l = fn[i], { args: h, optArgs: d } = t.parseArguments("\\begin{" + i + "}", l), f = { mode: t.mode, envName: i, parser: t }, y = l.handler(f, h, d);
    t.expect("\\end", false);
    var x = t.nextToken, w = l0(t.parseFunction(), "environment");
    if (w.name !== i) throw new $("Mismatch: \\begin{" + i + "} matched by \\end{" + w.name + "}", x);
    return y;
  }
  return { type: "environment", mode: t.mode, name: i, nameGroup: n };
} });
var vs = (r, e) => {
  var t = r.font, a = e.withFont(t);
  return d0(r.body, a);
}, ps = (r, e) => {
  var t = r.font, a = e.withFont(t);
  return p0(r.body, a);
}, vn = { "\\Bbb": "\\mathbb", "\\bold": "\\mathbf", "\\frak": "\\mathfrak" };
j({ type: "font", names: ["\\mathrm", "\\mathit", "\\mathbf", "\\mathnormal", "\\mathsfit", "\\mathbb", "\\mathcal", "\\mathfrak", "\\mathscr", "\\mathsf", "\\mathtt", "\\Bbb", "\\bold", "\\frak"], props: { numArgs: 1, allowedInArgument: true }, handler: (r, e) => {
  var { parser: t, funcName: a } = r, n = Rr(e[0]), i = a;
  return i in vn && (i = vn[i]), { type: "font", mode: t.mode, font: i.slice(1), body: n };
}, htmlBuilder: vs, mathmlBuilder: ps });
j({ type: "mclass", names: ["\\boldsymbol", "\\bm"], props: { numArgs: 1 }, handler: (r, e) => {
  var { parser: t } = r, a = e[0];
  return { type: "mclass", mode: t.mode, mclass: _r(a), body: [{ type: "font", mode: t.mode, font: "boldsymbol", body: a }], isCharacterBox: Xe(a) };
} });
j({ type: "font", names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"], props: { numArgs: 0, allowedInText: true }, handler: (r, e) => {
  var { parser: t, funcName: a, breakOnTokenText: n } = r, { mode: i } = t, s = t.parseExpression(true, n);
  return { type: "font", mode: i, font: "math" + a.slice(1), body: { type: "ordgroup", mode: t.mode, body: s } };
}, htmlBuilder: vs, mathmlBuilder: ps });
var o3 = (r, e) => {
  var t = e.style, a = t.fracNum(), n = t.fracDen(), i;
  i = e.havingStyle(a);
  var s = d0(r.numer, i, e);
  if (r.continued) {
    var l = 8.5 / e.fontMetrics().ptPerEm, h = 3.5 / e.fontMetrics().ptPerEm;
    s.height = s.height < l ? l : s.height, s.depth = s.depth < h ? h : s.depth;
  }
  i = e.havingStyle(n);
  var d = d0(r.denom, i, e), f, y, x;
  r.hasBarLine ? (r.barSize ? (y = M0(r.barSize, e), f = Ct("frac-line", e, y)) : f = Ct("frac-line", e), y = f.height, x = f.height) : (f = null, y = 0, x = e.fontMetrics().defaultRuleThickness);
  var w, B, C;
  t.size === i0.DISPLAY.size ? (w = e.fontMetrics().num1, y > 0 ? B = 3 * x : B = 7 * x, C = e.fontMetrics().denom1) : (y > 0 ? (w = e.fontMetrics().num2, B = x) : (w = e.fontMetrics().num3, B = 3 * x), C = e.fontMetrics().denom2);
  var D;
  if (f) {
    var E = e.fontMetrics().axisHeight;
    w - s.depth - (E + 0.5 * y) < B && (w += B - (w - s.depth - (E + 0.5 * y))), E - 0.5 * y - (d.height - C) < B && (C += B - (E - 0.5 * y - (d.height - C)));
    var P = -(E - 0.5 * y);
    D = c0({ positionType: "individualShift", children: [{ type: "elem", elem: d, shift: C }, { type: "elem", elem: f, shift: P }, { type: "elem", elem: s, shift: -w }] });
  } else {
    var q = w - s.depth - (d.height - C);
    q < B && (w += 0.5 * (B - q), C += 0.5 * (B - q)), D = c0({ positionType: "individualShift", children: [{ type: "elem", elem: d, shift: C }, { type: "elem", elem: s, shift: -w }] });
  }
  i = e.havingStyle(t), D.height *= i.sizeMultiplier / e.sizeMultiplier, D.depth *= i.sizeMultiplier / e.sizeMultiplier;
  var V;
  t.size === i0.DISPLAY.size ? V = e.fontMetrics().delim1 : t.size === i0.SCRIPTSCRIPT.size ? V = e.havingStyle(i0.SCRIPT).fontMetrics().delim2 : V = e.fontMetrics().delim2;
  var X, Y;
  return r.leftDelim == null ? X = ar(e, ["mopen"]) : X = za(r.leftDelim, V, true, e.havingStyle(t), r.mode, ["mopen"]), r.continued ? Y = F([]) : r.rightDelim == null ? Y = ar(e, ["mclose"]) : Y = za(r.rightDelim, V, true, e.havingStyle(t), r.mode, ["mclose"]), F(["mord"].concat(i.sizingClasses(e)), [X, F(["mfrac"], [D]), Y], e);
}, h3 = (r, e) => {
  var t = new L("mfrac", [p0(r.numer, e), p0(r.denom, e)]);
  if (!r.hasBarLine) t.setAttribute("linethickness", "0px");
  else if (r.barSize) {
    var a = M0(r.barSize, e);
    t.setAttribute("linethickness", U(a));
  }
  if (r.leftDelim != null || r.rightDelim != null) {
    var n = [];
    if (r.leftDelim != null) {
      var i = new L("mo", [new N0(r.leftDelim.replace("\\", ""))]);
      i.setAttribute("fence", "true"), n.push(i);
    }
    if (n.push(t), r.rightDelim != null) {
      var s = new L("mo", [new N0(r.rightDelim.replace("\\", ""))]);
      s.setAttribute("fence", "true"), n.push(s);
    }
    return Za(n);
  }
  return t;
}, gs = (r, e) => {
  if (!e) return r;
  var t = { type: "styling", mode: r.mode, style: e, body: [r] };
  return t;
};
j({ type: "genfrac", names: ["\\cfrac", "\\dfrac", "\\frac", "\\tfrac", "\\dbinom", "\\binom", "\\tbinom", "\\\\atopfrac", "\\\\bracefrac", "\\\\brackfrac"], props: { numArgs: 2, allowedInArgument: true }, handler: (r, e) => {
  var { parser: t, funcName: a } = r, n = e[0], i = e[1], s, l = null, h = null;
  switch (a) {
    case "\\cfrac":
    case "\\dfrac":
    case "\\frac":
    case "\\tfrac":
      s = true;
      break;
    case "\\\\atopfrac":
      s = false;
      break;
    case "\\dbinom":
    case "\\binom":
    case "\\tbinom":
      s = false, l = "(", h = ")";
      break;
    case "\\\\bracefrac":
      s = false, l = "\\{", h = "\\}";
      break;
    case "\\\\brackfrac":
      s = false, l = "[", h = "]";
      break;
    default:
      throw new Error("Unrecognized genfrac command");
  }
  var d = a === "\\cfrac", f = null;
  return d || a.startsWith("\\d") ? f = "display" : a.startsWith("\\t") && (f = "text"), gs({ type: "genfrac", mode: t.mode, numer: n, denom: i, continued: d, hasBarLine: s, leftDelim: l, rightDelim: h, barSize: null }, f);
}, htmlBuilder: o3, mathmlBuilder: h3 });
j({ type: "infix", names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"], props: { numArgs: 0, infix: true }, handler(r) {
  var { parser: e, funcName: t, token: a } = r, n;
  switch (t) {
    case "\\over":
      n = "\\frac";
      break;
    case "\\choose":
      n = "\\binom";
      break;
    case "\\atop":
      n = "\\\\atopfrac";
      break;
    case "\\brace":
      n = "\\\\bracefrac";
      break;
    case "\\brack":
      n = "\\\\brackfrac";
      break;
    default:
      throw new Error("Unrecognized infix genfrac command");
  }
  return { type: "infix", mode: e.mode, replaceWith: n, token: a };
} });
var pn = ["display", "text", "script", "scriptscript"], gn = function(e) {
  var t = null;
  return e.length > 0 && (t = e, t = t === "." ? null : t), t;
};
j({ type: "genfrac", names: ["\\genfrac"], props: { numArgs: 6, allowedInArgument: true, argTypes: ["math", "math", "size", "text", "math", "math"] }, handler(r, e) {
  var { parser: t } = r, a = e[4], n = e[5], i = Rr(e[0]), s = i.type === "atom" && i.family === "open" ? gn(i.text) : null, l = Rr(e[1]), h = l.type === "atom" && l.family === "close" ? gn(l.text) : null, d = l0(e[2], "size"), f, y = null;
  d.isBlank ? f = true : (y = d.value, f = y.number > 0);
  var x = null, w = e[3];
  if (w.type === "ordgroup") {
    if (w.body.length > 0) {
      var B = l0(w.body[0], "textord");
      x = pn[Number(B.text)];
    }
  } else w = l0(w, "textord"), x = pn[Number(w.text)];
  return gs({ type: "genfrac", mode: t.mode, numer: a, denom: n, continued: false, hasBarLine: f, barSize: y, leftDelim: s, rightDelim: h }, x);
} });
j({ type: "infix", names: ["\\above"], props: { numArgs: 1, argTypes: ["size"], infix: true }, handler(r, e) {
  var { parser: t, funcName: a, token: n } = r;
  return { type: "infix", mode: t.mode, replaceWith: "\\\\abovefrac", size: l0(e[0], "size").value, token: n };
} });
j({ type: "genfrac", names: ["\\\\abovefrac"], props: { numArgs: 3, argTypes: ["math", "size", "math"] }, handler: (r, e) => {
  var { parser: t, funcName: a } = r, n = e[0], i = l0(e[1], "infix").size;
  if (!i) throw new Error("\\\\abovefrac expected size, but got " + String(i));
  var s = e[2], l = i.number > 0;
  return { type: "genfrac", mode: t.mode, numer: n, denom: s, continued: false, hasBarLine: l, barSize: i, leftDelim: null, rightDelim: null };
} });
var bs = (r, e) => {
  var t = e.style, a, n;
  r.type === "supsub" ? (a = r.sup ? d0(r.sup, e.havingStyle(t.sup()), e) : d0(r.sub, e.havingStyle(t.sub()), e), n = l0(r.base, "horizBrace")) : n = l0(r, "horizBrace");
  var i = d0(n.base, e.havingBaseStyle(i0.DISPLAY)), s = Kr(n, e), l;
  if (n.isOver ? l = c0({ positionType: "firstBaseline", children: [{ type: "elem", elem: i }, { type: "kern", size: 0.1 }, { type: "elem", elem: s, wrapperClasses: ["svg-align"] }] }) : l = c0({ positionType: "bottom", positionData: i.depth + 0.1 + s.height, children: [{ type: "elem", elem: s, wrapperClasses: ["svg-align"] }, { type: "kern", size: 0.1 }, { type: "elem", elem: i }] }), a) {
    var h = F(["minner", n.isOver ? "mover" : "munder"], [l], e);
    n.isOver ? l = c0({ positionType: "firstBaseline", children: [{ type: "elem", elem: h }, { type: "kern", size: 0.2 }, { type: "elem", elem: a }] }) : l = c0({ positionType: "bottom", positionData: h.depth + 0.2 + a.height + a.depth, children: [{ type: "elem", elem: a }, { type: "kern", size: 0.2 }, { type: "elem", elem: h }] });
  }
  return F(["minner", n.isOver ? "mover" : "munder"], [l], e);
}, m3 = (r, e) => {
  var t = Zr(r.label);
  return new L(r.isOver ? "mover" : "munder", [p0(r.base, e), t]);
};
j({ type: "horizBrace", names: ["\\overbrace", "\\underbrace", "\\overbracket", "\\underbracket"], props: { numArgs: 1 }, handler(r, e) {
  var { parser: t, funcName: a } = r;
  return { type: "horizBrace", mode: t.mode, label: a, isOver: a.includes("\\over"), base: e[0] };
}, htmlBuilder: bs, mathmlBuilder: m3 });
j({ type: "href", names: ["\\href"], props: { numArgs: 2, argTypes: ["url", "original"], allowedInText: true }, handler: (r, e) => {
  var { parser: t } = r, a = e[1], n = l0(e[0], "url").url;
  return t.settings.isTrusted({ command: "\\href", url: n }) ? { type: "href", mode: t.mode, href: n, body: E0(a) } : t.formatUnsupportedCmd("\\href");
}, htmlBuilder: (r, e) => {
  var t = H0(r.body, e, false);
  return z5(r.href, [], t, e);
}, mathmlBuilder: (r, e) => {
  var t = lt(r.body, e);
  return t instanceof L || (t = new L("mrow", [t])), t.setAttribute("href", r.href), t;
} });
j({ type: "href", names: ["\\url"], props: { numArgs: 1, argTypes: ["url"], allowedInText: true }, handler: (r, e) => {
  var { parser: t } = r, a = l0(e[0], "url").url;
  if (!t.settings.isTrusted({ command: "\\url", url: a })) return t.formatUnsupportedCmd("\\url");
  for (var n = [], i = 0; i < a.length; i++) {
    var s = a[i];
    s === "~" && (s = "\\textasciitilde"), n.push({ type: "textord", mode: "text", text: s });
  }
  var l = { type: "text", mode: t.mode, font: "\\texttt", body: n };
  return { type: "href", mode: t.mode, href: a, body: E0(l) };
} });
j({ type: "hbox", names: ["\\hbox"], props: { numArgs: 1, argTypes: ["text"], allowedInText: true, primitive: true }, handler(r, e) {
  var { parser: t } = r;
  return { type: "hbox", mode: t.mode, body: E0(e[0]) };
}, htmlBuilder(r, e) {
  var t = H0(r.body, e.withFont(""), false);
  return We(t);
}, mathmlBuilder(r, e) {
  return new L("mrow", me(r.body, e.withFont("")));
} });
j({ type: "html", names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"], props: { numArgs: 2, argTypes: ["raw", "original"], allowedInText: true }, handler: (r, e) => {
  var { parser: t, funcName: a, token: n } = r, i = l0(e[0], "raw").string, s = e[1];
  t.settings.strict && t.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
  var l, h = {};
  switch (a) {
    case "\\htmlClass":
      h.class = i, l = { command: "\\htmlClass", class: i };
      break;
    case "\\htmlId":
      h.id = i, l = { command: "\\htmlId", id: i };
      break;
    case "\\htmlStyle":
      h.style = i, l = { command: "\\htmlStyle", style: i };
      break;
    case "\\htmlData": {
      for (var d = i.split(","), f = 0; f < d.length; f++) {
        var y = d[f], x = y.indexOf("=");
        if (x < 0) throw new $("\\htmlData key/value '" + y + "' missing equals sign");
        var w = y.slice(0, x), B = y.slice(x + 1);
        h["data-" + w.trim()] = B;
      }
      l = { command: "\\htmlData", attributes: h };
      break;
    }
    default:
      throw new Error("Unrecognized html command");
  }
  return t.settings.isTrusted(l) ? { type: "html", mode: t.mode, attributes: h, body: E0(s) } : t.formatUnsupportedCmd(a);
}, htmlBuilder: (r, e) => {
  var t = H0(r.body, e, false), a = ["enclosing"];
  r.attributes.class && a.push(...r.attributes.class.trim().split(/\s+/));
  var n = F(a, t, e);
  for (var i in r.attributes) i !== "class" && r.attributes.hasOwnProperty(i) && n.setAttribute(i, r.attributes[i]);
  return n;
}, mathmlBuilder: (r, e) => lt(r.body, e) });
j({ type: "htmlmathml", names: ["\\html@mathml"], props: { numArgs: 2, allowedInArgument: true, allowedInText: true }, handler: (r, e) => {
  var { parser: t } = r;
  return { type: "htmlmathml", mode: t.mode, html: E0(e[0]), mathml: E0(e[1]) };
}, htmlBuilder: (r, e) => {
  var t = H0(r.html, e, false);
  return We(t);
}, mathmlBuilder: (r, e) => lt(r.mathml, e) });
var P1 = function(e) {
  if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e)) return { number: +e, unit: "bp" };
  var t = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e);
  if (!t) throw new $("Invalid size: '" + e + "' in \\includegraphics");
  var a = { number: +(t[1] + t[2]), unit: t[3] };
  if (!Ri(a)) throw new $("Invalid unit: '" + a.unit + "' in \\includegraphics.");
  return a;
};
j({ type: "includegraphics", names: ["\\includegraphics"], props: { numArgs: 1, numOptionalArgs: 1, argTypes: ["raw", "url"], allowedInText: false }, handler: (r, e, t) => {
  var { parser: a } = r, n = { number: 0, unit: "em" }, i = { number: 0.9, unit: "em" }, s = { number: 0, unit: "em" }, l = "";
  if (t[0]) for (var h = l0(t[0], "raw").string, d = h.split(","), f = 0; f < d.length; f++) {
    var y = d[f].split("=");
    if (y.length === 2) {
      var x = y[1].trim();
      switch (y[0].trim()) {
        case "alt":
          l = x;
          break;
        case "width":
          n = P1(x);
          break;
        case "height":
          i = P1(x);
          break;
        case "totalheight":
          s = P1(x);
          break;
        default:
          throw new $("Invalid key: '" + y[0] + "' in \\includegraphics.");
      }
    }
  }
  var w = l0(e[0], "url").url;
  return l === "" && (l = w, l = l.replace(/^.*[\\/]/, ""), l = l.substring(0, l.lastIndexOf("."))), a.settings.isTrusted({ command: "\\includegraphics", url: w }) ? { type: "includegraphics", mode: a.mode, alt: l, width: n, height: i, totalheight: s, src: w } : a.formatUnsupportedCmd("\\includegraphics");
}, htmlBuilder: (r, e) => {
  var t = M0(r.height, e), a = 0;
  r.totalheight.number > 0 && (a = M0(r.totalheight, e) - t);
  var n = 0;
  r.width.number > 0 && (n = M0(r.width, e));
  var i = { height: U(t + a) };
  n > 0 && (i.width = U(n)), a > 0 && (i.verticalAlign = U(-a));
  var s = new d5(r.src, r.alt, i);
  return s.height = t, s.depth = a, s;
}, mathmlBuilder: (r, e) => {
  var t = new L("mglyph", []);
  t.setAttribute("alt", r.alt);
  var a = M0(r.height, e), n = 0;
  if (r.totalheight.number > 0 && (n = M0(r.totalheight, e) - a, t.setAttribute("valign", U(-n))), t.setAttribute("height", U(a + n)), r.width.number > 0) {
    var i = M0(r.width, e);
    t.setAttribute("width", U(i));
  }
  return t.setAttribute("src", r.src), t;
} });
j({ type: "kern", names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"], props: { numArgs: 1, argTypes: ["size"], primitive: true, allowedInText: true }, handler(r, e) {
  var { parser: t, funcName: a } = r, n = l0(e[0], "size");
  if (t.settings.strict) {
    var i = a[1] === "m", s = n.value.unit === "mu";
    i ? (s || t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " supports only mu units, " + ("not " + n.value.unit + " units")), t.mode !== "math" && t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " works only in math mode")) : s && t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " doesn't support mu units");
  }
  return { type: "kern", mode: t.mode, dimension: n.value };
}, htmlBuilder(r, e) {
  return Pi(r.dimension, e);
}, mathmlBuilder(r, e) {
  var t = M0(r.dimension, e);
  return new Wi(t);
} });
j({ type: "lap", names: ["\\mathllap", "\\mathrlap", "\\mathclap"], props: { numArgs: 1, allowedInText: true }, handler: (r, e) => {
  var { parser: t, funcName: a } = r, n = e[0];
  return { type: "lap", mode: t.mode, alignment: a.slice(5), body: n };
}, htmlBuilder: (r, e) => {
  var t;
  r.alignment === "clap" ? (t = F([], [d0(r.body, e)]), t = F(["inner"], [t], e)) : t = F(["inner"], [d0(r.body, e)]);
  var a = F(["fix"], []), n = F([r.alignment], [t, a], e), i = F(["strut"]);
  return i.style.height = U(n.height + n.depth), n.depth && (i.style.verticalAlign = U(-n.depth)), n.children.unshift(i), n = F(["thinbox"], [n], e), F(["mord", "vbox"], [n], e);
}, mathmlBuilder: (r, e) => {
  var t = new L("mpadded", [p0(r.body, e)]);
  if (r.alignment !== "rlap") {
    var a = r.alignment === "llap" ? "-1" : "-0.5";
    t.setAttribute("lspace", a + "width");
  }
  return t.setAttribute("width", "0px"), t;
} });
j({ type: "styling", names: ["\\(", "$"], props: { numArgs: 0, allowedInText: true, allowedInMath: false }, handler(r, e) {
  var { funcName: t, parser: a } = r, n = a.mode;
  a.switchMode("math");
  var i = t === "\\(" ? "\\)" : "$", s = a.parseExpression(false, i);
  return a.expect(i), a.switchMode(n), { type: "styling", mode: a.mode, style: "text", resetFont: true, body: s };
} });
j({ type: "text", names: ["\\)", "\\]"], props: { numArgs: 0, allowedInText: true, allowedInMath: false }, handler(r, e) {
  throw new $("Mismatched " + r.funcName);
} });
var bn = (r, e) => {
  switch (e.style.size) {
    case i0.DISPLAY.size:
      return r.display;
    case i0.TEXT.size:
      return r.text;
    case i0.SCRIPT.size:
      return r.script;
    case i0.SCRIPTSCRIPT.size:
      return r.scriptscript;
    default:
      return r.text;
  }
};
j({ type: "mathchoice", names: ["\\mathchoice"], props: { numArgs: 4, primitive: true }, handler: (r, e) => {
  var { parser: t } = r;
  return { type: "mathchoice", mode: t.mode, display: E0(e[0]), text: E0(e[1]), script: E0(e[2]), scriptscript: E0(e[3]) };
}, htmlBuilder: (r, e) => {
  var t = bn(r, e), a = H0(t, e, false);
  return We(a);
}, mathmlBuilder: (r, e) => {
  var t = bn(r, e);
  return lt(t, e);
} });
var ys = (r, e, t, a, n, i, s) => {
  r = F([], [r]);
  var l = t && Xe(t), h, d;
  if (e) {
    var f = d0(e, a.havingStyle(n.sup()), a);
    d = { elem: f, kern: Math.max(a.fontMetrics().bigOpSpacing1, a.fontMetrics().bigOpSpacing3 - f.depth) };
  }
  if (t) {
    var y = d0(t, a.havingStyle(n.sub()), a);
    h = { elem: y, kern: Math.max(a.fontMetrics().bigOpSpacing2, a.fontMetrics().bigOpSpacing4 - y.height) };
  }
  var x;
  if (d && h) {
    var w = a.fontMetrics().bigOpSpacing5 + h.elem.height + h.elem.depth + h.kern + r.depth + s;
    x = c0({ positionType: "bottom", positionData: w, children: [{ type: "kern", size: a.fontMetrics().bigOpSpacing5 }, { type: "elem", elem: h.elem, marginLeft: U(-i) }, { type: "kern", size: h.kern }, { type: "elem", elem: r }, { type: "kern", size: d.kern }, { type: "elem", elem: d.elem, marginLeft: U(i) }, { type: "kern", size: a.fontMetrics().bigOpSpacing5 }] });
  } else if (h) {
    var B = r.height - s;
    x = c0({ positionType: "top", positionData: B, children: [{ type: "kern", size: a.fontMetrics().bigOpSpacing5 }, { type: "elem", elem: h.elem, marginLeft: U(-i) }, { type: "kern", size: h.kern }, { type: "elem", elem: r }] });
  } else if (d) {
    var C = r.depth + s;
    x = c0({ positionType: "bottom", positionData: C, children: [{ type: "elem", elem: r }, { type: "kern", size: d.kern }, { type: "elem", elem: d.elem, marginLeft: U(i) }, { type: "kern", size: a.fontMetrics().bigOpSpacing5 }] });
  } else return r;
  var D = [x];
  if (h && i !== 0 && !l) {
    var q = F(["mspace"], [], a);
    q.style.marginRight = U(i), D.unshift(q);
  }
  return F(["mop", "op-limits"], D, a);
}, xs = /* @__PURE__ */ new Set(["\\smallint"]), Ot = (r, e) => {
  var t, a, n = false, i;
  r.type === "supsub" ? (t = r.sup, a = r.sub, i = l0(r.base, "op"), n = true) : i = l0(r, "op");
  var s = e.style, l = false;
  s.size === i0.DISPLAY.size && i.symbol && !xs.has(i.name) && (l = true);
  var h, d;
  if (i.symbol) {
    var f = l ? "Size2-Regular" : "Size1-Regular", y = "";
    if ((i.name === "\\oiint" || i.name === "\\oiiint") && (y = i.name.slice(1), i.name = y === "oiint" ? "\\iint" : "\\iiint"), h = Z0(i.name, f, "math", e, ["mop", "op-symbol", l ? "large-op" : "small-op"]), d = h.italic, y.length > 0) {
      var x = Ui(y + "Size" + (l ? "2" : "1"), e);
      h = c0({ positionType: "individualShift", children: [{ type: "elem", elem: h, shift: 0 }, { type: "elem", elem: x, shift: l ? 0.08 : 0 }] }), i.name = "\\" + y, h.classes.unshift("mop"), h.italic = d;
    }
  } else if (i.body) {
    var w = H0(i.body, e, true);
    w.length === 1 && w[0] instanceof le ? (h = w[0], h.classes[0] = "mop") : h = F(["mop"], w, e);
  } else {
    for (var B = [], C = 1; C < i.name.length; C++) B.push(Wa(i.name[C], i.mode, e));
    h = F(["mop"], B, e);
  }
  var D = 0, q = 0;
  if ((h instanceof le || i.name === "\\oiint" || i.name === "\\oiiint") && !i.suppressBaseShift) {
    var E;
    D = (h.height - h.depth) / 2 - e.fontMetrics().axisHeight, q = (E = h.italic) != null ? E : 0;
  }
  return n ? ys(h, t, a, e, s, q, D) : (D && (h.style.position = "relative", h.style.top = U(D)), h);
}, sr = (r, e) => {
  var t;
  if (r.symbol) t = new L("mo", [pe(r.name, r.mode)]), xs.has(r.name) && t.setAttribute("largeop", "false");
  else if (r.body) t = new L("mo", me(r.body, e));
  else {
    t = new L("mi", [new N0(r.name.slice(1))]);
    var a = new L("mo", [pe("\u2061", "text")]);
    r.parentIsSupSub ? t = new L("mrow", [t, a]) : t = Yi([t, a]);
  }
  return t;
}, c3 = { "\u220F": "\\prod", "\u2210": "\\coprod", "\u2211": "\\sum", "\u22C0": "\\bigwedge", "\u22C1": "\\bigvee", "\u22C2": "\\bigcap", "\u22C3": "\\bigcup", "\u2A00": "\\bigodot", "\u2A01": "\\bigoplus", "\u2A02": "\\bigotimes", "\u2A04": "\\biguplus", "\u2A06": "\\bigsqcup" };
j({ type: "op", names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "\u220F", "\u2210", "\u2211", "\u22C0", "\u22C1", "\u22C2", "\u22C3", "\u2A00", "\u2A01", "\u2A02", "\u2A04", "\u2A06"], props: { numArgs: 0 }, handler: (r, e) => {
  var { parser: t, funcName: a } = r, n = a;
  return n.length === 1 && (n = c3[n]), { type: "op", mode: t.mode, limits: true, parentIsSupSub: false, symbol: true, name: n };
}, htmlBuilder: Ot, mathmlBuilder: sr });
j({ type: "op", names: ["\\mathop"], props: { numArgs: 1, primitive: true }, handler: (r, e) => {
  var { parser: t } = r, a = e[0];
  return { type: "op", mode: t.mode, limits: false, parentIsSupSub: false, symbol: false, body: E0(a) };
}, htmlBuilder: Ot, mathmlBuilder: sr });
var d3 = { "\u222B": "\\int", "\u222C": "\\iint", "\u222D": "\\iiint", "\u222E": "\\oint", "\u222F": "\\oiint", "\u2230": "\\oiiint" };
j({ type: "op", names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"], props: { numArgs: 0 }, handler(r) {
  var { parser: e, funcName: t } = r;
  return { type: "op", mode: e.mode, limits: false, parentIsSupSub: false, symbol: false, name: t };
}, htmlBuilder: Ot, mathmlBuilder: sr });
j({ type: "op", names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"], props: { numArgs: 0 }, handler(r) {
  var { parser: e, funcName: t } = r;
  return { type: "op", mode: e.mode, limits: true, parentIsSupSub: false, symbol: false, name: t };
}, htmlBuilder: Ot, mathmlBuilder: sr });
j({ type: "op", names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "\u222B", "\u222C", "\u222D", "\u222E", "\u222F", "\u2230"], props: { numArgs: 0, allowedInArgument: true }, handler(r) {
  var { parser: e, funcName: t } = r, a = t;
  return a.length === 1 && (a = d3[a]), { type: "op", mode: e.mode, limits: false, parentIsSupSub: false, symbol: true, name: a };
}, htmlBuilder: Ot, mathmlBuilder: sr });
var ws = (r, e) => {
  var t, a, n = false, i;
  r.type === "supsub" ? (t = r.sup, a = r.sub, i = l0(r.base, "operatorname"), n = true) : i = l0(r, "operatorname");
  var s;
  if (i.body.length > 0) {
    for (var l = i.body.map((y) => {
      var x = "text" in y ? y.text : void 0;
      return typeof x == "string" ? { type: "textord", mode: y.mode, text: x } : y;
    }), h = H0(l, e.withFont("mathrm"), true), d = 0; d < h.length; d++) {
      var f = h[d];
      f instanceof le && (f.text = f.text.replace(/\u2212/, "-").replace(/\u2217/, "*"));
    }
    s = F(["mop"], h, e);
  } else s = F(["mop"], [], e);
  return n ? ys(s, t, a, e, e.style, 0, 0) : s;
}, f3 = (r, e) => {
  for (var t = me(r.body, e.withFont("mathrm")), a = true, n = 0; n < t.length; n++) {
    var i = t[n];
    if (!(i instanceof Wi)) if (i instanceof L) switch (i.type) {
      case "mi":
      case "mn":
      case "mspace":
      case "mtext":
        break;
      case "mo": {
        var s = i.children[0];
        i.children.length === 1 && s instanceof N0 ? s.text = s.text.replace(/\u2212/, "-").replace(/\u2217/, "*") : a = false;
        break;
      }
      default:
        a = false;
    }
    else a = false;
  }
  if (a) {
    var l = t.map((f) => f.toText()).join("");
    t = [new N0(l)];
  }
  var h = new L("mi", t);
  h.setAttribute("mathvariant", "normal");
  var d = new L("mo", [pe("\u2061", "text")]);
  return r.parentIsSupSub ? new L("mrow", [h, d]) : Yi([h, d]);
};
j({ type: "operatorname", names: ["\\operatorname@", "\\operatornamewithlimits"], props: { numArgs: 1 }, handler: (r, e) => {
  var { parser: t, funcName: a } = r, n = e[0];
  return { type: "operatorname", mode: t.mode, body: E0(n), alwaysHandleSupSub: a === "\\operatornamewithlimits", limits: false, parentIsSupSub: false };
}, htmlBuilder: ws, mathmlBuilder: f3 });
b("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
xt({ type: "ordgroup", htmlBuilder(r, e) {
  return r.semisimple ? We(H0(r.body, e, false)) : F(["mord"], H0(r.body, e, true), e);
}, mathmlBuilder(r, e) {
  return lt(r.body, e, true);
} });
j({ type: "overline", names: ["\\overline"], props: { numArgs: 1 }, handler(r, e) {
  var { parser: t } = r, a = e[0];
  return { type: "overline", mode: t.mode, body: a };
}, htmlBuilder(r, e) {
  var t = d0(r.body, e.havingCrampedStyle()), a = Ct("overline-line", e), n = e.fontMetrics().defaultRuleThickness, i = c0({ positionType: "firstBaseline", children: [{ type: "elem", elem: t }, { type: "kern", size: 3 * n }, { type: "elem", elem: a }, { type: "kern", size: n }] });
  return F(["mord", "overline"], [i], e);
}, mathmlBuilder(r, e) {
  var t = new L("mo", [new N0("\u203E")]);
  t.setAttribute("stretchy", "true");
  var a = new L("mover", [p0(r.body, e), t]);
  return a.setAttribute("accent", "true"), a;
} });
j({ type: "phantom", names: ["\\phantom"], props: { numArgs: 1, allowedInText: true }, handler: (r, e) => {
  var { parser: t } = r, a = e[0];
  return { type: "phantom", mode: t.mode, body: E0(a) };
}, htmlBuilder: (r, e) => {
  var t = H0(r.body, e.withPhantom(), false);
  return We(t);
}, mathmlBuilder: (r, e) => {
  var t = me(r.body, e);
  return new L("mphantom", t);
} });
b("\\hphantom", "\\smash{\\phantom{#1}}");
j({ type: "vphantom", names: ["\\vphantom"], props: { numArgs: 1, allowedInText: true }, handler: (r, e) => {
  var { parser: t } = r, a = e[0];
  return { type: "vphantom", mode: t.mode, body: a };
}, htmlBuilder: (r, e) => {
  var t = F(["inner"], [d0(r.body, e.withPhantom())]), a = F(["fix"], []);
  return F(["mord", "rlap"], [t, a], e);
}, mathmlBuilder: (r, e) => {
  var t = me(E0(r.body), e), a = new L("mphantom", t), n = new L("mpadded", [a]);
  return n.setAttribute("width", "0px"), n;
} });
j({ type: "raisebox", names: ["\\raisebox"], props: { numArgs: 2, argTypes: ["size", "hbox"], allowedInText: true }, handler(r, e) {
  var { parser: t } = r, a = l0(e[0], "size").value, n = e[1];
  return { type: "raisebox", mode: t.mode, dy: a, body: n };
}, htmlBuilder(r, e) {
  var t = d0(r.body, e), a = M0(r.dy, e);
  return c0({ positionType: "shift", positionData: -a, children: [{ type: "elem", elem: t }] });
}, mathmlBuilder(r, e) {
  var t = new L("mpadded", [p0(r.body, e)]), a = r.dy.number + r.dy.unit;
  return t.setAttribute("voffset", a), t;
} });
j({ type: "internal", names: ["\\relax"], props: { numArgs: 0, allowedInText: true, allowedInArgument: true }, handler(r) {
  var { parser: e } = r;
  return { type: "internal", mode: e.mode };
} });
j({ type: "rule", names: ["\\rule"], props: { numArgs: 2, numOptionalArgs: 1, allowedInText: true, allowedInMath: true, argTypes: ["size", "size", "size"] }, handler(r, e, t) {
  var { parser: a } = r, n = t[0], i = l0(e[0], "size"), s = l0(e[1], "size");
  return { type: "rule", mode: a.mode, shift: n && l0(n, "size").value, width: i.value, height: s.value };
}, htmlBuilder(r, e) {
  var t = F(["mord", "rule"], [], e), a = M0(r.width, e), n = M0(r.height, e), i = r.shift ? M0(r.shift, e) : 0;
  return t.style.borderRightWidth = U(a), t.style.borderTopWidth = U(n), t.style.bottom = U(i), t.width = a, t.height = n + i, t.depth = -i, t.maxFontSize = n * 1.125 * e.sizeMultiplier, t;
}, mathmlBuilder(r, e) {
  var t = M0(r.width, e), a = M0(r.height, e), n = r.shift ? M0(r.shift, e) : 0, i = e.color && e.getColor() || "black", s = new L("mspace");
  s.setAttribute("mathbackground", i), s.setAttribute("width", U(t)), s.setAttribute("height", U(a));
  var l = new L("mpadded", [s]);
  return n >= 0 ? l.setAttribute("height", U(n)) : (l.setAttribute("height", U(n)), l.setAttribute("depth", U(-n))), l.setAttribute("voffset", U(n)), l;
} });
function ks(r, e, t) {
  for (var a = H0(r, e, false), n = e.sizeMultiplier / t.sizeMultiplier, i = 0; i < a.length; i++) {
    var s = a[i].classes.indexOf("sizing");
    s < 0 ? Array.prototype.push.apply(a[i].classes, e.sizingClasses(t)) : a[i].classes[s + 1] === "reset-size" + e.size && (a[i].classes[s + 1] = "reset-size" + t.size), a[i].height *= n, a[i].depth *= n;
  }
  return We(a);
}
var yn = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"], v3 = (r, e) => {
  var t = e.havingSize(r.size);
  return ks(r.body, t, e);
};
j({ type: "sizing", names: yn, props: { numArgs: 0, allowedInText: true }, handler: (r, e) => {
  var { breakOnTokenText: t, funcName: a, parser: n } = r, i = n.parseExpression(false, t);
  return { type: "sizing", mode: n.mode, size: yn.indexOf(a) + 1, body: i };
}, htmlBuilder: v3, mathmlBuilder: (r, e) => {
  var t = e.havingSize(r.size), a = me(r.body, t), n = new L("mstyle", a);
  return n.setAttribute("mathsize", U(t.sizeMultiplier)), n;
} });
j({ type: "smash", names: ["\\smash"], props: { numArgs: 1, numOptionalArgs: 1, allowedInText: true }, handler: (r, e, t) => {
  var { parser: a } = r, n = false, i = false, s = t[0] && l0(t[0], "ordgroup");
  if (s) for (var l, h = 0; h < s.body.length; ++h) {
    var d = s.body[h];
    if (l = Jr(d).text, l === "t") n = true;
    else if (l === "b") i = true;
    else {
      n = false, i = false;
      break;
    }
  }
  else n = true, i = true;
  var f = e[0];
  return { type: "smash", mode: a.mode, body: f, smashHeight: n, smashDepth: i };
}, htmlBuilder: (r, e) => {
  var t = F([], [d0(r.body, e)]);
  if (!r.smashHeight && !r.smashDepth) return t;
  if (r.smashHeight && (t.height = 0), r.smashDepth && (t.depth = 0), r.smashHeight && r.smashDepth) return F(["mord", "smash"], [t], e);
  if (t.children) for (var a = 0; a < t.children.length; a++) r.smashHeight && (t.children[a].height = 0), r.smashDepth && (t.children[a].depth = 0);
  var n = c0({ positionType: "firstBaseline", children: [{ type: "elem", elem: t }] });
  return F(["mord"], [n], e);
}, mathmlBuilder: (r, e) => {
  var t = new L("mpadded", [p0(r.body, e)]);
  return r.smashHeight && t.setAttribute("height", "0px"), r.smashDepth && t.setAttribute("depth", "0px"), t;
} });
j({ type: "sqrt", names: ["\\sqrt"], props: { numArgs: 1, numOptionalArgs: 1 }, handler(r, e, t) {
  var { parser: a } = r, n = t[0], i = e[0];
  return { type: "sqrt", mode: a.mode, body: i, index: n };
}, htmlBuilder(r, e) {
  var t = d0(r.body, e.havingCrampedStyle());
  t.height === 0 && (t.height = e.fontMetrics().xHeight), t = Dt(t, e);
  var a = e.fontMetrics(), n = a.defaultRuleThickness, i = n;
  e.style.id < i0.TEXT.id && (i = e.fontMetrics().xHeight);
  var s = n + i / 4, l = t.height + t.depth + s + n, { span: h, ruleWidth: d, advanceWidth: f } = t3(l, e), y = h.height - d;
  y > t.height + t.depth + s && (s = (s + y - t.height - t.depth) / 2);
  var x = h.height - t.height - s - d;
  t.style.paddingLeft = U(f);
  var w = c0({ positionType: "firstBaseline", children: [{ type: "elem", elem: t, wrapperClasses: ["svg-align"] }, { type: "kern", size: -(t.height + x) }, { type: "elem", elem: h }, { type: "kern", size: d }] });
  if (r.index) {
    var B = e.havingStyle(i0.SCRIPTSCRIPT), C = d0(r.index, B, e), D = 0.6 * (w.height - w.depth), q = c0({ positionType: "shift", positionData: -D, children: [{ type: "elem", elem: C }] }), E = F(["root"], [q]);
    return F(["mord", "sqrt"], [E, w], e);
  } else return F(["mord", "sqrt"], [w], e);
}, mathmlBuilder(r, e) {
  var { body: t, index: a } = r;
  return a ? new L("mroot", [p0(t, e), p0(a, e)]) : new L("msqrt", [p0(t, e)]);
} });
var Aa = { display: i0.DISPLAY, text: i0.TEXT, script: i0.SCRIPT, scriptscript: i0.SCRIPTSCRIPT };
function p3(r) {
  return r in Aa;
}
j({ type: "styling", names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"], props: { numArgs: 0, allowedInText: true, primitive: true }, handler(r, e) {
  var { breakOnTokenText: t, funcName: a, parser: n } = r, i = n.parseExpression(true, t), s = a.slice(1, a.length - 5);
  if (!p3(s)) throw new Error("Unknown style: " + s);
  return { type: "styling", mode: n.mode, style: s, body: i };
}, htmlBuilder(r, e) {
  var t = Aa[r.style], a = e.havingStyle(t);
  return r.resetFont && (a = a.withFont("")), ks(r.body, a, e);
}, mathmlBuilder(r, e) {
  var t = Aa[r.style], a = e.havingStyle(t);
  r.resetFont && (a = a.withFont(""));
  var n = me(r.body, a), i = new L("mstyle", n), s = { display: ["0", "true"], text: ["0", "false"], script: ["1", "false"], scriptscript: ["2", "false"] }, l = s[r.style];
  return i.setAttribute("scriptlevel", l[0]), i.setAttribute("displaystyle", l[1]), i;
} });
var g3 = function(e, t) {
  var a = e.base;
  if (a) if (a.type === "op") {
    var n = a.limits && (t.style.size === i0.DISPLAY.size || a.alwaysHandleSupSub);
    return n ? Ot : null;
  } else if (a.type === "operatorname") {
    var i = a.alwaysHandleSupSub && (t.style.size === i0.DISPLAY.size || a.limits);
    return i ? ws : null;
  } else {
    if (a.type === "accent") return Xe(a.base) ? Ja : null;
    if (a.type === "horizBrace") {
      var s = !e.sub;
      return s === a.isOver ? bs : null;
    } else return null;
  }
  else return null;
};
xt({ type: "supsub", htmlBuilder(r, e) {
  var t = g3(r, e);
  if (t) return t(r, e);
  var { base: a, sup: n, sub: i } = r, s = d0(a, e), l, h, d = e.fontMetrics(), f = 0, y = 0, x = a && Xe(a);
  if (n) {
    var w = e.havingStyle(e.style.sup());
    l = d0(n, w, e), x || (f = s.height - w.fontMetrics().supDrop * w.sizeMultiplier / e.sizeMultiplier);
  }
  if (i) {
    var B = e.havingStyle(e.style.sub());
    h = d0(i, B, e), x || (y = s.depth + B.fontMetrics().subDrop * B.sizeMultiplier / e.sizeMultiplier);
  }
  var C;
  e.style === i0.DISPLAY ? C = d.sup1 : e.style.cramped ? C = d.sup3 : C = d.sup2;
  var D = e.sizeMultiplier, q = U(0.5 / d.ptPerEm / D), E = null;
  if (h) {
    var P = r.base && r.base.type === "op" && r.base.name && (r.base.name === "\\oiint" || r.base.name === "\\oiiint");
    if (s instanceof le || P) {
      var V;
      E = U(-((V = s.italic) != null ? V : 0));
    }
  }
  var X;
  if (l && h) {
    f = Math.max(f, C, l.depth + 0.25 * d.xHeight), y = Math.max(y, d.sub2);
    var Y = d.defaultRuleThickness, J = 4 * Y;
    if (f - l.depth - (h.height - y) < J) {
      y = J - (f - l.depth) + h.height;
      var Q = 0.8 * d.xHeight - (f - l.depth);
      Q > 0 && (f += Q, y -= Q);
    }
    var _ = [{ type: "elem", elem: h, shift: y, marginRight: q, marginLeft: E }, { type: "elem", elem: l, shift: -f, marginRight: q }];
    X = c0({ positionType: "individualShift", children: _ });
  } else if (h) {
    y = Math.max(y, d.sub1, h.height - 0.8 * d.xHeight);
    var u0 = [{ type: "elem", elem: h, marginLeft: E, marginRight: q }];
    X = c0({ positionType: "shift", positionData: y, children: u0 });
  } else if (l) f = Math.max(f, C, l.depth + 0.25 * d.xHeight), X = c0({ positionType: "shift", positionData: -f, children: [{ type: "elem", elem: l, marginRight: q }] });
  else throw new Error("supsub must have either sup or sub.");
  var v0 = xa(s, "right") || "mord";
  return F([v0], [s, F(["msupsub"], [X])], e);
}, mathmlBuilder(r, e) {
  var t = false, a, n;
  r.base && r.base.type === "horizBrace" && (n = !!r.sup, n === r.base.isOver && (t = true, a = r.base.isOver)), r.base && (r.base.type === "op" || r.base.type === "operatorname") && (r.base.parentIsSupSub = true);
  var i = [p0(r.base, e)];
  r.sub && i.push(p0(r.sub, e)), r.sup && i.push(p0(r.sup, e));
  var s;
  if (t) s = a ? "mover" : "munder";
  else if (r.sub) if (r.sup) {
    var d = r.base;
    d && d.type === "op" && d.limits && e.style === i0.DISPLAY || d && d.type === "operatorname" && d.alwaysHandleSupSub && (e.style === i0.DISPLAY || d.limits) ? s = "munderover" : s = "msubsup";
  } else {
    var h = r.base;
    h && h.type === "op" && h.limits && (e.style === i0.DISPLAY || h.alwaysHandleSupSub) || h && h.type === "operatorname" && h.alwaysHandleSupSub && (h.limits || e.style === i0.DISPLAY) ? s = "munder" : s = "msub";
  }
  else {
    var l = r.base;
    l && l.type === "op" && l.limits && (e.style === i0.DISPLAY || l.alwaysHandleSupSub) || l && l.type === "operatorname" && l.alwaysHandleSupSub && (l.limits || e.style === i0.DISPLAY) ? s = "mover" : s = "msup";
  }
  return new L(s, i);
} });
xt({ type: "atom", htmlBuilder(r, e) {
  return Wa(r.text, r.mode, e, ["m" + r.family]);
}, mathmlBuilder(r, e) {
  var t = new L("mo", [pe(r.text, r.mode)]);
  if (r.family === "bin") {
    var a = Ka(r, e);
    a === "bold-italic" && t.setAttribute("mathvariant", a);
  } else r.family === "punct" ? t.setAttribute("separator", "true") : (r.family === "open" || r.family === "close") && t.setAttribute("stretchy", "false");
  return t;
} });
var Ss = { mi: "italic", mn: "normal", mtext: "normal" };
xt({ type: "mathord", htmlBuilder(r, e) {
  return jr(r, e, "mathord");
}, mathmlBuilder(r, e) {
  var t = new L("mi", [pe(r.text, r.mode, e)]), a = Ka(r, e) || "italic";
  return a !== Ss[t.type] && t.setAttribute("mathvariant", a), t;
} });
xt({ type: "textord", htmlBuilder(r, e) {
  return jr(r, e, "textord");
}, mathmlBuilder(r, e) {
  var t = pe(r.text, r.mode, e), a = Ka(r, e) || "normal", n;
  return r.mode === "text" ? n = new L("mtext", [t]) : /[0-9]/.test(r.text) ? n = new L("mn", [t]) : r.text === "\\prime" ? n = new L("mo", [t]) : n = new L("mi", [t]), a !== Ss[n.type] && n.setAttribute("mathvariant", a), n;
} });
var G1 = { "\\nobreak": "nobreak", "\\allowbreak": "allowbreak" }, U1 = { " ": {}, "\\ ": {}, "~": { className: "nobreak" }, "\\space": {}, "\\nobreakspace": { className: "nobreak" } };
xt({ type: "spacing", htmlBuilder(r, e) {
  if (U1.hasOwnProperty(r.text)) {
    var t = U1[r.text].className || "";
    if (r.mode === "text") {
      var a = jr(r, e, "textord");
      return a.classes.push(t), a;
    } else return F(["mspace", t], [Wa(r.text, r.mode, e)], e);
  } else {
    if (G1.hasOwnProperty(r.text)) return F(["mspace", G1[r.text]], [], e);
    throw new $('Unknown type of space "' + r.text + '"');
  }
}, mathmlBuilder(r, e) {
  var t;
  if (U1.hasOwnProperty(r.text)) t = new L("mtext", [new N0("\xA0")]);
  else {
    if (G1.hasOwnProperty(r.text)) return new L("mspace");
    throw new $('Unknown type of space "' + r.text + '"');
  }
  return t;
} });
var xn = () => {
  var r = new L("mtd", []);
  return r.setAttribute("width", "50%"), r;
};
xt({ type: "tag", mathmlBuilder(r, e) {
  var t = new L("mtable", [new L("mtr", [xn(), new L("mtd", [lt(r.body, e)]), xn(), new L("mtd", [lt(r.tag, e)])])]);
  return t.setAttribute("width", "100%"), t;
} });
var wn = { "\\text": void 0, "\\textrm": "textrm", "\\textsf": "textsf", "\\texttt": "texttt", "\\textnormal": "textrm" }, kn = { "\\textbf": "textbf", "\\textmd": "textmd" }, b3 = { "\\textit": "textit", "\\textup": "textup" }, Sn = (r, e) => {
  var t = r.font;
  if (t) {
    if (wn[t]) return e.withTextFontFamily(wn[t]);
    if (kn[t]) return e.withTextFontWeight(kn[t]);
    if (t === "\\emph") return e.fontShape === "textit" ? e.withTextFontShape("textup") : e.withTextFontShape("textit");
  } else return e;
  return e.withTextFontShape(b3[t]);
};
j({ type: "text", names: ["\\text", "\\textrm", "\\textsf", "\\texttt", "\\textnormal", "\\textbf", "\\textmd", "\\textit", "\\textup", "\\emph"], props: { numArgs: 1, argTypes: ["text"], allowedInArgument: true, allowedInText: true }, handler(r, e) {
  var { parser: t, funcName: a } = r, n = e[0];
  return { type: "text", mode: t.mode, body: E0(n), font: a };
}, htmlBuilder(r, e) {
  var t = Sn(r, e), a = H0(r.body, t, true);
  return F(["mord", "text"], a, t);
}, mathmlBuilder(r, e) {
  var t = Sn(r, e);
  return lt(r.body, t);
} });
j({ type: "underline", names: ["\\underline"], props: { numArgs: 1, allowedInText: true }, handler(r, e) {
  var { parser: t } = r;
  return { type: "underline", mode: t.mode, body: e[0] };
}, htmlBuilder(r, e) {
  var t = d0(r.body, e), a = Ct("underline-line", e), n = e.fontMetrics().defaultRuleThickness, i = c0({ positionType: "top", positionData: t.height, children: [{ type: "kern", size: n }, { type: "elem", elem: a }, { type: "kern", size: 3 * n }, { type: "elem", elem: t }] });
  return F(["mord", "underline"], [i], e);
}, mathmlBuilder(r, e) {
  var t = new L("mo", [new N0("\u203E")]);
  t.setAttribute("stretchy", "true");
  var a = new L("munder", [p0(r.body, e), t]);
  return a.setAttribute("accentunder", "true"), a;
} });
j({ type: "vcenter", names: ["\\vcenter"], props: { numArgs: 1, argTypes: ["original"], allowedInText: false }, handler(r, e) {
  var { parser: t } = r;
  return { type: "vcenter", mode: t.mode, body: e[0] };
}, htmlBuilder(r, e) {
  var t = d0(r.body, e), a = e.fontMetrics().axisHeight, n = 0.5 * (t.height - a - (t.depth + a));
  return c0({ positionType: "shift", positionData: n, children: [{ type: "elem", elem: t }] });
}, mathmlBuilder(r, e) {
  var t = new L("mpadded", [p0(r.body, e)], ["vcenter"]);
  return new L("mrow", [t]);
} });
j({ type: "verb", names: ["\\verb"], props: { numArgs: 0, allowedInText: true }, handler(r, e, t) {
  throw new $("\\verb ended by end of line instead of matching delimiter");
}, htmlBuilder(r, e) {
  for (var t = zn(r), a = [], n = e.havingStyle(e.style.text()), i = 0; i < t.length; i++) {
    var s = t[i];
    s === "~" && (s = "\\textasciitilde"), a.push(Z0(s, "Typewriter-Regular", r.mode, n, ["mord", "texttt"]));
  }
  return F(["mord", "text"].concat(n.sizingClasses(e)), Li(a), n);
}, mathmlBuilder(r, e) {
  var t = new N0(zn(r)), a = new L("mtext", [t]);
  return a.setAttribute("mathvariant", "monospace"), a;
} });
var zn = (r) => r.body.replace(/ /g, r.star ? "\u2423" : "\xA0"), _e = Vi, zs = `[ \r
	]`, y3 = "\\\\[a-zA-Z@]+", x3 = "\\\\[^\uD800-\uDFFF]", w3 = "(" + y3 + ")" + zs + "*", k3 = `\\\\(
|[ \r	]+
?)[ \r	]*`, Ma = "[\u0300-\u036F]", S3 = new RegExp(Ma + "+$"), z3 = "(" + zs + "+)|" + (k3 + "|") + "([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]" + (Ma + "*") + "|[\uD800-\uDBFF][\uDC00-\uDFFF]" + (Ma + "*") + "|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" + ("|" + w3) + ("|" + x3 + ")");
class An {
  constructor(e, t) {
    this.input = void 0, this.settings = void 0, this.tokenRegex = void 0, this.catcodes = void 0, this.input = e, this.settings = t, this.tokenRegex = new RegExp(z3, "g"), this.catcodes = { "%": 14, "~": 13 };
  }
  setCatcode(e, t) {
    this.catcodes[e] = t;
  }
  lex() {
    var e = this.input, t = this.tokenRegex.lastIndex;
    if (t === e.length) return new ie("EOF", new ee(this, t, t));
    var a = this.tokenRegex.exec(e);
    if (a === null || a.index !== t) throw new $("Unexpected character: '" + e[t] + "'", new ie(e[t], new ee(this, t, t + 1)));
    var n = a[6] || a[3] || (a[2] ? "\\ " : " ");
    if (this.catcodes[n] === 14) {
      var i = e.indexOf(`
`, this.tokenRegex.lastIndex);
      return i === -1 ? (this.tokenRegex.lastIndex = e.length, this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")) : this.tokenRegex.lastIndex = i + 1, this.lex();
    }
    return new ie(n, new ee(this, t, this.tokenRegex.lastIndex));
  }
}
class A3 {
  constructor(e, t) {
    e === void 0 && (e = {}), t === void 0 && (t = {}), this.current = void 0, this.builtins = void 0, this.undefStack = void 0, this.current = t, this.builtins = e, this.undefStack = [];
  }
  beginGroup() {
    this.undefStack.push({});
  }
  endGroup() {
    if (this.undefStack.length === 0) throw new $("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
    var e = this.undefStack.pop();
    for (var t in e) e.hasOwnProperty(t) && (e[t] == null ? delete this.current[t] : this.current[t] = e[t]);
  }
  endGroups() {
    for (; this.undefStack.length > 0; ) this.endGroup();
  }
  has(e) {
    return this.current.hasOwnProperty(e) || this.builtins.hasOwnProperty(e);
  }
  get(e) {
    return this.current.hasOwnProperty(e) ? this.current[e] : this.builtins[e];
  }
  set(e, t, a) {
    if (a === void 0 && (a = false), a) {
      for (var n = 0; n < this.undefStack.length; n++) delete this.undefStack[n][e];
      this.undefStack.length > 0 && (this.undefStack[this.undefStack.length - 1][e] = t);
    } else {
      var i = this.undefStack[this.undefStack.length - 1];
      i && !i.hasOwnProperty(e) && (i[e] = this.current[e]);
    }
    t == null ? delete this.current[e] : this.current[e] = t;
  }
}
var M3 = ds;
b("\\noexpand", function(r) {
  var e = r.popToken();
  return r.isExpandable(e.text) && (e.noexpand = true, e.treatAsRelax = true), { tokens: [e], numArgs: 0 };
});
b("\\expandafter", function(r) {
  var e = r.popToken();
  return r.expandOnce(true), { tokens: [e], numArgs: 0 };
});
b("\\@firstoftwo", function(r) {
  var e = r.consumeArgs(2);
  return { tokens: e[0], numArgs: 0 };
});
b("\\@secondoftwo", function(r) {
  var e = r.consumeArgs(2);
  return { tokens: e[1], numArgs: 0 };
});
b("\\@ifnextchar", function(r) {
  var e = r.consumeArgs(3);
  r.consumeSpaces();
  var t = r.future();
  return e[0].length === 1 && e[0][0].text === t.text ? { tokens: e[1], numArgs: 0 } : { tokens: e[2], numArgs: 0 };
});
b("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
b("\\TextOrMath", function(r) {
  var e = r.consumeArgs(2);
  return r.mode === "text" ? { tokens: e[0], numArgs: 0 } : { tokens: e[1], numArgs: 0 };
});
var Mn = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15 };
b("\\char", function(r) {
  var e = r.popToken(), t, a = 0;
  if (e.text === "'") t = 8, e = r.popToken();
  else if (e.text === '"') t = 16, e = r.popToken();
  else if (e.text === "`") if (e = r.popToken(), e.text[0] === "\\") a = e.text.charCodeAt(1);
  else {
    if (e.text === "EOF") throw new $("\\char` missing argument");
    a = e.text.charCodeAt(0);
  }
  else t = 10;
  if (t) {
    if (a = Mn[e.text], a == null || a >= t) throw new $("Invalid base-" + t + " digit " + e.text);
    for (var n; (n = Mn[r.future().text]) != null && n < t; ) a *= t, a += n, r.popToken();
  }
  return "\\@char{" + a + "}";
});
var t4 = (r, e, t, a) => {
  var n = r.consumeArg().tokens;
  if (n.length !== 1) throw new $("\\newcommand's first argument must be a macro name");
  var i = n[0].text, s = r.isDefined(i);
  if (s && !e) throw new $("\\newcommand{" + i + "} attempting to redefine " + (i + "; use \\renewcommand"));
  if (!s && !t) throw new $("\\renewcommand{" + i + "} when command " + i + " does not yet exist; use \\newcommand");
  var l = 0;
  if (n = r.consumeArg().tokens, n.length === 1 && n[0].text === "[") {
    for (var h = "", d = r.expandNextToken(); d.text !== "]" && d.text !== "EOF"; ) h += d.text, d = r.expandNextToken();
    if (!h.match(/^\s*[0-9]+\s*$/)) throw new $("Invalid number of arguments: " + h);
    l = parseInt(h), n = r.consumeArg().tokens;
  }
  return s && a || r.macros.set(i, { tokens: n, numArgs: l }), "";
};
b("\\newcommand", (r) => t4(r, false, true, false));
b("\\renewcommand", (r) => t4(r, true, false, false));
b("\\providecommand", (r) => t4(r, true, true, true));
b("\\message", (r) => {
  var e = r.consumeArgs(1)[0];
  return console.log(e.reverse().map((t) => t.text).join("")), "";
});
b("\\errmessage", (r) => {
  var e = r.consumeArgs(1)[0];
  return console.error(e.reverse().map((t) => t.text).join("")), "";
});
b("\\show", (r) => {
  var e = r.popToken(), t = e.text;
  return console.log(e, r.macros.get(t), _e[t], b0.math[t], b0.text[t]), "";
});
b("\\bgroup", "{");
b("\\egroup", "}");
b("~", "\\nobreakspace");
b("\\lq", "`");
b("\\rq", "'");
b("\\aa", "\\r a");
b("\\AA", "\\r A");
b("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`\xA9}");
b("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
b("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`\xAE}");
b("\u212C", "\\mathscr{B}");
b("\u2130", "\\mathscr{E}");
b("\u2131", "\\mathscr{F}");
b("\u210B", "\\mathscr{H}");
b("\u2110", "\\mathscr{I}");
b("\u2112", "\\mathscr{L}");
b("\u2133", "\\mathscr{M}");
b("\u211B", "\\mathscr{R}");
b("\u212D", "\\mathfrak{C}");
b("\u210C", "\\mathfrak{H}");
b("\u2128", "\\mathfrak{Z}");
b("\\Bbbk", "\\Bbb{k}");
b("\\llap", "\\mathllap{\\textrm{#1}}");
b("\\rlap", "\\mathrlap{\\textrm{#1}}");
b("\\clap", "\\mathclap{\\textrm{#1}}");
b("\\mathstrut", "\\vphantom{(}");
b("\\underbar", "\\underline{\\text{#1}}");
b("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}\\nobreak}{\\char"338}');
b("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`\u2260}}");
b("\\ne", "\\neq");
b("\u2260", "\\neq");
b("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`\u2209}}");
b("\u2209", "\\notin");
b("\u2258", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`\u2258}}");
b("\u2259", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`\u2258}}");
b("\u225A", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`\u225A}}");
b("\u225B", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`\u225B}}");
b("\u225D", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`\u225D}}");
b("\u225E", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`\u225E}}");
b("\u225F", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`\u225F}}");
b("\u27C2", "\\perp");
b("\u203C", "\\mathclose{!\\mkern-0.8mu!}");
b("\u220C", "\\notni");
b("\u231C", "\\ulcorner");
b("\u231D", "\\urcorner");
b("\u231E", "\\llcorner");
b("\u231F", "\\lrcorner");
b("\xA9", "\\copyright");
b("\xAE", "\\textregistered");
b("\\ulcorner", '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}');
b("\\urcorner", '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}');
b("\\llcorner", '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}');
b("\\lrcorner", '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}');
b("\\vdots", "{\\varvdots\\rule{0pt}{15pt}}");
b("\u22EE", "\\vdots");
b("\\varGamma", "\\mathit{\\Gamma}");
b("\\varDelta", "\\mathit{\\Delta}");
b("\\varTheta", "\\mathit{\\Theta}");
b("\\varLambda", "\\mathit{\\Lambda}");
b("\\varXi", "\\mathit{\\Xi}");
b("\\varPi", "\\mathit{\\Pi}");
b("\\varSigma", "\\mathit{\\Sigma}");
b("\\varUpsilon", "\\mathit{\\Upsilon}");
b("\\varPhi", "\\mathit{\\Phi}");
b("\\varPsi", "\\mathit{\\Psi}");
b("\\varOmega", "\\mathit{\\Omega}");
b("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
b("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax");
b("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
b("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
b("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
b("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
b("\\dddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ...}}{#1}}");
b("\\ddddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ....}}{#1}}");
var Tn = { ",": "\\dotsc", "\\not": "\\dotsb", "+": "\\dotsb", "=": "\\dotsb", "<": "\\dotsb", ">": "\\dotsb", "-": "\\dotsb", "*": "\\dotsb", ":": "\\dotsb", "\\DOTSB": "\\dotsb", "\\coprod": "\\dotsb", "\\bigvee": "\\dotsb", "\\bigwedge": "\\dotsb", "\\biguplus": "\\dotsb", "\\bigcap": "\\dotsb", "\\bigcup": "\\dotsb", "\\prod": "\\dotsb", "\\sum": "\\dotsb", "\\bigotimes": "\\dotsb", "\\bigoplus": "\\dotsb", "\\bigodot": "\\dotsb", "\\bigsqcup": "\\dotsb", "\\And": "\\dotsb", "\\longrightarrow": "\\dotsb", "\\Longrightarrow": "\\dotsb", "\\longleftarrow": "\\dotsb", "\\Longleftarrow": "\\dotsb", "\\longleftrightarrow": "\\dotsb", "\\Longleftrightarrow": "\\dotsb", "\\mapsto": "\\dotsb", "\\longmapsto": "\\dotsb", "\\hookrightarrow": "\\dotsb", "\\doteq": "\\dotsb", "\\mathbin": "\\dotsb", "\\mathrel": "\\dotsb", "\\relbar": "\\dotsb", "\\Relbar": "\\dotsb", "\\xrightarrow": "\\dotsb", "\\xleftarrow": "\\dotsb", "\\DOTSI": "\\dotsi", "\\int": "\\dotsi", "\\oint": "\\dotsi", "\\iint": "\\dotsi", "\\iiint": "\\dotsi", "\\iiiint": "\\dotsi", "\\idotsint": "\\dotsi", "\\DOTSX": "\\dotsx" }, T3 = /* @__PURE__ */ new Set(["bin", "rel"]);
b("\\dots", function(r) {
  var e = "\\dotso", t = r.expandAfterFuture().text;
  return t in Tn ? e = Tn[t] : (t.slice(0, 4) === "\\not" || t in b0.math && T3.has(b0.math[t].group)) && (e = "\\dotsb"), e;
});
var r4 = { ")": true, "]": true, "\\rbrack": true, "\\}": true, "\\rbrace": true, "\\rangle": true, "\\rceil": true, "\\rfloor": true, "\\rgroup": true, "\\rmoustache": true, "\\right": true, "\\bigr": true, "\\biggr": true, "\\Bigr": true, "\\Biggr": true, $: true, ";": true, ".": true, ",": true };
b("\\dotso", function(r) {
  var e = r.future().text;
  return e in r4 ? "\\ldots\\," : "\\ldots";
});
b("\\dotsc", function(r) {
  var e = r.future().text;
  return e in r4 && e !== "," ? "\\ldots\\," : "\\ldots";
});
b("\\cdots", function(r) {
  var e = r.future().text;
  return e in r4 ? "\\@cdots\\," : "\\@cdots";
});
b("\\dotsb", "\\cdots");
b("\\dotsm", "\\cdots");
b("\\dotsi", "\\!\\cdots");
b("\\dotsx", "\\ldots\\,");
b("\\DOTSI", "\\relax");
b("\\DOTSB", "\\relax");
b("\\DOTSX", "\\relax");
b("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
b("\\,", "\\tmspace+{3mu}{.1667em}");
b("\\thinspace", "\\,");
b("\\>", "\\mskip{4mu}");
b("\\:", "\\tmspace+{4mu}{.2222em}");
b("\\medspace", "\\:");
b("\\;", "\\tmspace+{5mu}{.2777em}");
b("\\thickspace", "\\;");
b("\\!", "\\tmspace-{3mu}{.1667em}");
b("\\negthinspace", "\\!");
b("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
b("\\negthickspace", "\\tmspace-{5mu}{.277em}");
b("\\enspace", "\\kern.5em ");
b("\\enskip", "\\hskip.5em\\relax");
b("\\quad", "\\hskip1em\\relax");
b("\\qquad", "\\hskip2em\\relax");
b("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
b("\\tag@paren", "\\tag@literal{({#1})}");
b("\\tag@literal", (r) => {
  if (r.macros.get("\\df@tag")) throw new $("Multiple \\tag");
  return "\\gdef\\df@tag{\\text{#1}}";
});
b("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");
b("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
b("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
b("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");
b("\\newline", "\\\\\\relax");
b("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
var As = U(ke["Main-Regular"][84][1] - 0.7 * ke["Main-Regular"][65][1]);
b("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + As + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}");
b("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + As + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}");
b("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
b("\\@hspace", "\\hskip #1\\relax");
b("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
b("\\ordinarycolon", ":");
b("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
b("\\dblcolon", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}');
b("\\coloneqq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}');
b("\\Coloneqq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}');
b("\\coloneq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}');
b("\\Coloneq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}');
b("\\eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}');
b("\\Eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}');
b("\\eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}');
b("\\Eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}');
b("\\colonapprox", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}');
b("\\Colonapprox", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}');
b("\\colonsim", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}');
b("\\Colonsim", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}');
b("\u2237", "\\dblcolon");
b("\u2239", "\\eqcolon");
b("\u2254", "\\coloneqq");
b("\u2255", "\\eqqcolon");
b("\u2A74", "\\Coloneqq");
b("\\ratio", "\\vcentcolon");
b("\\coloncolon", "\\dblcolon");
b("\\colonequals", "\\coloneqq");
b("\\coloncolonequals", "\\Coloneqq");
b("\\equalscolon", "\\eqqcolon");
b("\\equalscoloncolon", "\\Eqqcolon");
b("\\colonminus", "\\coloneq");
b("\\coloncolonminus", "\\Coloneq");
b("\\minuscolon", "\\eqcolon");
b("\\minuscoloncolon", "\\Eqcolon");
b("\\coloncolonapprox", "\\Colonapprox");
b("\\coloncolonsim", "\\Colonsim");
b("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
b("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
b("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
b("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");
b("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`\u220C}}");
b("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
b("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
b("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
b("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
b("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
b("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
b("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
b("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
b("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{\u2269}");
b("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{\u2268}");
b("\\ngeqq", "\\html@mathml{\\@ngeqq}{\u2271}");
b("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{\u2271}");
b("\\nleqq", "\\html@mathml{\\@nleqq}{\u2270}");
b("\\nleqslant", "\\html@mathml{\\@nleqslant}{\u2270}");
b("\\nshortmid", "\\html@mathml{\\@nshortmid}{\u2224}");
b("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{\u2226}");
b("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{\u2288}");
b("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{\u2289}");
b("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{\u228A}");
b("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{\u2ACB}");
b("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{\u228B}");
b("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{\u2ACC}");
b("\\imath", "\\html@mathml{\\@imath}{\u0131}");
b("\\jmath", "\\html@mathml{\\@jmath}{\u0237}");
b("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`\u27E6}}");
b("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`\u27E7}}");
b("\u27E6", "\\llbracket");
b("\u27E7", "\\rrbracket");
b("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`\u2983}}");
b("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`\u2984}}");
b("\u2983", "\\lBrace");
b("\u2984", "\\rBrace");
b("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`\u29B5}}");
b("\u29B5", "\\minuso");
b("\\darr", "\\downarrow");
b("\\dArr", "\\Downarrow");
b("\\Darr", "\\Downarrow");
b("\\lang", "\\langle");
b("\\rang", "\\rangle");
b("\\uarr", "\\uparrow");
b("\\uArr", "\\Uparrow");
b("\\Uarr", "\\Uparrow");
b("\\N", "\\mathbb{N}");
b("\\R", "\\mathbb{R}");
b("\\Z", "\\mathbb{Z}");
b("\\alef", "\\aleph");
b("\\alefsym", "\\aleph");
b("\\Alpha", "\\mathrm{A}");
b("\\Beta", "\\mathrm{B}");
b("\\bull", "\\bullet");
b("\\Chi", "\\mathrm{X}");
b("\\clubs", "\\clubsuit");
b("\\cnums", "\\mathbb{C}");
b("\\Complex", "\\mathbb{C}");
b("\\Dagger", "\\ddagger");
b("\\diamonds", "\\diamondsuit");
b("\\empty", "\\emptyset");
b("\\Epsilon", "\\mathrm{E}");
b("\\Eta", "\\mathrm{H}");
b("\\exist", "\\exists");
b("\\harr", "\\leftrightarrow");
b("\\hArr", "\\Leftrightarrow");
b("\\Harr", "\\Leftrightarrow");
b("\\hearts", "\\heartsuit");
b("\\image", "\\Im");
b("\\infin", "\\infty");
b("\\Iota", "\\mathrm{I}");
b("\\isin", "\\in");
b("\\Kappa", "\\mathrm{K}");
b("\\larr", "\\leftarrow");
b("\\lArr", "\\Leftarrow");
b("\\Larr", "\\Leftarrow");
b("\\lrarr", "\\leftrightarrow");
b("\\lrArr", "\\Leftrightarrow");
b("\\Lrarr", "\\Leftrightarrow");
b("\\Mu", "\\mathrm{M}");
b("\\natnums", "\\mathbb{N}");
b("\\Nu", "\\mathrm{N}");
b("\\Omicron", "\\mathrm{O}");
b("\\plusmn", "\\pm");
b("\\rarr", "\\rightarrow");
b("\\rArr", "\\Rightarrow");
b("\\Rarr", "\\Rightarrow");
b("\\real", "\\Re");
b("\\reals", "\\mathbb{R}");
b("\\Reals", "\\mathbb{R}");
b("\\Rho", "\\mathrm{P}");
b("\\sdot", "\\cdot");
b("\\sect", "\\S");
b("\\spades", "\\spadesuit");
b("\\sub", "\\subset");
b("\\sube", "\\subseteq");
b("\\supe", "\\supseteq");
b("\\Tau", "\\mathrm{T}");
b("\\thetasym", "\\vartheta");
b("\\weierp", "\\wp");
b("\\Zeta", "\\mathrm{Z}");
b("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
b("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
b("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
b("\\bra", "\\mathinner{\\langle{#1}|}");
b("\\ket", "\\mathinner{|{#1}\\rangle}");
b("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
b("\\Bra", "\\left\\langle#1\\right|");
b("\\Ket", "\\left|#1\\right\\rangle");
var Ms = (r) => (e) => {
  var t = e.consumeArg().tokens, a = e.consumeArg().tokens, n = e.consumeArg().tokens, i = e.consumeArg().tokens, s = e.macros.get("|"), l = e.macros.get("\\|");
  e.macros.beginGroup();
  var h = (y) => (x) => {
    r && (x.macros.set("|", s), n.length && x.macros.set("\\|", l));
    var w = y;
    if (!y && n.length) {
      var B = x.future();
      B.text === "|" && (x.popToken(), w = true);
    }
    return { tokens: w ? n : a, numArgs: 0 };
  };
  e.macros.set("|", h(false)), n.length && e.macros.set("\\|", h(true));
  var d = e.consumeArg().tokens, f = e.expandTokens([...i, ...d, ...t]);
  return e.macros.endGroup(), { tokens: f.reverse(), numArgs: 0 };
};
b("\\bra@ket", Ms(false));
b("\\bra@set", Ms(true));
b("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");
b("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");
b("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
b("\\angln", "{\\angl n}");
b("\\blue", "\\textcolor{##6495ed}{#1}");
b("\\orange", "\\textcolor{##ffa500}{#1}");
b("\\pink", "\\textcolor{##ff00af}{#1}");
b("\\red", "\\textcolor{##df0030}{#1}");
b("\\green", "\\textcolor{##28ae7b}{#1}");
b("\\gray", "\\textcolor{gray}{#1}");
b("\\purple", "\\textcolor{##9d38bd}{#1}");
b("\\blueA", "\\textcolor{##ccfaff}{#1}");
b("\\blueB", "\\textcolor{##80f6ff}{#1}");
b("\\blueC", "\\textcolor{##63d9ea}{#1}");
b("\\blueD", "\\textcolor{##11accd}{#1}");
b("\\blueE", "\\textcolor{##0c7f99}{#1}");
b("\\tealA", "\\textcolor{##94fff5}{#1}");
b("\\tealB", "\\textcolor{##26edd5}{#1}");
b("\\tealC", "\\textcolor{##01d1c1}{#1}");
b("\\tealD", "\\textcolor{##01a995}{#1}");
b("\\tealE", "\\textcolor{##208170}{#1}");
b("\\greenA", "\\textcolor{##b6ffb0}{#1}");
b("\\greenB", "\\textcolor{##8af281}{#1}");
b("\\greenC", "\\textcolor{##74cf70}{#1}");
b("\\greenD", "\\textcolor{##1fab54}{#1}");
b("\\greenE", "\\textcolor{##0d923f}{#1}");
b("\\goldA", "\\textcolor{##ffd0a9}{#1}");
b("\\goldB", "\\textcolor{##ffbb71}{#1}");
b("\\goldC", "\\textcolor{##ff9c39}{#1}");
b("\\goldD", "\\textcolor{##e07d10}{#1}");
b("\\goldE", "\\textcolor{##a75a05}{#1}");
b("\\redA", "\\textcolor{##fca9a9}{#1}");
b("\\redB", "\\textcolor{##ff8482}{#1}");
b("\\redC", "\\textcolor{##f9685d}{#1}");
b("\\redD", "\\textcolor{##e84d39}{#1}");
b("\\redE", "\\textcolor{##bc2612}{#1}");
b("\\maroonA", "\\textcolor{##ffbde0}{#1}");
b("\\maroonB", "\\textcolor{##ff92c6}{#1}");
b("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
b("\\maroonD", "\\textcolor{##ca337c}{#1}");
b("\\maroonE", "\\textcolor{##9e034e}{#1}");
b("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
b("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
b("\\purpleC", "\\textcolor{##aa87ff}{#1}");
b("\\purpleD", "\\textcolor{##7854ab}{#1}");
b("\\purpleE", "\\textcolor{##543b78}{#1}");
b("\\mintA", "\\textcolor{##f5f9e8}{#1}");
b("\\mintB", "\\textcolor{##edf2df}{#1}");
b("\\mintC", "\\textcolor{##e0e5cc}{#1}");
b("\\grayA", "\\textcolor{##f6f7f7}{#1}");
b("\\grayB", "\\textcolor{##f0f1f2}{#1}");
b("\\grayC", "\\textcolor{##e3e5e6}{#1}");
b("\\grayD", "\\textcolor{##d6d8da}{#1}");
b("\\grayE", "\\textcolor{##babec2}{#1}");
b("\\grayF", "\\textcolor{##888d93}{#1}");
b("\\grayG", "\\textcolor{##626569}{#1}");
b("\\grayH", "\\textcolor{##3b3e40}{#1}");
b("\\grayI", "\\textcolor{##21242c}{#1}");
b("\\kaBlue", "\\textcolor{##314453}{#1}");
b("\\kaGreen", "\\textcolor{##71B307}{#1}");
var Ts = { "^": true, _: true, "\\limits": true, "\\nolimits": true };
class B3 {
  constructor(e, t, a) {
    this.settings = void 0, this.expansionCount = void 0, this.lexer = void 0, this.macros = void 0, this.stack = void 0, this.mode = void 0, this.settings = t, this.expansionCount = 0, this.feed(e), this.macros = new A3(M3, t.macros), this.mode = a, this.stack = [];
  }
  feed(e) {
    this.lexer = new An(e, this.settings);
  }
  switchMode(e) {
    this.mode = e;
  }
  beginGroup() {
    this.macros.beginGroup();
  }
  endGroup() {
    this.macros.endGroup();
  }
  endGroups() {
    this.macros.endGroups();
  }
  future() {
    return this.stack.length === 0 && this.pushToken(this.lexer.lex()), this.stack[this.stack.length - 1];
  }
  popToken() {
    return this.future(), this.stack.pop();
  }
  pushToken(e) {
    this.stack.push(e);
  }
  pushTokens(e) {
    this.stack.push(...e);
  }
  scanArgument(e) {
    var t, a, n;
    if (e) {
      if (this.consumeSpaces(), this.future().text !== "[") return null;
      t = this.popToken(), { tokens: n, end: a } = this.consumeArg(["]"]);
    } else ({ tokens: n, start: t, end: a } = this.consumeArg());
    return this.pushToken(new ie("EOF", a.loc)), this.pushTokens(n), new ie("", ee.range(t, a));
  }
  consumeSpaces() {
    for (; ; ) {
      var e = this.future();
      if (e.text === " ") this.stack.pop();
      else break;
    }
  }
  consumeArg(e) {
    var t = [], a = e && e.length > 0;
    a || this.consumeSpaces();
    var n = this.future(), i, s = 0, l = 0;
    do {
      if (i = this.popToken(), t.push(i), i.text === "{") ++s;
      else if (i.text === "}") {
        if (--s, s === -1) throw new $("Extra }", i);
      } else if (i.text === "EOF") throw new $("Unexpected end of input in a macro argument, expected '" + (e && a ? e[l] : "}") + "'", i);
      if (e && a) if ((s === 0 || s === 1 && e[l] === "{") && i.text === e[l]) {
        if (++l, l === e.length) {
          t.splice(-l, l);
          break;
        }
      } else l = 0;
    } while (s !== 0 || a);
    return n.text === "{" && t[t.length - 1].text === "}" && (t.pop(), t.shift()), t.reverse(), { tokens: t, start: n, end: i };
  }
  consumeArgs(e, t) {
    if (t) {
      if (t.length !== e + 1) throw new $("The length of delimiters doesn't match the number of args!");
      for (var a = t[0], n = 0; n < a.length; n++) {
        var i = this.popToken();
        if (a[n] !== i.text) throw new $("Use of the macro doesn't match its definition", i);
      }
    }
    for (var s = [], l = 0; l < e; l++) s.push(this.consumeArg(t && t[l + 1]).tokens);
    return s;
  }
  countExpansion(e) {
    if (this.expansionCount += e, this.expansionCount > this.settings.maxExpand) throw new $("Too many expansions: infinite loop or need to increase maxExpand setting");
  }
  expandOnce(e) {
    var t = this.popToken(), a = t.text, n = t.noexpand ? null : this._getExpansion(a);
    if (n == null || e && n.unexpandable) {
      if (e && n == null && a[0] === "\\" && !this.isDefined(a)) throw new $("Undefined control sequence: " + a);
      return this.pushToken(t), false;
    }
    this.countExpansion(1);
    var i = n.tokens, s = this.consumeArgs(n.numArgs, n.delimiters);
    if (n.numArgs) {
      i = i.slice();
      for (var l = i.length - 1; l >= 0; --l) {
        var h = i[l];
        if (h.text === "#") {
          if (l === 0) throw new $("Incomplete placeholder at end of macro body", h);
          if (h = i[--l], h.text === "#") i.splice(l + 1, 1);
          else if (/^[1-9]$/.test(h.text)) i.splice(l, 2, ...s[+h.text - 1]);
          else throw new $("Not a valid argument number", h);
        }
      }
    }
    return this.pushTokens(i), i.length;
  }
  expandAfterFuture() {
    return this.expandOnce(), this.future();
  }
  expandNextToken() {
    for (; ; ) if (this.expandOnce() === false) {
      var e = this.stack.pop();
      return e.treatAsRelax && (e.text = "\\relax"), e;
    }
  }
  expandMacro(e) {
    return this.macros.has(e) ? this.expandTokens([new ie(e)]) : void 0;
  }
  expandTokens(e) {
    var t = [], a = this.stack.length;
    for (this.pushTokens(e); this.stack.length > a; ) if (this.expandOnce(true) === false) {
      var n = this.stack.pop();
      n.treatAsRelax && (n.noexpand = false, n.treatAsRelax = false), t.push(n);
    }
    return this.countExpansion(t.length), t;
  }
  expandMacroAsText(e) {
    var t = this.expandMacro(e);
    return t && t.map((a) => a.text).join("");
  }
  _getExpansion(e) {
    var t = this.macros.get(e);
    if (t == null) return t;
    if (e.length === 1) {
      var a = this.lexer.catcodes[e];
      if (a != null && a !== 13) return;
    }
    var n = typeof t == "function" ? t(this) : t;
    if (typeof n == "string") {
      var i = 0;
      if (n.includes("#")) for (var s = n.replace(/##/g, ""); s.includes("#" + (i + 1)); ) ++i;
      for (var l = new An(n, this.settings), h = [], d = l.lex(); d.text !== "EOF"; ) h.push(d), d = l.lex();
      h.reverse();
      var f = { tokens: h, numArgs: i };
      return f;
    }
    return n;
  }
  isDefined(e) {
    return this.macros.has(e) || _e.hasOwnProperty(e) || b0.math.hasOwnProperty(e) || b0.text.hasOwnProperty(e) || Ts.hasOwnProperty(e);
  }
  isExpandable(e) {
    var t = this.macros.get(e);
    return t != null ? typeof t == "string" || typeof t == "function" || !t.unexpandable : _e.hasOwnProperty(e) && !_e[e].primitive;
  }
}
var Bn = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/, wr = Object.freeze({ "\u208A": "+", "\u208B": "-", "\u208C": "=", "\u208D": "(", "\u208E": ")", "\u2080": "0", "\u2081": "1", "\u2082": "2", "\u2083": "3", "\u2084": "4", "\u2085": "5", "\u2086": "6", "\u2087": "7", "\u2088": "8", "\u2089": "9", "\u2090": "a", "\u2091": "e", "\u2095": "h", "\u1D62": "i", "\u2C7C": "j", "\u2096": "k", "\u2097": "l", "\u2098": "m", "\u2099": "n", "\u2092": "o", "\u209A": "p", "\u1D63": "r", "\u209B": "s", "\u209C": "t", "\u1D64": "u", "\u1D65": "v", "\u2093": "x", "\u1D66": "\u03B2", "\u1D67": "\u03B3", "\u1D68": "\u03C1", "\u1D69": "\u03D5", "\u1D6A": "\u03C7", "\u207A": "+", "\u207B": "-", "\u207C": "=", "\u207D": "(", "\u207E": ")", "\u2070": "0", "\xB9": "1", "\xB2": "2", "\xB3": "3", "\u2074": "4", "\u2075": "5", "\u2076": "6", "\u2077": "7", "\u2078": "8", "\u2079": "9", "\u1D2C": "A", "\u1D2E": "B", "\u1D30": "D", "\u1D31": "E", "\u1D33": "G", "\u1D34": "H", "\u1D35": "I", "\u1D36": "J", "\u1D37": "K", "\u1D38": "L", "\u1D39": "M", "\u1D3A": "N", "\u1D3C": "O", "\u1D3E": "P", "\u1D3F": "R", "\u1D40": "T", "\u1D41": "U", "\u2C7D": "V", "\u1D42": "W", "\u1D43": "a", "\u1D47": "b", "\u1D9C": "c", "\u1D48": "d", "\u1D49": "e", "\u1DA0": "f", "\u1D4D": "g", \u02B0: "h", "\u2071": "i", \u02B2: "j", "\u1D4F": "k", \u02E1: "l", "\u1D50": "m", \u207F: "n", "\u1D52": "o", "\u1D56": "p", \u02B3: "r", \u02E2: "s", "\u1D57": "t", "\u1D58": "u", "\u1D5B": "v", \u02B7: "w", \u02E3: "x", \u02B8: "y", "\u1DBB": "z", "\u1D5D": "\u03B2", "\u1D5E": "\u03B3", "\u1D5F": "\u03B4", "\u1D60": "\u03D5", "\u1D61": "\u03C7", "\u1DBF": "\u03B8" }), V1 = { "\u0301": { text: "\\'", math: "\\acute" }, "\u0300": { text: "\\`", math: "\\grave" }, "\u0308": { text: '\\"', math: "\\ddot" }, "\u0303": { text: "\\~", math: "\\tilde" }, "\u0304": { text: "\\=", math: "\\bar" }, "\u0306": { text: "\\u", math: "\\breve" }, "\u030C": { text: "\\v", math: "\\check" }, "\u0302": { text: "\\^", math: "\\hat" }, "\u0307": { text: "\\.", math: "\\dot" }, "\u030A": { text: "\\r", math: "\\mathring" }, "\u030B": { text: "\\H" }, "\u0327": { text: "\\c" } }, Cn = { \u00E1: "a\u0301", \u00E0: "a\u0300", \u00E4: "a\u0308", \u01DF: "a\u0308\u0304", \u00E3: "a\u0303", \u0101: "a\u0304", \u0103: "a\u0306", \u1EAF: "a\u0306\u0301", \u1EB1: "a\u0306\u0300", \u1EB5: "a\u0306\u0303", \u01CE: "a\u030C", \u00E2: "a\u0302", \u1EA5: "a\u0302\u0301", \u1EA7: "a\u0302\u0300", \u1EAB: "a\u0302\u0303", \u0227: "a\u0307", \u01E1: "a\u0307\u0304", \u00E5: "a\u030A", \u01FB: "a\u030A\u0301", \u1E03: "b\u0307", \u0107: "c\u0301", \u1E09: "c\u0327\u0301", \u010D: "c\u030C", \u0109: "c\u0302", \u010B: "c\u0307", \u00E7: "c\u0327", \u010F: "d\u030C", \u1E0B: "d\u0307", \u1E11: "d\u0327", \u00E9: "e\u0301", \u00E8: "e\u0300", \u00EB: "e\u0308", \u1EBD: "e\u0303", \u0113: "e\u0304", \u1E17: "e\u0304\u0301", \u1E15: "e\u0304\u0300", \u0115: "e\u0306", \u1E1D: "e\u0327\u0306", \u011B: "e\u030C", \u00EA: "e\u0302", \u1EBF: "e\u0302\u0301", \u1EC1: "e\u0302\u0300", \u1EC5: "e\u0302\u0303", \u0117: "e\u0307", \u0229: "e\u0327", \u1E1F: "f\u0307", \u01F5: "g\u0301", \u1E21: "g\u0304", \u011F: "g\u0306", \u01E7: "g\u030C", \u011D: "g\u0302", \u0121: "g\u0307", \u0123: "g\u0327", \u1E27: "h\u0308", \u021F: "h\u030C", \u0125: "h\u0302", \u1E23: "h\u0307", \u1E29: "h\u0327", \u00ED: "i\u0301", \u00EC: "i\u0300", \u00EF: "i\u0308", \u1E2F: "i\u0308\u0301", \u0129: "i\u0303", \u012B: "i\u0304", \u012D: "i\u0306", \u01D0: "i\u030C", \u00EE: "i\u0302", \u01F0: "j\u030C", \u0135: "j\u0302", \u1E31: "k\u0301", \u01E9: "k\u030C", \u0137: "k\u0327", \u013A: "l\u0301", \u013E: "l\u030C", \u013C: "l\u0327", \u1E3F: "m\u0301", \u1E41: "m\u0307", \u0144: "n\u0301", \u01F9: "n\u0300", \u00F1: "n\u0303", \u0148: "n\u030C", \u1E45: "n\u0307", \u0146: "n\u0327", \u00F3: "o\u0301", \u00F2: "o\u0300", \u00F6: "o\u0308", \u022B: "o\u0308\u0304", \u00F5: "o\u0303", \u1E4D: "o\u0303\u0301", \u1E4F: "o\u0303\u0308", \u022D: "o\u0303\u0304", \u014D: "o\u0304", \u1E53: "o\u0304\u0301", \u1E51: "o\u0304\u0300", \u014F: "o\u0306", \u01D2: "o\u030C", \u00F4: "o\u0302", \u1ED1: "o\u0302\u0301", \u1ED3: "o\u0302\u0300", \u1ED7: "o\u0302\u0303", \u022F: "o\u0307", \u0231: "o\u0307\u0304", \u0151: "o\u030B", \u1E55: "p\u0301", \u1E57: "p\u0307", \u0155: "r\u0301", \u0159: "r\u030C", \u1E59: "r\u0307", \u0157: "r\u0327", \u015B: "s\u0301", \u1E65: "s\u0301\u0307", \u0161: "s\u030C", \u1E67: "s\u030C\u0307", \u015D: "s\u0302", \u1E61: "s\u0307", \u015F: "s\u0327", \u1E97: "t\u0308", \u0165: "t\u030C", \u1E6B: "t\u0307", \u0163: "t\u0327", \u00FA: "u\u0301", \u00F9: "u\u0300", \u00FC: "u\u0308", \u01D8: "u\u0308\u0301", \u01DC: "u\u0308\u0300", \u01D6: "u\u0308\u0304", \u01DA: "u\u0308\u030C", \u0169: "u\u0303", \u1E79: "u\u0303\u0301", \u016B: "u\u0304", \u1E7B: "u\u0304\u0308", \u016D: "u\u0306", \u01D4: "u\u030C", \u00FB: "u\u0302", \u016F: "u\u030A", \u0171: "u\u030B", \u1E7D: "v\u0303", \u1E83: "w\u0301", \u1E81: "w\u0300", \u1E85: "w\u0308", \u0175: "w\u0302", \u1E87: "w\u0307", \u1E98: "w\u030A", \u1E8D: "x\u0308", \u1E8B: "x\u0307", \u00FD: "y\u0301", \u1EF3: "y\u0300", \u00FF: "y\u0308", \u1EF9: "y\u0303", \u0233: "y\u0304", \u0177: "y\u0302", \u1E8F: "y\u0307", \u1E99: "y\u030A", \u017A: "z\u0301", \u017E: "z\u030C", \u1E91: "z\u0302", \u017C: "z\u0307", \u00C1: "A\u0301", \u00C0: "A\u0300", \u00C4: "A\u0308", \u01DE: "A\u0308\u0304", \u00C3: "A\u0303", \u0100: "A\u0304", \u0102: "A\u0306", \u1EAE: "A\u0306\u0301", \u1EB0: "A\u0306\u0300", \u1EB4: "A\u0306\u0303", \u01CD: "A\u030C", \u00C2: "A\u0302", \u1EA4: "A\u0302\u0301", \u1EA6: "A\u0302\u0300", \u1EAA: "A\u0302\u0303", \u0226: "A\u0307", \u01E0: "A\u0307\u0304", \u00C5: "A\u030A", \u01FA: "A\u030A\u0301", \u1E02: "B\u0307", \u0106: "C\u0301", \u1E08: "C\u0327\u0301", \u010C: "C\u030C", \u0108: "C\u0302", \u010A: "C\u0307", \u00C7: "C\u0327", \u010E: "D\u030C", \u1E0A: "D\u0307", \u1E10: "D\u0327", \u00C9: "E\u0301", \u00C8: "E\u0300", \u00CB: "E\u0308", \u1EBC: "E\u0303", \u0112: "E\u0304", \u1E16: "E\u0304\u0301", \u1E14: "E\u0304\u0300", \u0114: "E\u0306", \u1E1C: "E\u0327\u0306", \u011A: "E\u030C", \u00CA: "E\u0302", \u1EBE: "E\u0302\u0301", \u1EC0: "E\u0302\u0300", \u1EC4: "E\u0302\u0303", \u0116: "E\u0307", \u0228: "E\u0327", \u1E1E: "F\u0307", \u01F4: "G\u0301", \u1E20: "G\u0304", \u011E: "G\u0306", \u01E6: "G\u030C", \u011C: "G\u0302", \u0120: "G\u0307", \u0122: "G\u0327", \u1E26: "H\u0308", \u021E: "H\u030C", \u0124: "H\u0302", \u1E22: "H\u0307", \u1E28: "H\u0327", \u00CD: "I\u0301", \u00CC: "I\u0300", \u00CF: "I\u0308", \u1E2E: "I\u0308\u0301", \u0128: "I\u0303", \u012A: "I\u0304", \u012C: "I\u0306", \u01CF: "I\u030C", \u00CE: "I\u0302", \u0130: "I\u0307", \u0134: "J\u0302", \u1E30: "K\u0301", \u01E8: "K\u030C", \u0136: "K\u0327", \u0139: "L\u0301", \u013D: "L\u030C", \u013B: "L\u0327", \u1E3E: "M\u0301", \u1E40: "M\u0307", \u0143: "N\u0301", \u01F8: "N\u0300", \u00D1: "N\u0303", \u0147: "N\u030C", \u1E44: "N\u0307", \u0145: "N\u0327", \u00D3: "O\u0301", \u00D2: "O\u0300", \u00D6: "O\u0308", \u022A: "O\u0308\u0304", \u00D5: "O\u0303", \u1E4C: "O\u0303\u0301", \u1E4E: "O\u0303\u0308", \u022C: "O\u0303\u0304", \u014C: "O\u0304", \u1E52: "O\u0304\u0301", \u1E50: "O\u0304\u0300", \u014E: "O\u0306", \u01D1: "O\u030C", \u00D4: "O\u0302", \u1ED0: "O\u0302\u0301", \u1ED2: "O\u0302\u0300", \u1ED6: "O\u0302\u0303", \u022E: "O\u0307", \u0230: "O\u0307\u0304", \u0150: "O\u030B", \u1E54: "P\u0301", \u1E56: "P\u0307", \u0154: "R\u0301", \u0158: "R\u030C", \u1E58: "R\u0307", \u0156: "R\u0327", \u015A: "S\u0301", \u1E64: "S\u0301\u0307", \u0160: "S\u030C", \u1E66: "S\u030C\u0307", \u015C: "S\u0302", \u1E60: "S\u0307", \u015E: "S\u0327", \u0164: "T\u030C", \u1E6A: "T\u0307", \u0162: "T\u0327", \u00DA: "U\u0301", \u00D9: "U\u0300", \u00DC: "U\u0308", \u01D7: "U\u0308\u0301", \u01DB: "U\u0308\u0300", \u01D5: "U\u0308\u0304", \u01D9: "U\u0308\u030C", \u0168: "U\u0303", \u1E78: "U\u0303\u0301", \u016A: "U\u0304", \u1E7A: "U\u0304\u0308", \u016C: "U\u0306", \u01D3: "U\u030C", \u00DB: "U\u0302", \u016E: "U\u030A", \u0170: "U\u030B", \u1E7C: "V\u0303", \u1E82: "W\u0301", \u1E80: "W\u0300", \u1E84: "W\u0308", \u0174: "W\u0302", \u1E86: "W\u0307", \u1E8C: "X\u0308", \u1E8A: "X\u0307", \u00DD: "Y\u0301", \u1EF2: "Y\u0300", \u0178: "Y\u0308", \u1EF8: "Y\u0303", \u0232: "Y\u0304", \u0176: "Y\u0302", \u1E8E: "Y\u0307", \u0179: "Z\u0301", \u017D: "Z\u030C", \u1E90: "Z\u0302", \u017B: "Z\u0307", \u03AC: "\u03B1\u0301", \u1F70: "\u03B1\u0300", \u1FB1: "\u03B1\u0304", \u1FB0: "\u03B1\u0306", \u03AD: "\u03B5\u0301", \u1F72: "\u03B5\u0300", \u03AE: "\u03B7\u0301", \u1F74: "\u03B7\u0300", \u03AF: "\u03B9\u0301", \u1F76: "\u03B9\u0300", \u03CA: "\u03B9\u0308", \u0390: "\u03B9\u0308\u0301", \u1FD2: "\u03B9\u0308\u0300", \u1FD1: "\u03B9\u0304", \u1FD0: "\u03B9\u0306", \u03CC: "\u03BF\u0301", \u1F78: "\u03BF\u0300", \u03CD: "\u03C5\u0301", \u1F7A: "\u03C5\u0300", \u03CB: "\u03C5\u0308", \u03B0: "\u03C5\u0308\u0301", \u1FE2: "\u03C5\u0308\u0300", \u1FE1: "\u03C5\u0304", \u1FE0: "\u03C5\u0306", \u03CE: "\u03C9\u0301", \u1F7C: "\u03C9\u0300", \u038E: "\u03A5\u0301", \u1FEA: "\u03A5\u0300", \u03AB: "\u03A5\u0308", \u1FE9: "\u03A5\u0304", \u1FE8: "\u03A5\u0306", \u038F: "\u03A9\u0301", \u1FFA: "\u03A9\u0300" };
class n1 {
  constructor(e, t) {
    this.mode = void 0, this.gullet = void 0, this.settings = void 0, this.leftrightDepth = void 0, this.nextToken = void 0, this.mode = "math", this.gullet = new B3(e, t, this.mode), this.settings = t, this.leftrightDepth = 0, this.nextToken = null;
  }
  expect(e, t) {
    if (t === void 0 && (t = true), this.fetch().text !== e) throw new $("Expected '" + e + "', got '" + this.fetch().text + "'", this.fetch());
    t && this.consume();
  }
  consume() {
    this.nextToken = null;
  }
  fetch() {
    return this.nextToken == null && (this.nextToken = this.gullet.expandNextToken()), this.nextToken;
  }
  switchMode(e) {
    this.mode = e, this.gullet.switchMode(e);
  }
  parse() {
    this.settings.globalGroup || this.gullet.beginGroup(), this.settings.colorIsTextColor && this.gullet.macros.set("\\color", "\\textcolor");
    try {
      var e = this.parseExpression(false);
      return this.expect("EOF"), this.settings.globalGroup || this.gullet.endGroup(), e;
    } finally {
      this.gullet.endGroups();
    }
  }
  subparse(e) {
    var t = this.nextToken;
    this.consume(), this.gullet.pushToken(new ie("}")), this.gullet.pushTokens(e);
    var a = this.parseExpression(false);
    return this.expect("}"), this.nextToken = t, a;
  }
  parseExpression(e, t) {
    for (var a = []; ; ) {
      this.mode === "math" && this.consumeSpaces();
      var n = this.fetch();
      if (n1.endOfExpression.has(n.text) || t && n.text === t || e && _e[n.text] && _e[n.text].infix) break;
      var i = this.parseAtom(t);
      if (i) {
        if (i.type === "internal") continue;
      } else break;
      a.push(i);
    }
    return this.mode === "text" && this.formLigatures(a), this.handleInfixNodes(a);
  }
  handleInfixNodes(e) {
    for (var t = -1, a, n = 0; n < e.length; n++) {
      var i = e[n];
      if (i.type === "infix") {
        if (t !== -1) throw new $("only one infix operator per group", i.token);
        t = n, a = i.replaceWith;
      }
    }
    if (t !== -1 && a) {
      var s, l, h = e.slice(0, t), d = e.slice(t + 1);
      h.length === 1 && h[0].type === "ordgroup" ? s = h[0] : s = { type: "ordgroup", mode: this.mode, body: h }, d.length === 1 && d[0].type === "ordgroup" ? l = d[0] : l = { type: "ordgroup", mode: this.mode, body: d };
      var f;
      return a === "\\\\abovefrac" ? f = this.callFunction(a, [s, e[t], l], []) : f = this.callFunction(a, [s, l], []), [f];
    } else return e;
  }
  handleSupSubscript(e) {
    var t = this.fetch(), a = t.text;
    this.consume(), this.consumeSpaces();
    var n;
    do {
      var i;
      n = this.parseGroup(e);
    } while (((i = n) == null ? void 0 : i.type) === "internal");
    if (!n) throw new $("Expected group after '" + a + "'", t);
    return n;
  }
  formatUnsupportedCmd(e) {
    for (var t = [], a = 0; a < e.length; a++) t.push({ type: "textord", mode: "text", text: e[a] });
    var n = { type: "text", mode: this.mode, body: t }, i = { type: "color", mode: this.mode, color: this.settings.errorColor, body: [n] };
    return i;
  }
  parseAtom(e) {
    var t = this.parseGroup("atom", e);
    if ((t == null ? void 0 : t.type) === "internal" || this.mode === "text") return t;
    for (var a, n; ; ) {
      this.consumeSpaces();
      var i = this.fetch();
      if (i.text === "\\limits" || i.text === "\\nolimits") {
        if (t && t.type === "op") {
          var s = i.text === "\\limits";
          t.limits = s, t.alwaysHandleSupSub = true;
        } else if (t && t.type === "operatorname") t.alwaysHandleSupSub && (t.limits = i.text === "\\limits");
        else throw new $("Limit controls must follow a math operator", i);
        this.consume();
      } else if (i.text === "^") {
        if (a) throw new $("Double superscript", i);
        a = this.handleSupSubscript("superscript");
      } else if (i.text === "_") {
        if (n) throw new $("Double subscript", i);
        n = this.handleSupSubscript("subscript");
      } else if (i.text === "'") {
        if (a) throw new $("Double superscript", i);
        var l = { type: "textord", mode: this.mode, text: "\\prime" }, h = [l];
        for (this.consume(); this.fetch().text === "'"; ) h.push(l), this.consume();
        this.fetch().text === "^" && h.push(this.handleSupSubscript("superscript")), a = { type: "ordgroup", mode: this.mode, body: h };
      } else if (wr[i.text]) {
        var d = Bn.test(i.text), f = [];
        for (f.push(new ie(wr[i.text])), this.consume(); ; ) {
          var y = this.fetch().text;
          if (!wr[y] || Bn.test(y) !== d) break;
          f.unshift(new ie(wr[y])), this.consume();
        }
        var x = this.subparse(f);
        d ? n = { type: "ordgroup", mode: "math", body: x } : a = { type: "ordgroup", mode: "math", body: x };
      } else break;
    }
    return a || n ? { type: "supsub", mode: this.mode, base: t, sup: a, sub: n } : t;
  }
  parseFunction(e, t) {
    var a = this.fetch(), n = a.text, i = _e[n];
    if (!i) return null;
    if (this.consume(), t && t !== "atom" && !i.allowedInArgument) throw new $("Got function '" + n + "' with no arguments" + (t ? " as " + t : ""), a);
    if (this.mode === "text" && !i.allowedInText) throw new $("Can't use function '" + n + "' in text mode", a);
    if (this.mode === "math" && i.allowedInMath === false) throw new $("Can't use function '" + n + "' in math mode", a);
    var { args: s, optArgs: l } = this.parseArguments(n, i);
    return this.callFunction(n, s, l, a, e);
  }
  callFunction(e, t, a, n, i) {
    var s = { funcName: e, parser: this, token: n, breakOnTokenText: i }, l = _e[e];
    if (l && l.handler) return l.handler(s, t, a);
    throw new $("No function handler for " + e);
  }
  parseArguments(e, t) {
    var a = t.numArgs + t.numOptionalArgs;
    if (a === 0) return { args: [], optArgs: [] };
    for (var n = [], i = [], s = 0; s < a; s++) {
      var l = t.argTypes && t.argTypes[s], h = s < t.numOptionalArgs;
      ("primitive" in t && t.primitive && l == null || t.type === "sqrt" && s === 1 && i[0] == null) && (l = "primitive");
      var d = this.parseGroupOfType("argument to '" + e + "'", l, h);
      if (h) i.push(d);
      else if (d != null) n.push(d);
      else throw new $("Null argument, please report this as a bug");
    }
    return { args: n, optArgs: i };
  }
  parseGroupOfType(e, t, a) {
    switch (t) {
      case "color":
        return this.parseColorGroup(a);
      case "size":
        return this.parseSizeGroup(a);
      case "url":
        return this.parseUrlGroup(a);
      case "math":
      case "text":
        return this.parseArgumentGroup(a, t);
      case "hbox": {
        var n = this.parseArgumentGroup(a, "text");
        return n != null ? { type: "styling", mode: n.mode, body: [n], style: "text", resetFont: true } : null;
      }
      case "raw": {
        var i = this.parseStringGroup("raw", a);
        return i != null ? { type: "raw", mode: "text", string: i.text } : null;
      }
      case "primitive": {
        if (a) throw new $("A primitive argument cannot be optional");
        var s = this.parseGroup(e);
        if (s == null) throw new $("Expected group as " + e, this.fetch());
        return s;
      }
      case "original":
      case null:
      case void 0:
        return this.parseArgumentGroup(a);
      default:
        throw new $("Unknown group type as " + e, this.fetch());
    }
  }
  consumeSpaces() {
    for (; this.fetch().text === " "; ) this.consume();
  }
  parseStringGroup(e, t) {
    var a = this.gullet.scanArgument(t);
    if (a == null) return null;
    for (var n = "", i; (i = this.fetch()).text !== "EOF"; ) n += i.text, this.consume();
    return this.consume(), a.text = n, a;
  }
  parseRegexGroup(e, t) {
    for (var a = this.fetch(), n = a, i = "", s; (s = this.fetch()).text !== "EOF" && e.test(i + s.text); ) n = s, i += n.text, this.consume();
    if (i === "") throw new $("Invalid " + t + ": '" + a.text + "'", a);
    return a.range(n, i);
  }
  parseColorGroup(e) {
    var t = this.parseStringGroup("color", e);
    if (t == null) return null;
    var a = /^(#[a-f0-9]{3,4}|#[a-f0-9]{6}|#[a-f0-9]{8}|[a-f0-9]{6}|[a-z]+)$/i.exec(t.text);
    if (!a) throw new $("Invalid color: '" + t.text + "'", t);
    var n = a[0];
    return /^[0-9a-f]{6}$/i.test(n) && (n = "#" + n), { type: "color-token", mode: this.mode, color: n };
  }
  parseSizeGroup(e) {
    var t, a = false;
    if (this.gullet.consumeSpaces(), !e && this.gullet.future().text !== "{" ? t = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size") : t = this.parseStringGroup("size", e), !t) return null;
    !e && t.text.length === 0 && (t.text = "0pt", a = true);
    var n = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(t.text);
    if (!n) throw new $("Invalid size: '" + t.text + "'", t);
    var i = { number: +(n[1] + n[2]), unit: n[3] };
    if (!Ri(i)) throw new $("Invalid unit: '" + i.unit + "'", t);
    return { type: "size", mode: this.mode, value: i, isBlank: a };
  }
  parseUrlGroup(e) {
    this.gullet.lexer.setCatcode("%", 13), this.gullet.lexer.setCatcode("~", 12);
    var t = this.parseStringGroup("url", e);
    if (this.gullet.lexer.setCatcode("%", 14), this.gullet.lexer.setCatcode("~", 13), t == null) return null;
    var a = t.text.replace(/\\([#$%&~_^{}])/g, "$1");
    return { type: "url", mode: this.mode, url: a };
  }
  parseArgumentGroup(e, t) {
    var a = this.gullet.scanArgument(e);
    if (a == null) return null;
    var n = this.mode;
    t && this.switchMode(t), this.gullet.beginGroup();
    var i = this.parseExpression(false, "EOF");
    this.expect("EOF"), this.gullet.endGroup();
    var s = { type: "ordgroup", mode: this.mode, loc: a.loc, body: i };
    return t && this.switchMode(n), s;
  }
  parseGroup(e, t) {
    var a = this.fetch(), n = a.text, i;
    if (n === "{" || n === "\\begingroup") {
      this.consume();
      var s = n === "{" ? "}" : "\\endgroup";
      this.gullet.beginGroup();
      var l = this.parseExpression(false, s), h = this.fetch();
      this.expect(s), this.gullet.endGroup(), i = { type: "ordgroup", mode: this.mode, loc: ee.range(a, h), body: l, semisimple: n === "\\begingroup" || void 0 };
    } else if (i = this.parseFunction(t, e) || this.parseSymbol(), i == null && n[0] === "\\" && !Ts.hasOwnProperty(n)) {
      if (this.settings.throwOnError) throw new $("Undefined control sequence: " + n, a);
      i = this.formatUnsupportedCmd(n), this.consume();
    }
    return i;
  }
  formLigatures(e) {
    for (var t = e.length - 1, a = 0; a < t; ++a) {
      var n = e[a];
      if (n.type === "textord") {
        var i = n.text, s = e[a + 1];
        if (!(!s || s.type !== "textord")) {
          if (i === "-" && s.text === "-") {
            var l = e[a + 2];
            a + 1 < t && l && l.type === "textord" && l.text === "-" ? (e.splice(a, 3, { type: "textord", mode: "text", loc: ee.range(n, l), text: "---" }), t -= 2) : (e.splice(a, 2, { type: "textord", mode: "text", loc: ee.range(n, s), text: "--" }), t -= 1);
          }
          (i === "'" || i === "`") && s.text === i && (e.splice(a, 2, { type: "textord", mode: "text", loc: ee.range(n, s), text: i + i }), t -= 1);
        }
      }
    }
  }
  parseSymbol() {
    var e = this.fetch(), t = e.text;
    if (/^\\verb[^a-zA-Z]/.test(t)) {
      this.consume();
      var a = t.slice(5), n = a.charAt(0) === "*";
      if (n && (a = a.slice(1)), a.length < 2 || a.charAt(0) !== a.slice(-1)) throw new $(`\\verb assertion failed --
                    please report what input caused this bug`);
      return a = a.slice(1, -1), { type: "verb", mode: "text", body: a, star: n };
    }
    Cn.hasOwnProperty(t[0]) && !b0[this.mode][t[0]] && (this.settings.strict && this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", 'Accented Unicode text character "' + t[0] + '" used in math mode', e), t = Cn[t[0]] + t.slice(1));
    var i = S3.exec(t);
    i && (t = t.substring(0, i.index), t === "i" ? t = "\u0131" : t === "j" && (t = "\u0237"));
    var s;
    if (b0[this.mode][t]) {
      this.settings.strict && this.mode === "math" && ca.includes(t) && this.settings.reportNonstrict("unicodeTextInMathMode", 'Latin-1/Unicode text character "' + t[0] + '" used in math mode', e);
      var l = b0[this.mode][t].group, h = ee.range(e), d;
      V5(l) ? d = { type: "atom", mode: this.mode, family: l, loc: h, text: t } : d = { type: l, mode: this.mode, loc: h, text: t }, s = d;
    } else if (t.charCodeAt(0) >= 128) this.settings.strict && (Ni(t.charCodeAt(0)) ? this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", 'Unicode text character "' + t[0] + '" used in math mode', e) : this.settings.reportNonstrict("unknownSymbol", 'Unrecognized Unicode character "' + t[0] + '"' + (" (" + t.charCodeAt(0) + ")"), e)), s = { type: "textord", mode: "text", loc: ee.range(e), text: t };
    else return null;
    if (this.consume(), i) for (var f = 0; f < i[0].length; f++) {
      var y = i[0][f];
      if (!V1[y]) throw new $("Unknown accent ' " + y + "'", e);
      var x = V1[y][this.mode] || V1[y].text;
      if (!x) throw new $("Accent " + y + " unsupported in " + this.mode + " mode", e);
      s = { type: "accent", mode: this.mode, loc: ee.range(e), label: x, isStretchy: false, isShifty: true, base: s };
    }
    return s;
  }
}
n1.endOfExpression = /* @__PURE__ */ new Set(["}", "\\endgroup", "\\end", "\\right", "&"]);
var a4 = function(e, t) {
  if (!(typeof e == "string" || e instanceof String)) throw new TypeError("KaTeX can only parse string typed expression");
  var a = new n1(e, t);
  delete a.gullet.macros.current["\\df@tag"];
  var n = a.parse();
  if (delete a.gullet.macros.current["\\current@color"], delete a.gullet.macros.current["\\color"], a.gullet.macros.get("\\df@tag")) {
    if (!t.displayMode) throw new $("\\tag works only in display equations");
    n = [{ type: "tag", mode: "text", body: n, tag: a.subparse([new ie("\\df@tag")]) }];
  }
  return n;
}, n4 = function(e, t, a) {
  t.textContent = "";
  var n = i1(e, a).toNode();
  t.appendChild(n);
};
typeof document < "u" && document.compatMode !== "CSS1Compat" && (typeof console < "u" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."), n4 = function() {
  throw new $("KaTeX doesn't work in quirks mode.");
});
var Bs = function(e, t) {
  var a = i1(e, t).toMarkup();
  return a;
}, Cs = function(e, t) {
  var a = new Ua(t);
  return a4(e, a);
}, Ds = function(e, t, a) {
  if (a.throwOnError || !(e instanceof $)) throw e;
  var n = F(["katex-error"], [new le(t)]);
  return n.setAttribute("title", e.toString()), n.setAttribute("style", "color:" + a.errorColor), n;
}, i1 = function(e, t) {
  var a = new Ua(t);
  try {
    var n = a4(e, a);
    return F5(n, e, a);
  } catch (i) {
    return Ds(i, e, a);
  }
}, qs = function(e, t) {
  var a = new Ua(t);
  try {
    var n = a4(e, a);
    return O5(n, e, a);
  } catch (i) {
    return Ds(i, e, a);
  }
}, Es = "0.16.47", Ns = { Span: It, Anchor: Yr, SymbolNode: le, SvgNode: Pe, PathNode: it, LineNode: ma }, C3 = { version: Es, render: n4, renderToString: Bs, ParseError: $, SETTINGS_SCHEMA: Cr, __parse: Cs, __renderToDomTree: i1, __renderToHTMLTree: qs, __setFontMetrics: $i, __defineSymbol: o, __defineFunction: j, __defineMacro: b, __domTree: Ns };
const W3 = Object.freeze(Object.defineProperty({ __proto__: null, ParseError: $, SETTINGS_SCHEMA: Cr, __defineFunction: j, __defineMacro: b, __defineSymbol: o, __domTree: Ns, __parse: Cs, __renderToDomTree: i1, __renderToHTMLTree: qs, __setFontMetrics: $i, default: C3, get render() {
  return n4;
}, renderToString: Bs, version: Es }, Symbol.toStringTag, { value: "Module" }));
export {
  Y3 as a,
  W3 as b,
  O2 as k
};
