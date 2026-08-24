const r = { name: "toml", startState: function() {
  return { inString: false, stringType: "", lhs: true, inArray: 0 };
}, token: function(n, e) {
  let i;
  if (!e.inString && (i = n.match(/^('''|"""|'|")/)) && (e.stringType = i[0], e.inString = true), n.sol() && !e.inString && e.inArray === 0 && (e.lhs = true), e.inString) {
    for (; e.inString; ) if (n.match(e.stringType)) e.inString = false;
    else if (n.peek() === "\\") n.next(), n.next();
    else {
      if (n.eol()) break;
      n.match(/^.[^\\\"\']*/);
    }
    return e.lhs ? "property" : "string";
  } else {
    if (e.inArray && n.peek() === "]") return n.next(), e.inArray--, "bracket";
    if (e.lhs && n.peek() === "[" && n.skipTo("]")) return n.next(), n.peek() === "]" && n.next(), "atom";
    if (n.peek() === "#") return n.skipToEnd(), "comment";
    if (n.eatSpace()) return null;
    if (e.lhs && n.eatWhile(function(l) {
      return l != "=" && l != " ";
    })) return "property";
    if (e.lhs && n.peek() === "=") return n.next(), e.lhs = false, null;
    if (!e.lhs && n.match(/^\d\d\d\d[\d\-\:\.T]*Z/)) return "atom";
    if (!e.lhs && (n.match("true") || n.match("false"))) return "atom";
    if (!e.lhs && n.peek() === "[") return e.inArray++, n.next(), "bracket";
    if (!e.lhs && n.match(/^\-?\d+(?:\.\d+)?/)) return "number";
    n.eatSpace() || n.next();
  }
  return null;
}, languageData: { commentTokens: { line: "#" } } };
export {
  r as toml
};
