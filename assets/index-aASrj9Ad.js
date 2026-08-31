import { C as p, j as n } from "./index-DSUCaAxT.js";
import "./vendor-react-BFxggocB.js";
import "./vendor-md-editor-DUPlaNge.js";
import "./vendor-aws-D_CMUQl7.js";
import "./vendor-lucide-DoRTt2zm.js";
import "./vendor-zip-Bez6qchM.js";
import "./vendor-motion-b8oTnHK_.js";
import "./vendor-radix-B1O6DxMz.js";
import "./vendor-google-genai-DGp6lEvQ.js";
class h {
  constructor() {
    this.eventListeners = /* @__PURE__ */ Object.create(null);
  }
  addListener(t, e) {
    return this.on(t, e);
  }
  removeListener(t, e) {
    return this.off(t, e);
  }
  on(t, e) {
    return t in this.eventListeners ? this.eventListeners[t].push(e) : this.eventListeners[t] = [e], this;
  }
  once(t, e) {
    const s = (i) => {
      this.removeListener(t, s), e(i);
    };
    return this.addListener(t, s);
  }
  off(t, e) {
    return t in this.eventListeners && (this.eventListeners[t] = this.eventListeners[t].filter((s) => s !== e)), this;
  }
  removeAllListeners(t) {
    return t ? delete this.eventListeners[t] : this.eventListeners = /* @__PURE__ */ Object.create(null), this;
  }
  emit(t, e) {
    if (t in this.eventListeners) {
      const s = this.eventListeners[t];
      for (const i of s) i(e);
      return true;
    }
    return false;
  }
  listenerCount(t) {
    return t in this.eventListeners ? this.eventListeners[t].length : 0;
  }
  prependListener(t, e) {
    return t in this.eventListeners ? this.eventListeners[t].unshift(e) : this.eventListeners[t] = [e], this;
  }
  prependOnceListener(t, e) {
    const s = (i) => {
      this.removeListener(t, s), e(i);
    };
    return this.prependListener(t, s);
  }
}
class c {
  constructor(t) {
    this.pid = t;
  }
  async write(t) {
    await n("plugin:shell|stdin_write", { pid: this.pid, buffer: t });
  }
  async kill() {
    await n("plugin:shell|kill", { cmd: "killChild", pid: this.pid });
  }
}
class a extends h {
  constructor(t, e = [], s) {
    super(), this.stdout = new h(), this.stderr = new h(), this.program = t, this.args = typeof e == "string" ? [e] : e, this.options = s ?? {};
  }
  static create(t, e = [], s) {
    return new a(t, e, s);
  }
  static sidecar(t, e = [], s) {
    const i = new a(t, e, s);
    return i.options.sidecar = true, i;
  }
  async spawn() {
    const t = this.program, e = this.args, s = this.options;
    typeof e == "object" && Object.freeze(e);
    const i = new p();
    return i.onmessage = (r) => {
      switch (r.event) {
        case "Error":
          this.emit("error", r.payload);
          break;
        case "Terminated":
          this.emit("close", r.payload);
          break;
        case "Stdout":
          this.stdout.emit("data", r.payload);
          break;
        case "Stderr":
          this.stderr.emit("data", r.payload);
          break;
      }
    }, await n("plugin:shell|spawn", { program: t, args: e, options: s, onEvent: i }).then((r) => new c(r));
  }
  async execute() {
    const t = this.program, e = this.args, s = this.options;
    return typeof e == "object" && Object.freeze(e), await n("plugin:shell|execute", { program: t, args: e, options: s });
  }
}
async function b(o, t) {
  await n("plugin:shell|open", { path: o, with: t });
}
export {
  c as Child,
  a as Command,
  h as EventEmitter,
  b as open
};
