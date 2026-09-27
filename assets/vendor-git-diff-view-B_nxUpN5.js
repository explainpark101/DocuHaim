import { g as no, r as M, s as Jn, j as h } from "./vendor-react-BDjpSibw.js";
import { h as Bt, _ as Us, p as Os } from "./vendor-highlight-Cy0EGwO-.js";
const fa = Object.freeze(Object.defineProperty({ __proto__: null }, Symbol.toStringTag, { value: "Module" }));
var di, xs;
function io() {
  if (xs) return di;
  xs = 1;
  var t = -1, e = 1, n = 0;
  function i(p, y, L, k, E) {
    if (p === y) return p ? [[n, p]] : [];
    if (L != null) {
      var C = q(p, y, L);
      if (C) return C;
    }
    var D = o(p, y), $ = p.substring(0, D);
    p = p.substring(D), y = y.substring(D), D = f(p, y);
    var W = p.substring(p.length - D);
    p = p.substring(0, p.length - D), y = y.substring(0, y.length - D);
    var R = s(p, y);
    return $ && R.unshift([n, $]), W && R.push([n, W]), _(R, E), k && c(R), R;
  }
  function s(p, y) {
    var L;
    if (!p) return [[e, y]];
    if (!y) return [[t, p]];
    var k = p.length > y.length ? p : y, E = p.length > y.length ? y : p, C = k.indexOf(E);
    if (C !== -1) return L = [[e, k.substring(0, C)], [n, E], [e, k.substring(C + E.length)]], p.length > y.length && (L[0][0] = L[2][0] = t), L;
    if (E.length === 1) return [[t, p], [e, y]];
    var D = r(p, y);
    if (D) {
      var $ = D[0], W = D[1], R = D[2], P = D[3], O = D[4], G = i($, R), B = i(W, P);
      return G.concat([[n, O]], B);
    }
    return l(p, y);
  }
  function l(p, y) {
    for (var L = p.length, k = y.length, E = Math.ceil((L + k) / 2), C = E, D = 2 * E, $ = new Array(D), W = new Array(D), R = 0; R < D; R++) $[R] = -1, W[R] = -1;
    $[C + 1] = 0, W[C + 1] = 0;
    for (var P = L - k, O = P % 2 !== 0, G = 0, B = 0, J = 0, ue = 0, ve = 0; ve < E; ve++) {
      for (var Q = -ve + G; Q <= ve - B; Q += 2) {
        var te = C + Q, ee;
        Q === -ve || Q !== ve && $[te - 1] < $[te + 1] ? ee = $[te + 1] : ee = $[te - 1] + 1;
        for (var se = ee - Q; ee < L && se < k && p.charAt(ee) === y.charAt(se); ) ee++, se++;
        if ($[te] = ee, ee > L) B += 2;
        else if (se > k) G += 2;
        else if (O) {
          var ae = C + P - Q;
          if (ae >= 0 && ae < D && W[ae] !== -1) {
            var de = L - W[ae];
            if (ee >= de) return a(p, y, ee, se);
          }
        }
      }
      for (var Se = -ve + J; Se <= ve - ue; Se += 2) {
        var ae = C + Se, de;
        Se === -ve || Se !== ve && W[ae - 1] < W[ae + 1] ? de = W[ae + 1] : de = W[ae - 1] + 1;
        for (var De = de - Se; de < L && De < k && p.charAt(L - de - 1) === y.charAt(k - De - 1); ) de++, De++;
        if (W[ae] = de, de > L) ue += 2;
        else if (De > k) J += 2;
        else if (!O) {
          var te = C + P - Se;
          if (te >= 0 && te < D && $[te] !== -1) {
            var ee = $[te], se = C + ee - te;
            if (de = L - de, ee >= de) return a(p, y, ee, se);
          }
        }
      }
    }
    return [[t, p], [e, y]];
  }
  function a(p, y, L, k) {
    var E = p.substring(0, L), C = y.substring(0, k), D = p.substring(L), $ = y.substring(k), W = i(E, C), R = i(D, $);
    return W.concat(R);
  }
  function o(p, y) {
    if (!p || !y || p.charAt(0) !== y.charAt(0)) return 0;
    for (var L = 0, k = Math.min(p.length, y.length), E = k, C = 0; L < E; ) p.substring(C, E) == y.substring(C, E) ? (L = E, C = L) : k = E, E = Math.floor((k - L) / 2 + L);
    return N(p.charCodeAt(E - 1)) && E--, E;
  }
  function d(p, y) {
    var L = p.length, k = y.length;
    if (L == 0 || k == 0) return 0;
    L > k ? p = p.substring(L - k) : L < k && (y = y.substring(0, L));
    var E = Math.min(L, k);
    if (p == y) return E;
    for (var C = 0, D = 1; ; ) {
      var $ = p.substring(E - D), W = y.indexOf($);
      if (W == -1) return C;
      D += W, (W == 0 || p.substring(E - D) == y.substring(0, D)) && (C = D, D++);
    }
  }
  function f(p, y) {
    if (!p || !y || p.slice(-1) !== y.slice(-1)) return 0;
    for (var L = 0, k = Math.min(p.length, y.length), E = k, C = 0; L < E; ) p.substring(p.length - E, p.length - C) == y.substring(y.length - E, y.length - C) ? (L = E, C = L) : k = E, E = Math.floor((k - L) / 2 + L);
    return I(p.charCodeAt(p.length - E)) && E--, E;
  }
  function r(p, y) {
    var L = p.length > y.length ? p : y, k = p.length > y.length ? y : p;
    if (L.length < 4 || k.length * 2 < L.length) return null;
    function E(B, J, ue) {
      for (var ve = B.substring(ue, ue + Math.floor(B.length / 4)), Q = -1, te = "", ee, se, ae, de; (Q = J.indexOf(ve, Q + 1)) !== -1; ) {
        var Se = o(B.substring(ue), J.substring(Q)), De = f(B.substring(0, ue), J.substring(0, Q));
        te.length < De + Se && (te = J.substring(Q - De, Q) + J.substring(Q, Q + Se), ee = B.substring(0, ue - De), se = B.substring(ue + Se), ae = J.substring(0, Q - De), de = J.substring(Q + Se));
      }
      return te.length * 2 >= B.length ? [ee, se, ae, de, te] : null;
    }
    var C = E(L, k, Math.ceil(L.length / 4)), D = E(L, k, Math.ceil(L.length / 2)), $;
    if (!C && !D) return null;
    D ? C ? $ = C[4].length > D[4].length ? C : D : $ = D : $ = C;
    var W, R, P, O;
    p.length > y.length ? (W = $[0], R = $[1], P = $[2], O = $[3]) : (P = $[0], O = $[1], W = $[2], R = $[3]);
    var G = $[4];
    return [W, R, P, O, G];
  }
  function c(p) {
    for (var y = false, L = [], k = 0, E = null, C = 0, D = 0, $ = 0, W = 0, R = 0; C < p.length; ) p[C][0] == n ? (L[k++] = C, D = W, $ = R, W = 0, R = 0, E = p[C][1]) : (p[C][0] == e ? W += p[C][1].length : R += p[C][1].length, E && E.length <= Math.max(D, $) && E.length <= Math.max(W, R) && (p.splice(L[k - 1], 0, [t, E]), p[L[k - 1] + 1][0] = e, k--, k--, C = k > 0 ? L[k - 1] : -1, D = 0, $ = 0, W = 0, R = 0, E = null, y = true)), C++;
    for (y && _(p), w(p), C = 1; C < p.length; ) {
      if (p[C - 1][0] == t && p[C][0] == e) {
        var P = p[C - 1][1], O = p[C][1], G = d(P, O), B = d(O, P);
        G >= B ? (G >= P.length / 2 || G >= O.length / 2) && (p.splice(C, 0, [n, O.substring(0, G)]), p[C - 1][1] = P.substring(0, P.length - G), p[C + 1][1] = O.substring(G), C++) : (B >= P.length / 2 || B >= O.length / 2) && (p.splice(C, 0, [n, P.substring(0, B)]), p[C - 1][0] = e, p[C - 1][1] = O.substring(0, O.length - B), p[C + 1][0] = t, p[C + 1][1] = P.substring(B), C++), C++;
      }
      C++;
    }
  }
  var v = /[^a-zA-Z0-9]/, b = /\s/, m = /[\r\n]/, x = /\n\r?\n$/, g = /^\r?\n\r?\n/;
  function w(p) {
    function y(B, J) {
      if (!B || !J) return 6;
      var ue = B.charAt(B.length - 1), ve = J.charAt(0), Q = ue.match(v), te = ve.match(v), ee = Q && ue.match(b), se = te && ve.match(b), ae = ee && ue.match(m), de = se && ve.match(m), Se = ae && B.match(x), De = de && J.match(g);
      return Se || De ? 5 : ae || de ? 4 : Q && !ee && se ? 3 : ee || se ? 2 : Q || te ? 1 : 0;
    }
    for (var L = 1; L < p.length - 1; ) {
      if (p[L - 1][0] == n && p[L + 1][0] == n) {
        var k = p[L - 1][1], E = p[L][1], C = p[L + 1][1], D = f(k, E);
        if (D) {
          var $ = E.substring(E.length - D);
          k = k.substring(0, k.length - D), E = $ + E.substring(0, E.length - D), C = $ + C;
        }
        for (var W = k, R = E, P = C, O = y(k, E) + y(E, C); E.charAt(0) === C.charAt(0); ) {
          k += E.charAt(0), E = E.substring(1) + C.charAt(0), C = C.substring(1);
          var G = y(k, E) + y(E, C);
          G >= O && (O = G, W = k, R = E, P = C);
        }
        p[L - 1][1] != W && (W ? p[L - 1][1] = W : (p.splice(L - 1, 1), L--), p[L][1] = R, P ? p[L + 1][1] = P : (p.splice(L + 1, 1), L--));
      }
      L++;
    }
  }
  function _(p, y) {
    p.push([n, ""]);
    for (var L = 0, k = 0, E = 0, C = "", D = "", $; L < p.length; ) {
      if (L < p.length - 1 && !p[L][1]) {
        p.splice(L, 1);
        continue;
      }
      switch (p[L][0]) {
        case e:
          E++, D += p[L][1], L++;
          break;
        case t:
          k++, C += p[L][1], L++;
          break;
        case n:
          var W = L - E - k - 1;
          if (y) {
            if (W >= 0 && T(p[W][1])) {
              var R = p[W][1].slice(-1);
              if (p[W][1] = p[W][1].slice(0, -1), C = R + C, D = R + D, !p[W][1]) {
                p.splice(W, 1), L--;
                var P = W - 1;
                p[P] && p[P][0] === e && (E++, D = p[P][1] + D, P--), p[P] && p[P][0] === t && (k++, C = p[P][1] + C, P--), W = P;
              }
            }
            if (S(p[L][1])) {
              var R = p[L][1].charAt(0);
              p[L][1] = p[L][1].slice(1), C += R, D += R;
            }
          }
          if (L < p.length - 1 && !p[L][1]) {
            p.splice(L, 1);
            break;
          }
          if (C.length > 0 || D.length > 0) {
            C.length > 0 && D.length > 0 && ($ = o(D, C), $ !== 0 && (W >= 0 ? p[W][1] += D.substring(0, $) : (p.splice(0, 0, [n, D.substring(0, $)]), L++), D = D.substring($), C = C.substring($)), $ = f(D, C), $ !== 0 && (p[L][1] = D.substring(D.length - $) + p[L][1], D = D.substring(0, D.length - $), C = C.substring(0, C.length - $)));
            var O = E + k;
            C.length === 0 && D.length === 0 ? (p.splice(L - O, O), L = L - O) : C.length === 0 ? (p.splice(L - O, O, [e, D]), L = L - O + 1) : D.length === 0 ? (p.splice(L - O, O, [t, C]), L = L - O + 1) : (p.splice(L - O, O, [t, C], [e, D]), L = L - O + 2);
          }
          L !== 0 && p[L - 1][0] === n ? (p[L - 1][1] += p[L][1], p.splice(L, 1)) : L++, E = 0, k = 0, C = "", D = "";
          break;
      }
    }
    p[p.length - 1][1] === "" && p.pop();
    var G = false;
    for (L = 1; L < p.length - 1; ) p[L - 1][0] === n && p[L + 1][0] === n && (p[L][1].substring(p[L][1].length - p[L - 1][1].length) === p[L - 1][1] ? (p[L][1] = p[L - 1][1] + p[L][1].substring(0, p[L][1].length - p[L - 1][1].length), p[L + 1][1] = p[L - 1][1] + p[L + 1][1], p.splice(L - 1, 1), G = true) : p[L][1].substring(0, p[L + 1][1].length) == p[L + 1][1] && (p[L - 1][1] += p[L + 1][1], p[L][1] = p[L][1].substring(p[L + 1][1].length) + p[L + 1][1], p.splice(L + 1, 1), G = true)), L++;
    G && _(p, y);
  }
  function N(p) {
    return p >= 55296 && p <= 56319;
  }
  function I(p) {
    return p >= 56320 && p <= 57343;
  }
  function S(p) {
    return I(p.charCodeAt(0));
  }
  function T(p) {
    return N(p.charCodeAt(p.length - 1));
  }
  function A(p) {
    for (var y = [], L = 0; L < p.length; L++) p[L][1].length > 0 && y.push(p[L]);
    return y;
  }
  function F(p, y, L, k) {
    return T(p) || S(k) ? null : A([[n, p], [t, y], [e, L], [n, k]]);
  }
  function q(p, y, L) {
    var k = typeof L == "number" ? { index: L, length: 0 } : L.oldRange, E = typeof L == "number" ? null : L.newRange, C = p.length, D = y.length;
    if (k.length === 0 && (E === null || E.length === 0)) {
      var $ = k.index, W = p.slice(0, $), R = p.slice($), P = E ? E.index : null;
      e: {
        var O = $ + D - C;
        if (P !== null && P !== O || O < 0 || O > D) break e;
        var G = y.slice(0, O), B = y.slice(O);
        if (B !== R) break e;
        var J = Math.min($, O), ue = W.slice(0, J), ve = G.slice(0, J);
        if (ue !== ve) break e;
        var Q = W.slice(J), te = G.slice(J);
        return F(ue, Q, te, R);
      }
      e: {
        if (P !== null && P !== $) break e;
        var ee = $, G = y.slice(0, ee), B = y.slice(ee);
        if (G !== W) break e;
        var se = Math.min(C - ee, D - ee), ae = R.slice(R.length - se), de = B.slice(B.length - se);
        if (ae !== de) break e;
        var Q = R.slice(0, R.length - se), te = B.slice(0, B.length - se);
        return F(W, Q, te, ae);
      }
    }
    if (k.length > 0 && E && E.length === 0) e: {
      var ue = p.slice(0, k.index), ae = p.slice(k.index + k.length), J = ue.length, se = ae.length;
      if (D < J + se) break e;
      var ve = y.slice(0, J), de = y.slice(D - se);
      if (ue !== ve || ae !== de) break e;
      var Q = p.slice(J, C - se), te = y.slice(J, D - se);
      return F(ue, Q, te, ae);
    }
    return null;
  }
  function U(p, y, L, k) {
    return i(p, y, L, k, true);
  }
  return U.INSERT = e, U.DELETE = t, U.EQUAL = n, di = U, di;
}
var so = io();
const lo = no(so);
var at;
(function(t) {
  t.None = "None", t.Up = "Up", t.Down = "Down", t.Both = "Both", t.Short = "Short";
})(at || (at = {}));
class Ti {
  constructor(e, n, i, s, l) {
    this.header = e, this.lines = n, this.unifiedDiffStart = i, this.unifiedDiffEnd = s, this.expansionType = l;
  }
  equals(e) {
    return this === e ? true : this.header.equals(e.header) && this.unifiedDiffStart === e.unifiedDiffStart && this.unifiedDiffEnd === e.unifiedDiffEnd && this.expansionType === e.expansionType && this.lines.length === e.lines.length && this.lines.every((n, i) => n.equals(e.lines[i]));
  }
}
class Ai {
  constructor(e, n, i, s) {
    this.oldStartLine = e, this.oldLineCount = n, this.newStartLine = i, this.newLineCount = s;
  }
  toDiffLineRepresentation() {
    return `@@ -${this.oldStartLine},${this.oldLineCount} +${this.newStartLine},${this.newLineCount} @@`;
  }
  equals(e) {
    return this.oldStartLine === e.oldStartLine && this.oldLineCount === e.oldLineCount && this.newStartLine === e.newStartLine && this.oldStartLine === e.oldStartLine;
  }
}
const Me = "--diff-add-content-highlight--", $e = "--diff-del-content-highlight--";
var ce;
(function(t) {
  t[t.CRLF = 1] = "CRLF", t[t.CR = 2] = "CR", t[t.LF = 3] = "LF", t[t.NEWLINE = 4] = "NEWLINE", t[t.NORMAL = 5] = "NORMAL", t[t.NULL = 6] = "NULL";
})(ce || (ce = {}));
const Ln = (t) => {
  switch (t) {
    case ce.LF:
      return "\u240A";
    case ce.CR:
      return "\u240D";
    case ce.CRLF:
      return "\u240D\u240A";
    default:
      return "";
  }
};
var bs;
(function(t) {
  t[t.SplitGitHub = 1] = "SplitGitHub", t[t.SplitGitLab = 2] = "SplitGitLab", t[t.Split = 3] = "Split", t[t.Unified = 4] = "Unified";
})(bs || (bs = {}));
let Qn = 1e3;
const Ps = (t) => {
  Qn = t;
}, Bs = () => {
  Qn = 1e3;
}, Vs = () => Qn;
function ws(t) {
  return t.location + t.length;
}
function _s(t, e, n, i, s) {
  const l = Math.min(e.length, i.length), a = s ? ws(e) - 1 : e.location, o = s ? ws(i) - 1 : i.location, d = s ? -1 : 1;
  let f = 0;
  for (; Math.abs(f) < l && t[a + f] === n[o + f]; ) f += d;
  return Math.abs(f);
}
function Wn(t) {
  return t.trim().length === 0 || t.length >= Qn;
}
function zs(t, e) {
  const n = t.text, i = e.text, s = n.slice(-2), l = i.slice(-2), a = s === `\r
` ? ce.CRLF : s.endsWith("\r") ? ce.CR : s.endsWith(`
`) ? ce.LF : ce.NULL, o = l === `\r
` ? ce.CRLF : l.endsWith("\r") ? ce.CR : l.endsWith(`
`) ? ce.LF : ce.NULL, d = t.noTrailingNewLine !== e.noTrailingNewLine;
  return a === o && !d ? { addSymbol: void 0, addString: n, delSymbol: void 0, delString: i } : { addSymbol: d ? t.noTrailingNewLine ? ce.NEWLINE : ce.NORMAL : a, addString: a === ce.CRLF ? n.slice(0, -2) : a === ce.CR || a === ce.LF ? n.slice(0, -1) : n, delSymbol: d ? e.noTrailingNewLine ? ce.NEWLINE : ce.NORMAL : o, delString: o === ce.CRLF ? i.slice(0, -2) : o === ce.CR || o === ce.LF ? i.slice(0, -1) : i };
}
function Fi(t, e) {
  const n = t.text, i = e.text, { addString: s, delString: l, addSymbol: a, delSymbol: o } = zs(t, e);
  if (s === l && a && o) return { addRange: { range: { location: s.length, length: n.length - s.length }, hasLineChange: true, newLineSymbol: a }, delRange: { range: { location: l.length, length: i.length - l.length }, hasLineChange: true, newLineSymbol: o } };
  let d = { location: 0, length: l.length }, f = { location: 0, length: s.length };
  if (Wn(n) || Wn(i)) return f.length = 0, d.length = 0, { addRange: { range: f }, delRange: { range: d } };
  const r = _s(l, d, s, f, false);
  d = { location: d.location + r, length: d.length - r }, f = { location: f.location + r, length: f.length - r };
  const c = _s(l, d, s, f, true);
  return d.length -= c, f.length -= c, { addRange: { range: f, hasLineChange: (s.slice(0, f.location) + s.slice(f.location + f.length)).trim().length > 0 }, delRange: { range: d, hasLineChange: (l.slice(0, d.location) + l.slice(d.location + d.length)).trim().length > 0 } };
}
function Ui(t, e) {
  const { addString: n, addSymbol: i, delString: s, delSymbol: l } = zs(t, e);
  if (Wn(n) || Wn(s)) return { addRange: { range: [], hasLineChange: !!i, newLineSymbol: i }, delRange: { range: [], hasLineChange: !!l, newLineSymbol: l } };
  const a = lo(s, n, 0, true);
  let o = 0, d = 0;
  const f = a.filter((c) => c[0] !== -1).map((c) => ({ type: c[0], str: c[1], startIndex: o, endIndex: o + c[1].length - 1, length: (o += c[1].length, c[1].length) })), r = a.filter((c) => c[0] !== 1).map((c) => ({ type: c[0], str: c[1], startIndex: d, endIndex: d + c[1].length - 1, length: (d += c[1].length, c[1].length) }));
  return { addRange: { range: f, hasLineChange: f.some((c) => c.type === 0 && c.str.trim().length > 0), newLineSymbol: i }, delRange: { range: r, hasLineChange: f.some((c) => c.type === 0 && c.str.trim().length > 0), newLineSymbol: l } };
}
var Z;
(function(t) {
  t[t.Context = 0] = "Context", t[t.Add = 1] = "Add", t[t.Delete = 2] = "Delete", t[t.Hunk = 3] = "Hunk";
})(Z || (Z = {}));
class xe {
  constructor(e, n, i, s, l, a = false, o, d, f, r, c, v, b, m) {
    this.text = e, this.type = n, this.originalLineNumber = i, this.oldLineNumber = s, this.newLineNumber = l, this.noTrailingNewLine = a, this.changes = o, this.diffChanges = d, this._diffChanges = f, this.plainTemplate = r, this.plainTemplateMode = c, this.syntaxTemplate = v, this.syntaxTemplateName = b, this.syntaxTemplateMode = m;
  }
  withNoTrailingNewLine(e) {
    return new xe(this.text, this.type, this.originalLineNumber, this.oldLineNumber, this.newLineNumber, e);
  }
  isIncludeableLine() {
    return this.type === Z.Add || this.type === Z.Delete;
  }
  equals(e) {
    return this.text === e.text && this.type === e.type && this.originalLineNumber === e.originalLineNumber && this.oldLineNumber === e.oldLineNumber && this.newLineNumber === e.newLineNumber && this.noTrailingNewLine === e.noTrailingNewLine;
  }
  clone(e) {
    return new xe(e, this.type, this.originalLineNumber, this.oldLineNumber, this.newLineNumber, this.noTrailingNewLine);
  }
}
const Vt = (t) => t ? t.type === Z.Add || t.type === Z.Delete : false, oo = /["'&<>]/;
function Oi(t) {
  const e = "" + t, n = oo.exec(e);
  if (!n) return e;
  let i = "", s, l, a = 0;
  for (l = n.index; l < e.length; l++) {
    switch (e.charCodeAt(l)) {
      case 34:
        s = "&quot;";
        break;
      case 38:
        s = "&amp;";
        break;
      case 39:
        s = "&#39;";
        break;
      case 60:
        s = "&lt;";
        break;
      case 62:
        s = "&gt;";
        break;
      default:
        continue;
    }
    a !== l && (i += e.slice(a, l)), a = l + 1, i += s;
  }
  return a !== l ? i + e.slice(a, l) : i;
}
let Qt = false;
const zt = (t) => t;
let Tn = zt, An = zt;
const Gs = (t) => {
  if (typeof t != "function") throw new Error("Transform must be a function");
  Tn = t, Qt = true;
}, Ks = (t) => {
  if (typeof t != "function") throw new Error("Transform must be a function");
  An = t, Qt = true;
}, Zs = () => {
  Qt = false, Tn = zt, An = zt;
}, vt = () => Qt, mt = (t) => Qt && zt !== Tn ? Tn(t) : t, Pi = (t) => Qt && zt !== An ? An(t) : t;
let Bi = false;
const Vi = () => Bi, qs = (t) => {
  Bi = t;
}, Ys = () => {
  Bi = false;
};
let zi = true;
const Sn = () => zi, Js = (t) => {
  zi = t;
}, Qs = () => {
  zi = true;
}, xt = (t) => Oi(t).replace(/\n/g, "").replace(/\r/g, ""), Gt = ({ diffLine: t, rawLine: e, operator: n }) => {
  if (t.plainTemplate && t.plainTemplateMode === "relative") return;
  const i = t.changes;
  if (!i || !i.hasLineChange || !e) return;
  const s = vt() ? mt : xt, l = i.range, a = e.slice(0, l.location), o = e.slice(l.location, l.location + l.length), d = e.slice(l.location + l.length), f = o.includes(`
`), r = i.newLineSymbol;
  let c = `<span data-range-start="${l.location}" data-range-end="${l.location + l.length}">`;
  c += s(a), c += `<span data-diff-highlight style="background-color: var(${n === "add" ? Me : $e});border-radius: 0.2em;">`, c += f ? `${s(o)}<span data-newline-symbol>${Ln(r)}</span>` : s(o), c += "</span>", c += s(d), c += "</span>", t.plainTemplate = c, t.plainTemplateMode = "relative";
}, Fn = ({ diffLine: t, rawLine: e, operator: n }) => {
  if (t.plainTemplate && t.plainTemplateMode === "fast-diff") return;
  const i = t.diffChanges;
  if (!i || !i.hasLineChange || !e) return;
  const s = vt() ? mt : xt;
  let l = "";
  i.range.forEach(({ type: a, str: o, startIndex: d, endIndex: f }, r, c) => {
    const v = r === c.length - 1;
    a === 0 ? (l += `<span>${s(o)}`, l += v && i.newLineSymbol ? `<span data-newline-symbol data-diff-highlight style="background-color: var(${n === "add" ? Me : $e});border-radius: 0.2em;">${Ln(i.newLineSymbol)}</span>` : "", l += "</span>") : (l += `<span data-range-start="${d}" data-range-end="${f}">`, l += `<span data-diff-highlight style="background-color: var(${n === "add" ? Me : $e});border-radius: 0.2em;">${s(o)}`, l += v && i.newLineSymbol ? `<span data-newline-symbol data-diff-highlight>${Ln(i.newLineSymbol)}</span>` : "", l += "</span></span>");
  }), t.plainTemplate = l, t.plainTemplateMode = "fast-diff";
}, Kt = ({ diffFile: t, diffLine: e, syntaxLine: n, operator: i }) => {
  var s;
  if (!n || e.syntaxTemplate && e.syntaxTemplateMode === "relative" && e.syntaxTemplateName === t._getHighlighterName() && t._getHighlighterType() === "class") return;
  const l = e.changes;
  if (!l || !l.hasLineChange) return;
  const a = vt() ? mt : xt, o = l.range;
  let d = `<span data-range-start="${o.location}" data-range-end="${o.location + o.length}">`;
  (s = n == null ? void 0 : n.nodeList) === null || s === void 0 || s.forEach(({ node: f, wrapper: r }) => {
    var c, v, b, m, x, g;
    if (f.endIndex < o.location || o.location + o.length < f.startIndex) d += `<span data-start="${f.startIndex}" data-end="${f.endIndex}" class="${(v = ((c = r == null ? void 0 : r.properties) === null || c === void 0 ? void 0 : c.className) || []) === null || v === void 0 ? void 0 : v.join(" ")}" style="${((b = r == null ? void 0 : r.properties) === null || b === void 0 ? void 0 : b.style) || ""}">${a(f.value)}</span>`;
    else {
      const w = o.location - f.startIndex, _ = w < 0 ? 0 : w, N = f.value.slice(0, _), I = f.value.slice(_, w + o.length), S = f.value.slice(w + o.length), T = N.length || o.location === f.startIndex, A = S.length || f.endIndex === o.location + o.length - 1, F = I.includes(`
`);
      d += `<span data-start="${f.startIndex}" data-end="${f.endIndex}" class="${(x = ((m = r == null ? void 0 : r.properties) === null || m === void 0 ? void 0 : m.className) || []) === null || x === void 0 ? void 0 : x.join(" ")}" style="${((g = r == null ? void 0 : r.properties) === null || g === void 0 ? void 0 : g.style) || ""}">${a(N)}<span data-diff-highlight style="background-color: var(${i === "add" ? Me : $e});border-top-left-radius: ${T ? "0.2em" : "0"};border-bottom-left-radius: ${T ? "0.2em" : "0"};border-top-right-radius: ${A || F ? "0.2em" : "0"};border-bottom-right-radius: ${A || F ? "0.2em" : "0"}">${F ? `${a(I)}<span data-newline-symbol>${Ln(l.newLineSymbol)}</span>` : a(I)}</span>${a(S)}</span>`;
    }
  }), d += "</span>", e.syntaxTemplate = d, e.syntaxTemplateMode = "relative", e.syntaxTemplateName = t._getHighlighterName();
}, Un = ({ diffFile: t, diffLine: e, syntaxLine: n, operator: i }) => {
  var s, l, a;
  if (!n || e.syntaxTemplate && e.syntaxTemplateMode === "fast-diff" && e.syntaxTemplateName === t._getHighlighterName() && t._getHighlighterType() === "class") return;
  const o = e.diffChanges, d = e._diffChanges;
  if (!o || !o.hasLineChange) return;
  const f = vt() ? mt : xt;
  let r = "";
  const c = ((s = o == null ? void 0 : o.range) === null || s === void 0 ? void 0 : s.filter((m) => m.type !== 0)) || [], v = ((l = d == null ? void 0 : d.range) === null || l === void 0 ? void 0 : l.filter((m) => m.type !== 0)) || [];
  let b = 0;
  (a = n == null ? void 0 : n.nodeList) === null || a === void 0 || a.forEach(({ node: m, wrapper: x }, g, w) => {
    var _, N, I;
    r += `<span data-start="${m.startIndex}" data-end="${m.endIndex}" class="${(N = ((_ = x == null ? void 0 : x.properties) === null || _ === void 0 ? void 0 : _.className) || []) === null || N === void 0 ? void 0 : N.join(" ")}" style="${((I = x == null ? void 0 : x.properties) === null || I === void 0 ? void 0 : I.style) || ""}">`;
    let S = c[b];
    const T = c.length === 0 && v.length === 0, A = g === w.length - 1;
    for (let F = 0; F < m.value.length; F++) {
      const q = m.startIndex + F, U = m.value[F], p = F === m.value.length - 1, y = A && F === m.value.length - 1;
      if (S) if (q < S.startIndex) r += f(U);
      else if (q === S.startIndex) S.endIndex <= m.endIndex ? r += `<span data-diff-highlight style="background-color: var(${i === "add" ? Me : $e});border-radius: 0.2em;">` : r += `<span data-diff-highlight style="background-color: var(${i === "add" ? Me : $e});border-top-left-radius: 0.2em;border-bottom-left-radius: 0.2em;">`, r += f(U), (p || S.startIndex === S.endIndex) && (r += "</span>"), S.endIndex === q && (b++, S = c[b]);
      else if (q < S.endIndex) {
        if (F === 0) {
          const L = S.startIndex >= m.startIndex && S.endIndex <= m.endIndex, k = S.endIndex <= m.endIndex;
          r += L ? `<span data-diff-highlight style="background-color: var(${i === "add" ? Me : $e});border-radius: 0.2em;">` : k ? `<span data-diff-highlight style="background-color: var(${i === "add" ? Me : $e});border-top-right-radius: 0.2em;border-bottom-right-radius: 0.2em;">` : `<span data-diff-highlight style="background-color: var(${i === "add" ? Me : $e});">`;
        }
        r += f(U), p && (r += "</span>");
      } else q === S.endIndex && (S.startIndex >= m.startIndex || F === 0 && (r += `<span data-diff-highlight style="background-color: var(${i === "add" ? Me : $e});border-top-right-radius: 0.2em;border-bottom-right-radius: 0.2em;">`), r += f(U), r += "</span>", b++, S = c[b]);
      else r += f(U), T && y && o.newLineSymbol && (r += `<span data-diff-highlight style="background-color: var(${i === "add" ? Me : $e});border-radius: 0.2em;">`, r += `<span data-newline-symbol>${Ln(o.newLineSymbol)}</span></span>`);
    }
    r += "</span>";
  }), e.syntaxTemplate = r, e.syntaxTemplateMode = "fast-diff", e.syntaxTemplateName = t._getHighlighterName();
}, Xn = (t) => {
  var e;
  let n = "";
  const i = vt() ? mt : xt;
  return (e = t == null ? void 0 : t.nodeList) === null || e === void 0 || e.forEach(({ node: s, wrapper: l }) => {
    var a, o, d;
    n += `<span data-start="${s.startIndex}" data-end="${s.endIndex}" class="${(o = ((a = l == null ? void 0 : l.properties) === null || a === void 0 ? void 0 : a.className) || []) === null || o === void 0 ? void 0 : o.join(" ")}" style="${((d = l == null ? void 0 : l.properties) === null || d === void 0 ? void 0 : d.style) || ""}">${i(s.value)}</span>`;
  }), n;
}, ei = (t) => t ? (vt() ? mt : xt)(t) : "", Gi = 40;
function Ki(t, e) {
  throw new Error(e);
}
function Zi(t) {
  var e, n;
  if (t.length === 0) return 0;
  for (let i = t.length - 1; i >= 0; i--) {
    const s = t[i];
    for (let l = s.lines.length - 1; l >= 0; l--) {
      const a = s.lines[l];
      if (a.type === Z.Hunk) continue;
      const o = (e = a.newLineNumber) !== null && e !== void 0 ? e : 0, d = (n = a.oldLineNumber) !== null && n !== void 0 ? n : 0;
      return o > d ? o : d;
    }
  }
  return 0;
}
function qi(t, e, n) {
  const i = n === null ? 1 / 0 : e.oldStartLine - n.header.oldStartLine - n.header.oldLineCount;
  return t === 0 ? e.oldStartLine > 1 && e.newStartLine > 1 ? at.Up : at.None : i <= Gi ? at.Short : at.Both;
}
const Xt = (t, e) => {
  const n = [];
  for (let i = 0; i < t; i++) n.push(e(i));
  return n;
}, On = (t) => {
  const e = t.lastIndexOf(".");
  return t.slice(e + 1);
}, Pn = (t, e, { diffFile: n, getAdditionRaw: i, getDeletionRaw: s, getAdditionSyntax: l, getDeletionSyntax: a }) => {
  if (t.length === e.length) {
    const o = t.length;
    for (let d = 0; d < o; d++) {
      const f = t[d], r = e[d];
      if (!f.changes || !r.changes) {
        const v = xe.prototype.clone.call(f, i(f.newLineNumber) || f.text || ""), b = xe.prototype.clone.call(r, s(r.oldLineNumber) || r.text || ""), { addRange: m, delRange: x } = Fi(v, b);
        f.changes = m, r.changes = x;
      }
      const c = Sn();
      if (!Vi()) c && (Gt({ diffLine: f, rawLine: i(f.newLineNumber) || "", operator: "add" }), Gt({ diffLine: r, rawLine: s(r.oldLineNumber) || "", operator: "del" }), Kt({ diffFile: n, diffLine: f, syntaxLine: l(f.newLineNumber) || null, operator: "add" }), Kt({ diffFile: n, diffLine: r, syntaxLine: a(r.oldLineNumber) || null, operator: "del" }));
      else {
        const v = xe.prototype.clone.call(f, i(f.newLineNumber) || f.text || ""), b = xe.prototype.clone.call(r, s(r.oldLineNumber) || r.text || ""), { addRange: m, delRange: x } = Ui(v, b);
        f.diffChanges = m, r.diffChanges = x, f._diffChanges = x, r._diffChanges = m, c && (Fn({ diffLine: f, rawLine: i(f.newLineNumber) || "", operator: "add" }), Fn({ diffLine: r, rawLine: s(r.oldLineNumber) || "", operator: "del" }), Un({ diffFile: n, diffLine: f, syntaxLine: l(f.newLineNumber) || null, operator: "add" }), Un({ diffFile: n, diffLine: r, syntaxLine: a(r.oldLineNumber) || null, operator: "del" }));
      }
    }
  }
}, ro = /^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/, Yi = /[\u202A-\u202E]|[\u2066-\u2069]/, Xs = "+", el = "-", tl = " ", nl = "\\", il = `
`, ao = /* @__PURE__ */ new Set([Xs, el, tl, nl, il]);
class Ji {
  constructor() {
    Object.defineProperty(this, "__v_skip", { value: true }), this.reset();
  }
  reset() {
    this.ls = 0, this.le = -1, this.text = "";
  }
  nextLine() {
    return this.ls = this.le + 1, this.ls >= this.text.length ? false : (this.le = this.text.indexOf(`
`, this.ls), this.le === -1 && (this.le = this.text.length), this.ls !== this.le);
  }
  readLine(e) {
    return e ? this.nextLine() ? this.text.substring(this.ls, this.le) : null : this.nextLine() ? this.text.substring(this.ls + 1, this.le + 1) : this.text.length > this.ls ? `
` : null;
  }
  lineStartsWith(e) {
    return this.text.startsWith(e, this.ls);
  }
  lineEndsWith(e) {
    return this.text.endsWith(e, this.le);
  }
  peek() {
    const e = this.le + 1;
    return e < this.text.length ? this.text[e] : null;
  }
  parseDiffHeader() {
    for (; this.nextLine(); ) {
      if (this.lineStartsWith("Binary files ") && this.lineEndsWith("differ")) return { isBinary: true };
      if (this.lineStartsWith("---"), this.lineStartsWith("+++")) return { isBinary: false };
    }
    return null;
  }
  numberFromGroup(e, n, i = null) {
    const s = e[n];
    if (!s) {
      if (!i) throw new Error(`Group ${n} missing from regexp match and no defaultValue was provided`);
      return i;
    }
    const l = parseInt(s, 10);
    if (isNaN(l)) throw new Error(`Could not parse capture group ${n} into number: ${s}`);
    return l;
  }
  parseHunkHeader(e) {
    const n = ro.exec(e);
    if (!n) throw new Error("Invalid hunk header format");
    const i = this.numberFromGroup(n, 1), s = this.numberFromGroup(n, 2, 1), l = this.numberFromGroup(n, 3), a = this.numberFromGroup(n, 4, 1);
    return new Ai(i, s, l, a);
  }
  parseLinePrefix(e) {
    return e && e.length && ao.has(e[0]) ? e[0] : null;
  }
  parseHunk(e, n, i) {
    const s = this.readLine(true);
    if (!s) throw new Error("Expected hunk header but reached end of diff");
    const l = this.parseHunkHeader(s), a = new Array();
    a.push(new xe(s, Z.Hunk, 1, null, null));
    let o, d = l.oldStartLine, f = l.newStartLine, r = e;
    for (; o = this.parseLinePrefix(this.peek()); ) {
      const c = this.readLine(false);
      if (c === null) throw new Error("Expected unified diff line but reached end of diff");
      if (o === nl) {
        if (c.length < 12) throw new Error('Expected "no newline at end of file" marker to be at least 12 bytes long');
        const b = a.length - 1, m = a[b];
        a[b] = m.withNoTrailingNewLine(true);
        continue;
      }
      r++;
      let v;
      if (o === Xs) v = new xe(c, Z.Add, r, null, f++);
      else if (o === el) v = new xe(c, Z.Delete, r, d++, null);
      else if (o === tl || o === il) v = new xe(c, Z.Context, r, d++, f++);
      else return Ki(o, `Unknown DiffLinePrefix: ${o}`);
      a.push(v);
    }
    if (a.length === 1) throw new Error("Malformed diff, empty hunk");
    return new Ti(l, a, e, e + a.length - 1, qi(n, l, i));
  }
  parse(e) {
    this.text = e;
    try {
      const n = this.parseDiffHeader(), i = this.le, s = this.text.substring(0, i);
      if (!n) return { header: s, contents: "", hunks: [], isBinary: false, maxLineNumber: 0, hasHiddenBidiChars: false };
      if (n.isBinary) return { header: s, contents: "", hunks: [], isBinary: true, maxLineNumber: 0, hasHiddenBidiChars: false };
      const l = new Array();
      let a = 0, o = null;
      for (; this.peek(); ) {
        const f = this.parseHunk(a, l.length, o);
        l.push(f), o = f, a += f.lines.length;
      }
      const d = this.text.substring(i + 1, this.le).replace(/\n\\ No newline at end of file/g, "");
      return { header: s, contents: d, hunks: l, isBinary: n.isBinary, maxLineNumber: Zi(l), hasHiddenBidiChars: Yi.test(e) };
    } finally {
      this.reset();
    }
  }
}
const Qi = new Ji();
function u(t, e, n, i) {
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? t !== e || !i : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? i : n === "a" ? i.call(t) : i ? i.value : e.get(t);
}
function H(t, e, n, i, s) {
  if (typeof e == "function" ? t !== e || true : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(t, n), n;
}
var Hn, cn, Wt, xi;
class co extends Map {
  constructor() {
    super(...arguments), Hn.add(this), cn.set(this, []), Wt.set(this, 30);
  }
  get maxLength() {
    return u(this, Wt, "f");
  }
  setMaxLength(e) {
    H(this, Wt, e), u(this, Hn, "m", xi).call(this);
  }
  set(e, n) {
    return u(this, Wt, "f") <= 0 ? this : this.has(e) ? this : (u(this, cn, "f").push(e), u(this, Hn, "m", xi).call(this), super.set(e, n));
  }
}
cn = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ new WeakMap(), Hn = /* @__PURE__ */ new WeakSet(), xi = function() {
  for (; u(this, cn, "f").length > u(this, Wt, "f"); ) {
    const e = u(this, cn, "f").shift();
    e && this.delete(e);
  }
};
var sl, nn;
const qe = new co();
qe.setMaxLength(50);
qe.name = "@git-diff-view/core";
const ci = /* @__PURE__ */ new Set();
class jt {
  static createInstance(e) {
    const n = new jt(e == null ? void 0 : e.raw, e == null ? void 0 : e.lang, e == null ? void 0 : e.fileName);
    return n.ast = e == null ? void 0 : e.ast, n.theme = e == null ? void 0 : e.theme, n.rawFile = (e == null ? void 0 : e.rawFile) || {}, n.plainFile = (e == null ? void 0 : e.plainFile) || {}, n.hasDoRaw = e == null ? void 0 : e.hasDoRaw, n.rawLength = e == null ? void 0 : e.rawLength, n.syntaxFile = (e == null ? void 0 : e.syntaxFile) || {}, n.hasDoSyntax = e == null ? void 0 : e.hasDoSyntax, n.syntaxLength = e == null ? void 0 : e.syntaxLength, n.highlighterName = e == null ? void 0 : e.highlighterName, n.highlighterType = e == null ? void 0 : e.highlighterType, n.maxLineNumber = e == null ? void 0 : e.maxLineNumber, n;
  }
  constructor(e, n, i) {
    sl.add(this), this.raw = e, this.lang = n, this.fileName = i, nn.set(this, ""), this.rawFile = {}, this.hasDoRaw = false, this.syntaxFile = {}, this.plainFile = {}, this.hasDoSyntax = false, this.maxLineNumber = 0, this.raw = Pi(e), Object.defineProperty(this, "__v_skip", { value: true }), this.initId();
  }
  initId() {
    let e = "-file--" + Math.random().toString().slice(2);
    for (; ci.has(e); ) e = "-file--" + Math.random().toString().slice(2);
    ci.add(e), H(this, nn, e);
  }
  getId() {
    return u(this, nn, "f");
  }
  clearId() {
    ci.delete(u(this, nn, "f"));
  }
  doSyntax({ registerHighlighter: e, theme: n }) {
    if (!this.raw) return;
    const i = e || Bt;
    if (this.rawLength && this.rawLength > i.maxLineToIgnoreSyntax) return;
    let s = i;
    try {
      i.hasRegisteredCurrentLang(this.lang) || (s = Bt);
    } catch {
      s = Bt;
    }
    if (this.hasDoSyntax && s.name === this.highlighterName && s.type === this.highlighterType && (this.theme === n || s.type === "class") || (this.ast = s.getAST(this.raw, this.fileName, this.lang, n), this.theme = n, !this.ast)) return;
    const { syntaxFileObject: l, syntaxFileLineNumber: a } = s.processAST(this.ast);
    Sn() && Object.values(l).forEach((o) => {
      o.template = Xn(o);
    }), this.syntaxFile = l, this.syntaxLength = a, this.highlighterName = s.name, this.highlighterType = s.type, this.hasDoSyntax = true;
  }
  doRaw() {
    if (!this.raw || this.hasDoRaw) return;
    const n = this.raw.split(`
`);
    this.rawLength = n.length, this.maxLineNumber = n.length, this.rawFile = {}, this.plainFile = {};
    const i = Sn();
    for (let s = 0; s < n.length; s++) this.rawFile[s + 1] = s < n.length - 1 ? n[s] + `
` : n[s], this.plainFile[s + 1] = { value: this.rawFile[s + 1], template: i ? ei(this.rawFile[s + 1]) : void 0 };
    this.hasDoRaw = true;
  }
}
nn = /* @__PURE__ */ new WeakMap(), sl = /* @__PURE__ */ new WeakSet();
function it(t, e, n, i, s) {
  let l = t + "--0.1.7--" + n + "--" + e;
  s && (l = s + "--0.1.7--" + n + "--" + e);
  let a = t + "--0.1.7--" + (n === "light" ? "dark" : "light") + "--" + e;
  if (s && (a = s + "--0.1.7--" + (n === "light" ? "dark" : "light") + "--" + e), qe.has(l)) return qe.get(l);
  if (qe.has(a)) {
    const d = qe.get(a);
    if ((d == null ? void 0 : d.highlighterType) === "class") return d;
  }
  const o = new jt(t, e, i);
  return qe.set(l, o), o;
}
const ti = qe, ll = () => qe.setMaxLength(0);
var Ie;
(function(t) {
  t[t.hunk = 1] = "hunk", t[t.content = 2] = "content", t[t.widget = 3] = "widget", t[t.extend = 4] = "extend";
})(Ie || (Ie = {}));
var j;
(function(t) {
  t[t.old = 1] = "old", t[t.new = 2] = "new";
})(j || (j = {}));
const ol = (t) => {
  const e = t.splitLineLength, n = [];
  return Xt(e, (i) => {
    n.push({ type: Ie.hunk, index: i, lineNumber: i + 1 }), n.push({ type: Ie.content, index: i, lineNumber: i + 1 }), n.push({ type: Ie.widget, index: i, lineNumber: i + 1 }), n.push({ type: Ie.extend, index: i, lineNumber: i + 1 });
  }), n;
}, ni = (t) => {
  const e = t.splitLineLength, n = [];
  return Xt(e, (i) => {
    const s = t.getSplitLeftLine(i), l = t.getSplitRightLine(i);
    !(s == null ? void 0 : s.isHidden) && !(l == null ? void 0 : l.isHidden) && n.push({ type: Ie.content, index: i, lineNumber: i + 1, splitLine: { left: s, right: l } });
  }), n;
}, rl = (t) => {
  const e = t.unifiedLineLength, n = [];
  return Xt(e, (i) => {
    n.push({ type: Ie.hunk, index: i, lineNumber: i + 1 }), n.push({ type: Ie.content, index: i, lineNumber: i + 1 }), n.push({ type: Ie.widget, index: i, lineNumber: i + 1 }), n.push({ type: Ie.extend, index: i, lineNumber: i + 1 });
  }), n;
}, Xi = (t) => {
  const e = t.unifiedLineLength, n = [];
  return Xt(e, (i) => {
    const s = t.getUnifiedLine(i);
    s.isHidden || n.push({ type: Ie.content, index: i, lineNumber: i + 1, unifiedLine: s });
  }), n;
}, ii = (t, e, n) => {
  const i = t.getSplitLineByLineNumber(e, n), s = t.getUnifiedLineByLineNumber(e, n);
  return { split: !i || i.isHidden, unified: !s || s.isHidden };
};
var z, oe, re, dt, ct, ut, ft, Nt, yt, Tt, At, Fe, Ue, Ge, Ke, be, fe, he, le, pe, Ve, Dt, Mt, $t, Rt, sn, St, ln, un, fn, st, lt, Dn, _e, wt, _t, on, ze, al, dl, bi, cl, wi, _i, Ls, ul, Ft, Ut, hn, pn, Ss, Ns;
let X = 40;
const fl = () => X, hl = (t) => {
  X = t;
}, pl = () => {
  X = 40;
}, ui = /* @__PURE__ */ new Set();
class ht {
  static createInstance(e, n) {
    var i, s, l, a, o, d;
    const f = new ht(((i = e == null ? void 0 : e.oldFile) === null || i === void 0 ? void 0 : i.fileName) || "", ((s = e == null ? void 0 : e.oldFile) === null || s === void 0 ? void 0 : s.content) || "", ((l = e == null ? void 0 : e.newFile) === null || l === void 0 ? void 0 : l.fileName) || "", ((a = e == null ? void 0 : e.newFile) === null || a === void 0 ? void 0 : a.content) || "", (e == null ? void 0 : e.hunks) || [], ((o = e == null ? void 0 : e.oldFile) === null || o === void 0 ? void 0 : o.fileLang) || "", ((d = e == null ? void 0 : e.newFile) === null || d === void 0 ? void 0 : d.fileLang) || "");
    return n && (n.isFullMerge ? f._mergeFullBundle(n) : f.mergeBundle(n)), f;
  }
  constructor(e, n, i, s, l, a, o, d) {
    z.add(this), this.uuid = d, oe.set(this, void 0), re.set(this, void 0), dt.set(this, void 0), ct.set(this, void 0), ut.set(this, void 0), ft.set(this, void 0), Nt.set(this, void 0), yt.set(this, void 0), Tt.set(this, void 0), At.set(this, void 0), Fe.set(this, void 0), Ue.set(this, void 0), Ge.set(this, void 0), Ke.set(this, void 0), be.set(this, []), fe.set(this, []), he.set(this, void 0), le.set(this, []), pe.set(this, void 0), Ve.set(this, []), Dt.set(this, false), Mt.set(this, false), $t.set(this, false), Rt.set(this, false), sn.set(this, 0), St.set(this, false), ln.set(this, false), un.set(this, false), fn.set(this, false), st.set(this, void 0), lt.set(this, void 0), Dn.set(this, false), _e.set(this, "light"), wt.set(this, { state: false }), _t.set(this, { state: false }), this._version_ = "0.1.7", this._oldFileName = "", this._oldFileContent = "", this._oldFileLang = "", this._newFileName = "", this._newFileContent = "", this._newFileLang = "", this._diffList = [], this.diffLineLength = 0, this.splitLineLength = 0, this.unifiedLineLength = 0, this.fileLineLength = 0, this.additionLength = 0, this.deletionLength = 0, this.hasSomeLineCollapsed = false, on.set(this, ""), ze.set(this, /* @__PURE__ */ new Map()), this.getSplitLeftLine = (r) => u(this, be, "f")[r], this.getSplitLineByLineNumber = (r, c) => {
      var v, b;
      return c === j.old ? (v = u(this, be, "f")) === null || v === void 0 ? void 0 : v.find((m) => m.lineNumber === r) : (b = u(this, fe, "f")) === null || b === void 0 ? void 0 : b.find((m) => m.lineNumber === r);
    }, this.getSplitLineIndexByLineNumber = (r, c) => {
      var v, b;
      return c === j.old ? (v = u(this, be, "f")) === null || v === void 0 ? void 0 : v.findIndex((m) => m.lineNumber === r) : (b = u(this, fe, "f")) === null || b === void 0 ? void 0 : b.findIndex((m) => m.lineNumber === r);
    }, this.getSplitRightLine = (r) => u(this, fe, "f")[r], this.getSplitHunkLine = (r) => {
      var c;
      return (c = u(this, he, "f")) === null || c === void 0 ? void 0 : c[r];
    }, this.onSplitHunkExpand = (r, c, v = true) => {
      var b, m, x;
      if (!this.getExpandEnabled()) return;
      const g = (b = u(this, he, "f")) === null || b === void 0 ? void 0 : b[c];
      if (!(!g || !g.splitInfo)) {
        if (r === "all") {
          for (let w = g.splitInfo.startHiddenIndex; w < g.splitInfo.endHiddenIndex; w++) {
            const _ = u(this, be, "f")[w], N = u(this, fe, "f")[w];
            (_ == null ? void 0 : _.isHidden) && (_.isHidden = false), (N == null ? void 0 : N.isHidden) && (N.isHidden = false);
          }
          g.splitInfo = { ...g.splitInfo, ...g.hunkInfo, plainText: g.text, startHiddenIndex: g.splitInfo.endHiddenIndex };
        } else if (r === "down") {
          for (let w = g.splitInfo.startHiddenIndex; w < g.splitInfo.startHiddenIndex + X; w++) {
            const _ = u(this, be, "f")[w], N = u(this, fe, "f")[w];
            (_ == null ? void 0 : _.isHidden) && (_.isHidden = false), (N == null ? void 0 : N.isHidden) && (N.isHidden = false);
          }
          g.isLast ? g.splitInfo = { ...g.splitInfo, startHiddenIndex: g.splitInfo.startHiddenIndex + X } : g.splitInfo = { ...g.splitInfo, startHiddenIndex: g.splitInfo.startHiddenIndex + X, plainText: `@@ -${g.splitInfo.oldStartIndex},${g.splitInfo.oldLength} +${g.splitInfo.newStartIndex},${g.splitInfo.newLength}` };
        } else if (r === "down-all") {
          for (let w = g.splitInfo.startHiddenIndex; w < g.splitInfo.endHiddenIndex; w++) {
            const _ = u(this, be, "f")[w], N = u(this, fe, "f")[w];
            (_ == null ? void 0 : _.isHidden) && (_.isHidden = false), (N == null ? void 0 : N.isHidden) && (N.isHidden = false);
          }
          g.splitInfo = { ...g.splitInfo, plainText: "", startHiddenIndex: g.splitInfo.endHiddenIndex };
        } else if (r === "up") {
          if (g.isLast) return;
          for (let S = g.splitInfo.endHiddenIndex - X; S < g.splitInfo.endHiddenIndex; S++) {
            const T = u(this, be, "f")[S], A = u(this, fe, "f")[S];
            (T == null ? void 0 : T.isHidden) && (T.isHidden = false), (A == null ? void 0 : A.isHidden) && (A.isHidden = false);
          }
          const w = g.splitInfo.oldStartIndex - X, _ = g.splitInfo.oldLength + X, N = g.splitInfo.newStartIndex - X, I = g.splitInfo.newLength + X;
          g.splitInfo = { ...g.splitInfo, endHiddenIndex: g.splitInfo.endHiddenIndex - X, oldStartIndex: w, oldLength: _, newStartIndex: N, newLength: I, plainText: `@@ -${w},${_} +${N},${I}` }, (m = u(this, he, "f")) === null || m === void 0 || delete m[c], u(this, he, "f")[g.splitInfo.endHiddenIndex] = g;
        } else if (r === "up-all") {
          if (g.isLast) return;
          for (let w = g.splitInfo.startHiddenIndex; w < g.splitInfo.endHiddenIndex; w++) {
            const _ = u(this, be, "f")[w], N = u(this, fe, "f")[w];
            (_ == null ? void 0 : _.isHidden) && (_.isHidden = false), (N == null ? void 0 : N.isHidden) && (N.isHidden = false);
          }
          g.splitInfo = { ...g.splitInfo, plainText: "", endHiddenIndex: g.splitInfo.startHiddenIndex }, (x = u(this, he, "f")) === null || x === void 0 || delete x[c], u(this, he, "f")[g.splitInfo.endHiddenIndex] = g;
        }
        v && this.notifyAll();
      }
    }, this.getUnifiedLine = (r) => u(this, le, "f")[r], this.getUnifiedLineByLineNumber = (r, c) => {
      var v, b;
      return c === j.old ? (v = u(this, le, "f")) === null || v === void 0 ? void 0 : v.find((m) => m.oldLineNumber === r) : (b = u(this, le, "f")) === null || b === void 0 ? void 0 : b.find((m) => m.newLineNumber === r);
    }, this.getUnifiedLineIndexByLineNumber = (r, c) => {
      var v, b;
      return c === j.old ? (v = u(this, le, "f")) === null || v === void 0 ? void 0 : v.findIndex((m) => m.oldLineNumber === r) : (b = u(this, le, "f")) === null || b === void 0 ? void 0 : b.findIndex((m) => m.newLineNumber === r);
    }, this.getUnifiedHunkLine = (r) => {
      var c;
      return (c = u(this, pe, "f")) === null || c === void 0 ? void 0 : c[r];
    }, this.onUnifiedHunkExpand = (r, c, v = true) => {
      var b, m, x, g;
      if (!this.getExpandEnabled()) return;
      const w = (b = u(this, pe, "f")) === null || b === void 0 ? void 0 : b[c];
      if (!(!w || !w.unifiedInfo)) {
        if (r === "all") {
          for (let _ = w.unifiedInfo.startHiddenIndex; _ < w.unifiedInfo.endHiddenIndex; _++) {
            const N = (m = u(this, le, "f")) === null || m === void 0 ? void 0 : m[_];
            (N == null ? void 0 : N.isHidden) && (N.isHidden = false);
          }
          w.unifiedInfo = { ...w.unifiedInfo, ...w.hunkInfo, plainText: w.text, startHiddenIndex: w.unifiedInfo.endHiddenIndex };
        } else if (r === "down") {
          for (let _ = w.unifiedInfo.startHiddenIndex; _ < w.unifiedInfo.startHiddenIndex + X; _++) {
            const N = u(this, le, "f")[_];
            (N == null ? void 0 : N.isHidden) && (N.isHidden = false);
          }
          w.isLast ? w.unifiedInfo = { ...w.unifiedInfo, startHiddenIndex: w.unifiedInfo.startHiddenIndex + X } : w.unifiedInfo = { ...w.unifiedInfo, startHiddenIndex: w.unifiedInfo.startHiddenIndex + X, plainText: `@@ -${w.unifiedInfo.oldStartIndex},${w.unifiedInfo.oldLength} +${w.unifiedInfo.newStartIndex},${w.unifiedInfo.newLength}` };
        } else if (r === "down-all") {
          for (let _ = w.unifiedInfo.startHiddenIndex; _ < w.unifiedInfo.endHiddenIndex; _++) {
            const N = u(this, le, "f")[_];
            (N == null ? void 0 : N.isHidden) && (N.isHidden = false);
          }
          w.unifiedInfo = { ...w.unifiedInfo, plainText: "", startHiddenIndex: w.unifiedInfo.endHiddenIndex };
        } else if (r === "up") {
          if (w.isLast) return;
          for (let T = w.unifiedInfo.endHiddenIndex - X; T < w.unifiedInfo.endHiddenIndex; T++) {
            const A = u(this, le, "f")[T];
            (A == null ? void 0 : A.isHidden) && (A.isHidden = false);
          }
          const _ = w.unifiedInfo.oldStartIndex - X, N = w.unifiedInfo.oldLength + X, I = w.unifiedInfo.newStartIndex - X, S = w.unifiedInfo.newLength + X;
          w.unifiedInfo = { ...w.unifiedInfo, endHiddenIndex: w.unifiedInfo.endHiddenIndex - X, oldStartIndex: _, oldLength: N, newStartIndex: I, newLength: S, plainText: `@@ -${_},${N} +${I},${S}` }, (x = u(this, pe, "f")) === null || x === void 0 || delete x[c], u(this, pe, "f")[w.unifiedInfo.endHiddenIndex] = w;
        } else if (r === "up-all") {
          if (w.isLast) return;
          for (let _ = w.unifiedInfo.startHiddenIndex; _ < w.unifiedInfo.endHiddenIndex; _++) {
            const N = u(this, le, "f")[_];
            (N == null ? void 0 : N.isHidden) && (N.isHidden = false);
          }
          w.unifiedInfo = { ...w.unifiedInfo, plainText: "", endHiddenIndex: w.unifiedInfo.startHiddenIndex }, (g = u(this, pe, "f")) === null || g === void 0 || delete g[c], u(this, pe, "f")[w.unifiedInfo.endHiddenIndex] = w;
        }
        v && this.notifyAll();
      }
    }, this.onAllExpand = (r) => {
      this.getExpandEnabled() && (r === "split" ? (Object.keys(u(this, he, "f") || {}).forEach((c) => {
        this.onSplitHunkExpand("all", +c, false);
      }), u(this, wt, "f").state = true) : (Object.keys(u(this, pe, "f") || {}).forEach((c) => {
        this.onUnifiedHunkExpand("all", +c, false);
      }), u(this, _t, "f").state = true), this.notifyAll());
    }, this.onAllCollapse = (r) => {
      this.getExpandEnabled() && (r === "split" ? (Object.values(u(this, be, "f") || {}).forEach((c) => {
        !c.isHidden && c._isHidden && (c.isHidden = c._isHidden);
      }), Object.values(u(this, fe, "f") || {}).forEach((c) => {
        !c.isHidden && c._isHidden && (c.isHidden = c._isHidden);
      }), Object.values(u(this, he, "f") || {}).forEach((c) => {
        c.splitInfo && (c.splitInfo = { ...c.splitInfo, oldStartIndex: c.splitInfo._oldStartIndex, oldLength: c.splitInfo._oldLength, newStartIndex: c.splitInfo._newStartIndex, newLength: c.splitInfo._newLength, startHiddenIndex: c.splitInfo._startHiddenIndex, endHiddenIndex: c.splitInfo._endHiddenIndex, plainText: c.splitInfo._plainText });
      }), Object.keys(u(this, he, "f") || {}).forEach((c) => {
        const v = u(this, he, "f")[c];
        v.splitInfo && v.splitInfo.endHiddenIndex !== +c && (delete u(this, he, "f")[c], u(this, he, "f")[v.splitInfo.endHiddenIndex] = v);
      }), u(this, wt, "f").state = false) : (Object.values(u(this, le, "f") || {}).forEach((c) => {
        !c.isHidden && c._isHidden && (c.isHidden = c._isHidden);
      }), Object.values(u(this, pe, "f") || {}).forEach((c) => {
        c.unifiedInfo && (c.unifiedInfo = { ...c.unifiedInfo, oldStartIndex: c.unifiedInfo._oldStartIndex, oldLength: c.unifiedInfo._oldLength, newStartIndex: c.unifiedInfo._newStartIndex, newLength: c.unifiedInfo._newLength, startHiddenIndex: c.unifiedInfo._startHiddenIndex, endHiddenIndex: c.unifiedInfo._endHiddenIndex, plainText: c.unifiedInfo._plainText });
      }), Object.keys(u(this, pe, "f") || {}).forEach((c) => {
        const v = u(this, pe, "f")[c];
        v.unifiedInfo && v.unifiedInfo.endHiddenIndex !== +c && (delete u(this, pe, "f")[c], u(this, pe, "f")[v.unifiedInfo.endHiddenIndex] = v);
      }), u(this, _t, "f").state = false), this.notifyAll());
    }, this.getOldFileContent = () => {
      var r;
      return (r = u(this, oe, "f")) === null || r === void 0 ? void 0 : r.raw;
    }, this.getNewFileContent = () => {
      var r;
      return (r = u(this, re, "f")) === null || r === void 0 ? void 0 : r.raw;
    }, this.getOldPlainLine = (r) => {
      var c;
      return (c = u(this, Tt, "f")) === null || c === void 0 ? void 0 : c[r];
    }, this.getOldSyntaxLine = (r) => {
      var c;
      return (c = u(this, Fe, "f")) === null || c === void 0 ? void 0 : c[r];
    }, this.getNewPlainLine = (r) => {
      var c;
      return (c = u(this, At, "f")) === null || c === void 0 ? void 0 : c[r];
    }, this.getNewSyntaxLine = (r) => {
      var c;
      return (c = u(this, Ue, "f")) === null || c === void 0 ? void 0 : c[r];
    }, this.subscribe = (r) => (u(this, Ve, "f").push(r), () => {
      H(this, Ve, u(this, Ve, "f").filter((c) => c !== r));
    }), this.notifyAll = (r) => {
      var c;
      H(this, sn, (c = u(this, sn, "f"), c++, c)), u(this, Ve, "f").forEach((v) => {
        r && v.isSyncExternal || v();
      }), u(this, ze, "f").forEach((v, b) => {
        b.notifyAll(true);
      });
    }, this.getUpdateCount = () => u(this, sn, "f"), this.getExpandEnabled = () => !u(this, St, "f") && !u(this, ln, "f"), this.getBundle = () => {
      const r = u(this, Dt, "f"), c = u(this, Mt, "f"), v = u(this, $t, "f"), b = u(this, Rt, "f"), m = u(this, Nt, "f"), x = u(this, ut, "f"), g = u(this, Tt, "f"), w = u(this, Fe, "f"), _ = u(this, Ge, "f"), N = u(this, yt, "f"), I = u(this, ft, "f"), S = u(this, At, "f"), T = u(this, Ue, "f"), A = u(this, Ke, "f"), F = this.splitLineLength, q = this.unifiedLineLength, U = this.fileLineLength, p = this.additionLength, y = this.deletionLength, L = u(this, St, "f"), k = u(this, ln, "f"), E = u(this, st, "f"), C = u(this, lt, "f"), D = this.hasSomeLineCollapsed, $ = u(this, wt, "f"), W = u(this, _t, "f"), R = u(this, be, "f"), P = u(this, fe, "f"), O = u(this, he, "f"), G = u(this, le, "f"), B = u(this, pe, "f"), J = this._version_, ue = u(this, _e, "f");
      return { hasInitRaw: r, hasInitSyntax: c, hasBuildSplit: v, hasBuildUnified: b, oldFileLines: m, oldFileDiffLines: x, oldFilePlainLines: g, oldFileSyntaxLines: w, oldFilePlaceholderLines: _, newFileLines: N, newFileDiffLines: I, newFilePlainLines: S, newFileSyntaxLines: T, newFilePlaceholderLines: A, splitLineLength: F, unifiedLineLength: q, fileLineLength: U, additionLength: p, deletionLength: y, splitLeftLines: R, splitRightLines: P, splitHunkLines: O, unifiedLines: G, unifiedHunkLines: B, highlighterName: E, highlighterType: C, composeByDiff: L, composeByRange: k, hasSomeLineCollapsed: D, hasExpandSplitAll: $, hasExpandUnifiedAll: W, version: J, theme: ue, isFullMerge: false };
    }, this.mergeBundle = (r, c = true) => {
      H(this, Dt, r.hasInitRaw), H(this, Mt, r.hasInitSyntax), H(this, $t, r.hasBuildSplit), H(this, Rt, r.hasBuildUnified), H(this, St, r.composeByDiff), H(this, ln, r.composeByRange), H(this, st, r.highlighterName), H(this, lt, r.highlighterType), H(this, Nt, r.oldFileLines), H(this, ut, r.oldFileDiffLines), H(this, Tt, r.oldFilePlainLines), H(this, Fe, r.oldFileSyntaxLines), H(this, Ge, r.oldFilePlaceholderLines), H(this, yt, r.newFileLines), H(this, ft, r.newFileDiffLines), H(this, At, r.newFilePlainLines), H(this, Ue, r.newFileSyntaxLines), H(this, Ke, r.newFilePlaceholderLines), this.splitLineLength = r.splitLineLength, this.unifiedLineLength = r.unifiedLineLength, this.fileLineLength = r.fileLineLength, this.additionLength = r.additionLength, this.deletionLength = r.deletionLength, this.hasSomeLineCollapsed = r.hasSomeLineCollapsed, H(this, wt, r.hasExpandSplitAll), H(this, _t, r.hasExpandUnifiedAll), H(this, be, r.splitLeftLines), H(this, fe, r.splitRightLines), H(this, he, r.splitHunkLines), H(this, le, r.unifiedLines), H(this, pe, r.unifiedHunkLines), H(this, _e, r.theme), H(this, un, true), H(this, Dn, true), c && this.notifyAll();
    }, this.generateInstanceFromLineNumberRange = (r, c, v = j.new) => {
      if (r >= c) return this;
      const b = this.getSplitLineIndexByLineNumber(r, v), m = this.getSplitLineIndexByLineNumber(c, v), x = this.getUnifiedLineIndexByLineNumber(r, v), g = this.getUnifiedLineIndexByLineNumber(c, v), w = [], _ = [], N = [];
      for (let S = b; S <= m; S++) {
        const T = this.getSplitLeftLine(S), A = this.getSplitRightLine(S);
        !(T == null ? void 0 : T.value) && !(A == null ? void 0 : A.value) || (w.push({ ...T, isHidden: false }), _.push({ ...A, isHidden: false }));
      }
      for (let S = x; S <= g; S++) {
        const T = this.getUnifiedLine(S);
        (T == null ? void 0 : T.value) && N.push({ ...T, isHidden: false });
      }
      return ht.createInstance({}, { ...this._getFullBundle(), composeByRange: true, splitHunkLines: {}, splitLeftLines: w, splitRightLines: _, splitLineLength: w.length, unifiedHunkLines: {}, unifiedLines: N, unifiedLineLength: N.length });
    }, this._getHighlighterName = () => u(this, st, "f") || "", this._getHighlighterType = () => u(this, lt, "f") || "", this._getIsPureDiffRender = () => u(this, St, "f"), this._getTheme = () => u(this, _e, "f"), this._getIsCloned = () => u(this, Dn, "f"), this._addClonedInstance = (r) => {
      const c = () => {
        this._notifyOthers(r), this._mergeFullBundle(r._getFullBundle(), false);
      };
      c.isSyncExternal = true;
      const v = r.subscribe(c);
      u(this, ze, "f").set(r, v);
    }, this._notifyOthers = (r) => {
      u(this, ze, "f").forEach((c, v) => {
        v !== r && v.notifyAll(true);
      });
    }, this._delClonedInstance = (r) => {
      const c = u(this, ze, "f").get(r);
      c == null ? void 0 : c(), u(this, ze, "f").delete(r);
    }, this._getFullBundle = () => {
      const r = this.getBundle(), c = u(this, oe, "f"), v = u(this, re, "f"), b = u(this, ct, "f"), m = u(this, dt, "f");
      return { ...r, oldFileResult: c, newFileResult: v, diffLines: b, diffListResults: m, isFullMerge: u(this, un, "f") ? u(this, fn, "f") : true };
    }, this._mergeFullBundle = (r, c = true) => {
      this.mergeBundle(r, c);
      try {
        H(this, oe, r.oldFileResult ? jt.createInstance(r.oldFileResult) : null, "f"), H(this, re, r.newFileResult ? jt.createInstance(r.newFileResult) : null, "f"), H(this, ct, r.diffLines, "f"), H(this, dt, r.diffListResults, "f"), H(this, fn, r.isFullMerge, "f");
      } catch {
      }
    }, this._getAllListener = () => u(this, Ve, "f"), this._destroy = () => {
      this.clearId(), u(this, Ve, "f").splice(0, u(this, Ve, "f").length), u(this, ze, "f").forEach((r) => r()), u(this, ze, "f").clear();
    }, this.clear = () => {
      this._destroy(), H(this, oe, void 0), H(this, re, void 0), H(this, ct, void 0), H(this, dt, void 0), H(this, ft, void 0), H(this, ut, void 0), H(this, yt, void 0), H(this, Nt, void 0), H(this, Ue, void 0), H(this, Fe, void 0), H(this, he, void 0), H(this, be, []), H(this, fe, []), H(this, pe, void 0), H(this, le, []), H(this, _e, "light");
    }, Object.defineProperty(this, "__v_skip", { value: true });
    const f = Array.from(new Set(l));
    this._oldFileName = e, this._newFileName = i, this._diffList = f, this._oldFileLang = On(a || e || o || i) || "txt", this._newFileLang = On(o || i || a || e) || "txt", this._oldFileContent = n, this._newFileContent = s, this.initId();
  }
  initId() {
    let e = "-diff--" + Math.random().toString().slice(2);
    for (; ui.has(e); ) e = "-diff--" + Math.random().toString().slice(2);
    ui.add(e), H(this, on, e);
  }
  getId() {
    return u(this, on, "f");
  }
  clearId() {
    ui.delete(u(this, on, "f"));
  }
  initTheme(e) {
    H(this, _e, e || u(this, _e, "f") || "light");
  }
  initRaw() {
    u(this, Dt, "f") || (u(this, z, "m", dl).call(this), u(this, z, "m", bi).call(this), u(this, z, "m", al).call(this), u(this, z, "m", wi).call(this), u(this, z, "m", cl).call(this), u(this, z, "m", _i).call(this), H(this, Dt, true));
  }
  initSyntax({ registerHighlighter: e } = {}) {
    var n, i;
    if (u(this, Mt, "f") && (!e || e.name === u(this, st, "f") && e.type === u(this, lt, "f"))) {
      H(this, Ue, (n = u(this, re, "f")) === null || n === void 0 ? void 0 : n.syntaxFile), H(this, Fe, (i = u(this, oe, "f")) === null || i === void 0 ? void 0 : i.syntaxFile);
      return;
    }
    u(this, z, "m", ul).call(this, { registerHighlighter: e }), u(this, z, "m", wi).call(this), H(this, Mt, true);
  }
  init() {
    this.initRaw(), this.initSyntax();
  }
  buildSplitDiffLines() {
    var e, n, i, s, l, a;
    if (u(this, $t, "f")) return;
    let o = 1, d = 1, f = true, r = 1 / 0;
    const c = ((e = u(this, oe, "f")) === null || e === void 0 ? void 0 : e.maxLineNumber) || 0, v = ((n = u(this, re, "f")) === null || n === void 0 ? void 0 : n.maxLineNumber) || 0;
    for (; o <= c || d <= v; ) {
      const b = u(this, z, "m", Ft).call(this, o), m = u(this, z, "m", Ut).call(this, d), x = u(this, z, "m", hn).call(this, o), g = u(this, z, "m", pn).call(this, d), w = xe.prototype.isIncludeableLine.call(b || {}), _ = xe.prototype.isIncludeableLine.call(m || {}), N = u(this, fe, "f").length, I = !b && !m;
      if (b && !m) {
        if (b.newLineNumber && b.newLineNumber > d) {
          d++;
          continue;
        }
        (b.newLineNumber === null || b.newLineNumber === void 0) && d++;
      }
      if (m && !b) {
        if (m.oldLineNumber && m.oldLineNumber > o) {
          o++;
          continue;
        }
        (m.oldLineNumber === null || m.oldLineNumber === void 0) && o++;
      }
      if (!b && !x && !m && !g) break;
      if (!b && !m) {
        if (!((i = u(this, Ge, "f")) === null || i === void 0) && i[o] && (!((s = u(this, Ke, "f")) === null || s === void 0) && s[d])) {
          o++, d++;
          continue;
        }
        if (!x && (!((l = u(this, Ke, "f")) === null || l === void 0) && l[d])) {
          d++;
          continue;
        }
        if (!g && (!((a = u(this, Ge, "f")) === null || a === void 0) && a[o])) {
          o++;
          continue;
        }
      }
      if (w && _ || !w && !_ ? (u(this, be, "f").push({ lineNumber: o++, value: x, diff: b, isHidden: I, _isHidden: I }), u(this, fe, "f").push({ lineNumber: d++, value: g, diff: m, isHidden: I, _isHidden: I })) : w ? (u(this, be, "f").push({ lineNumber: o++, value: x, diff: b, isHidden: I, _isHidden: I }), u(this, fe, "f").push({})) : _ && (u(this, be, "f").push({}), u(this, fe, "f").push({ lineNumber: d++, value: g, diff: m, isHidden: I, _isHidden: I })), !f && I && (r = N), I && (this.hasSomeLineCollapsed = true), f = I, (b == null ? void 0 : b.prevHunkLine) || (m == null ? void 0 : m.prevHunkLine)) {
        const S = (b == null ? void 0 : b.prevHunkLine) || (m == null ? void 0 : m.prevHunkLine);
        S && (S.isFirst ? (S.splitInfo = { ...S.hunkInfo, startHiddenIndex: 0, endHiddenIndex: S.hunkInfo.newStartIndex - 1, plainText: S.text, _startHiddenIndex: 0, _endHiddenIndex: S.hunkInfo.newStartIndex - 1, _plainText: S.text }, r = 1 / 0) : Number.isFinite(r) && (S.splitInfo = { ...S.hunkInfo, startHiddenIndex: r, endHiddenIndex: N, plainText: S.text, _startHiddenIndex: r, _endHiddenIndex: N, _plainText: S.text }, r = 1 / 0), H(this, he, { ...u(this, he, "f"), [N]: S }));
      }
    }
    if (Number.isFinite(r)) {
      const m = new xe("", Z.Hunk, null, null, null);
      m.isLast = true, m.splitInfo = { startHiddenIndex: r, endHiddenIndex: u(this, fe, "f").length, _startHiddenIndex: r, _endHiddenIndex: u(this, fe, "f").length, plainText: "", oldStartIndex: 0, newStartIndex: 0, oldLength: 0, newLength: 0, _plainText: "", _oldStartIndex: 0, _newStartIndex: 0, _oldLength: 0, _newLength: 0 }, H(this, he, { ...u(this, he, "f"), [u(this, fe, "f").length]: m }), r = 1 / 0;
    }
    this.splitLineLength = u(this, fe, "f").length, H(this, $t, true), this.notifyAll();
  }
  buildUnifiedDiffLines() {
    var e, n, i, s, l, a;
    if (u(this, Rt, "f")) return;
    let o = 1, d = 1, f = true, r = 1 / 0;
    const c = ((e = u(this, oe, "f")) === null || e === void 0 ? void 0 : e.maxLineNumber) || 0, v = ((n = u(this, re, "f")) === null || n === void 0 ? void 0 : n.maxLineNumber) || 0;
    for (; o <= c || d <= v; ) {
      const b = u(this, z, "m", hn).call(this, o), m = u(this, z, "m", Ft).call(this, o), x = u(this, z, "m", pn).call(this, d), g = u(this, z, "m", Ut).call(this, d), w = xe.prototype.isIncludeableLine.call(m || {}), _ = xe.prototype.isIncludeableLine.call(g || {}), N = u(this, le, "f").length, I = !m && !g;
      if (m && !g) {
        if (m.newLineNumber && m.newLineNumber > d) {
          d++;
          continue;
        }
        (m.newLineNumber === null || m.newLineNumber === void 0) && d++;
      }
      if (g && !m) {
        if (g.oldLineNumber && g.oldLineNumber > o) {
          o++;
          continue;
        }
        (g.oldLineNumber === null || g.oldLineNumber === void 0) && o++;
      }
      if (!b && !x && !g && !m) break;
      if (!m && !g) {
        if (!((i = u(this, Ge, "f")) === null || i === void 0) && i[o] && (!((s = u(this, Ke, "f")) === null || s === void 0) && s[d])) {
          o++, d++;
          continue;
        }
        if (!b && (!((l = u(this, Ke, "f")) === null || l === void 0) && l[d])) {
          d++;
          continue;
        }
        if (!x && (!((a = u(this, Ge, "f")) === null || a === void 0) && a[o])) {
          o++;
          continue;
        }
      }
      if (!w && !_ ? u(this, le, "f").push({ oldLineNumber: o++, newLineNumber: d++, value: x, diff: g, isHidden: I, _isHidden: I }) : w ? u(this, le, "f").push({ oldLineNumber: o++, value: b, diff: m, isHidden: I, _isHidden: I }) : _ && u(this, le, "f").push({ newLineNumber: d++, value: x, diff: g, isHidden: I, _isHidden: I }), !f && I && (r = N), I && (this.hasSomeLineCollapsed = true), f = I, (m == null ? void 0 : m.prevHunkLine) || (g == null ? void 0 : g.prevHunkLine)) {
        const S = (m == null ? void 0 : m.prevHunkLine) || (g == null ? void 0 : g.prevHunkLine);
        S && (S.isFirst ? (S.unifiedInfo = { ...S.hunkInfo, startHiddenIndex: 0, endHiddenIndex: S.hunkInfo.newStartIndex - 1, plainText: S.text, _startHiddenIndex: 0, _endHiddenIndex: S.hunkInfo.newStartIndex - 1, _plainText: S.text }, r = 1 / 0) : Number.isFinite(r) && (S.unifiedInfo = { ...S.hunkInfo, startHiddenIndex: r, endHiddenIndex: N, plainText: S.text, _startHiddenIndex: r, _endHiddenIndex: N, _plainText: S.text }, r = 1 / 0), H(this, pe, { ...u(this, pe, "f"), [N]: S }));
      }
    }
    if (Number.isFinite(r)) {
      const m = new xe("", Z.Hunk, null, null, null);
      m.isLast = true, m.unifiedInfo = { startHiddenIndex: r, endHiddenIndex: u(this, le, "f").length, _startHiddenIndex: r, _endHiddenIndex: u(this, le, "f").length, plainText: "", oldStartIndex: 0, newStartIndex: 0, oldLength: 0, newLength: 0, _plainText: "", _oldStartIndex: 0, _newStartIndex: 0, _oldLength: 0, _newLength: 0 }, H(this, pe, { ...u(this, pe, "f"), [u(this, le, "f").length]: m }), r = 1 / 0;
    }
    this.unifiedLineLength = u(this, le, "f").length, H(this, Rt, true), this.notifyAll();
  }
  get hasExpandSplitAll() {
    return u(this, wt, "f").state;
  }
  get hasExpandUnifiedAll() {
    return u(this, _t, "f").state;
  }
}
oe = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), dt = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakMap(), ut = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ new WeakMap(), Nt = /* @__PURE__ */ new WeakMap(), yt = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ new WeakMap(), At = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap(), sn = /* @__PURE__ */ new WeakMap(), St = /* @__PURE__ */ new WeakMap(), ln = /* @__PURE__ */ new WeakMap(), un = /* @__PURE__ */ new WeakMap(), fn = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ new WeakMap(), Dn = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), wt = /* @__PURE__ */ new WeakMap(), _t = /* @__PURE__ */ new WeakMap(), on = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), al = function() {
  this._diffList && H(this, dt, this._diffList.map((e) => Qi.parse(e)));
}, dl = function() {
  !this._oldFileContent && !this._newFileContent || (this._oldFileContent && H(this, oe, it(this._oldFileContent, this._oldFileLang, u(this, _e, "f"), this._oldFileName, this.uuid ? this.uuid + "-old" : void 0)), this._newFileContent && H(this, re, it(this._newFileContent, this._newFileLang, u(this, _e, "f"), this._newFileName, this.uuid ? this.uuid + "-new" : void 0)));
}, bi = function() {
  var e, n, i, s, l, a, o, d;
  (e = u(this, oe, "f")) === null || e === void 0 || e.doRaw(), H(this, Nt, (n = u(this, oe, "f")) === null || n === void 0 ? void 0 : n.rawFile), H(this, Tt, (i = u(this, oe, "f")) === null || i === void 0 ? void 0 : i.plainFile), (s = u(this, re, "f")) === null || s === void 0 || s.doRaw(), H(this, yt, (l = u(this, re, "f")) === null || l === void 0 ? void 0 : l.rawFile), H(this, At, (a = u(this, re, "f")) === null || a === void 0 ? void 0 : a.plainFile), this.fileLineLength = Math.max(this.fileLineLength, ((o = u(this, oe, "f")) === null || o === void 0 ? void 0 : o.maxLineNumber) || 0, ((d = u(this, re, "f")) === null || d === void 0 ? void 0 : d.maxLineNumber) || 0);
}, cl = function() {
  if (this._oldFileContent && this._newFileContent) return;
  const e = {}, n = {};
  if (!this._oldFileContent && !this._newFileContent) {
    let i = 1, s = 1, l = "", a = "", o = false;
    for (; s <= this.diffLineLength || i <= this.diffLineLength; ) {
      const d = s++, f = i++, r = u(this, z, "m", Ft).call(this, d), c = u(this, z, "m", Ut).call(this, f);
      r ? l += r.text : (l += `
`, e[d] = true), c ? a += c.text : (a += `
`, n[f] = true), !o && r && c && (o = o || r.noTrailingNewLine !== c.noTrailingNewLine);
    }
    if (!o && l === a) return;
    this._oldFileContent = l, this._newFileContent = a, H(this, oe, it(this._oldFileContent, this._oldFileLang, u(this, _e, "f"), this._oldFileName, this.uuid ? this.uuid + "-old" : void 0)), H(this, re, it(this._newFileContent, this._newFileLang, u(this, _e, "f"), this._newFileName, this.uuid ? this.uuid + "-new" : void 0)), H(this, Ge, e), H(this, Ke, n), H(this, St, true);
  } else if (u(this, oe, "f")) {
    let i = 1, s = 1, l = "", a = false;
    for (; s <= u(this, oe, "f").maxLineNumber; ) {
      const o = u(this, z, "m", Ut).call(this, i++), d = u(this, z, "m", Ft).call(this, s);
      o ? (l += o.text, s = o.oldLineNumber ? o.oldLineNumber + 1 : s) : (d || (l += u(this, z, "m", hn).call(this, s)), s++), !a && o && d && (a = a || o.noTrailingNewLine !== d.noTrailingNewLine);
    }
    if (!a && l === this._oldFileContent) return;
    this._newFileContent = l, H(this, re, it(this._newFileContent, this._newFileLang, u(this, _e, "f"), this._newFileName, this.uuid ? this.uuid + "-new" : void 0));
  } else if (u(this, re, "f")) {
    let i = 1, s = 1, l = "", a = false;
    for (; s <= u(this, re, "f").maxLineNumber; ) {
      const o = u(this, z, "m", Ft).call(this, i++), d = u(this, z, "m", Ut).call(this, s);
      o ? (l += o.text, s = o.newLineNumber ? o.newLineNumber + 1 : s) : (d || (l += u(this, z, "m", pn).call(this, s)), s++), !a && d && o && (a = a || d.noTrailingNewLine !== o.noTrailingNewLine);
    }
    if (!a && l === this._newFileContent) return;
    this._oldFileContent = l, H(this, oe, it(this._oldFileContent, this._oldFileLang, u(this, _e, "f"), this._oldFileName, this.uuid ? this.uuid + "-old" : void 0));
  }
  u(this, z, "m", bi).call(this);
}, wi = function() {
  var e;
  if (!(!((e = u(this, dt, "f")) === null || e === void 0) && e.length)) return;
  const n = (d) => u(this, z, "m", pn).call(this, d), i = (d) => u(this, z, "m", hn).call(this, d), s = (d) => u(this, z, "m", Ns).call(this, d), l = (d) => u(this, z, "m", Ss).call(this, d);
  H(this, ct, []), this.additionLength = 0, this.deletionLength = 0;
  const a = [];
  u(this, dt, "f").forEach((d) => {
    d.hunks.forEach((r) => {
      let c = [], v = [];
      r.lines.forEach((b) => {
        b.type === Z.Add ? (c.push(b), this.additionLength++) : b.type === Z.Delete ? (v.push(b), this.deletionLength++) : (Pn(c, v, { diffFile: this, getAdditionRaw: n, getDeletionRaw: i, getAdditionSyntax: s, getDeletionSyntax: l }), c = [], v = []), a.push(b);
      }), Pn(c, v, { diffFile: this, getAdditionRaw: n, getDeletionRaw: i, getAdditionSyntax: s, getDeletionSyntax: l });
    });
  });
  let o = null;
  H(this, ct, a.map((d, f) => {
    var r;
    const c = d;
    if (c.index = f, c.isFirst = f === 0, c.type === Z.Hunk) {
      const v = (r = c.text.split("@@")) === null || r === void 0 ? void 0 : r[1].split(" ").filter(Boolean), b = (v == null ? void 0 : v[0]) || "", m = (v == null ? void 0 : v[1]) || "", [x, g] = b.split(","), [w, _] = m.split(",");
      c.hunkInfo = { oldStartIndex: -Number(x), oldLength: Number(g), newStartIndex: +Number(w), newLength: Number(_), _oldStartIndex: -Number(x), _oldLength: Number(g), _newStartIndex: +Number(w), _newLength: Number(_) }, o = c;
    } else if (c.type === Z.Context) {
      const v = d;
      o && (v.prevHunkLine = o, o = null);
    } else o = null;
    return c;
  })), H(this, ut, {}), H(this, ft, {}), u(this, ct, "f").forEach((d) => {
    d.oldLineNumber && (this.diffLineLength = Math.max(this.diffLineLength, d.oldLineNumber), u(this, ut, "f")[d.oldLineNumber] = d), d.newLineNumber && (this.diffLineLength = Math.max(this.diffLineLength, d.newLineNumber), u(this, ft, "f")[d.newLineNumber] = d);
  });
}, _i = function() {
  var e, n, i, s, l, a;
  H(this, st, ((e = u(this, oe, "f")) === null || e === void 0 ? void 0 : e.highlighterName) || ((n = u(this, re, "f")) === null || n === void 0 ? void 0 : n.highlighterName) || u(this, st, "f")), H(this, lt, ((i = u(this, oe, "f")) === null || i === void 0 ? void 0 : i.highlighterType) || ((s = u(this, re, "f")) === null || s === void 0 ? void 0 : s.highlighterType) || u(this, lt, "f")), !((l = u(this, oe, "f")) === null || l === void 0) && l.highlighterName && H(this, Fe, u(this, oe, "f").syntaxFile), !((a = u(this, re, "f")) === null || a === void 0) && a.highlighterName && H(this, Ue, u(this, re, "f").syntaxFile);
}, Ls = function({ registerHighlighter: e }) {
  var n, i, s, l;
  (n = u(this, oe, "f")) === null || n === void 0 || n.doSyntax({ registerHighlighter: e, theme: u(this, _e, "f") }), H(this, Fe, (i = u(this, oe, "f")) === null || i === void 0 ? void 0 : i.syntaxFile), (s = u(this, re, "f")) === null || s === void 0 || s.doSyntax({ registerHighlighter: e, theme: u(this, _e, "f") }), H(this, Ue, (l = u(this, re, "f")) === null || l === void 0 ? void 0 : l.syntaxFile);
}, ul = function({ registerHighlighter: e } = {}) {
  u(this, un, "f") && !u(this, fn, "f") || (u(this, z, "m", Ls).call(this, { registerHighlighter: e }), u(this, z, "m", _i).call(this));
}, Ft = function(e) {
  var n;
  if (e) return (n = u(this, ut, "f")) === null || n === void 0 ? void 0 : n[e];
}, Ut = function(e) {
  var n;
  if (e) return (n = u(this, ft, "f")) === null || n === void 0 ? void 0 : n[e];
}, hn = function(e) {
  var n;
  return (n = u(this, Nt, "f")) === null || n === void 0 ? void 0 : n[e];
}, pn = function(e) {
  var n;
  return (n = u(this, yt, "f")) === null || n === void 0 ? void 0 : n[e];
}, Ss = function(e) {
  var n;
  return (n = u(this, Fe, "f")) === null || n === void 0 ? void 0 : n[e];
}, Ns = function(e) {
  var n;
  return (n = u(this, Ue, "f")) === null || n === void 0 ? void 0 : n[e];
};
const en = "diff-multi-select-active", Ot = { selected: en, selecting: "diff-multi-selecting" };
function Bn(t) {
  if (!t) return null;
  const e = t.querySelector("span[data-line-num]");
  if (!e) return null;
  const n = e.getAttribute("data-line-num"), i = parseInt(n ?? "", 10);
  return n !== i.toString() || isNaN(i) ? null : i;
}
function es(t) {
  if (!t) return null;
  const e = t.closest("[data-side]");
  return e ? e.getAttribute("data-side") : null;
}
function Vn(t) {
  if (!t) return null;
  const e = t.closest(".diff-line-num");
  if (!e) return null;
  const n = e.querySelector("span[data-line-old-num]"), i = e.querySelector("span[data-line-new-num]"), s = n == null ? void 0 : n.getAttribute("data-line-old-num"), l = i == null ? void 0 : i.getAttribute("data-line-new-num"), a = s ? parseInt(s, 10) : void 0, o = l ? parseInt(l, 10) : void 0;
  return a === void 0 && o === void 0 ? null : { old: a, new: o };
}
function zn(t, e = false) {
  var n, i, s, l;
  if (!t) return null;
  let a = null;
  if (!e || t.closest(".diff-add-widget-wrapper")) {
    const o = t.closest(".diff-line-new-content"), d = t.closest(".diff-line-old-content");
    o && (a = (i = (n = o.parentElement) === null || n === void 0 ? void 0 : n.querySelector(".diff-line-new-num")) !== null && i !== void 0 ? i : null), d && (a = (l = (s = d.parentElement) === null || s === void 0 ? void 0 : s.querySelector(".diff-line-old-num")) !== null && l !== void 0 ? l : null);
  }
  return a || (a = t.closest(".diff-line-new-num") || t.closest(".diff-line-old-num")), a;
}
function bt(t) {
  const e = Math.min(t.startLineNumber, t.endLineNumber), n = Math.max(t.startLineNumber, t.endLineNumber);
  return { ...t, startLineNumber: e, endLineNumber: n };
}
const gl = (t) => {
  const e = [];
  return t.new && t.new.length && e.push({ side: "new", startLineNumber: Math.min(...t.new), endLineNumber: Math.max(...t.new) }), t.old && t.old.length && e.push({ side: "old", startLineNumber: Math.min(...t.old), endLineNumber: Math.max(...t.old) }), e;
}, uo = (t, e, n, i) => {
  si(e, n).forEach((l) => {
    var a, o;
    if (!l.isHide && l.index) {
      const d = t.filter((f) => f.getAttribute("data-line") === l.index.toString());
      if (d.length === 2) if (l.isContext) d.forEach((f) => f.querySelectorAll("td").forEach((r) => r.classList.add(i)));
      else {
        const f = d.find((r) => r.getAttribute("data-side") === n.side);
        f == null ? void 0 : f.querySelectorAll("td").forEach((r) => r.classList.add(i));
      }
      else l.isContext ? (a = d[0]) === null || a === void 0 || a.querySelectorAll("td").forEach((f) => f.classList.add(i)) : (o = d[0]) === null || o === void 0 || o.querySelectorAll(`td[data-side="${n.side}"]`).forEach((f) => f.classList.add(i));
    }
  });
};
function ts(t, e, n, i = { old: [], new: [] }, s = en) {
  if (!t) return;
  const l = `diff-root${n == null ? void 0 : n.getId()}`, o = Array.from(t.querySelectorAll("tr[data-line]")).filter((c) => {
    var v;
    return ((v = c.closest(".diff-view-wrapper")) === null || v === void 0 ? void 0 : v.getAttribute("id")) === l;
  }), d = gl(i), r = (e ? d.concat(e) : d).map(bt);
  o.forEach((c) => {
    c.querySelectorAll("td").forEach((b) => b.classList.remove(s));
  }), r.forEach((c) => {
    c && n && uo(o, n, c, s);
  });
}
function ns(t, e, n, i = { old: [], new: [] }, s = en) {
  if (!t) return;
  const l = `diff-root${n == null ? void 0 : n.getId()}`, o = Array.from(t.querySelectorAll("tr[data-line]")).filter((c) => {
    var v;
    return ((v = c.closest(".diff-view-wrapper")) === null || v === void 0 ? void 0 : v.getAttribute("id")) === l;
  }), d = gl(i), r = (e ? d.concat(e) : d).map(bt);
  o.forEach((c) => {
    const v = c.querySelector(".diff-line-num"), b = c.querySelector(".diff-line-content");
    if (!v || !b) return;
    v.classList.remove(s), b.classList.remove(s);
    const m = v.querySelector("span[data-line-old-num]"), x = v.querySelector("span[data-line-new-num]"), g = m == null ? void 0 : m.getAttribute("data-line-old-num"), w = x == null ? void 0 : x.getAttribute("data-line-new-num"), _ = g ? parseInt(g, 10) : void 0, N = w ? parseInt(w, 10) : void 0;
    r.some((I) => I.side === "old" && _ && _ >= I.startLineNumber && _ <= I.endLineNumber || I.side === "new" && N && N >= I.startLineNumber && N <= I.endLineNumber) && (v.classList.add(s), b.classList.add(s));
  });
}
function si(t, e) {
  var n;
  const i = bt(e), s = [], { side: l, startLineNumber: a, endLineNumber: o } = i, d = l === "old" ? j.old : j.new;
  for (let f = a; f <= o; f++) {
    const r = t.getSplitLineByLineNumber(f, d), c = t.getSplitLineIndexByLineNumber(f, d);
    if (r && r.lineNumber !== void 0) {
      const v = (n = r.diff) === null || n === void 0 ? void 0 : n.type;
      s.push({ index: c + 1, lineNumber: r.lineNumber, value: r.value, isHide: ii(t, f, d).split, isDelete: v === Z.Delete, isAdd: v === Z.Add, isContext: v === Z.Context || v === void 0 });
    }
  }
  return s;
}
function is(t, e) {
  var n;
  const i = bt(e), s = [], { side: l, startLineNumber: a, endLineNumber: o } = i, d = l === "old" ? j.old : j.new;
  for (let f = a; f <= o; f++) {
    const r = t.getUnifiedLineByLineNumber(f, d), c = t.getUnifiedLineIndexByLineNumber(f, d);
    if (r) {
      const v = l === "old" ? r.oldLineNumber : r.newLineNumber;
      if (v !== void 0) {
        const b = (n = r.diff) === null || n === void 0 ? void 0 : n.type;
        s.push({ index: c + 1, lineNumber: v, value: r.value, isHide: ii(t, f, d).unified, isDelete: b === Z.Delete, isAdd: b === Z.Add, isContext: b === Z.Context || b === void 0 });
      }
    }
  }
  return s;
}
function vl(t) {
  if (!t) return { old: [], new: [] };
  const e = (n = {}) => {
    const i = [];
    return Object.entries(n).forEach(([s, l]) => {
      var a;
      const o = parseInt(s, 10), d = (a = l.fromLine) !== null && a !== void 0 ? a : o;
      for (let f = d; f <= o; f++) i.push(f);
    }), [...new Set(i)];
  };
  return { old: e(t.oldFile), new: e(t.newFile) };
}
var me, ke, Re, Y, V, gn, Ze, rn, Pt, vn, Mn, ys, Is, Cs, ks, js, Ye, Li;
class ss {
  constructor(e, n, i = {}) {
    var s, l, a, o, d, f;
    me.add(this), ke.set(this, null), Re.set(this, null), Y.set(this, void 0), V.set(this, { isSelecting: false, startInfo: null, currentRange: null }), gn.set(this, { old: [], new: [] }), Ze.set(this, null), rn.set(this, false), Pt.set(this, () => {
    }), vn.set(this, () => {
    }), H(this, ke, e), H(this, Re, n), H(this, Y, { enabled: (s = i.enabled) !== null && s !== void 0 ? s : true, onSelectionChange: (l = i.onSelectionChange) !== null && l !== void 0 ? l : (() => {
    }), onSelectionComplete: (a = i.onSelectionComplete) !== null && a !== void 0 ? a : (() => {
    }), scopeToHunk: (o = i.scopeToHunk) !== null && o !== void 0 ? o : ((c) => c), selectedClassName: (d = i.selectedClassName) !== null && d !== void 0 ? d : en, isUnifiedMode: (f = i.isUnifiedMode) !== null && f !== void 0 ? f : false }), u(this, Y, "f").enabled && u(this, me, "m", Mn).call(this);
    let r = null;
    H(this, vn, () => {
      r && clearTimeout(r), r = setTimeout(() => u(this, me, "m", Ye).call(this), 16);
    }), Object.defineProperty(this, "__v_skip", { value: true });
  }
  getSelectionResult() {
    if (!u(this, V, "f").currentRange || !u(this, Re, "f")) return null;
    const e = bt(u(this, V, "f").currentRange), n = u(this, Y, "f").isUnifiedMode ? is(u(this, Re, "f"), e) : si(u(this, Re, "f"), e);
    return { range: e, lines: n };
  }
  getState() {
    return { ...u(this, V, "f") };
  }
  setPreselectedLines(e) {
    H(this, gn, e), u(this, me, "m", Ye).call(this);
  }
  clearSelection() {
    u(this, me, "m", Li).call(this), u(this, me, "m", Ye).call(this), u(this, Y, "f").onSelectionChange(null, { ...u(this, V, "f") });
  }
  updateOptions(e) {
    const n = u(this, Y, "f").enabled;
    H(this, Y, { ...u(this, Y, "f"), ...e }), !n && u(this, Y, "f").enabled ? u(this, me, "m", Mn).call(this) : n && !u(this, Y, "f").enabled && this.destroy();
  }
  updateDiffFile(e) {
    u(this, Pt, "f").call(this), H(this, Re, e), H(this, Pt, u(this, Re, "f").subscribe(() => u(this, vn, "f").call(this))), u(this, me, "m", Ye).call(this);
  }
  updateContainer(e) {
    this.destroy(), H(this, ke, e), H(this, rn, false), u(this, Y, "f").enabled && u(this, me, "m", Mn).call(this);
  }
  destroy() {
    u(this, rn, "f") || (u(this, Ze, "f") && u(this, ke, "f") && (u(this, ke, "f").removeEventListener("mousedown", u(this, Ze, "f").mousedown), u(this, ke, "f").removeEventListener("mouseover", u(this, Ze, "f").mouseover), document.removeEventListener("mouseup", u(this, Ze, "f").mouseup), H(this, Ze, null)), u(this, Pt, "f").call(this), this.clearSelection(), H(this, rn, true));
  }
}
ke = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), gn = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakMap(), rn = /* @__PURE__ */ new WeakMap(), Pt = /* @__PURE__ */ new WeakMap(), vn = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ new WeakSet(), Mn = function() {
  var e;
  if (!u(this, ke, "f") || u(this, Ze, "f")) return;
  const n = (l) => {
    u(this, Y, "f").isUnifiedMode ? u(this, me, "m", Is).call(this, l) : u(this, me, "m", ys).call(this, l);
  }, i = (l) => {
    u(this, Y, "f").isUnifiedMode ? u(this, me, "m", ks).call(this, l) : u(this, me, "m", Cs).call(this, l);
  }, s = () => {
    u(this, me, "m", js).call(this);
  };
  H(this, Ze, { mousedown: n, mouseover: i, mouseup: s }), u(this, ke, "f").addEventListener("mousedown", n), u(this, ke, "f").addEventListener("mouseover", i), document.addEventListener("mouseup", s), H(this, Pt, ((e = u(this, Re, "f")) === null || e === void 0 ? void 0 : e.subscribe(() => u(this, vn, "f").call(this))) || (() => {
  }));
}, ys = function(e) {
  const n = zn(e.target, true);
  if (!n) return;
  const i = Bn(n);
  if (i === null) return;
  const s = es(n);
  if (!s) return;
  u(this, V, "f").isSelecting = true, u(this, V, "f").startInfo = { lineNumber: i, side: s };
  let l = { side: s, startLineNumber: i, endLineNumber: i };
  if (u(this, Y, "f").scopeToHunk) {
    const a = u(this, Y, "f").scopeToHunk(l);
    a && (l = a);
  }
  u(this, V, "f").currentRange = l, u(this, me, "m", Ye).call(this), u(this, Y, "f").onSelectionChange(l, { ...u(this, V, "f") });
}, Is = function(e) {
  var n;
  const i = Vn(e.target);
  if (!i) return;
  const s = (n = i.new) !== null && n !== void 0 ? n : i.old;
  if (s === void 0) return;
  const l = i.new !== void 0 ? "new" : "old";
  u(this, V, "f").isSelecting = true, u(this, V, "f").startInfo = { lineNumber: s, side: l };
  let a = { side: l, startLineNumber: s, endLineNumber: s };
  if (u(this, Y, "f").scopeToHunk) {
    const o = u(this, Y, "f").scopeToHunk(a);
    o && (a = o);
  }
  u(this, V, "f").currentRange = a, u(this, me, "m", Ye).call(this), u(this, Y, "f").onSelectionChange(a, { ...u(this, V, "f") });
}, Cs = function(e) {
  if (!u(this, V, "f").isSelecting || !u(this, V, "f").startInfo) return;
  const n = zn(e.target);
  if (!n) return;
  const i = Bn(n);
  if (i === null) return;
  let s = { side: u(this, V, "f").startInfo.side, startLineNumber: u(this, V, "f").startInfo.lineNumber, endLineNumber: i };
  if (u(this, Y, "f").scopeToHunk) {
    const l = u(this, Y, "f").scopeToHunk(s);
    l && (s = l);
  }
  u(this, V, "f").currentRange = s, u(this, me, "m", Ye).call(this), u(this, Y, "f").onSelectionChange(s, { ...u(this, V, "f") });
}, ks = function(e) {
  if (!u(this, V, "f").isSelecting || !u(this, V, "f").startInfo) return;
  const n = Vn(e.target);
  if (!n) return;
  const i = n[u(this, V, "f").startInfo.side];
  if (i === void 0) return;
  let s = { side: u(this, V, "f").startInfo.side, startLineNumber: u(this, V, "f").startInfo.lineNumber, endLineNumber: i };
  if (u(this, Y, "f").scopeToHunk) {
    const l = u(this, Y, "f").scopeToHunk(s);
    l && (s = l);
  }
  u(this, V, "f").currentRange = s, u(this, me, "m", Ye).call(this), u(this, Y, "f").onSelectionChange(s, { ...u(this, V, "f") });
}, js = function() {
  if (!u(this, V, "f").isSelecting || !u(this, V, "f").currentRange) {
    u(this, me, "m", Li).call(this);
    return;
  }
  const e = bt(u(this, V, "f").currentRange);
  u(this, V, "f").currentRange = e, u(this, V, "f").isSelecting = false;
  const n = this.getSelectionResult();
  u(this, Y, "f").onSelectionComplete(n);
}, Ye = function() {
  u(this, Y, "f").isUnifiedMode ? ns(u(this, ke, "f"), u(this, V, "f").currentRange, u(this, Re, "f"), u(this, gn, "f"), u(this, Y, "f").selectedClassName) : ts(u(this, ke, "f"), u(this, V, "f").currentRange, u(this, Re, "f"), u(this, gn, "f"), u(this, Y, "f").selectedClassName);
}, Li = function() {
  H(this, V, { isSelecting: false, startInfo: null, currentRange: null });
};
function ls(t, e, n) {
  return new ss(t, e, n);
}
const ml = "0.1.7";
function fo(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const ho = {}, po = () => {
}, xl = Object.assign, go = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, vo = Object.prototype.hasOwnProperty, Si = (t, e) => vo.call(t, e), Qe = Array.isArray, Ct = (t) => li(t) === "[object Map]", os = (t) => li(t) === "[object Set]", mn = (t) => typeof t == "function", mo = (t) => typeof t == "string", In = (t) => typeof t == "symbol", Xe = (t) => t !== null && typeof t == "object", xo = (t) => (Xe(t) || mn(t)) && mn(t.then) && mn(t.catch), bo = Object.prototype.toString, li = (t) => bo.call(t), wo = (t) => li(t).slice(8, -1), rs = (t) => li(t) === "[object Object]", as = (t) => mo(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Pe = (t, e) => !Object.is(t, e);
let we;
class _o {
  constructor(e = false) {
    this.detached = e, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this._warnOnRun = true, this.__v_skip = true, !e && we && (we.active ? (this.parent = we, this.index = (we.scopes || (we.scopes = [])).push(this) - 1) : (this._active = false, this._warnOnRun = false));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let e, n;
      if (this.scopes) {
        const i = this.scopes.slice();
        for (e = 0, n = i.length; e < n; e++) i[e].pause();
      }
      for (e = 0, n = this.effects.length; e < n; e++) this.effects[e].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = false;
      let e, n;
      if (this.scopes) {
        const s = this.scopes.slice();
        for (e = 0, n = s.length; e < n; e++) s[e].resume();
      }
      const i = this.effects.slice();
      for (e = 0, n = i.length; e < n; e++) i[e].resume();
    }
  }
  run(e) {
    if (this._active) {
      const n = we;
      try {
        return we = this, e();
      } finally {
        we = n;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = we, we = this);
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (we === this) we = this.prevScope;
      else {
        let e = we;
        for (; e; ) {
          if (e.prevScope === this) {
            e.prevScope = this.prevScope;
            break;
          }
          e = e.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(e) {
    if (this._active) {
      this._active = false;
      let n, i;
      for (n = 0, i = this.effects.length; n < i; n++) this.effects[n].stop();
      for (this.effects.length = 0, n = 0, i = this.cleanups.length; n < i; n++) this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        const s = this.scopes.slice();
        for (n = 0, i = s.length; n < i; n++) s[n].stop(true);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Lo(t) {
  return new _o(t);
}
function So() {
  return we;
}
let ne;
const fi = /* @__PURE__ */ new WeakSet();
class bl {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, we && (we.active ? we.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, fi.has(this) && (fi.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || No(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, Es(this), _l(this);
    const e = ne, n = We;
    ne = this, We = true;
    try {
      return this.fn();
    } finally {
      Ll(this), ne = e, We = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep) us(e);
      this.deps = this.depsTail = void 0, Es(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? fi.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    Ni(this) && this.run();
  }
  get dirty() {
    return Ni(this);
  }
}
let wl = 0, xn, bn;
function No(t, e = false) {
  if (t.flags |= 8, e) {
    t.next = bn, bn = t;
    return;
  }
  t.next = xn, xn = t;
}
function ds() {
  wl++;
}
function cs() {
  if (--wl > 0) return;
  if (bn) {
    let e = bn;
    for (bn = void 0; e; ) {
      const n = e.next;
      e.next = void 0, e.flags &= -9, e = n;
    }
  }
  let t;
  for (; xn; ) {
    let e = xn;
    for (xn = void 0; e; ) {
      const n = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1) try {
        e.trigger();
      } catch (i) {
        t || (t = i);
      }
      e = n;
    }
  }
  if (t) throw t;
}
function _l(t) {
  for (let e = t.deps; e; e = e.nextDep) e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function Ll(t) {
  let e, n = t.depsTail, i = n;
  for (; i; ) {
    const s = i.prevDep;
    i.version === -1 ? (i === n && (n = s), us(i), Io(i)) : e = i, i.dep.activeLink = i.prevActiveLink, i.prevActiveLink = void 0, i = s;
  }
  t.deps = e, t.depsTail = n;
}
function Ni(t) {
  for (let e = t.deps; e; e = e.nextDep) if (e.dep.version !== e.version || e.dep.computed && (yo(e.dep.computed) || e.dep.version !== e.version)) return true;
  return !!t._dirty;
}
function yo(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === Gn) || (t.globalVersion = Gn, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !Ni(t)))) return;
  t.flags |= 2;
  const e = t.dep, n = ne, i = We;
  ne = t, We = true;
  try {
    _l(t);
    const s = t.fn(t._value);
    (e.version === 0 || Pe(s, t._value)) && (t.flags |= 128, t._value = s, e.version++);
  } catch (s) {
    throw e.version++, s;
  } finally {
    ne = n, We = i, Ll(t), t.flags &= -3;
  }
}
function us(t, e = false) {
  const { dep: n, prevSub: i, nextSub: s } = t;
  if (i && (i.nextSub = s, t.prevSub = void 0), s && (s.prevSub = i, t.nextSub = void 0), n.subs === t && (n.subs = i, !i && n.computed)) {
    n.computed.flags &= -5;
    for (let l = n.computed.deps; l; l = l.nextDep) us(l, true);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
function Io(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let We = true;
const Sl = [];
function Nl() {
  Sl.push(We), We = false;
}
function yl() {
  const t = Sl.pop();
  We = t === void 0 ? true : t;
}
function Es(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const n = ne;
    ne = void 0;
    try {
      e();
    } finally {
      ne = n;
    }
  }
}
let Gn = 0;
class Co {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Il {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
  }
  track(e) {
    if (!ne || !We || ne === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ne) n = this.activeLink = new Co(ne, this), ne.deps ? (n.prevDep = ne.depsTail, ne.depsTail.nextDep = n, ne.depsTail = n) : ne.deps = ne.depsTail = n, Cl(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const i = n.nextDep;
      i.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = i), n.prevDep = ne.depsTail, n.nextDep = void 0, ne.depsTail.nextDep = n, ne.depsTail = n, ne.deps === n && (ne.deps = i);
    }
    return n;
  }
  trigger(e) {
    this.version++, Gn++, this.notify(e);
  }
  notify(e) {
    ds();
    try {
      for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
    } finally {
      cs();
    }
  }
}
function Cl(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let i = e.deps; i; i = i.nextDep) Cl(i);
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
  }
}
const yi = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ Symbol(""), Ii = /* @__PURE__ */ Symbol(""), Nn = /* @__PURE__ */ Symbol("");
function ye(t, e, n) {
  if (We && ne) {
    let i = yi.get(t);
    i || yi.set(t, i = /* @__PURE__ */ new Map());
    let s = i.get(n);
    s || (i.set(n, s = new Il()), s.map = i, s.key = n), s.track();
  }
}
function ot(t, e, n, i, s, l) {
  const a = yi.get(t);
  if (!a) {
    Gn++;
    return;
  }
  const o = (d) => {
    d && d.trigger();
  };
  if (ds(), e === "clear") a.forEach(o);
  else {
    const d = Qe(t), f = d && as(n);
    if (d && n === "length") {
      const r = Number(i);
      a.forEach((c, v) => {
        (v === "length" || v === Nn || !In(v) && v >= r) && o(c);
      });
    } else switch ((n !== void 0 || a.has(void 0)) && o(a.get(n)), f && o(a.get(Nn)), e) {
      case "add":
        d ? f && o(a.get("length")) : (o(a.get(kt)), Ct(t) && o(a.get(Ii)));
        break;
      case "delete":
        d || (o(a.get(kt)), Ct(t) && o(a.get(Ii)));
        break;
      case "set":
        Ct(t) && o(a.get(kt));
        break;
    }
  }
  cs();
}
function Ht(t) {
  const e = K(t);
  return e === t ? e : (ye(e, "iterate", Nn), Te(t) ? e : e.map(et));
}
function fs(t) {
  return ye(t = K(t), "iterate", Nn), t;
}
function Oe(t, e) {
  return pt(t) ? yn(wn(t) ? et(e) : e) : et(e);
}
const ko = { __proto__: null, [Symbol.iterator]() {
  return hi(this, Symbol.iterator, (t) => Oe(this, t));
}, concat(...t) {
  return Ht(this).concat(...t.map((e) => Qe(e) ? Ht(e) : e));
}, entries() {
  return hi(this, "entries", (t) => (t[1] = Oe(this, t[1]), t));
}, every(t, e) {
  return Be(this, "every", t, e, void 0, arguments);
}, filter(t, e) {
  return Be(this, "filter", t, e, (n) => n.map((i) => Oe(this, i)), arguments);
}, find(t, e) {
  return Be(this, "find", t, e, (n) => Oe(this, n), arguments);
}, findIndex(t, e) {
  return Be(this, "findIndex", t, e, void 0, arguments);
}, findLast(t, e) {
  return Be(this, "findLast", t, e, (n) => Oe(this, n), arguments);
}, findLastIndex(t, e) {
  return Be(this, "findLastIndex", t, e, void 0, arguments);
}, forEach(t, e) {
  return Be(this, "forEach", t, e, void 0, arguments);
}, includes(...t) {
  return pi(this, "includes", t);
}, indexOf(...t) {
  return pi(this, "indexOf", t);
}, join(t) {
  return Ht(this).join(t);
}, lastIndexOf(...t) {
  return pi(this, "lastIndexOf", t);
}, map(t, e) {
  return Be(this, "map", t, e, void 0, arguments);
}, pop() {
  return tn(this, "pop");
}, push(...t) {
  return tn(this, "push", t);
}, reduce(t, ...e) {
  return Hs(this, "reduce", t, e);
}, reduceRight(t, ...e) {
  return Hs(this, "reduceRight", t, e);
}, shift() {
  return tn(this, "shift");
}, some(t, e) {
  return Be(this, "some", t, e, void 0, arguments);
}, splice(...t) {
  return tn(this, "splice", t);
}, toReversed() {
  return Ht(this).toReversed();
}, toSorted(t) {
  return Ht(this).toSorted(t);
}, toSpliced(...t) {
  return Ht(this).toSpliced(...t);
}, unshift(...t) {
  return tn(this, "unshift", t);
}, values() {
  return hi(this, "values", (t) => Oe(this, t));
} };
function hi(t, e, n) {
  const i = fs(t), s = i[e]();
  return i !== t && !Te(t) && (s._next = s.next, s.next = () => {
    const l = s._next();
    return l.done || (l.value = n(l.value)), l;
  }), s;
}
const jo = Array.prototype;
function Be(t, e, n, i, s, l) {
  const a = fs(t), o = a !== t && !Te(t), d = a[e];
  if (d !== jo[e]) {
    const c = d.apply(t, l);
    return o ? et(c) : c;
  }
  let f = n;
  a !== t && (o ? f = function(c, v) {
    return n.call(this, Oe(t, c), v, t);
  } : n.length > 2 && (f = function(c, v) {
    return n.call(this, c, v, t);
  }));
  const r = d.call(a, f, i);
  return o && s ? s(r) : r;
}
function Hs(t, e, n, i) {
  const s = fs(t), l = s !== t && !Te(t);
  let a = n, o = false;
  s !== t && (l ? (o = i.length === 0, a = function(f, r, c) {
    return o && (o = false, f = Oe(t, f)), n.call(this, f, Oe(t, r), c, t);
  }) : n.length > 3 && (a = function(f, r, c) {
    return n.call(this, f, r, c, t);
  }));
  const d = s[e](a, ...i);
  return o ? Oe(t, d) : d;
}
function pi(t, e, n) {
  const i = K(t);
  ye(i, "iterate", Nn);
  const s = i[e](...n);
  return (s === -1 || s === false) && Bo(n[0]) ? (n[0] = K(n[0]), i[e](...n)) : s;
}
function tn(t, e, n = []) {
  Nl(), ds();
  const i = K(t)[e].apply(t, n);
  return cs(), yl(), i;
}
const Eo = fo("__proto__,__v_isRef,__isVue"), kl = new Set(Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(In));
function Ho(t) {
  In(t) || (t = String(t));
  const e = K(this);
  return ye(e, "has", t), e.hasOwnProperty(t);
}
class jl {
  constructor(e = false, n = false) {
    this._isReadonly = e, this._isShallow = n;
  }
  get(e, n, i) {
    if (n === "__v_skip") return e.__v_skip;
    const s = this._isReadonly, l = this._isShallow;
    if (n === "__v_isReactive") return !s;
    if (n === "__v_isReadonly") return s;
    if (n === "__v_isShallow") return l;
    if (n === "__v_raw") return i === (s ? l ? Oo : Dl : l ? Uo : Hl).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(i) ? e : void 0;
    const a = Qe(e);
    if (!s) {
      let d;
      if (a && (d = ko[n])) return d;
      if (n === "hasOwnProperty") return Ho;
    }
    const o = Reflect.get(e, n, Ae(e) ? e : i);
    if ((In(n) ? kl.has(n) : Eo(n)) || (s || ye(e, "get", n), l)) return o;
    if (Ae(o)) {
      const d = a && as(n) ? o : o.value;
      return s && Xe(d) ? Kn(d) : d;
    }
    return Xe(o) ? s ? Kn(o) : hs(o) : o;
  }
}
class Do extends jl {
  constructor(e = false) {
    super(false, e);
  }
  set(e, n, i, s) {
    let l = e[n];
    const a = Qe(e) && as(n);
    if (!this._isShallow) {
      const f = pt(l);
      if (!Te(i) && !pt(i) && (l = K(l), i = K(i)), !a && Ae(l) && !Ae(i)) return f || (l.value = i), true;
    }
    const o = a ? Number(n) < e.length : Si(e, n), d = Reflect.set(e, n, i, Ae(e) ? e : s);
    return e === K(s) && d && (o ? Pe(i, l) && ot(e, "set", n, i) : ot(e, "add", n, i)), d;
  }
  deleteProperty(e, n) {
    const i = Si(e, n);
    e[n];
    const s = Reflect.deleteProperty(e, n);
    return s && i && ot(e, "delete", n, void 0), s;
  }
  has(e, n) {
    const i = Reflect.has(e, n);
    return (!In(n) || !kl.has(n)) && ye(e, "has", n), i;
  }
  ownKeys(e) {
    return ye(e, "iterate", Qe(e) ? "length" : kt), Reflect.ownKeys(e);
  }
}
class Mo extends jl {
  constructor(e = false) {
    super(true, e);
  }
  set(e, n) {
    return true;
  }
  deleteProperty(e, n) {
    return true;
  }
}
const $o = new Do(), Ro = new Mo(), Ci = (t) => t, Cn = (t) => Reflect.getPrototypeOf(t);
function Wo(t, e, n) {
  return function(...i) {
    const s = this.__v_raw, l = K(s), a = Ct(l), o = t === "entries" || t === Symbol.iterator && a, d = t === "keys" && a, f = s[t](...i), r = n ? Ci : e ? yn : et;
    return !e && ye(l, "iterate", d ? Ii : kt), xl(Object.create(f), { next() {
      const { value: c, done: v } = f.next();
      return v ? { value: c, done: v } : { value: o ? [r(c[0]), r(c[1])] : r(c), done: v };
    } });
  };
}
function kn(t) {
  return function(...e) {
    return t === "delete" ? false : t === "clear" ? void 0 : this;
  };
}
function To(t, e) {
  const n = { get(s) {
    const l = this.__v_raw, a = K(l), o = K(s);
    t || (Pe(s, o) && ye(a, "get", s), ye(a, "get", o));
    const { has: d } = Cn(a), f = e ? Ci : t ? yn : et;
    if (d.call(a, s)) return f(l.get(s));
    if (d.call(a, o)) return f(l.get(o));
    l !== a && l.get(s);
  }, get size() {
    const s = this.__v_raw;
    return !t && ye(K(s), "iterate", kt), s.size;
  }, has(s) {
    const l = this.__v_raw, a = K(l), o = K(s);
    return t || (Pe(s, o) && ye(a, "has", s), ye(a, "has", o)), s === o ? l.has(s) : l.has(s) || l.has(o);
  }, forEach(s, l) {
    const a = this, o = a.__v_raw, d = K(o), f = e ? Ci : t ? yn : et;
    return !t && ye(d, "iterate", kt), o.forEach((r, c) => s.call(l, f(r), f(c), a));
  } };
  return xl(n, t ? { add: kn("add"), set: kn("set"), delete: kn("delete"), clear: kn("clear") } : { add(s) {
    const l = K(this), a = Cn(l), o = K(s), d = !e && !Te(s) && !pt(s) ? o : s;
    return a.has.call(l, d) || Pe(s, d) && a.has.call(l, s) || Pe(o, d) && a.has.call(l, o) || (l.add(d), ot(l, "add", d, d)), this;
  }, set(s, l) {
    !e && !Te(l) && !pt(l) && (l = K(l));
    const a = K(this), { has: o, get: d } = Cn(a);
    let f = o.call(a, s);
    f || (s = K(s), f = o.call(a, s));
    const r = d.call(a, s);
    return a.set(s, l), f ? Pe(l, r) && ot(a, "set", s, l) : ot(a, "add", s, l), this;
  }, delete(s) {
    const l = K(this), { has: a, get: o } = Cn(l);
    let d = a.call(l, s);
    d || (s = K(s), d = a.call(l, s)), o && o.call(l, s);
    const f = l.delete(s);
    return d && ot(l, "delete", s, void 0), f;
  }, clear() {
    const s = K(this), l = s.size !== 0, a = s.clear();
    return l && ot(s, "clear", void 0, void 0), a;
  } }), ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    n[s] = Wo(s, t, e);
  }), n;
}
function El(t, e) {
  const n = To(t, e);
  return (i, s, l) => s === "__v_isReactive" ? !t : s === "__v_isReadonly" ? t : s === "__v_raw" ? i : Reflect.get(Si(n, s) && s in i ? n : i, s, l);
}
const Ao = { get: El(false, false) }, Fo = { get: El(true, false) }, Hl = /* @__PURE__ */ new WeakMap(), Uo = /* @__PURE__ */ new WeakMap(), Dl = /* @__PURE__ */ new WeakMap(), Oo = /* @__PURE__ */ new WeakMap();
function Po(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function hs(t) {
  return pt(t) ? t : Ml(t, false, $o, Ao, Hl);
}
function Kn(t) {
  return Ml(t, true, Ro, Fo, Dl);
}
function Ml(t, e, n, i, s) {
  if (!Xe(t) || t.__v_raw && !(e && t.__v_isReactive) || t.__v_skip || !Object.isExtensible(t)) return t;
  const l = s.get(t);
  if (l) return l;
  const a = Po(wo(t));
  if (a === 0) return t;
  const o = new Proxy(t, a === 2 ? i : n);
  return s.set(t, o), o;
}
function wn(t) {
  return pt(t) ? wn(t.__v_raw) : !!(t && t.__v_isReactive);
}
function pt(t) {
  return !!(t && t.__v_isReadonly);
}
function Te(t) {
  return !!(t && t.__v_isShallow);
}
function Bo(t) {
  return t ? !!t.__v_raw : false;
}
function K(t) {
  const e = t && t.__v_raw;
  return e ? K(e) : t;
}
const et = (t) => Xe(t) ? hs(t) : t, yn = (t) => Xe(t) ? Kn(t) : t;
function Ae(t) {
  return t ? t.__v_isRef === true : false;
}
function Ne(t) {
  return Vo(t, false);
}
function Vo(t, e) {
  return Ae(t) ? t : new zo(t, e);
}
class zo {
  constructor(e, n) {
    this.dep = new Il(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = n ? e : K(e), this._value = n ? e : et(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, i = this.__v_isShallow || Te(e) || pt(e);
    e = i ? e : K(e), Pe(e, n) && (this._rawValue = e, this._value = i ? e : et(e), this.dep.trigger());
  }
}
const $l = { SKIP: "__v_skip" }, jn = {}, Zn = /* @__PURE__ */ new WeakMap();
let Lt;
function Go(t, e = false, n = Lt) {
  if (n) {
    let i = Zn.get(n);
    i || Zn.set(n, i = []), i.push(t);
  }
}
function Ko(t, e, n = ho) {
  const { immediate: i, deep: s, once: l, scheduler: a, augmentJob: o, call: d } = n, f = (I) => s ? I : Te(I) || s === false || s === 0 ? rt(I, 1) : rt(I);
  let r, c, v, b, m = false, x = false;
  if (Ae(t) ? (c = () => t.value, m = Te(t)) : wn(t) ? (c = () => f(t), m = true) : Qe(t) ? (x = true, m = t.some((I) => wn(I) || Te(I)), c = () => t.map((I) => {
    if (Ae(I)) return I.value;
    if (wn(I)) return f(I);
    if (mn(I)) return d ? d(I, 2) : I();
  })) : mn(t) ? e ? c = d ? () => d(t, 2) : t : c = () => {
    if (v) {
      Nl();
      try {
        v();
      } finally {
        yl();
      }
    }
    const I = Lt;
    Lt = r;
    try {
      return d ? d(t, 3, [b]) : t(b);
    } finally {
      Lt = I;
    }
  } : c = po, e && s) {
    const I = c, S = s === true ? 1 / 0 : s;
    c = () => rt(I(), S);
  }
  const g = So(), w = () => {
    r.stop(), g && g.active && go(g.effects, r);
  };
  if (l && e) {
    const I = e;
    e = (...S) => {
      const T = I(...S);
      return w(), T;
    };
  }
  let _ = x ? new Array(t.length).fill(jn) : jn;
  const N = (I) => {
    if (!(!(r.flags & 1) || !r.dirty && !I)) if (e) {
      const S = r.run();
      if (I || s || m || (x ? S.some((T, A) => Pe(T, _[A])) : Pe(S, _))) {
        v && v();
        const T = Lt;
        Lt = r;
        try {
          const A = [S, _ === jn ? void 0 : x && _[0] === jn ? [] : _, b];
          _ = S, d ? d(e, 3, A) : e(...A);
        } finally {
          Lt = T;
        }
      }
    } else r.run();
  };
  return o && o(N), r = new bl(c), r.scheduler = a ? () => a(N, false) : N, b = (I) => Go(I, false, r), v = r.onStop = () => {
    const I = Zn.get(r);
    if (I) {
      if (d) d(I, 4);
      else for (const S of I) S();
      Zn.delete(r);
    }
  }, e ? i ? N(true) : _ = r.run() : a ? a(N.bind(null, true), true) : r.run(), w.pause = r.pause.bind(r), w.resume = r.resume.bind(r), w.stop = w, w;
}
function rt(t, e = 1 / 0, n) {
  if (e <= 0 || !Xe(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(t) || 0) >= e)) return t;
  if (n.set(t, e), e--, Ae(t)) rt(t.value, e, n);
  else if (Qe(t)) for (let i = 0; i < t.length; i++) rt(t[i], e, n);
  else if (os(t) || Ct(t)) t.forEach((i) => {
    rt(i, e, n);
  });
  else if (rs(t)) {
    for (const i in t) rt(t[i], e, n);
    for (const i of Object.getOwnPropertySymbols(t)) Object.prototype.propertyIsEnumerable.call(t, i) && rt(t[i], e, n);
  }
  return t;
}
var _n;
(function(t) {
  t.$$__ignore__$$ = "$$__ignore__$$", t.$$__persist__$$ = "$$__persist__$$", t.$$__subscribe__$$ = "$$__subscribe__$$", t.$$__redux_dev_tool__$$ = "$$__redux_dev_tool__$$";
})(_n || (_n = {}));
const an = /* @__PURE__ */ new Set(), Zo = 20;
let ki = false, ji = 0;
const Rl = () => {
  const t = [...an.values()].slice(0);
  an.clear();
  for (const e of t) e.notify();
  if (ki = false, an.size) {
    if (ji++, ji > Zo) throw new Error(`[reactivity-store] have a infinity update for current store, pendingJobs: ${new Set(an)}`);
    Rl();
  }
}, qo = (t) => {
  an.add(t), !ki && (ki = true, ji = 0, Promise.resolve().then(Rl));
};
class Yo extends bl {
  get _isControllerEffect() {
    return true;
  }
  constructor(e) {
    super(e);
  }
}
const Jo = (t, e) => () => {
  if (e._isActive) try {
    const n = t();
    if (xo(n)) throw new Error("[reactivity-store] selector should be a pure function, but current is a async function");
    return n;
  } catch {
    return null;
  }
};
class Ds {
  constructor(e, n, i, s, l) {
    this._getState = e, this._compare = n, this._lifeCycle = i, this._namespace = s, this._onUpdate = l, this._listeners = /* @__PURE__ */ new Set(), this._updateCount = 0, this._isActive = true, this.notify = () => {
      var a;
      if (this._isActive) {
        this._updateCount++;
        try {
          (a = this._onUpdate) === null || a === void 0 || a.call(this);
        } catch {
          this._lifeCycle.canUpdateComponent = false;
        }
        this._listeners.forEach((o) => o());
      }
    }, this._scheduler = () => {
      const a = this._effect.run();
      if (!this._isActive) return;
      const o = this._compare(this._state, a);
      this._state = a, o || this._lifeCycle.canUpdateComponent && (this._lifeCycle.syncUpdateComponent ? this.notify() : qo(this));
    }, this.subscribe = (a) => (this._listeners.add(a), () => this._listeners.delete(a)), this.getState = () => this._updateCount, this.getEffect = () => this._effect, this.getSelectorState = () => this._getStateSafe(), this.getLifeCycle = () => this._lifeCycle, this._getStateSafe = Jo(e, this), this._effect = new Yo(this._getStateSafe), this._effect.scheduler = this._scheduler;
  }
  run() {
    this._state = this._effect.run();
  }
  stop() {
    this._effect.stop(), this._listeners.clear(), this._isActive = false, this._state = null;
  }
  setActive(e) {
    this._isActive = e;
  }
}
const Qo = () => ({ onBeforeMount: [], onBeforeUpdate: [], onBeforeUnmount: [], onMounted: [], onUpdated: [], onUnmounted: [], hasHookInstall: false, canUpdateComponent: true, syncUpdateComponent: false });
function Xo(t, e) {
  if (!Xe(t) || t[$l.SKIP] || M.isValidElement(t) || (e = e || /* @__PURE__ */ new Set(), e.has(t))) return t;
  if (e.add(t), Ae(t)) It(t.value, e);
  else if (Qe(t)) for (let n = 0; n < t.length; n++) It(t[n], e);
  else if (os(t) || Ct(t)) t.forEach((n) => {
    It(n, e);
  });
  else if (rs(t)) for (const n in t) It(t[n], e);
  return t;
}
function Ei(t) {
  if (!Xe(t) || t[$l.SKIP] || M.isValidElement(t)) return t;
  if (Ae(t)) t.value;
  else if (Qe(t)) for (let e = 0; e < t.length; e++) t[e];
  else if (os(t) || Ct(t)) t.forEach((e) => {
  });
  else if (rs(t)) for (const e in t) t[e];
  return t;
}
function It(t, e) {
  return Xo(t, e);
}
const Hi = (t) => {
  const e = M.useRef(t);
  return e.current = t, M.useCallback((...i) => {
    var s;
    return (s = e.current) === null || s === void 0 ? void 0 : s.call(null, ...i);
  }, []);
}, er = (t, e) => {
  const n = M.useRef();
  return n.current = typeof t == "function" ? t : null, Hi((s) => {
    if (n.current) {
      const l = n.current(s);
      return e ? It(l) : Ei(l), l;
    } else return e ? It(s) : Ei(s), s;
  });
}, Ms = (t) => {
  const e = M.useRef(t);
  return M.useEffect(() => {
    e.current = t;
  }, [t]), e.current;
}, tr = (t, e, n, i, s = true, l = false, a = true, o, d = void 0) => {
  const f = /* @__PURE__ */ new Set();
  let r = true;
  o = o || _n.$$__ignore__$$;
  let c = o !== _n.$$__ignore__$$ ? o : "RStoreAnonymous";
  c = c.startsWith("use") ? c : `use${c.charAt(0).toUpperCase()}${c.slice(1)}`;
  const v = (T) => {
    const A = T === "default" ? s : T === "deep" || T === "deep-stable", F = T === "default" ? l : T === "deep-stable" || T === "shallow-stable";
    function q(U, p) {
      const y = M.useRef(), L = er(U, A), k = Hi(() => {
        U ? y.current = U(Object.assign(Object.assign({}, e), d)) : y.current = Object.assign(Object.assign({}, e), d);
      }), E = Hi((W, R) => p && typeof p == "function" ? p(W, R) : false), C = F ? U : Ms(U), D = a ? p : Ms(p), $ = M.useMemo(() => new Ds(() => L(t), E, i, o, k), []);
      return Jn.useSyncExternalStore($.subscribe, $.getState, $.getState), M.useMemo(() => {
        $.run(), k();
      }, [$, k]), M.useMemo(() => {
        C !== U && ($.run(), k());
      }, [$, C, U]), M.useMemo(() => {
        D !== p && ($.run(), k());
      }, [$, D, p]), M.useEffect(() => ($.setActive(true), f.add($), () => {
        $.stop(), f.delete($);
      }), [$]), y.current;
    }
    return q;
  }, b = () => {
    const [T, A] = M.useState(false);
    M.useEffect(() => {
      if (i.hasHookInstall) if (!T) i.onBeforeMount.forEach((F) => F()), i.onMounted.forEach((F) => F()), A(true);
      else {
        const F = i.syncUpdateComponent;
        i.syncUpdateComponent = true, i.canUpdateComponent = false, i.onBeforeUpdate.forEach((q) => q()), i.canUpdateComponent = true, i.syncUpdateComponent = F, i.onUpdated.forEach((q) => q());
      }
    }), M.useEffect(() => () => {
      i.hasHookInstall && (i.onBeforeUnmount.forEach((F) => F()), i.onUnmounted.forEach((F) => F()));
    }, [i]);
  }, m = ({ key: T, value: A, single: F, compare: q = Object.is }) => new Promise((U, p) => {
    if (F == null ? void 0 : F.aborted) {
      p(F.reason);
      return;
    }
    const y = () => t[T], L = ({ cb: E } = {}) => {
      const C = y();
      return q(K(C), K(A)) ? (E == null ? void 0 : E(), U(), true) : false;
    };
    if (!L()) {
      const E = Ko(y, () => L({ cb: () => E.stop() }));
      if (F) {
        const C = () => {
          E.stop(), p(F.reason);
        };
        F.addEventListener("abort", C, { once: true });
      }
    }
  }), x = v("default"), g = v("deep"), w = v("deep-stable"), _ = v("shallow"), N = v("shallow-stable");
  function I(T, A) {
    return x(T, A);
  }
  const S = I;
  return S.getState = () => K(n), S.getLifeCycle = () => i, S.getActions = () => d, S.getReactiveState = () => t, S.getReadonlyState = () => e, S.waitingValueTo = m, S.useLifeCycle = b, S.useDeepSelector = g, S.useDeepStableSelector = w, S.useShallowSelector = _, S.useShallowStableSelector = N, S.subscribe = (T, A, F) => {
    const q = () => {
      const p = T(t);
      return F ? Ei(p) : It(p), p;
    }, U = new Ds(q, Object.is, i, _n.$$__subscribe__$$, () => A());
    return U.run(), f.add(U), () => {
      f.delete(U), U.stop();
    };
  }, S.getIsActive = () => r, S.clear = () => {
    f.forEach((T) => T.stop()), r = false;
  }, S;
}, nr = (t) => t.$$__state__$$ ? t.$$__state__$$ : t, ir = (t, e = "createStore", n) => {
  const i = t(), s = nr(i), l = K(s), a = hs(s), o = Kn(s), d = Qo();
  return tr(a, o, l, d);
}, sr = (t, e = "createStore", n) => {
  const i = Lo(), s = i.run(() => ir(t, e));
  return s.scope = i, s;
}, Wl = (t) => sr(t);
function En(t, e, n, i) {
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? t !== e || !i : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? i : n === "a" ? i.call(t) : i ? i.value : e.get(t);
}
function lr(t, e, n, i, s) {
  if (typeof e == "function" ? t !== e || true : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(t, n), n;
}
var Di, $n, Rn, Tl;
let gi = null;
const or = (t, e) => `${t.fontFamily}-${t.fontStyle}-${t.fontSize}-${e}`, rr = (t, e) => or(t, "0".repeat(e.length));
class ar {
  constructor() {
    Di.add(this), $n.set(this, ""), Rn.set(this, {});
  }
  measure(e, n) {
    const i = rr(n || {}, e);
    if (En(this, Rn, "f")[i]) return En(this, Rn, "f")[i];
    const s = En(this, Di, "m", Tl).call(this);
    if (n) {
      const a = `${n.fontFamily}-${n.fontStyle}-${n.fontSize}`;
      En(this, $n, "f") !== a && (lr(this, $n, a), s.font = `${n.fontStyle || ""} ${n.fontSize || ""} ${n.fontFamily || ""}`);
    } else s.font = "";
    return s.measureText(e).width;
  }
}
$n = /* @__PURE__ */ new WeakMap(), Rn = /* @__PURE__ */ new WeakMap(), Di = /* @__PURE__ */ new WeakSet(), Tl = function() {
  return gi = gi || document.createElement("canvas").getContext("2d"), gi;
};
let vi = null;
const dr = () => (vi = vi || new ar(), vi), Al = "--diff-add-content--", Fl = "--diff-del-content--", gt = "--diff-border--", Ul = "--diff-add-lineNumber--", Ol = "--diff-del-lineNumber--", Pl = "--diff-plain-content--", Mi = "--diff-expand-content--", He = "--diff-plain-lineNumber-color--", qn = "--diff-expand-lineNumber-color--", Bl = "--diff-plain-lineNumber--", cr = "--diff-expand-lineNumber--", Et = "--diff-hunk-content--", Zt = "--diff-hunk-content-color--", qt = "--diff-hunk-lineNumber--", Vl = "--diff-add-widget--", zl = "--diff-add-widget-color--", tt = "--diff-empty-content--", $i = (t, e, n) => t ? `var(${Al})` : e ? `var(${Fl})` : n ? `var(${Pl})` : `var(${Mi})`, Ri = (t, e, n) => t ? `var(${Ul})` : e ? `var(${Ol})` : n ? `var(${Bl})` : `var(${cr})`, Je = () => {
  var t;
  (t = window.getSelection()) === null || t === void 0 || t.removeAllRanges();
}, ur = (t, e) => {
  const n = function(i) {
    i === null || i.target === null || (i.target === t ? (e.scrollTop = t.scrollTop, e.scrollLeft = t.scrollLeft) : (t.scrollTop = e.scrollTop, t.scrollLeft = e.scrollLeft));
  };
  return t.onscroll || (t.onscroll = n), e.onscroll || (e.onscroll = n), () => {
    t.onscroll = null, e.onscroll = null;
  };
}, Gl = (t) => {
  if (t) {
    const e = t.getRootNode();
    return e instanceof ShadowRoot ? e : t.ownerDocument;
  }
  return document;
}, ps = (t) => {
  var e, n;
  if (t) if (typeof t.closest == "function") {
    const i = t.closest('[data-component="git-diff-view"]'), s = (e = i == null ? void 0 : i.querySelector) === null || e === void 0 ? void 0 : e.call(i, ".diff-view-wrapper");
    return (n = s == null ? void 0 : s.getAttribute) === null || n === void 0 ? void 0 : n.call(s, "id");
  } else {
    let i = t;
    for (; i; ) {
      if (i.getAttribute && i.getAttribute("data-component") === "git-diff-view") {
        const s = i.querySelector(".diff-view-wrapper");
        return s == null ? void 0 : s.getAttribute("id");
      }
      i = i.parentElement;
    }
  }
}, Le = "--diff-font-size--", ie = "--diff-aside-width--", fr = (t) => {
  const e = {};
  return ((n) => {
    if (e[n]) return e[n];
    const i = t(n);
    return e[n] = i, i;
  });
};
var Yn;
(function(t) {
  t[t.CRLF = 1] = "CRLF", t[t.CR = 2] = "CR", t[t.LF = 3] = "LF", t[t.NEWLINE = 4] = "NEWLINE", t[t.NORMAL = 5] = "NORMAL", t[t.NULL = 6] = "NULL";
})(Yn || (Yn = {}));
var Ce;
(function(t) {
  t[t.SplitGitHub = 1] = "SplitGitHub", t[t.SplitGitLab = 2] = "SplitGitLab", t[t.Split = 3] = "Split", t[t.Unified = 4] = "Unified";
})(Ce || (Ce = {}));
const hr = () => {
  const [t, e] = M.useState(false);
  return M.useEffect(() => {
    e(true);
  }, []), t;
}, pr = (t, e) => {
  const n = M.useRef(t);
  n.current = t, M.useEffect(() => n.current, e);
}, gr = typeof window < "u", vr = gr ? M.useLayoutEffect : M.useEffect, gs = ({ text: t, font: e }) => {
  const [n, i] = M.useState(() => {
    const s = parseInt(e.fontSize || "13");
    let l = 6;
    return l += s > 10 ? (s - 10) * 0.6 : 0, l * t.length;
  });
  return vr(() => {
    const s = dr().measure(t, e);
    i(s);
  }, [t, e]), n;
}, dn = ({ side: t, className: e, lineNumber: n, onWidgetClick: i, onOpenAddWidget: s }) => h.jsx("div", { "data-add-widget": j[t], className: "diff-add-widget-wrapper invisible select-none transition-transform hover:scale-110 group-hover:visible" + (e ? " " + e : ""), style: { width: `calc(var(${Le}) * 1.4)`, height: `calc(var(${Le}) * 1.4)`, top: `calc(var(${Le}) * 0.1)` }, children: h.jsx("button", { className: "diff-add-widget z-[1] flex h-full w-full origin-center cursor-pointer items-center justify-center rounded-md text-[1.2em]", style: { color: `var(${zl})`, backgroundColor: `var(${Vl})` }, onMouseDown: (l) => {
  l.stopPropagation(), s(n, t), i == null ? void 0 : i(n, t);
}, children: "+" }) }), vs = ({ lineNumber: t, side: e, onWidgetClick: n, onOpenAddWidget: i }) => h.jsx("div", { "data-add-widget": j[e], className: "diff-add-widget-wrapper invisible absolute left-[100%] translate-x-[-50%] select-none transition-transform hover:scale-110 group-hover:visible", style: { width: `calc(var(${Le}) * 1.4)`, height: `calc(var(${Le}) * 1.4)`, top: `calc(var(${Le}) * 0.1)` }, children: h.jsx("button", { className: "diff-add-widget z-[1] flex h-full w-full origin-center cursor-pointer items-center justify-center rounded-md text-[1.2em]", style: { color: `var(${zl})`, backgroundColor: `var(${Vl})` }, onMouseDown: (s) => {
  s.stopPropagation(), i(t, e), n == null ? void 0 : n(t, e);
}, children: "+" }) }), Kl = () => h.jsxs("svg", { "aria-label": "No newline at end of file", role: "img", viewBox: "0 0 16 16", version: "1.1", fill: "currentColor", children: [h.jsx("path", { d: "M4.25 7.25a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Z" }), h.jsx("path", { d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z" })] }), mr = {}, xr = (t) => {
  if (t.startsWith("--")) return t;
  const e = t.split("-");
  return e.length === 1 ? e[0] : e[0] + e.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
}, br = fr((t) => {
  if (!t) return mr;
  const e = {};
  return t.split(";").forEach((n) => {
    const [i, s] = n.split(":");
    if (!i) return;
    const l = xr(i.trim());
    e[l] = s.trim();
  }), e;
}), Zl = ({ rawLine: t, diffLine: e, operator: n, plainLine: i, enableWrap: s }) => {
  const l = e == null ? void 0 : e.changes;
  if (l == null ? void 0 : l.hasLineChange) {
    const a = l.newLineSymbol;
    if (!(e == null ? void 0 : e.plainTemplate) && typeof Gt == "function" && Gt({ diffLine: e, rawLine: t, operator: n }), e == null ? void 0 : e.plainTemplate) return h.jsxs("span", { className: "diff-line-content-raw", children: [h.jsx("span", { "data-template": true, dangerouslySetInnerHTML: { __html: e.plainTemplate } }), a === Yn.NEWLINE && h.jsx("span", { "data-no-newline-at-end-of-file-symbol": true, className: s ? "block !text-red-500" : "inline-block align-middle !text-red-500", style: { width: `var(${Le})`, height: `var(${Le})` }, children: h.jsx(Kl, {}) })] });
  }
  return i && !(i == null ? void 0 : i.template) && (i.template = ei(i.value)), (i == null ? void 0 : i.template) ? h.jsx("span", { className: "diff-line-content-raw", children: h.jsx("span", { "data-template": true, dangerouslySetInnerHTML: { __html: i.template } }) }) : h.jsx("span", { className: "diff-line-content-raw", children: t });
}, wr = ({ rawLine: t, diffFile: e, diffLine: n, operator: i, syntaxLine: s, enableWrap: l }) => {
  var a;
  if (!s) return h.jsx(Zl, { rawLine: t, diffLine: n, operator: i, enableWrap: l });
  const o = n == null ? void 0 : n.changes;
  if (o == null ? void 0 : o.hasLineChange) {
    const d = o.newLineSymbol;
    if (!(n == null ? void 0 : n.syntaxTemplate) && typeof Kt == "function" && Kt({ diffFile: e, diffLine: n, syntaxLine: s, operator: i }), n == null ? void 0 : n.syntaxTemplate) return h.jsxs("span", { className: "diff-line-syntax-raw", children: [h.jsx("span", { "data-template": true, dangerouslySetInnerHTML: { __html: n.syntaxTemplate } }), d === Yn.NEWLINE && h.jsx("span", { "data-no-newline-at-end-of-file-symbol": true, className: l ? "block !text-red-500" : "inline-block align-middle !text-red-500", style: { width: `var(${Le})`, height: `var(${Le})` }, children: h.jsx(Kl, {}) })] });
  }
  return s.template || (s.template = Xn(s)), (s == null ? void 0 : s.template) ? h.jsx("span", { className: "diff-line-syntax-raw", children: h.jsx("span", { "data-template": true, dangerouslySetInnerHTML: { __html: s.template } }) }) : h.jsx("span", { className: "diff-line-syntax-raw", children: (a = s == null ? void 0 : s.nodeList) === null || a === void 0 ? void 0 : a.map(({ node: d, wrapper: f }, r) => {
    var c, v, b;
    return h.jsx("span", { "data-start": d.startIndex, "data-end": d.endIndex, className: (v = (c = f == null ? void 0 : f.properties) === null || c === void 0 ? void 0 : c.className) === null || v === void 0 ? void 0 : v.join(" "), style: br(((b = f == null ? void 0 : f.properties) === null || b === void 0 ? void 0 : b.style) || ""), children: d.value }, r);
  }) });
}, Yt = ({ diffFile: t, diffLine: e, rawLine: n, plainLine: i, syntaxLine: s, enableWrap: l, enableHighlight: a }) => {
  var o;
  const d = (e == null ? void 0 : e.type) === Z.Add, f = (e == null ? void 0 : e.type) === Z.Delete, r = s && ((o = s == null ? void 0 : s.nodeList) === null || o === void 0 ? void 0 : o.length) > 150;
  return h.jsxs("div", { className: "diff-line-content-item pl-[2.0em]", style: { whiteSpace: l ? "pre-wrap" : "pre", wordBreak: l ? "break-all" : "initial" }, children: [h.jsx("span", { "data-operator": d ? "+" : f ? "-" : void 0, className: "diff-line-content-operator ml-[-1.5em] inline-block w-[1.5em] select-none indent-[0.2em]", children: d ? "+" : f ? "-" : " " }), a && s && !r ? h.jsx(wr, { operator: d ? "add" : f ? "del" : void 0, rawLine: n, diffFile: t, diffLine: e, syntaxLine: s, enableWrap: l }) : h.jsx(Zl, { operator: d ? "add" : f ? "del" : void 0, rawLine: n, diffLine: e, plainLine: i, enableWrap: l })] });
}, ms = M.createContext(null);
ms.displayName = "DiffViewContext";
const ge = () => M.useContext(ms), oi = M.createContext(null);
oi.displayName = "DiffWidgetContext";
const nt = () => M.useContext(oi), _r = ({ index: t, diffFile: e, lineNumber: n, side: i, enableAddWidget: s, enableHighlight: l }) => {
  var a, o, d, f, r;
  const c = i === j.old ? e.getOldSyntaxLine : e.getNewSyntaxLine, v = i === j.old ? e.getOldPlainLine : e.getNewPlainLine, b = e.getSplitLeftLine(t), m = e.getSplitRightLine(t), x = i === j.old ? b : m, g = !!(x == null ? void 0 : x.diff), w = !!(x == null ? void 0 : x.lineNumber), _ = Vt(x == null ? void 0 : x.diff), N = ((a = x == null ? void 0 : x.diff) === null || a === void 0 ? void 0 : a.type) === Z.Add, I = ((o = x == null ? void 0 : x.diff) === null || o === void 0 ? void 0 : o.type) === Z.Delete, { useDiffContext: S } = ge(), T = S.getReadonlyState().onAddWidgetClick, { useWidget: A } = nt(), F = A.getReadonlyState().setWidget, q = $i(N, I, g), U = Ri(N, I, g), p = c((d = x.lineNumber) !== null && d !== void 0 ? d : -1), y = v((f = x.lineNumber) !== null && f !== void 0 ? f : -1);
  return h.jsx("tr", { "data-line": n, "data-state": g || !w ? "diff" : "plain", "data-side": j[i], className: "diff-line" + (w ? " group" : ""), children: w ? h.jsxs(h.Fragment, { children: [h.jsxs("td", { className: `diff-line-${j[i]}-num sticky left-0 z-[1] w-[1%] min-w-[40px] select-none pl-[10px] pr-[10px] text-right align-top`, style: { backgroundColor: U, color: `var(${g ? He : qn})`, width: `var(${ie})`, minWidth: `var(${ie})`, maxWidth: `var(${ie})` }, children: [g && s && h.jsx(dn, { index: t, lineNumber: (r = x.lineNumber) !== null && r !== void 0 ? r : -1, side: i, diffFile: e, onWidgetClick: (...L) => {
    var k;
    return (k = T.current) === null || k === void 0 ? void 0 : k.call(T, ...L);
  }, className: "absolute left-[100%] z-[1] translate-x-[-50%]", onOpenAddWidget: (L, k) => F({ lineNumber: L, side: k }) }), h.jsx("span", { "data-line-num": x.lineNumber, style: { opacity: _ ? void 0 : 0.5 }, children: x.lineNumber })] }), h.jsx("td", { className: `diff-line-${j[i]}-content pr-[10px] align-top`, style: { backgroundColor: q }, children: h.jsx(Yt, { enableWrap: false, diffFile: e, rawLine: (x == null ? void 0 : x.value) || "", diffLine: x == null ? void 0 : x.diff, plainLine: y, syntaxLine: p, enableHighlight: l }) })] }) : h.jsx("td", { className: `diff-line-${j[i]}-placeholder select-none`, style: { backgroundColor: `var(${tt})` }, colSpan: 2, children: h.jsx("span", { children: "\u2002" }) }) });
}, Lr = ({ index: t, diffFile: e, lineNumber: n, side: i, enableAddWidget: s, enableHighlight: l }) => {
  const o = (i === j.old ? e.getSplitLeftLine : e.getSplitRightLine)(t);
  return (o == null ? void 0 : o.isHidden) ? null : h.jsx(_r, { index: t, diffFile: e, lineNumber: n, side: i, enableAddWidget: s, enableHighlight: l });
}, ri = ({ selector: t, enable: e }) => {
  const [n, i] = M.useState(0), { useDiffContext: s } = ge(), { id: l, mounted: a, dom: o } = s.useShallowStableSelector((d) => ({ id: d.id, mounted: d.mounted, dom: d.dom }));
  return M.useEffect(() => {
    if (e) {
      const f = Gl(o).querySelector(`#diff-root${l}`), r = f == null ? void 0 : f.querySelector(t);
      if (!r) return;
      const c = r, v = () => {
        var x;
        const g = r == null ? void 0 : r.getBoundingClientRect();
        i((x = g == null ? void 0 : g.width) !== null && x !== void 0 ? x : 0);
      };
      v();
      const b = () => {
        var x, g, w;
        (x = c == null ? void 0 : c.__observeCallback) === null || x === void 0 || x.delete(v), ((g = c == null ? void 0 : c.__observeCallback) === null || g === void 0 ? void 0 : g.size) === 0 && ((w = c.__observeInstance) === null || w === void 0 || w.disconnect(), c.removeAttribute("data-observe"), delete c.__observeCallback, delete c.__observeInstance);
      };
      if (c.__observeCallback) return c.__observeCallback.add(v), () => b();
      c.__observeCallback = /* @__PURE__ */ new Set(), c.__observeCallback.add(v);
      const m = new ResizeObserver(() => {
        var x;
        return (x = c == null ? void 0 : c.__observeCallback) === null || x === void 0 ? void 0 : x.forEach((g) => g());
      });
      return c.__observeInstance = m, m.observe(c), c.setAttribute("data-observe", "height"), () => b();
    }
  }, [t, e, l, a, o]), n;
}, ai = ({ selector: t, wrapper: e, side: n, enable: i }) => {
  const { useDiffContext: s } = ge(), { id: l, mounted: a, dom: o } = s.useShallowStableSelector((d) => ({ id: d.id, mounted: d.mounted, dom: d.dom }));
  M.useEffect(() => {
    if (i) {
      const f = Gl(o).querySelector(`#diff-root${l}`), r = Array.from((f == null ? void 0 : f.querySelectorAll(t)) || []), c = e ? Array.from((f == null ? void 0 : f.querySelectorAll(e)) || []) : r;
      if (r.length === 2 && c.length === 2) {
        const v = r[0], b = r[1], m = c[0], x = c[1], g = v.getAttribute("data-side") === n ? v : b, w = g, _ = () => {
          v.style.height = "auto", b.style.height = "auto";
          const S = v.getBoundingClientRect(), T = b.getBoundingClientRect(), A = Math.max(S.height, T.height);
          m.style.height = A + "px", x.style.height = A + "px", m.setAttribute("data-sync-height", String(A)), x.setAttribute("data-sync-height", String(A));
        };
        _();
        const N = () => {
          var S, T, A;
          (S = w == null ? void 0 : w.__observeCallback) === null || S === void 0 || S.delete(_), ((T = w == null ? void 0 : w.__observeCallback) === null || T === void 0 ? void 0 : T.size) === 0 && ((A = w.__observeInstance) === null || A === void 0 || A.disconnect(), w.removeAttribute("data-observe"), delete w.__observeCallback, delete w.__observeInstance);
        };
        if (w.__observeCallback) return w.__observeCallback.add(_), () => N();
        w.__observeCallback = /* @__PURE__ */ new Set(), w.__observeCallback.add(_);
        const I = new ResizeObserver(() => {
          var S;
          return (S = w == null ? void 0 : w.__observeCallback) === null || S === void 0 ? void 0 : S.forEach((T) => T());
        });
        return w.__observeInstance = I, I.observe(g), g.setAttribute("data-observe", "height"), () => N();
      }
    }
  }, [t, i, n, l, e, a, o]);
}, Sr = ({ index: t, diffFile: e, oldLineExtend: n, newLineExtend: i, side: s, lineNumber: l }) => {
  const { useDiffContext: a } = ge(), o = e.getSplitLeftLine(t), d = e.getSplitRightLine(t), f = a.useShallowStableSelector((w) => w.renderExtendLine), r = s === j.old ? n : i, c = s === j.old ? j.new : j.old, v = s === j.old ? o.lineNumber : d.lineNumber, b = (r == null ? void 0 : r.data) !== void 0 && (r == null ? void 0 : r.data) !== null, m = (n == null ? void 0 : n.data) !== void 0 && (n == null ? void 0 : n.data) !== null || (i == null ? void 0 : i.data) !== void 0 && (i == null ? void 0 : i.data) !== null, x = m && (f == null ? void 0 : f({ diffFile: e, side: s, lineNumber: v ?? -1, data: r == null ? void 0 : r.data, onUpdate: e.notifyAll }));
  ai({ selector: `div[data-line="${l}-extend-content"]`, wrapper: `tr[data-line="${l}-extend"]`, side: j[b ? s : c], enable: m && typeof f == "function" });
  const g = ri({ selector: s === j.old ? ".old-diff-table-wrapper" : ".new-diff-table-wrapper", enable: b && typeof f == "function" });
  return f ? h.jsx("tr", { "data-line": `${l}-extend`, "data-state": "extend", "data-side": j[s], className: "diff-line diff-line-extend", children: b ? h.jsx("td", { className: `diff-line-extend-${j[s]}-content p-0`, colSpan: 2, children: h.jsx("div", { "data-line": `${l}-extend-content`, "data-side": j[s], className: "diff-line-extend-wrapper sticky left-0 z-[1]", style: { width: g }, children: g > 0 && x }) }) : h.jsx("td", { className: `diff-line-extend-${j[s]}-placeholder select-none p-0`, style: { backgroundColor: `var(${tt})` }, colSpan: 2, children: h.jsx("div", { "data-line": `${l}-extend-content`, "data-side": j[s] }) }) }) : null;
}, Nr = ({ index: t, diffFile: e, side: n, lineNumber: i }) => {
  const { useDiffContext: s } = ge(), l = e.getSplitLeftLine(t), a = e.getSplitRightLine(t), { oldLineExtend: o, newLineExtend: d } = s(M.useCallback((b) => {
    var m, x, g, w, _, N;
    return { oldLineExtend: (x = (m = b.extendData) === null || m === void 0 ? void 0 : m.oldFile) === null || x === void 0 ? void 0 : x[(g = l == null ? void 0 : l.lineNumber) !== null && g !== void 0 ? g : -1], newLineExtend: (_ = (w = b.extendData) === null || w === void 0 ? void 0 : w.newFile) === null || _ === void 0 ? void 0 : _[(N = a == null ? void 0 : a.lineNumber) !== null && N !== void 0 ? N : -1] };
  }, [l == null ? void 0 : l.lineNumber, a == null ? void 0 : a.lineNumber])), f = (o == null ? void 0 : o.data) || (d == null ? void 0 : d.data), r = e.getExpandEnabled(), c = n === j.old ? l : a;
  return f && (!c.isHidden || !r) ? h.jsx(Sr, { side: n, index: t, diffFile: e, lineNumber: i, oldLineExtend: o, newLineExtend: d }) : null;
}, je = ({ className: t }) => h.jsx("svg", { "aria-hidden": "true", height: "16", viewBox: "0 0 16 16", version: "1.1", width: "16", className: t, children: h.jsx("path", { d: "m8.177 14.323 2.896-2.896a.25.25 0 0 0-.177-.427H8.75V7.764a.75.75 0 1 0-1.5 0V11H5.104a.25.25 0 0 0-.177.427l2.896 2.896a.25.25 0 0 0 .354 0ZM2.25 5a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM6 4.25a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5a.75.75 0 0 1 .75.75ZM8.25 5a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM12 4.25a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5a.75.75 0 0 1 .75.75Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5Z" }) }), Ee = ({ className: t }) => h.jsx("svg", { "aria-hidden": "true", height: "16", viewBox: "0 0 16 16", version: "1.1", width: "16", className: t, children: h.jsx("path", { d: "M7.823 1.677 4.927 4.573A.25.25 0 0 0 5.104 5H7.25v3.236a.75.75 0 1 0 1.5 0V5h2.146a.25.25 0 0 0 .177-.427L8.177 1.677a.25.25 0 0 0-.354 0ZM13.75 11a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5Zm-3.75.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75ZM7.75 11a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5ZM4 11.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75ZM1.75 11a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5Z" }) }), Jt = ({ className: t }) => h.jsx("svg", { "aria-hidden": "true", height: "16", viewBox: "0 0 16 16", version: "1.1", width: "16", className: t, children: h.jsx("path", { d: "m8.177.677 2.896 2.896a.25.25 0 0 1-.177.427H8.75v1.25a.75.75 0 0 1-1.5 0V4H5.104a.25.25 0 0 1-.177-.427L7.823.677a.25.25 0 0 1 .354 0ZM7.25 10.75a.75.75 0 0 1 1.5 0V12h2.146a.25.25 0 0 1 .177.427l-2.896 2.896a.25.25 0 0 1-.354 0l-2.896-2.896A.25.25 0 0 1 5.104 12H7.25v-1.25Zm-5-2a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM6 8a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5A.75.75 0 0 1 6 8Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM12 8a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5A.75.75 0 0 1 12 8Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5Z" }) }), yr = ({ index: t, diffFile: e, side: n, lineNumber: i }) => {
  var s;
  const l = e.getSplitHunkLine(t), a = e.getExpandEnabled();
  ai({ selector: `tr[data-line="${i}-hunk"]`, side: j[j.old], enable: n === j.new });
  const o = n === j.old, d = a && l && l.splitInfo, f = l && l.splitInfo && l.splitInfo.endHiddenIndex - l.splitInfo.startHiddenIndex < X, r = l && l.isFirst, c = l && l.isLast;
  return h.jsx("tr", { "data-line": `${i}-hunk`, "data-state": "hunk", "data-side": j[n], className: "diff-line diff-line-hunk", children: o ? h.jsxs(h.Fragment, { children: [h.jsx("td", { className: "diff-line-hunk-action sticky left-0 w-[1%] min-w-[40px] select-none p-[1px]", style: { backgroundColor: `var(${qt})`, color: `var(${He})`, width: `var(${ie})`, minWidth: `var(${ie})`, maxWidth: `var(${ie})` }, children: d ? r ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand Up", "data-title": "Expand Up", onClick: () => e.onSplitHunkExpand("up", t), children: h.jsx(Ee, { className: "fill-current" }) }) : c ? h.jsx("button", { className: "diff-widget-tooltip relative flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand Down", "data-title": "Expand Down", onClick: () => e.onSplitHunkExpand("down", t), children: h.jsx(je, { className: "fill-current" }) }) : f ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand All", "data-title": "Expand All", onClick: () => e.onSplitHunkExpand("all", t), children: h.jsx(Jt, { className: "fill-current" }) }) : h.jsxs(h.Fragment, { children: [h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[2px]", title: "Expand Down", "data-title": "Expand Down", onClick: () => e.onSplitHunkExpand("down", t), children: h.jsx(je, { className: "fill-current" }) }), h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[2px]", title: "Expand Up", "data-title": "Expand Up", onClick: () => e.onSplitHunkExpand("up", t), children: h.jsx(Ee, { className: "fill-current" }) })] }) : h.jsx("div", { className: "min-h-[28px]", children: "\u2002" }) }), h.jsx("td", { className: "diff-line-hunk-content pr-[10px] align-middle", style: { backgroundColor: `var(${Et})` }, children: h.jsx("div", { className: "pl-[1.5em]", style: { color: `var(${Zt})` }, children: ((s = l.splitInfo) === null || s === void 0 ? void 0 : s.plainText) || l.text }) })] }) : h.jsx("td", { className: "diff-line-hunk-placeholder select-none", colSpan: 2, style: { backgroundColor: `var(${Et})` }, children: h.jsx("div", { className: "min-h-[28px]", children: "\u2002" }) }) });
}, Ir = ({ index: t, diffFile: e, side: n, lineNumber: i }) => {
  var s;
  const l = e.getSplitHunkLine(t), a = e.getExpandEnabled();
  ai({ selector: `tr[data-line="${i}-hunk"]`, side: j[j.old], enable: n === j.new });
  const o = a && l && l.splitInfo, d = l && l.splitInfo && l.splitInfo.endHiddenIndex - l.splitInfo.startHiddenIndex < X, f = l && l.isFirst, r = l && l.isLast;
  return h.jsxs("tr", { "data-line": `${i}-hunk`, "data-state": "hunk", "data-side": j[n], className: "diff-line diff-line-hunk", children: [h.jsx("td", { className: "diff-line-hunk-action sticky left-0 w-[1%] min-w-[40px] select-none p-[1px]", style: { backgroundColor: `var(${qt})`, color: `var(${He})`, width: `var(${ie})`, minWidth: `var(${ie})`, maxWidth: `var(${ie})` }, children: o ? f ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand Up", "data-title": "Expand Up", onClick: () => e.onSplitHunkExpand("up", t), children: h.jsx(Ee, { className: "fill-current" }) }) : r ? h.jsx("button", { className: "diff-widget-tooltip relative flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand Down", "data-title": "Expand Down", onClick: () => e.onSplitHunkExpand("down", t), children: h.jsx(je, { className: "fill-current" }) }) : d ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand All", "data-title": "Expand All", onClick: () => e.onSplitHunkExpand("all", t), children: h.jsx(Jt, { className: "fill-current" }) }) : h.jsxs(h.Fragment, { children: [h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[2px]", title: "Expand Down", "data-title": "Expand Down", onClick: () => e.onSplitHunkExpand("down", t), children: h.jsx(je, { className: "fill-current" }) }), h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[2px]", title: "Expand Up", "data-title": "Expand Up", onClick: () => e.onSplitHunkExpand("up", t), children: h.jsx(Ee, { className: "fill-current" }) })] }) : h.jsx("div", { className: "min-h-[28px]", children: "\u2002" }) }), h.jsx("td", { className: "diff-line-hunk-content pr-[10px] align-middle", style: { backgroundColor: `var(${Et})` }, children: h.jsx("div", { className: "pl-[1.5em]", style: { color: `var(${Zt})` }, children: ((s = l.splitInfo) === null || s === void 0 ? void 0 : s.plainText) || l.text }) })] });
}, Cr = ({ index: t, diffFile: e, side: n, lineNumber: i }) => {
  const { useDiffContext: s } = ge(), l = s.useShallowStableSelector((a) => a.mode);
  return l === Ce.SplitGitHub || l === Ce.Split || l === Ce.Unified ? h.jsx(yr, { index: t, diffFile: e, side: n, lineNumber: i }) : h.jsx(Ir, { index: t, diffFile: e, side: n, lineNumber: i });
}, $s = ({ index: t, diffFile: e, side: n, lineNumber: i }) => {
  const s = e.getSplitHunkLine(t), l = s && s.splitInfo && s.splitInfo.startHiddenIndex < s.splitInfo.endHiddenIndex, a = s && e._getIsPureDiffRender() && !s.splitInfo;
  return !l && !a ? null : h.jsx(Cr, { index: t, diffFile: e, side: n, lineNumber: i });
}, kr = ({ index: t, side: e, diffFile: n, lineNumber: i }) => {
  var s;
  const { useWidget: l } = nt(), { useDiffContext: a } = ge(), o = n.getSplitLeftLine(t), d = n.getSplitRightLine(t), f = l.useShallowStableSelector((S) => S.widgetSide), r = l.getReadonlyState().widgetLineNumber, c = l.getReadonlyState().setWidget, v = o.lineNumber && f === j.old && r === o.lineNumber, b = d.lineNumber && f === j.new && r === d.lineNumber, m = e === j.old ? o : d, x = e === j.old ? j.new : j.old, g = e === j.old ? v : b, w = v || b, _ = a.useShallowStableSelector((S) => S.renderWidgetLine), N = g && (_ == null ? void 0 : _({ diffFile: n, side: e, lineNumber: (s = m.lineNumber) !== null && s !== void 0 ? s : -1, onClose: () => c({}) }));
  ai({ selector: `div[data-line="${i}-widget-content"]`, wrapper: `tr[data-line="${i}-widget"]`, side: j[g ? e : x], enable: !!w && typeof _ == "function" });
  const I = ri({ selector: e === j.old ? ".old-diff-table-wrapper" : ".new-diff-table-wrapper", enable: !!g && typeof _ == "function" });
  return _ ? h.jsx("tr", { "data-line": `${i}-widget`, "data-state": "widget", "data-side": j[e], className: "diff-line diff-line-widget", children: g ? h.jsx("td", { className: `diff-line-widget-${j[e]}-content p-0`, colSpan: 2, children: h.jsx("div", { "data-line": `${i}-widget-content`, "data-side": j[e], className: "diff-line-widget-wrapper sticky left-0 z-[1]", style: { width: I }, children: I > 0 && N }) }) : h.jsx("td", { className: `diff-line-widget-${j[e]}-placeholder p-0`, style: { backgroundColor: `var(${tt})` }, colSpan: 2, children: h.jsx("div", { "data-line": `${i}-widget-content`, "data-side": j[e] }) }) }) : null;
}, jr = ({ index: t, side: e, diffFile: n, lineNumber: i }) => {
  const { useWidget: s } = nt();
  return s.useShallowSelector(M.useCallback((a) => {
    const o = a.widgetLineNumber, d = a.widgetSide, f = n.getSplitLeftLine(t), r = n.getSplitRightLine(t), c = f.lineNumber && d === j.old && o === f.lineNumber, v = r.lineNumber && d === j.new && o === r.lineNumber;
    return c || v;
  }, [n, t]), (a, o) => a === o) ? h.jsx(kr, { index: t, side: e, diffFile: n, lineNumber: i }) : null;
}, Rs = ({ side: t, diffFile: e, enableAddWidget: n, enableHighlight: i, onMouseDown: s }) => {
  const l = t === j.new ? "new-diff-table" : "old-diff-table", a = ni(e);
  return h.jsxs("table", { className: l + " w-full border-collapse border-spacing-0", "data-mode": j[t], children: [h.jsxs("colgroup", { children: [h.jsx("col", { className: `diff-table-${j[t]}-num-col` }), h.jsx("col", { className: `diff-table-${j[t]}-content-col` })] }), h.jsx("thead", { className: "hidden", children: h.jsxs("tr", { children: [h.jsxs("th", { scope: "col", children: [j[t], " line number"] }), h.jsxs("th", { scope: "col", children: [j[t], " line content"] })] }) }), h.jsxs("tbody", { className: "diff-table-body leading-[1.6]", onMouseDownCapture: s, children: [a.map((o) => h.jsxs(M.Fragment, { children: [h.jsx($s, { index: o.index, side: t, lineNumber: o.lineNumber, diffFile: e }), h.jsx(Lr, { index: o.index, side: t, lineNumber: o.lineNumber, diffFile: e, enableAddWidget: n, enableHighlight: i }), h.jsx(jr, { index: o.index, side: t, lineNumber: o.lineNumber, diffFile: e }), h.jsx(Nr, { index: o.index, side: t, lineNumber: o.lineNumber, diffFile: e })] }, o.index)), h.jsx($s, { side: t, index: e.splitLineLength, lineNumber: e.splitLineLength, diffFile: e })] })] });
}, ql = M.memo(({ diffFile: t }) => {
  const e = M.useRef(null), n = M.useRef(null), i = M.useRef(null), s = M.useRef(void 0), l = Math.max(t.splitLineLength, t.fileLineLength), { useDiffContext: a } = ge(), { fontSize: o, enableAddWidget: d, enableHighlight: f } = a.useShallowStableSelector((x) => ({ fontSize: x.fontSize, enableAddWidget: x.enableAddWidget, enableHighlight: x.enableHighlight }));
  Jn.useSyncExternalStore(t.subscribe, t.getUpdateCount, t.getUpdateCount), M.useEffect(() => {
    const x = e.current, g = n.current;
    if (!(!x || !g)) return ur(x, g);
  }, []);
  const r = M.useMemo(() => ({ fontSize: o + "px", fontFamily: "Menlo, Consolas, monospace" }), [o]), c = gs({ text: l.toString(), font: r }), v = Math.max(40, c + 25), b = (x) => {
    if (i.current) if (!x) i.current.textContent = "";
    else {
      const g = `diff-root${t.getId()}`;
      i.current.textContent = `#${g} [data-state="extend"] {user-select: none} 
#${g} [data-state="hunk"] {user-select: none} 
#${g} [data-state="widget"] {user-select: none}`;
    }
  }, m = (x) => {
    let g = x.target;
    if (g && g instanceof HTMLElement && g.nodeName === "BUTTON") {
      Je();
      return;
    }
    const w = ps(g);
    if (!(w && w !== `diff-root${t.getId()}`)) for (; g && g instanceof HTMLElement; ) {
      const _ = g.getAttribute("data-state"), N = g.getAttribute("data-side");
      if (N && s.current !== j[N] && (s.current = j[N], b(j[N]), Je()), _) if (_ === "extend" || _ === "hunk" || _ === "widget") {
        s.current !== void 0 && (s.current = void 0, b(void 0), Je());
        return;
      } else return;
      g = g.parentElement;
    }
  };
  return h.jsxs("div", { className: "split-diff-view split-diff-view-normal flex w-full basis-[50%]", children: [h.jsx("style", { "data-select-style": true, ref: i }), h.jsx("div", { className: "old-diff-table-wrapper diff-table-scroll-container w-full overflow-x-auto overflow-y-hidden", ref: e, style: { [ie]: `${Math.round(v)}px`, overscrollBehaviorX: "none", fontFamily: "Menlo, Consolas, monospace", fontSize: `var(${Le})` }, children: h.jsx(Rs, { side: j.old, diffFile: t, enableAddWidget: !!d, enableHighlight: !!f, onMouseDown: m }) }), h.jsx("div", { className: "diff-split-line w-[1.5px]", style: { backgroundColor: `var(${gt})` } }), h.jsx("div", { className: "new-diff-table-wrapper diff-table-scroll-container w-full overflow-x-auto overflow-y-hidden", ref: n, style: { [ie]: `${Math.round(v)}px`, overscrollBehaviorX: "none", fontFamily: "Menlo, Consolas, monospace", fontSize: `var(${Le})` }, children: h.jsx(Rs, { side: j.new, diffFile: t, enableAddWidget: !!d, enableHighlight: !!f, onMouseDown: m }) })] });
});
ql.displayName = "DiffSplitViewNormal";
const Er = ({ index: t, diffFile: e, lineNumber: n, enableAddWidget: i, enableHighlight: s }) => {
  var l, a, o, d, f, r, c, v, b, m;
  const x = e.getSplitLeftLine(t), g = e.getSplitRightLine(t), w = e.getOldSyntaxLine((l = x == null ? void 0 : x.lineNumber) !== null && l !== void 0 ? l : -1), _ = e.getOldPlainLine((a = x.lineNumber) !== null && a !== void 0 ? a : -1), N = e.getNewSyntaxLine((o = g == null ? void 0 : g.lineNumber) !== null && o !== void 0 ? o : -1), I = e.getNewPlainLine((d = g.lineNumber) !== null && d !== void 0 ? d : -1), S = !!(x == null ? void 0 : x.diff) || !!(g == null ? void 0 : g.diff), T = Vt(x == null ? void 0 : x.diff) || Vt(g == null ? void 0 : g.diff), A = ((f = x == null ? void 0 : x.diff) === null || f === void 0 ? void 0 : f.type) === Z.Delete, F = ((r = g == null ? void 0 : g.diff) === null || r === void 0 ? void 0 : r.type) === Z.Add, { useDiffContext: q } = ge(), U = q.getReadonlyState().onAddWidgetClick, { useWidget: p } = nt(), y = p.getReadonlyState().setWidget, L = !!x.lineNumber, k = !!g.lineNumber, E = $i(false, A, S), C = Ri(false, A, S), D = $i(F, false, S), $ = Ri(F, false, S);
  return h.jsxs("tr", { "data-line": n, "data-state": S ? "diff" : "plain", className: "diff-line", children: [L ? h.jsxs(h.Fragment, { children: [h.jsxs("td", { className: "diff-line-old-num group relative w-[1%] min-w-[40px] select-none pl-[10px] pr-[10px] text-right align-top", "data-side": j[j.old], style: { backgroundColor: C, color: `var(${S ? He : qn})` }, children: [S && i && h.jsx(dn, { index: t, lineNumber: (c = x.lineNumber) !== null && c !== void 0 ? c : -1, side: j.old, diffFile: e, onWidgetClick: (...W) => {
    var R;
    return (R = U.current) === null || R === void 0 ? void 0 : R.call(U, ...W);
  }, className: "absolute left-[100%] z-[1] translate-x-[-50%]", onOpenAddWidget: (W, R) => y({ lineNumber: W, side: R }) }), h.jsx("span", { "data-line-num": x.lineNumber, style: { opacity: T ? void 0 : 0.5 }, children: x.lineNumber })] }), h.jsxs("td", { className: "diff-line-old-content group relative pr-[10px] align-top", "data-side": j[j.old], style: { backgroundColor: E }, children: [S && i && h.jsx(dn, { index: t, lineNumber: (v = x.lineNumber) !== null && v !== void 0 ? v : -1, side: j.old, diffFile: e, onWidgetClick: (...W) => {
    var R;
    return (R = U.current) === null || R === void 0 ? void 0 : R.call(U, ...W);
  }, className: "absolute right-[100%] z-[1] translate-x-[50%]", onOpenAddWidget: (W, R) => y({ lineNumber: W, side: R }) }), h.jsx(Yt, { enableWrap: true, diffFile: e, rawLine: x.value || "", diffLine: x.diff, plainLine: _, syntaxLine: w, enableHighlight: s })] })] }) : h.jsx("td", { className: "diff-line-old-placeholder select-none", "data-side": j[j.old], style: { backgroundColor: `var(${tt})` }, colSpan: 2, children: h.jsx("span", { children: "\u2002" }) }), k ? h.jsxs(h.Fragment, { children: [h.jsxs("td", { className: "diff-line-new-num group relative w-[1%] min-w-[40px] select-none border-l-[1px] pl-[10px] pr-[10px] text-right align-top", "data-side": j[j.new], style: { backgroundColor: $, color: `var(${S ? He : qn})`, borderLeftColor: `var(${gt})`, borderLeftStyle: "solid" }, children: [S && i && h.jsx(dn, { index: t, lineNumber: (b = g.lineNumber) !== null && b !== void 0 ? b : -1, side: j.new, diffFile: e, onWidgetClick: (...W) => {
    var R;
    return (R = U.current) === null || R === void 0 ? void 0 : R.call(U, ...W);
  }, className: "absolute left-[100%] z-[1] translate-x-[-50%]", onOpenAddWidget: (W, R) => y({ lineNumber: W, side: R }) }), h.jsx("span", { "data-line-num": g.lineNumber, style: { opacity: T ? void 0 : 0.5 }, children: g.lineNumber })] }), h.jsxs("td", { className: "diff-line-new-content group relative pr-[10px] align-top", "data-side": j[j.new], style: { backgroundColor: D }, children: [S && i && h.jsx(dn, { index: t, lineNumber: (m = g.lineNumber) !== null && m !== void 0 ? m : -1, side: j.new, diffFile: e, onWidgetClick: (...W) => {
    var R;
    return (R = U.current) === null || R === void 0 ? void 0 : R.call(U, ...W);
  }, className: "absolute right-[100%] z-[1] translate-x-[50%]", onOpenAddWidget: (W, R) => y({ lineNumber: W, side: R }) }), h.jsx(Yt, { enableWrap: true, diffFile: e, rawLine: g.value || "", diffLine: g.diff, plainLine: I, syntaxLine: N, enableHighlight: s })] })] }) : h.jsx("td", { className: "diff-line-new-placeholder select-none border-l-[1px]", style: { backgroundColor: `var(${tt})`, borderLeftColor: `var(${gt})`, borderLeftStyle: "solid" }, "data-side": j[j.new], colSpan: 2, children: h.jsx("span", { children: "\u2002" }) })] });
}, Hr = ({ index: t, diffFile: e, lineNumber: n, enableAddWidget: i, enableHighlight: s }) => {
  const l = e.getSplitLeftLine(t), a = e.getSplitRightLine(t);
  return (l == null ? void 0 : l.isHidden) && (a == null ? void 0 : a.isHidden) ? null : h.jsx(Er, { index: t, diffFile: e, lineNumber: n, enableAddWidget: i, enableHighlight: s });
}, Dr = ({ index: t, diffFile: e, lineNumber: n, oldLineExtend: i, newLineExtend: s }) => {
  var l, a;
  const { useDiffContext: o } = ge(), d = e.getSplitLeftLine(t), f = e.getSplitRightLine(t), r = o.useShallowStableSelector((b) => b.renderExtendLine);
  if (!r) return null;
  const c = (i == null ? void 0 : i.data) && (r == null ? void 0 : r({ diffFile: e, side: j.old, lineNumber: (l = d.lineNumber) !== null && l !== void 0 ? l : -1, data: i.data, onUpdate: e.notifyAll })), v = (s == null ? void 0 : s.data) && (r == null ? void 0 : r({ diffFile: e, side: j.new, lineNumber: (a = f.lineNumber) !== null && a !== void 0 ? a : -1, data: s.data, onUpdate: e.notifyAll }));
  return h.jsxs("tr", { "data-line": `${n}-extend`, "data-state": "extend", className: "diff-line diff-line-extend", children: [c ? h.jsx("td", { className: "diff-line-extend-old-content p-0", colSpan: 2, children: h.jsx("div", { className: "diff-line-extend-wrapper", children: c }) }) : h.jsx("td", { className: "diff-line-extend-old-placeholder select-none p-0", style: { backgroundColor: `var(${tt})` }, colSpan: 2 }), v ? h.jsx("td", { className: "diff-line-extend-new-content border-l-[1px] p-0", style: { borderLeftColor: `var(${gt})`, borderLeftStyle: "solid" }, colSpan: 2, children: h.jsx("div", { className: "diff-line-extend-wrapper", children: v }) }) : h.jsx("td", { className: "diff-line-extend-new-placeholder select-none border-l-[1px] p-0", style: { backgroundColor: `var(${tt})`, borderLeftColor: `var(${gt})`, borderLeftStyle: "solid" }, colSpan: 2 })] });
}, Mr = ({ index: t, diffFile: e, lineNumber: n }) => {
  const { useDiffContext: i } = ge(), s = e.getSplitLeftLine(t), l = e.getSplitRightLine(t), { oldLineExtend: a, newLineExtend: o } = i(M.useCallback((c) => {
    var v, b, m, x, g, w;
    return { oldLineExtend: (b = (v = c.extendData) === null || v === void 0 ? void 0 : v.oldFile) === null || b === void 0 ? void 0 : b[(m = s == null ? void 0 : s.lineNumber) !== null && m !== void 0 ? m : -1], newLineExtend: (g = (x = c.extendData) === null || x === void 0 ? void 0 : x.newFile) === null || g === void 0 ? void 0 : g[(w = l == null ? void 0 : l.lineNumber) !== null && w !== void 0 ? w : -1] };
  }, [s == null ? void 0 : s.lineNumber, l == null ? void 0 : l.lineNumber])), d = (a == null ? void 0 : a.data) || (o == null ? void 0 : o.data), f = e.getExpandEnabled();
  return d && (!(s == null ? void 0 : s.isHidden) && !(l == null ? void 0 : l.isHidden) || !f) ? h.jsx(Dr, { index: t, diffFile: e, lineNumber: n, oldLineExtend: a, newLineExtend: o }) : null;
}, $r = ({ index: t, diffFile: e, lineNumber: n }) => {
  var i;
  const s = e.getSplitHunkLine(t), a = e.getExpandEnabled() && s && s.splitInfo, o = s && s.splitInfo && s.splitInfo.endHiddenIndex - s.splitInfo.startHiddenIndex < X, d = s && s.isFirst, f = s && s.isLast;
  return h.jsxs("tr", { "data-line": `${n}-hunk`, "data-state": "hunk", className: "diff-line diff-line-hunk", children: [h.jsx("td", { className: "diff-line-hunk-action relative w-[1%] min-w-[40px] select-none p-[1px]", style: { backgroundColor: `var(${qt})`, color: `var(${He})` }, children: a ? d ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand Up", "data-title": "Expand Up", onClick: () => e.onSplitHunkExpand("up", t), children: h.jsx(Ee, { className: "fill-current" }) }) : f ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand Down", "data-title": "Expand Down", onClick: () => e.onSplitHunkExpand("down", t), children: h.jsx(je, { className: "fill-current" }) }) : o ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand All", "data-title": "Expand All", onClick: () => e.onSplitHunkExpand("all", t), children: h.jsx(Jt, { className: "fill-current" }) }) : h.jsxs(h.Fragment, { children: [h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[2px]", title: "Expand Down", "data-title": "Expand Down", onClick: () => e.onSplitHunkExpand("down", t), children: h.jsx(je, { className: "fill-current" }) }), h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[2px]", title: "Expand Up", "data-title": "Expand Up", onClick: () => e.onSplitHunkExpand("up", t), children: h.jsx(Ee, { className: "fill-current" }) })] }) : h.jsx("div", { className: "min-h-[28px]", children: "\u2002" }) }), h.jsx("td", { className: "diff-line-hunk-content pr-[10px] align-middle", style: { backgroundColor: `var(${Et})` }, colSpan: 3, children: h.jsx("div", { className: "pl-[1.5em]", style: { color: `var(${Zt})` }, children: ((i = s.splitInfo) === null || i === void 0 ? void 0 : i.plainText) || s.text }) })] });
}, Rr = ({ index: t, diffFile: e, lineNumber: n }) => {
  var i, s;
  const l = e.getSplitHunkLine(t), o = e.getExpandEnabled() && l && l.splitInfo, d = l && l.splitInfo && l.splitInfo.endHiddenIndex - l.splitInfo.startHiddenIndex < X, f = l && l.isFirst, r = l && l.isLast;
  return h.jsxs("tr", { "data-line": `${n}-hunk`, "data-state": "hunk", className: "diff-line diff-line-hunk", children: [h.jsx("td", { className: "diff-line-hunk-action relative w-[1%] min-w-[40px] select-none p-[1px]", style: { backgroundColor: `var(${qt})`, color: `var(${He})` }, children: o ? f ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand Up", "data-title": "Expand Up", onClick: () => e.onSplitHunkExpand("up", t), children: h.jsx(Ee, { className: "fill-current" }) }) : r ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand Down", "data-title": "Expand Down", onClick: () => e.onSplitHunkExpand("down", t), children: h.jsx(je, { className: "fill-current" }) }) : d ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand All", "data-title": "Expand All", onClick: () => e.onSplitHunkExpand("all", t), children: h.jsx(Jt, { className: "fill-current" }) }) : h.jsxs(h.Fragment, { children: [h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[2px]", title: "Expand Down", "data-title": "Expand Down", onClick: () => e.onSplitHunkExpand("down", t), children: h.jsx(je, { className: "fill-current" }) }), h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[2px]", title: "Expand Up", "data-title": "Expand Up", onClick: () => e.onSplitHunkExpand("up", t), children: h.jsx(Ee, { className: "fill-current" }) })] }) : h.jsx("div", { className: "min-h-[28px]", children: "\u2002" }) }), h.jsx("td", { className: "diff-line-hunk-content pr-[10px] align-middle", style: { backgroundColor: `var(${Et})` }, children: h.jsx("div", { className: "pl-[1.5em]", style: { color: `var(${Zt})` }, children: ((i = l.splitInfo) === null || i === void 0 ? void 0 : i.plainText) || l.text }) }), h.jsx("td", { className: "diff-line-hunk-action relative z-[1] w-[1%] min-w-[40px] select-none border-l-[1px] p-[1px]", style: { backgroundColor: `var(${qt})`, color: `var(${He})`, borderLeftColor: `var(${gt})`, borderLeftStyle: "solid" }, children: o ? f ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand Up", "data-title": "Expand Up", onClick: () => e.onSplitHunkExpand("up", t), children: h.jsx(Ee, { className: "fill-current" }) }) : r ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand Down", "data-title": "Expand Down", onClick: () => e.onSplitHunkExpand("down", t), children: h.jsx(je, { className: "fill-current" }) }) : d ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand All", "data-title": "Expand All", onClick: () => e.onSplitHunkExpand("all", t), children: h.jsx(Jt, { className: "fill-current" }) }) : h.jsxs(h.Fragment, { children: [h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[2px]", title: "Expand Down", "data-title": "Expand Down", onClick: () => e.onSplitHunkExpand("down", t), children: h.jsx(je, { className: "fill-current" }) }), h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[2px]", title: "Expand Up", "data-title": "Expand Up", onClick: () => e.onSplitHunkExpand("up", t), children: h.jsx(Ee, { className: "fill-current" }) })] }) : h.jsx("div", { className: "min-h-[28px]", children: "\u2002" }) }), h.jsx("td", { className: "diff-line-hunk-content relative pr-[10px] align-middle", style: { backgroundColor: `var(${Et})` }, children: h.jsx("div", { className: "pl-[1.5em]", style: { color: `var(${Zt})` }, children: ((s = l.splitInfo) === null || s === void 0 ? void 0 : s.plainText) || l.text }) })] });
}, Wr = ({ index: t, diffFile: e, lineNumber: n }) => {
  const { useDiffContext: i } = ge(), s = i.useShallowStableSelector((l) => l.mode);
  return s === Ce.SplitGitHub || s === Ce.Split || s === Ce.Unified ? h.jsx($r, { index: t, diffFile: e, lineNumber: n }) : h.jsx(Rr, { index: t, diffFile: e, lineNumber: n });
}, Ws = ({ index: t, diffFile: e, lineNumber: n }) => {
  const i = e.getSplitHunkLine(t), s = i && i.splitInfo && i.splitInfo.startHiddenIndex < i.splitInfo.endHiddenIndex, l = i && e._getIsPureDiffRender() && !i.splitInfo;
  return !s && !l ? null : h.jsx(Wr, { index: t, diffFile: e, lineNumber: n });
}, Tr = ({ index: t, diffFile: e, lineNumber: n }) => {
  var i, s;
  const { useWidget: l } = nt(), a = l.getReadonlyState().setWidget, { useDiffContext: o } = ge(), d = o.useShallowStableSelector((w) => w.renderWidgetLine), f = e.getSplitLeftLine(t), r = e.getSplitRightLine(t), c = l.useShallowStableSelector((w) => w.widgetSide), v = l.getReadonlyState().widgetLineNumber, b = f.lineNumber && c === j.old && v === f.lineNumber, m = r.lineNumber && c === j.new && v === r.lineNumber, x = b && (d == null ? void 0 : d({ diffFile: e, side: j.old, lineNumber: (i = f.lineNumber) !== null && i !== void 0 ? i : -1, onClose: () => a({}) })), g = m && (d == null ? void 0 : d({ diffFile: e, side: j.new, lineNumber: (s = r.lineNumber) !== null && s !== void 0 ? s : -1, onClose: () => a({}) }));
  return d ? h.jsxs("tr", { "data-line": `${n}-widget`, "data-state": "widget", className: "diff-line diff-line-widget", children: [x ? h.jsx("td", { className: "diff-line-widget-old-content p-0", colSpan: 2, children: h.jsx("div", { className: "diff-line-widget-wrapper", children: x }) }) : h.jsx("td", { className: "diff-line-widget-old-placeholder select-none p-0", style: { backgroundColor: `var(${tt})` }, colSpan: 2 }), g ? h.jsx("td", { className: "diff-line-widget-new-content border-l-[1px] p-0", colSpan: 2, style: { borderLeftColor: `var(${gt})`, borderLeftStyle: "solid" }, children: h.jsx("div", { className: "diff-line-widget-wrapper", children: g }) }) : h.jsx("td", { className: "diff-line-widget-new-placeholder select-none border-l-[1px] p-0", style: { backgroundColor: `var(${tt})`, borderLeftColor: `var(${gt})`, borderLeftStyle: "solid" }, colSpan: 2 })] }) : null;
}, Ar = ({ index: t, diffFile: e, lineNumber: n }) => {
  const { useWidget: i } = nt();
  return i.useShallowSelector(M.useCallback((l) => {
    const a = l.widgetLineNumber, o = l.widgetSide, d = e.getSplitLeftLine(t), f = e.getSplitRightLine(t), r = d.lineNumber && o === j.old && a === d.lineNumber, c = f.lineNumber && o === j.new && a === f.lineNumber;
    return r || c;
  }, [e, t]), (l, a) => l === a) ? h.jsx(Tr, { index: t, diffFile: e, lineNumber: n }) : null;
}, Yl = M.memo(({ diffFile: t }) => {
  const e = Math.max(t.splitLineLength, t.fileLineLength), { useDiffContext: n } = ge(), i = M.useRef(null), s = M.useRef(void 0), { fontSize: l, enableAddWidget: a, enableHighlight: o } = n.useShallowStableSelector((m) => ({ fontSize: m.fontSize, enableAddWidget: m.enableAddWidget, enableHighlight: m.enableHighlight }));
  Jn.useSyncExternalStore(t.subscribe, t.getUpdateCount, t.getUpdateCount);
  const d = M.useMemo(() => ({ fontSize: l + "px", fontFamily: "Menlo, Consolas, monospace" }), [l]), f = gs({ text: e.toString(), font: d }), r = Math.max(40, f + 25), c = ni(t), v = (m) => {
    if (i.current) if (!m) i.current.textContent = "";
    else {
      const x = `diff-root${t.getId()}`, g = m === j.old ? j.new : j.old;
      i.current.textContent = `#${x} [data-side="${j[g]}"] {user-select: none} 
#${x} [data-state="extend"] {user-select: none} 
#${x} [data-state="hunk"] {user-select: none} 
#${x} [data-state="widget"] {user-select: none}`;
    }
  }, b = (m) => {
    let x = m.target;
    if (x && x instanceof HTMLElement && x.nodeName === "BUTTON") {
      Je();
      return;
    }
    const g = ps(x);
    if (!(g && g !== `diff-root${t.getId()}`)) for (; x && x instanceof HTMLElement; ) {
      const w = x.getAttribute("data-state"), _ = x.getAttribute("data-side");
      if (_ && s.current !== j[_] && (s.current = j[_], v(j[_]), Je()), w) if (w === "extend" || w === "hunk" || w === "widget") {
        s.current !== void 0 && (s.current = void 0, v(void 0), Je());
        return;
      } else return;
      x = x.parentElement;
    }
  };
  return h.jsx("div", { className: "split-diff-view split-diff-view-wrap w-full", children: h.jsxs("div", { className: "diff-table-wrapper w-full", style: { [ie]: `${Math.round(r)}px`, fontFamily: "Menlo, Consolas, monospace", fontSize: `var(${Le})` }, children: [h.jsx("style", { "data-select-style": true, ref: i }), h.jsxs("table", { className: "diff-table w-full table-fixed border-collapse border-spacing-0", children: [h.jsxs("colgroup", { children: [h.jsx("col", { className: "diff-table-old-num-col", width: Math.round(r) }), h.jsx("col", { className: "diff-table-old-content-col" }), h.jsx("col", { className: "diff-table-new-num-col", width: Math.round(r) }), h.jsx("col", { className: "diff-table-new-content-col" })] }), h.jsx("thead", { className: "hidden", children: h.jsxs("tr", { children: [h.jsx("th", { scope: "col", children: "old line number" }), h.jsx("th", { scope: "col", children: "old line content" }), h.jsx("th", { scope: "col", children: "new line number" }), h.jsx("th", { scope: "col", children: "new line content" })] }) }), h.jsxs("tbody", { className: "diff-table-body leading-[1.6]", onMouseDownCapture: b, children: [c.map((m) => h.jsxs(M.Fragment, { children: [h.jsx(Ws, { index: m.index, lineNumber: m.lineNumber, diffFile: t }), h.jsx(Hr, { index: m.index, lineNumber: m.lineNumber, diffFile: t, enableAddWidget: !!a, enableHighlight: !!o }), h.jsx(Ar, { index: m.index, lineNumber: m.lineNumber, diffFile: t }), h.jsx(Mr, { index: m.index, lineNumber: m.lineNumber, diffFile: t })] }, m.index)), h.jsx(Ws, { index: t.splitLineLength, lineNumber: t.splitLineLength, diffFile: t })] })] })] }) });
});
Yl.displayName = "DiffSplitViewWrap";
const Fr = (t, e) => Wl(() => {
  var n, i;
  const s = Ne(), l = (k) => s.value = k, a = Ne(e), o = (k) => a.value = k, d = Ne(t.diffViewMode), f = (k) => d.value = k, r = Ne(t.isMounted), c = (k) => r.value = k, v = Ne(t.diffViewWrap), b = (k) => v.value = k, m = Ne(t.diffViewAddWidget), x = (k) => m.value = k, g = Ne(t.diffViewHighlight), w = (k) => g.value = k, _ = Ne(t.diffViewFontSize), N = (k) => _.value = k, I = Ne({ oldFile: { ...(n = t.extendData) === null || n === void 0 ? void 0 : n.oldFile }, newFile: { ...(i = t.extendData) === null || i === void 0 ? void 0 : i.newFile } }), S = (k) => {
    const E = k || {}, C = Object.keys(I.value.oldFile || {}), D = Object.keys(E.oldFile || {});
    for (const R of C) D.includes(R) || delete I.value.oldFile[R];
    for (const R of D) I.value.oldFile[R] = E.oldFile[R];
    const $ = Object.keys(I.value.newFile || {}), W = Object.keys(E.newFile || {});
    for (const R of $) W.includes(R) || delete I.value.newFile[R];
    for (const R of W) I.value.newFile[R] = E.newFile[R];
  }, T = Ne(t.renderWidgetLine), A = (k) => T.value = k, F = Ne(t.renderExtendLine), q = (k) => F.value = k, U = Ne(t.onCreateUseWidgetHook), p = (k) => U.value = k, y = { current: t.onAddWidgetClick };
  return { id: a, setId: o, dom: s, setDom: l, mode: d, setMode: f, mounted: r, setMounted: c, enableWrap: v, setEnableWrap: b, enableAddWidget: m, setEnableAddWidget: x, enableHighlight: g, setEnableHighlight: w, fontSize: _, setFontSize: N, extendData: I, setExtendData: S, renderWidgetLine: T, setRenderWidgetLine: A, renderExtendLine: F, setRenderExtendLine: q, onAddWidgetClick: y, setOnAddWidgetClick: (k) => y.current = k.current, onCreateUseWidgetHook: U, setOnCreateUseWidgetHook: p };
}), Jl = (t) => Wl(() => {
  const e = Ne(void 0), n = Ne(void 0);
  return { widgetSide: e, widgetLineNumber: n, setWidget: ({ side: s, lineNumber: l }) => {
    var a, o;
    const { renderWidgetLine: d } = ((o = (a = t.current) === null || a === void 0 ? void 0 : a.getReadonlyState) === null || o === void 0 ? void 0 : o.call(a)) || {};
    typeof d == "function" && (e.value = s, n.value = l);
  } };
}), Ql = M.memo(({ diffFile: t }) => {
  const { useDiffContext: e } = ge(), n = M.useRef(e);
  n.current = e;
  const { enableWrap: i, onCreateUseWidgetHook: s } = e.useShallowStableSelector((o) => ({ enableWrap: o.enableWrap, onCreateUseWidgetHook: o.onCreateUseWidgetHook })), l = M.useMemo(() => Jl(n), []), a = M.useMemo(() => ({ useWidget: l }), [l]);
  return M.useEffect(() => {
    const { setWidget: o } = l.getReadonlyState();
    o({});
  }, [t, l]), M.useEffect(() => {
    s == null ? void 0 : s(l);
  }, [l, s]), h.jsx(oi.Provider, { value: a, children: i ? h.jsx(Yl, { diffFile: t }) : h.jsx(ql, { diffFile: t }) });
});
Ql.displayName = "DiffSplitView";
const Ur = ({ index: t, diffLine: e, rawLine: n, plainLine: i, syntaxLine: s, lineNumber: l, diffFile: a, setWidget: o, enableWrap: d, enableAddWidget: f, enableHighlight: r, onAddWidgetClick: c }) => h.jsxs("tr", { "data-line": t, "data-state": "diff", className: "diff-line group", children: [h.jsxs("td", { className: "diff-line-num sticky left-0 z-[1] w-[1%] min-w-[100px] select-none whitespace-nowrap pl-[10px] pr-[10px] text-right align-top", style: { color: `var(${He})`, backgroundColor: `var(${Ol})`, width: `calc(calc(var(${ie}) + 5px) * 2)`, maxWidth: `calc(calc(var(${ie}) + 5px) * 2)`, minWidth: `calc(calc(var(${ie}) + 5px) * 2)` }, children: [f && h.jsx(vs, { index: t - 1, lineNumber: l, diffFile: a, side: j.old, onWidgetClick: c, onOpenAddWidget: (v, b) => o({ lineNumber: v, side: b }) }), h.jsxs("div", { className: "flex", children: [h.jsx("span", { "data-line-old-num": l, className: "inline-block w-[50%]", children: l }), h.jsx("span", { className: "w-[10px] shrink-0" }), h.jsx("span", { className: "inline-block w-[50%]" })] })] }), h.jsx("td", { className: "diff-line-content pr-[10px] align-top", style: { backgroundColor: `var(${Fl})` }, children: h.jsx(Yt, { enableWrap: d, diffFile: a, enableHighlight: r, rawLine: n, diffLine: e, plainLine: i, syntaxLine: s }) })] }), Or = ({ index: t, diffLine: e, rawLine: n, plainLine: i, syntaxLine: s, lineNumber: l, diffFile: a, setWidget: o, enableWrap: d, enableAddWidget: f, enableHighlight: r, onAddWidgetClick: c }) => h.jsxs("tr", { "data-line": t, "data-state": "diff", className: "diff-line group", children: [h.jsxs("td", { className: "diff-line-num sticky left-0 z-[1] w-[1%] min-w-[100px] select-none whitespace-nowrap pl-[10px] pr-[10px] text-right align-top", style: { color: `var(${He})`, backgroundColor: `var(${Ul})`, width: `calc(calc(var(${ie}) + 5px) * 2)`, maxWidth: `calc(calc(var(${ie}) + 5px) * 2)`, minWidth: `calc(calc(var(${ie}) + 5px) * 2)` }, children: [f && h.jsx(vs, { index: t - 1, lineNumber: l, diffFile: a, side: j.new, onWidgetClick: c, onOpenAddWidget: (v, b) => o({ lineNumber: v, side: b }) }), h.jsxs("div", { className: "flex", children: [h.jsx("span", { className: "inline-block w-[50%]" }), h.jsx("span", { className: "w-[10px] shrink-0" }), h.jsx("span", { "data-line-new-num": l, className: "inline-block w-[50%]", children: l })] })] }), h.jsx("td", { className: "diff-line-content pr-[10px] align-top", style: { backgroundColor: `var(${Al})` }, children: h.jsx(Yt, { enableWrap: d, diffFile: a, enableHighlight: r, rawLine: n, diffLine: e, plainLine: i, syntaxLine: s }) })] }), Pr = ({ index: t, diffFile: e, lineNumber: n, enableWrap: i, enableAddWidget: s, enableHighlight: l }) => {
  var a;
  const o = e.getUnifiedLine(t), { useDiffContext: d } = ge(), f = d.getReadonlyState().onAddWidgetClick, { useWidget: r } = nt(), c = r.getReadonlyState().setWidget, v = o.diff, b = Vt(o.diff), m = o.value || "", x = o.diff, g = o.newLineNumber, w = o.oldLineNumber, _ = g ? e.getNewSyntaxLine(g) : w ? e.getOldSyntaxLine(w) : void 0, N = g ? e.getNewPlainLine(g) : w ? e.getOldPlainLine(w) : void 0;
  return b ? o.oldLineNumber ? h.jsx(Ur, { index: n, enableWrap: i, diffFile: e, rawLine: m, diffLine: x, setWidget: c, plainLine: N, syntaxLine: _, enableHighlight: l, enableAddWidget: s, lineNumber: o.oldLineNumber, onAddWidgetClick: (...I) => {
    var S;
    return (S = f.current) === null || S === void 0 ? void 0 : S.call(f, ...I);
  } }) : h.jsx(Or, { index: n, enableWrap: i, rawLine: m, diffLine: x, diffFile: e, setWidget: c, plainLine: N, syntaxLine: _, enableHighlight: l, enableAddWidget: s, lineNumber: o.newLineNumber, onAddWidgetClick: (...I) => {
    var S;
    return (S = f.current) === null || S === void 0 ? void 0 : S.call(f, ...I);
  } }) : h.jsxs("tr", { "data-line": n, "data-state": o.diff ? "diff" : "plain", className: "diff-line group", children: [h.jsxs("td", { className: "diff-line-num sticky left-0 z-[1] w-[1%] min-w-[100px] select-none whitespace-nowrap pl-[10px] pr-[10px] text-right align-top", style: { color: `var(${v ? He : qn})`, width: `calc(calc(var(${ie}) + 5px) * 2)`, maxWidth: `calc(calc(var(${ie}) + 5px) * 2)`, minWidth: `calc(calc(var(${ie}) + 5px) * 2)`, backgroundColor: v ? `var(${Bl})` : `var(${Mi})` }, children: [s && v && h.jsx(vs, { index: t, diffFile: e, lineNumber: (a = o.newLineNumber) !== null && a !== void 0 ? a : -1, side: j.new, onWidgetClick: (...I) => {
    var S;
    return (S = f.current) === null || S === void 0 ? void 0 : S.call(f, ...I);
  }, onOpenAddWidget: (I, S) => c({ lineNumber: I, side: S }) }), h.jsxs("div", { className: "flex opacity-[0.5]", children: [h.jsx("span", { "data-line-old-num": o.oldLineNumber, className: "inline-block w-[50%]", children: o.oldLineNumber }), h.jsx("span", { className: "w-[10px] shrink-0" }), h.jsx("span", { "data-line-new-num": o.newLineNumber, className: "inline-block w-[50%]", children: o.newLineNumber })] })] }), h.jsx("td", { className: "diff-line-content pr-[10px] align-top", style: { backgroundColor: v ? `var(${Pl})` : `var(${Mi})` }, children: h.jsx(Yt, { enableWrap: i, diffFile: e, enableHighlight: l, rawLine: m, diffLine: x, plainLine: N, syntaxLine: _ }) })] });
}, Br = ({ index: t, diffFile: e, lineNumber: n, enableWrap: i, enableHighlight: s, enableAddWidget: l }) => {
  const a = e.getUnifiedLine(t);
  return (a == null ? void 0 : a.isHidden) ? null : h.jsx(Pr, { index: t, diffFile: e, lineNumber: n, enableWrap: i, enableHighlight: s, enableAddWidget: l });
}, Vr = ({ index: t, diffFile: e, lineNumber: n, enableWrap: i, oldLineExtend: s, newLineExtend: l }) => {
  var a, o;
  const { useDiffContext: d } = ge(), f = d.useShallowStableSelector((v) => v.renderExtendLine), r = e.getUnifiedLine(t), c = ri({ selector: ".unified-diff-table-wrapper", enable: typeof f == "function" });
  return f ? h.jsx("tr", { "data-line": `${n}-extend`, "data-state": "extend", className: "diff-line diff-line-extend", children: h.jsx("td", { className: "diff-line-extend-content p-0 align-top", colSpan: 2, children: h.jsxs("div", { className: "diff-line-extend-wrapper sticky left-0 z-[1]", style: { width: c }, children: [(i ? true : c > 0) && (s == null ? void 0 : s.data) !== void 0 && (s == null ? void 0 : s.data) !== null && (f == null ? void 0 : f({ diffFile: e, side: j.old, lineNumber: (a = r.oldLineNumber) !== null && a !== void 0 ? a : -1, data: s.data, onUpdate: e.notifyAll })), (i ? true : c > 0) && (l == null ? void 0 : l.data) !== void 0 && (l == null ? void 0 : l.data) !== null && (f == null ? void 0 : f({ diffFile: e, side: j.new, lineNumber: (o = r.newLineNumber) !== null && o !== void 0 ? o : -1, data: l.data, onUpdate: e.notifyAll }))] }) }) }) : null;
}, zr = ({ index: t, diffFile: e, lineNumber: n, enableWrap: i }) => {
  const { useDiffContext: s } = ge(), l = e.getUnifiedLine(t), { oldLineExtend: a, newLineExtend: o } = s(M.useCallback((f) => {
    var r, c, v, b, m, x;
    return { oldLineExtend: (c = (r = f.extendData) === null || r === void 0 ? void 0 : r.oldFile) === null || c === void 0 ? void 0 : c[(v = l == null ? void 0 : l.oldLineNumber) !== null && v !== void 0 ? v : -1], newLineExtend: (m = (b = f.extendData) === null || b === void 0 ? void 0 : b.newFile) === null || m === void 0 ? void 0 : m[(x = l == null ? void 0 : l.newLineNumber) !== null && x !== void 0 ? x : -1] };
  }, [l.oldLineNumber, l.newLineNumber]));
  return !((a == null ? void 0 : a.data) || (o == null ? void 0 : o.data)) || !l || l.isHidden ? null : h.jsx(Vr, { index: t, diffFile: e, lineNumber: n, enableWrap: i, oldLineExtend: a, newLineExtend: o });
}, Gr = ({ index: t, diffFile: e, lineNumber: n }) => {
  var i;
  const s = e.getUnifiedHunkLine(t), l = e.getExpandEnabled(), { useDiffContext: a } = ge(), o = a.useShallowStableSelector((v) => v.enableWrap), d = l && s && s.unifiedInfo, f = s && s.unifiedInfo && s.unifiedInfo.endHiddenIndex - s.unifiedInfo.startHiddenIndex < X, r = s && s.isFirst, c = s && s.isLast;
  return h.jsxs("tr", { "data-line": `${n}-hunk`, "data-state": "hunk", className: "diff-line diff-line-hunk", children: [h.jsx("td", { className: "diff-line-hunk-action sticky left-0 w-[1%] min-w-[100px] select-none p-[1px]", style: { backgroundColor: `var(${qt})`, color: `var(${He})`, width: `calc(calc(var(${ie}) + 5px) * 2)`, maxWidth: `calc(calc(var(${ie}) + 5px) * 2)`, minWidth: `calc(calc(var(${ie}) + 5px) * 2)` }, children: d ? r ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand Up", "data-title": "Expand Up", onClick: () => e.onUnifiedHunkExpand("up", t), children: h.jsx(Ee, { className: "fill-current" }) }) : c ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand Down", "data-title": "Expand Down", onClick: () => e.onUnifiedHunkExpand("down", t), children: h.jsx(je, { className: "fill-current" }) }) : f ? h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[6px]", title: "Expand All", "data-title": "Expand All", onClick: () => e.onUnifiedHunkExpand("all", t), children: h.jsx(Jt, { className: "fill-current" }) }) : h.jsxs(h.Fragment, { children: [h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[2px]", title: "Expand Down", "data-title": "Expand Down", onClick: () => e.onUnifiedHunkExpand("down", t), children: h.jsx(je, { className: "fill-current" }) }), h.jsx("button", { className: "diff-widget-tooltip flex w-full cursor-pointer items-center justify-center rounded-[2px] py-[2px]", title: "Expand Up", "data-title": "Expand Up", onClick: () => e.onUnifiedHunkExpand("up", t), children: h.jsx(Ee, { className: "fill-current" }) })] }) : h.jsx("div", { className: "min-h-[28px]", children: "\u2002" }) }), h.jsx("td", { className: "diff-line-hunk-content pr-[10px] align-middle", style: { backgroundColor: `var(${Et})` }, children: h.jsx("div", { className: "pl-[1.5em]", style: { whiteSpace: o ? "pre-wrap" : "pre", wordBreak: o ? "break-all" : "initial", color: `var(${Zt})` }, children: ((i = s.unifiedInfo) === null || i === void 0 ? void 0 : i.plainText) || s.text }) })] });
}, Ts = ({ index: t, diffFile: e, lineNumber: n }) => {
  const i = e.getUnifiedHunkLine(t), s = i && i.unifiedInfo && i.unifiedInfo.startHiddenIndex < i.unifiedInfo.endHiddenIndex, l = i && e._getIsPureDiffRender() && !i.unifiedInfo;
  return !s && !l ? null : h.jsx(Gr, { index: t, diffFile: e, lineNumber: n });
}, Kr = ({ index: t, diffFile: e, lineNumber: n, enableWrap: i }) => {
  var s, l;
  const { useWidget: a } = nt(), o = a.getReadonlyState().setWidget, d = e.getUnifiedLine(t), f = () => o({}), r = a.getReadonlyState().widgetSide, c = a.getReadonlyState().widgetLineNumber, v = d.oldLineNumber && r === j.old && c === d.oldLineNumber, b = d.newLineNumber && r === j.new && c === d.newLineNumber, { useDiffContext: m } = ge(), x = m.useShallowStableSelector((w) => w.renderWidgetLine), g = ri({ selector: ".unified-diff-table-wrapper", enable: typeof x == "function" });
  return x ? h.jsx("tr", { "data-line": `${n}-widget`, "data-state": "widget", className: "diff-line diff-line-widget", children: h.jsx("td", { className: "diff-line-widget-content p-0", colSpan: 2, children: h.jsxs("div", { className: "diff-line-widget-wrapper sticky left-0 z-[1]", style: { width: g }, children: [(i ? true : g > 0) && v && (x == null ? void 0 : x({ diffFile: e, side: j.old, lineNumber: (s = d.oldLineNumber) !== null && s !== void 0 ? s : -1, onClose: f })), (i ? true : g > 0) && b && (x == null ? void 0 : x({ diffFile: e, side: j.new, lineNumber: (l = d.newLineNumber) !== null && l !== void 0 ? l : -1, onClose: f }))] }) }) }) : null;
}, Zr = ({ index: t, diffFile: e, lineNumber: n, enableWrap: i }) => {
  const { useWidget: s } = nt();
  return s.useShallowSelector(M.useCallback((a) => {
    const o = a.widgetLineNumber, d = a.widgetSide, f = e.getUnifiedLine(t), r = f.oldLineNumber && d === j.old && o === f.oldLineNumber, c = f.newLineNumber && d === j.new && o === f.newLineNumber;
    return r || c;
  }, [e, t]), (a, o) => a === o) ? h.jsx(Kr, { index: t, diffFile: e, lineNumber: n, enableWrap: i }) : null;
}, Xl = M.memo(({ diffFile: t }) => {
  const { useDiffContext: e } = ge(), n = M.useRef(null), i = M.useRef(void 0), s = M.useRef(e);
  s.current = e;
  const l = M.useMemo(() => Jl(s), []), a = M.useMemo(() => ({ useWidget: l }), [l]), { fontSize: o, enableWrap: d, enableHighlight: f, enableAddWidget: r, onCreateUseWidgetHook: c } = e.useShallowStableSelector((_) => ({ fontSize: _.fontSize, enableWrap: _.enableWrap, enableHighlight: _.enableHighlight, enableAddWidget: _.enableAddWidget, onCreateUseWidgetHook: _.onCreateUseWidgetHook }));
  Jn.useSyncExternalStore(t.subscribe, t.getUpdateCount, t.getUpdateCount), M.useEffect(() => {
    const { setWidget: _ } = l.getReadonlyState();
    _({});
  }, [t, l]), M.useEffect(() => {
    c == null ? void 0 : c(l);
  }, [l, c]);
  const v = Math.max(t.unifiedLineLength, t.fileLineLength), b = gs({ text: v.toString(), font: M.useMemo(() => ({ fontSize: o + "px", fontFamily: "Menlo, Consolas, monospace" }), [o]) }), m = Math.max(40, b + 10), x = Xi(t), g = (_) => {
    if (n.current) if (!_) n.current.textContent = "";
    else {
      const N = `diff-root${t.getId()}`;
      n.current.textContent = `#${N} [data-state="extend"] {user-select: none} 
#${N} [data-state="hunk"] {user-select: none} 
#${N} [data-state="widget"] {user-select: none}`;
    }
  }, w = (_) => {
    let N = _.target;
    if (N && N instanceof HTMLElement && N.nodeName === "BUTTON") {
      Je();
      return;
    }
    const I = ps(N);
    if (!(I && I !== `diff-root${t.getId()}`)) for (; N && N instanceof HTMLElement; ) {
      const S = N.getAttribute("data-state");
      if (S) if (S === "extend" || S === "hunk" || S === "widget") {
        i.current !== void 0 && (i.current = void 0, g(void 0), Je());
        return;
      } else {
        i.current !== j.new && (i.current = j.new, g(j.new), Je());
        return;
      }
      N = N.parentElement;
    }
  };
  return h.jsx(oi.Provider, { value: a, children: h.jsxs("div", { className: `unified-diff-view ${d ? "unified-diff-view-wrap" : "unified-diff-view-normal"} w-full`, children: [h.jsx("style", { "data-select-style": true, ref: n }), h.jsx("div", { className: "unified-diff-table-wrapper diff-table-scroll-container w-full overflow-x-auto overflow-y-hidden", style: { [ie]: `${Math.round(m)}px`, fontFamily: "Menlo, Consolas, monospace", fontSize: `var(${Le})` }, children: h.jsxs("table", { className: `unified-diff-table w-full border-collapse border-spacing-0 ${d ? "table-fixed" : ""}`, children: [h.jsxs("colgroup", { children: [h.jsx("col", { className: "unified-diff-table-num-col" }), h.jsx("col", { className: "unified-diff-table-content-col" })] }), h.jsx("thead", { className: "hidden", children: h.jsxs("tr", { children: [h.jsx("th", { scope: "col", children: "line number" }), h.jsx("th", { scope: "col", children: "line content" })] }) }), h.jsxs("tbody", { className: "diff-table-body leading-[1.6]", onMouseDownCapture: w, children: [x.map((_) => h.jsxs(M.Fragment, { children: [h.jsx(Ts, { index: _.index, lineNumber: _.lineNumber, diffFile: t }), h.jsx(Br, { index: _.index, lineNumber: _.lineNumber, diffFile: t, enableWrap: !!d, enableHighlight: !!f, enableAddWidget: !!r }), h.jsx(Zr, { index: _.index, lineNumber: _.lineNumber, diffFile: t, enableWrap: !!d }), h.jsx(zr, { index: _.index, lineNumber: _.lineNumber, diffFile: t, enableWrap: !!d })] }, _.index)), h.jsx(Ts, { index: t.unifiedLineLength, lineNumber: t.unifiedLineLength, diffFile: t })] })] }) })] }) });
});
Xl.displayName = "DiffUnifiedView";
ti.name = "@git-diff-view/react";
const qr = (t) => {
  const { diffFile: e, className: n, style: i, wrapperRef: s, diffViewMode: l, diffViewWrap: a, diffViewFontSize: o, diffViewHighlight: d, renderWidgetLine: f, renderExtendLine: r, extendData: c, diffViewAddWidget: v, onAddWidgetClick: b, onCreateUseWidgetHook: m, isMounted: x } = t, g = M.useMemo(() => e.getId(), [e]), w = M.useMemo(() => Fr(t, g), []);
  M.useEffect(() => {
    const { id: N, setId: I, mode: S, setMode: T, mounted: A, setMounted: F, enableAddWidget: q, setEnableAddWidget: U, enableHighlight: p, setEnableHighlight: y, enableWrap: L, setEnableWrap: k, setExtendData: E, fontSize: C, setFontSize: D, onAddWidgetClick: $, setOnAddWidgetClick: W, renderExtendLine: R, setRenderExtendLine: P, renderWidgetLine: O, setRenderWidgetLine: G, onCreateUseWidgetHook: B, setOnCreateUseWidgetHook: J } = w.getReadonlyState();
    g && g !== N && I(g), l && l !== S && T(l), A !== x && F(x), v !== q && U(!!v), d !== p && y(!!d), a !== L && k(!!a), c && E(c), o && o !== C && D(o), b !== $.current && W({ current: b }), m !== B && J(m), r !== R && P(r), f !== O && G(f);
  }, [w, o, d, l, a, v, g, x, f, r, c, b, m]), M.useEffect(() => {
    (s == null ? void 0 : s.current) && w.getReadonlyState().setDom(s == null ? void 0 : s.current);
  }, [w, s]);
  const _ = M.useMemo(() => ({ useDiffContext: w }), [w]);
  return h.jsx(ms.Provider, { value: _, children: h.jsx("div", { className: "diff-tailwindcss-wrapper", "data-component": "git-diff-view", "data-theme": e._getTheme() || "light", "data-version": "0.1.7", "data-highlighter": e._getHighlighterName(), ref: s, children: h.jsx("div", { className: "diff-style-root", style: { [Le]: o + "px" }, children: h.jsx("div", { id: x ? `diff-root${g}` : void 0, className: "diff-view-wrapper" + (n ? ` ${n}` : ""), style: i, children: l & Ce.Split ? h.jsx(Ql, { diffFile: e }) : h.jsx(Xl, { diffFile: e }) }) }) }) });
}, Yr = M.memo(qr), Jr = (t, e) => {
  var n, i;
  const { registerHighlighter: s, data: l, diffViewTheme: a, diffFile: o, ...d } = t, f = M.useMemo(() => {
    var b, m, x, g, w, _;
    if (o) {
      const N = ht.createInstance({});
      return N._mergeFullBundle(o._getFullBundle()), N;
    } else if (l) return new ht(((b = l == null ? void 0 : l.oldFile) === null || b === void 0 ? void 0 : b.fileName) || "", ((m = l == null ? void 0 : l.oldFile) === null || m === void 0 ? void 0 : m.content) || "", ((x = l == null ? void 0 : l.newFile) === null || x === void 0 ? void 0 : x.fileName) || "", ((g = l == null ? void 0 : l.newFile) === null || g === void 0 ? void 0 : g.content) || "", (l == null ? void 0 : l.hunks) || [], ((w = l == null ? void 0 : l.oldFile) === null || w === void 0 ? void 0 : w.fileLang) || "", ((_ = l == null ? void 0 : l.newFile) === null || _ === void 0 ? void 0 : _.fileLang) || "");
    return null;
  }, [l, o]), r = M.useRef(f), c = M.useRef(null);
  r.current && r.current !== f && ((i = (n = r.current).clear) === null || i === void 0 || i.call(n), r.current = f);
  const v = hr();
  return M.useEffect(() => {
    if (o && f) return o._addClonedInstance(f), () => {
      o._delClonedInstance(f);
    };
  }, [f, o]), M.useEffect(() => {
    f && (f.initTheme(a), f.initRaw(), f.buildSplitDiffLines(), f.buildUnifiedDiffLines());
  }, [f, a]), M.useEffect(() => {
    f && t.diffViewHighlight && (s ? (s.name !== f._getHighlighterName() || s.type !== f._getHighlighterType() || s.type !== "class") && (f.initSyntax({ registerHighlighter: s }), f.notifyAll()) : (!f._getIsCloned() && f._getHighlighterName() !== Bt.name || f._getHighlighterType() !== "class") && (f.initSyntax(), f.notifyAll()));
  }, [f, t.diffViewHighlight, s, a]), M.useEffect(() => {
    if (!f) return;
    const b = () => {
      var x, g;
      (x = c.current) === null || x === void 0 || x.setAttribute("data-theme", f._getTheme() || "light"), (g = c.current) === null || g === void 0 || g.setAttribute("data-highlighter", f._getHighlighterName());
    };
    return b(), f.subscribe(b);
  }, [f, a]), pr(() => {
    var b;
    return (b = f == null ? void 0 : f.clear) === null || b === void 0 ? void 0 : b.call(f);
  }, [f]), M.useImperativeHandle(e, () => ({ getDiffFileInstance: () => f }), [f]), f ? h.jsx(Yr, { ...d, diffFile: f, isMounted: v, wrapperRef: c, diffViewTheme: a, diffViewMode: d.diffViewMode || Ce.SplitGitHub, diffViewFontSize: d.diffViewFontSize || 14 }, f.getId()) : null;
}, eo = M.forwardRef(Jr);
eo.displayName = "DiffView";
const to = eo, Qr = "0.1.7", mi = (t) => {
  const e = M.useRef(t);
  return e.current = t, M.useCallback((...n) => {
    var i;
    return (i = e.current) === null || i === void 0 ? void 0 : i.call(e, ...n);
  }, []);
}, Xr = (t, e) => {
  const n = M.useRef(false);
  M.useEffect(() => {
    if (n.current) return t();
    n.current = true;
  }, e);
}, ea = (t, e) => {
  const { enableMultiSelect: n = true, extendData: i, onMultiSelectComplete: s, onMultiSelectChange: l, scopeMultiSelectToHunk: a, renderWidgetLine: o, onAddWidgetClick: d, diffViewMode: f = Ce.SplitGitHub, ...r } = t, c = mi(l), v = mi(s), b = mi(a), m = M.useRef(null), x = M.useRef(null), g = M.useRef(null), w = M.useRef(void 0), _ = !(f & Ce.Split), N = M.useCallback((p) => {
    var y;
    w.current = p, (y = g.current) === null || y === void 0 || y.setPreselectedLines(p || { old: [], new: [] });
  }, []);
  Xr(() => {
    N(void 0);
  }, [t.diffViewWrap, f]);
  const I = M.useCallback(() => {
    var p, y;
    return (y = (p = x.current) === null || p === void 0 ? void 0 : p.getDiffFileInstance()) !== null && y !== void 0 ? y : null;
  }, []);
  M.useEffect(() => {
    var p;
    const y = m.current, L = I();
    if (!y || !L || !n) {
      (p = g.current) === null || p === void 0 || p.destroy(), g.current = null;
      return;
    }
    const k = { enabled: n, isUnifiedMode: _, selectedClassName: Ot.selected, onSelectionChange: (E, C) => {
      var D, $;
      C.isSelecting ? (D = m.current) === null || D === void 0 || D.classList.add(Ot.selecting) : ($ = m.current) === null || $ === void 0 || $.classList.remove(Ot.selecting), C.isSelecting && w.current && N(void 0), c == null ? void 0 : c(E, C);
    }, onSelectionComplete: (E) => {
      var C;
      if ((C = m.current) === null || C === void 0 || C.classList.remove(Ot.selecting), E && E.lines.length > 0) {
        v == null ? void 0 : v(E);
        const D = { [E.range.side]: [E.range.startLineNumber, E.range.endLineNumber] };
        N(D);
      } else N(void 0);
    }, scopeToHunk: b };
    return g.current ? (g.current.updateContainer(y), g.current.updateDiffFile(L), g.current.updateOptions(k)) : g.current = ls(y, L, k), () => {
      var E;
      (E = g.current) === null || E === void 0 || E.destroy(), g.current = null;
    };
  }, [n, _, b, c, v, I, N]);
  const S = M.useMemo(() => {
    if (!i) return;
    const p = {};
    if (i.oldFile) {
      p.oldFile = {};
      for (const [y, L] of Object.entries(i.oldFile)) p.oldFile[y] = { data: L.data };
    }
    if (i.newFile) {
      p.newFile = {};
      for (const [y, L] of Object.entries(i.newFile)) p.newFile[y] = { data: L.data };
    }
    return p;
  }, [i]), T = M.useCallback(({ lineNumber: p, side: y, diffFile: L, onClose: k }) => {
    var E;
    if (!o) return null;
    const C = y === j.old ? "old" : "new", D = (E = w.current) === null || E === void 0 ? void 0 : E[C], $ = D ? Math.min(...D) : p, W = D ? Math.max(...D) : p;
    return o({ lineNumber: W, fromLineNumber: $, side: y, diffFile: L, onClose: k });
  }, [o]), A = M.useCallback(() => {
    var p, y;
    return (y = (p = g.current) === null || p === void 0 ? void 0 : p.getSelectionResult()) !== null && y !== void 0 ? y : null;
  }, []), F = M.useCallback(() => {
    var p, y;
    return (y = (p = g.current) === null || p === void 0 ? void 0 : p.getState()) !== null && y !== void 0 ? y : { isSelecting: false, startInfo: null, currentRange: null };
  }, []), q = M.useCallback(() => {
    var p;
    (p = g.current) === null || p === void 0 || p.clearSelection();
  }, []), U = N;
  return M.useImperativeHandle(e, () => ({ getDiffFileInstance: I, getSelectionResult: A, getSelectionState: F, clearSelection: q, setPreselectedLines: U }), [I, A, F, q, U]), h.jsx("div", { ref: m, className: "diff-multiselect-wrapper", children: h.jsx(to, { ref: x, ...r, diffViewMode: f, extendData: S, onAddWidgetClick: (p, y) => {
    var L;
    (L = g.current) === null || L === void 0 || L.clearSelection();
    const k = w.current;
    if (k) {
      const E = j[y], C = k[E], D = E === "new" ? "old" : "new", $ = k[D];
      if (C == null ? void 0 : C.length) {
        const W = Math.max(...C);
        if (W === p) {
          const R = { [E]: C };
          N(R), d == null ? void 0 : d({ lineNumber: W, fromLineNumber: Math.min(...C), side: y });
          return;
        }
      }
      if (_ && ($ == null ? void 0 : $.length)) {
        const W = Math.max(...$), R = I(), P = R.getUnifiedLineIndexByLineNumber(p, y), O = R.getUnifiedLine(P), G = y === j.old ? O.newLineNumber : O.oldLineNumber;
        if (W === G) {
          const B = { [D]: $ };
          N(B), d == null ? void 0 : d({ lineNumber: W, fromLineNumber: Math.min(...$), side: D === "old" ? j.old : j.new });
          return;
        }
      }
      N(void 0), d == null ? void 0 : d({ lineNumber: p, fromLineNumber: p, side: y });
    } else N(void 0), d == null ? void 0 : d({ lineNumber: p, fromLineNumber: p, side: y });
  }, renderWidgetLine: o ? T : void 0 }) });
}, ta = M.forwardRef(ea), ha = Object.freeze(Object.defineProperty({ __proto__: null, DEFAULT_SELECTED_CLASS: en, DefaultDiffExpansionStep: Gi, DiffFile: ht, get DiffFileLineType() {
  return Ie;
}, DiffHunk: Ti, get DiffHunkExpansionType() {
  return at;
}, DiffHunkHeader: Ai, DiffLine: xe, get DiffLineType() {
  return Z;
}, get DiffModeEnum() {
  return Ce;
}, DiffMultiSelectManager: ss, DiffParser: Ji, DiffView: to, DiffViewWithMultiSelect: ta, File: jt, HiddenBidiCharsRegex: Yi, get SplitSide() {
  return j;
}, _cacheMap: ti, _getAST: Us, assertNever: Ki, changeDefaultComposeLength: hl, changeMaxLengthToIgnoreLineDiff: Ps, checkCurrentLineIsHidden: ii, checkDiffLineIncludeChange: Vt, get composeLen() {
  return X;
}, createDiffMultiSelectManager: ls, defaultTransform: xt, diffChanges: Ui, disableCache: ll, escapeHtml: Oi, extendDataToPreselectedLines: vl, getCurrentComposeLength: fl, getDiffRange: Pn, getEnableBuildTemplate: Sn, getEnableFastDiffTemplate: Vi, getFile: it, getHunkHeaderExpansionType: qi, getLang: On, getLargestLineNumber: Zi, getLineNumberFromElement_Split: Bn, getLineNumbersFromElement_Unified: Vn, getMaxLengthToIgnoreLineDiff: Vs, getNumberHolderElement_Split: zn, getPlainDiffTemplate: Gt, getPlainDiffTemplateByFastDiff: Fn, getPlainLineTemplate: ei, getSelectedLinesFromDiffFile_Split: si, getSelectedLinesFromDiffFile_Unified: is, getSideFromElement_Split: es, getSplitContentLines: ni, getSplitLines: ol, getSyntaxDiffTemplate: Kt, getSyntaxDiffTemplateByFastDiff: Un, getSyntaxLineTemplate: Xn, getUnifiedContentLine: Xi, getUnifiedLines: rl, highlighter: Bt, isTransformEnabled: vt, multiSelectClassNames: Ot, normalizeRange: bt, numIterator: Xt, parseInstance: Qi, processAST: Os, processTransformForFile: Pi, processTransformTemplateContent: mt, relativeChanges: Fi, resetDefaultComposeLength: pl, resetEnableBuildTemplate: Qs, resetEnableFastDiffTemplate: Ys, resetMaxLengthToIgnoreLineDiff: Bs, resetTransform: Zs, setEnableBuildTemplate: Js, setEnableFastDiffTemplate: qs, setTransformForFile: Ks, setTransformForTemplateContent: Gs, updateSelectionVisual_Split: ts, updateSelectionVisual_Unified: ns, version: Qr, versions: ml }, Symbol.toStringTag, { value: "Module" }));
class na {
  diff(e, n, i = {}) {
    let s;
    typeof i == "function" ? (s = i, i = {}) : "callback" in i && (s = i.callback);
    const l = this.castInput(e, i), a = this.castInput(n, i), o = this.removeEmpty(this.tokenize(l, i)), d = this.removeEmpty(this.tokenize(a, i));
    return this.diffWithOptionsObj(o, d, i, s);
  }
  diffWithOptionsObj(e, n, i, s) {
    var l;
    const a = (_) => {
      if (_ = this.postProcess(_, i), s) {
        setTimeout(function() {
          s(_);
        }, 0);
        return;
      } else return _;
    }, o = n.length, d = e.length;
    let f = 1, r = o + d;
    i.maxEditLength != null && (r = Math.min(r, i.maxEditLength));
    const c = (l = i.timeout) !== null && l !== void 0 ? l : 1 / 0, v = Date.now() + c, b = [{ oldPos: -1, lastComponent: void 0 }];
    let m = this.extractCommon(b[0], n, e, 0, i);
    if (b[0].oldPos + 1 >= d && m + 1 >= o) return a(this.buildValues(b[0].lastComponent, n, e));
    let x = -1 / 0, g = 1 / 0;
    const w = () => {
      for (let _ = Math.max(x, -f); _ <= Math.min(g, f); _ += 2) {
        let N;
        const I = b[_ - 1], S = b[_ + 1];
        I && (b[_ - 1] = void 0);
        let T = false;
        if (S) {
          const F = S.oldPos - _;
          T = S && 0 <= F && F < o;
        }
        const A = I && I.oldPos + 1 < d;
        if (!T && !A) {
          b[_] = void 0;
          continue;
        }
        if (!A || T && I.oldPos < S.oldPos ? N = this.addToPath(S, true, false, 0, i) : N = this.addToPath(I, false, true, 1, i), m = this.extractCommon(N, n, e, _, i), N.oldPos + 1 >= d && m + 1 >= o) return a(this.buildValues(N.lastComponent, n, e)) || true;
        b[_] = N, N.oldPos + 1 >= d && (g = Math.min(g, _ - 1)), m + 1 >= o && (x = Math.max(x, _ + 1));
      }
      f++;
    };
    if (s) (function _() {
      setTimeout(function() {
        if (f > r || Date.now() > v) return s(void 0);
        w() || _();
      }, 0);
    })();
    else for (; f <= r && Date.now() <= v; ) {
      const _ = w();
      if (_) return _;
    }
  }
  addToPath(e, n, i, s, l) {
    const a = e.lastComponent;
    return a && !l.oneChangePerToken && a.added === n && a.removed === i ? { oldPos: e.oldPos + s, lastComponent: { count: a.count + 1, added: n, removed: i, previousComponent: a.previousComponent } } : { oldPos: e.oldPos + s, lastComponent: { count: 1, added: n, removed: i, previousComponent: a } };
  }
  extractCommon(e, n, i, s, l) {
    const a = n.length, o = i.length;
    let d = e.oldPos, f = d - s, r = 0;
    for (; f + 1 < a && d + 1 < o && this.equals(i[d + 1], n[f + 1], l); ) f++, d++, r++, l.oneChangePerToken && (e.lastComponent = { count: 1, previousComponent: e.lastComponent, added: false, removed: false });
    return r && !l.oneChangePerToken && (e.lastComponent = { count: r, previousComponent: e.lastComponent, added: false, removed: false }), e.oldPos = d, f;
  }
  equals(e, n, i) {
    return i.comparator ? i.comparator(e, n) : e === n || !!i.ignoreCase && e.toLowerCase() === n.toLowerCase();
  }
  removeEmpty(e) {
    const n = [];
    for (let i = 0; i < e.length; i++) e[i] && n.push(e[i]);
    return n;
  }
  castInput(e, n) {
    return e;
  }
  tokenize(e, n) {
    return Array.from(e);
  }
  join(e) {
    return e.join("");
  }
  postProcess(e, n) {
    return e;
  }
  get useLongestToken() {
    return false;
  }
  buildValues(e, n, i) {
    const s = [];
    let l;
    for (; e; ) s.push(e), l = e.previousComponent, delete e.previousComponent, e = l;
    s.reverse();
    const a = s.length;
    let o = 0, d = 0, f = 0;
    for (; o < a; o++) {
      const r = s[o];
      if (r.removed) r.value = this.join(i.slice(f, f + r.count)), f += r.count;
      else {
        if (!r.added && this.useLongestToken) {
          let c = n.slice(d, d + r.count);
          c = c.map(function(v, b) {
            const m = i[f + b];
            return m.length > v.length ? m : v;
          }), r.value = this.join(c);
        } else r.value = this.join(n.slice(d, d + r.count));
        d += r.count, r.added || (f += r.count);
      }
    }
    return s;
  }
}
class ia extends na {
  constructor() {
    super(...arguments), this.tokenize = la;
  }
  equals(e, n, i) {
    return i.ignoreWhitespace ? ((!i.newlineIsToken || !e.includes(`
`)) && (e = e.trim()), (!i.newlineIsToken || !n.includes(`
`)) && (n = n.trim())) : i.ignoreNewlineAtEof && !i.newlineIsToken && (e.endsWith(`
`) && (e = e.slice(0, -1)), n.endsWith(`
`) && (n = n.slice(0, -1))), super.equals(e, n, i);
  }
}
const sa = new ia();
function As(t, e, n) {
  return sa.diff(t, e, n);
}
function la(t, e) {
  e.stripTrailingCr && (t = t.replace(/\r\n/g, `
`));
  const n = [], i = t.split(/(\n|\r\n)/);
  i[i.length - 1] || i.pop();
  for (let s = 0; s < i.length; s++) {
    const l = i[s];
    s % 2 && !e.newlineIsToken ? n[n.length - 1] += l : n.push(l);
  }
  return n;
}
const oa = { includeIndex: true, includeUnderline: true, includeFileHeaders: true };
function Fs(t, e, n, i, s, l, a) {
  let o;
  a ? typeof a == "function" ? o = { callback: a } : o = a : o = {}, typeof o.context > "u" && (o.context = 4);
  const d = o.context;
  if (o.newlineIsToken) throw new Error("newlineIsToken may not be used with patch-generation functions, only with diffing functions");
  if (o.callback) {
    const { callback: r } = o;
    As(n, i, Object.assign(Object.assign({}, o), { callback: (c) => {
      const v = f(c);
      r(v);
    } }));
  } else return f(As(n, i, o));
  function f(r) {
    if (!r) return;
    r.push({ value: "", lines: [] });
    function c(_) {
      return _.map(function(N) {
        return " " + N;
      });
    }
    const v = [];
    let b = 0, m = 0, x = [], g = 1, w = 1;
    for (let _ = 0; _ < r.length; _++) {
      const N = r[_], I = N.lines || aa(N.value);
      if (N.lines = I, N.added || N.removed) {
        if (!b) {
          const S = r[_ - 1];
          b = g, m = w, S && (x = d > 0 ? c(S.lines.slice(-d)) : [], b -= x.length, m -= x.length);
        }
        for (const S of I) x.push((N.added ? "+" : "-") + S);
        N.added ? w += I.length : g += I.length;
      } else {
        if (b) if (I.length <= d * 2 && _ < r.length - 2) for (const S of c(I)) x.push(S);
        else {
          const S = Math.min(I.length, d);
          for (const A of c(I.slice(0, S))) x.push(A);
          const T = { oldStart: b, oldLines: g - b + S, newStart: m, newLines: w - m + S, lines: x };
          v.push(T), b = 0, m = 0, x = [];
        }
        g += I.length, w += I.length;
      }
    }
    for (const _ of v) for (let N = 0; N < _.lines.length; N++) _.lines[N].endsWith(`
`) ? _.lines[N] = _.lines[N].slice(0, -1) : (_.lines.splice(N + 1, 0, "\\ No newline at end of file"), N++);
    return { oldFileName: t, newFileName: e, oldHeader: s, newHeader: l, hunks: v };
  }
}
function Wi(t, e) {
  if (e || (e = oa), Array.isArray(t)) {
    if (t.length > 1 && !e.includeFileHeaders) throw new Error("Cannot omit file headers on a multi-file patch. (The result would be unparseable; how would a tool trying to apply the patch know which changes are to which file?)");
    return t.map((i) => Wi(i, e)).join(`
`);
  }
  const n = [];
  e.includeIndex && t.oldFileName == t.newFileName && n.push("Index: " + t.oldFileName), e.includeUnderline && n.push("==================================================================="), e.includeFileHeaders && (n.push("--- " + t.oldFileName + (typeof t.oldHeader > "u" ? "" : "	" + t.oldHeader)), n.push("+++ " + t.newFileName + (typeof t.newHeader > "u" ? "" : "	" + t.newHeader)));
  for (let i = 0; i < t.hunks.length; i++) {
    const s = t.hunks[i];
    s.oldLines === 0 && (s.oldStart -= 1), s.newLines === 0 && (s.newStart -= 1), n.push("@@ -" + s.oldStart + "," + s.oldLines + " +" + s.newStart + "," + s.newLines + " @@");
    for (const l of s.lines) n.push(l);
  }
  return n.join(`
`) + `
`;
}
function ra(t, e, n, i, s, l, a) {
  if (typeof a == "function" && (a = { callback: a }), a == null ? void 0 : a.callback) {
    const { callback: o } = a;
    Fs(t, e, n, i, s, l, Object.assign(Object.assign({}, a), { callback: (d) => {
      o(d ? Wi(d, a.headerOptions) : void 0);
    } }));
  } else {
    const o = Fs(t, e, n, i, s, l, a);
    return o ? Wi(o, a == null ? void 0 : a.headerOptions) : void 0;
  }
}
function aa(t) {
  const e = t.endsWith(`
`), n = t.split(`
`).map((i) => i + `
`);
  return e ? n.pop() : n.push(n.pop().slice(0, -1)), n;
}
ti.name = "@git-diff-view/file";
function da(t, e, n, i, s, l, a, o) {
  const d = ra(t, n, e, i, "", "", a);
  return new ht(t, e, n, i, [d], s, l, o);
}
const pa = Object.freeze(Object.defineProperty({ __proto__: null, DEFAULT_SELECTED_CLASS: en, DefaultDiffExpansionStep: Gi, DiffFile: ht, get DiffFileLineType() {
  return Ie;
}, DiffHunk: Ti, get DiffHunkExpansionType() {
  return at;
}, DiffHunkHeader: Ai, DiffLine: xe, get DiffLineType() {
  return Z;
}, DiffMultiSelectManager: ss, DiffParser: Ji, File: jt, HiddenBidiCharsRegex: Yi, get SplitSide() {
  return j;
}, _cacheMap: ti, _getAST: Us, assertNever: Ki, changeDefaultComposeLength: hl, changeMaxLengthToIgnoreLineDiff: Ps, checkCurrentLineIsHidden: ii, checkDiffLineIncludeChange: Vt, get composeLen() {
  return X;
}, createDiffMultiSelectManager: ls, defaultTransform: xt, diffChanges: Ui, disableCache: ll, escapeHtml: Oi, extendDataToPreselectedLines: vl, generateDiffFile: da, getCurrentComposeLength: fl, getDiffRange: Pn, getEnableBuildTemplate: Sn, getEnableFastDiffTemplate: Vi, getFile: it, getHunkHeaderExpansionType: qi, getLang: On, getLargestLineNumber: Zi, getLineNumberFromElement_Split: Bn, getLineNumbersFromElement_Unified: Vn, getMaxLengthToIgnoreLineDiff: Vs, getNumberHolderElement_Split: zn, getPlainDiffTemplate: Gt, getPlainDiffTemplateByFastDiff: Fn, getPlainLineTemplate: ei, getSelectedLinesFromDiffFile_Split: si, getSelectedLinesFromDiffFile_Unified: is, getSideFromElement_Split: es, getSplitContentLines: ni, getSplitLines: ol, getSyntaxDiffTemplate: Kt, getSyntaxDiffTemplateByFastDiff: Un, getSyntaxLineTemplate: Xn, getUnifiedContentLine: Xi, getUnifiedLines: rl, highlighter: Bt, isTransformEnabled: vt, multiSelectClassNames: Ot, normalizeRange: bt, numIterator: Xt, parseInstance: Qi, processAST: Os, processTransformForFile: Pi, processTransformTemplateContent: mt, relativeChanges: Fi, resetDefaultComposeLength: pl, resetEnableBuildTemplate: Qs, resetEnableFastDiffTemplate: Ys, resetMaxLengthToIgnoreLineDiff: Bs, resetTransform: Zs, setEnableBuildTemplate: Js, setEnableFastDiffTemplate: qs, setTransformForFile: Ks, setTransformForTemplateContent: Gs, updateSelectionVisual_Split: ts, updateSelectionVisual_Unified: ns, versions: ml }, Symbol.toStringTag, { value: "Module" }));
export {
  pa as a,
  fa as d,
  ha as i
};
