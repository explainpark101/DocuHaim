function u(t) {
  function i(r) {
    if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object."));
    var n = r.done;
    return Promise.resolve(r.value).then(function(s) {
      return { value: s, done: n };
    });
  }
  return u = function(r) {
    this.s = r, this.n = r.next;
  }, u.prototype = { s: null, n: null, next: function() {
    return i(this.n.apply(this.s, arguments));
  }, return: function(r) {
    var n = this.s.return;
    return n === void 0 ? Promise.resolve({ value: r, done: true }) : i(n.apply(this.s, arguments));
  }, throw: function(r) {
    var n = this.s.return;
    return n === void 0 ? Promise.reject(r) : i(n.apply(this.s, arguments));
  } }, new u(t);
}
const p = async (t, i, r = t.name, n) => {
  const s = [], y = [];
  var v, c = false, d = false;
  try {
    for (var h, f = (function(e) {
      var o, a, l, w = 2;
      for (typeof Symbol < "u" && (a = Symbol.asyncIterator, l = Symbol.iterator); w--; ) {
        if (a && (o = e[a]) != null) return o.call(e);
        if (l && (o = e[l]) != null) return new u(o.call(e));
        a = "@@asyncIterator", l = "@@iterator";
      }
      throw new TypeError("Object is not async iterable");
    })(t.values()); c = !(h = await f.next()).done; c = false) {
      const e = h.value, o = `${r}/${e.name}`;
      e.kind === "file" ? y.push(e.getFile().then((a) => (a.directoryHandle = t, a.handle = e, Object.defineProperty(a, "webkitRelativePath", { configurable: true, enumerable: true, get: () => o })))) : e.kind !== "directory" || !i || n && n(e) || s.push(p(e, i, o, n));
    }
  } catch (e) {
    d = true, v = e;
  } finally {
    try {
      c && f.return != null && await f.return();
    } finally {
      if (d) throw v;
    }
  }
  return [...(await Promise.all(s)).flat(), ...await Promise.all(y)];
};
var m = async (t = {}) => {
  t.recursive = t.recursive || false;
  const i = await window.showDirectoryPicker({ id: t.id, startIn: t.startIn });
  return p(i, t.recursive, void 0, t.skipDirectory);
};
export {
  m as default
};
