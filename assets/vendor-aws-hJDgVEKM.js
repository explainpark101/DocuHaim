var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const _l = "modulepreload", Dl = function(t) {
  return "/DocuHaim/" + t;
}, so = {}, kl = function(e, r, s) {
  let n = Promise.resolve();
  if (r && r.length > 0) {
    let c = function(u) {
      return Promise.all(u.map((p) => Promise.resolve(p).then((l) => ({ status: "fulfilled", value: l }), (l) => ({ status: "rejected", reason: l }))));
    };
    document.getElementsByTagName("link");
    const o = document.querySelector("meta[property=csp-nonce]"), a = (o == null ? void 0 : o.nonce) || (o == null ? void 0 : o.getAttribute("nonce"));
    n = c(r.map((u) => {
      if (u = Dl(u), u in so) return;
      so[u] = true;
      const p = u.endsWith(".css"), l = p ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${u}"]${l}`)) return;
      const h = document.createElement("link");
      if (h.rel = p ? "stylesheet" : _l, p || (h.as = "script"), h.crossOrigin = "", h.href = u, a && h.setAttribute("nonce", a), document.head.appendChild(h), p) return new Promise((m, y) => {
        h.addEventListener("load", m), h.addEventListener("error", () => y(new Error(`Unable to preload CSS for ${u}`)));
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
}, Tl = (t) => ({ setHttpHandler(e) {
  t.httpHandler = e;
}, httpHandler() {
  return t.httpHandler;
}, updateHttpClientConfig(e, r) {
  var _a2;
  (_a2 = t.httpHandler) == null ? void 0 : _a2.updateHttpClientConfig(e, r);
}, httpHandlerConfigs() {
  return t.httpHandler.httpHandlerConfigs();
} }), Ol = (t) => ({ httpHandler: t.httpHandler() });
var mr;
(function(t) {
  t.HTTP = "http", t.HTTPS = "https";
})(mr || (mr = {}));
var gr;
(function(t) {
  t.MD5 = "md5", t.CRC32 = "crc32", t.CRC32C = "crc32c", t.SHA1 = "sha1", t.SHA256 = "sha256";
})(gr || (gr = {}));
const Pn = "__smithy_context";
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
    return r.query && (r.query = Bl(r.query)), r;
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
function Bl(t) {
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
function Il(t) {
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
const Ml = { step: "build", tags: ["SET_EXPECT_HEADER", "EXPECT_HEADER"], name: "addExpectContinueMiddleware", override: true }, Pl = (t) => ({ applyToStack: (e) => {
  e.add(Il(t), Ml);
} }), Vt = { WHEN_SUPPORTED: "WHEN_SUPPORTED", WHEN_REQUIRED: "WHEN_REQUIRED" }, Nl = Vt.WHEN_SUPPORTED, Gs = { WHEN_SUPPORTED: "WHEN_SUPPORTED", WHEN_REQUIRED: "WHEN_REQUIRED" }, $l = Vt.WHEN_SUPPORTED;
var K;
(function(t) {
  t.MD5 = "MD5", t.CRC32 = "CRC32", t.CRC32C = "CRC32C", t.CRC64NVME = "CRC64NVME", t.SHA1 = "SHA1", t.SHA256 = "SHA256";
})(K || (K = {}));
var no;
(function(t) {
  t.HEADER = "header", t.TRAILER = "trailer";
})(no || (no = {}));
const Nn = K.CRC32;
function Ul(t, e, r) {
  return t.$source || (t.$source = {}), t.$source[e] = r, t;
}
function se(t, e, r) {
  t.__aws_sdk_context ? t.__aws_sdk_context.features || (t.__aws_sdk_context.features = {}) : t.__aws_sdk_context = { features: {} }, t.__aws_sdk_context.features[e] = r;
}
const io = (t) => {
  var _a2, _b2;
  return ct.isInstance(t) ? ((_a2 = t.headers) == null ? void 0 : _a2.date) ?? ((_b2 = t.headers) == null ? void 0 : _b2.Date) : void 0;
}, oi = (t) => new Date(Date.now() + t), Fl = (t, e) => Math.abs(oi(e).getTime() - t) >= 3e5, oo = (t, e) => {
  const r = Date.parse(t);
  return Fl(r, e) ? r - Date.now() : e;
}, ar = (t, e) => {
  if (!e) throw new Error(`Property \`${t}\` is not resolved for AWS SDK SigV4Auth`);
  return e;
}, uc = async (t) => {
  var _a2, _b2, _c2;
  const e = ar("context", t.context), r = ar("config", t.config), s = (_c2 = (_b2 = (_a2 = e.endpointV2) == null ? void 0 : _a2.properties) == null ? void 0 : _b2.authSchemes) == null ? void 0 : _c2[0], i = await ar("signer", r.signer)(s), o = t == null ? void 0 : t.signingRegion, a = t == null ? void 0 : t.signingRegionSet, c = t == null ? void 0 : t.signingName;
  return { config: r, signer: i, signingRegion: o, signingRegionSet: a, signingName: c };
};
class dc {
  async sign(e, r, s) {
    var _a2;
    if (!ee.isInstance(e)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
    const n = await uc(s), { config: i, signer: o } = n;
    let { signingRegion: a, signingName: c } = n;
    const u = s.context;
    if (((_a2 = u == null ? void 0 : u.authSchemes) == null ? void 0 : _a2.length) ?? false) {
      const [l, h] = u.authSchemes;
      (l == null ? void 0 : l.name) === "sigv4a" && (h == null ? void 0 : h.name) === "sigv4" && (a = (h == null ? void 0 : h.signingRegion) ?? a, c = (h == null ? void 0 : h.signingName) ?? c);
    }
    return await o.sign(e, { signingDate: oi(i.systemClockOffset), signingRegion: a, signingService: c });
  }
  errorHandler(e) {
    return (r) => {
      const s = r.ServerTime ?? io(r.$response);
      if (s) {
        const n = ar("config", e.config), i = n.systemClockOffset;
        n.systemClockOffset = oo(s, n.systemClockOffset), n.systemClockOffset !== i && r.$metadata && (r.$metadata.clockSkewCorrected = true);
      }
      throw r;
    };
  }
  successHandler(e, r) {
    const s = io(e);
    if (s) {
      const n = ar("config", r.config);
      n.systemClockOffset = oo(s, n.systemClockOffset);
    }
  }
}
class Ll extends dc {
  async sign(e, r, s) {
    var _a2;
    if (!ee.isInstance(e)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
    const { config: n, signer: i, signingRegion: o, signingRegionSet: a, signingName: c } = await uc(s), p = (await ((_a2 = n.sigv4aSigningRegionSet) == null ? void 0 : _a2.call(n)) ?? a ?? [o]).join(",");
    return await i.sign(e, { signingDate: oi(n.systemClockOffset), signingRegion: p, signingService: c });
  }
}
const ft = (t) => t[Pn] || (t[Pn] = {}), Ne = (t) => {
  if (typeof t == "function") return t;
  const e = Promise.resolve(t);
  return () => e;
}, Hl = (t, e) => {
  if (!e || e.length === 0) return t;
  const r = [];
  for (const s of e) for (const n of t) n.schemeId.split("#")[1] === s && r.push(n);
  for (const s of t) r.find(({ schemeId: n }) => n === s.schemeId) || r.push(s);
  return r;
};
function jl(t) {
  const e = /* @__PURE__ */ new Map();
  for (const r of t) e.set(r.schemeId, r);
  return e;
}
const zl = (t, e) => (r, s) => async (n) => {
  var _a2;
  const i = t.httpAuthSchemeProvider(await e.httpAuthSchemeParametersProvider(t, s, n.input)), o = t.authSchemePreference ? await t.authSchemePreference() : [], a = Hl(i, o), c = jl(t.httpAuthSchemes), u = ft(s), p = [];
  for (const l of a) {
    const h = c.get(l.schemeId);
    if (!h) {
      p.push(`HttpAuthScheme \`${l.schemeId}\` was not enabled for this service.`);
      continue;
    }
    const m = h.identityProvider(await e.identityProviderConfigProvider(t));
    if (!m) {
      p.push(`HttpAuthScheme \`${l.schemeId}\` did not have an IdentityProvider configured.`);
      continue;
    }
    const { identityProperties: y = {}, signingProperties: x = {} } = ((_a2 = l.propertiesExtractor) == null ? void 0 : _a2.call(l, t, s)) || {};
    l.identityProperties = Object.assign(l.identityProperties || {}, y), l.signingProperties = Object.assign(l.signingProperties || {}, x), u.selectedHttpAuthScheme = { httpAuthOption: l, identity: await m(l.identityProperties), signer: h.signer };
    break;
  }
  if (!u.selectedHttpAuthScheme) throw new Error(p.join(`
`));
  return r(n);
}, Vl = { step: "serialize", tags: ["HTTP_AUTH_SCHEME"], name: "httpAuthSchemeMiddleware", override: true, relation: "before", toMiddleware: "endpointV2Middleware" }, ql = (t, { httpAuthSchemeParametersProvider: e, identityProviderConfigProvider: r }) => ({ applyToStack: (s) => {
  s.addRelativeTo(zl(t, { httpAuthSchemeParametersProvider: e, identityProviderConfigProvider: r }), Vl);
} }), Gl = { name: "serializerMiddleware" }, Kl = (t) => (e) => {
  throw e;
}, Wl = (t, e) => {
}, Xl = (t) => (e, r) => async (s) => {
  if (!ee.isInstance(s.request)) return e(s);
  const i = ft(r).selectedHttpAuthScheme;
  if (!i) throw new Error("No HttpAuthScheme was selected: unable to sign request");
  const { httpAuthOption: { signingProperties: o = {} }, identity: a, signer: c } = i, u = await e({ ...s, request: await c.sign(s.request, a, o) }).catch((c.errorHandler || Kl)(o));
  return (c.successHandler || Wl)(u.response, o), u;
}, lc = { step: "finalizeRequest", tags: ["HTTP_SIGNING"], name: "httpSigningMiddleware", aliases: ["apiKeyMiddleware", "tokenMiddleware", "awsAuthMiddleware"], override: true, relation: "after", toMiddleware: "retryMiddleware" }, Zl = (t) => ({ applyToStack: (e) => {
  e.addRelativeTo(Xl(), lc);
} }), Ht = (t) => {
  if (typeof t == "function") return t;
  const e = Promise.resolve(t);
  return () => e;
}, fc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", ao = Object.entries(fc).reduce((t, [e, r]) => (t[r] = Number(e), t), {}), Ql = fc.split(""), jt = 6, cr = 8, Jl = 63, qt = (t) => {
  let e = t.length / 4 * 3;
  t.slice(-2) === "==" ? e -= 2 : t.slice(-1) === "=" && e--;
  const r = new ArrayBuffer(e), s = new DataView(r);
  for (let n = 0; n < t.length; n += 4) {
    let i = 0, o = 0;
    for (let u = n, p = n + 3; u <= p; u++) if (t[u] !== "=") {
      if (!(t[u] in ao)) throw new TypeError(`Invalid character ${t[u]} in base64 string.`);
      i |= ao[t[u]] << (p - u) * jt, o += jt;
    } else i >>= jt;
    const a = n / 4 * 3;
    i >>= o % cr;
    const c = Math.floor(o / cr);
    for (let u = 0; u < c; u++) {
      const p = (c - u - 1) * cr;
      s.setUint8(a + u, (i & 255 << p) >> p);
    }
  }
  return new Uint8Array(r);
}, Qe = (t) => new TextEncoder().encode(t), Gt = (t) => typeof t == "string" ? Qe(t) : ArrayBuffer.isView(t) ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(t), Bt = (t) => {
  if (typeof t == "string") return t;
  if (typeof t != "object" || typeof t.byteOffset != "number" || typeof t.byteLength != "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
  return new TextDecoder("utf-8").decode(t);
};
function Ot(t) {
  let e;
  typeof t == "string" ? e = Qe(t) : e = t;
  const r = typeof e == "object" && typeof e.length == "number", s = typeof e == "object" && typeof e.byteOffset == "number" && typeof e.byteLength == "number";
  if (!r && !s) throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
  let n = "";
  for (let i = 0; i < e.length; i += 3) {
    let o = 0, a = 0;
    for (let u = i, p = Math.min(i + 3, e.length); u < p; u++) o |= e[u] << (p - u - 1) * cr, a += cr;
    const c = Math.ceil(a / jt);
    o <<= c * jt - a;
    for (let u = 1; u <= c; u++) {
      const p = (c - u) * jt;
      n += Ql[(o & Jl << p) >> p];
    }
    n += "==".slice(0, 4 - c);
  }
  return n;
}
class kt extends Uint8Array {
  static fromString(e, r = "utf-8") {
    if (typeof e == "string") return r === "base64" ? kt.mutate(qt(e)) : kt.mutate(Qe(e));
    throw new Error(`Unsupported conversion from ${typeof e} to Uint8ArrayBlobAdapter.`);
  }
  static mutate(e) {
    return Object.setPrototypeOf(e, kt.prototype), e;
  }
  transformToString(e = "utf-8") {
    return e === "base64" ? Ot(this) : Bt(this);
  }
}
const Yl = typeof ReadableStream == "function" ? ReadableStream : function() {
};
class ef extends Yl {
}
const $n = (t) => {
  var _a2;
  return typeof ReadableStream == "function" && (((_a2 = t == null ? void 0 : t.constructor) == null ? void 0 : _a2.name) === ReadableStream.name || t instanceof ReadableStream);
}, tf = ({ expectedChecksum: t, checksum: e, source: r, checksumSourceLocation: s, base64Encoder: n }) => {
  var _a2;
  if (!$n(r)) throw new Error(`@smithy/util-stream: unsupported source type ${((_a2 = r == null ? void 0 : r.constructor) == null ? void 0 : _a2.name) ?? r} in ChecksumStream.`);
  const i = n ?? Ot;
  if (typeof TransformStream != "function") throw new Error("@smithy/util-stream: unable to instantiate ChecksumStream because API unavailable: ReadableStream/TransformStream.");
  const o = new TransformStream({ start() {
  }, async transform(c, u) {
    e.update(c), u.enqueue(c);
  }, async flush(c) {
    const u = await e.digest(), p = i(u);
    if (t !== p) {
      const l = new Error(`Checksum mismatch: expected "${t}" but received "${p}" in response header "${s}".`);
      c.error(l);
    } else c.terminate();
  } });
  r.pipeThrough(o);
  const a = o.readable;
  return Object.setPrototypeOf(a, ef.prototype), a;
};
class rf {
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
function sf(t, e, r) {
  const s = t.getReader();
  let n = false, i = 0;
  const o = ["", new rf((u) => new Uint8Array(u))];
  let a = -1;
  const c = async (u) => {
    const { value: p, done: l } = await s.read(), h = p;
    if (l) {
      if (a !== -1) {
        const m = Ks(o, a);
        ur(m) > 0 && u.enqueue(m);
      }
      u.close();
    } else {
      const m = af(h, false);
      if (a !== m && (a >= 0 && u.enqueue(Ks(o, a)), a = m), a === -1) {
        u.enqueue(h);
        return;
      }
      const y = ur(h);
      i += y;
      const x = ur(o[a]);
      if (y >= e && x === 0) u.enqueue(h);
      else {
        const w = of(o, a, h);
        !n && i > e * 2 && (n = true, r == null ? void 0 : r.warn(`@smithy/util-stream - stream chunk size ${y} is below threshold of ${e}, automatically buffering.`)), w >= e ? u.enqueue(Ks(o, a)) : await c(u);
      }
    }
  };
  return new ReadableStream({ pull: c });
}
const nf = sf;
function of(t, e, r) {
  switch (e) {
    case 0:
      return t[0] += r, ur(t[0]);
    case 1:
    case 2:
      return t[e].push(r), ur(t[e]);
  }
}
function Ks(t, e) {
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
function ur(t) {
  return (t == null ? void 0 : t.byteLength) ?? (t == null ? void 0 : t.length) ?? 0;
}
function af(t, e = true) {
  return e && typeof Buffer < "u" && t instanceof Buffer ? 2 : t instanceof Uint8Array ? 1 : typeof t == "string" ? 0 : -1;
}
const cf = (t, e) => {
  const { base64Encoder: r, bodyLengthChecker: s, checksumAlgorithmFn: n, checksumLocationName: i, streamHasher: o } = e, a = r !== void 0 && s !== void 0 && n !== void 0 && i !== void 0 && o !== void 0, c = a ? o(n, t) : void 0, u = t.getReader();
  return new ReadableStream({ async pull(p) {
    const { value: l, done: h } = await u.read();
    if (h) {
      if (p.enqueue(`0\r
`), a) {
        const m = r(await c);
        p.enqueue(`${i}:${m}\r
`), p.enqueue(`\r
`);
      }
      p.close();
    } else p.enqueue(`${(s(l) || 0).toString(16)}\r
${l}\r
`);
  } });
};
async function uf(t, e) {
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
const Tt = (t) => encodeURIComponent(t).replace(/[!'()*]/g, df), df = (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`;
function hc(t) {
  const e = [];
  for (let r of Object.keys(t).sort()) {
    const s = t[r];
    if (r = Tt(r), Array.isArray(s)) for (let n = 0, i = s.length; n < i; n++) e.push(`${r}=${Tt(s[n])}`);
    else {
      let n = r;
      (s || typeof s == "string") && (n += `=${Tt(s)}`), e.push(n);
    }
  }
  return e.join("&");
}
function co(t, e) {
  return new Request(t, e);
}
function lf(t = 0) {
  return new Promise((e, r) => {
    t && setTimeout(() => {
      const s = new Error(`Request did not complete within ${t} ms`);
      s.name = "TimeoutError", r(s);
    }, t);
  });
}
const Ws = { supported: void 0 };
class ai {
  constructor(e) {
    __publicField(this, "config");
    __publicField(this, "configProvider");
    typeof e == "function" ? this.configProvider = e().then((r) => r || {}) : (this.config = e ?? {}, this.configProvider = Promise.resolve(this.config)), Ws.supported === void 0 && (Ws.supported = typeof Request < "u" && "keepalive" in co("https://[::1]"));
  }
  static create(e) {
    return typeof (e == null ? void 0 : e.handle) == "function" ? e : new ai(e);
  }
  destroy() {
  }
  async handle(e, { abortSignal: r, requestTimeout: s } = {}) {
    var _a2;
    this.config || (this.config = await this.configProvider);
    const n = s ?? this.config.requestTimeout, i = this.config.keepAlive === true, o = this.config.credentials;
    if (r == null ? void 0 : r.aborted) {
      const v = uo(r);
      return Promise.reject(v);
    }
    let a = e.path;
    const c = hc(e.query || {});
    c && (a += `?${c}`), e.fragment && (a += `#${e.fragment}`);
    let u = "";
    if (e.username != null || e.password != null) {
      const v = e.username ?? "", I = e.password ?? "";
      u = `${v}:${I}@`;
    }
    const { port: p, method: l } = e, h = `${e.protocol}//${u}${e.hostname}${p ? `:${p}` : ""}${a}`, m = l === "GET" || l === "HEAD" ? void 0 : e.body, y = { body: m, headers: new Headers(e.headers), method: l, credentials: o };
    ((_a2 = this.config) == null ? void 0 : _a2.cache) && (y.cache = this.config.cache), m && (y.duplex = "half"), typeof AbortController < "u" && (y.signal = r), Ws.supported && (y.keepalive = i), typeof this.config.requestInit == "function" && Object.assign(y, this.config.requestInit(e));
    let x = () => {
    };
    const w = co(h, y), R = [fetch(w).then((v) => {
      const I = v.headers, N = {};
      for (const te of I.entries()) N[te[0]] = te[1];
      return v.body != null ? { response: new ct({ headers: N, reason: v.statusText, statusCode: v.status, body: v.body }) } : v.blob().then((te) => ({ response: new ct({ headers: N, reason: v.statusText, statusCode: v.status, body: te }) }));
    }), lf(n)];
    return r && R.push(new Promise((v, I) => {
      const N = () => {
        const q = uo(r);
        I(q);
      };
      if (typeof r.addEventListener == "function") {
        const q = r;
        q.addEventListener("abort", N, { once: true }), x = () => q.removeEventListener("abort", N);
      } else r.onabort = N;
    })), Promise.race(R).finally(x);
  }
  updateHttpClientConfig(e, r) {
    this.config = void 0, this.configProvider = this.configProvider.then((s) => (s[e] = r, s));
  }
  httpHandlerConfigs() {
    return this.config ?? {};
  }
}
function uo(t) {
  const e = t && typeof t == "object" && "reason" in t ? t.reason : void 0;
  if (e) {
    if (e instanceof Error) return e;
    const s = new Error(String(e));
    return s.name = "AbortError", s;
  }
  const r = new Error("Request aborted");
  return r.name = "AbortError", r;
}
const pc = async (t) => {
  var _a2;
  return typeof Blob == "function" && t instanceof Blob || ((_a2 = t.constructor) == null ? void 0 : _a2.name) === "Blob" ? Blob.prototype.arrayBuffer !== void 0 ? new Uint8Array(await t.arrayBuffer()) : ff(t) : hf(t);
};
async function ff(t) {
  const e = await pf(t), r = qt(e);
  return new Uint8Array(r);
}
async function hf(t) {
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
function pf(t) {
  return new Promise((e, r) => {
    const s = new FileReader();
    s.onloadend = () => {
      if (s.readyState !== 2) return r(new Error("Reader aborted too early"));
      const n = s.result ?? "", i = n.indexOf(","), o = i > -1 ? i + 1 : n.length;
      e(n.substring(o));
    }, s.onabort = () => r(new Error("Read aborted")), s.onerror = () => r(s.error), s.readAsDataURL(t);
  });
}
const mc = {}, Un = {};
for (let t = 0; t < 256; t++) {
  let e = t.toString(16).toLowerCase();
  e.length === 1 && (e = `0${e}`), mc[t] = e, Un[e] = t;
}
function gc(t) {
  if (t.length % 2 !== 0) throw new Error("Hex encoded strings must have an even number length");
  const e = new Uint8Array(t.length / 2);
  for (let r = 0; r < t.length; r += 2) {
    const s = t.slice(r, r + 2).toLowerCase();
    if (s in Un) e[r / 2] = Un[s];
    else throw new Error(`Cannot decode unrecognized sequence ${s} as hexadecimal`);
  }
  return e;
}
function Re(t) {
  let e = "";
  for (let r = 0; r < t.byteLength; r++) e += mc[t[r]];
  return e;
}
const lo = "The stream has already been transformed.", yc = (t) => {
  var _a2, _b2;
  if (!fo(t) && !$n(t)) {
    const n = ((_b2 = (_a2 = t == null ? void 0 : t.__proto__) == null ? void 0 : _a2.constructor) == null ? void 0 : _b2.name) || t;
    throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${n}`);
  }
  let e = false;
  const r = async () => {
    if (e) throw new Error(lo);
    return e = true, await pc(t);
  }, s = (n) => {
    if (typeof n.stream != "function") throw new Error(`Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.
If you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/p/fetch-streaming-body`);
    return n.stream();
  };
  return Object.assign(t, { transformToByteArray: r, transformToString: async (n) => {
    const i = await r();
    if (n === "base64") return Ot(i);
    if (n === "hex") return Re(i);
    if (n === void 0 || n === "utf8" || n === "utf-8") return Bt(i);
    if (typeof TextDecoder == "function") return new TextDecoder(n).decode(i);
    throw new Error("TextDecoder is not available, please make sure polyfill is provided.");
  }, transformToWebStream: () => {
    if (e) throw new Error(lo);
    if (e = true, fo(t)) return s(t);
    if ($n(t)) return t;
    throw new Error(`Cannot transform payload to web stream, got ${t}`);
  } });
}, fo = (t) => typeof Blob == "function" && t instanceof Blob;
async function mf(t) {
  return typeof t.stream == "function" && (t = t.stream()), t.tee();
}
const Mr = async (t = new Uint8Array(), e) => {
  if (t instanceof Uint8Array) return kt.mutate(t);
  if (!t) return kt.mutate(new Uint8Array());
  const r = e.streamCollector(t);
  return kt.mutate(await r);
};
function ho(t) {
  return encodeURIComponent(t).replace(/[!'()*]/g, function(e) {
    return "%" + e.charCodeAt(0).toString(16).toUpperCase();
  });
}
const Xs = (t) => typeof t == "function" ? t() : t, Sc = (t, e, r, s, n) => ({ name: e, namespace: t, traits: r, input: s, output: n }), gf = (t) => (e, r) => async (s) => {
  var _a2, _b2, _c2, _d2;
  const { response: n } = await e(s), { operationSchema: i } = ft(r), [, o, a, c, u, p] = i ?? [];
  try {
    const l = await t.protocol.deserializeResponse(Sc(o, a, c, u, p), { ...t, ...r }, n);
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
          const { headers: m = {} } = n, y = Object.entries(m);
          l.$metadata = { httpStatusCode: n.statusCode, requestId: Zs(/^x-[\w-]+-request-?id$/, y), extendedRequestId: Zs(/^x-[\w-]+-id-2$/, y), cfId: Zs(/^x-[\w-]+-cf-id$/, y) };
        }
      } catch {
      }
    }
    throw l;
  }
}, Zs = (t, e) => (e.find(([r]) => r.match(t)) || [void 0, void 0])[1], yf = (t) => (e, r) => async (s) => {
  var _a2;
  const { operationSchema: n } = ft(r), [, i, o, a, c, u] = n ?? [], p = ((_a2 = r.endpointV2) == null ? void 0 : _a2.url) && t.urlParser ? async () => t.urlParser(r.endpointV2.url) : t.endpoint, l = await t.protocol.serializeRequest(Sc(i, o, a, c, u), s.input, { ...t, ...r, endpoint: p });
  return e({ ...s, request: l });
}, Sf = { name: "deserializerMiddleware", step: "deserialize", tags: ["DESERIALIZER"], override: true }, bf = { name: "serializerMiddleware", step: "serialize", tags: ["SERIALIZER"], override: true };
function xf(t) {
  return { applyToStack: (e) => {
    e.add(yf(t), bf), e.add(gf(t), Sf), t.protocol.setSerdeContext(t);
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
const po = { it: /* @__PURE__ */ Symbol.for("@smithy/nor-struct-it") };
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
    for (this._isMemberSchema = false; Qs(n); ) s.push(n[1]), n = n[0], i = Xs(n), this._isMemberSchema = true;
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
    if (this.schema = Xs(i), wf(this.schema) ? (this.name = `${this.schema[1]}#${this.schema[2]}`, this.traits = this.schema[3]) : (this.name = this.memberName ?? String(i), this.traits = 0), this._isMemberSchema && !r) throw new Error(`@smithy/core/schema - NormalizedSchema member init ${this.getName(true)} missing member name.`);
  }
  static [Symbol.hasInstance](e) {
    const r = this.prototype.isPrototypeOf(e);
    return !r && typeof e == "object" && e !== null ? e.symbol === this.symbol : r;
  }
  static of(e) {
    const r = Xs(e);
    if (r instanceof _X) return r;
    if (Qs(r)) {
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
    return sr([n, 0], "key");
  }
  getValueSchema() {
    const e = this.getSchema(), [r, s, n] = [this.isDocumentSchema(), this.isMapSchema(), this.isListSchema()], i = typeof e == "number" ? 63 & e : e && typeof e == "object" && (s || n) ? e[3 + e[0]] : r ? 15 : void 0;
    if (i != null) return sr([i, 0], s ? "value" : "member");
    throw new Error(`@smithy/core/schema - ${this.getName(true)} has no value member.`);
  }
  getMemberSchema(e) {
    const r = this.getSchema();
    if (this.isStructSchema() && r[4].includes(e)) {
      const s = r[4].indexOf(e), n = r[5][s];
      return sr(Qs(n) ? n : [n, 0], e);
    }
    if (this.isDocumentSchema()) return sr([15, 0], e);
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
    let s = e[po.it];
    if (s && r === s.length) {
      yield* s;
      return;
    }
    s = Array(r);
    for (let n = 0; n < r; ++n) {
      const i = e[4][n], o = sr([e[5][n], 0], i);
      yield s[n] = [i, o];
    }
    e[po.it] = s;
  }
};
__publicField(_X, "symbol", /* @__PURE__ */ Symbol.for("@smithy/nor"));
let X = _X;
function sr(t, e) {
  if (t instanceof X) return Object.assign(t, { memberName: e, _isMemberSchema: true });
  const r = X;
  return new r(t, e);
}
const Qs = (t) => Array.isArray(t) && t.length === 2, wf = (t) => Array.isArray(t) && t.length >= 5;
const _ve = class _ve {
  constructor(e, r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map()) {
    __publicField(this, "namespace");
    __publicField(this, "schemas");
    __publicField(this, "exceptions");
    this.namespace = e, this.schemas = r, this.exceptions = s;
  }
  static for(e) {
    return _ve.registries.has(e) || _ve.registries.set(e, new _ve(e)), _ve.registries.get(e);
  }
  copyFrom(e) {
    const { schemas: r, exceptions: s } = this;
    for (const [n, i] of e.schemas) r.has(n) || r.set(n, i);
    for (const [n, i] of e.exceptions) s.has(n) || s.set(n, i);
  }
  register(e, r) {
    const s = this.normalizeShapeId(e);
    for (const n of [this, _ve.for(s.split("#")[0])]) n.schemas.set(s, r);
  }
  getSchema(e) {
    const r = this.normalizeShapeId(e);
    if (!this.schemas.has(r)) throw new Error(`@smithy/core/schema - schema not found for ${r}`);
    return this.schemas.get(r);
  }
  registerError(e, r) {
    const s = e, n = s[1];
    for (const i of [this, _ve.for(n)]) i.schemas.set(n + "#" + s[2], s), i.exceptions.set(s, r);
  }
  getErrorCtor(e) {
    const r = e;
    return this.exceptions.has(r) ? this.exceptions.get(r) : _ve.for(r[1]).exceptions.get(r);
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
__publicField(_ve, "registries", /* @__PURE__ */ new Map());
let ve = _ve;
const Ef = (t) => {
  if (t != null) {
    if (typeof t == "string") {
      const e = parseFloat(t);
      if (!Number.isNaN(e)) return String(e) !== String(t) && Tf.warn(kf(`Expected number but observed string: ${t}`)), e;
    }
    if (typeof t == "number") return t;
    throw new TypeError(`Expected number, got ${typeof t}: ${t}`);
  }
}, Cf = Math.ceil(2 ** 127 * (2 - 2 ** -23)), mo = (t) => {
  const e = Ef(t);
  if (e !== void 0 && !Number.isNaN(e) && e !== 1 / 0 && e !== -1 / 0 && Math.abs(e) > Cf) throw new TypeError(`Expected 32-bit float, got ${t}`);
  return e;
}, Af = (t) => {
  if (t != null) {
    if (Number.isInteger(t) && !Number.isNaN(t)) return t;
    throw new TypeError(`Expected integer, got ${typeof t}: ${t}`);
  }
}, go = (t) => bc(t, 16), yo = (t) => bc(t, 8), bc = (t, e) => {
  const r = Af(t);
  if (r !== void 0 && vf(r, e) !== r) throw new TypeError(`Expected ${e}-bit integer, got ${t}`);
  return r;
}, vf = (t, e) => {
  switch (e) {
    case 32:
      return Int32Array.of(t)[0];
    case 16:
      return Int16Array.of(t)[0];
    case 8:
      return Int8Array.of(t)[0];
  }
}, Rf = (t) => mo(typeof t == "string" ? ci(t) : t), _f = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g, ci = (t) => {
  const e = t.match(_f);
  if (e === null || e[0].length !== t.length) throw new TypeError("Expected real number, got implicit NaN");
  return parseFloat(t);
}, Fn = (t) => go(typeof t == "string" ? ci(t) : t), Df = (t) => yo(typeof t == "string" ? ci(t) : t), kf = (t) => String(new TypeError(t).stack || t).split(`
`).slice(0, 5).filter((e) => !e.includes("stackTraceWarning")).join(`
`), Tf = { warn: console.warn }, Of = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ui = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function Ln(t) {
  const e = t.getUTCFullYear(), r = t.getUTCMonth(), s = t.getUTCDay(), n = t.getUTCDate(), i = t.getUTCHours(), o = t.getUTCMinutes(), a = t.getUTCSeconds(), c = n < 10 ? `0${n}` : `${n}`, u = i < 10 ? `0${i}` : `${i}`, p = o < 10 ? `0${o}` : `${o}`, l = a < 10 ? `0${a}` : `${a}`;
  return `${Of[s]}, ${c} ${ui[r]} ${e} ${u}:${p}:${l} GMT`;
}
const Bf = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/), If = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/), Mf = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/), Pf = (t) => {
  if (t == null) return;
  if (typeof t != "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
  let e = Bf.exec(t);
  if (e) {
    const [r, s, n, i, o, a, c, u] = e;
    return Js(Fn(zr(i)), Ys(n), zt(s, "day", 1, 31), { hours: o, minutes: a, seconds: c, fractionalMilliseconds: u });
  }
  if (e = If.exec(t), e) {
    const [r, s, n, i, o, a, c, u] = e;
    return Uf(Js(Nf(i), Ys(n), zt(s, "day", 1, 31), { hours: o, minutes: a, seconds: c, fractionalMilliseconds: u }));
  }
  if (e = Mf.exec(t), e) {
    const [r, s, n, i, o, a, c, u] = e;
    return Js(Fn(zr(u)), Ys(s), zt(n.trimLeft(), "day", 1, 31), { hours: i, minutes: o, seconds: a, fractionalMilliseconds: c });
  }
  throw new TypeError("Invalid RFC-7231 date-time value");
}, Js = (t, e, r, s) => {
  const n = e - 1;
  return Lf(t, n, r), new Date(Date.UTC(t, n, r, zt(s.hours, "hour", 0, 23), zt(s.minutes, "minute", 0, 59), zt(s.seconds, "seconds", 0, 60), jf(s.fractionalMilliseconds)));
}, Nf = (t) => {
  const e = (/* @__PURE__ */ new Date()).getUTCFullYear(), r = Math.floor(e / 100) * 100 + Fn(zr(t));
  return r < e ? r + 100 : r;
}, $f = 50 * 365 * 24 * 60 * 60 * 1e3, Uf = (t) => t.getTime() - (/* @__PURE__ */ new Date()).getTime() > $f ? new Date(Date.UTC(t.getUTCFullYear() - 100, t.getUTCMonth(), t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.getUTCMilliseconds())) : t, Ys = (t) => {
  const e = ui.indexOf(t);
  if (e < 0) throw new TypeError(`Invalid month: ${t}`);
  return e + 1;
}, Ff = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Lf = (t, e, r) => {
  let s = Ff[e];
  if (e === 1 && Hf(t) && (s = 29), r > s) throw new TypeError(`Invalid day for ${ui[e]} in ${t}: ${r}`);
}, Hf = (t) => t % 4 === 0 && (t % 100 !== 0 || t % 400 === 0), zt = (t, e, r, s) => {
  const n = Df(zr(t));
  if (n < r || n > s) throw new TypeError(`${e} must be between ${r} and ${s}, inclusive`);
  return n;
}, jf = (t) => t == null ? 0 : Rf("0." + t) * 1e3, zr = (t) => {
  let e = 0;
  for (; e < t.length - 1 && t.charAt(e) === "0"; ) e++;
  return e === 0 ? t : t.slice(e);
}, So = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), pe = Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0")), di = () => {
  if (So) return So();
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
function zf(t) {
  return (t.includes(",") || t.includes('"')) && (t = `"${t.replace(/"/g, '\\"')}"`), t;
}
const li = "(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?:[ne|u?r]?s?day)?", fi = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)", hi = "(\\d?\\d):(\\d{2}):(\\d{2})(?:\\.(\\d+))?", xc = "(\\d?\\d)", wc = "(\\d{4})", Vf = new RegExp(/^(\d{4})-(\d\d)-(\d\d)[tT](\d\d):(\d\d):(\d\d)(\.(\d+))?(([-+]\d\d:\d\d)|[zZ])$/), qf = new RegExp(`^${li}, ${xc} ${fi} ${wc} ${hi} GMT$`), Gf = new RegExp(`^${li}, ${xc}-${fi}-(\\d\\d) ${hi} GMT$`), Kf = new RegExp(`^${li} ${fi} ( [1-9]|\\d\\d) ${hi} ${wc}$`), Wf = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Xf = (t) => {
  if (t == null) return;
  let e = NaN;
  if (typeof t == "number") e = t;
  else if (typeof t == "string") {
    if (!/^-?\d*\.?\d+$/.test(t)) throw new TypeError("parseEpochTimestamp - numeric string invalid.");
    e = Number.parseFloat(t);
  } else typeof t == "object" && t.tag === 1 && (e = t.value);
  if (isNaN(e) || Math.abs(e) === 1 / 0) throw new TypeError("Epoch timestamps must be valid finite numbers.");
  return new Date(Math.round(e * 1e3));
}, Zf = (t) => {
  if (t == null) return;
  if (typeof t != "string") throw new TypeError("RFC3339 timestamps must be strings");
  const e = Vf.exec(t);
  if (!e) throw new TypeError(`Invalid RFC3339 timestamp format ${t}`);
  const [, r, s, n, i, o, a, , c, u] = e;
  Xe(s, 1, 12), Xe(n, 1, 31), Xe(i, 0, 23), Xe(o, 0, 59), Xe(a, 0, 60);
  const p = new Date(Date.UTC(Number(r), Number(s) - 1, Number(n), Number(i), Number(o), Number(a), Number(c) ? Math.round(parseFloat(`0.${c}`) * 1e3) : 0));
  if (p.setUTCFullYear(Number(r)), u.toUpperCase() != "Z") {
    const [, l, h, m] = /([+-])(\d\d):(\d\d)/.exec(u) || [void 0, "+", 0, 0], y = l === "-" ? 1 : -1;
    p.setTime(p.getTime() + y * (Number(h) * 60 * 60 * 1e3 + Number(m) * 60 * 1e3));
  }
  return p;
}, Qf = (t) => {
  if (t == null) return;
  if (typeof t != "string") throw new TypeError("RFC7231 timestamps must be strings.");
  let e, r, s, n, i, o, a, c;
  if ((c = qf.exec(t)) ? [, e, r, s, n, i, o, a] = c : (c = Gf.exec(t)) ? ([, e, r, s, n, i, o, a] = c, s = (Number(s) + 1900).toString()) : (c = Kf.exec(t)) && ([, r, e, n, i, o, a, s] = c), s && o) {
    const u = Date.UTC(Number(s), Wf.indexOf(r), Number(e), Number(n), Number(i), Number(o), a ? Math.round(parseFloat(`0.${a}`) * 1e3) : 0);
    Xe(e, 1, 31), Xe(n, 0, 23), Xe(i, 0, 59), Xe(o, 0, 60);
    const p = new Date(u);
    return p.setUTCFullYear(Number(s)), p;
  }
  throw new TypeError(`Invalid RFC7231 date-time value ${t}.`);
};
function Xe(t, e, r) {
  const s = Number(t);
  if (s < e || s > r) throw new Error(`Value ${s} out of range [${e}, ${r}]`);
}
function Jf(t, e, r) {
  if (!Number.isInteger(r)) throw new Error("Invalid number of delimiters (" + r + ") for splitEvery.");
  const s = t.split(e), n = [];
  let i = "";
  for (let o = 0; o < s.length; o++) i === "" ? i = s[o] : i += e + s[o], (o + 1) % r === 0 && (n.push(i), i = "");
  return i !== "" && n.push(i), n;
}
const Ec = (t) => {
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
}, bo = /^-?\d*(\.\d+)?$/;
class rs {
  constructor(e, r) {
    __publicField(this, "string");
    __publicField(this, "type");
    if (this.string = e, this.type = r, !bo.test(e)) throw new Error('@smithy/core/serde - NumericValue must only contain [0-9], at most one decimal point ".", and an optional negation prefix "-".');
  }
  toString() {
    return this.string;
  }
  static [Symbol.hasInstance](e) {
    if (!e || typeof e != "object") return false;
    const r = e;
    return rs.prototype.isPrototypeOf(e) || r.type === "bigDecimal" && bo.test(r.string);
  }
}
class ss {
  constructor() {
    __publicField(this, "serdeContext");
  }
  setSerdeContext(e) {
    this.serdeContext = e;
  }
}
class Yf extends ss {
  constructor(e) {
    super();
    __publicField(this, "options");
    __publicField(this, "compositeErrorRegistry");
    this.options = e, this.compositeErrorRegistry = ve.for(e.defaultNamespace);
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
    const { EventStreamSerde: e } = await kl(async () => {
      const { EventStreamSerde: r } = await Promise.resolve().then(() => xw);
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
class eh extends Yf {
  async serializeRequest(e, r, s) {
    const n = { ...r ?? {} }, i = this.serializer, o = {}, a = {}, c = await s.endpoint(), u = X.of(e == null ? void 0 : e.input), p = [], l = [];
    let h = false, m;
    const y = new ee({ protocol: "", hostname: "", port: void 0, path: "", fragment: void 0, query: o, headers: a, body: void 0 });
    if (c) {
      this.updateServiceEndpoint(y, c), this.setHostPrefix(y, e, n);
      const x = Ft(e.traits);
      if (x.http) {
        y.method = x.http[0];
        const [w, R] = x.http[1].split("?");
        y.path == "/" ? y.path = w : y.path += w;
        const v = new URLSearchParams(R ?? "");
        Object.assign(o, Object.fromEntries(v));
      }
    }
    for (const [x, w] of u.structIterator()) {
      const R = w.getMergedTraits() ?? {}, v = n[x];
      if (v == null && !w.isIdempotencyToken()) {
        if (R.httpLabel && (y.path.includes(`{${x}+}`) || y.path.includes(`{${x}}`))) throw new Error(`No value provided for input HTTP label: ${x}.`);
        continue;
      }
      if (R.httpPayload) w.isStreaming() ? w.isStructSchema() ? n[x] && (m = await this.serializeEventStream({ eventStream: n[x], requestSchema: u })) : m = v : (i.write(w, v), m = i.flush()), delete n[x];
      else if (R.httpLabel) {
        i.write(w, v);
        const I = i.flush();
        y.path.includes(`{${x}+}`) ? y.path = y.path.replace(`{${x}+}`, I.split("/").map(ho).join("/")) : y.path.includes(`{${x}}`) && (y.path = y.path.replace(`{${x}}`, ho(I))), delete n[x];
      } else if (R.httpHeader) i.write(w, v), a[R.httpHeader.toLowerCase()] = String(i.flush()), delete n[x];
      else if (typeof R.httpPrefixHeaders == "string") {
        for (const [I, N] of Object.entries(v)) {
          const q = R.httpPrefixHeaders + I;
          i.write([w.getValueSchema(), { httpHeader: q }], N), a[q.toLowerCase()] = i.flush();
        }
        delete n[x];
      } else R.httpQuery || R.httpQueryParams ? (this.serializeQuery(w, v, o), delete n[x]) : (h = true, p.push(x), l.push(w));
    }
    if (h && n) {
      const [x, w] = (u.getName(true) ?? "#Unknown").split("#"), R = u.getSchema()[6], v = [3, x, w, u.getMergedTraits(), p, l, void 0];
      R ? v[6] = R : v.pop(), i.write(v, n), m = i.flush();
    }
    return y.headers = a, y.query = o, y.body = m, y;
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
      const c = await Mr(s.body, r);
      throw c.byteLength > 0 && Object.assign(o, await n.read(15, c)), await this.handleError(e, r, s, o, this.deserializeMetadata(s)), new Error("@smithy/core/protocols - HTTP Protocol error handler failed to throw.");
    }
    for (const c in s.headers) {
      const u = s.headers[c];
      delete s.headers[c], s.headers[c.toLowerCase()] = u;
    }
    const a = await this.deserializeHttpMessage(i, r, s, o);
    if (a.length) {
      const c = await Mr(s.body, r);
      if (c.byteLength > 0) {
        const u = await n.read(i, c);
        for (const p of a) u[p] != null && (o[p] = u[p]);
      }
    } else a.discardResponseBody && await Mr(s.body, r);
    return o.$metadata = this.deserializeMetadata(s), o;
  }
  async deserializeHttpMessage(e, r, s, n, i) {
    let o;
    n instanceof Set ? o = i : o = n;
    let a = true;
    const c = this.deserializer, u = X.of(e), p = [];
    for (const [l, h] of u.structIterator()) {
      const m = h.getMemberTraits();
      if (m.httpPayload) {
        if (a = false, h.isStreaming()) h.isStructSchema() ? o[l] = await this.deserializeEventStream({ response: s, responseSchema: u }) : o[l] = yc(s.body);
        else if (s.body) {
          const x = await Mr(s.body, r);
          x.byteLength > 0 && (o[l] = await c.read(h, x));
        }
      } else if (m.httpHeader) {
        const y = String(m.httpHeader).toLowerCase(), x = s.headers[y];
        if (x != null) if (h.isListSchema()) {
          const w = h.getValueSchema();
          w.getMergedTraits().httpHeader = y;
          let R;
          w.isTimestampSchema() && w.getSchema() === 4 ? R = Jf(x, ",", 2) : R = Ec(x);
          const v = [];
          for (const I of R) v.push(await c.read(w, I.trim()));
          o[l] = v;
        } else o[l] = await c.read(h, x);
      } else if (m.httpPrefixHeaders !== void 0) {
        o[l] = {};
        for (const [y, x] of Object.entries(s.headers)) if (y.startsWith(m.httpPrefixHeaders)) {
          const w = h.getValueSchema();
          w.getMergedTraits().httpHeader = y, o[l][y.slice(m.httpPrefixHeaders.length)] = await c.read(w, x);
        }
      } else m.httpResponseCode ? o[l] = s.statusCode : p.push(l);
    }
    return p.discardResponseBody = a, p;
  }
}
function pi(t, e) {
  if (e.timestampFormat.useTrait && t.isTimestampSchema() && (t.getSchema() === 5 || t.getSchema() === 6 || t.getSchema() === 7)) return t.getSchema();
  const { httpLabel: r, httpPrefixHeaders: s, httpHeader: n, httpQuery: i } = t.getMergedTraits();
  return (e.httpBindings ? typeof s == "string" || n ? 6 : i || r ? 5 : void 0 : void 0) ?? e.timestampFormat.default;
}
class Cc extends ss {
  constructor(e) {
    super();
    __publicField(this, "settings");
    this.settings = e;
  }
  read(e, r) {
    var _a2;
    const s = X.of(e);
    if (s.isListSchema()) return Ec(r).map((n) => this.read(s.getValueSchema(), n));
    if (s.isBlobSchema()) return (((_a2 = this.serdeContext) == null ? void 0 : _a2.base64Decoder) ?? qt)(r);
    if (s.isTimestampSchema()) switch (pi(s, this.settings)) {
      case 5:
        return Zf(r);
      case 6:
        return Qf(r);
      case 7:
        return Xf(r);
      default:
        return console.warn("Missing timestamp format, parsing value with Date constructor:", r), new Date(r);
    }
    if (s.isStringSchema()) {
      const n = s.getMergedTraits().mediaType;
      let i = r;
      if (n) return s.getMergedTraits().httpHeader && (i = this.base64ToUtf8(i)), (n === "application/json" || n.endsWith("+json")) && (i = ot.from(i)), i;
    }
    return s.isNumericSchema() ? Number(r) : s.isBigIntegerSchema() ? BigInt(r) : s.isBigDecimalSchema() ? new rs(r, "bigDecimal") : s.isBooleanSchema() ? String(r).toLowerCase() === "true" : r;
  }
  base64ToUtf8(e) {
    var _a2, _b2;
    return (((_a2 = this.serdeContext) == null ? void 0 : _a2.utf8Encoder) ?? Bt)((((_b2 = this.serdeContext) == null ? void 0 : _b2.base64Decoder) ?? qt)(e));
  }
}
class th extends ss {
  constructor(e, r) {
    super();
    __publicField(this, "codecDeserializer");
    __publicField(this, "stringDeserializer");
    this.codecDeserializer = e, this.stringDeserializer = new Cc(r);
  }
  setSerdeContext(e) {
    this.stringDeserializer.setSerdeContext(e), this.codecDeserializer.setSerdeContext(e), this.serdeContext = e;
  }
  read(e, r) {
    var _a2, _b2;
    const s = X.of(e), n = s.getMergedTraits(), i = ((_a2 = this.serdeContext) == null ? void 0 : _a2.utf8Encoder) ?? Bt;
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
class rh extends ss {
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
          switch (pi(s, this.settings)) {
            case 5:
              this.stringBuffer = r.toISOString().replace(".000Z", "Z");
              break;
            case 6:
              this.stringBuffer = Ln(r);
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
          this.stringBuffer = (((_a2 = this.serdeContext) == null ? void 0 : _a2.base64Encoder) ?? Ot)(r);
          return;
        }
        if (s.isListSchema() && Array.isArray(r)) {
          let o = "";
          for (const a of r) {
            this.write([s.getValueSchema(), s.getMergedTraits()], a);
            const c = this.flush(), u = s.getValueSchema().isTimestampSchema() ? c : zf(c);
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
          this.stringBuffer = (((_b2 = this.serdeContext) == null ? void 0 : _b2.base64Encoder) ?? Ot)(i.toString());
          return;
        }
        this.stringBuffer = r;
        break;
      default:
        s.isIdempotencyToken() ? this.stringBuffer = di() : this.stringBuffer = String(r);
    }
  }
  flush() {
    const e = this.stringBuffer;
    return this.stringBuffer = "", e;
  }
}
class sh {
  constructor(e, r, s = new rh(r)) {
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
function nh(t, e, r) {
  t.__smithy_context ? t.__smithy_context.features || (t.__smithy_context.features = {}) : t.__smithy_context = { features: {} }, t.__smithy_context.features[e] = r;
}
class ih {
  constructor(e) {
    __publicField(this, "authSchemes", /* @__PURE__ */ new Map());
    for (const [r, s] of Object.entries(e)) s !== void 0 && this.authSchemes.set(r, s);
  }
  getIdentityProvider(e) {
    return this.authSchemes.get(e);
  }
}
const oh = (t) => function(r) {
  return Ac(r) && r.expiration.getTime() - Date.now() < t;
}, ah = 3e5, ch = oh(ah), Ac = (t) => t.expiration !== void 0, uh = (t, e, r) => {
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
}, dh = (t, e, r) => {
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
}, lh = (t) => (t.sigv4aSigningRegionSet = Ht(t.sigv4aSigningRegionSet), t), fh = "X-Amz-Algorithm", hh = "X-Amz-Credential", vc = "X-Amz-Date", ph = "X-Amz-SignedHeaders", mh = "X-Amz-Expires", Rc = "X-Amz-Signature", _c = "X-Amz-Security-Token", Dc = "authorization", kc = vc.toLowerCase(), gh = "date", yh = [Dc, kc, gh], Sh = Rc.toLowerCase(), Hn = "x-amz-content-sha256", bh = _c.toLowerCase(), xh = { authorization: true, "cache-control": true, connection: true, expect: true, from: true, "keep-alive": true, "max-forwards": true, pragma: true, referer: true, te: true, trailer: true, "transfer-encoding": true, upgrade: true, "user-agent": true, "x-amzn-trace-id": true }, wh = /^proxy-/, Eh = /^sec-/, en = "AWS4-HMAC-SHA256", Ch = "AWS4-HMAC-SHA256-PAYLOAD", Ah = "UNSIGNED-PAYLOAD", vh = 50, Tc = "aws4_request", Rh = 3600 * 24 * 7, Pr = {}, tn = [], rn = (t, e, r) => `${t}/${e}/${r}/${Tc}`, _h = async (t, e, r, s, n) => {
  const i = await xo(t, e.secretAccessKey, e.accessKeyId), o = `${r}:${s}:${n}:${Re(i)}:${e.sessionToken}`;
  if (o in Pr) return Pr[o];
  for (tn.push(o); tn.length > vh; ) delete Pr[tn.shift()];
  let a = `AWS4${e.secretAccessKey}`;
  for (const c of [r, s, n, Tc]) a = await xo(t, a, c);
  return Pr[o] = a;
}, xo = (t, e, r) => {
  const s = new t(e);
  return s.update(Gt(r)), s.digest();
}, wo = ({ headers: t }, e, r) => {
  const s = {};
  for (const n of Object.keys(t).sort()) {
    if (t[n] == null) continue;
    const i = n.toLowerCase();
    (i in xh || (e == null ? void 0 : e.has(i)) || wh.test(i) || Eh.test(i)) && (!r || r && !r.has(i)) || (s[i] = t[n].trim().replace(/\s+/g, " "));
  }
  return s;
}, Oc = (t) => typeof ArrayBuffer == "function" && t instanceof ArrayBuffer || Object.prototype.toString.call(t) === "[object ArrayBuffer]", sn = async ({ headers: t, body: e }, r) => {
  for (const s of Object.keys(t)) if (s.toLowerCase() === Hn) return t[s];
  if (e == null) return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  if (typeof e == "string" || ArrayBuffer.isView(e) || Oc(e)) {
    const s = new r();
    return s.update(Gt(e)), Re(await s.digest());
  }
  return Ah;
};
class Dh {
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
        const p = new Uint8Array(9);
        return p[0] = 8, p.set(Th.fromNumber(e.value.valueOf()).bytes, 1), p;
      case "uuid":
        if (!kh.test(e.value)) throw new Error(`Invalid UUID received: ${e.value}`);
        const l = new Uint8Array(17);
        return l[0] = 9, l.set(gc(e.value.replace(/\-/g, "")), 1), l;
    }
  }
}
var Eo;
(function(t) {
  t[t.boolTrue = 0] = "boolTrue", t[t.boolFalse = 1] = "boolFalse", t[t.byte = 2] = "byte", t[t.short = 3] = "short", t[t.integer = 4] = "integer", t[t.long = 5] = "long", t[t.byteArray = 6] = "byteArray", t[t.string = 7] = "string", t[t.timestamp = 8] = "timestamp", t[t.uuid = 9] = "uuid";
})(Eo || (Eo = {}));
const kh = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
let Th = class Bc {
  constructor(e) {
    __publicField(this, "bytes");
    if (this.bytes = e, e.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes");
  }
  static fromNumber(e) {
    if (e > 9223372036854776e3 || e < -9223372036854776e3) throw new Error(`${e} is too large (or, if negative, too small) to represent as an Int64`);
    const r = new Uint8Array(8);
    for (let s = 7, n = Math.abs(Math.round(e)); s > -1 && n > 0; s--, n /= 256) r[s] = n;
    return e < 0 && Co(r), new Bc(r);
  }
  valueOf() {
    const e = this.bytes.slice(0), r = e[0] & 128;
    return r && Co(e), parseInt(Re(e), 16) * (r ? -1 : 1);
  }
  toString() {
    return String(this.valueOf());
  }
};
function Co(t) {
  for (let e = 0; e < 8; e++) t[e] ^= 255;
  for (let e = 7; e > -1 && (t[e]++, t[e] === 0); e--) ;
}
const Oh = (t, e) => {
  t = t.toLowerCase();
  for (const r of Object.keys(e)) if (t === r.toLowerCase()) return true;
  return false;
}, Bh = (t, e = {}) => {
  var _a2, _b2;
  const { headers: r, query: s = {} } = ee.clone(t);
  for (const n of Object.keys(r)) {
    const i = n.toLowerCase();
    (i.slice(0, 6) === "x-amz-" && !((_a2 = e.unhoistableHeaders) == null ? void 0 : _a2.has(i)) || ((_b2 = e.hoistableHeaders) == null ? void 0 : _b2.has(i))) && (s[n] = r[n], delete r[n]);
  }
  return { ...t, headers: r, query: s };
}, Ao = (t) => {
  t = ee.clone(t);
  for (const e of Object.keys(t.headers)) yh.indexOf(e.toLowerCase()) > -1 && delete t.headers[e];
  return t;
}, Ih = ({ query: t = {} }) => {
  const e = [], r = {};
  for (const s of Object.keys(t)) {
    if (s.toLowerCase() === Sh) continue;
    const n = Tt(s);
    e.push(n);
    const i = t[s];
    typeof i == "string" ? r[n] = `${n}=${Tt(i)}` : Array.isArray(i) && (r[n] = i.slice(0).reduce((o, a) => o.concat([`${n}=${Tt(a)}`]), []).sort().join("&"));
  }
  return e.sort().map((s) => r[s]).filter((s) => s).join("&");
}, Mh = (t) => Ph(t).toISOString().replace(/\.\d{3}Z$/, "Z"), Ph = (t) => typeof t == "number" ? new Date(t * 1e3) : typeof t == "string" ? Number(t) ? new Date(Number(t) * 1e3) : new Date(t) : t;
class Nh {
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
${Ih(e)}
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
${Re(o)}`;
  }
  getCanonicalPath({ path: e }) {
    if (this.uriEscapePath) {
      const r = [];
      for (const i of e.split("/")) (i == null ? void 0 : i.length) !== 0 && i !== "." && (i === ".." ? r.pop() : r.push(i));
      const s = `${(e == null ? void 0 : e.startsWith("/")) ? "/" : ""}${r.join("/")}${r.length > 0 && (e == null ? void 0 : e.endsWith("/")) ? "/" : ""}`;
      return Tt(s).replace(/%2F/g, "/");
    }
    return e;
  }
  validateResolvedCredentials(e) {
    if (typeof e != "object" || typeof e.accessKeyId != "string" || typeof e.secretAccessKey != "string") throw new Error("Resolved credential object is not valid");
  }
  formatDate(e) {
    const r = Mh(e).replace(/[\-:]/g, "");
    return { longDate: r, shortDate: r.slice(0, 8) };
  }
  getCanonicalHeaderList(e) {
    return Object.keys(e).sort().join(";");
  }
}
class jn extends Nh {
  constructor({ applyChecksum: e, credentials: r, region: s, service: n, sha256: i, uriEscapePath: o = true }) {
    super({ applyChecksum: e, credentials: r, region: s, service: n, sha256: i, uriEscapePath: o });
    __publicField(this, "headerFormatter", new Dh());
  }
  async presign(e, r = {}) {
    const { signingDate: s = /* @__PURE__ */ new Date(), expiresIn: n = 3600, unsignableHeaders: i, unhoistableHeaders: o, signableHeaders: a, hoistableHeaders: c, signingRegion: u, signingService: p } = r, l = await this.credentialProvider();
    this.validateResolvedCredentials(l);
    const h = u ?? await this.regionProvider(), { longDate: m, shortDate: y } = this.formatDate(s);
    if (n > Rh) return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
    const x = rn(y, h, p ?? this.service), w = Bh(Ao(e), { unhoistableHeaders: o, hoistableHeaders: c });
    l.sessionToken && (w.query[_c] = l.sessionToken), w.query[fh] = en, w.query[hh] = `${l.accessKeyId}/${x}`, w.query[vc] = m, w.query[mh] = n.toString(10);
    const R = wo(w, i, a);
    return w.query[ph] = this.getCanonicalHeaderList(R), w.query[Rc] = await this.getSignature(m, x, this.getSigningKey(l, h, y, p), this.createCanonicalRequest(w, R, await sn(e, this.sha256))), w;
  }
  async sign(e, r) {
    return typeof e == "string" ? this.signString(e, r) : e.headers && e.payload ? this.signEvent(e, r) : e.message ? this.signMessage(e, r) : this.signRequest(e, r);
  }
  async signEvent({ headers: e, payload: r }, { signingDate: s = /* @__PURE__ */ new Date(), priorSignature: n, signingRegion: i, signingService: o }) {
    const a = i ?? await this.regionProvider(), { shortDate: c, longDate: u } = this.formatDate(s), p = rn(c, a, o ?? this.service), l = await sn({ headers: {}, body: r }, this.sha256), h = new this.sha256();
    h.update(e);
    const m = Re(await h.digest()), y = [Ch, u, p, n, m, l].join(`
`);
    return this.signString(y, { signingDate: s, signingRegion: a, signingService: o });
  }
  async signMessage(e, { signingDate: r = /* @__PURE__ */ new Date(), signingRegion: s, signingService: n }) {
    return this.signEvent({ headers: this.headerFormatter.format(e.message.headers), payload: e.message.body }, { signingDate: r, signingRegion: s, signingService: n, priorSignature: e.priorSignature }).then((o) => ({ message: e.message, signature: o }));
  }
  async signString(e, { signingDate: r = /* @__PURE__ */ new Date(), signingRegion: s, signingService: n } = {}) {
    const i = await this.credentialProvider();
    this.validateResolvedCredentials(i);
    const o = s ?? await this.regionProvider(), { shortDate: a } = this.formatDate(r), c = new this.sha256(await this.getSigningKey(i, o, a, n));
    return c.update(Gt(e)), Re(await c.digest());
  }
  async signRequest(e, { signingDate: r = /* @__PURE__ */ new Date(), signableHeaders: s, unsignableHeaders: n, signingRegion: i, signingService: o } = {}) {
    const a = await this.credentialProvider();
    this.validateResolvedCredentials(a);
    const c = i ?? await this.regionProvider(), u = Ao(e), { longDate: p, shortDate: l } = this.formatDate(r), h = rn(l, c, o ?? this.service);
    u.headers[kc] = p, a.sessionToken && (u.headers[bh] = a.sessionToken);
    const m = await sn(u, this.sha256);
    !Oh(Hn, u.headers) && this.applyChecksum && (u.headers[Hn] = m);
    const y = wo(u, n, s), x = await this.getSignature(p, h, this.getSigningKey(a, c, l, o), this.createCanonicalRequest(u, y, m));
    return u.headers[Dc] = `${en} Credential=${a.accessKeyId}/${h}, SignedHeaders=${this.getCanonicalHeaderList(y)}, Signature=${x}`, u;
  }
  async getSignature(e, r, s, n) {
    const i = await this.createStringToSign(e, r, n, en), o = new this.sha256(await s);
    return o.update(Gt(i)), Re(await o.digest());
  }
  getSigningKey(e, r, s, n) {
    return _h(this.sha256, e, s, r, n || this.service);
  }
}
const $h = (t) => {
  let e = t.credentials, r = !!t.credentials, s;
  Object.defineProperty(t, "credentials", { set(u) {
    u && u !== e && u !== s && (r = true), e = u;
    const p = Uh(t, { credentials: e, credentialDefaultProvider: t.credentialDefaultProvider }), l = Fh(t, p);
    if (r && !l.attributed) {
      const h = typeof e == "object" && e !== null;
      s = async (m) => {
        const x = await l(m);
        return h && (!x.$source || Object.keys(x.$source).length === 0) ? Ul(x, "CREDENTIALS_CODE", "e") : x;
      }, s.memoized = l.memoized, s.configBound = l.configBound, s.attributed = true;
    } else s = l;
  }, get() {
    return s;
  }, enumerable: true, configurable: true }), t.credentials = e;
  const { signingEscapePath: n = true, systemClockOffset: i = t.systemClockOffset || 0, sha256: o } = t;
  let a;
  return t.signer ? a = Ht(t.signer) : t.regionInfoProvider ? a = () => Ht(t.region)().then(async (u) => [await t.regionInfoProvider(u, { useFipsEndpoint: await t.useFipsEndpoint(), useDualstackEndpoint: await t.useDualstackEndpoint() }) || {}, u]).then(([u, p]) => {
    const { signingRegion: l, signingService: h } = u;
    t.signingRegion = t.signingRegion || l || p, t.signingName = t.signingName || h || t.serviceId;
    const m = { ...t, credentials: t.credentials, region: t.signingRegion, service: t.signingName, sha256: o, uriEscapePath: n }, y = t.signerConstructor || jn;
    return new y(m);
  }) : a = async (u) => {
    u = Object.assign({}, { name: "sigv4", signingName: t.signingName || t.defaultSigningName, signingRegion: await Ht(t.region)(), properties: {} }, u);
    const p = u.signingRegion, l = u.signingName;
    t.signingRegion = t.signingRegion || p, t.signingName = t.signingName || l || t.serviceId;
    const h = { ...t, credentials: t.credentials, region: t.signingRegion, service: t.signingName, sha256: o, uriEscapePath: n }, m = t.signerConstructor || jn;
    return new m(h);
  }, Object.assign(t, { systemClockOffset: i, signingEscapePath: n, signer: a });
};
function Uh(t, { credentials: e, credentialDefaultProvider: r }) {
  let s;
  return e ? (e == null ? void 0 : e.memoized) ? s = e : s = uh(e, ch, Ac) : r ? s = Ht(r(Object.assign({}, t, { parentClientConfig: t }))) : s = async () => {
    throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.");
  }, s.memoized = true, s;
}
function Fh(t, e) {
  if (e.configBound) return e;
  const r = async (s) => e({ ...s, callerClientConfig: t });
  return r.memoized = e.memoized, r.configBound = true, r;
}
const vo = typeof TextEncoder == "function" ? new TextEncoder() : null, Lh = (t) => {
  if (typeof t == "string") {
    if (vo) return vo.encode(t).byteLength;
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
}, _t = (t, e) => {
  const r = [];
  if (t && r.push(t), e) for (const s of e) r.push(s);
  return r;
}, rt = (t, e) => `${t || "anonymous"}${e && e.length > 0 ? ` (a.k.a. ${e.join(",")})` : ""}`, Vr = () => {
  let t = [], e = [], r = false;
  const s = /* @__PURE__ */ new Set(), n = (l) => l.sort((h, m) => Ro[m.step] - Ro[h.step] || _o[m.priority || "normal"] - _o[h.priority || "normal"]), i = (l) => {
    let h = false;
    const m = (y) => {
      const x = _t(y.name, y.aliases);
      if (x.includes(l)) {
        h = true;
        for (const w of x) s.delete(w);
        return false;
      }
      return true;
    };
    return t = t.filter(m), e = e.filter(m), h;
  }, o = (l) => {
    let h = false;
    const m = (y) => {
      if (y.middleware === l) {
        h = true;
        for (const x of _t(y.name, y.aliases)) s.delete(x);
        return false;
      }
      return true;
    };
    return t = t.filter(m), e = e.filter(m), h;
  }, a = (l) => {
    var _a2;
    return t.forEach((h) => {
      l.add(h.middleware, { ...h });
    }), e.forEach((h) => {
      l.addRelativeTo(h.middleware, { ...h });
    }), (_a2 = l.identifyOnResolve) == null ? void 0 : _a2.call(l, p.identifyOnResolve()), l;
  }, c = (l) => {
    const h = [];
    return l.before.forEach((m) => {
      m.before.length === 0 && m.after.length === 0 ? h.push(m) : h.push(...c(m));
    }), h.push(l), l.after.reverse().forEach((m) => {
      m.before.length === 0 && m.after.length === 0 ? h.push(m) : h.push(...c(m));
    }), h;
  }, u = (l = false) => {
    const h = [], m = [], y = {};
    return t.forEach((w) => {
      const R = { ...w, before: [], after: [] };
      for (const v of _t(R.name, R.aliases)) y[v] = R;
      h.push(R);
    }), e.forEach((w) => {
      const R = { ...w, before: [], after: [] };
      for (const v of _t(R.name, R.aliases)) y[v] = R;
      m.push(R);
    }), m.forEach((w) => {
      if (w.toMiddleware) {
        const R = y[w.toMiddleware];
        if (R === void 0) {
          if (l) return;
          throw new Error(`${w.toMiddleware} is not found when adding ${rt(w.name, w.aliases)} middleware ${w.relation} ${w.toMiddleware}`);
        }
        w.relation === "after" && R.after.push(w), w.relation === "before" && R.before.push(w);
      }
    }), n(h).map(c).reduce((w, R) => (w.push(...R), w), []);
  }, p = { add: (l, h = {}) => {
    const { name: m, override: y, aliases: x } = h, w = { step: "initialize", priority: "normal", middleware: l, ...h }, R = _t(m, x);
    if (R.length > 0) {
      if (R.some((v) => s.has(v))) {
        if (!y) throw new Error(`Duplicate middleware name '${rt(m, x)}'`);
        for (const v of R) {
          const I = t.findIndex((q) => {
            var _a2;
            return q.name === v || ((_a2 = q.aliases) == null ? void 0 : _a2.some((te) => te === v));
          });
          if (I === -1) continue;
          const N = t[I];
          if (N.step !== w.step || w.priority !== N.priority) throw new Error(`"${rt(N.name, N.aliases)}" middleware with ${N.priority} priority in ${N.step} step cannot be overridden by "${rt(m, x)}" middleware with ${w.priority} priority in ${w.step} step.`);
          t.splice(I, 1);
        }
      }
      for (const v of R) s.add(v);
    }
    t.push(w);
  }, addRelativeTo: (l, h) => {
    const { name: m, override: y, aliases: x } = h, w = { middleware: l, ...h }, R = _t(m, x);
    if (R.length > 0) {
      if (R.some((v) => s.has(v))) {
        if (!y) throw new Error(`Duplicate middleware name '${rt(m, x)}'`);
        for (const v of R) {
          const I = e.findIndex((q) => {
            var _a2;
            return q.name === v || ((_a2 = q.aliases) == null ? void 0 : _a2.some((te) => te === v));
          });
          if (I === -1) continue;
          const N = e[I];
          if (N.toMiddleware !== w.toMiddleware || N.relation !== w.relation) throw new Error(`"${rt(N.name, N.aliases)}" middleware ${N.relation} "${N.toMiddleware}" middleware cannot be overridden by "${rt(m, x)}" middleware ${w.relation} "${w.toMiddleware}" middleware.`);
          e.splice(I, 1);
        }
      }
      for (const v of R) s.add(v);
    }
    e.push(w);
  }, clone: () => a(Vr()), use: (l) => {
    l.applyToStack(p);
  }, remove: (l) => typeof l == "string" ? i(l) : o(l), removeByTag: (l) => {
    let h = false;
    const m = (y) => {
      const { tags: x, name: w, aliases: R } = y;
      if (x && x.includes(l)) {
        const v = _t(w, R);
        for (const I of v) s.delete(I);
        return h = true, false;
      }
      return true;
    };
    return t = t.filter(m), e = e.filter(m), h;
  }, concat: (l) => {
    var _a2;
    const h = a(Vr());
    return h.use(l), h.identifyOnResolve(r || h.identifyOnResolve() || (((_a2 = l.identifyOnResolve) == null ? void 0 : _a2.call(l)) ?? false)), h;
  }, applyToStack: a, identify: () => u(true).map((l) => {
    const h = l.step ?? l.relation + " " + l.toMiddleware;
    return rt(l.name, l.aliases) + " - " + h;
  }), identifyOnResolve(l) {
    return typeof l == "boolean" && (r = l), r;
  }, resolve: (l, h) => {
    for (const m of u().map((y) => y.middleware).reverse()) l = m(l, h);
    return r && console.log(p.identify()), l;
  } };
  return p;
}, Ro = { initialize: 5, serialize: 4, build: 3, finalizeRequest: 2, deserialize: 1 }, _o = { high: 3, normal: 2, low: 1 };
class Hh {
  constructor(e) {
    __publicField(this, "config");
    __publicField(this, "middlewareStack", Vr());
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
const nn = "***SensitiveInformation***";
function zn(t, e) {
  if (e == null) return e;
  const r = X.of(t);
  if (r.getMergedTraits().sensitive) return nn;
  if (r.isListSchema()) {
    if (!!r.getValueSchema().getMergedTraits().sensitive) return nn;
  } else if (r.isMapSchema()) {
    if (!!r.getKeySchema().getMergedTraits().sensitive || !!r.getValueSchema().getMergedTraits().sensitive) return nn;
  } else if (r.isStructSchema() && typeof e == "object") {
    const s = e, n = {};
    for (const [i, o] of r.structIterator()) s[i] != null && (n[i] = zn(o, s[i]));
    return n;
  }
  return e;
}
class $e {
  constructor() {
    __publicField(this, "middlewareStack", Vr());
    __publicField(this, "schema");
  }
  static classBuilder() {
    return new jh();
  }
  resolveMiddlewareWithContext(e, r, s, { middlewareFn: n, clientName: i, commandName: o, inputFilterSensitiveLog: a, outputFilterSensitiveLog: c, smithyContext: u, additionalContext: p, CommandCtor: l }) {
    for (const w of n.bind(this)(l, e, r, s)) this.middlewareStack.use(w);
    const h = e.concat(this.middlewareStack), { logger: m } = r, y = { logger: m, clientName: i, commandName: o, inputFilterSensitiveLog: a, outputFilterSensitiveLog: c, [Pn]: { commandInstance: this, ...u }, ...p }, { requestHandler: x } = r;
    return h.resolve((w) => x.handle(w.request, s || {}), y);
  }
}
class jh {
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
        return this.resolveMiddlewareWithContext(s, n, i, { CommandCtor: r, middlewareFn: e._middlewareFn, clientName: e._clientName, commandName: e._commandName, inputFilterSensitiveLog: e._inputFilterSensitiveLog ?? (o ? zn.bind(null, a) : (u) => u), outputFilterSensitiveLog: e._outputFilterSensitiveLog ?? (o ? zn.bind(null, c) : (u) => u), smithyContext: e._smithyContext, additionalContext: e._additionalContext });
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
const Do = (t, e = {}) => {
  Object.entries(e).filter(([, s]) => s !== void 0).forEach(([s, n]) => {
    (t[s] == null || t[s] === "") && (t[s] = n);
  });
  const r = t.message || t.Message || "UnknownError";
  return t.message = r, delete t.Message, t;
}, zh = (t) => {
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
}, Ic = Object.values(gr), Vh = (t) => {
  const e = [];
  for (const r in gr) {
    const s = gr[r];
    t[s] !== void 0 && e.push({ algorithmId: () => s, checksumConstructor: () => t[s] });
  }
  for (const [r, s] of Object.entries(t.checksumAlgorithms ?? {})) e.push({ algorithmId: () => r, checksumConstructor: () => s });
  return { addChecksumAlgorithm(r) {
    t.checksumAlgorithms = t.checksumAlgorithms ?? {};
    const s = r.algorithmId(), n = r.checksumConstructor();
    Ic.includes(s) ? t.checksumAlgorithms[s.toUpperCase()] = n : t.checksumAlgorithms[s] = n, e.push(r);
  }, checksumAlgorithms() {
    return e;
  } };
}, qh = (t) => {
  const e = {};
  return t.checksumAlgorithms().forEach((r) => {
    const s = r.algorithmId();
    Ic.includes(s) && (e[s] = r.checksumConstructor());
  }), e;
}, Gh = (t) => ({ setRetryStrategy(e) {
  t.retryStrategy = e;
}, retryStrategy() {
  return t.retryStrategy;
} }), Kh = (t) => {
  const e = {};
  return e.retryStrategy = t.retryStrategy(), e;
}, Wh = (t) => Object.assign(Vh(t), Gh(t)), Xh = (t) => Object.assign(qh(t), Kh(t)), Mc = (t) => {
  const e = "#text";
  for (const r in t) t.hasOwnProperty(r) && t[r][e] !== void 0 ? t[r] = t[r][e] : typeof t[r] == "object" && t[r] !== null && (t[r] = Mc(t[r]));
  return t;
};
class mi {
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
class Zh {
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
      const { httpQuery: a, httpQueryParams: c, httpHeader: u, httpLabel: p, httpPrefixHeaders: l } = o.getMergedTraits();
      return !a && !c && !u && !p && l === void 0;
    })) return e;
  }
  async getErrorSchemaOrThrowBaseException(e, r, s, n, i, o) {
    let a = r, c = e;
    e.includes("#") && ([a, c] = e.split("#"));
    const u = { $metadata: i, $fault: s.statusCode < 500 ? "client" : "server" }, p = ve.for(a);
    try {
      return { errorSchema: (o == null ? void 0 : o(p, c)) ?? p.getSchema(e), errorMetadata: u };
    } catch {
      n.message = n.message ?? n.Message ?? "UnknownError";
      const h = ve.for("smithy.ts.sdk.synthetic." + a), m = h.getBaseException();
      if (m) {
        const y = h.getErrorCtor(m) ?? Error;
        throw this.decorateServiceException(Object.assign(new y({ name: c }), u), n);
      }
      throw this.decorateServiceException(Object.assign(new Error(c), u), n);
    }
  }
  decorateServiceException(e, r = {}) {
    var _a2, _b2, _c2, _d2;
    if (this.queryCompat) {
      const s = e.Message ?? r.Message, n = Do(e, r);
      s && (n.message = s), n.Error = { ...n.Error, Type: (_a2 = n.Error) == null ? void 0 : _a2.Type, Code: (_b2 = n.Error) == null ? void 0 : _b2.Code, Message: ((_c2 = n.Error) == null ? void 0 : _c2.message) ?? ((_d2 = n.Error) == null ? void 0 : _d2.Message) ?? s };
      const i = n.$metadata.requestId;
      return i && (n.RequestId = i), n;
    }
    return Do(e, r);
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
class gi {
  constructor() {
    __publicField(this, "serdeContext");
  }
  setSerdeContext(e) {
    this.serdeContext = e;
  }
}
class Qh {
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
function Jh(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Yh(t) {
  return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#x0D;").replace(/\n/g, "&#x0A;").replace(/\u0085/g, "&#x85;").replace(/\u2028/, "&#x2028;");
}
class Vn {
  constructor(e) {
    __publicField(this, "value");
    this.value = e;
  }
  toString() {
    return Yh("" + this.value);
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
    return r !== void 0 && n.addChildNode(new Vn(r)), s !== void 0 && n.withName(s), n;
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
      i != null && (r += ` ${n}="${Jh("" + i)}"`);
    }
    return r += e ? `>${this.children.map((n) => n.toString()).join("")}</${this.name}>` : "/>";
  }
}
let on;
function ep(t) {
  on || (on = new DOMParser());
  const e = on.parseFromString(t, "application/xml");
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
          const p = c.nodeName;
          if (a.length === 1 && o.length === 0 && p === "#text") return u;
          i[p] ? Array.isArray(i[p]) ? i[p].push(u) : i[p] = [i[p], u] : i[p] = u;
        } else if (a.length === 1 && o.length === 0) return n.textContent;
      }
      return i;
    }
    return null;
  };
  return { [e.documentElement.nodeName]: r(e.documentElement) };
}
class tp extends gi {
  constructor(e) {
    super();
    __publicField(this, "settings");
    __publicField(this, "stringDeserializer");
    this.settings = e, this.stringDeserializer = new Cc(e);
  }
  setSerdeContext(e) {
    this.serdeContext = e, this.stringDeserializer.setSerdeContext(e);
  }
  read(e, r, s) {
    var _a2;
    const n = X.of(e), i = n.getMemberSchemas();
    if (n.isStructSchema() && n.isMemberSchema() && !!Object.values(i).find((u) => !!u.getMemberTraits().eventPayload)) {
      const u = {}, p = Object.keys(i)[0];
      return i[p].isBlobSchema() ? u[p] = r : u[p] = this.read(i[p], r), u;
    }
    const a = (((_a2 = this.serdeContext) == null ? void 0 : _a2.utf8Encoder) ?? Bt)(r), c = this.parseXml(a);
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
        const c = s.getValueSchema(), u = [], p = c.getMergedTraits().xmlName ?? "member", l = o ? r : (r[0] ?? r)[p], h = Array.isArray(l) ? l : [l];
        for (const m of h) (m != null || i) && u.push(this.readSchema(c, m));
        return u;
      }
      const a = {};
      if (s.isMapSchema()) {
        const c = s.getKeySchema(), u = s.getValueSchema();
        let p;
        o ? p = Array.isArray(r) ? r : [r] : p = Array.isArray(r.entry) ? r.entry : [r.entry];
        const l = c.getMergedTraits().xmlName ?? "key", h = u.getMergedTraits().xmlName ?? "value";
        for (const m of p) {
          const y = m[l], x = m[h];
          (x != null || i) && (a[y] = this.readSchema(u, x));
        }
        return a;
      }
      if (s.isStructSchema()) {
        const c = s.isUnionSchema();
        let u;
        c && (u = new Qh(r, a));
        for (const [p, l] of s.structIterator()) {
          const h = l.getMergedTraits(), m = h.httpPayload ? h.xmlName ?? l.getName() : l.getMemberTraits().xmlName ?? p;
          c && u.mark(m), r[m] != null && (a[p] = this.readSchema(l, r[m]));
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
        r = ep(e);
      } catch (o) {
        throw o && typeof o == "object" && Object.defineProperty(o, "$responseBodyText", { value: e }), o;
      }
      const s = "#text", n = Object.keys(r)[0], i = r[n];
      return i[s] && (i[n] = i[s], delete i[s]), Mc(i);
    }
    return {};
  }
}
const rp = (t, e) => {
  var _a2;
  if (((_a2 = e == null ? void 0 : e.Error) == null ? void 0 : _a2.Code) !== void 0) return e.Error.Code;
  if ((e == null ? void 0 : e.Code) !== void 0) return e.Code;
  if (t.statusCode == 404) return "NotFound";
};
class sp extends gi {
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
    for (const [p, l] of e.structIterator()) {
      const h = r[p];
      if (h != null || l.isIdempotencyToken()) {
        if (l.getMergedTraits().xmlAttribute) {
          o.addAttribute(l.getMergedTraits().xmlName ?? p, this.writeSimple(l, h));
          continue;
        }
        if (l.isListSchema()) this.writeList(l, h, o, c);
        else if (l.isMapSchema()) this.writeMap(l, h, o, c);
        else if (l.isStructSchema()) o.addChildNode(this.writeStruct(l, h, c));
        else {
          const m = Ee.of(l.getMergedTraits().xmlName ?? l.getMemberName());
          this.writeSimpleInto(l, h, m, c), o.addChildNode(m);
        }
      }
    }
    const { $unknown: u } = r;
    if (u && e.isUnionSchema() && Array.isArray(u) && Object.keys(r).length === 1) {
      const [p, l] = u, h = Ee.of(p);
      if (typeof l != "string") if (r instanceof Ee || r instanceof Vn) o.addChildNode(r);
      else throw new Error("@aws-sdk - $unknown union member in XML requires value of type string, @aws-sdk/xml-builder::XmlNode or XmlText.");
      this.writeSimpleInto(0, l, h, c), o.addChildNode(h);
    }
    return c && o.addAttribute(a, c), o;
  }
  writeList(e, r, s, n) {
    if (!e.isMemberSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member list: ${e.getName(true)}`);
    const i = e.getMergedTraits(), o = e.getValueSchema(), a = o.getMergedTraits(), c = !!a.sparse, u = !!i.xmlFlattened, [p, l] = this.getXmlnsAttribute(e, n), h = (m, y) => {
      if (o.isListSchema()) this.writeList(o, Array.isArray(y) ? y : [y], m, l);
      else if (o.isMapSchema()) this.writeMap(o, y, m, l);
      else if (o.isStructSchema()) {
        const x = this.writeStruct(o, y, l);
        m.addChildNode(x.withName(u ? i.xmlName ?? e.getMemberName() : a.xmlName ?? "member"));
      } else {
        const x = Ee.of(u ? i.xmlName ?? e.getMemberName() : a.xmlName ?? "member");
        this.writeSimpleInto(o, y, x, l), m.addChildNode(x);
      }
    };
    if (u) for (const m of r) (c || m != null) && h(s, m);
    else {
      const m = Ee.of(i.xmlName ?? e.getMemberName());
      l && m.addAttribute(p, l);
      for (const y of r) (c || y != null) && h(m, y);
      s.addChildNode(m);
    }
  }
  writeMap(e, r, s, n, i = false) {
    if (!e.isMemberSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member map: ${e.getName(true)}`);
    const o = e.getMergedTraits(), a = e.getKeySchema(), u = a.getMergedTraits().xmlName ?? "key", p = e.getValueSchema(), l = p.getMergedTraits(), h = l.xmlName ?? "value", m = !!l.sparse, y = !!o.xmlFlattened, [x, w] = this.getXmlnsAttribute(e, n), R = (v, I, N) => {
      const q = Ee.of(u, I), [te, ro] = this.getXmlnsAttribute(a, w);
      ro && q.addAttribute(te, ro), v.addChildNode(q);
      let rr = Ee.of(h);
      p.isListSchema() ? this.writeList(p, N, rr, w) : p.isMapSchema() ? this.writeMap(p, N, rr, w, true) : p.isStructSchema() ? rr = this.writeStruct(p, N, w) : this.writeSimpleInto(p, N, rr, w), v.addChildNode(rr);
    };
    if (y) {
      for (const [v, I] of Object.entries(r)) if (m || I != null) {
        const N = Ee.of(o.xmlName ?? e.getMemberName());
        R(N, v, I), s.addChildNode(N);
      }
    } else {
      let v;
      i || (v = Ee.of(o.xmlName ?? e.getMemberName()), w && v.addAttribute(x, w), s.addChildNode(v));
      for (const [I, N] of Object.entries(r)) if (m || N != null) {
        const q = Ee.of("entry");
        R(q, I, N), (i ? s : v).addChildNode(q);
      }
    }
  }
  writeSimple(e, r) {
    var _a2;
    if (r === null) throw new Error("@aws-sdk/core/protocols - (XML serializer) cannot write null value.");
    const s = X.of(e);
    let n = null;
    if (r && typeof r == "object") if (s.isBlobSchema()) n = (((_a2 = this.serdeContext) == null ? void 0 : _a2.base64Encoder) ?? Ot)(r);
    else if (s.isTimestampSchema() && r instanceof Date) switch (pi(s, this.settings)) {
      case 5:
        n = r.toISOString().replace(".000Z", "Z");
        break;
      case 6:
        n = Ln(r);
        break;
      case 7:
        n = String(r.getTime() / 1e3);
        break;
      default:
        console.warn("Missing timestamp format, using http date", r), n = Ln(r);
        break;
    }
    else {
      if (s.isBigDecimalSchema() && r) return r instanceof rs ? r.string : String(r);
      throw s.isMapSchema() || s.isListSchema() ? new Error("@aws-sdk/core/protocols - xml serializer, cannot call _write() on List/Map schema, call writeList or writeMap() instead.") : new Error(`@aws-sdk/core/protocols - xml serializer, unhandled schema type for object value and schema: ${s.getName(true)}`);
    }
    if ((s.isBooleanSchema() || s.isNumericSchema() || s.isBigIntegerSchema() || s.isBigDecimalSchema()) && (n = String(r)), s.isStringSchema() && (r === void 0 && s.isIdempotencyToken() ? n = di() : n = String(r)), n === null) throw new Error(`Unhandled schema-value pair ${s.getName(true)}=${r}`);
    return n;
  }
  writeSimpleInto(e, r, s, n) {
    const i = this.writeSimple(e, r), o = X.of(e), a = new Vn(i), [c, u] = this.getXmlnsAttribute(o, n);
    u && s.addAttribute(c, u), s.addChildNode(a);
  }
  getXmlnsAttribute(e, r) {
    const s = e.getMergedTraits(), [n, i] = s.xmlNamespace ?? [];
    return i && i !== r ? [n ? `xmlns:${n}` : "xmlns", i] : [void 0, void 0];
  }
}
class np extends gi {
  constructor(e) {
    super();
    __publicField(this, "settings");
    this.settings = e;
  }
  createSerializer() {
    const e = new sp(this.settings);
    return e.setSerdeContext(this.serdeContext), e;
  }
  createDeserializer() {
    const e = new tp(this.settings);
    return e.setSerdeContext(this.serdeContext), e;
  }
}
class ip extends eh {
  constructor(e) {
    super(e);
    __publicField(this, "codec");
    __publicField(this, "serializer");
    __publicField(this, "deserializer");
    __publicField(this, "mixin", new Zh());
    const r = { timestampFormat: { useTrait: true, default: 5 }, httpBindings: true, xmlNamespace: e.xmlNamespace, serviceNamespace: e.defaultNamespace };
    this.codec = new np(r), this.serializer = new sh(this.codec.createSerializer(), r), this.deserializer = new th(this.codec.createDeserializer(), r);
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
    const o = rp(s, n) ?? "Unknown";
    if (n.Error && typeof n.Error == "object") for (const y of Object.keys(n.Error)) n[y] = n.Error[y], y.toLowerCase() === "message" && (n.message = n.Error[y]);
    n.RequestId && !i.requestId && (i.requestId = n.RequestId);
    const { errorSchema: a, errorMetadata: c } = await this.mixin.getErrorSchemaOrThrowBaseException(o, this.options.defaultNamespace, s, n, i), u = X.of(a), p = ((_a2 = n.Error) == null ? void 0 : _a2.message) ?? ((_b2 = n.Error) == null ? void 0 : _b2.Message) ?? n.message ?? n.Message ?? "Unknown", l = ve.for(a[1]).getErrorCtor(a) ?? Error, h = new l(p);
    await this.deserializeHttpMessage(a, r, s, n);
    const m = {};
    for (const [y, x] of u.structIterator()) {
      const w = x.getMergedTraits().xmlName ?? y, R = ((_c2 = n.Error) == null ? void 0 : _c2[w]) ?? n[w];
      m[y] = this.codec.createDeserializer().readSchema(x, R);
    }
    throw this.mixin.decorateServiceException(Object.assign(h, c, { $fault: u.getMergedTraits().error, message: p }, m), n);
  }
  getDefaultContentType() {
    return "application/xml";
  }
  hasUnstructuredPayloadBinding(e) {
    for (const [, r] of e.structIterator()) if (r.getMergedTraits().httpPayload) return !(r.isStructSchema() || r.isMapSchema() || r.isListSchema());
    return false;
  }
}
const op = (t, { requestChecksumRequired: e, requestAlgorithmMember: r, requestChecksumCalculation: s }) => r ? t[r] ? t[r] : void 0 : s === Vt.WHEN_SUPPORTED || e ? Nn : void 0, yi = (t) => t === K.MD5 ? "content-md5" : `x-amz-checksum-${t.toLowerCase()}`, ap = (t, e) => {
  const r = t.toLowerCase();
  for (const s of Object.keys(e)) if (r === s.toLowerCase()) return true;
  return false;
}, cp = (t, e) => {
  const r = t.toLowerCase();
  for (const s of Object.keys(e)) if (s.toLowerCase().startsWith(r)) return true;
  return false;
}, Pc = (t) => t !== void 0 && typeof t != "string" && !ArrayBuffer.isView(t) && !Oc(t);
var qn = function(t, e) {
  return qn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, s) {
    r.__proto__ = s;
  } || function(r, s) {
    for (var n in s) Object.prototype.hasOwnProperty.call(s, n) && (r[n] = s[n]);
  }, qn(t, e);
};
function Nc(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  qn(t, e);
  function r() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
var qr = function() {
  return qr = Object.assign || function(e) {
    for (var r, s = 1, n = arguments.length; s < n; s++) {
      r = arguments[s];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (e[i] = r[i]);
    }
    return e;
  }, qr.apply(this, arguments);
};
function $c(t, e) {
  var r = {};
  for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && e.indexOf(s) < 0 && (r[s] = t[s]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function") for (var n = 0, s = Object.getOwnPropertySymbols(t); n < s.length; n++) e.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(t, s[n]) && (r[s[n]] = t[s[n]]);
  return r;
}
function Uc(t, e, r, s) {
  var n = arguments.length, i = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, r) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(t, e, r, s);
  else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (i = (n < 3 ? o(i) : n > 3 ? o(e, r, i) : o(e, r)) || i);
  return n > 3 && i && Object.defineProperty(e, r, i), i;
}
function Fc(t, e) {
  return function(r, s) {
    e(r, s, t);
  };
}
function Lc(t, e, r, s, n, i) {
  function o(R) {
    if (R !== void 0 && typeof R != "function") throw new TypeError("Function expected");
    return R;
  }
  for (var a = s.kind, c = a === "getter" ? "get" : a === "setter" ? "set" : "value", u = !e && t ? s.static ? t : t.prototype : null, p = e || (u ? Object.getOwnPropertyDescriptor(u, s.name) : {}), l, h = false, m = r.length - 1; m >= 0; m--) {
    var y = {};
    for (var x in s) y[x] = x === "access" ? {} : s[x];
    for (var x in s.access) y.access[x] = s.access[x];
    y.addInitializer = function(R) {
      if (h) throw new TypeError("Cannot add initializers after decoration has completed");
      i.push(o(R || null));
    };
    var w = (0, r[m])(a === "accessor" ? { get: p.get, set: p.set } : p[c], y);
    if (a === "accessor") {
      if (w === void 0) continue;
      if (w === null || typeof w != "object") throw new TypeError("Object expected");
      (l = o(w.get)) && (p.get = l), (l = o(w.set)) && (p.set = l), (l = o(w.init)) && n.unshift(l);
    } else (l = o(w)) && (a === "field" ? n.unshift(l) : p[c] = l);
  }
  u && Object.defineProperty(u, s.name, p), h = true;
}
function Hc(t, e, r) {
  for (var s = arguments.length > 2, n = 0; n < e.length; n++) r = s ? e[n].call(t, r) : e[n].call(t);
  return s ? r : void 0;
}
function jc(t) {
  return typeof t == "symbol" ? t : "".concat(t);
}
function zc(t, e, r) {
  return typeof e == "symbol" && (e = e.description ? "[".concat(e.description, "]") : ""), Object.defineProperty(t, "name", { configurable: true, value: r ? "".concat(r, " ", e) : e });
}
function Vc(t, e) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function") return Reflect.metadata(t, e);
}
function xr(t, e, r, s) {
  function n(i) {
    return i instanceof r ? i : new r(function(o) {
      o(i);
    });
  }
  return new (r || (r = Promise))(function(i, o) {
    function a(p) {
      try {
        u(s.next(p));
      } catch (l) {
        o(l);
      }
    }
    function c(p) {
      try {
        u(s.throw(p));
      } catch (l) {
        o(l);
      }
    }
    function u(p) {
      p.done ? i(p.value) : n(p.value).then(a, c);
    }
    u((s = s.apply(t, e || [])).next());
  });
}
function wr(t, e) {
  var r = { label: 0, sent: function() {
    if (i[0] & 1) throw i[1];
    return i[1];
  }, trys: [], ops: [] }, s, n, i, o = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return o.next = a(0), o.throw = a(1), o.return = a(2), typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function a(u) {
    return function(p) {
      return c([u, p]);
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
    } catch (p) {
      u = [6, p], n = 0;
    } finally {
      s = i = 0;
    }
    if (u[0] & 5) throw u[1];
    return { value: u[0] ? u[1] : void 0, done: true };
  }
}
var ns = Object.create ? (function(t, e, r, s) {
  s === void 0 && (s = r);
  var n = Object.getOwnPropertyDescriptor(e, r);
  (!n || ("get" in n ? !e.__esModule : n.writable || n.configurable)) && (n = { enumerable: true, get: function() {
    return e[r];
  } }), Object.defineProperty(t, s, n);
}) : (function(t, e, r, s) {
  s === void 0 && (s = r), t[s] = e[r];
});
function qc(t, e) {
  for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && ns(e, t, r);
}
function Kt(t) {
  var e = typeof Symbol == "function" && Symbol.iterator, r = e && t[e], s = 0;
  if (r) return r.call(t);
  if (t && typeof t.length == "number") return { next: function() {
    return t && s >= t.length && (t = void 0), { value: t && t[s++], done: !t };
  } };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Si(t, e) {
  var r = typeof Symbol == "function" && t[Symbol.iterator];
  if (!r) return t;
  var s = r.call(t), n, i = [], o;
  try {
    for (; (e === void 0 || e-- > 0) && !(n = s.next()).done; ) i.push(n.value);
  } catch (a) {
    o = { error: a };
  } finally {
    try {
      n && !n.done && (r = s.return) && r.call(s);
    } finally {
      if (o) throw o.error;
    }
  }
  return i;
}
function Gc() {
  for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(Si(arguments[e]));
  return t;
}
function Kc() {
  for (var t = 0, e = 0, r = arguments.length; e < r; e++) t += arguments[e].length;
  for (var s = Array(t), n = 0, e = 0; e < r; e++) for (var i = arguments[e], o = 0, a = i.length; o < a; o++, n++) s[n] = i[o];
  return s;
}
function Wc(t, e, r) {
  if (r || arguments.length === 2) for (var s = 0, n = e.length, i; s < n; s++) (i || !(s in e)) && (i || (i = Array.prototype.slice.call(e, 0, s)), i[s] = e[s]);
  return t.concat(i || Array.prototype.slice.call(e));
}
function Wt(t) {
  return this instanceof Wt ? (this.v = t, this) : new Wt(t);
}
function Xc(t, e, r) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var s = r.apply(t, e || []), n, i = [];
  return n = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), a("next"), a("throw"), a("return", o), n[Symbol.asyncIterator] = function() {
    return this;
  }, n;
  function o(m) {
    return function(y) {
      return Promise.resolve(y).then(m, l);
    };
  }
  function a(m, y) {
    s[m] && (n[m] = function(x) {
      return new Promise(function(w, R) {
        i.push([m, x, w, R]) > 1 || c(m, x);
      });
    }, y && (n[m] = y(n[m])));
  }
  function c(m, y) {
    try {
      u(s[m](y));
    } catch (x) {
      h(i[0][3], x);
    }
  }
  function u(m) {
    m.value instanceof Wt ? Promise.resolve(m.value.v).then(p, l) : h(i[0][2], m);
  }
  function p(m) {
    c("next", m);
  }
  function l(m) {
    c("throw", m);
  }
  function h(m, y) {
    m(y), i.shift(), i.length && c(i[0][0], i[0][1]);
  }
}
function Zc(t) {
  var e, r;
  return e = {}, s("next"), s("throw", function(n) {
    throw n;
  }), s("return"), e[Symbol.iterator] = function() {
    return this;
  }, e;
  function s(n, i) {
    e[n] = t[n] ? function(o) {
      return (r = !r) ? { value: Wt(t[n](o)), done: false } : i ? i(o) : o;
    } : i;
  }
}
function Qc(t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = t[Symbol.asyncIterator], r;
  return e ? e.call(t) : (t = typeof Kt == "function" ? Kt(t) : t[Symbol.iterator](), r = {}, s("next"), s("throw"), s("return"), r[Symbol.asyncIterator] = function() {
    return this;
  }, r);
  function s(i) {
    r[i] = t[i] && function(o) {
      return new Promise(function(a, c) {
        o = t[i](o), n(a, c, o.done, o.value);
      });
    };
  }
  function n(i, o, a, c) {
    Promise.resolve(c).then(function(u) {
      i({ value: u, done: a });
    }, o);
  }
}
function Jc(t, e) {
  return Object.defineProperty ? Object.defineProperty(t, "raw", { value: e }) : t.raw = e, t;
}
var up = Object.create ? (function(t, e) {
  Object.defineProperty(t, "default", { enumerable: true, value: e });
}) : function(t, e) {
  t.default = e;
}, Gn = function(t) {
  return Gn = Object.getOwnPropertyNames || function(e) {
    var r = [];
    for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (r[r.length] = s);
    return r;
  }, Gn(t);
};
function Yc(t) {
  if (t && t.__esModule) return t;
  var e = {};
  if (t != null) for (var r = Gn(t), s = 0; s < r.length; s++) r[s] !== "default" && ns(e, t, r[s]);
  return up(e, t), e;
}
function eu(t) {
  return t && t.__esModule ? t : { default: t };
}
function tu(t, e, r, s) {
  if (r === "a" && !s) throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return r === "m" ? s : r === "a" ? s.call(t) : s ? s.value : e.get(t);
}
function ru(t, e, r, s, n) {
  if (s === "m") throw new TypeError("Private method is not writable");
  if (s === "a" && !n) throw new TypeError("Private accessor was defined without a setter");
  if (typeof e == "function" ? t !== e || !n : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return s === "a" ? n.call(t, r) : n ? n.value = r : e.set(t, r), r;
}
function su(t, e) {
  if (e === null || typeof e != "object" && typeof e != "function") throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof t == "function" ? e === t : t.has(e);
}
function nu(t, e, r) {
  if (e != null) {
    if (typeof e != "object" && typeof e != "function") throw new TypeError("Object expected.");
    var s, n;
    if (r) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      s = e[Symbol.asyncDispose];
    }
    if (s === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      s = e[Symbol.dispose], r && (n = s);
    }
    if (typeof s != "function") throw new TypeError("Object not disposable.");
    n && (s = function() {
      try {
        n.call(this);
      } catch (i) {
        return Promise.reject(i);
      }
    }), t.stack.push({ value: e, dispose: s, async: r });
  } else r && t.stack.push({ async: true });
  return e;
}
var dp = typeof SuppressedError == "function" ? SuppressedError : function(t, e, r) {
  var s = new Error(r);
  return s.name = "SuppressedError", s.error = t, s.suppressed = e, s;
};
function iu(t) {
  function e(i) {
    t.error = t.hasError ? new dp(i, t.error, "An error was suppressed during disposal.") : i, t.hasError = true;
  }
  var r, s = 0;
  function n() {
    for (; r = t.stack.pop(); ) try {
      if (!r.async && s === 1) return s = 0, t.stack.push(r), Promise.resolve().then(n);
      if (r.dispose) {
        var i = r.dispose.call(r.value);
        if (r.async) return s |= 2, Promise.resolve(i).then(n, function(o) {
          return e(o), n();
        });
      } else s |= 1;
    } catch (o) {
      e(o);
    }
    if (s === 1) return t.hasError ? Promise.reject(t.error) : Promise.resolve();
    if (t.hasError) throw t.error;
  }
  return n();
}
function ou(t, e) {
  return typeof t == "string" && /^\.\.?\//.test(t) ? t.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(r, s, n, i, o) {
    return s ? e ? ".jsx" : ".js" : n && (!i || !o) ? r : n + i + "." + o.toLowerCase() + "js";
  }) : t;
}
const lp = { __extends: Nc, __assign: qr, __rest: $c, __decorate: Uc, __param: Fc, __esDecorate: Lc, __runInitializers: Hc, __propKey: jc, __setFunctionName: zc, __metadata: Vc, __awaiter: xr, __generator: wr, __createBinding: ns, __exportStar: qc, __values: Kt, __read: Si, __spread: Gc, __spreadArrays: Kc, __spreadArray: Wc, __await: Wt, __asyncGenerator: Xc, __asyncDelegator: Zc, __asyncValues: Qc, __makeTemplateObject: Jc, __importStar: Yc, __importDefault: eu, __classPrivateFieldGet: tu, __classPrivateFieldSet: ru, __classPrivateFieldIn: su, __addDisposableResource: nu, __disposeResources: iu, __rewriteRelativeImportExtension: ou }, ww = Object.freeze(Object.defineProperty({ __proto__: null, __addDisposableResource: nu, get __assign() {
  return qr;
}, __asyncDelegator: Zc, __asyncGenerator: Xc, __asyncValues: Qc, __await: Wt, __awaiter: xr, __classPrivateFieldGet: tu, __classPrivateFieldIn: su, __classPrivateFieldSet: ru, __createBinding: ns, __decorate: Uc, __disposeResources: iu, __esDecorate: Lc, __exportStar: qc, __extends: Nc, __generator: wr, __importDefault: eu, __importStar: Yc, __makeTemplateObject: Jc, __metadata: Vc, __param: Fc, __propKey: jc, __read: Si, __rest: $c, __rewriteRelativeImportExtension: ou, __runInitializers: Hc, __setFunctionName: zc, __spread: Gc, __spreadArray: Wc, __spreadArrays: Kc, __values: Kt, default: lp }, Symbol.toStringTag, { value: "Module" })), fp = (t) => new TextEncoder().encode(t);
var hp = typeof Buffer < "u" && Buffer.from ? function(t) {
  return Buffer.from(t, "utf8");
} : fp;
function ut(t) {
  return t instanceof Uint8Array ? t : typeof t == "string" ? hp(t) : ArrayBuffer.isView(t) ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(t);
}
function yr(t) {
  return typeof t == "string" ? t.length === 0 : t.byteLength === 0;
}
function au(t) {
  return new Uint8Array([(t & 4278190080) >> 24, (t & 16711680) >> 16, (t & 65280) >> 8, t & 255]);
}
function cu(t) {
  if (!Uint32Array.from) {
    for (var e = new Uint32Array(t.length), r = 0; r < t.length; ) e[r] = t[r], r += 1;
    return e;
  }
  return Uint32Array.from(t);
}
var pp = (function() {
  function t() {
    this.crc32c = new ko();
  }
  return t.prototype.update = function(e) {
    yr(e) || this.crc32c.update(ut(e));
  }, t.prototype.digest = function() {
    return xr(this, void 0, void 0, function() {
      return wr(this, function(e) {
        return [2, au(this.crc32c.digest())];
      });
    });
  }, t.prototype.reset = function() {
    this.crc32c = new ko();
  }, t;
})(), ko = (function() {
  function t() {
    this.checksum = 4294967295;
  }
  return t.prototype.update = function(e) {
    var r, s;
    try {
      for (var n = Kt(e), i = n.next(); !i.done; i = n.next()) {
        var o = i.value;
        this.checksum = this.checksum >>> 8 ^ gp[(this.checksum ^ o) & 255];
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
})(), mp = [0, 4067132163, 3778769143, 324072436, 3348797215, 904991772, 648144872, 3570033899, 2329499855, 2024987596, 1809983544, 2575936315, 1296289744, 3207089363, 2893594407, 1578318884, 274646895, 3795141740, 4049975192, 51262619, 3619967088, 632279923, 922689671, 3298075524, 2592579488, 1760304291, 2075979607, 2312596564, 1562183871, 2943781820, 3156637768, 1313733451, 549293790, 3537243613, 3246849577, 871202090, 3878099393, 357341890, 102525238, 4101499445, 2858735121, 1477399826, 1264559846, 3107202533, 1845379342, 2677391885, 2361733625, 2125378298, 820201905, 3263744690, 3520608582, 598981189, 4151959214, 85089709, 373468761, 3827903834, 3124367742, 1213305469, 1526817161, 2842354314, 2107672161, 2412447074, 2627466902, 1861252501, 1098587580, 3004210879, 2688576843, 1378610760, 2262928035, 1955203488, 1742404180, 2511436119, 3416409459, 969524848, 714683780, 3639785095, 205050476, 4266873199, 3976438427, 526918040, 1361435347, 2739821008, 2954799652, 1114974503, 2529119692, 1691668175, 2005155131, 2247081528, 3690758684, 697762079, 986182379, 3366744552, 476452099, 3993867776, 4250756596, 255256311, 1640403810, 2477592673, 2164122517, 1922457750, 2791048317, 1412925310, 1197962378, 3037525897, 3944729517, 427051182, 170179418, 4165941337, 746937522, 3740196785, 3451792453, 1070968646, 1905808397, 2213795598, 2426610938, 1657317369, 3053634322, 1147748369, 1463399397, 2773627110, 4215344322, 153784257, 444234805, 3893493558, 1021025245, 3467647198, 3722505002, 797665321, 2197175160, 1889384571, 1674398607, 2443626636, 1164749927, 3070701412, 2757221520, 1446797203, 137323447, 4198817972, 3910406976, 461344835, 3484808360, 1037989803, 781091935, 3705997148, 2460548119, 1623424788, 1939049696, 2180517859, 1429367560, 2807687179, 3020495871, 1180866812, 410100952, 3927582683, 4182430767, 186734380, 3756733383, 763408580, 1053836080, 3434856499, 2722870694, 1344288421, 1131464017, 2971354706, 1708204729, 2545590714, 2229949006, 1988219213, 680717673, 3673779818, 3383336350, 1002577565, 4010310262, 493091189, 238226049, 4233660802, 2987750089, 1082061258, 1395524158, 2705686845, 1972364758, 2279892693, 2494862625, 1725896226, 952904198, 3399985413, 3656866545, 731699698, 4283874585, 222117402, 510512622, 3959836397, 3280807620, 837199303, 582374963, 3504198960, 68661723, 4135334616, 3844915500, 390545967, 1230274059, 3141532936, 2825850620, 1510247935, 2395924756, 2091215383, 1878366691, 2644384480, 3553878443, 565732008, 854102364, 3229815391, 340358836, 3861050807, 4117890627, 119113024, 1493875044, 2875275879, 3090270611, 1247431312, 2660249211, 1828433272, 2141937292, 2378227087, 3811616794, 291187481, 34330861, 4032846830, 615137029, 3603020806, 3314634738, 939183345, 1776939221, 2609017814, 2295496738, 2058945313, 2926798794, 1545135305, 1330124605, 3173225534, 4084100981, 17165430, 307568514, 3762199681, 888469610, 3332340585, 3587147933, 665062302, 2042050490, 2346497209, 2559330125, 1793573966, 3190661285, 1279665062, 1595330642, 2910671697], gp = cu(mp);
const yp = () => {
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
let an, or, Kn, Wn, Xn, Zn, Qn, Jn, Yn;
const Sp = () => {
  an || (an = yp(), [or, Kn, Wn, Xn, Zn, Qn, Jn, Yn] = an);
};
class bp {
  constructor() {
    __publicField(this, "c1", 0);
    __publicField(this, "c2", 0);
    Sp(), this.reset();
  }
  update(e) {
    const r = e.length;
    let s = 0, n = this.c1, i = this.c2;
    for (; s + 8 <= r; ) {
      const o = ((i ^ e[s++]) & 255) << 1, a = ((i >>> 8 ^ e[s++]) & 255) << 1, c = ((i >>> 16 ^ e[s++]) & 255) << 1, u = ((i >>> 24 ^ e[s++]) & 255) << 1, p = ((n ^ e[s++]) & 255) << 1, l = ((n >>> 8 ^ e[s++]) & 255) << 1, h = ((n >>> 16 ^ e[s++]) & 255) << 1, m = ((n >>> 24 ^ e[s++]) & 255) << 1;
      n = Yn[o] ^ Jn[a] ^ Qn[c] ^ Zn[u] ^ Xn[p] ^ Wn[l] ^ Kn[h] ^ or[m], i = Yn[o + 1] ^ Jn[a + 1] ^ Qn[c + 1] ^ Zn[u + 1] ^ Xn[p + 1] ^ Wn[l + 1] ^ Kn[h + 1] ^ or[m + 1];
    }
    for (; s < r; ) {
      const o = ((i ^ e[s]) & 255) << 1;
      i = (i >>> 8 | (n & 255) << 24) >>> 0, n = n >>> 8 ^ or[o], i ^= or[o + 1], s++;
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
var xp = (function() {
  function t() {
    this.crc32 = new Gr();
  }
  return t.prototype.update = function(e) {
    yr(e) || this.crc32.update(ut(e));
  }, t.prototype.digest = function() {
    return xr(this, void 0, void 0, function() {
      return wr(this, function(e) {
        return [2, au(this.crc32.digest())];
      });
    });
  }, t.prototype.reset = function() {
    this.crc32 = new Gr();
  }, t;
})(), Gr = (function() {
  function t() {
    this.checksum = 4294967295;
  }
  return t.prototype.update = function(e) {
    var r, s;
    try {
      for (var n = Kt(e), i = n.next(); !i.done; i = n.next()) {
        var o = i.value;
        this.checksum = this.checksum >>> 8 ^ Ep[(this.checksum ^ o) & 255];
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
})(), wp = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117], Ep = cu(wp);
const Cp = () => xp, uu = [K.CRC32, K.CRC32C, K.CRC64NVME, K.SHA1, K.SHA256], Ap = [K.SHA256, K.SHA1, K.CRC32, K.CRC32C, K.CRC64NVME], du = (t, e) => {
  const { checksumAlgorithms: r = {} } = e;
  switch (t) {
    case K.MD5:
      return (r == null ? void 0 : r.MD5) ?? e.md5;
    case K.CRC32:
      return (r == null ? void 0 : r.CRC32) ?? Cp();
    case K.CRC32C:
      return (r == null ? void 0 : r.CRC32C) ?? pp;
    case K.CRC64NVME:
      return (r == null ? void 0 : r.CRC64NVME) ?? bp;
    case K.SHA1:
      return (r == null ? void 0 : r.SHA1) ?? e.sha1;
    case K.SHA256:
      return (r == null ? void 0 : r.SHA256) ?? e.sha256;
    default:
      if (r == null ? void 0 : r[t]) return r[t];
      throw new Error(`The checksum algorithm "${t}" is not supported by the client. Select one of ${uu}, or provide an implementation to  the client constructor checksums field.`);
  }
}, lu = (t, e) => {
  const r = new t();
  return r.update(Gt(e || "")), r.digest();
}, vp = { name: "flexibleChecksumsMiddleware", step: "build", tags: ["BODY_CHECKSUM"], override: true }, Rp = (t, e) => (r, s) => async (n) => {
  if (!ee.isInstance(n.request) || cp("x-amz-checksum-", n.request.headers)) return r(n);
  const { request: i, input: o } = n, { body: a, headers: c } = i, { base64Encoder: u, streamHasher: p } = t, { requestChecksumRequired: l, requestAlgorithmMember: h } = e, m = await t.requestChecksumCalculation(), y = h == null ? void 0 : h.name, x = h == null ? void 0 : h.httpHeader;
  y && !o[y] && (m === Vt.WHEN_SUPPORTED || l) && (o[y] = Nn, x && (c[x] = Nn));
  const w = op(o, { requestChecksumRequired: l, requestAlgorithmMember: h == null ? void 0 : h.name, requestChecksumCalculation: m });
  let R = a, v = c;
  if (w) {
    switch (w) {
      case K.CRC32:
        se(s, "FLEXIBLE_CHECKSUMS_REQ_CRC32", "U");
        break;
      case K.CRC32C:
        se(s, "FLEXIBLE_CHECKSUMS_REQ_CRC32C", "V");
        break;
      case K.CRC64NVME:
        se(s, "FLEXIBLE_CHECKSUMS_REQ_CRC64", "W");
        break;
      case K.SHA1:
        se(s, "FLEXIBLE_CHECKSUMS_REQ_SHA1", "X");
        break;
      case K.SHA256:
        se(s, "FLEXIBLE_CHECKSUMS_REQ_SHA256", "Y");
        break;
    }
    const I = yi(w), N = du(w, t);
    if (Pc(a)) {
      const { getAwsChunkedEncodingStream: q, bodyLengthChecker: te } = t;
      R = q(typeof t.requestStreamBufferSize == "number" && t.requestStreamBufferSize >= 8 * 1024 ? nf(a, t.requestStreamBufferSize, s.logger) : a, { base64Encoder: u, bodyLengthChecker: te, checksumLocationName: I, checksumAlgorithmFn: N, streamHasher: p }), v = { ...c, "content-encoding": c["content-encoding"] ? `${c["content-encoding"]},aws-chunked` : "aws-chunked", "transfer-encoding": "chunked", "x-amz-decoded-content-length": c["content-length"], "x-amz-content-sha256": "STREAMING-UNSIGNED-PAYLOAD-TRAILER", "x-amz-trailer": I }, delete v["content-length"];
    } else if (!ap(I, c)) {
      const q = await lu(N, a);
      v = { ...c, [I]: u(q) };
    }
  }
  try {
    return await r({ ...n, request: { ...i, headers: v, body: R } });
  } catch (I) {
    if (I instanceof Error && I.name === "InvalidChunkSizeError") try {
      I.message.endsWith(".") || (I.message += "."), I.message += " Set [requestStreamBufferSize=number e.g. 65_536] in client constructor to instruct AWS SDK to buffer your input stream.";
    } catch {
    }
    throw I;
  }
}, _p = { name: "flexibleChecksumsInputMiddleware", toMiddleware: "serializerMiddleware", relation: "before", tags: ["BODY_CHECKSUM"], override: true }, Dp = (t, e) => (r, s) => async (n) => {
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
    case Gs.WHEN_REQUIRED:
      se(s, "FLEXIBLE_CHECKSUMS_RES_WHEN_REQUIRED", "c");
      break;
    case Gs.WHEN_SUPPORTED:
      se(s, "FLEXIBLE_CHECKSUMS_RES_WHEN_SUPPORTED", "b");
      break;
  }
  return o && !i[o] && c === Gs.WHEN_SUPPORTED && (i[o] = "ENABLED"), r(n);
}, fu = (t = []) => {
  const e = [];
  for (const r of Ap) !t.includes(r) || !uu.includes(r) || e.push(r);
  return e;
}, kp = (t) => {
  const e = t.lastIndexOf("-");
  if (e !== -1) {
    const r = t.slice(e + 1);
    if (!r.startsWith("0")) {
      const s = parseInt(r, 10);
      if (!isNaN(s) && s >= 1 && s <= 1e4) return true;
    }
  }
  return false;
}, Tp = async (t, { checksumAlgorithmFn: e, base64Encoder: r }) => r(await lu(e, t)), Op = async (t, { config: e, responseAlgorithms: r, logger: s }) => {
  const n = fu(r), { body: i, headers: o } = t;
  for (const a of n) {
    const c = yi(a), u = o[c];
    if (u) {
      let p;
      try {
        p = du(a, e);
      } catch (m) {
        if (a === K.CRC64NVME) {
          s == null ? void 0 : s.warn(`Skipping ${K.CRC64NVME} checksum validation: ${m.message}`);
          continue;
        }
        throw m;
      }
      const { base64Encoder: l } = e;
      if (Pc(i)) {
        t.body = tf({ expectedChecksum: u, checksumSourceLocation: c, checksum: new p(), source: i, base64Encoder: l });
        return;
      }
      const h = await Tp(i, { checksumAlgorithmFn: p, base64Encoder: l });
      if (h === u) break;
      throw new Error(`Checksum mismatch: expected "${h}" but received "${u}" in response header "${c}".`);
    }
  }
}, Bp = { name: "flexibleChecksumsResponseMiddleware", toMiddleware: "deserializerMiddleware", relation: "after", tags: ["BODY_CHECKSUM"], override: true }, Ip = (t, e) => (r, s) => async (n) => {
  if (!ee.isInstance(n.request)) return r(n);
  const i = n.input, o = await r(n), a = o.response, { requestValidationModeMember: c, responseAlgorithms: u } = e;
  if (c && i[c] === "ENABLED") {
    const { clientName: p, commandName: l } = s;
    if (p === "S3Client" && l === "GetObjectCommand" && fu(u).every((m) => {
      const y = yi(m), x = a.headers[y];
      return !x || kp(x);
    })) return o;
    await Op(a, { config: t, responseAlgorithms: u, logger: s.logger });
  }
  return o;
}, bi = (t, e) => ({ applyToStack: (r) => {
  r.add(Rp(t, e), vp), r.addRelativeTo(Dp(t, e), _p), r.addRelativeTo(Ip(t, e), Bp);
} }), Mp = (t) => {
  const { requestChecksumCalculation: e, responseChecksumValidation: r, requestStreamBufferSize: s } = t;
  return Object.assign(t, { requestChecksumCalculation: Ne(e ?? Nl), responseChecksumValidation: Ne(r ?? $l), requestStreamBufferSize: Number(s ?? 0), checksumAlgorithms: t.checksumAlgorithms ?? {} });
};
const Pp = (t) => (e) => async (r) => {
  if (!ee.isInstance(r.request)) return e(r);
  const { request: s } = r, { handlerProtocol: n = "" } = t.requestHandler.metadata || {};
  if (n.indexOf("h2") >= 0 && !s.headers[":authority"]) delete s.headers.host, s.headers[":authority"] = s.hostname + (s.port ? ":" + s.port : "");
  else if (!s.headers.host) {
    let i = s.hostname;
    s.port != null && (i += `:${s.port}`), s.headers.host = i;
  }
  return e(r);
}, Np = { name: "hostHeaderMiddleware", step: "build", priority: "low", tags: ["HOST"], override: true }, $p = (t) => ({ applyToStack: (e) => {
  e.add(Pp(t), Np);
} }), Up = () => (t, e) => async (r) => {
  var _a2, _b2;
  try {
    const s = await t(r), { clientName: n, commandName: i, logger: o, dynamoDbDocumentClientOptions: a = {} } = e, { overrideInputFilterSensitiveLog: c, overrideOutputFilterSensitiveLog: u } = a, p = c ?? e.inputFilterSensitiveLog, l = u ?? e.outputFilterSensitiveLog, { $metadata: h, ...m } = s.output;
    return (_a2 = o == null ? void 0 : o.info) == null ? void 0 : _a2.call(o, { clientName: n, commandName: i, input: p(r.input), output: l(m), metadata: h }), s;
  } catch (s) {
    const { clientName: n, commandName: i, logger: o, dynamoDbDocumentClientOptions: a = {} } = e, { overrideInputFilterSensitiveLog: c } = a, u = c ?? e.inputFilterSensitiveLog;
    throw (_b2 = o == null ? void 0 : o.error) == null ? void 0 : _b2.call(o, { clientName: n, commandName: i, input: u(r.input), error: s, metadata: s.$metadata }), s;
  }
}, Fp = { name: "loggerMiddleware", tags: ["LOGGER"], step: "initialize", override: true }, Lp = (t) => ({ applyToStack: (e) => {
  e.add(Up(), Fp);
} }), Hp = { step: "build", tags: ["RECURSION_DETECTION"], name: "recursionDetectionMiddleware", override: true, priority: "low" }, jp = () => (t) => async (e) => t(e), zp = (t) => ({ applyToStack: (e) => {
  e.add(jp(), Hp);
} }), Vp = "content-length", qp = "x-amz-decoded-content-length";
function Gp() {
  return (t, e) => async (r) => {
    var _a2;
    const { request: s } = r;
    if (ee.isInstance(s) && !(Vp in s.headers) && !(qp in s.headers)) {
      const n = "Are you using a Stream of unknown length as the Body of a PutObject request? Consider using Upload instead from @aws-sdk/lib-storage.";
      typeof ((_a2 = e == null ? void 0 : e.logger) == null ? void 0 : _a2.warn) == "function" && !(e.logger instanceof mi) ? e.logger.warn(n) : console.warn(n);
    }
    return t({ ...r });
  };
}
const Kp = { step: "finalizeRequest", tags: ["CHECK_CONTENT_LENGTH_HEADER"], name: "getCheckContentLengthHeaderPlugin", override: true }, Wp = (t) => ({ applyToStack: (e) => {
  e.add(Gp(), Kp);
} }), Xp = (t) => (e, r) => async (s) => {
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
}, Zp = { tags: ["REGION_REDIRECT", "S3"], name: "regionRedirectEndpointMiddleware", override: true, relation: "before", toMiddleware: "endpointV2Middleware" };
function Qp(t) {
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
const Jp = { step: "initialize", tags: ["REGION_REDIRECT", "S3"], name: "regionRedirectMiddleware", override: true }, Yp = (t) => ({ applyToStack: (e) => {
  e.add(Qp(t), Jp), e.addRelativeTo(Xp(t), Zp);
} }), em = (t) => (e, r) => async (s) => {
  var _a2;
  const n = await e(s), { response: i } = n;
  if (ct.isInstance(i) && i.headers.expires) {
    i.headers.expiresstring = i.headers.expires;
    try {
      Pf(i.headers.expires);
    } catch (o) {
      (_a2 = r.logger) == null ? void 0 : _a2.warn(`AWS SDK Warning for ${r.clientName}::${r.commandName} response parsing (${i.headers.expires}): ${o}`), delete i.headers.expires;
    }
  }
  return n;
}, tm = { tags: ["S3"], name: "s3ExpiresMiddleware", override: true, relation: "after", toMiddleware: "deserializerMiddleware" }, hu = (t) => ({ applyToStack: (e) => {
  e.addRelativeTo(em(), tm);
} });
const _xi = class _xi {
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
    if (!(this.lastPurgeTime + _xi.EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS > e)) for (const r in this.data) {
      const s = this.data[r];
      if (!s.isRefreshing) {
        const n = await s.identity;
        n.expiration && n.expiration.getTime() < e && delete this.data[r];
      }
    }
  }
};
__publicField(_xi, "EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS", 3e4);
let xi = _xi;
class cn {
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
const _wi = class _wi {
  constructor(e, r = new xi()) {
    __publicField(this, "createSessionFn");
    __publicField(this, "cache");
    this.createSessionFn = e, this.cache = r;
  }
  async getS3ExpressIdentity(e, r) {
    const s = r.Bucket, { cache: n } = this, i = n.get(s);
    return i ? i.identity.then((o) => {
      var _a2, _b2;
      return (((_a2 = o.expiration) == null ? void 0 : _a2.getTime()) ?? 0) < Date.now() ? n.set(s, new cn(this.getIdentity(s))).identity : ((((_b2 = o.expiration) == null ? void 0 : _b2.getTime()) ?? 0) < Date.now() + _wi.REFRESH_WINDOW_MS && !i.isRefreshing && (i.isRefreshing = true, this.getIdentity(s).then((u) => {
        n.set(s, new cn(Promise.resolve(u)));
      })), o);
    }) : n.set(s, new cn(this.getIdentity(s))).identity;
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
__publicField(_wi, "REFRESH_WINDOW_MS", 6e4);
let wi = _wi;
const rm = "Directory", sm = "S3Express", nm = "sigv4-s3express", ei = "X-Amz-S3session-Token", ti = ei.toLowerCase();
class im extends jn {
  async signWithCredentials(e, r, s) {
    const n = To(r);
    e.headers[ti] = r.sessionToken;
    const i = this;
    return Oo(i, n), i.signRequest(e, s ?? {});
  }
  async presignWithCredentials(e, r, s) {
    const n = To(r);
    return delete e.headers[ti], e.headers[ei] = r.sessionToken, e.query = e.query ?? {}, e.query[ei] = r.sessionToken, Oo(this, n), this.presign(e, s);
  }
}
function To(t) {
  return { accessKeyId: t.accessKeyId, secretAccessKey: t.secretAccessKey, expiration: t.expiration };
}
function Oo(t, e) {
  const r = setTimeout(() => {
    throw new Error("SignatureV4S3Express credential override was created but not called.");
  }, 10), s = t.credentialProvider, n = () => (clearTimeout(r), t.credentialProvider = s, Promise.resolve(e));
  t.credentialProvider = n;
}
const om = (t) => (e, r) => async (s) => {
  var _a2, _b2, _c2, _d2, _e2;
  if (r.endpointV2) {
    const n = r.endpointV2, i = ((_c2 = (_b2 = (_a2 = n.properties) == null ? void 0 : _a2.authSchemes) == null ? void 0 : _b2[0]) == null ? void 0 : _c2.name) === nm;
    if ((((_d2 = n.properties) == null ? void 0 : _d2.backend) === sm || ((_e2 = n.properties) == null ? void 0 : _e2.bucketType) === rm) && (se(r, "S3_EXPRESS_BUCKET", "J"), r.isS3ExpressBucket = true), i) {
      const a = s.input.Bucket;
      if (a) {
        const c = await t.s3ExpressIdentityProvider.getS3ExpressIdentity(await t.credentials(), { Bucket: a });
        r.s3ExpressIdentity = c, ee.isInstance(s.request) && c.sessionToken && (s.request.headers[ti] = c.sessionToken);
      }
    }
  }
  return e(s);
}, am = { name: "s3ExpressMiddleware", step: "build", tags: ["S3", "S3_EXPRESS"], override: true }, cm = (t) => ({ applyToStack: (e) => {
  e.add(om(t), am);
} }), um = async (t, e, r, s) => {
  const n = await s.signWithCredentials(r, t, {});
  if (n.headers["X-Amz-Security-Token"] || n.headers["x-amz-security-token"]) throw new Error("X-Amz-Security-Token must not be set for s3-express requests.");
  return n;
}, dm = (t) => (e) => {
  throw e;
}, lm = (t, e) => {
}, fm = (t) => (e, r) => async (s) => {
  if (!ee.isInstance(s.request)) return e(s);
  const i = ft(r).selectedHttpAuthScheme;
  if (!i) throw new Error("No HttpAuthScheme was selected: unable to sign request");
  const { httpAuthOption: { signingProperties: o = {} }, identity: a, signer: c } = i;
  let u;
  r.s3ExpressIdentity ? u = await um(r.s3ExpressIdentity, o, s.request, await t.signer()) : u = await c.sign(s.request, a, o);
  const p = await e({ ...s, request: u }).catch((c.errorHandler || dm)(o));
  return (c.successHandler || lm)(p.response, o), p;
}, hm = (t) => ({ applyToStack: (e) => {
  e.addRelativeTo(fm(t), lc);
} }), pm = (t, { session: e }) => {
  const [r, s] = e, { forcePathStyle: n, useAccelerateEndpoint: i, disableMultiregionAccessPoints: o, followRegionRedirects: a, s3ExpressIdentityProvider: c, bucketEndpoint: u, expectContinueHeader: p } = t;
  return Object.assign(t, { forcePathStyle: n ?? false, useAccelerateEndpoint: i ?? false, disableMultiregionAccessPoints: o ?? false, followRegionRedirects: a ?? false, s3ExpressIdentityProvider: c ?? new wi(async (l) => r().send(new s({ Bucket: l }))), bucketEndpoint: u ?? false, expectContinueHeader: p ?? 2097152 });
}, mm = { CopyObjectCommand: true, UploadPartCopyCommand: true, CompleteMultipartUploadCommand: true }, gm = 3e3, ym = (t) => (e, r) => async (s) => {
  const n = await e(s), { response: i } = n;
  if (!ct.isInstance(i)) return n;
  const { statusCode: o, body: a } = i;
  if (o < 200 || o >= 300 || !(typeof (a == null ? void 0 : a.stream) == "function" || typeof (a == null ? void 0 : a.pipe) == "function" || typeof (a == null ? void 0 : a.tee) == "function")) return n;
  let u = a, p = a;
  a && typeof a == "object" && !(a instanceof Uint8Array) && ([u, p] = await mf(a)), i.body = p;
  const l = await Sm(u, { streamCollector: async (m) => uf(m, gm) });
  typeof (u == null ? void 0 : u.destroy) == "function" && u.destroy();
  const h = t.utf8Encoder(l.subarray(l.length - 16));
  if (l.length === 0 && mm[r.commandName]) {
    const m = new Error("S3 aborted request");
    throw m.name = "InternalError", m;
  }
  return h && h.endsWith("</Error>") && (i.statusCode = 400), n;
}, Sm = (t = new Uint8Array(), e) => t instanceof Uint8Array ? Promise.resolve(t) : e.streamCollector(t) || Promise.resolve(new Uint8Array()), bm = { relation: "after", toMiddleware: "deserializerMiddleware", tags: ["THROW_200_EXCEPTIONS", "S3"], name: "throw200ExceptionsMiddleware", override: true }, Je = (t) => ({ applyToStack: (e) => {
  e.addRelativeTo(ym(t), bm);
} }), xm = (t) => typeof t == "string" && t.indexOf("arn:") === 0 && t.split(":").length >= 6;
function wm(t) {
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
const Em = { name: "bucketEndpointMiddleware", override: true, relation: "after", toMiddleware: "endpointV2Middleware" };
function Cm({ bucketEndpoint: t }) {
  return (e) => async (r) => {
    const { input: { Bucket: s } } = r;
    if (!t && typeof s == "string" && !xm(s) && s.indexOf("/") >= 0) {
      const n = new Error(`Bucket name shouldn't contain '/', received '${s}'`);
      throw n.name = "InvalidBucketName", n;
    }
    return e({ ...r });
  };
}
const Am = { step: "initialize", tags: ["VALIDATE_BUCKET_NAME"], name: "validateBucketNameMiddleware", override: true }, vm = (t) => ({ applyToStack: (e) => {
  e.add(Cm(t), Am), e.addRelativeTo(wm(t), Em);
} }), Rm = void 0;
function _m(t) {
  return t === void 0 ? true : typeof t == "string" && t.length <= 50;
}
function Dm(t) {
  const e = Ht(t.userAgentAppId ?? Rm), { customUserAgent: r } = t;
  return Object.assign(t, { customUserAgent: typeof r == "string" ? [[r]] : r, userAgentAppId: async () => {
    var _a2, _b2;
    const s = await e();
    if (!_m(s)) {
      const n = ((_b2 = (_a2 = t.logger) == null ? void 0 : _a2.constructor) == null ? void 0 : _b2.name) === "NoOpLogger" || !t.logger ? console : t.logger;
      typeof s != "string" ? n == null ? void 0 : n.warn("userAgentAppId must be a string or undefined.") : s.length > 50 && (n == null ? void 0 : n.warn("The provided userAgentAppId exceeds the maximum length of 50 characters."));
    }
    return s;
  } });
}
class km {
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
const Tm = new RegExp("^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$"), pu = (t) => Tm.test(t) || t.startsWith("[") && t.endsWith("]"), Om = new RegExp("^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$"), is = (t, e = false) => {
  if (!e) return Om.test(t);
  const r = t.split(".");
  for (const s of r) if (!is(s)) return false;
  return true;
}, Kr = {}, Sr = "endpoints";
function dt(t) {
  return typeof t != "object" || t == null ? t : "ref" in t ? `$${dt(t.ref)}` : "fn" in t ? `${t.fn}(${(t.argv || []).map(dt).join(", ")})` : JSON.stringify(t, null, 2);
}
class Oe extends Error {
  constructor(e) {
    super(e), this.name = "EndpointError";
  }
}
const Bm = (t, e) => t === e, Im = (t) => {
  const e = t.split("."), r = [];
  for (const s of e) {
    const n = s.indexOf("[");
    if (n !== -1) {
      if (s.indexOf("]") !== s.length - 1) throw new Oe(`Path: '${t}' does not end with ']'`);
      const i = s.slice(n + 1, -1);
      if (Number.isNaN(parseInt(i))) throw new Oe(`Invalid array index: '${i}' in path: '${t}'`);
      n !== 0 && r.push(s.slice(0, n)), r.push(i);
    } else r.push(s);
  }
  return r;
}, mu = (t, e) => Im(e).reduce((r, s) => {
  if (typeof r != "object") throw new Oe(`Index '${s}' in '${e}' not found in '${JSON.stringify(t)}'`);
  return Array.isArray(r) ? r[parseInt(s)] : r[s];
}, t), Mm = (t) => t != null, Pm = (t) => !t, un = { [mr.HTTP]: 80, [mr.HTTPS]: 443 }, Nm = (t) => {
  const e = (() => {
    try {
      if (t instanceof URL) return t;
      if (typeof t == "object" && "hostname" in t) {
        const { hostname: h, port: m, protocol: y = "", path: x = "", query: w = {} } = t, R = new URL(`${y}//${h}${m ? `:${m}` : ""}${x}`);
        return R.search = Object.entries(w).map(([v, I]) => `${v}=${I}`).join("&"), R;
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
  if (!Object.values(mr).includes(c)) return null;
  const u = pu(n), p = r.includes(`${s}:${un[c]}`) || typeof t == "string" && t.includes(`${s}:${un[c]}`), l = `${s}${p ? `:${un[c]}` : ""}`;
  return { scheme: c, authority: l, path: i, normalizedPath: i.endsWith("/") ? i : `${i}/`, isIp: u };
}, $m = (t, e) => t === e, Um = (t, e, r, s) => e >= r || t.length < r || /[^\u0000-\u007f]/.test(t) ? null : s ? t.substring(t.length - r, t.length - e) : t.substring(e, r), Fm = (t) => encodeURIComponent(t).replace(/[!*'()]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), Lm = { booleanEquals: Bm, getAttr: mu, isSet: Mm, isValidHostLabel: is, not: Pm, parseURL: Nm, stringEquals: $m, substring: Um, uriEncode: Fm }, gu = (t, e) => {
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
      r.push(mu(s[c], u));
    } else r.push(s[a]);
    n = o + 1;
  }
  return r.join("");
}, Hm = ({ ref: t }, e) => ({ ...e.endpointParams, ...e.referenceRecord })[t], os = (t, e, r) => {
  if (typeof t == "string") return gu(t, r);
  if (t.fn) return Su.callFunction(t, r);
  if (t.ref) return Hm(t, r);
  throw new Oe(`'${e}': ${String(t)} is not a string, function or reference.`);
}, yu = ({ fn: t, argv: e }, r) => {
  const s = e.map((i) => ["boolean", "number"].includes(typeof i) ? i : Su.evaluateExpression(i, "arg", r)), n = t.split(".");
  return n[0] in Kr && n[1] != null ? Kr[n[0]][n[1]](...s) : Lm[t](...s);
}, Su = { evaluateExpression: os, callFunction: yu }, jm = ({ assign: t, ...e }, r) => {
  var _a2, _b2;
  if (t && t in r.referenceRecord) throw new Oe(`'${t}' is already defined in Reference Record.`);
  const s = yu(e, r);
  return (_b2 = (_a2 = r.logger) == null ? void 0 : _a2.debug) == null ? void 0 : _b2.call(_a2, `${Sr} evaluateCondition: ${dt(e)} = ${dt(s)}`), { result: s === "" ? true : !!s, ...t != null && { toAssign: { name: t, value: s } } };
}, Ei = (t = [], e) => {
  var _a2, _b2;
  const r = {};
  for (const s of t) {
    const { result: n, toAssign: i } = jm(s, { ...e, referenceRecord: { ...e.referenceRecord, ...r } });
    if (!n) return { result: n };
    i && (r[i.name] = i.value, (_b2 = (_a2 = e.logger) == null ? void 0 : _a2.debug) == null ? void 0 : _b2.call(_a2, `${Sr} assign: ${i.name} := ${dt(i.value)}`));
  }
  return { result: true, referenceRecord: r };
}, zm = (t, e) => Object.entries(t).reduce((r, [s, n]) => ({ ...r, [s]: n.map((i) => {
  const o = os(i, "Header value entry", e);
  if (typeof o != "string") throw new Oe(`Header '${s}' value '${o}' is not a string`);
  return o;
}) }), {}), bu = (t, e) => Object.entries(t).reduce((r, [s, n]) => ({ ...r, [s]: wu.getEndpointProperty(n, e) }), {}), xu = (t, e) => {
  if (Array.isArray(t)) return t.map((r) => xu(r, e));
  switch (typeof t) {
    case "string":
      return gu(t, e);
    case "object":
      if (t === null) throw new Oe(`Unexpected endpoint property: ${t}`);
      return wu.getEndpointProperties(t, e);
    case "boolean":
      return t;
    default:
      throw new Oe(`Unexpected endpoint property type: ${typeof t}`);
  }
}, wu = { getEndpointProperty: xu, getEndpointProperties: bu }, Vm = (t, e) => {
  const r = os(t, "Endpoint URL", e);
  if (typeof r == "string") try {
    return new URL(r);
  } catch (s) {
    throw console.error(`Failed to construct URL with ${r}`, s), s;
  }
  throw new Oe(`Endpoint URL must be a string, got ${typeof r}`);
}, qm = (t, e) => {
  var _a2, _b2;
  const { conditions: r, endpoint: s } = t, { result: n, referenceRecord: i } = Ei(r, e);
  if (!n) return;
  const o = { ...e, referenceRecord: { ...e.referenceRecord, ...i } }, { url: a, properties: c, headers: u } = s;
  return (_b2 = (_a2 = e.logger) == null ? void 0 : _a2.debug) == null ? void 0 : _b2.call(_a2, `${Sr} Resolving endpoint from template: ${dt(s)}`), { ...u != null && { headers: zm(u, o) }, ...c != null && { properties: bu(c, o) }, url: Vm(a, o) };
}, Gm = (t, e) => {
  const { conditions: r, error: s } = t, { result: n, referenceRecord: i } = Ei(r, e);
  if (n) throw new Oe(os(s, "Error", { ...e, referenceRecord: { ...e.referenceRecord, ...i } }));
}, Eu = (t, e) => {
  for (const r of t) if (r.type === "endpoint") {
    const s = qm(r, e);
    if (s) return s;
  } else if (r.type === "error") Gm(r, e);
  else if (r.type === "tree") {
    const s = Cu.evaluateTreeRule(r, e);
    if (s) return s;
  } else throw new Oe(`Unknown endpoint rule: ${r}`);
  throw new Oe("Rules evaluation failed");
}, Km = (t, e) => {
  const { conditions: r, rules: s } = t, { result: n, referenceRecord: i } = Ei(r, e);
  if (n) return Cu.evaluateRules(s, { ...e, referenceRecord: { ...e.referenceRecord, ...i } });
}, Cu = { evaluateRules: Eu, evaluateTreeRule: Km }, Wm = (t, e) => {
  var _a2, _b2, _c2, _d2;
  const { endpointParams: r, logger: s } = e, { parameters: n, rules: i } = t;
  (_b2 = (_a2 = e.logger) == null ? void 0 : _a2.debug) == null ? void 0 : _b2.call(_a2, `${Sr} Initial EndpointParams: ${dt(r)}`);
  const o = Object.entries(n).filter(([, u]) => u.default != null).map(([u, p]) => [u, p.default]);
  if (o.length > 0) for (const [u, p] of o) r[u] = r[u] ?? p;
  const a = Object.entries(n).filter(([, u]) => u.required).map(([u]) => u);
  for (const u of a) if (r[u] == null) throw new Oe(`Missing required parameter: '${u}'`);
  const c = Eu(i, { endpointParams: r, logger: s, referenceRecord: {} });
  return (_d2 = (_c2 = e.logger) == null ? void 0 : _c2.debug) == null ? void 0 : _d2.call(_c2, `${Sr} Resolved endpoint: ${dt(c)}`), c;
}, Au = (t, e = false) => {
  if (e) {
    for (const r of t.split(".")) if (!Au(r)) return false;
    return true;
  }
  return !(!is(t) || t.length < 3 || t.length > 63 || t !== t.toLowerCase() || pu(t));
}, Bo = ":", Xm = "/", Zm = (t) => {
  const e = t.split(Bo);
  if (e.length < 6) return null;
  const [r, s, n, i, o, ...a] = e;
  if (r !== "arn" || s === "" || n === "" || a.join(Bo) === "") return null;
  const c = a.map((u) => u.split(Xm)).flat();
  return { partition: s, service: n, region: i, accountId: o, resourceId: c };
}, Qm = [{ id: "aws", outputs: { dnsSuffix: "amazonaws.com", dualStackDnsSuffix: "api.aws", implicitGlobalRegion: "us-east-1", name: "aws", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^(us|eu|ap|sa|ca|me|af|il|mx)\\-\\w+\\-\\d+$", regions: { "af-south-1": { description: "Africa (Cape Town)" }, "ap-east-1": { description: "Asia Pacific (Hong Kong)" }, "ap-east-2": { description: "Asia Pacific (Taipei)" }, "ap-northeast-1": { description: "Asia Pacific (Tokyo)" }, "ap-northeast-2": { description: "Asia Pacific (Seoul)" }, "ap-northeast-3": { description: "Asia Pacific (Osaka)" }, "ap-south-1": { description: "Asia Pacific (Mumbai)" }, "ap-south-2": { description: "Asia Pacific (Hyderabad)" }, "ap-southeast-1": { description: "Asia Pacific (Singapore)" }, "ap-southeast-2": { description: "Asia Pacific (Sydney)" }, "ap-southeast-3": { description: "Asia Pacific (Jakarta)" }, "ap-southeast-4": { description: "Asia Pacific (Melbourne)" }, "ap-southeast-5": { description: "Asia Pacific (Malaysia)" }, "ap-southeast-6": { description: "Asia Pacific (New Zealand)" }, "ap-southeast-7": { description: "Asia Pacific (Thailand)" }, "aws-global": { description: "aws global region" }, "ca-central-1": { description: "Canada (Central)" }, "ca-west-1": { description: "Canada West (Calgary)" }, "eu-central-1": { description: "Europe (Frankfurt)" }, "eu-central-2": { description: "Europe (Zurich)" }, "eu-north-1": { description: "Europe (Stockholm)" }, "eu-south-1": { description: "Europe (Milan)" }, "eu-south-2": { description: "Europe (Spain)" }, "eu-west-1": { description: "Europe (Ireland)" }, "eu-west-2": { description: "Europe (London)" }, "eu-west-3": { description: "Europe (Paris)" }, "il-central-1": { description: "Israel (Tel Aviv)" }, "me-central-1": { description: "Middle East (UAE)" }, "me-south-1": { description: "Middle East (Bahrain)" }, "mx-central-1": { description: "Mexico (Central)" }, "sa-east-1": { description: "South America (Sao Paulo)" }, "us-east-1": { description: "US East (N. Virginia)" }, "us-east-2": { description: "US East (Ohio)" }, "us-west-1": { description: "US West (N. California)" }, "us-west-2": { description: "US West (Oregon)" } } }, { id: "aws-cn", outputs: { dnsSuffix: "amazonaws.com.cn", dualStackDnsSuffix: "api.amazonwebservices.com.cn", implicitGlobalRegion: "cn-northwest-1", name: "aws-cn", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^cn\\-\\w+\\-\\d+$", regions: { "aws-cn-global": { description: "aws-cn global region" }, "cn-north-1": { description: "China (Beijing)" }, "cn-northwest-1": { description: "China (Ningxia)" } } }, { id: "aws-eusc", outputs: { dnsSuffix: "amazonaws.eu", dualStackDnsSuffix: "api.amazonwebservices.eu", implicitGlobalRegion: "eusc-de-east-1", name: "aws-eusc", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^eusc\\-(de)\\-\\w+\\-\\d+$", regions: { "eusc-de-east-1": { description: "AWS European Sovereign Cloud (Germany)" } } }, { id: "aws-iso", outputs: { dnsSuffix: "c2s.ic.gov", dualStackDnsSuffix: "api.aws.ic.gov", implicitGlobalRegion: "us-iso-east-1", name: "aws-iso", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^us\\-iso\\-\\w+\\-\\d+$", regions: { "aws-iso-global": { description: "aws-iso global region" }, "us-iso-east-1": { description: "US ISO East" }, "us-iso-west-1": { description: "US ISO WEST" } } }, { id: "aws-iso-b", outputs: { dnsSuffix: "sc2s.sgov.gov", dualStackDnsSuffix: "api.aws.scloud", implicitGlobalRegion: "us-isob-east-1", name: "aws-iso-b", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^us\\-isob\\-\\w+\\-\\d+$", regions: { "aws-iso-b-global": { description: "aws-iso-b global region" }, "us-isob-east-1": { description: "US ISOB East (Ohio)" }, "us-isob-west-1": { description: "US ISOB West" } } }, { id: "aws-iso-e", outputs: { dnsSuffix: "cloud.adc-e.uk", dualStackDnsSuffix: "api.cloud-aws.adc-e.uk", implicitGlobalRegion: "eu-isoe-west-1", name: "aws-iso-e", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^eu\\-isoe\\-\\w+\\-\\d+$", regions: { "aws-iso-e-global": { description: "aws-iso-e global region" }, "eu-isoe-west-1": { description: "EU ISOE West" } } }, { id: "aws-iso-f", outputs: { dnsSuffix: "csp.hci.ic.gov", dualStackDnsSuffix: "api.aws.hci.ic.gov", implicitGlobalRegion: "us-isof-south-1", name: "aws-iso-f", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^us\\-isof\\-\\w+\\-\\d+$", regions: { "aws-iso-f-global": { description: "aws-iso-f global region" }, "us-isof-east-1": { description: "US ISOF EAST" }, "us-isof-south-1": { description: "US ISOF SOUTH" } } }, { id: "aws-us-gov", outputs: { dnsSuffix: "amazonaws.com", dualStackDnsSuffix: "api.aws", implicitGlobalRegion: "us-gov-west-1", name: "aws-us-gov", supportsDualStack: true, supportsFIPS: true }, regionRegex: "^us\\-gov\\-\\w+\\-\\d+$", regions: { "aws-us-gov-global": { description: "aws-us-gov global region" }, "us-gov-east-1": { description: "AWS GovCloud (US-East)" }, "us-gov-west-1": { description: "AWS GovCloud (US-West)" } } }], Jm = { partitions: Qm };
let Ym = Jm;
const eg = (t) => {
  const { partitions: e } = Ym;
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
}, vu = { isVirtualHostableS3Bucket: Au, parseArn: Zm, partition: eg };
Kr.aws = vu;
function tg(t) {
  const e = {};
  if (t = t.replace(/^\?/, ""), t) for (const r of t.split("&")) {
    let [s, n = null] = r.split("=");
    s = decodeURIComponent(s), n && (n = decodeURIComponent(n)), s in e ? Array.isArray(e[s]) ? e[s].push(n) : e[s] = [e[s], n] : e[s] = n;
  }
  return e;
}
const Wr = (t) => {
  if (typeof t == "string") return Wr(new URL(t));
  const { hostname: e, pathname: r, port: s, protocol: n, search: i } = t;
  let o;
  return i && (o = tg(i)), { hostname: e, port: s ? parseInt(s) : void 0, protocol: n, path: r, query: o };
}, rg = /\d{12}\.ddb/;
async function sg(t, e, r) {
  var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
  if (((_b2 = (_a2 = r.request) == null ? void 0 : _a2.headers) == null ? void 0 : _b2["smithy-protocol"]) === "rpc-v2-cbor" && se(t, "PROTOCOL_RPC_V2_CBOR", "M"), typeof e.retryStrategy == "function") {
    const i = await e.retryStrategy();
    typeof i.acquireInitialRetryToken == "function" ? ((_d2 = (_c2 = i.constructor) == null ? void 0 : _c2.name) == null ? void 0 : _d2.includes("Adaptive")) ? se(t, "RETRY_MODE_ADAPTIVE", "F") : se(t, "RETRY_MODE_STANDARD", "E") : se(t, "RETRY_MODE_LEGACY", "D");
  }
  if (typeof e.accountIdEndpointMode == "function") {
    const i = t.endpointV2;
    switch (String((_e2 = i == null ? void 0 : i.url) == null ? void 0 : _e2.hostname).match(rg) && se(t, "ACCOUNT_ID_ENDPOINT", "O"), await ((_f2 = e.accountIdEndpointMode) == null ? void 0 : _f2.call(e))) {
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
const Io = "user-agent", dn = "x-amz-user-agent", Mo = " ", ln = "/", ng = /[^!$%&'*+\-.^_`|~\w]/g, ig = /[^!$%&'*+\-.^_`|~\w#]/g, Po = "-", og = 1024;
function ag(t) {
  let e = "";
  for (const r in t) {
    const s = t[r];
    if (e.length + s.length + 1 <= og) {
      e.length ? e += "," + s : e += s;
      continue;
    }
    break;
  }
  return e;
}
const cg = (t) => (e, r) => async (s) => {
  var _a2, _b2, _c2, _d2;
  const { request: n } = s;
  if (!ee.isInstance(n)) return e(s);
  const { headers: i } = n, o = ((_a2 = r == null ? void 0 : r.userAgent) == null ? void 0 : _a2.map(Nr)) || [], a = (await t.defaultUserAgentProvider()).map(Nr);
  await sg(r, t, s);
  const c = r;
  a.push(`m/${ag(Object.assign({}, (_b2 = r.__smithy_context) == null ? void 0 : _b2.features, (_c2 = c.__aws_sdk_context) == null ? void 0 : _c2.features))}`);
  const u = ((_d2 = t == null ? void 0 : t.customUserAgent) == null ? void 0 : _d2.map(Nr)) || [], p = await t.userAgentAppId();
  p && a.push(Nr(["app", `${p}`]));
  const l = [].concat([...a, ...o, ...u]).join(Mo), h = [...a.filter((m) => m.startsWith("aws-sdk-")), ...u].join(Mo);
  return t.runtime !== "browser" ? (h && (i[dn] = i[dn] ? `${i[Io]} ${h}` : h), i[Io] = l) : i[dn] = l, e({ ...s, request: n });
}, Nr = (t) => {
  var _a2;
  const e = t[0].split(ln).map((o) => o.replace(ng, Po)).join(ln), r = (_a2 = t[1]) == null ? void 0 : _a2.replace(ig, Po), s = e.indexOf(ln), n = e.substring(0, s);
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
}, ug = { name: "getUserAgentMiddleware", step: "build", priority: "low", tags: ["SET_USER_AGENT", "USER_AGENT"], override: true }, dg = (t) => ({ applyToStack: (e) => {
  e.add(cg(t), ug);
} }), lg = false, fg = false, No = /* @__PURE__ */ new Set(), hg = (t, e = is) => {
  if (!No.has(t) && !e(t)) if (t === "*") console.warn('@smithy/config-resolver WARN - Please use the caller region instead of "*". See "sigv4a" in https://github.com/aws/aws-sdk-js-v3/blob/main/supplemental-docs/CLIENTS.md.');
  else throw new Error(`Region not accepted: region="${t}" is not a valid hostname component.`);
  else No.add(t);
}, Ru = (t) => typeof t == "string" && (t.startsWith("fips-") || t.endsWith("-fips")), pg = (t) => Ru(t) ? ["fips-aws-global", "aws-fips"].includes(t) ? "us-east-1" : t.replace(/fips-(dkr-|prod-)?|-fips/, "") : t, mg = (t) => {
  const { region: e, useFipsEndpoint: r } = t;
  if (!e) throw new Error("Region is missing");
  return Object.assign(t, { region: async () => {
    const s = typeof e == "function" ? await e() : e, n = pg(s);
    return hg(n), n;
  }, useFipsEndpoint: async () => {
    const s = typeof e == "string" ? e : await e();
    return Ru(s) ? true : typeof r != "function" ? Promise.resolve(!!r) : r();
  } });
}, gg = (t) => Object.assign(t, { eventStreamMarshaller: t.eventStreamSerdeProvider(t) }), $o = "content-length";
function yg(t) {
  return (e) => async (r) => {
    const s = r.request;
    if (ee.isInstance(s)) {
      const { body: n, headers: i } = s;
      if (n && Object.keys(i).map((o) => o.toLowerCase()).indexOf($o) === -1) try {
        const o = t(n);
        s.headers = { ...s.headers, [$o]: String(o) };
      } catch {
      }
    }
    return e({ ...r, request: s });
  };
}
const Sg = { step: "build", tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"], name: "contentLengthMiddleware", override: true }, bg = (t) => ({ applyToStack: (e) => {
  e.add(yg(t.bodyLengthChecker), Sg);
} }), xg = async (t) => {
  const e = (t == null ? void 0 : t.Bucket) || "";
  if (typeof t.Bucket == "string" && (t.Bucket = e.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"))), vg(e)) {
    if (t.ForcePathStyle === true) throw new Error("Path-style addressing cannot be used with ARN buckets");
  } else (!Ag(e) || e.indexOf(".") !== -1 && !String(t.Endpoint).startsWith("http:") || e.toLowerCase() !== e || e.length < 3) && (t.ForcePathStyle = true);
  return t.DisableMultiRegionAccessPoints && (t.disableMultiRegionAccessPoints = true, t.DisableMRAP = true), t;
}, wg = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/, Eg = /(\d+\.){3}\d+/, Cg = /\.\./, Ag = (t) => wg.test(t) && !Eg.test(t) && !Cg.test(t), vg = (t) => {
  const [e, r, s, , , n] = t.split(":"), i = e === "arn" && t.split(":").length >= 6, o = !!(i && r && s && n);
  if (i && !o) throw new Error(`Invalid ARN: ${t} was an invalid ARN.`);
  return o;
}, Rg = (t, e, r, s = false) => {
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
}, _u = async (t) => {
}, Du = (t) => typeof t == "object" ? "url" in t ? Wr(t.url) : t : Wr(t), ku = async (t, e, r, s) => {
  if (!r.isCustomEndpoint) {
    let o;
    r.serviceConfiguredEndpoint ? o = await r.serviceConfiguredEndpoint() : o = await _u(r.serviceId), o && (r.endpoint = () => Promise.resolve(Du(o)), r.isCustomEndpoint = true);
  }
  const n = await Tu(t, e, r);
  if (typeof r.endpointProvider != "function") throw new Error("config.endpointProvider is not set.");
  return r.endpointProvider(n, s);
}, Tu = async (t, e, r) => {
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
      s[i] = await Rg(o.name, i, r, o.type !== "builtInParams")();
      break;
    case "operationContextParams":
      s[i] = o.get(t);
      break;
    default:
      throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(o));
  }
  return Object.keys(n).length === 0 && Object.assign(s, r), String(r.serviceId).toLowerCase() === "s3" && await xg(s), s;
}, _g = ({ config: t, instructions: e }) => (r, s) => async (n) => {
  var _a2, _b2, _c2, _d2;
  t.isCustomEndpoint && nh(s, "ENDPOINT_OVERRIDE", "N");
  const i = await ku(n.input, { getEndpointParameterInstructions() {
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
}, Dg = { step: "serialize", tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"], name: "endpointV2Middleware", override: true, relation: "before", toMiddleware: Gl.name }, qe = (t, e) => ({ applyToStack: (r) => {
  r.addRelativeTo(_g({ config: t, instructions: e }), Dg);
} }), kg = (t) => {
  const e = t.tls ?? true, { endpoint: r, useDualstackEndpoint: s, useFipsEndpoint: n } = t, i = r != null ? async () => Du(await Ne(r)()) : void 0, a = Object.assign(t, { endpoint: i, tls: e, isCustomEndpoint: !!r, useDualstackEndpoint: Ne(s ?? false), useFipsEndpoint: Ne(n ?? false) });
  let c;
  return a.serviceConfiguredEndpoint = async () => (t.serviceId && !c && (c = _u(t.serviceId)), c), a;
};
var Xt;
(function(t) {
  t.STANDARD = "standard", t.ADAPTIVE = "adaptive";
})(Xt || (Xt = {}));
const Xr = 3, Tg = Xt.STANDARD, Og = ["BandwidthLimitExceeded", "EC2ThrottledException", "LimitExceededException", "PriorRequestNotComplete", "ProvisionedThroughputExceededException", "RequestLimitExceeded", "RequestThrottled", "RequestThrottledException", "SlowDown", "ThrottledException", "Throttling", "ThrottlingException", "TooManyRequestsException", "TransactionInProgressException"], Bg = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"], Ig = [500, 502, 503, 504], Mg = ["ECONNRESET", "ECONNREFUSED", "EPIPE", "ETIMEDOUT"], Pg = ["EHOSTUNREACH", "ENETUNREACH", "ENOTFOUND"], Ng = (t) => (t == null ? void 0 : t.$retryable) !== void 0, $g = (t) => {
  var _a2;
  return (_a2 = t.$metadata) == null ? void 0 : _a2.clockSkewCorrected;
}, Ug = (t) => {
  const e = /* @__PURE__ */ new Set(["Failed to fetch", "NetworkError when attempting to fetch resource", "The Internet connection appears to be offline", "Load failed", "Network request failed"]);
  return t && t instanceof TypeError ? e.has(t.message) : false;
}, Ou = (t) => {
  var _a2, _b2;
  return ((_a2 = t.$metadata) == null ? void 0 : _a2.httpStatusCode) === 429 || Og.includes(t.name) || ((_b2 = t.$retryable) == null ? void 0 : _b2.throttling) == true;
}, Ci = (t, e = 0) => {
  var _a2;
  return Ng(t) || $g(t) || Bg.includes(t.name) || Mg.includes((t == null ? void 0 : t.code) || "") || Pg.includes((t == null ? void 0 : t.code) || "") || Ig.includes(((_a2 = t.$metadata) == null ? void 0 : _a2.httpStatusCode) || 0) || Ug(t) || t.cause !== void 0 && e <= 10 && Ci(t.cause, e + 1);
}, Fg = (t) => {
  var _a2;
  if (((_a2 = t.$metadata) == null ? void 0 : _a2.httpStatusCode) !== void 0) {
    const e = t.$metadata.httpStatusCode;
    return 500 <= e && e <= 599 && !Ci(t);
  }
  return false;
};
const _Ai = class _Ai {
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
        await new Promise((s) => _Ai.setTimeoutFn(s, r));
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
    if (this.updateMeasuredRate(), Ou(e)) {
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
__publicField(_Ai, "setTimeoutFn", setTimeout);
let Ai = _Ai;
const ri = 100, Bu = 20 * 1e3, Lg = 500, Uo = 500, Hg = 5, jg = 10, zg = 1, Vg = "amz-sdk-invocation-id", qg = "amz-sdk-request", Gg = () => {
  let t = ri;
  return { computeNextBackoffDelay: (s) => Math.floor(Math.min(Bu, Math.random() * 2 ** s * t)), setDelayBase: (s) => {
    t = s;
  } };
}, Fo = ({ retryDelay: t, retryCount: e, retryCost: r }) => ({ getRetryCount: () => e, getRetryDelay: () => Math.min(Bu, t), getRetryCost: () => r });
class Iu {
  constructor(e) {
    __publicField(this, "maxAttempts");
    __publicField(this, "mode", Xt.STANDARD);
    __publicField(this, "capacity", Uo);
    __publicField(this, "retryBackoffStrategy", Gg());
    __publicField(this, "maxAttemptsProvider");
    this.maxAttempts = e, this.maxAttemptsProvider = typeof e == "function" ? e : async () => e;
  }
  async acquireInitialRetryToken(e) {
    return Fo({ retryDelay: ri, retryCount: 0 });
  }
  async refreshRetryTokenForRetry(e, r) {
    const s = await this.getMaxAttempts();
    if (this.shouldRetry(e, r, s)) {
      const n = r.errorType;
      this.retryBackoffStrategy.setDelayBase(n === "THROTTLING" ? Lg : ri);
      const i = this.retryBackoffStrategy.computeNextBackoffDelay(e.getRetryCount()), o = r.retryAfterHint ? Math.max(r.retryAfterHint.getTime() - Date.now() || 0, i) : i, a = this.getCapacityCost(n);
      return this.capacity -= a, Fo({ retryDelay: o, retryCount: e.getRetryCount() + 1, retryCost: a });
    }
    throw new Error("No retry token available");
  }
  recordSuccess(e) {
    this.capacity = Math.max(Uo, this.capacity + (e.getRetryCost() ?? zg));
  }
  getCapacity() {
    return this.capacity;
  }
  async getMaxAttempts() {
    try {
      return await this.maxAttemptsProvider();
    } catch {
      return console.warn(`Max attempts provider could not resolve. Using default of ${Xr}`), Xr;
    }
  }
  shouldRetry(e, r, s) {
    return e.getRetryCount() + 1 < s && this.capacity >= this.getCapacityCost(r.errorType) && this.isRetryableError(r.errorType);
  }
  getCapacityCost(e) {
    return e === "TRANSIENT" ? jg : Hg;
  }
  isRetryableError(e) {
    return e === "THROTTLING" || e === "TRANSIENT";
  }
}
class Kg {
  constructor(e, r) {
    __publicField(this, "maxAttemptsProvider");
    __publicField(this, "rateLimiter");
    __publicField(this, "standardRetryStrategy");
    __publicField(this, "mode", Xt.ADAPTIVE);
    this.maxAttemptsProvider = e;
    const { rateLimiter: s } = r ?? {};
    this.rateLimiter = s ?? new Ai(), this.standardRetryStrategy = new Iu(e);
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
const Wg = (t) => t instanceof Error ? t : t instanceof Object ? Object.assign(new Error(), t) : typeof t == "string" ? new Error(t) : new Error(`AWS SDK error wrapper for ${t}`), Xg = (t) => {
  const { retryStrategy: e, retryMode: r, maxAttempts: s } = t, n = Ne(s ?? Xr);
  return Object.assign(t, { maxAttempts: n, retryStrategy: async () => e || (await Ne(r)() === Xt.ADAPTIVE ? new Kg(n) : new Iu(n)) });
}, Zg = (t) => (t == null ? void 0 : t.body) instanceof ReadableStream, Qg = (t) => (e, r) => async (s) => {
  var _a2;
  let n = await t.retryStrategy();
  const i = await t.maxAttempts();
  if (Jg(n)) {
    n = n;
    let o = await n.acquireInitialRetryToken(r.partition_id), a = new Error(), c = 0, u = 0;
    const { request: p } = s, l = ee.isInstance(p);
    for (l && (p.headers[Vg] = di()); ; ) try {
      l && (p.headers[qg] = `attempt=${c + 1}; max=${i}`);
      const { response: h, output: m } = await e(s);
      return n.recordSuccess(o), m.$metadata.attempts = c + 1, m.$metadata.totalRetryDelay = u, { response: h, output: m };
    } catch (h) {
      const m = Yg(h);
      if (a = Wg(h), l && Zg(p)) throw (_a2 = r.logger instanceof mi ? console : r.logger) == null ? void 0 : _a2.warn("An error was encountered in a non-retryable streaming request."), a;
      try {
        o = await n.refreshRetryTokenForRetry(o, m);
      } catch {
        throw a.$metadata || (a.$metadata = {}), a.$metadata.attempts = c + 1, a.$metadata.totalRetryDelay = u, a;
      }
      c = o.getRetryCount();
      const y = o.getRetryDelay();
      u += y, await new Promise((x) => setTimeout(x, y));
    }
  } else return n = n, (n == null ? void 0 : n.mode) && (r.userAgent = [...r.userAgent || [], ["cfg/retry-mode", n.mode]]), n.retry(e, s);
}, Jg = (t) => typeof t.acquireInitialRetryToken < "u" && typeof t.refreshRetryTokenForRetry < "u" && typeof t.recordSuccess < "u", Yg = (t) => {
  const e = { error: t, errorType: e0(t) }, r = s0(t.$response);
  return r && (e.retryAfterHint = r), e;
}, e0 = (t) => Ou(t) ? "THROTTLING" : Ci(t) ? "TRANSIENT" : Fg(t) ? "SERVER_ERROR" : "CLIENT_ERROR", t0 = { name: "retryMiddleware", tags: ["RETRY"], step: "finalizeRequest", priority: "high", override: true }, r0 = (t) => ({ applyToStack: (e) => {
  e.add(Qg(t), t0);
} }), s0 = (t) => {
  if (!ct.isInstance(t)) return;
  const e = Object.keys(t.headers).find((i) => i.toLowerCase() === "retry-after");
  if (!e) return;
  const r = t.headers[e], s = Number(r);
  return Number.isNaN(s) ? new Date(r) : new Date(s * 1e3);
};
class vi {
  constructor(e) {
    __publicField(this, "sigv4aSigner");
    __publicField(this, "sigv4Signer");
    __publicField(this, "signerOptions");
    this.sigv4Signer = new im(e), this.signerOptions = e;
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
const Ri = "required", d = "type", E = "rules", g = "conditions", S = "fn", b = "argv", B = "ref", $ = "assign", _ = "url", D = "properties", Ze = "backend", le = "authSchemes", ne = "disableDoubleEncoding", ie = "signingName", he = "signingRegion", k = "headers", _i = "signingRegionSet", n0 = 6, i0 = false, Fe = true, Te = "isSet", Y = "booleanEquals", O = "error", Zr = "aws.partition", j = "stringEquals", Z = "getAttr", Q = "name", G = "substring", Lo = "bucketSuffix", Di = "parseURL", A = "endpoint", C = "tree", Qr = "aws.isVirtualHostableS3Bucket", Jr = "{url#scheme}://{Bucket}.{url#authority}{url#path}", je = "not", Ho = "accessPointSuffix", Hr = "{url#scheme}://{url#authority}{url#path}", Mu = "hardwareType", Pu = "regionPrefix", jo = "bucketAliasSuffix", si = "outpostId", It = "isValidHostLabel", ki = "sigv4a", br = "s3-outposts", Zt = "s3", Nu = "{url#scheme}://{url#authority}{url#normalizedPath}{Bucket}", $u = "https://{Bucket}.s3-accelerate.{partitionResult#dnsSuffix}", zo = "https://{Bucket}.s3.{partitionResult#dnsSuffix}", Uu = "aws.parseArn", Fu = "bucketArn", Lu = "arnType", Yr = "", Ti = "s3-object-lambda", Hu = "accesspoint", Oi = "accessPointName", Vo = "{url#scheme}://{accessPointName}-{bucketArn#accountId}.{url#authority}{url#path}", qo = "mrapPartition", Go = "outpostType", Ko = "arnPrefix", ju = "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}", Wo = "https://s3.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", Xo = "https://s3.{partitionResult#dnsSuffix}", Nt = { [Ri]: false, [d]: "string" }, $t = { [Ri]: true, default: false, [d]: "boolean" }, nr = { [Ri]: false, [d]: "boolean" }, Me = { [S]: Y, [b]: [{ [B]: "Accelerate" }, true] }, W = { [S]: Y, [b]: [{ [B]: "UseFIPS" }, true] }, V = { [S]: Y, [b]: [{ [B]: "UseDualStack" }, true] }, J = { [S]: Te, [b]: [{ [B]: "Endpoint" }] }, zu = { [S]: Zr, [b]: [{ [B]: "Region" }], [$]: "partitionResult" }, Zo = { [S]: j, [b]: [{ [S]: Z, [b]: [{ [B]: "partitionResult" }, Q] }, "aws-cn"] }, dr = { [S]: Te, [b]: [{ [B]: "Bucket" }] }, H = { [B]: "Bucket" }, Qo = { [g]: [Me], [O]: "S3Express does not support S3 Accelerate.", [d]: O }, Jo = { [g]: [J, { [S]: Di, [b]: [{ [B]: "Endpoint" }], [$]: "url" }], [E]: [{ [g]: [{ [S]: Te, [b]: [{ [B]: "DisableS3ExpressSessionAuth" }] }, { [S]: Y, [b]: [{ [B]: "DisableS3ExpressSessionAuth" }, true] }], [E]: [{ [g]: [{ [S]: Y, [b]: [{ [S]: Z, [b]: [{ [B]: "url" }, "isIp"] }, true] }], [E]: [{ [g]: [{ [S]: "uriEncode", [b]: [H], [$]: "uri_encoded_bucket" }], [E]: [{ [A]: { [_]: "{url#scheme}://{url#authority}/{uri_encoded_bucket}{url#path}", [D]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: "s3express", [he]: "{Region}" }] }, [k]: {} }, [d]: A }], [d]: C }], [d]: C }, { [g]: [{ [S]: Qr, [b]: [H, false] }], [E]: [{ [A]: { [_]: Jr, [D]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: "s3express", [he]: "{Region}" }] }, [k]: {} }, [d]: A }], [d]: C }, { [O]: "S3Express bucket name is not a valid virtual hostable name.", [d]: O }], [d]: C }, { [g]: [{ [S]: Y, [b]: [{ [S]: Z, [b]: [{ [B]: "url" }, "isIp"] }, true] }], [E]: [{ [g]: [{ [S]: "uriEncode", [b]: [H], [$]: "uri_encoded_bucket" }], [E]: [{ [A]: { [_]: "{url#scheme}://{url#authority}/{uri_encoded_bucket}{url#path}", [D]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4-s3express", [ie]: "s3express", [he]: "{Region}" }] }, [k]: {} }, [d]: A }], [d]: C }], [d]: C }, { [g]: [{ [S]: Qr, [b]: [H, false] }], [E]: [{ [A]: { [_]: Jr, [D]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4-s3express", [ie]: "s3express", [he]: "{Region}" }] }, [k]: {} }, [d]: A }], [d]: C }, { [O]: "S3Express bucket name is not a valid virtual hostable name.", [d]: O }], [d]: C }, we = { [S]: Di, [b]: [{ [B]: "Endpoint" }], [$]: "url" }, fn = { [S]: Y, [b]: [{ [S]: Z, [b]: [{ [B]: "url" }, "isIp"] }, true] }, Vu = { [B]: "url" }, qu = { [S]: "uriEncode", [b]: [H], [$]: "uri_encoded_bucket" }, ke = { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: "s3express", [he]: "{Region}" }] }, M = {}, Gu = { [S]: Qr, [b]: [H, false] }, Yo = { [O]: "S3Express bucket name is not a valid virtual hostable name.", [d]: O }, ea = { [S]: Te, [b]: [{ [B]: "UseS3ExpressControlEndpoint" }] }, ta = { [S]: Y, [b]: [{ [B]: "UseS3ExpressControlEndpoint" }, true] }, P = { [S]: je, [b]: [J] }, F = { [S]: Y, [b]: [{ [B]: "UseDualStack" }, false] }, U = { [S]: Y, [b]: [{ [B]: "UseFIPS" }, false] }, $r = { [O]: "Unrecognized S3Express bucket name format.", [d]: O }, ra = { [S]: je, [b]: [dr] }, sa = { [B]: Mu }, na = { [g]: [P], [O]: "Expected a endpoint to be specified but no endpoint was found", [d]: O }, Ur = { [le]: [{ [ne]: true, [Q]: ki, [ie]: br, [_i]: ["*"] }, { [ne]: true, [Q]: "sigv4", [ie]: br, [he]: "{Region}" }] }, hn = { [S]: Y, [b]: [{ [B]: "ForcePathStyle" }, false] }, o0 = { [B]: "ForcePathStyle" }, re = { [S]: Y, [b]: [{ [B]: "Accelerate" }, false] }, ae = { [S]: j, [b]: [{ [B]: "Region" }, "aws-global"] }, ce = { [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: Zt, [he]: "us-east-1" }] }, L = { [S]: je, [b]: [ae] }, ue = { [S]: Y, [b]: [{ [B]: "UseGlobalEndpoint" }, true] }, ia = { [_]: "https://{Bucket}.s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}", [D]: { [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: Zt, [he]: "{Region}" }] }, [k]: {} }, oe = { [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: Zt, [he]: "{Region}" }] }, de = { [S]: Y, [b]: [{ [B]: "UseGlobalEndpoint" }, false] }, oa = { [_]: "https://{Bucket}.s3-fips.{Region}.{partitionResult#dnsSuffix}", [D]: oe, [k]: {} }, aa = { [_]: "https://{Bucket}.s3-accelerate.dualstack.{partitionResult#dnsSuffix}", [D]: oe, [k]: {} }, ca = { [_]: "https://{Bucket}.s3.dualstack.{Region}.{partitionResult#dnsSuffix}", [D]: oe, [k]: {} }, pn = { [S]: Y, [b]: [{ [S]: Z, [b]: [Vu, "isIp"] }, false] }, mn = { [_]: Nu, [D]: oe, [k]: {} }, ni = { [_]: Jr, [D]: oe, [k]: {} }, ua = { [A]: ni, [d]: A }, gn = { [_]: $u, [D]: oe, [k]: {} }, da = { [_]: "https://{Bucket}.s3.{Region}.{partitionResult#dnsSuffix}", [D]: oe, [k]: {} }, Fr = { [O]: "Invalid region: region was not a valid DNS name.", [d]: O }, _e = { [B]: Fu }, Ku = { [B]: Lu }, yn = { [S]: Z, [b]: [_e, "service"] }, Bi = { [B]: Oi }, la = { [g]: [V], [O]: "S3 Object Lambda does not support Dual-stack", [d]: O }, fa = { [g]: [Me], [O]: "S3 Object Lambda does not support S3 Accelerate", [d]: O }, ha = { [g]: [{ [S]: Te, [b]: [{ [B]: "DisableAccessPoints" }] }, { [S]: Y, [b]: [{ [B]: "DisableAccessPoints" }, true] }], [O]: "Access points are not supported for this operation", [d]: O }, Sn = { [g]: [{ [S]: Te, [b]: [{ [B]: "UseArnRegion" }] }, { [S]: Y, [b]: [{ [B]: "UseArnRegion" }, false] }, { [S]: je, [b]: [{ [S]: j, [b]: [{ [S]: Z, [b]: [_e, "region"] }, "{Region}"] }] }], [O]: "Invalid configuration: region from ARN `{bucketArn#region}` does not match client region `{Region}` and UseArnRegion is `false`", [d]: O }, Wu = { [S]: Z, [b]: [{ [B]: "bucketPartition" }, Q] }, Xu = { [S]: Z, [b]: [_e, "accountId"] }, bn = { [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: Ti, [he]: "{bucketArn#region}" }] }, pa = { [O]: "Invalid ARN: The access point name may only contain a-z, A-Z, 0-9 and `-`. Found: `{accessPointName}`", [d]: O }, xn = { [O]: "Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and `-`. Found: `{bucketArn#accountId}`", [d]: O }, wn = { [O]: "Invalid region in ARN: `{bucketArn#region}` (invalid DNS name)", [d]: O }, En = { [O]: "Client was configured for partition `{partitionResult#name}` but ARN (`{Bucket}`) has `{bucketPartition#name}`", [d]: O }, ma = { [O]: "Invalid ARN: The ARN may only contain a single resource component after `accesspoint`.", [d]: O }, ga = { [O]: "Invalid ARN: Expected a resource of the format `accesspoint:<accesspoint name>` but no name was provided", [d]: O }, ir = { [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: Zt, [he]: "{bucketArn#region}" }] }, ya = { [le]: [{ [ne]: true, [Q]: ki, [ie]: br, [_i]: ["*"] }, { [ne]: true, [Q]: "sigv4", [ie]: br, [he]: "{bucketArn#region}" }] }, Sa = { [S]: Uu, [b]: [H] }, ba = { [_]: "https://s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [D]: oe, [k]: {} }, xa = { [_]: "https://s3-fips.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [D]: oe, [k]: {} }, wa = { [_]: "https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [D]: oe, [k]: {} }, Cn = { [_]: ju, [D]: oe, [k]: {} }, Ea = { [_]: "https://s3.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [D]: oe, [k]: {} }, Ca = { [B]: "UseObjectLambdaEndpoint" }, An = { [le]: [{ [ne]: true, [Q]: "sigv4", [ie]: Ti, [he]: "{Region}" }] }, Aa = { [_]: "https://s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}", [D]: oe, [k]: {} }, va = { [_]: "https://s3-fips.{Region}.{partitionResult#dnsSuffix}", [D]: oe, [k]: {} }, Ra = { [_]: "https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}", [D]: oe, [k]: {} }, vn = { [_]: Hr, [D]: oe, [k]: {} }, _a = { [_]: "https://s3.{Region}.{partitionResult#dnsSuffix}", [D]: oe, [k]: {} }, Rn = [{ [B]: "Region" }], a0 = [{ [B]: "Endpoint" }], c0 = [H], _n = [Me], Ut = [J, we], Da = [{ [S]: Te, [b]: [{ [B]: "DisableS3ExpressSessionAuth" }] }, { [S]: Y, [b]: [{ [B]: "DisableS3ExpressSessionAuth" }, true] }], u0 = [qu], Dn = [Gu], Ie = [zu], kn = [W, V], lr = [W, F], fr = [U, V], hr = [U, F], ka = [{ [S]: G, [b]: [H, 6, 14, true], [$]: "s3expressAvailabilityZoneId" }, { [S]: G, [b]: [H, 14, 16, true], [$]: "s3expressAvailabilityZoneDelim" }, { [S]: j, [b]: [{ [B]: "s3expressAvailabilityZoneDelim" }, "--"] }], Le = [{ [g]: [W, V], [A]: { [_]: "https://{Bucket}.s3express-fips-{s3expressAvailabilityZoneId}.dualstack.{Region}.{partitionResult#dnsSuffix}", [D]: ke, [k]: {} }, [d]: A }, { [g]: lr, [A]: { [_]: "https://{Bucket}.s3express-fips-{s3expressAvailabilityZoneId}.{Region}.{partitionResult#dnsSuffix}", [D]: ke, [k]: {} }, [d]: A }, { [g]: fr, [A]: { [_]: "https://{Bucket}.s3express-{s3expressAvailabilityZoneId}.dualstack.{Region}.{partitionResult#dnsSuffix}", [D]: ke, [k]: {} }, [d]: A }, { [g]: hr, [A]: { [_]: "https://{Bucket}.s3express-{s3expressAvailabilityZoneId}.{Region}.{partitionResult#dnsSuffix}", [D]: ke, [k]: {} }, [d]: A }], Ta = [{ [S]: G, [b]: [H, 6, 15, true], [$]: "s3expressAvailabilityZoneId" }, { [S]: G, [b]: [H, 15, 17, true], [$]: "s3expressAvailabilityZoneDelim" }, { [S]: j, [b]: [{ [B]: "s3expressAvailabilityZoneDelim" }, "--"] }], Oa = [{ [S]: G, [b]: [H, 6, 19, true], [$]: "s3expressAvailabilityZoneId" }, { [S]: G, [b]: [H, 19, 21, true], [$]: "s3expressAvailabilityZoneDelim" }, { [S]: j, [b]: [{ [B]: "s3expressAvailabilityZoneDelim" }, "--"] }], Ba = [{ [S]: G, [b]: [H, 6, 20, true], [$]: "s3expressAvailabilityZoneId" }, { [S]: G, [b]: [H, 20, 22, true], [$]: "s3expressAvailabilityZoneDelim" }, { [S]: j, [b]: [{ [B]: "s3expressAvailabilityZoneDelim" }, "--"] }], Ia = [{ [S]: G, [b]: [H, 6, 26, true], [$]: "s3expressAvailabilityZoneId" }, { [S]: G, [b]: [H, 26, 28, true], [$]: "s3expressAvailabilityZoneDelim" }, { [S]: j, [b]: [{ [B]: "s3expressAvailabilityZoneDelim" }, "--"] }], He = [{ [g]: [W, V], [A]: { [_]: "https://{Bucket}.s3express-fips-{s3expressAvailabilityZoneId}.dualstack.{Region}.{partitionResult#dnsSuffix}", [D]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4-s3express", [ie]: "s3express", [he]: "{Region}" }] }, [k]: {} }, [d]: A }, { [g]: lr, [A]: { [_]: "https://{Bucket}.s3express-fips-{s3expressAvailabilityZoneId}.{Region}.{partitionResult#dnsSuffix}", [D]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4-s3express", [ie]: "s3express", [he]: "{Region}" }] }, [k]: {} }, [d]: A }, { [g]: fr, [A]: { [_]: "https://{Bucket}.s3express-{s3expressAvailabilityZoneId}.dualstack.{Region}.{partitionResult#dnsSuffix}", [D]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4-s3express", [ie]: "s3express", [he]: "{Region}" }] }, [k]: {} }, [d]: A }, { [g]: hr, [A]: { [_]: "https://{Bucket}.s3express-{s3expressAvailabilityZoneId}.{Region}.{partitionResult#dnsSuffix}", [D]: { [Ze]: "S3Express", [le]: [{ [ne]: true, [Q]: "sigv4-s3express", [ie]: "s3express", [he]: "{Region}" }] }, [k]: {} }, [d]: A }], Ma = [H, 0, 7, true], Pa = [{ [S]: G, [b]: [H, 7, 15, true], [$]: "s3expressAvailabilityZoneId" }, { [S]: G, [b]: [H, 15, 17, true], [$]: "s3expressAvailabilityZoneDelim" }, { [S]: j, [b]: [{ [B]: "s3expressAvailabilityZoneDelim" }, "--"] }], Na = [{ [S]: G, [b]: [H, 7, 16, true], [$]: "s3expressAvailabilityZoneId" }, { [S]: G, [b]: [H, 16, 18, true], [$]: "s3expressAvailabilityZoneDelim" }, { [S]: j, [b]: [{ [B]: "s3expressAvailabilityZoneDelim" }, "--"] }], $a = [{ [S]: G, [b]: [H, 7, 20, true], [$]: "s3expressAvailabilityZoneId" }, { [S]: G, [b]: [H, 20, 22, true], [$]: "s3expressAvailabilityZoneDelim" }, { [S]: j, [b]: [{ [B]: "s3expressAvailabilityZoneDelim" }, "--"] }], Ua = [{ [S]: G, [b]: [H, 7, 21, true], [$]: "s3expressAvailabilityZoneId" }, { [S]: G, [b]: [H, 21, 23, true], [$]: "s3expressAvailabilityZoneDelim" }, { [S]: j, [b]: [{ [B]: "s3expressAvailabilityZoneDelim" }, "--"] }], Fa = [{ [S]: G, [b]: [H, 7, 27, true], [$]: "s3expressAvailabilityZoneId" }, { [S]: G, [b]: [H, 27, 29, true], [$]: "s3expressAvailabilityZoneDelim" }, { [S]: j, [b]: [{ [B]: "s3expressAvailabilityZoneDelim" }, "--"] }], d0 = [dr], La = [{ [S]: It, [b]: [{ [B]: si }, false] }], Ha = [{ [S]: j, [b]: [{ [B]: Pu }, "beta"] }], l0 = ["*"], ja = [{ [S]: It, [b]: [{ [B]: "Region" }, false] }], st = [{ [S]: j, [b]: [{ [B]: "Region" }, "us-east-1"] }], Tn = [{ [S]: j, [b]: [Ku, Hu] }], za = [{ [S]: Z, [b]: [_e, "resourceId[1]"], [$]: Oi }, { [S]: je, [b]: [{ [S]: j, [b]: [Bi, Yr] }] }], f0 = [_e, "resourceId[1]"], Va = [V], On = [{ [S]: je, [b]: [{ [S]: j, [b]: [{ [S]: Z, [b]: [_e, "region"] }, Yr] }] }], qa = [{ [S]: je, [b]: [{ [S]: Te, [b]: [{ [S]: Z, [b]: [_e, "resourceId[2]"] }] }] }], h0 = [_e, "resourceId[2]"], Bn = [{ [S]: Zr, [b]: [{ [S]: Z, [b]: [_e, "region"] }], [$]: "bucketPartition" }], Ga = [{ [S]: j, [b]: [Wu, { [S]: Z, [b]: [{ [B]: "partitionResult" }, Q] }] }], In = [{ [S]: It, [b]: [{ [S]: Z, [b]: [_e, "region"] }, true] }], Mn = [{ [S]: It, [b]: [Xu, false] }], Ka = [{ [S]: It, [b]: [Bi, false] }], Lr = [W], Wa = [{ [S]: It, [b]: [{ [B]: "Region" }, true] }], p0 = { parameters: { Bucket: Nt, Region: Nt, UseFIPS: $t, UseDualStack: $t, Endpoint: Nt, ForcePathStyle: $t, Accelerate: $t, UseGlobalEndpoint: $t, UseObjectLambdaEndpoint: nr, Key: Nt, Prefix: Nt, CopySource: Nt, DisableAccessPoints: nr, DisableMultiRegionAccessPoints: $t, UseArnRegion: nr, UseS3ExpressControlEndpoint: nr, DisableS3ExpressSessionAuth: nr }, [E]: [{ [g]: [{ [S]: Te, [b]: Rn }], [E]: [{ [g]: [Me, W], error: "Accelerate cannot be used with FIPS", [d]: O }, { [g]: [V, J], error: "Cannot set dual-stack in combination with a custom endpoint.", [d]: O }, { [g]: [J, W], error: "A custom endpoint cannot be combined with FIPS", [d]: O }, { [g]: [J, Me], error: "A custom endpoint cannot be combined with S3 Accelerate", [d]: O }, { [g]: [W, zu, Zo], error: "Partition does not support FIPS", [d]: O }, { [g]: [dr, { [S]: G, [b]: [H, 0, n0, Fe], [$]: Lo }, { [S]: j, [b]: [{ [B]: Lo }, "--x-s3"] }], [E]: [Qo, Jo, { [g]: [ea, ta], [E]: [{ [g]: Ie, [E]: [{ [g]: [qu, P], [E]: [{ [g]: kn, endpoint: { [_]: "https://s3express-control-fips.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [D]: ke, [k]: M }, [d]: A }, { [g]: lr, endpoint: { [_]: "https://s3express-control-fips.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [D]: ke, [k]: M }, [d]: A }, { [g]: fr, endpoint: { [_]: "https://s3express-control.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [D]: ke, [k]: M }, [d]: A }, { [g]: hr, endpoint: { [_]: "https://s3express-control.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [D]: ke, [k]: M }, [d]: A }], [d]: C }], [d]: C }], [d]: C }, { [g]: Dn, [E]: [{ [g]: Ie, [E]: [{ [g]: Da, [E]: [{ [g]: ka, [E]: Le, [d]: C }, { [g]: Ta, [E]: Le, [d]: C }, { [g]: Oa, [E]: Le, [d]: C }, { [g]: Ba, [E]: Le, [d]: C }, { [g]: Ia, [E]: Le, [d]: C }, $r], [d]: C }, { [g]: ka, [E]: He, [d]: C }, { [g]: Ta, [E]: He, [d]: C }, { [g]: Oa, [E]: He, [d]: C }, { [g]: Ba, [E]: He, [d]: C }, { [g]: Ia, [E]: He, [d]: C }, $r], [d]: C }], [d]: C }, Yo], [d]: C }, { [g]: [dr, { [S]: G, [b]: Ma, [$]: Ho }, { [S]: j, [b]: [{ [B]: Ho }, "--xa-s3"] }], [E]: [Qo, Jo, { [g]: Dn, [E]: [{ [g]: Ie, [E]: [{ [g]: Da, [E]: [{ [g]: Pa, [E]: Le, [d]: C }, { [g]: Na, [E]: Le, [d]: C }, { [g]: $a, [E]: Le, [d]: C }, { [g]: Ua, [E]: Le, [d]: C }, { [g]: Fa, [E]: Le, [d]: C }, $r], [d]: C }, { [g]: Pa, [E]: He, [d]: C }, { [g]: Na, [E]: He, [d]: C }, { [g]: $a, [E]: He, [d]: C }, { [g]: Ua, [E]: He, [d]: C }, { [g]: Fa, [E]: He, [d]: C }, $r], [d]: C }], [d]: C }, Yo], [d]: C }, { [g]: [ra, ea, ta], [E]: [{ [g]: Ie, [E]: [{ [g]: Ut, endpoint: { [_]: Hr, [D]: ke, [k]: M }, [d]: A }, { [g]: kn, endpoint: { [_]: "https://s3express-control-fips.dualstack.{Region}.{partitionResult#dnsSuffix}", [D]: ke, [k]: M }, [d]: A }, { [g]: lr, endpoint: { [_]: "https://s3express-control-fips.{Region}.{partitionResult#dnsSuffix}", [D]: ke, [k]: M }, [d]: A }, { [g]: fr, endpoint: { [_]: "https://s3express-control.dualstack.{Region}.{partitionResult#dnsSuffix}", [D]: ke, [k]: M }, [d]: A }, { [g]: hr, endpoint: { [_]: "https://s3express-control.{Region}.{partitionResult#dnsSuffix}", [D]: ke, [k]: M }, [d]: A }], [d]: C }], [d]: C }, { [g]: [dr, { [S]: G, [b]: [H, 49, 50, Fe], [$]: Mu }, { [S]: G, [b]: [H, 8, 12, Fe], [$]: Pu }, { [S]: G, [b]: Ma, [$]: jo }, { [S]: G, [b]: [H, 32, 49, Fe], [$]: si }, { [S]: Zr, [b]: Rn, [$]: "regionPartition" }, { [S]: j, [b]: [{ [B]: jo }, "--op-s3"] }], [E]: [{ [g]: La, [E]: [{ [g]: Dn, [E]: [{ [g]: [{ [S]: j, [b]: [sa, "e"] }], [E]: [{ [g]: Ha, [E]: [na, { [g]: Ut, endpoint: { [_]: "https://{Bucket}.ec2.{url#authority}", [D]: Ur, [k]: M }, [d]: A }], [d]: C }, { endpoint: { [_]: "https://{Bucket}.ec2.s3-outposts.{Region}.{regionPartition#dnsSuffix}", [D]: Ur, [k]: M }, [d]: A }], [d]: C }, { [g]: [{ [S]: j, [b]: [sa, "o"] }], [E]: [{ [g]: Ha, [E]: [na, { [g]: Ut, endpoint: { [_]: "https://{Bucket}.op-{outpostId}.{url#authority}", [D]: Ur, [k]: M }, [d]: A }], [d]: C }, { endpoint: { [_]: "https://{Bucket}.op-{outpostId}.s3-outposts.{Region}.{regionPartition#dnsSuffix}", [D]: Ur, [k]: M }, [d]: A }], [d]: C }, { error: 'Unrecognized hardware type: "Expected hardware type o or e but got {hardwareType}"', [d]: O }], [d]: C }, { error: "Invalid Outposts Bucket alias - it must be a valid bucket name.", [d]: O }], [d]: C }, { error: "Invalid ARN: The outpost Id must only contain a-z, A-Z, 0-9 and `-`.", [d]: O }], [d]: C }, { [g]: d0, [E]: [{ [g]: [J, { [S]: je, [b]: [{ [S]: Te, [b]: [{ [S]: Di, [b]: a0 }] }] }], error: "Custom endpoint `{Endpoint}` was not a valid URI", [d]: O }, { [g]: [hn, Gu], [E]: [{ [g]: Ie, [E]: [{ [g]: ja, [E]: [{ [g]: [Me, Zo], error: "S3 Accelerate cannot be used in this region", [d]: O }, { [g]: [V, W, re, P, ae], endpoint: { [_]: "https://{Bucket}.s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}", [D]: ce, [k]: M }, [d]: A }, { [g]: [V, W, re, P, L, ue], [E]: [{ endpoint: ia, [d]: A }], [d]: C }, { [g]: [V, W, re, P, L, de], endpoint: ia, [d]: A }, { [g]: [F, W, re, P, ae], endpoint: { [_]: "https://{Bucket}.s3-fips.us-east-1.{partitionResult#dnsSuffix}", [D]: ce, [k]: M }, [d]: A }, { [g]: [F, W, re, P, L, ue], [E]: [{ endpoint: oa, [d]: A }], [d]: C }, { [g]: [F, W, re, P, L, de], endpoint: oa, [d]: A }, { [g]: [V, U, Me, P, ae], endpoint: { [_]: "https://{Bucket}.s3-accelerate.dualstack.us-east-1.{partitionResult#dnsSuffix}", [D]: ce, [k]: M }, [d]: A }, { [g]: [V, U, Me, P, L, ue], [E]: [{ endpoint: aa, [d]: A }], [d]: C }, { [g]: [V, U, Me, P, L, de], endpoint: aa, [d]: A }, { [g]: [V, U, re, P, ae], endpoint: { [_]: "https://{Bucket}.s3.dualstack.us-east-1.{partitionResult#dnsSuffix}", [D]: ce, [k]: M }, [d]: A }, { [g]: [V, U, re, P, L, ue], [E]: [{ endpoint: ca, [d]: A }], [d]: C }, { [g]: [V, U, re, P, L, de], endpoint: ca, [d]: A }, { [g]: [F, U, re, J, we, fn, ae], endpoint: { [_]: Nu, [D]: ce, [k]: M }, [d]: A }, { [g]: [F, U, re, J, we, pn, ae], endpoint: { [_]: Jr, [D]: ce, [k]: M }, [d]: A }, { [g]: [F, U, re, J, we, fn, L, ue], [E]: [{ [g]: st, endpoint: mn, [d]: A }, { endpoint: mn, [d]: A }], [d]: C }, { [g]: [F, U, re, J, we, pn, L, ue], [E]: [{ [g]: st, endpoint: ni, [d]: A }, ua], [d]: C }, { [g]: [F, U, re, J, we, fn, L, de], endpoint: mn, [d]: A }, { [g]: [F, U, re, J, we, pn, L, de], endpoint: ni, [d]: A }, { [g]: [F, U, Me, P, ae], endpoint: { [_]: $u, [D]: ce, [k]: M }, [d]: A }, { [g]: [F, U, Me, P, L, ue], [E]: [{ [g]: st, endpoint: gn, [d]: A }, { endpoint: gn, [d]: A }], [d]: C }, { [g]: [F, U, Me, P, L, de], endpoint: gn, [d]: A }, { [g]: [F, U, re, P, ae], endpoint: { [_]: zo, [D]: ce, [k]: M }, [d]: A }, { [g]: [F, U, re, P, L, ue], [E]: [{ [g]: st, endpoint: { [_]: zo, [D]: oe, [k]: M }, [d]: A }, { endpoint: da, [d]: A }], [d]: C }, { [g]: [F, U, re, P, L, de], endpoint: da, [d]: A }], [d]: C }, Fr], [d]: C }], [d]: C }, { [g]: [J, we, { [S]: j, [b]: [{ [S]: Z, [b]: [Vu, "scheme"] }, "http"] }, { [S]: Qr, [b]: [H, Fe] }, hn, U, F, re], [E]: [{ [g]: Ie, [E]: [{ [g]: ja, [E]: [ua], [d]: C }, Fr], [d]: C }], [d]: C }, { [g]: [hn, { [S]: Uu, [b]: c0, [$]: Fu }], [E]: [{ [g]: [{ [S]: Z, [b]: [_e, "resourceId[0]"], [$]: Lu }, { [S]: je, [b]: [{ [S]: j, [b]: [Ku, Yr] }] }], [E]: [{ [g]: [{ [S]: j, [b]: [yn, Ti] }], [E]: [{ [g]: Tn, [E]: [{ [g]: za, [E]: [la, fa, { [g]: On, [E]: [ha, { [g]: qa, [E]: [Sn, { [g]: Bn, [E]: [{ [g]: Ie, [E]: [{ [g]: Ga, [E]: [{ [g]: In, [E]: [{ [g]: [{ [S]: j, [b]: [Xu, Yr] }], error: "Invalid ARN: Missing account id", [d]: O }, { [g]: Mn, [E]: [{ [g]: Ka, [E]: [{ [g]: Ut, endpoint: { [_]: Vo, [D]: bn, [k]: M }, [d]: A }, { [g]: Lr, endpoint: { [_]: "https://{accessPointName}-{bucketArn#accountId}.s3-object-lambda-fips.{bucketArn#region}.{bucketPartition#dnsSuffix}", [D]: bn, [k]: M }, [d]: A }, { endpoint: { [_]: "https://{accessPointName}-{bucketArn#accountId}.s3-object-lambda.{bucketArn#region}.{bucketPartition#dnsSuffix}", [D]: bn, [k]: M }, [d]: A }], [d]: C }, pa], [d]: C }, xn], [d]: C }, wn], [d]: C }, En], [d]: C }], [d]: C }], [d]: C }, ma], [d]: C }, { error: "Invalid ARN: bucket ARN is missing a region", [d]: O }], [d]: C }, ga], [d]: C }, { error: "Invalid ARN: Object Lambda ARNs only support `accesspoint` arn types, but found: `{arnType}`", [d]: O }], [d]: C }, { [g]: Tn, [E]: [{ [g]: za, [E]: [{ [g]: On, [E]: [{ [g]: Tn, [E]: [{ [g]: On, [E]: [ha, { [g]: qa, [E]: [Sn, { [g]: Bn, [E]: [{ [g]: Ie, [E]: [{ [g]: [{ [S]: j, [b]: [Wu, "{partitionResult#name}"] }], [E]: [{ [g]: In, [E]: [{ [g]: [{ [S]: j, [b]: [yn, Zt] }], [E]: [{ [g]: Mn, [E]: [{ [g]: Ka, [E]: [{ [g]: _n, error: "Access Points do not support S3 Accelerate", [d]: O }, { [g]: kn, endpoint: { [_]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint-fips.dualstack.{bucketArn#region}.{bucketPartition#dnsSuffix}", [D]: ir, [k]: M }, [d]: A }, { [g]: lr, endpoint: { [_]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint-fips.{bucketArn#region}.{bucketPartition#dnsSuffix}", [D]: ir, [k]: M }, [d]: A }, { [g]: fr, endpoint: { [_]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint.dualstack.{bucketArn#region}.{bucketPartition#dnsSuffix}", [D]: ir, [k]: M }, [d]: A }, { [g]: [U, F, J, we], endpoint: { [_]: Vo, [D]: ir, [k]: M }, [d]: A }, { [g]: hr, endpoint: { [_]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint.{bucketArn#region}.{bucketPartition#dnsSuffix}", [D]: ir, [k]: M }, [d]: A }], [d]: C }, pa], [d]: C }, xn], [d]: C }, { error: "Invalid ARN: The ARN was not for the S3 service, found: {bucketArn#service}", [d]: O }], [d]: C }, wn], [d]: C }, En], [d]: C }], [d]: C }], [d]: C }, ma], [d]: C }], [d]: C }], [d]: C }, { [g]: [{ [S]: It, [b]: [Bi, Fe] }], [E]: [{ [g]: Va, error: "S3 MRAP does not support dual-stack", [d]: O }, { [g]: Lr, error: "S3 MRAP does not support FIPS", [d]: O }, { [g]: _n, error: "S3 MRAP does not support S3 Accelerate", [d]: O }, { [g]: [{ [S]: Y, [b]: [{ [B]: "DisableMultiRegionAccessPoints" }, Fe] }], error: "Invalid configuration: Multi-Region Access Point ARNs are disabled.", [d]: O }, { [g]: [{ [S]: Zr, [b]: Rn, [$]: qo }], [E]: [{ [g]: [{ [S]: j, [b]: [{ [S]: Z, [b]: [{ [B]: qo }, Q] }, { [S]: Z, [b]: [_e, "partition"] }] }], [E]: [{ endpoint: { [_]: "https://{accessPointName}.accesspoint.s3-global.{mrapPartition#dnsSuffix}", [D]: { [le]: [{ [ne]: Fe, name: ki, [ie]: Zt, [_i]: l0 }] }, [k]: M }, [d]: A }], [d]: C }, { error: "Client was configured for partition `{mrapPartition#name}` but bucket referred to partition `{bucketArn#partition}`", [d]: O }], [d]: C }], [d]: C }, { error: "Invalid Access Point Name", [d]: O }], [d]: C }, ga], [d]: C }, { [g]: [{ [S]: j, [b]: [yn, br] }], [E]: [{ [g]: Va, error: "S3 Outposts does not support Dual-stack", [d]: O }, { [g]: Lr, error: "S3 Outposts does not support FIPS", [d]: O }, { [g]: _n, error: "S3 Outposts does not support S3 Accelerate", [d]: O }, { [g]: [{ [S]: Te, [b]: [{ [S]: Z, [b]: [_e, "resourceId[4]"] }] }], error: "Invalid Arn: Outpost Access Point ARN contains sub resources", [d]: O }, { [g]: [{ [S]: Z, [b]: f0, [$]: si }], [E]: [{ [g]: La, [E]: [Sn, { [g]: Bn, [E]: [{ [g]: Ie, [E]: [{ [g]: Ga, [E]: [{ [g]: In, [E]: [{ [g]: Mn, [E]: [{ [g]: [{ [S]: Z, [b]: h0, [$]: Go }], [E]: [{ [g]: [{ [S]: Z, [b]: [_e, "resourceId[3]"], [$]: Oi }], [E]: [{ [g]: [{ [S]: j, [b]: [{ [B]: Go }, Hu] }], [E]: [{ [g]: Ut, endpoint: { [_]: "https://{accessPointName}-{bucketArn#accountId}.{outpostId}.{url#authority}", [D]: ya, [k]: M }, [d]: A }, { endpoint: { [_]: "https://{accessPointName}-{bucketArn#accountId}.{outpostId}.s3-outposts.{bucketArn#region}.{bucketPartition#dnsSuffix}", [D]: ya, [k]: M }, [d]: A }], [d]: C }, { error: "Expected an outpost type `accesspoint`, found {outpostType}", [d]: O }], [d]: C }, { error: "Invalid ARN: expected an access point name", [d]: O }], [d]: C }, { error: "Invalid ARN: Expected a 4-component resource", [d]: O }], [d]: C }, xn], [d]: C }, wn], [d]: C }, En], [d]: C }], [d]: C }], [d]: C }, { error: "Invalid ARN: The outpost Id may only contain a-z, A-Z, 0-9 and `-`. Found: `{outpostId}`", [d]: O }], [d]: C }, { error: "Invalid ARN: The Outpost Id was not set", [d]: O }], [d]: C }, { error: "Invalid ARN: Unrecognized format: {Bucket} (type: {arnType})", [d]: O }], [d]: C }, { error: "Invalid ARN: No ARN type specified", [d]: O }], [d]: C }, { [g]: [{ [S]: G, [b]: [H, 0, 4, i0], [$]: Ko }, { [S]: j, [b]: [{ [B]: Ko }, "arn:"] }, { [S]: je, [b]: [{ [S]: Te, [b]: [Sa] }] }], error: "Invalid ARN: `{Bucket}` was not a valid ARN", [d]: O }, { [g]: [{ [S]: Y, [b]: [o0, Fe] }, Sa], error: "Path-style addressing cannot be used with ARN buckets", [d]: O }, { [g]: u0, [E]: [{ [g]: Ie, [E]: [{ [g]: [re], [E]: [{ [g]: [V, P, W, ae], endpoint: { [_]: "https://s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [D]: ce, [k]: M }, [d]: A }, { [g]: [V, P, W, L, ue], [E]: [{ endpoint: ba, [d]: A }], [d]: C }, { [g]: [V, P, W, L, de], endpoint: ba, [d]: A }, { [g]: [F, P, W, ae], endpoint: { [_]: "https://s3-fips.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [D]: ce, [k]: M }, [d]: A }, { [g]: [F, P, W, L, ue], [E]: [{ endpoint: xa, [d]: A }], [d]: C }, { [g]: [F, P, W, L, de], endpoint: xa, [d]: A }, { [g]: [V, P, U, ae], endpoint: { [_]: "https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [D]: ce, [k]: M }, [d]: A }, { [g]: [V, P, U, L, ue], [E]: [{ endpoint: wa, [d]: A }], [d]: C }, { [g]: [V, P, U, L, de], endpoint: wa, [d]: A }, { [g]: [F, J, we, U, ae], endpoint: { [_]: ju, [D]: ce, [k]: M }, [d]: A }, { [g]: [F, J, we, U, L, ue], [E]: [{ [g]: st, endpoint: Cn, [d]: A }, { endpoint: Cn, [d]: A }], [d]: C }, { [g]: [F, J, we, U, L, de], endpoint: Cn, [d]: A }, { [g]: [F, P, U, ae], endpoint: { [_]: Wo, [D]: ce, [k]: M }, [d]: A }, { [g]: [F, P, U, L, ue], [E]: [{ [g]: st, endpoint: { [_]: Wo, [D]: oe, [k]: M }, [d]: A }, { endpoint: Ea, [d]: A }], [d]: C }, { [g]: [F, P, U, L, de], endpoint: Ea, [d]: A }], [d]: C }, { error: "Path-style addressing cannot be used with S3 Accelerate", [d]: O }], [d]: C }], [d]: C }], [d]: C }, { [g]: [{ [S]: Te, [b]: [Ca] }, { [S]: Y, [b]: [Ca, Fe] }], [E]: [{ [g]: Ie, [E]: [{ [g]: Wa, [E]: [la, fa, { [g]: Ut, endpoint: { [_]: Hr, [D]: An, [k]: M }, [d]: A }, { [g]: Lr, endpoint: { [_]: "https://s3-object-lambda-fips.{Region}.{partitionResult#dnsSuffix}", [D]: An, [k]: M }, [d]: A }, { endpoint: { [_]: "https://s3-object-lambda.{Region}.{partitionResult#dnsSuffix}", [D]: An, [k]: M }, [d]: A }], [d]: C }, Fr], [d]: C }], [d]: C }, { [g]: [ra], [E]: [{ [g]: Ie, [E]: [{ [g]: Wa, [E]: [{ [g]: [W, V, P, ae], endpoint: { [_]: "https://s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}", [D]: ce, [k]: M }, [d]: A }, { [g]: [W, V, P, L, ue], [E]: [{ endpoint: Aa, [d]: A }], [d]: C }, { [g]: [W, V, P, L, de], endpoint: Aa, [d]: A }, { [g]: [W, F, P, ae], endpoint: { [_]: "https://s3-fips.us-east-1.{partitionResult#dnsSuffix}", [D]: ce, [k]: M }, [d]: A }, { [g]: [W, F, P, L, ue], [E]: [{ endpoint: va, [d]: A }], [d]: C }, { [g]: [W, F, P, L, de], endpoint: va, [d]: A }, { [g]: [U, V, P, ae], endpoint: { [_]: "https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}", [D]: ce, [k]: M }, [d]: A }, { [g]: [U, V, P, L, ue], [E]: [{ endpoint: Ra, [d]: A }], [d]: C }, { [g]: [U, V, P, L, de], endpoint: Ra, [d]: A }, { [g]: [U, F, J, we, ae], endpoint: { [_]: Hr, [D]: ce, [k]: M }, [d]: A }, { [g]: [U, F, J, we, L, ue], [E]: [{ [g]: st, endpoint: vn, [d]: A }, { endpoint: vn, [d]: A }], [d]: C }, { [g]: [U, F, J, we, L, de], endpoint: vn, [d]: A }, { [g]: [U, F, P, ae], endpoint: { [_]: Xo, [D]: ce, [k]: M }, [d]: A }, { [g]: [U, F, P, L, ue], [E]: [{ [g]: st, endpoint: { [_]: Xo, [D]: oe, [k]: M }, [d]: A }, { endpoint: _a, [d]: A }], [d]: C }, { [g]: [U, F, P, L, de], endpoint: _a, [d]: A }], [d]: C }, Fr], [d]: C }], [d]: C }], [d]: C }, { error: "A region must be set when sending requests to S3.", [d]: O }] }, m0 = p0, g0 = new km({ size: 50, params: ["Accelerate", "Bucket", "DisableAccessPoints", "DisableMultiRegionAccessPoints", "DisableS3ExpressSessionAuth", "Endpoint", "ForcePathStyle", "Region", "UseArnRegion", "UseDualStack", "UseFIPS", "UseGlobalEndpoint", "UseObjectLambdaEndpoint", "UseS3ExpressControlEndpoint"] }), Zu = (t, e = {}) => g0.get(t, () => Wm(m0, { endpointParams: t, logger: e.logger }));
Kr.aws = vu;
const y0 = (t) => async (e, r, s) => {
  var _a2, _b2, _c2;
  if (!s) throw new Error("Could not find `input` for `defaultEndpointRuleSetHttpAuthSchemeParametersProvider`");
  const n = await t(e, r, s), i = (_c2 = (_b2 = (_a2 = ft(r)) == null ? void 0 : _a2.commandInstance) == null ? void 0 : _b2.constructor) == null ? void 0 : _c2.getEndpointParameterInstructions;
  if (!i) throw new Error(`getEndpointParameterInstructions() is not defined on '${r.commandName}'`);
  const o = await Tu(s, { getEndpointParameterInstructions: i }, e);
  return Object.assign(n, o);
}, S0 = async (t, e, r) => ({ operation: ft(e).operation, region: await Ne(t.region)() || (() => {
  throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
})() }), b0 = y0(S0);
function Qu(t) {
  return { schemeId: "aws.auth#sigv4", signingProperties: { name: "s3", region: t.region }, propertiesExtractor: (e, r) => ({ signingProperties: { config: e, context: r } }) };
}
function Ju(t) {
  return { schemeId: "aws.auth#sigv4a", signingProperties: { name: "s3", region: t.region }, propertiesExtractor: (e, r) => ({ signingProperties: { config: e, context: r } }) };
}
const x0 = (t, e, r) => (n) => {
  var _a2;
  const o = (_a2 = t(n).properties) == null ? void 0 : _a2.authSchemes;
  if (!o) return e(n);
  const a = [];
  for (const c of o) {
    const { name: u, properties: p = {}, ...l } = c, h = u.toLowerCase();
    u !== h && console.warn(`HttpAuthScheme has been normalized with lowercasing: '${u}' to '${h}'`);
    let m;
    if (h === "sigv4a") {
      m = "aws.auth#sigv4a";
      const w = o.find((R) => {
        const v = R.name.toLowerCase();
        return v !== "sigv4a" && v.startsWith("sigv4");
      });
      if (vi.sigv4aDependency() === "none" && w) continue;
    } else if (h.startsWith("sigv4")) m = "aws.auth#sigv4";
    else throw new Error(`Unknown HttpAuthScheme found in '@smithy.rules#endpointRuleSet': '${h}'`);
    const y = r[m];
    if (!y) throw new Error(`Could not find HttpAuthOption create function for '${m}'`);
    const x = y(n);
    x.schemeId = m, x.signingProperties = { ...x.signingProperties || {}, ...l, ...p }, a.push(x);
  }
  return a;
}, w0 = (t) => {
  const e = [];
  switch (t.operation) {
    default:
      e.push(Qu(t)), e.push(Ju(t));
  }
  return e;
}, E0 = x0(Zu, w0, { "aws.auth#sigv4": Qu, "aws.auth#sigv4a": Ju }), C0 = (t) => {
  const e = $h(t), r = lh(e);
  return Object.assign(r, { authSchemePreference: Ne(t.authSchemePreference ?? []) });
}, A0 = (t) => Object.assign(t, { useFipsEndpoint: t.useFipsEndpoint ?? false, useDualstackEndpoint: t.useDualstackEndpoint ?? false, forcePathStyle: t.forcePathStyle ?? false, useAccelerateEndpoint: t.useAccelerateEndpoint ?? false, useGlobalEndpoint: t.useGlobalEndpoint ?? false, disableMultiregionAccessPoints: t.disableMultiregionAccessPoints ?? false, defaultSigningName: "s3", clientContextParams: t.clientContextParams ?? {} }), Ge = { ForcePathStyle: { type: "clientContextParams", name: "forcePathStyle" }, UseArnRegion: { type: "clientContextParams", name: "useArnRegion" }, DisableMultiRegionAccessPoints: { type: "clientContextParams", name: "disableMultiregionAccessPoints" }, Accelerate: { type: "clientContextParams", name: "useAccelerateEndpoint" }, DisableS3ExpressSessionAuth: { type: "clientContextParams", name: "disableS3ExpressSessionAuth" }, UseGlobalEndpoint: { type: "builtInParams", name: "useGlobalEndpoint" }, UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" }, Endpoint: { type: "builtInParams", name: "endpoint" }, Region: { type: "builtInParams", name: "region" }, UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" } };
class fe extends Lt {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, fe.prototype);
  }
}
class Ii extends fe {
  constructor(e) {
    super({ name: "NoSuchUpload", $fault: "client", ...e });
    __publicField(this, "name", "NoSuchUpload");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Ii.prototype);
  }
}
class Mi extends fe {
  constructor(e) {
    super({ name: "AccessDenied", $fault: "client", ...e });
    __publicField(this, "name", "AccessDenied");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Mi.prototype);
  }
}
class Pi extends fe {
  constructor(e) {
    super({ name: "ObjectNotInActiveTierError", $fault: "client", ...e });
    __publicField(this, "name", "ObjectNotInActiveTierError");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Pi.prototype);
  }
}
class Ni extends fe {
  constructor(e) {
    super({ name: "BucketAlreadyExists", $fault: "client", ...e });
    __publicField(this, "name", "BucketAlreadyExists");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Ni.prototype);
  }
}
class $i extends fe {
  constructor(e) {
    super({ name: "BucketAlreadyOwnedByYou", $fault: "client", ...e });
    __publicField(this, "name", "BucketAlreadyOwnedByYou");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, $i.prototype);
  }
}
class Ui extends fe {
  constructor(e) {
    super({ name: "NoSuchBucket", $fault: "client", ...e });
    __publicField(this, "name", "NoSuchBucket");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Ui.prototype);
  }
}
class Fi extends fe {
  constructor(e) {
    super({ name: "InvalidObjectState", $fault: "client", ...e });
    __publicField(this, "name", "InvalidObjectState");
    __publicField(this, "$fault", "client");
    __publicField(this, "StorageClass");
    __publicField(this, "AccessTier");
    Object.setPrototypeOf(this, Fi.prototype), this.StorageClass = e.StorageClass, this.AccessTier = e.AccessTier;
  }
}
class Li extends fe {
  constructor(e) {
    super({ name: "NoSuchKey", $fault: "client", ...e });
    __publicField(this, "name", "NoSuchKey");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Li.prototype);
  }
}
class Hi extends fe {
  constructor(e) {
    super({ name: "NotFound", $fault: "client", ...e });
    __publicField(this, "name", "NotFound");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Hi.prototype);
  }
}
class ji extends fe {
  constructor(e) {
    super({ name: "EncryptionTypeMismatch", $fault: "client", ...e });
    __publicField(this, "name", "EncryptionTypeMismatch");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, ji.prototype);
  }
}
class zi extends fe {
  constructor(e) {
    super({ name: "InvalidRequest", $fault: "client", ...e });
    __publicField(this, "name", "InvalidRequest");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, zi.prototype);
  }
}
class Vi extends fe {
  constructor(e) {
    super({ name: "InvalidWriteOffset", $fault: "client", ...e });
    __publicField(this, "name", "InvalidWriteOffset");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Vi.prototype);
  }
}
class qi extends fe {
  constructor(e) {
    super({ name: "TooManyParts", $fault: "client", ...e });
    __publicField(this, "name", "TooManyParts");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, qi.prototype);
  }
}
class Gi extends fe {
  constructor(e) {
    super({ name: "IdempotencyParameterMismatch", $fault: "client", ...e });
    __publicField(this, "name", "IdempotencyParameterMismatch");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Gi.prototype);
  }
}
class Ki extends fe {
  constructor(e) {
    super({ name: "ObjectAlreadyInActiveTierError", $fault: "client", ...e });
    __publicField(this, "name", "ObjectAlreadyInActiveTierError");
    __publicField(this, "$fault", "client");
    Object.setPrototypeOf(this, Ki.prototype);
  }
}
const Yu = "ACL", v0 = "AccessDenied", Xa = "AccessKeyId", ed = "AcceptRanges", R0 = "ArchiveStatus", _0 = "AccessTier", Ke = "Bucket", D0 = "BucketAlreadyExists", k0 = "BucketAlreadyOwnedByYou", td = "BypassGovernanceRetention", ht = "BucketKeyEnabled", rd = "Body", Er = "ChecksumAlgorithm", as = "CacheControl", Cr = "ChecksumCRC32", Ar = "ChecksumCRC32C", vr = "ChecksumCRC64NVME", cs = "Cache-Control", us = "Content-Disposition", ds = "ContentDisposition", ls = "Content-Encoding", fs = "ContentEncoding", hs = "ContentLanguage", ps = "Content-Language", Wi = "Content-Length", Xi = "ContentLength", T0 = "Content-MD5", O0 = "ContentMD5", sd = "ChecksumMode", B0 = "CopyObject", I0 = "CopyObjectOutput", nd = "CopyObjectResult", M0 = "CopyObjectRequest", P0 = "CommonPrefix", N0 = "CommonPrefixList", id = "CommonPrefixes", od = "ContentRange", ad = "Content-Range", $0 = "CopySource", Rr = "ChecksumSHA1", _r = "ChecksumSHA256", U0 = "CopySourceIfMatch", F0 = "CopySourceIfModifiedSince", L0 = "CopySourceIfNoneMatch", H0 = "CopySourceIfUnmodifiedSince", j0 = "CreateSessionOutput", z0 = "CreateSessionResult", V0 = "CreateSessionRequest", q0 = "CopySourceSSECustomerAlgorithm", cd = "CopySourceSSECustomerKey", G0 = "CopySourceSSECustomerKeyMD5", K0 = "CopySourceVersionId", W0 = "CreateSession", Jt = "ChecksumType", ms = "Content-Type", gs = "ContentType", ud = "ContinuationToken", X0 = "Code", Z0 = "Contents", Za = "Credentials", Dr = "DeleteMarker", Q0 = "DeleteMarkerEntry", J0 = "DeleteMarkerVersionId", dd = "DeleteMarkers", Y0 = "DisplayName", ey = "DeletedObject", ty = "DeleteObjectOutput", ry = "DeleteObjectsOutput", sy = "DeleteObjectRequest", ny = "DeleteObjectsRequest", iy = "DeletedObjects", oy = "DeleteObject", ay = "DeleteObjects", cy = "DeleteResult", ii = "Delete", uy = "Deleted", ys = "Delimiter", Qt = "Expiration", Ye = "ExpectedBucketOwner", es = "ExpiresString", dy = "ExpectedSourceBucketOwner", ly = "EncryptionTypeMismatch", Ve = "ETag", Ss = "EncodingType", ld = "Errors", fd = "Error", lt = "Expires", fy = "FetchOwner", hy = "GetBucketVersioning", py = "GetBucketVersioningOutput", my = "GetBucketVersioningRequest", hd = "GrantFullControl", gy = "GetObject", yy = "GetObjectOutput", Sy = "GetObjectRequest", pd = "GrantRead", md = "GrantReadACP", gd = "GrantWriteACP", by = "HeadObject", xy = "HeadObjectOutput", wy = "HeadObjectRequest", Ey = "ID", yd = "IsLatest", kr = "IfMatch", Cy = "IfMatchLastModifiedTime", Ay = "IfMatchSize", Sd = "If-Modified-Since", bd = "IfModifiedSince", Tr = "If-Match", bs = "IfNoneMatch", xs = "If-None-Match", vy = "InvalidObjectState", Ry = "IdempotencyParameterMismatch", _y = "InvalidRequest", Dy = "IsRestoreInProgress", xd = "IsTruncated", wd = "IfUnmodifiedSince", Ed = "If-Unmodified-Since", ky = "InvalidWriteOffset", Ue = "Key", Ty = "KeyCount", Cd = "KeyMarker", Oy = "ListBucketResult", Yt = "LastModified", By = "LastModifiedTime", Ad = "Last-Modified", Iy = "ListObjectsV2", My = "ListObjectsV2Output", Py = "ListObjectVersionsOutput", Ny = "ListObjectsV2Request", $y = "ListObjectVersionsRequest", Uy = "ListObjectVersions", Fy = "ListVersionsResult", ws = "Metadata", Ly = "MetadataDirective", Hy = "MfaDelete", vd = "MFA", jy = "MFADelete", Es = "MaxKeys", Rd = "MissingMeta", zy = "Message", _d = "Name", Vy = "NextContinuationToken", qy = "NotFound", Gy = "NextKeyMarker", Ky = "NoSuchBucket", Wy = "NoSuchKey", Xy = "NoSuchUpload", Zy = "NextVersionIdMarker", Cs = "Owner", Qy = "ObjectAlreadyInActiveTierError", Jy = "ObjectIdentifier", Yy = "ObjectIdentifierList", As = "ObjectLockLegalHoldStatus", vs = "ObjectLockMode", Rs = "ObjectLockRetainUntilDate", eS = "ObjectList", tS = "ObjectNotInActiveTierError", Dd = "OptionalObjectAttributes", rS = "ObjectVersion", sS = "ObjectVersionList", nS = "Objects", kd = "Object", Or = "Prefix", Td = "PartsCount", Od = "PartNumber", iS = "PutObject", oS = "PutObjectOutput", aS = "PutObjectRequest", cS = "Quiet", pt = "RequestCharged", Bd = "ResponseCacheControl", Id = "ResponseContentDisposition", Md = "ResponseContentEncoding", Pd = "ResponseContentLanguage", Nd = "ResponseContentType", $d = "ResponseExpires", uS = "RestoreExpiryDate", mt = "RequestPayer", Ud = "ReplicationStatus", Zi = "RestoreStatus", ts = "Range", Fd = "Restore", dS = "Status", Ld = "StartAfter", Qa = "SecretAccessKey", lS = "StreamingBlob", Mt = "StorageClass", fS = "SessionCredentialValue", hS = "SessionCredentials", pS = "SessionMode", gt = "ServerSideEncryption", yt = "SSECustomerAlgorithm", Br = "SSECustomerKey", St = "SSECustomerKeyMD5", Pt = "SSEKMSEncryptionContext", et = "SSEKMSKeyId", Ja = "SessionToken", _s = "Size", Hd = "TagCount", mS = "TaggingDirective", gS = "TooManyParts", jd = "Tagging", yS = "VersioningConfiguration", Be = "VersionId", zd = "VersionIdMarker", SS = "Versions", bS = "Version", xS = "WriteOffsetBytes", Ds = "WebsiteRedirectLocation", Vd = "accept-ranges", Ce = "client", wS = "continuation-token", qd = "delimiter", Ae = "error", Gd = "encoding-type", ES = "fetch-owner", We = "http", Qi = "httpChecksum", De = "httpError", f = "httpHeader", CS = "httpPayload", ks = "httpPrefixHeaders", z = "httpQuery", AS = "key-marker", Kd = "max-keys", Wd = "prefix", Xd = "partNumber", Zd = "response-cache-control", Qd = "response-content-disposition", Jd = "response-content-encoding", Yd = "response-content-language", el = "response-content-type", tl = "response-expires", rl = "smithy.ts.sdk.synthetic.com.amazonaws.s3", vS = "start-after", RS = "streaming", Ji = "versionId", _S = "version-id-marker", ze = "xmlFlattened", be = "xmlName", sl = "x-amz-acl", DS = "x-amz-archive-status", nl = "x-amz-bypass-governance-retention", kS = "x-amz-checksum-algorithm", Ts = "x-amz-checksum-crc32", Os = "x-amz-checksum-crc32c", Bs = "x-amz-checksum-crc64nvme", il = "x-amz-checksum-mode", Is = "x-amz-checksum-sha1", Ms = "x-amz-checksum-sha256", TS = "x-amz-copy-source", OS = "x-amz-copy-source-if-match", BS = "x-amz-copy-source-if-modified-since", IS = "x-amz-copy-source-if-none-match", MS = "x-amz-copy-source-if-unmodified-since", PS = "x-amz-create-session-mode", NS = "x-amz-copy-source-server-side-encryption-customer-algorithm", $S = "x-amz-copy-source-server-side-encryption-customer-key", US = "x-amz-copy-source-server-side-encryption-customer-key-MD5", FS = "x-amz-copy-source-version-id", Yi = "x-amz-checksum-type", eo = "x-amz-delete-marker", Ps = "x-amz-expiration", tt = "x-amz-expected-bucket-owner", ol = "x-amz-grant-full-control", al = "x-amz-grant-read", cl = "x-amz-grant-read-acp", ul = "x-amz-grant-write-acp", LS = "x-amz-if-match-last-modified-time", HS = "x-amz-if-match-size", Ns = "x-amz-meta-", dl = "x-amz-mfa", jS = "x-amz-metadata-directive", ll = "x-amz-missing-meta", fl = "x-amz-mp-parts-count", $s = "x-amz-object-lock-legal-hold", Us = "x-amz-object-lock-mode", Fs = "x-amz-object-lock-retain-until-date", hl = "x-amz-optional-object-attributes", zS = "x-amz-object-size", pl = "x-amz-restore", bt = "x-amz-request-charged", xt = "x-amz-request-payer", ml = "x-amz-replication-status", Ls = "x-amz-storage-class", gl = "x-amz-sdk-checksum-algorithm", VS = "x-amz-source-expected-bucket-owner", wt = "x-amz-server-side-encryption", Et = "x-amz-server-side-encryption-aws-kms-key-id", Ct = "x-amz-server-side-encryption-bucket-key-enabled", er = "x-amz-server-side-encryption-context", At = "x-amz-server-side-encryption-customer-algorithm", Hs = "x-amz-server-side-encryption-customer-key", vt = "x-amz-server-side-encryption-customer-key-MD5", yl = "x-amz-tagging", Sl = "x-amz-tagging-count", qS = "x-amz-tagging-directive", Ir = "x-amz-version-id", GS = "x-amz-write-offset-bytes", js = "x-amz-website-redirect-location", T = "com.amazonaws.s3", bl = ve.for(rl);
var KS = [-3, rl, "S3ServiceException", 0, [], []];
bl.registerError(KS, fe);
const xe = ve.for(T);
var WS = [-3, T, v0, { [Ae]: Ce, [De]: 403 }, [], []];
xe.registerError(WS, Mi);
var XS = [-3, T, D0, { [Ae]: Ce, [De]: 409 }, [], []];
xe.registerError(XS, Ni);
var ZS = [-3, T, k0, { [Ae]: Ce, [De]: 409 }, [], []];
xe.registerError(ZS, $i);
var QS = [-3, T, ly, { [Ae]: Ce, [De]: 400 }, [], []];
xe.registerError(QS, ji);
var JS = [-3, T, Ry, { [Ae]: Ce, [De]: 400 }, [], []];
xe.registerError(JS, Gi);
var YS = [-3, T, vy, { [Ae]: Ce, [De]: 403 }, [Mt, _0], [0, 0]];
xe.registerError(YS, Fi);
var eb = [-3, T, _y, { [Ae]: Ce, [De]: 400 }, [], []];
xe.registerError(eb, zi);
var tb = [-3, T, ky, { [Ae]: Ce, [De]: 400 }, [], []];
xe.registerError(tb, Vi);
var rb = [-3, T, Ky, { [Ae]: Ce, [De]: 404 }, [], []];
xe.registerError(rb, Ui);
var sb = [-3, T, Wy, { [Ae]: Ce, [De]: 404 }, [], []];
xe.registerError(sb, Li);
var nb = [-3, T, Xy, { [Ae]: Ce, [De]: 404 }, [], []];
xe.registerError(nb, Ii);
var ib = [-3, T, qy, { [Ae]: Ce }, [], []];
xe.registerError(ib, Hi);
var ob = [-3, T, Qy, { [Ae]: Ce, [De]: 403 }, [], []];
xe.registerError(ob, Ki);
var ab = [-3, T, tS, { [Ae]: Ce, [De]: 403 }, [], []];
xe.registerError(ab, Pi);
var cb = [-3, T, gS, { [Ae]: Ce, [De]: 400 }, [], []];
xe.registerError(cb, qi);
const ub = [bl, xe];
var db = [0, T, cd, 8, 0], Ya = [0, T, fS, 8, 0], zs = [0, T, Br, 8, 0], tr = [0, T, Pt, 8, 0], Rt = [0, T, et, 8, 0], xl = [0, T, lS, { [RS]: 1 }, 42], lb = [3, T, P0, 0, [Or], [0]], fb = [3, T, I0, 0, [nd, Qt, K0, Be, gt, yt, St, et, Pt, ht, pt], [[() => pb, 16], [0, { [f]: Ps }], [0, { [f]: FS }], [0, { [f]: Ir }], [0, { [f]: wt }], [0, { [f]: At }], [0, { [f]: vt }], [() => Rt, { [f]: Et }], [() => tr, { [f]: er }], [2, { [f]: Ct }], [0, { [f]: bt }]]], hb = [3, T, M0, 0, [Ke, $0, Ue, Yu, as, Er, ds, fs, hs, gs, U0, F0, L0, H0, lt, hd, pd, md, gd, kr, bs, ws, Ly, mS, gt, Mt, Ds, yt, Br, St, et, Pt, ht, q0, cd, G0, mt, jd, vs, Rs, As, Ye, dy], [[0, 1], [0, { [f]: TS }], [0, 1], [0, { [f]: sl }], [0, { [f]: cs }], [0, { [f]: kS }], [0, { [f]: us }], [0, { [f]: ls }], [0, { [f]: ps }], [0, { [f]: ms }], [0, { [f]: OS }], [4, { [f]: BS }], [0, { [f]: IS }], [4, { [f]: MS }], [4, { [f]: lt }], [0, { [f]: ol }], [0, { [f]: al }], [0, { [f]: cl }], [0, { [f]: ul }], [0, { [f]: Tr }], [0, { [f]: xs }], [128, { [ks]: Ns }], [0, { [f]: jS }], [0, { [f]: qS }], [0, { [f]: wt }], [0, { [f]: Ls }], [0, { [f]: js }], [0, { [f]: At }], [() => zs, { [f]: Hs }], [0, { [f]: vt }], [() => Rt, { [f]: Et }], [() => tr, { [f]: er }], [2, { [f]: Ct }], [0, { [f]: NS }], [() => db, { [f]: $S }], [0, { [f]: US }], [0, { [f]: xt }], [0, { [f]: yl }], [0, { [f]: Us }], [5, { [f]: Fs }], [0, { [f]: $s }], [0, { [f]: tt }], [0, { [f]: VS }]], 3], pb = [3, T, nd, 0, [Ve, Yt, Jt, Cr, Ar, vr, Rr, _r], [0, 4, 0, 0, 0, 0, 0, 0]], mb = [3, T, j0, { [be]: z0 }, [Za, gt, et, Pt, ht], [[() => Lb, { [be]: Za }], [0, { [f]: wt }], [() => Rt, { [f]: Et }], [() => tr, { [f]: er }], [2, { [f]: Ct }]], 1], gb = [3, T, V0, 0, [Ke, pS, gt, et, Pt, ht], [[0, 1], [0, { [f]: PS }], [0, { [f]: wt }], [() => Rt, { [f]: Et }], [() => tr, { [f]: er }], [2, { [f]: Ct }]], 1], yb = [3, T, ii, 0, [nS, cS], [[() => Vb, { [ze]: 1, [be]: kd }], 2], 1], Sb = [3, T, ey, 0, [Ue, Be, Dr, J0], [0, 0, 2, 0]], bb = [3, T, Q0, 0, [Cs, Ue, Be, yd, Yt], [() => to, 0, 0, 2, 4]], xb = [3, T, ty, 0, [Dr, Be, pt], [[2, { [f]: eo }], [0, { [f]: Ir }], [0, { [f]: bt }]]], wb = [3, T, sy, 0, [Ke, Ue, vd, Be, mt, td, Ye, kr, Cy, Ay], [[0, 1], [0, 1], [0, { [f]: dl }], [0, { [z]: Ji }], [0, { [f]: xt }], [2, { [f]: nl }], [0, { [f]: tt }], [0, { [f]: Tr }], [6, { [f]: LS }], [1, { [f]: HS }]], 2], Eb = [3, T, ry, { [be]: cy }, [uy, pt, ld], [[() => Hb, { [ze]: 1 }], [0, { [f]: bt }], [() => zb, { [ze]: 1, [be]: fd }]]], Cb = [3, T, ny, 0, [Ke, ii, vd, mt, td, Ye, Er], [[0, 1], [() => yb, { [CS]: 1, [be]: ii }], [0, { [f]: dl }], [0, { [f]: xt }], [2, { [f]: nl }], [0, { [f]: tt }], [0, { [f]: gl }]], 2], Ab = [3, T, fd, 0, [Ue, Be, X0, zy], [0, 0, 0, 0]], vb = [3, T, py, { [be]: yS }, [dS, jy], [0, [0, { [be]: Hy }]]], Rb = [3, T, my, 0, [Ke, Ye], [[0, 1], [0, { [f]: tt }]], 1], _b = [3, T, yy, 0, [rd, Dr, ed, Qt, Fd, Yt, Xi, Ve, Cr, Ar, vr, Rr, _r, Jt, Rd, Be, as, ds, fs, hs, od, gs, lt, es, Ds, gt, ws, yt, St, et, ht, Mt, pt, Ud, Td, Hd, vs, Rs, As], [[() => xl, 16], [2, { [f]: eo }], [0, { [f]: Vd }], [0, { [f]: Ps }], [0, { [f]: pl }], [4, { [f]: Ad }], [1, { [f]: Wi }], [0, { [f]: Ve }], [0, { [f]: Ts }], [0, { [f]: Os }], [0, { [f]: Bs }], [0, { [f]: Is }], [0, { [f]: Ms }], [0, { [f]: Yi }], [1, { [f]: ll }], [0, { [f]: Ir }], [0, { [f]: cs }], [0, { [f]: us }], [0, { [f]: ls }], [0, { [f]: ps }], [0, { [f]: ad }], [0, { [f]: ms }], [4, { [f]: lt }], [0, { [f]: es }], [0, { [f]: js }], [0, { [f]: wt }], [128, { [ks]: Ns }], [0, { [f]: At }], [0, { [f]: vt }], [() => Rt, { [f]: Et }], [2, { [f]: Ct }], [0, { [f]: Ls }], [0, { [f]: bt }], [0, { [f]: ml }], [1, { [f]: fl }], [1, { [f]: Sl }], [0, { [f]: Us }], [5, { [f]: Fs }], [0, { [f]: $s }]]], Db = [3, T, Sy, 0, [Ke, Ue, kr, bd, bs, wd, ts, Bd, Id, Md, Pd, Nd, $d, Be, yt, Br, St, mt, Od, Ye, sd], [[0, 1], [0, 1], [0, { [f]: Tr }], [4, { [f]: Sd }], [0, { [f]: xs }], [4, { [f]: Ed }], [0, { [f]: ts }], [0, { [z]: Zd }], [0, { [z]: Qd }], [0, { [z]: Jd }], [0, { [z]: Yd }], [0, { [z]: el }], [6, { [z]: tl }], [0, { [z]: Ji }], [0, { [f]: At }], [() => zs, { [f]: Hs }], [0, { [f]: vt }], [0, { [f]: xt }], [1, { [z]: Xd }], [0, { [f]: tt }], [0, { [f]: il }]], 2], kb = [3, T, xy, 0, [Dr, ed, Qt, Fd, R0, Yt, Xi, Cr, Ar, vr, Rr, _r, Jt, Ve, Rd, Be, as, ds, fs, hs, gs, od, lt, es, Ds, gt, ws, yt, St, et, ht, Mt, pt, Ud, Td, Hd, vs, Rs, As], [[2, { [f]: eo }], [0, { [f]: Vd }], [0, { [f]: Ps }], [0, { [f]: pl }], [0, { [f]: DS }], [4, { [f]: Ad }], [1, { [f]: Wi }], [0, { [f]: Ts }], [0, { [f]: Os }], [0, { [f]: Bs }], [0, { [f]: Is }], [0, { [f]: Ms }], [0, { [f]: Yi }], [0, { [f]: Ve }], [1, { [f]: ll }], [0, { [f]: Ir }], [0, { [f]: cs }], [0, { [f]: us }], [0, { [f]: ls }], [0, { [f]: ps }], [0, { [f]: ms }], [0, { [f]: ad }], [4, { [f]: lt }], [0, { [f]: es }], [0, { [f]: js }], [0, { [f]: wt }], [128, { [ks]: Ns }], [0, { [f]: At }], [0, { [f]: vt }], [() => Rt, { [f]: Et }], [2, { [f]: Ct }], [0, { [f]: Ls }], [0, { [f]: bt }], [0, { [f]: ml }], [1, { [f]: fl }], [1, { [f]: Sl }], [0, { [f]: Us }], [5, { [f]: Fs }], [0, { [f]: $s }]]], Tb = [3, T, wy, 0, [Ke, Ue, kr, bd, bs, wd, ts, Bd, Id, Md, Pd, Nd, $d, Be, yt, Br, St, mt, Od, Ye, sd], [[0, 1], [0, 1], [0, { [f]: Tr }], [4, { [f]: Sd }], [0, { [f]: xs }], [4, { [f]: Ed }], [0, { [f]: ts }], [0, { [z]: Zd }], [0, { [z]: Qd }], [0, { [z]: Jd }], [0, { [z]: Yd }], [0, { [z]: el }], [6, { [z]: tl }], [0, { [z]: Ji }], [0, { [f]: At }], [() => zs, { [f]: Hs }], [0, { [f]: vt }], [0, { [f]: xt }], [1, { [z]: Xd }], [0, { [f]: tt }], [0, { [f]: il }]], 2], Ob = [3, T, My, { [be]: Oy }, [xd, Z0, _d, Or, ys, Es, id, Ss, Ty, ud, Vy, Ld, pt], [2, [() => qb, { [ze]: 1 }], 0, 0, 0, 1, [() => El, { [ze]: 1 }], 0, 1, 0, 0, 0, [0, { [f]: bt }]]], Bb = [3, T, Ny, 0, [Ke, ys, Ss, Es, Or, ud, fy, Ld, mt, Ye, Dd], [[0, 1], [0, { [z]: qd }], [0, { [z]: Gd }], [1, { [z]: Kd }], [0, { [z]: Wd }], [0, { [z]: wS }], [2, { [z]: ES }], [0, { [z]: vS }], [0, { [f]: xt }], [0, { [f]: tt }], [64, { [f]: hl }]], 1], Ib = [3, T, Py, { [be]: Fy }, [xd, Cd, zd, Gy, Zy, SS, dd, _d, Or, ys, Es, id, Ss, pt], [2, 0, 0, 0, 0, [() => Gb, { [ze]: 1, [be]: bS }], [() => jb, { [ze]: 1, [be]: Dr }], 0, 0, 0, 1, [() => El, { [ze]: 1 }], 0, [0, { [f]: bt }]]], Mb = [3, T, $y, 0, [Ke, ys, Ss, Cd, Es, Or, zd, Ye, mt, Dd], [[0, 1], [0, { [z]: qd }], [0, { [z]: Gd }], [0, { [z]: AS }], [1, { [z]: Kd }], [0, { [z]: Wd }], [0, { [z]: _S }], [0, { [f]: tt }], [0, { [f]: xt }], [64, { [f]: hl }]], 1], Pb = [3, T, kd, 0, [Ue, Yt, Ve, Er, Jt, _s, Mt, Cs, Zi], [0, 4, 0, [64, { [ze]: 1 }], 0, 1, 0, () => to, () => wl]], Nb = [3, T, Jy, 0, [Ue, Be, Ve, By, _s], [0, 0, 0, 6, 1], 1], $b = [3, T, rS, 0, [Ve, Er, Jt, _s, Mt, Ue, Be, yd, Yt, Cs, Zi], [0, [64, { [ze]: 1 }], 0, 1, 0, 0, 0, 2, 4, () => to, () => wl]], to = [3, T, Cs, 0, [Y0, Ey], [0, 0]], Ub = [3, T, oS, 0, [Qt, Ve, Cr, Ar, vr, Rr, _r, Jt, gt, Be, yt, St, et, Pt, ht, _s, pt], [[0, { [f]: Ps }], [0, { [f]: Ve }], [0, { [f]: Ts }], [0, { [f]: Os }], [0, { [f]: Bs }], [0, { [f]: Is }], [0, { [f]: Ms }], [0, { [f]: Yi }], [0, { [f]: wt }], [0, { [f]: Ir }], [0, { [f]: At }], [0, { [f]: vt }], [() => Rt, { [f]: Et }], [() => tr, { [f]: er }], [2, { [f]: Ct }], [1, { [f]: zS }], [0, { [f]: bt }]]], Fb = [3, T, aS, 0, [Ke, Ue, Yu, rd, as, ds, fs, hs, Xi, O0, gs, Er, Cr, Ar, vr, Rr, _r, lt, kr, bs, hd, pd, md, gd, xS, ws, gt, Mt, Ds, yt, Br, St, et, Pt, ht, mt, jd, vs, Rs, As, Ye], [[0, 1], [0, 1], [0, { [f]: sl }], [() => xl, 16], [0, { [f]: cs }], [0, { [f]: us }], [0, { [f]: ls }], [0, { [f]: ps }], [1, { [f]: Wi }], [0, { [f]: T0 }], [0, { [f]: ms }], [0, { [f]: gl }], [0, { [f]: Ts }], [0, { [f]: Os }], [0, { [f]: Bs }], [0, { [f]: Is }], [0, { [f]: Ms }], [4, { [f]: lt }], [0, { [f]: Tr }], [0, { [f]: xs }], [0, { [f]: ol }], [0, { [f]: al }], [0, { [f]: cl }], [0, { [f]: ul }], [1, { [f]: GS }], [128, { [ks]: Ns }], [0, { [f]: wt }], [0, { [f]: Ls }], [0, { [f]: js }], [0, { [f]: At }], [() => zs, { [f]: Hs }], [0, { [f]: vt }], [() => Rt, { [f]: Et }], [() => tr, { [f]: er }], [2, { [f]: Ct }], [0, { [f]: xt }], [0, { [f]: yl }], [0, { [f]: Us }], [5, { [f]: Fs }], [0, { [f]: $s }], [0, { [f]: tt }]], 2], wl = [3, T, Zi, 0, [Dy, uS], [2, 4]], Lb = [3, T, hS, 0, [Xa, Qa, Ja, Qt], [[0, { [be]: Xa }], [() => Ya, { [be]: Qa }], [() => Ya, { [be]: Ja }], [4, { [be]: Qt }]], 4], El = [1, T, N0, 0, () => lb], Hb = [1, T, iy, 0, () => Sb], jb = [1, T, dd, 0, () => bb], zb = [1, T, ld, 0, () => Ab], Vb = [1, T, Yy, 0, () => Nb], qb = [1, T, eS, 0, [() => Pb, 0]], Gb = [1, T, sS, 0, [() => $b, 0]], Kb = [9, T, B0, { [We]: ["PUT", "/{Key+}?x-id=CopyObject", 200] }, () => hb, () => fb], Wb = [9, T, W0, { [We]: ["GET", "/?session", 200] }, () => gb, () => mb], Xb = [9, T, oy, { [We]: ["DELETE", "/{Key+}?x-id=DeleteObject", 204] }, () => wb, () => xb], Zb = [9, T, ay, { [Qi]: "-", [We]: ["POST", "/?delete", 200] }, () => Cb, () => Eb], Qb = [9, T, hy, { [We]: ["GET", "/?versioning", 200] }, () => Rb, () => vb], Jb = [9, T, gy, { [Qi]: "-", [We]: ["GET", "/{Key+}?x-id=GetObject", 200] }, () => Db, () => _b], Yb = [9, T, by, { [We]: ["HEAD", "/{Key+}", 200] }, () => Tb, () => kb], ex = [9, T, Iy, { [We]: ["GET", "/?list-type=2", 200] }, () => Bb, () => Ob], tx = [9, T, Uy, { [We]: ["GET", "/?versions", 200] }, () => Mb, () => Ib], rx = [9, T, iS, { [Qi]: "-", [We]: ["PUT", "/{Key+}?x-id=PutObject", 200] }, () => Fb, () => Ub];
class sx extends $e.classBuilder().ep({ ...Ge, DisableS3ExpressSessionAuth: { type: "staticContextParams", value: true }, Bucket: { type: "contextParams", name: "Bucket" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), Je(s)];
}).s("AmazonS3", "CreateSession", {}).n("S3Client", "CreateSessionCommand").sc(Wb).build() {
}
const nx = "3.1001.0", ix = { version: nx }, ox = (t) => new TextEncoder().encode(t);
function ec(t) {
  return typeof t == "string" ? t.length === 0 : t.byteLength === 0;
}
var Cl = { name: "SHA-1" }, tc = { name: "HMAC", hash: Cl }, ax = new Uint8Array([218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]);
const cx = {};
function at() {
  return typeof window < "u" ? window : typeof self < "u" ? self : cx;
}
var ux = (function() {
  function t(e) {
    this.toHash = new Uint8Array(0), e !== void 0 && (this.key = new Promise(function(r, s) {
      at().crypto.subtle.importKey("raw", rc(e), tc, false, ["sign"]).then(r, s);
    }), this.key.catch(function() {
    }));
  }
  return t.prototype.update = function(e) {
    if (!ec(e)) {
      var r = rc(e), s = new Uint8Array(this.toHash.byteLength + r.byteLength);
      s.set(this.toHash, 0), s.set(r, this.toHash.byteLength), this.toHash = s;
    }
  }, t.prototype.digest = function() {
    var e = this;
    return this.key ? this.key.then(function(r) {
      return at().crypto.subtle.sign(tc, r, e.toHash).then(function(s) {
        return new Uint8Array(s);
      });
    }) : ec(this.toHash) ? Promise.resolve(ax) : Promise.resolve().then(function() {
      return at().crypto.subtle.digest(Cl, e.toHash);
    }).then(function(r) {
      return Promise.resolve(new Uint8Array(r));
    });
  }, t.prototype.reset = function() {
    this.toHash = new Uint8Array(0);
  }, t;
})();
function rc(t) {
  return typeof t == "string" ? ox(t) : ArrayBuffer.isView(t) ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(t);
}
var dx = ["decrypt", "digest", "encrypt", "exportKey", "generateKey", "importKey", "sign", "verify"];
function Al(t) {
  if (lx(t) && typeof t.crypto.subtle == "object") {
    var e = t.crypto.subtle;
    return fx(e);
  }
  return false;
}
function lx(t) {
  if (typeof t == "object" && typeof t.crypto == "object") {
    var e = t.crypto.getRandomValues;
    return typeof e == "function";
  }
  return false;
}
function fx(t) {
  return t && dx.every(function(e) {
    return typeof t[e] == "function";
  });
}
var hx = (function() {
  function t(e) {
    if (Al(at())) this.hash = new ux(e);
    else throw new Error("SHA1 not supported");
  }
  return t.prototype.update = function(e, r) {
    this.hash.update(ut(e));
  }, t.prototype.digest = function() {
    return this.hash.digest();
  }, t.prototype.reset = function() {
    this.hash.reset();
  }, t;
})(), vl = { name: "SHA-256" }, sc = { name: "HMAC", hash: vl }, px = new Uint8Array([227, 176, 196, 66, 152, 252, 28, 20, 154, 251, 244, 200, 153, 111, 185, 36, 39, 174, 65, 228, 100, 155, 147, 76, 164, 149, 153, 27, 120, 82, 184, 85]), mx = (function() {
  function t(e) {
    this.toHash = new Uint8Array(0), this.secret = e, this.reset();
  }
  return t.prototype.update = function(e) {
    if (!yr(e)) {
      var r = ut(e), s = new Uint8Array(this.toHash.byteLength + r.byteLength);
      s.set(this.toHash, 0), s.set(r, this.toHash.byteLength), this.toHash = s;
    }
  }, t.prototype.digest = function() {
    var e = this;
    return this.key ? this.key.then(function(r) {
      return at().crypto.subtle.sign(sc, r, e.toHash).then(function(s) {
        return new Uint8Array(s);
      });
    }) : yr(this.toHash) ? Promise.resolve(px) : Promise.resolve().then(function() {
      return at().crypto.subtle.digest(vl, e.toHash);
    }).then(function(r) {
      return Promise.resolve(new Uint8Array(r));
    });
  }, t.prototype.reset = function() {
    var e = this;
    this.toHash = new Uint8Array(0), this.secret && this.secret !== void 0 && (this.key = new Promise(function(r, s) {
      at().crypto.subtle.importKey("raw", ut(e.secret), sc, false, ["sign"]).then(r, s);
    }), this.key.catch(function() {
    }));
  }, t;
})(), Pe = 64, gx = 32, yx = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), Sx = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], bx = Math.pow(2, 53) - 1, jr = (function() {
  function t() {
    this.state = Int32Array.from(Sx), this.temp = new Int32Array(64), this.buffer = new Uint8Array(64), this.bufferLength = 0, this.bytesHashed = 0, this.finished = false;
  }
  return t.prototype.update = function(e) {
    if (this.finished) throw new Error("Attempted to update an already finished hash.");
    var r = 0, s = e.byteLength;
    if (this.bytesHashed += s, this.bytesHashed * 8 > bx) throw new Error("Cannot hash more than 2^53 - 1 bits");
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
    for (var i = new Uint8Array(gx), n = 0; n < 8; n++) i[n * 4] = this.state[n] >>> 24 & 255, i[n * 4 + 1] = this.state[n] >>> 16 & 255, i[n * 4 + 2] = this.state[n] >>> 8 & 255, i[n * 4 + 3] = this.state[n] >>> 0 & 255;
    return i;
  }, t.prototype.hashBuffer = function() {
    for (var e = this, r = e.buffer, s = e.state, n = s[0], i = s[1], o = s[2], a = s[3], c = s[4], u = s[5], p = s[6], l = s[7], h = 0; h < Pe; h++) {
      if (h < 16) this.temp[h] = (r[h * 4] & 255) << 24 | (r[h * 4 + 1] & 255) << 16 | (r[h * 4 + 2] & 255) << 8 | r[h * 4 + 3] & 255;
      else {
        var m = this.temp[h - 2], y = (m >>> 17 | m << 15) ^ (m >>> 19 | m << 13) ^ m >>> 10;
        m = this.temp[h - 15];
        var x = (m >>> 7 | m << 25) ^ (m >>> 18 | m << 14) ^ m >>> 3;
        this.temp[h] = (y + this.temp[h - 7] | 0) + (x + this.temp[h - 16] | 0);
      }
      var w = (((c >>> 6 | c << 26) ^ (c >>> 11 | c << 21) ^ (c >>> 25 | c << 7)) + (c & u ^ ~c & p) | 0) + (l + (yx[h] + this.temp[h] | 0) | 0) | 0, R = ((n >>> 2 | n << 30) ^ (n >>> 13 | n << 19) ^ (n >>> 22 | n << 10)) + (n & i ^ n & o ^ i & o) | 0;
      l = p, p = u, u = c, c = a + w | 0, a = o, o = i, i = n, n = w + R | 0;
    }
    s[0] += n, s[1] += i, s[2] += o, s[3] += a, s[4] += c, s[5] += u, s[6] += p, s[7] += l;
  }, t;
})(), xx = (function() {
  function t(e) {
    this.secret = e, this.hash = new jr(), this.reset();
  }
  return t.prototype.update = function(e) {
    if (!(yr(e) || this.error)) try {
      this.hash.update(ut(e));
    } catch (r) {
      this.error = r;
    }
  }, t.prototype.digestSync = function() {
    if (this.error) throw this.error;
    return this.outer ? (this.outer.finished || this.outer.update(this.hash.digest()), this.outer.digest()) : this.hash.digest();
  }, t.prototype.digest = function() {
    return xr(this, void 0, void 0, function() {
      return wr(this, function(e) {
        return [2, this.digestSync()];
      });
    });
  }, t.prototype.reset = function() {
    if (this.hash = new jr(), this.secret) {
      this.outer = new jr();
      var e = wx(this.secret), r = new Uint8Array(Pe);
      r.set(e);
      for (var s = 0; s < Pe; s++) e[s] ^= 54, r[s] ^= 92;
      this.hash.update(e), this.outer.update(r);
      for (var s = 0; s < e.byteLength; s++) e[s] = 0;
    }
  }, t;
})();
function wx(t) {
  var e = ut(t);
  if (e.byteLength > Pe) {
    var r = new jr();
    r.update(e), e = r.digest();
  }
  var s = new Uint8Array(Pe);
  return s.set(e), s;
}
var Ex = (function() {
  function t(e) {
    Al(at()) ? this.hash = new mx(e) : this.hash = new xx(e);
  }
  return t.prototype.update = function(e, r) {
    this.hash.update(ut(e));
  }, t.prototype.digest = function() {
    return this.hash.digest();
  }, t.prototype.reset = function() {
    this.hash.reset();
  }, t;
})();
const Cx = ({ serviceId: t, clientVersion: e }) => async (r) => {
  var _a2, _b2, _c2;
  const s = typeof window < "u" ? window.navigator : void 0, n = (s == null ? void 0 : s.userAgent) ?? "", i = ((_a2 = s == null ? void 0 : s.userAgentData) == null ? void 0 : _a2.platform) ?? nc.os(n) ?? "other", o = void 0, a = ((_b2 = s == null ? void 0 : s.userAgentData) == null ? void 0 : _b2.brands) ?? [], c = a[a.length - 1], u = (c == null ? void 0 : c.brand) ?? nc.browser(n) ?? "unknown", p = (c == null ? void 0 : c.version) ?? "unknown", l = [["aws-sdk-js", e], ["ua", "2.1"], [`os/${i}`, o], ["lang/js"], ["md/browser", `${u}_${p}`]];
  t && l.push([`api/${t}`, e]);
  const h = await ((_c2 = r == null ? void 0 : r.userAgentAppId) == null ? void 0 : _c2.call(r));
  return h && l.push([`app/${h}`]), l;
}, nc = { os(t) {
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
class pr {
  constructor(e) {
    __publicField(this, "bytes");
    if (this.bytes = e, e.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes");
  }
  static fromNumber(e) {
    if (e > 9223372036854776e3 || e < -9223372036854776e3) throw new Error(`${e} is too large (or, if negative, too small) to represent as an Int64`);
    const r = new Uint8Array(8);
    for (let s = 7, n = Math.abs(Math.round(e)); s > -1 && n > 0; s--, n /= 256) r[s] = n;
    return e < 0 && ic(r), new pr(r);
  }
  valueOf() {
    const e = this.bytes.slice(0), r = e[0] & 128;
    return r && ic(e), parseInt(Re(e), 16) * (r ? -1 : 1);
  }
  toString() {
    return String(this.valueOf());
  }
}
function ic(t) {
  for (let e = 0; e < 8; e++) t[e] ^= 255;
  for (let e = 7; e > -1 && (t[e]++, t[e] === 0); e--) ;
}
class Ax {
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
        const p = new Uint8Array(9);
        return p[0] = 8, p.set(pr.fromNumber(e.value.valueOf()).bytes, 1), p;
      case "uuid":
        if (!Ix.test(e.value)) throw new Error(`Invalid UUID received: ${e.value}`);
        const l = new Uint8Array(17);
        return l[0] = 9, l.set(gc(e.value.replace(/\-/g, "")), 1), l;
    }
  }
  parse(e) {
    const r = {};
    let s = 0;
    for (; s < e.byteLength; ) {
      const n = e.getUint8(s++), i = this.toUtf8(new Uint8Array(e.buffer, e.byteOffset + s, n));
      switch (s += n, e.getUint8(s++)) {
        case 0:
          r[i] = { type: ac, value: true };
          break;
        case 1:
          r[i] = { type: ac, value: false };
          break;
        case 2:
          r[i] = { type: vx, value: e.getInt8(s++) };
          break;
        case 3:
          r[i] = { type: Rx, value: e.getInt16(s, false) }, s += 2;
          break;
        case 4:
          r[i] = { type: _x, value: e.getInt32(s, false) }, s += 4;
          break;
        case 5:
          r[i] = { type: Dx, value: new pr(new Uint8Array(e.buffer, e.byteOffset + s, 8)) }, s += 8;
          break;
        case 6:
          const o = e.getUint16(s, false);
          s += 2, r[i] = { type: kx, value: new Uint8Array(e.buffer, e.byteOffset + s, o) }, s += o;
          break;
        case 7:
          const a = e.getUint16(s, false);
          s += 2, r[i] = { type: Tx, value: this.toUtf8(new Uint8Array(e.buffer, e.byteOffset + s, a)) }, s += a;
          break;
        case 8:
          r[i] = { type: Ox, value: new Date(new pr(new Uint8Array(e.buffer, e.byteOffset + s, 8)).valueOf()) }, s += 8;
          break;
        case 9:
          const c = new Uint8Array(e.buffer, e.byteOffset + s, 16);
          s += 16, r[i] = { type: Bx, value: `${Re(c.subarray(0, 4))}-${Re(c.subarray(4, 6))}-${Re(c.subarray(6, 8))}-${Re(c.subarray(8, 10))}-${Re(c.subarray(10))}` };
          break;
        default:
          throw new Error("Unrecognized header type tag");
      }
    }
    return r;
  }
}
var oc;
(function(t) {
  t[t.boolTrue = 0] = "boolTrue", t[t.boolFalse = 1] = "boolFalse", t[t.byte = 2] = "byte", t[t.short = 3] = "short", t[t.integer = 4] = "integer", t[t.long = 5] = "long", t[t.byteArray = 6] = "byteArray", t[t.string = 7] = "string", t[t.timestamp = 8] = "timestamp", t[t.uuid = 9] = "uuid";
})(oc || (oc = {}));
const ac = "boolean", vx = "byte", Rx = "short", _x = "integer", Dx = "long", kx = "binary", Tx = "string", Ox = "timestamp", Bx = "uuid", Ix = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/, Rl = 4, it = Rl * 2, Dt = 4, Mx = it + Dt * 2;
function Px({ byteLength: t, byteOffset: e, buffer: r }) {
  if (t < Mx) throw new Error("Provided message too short to accommodate event stream message overhead");
  const s = new DataView(r, e, t), n = s.getUint32(0, false);
  if (t !== n) throw new Error("Reported message length does not match received message length");
  const i = s.getUint32(Rl, false), o = s.getUint32(it, false), a = s.getUint32(t - Dt, false), c = new Gr().update(new Uint8Array(r, e, it));
  if (o !== c.digest()) throw new Error(`The prelude checksum specified in the message (${o}) does not match the calculated CRC32 checksum (${c.digest()})`);
  if (c.update(new Uint8Array(r, e + it, t - (it + Dt))), a !== c.digest()) throw new Error(`The message checksum (${c.digest()}) did not match the expected value of ${a}`);
  return { headers: new DataView(r, e + it + Dt, i), body: new Uint8Array(r, e + it + Dt + i, n - i - (it + Dt + Dt)) };
}
class Nx {
  constructor(e, r) {
    __publicField(this, "headerMarshaller");
    __publicField(this, "messageBuffer");
    __publicField(this, "isEndOfStream");
    this.headerMarshaller = new Ax(e, r), this.messageBuffer = [], this.isEndOfStream = false;
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
    const s = this.headerMarshaller.format(e), n = s.byteLength + r.byteLength + 16, i = new Uint8Array(n), o = new DataView(i.buffer, i.byteOffset, i.byteLength), a = new Gr();
    return o.setUint32(0, n, false), o.setUint32(4, s.byteLength, false), o.setUint32(8, a.update(i.subarray(0, 8)).digest(), false), i.set(s, 12), i.set(r, s.byteLength + 12), o.setUint32(n - 4, a.update(i.subarray(8, n - 4)).digest(), false), i;
  }
  decode(e) {
    const { headers: r, body: s } = Px(e);
    return { headers: this.headerMarshaller.parse(r), body: s };
  }
  formatHeaders(e) {
    return this.headerMarshaller.format(e);
  }
}
class $x {
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
class Ux {
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
class Fx {
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
class Lx {
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
function Hx(t) {
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
      const p = c.length;
      let l = 0;
      for (; l < p; ) {
        if (!s) {
          const m = p - l;
          n || (n = new Uint8Array(4));
          const y = Math.min(4 - r, m);
          if (n.set(c.slice(l, l + y), r), r += y, l += y, r < 4) break;
          i(new DataView(n.buffer).getUint32(0, false)), n = null;
        }
        const h = Math.min(e - r, p - l);
        s.set(c.slice(l, l + h), r), r += h, l += h, e && e === r && (yield s, s = null, e = 0, r = 0);
      }
    }
  };
  return { [Symbol.asyncIterator]: o };
}
function jx(t, e) {
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
let zx = class {
  constructor({ utf8Encoder: e, utf8Decoder: r }) {
    __publicField(this, "eventStreamCodec");
    __publicField(this, "utfEncoder");
    this.eventStreamCodec = new Nx(e, r), this.utfEncoder = e;
  }
  deserialize(e, r) {
    const s = Hx(e);
    return new Fx({ messageStream: new $x({ inputStream: s, decoder: this.eventStreamCodec }), deserializer: jx(r, this.utfEncoder) });
  }
  serialize(e, r) {
    return new Ux({ messageStream: new Lx({ inputStream: e, serializer: r }), encoder: this.eventStreamCodec, includeEndFrame: true });
  }
};
const Vx = (t) => ({ [Symbol.asyncIterator]: async function* () {
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
} }), qx = (t) => {
  const e = t[Symbol.asyncIterator]();
  return new ReadableStream({ async pull(r) {
    const { done: s, value: n } = await e.next();
    if (s) return r.close();
    r.enqueue(n);
  } });
};
class Gx {
  constructor({ utf8Encoder: e, utf8Decoder: r }) {
    __publicField(this, "universalMarshaller");
    this.universalMarshaller = new zx({ utf8Decoder: r, utf8Encoder: e });
  }
  deserialize(e, r) {
    const s = Kx(e) ? Vx(e) : e;
    return this.universalMarshaller.deserialize(s, r);
  }
  serialize(e, r) {
    const s = this.universalMarshaller.serialize(e, r);
    return typeof ReadableStream == "function" ? qx(s) : s;
  }
}
const Kx = (t) => typeof ReadableStream == "function" && t instanceof ReadableStream, Wx = (t) => new Gx(t);
async function Xx(t, e, r = 1024 * 1024) {
  const s = t.size;
  let n = 0;
  for (; n < s; ) {
    const i = t.slice(n, Math.min(s, n + r));
    e(new Uint8Array(await i.arrayBuffer())), n += i.size;
  }
}
const Zx = async function(e, r) {
  const s = new e();
  return await Xx(r, (n) => {
    s.update(n);
  }), s.digest();
}, Qx = (t) => () => Promise.reject(t), nt = 64, Jx = 16, Yx = [1732584193, 4023233417, 2562383102, 271733878];
class ew {
  constructor() {
    __publicField(this, "state");
    __publicField(this, "buffer");
    __publicField(this, "bufferLength");
    __publicField(this, "bytesHashed");
    __publicField(this, "finished");
    this.reset();
  }
  update(e) {
    if (tw(e)) return;
    if (this.finished) throw new Error("Attempted to update an already finished hash.");
    const r = rw(e);
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
    const e = new DataView(new ArrayBuffer(Jx));
    for (let r = 0; r < 4; r++) e.setUint32(r * 4, this.state[r], true);
    return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
  }
  hashBuffer() {
    const { buffer: e, state: r } = this;
    let s = r[0], n = r[1], i = r[2], o = r[3];
    s = me(s, n, i, o, e.getUint32(0, true), 7, 3614090360), o = me(o, s, n, i, e.getUint32(4, true), 12, 3905402710), i = me(i, o, s, n, e.getUint32(8, true), 17, 606105819), n = me(n, i, o, s, e.getUint32(12, true), 22, 3250441966), s = me(s, n, i, o, e.getUint32(16, true), 7, 4118548399), o = me(o, s, n, i, e.getUint32(20, true), 12, 1200080426), i = me(i, o, s, n, e.getUint32(24, true), 17, 2821735955), n = me(n, i, o, s, e.getUint32(28, true), 22, 4249261313), s = me(s, n, i, o, e.getUint32(32, true), 7, 1770035416), o = me(o, s, n, i, e.getUint32(36, true), 12, 2336552879), i = me(i, o, s, n, e.getUint32(40, true), 17, 4294925233), n = me(n, i, o, s, e.getUint32(44, true), 22, 2304563134), s = me(s, n, i, o, e.getUint32(48, true), 7, 1804603682), o = me(o, s, n, i, e.getUint32(52, true), 12, 4254626195), i = me(i, o, s, n, e.getUint32(56, true), 17, 2792965006), n = me(n, i, o, s, e.getUint32(60, true), 22, 1236535329), s = ge(s, n, i, o, e.getUint32(4, true), 5, 4129170786), o = ge(o, s, n, i, e.getUint32(24, true), 9, 3225465664), i = ge(i, o, s, n, e.getUint32(44, true), 14, 643717713), n = ge(n, i, o, s, e.getUint32(0, true), 20, 3921069994), s = ge(s, n, i, o, e.getUint32(20, true), 5, 3593408605), o = ge(o, s, n, i, e.getUint32(40, true), 9, 38016083), i = ge(i, o, s, n, e.getUint32(60, true), 14, 3634488961), n = ge(n, i, o, s, e.getUint32(16, true), 20, 3889429448), s = ge(s, n, i, o, e.getUint32(36, true), 5, 568446438), o = ge(o, s, n, i, e.getUint32(56, true), 9, 3275163606), i = ge(i, o, s, n, e.getUint32(12, true), 14, 4107603335), n = ge(n, i, o, s, e.getUint32(32, true), 20, 1163531501), s = ge(s, n, i, o, e.getUint32(52, true), 5, 2850285829), o = ge(o, s, n, i, e.getUint32(8, true), 9, 4243563512), i = ge(i, o, s, n, e.getUint32(28, true), 14, 1735328473), n = ge(n, i, o, s, e.getUint32(48, true), 20, 2368359562), s = ye(s, n, i, o, e.getUint32(20, true), 4, 4294588738), o = ye(o, s, n, i, e.getUint32(32, true), 11, 2272392833), i = ye(i, o, s, n, e.getUint32(44, true), 16, 1839030562), n = ye(n, i, o, s, e.getUint32(56, true), 23, 4259657740), s = ye(s, n, i, o, e.getUint32(4, true), 4, 2763975236), o = ye(o, s, n, i, e.getUint32(16, true), 11, 1272893353), i = ye(i, o, s, n, e.getUint32(28, true), 16, 4139469664), n = ye(n, i, o, s, e.getUint32(40, true), 23, 3200236656), s = ye(s, n, i, o, e.getUint32(52, true), 4, 681279174), o = ye(o, s, n, i, e.getUint32(0, true), 11, 3936430074), i = ye(i, o, s, n, e.getUint32(12, true), 16, 3572445317), n = ye(n, i, o, s, e.getUint32(24, true), 23, 76029189), s = ye(s, n, i, o, e.getUint32(36, true), 4, 3654602809), o = ye(o, s, n, i, e.getUint32(48, true), 11, 3873151461), i = ye(i, o, s, n, e.getUint32(60, true), 16, 530742520), n = ye(n, i, o, s, e.getUint32(8, true), 23, 3299628645), s = Se(s, n, i, o, e.getUint32(0, true), 6, 4096336452), o = Se(o, s, n, i, e.getUint32(28, true), 10, 1126891415), i = Se(i, o, s, n, e.getUint32(56, true), 15, 2878612391), n = Se(n, i, o, s, e.getUint32(20, true), 21, 4237533241), s = Se(s, n, i, o, e.getUint32(48, true), 6, 1700485571), o = Se(o, s, n, i, e.getUint32(12, true), 10, 2399980690), i = Se(i, o, s, n, e.getUint32(40, true), 15, 4293915773), n = Se(n, i, o, s, e.getUint32(4, true), 21, 2240044497), s = Se(s, n, i, o, e.getUint32(32, true), 6, 1873313359), o = Se(o, s, n, i, e.getUint32(60, true), 10, 4264355552), i = Se(i, o, s, n, e.getUint32(24, true), 15, 2734768916), n = Se(n, i, o, s, e.getUint32(52, true), 21, 1309151649), s = Se(s, n, i, o, e.getUint32(16, true), 6, 4149444226), o = Se(o, s, n, i, e.getUint32(44, true), 10, 3174756917), i = Se(i, o, s, n, e.getUint32(8, true), 15, 718787259), n = Se(n, i, o, s, e.getUint32(36, true), 21, 3951481745), r[0] = s + r[0] & 4294967295, r[1] = n + r[1] & 4294967295, r[2] = i + r[2] & 4294967295, r[3] = o + r[3] & 4294967295;
  }
  reset() {
    this.state = Uint32Array.from(Yx), this.buffer = new DataView(new ArrayBuffer(nt)), this.bufferLength = 0, this.bytesHashed = 0, this.finished = false;
  }
}
function Vs(t, e, r, s, n, i) {
  return e = (e + t & 4294967295) + (s + i & 4294967295) & 4294967295, (e << n | e >>> 32 - n) + r & 4294967295;
}
function me(t, e, r, s, n, i, o) {
  return Vs(e & r | ~e & s, t, e, n, i, o);
}
function ge(t, e, r, s, n, i, o) {
  return Vs(e & s | r & ~s, t, e, n, i, o);
}
function ye(t, e, r, s, n, i, o) {
  return Vs(e ^ r ^ s, t, e, n, i, o);
}
function Se(t, e, r, s, n, i, o) {
  return Vs(r ^ (e | ~s), t, e, n, i, o);
}
function tw(t) {
  return typeof t == "string" ? t.length === 0 : t.byteLength === 0;
}
function rw(t) {
  return typeof t == "string" ? Qe(t) : ArrayBuffer.isView(t) ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(t);
}
const sw = ["in-region", "cross-region", "mobile", "standard", "legacy"], nw = ({ defaultsMode: t } = {}) => dh(async () => {
  const e = typeof t == "function" ? await t() : t;
  switch (e == null ? void 0 : e.toLowerCase()) {
    case "auto":
      return Promise.resolve(iw() ? "mobile" : "standard");
    case "mobile":
    case "in-region":
    case "cross-region":
    case "standard":
    case "legacy":
      return Promise.resolve(e == null ? void 0 : e.toLocaleLowerCase());
    case void 0:
      return Promise.resolve("legacy");
    default:
      throw new Error(`Invalid parameter for "defaultsMode", expect ${sw.join(", ")}, got ${e}`);
  }
}), iw = () => {
  var _a2;
  const t = window == null ? void 0 : window.navigator;
  if (t == null ? void 0 : t.connection) {
    const { effectiveType: e, rtt: r, downlink: s } = t == null ? void 0 : t.connection;
    if (typeof e == "string" && e !== "4g" || Number(r) > 100 || Number(s) < 10) return true;
  }
  return ((_a2 = t == null ? void 0 : t.userAgentData) == null ? void 0 : _a2.mobile) || typeof (t == null ? void 0 : t.maxTouchPoints) == "number" && (t == null ? void 0 : t.maxTouchPoints) > 1;
}, ow = (t) => ({ apiVersion: "2006-03-01", base64Decoder: (t == null ? void 0 : t.base64Decoder) ?? qt, base64Encoder: (t == null ? void 0 : t.base64Encoder) ?? Ot, disableHostPrefix: (t == null ? void 0 : t.disableHostPrefix) ?? false, endpointProvider: (t == null ? void 0 : t.endpointProvider) ?? Zu, extensions: (t == null ? void 0 : t.extensions) ?? [], getAwsChunkedEncodingStream: (t == null ? void 0 : t.getAwsChunkedEncodingStream) ?? cf, httpAuthSchemeProvider: (t == null ? void 0 : t.httpAuthSchemeProvider) ?? E0, httpAuthSchemes: (t == null ? void 0 : t.httpAuthSchemes) ?? [{ schemeId: "aws.auth#sigv4", identityProvider: (e) => e.getIdentityProvider("aws.auth#sigv4"), signer: new dc() }, { schemeId: "aws.auth#sigv4a", identityProvider: (e) => e.getIdentityProvider("aws.auth#sigv4a"), signer: new Ll() }], logger: (t == null ? void 0 : t.logger) ?? new mi(), protocol: (t == null ? void 0 : t.protocol) ?? ip, protocolSettings: (t == null ? void 0 : t.protocolSettings) ?? { defaultNamespace: "com.amazonaws.s3", errorTypeRegistries: ub, xmlNamespace: "http://s3.amazonaws.com/doc/2006-03-01/", version: "2006-03-01", serviceTarget: "AmazonS3" }, sdkStreamMixin: (t == null ? void 0 : t.sdkStreamMixin) ?? yc, serviceId: (t == null ? void 0 : t.serviceId) ?? "S3", signerConstructor: (t == null ? void 0 : t.signerConstructor) ?? vi, signingEscapePath: (t == null ? void 0 : t.signingEscapePath) ?? false, urlParser: (t == null ? void 0 : t.urlParser) ?? Wr, useArnRegion: (t == null ? void 0 : t.useArnRegion) ?? void 0, utf8Decoder: (t == null ? void 0 : t.utf8Decoder) ?? Qe, utf8Encoder: (t == null ? void 0 : t.utf8Encoder) ?? Bt }), aw = (t) => {
  const e = nw(t), r = () => e().then(zh), s = ow(t);
  return { ...s, ...t, runtime: "browser", defaultsMode: e, bodyLengthChecker: (t == null ? void 0 : t.bodyLengthChecker) ?? Lh, credentialDefaultProvider: (t == null ? void 0 : t.credentialDefaultProvider) ?? ((n) => () => Promise.reject(new Error("Credential is missing"))), defaultUserAgentProvider: (t == null ? void 0 : t.defaultUserAgentProvider) ?? Cx({ serviceId: s.serviceId, clientVersion: ix.version }), eventStreamSerdeProvider: (t == null ? void 0 : t.eventStreamSerdeProvider) ?? Wx, maxAttempts: (t == null ? void 0 : t.maxAttempts) ?? Xr, md5: (t == null ? void 0 : t.md5) ?? ew, region: (t == null ? void 0 : t.region) ?? Qx("Region is missing"), requestHandler: ai.create((t == null ? void 0 : t.requestHandler) ?? r), retryMode: (t == null ? void 0 : t.retryMode) ?? (async () => (await r()).retryMode || Tg), sha1: (t == null ? void 0 : t.sha1) ?? hx, sha256: (t == null ? void 0 : t.sha256) ?? Ex, streamCollector: (t == null ? void 0 : t.streamCollector) ?? pc, streamHasher: (t == null ? void 0 : t.streamHasher) ?? Zx, useDualstackEndpoint: (t == null ? void 0 : t.useDualstackEndpoint) ?? (() => Promise.resolve(lg)), useFipsEndpoint: (t == null ? void 0 : t.useFipsEndpoint) ?? (() => Promise.resolve(fg)) };
}, cw = (t) => ({ setRegion(e) {
  t.region = e;
}, region() {
  return t.region;
} }), uw = (t) => ({ region: t.region() }), dw = (t) => {
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
}, lw = (t) => ({ httpAuthSchemes: t.httpAuthSchemes(), httpAuthSchemeProvider: t.httpAuthSchemeProvider(), credentials: t.credentials() }), fw = (t, e) => {
  const r = Object.assign(cw(t), Wh(t), Tl(t), dw(t));
  return e.forEach((s) => s.configure(r)), Object.assign(t, uw(r), Xh(r), Ol(r), lw(r));
};
class Cw extends Hh {
  constructor(...[e]) {
    const r = aw(e || {});
    super(r);
    __publicField(this, "config");
    this.initConfig = r;
    const s = A0(r), n = Dm(s), i = Mp(n), o = Xg(i), a = mg(o), c = a, u = kg(c), p = gg(u), l = C0(p), h = pm(l, { session: [() => this, sx] }), m = fw(h, (e == null ? void 0 : e.extensions) || []);
    this.config = m, this.middlewareStack.use(xf(this.config)), this.middlewareStack.use(dg(this.config)), this.middlewareStack.use(r0(this.config)), this.middlewareStack.use(bg(this.config)), this.middlewareStack.use($p(this.config)), this.middlewareStack.use(Lp(this.config)), this.middlewareStack.use(zp(this.config)), this.middlewareStack.use(ql(this.config, { httpAuthSchemeParametersProvider: b0, identityProviderConfigProvider: async (y) => new ih({ "aws.auth#sigv4": y.credentials, "aws.auth#sigv4a": y.credentials }) })), this.middlewareStack.use(Zl(this.config)), this.middlewareStack.use(vm(this.config)), this.middlewareStack.use(Pl(this.config)), this.middlewareStack.use(Yp(this.config)), this.middlewareStack.use(cm(this.config)), this.middlewareStack.use(hm(this.config));
  }
  destroy() {
    super.destroy();
  }
}
function hw(t) {
  return (e) => async (r) => {
    const s = { ...r.input }, n = [{ target: "SSECustomerKey", hash: "SSECustomerKeyMD5" }, { target: "CopySourceSSECustomerKey", hash: "CopySourceSSECustomerKeyMD5" }];
    for (const i of n) {
      const o = s[i.target];
      if (o) {
        let a;
        typeof o == "string" ? mw(o, t) ? a = t.base64Decoder(o) : (a = t.utf8Decoder(o), s[i.target] = t.base64Encoder(a)) : (a = ArrayBuffer.isView(o) ? new Uint8Array(o.buffer, o.byteOffset, o.byteLength) : new Uint8Array(o), s[i.target] = t.base64Encoder(a));
        const c = new t.md5();
        c.update(a), s[i.hash] = t.base64Encoder(await c.digest());
      }
    }
    return e({ ...r, input: s });
  };
}
const pw = { name: "ssecMiddleware", step: "initialize", tags: ["SSE"], override: true }, qs = (t) => ({ applyToStack: (e) => {
  e.add(hw(t), pw);
} });
function mw(t, e) {
  if (!/^(?:[A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(t)) return false;
  try {
    return e.base64Decoder(t).length === 32;
  } catch {
    return false;
  }
}
class Aw extends $e.classBuilder().ep({ ...Ge, DisableS3ExpressSessionAuth: { type: "staticContextParams", value: true }, Bucket: { type: "contextParams", name: "Bucket" }, Key: { type: "contextParams", name: "Key" }, CopySource: { type: "contextParams", name: "CopySource" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), Je(s), qs(s)];
}).s("AmazonS3", "CopyObject", {}).n("S3Client", "CopyObjectCommand").sc(Kb).build() {
}
class vw extends $e.classBuilder().ep({ ...Ge, Bucket: { type: "contextParams", name: "Bucket" }, Key: { type: "contextParams", name: "Key" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), Je(s)];
}).s("AmazonS3", "DeleteObject", {}).n("S3Client", "DeleteObjectCommand").sc(Xb).build() {
}
class Rw extends $e.classBuilder().ep({ ...Ge, Bucket: { type: "contextParams", name: "Bucket" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), bi(s, { requestAlgorithmMember: { httpHeader: "x-amz-sdk-checksum-algorithm", name: "ChecksumAlgorithm" }, requestChecksumRequired: true }), Je(s)];
}).s("AmazonS3", "DeleteObjects", {}).n("S3Client", "DeleteObjectsCommand").sc(Zb).build() {
}
class _w extends $e.classBuilder().ep({ ...Ge, UseS3ExpressControlEndpoint: { type: "staticContextParams", value: true }, Bucket: { type: "contextParams", name: "Bucket" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), Je(s)];
}).s("AmazonS3", "GetBucketVersioning", {}).n("S3Client", "GetBucketVersioningCommand").sc(Qb).build() {
}
class Dw extends $e.classBuilder().ep({ ...Ge, Bucket: { type: "contextParams", name: "Bucket" }, Key: { type: "contextParams", name: "Key" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), bi(s, { requestChecksumRequired: false, requestValidationModeMember: "ChecksumMode", responseAlgorithms: ["CRC64NVME", "CRC32", "CRC32C", "SHA256", "SHA1"] }), qs(s), hu()];
}).s("AmazonS3", "GetObject", {}).n("S3Client", "GetObjectCommand").sc(Jb).build() {
}
class kw extends $e.classBuilder().ep({ ...Ge, Bucket: { type: "contextParams", name: "Bucket" }, Key: { type: "contextParams", name: "Key" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), Je(s), qs(s), hu()];
}).s("AmazonS3", "HeadObject", {}).n("S3Client", "HeadObjectCommand").sc(Yb).build() {
}
class Tw extends $e.classBuilder().ep({ ...Ge, Bucket: { type: "contextParams", name: "Bucket" }, Prefix: { type: "contextParams", name: "Prefix" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), Je(s)];
}).s("AmazonS3", "ListObjectsV2", {}).n("S3Client", "ListObjectsV2Command").sc(ex).build() {
}
class Ow extends $e.classBuilder().ep({ ...Ge, Bucket: { type: "contextParams", name: "Bucket" }, Prefix: { type: "contextParams", name: "Prefix" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), Je(s)];
}).s("AmazonS3", "ListObjectVersions", {}).n("S3Client", "ListObjectVersionsCommand").sc(tx).build() {
}
class Bw extends $e.classBuilder().ep({ ...Ge, Bucket: { type: "contextParams", name: "Bucket" }, Key: { type: "contextParams", name: "Key" } }).m(function(e, r, s, n) {
  return [qe(s, e.getEndpointParameterInstructions()), bi(s, { requestAlgorithmMember: { httpHeader: "x-amz-sdk-checksum-algorithm", name: "ChecksumAlgorithm" }, requestChecksumRequired: false }), Wp(), Je(s), qs(s)];
}).s("AmazonS3", "PutObject", {}).n("S3Client", "PutObjectCommand").sc(rx).build() {
}
function gw(t) {
  const { port: e, query: r } = t;
  let { protocol: s, path: n, hostname: i } = t;
  s && s.slice(-1) !== ":" && (s += ":"), e && (i += `:${e}`), n && n.charAt(0) !== "/" && (n = `/${n}`);
  let o = r ? hc(r) : "";
  o && o[0] !== "?" && (o = `?${o}`);
  let a = "";
  if (t.username != null || t.password != null) {
    const u = t.username ?? "", p = t.password ?? "";
    a = `${u}:${p}@`;
  }
  let c = "";
  return t.fragment && (c = `#${t.fragment}`), `${s}//${a}${i}${n}${o}${c}`;
}
const yw = "UNSIGNED-PAYLOAD", Sw = "X-Amz-Content-Sha256";
class cc {
  constructor(e) {
    __publicField(this, "signer");
    const r = { service: e.signingName || e.service || "s3", uriEscapePath: e.uriEscapePath || false, applyChecksum: e.applyChecksum || false, ...e };
    this.signer = new vi(r);
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
    }), e.headers[Sw] = yw;
    const i = e.headers.host, o = e.port, a = `${e.hostname}${e.port != null ? ":" + o : ""}`;
    (!i || i === e.hostname && e.port != null) && (e.headers.host = a);
  }
}
const Iw = async (t, e, r = {}) => {
  var _a2, _b2, _c2;
  let s, n;
  if (typeof t.config.endpointProvider == "function") {
    const h = (_b2 = (_a2 = (await ku(e.input, e.constructor, t.config)).properties) == null ? void 0 : _a2.authSchemes) == null ? void 0 : _b2[0];
    (h == null ? void 0 : h.name) === "sigv4a" ? n = (_c2 = h == null ? void 0 : h.signingRegionSet) == null ? void 0 : _c2.join(",") : n = h == null ? void 0 : h.signingRegion, s = new cc({ ...t.config, signingName: h == null ? void 0 : h.signingName, region: async () => n });
  } else s = new cc(t.config);
  const i = (l, h) => async (m) => {
    const { request: y } = m;
    if (!ee.isInstance(y)) throw new Error("Request to be presigned is not an valid HTTP request.");
    delete y.headers["amz-sdk-invocation-id"], delete y.headers["amz-sdk-request"], delete y.headers["x-amz-user-agent"];
    let x;
    const w = { ...r, signingRegion: r.signingRegion ?? h.signing_region ?? n, signingService: r.signingService ?? h.signing_service };
    return h.s3ExpressIdentity ? x = await s.presignWithCredentials(y, h.s3ExpressIdentity, w) : x = await s.presign(y, w), { response: {}, output: { $metadata: { httpStatusCode: 200 }, presigned: x } };
  }, o = "presignInterceptMiddleware", a = t.middlewareStack.clone();
  a.addRelativeTo(i, { name: o, relation: "before", toMiddleware: "awsAuthMiddleware", override: true });
  const c = e.resolveMiddleware(a, t.config, {}), { output: u } = await c({ input: e.input }), { presigned: p } = u;
  return gw(p);
};
class bw {
  constructor({ marshaller: e, serializer: r, deserializer: s, serdeContext: n, defaultContentType: i }) {
    __publicField(this, "marshaller");
    __publicField(this, "serializer");
    __publicField(this, "deserializer");
    __publicField(this, "serdeContext");
    __publicField(this, "defaultContentType");
    this.marshaller = e, this.serializer = r, this.deserializer = s, this.serdeContext = n, this.defaultContentType = i;
  }
  async serializeEventStream({ eventStream: e, requestSchema: r, initialRequest: s }) {
    const n = this.marshaller, i = r.getEventStreamMember(), o = r.getMemberSchema(i), a = this.serializer, c = this.defaultContentType, u = /* @__PURE__ */ Symbol("initialRequestMarker"), p = { async *[Symbol.asyncIterator]() {
      if (s) {
        const l = { ":event-type": { type: "string", value: "initial-request" }, ":message-type": { type: "string", value: "event" }, ":content-type": { type: "string", value: c } };
        a.write(r, s);
        const h = a.flush();
        yield { [u]: true, headers: l, body: h };
      }
      for await (const l of e) yield l;
    } };
    return n.serialize(p, (l) => {
      if (l[u]) return { headers: l.headers, body: l.body };
      const h = Object.keys(l).find((v) => v !== "__type") ?? "", { additionalHeaders: m, body: y, eventType: x, explicitPayloadContentType: w } = this.writeEventBody(h, o, l);
      return { headers: { ":event-type": { type: "string", value: x }, ":message-type": { type: "string", value: "event" }, ":content-type": { type: "string", value: w ?? c }, ...m }, body: y };
    });
  }
  async deserializeEventStream({ response: e, responseSchema: r, initialResponseContainer: s }) {
    var _a2;
    const n = this.marshaller, i = r.getEventStreamMember(), a = r.getMemberSchema(i).getMemberSchemas(), c = /* @__PURE__ */ Symbol("initialResponseMarker"), u = n.deserialize(e.body, async (h) => {
      var _a3, _b2;
      const m = Object.keys(h).find((x) => x !== "__type") ?? "", y = h[m].body;
      if (m === "initial-response") {
        const x = await this.deserializer.read(r, y);
        return delete x[i], { [c]: true, ...x };
      } else if (m in a) {
        const x = a[m];
        if (x.isStructSchema()) {
          const w = {};
          let R = false;
          for (const [v, I] of x.structIterator()) {
            const { eventHeader: N, eventPayload: q } = I.getMergedTraits();
            if (R = R || !!(N || q), q) I.isBlobSchema() ? w[v] = y : I.isStringSchema() ? w[v] = (((_a3 = this.serdeContext) == null ? void 0 : _a3.utf8Encoder) ?? Bt)(y) : I.isStructSchema() && (w[v] = await this.deserializer.read(I, y));
            else if (N) {
              const te = (_b2 = h[m].headers[v]) == null ? void 0 : _b2.value;
              te != null && (I.isNumericSchema() ? te && typeof te == "object" && "bytes" in te ? w[v] = BigInt(te.toString()) : w[v] = Number(te) : w[v] = te);
            }
          }
          if (R) return { [m]: w };
          if (y.byteLength === 0) return { [m]: {} };
        }
        return { [m]: await this.deserializer.read(x, y) };
      } else return { $unknown: h };
    }), p = u[Symbol.asyncIterator](), l = await p.next();
    if (l.done) return u;
    if ((_a2 = l.value) == null ? void 0 : _a2[c]) {
      if (!r) throw new Error("@smithy::core/protocols - initial-response event encountered in event stream but no response schema given.");
      for (const [h, m] of Object.entries(l.value)) s[h] = m;
    }
    return { async *[Symbol.asyncIterator]() {
      var _a3;
      for (((_a3 = l == null ? void 0 : l.value) == null ? void 0 : _a3[c]) || (yield l.value); ; ) {
        const { done: h, value: m } = await p.next();
        if (h) break;
        yield m;
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
        for (const [m, y] of h.structIterator()) {
          const { eventHeader: x, eventPayload: w } = y.getMergedTraits();
          if (w) o = m;
          else if (x) {
            const R = s[e][m];
            let v = "binary";
            y.isNumericSchema() ? (-2) ** 31 <= R && R <= 2 ** 31 - 1 ? v = "integer" : v = "long" : y.isTimestampSchema() ? v = "timestamp" : y.isStringSchema() ? v = "string" : y.isBooleanSchema() && (v = "boolean"), R != null && (u[m] = { type: v, value: R }, delete s[e][m]);
          }
        }
        if (o !== null) {
          const m = h.getMemberSchema(o);
          m.isBlobSchema() ? a = "application/octet-stream" : m.isStringSchema() && (a = "text/plain"), n.write(m, s[e][o]);
        } else n.write(h, s[e]);
      } else if (h.isUnitSchema()) n.write(h, {});
      else throw new Error("@smithy/core/event-streams - non-struct member not supported in event stream union.");
    } else {
      const [h, m] = s[e];
      i = h, n.write(15, m);
    }
    const p = n.flush();
    return { body: typeof p == "string" ? (((_a2 = this.serdeContext) == null ? void 0 : _a2.utf8Decoder) ?? Qe)(p) : p, eventType: i, explicitPayloadContentType: a, additionalHeaders: u };
  }
}
const xw = Object.freeze(Object.defineProperty({ __proto__: null, EventStreamSerde: bw }, Symbol.toStringTag, { value: "Module" }));
export {
  Aw as C,
  vw as D,
  Dw as G,
  kw as H,
  Tw as L,
  Bw as P,
  Cw as S,
  kl as _,
  qr as a,
  $c as b,
  Wc as c,
  _w as d,
  Ow as e,
  Rw as f,
  Iw as g,
  ww as t
};
