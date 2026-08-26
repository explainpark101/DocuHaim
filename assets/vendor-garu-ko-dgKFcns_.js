import { _ as R } from "./vendor-md-editor-DQ2k84v8.js";
import "./vendor-react-kfkzeLNk.js";
const U = /([\u3131-\u3163])\1{2,}/g, D = { \u3131\u3145: "\uAC10\uC0AC", \u314A\u314B: "\uCD95\uD558", \u3134\u3134: "\uB178\uB178", \u3142\u3142: "\uBC14\uC774\uBC14\uC774", \u3148\u3145: "\uC8C4\uC1A1", \u3131\u314A: "\uAD1C\uCC2E", \u3147\u3148: "\uC778\uC815", \u314E\u3147: "\uD558\uC774", \u3139\u3147: "\uB9AC\uC5BC", \u3147\u314B: "\uC624\uCF00\uC774", \u3141\u3139: "\uBAA8\uB984", \u3145\u3131: "\uC218\uACE0", \u314A\u314A: "\uCD94\uCC9C", \u314D\u314C: "\uD30C\uC774\uD305", \u3137\u3137: "\uB35C\uB35C" }, F = { \uC6CC\uB514: "\uC5B4\uB514", \uC640\uCF00: "\uC65C\uC774\uB807\uAC8C", \uC6B0\uC608: "\uC5B4\uB5BB\uAC8C", \uAE0D\uAC8C: "\uADF8\uB7EC\uB2C8\uAE4C", \uC6CC\uBA54: "\uC5B4\uBA38", \uAC00\uC720: "\uAC00\uC694", \uD5C8\uC720: "\uD574\uC694" };
function X(t, e = {}) {
  const { jamo: n = true, jamoAbbrev: r = false, dialect: a = false } = e;
  let s = t;
  if (n && (s = s.replace(U, "$1$1")), r) for (const [i, _] of Object.entries(D)) {
    const u = new RegExp(`(?<![\uAC00-\uD7A3\u3131-\u3163])${i}(?![\uAC00-\uD7A3\u3131-\u3163])`, "g");
    s = s.replace(u, _);
  }
  if (a) for (const [i, _] of Object.entries(F)) s = s.replace(new RegExp(i, "g"), _);
  return s;
}
function K(t) {
  const e = [], n = /([.!?…]+)\s+(?=[가-힣A-Z"'([{])/g;
  let r = 0, a = 0, s;
  for (; (s = n.exec(t)) !== null; ) {
    const _ = t.slice(a, s.index + s[1].length).trim();
    _.length > 0 && e.push({ text: _, offset: r });
    const u = s.index + s[0].length;
    r += [...t.slice(a, u)].length, a = u;
  }
  const i = t.slice(a).trim();
  return i.length > 0 && e.push({ text: i, offset: r }), e.length > 0 ? e : [{ text: t.trim(), offset: 0 }];
}
const O = Object.freeze({ tokens: [], score: 0, elapsed: 0 });
class L {
  constructor(e, n) {
    this._wasm = e, this._loaded = true, this._modelSize = n;
  }
  analyze(e, n) {
    if (!this._loaded) throw new Error("Garu instance has been destroyed");
    const r = (n == null ? void 0 : n.topN) ?? 1;
    return r > 1 ? e === "" ? [{ ...O, tokens: [] }] : this._wasm.analyze_topn(e, r) : e === "" ? { ...O, tokens: [] } : this._wasm.analyze(e);
  }
  tokenize(e) {
    if (!this._loaded) throw new Error("Garu instance has been destroyed");
    return e === "" ? [] : this._wasm.tokenize(e);
  }
  nouns(e, n) {
    if (!this._loaded) throw new Error("Garu instance has been destroyed");
    if (e === "") return [];
    const r = this._wasm.analyze(e), a = (n == null ? void 0 : n.includeSL) ?? false;
    return r.tokens.filter((s) => s.pos === "NNG" || s.pos === "NNP" || a && s.pos === "SL").map((s) => s.text);
  }
  addUserWord(e, n, r) {
    if (!this._loaded) throw new Error("Garu instance has been destroyed");
    this._wasm.add_user_word(e, n, r);
  }
  addUserWords(e) {
    for (const n of e) this.addUserWord(n.surface, n.pos, n.freq);
  }
  clearUserWords() {
    if (!this._loaded) throw new Error("Garu instance has been destroyed");
    this._wasm.clear_user_words();
  }
  userWordCount() {
    if (!this._loaded) throw new Error("Garu instance has been destroyed");
    return this._wasm.user_word_count();
  }
  isLoaded() {
    return this._loaded;
  }
  modelInfo() {
    return { version: this._wasm.constructor.version(), size: this._modelSize, accuracy: 0.96 };
  }
  destroy() {
    this._wasm && (this._wasm.free(), this._wasm = null), this._loaded = false;
  }
}
class z extends L {
  static async load(e) {
    const n = await R(() => Promise.resolve().then(() => Z), void 0);
    await n.default();
    let r;
    if (e == null ? void 0 : e.modelData) r = new Uint8Array(e.modelData);
    else if (e == null ? void 0 : e.modelUrl) {
      const s = await fetch(e.modelUrl);
      if (!s.ok) throw new Error(`Failed to fetch model from ${e.modelUrl}: ${s.status} ${s.statusText}`);
      r = new Uint8Array(await s.arrayBuffer());
    } else {
      const s = new URL("/DocuHaim/assets/base-D9Gyc7PP.gmdl", import.meta.url).href, i = await fetch(s);
      if (!i.ok) throw new Error(`Failed to fetch model from ${s}: ${i.status} ${i.statusText}`);
      r = new Uint8Array(await i.arrayBuffer());
    }
    const a = new n.GaruWasm(r, (e == null ? void 0 : e.normalizeJamo) ?? false);
    return new z(a, r.byteLength);
  }
}
function B() {
  return performance.now();
}
const P = Object.freeze(Object.defineProperty({ __proto__: null, performance_now: B }, Symbol.toStringTag, { value: "Module" }));
class E {
  __destroy_into_raw() {
    const e = this.__wbg_ptr;
    return this.__wbg_ptr = 0, k.unregister(this), e;
  }
  free() {
    const e = this.__destroy_into_raw();
    o.__wbg_garuwasm_free(e, 0);
  }
  add_user_word(e, n, r) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16), _ = b(e, o.__wbindgen_export, o.__wbindgen_export2), u = f, W = b(n, o.__wbindgen_export, o.__wbindgen_export2), M = f;
      o.garuwasm_add_user_word(i, this.__wbg_ptr, _, u, W, M, S(r) ? 4294967297 : r >>> 0);
      var a = c().getInt32(i + 0, true), s = c().getInt32(i + 4, true);
      if (s) throw d(a);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  analyze(e) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), i = b(e, o.__wbindgen_export, o.__wbindgen_export2), _ = f;
      o.garuwasm_analyze(s, this.__wbg_ptr, i, _);
      var n = c().getInt32(s + 0, true), r = c().getInt32(s + 4, true), a = c().getInt32(s + 8, true);
      if (a) throw d(r);
      return d(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  analyze_topn(e, n) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16), _ = b(e, o.__wbindgen_export, o.__wbindgen_export2), u = f;
      o.garuwasm_analyze_topn(i, this.__wbg_ptr, _, u, n);
      var r = c().getInt32(i + 0, true), a = c().getInt32(i + 4, true), s = c().getInt32(i + 8, true);
      if (s) throw d(a);
      return d(r);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  clear_user_words() {
    o.garuwasm_clear_user_words(this.__wbg_ptr);
  }
  constructor(e, n) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16), _ = N(e, o.__wbindgen_export), u = f;
      o.garuwasm_new(i, _, u, S(n) ? 16777215 : n ? 1 : 0);
      var r = c().getInt32(i + 0, true), a = c().getInt32(i + 4, true), s = c().getInt32(i + 8, true);
      if (s) throw d(a);
      return this.__wbg_ptr = r >>> 0, k.register(this, this.__wbg_ptr, this), this;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  tokenize(e) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), i = b(e, o.__wbindgen_export, o.__wbindgen_export2), _ = f;
      o.garuwasm_tokenize(s, this.__wbg_ptr, i, _);
      var n = c().getInt32(s + 0, true), r = c().getInt32(s + 4, true), a = c().getInt32(s + 8, true);
      if (a) throw d(r);
      return d(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  user_word_count() {
    return o.garuwasm_user_word_count(this.__wbg_ptr) >>> 0;
  }
  static version() {
    let e, n;
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.garuwasm_version(s);
      var r = c().getInt32(s + 0, true), a = c().getInt32(s + 4, true);
      return e = r, n = a, v(r, a);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export3(e, n, 1);
    }
  }
}
Symbol.dispose && (E.prototype[Symbol.dispose] = E.prototype.free);
function j() {
  return { __proto__: null, "./garu_wasm_bg.js": { __proto__: null, __wbg_Error_83742b46f01ce22d: function(e, n) {
    const r = Error(v(e, n));
    return w(r);
  }, __wbg_String_8564e559799eccda: function(e, n) {
    const r = String(h(n)), a = b(r, o.__wbindgen_export, o.__wbindgen_export2), s = f;
    c().setInt32(e + 4, s, true), c().setInt32(e + 0, a, true);
  }, __wbg___wbindgen_throw_6ddd609b62940d55: function(e, n) {
    throw new Error(v(e, n));
  }, __wbg_new_a70fbab9066b301f: function() {
    const e = new Array();
    return w(e);
  }, __wbg_new_ab79df5bd7c26067: function() {
    const e = new Object();
    return w(e);
  }, __wbg_set_282384002438957f: function(e, n, r) {
    h(e)[n >>> 0] = d(r);
  }, __wbg_set_6be42768c690e380: function(e, n, r) {
    h(e)[d(n)] = d(r);
  }, __wbindgen_cast_0000000000000001: function(e) {
    return w(e);
  }, __wbindgen_cast_0000000000000002: function(e, n) {
    const r = v(e, n);
    return w(r);
  }, __wbindgen_cast_0000000000000003: function(e) {
    const n = BigInt.asUintN(64, e);
    return w(n);
  }, __wbindgen_object_clone_ref: function(e) {
    const n = h(e);
    return w(n);
  }, __wbindgen_object_drop_ref: function(e) {
    d(e);
  } }, "./snippets/garu-core-0ba03e656c326ae4/inline0.js": P };
}
const k = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((t) => o.__wbg_garuwasm_free(t >>> 0, 1));
function w(t) {
  m === l.length && l.push(l.length + 1);
  const e = m;
  return m = l[e], l[e] = t, e;
}
function G(t) {
  t < 1028 || (l[t] = m, m = t);
}
let g = null;
function c() {
  return (g === null || g.buffer.detached === true || g.buffer.detached === void 0 && g.buffer !== o.memory.buffer) && (g = new DataView(o.memory.buffer)), g;
}
function v(t, e) {
  return t = t >>> 0, C(t, e);
}
let p = null;
function y() {
  return (p === null || p.byteLength === 0) && (p = new Uint8Array(o.memory.buffer)), p;
}
function h(t) {
  return l[t];
}
let l = new Array(1024).fill(void 0);
l.push(void 0, null, true, false);
let m = l.length;
function S(t) {
  return t == null;
}
function N(t, e) {
  const n = e(t.length * 1, 1) >>> 0;
  return y().set(t, n / 1), f = t.length, n;
}
function b(t, e, n) {
  if (n === void 0) {
    const _ = A.encode(t), u = e(_.length, 1) >>> 0;
    return y().subarray(u, u + _.length).set(_), f = _.length, u;
  }
  let r = t.length, a = e(r, 1) >>> 0;
  const s = y();
  let i = 0;
  for (; i < r; i++) {
    const _ = t.charCodeAt(i);
    if (_ > 127) break;
    s[a + i] = _;
  }
  if (i !== r) {
    i !== 0 && (t = t.slice(i)), a = n(a, r, r = i + t.length * 3, 1) >>> 0;
    const _ = y().subarray(a + i, a + r), u = A.encodeInto(t, _);
    i += u.written, a = n(a, r, i, 1) >>> 0;
  }
  return f = i, a;
}
function d(t) {
  const e = h(t);
  return G(t), e;
}
let x = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
x.decode();
const $ = 2146435072;
let I = 0;
function C(t, e) {
  return I += e, I >= $ && (x = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }), x.decode(), I = e), x.decode(y().subarray(t, t + e));
}
const A = new TextEncoder();
"encodeInto" in A || (A.encodeInto = function(t, e) {
  const n = A.encode(t);
  return e.set(n), { read: t.length, written: n.length };
});
let f = 0, o;
function T(t, e) {
  return o = t.exports, g = null, p = null, o;
}
async function V(t, e) {
  if (typeof Response == "function" && t instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function") try {
      return await WebAssembly.instantiateStreaming(t, e);
    } catch (a) {
      if (t.ok && n(t.type) && t.headers.get("Content-Type") !== "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", a);
      else throw a;
    }
    const r = await t.arrayBuffer();
    return await WebAssembly.instantiate(r, e);
  } else {
    const r = await WebAssembly.instantiate(t, e);
    return r instanceof WebAssembly.Instance ? { instance: r, module: t } : r;
  }
  function n(r) {
    switch (r) {
      case "basic":
      case "cors":
      case "default":
        return true;
    }
    return false;
  }
}
function H(t) {
  if (o !== void 0) return o;
  t !== void 0 && (Object.getPrototypeOf(t) === Object.prototype ? { module: t } = t : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
  const e = j();
  t instanceof WebAssembly.Module || (t = new WebAssembly.Module(t));
  const n = new WebAssembly.Instance(t, e);
  return T(n);
}
async function J(t) {
  if (o !== void 0) return o;
  t !== void 0 && (Object.getPrototypeOf(t) === Object.prototype ? { module_or_path: t } = t : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), t === void 0 && (t = new URL("/DocuHaim/assets/garu_wasm_bg-Bv9zZmZl.wasm", import.meta.url));
  const e = j();
  (typeof t == "string" || typeof Request == "function" && t instanceof Request || typeof URL == "function" && t instanceof URL) && (t = fetch(t));
  const { instance: n, module: r } = await V(await t, e);
  return T(n);
}
const Z = Object.freeze(Object.defineProperty({ __proto__: null, GaruWasm: E, default: J, initSync: H }, Symbol.toStringTag, { value: "Module" }));
export {
  z as Garu,
  X as normalizeText,
  K as splitSentences
};
