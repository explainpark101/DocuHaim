var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const Qd = "modulepreload", Jd = function(t) {
  return "/DocuHaim/" + t;
}, Zi = {}, Yd = function(e, r, s) {
  let n = Promise.resolve();
  if (r && r.length > 0) {
    let c = function(u) {
      return Promise.all(u.map((m) => Promise.resolve(m).then((l) => ({ status: "fulfilled", value: l }), (l) => ({ status: "rejected", reason: l }))));
    };
    document.getElementsByTagName("link");
    const o = document.querySelector("meta[property=csp-nonce]"), a = (o == null ? void 0 : o.nonce) || (o == null ? void 0 : o.getAttribute("nonce"));
    n = c(r.map((u) => {
      if (u = Jd(u), u in Zi) return;
      Zi[u] = true;
      const m = u.endsWith(".css"), l = m ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${u}"]${l}`)) return;
      const h = document.createElement("link");
      if (h.rel = m ? "stylesheet" : Qd, m || (h.as = "script"), h.crossOrigin = "", h.href = u, a && h.setAttribute("nonce", a), document.head.appendChild(h), m) return new Promise((g, x) => {
        h.addEventListener("load", g), h.addEventListener("error", () => x(new Error(`Unable to preload CSS for ${u}`)));
      });
    }));
  }
  function i(o) {
    const a = new Event("vite:preloadError", { cancelable: true });
    if (a.payload = o, window.dispatchEvent(a), !a.defaultPrevented) throw o;
  }
  return n.then((o) => {
    for (const a of o || []) a.status === "rejected" && i(a.reason);
    return e().catch(i);
  });
}, el = (t) => ({ setHttpHandler(e) {
  t.httpHandler = e;
}, httpHandler() {
  return t.httpHandler;
}, updateHttpClientConfig(e, r) {
  var _a2;
  (_a2 = t.httpHandler) == null ? void 0 : _a2.updateHttpClientConfig(e, r);
}, httpHandlerConfigs() {
  return t.httpHandler.httpHandlerConfigs();
} }), tl = (t) => ({ httpHandler: t.httpHandler() });
var hr;
(function(t) {
  t.HTTP = "http", t.HTTPS = "https";
})(hr || (hr = {}));
var pr;
(function(t) {
  t.MD5 = "md5", t.CRC32 = "crc32", t.CRC32C = "crc32c", t.SHA1 = "sha1", t.SHA256 = "sha256";
})(pr || (pr = {}));
const Tn = "__smithy_context";
class ee {
  constructor(e) {
    __publicField(this, "method");
    __publicField(this, "protocol");
    __publicField(this, "hostname");
    __publicField(this, "port");
    __publicField(this, "path");
    __publicField(this, "query");
    __publicField(this, "headers");
    __publicField(this, "username");
    __publicField(this, "password");
    __publicField(this, "fragment");
    __publicField(this, "body");
    this.method = e.method || "GET", this.hostname = e.hostname || "localhost", this.port = e.port, this.query = e.query || {}, this.headers = e.headers || {}, this.body = e.body, this.protocol = e.protocol ? e.protocol.slice(-1) !== ":" ? `${e.protocol}:` : e.protocol : "https:", this.path = e.path ? e.path.charAt(0) !== "/" ? `/${e.path}` : e.path : "/", this.username = e.username, this.password = e.password, this.fragment = e.fragment;
  }
  static clone(e) {
    const r = new ee({ ...e, headers: { ...e.headers } });
    return r.query && (r.query = rl(r.query)), r;
  }
  static isInstance(e) {
    if (!e) return false;
    const r = e;
    return "method" in r && "protocol" in r && "hostname" in r && "path" in r && typeof r.query == "object" && typeof r.headers == "object";
  }
  clone() {
    return ee.clone(this);
  }
}
function rl(t) {
  return Object.keys(t).reduce((e, r) => {
    const s = t[r];
    return { ...e, [r]: Array.isArray(s) ? [...s] : s };
  }, {});
}
class ct {
  constructor(e) {
    __publicField(this, "statusCode");
    __publicField(this, "reason");
    __publicField(this, "headers");
    __publicField(this, "body");
    this.statusCode = e.statusCode, this.reason = e.reason, this.headers = e.headers || {}, this.body = e.body;
  }
  static isInstance(e) {
    if (!e) return false;
    const r = e;
    return typeof r.statusCode == "number" && typeof r.headers == "object";
  }
}
function sl(t) {
  return (e) => async (r) => {
    var _a2, _b2, _c2, _d2;
    const { request: s } = r;
    if (t.expectContinueHeader !== false && ee.isInstance(s) && s.body && t.runtime === "node" && ((_b2 = (_a2 = t.requestHandler) == null ? void 0 : _a2.constructor) == null ? void 0 : _b2.name) !== "FetchHttpHandler") {
      let n = true;
      if (typeof t.expectContinueHeader == "number") try {
        n = (Number((_c2 = s.headers) == null ? void 0 : _c2["content-length"]) ?? ((_d2 = t.bodyLengthChecker) == null ? void 0 : _d2.call(t, s.body)) ?? 1 / 0) >= t.expectContinueHeader;
      } catch {
      }
      else n = !!t.expectContinueHeader;
      n && (s.headers.Expect = "100-continue");
    }
    return e({ ...r, request: s });
  };
}
const nl = { step: "build", tags: ["SET_EXPECT_HEADER", "EXPECT_HEADER"], name: "addExpectContinueMiddleware", override: true }, il = (t) => ({ applyToStack: (e) => {
  e.add(sl(t), nl);
} }), Vt = { WHEN_SUPPORTED: "WHEN_SUPPORTED", WHEN_REQUIRED: "WHEN_REQUIRED" }, ol = Vt.WHEN_SUPPORTED, Ls = { WHEN_SUPPORTED: "WHEN_SUPPORTED", WHEN_REQUIRED: "WHEN_REQUIRED" }, al = Vt.WHEN_SUPPORTED;
var W;
(function(t) {
  t.MD5 = "MD5", t.CRC32 = "CRC32", t.CRC32C = "CRC32C", t.CRC64NVME = "CRC64NVME", t.SHA1 = "SHA1", t.SHA256 = "SHA256";
})(W || (W = {}));
var Qi;
(function(t) {
  t.HEADER = "header", t.TRAILER = "trailer";
})(Qi || (Qi = {}));
const _n = W.CRC32;
function cl(t, e, r) {
  return t.$source || (t.$source = {}), t.$source[e] = r, t;
}
function se(t, e, r) {
  t.__aws_sdk_context ? t.__aws_sdk_context.features || (t.__aws_sdk_context.features = {}) : t.__aws_sdk_context = { features: {} }, t.__aws_sdk_context.features[e] = r;
}
const Ji = (t) => {
  var _a2, _b2;
  return ct.isInstance(t) ? ((_a2 = t.headers) == null ? void 0 : _a2.date) ?? ((_b2 = t.headers) == null ? void 0 : _b2.Date) : void 0;
}, Jn = (t) => new Date(Date.now() + t), ul = (t, e) => Math.abs(Jn(e).getTime() - t) >= 3e5, Yi = (t, e) => {
  const r = Date.parse(t);
  return ul(r, e) ? r - Date.now() : e;
}, ir = (t, e) => {
  if (!e) throw new Error(`Property \`${t}\` is not resolved for AWS SDK SigV4Auth`);
  return e;
}, sc = async (t) => {
  var _a2, _b2, _c2;
  const e = ir("context", t.context), r = ir("config", t.config), s = (_c2 = (_b2 = (_a2 = e.endpointV2) == null ? void 0 : _a2.properties) == null ? void 0 : _b2.authSchemes) == null ? void 0 : _c2[0], i = await ir("signer", r.signer)(s), o = t == null ? void 0 : t.signingRegion, a = t == null ? void 0 : t.signingRegionSet, c = t == null ? void 0 : t.signingName;
  return { config: r, signer: i, signingRegion: o, signingRegionSet: a, signingName: c };
};
class nc {
  async sign(e, r, s) {
    var _a2;
    if (!ee.isInstance(e)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
    const n = await sc(s), { config: i, signer: o } = n;
    let { signingRegion: a, signingName: c } = n;
    const u = s.context;
    if (((_a2 = u == null ? void 0 : u.authSchemes) == null ? void 0 : _a2.length) ?? false) {
      const [l, h] = u.authSchemes;
      (l == null ? void 0 : l.name) === "sigv4a" && (h == null ? void 0 : h.name) === "sigv4" && (a = (h == null ? void 0 : h.signingRegion) ?? a, c = (h == null ? void 0 : h.signingName) ?? c);
    }
    return await o.sign(e, { signingDate: Jn(i.systemClockOffset), signingRegion: a, signingService: c });
  }
  errorHandler(e) {
    return (r) => {
      const s = r.ServerTime ?? Ji(r.$response);
      if (s) {
        const n = ir("config", e.config), i = n.systemClockOffset;
        n.systemClockOffset = Yi(s, n.systemClockOffset), n.systemClockOffset !== i && r.$metadata && (r.$metadata.clockSkewCorrected = true);
      }
      throw r;
    };
  }
  successHandler(e, r) {
    const s = Ji(e);
    if (s) {
      const n = ir("config", r.config);
      n.systemClockOffset = Yi(s, n.systemClockOffset);
    }
  }
}
class dl extends nc {
  async sign(e, r, s) {
    var _a2;
    if (!ee.isInstance(e)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
    const { config: n, signer: i, signingRegion: o, signingRegionSet: a, signingName: c } = await sc(s), m = (await ((_a2 = n.sigv4aSigningRegionSet) == null ? void 0 : _a2.call(n)) ?? a ?? [o]).join(",");
    return await i.sign(e, { signingDate: Jn(n.systemClockOffset), signingRegion: m, signingService: c });
  }
}
const ft = (t) => t[Tn] || (t[Tn] = {}), Ne = (t) => {
  if (typeof t == "function") return t;
  const e = Promise.resolve(t);
  return () => e;
}, ll = (t, e) => {
  if (!e || e.length === 0) return t;
  const r = [];
  for (const s of e) for (const n of t) n.schemeId.split("#")[1] === s && r.push(n);
  for (const s of t) r.find(({ schemeId: n }) => n === s.schemeId) || r.push(s);
  return r;
};
function fl(t) {
  const e = /* @__PURE__ */ new Map();
  for (const r of t) e.set(r.schemeId, r);
  return e;
}
const hl = (t, e) => (r, s) => async (n) => {
  var _a2;
  const i = t.httpAuthSchemeProvider(await e.httpAuthSchemeParametersProvider(t, s, n.input)), o = t.authSchemePreference ? await t.authSchemePreference() : [], a = ll(i, o), c = fl(t.httpAuthSchemes), u = ft(s), m = [];
  for (const l of a) {
    const h = c.get(l.schemeId);
    if (!h) {
      m.push(`HttpAuthScheme \`${l.schemeId}\` was not enabled for this service.`);
      continue;
    }
    const g = h.identityProvider(await e.identityProviderConfigProvider(t));
    if (!g) {
      m.push(`HttpAuthScheme \`${l.schemeId}\` did not have an IdentityProvider configured.`);
      continue;
    }
    const { identityProperties: x = {}, signingProperties: E = {} } = ((_a2 = l.propertiesExtractor) == null ? void 0 : _a2.call(l, t, s)) || {};
    l.identityProperties = Object.assign(l.identityProperties || {}, x), l.signingProperties = Object.assign(l.signingProperties || {}, E), u.selectedHttpAuthScheme = { httpAuthOption: l, identity: await g(l.identityProperties), signer: h.signer };
    break;
  }
  if (!u.selectedHttpAuthScheme) throw new Error(m.join(`
`));
  return r(n);
}, pl = { step: "serialize", tags: ["HTTP_AUTH_SCHEME"], name: "httpAuthSchemeMiddleware", override: true, relation: "before", toMiddleware: "endpointV2Middleware" }, ml = (t, { httpAuthSchemeParametersProvider: e, identityProviderConfigProvider: r }) => ({ applyToStack: (s) => {
  s.addRelativeTo(hl(t, { httpAuthSchemeParametersProvider: e, identityProviderConfigProvider: r }), pl);
} }), gl = { name: "serializerMiddleware" }, yl = (t) => (e) => {
  throw e;
}, Sl = (t, e) => {
}, xl = (t) => (e, r) => async (s) => {
  if (!ee.isInstance(s.request)) return e(s);
  const i = ft(r).selectedHttpAuthScheme;
  if (!i) throw new Error("No HttpAuthScheme was selected: unable to sign request");
  const { httpAuthOption: { signingProperties: o = {} }, identity: a, signer: c } = i, u = await e({ ...s, request: await c.sign(s.request, a, o) }).catch((c.errorHandler || yl)(o));
  return (c.successHandler || Sl)(u.response, o), u;
}, ic = { step: "finalizeRequest", tags: ["HTTP_SIGNING"], name: "httpSigningMiddleware", aliases: ["apiKeyMiddleware", "tokenMiddleware", "awsAuthMiddleware"], override: true, relation: "after", toMiddleware: "retryMiddleware" }, bl = (t) => ({ applyToStack: (e) => {
  e.addRelativeTo(xl(), ic);
} }), Ht = (t) => {
  if (typeof t == "function") return t;
  const e = Promise.resolve(t);
  return () => e;
}, oc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", eo = Object.entries(oc).reduce((t, [e, r]) => (t[r] = Number(e), t), {}), wl = oc.split(""), zt = 6, or = 8, El = 63, qt = (t) => {
  let e = t.length / 4 * 3;
  t.slice(-2) === "==" ? e -= 2 : t.slice(-1) === "=" && e--;
  const r = new ArrayBuffer(e), s = new DataView(r);
  for (let n = 0; n < t.length; n += 4) {
    let i = 0, o = 0;
    for (let u = n, m = n + 3; u <= m; u++) if (t[u] !== "=") {
      if (!(t[u] in eo)) throw new TypeError(`Invalid character ${t[u]} in base64 string.`);
      i |= eo[t[u]] << (m - u) * zt, o += zt;
    } else i >>= zt;
    const a = n / 4 * 3;
    i >>= o % or;
    const c = Math.floor(o / or);
    for (let u = 0; u < c; u++) {
      const m = (c - u - 1) * or;
      s.setUint8(a + u, (i & 255 << m) >> m);
    }
  }
  return new Uint8Array(r);
}, Qe = (t) => new TextEncoder().encode(t), Gt = (t) => typeof t == "string" ? Qe(t) : ArrayBuffer.isView(t) ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(t), It = (t) => {
  if (typeof t == "string") return t;
  if (typeof t != "object" || typeof t.byteOffset != "number" || typeof t.byteLength != "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
  return new TextDecoder("utf-8").decode(t);
};
function Bt(t) {
  let e;
  typeof t == "string" ? e = Qe(t) : e = t;
  const r = typeof e == "object" && typeof e.length == "number", s = typeof e == "object" && typeof e.byteOffset == "number" && typeof e.byteLength == "number";
  if (!r && !s) throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
  let n = "";
  for (let i = 0; i < e.length; i += 3) {
    let o = 0, a = 0;
    for (let u = i, m = Math.min(i + 3, e.length); u < m; u++) o |= e[u] << (m - u - 1) * or, a += or;
    const c = Math.ceil(a / zt);
    o <<= c * zt - a;
    for (let u = 1; u <= c; u++) {
      const m = (c - u) * zt;
      n += wl[(o & El << m) >> m];
    }
    n += "==".slice(0, 4 - c);
  }
  return n;
}
class Tt extends Uint8Array {
  static fromString(e, r = "utf-8") {
    if (typeof e == "string") return r === "base64" ? Tt.mutate(qt(e)) : Tt.mutate(Qe(e));
    throw new Error(`Unsupported conversion from ${typeof e} to Uint8ArrayBlobAdapter.`);
  }
  static mutate(e) {
    return Object.setPrototypeOf(e, Tt.prototype), e;
  }
  transformToString(e = "utf-8") {
    return e === "base64" ? Bt(this) : It(this);
  }
}
const Cl = typeof ReadableStream == "function" ? ReadableStream : function() {
};
class Al extends Cl {
}
const Bn = (t) => {
  var _a2;
  return typeof ReadableStream == "function" && (((_a2 = t == null ? void 0 : t.constructor) == null ? void 0 : _a2.name) === ReadableStream.name || t instanceof ReadableStream);
}, Rl = ({ expectedChecksum: t, checksum: e, source: r, checksumSourceLocation: s, base64Encoder: n }) => {
  var _a2;
  if (!Bn(r)) throw new Error(`@smithy/util-stream: unsupported source type ${((_a2 = r == null ? void 0 : r.constructor) == null ? void 0 : _a2.name) ?? r} in ChecksumStream.`);
  const i = n ?? Bt;
  if (typeof TransformStream != "function") throw new Error("@smithy/util-stream: unable to instantiate ChecksumStream because API unavailable: ReadableStream/TransformStream.");
  const o = new TransformStream({ start() {
  }, async transform(c, u) {
    e.update(c), u.enqueue(c);
  }, async flush(c) {
    const u = await e.digest(), m = i(u);
    if (t !== m) {
      const l = new Error(`Checksum mismatch: expected "${t}" but received "${m}" in response header "${s}".`);
      c.error(l);
    } else c.terminate();
  } });
  r.pipeThrough(o);
  const a = o.readable;
  return Object.setPrototypeOf(a, Al.prototype), a;
};
class vl {
  constructor(e) {
    __publicField(this, "allocByteArray");
    __publicField(this, "byteLength", 0);
    __publicField(this, "byteArrays", []);
    this.allocByteArray = e;
  }
  push(e) {
    this.byteArrays.push(e), this.byteLength += e.byteLength;
  }
  flush() {
    if (this.byteArrays.length === 1) {
      const s = this.byteArrays[0];
      return this.reset(), s;
    }
    const e = this.allocByteArray(this.byteLength);
    let r = 0;
    for (let s = 0; s < this.byteArrays.length; ++s) {
      const n = this.byteArrays[s];
      e.set(n, r), r += n.byteLength;
    }
    return this.reset(), e;
  }
  reset() {
    this.byteArrays = [], this.byteLength = 0;
  }
}
function kl(t, e, r) {
  const s = t.getReader();
  let n = false, i = 0;
  const o = ["", new vl((u) => new Uint8Array(u))];
  let a = -1;
  const c = async (u) => {
    const { value: m, done: l } = await s.read(), h = m;
    if (l) {
      if (a !== -1) {
        const g = Hs(o, a);
        ar(g) > 0 && u.enqueue(g);
      }
      u.close();
    } else {
      const g = _l(h, false);
      if (a !== g && (a >= 0 && u.enqueue(Hs(o, a)), a = g), a === -1) {
        u.enqueue(h);
        return;
      }
      const x = ar(h);
      i += x;
      const E = ar(o[a]);
      if (x >= e && E === 0) u.enqueue(h);
      else {
        const C = Tl(o, a, h);
        !n && i > e * 2 && (n = true, r == null ? void 0 : r.warn(`@smithy/util-stream - stream chunk size ${x} is below threshold of ${e}, automatically buffering.`)), C >= e ? u.enqueue(Hs(o, a)) : await c(u);
      }
    }
  };
  return new ReadableStream({ pull: c });
}
const Dl = kl;
function Tl(t, e, r) {
  switch (e) {
    case 0:
      return t[0] += r, ar(t[0]);
    case 1:
    case 2:
      return t[e].push(r), ar(t[e]);
  }
}
function Hs(t, e) {
  switch (e) {
    case 0:
      const r = t[0];
      return t[0] = "", r;
    case 1:
    case 2:
      return t[e].flush();
  }
  throw new Error(`@smithy/util-stream - invalid index ${e} given to flush()`);
}
function ar(t) {
  return (t == null ? void 0 : t.byteLength) ?? (t == null ? void 0 : t.length) ?? 0;
}
function _l(t, e = true) {
  return e && typeof Buffer < "u" && t instanceof Buffer ? 2 : t instanceof Uint8Array ? 1 : typeof t == "string" ? 0 : -1;
}
const Bl = (t, e) => {
  const { base64Encoder: r, bodyLengthChecker: s, checksumAlgorithmFn: n, checksumLocationName: i, streamHasher: o } = e, a = r !== void 0 && s !== void 0 && n !== void 0 && i !== void 0 && o !== void 0, c = a ? o(n, t) : void 0, u = t.getReader();
  return new ReadableStream({ async pull(m) {
    const { value: l, done: h } = await u.read();
    if (h) {
      if (m.enqueue(`0\r
`), a) {
        const g = r(await c);
        m.enqueue(`${i}:${g}\r
`), m.enqueue(`\r
`);
      }
      m.close();
    } else m.enqueue(`${(s(l) || 0).toString(16)}\r
${l}\r
`);
  } });
};
async function Il(t, e) {
  let r = 0;
  const s = [], n = t.getReader();
  let i = false;
  for (; !i; ) {
    const { done: c, value: u } = await n.read();
    if (u && (s.push(u), r += (u == null ? void 0 : u.byteLength) ?? 0), r >= e) break;
    i = c;
  }
  n.releaseLock();
  const o = new Uint8Array(Math.min(e, r));
  let a = 0;
  for (const c of s) {
    if (c.byteLength > o.byteLength - a) {
      o.set(c.subarray(0, o.byteLength - a), a);
      break;
    } else o.set(c, a);
    a += c.length;
  }
  return o;
}
const _t = (t) => encodeURIComponent(t).replace(/[!'()*]/g, Ol), Ol = (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`;
function ac(t) {
  const e = [];
  for (let r of Object.keys(t).sort()) {
    const s = t[r];
    if (r = _t(r), Array.isArray(s)) for (let n = 0, i = s.length; n < i; n++) e.push(`${r}=${_t(s[n])}`);
    else {
      let n = r;
      (s || typeof s == "string") && (n += `=${_t(s)}`), e.push(n);
    }
  }
  return e.join("&");
}
function to(t, e) {
  return new Request(t, e);
}
function Ml(t = 0) {
  return new Promise((e, r) => {
    t && setTimeout(() => {
      const s = new Error(`Request did not complete within ${t} ms`);
      s.name = "TimeoutError", r(s);
    }, t);
  });
}
const zs = { supported: void 0 };
class Yn {
  constructor(e) {
    __publicField(this, "config");
    __publicField(this, "configProvider");
    typeof e == "function" ? this.configProvider = e().then((r) => r || {}) : (this.config = e ?? {}, this.configProvider = Promise.resolve(this.config)), zs.supported === void 0 && (zs.supported = typeof Request < "u" && "keepalive" in to("https://[::1]"));
  }
  static create(e) {
    return typeof (e == null ? void 0 : e.handle) == "function" ? e : new Yn(e);
  }
  destroy() {
  }
  async handle(e, { abortSignal: r, requestTimeout: s } = {}) {
    var _a2;
    this.config || (this.config = await this.configProvider);
    const n = s ?? this.config.requestTimeout, i = this.config.keepAlive === true, o = this.config.credentials;
    if (r == null ? void 0 : r.aborted) {
      const R = ro(r);
      return Promise.reject(R);
    }
    let a = e.path;
    const c = ac(e.query || {});
    c && (a += `?${c}`), e.fragment && (a += `#${e.fragment}`);
    let u = "";
    if (e.username != null || e.password != null) {
      const R = e.username ?? "", O = e.password ?? "";
      u = `${R}:${O}@`;
    }
    const { port: m, method: l } = e, h = `${e.protocol}//${u}${e.hostname}${m ? `:${m}` : ""}${a}`, g = l === "GET" || l === "HEAD" ? void 0 : e.body, x = { body: g, headers: new Headers(e.headers), method: l, credentials: o };
    ((_a2 = this.config) == null ? void 0 : _a2.cache) && (x.cache = this.config.cache), g && (x.duplex = "half"), typeof AbortController < "u" && (x.signal = r), zs.supported && (x.keepalive = i), typeof this.config.requestInit == "function" && Object.assign(x, this.config.requestInit(e));
    let E = () => {
    };
    const C = to(h, x), T = [fetch(C).then((R) => {
      const O = R.headers, N = {};
      for (const te of O.entries()) N[te[0]] = te[1];
      return R.body != null ? { response: new ct({ headers: N, reason: R.statusText, statusCode: R.status, body: R.body }) } : R.blob().then((te) => ({ response: new ct({ headers: N, reason: R.statusText, statusCode: R.status, body: te }) }));
    }), Ml(n)];
    return r && T.push(new Promise((R, O) => {
      const N = () => {
        const q = ro(r);
        O(q);
      };
      if (typeof r.addEventListener == "function") {
        const q = r;
        q.addEventListener("abort", N, { once: true }), E = () => q.removeEventListener("abort", N);
      } else r.onabort = N;
    })), Promise.race(T).finally(E);
  }
  updateHttpClientConfig(e, r) {
    this.config = void 0, this.configProvider = this.configProvider.then((s) => (s[e] = r, s));
  }
  httpHandlerConfigs() {
    return this.config ?? {};
  }
}
function ro(t) {
  const e = t && typeof t == "object" && "reason" in t ? t.reason : void 0;
  if (e) {
    if (e instanceof Error) return e;
    const s = new Error(String(e));
    return s.name = "AbortError", s;
  }
  const r = new Error("Request aborted");
  return r.name = "AbortError", r;
}
const cc = async (t) => {
  var _a2;
  return typeof Blob == "function" && t instanceof Blob || ((_a2 = t.constructor) == null ? void 0 : _a2.name) === "Blob" ? Blob.prototype.arrayBuffer !== void 0 ? new Uint8Array(await t.arrayBuffer()) : Pl(t) : Nl(t);
};
async function Pl(t) {
  const e = await $l(t), r = qt(e);
  return new Uint8Array(r);
}
async function Nl(t) {
  const e = [], r = t.getReader();
  let s = false, n = 0;
  for (; !s; ) {
    const { done: a, value: c } = await r.read();
    c && (e.push(c), n += c.length), s = a;
  }
  const i = new Uint8Array(n);
  let o = 0;
  for (const a of e) i.set(a, o), o += a.length;
  return i;
}
function $l(t) {
  return new Promise((e, r) => {
    const s = new FileReader();
    s.onloadend = () => {
      if (s.readyState !== 2) return r(new Error("Reader aborted too early"));
      const n = s.result ?? "", i = n.indexOf(","), o = i > -1 ? i + 1 : n.length;
      e(n.substring(o));
    }, s.onabort = () => r(new Error("Read aborted")), s.onerror = () => r(s.error), s.readAsDataURL(t);
  });
}
const uc = {}, In = {};
for (let t = 0; t < 256; t++) {
  let e = t.toString(16).toLowerCase();
  e.length === 1 && (e = `0${e}`), uc[t] = e, In[e] = t;
}
function dc(t) {
  if (t.length % 2 !== 0) throw new Error("Hex encoded strings must have an even number length");
  const e = new Uint8Array(t.length / 2);
  for (let r = 0; r < t.length; r += 2) {
    const s = t.slice(r, r + 2).toLowerCase();
    if (s in In) e[r / 2] = In[s];
    else throw new Error(`Cannot decode unrecognized sequence ${s} as hexadecimal`);
  }
  return e;
}
function ve(t) {
  let e = "";
  for (let r = 0; r < t.byteLength; r++) e += uc[t[r]];
  return e;
}
const so = "The stream has already been transformed.", lc = (t) => {
  var _a2, _b2;
  if (!no(t) && !Bn(t)) {
    const n = ((_b2 = (_a2 = t == null ? void 0 : t.__proto__) == null ? void 0 : _a2.constructor) == null ? void 0 : _b2.name) || t;
    throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${n}`);
  }
  let e = false;
  const r = async () => {
    if (e) throw new Error(so);
    return e = true, await cc(t);
  }, s = (n) => {
    if (typeof n.stream != "function") throw new Error(`Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.
If you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/p/fetch-streaming-body`);
    return n.stream();
  };
  return Object.assign(t, { transformToByteArray: r, transformToString: async (n) => {
    const i = await r();
    if (n === "base64") return Bt(i);
    if (n === "hex") return ve(i);
    if (n === void 0 || n === "utf8" || n === "utf-8") return It(i);
    if (typeof TextDecoder == "function") return new TextDecoder(n).decode(i);
    throw new Error("TextDecoder is not available, please make sure polyfill is provided.");
  }, transformToWebStream: () => {
    if (e) throw new Error(so);
    if (e = true, no(t)) return s(t);
    if (Bn(t)) return t;
    throw new Error(`Cannot transform payload to web stream, got ${t}`);
  } });
}, no = (t) => typeof Blob == "function" && t instanceof Blob;
async function Ul(t) {
  return typeof t.stream == "function" && (t = t.stream()), t.tee();
}
const _r = async (t = new Uint8Array(), e) => {
  if (t instanceof Uint8Array) return Tt.mutate(t);
  if (!t) return Tt.mutate(new Uint8Array());
  const r = e.streamCollector(t);
  return Tt.mutate(await r);
};
function io(t) {
  return encodeURIComponent(t).replace(/[!'()*]/g, function(e) {
    return "%" + e.charCodeAt(0).toString(16).toUpperCase();
  });
}
const js = (t) => typeof t == "function" ? t() : t, fc = (t, e, r, s, n) => ({ name: e, namespace: t, traits: r, input: s, output: n }), Fl = (t) => (e, r) => async (s) => {
  var _a2, _b2, _c2, _d2;
  const { response: n } = await e(s), { operationSchema: i } = ft(r), [, o, a, c, u, m] = i ?? [];
  try {
    const l = await t.protocol.deserializeResponse(fc(o, a, c, u, m), { ...t, ...r }, n);
    return { response: n, output: l };
  } catch (l) {
    if (Object.defineProperty(l, "$response", { value: n, enumerable: false, writable: false, configurable: false }), !("$metadata" in l)) {
      const h = "Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.";
      try {
        l.message += `
  ` + h;
      } catch {
        !r.logger || ((_b2 = (_a2 = r.logger) == null ? void 0 : _a2.constructor) == null ? void 0 : _b2.name) === "NoOpLogger" ? console.warn(h) : (_d2 = (_c2 = r.logger) == null ? void 0 : _c2.warn) == null ? void 0 : _d2.call(_c2, h);
      }
      typeof l.$responseBodyText < "u" && l.$response && (l.$response.body = l.$responseBodyText);
      try {
        if (ct.isInstance(n)) {
          const { headers: g = {} } = n, x = Object.entries(g);
          l.$metadata = { httpStatusCode: n.statusCode, requestId: Vs(/^x-[\w-]+-request-?id$/, x), extendedRequestId: Vs(/^x-[\w-]+-id-2$/, x), cfId: Vs(/^x-[\w-]+-cf-id$/, x) };
        }
      } catch {
      }
    }
    throw l;
  }
}, Vs = (t, e) => (e.find(([r]) => r.match(t)) || [void 0, void 0])[1], Ll = (t) => (e, r) => async (s) => {
  var _a2;
  const { operationSchema: n } = ft(r), [, i, o, a, c, u] = n ?? [], m = ((_a2 = r.endpointV2) == null ? void 0 : _a2.url) && t.urlParser ? async () => t.urlParser(r.endpointV2.url) : t.endpoint, l = await t.protocol.serializeRequest(fc(i, o, a, c, u), s.input, { ...t, ...r, endpoint: m });
  return e({ ...s, request: l });
}, Hl = { name: "deserializerMiddleware", step: "deserialize", tags: ["DESERIALIZER"], override: true }, zl = { name: "serializerMiddleware", step: "serialize", tags: ["SERIALIZER"], override: true };
function jl(t) {
  return { applyToStack: (e) => {
    e.add(Ll(t), zl), e.add(Fl(t), Hl), t.protocol.setSerdeContext(t);
  } };
}
function Ft(t) {
  if (typeof t == "object") return t;
  t = t | 0;
  const e = {};
  let r = 0;
  for (const s of ["httpLabel", "idempotent", "idempotencyToken", "sensitive", "httpPayload", "httpResponseCode", "httpQueryParams"]) (t >> r++ & 1) === 1 && (e[s] = 1);
  return e;
}
const oo = { it: /* @__PURE__ */ Symbol.for("@smithy/nor-struct-it") };
const _X = class _X {
  constructor(e, r) {
    __publicField(this, "ref");
    __publicField(this, "memberName");
    __publicField(this, "symbol", _X.symbol);
    __publicField(this, "name");
    __publicField(this, "schema");
    __publicField(this, "_isMemberSchema");
    __publicField(this, "traits");
    __publicField(this, "memberTraits");
    __publicField(this, "normalizedTraits");
    this.ref = e, this.memberName = r;
    const s = [];
    let n = e, i = e;
    for (this._isMemberSchema = false; qs(n); ) s.push(n[1]), n = n[0], i = js(n), this._isMemberSchema = true;
    if (s.length > 0) {
      this.memberTraits = {};
      for (let o = s.length - 1; o >= 0; --o) {
        const a = s[o];
        Object.assign(this.memberTraits, Ft(a));
      }
    } else this.memberTraits = 0;
    if (i instanceof _X) {
      const o = this.memberTraits;
      Object.assign(this, i), this.memberTraits = Object.assign({}, o, i.getMemberTraits(), this.getMemberTraits()), this.normalizedTraits = void 0, this.memberName = r ?? i.memberName;
      return;
    }
    if (this.schema = js(i), Vl(this.schema) ? (this.name = `${this.schema[1]}#${this.schema[2]}`, this.traits = this.schema[3]) : (this.name = this.memberName ?? String(i), this.traits = 0), this._isMemberSchema && !r) throw new Error(`@smithy/core/schema - NormalizedSchema member init ${this.getName(true)} missing member name.`);
  }
  static [Symbol.hasInstance](e) {
    const r = this.prototype.isPrototypeOf(e);
    return !r && typeof e == "object" && e !== null ? e.symbol === this.symbol : r;
  }
  static of(e) {
    const r = js(e);
    if (r instanceof _X) return r;
    if (qs(r)) {
      const [s, n] = r;
      if (s instanceof _X) return Object.assign(s.getMergedTraits(), Ft(n)), s;
      throw new Error(`@smithy/core/schema - may not init unwrapped member schema=${JSON.stringify(e, null, 2)}.`);
    }
    return new _X(r);
  }
  getSchema() {
    const e = this.schema;
    return Array.isArray(e) && e[0] === 0 ? e[4] : e;
  }
  getName(e = false) {
    const { name: r } = this;
    return !e && r && r.includes("#") ? r.split("#")[1] : r || void 0;
  }
  getMemberName() {
    return this.memberName;
  }
  isMemberSchema() {
    return this._isMemberSchema;
  }
  isListSchema() {
    const e = this.getSchema();
    return typeof e == "number" ? e >= 64 && e < 128 : e[0] === 1;
  }
  isMapSchema() {
    const e = this.getSchema();
    return typeof e == "number" ? e >= 128 && e <= 255 : e[0] === 2;
  }
  isStructSchema() {
    const e = this.getSchema();
    if (typeof e != "object") return false;
    const r = e[0];
    return r === 3 || r === -3 || r === 4;
  }
  isUnionSchema() {
    const e = this.getSchema();
    return typeof e != "object" ? false : e[0] === 4;
  }
  isBlobSchema() {
    const e = this.getSchema();
    return e === 21 || e === 42;
  }
  isTimestampSchema() {
    const e = this.getSchema();
    return typeof e == "number" && e >= 4 && e <= 7;
  }
  isUnitSchema() {
    return this.getSchema() === "unit";
  }
  isDocumentSchema() {
    return this.getSchema() === 15;
  }
  isStringSchema() {
    return this.getSchema() === 0;
  }
  isBooleanSchema() {
    return this.getSchema() === 2;
  }
  isNumericSchema() {
    return this.getSchema() === 1;
  }
  isBigIntegerSchema() {
    return this.getSchema() === 17;
  }
  isBigDecimalSchema() {
    return this.getSchema() === 19;
  }
  isStreaming() {
    const { streaming: e } = this.getMergedTraits();
    return !!e || this.getSchema() === 42;
  }
  isIdempotencyToken() {
    return !!this.getMergedTraits().idempotencyToken;
  }
  getMergedTraits() {
    return this.normalizedTraits ?? (this.normalizedTraits = { ...this.getOwnTraits(), ...this.getMemberTraits() });
  }
  getMemberTraits() {
    return Ft(this.memberTraits);
  }
  getOwnTraits() {
    return Ft(this.traits);
  }
  getKeySchema() {
    const [e, r] = [this.isDocumentSchema(), this.isMapSchema()];
    if (!e && !r) throw new Error(`@smithy/core/schema - cannot get key for non-map: ${this.getName(true)}`);
    const s = this.getSchema(), n = e ? 15 : s[4] ?? 0;
    return tr([n, 0], "key");
  }
  getValueSchema() {
    const e = this.getSchema(), [r, s, n] = [this.isDocumentSchema(), this.isMapSchema(), this.isListSchema()], i = typeof e == "number" ? 63 & e : e && typeof e == "object" && (s || n) ? e[3 + e[0]] : r ? 15 : void 0;
    if (i != null) return tr([i, 0], s ? "value" : "member");
    throw new Error(`@smithy/core/schema - ${this.getName(true)} has no value member.`);
  }
  getMemberSchema(e) {
    const r = this.getSchema();
    if (this.isStructSchema() && r[4].includes(e)) {
      const s = r[4].indexOf(e), n = r[5][s];
      return tr(qs(n) ? n : [n, 0], e);
    }
    if (this.isDocumentSchema()) return tr([15, 0], e);
    throw new Error(`@smithy/core/schema - ${this.getName(true)} has no no member=${e}.`);
  }
  getMemberSchemas() {
    const e = {};
    try {
      for (const [r, s] of this.structIterator()) e[r] = s;
    } catch {
    }
    return e;
  }
  getEventStreamMember() {
    if (this.isStructSchema()) {
      for (const [e, r] of this.structIterator()) if (r.isStreaming() && r.isStructSchema()) return e;
    }
    return "";
  }
  *structIterator() {
    if (this.isUnitSchema()) return;
    if (!this.isStructSchema()) throw new Error("@smithy/core/schema - cannot iterate non-struct schema.");
    const e = this.getSchema(), r = e[4].length;
    let s = e[oo.it];
    if (s && r === s.length) {
      yield* s;
      return;
    }
    s = Array(r);
    for (let n = 0; n < r; ++n) {
      const i = e[4][n], o = tr([e[5][n], 0], i);
      yield s[n] = [i, o];
    }
    e[oo.it] = s;
  }
};
__publicField(_X, "symbol", /* @__PURE__ */ Symbol.for("@smithy/nor"));
let X = _X;
function tr(t, e) {
  if (t instanceof X) return Object.assign(t, { memberName: e, _isMemberSchema: true });
  const r = X;
  return new r(t, e);
}
const qs = (t) => Array.isArray(t) && t.length === 2, Vl = (t) => Array.isArray(t) && t.length >= 5;
const _Re = class _Re {
  constructor(e, r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map()) {
    __publicField(this, "namespace");
    __publicField(this, "schemas");
    __publicField(this, "exceptions");
    this.namespace = e, this.schemas = r, this.exceptions = s;
  }
  static for(e) {
    return _Re.registries.has(e) || _Re.registries.set(e, new _Re(e)), _Re.registries.get(e);
  }
  copyFrom(e) {
    const { schemas: r, exceptions: s } = this;
    for (const [n, i] of e.schemas) r.has(n) || r.set(n, i);
    for (const [n, i] of e.exceptions) s.has(n) || s.set(n, i);
  }
  register(e, r) {
    const s = this.normalizeShapeId(e);
    for (const n of [this, _Re.for(s.split("#")[0])]) n.schemas.set(s, r);
  }
  getSchema(e) {
    const r = this.normalizeShapeId(e);
    if (!this.schemas.has(r)) throw new Error(`@smithy/core/schema - schema not found for ${r}`);
    return this.schemas.get(r);
  }
  registerError(e, r) {
    const s = e, n = s[1];
    for (const i of [this, _Re.for(n)]) i.schemas.set(n + "#" + s[2], s), i.exceptions.set(s, r);
  }
  getErrorCtor(e) {
    const r = e;
    return this.exceptions.has(r) ? this.exceptions.get(r) : _Re.for(r[1]).exceptions.get(r);
  }
  getBaseException() {
    for (const e of this.exceptions.keys()) if (Array.isArray(e)) {
      const [, r, s] = e, n = r + "#" + s;
      if (n.startsWith("smithy.ts.sdk.synthetic.") && n.endsWith("ServiceException")) return e;
    }
  }
  find(e) {
    return [...this.schemas.values()].find(e);
  }
  clear() {
    this.schemas.clear(), this.exceptions.clear();
  }
  normalizeShapeId(e) {
    return e.includes("#") ? e : this.namespace + "#" + e;
  }
};
__publicField(_Re, "registries", /* @__PURE__ */ new Map());
let Re = _Re;
const ql = (t) => {
  if (t != null) {
    if (typeof t == "string") {
      const e = parseFloat(t);
      if (!Number.isNaN(e)) return String(e) !== String(t) && Yl.warn(Jl(`Expected number but observed string: ${t}`)), e;
    }
    if (typeof t == "number") return t;
    throw new TypeError(`Expected number, got ${typeof t}: ${t}`);
  }
}, Gl = Math.ceil(2 ** 127 * (2 - 2 ** -23)), ao = (t) => {
  const e = ql(t);
  if (e !== void 0 && !Number.isNaN(e) && e !== 1 / 0 && e !== -1 / 0 && Math.abs(e) > Gl) throw new TypeError(`Expected 32-bit float, got ${t}`);
  return e;
}, Wl = (t) => {
  if (t != null) {
    if (Number.isInteger(t) && !Number.isNaN(t)) return t;
    throw new TypeError(`Expected integer, got ${typeof t}: ${t}`);
  }
}, co = (t) => hc(t, 16), uo = (t) => hc(t, 8), hc = (t, e) => {
  const r = Wl(t);
  if (r !== void 0 && Kl(r, e) !== r) throw new TypeError(`Expected ${e}-bit integer, got ${t}`);
  return r;
}, Kl = (t, e) => {
  switch (e) {
    case 32:
      return Int32Array.of(t)[0];
    case 16:
      return Int16Array.of(t)[0];
    case 8:
      return Int8Array.of(t)[0];
  }
}, Xl = (t) => ao(typeof t == "string" ? ei(t) : t), Zl = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g, ei = (t) => {
  const e = t.match(Zl);
  if (e === null || e[0].length !== t.length) throw new TypeError("Expected real number, got implicit NaN");
  return parseFloat(t);
}, On = (t) => co(typeof t == "string" ? ei(t) : t), Ql = (t) => uo(typeof t == "string" ? ei(t) : t), Jl = (t) => String(new TypeError(t).stack || t).split(`
`).slice(0, 5).filter((e) => !e.includes("stackTraceWarning")).join(`
`), Yl = { warn: console.warn }, ef = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ti = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function Mn(t) {
  const e = t.getUTCFullYear(), r = t.getUTCMonth(), s = t.getUTCDay(), n = t.getUTCDate(), i = t.getUTCHours(), o = t.getUTCMinutes(), a = t.getUTCSeconds(), c = n < 10 ? `0${n}` : `${n}`, u = i < 10 ? `0${i}` : `${i}`, m = o < 10 ? `0${o}` : `${o}`, l = a < 10 ? `0${a}` : `${a}`;
  return `${ef[s]}, ${c} ${ti[r]} ${e} ${u}:${m}:${l} GMT`;
}
const tf = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/), rf = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/), sf = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/), nf = (t) => {
  if (t == null) return;
  if (typeof t != "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
  let e = tf.exec(t);
  if (e) {
    const [r, s, n, i, o, a, c, u] = e;
    return Gs(On(Fr(i)), Ws(n), jt(s, "day", 1, 31), { hours: o, minutes: a, seconds: c, fractionalMilliseconds: u });
  }
  if (e = rf.exec(t), e) {
    const [r, s, n, i, o, a, c, u] = e;
    return cf(Gs(of(i), Ws(n), jt(s, "day", 1, 31), { hours: o, minutes: a, seconds: c, fractionalMilliseconds: u }));
  }
  if (e = sf.exec(t), e) {
    const [r, s, n, i, o, a, c, u] = e;
    return Gs(On(Fr(u)), Ws(s), jt(n.trimLeft(), "day", 1, 31), { hours: i, minutes: o, seconds: a, fractionalMilliseconds: c });
  }
  throw new TypeError("Invalid RFC-7231 date-time value");
}, Gs = (t, e, r, s) => {
  const n = e - 1;
  return df(t, n, r), new Date(Date.UTC(t, n, r, jt(s.hours, "hour", 0, 23), jt(s.minutes, "minute", 0, 59), jt(s.seconds, "seconds", 0, 60), ff(s.fractionalMilliseconds)));
}, of = (t) => {
  const e = (/* @__PURE__ */ new Date()).getUTCFullYear(), r = Math.floor(e / 100) * 100 + On(Fr(t));
  return r < e ? r + 100 : r;
}, af = 50 * 365 * 24 * 60 * 60 * 1e3, cf = (t) => t.getTime() - (/* @__PURE__ */ new Date()).getTime() > af ? new Date(Date.UTC(t.getUTCFullYear() - 100, t.getUTCMonth(), t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.getUTCMilliseconds())) : t, Ws = (t) => {
  const e = ti.indexOf(t);
  if (e < 0) throw new TypeError(`Invalid month: ${t}`);
  return e + 1;
}, uf = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], df = (t, e, r) => {
  let s = uf[e];
  if (e === 1 && lf(t) && (s = 29), r > s) throw new TypeError(`Invalid day for ${ti[e]} in ${t}: ${r}`);
}, lf = (t) => t % 4 === 0 && (t % 100 !== 0 || t % 400 === 0), jt = (t, e, r, s) => {
  const n = Ql(Fr(t));
  if (n < r || n > s) throw new TypeError(`${e} must be between ${r} and ${s}, inclusive`);
  return n;
}, ff = (t) => t == null ? 0 : Xl("0." + t) * 1e3, Fr = (t) => {
  let e = 0;
  for (; e < t.length - 1 && t.charAt(e) === "0"; ) e++;
  return e === 0 ? t : t.slice(e);
}, lo = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), pe = Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0")), ri = () => {
  if (lo) return lo();
  const t = new Uint8Array(16);
  return crypto.getRandomValues(t), t[6] = t[6] & 15 | 64, t[8] = t[8] & 63 | 128, pe[t[0]] + pe[t[1]] + pe[t[2]] + pe[t[3]] + "-" + pe[t[4]] + pe[t[5]] + "-" + pe[t[6]] + pe[t[7]] + "-" + pe[t[8]] + pe[t[9]] + "-" + pe[t[10]] + pe[t[11]] + pe[t[12]] + pe[t[13]] + pe[t[14]] + pe[t[15]];
}, ot = function(e) {
  return Object.assign(new String(e), { deserializeJSON() {
    return JSON.parse(String(e));
  }, toString() {
    return String(e);
  }, toJSON() {
    return String(e);
  } });
};
ot.from = (t) => t && typeof t == "object" && (t instanceof ot || "deserializeJSON" in t) ? t : typeof t == "string" || Object.getPrototypeOf(t) === String.prototype ? ot(String(t)) : ot(JSON.stringify(t));
ot.fromObject = ot.from;
function hf(t) {
  return (t.includes(",") || t.includes('"')) && (t = `"${t.replace(/"/g, '\\"')}"`), t;
}
const si = "(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?:[ne|u?r]?s?day)?", ni = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)", ii = "(\\d?\\d):(\\d{2}):(\\d{2})(?:\\.(\\d+))?", pc = "(\\d?\\d)", mc = "(\\d{4})", pf = new RegExp(/^(\d{4})-(\d\d)-(\d\d)[tT](\d\d):(\d\d):(\d\d)(\.(\d+))?(([-+]\d\d:\d\d)|[zZ])$/), mf = new RegExp(`^${si}, ${pc} ${ni} ${mc} ${ii} GMT$`), gf = new RegExp(`^${si}, ${pc}-${ni}-(\\d\\d) ${ii} GMT$`), yf = new RegExp(`^${si} ${ni} ( [1-9]|\\d\\d) ${ii} ${mc}$`), Sf = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], xf = (t) => {
  if (t == null) return;
  let e = NaN;
  if (typeof t == "number") e = t;
  else if (typeof t == "string") {
    if (!/^-?\d*\.?\d+$/.test(t)) throw new TypeError("parseEpochTimestamp - numeric string invalid.");
    e = Number.parseFloat(t);
  } else typeof t == "object" && t.tag === 1 && (e = t.value);
  if (isNaN(e) || Math.abs(e) === 1 / 0) throw new TypeError("Epoch timestamps must be valid finite numbers.");
  return new Date(Math.round(e * 1e3));
}, bf = (t) => {
  if (t == null) return;
  if (typeof t != "string") throw new TypeError("RFC3339 timestamps must be strings");
  const e = pf.exec(t);
  if (!e) throw new TypeError(`Invalid RFC3339 timestamp format ${t}`);
  const [, r, s, n, i, o, a, , c, u] = e;
  Xe(s, 1, 12), Xe(n, 1, 31), Xe(i, 0, 23), Xe(o, 0, 59), Xe(a, 0, 60);
  const m = new Date(Date.UTC(Number(r), Number(s) - 1, Number(n), Number(i), Number(o), Number(a), Number(c) ? Math.round(parseFloat(`0.${c}`) * 1e3) : 0));
  if (m.setUTCFullYear(Number(r)), u.toUpperCase() != "Z") {
    const [, l, h, g] = /([+-])(\d\d):(\d\d)/.exec(u) || [void 0, "+", 0, 0], x = l === "-" ? 1 : -1;
    m.setTime(m.getTime() + x * (Number(h) * 60 * 60 * 1e3 + Number(g) * 60 * 1e3));
  }
  return m;
}, wf = (t) => {
  if (t == null) return;
  if (typeof t != "string") throw new TypeError("RFC7231 timestamps must be strings.");
  let e, r, s, n, i, o, a, c;
  if ((c = mf.exec(t)) ? [, e, r, s, n, i, o, a] = c : (c = gf.exec(t)) ? ([, e, r, s, n, i, o, a] = c, s = (Number(s) + 1900).toString()) : (c = yf.exec(t)) && ([, r, e, n, i, o, a, s] = c), s && o) {
    const u = Date.UTC(Number(s), Sf.indexOf(r), Number(e), Number(n), Number(i), Number(o), a ? Math.round(parseFloat(`0.${a}`) * 1e3) : 0);
    Xe(e, 1, 31), Xe(n, 0, 23), Xe(i, 0, 59), Xe(o, 0, 60);
    const m = new Date(u);
    return m.setUTCFullYear(Number(s)), m;
  }
  throw new TypeError(`Invalid RFC7231 date-time value ${t}.`);
};
function Xe(t, e, r) {
  const s = Number(t);
  if (s < e || s > r) throw new Error(`Value ${s} out of range [${e}, ${r}]`);
}
function Ef(t, e, r) {
  if (!Number.isInteger(r)) throw new Error("Invalid number of delimiters (" + r + ") for splitEvery.");
  const s = t.split(e), n = [];
  let i = "";
  for (let o = 0; o < s.length; o++) i === "" ? i = s[o] : i += e + s[o], (o + 1) % r === 0 && (n.push(i), i = "");
  return i !== "" && n.push(i), n;
}
const gc = (t) => {
  const e = t.length, r = [];
  let s = false, n, i = 0;
  for (let o = 0; o < e; ++o) {
    const a = t[o];
    switch (a) {
      case '"':
        n !== "\\" && (s = !s);
        break;
      case ",":
        s || (r.push(t.slice(i, o)), i = o + 1);
        break;
    }
    n = a;
  }
  return r.push(t.slice(i)), r.map((o) => {
    o = o.trim();
    const a = o.length;
    return a < 2 ? o : (o[0] === '"' && o[a - 1] === '"' && (o = o.slice(1, a - 1)), o.replace(/\\"/g, '"'));
  });
}, fo = /^-?\d*(\.\d+)?$/;
class Qr {
  constructor(e, r) {
    __publicField(this, "string");
    __publicField(this, "type");
    if (this.string = e, this.type = r, !fo.test(e)) throw new Error('@smithy/core/serde - NumericValue must only contain [0-9], at most one decimal point ".", and an optional negation prefix "-".');
  }
  toString() {
    return this.string;
  }
  static [Symbol.hasInstance](e) {
    if (!e || typeof e != "object") return false;
    const r = e;
    return Qr.prototype.isPrototypeOf(e) || r.type === "bigDecimal" && fo.test(r.string);
  }
}
class Jr {
  constructor() {
    __publicField(this, "serdeContext");
  }
  setSerdeContext(e) {
    this.serdeContext = e;
  }
}
class Cf extends Jr {
  constructor(e) {
    super();
    __publicField(this, "options");
    __publicField(this, "compositeErrorRegistry");
    this.options = e, this.compositeErrorRegistry = Re.for(e.defaultNamespace);
    for (const r of e.errorTypeRegistries ?? []) this.compositeErrorRegistry.copyFrom(r);
  }
  getRequestType() {
    return ee;
  }
  getResponseType() {
    return ct;
  }
  setSerdeContext(e) {
    this.serdeContext = e, this.serializer.setSerdeContext(e), this.deserializer.setSerdeContext(e), this.getPayloadCodec() && this.getPayloadCodec().setSerdeContext(e);
  }
  updateServiceEndpoint(e, r) {
    if ("url" in r) {
      e.protocol = r.url.protocol, e.hostname = r.url.hostname, e.port = r.url.port ? Number(r.url.port) : void 0, e.path = r.url.pathname, e.fragment = r.url.hash || void 0, e.username = r.url.username || void 0, e.password = r.url.password || void 0, e.query || (e.query = {});
      for (const [s, n] of r.url.searchParams.entries()) e.query[s] = n;
      return e;
    } else return e.protocol = r.protocol, e.hostname = r.hostname, e.port = r.port ? Number(r.port) : void 0, e.path = r.path, e.query = { ...r.query }, e;
  }
  setHostPrefix(e, r, s) {
    var _a2, _b2;
    if ((_a2 = this.serdeContext) == null ? void 0 : _a2.disableHostPrefix) return;
    const n = X.of(r.input), i = Ft(r.traits ?? {});
    if (i.endpoint) {
      let o = (_b2 = i.endpoint) == null ? void 0 : _b2[0];
      if (typeof o == "string") {
        const a = [...n.structIterator()].filter(([, c]) => c.getMergedTraits().hostLabel);
        for (const [c] of a) {
          const u = s[c];
          if (typeof u != "string") throw new Error(`@smithy/core/schema - ${c} in input must be a string as hostLabel.`);
          o = o.replace(`{${c}}`, u);
        }
        e.hostname = o + e.hostname;
      }
    }
  }
  deserializeMetadata(e) {
    return { httpStatusCode: e.statusCode, requestId: e.headers["x-amzn-requestid"] ?? e.headers["x-amzn-request-id"] ?? e.headers["x-amz-request-id"], extendedRequestId: e.headers["x-amz-id-2"], cfId: e.headers["x-amz-cf-id"] };
  }
  async serializeEventStream({ eventStream: e, requestSchema: r, initialRequest: s }) {
    return (await this.loadEventStreamCapability()).serializeEventStream({ eventStream: e, requestSchema: r, initialRequest: s });
  }
  async deserializeEventStream({ response: e, responseSchema: r, initialResponseContainer: s }) {
    return (await this.loadEventStreamCapability()).deserializeEventStream({ response: e, responseSchema: r, initialResponseContainer: s });
  }
  async loadEventStreamCapability() {
    const { EventStreamSerde: e } = await Yd(async () => {
      const { EventStreamSerde: r } = await Promise.resolve().then(() => Hb);
      return { EventStreamSerde: r };
    }, void 0);
    return new e({ marshaller: this.getEventStreamMarshaller(), serializer: this.serializer, deserializer: this.deserializer, serdeContext: this.serdeContext, defaultContentType: this.getDefaultContentType() });
  }
  getDefaultContentType() {
    throw new Error(`@smithy/core/protocols - ${this.constructor.name} getDefaultContentType() implementation missing.`);
  }
  async deserializeHttpMessage(e, r, s, n, i) {
    return [];
  }
  getEventStreamMarshaller() {
    const e = this.serdeContext;
    if (!e.eventStreamMarshaller) throw new Error("@smithy/core - HttpProtocol: eventStreamMarshaller missing in serdeContext.");
    return e.eventStreamMarshaller;
  }
}
class Af extends Cf {
  async serializeRequest(e, r, s) {
    const n = { ...r ?? {} }, i = this.serializer, o = {}, a = {}, c = await s.endpoint(), u = X.of(e == null ? void 0 : e.input), m = [], l = [];
    let h = false, g;
    const x = new ee({ protocol: "", hostname: "", port: void 0, path: "", fragment: void 0, query: o, headers: a, body: void 0 });
    if (c) {
      this.updateServiceEndpoint(x, c), this.setHostPrefix(x, e, n);
      const E = Ft(e.traits);
      if (E.http) {
        x.method = E.http[0];
        const [C, T] = E.http[1].split("?");
        x.path == "/" ? x.path = C : x.path += C;
        const R = new URLSearchParams(T ?? "");
        Object.assign(o, Object.fromEntries(R));
      }
    }
    for (const [E, C] of u.structIterator()) {
      const T = C.getMergedTraits() ?? {}, R = n[E];
      if (R == null && !C.isIdempotencyToken()) {
        if (T.httpLabel && (x.path.includes(`{${E}+}`) || x.path.includes(`{${E}}`))) throw new Error(`No value provided for input HTTP label: ${E}.`);
        continue;
      }
      if (T.httpPayload) C.isStreaming() ? C.isStructSchema() ? n[E] && (g = await this.serializeEventStream({ eventStream: n[E], requestSchema: u })) : g = R : (i.write(C, R), g = i.flush()), delete n[E];
      else if (T.httpLabel) {
        i.write(C, R);
        const O = i.flush();
        x.path.includes(`{${E}+}`) ? x.path = x.path.replace(`{${E}+}`, O.split("/").map(io).join("/")) : x.path.includes(`{${E}}`) && (x.path = x.path.replace(`{${E}}`, io(O))), delete n[E];
      } else if (T.httpHeader) i.write(C, R), a[T.httpHeader.toLowerCase()] = String(i.flush()), delete n[E];
      else if (typeof T.httpPrefixHeaders == "string") {
        for (const [O, N] of Object.entries(R)) {
          const q = T.httpPrefixHeaders + O;
          i.write([C.getValueSchema(), { httpHeader: q }], N), a[q.toLowerCase()] = i.flush();
        }
        delete n[E];
      } else T.httpQuery || T.httpQueryParams ? (this.serializeQuery(C, R, o), delete n[E]) : (h = true, m.push(E), l.push(C));
    }
    if (h && n) {
      const [E, C] = (u.getName(true) ?? "#Unknown").split("#"), T = u.getSchema()[6], R = [3, E, C, u.getMergedTraits(), m, l, void 0];
      T ? R[6] = T : R.pop(), i.write(R, n), g = i.flush();
    }
    return x.headers = a, x.query = o, x.body = g, x;
  }
  serializeQuery(e, r, s) {
    const n = this.serializer, i = e.getMergedTraits();
    if (i.httpQueryParams) {
      for (const [o, a] of Object.entries(r)) if (!(o in s)) {
        const c = e.getValueSchema();
        Object.assign(c.getMergedTraits(), { ...i, httpQuery: o, httpQueryParams: void 0 }), this.serializeQuery(c, a, s);
      }
      return;
    }
    if (e.isListSchema()) {
      const o = !!e.getMergedTraits().sparse, a = [];
      for (const c of r) {
        n.write([e.getValueSchema(), i], c);
        const u = n.flush();
        (o || u !== void 0) && a.push(u);
      }
      s[i.httpQuery] = a;
    } else n.write([e, i], r), s[i.httpQuery] = n.flush();
  }
  async deserializeResponse(e, r, s) {
    const n = this.deserializer, i = X.of(e.output), o = {};
    if (s.statusCode >= 300) {
      const c = await _r(s.body, r);
      throw c.byteLength > 0 && Object.assign(o, await n.read(15, c)), await this.handleError(e, r, s, o, this.deserializeMetadata(s)), new Error("@smithy/core/protocols - HTTP Protocol error handler failed to throw.");
    }
    for (const c in s.headers) {
      const u = s.headers[c];
      delete s.headers[c], s.headers[c.toLowerCase()] = u;
    }
    const a = await this.deserializeHttpMessage(i, r, s, o);
    if (a.length) {
      const c = await _r(s.body, r);
      if (c.byteLength > 0) {
        const u = await n.read(i, c);
        for (const m of a) u[m] != null && (o[m] = u[m]);
      }
    } else a.discardResponseBody && await _r(s.body, r);
    return o.$metadata = this.deserializeMetadata(s), o;
  }
  async deserializeHttpMessage(e, r, s, n, i) {
    let o;
    n instanceof Set ? o = i : o = n;
    let a = true;
    const c = this.deserializer, u = X.of(e), m = [];
    for (const [l, h] of u.structIterator()) {
      const g = h.getMemberTraits();
      if (g.httpPayload) {
        if (a = false, h.isStreaming()) h.isStructSchema() ? o[l] = await this.deserializeEventStream({ response: s, responseSchema: u }) : o[l] = lc(s.body);
        else if (s.body) {
          const E = await _r(s.body, r);
          E.byteLength > 0 && (o[l] = await c.read(h, E));
        }
      } else if (g.httpHeader) {
        const x = String(g.httpHeader).toLowerCase(), E = s.headers[x];
        if (E != null) if (h.isListSchema()) {
          const C = h.getValueSchema();
          C.getMergedTraits().httpHeader = x;
          let T;
          C.isTimestampSchema() && C.getSchema() === 4 ? T = Ef(E, ",", 2) : T = gc(E);
          const R = [];
          for (const O of T) R.push(await c.read(C, O.trim()));
          o[l] = R;
        } else o[l] = await c.read(h, E);
      } else if (g.httpPrefixHeaders !== void 0) {
        o[l] = {};
        for (const [x, E] of Object.entries(s.headers)) if (x.startsWith(g.httpPrefixHeaders)) {
          const C = h.getValueSchema();
          C.getMergedTraits().httpHeader = x, o[l][x.slice(g.httpPrefixHeaders.length)] = await c.read(C, E);
        }
      } else g.httpResponseCode ? o[l] = s.statusCode : m.push(l);
    }
    return m.discardResponseBody = a, m;
  }
}
function oi(t, e) {
  if (e.timestampFormat.useTrait && t.isTimestampSchema() && (t.getSchema() === 5 || t.getSchema() === 6 || t.getSchema() === 7)) return t.getSchema();
  const { httpLabel: r, httpPrefixHeaders: s, httpHeader: n, httpQuery: i } = t.getMergedTraits();
  return (e.httpBindings ? typeof s == "string" || n ? 6 : i || r ? 5 : void 0 : void 0) ?? e.timestampFormat.default;
}
class yc extends Jr {
  constructor(e) {
    super();
    __publicField(this, "settings");
    this.settings = e;
  }
  read(e, r) {
    var _a2;
    const s = X.of(e);
    if (s.isListSchema()) return gc(r).map((n) => this.read(s.getValueSchema(), n));
    if (s.isBlobSchema()) return (((_a2 = this.serdeContext) == null ? void 0 : _a2.base64Decoder) ?? qt)(r);
    if (s.isTimestampSchema()) switch (oi(s, this.settings)) {
      case 5:
        return bf(r);
      case 6:
        return wf(r);
      case 7:
        return xf(r);
      default:
        return console.warn("Missing timestamp format, parsing value with Date constructor:", r), new Date(r);
    }
    if (s.isStringSchema()) {
      const n = s.getMergedTraits().mediaType;
      let i = r;
      if (n) return s.getMergedTraits().httpHeader && (i = this.base64ToUtf8(i)), (n === "application/json" || n.endsWith("+json")) && (i = ot.from(i)), i;
    }
    return s.isNumericSchema() ? Number(r) : s.isBigIntegerSchema() ? BigInt(r) : s.isBigDecimalSchema() ? new Qr(r, "bigDecimal") : s.isBooleanSchema() ? String(r).toLowerCase() === "true" : r;
  }
  base64ToUtf8(e) {
    var _a2, _b2;
    return (((_a2 = this.serdeContext) == null ? void 0 : _a2.utf8Encoder) ?? It)((((_b2 = this.serdeContext) == null ? void 0 : _b2.base64Decoder) ?? qt)(e));
  }
}
class Rf extends Jr {
  constructor(e, r) {
    super();
    __publicField(this, "codecDeserializer");
    __publicField(this, "stringDeserializer");
    this.codecDeserializer = e, this.stringDeserializer = new yc(r);
  }
  setSerdeContext(e) {
    this.stringDeserializer.setSerdeContext(e), this.codecDeserializer.setSerdeContext(e), this.serdeContext = e;
  }
  read(e, r) {
    var _a2, _b2;
    const s = X.of(e), n = s.getMergedTraits(), i = ((_a2 = this.serdeContext) == null ? void 0 : _a2.utf8Encoder) ?? It;
    if (n.httpHeader || n.httpResponseCode) return this.stringDeserializer.read(s, i(r));
    if (n.httpPayload) {
      if (s.isBlobSchema()) {
        const o = ((_b2 = this.serdeContext) == null ? void 0 : _b2.utf8Decoder) ?? Qe;
        return typeof r == "string" ? o(r) : r;
      } else if (s.isStringSchema()) return "byteLength" in r ? i(r) : r;
    }
    return this.codecDeserializer.read(s, r);
  }
}
class vf extends Jr {
  constructor(e) {
    super();
    __publicField(this, "settings");
    __publicField(this, "stringBuffer", "");
    this.settings = e;
  }
  write(e, r) {
    var _a2, _b2;
    const s = X.of(e);
    switch (typeof r) {
      case "object":
        if (r === null) {
          this.stringBuffer = "null";
          return;
        }
        if (s.isTimestampSchema()) {
          if (!(r instanceof Date)) throw new Error(`@smithy/core/protocols - received non-Date value ${r} when schema expected Date in ${s.getName(true)}`);
          switch (oi(s, this.settings)) {
            case 5:
              this.stringBuffer = r.toISOString().replace(".000Z", "Z");
              break;
            case 6:
              this.stringBuffer = Mn(r);
              break;
            case 7:
              this.stringBuffer = String(r.getTime() / 1e3);
              break;
            default:
              console.warn("Missing timestamp format, using epoch seconds", r), this.stringBuffer = String(r.getTime() / 1e3);
          }
          return;
        }
        if (s.isBlobSchema() && "byteLength" in r) {
          this.stringBuffer = (((_a2 = this.serdeContext) == null ? void 0 : _a2.base64Encoder) ?? Bt)(r);
          return;
        }
        if (s.isListSchema() && Array.isArray(r)) {
          let o = "";
          for (const a of r) {
            this.write([s.getValueSchema(), s.getMergedTraits()], a);
            const c = this.flush(), u = s.getValueSchema().isTimestampSchema() ? c : hf(c);
            o !== "" && (o += ", "), o += u;
          }
          this.stringBuffer = o;
          return;
        }
        this.stringBuffer = JSON.stringify(r, null, 2);
        break;
      case "string":
        const n = s.getMergedTraits().mediaType;
        let i = r;
        if (n && ((n === "application/json" || n.endsWith("+json")) && (i = ot.from(i)), s.getMergedTraits().httpHeader)) {
          this.stringBuffer = (((_b2 = this.serdeContext) == null ? void 0 : _b2.base64Encoder) ?? Bt)(i.toString());
          return;
        }
        this.stringBuffer = r;
        break;
      default:
        s.isIdempotencyToken() ? this.stringBuffer = ri() : this.stringBuffer = String(r);
    }
  }
  flush() {
    const e = this.stringBuffer;
    return this.stringBuffer = "", e;
  }
}
class kf {
  constructor(e, r, s = new vf(r)) {
    __publicField(this, "codecSerializer");
    __publicField(this, "stringSerializer");
    __publicField(this, "buffer");
    this.codecSerializer = e, this.stringSerializer = s;
  }
  setSerdeContext(e) {
    this.codecSerializer.setSerdeContext(e), this.stringSerializer.setSerdeContext(e);
  }
  write(e, r) {
    const s = X.of(e), n = s.getMergedTraits();
    if (n.httpHeader || n.httpLabel || n.httpQuery) {
      this.stringSerializer.write(s, r), this.buffer = this.stringSerializer.flush();
      return;
    }
    return this.codecSerializer.write(s, r);
  }
  flush() {
    if (this.buffer !== void 0) {
      const e = this.buffer;
      return this.buffer = void 0, e;
    }
    return this.codecSerializer.flush();
  }
}
function Df(t, e, r) {
  t.__smithy_context ? t.__smithy_context.features || (t.__smithy_context.features = {}) : t.__smithy_context = { features: {} }, t.__smithy_context.features[e] = r;
}
class Tf {
  constructor(e) {
    __publicField(this, "authSchemes", /* @__PURE__ */ new Map());
    for (const [r, s] of Object.entries(e)) s !== void 0 && this.authSchemes.set(r, s);
  }
  getIdentityProvider(e) {
    return this.authSchemes.get(e);
  }
}
const _f = (t) => function(r) {
  return Sc(r) && r.expiration.getTime() - Date.now() < t;
}, Bf = 3e5, If = _f(Bf), Sc = (t) => t.expiration !== void 0, Of = (t, e, r) => {
  if (t === void 0) return;
  const s = typeof t != "function" ? async () => Promise.resolve(t) : t;
  let n, i, o, a = false;
  const c = async (u) => {
    i || (i = s(u));
    try {
      n = await i, o = true, a = false;
    } finally {
      i = void 0;
    }
    return n;
  };
  return e === void 0 ? async (u) => ((!o || (u == null ? void 0 : u.forceRefresh)) && (n = await c(u)), n) : async (u) => ((!o || (u == null ? void 0 : u.forceRefresh)) && (n = await c(u)), a ? n : r(n) ? (e(n) && await c(u), n) : (a = true, n));
}, Mf = (t, e, r) => {
  let s, n, i, o = false;
  const a = async () => {
    n || (n = t());
    try {
      s = await n, i = true, o = false;
    } finally {
      n = void 0;
    }
    return s;
  };
  return async (c) => ((!i || (c == null ? void 0 : c.forceRefresh)) && (s = await a()), s);
}, Pf = (t) => (t.sigv4aSigningRegionSet = Ht(t.sigv4aSigningRegionSet), t), Nf = "X-Amz-Algorithm", $f = "X-Amz-Credential", xc = "X-Amz-Date", Uf = "X-Amz-SignedHeaders", Ff = "X-Amz-Expires", bc = "X-Amz-Signature", wc = "X-Amz-Security-Token", Ec = "authorization", Cc = xc.toLowerCase(), Lf = "date", Hf = [Ec, Cc, Lf], zf = bc.toLowerCase(), Pn = "x-amz-content-sha256", jf = wc.toLowerCase(), Vf = { authorization: true, "cache-control": true, connection: true, expect: true, from: true, "keep-alive": true, "max-forwards": true, pragma: true, referer: true, te: true, trailer: true, "transfer-encoding": true, upgrade: true, "user-agent": true, "x-amzn-trace-id": true }, qf = /^proxy-/, Gf = /^sec-/, Ks = "AWS4-HMAC-SHA256", Wf = "AWS4-HMAC-SHA256-PAYLOAD", Kf = "UNSIGNED-PAYLOAD", Xf = 50, Ac = "aws4_request", Zf = 3600 * 24 * 7, Br = {}, Xs = [], Zs = (t, e, r) => `${t}/${e}/${r}/${Ac}`, Qf = async (t, e, r, s, n) => {
  const i = await ho(t, e.secretAccessKey, e.accessKeyId), o = `${r}:${s}:${n}:${ve(i)}:${e.sessionToken}`;
  if (o in Br) return Br[o];
  for (Xs.push(o); Xs.length > Xf; ) delete Br[Xs.shift()];
  let a = `AWS4${e.secretAccessKey}`;
  for (const c of [r, s, n, Ac]) a = await ho(t, a, c);
  return Br[o] = a;
}, ho = (t, e, r) => {
  const s = new t(e);
  return s.update(Gt(r)), s.digest();
}, po = ({ headers: t }, e, r) => {
  const s = {};
  for (const n of Object.keys(t).sort()) {
    if (t[n] == null) continue;
    const i = n.toLowerCase();
    (i in Vf || (e == null ? void 0 : e.has(i)) || qf.test(i) || Gf.test(i)) && (!r || r && !r.has(i)) || (s[i] = t[n].trim().replace(/\s+/g, " "));
  }
  return s;
}, Rc = (t) => typeof ArrayBuffer == "function" && t instanceof ArrayBuffer || Object.prototype.toString.call(t) === "[object ArrayBuffer]", Qs = async ({ headers: t, body: e }, r) => {
  for (const s of Object.keys(t)) if (s.toLowerCase() === Pn) return t[s];
  if (e == null) return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  if (typeof e == "string" || ArrayBuffer.isView(e) || Rc(e)) {
    const s = new r();
    return s.update(Gt(e)), ve(await s.digest());
  }
  return Kf;
};
class Jf {
  format(e) {
    const r = [];
    for (const i of Object.keys(e)) {
      const o = Qe(i);
      r.push(Uint8Array.from([o.byteLength]), o, this.formatHeaderValue(e[i]));
    }
    const s = new Uint8Array(r.reduce((i, o) => i + o.byteLength, 0));
    let n = 0;
    for (const i of r) s.set(i, n), n += i.byteLength;
    return s;
  }
  formatHeaderValue(e) {
    switch (e.type) {
      case "boolean":
        return Uint8Array.from([e.value ? 0 : 1]);
      case "byte":
        return Uint8Array.from([2, e.value]);
      case "short":
        const r = new DataView(new ArrayBuffer(3));
        return r.setUint8(0, 3), r.setInt16(1, e.value, false), new Uint8Array(r.buffer);
      case "integer":
        const s = new DataView(new ArrayBuffer(5));
        return s.setUint8(0, 4), s.setInt32(1, e.value, false), new Uint8Array(s.buffer);
      case "long":
        const n = new Uint8Array(9);
        return n[0] = 5, n.set(e.value.bytes, 1), n;
      case "binary":
        const i = new DataView(new ArrayBuffer(3 + e.value.byteLength));
        i.setUint8(0, 6), i.setUint16(1, e.value.byteLength, false);
        const o = new Uint8Array(i.buffer);
        return o.set(e.value, 3), o;
      case "string":
        const a = Qe(e.value), c = new DataView(new ArrayBuffer(3 + a.byteLength));
        c.setUint8(0, 7), c.setUint16(1, a.byteLength, false);
        const u = new Uint8Array(c.buffer);
        return u.set(a, 3), u;
      case "timestamp":
        const m = new Uint8Array(9);
        return m[0] = 8, m.set(eh.fromNumber(e.value.valueOf()).bytes, 1), m;
      case "uuid":
        if (!Yf.test(e.value)) throw new Error(`Invalid UUID received: ${e.value}`);
        const l = new Uint8Array(17);
        return l[0] = 9, l.set(dc(e.value.replace(/\-/g, "")), 1), l;
    }
  }
}
var mo;
(function(t) {
  t[t.boolTrue = 0] = "boolTrue", t[t.boolFalse = 1] = "boolFalse", t[t.byte = 2] = "byte", t[t.short = 3] = "short", t[t.integer = 4] = "integer", t[t.long = 5] = "long", t[t.byteArray = 6] = "byteArray", t[t.string = 7] = "string", t[t.timestamp = 8] = "timestamp", t[t.uuid = 9] = "uuid";
})(mo || (mo = {}));
const Yf = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
let eh = class vc {
  constructor(e) {
    __publicField(this, "bytes");
    if (this.bytes = e, e.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes");
  }
  static fromNumber(e) {
    if (e > 9223372036854776e3 || e < -9223372036854776e3) throw new Error(`${e} is too large (or, if negative, too small) to represent as an Int64`);
    const r = new Uint8Array(8);
    for (let s = 7, n = Math.abs(Math.round(e)); s > -1 && n > 0; s--, n /= 256) r[s] = n;
    return e < 0 && go(r), new vc(r);
  }
  valueOf() {
    const e = this.bytes.slice(0), r = e[0] & 128;
    return r && go(e), parseInt(ve(e), 16) * (r ? -1 : 1);
  }
  toString() {
    return String(this.valueOf());
  }
};
function go(t) {
  for (let e = 0; e < 8; e++) t[e] ^= 255;
  for (let e = 7; e > -1 && (t[e]++, t[e] === 0); e--) ;
}
const th = (t, e) => {
  t = t.toLowerCase();
  for (const r of Object.keys(e)) if (t === r.toLowerCase()) return true;
  return false;
}, rh = (t, e = {}) => {
  var _a2, _b2;
  const { headers: r, query: s = {} } = ee.clone(t);
  for (const n of Object.keys(r)) {
    const i = n.toLowerCase();
    (i.slice(0, 6) === "x-amz-" && !((_a2 = e.unhoistableHeaders) == null ? void 0 : _a2.has(i)) || ((_b2 = e.hoistableHeaders) == null ? void 0 : _b2.has(i))) && (s[n] = r[n], delete r[n]);
  }
  return { ...t, headers: r, query: s };
}, yo = (t) => {
  t = ee.clone(t);
  for (const e of Object.keys(t.headers)) Hf.indexOf(e.toLowerCase()) > -1 && delete t.headers[e];
  return t;
}, sh = ({ query: t = {} }) => {
  const e = [], r = {};
  for (const s of Object.keys(t)) {
    if (s.toLowerCase() === zf) continue;
    const n = _t(s);
    e.push(n);
    const i = t[s];
    typeof i == "string" ? r[n] = `${n}=${_t(i)}` : Array.isArray(i) && (r[n] = i.slice(0).reduce((o, a) => o.concat([`${n}=${_t(a)}`]), []).sort().join("&"));
  }
  return e.sort().map((s) => r[s]).filter((s) => s).join("&");
}, nh = (t) => ih(t).toISOString().replace(/\.\d{3}Z$/, "Z"), ih = (t) => typeof t == "number" ? new Date(t * 1e3) : typeof t == "string" ? Number(t) ? new Date(Number(t) * 1e3) : new Date(t) : t;
class oh {
  constructor({ applyChecksum: e, credentials: r, region: s, service: n, sha256: i, uriEscapePath: o = true }) {
    __publicField(this, "service");
    __publicField(this, "regionProvider");
    __publicField(this, "credentialProvider");
    __publicField(this, "sha256");
    __publicField(this, "uriEscapePath");
    __publicField(this, "applyChecksum");
    this.service = n, this.sha256 = i, this.uriEscapePath = o, this.applyChecksum = typeof e == "boolean" ? e : true, this.regionProvider = Ne(s), this.credentialProvider = Ne(r);
  }
  createCanonicalRequest(e, r, s) {
    const n = Object.keys(r).sort();
    return `${e.method}
${this.getCanonicalPath(e)}
${sh(e)}
${n.map((i) => `${i}:${r[i]}`).join(`
`)}

${n.join(";")}
${s}`;
  }
  async createStringToSign(e, r, s, n) {
    const i = new this.sha256();
    i.update(Gt(s));
    const o = await i.digest();
    return `${n}
${e}
${r}
${ve(o)}`;
  }
  getCanonicalPath({ path: e }) {
    if (this.uriEscapePath) {
      const r = [];
      for (const i of e.split("/")) (i == null ? void 0 : i.length) !== 0 && i !== "." && (i === ".." ? r.pop() : r.push(i));
      const s = `${(e == null ? void 0 : e.startsWith("/")) ? "/" : ""}${r.join("/")}${r.length > 0 && (e == null ? void 0 : e.endsWith("/")) ? "/" : ""}`;
      return _t(s).replace(/%2F/g, "/");
    }
    return e;
  }
  validateResolvedCredentials(e) {
    if (typeof e != "object" || typeof e.accessKeyId != "string" || typeof e.secretAccessKey != "string") throw new Error("Resolved credential object is not valid");
  }
  formatDate(e) {
    const r = nh(e).replace(/[\-:]/g, "");
    return { longDate: r, shortDate: r.slice(0, 8) };
  }
  getCanonicalHeaderList(e) {
    return Object.keys(e).sort().join(";");
  }
}
class Nn extends oh {
  constructor({ applyChecksum: e, credentials: r, region: s, service: n, sha256: i, uriEscapePath: o = true }) {
    super({ applyChecksum: e, credentials: r, region: s, service: n, sha256: i, uriEscapePath: o });
    __publicField(this, "headerFormatter", new Jf());
  }
  async presign(e, r = {}) {
    const { signingDate: s = /* @__PURE__ */ new Date(), expiresIn: n = 3600, unsignableHeaders: i, unhoistableHeaders: o, signableHeaders: a, hoistableHeaders: c, signingRegion: u, signingService: m } = r, l = await this.credentialProvider();
    this.validateResolvedCredentials(l);
    const h = u ?? await this.regionProvider(), { longDate: g, shortDate: x } = this.formatDate(s);
    if (n > Zf) return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
    const E = Zs(x, h, m ?? this.service), C = rh(yo(e), { unhoistableHeaders: o, hoistableHeaders: c });
    l.sessionToken && (C.query[wc] = l.sessionToken), C.query[Nf] = Ks, C.query[$f] = `${l.accessKeyId}/${E}`, C.query[xc] = g, C.query[Ff] = n.toString(10);
    const T = po(C, i, a);
    return C.query[Uf] = this.getCanonicalHeaderList(T), C.query[bc] = await this.getSignature(g, E, this.getSigningKey(l, h, x, m), this.createCanonicalRequest(C, T, await Qs(e, this.sha256))), C;
  }
  async sign(e, r) {
    return typeof e == "string" ? this.signString(e, r) : e.headers && e.payload ? this.signEvent(e, r) : e.message ? this.signMessage(e, r) : this.signRequest(e, r);
  }
  async signEvent({ headers: e, payload: r }, { signingDate: s = /* @__PURE__ */ new Date(), priorSignature: n, signingRegion: i, signingService: o }) {
    const a = i ?? await this.regionProvider(), { shortDate: c, longDate: u } = this.formatDate(s), m = Zs(c, a, o ?? this.service), l = await Qs({ headers: {}, body: r }, this.sha256), h = new this.sha256();
    h.update(e);
    const g = ve(await h.digest()), x = [Wf, u, m, n, g, l].join(`
`);
    return this.signString(x, { signingDate: s, signingRegion: a, signingService: o });
  }
  async signMessage(e, { signingDate: r = /* @__PURE__ */ new Date(), signingRegion: s, signingService: n }) {
    return this.signEvent({ headers: this.headerFormatter.format(e.message.headers), payload: e.message.body }, { signingDate: r, signingRegion: s, signingService: n, priorSignature: e.priorSignature }).then((o) => ({ message: e.message, signature: o }));
  }
  async signString(e, { signingDate: r = /* @__PURE__ */ new Date(), signingRegion: s, signingService: n } = {}) {
    const i = await this.credentialProvider();
    this.validateResolvedCredentials(i);
    const o = s ?? await this.regionProvider(), { shortDate: a } = this.formatDate(r), c = new this.sha256(await this.getSigningKey(i, o, a, n));
    return c.update(Gt(e)), ve(await c.digest());
  }
  async signRequest(e, { signingDate: r = /* @__PURE__ */ new Date(), signableHeaders: s, unsignableHeaders: n, signingRegion: i, signingService: o } = {}) {
    const a = await this.credentialProvider();
    this.validateResolvedCredentials(a);
    const c = i ?? await this.regionProvider(), u = yo(e), { longDate: m, shortDate: l } = this.formatDate(r), h = Zs(l, c, o ?? this.service);
    u.headers[Cc] = m, a.sessionToken && (u.headers[jf] = a.sessionToken);
    const g = await Qs(u, this.sha256);
    !th(Pn, u.headers) && this.applyChecksum && (u.headers[Pn] = g);
    const x = po(u, n, s), E = await this.getSignature(m, h, this.getSigningKey(a, c, l, o), this.createCanonicalRequest(u, x, g));
    return u.headers[Ec] = `${Ks} Credential=${a.accessKeyId}/${h}, SignedHeaders=${this.getCanonicalHeaderList(x)}, Signature=${E}`, u;
  }
  async getSignature(e, r, s, n) {
    const i = await this.createStringToSign(e, r, n, Ks), o = new this.sha256(await s);
    return o.update(Gt(i)), ve(await o.digest());
  }
  getSigningKey(e, r, s, n) {
    return Qf(this.sha256, e, s, r, n || this.service);
  }
}
const ah = (t) => {
  let e = t.credentials, r = !!t.credentials, s;
  Object.defineProperty(t, "credentials", { set(u) {
    u && u !== e && u !== s && (r = true), e = u;
    const m = ch(t, { credentials: e, credentialDefaultProvider: t.credentialDefaultProvider }), l = uh(t, m);
    if (r && !l.attributed) {
      const h = typeof e == "object" && e !== null;
      s = async (g) => {
        const E = await l(g);
        return h && (!E.$source || Object.keys(E.$source).length === 0) ? cl(E, "CREDENTIALS_CODE", "e") : E;
      }, s.memoized = l.memoized, s.configBound = l.configBound, s.attributed = true;
    } else s = l;
  }, get() {
    return s;
  }, enumerable: true, configurable: true }), t.credentials = e;
  const { signingEscapePath: n = true, systemClockOffset: i = t.systemClockOffset || 0, sha256: o } = t;
  let a;
  return t.signer ? a = Ht(t.signer) : t.regionInfoProvider ? a = () => Ht(t.region)().then(async (u) => [await t.regionInfoProvider(u, { useFipsEndpoint: await t.useFipsEndpoint(), useDualstackEndpoint: await t.useDualstackEndpoint() }) || {}, u]).then(([u, m]) => {
    const { signingRegion: l, signingService: h } = u;
    t.signingRegion = t.signingRegion || l || m, t.signingName = t.signingName || h || t.serviceId;
    const g = { ...t, credentials: t.credentials, region: t.signingRegion, service: t.signingName, sha256: o, uriEscapePath: n }, x = t.signerConstructor || Nn;
    return new x(g);
  }) : a = async (u) => {
    u = Object.assign({}, { name: "sigv4", signingName: t.signingName || t.defaultSigningName, signingRegion: await Ht(t.region)(), properties: {} }, u);
    const m = u.signingRegion, l = u.signingName;
    t.signingRegion = t.signingRegion || m, t.signingName = t.signingName || l || t.serviceId;
    const h = { ...t, credentials: t.credentials, region: t.signingRegion, service: t.signingName, sha256: o, uriEscapePath: n }, g = t.signerConstructor || Nn;
    return new g(h);
  }, Object.assign(t, { systemClockOffset: i, signingEscapePath: n, signer: a });
};
function ch(t, { credentials: e, credentialDefaultProvider: r }) {
  let s;
  return e ? (e == null ? void 0 : e.memoized) ? s = e : s = Of(e, If, Sc) : r ? s = Ht(r(Object.assign({}, t, { parentClientConfig: t }))) : s = async () => {
    throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.");
  }, s.memoized = true, s;
}
function uh(t, e) {
  if (e.configBound) return e;
  const r = async (s) => e({ ...s, callerClientConfig: t });
  return r.memoized = e.memoized, r.configBound = true, r;
}
const So = typeof TextEncoder == "function" ? new TextEncoder() : null, dh = (t) => {
  if (typeof t == "string") {
    if (So) return So.encode(t).byteLength;
    let e = t.length;
    for (let r = e - 1; r >= 0; r--) {
      const s = t.charCodeAt(r);
      s > 127 && s <= 2047 ? e++ : s > 2047 && s <= 65535 && (e += 2), s >= 56320 && s <= 57343 && r--;
    }
    return e;
  } else {
    if (typeof t.byteLength == "number") return t.byteLength;
    if (typeof t.size == "number") return t.size;
  }
  throw new Error(`Body Length computation failed for ${t}`);
}, kt = (t, e) => {
  const r = [];
  if (t && r.push(t), e) for (const s of e) r.push(s);
  return r;
}, rt = (t, e) => `${t || "anonymous"}${e && e.length > 0 ? ` (a.k.a. ${e.join(",")})` : ""}`, Lr = () => {
  let t = [], e = [], r = false;
  const s = /* @__PURE__ */ new Set(), n = (l) => l.sort((h, g) => xo[g.step] - xo[h.step] || bo[g.priority || "normal"] - bo[h.priority || "normal"]), i = (l) => {
    let h = false;
    const g = (x) => {
      const E = kt(x.name, x.aliases);
      if (E.includes(l)) {
        h = true;
        for (const C of E) s.delete(C);
        return false;
      }
      return true;
    };
    return t = t.filter(g), e = e.filter(g), h;
  }, o = (l) => {
    let h = false;
    const g = (x) => {
      if (x.middleware === l) {
        h = true;
        for (const E of kt(x.name, x.aliases)) s.delete(E);
        return false;
      }
      return true;
    };
    return t = t.filter(g), e = e.filter(g), h;
  }, a = (l) => {
    var _a2;
    return t.forEach((h) => {
      l.add(h.middleware, { ...h });
    }), e.forEach((h) => {
      l.addRelativeTo(h.middleware, { ...h });
    }), (_a2 = l.identifyOnResolve) == null ? void 0 : _a2.call(l, m.identifyOnResolve()), l;
  }, c = (l) => {
    const h = [];
    return l.before.forEach((g) => {
      g.before.length === 0 && g.after.length === 0 ? h.push(g) : h.push(...c(g));
    }), h.push(l), l.after.reverse().forEach((g) => {
      g.before.length === 0 && g.after.length === 0 ? h.push(g) : h.push(...c(g));
    }), h;
  }, u = (l = false) => {
    const h = [], g = [], x = {};
    return t.forEach((C) => {
      const T = { ...C, before: [], after: [] };
      for (const R of kt(T.name, T.aliases)) x[R] = T;
      h.push(T);
    }), e.forEach((C) => {
      const T = { ...C, before: [], after: [] };
      for (const R of kt(T.name, T.aliases)) x[R] = T;
      g.push(T);
    }), g.forEach((C) => {
      if (C.toMiddleware) {
        const T = x[C.toMiddleware];
        if (T === void 0) {
          if (l) return;
          throw new Error(`${C.toMiddleware} is not found when adding ${rt(C.name, C.aliases)} middleware ${C.relation} ${C.toMiddleware}`);
        }
        C.relation === "after" && T.after.push(C), C.relation === "before" && T.before.push(C);
      }
    }), n(h).map(c).reduce((C, T) => (C.push(...T), C), []);
  }, m = { add: (l, h = {}) => {
    const { name: g, override: x, aliases: E } = h, C = { step: "initialize", priority: "normal", middleware: l, ...h }, T = kt(g, E);
    if (T.length > 0) {
      if (T.some((R) => s.has(R))) {
        if (!x) throw new Error(`Duplicate middleware name '${rt(g, E)}'`);
        for (const R of T) {
          const O = t.findIndex((q) => {
            var _a2;
            return q.name === R || ((_a2 = q.aliases) == null ? void 0 : _a2.some((te) => te === R));
          });
          if (O === -1) continue;
          const N = t[O];
          if (N.step !== C.step || C.priority !== N.priority) throw new Error(`"${rt(N.name, N.aliases)}" middleware with ${N.priority} priority in ${N.step} step cannot be overridden by "${rt(g, E)}" middleware with ${C.priority} priority in ${C.step} step.`);
          t.splice(O, 1);
        }
      }
      for (const R of T) s.add(R);
    }
    t.push(C);
  }, addRelativeTo: (l, h) => {
    const { name: g, override: x, aliases: E } = h, C = { middleware: l, ...h }, T = kt(g, E);
    if (T.length > 0) {
      if (T.some((R) => s.has(R))) {
        if (!x) throw new Error(`Duplicate middleware name '${rt(g, E)}'`);
        for (const R of T) {
          const O = e.findIndex((q) => {
            var _a2;
            return q.name === R || ((_a2 = q.aliases) == null ? void 0 : _a2.some((te) => te === R));
          });
          if (O === -1) continue;
          const N = e[O];
          if (N.toMiddleware !== C.toMiddleware || N.relation !== C.relation) throw new Error(`"${rt(N.name, N.aliases)}" middleware ${N.relation} "${N.toMiddleware}" middleware cannot be overridden by "${rt(g, E)}" middleware ${C.relation} "${C.toMiddleware}" middleware.`);
          e.splice(O, 1);
        }
      }
      for (const R of T) s.add(R);
    }
    e.push(C);
  }, clone: () => a(Lr()), use: (l) => {
    l.applyToStack(m);
  }, remove: (l) => typeof l == "string" ? i(l) : o(l), removeByTag: (l) => {
    let h = false;
    const g = (x) => {
      const { tags: E, name: C, aliases: T } = x;
      if (E && E.includes(l)) {
        const R = kt(C, T);
        for (const O of R) s.delete(O);
        return h = true, false;
      }
      return true;
    };
    return t = t.filter(g), e = e.filter(g), h;
  }, concat: (l) => {
    var _a2;
    const h = a(Lr());
    return h.use(l), h.identifyOnResolve(r || h.identifyOnResolve() || (((_a2 = l.identifyOnResolve) == null ? void 0 : _a2.call(l)) ?? false)), h;
  }, applyToStack: a, identify: () => u(true).map((l) => {
    const h = l.step ?? l.relation + " " + l.toMiddleware;
    return rt(l.name, l.aliases) + " - " + h;
  }), identifyOnResolve(l) {
    return typeof l == "boolean" && (r = l), r;
  }, resolve: (l, h) => {
    for (const g of u().map((x) => x.middleware).reverse()) l = g(l, h);
    return r && console.log(m.identify()), l;
  } };
  return m;
}, xo = { initialize: 5, serialize: 4, build: 3, finalizeRequest: 2, deserialize: 1 }, bo = { high: 3, normal: 2, low: 1 };
class lh {
  constructor(e) {
    __publicField(this, "config");
    __publicField(this, "middlewareStack", Lr());
    __publicField(this, "initConfig");
    __publicField(this, "handlers");
    this.config = e;
    const { protocol: r, protocolSettings: s } = e;
    s && typeof r == "function" && (e.protocol = new r(s));
  }
  send(e, r, s) {
    const n = typeof r != "function" ? r : void 0, i = typeof r == "function" ? r : s, o = n === void 0 && this.config.cacheMiddleware === true;
    let a;
    if (o) {
      this.handlers || (this.handlers = /* @__PURE__ */ new WeakMap());
      const c = this.handlers;
      c.has(e.constructor) ? a = c.get(e.constructor) : (a = e.resolveMiddleware(this.middlewareStack, this.config, n), c.set(e.constructor, a));
    } else delete this.handlers, a = e.resolveMiddleware(this.middlewareStack, this.config, n);
    if (i) a(e).then((c) => i(null, c.output), (c) => i(c)).catch(() => {
    });
    else return a(e).then((c) => c.output);
  }
  destroy() {
    var _a2, _b2, _c2;
    (_c2 = (_b2 = (_a2 = this.config) == null ? void 0 : _a2.requestHandler) == null ? void 0 : _b2.destroy) == null ? void 0 : _c2.call(_b2), delete this.handlers;
  }
}
const Js = "***SensitiveInformation***";
function $n(t, e) {
  if (e == null) return e;
  const r = X.of(t);
  if (r.getMergedTraits().sensitive) return Js;
  if (r.isListSchema()) {
    if (!!r.getValueSchema().getMergedTraits().sensitive) return Js;
  } else if (r.isMapSchema()) {
    if (!!r.getKeySchema().getMergedTraits().sensitive || !!r.getValueSchema().getMergedTraits().sensitive) return Js;
  } else if (r.isStructSchema() && typeof e == "object") {
    const s = e, n = {};
    for (const [i, o] of r.structIterator()) s[i] != null && (n[i] = $n(o, s[i]));
    return n;
  }
  return e;
}
class $e {
  constructor() {
    __publicField(this, "middlewareStack", Lr());
    __publicField(this, "schema");
  }
  static classBuilder() {
    return new fh();
  }
  resolveMiddlewareWithContext(e, r, s, { middlewareFn: n, clientName: i, commandName: o, inputFilterSensitiveLog: a, outputFilterSensitiveLog: c, smithyContext: u, additionalContext: m, CommandCtor: l }) {
    for (const C of n.bind(this)(l, e, r, s)) this.middlewareStack.use(C);
    const h = e.concat(this.middlewareStack), { logger: g } = r, x = { logger: g, clientName: i, commandName: o, inputFilterSensitiveLog: a, outputFilterSensitiveLog: c, [Tn]: { commandInstance: this, ...u }, ...m }, { requestHandler: E } = r;
    return h.resolve((C) => E.handle(C.request, s || {}), x);
  }
}
class fh {
  constructor() {
    __publicField(this, "_init", () => {
    });
    __publicField(this, "_ep", {});
    __publicField(this, "_middlewareFn", () => []);
    __publicField(this, "_commandName", "");
    __publicField(this, "_clientName", "");
    __publicField(this, "_additionalContext", {});
    __publicField(this, "_smithyContext", {});
    __publicField(this, "_inputFilterSensitiveLog");
    __publicField(this, "_outputFilterSensitiveLog");
    __publicField(this, "_serializer", null);
    __publicField(this, "_deserializer", null);
    __publicField(this, "_operationSchema");
  }
  init(e) {
    this._init = e;
  }
  ep(e) {
    return this._ep = e, this;
  }
  m(e) {
    return this._middlewareFn = e, this;
  }
  s(e, r, s = {}) {
    return this._smithyContext = { service: e, operation: r, ...s }, this;
  }
  c(e = {}) {
    return this._additionalContext = e, this;
  }
  n(e, r) {
    return this._clientName = e, this._commandName = r, this;
  }
  f(e = (s) => s, r = (s) => s) {
    return this._inputFilterSensitiveLog = e, this._outputFilterSensitiveLog = r, this;
  }
  ser(e) {
    return this._serializer = e, this;
  }
  de(e) {
    return this._deserializer = e, this;
  }
  sc(e) {
    return this._operationSchema = e, this._smithyContext.operationSchema = e, this;
  }
  build() {
    const e = this;
    let r;
    return r = class extends $e {
      constructor(...[s]) {
        super();
        __publicField(this, "input");
        __publicField(this, "serialize", e._serializer);
        __publicField(this, "deserialize", e._deserializer);
        this.input = s ?? {}, e._init(this), this.schema = e._operationSchema;
      }
      static getEndpointParameterInstructions() {
        return e._ep;
      }
      resolveMiddleware(s, n, i) {
        const o = e._operationSchema, a = (o == null ? void 0 : o[4]) ?? (o == null ? void 0 : o.input), c = (o == null ? void 0 : o[5]) ?? (o == null ? void 0 : o.output);
        return this.resolveMiddlewareWithContext(s, n, i, { CommandCtor: r, middlewareFn: e._middlewareFn, clientName: e._clientName, commandName: e._commandName, inputFilterSensitiveLog: e._inputFilterSensitiveLog ?? (o ? $n.bind(null, a) : (u) => u), outputFilterSensitiveLog: e._outputFilterSensitiveLog ?? (o ? $n.bind(null, c) : (u) => u), smithyContext: e._smithyContext, additionalContext: e._additionalContext });
      }
    };
  }
}
class Lt extends Error {
  constructor(e) {
    super(e.message);
    __publicField(this, "$fault");
    __publicField(this, "$response");
    __publicField(this, "$retryable");
    __publicField(this, "$metadata");
    Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype), this.name = e.name, this.$fault = e.$fault, this.$metadata = e.$metadata;
  }
  static isInstance(e) {
    if (!e) return false;
    const r = e;
    return Lt.prototype.isPrototypeOf(r) || !!r.$fault && !!r.$metadata && (r.$fault === "client" || r.$fault === "server");
  }
  static [Symbol.hasInstance](e) {
    if (!e) return false;
    const r = e;
    return this === Lt ? Lt.isInstance(e) : Lt.isInstance(e) ? r.name && this.name ? this.prototype.isPrototypeOf(e) || r.name === this.name : this.prototype.isPrototypeOf(e) : false;
  }
}
const wo = (t, e = {}) => {
  Object.entries(e).filter(([, s]) => s !== void 0).forEach(([s, n]) => {
    (t[s] == null || t[s] === "") && (t[s] = n);
  });
  const r = t.message || t.Message || "UnknownError";
  return t.message = r, delete t.Message, t;
}, hh = (t) => {
  switch (t) {
    case "standard":
      return { retryMode: "standard", connectionTimeout: 3100 };
    case "in-region":
      return { retryMode: "standard", connectionTimeout: 1100 };
    case "cross-region":
      return { retryMode: "standard", connectionTimeout: 3100 };
    case "mobile":
      return { retryMode: "standard", connectionTimeout: 3e4 };
    default:
      return {};
  }
}, kc = Object.values(pr), ph = (t) => {
  const e = [];
  for (const r in pr) {
    const s = pr[r];
    t[s] !== void 0 && e.push({ algorithmId: () => s, checksumConstructor: () => t[s] });
  }
  for (const [r, s] of Object.entries(t.checksumAlgorithms ?? {})) e.push({ algorithmId: () => r, checksumConstructor: () => s });
  return { addChecksumAlgorithm(r) {
    t.checksumAlgorithms = t.checksumAlgorithms ?? {};
    const s = r.algorithmId(), n = r.checksumConstructor();
    kc.includes(s) ? t.checksumAlgorithms[s.toUpperCase()] = n : t.checksumAlgorithms[s] = n, e.push(r);
  }, checksumAlgorithms() {
    return e;
  } };
}, mh = (t) => {
  const e = {};
  return t.checksumAlgorithms().forEach((r) => {
    const s = r.algorithmId();
    kc.includes(s) && (e[s] = r.checksumConstructor());
  }), e;
}, gh = (t) => ({ setRetryStrategy(e) {
  t.retryStrategy = e;
}, retryStrategy() {
  return t.retryStrategy;
} }), yh = (t) => {
  const e = {};
  return e.retryStrategy = t.retryStrategy(), e;
}, Sh = (t) => Object.assign(ph(t), gh(t)), xh = (t) => Object.assign(mh(t), yh(t)), Dc = (t) => {
  const e = "#text";
  for (const r in t) t.hasOwnProperty(r) && t[r][e] !== void 0 ? t[r] = t[r][e] : typeof t[r] == "object" && t[r] !== null && (t[r] = Dc(t[r]));
  return t;
};
class ai {
  trace() {
  }
  debug() {
  }
  info() {
  }
  warn() {
  }
  error() {
  }
}
class bh {
  constructor(e = false) {
    __publicField(this, "queryCompat");
    this.queryCompat = e;
  }
  resolveRestContentType(e, r) {
    const s = r.getMemberSchemas(), n = Object.values(s).find((i) => !!i.getMergedTraits().httpPayload);
    if (n) {
      const i = n.getMergedTraits().mediaType;
      return i || (n.isStringSchema() ? "text/plain" : n.isBlobSchema() ? "application/octet-stream" : e);
    } else if (!r.isUnitSchema() && Object.values(s).find((o) => {
      const { httpQuery: a, httpQueryParams: c, httpHeader: u, httpLabel: m, httpPrefixHeaders: l } = o.getMergedTraits();
      return !a && !c && !u && !m && l === void 0;
    })) return e;
  }
  async getErrorSchemaOrThrowBaseException(e, r, s, n, i, o) {
    let a = r, c = e;
    e.includes("#") && ([a, c] = e.split("#"));
    const u = { $metadata: i, $fault: s.statusCode < 500 ? "client" : "server" }, m = Re.for(a);
    try {
      return { errorSchema: (o == null ? void 0 : o(m, c)) ?? m.getSchema(e), errorMetadata: u };
    } catch {
      n.message = n.message ?? n.Message ?? "UnknownError";
      const h = Re.for("smithy.ts.sdk.synthetic." + a), g = h.getBaseException();
      if (g) {
        const x = h.getErrorCtor(g) ?? Error;
        throw this.decorateServiceException(Object.assign(new x({ name: c }), u), n);
      }
      throw this.decorateServiceException(Object.assign(new Error(c), u), n);
    }
  }
  decorateServiceException(e, r = {}) {
    var _a2, _b2, _c2, _d2;
    if (this.queryCompat) {
      const s = e.Message ?? r.Message, n = wo(e, r);
      s && (n.message = s), n.Error = { ...n.Error, Type: (_a2 = n.Error) == null ? void 0 : _a2.Type, Code: (_b2 = n.Error) == null ? void 0 : _b2.Code, Message: ((_c2 = n.Error) == null ? void 0 : _c2.message) ?? ((_d2 = n.Error) == null ? void 0 : _d2.Message) ?? s };
      const i = n.$metadata.requestId;
      return i && (n.RequestId = i), n;
    }
    return wo(e, r);
  }
  setQueryCompatError(e, r) {
    var _a2;
    const s = (_a2 = r.headers) == null ? void 0 : _a2["x-amzn-query-error"];
    if (e !== void 0 && s != null) {
      const [n, i] = s.split(";"), o = Object.entries(e), a = { Code: n, Type: i };
      Object.assign(e, a);
      for (const [c, u] of o) a[c === "message" ? "Message" : c] = u;
      delete a.__type, e.Error = a;
    }
  }
  queryCompatOutput(e, r) {
    e.Error && (r.Error = e.Error), e.Type && (r.Type = e.Type), e.Code && (r.Code = e.Code);
  }
  findQueryCompatibleError(e, r) {
    try {
      return e.getSchema(r);
    } catch {
      return e.find((n) => {
        var _a2;
        return ((_a2 = X.of(n).getMergedTraits().awsQueryError) == null ? void 0 : _a2[0]) === r;
      });
    }
  }
}
class ci {
  constructor() {
    __publicField(this, "serdeContext");
  }
  setSerdeContext(e) {
    this.serdeContext = e;
  }
}
class wh {
  constructor(e, r) {
    __publicField(this, "from");
    __publicField(this, "to");
    __publicField(this, "keys");
    this.from = e, this.to = r, this.keys = new Set(Object.keys(this.from).filter((s) => s !== "__type"));
  }
  mark(e) {
    this.keys.delete(e);
  }
  hasUnknown() {
    return this.keys.size === 1 && Object.keys(this.to).length === 0;
  }
  writeUnknown() {
    if (this.hasUnknown()) {
      const e = this.keys.values().next().value, r = this.from[e];
      this.to.$unknown = [e, r];
    }
  }
}
function Eh(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Ch(t) {
  return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#x0D;").replace(/\n/g, "&#x0A;").replace(/\u0085/g, "&#x85;").replace(/\u2028/, "&#x2028;");
}
class Un {
  constructor(e) {
    __publicField(this, "value");
    this.value = e;
  }
  toString() {
    return Ch("" + this.value);
  }
}
class Ee {
  constructor(e, r = []) {
    __publicField(this, "name");
    __publicField(this, "children");
    __publicField(this, "attributes", {});
    this.name = e, this.children = r;
  }
  static of(e, r, s) {
    const n = new Ee(e);
    return r !== void 0 && n.addChildNode(new Un(r)), s !== void 0 && n.withName(s), n;
  }
  withName(e) {
    return this.name = e, this;
  }
  addAttribute(e, r) {
    return this.attributes[e] = r, this;
  }
  addChildNode(e) {
    return this.children.push(e), this;
  }
  removeAttribute(e) {
    return delete this.attributes[e], this;
  }
  n(e) {
    return this.name = e, this;
  }
  c(e) {
    return this.children.push(e), this;
  }
  a(e, r) {
    return r != null && (this.attributes[e] = r), this;
  }
  cc(e, r, s = r) {
    if (e[r] != null) {
      const n = Ee.of(r, e[r]).withName(s);
      this.c(n);
    }
  }
  l(e, r, s, n) {
    e[r] != null && n().map((o) => {
      o.withName(s), this.c(o);
    });
  }
  lc(e, r, s, n) {
    if (e[r] != null) {
      const i = n(), o = new Ee(s);
      i.map((a) => {
        o.c(a);
      }), this.c(o);
    }
  }
  toString() {
    const e = !!this.children.length;
    let r = `<${this.name}`;
    const s = this.attributes;
    for (const n of Object.keys(s)) {
      const i = s[n];
      i != null && (r += ` ${n}="${Eh("" + i)}"`);
    }
    return r += e ? `>${this.children.map((n) => n.toString()).join("")}</${this.name}>` : "/>";
  }
}
let Ys;
function Ah(t) {
  Ys || (Ys = new DOMParser());
  const e = Ys.parseFromString(t, "application/xml");
  if (e.getElementsByTagName("parsererror").length > 0) throw new Error("DOMParser XML parsing error.");
  const r = (s) => {
    var _a2;
    if (s.nodeType === Node.TEXT_NODE && ((_a2 = s.textContent) == null ? void 0 : _a2.trim())) return s.textContent;
    if (s.nodeType === Node.ELEMENT_NODE) {
      const n = s;
      if (n.attributes.length === 0 && n.childNodes.length === 0) return "";
      const i = {}, o = Array.from(n.attributes);
      for (const c of o) i[`${c.name}`] = c.value;
      const a = Array.from(n.childNodes);
      for (const c of a) {
        const u = r(c);
        if (u != null) {
          const m = c.nodeName;
          if (a.length === 1 && o.length === 0 && m === "#text") return u;
          i[m] ? Array.isArray(i[m]) ? i[m].push(u) : i[m] = [i[m], u] : i[m] = u;
        } else if (a.length === 1 && o.length === 0) return n.textContent;
      }
      return i;
    }
    return null;
  };
  return { [e.documentElement.nodeName]: r(e.documentElement) };
}
class Rh extends ci {
  constructor(e) {
    super();
    __publicField(this, "settings");
    __publicField(this, "stringDeserializer");
    this.settings = e, this.stringDeserializer = new yc(e);
  }
  setSerdeContext(e) {
    this.serdeContext = e, this.stringDeserializer.setSerdeContext(e);
  }
  read(e, r, s) {
    var _a2;
    const n = X.of(e), i = n.getMemberSchemas();
    if (n.isStructSchema() && n.isMemberSchema() && !!Object.values(i).find((u) => !!u.getMemberTraits().eventPayload)) {
      const u = {}, m = Object.keys(i)[0];
      return i[m].isBlobSchema() ? u[m] = r : u[m] = this.read(i[m], r), u;
    }
    const a = (((_a2 = this.serdeContext) == null ? void 0 : _a2.utf8Encoder) ?? It)(r), c = this.parseXml(a);
    return this.readSchema(e, s ? c[s] : c);
  }
  readSchema(e, r) {
    const s = X.of(e);
    if (s.isUnitSchema()) return;
    const n = s.getMergedTraits();
    if (s.isListSchema() && !Array.isArray(r)) return this.readSchema(s, [r]);
    if (r == null) return r;
    if (typeof r == "object") {
      const i = !!n.sparse, o = !!n.xmlFlattened;
      if (s.isListSchema()) {
        const c = s.getValueSchema(), u = [], m = c.getMergedTraits().xmlName ?? "member", l = o ? r : (r[0] ?? r)[m], h = Array.isArray(l) ? l : [l];
        for (const g of h) (g != null || i) && u.push(this.readSchema(c, g));
        return u;
      }
      const a = {};
      if (s.isMapSchema()) {
        const c = s.getKeySchema(), u = s.getValueSchema();
        let m;
        o ? m = Array.isArray(r) ? r : [r] : m = Array.isArray(r.entry) ? r.entry : [r.entry];
        const l = c.getMergedTraits().xmlName ?? "key", h = u.getMergedTraits().xmlName ?? "value";
        for (const g of m) {
          const x = g[l], E = g[h];
          (E != null || i) && (a[x] = this.readSchema(u, E));
        }
        return a;
      }
      if (s.isStructSchema()) {
        const c = s.isUnionSchema();
        let u;
        c && (u = new wh(r, a));
        for (const [m, l] of s.structIterator()) {
          const h = l.getMergedTraits(), g = h.httpPayload ? h.xmlName ?? l.getName() : l.getMemberTraits().xmlName ?? m;
          c && u.mark(g), r[g] != null && (a[m] = this.readSchema(l, r[g]));
        }
        return c && u.writeUnknown(), a;
      }
      if (s.isDocumentSchema()) return r;
      throw new Error(`@aws-sdk/core/protocols - xml deserializer unhandled schema type for ${s.getName(true)}`);
    }
    return s.isListSchema() ? [] : s.isMapSchema() || s.isStructSchema() ? {} : this.stringDeserializer.read(s, r);
  }
  parseXml(e) {
    if (e.length) {
      let r;
      try {
        r = Ah(e);
      } catch (o) {
        throw o && typeof o == "object" && Object.defineProperty(o, "$responseBodyText", { value: e }), o;
      }
      const s = "#text", n = Object.keys(r)[0], i = r[n];
      return i[s] && (i[n] = i[s], delete i[s]), Dc(i);
    }
    return {};
  }
}
const vh = (t, e) => {
  var _a2;
  if (((_a2 = e == null ? void 0 : e.Error) == null ? void 0 : _a2.Code) !== void 0) return e.Error.Code;
  if ((e == null ? void 0 : e.Code) !== void 0) return e.Code;
  if (t.statusCode == 404) return "NotFound";
};
class kh extends ci {
  constructor(e) {
    super();
    __publicField(this, "settings");
    __publicField(this, "stringBuffer");
    __publicField(this, "byteBuffer");
    __publicField(this, "buffer");
    this.settings = e;
  }
  write(e, r) {
    var _a2;
    const s = X.of(e);
    if (s.isStringSchema() && typeof r == "string") this.stringBuffer = r;
    else if (s.isBlobSchema()) this.byteBuffer = "byteLength" in r ? r : (((_a2 = this.serdeContext) == null ? void 0 : _a2.base64Decoder) ?? qt)(r);
    else {
      this.buffer = this.writeStruct(s, r, void 0);
      const n = s.getMergedTraits();
      n.httpPayload && !n.xmlName && this.buffer.withName(s.getName());
    }
  }
  flush() {
    var _a2;
    if (this.byteBuffer !== void 0) {
      const r = this.byteBuffer;
      return delete this.byteBuffer, r;
    }
    if (this.stringBuffer !== void 0) {
      const r = this.stringBuffer;
      return delete this.stringBuffer, r;
    }
    const e = this.buffer;
    return this.settings.xmlNamespace && (((_a2 = e == null ? void 0 : e.attributes) == null ? void 0 : _a2.xmlns) || e.addAttribute("xmlns", this.settings.xmlNamespace)), delete this.buffer, e.toString();
  }
  writeStruct(e, r, s) {
    const n = e.getMergedTraits(), i = e.isMemberSchema() && !n.httpPayload ? e.getMemberTraits().xmlName ?? e.getMemberName() : n.xmlName ?? e.getName();
    if (!i || !e.isStructSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write struct with empty name or non-struct, schema=${e.getName(true)}.`);
    const o = Ee.of(i), [a, c] = this.getXmlnsAttribute(e, s);
    for (const [m, l] of e.structIterator()) {
      const h = r[m];
      if (h != null || l.isIdempotencyToken()) {
        if (l.getMergedTraits().xmlAttribute) {
          o.addAttribute(l.getMergedTraits().xmlName ?? m, this.writeSimple(l, h));
          continue;
        }
        if (l.isListSchema()) this.writeList(l, h, o, c);
        else if (l.isMapSchema()) this.writeMap(l, h, o, c);
        else if (l.isStructSchema()) o.addChildNode(this.writeStruct(l, h, c));
        else {
          const g = Ee.of(l.getMergedTraits().xmlName ?? l.getMemberName());
          this.writeSimpleInto(l, h, g, c), o.addChildNode(g);
        }
      }
    }
    const { $unknown: u } = r;
    if (u && e.isUnionSchema() && Array.isArray(u) && Object.keys(r).length === 1) {
      const [m, l] = u, h = Ee.of(m);
      if (typeof l != "string") if (r instanceof Ee || r instanceof Un) o.addChildNode(r);
      else throw new Error("@aws-sdk - $unknown union member in XML requires value of type string, @aws-sdk/xml-builder::XmlNode or XmlText.");
      this.writeSimpleInto(0, l, h, c), o.addChildNode(h);
    }
    return c && o.addAttribute(a, c), o;
  }
  writeList(e, r, s, n) {
    if (!e.isMemberSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member list: ${e.getName(true)}`);
    const i = e.getMergedTraits(), o = e.getValueSchema(), a = o.getMergedTraits(), c = !!a.sparse, u = !!i.xmlFlattened, [m, l] = this.getXmlnsAttribute(e, n), h = (g, x) => {
      if (o.isListSchema()) this.writeList(o, Array.isArray(x) ? x : [x], g, l);
      else if (o.isMapSchema()) this.writeMap(o, x, g, l);
      else if (o.isStructSchema()) {
        const E = this.writeStruct(o, x, l);
        g.addChildNode(E.withName(u ? i.xmlName ?? e.getMemberName() : a.xmlName ?? "member"));
      } else {
        const E = Ee.of(u ? i.xmlName ?? e.getMemberName() : a.xmlName ?? "member");
        this.writeSimpleInto(o, x, E, l), g.addChildNode(E);
      }
    };
    if (u) for (const g of r) (c || g != null) && h(s, g);
    else {
      const g = Ee.of(i.xmlName ?? e.getMemberName());
      l && g.addAttribute(m, l);
      for (const x of r) (c || x != null) && h(g, x);
      s.addChildNode(g);
    }
  }
  writeMap(e, r, s, n, i = false) {
    if (!e.isMemberSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member map: ${e.getName(true)}`);
    const o = e.getMergedTraits(), a = e.getKeySchema(), u = a.getMergedTraits().xmlName ?? "key", m = e.getValueSchema(), l = m.getMergedTraits(), h = l.xmlName ?? "value", g = !!l.sparse, x = !!o.xmlFlattened, [E, C] = this.getXmlnsAttribute(e, n), T = (R, O, N) => {
      const q = Ee.of(u, O), [te, Xi] = this.getXmlnsAttribute(a, C);
      Xi && q.addAttribute(te, Xi), R.addChildNode(q);
      let er = Ee.of(h);
      m.isListSchema() ? this.writeList(m, N, er, C) : m.isMapSchema() ? this.writeMap(m, N, er, C, true) : m.isStructSchema() ? er = this.writeStruct(m, N, C) : this.writeSimpleInto(m, N, er, C), R.addChildNode(er);
    };
    if (x) {
      for (const [R, O] of Object.entries(r)) if (g || O != null) {
        const N = Ee.of(o.xmlName ?? e.getMemberName());
        T(N, R, O), s.addChildNode(N);
      }
    } else {
      let R;
      i || (R = Ee.of(o.xmlName ?? e.getMemberName()), C && R.addAttribute(E, C), s.addChildNode(R));
      for (const [O, N] of Object.entries(r)) if (g || N != null) {
        const q = Ee.of("entry");
        T(q, O, N), (i ? s : R).addChildNode(q);
      }
    }
  }
  writeSimple(e, r) {
    var _a2;
    if (r === null) throw new Error("@aws-sdk/core/protocols - (XML serializer) cannot write null value.");
    const s = X.of(e);
    let n = null;
    if (r && typeof r == "object") if (s.isBlobSchema()) n = (((_a2 = this.serdeContext) == null ? void 0 : _a2.base64Encoder) ?? Bt)(r);
    else if (s.isTimestampSchema() && r instanceof Date) switch (oi(s, this.settings)) {
      case 5:
        n = r.toISOString().replace(".000Z", "Z");
        break;
      case 6:
        n = Mn(r);
        break;
      case 7:
        n = String(r.getTime() / 1e3);
        break;
      default:
        console.warn("Missing timestamp format, using http date", r), n = Mn(r);
        break;
    }
    else {
      if (s.isBigDecimalSchema() && r) return r instanceof Qr ? r.string : String(r);
      throw s.isMapSchema() || s.isListSchema() ? new Error("@aws-sdk/core/protocols - xml serializer, cannot call _write() on List/Map schema, call writeList or writeMap() instead.") : new Error(`@aws-sdk/core/protocols - xml serializer, unhandled schema type for object value and schema: ${s.getName(true)}`);
    }
    if ((s.isBooleanSchema() || s.isNumericSchema() || s.isBigIntegerSchema() || s.isBigDecimalSchema()) && (n = String(r)), s.isStringSchema() && (r === void 0 && s.isIdempotencyToken() ? n = ri() : n = String(r)), n === null) throw new Error(`Unhandled schema-value pair ${s.getName(true)}=${r}`);
    return n;
  }
  writeSimpleInto(e, r, s, n) {
    const i = this.writeSimple(e, r), o = X.of(e), a = new Un(i), [c, u] = this.getXmlnsAttribute(o, n);
    u && s.addAttribute(c, u), s.addChildNode(a);
  }
  getXmlnsAttribute(e, r) {
    const s = e.getMergedTraits(), [n, i] = s.xmlNamespace ?? [];
    return i && i !== r ? [n ? `xmlns:${n}` : "xmlns", i] : [void 0, void 0];
  }
}
class Dh extends ci {
  constructor(e) {
    super();
    __publicField(this, "settings");
    this.settings = e;
  }
  createSerializer() {
    const e = new kh(this.settings);
    return e.setSerdeContext(this.serdeContext), e;
  }
  createDeserializer() {
    const e = new Rh(this.settings);
    return e.setSerdeContext(this.serdeContext), e;
  }
}
class Th extends Af {
  constructor(e) {
    super(e);
    __publicField(this, "codec");
    __publicField(this, "serializer");
    __publicField(this, "deserializer");
    __publicField(this, "mixin", new bh());
    const r = { timestampFormat: { useTrait: true, default: 5 }, httpBindings: true, xmlNamespace: e.xmlNamespace, serviceNamespace: e.defaultNamespace };
    this.codec = new Dh(r), this.serializer = new kf(this.codec.createSerializer(), r), this.deserializer = new Rf(this.codec.createDeserializer(), r);
  }
  getPayloadCodec() {
    return this.codec;
  }
  getShapeId() {
    return "aws.protocols#restXml";
  }
  async serializeRequest(e, r, s) {
    const n = await super.serializeRequest(e, r, s), i = X.of(e.input);
    if (!n.headers["content-type"]) {
      const o = this.mixin.resolveRestContentType(this.getDefaultContentType(), i);
      o && (n.headers["content-type"] = o);
    }
    return typeof n.body == "string" && n.headers["content-type"] === this.getDefaultContentType() && !n.body.startsWith("<?xml ") && !this.hasUnstructuredPayloadBinding(i) && (n.body = '<?xml version="1.0" encoding="UTF-8"?>' + n.body), n;
  }
  async deserializeResponse(e, r, s) {
    return super.deserializeResponse(e, r, s);
  }
  async handleError(e, r, s, n, i) {
    var _a2, _b2, _c2;
    const o = vh(s, n) ?? "Unknown";
    if (n.Error && typeof n.Error == "object") for (const x of Object.keys(n.Error)) n[x] = n.Error[x], x.toLowerCase() === "message" && (n.message = n.Error[x]);
    n.RequestId && !i.requestId && (i.requestId = n.RequestId);
    const { errorSchema: a, errorMetadata: c } = await this.mixin.getErrorSchemaOrThrowBaseException(o, this.options.defaultNamespace, s, n, i), u = X.of(a), m = ((_a2 = n.Error) == null ? void 0 : _a2.message) ?? ((_b2 = n.Error) == null ? void 0 : _b2.Message) ?? n.message ?? n.Message ?? "Unknown", l = Re.for(a[1]).getErrorCtor(a) ?? Error, h = new l(m);
    await this.deserializeHttpMessage(a, r, s, n);
    const g = {};
    for (const [x, E] of u.structIterator()) {
      const C = E.getMergedTraits().xmlName ?? x, T = ((_c2 = n.Error) == null ? void 0 : _c2[C]) ?? n[C];
      g[x] = this.codec.createDeserializer().readSchema(E, T);
    }
    throw this.mixin.decorateServiceException(Object.assign(h, c, { $fault: u.getMergedTraits().error, message: m }, g), n);
  }
  getDefaultContentType() {
    return "application/xml";
  }
  hasUnstructuredPayloadBinding(e) {
    for (const [, r] of e.structIterator()) if (r.getMergedTraits().httpPayload) return !(r.isStructSchema() || r.isMapSchema() || r.isListSchema());
    return false;
  }
}
const _h = (t, { requestChecksumRequired: e, requestAlgorithmMember: r, requestChecksumCalculation: s }) => r ? t[r] ? t[r] : void 0 : s === Vt.WHEN_SUPPORTED || e ? _n : void 0, ui = (t) => t === W.MD5 ? "content-md5" : `x-amz-checksum-${t.toLowerCase()}`, Bh = (t, e) => {
  const r = t.toLowerCase();
  for (const s of Object.keys(e)) if (r === s.toLowerCase()) return true;
  return false;
}, Ih = (t, e) => {
  const r = t.toLowerCase();
  for (const s of Object.keys(e)) if (s.toLowerCase().startsWith(r)) return true;
  return false;
}, Tc = (t) => t !== void 0 && typeof t != "string" && !ArrayBuffer.isView(t) && !Rc(t);
var Eo = function() {
  return Eo = Object.assign || function(e) {
    for (var r, s = 1, n = arguments.length; s < n; s++) {
      r = arguments[s];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (e[i] = r[i]);
    }
    return e;
  }, Eo.apply(this, arguments);
};
function zb(t, e) {
  var r = {};
  for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && e.indexOf(s) < 0 && (r[s] = t[s]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function") for (var n = 0, s = Object.getOwnPropertySymbols(t); n < s.length; n++) e.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(t, s[n]) && (r[s[n]] = t[s[n]]);
  return r;
}
function di(t, e, r, s) {
  function n(i) {
    return i instanceof r ? i : new r(function(o) {
      o(i);
    });
  }
  return new (r || (r = Promise))(function(i, o) {
    function a(m) {
      try {
        u(s.next(m));
      } catch (l) {
        o(l);
      }
    }
    function c(m) {
      try {
        u(s.throw(m));
      } catch (l) {
        o(l);
      }
    }
    function u(m) {
      m.done ? i(m.value) : n(m.value).then(a, c);
    }
    u((s = s.apply(t, e || [])).next());
  });
}
function li(t, e) {
  var r = { label: 0, sent: function() {
    if (i[0] & 1) throw i[1];
    return i[1];
  }, trys: [], ops: [] }, s, n, i, o = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return o.next = a(0), o.throw = a(1), o.return = a(2), typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function a(u) {
    return function(m) {
      return c([u, m]);
    };
  }
  function c(u) {
    if (s) throw new TypeError("Generator is already executing.");
    for (; o && (o = 0, u[0] && (r = 0)), r; ) try {
      if (s = 1, n && (i = u[0] & 2 ? n.return : u[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, u[1])).done) return i;
      switch (n = 0, i && (u = [u[0] & 2, i.value]), u[0]) {
        case 0:
        case 1:
          i = u;
          break;
        case 4:
          return r.label++, { value: u[1], done: false };
        case 5:
          r.label++, n = u[1], u = [0];
          continue;
        case 7:
          u = r.ops.pop(), r.trys.pop();
          continue;
        default:
          if (i = r.trys, !(i = i.length > 0 && i[i.length - 1]) && (u[0] === 6 || u[0] === 2)) {
            r = 0;
            continue;
          }
          if (u[0] === 3 && (!i || u[1] > i[0] && u[1] < i[3])) {
            r.label = u[1];
            break;
          }
          if (u[0] === 6 && r.label < i[1]) {
            r.label = i[1], i = u;
            break;
          }
          if (i && r.label < i[2]) {
            r.label = i[2], r.ops.push(u);
            break;
          }
          i[2] && r.ops.pop(), r.trys.pop();
          continue;
      }
      u = e.call(t, r);
    } catch (m) {
      u = [6, m], n = 0;
    } finally {
      s = i = 0;
    }
    if (u[0] & 5) throw u[1];
    return { value: u[0] ? u[1] : void 0, done: true };
  }
}
function _c(t) {
  var e = typeof Symbol == "function" && Symbol.iterator, r = e && t[e], s = 0;
  if (r) return r.call(t);
  if (t && typeof t.length == "number") return { next: function() {
    return t && s >= t.length && (t = void 0), { value: t && t[s++], done: !t };
  } };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function jb(t, e, r) {
  if (r || arguments.length === 2) for (var s = 0, n = e.length, i; s < n; s++) (i || !(s in e)) && (i || (i = Array.prototype.slice.call(e, 0, s)), i[s] = e[s]);
  return t.concat(i || Array.prototype.slice.call(e));
}
const Oh = (t) => new TextEncoder().encode(t);
var Mh = typeof Buffer < "u" && Buffer.from ? function(t) {
  return Buffer.from(t, "utf8");
} : Oh;
function ut(t) {
  return t instanceof Uint8Array ? t : typeof t == "string" ? Mh(t) : ArrayBuffer.isView(t) ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(t);
}
function mr(t) {
  return typeof t == "string" ? t.length === 0 : t.byteLength === 0;
}
function Bc(t) {
  return new Uint8Array([(t & 4278190080) >> 24, (t & 16711680) >> 16, (t & 65280) >> 8, t & 255]);
}
function Ic(t) {
  if (!Uint32Array.from) {
    for (var e = new Uint32Array(t.length), r = 0; r < t.length; ) e[r] = t[r], r += 1;
    return e;
  }
  return Uint32Array.from(t);
}
var Ph = (function() {
  function t() {
    this.crc32c = new Co();
  }
  return t.prototype.update = function(e) {
    mr(e) || this.crc32c.update(ut(e));
  }, t.prototype.digest = function() {
    return di(this, void 0, void 0, function() {
      return li(this, function(e) {
        return [2, Bc(this.crc32c.digest())];
      });
    });
  }, t.prototype.reset = function() {
    this.crc32c = new Co();
  }, t;
})(), Co = (function() {
  function t() {
    this.checksum = 4294967295;
  }
  return t.prototype.update = function(e) {
    var r, s;
    try {
      for (var n = _c(e), i = n.next(); !i.done; i = n.next()) {
        var o = i.value;
        this.checksum = this.checksum >>> 8 ^ $h[(this.checksum ^ o) & 255];
      }
    } catch (a) {
      r = { error: a };
    } finally {
      try {
        i && !i.done && (s = n.return) && s.call(n);
      } finally {
        if (r) throw r.error;
      }
    }
    return this;
  }, t.prototype.digest = function() {
    return (this.checksum ^ 4294967295) >>> 0;
  }, t;
})(), Nh = [0, 4067132163, 3778769143, 324072436, 3348797215, 904991772, 648144872, 3570033899, 2329499855, 2024987596, 1809983544, 2575936315, 1296289744, 3207089363, 2893594407, 1578318884, 274646895, 3795141740, 4049975192, 51262619, 3619967088, 632279923, 922689671, 3298075524, 2592579488, 1760304291, 2075979607, 2312596564, 1562183871, 2943781820, 3156637768, 1313733451, 549293790, 3537243613, 3246849577, 871202090, 3878099393, 357341890, 102525238, 4101499445, 2858735121, 1477399826, 1264559846, 3107202533, 1845379342, 2677391885, 2361733625, 2125378298, 820201905, 3263744690, 3520608582, 598981189, 4151959214, 85089709, 373468761, 3827903834, 3124367742, 1213305469, 1526817161, 2842354314, 2107672161, 2412447074, 2627466902, 1861252501, 1098587580, 3004210879, 2688576843, 1378610760, 2262928035, 1955203488, 1742404180, 2511436119, 3416409459, 969524848, 714683780, 3639785095, 205050476, 4266873199, 3976438427, 526918040, 1361435347, 2739821008, 2954799652, 1114974503, 2529119692, 1691668175, 2005155131, 2247081528, 3690758684, 697762079, 986182379, 3366744552, 476452099, 3993867776, 4250756596, 255256311, 1640403810, 2477592673, 2164122517, 1922457750, 2791048317, 1412925310, 1197962378, 3037525897, 3944729517, 427051182, 170179418, 4165941337, 746937522, 3740196785, 3451792453, 1070968646, 1905808397, 2213795598, 2426610938, 1657317369, 3053634322, 1147748369, 1463399397, 2773627110, 4215344322, 153784257, 444234805, 3893493558, 1021025245, 3467647198, 3722505002, 797665321, 2197175160, 1889384571, 1674398607, 2443626636, 1164749927, 3070701412, 2757221520, 1446797203, 137323447, 4198817972, 3910406976, 461344835, 3484808360, 1037989803, 781091935, 3705997148, 2460548119, 1623424788, 1939049696, 2180517859, 1429367560, 2807687179, 3020495871, 1180866812, 410100952, 3927582683, 4182430767, 186734380, 3756733383, 763408580, 1053836080, 3434856499, 2722870694, 1344288421, 1131464017, 2971354706, 1708204729, 2545590714, 2229949006, 1988219213, 680717673, 3673779818, 3383336350, 1002577565, 4010310262, 493091189, 238226049, 4233660802, 2987750089, 1082061258, 1395524158, 2705686845, 1972364758, 2279892693, 2494862625, 1725896226, 952904198, 3399985413, 3656866545, 731699698, 4283874585, 222117402, 510512622, 3959836397, 3280807620, 837199303, 582374963, 3504198960, 68661723, 4135334616, 3844915500, 390545967, 1230274059, 3141532936, 2825850620, 1510247935, 2395924756, 2091215383, 1878366691, 2644384480, 3553878443, 565732008, 854102364, 3229815391, 340358836, 3861050807, 4117890627, 119113024, 1493875044, 2875275879, 3090270611, 1247431312, 2660249211, 1828433272, 2141937292, 2378227087, 3811616794, 291187481, 34330861, 4032846830, 615137029, 3603020806, 3314634738, 939183345, 1776939221, 2609017814, 2295496738, 2058945313, 2926798794, 1545135305, 1330124605, 3173225534, 4084100981, 17165430, 307568514, 3762199681, 888469610, 3332340585, 3587147933, 665062302, 2042050490, 2346497209, 2559330125, 1793573966, 3190661285, 1279665062, 1595330642, 2910671697], $h = Ic(Nh);
const Uh = () => {
  const e = new Array(8);
  for (let r = 0; r < 8; r++) {
    const s = new Array(512);
    for (let n = 0; n < 256; n++) {
      let i = BigInt(n);
      for (let o = 0; o < 8 * (r + 1); o++) i & 1n ? i = i >> 1n ^ 0x9a6c9329ac4bc9b5n : i = i >> 1n;
      s[n * 2] = Number(i >> 32n & 0xffffffffn), s[n * 2 + 1] = Number(i & 0xffffffffn);
    }
    e[r] = new Uint32Array(s);
  }
  return e;
};
let en, nr, Fn, Ln, Hn, zn, jn, Vn, qn;
const Fh = () => {
  en || (en = Uh(), [nr, Fn, Ln, Hn, zn, jn, Vn, qn] = en);
};
class Lh {
  constructor() {
    __publicField(this, "c1", 0);
    __publicField(this, "c2", 0);
    Fh(), this.reset();
  }
  update(e) {
    const r = e.length;
    let s = 0, n = this.c1, i = this.c2;
    for (; s + 8 <= r; ) {
      const o = ((i ^ e[s++]) & 255) << 1, a = ((i >>> 8 ^ e[s++]) & 255) << 1, c = ((i >>> 16 ^ e[s++]) & 255) << 1, u = ((i >>> 24 ^ e[s++]) & 255) << 1, m = ((n ^ e[s++]) & 255) << 1, l = ((n >>> 8 ^ e[s++]) & 255) << 1, h = ((n >>> 16 ^ e[s++]) & 255) << 1, g = ((n >>> 24 ^ e[s++]) & 255) << 1;
      n = qn[o] ^ Vn[a] ^ jn[c] ^ zn[u] ^ Hn[m] ^ Ln[l] ^ Fn[h] ^ nr[g], i = qn[o + 1] ^ Vn[a + 1] ^ jn[c + 1] ^ zn[u + 1] ^ Hn[m + 1] ^ Ln[l + 1] ^ Fn[h + 1] ^ nr[g + 1];
    }
    for (; s < r; ) {
      const o = ((i ^ e[s]) & 255) << 1;
      i = (i >>> 8 | (n & 255) << 24) >>> 0, n = n >>> 8 ^ nr[o], i ^= nr[o + 1], s++;
    }
    this.c1 = n, this.c2 = i;
  }
  async digest() {
    const e = this.c1 ^ 4294967295, r = this.c2 ^ 4294967295;
    return new Uint8Array([e >>> 24, e >>> 16 & 255, e >>> 8 & 255, e & 255, r >>> 24, r >>> 16 & 255, r >>> 8 & 255, r & 255]);
  }
  reset() {
    this.c1 = 4294967295, this.c2 = 4294967295;
  }
}
var Hh = (function() {
  function t() {
    this.crc32 = new Hr();
  }
  return t.prototype.update = function(e) {
    mr(e) || this.crc32.update(ut(e));
  }, t.prototype.digest = function() {
    return di(this, void 0, void 0, function() {
      return li(this, function(e) {
        return [2, Bc(this.crc32.digest())];
      });
    });
  }, t.prototype.reset = function() {
    this.crc32 = new Hr();
  }, t;
})(), Hr = (function() {
  function t() {
    this.checksum = 4294967295;
  }
  return t.prototype.update = function(e) {
    var r, s;
    try {
      for (var n = _c(e), i = n.next(); !i.done; i = n.next()) {
        var o = i.value;
        this.checksum = this.checksum >>> 8 ^ jh[(this.checksum ^ o) & 255];
      }
    } catch (a) {
      r = { error: a };
    } finally {
      try {
        i && !i.done && (s = n.return) && s.call(n);
      } finally {
        if (r) throw r.error;
      }
    }
    return this;
  }, t.prototype.digest = function() {
    return (this.checksum ^ 4294967295) >>> 0;
  }, t;
})(), zh = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117], jh = Ic(zh);
const Vh = () => Hh, Oc = [W.CRC32, W.CRC32C, W.CRC64NVME, W.SHA1, W.SHA256], qh = [W.SHA256, W.SHA1, W.CRC32, W.CRC32C, W.CRC64NVME], Mc = (t, e) => {
  const { checksumAlgorithms: r = {} } = e;
  switch (t) {
    case W.MD5:
      return (r == null ? void 0 : r.MD5) ?? e.md5;
    case W.CRC32:
      return (r == null ? void 0 : r.CRC32) ?? Vh();
    case W.CRC32C:
      return (r == null ? void 0 : r.CRC32C) ?? Ph;
    case W.CRC64NVME:
      return (r == null ? void 0 : r.CRC64NVME) ?? Lh;
    case W.SHA1:
      return (r == null ? void 0 : r.SHA1) ?? e.sha1;
    case W.SHA256:
      return (r == null ? void 0 : r.SHA256) ?? e.sha256;
    default:
      if (r == null ? void 0 : r[t]) return r[t];
      throw new Error(`The checksum algorithm "${t}" is not supported by the client. Select one of ${Oc}, or provide an implementation to  the client constructor checksums field.`);
  }
}, Pc = (t, e) => {
  const r = new t();
  return r.update(Gt(e || "")), r.digest();
}, Gh = { name: "flexibleChecksumsMiddleware", step: "build", tags: ["BODY_CHECKSUM"], override: true }, Wh = (t, e) => (r, s) => async (n) => {
  if (!ee.isInstance(n.request) || Ih("x-amz-checksum-", n.request.headers)) return r(n);
  const { request: i, input: o } = n, { body: a, headers: c } = i, { base64Encoder: u, streamHasher: m } = t, { requestChecksumRequired: l, requestAlgorithmMember: h } = e, g = await t.requestChecksumCalculation(), x = h == null ? void 0 : h.name, E = h == null ? void 0 : h.httpHeader;
  x && !o[x] && (g === Vt.WHEN_SUPPORTED || l) && (o[x] = _n, E && (c[E] = _n));
  const C = _h(o, { requestChecksumRequired: l, requestAlgorithmMember: h == null ? void 0 : h.name, requestChecksumCalculation: g });
  let T = a, R = c;
  if (C) {
    switch (C) {
      case W.CRC32:
        se(s, "FLEXIBLE_CHECKSUMS_REQ_CRC32", "U");
        break;
      case W.CRC32C:
        se(s, "FLEXIBLE_CHECKSUMS_REQ_CRC32C", "V");
        break;
      case W.CRC64NVME:
        se(s, "FLEXIBLE_CHECKSUMS_REQ_CRC64", "W");
        break;
      case W.SHA1:
        se(s, "FLEXIBLE_CHECKSUMS_REQ_SHA1", "X");
        break;
      case W.SHA256:
        se(s, "FLEXIBLE_CHECKSUMS_REQ_SHA256", "Y");
        break;
    }
    const O = ui(C), N = Mc(C, t);
    if (Tc(a)) {
      const { getAwsChunkedEncodingStream: q, bodyLengthChecker: te } = t;
      T = q(typeof t.requestStreamBufferSize == "number" && t.requestStreamBufferSize >= 8 * 1024 ? Dl(a, t.requestStreamBufferSize, s.logger) : a, { base64Encoder: u, bodyLengthChecker: te, checksumLocationName: O, checksumAlgorithmFn: N, streamHasher: m }), R = { ...c, "content-encoding": c["content-encoding"] ? `${c["content-encoding"]},aws-chunked` : "aws-chunked", "transfer-encoding": "chunked", "x-amz-decoded-content-length": c["content-length"], "x-amz-content-sha256": "STREAMING-UNSIGNED-PAYLOAD-TRAILER", "x-amz-trailer": O }, delete R["content-length"];
    } else if (!Bh(O, c)) {
      const q = await Pc(N, a);
      R = { ...c, [O]: u(q) };
    }
  }
  try {
    return await r({ ...n, request: { ...i, headers: R, body: T } });
  } catch (O) {
    if (O instanceof Error && O.name === "InvalidChunkSizeError") try {
      O.message.endsWith(".") || (O.message += "."), O.message += " Set [requestStreamBufferSize=number e.g. 65_536] in client constructor to instruct AWS SDK to buffer your input stream.";
    } catch {
    }
    throw O;
  }
}, Kh = { name: "flexibleChecksumsInputMiddleware", toMiddleware: "serializerMiddleware", relation: "before", tags: ["BODY_CHECKSUM"], override: true }, Xh = (t, e) => (r, s) => async (n) => {
  const i = n.input, { requestValidationModeMember: o } = e, a = await t.requestChecksumCalculation(), c = await t.responseChecksumValidation();
  switch (a) {
    case Vt.WHEN_REQUIRED:
      se(s, "FLEXIBLE_CHECKSUMS_REQ_WHEN_REQUIRED", "a");
      break;
    case Vt.WHEN_SUPPORTED:
      se(s, "FLEXIBLE_CHECKSUMS_REQ_WHEN_SUPPORTED", "Z");
      break;
  }
  switch (c) {
    case Ls.WHEN_REQUIRED:
      se(s, "FLEXIBLE_CHECKSUMS_RES_WHEN_REQUIRED", "c");
      break;
    case Ls.WHEN_SUPPORTED:
      se(s, "FLEXIBLE_CHECKSUMS_RES_WHEN_SUPPORTED", "b");
      break;
  }
  return o && !i[o] && c === Ls.WHEN_SUPPORTED && (i[o] = "ENABLED"), r(n);
}, Nc = (t = []) => {
  const e = [];
  for (const r of qh) !t.includes(r) || !Oc.includes(r) || e.push(r);
  return e;
}, Zh = (t) => {
  const e = t.lastIndexOf("-");
  if (e !== -1) {
    const r = t.slice(e + 1);
    if (!r.startsWith("0")) {
      const s = parseInt(r, 10);
      if (!isNaN(s) && s >= 1 && s <= 1e4) return true;
    }
  }
  return false;
}, Qh = async (t, { checksumAlgorithmFn: e, base64Encoder: r }) => r(await Pc(e, t)), Jh = async (t, { config: e, responseAlgorithms: r, logger: s }) => {
  const n = Nc(r), { body: i, headers: o } = t;
  for (const a of n) {
    const c = ui(a), u = o[c];
    if (u) {
      let m;
      try {
        m = Mc(a, e);
      } catch (g) {
        if (a === W.CRC64NVME) {
          s == null ? void 0 : s.warn(`Skipping ${W.CRC64NVME} checksum validation: ${g.message}`);
          continue;
        }
        throw g;
      }
      const { base64Encoder: l } = e;
      if (Tc(i)) {
        t.body = Rl({ expectedChecksum: u, checksumSourceLocation: c, checksum: new m(), source: i, base64Encoder: l });
        return;
      }
      const h = await Qh(i, { checksumAlgorithmFn: m, base64Encoder: l });
      if (h === u) break;
      throw new Error(`Checksum mismatch: expected "${h}" but received "${u}" in response header "${c}".`);
    }
  }
}, Yh = { name: "flexibleChecksumsResponseMiddleware", toMiddleware: "deserializerMiddleware", relation: "after", tags: ["BODY_CHECKSUM"], override: true }, ep = (t, e) => (r, s) => async (n) => {
  if (!ee.isInstance(n.request)) return r(n);
  const i = n.input, o = await r(n), a = o.response, { requestValidationModeMember: c, responseAlgorithms: u } = e;
  if (c && i[c] === "ENABLED") {
    const { clientName: m, commandName: l } = s;
    if (m === "S3Client" && l === "GetObjectCommand" && Nc(u).every((g) => {
      const x = ui(g), E = a.headers[x];
      return !E || Zh(E);
    })) return o;
    await Jh(a, { config: t, responseAlgorithms: u, logger: s.logger });
  }
  return o;
}, fi = (t, e) => ({ applyToStack: (r) => {
  r.add(Wh(t, e), Gh), r.addRelativeTo(Xh(t, e), Kh), r.addRelativeTo(ep(t, e), Yh);
} }), tp = (t) => {
  const { requestChecksumCalculation: e, responseChecksumValidation: r, requestStreamBufferSize: s } = t;
  return Object.assign(t, { requestChecksumCalculation: Ne(e ?? ol), responseChecksumValidation: Ne(r ?? al), requestStreamBufferSize: Number(s ?? 0), checksumAlgorithms: t.checksumAlgorithms ?? {} });
};
const rp = (t) => (e) => async (r) => {
  if (!ee.isInstance(r.request)) return e(r);
  const { request: s } = r, { handlerProtocol: n = "" } = t.requestHandler.metadata || {};
  if (n.indexOf("h2") >= 0 && !s.headers[":authority"]) delete s.headers.host, s.headers[":authority"] = s.hostname + (s.port ? ":" + s.port : "");
  else if (!s.headers.host) {
    let i = s.hostname;
    s.port != null && (i += `:${s.port}`), s.headers.host = i;
  }
  return e(r);
}, sp = { name: "hostHeaderMiddleware", step: "build", priority: "low", tags: ["HOST"], override: true }, np = (t) => ({ applyToStack: (e) => {
  e.add(rp(t), sp);
} }), ip = () => (t, e) => async (r) => {
  var _a2, _b2;
  try {
    const s = await t(r), { clientName: n, commandName: i, logger: o, dynamoDbDocumentClientOptions: a = {} } = e, { overrideInputFilterSensitiveLog: c, overrideOutputFilterSensitiveLog: u } = a, m = c ?? e.inputFilterSensitiveLog, l = u ?? e.outputFilterSensitiveLog, { $metadata: h, ...g } = s.output;
    return (_a2 = o == null ? void 0 : o.info) == null ? void 0 : _a2.call(o, { clientName: n, commandName: i, input: m(r.input), output: l(g), metadata: h }), s;
  } catch (s) {
    const { clientName: n, commandName: i, logger: o, dynamoDbDocumentClientOptions: a = {} } = e, { overrideInputFilterSensitiveLog: c } = a, u = c ?? e.inputFilterSensitiveLog;
    throw (_b2 = o == null ? void 0 : o.error) == null ? void 0 : _b2.call(o, { clientName: n, commandName: i, input: u(r.input), error: s, metadata: s.$metadata }), s;
  }
}, op = { name: "loggerMiddleware", tags: ["LOGGER"], step: "initialize", override: true }, ap = (t) => ({ applyToStack: (e) => {
  e.add(ip(), op);
} }), cp = { step: "build", tags: ["RECURSION_DETECTION"], name: "recursionDetectionMiddleware", override: true, priority: "low" }, up = () => (t) => async (e) => t(e), dp = (t) => ({ applyToStack: (e) => {
  e.add(up(), cp);
} }), lp = "content-length", fp = "x-amz-decoded-content-length";
function hp() {
  return (t, e) => async (r) => {
    var _a2;
    const { request: s } = r;
    if (ee.isInstance(s) && !(lp in s.headers) && !(fp in s.headers)) {
      const n = "Are you using a Stream of unknown length as the Body of a PutObject request? Consider using Upload instead from @aws-sdk/lib-storage.";
      typeof ((_a2 = e == null ? void 0 : e.logger) == null ? void 0 : _a2.warn) == "function" && !(e.logger instanceof ai) ? e.logger.warn(n) : console.warn(n);
    }
    return t({ ...r });
  };
}
const pp = { step: "finalizeRequest", tags: ["CHECK_CONTENT_LENGTH_HEADER"], name: "getCheckContentLengthHeaderPlugin", override: true }, mp = (t) => ({ applyToStack: (e) => {
  e.add(hp(), pp);
} }), gp = (t) => (e, r) => async (s) => {
  const n = await t.region(), i = t.region;
  let o = () => {
  };
  r.__s3RegionRedirect && (Object.defineProperty(t, "region", { writable: false, value: async () => r.__s3RegionRedirect }), o = () => Object.defineProperty(t, "region", { writable: true, value: i }));
  try {
    const a = await e(s);
    if (r.__s3RegionRedirect) {
      o();
      const c = await t.region();
      if (n !== c) throw new Error("Region was not restored following S3 region redirect.");
    }
    return a;
  } catch (a) {
    throw o(), a;
  }
}, yp = { tags: ["REGION_REDIRECT", "S3"], name: "regionRedirectEndpointMiddleware", override: true, relation: "before", toMiddleware: "endpointV2Middleware" };
function Sp(t) {
  return (e, r) => async (s) => {
    var _a2, _b2, _c2, _d2;
    try {
      return await e(s);
    } catch (n) {
      if (t.followRegionRedirects) {
        const i = (_a2 = n == null ? void 0 : n.$metadata) == null ? void 0 : _a2.httpStatusCode, o = r.commandName === "HeadBucketCommand", a = (_c2 = (_b2 = n == null ? void 0 : n.$response) == null ? void 0 : _b2.headers) == null ? void 0 : _c2["x-amz-bucket-region"];
        if (a && (i === 301 || i === 400 && ((n == null ? void 0 : n.name) === "IllegalLocationConstraintException" || o))) {
          try {
            const c = a;
            (_d2 = r.logger) == null ? void 0 : _d2.debug(`Redirecting from ${await t.region()} to ${c}`), r.__s3RegionRedirect = c;
          } catch (c) {
            throw new Error("Region redirect failed: " + c);
          }
          return e(s);
        }
      }
      throw n;
    }
  };
}
const xp = { step: "initialize", tags: ["REGION_REDIRECT", "S3"], name: "regionRedirectMiddleware", override: true }, bp = (t) => ({ applyToStack: (e) => {
  e.add(Sp(t), xp), e.addRelativeTo(gp(t), yp);
} }), wp = (t) => (e, r) => async (s) => {
  var _a2;
  const n = await e(s), { response: i } = n;
  if (ct.isInstance(i) && i.headers.expires) {
    i.headers.expiresstring = i.headers.expires;
    try {
      nf(i.headers.expires);
    } catch (o) {
      (_a2 = r.logger) == null ? void 0 : _a2.warn(`AWS SDK Warning for ${r.clientName}::${r.commandName} response parsing (${i.headers.expires}): ${o}`), delete i.headers.expires;
    }
  }
  return n;
}, Ep = { tags: ["S3"], name: "s3ExpiresMiddleware", override: true, relation: "after", toMiddleware: "deserializerMiddleware" }, $c = (t) => ({ applyToStack: (e) => {
  e.addRelativeTo(wp(), Ep);
} });
const _hi = class _hi {
  constructor(e = {}) {
    __publicField(this, "data");
    __publicField(this, "lastPurgeTime", Date.now());
    this.data = e;
  }
  get(e) {
    const r = this.data[e];
    if (r) return r;
  }
  set(e, r) {
    return this.data[e] = r, r;
  }
  delete(e) {
    delete this.data[e];
  }
  async purgeExpired() {
    const e = Date.now();
    if (!(this.lastPurgeTime + _hi.EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS > e)) for (const r in this.data) {
      const s = this.data[r];
      if (!s.isRefreshing) {
        const n = await s.identity;
        n.expiration && n.expiration.getTime() < e && delete this.data[r];
      }
    }
  }
};
__publicField(_hi, "EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS", 3e4);
let hi = _hi;
class tn {
  constructor(e, r = false, s = Date.now()) {
    __publicField(this, "_identity");
    __publicField(this, "isRefreshing");
    __publicField(this, "accessed");
    this._identity = e, this.isRefreshing = r, this.accessed = s;
  }
  get identity() {
    return this.accessed = Date.now(), this._identity;
  }
}
const _pi = class _pi {
  constructor(e, r = new hi()) {
    __publicField(this, "createSessionFn");
    __publicField(this, "cache");
    this.createSessionFn = e, this.cache = r;
  }
  async getS3ExpressIdentity(e, r) {
    const s = r.Bucket, { cache: n } = this, i = n.get(s);
    return i ? i.identity.then((o) => {
      var _a2, _b2;
      return (((_a2 = o.expiration) == null ? void 0 : _a2.getTime()) ?? 0) < Date.now() ? n.set(s, new tn(this.getIdentity(s))).identity : ((((_b2 = o.expiration) == null ? void 0 : _b2.getTime()) ?? 0) < Date.now() + _pi.REFRESH_WINDOW_MS && !i.isRefreshing && (i.isRefreshing = true, this.getIdentity(s).then((u) => {
        n.set(s, new tn(Promise.resolve(u)));
      })), o);
    }) : n.set(s, new tn(this.getIdentity(s))).identity;
  }
  async getIdentity(e) {
    var _a2, _b2;
    await this.cache.purgeExpired().catch((n) => {
      console.warn(`Error while clearing expired entries in S3ExpressIdentityCache: 
` + n);
    });
    const r = await this.createSessionFn(e);
    if (!((_a2 = r.Credentials) == null ? void 0 : _a2.AccessKeyId) || !((_b2 = r.Credentials) == null ? void 0 : _b2.SecretAccessKey)) throw new Error("s3#createSession response credential missing AccessKeyId or SecretAccessKey.");
    return { accessKeyId: r.Credentials.AccessKeyId, secretAccessKey: r.Credentials.SecretAccessKey, sessionToken: r.Credentials.SessionToken, expiration: r.Credentials.Expiration ? new Date(r.Credentials.Expiration) : void 0 };
  }
};
__publicField(_pi, "REFRESH_WINDOW_MS", 6e4);
let pi = _pi;
const Cp = "Directory", Ap = "S3Express", Rp = "sigv4-s3express", Gn = "X-Amz-S3session-Token", Wn = Gn.toLowerCase();
class vp extends Nn {
  async signWithCredentials(e, r, s) {
    const n = Ao(r);
    e.headers[Wn] = r.sessionToken;
    const i = this;
    return Ro(i, n), i.signRequest(e, s ?? {});
  }
  async presignWithCredentials(e, r, s) {
    const n = Ao(r);
    return delete e.headers[Wn], e.headers[Gn] = r.sessionToken, e.query = e.query ?? {}, e.query[Gn] = r.sessionToken, Ro(this, n), this.presign(e, s);
  }
}
function Ao(t) {
  return { accessKeyId: t.accessKeyId, secretAccessKey: t.secretAccessKey, expiration: t.expiration };
}
function Ro(t, e) {
  const r = setTimeout(() => {
    throw new Error("SignatureV4S3Express credential override was created but not called.");
  }, 10), s = t.credentialProvider, n = () => (clearTimeout(r), t.credentialProvider = s, Promise.resolve(e));
  t.credentialProvider = n;
}
const kp = (t) => (e, r) => async (s) => {
  var _a2, _b2, _c2, _d2, _e2;
  if (r.endpointV2) {
    const n = r.endpointV2, i = ((_c2 = (_b2 = (_a2 = n.properties) == null ? void 0 : _a2.authSchemes) == null ? void 0 : _b2[0]) == null ? void 0 : _c2.name) === Rp;
    if ((((_d2 = n.properties) == null ? void 0 : _d2.backend) === Ap || ((_e2 = n.properties) == null ? void 0 : _e2.bucketType) === Cp) && (se(r, "S3_EXPRESS_BUCKET", "J"), r.isS3ExpressBucket = true), i) {
      const a = s.input.Bucket;
      if (a) {
        const c = await t.s3ExpressIdentityProvider.getS3ExpressIdentity(await t.credentials(), { Bucket: a });
        r.s3ExpressIdentity = c, ee.isInstance(s.request) && c.sessionToken && (s.request.headers[Wn] = c.sessionToken);
      }
    }
  }
  return e(s);
}, Dp = { name: "s3ExpressMiddleware", step: "build", tags: ["S3", "S3_EXPRESS"], override: true }, Tp = (t) => ({ applyToStack: (e) => {
  e.add(kp(t), Dp);
} }), _p = async (t, e, r, s) => {
  const n = await s.signWithCredentials(r, t, {});
  if (n.headers["X-Amz-Security-Token"] || n.headers["x-amz-security-token"]) throw new Error("X-Amz-Security-Token must not be set for s3-express requests.");
  return n;
}, Bp = (t) => (e) => {
  throw e;
}, Ip = (t, e) => {
}, Op = (t) => (e, r) => async (s) => {
  if (!ee.isInstance(s.request)) return e(s);
  const i = ft(r).selectedHttpAuthScheme;
  if (!i) throw new Error("No HttpAuthScheme was selected: unable to sign request");
  const { httpAuthOption: { signingProperties: o = {} }, identity: a, signer: c } = i;
  let u;
  r.s3ExpressIdentity ? u = await _p(r.s3ExpressIdentity, o, s.request, await t.signer()) : u = await c.sign(s.request, a, o);
  const m = await e({ ...s, request: u }).catch((c.errorHandler || Bp)(o));
  return (c.successHandler || Ip)(m.response, o), m;
}, Mp = (t) => ({ applyToStack: (e) => {
  e.addRelativeTo(Op(t), ic);
} }), Pp = (t, { session: e }) => {
  const [r, s] = e, { forcePathStyle: n, useAccelerateEndpoint: i, disableMultiregionAccessPoints: o, followRegionRedirects: a, s3ExpressIdentityProvider: c, bucketEndpoint: u, expectContinueHeader: m } = t;
  return Object.assign(t, { forcePathStyle: n ?? false, useAccelerateEndpoint: i ?? false, disableMultiregionAccessPoints: o ?? false, followRegionRedirects: a ?? false, s3ExpressIdentityProvider: c ?? new pi(async (l) => r().send(new s({ Bucket: l }))), bucketEndpoint: u ?? false, expectContinueHeader: m ?? 2097152 });
}, Np = { CopyObjectCommand: true, UploadPartCopyCommand: true, CompleteMultipartUploadCommand: true }, $p = 3e3, Up = (t) => (e, r) => async (s) => {
  const n = await e(s), { response: i } = n;
  if (!ct.isInstance(i)) return n;
  const { statusCode: o, body: a } = i;
  if (o < 200 || o >= 300 || !(typeof (a == null ? void 0 : a.stream) == "function" || typeof (a == null ? void 0 : a.pipe) == "function" || typeof (a == null ? void 0 : a.tee) == "function")) return n;
  let u = a, m = a;
  a && typeof a == "object" && !(a instanceof Uint8Array) && ([u, m] = await Ul(a)), i.body = m;
  const l = await Fp(u, { streamCollector: async (g) => Il(g, $p) });
  typeof (u == null ? void 0 : u.destroy) == "function" && u.destroy();
  const h = t.utf8Encoder(l.subarray(l.length - 16));
  if (l.length === 0 && Np[r.commandName]) {
    const g = new Error("S3 aborted request");
    throw g.name = "InternalError", g;
  }
  return h && h.endsWith("</Error>") && (i.statusCode = 400), n;
}, Fp = (t = new Uint8Array(), e) => t instanceof Uint8Array ? Promise.resolve(t) : e.streamCollector(t) || Promise.resolve(new Uint8Array()), Lp = { relation: "after", toMiddleware: "deserializerMiddleware", tags: ["THROW_200_EXCEPTIONS", "S3"], name: "throw200ExceptionsMiddleware", override: true }, Je = (t) => ({ applyToStack: (e) => {
  e.addRelativeTo(Up(t), Lp);
} }), Hp = (t) => typeof t == "string" && t.indexOf("arn:") === 0 && t.split(":").length >= 6;
function zp(t) {
  return (e, r) => async (s) => {
    var _a2, _b2, _c2, _d2;
    if (t.bucketEndpoint) {
      const n = r.endpointV2;
      if (n) {
        const i = s.input.Bucket;
        if (typeof i == "string") try {
          const o = new URL(i);
          r.endpointV2 = { ...n, url: o };
        } catch (o) {
          const a = `@aws-sdk/middleware-sdk-s3: bucketEndpoint=true was set but Bucket=${i} could not be parsed as URL.`;
          throw ((_b2 = (_a2 = r.logger) == null ? void 0 : _a2.constructor) == null ? void 0 : _b2.name) === "NoOpLogger" ? console.warn(a) : (_d2 = (_c2 = r.logger) == null ? void 0 : _c2.warn) == null ? void 0 : _d2.call(_c2, a), o;
        }
      }
    }
    return e(s);
  };
}
const jp = { name: "bucketEndpointMiddleware", override: true, relation: "after", toMiddleware: "endpointV2Middleware" };
function Vp({ bucketEndpoint: t }) {
  return (e) => async (r) => {
    const { input: { Bucket: s } } = r;
    if (!t && typeof s == "string" && !Hp(s) && s.indexOf("/") >= 0) {
      const n = new Error(`Bucket name shouldn't contain '/', received '${s}'`);
      throw n.name = "InvalidBucketName", n;
    }
    return e({ ...r });
  };
}
const qp = { step: "initialize", tags: ["VALIDATE_BUCKET_NAME"], name: "validateBucketNameMiddleware", override: true }, Gp = (t) => ({ applyToStack: (e) => {
  e.add(Vp(t), qp), e.addRelativeTo(zp(t), jp);
} }), Wp = void 0;
function Kp(t) {
  return t === void 0 ? true : typeof t == "string" && t.length <= 50;
}
function Xp(t) {
  const e = Ht(t.userAgentAppId ?? Wp), { customUserAgent: r } = t;
  return Object.assign(t, { customUserAgent: typeof r == "string" ? [[r]] : r, userAgentAppId: async () => {
    var _a2, _b2;
    const s = await e();
    if (!Kp(s)) {
      const n = ((_b2 = (_a2 = t.logger) == null ? void 0 : _a2.constructor) == null ? void 0 : _b2.name) === "NoOpLogger" || !t.logger ? console : t.logger;
      typeof s != "string" ? n == null ? void 0 : n.warn("userAgentAppId must be a string or undefined.") : s.length > 50 && (n == null ? void 0 : n.warn("The provided userAgentAppId exceeds the maximum length of 50 characters."));
    }
    return s;
  } });
}
class Zp {
  constructor({ size: e, params: r }) {
    __publicField(this, "capacity");
    __publicField(this, "data", /* @__PURE__ */ new Map());
    __publicField(this, "parameters", []);
    this.capacity = e ?? 50, r && (this.parameters = r);
  }
  get(e, r) {
    const s = this.hash(e);
    if (s === false) return r();
    if (!this.data.has(s)) {
      if (this.data.size > this.capacity + 10) {
        const n = this.data.keys();
        let i = 0;
        for (; ; ) {
          const { value: o, done: a } = n.next();
          if (this.data.delete(o), a || ++i > 10) break;
        }
      }
      this.data.set(s, r());
    }
    return this.data.get(s);
  }
  size() {
    return this.data.size;
  }
  hash(e) {
    let r = "";
    const { parameters: s } = this;
    if (s.length === 0) return false;
    for (const n of s) {
      const i = String(e[n] ?? "");
      if (i.includes("|;")) return false;
      r += i + "|;";
    }
    return r;
  }
}
const Qp = new RegExp("^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$"), Uc = (t) => Qp.test(t) || t.startsWith("[") && t.endsWith("]"), Jp = new RegExp("^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$"), Yr = (t, e = false) => {
  if (!e) return Jp.test(t);
  const r = t.split(".");
  for (const s of r) if (!Yr(s)) return false;
  return true;
}, zr = {}, gr = "endpoints";
function dt(t) {
  return typeof t != "object" || t == null ? t : "ref" in t ? `$${dt(t.ref)}` : "fn" in t ? `${t.fn}(${(t.argv || []).map(dt).join(", ")})` : JSON.stringify(t, null, 2);
}
class Be extends Error {
  constructor(e) {
    super(e), this.name = "EndpointError";
  }
}
const Yp = (t, e) => t === e, em = (t) => {
  const e = t.split("."), r = [];
  for (const s of e) {
    const n = s.indexOf("[");
    if (n !== -1) {
      if (s.indexOf("]") !== s.length - 1) throw new Be(`Path: '${t}' does not end with ']'`);
      const i = s.slice(n + 1, -1);
      if (Number.isNaN(parseInt(i))) throw new Be(`Invalid array index: '${i}' in path: '${t}'`);
      n !== 0 && r.push(s.slice(0, n)), r.push(i);
    } else r.push(s);
  }
  return r;
}, Fc = (t, e) => em(e).reduce((r, s) => {
  if (typeof r != "object") throw new Be(`Index '${s}' in '${e}' not found in '${JSON.stringify(t)}'`);
  return Array.isArray(r) ? r[parseInt(s)] : r[s];
}, t), tm = (t) => t != null, rm = (t) => !t, rn = { [hr.HTTP]: 80, [hr.HTTPS]: 443 }, sm = (t) => {
  const e = (() => {
    try {
      if (t instanceof URL) return t;
      if (typeof t == "object" && "hostname" in t) {
        const { hostname: h, port: g, protocol: x = "", path: E = "", query: C = {} } = t, T = new URL(`${x}//${h}${g ? `:${g}` : ""}${E}`);
        return T.search = Object.entries(C).map(([R, O]) => `${R}=${O}`).join("&"), T;
      }
      return new URL(t);
    } catch {
      return null;
    }
  })();
  if (!e) return console.error(`Unable to parse ${JSON.stringify(t)} as a whatwg URL.`), null;
  const r = e.href, { host: s, hostname: n, pathname: i, protocol: o, search: a } = e;
  if (a) return null;
  const c = o.slice(0, -1);
  if (!Object.values(hr).includes(c)) return null;
  const u = Uc(n), m = r.includes(`${s}:${rn[c]}`) || typeof t == "string" && t.includes(`${s}:${rn[c]}`), l = `${s}${m ? `:${rn[c]}` : ""}`;
  return { scheme: c, authority: l, path: i, normalizedPath: i.endsWith("/") ? i : `${i}/`, isIp: u };
}, nm = (t, e) => t === e, im = (t, e, r, s) => e >= r || t.length < r || /[^\u0000-\u007f]/.test(t) ? null : s ? t.substring(t.length - r, t.length - e) : t.substring(e, r), om = (t) => encodeURIComponent(t).replace(/[!*'()]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), am = { booleanEquals: Yp, getAttr: Fc, isSet: tm, isValidHostLabel: Yr, not: rm, parseURL: sm, stringEquals: nm, substring: im, uriEncode: om }, Lc = (t, e) => {
  const r = [], s = { ...e.endpointParams, ...e.referenceRecord };
  let n = 0;
  for (; n < t.length; ) {
    const i = t.indexOf("{", n);
    if (i === -1) {
      r.push(t.slice(n));
      break;
    }
    r.push(t.slice(n, i));
    const o = t.indexOf("}", i);
    if (o === -1) {
      r.push(t.slice(i));
      break;
    }
    t[i + 1] === "{" && t[o + 1] === "}" && (r.push(t.slice(i + 1, o)), n = o + 2);
    const a = t.substring(i + 1, o);
    if (a.includes("#")) {
      const [c, u] = a.split("#");
      r.push(Fc(s[c], u));
    } else r.push(s[a]);
    n = o + 1;
  }
  return r.join("");
}, cm = ({ ref: t }, e) => ({ ...e.endpointParams, ...e.referenceRecord })[t], es = (t, e, r) => {
  if (typeof t == "string") return Lc(t, r);
  if (t.fn) return zc.callFunction(t, r);
  if (t.ref) return cm(t, r);
  throw new Be(`'${e}': ${String(t)} is not a string, function or reference.`);
}, Hc = ({ fn: t, argv: e }, r) => {
  const s = e.map((i) => ["boolean", "number"].includes(typeof i) ? i : zc.evaluateExpression(i, "arg", r)), n = t.split(".");
  return n[0] in zr && n[1] != null ? zr[n[0]][n[1]](...s) : am[t](...s);
}, zc = { evaluateExpression: es, callFunction: Hc }, um = ({ assign: t, ...e }, r) => {
  var _a2, _b2;
  if (t && t in r.referenceRecord) throw new Be(`'${t}' is already defined in Reference Record.`);
  const s = Hc(e, r);
  return (_b2 = (_a2 = r.logger) == null ? void 0 : _a2.debug) == null ? void 0 : _b2.call(_a2, `${gr} evaluateCondition: ${dt(e)} = ${dt(s)}`), { result: s === "" ? true : !!s, ...t != null && { toAssign: { name: t, value: s } } };
}, mi = (t = [], e) => {
  var _a2, _b2;
  const r = {};
  for (const s of t) {
    const { result: n, toAssign: i } = um(s, { ...e, referenceRecord: { ...e.referenceRecord, ...r } });
    if (!n) return { result: n };
    i && (r[i.name] = i.value, (_b2 = (_a2 = e.logger) == null ? void 0 : _a2.debug) == null ? void 0 : _b2.call(_a2, `${gr} assign: ${i.name} := ${dt(i.value)}`));
  }
  return { result: true, referenceRecord: r };
}, dm = (t, e) => Object.entries(t).reduce((r, [s, n]) => ({ ...r, [s]: n.map((i) => {
  const o = es(i, "Header value entry", e);
  if (typeof o != "string") throw new Be(`Header '${s}' value '${o}' is not a string`);
  return o;
}) }), {}), jc = (t, e) => Object.entries(t).reduce((r, [s, n]) => ({ ...r, [s]: qc.getEndpointProperty(n, e) }), {}), Vc = (t, e) => {
  if (Array.isArray(t)) return t.map((r) => Vc(r, e));
  switch (typeof t) {
    case "string":
      return Lc(t, e);
    case "object":
      if (t === null) throw new Be(`Unexpected endpoint property: ${t}`);
      return qc.getEndpointProperties(t, e);
    case "boolean":
      return t;
    default:
      throw new Be(`Unexpected endpoint property type: ${typeof t}`);
  }
}, qc = { getEndpointProperty: Vc, getEndpointProperties: jc }, lm = (t, e) => {
  const r = es(t, "Endpoint URL", e);
  if (typeof r == "string") try {
    return new URL(r);
  } catch (s) {
    throw console.error(`Failed to construct URL with ${r}`, s), s;
  }
  throw new Be(`Endpoint URL must be a string, got ${typeof r}`);
}, fm = (t, e) => {
  var _a2, _b2;
  const { conditions: r, endpoint: s } = t, { result: n, referenceRecord: i } = mi(r, e);
  if (!n) return;
  const o = { ...e, referenceRecord: { ...e.referenceRecord, ...i } }, { url: a, properties: c, headers: u } = s;
  return (_b2 = (_a2 = e.logger) == null ? void 0 : _a2.debug) == null ? void 0 : _b2.call(_a2, `${gr} Resolving endpoint from template: ${dt(s)}`), { ...u != null && { headers: dm(u, o) }, ...c != null && { properties: jc(c, o) }, url: lm(a, o) };
}, hm = (t, e) => {
  const { conditions: r, error: s } = t, { result: n, referenceRecord: i } = mi(r, e);
  if (n) throw new Be(es(s, "Error", { ...e, referenceRecord: { ...e.referenceRecord, ...i } }));
}, Gc = (t, e) => {
  for (const r of t) if (r.type === "endpoint") {
    const s = fm(r, e);
    if (s) return s;
  } else if (r.type === "error") hm(r, e);
  else if (r.type === "tree") {
    const s = Wc.evaluateTreeRule(r, e);
    if (s) return s;
  } else throw new Be(`Unknown endpoint rule: ${r}`);
  throw new Be("Rules evaluation failed");
}, pm = (t, e) => {
  const { conditions: r, rules: s } = t, { result: n, referenceRecord: i } = mi(r, e);
  if (n) return Wc.evaluateRules(s, { ...e, referenceRecord: { ...e.referenceRecord, ...i } });
}, Wc = { evaluateRules: Gc, evaluateTreeRule: pm }, mm = (t, e) => {
  var _a2, _b2, _c2, _d2;
  const { endpointParams: r, logger: s } = e, { parameters: n, rules: i } = t;
  (_b2 = (_a2 = e.logger) == null ? void 0 : _a2.debug) == null ? void 0 : _b2.call(_a2, `${gr} Initial EndpointParams: ${dt(r)}`);
  const o = Object.entries(n).filter(([, u]) => u.default != null).map(([u, m]) => [u, m.default]);
  if (o.length > 0) for (const [u, m] of o) r[u] = r[u] ?? m;
  const a = Object.entries(n).filter(([, u]) => u.required).map(([u]) => u);
  for (const u of a) if (r[u] == null) throw new Be(`Missing required parameter: '${u}'`);
  const c = Gc(i, { endpointParams: r, logger: s, referenceRecord: {} });
  return (_d2 = (_c2 = e.logger) == null ? void 0 : _c2.debug) == null ? void 0 : _d2.call(_c2, `${gr} Resolved endpoint: ${dt(c)}`), c;
}, Kc = (t, e = false) => {
  if (e) {
    for (const r of t.split(".")) if (!Kc(r)) return false;
    return true;
  }
  return !(!Yr(t) || t.length < 3 || t.length > 63 || t !== t.toLowerCase() || Uc(t));
}, vo = ":", gm = "/", ym = (t) => {
  const e = t.split(vo);
  if (e.length < 6) return null;
  const [r, s, n, i, o, ...a] = e;
  if (r !== "arn" || s === "" || n === "" || a.join(vo) === "") return null;
  const c = a.map((u) => u.split(gm)).flat();
  return { partition: s, service: n, region: i, accountId: o, resourceId: c };
}, Sm = [{ id: "aws", outputs: { dnsSuffix: "amazonaws.com", dualStackDnsSuffix: "api.aws", implicitGlobalRegion: "us-east-1", name: "aws", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^(us|eu|ap|sa|ca|me|af|il|mx)\\-\\w+\\-\\d+$", regions: { "af-south-1": { description: "Africa (Cape Town)" }, "ap-east-1": { description: "Asia Pacific (Hong Kong)" }, "ap-east-2": { description: "Asia Pacific (Taipei)" }, "ap-northeast-1": { description: "Asia Pacific (Tokyo)" }, "ap-northeast-2": { description: "Asia Pacific (Seoul)" }, "ap-northeast-3": { description: "Asia Pacific (Osaka)" }, "ap-south-1": { description: "Asia Pacific (Mumbai)" }, "ap-south-2": { description: "Asia Pacific (Hyderabad)" }, "ap-southeast-1": { description: "Asia Pacific (Singapore)" }, "ap-southeast-2": { description: "Asia Pacific (Sydney)" }, "ap-southeast-3": { description: "Asia Pacific (Jakarta)" }, "ap-southeast-4": { description: "Asia Pacific (Melbourne)" }, "ap-southeast-5": { description: "Asia Pacific (Malaysia)" }, "ap-southeast-6": { description: "Asia Pacific (New Zealand)" }, "ap-southeast-7": { description: "Asia Pacific (Thailand)" }, "aws-global": { description: "aws global region" }, "ca-central-1": { description: "Canada (Central)" }, "ca-west-1": { description: "Canada West (Calgary)" }, "eu-central-1": { description: "Europe (Frankfurt)" }, "eu-central-2": { description: "Europe (Zurich)" }, "eu-north-1": { description: "Europe (Stockholm)" }, "eu-south-1": { description: "Europe (Milan)" }, "eu-south-2": { description: "Europe (Spain)" }, "eu-west-1": { description: "Europe (Ireland)" }, "eu-west-2": { description: "Europe (London)" }, "eu-west-3": { description: "Europe (Paris)" }, "il-central-1": { description: "Israel (Tel Aviv)" }, "me-central-1": { description: "Middle East (UAE)" }, "me-south-1": { description: "Middle East (Bahrain)" }, "mx-central-1": { description: "Mexico (Central)" }, "sa-east-1": { description: "South America (Sao Paulo)" }, "us-east-1": { description: "US East (N. Virginia)" }, "us-east-2": { description: "US East (Ohio)" }, "us-west-1": { description: "US West (N. California)" }, "us-west-2": { description: "US West (Oregon)" } } }, { id: "aws-cn", outputs: { dnsSuffix: "amazonaws.com.cn", dualStackDnsSuffix: "api.amazonwebservices.com.cn", implicitGlobalRegion: "cn-northwest-1", name: "aws-cn", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^cn\\-\\w+\\-\\d+$", regions: { "aws-cn-global": { description: "aws-cn global region" }, "cn-north-1": { description: "China (Beijing)" }, "cn-northwest-1": { description: "China (Ningxia)" } } }, { id: "aws-eusc", outputs: { dnsSuffix: "amazonaws.eu", dualStackDnsSuffix: "api.amazonwebservices.eu", implicitGlobalRegion: "eusc-de-east-1", name: "aws-eusc", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^eusc\\-(de)\\-\\w+\\-\\d+$", regions: { "eusc-de-east-1": { description: "AWS European Sovereign Cloud (Germany)" } } }, { id: "aws-iso", outputs: { dnsSuffix: "c2s.ic.gov", dualStackDnsSuffix: "api.aws.ic.gov", implicitGlobalRegion: "us-iso-east-1", name: "aws-iso", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^us\\-iso\\-\\w+\\-\\d+$", regions: { "aws-iso-global": { description: "aws-iso global region" }, "us-iso-east-1": { description: "US ISO East" }, "us-iso-west-1": { description: "US ISO WEST" } } }, { id: "aws-iso-b", outputs: { dnsSuffix: "sc2s.sgov.gov", dualStackDnsSuffix: "api.aws.scloud", implicitGlobalRegion: "us-isob-east-1", name: "aws-iso-b", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^us\\-isob\\-\\w+\\-\\d+$", regions: { "aws-iso-b-global": { description: "aws-iso-b global region" }, "us-isob-east-1": { description: "US ISOB East (Ohio)" }, "us-isob-west-1": { description: "US ISOB West" } } }, { id: "aws-iso-e", outputs: { dnsSuffix: "cloud.adc-e.uk", dualStackDnsSuffix: "api.cloud-aws.adc-e.uk", implicitGlobalRegion: "eu-isoe-west-1", name: "aws-iso-e", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^eu\\-isoe\\-\\w+\\-\\d+$", regions: { "aws-iso-e-global": { description: "aws-iso-e global region" }, "eu-isoe-west-1": { description: "EU ISOE West" } } }, { id: "aws-iso-f", outputs: { dnsSuffix: "csp.hci.ic.gov", dualStackDnsSuffix: "api.aws.hci.ic.gov", implicitGlobalRegion: "us-isof-south-1", name: "aws-iso-f", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^us\\-isof\\-\\w+\\-\\d+$", regions: { "aws-iso-f-global": { description: "aws-iso-f global region" }, "us-isof-east-1": { description: "US ISOF EAST" }, "us-isof-south-1": { description: "US ISOF SOUTH" } } }, { id: "aws-us-gov", outputs: { dnsSuffix: "amazonaws.com", dualStackDnsSuffix: "api.aws", implicitGlobalRegion: "us-gov-west-1", name: "aws-us-gov", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^us\\-gov\\-\\w+\\-\\d+$", regions: { "aws-us-gov-global": { description: "aws-us-gov global region" }, "us-gov-east-1": { description: "AWS GovCloud (US-East)" }, "us-gov-west-1": { description: "AWS GovCloud (US-West)" } } }], xm = { partitions: Sm };
let bm = xm;
const wm = (t) => {
  const { partitions: e } = bm;
  for (const s of e) {
    const { regions: n, outputs: i } = s;
    for (const [o, a] of Object.entries(n)) if (o === t) return { ...i, ...a };
  }
  for (const s of e) {
    const { regionRegex: n, outputs: i } = s;
    if (new RegExp(n).test(t)) return { ...i };
  }
  const r = e.find((s) => s.id === "aws");
  if (!r) throw new Error("Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist.");
  return { ...r.outputs };
}, Xc = { isVirtualHostableS3Bucket: Kc, parseArn: ym, partition: wm };
zr.aws = Xc;
function Em(t) {
  const e = {};
  if (t = t.replace(/^\?/, ""), t) for (const r of t.split("&")) {
    let [s, n = null] = r.split("=");
    s = decodeURIComponent(s), n && (n = decodeURIComponent(n)), s in e ? Array.isArray(e[s]) ? e[s].push(n) : e[s] = [e[s], n] : e[s] = n;
  }
  return e;
}
const jr = (t) => {
  if (typeof t == "string") return jr(new URL(t));
  const { hostname: e, pathname: r, port: s, protocol: n, search: i } = t;
  let o;
  return i && (o = Em(i)), { hostname: e, port: s ? parseInt(s) : void 0, protocol: n, path: r, query: o };
}, Cm = /\d{12}\.ddb/;
async function Am(t, e, r) {
  var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
  if (((_b2 = (_a2 = r.request) == null ? void 0 : _a2.headers) == null ? void 0 : _b2["smithy-protocol"]) === "rpc-v2-cbor" && se(t, "PROTOCOL_RPC_V2_CBOR", "M"), typeof e.retryStrategy == "function") {
    const i = await e.retryStrategy();
    typeof i.acquireInitialRetryToken == "function" ? ((_d2 = (_c2 = i.constructor) == null ? void 0 : _c2.name) == null ? void 0 : _d2.includes("Adaptive")) ? se(t, "RETRY_MODE_ADAPTIVE", "F") : se(t, "RETRY_MODE_STANDARD", "E") : se(t, "RETRY_MODE_LEGACY", "D");
  }
  if (typeof e.accountIdEndpointMode == "function") {
    const i = t.endpointV2;
    switch (String((_e2 = i == null ? void 0 : i.url) == null ? void 0 : _e2.hostname).match(Cm) && se(t, "ACCOUNT_ID_ENDPOINT", "O"), await ((_f2 = e.accountIdEndpointMode) == null ? void 0 : _f2.call(e))) {
      case "disabled":
        se(t, "ACCOUNT_ID_MODE_DISABLED", "Q");
        break;
      case "preferred":
        se(t, "ACCOUNT_ID_MODE_PREFERRED", "P");
        break;
      case "required":
        se(t, "ACCOUNT_ID_MODE_REQUIRED", "R");
        break;
    }
  }
  const n = (_h2 = (_g2 = t.__smithy_context) == null ? void 0 : _g2.selectedHttpAuthScheme) == null ? void 0 : _h2.identity;
  if (n == null ? void 0 : n.$source) {
    const i = n;
    i.accountId && se(t, "RESOLVED_ACCOUNT_ID", "T");
    for (const [o, a] of Object.entries(i.$source ?? {})) se(t, o, a);
  }
}
const ko = "user-agent", sn = "x-amz-user-agent", Do = " ", nn = "/", Rm = /[^!$%&'*+\-.^_`|~\w]/g, vm = /[^!$%&'*+\-.^_`|~\w#]/g, To = "-", km = 1024;
function Dm(t) {
  let e = "";
  for (const r in t) {
    const s = t[r];
    if (e.length + s.length + 1 <= km) {
      e.length ? e += "," + s : e += s;
      continue;
    }
    break;
  }
  return e;
}
const Tm = (t) => (e, r) => async (s) => {
  var _a2, _b2, _c2, _d2;
  const { request: n } = s;
  if (!ee.isInstance(n)) return e(s);
  const { headers: i } = n, o = ((_a2 = r == null ? void 0 : r.userAgent) == null ? void 0 : _a2.map(Ir)) || [], a = (await t.defaultUserAgentProvider()).map(Ir);
  await Am(r, t, s);
  const c = r;
  a.push(`m/${Dm(Object.assign({}, (_b2 = r.__smithy_context) == null ? void 0 : _b2.features, (_c2 = c.__aws_sdk_context) == null ? void 0 : _c2.features))}`);
  const u = ((_d2 = t == null ? void 0 : t.customUserAgent) == null ? void 0 : _d2.map(Ir)) || [], m = await t.userAgentAppId();
  m && a.push(Ir(["app", `${m}`]));
  const l = [].concat([...a, ...o, ...u]).join(Do), h = [...a.filter((g) => g.startsWith("aws-sdk-")), ...u].join(Do);
  return t.runtime !== "browser" ? (h && (i[sn] = i[sn] ? `${i[ko]} ${h}` : h), i[ko] = l) : i[sn] = l, e({ ...s, request: n });
}, Ir = (t) => {
  var _a2;
  const e = t[0].split(nn).map((o) => o.replace(Rm, To)).join(nn), r = (_a2 = t[1]) == null ? void 0 : _a2.replace(vm, To), s = e.indexOf(nn), n = e.substring(0, s);
  let i = e.substring(s + 1);
  return n === "api" && (i = i.toLowerCase()), [n, i, r].filter((o) => o && o.length > 0).reduce((o, a, c) => {
    switch (c) {
      case 0:
        return a;
      case 1:
        return `${o}/${a}`;
      default:
        return `${o}#${a}`;
    }
  }, "");
}, _m = { name: "getUserAgentMiddleware", step: "build", priority: "low", tags: ["SET_USER_AGENT", "USER_AGENT"], override: true }, Bm = (t) => ({ applyToStack: (e) => {
  e.add(Tm(t), _m);
} }), Im = false, Om = false, _o = /* @__PURE__ */ new Set(), Mm = (t, e = Yr) => {
  if (!_o.has(t) && !e(t)) if (t === "*") console.warn('@smithy/config-resolver WARN - Please use the caller region instead of "*". See "sigv4a" in https://github.com/aws/aws-sdk-js-v3/blob/main/supplemental-docs/CLIENTS.md.');
  else throw new Error(`Region not accepted: region="${t}" is not a valid hostname component.`);
  else _o.add(t);
}, Zc = (t) => typeof t == "string" && (t.startsWith("fips-") || t.endsWith("-fips")), Pm = (t) => Zc(t) ? ["fips-aws-global", "aws-fips"].includes(t) ? "us-east-1" : t.replace(/fips-(dkr-|prod-)?|-fips/, "") : t, Nm = (t) => {
  const { region: e, useFipsEndpoint: r } = t;
  if (!e) throw new Error("Region is missing");
  return Object.assign(t, { region: async () => {
    const s = typeof e == "function" ? await e() : e, n = Pm(s);
    return Mm(n), n;
  }, useFipsEndpoint: async () => {
    const s = typeof e == "string" ? e : await e();
    return Zc(s) ? true : typeof r != "function" ? Promise.resolve(!!r) : r();
  } });
}, $m = (t) => Object.assign(t, { eventStreamMarshaller: t.eventStreamSerdeProvider(t) }), Bo = "content-length";
function Um(t) {
  return (e) => async (r) => {
    const s = r.request;
    if (ee.isInstance(s)) {
      const { body: n, headers: i } = s;
      if (n && Object.keys(i).map((o) => o.toLowerCase()).indexOf(Bo) === -1) try {
        const o = t(n);
        s.headers = { ...s.headers, [Bo]: String(o) };
      } catch {
      }
    }
    return e({ ...r, request: s });
  };
}
const Fm = { step: "build", tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"], name: "contentLengthMiddleware", override: true }, Lm = (t) => ({ applyToStack: (e) => {
  e.add(Um(t.bodyLengthChecker), Fm);
} }), Hm = async (t) => {
  const e = (t == null ? void 0 : t.Bucket) || "";
  if (typeof t.Bucket == "string" && (t.Bucket = e.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"))), Gm(e)) {
    if (t.ForcePathStyle === true) throw new Error("Path-style addressing cannot be used with ARN buckets");
  } else (!qm(e) || e.indexOf(".") !== -1 && !String(t.Endpoint).startsWith("http:") || e.toLowerCase() !== e || e.length < 3) && (t.ForcePathStyle = true);
  return t.DisableMultiRegionAccessPoints && (t.disableMultiRegionAccessPoints = true, t.DisableMRAP = true), t;
}, zm = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/, jm = /(\d+\.){3}\d+/, Vm = /\.\./, qm = (t) => zm.test(t) && !jm.test(t) && !Vm.test(t), Gm = (t) => {
  const [e, r, s, , , n] = t.split(":"), i = e === "arn" && t.split(":").length >= 6, o = !!(i && r && s && n);
  if (i && !o) throw new Error(`Invalid ARN: ${t} was an invalid ARN.`);
  return o;
}, Wm = (t, e, r, s = false) => {
  const n = async () => {
    var _a2;
    let i;
    return s ? i = ((_a2 = r.clientContextParams) == null ? void 0 : _a2[t]) ?? r[t] ?? r[e] : i = r[t] ?? r[e], typeof i == "function" ? i() : i;
  };
  return t === "credentialScope" || e === "CredentialScope" ? async () => {
    const i = typeof r.credentials == "function" ? await r.credentials() : r.credentials;
    return (i == null ? void 0 : i.credentialScope) ?? (i == null ? void 0 : i.CredentialScope);
  } : t === "accountId" || e === "AccountId" ? async () => {
    const i = typeof r.credentials == "function" ? await r.credentials() : r.credentials;
    return (i == null ? void 0 : i.accountId) ?? (i == null ? void 0 : i.AccountId);
  } : t === "endpoint" || e === "endpoint" ? async () => {
    if (r.isCustomEndpoint === false) return;
    const i = await n();
    if (i && typeof i == "object") {
      if ("url" in i) return i.url.href;
      if ("hostname" in i) {
        const { protocol: o, hostname: a, port: c, path: u } = i;
        return `${o}//${a}${c ? ":" + c : ""}${u}`;
      }
    }
    return i;
  } : n;
}, Qc = async (t) => {
}, Jc = (t) => typeof t == "object" ? "url" in t ? jr(t.url) : t : jr(t), Yc = async (t, e, r, s) => {
  if (!r.isCustomEndpoint) {
    let o;
    r.serviceConfiguredEndpoint ? o = await r.serviceConfiguredEndpoint() : o = await Qc(r.serviceId), o && (r.endpoint = () => Promise.resolve(Jc(o)), r.isCustomEndpoint = true);
  }
  const n = await eu(t, e, r);
  if (typeof r.endpointProvider != "function") throw new Error("config.endpointProvider is not set.");
  return r.endpointProvider(n, s);
}, eu = async (t, e, r) => {
  var _a2;
  const s = {}, n = ((_a2 = e == null ? void 0 : e.getEndpointParameterInstructions) == null ? void 0 : _a2.call(e)) || {};
  for (const [i, o] of Object.entries(n)) switch (o.type) {
    case "staticContextParams":
      s[i] = o.value;
      break;
    case "contextParams":
      s[i] = t[o.name];
      break;
    case "clientContextParams":
    case "builtInParams":
      s[i] = await Wm(o.name, i, r, o.type !== "builtInParams")();
      break;
    case "operationContextParams":
      s[i] = o.get(t);
      break;
    default:
      throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(o));
  }
  return Object.keys(n).length === 0 && Object.assign(s, r), String(r.serviceId).toLowerCase() === "s3" && await Hm(s), s;
}, Km = ({ config: t, instructions: e }) => (r, s) => async (n) => {
  var _a2, _b2, _c2, _d2;
  t.isCustomEndpoint && Df(s, "ENDPOINT_OVERRIDE", "N");
  const i = await Yc(n.input, { getEndpointParameterInstructions() {
    return e;
  } }, { ...t }, s);
  s.endpointV2 = i, s.authSchemes = (_a2 = i.properties) == null ? void 0 : _a2.authSchemes;
  const o = (_b2 = s.authSchemes) == null ? void 0 : _b2[0];
  if (o) {
    s.signing_region = o.signingRegion, s.signing_service = o.signingName;
    const c = (_d2 = (_c2 = ft(s)) == null ? void 0 : _c2.selectedHttpAuthScheme) == null ? void 0 : _d2.httpAuthOption;
    c && (c.signingProperties = Object.assign(c.signingProperties || {}, { signing_region: o.signingRegion, signingRegion: o.signingRegion, signing_service: o.signingName, signingName: o.signingName, signingRegionSet: o.signingRegionSet }, o.properties));
  }
  return r({ ...n });
}, Xm = { step: "serialize", tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"], name: "endpointV2Middleware", override: true, relation: "before", toMiddleware: gl.name }, qe = (t, e) => ({ applyToStack: (r) => {
  r.addRelativeTo(Km({ config: t, instructions: e }), Xm);
} }), Zm = (t) => {
  const e = t.tls ?? true, { endpoint: r, useDualstackEndpoint: s, useFipsEndpoint: n } = t, i = r != null ? async () => Jc(await Ne(r)()) : void 0, a = Object.assign(t, { endpoint: i, tls: e, isCustomEndpoint: !!r, useDualstackEndpoint: Ne(s ?? false), useFipsEndpoint: Ne(n ?? false) });
  let c;
  return a.serviceConfiguredEndpoint = async () => (t.serviceId && !c && (c = Qc(t.serviceId)), c), a;
};
var Wt;
(function(t) {
  t.STANDARD = "standard", t.ADAPTIVE = "adaptive";
})(Wt || (Wt = {}));
const Vr = 3, Qm = Wt.STANDARD, Jm = ["BandwidthLimitExceeded", "EC2ThrottledException", "LimitExceededException", "PriorRequestNotComplete", "ProvisionedThroughputExceededException", "RequestLimitExceeded", "RequestThrottled", "RequestThrottledException", "SlowDown", "ThrottledException", "Throttling", "ThrottlingException", "TooManyRequestsException", "TransactionInProgressException"], Ym = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"], eg = [500, 502, 503, 504], tg = ["ECONNRESET", "ECONNREFUSED", "EPIPE", "ETIMEDOUT"], rg = ["EHOSTUNREACH", "ENETUNREACH", "ENOTFOUND"], sg = (t) => (t == null ? void 0 : t.$retryable) !== void 0, ng = (t) => {
  var _a2;
  return (_a2 = t.$metadata) == null ? void 0 : _a2.clockSkewCorrected;
}, ig = (t) => {
  const e = /* @__PURE__ */ new Set(["Failed to fetch", "NetworkError when attempting to fetch resource", "The Internet connection appears to be offline", "Load failed", "Network request failed"]);
  return t && t instanceof TypeError ? e.has(t.message) : false;
}, tu = (t) => {
  var _a2, _b2;
  return ((_a2 = t.$metadata) == null ? void 0 : _a2.httpStatusCode) === 429 || Jm.includes(t.name) || ((_b2 = t.$retryable) == null ? void 0 : _b2.throttling) == true;
}, gi = (t, e = 0) => {
  var _a2;
  return sg(t) || ng(t) || Ym.includes(t.name) || tg.includes((t == null ? void 0 : t.code) || "") || rg.includes((t == null ? void 0 : t.code) || "") || eg.includes(((_a2 = t.$metadata) == null ? void 0 : _a2.httpStatusCode) || 0) || ig(t) || t.cause !== void 0 && e <= 10 && gi(t.cause, e + 1);
}, og = (t) => {
  var _a2;
  if (((_a2 = t.$metadata) == null ? void 0 : _a2.httpStatusCode) !== void 0) {
    const e = t.$metadata.httpStatusCode;
    return 500 <= e && e <= 599 && !gi(t);
  }
  return false;
};
const _yi = class _yi {
  constructor(e) {
    __publicField(this, "beta");
    __publicField(this, "minCapacity");
    __publicField(this, "minFillRate");
    __publicField(this, "scaleConstant");
    __publicField(this, "smooth");
    __publicField(this, "currentCapacity", 0);
    __publicField(this, "enabled", false);
    __publicField(this, "lastMaxRate", 0);
    __publicField(this, "measuredTxRate", 0);
    __publicField(this, "requestCount", 0);
    __publicField(this, "fillRate");
    __publicField(this, "lastThrottleTime");
    __publicField(this, "lastTimestamp", 0);
    __publicField(this, "lastTxRateBucket");
    __publicField(this, "maxCapacity");
    __publicField(this, "timeWindow", 0);
    this.beta = (e == null ? void 0 : e.beta) ?? 0.7, this.minCapacity = (e == null ? void 0 : e.minCapacity) ?? 1, this.minFillRate = (e == null ? void 0 : e.minFillRate) ?? 0.5, this.scaleConstant = (e == null ? void 0 : e.scaleConstant) ?? 0.4, this.smooth = (e == null ? void 0 : e.smooth) ?? 0.8;
    const r = this.getCurrentTimeInSeconds();
    this.lastThrottleTime = r, this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds()), this.fillRate = this.minFillRate, this.maxCapacity = this.minCapacity;
  }
  getCurrentTimeInSeconds() {
    return Date.now() / 1e3;
  }
  async getSendToken() {
    return this.acquireTokenBucket(1);
  }
  async acquireTokenBucket(e) {
    if (this.enabled) {
      if (this.refillTokenBucket(), e > this.currentCapacity) {
        const r = (e - this.currentCapacity) / this.fillRate * 1e3;
        await new Promise((s) => _yi.setTimeoutFn(s, r));
      }
      this.currentCapacity = this.currentCapacity - e;
    }
  }
  refillTokenBucket() {
    const e = this.getCurrentTimeInSeconds();
    if (!this.lastTimestamp) {
      this.lastTimestamp = e;
      return;
    }
    const r = (e - this.lastTimestamp) * this.fillRate;
    this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + r), this.lastTimestamp = e;
  }
  updateClientSendingRate(e) {
    let r;
    if (this.updateMeasuredRate(), tu(e)) {
      const n = this.enabled ? Math.min(this.measuredTxRate, this.fillRate) : this.measuredTxRate;
      this.lastMaxRate = n, this.calculateTimeWindow(), this.lastThrottleTime = this.getCurrentTimeInSeconds(), r = this.cubicThrottle(n), this.enableTokenBucket();
    } else this.calculateTimeWindow(), r = this.cubicSuccess(this.getCurrentTimeInSeconds());
    const s = Math.min(r, 2 * this.measuredTxRate);
    this.updateTokenBucketRate(s);
  }
  calculateTimeWindow() {
    this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3));
  }
  cubicThrottle(e) {
    return this.getPrecise(e * this.beta);
  }
  cubicSuccess(e) {
    return this.getPrecise(this.scaleConstant * Math.pow(e - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
  }
  enableTokenBucket() {
    this.enabled = true;
  }
  updateTokenBucketRate(e) {
    this.refillTokenBucket(), this.fillRate = Math.max(e, this.minFillRate), this.maxCapacity = Math.max(e, this.minCapacity), this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity);
  }
  updateMeasuredRate() {
    const e = this.getCurrentTimeInSeconds(), r = Math.floor(e * 2) / 2;
    if (this.requestCount++, r > this.lastTxRateBucket) {
      const s = this.requestCount / (r - this.lastTxRateBucket);
      this.measuredTxRate = this.getPrecise(s * this.smooth + this.measuredTxRate * (1 - this.smooth)), this.requestCount = 0, this.lastTxRateBucket = r;
    }
  }
  getPrecise(e) {
    return parseFloat(e.toFixed(8));
  }
};
__publicField(_yi, "setTimeoutFn", setTimeout);
let yi = _yi;
const Kn = 100, ru = 20 * 1e3, ag = 500, Io = 500, cg = 5, ug = 10, dg = 1, lg = "amz-sdk-invocation-id", fg = "amz-sdk-request", hg = () => {
  let t = Kn;
  return { computeNextBackoffDelay: (s) => Math.floor(Math.min(ru, Math.random() * 2 ** s * t)), setDelayBase: (s) => {
    t = s;
  } };
}, Oo = ({ retryDelay: t, retryCount: e, retryCost: r }) => ({ getRetryCount: () => e, getRetryDelay: () => Math.min(ru, t), getRetryCost: () => r });
class su {
  constructor(e) {
    __publicField(this, "maxAttempts");
    __publicField(this, "mode", Wt.STANDARD);
    __publicField(this, "capacity", Io);
    __publicField(this, "retryBackoffStrategy", hg());
    __publicField(this, "maxAttemptsProvider");
    this.maxAttempts = e, this.maxAttemptsProvider = typeof e == "function" ? e : async () => e;
  }
  async acquireInitialRetryToken(e) {
    return Oo({ retryDelay: Kn, retryCount: 0 });
  }
  async refreshRetryTokenForRetry(e, r) {
    const s = await this.getMaxAttempts();
    if (this.shouldRetry(e, r, s)) {
      const n = r.errorType;
      this.retryBackoffStrategy.setDelayBase(n === "THROTTLING" ? ag : Kn);
      const i = this.retryBackoffStrategy.computeNextBackoffDelay(e.getRetryCount()), o = r.retryAfterHint ? Math.max(r.retryAfterHint.getTime() - Date.now() || 0, i) : i, a = this.getCapacityCost(n);
      return this.capacity -= a, Oo({ retryDelay: o, retryCount: e.getRetryCount() + 1, retryCost: a });
    }
    throw new Error("No retry token available");
  }
  recordSuccess(e) {
    this.capacity = Math.max(Io, this.capacity + (e.getRetryCost() ?? dg));
  }
  getCapacity() {
    return this.capacity;
  }
  async getMaxAttempts() {
    try {
      return await this.maxAttemptsProvider();
    } catch {
      return console.warn(`Max attempts provider could not resolve. Using default of ${Vr}`), Vr;
    }
  }
  shouldRetry(e, r, s) {
    return e.getRetryCount() + 1 < s && this.capacity >= this.getCapacityCost(r.errorType) && this.isRetryableError(r.errorType);
  }
  getCapacityCost(e) {
    return e === "TRANSIENT" ? ug : cg;
  }
  isRetryableError(e) {
    return e === "THROTTLING" || e === "TRANSIENT";
  }
}
class pg {
  constructor(e, r) {
    __publicField(this, "maxAttemptsProvider");
    __publicField(this, "rateLimiter");
    __publicField(this, "standardRetryStrategy");
    __publicField(this, "mode", Wt.ADAPTIVE);
    this.maxAttemptsProvider = e;
    const { rateLimiter: s } = r ?? {};
    this.rateLimiter = s ?? new yi(), this.standardRetryStrategy = new su(e);
  }
  async acquireInitialRetryToken(e) {
    return await this.rateLimiter.getSendToken(), this.standardRetryStrategy.acquireInitialRetryToken(e);
  }
  async refreshRetryTokenForRetry(e, r) {
    return this.rateLimiter.updateClientSendingRate(r), this.standardRetryStrategy.refreshRetryTokenForRetry(e, r);
  }
  recordSuccess(e) {
    this.rateLimiter.updateClientSendingRate({}), this.standardRetryStrategy.recordSuccess(e);
  }
}
const mg = (t) => t instanceof Error ? t : t instanceof Object ? Object.assign(new Error(), t) : typeof t == "string" ? new Error(t) : new Error(`AWS SDK error wrapper for ${t}`), gg = (t) => {
  const { retryStrategy: e, retryMode: r, maxAttempts: s } = t, n = Ne(s ?? Vr);
  return Object.assign(t, { maxAttempts: n, retryStrategy: async () => e || (await Ne(r)() === Wt.ADAPTIVE ? new pg(n) : new su(n)) });
}, yg = (t) => (t == null ? void 0 : t.body) instanceof ReadableStream, Sg = (t) => (e, r) => async (s) => {
  var _a2;
  let n = await t.retryStrategy();
  const i = await t.maxAttempts();
  if (xg(n)) {
    n = n;
    let o = await n.acquireInitialRetryToken(r.partition_id), a = new Error(), c = 0, u = 0;
    const { request: m } = s, l = ee.isInstance(m);
    for (l && (m.headers[lg] = ri()); ; ) try {
      l && (m.headers[fg] = `attempt=${c + 1}; max=${i}`);
      const { response: h, output: g } = await e(s);
      return n.recordSuccess(o), g.$metadata.attempts = c + 1, g.$metadata.totalRetryDelay = u, { response: h, output: g };
    } catch (h) {
      const g = bg(h);
      if (a = mg(h), l && yg(m)) throw (_a2 = r.logger instanceof ai ? console : r.logger) == null ? void 0 : _a2.warn("An error was encountered in a non-retryable streaming request."), a;
      try {
        o = await n.refreshRetryTokenForRetry(o, g);
      } catch {
        throw a.$metadata || (a.$metadata = {}), a.$metadata.attempts = c + 1, a.$metadata.totalRetryDelay = u, a;
      }
      c = o.getRetryCount();
      const x = o.getRetryDelay();
      u += x, await new Promise((E) => setTimeout(E, x));
    }
  } else return n = n, (n == null ? void 0 : n.mode) && (r.userAgent = [...r.userAgent || [], ["cfg/retry-mode", n.mode]]), n.retry(e, s);
}, xg = (t) => typeof t.acquireInitialRetryToken < "u" && typeof t.refreshRetryTokenForRetry < "u" && typeof t.recordSuccess < "u", bg = (t) => {
  const e = { error: t, errorType: wg(t) }, r = Ag(t.$response);
  return r && (e.retryAfterHint = r), e;
}, wg = (t) => tu(t) ? "THROTTLING" : gi(t) ? "TRANSIENT" : og(t) ? "SERVER_ERROR" : "CLIENT_ERROR", Eg = { name: "retryMiddleware", tags: ["RETRY"], step: "finalizeRequest", priority: "high", override: true }, Cg = (t) => ({ applyToStack: (e) => {
  e.add(Sg(t), Eg);
} }), Ag = (t) => {
  if (!ct.isInstance(t)) return;
  const e = Object.keys(t.headers).find((i) => i.toLowerCase() === "retry-after");
  if (!e) return;
  const r = t.headers[e], s = Number(r);
  return Number.isNaN(s) ? new Date(r) : new Date(s * 1e3);
};
class Si {
  constructor(e) {
    __publicField(this, "sigv4aSigner");
    __publicField(this, "sigv4Signer");
    __publicField(this, "signerOptions");
    this.sigv4Signer = new vp(e), this.signerOptions = e;
  }
  static sigv4aDependency() {
    return "none";
  }
  async sign(e, r = {}) {
    return r.signingRegion === "*" ? this.getSigv4aSigner().sign(e, r) : this.sigv4Signer.sign(e, r);
  }
  async signWithCredentials(e, r, s = {}) {
    if (s.signingRegion === "*") throw this.getSigv4aSigner(), new Error(`signWithCredentials with signingRegion '*' is only supported when using the CRT dependency @aws-sdk/signature-v4-crt. Please check whether you have installed the "@aws-sdk/signature-v4-crt" package explicitly. You must also register the package by calling [require("@aws-sdk/signature-v4-crt");] or an ESM equivalent such as [import "@aws-sdk/signature-v4-crt";]. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt`);
    return this.sigv4Signer.signWithCredentials(e, r, s);
  }
  async presign(e, r = {}) {
    if (r.signingRegion === "*") throw this.getSigv4aSigner(), new Error(`presign with signingRegion '*' is only supported when using the CRT dependency @aws-sdk/signature-v4-crt. Please check whether you have installed the "@aws-sdk/signature-v4-crt" package explicitly. You must also register the package by calling [require("@aws-sdk/signature-v4-crt");] or an ESM equivalent such as [import "@aws-sdk/signature-v4-crt";]. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt`);
    return this.sigv4Signer.presign(e, r);
  }
  async presignWithCredentials(e, r, s = {}) {
    if (s.signingRegion === "*") throw new Error("Method presignWithCredentials is not supported for [signingRegion=*].");
    return this.sigv4Signer.presignWithCredentials(e, r, s);
  }
  getSigv4aSigner() {
    if (!this.sigv4aSigner) throw this.signerOptions.runtime === "node" ? new Error("Neither CRT nor JS SigV4a implementation is available. Please load either @aws-sdk/signature-v4-crt or @aws-sdk/signature-v4a. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt") : new Error("JS SigV4a implementation is not available or not a valid constructor. Please check whether you have installed the @aws-sdk/signature-v4a package explicitly. The CRT implementation is not available for browsers. You must also register the package by calling [require('@aws-sdk/signature-v4a');] or an ESM equivalent such as [import '@aws-sdk/signature-v4a';]. For more information please go to https://github.com/aws/aws-sdk-js-v3#using-javascript-non-crt-implementation-of-sigv4a");
    return this.sigv4aSigner;
  }
}
const xi = "required", d = "type", b = "rules", p = "conditions", y = "fn", S = "argv", I = "ref", $ = "assign", v = "url", k = "properties", Ze = "backend", le = "authSchemes", ne = "disableDoubleEncoding", ie = "signingName", he = "signingRegion", D = "headers", bi = "signingRegionSet", Rg = 6, vg = false, Fe = true, _e = "isSet", Y = "booleanEquals", B = "error", qr = "aws.partition", z = "stringEquals", Z = "getAttr", Q = "name", G = "substring", Mo = "bucketSuffix", wi = "parseURL", A = "endpoint", w = "tree", Gr = "aws.isVirtualHostableS3Bucket", Wr = "{url#scheme}://{Bucket}.{url#authority}{url#path}", ze = "not", Po = "accessPointSuffix", $r = "{url#scheme}://{url#authority}{url#path}", nu = "hardwareType", iu = "regionPrefix", No = "bucketAliasSuffix", Xn = "outpostId", Ot = "isValidHostLabel", Ei = "sigv4a", yr = "s3-outposts", Kt = "s3", ou = "{url#scheme}://{url#authority}{url#normalizedPath}{Bucket}", au = "https://{Bucket}.s3-accelerate.{partitionResult#dnsSuffix}", $o = "https://{Bucket}.s3.{partitionResult#dnsSuffix}", cu = "aws.parseArn", uu = "bucketArn", du = "arnType", Kr = "", Ci = "s3-object-lambda", lu = "accesspoint", Ai = "accessPointName", Uo = "{url#scheme}://{accessPointName}-{bucketArn#accountId}.{url#authority}{url#path}", Fo = "mrapPartition", Lo = "outpostType", Ho = "arnPrefix", fu = "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}", zo = "https://s3.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", jo = "https://s3.{partitionResult#dnsSuffix}", Nt = { [xi]: false, [d]: "string" }, $t = { [xi]: true, default: false, [d]: "boolean" }, rr = { [xi]: false, [d]: "boolean" }, Me = { [y]: Y, [S]: [{ [I]: "Accelerate" }, true] }, K = { [y]: Y, [S]: [{ [I]: "UseFIPS" }, true] }, V = { [y]: Y, [S]: [{ [I]: "UseDualStack" }, true] }, J = { [y]: _e, [S]: [{ [I]: "Endpoint" }] }, hu = { [y]: qr, [S]: [{ [I]: "Region" }], [$]: "partitionResult" }, Vo = { [y]: z, [S]: [{ [y]: Z, [S]: [{ [I]: "partitionResult" }, Q] }, "aws-cn"] }, cr = { [y]: _e, [S]: [{ [I]: "Bucket" }] }, H = { [I]: "Bucket" }, qo = { [p]: [Me], [B]: "S3Express does not support S3 Accelerate.", [d]: B }, Go = { [p]: [J, { [y]: wi, [S]: [{ [I]: "Endpoint" }], [$]: "url" }], [b]: [{ [p]: [{ [y]: _e, [S]: [{ [I]: "DisableS3ExpressSessionAuth" }] }, { [y]: Y, [S]: [{ [I]: "DisableS3ExpressSessionAuth" }, true] }], [b]: [{ [p]: [{ [y]: Y, [S]: [{ [y]: Z, [S]: [{ [I]: "url" }, "isIp"] }, true] }], [b]: [{ [p]: [{ [y]: "uriEncode", [S]: [H], [$]: "uri_encoded_bucket" }], [b]: [{ [A]: { [v]: "{url#scheme}://{url#authority}/{uri_encoded_bucket}{url#path}", [k]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: "s3express", [he]: "{Region}" }] }, [D]: {} }, [d]: A }], [d]: w }], [d]: w }, { [p]: [{ [y]: Gr, [S]: [H, false] }], [b]: [{ [A]: { [v]: Wr, [k]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: "s3express", [he]: "{Region}" }] }, [D]: {} }, [d]: A }], [d]: w }, { [B]: "S3Express bucket name is not a valid virtual hostable name.", [d]: B }], [d]: w }, { [p]: [{ [y]: Y, [S]: [{ [y]: Z, [S]: [{ [I]: "url" }, "isIp"] }, true] }], [b]: [{ [p]: [{ [y]: "uriEncode", [S]: [H], [$]: "uri_encoded_bucket" }], [b]: [{ [A]: { [v]: "{url#scheme}://{url#authority}/{uri_encoded_bucket}{url#path}", [k]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4-s3express", [ie]: "s3express", [he]: "{Region}" }] }, [D]: {} }, [d]: A }], [d]: w }], [d]: w }, { [p]: [{ [y]: Gr, [S]: [H, false] }], [b]: [{ [A]: { [v]: Wr, [k]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4-s3express", [ie]: "s3express", [he]: "{Region}" }] }, [D]: {} }, [d]: A }], [d]: w }, { [B]: "S3Express bucket name is not a valid virtual hostable name.", [d]: B }], [d]: w }, we = { [y]: wi, [S]: [{ [I]: "Endpoint" }], [$]: "url" }, on = { [y]: Y, [S]: [{ [y]: Z, [S]: [{ [I]: "url" }, "isIp"] }, true] }, pu = { [I]: "url" }, mu = { [y]: "uriEncode", [S]: [H], [$]: "uri_encoded_bucket" }, Te = { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: "s3express", [he]: "{Region}" }] }, M = {}, gu = { [y]: Gr, [S]: [H, false] }, Wo = { [B]: "S3Express bucket name is not a valid virtual hostable name.", [d]: B }, Ko = { [y]: _e, [S]: [{ [I]: "UseS3ExpressControlEndpoint" }] }, Xo = { [y]: Y, [S]: [{ [I]: "UseS3ExpressControlEndpoint" }, true] }, P = { [y]: ze, [S]: [J] }, F = { [y]: Y, [S]: [{ [I]: "UseDualStack" }, false] }, U = { [y]: Y, [S]: [{ [I]: "UseFIPS" }, false] }, Or = { [B]: "Unrecognized S3Express bucket name format.", [d]: B }, Zo = { [y]: ze, [S]: [cr] }, Qo = { [I]: nu }, Jo = { [p]: [P], [B]: "Expected a endpoint to be specified but no endpoint was found", [d]: B }, Mr = { [le]: [{ [ne]: true, [Q]: Ei, [ie]: yr, [bi]: ["*"] }, { [ne]: true, [Q]: "sigv4", [ie]: yr, [he]: "{Region}" }] }, an = { [y]: Y, [S]: [{ [I]: "ForcePathStyle" }, false] }, kg = { [I]: "ForcePathStyle" }, re = { [y]: Y, [S]: [{ [I]: "Accelerate" }, false] }, ae = { [y]: z, [S]: [{ [I]: "Region" }, "aws-global"] }, ce = { [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: Kt, [he]: "us-east-1" }] }, L = { [y]: ze, [S]: [ae] }, ue = { [y]: Y, [S]: [{ [I]: "UseGlobalEndpoint" }, true] }, Yo = { [v]: "https://{Bucket}.s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}", [k]: { [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: Kt, [he]: "{Region}" }] }, [D]: {} }, oe = { [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: Kt, [he]: "{Region}" }] }, de = { [y]: Y, [S]: [{ [I]: "UseGlobalEndpoint" }, false] }, ea = { [v]: "https://{Bucket}.s3-fips.{Region}.{partitionResult#dnsSuffix}", [k]: oe, [D]: {} }, ta = { [v]: "https://{Bucket}.s3-accelerate.dualstack.{partitionResult#dnsSuffix}", [k]: oe, [D]: {} }, ra = { [v]: "https://{Bucket}.s3.dualstack.{Region}.{partitionResult#dnsSuffix}", [k]: oe, [D]: {} }, cn = { [y]: Y, [S]: [{ [y]: Z, [S]: [pu, "isIp"] }, false] }, un = { [v]: ou, [k]: oe, [D]: {} }, Zn = { [v]: Wr, [k]: oe, [D]: {} }, sa = { [A]: Zn, [d]: A }, dn = { [v]: au, [k]: oe, [D]: {} }, na = { [v]: "https://{Bucket}.s3.{Region}.{partitionResult#dnsSuffix}", [k]: oe, [D]: {} }, Pr = { [B]: "Invalid region: region was not a valid DNS name.", [d]: B }, ke = { [I]: uu }, yu = { [I]: du }, ln = { [y]: Z, [S]: [ke, "service"] }, Ri = { [I]: Ai }, ia = { [p]: [V], [B]: "S3 Object Lambda does not support Dual-stack", [d]: B }, oa = { [p]: [Me], [B]: "S3 Object Lambda does not support S3 Accelerate", [d]: B }, aa = { [p]: [{ [y]: _e, [S]: [{ [I]: "DisableAccessPoints" }] }, { [y]: Y, [S]: [{ [I]: "DisableAccessPoints" }, true] }], [B]: "Access points are not supported for this operation", [d]: B }, fn = { [p]: [{ [y]: _e, [S]: [{ [I]: "UseArnRegion" }] }, { [y]: Y, [S]: [{ [I]: "UseArnRegion" }, false] }, { [y]: ze, [S]: [{ [y]: z, [S]: [{ [y]: Z, [S]: [ke, "region"] }, "{Region}"] }] }], [B]: "Invalid configuration: region from ARN `{bucketArn#region}` does not match client region `{Region}` and UseArnRegion is `false`", [d]: B }, Su = { [y]: Z, [S]: [{ [I]: "bucketPartition" }, Q] }, xu = { [y]: Z, [S]: [ke, "accountId"] }, hn = { [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: Ci, [he]: "{bucketArn#region}" }] }, ca = { [B]: "Invalid ARN: The access point name may only contain a-z, A-Z, 0-9 and `-`. Found: `{accessPointName}`", [d]: B }, pn = { [B]: "Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and `-`. Found: `{bucketArn#accountId}`", [d]: B }, mn = { [B]: "Invalid region in ARN: `{bucketArn#region}` (invalid DNS name)", [d]: B }, gn = { [B]: "Client was configured for partition `{partitionResult#name}` but ARN (`{Bucket}`) has `{bucketPartition#name}`", [d]: B }, ua = { [B]: "Invalid ARN: The ARN may only contain a single resource component after `accesspoint`.", [d]: B }, da = { [B]: "Invalid ARN: Expected a resource of the format `accesspoint:<accesspoint name>` but no name was provided", [d]: B }, sr = { [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: Kt, [he]: "{bucketArn#region}" }] }, la = { [le]: [{ [ne]: true, [Q]: Ei, [ie]: yr, [bi]: ["*"] }, { [ne]: true, [Q]: "sigv4", [ie]: yr, [he]: "{bucketArn#region}" }] }, fa = { [y]: cu, [S]: [H] }, ha = { [v]: "https://s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [k]: oe, [D]: {} }, pa = { [v]: "https://s3-fips.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [k]: oe, [D]: {} }, ma = { [v]: "https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [k]: oe, [D]: {} }, yn = { [v]: fu, [k]: oe, [D]: {} }, ga = { [v]: "https://s3.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [k]: oe, [D]: {} }, ya = { [I]: "UseObjectLambdaEndpoint" }, Sn = { [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: Ci, [he]: "{Region}" }] }, Sa = { [v]: "https://s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}", [k]: oe, [D]: {} }, xa = { [v]: "https://s3-fips.{Region}.{partitionResult#dnsSuffix}", [k]: oe, [D]: {} }, ba = { [v]: "https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}", [k]: oe, [D]: {} }, xn = { [v]: $r, [k]: oe, [D]: {} }, wa = { [v]: "https://s3.{Region}.{partitionResult#dnsSuffix}", [k]: oe, [D]: {} }, bn = [{ [I]: "Region" }], Dg = [{ [I]: "Endpoint" }], Tg = [H], wn = [Me], Ut = [J, we], Ea = [{ [y]: _e, [S]: [{ [I]: "DisableS3ExpressSessionAuth" }] }, { [y]: Y, [S]: [{ [I]: "DisableS3ExpressSessionAuth" }, true] }], _g = [mu], En = [gu], Oe = [hu], Cn = [K, V], ur = [K, F], dr = [U, V], lr = [U, F], Ca = [{ [y]: G, [S]: [H, 6, 14, true], [$]: "s3expressAvailabilityZoneId" }, { [y]: G, [S]: [H, 14, 16, true], [$]: "s3expressAvailabilityZoneDelim" }, { [y]: z, [S]: [{ [I]: "s3expressAvailabilityZoneDelim" }, "--"] }], Le = [{ [p]: [K, V], [A]: { [v]: "https://{Bucket}.s3express-fips-{s3expressAvailabilityZoneId}.dualstack.{Region}.{partitionResult#dnsSuffix}", [k]: Te, [D]: {} }, [d]: A }, { [p]: ur, [A]: { [v]: "https://{Bucket}.s3express-fips-{s3expressAvailabilityZoneId}.{Region}.{partitionResult#dnsSuffix}", [k]: Te, [D]: {} }, [d]: A }, { [p]: dr, [A]: { [v]: "https://{Bucket}.s3express-{s3expressAvailabilityZoneId}.dualstack.{Region}.{partitionResult#dnsSuffix}", [k]: Te, [D]: {} }, [d]: A }, { [p]: lr, [A]: { [v]: "https://{Bucket}.s3express-{s3expressAvailabilityZoneId}.{Region}.{partitionResult#dnsSuffix}", [k]: Te, [D]: {} }, [d]: A }], Aa = [{ [y]: G, [S]: [H, 6, 15, true], [$]: "s3expressAvailabilityZoneId" }, { [y]: G, [S]: [H, 15, 17, true], [$]: "s3expressAvailabilityZoneDelim" }, { [y]: z, [S]: [{ [I]: "s3expressAvailabilityZoneDelim" }, "--"] }], Ra = [{ [y]: G, [S]: [H, 6, 19, true], [$]: "s3expressAvailabilityZoneId" }, { [y]: G, [S]: [H, 19, 21, true], [$]: "s3expressAvailabilityZoneDelim" }, { [y]: z, [S]: [{ [I]: "s3expressAvailabilityZoneDelim" }, "--"] }], va = [{ [y]: G, [S]: [H, 6, 20, true], [$]: "s3expressAvailabilityZoneId" }, { [y]: G, [S]: [H, 20, 22, true], [$]: "s3expressAvailabilityZoneDelim" }, { [y]: z, [S]: [{ [I]: "s3expressAvailabilityZoneDelim" }, "--"] }], ka = [{ [y]: G, [S]: [H, 6, 26, true], [$]: "s3expressAvailabilityZoneId" }, { [y]: G, [S]: [H, 26, 28, true], [$]: "s3expressAvailabilityZoneDelim" }, { [y]: z, [S]: [{ [I]: "s3expressAvailabilityZoneDelim" }, "--"] }], He = [{ [p]: [K, V], [A]: { [v]: "https://{Bucket}.s3express-fips-{s3expressAvailabilityZoneId}.dualstack.{Region}.{partitionResult#dnsSuffix}", [k]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4-s3express", [ie]: "s3express", [he]: "{Region}" }] }, [D]: {} }, [d]: A }, { [p]: ur, [A]: { [v]: "https://{Bucket}.s3express-fips-{s3expressAvailabilityZoneId}.{Region}.{partitionResult#dnsSuffix}", [k]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4-s3express", [ie]: "s3express", [he]: "{Region}" }] }, [D]: {} }, [d]: A }, { [p]: dr, [A]: { [v]: "https://{Bucket}.s3express-{s3expressAvailabilityZoneId}.dualstack.{Region}.{partitionResult#dnsSuffix}", [k]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4-s3express", [ie]: "s3express", [he]: "{Region}" }] }, [D]: {} }, [d]: A }, { [p]: lr, [A]: { [v]: "https://{Bucket}.s3express-{s3expressAvailabilityZoneId}.{Region}.{partitionResult#dnsSuffix}", [k]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4-s3express", [ie]: "s3express", [he]: "{Region}" }] }, [D]: {} }, [d]: A }], Da = [H, 0, 7, true], Ta = [{ [y]: G, [S]: [H, 7, 15, true], [$]: "s3expressAvailabilityZoneId" }, { [y]: G, [S]: [H, 15, 17, true], [$]: "s3expressAvailabilityZoneDelim" }, { [y]: z, [S]: [{ [I]: "s3expressAvailabilityZoneDelim" }, "--"] }], _a = [{ [y]: G, [S]: [H, 7, 16, true], [$]: "s3expressAvailabilityZoneId" }, { [y]: G, [S]: [H, 16, 18, true], [$]: "s3expressAvailabilityZoneDelim" }, { [y]: z, [S]: [{ [I]: "s3expressAvailabilityZoneDelim" }, "--"] }], Ba = [{ [y]: G, [S]: [H, 7, 20, true], [$]: "s3expressAvailabilityZoneId" }, { [y]: G, [S]: [H, 20, 22, true], [$]: "s3expressAvailabilityZoneDelim" }, { [y]: z, [S]: [{ [I]: "s3expressAvailabilityZoneDelim" }, "--"] }], Ia = [{ [y]: G, [S]: [H, 7, 21, true], [$]: "s3expressAvailabilityZoneId" }, { [y]: G, [S]: [H, 21, 23, true], [$]: "s3expressAvailabilityZoneDelim" }, { [y]: z, [S]: [{ [I]: "s3expressAvailabilityZoneDelim" }, "--"] }], Oa = [{ [y]: G, [S]: [H, 7, 27, true], [$]: "s3expressAvailabilityZoneId" }, { [y]: G, [S]: [H, 27, 29, true], [$]: "s3expressAvailabilityZoneDelim" }, { [y]: z, [S]: [{ [I]: "s3expressAvailabilityZoneDelim" }, "--"] }], Bg = [cr], Ma = [{ [y]: Ot, [S]: [{ [I]: Xn }, false] }], Pa = [{ [y]: z, [S]: [{ [I]: iu }, "beta"] }], Ig = ["*"], Na = [{ [y]: Ot, [S]: [{ [I]: "Region" }, false] }], st = [{ [y]: z, [S]: [{ [I]: "Region" }, "us-east-1"] }], An = [{ [y]: z, [S]: [yu, lu] }], $a = [{ [y]: Z, [S]: [ke, "resourceId[1]"], [$]: Ai }, { [y]: ze, [S]: [{ [y]: z, [S]: [Ri, Kr] }] }], Og = [ke, "resourceId[1]"], Ua = [V], Rn = [{ [y]: ze, [S]: [{ [y]: z, [S]: [{ [y]: Z, [S]: [ke, "region"] }, Kr] }] }], Fa = [{ [y]: ze, [S]: [{ [y]: _e, [S]: [{ [y]: Z, [S]: [ke, "resourceId[2]"] }] }] }], Mg = [ke, "resourceId[2]"], vn = [{ [y]: qr, [S]: [{ [y]: Z, [S]: [ke, "region"] }], [$]: "bucketPartition" }], La = [{ [y]: z, [S]: [Su, { [y]: Z, [S]: [{ [I]: "partitionResult" }, Q] }] }], kn = [{ [y]: Ot, [S]: [{ [y]: Z, [S]: [ke, "region"] }, true] }], Dn = [{ [y]: Ot, [S]: [xu, false] }], Ha = [{ [y]: Ot, [S]: [Ri, false] }], Nr = [K], za = [{ [y]: Ot, [S]: [{ [I]: "Region" }, true] }], Pg = { parameters: { Bucket: Nt, Region: Nt, UseFIPS: $t, UseDualStack: $t, Endpoint: Nt, ForcePathStyle: $t, Accelerate: $t, UseGlobalEndpoint: $t, UseObjectLambdaEndpoint: rr, Key: Nt, Prefix: Nt, CopySource: Nt, DisableAccessPoints: rr, DisableMultiRegionAccessPoints: $t, UseArnRegion: rr, UseS3ExpressControlEndpoint: rr, DisableS3ExpressSessionAuth: rr }, [b]: [{ [p]: [{ [y]: _e, [S]: bn }], [b]: [{ [p]: [Me, K], error: "Accelerate cannot be used with FIPS", [d]: B }, { [p]: [V, J], error: "Cannot set dual-stack in combination with a custom endpoint.", [d]: B }, { [p]: [J, K], error: "A custom endpoint cannot be combined with FIPS", [d]: B }, { [p]: [J, Me], error: "A custom endpoint cannot be combined with S3 Accelerate", [d]: B }, { [p]: [K, hu, Vo], error: "Partition does not support FIPS", [d]: B }, { [p]: [cr, { [y]: G, [S]: [H, 0, Rg, Fe], [$]: Mo }, { [y]: z, [S]: [{ [I]: Mo }, "--x-s3"] }], [b]: [qo, Go, { [p]: [Ko, Xo], [b]: [{ [p]: Oe, [b]: [{ [p]: [mu, P], [b]: [{ [p]: Cn, endpoint: { [v]: "https://s3express-control-fips.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [k]: Te, [D]: M }, [d]: A }, { [p]: ur, endpoint: { [v]: "https://s3express-control-fips.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [k]: Te, [D]: M }, [d]: A }, { [p]: dr, endpoint: { [v]: "https://s3express-control.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [k]: Te, [D]: M }, [d]: A }, { [p]: lr, endpoint: { [v]: "https://s3express-control.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [k]: Te, [D]: M }, [d]: A }], [d]: w }], [d]: w }], [d]: w }, { [p]: En, [b]: [{ [p]: Oe, [b]: [{ [p]: Ea, [b]: [{ [p]: Ca, [b]: Le, [d]: w }, { [p]: Aa, [b]: Le, [d]: w }, { [p]: Ra, [b]: Le, [d]: w }, { [p]: va, [b]: Le, [d]: w }, { [p]: ka, [b]: Le, [d]: w }, Or], [d]: w }, { [p]: Ca, [b]: He, [d]: w }, { [p]: Aa, [b]: He, [d]: w }, { [p]: Ra, [b]: He, [d]: w }, { [p]: va, [b]: He, [d]: w }, { [p]: ka, [b]: He, [d]: w }, Or], [d]: w }], [d]: w }, Wo], [d]: w }, { [p]: [cr, { [y]: G, [S]: Da, [$]: Po }, { [y]: z, [S]: [{ [I]: Po }, "--xa-s3"] }], [b]: [qo, Go, { [p]: En, [b]: [{ [p]: Oe, [b]: [{ [p]: Ea, [b]: [{ [p]: Ta, [b]: Le, [d]: w }, { [p]: _a, [b]: Le, [d]: w }, { [p]: Ba, [b]: Le, [d]: w }, { [p]: Ia, [b]: Le, [d]: w }, { [p]: Oa, [b]: Le, [d]: w }, Or], [d]: w }, { [p]: Ta, [b]: He, [d]: w }, { [p]: _a, [b]: He, [d]: w }, { [p]: Ba, [b]: He, [d]: w }, { [p]: Ia, [b]: He, [d]: w }, { [p]: Oa, [b]: He, [d]: w }, Or], [d]: w }], [d]: w }, Wo], [d]: w }, { [p]: [Zo, Ko, Xo], [b]: [{ [p]: Oe, [b]: [{ [p]: Ut, endpoint: { [v]: $r, [k]: Te, [D]: M }, [d]: A }, { [p]: Cn, endpoint: { [v]: "https://s3express-control-fips.dualstack.{Region}.{partitionResult#dnsSuffix}", [k]: Te, [D]: M }, [d]: A }, { [p]: ur, endpoint: { [v]: "https://s3express-control-fips.{Region}.{partitionResult#dnsSuffix}", [k]: Te, [D]: M }, [d]: A }, { [p]: dr, endpoint: { [v]: "https://s3express-control.dualstack.{Region}.{partitionResult#dnsSuffix}", [k]: Te, [D]: M }, [d]: A }, { [p]: lr, endpoint: { [v]: "https://s3express-control.{Region}.{partitionResult#dnsSuffix}", [k]: Te, [D]: M }, [d]: A }], [d]: w }], [d]: w }, { [p]: [cr, { [y]: G, [S]: [H, 49, 50, Fe], [$]: nu }, { [y]: G, [S]: [H, 8, 12, Fe], [$]: iu }, { [y]: G, [S]: Da, [$]: No }, { [y]: G, [S]: [H, 32, 49, Fe], [$]: Xn }, { [y]: qr, [S]: bn, [$]: "regionPartition" }, { [y]: z, [S]: [{ [I]: No }, "--op-s3"] }], [b]: [{ [p]: Ma, [b]: [{ [p]: En, [b]: [{ [p]: [{ [y]: z, [S]: [Qo, "e"] }], [b]: [{ [p]: Pa, [b]: [Jo, { [p]: Ut, endpoint: { [v]: "https://{Bucket}.ec2.{url#authority}", [k]: Mr, [D]: M }, [d]: A }], [d]: w }, { endpoint: { [v]: "https://{Bucket}.ec2.s3-outposts.{Region}.{regionPartition#dnsSuffix}", [k]: Mr, [D]: M }, [d]: A }], [d]: w }, { [p]: [{ [y]: z, [S]: [Qo, "o"] }], [b]: [{ [p]: Pa, [b]: [Jo, { [p]: Ut, endpoint: { [v]: "https://{Bucket}.op-{outpostId}.{url#authority}", [k]: Mr, [D]: M }, [d]: A }], [d]: w }, { endpoint: { [v]: "https://{Bucket}.op-{outpostId}.s3-outposts.{Region}.{regionPartition#dnsSuffix}", [k]: Mr, [D]: M }, [d]: A }], [d]: w }, { error: 'Unrecognized hardware type: "Expected hardware type o or e but got {hardwareType}"', [d]: B }], [d]: w }, { error: "Invalid Outposts Bucket alias - it must be a valid bucket name.", [d]: B }], [d]: w }, { error: "Invalid ARN: The outpost Id must only contain a-z, A-Z, 0-9 and `-`.", [d]: B }], [d]: w }, { [p]: Bg, [b]: [{ [p]: [J, { [y]: ze, [S]: [{ [y]: _e, [S]: [{ [y]: wi, [S]: Dg }] }] }], error: "Custom endpoint `{Endpoint}` was not a valid URI", [d]: B }, { [p]: [an, gu], [b]: [{ [p]: Oe, [b]: [{ [p]: Na, [b]: [{ [p]: [Me, Vo], error: "S3 Accelerate cannot be used in this region", [d]: B }, { [p]: [V, K, re, P, ae], endpoint: { [v]: "https://{Bucket}.s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}", [k]: ce, [D]: M }, [d]: A }, { [p]: [V, K, re, P, L, ue], [b]: [{ endpoint: Yo, [d]: A }], [d]: w }, { [p]: [V, K, re, P, L, de], endpoint: Yo, [d]: A }, { [p]: [F, K, re, P, ae], endpoint: { [v]: "https://{Bucket}.s3-fips.us-east-1.{partitionResult#dnsSuffix}", [k]: ce, [D]: M }, [d]: A }, { [p]: [F, K, re, P, L, ue], [b]: [{ endpoint: ea, [d]: A }], [d]: w }, { [p]: [F, K, re, P, L, de], endpoint: ea, [d]: A }, { [p]: [V, U, Me, P, ae], endpoint: { [v]: "https://{Bucket}.s3-accelerate.dualstack.us-east-1.{partitionResult#dnsSuffix}", [k]: ce, [D]: M }, [d]: A }, { [p]: [V, U, Me, P, L, ue], [b]: [{ endpoint: ta, [d]: A }], [d]: w }, { [p]: [V, U, Me, P, L, de], endpoint: ta, [d]: A }, { [p]: [V, U, re, P, ae], endpoint: { [v]: "https://{Bucket}.s3.dualstack.us-east-1.{partitionResult#dnsSuffix}", [k]: ce, [D]: M }, [d]: A }, { [p]: [V, U, re, P, L, ue], [b]: [{ endpoint: ra, [d]: A }], [d]: w }, { [p]: [V, U, re, P, L, de], endpoint: ra, [d]: A }, { [p]: [F, U, re, J, we, on, ae], endpoint: { [v]: ou, [k]: ce, [D]: M }, [d]: A }, { [p]: [F, U, re, J, we, cn, ae], endpoint: { [v]: Wr, [k]: ce, [D]: M }, [d]: A }, { [p]: [F, U, re, J, we, on, L, ue], [b]: [{ [p]: st, endpoint: un, [d]: A }, { endpoint: un, [d]: A }], [d]: w }, { [p]: [F, U, re, J, we, cn, L, ue], [b]: [{ [p]: st, endpoint: Zn, [d]: A }, sa], [d]: w }, { [p]: [F, U, re, J, we, on, L, de], endpoint: un, [d]: A }, { [p]: [F, U, re, J, we, cn, L, de], endpoint: Zn, [d]: A }, { [p]: [F, U, Me, P, ae], endpoint: { [v]: au, [k]: ce, [D]: M }, [d]: A }, { [p]: [F, U, Me, P, L, ue], [b]: [{ [p]: st, endpoint: dn, [d]: A }, { endpoint: dn, [d]: A }], [d]: w }, { [p]: [F, U, Me, P, L, de], endpoint: dn, [d]: A }, { [p]: [F, U, re, P, ae], endpoint: { [v]: $o, [k]: ce, [D]: M }, [d]: A }, { [p]: [F, U, re, P, L, ue], [b]: [{ [p]: st, endpoint: { [v]: $o, [k]: oe, [D]: M }, [d]: A }, { endpoint: na, [d]: A }], [d]: w }, { [p]: [F, U, re, P, L, de], endpoint: na, [d]: A }], [d]: w }, Pr], [d]: w }], [d]: w }, { [p]: [J, we, { [y]: z, [S]: [{ [y]: Z, [S]: [pu, "scheme"] }, "http"] }, { [y]: Gr, [S]: [H, Fe] }, an, U, F, re], [b]: [{ [p]: Oe, [b]: [{ [p]: Na, [b]: [sa], [d]: w }, Pr], [d]: w }], [d]: w }, { [p]: [an, { [y]: cu, [S]: Tg, [$]: uu }], [b]: [{ [p]: [{ [y]: Z, [S]: [ke, "resourceId[0]"], [$]: du }, { [y]: ze, [S]: [{ [y]: z, [S]: [yu, Kr] }] }], [b]: [{ [p]: [{ [y]: z, [S]: [ln, Ci] }], [b]: [{ [p]: An, [b]: [{ [p]: $a, [b]: [ia, oa, { [p]: Rn, [b]: [aa, { [p]: Fa, [b]: [fn, { [p]: vn, [b]: [{ [p]: Oe, [b]: [{ [p]: La, [b]: [{ [p]: kn, [b]: [{ [p]: [{ [y]: z, [S]: [xu, Kr] }], error: "Invalid ARN: Missing account id", [d]: B }, { [p]: Dn, [b]: [{ [p]: Ha, [b]: [{ [p]: Ut, endpoint: { [v]: Uo, [k]: hn, [D]: M }, [d]: A }, { [p]: Nr, endpoint: { [v]: "https://{accessPointName}-{bucketArn#accountId}.s3-object-lambda-fips.{bucketArn#region}.{bucketPartition#dnsSuffix}", [k]: hn, [D]: M }, [d]: A }, { endpoint: { [v]: "https://{accessPointName}-{bucketArn#accountId}.s3-object-lambda.{bucketArn#region}.{bucketPartition#dnsSuffix}", [k]: hn, [D]: M }, [d]: A }], [d]: w }, ca], [d]: w }, pn], [d]: w }, mn], [d]: w }, gn], [d]: w }], [d]: w }], [d]: w }, ua], [d]: w }, { error: "Invalid ARN: bucket ARN is missing a region", [d]: B }], [d]: w }, da], [d]: w }, { error: "Invalid ARN: Object Lambda ARNs only support `accesspoint` arn types, but found: `{arnType}`", [d]: B }], [d]: w }, { [p]: An, [b]: [{ [p]: $a, [b]: [{ [p]: Rn, [b]: [{ [p]: An, [b]: [{ [p]: Rn, [b]: [aa, { [p]: Fa, [b]: [fn, { [p]: vn, [b]: [{ [p]: Oe, [b]: [{ [p]: [{ [y]: z, [S]: [Su, "{partitionResult#name}"] }], [b]: [{ [p]: kn, [b]: [{ [p]: [{ [y]: z, [S]: [ln, Kt] }], [b]: [{ [p]: Dn, [b]: [{ [p]: Ha, [b]: [{ [p]: wn, error: "Access Points do not support S3 Accelerate", [d]: B }, { [p]: Cn, endpoint: { [v]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint-fips.dualstack.{bucketArn#region}.{bucketPartition#dnsSuffix}", [k]: sr, [D]: M }, [d]: A }, { [p]: ur, endpoint: { [v]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint-fips.{bucketArn#region}.{bucketPartition#dnsSuffix}", [k]: sr, [D]: M }, [d]: A }, { [p]: dr, endpoint: { [v]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint.dualstack.{bucketArn#region}.{bucketPartition#dnsSuffix}", [k]: sr, [D]: M }, [d]: A }, { [p]: [U, F, J, we], endpoint: { [v]: Uo, [k]: sr, [D]: M }, [d]: A }, { [p]: lr, endpoint: { [v]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint.{bucketArn#region}.{bucketPartition#dnsSuffix}", [k]: sr, [D]: M }, [d]: A }], [d]: w }, ca], [d]: w }, pn], [d]: w }, { error: "Invalid ARN: The ARN was not for the S3 service, found: {bucketArn#service}", [d]: B }], [d]: w }, mn], [d]: w }, gn], [d]: w }], [d]: w }], [d]: w }, ua], [d]: w }], [d]: w }], [d]: w }, { [p]: [{ [y]: Ot, [S]: [Ri, Fe] }], [b]: [{ [p]: Ua, error: "S3 MRAP does not support dual-stack", [d]: B }, { [p]: Nr, error: "S3 MRAP does not support FIPS", [d]: B }, { [p]: wn, error: "S3 MRAP does not support S3 Accelerate", [d]: B }, { [p]: [{ [y]: Y, [S]: [{ [I]: "DisableMultiRegionAccessPoints" }, Fe] }], error: "Invalid configuration: Multi-Region Access Point ARNs are disabled.", [d]: B }, { [p]: [{ [y]: qr, [S]: bn, [$]: Fo }], [b]: [{ [p]: [{ [y]: z, [S]: [{ [y]: Z, [S]: [{ [I]: Fo }, Q] }, { [y]: Z, [S]: [ke, "partition"] }] }], [b]: [{ endpoint: { [v]: "https://{accessPointName}.accesspoint.s3-global.{mrapPartition#dnsSuffix}", [k]: { [le]: [{ [ne]: Fe, name: Ei, [ie]: Kt, [bi]: Ig }] }, [D]: M }, [d]: A }], [d]: w }, { error: "Client was configured for partition `{mrapPartition#name}` but bucket referred to partition `{bucketArn#partition}`", [d]: B }], [d]: w }], [d]: w }, { error: "Invalid Access Point Name", [d]: B }], [d]: w }, da], [d]: w }, { [p]: [{ [y]: z, [S]: [ln, yr] }], [b]: [{ [p]: Ua, error: "S3 Outposts does not support Dual-stack", [d]: B }, { [p]: Nr, error: "S3 Outposts does not support FIPS", [d]: B }, { [p]: wn, error: "S3 Outposts does not support S3 Accelerate", [d]: B }, { [p]: [{ [y]: _e, [S]: [{ [y]: Z, [S]: [ke, "resourceId[4]"] }] }], error: "Invalid Arn: Outpost Access Point ARN contains sub resources", [d]: B }, { [p]: [{ [y]: Z, [S]: Og, [$]: Xn }], [b]: [{ [p]: Ma, [b]: [fn, { [p]: vn, [b]: [{ [p]: Oe, [b]: [{ [p]: La, [b]: [{ [p]: kn, [b]: [{ [p]: Dn, [b]: [{ [p]: [{ [y]: Z, [S]: Mg, [$]: Lo }], [b]: [{ [p]: [{ [y]: Z, [S]: [ke, "resourceId[3]"], [$]: Ai }], [b]: [{ [p]: [{ [y]: z, [S]: [{ [I]: Lo }, lu] }], [b]: [{ [p]: Ut, endpoint: { [v]: "https://{accessPointName}-{bucketArn#accountId}.{outpostId}.{url#authority}", [k]: la, [D]: M }, [d]: A }, { endpoint: { [v]: "https://{accessPointName}-{bucketArn#accountId}.{outpostId}.s3-outposts.{bucketArn#region}.{bucketPartition#dnsSuffix}", [k]: la, [D]: M }, [d]: A }], [d]: w }, { error: "Expected an outpost type `accesspoint`, found {outpostType}", [d]: B }], [d]: w }, { error: "Invalid ARN: expected an access point name", [d]: B }], [d]: w }, { error: "Invalid ARN: Expected a 4-component resource", [d]: B }], [d]: w }, pn], [d]: w }, mn], [d]: w }, gn], [d]: w }], [d]: w }], [d]: w }, { error: "Invalid ARN: The outpost Id may only contain a-z, A-Z, 0-9 and `-`. Found: `{outpostId}`", [d]: B }], [d]: w }, { error: "Invalid ARN: The Outpost Id was not set", [d]: B }], [d]: w }, { error: "Invalid ARN: Unrecognized format: {Bucket} (type: {arnType})", [d]: B }], [d]: w }, { error: "Invalid ARN: No ARN type specified", [d]: B }], [d]: w }, { [p]: [{ [y]: G, [S]: [H, 0, 4, vg], [$]: Ho }, { [y]: z, [S]: [{ [I]: Ho }, "arn:"] }, { [y]: ze, [S]: [{ [y]: _e, [S]: [fa] }] }], error: "Invalid ARN: `{Bucket}` was not a valid ARN", [d]: B }, { [p]: [{ [y]: Y, [S]: [kg, Fe] }, fa], error: "Path-style addressing cannot be used with ARN buckets", [d]: B }, { [p]: _g, [b]: [{ [p]: Oe, [b]: [{ [p]: [re], [b]: [{ [p]: [V, P, K, ae], endpoint: { [v]: "https://s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [k]: ce, [D]: M }, [d]: A }, { [p]: [V, P, K, L, ue], [b]: [{ endpoint: ha, [d]: A }], [d]: w }, { [p]: [V, P, K, L, de], endpoint: ha, [d]: A }, { [p]: [F, P, K, ae], endpoint: { [v]: "https://s3-fips.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [k]: ce, [D]: M }, [d]: A }, { [p]: [F, P, K, L, ue], [b]: [{ endpoint: pa, [d]: A }], [d]: w }, { [p]: [F, P, K, L, de], endpoint: pa, [d]: A }, { [p]: [V, P, U, ae], endpoint: { [v]: "https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [k]: ce, [D]: M }, [d]: A }, { [p]: [V, P, U, L, ue], [b]: [{ endpoint: ma, [d]: A }], [d]: w }, { [p]: [V, P, U, L, de], endpoint: ma, [d]: A }, { [p]: [F, J, we, U, ae], endpoint: { [v]: fu, [k]: ce, [D]: M }, [d]: A }, { [p]: [F, J, we, U, L, ue], [b]: [{ [p]: st, endpoint: yn, [d]: A }, { endpoint: yn, [d]: A }], [d]: w }, { [p]: [F, J, we, U, L, de], endpoint: yn, [d]: A }, { [p]: [F, P, U, ae], endpoint: { [v]: zo, [k]: ce, [D]: M }, [d]: A }, { [p]: [F, P, U, L, ue], [b]: [{ [p]: st, endpoint: { [v]: zo, [k]: oe, [D]: M }, [d]: A }, { endpoint: ga, [d]: A }], [d]: w }, { [p]: [F, P, U, L, de], endpoint: ga, [d]: A }], [d]: w }, { error: "Path-style addressing cannot be used with S3 Accelerate", [d]: B }], [d]: w }], [d]: w }], [d]: w }, { [p]: [{ [y]: _e, [S]: [ya] }, { [y]: Y, [S]: [ya, Fe] }], [b]: [{ [p]: Oe, [b]: [{ [p]: za, [b]: [ia, oa, { [p]: Ut, endpoint: { [v]: $r, [k]: Sn, [D]: M }, [d]: A }, { [p]: Nr, endpoint: { [v]: "https://s3-object-lambda-fips.{Region}.{partitionResult#dnsSuffix}", [k]: Sn, [D]: M }, [d]: A }, { endpoint: { [v]: "https://s3-object-lambda.{Region}.{partitionResult#dnsSuffix}", [k]: Sn, [D]: M }, [d]: A }], [d]: w }, Pr], [d]: w }], [d]: w }, { [p]: [Zo], [b]: [{ [p]: Oe, [b]: [{ [p]: za, [b]: [{ [p]: [K, V, P, ae], endpoint: { [v]: "https://s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}", [k]: ce, [D]: M }, [d]: A }, { [p]: [K, V, P, L, ue], [b]: [{ endpoint: Sa, [d]: A }], [d]: w }, { [p]: [K, V, P, L, de], endpoint: Sa, [d]: A }, { [p]: [K, F, P, ae], endpoint: { [v]: "https://s3-fips.us-east-1.{partitionResult#dnsSuffix}", [k]: ce, [D]: M }, [d]: A }, { [p]: [K, F, P, L, ue], [b]: [{ endpoint: xa, [d]: A }], [d]: w }, { [p]: [K, F, P, L, de], endpoint: xa, [d]: A }, { [p]: [U, V, P, ae], endpoint: { [v]: "https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}", [k]: ce, [D]: M }, [d]: A }, { [p]: [U, V, P, L, ue], [b]: [{ endpoint: ba, [d]: A }], [d]: w }, { [p]: [U, V, P, L, de], endpoint: ba, [d]: A }, { [p]: [U, F, J, we, ae], endpoint: { [v]: $r, [k]: ce, [D]: M }, [d]: A }, { [p]: [U, F, J, we, L, ue], [b]: [{ [p]: st, endpoint: xn, [d]: A }, { endpoint: xn, [d]: A }], [d]: w }, { [p]: [U, F, J, we, L, de], endpoint: xn, [d]: A }, { [p]: [U, F, P, ae], endpoint: { [v]: jo, [k]: ce, [D]: M }, [d]: A }, { [p]: [U, F, P, L, ue], [b]: [{ [p]: st, endpoint: { [v]: jo, [k]: oe, [D]: M }, [d]: A }, { endpoint: wa, [d]: A }], [d]: w }, { [p]: [U, F, P, L, de], endpoint: wa, [d]: A }], [d]: w }, Pr], [d]: w }], [d]: w }], [d]: w }, { error: "A region must be set when sending requests to S3.", [d]: B }] }, Ng = Pg, $g = new Zp({ size: 50, params: ["Accelerate", "Bucket", "DisableAccessPoints", "DisableMultiRegionAccessPoints", "DisableS3ExpressSessionAuth", "Endpoint", "ForcePathStyle", "Region", "UseArnRegion", "UseDualStack", "UseFIPS", "UseGlobalEndpoint", "UseObjectLambdaEndpoint", "UseS3ExpressControlEndpoint"] }), bu = (t, e = {}) => $g.get(t, () => mm(Ng, { endpointParams: t, logger: e.logger }));
zr.aws = Xc;
const Ug = (t) => async (e, r, s) => {
  var _a2, _b2, _c2;
  if (!s) throw new Error("Could not find `input` for `defaultEndpointRuleSetHttpAuthSchemeParametersProvider`");
  const n = await t(e, r, s), i = (_c2 = (_b2 = (_a2 = ft(r)) == null ? void 0 : _a2.commandInstance) == null ? void 0 : _b2.constructor) == null ? void 0 : _c2.getEndpointParameterInstructions;
  if (!i) throw new Error(`getEndpointParameterInstructions() is not defined on '${r.commandName}'`);
  const o = await eu(s, { getEndpointParameterInstructions: i }, e);
  return Object.assign(n, o);
}, Fg = async (t, e, r) => ({ operation: ft(e).operation, region: await Ne(t.region)() || (() => {
  throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
})() }), Lg = Ug(Fg);
function wu(t) {
  return { schemeId: "aws.auth#sigv4", signingProperties: { name: "s3", region: t.region }, propertiesExtractor: (e, r) => ({ signingProperties: { config: e, context: r } }) };
}
function Eu(t) {
  return { schemeId: "aws.auth#sigv4a", signingProperties: { name: "s3", region: t.region }, propertiesExtractor: (e, r) => ({ signingProperties: { config: e, context: r } }) };
}
const Hg = (t, e, r) => (n) => {
  var _a2;
  const o = (_a2 = t(n).properties) == null ? void 0 : _a2.authSchemes;
  if (!o) return e(n);
  const a = [];
  for (const c of o) {
    const { name: u, properties: m = {}, ...l } = c, h = u.toLowerCase();
    u !== h && console.warn(`HttpAuthScheme has been normalized with lowercasing: '${u}' to '${h}'`);
    let g;
    if (h === "sigv4a") {
      g = "aws.auth#sigv4a";
      const C = o.find((T) => {
        const R = T.name.toLowerCase();
        return R !== "sigv4a" && R.startsWith("sigv4");
      });
      if (Si.sigv4aDependency() === "none" && C) continue;
    } else if (h.startsWith("sigv4")) g = "aws.auth#sigv4";
    else throw new Error(`Unknown HttpAuthScheme found in '@smithy.rules#endpointRuleSet': '${h}'`);
    const x = r[g];
    if (!x) throw new Error(`Could not find HttpAuthOption create function for '${g}'`);
    const E = x(n);
    E.schemeId = g, E.signingProperties = { ...E.signingProperties || {}, ...l, ...m }, a.push(E);
  }
  return a;
}, zg = (t) => {
  const e = [];
  switch (t.operation) {
    default:
      e.push(wu(t)), e.push(Eu(t));
  }
  return e;
}, jg = Hg(bu, zg, { "aws.auth#sigv4": wu, "aws.auth#sigv4a": Eu }), Vg = (t) => {
  const e = ah(t), r = Pf(e);
  return Object.assign(r, { authSchemePreference: Ne(t.authSchemePreference ?? []) });
}, qg = (t) => Object.assign(t, { useFipsEndpoint: t.useFipsEndpoint ?? false, useDualstackEndpoint: t.useDualstackEndpoint ?? false, forcePathStyle: t.forcePathStyle ?? false, useAccelerateEndpoint: t.useAccelerateEndpoint ?? false, useGlobalEndpoint: t.useGlobalEndpoint ?? false, disableMultiregionAccessPoints: t.disableMultiregionAccessPoints ?? false, defaultSigningName: "s3", clientContextParams: t.clientContextParams ?? {} }), Ge = { ForcePathStyle: { type: "clientContextParams", name: "forcePathStyle" }, UseArnRegion: { type: "clientContextParams", name: "useArnRegion" }, DisableMultiRegionAccessPoints: { type: "clientContextParams", name: "disableMultiregionAccessPoints" }, Accelerate: { type: "clientContextParams", name: "useAccelerateEndpoint" }, DisableS3ExpressSessionAuth: { type: "clientContextParams", name: "disableS3ExpressSessionAuth" }, UseGlobalEndpoint: { type: "builtInParams", name: "useGlobalEndpoint" }, UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" }, Endpoint: { type: "builtInParams", name: "endpoint" }, Region: { type: "builtInParams", name: "region" }, UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" } };
class fe extends Lt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, fe.prototype);
  }
}
class vi extends fe {
  constructor(e) {
    super({ name: "NoSuchUpload", $fault: "client", ...e });
    __publicField(this, "name", "NoSuchUpload");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, vi.prototype);
  }
}
class ki extends fe {
  constructor(e) {
    super({ name: "AccessDenied", $fault: "client", ...e });
    __publicField(this, "name", "AccessDenied");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, ki.prototype);
  }
}
class Di extends fe {
  constructor(e) {
    super({ name: "ObjectNotInActiveTierError", $fault: "client", ...e });
    __publicField(this, "name", "ObjectNotInActiveTierError");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Di.prototype);
  }
}
class Ti extends fe {
  constructor(e) {
    super({ name: "BucketAlreadyExists", $fault: "client", ...e });
    __publicField(this, "name", "BucketAlreadyExists");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Ti.prototype);
  }
}
class _i extends fe {
  constructor(e) {
    super({ name: "BucketAlreadyOwnedByYou", $fault: "client", ...e });
    __publicField(this, "name", "BucketAlreadyOwnedByYou");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, _i.prototype);
  }
}
class Bi extends fe {
  constructor(e) {
    super({ name: "NoSuchBucket", $fault: "client", ...e });
    __publicField(this, "name", "NoSuchBucket");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Bi.prototype);
  }
}
class Ii extends fe {
  constructor(e) {
    super({ name: "InvalidObjectState", $fault: "client", ...e });
    __publicField(this, "name", "InvalidObjectState");
    __publicField(this, "$fault", "client");
    __publicField(this, "StorageClass");
    __publicField(this, "AccessTier");
    Object.setPrototypeOf(this, Ii.prototype), this.StorageClass = e.StorageClass, this.AccessTier = e.AccessTier;
  }
}
class Oi extends fe {
  constructor(e) {
    super({ name: "NoSuchKey", $fault: "client", ...e });
    __publicField(this, "name", "NoSuchKey");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Oi.prototype);
  }
}
class Mi extends fe {
  constructor(e) {
    super({ name: "NotFound", $fault: "client", ...e });
    __publicField(this, "name", "NotFound");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Mi.prototype);
  }
}
class Pi extends fe {
  constructor(e) {
    super({ name: "EncryptionTypeMismatch", $fault: "client", ...e });
    __publicField(this, "name", "EncryptionTypeMismatch");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Pi.prototype);
  }
}
class Ni extends fe {
  constructor(e) {
    super({ name: "InvalidRequest", $fault: "client", ...e });
    __publicField(this, "name", "InvalidRequest");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Ni.prototype);
  }
}
class $i extends fe {
  constructor(e) {
    super({ name: "InvalidWriteOffset", $fault: "client", ...e });
    __publicField(this, "name", "InvalidWriteOffset");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, $i.prototype);
  }
}
class Ui extends fe {
  constructor(e) {
    super({ name: "TooManyParts", $fault: "client", ...e });
    __publicField(this, "name", "TooManyParts");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Ui.prototype);
  }
}
class Fi extends fe {
  constructor(e) {
    super({ name: "IdempotencyParameterMismatch", $fault: "client", ...e });
    __publicField(this, "name", "IdempotencyParameterMismatch");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Fi.prototype);
  }
}
class Li extends fe {
  constructor(e) {
    super({ name: "ObjectAlreadyInActiveTierError", $fault: "client", ...e });
    __publicField(this, "name", "ObjectAlreadyInActiveTierError");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Li.prototype);
  }
}
const Cu = "ACL", Gg = "AccessDenied", ja = "AccessKeyId", Au = "AcceptRanges", Wg = "ArchiveStatus", Kg = "AccessTier", We = "Bucket", Xg = "BucketAlreadyExists", Zg = "BucketAlreadyOwnedByYou", Ru = "BypassGovernanceRetention", ht = "BucketKeyEnabled", vu = "Body", Sr = "ChecksumAlgorithm", ts = "CacheControl", xr = "ChecksumCRC32", br = "ChecksumCRC32C", wr = "ChecksumCRC64NVME", rs = "Cache-Control", ss = "Content-Disposition", ns = "ContentDisposition", is = "Content-Encoding", os = "ContentEncoding", as = "ContentLanguage", cs = "Content-Language", Hi = "Content-Length", zi = "ContentLength", Qg = "Content-MD5", Jg = "ContentMD5", ku = "ChecksumMode", Yg = "CopyObject", e0 = "CopyObjectOutput", Du = "CopyObjectResult", t0 = "CopyObjectRequest", r0 = "CommonPrefix", s0 = "CommonPrefixList", Tu = "CommonPrefixes", _u = "ContentRange", Bu = "Content-Range", n0 = "CopySource", Er = "ChecksumSHA1", Cr = "ChecksumSHA256", i0 = "CopySourceIfMatch", o0 = "CopySourceIfModifiedSince", a0 = "CopySourceIfNoneMatch", c0 = "CopySourceIfUnmodifiedSince", u0 = "CreateSessionOutput", d0 = "CreateSessionResult", l0 = "CreateSessionRequest", f0 = "CopySourceSSECustomerAlgorithm", Iu = "CopySourceSSECustomerKey", h0 = "CopySourceSSECustomerKeyMD5", p0 = "CopySourceVersionId", m0 = "CreateSession", Zt = "ChecksumType", us = "Content-Type", ds = "ContentType", Ou = "ContinuationToken", g0 = "Code", y0 = "Contents", Va = "Credentials", Ar = "DeleteMarker", S0 = "DeleteMarkerEntry", x0 = "DeleteMarkerVersionId", Mu = "DeleteMarkers", b0 = "DisplayName", w0 = "DeletedObject", E0 = "DeleteObjectOutput", C0 = "DeleteObjectsOutput", A0 = "DeleteObjectRequest", R0 = "DeleteObjectsRequest", v0 = "DeletedObjects", k0 = "DeleteObject", D0 = "DeleteObjects", T0 = "DeleteResult", Qn = "Delete", _0 = "Deleted", ls = "Delimiter", Xt = "Expiration", Ye = "ExpectedBucketOwner", Xr = "ExpiresString", B0 = "ExpectedSourceBucketOwner", I0 = "EncryptionTypeMismatch", Ve = "ETag", fs = "EncodingType", Pu = "Errors", Nu = "Error", lt = "Expires", O0 = "FetchOwner", M0 = "GetBucketVersioning", P0 = "GetBucketVersioningOutput", N0 = "GetBucketVersioningRequest", $u = "GrantFullControl", $0 = "GetObject", U0 = "GetObjectOutput", F0 = "GetObjectRequest", Uu = "GrantRead", Fu = "GrantReadACP", Lu = "GrantWriteACP", L0 = "HeadObject", H0 = "HeadObjectOutput", z0 = "HeadObjectRequest", j0 = "ID", Hu = "IsLatest", Rr = "IfMatch", V0 = "IfMatchLastModifiedTime", q0 = "IfMatchSize", zu = "If-Modified-Since", ju = "IfModifiedSince", vr = "If-Match", hs = "IfNoneMatch", ps = "If-None-Match", G0 = "InvalidObjectState", W0 = "IdempotencyParameterMismatch", K0 = "InvalidRequest", X0 = "IsRestoreInProgress", Vu = "IsTruncated", qu = "IfUnmodifiedSince", Gu = "If-Unmodified-Since", Z0 = "InvalidWriteOffset", Ue = "Key", Q0 = "KeyCount", Wu = "KeyMarker", J0 = "ListBucketResult", Qt = "LastModified", Y0 = "LastModifiedTime", Ku = "Last-Modified", ey = "ListObjectsV2", ty = "ListObjectsV2Output", ry = "ListObjectVersionsOutput", sy = "ListObjectsV2Request", ny = "ListObjectVersionsRequest", iy = "ListObjectVersions", oy = "ListVersionsResult", ms = "Metadata", ay = "MetadataDirective", cy = "MfaDelete", Xu = "MFA", uy = "MFADelete", gs = "MaxKeys", Zu = "MissingMeta", dy = "Message", Qu = "Name", ly = "NextContinuationToken", fy = "NotFound", hy = "NextKeyMarker", py = "NoSuchBucket", my = "NoSuchKey", gy = "NoSuchUpload", yy = "NextVersionIdMarker", ys = "Owner", Sy = "ObjectAlreadyInActiveTierError", xy = "ObjectIdentifier", by = "ObjectIdentifierList", Ss = "ObjectLockLegalHoldStatus", xs = "ObjectLockMode", bs = "ObjectLockRetainUntilDate", wy = "ObjectList", Ey = "ObjectNotInActiveTierError", Ju = "OptionalObjectAttributes", Cy = "ObjectVersion", Ay = "ObjectVersionList", Ry = "Objects", Yu = "Object", kr = "Prefix", ed = "PartsCount", td = "PartNumber", vy = "PutObject", ky = "PutObjectOutput", Dy = "PutObjectRequest", Ty = "Quiet", pt = "RequestCharged", rd = "ResponseCacheControl", sd = "ResponseContentDisposition", nd = "ResponseContentEncoding", id = "ResponseContentLanguage", od = "ResponseContentType", ad = "ResponseExpires", _y = "RestoreExpiryDate", mt = "RequestPayer", cd = "ReplicationStatus", ji = "RestoreStatus", Zr = "Range", ud = "Restore", By = "Status", dd = "StartAfter", qa = "SecretAccessKey", Iy = "StreamingBlob", Mt = "StorageClass", Oy = "SessionCredentialValue", My = "SessionCredentials", Py = "SessionMode", gt = "ServerSideEncryption", yt = "SSECustomerAlgorithm", Dr = "SSECustomerKey", St = "SSECustomerKeyMD5", Pt = "SSEKMSEncryptionContext", et = "SSEKMSKeyId", Ga = "SessionToken", ws = "Size", ld = "TagCount", Ny = "TaggingDirective", $y = "TooManyParts", fd = "Tagging", Uy = "VersioningConfiguration", Ie = "VersionId", hd = "VersionIdMarker", Fy = "Versions", Ly = "Version", Hy = "WriteOffsetBytes", Es = "WebsiteRedirectLocation", pd = "accept-ranges", Ce = "client", zy = "continuation-token", md = "delimiter", Ae = "error", gd = "encoding-type", jy = "fetch-owner", Ke = "http", Vi = "httpChecksum", De = "httpError", f = "httpHeader", Vy = "httpPayload", Cs = "httpPrefixHeaders", j = "httpQuery", qy = "key-marker", yd = "max-keys", Sd = "prefix", xd = "partNumber", bd = "response-cache-control", wd = "response-content-disposition", Ed = "response-content-encoding", Cd = "response-content-language", Ad = "response-content-type", Rd = "response-expires", vd = "smithy.ts.sdk.synthetic.com.amazonaws.s3", Gy = "start-after", Wy = "streaming", qi = "versionId", Ky = "version-id-marker", je = "xmlFlattened", xe = "xmlName", kd = "x-amz-acl", Xy = "x-amz-archive-status", Dd = "x-amz-bypass-governance-retention", Zy = "x-amz-checksum-algorithm", As = "x-amz-checksum-crc32", Rs = "x-amz-checksum-crc32c", vs = "x-amz-checksum-crc64nvme", Td = "x-amz-checksum-mode", ks = "x-amz-checksum-sha1", Ds = "x-amz-checksum-sha256", Qy = "x-amz-copy-source", Jy = "x-amz-copy-source-if-match", Yy = "x-amz-copy-source-if-modified-since", eS = "x-amz-copy-source-if-none-match", tS = "x-amz-copy-source-if-unmodified-since", rS = "x-amz-create-session-mode", sS = "x-amz-copy-source-server-side-encryption-customer-algorithm", nS = "x-amz-copy-source-server-side-encryption-customer-key", iS = "x-amz-copy-source-server-side-encryption-customer-key-MD5", oS = "x-amz-copy-source-version-id", Gi = "x-amz-checksum-type", Wi = "x-amz-delete-marker", Ts = "x-amz-expiration", tt = "x-amz-expected-bucket-owner", _d = "x-amz-grant-full-control", Bd = "x-amz-grant-read", Id = "x-amz-grant-read-acp", Od = "x-amz-grant-write-acp", aS = "x-amz-if-match-last-modified-time", cS = "x-amz-if-match-size", _s = "x-amz-meta-", Md = "x-amz-mfa", uS = "x-amz-metadata-directive", Pd = "x-amz-missing-meta", Nd = "x-amz-mp-parts-count", Bs = "x-amz-object-lock-legal-hold", Is = "x-amz-object-lock-mode", Os = "x-amz-object-lock-retain-until-date", $d = "x-amz-optional-object-attributes", dS = "x-amz-object-size", Ud = "x-amz-restore", xt = "x-amz-request-charged", bt = "x-amz-request-payer", Fd = "x-amz-replication-status", Ms = "x-amz-storage-class", Ld = "x-amz-sdk-checksum-algorithm", lS = "x-amz-source-expected-bucket-owner", wt = "x-amz-server-side-encryption", Et = "x-amz-server-side-encryption-aws-kms-key-id", Ct = "x-amz-server-side-encryption-bucket-key-enabled", Jt = "x-amz-server-side-encryption-context", At = "x-amz-server-side-encryption-customer-algorithm", Ps = "x-amz-server-side-encryption-customer-key", Rt = "x-amz-server-side-encryption-customer-key-MD5", Hd = "x-amz-tagging", zd = "x-amz-tagging-count", fS = "x-amz-tagging-directive", Tr = "x-amz-version-id", hS = "x-amz-write-offset-bytes", Ns = "x-amz-website-redirect-location", _ = "com.amazonaws.s3", jd = Re.for(vd);
var pS = [-3, vd, "S3ServiceException", 0, [], []];
jd.registerError(pS, fe);
const be = Re.for(_);
var mS = [-3, _, Gg, { [Ae]: Ce, [De]: 403 }, [], []];
be.registerError(mS, ki);
var gS = [-3, _, Xg, { [Ae]: Ce, [De]: 409 }, [], []];
be.registerError(gS, Ti);
var yS = [-3, _, Zg, { [Ae]: Ce, [De]: 409 }, [], []];
be.registerError(yS, _i);
var SS = [-3, _, I0, { [Ae]: Ce, [De]: 400 }, [], []];
be.registerError(SS, Pi);
var xS = [-3, _, W0, { [Ae]: Ce, [De]: 400 }, [], []];
be.registerError(xS, Fi);
var bS = [-3, _, G0, { [Ae]: Ce, [De]: 403 }, [Mt, Kg], [0, 0]];
be.registerError(bS, Ii);
var wS = [-3, _, K0, { [Ae]: Ce, [De]: 400 }, [], []];
be.registerError(wS, Ni);
var ES = [-3, _, Z0, { [Ae]: Ce, [De]: 400 }, [], []];
be.registerError(ES, $i);
var CS = [-3, _, py, { [Ae]: Ce, [De]: 404 }, [], []];
be.registerError(CS, Bi);
var AS = [-3, _, my, { [Ae]: Ce, [De]: 404 }, [], []];
be.registerError(AS, Oi);
var RS = [-3, _, gy, { [Ae]: Ce, [De]: 404 }, [], []];
be.registerError(RS, vi);
var vS = [-3, _, fy, { [Ae]: Ce }, [], []];
be.registerError(vS, Mi);
var kS = [-3, _, Sy, { [Ae]: Ce, [De]: 403 }, [], []];
be.registerError(kS, Li);
var DS = [-3, _, Ey, { [Ae]: Ce, [De]: 403 }, [], []];
be.registerError(DS, Di);
var TS = [-3, _, $y, { [Ae]: Ce, [De]: 400 }, [], []];
be.registerError(TS, Ui);
const _S = [jd, be];
var BS = [0, _, Iu, 8, 0], Wa = [0, _, Oy, 8, 0], $s = [0, _, Dr, 8, 0], Yt = [0, _, Pt, 8, 0], vt = [0, _, et, 8, 0], Vd = [0, _, Iy, { [Wy]: 1 }, 42], IS = [3, _, r0, 0, [kr], [0]], OS = [3, _, e0, 0, [Du, Xt, p0, Ie, gt, yt, St, et, Pt, ht, pt], [[() => PS, 16], [0, { [f]: Ts }], [0, { [f]: oS }], [0, { [f]: Tr }], [0, { [f]: wt }], [0, { [f]: At }], [0, { [f]: Rt }], [() => vt, { [f]: Et }], [() => Yt, { [f]: Jt }], [2, { [f]: Ct }], [0, { [f]: xt }]]], MS = [3, _, t0, 0, [We, n0, Ue, Cu, ts, Sr, ns, os, as, ds, i0, o0, a0, c0, lt, $u, Uu, Fu, Lu, Rr, hs, ms, ay, Ny, gt, Mt, Es, yt, Dr, St, et, Pt, ht, f0, Iu, h0, mt, fd, xs, bs, Ss, Ye, B0], [[0, 1], [0, { [f]: Qy }], [0, 1], [0, { [f]: kd }], [0, { [f]: rs }], [0, { [f]: Zy }], [0, { [f]: ss }], [0, { [f]: is }], [0, { [f]: cs }], [0, { [f]: us }], [0, { [f]: Jy }], [4, { [f]: Yy }], [0, { [f]: eS }], [4, { [f]: tS }], [4, { [f]: lt }], [0, { [f]: _d }], [0, { [f]: Bd }], [0, { [f]: Id }], [0, { [f]: Od }], [0, { [f]: vr }], [0, { [f]: ps }], [128, { [Cs]: _s }], [0, { [f]: uS }], [0, { [f]: fS }], [0, { [f]: wt }], [0, { [f]: Ms }], [0, { [f]: Ns }], [0, { [f]: At }], [() => $s, { [f]: Ps }], [0, { [f]: Rt }], [() => vt, { [f]: Et }], [() => Yt, { [f]: Jt }], [2, { [f]: Ct }], [0, { [f]: sS }], [() => BS, { [f]: nS }], [0, { [f]: iS }], [0, { [f]: bt }], [0, { [f]: Hd }], [0, { [f]: Is }], [5, { [f]: Os }], [0, { [f]: Bs }], [0, { [f]: tt }], [0, { [f]: lS }]], 3], PS = [3, _, Du, 0, [Ve, Qt, Zt, xr, br, wr, Er, Cr], [0, 4, 0, 0, 0, 0, 0, 0]], NS = [3, _, u0, { [xe]: d0 }, [Va, gt, et, Pt, ht], [[() => ax, { [xe]: Va }], [0, { [f]: wt }], [() => vt, { [f]: Et }], [() => Yt, { [f]: Jt }], [2, { [f]: Ct }]], 1], $S = [3, _, l0, 0, [We, Py, gt, et, Pt, ht], [[0, 1], [0, { [f]: rS }], [0, { [f]: wt }], [() => vt, { [f]: Et }], [() => Yt, { [f]: Jt }], [2, { [f]: Ct }]], 1], US = [3, _, Qn, 0, [Ry, Ty], [[() => lx, { [je]: 1, [xe]: Yu }], 2], 1], FS = [3, _, w0, 0, [Ue, Ie, Ar, x0], [0, 0, 2, 0]], LS = [3, _, S0, 0, [ys, Ue, Ie, Hu, Qt], [() => Ki, 0, 0, 2, 4]], HS = [3, _, E0, 0, [Ar, Ie, pt], [[2, { [f]: Wi }], [0, { [f]: Tr }], [0, { [f]: xt }]]], zS = [3, _, A0, 0, [We, Ue, Xu, Ie, mt, Ru, Ye, Rr, V0, q0], [[0, 1], [0, 1], [0, { [f]: Md }], [0, { [j]: qi }], [0, { [f]: bt }], [2, { [f]: Dd }], [0, { [f]: tt }], [0, { [f]: vr }], [6, { [f]: aS }], [1, { [f]: cS }]], 2], jS = [3, _, C0, { [xe]: T0 }, [_0, pt, Pu], [[() => cx, { [je]: 1 }], [0, { [f]: xt }], [() => dx, { [je]: 1, [xe]: Nu }]]], VS = [3, _, R0, 0, [We, Qn, Xu, mt, Ru, Ye, Sr], [[0, 1], [() => US, { [Vy]: 1, [xe]: Qn }], [0, { [f]: Md }], [0, { [f]: bt }], [2, { [f]: Dd }], [0, { [f]: tt }], [0, { [f]: Ld }]], 2], qS = [3, _, Nu, 0, [Ue, Ie, g0, dy], [0, 0, 0, 0]], GS = [3, _, P0, { [xe]: Uy }, [By, uy], [0, [0, { [xe]: cy }]]], WS = [3, _, N0, 0, [We, Ye], [[0, 1], [0, { [f]: tt }]], 1], KS = [3, _, U0, 0, [vu, Ar, Au, Xt, ud, Qt, zi, Ve, xr, br, wr, Er, Cr, Zt, Zu, Ie, ts, ns, os, as, _u, ds, lt, Xr, Es, gt, ms, yt, St, et, ht, Mt, pt, cd, ed, ld, xs, bs, Ss], [[() => Vd, 16], [2, { [f]: Wi }], [0, { [f]: pd }], [0, { [f]: Ts }], [0, { [f]: Ud }], [4, { [f]: Ku }], [1, { [f]: Hi }], [0, { [f]: Ve }], [0, { [f]: As }], [0, { [f]: Rs }], [0, { [f]: vs }], [0, { [f]: ks }], [0, { [f]: Ds }], [0, { [f]: Gi }], [1, { [f]: Pd }], [0, { [f]: Tr }], [0, { [f]: rs }], [0, { [f]: ss }], [0, { [f]: is }], [0, { [f]: cs }], [0, { [f]: Bu }], [0, { [f]: us }], [4, { [f]: lt }], [0, { [f]: Xr }], [0, { [f]: Ns }], [0, { [f]: wt }], [128, { [Cs]: _s }], [0, { [f]: At }], [0, { [f]: Rt }], [() => vt, { [f]: Et }], [2, { [f]: Ct }], [0, { [f]: Ms }], [0, { [f]: xt }], [0, { [f]: Fd }], [1, { [f]: Nd }], [1, { [f]: zd }], [0, { [f]: Is }], [5, { [f]: Os }], [0, { [f]: Bs }]]], XS = [3, _, F0, 0, [We, Ue, Rr, ju, hs, qu, Zr, rd, sd, nd, id, od, ad, Ie, yt, Dr, St, mt, td, Ye, ku], [[0, 1], [0, 1], [0, { [f]: vr }], [4, { [f]: zu }], [0, { [f]: ps }], [4, { [f]: Gu }], [0, { [f]: Zr }], [0, { [j]: bd }], [0, { [j]: wd }], [0, { [j]: Ed }], [0, { [j]: Cd }], [0, { [j]: Ad }], [6, { [j]: Rd }], [0, { [j]: qi }], [0, { [f]: At }], [() => $s, { [f]: Ps }], [0, { [f]: Rt }], [0, { [f]: bt }], [1, { [j]: xd }], [0, { [f]: tt }], [0, { [f]: Td }]], 2], ZS = [3, _, H0, 0, [Ar, Au, Xt, ud, Wg, Qt, zi, xr, br, wr, Er, Cr, Zt, Ve, Zu, Ie, ts, ns, os, as, ds, _u, lt, Xr, Es, gt, ms, yt, St, et, ht, Mt, pt, cd, ed, ld, xs, bs, Ss], [[2, { [f]: Wi }], [0, { [f]: pd }], [0, { [f]: Ts }], [0, { [f]: Ud }], [0, { [f]: Xy }], [4, { [f]: Ku }], [1, { [f]: Hi }], [0, { [f]: As }], [0, { [f]: Rs }], [0, { [f]: vs }], [0, { [f]: ks }], [0, { [f]: Ds }], [0, { [f]: Gi }], [0, { [f]: Ve }], [1, { [f]: Pd }], [0, { [f]: Tr }], [0, { [f]: rs }], [0, { [f]: ss }], [0, { [f]: is }], [0, { [f]: cs }], [0, { [f]: us }], [0, { [f]: Bu }], [4, { [f]: lt }], [0, { [f]: Xr }], [0, { [f]: Ns }], [0, { [f]: wt }], [128, { [Cs]: _s }], [0, { [f]: At }], [0, { [f]: Rt }], [() => vt, { [f]: Et }], [2, { [f]: Ct }], [0, { [f]: Ms }], [0, { [f]: xt }], [0, { [f]: Fd }], [1, { [f]: Nd }], [1, { [f]: zd }], [0, { [f]: Is }], [5, { [f]: Os }], [0, { [f]: Bs }]]], QS = [3, _, z0, 0, [We, Ue, Rr, ju, hs, qu, Zr, rd, sd, nd, id, od, ad, Ie, yt, Dr, St, mt, td, Ye, ku], [[0, 1], [0, 1], [0, { [f]: vr }], [4, { [f]: zu }], [0, { [f]: ps }], [4, { [f]: Gu }], [0, { [f]: Zr }], [0, { [j]: bd }], [0, { [j]: wd }], [0, { [j]: Ed }], [0, { [j]: Cd }], [0, { [j]: Ad }], [6, { [j]: Rd }], [0, { [j]: qi }], [0, { [f]: At }], [() => $s, { [f]: Ps }], [0, { [f]: Rt }], [0, { [f]: bt }], [1, { [j]: xd }], [0, { [f]: tt }], [0, { [f]: Td }]], 2], JS = [3, _, ty, { [xe]: J0 }, [Vu, y0, Qu, kr, ls, gs, Tu, fs, Q0, Ou, ly, dd, pt], [2, [() => fx, { [je]: 1 }], 0, 0, 0, 1, [() => Gd, { [je]: 1 }], 0, 1, 0, 0, 0, [0, { [f]: xt }]]], YS = [3, _, sy, 0, [We, ls, fs, gs, kr, Ou, O0, dd, mt, Ye, Ju], [[0, 1], [0, { [j]: md }], [0, { [j]: gd }], [1, { [j]: yd }], [0, { [j]: Sd }], [0, { [j]: zy }], [2, { [j]: jy }], [0, { [j]: Gy }], [0, { [f]: bt }], [0, { [f]: tt }], [64, { [f]: $d }]], 1], ex = [3, _, ry, { [xe]: oy }, [Vu, Wu, hd, hy, yy, Fy, Mu, Qu, kr, ls, gs, Tu, fs, pt], [2, 0, 0, 0, 0, [() => hx, { [je]: 1, [xe]: Ly }], [() => ux, { [je]: 1, [xe]: Ar }], 0, 0, 0, 1, [() => Gd, { [je]: 1 }], 0, [0, { [f]: xt }]]], tx = [3, _, ny, 0, [We, ls, fs, Wu, gs, kr, hd, Ye, mt, Ju], [[0, 1], [0, { [j]: md }], [0, { [j]: gd }], [0, { [j]: qy }], [1, { [j]: yd }], [0, { [j]: Sd }], [0, { [j]: Ky }], [0, { [f]: tt }], [0, { [f]: bt }], [64, { [f]: $d }]], 1], rx = [3, _, Yu, 0, [Ue, Qt, Ve, Sr, Zt, ws, Mt, ys, ji], [0, 4, 0, [64, { [je]: 1 }], 0, 1, 0, () => Ki, () => qd]], sx = [3, _, xy, 0, [Ue, Ie, Ve, Y0, ws], [0, 0, 0, 6, 1], 1], nx = [3, _, Cy, 0, [Ve, Sr, Zt, ws, Mt, Ue, Ie, Hu, Qt, ys, ji], [0, [64, { [je]: 1 }], 0, 1, 0, 0, 0, 2, 4, () => Ki, () => qd]], Ki = [3, _, ys, 0, [b0, j0], [0, 0]], ix = [3, _, ky, 0, [Xt, Ve, xr, br, wr, Er, Cr, Zt, gt, Ie, yt, St, et, Pt, ht, ws, pt], [[0, { [f]: Ts }], [0, { [f]: Ve }], [0, { [f]: As }], [0, { [f]: Rs }], [0, { [f]: vs }], [0, { [f]: ks }], [0, { [f]: Ds }], [0, { [f]: Gi }], [0, { [f]: wt }], [0, { [f]: Tr }], [0, { [f]: At }], [0, { [f]: Rt }], [() => vt, { [f]: Et }], [() => Yt, { [f]: Jt }], [2, { [f]: Ct }], [1, { [f]: dS }], [0, { [f]: xt }]]], ox = [3, _, Dy, 0, [We, Ue, Cu, vu, ts, ns, os, as, zi, Jg, ds, Sr, xr, br, wr, Er, Cr, lt, Rr, hs, $u, Uu, Fu, Lu, Hy, ms, gt, Mt, Es, yt, Dr, St, et, Pt, ht, mt, fd, xs, bs, Ss, Ye], [[0, 1], [0, 1], [0, { [f]: kd }], [() => Vd, 16], [0, { [f]: rs }], [0, { [f]: ss }], [0, { [f]: is }], [0, { [f]: cs }], [1, { [f]: Hi }], [0, { [f]: Qg }], [0, { [f]: us }], [0, { [f]: Ld }], [0, { [f]: As }], [0, { [f]: Rs }], [0, { [f]: vs }], [0, { [f]: ks }], [0, { [f]: Ds }], [4, { [f]: lt }], [0, { [f]: vr }], [0, { [f]: ps }], [0, { [f]: _d }], [0, { [f]: Bd }], [0, { [f]: Id }], [0, { [f]: Od }], [1, { [f]: hS }], [128, { [Cs]: _s }], [0, { [f]: wt }], [0, { [f]: Ms }], [0, { [f]: Ns }], [0, { [f]: At }], [() => $s, { [f]: Ps }], [0, { [f]: Rt }], [() => vt, { [f]: Et }], [() => Yt, { [f]: Jt }], [2, { [f]: Ct }], [0, { [f]: bt }], [0, { [f]: Hd }], [0, { [f]: Is }], [5, { [f]: Os }], [0, { [f]: Bs }], [0, { [f]: tt }]], 2], qd = [3, _, ji, 0, [X0, _y], [2, 4]], ax = [3, _, My, 0, [ja, qa, Ga, Xt], [[0, { [xe]: ja }], [() => Wa, { [xe]: qa }], [() => Wa, { [xe]: Ga }], [4, { [xe]: Xt }]], 4], Gd = [1, _, s0, 0, () => IS], cx = [1, _, v0, 0, () => FS], ux = [1, _, Mu, 0, () => LS], dx = [1, _, Pu, 0, () => qS], lx = [1, _, by, 0, () => sx], fx = [1, _, wy, 0, [() => rx, 0]], hx = [1, _, Ay, 0, [() => nx, 0]], px = [9, _, Yg, { [Ke]: ["PUT", "/{Key+}?x-id=CopyObject", 200] }, () => MS, () => OS], mx = [9, _, m0, { [Ke]: ["GET", "/?session", 200] }, () => $S, () => NS], gx = [9, _, k0, { [Ke]: ["DELETE", "/{Key+}?x-id=DeleteObject", 204] }, () => zS, () => HS], yx = [9, _, D0, { [Vi]: "-", [Ke]: ["POST", "/?delete", 200] }, () => VS, () => jS], Sx = [9, _, M0, { [Ke]: ["GET", "/?versioning", 200] }, () => WS, () => GS], xx = [9, _, $0, { [Vi]: "-", [Ke]: ["GET", "/{Key+}?x-id=GetObject", 200] }, () => XS, () => KS], bx = [9, _, L0, { [Ke]: ["HEAD", "/{Key+}", 200] }, () => QS, () => ZS], wx = [9, _, ey, { [Ke]: ["GET", "/?list-type=2", 200] }, () => YS, () => JS], Ex = [9, _, iy, { [Ke]: ["GET", "/?versions", 200] }, () => tx, () => ex], Cx = [9, _, vy, { [Vi]: "-", [Ke]: ["PUT", "/{Key+}?x-id=PutObject", 200] }, () => ox, () => ix];
class Ax extends $e.classBuilder().ep({ ...Ge, DisableS3ExpressSessionAuth: { type: "staticContextParams", value: true }, Bucket: { type: "contextParams", name: "Bucket" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), Je(s)];
}).s("AmazonS3", "CreateSession", {}).n("S3Client", "CreateSessionCommand").sc(mx).build() {
}
const Rx = "3.1001.0", vx = { version: Rx }, kx = (t) => new TextEncoder().encode(t);
function Ka(t) {
  return typeof t == "string" ? t.length === 0 : t.byteLength === 0;
}
var Wd = { name: "SHA-1" }, Xa = { name: "HMAC", hash: Wd }, Dx = new Uint8Array([218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]);
const Tx = {};
function at() {
  return typeof window < "u" ? window : typeof self < "u" ? self : Tx;
}
var _x = (function() {
  function t(e) {
    this.toHash = new Uint8Array(0), e !== void 0 && (this.key = new Promise(function(r, s) {
      at().crypto.subtle.importKey("raw", Za(e), Xa, false, ["sign"]).then(r, s);
    }), this.key.catch(function() {
    }));
  }
  return t.prototype.update = function(e) {
    if (!Ka(e)) {
      var r = Za(e), s = new Uint8Array(this.toHash.byteLength + r.byteLength);
      s.set(this.toHash, 0), s.set(r, this.toHash.byteLength), this.toHash = s;
    }
  }, t.prototype.digest = function() {
    var e = this;
    return this.key ? this.key.then(function(r) {
      return at().crypto.subtle.sign(Xa, r, e.toHash).then(function(s) {
        return new Uint8Array(s);
      });
    }) : Ka(this.toHash) ? Promise.resolve(Dx) : Promise.resolve().then(function() {
      return at().crypto.subtle.digest(Wd, e.toHash);
    }).then(function(r) {
      return Promise.resolve(new Uint8Array(r));
    });
  }, t.prototype.reset = function() {
    this.toHash = new Uint8Array(0);
  }, t;
})();
function Za(t) {
  return typeof t == "string" ? kx(t) : ArrayBuffer.isView(t) ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(t);
}
var Bx = ["decrypt", "digest", "encrypt", "exportKey", "generateKey", "importKey", "sign", "verify"];
function Kd(t) {
  if (Ix(t) && typeof t.crypto.subtle == "object") {
    var e = t.crypto.subtle;
    return Ox(e);
  }
  return false;
}
function Ix(t) {
  if (typeof t == "object" && typeof t.crypto == "object") {
    var e = t.crypto.getRandomValues;
    return typeof e == "function";
  }
  return false;
}
function Ox(t) {
  return t && Bx.every(function(e) {
    return typeof t[e] == "function";
  });
}
var Mx = (function() {
  function t(e) {
    if (Kd(at())) this.hash = new _x(e);
    else throw new Error("SHA1 not supported");
  }
  return t.prototype.update = function(e, r) {
    this.hash.update(ut(e));
  }, t.prototype.digest = function() {
    return this.hash.digest();
  }, t.prototype.reset = function() {
    this.hash.reset();
  }, t;
})(), Xd = { name: "SHA-256" }, Qa = { name: "HMAC", hash: Xd }, Px = new Uint8Array([227, 176, 196, 66, 152, 252, 28, 20, 154, 251, 244, 200, 153, 111, 185, 36, 39, 174, 65, 228, 100, 155, 147, 76, 164, 149, 153, 27, 120, 82, 184, 85]), Nx = (function() {
  function t(e) {
    this.toHash = new Uint8Array(0), this.secret = e, this.reset();
  }
  return t.prototype.update = function(e) {
    if (!mr(e)) {
      var r = ut(e), s = new Uint8Array(this.toHash.byteLength + r.byteLength);
      s.set(this.toHash, 0), s.set(r, this.toHash.byteLength), this.toHash = s;
    }
  }, t.prototype.digest = function() {
    var e = this;
    return this.key ? this.key.then(function(r) {
      return at().crypto.subtle.sign(Qa, r, e.toHash).then(function(s) {
        return new Uint8Array(s);
      });
    }) : mr(this.toHash) ? Promise.resolve(Px) : Promise.resolve().then(function() {
      return at().crypto.subtle.digest(Xd, e.toHash);
    }).then(function(r) {
      return Promise.resolve(new Uint8Array(r));
    });
  }, t.prototype.reset = function() {
    var e = this;
    this.toHash = new Uint8Array(0), this.secret && this.secret !== void 0 && (this.key = new Promise(function(r, s) {
      at().crypto.subtle.importKey("raw", ut(e.secret), Qa, false, ["sign"]).then(r, s);
    }), this.key.catch(function() {
    }));
  }, t;
})(), Pe = 64, $x = 32, Ux = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), Fx = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], Lx = Math.pow(2, 53) - 1, Ur = (function() {
  function t() {
    this.state = Int32Array.from(Fx), this.temp = new Int32Array(64), this.buffer = new Uint8Array(64), this.bufferLength = 0, this.bytesHashed = 0, this.finished = false;
  }
  return t.prototype.update = function(e) {
    if (this.finished) throw new Error("Attempted to update an already finished hash.");
    var r = 0, s = e.byteLength;
    if (this.bytesHashed += s, this.bytesHashed * 8 > Lx) throw new Error("Cannot hash more than 2^53 - 1 bits");
    for (; s > 0; ) this.buffer[this.bufferLength++] = e[r++], s--, this.bufferLength === Pe && (this.hashBuffer(), this.bufferLength = 0);
  }, t.prototype.digest = function() {
    if (!this.finished) {
      var e = this.bytesHashed * 8, r = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength), s = this.bufferLength;
      if (r.setUint8(this.bufferLength++, 128), s % Pe >= Pe - 8) {
        for (var n = this.bufferLength; n < Pe; n++) r.setUint8(n, 0);
        this.hashBuffer(), this.bufferLength = 0;
      }
      for (var n = this.bufferLength; n < Pe - 8; n++) r.setUint8(n, 0);
      r.setUint32(Pe - 8, Math.floor(e / 4294967296), true), r.setUint32(Pe - 4, e), this.hashBuffer(), this.finished = true;
    }
    for (var i = new Uint8Array($x), n = 0; n < 8; n++) i[n * 4] = this.state[n] >>> 24 & 255, i[n * 4 + 1] = this.state[n] >>> 16 & 255, i[n * 4 + 2] = this.state[n] >>> 8 & 255, i[n * 4 + 3] = this.state[n] >>> 0 & 255;
    return i;
  }, t.prototype.hashBuffer = function() {
    for (var e = this, r = e.buffer, s = e.state, n = s[0], i = s[1], o = s[2], a = s[3], c = s[4], u = s[5], m = s[6], l = s[7], h = 0; h < Pe; h++) {
      if (h < 16) this.temp[h] = (r[h * 4] & 255) << 24 | (r[h * 4 + 1] & 255) << 16 | (r[h * 4 + 2] & 255) << 8 | r[h * 4 + 3] & 255;
      else {
        var g = this.temp[h - 2], x = (g >>> 17 | g << 15) ^ (g >>> 19 | g << 13) ^ g >>> 10;
        g = this.temp[h - 15];
        var E = (g >>> 7 | g << 25) ^ (g >>> 18 | g << 14) ^ g >>> 3;
        this.temp[h] = (x + this.temp[h - 7] | 0) + (E + this.temp[h - 16] | 0);
      }
      var C = (((c >>> 6 | c << 26) ^ (c >>> 11 | c << 21) ^ (c >>> 25 | c << 7)) + (c & u ^ ~c & m) | 0) + (l + (Ux[h] + this.temp[h] | 0) | 0) | 0, T = ((n >>> 2 | n << 30) ^ (n >>> 13 | n << 19) ^ (n >>> 22 | n << 10)) + (n & i ^ n & o ^ i & o) | 0;
      l = m, m = u, u = c, c = a + C | 0, a = o, o = i, i = n, n = C + T | 0;
    }
    s[0] += n, s[1] += i, s[2] += o, s[3] += a, s[4] += c, s[5] += u, s[6] += m, s[7] += l;
  }, t;
})(), Hx = (function() {
  function t(e) {
    this.secret = e, this.hash = new Ur(), this.reset();
  }
  return t.prototype.update = function(e) {
    if (!(mr(e) || this.error)) try {
      this.hash.update(ut(e));
    } catch (r) {
      this.error = r;
    }
  }, t.prototype.digestSync = function() {
    if (this.error) throw this.error;
    return this.outer ? (this.outer.finished || this.outer.update(this.hash.digest()), this.outer.digest()) : this.hash.digest();
  }, t.prototype.digest = function() {
    return di(this, void 0, void 0, function() {
      return li(this, function(e) {
        return [2, this.digestSync()];
      });
    });
  }, t.prototype.reset = function() {
    if (this.hash = new Ur(), this.secret) {
      this.outer = new Ur();
      var e = zx(this.secret), r = new Uint8Array(Pe);
      r.set(e);
      for (var s = 0; s < Pe; s++) e[s] ^= 54, r[s] ^= 92;
      this.hash.update(e), this.outer.update(r);
      for (var s = 0; s < e.byteLength; s++) e[s] = 0;
    }
  }, t;
})();
function zx(t) {
  var e = ut(t);
  if (e.byteLength > Pe) {
    var r = new Ur();
    r.update(e), e = r.digest();
  }
  var s = new Uint8Array(Pe);
  return s.set(e), s;
}
var jx = (function() {
  function t(e) {
    Kd(at()) ? this.hash = new Nx(e) : this.hash = new Hx(e);
  }
  return t.prototype.update = function(e, r) {
    this.hash.update(ut(e));
  }, t.prototype.digest = function() {
    return this.hash.digest();
  }, t.prototype.reset = function() {
    this.hash.reset();
  }, t;
})();
const Vx = ({ serviceId: t, clientVersion: e }) => async (r) => {
  var _a2, _b2, _c2;
  const s = typeof window < "u" ? window.navigator : void 0, n = (s == null ? void 0 : s.userAgent) ?? "", i = ((_a2 = s == null ? void 0 : s.userAgentData) == null ? void 0 : _a2.platform) ?? Ja.os(n) ?? "other", o = void 0, a = ((_b2 = s == null ? void 0 : s.userAgentData) == null ? void 0 : _b2.brands) ?? [], c = a[a.length - 1], u = (c == null ? void 0 : c.brand) ?? Ja.browser(n) ?? "unknown", m = (c == null ? void 0 : c.version) ?? "unknown", l = [["aws-sdk-js", e], ["ua", "2.1"], [`os/${i}`, o], ["lang/js"], ["md/browser", `${u}_${m}`]];
  t && l.push([`api/${t}`, e]);
  const h = await ((_c2 = r == null ? void 0 : r.userAgentAppId) == null ? void 0 : _c2.call(r));
  return h && l.push([`app/${h}`]), l;
}, Ja = { os(t) {
  if (/iPhone|iPad|iPod/.test(t)) return "iOS";
  if (/Macintosh|Mac OS X/.test(t)) return "macOS";
  if (/Windows NT/.test(t)) return "Windows";
  if (/Android/.test(t)) return "Android";
  if (/Linux/.test(t)) return "Linux";
}, browser(t) {
  if (/EdgiOS|EdgA|Edg\//.test(t)) return "Microsoft Edge";
  if (/Firefox\//.test(t)) return "Firefox";
  if (/Chrome\//.test(t)) return "Chrome";
  if (/Safari\//.test(t)) return "Safari";
} };
class fr {
  constructor(e) {
    __publicField(this, "bytes");
    if (this.bytes = e, e.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes");
  }
  static fromNumber(e) {
    if (e > 9223372036854776e3 || e < -9223372036854776e3) throw new Error(`${e} is too large (or, if negative, too small) to represent as an Int64`);
    const r = new Uint8Array(8);
    for (let s = 7, n = Math.abs(Math.round(e)); s > -1 && n > 0; s--, n /= 256) r[s] = n;
    return e < 0 && Ya(r), new fr(r);
  }
  valueOf() {
    const e = this.bytes.slice(0), r = e[0] & 128;
    return r && Ya(e), parseInt(ve(e), 16) * (r ? -1 : 1);
  }
  toString() {
    return String(this.valueOf());
  }
}
function Ya(t) {
  for (let e = 0; e < 8; e++) t[e] ^= 255;
  for (let e = 7; e > -1 && (t[e]++, t[e] === 0); e--) ;
}
class qx {
  constructor(e, r) {
    __publicField(this, "toUtf8");
    __publicField(this, "fromUtf8");
    this.toUtf8 = e, this.fromUtf8 = r;
  }
  format(e) {
    const r = [];
    for (const i of Object.keys(e)) {
      const o = this.fromUtf8(i);
      r.push(Uint8Array.from([o.byteLength]), o, this.formatHeaderValue(e[i]));
    }
    const s = new Uint8Array(r.reduce((i, o) => i + o.byteLength, 0));
    let n = 0;
    for (const i of r) s.set(i, n), n += i.byteLength;
    return s;
  }
  formatHeaderValue(e) {
    switch (e.type) {
      case "boolean":
        return Uint8Array.from([e.value ? 0 : 1]);
      case "byte":
        return Uint8Array.from([2, e.value]);
      case "short":
        const r = new DataView(new ArrayBuffer(3));
        return r.setUint8(0, 3), r.setInt16(1, e.value, false), new Uint8Array(r.buffer);
      case "integer":
        const s = new DataView(new ArrayBuffer(5));
        return s.setUint8(0, 4), s.setInt32(1, e.value, false), new Uint8Array(s.buffer);
      case "long":
        const n = new Uint8Array(9);
        return n[0] = 5, n.set(e.value.bytes, 1), n;
      case "binary":
        const i = new DataView(new ArrayBuffer(3 + e.value.byteLength));
        i.setUint8(0, 6), i.setUint16(1, e.value.byteLength, false);
        const o = new Uint8Array(i.buffer);
        return o.set(e.value, 3), o;
      case "string":
        const a = this.fromUtf8(e.value), c = new DataView(new ArrayBuffer(3 + a.byteLength));
        c.setUint8(0, 7), c.setUint16(1, a.byteLength, false);
        const u = new Uint8Array(c.buffer);
        return u.set(a, 3), u;
      case "timestamp":
        const m = new Uint8Array(9);
        return m[0] = 8, m.set(fr.fromNumber(e.value.valueOf()).bytes, 1), m;
      case "uuid":
        if (!eb.test(e.value)) throw new Error(`Invalid UUID received: ${e.value}`);
        const l = new Uint8Array(17);
        return l[0] = 9, l.set(dc(e.value.replace(/\-/g, "")), 1), l;
    }
  }
  parse(e) {
    const r = {};
    let s = 0;
    for (; s < e.byteLength; ) {
      const n = e.getUint8(s++), i = this.toUtf8(new Uint8Array(e.buffer, e.byteOffset + s, n));
      switch (s += n, e.getUint8(s++)) {
        case 0:
          r[i] = { type: tc, value: true };
          break;
        case 1:
          r[i] = { type: tc, value: false };
          break;
        case 2:
          r[i] = { type: Gx, value: e.getInt8(s++) };
          break;
        case 3:
          r[i] = { type: Wx, value: e.getInt16(s, false) }, s += 2;
          break;
        case 4:
          r[i] = { type: Kx, value: e.getInt32(s, false) }, s += 4;
          break;
        case 5:
          r[i] = { type: Xx, value: new fr(new Uint8Array(e.buffer, e.byteOffset + s, 8)) }, s += 8;
          break;
        case 6:
          const o = e.getUint16(s, false);
          s += 2, r[i] = { type: Zx, value: new Uint8Array(e.buffer, e.byteOffset + s, o) }, s += o;
          break;
        case 7:
          const a = e.getUint16(s, false);
          s += 2, r[i] = { type: Qx, value: this.toUtf8(new Uint8Array(e.buffer, e.byteOffset + s, a)) }, s += a;
          break;
        case 8:
          r[i] = { type: Jx, value: new Date(new fr(new Uint8Array(e.buffer, e.byteOffset + s, 8)).valueOf()) }, s += 8;
          break;
        case 9:
          const c = new Uint8Array(e.buffer, e.byteOffset + s, 16);
          s += 16, r[i] = { type: Yx, value: `${ve(c.subarray(0, 4))}-${ve(c.subarray(4, 6))}-${ve(c.subarray(6, 8))}-${ve(c.subarray(8, 10))}-${ve(c.subarray(10))}` };
          break;
        default:
          throw new Error("Unrecognized header type tag");
      }
    }
    return r;
  }
}
var ec;
(function(t) {
  t[t.boolTrue = 0] = "boolTrue", t[t.boolFalse = 1] = "boolFalse", t[t.byte = 2] = "byte", t[t.short = 3] = "short", t[t.integer = 4] = "integer", t[t.long = 5] = "long", t[t.byteArray = 6] = "byteArray", t[t.string = 7] = "string", t[t.timestamp = 8] = "timestamp", t[t.uuid = 9] = "uuid";
})(ec || (ec = {}));
const tc = "boolean", Gx = "byte", Wx = "short", Kx = "integer", Xx = "long", Zx = "binary", Qx = "string", Jx = "timestamp", Yx = "uuid", eb = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/, Zd = 4, it = Zd * 2, Dt = 4, tb = it + Dt * 2;
function rb({ byteLength: t, byteOffset: e, buffer: r }) {
  if (t < tb) throw new Error("Provided message too short to accommodate event stream message overhead");
  const s = new DataView(r, e, t), n = s.getUint32(0, false);
  if (t !== n) throw new Error("Reported message length does not match received message length");
  const i = s.getUint32(Zd, false), o = s.getUint32(it, false), a = s.getUint32(t - Dt, false), c = new Hr().update(new Uint8Array(r, e, it));
  if (o !== c.digest()) throw new Error(`The prelude checksum specified in the message (${o}) does not match the calculated CRC32 checksum (${c.digest()})`);
  if (c.update(new Uint8Array(r, e + it, t - (it + Dt))), a !== c.digest()) throw new Error(`The message checksum (${c.digest()}) did not match the expected value of ${a}`);
  return { headers: new DataView(r, e + it + Dt, i), body: new Uint8Array(r, e + it + Dt + i, n - i - (it + Dt + Dt)) };
}
class sb {
  constructor(e, r) {
    __publicField(this, "headerMarshaller");
    __publicField(this, "messageBuffer");
    __publicField(this, "isEndOfStream");
    this.headerMarshaller = new qx(e, r), this.messageBuffer = [], this.isEndOfStream = false;
  }
  feed(e) {
    this.messageBuffer.push(this.decode(e));
  }
  endOfStream() {
    this.isEndOfStream = true;
  }
  getMessage() {
    const e = this.messageBuffer.pop(), r = this.isEndOfStream;
    return { getMessage() {
      return e;
    }, isEndOfStream() {
      return r;
    } };
  }
  getAvailableMessages() {
    const e = this.messageBuffer;
    this.messageBuffer = [];
    const r = this.isEndOfStream;
    return { getMessages() {
      return e;
    }, isEndOfStream() {
      return r;
    } };
  }
  encode({ headers: e, body: r }) {
    const s = this.headerMarshaller.format(e), n = s.byteLength + r.byteLength + 16, i = new Uint8Array(n), o = new DataView(i.buffer, i.byteOffset, i.byteLength), a = new Hr();
    return o.setUint32(0, n, false), o.setUint32(4, s.byteLength, false), o.setUint32(8, a.update(i.subarray(0, 8)).digest(), false), i.set(s, 12), i.set(r, s.byteLength + 12), o.setUint32(n - 4, a.update(i.subarray(8, n - 4)).digest(), false), i;
  }
  decode(e) {
    const { headers: r, body: s } = rb(e);
    return { headers: this.headerMarshaller.parse(r), body: s };
  }
  formatHeaders(e) {
    return this.headerMarshaller.format(e);
  }
}
class nb {
  constructor(e) {
    __publicField(this, "options");
    this.options = e;
  }
  [Symbol.asyncIterator]() {
    return this.asyncIterator();
  }
  async *asyncIterator() {
    for await (const e of this.options.inputStream) yield this.options.decoder.decode(e);
  }
}
class ib {
  constructor(e) {
    __publicField(this, "options");
    this.options = e;
  }
  [Symbol.asyncIterator]() {
    return this.asyncIterator();
  }
  async *asyncIterator() {
    for await (const e of this.options.messageStream) yield this.options.encoder.encode(e);
    this.options.includeEndFrame && (yield new Uint8Array(0));
  }
}
class ob {
  constructor(e) {
    __publicField(this, "options");
    this.options = e;
  }
  [Symbol.asyncIterator]() {
    return this.asyncIterator();
  }
  async *asyncIterator() {
    for await (const e of this.options.messageStream) {
      const r = await this.options.deserializer(e);
      r !== void 0 && (yield r);
    }
  }
}
class ab {
  constructor(e) {
    __publicField(this, "options");
    this.options = e;
  }
  [Symbol.asyncIterator]() {
    return this.asyncIterator();
  }
  async *asyncIterator() {
    for await (const e of this.options.inputStream) yield this.options.serializer(e);
  }
}
function cb(t) {
  let e = 0, r = 0, s = null, n = null;
  const i = (a) => {
    if (typeof a != "number") throw new Error("Attempted to allocate an event message where size was not a number: " + a);
    e = a, r = 4, s = new Uint8Array(a), new DataView(s.buffer).setUint32(0, a, false);
  }, o = async function* () {
    const a = t[Symbol.asyncIterator]();
    for (; ; ) {
      const { value: c, done: u } = await a.next();
      if (u) {
        if (e) if (e === r) yield s;
        else throw new Error("Truncated event message received.");
        else return;
        return;
      }
      const m = c.length;
      let l = 0;
      for (; l < m; ) {
        if (!s) {
          const g = m - l;
          n || (n = new Uint8Array(4));
          const x = Math.min(4 - r, g);
          if (n.set(c.slice(l, l + x), r), r += x, l += x, r < 4) break;
          i(new DataView(n.buffer).getUint32(0, false)), n = null;
        }
        const h = Math.min(e - r, m - l);
        s.set(c.slice(l, l + h), r), r += h, l += h, e && e === r && (yield s, s = null, e = 0, r = 0);
      }
    }
  };
  return { [Symbol.asyncIterator]: o };
}
function ub(t, e) {
  return async function(r) {
    const { value: s } = r.headers[":message-type"];
    if (s === "error") {
      const n = new Error(r.headers[":error-message"].value || "UnknownError");
      throw n.name = r.headers[":error-code"].value, n;
    } else if (s === "exception") {
      const n = r.headers[":exception-type"].value, i = { [n]: r }, o = await t(i);
      if (o.$unknown) {
        const a = new Error(e(r.body));
        throw a.name = n, a;
      }
      throw o[n];
    } else if (s === "event") {
      const n = { [r.headers[":event-type"].value]: r }, i = await t(n);
      return i.$unknown ? void 0 : i;
    } else throw Error(`Unrecognizable event type: ${r.headers[":event-type"].value}`);
  };
}
let db = class {
  constructor({ utf8Encoder: e, utf8Decoder: r }) {
    __publicField(this, "eventStreamCodec");
    __publicField(this, "utfEncoder");
    this.eventStreamCodec = new sb(e, r), this.utfEncoder = e;
  }
  deserialize(e, r) {
    const s = cb(e);
    return new ob({ messageStream: new nb({ inputStream: s, decoder: this.eventStreamCodec }), deserializer: ub(r, this.utfEncoder) });
  }
  serialize(e, r) {
    return new ib({ messageStream: new ab({ inputStream: e, serializer: r }), encoder: this.eventStreamCodec, includeEndFrame: true });
  }
};
const lb = (t) => ({ [Symbol.asyncIterator]: async function* () {
  const e = t.getReader();
  try {
    for (; ; ) {
      const { done: r, value: s } = await e.read();
      if (r) return;
      yield s;
    }
  } finally {
    e.releaseLock();
  }
} }), fb = (t) => {
  const e = t[Symbol.asyncIterator]();
  return new ReadableStream({ async pull(r) {
    const { done: s, value: n } = await e.next();
    if (s) return r.close();
    r.enqueue(n);
  } });
};
class hb {
  constructor({ utf8Encoder: e, utf8Decoder: r }) {
    __publicField(this, "universalMarshaller");
    this.universalMarshaller = new db({ utf8Decoder: r, utf8Encoder: e });
  }
  deserialize(e, r) {
    const s = pb(e) ? lb(e) : e;
    return this.universalMarshaller.deserialize(s, r);
  }
  serialize(e, r) {
    const s = this.universalMarshaller.serialize(e, r);
    return typeof ReadableStream == "function" ? fb(s) : s;
  }
}
const pb = (t) => typeof ReadableStream == "function" && t instanceof ReadableStream, mb = (t) => new hb(t);
async function gb(t, e, r = 1024 * 1024) {
  const s = t.size;
  let n = 0;
  for (; n < s; ) {
    const i = t.slice(n, Math.min(s, n + r));
    e(new Uint8Array(await i.arrayBuffer())), n += i.size;
  }
}
const yb = async function(e, r) {
  const s = new e();
  return await gb(r, (n) => {
    s.update(n);
  }), s.digest();
}, Sb = (t) => () => Promise.reject(t), nt = 64, xb = 16, bb = [1732584193, 4023233417, 2562383102, 271733878];
class wb {
  constructor() {
    __publicField(this, "state");
    __publicField(this, "buffer");
    __publicField(this, "bufferLength");
    __publicField(this, "bytesHashed");
    __publicField(this, "finished");
    this.reset();
  }
  update(e) {
    if (Eb(e)) return;
    if (this.finished) throw new Error("Attempted to update an already finished hash.");
    const r = Cb(e);
    let s = 0, { byteLength: n } = r;
    for (this.bytesHashed += n; n > 0; ) this.buffer.setUint8(this.bufferLength++, r[s++]), n--, this.bufferLength === nt && (this.hashBuffer(), this.bufferLength = 0);
  }
  async digest() {
    if (!this.finished) {
      const { buffer: r, bufferLength: s, bytesHashed: n } = this, i = n * 8;
      if (r.setUint8(this.bufferLength++, 128), s % nt >= nt - 8) {
        for (let o = this.bufferLength; o < nt; o++) r.setUint8(o, 0);
        this.hashBuffer(), this.bufferLength = 0;
      }
      for (let o = this.bufferLength; o < nt - 8; o++) r.setUint8(o, 0);
      r.setUint32(nt - 8, i >>> 0, true), r.setUint32(nt - 4, Math.floor(i / 4294967296), true), this.hashBuffer(), this.finished = true;
    }
    const e = new DataView(new ArrayBuffer(xb));
    for (let r = 0; r < 4; r++) e.setUint32(r * 4, this.state[r], true);
    return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
  }
  hashBuffer() {
    const { buffer: e, state: r } = this;
    let s = r[0], n = r[1], i = r[2], o = r[3];
    s = me(s, n, i, o, e.getUint32(0, true), 7, 3614090360), o = me(o, s, n, i, e.getUint32(4, true), 12, 3905402710), i = me(i, o, s, n, e.getUint32(8, true), 17, 606105819), n = me(n, i, o, s, e.getUint32(12, true), 22, 3250441966), s = me(s, n, i, o, e.getUint32(16, true), 7, 4118548399), o = me(o, s, n, i, e.getUint32(20, true), 12, 1200080426), i = me(i, o, s, n, e.getUint32(24, true), 17, 2821735955), n = me(n, i, o, s, e.getUint32(28, true), 22, 4249261313), s = me(s, n, i, o, e.getUint32(32, true), 7, 1770035416), o = me(o, s, n, i, e.getUint32(36, true), 12, 2336552879), i = me(i, o, s, n, e.getUint32(40, true), 17, 4294925233), n = me(n, i, o, s, e.getUint32(44, true), 22, 2304563134), s = me(s, n, i, o, e.getUint32(48, true), 7, 1804603682), o = me(o, s, n, i, e.getUint32(52, true), 12, 4254626195), i = me(i, o, s, n, e.getUint32(56, true), 17, 2792965006), n = me(n, i, o, s, e.getUint32(60, true), 22, 1236535329), s = ge(s, n, i, o, e.getUint32(4, true), 5, 4129170786), o = ge(o, s, n, i, e.getUint32(24, true), 9, 3225465664), i = ge(i, o, s, n, e.getUint32(44, true), 14, 643717713), n = ge(n, i, o, s, e.getUint32(0, true), 20, 3921069994), s = ge(s, n, i, o, e.getUint32(20, true), 5, 3593408605), o = ge(o, s, n, i, e.getUint32(40, true), 9, 38016083), i = ge(i, o, s, n, e.getUint32(60, true), 14, 3634488961), n = ge(n, i, o, s, e.getUint32(16, true), 20, 3889429448), s = ge(s, n, i, o, e.getUint32(36, true), 5, 568446438), o = ge(o, s, n, i, e.getUint32(56, true), 9, 3275163606), i = ge(i, o, s, n, e.getUint32(12, true), 14, 4107603335), n = ge(n, i, o, s, e.getUint32(32, true), 20, 1163531501), s = ge(s, n, i, o, e.getUint32(52, true), 5, 2850285829), o = ge(o, s, n, i, e.getUint32(8, true), 9, 4243563512), i = ge(i, o, s, n, e.getUint32(28, true), 14, 1735328473), n = ge(n, i, o, s, e.getUint32(48, true), 20, 2368359562), s = ye(s, n, i, o, e.getUint32(20, true), 4, 4294588738), o = ye(o, s, n, i, e.getUint32(32, true), 11, 2272392833), i = ye(i, o, s, n, e.getUint32(44, true), 16, 1839030562), n = ye(n, i, o, s, e.getUint32(56, true), 23, 4259657740), s = ye(s, n, i, o, e.getUint32(4, true), 4, 2763975236), o = ye(o, s, n, i, e.getUint32(16, true), 11, 1272893353), i = ye(i, o, s, n, e.getUint32(28, true), 16, 4139469664), n = ye(n, i, o, s, e.getUint32(40, true), 23, 3200236656), s = ye(s, n, i, o, e.getUint32(52, true), 4, 681279174), o = ye(o, s, n, i, e.getUint32(0, true), 11, 3936430074), i = ye(i, o, s, n, e.getUint32(12, true), 16, 3572445317), n = ye(n, i, o, s, e.getUint32(24, true), 23, 76029189), s = ye(s, n, i, o, e.getUint32(36, true), 4, 3654602809), o = ye(o, s, n, i, e.getUint32(48, true), 11, 3873151461), i = ye(i, o, s, n, e.getUint32(60, true), 16, 530742520), n = ye(n, i, o, s, e.getUint32(8, true), 23, 3299628645), s = Se(s, n, i, o, e.getUint32(0, true), 6, 4096336452), o = Se(o, s, n, i, e.getUint32(28, true), 10, 1126891415), i = Se(i, o, s, n, e.getUint32(56, true), 15, 2878612391), n = Se(n, i, o, s, e.getUint32(20, true), 21, 4237533241), s = Se(s, n, i, o, e.getUint32(48, true), 6, 1700485571), o = Se(o, s, n, i, e.getUint32(12, true), 10, 2399980690), i = Se(i, o, s, n, e.getUint32(40, true), 15, 4293915773), n = Se(n, i, o, s, e.getUint32(4, true), 21, 2240044497), s = Se(s, n, i, o, e.getUint32(32, true), 6, 1873313359), o = Se(o, s, n, i, e.getUint32(60, true), 10, 4264355552), i = Se(i, o, s, n, e.getUint32(24, true), 15, 2734768916), n = Se(n, i, o, s, e.getUint32(52, true), 21, 1309151649), s = Se(s, n, i, o, e.getUint32(16, true), 6, 4149444226), o = Se(o, s, n, i, e.getUint32(44, true), 10, 3174756917), i = Se(i, o, s, n, e.getUint32(8, true), 15, 718787259), n = Se(n, i, o, s, e.getUint32(36, true), 21, 3951481745), r[0] = s + r[0] & 4294967295, r[1] = n + r[1] & 4294967295, r[2] = i + r[2] & 4294967295, r[3] = o + r[3] & 4294967295;
  }
  reset() {
    this.state = Uint32Array.from(bb), this.buffer = new DataView(new ArrayBuffer(nt)), this.bufferLength = 0, this.bytesHashed = 0, this.finished = false;
  }
}
function Us(t, e, r, s, n, i) {
  return e = (e + t & 4294967295) + (s + i & 4294967295) & 4294967295, (e << n | e >>> 32 - n) + r & 4294967295;
}
function me(t, e, r, s, n, i, o) {
  return Us(e & r | ~e & s, t, e, n, i, o);
}
function ge(t, e, r, s, n, i, o) {
  return Us(e & s | r & ~s, t, e, n, i, o);
}
function ye(t, e, r, s, n, i, o) {
  return Us(e ^ r ^ s, t, e, n, i, o);
}
function Se(t, e, r, s, n, i, o) {
  return Us(r ^ (e | ~s), t, e, n, i, o);
}
function Eb(t) {
  return typeof t == "string" ? t.length === 0 : t.byteLength === 0;
}
function Cb(t) {
  return typeof t == "string" ? Qe(t) : ArrayBuffer.isView(t) ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(t);
}
const Ab = ["in-region", "cross-region", "mobile", "standard", "legacy"], Rb = ({ defaultsMode: t } = {}) => Mf(async () => {
  const e = typeof t == "function" ? await t() : t;
  switch (e == null ? void 0 : e.toLowerCase()) {
    case "auto":
      return Promise.resolve(vb() ? "mobile" : "standard");
    case "mobile":
    case "in-region":
    case "cross-region":
    case "standard":
    case "legacy":
      return Promise.resolve(e == null ? void 0 : e.toLocaleLowerCase());
    case void 0:
      return Promise.resolve("legacy");
    default:
      throw new Error(`Invalid parameter for "defaultsMode", expect ${Ab.join(", ")}, got ${e}`);
  }
}), vb = () => {
  var _a2;
  const t = window == null ? void 0 : window.navigator;
  if (t == null ? void 0 : t.connection) {
    const { effectiveType: e, rtt: r, downlink: s } = t == null ? void 0 : t.connection;
    if (typeof e == "string" && e !== "4g" || Number(r) > 100 || Number(s) < 10) return true;
  }
  return ((_a2 = t == null ? void 0 : t.userAgentData) == null ? void 0 : _a2.mobile) || typeof (t == null ? void 0 : t.maxTouchPoints) == "number" && (t == null ? void 0 : t.maxTouchPoints) > 1;
}, kb = (t) => ({ apiVersion: "2006-03-01", base64Decoder: (t == null ? void 0 : t.base64Decoder) ?? qt, base64Encoder: (t == null ? void 0 : t.base64Encoder) ?? Bt, disableHostPrefix: (t == null ? void 0 : t.disableHostPrefix) ?? false, endpointProvider: (t == null ? void 0 : t.endpointProvider) ?? bu, extensions: (t == null ? void 0 : t.extensions) ?? [], getAwsChunkedEncodingStream: (t == null ? void 0 : t.getAwsChunkedEncodingStream) ?? Bl, httpAuthSchemeProvider: (t == null ? void 0 : t.httpAuthSchemeProvider) ?? jg, httpAuthSchemes: (t == null ? void 0 : t.httpAuthSchemes) ?? [{ schemeId: "aws.auth#sigv4", identityProvider: (e) => e.getIdentityProvider("aws.auth#sigv4"), signer: new nc() }, { schemeId: "aws.auth#sigv4a", identityProvider: (e) => e.getIdentityProvider("aws.auth#sigv4a"), signer: new dl() }], logger: (t == null ? void 0 : t.logger) ?? new ai(), protocol: (t == null ? void 0 : t.protocol) ?? Th, protocolSettings: (t == null ? void 0 : t.protocolSettings) ?? { defaultNamespace: "com.amazonaws.s3", errorTypeRegistries: _S, xmlNamespace: "http://s3.amazonaws.com/doc/2006-03-01/", version: "2006-03-01", serviceTarget: "AmazonS3" }, sdkStreamMixin: (t == null ? void 0 : t.sdkStreamMixin) ?? lc, serviceId: (t == null ? void 0 : t.serviceId) ?? "S3", signerConstructor: (t == null ? void 0 : t.signerConstructor) ?? Si, signingEscapePath: (t == null ? void 0 : t.signingEscapePath) ?? false, urlParser: (t == null ? void 0 : t.urlParser) ?? jr, useArnRegion: (t == null ? void 0 : t.useArnRegion) ?? void 0, utf8Decoder: (t == null ? void 0 : t.utf8Decoder) ?? Qe, utf8Encoder: (t == null ? void 0 : t.utf8Encoder) ?? It }), Db = (t) => {
  const e = Rb(t), r = () => e().then(hh), s = kb(t);
  return { ...s, ...t, runtime: "browser", defaultsMode: e, bodyLengthChecker: (t == null ? void 0 : t.bodyLengthChecker) ?? dh, credentialDefaultProvider: (t == null ? void 0 : t.credentialDefaultProvider) ?? ((n) => () => Promise.reject(new Error("Credential is missing"))), defaultUserAgentProvider: (t == null ? void 0 : t.defaultUserAgentProvider) ?? Vx({ serviceId: s.serviceId, clientVersion: vx.version }), eventStreamSerdeProvider: (t == null ? void 0 : t.eventStreamSerdeProvider) ?? mb, maxAttempts: (t == null ? void 0 : t.maxAttempts) ?? Vr, md5: (t == null ? void 0 : t.md5) ?? wb, region: (t == null ? void 0 : t.region) ?? Sb("Region is missing"), requestHandler: Yn.create((t == null ? void 0 : t.requestHandler) ?? r), retryMode: (t == null ? void 0 : t.retryMode) ?? (async () => (await r()).retryMode || Qm), sha1: (t == null ? void 0 : t.sha1) ?? Mx, sha256: (t == null ? void 0 : t.sha256) ?? jx, streamCollector: (t == null ? void 0 : t.streamCollector) ?? cc, streamHasher: (t == null ? void 0 : t.streamHasher) ?? yb, useDualstackEndpoint: (t == null ? void 0 : t.useDualstackEndpoint) ?? (() => Promise.resolve(Im)), useFipsEndpoint: (t == null ? void 0 : t.useFipsEndpoint) ?? (() => Promise.resolve(Om)) };
}, Tb = (t) => ({ setRegion(e) {
  t.region = e;
}, region() {
  return t.region;
} }), _b = (t) => ({ region: t.region() }), Bb = (t) => {
  const e = t.httpAuthSchemes;
  let r = t.httpAuthSchemeProvider, s = t.credentials;
  return { setHttpAuthScheme(n) {
    const i = e.findIndex((o) => o.schemeId === n.schemeId);
    i === -1 ? e.push(n) : e.splice(i, 1, n);
  }, httpAuthSchemes() {
    return e;
  }, setHttpAuthSchemeProvider(n) {
    r = n;
  }, httpAuthSchemeProvider() {
    return r;
  }, setCredentials(n) {
    s = n;
  }, credentials() {
    return s;
  } };
}, Ib = (t) => ({ httpAuthSchemes: t.httpAuthSchemes(), httpAuthSchemeProvider: t.httpAuthSchemeProvider(), credentials: t.credentials() }), Ob = (t, e) => {
  const r = Object.assign(Tb(t), Sh(t), el(t), Bb(t));
  return e.forEach((s) => s.configure(r)), Object.assign(t, _b(r), xh(r), tl(r), Ib(r));
};
class qb extends lh {
  constructor(...[e]) {
    const r = Db(e || {});
    super(r);
    __publicField(this, "config");
    this.initConfig = r;
    const s = qg(r), n = Xp(s), i = tp(n), o = gg(i), a = Nm(o), c = a, u = Zm(c), m = $m(u), l = Vg(m), h = Pp(l, { session: [() => this, Ax] }), g = Ob(h, (e == null ? void 0 : e.extensions) || []);
    this.config = g, this.middlewareStack.use(jl(this.config)), this.middlewareStack.use(Bm(this.config)), this.middlewareStack.use(Cg(this.config)), this.middlewareStack.use(Lm(this.config)), this.middlewareStack.use(np(this.config)), this.middlewareStack.use(ap(this.config)), this.middlewareStack.use(dp(this.config)), this.middlewareStack.use(ml(this.config, { httpAuthSchemeParametersProvider: Lg, identityProviderConfigProvider: async (x) => new Tf({ "aws.auth#sigv4": x.credentials, "aws.auth#sigv4a": x.credentials }) })), this.middlewareStack.use(bl(this.config)), this.middlewareStack.use(Gp(this.config)), this.middlewareStack.use(il(this.config)), this.middlewareStack.use(bp(this.config)), this.middlewareStack.use(Tp(this.config)), this.middlewareStack.use(Mp(this.config));
  }
  destroy() {
    super.destroy();
  }
}
function Mb(t) {
  return (e) => async (r) => {
    const s = { ...r.input }, n = [{ target: "SSECustomerKey", hash: "SSECustomerKeyMD5" }, { target: "CopySourceSSECustomerKey", hash: "CopySourceSSECustomerKeyMD5" }];
    for (const i of n) {
      const o = s[i.target];
      if (o) {
        let a;
        typeof o == "string" ? Nb(o, t) ? a = t.base64Decoder(o) : (a = t.utf8Decoder(o), s[i.target] = t.base64Encoder(a)) : (a = ArrayBuffer.isView(o) ? new Uint8Array(o.buffer, o.byteOffset, o.byteLength) : new Uint8Array(o), s[i.target] = t.base64Encoder(a));
        const c = new t.md5();
        c.update(a), s[i.hash] = t.base64Encoder(await c.digest());
      }
    }
    return e({ ...r, input: s });
  };
}
const Pb = { name: "ssecMiddleware", step: "initialize", tags: ["SSE"], override: true }, Fs = (t) => ({ applyToStack: (e) => {
  e.add(Mb(t), Pb);
} });
function Nb(t, e) {
  if (!/^(?:[A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(t)) return false;
  try {
    return e.base64Decoder(t).length === 32;
  } catch {
    return false;
  }
}
class Gb extends $e.classBuilder().ep({ ...Ge, DisableS3ExpressSessionAuth: { type: "staticContextParams", value: true }, Bucket: { type: "contextParams", name: "Bucket" }, Key: { type: "contextParams", name: "Key" }, CopySource: { type: "contextParams", name: "CopySource" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), Je(s), Fs(s)];
}).s("AmazonS3", "CopyObject", {}).n("S3Client", "CopyObjectCommand").sc(px).build() {
}
class Wb extends $e.classBuilder().ep({ ...Ge, Bucket: { type: "contextParams", name: "Bucket" }, Key: { type: "contextParams", name: "Key" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), Je(s)];
}).s("AmazonS3", "DeleteObject", {}).n("S3Client", "DeleteObjectCommand").sc(gx).build() {
}
class Kb extends $e.classBuilder().ep({ ...Ge, Bucket: { type: "contextParams", name: "Bucket" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), fi(s, { requestAlgorithmMember: { httpHeader: "x-amz-sdk-checksum-algorithm", name: "ChecksumAlgorithm" }, requestChecksumRequired: true }), Je(s)];
}).s("AmazonS3", "DeleteObjects", {}).n("S3Client", "DeleteObjectsCommand").sc(yx).build() {
}
class Xb extends $e.classBuilder().ep({ ...Ge, UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true }, Bucket: { type: "contextParams", name: "Bucket" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), Je(s)];
}).s("AmazonS3", "GetBucketVersioning", {}).n("S3Client", "GetBucketVersioningCommand").sc(Sx).build() {
}
class Zb extends $e.classBuilder().ep({ ...Ge, Bucket: { type: "contextParams", name: "Bucket" }, Key: { type: "contextParams", name: "Key" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), fi(s, { requestChecksumRequired: false, requestValidationModeMember: "ChecksumMode", responseAlgorithms: ["CRC64NVME", "CRC32", "CRC32C", "SHA256", "SHA1"] }), Fs(s), $c()];
}).s("AmazonS3", "GetObject", {}).n("S3Client", "GetObjectCommand").sc(xx).build() {
}
class Qb extends $e.classBuilder().ep({ ...Ge, Bucket: { type: "contextParams", name: "Bucket" }, Key: { type: "contextParams", name: "Key" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), Je(s), Fs(s), $c()];
}).s("AmazonS3", "HeadObject", {}).n("S3Client", "HeadObjectCommand").sc(bx).build() {
}
class Jb extends $e.classBuilder().ep({ ...Ge, Bucket: { type: "contextParams", name: "Bucket" }, Prefix: { type: "contextParams", name: "Prefix" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), Je(s)];
}).s("AmazonS3", "ListObjectsV2", {}).n("S3Client", "ListObjectsV2Command").sc(wx).build() {
}
class Yb extends $e.classBuilder().ep({ ...Ge, Bucket: { type: "contextParams", name: "Bucket" }, Prefix: { type: "contextParams", name: "Prefix" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), Je(s)];
}).s("AmazonS3", "ListObjectVersions", {}).n("S3Client", "ListObjectVersionsCommand").sc(Ex).build() {
}
class ew extends $e.classBuilder().ep({ ...Ge, Bucket: { type: "contextParams", name: "Bucket" }, Key: { type: "contextParams", name: "Key" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), fi(s, { requestAlgorithmMember: { httpHeader: "x-amz-sdk-checksum-algorithm", name: "ChecksumAlgorithm" }, requestChecksumRequired: false }), mp(), Je(s), Fs(s)];
}).s("AmazonS3", "PutObject", {}).n("S3Client", "PutObjectCommand").sc(Cx).build() {
}
function $b(t) {
  const { port: e, query: r } = t;
  let { protocol: s, path: n, hostname: i } = t;
  s && s.slice(-1) !== ":" && (s += ":"), e && (i += `:${e}`), n && n.charAt(0) !== "/" && (n = `/${n}`);
  let o = r ? ac(r) : "";
  o && o[0] !== "?" && (o = `?${o}`);
  let a = "";
  if (t.username != null || t.password != null) {
    const u = t.username ?? "", m = t.password ?? "";
    a = `${u}:${m}@`;
  }
  let c = "";
  return t.fragment && (c = `#${t.fragment}`), `${s}//${a}${i}${n}${o}${c}`;
}
const Ub = "UNSIGNED-PAYLOAD", Fb = "X-Amz-Content-Sha256";
class rc {
  constructor(e) {
    __publicField(this, "signer");
    const r = { service: e.signingName || e.service || "s3", uriEscapePath: e.uriEscapePath || false, applyChecksum: e.applyChecksum || false, ...e };
    this.signer = new Si(r);
  }
  presign(e, { unsignableHeaders: r = /* @__PURE__ */ new Set(), hoistableHeaders: s = /* @__PURE__ */ new Set(), unhoistableHeaders: n = /* @__PURE__ */ new Set(), ...i } = {}) {
    return this.prepareRequest(e, { unsignableHeaders: r, unhoistableHeaders: n, hoistableHeaders: s }), this.signer.presign(e, { expiresIn: 900, unsignableHeaders: r, unhoistableHeaders: n, ...i });
  }
  presignWithCredentials(e, r, { unsignableHeaders: s = /* @__PURE__ */ new Set(), hoistableHeaders: n = /* @__PURE__ */ new Set(), unhoistableHeaders: i = /* @__PURE__ */ new Set(), ...o } = {}) {
    return this.prepareRequest(e, { unsignableHeaders: s, unhoistableHeaders: i, hoistableHeaders: n }), this.signer.presignWithCredentials(e, r, { expiresIn: 900, unsignableHeaders: s, unhoistableHeaders: i, ...o });
  }
  prepareRequest(e, { unsignableHeaders: r = /* @__PURE__ */ new Set(), unhoistableHeaders: s = /* @__PURE__ */ new Set(), hoistableHeaders: n = /* @__PURE__ */ new Set() } = {}) {
    r.add("content-type"), Object.keys(e.headers).map((c) => c.toLowerCase()).filter((c) => c.startsWith("x-amz-server-side-encryption")).forEach((c) => {
      n.has(c) || s.add(c);
    }), e.headers[Fb] = Ub;
    const i = e.headers.host, o = e.port, a = `${e.hostname}${e.port != null ? ":" + o : ""}`;
    (!i || i === e.hostname && e.port != null) && (e.headers.host = a);
  }
}
const tw = async (t, e, r = {}) => {
  var _a2, _b2, _c2;
  let s, n;
  if (typeof t.config.endpointProvider == "function") {
    const h = (_b2 = (_a2 = (await Yc(e.input, e.constructor, t.config)).properties) == null ? void 0 : _a2.authSchemes) == null ? void 0 : _b2[0];
    (h == null ? void 0 : h.name) === "sigv4a" ? n = (_c2 = h == null ? void 0 : h.signingRegionSet) == null ? void 0 : _c2.join(",") : n = h == null ? void 0 : h.signingRegion, s = new rc({ ...t.config, signingName: h == null ? void 0 : h.signingName, region: async () => n });
  } else s = new rc(t.config);
  const i = (l, h) => async (g) => {
    const { request: x } = g;
    if (!ee.isInstance(x)) throw new Error("Request to be presigned is not an valid HTTP request.");
    delete x.headers["amz-sdk-invocation-id"], delete x.headers["amz-sdk-request"], delete x.headers["x-amz-user-agent"];
    let E;
    const C = { ...r, signingRegion: r.signingRegion ?? h.signing_region ?? n, signingService: r.signingService ?? h.signing_service };
    return h.s3ExpressIdentity ? E = await s.presignWithCredentials(x, h.s3ExpressIdentity, C) : E = await s.presign(x, C), { response: {}, output: { $metadata: { httpStatusCode: 200 }, presigned: E } };
  }, o = "presignInterceptMiddleware", a = t.middlewareStack.clone();
  a.addRelativeTo(i, { name: o, relation: "before", toMiddleware: "awsAuthMiddleware", override: true });
  const c = e.resolveMiddleware(a, t.config, {}), { output: u } = await c({ input: e.input }), { presigned: m } = u;
  return $b(m);
};
class Lb {
  constructor({ marshaller: e, serializer: r, deserializer: s, serdeContext: n, defaultContentType: i }) {
    __publicField(this, "marshaller");
    __publicField(this, "serializer");
    __publicField(this, "deserializer");
    __publicField(this, "serdeContext");
    __publicField(this, "defaultContentType");
    this.marshaller = e, this.serializer = r, this.deserializer = s, this.serdeContext = n, this.defaultContentType = i;
  }
  async serializeEventStream({ eventStream: e, requestSchema: r, initialRequest: s }) {
    const n = this.marshaller, i = r.getEventStreamMember(), o = r.getMemberSchema(i), a = this.serializer, c = this.defaultContentType, u = /* @__PURE__ */ Symbol("initialRequestMarker"), m = { async *[Symbol.asyncIterator]() {
      if (s) {
        const l = { ":event-type": { type: "string", value: "initial-request" }, ":message-type": { type: "string", value: "event" }, ":content-type": { type: "string", value: c } };
        a.write(r, s);
        const h = a.flush();
        yield { [u]: true, headers: l, body: h };
      }
      for await (const l of e) yield l;
    } };
    return n.serialize(m, (l) => {
      if (l[u]) return { headers: l.headers, body: l.body };
      const h = Object.keys(l).find((R) => R !== "__type") ?? "", { additionalHeaders: g, body: x, eventType: E, explicitPayloadContentType: C } = this.writeEventBody(h, o, l);
      return { headers: { ":event-type": { type: "string", value: E }, ":message-type": { type: "string", value: "event" }, ":content-type": { type: "string", value: C ?? c }, ...g }, body: x };
    });
  }
  async deserializeEventStream({ response: e, responseSchema: r, initialResponseContainer: s }) {
    var _a2;
    const n = this.marshaller, i = r.getEventStreamMember(), a = r.getMemberSchema(i).getMemberSchemas(), c = /* @__PURE__ */ Symbol("initialResponseMarker"), u = n.deserialize(e.body, async (h) => {
      var _a3, _b2;
      const g = Object.keys(h).find((E) => E !== "__type") ?? "", x = h[g].body;
      if (g === "initial-response") {
        const E = await this.deserializer.read(r, x);
        return delete E[i], { [c]: true, ...E };
      } else if (g in a) {
        const E = a[g];
        if (E.isStructSchema()) {
          const C = {};
          let T = false;
          for (const [R, O] of E.structIterator()) {
            const { eventHeader: N, eventPayload: q } = O.getMergedTraits();
            if (T = T || !!(N || q), q) O.isBlobSchema() ? C[R] = x : O.isStringSchema() ? C[R] = (((_a3 = this.serdeContext) == null ? void 0 : _a3.utf8Encoder) ?? It)(x) : O.isStructSchema() && (C[R] = await this.deserializer.read(O, x));
            else if (N) {
              const te = (_b2 = h[g].headers[R]) == null ? void 0 : _b2.value;
              te != null && (O.isNumericSchema() ? te && typeof te == "object" && "bytes" in te ? C[R] = BigInt(te.toString()) : C[R] = Number(te) : C[R] = te);
            }
          }
          if (T) return { [g]: C };
          if (x.byteLength === 0) return { [g]: {} };
        }
        return { [g]: await this.deserializer.read(E, x) };
      } else return { $unknown: h };
    }), m = u[Symbol.asyncIterator](), l = await m.next();
    if (l.done) return u;
    if ((_a2 = l.value) == null ? void 0 : _a2[c]) {
      if (!r) throw new Error("@smithy::core/protocols - initial-response event encountered in event stream but no response schema given.");
      for (const [h, g] of Object.entries(l.value)) s[h] = g;
    }
    return { async *[Symbol.asyncIterator]() {
      var _a3;
      for (((_a3 = l == null ? void 0 : l.value) == null ? void 0 : _a3[c]) || (yield l.value); ; ) {
        const { done: h, value: g } = await m.next();
        if (h) break;
        yield g;
      }
    } };
  }
  writeEventBody(e, r, s) {
    var _a2;
    const n = this.serializer;
    let i = e, o = null, a;
    const c = r.getSchema()[4].includes(e), u = {};
    if (c) {
      const h = r.getMemberSchema(e);
      if (h.isStructSchema()) {
        for (const [g, x] of h.structIterator()) {
          const { eventHeader: E, eventPayload: C } = x.getMergedTraits();
          if (C) o = g;
          else if (E) {
            const T = s[e][g];
            let R = "binary";
            x.isNumericSchema() ? (-2) ** 31 <= T && T <= 2 ** 31 - 1 ? R = "integer" : R = "long" : x.isTimestampSchema() ? R = "timestamp" : x.isStringSchema() ? R = "string" : x.isBooleanSchema() && (R = "boolean"), T != null && (u[g] = { type: R, value: T }, delete s[e][g]);
          }
        }
        if (o !== null) {
          const g = h.getMemberSchema(o);
          g.isBlobSchema() ? a = "application/octet-stream" : g.isStringSchema() && (a = "text/plain"), n.write(g, s[e][o]);
        } else n.write(h, s[e]);
      } else if (h.isUnitSchema()) n.write(h, {});
      else throw new Error("@smithy/core/event-streams - non-struct member not supported in event stream union.");
    } else {
      const [h, g] = s[e];
      i = h, n.write(15, g);
    }
    const m = n.flush();
    return { body: typeof m == "string" ? (((_a2 = this.serdeContext) == null ? void 0 : _a2.utf8Decoder) ?? Qe)(m) : m, eventType: i, explicitPayloadContentType: a, additionalHeaders: u };
  }
}
const Hb = Object.freeze(Object.defineProperty({ __proto__: null, EventStreamSerde: Lb }, Symbol.toStringTag, { value: "Module" }));
export {
  Gb as C,
  Wb as D,
  Zb as G,
  Qb as H,
  Jb as L,
  ew as P,
  qb as S,
  Yd as _,
  Eo as a,
  zb as b,
  jb as c,
  Xb as d,
  Yb as e,
  Kb as f,
  tw as g
};
