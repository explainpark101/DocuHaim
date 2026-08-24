class c {
  constructor(t) {
    this._worker = new Worker(t, { type: "module" }), this._nextId = 1, this._pending = /* @__PURE__ */ new Map(), this._worker.onmessage = (i) => {
      const { id: e, result: s, error: h } = i.data, a = this._pending.get(e);
      a && (this._pending.delete(e), h ? a.reject(new Error(h)) : a.resolve(s));
    }, this.ready = this._call("init");
  }
  _call(t, i = {}) {
    return new Promise((e, s) => {
      const h = this._nextId++;
      this._pending.set(h, { resolve: e, reject: s }), this._worker.postMessage({ type: t, id: h, ...i });
    });
  }
  async create(t, i, e) {
    return await this._call("create", { path: t, fields: i, stemmer: e }), new r(this, t);
  }
  async open(t) {
    return await this._call("open", { path: t }), new r(this, t);
  }
  async importSnapshot(t, i) {
    return await this._call("importSnapshot", { data: t, path: i }), new r(this, i);
  }
  terminate() {
    this._worker.terminate();
  }
}
class r {
  constructor(t, i) {
    this._lucivy = t, this.path = i;
  }
  add(t, i) {
    return this._lucivy._call("add", { path: this.path, docId: t, fields: i });
  }
  addMany(t) {
    return this._lucivy._call("addMany", { path: this.path, docs: t });
  }
  remove(t) {
    return this._lucivy._call("remove", { path: this.path, docId: t });
  }
  update(t, i) {
    return this._lucivy._call("update", { path: this.path, docId: t, fields: i });
  }
  commit() {
    return this._lucivy._call("commit", { path: this.path });
  }
  rollback() {
    return this._lucivy._call("rollback", { path: this.path });
  }
  search(t, i = {}) {
    return this._lucivy._call("search", { path: this.path, query: t, limit: i.limit, highlights: i.highlights, fields: i.fields });
  }
  searchFiltered(t, i, e = {}) {
    return this._lucivy._call("searchFiltered", { path: this.path, query: t, allowedIds: i, limit: e.limit, highlights: e.highlights, fields: e.fields });
  }
  numDocs() {
    return this._lucivy._call("numDocs", { path: this.path });
  }
  schema() {
    return this._lucivy._call("schema", { path: this.path });
  }
  exportSnapshot() {
    return this._lucivy._call("exportSnapshot", { path: this.path });
  }
  close() {
    return this._lucivy._call("close", { path: this.path });
  }
  destroy() {
    return this._lucivy._call("destroy", { path: this.path });
  }
}
export {
  c as Lucivy,
  r as LucivyIndex
};
